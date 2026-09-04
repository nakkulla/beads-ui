var tg=Object.create;var Va=Object.defineProperty;var ng=Object.getOwnPropertyDescriptor;var rg=Object.getOwnPropertyNames;var og=Object.getPrototypeOf,sg=Object.prototype.hasOwnProperty;var ig=(e,t,n)=>t in e?Va(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Ya=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var ag=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of rg(t))!sg.call(e,o)&&o!==n&&Va(e,o,{get:()=>t[o],enumerable:!(r=ng(t,o))||r.enumerable});return e};var lg=(e,t,n)=>(n=e!=null?tg(og(e)):{},ag(t||!e||!e.__esModule?Va(n,"default",{value:e,enumerable:!0}):n,e));var Ft=(e,t,n)=>ig(e,typeof t!="symbol"?t+"":t,n);var fu=Ya((rx,pu)=>{var _o=1e3,mo=_o*60,go=mo*60,Kr=go*24,dg=Kr*7,pg=Kr*365.25;pu.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return fg(e);if(n==="number"&&isFinite(e))return t.long?mg(e):_g(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function fg(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*pg;case"weeks":case"week":case"w":return n*dg;case"days":case"day":case"d":return n*Kr;case"hours":case"hour":case"hrs":case"hr":case"h":return n*go;case"minutes":case"minute":case"mins":case"min":case"m":return n*mo;case"seconds":case"second":case"secs":case"sec":case"s":return n*_o;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function _g(e){var t=Math.abs(e);return t>=Kr?Math.round(e/Kr)+"d":t>=go?Math.round(e/go)+"h":t>=mo?Math.round(e/mo)+"m":t>=_o?Math.round(e/_o)+"s":e+"ms"}function mg(e){var t=Math.abs(e);return t>=Kr?li(e,t,Kr,"day"):t>=go?li(e,t,go,"hour"):t>=mo?li(e,t,mo,"minute"):t>=_o?li(e,t,_o,"second"):e+" ms"}function li(e,t,n,r){var o=t>=n*1.5;return Math.round(e/n)+" "+r+(o?"s":"")}});var mu=Ya((ox,_u)=>{function gg(e){n.debug=n,n.default=n,n.coerce=a,n.disable=s,n.enable=o,n.enabled=l,n.humanize=fu(),n.destroy=u,Object.keys(e).forEach(d=>{n[d]=e[d]}),n.names=[],n.skips=[],n.formatters={};function t(d){let f=0;for(let _=0;_<d.length;_++)f=(f<<5)-f+d.charCodeAt(_),f|=0;return n.colors[Math.abs(f)%n.colors.length]}n.selectColor=t;function n(d){let f,_=null,k,m;function R(...T){if(!R.enabled)return;let D=R,ne=Number(new Date),H=ne-(f||ne);D.diff=H,D.prev=f,D.curr=ne,f=ne,T[0]=n.coerce(T[0]),typeof T[0]!="string"&&T.unshift("%O");let P=0;T[0]=T[0].replace(/%([a-zA-Z%])/g,(q,F)=>{if(q==="%%")return"%";P++;let z=n.formatters[F];if(typeof z=="function"){let B=T[P];q=z.call(D,B),T.splice(P,1),P--}return q}),n.formatArgs.call(D,T),(D.log||n.log).apply(D,T)}return R.namespace=d,R.useColors=n.useColors(),R.color=n.selectColor(d),R.extend=r,R.destroy=n.destroy,Object.defineProperty(R,"enabled",{enumerable:!0,configurable:!1,get:()=>_!==null?_:(k!==n.namespaces&&(k=n.namespaces,m=n.enabled(d)),m),set:T=>{_=T}}),typeof n.init=="function"&&n.init(R),R}function r(d,f){let _=n(this.namespace+(typeof f>"u"?":":f)+d);return _.log=this.log,_}function o(d){n.save(d),n.namespaces=d,n.names=[],n.skips=[];let f=(typeof d=="string"?d:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let _ of f)_[0]==="-"?n.skips.push(_.slice(1)):n.names.push(_)}function i(d,f){let _=0,k=0,m=-1,R=0;for(;_<d.length;)if(k<f.length&&(f[k]===d[_]||f[k]==="*"))f[k]==="*"?(m=k,R=_,k++):(_++,k++);else if(m!==-1)k=m+1,R++,_=R;else return!1;for(;k<f.length&&f[k]==="*";)k++;return k===f.length}function s(){let d=[...n.names,...n.skips.map(f=>"-"+f)].join(",");return n.enable(""),d}function l(d){for(let f of n.skips)if(i(d,f))return!1;for(let f of n.names)if(i(d,f))return!0;return!1}function a(d){return d instanceof Error?d.stack||d.message:d}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}_u.exports=gg});var gu=Ya((En,ci)=>{En.formatArgs=bg;En.save=yg;En.load=vg;En.useColors=hg;En.storage=kg();En.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();En.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function hg(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function bg(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+ci.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,o=>{o!=="%%"&&(n++,o==="%c"&&(r=n))}),e.splice(r,0,t)}En.log=console.debug||console.log||(()=>{});function yg(e){try{e?En.storage.setItem("debug",e):En.storage.removeItem("debug")}catch{}}function vg(){let e;try{e=En.storage.getItem("debug")||En.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function kg(){try{return localStorage}catch{}}ci.exports=mu()(En);var{formatters:wg}=ci.exports;wg.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var Xo=globalThis,ei=Xo.trustedTypes,Xc=ei?ei.createPolicy("lit-html",{createHTML:e=>e}):void 0,Xa="$lit$",ir=`lit$${Math.random().toFixed(9).slice(2)}$`,Za="?"+ir,cg=`<${Za}>`,Ur=document,Zo=()=>Ur.createComment(""),Jo=e=>e===null||typeof e!="object"&&typeof e!="function",Ja=Array.isArray,ru=e=>Ja(e)||typeof e?.[Symbol.iterator]=="function",Qa=`[ 	
\f\r]`,Qo=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Zc=/-->/g,Jc=/>/g,Fr=RegExp(`>|${Qa}(?:([^\\s"'>=/]+)(${Qa}*=${Qa}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),eu=/'/g,tu=/"/g,ou=/^(?:script|style|textarea|title)$/i,el=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),c=el(1),ts=el(2),Q$=el(3),Pn=Symbol.for("lit-noChange"),zt=Symbol.for("lit-nothing"),nu=new WeakMap,Br=Ur.createTreeWalker(Ur,129);function su(e,t){if(!Ja(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Xc!==void 0?Xc.createHTML(t):t}var iu=(e,t)=>{let n=e.length-1,r=[],o,i=t===2?"<svg>":t===3?"<math>":"",s=Qo;for(let l=0;l<n;l++){let a=e[l],u,d,f=-1,_=0;for(;_<a.length&&(s.lastIndex=_,d=s.exec(a),d!==null);)_=s.lastIndex,s===Qo?d[1]==="!--"?s=Zc:d[1]!==void 0?s=Jc:d[2]!==void 0?(ou.test(d[2])&&(o=RegExp("</"+d[2],"g")),s=Fr):d[3]!==void 0&&(s=Fr):s===Fr?d[0]===">"?(s=o??Qo,f=-1):d[1]===void 0?f=-2:(f=s.lastIndex-d[2].length,u=d[1],s=d[3]===void 0?Fr:d[3]==='"'?tu:eu):s===tu||s===eu?s=Fr:s===Zc||s===Jc?s=Qo:(s=Fr,o=void 0);let k=s===Fr&&e[l+1].startsWith("/>")?" ":"";i+=s===Qo?a+cg:f>=0?(r.push(u),a.slice(0,f)+Xa+a.slice(f)+ir+k):a+ir+(f===-2?l:k)}return[su(e,i+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},es=class e{constructor({strings:t,_$litType$:n},r){let o;this.parts=[];let i=0,s=0,l=t.length-1,a=this.parts,[u,d]=iu(t,n);if(this.el=e.createElement(u,r),Br.currentNode=this.el.content,n===2||n===3){let f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}for(;(o=Br.nextNode())!==null&&a.length<l;){if(o.nodeType===1){if(o.hasAttributes())for(let f of o.getAttributeNames())if(f.endsWith(Xa)){let _=d[s++],k=o.getAttribute(f).split(ir),m=/([.?@])?(.*)/.exec(_);a.push({type:1,index:i,name:m[2],strings:k,ctor:m[1]==="."?ni:m[1]==="?"?ri:m[1]==="@"?oi:Hr}),o.removeAttribute(f)}else f.startsWith(ir)&&(a.push({type:6,index:i}),o.removeAttribute(f));if(ou.test(o.tagName)){let f=o.textContent.split(ir),_=f.length-1;if(_>0){o.textContent=ei?ei.emptyScript:"";for(let k=0;k<_;k++)o.append(f[k],Zo()),Br.nextNode(),a.push({type:2,index:++i});o.append(f[_],Zo())}}}else if(o.nodeType===8)if(o.data===Za)a.push({type:2,index:i});else{let f=-1;for(;(f=o.data.indexOf(ir,f+1))!==-1;)a.push({type:7,index:i}),f+=ir.length-1}i++}}static createElement(t,n){let r=Ur.createElement("template");return r.innerHTML=t,r}};function Wr(e,t,n=e,r){if(t===Pn)return t;let o=r!==void 0?n._$Co?.[r]:n._$Cl,i=Jo(t)?void 0:t._$litDirective$;return o?.constructor!==i&&(o?._$AO?.(!1),i===void 0?o=void 0:(o=new i(e),o._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=o:n._$Cl=o),o!==void 0&&(t=Wr(e,o._$AS(e,t.values),o,r)),t}var ti=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,o=(t?.creationScope??Ur).importNode(n,!0);Br.currentNode=o;let i=Br.nextNode(),s=0,l=0,a=r[0];for(;a!==void 0;){if(s===a.index){let u;a.type===2?u=new po(i,i.nextSibling,this,t):a.type===1?u=new a.ctor(i,a.name,a.strings,this,t):a.type===6&&(u=new si(i,this,t)),this._$AV.push(u),a=r[++l]}s!==a?.index&&(i=Br.nextNode(),s++)}return Br.currentNode=Ur,o}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},po=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,o){this.type=2,this._$AH=zt,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=Wr(this,t,n),Jo(t)?t===zt||t==null||t===""?(this._$AH!==zt&&this._$AR(),this._$AH=zt):t!==this._$AH&&t!==Pn&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):ru(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==zt&&Jo(this._$AH)?this._$AA.nextSibling.data=t:this.T(Ur.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,o=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=es.createElement(su(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===o)this._$AH.p(n);else{let i=new ti(o,this),s=i.u(this.options);i.p(n),this.T(s),this._$AH=i}}_$AC(t){let n=nu.get(t.strings);return n===void 0&&nu.set(t.strings,n=new es(t)),n}k(t){Ja(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,o=0;for(let i of t)o===n.length?n.push(r=new e(this.O(Zo()),this.O(Zo()),this,this.options)):r=n[o],r._$AI(i),o++;o<n.length&&(this._$AR(r&&r._$AB.nextSibling,o),n.length=o)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Hr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,o,i){this.type=1,this._$AH=zt,this._$AN=void 0,this.element=t,this.name=n,this._$AM=o,this.options=i,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=zt}_$AI(t,n=this,r,o){let i=this.strings,s=!1;if(i===void 0)t=Wr(this,t,n,0),s=!Jo(t)||t!==this._$AH&&t!==Pn,s&&(this._$AH=t);else{let l=t,a,u;for(t=i[0],a=0;a<i.length-1;a++)u=Wr(this,l[r+a],n,a),u===Pn&&(u=this._$AH[a]),s||(s=!Jo(u)||u!==this._$AH[a]),u===zt?t=zt:t!==zt&&(t+=(u??"")+i[a+1]),this._$AH[a]=u}s&&!o&&this.j(t)}j(t){t===zt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},ni=class extends Hr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===zt?void 0:t}},ri=class extends Hr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==zt)}},oi=class extends Hr{constructor(t,n,r,o,i){super(t,n,r,o,i),this.type=5}_$AI(t,n=this){if((t=Wr(this,t,n,0)??zt)===Pn)return;let r=this._$AH,o=t===zt&&r!==zt||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,i=t!==zt&&(r===zt||o);o&&this.element.removeEventListener(this.name,this,r),i&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},si=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){Wr(this,t)}},au={M:Xa,P:ir,A:Za,C:1,L:iu,R:ti,D:ru,V:Wr,I:po,H:Hr,N:ri,U:oi,B:ni,F:si},ug=Xo.litHtmlPolyfillSupport;ug?.(es,po),(Xo.litHtmlVersions??(Xo.litHtmlVersions=[])).push("3.3.1");var lt=(e,t,n)=>{let r=n?.renderBefore??t,o=r._$litPart$;if(o===void 0){let i=n?.renderBefore??null;r._$litPart$=o=new po(t.insertBefore(Zo(),i),i,void 0,n??{})}return o._$AI(e),o};var ii="today",ai=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}],fo=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"}];function Yn(e){return e==="today"?"today":"7d"}function tl(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function zr(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function lu(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function cu(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function uu(){let e=null,t=[],n,r=new Set;function o(){for(let i of Array.from(r))try{i()}catch{}}return{get(){return e},getWorkspacesState(){return t},crossLanes(){return n},set(i,s,l){e=Array.isArray(i)?i:null,t=Array.isArray(s)?s:[],n=l===void 0?void 0:l!==null&&typeof l=="object"&&typeof l.revision=="number"&&Array.isArray(l.lanes)?{revision:l.revision,lanes:l.lanes}:null,o()},clear(){e=null,t=[],n=void 0,o()},subscribe(i){return r.add(i),()=>r.delete(i)}}}function du(){let e=new Map,t=new Set;function n(o){return o.startsWith("session-log:")?o:`session-log:${o}`}function r(){for(let o of Array.from(t))try{o()}catch{}}return{set(o,i,s=null){e.set(n(o),{lines:Array.isArray(i)?[...i]:[],last_event_at:typeof s=="number"?s:null}),r()},append(o,i){let s=n(o),l=e.get(s)||{lines:[],last_event_at:null};l.lines=[...l.lines,i],l.last_event_at=Date.now(),e.set(s,l),r()},get(o){return e.get(n(o))||null},clear(o){typeof o=="string"?e.delete(n(o)):e.clear(),r()},subscribe(o){return t.add(o),()=>t.delete(o)}}}var hu=lg(gu(),1);function Bt(e){return(0,hu.default)(`beads-ui:${e}`)}function $g(e){let n=bu((e&&typeof e=="object"?e:{}).spec_id);return n?{path:n,source:"native",conflict:!1}:{path:"",source:"none",conflict:!1}}function bu(e){return typeof e=="string"?e.trim():""}function xg(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}var Ag=/^[A-Za-z0-9_.:-]+@[0-9a-fA-F]{40}$/;function ho(e){let t=$g(e),n=bu(xg(e).spec_review),r=Ag.test(n),o=r&&n.slice(0,n.indexOf("@"))==="skipped";return t.source==="none"?{...t,evidence:"none",skipped:o}:{...t,evidence:r?"published":"draft",skipped:o}}function qn(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function ns(e,t){let n=qn(e.created_at),r=qn(t.created_at);if(n!==r)return n<r?1:-1;let o=e.priority??2,i=t.priority??2;if(o!==i)return o-i;let s=e.id,l=t.id;return s<l?-1:s>l?1:0}function xu(e,t){let n=qn(e.created_at),r=qn(t.created_at);if(n!==r)return n<r?-1:1;let o=e.priority??2,i=t.priority??2;if(o!==i)return o-i;let s=e.id,l=t.id;return s<l?-1:s>l?1:0}function Au(e,t){let n=qn(e.updated_at),r=qn(t.updated_at);if(n!==r)return n<r?1:-1;let o=e.id,i=t.id;return o<i?-1:o>i?1:0}function Su(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let o=qn(e.created_at),i=qn(t.created_at);if(o!==i)return o<i?1:-1;let s=e.id,l=t.id;return s<l?-1:s>l?1:0}function Eu(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let o=e?.id,i=t?.id;return o<i?-1:o>i?1:0}var ui=Object.freeze({priority:"asc",dependents:"desc",released:"desc",spec:"desc",created:"asc",updated:"desc"});function Sg(e){return typeof e=="string"&&Object.prototype.hasOwnProperty.call(ui,e)}function rl(e){if(!e||typeof e!="object")return!1;let t=e;return Sg(t.key)&&(t.dir==="asc"||t.dir==="desc")}function yu(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function vu(e,t){switch(t){case"priority":{let n=e.priority;return typeof n=="number"&&Number.isFinite(n)?n:null}case"dependents":{let n=e.dependents_info?e.dependents_info.count:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"released":{let n=e.release_info?e.release_info.last_released_at:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"spec":return ho(e).evidence==="published"?1:0;case"created":return yu(e.created_at);case"updated":return yu(e.updated_at);default:return null}}function ku(e,t,n){let r=vu(e,n.key),o=vu(t,n.key);if(r===null||o===null)return r===o?0:r===null?1:-1;if(r===o)return 0;let i=r<o?-1:1;return n.dir==="desc"?-i:i}function Tu(e){let t=Array.isArray(e)?e.filter(rl):[];return(n,r)=>{for(let l of t){let a=ku(n,r,l);if(a!==0)return a}let o=ku(n,r,{key:"created",dir:"asc"});if(o!==0)return o;let i=n.id,s=r.id;return i<s?-1:i>s?1:0}}var Eg=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function wu(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function $u(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=Eg.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Ru(e,t){let n=wu(e),r=wu(t);if(n!==r)return n<r?-1:1;let o=$u(e),i=$u(t);if(o!==i)return o<i?-1:1;let s=qn(e&&e.created_at),l=qn(t&&t.created_at);if(s!==l)return s<l?-1:1;let a=e&&e.id,u=t&&t.id;return a===u?0:String(a)<String(u)?-1:1}var nl=2**20;function bo(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-qn(e&&e.created_at)}function Cu(e){return(t,n)=>{let r=bo(t,e),o=bo(n,e);if(r!==o)return r<o?-1:1;let i=t?.id,s=n?.id;return i<s?-1:i>s?1:0}}function ol(e,t,n){let r=Array.isArray(e)?e:[],o=r.length,i=Math.max(0,Math.min(t,o-1)),s=i-1>=0?r[i-1]:null,l=i+1<o?r[i+1]:null;if(!s&&!l)return{rank:0};if(!s)return{rank:bo(l,n)-nl};if(!l)return{rank:bo(s,n)+nl};let a=bo(s,n),u=bo(l,n),d=(a+u)/2;return a<d&&d<u?{rank:d}:{renormalize:r.map((f,_)=>({bead_id:f.id,rank:_*nl}))}}function sl(e,t={}){let n=Bt(`issue-store:${e}`),r=new Map,o=[],i=0,s=new Set,l=!1,a=t.sort||ns;function u(){for(let _ of Array.from(s))try{_()}catch{}}function d(){o=Array.from(r.values()).sort(a)}function f(_){if(l||!_||_.id!==e)return;let k=Number(_.revision)||0;if(n("apply %s rev=%d",_.type,k),!(k<=i&&_.type!=="snapshot")){if(_.type==="snapshot"){if(k<=i)return;r.clear();let m=Array.isArray(_.issues)?_.issues:[];for(let R of m)R&&typeof R.id=="string"&&R.id.length>0&&r.set(R.id,R);d(),i=k,u();return}if(_.type==="upsert"){let m=_.issue;if(m&&typeof m.id=="string"&&m.id.length>0){let R=r.get(m.id);if(!R)r.set(m.id,m);else{let T=Number.isFinite(R.updated_at)?R.updated_at:0,D=Number.isFinite(m.updated_at)?m.updated_at:0;if(T<=D){for(let ne of Object.keys(R))ne in m||delete R[ne];for(let[ne,H]of Object.entries(m))R[ne]=H}}d()}i=k,u()}else if(_.type==="delete"){let m=String(_.issue_id||"");m&&(r.delete(m),d()),i=k,u()}}}return{id:e,subscribe(_){return s.add(_),()=>{s.delete(_)}},applyPush:f,snapshot(){return o},size(){return r.size},getById(_){return r.get(_)},dispose(){l=!0,r.clear(),o=[],s.clear(),i=0}}}function di(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let o=Object.keys(e.params).sort();for(let i of o){let s=e.params[i];n[i]=String(s)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function Ou(e){let t=Bt("subs"),n=new Map,r=new Map;function o(l,a){t("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let u=r.get(l);if(!u||u.size===0)return;let d=Array.isArray(a.added)?a.added:[],f=Array.isArray(a.updated)?a.updated:[],_=Array.isArray(a.removed)?a.removed:[];for(let k of Array.from(u)){let m=n.get(k);if(!m)continue;let R=m.itemsById;for(let T of d)typeof T=="string"&&T.length>0&&R.set(T,!0);for(let T of f)typeof T=="string"&&T.length>0&&R.set(T,!0);for(let T of _)typeof T=="string"&&T.length>0&&R.delete(T)}}async function i(l,a){let u=di(a);if(t("subscribe %s key=%s",l,u),!n.has(l))n.set(l,{key:u,itemsById:new Map});else{let f=n.get(l);if(f&&f.key!==u){let _=r.get(f.key);_&&(_.delete(l),_.size===0&&r.delete(f.key)),n.set(l,{key:u,itemsById:new Map})}}r.has(u)||r.set(u,new Set);let d=r.get(u);d&&d.add(l);try{await e("subscribe-list",{id:l,type:a.type,params:a.params})}catch(f){let _=n.get(l)||null;if(_){let k=r.get(_.key);k&&(k.delete(l),k.size===0&&r.delete(_.key))}throw n.delete(l),f}return async()=>{t("unsubscribe %s key=%s",l,u);try{await e("unsubscribe-list",{id:l})}catch{}let f=n.get(l)||null;if(f){let _=r.get(f.key);_&&(_.delete(l),_.size===0&&r.delete(f.key))}n.delete(l)}}return{subscribeList:i,_applyDelta:o,_subKeyOf:di,selectors:{getIds(l){let a=n.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let u=n.get(l);return u?u.itemsById.has(a):!1},count(l){let a=n.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=n.get(l),u={};if(!a)return u;for(let d of a.itemsById.keys())u[d]=!0;return u}}}}function Iu(){let e=Bt("issue-stores"),t=new Map,n=new Map,r=new Set,o=new Map;function i(){for(let a of Array.from(r))try{a()}catch{}}function s(a,u,d){let f=u?di(u):"",_=n.get(a)||"",k=t.has(a);if(e("register %s key=%s (prev=%s)",a,f,_),k&&_&&f&&_!==f){let m=t.get(a);if(m)try{m.dispose()}catch{}let R=o.get(a);if(R){try{R()}catch{}o.delete(a)}let T=sl(a,d);t.set(a,T);let D=T.subscribe(()=>i());o.set(a,D)}else if(!k){let m=sl(a,d);t.set(a,m);let R=m.subscribe(()=>i());o.set(a,R)}return n.set(a,f),()=>l(a)}function l(a){e("unregister %s",a),n.delete(a);let u=t.get(a);u&&(u.dispose(),t.delete(a));let d=o.get(a);if(d){try{d()}catch{}o.delete(a)}}return{register:s,unregister:l,getStore(a){return t.get(a)||null},snapshotFor(a){let u=t.get(a);return u?u.snapshot().slice():[]},subscribe(a){return r.add(a),()=>r.delete(a)}}}function Lu(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Pu(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function il(e,t){return`#/${e==="worker"||e==="monitor"||e==="compare"?e:"board"}?issue=${encodeURIComponent(t)}`}function Tg(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),o=r>=0?n.slice(r+1):"";if(o){let l=new URLSearchParams(o).get("issue");if(l)return decodeURIComponent(l)}let i=/^\/issue\/([^\s?#]+)/.exec(n);return i&&i[1]?decodeURIComponent(i[1]):null}function Rg(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":/^#\/compare(\b|\/|$)/.test(t)?"compare":"board"}function Du(e){let t=Bt("router"),n=()=>{let r=window.location.hash||"",o=/^#\/issue\/([^\s?#]+)/.exec(r),i=o&&o[1]?decodeURIComponent(o[1]):Tg(r),s=Rg(r);if(t("hash change \u2192 view=%s id=%s",s,i),e.setState({selected_id:s==="worker"?null:i,view:s,worker:{selected_parent_id:s==="worker"?i:null}}),!!o||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let a=i?`#/${s}?issue=${encodeURIComponent(i)}`:`#/${s}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let o=e.getState?e.getState():{view:"board"},i=o.view==="worker"||o.view==="monitor"||o.view==="compare"?o.view:"board",s=il(i,r);t("goto issue %s (view=%s)",r,i),window.location.hash!==s?window.location.hash=s:e.setState({selected_id:i==="worker"?null:r,view:i,worker:{selected_parent_id:i==="worker"?r:null}})},gotoView(r){let o=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},i=r==="worker"?o.worker?.selected_parent_id:o.selected_id,s=i?il(r,i):`#/${r}`;t("goto view %s (id=%s)",r,i||""),window.location.hash!==s?window.location.hash=s:e.setState({view:r,selected_id:r==="worker"?null:o.selected_id})}}}var Cg=Object.freeze({workspace_config:{default_workspace:null}});function Mu(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:Cg.workspace_config.default_workspace}}}function Nu(e={}){let t=Bt("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:Mu(e.config)},r=new Set;function o(){for(let i of Array.from(r))try{i(n)}catch{}}return{getState(){return n},setState(i){let s={...n,...i,filters:{...n.filters,...i.filters||{}},board:{...n.board,...i.board||{}},worker:{...n.worker,...i.worker||{}},workspace:{current:i.workspace?.current!==void 0?i.workspace.current:n.workspace.current,available:i.workspace?.available!==void 0?i.workspace.available:n.workspace.available,hidden:i.workspace?.hidden!==void 0?i.workspace.hidden:n.workspace.hidden},config:i.config!==void 0?Mu(i.config):n.config},l=s.workspace.current?.path!==n.workspace.current?.path||s.workspace.available.length!==n.workspace.available.length||s.workspace.hidden.length!==n.workspace.hidden.length||s.workspace.hidden.some((u,d)=>u!==n.workspace.hidden[d]),a=s.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;s.selected_id===n.selected_id&&s.view===n.view&&s.filters.status===n.filters.status&&s.filters.search===n.filters.search&&s.filters.type===n.filters.type&&s.board.closed_filter===n.board.closed_filter&&s.worker.selected_parent_id===n.worker.selected_parent_id&&s.worker.show_closed_children.length===n.worker.show_closed_children.length&&s.worker.show_closed_children.every((u,d)=>u===n.worker.show_closed_children[d])&&!l&&!a||(n=s,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),o())},subscribe(i){return r.add(i),()=>r.delete(i)}}}function qu(e){let t=Bt("activity"),n=0,r=new Map,o=1;function i(){if(!e)return;let u=n>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function s(){n+=1,t("start count=%d",n),i()}function l(){let u=n;n=Math.max(0,n-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,n),i()}function a(u){return async(f,_)=>{let k=o++,m=Date.now();r.set(k,{type:f,start_ts:m}),t("request start id=%d type=%s count=%d",k,f,n+1),s();let R=!1,T=()=>{R||(R=!0,r.delete(k),l())},D=setTimeout(()=>{R||(t("request TIMEOUT id=%d type=%s elapsed=%dms",k,f,Date.now()-m),T())},3e4);try{let ne=await u(f,_),H=Date.now()-m;return t("request done id=%d type=%s elapsed=%dms",k,f,H),ne}catch(ne){let H=Date.now()-m;throw t("request error id=%d type=%s elapsed=%dms err=%o",k,f,H,ne),ne}finally{clearTimeout(D),T()}}}return i(),{wrapSend:a,start:s,done:l,getCount:()=>n,getActiveRequests:()=>{let u=Date.now();return Array.from(r.entries()).map(([d,f])=>({id:d,type:f.type,elapsed_ms:u-f.start_ts}))}}}function ve(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}function yo(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let i=t.get();return i&&i.order?i.order:{}}function r(i,s,l){let a=e&&e.snapshotFor?e.snapshotFor(i).slice():[];if(s==="closed")return a.sort(Eu),a;switch(l){case"created_desc":return a.sort(ns),a;case"created_asc":return a.sort(xu),a;case"updated_desc":return a.sort(Au),a;case"priority":return a.sort(Su),a;case"manual":default:{let u=n();return u?a.sort(Cu(u)):a.sort(ns),a}}}function o(i){let s=[];return e&&typeof e.subscribe=="function"&&s.push(e.subscribe(i)),t&&typeof t.subscribe=="function"&&s.push(t.subscribe(i)),()=>{for(let l of s)try{l()}catch{}}}return{selectBoardColumn:r,subscribe:o}}function vr(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function Xt(e){let t=vr(e);if(t===null)return"";let n=new Date(t),r=o=>String(o).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function vn(e,t){let n=vr(e);if(n===null)return"";let o=(typeof t=="number"?t:Date.now())-n;if(o<6e4)return"\uBC29\uAE08";let i=Math.floor(o/6e4);if(i<60)return`${i}\uBD84 \uC804`;let s=Math.floor(o/36e5);if(s<24)return`${s}\uC2DC\uAC04 \uC804`;let l=Math.floor(o/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let u=Math.floor(l/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function ju(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let o=vr(r.updated_at)??0;if(t===null||o>n){t=r,n=o;continue}o===n&&String(r.id)<String(t.id)&&(t=r)}return t}function pi(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function fi(e){let t=new Map;for(let r of e)r&&r.id&&!t.has(r.id)&&t.set(r.id,r);let n=new Map;for(let r of t.values()){let o=pi(r);if(!o)continue;let i=n.get(o);i||(i=[],n.set(o,i)),i.push({id:r.id,title:r.title,status:r.status,metadata:r.metadata,workflow:r.workflow,created_at:r.created_at,updated_at:r.updated_at})}return n}function _i(e,t){let n=e.get(t)||[],r=0;for(let i of n)(i.status==="resolved"||i.status==="closed")&&(r+=1);let o=ju(n);return{total:n.length,count:r,current:o,children:n}}function vo(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function al(e,t){return!t||typeof e!="string"||e.length===0||vo(t.visible_labels).includes(e)?!0:vo(t.hidden_labels).includes(e)?!1:!vo(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function Fu(e,t){return vo(e).filter(n=>al(n,t))}function kr(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}var Bu="bench";function Uu(e){let t=e&&typeof e=="object"?e.labels:null;return vo(t).includes(Bu)}function Wu(e){return!!e&&vo(e.visible_labels).includes(Bu)}function Hu(e){let t=e.transport,n=e.uiOrderStore;function r(s,l){return"renormalize"in s?s.renormalize:[{bead_id:l,rank:s.rank}]}function o(s,l){let a={...s.order};for(let u of l)a[u.bead_id]=u.rank;n&&n.set({revision:s.revision,order:a})}async function i(s,l,a){if(!t||!n)return;let u=n.get()||{revision:0,order:{}},d=r(ol(l,a,u.order),s);o(u,d);let f=await t("ui-order-set",{expected_revision:u.revision,entries:d});if(f&&f.conflict){let _={revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}};n.set(_);let k=r(ol(l,a,_.order),s);o(_,k);let m=await t("ui-order-set",{expected_revision:_.revision,entries:k});m&&m.applied&&n.set({revision:typeof m.revision=="number"?m.revision:0,order:m.order||{}})}else f&&f.applied&&n.set({revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}})}return{applyReorder:i}}function zu(e){if(typeof e!="string")return"";let t=e.indexOf("-");return t>0?e.slice(0,t):""}function Qn(e,t){let n=zu(e),r=zu(t);return n.length===0||r.length===0?!1:n!==r}function Og(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function Ig(e,t,n,r,o){return c`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${r?"true":"false"}
    @click=${o}
  >
    children ${t}/${n} ${r?"\u25B4":"\u25BE"}
  </button>`}function Lg(e,t,n,r){return c`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${r?o=>r(o,e.id):void 0}
  >
    <span class=${Og(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${n}
  </button>`}function mi(e,t){let n=e.total||0,r=!!t.expanded,o=t.trailing??"",i=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(n===0&&i===null)return"";let s=Array.isArray(e.children)?e.children:[],l=n>0?s.slice().sort(Ru):s;return c`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?Ig(t.parent_id,e.count,n,r,t.onToggle):c`<span class="board-card__roll-none">${i}</span>`}
        ${o}
      </div>
      ${n>0&&e.current?c`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${r&&n>0?c`<div class="board-card__roll-list">
            ${l.map((a,u)=>Lg(a,u+1,t.childChips?t.childChips(a):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var Pg={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},Gu={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},Ku={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},Dg={review:"\u2713",skip:"\u2298"},wr={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function Mg(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let o of e){let i=t[o];if(i&&i.fill==="dim"&&i.stale!==!0)return o}return null}function Vu(e){let t=e&&e.fill||"none";return t==="none"?wr.none:e&&e.stale===!0?wr.stale:t==="dim"?wr.dim:e&&e.glyph==="review"?wr.review:e&&e.glyph==="skip"?wr.skip:wr.done}function Ng(e){if(!e||e.fill==="none"||!e.approval_state)return Vu(e);let t=[];return e.glyph==="review"?t.push(wr.review):e.glyph==="skip"&&t.push(wr.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function qg(e,t,n,r){let o=Pg[e]||e,i=t&&t.fill||"none",s=!!t&&t.stale===!0,l=Dg[t&&t.glyph||""]||"",a="bar";i==="dim"?a+=` b-${o} dim`:i==="full"&&(a+=` b-${o} full`),s&&(a+=" stale"),n&&(a+=" cur");let u=i==="none"?"lbl":`lbl l-${o} on`,d=n?`color: var(--stage-${o}-on)`:"",f=Gu[e]||e,_=r?Yu(t):null;if(!_)return c`
      <div class="seg">
        <div class=${a} style=${d}>${l}</div>
        <div class=${u}>${f}</div>
      </div>
    `;let k=`${f} \uBB38\uC11C \uC5F4\uAE30 \xB7 ${_.path}`;return c`
    <button
      type="button"
      class="seg seg--doc"
      aria-label=${k}
      title=${k}
      @click=${m=>{m.preventDefault(),m.stopPropagation(),r(m,_,e)}}
    >
      <div class=${a} style=${d}>${l}</div>
      <div class=${u}>${f}</div>
    </button>
  `}function Yu(e){let t=e?e.doc:null;return!t||typeof t.path!="string"||t.path.length===0?null:t}function gi(e,t,n={}){if(!e||!e.stages)return"";let r=n.onOpenDoc,o=Ku[e.route]||Ku.spec_backed,i=e.stages,s=Mg(o,i,String(t||"open")),l=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${o.map(u=>`${Gu[u]||u} ${u==="plan"?Ng(i[u]||{}):Vu(i[u]||{})}`).join(" \xB7 ")}`,a=!!r&&o.some(u=>Yu(i[u]||{})!==null);return c`
    <div
      class="stp"
      role=${a?"group":"img"}
      aria-label=${l}
    >
      ${o.map(u=>qg(u,i[u]||{},u===s,r))}
    </div>
  `}function jg(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Qu=2;function Xu(e){let t=e.slice(0,Qu).join(", "),n=e.length-Qu;return`\u26D3 blocked: ${t}${n>0?` +${n}`:""}`}function Fg(e,t){if(!t)return[];let n=[],r=Array.isArray(t.blockers)?t.blockers:[],o=[],i=[];for(let s of r)(Qn(e,s)?i:o).push(s);return o.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-dep"
        >${Xu(o)}</span
      >`),i.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-foreign"
        >${Xu(i)}</span
      >`),n}function Bg(e){if(!e||typeof e!="object")return null;let t=e.awaiting_user;if(typeof t!="string")return null;let n=t.trim();return n.length===0?null:c`<span class="ctl-chip ctl-chip--blocked"
    >${`\u23F8 \uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694: ${n}`}</span
  >`}function ll(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function hi(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function ar(e){return`${e.kind}:${hi(e)}@${e.sha}`}function bi(e,t){if(!e)return null;let n=ll(e.kind),r=e.reason,o=e.kind==="delegated"?r===null:typeof r=="string"&&r.trim().length>0&&!/[\r\n]/.test(r);if(!n||!o)return null;let i=ll(t?.kind),s=i!==null&&t?.kind!==e.kind,l=`\uACC4\uD68D \xB7 ${n}${s?` \u2192 ${i}`:""}`,a=`planned_execution ${e.kind}${typeof r=="string"?`:${r}`:""}`,u=t?` \xB7 exec_receipt ${ar(t)}`:"";return{kind:e.kind,label:l,title:`${a}${u}`}}function Zu(e,t){let n=bi(e,t);return n?c`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${n.kind}
        title=${n.title}
        >${n.label}</span
      >`:null}function Ug(e){if(!e)return null;let t=ll(e.kind);return t?c`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${ar(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function Wg(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},o=[];if(r.route&&kr(n,"route")){let l=r.route_source==="derived";o.push(c`<span
        class="ctl-chip ctl-chip--route${l?" is-derived":""}"
        title=${l?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${l?"unset":r.route}</span
      >`)}if(r.fast_track&&kr(n,"fast_track")&&o.push(c`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),r.pr&&kr(n,"pr")){let l=r.pr.number;o.push(c`<span class="ctl-chip ctl-chip--pr"
        >${`PR${l!=null?` #${l}`:""}`}</span
      >`)}let i=Zu(r.planned_execution,r.exec_receipt);if(i&&o.push(i),r.exec_receipt){let l=r.exec_receipt;o.push(c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${ar(l)}`}
        >${`exec ${l.kind==="delegated"?hi(l):`main:${l.actor}`} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}if(r.impl_entry){let l=r.impl_entry;o.push(c`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${l.actor}@${l.sha}`}
        >${`impl ${l.actor} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}for(let l of Fu(e.labels,n))o.push(c`<span class="ctl-chip ctl-chip--label">${l}</span>`);if(e.from_id&&kr(n,"from")&&o.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${l=>{l.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(l,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),kr(n,"blocked")){let l=Bg(e.metadata);l&&o.push(l),o.push(...Fg(e.id,e.blocked_info))}return t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&kr(n,"blocked")&&o.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),o.length===0?"":c`<div class="board-card__chips">${o}</div>`}function Hg(e){let t=vn(e.created_at),n=vn(e.updated_at);return!t&&!n?"":c`<span class="board-card__times">
    ${t?c`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${Xt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&n?c`<span class="board-card__time-sep">·</span>`:""}
    ${n?c`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${Xt(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </span>`}function zg(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return mi(n,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:Hg(e),empty_label:"children \uC5C6\uC74C",childChips:cl,onToggle:r=>t.onRollupToggle&&t.onRollupToggle(r,e.id),onChildClick:(r,o)=>t.onChildClick&&t.onChildClick(r,o)})}function cl(e){let t=e?.workflow?.chips?.planned_execution,n=e?.workflow?.chips?.exec_receipt;return bi(t,n)?c`<span class="board-card__roll-child-chips">
    ${Zu(t,n)}
    ${Ug(n)}
  </span>`:null}function yi(e,t){let n=jg(e.priority);return c`
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
      ${Wg(e,t)}
      ${e.workflow&&kr(t.policy||null,"stepper")?gi(e.workflow,e.status,{onOpenDoc:t.onOpenDoc}):""}
      ${zg(e,t)}
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
  `}function Ju(e,t,n){return c`
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
  `}var Kg=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],Gg=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],Vg=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function Yg(e,t,n){let r=e.labels.length,o=r>0?`\uB77C\uBCA8 ${r}`:"\uB77C\uBCA8";return c`
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
  `}function ed(e,t,n){return c`
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
        ${Kg.map(r=>c`<option
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
        ${Gg.map(r=>c`<option
              value=${r.value}
              ?selected=${e.type===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      ${Yg(e,t,n)}
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
        ${Vg.map(r=>c`<option
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
  `}var Qg=200,Xg={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},Zg=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),td="beads-ui.board.sort",nd=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function Jg(){try{let e=window.localStorage.getItem(td);if(e&&nd.has(e))return e}catch{}return"created_desc"}function rd(e,t){let n=Bt("views:board"),r=t.gotoIssue,o=t.issueStores,i=t.transport,s=t.uiOrderStore,l=t.displayPolicyStore,a=t.workerQueueStore,u=t.onClosedRangeChange,d=t.onNewIssue,f=t.openDoc,_=t.closedRange||ii,k=o?yo(o,s):null,m=Hu({transport:i,uiOrderStore:s}),R=[],T=[],D=[],ne=[],H=[],P=[],O=!1,q=0,F=Jg(),z=new Map,B=new Map,N=new Map,V=new Set,W={search:"",priority:"",type:"",labels:[]},oe=!1,fe=null;function Pe(de){return String(de.status||"open")==="open"}function G(de){return String(de.status||"open")==="open"}function se(de){let ke=W.search.trim().toLowerCase(),He=W.priority,it=W.type,nt=W.labels,pt=Wu(Y());return de.filter(yt=>{if(!pt&&Uu(yt))return!1;if(ke){let et=String(yt.id||"").toLowerCase(),Ne=String(yt.title||"").toLowerCase();if(!et.includes(ke)&&!Ne.includes(ke))return!1}if(He!==""&&String(yt.priority)!==He||it!==""&&String(yt.issue_type||"")!==it)return!1;if(nt.length>0){let et=Array.isArray(yt.labels)?yt.labels:[];if(!nt.some(Ne=>et.includes(Ne)))return!1}return!0})}function _e(){let de=new Set;for(let ke of[R,T,D,ne,H,P])for(let He of ke){let it=Array.isArray(He.labels)?He.labels:[];for(let nt of it)typeof nt=="string"&&nt.length>0&&de.add(nt)}return Array.from(de).sort()}function Oe(){return W.search.trim()!==""||W.priority!==""||W.type!==""||W.labels.length>0}function Q(){try{if(k){let de=k.selectBoardColumn("tab:board:in-progress","in_progress",F),ke=k.selectBoardColumn("tab:board:blocked","blocked",F).filter(G),He=new Set(de.map(U=>U.id)),it=k.selectBoardColumn("tab:board:ready","ready",F).filter(U=>Pe(U)&&!He.has(U.id)),nt=k.selectBoardColumn("tab:board:resolved","resolved",F),pt=k.selectBoardColumn("tab:board:deferred","deferred",F),yt=k.selectBoardColumn("tab:board:closed","closed").slice(0,Qg),et=[...ke,...it,...de,...nt,...yt];ce(et);let Ne=new Set;for(let U of et)U&&U.id&&!pi(U)&&Ne.add(U.id);let S=!Oe();R=S?rs(ke,Ne):ke,T=S?rs(it,Ne):it,D=S?rs(de,Ne):de,ne=S?rs(nt,Ne):nt,H=pt,q=pt.length,P=S?rs(yt,Ne):yt,z=new Map;for(let U of R)z.set(U.id,"open");for(let U of T)z.set(U.id,"open");for(let U of D)z.set(U.id,"in_progress");for(let U of ne)z.set(U.id,"resolved");for(let U of H)z.set(U.id,"deferred");for(let U of P)z.set(U.id,"closed");B=new Map;for(let U of R)B.set(U.id,"blocked-col");for(let U of T)B.set(U.id,"ready-col");for(let U of D)B.set(U.id,"in-progress-col");for(let U of ne)B.set(U.id,"resolved-col");for(let U of P)B.set(U.id,"closed-col")}Xe()}catch{R=[],T=[],D=[],ne=[],H=[],P=[],N=new Map,Xe()}}function ce(de){N=fi(de)}function J(de){return _i(N,de)}function Se(de){return!V.has(de)}function be(de,ke){de.preventDefault(),de.stopPropagation(),V.has(ke)?V.delete(ke):V.add(ke),Xe()}function me(de,ke){de.preventDefault(),de.stopPropagation(),r(ke)}function L(de,ke){de.preventDefault(),de.stopPropagation(),r(ke)}function ee(de,ke){fe||r(ke)}function Re(de,ke){de.preventDefault(),de.stopPropagation(),eh(ke).then(He=>{He&&ve("\uBCF5\uC0AC\uB428","success",1200)})}function I(de,ke){fe=ke,de.dataTransfer&&(de.dataTransfer.setData("text/plain",ke),de.dataTransfer.effectAllowed="move"),de.target.classList.add("board-card--dragging")}function ae(de){de.target.classList.remove("board-card--dragging"),Me(),setTimeout(()=>{fe=null},0)}function le(de){let ke=String(de.target.value||"");!ke||ke===_||(_=ke,u&&u(ke),Xe())}function Y(){return l?l.get():null}function Ae(de){let ke=a?a.get():null,He=ke?ke.cleanup_failed:null;if(!He||typeof He!="object"||Array.isArray(He))return null;let it=He[de];return!it||typeof it!="object"||Array.isArray(it)?null:it}let ge={onCardClick:ee,onCopyId:Re,onDragStart:I,onDragEnd:ae,onClosedRangeChange:le,rollupFor:J,isExpanded:Se,onRollupToggle:be,onChildClick:me,onFromChipClick:L,onOpenDoc:f?(de,ke)=>f(ke):void 0,cleanupFailureFor:Ae,get policy(){return Y()}};function Le(de,ke){fe||(Qe(),r(ke))}function qe(de,ke){de.preventDefault(),de.stopPropagation(),Qe(),r(ke)}let Ze={...ge,onCardClick:Le,onChildClick:qe,onFromChipClick:qe,onOpenDoc:f?(de,ke)=>{Qe(),f(ke)}:void 0,get policy(){return Y()}};function ze(de){let ke=de.target,He=e.querySelector(".board-filter__labels");ke&&He&&He.contains(ke)||Ie()}function ie(de){de.key==="Escape"&&Ie()}function Z(){oe||(oe=!0,document.addEventListener("mousedown",ze),document.addEventListener("keydown",ie),Xe())}function Ie(){oe&&(oe=!1,document.removeEventListener("mousedown",ze),document.removeEventListener("keydown",ie),Xe())}function tt(de){de.key==="Escape"&&Qe()}function st(){O||(O=!0,document.addEventListener("keydown",tt),Xe())}function Qe(){O&&(O=!1,document.removeEventListener("keydown",tt),Xe())}let ct={onClose:Qe,onOverlayClick(de){de.target===de.currentTarget&&Qe()}},$t={onSearchInput(de){W.search=String(de.target.value||""),Q()},onPriorityChange(de){W.priority=String(de.target.value||""),Q()},onTypeChange(de){W.type=String(de.target.value||""),Q()},onSortChange(de){let ke=String(de.target.value||"");if(!(!nd.has(ke)||ke===F)){F=ke;try{window.localStorage.setItem(td,ke)}catch{}Q()}},onDeferredToggle(){O?Qe():st()},onLabelMenuToggle(){oe?Ie():Z()},onLabelToggle(de){let ke=W.labels.indexOf(de);ke===-1?W.labels.push(de):W.labels.splice(ke,1),Q()},onLabelClear(){W.labels.length!==0&&(W.labels=[],Q())},onNewIssue(){d&&d()}};function mt(){return c`
      <div class="board-view">
        ${ed(W,$t,{sort_mode:F,deferred_popup_open:O,deferred_count:q,label_options:_e(),label_menu_open:oe})}
        <div class="board-root">
          ${ko({title:"Blocked",id:"blocked-col",items:se(R)},ge)}
          ${ko({title:"Ready",id:"ready-col",items:se(T)},ge)}
          ${ko({title:"In progress",id:"in-progress-col",items:se(D)},ge)}
          ${ko({title:"Resolved",id:"resolved-col",items:se(ne)},ge)}
          ${ko({title:"Closed",id:"closed-col",items:se(P),is_closed:!0,closed_range:_},ge)}
        </div>
        ${O?Ju({items:se(H),count:q},Ze,ct):""}
      </div>
    `}function Xe(){lt(mt(),e),gt()}function gt(){try{let de=e.querySelector("#deferred-popup");de&&!de.open&&(typeof de.showModal=="function"?de.showModal():de.setAttribute("open",""));let ke=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let He of ke)Array.from(He.querySelectorAll(".board-card")).forEach((nt,pt)=>{nt.tabIndex=pt===0?0:-1})}catch{}}async function Zt(de,ke){if(!i){ve("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await i("update-status",{id:de,status:ke}),ve("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(He){n("update-status failed: %o",He),ve("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function A(de){switch(de){case"blocked-col":return R;case"ready-col":return T;case"in-progress-col":return D;case"resolved-col":return ne;default:return[]}}function re(de,ke,He){if(!i||!s)return;let it=A(de),nt=it.find(S=>S.id===ke);if(!nt)return;let pt=it.filter(S=>S.id!==ke),yt=He.closest?He.closest(".board-card"):null,et=pt.length;if(yt){let S=yt.getAttribute("data-issue-id");if(S===ke)return;let U=pt.findIndex(K=>K.id===S);U>=0&&(et=U)}let Ne=pt.slice();Ne.splice(et,0,nt),m.applyReorder(ke,Ne,et)}function Me(){for(let de of Array.from(e.querySelectorAll(".board-column--drag-over")))de.classList.remove("board-column--drag-over")}let Ce=null;e.addEventListener("dragover",de=>{de.preventDefault(),de.dataTransfer&&(de.dataTransfer.dropEffect="move");let He=de.target.closest(".board-column");He&&He!==Ce&&(Ce&&Ce.classList.remove("board-column--drag-over"),He.classList.add("board-column--drag-over"),Ce=He)}),e.addEventListener("dragleave",de=>{let ke=de.relatedTarget;(!ke||!e.contains(ke))&&Ce&&(Ce.classList.remove("board-column--drag-over"),Ce=null)}),e.addEventListener("drop",de=>{de.preventDefault(),Ce&&(Ce.classList.remove("board-column--drag-over"),Ce=null);let ke=de.target,He=ke.closest(".board-column");if(!He)return;let it=de.dataTransfer?.getData("text/plain")||"";if(!it)return;let nt=He.id,pt=B.get(it);if(pt&&pt===nt){if(Zg.has(nt)){if(F!=="manual"){ve("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}re(nt,it,ke)}return}let yt=Xg[nt];if(!yt){ve("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}z.get(it)!==yt&&Zt(it,yt)}),e.addEventListener("keydown",de=>{let ke=de.target;if(!(ke instanceof HTMLElement))return;let He=String(ke.tagName||"").toLowerCase();if(He==="input"||He==="textarea"||He==="select"||He==="button"||He==="a"||ke.isContentEditable===!0)return;let it=ke.closest(".board-card");if(!it)return;let nt=String(de.key||"");if(nt==="Enter"||nt===" "){de.preventDefault();let Ne=it.getAttribute("data-issue-id");Ne&&r(Ne);return}if(nt!=="ArrowUp"&&nt!=="ArrowDown"&&nt!=="ArrowLeft"&&nt!=="ArrowRight")return;de.preventDefault();let pt=it.closest(".board-column");if(!pt)return;let yt=Array.from(pt.querySelectorAll(".board-card")),et=yt.indexOf(it);if(nt==="ArrowDown"&&et<yt.length-1){Fe(it,yt[et+1]);return}if(nt==="ArrowUp"&&et>0){Fe(it,yt[et-1]);return}if(nt==="ArrowLeft"||nt==="ArrowRight"){let Ne=Array.from(e.querySelectorAll(".board-column")),S=Ne.indexOf(pt),U=nt==="ArrowRight"?1:-1,K=S+U;for(;K>=0&&K<Ne.length;){let we=Ne[K].querySelector(".board-card");if(we){Fe(it,we);return}K+=U}}});function Fe(de,ke){try{de.tabIndex=-1,ke.tabIndex=0,ke.focus()}catch{}}let Ue=null;k&&k.subscribe&&(Ue=k.subscribe(()=>{try{Q()}catch{}}));let dt=null;l&&l.subscribe&&(dt=l.subscribe(()=>{try{Q()}catch{}}));let St=null;return a&&a.subscribe&&(St=a.subscribe(()=>{Xe()})),{async load(){n("load"),Q()},clear(){Ie(),Qe(),Ue&&(Ue(),Ue=null),dt&&(dt(),dt=null),St&&(St(),St=null),e.replaceChildren(),R=[],T=[],D=[],ne=[],H=[],P=[],z=new Map,B=new Map}}}function rs(e,t){return e.filter(n=>{let r=pi(n);return!(r&&t.has(r))})}async function eh(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}var vi=["bug","feature","task","epic","chore"];function od(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var sd=[["input_tokens","input"],["output_tokens","output"],["cache_read_input_tokens","cache_read"],["cache_creation_input_tokens","cache_write"]];var os={usd:null,basis:"none"};function Gr(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function wo(e){return typeof e=="number"&&Number.isFinite(e)}function th(e,t){if(!e||typeof t!="string"||t.length===0||!Gr(e.runners))return null;let n=Object.values(e.runners).filter(r=>Gr(r?.models));for(let r of n){let o=r.models[t];if(Gr(o))return Gr(o.price)?o.price:null}for(let r of n)for(let o of Object.values(r.models))if(Gr(o)&&o.id===t)return Gr(o.price)?o.price:null;return null}function id(e,t,n){if(!Gr(e))return os;if(wo(e.total_cost_usd))return{usd:e.total_cost_usd,basis:"reported"};let r=th(n,t);if(!r)return os;if(sd.some(([i])=>wo(e[i]))){let i=0;for(let[s,l]of sd){let a=wo(e[s])?e[s]:0;if(a<=0)continue;let u=r[l];if(!wo(u))return os;i+=a*u/1e6}return{usd:i,basis:"computed"}}return wo(e.total_tokens)&&wo(r.input)?{usd:e.total_tokens*r.input/1e6,basis:"estimated"}:os}var ul="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",nh="\uBD84\uD574 \uC5C6\uC74C \u2014 \uCD1D\uB7C9\uB9CC \uBCF4\uACE0\uB428",ad="\uBD84\uD574 \uC5C6\uB294 leg",rh="\uCD1D\uB7C9\uB9CC \uBCF4\uACE0\uB41C leg \uD3EC\uD568 \u2014 \uC785\uB825 \uB2E8\uAC00\uB85C \uCD94\uC815",oh="API \uD658\uC0B0 \uB2E8\uAC00 \uAE30\uC900",dl={reported:"",computed:"\uACC4\uC0B0",estimated:"\uCD94\uC815",none:"\uB2E8\uAC00 \uC5C6\uC74C"};function wi(e){if(!e||typeof e.total_cost_usd!="number"||!Number.isFinite(e.total_cost_usd))return null;let t=Wt(e.unpriced_leg_count),n=`$${e.total_cost_usd.toFixed(2)}`;return t>0?`${n} (+${t} leg \uB2E8\uAC00 \uC5C6\uC74C)`:n}function $o(e){let t=wi(e);if(!t||!e)return[];let n=[t];return e.cost_estimated===!0&&n.push(rh),n.push(oh),n}function Wt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Zn=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],xo=[...Zn,"reasoning_output_tokens"],sh={codex:["implementation","review-consult"],claude:["subagent"]};function pl(e){return!e||typeof e!="object"?!1:Number.isFinite(e.total_tokens)&&!Zn.some(t=>Number.isFinite(e[t]))}function ih(e){return!e||typeof e!="object"?!1:xo.some(t=>Number.isFinite(e[t]))}function fl(e){let t=0;for(let n of Zn)t+=Wt(e?.[n]);return t}function ah(e){return!e||typeof e!="object"?!1:Zn.some(t=>Number.isFinite(e[t]))}function ld(e){return!e||typeof e!="object"?!1:xo.some(t=>Number.isFinite(e[t]))||Number.isFinite(e.total_tokens)}function lh(e){let t={};for(let n of xo)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function cd(e){let t={};for(let n of xo)Number.isFinite(e[n])&&(t[n]=e[n]);return Number.isFinite(e.total_tokens)&&(t.total_tokens=e.total_tokens),e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function ud(e,t){return pl(t)?Wt(t.total_tokens):e==="codex"?Wt(t.input_tokens)+Wt(t.output_tokens):fl(t)}function ch(e){return e==="claude"?"Claude":"Codex"}function uh(e){return`\u03C4 ${fd(e)}`}function dh(e,t){let n=t.breakdown||{},r=Wt(t.total_only_subtotal);if(pl(n)||r>0&&!ih(n)){let u=[`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,nh,...$o(t)];return t.replayed&&u.push(ul),u.join(`
`)}let o=[`\uC785\uB825 ${Wt(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Wt(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?o.push(`\uCE90\uC2DC\uC77D\uAE30 ${Wt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Wt(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(o.push(`\uCE90\uC2DC\uC77D\uAE30 ${Wt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${Wt(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&o.push(`\uCD94\uB860\uCD9C\uB825 ${Wt(n.reasoning_output_tokens).toLocaleString("en-US")}`)),r>0&&o.push(`${ad} ${r.toLocaleString("en-US")}`);let i=e==="claude"?"\uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"\uC785\uB825 + \uCD9C\uB825",s=r>0?`${i} + ${ad}`:i,a=[e==="claude"?`Claude subtotal = ${s}`:`Codex subtotal = ${s}; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset`,`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,o.join(" \xB7 ")];return a.push(...$o(t)),t.replayed&&a.push(ul),a.join(`
`)}function mn(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];if(!r)continue;let o=wi(r);t.push({provider:n,label:`${ch(n)} ${uh(r.subtotal)}${o?` \xB7 ${o}`:""}`,tooltip:dh(n,r)})}return t}function $i(e){let t={},n={claude:0,codex:0},r={claude:!1,codex:!1};for(let o of e)if(!(!o||!o.providers))for(let i of["claude","codex"]){let s=o.providers[i];if(!s)continue;let l=t[i];l||(l={subtotal:0,breakdown:{}},t[i]=l),l.subtotal+=s.subtotal,Number.isFinite(s.total_only_subtotal)&&(l.total_only_subtotal=Wt(l.total_only_subtotal)+Wt(s.total_only_subtotal));for(let a of xo)Number.isFinite(s.breakdown[a])&&(l.breakdown[a]=Wt(l.breakdown[a])+Wt(s.breakdown[a]));s.replayed&&(l.replayed=!0),typeof s.total_cost_usd=="number"&&Number.isFinite(s.total_cost_usd)&&(n[i]+=s.total_cost_usd,r[i]=!0,s.cost_estimated===!0&&(l.cost_estimated=!0)),Number.isFinite(s.unpriced_leg_count)&&(l.unpriced_leg_count=Wt(l.unpriced_leg_count)+Wt(s.unpriced_leg_count))}for(let o of["claude","codex"]){let i=t[o];i&&r[o]&&(i.total_cost_usd=n[o])}return Object.keys(t).length===0?null:{providers:t,roles:{}}}function _l(e,t=null){return!e||typeof e!="object"?null:cr({attempt:{...e,bead_id:"__attempt__"}},"__attempt__",t)}function dd(e,t){let n=id(e.usage,e.model,t);e.price_basis=n.basis,n.usd!==null&&(e.price_usd=n.usd)}function ph(e){if(!e.some(t=>t.price_basis!=="none"))for(let t of e)delete t.price_basis}function fh(e){return e==="codex"?"codex":"claude"}function Xn(){return{subtotal:0,breakdown:lh(null),total_only:0,legs:[],replayed:!1,cost_usd:0,priced_count:0,unpriced_count:0,estimated:!1}}function ki(e,t){e.subtotal+=t.subtotal,pl(t.usage)&&(e.total_only+=t.subtotal);for(let n of xo)Number.isFinite(t.usage[n])&&(e.breakdown[n]=Wt(e.breakdown[n])+Wt(t.usage[n]));if(e.legs.push(t),t.replayed===!0&&(e.replayed=!0),t.price_basis===void 0||t.price_basis==="none"){e.unpriced_count+=1;return}e.priced_count+=1,e.cost_usd+=Wt(t.price_usd),t.price_basis==="estimated"&&(e.estimated=!0)}function pd(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return e.priced_count>0&&(n.total_cost_usd=e.cost_usd,e.estimated&&(n.cost_estimated=!0)),e.unpriced_count>0&&(n.unpriced_leg_count=e.unpriced_count),e.total_only>0&&(n.total_only_subtotal=e.total_only),t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function fd(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Ao(e){return ah(e)?`\u03C4 ${fd(fl(e))}`:null}function lr(e){let t=Ao(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function ss(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${Wt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Wt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Wt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Wt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${fl(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(ul),n.join(`
`)}function cr(e,t,n=null){let r={claude:Xn(),codex:Xn()},o={orchestrator:{claude:Xn(),codex:Xn()},implementation:{claude:Xn(),codex:Xn()},"review-consult":{claude:Xn(),codex:Xn()},subagent:{claude:Xn(),codex:Xn()}},i=new Set,s=[];for(let u of Object.values(e||{})){if(!u||u.bead_id!==t)continue;let d=u.usage;if(ld(d)){let _=fh(u.runner),k=cd(d),m={provider:_,role:"orchestrator",attempt_id:String(u.attempt_id||""),usage:k,subtotal:ud(_,k)};k.replayed===!0&&(m.replayed=!0),typeof u.model=="string"&&(m.model=u.model),typeof u.session_id=="string"&&(m.session_id=u.session_id),dd(m,n),s.push(m),ki(r[_],m),ki(o.orchestrator[_],m)}let f=Array.isArray(u.usage_legs)?u.usage_legs:[];for(let _ of f){let k=_&&_.provider==="claude"?"claude":"codex";if(!_||_.provider!=="codex"&&_.provider!=="claude"||!sh[k].includes(_.role)||!ld(_.usage))continue;let m=typeof _.receipt_id=="string"&&_.receipt_id.length>0?_.receipt_id:null;if(!m||i.has(m))continue;i.add(m);let R=cd(_.usage),T={provider:k,role:_.role,attempt_id:String(u.attempt_id||""),usage:R,subtotal:ud(k,R)};T.receipt_id=m,typeof _.agent_type=="string"&&(T.agent_type=_.agent_type),typeof _.agent_id=="string"&&(T.agent_id=_.agent_id),typeof _.model=="string"&&(T.model=_.model),typeof _.effort=="string"&&_.effort.trim().length>0&&(T.effort=_.effort),typeof _.session_id=="string"?T.session_id=_.session_id:typeof _.thread_id=="string"&&(T.session_id=_.thread_id),typeof _.turn_id=="string"&&(T.turn_id=_.turn_id),(typeof _.completed_at=="string"||typeof _.completed_at=="number"&&Number.isFinite(_.completed_at))&&(T.completed_at=_.completed_at),R.replayed===!0&&(T.replayed=!0),dd(T,n),s.push(T),ki(r[k],T),ki(o[T.role][k],T)}}ph(s);let l={};for(let u of["claude","codex"]){let d=r[u];d.legs.length!==0&&(l[u]=pd(d,!1))}if(Object.keys(l).length===0)return null;let a={};for(let u of["orchestrator","implementation","review-consult","subagent"]){let d={};for(let f of["claude","codex"]){let _=o[u][f];_.legs.length>0&&(d[f]={...pd(_,!0),legs:_.legs})}Object.keys(d).length>0&&(a[u]=d)}return{providers:l,roles:a}}var _d={running:3,paused:2,failed:1};function ur(e){if(!e||typeof e!="object")return!1;let t=e.kind;return t==null||t==="implementation"}function md(e){let t=Object.values(e||{}),n=new Map;for(let r of t){if(!r||typeof r.bead_id!="string"||r.bead_id.length===0||r.kind!=="review_session"||r.status!=="running")continue;let o=typeof r.started_at=="number"?r.started_at:null,i=n.get(r.bead_id);i&&(i.started_at??0)>(o??0)||n.set(r.bead_id,{attempt:r,origin:r.origin==="click"||r.origin==="auto"?r.origin:null,started_at:o})}return n}function gd(e,t){let n=Object.values(e||{}),r=new Set,o=new Map;for(let s of n)!s||typeof s.bead_id!="string"||(typeof s.resumed_from=="string"&&s.resumed_from.length>0&&r.add(s.resumed_from),ur(s)&&o.set(s.bead_id,s.attempt_id));let i=new Map;for(let s of n){if(!s||typeof s.bead_id!="string"||s.bead_id.length===0||!ur(s))continue;let l=null;if(s.status==="running")l="running";else if(s.status==="paused"&&!r.has(s.attempt_id))l="paused";else if(s.status==="failed"||s.status==="orphaned"){let d=t.get(s.bead_id),f=typeof d=="number"&&d>0&&typeof s.finished_at=="number"&&d>=s.finished_at;o.get(s.bead_id)===s.attempt_id&&!f&&typeof s.dismissed_at!="number"&&(l="failed")}if(!l)continue;let a=typeof s.started_at=="number"?s.started_at:null,u=i.get(s.bead_id);if(u){let d=_d[u.run_state],f=_d[l];if(d>f||d===f&&(u.started_at??0)>(a??0))continue}i.set(s.bead_id,{attempt:s,run_state:l,started_at:a})}return{winners:i,resumed_from_ids:r}}var _h=["workflow_mode","spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_dispatch","quick_fix_impl_runtime","quick_fix_impl_model","quick_fix_impl_effort","quick_fix_impl_speed","orchestration_model","orchestration_effort","orchestration_speed","quick_fix_orchestration_model","quick_fix_orchestration_effort","quick_fix_orchestration_speed"],vd=["orchestration_model","orchestration_effort","orchestration_speed"],kd=["quick_fix_orchestration_model","quick_fix_orchestration_effort","quick_fix_orchestration_speed"],mh=[...vd,...kd],hd={quick_fix_impl_dispatch:"impl_dispatch",quick_fix_impl_runtime:"impl_runtime",quick_fix_impl_model:"impl_model",quick_fix_impl_effort:"impl_effort",quick_fix_impl_speed:"impl_speed",quick_fix_orchestration_model:"orchestration_model",quick_fix_orchestration_effort:"orchestration_effort",quick_fix_orchestration_speed:"orchestration_speed"},bd={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},yd={spec_review_speed:"spec_review_model",plan_review_speed:"plan_review_model",impl_review_speed:"impl_review_model"},gh=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function rn(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Rt(e){return typeof e=="string"&&e.length>0?e:null}function So(e){return e.startsWith("gpt-")?e.slice(4):e}function wt(e,t,n,r,o){return{value:e,source:t,display:n,full_value:r,resolution:o}}function wd(e,t,n){let r=Rt(t[e]);if(r!==null)return{value:r,source:"pin"};let o=Rt(n[e]);return o===null?null:{value:o,source:"global"}}function $r(e,t,n,r){return wd(e,t,n)||{value:r,source:"base"}}function ml(e,t,n,r){let o=n?.implementation?.model_catalog;if(t&&rn(o?.[t])){let s=Rt(o[t][e]);if(s!==null)return s}if(t&&Array.isArray(o?.[t])&&o[t].includes(e))return e;if(!t&&rn(o)){for(let s of Object.values(o))if(rn(s)){let l=Rt(s[e]);if(l!==null)return l}else if(Array.isArray(s)&&s.includes(e))return e}let i=r?.model_index?.[e];return Rt(r?.runners?.[i]?.models?.[e]?.id)||e}function hh(e,t){return Rt(t?.review?.reviewers?.[e]?.model)||e}function jn(e,t,n=!1){if(e==="default")return wt(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let r=n?So(e):e;return wt(e,t,r,e,"explicit")}function $d(e,t,n){let r=t?.implementation?.model_catalog?.[e],o=[];rn(r)?o.push(...Object.keys(r)):Array.isArray(r)&&o.push(...r.filter(s=>typeof s=="string"));let i=n?.runners?.[e]?.models;if(rn(i))for(let s of Object.keys(i))o.includes(s)||o.push(s);return o}function bh(e,t){let n=[],r=e?.implementation?.model_catalog;rn(r)&&n.push(...Object.keys(r));let o=t?.runners;if(rn(o))for(let i of Object.keys(o))n.includes(i)||n.push(i);return n}function yh(e,t,n){if(e===null)return{runtime:null,offered:!1};let r=!1;for(let o of bh(t,n)){let i=$d(o,t,n);if(i.length>0&&(r=!0),i.includes(e))return{runtime:o,offered:!0}}return{runtime:null,offered:r}}function xi(e){return wt(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function gl(e,t,n){let r=wd(e,t,n);return r?jn(r.value,r.source):wt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function Cn(e){let t=rn(e.pin)?e.pin:{},n=rn(e.global)?e.global:{},r=rn(e.execution_defaults)?e.execution_defaults:null,o=r?.supported===!0&&rn(r.session)?r.session:null,i=r?.supported===!0&&rn(r.orchestration)?r.orchestration:null,s=rn(e.runner_catalog)?e.runner_catalog:null,l=Rt(n.quick_fix_impl_model),a=yh(l,o,s),u={};if(o){let d=$r("workflow_mode",t,n,Rt(o.workflow_mode_default));u.workflow_mode=d.source==="base"?wt(d.value,"base",d.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",d.value,"default"):jn(d.value,d.source);for(let H of["spec_review","plan_review","impl_review"]){let P=`${H}_model`,O=Rt(H==="plan_review"?d.value==="fast_track"?o.plan_review?.fast_track_default:o.plan_review?.standard_recommended:o.review?.default),q=$r(P,t,n,O);if(q.value===null)u[P]=wt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(q.value!=="self"&&q.value!=="skip"&&!rn(o.review?.reviewers?.[q.value]))u[P]=xi(wt(q.value,q.source,"",null,"explicit"));else{let F=hh(q.value,o);u[P]=wt(q.value,q.source,So(F),F,q.source==="base"?"default":"explicit")}}for(let[H,P]of Object.entries(bd)){let O=u[P].value;if(O==="self"||O==="skip"){u[H]=wt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let q=Rt(o.review?.reviewers?.[O||""]?.effort),F=$r(H,t,n,q);u[H]=F.value===null?wt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):wt(F.value,F.source,F.value,F.value,F.source==="base"?"default":"explicit")}for(let[H,P]of Object.entries(yd)){let O=u[P];if(O.resolution==="incompatible"||O.value==="self"||O.value==="skip"){u[H]=wt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}if(O.resolution==="unavailable"){u[H]=wt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}let q=$r(H,t,n,"default");u[H]=q.source==="base"?wt("default","base","default (\uC77C\uBC18)","default","default"):jn(q.value,q.source)}let f=rn(o.implementation?.default)?o.implementation.default:{},_=Rt(e.route),k=_!==null&&["quick_fix","spec_backed","full_plan"].includes(_),m=rn(o.implementation?.route_defaults)?o.implementation.route_defaults:{},R=k&&rn(m[_])?m[_]:{},T={},D=!1;if(_==="quick_fix"){let H=Rt(t.impl_runtime),P=Rt(n.quick_fix_impl_runtime),O=H||P,q=O==="inherit"?Rt(e.controller_runtime):O;D=l!==null&&a.runtime!==null&&(O===null||q===a.runtime);let F=Rt(t.impl_dispatch),z=Rt(n.quick_fix_impl_dispatch);if(F!==null)u.impl_dispatch=jn(F,"pin"),T.impl_dispatch="pin";else if(z!==null)u.impl_dispatch=jn(z,"global"),T.impl_dispatch="quick_fix";else if(D)u.impl_dispatch=wt("delegated","global","\uC704\uC784 (\uBAA8\uB378 \uD568\uC758)","delegated","explicit"),T.impl_dispatch="implied";else{let B=Rt(R.dispatch)||Rt(f.dispatch);u.impl_dispatch=B?wt(B,"base",B,B,"default"):wt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"),T.impl_dispatch="base"}if(H!==null)u.impl_runtime=jn(H,"pin"),T.impl_runtime="pin";else if(P!==null)u.impl_runtime=jn(P,"global"),T.impl_runtime="quick_fix";else if(D){let B=a.runtime;u.impl_runtime=wt(B,"global",`${B} (\uC720\uB3C4)`,B,"explicit"),T.impl_runtime="derived"}else{let B=$r("impl_runtime",{},n,Rt(f.runtime));u.impl_runtime=B.value===null?wt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):wt(B.value,B.source,B.value,B.value,B.source==="base"?"default":"explicit"),T.impl_runtime=B.source}for(let B of["impl_model","impl_effort","impl_speed"]){let N=Rt(t[B]),V=Rt(n[`quick_fix_${B}`]),W;N!==null?(W={value:N,source:"pin"},T[B]="pin"):B==="impl_model"&&D&&l!==null?(W={value:l,source:"global"},T[B]="quick_fix"):B!=="impl_model"&&V!==null?(W={value:V,source:"global"},T[B]="quick_fix"):(W=$r(B,{},n,Rt(f[B.replace("impl_","")])),T[B]=W.source),u[B]=W.value===null?wt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):wt(W.value,W.source,W.value,W.value,W.source==="base"?"default":"explicit")}}else for(let H of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let P=$r(H,t,n,H==="impl_dispatch"?Rt(R.dispatch)||Rt(f.dispatch):Rt(f[H.replace("impl_","")]));u[H]=P.value===null?wt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):wt(P.value,P.source,P.value,P.value,P.source==="base"?"default":"explicit")}let ne=u.impl_dispatch.value==="main";if(ne?u.impl_dispatch.display=T.impl_dispatch==="quick_fix"?"\uBA54\uC778 (quick_fix)":"\uBA54\uC778":u.impl_dispatch.value==="delegated"&&(T.impl_dispatch==="quick_fix"?u.impl_dispatch.display="\uC704\uC784 (quick_fix)":T.impl_dispatch!=="implied"&&(u.impl_dispatch.display="\uC704\uC784")),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_model.value!==null){let H=u.impl_runtime.value==="inherit"?Rt(e.controller_runtime):u.impl_runtime.value,P=H?$d(H,o,s):[];_==="quick_fix"&&T.impl_model==="base"&&T.impl_runtime!=="base"&&P.length>0&&!P.includes(u.impl_model.value)&&(u.impl_model=wt("auto","base","auto","auto","default"));let O=u.impl_model.value;if(O!=="auto"&&P.length>0&&!P.includes(O))u.impl_model=xi(u.impl_model);else{let q=ml(O,H,o,s);u.impl_model.display=So(q),u.impl_model.full_value=q,T.impl_model==="quick_fix"&&(u.impl_model.display=`${u.impl_model.display} (quick_fix)`)}}if(u.impl_effort.value==="auto"){let H=Rt(e.transport)||(u.impl_runtime.value==="codex"?"codex-native-spawn":u.impl_runtime.value==="claude"?"implement-claude":null),P=H?Rt(o.implementation?.effort_by_transport?.[H]?.auto):null;P&&!gh.has(P)?(u.impl_effort.display=`${P} (\uBE44\uD638\uD658)`,u.impl_effort.full_value=P,u.impl_effort.resolution="incompatible"):(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}T.impl_effort==="quick_fix"&&u.impl_effort.value!==null&&(u.impl_effort=wt(u.impl_effort.value,"global",`${u.impl_effort.value} (quick_fix)`,u.impl_effort.value,"explicit")),u.impl_speed.value==="default"&&(u.impl_speed=T.impl_speed==="quick_fix"?wt("default","global","default (quick_fix)","default","explicit"):u.impl_speed.source==="base"?wt("default","base","default (\uC77C\uBC18)","default","default"):jn("default",u.impl_speed.source));for(let H of["impl_runtime","impl_effort","impl_speed"])T[H]==="quick_fix"&&u[H].value!==null&&!u[H].display.endsWith("(quick_fix)")&&(u[H].display=`${u[H].display} (quick_fix)`);if(_==="quick_fix"){l!==null&&!D&&a.offered&&(u.quick_fix_impl_model=xi(wt(l,"global","",l,"explicit")));for(let[H,P]of Object.entries(hd))!H.startsWith("quick_fix_orchestration_")&&!Object.hasOwn(u,H)&&(u[H]={...u[P]});u.impl_dispatch.source==="base"&&u.impl_dispatch.value==="main"&&(u.quick_fix_impl_dispatch=wt("main","base","\uBA54\uC778 (\uD558\uB124\uC2A4)","main","default"))}if(ne)for(let H of["impl_runtime","impl_model","impl_effort","impl_speed"])u[H]=wt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else for(let d of _h.filter(f=>!mh.includes(f)))u[d]=gl(d,t,n);if(!o){for(let[d,f]of Object.entries(bd))(u[f].value==="self"||u[f].value==="skip")&&(u[d]=wt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));for(let[d,f]of Object.entries(yd))(u[f].value==="self"||u[f].value==="skip")&&(u[d]=wt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let d of["impl_runtime","impl_model","impl_effort","impl_speed"])u[d]=wt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else u.impl_dispatch.value==="delegated"&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_effort.value==="auto"&&(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}for(let d of vd){if(!i){u[d]=gl(d,t,n);continue}let f=d.replace("orchestration_",""),_=Rt(i[f]),k=`quick_fix_${d}`,m=e.route==="quick_fix"?Rt(n[k]):null,R=Rt(t[d]),T=R!==null?{value:R,source:"pin"}:m!==null?{value:m,source:"global"}:$r(d,{},n,_),D=R===null&&m!==null;if(d==="orchestration_effort"&&T.source==="base"){u[d]=wt(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(T.value===null){u[d]=wt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(d==="orchestration_model"){let ne=T.source==="base"?Rt(i.model_id)||T.value:ml(T.value,null,o,s);u[d]=wt(T.value,T.source,`${So(ne)}${D?" (quick_fix)":""}`,ne,T.source==="base"?"default":"explicit");continue}if(T.value==="default"){u[d]=D?wt("default","global","default (quick_fix)","default","explicit"):T.source==="base"?wt("default","base","default (\uC77C\uBC18)","default","default"):jn("default",T.source);continue}u[d]=D?wt(T.value,"global",`${T.value} (quick_fix)`,T.value,"explicit"):jn(T.value,T.source)}for(let d of kd){let f=hd[d];u[d]=u[f]?{...u[f]}:gl(d,t,n)}if(o&&e.route!=="quick_fix")if(l===null){let d=u.orchestration_model.full_value;u.quick_fix_impl_model=wt(null,"base",d===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${So(d)})`,null,"default")}else if(a.runtime!==null){let d=ml(l,a.runtime,o,s);u.quick_fix_impl_model=wt(l,"global",So(d),d,"explicit")}else a.offered?u.quick_fix_impl_model=xi(wt(l,"global","",null,"explicit")):u.quick_fix_impl_model=jn(l,"global");return u}function vh(e,t){let n=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let r=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${n} (${r})`}function Ai(e){let t=rn(e.pin)?e.pin:{},n=rn(e.global)?e.global:{},r=rn(e.resolution_global)?{...e.resolution_global}:{};delete r[e.key];let o=f=>{let _={...r,...f};return Cn({pin:e.layer==="pin"?_:t,global:e.layer==="pin"?n:_,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},i=e.layer==="pin"?t:n,s={...i};delete s[e.key];let l=o(s)[e.key],a=o(i)[e.key],u=Rt(i[e.key]),d=[...e.choices];return u!==null&&!d.includes(u)&&d.unshift(u),{unset_label:vh(l,e.layer==="pin"),full_value:l.full_value,unavailable:l.resolution==="unavailable",disabled:a?.resolution==="not_applicable",options:d.map(f=>{let _=o({...i,[e.key]:f})[e.key];return{value:f,label:_.display,full_value:_.full_value}})}}var Si=["workflow_mode","spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],kh=["quick_fix_impl_dispatch","quick_fix_impl_runtime","quick_fix_impl_model","quick_fix_impl_effort","quick_fix_impl_speed"],is=[...Si.filter(e=>e!=="impl_dispatch"),...kh,"base_sync_accept_local_commits","bdui_url"],xd=["base_sync_accept_local_commits"],as="true";function Ei(e){let t={};if(!hn(e))return t;for(let[n,r]of Object.entries(e)){if(xd.includes(n)){r===!0&&(t[n]=as);continue}typeof r=="string"&&(t[n]=r)}return t}function Ad(e){let t;try{t=new URL(e)}catch{return!1}return(t.protocol==="http:"||t.protocol==="https:")&&e===t.origin}var Fn=["orchestration_model","orchestration_effort","orchestration_speed"],Eo=["quick_fix_orchestration_model","quick_fix_orchestration_effort","quick_fix_orchestration_speed"],hl=Object.freeze({orchestration_model:"quick_fix_orchestration_model",orchestration_effort:"quick_fix_orchestration_effort",orchestration_speed:"quick_fix_orchestration_speed",impl_dispatch:"quick_fix_impl_dispatch",impl_runtime:"quick_fix_impl_runtime",impl_model:"quick_fix_impl_model",impl_effort:"quick_fix_impl_effort",impl_speed:"quick_fix_impl_speed"}),To=[...Si,...Fn],wh=is.filter(e=>To.includes(e));function $h(e,t){let n={},r=[];for(let[i,s]of Object.entries(hl)){let l=e[i];if(!Object.hasOwn(e,i)){n[s]=null;continue}let a=t[s];if(typeof l!="string"||!Array.isArray(a)||!a.includes(l)){n[s]=null,r.push(`lane_incompatible:${s}`);continue}n[s]=l}let o=Object.keys(e).filter(i=>!Object.hasOwn(hl,i));return{values:n,warnings:r,skipped_keys:o}}var ls=["delegated","main"],Ti=["inherit","claude","codex"],Jn=["default","fast"],cs=["standard","fast_track"],us=["codex","opus","fable","self","skip"],Ri=["codex","fable","skip"],Ci=["low","medium","high","xhigh"],Sd=["default","fast"],Tn="auto";function hn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Ed(e){if(!hn(e)||!hn(e.runners))return[];let t=[];for(let[n,r]of Object.entries(e.runners))hn(r)&&hn(r.models)&&t.push([n,Object.keys(r.models)]);return t}function Ro(e,t){let n=Ed(e),r=t&&t!=="inherit"?n.filter(([o])=>o===t):n;return[Tn,...r.flatMap(([,o])=>o)]}function Td(e,t,n,r){if(!hn(e)||!hn(e.runners))return[Tn];let o=[];for(let[i,s]of Object.entries(e.runners))if(!(!hn(s)||!hn(s.models))&&!(t&&t!=="inherit"&&i!==t))for(let[l,a]of Object.entries(s.models)){if(n&&n!==Tn&&l!==n)continue;let u=r(s,a);if(Array.isArray(u))for(let d of u)typeof d=="string"&&!o.includes(d)&&o.push(d)}return[Tn,...o]}function Vr(e,t,n){return Td(e,t,n,(r,o)=>hn(o)&&Array.isArray(o.efforts)?o.efforts:r.efforts)}function Oi(e,t,n){return Td(e,t,n,(r,o)=>hn(o)&&Array.isArray(o.orchestration_efforts)?o.orchestration_efforts:hn(o)&&Array.isArray(o.efforts)?o.efforts:r.efforts)}function Co(e,t){let n=Ed(e);return(t?n.filter(([o])=>o===t):n).flatMap(([,o])=>o)}function Rd(e,t,n){let r={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},o=r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:r.impl_runtime==="inherit"?n:null;return o&&(r.impl_model&&!Ro(t,o).includes(r.impl_model)&&(r.impl_model=void 0),r.impl_effort&&!Vr(t,o,r.impl_model||Tn).includes(r.impl_effort)&&(r.impl_effort=void 0)),r}var xh={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",spec_review_speed:"\uC2A4\uD399 \uB9AC\uBDF0 \uC18D\uB3C4",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",plan_review_speed:"\uACC4\uD68D \uB9AC\uBDF0 \uC18D\uB3C4",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_review_speed:"\uAD6C\uD604 \uB9AC\uBDF0 \uC18D\uB3C4",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},Ah={quick_fix_orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",quick_fix_orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",quick_fix_orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4",quick_fix_impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",quick_fix_impl_runtime:"\uC704\uC784 \uB300\uC0C1",quick_fix_impl_model:"\uBAA8\uB378",quick_fix_impl_effort:"effort",quick_fix_impl_speed:"\uC18D\uB3C4"},bl=[...wh,...Fn],Sh=[...To,...is].filter((e,t,n)=>n.indexOf(e)===t&&!bl.includes(e));function Cd(e,t){let n=hn(e)?e:{},r=hn(t)?t:{},o=[];for(let s of bl){let l=n[s]??null,a=r[s]??null;l!==a&&o.push({key:s,label:xh[s]||s,before:l,after:a,kind:l===null?"added":a===null?"removed":"changed"})}let i=[];for(let s of[...Sh,...Object.keys(r)])!bl.includes(s)&&!i.includes(s)&&Object.hasOwn(r,s)&&i.push(s);return{rows:o,ignored_keys:i}}function Od(e,t,n){let r=hn(e)?e:{},o=$h(hn(t)?t:{},n),i=[];for(let s of Object.values(hl)){let l=r[s]??null,a=o.values[s]??null;l!==a&&i.push({key:s,label:Ah[s]||s,before:l,after:a,kind:l===null?"added":a===null?"removed":"changed"})}return{rows:i,ignored_keys:o.skipped_keys}}function yl(e,t,n,r,o,i,s=null){return Ai({key:e,choices:t,layer:"global",global:n,resolution_global:i,execution_defaults:r,runner_catalog:o,route:s})}function Id(e,t){let n={};for(let r of is){let o=e?.[r],i=t?.[r];if(o!==i){if(xd.includes(r)){n[r]=i===as?!0:null;continue}n[r]=typeof i=="string"&&i.length>0?i:null}}return n}function Ld(e,t){let n={};for(let r of[...Fn,...Eo]){let o=e?.[r]??null,i=t?.[r]??null;o!==i&&(n[r]=typeof i=="string"&&i.length>0?i:null)}return n}var vl=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Fn]}],xr={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",spec_review_speed:"\uC0AC\uC591 \uB9AC\uBDF0 \uC18D\uB3C4",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",plan_review_speed:"\uACC4\uD68D \uB9AC\uBDF0 \uC18D\uB3C4",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_review_speed:"\uAD6C\uD604 \uB9AC\uBDF0 \uC18D\uB3C4",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},Ii={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function kl(e,t,n,r,o,i=null){let s=Cn({pin:t,global:n,execution_defaults:r,runner_catalog:o,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:i});return e.map(l=>({key:l,...s[l]}))}function Pd(e,t,n,r,o,i=null){let s={pin:0,global:0,base:0};for(let l of kl(e,t,n,r,o,i))s[l.source]+=1;return s}function Dd(e,t,n){return{id:e,key:t,value:typeof n=="string"?n:""}}function Md(e,t,n){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:n}}var R0=[...Si,...Fn];var Nd=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed","impl_runtime","impl_model","impl_effort"];function ds(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Li(e){if(!ds(e)||!ds(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>ds(n)&&ds(n.models));return t.length>0?t:null}function Bn(e,t){let n=Li(e);if(!n||!t)return null;for(let[r,o]of n)if(Object.hasOwn(o.models,t))return r;return null}function qd(e,t){return ds(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function jd(e,t){let n=Li(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return qd(r,r.models[t]);return[]}function Eh(e){let t=Li(e);if(!t)return[];let n=[];for(let[,r]of t)for(let o of Object.values(r.models))for(let i of qd(r,o))n.includes(i)||n.push(i);return n}function Th(e,t){if(!t)return Eh(e);let r=Li(e)?.find(([i])=>i===t)?.[1];if(!r)return[];let o=[];for(let i of Object.keys(r.models))for(let s of jd(e,i))o.includes(s)||o.push(s);return o}function Fd(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},o=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!o)return r.impl_model="",r.impl_effort="",r;let i=Bn(t,r.impl_model);if(r.impl_model&&(!o||i!==o))return r.impl_model="",r.impl_effort="",r;let s=r.impl_model?jd(t,r.impl_model):Th(t,o);return r.impl_effort&&s.length>0&&!s.includes(r.impl_effort)&&(r.impl_effort=""),r}function On(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function ps(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}var wl=new Set(["unavailable","not_applicable"]);function Ar(e,t){if(typeof e!="object"||e===null)return null;let n=e[t];return typeof n=="object"&&n!==null?n:null}function Bd(e){return e.filter(t=>t!==null).join(" \xB7 ")}function Sr(e,t){return t===null?null:`${xr[e]}: ${t.display} (${Ii[t.source]})`}function $l(e){return e.filter(t=>t!==null).join(`
`)}function Pi(e){if(typeof e!="object"||e===null)return null;let t=On(e);if(t==="")return null;let n=(r,o)=>typeof o=="string"&&o.length>0?`${r}: ${o}`:null;return{text:t,title:$l(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",n("runner",e.runner),n(xr.orchestration_model,e.model),n(xr.orchestration_effort,e.effort),n(xr.orchestration_speed,e.speed)])}}function Oo(e,t){let n=Ar(e,"orchestration_model");if(n===null||n.resolution==="unavailable")return null;let r=Ar(e,"orchestration_effort"),o=Ar(e,"orchestration_speed"),i=Bd([Bn(t,n.value??""),n.display,r!==null&&r.value!==null?r.display:null,o!==null&&o.value==="fast"?"Fast":null]);return i===""?null:{text:i,title:$l(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",Sr("orchestration_model",n),Sr("orchestration_effort",r),Sr("orchestration_speed",o)])}}function Rh(e,t){return e===null||e.value===null||wl.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function Ch(e){return e===null||wl.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function Oh(e){return e===null?null:e.value==="auto"?"auto":wl.has(e.resolution)?null:e.display}function Yr(e,t){if(typeof e!="object"||e===null)return null;let n=Ar(e,"impl_dispatch"),r=Ar(e,"impl_runtime"),o=Ar(e,"impl_model"),i=Ar(e,"impl_effort"),s=Ar(e,"impl_speed"),l=n!==null&&n.value==="main"?"\uBA54\uC778":Bd([Rh(r,t??null),Ch(o),Oh(i),s!==null&&s.value==="fast"?"Fast":null]);return l===""?null:{text:l,title:$l(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",Sr("impl_dispatch",n),Sr("impl_runtime",r),Sr("impl_model",o),Sr("impl_effort",i),Sr("impl_speed",s)])}}var Ih=Object.freeze(new Set(["push_not_contained","invalid_impl_review","premature_close","head_mismatch","foreign_deploy_unsupported","not_resolved"])),Lh=Object.freeze(["delivery_unproven:"]);function Di(e){let t=e&&typeof e.reason=="string"?e.reason:"";if(t.length===0||Ih.has(t))return"session";for(let n of Lh)if(t.startsWith(n))return"session";return"settlement"}var Ph=["hard_diagnosis","invariant_reasoning","verification_by_judgment","claude_bound"];var Dh={hard_diagnosis:"\uC6D0\uC778\uC774 \uBD88\uBA85\uD655\uD558\uAC70\uB098 \uC7AC\uD604\uC774 \uBD88\uC548\uC815\uD574 \uAC00\uC124-\uAC80\uC99D \uB8E8\uD504\uAC00 \uD544\uC694\uD558\uB2E4",invariant_reasoning:"\uC815\uD569\uC131\uC774 \uC0C1\uD0DC\uAE30\uACC4\xB7\uB3D9\uC2DC\uC131\xB7\uBD88\uBCC0\uC2DD \uCD94\uB860\uC5D0 \uB2EC\uB824 \uC788\uB2E4",verification_by_judgment:"\uD14C\uC2A4\uD2B8\uAC00 \uBABB \uC7A1\uACE0 \uB9AC\uBDF0\uC5B4\uC758 \uCD94\uB860\uC73C\uB85C\uB9CC \uAC80\uC99D\uD560 \uC218 \uC788\uB2E4",claude_bound:"Claude \uC138\uC158 \uC790\uC0B0\xB7\uC758\uBBF8\uB860\uC5D0 \uAC15\uD558\uAC8C \uBB36\uC5EC \uC788\uB2E4"};function xl(e){return(e&&Array.isArray(e.reasons)?e.reasons:[]).map(n=>Dh[n]||"").filter(n=>n.length>0)}var Ud={orchestration_model:["fable"],impl_runtime:["claude"]},Al={unapplied:"\uBBF8\uC801\uC6A9",applied:"\uC801\uC6A9\uB428",diverged:"\uCD94\uCC9C\uACFC \uB2E4\uB984"};function Wd(e){return typeof e=="object"&&e!==null?e:null}function Hd(e,t){return typeof e=="string"&&t.includes(e)?e:""}function Mh(e){return typeof e!="string"?[]:e.split("+").map(t=>t.trim()).filter(t=>Ph.includes(t))}function fs(e,t=e){let n=Wd(e);if(!n)return null;let r=Hd(n.rec_orchestration_model,Ud.orchestration_model);if(r.length===0)return null;let o=Hd(n.rec_impl_runtime,Ud.impl_runtime),i={orchestration_model:r};o.length>0&&(i.impl_runtime=o);let s=Wd(t)||{},l=Object.keys(i),a=0,u=0;for(let f of l){let _=s[f];typeof _=="string"&&_.length>0&&(a+=1,_===i[f]&&(u+=1))}let d=a===0?"unapplied":u===l.length?"applied":"diverged";return{reasons:Mh(n.rec_reason),rec:i,state:d}}function Mi(e){if(!e||typeof e!="object")return"";let t=xl(e),n=Al[e.state]||"",r=["\uBCF5\uC7A1\uD55C \uC791\uC5C5\uC73C\uB85C \uD310\uC815\uB428"];return t.length>0&&r.push(`\uC0AC\uC720: ${t.join(" \xB7 ")}`),n.length>0&&r.push(`\uC0C1\uD0DC: ${n}`),r.join(`
`)}function Ni(e){return e.replace(/\/+$/,"")}function Nh(e,t){let n=Ni(e),r=Ni(t);return n===r||r.startsWith(`${n}/`)||n.startsWith(`${r}/`)}function qi(e,t){let n=new Set;for(let r of e)for(let o of t){if(!Nh(r,o))continue;let i=Ni(r),s=Ni(o);n.add(i.length>=s.length?i:s)}return[...n].sort()}function Sl(e,t){return`${e}\0${t}`}function zd(e){let t=new Map;for(let n of Array.isArray(e?.running)?e.running:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"running",state:"running"});for(let n of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let n of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let r=Array.isArray(n.sublanes?.parallel)?n.sublanes.parallel:Array.isArray(n.items)?n.items:[];for(let o of r)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:"parallel",position:o.queue_position});for(let o of Array.isArray(n.sublanes?.serial)?n.sublanes.serial:[])for(let i of o.items)t.set(i.id,{root_dir:i.root_dir,workspace_name:i.workspace_name,lane:o.id,position:i.queue_position})}for(let n of Array.isArray(e?.runnable)?e.runnable:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"runnable",state:"runnable"});for(let n of Array.isArray(e?.done)?e.done:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"done",state:"done"});return t}function ms(e,t){let n=Array.isArray(t)?t:[],r=e.indexOf("-"),o=r>0?e.slice(0,r):e;return n.some(i=>typeof i?.issue_prefix=="string"&&i.issue_prefix===o)?"internal":n.length>0&&n.every(i=>typeof i?.issue_prefix=="string")?"external":"unknown"}function _s(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function Kd(e,t,n,r){let o=n.get(e);if(!!(o&&t&&o.root_dir===t.root_dir&&o.lane===t.lane&&typeof o.position=="number"&&typeof t.position=="number"&&o.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0};if(o)return{id:e,label:`\u{1F512} ${e} (${_s(o)})`,location_label:_s(o),scope:null,same_lane_ahead:!1};let s=ms(e,r),l=s==="internal"?"\uBBF8\uC801\uC7AC":s==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${l})`,location_label:l,scope:s,same_lane_ahead:!1}}function Gd(e){let t=Array.isArray(e)?e:[],n=new Map,r=new Map,o=new Map;for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let u=Sl(l.root_dir,a.id);n.set(u,{root_dir:l.root_dir,workspace_name:l.name,lane:a.id}),o.set(u,[]);for(let d of Array.isArray(a.items)?a.items:[])r.set(d.id,u)}for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let u=Sl(l.root_dir,a.id),d=Array.isArray(a.items)?a.items[0]:null,_=!!d&&d.queue_index===0&&(!Array.isArray(a.occupied_by)||a.occupied_by.length===0)&&Array.isArray(d.blocked_by)?d.blocked_by:[],k=o.get(u);if(k)for(let m of _){let R=r.get(m);R&&R!==u&&!k.includes(R)&&k.push(R)}}let i=(l,a)=>{let u=new Set,d=[l];for(;d.length>0;){let f=d.pop();if(f===a)return!0;!f||u.has(f)||(u.add(f),d.push(...o.get(f)||[]))}return!1},s=new Map;for(let[l,a]of o){let u=[];for(let d of a){let f=n.get(d);i(d,l)&&f&&u.push(f)}u.length>0&&s.set(l,u)}return s}function Vd(e,t){return Sl(e,t)}var bn=e=>e??zt;var qh=Object.freeze(["done","abandoned"]);function Yd(e){return!e||typeof e!="object"||Array.isArray(e)?!1:typeof e.phase=="string"&&!qh.includes(e.phase)}var jh=".chip-popover, .judgement-chip";function Io(e){let t=null,n=!1;function r(d){return t!==null&&t.bead_id===d.bead_id&&t.chip_key===d.chip_key}function o(d){t=r(d)?null:{...d},e()}function i(){t!==null&&(t=null,e())}function s(d){let f=d.target;t!==null&&(f&&typeof f.closest=="function"&&f.closest(jh)||i())}function l(d){d.key==="Escape"&&i()}function a(){n||(n=!0,document.addEventListener("click",s),document.addEventListener("keydown",l))}function u(){n&&(n=!1,document.removeEventListener("click",s),document.removeEventListener("keydown",l))}return{toggle:o,close:i,isOpen:r,attach:a,detach:u}}function Lo(e){return c`<div
    class="chip-popover"
    role="dialog"
    aria-label=${e.title}
  >
    <div class="chip-popover__title">${e.title}</div>
    <ul class="chip-popover__lines">
      ${e.lines.map(t=>c`<li>${t}</li>`)}
    </ul>
  </div>`}async function kn(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}async function Fh(e){let t=await kn(e);ve(t?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",t?"success":"error",1200)}function Qr(e){return typeof e!="string"||e.length===0?"":c`<span class="worker-ev__copyline"
    ><code class="worker-ev__path">${e}</code
    ><button
      type="button"
      class="worker-ev__copy"
      data-seam="log-path-copy"
      title="로그 경로 복사"
      aria-label=${`\uB85C\uADF8 \uACBD\uB85C \uBCF5\uC0AC: ${e}`}
      @click=${()=>{Fh(e)}}
    >
      ⧉
    </button></span
  >`}var Qd=Object.freeze(["spec_backed","full_plan","quick_fix"]);var Bh="worker-ineligible";function gs(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Xd(e){return gs(e).includes(Bh)}var Uh=new Set(Qd),Zd=new WeakMap;function Po(e){return e&&typeof e=="object"?e:{}}function Wh(e){let t=Zd.get(e);if(t)return t;let n=ep(e);return Zd.set(e,n),n}function ji(e,t){return(Array.isArray(e)?e:[]).findIndex(r=>r&&r.bead_id===t)}function Hh(e,t){if(e.length===0)return null;if(Wh(t).has(e))return{lane:"running"};if(ji(t.pr_wait,e)>=0)return{lane:"pr_wait"};let n=ji(t.queue,e);if(n>=0)return{lane:"parallel",index:n};for(let r of Array.isArray(t.serial_lanes)?t.serial_lanes:[]){if(!r||typeof r.id!="string"||!/^s[1-5]$/.test(r.id))continue;let o=ji(r.entries,e);if(o>=0)return{lane:r.id,index:o}}return ji(t.done,e)>=0?{lane:"done"}:null}function El(e,t){let n=Uh.has(e.route),r=e.route==="quick_fix";return{placeable:n&&!e.worker_ineligible&&!e.awaiting_user&&(r?e.has_description:e.spec==="published")&&t===null,route_ok:n,worker_ineligible:e.worker_ineligible,awaiting_user:e.awaiting_user,missing_description:r&&!e.has_description,spec:e.spec,location:t}}function hs(e,t){let n=Po(e),r=Po(t),o=ho(n),i=n.workflow?.route_source==="explicit"&&typeof n.workflow.route=="string"&&n.workflow.route||(typeof Po(n.metadata).route=="string"?Po(n.metadata).route:""),s=i==="quick_fix",l=!Object.hasOwn(n,"description")||typeof n.description=="string"&&n.description.trim().length>0,a=Object.hasOwn(n,"labels")&&Xd(n.labels),u=Object.hasOwn(Po(n.metadata),"awaiting_user"),d=Hh(typeof n.id=="string"?n.id:"",r);return El({route:i,spec:s?"n/a":o.conflict?"conflict":o.evidence,has_description:l,awaiting_user:u,worker_ineligible:a},d)}function Xr(e){let t=e.location;if(t)switch(t.lane){case"running":return"\uC2E4\uD589 \uC911\uC774\uB77C \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4";case"pr_wait":return"PR \uB300\uAE30 \uC911\uC774\uB77C \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4";case"done":return"\uC644\uB8CC \uB808\uC778\uC5D0 \uC788\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4";case"parallel":return`\uC774\uBBF8 \uB300\uAE30 \uC911 \xB7 \uBCD1\uB82C #${t.index+1}`;default:return`\uC774\uBBF8 \uB300\uAE30 \uC911 \xB7 \uC9C1\uB82C ${t.lane.slice(1)} #${t.index+1}`}return e.placeable?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":e.route_ok===!1?"route\uAC00 \uC815\uD574\uC9C0\uC9C0 \uC54A\uC544 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":e.worker_ineligible?"worker-ineligible label\uB85C \uC6CC\uCEE4\uC5D0\uC11C \uC2E4\uD589\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":e.awaiting_user?"\uC0AC\uC6A9\uC790 \uB9AC\uBDF0\uB97C \uAE30\uB2E4\uB9AC\uB294 \uC911\uC774\uB77C \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":e.missing_description?"description\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":e.spec==="conflict"?"spec \uACBD\uB85C\uAC00 \uCDA9\uB3CC\uD574 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"spec\uC774 \uBC1C\uD589\uB418\uC9C0 \uC54A\uC544 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}function bs(e){let t=Po(e),n=typeof t.serial_lane_count=="number"&&Number.isInteger(t.serial_lane_count)&&t.serial_lane_count>0?Math.min(t.serial_lane_count,5):0,r=Array.isArray(t.serial_lanes)?t.serial_lanes:[],o=[];for(let s of r){if(o.length>=n)break;!s||typeof s.id!="string"||!/^s[1-5]$/.test(s.id)||!Array.isArray(s.entries)||o.push({id:s.id,label:`\uC9C1\uB82C ${s.id.slice(1)}`,count:s.entries.length})}return o.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(t.queue)?t.queue:[]).length},...o]}function Jd(e){return/^s[1-5]$/.test(e)?`\uC9C1\uB82C ${e.slice(1)}`:"\uBCD1\uB82C"}function Ui(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function rp(e){return e==="session"?"bead\uAC00 in_progress\uB85C \uC7A1\uD78C \uB4A4 \uB2EB\uD788\uAE30\uAE4C\uC9C0\uC758 \uACBD\uACFC":"attempt \uC2E4\uD589 \uC2DC\uAC04 \uD569\uC0B0 (\uC7AC\uAC1C \uC138\uC158 \uD3EC\uD568)"}function Zr(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let n=Math.floor(t/60);if(n<60)return`${n}\uBD84 ${Math.round(t-n*60)}\uCD08`;let r=Math.floor(n/60),o=n%60;return`${r}\uC2DC\uAC04 ${o}\uBD84`}function op(e,t){if(typeof e!="object"||e===null)return[];let n=!1,r=!1;for(let o of Object.values(e)){if(typeof o!="object"||o===null)continue;let i=o;i.bead_id!==t||i.kind!=="review_session"||(n=!0,r=r||i.origin==="auto")}return n?[r?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"]:[]}function tp(e){return e==="auto"||e==="click"?e:null}function sp(e,t){if(typeof e!="object"||e===null)return{active:!1,failure:null,origin:null};let n=!1,r=null,o=-1,i=null,s=null,l=-1;for(let a of Object.values(e)){if(typeof a!="object"||a===null)continue;let u=a;if(u.bead_id!==t||u.kind!=="review_session")continue;if(u.status==="pending"||u.status==="running"){n=!0;let f=typeof u.started_at=="number"?u.started_at:0;f>=o&&(o=f,r=tp(u.origin));continue}if(u.status!=="failed")continue;let d=typeof u.finished_at=="number"?u.finished_at:0;d>=l&&(l=d,i=typeof u.cause=="string"&&u.cause.length>0?u.cause:null,s=tp(u.origin))}return n?{active:!0,failure:null,origin:r}:{active:!1,failure:i,origin:s}}function ip(e,t){if(typeof e!="object"||e===null)return null;let n=0,r=!1;for(let o of Object.values(e)){if(typeof o!="object"||o===null)continue;let i=o;if(i.bead_id!==t)continue;let s=i.started_at,l=i.finished_at;typeof s!="number"||typeof l!="number"||!Number.isFinite(s)||!Number.isFinite(l)||l<s||(n+=l-s,r=!0)}return r?n:null}function Wi(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function zh(e,t){let n=Array.isArray(e)?e:[],r=Array.isArray(t)?t:[];if(n.length===0&&r.length===0)return null;let o=null;for(let s of n)s.kind!=="deploy"||s.state!=="succeeded"||typeof s.target_sha!="string"||(!o||(typeof s.finished_at=="number"?s.finished_at:0)>(typeof o.finished_at=="number"?o.finished_at:0))&&(o=s);let i=n.filter(s=>s.state==="failed"&&!s.dismissed&&!s.superseded_by).length+r.length;return{deploy:o?{sha:Ui(o.target_sha),at:typeof o.finished_at=="number"?o.finished_at:null,elapsed_ms:typeof o.elapsed_ms=="number"?o.elapsed_ms:null}:null,unresolved:i,badge:i>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${i}`}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function ap(e,t){let n=zh(e,t);return n?c`<button
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
            title=${n.deploy.at?Xt(n.deploy.at):""}
            >${Wi(n.deploy.at)}${n.deploy.elapsed_ms!==null?` \xB7 ${Zr(n.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${n.badge.tone}"
      >${n.badge.label}</span
    >
  </button>`:""}function Do(e){let t=vn(e.created_at),n=vn(e.updated_at);return!t&&!n?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${Xt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&n?c`<span>·</span>`:""}${n?c`<span title=${`\uC218\uC815 ${Xt(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </div>`}function Kh(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="abandoned"?"\uD3D0\uAE30 \uD3EC\uAE30\uB428":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function vs(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function ks(e,t){return t.kind==="stale_work_backup_fresh"?`${e}: \uC2E4\uD328\uD55C \uBC31\uC5C5 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4. \uBC31\uC5C5\uC740 \uB9CC\uB4E4\uC5B4\uC9C0\uC9C0 \uC54A\uC558\uACE0 \uAE30\uC874 \uC791\uC5C5\uC740 \uADF8\uB300\uB85C \uB0A8\uC2B5\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uC2E4\uD328\uD55C \uD3D0\uAE30 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4. \uBC31\uC5C5\uACFC \uD3D0\uAE30\uB294 \uC218\uD589\uB418\uC9C0 \uC54A\uC558\uACE0 bead\uB294 \uD3D0\uAE30 \uC774\uC804 \uC0C1\uD0DC\uB85C \uB3CC\uC544\uAC11\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function Hi(e){return e.kind==="stale_work_backup_fresh"?`\uBC31\uC5C5 \uD3EC\uAE30\uB428 \xB7 \uAE30\uC874 \uC791\uC5C5\uC740 \uADF8\uB300\uB85C \uB0A8\uC2B5\uB2C8\uB2E4 (\uC6D0\uC778: ${e.last_error})`:`\uD3D0\uAE30 \uD3EC\uAE30\uB428 \xB7 \uD3D0\uAE30\uB294 \uC218\uD589\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 (\uC6D0\uC778: ${e.last_error})`}function zi(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function lp(e){return e?.startsWith("orphan_gitlink_content:")?`\uB9E4\uD551 \uC5C6\uB294 gitlink \uACBD\uB85C ${e.slice(23)}\uC5D0 \uB0B4\uC6A9\uC774 \uC788\uC2B5\uB2C8\uB2E4 \u2014 \uC800\uC7A5\uC18C\uC5D0\uC11C \uADF8 \uACBD\uB85C\uB97C \uC815\uB9AC\uD55C \uB4A4 \uC7AC\uC2DC\uB3C4\uD558\uAC70\uB098 \uD3EC\uAE30\uD558\uC138\uC694`:e==="dirty_submodule"?"\uC11C\uBE0C\uBAA8\uB4C8\uC5D0 \uBBF8\uCEE4\uBC0B \uBCC0\uACBD\uC774\uB098 \uBBF8\uCD08\uAE30\uD654 \uD56D\uBAA9\uC774 \uC788\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC \uD6C4 \uC7AC\uC2DC\uB3C4\uD558\uC138\uC694":e==="submodule_observation_failed"?"\uC11C\uBE0C\uBAA8\uB4C8 \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (git \uC624\uB958) \u2014 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C git \uBA85\uB839\uC744 \uC9C1\uC811 \uD655\uC778\uD558\uC138\uC694":null}function dr(e,t,n={}){let o=Object.values(e&&typeof e=="object"?e:{}).filter(_=>_&&_.bead_id===t&&Yd(_)).sort((_,k)=>(_.requested_at||0)-(k.requested_at||0)).at(-1),i=typeof n.attempt_id=="string"&&n.attempt_id.length>0?n.attempt_id:typeof o?.attempt_id=="string"?o.attempt_id:null,s=n.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":n.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":n.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,l=typeof o?.last_error=="string"?o.last_error:null,a=o?Kh(o.phase):null,u=o?.kind==="stale_work_backup_fresh",d=lp(l),f=n.merged||o?.mode==="merged_revert"?"merged":"unmerged";return{action:!n.external&&!n.done,enabled:!s&&(!o||!!l),label:u?l?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":l?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:s||(l?d?`\uD3D0\uAE30 \uC2E4\uD328: ${l} \u2014 ${d}`:u?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${l} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${l} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:o?`${a||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:f==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:i,operation:o||null,progress:a,error:l,confirmation:f,abandon:{action:!!o&&o.phase==="requested"&&!!l,label:u?"\uBC31\uC5C5 \uD3EC\uAE30":"\uD3D0\uAE30 \uD3EC\uAE30",title:u?"\uC2E4\uD328\uD55C \uBC31\uC5C5 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4 \u2014 \uC6D0\uBCF8\uC740 \uADF8\uB300\uB85C \uB0A8\uACE0 \uC0C8\uB85C \uC2DC\uC791\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4":"\uC2E4\uD328\uD55C \uD3D0\uAE30 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4 \u2014 \uBC31\uC5C5\xB7\uD3D0\uAE30\uB294 \uC218\uD589\uB418\uC9C0 \uC54A\uC558\uACE0 bead\uB294 \uD3D0\uAE30 \uC774\uC804 \uC0C1\uD0DC\uB85C \uB3CC\uC544\uAC11\uB2C8\uB2E4"}}}function cp(e){if(!e||e.quickfix_lane!==!0)return!1;let t=e.quickfix_landing;return!t||typeof t!="object"?!1:["repo_operations","branch_cleanup","parent_close"].includes(t.cursor)}function Bi(e){let t=e.discard;if(!t||!t.operation)return"";let n=t.operation,r=lp(t.error),o=n.kind==="stale_work_backup_fresh"&&!t.error?null:n.backup?.path,i=n.original_pr,s=n.revert_pr;return c`<div
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
  </div>`}var Gh={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function up(e,t=!1){if(!e||typeof e!="object")return null;let n=e;if(n.reason!=="worktree_stale_work"||!n.stale_work||typeof n.stale_work!="object")return null;let r=n.stale_work,o=r.action_id;if(typeof o!="string"||o.length===0)return null;let i=r.residue==="branch"?"branch":"worktree",s=r.state==="unique"?"unique":"unknown",l=r.summary&&typeof r.summary=="object"?r.summary:{};function a(d){return Number.isInteger(l[d])?Number(l[d]):0}let u=typeof r.cause=="string"?r.cause:"observe_failed";return{residue:i,state:s,title:i==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":s==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:Gh[u]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:i==="branch"?`\uACE0\uC720 commit ${a("branch_ahead")}`:[`staged ${a("staged_count")}`,`unstaged ${a("unstaged_count")}`,`untracked ${a("untracked_count")}`,`branch ahead ${a("branch_ahead")}`,`HEAD ahead ${a("head_ahead")}`].join(" \xB7 "),action_id:o,can_resume:r.can_resume===!0,can_continue:r.can_continue===!0,can_backup_fresh:r.can_backup_fresh===!0,can_recheck:r.can_recheck===!0,locked:t}}function Jr(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let n=t.pin===!0?" exec-chip--pin":"",r=t.pin===!0?`
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
      </button>`:c`<span class=${n} title=${e.title||""}>${e.label}</span>`}function Vh(e){return{id:e.id,label:`\u29C9 ${e.id}`,title:[`\uACB9\uCE68 \xB7 ${e.location_label}`,...e.prefixes].join(`
`),openable:!0,...e.root_dir?{root_dir:e.root_dir}:{}}}function Tl(e){return Array.isArray(e)?e.slice().sort((t,n)=>t.id<n.id?-1:t.id>n.id?1:0):[]}function Yh(e,t=!1){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__spec-after-blocker"
    data-chip-key="spec_after_blocker"
    aria-expanded=${t?"true":"false"}
    title="선행의 결과가 설계 전제라 스펙도 선행 뒤에 씁니다"
  >
    스펙 대기
  </button>`:""}function dp(e){if(!Object.hasOwn(e,"route_ok")||e.queue_placeable===!0)return null;let t="";return e.route_ok===!1&&(t="\uB77C\uC6B0\uD305 \uD544\uC694"),t.length===0&&(e.worker_ineligible===!0||e.awaiting_user===!0)||(t.length===0&&e.missing_description===!0?t="\uBCF8\uBB38 \uD544\uC694":t.length===0&&e.placement_spec==="conflict"?t="\uC2A4\uD399 \uCDA9\uB3CC":t.length===0&&Object.hasOwn(e,"placement_spec")&&e.placement_spec!=="published"&&(t="\uC2A4\uD399 \uBBF8\uBC1C\uD589"),t.length===0)?null:{label:t,title:Xr({placeable:!1,route_ok:e.route_ok,worker_ineligible:e.worker_ineligible===!0,awaiting_user:e.awaiting_user===!0,missing_description:e.missing_description===!0,spec:e.placement_spec})}}function Qh(e,t){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__readiness"
    data-chip-key="readiness"
    aria-expanded=${t?"true":"false"}
    title=${e.title}
  >
    ${e.label}
  </button>`:""}function Ki(e,t=""){if(!e)return t===""?"":c`<div class="worker-deps worker-deps--primary">
          ${t}
        </div>`;let n=Tl(e.predecessors),r=Array.isArray(e.released)?e.released:[],o=Tl(e.dependents),i=Tl(e.overlaps),s=e.scope_missing===!0,l=e.armed_lane||null,a=!!l||n.length>0||o.length>0||t!=="",u=r.length>0||i.length>0||s;return!a&&!u?"":c`${a?c`<div class="worker-deps worker-deps--primary">
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
        ${r.map(d=>ys(d,"released"))}${i.map(d=>ys(Vh(d),"overlap"))}${s?c`<span
              class="worker-dep worker-dep--muted"
              title="겹침 판정 불가 — 아티팩트가 있으면 스펙/플랜 front-matter, 없으면 description \`## scope\`에 선언 필요"
              >scope 없음</span
            >`:""}
      </div>`:""}`}function pp(e,t=""){let n=(Array.isArray(e)?e:[]).filter(r=>typeof r=="string"&&r!=="").slice().sort();return n.length===0?"":c`<div class="worker-deps worker-deps--secondary">
    ${n.map(r=>ys({id:r,label:`\uC774\uC6D4 \u2192 ${r}`,title:`\uC774\uC6D4\uB41C \uD6C4\uC18D ${r} \uC5F4\uAE30`,openable:!0,...t?{root_dir:t}:{}},"dependents"))}
  </div>`}function Gi(e){return e?c`<button
    type="button"
    class="worker-dep worker-dep--lane mon-lane__chip"
    data-lane-id=${e.lane_id}
    title="이 연결 레인으로 이동"
  >
    ${e.label}
  </button>`:""}function eo(e){let t=Ml(e);if(t===null)return"";let n=t==="unset";return c`<span
    class="ctl-chip ctl-chip--route${n?" is-derived":""}"
    title=${n?"route \uBBF8\uD540 (metadata unset)":"route"}
    >${t}</span
  >`}function Xh(e,t=!1){let n=e?e.quick_fix_review:null;if(!n)return"";let r=n.state;if(r!=="reviewed"&&r!=="stale")return"";let o=Array.isArray(n.missing)?n.missing:[],i=[r==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",...o].join(`
`);return c`<button
    type="button"
    class="ctl-chip judgement-chip worker-card__qfr worker-card__qfr--${r}"
    data-chip-key="qfr"
    aria-expanded=${t?"true":"false"}
    title=${i}
  >
    ${r==="reviewed"?"\uB9AC\uBDF0 \u2713":"\uB9AC\uBDF0 stale"}
  </button>`}function fp(e){return e?c`<button
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
  </button>`:""}var Zh={absent:"\uC2E4\uD589 \uC601\uC218\uC99D\uC774 \uAE30\uB85D\uB418\uC9C0 \uC54A\uC558\uB2E4 \u2014 \uACFC\uAC70 Bead\xB7\uC678\uBD80 \uACBD\uB85C PR\uC740 \uC6D0\uB798 \uC5C6\uB2E4",unparsable:"\uC601\uC218\uC99D \uAC12\uC744 \uC77D\uC744 \uC218 \uC5C6\uB2E4 \u2014 40hex SHA\uB098 `delegated:`/`main:` \uD615\uC2DD\uC774 \uC544\uB2C8\uB2E4",effort_unknown:"effort \uD1A0\uD070\uC774 harness \uC5B4\uD718 \uBC16\uC774\uB2E4 \u2014 \uBAA8\uB378\xB7SHA\xB7unit\uC740 \uC720\uD6A8\uD558\uB2E4",main_reason_retired:"`main:` \uC0AC\uC720\uAC00 \uACE0\uC815 4\uD1A0\uD070(bead\xB7quick_fix_default\xB7phase_line\xB7takeover) \uBC16\uC774\uB2E4",main_receipt_unbacked:"`main:` \uC0AC\uC720\uB97C \uB4B7\uBC1B\uCE68\uD558\uB294 \uBA54\uD0C0\uB370\uC774\uD130(impl_dispatch\xB7route\xB7planned_execution\xB7quick_fix \uAE30\uBCF8 dispatch)\uAC00 \uC5C6\uB2E4",takeover_lineage_missing:"`main:takeover`\uC778\uB370 resolved \uBAA8\uB378\uACFC \uC77C\uCE58\uD558\uB294 \uC644\uB8CC\uB41C \uC704\uC784 \uC138\uC158\uC774 \uC5C6\uB2E4",takeover_lineage_unobservable:"`main:takeover`\uC778\uB370 \uC704\uC784 \uACC4\uBCF4\uB97C \uBAA8\uB2C8\uD130\uAC00 \uBCFC \uC218 \uC5C6\uB2E4(Codex \uBC16 \uB7F0\uD0C0\uC784)"};function Jh(e,t=!1){let n=_p(e);if(n.length===0)return"";let r=n.length>1?`\uC601\uC218\uC99D \xB7 ${n[0]} +${n.length-1}`:`\uC601\uC218\uC99D \xB7 ${n[0]}`;return c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__receipt"
    data-chip-key="receipt"
    data-bead-id=${e.id}
    aria-expanded=${t?"true":"false"}
    title=${n.join(", ")}
  >
    ${r}
  </button>`}function _p(e){let t=e.receipt_badge?e.receipt_badge.codes:null;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function mp(e,t){return!e||typeof t!="number"?"":c`<a
    class="worker-mini__pr"
    href=${e}
    target="_blank"
    rel="noreferrer noopener"
    title="PR 열기"
    >#${t} ↗</a
  >`}function Yi(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=Math.max(0,Math.min(4,Math.trunc(e)));return c`<span class="worker-pri" title=${`\uC6B0\uC120\uC21C\uC704 P${t}`}
    >P${t}</span
  >`}function eb(e){let t=Array.isArray(e.badges)?e.badges:[],n=mn(e.usage),r=lr(e.usage),o=vn(e.done_at);return c`<div
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
      ${mp(e.pr_url,e.pr_number)}${o?c`<span
            class="worker-mini__done-at"
            title=${`\uC644\uB8CC ${Xt(e.done_at)}`}
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
    ${pp(e.carried_to,e.root_dir)}
    <div class="worker-mini__row3">
      ${eo(e.workflow)}${e.exec_chips?Jr(e.exec_chips):""}${n.length>0?n.map(i=>c`<span class="worker-usage" title=${i.tooltip}
                >${i.label}</span
              >`):r?c`<span class="worker-usage" title=${ss(e.usage)}
              >${r}</span
            >`:""}
      ${typeof e.work_ms=="number"?c`<span
            class="worker-mini__work"
            title=${rp(e.work_kind)}
            >작업 ${Zr(e.work_ms)}</span
          >`:""}
    </div>
  </div>`}function Qi(e,t){return typeof e=="number"?e+hp-t:0}function Cl(e,t=Date.now()){let n=Qi(e,t);return n<=0?"":c`<span
    class="worker-dep worker-dep--grace"
    title="대기에 막 들어온 항목입니다 — 남은 시간 동안 자동 실행이 미뤄집니다"
    >⏳ ${Math.ceil(n/1e3)}초</span
  >`}function Ol(e,t=Date.now()){return Qi(e.added_at,t)<=0?"":c`<button
    type="button"
    class="op-btn worker-mini__start-now"
    data-action="queue-start-now"
    data-bead-id=${e.id}
    title="대기 진입 유예를 이 항목에 대해서만 걷고 지금 실행합니다"
  >
    지금 시작
  </button>`}function Mo(e,t={}){if(!(e.draggable!==!0||e.done===!0))return c`<span class="worker-mini__rowops">
    ${Ol(e)}${t.nudgeable===!0?c`<button
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
  </span>`}function Un(e,t={}){if(e.lane==="done"&&e.done_layout==="three_line")return eb(e);let n=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],o=mn(e.usage),i=lr(e.usage),s=e.merge_step||null,l=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work||e.discard?.abandon.action===!0,a=e.lane==="done"&&!l,u=a?vn(e.done_at):"",d=n?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",f=typeof e.seq=="number"?c`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",_=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",k=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,m=eo(e.workflow),R=e.lane==="done"?"":fp(e.from_id),T=Yi(e.priority),D=c`<span class="worker-mini__title">${e.title}</span>`,ne=mp(e.pr_url,e.pr_number),H=r.map(I=>I===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${I}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${I===e.completion_badge&&e.completion_title||""}
          >${I}</span
        >`),P=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",O=o.length>0?o.map(I=>c`<span class="worker-usage" title=${I.tooltip}
              >${I.label}</span
            >`):i?c`<span class="worker-usage" title=${ss(e.usage)}
            >${i}</span
          >`:"",q=s?c`<span
        class="merge-step${s.failed?" merge-step--failed":""}"
        style=${`--progress: ${s.percent}%`}
        >${s.label}${s.index>0?c`<span class="merge-step__n"
              >${s.index}/${s.total}</span
            >`:""}</span
      >`:"",F=e.merge_action?c`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",z=e.cancel_action?c`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",B=e.discard,N=B?.action||e.discard_action?c`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${B?.attempt_id||""}
          data-operation-id=${B?.operation?.operation_id||""}
          data-discard-mode=${B?.confirmation||"unmerged"}
          ?disabled=${B?!B.enabled:e.discard_enabled===!1}
          title=${B?B.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${B?.label||"\uD3D0\uAE30"}
        </button>`:"",V=B?.abandon.action?c`<button
        type="button"
        class="worker-mini__discard-abandon"
        data-bead-id=${e.id}
        data-operation-id=${B.operation.operation_id}
        data-operation-kind=${B.operation.kind||""}
        data-last-error=${B.error||""}
        title=${B.abandon.title}
      >
        ${B.abandon.label}
      </button>`:"",W=e.resolve_action?c`<button
        type="button"
        class="worker-mini__resolve"
        data-bead-id=${e.id}
        ?disabled=${e.resolve_enabled===!1}
        title=${e.resolve_title||"\uC2E4\uD328\uD55C \uC791\uC5C5\uC744 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 (\uAE30\uB85D\uB41C \uC138\uC158\uC774 \uC788\uC73C\uBA74 fork)"}
      >
        세션에서 해결
      </button>`:"",oe=B?.abandon.action?c`${N}${V}${W}`:c`${W}${N}`,fe=e.stale_work||null,Pe=fe?c`${fe.can_resume||fe.can_continue?c`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${fe.action_id}
            ?disabled=${fe.locked}
          >
            기존 작업 이어가기
          </button>`:""}${fe.can_backup_fresh?c`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${fe.action_id}
            ?disabled=${fe.locked}
          >
            백업 후 새로 시작
          </button>`:""}${fe.can_recheck?c`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${fe.action_id}
            ?disabled=${fe.locked}
          >
            다시 확인
          </button>`:""}`:"",G=fe?c`<div class="worker-mini__stale">
        <strong>${fe.title}</strong>
        <span>${fe.summary}</span>
        <span>${fe.cause}</span>
        ${fe.can_backup_fresh?c`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",se=e.revise_action?c`<button
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
        </button>`:"",_e=!!(e.lane!=="pr_wait"&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)),Oe=_e?Jr(e.exec_chips,{pin:e.exec_chips_pinned===!0}):"",Q=Vi(e.rec,Er(e,"rec")),ce=Jh(e,Er(e,"receipt")),J=Gi(e.cross_lane_chip),Se=Qr(e.log_path),be=_||J||m||R||_e||Q||ce||O||Se?c`<div class="worker-chips">
          ${_}${J}${m}${R}${Oe}${Q}${ce}${O}${Se}${Fi(e)}
        </div>`:"",me=Ki(e.dependency_chips,Cl(e.added_at)),L=Bi(e),ee=t.actions?t.actions:"",Re=!!(s||e.merge_action||e.cancel_action||e.resolve_action||e.discard_action||B?.operation||e.revise_action||fe);return c`<div
    class="worker-mini${l?" worker-mini--card":""}${n?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${s?" worker-mini--merging":""}${s?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}${e.search_match===!1?" is-dimmed":""}"
    style=${s?`--progress: ${s.percent}%`:""}
    draggable=${n?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${a?c`<div class="worker-mini__row1">
            ${_}${k}${T}${R}${ne}${D}${ee}
          </div>
          ${pp(e.carried_to,e.root_dir)}
          <div class="worker-mini__row2">
            ${m}${Oe}${O}${u?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${Xt(e.done_at)}`}
                  >완료 ${u}</span
                >`:""}${typeof e.work_ms=="number"?c`<span
                  class="worker-mini__work"
                  title=${rp(e.work_kind)}
                  >작업 ${Zr(e.work_ms)}</span
                >`:""}${H}${q}
            <span class="worker-mini__actions"
              >${F}${z}${oe}</span
            >
            ${Do(e)}
          </div>`:l?c`<div class="worker-mini__head">
              ${d}${f}${k}${T}${ne}${H}${P}${ee}
            </div>
            <div class="worker-mini__body">${D}${G}</div>
            ${me}${be}${Re?c`<div class="worker-mini__foot">
                  ${q}
                  <span class="worker-mini__actions"
                    >${F}${z}${oe}${se}${Pe}</span
                  >
                  ${Bi(e)}
                </div>`:""}
            ${Do(e)}`:c`<div class="worker-mini__line">
              ${d}${f}${k}${T}${D}${ne}${H}${P}${q}${F}${z}${oe}${ee}
            </div>
            ${me}${be}${L} ${Do(e)}`}
  </div>`}function Il(e,t){let n,r=[];for(let o of e){let i=o.group||"";i.length>0&&i!==n&&r.push(c`<div class="worker-card__place-group">${i}</div>`),n=i,r.push(c`<button
        type="button"
        class="worker-card__place-lane${i.length>0?" worker-card__place-lane--nested":""}"
        data-bead-id=${t}
        data-lane=${o.id}
        ?disabled=${o.disabled===!0}
        title=${o.title||`${o.label} \uB300\uAE30 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00`}
      >
        <span>${o.label}</span>
        ${typeof o.count=="number"?c`<span class="worker-card__place-count">${o.count}</span>`:""}
      </button>`)}return c`${r}`}var gp={external_roundtrip:"\uD558\uB124\uC2A4 \uBC16 \uC0C1\uB300\uC640 \uC608\uCE21 \uBD88\uAC00 \uC655\uBCF5 \uBC18\uBCF5 \u2014 \uB2E4\uB978 rig \uC138\uC158\xB7\uC0AC\uB78C\xB7\uC678\uBD80 \uC2DC\uC2A4\uD15C",user_feedback_loop:"\uC9C4\uD589 \uC911 \uC0AC\uC6A9\uC790 \uD53C\uB4DC\uBC31 \uC5C6\uC774\uB294 \uD488\uC9C8\uC774 \uB0AE\uC74C \u2014 \uBB38\uC548\xB7\uC124\uACC4 \uC138\uBD80\xB7\uBC29\uD5A5 \uC120\uD0DD"};function Ll(e,t){if(t==="rec"){let n=e.rec;if(!n)return null;let r=Al[n.state]||"";return{title:"\uBCF5\uC7A1\uD55C \uC791\uC5C5\uC73C\uB85C \uD310\uC815\uB428",lines:[...xl(n),...r.length>0?[`\uC0C1\uD0DC: ${r}`]:[],"\uC801\uC6A9\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uC2E4\uD589 \uC124\uC815 \uD3B8\uC9D1\uAE30\uC5D0\uC11C"]}}if(t==="session_preferred"){if(e.session_preferred!==!0)return null;let n=gp[e.session_preferred_reason||""]||"";return{title:"\uC6CC\uCEE4\uB85C \uB3CC\uB9B4 \uC218 \uC788\uC9C0\uB9CC \uC138\uC158\uC774 \uB0AB\uB2E4",lines:n.length>0?[n]:[]}}if(t==="ineligible")return e.worker_ineligible!==!0?null:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uB300\uC0C1\uC774 \uC544\uB2C8\uB2E4",lines:["worker-ineligible \uB77C\uBCA8\uC774 \uBD99\uC5B4 \uC788\uB2E4 \u2014 \uB77C\uBCA8\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uB77C\uBCA8 \uC808\uC5D0\uC11C \uB5C0\uB2E4"]};if(t==="spec_after_blocker")return e.spec_after_blocker!==!0?null:{title:"\uC120\uD589 \uACB0\uACFC\uAC00 \uC124\uACC4 \uC804\uC81C \u2014 \uC2A4\uD399\uB3C4 \uC120\uD589 \uB4A4\uC5D0",lines:[`\uC120\uD589: ${(Array.isArray(e.blocked_by)?e.blocked_by:[]).join(" \xB7 ")}`,"\uC120\uD589\uC774 \uB2EB\uD788\uBA74 \uC774 \uD45C\uC2DC\uB294 \uC800\uC808\uB85C \uC0AC\uB77C\uC9C4\uB2E4 \u2014 \uB77C\uBCA8\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uB77C\uBCA8 \uC808\uC5D0\uC11C \uB5C0\uB2E4"]};if(t==="readiness"){let n=dp(e);return n?{title:n.title,lines:[]}:null}if(t==="receipt"){let n=_p(e);return n.length===0?null:{title:"\uC2E4\uD589 \uC601\uC218\uC99D \uD68C\uACC4 \uC794\uC5EC \u2014 \uBA38\uC9C0\uB294 \uC9C4\uD589",lines:[...n.map(r=>Zh[r]||r),"\uC790\uB3D9 \uBA38\uC9C0 \uD310\uC815\uC5D0\uB294 \uC601\uD5A5\uC774 \uC5C6\uB2E4 \u2014 \uC815\uC815\uC740 bd update --set-metadata exec_receipt=\u2026 \uB85C"]}}if(t==="qfr"){let n=e.workflow?e.workflow.quick_fix_review:null;if(!n||n.state!=="reviewed"&&n.state!=="stale")return null;let r=Array.isArray(n.missing)?n.missing:[];return{title:n.state==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",lines:r.length>0?r:["\uBE60\uC9C4 \uD56D\uBAA9 \uC5C6\uC74C"]}}return null}var tb=["rec","receipt","session_preferred","ineligible","qfr","spec_after_blocker","readiness"];function Xi(e,t){for(let n of tb){if(!t(n))continue;let r=Ll(e,n);return r?{chip_key:n,content:r}:null}return null}function Fi(e){return e.chip_popover?Lo(e.chip_popover.content):""}function Er(e,t){return!!e.chip_popover&&e.chip_popover.chip_key===t}var Pl="\uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694";function Dl(e,t=null,n={}){let r=e.worker_ineligible===!0,o=e.draggable&&!e.done&&!r,i=e.queue_placeable===!0&&!e.done&&!r,s=i&&t&&t.bead_id===e.id,l=e.session_preferred===!0,a=gp[e.session_preferred_reason||""]||"",u=e.workflow,d=e.missing_description===!0,f=e.awaiting_user===!0,_=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),k=Er(e,"spec_after_blocker"),m=Yh(e.spec_after_blocker===!0,k),R=dp(e),T=Er(e,"readiness"),D=Qh(R,T),ne=c`${m}${k?Fi(e):""}${D}${T?Fi(e):""}`,H=Ki(e.dependency_chips,m===""&&D===""?"":ne),P=e.workspace_name?c`<span class="worker-card__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",O=Gi(e.cross_lane_chip),q=eo(u),F=fp(e.from_id),z=!!(e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)),B=!r&&(e.blocked===!0||e.queue_placeable===!1);return c`<div
    class="worker-card${o?"":" worker-card--static"}${r?" worker-card--ineligible":""}${B?" worker-card--blocked":""}${e.search_match===!1?" is-dimmed":""}"
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
            aria-expanded=${Er(e,"ineligible")?"true":"false"}
            title="worker-ineligible label이 붙어 워커 실행 대상이 아닙니다"
          >
            worker-ineligible
          </button>`:l?c`<button
              type="button"
              class="ctl-chip ctl-chip--label judgement-chip worker-card__session-preferred"
              data-chip-key="session_preferred"
              aria-expanded=${Er(e,"session_preferred")?"true":"false"}
              title=${a}
            >
              세션 권장
            </button>`:""}${Vi(e.rec,Er(e,"rec"))}${Xh(u,Er(e,"qfr"))}
      ${k||T?"":Fi(e)}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${u?gi(u,e.status,{onOpenDoc:n.onOpenDoc}):""}${H}
    ${P||O||q||F||z?c`<div class="worker-chips">
          ${P}${O}${q}${F}${Jr(e.exec_chips,{pin:n.exec_chips_mode==="pinned_only"})}
        </div>`:""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${s?c`<div class="worker-card__place-menu">
            ${Il(t.lanes,e.id)}
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
              title=${Xr({placeable:i,route_ok:e.route_ok,worker_ineligible:r,awaiting_user:f,missing_description:d,spec:e.placement_spec})}
            >
              ↴ 대기로
            </button>`}
    </div>
    ${Do(e)}
  </div>`}function er(e){let t=!!e.collapsible&&!!e.collapsed,n=typeof e.count=="number"?e.count:e.items.length,r=c`<span
      class="worker-pane__dot worker-pane__dot--${e.lane}"
      aria-hidden="true"
    ></span>
    <span class="worker-pane__title">${e.title}</span>
    ${t&&e.preview?c`<span class="worker-pane__preview">${e.preview}</span>`:""}
    <span class="worker-pane__count">${n}</span>
    ${typeof e.match_count=="number"?c`<span class="worker-pane__match">일치 ${e.match_count}</span>`:""}`;return c`<section
    class="worker-pane worker-pane--lane-${e.lane}${e.src?" worker-pane--src":""}${e.live?" worker-pane--live":""}${e.collapsible?" worker-pane--collapsible":""}${t?" worker-pane--collapsed":""}"
    id=${bn(e.id||void 0)}
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
                  </div>`:e.items.map(o=>e.lane==="candidate"?Dl(o,e.place_menu,{onOpenDoc:e.onOpenDoc}):Un(o))}
          </div>`}
  </section>`}function np(e,t,n){return c`<button
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
        ${np("parallel","\uBCD1\uB82C \uC601\uC5ED",t.collapsed)}
        <span class="worker-wait__area-count">${t.count}</span>
      </header>
      ${t.collapsed?"":c`<div
            class="worker-wait__area-body"
            data-drop=${bn(r.drop)}
            data-root-dir=${bn(r.root_dir)}
            data-lane-id=${bn(r.lane_id)}
            data-lane-length=${bn(r.lane_length)}
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
        ${np("serial","\uC9C1\uB82C \uC601\uC5ED",n.collapsed)}
        ${n.header_control?n.header_control:""}
      </header>
      ${n.collapsed?"":c`<div class="worker-wait__area-body">
            ${n.notice?n.notice:""}
            ${n.extra_panes?n.extra_panes:""}
            ${n.lanes.map(o=>nb(o))}
          </div>`}
    </section>
  </div>`}function nb(e){let t=e.drop||{},n=e.badge?c`<span
        class="worker-lane__badge${e.held?" worker-lane__badge--held":""}"
        >${e.badge}</span
      >`:"";return c`<div
    class="worker-wait__lane${e.empty?" worker-wait__lane--empty":""}"
  >
    ${er({id:typeof e.pane_id=="string"?e.pane_id:`worker-pane-lane-${e.id}`,lane:e.id,title:e.title,items:[],count:e.count,match_count:e.match_count,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:c`${n}${e.header_control?e.header_control:""}`,body:c`<div
        class="worker-wait__rows"
        data-drop=${bn(t.drop)}
        data-root-dir=${bn(t.root_dir)}
        data-lane-id=${bn(t.lane_id)}
        data-lane-length=${bn(t.lane_length)}
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
  </section>`:""}var bp=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],ws=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"post_merge_jobs",label:"\uBA38\uC9C0 \uD6C4 \uC7A1"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function ea(e,t){let n=bp.find(o=>o.step===e);if(!n)return null;let r=bp.length;return{step:n.step,label:t,index:n.index,total:r,percent:Math.round(n.index/r*100)}}function yp(e){let t=ws.findIndex(n=>n.step===e);return ws.map((n,r)=>({step:n.step,label:n.label,state:t<0?"todo":r<t?"done":r===t?"stall":"todo"}))}function to(e){let t=ws.find(n=>n.step===e);return t?t.label:typeof e=="string"?e:""}function rb(e){let t=ws.findIndex(n=>n.step===e);return t<0?null:{index:t+1,total:ws.length}}function ta(e){let t=rb(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var ql=new Set(["queued","running","retry_pending"]),vp=new Set(["failed","succeeded"]),ob={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uC2DC\uB3C4 \uB300\uAE30"},$s={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},sb={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:$s.base_containment,child_sweep:$s.child_sweep,branch_cleanup:$s.branch_cleanup,parent_close:$s.parent_close};function ib(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function ab(e,t,n){return!["verify","deploy"].includes(e.kind)||![...ql,...vp].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(r=>r&&typeof r=="object"&&r.bead_id===t&&r.merged_sha===n)}function lb(e,t){let n=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(n!==0)return n;let r=u=>u.state==="succeeded"?1:2,o=r(t)-r(e);if(o!==0)return o;let i=typeof e.requested_at=="number"?e.requested_at:0,s=typeof t.requested_at=="number"?t.requested_at:0;if(i!==s)return s-i;let l=typeof e.operation_id=="string"?e.operation_id:"",a=typeof t.operation_id=="string"?t.operation_id:"";return l.localeCompare(a)}function Nl(e,t=!1){let n=e.kind,r=n==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",o=t?"failed":e.state,i=ob[o];if(!i)return null;let s=ea(n,`${r} ${i}`);return s?{...s,active:ql.has(o),failed:o==="failed"}:null}function cb(e){return!e||typeof e!="object"?null:sb[e.step]||null}function xs(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,n=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},r=cb(n),o=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,i=["post_merge_jobs","child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),s=!i&&(e.cleanup_cursor==="repo_operations"||n.step==="repo_operations"),l=ib(e.merge_sha)?e.merge_sha:null,a=!i&&l&&Array.isArray(e.repo_operations)?e.repo_operations.filter(m=>m&&typeof m=="object"&&ab(m,t,l)).sort(lb):[],u=s?a:[],d=u.find(m=>ql.has(m.state));if(d)return Nl(d);if(o)return o.step==="repo_operations"&&a[0]?Nl(a[0],!0):null;let f=u.find(m=>vp.has(m.state)?m.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(f)return Nl(f);if(r){let m=ea(r.step,r.label);return m?{...m,active:!0,failed:!1}:null}let _=typeof e.cleanup_cursor=="string"?$s[e.cleanup_cursor]:null;if(!_)return null;let k=ea(_.step,_.label);return k?{...k,active:!0,failed:!1}:null}function na(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var ub="\uBBF8\uC801\uC7AC";function jl(e,t,n,r){if(!n)return`${e} ${t}`;let o=typeof r=="string"&&r.length>0?r:"\uC678\uBD80";return`${e} ${o}/${t}`}function Fl(e,t,n){return`${e} \u2014 ${t}${n?" \xB7 \uB2E4\uB978 \uC800\uC7A5\uC18C\uC758 \uC774\uC288\uB77C \uC5EC\uAE30\uC11C \uB2EB\uC744 \uC218 \uC5C6\uB2E4":""}`}function db(e){if(typeof e!="string"||e.length===0)return;let t=e.replace(/\/+$/,""),n=t.lastIndexOf("/"),r=t.slice(n+1);return r.length>0?r:void 0}function Bl(e,t){let n=Qn(e,t.id),r=jl("\u26D3",t.id,n,t.workspace_name);return{id:t.id,label:r,title:Fl(r,`\uC120\uD589 \u2014 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4 (${t.location_label})`,n),...n?{foreign:!0}:{}}}var pb=10080*60*1e3;function kp(e,t,n){let r=t.closed_at;if(typeof r!="number"||!Number.isFinite(r)||r<n-pb)return null;let o=Qn(e,t.id),i=typeof t.root_dir=="string"?t.root_dir:"",s=jl("\u{1F513}",t.id,o,t.workspace_name),l={id:t.id,label:s,title:Fl(s,`\uD574\uC81C \u2014 ${Xt(r)}\uC5D0 close\uB418\uC5B4 \uC774 \uC774\uC288\uAC00 \uD480\uB838\uB2E4`,o),...o?{foreign:!0}:{}};return o?i.length>0&&(l.openable=!0,l.root_dir=i):l.openable=!0,l}function wp(e,t,n,r){let o=Qn(e,t),i=jl("\u{1F513}",t,o,n),s={id:t,label:i,title:Fl(i,"\uD574\uC81C \u2014 \uB354 \uC774\uC0C1 \uC774 \uC774\uC288\uB97C \uB9C9\uC9C0 \uC54A\uB294\uB2E4 \xB7 \uBCF5\uADC0 \uB300\uAE30",o),...o?{foreign:!0}:{}};return o?typeof r=="string"&&r.length>0&&(s.openable=!0,s.root_dir=r):s.openable=!0,s}function $p(e,t){let n=Array.isArray(t.ids)?t.ids.filter(i=>typeof i=="string"&&i.length>0):[],r=t.root_dirs&&typeof t.root_dirs=="object"?t.root_dirs:{},o=[];for(let i of[...new Set(n)].sort()){let s=Qn(e,i),l=typeof r[i]=="string"?r[i]:"",a={id:i,label:`\u2192 ${i}`,title:"\uD6C4\uC18D \u2014 \uC774 \uC774\uC288\uAC00 close\uB418\uBA74 \uD480\uB9B0\uB2E4",...s?{foreign:!0}:{}};l.length>0?(a.openable=!0,a.root_dir=l):s||(a.openable=!0),o.push(a)}return o}function xp(e,t,n={}){let r=new Map,o=new Map;for(let i of t)o.has(i.id)||o.set(i.id,i.location_label);for(let[i,s]of e){if(typeof i!="string"||i.length===0)continue;let l=[];for(let a of Array.isArray(s)?s:[]){if(typeof a!="string"||a.length===0)continue;let u=n[a],d=db(u),f=Bl(i,{id:a,location_label:o.get(a)||ub,...d?{workspace_name:d}:{}});f.foreign!==!0?f.openable=!0:typeof u=="string"&&u.length>0&&(f.openable=!0,f.root_dir=u),l.push(f)}l.length>0&&r.set(i,l)}return r}var oa=1,hp=2e4,As=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],Ss=[{value:"all",label:"\uC804\uCCB4"},{value:"ready",label:"\uCC29\uC218 \uAC00\uB2A5"},{value:"not_ready",label:"\uC900\uBE44 \uD544\uC694"}],ro=[{value:"quick_fix",label:"quick_fix"},{value:"spec_backed",label:"spec_backed"},{value:"full_plan",label:"full_plan"},{value:"unset",label:"unset"}];function no(e){if(!Array.isArray(e))return[];let t=new Set(ro.map(r=>r.value)),n=[];for(let r of e)typeof r=="string"&&t.has(r)&&!n.includes(r)&&n.push(r);return n}function sa(e,t){let n=no(e);return n.includes(t)?n.filter(r=>r!==t):no([...n,t])}var No={show_blocked:!0,readiness:"all",routes:[]},Ap={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328",refuted:"\uBC18\uC99D",no_delta:"\uBB34-delta"};function fb(e,t){let n=null;for(let r of Object.values(e||{}))!r||r.bead_id!==t||!ur(r)||(n=typeof r.status=="string"?r.status:null);return n}function _b(e,t){let n=null,r=-1/0;for(let o of Object.values(e)){if(!o||o.bead_id!==t||o.status==="running"||!ur(o))continue;let i=typeof o.finished_at=="number"?o.finished_at:typeof o.started_at=="number"?o.started_at:0;i>=r&&(r=i,n=o)}return n}function ep(e){let t=Ye(e),n=new Map;for(let r of Array.isArray(t.done)?t.done:[])r&&typeof r.bead_id=="string"&&typeof r.added_at=="number"&&n.set(r.bead_id,r.added_at);return new Set(Op(Ye(t.attempts),n).keys())}function Op(e,t,n={}){let{winners:r,resumed_from_ids:o}=gd(e,t),i=new Map;for(let[s,l]of r){let a=l.attempt,u=l.run_state;if(Lp(a))continue;let d=l.started_at,f=typeof a.session_id=="string"&&a.session_id.length>0,k=Di(a.quickfix_landing)==="session",m=u!=="running"&&(f||!k)&&!o.has(a.attempt_id),R=!f&&k?"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":o.has(a.attempt_id)?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null,T=Ye(n.observations?.[s]),D=Ye(T.pr),ne=typeof a.merge_sha=="string"&&a.merge_sha.length>0||D.state==="MERGED",H=dr(n.discard_operations,s,{attempt_id:a.attempt_id,merged:ne}),P=u==="failed"?Ep(a,{resume_eligible:m,resume_reason:R,confirmation:H.confirmation,history:n.bead_timelines?.[s]}):null;i.set(s,{...Sp(a,e,u,n.runner_catalog),started_at:d,...P?{failure:P}:{},can_pause:u==="running"&&f,can_resume:m})}for(let[s,l]of wb(e,t)){if(i.has(s)||l.run_state==="waiting"&&Dp(n.admission,s))continue;let a=l.attempt,u=dr(n.discard_operations,s,{attempt_id:a.attempt_id}),d=Pp(a),f=l.run_state==="provider_hold"?vb(a,{provider_hold:n.provider_hold,auto_resume_pending:n.auto_resume_pending,account_catalog:n.account_catalog,attempts:e,history:n.bead_timelines?.[s]}):null;i.set(s,{...Sp(a,e,l.run_state,n.runner_catalog),started_at:typeof a.started_at=="number"?a.started_at:null,...l.run_state==="parked"?{failure:Ep(a,{resume_eligible:!1,resume_reason:"\uC138\uC158 \uB300\uAE30 \u2014 [\uC138\uC158\uC5D0\uC11C \uD574\uACB0]\uB85C \uBB38\uC758\uB97C \uC774\uC5B4\uAC11\uB2C8\uB2E4",confirmation:u.confirmation,history:n.bead_timelines?.[s]})}:{},...l.run_state==="waiting"?{wait:mb(a)}:{},...f?{hold:f}:{},...d?{retry:d}:{},can_pause:!1,can_resume:l.run_state==="provider_hold"})}return i}function Sp(e,t,n,r=null){return{attempt_id:typeof e.attempt_id=="string"?e.attempt_id:"",run_state:n,last_event_at:typeof e.last_event_at=="number"?e.last_event_at:null,last_activity:e.last_activity&&typeof e.last_activity=="object"?e.last_activity:null,legs:Array.isArray(e.legs)?e.legs:[],runner:typeof e.runner=="string"?e.runner:null,model:typeof e.model=="string"?e.model:null,effort:typeof e.effort=="string"?e.effort:null,speed:typeof e.speed=="string"?e.speed:null,resumed_from:typeof e.resumed_from=="string"?e.resumed_from:null,continuation_mode:e.continuation_mode==="session"||e.continuation_mode==="fresh"?e.continuation_mode:null,status:typeof e.status=="string"?e.status:null,usage:cr(t,e.bead_id,r)}}function Ep(e,t){let n=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null;return{cause:typeof e.cause=="string"?e.cause:null,cause_detail:n,summary:n&&typeof n.summary=="string"?n.summary:null,bead_id:typeof e.bead_id=="string"?e.bead_id:"",finished_at:typeof e.finished_at=="number"?e.finished_at:null,runner:typeof e.runner=="string"?e.runner:null,model:typeof e.model=="string"?e.model:null,effort:typeof e.effort=="string"?e.effort:null,observed_effort:typeof e.observed_effort=="string"?e.observed_effort:null,speed:typeof e.speed=="string"?e.speed:null,attempt_id:typeof e.attempt_id=="string"?e.attempt_id:"",usage:e.usage&&typeof e.usage=="object"?e.usage:null,halted_auto_advance:e.halted_auto_advance===!0,quickfix_lane:e.quickfix_lane===!0,quickfix_landing:e.quickfix_landing&&typeof e.quickfix_landing=="object"?e.quickfix_landing:null,retry:Pp(e),resume_eligible:t.resume_eligible,resume_reason:t.resume_reason,landed:cp(e),confirmation:t.confirmation,...Ip(t.history)}}function Ip(e){if(!e||typeof e!="object")return{};let t=Array.isArray(e.events)?e.events:[],n=[];for(let o of t)!o||typeof o!="object"||typeof o.summary!="string"||o.summary.length===0||n.push({event_id:typeof o.event_id=="string"?o.event_id:"",kind:typeof o.kind=="string"?o.kind:"",summary:o.summary,at:typeof o.at=="number"?o.at:null});n.reverse();let r=typeof e.log_path=="string"&&e.log_path.length>0?e.log_path:null;return{...n.length>0?{timeline:n}:{},...r===null?{}:{log_path:r},...e.log_expired===!0?{log_expired:!0}:{},...e.log_unreadable===!0?{log_unreadable:!0}:{}}}function mb(e){let t=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null,n=Array.isArray(t?.blockers)?t.blockers:[],r=[];for(let o of n)!o||typeof o!="object"||typeof o.id!="string"||o.id.length===0||r.push({id:o.id,rig:typeof o.rig=="string"?o.rig:null,status:typeof o.status=="string"?o.status:""});return{summary:t&&typeof t.summary=="string"?t.summary:null,blockers:r,since:typeof e.finished_at=="number"?e.finished_at:null}}function Lp(e){return e?.status==="paused"&&typeof e.cause=="string"&&e.cause.startsWith("provider_outage:")}function gb(e,t){let n=typeof e.runner=="string"?e.runner:"",r=Ye(t)[n];return!r||!Array.isArray(r.targets)?null:r.targets.find(o=>Array.isArray(o?.attempt_ids)&&o.attempt_ids.includes(e.attempt_id))||null}function hb(e,t){if(e===null)return null;let n=Ye(t).claude;if(!Array.isArray(n))return null;let r=n.find(o=>o?.email===e);return r&&typeof r.alias=="string"&&r.alias.length>0?r.alias:null}function bb(e,t){let n=e,r=new Set;for(;n&&!r.has(n.attempt_id);){if(r.add(n.attempt_id),n.auto_resume_kind==="provider_outage")return!0;n=typeof n.resumed_from=="string"?t[n.resumed_from]:null}return!1}function yb(e,t,n,r){if((Array.isArray(r.auto_resume_pending)?r.auto_resume_pending:[]).some(s=>s?.attempt_id===e.attempt_id))return"pending";let i=e.auto_resume_refused;return typeof i=="string"&&i.length>0?`refused:${i}`:n.startsWith("auto_resume_disarmed:")||t?.auto_switch==="cap"||bb(e,r.attempts)?"disarmed":null}function vb(e,t){let n=e.cause.slice(16),r=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null,o=gb(e,t.provider_hold),i=typeof o?.model=="string"&&o.model.length>0?o.model:typeof e.model=="string"&&e.model.length>0?e.model:null,s=typeof o?.account=="string"&&o.account.length>0?o.account:typeof e.claude_account=="string"&&e.claude_account.length>0?e.claude_account:null,l=typeof o?.last_error=="string"?o.last_error:"",a=yb(e,o,l,{auto_resume_pending:t.auto_resume_pending,attempts:t.attempts}),u=typeof o?.resets_at=="number"?o.resets_at:typeof r?.resets_at=="number"?r.resets_at:null,d=typeof o?.next_probe_at=="number"?o.next_probe_at:null,f=hb(s,t.account_catalog),_=Ip(t.history);return{kind:o?.kind==="usage_limit"||n==="usage_limit"?"usage_limit":"outage",detail:n,...typeof r?.message=="string"?{message:r.message}:{},...typeof r?.summary=="string"?{summary:r.summary}:{},...i||s?{target:{...i?{model:i}:{},...s?{account:s}:{},...f?{account_alias:f}:{}}}:{},...u===null?{}:{resets_at:u},...a===null?{}:{auto_resume:a},...o?.auto_switch==="none"||o?.auto_switch==="disabled"?{auto_switch:o.auto_switch}:{},...d===null?{}:{next_probe_at:d},..._.log_path?{log_path:_.log_path}:{}}}function Pp(e){let t=e&&e.retry&&typeof e.retry=="object"?e.retry:null;return t?{cause:typeof t.cause=="string"?t.cause:null,attempts:typeof t.attempts=="number"?t.attempts:0,max:typeof t.max=="number"?t.max:0,next_at:typeof t.next_at=="number"?t.next_at:null}:null}var kb=new Set(["parked","retry_wait","waiting"]);function wb(e,t){let n=Object.values(e||{}),r=new Set(n.map(s=>s?.resumed_from).filter(s=>typeof s=="string")),o=new Map;for(let s of n)s&&typeof s.bead_id=="string"&&ur(s)&&o.set(s.bead_id,s.attempt_id);let i=new Map;for(let s of n){let l=Lp(s);if(!s||typeof s.bead_id!="string"||s.bead_id.length===0||!ur(s)||!kb.has(s.status)&&!l||o.get(s.bead_id)!==s.attempt_id||typeof s.dismissed_at=="number"||l&&r.has(s.attempt_id))continue;let a=t.get(s.bead_id);typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at||i.set(s.bead_id,{attempt:s,run_state:l?"provider_hold":s.status})}return i}function Tp(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"";if(r==="grace_period")return"";if(r==="prerequisite_unmet"&&Array.isArray(n.blockers)&&n.blockers.length>0)return"\u26D3 \uC120\uD589 \uB300\uAE30";let o=r.indexOf(":");return o>0&&o<r.length-1?`\u26D4 ${r.slice(0,o)} (${r.slice(o+1)})`:`\u26D4 ${r}`}function Dp(e,t){let n=Ye(Ye(e)[t]),r=Ye(n.stale_work);return n.reason==="worktree_stale_work"&&typeof r.action_id=="string"&&r.action_id.length>0}function Ye(e){return e&&typeof e=="object"?e:{}}function Hl(e){if(typeof e!="string"||e.length===0)return;let t=e.replace(/\/+$/,""),n=t.lastIndexOf("/"),r=t.slice(n+1);return r.length>0?r:void 0}function $b(e){let t=Ye(e).badge_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function xb(e,t,n){let r=Ye(t);if(Object.keys(r).length===0)return null;let o=e.execution_defaults,i=e.runner_catalog,s=e.session_defaults;if(!o||!i||!s)return null;let l=_=>Cn({pin:_,global:s,execution_defaults:o,runner_catalog:i,route:n}),a,u;try{a=l(r),u=l(null)}catch{return null}let d=Rp(Oo(a,i),Oo(u,i)),f=Rp(Yr(a,null),Yr(u,null));return d||f?{orchestration:d,worker:f}:null}function Rp(e,t){return!e||t&&t.text===e.text?null:e}function Ab(e,t,n){let o=(t&&typeof t=="object"&&Array.isArray(t.released_by)?t.released_by:[]).filter(s=>s&&typeof s=="object"&&typeof s.id=="string").slice().sort((s,l)=>(typeof l.closed_at=="number"?l.closed_at:0)-(typeof s.closed_at=="number"?s.closed_at:0)),i=[];for(let s of o){let l=typeof s.workspace_name=="string"&&s.workspace_name.length>0?s.workspace_name:Hl(s.root_dir),a=kp(e,{...s,...l?{workspace_name:l}:{}},n);a&&i.push(a)}return i.length===0?null:i}function Kl(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}var Sb=new Set(["quick_fix","spec_backed","full_plan"]);function Cp(e){return typeof e=="string"&&Sb.has(e)}function Eb(e){let t={...Ye(e.session_defaults)};for(let n of["orchestration_model","orchestration_effort","orchestration_speed","quick_fix_orchestration_model","quick_fix_orchestration_effort","quick_fix_orchestration_speed"]){let r=e[n];typeof r=="string"&&(t[n]=r)}return t}function Tb(e,t,n){let r=e.runner_catalog??null,o=zl(e,t,n,null);if(!o)return null;let i=Bn(r,o.orchestration_model.value??""),s=i===null?o:zl(e,t,n,i)||o,l=Oo(s,r),a=Yr(s,i);return l||a?{orchestration:l,worker:a}:null}function zl(e,t,n,r){let o=Cp(n)?n:Cp(t.route)?t.route:null;try{return Cn({pin:t,global:Eb(e),execution_defaults:e.execution_defaults??null,runner_catalog:e.runner_catalog??null,route:o,controller_runtime:r})}catch{return null}}function Mp(e,t,n){return!t||!Object.hasOwn(t,"metadata")?null:Yr(zl(e,Ye(t.metadata),t.route,n),n)}function Rb(e,t,n){if(!n)return null;let r=Pi(n),o=Mp(e,t,typeof n.runner=="string"?n.runner:null);return r||o?{orchestration:r,worker:o}:null}function Ml(e){if(!e)return null;let t=Ye(e),n=Ye(t.chips),r=typeof n.route=="string"&&n.route.length>0?n.route:typeof t.route=="string"&&t.route.length>0?t.route:"",o=n.route_source==="derived"||t.route_source==="derived";return r.length===0||o?"unset":r}function Cb(e){return Ml(e.workflow)??"unset"}function Gl(e,t){let n=new Set,r=e;for(;r&&!n.has(r.attempt_id);){if(r.conflict_resolution===!0)return!0;n.add(r.attempt_id),r=typeof r.resumed_from=="string"&&r.resumed_from.length>0&&t.get(r.resumed_from)||null}return!1}function Ob(e){let t={};for(let l of Zn)t[l]=0;let n=!1,r=0,o=0,i=0;for(let l of e){let a=l.usage;if(!a||typeof a!="object")continue;let u=!1;for(let d of Zn)Number.isFinite(a[d])&&(t[d]+=a[d],n=!0,u=!0);u&&(o+=1,Number.isFinite(a.total_cost_usd)&&(r+=a.total_cost_usd,i+=1))}o>0&&i===o&&(t.total_cost_usd=r);let s=e.map(l=>l.usage).filter(l=>l&&typeof l=="object"&&l.providers);return s.length>0?mn($i(s)):n?lr(t):null}function Np(e,t){let n=ms(e,t);return n==="internal"?"\uBBF8\uC801\uC7AC":n==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function Ib(e,t,n){let r=t.get(e);if(!r)return Np(e,n);if(typeof r.position=="number"){if(r.lane==="parallel")return`#${r.position}`;if(/^s[1-5]$/.test(r.lane))return`${r.lane} #${r.position}`}return _s(r)}function Lb(e,t,n,r,o,i){let s=t.get(e);if(!s)return{label:i&&ms(e,n)==="internal"?"\uC9C4\uD589 \uB300\uAE30":Np(e,n),title:""};if(s.state==="runnable"&&i&&ms(e,n)==="internal")return{label:"\uC9C4\uD589 \uB300\uAE30",title:""};if(typeof s.position=="number"&&(s.lane==="parallel"||/^s[1-5]$/.test(s.lane))){let a=r.get(e),u=s.lane==="parallel"?"\uBCD1\uB82C":s.lane,d=o.get(e);return{label:!!d&&d.reason==="prerequisite_unmet"&&Array.isArray(d.blockers)&&d.blockers.length>0?"\u26D3 \uC120\uD589 \uB300\uAE30":a&&a.length>0?"\u{1F512} \uB300\uAE30":"\uB300\uAE30",title:`${s.workspace_name||s.root_dir} ${u} #${s.position}`}}return{label:s.state==="running"?"\u25B6 \uC2E4\uD589\uC911":_s(s),title:""}}function Pb(e,t){for(let n of Object.values(e||{}))if(n&&n.attempt_id===t&&typeof n.armed_by_lane=="string"&&n.armed_by_lane.length>0)return n.armed_by_lane;return null}function Db(e,t,n,r,o,i){return t==="draft"?{state:"draft",badge:"draft",run_label:null,can_stop:!1}:n.some(s=>i.failed_by_bead.get(s.id)===e)?{state:"failed",badge:"\u26D4 \uC2E4\uD328",run_label:"\u25B6 \uB2E4\uC2DC \uC9C4\uD589",can_stop:!1}:i.disarmed_lanes.has(e)?{state:"restart",badge:"\u23F8 \uC7AC\uC2DC\uC791",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}:n.some(s=>i.armed_by_bead.get(s.id)===e)?{state:"running",badge:"\u25B6 \uC9C4\uD589 \uC911",run_label:o.length>0?"\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589":null,can_stop:!0}:r?{state:"all_done",badge:"\uBAA8\uB450 \uC644\uB8CC",run_label:null,can_stop:!1}:{state:"confirmed",badge:"\uD655\uC815",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}}function Mb(e,t,n,r,o,i,s,l,a){let u=[];return e.forEach((d,f)=>{let _=typeof d.id=="string"?d.id:"";if(_.length===0)return;let k=d.status==="confirmed"?"confirmed":"draft",m=Array.isArray(d.entries)?d.entries:[],R=[];m.forEach((H,P)=>{let O=H&&typeof H.bead_id=="string"?H.bead_id:"";if(O.length===0)return;let q=H&&typeof H.root_dir=="string"?H.root_dir:"",F=n.get(O),z=F?F.state:void 0,B=z==="running"||z==="pr_wait"||z==="done",N=!F||z==="runnable",V=F&&F.lane==="parallel"&&typeof F.position=="number"?F.position-1:null,W=Lb(O,n,r,t,l,k==="confirmed"),oe=R.length>0?R[R.length-1]:null,fe=k==="confirmed"&&oe!==null&&!oe.done&&!(t.get(O)||[]).includes(oe.id),Pe=a.get(O)||null;R.push({id:O,title:o.get(O)||O,route:Pe?Pe.route:null,route_source:Pe?Pe.route_source:null,exec_chips:Pe?Pe.exec_chips:null,added_at:Pe?Pe.added_at:null,root_dir:F?F.root_dir:q,workspace_name:F?F.workspace_name:i.get(q)||"",seq:P+1,location_label:W.label,location_title:W.title,draggable:!B,fixed:B,done:z==="done",unplaced:N,mismatch:fe,...V!==null?{queue_index:V}:{}})}),R.forEach((H,P)=>{H.seq=P+1});let T=R.length>0&&R.every(H=>H.done),D=R.filter(H=>!H.fixed&&s.armed_by_bead.get(H.id)!==_).map(H=>H.id),ne=Db(_,k,R,T,D,s);u.push({lane_id:_,status:k,draft:k==="draft",number:f+1,label:`\uC5F0\uACB0 ${f+1} \xB7 \uB808\uD3EC \uAC04`,rows:R,all_done:T,can_confirm:k==="draft"&&R.length>=2,has_mismatch:k==="confirmed"&&R.some(H=>H.mismatch),unlaunched:D,...ne})}),u}function Nb(e,t,n){if(e.lane==="runnable"){let s=n.get(e.id);return s?s.length===0?{scope:[],state:"missing"}:{scope:s,state:"declared"}:{scope:[],state:void 0}}let r=t.get(e.root_dir),o=r?r[e.id]:void 0;if(!o||!Array.isArray(o.scope))return{scope:[],state:void 0};let i=o.scope.filter(s=>typeof s=="string"&&s.length>0);return{scope:i,state:i.length===0?"missing":"declared"}}function qb(e,t,n,r,o){let i=new Map;for(let a of[...e.running,...e.queue,...e.runnable,...e.pr_wait]){if(!t.has(a.root_dir))continue;let u=`${a.root_dir}\0${a.id}`,d=i.get(u);if(d){d.cards.push(a);continue}let{scope:f,state:_}=Nb(a,t,n);_!==void 0&&(a.scope_state=_),i.set(u,{cards:[a],scope:f})}let s=new Map;for(let a of i.values()){let u=a.cards[0].scope_state;if(u!==void 0)for(let _ of a.cards)_.scope_state=u;if(a.scope.length===0)continue;let d=a.cards[0].root_dir,f=s.get(d);f?f.push(a):s.set(d,[a])}let l=(a,u,d)=>{let f=u.cards[0],_={id:f.id,title:f.title,location_label:Ib(f.id,r,o),prefixes:d,...typeof f.root_dir=="string"&&f.root_dir.length>0?{root_dir:f.root_dir}:{}};for(let k of a.cards)k.overlap_chips?k.overlap_chips.push(_):k.overlap_chips=[_]};for(let a of s.values())for(let u=0;u<a.length;u+=1)for(let d=u+1;d<a.length;d+=1){let f=qi(a[u].scope,a[d].scope);f.length!==0&&(l(a[u],a[d],f),l(a[d],a[u],f))}}function Ul(e,t,n,r){let o=n?n.get(t)?.root_dir:void 0,i=r?r[t]:void 0,s=!Qn(e.id,t),l=typeof e.root_dir=="string"?e.root_dir:"",a=typeof o=="string"&&o.length>0?o:typeof i=="string"&&i.length>0?i:s&&l.length>0?l:"";return a.length>0?{openable:!0,root_dir:a}:s?{openable:!0}:{}}function jb(e,t,n,r){let o=new Set(e?e.ids:[]);for(let l of t&&Array.isArray(t.ids)?t.ids:[])typeof l=="string"&&l.length>0&&o.add(l);if(o.size===0)return{ids:[]};let i={},s={...e?e.root_dirs:{},...t&&t.root_dirs&&typeof t.root_dirs=="object"?t.root_dirs:{}};for(let l of o){let a=s[l];if(typeof a=="string"&&a.length>0){i[l]=a;continue}if(!Qn(n.id,l)){n.root_dir.length>0&&(i[l]=n.root_dir);continue}let u=r.get(l)?.root_dir;typeof u=="string"&&u.length>0&&(i[l]=u)}return{ids:[...o],root_dirs:i}}function Wl(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function ra(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Fb(e){let t=typeof e=="string"?e.trim().toLowerCase():"";return t.length===0?null:n=>{let r=typeof n.id=="string"?n.id.toLowerCase():"",o=typeof n.title=="string"?n.title.toLowerCase():"";return r.includes(t)||o.includes(t)}}function Bb(e,t){let n=[e.runnable,e.runnable_all,e.queue,e.running,e.pr_wait,e.done,e.parallel_rows];for(let o of e.runnable_sections)n.push(o.items);let r=[];for(let o of e.queue_groups){n.push(o.items,o.sublanes.parallel);for(let i of o.sublanes.serial)n.push(i.items),r.push(i.occupants)}for(let o of n)for(let i of o)i.search_match=t(i);for(let o of r)for(let i of o)i.search_match=t(i)}function Tr(e,t,n){let r=Array.isArray(e)?e:[],o=Array.isArray(t)?t:[],i=n&&typeof n.done_since=="number"?n.done_since:void 0,s={...No,...n&&n.candidate_filter?n.candidate_filter:{}},l=n&&Object.hasOwn(n,"cross_lanes")?n.cross_lanes??null:void 0,a=n&&n.candidate_sort==="as_given"?"as_given":n&&As.some(A=>A.value===n.candidate_sort)?n.candidate_sort:"repo_spec",u=n&&n.groups==="all"?"all":"nonempty",d=n&&n.candidate_hidden_counts==="per_control"?"per_control":"sequential",f=Date.now(),_=new Map;for(let A of o)A&&typeof A.root_dir=="string"&&_.set(A.root_dir,A);let k=new Map;for(let A of o)A&&typeof A.root_dir=="string"&&k.set(A.root_dir,A.name||A.root_dir);for(let A of r)A&&typeof A.root_dir=="string"&&k.set(A.root_dir,A.name||A.root_dir);let m=[],R=[],T=[],D=[],ne=[],H=[],P=new Map,O=new Map,q=new Map,F=new Map,z=new Map,B=new Map,N=new Map,V=new Map,W=new Map,oe=new Map,fe=new Map,Pe=new Map,G=new Map,se=new Map,_e=new Map,Oe=new Map,Q=new Set,ce=new Map,J=new Map,Se=new Map;for(let A of r){if(!A||typeof A.root_dir!="string")continue;let re=A.root_dir,Me=A.name||re,Ce=_.get(re),Fe=Ce&&typeof Ce.revision=="number"?Ce.revision:typeof A.revision=="number"?A.revision:0,Ue=Ye(A.attempts),dt=Ce&&Ce.runner_catalog||A.runner_catalog||null,St=Ye(A.bead_titles);for(let[p,h]of Object.entries(St))typeof h=="string"&&h.length>0&&Se.set(p,h);let de=Ye(A.bead_times),ke=Ye(A.pr_observations),He=Ye(A.admission),it=Ye(A.blocker_workspaces);Pe.set(re,it);for(let[p,h]of Object.entries(He))h&&typeof h=="object"&&fe.set(p,h);let nt=Ye(A.revise_parked),pt=Ye(A.merge_queue_state),yt=Ye(A.cleanup_failed),et=Ye(A.discard_operations),Ne=Ye(A.bead_timelines),S=Ye(A.bead_blocked_by);Object.hasOwn(A,"bead_scope")&&ce.set(re,Ye(A.bead_scope));let U=Ye(A.bead_workflow),K=Ye(A.pr_activity),we=Array.isArray(A.repo_operations)?A.repo_operations:[];V.set(re,we);let Ee=typeof A.declared_base=="string"?A.declared_base:null;N.set(re,Ee),B.set(re,Object.entries(yt).map(([p,h])=>({bead_id:p,step:h&&h.step?h.step:"",reason:h&&h.reason?h.reason:"",at:h&&typeof h.at=="number"?h.at:null,detail:h&&typeof h.detail=="string"?h.detail:null,output_tail:h&&typeof h.output_tail=="string"&&h.output_tail?h.output_tail:void 0,log_path:h&&typeof h.log_path=="string"&&h.log_path?h.log_path:void 0,retry_count:h&&typeof h.retry_count=="number"&&Number.isInteger(h.retry_count)&&h.retry_count>0?h.retry_count:0,failure_code:h&&typeof h.failure_code=="string"?h.failure_code:void 0})));for(let[p,h]of Object.entries(Ye(A.bead_overlay)))h&&typeof h=="object"&&W.set(`${re}\0${p}`,h);let ft=new Map;for(let p of Object.values(Ue))p&&typeof p.attempt_id=="string"&&ft.set(p.attempt_id,p);let vt=Array.isArray(A.merge_queue)?A.merge_queue:[],xt=new Set(vt.filter(p=>p&&typeof p.bead_id=="string").map(p=>p.bead_id)),Ct=new Map(vt.filter(p=>p&&typeof p.bead_id=="string").map(p=>[p.bead_id,p])),qt=new Map,Kt=new Map,en=new Map,kt=new Map;vt.forEach((p,h)=>{p&&typeof p.bead_id=="string"&&(qt.set(p.bead_id,h+1),Kt.set(p.bead_id,p.resolution),en.set(p.bead_id,p.continuation_action||null),kt.set(p.bead_id,p.authority||null))});let an=Ye(A.auto_merge_skips),un=p=>{let h=an[p];if(!h)return null;let $=Ye(Ye(ke[p]).pr).head_sha;return $&&$===h.head_sha?h.reason||"":null};z.set(re,{positions:qt,resolutions:Kt,continuations:en,authorities:kt,state:{active:typeof pt.active=="string"?pt.active:null,failures:Ye(pt.failures),waiting:pt.waiting&&typeof pt.waiting.bead_id=="string"&&typeof pt.waiting.reason=="string"?pt.waiting:null},auto_excluded:(Array.isArray(A.pr_wait)?A.pr_wait:[]).map(p=>p&&p.bead_id).filter(p=>typeof p=="string"&&un(p)!==null),running:vt.length>0});let Lt=Array.isArray(A.queue)?A.queue:[];for(let p of[...Lt,...Array.isArray(A.pr_wait)?A.pr_wait:[]])p&&typeof p.bead_id=="string"&&typeof p.armed_by_lane=="string"&&p.armed_by_lane.length>0&&_e.set(p.bead_id,p.armed_by_lane);for(let p of Array.isArray(A.disarmed_on_load)?A.disarmed_on_load:[])typeof p=="string"&&p.length>0&&Q.add(p);let jt=(Array.isArray(A.serial_lanes)?A.serial_lanes:[]).filter(p=>p&&/^s[1-5]$/.test(p.id)&&Array.isArray(p.entries)),Vt=Ye(A.lane_states),Be=typeof A.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(A.serial_lane_count))):Math.min(5,jt.length);q.set(re,Be),F.set(re,Lt.length);let E=new Map(jt.map(p=>[p.id,p])),he=new Map;for(let p of jt)for(let h of p.entries)h&&typeof h.bead_id=="string"&&he.set(h.bead_id,p.id);for(let[p,h]of Object.entries(Ye(A.bead_dependents))){let $=Array.isArray(h?.ids)?h.ids:[],X=Ye(h?.root_dirs),g=se.get(p)||{ids:new Set,root_dirs:{}};for(let b of $)typeof b=="string"&&b.length>0&&g.ids.add(b);for(let[b,te]of Object.entries(X))typeof te=="string"&&te.length>0&&(g.root_dirs[b]=te);se.set(p,g)}for(let[p,h]of Object.entries(S))Array.isArray(h)&&oe.set(p,h.filter($=>typeof $=="string"&&$.length>0));let De=Array.isArray(A.done)?A.done:[];for(let p of De)p&&typeof p.bead_id=="string"&&H.push({id:p.bead_id,root_dir:re,workspace_name:Me});let ht=new Map;for(let p of De)p&&typeof p.bead_id=="string"&&typeof p.added_at=="number"&&ht.set(p.bead_id,p.added_at);let Ke=p=>({id:p,title:St[p]||p,root_dir:re,workspace_name:Me,expected_revision:Fe,draggable:!1,...Ye(de[p]).created_at?{created_at:Ye(de[p]).created_at}:{},...Ye(de[p]).updated_at?{updated_at:Ye(de[p]).updated_at}:{}}),Et=p=>{let h=U[p]?.chips?.pr;return h&&typeof h.number=="number"&&typeof h.url=="string"?{pr_number:h.number,pr_url:h.url}:{}},Pt=p=>Object.hasOwn(S,p)?{blocked_by:Array.isArray(S[p])?S[p].filter(h=>typeof h=="string"&&h.length>0):[]}:{},Ht=(p,h)=>{let $=Pt(p),X=He[p],g=X&&X.reason==="prerequisite_unmet"&&Array.isArray(X.blockers)?X.blockers:[],b=(h?.blockers||[]).map(xe=>xe.id).filter(xe=>typeof xe=="string"&&xe.length>0);if(h&&Object.hasOwn(S,p)){let xe=$.blocked_by||[],We=b.filter(ot=>!xe.includes(ot));return We.length>0&&G.set(`${re}\0${p}`,We),{blocked_by:xe,wait:{...h,returning:xe.length===0}}}let te=[...b,...g.map(xe=>xe.id)].filter(xe=>typeof xe=="string"&&xe.length>0);if(te.length===0)return h?{...$,wait:{...h,returning:!1}}:$;let ye=[...$.blocked_by||[]];for(let xe of te)ye.includes(xe)||ye.push(xe);return{blocked_by:ye,...h?{wait:{...h,returning:!1}}:{}}},Tt=new Set;for(let[p,h]of Op(Ue,ht,{discard_operations:et,observations:ke,bead_timelines:Ne,provider_hold:Ye(A.provider_hold),auto_resume_pending:Array.isArray(A.auto_resume_pending)?A.auto_resume_pending:[],account_catalog:Ye(A.account_catalog),runner_catalog:dt,admission:He})){Tt.add(p);let $=h.run_state==="failed"?Pb(Ue,h.attempt_id):null;$!==null&&Oe.set(p,$);let X=ft.get(h.attempt_id)||null,g=W.get(`${re}\0${p}`),b=g&&g.rollup?g.rollup:null,te=Kl(Ee,X?X.target_base:null),ye=X?Gl(X,ft):!1,xe=X&&X.quickfix_lane===!0&&X.quickfix_landing&&typeof X.quickfix_landing=="object"?X.quickfix_landing:null,We=xe&&typeof xe.reason=="string"&&xe.reason.length>0?xe.reason:null,ot=xe?xs({bead_id:p,merge_sha:xe.head_sha,cleanup_cursor:xe.cursor,cleanup_failed:We?{step:xe.cursor,reason:We}:null,repo_operations:we}):null,Yt=Ht(p,h.wait);R.push({...Ke(p),lane:"running",...Yt,...he.has(p)?{serial_lane_id:he.get(p)}:{},attempt_id:h.attempt_id,run_state:h.run_state,status:h.status||void 0,workflow:U[p]||null,can_pause:h.can_pause,can_resume:h.can_resume,started_at:h.started_at,last_event_at:h.last_event_at,last_activity:h.last_activity,legs:h.legs,runner:h.runner,model:h.model,effort:h.effort,speed:h.speed,resumed_from:h.resumed_from,continuation_mode:h.continuation_mode,usage:h.usage,failure:h.failure||null,hold:h.hold||null,wait:Yt.wait||h.wait||null,retry:h.retry||null,exec_chips:{orchestration:Pi(h),worker:Mp(Ye(Ce),g,h.runner||null)},discard:dr(et,p,{attempt_id:h.attempt_id,merged:h.failure?.confirmation==="merged"||Ye(ke[p]).pr?.state==="MERGED"}),...b?{rollup:b}:{},...ye?{conflict_resolution:!0}:{},...te?{base_exception:te}:{},...ot?{landing:ot}:{},badges:h.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:h.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:h.run_state==="parked"?["\u23F8 \uC138\uC158 \uB300\uAE30"]:h.run_state==="retry_wait"?["\u21BB \uC7AC\uC2DC\uB3C4 \uB300\uAE30"]:h.run_state==="waiting"?["\u26D3 \uC120\uD589 \uB300\uAE30"]:h.run_state==="provider_hold"?["\uACF5\uAE09\uC790 \uBCF4\uB958"]:[],alert:h.run_state==="failed"})}for(let[p,h]of md(Ue)){if(R.some(X=>X.id===p))continue;let $=h.attempt;R.push({...Ke(p),lane:"running",kind:"session",...Pt(p),attempt_id:typeof $.attempt_id=="string"?$.attempt_id:"",run_state:"running",status:"running",non_occupying:!0,workflow:U[p]||null,can_pause:!1,can_resume:!1,started_at:h.started_at,last_event_at:typeof $.last_event_at=="number"?$.last_event_at:null,last_activity:$.last_activity&&typeof $.last_activity=="object"?$.last_activity:null,legs:Array.isArray($.legs)?$.legs:[],runner:typeof $.runner=="string"?$.runner:null,model:typeof $.model=="string"?$.model:null,effort:typeof $.effort=="string"?$.effort:null,speed:typeof $.speed=="string"?$.speed:null,resumed_from:null,continuation_mode:null,usage:$.usage&&typeof $.usage=="object"?$.usage:null,exec_chips:{orchestration:Pi($),worker:null},discard:dr(et,p,{merge_queued:!0}),badges:[h.origin==="auto"?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"],alert:!1})}for(let p of Array.isArray(A.session_active)?A.session_active:[]){let h=p&&p.bead_id;typeof h!="string"||Tt.has(h)||(Tt.add(h),Array.isArray(p.blocked_by)&&p.blocked_by.length>0&&oe.set(h,p.blocked_by.filter($=>typeof $=="string"&&$.length>0)),typeof p.title=="string"&&p.title.length>0&&Se.set(h,p.title),R.push({...Ke(h),title:p.title||St[h]||h,lane:"running",kind:"session",status:"in_progress",started_at:Wl(p.started_at)??Wl(p.updated_at)??void 0,updated_at:Wl(p.updated_at)??void 0,workflow:p.workflow||null,labels:Array.isArray(p.labels)?p.labels:[],spec_id:typeof p.spec_id=="string"?p.spec_id:"",blocked:p.blocked===!0,...Array.isArray(p.blocked_by)?{blocked_by:p.blocked_by.filter($=>typeof $=="string"&&$.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,session_refs:Array.isArray(p.session_refs)?p.session_refs:[],badges:[],alert:!1}))}for(let p of Array.isArray(A.pr_wait)?A.pr_wait:[]){let h=p&&p.bead_id;if(typeof h!="string"||Tt.has(h))continue;Tt.add(h);let $=Ye(ke[h]),X=Ye($.pr),g=$.gate?Ye($.gate):null,b=xt.has(h),te=Ct.get(h)?.continuation_action||null,ye=!!te&&te.continuation===null,xe=pt.active===h,We=p.external===!0,ot=yt[h]||null,Yt=Ye(K[h]),fn=xs({bead_id:h,merge_sha:p.merge_sha,cleanup_cursor:p.cleanup_cursor,merge_progress:Yt.merge_progress||null,cleanup_failed:ot,repo_operations:we}),Qt=na(fn),dn=!!g&&g.base_badge==="\uCDA9\uB3CC",In=!!ot&&["post_merge_jobs","child_sweep","branch_cleanup","parent_close"].includes(ot.step)&&!!g&&g.tier==="merged",Jt=We&&!!ot&&!!g&&g.tier==="merged",uo=!!g&&["closed_unmerged","review","undecidable"].includes(g.tier),Ln=dr(et,h,{external:We,merge_active:xe||fn?.step==="merge",merge_queued:b,cleanup_active:Qt,merged:!!ot||g?.tier==="merged"}),Mr=!!Ln.operation,Nr=$b($.receipt_check);T.push({...Ke(h),lane:"pr_wait",...Pt(h),...Nr.length>0?{receipt_badge:{codes:Nr}}:{},workflow:U[h]||null,pr_number:typeof X.number=="number"?X.number:null,pr_url:typeof X.url=="string"?X.url:void 0,external:We,usage:cr(Ue,h,dt),merge_step:fn,badges:ye?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:fn?[g?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:ot?[to(ot.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${to(ot.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof g?.gate_badge=="string"&&g.gate_badge.length>0?[g.gate_badge]:[],alert:fn?fn.failed===!0:!!ot||uo,reason:ot&&fn?.active!==!0?ta(ot.step):"PR \uB300\uAE30",merge_action:g?.tier==="merged"&&!In&&!Jt?!1:!b||ye,merge_enabled:!Mr&&(ye||g?.enabled===!0||dn||In||Jt),merge_label:ye?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Jt||In?"\uC815\uB9AC \uC7AC\uC2DC\uB3C4":dn&&!In?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:ye?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Mr?Ln.error?`\uD3D0\uAE30 \uC2E4\uD328: ${Ln.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${Ln.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Jt?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":In?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":dn?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":g?.enabled===!0?`\uBA38\uC9C0 (${g.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${g?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:b&&!ye,cancel_enabled:!xe,continuation_mismatch:te?.mismatch||null,discard:Ln,discard_action:Ln.action,discard_enabled:Ln.enabled,discard_title:Ln.title})}let ln=(p,h,$,X)=>{let g=p&&p.bead_id;if(typeof g!="string"||Tt.has(g))return null;Tt.add(g);let b=nt[g],te=dr(et,g),ye=te.operation?te:null,xe={...Ke(g),lane:h,...typeof p.added_at=="number"?{added_at:p.added_at}:{},workflow:U[g]||null,draggable:!ye,discard:ye||void 0,reason:Tp(He,g),seq:$+1,queue_position:$+1,queue_index:$,queue_length:X,badges:b?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!b,revise_action:!!b,revise_enabled:!!b&&!ye,revise_title:b?b.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${b.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""},We=Ht(g,null);return Object.hasOwn(We,"blocked_by")&&(xe.blocked_by=We.blocked_by),xe};for(let p=0;p<Lt.length;p++){let h=ln(Lt[p],"queue",p,Lt.length);if(!h)continue;D.push(h);let $=P.get(re);$?$.push(h):P.set(re,[h])}let Mt=p=>{let h=T.find(b=>b.id===p&&b.root_dir===re);if(h)return{id:p,title:h.title,badge:"PR \uB300\uAE30 \xB7 \uC810\uC720"};let $=R.find(b=>b.id===p&&b.root_dir===re),X=$?$.run_state:fb(Ue,p),g=X==="failed"||X==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":X==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720";return{id:p,title:$?$.title:Ke(p).title,badge:g}},yn=[];for(let p=0;p<Math.max(Be,jt.length);p++){let h=`s${p+1}`,$=E.get(h),X=$&&Array.isArray($.entries)?$.entries:[],g=Ye(Vt[h]),b=Array.isArray(g.occupied_by)?g.occupied_by.filter(We=>typeof We=="string"):[],te=new Set(b),ye=new Set(X.map(We=>We?.bead_id).filter(We=>typeof We=="string"&&te.has(We)&&Dp(He,We))),xe=[];for(let We=0;We<X.length;We++){let ot=X[We]&&X[We].bead_id;if(typeof ot=="string"&&te.has(ot)&&!ye.has(ot)){Tt.add(ot);continue}let Yt=ln(X[We],h,We,X.length);Yt&&(typeof ot=="string"&&ye.has(ot)&&(Yt.badges=[Mt(ot).badge,...Yt.badges||[]]),xe.push(Yt),D.push(Yt))}xe.length===0&&b.length===0&&(Be<=1||p>=Be)||yn.push({id:h,index:p,items:xe,raw_length:X.length,occupied_by:b,occupants:b.filter(We=>!ye.has(We)).map(We=>Mt(We)),corrections:Array.isArray(g.corrections)?g.corrections.length:0,cycle:g.cycle===!0,...xe.length===0&&b.length===0?{empty:!0}:{}})}O.set(re,yn);let v=Array.from({length:Be},(p,h)=>{let $=`s${h+1}`,X=E.get($),g=X&&Array.isArray(X.entries)?X.entries:[],b=Ye(Vt[$]);return{id:$,index:g.length,length:g.length,occupied_by:Array.isArray(b.occupied_by)?b.occupied_by.filter(te=>typeof te=="string"):[]}});for(let p of Array.isArray(A.runnable)?A.runnable:[]){let h=p&&p.bead_id;if(typeof h!="string"||Tt.has(h))continue;Tt.add(h);let $=p.workflow&&typeof p.workflow=="object"?p.workflow:null,X=$&&typeof $.route=="string"&&$.route||(typeof p.route=="string"?p.route:null),g=xb(Ye(Ce),p.exec_pins,X),b=fs(p.rec,p.exec_pins);Array.isArray(p.blocked_by)&&p.blocked_by.length>0&&oe.set(h,p.blocked_by.filter(Jt=>typeof Jt=="string"&&Jt.length>0)),typeof p.title=="string"&&p.title.length>0&&Se.set(h,p.title),Array.isArray(p.scope)&&J.set(h,p.scope.filter(Jt=>typeof Jt=="string"&&Jt.length>0));let te=Object.hasOwn(p,"eligible"),xe=!te&&Object.hasOwn(p,"route")&&Object.hasOwn(p,"spec_state")&&Object.hasOwn(p,"has_description")&&Object.hasOwn(p,"awaiting_user")&&Object.hasOwn(p,"worker_ineligible")?El({route:typeof p.route=="string"?p.route:"",spec:p.spec_state,has_description:p.has_description===!0,awaiting_user:p.awaiting_user===!0,worker_ineligible:p.worker_ineligible===!0},null):null,We=te?p.eligible!==!1:xe?xe.placeable:!0,ot=xe?xe.worker_ineligible:p.worker_ineligible===!0,Yt=We&&!ot,fn=xe?{route_ok:xe.route_ok,awaiting_user:xe.awaiting_user,missing_description:xe.missing_description,placement_spec:xe.spec}:Object.hasOwn(p,"route_ok")?{route_ok:p.route_ok===!0,awaiting_user:p.awaiting_user===!0,missing_description:p.missing_description===!0,placement_spec:p.placement_spec}:null,Qt=[];!te&&xe&&!xe.placeable&&Qt.push(Xr(xe)),typeof p.reason=="string"&&p.reason.length>0&&Qt.push(p.reason);let dn=Tp(He,h);dn&&Qt.push(dn);let In=Ab(h,p.release_info,f)?.map(Jt=>({...Jt,...Ul({id:h,root_dir:re},Jt.id)}));m.push({...Ke(h),title:p.title||St[h]||h,lane:"runnable",draggable:!te&&Yt,queue_placeable:Yt,...fn||{},...ot?{worker_ineligible:!0}:{},...p.session_preferred===!0?{session_preferred:!0,session_preferred_reason:typeof p.session_preferred_reason=="string"?p.session_preferred_reason:""}:{},...p.spec_after_blocker===!0?{spec_after_blocker:!0}:{},...In?{dependency_chips:{released:In}}:{},...p.dependents_info&&typeof p.dependents_info=="object"?{dependents_info:p.dependents_info}:{},reason:Qt.join(" \xB7 "),created_at:p.created_at??void 0,updated_at:p.updated_at??void 0,status:typeof p.status=="string"?p.status:void 0,labels:Array.isArray(p.labels)?p.labels:[],spec_id:typeof p.spec_id=="string"?p.spec_id:"",published:p.published===!0,workflow:$||(X?{route:X,chips:{route:X}}:null),...g?{exec_chips:g}:{},...b?{rec:b}:{},blocked:p.blocked===!0,...Array.isArray(p.blocked_by)?{blocked_by:p.blocked_by.filter(Jt=>typeof Jt=="string"&&Jt.length>0)}:{},place_index:Lt.length,place_lanes:v})}for(let p of De){let h=p&&p.bead_id;if(typeof h!="string"||Tt.has(h)||(Tt.add(h),i!==void 0&&typeof p.added_at=="number"&&p.added_at<i))continue;let $=_b(Ue,h),X=$&&typeof $.done_kind=="string"?$.done_kind:null,g=Rb(Ye(Ce),W.get(`${re}\0${h}`),$);ne.push({...Ke(h),lane:"done",done:!0,workflow:U[h]||null,...g?{exec_chips:g}:{},done_layout:"three_line",usage:cr(Ue,h,dt),work_ms:ip(Ue,h),done_at:typeof p.added_at=="number"?p.added_at:void 0,done_kind:X,...Et(h),badges:[...X&&Ap[X]?[Ap[X]]:[],...op(Ue,h)]})}for(let p of Array.isArray(A.session_done)?A.session_done:[]){let h=p&&(p.id||p.bead_id);typeof h!="string"||Tt.has(h)||(Tt.add(h),ne.push({...Ke(h),...p,id:h,root_dir:re,workspace_name:Me,expected_revision:Fe,lane:"done",done:!0}))}}if(W.size>0)for(let A of[...m,...D,...R,...T,...ne]){let re=W.get(`${A.root_dir}\0${A.id}`);if(!re)continue;typeof re.priority=="number"&&(A.priority=re.priority),typeof re.from_id=="string"&&re.from_id.length>0&&(A.from_id=re.from_id),A.lane==="done"&&Array.isArray(re.carried_to)&&re.carried_to.length>0&&(A.carried_to=re.carried_to);let Me=Ye(A.workflow),Ce=Ye(Me.chips);if(!Ce.route&&!Me.route&&typeof re.route=="string"&&re.route.length>0&&(A.workflow={...Me,route:re.route,chips:{...Ce,route:re.route}}),!Object.hasOwn(re,"metadata"))continue;let Fe=Ye(re.metadata);if(A.rec=fs(Fe),A.lane==="runnable"||A.lane.startsWith("s")||A.lane==="queue"){let Ue=Tb(Ye(_.get(A.root_dir)),Fe,typeof re.route=="string"&&re.route.length>0?re.route:Ye(A.workflow).route);Ue&&(A.exec_chips=Ue)}}let be=new Map;o.forEach((A,re)=>{A&&typeof A.root_dir=="string"&&be.set(A.root_dir,re)});let me=n&&n.running_sort==="repo"?"repo":"started";R.sort((A,re)=>{let Me=A.kind==="session",Ce=re.kind==="session";if(Me!==Ce)return Me?1:-1;if(Me&&Ce){let dt=ra(re.updated_at)-ra(A.updated_at);return dt!==0?dt:A.id.localeCompare(re.id)}if(me==="repo"){let dt=be.get(A.root_dir)??Number.MAX_SAFE_INTEGER,St=be.get(re.root_dir)??Number.MAX_SAFE_INTEGER;if(dt!==St)return dt-St}let Fe=typeof A.started_at=="number"&&Number.isFinite(A.started_at)?A.started_at:null,Ue=typeof re.started_at=="number"&&Number.isFinite(re.started_at)?re.started_at:null;return Fe!==null&&Ue!==null&&Fe!==Ue?Fe-Ue:Fe===null&&Ue!==null?1:Fe!==null&&Ue===null?-1:A.id.localeCompare(re.id)}),ne.sort((A,re)=>(re.done_at??0)-(A.done_at??0));let L=o.length>0?o:r.map(A=>({root_dir:A&&A.root_dir,name:A&&A.name,auto_advance:A&&A.auto_advance,auto_merge:A&&A.auto_merge,slots:A&&A.slots,revision:A&&A.revision,runner_catalog:A&&A.runner_catalog})),ee=new Set(m.map(A=>A.root_dir)),Re=new Map;for(let A of R)A.kind==="session"||A.run_state!=="running"||Re.set(A.root_dir,(Re.get(A.root_dir)||0)+1);let I=new Map;for(let A of ne){let re=I.get(A.root_dir);re?re.push(A):I.set(A.root_dir,[A])}let ae={positions:new Map,resolutions:new Map,continuations:new Map,authorities:new Map,state:{active:null,failures:{},waiting:null},auto_excluded:[],running:!1},le=[];for(let A of L){if(!A||typeof A.root_dir!="string")continue;let re=P.get(A.root_dir)||[],Me=O.get(A.root_dir)||[],Ce=re.length>0||Me.some(dt=>dt.items.length>0||dt.occupied_by.length>0);if(u!=="all"&&!Ce&&!ee.has(A.root_dir))continue;let Fe=typeof A.slots=="number"&&A.slots>=oa?A.slots:oa,Ue=Re.get(A.root_dir)||0;le.push({live_count:Ue,over_cap:Ue>Fe,merge:z.get(A.root_dir)||ae,token_total:Ob(I.get(A.root_dir)||[]),cleanup_failures:B.get(A.root_dir)||[],declared_base:N.get(A.root_dir)??null,repo_operations:V.get(A.root_dir)||[],root_dir:A.root_dir,name:A.name||A.root_dir,auto_advance:A.auto_advance===!0,auto_merge:A.auto_merge===!0,slots:Fe,revision:typeof A.revision=="number"?A.revision:0,runner_catalog:Ye(A.runner_catalog),items:re,sublanes:{parallel:re,serial:Me},serial_lane_count:q.get(A.root_dir)||0,raw_queue_length:F.get(A.root_dir)||0})}let Y={runnable:m,runnable_all:m,runnable_hidden:{blocked:0,readiness:0,route:0},runnable_sections:[],runnable_flat:a==="updated_flat"||a==="as_given",queue:D,queue_groups:le,running:R,pr_wait:T,done:ne,parallel_rows:[],chain_lanes:[],cross_lanes_revision:l&&typeof l.revision=="number"?l.revision:null,cross_lanes_unreadable:l===null,parallel_raw_length:Object.fromEntries(F),owner_of:{}},Ae=zd(Y);for(let A of H)Ae.has(A.id)||Ae.set(A.id,{root_dir:A.root_dir,workspace_name:A.workspace_name,lane:"done",state:"done"});for(let A of[...Y.queue,...Y.runnable,...Y.running,...Y.pr_wait]){if(!Object.hasOwn(A,"blocked_by"))continue;let re=Ae.get(A.id),Me=Pe.get(A.root_dir)||{};A.blockers=(A.blocked_by||[]).map(Ce=>{let Fe=Ae.get(Ce)?.workspace_name||Hl(Me[Ce]);return{...Kd(Ce,re,Ae,o),...Fe?{workspace_name:Fe}:{}}})}for(let A of[...Y.queue,...Y.runnable,...Y.running,...Y.pr_wait]){let re=Pe.get(A.root_dir)||{},Me=(A.blockers||[]).map(dt=>({...Bl(A.id,dt),...Ul(A,dt.id,Ae,re)})),Ce=(G.get(`${A.root_dir}\0${A.id}`)||[]).map(dt=>{let St=Ae.get(dt),de=St?.root_dir||re[dt];return{...wp(A.id,dt,St?.workspace_name||Hl(de),de),...Ul(A,dt,Ae,re)}}),Fe=$p(A.id,jb(se.get(A.id),A.dependents_info,A,Ae));if(Me.length===0&&Ce.length===0&&Fe.length===0)continue;let Ue={...A.dependency_chips||{},...Me.length>0?{predecessors:Me}:{},...Ce.length>0?{released:Ce}:{},...Fe.length>0?{dependents:Fe}:{}};A.dependency_chips=Ue}qb(Y,ce,J,Ae,o);let ge=Gd(Y.queue_groups);for(let A of Y.queue_groups)for(let re of A.sublanes.serial){let Me=ge.get(Vd(A.root_dir,re.id));Me&&(re.cross_wait_peers=Me)}let Le=new Map;for(let A of[...Y.queue,...Y.running,...Y.pr_wait,...Y.done,...Y.runnable]){if(Le.has(A.id))continue;let re=Ye(A.workflow),Me=Ye(re.chips),Ce=W.get(`${A.root_dir}\0${A.id}`),Fe=(typeof Me.route=="string"&&Me.route.length>0?Me.route:typeof re.route=="string"&&re.route.length>0?re.route:Ce&&typeof Ce.route=="string"&&Ce.route.length>0?Ce.route:null)||null,Ue=typeof Me.route_source=="string"?Me.route_source:typeof re.route_source=="string"?re.route_source:null;Le.set(A.id,{route:Fe,route_source:Ue,exec_chips:A.exec_chips||null,added_at:typeof A.added_at=="number"?A.added_at:null})}Y.chain_lanes=Mb(l&&Array.isArray(l.lanes)?l.lanes:[],oe,Ae,o,Se,k,{armed_by_bead:_e,failed_by_bead:Oe,disarmed_lanes:Q},fe,Le);let qe=new Map;for(let A of[...Y.queue,...Y.runnable])qe.has(A.id)||qe.set(A.id,A);let Ze=new Set;for(let A of Y.chain_lanes)for(let re of A.rows){if(A.status==="confirmed"&&!re.unplaced&&!re.fixed&&Ze.add(re.id),!A.draft&&!re.unplaced)continue;let Me=qe.get(re.id);Me&&(Me.cross_lane_chip={lane_id:A.lane_id,number:A.number,status:A.status,label:A.draft?`\uC5F0\uACB0 ${A.number} (draft)`:`\uC5F0\uACB0 ${A.number}`})}let ze=new Map(Y.chain_lanes.map(A=>[A.lane_id,A]));for(let A of[...Y.queue,...Y.running]){let re=_e.get(A.id);if(typeof re!="string"||re.length===0)continue;let Me=ze.get(re);A.armed_lane_chip=Me===void 0||Me.status==="draft"?{lane_id:re,label:"\u25B6 \uC9C4\uD589 \uC911 \xB7 \uB808\uC778 \uC5C6\uC74C",orphan:!0}:{lane_id:re,label:`\u25B6 \uC5F0\uACB0 ${Me.number}`,orphan:!1}}let ie=[];for(let A of P.values())for(let re of A)Ze.has(re.id)||ie.push(re);ie.sort((A,re)=>{let Me=A.workspace_name.localeCompare(re.workspace_name);return Me!==0?Me:(A.queue_index??0)-(re.queue_index??0)}),Y.parallel_rows=ie;let Z={};for(let[A,re]of Ae)typeof re.root_dir=="string"&&re.root_dir.length>0&&(Z[A]=re.root_dir);for(let A of Y.chain_lanes)for(let re of A.rows)!Object.hasOwn(Z,re.id)&&re.root_dir.length>0&&k.has(re.root_dir)&&(Z[re.id]=re.root_dir);Y.owner_of=Z;let Ie=Y.runnable.length;Y.runnable_all=Y.runnable.slice();let tt=Y.runnable,st=A=>s.show_blocked||A.blocked!==!0,Qe=A=>s.readiness==="all"||(s.readiness==="ready"?A.queue_placeable===!0:A.queue_placeable!==!0),ct=no(s.routes),$t=A=>ct.length===0||ct.includes(Cb(A));if(d==="per_control"){let A=[],re=0,Me=0,Ce=0;for(let Fe of tt){let Ue=st(Fe),dt=Qe(Fe),St=$t(Fe);if(Ue&&dt&&St){A.push(Fe);continue}(Ue?0:1)+(dt?0:1)+(St?0:1)>1||(Ue?dt?Ce+=1:Me+=1:re+=1)}tt=A,Y.runnable_hidden={blocked:re,readiness:Me,route:Ce}}else{tt=tt.filter(st);let A=tt.length;tt=tt.filter(Qe);let re=tt.length;tt=tt.filter($t),Y.runnable_hidden={blocked:Ie-A,readiness:A-re,route:re-tt.length}}let mt=(A,re)=>{let Me=ra(re.updated_at)-ra(A.updated_at);return Me!==0?Me:A.id.localeCompare(re.id)},gt=a==="repo_spec"?(A,re)=>{let Me=A.queue_placeable===!0?0:1,Ce=re.queue_placeable===!0?0:1;if(Me!==Ce)return Me-Ce;let Fe=A.published===!0?0:1,Ue=re.published===!0?0:1;return Fe!==Ue?Fe-Ue:mt(A,re)}:mt;if(a==="as_given")Y.runnable=tt,Y.runnable_sections=[];else if(a==="updated_flat")Y.runnable=tt.slice().sort(mt),Y.runnable_sections=[];else{let A=new Map;for(let Ce of tt){let Fe=A.get(Ce.root_dir);Fe?Fe.push(Ce):A.set(Ce.root_dir,[Ce])}let re=[],Me=[];for(let Ce of L){if(!Ce||typeof Ce.root_dir!="string")continue;let Fe=(A.get(Ce.root_dir)||[]).slice().sort(gt);A.delete(Ce.root_dir),Fe.length!==0&&(re.push({root_dir:Ce.root_dir,name:Ce.name||Ce.root_dir,items:Fe.map(Ue=>({...Ue,workspace_name:""}))}),Me.push(...Fe))}for(let[Ce,Fe]of A){let Ue=Fe.slice().sort(gt);re.push({root_dir:Ce,name:Ue[0]?.workspace_name||Ce,items:Ue.map(dt=>({...dt,workspace_name:""}))}),Me.push(...Ue)}Y.runnable=Me,Y.runnable_sections=re}let Zt=Fb(n?n.search:void 0);return Zt&&Bb(Y,Zt),Y}var ia=["impl_review_model","impl_review_effort","impl_review_speed"],Ub=Object.freeze({impl_review_model:"fable",impl_review_effort:"xhigh",impl_review_speed:"default"});function oo(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function pr(e){return typeof e=="string"&&e.length>0?e:null}function Yl(e){let t=oo(e)&&oo(e.metadata)?e.metadata:{};return t.route!=="quick_fix"?{eligible:!1,reason:"route=quick_fix \uC774\uC288\uB9CC \uC6D0\uBCF8\uC774 \uB429\uB2C8\uB2E4"}:pr(t.quick_fix_review)===null?{eligible:!1,reason:"quick_fix_review \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}:{eligible:!0,reason:""}}function qp(e,t,n=20){let r=String(t||"").trim().toLowerCase(),o=[],i=new Set;for(let s of Array.isArray(e)?e:[]){let l=pr(oo(s)?s.id:null);if(l===null||i.has(l))continue;let a=pr(s.title)??"";if(r.length>0&&!l.toLowerCase().includes(r)&&!a.toLowerCase().includes(r))continue;i.add(l);let u=Yl(s);if(o.push({id:l,title:a,eligible:u.eligible,reason:u.reason}),o.length>=n)break}return o.sort((s,l)=>s.eligible===l.eligible?0:s.eligible?-1:1)}function Ql(e){let t=typeof e=="number"?e:Number.parseInt(String(e??""),10);return Number.isFinite(t)?Math.min(5,Math.max(1,Math.trunc(t))):1}function aa(e){for(let t of Array.isArray(e)?e:[]){let n=oo(t)&&oo(t.reviewer)?t.reviewer:null;if(n===null)continue;let r={},o=!0;for(let i of ia){let s=pr(n[i]);if(s===null){o=!1;break}r[i]=s}if(o)return r}return{...Ub}}function jp(e){return pr(e.source_id)===null||e.source_eligible!==!0||!Array.isArray(e.preset_ids)||e.preset_ids.length===0||Ql(e.repeats)!==e.repeats?!1:e.reviewer_mode==="fixed"?ia.every(t=>pr(e.reviewer?.[t])!==null):!0}var Vl=Object.freeze({bad_request:"\uC785\uB825\uC774 \uC11C\uBC84 \uC870\uAC74\uC744 \uB9CC\uC871\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4",bd_error:"\uC6D0\uBCF8 \uC774\uC288\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",bench_base_unreadable:"base tip\uC744 \uC77D\uC9C0 \uBABB\uD574 \uC2E4\uD5D8\uC744 \uC2DC\uC791\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",bench_tuple_unresolved:"\uD504\uB9AC\uC14B\uC744 \uC644\uC804\uD55C \uC2E4\uD589 tuple\uB85C \uD574\uC11D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",worker_unavailable:"Worker \uB7F0\uD0C0\uC784\uC774 \uBD99\uC5B4 \uC788\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4",bench_run_create_failed:"\uD074\uB860 \uC0DD\uC131\uC5D0 \uC2E4\uD328\uD574 \uC2E4\uD5D8\uC744 \uB9CC\uB4E4\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",bench_run_list_failed:"\uC2E4\uD5D8 \uBAA9\uB85D\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"});function la(e){if(typeof e=="string")return Vl[e]??e;if(!oo(e))return"\uC2E4\uD5D8 \uC0DD\uC131\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4";let t=pr(e.code)??pr(e.error)??"",n=pr(e.message)??"",r=Vl[t]??(n.length>0?n:t),o=[r.length>0?r:"\uC2E4\uD5D8 \uC0DD\uC131\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"];t.length>0&&n.length>0&&Vl[t]&&o.push(`(${n})`);let i=oo(e.details)?e.details:{},s=Array.isArray(i.aborted)?i.aborted.filter(l=>typeof l=="string"&&l.length>0):[];return s.length>0&&o.push(`\u2014 \uB2EB\uD78C \uD074\uB860: ${s.join(", ")}`),o.join(" ")}function Xl(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Dn(e){return typeof e=="number"&&Number.isFinite(e)?e:null}function Rr(e){return typeof e=="string"&&e.length>0?e:null}var Wb=new Set(["failed","orphaned"]);function Fp(e){if(!Xl(e))return null;let t=Dn(e.cell_count),n=Dn(e.terminal_count);return t===null||n===null?null:{terminal:n,total:t,text:`${n}/${t}`}}function qo(e){let t=e.map(i=>Dn(i)).filter(i=>i!==null).sort((i,s)=>i-s),n=e.length;if(t.length===0)return{median:null,sample:0,total:n};let r=Math.floor(t.length/2);return{median:t.length%2===1?t[r]:(t[r-1]+t[r])/2,sample:t.length,total:n}}function Hb(e){let t=e.filter(n=>n==="pass"||n==="fail");return t.length<2?null:{k:t.length,value:t.every(n=>n==="pass")?1:0}}function zb(e,t){if(t&&(t.verify==="pass"||t.verify==="fail"))return t.verify;let n=Xl(e.bench_verify)?e.bench_verify:null;return n===null?null:n.ok===!0?"pass":"fail"}function Bp(e,t){if(!Xl(e))return[];let n=new Map;for(let s of Array.isArray(t)?t:[]){let l=Rr(s?.attempt_id);l!==null&&n.set(l,s)}let r=Array.isArray(e.cells)?e.cells:[],o=Array.isArray(e.presets)?e.presets:[],i=[];for(let s of o){let l=Rr(s?.id);if(l===null)continue;let u=r.filter(_=>_?.preset_id===l).sort((_,k)=>(Dn(_?.k)??0)-(Dn(k?.k)??0)).map(_=>{let k=Rr(_.attempt_id),m=k===null?null:n.get(k)??null,R=zb(_,m);return{...m??{},bead_id:Rr(_.bead_id)??"",attempt_id:k,cell_k:Dn(_.k),status:Rr(m?.status)??Rr(_.status),failed:m?.failed===!0||Wb.has(String(_.status??"")),verify:R,workspace_name:_.k===null?"":`#${_.k}`}}),d=u.filter(_=>_.verify==="pass"||_.verify==="fail"),f=d.filter(_=>_.verify==="pass"&&_.status==="done");i.push({key:`${Rr(e.run_id)??""}:${l}`,name:Rr(s?.name)??l,n:u.length,success_rate:d.length===0?null:f.length/d.length,success_sample:d.length,unknown_count:u.length-d.length,pass_caret:Hb(u.map(_=>_.verify)),failed_count:u.filter(_=>_.failed===!0).length,retry_count:u.filter(_=>_.is_retry===!0).length,duration_ms:qo(u.map(_=>Dn(_.duration_ms))),tokens:qo(u.map(_=>Dn(_.usage?.tokens))),cost_usd:qo(u.map(_=>Dn(_.usage?.total_cost_usd))),blocking:qo(u.map(_=>Dn(_.review?.blocking))),minor:qo(u.map(_=>Dn(_.review?.minor))),round:qo(u.map(_=>Dn(_.review?.round))),rows:u})}return i}var on="\u2014";function tr(e){return typeof e=="number"&&Number.isFinite(e)?e:null}function ca(e){let t=tr(e);if(t===null||t<0)return on;let n=Math.round(t/1e3);if(n<60)return`${n}\uCD08`;let r=Math.floor(n/60);return r<60?`${r}\uBD84`:`${Math.floor(r/60)}\uC2DC\uAC04 ${r%60}\uBD84`}function ua(e){let t=tr(e);return t===null||t<=0?on:t>=1e6?`\u03C4 ${(t/1e6).toFixed(1)}M`:t>=1e3?`\u03C4 ${(t/1e3).toFixed(1)}k`:`\u03C4 ${t}`}function Up(e){return!e||tr(e.total_cost_usd)===null?on:wi({total_cost_usd:e.total_cost_usd,unpriced_leg_count:e.unpriced_leg_count})??on}function Zl(e){let t=tr(e);return t===null?on:`$${t.toFixed(2)}`}function Wp(e){let t=tr(e?.sample)??0,n=tr(e?.total)??0;return t===0||t===n?"":`n=${t}/${n}`}function Jl(e){let t=tr(e);return t===null?on:`${Math.round(t*100)}%`}function Hp(e){return e==="pass"?"\uD1B5\uACFC":e==="fail"?"\uC2E4\uD328":"\uBBF8\uC0C1"}function zp(e){let t=[];return e.failed===!0&&t.push(typeof e.cause=="string"&&e.cause.length>0?`\uC2E4\uD328 \xB7 ${e.cause}`:"\uC2E4\uD328"),e.is_retry===!0&&t.push("\uC7AC\uC2DC\uB3C4"),t.length===0?on:t.join(" \xB7 ")}function Kp(e){if(!e)return on;let t=tr(e.blocking),n=tr(e.minor),r=tr(e.round);if(t===null&&n===null&&r===null)return on;let o=t===null&&n===null?null:`b${t??0}/m${n??0}`,i=r===null?null:`r${r}`;return[o,i].filter(s=>s!==null).join(" \xB7 ")}var Kb="30d";function Gp(e,t={}){let n=Bt("views:compare"),r=t.transport,o=t.gotoIssue,i=t.execPresetStore,s=t.sourceCandidates,l={range:Kb,root_dir:"",issue_type:"",route:"",include_bench:!1},a={rows:[],groups:[],workspaces:[]},u=new Set,d=!1,f=null,_=!1,k=0,m={runs:[],error:null,loading:!1,selected:null,rows:[],rows_error:null},R=new Set,T=0,D={open:!1,source_id:"",query:"",preset_ids:[],repeats:1,reviewer_mode:"fixed",reviewer:aa([]),error:null,submitting:!1};async function ne(){if(!r)return;let L=k+=1;d=!0,f=null,be();try{let ee=await r("get-compare",{range:l.range,root_dirs:l.root_dir?[l.root_dir]:[],issue_types:l.issue_type?[l.issue_type]:[],routes:l.route?[l.route]:[],include_bench:l.include_bench});if(L!==k)return;let Re=ee&&ee.payload?ee.payload:ee;a={rows:Array.isArray(Re?.rows)?Re.rows:[],groups:Array.isArray(Re?.groups)?Re.groups:[],workspaces:Array.isArray(Re?.workspaces)?Re.workspaces:a.workspaces},_=!0}catch(ee){if(L!==k)return;n("get-compare failed: %o",ee),f=ee instanceof Error?ee.message:String(ee)}finally{L===k&&(d=!1,be())}}async function H(){if(r){m.loading=!0,m.error=null,be();try{let L=await r("bench-run-list",{}),ee=L&&L.payload?L.payload:L;m.runs=Array.isArray(ee?.runs)?ee.runs:[],m.selected!==null&&!m.runs.some(Re=>Re.run_id===m.selected)&&(m.selected=null),D.open||(D.reviewer=aa(m.runs))}catch(L){n("bench-run-list failed: %o",L),m.error=la(L)}finally{m.loading=!1,be()}}}async function P(L){if(!r)return;let ee=T+=1;m.rows_error=null;try{let Re=await r("get-compare",{range:"all",root_dirs:L.root_dir?[L.root_dir]:[],issue_types:[],routes:[],include_bench:!0});if(ee!==T)return;let I=Re&&Re.payload?Re.payload:Re;m.rows=Array.isArray(I?.rows)?I.rows:[]}catch(Re){if(ee!==T)return;n("bench rows read failed: %o",Re),m.rows=[],m.rows_error=la(Re)}finally{ee===T&&be()}}function O(L){if(m.selected===L){m.selected=null,be();return}m.selected=L,m.rows=[],be();let ee=m.runs.find(Re=>Re.run_id===L);ee&&P(ee)}function q(){let L=z(D.source_id);return jp({source_id:D.source_id,source_eligible:L===null?!1:Yl(L).eligible,preset_ids:D.preset_ids,repeats:D.repeats,reviewer_mode:D.reviewer_mode,reviewer:D.reviewer})}async function F(){if(!(!r||D.submitting||!q())){D.submitting=!0,D.error=null,be();try{let L=await r("bench-run-create",{source_id:D.source_id,preset_ids:[...D.preset_ids],repeats:D.repeats,reviewer_mode:D.reviewer_mode,...D.reviewer_mode==="fixed"?{reviewer:D.reviewer}:{}}),ee=L&&L.payload?L.payload:L,Re=ee&&ee.run&&typeof ee.run.run_id=="string"?ee.run.run_id:null;D.open=!1,D.error=null,await H(),Re!==null&&O(Re)}catch(L){n("bench-run-create failed: %o",L),D.error=la(L)}finally{D.submitting=!1,be()}}}function z(L){if(!s||L.length===0)return null;for(let ee of s())if(ee&&ee.id===L)return ee;return null}function B(L,ee){l[L]=ee,ne()}function N(L){u.has(L)?u.delete(L):u.add(L),be()}function V(L,ee,Re,I){return c`
      <label class="cmp-filter">
        <span class="cmp-filter__label">${L}</span>
        <select
          class="cmp-filter__select"
          .value=${ee}
          @change=${ae=>I(ae.target.value)}
        >
          ${Re.map(ae=>c`<option
                value=${ae.value}
                ?selected=${ae.value===ee}
              >
                ${ae.label}
              </option>`)}
        </select>
      </label>
    `}function W(){let L=[{value:"",label:"\uC804\uCCB4 \uC800\uC7A5\uC18C"},...a.workspaces.map(ee=>({value:ee.root_dir,label:ee.name}))];return c`
      <div class="cmp-filters">
        ${V("\uAE30\uAC04",l.range,ai.map(ee=>({value:ee.value,label:ee.label})),ee=>B("range",ee))}
        ${V("\uC800\uC7A5\uC18C",l.root_dir,L,ee=>B("root_dir",ee))}
        ${V("\uC720\uD615",l.issue_type,[{value:"",label:"\uC804\uCCB4 \uC720\uD615"},...vi.map(ee=>({value:ee,label:ee}))],ee=>B("issue_type",ee))}
        ${V("route",l.route,[{value:"",label:"\uC804\uCCB4 route"},...ro.filter(ee=>ee.value!=="unset").map(ee=>({value:ee.value,label:ee.label}))],ee=>B("route",ee))}
        <label class="cmp-filter cmp-filter--check">
          <input
            type="checkbox"
            .checked=${l.include_bench}
            @change=${ee=>{l.include_bench=ee.target.checked,ne()}}
          />
          <span>bench 실험 포함</span>
        </label>
        <button
          type="button"
          class="op-btn cmp-refresh"
          ?disabled=${d}
          @click=${()=>{ne()}}
        >
          새로고침
        </button>
      </div>
    `}function oe(L){let ee=Jl(L.success_rate),Re=typeof L.unknown_count=="number"&&L.unknown_count>0?c`<span class="cmp-note">미상 ${L.unknown_count}</span>`:null,I=L.pass_caret?c`<span class="cmp-note"
          >pass^${L.pass_caret.k}
          ${Jl(L.pass_caret.value)}</span
        >`:null,ae=typeof L.success_sample=="number"&&L.success_sample!==L.n?c`<span class="cmp-note"
            >n=${L.success_sample}/${L.n}</span
          >`:null;return c`${ee} ${ae} ${I} ${Re}`}function fe(L,ee){let Re=Wp(L);return c`${ee(L?.median)}
    ${Re?c`<span class="cmp-note">${Re}</span>`:null}`}function Pe(L){let ee=$o(L.usage||null).join(`
`);return c`
      <tr
        class="cmp-row cmp-row--attempt"
        @click=${()=>o&&o(L.bead_id)}
      >
        <td class="cmp-cell cmp-cell--issue">
          <span class="cmp-issue-id">${L.bead_id}</span>
          <span class="cmp-issue-title">${L.title||""}</span>
          <span class="cmp-note">${L.workspace_name}</span>
        </td>
        <td class="cmp-cell">${ca(L.duration_ms)}</td>
        <td class="cmp-cell">${zp(L)}</td>
        <td class="cmp-cell">${Hp(L.verify)}</td>
        <td class="cmp-cell">${Kp(L.review)}</td>
        <td class="cmp-cell">${ua(L.usage?.tokens)}</td>
        <td class="cmp-cell" title=${ee}>${Up(L.usage)}</td>
        <td class="cmp-cell cmp-cell--time">
          ${L.finished_at?Xt(L.finished_at):on}
        </td>
      </tr>
    `}function G(L){let ee=u.has(L.key),Re=new Set(L.attempt_ids||[]),I=ee?a.rows.filter(ae=>Re.has(ae.attempt_id)):[];return c`
      <tr
        class="cmp-row cmp-row--group ${ee?"is-open":""}"
        @click=${()=>N(L.key)}
      >
        <td class="cmp-cell cmp-cell--name">
          <span class="cmp-caret" aria-hidden="true">${ee?"\u25BE":"\u25B8"}</span>
          <span class="cmp-group-name">${L.name}</span>
          <span class="cmp-note">${L.n}건</span>
        </td>
        <td class="cmp-cell">
          ${fe(L.duration_ms,ca)}
        </td>
        <td class="cmp-cell">
          실패 ${L.failed_count} · 재시도 ${L.retry_count}
        </td>
        <td class="cmp-cell">${oe(L)}</td>
        <td class="cmp-cell">
          ${fe(L.blocking,ae=>typeof ae=="number"?`b${ae}`:on)}
          ${fe(L.minor,ae=>typeof ae=="number"?`m${ae}`:on)}
          ${fe(L.round,ae=>typeof ae=="number"?`r${ae}`:on)}
        </td>
        <td class="cmp-cell">${fe(L.tokens,ua)}</td>
        <td class="cmp-cell">
          ${fe(L.cost_usd,Zl)}
        </td>
        <td class="cmp-cell cmp-cell--time"></td>
      </tr>
      ${I.map(ae=>Pe(ae))}
    `}function se(L){let ee=m.selected===L.run_id,Re=z(String(L.source_bead_id||"")),I=Re&&typeof Re.title=="string"&&Re.title.length>0?Re.title:String(L.source_bead_id||""),ae=Fp(L),le=Array.isArray(L.presets)?L.presets.length:0;return c`
      <button
        type="button"
        class="cmp-run ${ee?"is-selected":""}"
        data-run-id=${L.run_id}
        @click=${()=>O(String(L.run_id))}
      >
        <span class="cmp-run__title">${I}</span>
        <span class="cmp-note">프리셋 ${le}</span>
        <span class="cmp-note">반복 ${L.repeats??on}</span>
        <span class="cmp-note"
          >${typeof L.created_at=="number"?Xt(L.created_at):on}</span
        >
        <span class="cmp-run__progress"
          >${ae===null?on:ae.text}</span
        >
      </button>
    `}function _e(L){let ee=R.has(L.key);return c`
      <tr
        class="cmp-row cmp-row--group ${ee?"is-open":""}"
        @click=${()=>{R.has(L.key)?R.delete(L.key):R.add(L.key),be()}}
      >
        <td class="cmp-cell cmp-cell--name">
          <span class="cmp-caret" aria-hidden="true">${ee?"\u25BE":"\u25B8"}</span>
          <span class="cmp-group-name">${L.name}</span>
          <span class="cmp-note">${L.n}건</span>
        </td>
        <td class="cmp-cell">
          ${fe(L.duration_ms,ca)}
        </td>
        <td class="cmp-cell">
          실패 ${L.failed_count} · 재시도 ${L.retry_count}
        </td>
        <td class="cmp-cell">${oe(L)}</td>
        <td class="cmp-cell">
          ${fe(L.blocking,Re=>typeof Re=="number"?`b${Re}`:on)}
          ${fe(L.minor,Re=>typeof Re=="number"?`m${Re}`:on)}
          ${fe(L.round,Re=>typeof Re=="number"?`r${Re}`:on)}
        </td>
        <td class="cmp-cell">${fe(L.tokens,ua)}</td>
        <td class="cmp-cell">
          ${fe(L.cost_usd,Zl)}
        </td>
        <td class="cmp-cell cmp-cell--time"></td>
      </tr>
      ${ee?(L.rows||[]).map(Re=>Pe(Re)):null}
    `}function Oe(L){let ee=Bp(L,m.rows);return c`
      <div class="cmp-run-detail">
        <div class="cmp-run-detail__head">
          <span class="cmp-run-detail__flag">구현 위임 강제</span>
          <span class="cmp-note"
            >리뷰어
            ${L.reviewer_mode==="preset"?"\uD504\uB9AC\uC14B \uAC12":"\uACE0\uC815"}</span
          >
          <span class="cmp-note"
            >base ${String(L.base_sha||"").slice(0,12)}</span
          >
        </div>
        ${m.rows_error!==null?c`<div class="cmp-error" role="alert">
              <span>실험 결과를 읽지 못했습니다 — ${m.rows_error}</span>
              <button
                type="button"
                class="op-btn"
                @click=${()=>{P(L)}}
              >
                새로고침
              </button>
            </div>`:null}
        ${ee.length===0?c`<div class="cmp-empty">셀이 없습니다</div>`:c`<table class="cmp-table cmp-table--bench">
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
                ${ee.map(Re=>_e(Re))}
              </tbody>
            </table>`}
      </div>
    `}function Q(){let L=i?i.get():null,ee=Array.isArray(L?.presets)?L.presets:[],Re=qp(s?s():[],D.query);return c`
      <form
        class="cmp-form"
        @submit=${I=>{I.preventDefault(),F()}}
      >
        <div class="cmp-form__note">구현 위임 강제</div>
        <label class="cmp-form__field">
          <span class="cmp-form__label">원본 이슈</span>
          <input
            type="text"
            class="cmp-form__input"
            placeholder="제목 또는 ID"
            .value=${D.query}
            @input=${I=>{D.query=String(I.target.value||""),be()}}
          />
        </label>
        <div class="cmp-form__candidates">
          ${Re.length===0?c`<div class="cmp-empty">후보 없음</div>`:Re.map(I=>c`
                  <button
                    type="button"
                    class="cmp-candidate ${D.source_id===I.id?"is-selected":""}"
                    data-source-id=${I.id}
                    ?disabled=${!I.eligible}
                    title=${I.reason}
                    @click=${()=>{D.source_id=I.id,be()}}
                  >
                    <span class="cmp-candidate__id">${I.id}</span>
                    <span class="cmp-candidate__title">${I.title}</span>
                    ${I.eligible?null:c`<span class="cmp-candidate__reason"
                          >${I.reason}</span
                        >`}
                  </button>
                `)}
        </div>
        <div class="cmp-form__field">
          <span class="cmp-form__label">프리셋</span>
          <div class="cmp-form__presets">
            ${ee.length===0?c`<div class="cmp-empty">프리셋 없음</div>`:ee.map(I=>c`
                    <label class="cmp-form__preset">
                      <input
                        type="checkbox"
                        data-preset-id=${I.id}
                        .checked=${D.preset_ids.includes(I.id)}
                        @change=${ae=>{let le=ae.target.checked;D.preset_ids=le?[...D.preset_ids,I.id]:D.preset_ids.filter(Y=>Y!==I.id),be()}}
                      />
                      <span>${I.name}</span>
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
            .value=${String(D.repeats)}
            @change=${I=>{let ae=I.target;D.repeats=Ql(ae.value),ae.value=String(D.repeats),be()}}
          />
        </label>
        <div class="cmp-form__field">
          <span class="cmp-form__label">리뷰어</span>
          <div class="cmp-form__reviewer-mode">
            ${[{value:"fixed",label:"\uACE0\uC815"},{value:"preset",label:"\uD504\uB9AC\uC14B \uAC12"}].map(I=>c`
                <label class="cmp-form__radio">
                  <input
                    type="radio"
                    name="cmp-reviewer-mode"
                    value=${I.value}
                    .checked=${D.reviewer_mode===I.value}
                    @change=${()=>{D.reviewer_mode=I.value,be()}}
                  />
                  <span>${I.label}</span>
                </label>
              `)}
          </div>
        </div>
        ${D.reviewer_mode==="fixed"?c`<div class="cmp-form__reviewer">
              ${ia.map(I=>c`
                  <label class="cmp-form__field">
                    <span class="cmp-form__label">${I}</span>
                    <input
                      type="text"
                      class="cmp-form__input"
                      data-reviewer-key=${I}
                      .value=${D.reviewer[I]||""}
                      @input=${ae=>{D.reviewer={...D.reviewer,[I]:String(ae.target.value||"")}}}
                    />
                  </label>
                `)}
            </div>`:null}
        ${D.error!==null?c`<div class="cmp-error" role="alert">${D.error}</div>`:null}
        <div class="cmp-form__actions">
          <button
            type="submit"
            class="op-btn"
            ?disabled=${D.submitting||!q()}
          >
            실험 시작
          </button>
          <button
            type="button"
            class="op-btn"
            @click=${()=>{D.open=!1,D.error=null,be()}}
          >
            취소
          </button>
        </div>
      </form>
    `}function ce(){let L=m.selected===null?null:m.runs.find(ee=>ee.run_id===m.selected)??null;return c`
      <section class="cmp-bench">
        <div class="cmp-bench__head">
          <h3 class="cmp-bench__title">실험</h3>
          <button
            type="button"
            class="op-btn cmp-bench__new"
            @click=${()=>{D.open=!D.open,D.open&&(D.error=null,D.reviewer=aa(m.runs)),be()}}
          >
            새 실험
          </button>
        </div>
        ${D.open?Q():null}
        ${m.error!==null?c`<div class="cmp-error" role="alert">
              <span>실험 목록을 읽지 못했습니다 — ${m.error}</span>
              <button
                type="button"
                class="op-btn"
                @click=${()=>{H()}}
              >
                새로고침
              </button>
            </div>`:null}
        ${m.runs.length===0&&m.error===null?c`<div class="cmp-empty">
              ${m.loading?"\uC77D\uB294 \uC911\u2026":"\uC2E4\uD5D8 \uC5C6\uC74C"}
            </div>`:c`<div class="cmp-runs">
              ${m.runs.map(ee=>se(ee))}
            </div>`}
        ${L===null?null:Oe(L)}
      </section>
    `}function J(){return f!==null?c`
        <div class="cmp-error" role="alert">
          <span>비교 데이터를 읽지 못했습니다 — ${f}</span>
          <button
            type="button"
            class="op-btn"
            @click=${()=>{ne()}}
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
          ${a.groups.map(L=>G(L))}
        </tbody>
      </table>
    `:c`<div class="cmp-empty">${d?"\uC77D\uB294 \uC911\u2026":""}</div>`}function Se(){return c`
      <div class="cmp">
        <header class="cmp-head">
          <h2 class="cmp-title">프리셋 실사용 비교</h2>
          ${W()}
        </header>
        ${ce()} ${J()}
      </div>
    `}function be(){lt(Se(),e)}let me=null;return i&&i.subscribe&&(me=i.subscribe(()=>{D.open&&be()})),be(),{load(){!_&&!d&&ne(),m.loading||H()},pause(){k+=1,d=!1},refresh(){return ne()},refreshRuns(){return H()},destroy(){me&&(me(),me=null),lt(c``,e)}}}function Gb(e,t=document){let n=t.createElement("dialog");n.className="op-dialog continuation-dialog";let r=t.createElement("button"),o=t.createElement("button"),i=t.createElement("button"),s=t.createElement("h2"),l=t.createElement("p"),a=t.createElement("div");return a.className="op-dialog__actions",s.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",l.textContent=`${On(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${On(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,r.type="button",r.className="op-btn",r.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",r.disabled=e.prior_available===!1,o.type="button",o.className="op-btn",o.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",i.type="button",i.className="op-btn",i.textContent="\uCDE8\uC18C",a.append(r,o,i),n.append(s,l,a),t.body.append(n),new Promise(u=>{let d=f=>{typeof n.close=="function"&&n.close(),n.remove(),u(f)};r.addEventListener("click",()=>d("prior_session")),o.addEventListener("click",()=>d("fresh_current")),i.addEventListener("click",()=>d(null)),n.addEventListener("cancel",f=>{f.preventDefault(),d(null)}),typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")})}async function Cr(e,t,n={}){let r=e;for(n.onResult?.(r);r?.continuation_mismatch;){let o=r.continuation_mismatch,i=await Gb(o);if(i===null)return r;r=await t(i,o.decision_token),n.onResult?.(r),r?.conflict&&n.refresh&&(r=await n.refresh(r),n.onResult?.(r))}return r}function Vp(e,t=document){let n=e?.kind==="settlement",r=t.createElement("dialog");r.className="op-dialog resume-instructions-dialog";let o=t.createElement("h2"),i=t.createElement("textarea"),s=t.createElement("div"),l=t.createElement("button"),a=t.createElement("button"),u=[e?.bead_id,e?.tuple].filter(d=>typeof d=="string"&&d!=="").join(" \xB7 ");if(o.textContent=n?"\uCC29\uC9C0 \uC815\uC0B0 \uC7AC\uAC1C":"\uC138\uC158 \uC774\uC5B4\uD558\uAE30",i.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",i.maxLength=4e3,s.className="op-dialog__actions resume-instructions-dialog__actions",l.type="button",l.className="op-btn op-btn--primary",l.textContent=n?"\uC815\uC0B0 \uC7AC\uAC1C":"\uC774\uC5B4\uD558\uAE30",a.type="button",a.className="op-btn",a.textContent="\uCDE8\uC18C",s.append(l,a),r.append(o),u!==""){let d=t.createElement("p");d.className="resume-instructions-dialog__target",d.textContent=u,r.append(d)}return r.append(i,s),t.body.append(r),new Promise(d=>{let f=!1,_=m=>{f||(f=!0,typeof r.close=="function"&&r.close(),r.remove(),d(m))},k=()=>_(i.value.trim());l.addEventListener("click",k),a.addEventListener("click",()=>_(null)),i.addEventListener("keydown",m=>{m.key==="Enter"&&(m.ctrlKey||m.metaKey)&&(m.preventDefault(),k())}),r.addEventListener("cancel",m=>{m.preventDefault(),_(null)}),typeof r.showModal=="function"?r.showModal():r.setAttribute("open",""),i.focus()})}async function jo(e){let{context:t,transport:n,adopt:r}=e,o=await Vp(t);if(o===null)return null;let i=o===""?{}:{instructions:o},s=await n({...i});if(r?.(s),s&&s.conflict&&(s=await n({...i}),r?.(s)),s=await Cr(s,(l,a)=>n({...i,continuation:l,decision_token:a}),{onResult:r,refresh:()=>n({...i})}),s&&s.resumed===!1&&!s.conflict&&s.reason){let l=t?.kind==="settlement"?"\uC815\uC0B0 \uC7AC\uAC1C":"\uC774\uC5B4\uD558\uAE30";ve(`${l} \uAC70\uBD80: ${s.reason}`,"error",2400)}return s}function ec(e){return`session:${e.provider}:${e.session_id}`}function Es(e){return`${e.provider} \xB7 ${e.session_id.slice(0,8)}`}function Vb(e,t){return e.current&&t==="in_progress"&&e.locality==="local"?"running":"done"}function Fo(e,t,n,r){return{attempt_id:ec(e),session_ref:{bead_id:t,provider:e.provider,session_id:e.session_id},...typeof r=="string"&&r.length>0?{root_dir:r}:{},hide_prompt:!0,meta:{runner:e.provider,label:Es(e),session_id:e.session_id,...typeof e.resume_command=="string"&&e.resume_command.length>0?{resume_command:e.resume_command}:{},status:Vb(e,n)}}}function Yp(e,t){let n=new Map(e.map((a,u)=>[a,u])),r=new Map(e.map(a=>[a,new Set]));for(let a of t)a.blocker!==a.blockee&&n.has(a.blocker)&&n.has(a.blockee)&&r.get(a.blockee).add(a.blocker);let o=new Set,i=[];for(;i.length<e.length;){let a=e.find(u=>{if(o.has(u))return!1;for(let d of r.get(u))if(!o.has(d))return!1;return!0});if(a===void 0)return{order:[...e],corrections:[],cycle:!0};o.add(a),i.push(a)}let s=[],l=new Map(i.map((a,u)=>[a,u]));for(let a of i){let u=null;for(let d of r.get(a)){let f=Number(n.get(a))<Number(n.get(d)),_=Number(l.get(a))>Number(l.get(d));f&&_&&(u===null||Number(l.get(d))>Number(l.get(u)))&&(u=d)}u!==null&&s.push({bead_id:a,after:u})}return{order:i,corrections:s,cycle:!1}}var Yb="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",da="\uC758\uC874 \uC790\uB8CC \uBBF8\uD655\uC815 \u2014 \uAD50\uC815 \uBCF4\uB958",Qb="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694",Xb="\uC774\uBBF8 \uC9C4\uD589 \uC911\uC778 \uC774\uC288 \uC55E\uC5D0\uB294 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",Bo="\uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";function Ts(e,t){return`${e}\0${t}`}function Zb(e,t){let n=new Set(e),r=new Map;for(let o of e){let i=t.placed_members.has(o)?t.snapshot_blocked_by:t.runnable_blocked_by,s=i instanceof Map?i.get(o):void 0;if(!Array.isArray(s))return null;r.set(o,s.filter(l=>l!==o&&n.has(l)))}return r}function Jb(e,t){if(e.status!=="confirmed")return 0;let n=-1;return e.entries.forEach((r,o)=>{t.fixed_members.has(r.bead_id)&&(n=o)}),n+1}function Os(e,t){let n=e.entries,r=n.map(f=>f.bead_id),o=Zb(r,t);if(o===null)return{entries:n,corrections:[],cycle:!1,held:!0,mismatched:[]};let i=[];for(let[f,_]of o)for(let k of _)i.push({blocker:k,blockee:f});let s=Jb(e,t),l=new Map(r.map((f,_)=>[f,_])),a=r.slice(0,s).filter(f=>o.get(f).some(_=>Number(l.get(_))>Number(l.get(f)))),u=Yp(r.slice(s),i);if(u.cycle)return{entries:n,corrections:[],cycle:!0,held:!1,mismatched:a};let d=new Map(n.map(f=>[f.bead_id,f]));return{entries:[...n.slice(0,s),...u.order.map(f=>d.get(f))],corrections:u.corrections,cycle:!1,held:!1,mismatched:a}}function Xp(e,t){let n=t.cross_lanes.get(e);return n===void 0?null:Os(n,t)}function ey(e,t){if(!(t.corrections.length===0&&!t.cycle&&!t.held&&t.mismatched.length===0))return{lane_id:e,corrected:t.corrections.length,cycle:t.cycle,held:t.held,mismatched:t.mismatched}}function ty(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function ny(e){let t=new Map;for(let[n,r]of e)t.set(n,r.slice());return t}function tc(e,t,n){let r=new Set([t]),o=[t];for(;o.length>0;){let i=o.pop();for(let s of e.get(i)||[]){if(s===n)return!0;r.has(s)||(r.add(s),o.push(s))}}return!1}function ry(e,t){let n=new Set;for(let[s,l]of t)for(let a of l)n.add(Ts(s,a));let r=new Map,o=new Map;for(let s of e){let l=Ts(s.a,s.b);r.set(l,s),o.set(l,s.type==="dep-add")}let i=[];for(let s of e){let l=Ts(s.a,s.b);r.get(l)===s&&o.get(l)!==n.has(l)&&i.push(s)}return i}function oy(e,t,n){let r=e.parallel_rows,o=Math.max(0,Math.min(r.length,n)),i=r[o];if(i&&i.root_dir===t)return i.queue_index;for(let s=o-1;s>=0;s--)if(r[s].root_dir===t)return r[s].queue_index+1;for(let s=o;s<r.length;s++)if(r[s].root_dir===t)return r[s].queue_index;return e.parallel_raw_length.get(t)??0}function sy(e,t){return e.parallel_rows.some(n=>n.root_dir===t)}function Qp(e,t,n,r){return{type:"worker-queue-place",payload:{bead_id:e,...r?{lane:r}:{},index:n},root_dir:t}}function nc(e,t){let n=0;for(let r of e.cross_lanes.keys())if(n+=1,r===t)return n;return n+1}function Is(e){let t=ny(e.blocked_by_map),n=[],r=new Set,o={refusal:null},i=u=>{let d=e.owner_of.get(u);return typeof d!="string"||d.length===0?(o.refusal=ty(u),null):d};return{graph:t,dep_ops:n,state:o,ownerOf:i,addDep:(u,d,f)=>{if(o.refusal!==null||u===d)return;let _=t.get(u)||[];if(_.includes(d))return;let k=i(u);if(k!==null){if(tc(t,d,u)){o.refusal=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${u}\uAC00 \uC774\uBBF8 ${d}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}t.set(u,[..._,d]),f!==void 0&&r.add(Ts(u,d)),n.push({type:"dep-add",a:u,b:d,root_dir:k,...f===void 0?{}:{lane_id:f}})}},removeDep:(u,d)=>{if(o.refusal!==null||u===d)return;let f=t.get(u)||[];if(!f.includes(d))return;let _=i(u);_!==null&&(t.set(u,f.filter(k=>k!==d)),n.push({type:"dep-remove",a:u,b:d,root_dir:_}))},laneCreated:(u,d)=>r.has(Ts(u,d))}}function Ls(e,t,n,r,o={}){if(e.state.refusal!==null)return{refused:e.state.refusal};let i=ry(e.dep_ops,t.blocked_by_map),s=i.filter(d=>d.type==="dep-remove"),l=i.filter(d=>d.type==="dep-add"),a=o.disarm_ops??[],u=o.lane_id===void 0||o.correction===void 0?void 0:ey(o.lane_id,o.correction);return{lane_ops:n,ops:[...s,...a,...l,...r],lane_op_index:s.length+a.length,...u===void 0?{}:{correction:u}}}function Zp(e,t,n){for(let r=1;r<t.length;r+=1)e.addDep(t[r].bead_id,t[r-1].bead_id,n)}function Rs(e,t){return t>0&&e.entries[t]?.dep_created_by_lane===!0}function Jp(e,t,n,r){if(t.status!=="confirmed")return[];let o=[],i=new Map;for(let s of r){let l=e.owner_of.get(s.bead_id)||s.root_dir;typeof l!="string"||l.length===0||i.set(l,[...i.get(l)||[],s.bead_id])}for(let[s,l]of i)o.push({type:"worker-queue-disarm",payload:{bead_ids:l,lane_id:n},root_dir:s});return o}function Cs(e){return e.map(t=>({bead_id:t.bead_id,root_dir:t.root_dir}))}function pa(e,t){return e.length===t.length&&e.every((n,r)=>n.bead_id===t[r].bead_id&&n.root_dir===t[r].root_dir)}function fa(e,t,n){let r=Is(n),o=[],i=[],s=[],l,a=n.owner_lane_of.get(e.bead_id),u=e.kind==="chain"?e.lane_id??a:void 0,d=u===void 0?void 0:n.cross_lanes.get(u);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:Yb};if(t.kind==="chain"){if(e.kind==="repo-serial")return{refused:Qb};if(e.kind!=="chain"&&typeof a=="string"&&a!==t.lane_id&&n.cross_lanes.has(a))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${nc(n,a)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`};if(!n.cross_lanes.has(t.lane_id))return{refused:Bo}}if(e.kind==="chain"&&d===void 0)return{refused:Bo};let f=()=>{if(d===void 0||d.status!=="confirmed")return;let m=d.entries.findIndex(H=>H.bead_id===e.bead_id);if(m<0)return;let R=m>0?d.entries[m-1]:null,T=m+1<d.entries.length?d.entries[m+1]:null,D=Rs(d,m),ne=T!==null&&Rs(d,m+1);D&&R!==null&&r.removeDep(e.bead_id,R.bead_id),ne&&T!==null&&r.removeDep(T.bead_id,e.bead_id),(D||ne)&&R!==null&&T!==null&&r.addDep(T.bead_id,R.bead_id,u)},_=(m,R)=>{let T=n.cross_lanes.get(m),D=T.entries.findIndex(N=>N.bead_id===e.bead_id),ne=T.entries.filter(N=>N.bead_id!==e.bead_id),H=Math.max(0,Math.min(ne.length,D>=0&&R>D?R-1:R)),P=-1;if(ne.forEach((N,V)=>{n.fixed_members.has(N.bead_id)&&(P=V)}),H<=P){r.state.refusal=Xb;return}let O=D>=0?T.entries[D]:d?.entries.find(N=>N.bead_id===e.bead_id)??{bead_id:e.bead_id,root_dir:e.root_dir};l=Os({status:T.status,entries:[...ne.slice(0,H),O,...ne.slice(H)]},n);let q=l.entries;if(pa(q,T.entries)||o.push({type:"monitor-lane-update",payload:{lane_id:m,entries:Cs(q)}}),T.status!=="confirmed")return;let F=q.findIndex(N=>N.bead_id===e.bead_id),z=F>0?q[F-1].bead_id:null,B=F+1<q.length?q[F+1].bead_id:null;if(z===null){B!==null&&r.addDep(B,e.bead_id,m);return}if(r.addDep(e.bead_id,z,m),B!==null&&(r.graph.get(B)||[]).includes(z)){let N=T.entries.findIndex(V=>V.bead_id===B);(r.laneCreated(B,z)||N>0&&T.entries[N-1].bead_id===z&&Rs(T,N))&&r.removeDep(B,z),r.addDep(B,e.bead_id,m)}},k=typeof e.queue_index=="number"?e.queue_index:n.queue_index_of.get(e.bead_id);if(e.kind==="chain"&&(f(),d!==void 0&&(t.kind!=="chain"||t.lane_id!==u))){let m=d.entries.filter(T=>T.bead_id!==e.bead_id),R=d.status==="confirmed"&&m.length<2?d.entries:d.entries.filter(T=>T.bead_id===e.bead_id);s.push(...Jp(n,d,u,R)),o.push({type:"monitor-lane-update",payload:{lane_id:u,entries:Cs(m)}})}if(t.kind==="chain"&&_(t.lane_id,t.marker_index),r.state.refusal!==null)return{refused:r.state.refusal};if(t.kind==="candidate")e.kind!=="candidate"&&i.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let m=oy(n,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")i.push(Qp(e.bead_id,e.root_dir,m));else if(e.kind==="parallel"){let R=n.parallel_rows,T=R[Math.max(0,Math.min(R.length,t.marker_index))];if(!(!!T&&T.bead_id===e.bead_id)&&sy(n,e.root_dir)&&k!==void 0){let ne=k>m?m:m-1;ne>=0&&ne!==k&&i.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:ne},root_dir:e.root_dir})}}}else if(t.kind!=="chain")if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(k!==void 0&&t.index!==k){let m=k>t.index?t.index:t.index-1;m>=0&&m!==k&&i.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:m},root_dir:e.root_dir})}}else i.push(Qp(e.bead_id,e.root_dir,t.index,t.lane_id));return Ls(r,n,o,i,{disarm_ops:s,...t.kind==="chain"?{lane_id:t.lane_id,correction:l}:{}})}function ef(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Bo};if(n.entries.length<2)return{refused:"\uD655\uC815\uD558\uB824\uBA74 \uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4"};let r=Os(n,t);if(r.held)return{refused:da};let o=r.entries,i=Is(t),s=[];Zp(i,o,e);let l=pa(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Cs(o)}}];return l.push({type:"monitor-lane-confirm",payload:{lane_id:e}}),Ls(i,t,l,s,{lane_id:e,correction:r})}function tf(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Bo};let r=Os(n,t),o=r.entries,i=Is(t),s=[];Zp(i,o,e);let l=pa(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Cs(o)}}];return Ls(i,t,l,s,{lane_id:e,correction:r})}function nf(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Bo};let r=Os(n,t),o=r.entries;return Ls(Is(t),t,pa(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Cs(o)}}],[],{lane_id:e,correction:r})}function rf(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Bo};let r=Is(t);if(n.status==="confirmed")for(let o=1;o<n.entries.length;o+=1)Rs(n,o)&&r.removeDep(n.entries[o].bead_id,n.entries[o-1].bead_id);return Ls(r,t,[{type:"monitor-lane-remove",payload:{lane_id:e}}],[],{disarm_ops:Jp(t,n,e,n.entries)})}function of(e,t){let n=t.cross_lanes.get(e);if(n===void 0||n.status!=="confirmed")return null;let r=[],o=[];for(let s=1;s<n.entries.length;s+=1){let l=`  ${n.entries[s].bead_id} \u2190 ${n.entries[s-1].bead_id}`;Rs(n,s)?r.push(l):o.push(`${l} (\uB808\uC778\uC774 \uB9CC\uB4E4\uC9C0 \uC54A\uC74C)`)}let i=`\uC5F0\uACB0 ${nc(t,e)}\uC744 \uC9C0\uC6C1\uB2C8\uB2E4.`;return r.length===0?`${i}
\uC758\uC874\uC740 \uADF8\uB300\uB85C \uB461\uB2C8\uB2E4`:[i,"\uD568\uAED8 \uC81C\uAC70\uD560 \uC758\uC874:",...r,...o.length===0?[]:["\uADF8\uB300\uB85C \uB450\uB294 \uC758\uC874:",...o]].join(`
`)}function sf(e){let t=new Map;for(let n of e)n.type!=="dep-add"||typeof n.lane_id!="string"||t.set(n.lane_id,[...t.get(n.lane_id)||[],{bead_id:n.a,after:n.b}]);return[...t].map(([n,r])=>({lane_id:n,pairs:r}))}function af(e,t){let n=new Map(e.map((r,o)=>[r.bead_id,o]));return t.filter(r=>{let o=n.get(r.bead_id);return o!==void 0&&o>0&&e[o-1].bead_id===r.after})}function rc(e,t){if(e!==null){let n=t.owner_lane_of.get(e.bead_id);if(typeof n=="string"&&t.cross_lanes.has(n))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${nc(t,n)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`}}return{lane_ops:[{type:"monitor-lane-create",payload:{entries:e===null?[]:[e]}}],ops:[],lane_op_index:0}}var iy="\uC0AC\uC774\uD074";function ay(e){let t=new Map,n=r=>Array.isArray(r)?r.filter(o=>typeof o=="string"&&o.length>0):[];for(let r of Array.isArray(e)?e:[]){if(!r||typeof r!="object")continue;let o=r.bead_blocked_by&&typeof r.bead_blocked_by=="object"?r.bead_blocked_by:{};for(let[i,s]of Object.entries(o))Array.isArray(s)&&t.set(i,n(s));for(let i of[...Array.isArray(r.runnable)?r.runnable:[],...Array.isArray(r.session_active)?r.session_active:[]])i&&typeof i.bead_id=="string"&&Array.isArray(i.blocked_by)&&i.blocked_by.length>0&&t.set(i.bead_id,n(i.blocked_by))}return t}function oc(e,t,n){let r=Tr(e,t),o=[],i=new Set,s=(a,u)=>{for(let d of a)i.has(d.id)||(i.add(d.id),o.push({bead_id:d.id,root_dir:d.root_dir,workspace_name:d.workspace_name,title:d.title,lane:u}))};s(r.running,"running"),s(r.pr_wait,"pr_wait"),s(r.queue,"queue"),s(r.runnable_all,"runnable");let l=n&&typeof n.root_dir=="string"&&n.root_dir.length?n.root_dir:null;return{issues:l===null?o:o.filter(a=>a.root_dir===l),blocked_by_map:ay(e)}}function lf(e,t){let n=new Map;for(let s of t.issues)!s||typeof s.bead_id!="string"||s.bead_id.length===0||n.has(s.bead_id)||n.set(s.bead_id,s);let r=n.get(e)?.root_dir,o=t.blocked_by_map.get(e)||[],i=[];for(let s of n.values()){if(s.bead_id===e||s.lane==="done"||o.includes(s.bead_id))continue;let l=tc(t.blocked_by_map,s.bead_id,e);i.push({...s,disabled:l,...l?{reason:iy}:{}})}return i.sort((s,l)=>{let a=r!==void 0&&s.root_dir===r,u=r!==void 0&&l.root_dir===r;return a!==u?a?-1:1:s.bead_id.localeCompare(l.bead_id)}),i}function cf(e,t){let n=t.trim().toLowerCase();return n.length===0?e.slice():e.filter(r=>r.bead_id.toLowerCase().includes(n)||r.title.toLowerCase().includes(n))}var ly=/^\S+-\S+$/;function uf(e){return ly.test(e.trim())}var{entries:yf,setPrototypeOf:df,isFrozen:cy,getPrototypeOf:uy,getOwnPropertyDescriptor:dy}=Object,{freeze:$n,seal:Mn,create:dc}=Object,{apply:pc,construct:fc}=typeof Reflect<"u"&&Reflect;$n||($n=function(t){return t});Mn||(Mn=function(t){return t});pc||(pc=function(t,n){for(var r=arguments.length,o=new Array(r>2?r-2:0),i=2;i<r;i++)o[i-2]=arguments[i];return t.apply(n,o)});fc||(fc=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return new t(...r)});var _a=xn(Array.prototype.forEach),py=xn(Array.prototype.lastIndexOf),pf=xn(Array.prototype.pop),Ps=xn(Array.prototype.push),fy=xn(Array.prototype.splice),ga=xn(String.prototype.toLowerCase),sc=xn(String.prototype.toString),ic=xn(String.prototype.match),Ds=xn(String.prototype.replace),_y=xn(String.prototype.indexOf),my=xn(String.prototype.trim),Wn=xn(Object.prototype.hasOwnProperty),wn=xn(RegExp.prototype.test),Ms=gy(TypeError);function xn(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return pc(e,t,r)}}function gy(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return fc(e,n)}}function At(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:ga;df&&df(e,null);let r=t.length;for(;r--;){let o=t[r];if(typeof o=="string"){let i=n(o);i!==o&&(cy(t)||(t[r]=i),o=i)}e[o]=!0}return e}function hy(e){for(let t=0;t<e.length;t++)Wn(e,t)||(e[t]=null);return e}function fr(e){let t=dc(null);for(let[n,r]of yf(e))Wn(e,n)&&(Array.isArray(r)?t[n]=hy(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=fr(r):t[n]=r);return t}function Ns(e,t){for(;e!==null;){let r=dy(e,t);if(r){if(r.get)return xn(r.get);if(typeof r.value=="function")return xn(r.value)}e=uy(e)}function n(){return null}return n}var ff=$n(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),ac=$n(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),lc=$n(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),by=$n(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),cc=$n(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),yy=$n(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),_f=$n(["#text"]),mf=$n(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),uc=$n(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),gf=$n(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),ma=$n(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),vy=Mn(/\{\{[\w\W]*|[\w\W]*\}\}/gm),ky=Mn(/<%[\w\W]*|[\w\W]*%>/gm),wy=Mn(/\$\{[\w\W]*/gm),$y=Mn(/^data-[\-\w.\u00B7-\uFFFF]+$/),xy=Mn(/^aria-[\-\w]+$/),vf=Mn(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Ay=Mn(/^(?:\w+script|data):/i),Sy=Mn(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),kf=Mn(/^html$/i),Ey=Mn(/^[a-z][.\w]*(-[.\w]+)+$/i),hf=Object.freeze({__proto__:null,ARIA_ATTR:xy,ATTR_WHITESPACE:Sy,CUSTOM_ELEMENT:Ey,DATA_ATTR:$y,DOCTYPE_NAME:kf,ERB_EXPR:ky,IS_ALLOWED_URI:vf,IS_SCRIPT_OR_DATA:Ay,MUSTACHE_EXPR:vy,TMPLIT_EXPR:wy}),qs={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Ty=function(){return typeof window>"u"?null:window},Ry=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,o="data-tt-policy-suffix";n&&n.hasAttribute(o)&&(r=n.getAttribute(o));let i="dompurify"+(r?"#"+r:"");try{return t.createPolicy(i,{createHTML(s){return s},createScriptURL(s){return s}})}catch{return console.warn("TrustedTypes policy "+i+" could not be created."),null}},bf=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function wf(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Ty(),t=Be=>wf(Be);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==qs.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,o=r.currentScript,{DocumentFragment:i,HTMLTemplateElement:s,Node:l,Element:a,NodeFilter:u,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:f,DOMParser:_,trustedTypes:k}=e,m=a.prototype,R=Ns(m,"cloneNode"),T=Ns(m,"remove"),D=Ns(m,"nextSibling"),ne=Ns(m,"childNodes"),H=Ns(m,"parentNode");if(typeof s=="function"){let Be=n.createElement("template");Be.content&&Be.content.ownerDocument&&(n=Be.content.ownerDocument)}let P,O="",{implementation:q,createNodeIterator:F,createDocumentFragment:z,getElementsByTagName:B}=n,{importNode:N}=r,V=bf();t.isSupported=typeof yf=="function"&&typeof H=="function"&&q&&q.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:W,ERB_EXPR:oe,TMPLIT_EXPR:fe,DATA_ATTR:Pe,ARIA_ATTR:G,IS_SCRIPT_OR_DATA:se,ATTR_WHITESPACE:_e,CUSTOM_ELEMENT:Oe}=hf,{IS_ALLOWED_URI:Q}=hf,ce=null,J=At({},[...ff,...ac,...lc,...cc,..._f]),Se=null,be=At({},[...mf,...uc,...gf,...ma]),me=Object.seal(dc(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),L=null,ee=null,Re=Object.seal(dc(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),I=!0,ae=!0,le=!1,Y=!0,Ae=!1,ge=!0,Le=!1,qe=!1,Ze=!1,ze=!1,ie=!1,Z=!1,Ie=!0,tt=!1,st="user-content-",Qe=!0,ct=!1,$t={},mt=null,Xe=At({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),gt=null,Zt=At({},["audio","video","img","source","image","track"]),A=null,re=At({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Me="http://www.w3.org/1998/Math/MathML",Ce="http://www.w3.org/2000/svg",Fe="http://www.w3.org/1999/xhtml",Ue=Fe,dt=!1,St=null,de=At({},[Me,Ce,Fe],sc),ke=At({},["mi","mo","mn","ms","mtext"]),He=At({},["annotation-xml"]),it=At({},["title","style","font","a","script"]),nt=null,pt=["application/xhtml+xml","text/html"],yt="text/html",et=null,Ne=null,S=n.createElement("form"),U=function(E){return E instanceof RegExp||E instanceof Function},K=function(){let E=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Ne&&Ne===E)){if((!E||typeof E!="object")&&(E={}),E=fr(E),nt=pt.indexOf(E.PARSER_MEDIA_TYPE)===-1?yt:E.PARSER_MEDIA_TYPE,et=nt==="application/xhtml+xml"?sc:ga,ce=Wn(E,"ALLOWED_TAGS")?At({},E.ALLOWED_TAGS,et):J,Se=Wn(E,"ALLOWED_ATTR")?At({},E.ALLOWED_ATTR,et):be,St=Wn(E,"ALLOWED_NAMESPACES")?At({},E.ALLOWED_NAMESPACES,sc):de,A=Wn(E,"ADD_URI_SAFE_ATTR")?At(fr(re),E.ADD_URI_SAFE_ATTR,et):re,gt=Wn(E,"ADD_DATA_URI_TAGS")?At(fr(Zt),E.ADD_DATA_URI_TAGS,et):Zt,mt=Wn(E,"FORBID_CONTENTS")?At({},E.FORBID_CONTENTS,et):Xe,L=Wn(E,"FORBID_TAGS")?At({},E.FORBID_TAGS,et):fr({}),ee=Wn(E,"FORBID_ATTR")?At({},E.FORBID_ATTR,et):fr({}),$t=Wn(E,"USE_PROFILES")?E.USE_PROFILES:!1,I=E.ALLOW_ARIA_ATTR!==!1,ae=E.ALLOW_DATA_ATTR!==!1,le=E.ALLOW_UNKNOWN_PROTOCOLS||!1,Y=E.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Ae=E.SAFE_FOR_TEMPLATES||!1,ge=E.SAFE_FOR_XML!==!1,Le=E.WHOLE_DOCUMENT||!1,ze=E.RETURN_DOM||!1,ie=E.RETURN_DOM_FRAGMENT||!1,Z=E.RETURN_TRUSTED_TYPE||!1,Ze=E.FORCE_BODY||!1,Ie=E.SANITIZE_DOM!==!1,tt=E.SANITIZE_NAMED_PROPS||!1,Qe=E.KEEP_CONTENT!==!1,ct=E.IN_PLACE||!1,Q=E.ALLOWED_URI_REGEXP||vf,Ue=E.NAMESPACE||Fe,ke=E.MATHML_TEXT_INTEGRATION_POINTS||ke,He=E.HTML_INTEGRATION_POINTS||He,me=E.CUSTOM_ELEMENT_HANDLING||{},E.CUSTOM_ELEMENT_HANDLING&&U(E.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(me.tagNameCheck=E.CUSTOM_ELEMENT_HANDLING.tagNameCheck),E.CUSTOM_ELEMENT_HANDLING&&U(E.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(me.attributeNameCheck=E.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),E.CUSTOM_ELEMENT_HANDLING&&typeof E.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(me.allowCustomizedBuiltInElements=E.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Ae&&(ae=!1),ie&&(ze=!0),$t&&(ce=At({},_f),Se=[],$t.html===!0&&(At(ce,ff),At(Se,mf)),$t.svg===!0&&(At(ce,ac),At(Se,uc),At(Se,ma)),$t.svgFilters===!0&&(At(ce,lc),At(Se,uc),At(Se,ma)),$t.mathMl===!0&&(At(ce,cc),At(Se,gf),At(Se,ma))),E.ADD_TAGS&&(typeof E.ADD_TAGS=="function"?Re.tagCheck=E.ADD_TAGS:(ce===J&&(ce=fr(ce)),At(ce,E.ADD_TAGS,et))),E.ADD_ATTR&&(typeof E.ADD_ATTR=="function"?Re.attributeCheck=E.ADD_ATTR:(Se===be&&(Se=fr(Se)),At(Se,E.ADD_ATTR,et))),E.ADD_URI_SAFE_ATTR&&At(A,E.ADD_URI_SAFE_ATTR,et),E.FORBID_CONTENTS&&(mt===Xe&&(mt=fr(mt)),At(mt,E.FORBID_CONTENTS,et)),Qe&&(ce["#text"]=!0),Le&&At(ce,["html","head","body"]),ce.table&&(At(ce,["tbody"]),delete L.tbody),E.TRUSTED_TYPES_POLICY){if(typeof E.TRUSTED_TYPES_POLICY.createHTML!="function")throw Ms('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof E.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Ms('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');P=E.TRUSTED_TYPES_POLICY,O=P.createHTML("")}else P===void 0&&(P=Ry(k,o)),P!==null&&typeof O=="string"&&(O=P.createHTML(""));$n&&$n(E),Ne=E}},we=At({},[...ac,...lc,...by]),Ee=At({},[...cc,...yy]),ft=function(E){let he=H(E);(!he||!he.tagName)&&(he={namespaceURI:Ue,tagName:"template"});let De=ga(E.tagName),ht=ga(he.tagName);return St[E.namespaceURI]?E.namespaceURI===Ce?he.namespaceURI===Fe?De==="svg":he.namespaceURI===Me?De==="svg"&&(ht==="annotation-xml"||ke[ht]):!!we[De]:E.namespaceURI===Me?he.namespaceURI===Fe?De==="math":he.namespaceURI===Ce?De==="math"&&He[ht]:!!Ee[De]:E.namespaceURI===Fe?he.namespaceURI===Ce&&!He[ht]||he.namespaceURI===Me&&!ke[ht]?!1:!Ee[De]&&(it[De]||!we[De]):!!(nt==="application/xhtml+xml"&&St[E.namespaceURI]):!1},vt=function(E){Ps(t.removed,{element:E});try{H(E).removeChild(E)}catch{T(E)}},xt=function(E,he){try{Ps(t.removed,{attribute:he.getAttributeNode(E),from:he})}catch{Ps(t.removed,{attribute:null,from:he})}if(he.removeAttribute(E),E==="is")if(ze||ie)try{vt(he)}catch{}else try{he.setAttribute(E,"")}catch{}},Ct=function(E){let he=null,De=null;if(Ze)E="<remove></remove>"+E;else{let Et=ic(E,/^[\r\n\t ]+/);De=Et&&Et[0]}nt==="application/xhtml+xml"&&Ue===Fe&&(E='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+E+"</body></html>");let ht=P?P.createHTML(E):E;if(Ue===Fe)try{he=new _().parseFromString(ht,nt)}catch{}if(!he||!he.documentElement){he=q.createDocument(Ue,"template",null);try{he.documentElement.innerHTML=dt?O:ht}catch{}}let Ke=he.body||he.documentElement;return E&&De&&Ke.insertBefore(n.createTextNode(De),Ke.childNodes[0]||null),Ue===Fe?B.call(he,Le?"html":"body")[0]:Le?he.documentElement:Ke},qt=function(E){return F.call(E.ownerDocument||E,E,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},Kt=function(E){return E instanceof f&&(typeof E.nodeName!="string"||typeof E.textContent!="string"||typeof E.removeChild!="function"||!(E.attributes instanceof d)||typeof E.removeAttribute!="function"||typeof E.setAttribute!="function"||typeof E.namespaceURI!="string"||typeof E.insertBefore!="function"||typeof E.hasChildNodes!="function")},en=function(E){return typeof l=="function"&&E instanceof l};function kt(Be,E,he){_a(Be,De=>{De.call(t,E,he,Ne)})}let an=function(E){let he=null;if(kt(V.beforeSanitizeElements,E,null),Kt(E))return vt(E),!0;let De=et(E.nodeName);if(kt(V.uponSanitizeElement,E,{tagName:De,allowedTags:ce}),ge&&E.hasChildNodes()&&!en(E.firstElementChild)&&wn(/<[/\w!]/g,E.innerHTML)&&wn(/<[/\w!]/g,E.textContent)||E.nodeType===qs.progressingInstruction||ge&&E.nodeType===qs.comment&&wn(/<[/\w]/g,E.data))return vt(E),!0;if(!(Re.tagCheck instanceof Function&&Re.tagCheck(De))&&(!ce[De]||L[De])){if(!L[De]&&Lt(De)&&(me.tagNameCheck instanceof RegExp&&wn(me.tagNameCheck,De)||me.tagNameCheck instanceof Function&&me.tagNameCheck(De)))return!1;if(Qe&&!mt[De]){let ht=H(E)||E.parentNode,Ke=ne(E)||E.childNodes;if(Ke&&ht){let Et=Ke.length;for(let Pt=Et-1;Pt>=0;--Pt){let Ht=R(Ke[Pt],!0);Ht.__removalCount=(E.__removalCount||0)+1,ht.insertBefore(Ht,D(E))}}}return vt(E),!0}return E instanceof a&&!ft(E)||(De==="noscript"||De==="noembed"||De==="noframes")&&wn(/<\/no(script|embed|frames)/i,E.innerHTML)?(vt(E),!0):(Ae&&E.nodeType===qs.text&&(he=E.textContent,_a([W,oe,fe],ht=>{he=Ds(he,ht," ")}),E.textContent!==he&&(Ps(t.removed,{element:E.cloneNode()}),E.textContent=he)),kt(V.afterSanitizeElements,E,null),!1)},un=function(E,he,De){if(Ie&&(he==="id"||he==="name")&&(De in n||De in S))return!1;if(!(ae&&!ee[he]&&wn(Pe,he))){if(!(I&&wn(G,he))){if(!(Re.attributeCheck instanceof Function&&Re.attributeCheck(he,E))){if(!Se[he]||ee[he]){if(!(Lt(E)&&(me.tagNameCheck instanceof RegExp&&wn(me.tagNameCheck,E)||me.tagNameCheck instanceof Function&&me.tagNameCheck(E))&&(me.attributeNameCheck instanceof RegExp&&wn(me.attributeNameCheck,he)||me.attributeNameCheck instanceof Function&&me.attributeNameCheck(he,E))||he==="is"&&me.allowCustomizedBuiltInElements&&(me.tagNameCheck instanceof RegExp&&wn(me.tagNameCheck,De)||me.tagNameCheck instanceof Function&&me.tagNameCheck(De))))return!1}else if(!A[he]){if(!wn(Q,Ds(De,_e,""))){if(!((he==="src"||he==="xlink:href"||he==="href")&&E!=="script"&&_y(De,"data:")===0&&gt[E])){if(!(le&&!wn(se,Ds(De,_e,"")))){if(De)return!1}}}}}}}return!0},Lt=function(E){return E!=="annotation-xml"&&ic(E,Oe)},jt=function(E){kt(V.beforeSanitizeAttributes,E,null);let{attributes:he}=E;if(!he||Kt(E))return;let De={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:Se,forceKeepAttr:void 0},ht=he.length;for(;ht--;){let Ke=he[ht],{name:Et,namespaceURI:Pt,value:Ht}=Ke,Tt=et(Et),ln=Ht,Mt=Et==="value"?ln:my(ln);if(De.attrName=Tt,De.attrValue=Mt,De.keepAttr=!0,De.forceKeepAttr=void 0,kt(V.uponSanitizeAttribute,E,De),Mt=De.attrValue,tt&&(Tt==="id"||Tt==="name")&&(xt(Et,E),Mt=st+Mt),ge&&wn(/((--!?|])>)|<\/(style|title|textarea)/i,Mt)){xt(Et,E);continue}if(Tt==="attributename"&&ic(Mt,"href")){xt(Et,E);continue}if(De.forceKeepAttr)continue;if(!De.keepAttr){xt(Et,E);continue}if(!Y&&wn(/\/>/i,Mt)){xt(Et,E);continue}Ae&&_a([W,oe,fe],v=>{Mt=Ds(Mt,v," ")});let yn=et(E.nodeName);if(!un(yn,Tt,Mt)){xt(Et,E);continue}if(P&&typeof k=="object"&&typeof k.getAttributeType=="function"&&!Pt)switch(k.getAttributeType(yn,Tt)){case"TrustedHTML":{Mt=P.createHTML(Mt);break}case"TrustedScriptURL":{Mt=P.createScriptURL(Mt);break}}if(Mt!==ln)try{Pt?E.setAttributeNS(Pt,Et,Mt):E.setAttribute(Et,Mt),Kt(E)?vt(E):pf(t.removed)}catch{xt(Et,E)}}kt(V.afterSanitizeAttributes,E,null)},Vt=function Be(E){let he=null,De=qt(E);for(kt(V.beforeSanitizeShadowDOM,E,null);he=De.nextNode();)kt(V.uponSanitizeShadowNode,he,null),an(he),jt(he),he.content instanceof i&&Be(he.content);kt(V.afterSanitizeShadowDOM,E,null)};return t.sanitize=function(Be){let E=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},he=null,De=null,ht=null,Ke=null;if(dt=!Be,dt&&(Be="<!-->"),typeof Be!="string"&&!en(Be))if(typeof Be.toString=="function"){if(Be=Be.toString(),typeof Be!="string")throw Ms("dirty is not a string, aborting")}else throw Ms("toString is not a function");if(!t.isSupported)return Be;if(qe||K(E),t.removed=[],typeof Be=="string"&&(ct=!1),ct){if(Be.nodeName){let Ht=et(Be.nodeName);if(!ce[Ht]||L[Ht])throw Ms("root node is forbidden and cannot be sanitized in-place")}}else if(Be instanceof l)he=Ct("<!---->"),De=he.ownerDocument.importNode(Be,!0),De.nodeType===qs.element&&De.nodeName==="BODY"||De.nodeName==="HTML"?he=De:he.appendChild(De);else{if(!ze&&!Ae&&!Le&&Be.indexOf("<")===-1)return P&&Z?P.createHTML(Be):Be;if(he=Ct(Be),!he)return ze?null:Z?O:""}he&&Ze&&vt(he.firstChild);let Et=qt(ct?Be:he);for(;ht=Et.nextNode();)an(ht),jt(ht),ht.content instanceof i&&Vt(ht.content);if(ct)return Be;if(ze){if(ie)for(Ke=z.call(he.ownerDocument);he.firstChild;)Ke.appendChild(he.firstChild);else Ke=he;return(Se.shadowroot||Se.shadowrootmode)&&(Ke=N.call(r,Ke,!0)),Ke}let Pt=Le?he.outerHTML:he.innerHTML;return Le&&ce["!doctype"]&&he.ownerDocument&&he.ownerDocument.doctype&&he.ownerDocument.doctype.name&&wn(kf,he.ownerDocument.doctype.name)&&(Pt="<!DOCTYPE "+he.ownerDocument.doctype.name+`>
`+Pt),Ae&&_a([W,oe,fe],Ht=>{Pt=Ds(Pt,Ht," ")}),P&&Z?P.createHTML(Pt):Pt},t.setConfig=function(){let Be=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};K(Be),qe=!0},t.clearConfig=function(){Ne=null,qe=!1},t.isValidAttribute=function(Be,E,he){Ne||K({});let De=et(Be),ht=et(E);return un(De,ht,he)},t.addHook=function(Be,E){typeof E=="function"&&Ps(V[Be],E)},t.removeHook=function(Be,E){if(E!==void 0){let he=py(V[Be],E);return he===-1?void 0:fy(V[Be],he,1)[0]}return pf(V[Be])},t.removeHooks=function(Be){V[Be]=[]},t.removeAllHooks=function(){V=bf()},t}var $f=wf();var _r={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},ha=e=>(...t)=>({_$litDirective$:e,values:t}),Uo=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var js=class extends Uo{constructor(t){if(super(t),this.it=zt,t.type!==_r.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===zt||t==null)return this._t=void 0,this.it=t;if(t===Pn)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};js.directiveName="unsafeHTML",js.resultType=1;var xf=ha(js);function hc(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var io=hc();function Of(e){io=e}var Ws={exec:()=>null};function It(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(o,i)=>{let s=typeof i=="string"?i:i.source;return s=s.replace(An.caret,"$1"),n=n.replace(o,s),r},getRegex:()=>new RegExp(n,t)};return r}var Cy=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),An={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Oy=/^(?:[ \t]*(?:\n|$))+/,Iy=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Ly=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Hs=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Py=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,bc=/(?:[*+-]|\d{1,9}[.)])/,If=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Lf=It(If).replace(/bull/g,bc).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Dy=It(If).replace(/bull/g,bc).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),yc=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,My=/^[^\n]+/,vc=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Ny=It(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",vc).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),qy=It(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,bc).getRegex(),$a="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",kc=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,jy=It("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",kc).replace("tag",$a).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Pf=It(yc).replace("hr",Hs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",$a).getRegex(),Fy=It(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Pf).getRegex(),wc={blockquote:Fy,code:Iy,def:Ny,fences:Ly,heading:Py,hr:Hs,html:jy,lheading:Lf,list:qy,newline:Oy,paragraph:Pf,table:Ws,text:My},Af=It("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Hs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",$a).getRegex(),By={...wc,lheading:Dy,table:Af,paragraph:It(yc).replace("hr",Hs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Af).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",$a).getRegex()},Uy={...wc,html:It(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",kc).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Ws,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:It(yc).replace("hr",Hs).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Lf).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Wy=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Hy=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Df=/^( {2,}|\\)\n(?!\s*$)/,zy=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,xa=/[\p{P}\p{S}]/u,$c=/[\s\p{P}\p{S}]/u,Mf=/[^\s\p{P}\p{S}]/u,Ky=It(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,$c).getRegex(),Nf=/(?!~)[\p{P}\p{S}]/u,Gy=/(?!~)[\s\p{P}\p{S}]/u,Vy=/(?:[^\s\p{P}\p{S}]|~)/u,Yy=It(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Cy?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),qf=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Qy=It(qf,"u").replace(/punct/g,xa).getRegex(),Xy=It(qf,"u").replace(/punct/g,Nf).getRegex(),jf="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Zy=It(jf,"gu").replace(/notPunctSpace/g,Mf).replace(/punctSpace/g,$c).replace(/punct/g,xa).getRegex(),Jy=It(jf,"gu").replace(/notPunctSpace/g,Vy).replace(/punctSpace/g,Gy).replace(/punct/g,Nf).getRegex(),ev=It("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Mf).replace(/punctSpace/g,$c).replace(/punct/g,xa).getRegex(),tv=It(/\\(punct)/,"gu").replace(/punct/g,xa).getRegex(),nv=It(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),rv=It(kc).replace("(?:-->|$)","-->").getRegex(),ov=It("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",rv).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),va=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,sv=It(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",va).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Ff=It(/^!?\[(label)\]\[(ref)\]/).replace("label",va).replace("ref",vc).getRegex(),Bf=It(/^!?\[(ref)\](?:\[\])?/).replace("ref",vc).getRegex(),iv=It("reflink|nolink(?!\\()","g").replace("reflink",Ff).replace("nolink",Bf).getRegex(),Sf=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,xc={_backpedal:Ws,anyPunctuation:tv,autolink:nv,blockSkip:Yy,br:Df,code:Hy,del:Ws,emStrongLDelim:Qy,emStrongRDelimAst:Zy,emStrongRDelimUnd:ev,escape:Wy,link:sv,nolink:Bf,punctuation:Ky,reflink:Ff,reflinkSearch:iv,tag:ov,text:zy,url:Ws},av={...xc,link:It(/^!?\[(label)\]\((.*?)\)/).replace("label",va).getRegex(),reflink:It(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",va).getRegex()},_c={...xc,emStrongRDelimAst:Jy,emStrongLDelim:Xy,url:It(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Sf).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:It(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Sf).getRegex()},lv={..._c,br:It(Df).replace("{2,}","*").getRegex(),text:It(_c.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},ba={normal:wc,gfm:By,pedantic:Uy},Fs={normal:xc,gfm:_c,breaks:lv,pedantic:av},cv={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Ef=e=>cv[e];function mr(e,t){if(t){if(An.escapeTest.test(e))return e.replace(An.escapeReplace,Ef)}else if(An.escapeTestNoEncode.test(e))return e.replace(An.escapeReplaceNoEncode,Ef);return e}function Tf(e){try{e=encodeURI(e).replace(An.percentDecode,"%")}catch{return null}return e}function Rf(e,t){let n=e.replace(An.findPipe,(i,s,l)=>{let a=!1,u=s;for(;--u>=0&&l[u]==="\\";)a=!a;return a?"|":" |"}),r=n.split(An.splitPipe),o=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;o<r.length;o++)r[o]=r[o].trim().replace(An.slashPipe,"|");return r}function Bs(e,t,n){let r=e.length;if(r===0)return"";let o=0;for(;o<r;){let i=e.charAt(r-o-1);if(i===t&&!n)o++;else if(i!==t&&n)o++;else break}return e.slice(0,r-o)}function uv(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function Cf(e,t,n,r,o){let i=t.href,s=t.title||null,l=e[1].replace(o.other.outputLinkReplace,"$1");r.state.inLink=!0;let a={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:i,title:s,text:l,tokens:r.inlineTokens(l)};return r.state.inLink=!1,a}function dv(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let o=r[1];return t.split(`
`).map(i=>{let s=i.match(n.other.beginningSpace);if(s===null)return i;let[l]=s;return l.length>=o.length?i.slice(o.length):i}).join(`
`)}var ka=class{constructor(e){Ft(this,"options");Ft(this,"rules");Ft(this,"lexer");this.options=e||io}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:Bs(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=dv(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=Bs(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Bs(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=Bs(t[0],`
`).split(`
`),r="",o="",i=[];for(;n.length>0;){let s=!1,l=[],a;for(a=0;a<n.length;a++)if(this.rules.other.blockquoteStart.test(n[a]))l.push(n[a]),s=!0;else if(!s)l.push(n[a]);else break;n=n.slice(a);let u=l.join(`
`),d=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${u}`:u,o=o?`${o}
${d}`:d;let f=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,i,!0),this.lexer.state.top=f,n.length===0)break;let _=i.at(-1);if(_?.type==="code")break;if(_?.type==="blockquote"){let k=_,m=k.raw+`
`+n.join(`
`),R=this.blockquote(m);i[i.length-1]=R,r=r.substring(0,r.length-k.raw.length)+R.raw,o=o.substring(0,o.length-k.text.length)+R.text;break}else if(_?.type==="list"){let k=_,m=k.raw+`
`+n.join(`
`),R=this.list(m);i[i.length-1]=R,r=r.substring(0,r.length-_.raw.length)+R.raw,o=o.substring(0,o.length-k.raw.length)+R.raw,n=m.substring(i.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:i,text:o}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,o={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let i=this.rules.other.listItemRegex(n),s=!1;for(;e;){let a=!1,u="",d="";if(!(t=i.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let f=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,R=>" ".repeat(3*R.length)),_=e.split(`
`,1)[0],k=!f.trim(),m=0;if(this.options.pedantic?(m=2,d=f.trimStart()):k?m=t[1].length+1:(m=t[2].search(this.rules.other.nonSpaceChar),m=m>4?1:m,d=f.slice(m),m+=t[1].length),k&&this.rules.other.blankLine.test(_)&&(u+=_+`
`,e=e.substring(_.length+1),a=!0),!a){let R=this.rules.other.nextBulletRegex(m),T=this.rules.other.hrRegex(m),D=this.rules.other.fencesBeginRegex(m),ne=this.rules.other.headingBeginRegex(m),H=this.rules.other.htmlBeginRegex(m);for(;e;){let P=e.split(`
`,1)[0],O;if(_=P,this.options.pedantic?(_=_.replace(this.rules.other.listReplaceNesting,"  "),O=_):O=_.replace(this.rules.other.tabCharGlobal,"    "),D.test(_)||ne.test(_)||H.test(_)||R.test(_)||T.test(_))break;if(O.search(this.rules.other.nonSpaceChar)>=m||!_.trim())d+=`
`+O.slice(m);else{if(k||f.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||D.test(f)||ne.test(f)||T.test(f))break;d+=`
`+_}!k&&!_.trim()&&(k=!0),u+=P+`
`,e=e.substring(P.length+1),f=O.slice(m)}}o.loose||(s?o.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(s=!0)),o.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(d),loose:!1,text:d,tokens:[]}),o.raw+=u}let l=o.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;o.raw=o.raw.trimEnd();for(let a of o.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let d=this.lexer.inlineQueue.length-1;d>=0;d--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[d].src)){this.lexer.inlineQueue[d].src=this.lexer.inlineQueue[d].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(a.raw);if(u){let d={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};a.checked=d.checked,o.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=d.raw+a.tokens[0].raw,a.tokens[0].text=d.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(d)):a.tokens.unshift({type:"paragraph",raw:d.raw,text:d.raw,tokens:[d]}):a.tokens.unshift(d)}}if(!o.loose){let u=a.tokens.filter(f=>f.type==="space"),d=u.length>0&&u.some(f=>this.rules.other.anyLine.test(f.raw));o.loose=d}}if(o.loose)for(let a of o.items){a.loose=!0;for(let u of a.tokens)u.type==="text"&&(u.type="paragraph")}return o}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",o=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:o}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=Rf(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),o=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],i={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let s of r)this.rules.other.tableAlignRight.test(s)?i.align.push("right"):this.rules.other.tableAlignCenter.test(s)?i.align.push("center"):this.rules.other.tableAlignLeft.test(s)?i.align.push("left"):i.align.push(null);for(let s=0;s<n.length;s++)i.header.push({text:n[s],tokens:this.lexer.inline(n[s]),header:!0,align:i.align[s]});for(let s of o)i.rows.push(Rf(s,i.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:i.align[a]})));return i}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let i=Bs(n.slice(0,-1),"\\");if((n.length-i.length)%2===0)return}else{let i=uv(t[2],"()");if(i===-2)return;if(i>-1){let s=(t[0].indexOf("!")===0?5:4)+t[1].length+i;t[2]=t[2].substring(0,i),t[0]=t[0].substring(0,s).trim(),t[3]=""}}let r=t[2],o="";if(this.options.pedantic){let i=this.rules.other.pedanticHrefTitle.exec(r);i&&(r=i[1],o=i[3])}else o=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),Cf(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:o&&o.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),o=t[r.toLowerCase()];if(!o){let i=n[0].charAt(0);return{type:"text",raw:i,text:i}}return Cf(n,o,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let o=[...r[0]].length-1,i,s,l=o,a=0,u=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+o);(r=u.exec(t))!=null;){if(i=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!i)continue;if(s=[...i].length,r[3]||r[4]){l+=s;continue}else if((r[5]||r[6])&&o%3&&!((o+s)%3)){a+=s;continue}if(l-=s,l>0)continue;s=Math.min(s,s+l+a);let d=[...r[0]][0].length,f=e.slice(0,o+r.index+d+s);if(Math.min(o,s)%2){let k=f.slice(1,-1);return{type:"em",raw:f,text:k,tokens:this.lexer.inlineTokens(k)}}let _=f.slice(2,-2);return{type:"strong",raw:f,text:_,tokens:this.lexer.inlineTokens(_)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),o=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&o&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let o;do o=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(o!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Hn=class mc{constructor(t){Ft(this,"tokens");Ft(this,"options");Ft(this,"state");Ft(this,"inlineQueue");Ft(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||io,this.options.tokenizer=this.options.tokenizer||new ka,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:An,block:ba.normal,inline:Fs.normal};this.options.pedantic?(n.block=ba.pedantic,n.inline=Fs.pedantic):this.options.gfm&&(n.block=ba.gfm,this.options.breaks?n.inline=Fs.breaks:n.inline=Fs.gfm),this.tokenizer.rules=n}static get rules(){return{block:ba,inline:Fs}}static lex(t,n){return new mc(n).lex(t)}static lexInline(t,n){return new mc(n).inlineTokens(t)}lex(t){t=t.replace(An.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],r=!1){for(this.options.pedantic&&(t=t.replace(An.tabCharGlobal,"    ").replace(An.spaceLine,""));t;){let o;if(this.options.extensions?.block?.some(s=>(o=s.call({lexer:this},t,n))?(t=t.substring(o.raw.length),n.push(o),!0):!1))continue;if(o=this.tokenizer.space(t)){t=t.substring(o.raw.length);let s=n.at(-1);o.raw.length===1&&s!==void 0?s.raw+=`
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
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=s.text):n.push(o);continue}if(t){let s="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(s);break}else throw new Error(s)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,o=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(o=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)a.includes(o[0].slice(o[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,o.index)+"["+"a".repeat(o[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(o=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,o.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let i;for(;(o=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)i=o[2]?o[2].length:0,r=r.slice(0,o.index+i)+"["+"a".repeat(o[0].length-i-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let s=!1,l="";for(;t;){s||(l=""),s=!1;let a;if(this.options.extensions?.inline?.some(d=>(a=d.call({lexer:this},t,n))?(t=t.substring(a.raw.length),n.push(a),!0):!1))continue;if(a=this.tokenizer.escape(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.tag(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.link(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(a.raw.length);let d=n.at(-1);a.type==="text"&&d?.type==="text"?(d.raw+=a.raw,d.text+=a.text):n.push(a);continue}if(a=this.tokenizer.emStrong(t,r,l)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.codespan(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.br(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.del(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.autolink(t)){t=t.substring(a.raw.length),n.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(t))){t=t.substring(a.raw.length),n.push(a);continue}let u=t;if(this.options.extensions?.startInline){let d=1/0,f=t.slice(1),_;this.options.extensions.startInline.forEach(k=>{_=k.call({lexer:this},f),typeof _=="number"&&_>=0&&(d=Math.min(d,_))}),d<1/0&&d>=0&&(u=t.substring(0,d+1))}if(a=this.tokenizer.inlineText(u)){t=t.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),s=!0;let d=n.at(-1);d?.type==="text"?(d.raw+=a.raw,d.text+=a.text):n.push(a);continue}if(t){let d="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(d);break}else throw new Error(d)}}return n}},wa=class{constructor(e){Ft(this,"options");Ft(this,"parser");this.options=e||io}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(An.notSpaceStart)?.[0],o=e.replace(An.endingNewline,"")+`
`;return r?'<pre><code class="language-'+mr(r)+'">'+(n?o:mr(o,!0))+`</code></pre>
`:"<pre><code>"+(n?o:mr(o,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${mr(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),o=Tf(e);if(o===null)return r;e=o;let i='<a href="'+e+'"';return t&&(i+=' title="'+mr(t)+'"'),i+=">"+r+"</a>",i}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let o=Tf(e);if(o===null)return mr(n);e=o;let i=`<img src="${e}" alt="${n}"`;return t&&(i+=` title="${mr(t)}"`),i+=">",i}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:mr(e.text)}},Ac=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},zn=class gc{constructor(t){Ft(this,"options");Ft(this,"renderer");Ft(this,"textRenderer");this.options=t||io,this.options.renderer=this.options.renderer||new wa,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Ac}static parse(t,n){return new gc(n).parse(t)}static parseInline(t,n){return new gc(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let o=t[r];if(this.options.extensions?.renderers?.[o.type]){let s=o,l=this.options.extensions.renderers[s.type].call({parser:this},s);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(s.type)){n+=l||"";continue}}let i=o;switch(i.type){case"space":{n+=this.renderer.space(i);break}case"hr":{n+=this.renderer.hr(i);break}case"heading":{n+=this.renderer.heading(i);break}case"code":{n+=this.renderer.code(i);break}case"table":{n+=this.renderer.table(i);break}case"blockquote":{n+=this.renderer.blockquote(i);break}case"list":{n+=this.renderer.list(i);break}case"checkbox":{n+=this.renderer.checkbox(i);break}case"html":{n+=this.renderer.html(i);break}case"def":{n+=this.renderer.def(i);break}case"paragraph":{n+=this.renderer.paragraph(i);break}case"text":{n+=this.renderer.text(i);break}default:{let s='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(s),"";throw new Error(s)}}}return n}parseInline(t,n=this.renderer){let r="";for(let o=0;o<t.length;o++){let i=t[o];if(this.options.extensions?.renderers?.[i.type]){let l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(i.type)){r+=l||"";continue}}let s=i;switch(s.type){case"escape":{r+=n.text(s);break}case"html":{r+=n.html(s);break}case"link":{r+=n.link(s);break}case"image":{r+=n.image(s);break}case"checkbox":{r+=n.checkbox(s);break}case"strong":{r+=n.strong(s);break}case"em":{r+=n.em(s);break}case"codespan":{r+=n.codespan(s);break}case"br":{r+=n.br(s);break}case"del":{r+=n.del(s);break}case"text":{r+=n.text(s);break}default:{let l='Token with "'+s.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return r}},ya,Us=(ya=class{constructor(e){Ft(this,"options");Ft(this,"block");this.options=e||io}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Hn.lex:Hn.lexInline}provideParser(){return this.block?zn.parse:zn.parseInline}},Ft(ya,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),Ft(ya,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),ya),pv=class{constructor(...e){Ft(this,"defaults",hc());Ft(this,"options",this.setOptions);Ft(this,"parse",this.parseMarkdown(!0));Ft(this,"parseInline",this.parseMarkdown(!1));Ft(this,"Parser",zn);Ft(this,"Renderer",wa);Ft(this,"TextRenderer",Ac);Ft(this,"Lexer",Hn);Ft(this,"Tokenizer",ka);Ft(this,"Hooks",Us);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let o=r;for(let i of o.header)n=n.concat(this.walkTokens(i.tokens,t));for(let i of o.rows)for(let s of i)n=n.concat(this.walkTokens(s.tokens,t));break}case"list":{let o=r;n=n.concat(this.walkTokens(o.items,t));break}default:{let o=r;this.defaults.extensions?.childTokens?.[o.type]?this.defaults.extensions.childTokens[o.type].forEach(i=>{let s=o[i].flat(1/0);n=n.concat(this.walkTokens(s,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(o=>{if(!o.name)throw new Error("extension name required");if("renderer"in o){let i=t.renderers[o.name];i?t.renderers[o.name]=function(...s){let l=o.renderer.apply(this,s);return l===!1&&(l=i.apply(this,s)),l}:t.renderers[o.name]=o.renderer}if("tokenizer"in o){if(!o.level||o.level!=="block"&&o.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let i=t[o.level];i?i.unshift(o.tokenizer):t[o.level]=[o.tokenizer],o.start&&(o.level==="block"?t.startBlock?t.startBlock.push(o.start):t.startBlock=[o.start]:o.level==="inline"&&(t.startInline?t.startInline.push(o.start):t.startInline=[o.start]))}"childTokens"in o&&o.childTokens&&(t.childTokens[o.name]=o.childTokens)}),r.extensions=t),n.renderer){let o=this.defaults.renderer||new wa(this.defaults);for(let i in n.renderer){if(!(i in o))throw new Error(`renderer '${i}' does not exist`);if(["options","parser"].includes(i))continue;let s=i,l=n.renderer[s],a=o[s];o[s]=(...u)=>{let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d||""}}r.renderer=o}if(n.tokenizer){let o=this.defaults.tokenizer||new ka(this.defaults);for(let i in n.tokenizer){if(!(i in o))throw new Error(`tokenizer '${i}' does not exist`);if(["options","rules","lexer"].includes(i))continue;let s=i,l=n.tokenizer[s],a=o[s];o[s]=(...u)=>{let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d}}r.tokenizer=o}if(n.hooks){let o=this.defaults.hooks||new Us;for(let i in n.hooks){if(!(i in o))throw new Error(`hook '${i}' does not exist`);if(["options","block"].includes(i))continue;let s=i,l=n.hooks[s],a=o[s];Us.passThroughHooks.has(i)?o[s]=u=>{if(this.defaults.async&&Us.passThroughHooksRespectAsync.has(i))return(async()=>{let f=await l.call(o,u);return a.call(o,f)})();let d=l.call(o,u);return a.call(o,d)}:o[s]=(...u)=>{if(this.defaults.async)return(async()=>{let f=await l.apply(o,u);return f===!1&&(f=await a.apply(o,u)),f})();let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d}}r.hooks=o}if(n.walkTokens){let o=this.defaults.walkTokens,i=n.walkTokens;r.walkTokens=function(s){let l=[];return l.push(i.call(this,s)),o&&(l=l.concat(o.call(this,s))),l}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Hn.lex(e,t??this.defaults)}parser(e,t){return zn.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},o={...this.defaults,...r},i=this.onError(!!o.silent,!!o.async);if(this.defaults.async===!0&&r.async===!1)return i(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return i(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return i(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(o.hooks&&(o.hooks.options=o,o.hooks.block=e),o.async)return(async()=>{let s=o.hooks?await o.hooks.preprocess(t):t,l=await(o.hooks?await o.hooks.provideLexer():e?Hn.lex:Hn.lexInline)(s,o),a=o.hooks?await o.hooks.processAllTokens(l):l;o.walkTokens&&await Promise.all(this.walkTokens(a,o.walkTokens));let u=await(o.hooks?await o.hooks.provideParser():e?zn.parse:zn.parseInline)(a,o);return o.hooks?await o.hooks.postprocess(u):u})().catch(i);try{o.hooks&&(t=o.hooks.preprocess(t));let s=(o.hooks?o.hooks.provideLexer():e?Hn.lex:Hn.lexInline)(t,o);o.hooks&&(s=o.hooks.processAllTokens(s)),o.walkTokens&&this.walkTokens(s,o.walkTokens);let l=(o.hooks?o.hooks.provideParser():e?zn.parse:zn.parseInline)(s,o);return o.hooks&&(l=o.hooks.postprocess(l)),l}catch(s){return i(s)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+mr(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},so=new pv;function Dt(e,t){return so.parse(e,t)}Dt.options=Dt.setOptions=function(e){return so.setOptions(e),Dt.defaults=so.defaults,Of(Dt.defaults),Dt};Dt.getDefaults=hc;Dt.defaults=io;Dt.use=function(...e){return so.use(...e),Dt.defaults=so.defaults,Of(Dt.defaults),Dt};Dt.walkTokens=function(e,t){return so.walkTokens(e,t)};Dt.parseInline=so.parseInline;Dt.Parser=zn;Dt.parser=zn.parse;Dt.Renderer=wa;Dt.TextRenderer=Ac;Dt.Lexer=Hn;Dt.lexer=Hn.lex;Dt.Tokenizer=ka;Dt.Hooks=Us;Dt.parse=Dt;var vS=Dt.options,kS=Dt.setOptions,wS=Dt.use,$S=Dt.walkTokens,xS=Dt.parseInline;var AS=zn.parse,SS=Hn.lex;function gr(e){let t=Dt.parse(e),n=$f.sanitize(t);return xf(n)}function hr(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function Wo(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Aa(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var Wf={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},fv={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},_v=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,mv=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function Kn(e){return!!e&&typeof e=="object"}function Sc(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function Ec(e,t){let n=Sc(e),r=Sc(t),o=new Map;for(let l of n)o.set(l,(o.get(l)||0)+1);let i=0;for(let l of r){let a=o.get(l)||0;a>0?o.set(l,a-1):i+=1}let s=0;for(let l of o.values())s+=l;return{added:i,removed:s}}function Hf(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(o=>Kn(o)&&typeof o.text=="string"?o.text:"").join(""):Kn(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(o=>o.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function gv(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:Wf[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=Sc(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:o,removed:i}=Ec(n.old_string,n.new_string);r.added=o,r.removed=i}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let o=0,i=0,s=Array.isArray(n.edits)?n.edits:[];for(let l of s){let a=Ec(Kn(l)?l.old_string:"",Kn(l)?l.new_string:"");o+=a.added,i+=a.removed}r.added=o,r.removed=i}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(r.launch_id=e.id),typeof n.description=="string"&&(r.command=n.description)),r}function Tc(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}var hv=/<system-reminder>[\s\S]*?<\/system-reminder>/g;function zf(e){let t;if(typeof e=="string")t=e;else if(Array.isArray(e))t=e.filter(r=>Kn(r)&&r.type==="text"&&typeof r.text=="string").map(r=>String(r.text)).join(`
`);else return null;let n=t.replace(hv,"").trim();return n.length>0?{kind:"user",text:n}:null}function Rc(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=_v.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:mv.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function bv(e,t){if(e.subtype==="init"){let n=typeof e.model=="string"?e.model:"";return t.progress=null,[{kind:"thinking",text:n?`\uC138\uC158 \uC2DC\uC791 \xB7 ${n}`:"\uC138\uC158 \uC2DC\uC791"}]}if(e.subtype==="thinking_tokens"){let r=`\uC0DD\uAC01 \uC911\u2026 ${typeof e.estimated_tokens=="number"&&Number.isFinite(e.estimated_tokens)?Math.max(0,Math.round(e.estimated_tokens)):0} \uD1A0\uD070`;return t.progress?(t.progress.text=r,[]):(t.progress={kind:"thinking",text:r},[t.progress])}return[]}function yv(e,t){let n=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let r=e.message,o=r&&Array.isArray(r.content)?r.content:[],i=[];for(let s of o)if(Kn(s)){if(s.type==="text"&&typeof s.text=="string")i.push(Rc(s.text));else if(s.type==="thinking"){let l=Tc(s.thinking);l&&i.push(l)}else if(s.type==="tool_use"){let l=gv(s);typeof s.id=="string"&&t.set(s.id,l),i.push(l)}}return n?Uf(i,n):i}if(e.type==="user"){let r=e.message,o=r&&Array.isArray(r.content)?r.content:[];for(let s of o)if(Kn(s)&&s.type==="tool_result"){let l=t.get(String(s.tool_use_id));if(l){let a=Hf(s.content);l.result=a,l.output=typeof s.content=="string"?s.content:a,s.is_error===!0&&(l.is_error=!0)}}let i=zf(r&&r.content);return i?[i]:[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success",o={kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""};return n?Uf([o],n):[o]}return[]}function Uf(e,t){for(let n of e)n.parent_tool_use_id=t;return e}function vv(e){let t=typeof e.command=="string"?e.command:"",n=Hf(e.aggregated_output===void 0?e.output:e.aggregated_output),o=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",n].filter(s=>s.length>0).join(" \xB7 "),i={kind:"tool",tool:"shell",icon:Wf.Bash,command:t,input:{command:t},expandable:!0};return o.length>0&&(i.result=o),typeof e.aggregated_output=="string"&&(i.output=e.aggregated_output),i}function kv(e){if(e.type==="item.completed"&&Kn(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[Rc(t.text)];if(t.type==="user_message"){let n=zf(t.text);return n?[n]:[]}if(t.type==="reasoning"){let n=Tc(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[vv(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function wv(e){if(e.schema!=="codex-delegation-monitor-v1"||!Kn(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&Kn(t.item)){let n=t.item;if(typeof n.id!="string"||n.id.length===0)return[];if(t.type==="item.completed"&&n.kind==="agent_message"&&typeof n.text=="string"&&n.text.trim().length>0)return[Rc(n.text)];if(t.type==="item.completed"&&n.kind==="reasoning"){let s=Tc(n.text);return s?[s]:[]}if(t.type!=="item.completed"||n.kind!=="activity"||typeof n.activity!="string")return[];let r=fv[n.activity];if(!r)return[];let o,i;if(n.status==="completed")o="\uC644\uB8CC",i="\u2713";else if(n.status==="failed")o="\uC2E4\uD328",i="\u2717";else return[];return[{kind:"tool",tool:`${r} \xB7 ${o}`,icon:i,expandable:!1,result:""}]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function $v(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function xv(e){let t=e;if(typeof e=="string"){let n=e.trim();if(n.length===0)return null;try{t=JSON.parse(n)}catch{return null}}return Kn(t)?t:null}function Kf(e={}){let t=e.skip_delegated===!0,n=new Map,r={progress:null};return{push(o){let i=xv(o);if(!i)return[];if(t&&typeof i.parent_tool_use_id=="string"&&i.parent_tool_use_id.length>0)return[];if(i.type==="system"&&i.schema!=="codex-delegation-monitor-v1")return bv(i,r);let s=i.schema==="codex-delegation-monitor-v1"?wv(i):$v(i)?kv(i):yv(i,n);return s.length>0&&(r.progress=null),s}}}function Cc(e){let t=[],n=Kf(),r=Array.isArray(e)?e:[];for(let o of r)for(let i of n.push(o))t.push(i);return t}var Av=5,Sv=10,Ev=/Task\s+#(\d+)/,Tv=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Rv=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function zs(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Cv(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function Ov(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function Iv(e){let t=new Map,n=0;for(let o of e){if(o.kind!=="tool")continue;n+=1;let i=o.input||{};if(o.tool==="TaskCreate"){let a=Ev.exec(o.output||o.result||""),u=String(i.activeForm||i.subject||"").trim();if(!a||u.length===0)continue;t.set(a[1],{label:u,active:i.status==="in_progress"?n:0});continue}if(o.tool!=="TaskUpdate")continue;let s=t.get(String(i.taskId??""));if(!s)continue;let l=i.activeForm||i.subject;typeof l=="string"&&l.trim().length>0&&(s.label=l.trim()),typeof i.status=="string"&&(s.active=i.status==="in_progress"?n:0)}let r=null;for(let o of t.values())o.active>0&&(!r||o.active>r.active)&&(r=o);return r?r.label:null}function Lv(e){if(e.tool==="Bash"){let t=e.command||"";return Tv.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Rv.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function Pv(e){let t=e.filter(o=>o.kind==="tool").slice(-Sv),n=new Map;t.forEach((o,i)=>{let s=Lv(o);if(!s)return;let l=n.get(s)||{count:0,last:-1};l.count+=1,l.last=i,n.set(s,l)});let r=null;for(let[o,i]of n)(!r||i.count>r.count||i.count===r.count&&i.last>r.last)&&(r={label:o,count:i.count,last:i.last});return r?r.label:null}function Dv(e){let t=Ov(e);if(t)return{text:t,guess:!1};let n=Iv(e);if(n)return{text:n,guess:!1};let r=Pv(e);return r?{text:r,guess:!0}:null}function Mv(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:vn(e,t)}function Ho(e,t={}){let{transport:n,sessionLogStore:r,onClose:o}=t,i=null,s=null,l=null,a=null,u=null,d=!1,f={},_=!0,k=new Set,m=new Set,R=null,T=null,D=!1,ne=!1,H=!1,P=null,O=null;function q(){D=!1,ne=!1,H=!1,P=null,O=null}async function F(ie){if(n){ne=!0,H=!1,L();try{let Z=await Promise.resolve(n("get-attempt-prompt",{attempt_id:ie,...u?{root_dir:u}:{}}));if(i!==ie)return;!Z||typeof Z!="object"||Array.isArray(Z)?H=!0:(P=Z,O=ie)}catch{i===ie&&(H=!0)}finally{i===ie&&(ne=!1,L())}}}function z(){if(D=!D,D&&i&&O!==i){F(i);return}L()}function B(){if(!D)return"";let ie=Wo({loading:ne,error:H});if(ie)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${ie}
      </div>`;if(!P)return"";if(P.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let Z=Aa(P.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${Z?c`<div class="prompt-block__meta">${Z} 발송</div>`:""}
      ${typeof P.task_prompt=="string"?hr("\uACFC\uC5C5 (user)",P.task_prompt):""}
      ${typeof P.system_prompt=="string"?hr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",P.system_prompt):""}
    </div>`}function N(){if(!a||!r)return[];let ie=r.get(a);return Cc(ie?ie.lines:[])}function V(){if(!a||!r)return null;let ie=r.get(a),Z=ie?ie.last_event_at:null;return typeof Z=="number"?Z:null}function W(){return f.status==="running"}function oe(){if(W()&&i){T||(T=setInterval(()=>L(),1e3));return}fe()}function fe(){T&&(clearInterval(T),T=null)}function Pe(ie){let Z=[],Ie=0;for(;Ie<ie.length;){let{idx:tt,line:st}=ie[Ie];if(st.kind==="tool"){let Qe=Ie;for(;Qe<ie.length&&ie[Qe].line.kind==="tool"&&ie[Qe].line.tool===st.tool;)Qe+=1;if(Qe-Ie>=Av&&!m.has(tt)){Z.push({kind:"group",idx:tt,tool:st.tool||"",lines:ie.slice(Ie,Qe)}),Ie=Qe;continue}}Z.push({kind:"line",idx:tt,line:st}),Ie+=1}return Z}function G(ie){let Z=[],Ie=new Map;for(let Qe=0;Qe<ie.length;Qe+=1){let ct=ie[Qe],$t=ct.parent_tool_use_id;if(typeof $t=="string"&&$t.length>0){let mt=Ie.get($t);mt||(mt={kind:"subagent",idx:Qe,launch_id:$t,agent_type:null,header:null,lines:[]},Ie.set($t,mt),Z.push(mt)),mt.lines.push({idx:Qe,line:ct});continue}if(ct.kind==="tool"&&ct.tool==="Agent"&&typeof ct.launch_id=="string"&&ct.launch_id.length>0){let mt=se(ct),Xe=Ie.get(ct.launch_id);if(Xe){Xe.header={idx:Qe,line:ct},Xe.agent_type=mt;continue}let gt={kind:"subagent",idx:Qe,launch_id:ct.launch_id,agent_type:mt,header:{idx:Qe,line:ct},lines:[]};Ie.set(ct.launch_id,gt),Z.push(gt);continue}Z.push({kind:"entry",idx:Qe,line:ct})}let tt=[],st=0;for(;st<Z.length;){if(Z[st].kind!=="entry"){tt.push(Z[st]),st+=1;continue}let Qe=st;for(;Qe<Z.length&&Z[Qe].kind==="entry";)Qe+=1;tt.push(...Pe(Z.slice(st,Qe))),st=Qe}return tt}function se(ie){let Z=ie.input;return Z&&typeof Z.subagent_type=="string"?Z.subagent_type:null}function _e(ie){for(let Z=ie.length-1;Z>=0;Z-=1){let Ie=ie[Z];if(Ie.kind==="result"||Ie.kind==="error")return null;if(Ie.kind==="tool"&&!Object.hasOwn(Ie,"result"))return Ie}return null}function Oe(ie){for(let Z=ie.length-1;Z>=0;Z-=1)if(ie[Z].kind==="thinking")return ie[Z];return null}function Q(ie,Z){if(Z.kind==="gate")return c`<div class="sv__gate">${Z.text}</div>`;if(Z.kind==="phase")return c`<div class="sv__phase">${Z.text}</div>`;if(Z.kind==="result")return c`<div
        class="sv__result${Z.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${Z.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${gr(Z.text||(Z.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(Z.kind==="thinking"){let Ie=k.has(ie);return c`<div
        class="sv__think${Ie?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Re(ie)}
      >
        <span class="sv__think-line">💭 ${zs(Z.text)}</span>
        ${Ie?c`<pre class="sv__think-expand">${Z.text}</pre>`:""}
      </div>`}if(Z.kind==="user"){let Ie=k.has(ie);return c`<div
        class="sv__line sv__line--user${Ie?" sv__line--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Re(ie)}
      >
        <span class="sv__user-line">▷ ${zs(Z.text)}</span>
        ${Ie?c`<pre class="sv__user-expand">${Z.text}</pre>`:""}
      </div>`}if(Z.kind==="error")return c`<div class="sv__error">⛔ ${Z.text}</div>`;if(Z.kind==="blocker")return c`<div class="sv__error">⛔ ${Z.text}</div>`;if(Z.kind==="tool"){let Ie=k.has(ie),tt=Z.tool==="Bash"?Cv(Z.command):0,st=Z.tool==="Bash"?tt>1?zs(Z.command):Z.command:Z.path||Z.command||"";return c`<div
        class="sv__tool${Ie?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>Re(ie)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${Z.icon}</span>
          <span class="sv__tool-name">${Z.tool}</span>
          ${st?c`<span class="sv__tool-detail">${st}</span>`:""}
          ${tt>1?c`<span class="sv__tool-more">⋯ ${tt}줄</span>`:""}
          ${typeof Z.added=="number"?c`<span class="sv__diff-add">+${Z.added}</span>`:""}
          ${typeof Z.removed=="number"?c`<span class="sv__diff-del">−${Z.removed}</span>`:""}
          ${Z.result?c`<span class="sv__tool-ok">→ ${Z.result}</span>`:""}
        </span>
        ${Ie?c`<pre class="sv__tool-expand">${ce(Z)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${gr(Z.text||"")}</div>`}function ce(ie){let Z=[];if(ie.tool==="Bash"&&typeof ie.command=="string"&&ie.command.length>0)Z.push(ie.command);else if(ie.input!==void 0)try{Z.push(`input: ${JSON.stringify(ie.input,null,2)}`)}catch{}return typeof ie.output=="string"&&ie.output.length>0&&Z.push(`output:
${ie.output}`),Z.join(`

`)}function J(){if(!i)return c``;let ie=N(),Z=(s?[f.agent_type,f.model,f.effort]:[f.runner,f.model,f.effort]).filter(Boolean).join(" \xB7 "),Ie=f.session_id||"",tt=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${_?"ON":"OFF"}`,st=W(),Qe=st?Mv(V(),Date.now()):"",ct=st?_e(ie):null,$t=st?Oe(ie):null,mt=Dv(ie);return c`<div class="sv" data-attempt-id=${i}>
      <div class="sv__bar">
        <span class="sv__id"
          >${f.label||(s?f.role||"":i)}</span
        >
        ${mt?c`<span
              class="sv__stage${mt.guess?" sv__stage--guess":""}"
              title=${mt.text}
              >${mt.text}</span
            >`:""}
        ${st?c`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${Qe?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${Qe}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${Qe?c`<span class="sv__live-ago">${Qe}</span>`:""}</span
            >`:""}
        ${Ie?c`<button
              type="button"
              class="sv__session"
              title=${Ie}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${Ie}`}
              @click=${()=>ae(Ie)}
            >
              ⧉ ${Ie.slice(0,8)}
            </button>`:""}
        ${f.resume_command?c`<button
              type="button"
              class="sv__resume-cmd"
              title=${f.resume_command}
              aria-label=${`\uC7AC\uAC1C \uBA85\uB839 \uBCF5\uC0AC: ${f.resume_command}`}
              @click=${()=>ae(f.resume_command||"")}
            >
              ⧉ 재개 명령
            </button>`:""}
        ${Z?c`<span class="sv__meta">${Z}</span>`:""}
        ${f.worktree?c`<span class="sv__wt" title=${f.worktree}
              >${f.worktree}</span
            >`:""}
        ${s||d?"":c`<button
              type="button"
              class="sv__prompt-toggle${D?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${D?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${z}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${_?" sv__follow--on":""}"
          aria-pressed=${_?"true":"false"}
          aria-label=${tt}
          @click=${I}
        >
          <span class="sv__follow-full">⇣ ${tt}</span>
          <span class="sv__follow-short">⇣ ${_?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>ze()}
        >
          ✕
        </button>
      </div>
      ${s||d?"":B()}
      <div class="sv__body">
        ${ie.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:G(ie).map(Xe=>Xe.kind==="subagent"?be(Xe):Xe.kind==="group"?Se(Xe):Q(Xe.idx,Xe.line))}
      </div>
      ${ct||$t?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${ct?c`<span class="sv__now-icon">${ct.icon}</span>
                  <span class="sv__now-name">${ct.tool}</span>
                  <span class="sv__now-detail"
                    >${ct.tool==="Bash"?zs(ct.command):ct.path||ct.command||""}</span
                  >`:""}
            ${$t?c`<span class="sv__now-think"
                  >💭 ${zs($t.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function Se(ie){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>me(ie.idx)}
    >
      <span class="sv__group-icon">${ie.lines[0].line.icon}</span>
      <span class="sv__group-name">${ie.tool}</span>
      <span class="sv__group-count">${ie.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function be(ie){let Z=m.has(ie.idx),Ie=ie.header?ie.header.line:null,tt=Ie?Ie.is_error===!0?"\u2717":typeof Ie.result=="string"?"\u2713":"\u27F3":"",st=Ie&&Ie.command?Ie.command:"";return c`<div class="sv__sub${Z?" sv__sub--open":""}">
      <div
        class="sv__sub-head"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>me(ie.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${ie.agent_type||"subagent"}</span>
        ${st?c`<span class="sv__sub-detail">${st}</span>`:""}
        <span class="sv__sub-count">${ie.lines.length}줄</span>
        ${tt?c`<span class="sv__sub-state">${tt}</span>`:""}
        ${Z?"":c`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${Z?c`<div class="sv__sub-body">
            ${Pe(ie.lines).map(Qe=>Qe.kind==="group"?Se(Qe):Q(Qe.idx,Qe.line))}
          </div>`:""}
    </div>`}function me(ie){m.add(ie),L()}function L(){lt(J(),e),oe(),_&&ee()}function ee(){let ie=e.querySelector(".sv__body");ie&&(ie.scrollTop=ie.scrollHeight)}function Re(ie){k.has(ie)?k.delete(ie):k.add(ie),L()}function I(){_=!_,L()}function ae(ie){kn(ie).then(Z=>{Z?ve("\uBCF5\uC0AC\uB428","success",1200):ve("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function le(ie){!i||!ie||(f={...f,...ie},L())}function Y(ie){let Z=ie.target;if(!Z||!Z.classList||!Z.classList.contains("sv__body"))return;!(Z.scrollHeight-Z.scrollTop-Z.clientHeight<=4)&&_&&(_=!1,L())}e.addEventListener("scroll",Y,!0);function Ae(ie){let Z=ie.target;!Z||typeof Z.closest!="function"||e.contains(Z)||Z.closest("dialog")||Z.closest(".md-viewer-root")||ze()}let ge=!1;function Le(){ge||(document.addEventListener("mousedown",Ae),ge=!0)}function qe(){ge&&(document.removeEventListener("mousedown",Ae),ge=!1)}function Ze(ie){let Z=ie&&ie.attempt_id;if(!Z)return;let Ie=typeof ie.launch_id=="string"&&ie.launch_id.length>0?ie.launch_id:null,tt=ie.session_ref&&typeof ie.session_ref=="object"?ie.session_ref:null;if(Ie&&tt)return;let st=a;i=Z,s=Ie,l=tt,a=s?`session-log:${i}:${s}`:`session-log:${i}`,n&&st&&st!==a&&Promise.resolve(n("unsubscribe-session-log",{id:st})).catch(()=>{}),u=typeof ie.root_dir=="string"&&ie.root_dir.length>0?ie.root_dir:null,f=ie.meta||{},d=ie.hide_prompt===!0,_=!0,k.clear(),m.clear(),q(),!R&&r&&(R=r.subscribe(L)),n&&Promise.resolve(n("subscribe-session-log",{id:a,attempt_id:i,...s?{launch_id:s}:{},...l?{session_ref:l}:{},...u?{root_dir:u}:{}})).catch(()=>{}),Le(),L()}function ze(){let ie=a;qe(),i=null,s=null,l=null,a=null,u=null,d=!1,k.clear(),m.clear(),q(),fe(),n&&ie&&Promise.resolve(n("unsubscribe-session-log",{id:ie})).catch(()=>{}),lt(c``,e),o&&o()}return{open:Ze,updateMeta:le,close:ze,isOpen(){return i!==null},destroy(){fe(),qe(),R&&(R(),R=null),e.removeEventListener("scroll",Y,!0),i=null,s=null,l=null,a=null,u=null,d=!1,lt(c``,e)}}}function Nv(e){let t=[],n=e?.workflow?.stages,r=n?.spec?.doc;r&&t.push({kind:"spec",path:r.path,missing_state:r.missing_state});let o=n?.plan?.doc;return o&&t.push({kind:"plan",path:o.path,missing_state:o.missing_state}),t}function Gf(e,t){let n=Nv(e);return c`
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
  `}var qv="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",jv=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,Fv=/^\*\*결론\*\* — (.+)$/;function Sa(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==qv)return null;let n=jv.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],o=n[2],i=n[3],s=2;for(;s<t.length&&t[s].trim().length===0;)s+=1;let l=s<t.length?Fv.exec(t[s]):null,a=l?l[1].replace(/\s+/g," ").trim():"",u=l?s+1:s;return{lane:r,identifier:o,timestamp:i,conclusion:a,body:t.slice(u).join(`
`).trim()}}var Bv=/^## 🔎 리뷰 결과 · (spec|impl|plan) · r([0-9]+)$/,Uv=/^VERDICT: (APPROVE|REVISE)$/,Wv=/^anchor: ([0-9a-fA-F]+)$/,Hv=/^[0-9]+\. /,zv="- \uC9C0\uC801 \uC5C6\uC74C",Kv={spec:40,impl:40,plan:12};function Vf(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/),n=Bv.exec(t[0]||"");if(!n)return null;let r=Uv.exec(t[1]||""),o=Wv.exec(t[2]||"");if(!r||!o)return null;let i=n[1],s=o[1];if(s.length!==Kv[i])return null;let l=t.slice(3),a=0,u=!1;for(let d of l)Hv.test(d)?a+=1:d.trim()===zv&&(u=!0);return{step:i,round:Number(n[2]),verdict:r[1],anchor:s,points:a>0?a:u?0:null,body:l.join(`
`).trim()}}var Yf=20;function Oc(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),o=String(t.getHours()).padStart(2,"0"),i=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${o}:${i}`}function Gv(e){return e.length>Yf?`${e.slice(0,Yf)}\u2026`:e}function Vv(e,t,n,r){let o=`${t.lane} ${Gv(t.identifier)}`;return c`<div class="detail-report">
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
        <span class="detail-report__time">${Oc(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${r&&t.body.length>0?c`<div class="detail-report__body">
          ${gr(t.body)}
        </div>`:""}
  </div>`}var Qf=12;function Yv(e){return e.points===null?"":e.points===0?"\uC9C0\uC801 \uC5C6\uC74C":`\uC9C0\uC801 ${e.points}\uAC74`}function Qv(e,t,n,r){let o=t.anchor.length>Qf?`${t.anchor.slice(0,Qf)}\u2026`:t.anchor,i=Yv(t);return c`<div class="detail-report detail-report--review">
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
          >${Oc(e.created_at)}</span
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
          ${gr(t.body)}
        </div>`:""}
  </div>`}function Xv(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${Oc(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${gr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function Xf(e,t={},n={}){let r=Array.isArray(e)?e.filter(Boolean):[],o=n.expanded||new Set,i=typeof n.draft=="string"?n.draft:"",s=n.sending===!0,l=r.slice().sort((a,u)=>String(u.created_at||"").localeCompare(String(a.created_at||"")));return c`
    <div class="detail-section-label">댓글 (${r.length})</div>
    ${n.error?c`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:l.length===0?c`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:c`<div class="detail-comments" data-seam="comments">
            ${l.map(a=>{let u=typeof a.text=="string"?a.text:"",d=Sa(u);if(d)return Vv(a,d,t,o.has(a.id));let f=Vf(u);return f?Qv(a,f,t,o.has(a.id)):Xv(a)})}
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
  `}var{I:sE}=au;var Zf=e=>e.strings===void 0;var Zv={},Jf=(e,t=Zv)=>e._$AH=t;var Or=ha(class extends Uo{constructor(e){if(super(e),e.type!==_r.PROPERTY&&e.type!==_r.ATTRIBUTE&&e.type!==_r.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Zf(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===Pn||t===zt)return t;let n=e.element,r=e.name;if(e.type===_r.PROPERTY){if(t===n[r])return Pn}else if(e.type===_r.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return Pn}else if(e.type===_r.ATTRIBUTE&&n.getAttribute(r)===t+"")return Pn;return Jf(e),t}});var Jv=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review",receipt_stage:null,fill_stage:"spec",stale_stage:"spec",hue:"spec"},{id:"plan",label:"\uACC4\uD68D \uB9AC\uBDF0",receipt:null,receipt_stage:"plan",fill_stage:"plan",stale_stage:"plan",hue:"plan"},{id:"impl",label:"\uAD6C\uD604",receipt:null,receipt_stage:null,fill_stage:"impl",stale_stage:null,hue:"impl"},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review",receipt_stage:null,fill_stage:null,stale_stage:"impl",hue:"impl"},{id:"pr",label:"PR",receipt:null,receipt_stage:null,fill_stage:"pr",stale_stage:null,hue:"pr"}],Ic={quick_fix:["impl","impl_review"],spec_backed:["spec","impl","impl_review","pr"],full_plan:["spec","plan","impl","impl_review","pr"]},e_={missing:"\uC2B9\uC778 \uD544\uC694",stale:"\uC7AC\uC2B9\uC778 \uD544\uC694",unknown:"\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"},ek={pin:"pin",global:"global",base:"base"};function tk(e){return c`<span
    class=${`detail-layer-rail detail-layer-rail--${ek[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function nk(e,t,n){switch(e){case"workflow_mode":return cs;case"spec_review_model":case"impl_review_model":return us;case"plan_review_model":return Ri;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return Ci;case"spec_review_speed":case"plan_review_speed":case"impl_review_speed":return Jn;case"impl_dispatch":return ls;case"impl_runtime":return Ti;case"impl_model":return Ro(n,t.impl_runtime);case"impl_effort":return Vr(n,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return Jn;case"orchestration_model":return Co(n,null);case"orchestration_effort":return Vr(n,void 0,t.orchestration_model||Tn).filter(r=>r!==Tn);default:return[]}}function rk(e,t){return c`<div class="detail-effective__row" data-key=${e.key}>
    ${tk(e.source)}
    <span class="detail-effective__k"
      >${xr[e.key]||e.key}</span
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
          aria-label=${`${xr[e.key]||e.key} \uD3B8\uC9D1`}
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
  </div>`}function t_(e,t){let n=vl.flatMap(a=>a.keys),r=kl(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Pd(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),i=Object.fromEntries(r.map(a=>[a.key,a])),s=Object.fromEntries(r.filter(a=>a.value!==null).map(a=>[a.key,a.value])),l=r.filter(a=>a.full_value&&a.display!==a.full_value).map(a=>a.full_value).join(" \xB7 ");return c`<details
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
        >${ok(i)}</span
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
          ${vl.map(a=>c`
              <div class="detail-effective__subhead">${a.label}</div>
              ${r.filter(u=>a.keys.includes(u.key)).map(u=>{let d=Ai({key:u.key,choices:nk(u.key,s,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return rk(u,{expanded:e.expanded,options:d.options,default_label:d.unset_label,default_full_value:d.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="실행 프리셋"
              .value=${Or(e.preset_id)}
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
  </details>`}function ok(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let n=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${n}`)}for(let n of["impl_model","impl_effort","impl_speed"])e[n]?.resolution!=="not_applicable"&&t.push(e[n]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function sk(e){if(!e||typeof e!="object")return null;let{kind:t,actor:n,effort:r,sha:o}=e;return typeof t!="string"||typeof n!="string"||typeof o!="string"?null:{kind:t,actor:n,effort:typeof r=="string"?r:null,sha:o}}function n_(e,t={}){let n=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},o=r.stages||{},i=r.route||n.route||null,s=typeof n.pr_url=="string"?n.pr_url:"",l=typeof n.exec_receipt=="string"?n.exec_receipt:"",a=sk(r.exec_receipt),u=a?ar(a):l,d=a?`${a.kind}:${a.actor}`:l.split("@")[0],f=bi(r.planned_execution,r.exec_receipt),_=r.chips?.pr?.number,k=typeof _=="number"?`PR #${_}`:"PR",m=fs(n),R=m!==null&&t.isChipOpen?.("rec")===!0,T=R?Ll({rec:m},"rec"):null;return c`<section class="detail-summary" data-seam="detail-summary">
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
            >${k}</a
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
      ${m?c`<button
            type="button"
            class="detail-summary__chip detail-summary__chip--rec judgement-chip"
            data-chip-key="rec"
            data-state=${m.state}
            aria-expanded=${R?"true":"false"}
            title=${Mi(m)}
            @click=${()=>t.onChipToggle?.("rec")}
          >
            ${"\uBCF5\uC7A1"}
          </button>`:""}
    </div>
    ${T?Lo(T):""}
    <div
      class="detail-summary__gates"
      role="group"
      aria-label="워크플로 게이트"
    >
      ${ik(i).map(D=>ak(D,n,o,{label:D.id==="pr"?k:D.label,href:D.id==="pr"?s:""}))}
    </div>
  </section>`}function ik(e){let n=typeof e=="string"&&Object.hasOwn(Ic,e)&&Ic[e]||Ic.spec_backed;return Jv.filter(r=>n.includes(r.id))}var Ea={on:"\uD1B5\uACFC",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",current:"\uC9C4\uD589 \uC911",none:"\uBBF8\uB3C4\uB2EC"};function ak(e,t,n,r){let o=lk(e,t,n),i=e.fill_stage?n[e.fill_stage]:null,s=typeof i?.fill=="string"?i.fill:null,l=s?s==="full":o.length>0,a=!l&&s==="dim",u=e.stale_stage?n[e.stale_stage]?.stale===!0:!1,d=o&&o.split("@")[1]?.slice(0,7)||"",f=u?Ea.stale:l?Ea.on:a?Ea.current:Ea.none,_=ck(e,n),k=`${r.label} \xB7 ${f}${_?` \xB7 ${_}`:""}${o?` \xB7 ${o}`:""}`,m=`detail-summary__gate${l?" detail-summary__gate--on":""}${a?" detail-summary__gate--current":""}${u?" detail-summary__gate--stale":""}${d?" detail-summary__gate--receipt":""}`,R=c`<span class="detail-summary__gate-label"
      >${r.label}</span
    >
    <span class="detail-summary__gate-rail"></span>
    <span class="detail-summary__gate-sha">${d}</span>`;return r.href?c`<a
      class=${m}
      data-gate=${e.id}
      data-hue=${e.hue}
      href=${r.href}
      target="_blank"
      rel="noreferrer"
      title=${k}
      >${R}</a
    >`:c`<span
    class=${m}
    data-gate=${e.id}
    data-hue=${e.hue}
    title=${k}
    >${R}</span
  >`}function lk(e,t,n){if(e.receipt&&typeof t[e.receipt]=="string")return String(t[e.receipt]);if(e.receipt_stage){let r=n[e.receipt_stage]?.receipt;return typeof r=="string"?r:""}return""}function ck(e,t){if(e.id!=="plan")return"";let n=t.plan?.approval_state;return typeof n=="string"&&Object.hasOwn(e_,n)?e_[n]:""}function Ta(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function r_(e){return Ta(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function o_(e,t){let n=e&&e[t];if(!Ta(n)||!Array.isArray(n.accounts))return null;let r=n.accounts.filter(r_),o=r_(n.active)?n.active:null;return{accounts:r,active:o||r.find(i=>i.active===!0)||null}}function a_(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function Ra(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${a_(e)}${t}`}function zo(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${a_(e)}`}function uk(e,t,n){if(n!==null){let o=e==="claude"?Ra:zo,i=t?t.accounts.find(s=>s.key===n):void 0;return`\uB808\uD3EC \uAE30\uBCF8\uAC12 \uC0AC\uC6A9(${i?o(i):n})`}return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:zo({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function s_(e,t){if(!Ta(e)||e.state!=="usable"||!Ta(e.values))return null;let n=e.values[t];return typeof n=="string"&&n.length>0?n:null}function i_(e){let t=e.provider_key==="claude"?Ra:zo,n=!!e.provider?.accounts.some(r=>r.key===e.selected);return c`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${r=>e.handlers.onExecChange(e.key,r.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${uk(e.provider_key,e.provider,e.workspace_default)}
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
  </div>`}function l_({md:e,catalog:t,workspace_defaults:n=null,handlers:r}){let o=typeof e.claude_account=="string"?e.claude_account:"",i=typeof e.codex_account=="string"?e.codex_account:"";return c`<section class="exec-accounts" data-exec-accounts>
    <div class="detail-section-label">실행 계정</div>
    <div class="exec-settings-core">
      ${i_({key:"claude_account",title:"Claude \uACC4\uC815",provider_key:"claude",provider:o_(t,"claude"),selected:o,workspace_default:s_(n,"claude_account"),handlers:r,hint:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uB7F0\uD0C0\uC784\uC774 claude\uC77C \uB54C \uC801\uC6A9\uB429\uB2C8\uB2E4"})}
      ${i_({key:"codex_account",title:"Codex \uACC4\uC815",provider_key:"codex",provider:o_(t,"codex"),selected:i,workspace_default:s_(n,"codex_account"),handlers:r})}
    </div>
  </section>`}function dk(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function pk(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let n=t[1].trim();return{front:n.length>0?n:null,body:e.slice(t[0].length)}}function Ca(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),o=null,i="loading",s="",l=null,a="";function u(R){R.key==="Escape"&&o&&(R.preventDefault(),k())}document.addEventListener("keydown",u);function d(){return o?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>k()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${o}
              >${dk(o)}</span
            >
            <button
              type="button"
              class="mv__close"
              aria-label="닫기"
              @click=${()=>k()}
            >
              ✕
            </button>
          </div>
          <div class="mv__body">
            ${i==="loading"?c`<div class="mv__status">불러오는 중…</div>`:i==="pending"?c`<div class="mv__status">${a}</div>`:i==="error"?c`<div class="mv__status mv__status--error">
                      ${a||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:c`${l===null?null:c`<pre class="mv__front">
${l}</pre
                        >`}${gr(s)}`}
          </div>
        </div>
      </div>
    `:c``}function f(){lt(d(),e)}async function _(R,T={}){o=R,i="loading",s="",l=null,a="",f();let D=T.workspace||(n?n():"");if(!D){i="error",a="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",f();return}if(!r){i="error",a="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",f();return}let ne="/api/doc?workspace="+encodeURIComponent(D)+"&path="+encodeURIComponent(R);try{let H=await r(ne),P=await H.json().catch(()=>({}));if(!H.ok||!P||P.ok!==!0){if(P?.error==="not_found"&&T.missing_state==="plan_pending"){i="pending",a="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",f();return}i="error",a="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(P&&P.error||H.status)+")",f();return}let O=pk(String(P.content||""));l=O.front,s=O.body,i="ready",f()}catch{i="error",a="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",f()}}function k(){o=null,lt(c``,e)}function m(){document.removeEventListener("keydown",u),k()}return{open:_,close:k,destroy:m}}function d_(e){if(!e||typeof e.price_basis!="string")return"";let t=e.price_basis;if(!(t in dl))return"";let n=dl[t];if(t==="none")return c`<span class="detail-session__price detail-session__price--none"
      >${n}</span
    >`;let r=$o({total_cost_usd:e.price_usd,cost_estimated:t==="estimated"});return r.length===0?"":c`<span class="detail-session__price" title=${r.join(`
`)}
    >${r[0]}${n?` ${n}`:""}</span
  >`}var fk=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],p_="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Oa=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],_k=new Set(["codex-runner","Explore","Plan","advisor","advisor-xhigh","claude-code-guide","statusline-setup"]);function c_(e){return typeof e=="string"&&_k.has(e)}var mk=["running","done","failed","interrupted"],gk={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function hk(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function bk(e){let t=mn(e);if(t.length>0)return t.map(o=>c`<span class="detail-usage-total" title=${o.tooltip}
          >${o.label}</span
        >`);let n=Ao(e);if(!n||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${n.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${p_}
          >부분 집계</span
        >`:""}`}function u_(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function Dc(e){if(typeof e=="number")return Ks(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?Ks(t):""}function yk(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function f_(e,t,n){if(e.provider!=="claude"){let o=e.session_id?` \xB7 thread ${e.session_id}`:"",i=n?" \xB7 \uC774\uC804 \uB77C\uC6B4\uB4DC \uC2A4\uB808\uB4DC \uC774\uC5B4\uAC10":"";return{text:`${n?"\u21A9 ":""}${e.launch_id}`,title:`${e.launch_id}${o}${i}`,thread:e.session_id?{text:e.session_id.slice(0,8),title:e.session_id}:null}}let r=t&&typeof t.agent_id=="string"?t.agent_id:"";return r.length>0?{text:r.slice(0,8),title:r,thread:null}:{text:e.launch_id.slice(-8),title:e.launch_id,thread:null}}function __(e){return e?c`<span
        class="detail-session__leg-thread detail-session__sid"
        title=${e.title}
        >${e.text}</span
      >`:""}function Lc(e){return e===null||typeof e=="string"&&e.trim().length>0}function Pc(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function vk(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,n=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!Oa.some(r=>r.role===t.role&&r.provider===t.provider)||!(n?Lc(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||Lc(t.effort))||!(!("agent_type"in t)||Lc(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!mk.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:n?!Pc(t.started_at)||!Pc(t.last_event_at)||!Pc(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function kk(e,t,n,r){let i=mn({providers:{[t]:{subtotal:n.subtotal,breakdown:n.usage,...n.replayed?{replayed:!0}:{}}},roles:{}})[0],s=f_({provider:t,launch_id:n.receipt_id,session_id:typeof n.session_id=="string"?n.session_id:void 0},n,r);return c`<div class="detail-session__leg detail-session__usage-detail">
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
    ${__(s.thread)}
    ${Dc(n.completed_at)?c`<span class="detail-session__leg-time detail-session__time"
          >${Dc(n.completed_at)}</span
        >`:""}
    ${i?c`<span class="detail-session__usage" title=${i.tooltip}
          >${i.label}</span
        >`:""}${d_(n)}
  </div>`}function wk(e,t,n,r,o){let i=e.status==="running"?null:t,l=(i?mn({providers:{[e.provider]:{subtotal:i.subtotal,breakdown:i.usage,...i.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],a=e.status==="running"?Ks(e.last_event_at):i?Dc(i.completed_at):"",u=(e.provider==="claude"?["Claude",e.agent_type,yk(e.model),e.effort]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),d=f_(e,i,o);return c`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>r.onOpenDelegation&&r.onOpenDelegation(n,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${gk[e.status]}</span
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
    ${__(d.thread)}
    ${a?c`<span class="detail-session__leg-time detail-session__time"
          >${a}</span
        >`:""}
    ${l?c`<span class="detail-session__usage" title=${l.tooltip}
          >${l.label}</span
        >`:""}${d_(i)}
  </button>`}function $k(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}function xk(e,t,n){let r=[],o=new Set,i=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let f of i){let _=vk(f);!_||o.has(_.launch_id)||c_(_.agent_type)||(o.add(_.launch_id),r.push(_))}r.sort((f,_)=>(f.started_at||0)-(_.started_at||0));let s={};for(let{role:f,provider:_}of Oa){let k=t?t.roles[f]?.[_]:null;s[f]=k?[...k.legs]:[]}let l=Oa.flatMap(({role:f})=>s[f]),a=new Set,u=new Set,d=[];for(let{role:f,provider:_}of Oa){for(let k of r.filter(m=>m.role===f&&m.provider===_)){let m=l.find(T=>T.receipt_id===k.launch_id)||null;if(m&&!$k(k,m))continue;m&&a.add(m.receipt_id);let R=_==="codex"&&u.has(k.session_id);d.push(wk(k,m,e.attempt_id,n,R)),_==="codex"&&u.add(k.session_id)}for(let k of s[f])if(!a.has(k.receipt_id)&&!c_(k.agent_type)){let m=typeof k.session_id=="string"&&k.session_id.length>0?k.session_id:null,R=_==="codex"&&m!==null&&u.has(m);d.push(kk(f,_,k,R)),_==="codex"&&m!==null&&u.add(m)}}return d}function Ak(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[...fk,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return c`<div class="detail-session__usage-detail">
    ${r.map(o=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${o.label}</span
          ><span class="detail-session__usage-value"
            >${hk(e[o.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${n===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${n.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${p_}</span>`:""}
  </div>`}var Sk={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Ks(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function Ek(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,r])=>typeof r=="string"&&r.length>0).map(([r,o])=>`${r}=${o}`).join(" \xB7 "):"",n=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${n}</span>
    ${t?c`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}var Tk={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function Rk(e,t){let n=Tk[e.locality]||"",r=e.locality==="remote"?`${e.host} \xB7 \uB2E4\uB978 \uBA38\uC2E0`:e.locality==="missing"?`${e.host} \xB7 \uD30C\uC77C \uC5C6\uC74C`:e.host;return c`<div class="detail-session-row">
    <button
      type="button"
      class="detail-session detail-session--session"
      data-session-key=${ec(e)}
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
  </div>`}function m_(e,t={},n={},r=[]){let o=Array.isArray(e)?e:[],i=Array.isArray(r)?r:[],s=[...i.filter(m=>m&&m.current===!0),...i.filter(m=>m&&m.current!==!0).sort((m,R)=>R.index-m.index)],l=s.map(m=>Rk(m,t)),a=n.expanded||new Set,u=n.catalog||null;if(o.length===0&&s.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let d=new Set;for(let m of o)m&&typeof m.resumed_from=="string"&&m.resumed_from.length>0&&d.add(m.resumed_from);let f=m=>{if(!(m.status==="failed"||m.status==="orphaned"))return"";let T=typeof m.session_id=="string"&&m.session_id.length>0,D=d.has(m.attempt_id),ne=T&&!D,H=T?D?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="op-btn detail-session__resume"
      data-attempt-id=${m.attempt_id}
      ?disabled=${!ne}
      title=${H}
      @click=${P=>{P.stopPropagation(),ne&&t.onResume&&t.onResume(m.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},_=m=>{if(!(m.status==="failed"||m.status==="orphaned")||typeof m.cause!="string"||m.cause==="")return"";let T=m.cause_detail,D=T&&typeof T.reason=="string"&&T.reason.length>0?typeof T.command=="string"&&T.command.length>0?`${T.reason} \xB7 ${T.command}`:T.reason:m.cause;return c`<div class="detail-session__cause" title=${D}>
      ${m.cause}
    </div>`},k=m=>{let R=u_(_l(m,u));if(mn(R).length===0&&!Ao(m.usage))return"";let T=a.has(m.attempt_id);return c`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${m.attempt_id}
      aria-expanded=${T?"true":"false"}
      title=${T?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${D=>{D.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(m.attempt_id)}}
    >
      τ 자세히
    </button>`};return c`
    <div class="detail-section-label">
      세션 이력${bk(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${l}${o.map(m=>{let R=_l(m,u),T=u_(R),D=mn(T);return c`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${m.status||"unknown"}"
            data-attempt-id=${m.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(m.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${Sk[m.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${m.attempt_id}</span>
            ${ps(m)?c`<span
                  class="detail-session__resumed"
                  title=${ps(m)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${On(m)}</span>
            ${D.length>0?c`<span class="detail-session__role">orchestrator</span>`:""}
            ${m.session_id?c`<span class="detail-session__sid" title=${m.session_id}
                  >${String(m.session_id).slice(0,8)}</span
                >`:""}
            ${D.length>0?D.map(ne=>c`<span
                      class="detail-session__usage"
                      title=${ne.tooltip}
                      >${ne.label}</span
                    >`):Ao(m.usage)?c`<span class="detail-session__usage"
                    >${Ao(m.usage)}</span
                  >`:""}
            <span class="detail-session__time">${Ks(m.started_at)}</span>
          </button>
          ${k(m)} ${f(m)} ${_(m)} ${Ek(m)}
          ${a.has(m.attempt_id)&&m.usage?Ak(m.usage,m.runner==="codex"?"codex":"claude"):""}
          ${xk(m,R,t)}
        </div>`})}
    </div>
  `}function g_(e,t={}){return c`
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
          ${Ck(e)}
        </div>`:""}
  `}function Ck(e){let t=Wo(e);if(t)return t;let n=e.data;if(!n)return"";if(n.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof n.default_task_prompt=="string"?hr("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=Aa(n.recorded_at);return c`<div class="detail-prompt__meta">
      ${n.attempt_id}${r?` \xB7 ${r}`:""}
    </div>
    ${typeof n.task_prompt=="string"?hr("\uACFC\uC5C5 (user)",n.task_prompt):""}
    ${typeof n.system_prompt=="string"?hr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",n.system_prompt):""}`}var ao=10;function h_(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}function b_(e,t={}){let r=(Array.isArray(e?.events)?e.events:[]).filter(l=>l&&typeof l.summary=="string"&&l.summary.trim().length>0);if(r.length===0)return"";let o=typeof e.shown=="number"&&e.shown>0?e.shown:ao,i=r.slice(0,o),s=r.length-i.length;return c`
    <div class="detail-section-label">Worker 이력 (${r.length})</div>
    <ol class="detail-timeline" data-seam="worker-timeline">
      ${i.map(l=>c`<li class="detail-timeline__row">
            ${h_(l.at)?c`<span class="detail-timeline__at"
                  >${h_(l.at)}</span
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
  `}var Ok=["open","in_progress","deferred","resolved","closed"],Ik=[0,1,2,3,4];function y_(e,t){let n=t.issueStores,r=t.onClose,o=t.transport,i=t.onNavigate,s=t.queueStore,l=t.execPresetStore,a=t.sessionLogStore,u=null,d=null,f={},_="",k=!1,m=[],R=!1,T=!1,D={},ne={claude:null,codex:null},H=null,P=null,O=0,q=!1,F=!1,z="",B="",N="",V="",W=!1;function oe(){q=!1,F=!1,z="",B="",N="",V="",W=!1}function fe(){ne={claude:null,codex:null},H=null,P=null,O+=1}async function Pe(){if(!o)return null;try{let w=await Promise.resolve(o("get-workspace-accounts",{}));return w&&typeof w.state=="string"?w:null}catch{return null}}async function G(w){try{let M=await fetch(w);if(!M.ok)return null;let j=await M.json();if(!j||typeof j!="object"||!Array.isArray(j.accounts))return null;let $e=j.accounts.filter(Ge=>Ge!==null&&typeof Ge=="object"&&!Array.isArray(Ge));return{accounts:$e,active:$e.find(Ge=>Ge.active===!0)||null}}catch{return null}}async function se(w){P=w;let M=++O,[j,$e,Ge]=await Promise.all([G("/api/claude-usage"),G("/api/codex-usage"),Pe()]);M!==O||w!==u||(ne={claude:j,codex:$e},H=Ge,rt())}let _e=[],Oe=null,Q=null,ce=!1,J="",Se=!1,be=0,me=new Set;function L(){_e=[],Oe=null,Q=null,ce=!1,J="",Se=!1,be+=1,me.clear()}async function ee(w){if(!o)return;let M=++be;try{let j=await Promise.resolve(o("get-comments",{id:w}));if(M!==be||w!==u)return;_e=Array.isArray(j)?j:[],ce=!1}catch{if(M!==be||w!==u)return;ce=!0}rt()}function Re(){if(!o||!u)return;let w=d&&typeof d.comment_count=="number"?d.comment_count:null;if(Oe!==u){Oe=u,Q=w,ee(u);return}w!==null&&w!==Q&&(Q=w,ee(u))}function I(w){me.has(w)?me.delete(w):me.add(w),rt()}function ae(w){let M=J.trim().length===0;J=w,M!==(w.trim().length===0)&&rt()}async function le(){let w=J.trim();if(!o||!u||w.length===0||Se)return;let M=u;Se=!0,rt();let j=!1;try{let $e=await Promise.resolve(o("add-comment",{id:M,text:w}));Array.isArray($e)&&$e.length>0&&(j=!0,M===u&&(_e=$e,ce=!1,J="",Q=$e.length))}catch{j=!1}j||ve("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),M===u&&(Se=!1),rt()}let Y={onToggle:I,onDraftInput:ae,onSubmit:le},Ae=t.mdViewer||null,ge=null;Ae||(ge=document.createElement("div"),ge.className="md-viewer-root",document.body.appendChild(ge));let Le=Ae||Ca(ge,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),qe=document.createElement("div");qe.className="session-log-root",document.body.appendChild(qe);let Ze=Ho(qe,{transport:o?(w,M)=>Promise.resolve(o(w,M)):void 0,sessionLogStore:a}),ze=!1,ie=!1,Z=!1,Ie=null,tt=null,st=0;function Qe(w){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${w}`}function ct(){ze=!1,ie=!1,Z=!1,Ie=null,tt=null,st+=1}async function $t(w){if(!o)return;let M=++st;ie=!0,Z=!1,rt();try{let j=await Promise.resolve(o("get-bead-prompt",{bead_id:w}));if(M!==st)return;!j||typeof j!="object"||Array.isArray(j)?Z=!0:(Ie=j,tt=Qe(w))}catch{M===st&&(Z=!0)}finally{M===st&&(ie=!1,rt())}}let mt=[],Xe=null,gt=0;function Zt(w,M){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${w}::${M}`}function A(){mt=[],Xe=null,gt+=1}async function re(w,M){if(!o)return;let j=++gt,$e;try{$e=await Promise.resolve(o("get-session-refs",{bead_id:w}))}catch{$e=null}j!==gt||M!==Xe||(mt=$e&&Array.isArray($e.sessions)?$e.sessions:[],rt())}function Me(){if(!o||!u)return;let w=d&&d.metadata,M=w&&typeof w=="object"&&typeof w.session_ref=="string"?w.session_ref:null;if(M===null){A();return}let j=Zt(u,M);Xe!==j&&(mt=[],Xe=j,re(u,j))}let Ce=[],Fe=[],Ue=ao,dt=null,St=0;function de(w){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${w}`}function ke(){Ce=[],Fe=[],Ue=ao,dt=null,St+=1}async function He(w,M){if(!o)return;let j=++St,$e;try{$e=await Promise.resolve(o("get-bead-timeline",{bead_id:w}))}catch{$e=null}j!==St||M!==dt||(Ce=$e&&Array.isArray($e.events)?$e.events:[],Fe=$e&&Array.isArray($e.attempts)?$e.attempts:[],Ue=ao,rt())}function it(){if(!o||!u)return;let w=de(u);dt!==w&&(Ce=[],Fe=[],Ue=ao,dt=w,He(u,w))}function nt(){Ue+=ao,rt()}function pt(){if(ze=!ze,ze&&u&&tt!==Qe(u)){Ie=null,$t(u);return}rt()}function yt(){let w={};for(let j of Fe)j&&typeof j=="object"&&j.bead_id===u&&(w[String(j.attempt_id)]=j);let M=s?s.get():null;for(let j of M&&M.attempts?Object.values(M.attempts):[]){let $e=j;$e&&$e.bead_id===u&&(w[String($e.attempt_id)]=$e)}return w}function et(){return u?Object.values(yt()).sort((M,j)=>(j.started_at||0)-(M.started_at||0)).map(M=>({attempt_id:M.attempt_id,bead_id:M.bead_id,status:M.status,started_at:typeof M.started_at=="number"?M.started_at:null,runner:M.runner||null,model:M.model||null,effort:M.effort||M.observed_effort||null,speed:M.speed||null,session_id:M.session_id||null,resumed_from:M.resumed_from||null,continuation_mode:M.continuation_mode||null,dismissed_at:typeof M.dismissed_at=="number"?M.dismissed_at:null,cause:typeof M.cause=="string"?M.cause:null,cause_detail:M.cause_detail||null,exec_default_preset_id:typeof M.exec_default_preset_id=="string"?M.exec_default_preset_id:null,exec_default_preset_revision:typeof M.exec_default_preset_revision=="number"?M.exec_default_preset_revision:null,exec_values:M.exec_values&&typeof M.exec_values=="object"?M.exec_values:null,usage:M.usage||null,usage_legs:Array.isArray(M.usage_legs)?M.usage_legs:[],delegation_sessions:Array.isArray(M.delegation_sessions)?M.delegation_sessions:[]})):[]}function Ne(){return u?cr(yt(),u,kt()):null}let S=new Set;function U(w){S.has(w)?S.delete(w):S.add(w),rt()}function K(w){let M=s?s.get():null,j=M&&M.attempts?M.attempts[w]:null;Ze.open({attempt_id:w,meta:j?{runner:j.runner||void 0,model:j.model||void 0,effort:j.effort||void 0,status:j.status||void 0,session_id:j.session_id||void 0}:{}})}function we(w,M){let j=s?s.get():null,$e=j&&j.attempts?j.attempts[w]:null,ut=($e&&Array.isArray($e.delegation_sessions)?$e.delegation_sessions:[]).find(Nt=>Nt&&typeof Nt=="object"&&Nt.launch_id===M);ut&&Ze.open({attempt_id:w,launch_id:M,meta:{runner:ut.provider==="claude"?"claude":"codex",role:ut.role,...typeof ut.agent_type=="string"?{agent_type:ut.agent_type}:{},model:ut.model,effort:ut.effort,session_id:ut.session_id,status:ut.status}})}async function Ee(w){if(!o||!w)return;let M=o,j=()=>{let Ge=s?s.get():null;return Ge&&typeof Ge.revision=="number"?Ge.revision:0},$e=s?.get()?.attempts?.[w]||null;await jo({context:{bead_id:$e?.bead_id||u||"",kind:"session",tuple:$e?On($e):""},transport:Ge=>M("worker-attempt-resume",{attempt_id:w,expected_revision:j(),...Ge}),adopt:Ge=>{Ge?.queue&&s?.set&&s.set(Ge.queue)}})}async function ft(w,M){if(!o||!w)return;let j=o,$e=()=>{let bt=s?s.get():null;return{bead_id:w,...M==="parallel"?{}:{lane:M},expected_revision:bt&&typeof bt.revision=="number"?bt.revision:0}},Ge=bt=>{bt?.queue&&s?.set&&s.set(bt.queue)},ut=await Promise.resolve(j("worker-queue-place",$e()));if(Ge(ut),ut&&ut.conflict&&(ut=await Promise.resolve(j("worker-queue-place",$e())),Ge(ut)),rt(),!ut)return;if(ut.applied===!1&&typeof ut.admission_reason=="string"){ve(`\uB300\uAE30 \uC801\uC7AC \uAC70\uBD80: ${ut.admission_reason}`,"error",2400);return}if(ut.reason==="rejected"){ve("\uB300\uAE30 \uC801\uC7AC \uAC70\uBD80: rejected","error",2400);return}if(ut.applied===!1)return;let Nt=ut.queue?hs({id:w},ut.queue).location:null;Nt&&"index"in Nt&&ve(`${Jd(Nt.lane)} \uB300\uAE30 #${Nt.index+1}\uC5D0 \uCD94\uAC00`,"success",2400)}function vt(w,M){if(M){T=!0,rt();return}ft(w,"parallel")}function xt(w,M){let Ge=(w.target?.closest?.(".worker-card__place-lane")||null)?.dataset.lane;Ge&&(Ge!=="parallel"&&!/^s[1-5]$/.test(Ge)||(T=!1,rt(),ft(M,Ge)))}function Ct(w){!w||!u||Ze.open(Fo(w,u,d&&d.status))}let qt={onOpen:K,onOpenDelegation:we,onResume:Ee,onToggleUsage:U,onOpenSessionRef:Ct,onCopyResumeCommand:Tt};function Kt(){let w=s?s.get():null,M={...D};for(let j of[...Fn,...Eo]){let $e=w&&w[j];typeof $e=="string"&&(M[j]=$e)}return M}async function en(){if(o){try{let w=await Promise.resolve(o("get-session-defaults",{}));D=w&&w.values&&typeof w.values=="object"?w.values:{}}catch{D={}}rt()}}function kt(){let w=s?s.get():null;return w&&w.runner_catalog||null}function an(){let w=s?s.get():null;return w&&typeof w.execution_defaults=="object"?w.execution_defaults:null}function un(){let w=d?.metadata&&typeof d.metadata=="object"?d.metadata:{},j=Cn({pin:{...w,...f},global:Kt(),execution_defaults:an(),runner_catalog:kt(),route:typeof w.route=="string"?w.route:null}).orchestration_model.value||"";return Bn(kt(),j)}function Lt(){let w=l?l.get():null;return!w||typeof w.revision!="number"?null:{revision:w.revision,presets:Array.isArray(w.presets)?w.presets:[]}}function jt(w){return w?.compatible===!1}function Vt(w){l&&w&&typeof w.revision=="number"&&Array.isArray(w.presets)&&l.set({revision:w.revision,presets:w.presets})}async function Be(){let w=Lt(),M=w?.presets.find(j=>j.id===_);if(!(!o||!u||!w||!M||jt(M)||k)){k=!0,m=[],rt();try{let j=await Promise.resolve(o("apply-impl-preset",Md(u,M.id,w.revision)));if(j&&j.conflict){Vt(j),ve("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let $e=j&&Array.isArray(j.issue)?j.issue[0]:j?.issue;if(j&&j.applied&&$e&&typeof $e=="object"){d=$e,m=Array.isArray(j.skipped_orchestration_keys)?j.skipped_orchestration_keys.filter(Ge=>typeof Ge=="string"):[];for(let Ge of Nd)delete f[Ge];ve(m.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}j&&j.error==="bd_readback_failed"?ve("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ve("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(j){j&&typeof j=="object"&&j.code==="bd_readback_failed"?ve("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ve("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{k=!1,rt()}}}let E=null;n&&n.subscribe&&(E=n.subscribe(()=>Ht()));let he=null;s&&typeof s.subscribe=="function"&&(he=s.subscribe(()=>{u&&rt()}));let De=null,ht=null;function Ke(){ht&&(ht(),ht=null)}l&&typeof l.subscribe=="function"&&(De=l.subscribe(()=>{u&&rt()}));function Et(w){w.key==="Escape"&&u&&(w.preventDefault(),r())}document.addEventListener("keydown",Et);let Pt=Io(()=>rt());Pt.attach();function Ht(){if(u){if(n&&typeof n.snapshotFor=="function"){let w=n.snapshotFor("detail:"+u)||[];d=w.find(j=>j&&j.id===u)||w[0]||d}Re(),Me(),it(),rt()}}function Tt(w){kn(w).then(M=>{M?ve("\uBCF5\uC0AC\uB428","success",1200):ve("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function ln(w){w.preventDefault(),w.stopPropagation(),u&&Tt(u)}function Mt(w,M){w.preventDefault(),w.stopPropagation(),Tt(M)}function yn(w,M,j){w.preventDefault(),w.stopPropagation(),Le.open(M,{missing_state:j})}async function v(w,M){let j=Object.hasOwn(f,w),$e=f[w];if(f[w]=M,rt(),!(!o||!u))try{let Ge=await Promise.resolve(o("update-exec-settings",Dd(u,w,M.length===0?null:M))),ut=Array.isArray(Ge)?Ge[0]:Ge;if(!ut||typeof ut!="object"||!ut.id)throw new Error("exec settings readback failed");d=ut,delete f[w],rt()}catch(Ge){throw j?f[w]=$e:delete f[w],rt(),ve("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error"),Ge}}function p(w){w.catch(()=>{})}async function h(w,M){let j=d||{},$e=j.metadata&&typeof j.metadata=="object"?j.metadata:{},Ge={};for(let bt of["impl_runtime","impl_model","impl_effort"])Ge[bt]=Object.hasOwn(f,bt)?f[bt]:typeof $e[bt]=="string"?$e[bt]:"";Ge[w]=M;let ut=Fd(Ge,kt(),un()),Nt={};for(let bt of["impl_runtime","impl_model","impl_effort"])Nt[bt]=f[bt],f[bt]=ut[bt]||"";if(rt(),!(!o||!u))return Promise.resolve(o("update-impl-target",{id:u,...ut,orchestration_runtime:un()})).then(bt=>{let pe=Array.isArray(bt)?bt[0]:bt;if(!pe||typeof pe!="object"||!pe.id)throw new Error("implementation target readback failed");d=pe;for(let at of["impl_runtime","impl_model","impl_effort"])delete f[at];rt()}).catch(bt=>{for(let pe of["impl_runtime","impl_model","impl_effort"])Nt[pe]===void 0?delete f[pe]:f[pe]=Nt[pe];throw rt(),ve("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error"),bt})}async function $(w,M,j){if(!o||!u)return!1;try{let $e=await Promise.resolve(o(w,M)),Ge=Array.isArray($e)?$e[0]:$e;return Ge&&typeof Ge=="object"&&Ge.id?(d=Ge,!0):(ve(j,"error"),!1)}catch($e){return $e&&typeof $e=="object"&&$e.code==="bd_readback_failed"?(ve("\uC800\uC7A5\uB410\uC73C\uB098 \uD655\uC778 \uC2E4\uD328 \u2014 \uACE7 \uAC31\uC2E0\uB429\uB2C8\uB2E4","error"),{ok:!1,saved:!0}):(ve(X(j,$e),"error"),!1)}}function X(w,M){let j=M&&typeof M=="object"&&typeof M.message=="string"?M.message.trim():"";return j.length>0?`${w} \u2014 ${j}`:w}function g(w){setTimeout(()=>{try{let M=e.querySelector(w);M&&typeof M.focus=="function"&&M.focus()}catch{}},0)}function b(){q=!0,z=d&&d.title||"",rt(),g('.detail-edit__input[data-edit="title"]')}function te(w){z=w.target.value}function ye(){q=!1,z="",rt()}function xe(){$("edit-text",{id:u,field:"title",value:z},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(M=>{M===!0&&(q=!1,z=""),rt()})}function We(){F=!0,B=d&&d.description||"",rt(),g('.detail-edit__textarea[data-edit="description"]')}function ot(w){B=w.target.value}function Yt(){F=!1,B="",rt()}function fn(){$("edit-text",{id:u,field:"description",value:B},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(M=>{M===!0&&(F=!1,B=""),rt()})}function Qt(w,M,j,$e){if(w.key==="Escape"){w.stopPropagation(),j();return}w.key==="Enter"&&(!$e||w.ctrlKey||w.metaKey)&&(w.preventDefault(),M())}function dn(w){let M=w.target.value;$("update-status",{id:u,status:M},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>rt())}function In(w){let M=Number(w.target.value);$("update-priority",{id:u,priority:M},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>rt())}function Jt(w){N=w.target.value}function uo(){let w=N.trim();w.length!==0&&$("label-add",{id:u,label:w},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(M=>{M===!0&&(N=""),rt()})}function Ln(w){if(w.key==="Escape"){w.stopPropagation(),N="",rt();return}w.key==="Enter"&&(w.preventDefault(),uo())}function Mr(w){$("label-remove",{id:u,label:w},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>rt())}let Nr={onCopyPath:Mt,onOpenDoc:yn};function x(w){return typeof w=="string"?w:w&&typeof w=="object"?String(w.id||w.to||w.issue_id||w.depends_on||""):""}function y(w){return w&&typeof w=="object"?String(w.dependency_type||w.type||""):""}function C(w){switch(w){case"discovered-from":return{glyph:"\u21A9 ",relation:"\uBC1C\uACAC"};case"parent-child":return{glyph:"\u2338 ",relation:"\uC0C1\uC704"};case"related":return{glyph:"\u2194 ",relation:"\uAD00\uB828"};default:return w.length>0?{glyph:`${w} `,relation:w}:{glyph:"",relation:""}}}function ue(w,M){let j=Te(M),$e=[];return w.length>0&&$e.push(w),j&&$e.push(j),$e.length>0?$e.join(`
`):void 0}function Te(w){if(!w||typeof w!="object")return;let M=typeof w.status=="string"?w.status:"",j=typeof w.title=="string"?w.title:"";return M.length>0&&j.length>0?`${M} \xB7 ${j}`:void 0}function je(){return(t.getWorkspacePath&&t.getWorkspacePath()||"").trim()}function Je(){return t.depCandidates?t.depCandidates():null}async function Ot(w,M,j){let $e=je(),Ge=u;if(!Ge)return;if($e.length===0){ve("\uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}let ut=await $(w,{a:Ge,b:M,view_id:Ge,root_dir:$e},j),Nt=ut===!0||ut!==!1&&ut.saved===!0;Nt&&t.onDepChanged&&t.onDepChanged({type:w,a:Ge,b:M}),w==="dep-add"&&Nt&&(V="",W=!1),rt()}function tn(w){if(!u)return;let M=globalThis.confirm;typeof M=="function"&&!M(`${w}\uAC00 ${u}\uB97C \uB9C9\uB294 \uC5F0\uACB0\uC744 \uB04A\uC744\uAE4C\uC694?`)||Ot("dep-remove",w,"\uC758\uC874 \uD574\uC81C \uC2E4\uD328")}function _t(w){w.disabled||_n(w.bead_id)}function _n(w){Ot("dep-add",w,"\uC758\uC874 \uCD94\uAC00 \uC2E4\uD328")}function Sn(w,M){let j=V.trim();return!uf(j)||j===u||M.includes(j)||w.some($e=>$e.bead_id===j)?null:j}function qr(w){V=w.target.value,W=!0,rt()}function Vn(){W||(W=!0,rt())}function nr(w,M,j){if(w.key==="Escape"){w.stopPropagation(),V="",W=!1,rt();return}w.key==="Enter"&&(w.preventDefault(),M.length===1&&!M[0].disabled?_t(M[0]):j!==null&&_n(j))}function rr(w,M){return c`<div class="detail-dep-add">
      <input
        class="detail-dep-add__input"
        aria-label="막는 이슈 추가"
        placeholder="막는 이슈 추가"
        .value=${V}
        @focus=${Vn}
        @input=${qr}
        @keydown=${j=>nr(j,w,M)}
      />
      ${W||V.length>0?c`<div class="detail-dep-add__list">
            ${w.length===0&&M===null?c`<div class="detail-dep-add__empty">후보 없음</div>`:w.map(j=>c`<button
                      type="button"
                      class="detail-dep-add__cand"
                      data-dep-cand=${j.bead_id}
                      ?disabled=${j.disabled}
                      title=${bn(j.reason)}
                      @click=${()=>_t(j)}
                    >
                      <span class="detail-dep-add__repo"
                        >${j.workspace_name}</span
                      >
                      <span class="detail-dep-add__id"
                        >${j.bead_id}</span
                      >
                      <span class="detail-dep-add__title"
                        >${j.title}</span
                      >
                    </button>`)}
            ${M===null?"":c`<button
                  type="button"
                  class="detail-dep-add__cand"
                  data-dep-cand=${M}
                  data-dep-direct="1"
                  @click=${()=>_n(M)}
                >
                  <span class="detail-dep-add__id">${M}</span>
                  <span class="detail-dep-add__title">직접 추가</span>
                </button>`}
          </div>`:""}
    </div>`}function or(w,M){let j=M.get(w.id),$e=i?c`<button
          type="button"
          class="detail-dep__link"
          title=${bn(w.title)}
          @click=${()=>j===void 0?i(w.id):i(w.id,j)}
        >
          ${w.label}
        </button>`:c`<span class="detail-dep__link" title=${bn(w.title)}
          >${w.label}</span
        >`;return c`<span
      class=${`detail-dep detail-dep--${w.kind}${i?" detail-dep--link":""}`}
      >${$e}${w.kind==="pred"?c`<button
            type="button"
            class="detail-dep__unlink"
            data-dep-b=${w.id}
            aria-label=${"\uC758\uC874 \uD574\uC81C: "+w.id}
            @click=${()=>tn(w.id)}
          >
            ✕
          </button>`:""}</span
    >`}function pn(w){let M=Array.isArray(w.dependencies)?w.dependencies:[],j=Array.isArray(w.dependents)?w.dependents:[],$e=[];for(let pe of M){let at=x(pe);at.length>0&&y(pe)==="blocks"&&$e.push({id:at,label:`\u26D3 ${at}`,kind:"pred",title:ue("\uB9C9\uB294",pe)})}for(let pe of j){let at=x(pe);at.length>0&&y(pe)==="blocks"&&$e.push({id:at,label:`\u2192 ${at}`,kind:"succ",title:ue("\uB9C9\uD788\uB294",pe)})}for(let pe of M){let at=x(pe),Gt=y(pe);if(at.length>0&&Gt!=="blocks"){let nn=C(Gt);$e.push({id:at,label:`${nn.glyph}${at}`,kind:"other",title:ue(nn.relation,pe)})}}let Ge=Je(),ut=new Map;if(Ge)for(let pe of Ge.issues)ut.has(pe.bead_id)||ut.set(pe.bead_id,pe.root_dir);let Nt=Ge&&u?cf(lf(u,Ge),V):[],bt=Sn(Nt,$e.filter(pe=>pe.kind==="pred").map(pe=>pe.id));return c`
      <div class="detail-section-label">의존성</div>
      ${$e.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${$e.map(pe=>or(pe,ut))}
          </div>`}
      ${Ge===null?c`<div class="detail-empty">후보를 불러올 수 없음</div>`:rr(Nt,bt)}
    `}function sr(w){let M=w.metadata||{},j=w.workflow||{},$e=j.stages||{},Ge=$e.spec&&$e.spec.stale,ut=$e.impl&&$e.impl.stale,Nt=j.quick_fix_review?.state==="stale",bt=$e.plan||null,pe=j.route_source==="derived",at=j.route||M.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${pe?" detail-kv__v--derived":""}"
          title=${pe?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${pe?"unset":at}</span
        >
      </div>
      ${j.route!=="quick_fix"||Object.hasOwn(M,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${M.spec_review||"\uC5C6\uC74C"}${Ge?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${j.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${bt?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${bt?.approval_receipt||"\uC5C6\uC74C"}${bt?.approval_state==="stale"?" \xB7 stale":bt?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${j.route!=="quick_fix"||Object.hasOwn(M,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${M.impl_review||"\uC5C6\uC74C"}${ut?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${j.resolver?c`<div class="detail-kv">
            <span class="detail-kv__k">↳ 충돌 해소</span>
            <span
              class="detail-kv__v detail-kv__v--resolver detail-kv__v--wrap"
              title=${`resolver-self:${j.resolver.attempt} \xB7 ${j.resolver.prior_sha} \u2192 ${j.resolver.sha}`}
              >${`${j.resolver.prior_sha.slice(0,7)} \u2192 ${j.resolver.sha.slice(0,7)}`}</span
            >
          </div>`:""}
      ${j.route==="quick_fix"||Object.hasOwn(M,"quick_fix_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">quick_fix_review</span>
            <span class="detail-kv__v"
              >${M.quick_fix_review||"\uC5C6\uC74C"}${Nt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${j.planned_execution?c`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${j.planned_execution.kind}</span>
            </div>
            ${j.planned_execution.kind==="main"?c`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${j.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${j.exec_receipt?c`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${ar(j.exec_receipt)}</span
            >
          </div>`:""}
      ${j.impl_entry?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${j.impl_entry.actor}@${j.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${M.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${M.pr_url}</span>
          </div>`:""}
    `}let br={route:["quick_fix","spec_backed","full_plan"]};async function yr(w,M){let j=M.target.value;if(w==="route"&&d&&d.metadata&&d.metadata.route==="full_plan"&&j!=="full_plan"&&!window.confirm(`full_plan \u2192 ${j||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){rt();return}await $("update-workflow-meta",{id:u,key:w,value:j},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),rt()}function jr(w){let M=w.metadata||{};return c` ${(($e,Ge)=>{let ut=br[$e],Nt=typeof M[$e]=="string"?M[$e]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${$e}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${$e}
          data-edit=${`wfmeta-${$e}`}
          @change=${bt=>yr($e,bt)}
        >
          <option value="" ?selected=${!ut.includes(Nt)}>
            ${Ge}
          </option>
          ${ut.map(bt=>c`<option value=${bt} ?selected=${Nt===bt}>${bt}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function Ve(w,M){return q?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${z}
            @input=${te}
            @keydown=${j=>Qt(j,xe,ye,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${xe}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${ye}
            >
              취소
            </button>
          </div>
        </div>
      `:c`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${w}</h2>
        ${mn(M).map(j=>c`<span class="detail-usage-total" title=${j.tooltip}
              >${j.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${b}
        >
          ✎
        </button>
      </div>
    `}function Ut(w){let M=Xt(w.created_at),j=Xt(w.updated_at);return!M&&!j?c``:c`
      ${M?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${M}</span>
          </div>`:""}
      ${j?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${j}</span>
          </div>`:""}
    `}function Rn(w,M){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${dn}
        >
          ${Ok.map(j=>c`<option value=${j} ?selected=${j===w}>${j}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${In}
        >
          ${Ik.map(j=>c`<option value=${String(j)} ?selected=${j===M}>
                P${j}
              </option>`)}
        </select>
      </div>
    `}function Vo(w){return c`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${F?"":c`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${We}
            >
              ✎
            </button>`}
      </div>
      ${F?c`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${B}
              @input=${ot}
              @keydown=${M=>Qt(M,fn,Yt,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${fn}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${Yt}
              >
                취소
              </button>
            </div>
          </div>`:c`<div class="detail-overlay__desc">
            ${w||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function Yo(w){let M=typeof w.notes=="string"?w.notes:"";return M.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${M}</div>
    `}function Xs(w){let M=Array.isArray(w.labels)?w.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${M.map(j=>c`<span class="detail-label-chip"
              >${j}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${j}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+j}
                @click=${()=>Mr(j)}
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
            @input=${Jt}
            @keydown=${Ln}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${uo}
          >
            추가
          </button>
        </span>
      </div>
    `}function Zs(){if(!u)return c``;let w=d||{},M=String(w.id||u),j=w.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",$e=Ne(),Ge=w.status||"open",ut=typeof w.priority=="number"?Math.max(0,Math.min(4,w.priority)):"",Nt=w.description||"",bt=s?s.get():null,pe=bt&&Ge!=="closed"?hs({...w,id:M},bt):null,at=bt?bs(bt):null,Gt={...w,metadata:{...w.metadata||{},...f}};return c`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${()=>r()}></div>
        <div class="detail-overlay__panel">
          <div class="detail-overlay__bar">
            <button
              type="button"
              class="detail-overlay__id"
              title="ID 복사"
              @click=${ln}
            >
              ${M}
            </button>
            ${pe?c`<button
                  type="button"
                  class="op-btn op-btn--primary detail-overlay__place"
                  data-bead-id=${M}
                  ?disabled=${!pe.placeable}
                  title=${Xr(pe)}
                  @click=${()=>vt(M,at)}
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
          ${pe&&T&&at?c`<div
                class="place-menu detail-overlay__place-menu"
                @click=${nn=>xt(nn,M)}
              >
                ${Il(at,M)}
                <button
                  type="button"
                  class="op-btn op-btn--icon worker-card__place-cancel"
                  data-bead-id=${M}
                  title="레인 선택 취소"
                  aria-label="레인 선택 취소"
                  @click=${()=>{T=!1,rt()}}
                >
                  ✕
                </button>
              </div>`:""}
          ${Ve(j,$e)}
          ${n_(Gt,{onChipToggle:nn=>Pt.toggle({bead_id:M,chip_key:nn}),isChipOpen:nn=>Pt.isOpen({bead_id:M,chip_key:nn})})}
          ${t_({metadata:Gt.metadata,workspace_values:Kt(),catalog:kt(),execution_defaults:an(),expanded:R,presets:Lt()?.presets||[],preset_id:_,preset_busy:k,skipped_orchestration_keys:m},{onToggle:nn=>{R=nn,rt()},onEdit:(nn,Js)=>{if(nn==="impl_runtime"||nn==="impl_model"||nn==="impl_effort"){p(h(nn,Js??""));return}p(v(nn,Js??""))},onPresetSelect:nn=>{_=nn,m=[],rt()},onPresetApply:()=>{Be()}})}
          ${l_({md:Gt.metadata,catalog:ne,workspace_defaults:H,handlers:{onExecChange:(nn,Js)=>p(v(nn,Js))}})}
          ${Rn(Ge,ut)} ${Ut(w)}
          ${Vo(Nt)}
          ${Xf(_e,Y,{expanded:me,draft:J,sending:Se,error:ce})}
          ${Yo(w)} ${Xs(w)} ${pn(w)}
          ${sr(w)} ${jr(w)}
          ${Gf(w,Nr)}
          ${g_({expanded:ze,loading:ie,error:Z,data:Ie},{onToggle:pt})}
          ${m_(et(),qt,{total:$e,expanded:S,catalog:kt()},mt)}
          ${b_({events:Ce,shown:Ue},{onMore:nt})}
        </div>
      </div>
    `}function rt(){lt(Zs(),e)}return{load(w){w!==u&&(f={},T=!1,_="",m=[],R=!1,oe(),L(),ct(),A(),ke(),fe()),u=w,d=null,!ht&&t.subscribeCandidates&&(ht=t.subscribeCandidates(()=>{u&&rt()})),Ht(),en(),P!==w&&se(w)},clear(){u=null,d=null,f={},T=!1,_="",k=!1,m=[],R=!1,oe(),L(),ct(),A(),ke(),fe(),Ke(),Le.close(),Ze.close(),lt(c``,e)},destroy(){E&&(E(),E=null),he&&(he(),he=null),De&&(De(),De=null),Ke(),document.removeEventListener("keydown",Et),Pt.detach(),Ae||(Le.destroy(),ge&&ge.parentNode&&ge.parentNode.removeChild(ge)),Ze.destroy(),qe.parentNode&&qe.parentNode.removeChild(qe),u=null,d=null,fe(),_="",k=!1,m=[],L(),ct(),A(),ke(),lt(c``,e)}}}function v_(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),o=t.querySelector("#fatal-error-detail"),i=t.querySelector("#fatal-error-reload"),s=t.querySelector("#fatal-error-close"),l=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},a=(u,d,f="")=>{n&&(n.textContent=u||"Unexpected Error"),r&&(r.textContent=d||"An unrecoverable error occurred.");let _=typeof f=="string"?f.trim():"";if(o&&(_.length>0?(o.textContent=_,o.removeAttribute("hidden")):(o.textContent="No additional diagnostics available.",o.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return i&&i.addEventListener("click",()=>{window.location.reload()}),s&&s.addEventListener("click",()=>l()),t.addEventListener("cancel",u=>{u.preventDefault(),l()}),{open:a,close:l,getElement(){return t}}}var Lk="(max-width: 640px)";function Ia(e){if(typeof window.matchMedia!="function")return e(!1),()=>{};let t=window.matchMedia(Lk),n=!!t.matches;e(n);let r=o=>{let s=!!(typeof o=="object"&&o!==null&&typeof o.matches=="boolean"?o.matches:t.matches);s!==n&&(n=s,e(s))};return typeof t.addEventListener=="function"?(t.addEventListener("change",r),()=>{t.removeEventListener("change",r)}):typeof t.addListener=="function"?(t.addListener(r),()=>{typeof t.removeListener=="function"&&t.removeListener(r)}):()=>{}}function Pk(){return{lanes:{done:!0},areas:{}}}function Gs(e){let t={};if(typeof e!="object"||e===null)return t;for(let[n,r]of Object.entries(e))typeof r=="boolean"&&(t[n]=r);return t}function Dk(e){try{let t=window.localStorage.getItem(e);if(!t)return null;let n=JSON.parse(t);if(typeof n!="object"||n===null)return null;let r=n;return typeof r.lanes=="object"&&r.lanes!==null?{lanes:Gs(r.lanes),areas:Gs(r.areas)}:{lanes:Gs(r),areas:{}}}catch{return null}}function k_(e,t){try{window.localStorage.setItem(e,JSON.stringify(t))}catch{}}function La(e,t=Pk()){let n={lanes:Gs(t.lanes),areas:Gs(t.areas)},r=Dk(e),o={lanes:{...n.lanes,...r?r.lanes:{}},areas:{...n.areas,...r?r.areas:{}}};return{isCollapsed(i){return o.lanes[i]===!0},isAreaCollapsed(i){return o.areas[i]===!0},toggle(i){let s=o.lanes[i]!==!0;return o={...o,lanes:{...o.lanes,[i]:s}},k_(e,o),s},toggleArea(i){let s=o.areas[i]!==!0;return o={...o,areas:{...o.areas,[i]:s}},k_(e,o),s}}}function Mc(e){if(typeof e=="string"&&e.length>0)return e;if(e&&typeof e=="object"){let t=e;if(typeof t.message=="string"&&t.message.length>0)return t.message;if(typeof t.error=="string"&&t.error.length>0)return t.error;if(t.error&&typeof t.error=="object"&&typeof t.error.message=="string")return t.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}function Pa(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"&&t.length>0):[]}function Da(e){let{transport:t,console_el:n,getLanes:r,getWorkspaces:o,getCrossLanes:i,reproject:s,onCorrection:l,showToast:a,requestRender:u,adoptQueue:d,onDragBegin:f,candidate_drop:_}=e,k=[],m=null,R=!1,T=null,D=null,ne=null;function H(){T!==null&&clearTimeout(T),T=setTimeout(()=>{T=null,R=!1},0)}function P(){return i()??null}function O(){let I=new Map,ae=o();for(let le of Array.isArray(ae)?ae:[]){if(!le||typeof le!="object")continue;let Y=le.bead_blocked_by&&typeof le.bead_blocked_by=="object"?le.bead_blocked_by:{};for(let[Ae,ge]of Object.entries(Y))Array.isArray(ge)&&I.set(Ae,Pa(ge));for(let Ae of[...Array.isArray(le.runnable)?le.runnable:[],...Array.isArray(le.session_active)?le.session_active:[]])Ae&&typeof Ae.bead_id=="string"&&Array.isArray(Ae.blocked_by)&&Ae.blocked_by.length>0&&I.set(Ae.bead_id,Pa(Ae.blocked_by))}return I}function q(){let I=new Map,ae=new Map,le=o();for(let Y of Array.isArray(le)?le:[]){if(!Y||typeof Y!="object")continue;let Ae=Y.bead_blocked_by&&typeof Y.bead_blocked_by=="object"?Y.bead_blocked_by:{};for(let[ge,Le]of Object.entries(Ae))Array.isArray(Le)&&I.set(ge,Pa(Le));for(let ge of Array.isArray(Y.runnable)?Y.runnable:[])ge&&typeof ge.bead_id=="string"&&Array.isArray(ge.blocked_by)&&ae.set(ge.bead_id,Pa(ge.blocked_by))}for(let Y of k)for(let Ae of[I,ae]){let ge=Ae.get(Y.a);ge!==void 0&&Ae.set(Y.a,Y.type==="dep-remove"?ge.filter(Le=>Le!==Y.b):ge.includes(Y.b)?ge:[...ge,Y.b])}return{snapshot:I,runnable:ae}}function F(){let I=O();for(let ae of k){let le=(I.get(ae.a)||[]).slice();ae.type==="dep-remove"?I.set(ae.a,le.filter(Y=>Y!==ae.b)):le.includes(ae.b)||I.set(ae.a,[...le,ae.b])}return I}function z(I=r(),ae=P()){let le=new Map;for(let ze of Array.isArray(ae?.lanes)?ae.lanes:[]){let ie=new Map;for(let Z of Array.isArray(ze?.entries)?ze.entries:[])Z&&typeof Z.bead_id=="string"&&ie.set(Z.bead_id,Z.dep_created_by_lane===!0);le.set(typeof ze?.id=="string"?ze.id:"",ie)}let Y=new Map,Ae=new Map,ge=new Set,Le=new Set;for(let ze of I.chain_lanes){let ie=le.get(ze.lane_id);Y.set(ze.lane_id,{status:ze.status,entries:ze.rows.map((Z,Ie)=>({bead_id:Z.id,root_dir:Z.root_dir,...Ie===0?{}:{dep_created_by_lane:ie?.get(Z.id)===!0}}))});for(let Z of ze.rows)Ae.set(Z.id,ze.lane_id),Z.fixed&&ge.add(Z.id),Z.unplaced||Le.add(Z.id)}let qe=new Map;for(let ze of I.parallel_rows)typeof ze.queue_index=="number"&&qe.set(ze.id,ze.queue_index);for(let ze of I.queue_groups)for(let ie of ze.sublanes.serial)for(let Z of ie.items)typeof Z.queue_index=="number"&&qe.set(Z.id,Z.queue_index);let Ze=q();return{blocked_by_map:F(),snapshot_blocked_by:Ze.snapshot,runnable_blocked_by:Ze.runnable,owner_of:new Map(Object.entries(I.owner_of)),cross_lanes:Y,owner_lane_of:Ae,fixed_members:ge,placed_members:Le,parallel_rows:I.parallel_rows.map(ze=>({bead_id:ze.id,root_dir:ze.root_dir,queue_index:ze.queue_index??0})),parallel_raw_length:new Map(Object.entries(I.parallel_raw_length)),queue_index_of:qe}}function B(I,ae){let le=r();for(let Ae of[...le.runnable,...le.queue,...le.running,...le.pr_wait,...le.done])if(!(Ae.non_occupying||Ae.id!==ae)){if(Ae.root_dir===I)return Ae.expected_revision;break}let Y=le.queue_groups.find(Ae=>Ae.root_dir===I);return Y?Y.revision:0}async function N(I,ae,le,Y){if(!t)return null;let ge=await t(I,{...ae,...le?{root_dir:le}:{},expected_revision:Y});if(ge&&ge.conflict){ge.queue&&d?.(le,ge.queue);let Le=ge.queue&&typeof ge.queue.revision=="number"?ge.queue.revision:Y;ge=await t(I,{...ae,...le?{root_dir:le}:{},expected_revision:Le})}return ge&&ge.queue&&d?.(le,ge.queue),ge}async function V(I,ae,le,Y,Ae){try{let ge=await N(I,ae,le,Y.get(le)??B(le,Ae.bead_id));return!ge||typeof ge.applied!="boolean"?(a("\uD050 \uC694\uCCAD\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error"),null):(ge.queue&&typeof ge.queue.revision=="number"&&Y.set(le,ge.queue.revision),ge.conflict?(a("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null):ge.applied===!1?(a(ge.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${ge.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null):ge.queue&&typeof ge.queue.revision=="number"?ge.queue.revision:Y.get(le)??0)}catch(ge){return a(Mc(ge),"error"),null}}async function W(I,ae,le=new Map){if(I.type==="worker-queue-disarm"){try{let Y=await N(I.type,I.payload,I.root_dir,le.get(I.root_dir)??B(I.root_dir,ae));Y&&Y.queue&&typeof Y.queue.revision=="number"&&le.set(I.root_dir,Y.queue.revision)}catch{}return!0}if(I.type==="worker-queue-place"||I.type==="worker-queue-reorder"||I.type==="worker-queue-remove")return await V(I.type,I.payload,I.root_dir,le,{bead_id:ae})!==null;try{return(I.type==="dep-add"||I.type==="dep-remove")&&t&&await t(I.type,{a:I.a,b:I.b,...I.root_dir?{root_dir:I.root_dir}:{}}),!0}catch(Y){return a(Mc(Y),"error"),!1}}function oe(I){(I.type==="dep-add"||I.type==="dep-remove")&&(k=[...k,{type:I.type,a:I.a,b:I.b}])}async function fe(I,ae){if(!t)return{ok:!1};try{let le=await t(I.type,{...I.payload,expected_revision:ae});return!le||typeof le.revision!="number"?(a("\uC5F0\uACB0 \uB808\uC778 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{ok:!1}):{ok:!0,revision:le.revision}}catch(le){let Y=le,Ae=Y&&Y.code==="conflict"?Y.details?.cross_lanes:null;return Ae&&typeof Ae.revision=="number"&&Array.isArray(Ae.lanes)?{ok:!1,conflict:Ae}:(a(Mc(le),"error"),{ok:!1})}}async function Pe(I,ae,le){let Y=new Map,Ae=[],ge=I.ops.slice(0,I.lane_op_index),Le=I.ops.slice(I.lane_op_index);for(let Ze of ge){if(!await W(Ze,le,Y))return{done:!0};oe(Ze)}let qe=ae;for(let Ze of I.lane_ops){if(qe===null)return a("\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{done:!0};let ze=await fe(Ze,qe);if(!ze.ok)return ze.conflict?{done:!1,conflict:ze.conflict}:{done:!0};qe=ze.revision}for(let Ze of Le){if(!await W(Ze,le,Y))return{done:!0};oe(Ze),Ze.type==="dep-add"&&Ae.push(Ze)}for(let Ze of sf(Ae))qe=await G(Ze,qe);return{done:!0}}async function G(I,ae){if(ae===null||!t)return ae;let le=I.pairs,Y=ae;for(let Ae=0;Ae<2;Ae+=1){if(le.length===0)return Y;try{let ge=await t("monitor-lane-provenance",{lane_id:I.lane_id,pairs:le.map(Le=>({bead_id:Le.bead_id,after:Le.after,value:!0})),expected_revision:Y});return ge&&typeof ge.revision=="number"?ge.revision:Y}catch(ge){let Le=ge,qe=Le&&Le.code==="conflict"?Le.details?.cross_lanes:null;if(!qe||typeof qe.revision!="number"||!Array.isArray(qe.lanes))return Y;let Ze=qe.lanes.find(ze=>ze&&ze.id===I.lane_id);le=af(Array.isArray(Ze?.entries)?Ze.entries:[],le),Y=qe.revision}}return Y}async function se(I,ae,le=[]){k=le,l("",0);let Y=r(),Ae=P();for(let ge=0;;ge+=1){let Le=I(z(Y,Ae));if("refused"in Le){a(Le.refused,"error");break}let qe=await Pe(Le,Y.cross_lanes_revision,ae);if(qe.done){Le.correction&&l(Le.correction.lane_id,Le.correction.corrected);break}if(ge>=1){a("\uB808\uC778\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4","error");break}let Ze=s(qe.conflict);Y=Ze.lanes,Ae=Ze.raw_lanes}k=[],u()}async function _e(I,ae){await se(le=>fa(I,ae,le),I.bead_id)}function Oe(I,ae){let le=ae&&typeof ae.closest=="function"?ae.closest("[data-row-index]"):null;if(le&&I.contains(le)){let Y=Number(le.getAttribute("data-row-index"));return Number.isFinite(Y)?Y:0}return I.querySelectorAll("[data-row-index]").length}function Q(I){let ae=typeof I?.closest=="function"?I.closest(".worker-pane--collapsed[data-lane]"):null;if(!ae)return null;let le=ae.getAttribute("data-lane");return le==="queue"?{zone:ae,target:{kind:"parallel",marker_index:r().parallel_rows.length}}:le==="candidate"&&_===!0?{zone:ae,target:{kind:"candidate"}}:null}function ce(I){let ae=I.target;if(!m)return null;let le=typeof ae?.closest=="function"?ae.closest("[data-drop]"):null;if(!le)return Q(ae);let Y=le.getAttribute("data-drop");if(Y==="candidate")return{zone:le,target:{kind:"candidate"}};if(Y==="parallel")return{zone:le,target:{kind:"parallel",marker_index:Oe(le,ae)}};if(Y==="chain")return{zone:le,target:{kind:"chain",lane_id:le.getAttribute("data-lane-id")||"",marker_index:Oe(le,ae)}};if(Y==="repo-serial"){let Ae=le.getAttribute("data-root-dir")||"";if(Ae!==m.root_dir)return null;let ge=typeof ae?.closest=="function"?ae.closest("[data-queue-index]"):null,Le=ge&&le.contains(ge)?ge.getAttribute("data-queue-index"):le.getAttribute("data-lane-length"),qe=Number(Le);return{zone:le,target:{kind:"repo-serial",root_dir:Ae,lane_id:le.getAttribute("data-lane-id")||"",index:Number.isFinite(qe)?qe:0}}}return null}function J(){for(let I of Array.from(n.querySelectorAll(".is-drop-over")))I.classList.remove("is-drop-over")}function Se(I){D=I.target instanceof Element?I.target:null}function be(I){let ae=I.target,le=typeof ae?.closest=="function"?ae.closest('[draggable="true"][data-bead-id]'):null,Y=le?le.closest("[data-drag-kind]"):null;if(!Y)return;if(le&&D&&le.contains(D)&&typeof D.closest=="function"&&D.closest("input, button, a")){I.preventDefault();return}let Ae=Y.getAttribute("data-bead-id")||"",ge=Y.getAttribute("data-drag-kind")||"",Le=Y.getAttribute("data-root-dir")||"";if(!Ae||!ge)return;let qe=Y.getAttribute("data-queue-index")||"",Ze=Number(qe),ze=Y.getAttribute("data-lane-id")||"";m={kind:ge,bead_id:Ae,root_dir:Le,...qe!==""&&Number.isFinite(Ze)?{queue_index:Ze}:{},...ze?{lane_id:ze}:{}},R=!0,f?.(),n.classList.add("is-dragging");try{I.dataTransfer?.setData("text/plain",Ae),I.dataTransfer&&(I.dataTransfer.effectAllowed="move")}catch{}}function me(I){let ae=ce(I);ae&&(I.preventDefault(),I.dataTransfer&&(I.dataTransfer.dropEffect="move"),ae.zone.classList.add("is-drop-over"))}function L(I){let ae=I.target;typeof ae?.closest=="function"&&(ae.closest("[data-drop]")?.classList.remove("is-drop-over"),ae.closest(".worker-pane--collapsed")?.classList.remove("is-drop-over"))}function ee(){m=null,J(),n.classList.remove("is-dragging"),H()}function Re(I){let ae=ce(I),le=m;m=null,J(),n.classList.remove("is-dragging"),!(!ae||!le)&&(I.preventDefault(),_e(le,ae.target))}return{attach(I){ne||(ne=I,I.addEventListener("pointerdown",Se),I.addEventListener("dragstart",be),I.addEventListener("dragover",me),I.addEventListener("dragleave",L),I.addEventListener("drop",Re),I.addEventListener("dragend",ee))},detach(){T!==null&&(clearTimeout(T),T=null);let I=ne;ne=null,I&&(I.removeEventListener("pointerdown",Se),I.removeEventListener("dragstart",be),I.removeEventListener("dragover",me),I.removeEventListener("dragleave",L),I.removeEventListener("drop",Re),I.removeEventListener("dragend",ee))},isDragging(){return m!==null},consumeClickSuppression(){let I=R;return R=!1,I},applyDrop:_e,runPlanned:se,dropModel:z,sendOp:W,sendQueueCas:V,rememberDep:oe}}function sn(e){return e&&typeof e=="object"?e:{}}function Mk(e,t){for(let n of Object.values(sn(t.provider_hold)))for(let r of Array.isArray(n?.targets)?n.targets:[])if(Array.isArray(r?.attempt_ids)&&r.attempt_ids.includes(e))return r;return null}function Nk(e){if(e?.status!=="ok")return{eligible:!1,reason:`\uACC4\uC815 \uC0C1\uD0DC ${String(e?.status||"\uBBF8\uC0C1")}`};let t=Array.isArray(e.windows)?e.windows:[],n=t.find(o=>o?.key==="5h"),r=t.find(o=>o?.key==="7d");if(!n||typeof n.pct!="number")return{eligible:!1,reason:"5\uC2DC\uAC04 \uC0AC\uC6A9\uB7C9 \uBBF8\uAD00\uCE21"};if(n.pct>80)return{eligible:!1,reason:"5\uC2DC\uAC04 \uC0AC\uC6A9\uB7C9 80% \uCD08\uACFC"};if(r){if(typeof r.pct!="number")return{eligible:!1,reason:"7\uC77C \uC0AC\uC6A9\uB7C9 \uBBF8\uAD00\uCE21"};if(r.pct>90)return{eligible:!1,reason:"7\uC77C \uC0AC\uC6A9\uB7C9 90% \uCD08\uACFC"}}return{eligible:!0,reason:""}}function Ma(e,t){let n=sn(sn(t).attempts)[e];if(!n)return null;let r=sn(sn(t).runner_catalog),o=sn(r.runners),i=typeof n.runner=="string"&&o[n.runner]?n.runner:Object.keys(o)[0]||"",s=sn(o[i]),l=sn(s.models),a=typeof n.model=="string"&&l[n.model]?n.model:typeof s.default_model=="string"?s.default_model:Object.keys(l)[0]||"",u=Mk(e,sn(t)),d=typeof n.claude_account=="string"?n.claude_account:typeof u?.account=="string"?u.account:"";return{attempt_id:e,original_runner:i,runner:i,model:a,account:d,fresh_current:!1}}function Na(e,t,n){if(!e||!t||typeof t.closest!="function")return null;let r=t.closest(".provider-resume-dialog__runner");if(r){let l=sn(sn(sn(n).runner_catalog).runners),a=sn(l[r.value]),u=Object.keys(sn(a.models));return{...e,runner:r.value,model:typeof a.default_model=="string"?a.default_model:u[0]||""}}let o=t.closest(".provider-resume-dialog__model");if(o){try{let[l,a]=JSON.parse(o.value);if(typeof l=="string"&&typeof a=="string")return{...e,runner:l,model:a}}catch{}return e}let i=t.closest(".provider-resume-dialog__account");if(i)return{...e,account:i.value};let s=t.closest(".provider-resume-dialog__fresh-input");return s?{...e,fresh_current:s.checked}:null}function qa(e){if(!e||!e.runner||!e.model||e.runner==="claude"&&!e.account)return null;let t={runner:e.runner,model:e.model};e.runner==="claude"&&e.account&&(t.claude_account=e.account);let n=e.fresh_current||e.runner!==e.original_runner;return{attempt_id:e.attempt_id,payload:{exec_override:t,...n?{continuation:"fresh_current",decision_token:{}}:{}}}}function Ko(e,t){if(!e)return"";let n=sn(sn(sn(t).runner_catalog).runners),r=sn(sn(t).account_catalog),o=Array.isArray(r.claude)?r.claude:[],i=e.runner!==e.original_runner;return c`<dialog
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
                ${Object.keys(sn(l?.models)).map(a=>c`<option
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
              ${o.map(s=>{let l=Nk(s),a=s.alias||s.email;return c`<option
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
  </dialog>`}function ja(e){let t=e?.querySelector?.(".provider-resume-dialog")||null;!t||t.open||(typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""))}var Nc=Object.freeze({repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",manual_target_missing:"\uC218\uB3D9 \uBC30\uD3EC \uAE30\uB85D\uC5D0 \uD540\uB41C \uB300\uC0C1 SHA\uAC00 \uC5C6\uC5B4 \uC2E4\uD589\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",bootstrap_not_approved:"\uCCAB [deploy] \uC120\uC5B8\uC740 \uC0AC\uB78C \uC2B9\uC778 \uC5C6\uC774 \uC2E4\uD589\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. Worker \uC124\uC815\uC758 [\uBC30\uD3EC \uC2E4\uD589]\uC73C\uB85C \uC6D0\uACA9 base tip\uC744 \uD55C \uBC88 \uBC30\uD3EC\uD55C \uB4A4 [\uC815\uC0B0 \uC7AC\uAC1C]\uB97C \uB204\uB974\uC138\uC694 \u2014 \uADF8 \uB4A4 \uBA38\uC9C0\uBD80\uD130\uB294 \uC790\uB3D9 \uBC30\uD3EC\uB429\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_red:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",cleanup_failed:"\uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uAC00 \uB05D\uB098\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",retry_exhausted:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB97C \uBAA8\uB450 \uC4F0\uACE0\uB3C4 \uAC19\uC740 \uC2E4\uD328\uAC00 \uC774\uC5B4\uC84C\uC2B5\uB2C8\uB2E4.",conflict_unresolved:"\uCDA9\uB3CC \uD574\uC18C\uAC00 \uB05D\uB098\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",internal_record_failed:"Worker \uB0B4\uBD80 \uAE30\uB85D\uC774 \uC2E4\uD328\uD574 \uC9C4\uD589\uC744 \uBA48\uCDC4\uC2B5\uB2C8\uB2E4.",foreign_landing_unpinned:"\uB2E4\uB978 \uC800\uC7A5\uC18C \uCC29\uC9C0\uC778\uB370 foreign_repo\xB7foreign_path\xB7foreign_base \uD540\uC774 \uC5C6\uAC70\uB098 \uD615\uC2DD\uC774 \uD2C0\uB9BD\uB2C8\uB2E4.",foreign_checkout_unavailable:"\uD540\uB41C \uB300\uC0C1 \uC800\uC7A5\uC18C \uCCB4\uD06C\uC544\uC6C3\uC774 \uC5C6\uAC70\uB098 foreign_repo\uC640 \uAC19\uC740 URL\uC758 remote\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",foreign_deploy_unsupported:"\uB300\uC0C1 \uC800\uC7A5\uC18C\uAC00 [deploy]\uB97C \uC120\uC5B8\uD574 Worker\uAC00 \uBC30\uD3EC \uC99D\uAC70\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uC138\uC158\uC774 \uBC30\uD3EC\uC640 \uB9C8\uAC10\uC744 \uC18C\uC720\uD569\uB2C8\uB2E4.",repair_lane_retired:"\uC790\uB3D9 \uC218\uB9AC \uB808\uC778\uC774 \uC740\uD1F4\uD574 \uC0AC\uB78C \uCC98\uB9AC\uB85C \uB118\uC5B4\uC654\uC2B5\uB2C8\uB2E4."});var w_={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",job_script_failure:"\uC7A1 \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428",quickfix_landing_failed:"\uCC29\uC9C0 \uC2E4\uD328",runner_exit:"\uC138\uC158 \uC2E4\uD328",session_parked:"\uC138\uC158 \uB300\uAE30",session_ended_unresolved:"\uC138\uC158 \uC885\uB8CC",prerequisite_unmet:"\uC120\uD589 \uB300\uAE30",delivery_unproven:"\uCC29\uC9C0 \uC99D\uAC70 \uBD80\uC871"},$_={overloaded_529:"Claude API \uACFC\uBD80\uD558(529)\uB85C \uBCF4\uB958",rate_limited_429:"Claude API \uC694\uCCAD \uD55C\uB3C4(429)\uB85C \uBCF4\uB958"},x_={"session_hard_stop:failure":"\uC138\uC158\uC774 \uC2E4\uD328\uB97C \uBCF4\uACE0\uD558\uACE0 \uC885\uB8CC","session_hard_stop:environment":"\uC138\uC158\uC774 \uD658\uACBD \uC624\uB958\uB97C \uBCF4\uACE0\uD558\uACE0 \uC885\uB8CC","resume_failed:transcript_missing":"\uC774\uC5B4\uD558\uAE30 \uB300\uC0C1 \uC138\uC158 \uAE30\uB85D\uC774 \uC5C6\uC74C \u2014 \uC0C8 \uC138\uC158\uC73C\uB85C \uB300\uCCB4"};function qk(e){return typeof e!="number"||!Number.isFinite(e)?"":new Date(e).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}function jk(e,t){if(typeof e!="string"||!e.startsWith("provider_outage:"))return null;let n=e.slice(16);if(n==="usage_limit"){let o=t&&typeof t=="object"?t.resets_at:null,i=qk(o);return i?`\uACC4\uC815 \uC0AC\uC6A9 \uD55C\uB3C4\uB85C \uBCF4\uB958 \u2014 \uB9AC\uC14B ${i}`:"\uACC4\uC815 \uC0AC\uC6A9 \uD55C\uB3C4\uB85C \uBCF4\uB958"}if(Object.hasOwn($_,n))return $_[n];let r=/^http_(5\d\d)$/.exec(n);return r?`Claude API \uC624\uB958(${r[1]})\uB85C \uBCF4\uB958`:null}function Ba(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function Fa(e){for(let t of Ba(e)){if(Object.hasOwn(w_,t))return w_[t];if(t.startsWith("session_"))return"\uC138\uC158 \uC2E4\uD328"}return null}function S_(e){return Ba(e).length===0?null:Fa(e)||"\uC2E4\uD328"}function lo(e){let t=null;for(let n of Ba(e))Object.hasOwn(Nc,n)&&(t=Nc[n]);return t}function Ir(e,t){if(typeof e=="string"&&Object.hasOwn(x_,e))return x_[e];let n=jk(e,t);if(n!==null)return n;let r=Fa(e),o=lo(e);return r&&o?`${r} \u2014 ${o}`:r||o?r||o:typeof e=="string"?e:""}function E_(e,t){let n=Fa(e)??Fa(t),r=lo(t)??lo(e);return n&&r?`${n} \u2014 ${r}`:n||r?n||r:typeof t=="string"?t:""}var Fk=new Set(["repo_operation_timeout_unresolved"]);function Bk(e){for(let t of Ba(e))if(Fk.has(t)||t.startsWith("repo_ops_"))return!0;return!1}function Uk(e,t){return t.code==="interrupted"||t.interrupted===!0||e.failure_kind==="interrupted_without_terminal_exit"||t.code==="interrupted_without_terminal_exit"}function T_(e,t){if(!e||typeof e!="object")return"";let n=e.failure;if(!n||typeof n!="object"||Bk(n.code))return"";if(n.code==="timeout"){let o=Number(t);return Number.isFinite(o)&&o>0?`\uD0C0\uC784\uC544\uC6C3 ${Math.round(o/1e3)}\uCD08 \uCD08\uACFC`:"\uD0C0\uC784\uC544\uC6C3 \uCD08\uACFC"}if(Uk(e,n))return"\uC885\uB8CC \uAE30\uB85D \uC5C6\uC74C \u2014 \uC911\uB2E8\uB428";let r=typeof e.elapsed_ms=="number"&&Number.isFinite(e.elapsed_ms)&&e.elapsed_ms>=0?` \xB7 ${Zr(e.elapsed_ms)}`:"";return typeof e.signal=="string"&&e.signal.length>0?`signal ${e.signal}${r}`:Number.isInteger(e.exit_code)?`exit ${e.exit_code}${r}`:""}var A_={schema_unsupported:"\uD540\uB41C \uC815\uCC45 \uC2A4\uD0A4\uB9C8\uB97C \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."};function R_(e){if(!e||typeof e!="object")return"";let t=e.retry;if(!t||typeof t!="object")return"";if(typeof t.blocked_reason=="string"&&t.blocked_reason)return`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uBABB \uD568 \u2014 ${Object.hasOwn(A_,t.blocked_reason)?A_[t.blocked_reason]:t.blocked_reason}`;if(t.status==="absorbed"){let n=t.absorbed&&typeof t.absorbed=="object"?t.absorbed:null,r=Ir(n?.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428 \u2014 \uCCAB \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428"}if(e.state!=="failed")return"";if(t.status==="not_applicable")return"\uC7AC\uC2DC\uB3C4 \uB300\uC0C1 \uC544\uB2D8 \u2014 \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804 \uC2E4\uD328";if(t.status==="consumed"){let n=typeof t.first_fingerprint=="string"&&t.first_fingerprint?t.first_fingerprint:null;if(n===null)return"";if(n===e.failure?.fingerprint)return"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uAC19\uC740 \uC2E4\uD328";let r=Ir(t.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328"}return""}function Wk(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}var C_=200;function Hk(e){return typeof e!="string"||e.length===0?"":e.length>C_?`${e.slice(0,C_)}\u2026`:e}function zk(e){let t=e&&e.attempts>0&&e.max>0?` ${e.attempts}/${e.max}`:"",n=e&&typeof e.next_at=="number"?` \xB7 ${new Date(e.next_at).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}`:"";return`\u21BB \uC7AC\uC2DC\uB3C4 \uB300\uAE30${t}${n}`}function qc(e){return typeof e!="number"||!Number.isFinite(e)?"":new Date(e).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}function Kk(e){if(!e)return"";let t=e.auto_resume==="disarmed"?" \xB7 \uC218\uB3D9 \uC870\uCE58":"";if(e.kind==="usage_limit"){let r=qc(e.resets_at);if(!r)return`\u23F3 \uD55C\uB3C4 \uB300\uAE30 \xB7 \uB9AC\uC14B \uBBF8\uC0C1${t}`;let o=e.target?.account_alias||e.target?.account||"";return`\u23F3 \uD55C\uB3C4 \uB300\uAE30 ${r}${o?` \xB7 ${o}`:""}${t}`}let n=qc(e.next_probe_at);return`\u26A0\uFE0F \uACF5\uAE09\uC790 \uC7A5\uC560${n?` \xB7 \uB2E4\uC74C \uD504\uB85C\uBE0C ${n}`:""}${t}`}function I_(e){if(!e)return"";let t=Array.isArray(e.timeline)?e.timeline:[],n=typeof e.log_path=="string"?e.log_path:"",r=e.log_expired===!0,o=e.log_unreadable===!0;return t.length===0&&n.length===0&&!r&&!o?"":c`${t.length>0?c`<ol class="rtile__history" data-seam="tile-timeline">
        ${t.map(i=>c`<li class="rtile__history-row">
              ${O_(i.at)?c`<span class="rtile__history-at"
                    >${O_(i.at)}</span
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
            ${Qr(n)}
          </p>`:""}`}function O_(e){return typeof e!="number"||!Number.isFinite(e)?"":new Date(e).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}function Gk(e,t){if(!e||e.open!==!0)return"";let n=lo(e.cause)||Ir(e.cause,e.cause_detail),r=e.retry&&e.retry.attempts>0?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 ${e.retry.attempts}\uD68C \u2014 \uAC19\uC740 \uC624\uB958`:"",o=e.cause_detail,i=e.quickfix_lane&&e.quickfix_landing?e.quickfix_landing:null,s=i?[i.cursor||null,typeof i.head_sha=="string"?i.head_sha.slice(0,7):null,i.reason||null].filter(Boolean).join(" \xB7 "):"",l=typeof e.finished_at=="number"?`${new Date(e.finished_at).toLocaleString("ko-KR")} \xB7 ${vn(e.finished_at,t)}`:"",a=[e.runner,e.model,e.observed_effort??e.effort,e.speed].filter(_=>typeof _=="string"&&_.length>0).join(" \xB7 "),u=e.usage?.total_cost_usd,d=typeof u=="number"&&Number.isFinite(u)?`$${u.toFixed(2)}`:"",f=I_(e);return c`<div
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
  </div>`}function Vk(e){return e==="pending"?"\uD68C\uBCF5 \uD6C4 \uC790\uB3D9 \uC7AC\uAC1C \uB300\uAE30":e==="disarmed"?"\uC790\uB3D9 \uC7AC\uAC1C \uC18C\uC9C4 \xB7 \uC218\uB3D9 \uC870\uCE58 \uD544\uC694":typeof e=="string"&&e.startsWith("refused:")?`\uC790\uB3D9 \uC7AC\uAC1C \uAC70\uBD80 \xB7 ${e.slice(8)}`:""}function Yk(e){return e==="none"?"\uACC4\uC815 \uC804\uD658 \uC548 \uD568 \xB7 \uC870\uAC74\uC744 \uB9CC\uC871\uD558\uB294 \uB2E4\uB978 \uACC4\uC815 \uC5C6\uC74C":e==="disabled"?"\uACC4\uC815 \uC804\uD658 \uC548 \uD568 \xB7 \uC790\uB3D9 \uC804\uD658 \uAEBC\uC9D0":""}function Qk(e){if(!e||e.open!==!0)return"";let t=[e.target?.model,e.target?.account_alias||e.target?.account].filter(i=>typeof i=="string"&&i.length>0).join(" \xB7 "),n=qc(e.resets_at),r=Vk(e.auto_resume),o=Yk(e.auto_switch);return c`<div
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
            <dd>${Qr(e.log_path)}</dd>
          </div>`:""}
    </dl>
  </div>`}function Xk(e){return!e||!e.repo&&!e.serial_lane_id?"":c`${e.repo?c`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?c`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`}var Zk=new Set(["codex-runner"]);function Jk(e,t,n,r=null){if(!e)return"";let o=e.last_activity||null,i=o&&typeof o.text=="string"?o.text:"",s=o&&typeof o.at=="number"?o.at:null,l=(r||!Array.isArray(e.legs)?[]:e.legs).filter(k=>k&&!(typeof k.agent_type=="string"&&Zk.has(k.agent_type))),a=l.filter(k=>k&&k.state==="live"),u=l.filter(k=>k&&k.state!=="live"),d=r&&typeof r.last_event_at=="number"?vn(r.last_event_at,t):"",f=r?vn(r.updated_at,t):"",_=d?`\uCD5C\uADFC \uD65C\uB3D9 ${d}`:f?`\uAC31\uC2E0 ${f}`:"";return c`${i?c`<div class="rtile__activity${n?" is-paused":""}">
        <span class="rtile__activity-dot" aria-hidden="true"></span>
        <span class="rtile__activity-text">${i}</span>
        ${s!==null?c`<span class="rtile__activity-age"
              >${vn(s,t)}</span
            >`:""}
      </div>`:_?c`<div class="rtile__activity rtile__activity--session">
          <span class="rtile__activity-dot" aria-hidden="true"></span>
          <span class="rtile__activity-text">${_}</span>
        </div>`:""}${a.length>0||u.length>0?c`<div class="rtile__legs">
        ${a.map(k=>c`<span
              class="rtile__leg rtile__leg--live"
              title="이 세션이 띄운 서브에이전트/Codex 세션이 실행 중입니다"
              >위임 중 · ${k.label}</span
            >`)}${u.length>0?c`<span
              class="rtile__leg rtile__leg--done"
              title=${`\uC644\uB8CC\uB41C \uC704\uC784: ${u.map(k=>k.label).join(", ")}`}
              >위임 완료 ${u.length}</span
            >`:""}
      </div>`:""}`}var ew={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function tw(e){if(!e)return"";let t=ew[e.locality]||"";return c`<button
    type="button"
    class="rtile__session"
    ?disabled=${t.length>0}
    title=${t||"\uB77C\uC774\uBE0C \uC138\uC158 \uC5F4\uAE30"}
    aria-label="라이브 세션 열기"
  >
    ▤ 세션
  </button>`}function nw(e,t,n,r="",o="",i=!1){if(e==="provider_hold")return c`<div class="rtile__foot">
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
    </div>`;if(e==="retry_wait")return n?c`<div class="rtile__foot">${n}</div>`:"";let s=Hk(t?.summary);if(e==="waiting")return c`${s?c`<p class="rtile__held-summary">${s}</p>`:""}${r}
      <div class="rtile__foot">${n}</div>`;let l=I_(t);return c`${s?c`<p class="rtile__held-summary">${s}</p>`:""}${l}
    <div class="rtile__foot">
      ${i?c`${n}${o}`:c`${o}${n}`}
    </div>`}function jc(e,t,n=null,r={}){let o=e.kind==="session",i=o&&Array.isArray(e.session_refs)&&e.session_refs.find(Ae=>Ae&&Ae.current===!0)||null,s=e.failed===!0,l=s&&e.failure||null,a=e.parked===!0&&!s,u=e.retry_wait===!0&&!s&&!a,d=e.waiting===!0&&!s&&!a&&!u,f=e.provider_hold===!0&&!s&&!a&&!u&&!d,_=a&&e.failure||null,k=d&&e.wait||null,m=f&&e.hold||null,R=a||u||d||f,T=!!e.paused,D=s||R?e.status_label||(a?"\uC138\uC158 \uB300\uAE30":u?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":d?"\uC120\uD589 \uB300\uAE30":f?"\uACF5\uAE09\uC790 \uBCF4\uB958":e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):T?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?Wk(t-e.started_at):"\u2014",ne=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,H=ps(e),P=mn(e.usage),O=lr(e.usage),q=e.conflict_resolution?T?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,F=e.base_exception||null,z=e.landing,B=e.attempt_id&&e.attempt_id===n,N=r.monitor||null,V=Xk(N),W=Gi(N?.cross_lane_chip),oe=N?Ki(N.dependency_chips):"",fe=Jk(N,t,T,o?{updated_at:e.updated_at??null,last_event_at:i&&i.locality==="local"?i.last_event_at:null}:null),Pe=o&&e.workflow?.chips?.exec_receipt||null,G=eo(e.workflow),se=Vi(e.rec,e.chip_popover?.chip_key==="rec"),_e=e.chip_popover?Lo(e.chip_popover.content):"",Oe=Pe?c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${ar(Pe)}`}
        >${`${Pe.kind}:${hi(Pe)}`}</span
      >`:"",Q=i?c`<span
        class="ctl-chip ctl-chip--sref"
        title=${`${i.provider}:${i.session_id}@${i.host}${(e.session_refs||[]).length>=2?` \xB7 \uC774\uB825 ${(e.session_refs||[]).length}`:""}`}
        >${Es(i)}</span
      >`:"",ce=V||W||G||Q||Oe||se?c`<div class="rtile__meta">
          ${V}${W}${G}${Q}${Oe}${se}${_e}
        </div>`:"",J=l?c`<button
          type="button"
          class="rtile__failure-badge"
          data-attempt-id=${l.attempt_id}
          aria-expanded=${l.open===!0?"true":"false"}
          aria-label="실패 상세"
        >
          ⛔ ${S_(l.cause)||"\uC2E4\uD328"}
        </button>
        ${l.halted_auto_advance?c`<span class="rtile__auto-halted">자동 진행 꺼짐</span>`:""}`:"",Se=a?c`<span
        class="rtile__held-badge"
        title="세션이 사용자 결정을 기다리며 정상 종료했습니다 — 큐는 계속 갑니다"
        >⏸ 세션 대기</span
      >`:u?c`<span
          class="rtile__held-badge"
          title="환경성 실패의 자동 재시도를 기다립니다 — 사람이 할 일은 없습니다"
          >${zk(e.retry)}</span
        >`:d?e.wait?.returning?c`<span
              class="rtile__held-badge"
              title="막고 있던 선행이 남지 않았습니다 — 다음 pass에서 후보로 돌아갑니다 (슬롯·레인 순서 대기)"
              >⛓ 복귀 대기</span
            >`:c`<span
              class="rtile__held-badge"
              title="세션이 선행 미충족으로 착수를 거부했습니다 — 선행이 닫히면 저절로 다시 돕니다"
              >⛓ 선행 대기</span
            >`:f&&m?c`<button
              type="button"
              class="rtile__held-badge rtile__provider-hold-badge"
              data-attempt-id=${e.attempt_id}
              aria-expanded=${m.open===!0?"true":"false"}
              aria-label="공급자 보류 상세"
            >
              ${Kk(m)}
            </button>`:"",be=c`${q?c`<span class="worker-mini__badge">${q}</span>`:""}${F?c`<span
        class="worker-mini__badge"
        title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
        >${F}</span
      >`:""}${J}${Se}`,me=o?"":Do(e),L=Di(l?.quickfix_landing),ee=L==="settlement"?"\uC815\uC0B0 \uC7AC\uAC1C":"\uC774\uC5B4\uD558\uAE30",Re=L==="settlement"?"\uCC29\uC9C0 \uC815\uC0B0\uC744 \uB2E4\uC2DC \uC2E4\uD589":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589",I=e.resolve_action?c`<button
        type="button"
        class="rtile__resolve"
        ?disabled=${e.resolve_enabled===!1}
        title=${e.resolve_title||"\uC774 \uC2E4\uD328\uB97C \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4"}
        aria-label="세션에서 해결"
      >
        세션에서 해결
      </button>`:"",ae=e.discard?.action&&!(s&&l?.landed===!0)?c`<button
          type="button"
          class="rtile__discard"
          data-operation-id=${e.discard.operation?.operation_id||""}
          data-confirmation=${l?.confirmation||"unmerged"}
          ?disabled=${!e.discard.enabled}
          title=${e.discard.title}
          aria-label=${e.discard.label}
        >
          ${e.discard.label}
        </button>`:"",le=ae&&e.discard?.abandon?.action===!0?c`<button
          type="button"
          class="rtile__discard-abandon"
          data-operation-id=${e.discard.operation?.operation_id||""}
          data-operation-kind=${e.discard.operation?.kind||""}
          data-last-error=${e.discard.error||""}
          title=${e.discard.abandon.title}
          aria-label=${e.discard.abandon.label}
        >
          ${e.discard.abandon.label}
        </button>`:"",Y=le?c`${ae}${le}`:ae;return c`<div
    class="rtile${B?" rtile--sel":""}${T?" rtile--paused":""}${s?" rtile--failed rtile--compact":""}${R?" rtile--held rtile--compact":""}${a?" rtile--parked":""}${u?" rtile--retry-wait":""}${d?" rtile--waiting":""}${o?" rtile--session":""}${f?" rtile--provider-hold":""}${e.search_match===!1?" is-dimmed":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span
        class="rtile__dot${o?" rtile__dot--session":""}"
        aria-hidden="true"
      ></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${Yi(e.priority)}${H?c`<span class="rtile__resumed" title=${H}>↻</span>`:""}${be}
      <div class="rtile__hd-actions">
        ${o?c`${typeof e.started_at=="number"?c`<span class="rtile__elapsed">${D}</span>`:""}${tw(i)}<span
                class="rtile__session-badge"
                title="Worker가 아닌 세션이 in_progress로 잡은 이슈"
                >세션</span
              >`:c`<span class="rtile__elapsed">${D}</span>`}
        ${o||R?"":s?c`<button
                  type="button"
                  class="op-btn rtile__resume"
                  data-resume-kind=${L}
                  ?disabled=${l?.resume_eligible===!1}
                  title=${l?.resume_eligible===!1?l.resume_reason||`${ee} \uBD88\uAC00`:Re}
                  aria-label=${ee}
                >
                  ↻ ${ee}
                </button>
                ${Y}`:c`<button
                  type="button"
                  class="rtile__session"
                  title="라이브 세션 열기"
                  aria-label="라이브 세션 열기"
                >
                  ▤ 세션
                </button>
                ${T?c`<button
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
                ${Y}`}${a?"":I}
      </div>
    </div>
    <div class="rtile__title">${e.title}</div>
    ${R?nw(a?"parked":u?"retry_wait":d?"waiting":"provider_hold",a?_:d?k:m,Y,d?oe:"",a?I:"",a&&!!e.discard?.error):s?"":c`${fe}${e.rollup?mi(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:cl}):""}
            ${z?c`<div class="rtile__landing">
                  <span
                    class="merge-step${z.failed?" merge-step--failed":""}"
                    style=${`--progress: ${z.percent}%`}
                    >${z.label}${z.index>0?c`<span class="merge-step__n"
                          >${z.index}/${z.total}</span
                        >`:""}</span
                  >
                </div>`:""}
            ${oe}
            ${o?ce:V||W||G||ne||se||P.length>0||O?c`<div class="rtile__meta">
                    ${V}${W}${G}${Jr(e.exec_chips)}${se}
                    ${P.length>0?P.map(Ae=>c`<span
                              class="worker-usage"
                              title=${Ae.tooltip}
                              >${Ae.label}</span
                            >`):O?c`<span
                            class="worker-usage"
                            title=${ss(e.usage)}
                            >${O}</span
                          >`:""}${_e}
                  </div>`:""}
            ${Bi(e)} ${me}
            <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
            ${s||T?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}`}
    ${Gk(l,t)}${Qk(m)}
  </div>`}function rw(e){let t=e.last_activity&&typeof e.last_activity=="object"?e.last_activity:null,n=Array.isArray(e.legs)?e.legs:[],r=e.dependency_chips||null;return!t&&n.length===0&&!r&&e.kind!=="session"?null:{...t?{last_activity:t}:{},...n.length>0?{legs:n}:{},...r?{dependency_chips:r}:{}}}function L_(e,t=Date.now(),n=null){let r=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${r.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:r.map(o=>jc(o,t,n,{monitor:rw(o)}))}
  </div>`}function Go(e,t,n=!1){let r=!!t.discard?.error;return!e||!r&&t.parked!==!0?{}:{resolve_action:!0,resolve_enabled:!n,resolve_title:n?"\uC138\uC158 \uAE30\uB3D9 \uC694\uCCAD \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":r?"\uC2E4\uD328\uD55C \uD3D0\uAE30\uB97C \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 \u2014 \uAE30\uB85D\uB41C \uC138\uC158\uC774 \uC788\uC73C\uBA74 fork\uD558\uACE0, \uC5C6\uC73C\uBA74 \uC0C8 \uC138\uC158\uC5D0 \uC0AC\uC720\uB97C \uC2E3\uC2B5\uB2C8\uB2E4":"\uD30C\uD0B9\uC744 \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 \u2014 \uC0B4\uC544 \uC788\uB294 \uBB38\uC758 \uC138\uC158\uC774 \uC788\uC73C\uBA74 \uADF8 \uCC3D\uC744 \uAC00\uB9AC\uD0B5\uB2C8\uB2E4"}}var cn="",ow=["impl_runtime","impl_model","impl_effort"],P_=["claude","codex"],sw=["claude_account","codex_account"],iw=5,Ua=1;function Nn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Wa(e,t){let n=t.transport,r=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,o=t.notify||(S=>ve(S,"error",4e3)),i={},s={},l={},a={},u=[],d=!1,f={state:"absent",values:{},warnings:[]},_={},k={},m=Promise.resolve(),R=Promise.resolve(),T={claude:null,codex:null},D=!1,ne=null,H={},P="",O="general",q="",F=!1,z=!1,B=!1,N=null,V=!1;function W(){let S=t.queue?t.queue():null;return Nn(S)?S:null}function oe(){let S=W();return S?S.runner_catalog:null}function fe(){let S=W();return S&&Nn(S.execution_defaults)?S.execution_defaults:null}function Pe(){let S=W();return!!(S&&Object.hasOwn(S,"quick_fix_orchestration_model"))}function G(){let S=t.implPresetStore?.get();return Nn(S)&&Array.isArray(S.presets)?S:null}function se(){return r===null?{}:{root_dir:r}}async function _e(S,U){return V||!n?null:await n(S,U)}function Oe(S){S&&Nn(S.queue)&&t.onQueueAdopt?.(S.queue)}async function Q(S,U){let K=W();if(!K||V)return null;let we=await _e(S,{...U,...se(),expected_revision:K.revision});if(Oe(we),r!==null&&we&&we.conflict){let Ee=we.queue&&typeof we.queue.revision=="number"?we.queue.revision:W()?.revision??K.revision;we=await _e(S,{...U,...se(),expected_revision:Ee}),Oe(we)}return we}async function ce(){d=!0,Ne();try{let S=await _e("get-session-defaults",{...se()});i=Ei(S?.values),s={...i},l={},a={},u=Array.isArray(S?.warnings)?S.warnings:[]}catch(S){u=["kv_read_failed"],o(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${S instanceof Error?S.message:String(S)}`)}finally{d=!1,Ne()}}function J(S,U){let K={...U};for(let we of is){let Ee=s[we];Ee!==S[we]&&(typeof Ee=="string"?K[we]=Ee:delete K[we])}return K}function Se(){R=R.then(()=>be())}async function be(){let S=Id(i,s);if(Object.keys(S).length===0)return;let U={...s};try{let K=await _e("set-session-defaults",{values:S,...se()});i=Ei(K?.values),s=J(U,i),u=Array.isArray(K?.warnings)?K.warnings:[]}catch(K){o(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${K instanceof Error?K.message:String(K)}`)}Ne()}function me(S,U){if(!Nn(S))return;let K=S.state;f={state:K==="usable"||K==="unusable"||K==="absent"?K:"absent",values:Nn(S.values)?{...S.values}:{},warnings:Array.isArray(S.warnings)?S.warnings:[]},k={...f.values},U&&(_={...k})}async function L(){try{me(await _e("get-workspace-accounts",{...se()}),!0)}catch(S){f={state:"unusable",values:{},warnings:["kv_read_failed"]},k={},_={},o(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${S instanceof Error?S.message:String(S)}`)}Ne()}async function ee(S){try{let U=await fetch(S);if(!U.ok)return null;let K=await U.json();if(!Nn(K)||!Array.isArray(K.accounts))return null;let we=K.accounts.filter(Ee=>Nn(Ee)&&typeof Ee.key=="string"&&Ee.key.length>0&&typeof Ee.email=="string"&&Ee.email.length>0);return{accounts:we,active:we.find(Ee=>Ee.active===!0)||null}}catch{return null}}async function Re(){D=!0;let[S,U]=await Promise.all([ee("/api/claude-usage"),ee("/api/codex-usage")]);V||(T={claude:S,codex:U},Ne())}function I(){let S={};for(let U of sw){let K=Object.hasOwn(_,U)?_[U]:null,we=Object.hasOwn(k,U)?k[U]:null;K!==we&&(S[U]=K)}return S}async function ae(){let S=I();if(Object.keys(S).length!==0){try{me(await _e("set-workspace-accounts",{values:S,...se()}),!1)}catch(U){o(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${U instanceof Error?U.message:String(U)}`)}Ne()}}function le(S,U){U===cn?delete _[S]:_[S]=U,Ne(),m=m.then(()=>ae())}function Y(S,U){if(ow.includes(S)){Ze(S,U);return}U===cn?delete s[S]:s[S]=U,Ne(),Se()}function Ae(S,U){l[S]=U,delete a[S]}function ge(S,U,K){if(l[S]=U,U.length>0&&!K(U)){a[S]=!0,Ne();return}delete l[S],delete a[S],U.length===0?delete s[S]:s[S]=U,Ne(),Se()}function Le(){let S=pt().orchestration_model,U=Cn({global:{orchestration_model:S??void 0},execution_defaults:fe(),runner_catalog:oe()}).orchestration_model.value;return U?Bn(oe(),U):null}function qe(S,U){typeof U=="string"&&U.length>0?s[S]=U:delete s[S]}function Ze(S,U){let K=U===cn?void 0:U,we=Rd({impl_runtime:S==="impl_runtime"?K:s.impl_runtime,impl_model:S==="impl_model"?K:s.impl_model,impl_effort:S==="impl_effort"?K:s.impl_effort},oe(),Le());qe("impl_runtime",we.impl_runtime),qe("impl_model",we.impl_model),qe("impl_effort",we.impl_effort),Ne(),Se()}async function ze(){let S=W();if(!S)return;let U={orchestration_model:S.orchestration_model??null,orchestration_effort:S.orchestration_effort??null,orchestration_speed:S.orchestration_speed??null,quick_fix_orchestration_model:S.quick_fix_orchestration_model??null,quick_fix_orchestration_effort:S.quick_fix_orchestration_effort??null,quick_fix_orchestration_speed:S.quick_fix_orchestration_speed??null},K=Ld(U,{...U,...H});if(Object.keys(K).length!==0){try{let we=await Q("worker-queue-set-orchestration-defaults",{values:K});if(we&&we.applied===!1){o("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}H={}}catch(we){o(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${we instanceof Error?we.message:String(we)}`)}Ne()}}function ie(S,U){H[S]=U===cn?null:U,Ne(),ze()}function Z(S){if(ne=S,!S){Ne();return}let U=oe(),K=pt(),we=K.orchestration_model;we&&!Co(U,S).includes(we)&&(H.orchestration_model=null,we=null);let Ee=K.orchestration_effort;Ee&&!Oi(U,S,we||Tn).includes(Ee)&&(H.orchestration_effort=null),Ne(),ze()}async function Ie(S){if(!(!W()||S<Ua)){try{await Q("worker-queue-set-slots",{slots:S})}catch(U){o(`slots \uC800\uC7A5 \uC2E4\uD328: ${U instanceof Error?U.message:String(U)}`)}Ne()}}async function tt(S){if(!(!W()||S<Ua||S>iw)){try{await Q("worker-queue-set-serial-lane-count",{count:S})}catch(U){o(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${U instanceof Error?U.message:String(U)}`)}Ne()}}async function st(S,U){let K=S==="auto_advance"?"worker-automation-toggle":S==="auto_merge"?"worker-merge-auto-toggle":"worker-provider-auto-switch-toggle";try{await Q(K,{on:U})}catch(we){o(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${we instanceof Error?we.message:String(we)}`)}Ne()}function Qe(){let S={},U=pt();for(let K of To){let we=Fn.includes(K)?U[K]:s[K];typeof we=="string"&&we.length>0&&(S[K]=we)}return S}async function ct(){let S=G();if(!S)return;let U=Qe();if(Object.keys(U).length===0){o("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let K=(S.presets||[]).find(Ee=>Ee.id===P),we=q.trim()||(K?K.name:"");if(!we){o("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let Ee=K?await _e("impl-preset-update",{expected_revision:S.revision,id:K.id,name:we,settings:U}):await _e("impl-preset-create",{expected_revision:S.revision,name:we,settings:U});if(Ee&&Ee.applied){if(q="",!K&&Array.isArray(Ee.presets)){let ft=Ee.presets.find(vt=>vt.name===we);P=ft?ft.id:P}Ne()}else o("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Ne()}catch(Ee){o(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${Ee instanceof Error?Ee.message:String(Ee)}`)}}async function $t(){let S=G();if(!(!S||P.length===0))try{let U=await _e("impl-preset-delete",{expected_revision:S.revision,id:P});U&&U.applied?(P="",Ne()):(o("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Ne())}catch(U){o(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${U instanceof Error?U.message:String(U)}`)}}function mt(S){i=Ei(S.values),s={...i},u=Array.isArray(S.warnings)?S.warnings:[],Nn(S.queue)&&(t.onQueueAdopt?.(S.queue),H={})}async function Xe(S){let U=G(),K=W();if(!U||!K||P.length===0||S==="quick_fix"&&!Pe())return;let we=Ee=>({preset_id:P,expected_revision:U.revision,expected_queue_revision:Ee,...S==="quick_fix"?{lane:"quick_fix"}:{},...se()});try{let Ee=await _e("apply-impl-preset-global",we(K.revision));if(S==="quick_fix"&&Ee&&Ee.lane!=="quick_fix"){o("\uC11C\uBC84 \uC751\uB2F5\uC5D0 lane\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uD050 \uC2A4\uB0C5\uC0F7\uC744 \uB2E4\uC2DC \uBC1B\uC740 \uB4A4 \uD655\uC778\uD558\uC138\uC694"),Ne();return}if(Ee&&Ee.applied&&mt(Ee),r!==null&&Ee&&Ee.queue_applied===!1){let ft=Ee.queue&&typeof Ee.queue.revision=="number"?Ee.queue.revision:W()?.revision??K.revision;if(Ee=await _e("apply-impl-preset-global",we(ft)),S==="quick_fix"&&Ee&&Ee.lane!=="quick_fix"){o("\uC11C\uBC84 \uC751\uB2F5\uC5D0 lane\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uD050 \uC2A4\uB0C5\uC0F7\uC744 \uB2E4\uC2DC \uBC1B\uC740 \uB4A4 \uD655\uC778\uD558\uC138\uC694"),Ne();return}Ee&&Ee.applied&&mt(Ee)}Ee&&Ee.applied?Ee.queue_applied===!1&&o("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):Ee&&Ee.conflict&&o("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(Ee){o(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${Ee instanceof Error?Ee.message:String(Ee)}`)}Ne()}async function gt(){z=!0,B=!1,Ne();try{let S=await _e("get-worker-system-prompt",{});!S||typeof S!="object"||Array.isArray(S)?B=!0:N=S}catch{B=!0}finally{z=!1,Ne()}}function Zt(){if(F=!F,F&&!N){gt();return}Ne()}function A(){let S=Wo({loading:z,error:B});if(S)return S;if(!N)return"";let U=Array.isArray(N.variants)?N.variants:[];return c`<div class="settings-dialog__sp-body">
      ${N.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${N.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${U.map(K=>c`<div class="settings-dialog__sp-variant" data-variant=${K.key}>
            <div class="settings-dialog__sp-cond">${K.condition}</div>
            ${hr(K.label,K.system_prompt)}
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
        aria-expanded=${F?"true":"false"}
        @click=${Zt}
      >
        ${F?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${F?A():""}
    </section>`}function Me(S,U,K,we,Ee,ft,vt,xt){let Ct=Ee[S]??cn,qt=yl(S,K,Ee,fe(),oe(),vt,xt),Kt=qt.options.find(kt=>kt.value===Ct),en=Ct===cn?qt.full_value:Kt?.full_value;return c`<select
        class=${Ct===cn?"settings-dialog__unset":""}
        data-key=${S}
        aria-label=${U}
        title=${en||""}
        ?disabled=${ft===!0||xt!=="quick_fix"&&qt.disabled}
        .value=${Or(String(Ct))}
        @change=${kt=>we(S,String(kt.target.value))}
      >
        <option value=${cn} ?selected=${Ct===cn}>
          ${qt.unset_label}
        </option>
        ${qt.options.map(kt=>c`<option
              value=${kt.value}
              title=${kt.full_value||""}
              ?selected=${kt.value===Ct}
            >
              ${kt.label}
            </option>`)}
      </select>
      ${Ct===cn?c`<span class="settings-dialog__source-badge">기본</span>`:""}`}function Ce(S,U,K,we,Ee,ft=!1,vt,xt=null,Ct=null){return c`<div
      class=${`settings-dialog__row${ft?" settings-dialog__row--off":""}`}
      title=${ft&&Ct?Ct:""}
    >
      <span class="settings-dialog__row-label">${U}</span>
      <span class="settings-dialog__controls">
        ${Me(S,U,K,we,Ee,ft,vt,xt)}
      </span>
    </div>`}function Fe(S,U,K,we,Ee,ft){let vt=Object.hasOwn(a,S),xt=l[S]??s[S]??cn;return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${U}</span>
      <span class="settings-dialog__controls">
        <input
          type="text"
          class=${`settings-dialog__text${vt?" settings-dialog__text--invalid":""}`}
          data-key=${S}
          aria-label=${U}
          aria-invalid=${String(vt)}
          placeholder=${K}
          .value=${Or(xt)}
          @input=${Ct=>Ae(S,String(Ct.target.value))}
          @change=${Ct=>ge(S,String(Ct.target.value).trim(),ft)}
        />
        ${xt.length===0?c`<span class="settings-dialog__source-badge">기본</span>`:""}
        <span class="settings-dialog__hint" data-key-hint=${S}
          >${vt?Ee:we}</span
        >
      </span>
    </div>`}function Ue(S,U,K,we){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${U}</span>
      <span class="settings-dialog__controls">
        <label class="settings-dialog__check">
          <input
            type="checkbox"
            data-key=${S}
            .checked=${s[S]===as}
            @change=${Ee=>Y(S,Ee.target.checked?as:cn)}
          />
          ${K}
        </label>
        <span class="settings-dialog__hint" data-key-hint=${S}>${we}</span>
      </span>
    </div>`}function dt(S,U){let K=U?U.active:null;return Nn(K)?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${S==="claude"?K.email:zo({...K,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)"}function St(S,U,K){let we=T[K],Ee=Object.hasOwn(_,S)?_[S]:cn,ft=K==="claude"?Ra:zo,vt=!!we?.accounts.some(xt=>xt.key===Ee);return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${U}</span>
      <span class="settings-dialog__controls">
        <select
          aria-label=${U}
          data-account-key=${S}
          @change=${xt=>le(S,String(xt.target.value))}
        >
          <option value=${cn} ?selected=${Ee.length===0}>
            ${dt(K,we)}
          </option>
          ${Ee.length>0&&!vt?c`<option value=${Ee} selected>
                ${Ee} (목록에 없음)
              </option>`:""}
          ${we?.accounts.map(xt=>c`<option value=${xt.key} ?selected=${xt.key===Ee}>
                ${ft(xt)}
              </option>`)||""}
        </select>
        ${we?"":c`<span class="settings-dialog__hint"
              >계정 목록을 불러올 수 없습니다</span
            >`}
      </span>
    </div>`}function de(){let S=f.warnings.join(", ");return f.state==="unusable"?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uD574\uC11D\uD560 \uC218 \uC5C6\uC5B4 \uC774 \uB808\uD3EC\uC758 \uB514\uC2A4\uD328\uCE58\uAC00 \uAC70\uBD80\uB429\uB2C8\uB2E4 \u2014 ${S} \xB7 \uACC4\uC815\uC744 \uB2E4\uC2DC \uACE0\uB974\uBA74 \uD574\uC18C\uB429\uB2C8\uB2E4`:f.warnings.length>0?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC5D0 \uC54C \uC218 \uC5C6\uB294 \uD0A4\uAC00 \uC788\uC2B5\uB2C8\uB2E4 \u2014 ${S}`:null}function ke(S,U,K,we,Ee,ft){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${U}-on)`}
        ></i>
        ${S}
      </span>
      <span class="settings-dialog__controls">
        ${Me(K,`${S} \uBAA8\uB378`,we,Y,s,!1)}
        ${Me(Ee,`${S} effort`,Ci,Y,s,!1)}
        ${Me(ft,`${S} \uC18D\uB3C4`,Sd,Y,s,!1)}
      </span>
    </div>`}function He(S,U,K,we){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${U}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${we?" is-on":""}`}
          data-automation=${S}
          aria-pressed=${we?"true":"false"}
          aria-label=${U}
          @click=${()=>st(S,!we)}
        >
          ${we?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${K}</span>
      </span>
    </div>`}function it(S,U,K,we){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${U}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${S}>
          <button
            type="button"
            aria-label=${`${U} \uAC10\uC18C`}
            @click=${()=>we(K-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${K}</span>
          <button
            type="button"
            aria-label=${`${U} \uC99D\uAC00`}
            @click=${()=>we(K+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function nt(S,U){return c`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${S.rows.length>0?`\uBCC0\uACBD ${S.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${S.rows.map(K=>c`<div
            class="settings-dialog__preset-diff-row"
            data-diff-kind=${K.kind}
          >
            <span class="settings-dialog__preset-diff-label">${K.label}</span>
            <span class="settings-dialog__preset-diff-value"
              >${K.before??"\uAE30\uBCF8"}</span
            >
            <span class="settings-dialog__preset-diff-arrow">→</span>
            <span
              class="settings-dialog__preset-diff-value settings-dialog__preset-diff-after"
              >${K.after??(U==="quick_fix"?"\uAE30\uBCF8(\uD574\uC81C \u2192 \uC77C\uBC18 \uD504\uB85C\uD30C\uC77C)":"\uAE30\uBCF8(\uD574\uC81C)")}</span
            >
          </div>`)}
      ${S.ignored_keys.length>0?c`<div class="settings-dialog__preset-diff-note">
            ${S.ignored_keys.join(", ")}은(는)
            ${U==="quick_fix"?"quick_fix \uB808\uC778":"\uC804\uC5ED"} 적용이 쓰지 않는
            키라 무시됩니다
          </div>`:""}
    </div>`}function pt(){let S=W(),U={};for(let K of[...Fn,...Eo])U[K]=Object.prototype.hasOwnProperty.call(H,K)?H[K]:S&&typeof S[K]=="string"?S[K]:null;return U}function yt(){let S=pt(),U={};for(let K of Eo)U[K]=S[K]??null;for(let K of["quick_fix_impl_dispatch","quick_fix_impl_runtime","quick_fix_impl_model","quick_fix_impl_effort","quick_fix_impl_speed"])U[K]=s[K]??null;return U}function et(){let S=oe(),U=s.impl_runtime,K=s.impl_model,we=G(),Ee=W(),ft=pt(),vt=Co(S,ne),xt=Ro(S,void 0).filter(Ke=>Ke!==Tn),Ct=Vr(S,void 0,void 0),qt=Oi(S,ne,ft.orchestration_model||Tn).filter(Ke=>Ke!==Tn),Kt=P?(we?.presets||[]).find(Ke=>Ke.id===P):null,en=Kt?Cd(Qe(),Nn(Kt.settings)?Kt.settings:{}):null,kt={quick_fix_orchestration_model:Co(S,null),quick_fix_orchestration_effort:Oi(S,null,null).filter(Ke=>Ke!==Tn),quick_fix_orchestration_speed:Jn,quick_fix_impl_dispatch:ls,quick_fix_impl_runtime:P_,quick_fix_impl_model:xt,quick_fix_impl_effort:Ct,quick_fix_impl_speed:Jn},an=Kt?Od(yt(),Nn(Kt.settings)?Kt.settings:{},kt):null,un=O==="quick_fix"?an:en,Lt=Pe(),jt=Lt?null:"\uC11C\uBC84\uAC00 quick_fix \uB808\uC778\uC744 \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4",Vt={...s,...ft},Be=Ee&&typeof Ee.slots=="number"?Ee.slots:Ua+1,E=Ee&&typeof Ee.serial_lane_count=="number"?Ee.serial_lane_count:Ua,he=fe()?.supported===!0,De=de(),ht=yl("workflow_mode",cs,s,fe(),S);return c`
      ${u.length>0?c`<div class="settings-dialog__banner" role="alert">
            워크스페이스 기본값을 일부 읽지 못했습니다 —
            ${u.join(", ")}
          </div>`:""}
      ${De?c`<div
            class="settings-dialog__banner"
            data-account-warning
            role="alert"
          >
            ${De}
          </div>`:""}
      ${he?"":c`<div
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
                .value=${Or(P)}
                @change=${Ke=>{P=String(Ke.target.value),Ne()}}
              >
                <option value="" ?selected=${P===""}>
                  실행 프리셋…
                </option>
                ${(we?.presets||[]).map(Ke=>c`<option
                      value=${Ke.id}
                      ?selected=${Ke.id===P}
                    >
                      ${Ke.name}
                    </option>`)}
              </select>
              <button
                type="button"
                class="settings-dialog__btn settings-dialog__btn--primary op-btn"
                data-preset-apply-global
                data-preset-apply-general
                ?disabled=${!en||en.rows.length===0}
                @click=${()=>Xe("general")}
              >
                일반에 적용
              </button>
              <button
                type="button"
                class="settings-dialog__btn op-btn"
                data-preset-apply-quick-fix
                title=${jt||""}
                ?disabled=${!Lt||!an||an.rows.length===0}
                @click=${()=>Xe("quick_fix")}
              >
                quick_fix 레인에 적용
              </button>
              <input
                type="text"
                class="settings-dialog__preset-name"
                placeholder=${P?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                aria-label="프리셋 이름"
                .value=${Or(q)}
                @input=${Ke=>{q=String(Ke.target.value)}}
              />
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-save
                title=${P?"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC774 \uD504\uB9AC\uC14B\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4 (\uD504\uB9AC\uC14B \u2192 \uC124\uC815 \uBC29\uD5A5\uC774 \uC544\uB2D8)":"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC0C8 \uD504\uB9AC\uC14B\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4"}
                @click=${ct}
              >
                ${P?"\uD604\uC7AC \uC124\uC815\uC73C\uB85C \uB36E\uC5B4\uC4F0\uAE30":"\uC0C8 \uD504\uB9AC\uC14B \uC800\uC7A5"}
              </button>
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-delete
                ?disabled=${P.length===0}
                @click=${$t}
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
            ${un?nt(un,O):""}

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">오케스트레이션</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">런타임</span>
                <span class="settings-dialog__controls">
                  <select
                    aria-label="런타임"
                    data-key="orchestration_runtime_filter"
                    .value=${Or(ne||cn)}
                    @change=${Ke=>{let Et=String(Ke.target.value);Z(Et===cn?null:Et)}}
                  >
                    <option value=${cn} ?selected=${!ne}>
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
              ${Ce("orchestration_model","\uBAA8\uB378",vt,ie,ft)}
              ${Ce("orchestration_effort","effort",qt,ie,ft)}
              ${Ce("orchestration_speed","\uC18D\uB3C4",Jn,ie,ft)}
            </div>

            <div class="settings-dialog__group" data-exec-accounts-group>
              <div class="settings-dialog__group-title">실행 계정</div>
              ${St("claude_account","Claude","claude")}
              ${St("codex_account","Codex","codex")}
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">한도 대응</span>
                <span class="settings-dialog__controls">
                  <label class="settings-dialog__check">
                    <input
                      type="checkbox"
                      data-provider-auto-switch
                      .checked=${Ee?.provider_auto_switch!==!1}
                      @change=${Ke=>st("provider_auto_switch",Ke.target.checked)}
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
                      data-mode=${cn}
                      aria-pressed=${String(!s.workflow_mode)}
                      @click=${()=>Y("workflow_mode",cn)}
                    >
                      ${ht.unset_label}
                    </button>
                    ${s.workflow_mode?"":c`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${cs.map(Ke=>c`<button
                          type="button"
                          data-mode=${Ke}
                          aria-pressed=${String(s.workflow_mode===Ke)}
                          @click=${()=>Y("workflow_mode",Ke)}
                        >
                          ${Ke}
                        </button>`)}
                  </span>
                </span>
              </div>
              ${Fe("bdui_url","beads-ui \uC8FC\uC18C","http://\uD638\uC2A4\uD2B8:3000","\uC138\uC158\uC774 Worker \uB808\uC778 \uBC30\uCE58\uB97C \uBB3C\uC5B4\uBCFC \uB54C \uC4F0\uB294 \uC8FC\uC18C\uC785\uB2C8\uB2E4","http:// \uB610\uB294 https:// \uB85C \uC2DC\uC791\uD558\uB294 \uC8FC\uC18C\uB9CC \uC800\uC7A5\uB429\uB2C8\uB2E4 (\uACBD\uB85C \uC5C6\uC774)",Ad)}
              ${Ue("base_sync_accept_local_commits","base \uB3D9\uAE30\uD654","\uB85C\uCEEC base \uC0AC\uC6A9\uC790 \uCEE4\uBC0B \uC790\uB3D9 rebase+push","\uAEBC\uB450\uBA74 \uB85C\uCEEC base \uCCB4\uD06C\uC544\uC6C3\uC758 \uC0AC\uC6A9\uC790 \uCEE4\uBC0B\uC740 \uADF8\uB300\uB85C \uB0A8\uC2B5\uB2C8\uB2E4")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                리뷰 게이트
                <span class="settings-dialog__hint">모델 · effort · 속도</span>
              </div>
              ${ke("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",us,"spec_review_effort","spec_review_speed")}
              ${ke("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",Ri,"plan_review_effort","plan_review_speed")}
              ${ke("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",us,"impl_review_effort","impl_review_speed")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${Ce("impl_runtime","\uC704\uC784 \uB300\uC0C1",Ti,Y,s)}
              ${Ce("impl_model","\uBAA8\uB378",Ro(S,U),Y,s)}
              ${Ce("impl_effort","effort",Vr(S,U,K),Y,s)}
              ${Ce("impl_speed","\uC18D\uB3C4",Jn,Y,s)}
            </div>

            <div
              class="settings-dialog__group"
              data-quick-fix-group
              title=${jt||""}
            >
              <div class="settings-dialog__group-title">
                quick_fix 레인
                <span class="settings-dialog__hint"
                  >${"\uBE44\uC5B4 \uC788\uB294 \uAC12\uC740 \uC77C\uBC18 \uD504\uB85C\uD30C\uC77C\uB85C \uB5A8\uC5B4\uC9D1\uB2C8\uB2E4. \uC774\uC288 \uD540\uC774 \uC788\uC73C\uBA74 \uD540\uC774 \uC6B0\uC120\uD569\uB2C8\uB2E4."}</span
                >
              </div>
              ${Ce("quick_fix_orchestration_model","\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",kt.quick_fix_orchestration_model,ie,ft,!Lt,Vt,"quick_fix",jt)}
              ${Ce("quick_fix_orchestration_effort","\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",kt.quick_fix_orchestration_effort,ie,ft,!Lt,Vt,"quick_fix",jt)}
              ${Ce("quick_fix_orchestration_speed","\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4",Jn,ie,ft,!Lt,Vt,"quick_fix",jt)}
              ${Ce("quick_fix_impl_dispatch","\uC2E4\uD589 \uBC29\uC2DD",ls,Y,s,!Lt,Vt,"quick_fix",jt)}
              ${Ce("quick_fix_impl_runtime","\uC704\uC784 \uB300\uC0C1",P_,Y,s,!Lt,Vt,"quick_fix",jt)}
              ${Ce("quick_fix_impl_model","\uBAA8\uB378",xt,Y,s,!Lt,Vt,"quick_fix",jt)}
              ${Ce("quick_fix_impl_effort","effort",Ct,Y,s,!Lt,Vt,"quick_fix",jt)}
              ${Ce("quick_fix_impl_speed","\uC18D\uB3C4",Jn,Y,s,!Lt,Vt,"quick_fix",jt)}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                자동화
                <span class="settings-dialog__hint"
                  >이 레포의 워커 큐가 스스로 진행하는 범위</span
                >
              </div>
              ${He("auto_advance","\uC790\uB3D9\uD654","\uC2AC\uB86F\uC774 \uBE44\uBA74 \uB300\uAE30 \uC55E \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4",Ee?.auto_advance===!0)}
              ${He("auto_merge","\uBA38\uC9C0","\uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4",Ee?.auto_merge===!0)}
              ${it("slots","\uB3D9\uC2DC \uC2E4\uD589",Be,Ke=>Ie(Ke))}
              ${it("serial-lane-count","\uC9C1\uB82C \uB808\uC778",E,Ke=>tt(Ke))}
            </div>
            ${re()}
          `}
    `}function Ne(){V||lt(et(),e)}return{load(){H={},O="general",l={},a={};let S=[ce(),L()];return D||S.push(Re()),Promise.all(S).then(()=>{})},render:Ne,sessionDraft:()=>({...s}),destroy(){V=!0,lt(c``,e)}}}function Ha(e){return c`<svg
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
  </svg>`}function D_(){return Ha(ts`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function M_(){return Ha(ts`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function N_(){return Ha(ts`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function q_(){return Ha(ts`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function j_(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function F_(e){let t=(Array.isArray(e)?e:[]).map(l=>l&&l.usage).filter(l=>l&&typeof l=="object"&&"providers"in l);if(t.length>0)return mn($i(t));let n={};for(let l of Zn)n[l]=0;let r=!1,o=0,i=0,s=0;for(let l of Array.isArray(e)?e:[]){let a=l&&l.usage;if(a&&typeof a=="object"){let u=!1;for(let d of Zn){let f=a[d];typeof f=="number"&&Number.isFinite(f)&&(n[d]+=f,r=!0,u=!0)}if(u){i+=1;let d=a.total_cost_usd;typeof d=="number"&&Number.isFinite(d)&&(o+=d,s+=1)}}}return i>0&&s===i&&(n.total_cost_usd=o),r?lr(n):null}function Gn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Fc(e,t){let n=Gn(e?.counts)?e.counts:null,r=n?n[t]:null;return typeof r=="number"&&Number.isFinite(r)?r:0}function aw(e,t){if(!Gn(t))return e;let n={...e};for(let[r,o]of Object.entries(t))o!==void 0&&(n[r]=o);return n}function lw(e){if(!Gn(e)||!Gn(e.execution_defaults)||!Gn(e.runner_catalog)||!Gn(e.session_defaults))return null;let t={...e.session_defaults};for(let s of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[s]=="string"&&e[s].length>0&&(t[s]=e[s]);let n=Cn({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),r=Bn(e.runner_catalog,n.orchestration_model.value??""),o=Oo(n,e.runner_catalog),i=Yr(n,r);return o===null&&i===null?null:{orchestration:o,worker:i}}function B_(e,t){let n=t.notify||(Q=>ve(Q,"error",4e3)),r=document.createElement("div");r.className="mon2-deck__main",e.appendChild(r);let o=document.createElement("div");o.className="mon2-deck__panel",o.hidden=!0;let i=document.createElement("div");i.className="mon2-deck__panel-hd";let s=document.createElement("span");s.className="mon2-deck__panel-title";let l=document.createElement("button");l.type="button",l.className="mon2-deck__panel-close",l.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),l.textContent="\u2715",i.append(s,l);let a=document.createElement("div");a.className="mon2-deck__panel-body",o.append(i,a),e.appendChild(o);let u=null,d=null,f=null,_=new Map;function k(){let Q=t.workspacesState?t.workspacesState():[];return Array.isArray(Q)?Q.filter(ce=>Gn(ce)):[]}function m(Q){return k().find(ce=>ce.root_dir===Q)||null}function R(Q){return aw(m(Q),_.get(Q))}function T(){for(let Q of k()){let ce=_.get(Q.root_dir);ce&&typeof ce.revision=="number"&&typeof Q.revision=="number"&&Q.revision>=ce.revision&&_.delete(Q.root_dir)}}async function D(Q,ce,J){let Se=t.transport,be=R(ce);if(!(!Se||!Gn(be))){try{let me=await Se(Q,{...J,root_dir:ce,expected_revision:be.revision});if(Gn(me?.queue)&&_.set(ce,me.queue),me&&me.conflict){let L=Gn(me.queue)&&typeof me.queue.revision=="number"?me.queue.revision:R(ce)?.revision;me=await Se(Q,{...J,root_dir:ce,expected_revision:L}),Gn(me?.queue)&&_.set(ce,me.queue)}}catch(me){n(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${me instanceof Error?me.message:String(me)}`)}se()}}function ne(Q){u!==Q&&(u=Q,t.onFocusChange?.(u),se())}function H(Q){ne(u===Q?null:Q)}function P(Q){if(d===Q){q();return}O(),d=Q;let ce=m(Q);s.textContent=`${ce?.name||Q} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,o.hidden=!1,f=Wa(a,{root_dir:Q,queue:()=>R(Q),transport:t.transport,implPresetStore:t.implPresetStore,notify:n,onQueueAdopt:J=>{_.set(Q,J),se()}}),f.load(),se()}function O(){f?.destroy(),f=null}function q(Q){O(),d=null,o.hidden=!0,s.textContent="",Q!==!0&&se()}let F=()=>q();l.addEventListener("click",F);function z(Q){Q.key==="Escape"&&u!==null&&ne(null)}document.addEventListener("keydown",z);function B(Q,ce){let J=Math.max(ce,Q,1);return c`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${ce}\uAC1C \uC911 ${Q}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:J},(Se,be)=>be<Q?c`<i class="mon2-deck__slot is-run"></i>`:c`<i class="mon2-deck__slot"></i>`)}
    </span>`}function N(Q){let ce=Q.auto_advance===!0,J=Q.auto_merge===!0;return c`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${ce?" is-on":""}`}
        data-act="auto"
        aria-pressed=${ce?"true":"false"}
        aria-label=${`${Q.name} \uC790\uB3D9\uD654`}
        title=${ce?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${ce?M_():D_()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${J?" is-on":""}`}
        data-act="merge"
        aria-pressed=${J?"true":"false"}
        aria-label=${`${Q.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${J?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${N_()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__gear${d===Q.root_dir?" is-on":""}`}
        data-act="gear"
        aria-expanded=${d===Q.root_dir?"true":"false"}
        aria-label=${`${Q.name} \uC2E4\uD589 \uC124\uC815`}
        title="이 레포의 실행 설정"
      >
        ${q_()}
      </button>`}function V(Q){let ce=lw(Q);return ce?c`<div class="mon2-deck__chips">
      ${ce.orchestration?c`<span class="mon2-deck__chip" title=${ce.orchestration.title}
            >오케 ${ce.orchestration.text}</span
          >`:""}
      ${ce.worker?c`<span class="mon2-deck__chip" title=${ce.worker.title}
            >워커 ${ce.worker.text}</span
          >`:""}
    </div>`:""}function W(Q){let ce=[];for(let[J,Se]of[["queue","\uB300\uAE30"],["pr_wait","PR"],["session_active","\uC138\uC158"]]){let be=Fc(Q,J);be>0&&ce.push(`${Se} ${be}`)}return ce.join(" \xB7 ")}function oe(Q){let ce=Fc(Q,"running"),J=typeof Q.slots=="number"?Q.slots:1;return c`<div
      class=${`mon2-deck__tile${u===Q.root_dir?" is-focus":""}`}
      role="button"
      tabindex="0"
      data-root-dir=${Q.root_dir}
      aria-pressed=${u===Q.root_dir?"true":"false"}
      title="클릭하면 이 레포만 선명하게 봅니다 (Esc로 해제)"
    >
      <div class="mon2-deck__tile-hd">
        <span class="mon2-deck__name" title=${Q.root_dir}>${Q.name}</span>
        <span
          class="mon2-deck__load"
          title=${`\uC2AC\uB86F ${J}\uAC1C \uC911 ${ce}\uAC1C \uC2E4\uD589 \uC911`}
        >
          <span class="mon2-deck__load-n">${ce}/${J}</span>
          ${B(ce,J)}
        </span>
        <button
          type="button"
          class="mon2-deck__worker"
          data-act="worker"
          aria-label=${`${Q.name} Worker \uD0ED\uC73C\uB85C \uC774\uB3D9`}
          title="이 레포의 Worker 탭으로 이동"
        >
          ↗
        </button>
      </div>
      <div class="mon2-deck__tile-ft">
        <div class="mon2-deck__ops">${N(Q)}</div>
        <span class="mon2-deck__counts">${W(Q)}</span>
        ${V(Q)}
      </div>
    </div>`}function fe(Q){let ce=t.doneItems?t.doneItems():[],J=t.rangeLabel?t.rangeLabel():"",Se=F_(Array.isArray(ce)?ce:[]),be=me=>Q.reduce((L,ee)=>L+Fc(ee,me),0);return c`<div class="mon2-deck__bar">
      <span
        class="mon2-deck__total-counts"
        title=${`visible \uB808\uD3EC ${Q.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${J}`}
        >실행 ${be("running")} · 대기 ${be("queue")} · PR
        ${be("pr_wait")}${be("session_active")>0?` \xB7 \uC138\uC158 ${be("session_active")}`:""}
        · ${J} 완료
        ${Array.isArray(ce)?ce.length:0}</span
      >
      ${Se===null?"":c`<span class="mon2-deck__total-tokens">
            ${typeof Se=="string"?c`<span
                  class="mon2-deck__tok"
                  title=${j_(J)}
                  >${Se}</span
                >`:Se.map(me=>c`<span
                      class="mon2-deck__tok"
                      data-provider=${me.provider}
                      title=${me.tooltip}
                      >${me.label}</span
                    >`)}
          </span>`}
    </div>`}function Pe(){let Q=k();return Q.length===0?"":c`${fe(Q)}
      <div class="mon2-deck__strip">
        ${Q.map(ce=>oe(ce))}
      </div>`}function G(){u!==null&&!m(u)&&(u=null,t.onFocusChange?.(null))}function se(){T(),G(),d!==null&&!m(d)&&q(!0),lt(Pe(),r),f?.render()}function _e(Q){let ce=Q.target;if(!ce||typeof ce.closest!="function")return;let J=ce.closest("[data-root-dir]");if(!J)return;let Se=J.getAttribute("data-root-dir")||"",be=ce.closest("[data-act]")?.getAttribute("data-act");if(be==="worker"){t.gotoWorkerTab?.(Se);return}if(be==="auto"){D("worker-automation-toggle",Se,{on:R(Se)?.auto_advance!==!0});return}if(be==="merge"){D("worker-merge-auto-toggle",Se,{on:R(Se)?.auto_merge!==!0});return}if(be==="gear"){P(Se);return}H(Se)}function Oe(Q){if(Q.key!=="Enter"&&Q.key!==" ")return;let ce=Q.target;if(!ce||typeof ce.closest!="function")return;let J=ce.closest('[data-root-dir][role="button"]');!J||J!==ce||(Q.preventDefault(),H(J.getAttribute("data-root-dir")||""))}return r.addEventListener("click",_e),r.addEventListener("keydown",Oe),{render:se,focusRoot:()=>u,panelRoot:()=>d,destroy(){document.removeEventListener("keydown",z),r.removeEventListener("click",_e),r.removeEventListener("keydown",Oe),l.removeEventListener("click",F),O(),lt(c``,r),e.replaceChildren()}}}var cw=1e4,H_="bdui.monitor.done-range",z_="bdui.monitor.running_sort",K_="bdui.monitor.candidate_sort",G_="beads-ui.monitor.candidate-filter",V_="beads-ui.monitor.sections";function uw(){try{let e=window.localStorage.getItem(G_);if(!e)return{...No};let t=JSON.parse(e);return!t||typeof t!="object"?{...No}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:No.show_blocked,readiness:Ss.some(n=>n.value===t.readiness)?t.readiness:"all",routes:no(t.routes)}}catch{return{...No}}}function Bc(e){try{window.localStorage.setItem(G_,JSON.stringify({show_blocked:e.show_blocked,readiness:e.readiness,routes:e.routes}))}catch{}}function dw(){try{let e=window.localStorage.getItem(K_);return As.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function pw(e){try{window.localStorage.setItem(K_,e)}catch{}}function fw(){try{let e=window.localStorage.getItem(V_);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function _w(e){try{window.localStorage.setItem(V_,JSON.stringify(e))}catch{}}function mw(){try{let e=window.localStorage.getItem(H_);return e===null?"today":Yn(e)}catch{return"today"}}function gw(e){try{window.localStorage.setItem(H_,e)}catch{}}function hw(){try{return window.localStorage.getItem(z_)==="repo"?"repo":"started"}catch{return"started"}}function bw(e){try{window.localStorage.setItem(z_,e)}catch{}}var Y_="tab:monitor:pipeline",yw=1e3,U_=[{lane:"runnable",pane:"candidate",title:"\uD6C4\uBCF4",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589 \uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],vw=["queue","runnable","done"],W_="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function kw(e){return e>=1&&e<=W_.length?W_[e-1]:`(${e})`}function Q_(e,t){let n=Bt("views:monitor"),r=t.gotoIssue,o=t.pipelineStore,i=t.transport,s=t.getWorkspacePath,l=t.openDoc,a=t.switchWorkspace,u=t.router,d=t.now||(()=>Date.now()),f=t.confirm||(v=>typeof globalThis.confirm!="function"||globalThis.confirm(v)),_=mw(),k=hw(),m=uw(),R=dw(),T=fw(),D=La("beads-ui.monitor.lane-collapsed"),ne=!1,H=null,P=null,O=null,q=null,F=null,z=null,B=Io(()=>K()),N=null,V=null,W=null,oe=null;function fe(v){return oe===null&&(oe=Y()),Xp(v,oe)}function Pe(v,p){G(),!(p<=0)&&(V={lane_id:v,corrected:p},W=setTimeout(()=>{W=null,V=null,K()},cw))}function G(){W!==null&&(clearTimeout(W),W=null),V=null}function se(){let v=fo.find(p=>p.value===_);return v?v.label:""}let _e=document.createElement("div");_e.className="mon",e.appendChild(_e);let Oe=document.createElement("div");Oe.className="worker-drawer-overlay",Oe.hidden=!0;let Q=document.createElement("div");Q.className="worker-drawer-overlay__backdrop";let ce=document.createElement("div");ce.className="worker-drawer-host mon2-drawer",Oe.append(Q,ce),e.appendChild(Oe);let J=Tr(null,null),Se=new Map,be=new Map,me=new Set,L=null,ee=null,Re=null,I=Ho(ce,{transport:i,sessionLogStore:t.sessionLogStore,onClose:()=>{P=null,Oe.hidden=!0,K()}}),ae=Da({transport:i,console_el:_e,getLanes:()=>J,getWorkspaces:()=>o&&o.get?o.get():null,getCrossLanes:en,reproject:v=>({lanes:U(v),raw_lanes:v}),onCorrection:Pe,showToast:ve,requestRender:()=>K(),adoptQueue:(v,p)=>{be.set(v,p)},onDragBegin:()=>{O=null},candidate_drop:!0}),{applyDrop:le,dropModel:Y,runPlanned:Ae,sendQueueCas:ge}=ae;async function Le(v,p,h,$,X=!0){if(!i||!h)return null;let g=await i(v,{...p,root_dir:h,expected_revision:$});if(g&&g.conflict&&X){g.queue&&be.set(h,g.queue);let b=g.queue&&typeof g.queue.revision=="number"?g.queue.revision:$;g=await i(v,{...p,root_dir:h,expected_revision:b})}return g&&g.queue&&h&&be.set(h,g.queue),g}function qe(v){let p=be.get(v);if(p)return p;let h=o&&o.get?o.get():null;return(Array.isArray(h)?h:[]).find($=>$?.root_dir===v)||{}}function Ze(v,p){return qe(v)?.merge_queue?.find($=>$.bead_id===p)?.continuation_action}async function ze(v,p,h,$){let X=await Le(v,p,h,$),g=be.get(h)?.revision??X?.queue?.revision??$;return Cr(X,(b,te)=>Le(v,{...p,continuation:b,decision_token:te},h,g,!1),{refresh:b=>Le(v,p,h,b?.queue?.revision??be.get(h)?.revision??g,!1)})}async function ie(v,p,h,$){let X=await Cr({continuation_mismatch:$},(b,te)=>Le("worker-merge-queue-add",{bead_id:p,continuation:b,decision_token:te},v,h,!1)),g=X?.queue?.merge_queue?.find(b=>b.bead_id===p)?.continuation_action;X?.applied!==!0&&g?.continuation===null&&g.mismatch&&await ie(v,p,X.queue.revision,g.mismatch)}async function Z(v,p,h){let $=await Le("worker-discard",v,p,h);if($&&$.discarded===!0){ve(zi($),"success",5e3);return}if($&&$.reason){ve(`\uD3D0\uAE30 \uC2E4\uD328: ${$.reason}`,"error");return}if($&&$.accepted&&$.pending==="merged_revert"){ve("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if($&&$.accepted){ve(`\uD3D0\uAE30 \uC9C4\uD589: ${$.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}$&&!$.conflict&&ve("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function Ie(v,p,h,$){let X=await Le("worker-discard-abandon",v,p,h);if(X&&X.abandoned===!0){ve(Hi($),"success",5e3);return}if(X&&X.reason){ve(`\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: ${X.reason}`,"error");return}X&&!X.conflict&&ve("\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: unknown","error")}async function tt(v,p,h){return!i||!h?null:await i(v,{...p,root_dir:h})}async function st(v,p,h){if(!me.has(v)){me.add(v),K();try{let $=await Le("worker-resolve-in-session",{bead_id:v},p,h,!1);$?.session==="already_running"?ve(`\uC774\uBBF8 \uC5F4\uB824 \uC788\uC2B5\uB2C8\uB2E4 \xB7 ${$.tmux_window||"?"}`,"error"):$?.launched!==!0?ve(`\uC138\uC158 \uAE30\uB3D9 \uC2E4\uD328: ${$?.reason||"unknown"}`,"error"):$.mode!=="fork"&&ve(`\uC0C8 \uC138\uC158\uC73C\uB85C \uC2DC\uC791 (${$.fallback_reason||"unknown"})`,"success")}finally{me.delete(v),K()}}}async function Qe(){let v=new Map;for(let p of J.pr_wait)v.has(p.root_dir)||v.set(p.root_dir,p.expected_revision);for(let[p,h]of v)await Le("worker-merge-queue-add-all",{},p,h)}function ct(v){let p=T[v];return!!(p&&p.runnable===!0)}function $t(v){let p={...T[v]||{}};p.runnable=!p.runnable,T={...T,[v]:p},_w(T),K()}function mt(v){D.toggle(v),K()}function Xe(v){D.toggleArea(v),K()}function gt(v){let p=v.dependency_chips||null,h=v.overlap_chips||[],$=v.scope_state==="missing",X=v.armed_lane_chip;return!p&&h.length===0&&!$&&!X?null:{...p||{},...h.length>0?{overlaps:h}:{},...$?{scope_missing:!0}:{},...X?{armed_lane:X}:{}}}function Zt(v){return Xi(v,p=>B.isOpen({bead_id:v.id,chip_key:p}))}function A(v){let p=gt(v),h=Zt(v);return p||h?{...v,...p?{dependency_chips:p}:{},...h?{chip_popover:h}:{}}:v}function re(v){let p=ct(v.root_dir);return c`<header class="mon2-sec__hd">
      <button
        type="button"
        class="mon2-sec__toggle"
        data-root-dir=${v.root_dir}
        data-section="runnable"
        aria-expanded=${p?"false":"true"}
        aria-label=${`${v.name} \uC139\uC158 ${p?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
      >
        ${p?"\u25B8":"\u25BE"}
      </button>
      <span class="mon2-sec__name" title=${v.root_dir}>${v.name}</span>
      <span class="mon2-sec__count">${v.count}</span>
      <button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${v.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>
    </header>`}function Me(v,p){return c`<div
      class="mon2-item"
      data-bead-id=${v.id}
      data-drag-kind="candidate"
      data-root-dir=${v.root_dir}
    >
      ${p}
    </div>`}function Ce(v){if(O!==v.id)return null;let p=J.queue_groups.find(g=>g.root_dir===v.root_dir),h=v.place_lanes||[],$=J.cross_lanes_revision!==null,X=[{id:"parallel",label:"\uBCD1\uB82C",count:v.place_index??0}];for(let g of J.chain_lanes)X.push({id:`lane:${g.lane_id}`,label:`\uC5F0\uACB0 ${g.number} (${g.draft?"draft":"\uD655\uC815"}) \uB05D\uC5D0`,count:g.rows.length,group:"\uC5F0\uACB0 \uB808\uC778",disabled:!$});X.push({id:"new-lane",label:"+ \uC0C8 \uC5F0\uACB0 \uB808\uC778",group:"\uC5F0\uACB0 \uB808\uC778",disabled:!$,title:$?"\uC774 \uC774\uC288\uB9CC \uB4E0 draft \uB808\uC778\uC744 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"});for(let g of h)X.push({id:`serial:${g.id}`,label:`\uC9C1\uB82C ${Number(g.id.slice(1))}`,count:g.length,group:`${p?p.name:""} \uC9C1\uB82C`});return{bead_id:v.id,lanes:X}}function Fe(v){return Me(v,c`${Dl(A(v),Ce(v),{exec_chips_mode:"pinned_only",onOpenDoc:l?(p,h)=>l(h,v.root_dir):void 0})}`)}function Ue(){return J.runnable_flat?c`<div class="mon2-flat" data-drop="candidate">
        ${J.runnable.map(v=>Fe(v))}
      </div>`:c`${J.runnable_sections.map(v=>{let p=ct(v.root_dir);return c`<section
        class="mon2-sec${p?" is-collapsed":""}"
        data-root-dir=${v.root_dir}
        data-section="runnable"
      >
        ${re({root_dir:v.root_dir,name:v.name,count:v.items.length})}
        ${p?"":c`<div
              class="mon2-sec__body"
              data-lane="candidate"
              data-drop="candidate"
            >
              ${v.items.map(h=>Fe(h))}
            </div>`}
      </section>`})}`}function dt(v,p){return c`<div
      class="mon2-item"
      data-bead-id=${v.id}
      data-drag-kind="parallel"
      data-root-dir=${v.root_dir}
      data-row-index=${p}
      data-queue-index=${String(v.queue_index??0)}
    >
      ${Un(A(v),{actions:Mo(v,{nudgeable:!0})})}
    </div>`}function St(v,p,h,$){return c`<div
      class="mon2-crow${p.fixed?" mon2-crow--fixed":""}"
      draggable=${p.draggable?"true":"false"}
      data-bead-id=${p.id}
      data-drag-kind="chain"
      data-root-dir=${p.root_dir}
      data-lane-id=${v.lane_id}
      data-row-index=${h}
      data-queue-index=${typeof p.queue_index=="number"?String(p.queue_index):""}
    >
      <span class="mon2-crow__seq" aria-hidden="true"
        >${kw(p.seq)}</span
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
      ${$.includes(p.id)?c`<span
            class="mon2-crow__mismatch"
            title="이미 실행된 뒤 의존이 바뀌었습니다 — 이 행은 움직일 수 없어 교정하지 않습니다"
            >⚠ 의존 순서와 다름</span
          >`:""}
      <span class="mon2-crow__where" title=${p.location_title}
        >${p.location_label}</span
      >
      ${eo(p.route?{route:p.route,route_source:p.route_source??void 0}:null)}${p.exec_chips?Jr(p.exec_chips):""}
      ${Cl(p.added_at)}
      ${Ol({id:p.id,...typeof p.added_at=="number"?{added_at:p.added_at}:{}})}
      <button
        type="button"
        class="mon2-crow__detach"
        data-bead-id=${p.id}
        title="연결에서 빼고 앞뒤를 이어 붙입니다"
        aria-label="연결에서 빼기"
      >
        ✕
      </button>
    </div>`}function de(v){let p=J.cross_lanes_revision!==null,h=fe(v.lane_id),$=h?.held===!0,X=h?.cycle===!0,g=h?h.mismatched:[],b=V&&V.lane_id===v.lane_id?V.corrected:0;return c`<div class="mon2-clane" data-lane-id=${v.lane_id}>
      <header class="mon2-clane__hd">
        <span class="mon2-clane__name">${v.label}</span>
        <span class="mon2-clane__count">${v.rows.length}</span>
        <span class="mon2-clane__badge mon2-clane__badge--${v.state}"
          >${v.badge}</span
        >
        ${b>0?c`<span
              class="mon2-clane__corrected"
              title="기존 blocks 의존이 드롭 순서를 이깁니다 — 그 순서로 다시 놓았습니다"
              >의존에 맞춰 ${b}건 자동 교정</span
            >`:""}
        ${X?c`<span
              class="mon2-clane__cycle"
              title="멤버들의 blocks 의존이 순환합니다 — 어느 순서도 의존을 만족시키지 못합니다"
              >⛔ 의존 사이클 — 자동 교정 불가</span
            >`:""}
        ${$?c`<span
              class="mon2-clane__hold"
              title="멤버 한 명의 의존 자료가 이 스냅샷에 아직 없습니다 — 다음 스냅샷이 채우면 교정합니다"
              >${da}</span
            >`:""}
        ${v.draft?c`<button
              type="button"
              class="mon2-clane__confirm"
              data-lane-id=${v.lane_id}
              ?disabled=${!p||!v.can_confirm||$}
              title=${$?da:v.can_confirm?"\uC778\uC811 \uC758\uC874\uC744 \uAC78\uACE0 \uBBF8\uC801\uC7AC \uBA64\uBC84\uB97C \uAC01\uC790 \uB808\uD3EC \uBCD1\uB82C \uD050 \uB05D\uC5D0 \uC62C\uB9BD\uB2C8\uB2E4":"\uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD655\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4"}
            >
              확정
            </button>`:""}
        ${v.run_label!==null?c`<button
              type="button"
              class="mon2-clane__run"
              data-lane-id=${v.lane_id}
              ?disabled=${!p}
              title="이 레인 멤버만 발차합니다 — 레포 자동 진행은 켜지 않습니다"
            >
              ${v.run_label}
            </button>`:""}
        ${v.state==="confirmed"&&v.has_mismatch?c`<button
              type="button"
              class="mon2-clane__reapply"
              data-lane-id=${v.lane_id}
              ?disabled=${!p}
              title="빠진 인접 의존을 다시 걸고 미적재 멤버를 다시 올립니다"
            >
              재적용
            </button>`:""}
        ${v.can_stop?c`<button
              type="button"
              class="mon2-clane__stop"
              data-lane-id=${v.lane_id}
              ?disabled=${!p}
              title="남은 멤버의 발차만 멈춥니다 — 도는 세션과 머지 큐 항목은 끝까지 갑니다"
            >
              ⏸ 정지
            </button>`:""}
        <button
          type="button"
          class="mon2-clane__remove"
          data-lane-id=${v.lane_id}
          ?disabled=${!p}
          title=${v.draft?"\uC774 draft \uB808\uC778\uC744 \uC9C0\uC6C1\uB2C8\uB2E4":"\uC774 \uB808\uC778\uACFC \uB808\uC778\uC774 \uB9CC\uB4E0 \uC758\uC874\uC744 \uD568\uAED8 \uC9C0\uC6C1\uB2C8\uB2E4"}
          aria-label="연결 레인 삭제"
        >
          ✕
        </button>
      </header>
      <div
        class="mon2-clane__body"
        data-drop="chain"
        data-lane-id=${v.lane_id}
      >
        ${v.rows.length===0?c`<div class="mon2-clane__hint">
              여기로 끌어다 놓으면 연결이 시작됩니다
            </div>`:v.rows.map((te,ye)=>St(v,te,ye,g))}
      </div>
    </div>`}function ke(v,p,h){return c`<div
      class="mon2-item"
      data-bead-id=${p.id}
      data-drag-kind="repo-serial"
      data-root-dir=${p.root_dir}
      data-lane-id=${v.id}
      data-row-index=${h}
      data-queue-index=${String(p.queue_index??0)}
    >
      ${Un(A(p),{actions:Mo(p)})}
    </div>`}function He(v){if(v.length===0)return"";let p=v.length-1;return`${v[0].id} \uC810\uC720${p>0?` +${p}`:""}`}function it(v){return c`<div
      class="mon2-item mon2-item--ghost"
      data-bead-id=${v.id}
    >
      ${Un({id:v.id,title:v.title,lane:"running",draggable:!1,ghost:!0,badges:[v.badge]})}
    </div>`}function nt(v,p){let h=p.occupants,$=p.cross_wait_peers||[];return{id:p.id,pane_id:"",title:`${v.name} \xB7 \uC9C1\uB82C ${p.index+1}`,rows:[...h.map(X=>it(X)),...p.items.map((X,g)=>ke(p,X,g))],count:p.items.length,empty:p.empty===!0,...h.length>0?{badge:c`<span
              class="mon2-lane__occupant"
              title=${h.map(X=>`${X.id} \u2014 ${X.badge}`).join(`
`)}
              >${He(h)}</span
            >`,held:!0}:{},cycle:p.cycle,header_control:c`<button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${v.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>`,...$.length>0?{after:c`${$.map(X=>c`<div class="mon2-lane__cross-wait">
                  ⚠ 상호 정지 — ${X.workspace_name}·${X.lane}과 교차 대기
                </div>`)}`}:{}}}function pt(){let v=J.cross_lanes_revision!==null,p=J.chain_lanes.some(h=>h.draft&&h.rows.length===0);return Zi({parallel:{rows:J.parallel_rows.map((h,$)=>dt(h,$)),count:J.parallel_rows.length,collapsed:D.isAreaCollapsed("parallel"),drop:{drop:"parallel"}},serial:{lanes:J.queue_groups.flatMap(h=>h.sublanes.serial.map($=>({...nt(h,$),drop:{drop:"repo-serial",root_dir:h.root_dir,lane_id:$.id,lane_length:String($.raw_length)}}))),collapsed:D.isAreaCollapsed("serial"),extra_panes:J.chain_lanes.map(h=>de(h)),header_control:c`<button
          type="button"
          class="mon2-newlane"
          ?disabled=${p||!v}
          title=${v?p?"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC774 \uC774\uBBF8 \uC788\uC2B5\uB2C8\uB2E4":"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC744 \uD558\uB098 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
        >
          + 연결 레인
        </button>`,...J.cross_lanes_unreadable?{notice:c`<div class="mon2-clane__unreadable">
                연결 레인 저장소를 읽을 수 없음
              </div>`}:{}}})}function yt(v){return c`<div class="worker-rungrid">
      ${J.running.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:J.running.map(p=>jc({bead_id:p.id,attempt_id:p.attempt_id||"",title:p.title,runner:p.runner??null,model:p.model??null,effort:p.effort??null,speed:p.speed??null,started_at:p.started_at??null,kind:p.kind,...p.kind==="session"?{updated_at:p.updated_at,session_refs:p.session_refs||[]}:{},workflow:p.workflow||null,resumed_from:p.resumed_from??null,continuation_mode:p.continuation_mode??null,paused:p.run_state==="paused",failed:p.run_state==="failed",parked:p.run_state==="parked",retry_wait:p.run_state==="retry_wait",waiting:p.run_state==="waiting",wait:p.wait||null,provider_hold:p.run_state==="provider_hold",hold:p.hold?{...p.hold,open:F===p.attempt_id}:null,retry:p.retry||null,status:p.status,status_label:p.run_state==="failed"?"\uC2E4\uD328":p.run_state==="parked"?"\uC138\uC158 \uB300\uAE30":p.run_state==="retry_wait"?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":p.run_state==="waiting"?"\uC120\uD589 \uB300\uAE30":p.run_state==="provider_hold"?"\uACF5\uAE09\uC790 \uBCF4\uB958":void 0,can_pause:p.can_pause!==!1,exec_chips:p.exec_chips||null,usage:p.usage||null,chip_popover:Zt(p),discard:p.discard,failure:p.failure?{...p.failure,open:q===p.attempt_id}:null,...Go(p.id,{discard:p.discard,parked:p.run_state==="parked"},me.has(p.id))},v,P,{monitor:{repo:p.workspace_name,root_dir:p.root_dir,serial_lane_id:p.serial_lane_id,cross_lane_chip:p.cross_lane_chip||null,last_activity:p.last_activity||null,legs:p.legs||[],dependency_chips:gt(p)}}))}
    </div>`}function et(v){let p={runnable:J.runnable,queue:J.queue,running:J.running,pr_wait:J.pr_wait,done:J.done},h=$=>{let X=p[$.lane],g=$.lane==="runnable"?J.runnable_flat?X.length>0?Ue():void 0:J.runnable_sections.length>0?Ue():void 0:$.lane==="queue"?J.queue_groups.length>0||J.chain_lanes.length>0||J.parallel_rows.length>0||J.cross_lanes_unreadable?pt():void 0:$.lane==="running"?yt(v):X.length>0?c`${X.map(b=>Un(A(b)))}`:void 0;return er({id:`monitor-${$.lane}`,lane:$.pane,title:$.title,items:X,count:X.length,src:$.lane==="runnable",empty:$.empty,body:g,live:$.lane==="running"&&X.length>0,collapsible:!0,collapsed:D.isCollapsed($.pane),controls:$.lane==="runnable"?Ne():void 0,header_control:S($.lane,X.length)})};if(ne){let $=vw.map(X=>U_.find(g=>g.lane===X)).filter(X=>X!==void 0);return c`<div class="mon2-deck"></div>
        <div class="worker-lanes-host">
          <div class="worker-lanes worker-lanes--mobile mon2-lanes">
            ${Ji({live:J.running.length>0,running_body:J.running.length>0?yt(v):"",pr_wait_rows:J.pr_wait.map(X=>Un(A(X))),count:J.running.length+J.pr_wait.length})}
            ${$.map(X=>h(X))}
          </div>
        </div>
        ${Ko(z?.draft||null,z?qe(z.root_dir):{})}`}return c`<div class="mon2-deck"></div>
      <div class="worker-lanes-host">
        <div class="worker-lanes mon2-lanes">
          ${U_.map($=>h($))}
        </div>
      </div>
      ${Ko(z?.draft||null,z?qe(z.root_dir):{})}`}function Ne(){return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시">
        <input
          type="checkbox"
          class="mon-filter__blocked"
          .checked=${m.show_blocked}
        />
        🔒
        blocked${J.runnable_hidden.blocked>0?` ${J.runnable_hidden.blocked}`:""}
      </label>
      <div
        class="worker-filter__readiness"
        role="group"
        aria-label="준비도 필터"
      >
        ${Ss.map(v=>c`<button
              type="button"
              class="mon-filter__readiness worker-filter__chip${m.readiness===v.value?" is-active":""}"
              data-readiness=${v.value}
              aria-pressed=${m.readiness===v.value?"true":"false"}
            >
              ${v.label}
            </button>`)}
        ${J.runnable_hidden.readiness>0?c`<span class="worker-filter__hidden"
              >숨김 ${J.runnable_hidden.readiness}</span
            >`:""}
      </div>
      <div class="worker-filter__routes" role="group" aria-label="route 필터">
        ${ro.map(v=>c`<button
              type="button"
              class="mon-filter__route worker-filter__chip${m.routes.includes(v.value)?" is-active":""}"
              data-route=${v.value}
              aria-pressed=${m.routes.includes(v.value)?"true":"false"}
            >
              ${v.label}
            </button>`)}
        ${J.runnable_hidden.route>0?c`<span class="worker-filter__hidden"
              >숨김 ${J.runnable_hidden.route}</span
            >`:""}
      </div>
    </div>`}function S(v,p){return v==="runnable"?c`<select
        class="mon-candidate-sort worker-sort"
        aria-label="후보 정렬"
        title="후보 정렬"
        .value=${R}
      >
        ${As.map(h=>c`<option
              value=${h.value}
              ?selected=${R===h.value}
            >
              ${h.label}
            </option>`)}
      </select>`:v==="running"?c`<select
        class="mon-running-sort worker-sort"
        aria-label="실행중 정렬"
        title="실행중 정렬"
        .value=${k}
      >
        <option value="started" ?selected=${k==="started"}>
          시작순
        </option>
        <option value="repo" ?selected=${k==="repo"}>
          레포순
        </option>
      </select>`:v==="pr_wait"&&p>0?c`<button
        type="button"
        class="mon-lane-op mon-merge-all"
        title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
      >
        일괄 머지
      </button>`:v==="done"?c`<select
        class="mon-done-range worker-sort"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${_}
      >
        ${fo.map(h=>c`<option value=${h.value} ?selected=${_===h.value}>
              ${h.label}
            </option>`)}
      </select>`:""}function U(v){let p=o&&o.get?o.get():null,h=o&&o.getWorkspacesState?o.getWorkspacesState():[],$=v===void 0?o&&o.crossLanes?o.crossLanes():void 0:v,X={done_since:zr(_,d()),running_sort:k,candidate_filter:m,candidate_sort:R};return $!==void 0&&(X.cross_lanes=$),Tr(p,h,X)}function K(){let v=d();J=U(),oe=null,Se=new Map;for(let p of[...J.runnable,...J.queue,...J.running,...J.pr_wait,...J.done])!p.non_occupying&&!Se.has(p.id)&&Se.set(p.id,p);lt(et(v),_e),ja(_e),Ee()?.render(),we(),ft()}function we(){let v=new Map;for(let p of J.queue_groups)v.set(p.root_dir,p.auto_advance);for(let p of Array.from(_e.querySelectorAll(".worker-wait__area--parallel .worker-mini__repo"))){let h=p.closest(".mon2-item")?.getAttribute("data-root-dir")||"",$=v.get(h);typeof $=="boolean"&&p.setAttribute("title",`${p.textContent||""} \xB7 ${$?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function Ee(){if(Re)return Re;let v=_e.querySelector(".mon2-deck");return v?(Re=B_(v,{workspacesState:()=>o&&o.getWorkspacesState?o.getWorkspacesState():[],doneItems:()=>J.done,rangeLabel:se,transport:i,implPresetStore:t.execPresetStore,gotoWorkerTab:xt,onFocusChange:p=>{N=p,ft()}}),Re):null}function ft(){_e.classList.toggle("has-focus",N!==null);for(let v of Array.from(_e.querySelectorAll(".mon2-sec[data-root-dir]")))v.classList.toggle("is-focus",N!==null&&v.getAttribute("data-root-dir")===N);for(let v of Array.from(_e.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let p=Se.get(v.getAttribute("data-bead-id")||"");v.classList.toggle("is-focus",N!==null&&!!p&&p.root_dir===N)}for(let v of Array.from(_e.querySelectorAll(".mon2-crow[data-root-dir]")))v.classList.toggle("is-focus",N!==null&&v.getAttribute("data-root-dir")===N)}function vt(v,p){let h=s?s():void 0;if(!p||!h||p===h||!a){r(v);return}a(p).then(()=>{r(v)}).catch($=>{n("workspace switch for %s failed: %o",p,$)})}function xt(v){if(!v)return;let p=s?s():void 0,h=()=>{try{u?.gotoView("worker")}catch($){n("gotoView(worker) failed: %o",$)}};if(!a||p&&p===v){h();return}a(v).then(h).catch($=>{n("workspace switch for %s failed: %o",v,$),ve("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function Ct(v){kn(v).then(p=>{ve(p?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",p?"success":"error",1400)})}function qt(v){let p=Se.get(v)||null;return{item:p,root_dir:p?p.root_dir:"",revision:p?p.expected_revision:0}}async function Kt(v,p,h){if(v!=="dep-add")return;let $=J.chain_lanes.find(X=>X.rows.some(g=>g.id===p));!$||!$.rows.some(X=>X.id===h)||await Ae(X=>nf($.lane_id,X),"",[{type:v,a:p,b:h}])}function en(){return(o&&o.crossLanes?o.crossLanes():null)??null}async function kt(v,p){if(v==="run"){await un(p);return}if(v==="stop"){await Lt(p);return}if(v==="create"){await Ae(h=>rc(null,h),"");return}if(v==="remove"){let h=of(p,Y());if(h!==null&&!f(h))return;await Ae($=>rf(p,$),"");return}await Ae(h=>v==="confirm"?ef(p,h):tf(p,h),"")}function an(v){let p=new Map;for(let h of v.rows){let $=J.owner_of[h.id]||h.root_dir;typeof $!="string"||$.length===0||p.set($,[...p.get($)||[],h.id])}return p}async function un(v){let p=J.chain_lanes.find(g=>g.lane_id===v);if(!p||J.cross_lanes_revision===null){K();return}G();let h=new Map,$=new Map,X=an(p);for(let g of p.rows){if(g.fixed||typeof g.queue_index=="number")continue;let b=J.owner_of[g.id]||g.root_dir;if(typeof b!="string"||b.length===0){ve(`${g.id}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC801\uC7AC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`,"error"),K();return}let te=$.get(b)??0;if(await ge("worker-queue-place",{bead_id:g.id,lane:"parallel",index:(J.parallel_raw_length[b]??0)+te},b,h,{bead_id:g.id})===null){K();return}$.set(b,te+1)}for(let[g,b]of X)if(await ge("worker-queue-arm",{bead_ids:b,lane_id:v},g,h,{bead_id:b[0]})===null){ve("\uC77C\uBD80 \uB808\uD3EC\uC5D0\uC11C \uC9C4\uD589\uC744 \uCF1C\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589]\uC73C\uB85C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694","error"),K();return}K()}async function Lt(v){let p=J.chain_lanes.find($=>$.lane_id===v);if(!p||J.cross_lanes_revision===null){K();return}G();let h=new Map;for(let[$,X]of an(p))if(await ge("worker-queue-disarm",{lane_id:v},$,h,{bead_id:X[0]})===null)break;K()}async function jt(v,p){if(!i||!v||p.length===0){K();return}let h=await i("worker-queue-start-now",{bead_id:v,root_dir:p});h&&h.queue&&be.set(p,h.queue),h&&h.ok===!1&&ve(`\uC9C0\uAE08 \uC2DC\uC791 \uAC70\uBD80: ${h.reason==="not_waiting"?"\uC774 \uC774\uC288\uB294 \uB354 \uC774\uC0C1 \uB300\uAE30 \uB808\uC778\uC5D0 \uC5C6\uC2B5\uB2C8\uB2E4":h.reason||""}`,"error",2800),K()}async function Vt(v,p){let{root_dir:h,revision:$}=qt(v);if(h.length===0){K();return}await ge("worker-queue-disarm",{bead_ids:[v],lane_id:p},h,new Map([[h,$]]),{bead_id:v}),K()}async function Be(v,p){let h=Se.get(v);if(!h){K();return}let $={kind:"candidate",bead_id:v,root_dir:h.root_dir};if(p==="new-lane"){await Ae(X=>rc({bead_id:v,root_dir:h.root_dir},X),v);return}if(p.startsWith("lane:")){let X=p.slice(5);if(!J.chain_lanes.find(b=>b.lane_id===X)){K();return}await Ae(b=>fa($,{kind:"chain",lane_id:X,marker_index:(b.cross_lanes.get(X)?.entries??[]).length},b),v);return}if(p.startsWith("serial:")){let X=p.slice(7),g=(h.place_lanes||[]).find(b=>b.id===X);await le($,{kind:"repo-serial",root_dir:h.root_dir,lane_id:X,index:g?g.index:0});return}await le($,{kind:"parallel",marker_index:J.parallel_rows.length})}async function E(v,p){let h=J.parallel_rows,$=h.findIndex(xe=>xe.id===v);if($<0)return;let X=h[$].root_dir,g=[];h.forEach((xe,We)=>{xe.root_dir===X&&g.push(We)});let b=g.indexOf($),te=g[b+p];if(typeof te!="number")return;let ye=p===-1?te:g[b+2]??Math.min(h.length,te+1);await le({kind:"parallel",bead_id:v,root_dir:X,queue_index:h[$].queue_index??0},{kind:"parallel",marker_index:ye})}async function he(v){for(let p of J.chain_lanes){let h=p.rows.find($=>$.id===v);if(h){await le({kind:"chain",bead_id:v,root_dir:h.root_dir,lane_id:p.lane_id,...typeof h.queue_index=="number"?{queue_index:h.queue_index}:{}},{kind:"parallel",marker_index:J.parallel_rows.length});return}}}function De(v){return{runner:v.runner||void 0,model:v.model||void 0,effort:v.effort||void 0,status:v.run_state==="running"?"running":v.run_state,worktree:v.root_dir}}function ht(v,p,h,$,X={}){let g=Se.get(v)||null;jo({context:{bead_id:v,kind:$,tuple:g?On(g):""},transport:b=>Le("worker-attempt-resume",{attempt_id:p,...X,...b},h,be.get(h)?.revision??qt(v).revision,!1)})}function Ke(){z=null,K()}function Et(){let v=z,p=v?qa(v.draft):null;!v||!p||(z=null,K(),ht(v.bead_id,p.attempt_id,v.root_dir,"session",p.payload))}function Pt(v,p){let{item:h,root_dir:$,revision:X}=qt(p),g=h?.attempt_id||"",b=v.classList;if(b.contains("worker-mini__rowops-up")||b.contains("worker-mini__rowops-down")){E(p,b.contains("worker-mini__rowops-up")?-1:1);return}if(b.contains("worker-mini__rowops-remove")){Le("worker-queue-remove",{bead_id:p},$,X);return}if(b.contains("worker-mini__start-now")){jt(p,$);return}if(b.contains("mon2-crow__detach")){he(p);return}if(b.contains("worker-dep__open")){vt(v.getAttribute("data-dep-id")||"",v.getAttribute("data-root-dir")||"");return}if(b.contains("mon2-arm__release")){Vt(p,v.getAttribute("data-lane-id")||"");return}if(b.contains("mon-lane__chip")){let te=v.getAttribute("data-lane-id")||"";_e.querySelector(`.mon2-clane[data-lane-id="${te}"]`)?.scrollIntoView({block:"nearest"});return}if(b.contains("judgement-chip")){let te=v.getAttribute("data-chip-key")||"";te&&B.toggle({bead_id:p,chip_key:te});return}if(b.contains("rtile__failure-badge")){q=q===g?null:g,K();return}if(b.contains("rtile__provider-hold-badge")){F=F===g?null:g,K();return}if(b.contains("rtile__attempt-copy")){let te=v.getAttribute("data-attempt-id")||"";te&&kn(te).then(ye=>{ve(ye?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",ye?"success":"error",1400)});return}if(b.contains("worker-card__place")){O=O===p?null:p,K();return}if(b.contains("worker-card__place-cancel")){O=null,K();return}if(b.contains("worker-card__place-lane")){let te=v.getAttribute("data-lane")||"parallel";O=null,Be(p,te);return}if(b.contains("rtile__session")){if(h&&h.kind==="session"){let te=(h.session_refs||[]).find(ye=>ye&&ye.current===!0);te&&(Oe.hidden=!1,I.open(Fo(te,p,"in_progress",$)),K());return}P=g,g&&h&&(Oe.hidden=!1,I.open({attempt_id:g,root_dir:$,meta:De(h)})),K();return}if(b.contains("rtile__pause")){tt("worker-attempt-pause",{attempt_id:g},$);return}if(b.contains("rtile__resume-alternate")){let te=Ma(g,qe($));te&&(z={root_dir:$,bead_id:p,draft:te},K());return}if(b.contains("rtile__resume")){ht(p,g,$,v.dataset.resumeKind==="settlement"?"settlement":"session");return}if(b.contains("rtile__resolve")){st(p,$,be.get($)?.revision??qt(p).revision);return}if(b.contains("rtile__discard-abandon")){let te={kind:v.dataset.operationKind||"",last_error:v.dataset.lastError||""};if(!f(ks(p,te)))return;Ie({bead_id:p,operation_id:v.dataset.operationId||""},$,X,te);return}if(b.contains("rtile__discard")){let te=v.dataset.confirmation==="merged"?"merged":"unmerged";if(!f(vs(p,te)))return;Z({bead_id:p,...g?{attempt_id:g}:{},...v.dataset.operationId?{operation_id:v.dataset.operationId}:{}},$,X);return}if(b.contains("worker-mini__merge")){let te=Ze($,p);te?.mismatch&&te.continuation===null?ie($,p,X,te.mismatch):Le("worker-merge-queue-add",{bead_id:p},$,X);return}if(b.contains("worker-mini__merge-cancel")){Le("worker-merge-queue-remove",{bead_id:p},$,X);return}if(b.contains("worker-mini__discard-abandon")){let te={kind:v.dataset.operationKind||"",last_error:v.dataset.lastError||""};if(!f(ks(p,te)))return;Ie({bead_id:p,operation_id:v.dataset.operationId||""},$,X,te);return}if(b.contains("worker-mini__discard")){let te=v.dataset.discardMode==="merged"?"merged":"unmerged";if(!f(vs(p,te)))return;Z({bead_id:p,...v.dataset.attemptId?{attempt_id:v.dataset.attemptId}:{},...v.dataset.operationId?{operation_id:v.dataset.operationId}:{}},$,X);return}if(b.contains("worker-mini__revise-fix")){ze("worker-revise-fix",{bead_id:p},$,X);return}b.contains("worker-mini__revise-approve")&&Le("worker-revise-approve",{bead_id:p},$,X)}function Ht(v){let p=ae.consumeClickSuppression(),h=v.target;if(!h||typeof h.closest!="function")return;if(h.closest(".provider-resume-dialog__cancel")){Ke();return}if(h.closest(".provider-resume-dialog__confirm")){Et();return}if(h.closest("dialog")||h.closest(".worker-drawer-overlay")||h.closest("a"))return;let $=h.closest(".worker-card__id, .worker-mini__id, .rtile__id");if($){v.preventDefault();let dn=h.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||$.textContent?.trim()||"";dn&&Ct(dn);return}let X=h.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(X){v.preventDefault();let Qt=X.getAttribute("data-root-dir")||Se.get(h.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||X.getAttribute("title")||"";xt(Qt);return}let g=h.closest(".mon2-sec__toggle");if(g){v.preventDefault(),$t(g.getAttribute("data-root-dir")||"");return}let b=h.closest(".worker-pane__toggle[data-lane]");if(b){v.preventDefault();let Qt=b.getAttribute("data-lane")||"";(Qt==="candidate"||Qt==="queue"||Qt==="running"||Qt==="pr_wait"||Qt==="done")&&mt(Qt);return}let te=h.closest(".worker-wait__area-toggle[data-area]");if(te){v.preventDefault(),Xe(te.getAttribute("data-area")||"parallel");return}if(h.closest(".mon2-newlane")){v.preventDefault(),kt("create","");return}let ye=h.closest(".mon2-clane__confirm, .mon2-clane__reapply, .mon2-clane__remove, .mon2-clane__run, .mon2-clane__stop");if(ye){v.preventDefault();let Qt=ye.getAttribute("data-lane-id")||"",dn=ye.classList;kt(dn.contains("mon2-clane__confirm")?"confirm":dn.contains("mon2-clane__reapply")?"reapply":dn.contains("mon2-clane__run")?"run":dn.contains("mon2-clane__stop")?"stop":"remove",Qt);return}if(h.closest(".mon-merge-all")){v.preventDefault(),Qe();return}let xe=h.closest(".mon-filter__route");if(xe){v.preventDefault(),m={...m,routes:sa(m.routes,xe.getAttribute("data-route")||"")},Bc(m),K();return}let We=h.closest(".mon-filter__readiness");if(We){v.preventDefault(),m={...m,readiness:We.getAttribute("data-readiness")||"all"},Bc(m),K();return}let ot=h.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!ot)return;let Yt=ot.getAttribute("data-bead-id")||"",fn=h.closest("button");if(fn){v.preventDefault(),Pt(fn,Yt);return}h.closest(".rtile__failure-pop, .chip-popover")||Yt&&!p&&(v.preventDefault(),vt(Yt,ot.getAttribute("data-root-dir")||qt(Yt).root_dir))}function Tt(v){let p=v.target;if(!p||typeof p.closest!="function")return;if(z){let b=Na(z.draft,p,qe(z.root_dir));if(b){b!==z.draft&&(z={...z,draft:b},K());return}}let h=p.closest(".mon-filter__blocked");if(h){m={...m,show_blocked:h.checked},Bc(m),K();return}let $=p.closest(".mon-candidate-sort");if($){R=As.some(b=>b.value===$.value)?$.value:"repo_spec",pw(R),K();return}let X=p.closest(".mon-running-sort");if(X){k=X.value==="repo"?"repo":"started",bw(k),K();return}let g=p.closest(".mon-done-range");g&&(_=Yn(g.value),gw(_),K())}function ln(v){let p=v.target,h=p&&typeof p.closest=="function"?X=>p.closest(X):()=>null,$=!1;q&&!h(".rtile__failure-pop, .rtile__failure-badge")&&(q=null,$=!0),F&&!h(".rtile__provider-hold-pop, .rtile__provider-hold-badge")&&(F=null,$=!0),$&&K()}function Mt(v){v.key==="Escape"&&(q===null&&F===null&&z===null||(q=null,F=null,z=null,K()))}e.addEventListener("click",Ht),e.addEventListener("change",Tt),document.addEventListener("click",ln),document.addEventListener("keydown",Mt),B.attach(),ae.attach(e);{let v=!0;H=Ia(p=>{if(ne=p,v){v=!1;return}K()})}o&&typeof o.subscribe=="function"&&(L=o.subscribe(()=>{try{be.clear(),K()}catch{}}));function yn(){ee!==null&&(clearInterval(ee),ee=null)}return{recorrectSharedLane:Kt,load(){n("load"),K(),ee===null&&(ee=setInterval(()=>{try{K()}catch{}},yw))},pause(){yn()},clear(){yn(),ae.detach(),L&&(L(),L=null),H&&(H(),H=null),I.destroy(),Oe.hidden=!0,Re?.destroy(),Re=null,e.removeEventListener("click",Ht),e.removeEventListener("change",Tt),document.removeEventListener("click",ln),document.removeEventListener("keydown",Mt),B.detach(),e.replaceChildren()}}}var ww=["board","worker","monitor","compare"];function X_(e,t,n){let r=Bt("views:nav"),{global_element:o,repo_element:i}=e,s=null;function l(_){return k=>{k.preventDefault();let m=_==="monitor"&&a()==="monitor"?"worker":_;r("click tab %s",m),n.gotoView(m)}}function a(){let _=t.getState();return ww.includes(_.view)?_.view:"board"}function u(){let _=a();return c`
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
    `}function f(){o&&lt(u(),o),i&&lt(d(),i)}return f(),s=t.subscribe(()=>f()),{destroy(){s&&(s(),s=null),o&&lt(c``,o),i&&lt(c``,i)}}}var Z_=["Critical","High","Medium","Low","Backlog"];function J_(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),o=n.querySelector("#new-title"),i=n.querySelector("#new-type"),s=n.querySelector("#new-priority"),l=n.querySelector("#new-labels"),a=n.querySelector("#new-description"),u=n.querySelector("#new-issue-error"),d=n.querySelector("#btn-cancel"),f=n.querySelector("#btn-create"),_=n.querySelector(".new-issue__close");function k(){i.replaceChildren();let O=document.createElement("option");O.value="",O.textContent="\u2014 Select \u2014",i.appendChild(O);for(let q of vi){let F=document.createElement("option");F.value=q,F.textContent=od(q),i.appendChild(F)}s.replaceChildren();for(let q=0;q<=4;q+=1){let F=document.createElement("option");F.value=String(q);let z=Z_[q]||"Medium";F.textContent=`${q} \u2013 ${z}`,s.appendChild(F)}}k();function m(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function R(O){o.disabled=O,i.disabled=O,s.disabled=O,l.disabled=O,a.disabled=O,d.disabled=O,f.disabled=O,f.textContent=O?"Creating\u2026":"Create"}function T(){u.textContent=""}function D(O){u.textContent=O}function ne(){try{let O=window.localStorage.getItem("beads-ui.new.type");O?i.value=O:i.value="";let q=window.localStorage.getItem("beads-ui.new.priority");q&&/^\d$/.test(q)?s.value=q:s.value="2"}catch{i.value="",s.value="2"}}function H(){let O=i.value||"",q=s.value||"";O.length>0&&window.localStorage.setItem("beads-ui.new.type",O),q.length>0&&window.localStorage.setItem("beads-ui.new.priority",q)}async function P(){T();let O=String(o.value||"").trim();if(O.length===0){D("Title is required"),o.focus();return}let q=Number(s.value||"2");if(!(q>=0&&q<=4)){D("Priority must be 0..4"),s.focus();return}let F=String(i.value||""),z=String(a.value||""),B={title:O};F.length>0&&(B.type=F),String(q).length>0&&(B.priority=q),z.length>0&&(B.description=z),R(!0);try{await t("create-issue",B)}catch{R(!1),D("Failed to create issue");return}H(),R(!1),m()}return n.addEventListener("cancel",O=>{O.preventDefault(),m()}),_.addEventListener("click",()=>m()),d.addEventListener("click",()=>m()),n.addEventListener("keydown",O=>{O.key==="Enter"&&(O.ctrlKey||O.metaKey)&&(O.preventDefault(),P())}),r.addEventListener("submit",O=>{O.preventDefault(),P()}),{open(){r.reset(),T(),ne();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{o.focus()}catch{}},0)},close(){m()}}}var $w=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked\xB7\uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694 \uCE69"],["stepper","stepper"]];function xw(e,t){return al(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function em(e,t,n){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?c`<div class="settings-dialog__empty">라벨 없음</div>`:c`<div class="settings-dialog__pills">
            ${t.map(r=>{let o=xw(r,e);return c`<button
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
  `}function tm(e,t,n){return c`
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
  `}function nm(e,t){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${$w.map(([n,r])=>c`<label class="settings-dialog__toggle">
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
  `}var Aw=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function rm(e,t){let{transport:n,policyStore:r,labelOptions:o}=t,i=t.notify||(oe=>ve(oe,"error",4e3)),s=document.createElement("dialog");s.id="settings-dialog",s.className="settings-dialog",s.setAttribute("role","dialog"),s.setAttribute("aria-modal","true"),s.setAttribute("aria-label","\uC124\uC815"),e.appendChild(s);let l="execution",a=!1,u="",d=null;function f(){if(d)return d;let oe=s.querySelector('[data-pane="execution"]');return oe?(d=Wa(oe,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:n,implPresetStore:t.implPresetStore,notify:i,onQueueAdopt:fe=>t.queueStore?.set?.(fe)}),d):null}function _(){return c`
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
    `}function k(){let oe=r.get();return c`
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
              ${em(oe,o(),D)}
              ${tm(oe,u,{onDraft:fe=>{u=fe},onAdd:ne,onRemove:H})}
              ${nm(oe,P)}
            `:c`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function m(oe){let fe=r.get();if(fe)try{let Pe=await n("display-policy-set",{expected_revision:fe.revision,policy:oe(fe)});R(Pe),Pe&&Pe.conflict&&Pe.policy&&(Pe=await n("display-policy-set",{expected_revision:Pe.policy.revision,policy:oe(Pe.policy)}),R(Pe)),Pe&&Pe.conflict&&i("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{i("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function R(oe){oe&&oe.policy&&typeof oe.policy=="object"&&r.set(oe.policy)}function T(oe){m(oe)}function D(oe){let fe=r.get();if(!fe)return;let Pe=!Sw(oe,fe);T(G=>Ew(oe,G,Pe))}function ne(){let oe=u.trim();oe.length!==0&&(u="",T(fe=>fe.hidden_prefixes.includes(oe)?{hidden_prefixes:fe.hidden_prefixes}:{hidden_prefixes:[...fe.hidden_prefixes,oe]}),O())}function H(oe){T(fe=>({hidden_prefixes:fe.hidden_prefixes.filter(Pe=>Pe!==oe)}))}function P(oe){let fe=r.get();if(!fe)return;let Pe=fe.chips[oe]===!1;T(()=>({chips:{[oe]:Pe}}))}function O(){lt(c`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${Aw.map(oe=>c`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${oe.id}
                  aria-selected=${String(l===oe.id)}
                  aria-controls=${`settings-pane-${oe.id}`}
                  @click=${()=>q(oe.id)}
                >
                  <span class="settings-dialog__glyph">${oe.glyph}</span>
                  ${oe.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${W}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${_()} ${k()}
          </div>
        </div>
      `,s),f()}function q(oe){l=oe,O()}let F=()=>{a=!1,t.onOpenChange?.(!1)};s.addEventListener("close",F),s.addEventListener("cancel",F);let z=oe=>{oe.target===s&&W()};s.addEventListener("click",z);let B=null;r.subscribe&&(B=r.subscribe(()=>{a&&O()}));let N=null;t.implPresetStore?.subscribe&&(N=t.implPresetStore.subscribe(()=>{a&&d?.render()}));function V(oe="execution"){a||(a=!0,t.onOpenChange?.(!0),l=oe,u="",O(),typeof s.showModal=="function"?s.showModal():s.setAttribute("open",""),f()?.load())}function W(){a&&(a=!1,t.onOpenChange?.(!1),typeof s.close=="function"?s.close():s.removeAttribute("open"))}return{open:V,close:W,sessionDraft:()=>d?.sessionDraft()??{},destroy(){a=!1,s.removeEventListener("close",F),s.removeEventListener("cancel",F),s.removeEventListener("click",z),B&&(B(),B=null),N&&(N(),N=null),d?.destroy(),d=null,s.remove()}}}function Sw(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(n=>n.length>0&&e.startsWith(n))}function Ew(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(i=>i!==e)};let r=t.hidden_labels.filter(i=>i!==e);return t.hidden_prefixes.some(i=>i.length>0&&e.startsWith(i))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}var Tw=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],om="usage-meter-card",Rw="usage-meter-layer",Uc=600,Cw=["token_expired","relogin_required"];function sm(e){return String(e).padStart(2,"0")}function Ow(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),o=Math.floor(n%1440/60),i=n%60;return r>0?`${r}d${o>0?` ${o}h`:""}`:o>0?`${o}h${i>0?` ${i}m`:""}`:`${i}m`}function im(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),o=new Date(t),i=`${sm(r.getHours())}:${sm(r.getMinutes())}`,l=r.getFullYear()===o.getFullYear()&&r.getMonth()===o.getMonth()&&r.getDate()===o.getDate()?i:`${Tw[r.getMonth()]} ${r.getDate()} ${i}`;return`${Ow(n,t)} \xB7 ${l}`}function Iw(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function am(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function lm(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var cm=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function dm(e){let t=[];for(let n of e){if(!n||typeof n!="object")continue;let r=n;typeof r.key!="string"||r.key.length===0||typeof r.pct!="number"||!Number.isFinite(r.pct)||t.push({key:r.key,pct:r.pct,resetsAt:typeof r.resetsAt=="string"?r.resetsAt:""})}return t}function Lw(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:dm(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function Pw(e,t){if(!e||typeof e!="object")return null;let n=e,r=[];if(Array.isArray(n.accounts))for(let i of n.accounts){let s=Lw(i);s&&r.push(s)}let o=n.available===!0&&Array.isArray(n.windows);return!o&&r.length===0?null:{available:o,windows:o?dm(n.windows):[],ageSeconds:typeof n.ageSeconds=="number"&&Number.isFinite(n.ageSeconds)?n.ageSeconds:null,accounts:r,receivedAtMs:t,held:!1}}function Dw(e,t){if(!e||typeof e!="object")return{kind:"error"};let n=Pw(e,t);return n?{kind:"ok",snapshot:n}:Array.isArray(e.accounts)?{kind:"empty"}:{kind:"error"}}function pm(e,t){return(e.ageSeconds===null?0:e.ageSeconds)+Math.max(0,t-e.receivedAtMs)/1e3}function Mw(e,t){return!e.held||pm(e,t)<=Uc?e:{...e,available:!1,windows:[],accounts:[]}}function um(e,t){return`${e}:${t}`}function fm(e){let t=!1,n=null,r=new Map,o=null,i=new Map,s=new Map,l=0,a=null;function u(){lt(c``,e),e.hidden=!0,f()}function d(){if(a===null){let G=e.ownerDocument;a=G.createElement("div"),a.id=Rw,a.className="usage-meter__layer",G.body.appendChild(a)}return a}function f(){a!==null&&(lt(c``,a),a.remove(),a=null)}function _(G){n!==G&&(n===null&&(document.addEventListener("mousedown",m),document.addEventListener("keydown",T),window.addEventListener("resize",R)),n=G)}function k(){n!==null&&(n=null,document.removeEventListener("mousedown",m),document.removeEventListener("keydown",T),window.removeEventListener("resize",R))}function m(G){let se=G.target;se&&(e.contains(se)||a!==null&&a.contains(se))||(k(),W())}function R(){W()}function T(G){G.key==="Escape"&&(k(),W())}function D(G){n===G?k():_(G),W()}function ne(){k(),W()}async function H(G,se){if(r.has(G.key))return;let _e=um(G.key,se);r.set(G.key,se),s.delete(_e),W();let Oe=null;try{Oe=await(await fetch(G.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:se})})).json()}catch{Oe=null}if(t)return;if(r.delete(G.key),!Oe||Oe.ok!==!0){let ce=Oe&&typeof Oe.error=="string"&&Oe.error.length>0?Oe.error:"network_error";s.set(_e,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${ce}`}),W();return}let Q=Array.isArray(Oe.warnings)?Oe.warnings.filter(ce=>typeof ce=="string"&&ce.length>0):[];Q.length>0&&s.set(_e,{kind:"warn",text:Q.join(" \xB7 ")}),W(),await Pe()}function P(G,se,_e,Oe){let Q=lm(G.pct),J=`resets ${im(G.resetsAt,Oe)}${se?` \xB7 ${_e}`:""}`;return c`<span
      class="usage-meter__window ${am(Q)}"
      style=${`--progress: ${Q}%`}
      title=${J}
    >
      <span class="usage-meter__label">${G.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${Q}%</span>
    </span>`}function O(G,se,_e){let Oe=pm(se,_e),Q=se.available&&(se.held||Oe>Uc),ce=Q?`${Math.floor(Oe/60)}\uBD84 \uC804 \uCE21\uC815`:"",J=se.accounts.filter(L=>!L.active).length,Se=`usage-meter__group${Q?" usage-meter__group--stale":""}`,be=c`<span class="usage-meter__provider"
        >${G.label}</span
      >
      ${se.available?se.windows.map(L=>P(L,Q,ce,_e)):c`<span class="usage-meter__empty">사용량 없음</span>`}
      ${J>0?c`<span class="usage-meter__badge">+${J}</span>`:""}`;if(se.accounts.length===0)return c`<span
        class=${Se}
        aria-label=${`${G.label} usage`}
        >${be}</span
      >`;let me=n===G.key;return c`<button
      type="button"
      class=${`usage-meter__toggle ${Se}`}
      aria-label=${`${G.label} usage`}
      aria-expanded=${me?"true":"false"}
      aria-controls=${om}
      @click=${()=>D(G.key)}
    >
      ${be}
    </button>`}function q(G,se){return c`<span class="usage-meter" aria-label="Usage">
      ${G.map(_e=>O(_e.provider,_e.snapshot,se))}
    </span>`}function F(G,se){let _e=lm(G.pct),Oe=im(G.resetsAt,se);return c`<span
      class="usage-meter__account-window ${am(_e)}"
      style=${`--progress: ${_e}%`}
    >
      <span class="usage-meter__account-key">${G.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${_e}%</span>
      <span class="usage-meter__account-reset"
        >${Oe.length>0?`\u21BB ${Oe}`:""}</span
      >
    </span>`}function z(G,se){return Cw.includes(se)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${G.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function B(G,se,_e){let Oe=se.status==="ok",Q=typeof se.ageSeconds=="number"&&se.ageSeconds>Uc,ce=s.get(um(G.key,se.number)),J=r.get(G.key),Se=J!==void 0,be=J===se.number,me=["usage-meter__account"];return se.active&&me.push("usage-meter__account--active"),Oe||me.push("usage-meter__account--unavailable"),Q&&me.push("usage-meter__account--stale"),c`<div class=${me.join(" ")}>
      <div class="usage-meter__account-head">
        <span class="usage-meter__account-label" title=${se.email}
          >${se.alias===null?se.email:se.alias}</span
        >
        ${se.plan===null?"":c`<span class="usage-meter__account-tag">${se.plan}</span>`}
        ${se.active?c`<span
              class="usage-meter__account-tag usage-meter__account-tag--active"
              >active</span
            >`:""}
        ${se.ageSeconds===null?"":c`<span class="usage-meter__account-age"
              >${Iw(se.ageSeconds)}</span
            >`}
        ${se.active?"":c`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${Se}
              @click=${()=>{H(G,se.number)}}
            >
              ${be?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${Oe?c`<div class="usage-meter__account-windows">
            ${se.windows.map(L=>F(L,_e))}
          </div>`:c`<div class="usage-meter__account-status">
            ${z(G,se.status)}
          </div>`}
      ${ce===void 0?"":c`<div
            class="usage-meter__account-message usage-meter__account-message--${ce.kind}"
          >
            ${ce.text}
          </div>`}
    </div>`}function N(G,se,_e){let Oe=se.accounts.filter(Q=>Q.active).length;return c`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${G.label} · 활성 ${Oe} / 전체
        ${se.accounts.length}
      </h2>
      ${se.accounts.map(Q=>B(G,Q,_e))}
    </section>`}function V(G,se){return c`<div
      class="usage-meter__card"
      id=${om}
      role="dialog"
      aria-label=${`${G.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${N(G.provider,G.snapshot,se)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function W(){let G=Date.now(),se=[];for(let Oe of cm){let Q=i.get(Oe.key);Q&&se.push({provider:Oe,snapshot:Mw(Q,G)})}if(se.length===0){k(),u();return}let _e=se.find(Oe=>Oe.provider.key===n&&Oe.snapshot.accounts.length>0);_e||k(),lt(q(se,G),e),e.hidden=!1,_e?oe(_e,G):f()}function oe(G,se){let _e=d(),Oe=e.getBoundingClientRect(),Q=e.ownerDocument.documentElement.clientWidth;_e.style.setProperty("--usage-meter-anchor-top",`${Oe.bottom}px`),_e.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,Q-Oe.right)}px`),lt(c`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${ne}
        ></div>
        ${V(G,se)}`,_e)}async function fe(G){try{let se=await fetch(G.endpoint);return se.ok?Dw(await se.json(),Date.now()):{kind:"error"}}catch{return{kind:"error"}}}async function Pe(){l+=1;let G=l,se=await Promise.all(cm.map(async _e=>({provider:_e,read:await fe(_e)})));if(!(t||G!==l)){for(let _e of se){let Oe=_e.provider.key;if(_e.read.kind==="ok"){i.set(Oe,_e.read.snapshot);continue}if(_e.read.kind==="empty"){i.delete(Oe);continue}let Q=i.get(Oe);Q!==void 0&&!Q.held&&i.set(Oe,{...Q,held:!0})}W()}}return u(),Pe(),o=setInterval(()=>{Pe()},6e4),{destroy(){t=!0,o!==null&&(clearInterval(o),o=null),k(),u()}}}function Vs(e){let t=e?.blocked_info;return t&&typeof t=="object"?Array.isArray(t.blockers)?t.blockers.filter(r=>typeof r=="string"&&r.length>0):[]:(Array.isArray(e?.dependencies)?e.dependencies:[]).map(r=>{if(typeof r=="string")return r;if(!r||typeof r!="object")return"";let o=r.type??r.dependency_type;return o!==void 0&&o!=="blocks"?"":r.depends_on_id||r.id||""}).filter(Boolean)}var gm="bdui.worker.candidate_sort",Ys=Object.freeze([{id:"spec",label:"spec \uC6B0\uC120",chain:[{key:"spec",dir:"desc"},{key:"created",dir:"asc"}]},{id:"bottleneck",label:"\uBCD1\uBAA9 \uC6B0\uC120",chain:[{key:"priority",dir:"asc"},{key:"dependents",dir:"desc"},{key:"released",dir:"desc"}]},{id:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131",chain:[{key:"created",dir:"desc"},{key:"priority",dir:"asc"}]},{id:"updated",label:"\uCD5C\uC2E0 \uC218\uC815",chain:[{key:"updated",dir:"desc"}]}]),za=Object.freeze({preset:"spec"}),hm=3,bm=Object.freeze([{key:"priority",label:"\uC6B0\uC120\uC21C\uC704"},{key:"dependents",label:"\uD6C4\uC18D \uC218"},{key:"released",label:"\uD574\uC81C \uC2DC\uAC01"},{key:"spec",label:"spec \uC720\uBB34"},{key:"created",label:"\uC0DD\uC131"},{key:"updated",label:"\uC218\uC815"}]);function _m(e){return Ys.some(t=>t.id===e)}function mm(e){let t=Ys.find(n=>n.id===e);return t?t.chain.map(n=>({...n})):[]}function Nw(e,t){return e.length===t.length&&e.every((n,r)=>n.key===t[r].key&&n.dir===t[r].dir)}function Qs(e){return e&&"preset"in e?mm(e.preset):e&&Array.isArray(e.chain)?e.chain.map(t=>({...t})):mm("spec")}function Wc(e){return e&&"preset"in e?e.preset:null}function co(e){if(typeof e=="string"){let i;try{i=JSON.parse(e)}catch{return _m(e)?{preset:e}:za}return co(i)}if(!e||typeof e!="object")return za;let t=e;if(_m(t.preset))return{preset:t.preset};let n=t.chain;if(!Array.isArray(n)||n.length===0||n.length>hm||!n.every(rl))return za;let r=[];for(let i of n)r.some(s=>s.key===i.key)||r.push({key:i.key,dir:i.dir});let o=Ys.find(i=>Nw(i.chain,r));return o?{preset:o.id}:{chain:r}}function ym(){try{return co(window.localStorage.getItem(gm))}catch{return za}}function Hc(e){try{window.localStorage.setItem(gm,JSON.stringify(e))}catch{}}function vm(e,t,n){let r=e.map(a=>({...a}));if(!n)return r.slice(0,t);if(!Object.prototype.hasOwnProperty.call(ui,n))return r;let o=n;if(r.slice(0,t).some(a=>a.key===o))return r.slice(0,t);let i={key:o,dir:r[t]&&r[t].key===o?r[t].dir:ui[o]},s=r.slice(0,t),l=r.slice(t+1).filter(a=>a.key!==o);return[...s,i,...l].slice(0,hm)}function km(e,t){return e.map((n,r)=>r===t?{key:n.key,dir:n.dir==="asc"?"desc":"asc"}:{...n})}function qw(e){let t=new Set(e.map(l=>l.id)),n=new Map,r=new Map;for(let l of e){let a=Vs(l).filter(u=>t.has(u));n.set(l.id,a);for(let u of a){let d=r.get(u);d?d.push(l):r.set(u,[l])}}let o=new Set,i=[],s=l=>{o.add(l.id),i.push(l);for(let a of r.get(l.id)??[])!o.has(a.id)&&(n.get(a.id)??[]).every(u=>o.has(u))&&s(a)};for(;i.length<e.length;){let l=e.find(a=>!o.has(a.id)&&(n.get(a.id)??[]).every(u=>o.has(u)));s(l??e.find(a=>!o.has(a.id)))}return i}function wm(e,t){let n=Array.isArray(e)?e.slice():[];return n.sort(Tu(Qs(t))),qw(n)}function $m(e,t){let n=new Map;if(!e||typeof e!="object")return n;let r=e,o=[],i=new Set;for(let s of t){if(i.has(s.id))continue;i.add(s.id);let l=r[s.id];if(!l||!Array.isArray(l.scope))continue;let a=l.scope.filter(u=>typeof u=="string"&&u.length>0);if(a.length===0){n.set(s.id,{overlaps:[],scope_missing:!0});continue}n.set(s.id,{overlaps:[],scope_missing:!1}),o.push({member:s,scope:a})}for(let s=0;s<o.length;s+=1)for(let l=s+1;l<o.length;l+=1){let a=qi(o[s].scope,o[l].scope);if(a.length===0)continue;let u=o[s].member,d=o[l].member;n.get(u.id)?.overlaps.push({id:d.id,title:d.title,location_label:d.location_label,prefixes:a}),n.get(d.id)?.overlaps.push({id:u.id,title:u.title,location_label:u.location_label,prefixes:a})}return n}var xm=new Set(["sh","bash","zsh","dash","ksh"]),Am=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function Sm(e){let t=e.split("/");return t[t.length-1]||""}function jw(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let n=t.slice(2).trim().split(/\s+/).filter(Boolean);if(n.length===0)return!1;let r=Sm(n[0]);if(r!=="env")return xm.has(r);let o=n.slice(1).find(i=>!i.startsWith("-")&&!i.includes("="));return o!==void 0&&xm.has(Sm(o))}function Fw(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function Bw(e){let t=[],n=0;Am.lastIndex=0;for(let r of e.matchAll(Am)){let o=r.index;o>n&&t.push({text:e.slice(n,o),kind:"plain"}),t.push({text:r[0],kind:Fw(r[0])}),n=o+r[0].length}return n<e.length&&t.push({text:e.slice(n),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function Uw(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function Em(e){let t=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),r=document.createElement("div");r.className="repo-ops-script-viewer-root",document.body.appendChild(r);let o=null,i="loading",s="",l="",a=0,u=null,d=!1;function f(O,q){return q?Bw(O).map(F=>F.kind==="plain"?F.text:c`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${F.kind}"
            >${F.text}</span
          >`):O}function _(){if(!o)return c``;let O=i==="ready"&&jw(s),q=i==="ready"?s.split(`
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
              @click=${()=>{m()}}
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
                  ${q.map((F,z)=>c`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${z+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${f(F,O)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function k(){lt(_(),r)}async function m(){if(i!=="ready")return;let O=await kn(s);ve(O?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",O?"success":"error")}function R(O){O.key==="Escape"&&o&&(O.preventDefault(),H())}function T(){d||(document.addEventListener("keydown",R),d=!0)}function D(){d&&(document.removeEventListener("keydown",R),d=!1)}async function ne(O,q=null){let F=++a;T(),o={...O},u=q||(document.activeElement instanceof HTMLElement?document.activeElement:null),i="loading",s="",l="",k(),r.querySelector(".repo-ops-script-viewer__close")?.focus();let B=t?t():"";if(!B){i="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",k();return}if(!n){i="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",k();return}let N="/api/repo-ops-script?workspace="+encodeURIComponent(B)+"&lane="+encodeURIComponent(O.lane)+"&base_sha="+encodeURIComponent(O.base_sha);try{let V=await n(N),W=await V.json().catch(()=>({}));if(F!==a)return;if((t?t():"")!==B){H();return}if(!V.ok||!W||W.ok!==!0){i="error",l=Uw(W&&typeof W.error=="string"?W.error:""),k();return}o={lane:W.lane,base_sha:W.base_sha,path:W.path,base_ref:W.base_ref},s=String(W.content),i="ready",k()}catch{if(F!==a)return;i="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",k()}}function H(){a+=1,D(),o=null,s="",k();let O=u;u=null,O?.isConnected&&O.focus()}function P(){H(),r.remove()}return{open:ne,close:H,destroy:P}}var Tm={deploy_not_declared:"\uC120\uC5B8 \uC5C6\uC74C",deploy_opted_out:"\uC774 workspace\uC5D0\uC11C \uBC30\uD3EC \uC2E4\uD589\uC774 \uAEBC\uC838 \uC788\uC74C",deploy_in_flight:"\uBC30\uD3EC \uC9C4\uD589 \uC911",target_unresolved:"\uB300\uC0C1 tip\uC744 \uD655\uC815\uD558\uC9C0 \uBABB\uD568",remote_history_not_monotonic:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uC640 \uC6D0\uACA9 \uC774\uB825\uC774 \uAC08\uB77C\uC9D0"},Ww=new Set(["queued","running","retry_pending"]);function Rm(e){let t=e.queueStore,n=e.transport,r=e.onChanged||(()=>{}),o=e.onOpenScript;function i(){return t&&t.get()||{}}function s(){let N=i();return typeof N.revision=="number"?N.revision:0}function l(N){t&&N&&N.queue&&typeof N.queue=="object"&&t.set(N.queue)}function a(){let N=i().workspace_info;return N&&typeof N=="object"?N:{}}function u(N,V){return c`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${N}"
      >${V}</span
    >`}function d(N){if(typeof N!="number"||!Number.isFinite(N))return"";let V=N/6e4;return Number.isInteger(V)?`timeout ${V}\uBD84`:`timeout ${Math.round(N/1e3)}\uCD08`}function f(N){let V=d(N);return V?u("config",V):""}function _(N,V,W){return c`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${W.script}
      @click=${oe=>{o&&o({lane:N,base_sha:V.base_sha,path:W.script,base_ref:V.base_ref},oe.currentTarget)}}
    ></button>`}function k(){let N=i().repo_operations;return Array.isArray(N)?N:[]}function m(){let N=a().repo_ops,V=N&&typeof N=="object"?N.repo_id:null;return typeof V=="string"&&V?V:null}function R(){return k().some(N=>N&&N.kind==="deploy"&&Ww.has(N.state))}function T(){let N=R(),V=m()===null;return c`<button
      type="button"
      class="worker-repo-ops__deploy-run"
      data-seam="repo-ops-deploy-run"
      ?disabled=${N||V}
      title=${N?"\uBC30\uD3EC \uC9C4\uD589 \uC911":V?"\uC800\uC7A5\uC18C\uB97C \uD655\uC778\uD560 \uC218 \uC5C6\uC74C":"\uC6D0\uACA9 base tip\uC5D0\uC11C \uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uB97C 1\uD68C \uC2E4\uD589\uD569\uB2C8\uB2E4"}
      @click=${()=>{q()}}
    >
      배포 실행
    </button>`}function D(){let N=i().repo_ops_opt_out;return{verify:N?.verify===!0,deploy:N?.deploy===!0}}function ne(N,V){return c`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!V}
        @change=${W=>{O(N,!W.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function H(N){let V=typeof N.base_sha=="string"?N.base_sha:"",W=`${N.source_path||"repo-ops/config.toml"} @ ${N.base_ref||"?"}${V?`@${V.slice(0,7)}`:""}`,oe=D(),fe=!!N.verify&&oe.verify,Pe=!!N.deploy&&oe.deploy;return c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${W}</span>
      </p>
      <div
        class="worker-repo-ops__lane${fe?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${N.verify?c`${_("verify",N,N.verify)}
              ${f(N.verify.timeout_ms)}
              ${fe?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:c`선언 없음${u("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${fe?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":N.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${N.verify?ne("verify",oe.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${Pe?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${N.deploy?c`${_("deploy",N,N.deploy)}
              ${f(N.deploy.timeout_ms)}
              ${Pe?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):T()}`:c`선언 없음${u("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${Pe?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":N.deploy?c`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${N.deploy?ne("deploy",oe.deploy):""}
      </div>
    </section>`}function P(N){let V=N.repo_ops&&typeof N.repo_ops=="object"?N.repo_ops:null;return V&&(V.status==="resolved"||V.status==="absent")?H(V):V&&(V.status==="pending"||V.status==="error")?c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${V.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":c`선언 읽기
              실패${V.error_code?c` — <code>${V.error_code}</code>`:""}`}
        </div>
      </section>`:c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function O(N,V){if(!n)return;let W=await n("worker-repo-ops-opt-out-toggle",{kind:N,opted_out:V,expected_revision:s()});if(l(W),W&&W.conflict){let oe=await n("worker-repo-ops-opt-out-toggle",{kind:N,opted_out:V,expected_revision:s()});l(oe)}r()}async function q(){let N=m();if(!n||N===null)return;let V=await n("worker-repo-operation-deploy-run",{repo_id:N});if(l(V),!V||V.ok!==!0){let W=V&&typeof V.reason=="string"?V.reason:"",oe=Object.hasOwn(Tm,W)?Tm[W]:W||"\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";ve(`\uBC30\uD3EC \uC2E4\uD589 \uAC70\uBD80 \u2014 ${oe}`,"error")}else ve("\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD588\uC2B5\uB2C8\uB2E4","success");r()}let F={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",repair_session_dispatch:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC790\uB3D9 \uC2E4\uD589",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC"};function z(N,V,W){return c`<div class="worker-repo-ops__policy-group" data-policy=${W}>
      <div class="worker-repo-ops__policy-label">${N}</div>
      <ul class="worker-repo-ops__policy-list">
        ${V.map(oe=>c`<li data-token=${oe}>
              ${F[oe]||oe}
            </li>`)}
      </ul>
    </div>`}function B(){let N=i(),V=N.repo_operation_policy&&typeof N.repo_operation_policy=="object"?N.repo_operation_policy:null;return V?c`<section
      class="worker-repo-ops__repair"
      data-seam="repo-ops-policy"
    >
      <details class="worker-repo-ops__policy" data-seam="policy-lists">
        <summary>
          Worker 자동 처리 기준
          <span class="worker-repo-ops__policy-count"
            >자동 ${(V.worker_automatic||[]).length} · 금지
            ${(V.never_automatic||[]).length}</span
          >
        </summary>
        ${V.supported===!1?c`<div
              class="worker-repo-ops__policy-group"
              data-policy="policy-schema"
            >
              ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uAC00 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${V.schema_version})`}
            </div>`:""}
        ${z("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",V.worker_automatic||[],"worker-automatic")}
        ${z("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",V.never_automatic||[],"never-automatic")}
      </details>
    </section>`:""}return{template(){return c`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언
        </summary>
        ${P(a())} ${B()}
      </details>`}}}var Im=20,Hw=5,zw=new Set(["failed","running","queued","retry_pending"]),zc={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC",job:"\uBA38\uC9C0 \uD6C4 \uC7A1"},Cm={verify:"verify",deploy:"deploy",job:"deploy"};function Kw(e){if(typeof e!="string")return"";let t=e.split("/").filter(n=>n.length>0);return t.length>0?t[t.length-1]:""}function Gw(e){return!e||typeof e!="object"?"":e.kind==="job"?Kw(e.script_path)||zc.job:Object.hasOwn(zc,e.kind)?zc[e.kind]:e.kind}function Vw(e,t,n=Im){let r=[];for(let o of Array.isArray(e)?e:[])!o||typeof o!="object"||r.push({type:"operation",id:o.operation_id,at:typeof o.finished_at=="number"?o.finished_at:typeof o.requested_at=="number"?o.requested_at:null,operation:o});for(let o of Array.isArray(t)?t:[])!o||typeof o!="object"||r.push({type:"cleanup",id:o.bead_id,at:typeof o.at=="number"?o.at:null,cleanup:o});return r.sort((o,i)=>o.at===null&&i.at===null?String(o.id||"").localeCompare(String(i.id||"")):o.at===null?1:i.at===null?-1:i.at-o.at),r.slice(0,Math.max(0,n))}function Yw(e){if(e.type==="cleanup")return!0;let t=e.operation;return zw.has(t.state)&&!t.dismissed&&!t.superseded_by}function Qw(e,t,n={}){let r=Vw(e,t,1/0),o=n.expanded===!0?Im:Hw,i=new Set(r.slice(0,o)),s=r.filter(l=>i.has(l)||Yw(l));return{visible:s,hidden:r.length-s.length}}function Om(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function Xw(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function Lm(e){let t=e.filter(n=>n.value);return t.length===0?"":c`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(n=>{let r=n.copy===!0?Qr(n.value):n.value;return c`<div>
          <dt>${n.term}</dt>
          <dd>${r}</dd>
        </div>`})}
    </dl>
  </details>`}function Pm(e,t="",n=!1){return!e&&!t?"":c`<p
    class="worker-ev__explain${n?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?c`<br />${t}`:""}
  </p>`}function Zw(e,t){if(!e||typeof e!="object")return;let n=t&&typeof t=="object"?t.kind:"";if(!Object.hasOwn(Cm,n))return;let r=e[Cm[n]],o=r&&typeof r=="object"?r.timeout_ms:void 0;return typeof o=="number"&&Number.isFinite(o)?o:void 0}function Jw(e,t){let n=T_(e,t),r=R_(e);return!n&&!r?"":c`<p class="worker-ev__why">
    ${n?c`<span class="worker-ev__why-line">${n}</span>`:""}${r?c`<span class="worker-ev__why-line">${r}</span>`:""}
  </p>`}function e$(e){return e.state!=="failed"||e.superseded_by||e.dismissed?"":c`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-repo-op__dismiss"
      data-operation-id=${e.operation_id}
      title="사람이 확인한 실패로 접수합니다 — 기록은 그대로 남고 해결 필요 집계에서만 빠집니다"
    >
      기록 닫기
    </button>
  </div>`}function t$(e,t){let n=e.operation,r=n.state==="failed",o=n.failure?n.failure.code:"";return c`<li
    class="worker-ev"
    data-operation-id=${n.operation_id}
    data-state=${n.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?Xt(e.at):""}
      >${Wi(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${Om(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what">${Gw(n)}</span>
        <span class="worker-ev__meta"
          >${n.target_base}@${Ui(n.target_sha)}${typeof n.elapsed_ms=="number"?` \xB7 ${Zr(n.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${Om(e)}"
          >${Xw(e)}</span
        >
        ${n.dismissed?c`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${n.superseded_by?c`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
        ${n.source==="manual"?c`<span
              class="worker-ev__st worker-ev__st--manual"
              title="사람이 배포 실행을 눌러 시작한 작업입니다"
              >수동</span
            >`:""}
      </div>
      ${r?Pm(E_(n.failure_kind,o)):""}
      ${Jw(n,Zw(t,n))}
      ${e$(n)}
      ${Lm([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?o:""},{term:"script",value:[n.script_path||"",n.script_blob_sha?`blob ${Ui(n.script_blob_sha)}`:"",Number.isInteger(n.exit_code)?`exit ${n.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:n.log_path||"",copy:!0},{term:"\uCD9C\uB825",value:n.output_tail||""}])}
    </div>
  </li>`}function n$(e){let t=e.cleanup,n=to(t.step);return c`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?Xt(e.at):""}
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
        ${yp(t.step).map(r=>c`<li
              class="worker-step worker-step--${r.state}"
              data-step=${r.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${r.label}</span>
            </li>`)}
      </ol>
      ${Pm(Ir(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
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
      ${Lm([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||"",copy:!0},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function r$(e){let t=typeof e.hidden=="number"?e.hidden:0,n=e.expanded===!0;return c`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(r=>r.type==="cleanup"?n$(r):t$(r,e.repo_ops))}
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
  </section>`}function Dm(e,t={}){let n=null;function r(){if(n===null){lt(c``,e);return}let s=Qw(n.operations,n.cleanup_failures,{expanded:n.expanded});lt(r$({events:s.visible,hidden:s.hidden,expanded:n.expanded,repo:n.repo,repo_ops:n.repo_ops}),e)}e.addEventListener("click",s=>{let l=s.target;if(l?.closest?.('[data-seam="repo-ops-close"]')){i();return}l?.closest?.('[data-seam="repo-ops-more"]')&&n&&(n.expanded=!n.expanded,r())});function o(s){n={operations:s.operations,cleanup_failures:s.cleanup_failures,repo:s.repo||"",repo_ops:s.repo_ops||null,expanded:!1},r()}function i(){n!==null&&(n=null,r(),t.onClose&&t.onClose())}return{open:o,close:i,isOpen:()=>n!==null,refresh(s){n&&(n={operations:s.operations,cleanup_failures:s.cleanup_failures,repo:s.repo||"",repo_ops:s.repo_ops||null,expanded:n.expanded},r())}}}var o$="session-preferred",s$=["external_roundtrip","user_feedback_loop"];function Mm(e,t){if(!gs(e).includes(o$)||typeof t!="object"||t===null)return"";let n=t.session_preferred_reason;return typeof n=="string"&&s$.includes(n)?n:""}var i$="spec-after-blocker";function Nm(e,t){return gs(e).includes(i$)&&Array.isArray(t)&&t.length>0}var a$=Bt("views:worker:adapter"),l$="tab:worker:ready",c$="tab:worker:blocked",u$="tab:worker:in-progress",d$="tab:worker:resolved",p$="tab:worker:closed",f$="\u{1F512} blocked",_$={revision:0,auto_advance:!1,auto_merge:!1,slots:oa,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]},m$=["claude_account","codex_account"],g$=[...To,...m$];function h$(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function b$(e){let t=e&&typeof e=="object"?e.awaiting_user:void 0,n=typeof t=="string"?t.trim():"";return n.length>0?`${Pl}: ${n}`:Pl}function Lr(e){return e&&typeof e=="object"?e:{}}function y$(e){let t={};for(let n of g$){let r=e[n];typeof r=="string"&&r.length>0&&(t[n]=r)}return t}function v$(e){let t=new Map;for(let r of e){if(!r||typeof r.id!="string"||r.id.length===0)continue;let o=Lr(r.metadata).carried_from;if(!(typeof o!="string"||o.length===0))for(let i of Vs(r)){let s=t.get(i);s||(s=new Set,t.set(i,s)),s.add(r.id)}}let n=new Map;for(let[r,o]of t)n.set(r,[...o].sort());return n}function k$(e){let t=e.replace(/\/+$/,""),n=t.lastIndexOf("/");return n>=0?t.slice(n+1):t}function qm(e={}){let{queueStore:t,issueStores:n,transport:r,getWorkspacePath:o,onInvalidate:i}=e,s=n?yo(n):null,l=new Map,a={},u=null,d=0,f=null,_=!1;function k(){_||!i||i()}function m(q){return u===q?a:{}}async function R(){if(!r||_)return;let q=o?.()||"";if(u===q||f&&f.key===q&&f.generation===d)return;let F=++d;f={key:q,generation:F};let z=null;try{z=await Promise.resolve(r("get-session-defaults",{}))}catch(B){if(F!==d)return;f=null,a$("get-session-defaults failed: %o",B),k();return}F===d&&(a=z&&typeof z.values=="object"&&z.values!==null?{...z.values}:{},u=q,f=null,k())}function T(){u=null,d+=1,R()}function D(){for(let[q,F]of l)F==="failed"&&l.delete(q)}function ne(q,F){return s?s.selectBoardColumn(q,F):[]}function H(q,F,z,B){let N=new Set(z.map(G=>G.id)),V=new Set,W=new Map,oe=[];for(let G of[...F,...z]){if(V.has(G.id)||h$(G))continue;let se=hs(G,q);se.location===null&&(V.add(G.id),W.set(G.id,se),oe.push(G))}let fe=wm(oe,co(B)),Pe=Lr(q.bead_scope);return fe.map(G=>{let se=W.get(G.id),_e=ho(G),Oe=_e.evidence==="published",Q=typeof G.workflow?.route=="string"&&G.workflow.route||(G.metadata&&typeof G.metadata.route=="string"?G.metadata.route:""),ce=se.worker_ineligible,J=ce||!Object.hasOwn(G,"labels")?"":Mm(G.labels,G.metadata),Se=N.has(G.id),be=Se?Vs(G):[],me=[];Se&&be.length===0&&me.push(f$),se.awaiting_user&&me.push(b$(G.metadata)),se.missing_description?me.push("missing_description"):se.spec==="conflict"?me.push("spec_id_conflict"):se.spec==="none"?me.push("spec \uC5C6\uC74C"):se.spec==="draft"&&me.push("spec \uBBF8\uBC1C\uD589(draft)");let L=Pe[G.id];return{bead_id:G.id,title:G.title||G.id,route:Q,spec_id:_e.conflict?"":_e.path,published:Oe,blocked:Se,blocked_by:be,labels:Array.isArray(G.labels)?G.labels:[],created_at:G.created_at,updated_at:G.updated_at,status:G.status,workflow:G.workflow||null,exec_pins:y$(Lr(G.metadata)),rec:null,...L&&Array.isArray(L.scope)?{scope:L.scope}:{},eligible:se.placeable,route_ok:se.route_ok,awaiting_user:se.awaiting_user,missing_description:se.missing_description,placement_spec:se.spec,reason:me.join(" \xB7 "),worker_ineligible:ce,session_preferred:J.length>0,session_preferred_reason:J,spec_after_blocker:Nm(G.labels,be),release_info:G.release_info,dependents_info:G.dependents_info}})}function P(q){let[F,z,B,N,V]=q,W=fi([...F,...z,...B,...N,...V]),oe=v$([...F,...z,...B,...N]),fe={},Pe=(G,se)=>{if(!G||typeof G.id!="string"||G.id.length===0)return;let _e=fe[G.id]||(fe[G.id]={});if(typeof G.priority=="number"&&!("priority"in _e)&&(_e.priority=G.priority),typeof G.from_id=="string"&&!("from_id"in _e)&&(_e.from_id=G.from_id),se&&!("metadata"in _e)){_e.metadata=Lr(G.metadata);let Oe=Lr(G.workflow).route;typeof Oe=="string"&&Oe.length>0&&(_e.route=Oe)}};for(let G of[...F,...z,...B])Pe(G,!0);for(let G of[...N,...V])Pe(G,!1);for(let G of new Set([...Object.keys(fe),...W.keys()])){let se=_i(W,G);if(se.total>0){let _e=fe[G]||(fe[G]={});_e.rollup=se}}for(let[G,se]of oe){let _e=fe[G]||(fe[G]={});_e.carried_to=se}return fe}function O(q,F,z,B){let N=new Set((Array.isArray(q.done)?q.done:[]).map(W=>W?.bead_id).filter(W=>typeof W=="string")),V=[];for(let W of F){let oe=vr(W.closed_at);if(typeof W.id!="string"||N.has(W.id)||oe===null||B!==void 0&&oe<B||typeof W.comment_count!="number"||W.comment_count<=0)continue;let fe=`${z}\0${W.id}\0${String(W.updated_at)}\0${W.comment_count}`,Pe=l.get(fe);if(Pe===void 0&&r&&(l.set(fe,"pending"),Promise.resolve(r("get-comments",{id:W.id})).then(se=>{let _e=Array.isArray(se)&&se.some(Oe=>Sa(typeof Oe?.text=="string"?Oe.text:"")?.lane==="session");l.set(fe,_e?"session":"not-session"),k()}).catch(()=>{l.set(fe,"failed"),k()})),Pe!=="session")continue;let G=vr(W.started_at);V.push({id:W.id,title:W.title||W.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:G!==null&&oe>=G?oe-G:null,work_kind:"session",done_at:oe,created_at:W.created_at,updated_at:W.updated_at})}return V}return{read(q){if(!t)return{workspaces:[],workspaces_state:[]};let F=t.get()||_$,z=o?.()||"",B=q&&typeof q.done_since=="number"?q.done_since:void 0,N=ne(l$,"ready"),V=ne(c$,"blocked"),W=ne(u$,"in_progress"),oe=ne(d$,"resolved"),fe=ne(p$,"closed");return{workspaces:[{...F,bead_titles:{...Lr(F.bead_titles),...Object.fromEntries([...N,...V].filter(Pe=>Pe&&typeof Pe.id=="string").map(Pe=>[Pe.id,Pe.title||Pe.id]))},root_dir:z,name:k$(z),runnable:H(F,N,V,q?q.candidate_sort:void 0),session_done:O(F,fe,z,B),bead_overlay:P([N,V,W,oe,fe])}],workspaces_state:[{root_dir:z,revision:F.revision,auto_advance:F.auto_advance,auto_merge:F.auto_merge,slots:typeof Lr(F.workspace_info).slots=="number"?Lr(F.workspace_info).slots:F.slots,runner_catalog:F.runner_catalog,execution_defaults:F.execution_defaults,session_defaults:m(z),orchestration_model:F.orchestration_model,orchestration_effort:F.orchestration_effort,orchestration_speed:F.orchestration_speed,quick_fix_orchestration_model:F.quick_fix_orchestration_model,quick_fix_orchestration_effort:F.quick_fix_orchestration_effort,quick_fix_orchestration_speed:F.quick_fix_orchestration_speed,issue_prefix:""}]}},ensureSessionDefaults(){R()},refreshSessionDefaults:T,notifyIssuesChanged:D,destroy(){_=!0,d+=1,f=null,l.clear()}}}var Ka=1,jm=5,w$={root_dir:"",name:"",auto_advance:!1,auto_merge:!1,slots:Ka,revision:0,runner_catalog:{},items:[],sublanes:{parallel:[],serial:[]},serial_lane_count:0,raw_queue_length:0,live_count:0,over_cap:!1,merge:{positions:new Map,resolutions:new Map,continuations:new Map,authorities:new Map,state:{active:null,failures:{},waiting:null},auto_excluded:[],running:!1},token_total:null,cleanup_failures:[],declared_base:null,repo_operations:[]};function gn(e){return e&&typeof e=="object"?e:{}}var Um="beads-ui.worker.candidate-filter",Kc={show_blocked:!1,readiness:"all",routes:[]},$$=1e3;function x$(){try{let e=window.localStorage.getItem(Um);if(!e)return{...Kc};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Kc};let n=t.readiness;return{show_blocked:t.show_blocked===!0,readiness:n==="ready"||n==="not_ready"?n:"all",routes:no(t.routes)}}catch{return{...Kc}}}function A$(e){try{window.localStorage.setItem(Um,JSON.stringify(e))}catch{}}var Wm="bdui.worker.done-range";function S$(){try{let e=window.localStorage.getItem(Wm);return e===null?"today":Yn(e)}catch{return"today"}}function E$(e){try{window.localStorage.setItem(Wm,e)}catch{}}function Fm(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function T$(e){return e==="receipt_not_current"?"\uB9AC\uBDF0 \uD6C4\uC5D0\uB3C4 \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC74C":e==="cancelled"?"\uB9AC\uBDF0 \uC138\uC158 \uCDE8\uC18C\uB428":e.startsWith("launch_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uC2DC\uC791 \uC2E4\uD328(${e.slice(14)})`:e.startsWith("session_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uBE44\uC815\uC0C1 \uC885\uB8CC(${e.slice(15)})`:`\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD328(${e})`}function Bm(e){if(e.startsWith("receipt_unbacked:"))return`\uC2E4\uD589 \uC601\uC218\uC99D \uC790\uB3D9 \uAC80\uC99D \uBD88\uAC00(${e.slice(17)}) \u2014 [\uBA38\uC9C0] \uD074\uB9AD\uC73C\uB85C \uC218\uB3D9 \uC9C4\uD589 \uAC00\uB2A5`;switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_rebase_cap":return"\uD050 \uC7AC\uCDA9\uB3CC 3\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"worktree_restore_branch_mismatch":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uBE0C\uB79C\uCE58 \uC774\uB984 \uBD88\uC77C\uCE58";case"worktree_restore_path_exists":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uACBD\uB85C \uC774\uBBF8 \uC788\uC74C";case"worktree_restore_branch_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 origin\uC5D0 \uBE0C\uB79C\uCE58 \uC5C6\uC74C";case"worktree_restore_branch_diverged":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uB85C\uCEEC \uBE0C\uB79C\uCE58\uAC00 origin\uACFC \uB2E4\uB984";case"worktree_restore_failed":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function R$(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function C$(e){return!e||typeof e!="object"?"\uC138\uC158 \uAE30\uB3D9 \uC751\uB2F5\uC744 \uBC1B\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4":e.conflict===!0?"\uD050\uAC00 \uBC14\uB00C\uC5B4 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694":e.session==="already_running"?`\uC774\uBBF8 \uC5F4\uB824 \uC788\uC2B5\uB2C8\uB2E4 \xB7 ${e.tmux_window||"?"}`:e.launched!==!0?`\uC138\uC158 \uAE30\uB3D9 \uC2E4\uD328: ${e.reason||"unknown"}`:e.mode==="fork"?null:`\uC0C8 \uC138\uC158\uC73C\uB85C \uC2DC\uC791 (${e.fallback_reason||"unknown"})`}function O$(e){return e&&e.launched===!0?"success":"error"}function I$(e){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let t=e.slice(19);if(t.length===0)return null;switch(t){case"gating":return"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function L$(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}var P$=new Set(["paused","needs_human","waiting_metadata","reviewing","retrying"]),D$=new Set(["waiting_metadata","reviewing","retrying"]),Gc=new Set(["review_receipt_missing","review_receipt_stale","review_receipt_invalid","review_receipt_undetermined"]);function M$(e){let t=e&&typeof e=="object"?e.auto_resolution:null,n=t&&typeof t=="object"&&!Array.isArray(t)?t:null;if(!n||!e)return null;let r=typeof n.origin_reason=="string"&&n.origin_reason.length>0?`\uC6D0 \uC0AC\uC720: ${n.origin_reason}`:"";switch(e.phase){case"waiting_metadata":return{label:"\uC815\uC815 \uB300\uAE30",details:[r,"\uBA54\uD0C0\uB370\uC774\uD130 \uC815\uC815\uC774 \uAD00\uCE21\uB418\uBA74 \uC790\uB3D9 \uC7AC\uAC1C"].filter(Boolean),live:!1};case"retrying":{let o=Number.isInteger(n.attempts)?Math.max(0,Number(n.attempts)):0,i=Number.isInteger(n.attempt_cap)&&Number(n.attempt_cap)>0?Number(n.attempt_cap):0,s=typeof n.next_at=="number"?Xt(n.next_at):"",l=typeof n.last_error=="string"&&n.last_error.length>0?n.last_error:"";return{label:i>0?`\uC7AC\uC2DC\uB3C4 ${Math.min(o,i)}/${i}`:`\uC7AC\uC2DC\uB3C4 ${o}`,details:[r,s?`\uB2E4\uC74C \uC2DC\uAC01 ${s}`:"",l?`\uB9C8\uC9C0\uB9C9 \uC624\uB958: ${l}`:""].filter(Boolean),live:!0}}default:return null}}function N$(e){if(typeof e!="string")return"";for(let t of["retry_exhausted:","auto_review_exhausted:"])if(e.startsWith(t))return e.slice(t.length);return""}function q$(e,t=null){if(!e||typeof e!="object")return null;let n="";switch(e.phase){case"gating":n="\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"merging":n="\uBA38\uC9C0 \uC911";break;case"cleaning":n="\uB9C8\uBB34\uB9AC \uC911";break;case"waiting_metadata":case"reviewing":case"retrying":if(!t)return null;n=t.label;break;case"paused":n="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":n="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let r=[n];e.head_sha&&r.push(`head ${e.head_sha}`),e.base_sha&&r.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&r.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`);let o=N$(e.terminal_reason);o&&r.push(`\uC6D0 \uC0AC\uC720: ${o}`);let i=e.phase==="needs_human"&&!o?lo(e.terminal_reason):null;i&&r.push(e.failure_stage?`${e.failure_stage} \xB7 ${i}`:i);for(let s of t?t.details:[])r.push(s);return e.active_attempt_id&&r.push(`attempt ${e.active_attempt_id}`),e.evidence&&r.push(e.evidence),e.log_path&&r.push(e.log_path),{badge:n,title:r.join(`
`),alert:e.phase==="needs_human",lock_actions:!P$.has(e.phase)}}function j$(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function F$(e){if(!e||typeof e!="object")return[];let t=e.badge_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function B$(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",n=(i,s={})=>{let l=[s.title||"",t].filter(Boolean);return{label:i,title:l.join(`
`),live:s.live===!0,alert:s.alert===!0}};if(e.continuation_required)return n("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.queueing)return e.queueing==="cleanup"?n("\uC815\uB9AC \uC7AC\uC2DC\uB3C4 \uC694\uCCAD \uC911",{title:"\uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9AC\uB294 \uC911\uC785\uB2C8\uB2E4",live:!0}):n("\uD050 \uB4F1\uB85D \uC911",{title:"\uBA38\uC9C0 \uD050\uC5D0 \uB123\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.merge_step)return e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):n("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return n(e.conflict_badge,{live:e.conflict_live===!0});if(e.auto_resolution)return n(e.auto_resolution.label,{title:e.auto_resolution.details.join(`
`),live:e.auto_resolution.live===!0});if(e.recovery?.lock_actions)return n(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return n(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return n("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});let r=j$(e.receipt_check),o=e.conflicting||e.gate?.reason==="base_behind"||r.length>0;if(e.auto_pending&&o)return n("\uD655\uC778 \uC911",{title:"\uBA38\uC9C0 \uD050\uAC00 \uC790\uB3D9\uC73C\uB85C \uCC98\uB9AC \uC911 \u2014 \uB2E4\uC74C \uAD00\uCE21\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.conflicting)return n("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="base_behind")return n("base \uAC31\uC2E0 \uD544\uC694",{alert:!0});if(Gc.has(e.gate?.reason)){let i=e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uC785\uB2C8\uB2E4. [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":e.gate.reason==="review_receipt_invalid"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uAE30\uB85D\uC774 \uC131\uB9BD\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":e.gate.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC758 ancestry probe\uB97C \uC644\uB8CC\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4";if(e.review_session?.active===!0)return n(e.review_session.origin==="auto"?"\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911":"\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911",{title:`${i}
\uB9AC\uBDF0 \uC138\uC158\uC774 \uC2E4\uD589 \uC911\uC785\uB2C8\uB2E4 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4`,live:!0});if(e.auto_review_wait==="slot")return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uB9AC\uBDF0 \uC138\uC158 \uC2AC\uB86F \uB300\uAE30",{title:`${i}
\uC2E4\uD589 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uC790\uB3D9\uC73C\uB85C \uB9AC\uBDF0 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4. \uC9C0\uAE08 \uD074\uB9AD\uD558\uBA74 \uC989\uC2DC \uB744\uC6C1\uB2C8\uB2E4`,live:!0});if(e.review_session?.failure){let s=e.review_dispatch?.state==="exhausted"&&e.review_session.origin==="auto";return n(`\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 ${s?"\uC790\uB3D9 \uB9AC\uBDF0 1\uD68C \uC18C\uC9C4 \xB7 ":""}${T$(e.review_session.failure)}`,{title:`${i}
\uC9C1\uC804 \uB9AC\uBDF0 \uC138\uC158 \uC885\uB8CC \uC0AC\uC720: ${e.review_session.failure}`,alert:!0})}return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:i,alert:!0})}return e.gate?.reason==="spec_id_missing"?n("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0}):r.length>0?n(`\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694 \xB7 ${r[0]}`,{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${r.join(", ")}`,alert:!0}):e.recovery?n(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?n("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?n(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${Bm(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?n(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${Bm(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?n(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?n("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?n("\uB2EB\uD798",{alert:!0}):e.activity?n("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?n("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?n("\uD655\uC778 \uC911"):e.gate?.gate_badge?n(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function U$(e,t,n,r,o=null,i=null,s=null,l=!1,a=null,u=!0,d=null,f=null,_=null,k={},m=!1,R={},T=null,D={active:!1,failure:null,origin:null},ne=!1){let H=!!a&&a.position>0,P=!!a?.continuation_action&&a.continuation_action.continuation===null,O=!!a&&a.active===!0,q=a&&a.failure||null,F=I$(a?a.waiting:null),z=n[e]||null,B=z&&z.gate?z.gate:null,N=z&&z.pr?z.pr:null,V=L$(a?a.resolution:null),W=M$(_),oe=q$(_,W),fe=a&&a.authority||null,Pe=a&&a.review_dispatch||null,G=a?.hold?.auto_review_wait==="slot"?"slot":null,se=!!_&&typeof _=="object"&&D$.has(_.phase),_e=H&&!O&&(!fe||se||fe.source==="automatic"&&!m),Oe=s==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":V?V.badge:s==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":F,Q=!!B&&B.base_badge==="\uCDA9\uB3CC",ce=!!B&&B.enabled===!0,J=xs({bead_id:e,merge_sha:R.merge_sha,cleanup_cursor:R.cleanup_cursor,merge_progress:i&&i.merge_progress?i.merge_progress:null,cleanup_failed:r,repo_operations:R.repo_operations}),Se=na(J),be=i&&!J&&(i.queueing??null)?i.queueing:null,me=!!r&&["repo_operations","post_merge_jobs","child_sweep","branch_cleanup","parent_close"].includes(r.step)&&!!B&&B.tier==="merged",L=r&&r.step==="repo_operations"&&J?.failed===!0&&(J.step==="deploy"||J.step==="verify")?J.step:null,ee=l&&!!r&&!!B&&B.tier==="merged",Re=_e&&(ce||Q||B?.reason==="base_behind"||Gc.has(B?.reason)||me||ee),I=Gc.has(B?.reason),ae=l&&Q&&u===!1,le=dr(k,e,{external:l,merge_active:O||J?.step==="merge",merge_queued:H,conflict_active:!!s,cleanup_active:Se,merged:!!r||B?.tier==="merged"}),Y=!!le.operation,Ae=!!r||_?.phase==="needs_human"||!!le.error,ge=H&&!q&&!P&&!me&&!(oe&&oe.lock_actions),Le=B$({auto_pending:ge,continuation_required:P,queueing:be,merge_step:J,conflict_badge:Oe,conflict_live:V?.live===!0||s==="running",auto_resolution:W,recovery:oe,cleanup_failed:r,cleanup_label:r?to(r.step):null,base_exception:f,conflicting:Q,gate:B,receipt_check:z&&z.receipt_check?z.receipt_check:null,queue_failure:q,auto_skip:d,queued:H,queue_active:O,queue_position:a?a.position:0,review_session:D,review_dispatch:Pe,auto_review_wait:G,activity:Oe?null:i&&i.activity||null}),qe=Le?.live===!0&&Le.title?c`<span title=${Le.title}>${Le.label}</span>`:Le?.label||null,Ze=F$(z&&z.receipt_check?z.receipt_check:null);return{id:e,title:l?c`${t}<span class="muted"> · 세션</span>`:t,reason:r&&J?.active!==!0?ta(r.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",...T?{dependency_chips:T}:{},external:l,pr_number:N&&typeof N.number=="number"?N.number:null,pr_url:N&&typeof N.url=="string"?N.url:"",completion_badge:Le?.live!==!0&&Le?.title?Le.label:null,completion_title:Le?.title||"",..._?.phase==="needs_human"&&typeof _.log_path=="string"&&_.log_path.length>0?{log_path:_.log_path}:{},...Ze.length>0?{receipt_badge:{codes:Ze}}:{},badges:qe?[qe]:[],live_badge:Le?.live===!0?qe:null,usage:o,alert:Le?.alert===!0,merge_action:B?.tier==="merged"&&!me&&!ee?!1:!H||P||_e||I,cancel_action:H&&!P,cancel_enabled:!O&&!(oe&&oe.lock_actions),cancel_title:oe&&oe.lock_actions?`${oe.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:O?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:le,discard_action:le.action,resolve_action:Ae,resolve_enabled:!ne,resolve_title:ne?"\uC138\uC158 \uAE30\uB3D9 \uC694\uCCAD \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":"\uC774 \uC2E4\uD328\uB97C \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 \u2014 \uAE30\uB85D\uB41C \uC138\uC158\uC774 \uC788\uC73C\uBA74 fork\uD558\uACE0, \uC5C6\uC73C\uBA74 \uC0C8 \uC138\uC158\uC5D0 \uC0AC\uC720\uB97C \uC2E3\uC2B5\uB2C8\uB2E4",merge_step:J,discard_enabled:le.enabled,discard_title:le.title,merge_enabled:!J&&!be&&!s&&!Y&&!f&&!(oe&&oe.lock_actions)&&!ae&&D.active!==!0&&(ce||Q||B?.reason==="base_behind"||I||me||ee||Re||se&&!O),merge_label:P?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":me||ee?L==="deploy"?"\uBC30\uD3EC \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":L==="verify"?"\uAC80\uC99D \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":"\uC815\uB9AC \uC7AC\uC2DC\uB3C4":Q&&!J&&!me?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":B?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":I?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":_e?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:Y?le.error?`\uD3D0\uAE30 \uC2E4\uD328: ${le.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${le.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:P?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":be?"\uC694\uCCAD\uC744 \uBCF4\uB0B4\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":J?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${J.label}`:L?`\uBA38\uC9C0 \uC644\uB8CC \u2014 ${L==="deploy"?"\uBC30\uD3EC":"\uAC80\uC99D"} \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD574 \uC815\uB9AC\uAC00 \uBA48\uCDC4\uC2B5\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uC800\uC7A5\uC18C \uC791\uC5C5\uBD80\uD130 \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4`:ee?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":ae?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":s==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":s==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":me?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":Q?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":B?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":D.active===!0?D.origin==="auto"?"\uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":B?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uB9AC\uBDF0\uB9CC \uC218\uD589\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":B?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":B?.reason==="review_receipt_invalid"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uAE30\uB85D\uC774 \uC131\uB9BD\uD558\uC9C0 \uC54A\uC74C \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":B?.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D ancestry probe \uBBF8\uC644\uB8CC \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC0C8 \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":B?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":ce?`\uBA38\uC9C0 (${B.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:B&&B.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${B&&B.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Vc(e,t={}){let{transport:n,issueStores:r,queueStore:o,sessionLogStore:i,gotoIssue:s,getWorkspacePath:l,switchWorkspace:a,openDoc:u,doneRange:d,onDoneRangeChange:f}=t,_=r?yo(r):null,k=x$(),m=null,R=null,T=null,D=null,ne=null,H=Io(()=>$()),P=new Map,O=new Map,q=ym(),F=Wc(q)===null,z=d?Yn(d):S$();function B(){let x=fo.find(y=>y.value===z);return x?x.label:"\uC624\uB298"}let N=La("beads-ui.worker.lane-collapsed"),V=!1,W="";function oe(){return W.trim().length>0}function fe(x){return oe()?x.filter(y=>y.search_match===!0).length:void 0}let Pe=new Set,G=new Set,se=new Set,_e=new Set,Oe=new Set,Q=new Set,ce=null,J=[],Se=qm({queueStore:o,issueStores:r,transport:n,getWorkspacePath:l,onInvalidate:()=>$()});function be(){Se.refreshSessionDefaults()}let me=document.createElement("div");me.className="worker-console";let L=document.createElement("div");L.className="worker-top";let ee=document.createElement("div");ee.className="worker-drawer-overlay",ee.hidden=!0;let Re=document.createElement("div");Re.className="worker-drawer-overlay__backdrop";let I=document.createElement("div");I.className="worker-drawer-host";let ae=document.createElement("div");ae.className="worker-drawer-host",ae.hidden=!0,ee.append(Re,I,ae);let le=document.createElement("div");le.className="worker-lanes-host",me.append(L,ee,le),e.appendChild(me);let Y=Tr(null,null),Ae=[],ge=Da({transport:n,console_el:me,getLanes:()=>Y,getWorkspaces:()=>Ae,getCrossLanes:()=>null,reproject:()=>({lanes:K(),raw_lanes:null}),onCorrection:()=>{},showToast:ve,requestRender:()=>$(),adoptQueue:(x,y)=>{o&&o.set(y)},onDragBegin:()=>{R=null}}),Le=null,qe=Ho(I,{transport:n,sessionLogStore:i,onClose:()=>{Le=null,ee.hidden=!0,$()}}),Ze=Dm(ae,{onClose:()=>{ae.hidden=!0,ee.hidden=!0,$()}}),ze=Em({getWorkspacePath:l||(()=>"")}),ie=l&&l()||"",Z=Rm({queueStore:o,transport:n,onChanged:()=>$(),onOpenScript:(x,y)=>{ze.open(x,y)}});function Ie(){return o&&o.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:Ka,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function tt(x){let y=Ma(x,Ie());y&&(ne=y,$())}function st(){ne=null,$()}function Qe(){let x=qa(ne);x&&(ne=null,$(),A(x.attempt_id,"session",x.payload))}function ct(x){if(!R||!x.some(C=>C.id===R))return null;let y=bs(Ie());return y?{bead_id:R,lanes:y}:null}function $t(){return l&&l()||""}async function mt(x,y){await ge.sendOp({type:"worker-queue-place",payload:{bead_id:x,...y==="parallel"?{}:{lane:y}},root_dir:$t()},x)}function Xe(){let x=Ie();return typeof x.revision=="number"?x.revision:0}function gt(x){x&&x.queue&&o&&o.set(x.queue)}async function Zt(x){if(!n||!x)return;let y=await n("worker-attempt-pause",{attempt_id:x});y&&y.paused===!1&&y.reason&&ve(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${y.reason}`,"error",2400)}async function A(x,y="session",C={}){if(!n||!x)return;let ue=n,Te=Ie().attempts?.[x]||null;await jo({context:{bead_id:Te?.bead_id||"",kind:y,tuple:Te?On(Te):""},transport:je=>ue("worker-attempt-resume",{attempt_id:x,expected_revision:Xe(),...C,...je}),adopt:gt})}async function re(x,y,C=!0){if(!n)return null;let ue=n,Te=await ue(x,{...y,expected_revision:Xe()});return gt(Te),Te&&Te.conflict&&C&&(Te=await ue(x,{...y,expected_revision:Xe()}),gt(Te)),Te}async function Me(x){if(!n||!x)return;let y=Ie().merge_queue?.find(ue=>ue.bead_id===x)?.continuation_action;if(y?.mismatch&&y.continuation===null){await St(x,y.mismatch);return}Pe.add(x),$();let C;try{C=await re("worker-merge-queue-add",{bead_id:x})}catch{ve("\uBA38\uC9C0 \uD074\uB9AD\uC774 \uC11C\uBC84\uC5D0 \uC804\uB2EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4(\uC5F0\uACB0 \uBB38\uC81C) \u2014 \uC5F0\uACB0 \uBCF5\uAD6C \uD6C4 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",3200);return}finally{Pe.delete(x),$()}if(!(!C||C.applied)){if(C.conflict){ve("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}ve(R$(C.reason),"error",2400)}}async function Ce(x){if(!(!n||!x||G.has(x))){G.add(x),$();try{let y=await n("worker-cleanup-retry",{bead_id:x,expected_revision:Xe()});gt(y),y&&!y.retried&&!y.conflict&&y.reason&&ve(`\uC815\uB9AC \uC7AC\uC2DC\uB3C4 \uAC70\uBD80: ${y.reason}`,"error",2400)}finally{G.delete(x),$()}}}async function Fe(x){if(!(!n||!x||se.has(x))){se.add(x),$();try{let y=await n("worker-resolve-in-session",{bead_id:x,expected_revision:Xe()});gt(y);let C=C$(y);C!==null&&ve(C,O$(y),4e3)}finally{se.delete(x),$()}}}async function Ue(x,y){let C=Ie().hold;if(!n||!C||typeof C.since!="number")return;let ue=await n(x,{since:C.since});gt(ue),ue&&ue.ok===!1&&ve(`${y}: ${ue.reason==="hold_changed"?"\uD050 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694":ue.reason||""}`,"error",2800)}async function dt(x){if(!n||!x)return;let y=await n("worker-queue-start-now",{bead_id:x});gt(y),y&&y.ok===!1&&ve(`\uC9C0\uAE08 \uC2DC\uC791 \uAC70\uBD80: ${y.reason==="not_waiting"?"\uC774 \uC774\uC288\uB294 \uB354 \uC774\uC0C1 \uB300\uAE30 \uB808\uC778\uC5D0 \uC5C6\uC2B5\uB2C8\uB2E4":y.reason||""}`,"error",2800)}async function St(x,y){let C=await Cr({continuation_mismatch:y},(Te,je)=>re("worker-merge-queue-add",{bead_id:x,continuation:Te,decision_token:je},!1)),ue=C?.queue?.merge_queue?.find(Te=>Te.bead_id===x)?.continuation_action;if(C?.applied!==!0&&ue?.continuation===null&&ue.mismatch){await St(x,ue.mismatch);return}C&&C.applied===!1&&!C.conflict&&ve("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function de(x){if(!n)return;let y=await re("worker-merge-auto-toggle",{on:x});!y||y.conflict||ve(x?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",x?"success":"info",2400)}async function ke(x){if(!n||!x)return;let y=await re("worker-merge-queue-remove",{bead_id:x});y&&!y.conflict&&!y.applied&&y.reason==="merge_active"&&ve("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function He(){await re("worker-merge-queue-remove",{all:!0})}async function it(x,y=null,C="unmerged",ue=null){if(!n||!x)return;let Te=vs(x,C);if(!(!!ue||typeof globalThis.confirm!="function"||globalThis.confirm(Te)))return;let Je=await n("worker-discard",{bead_id:x,...y?{attempt_id:y}:{},...ue?{operation_id:ue}:{},expected_revision:Xe()});if(gt(Je),Je&&Je.conflict&&(Je=await n("worker-discard",{bead_id:x,...y?{attempt_id:y}:{},...ue?{operation_id:ue}:{},expected_revision:Xe()}),gt(Je)),Je&&Je.discarded===!0){ve(zi(Je),"success",5e3);return}if(Je&&Je.reason){ve(`\uD3D0\uAE30 \uC2E4\uD328: ${Je.reason}`,"error",2800);return}if(Je&&Je.accepted&&Je.pending==="merged_revert"){ve("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(Je&&Je.accepted&&!Je.discarded){ve(`\uD3D0\uAE30 \uC9C4\uD589: ${Je.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}Je&&!Je.conflict&&ve("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function nt(x,y,C){if(!n||!x||!y||typeof globalThis.confirm=="function"&&!globalThis.confirm(ks(x,C)))return;let ue=await n("worker-discard-abandon",{bead_id:x,operation_id:y,expected_revision:Xe()});if(gt(ue),ue&&ue.conflict&&(ue=await n("worker-discard-abandon",{bead_id:x,operation_id:y,expected_revision:Xe()}),gt(ue)),ue&&ue.abandoned===!0){ve(Hi(C),"success",5e3);return}if(ue&&ue.reason){ve(`\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: ${ue.reason}`,"error",2800);return}ue&&!ue.conflict&&ve("\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: unknown","error",2800)}async function pt(x,y,C){if(!(!n||!y||!C||Oe.has(y))){Oe.add(y),$();try{let ue=await n(x,{bead_id:y,action_id:C,expected_revision:Xe()});gt(ue),ue?.conflict?ve("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!ue?.ok&&ue?.reason&&ve(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(ue.reason)}`,"error",2800)}finally{Oe.delete(y),$()}}}async function yt(x,y){if(!n||!y||_e.has(y))return;_e.add(y),$();let C;try{let ue=async(Te={})=>await n(x,{bead_id:y,expected_revision:Xe(),...Te});C=await ue(),gt(C),C&&C.conflict&&(C=await n(x,{bead_id:y,expected_revision:Xe()}),gt(C)),x==="worker-revise-fix"&&(C=await Cr(C,(Te,je)=>ue({continuation:Te,decision_token:je}),{onResult:gt,refresh:()=>ue()}))}finally{_e.delete(y),$()}if(!(!C||C.conflict)){if(C.ok){ve(x==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}ve(`\uCC98\uBD84 \uAC70\uBD80: ${C.reason||""}`,"error",3e3)}}async function et(x){if(!n)return;let y=await n("worker-automation-toggle",{on:x,expected_revision:Xe()});gt(y),y&&y.conflict&&await n("worker-automation-toggle",{on:x,expected_revision:Xe()}).then(gt)}async function Ne(x){if(!n||!x)return;let y=await n("worker-repo-operation-dismiss",{operation_id:x});gt(y),y&&y.ok===!1&&ve(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${y.reason||""}`,"error",3e3)}async function S(x){if(!n||!Number.isFinite(x))return;let y=Math.max(Ka,Math.floor(x)),C=await n("worker-queue-set-slots",{slots:y,expected_revision:Xe()});gt(C),C&&C.conflict&&await n("worker-queue-set-slots",{slots:y,expected_revision:Xe()}).then(gt)}async function U(x){if(!n||!Number.isInteger(x)||x<1||x>jm)return;let y=Ie(),C=(Array.isArray(y.serial_lanes)?y.serial_lanes:[]).slice(x).reduce((je,Je)=>je+(Array.isArray(Je?.entries)?Je.entries.length:0),0),ue=()=>({count:x,expected_revision:Xe()}),Te=await n("worker-queue-set-serial-lane-count",ue());gt(Te),Te&&Te.conflict&&(Te=await n("worker-queue-set-serial-lane-count",ue()),gt(Te)),Te&&Te.applied&&C>0&&ve(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${C}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}function K(){let x=zr(z),y=Se.read({candidate_sort:q,done_since:x});return Ae=y.workspaces,Y=Tr(y.workspaces,y.workspaces_state,{done_since:x,candidate_filter:k,candidate_hidden_counts:"per_control",candidate_sort:"as_given",groups:"all",search:W}),Y}function we(x){return x.queue_groups[0]||w$}function Ee(x){let y=x.dependency_chips||null,C={...y&&y.released?{released:y.released}:{},...y&&y.dependents?{dependents:y.dependents}:{}},ue=P.get(x.id),Te=O.get(x.id)||null,je=ue&&ue.overlaps.length>0?ue.overlaps:null,Je=!!ue&&ue.scope_missing;return!Te&&!je&&!Je&&Object.keys(C).length===0?null:{...C,...Te?{predecessors:Te}:{},...je?{overlaps:je}:{},...Je?{scope_missing:!0}:{}}}function ft(x){return{...x,workspace_name:"",done_layout:void 0,dependency_chips:Ee(x)||void 0,chip_popover:vt(x)}}function vt(x){return Xi(x,y=>H.isOpen({bead_id:x.id,chip_key:y}))}function xt(){let x=Ie(),y=new Map;for(let C of Object.values(gn(x.lane_states))){let ue=Array.isArray(C?.corrections)?C.corrections:[];for(let Te of ue)Te&&typeof Te.bead_id=="string"&&typeof Te.after=="string"&&y.set(Te.bead_id,Te.after)}return{admission:gn(x.admission),correction_after:y}}function Ct(x,y){let C=ft(x),ue=up(y.admission[x.id]||null,!!x.discard||Oe.has(x.id)),Te=y.correction_after.get(x.id);return{...C,draggable:C.draggable===!0&&!ue,stale_work:ue,reason:ue?"":C.reason,badges:Te?[`\u{1F517} ${Te} \uB4A4 (blocks \uC790\uB3D9)`,...C.badges||[]]:C.badges,revise_enabled:C.revise_enabled===!0&&!_e.has(x.id)}}function qt(x){let y=xt();return we(x).sublanes.parallel.map(C=>Ct(C,y))}function Kt(x){let y=xt();return we(x).sublanes.serial.map(C=>{let ue=C.occupants.map(Te=>({id:Te.id,title:Te.title,draggable:!1,lane:C.id,ghost:!0,badges:[Te.badge],...typeof Te.search_match=="boolean"?{search_match:Te.search_match}:{}}));return{id:C.id,index:C.index+1,raw_length:C.raw_length,ghosts:ue,items:C.items.map(Te=>Ct(Te,y)),occupied:C.occupied_by.length>0,badge:C.occupants.length>0?C.occupants[0].badge:"\uB300\uAE30",cycle:C.cycle===!0}})}function en(x){return x.runnable.map(y=>ft(y))}function kt(x){return x.done.map(y=>ft(y))}function an(x){let y=x.running.filter(C=>C.non_occupying!==!0).map(C=>({...C,bead_id:C.id,attempt_id:C.attempt_id||"",paused:C.run_state==="paused",failed:C.run_state==="failed",parked:C.run_state==="parked",retry_wait:C.run_state==="retry_wait",waiting:C.run_state==="waiting",wait:C.wait||null,provider_hold:C.run_state==="provider_hold",hold:C.hold?{...C.hold,open:D===C.attempt_id}:null,status_label:C.run_state==="failed"?C.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328":C.run_state==="parked"?"\uC138\uC158 \uB300\uAE30":C.run_state==="retry_wait"?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":C.run_state==="waiting"?"\uC120\uD589 \uB300\uAE30":C.run_state==="provider_hold"?"\uACF5\uAE09\uC790 \uBCF4\uB958":void 0,can_pause:C.can_pause!==!1,workspace_name:"",dependency_chips:Ee(C)||void 0,chip_popover:vt(C),rollup_expanded:Q.has(C.id),failure:C.failure?{...C.failure,open:T===C.attempt_id}:null,...Go(C.id,{discard:C.discard,parked:C.run_state==="parked"},se.has(C.id))}));return[...y.filter(C=>C.failed===!0),...y.filter(C=>C.failed!==!0&&C.parked===!0),...y.filter(C=>C.failed!==!0&&C.parked!==!0)]}function un(x){return Lt(x).map(y=>({...y,chip_popover:vt(y)}))}function Lt(x){if(ce&&ce.model===x)return ce.rows;let y=Ie(),C=we(x),ue=gn(y.attempts),Te=Object.values(ue).filter(ur),je=new Map;for(let Ve of Te)je.set(Ve.attempt_id,Ve);let Je=new Map;for(let Ve of Te)Je.set(Ve.bead_id,Ve);let Ot=new Map;for(let Ve of[...x.pr_wait,...x.running,...x.queue,...x.runnable,...x.done])Ot.has(Ve.id)||Ot.set(Ve.id,Ve);let tn=Ve=>{let Ut=null;for(let Rn of Te)!Rn||Rn.bead_id!==Ve||Gl(Rn,je)||(Ut===null||(typeof Rn.started_at=="number"?Rn.started_at:0)>=(typeof Ut.started_at=="number"?Ut.started_at:0))&&(Ut=Rn);return Ut&&typeof Ut.target_base=="string"?Ut.target_base:null},_t=new Map;for(let Ve of x.running)Ve.run_state==="failed"||Ve.conflict_resolution!==!0||(Ve.run_state!=="paused"?_t.set(Ve.id,"running"):_t.has(Ve.id)||_t.set(Ve.id,"paused"));let _n=gn(y.auto_merge_skips),Sn=new Set(C.merge.auto_excluded),qr=gn(y.pr_observations),Vn=gn(y.pr_activity),nr=gn(y.cleanup_failed),rr=gn(y.discard_operations),or=gn(y.bead_workflow),pn=gn(y.bead_titles),sr=y.merge_queue_state||{active:null,failures:{}},br=C.merge.state.waiting,yr=new Map;for(let Ve of Array.isArray(y.merge_queue)?y.merge_queue:[])Ve&&typeof Ve=="object"&&Ve.bead_id&&yr.set(Ve.bead_id,Ve);let jr=(Array.isArray(y.pr_wait)?y.pr_wait:[]).map(Ve=>{let Ut=Ot.get(Ve.bead_id);return{...U$(Ve.bead_id,Ut?.title||pn[Ve.bead_id]||Ve.bead_id,qr,nr[Ve.bead_id]||null,cr(ue,Ve.bead_id,C.runner_catalog||null),Vn[Ve.bead_id]||(Pe.has(Ve.bead_id)?{activity:null,merge_progress:null,queueing:"merge"}:G.has(Ve.bead_id)?{activity:null,merge_progress:null,queueing:"cleanup"}:null),_t.get(Ve.bead_id)||null,Ve.external===!0,{position:C.merge.positions.get(Ve.bead_id)||0,active:sr.active===Ve.bead_id,failure:gn(sr.failures)[Ve.bead_id]||null,waiting:br&&br.bead_id===Ve.bead_id?br.reason:null,resolution:C.merge.resolutions.get(Ve.bead_id),continuation_action:C.merge.continuations.get(Ve.bead_id),authority:C.merge.authorities.get(Ve.bead_id)||null,hold:yr.get(Ve.bead_id)?.hold||null,review_dispatch:yr.get(Ve.bead_id)?.review_dispatch||null},Ve.wt_present!==!1,y.auto_merge===!0&&Sn.has(Ve.bead_id)?_n[Ve.bead_id]?.reason||"":null,Kl(C.declared_base,tn(Ve.bead_id)),gn(y.completion_status)[Ve.bead_id]||null,rr,y.auto_merge===!0,{merge_sha:Ve.merge_sha,cleanup_cursor:Ve.cleanup_cursor,repo_operations:C.repo_operations},Ut?Ee(Ut):null,sp(ue,Ve.bead_id),se.has(Ve.bead_id)),...Ut?.search_match===void 0?{}:{search_match:Ut.search_match},workflow:or[Ve.bead_id]||null,priority:Ut?.priority,from_id:Ut?.from_id,...Ut?.created_at===void 0?{}:{created_at:Ut.created_at},...Ut?.updated_at===void 0?{}:{updated_at:Ut.updated_at}}});return ce={model:x,rows:jr},jr}function jt(x){let y=we(x),C=[];for(let je of x.running)je.non_occupying!==!0&&C.push({id:je.id,title:je.title,location_label:"\uC2E4\uD589\uC911",kind:"running",lane_id:je.serial_lane_id??null});for(let je of x.pr_wait)C.push({id:je.id,title:je.title,location_label:"PR \uB300\uAE30",kind:"pr_wait",lane_id:null});for(let je of y.sublanes.serial)je.items.forEach((Je,Ot)=>{C.push({id:Je.id,title:Je.title,location_label:`${je.id} #${Ot+1}`,kind:"serial",lane_id:je.id})});y.sublanes.parallel.forEach((je,Je)=>{C.push({id:je.id,title:je.title,location_label:`#${Je+1}`,kind:"parallel",lane_id:null})});for(let je of x.runnable)C.push({id:je.id,title:je.title,location_label:"\uD6C4\uBCF4",kind:"candidate",lane_id:null,queue_placeable:je.queue_placeable===!0});let ue=Ie();P=$m(ue.bead_scope,C);let Te=new Map;for(let je of[...x.running,...x.runnable])Array.isArray(je.blocked_by)&&je.blocked_by.length>0&&Te.set(je.id,je.blocked_by);for(let[je,Je]of Object.entries(gn(ue.bead_blocked_by)))Array.isArray(Je)&&Te.set(je,Je.filter(Ot=>typeof Ot=="string"&&Ot.length>0));O=xp(Te,C,gn(ue.blocker_workspaces))}function Vt(x){let y=x.hold&&typeof x.hold=="object"?x.hold:null;if(!y||y.kind!=="env"&&y.kind!=="systemic")return"";let C=Ir(y.cause)||String(y.cause||""),ue=Array.isArray(x.lineages)?x.lineages:[];if(y.kind==="env"){let je=ue.map(Ot=>Ot&&Ot.next_at).filter(Ot=>typeof Ot=="number").sort((Ot,tn)=>Ot-tn)[0],Je=typeof je=="number"?` \xB7 \uB2E4\uC74C ${new Date(je).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}`:"";return c`<div class="worker-hold worker-hold--env" role="status">
        <span class="worker-hold__text"
          >환경 보류: ${C} — 재시도 대기${Je}</span
        >
        <button
          type="button"
          class="worker-hold__retry"
          title="예약된 재시도를 지금 실행합니다"
        >
          지금 재시도
        </button>
      </div>`}let Te=(Array.isArray(y.bead_ids)?y.bead_ids:[]).filter(je=>typeof je=="string"&&je.length>0);return c`<div class="worker-hold worker-hold--systemic" role="alert">
      <span class="worker-hold__text"
        >${C}${Te.length>0?` \u2014 bead ${Te.join(", ")}`:""}</span
      >
      <button
        type="button"
        class="worker-hold__resume"
        title="정지를 풀고 멈춰 있던 bead를 다시 디스패치합니다"
      >
        재개
      </button>
    </div>`}function Be(x){let y=[];for(let[_t,_n]of Object.entries(gn(x.provider_hold)))for(let Sn of Array.isArray(_n?.targets)?_n.targets:[])y.push({runner:_t,target:Sn});if(y.length===0)return"";let C=y.find(_t=>_t.target?.kind==="outage");if(C){let _t=typeof C.target.next_probe_at=="number"?new Date(C.target.next_probe_at).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"}):"";return c`<div class="worker-provider-gate" role="status">
        ⚠️ ${C.runner} 공급자 장애 — 신규 디스패치
        보류${_t?`, \uB2E4\uC74C \uD504\uB85C\uBE0C ${_t}`:""}
      </div>`}let ue=Array.isArray(gn(x.account_catalog).claude)?gn(x.account_catalog).claude:[],Te=_t=>ue.find(Sn=>Sn?.email===_t)?.alias||_t,je=y.find(_t=>typeof _t.target?.account!="string"),Je=_t=>typeof _t?.resets_at=="number"?new Date(_t.resets_at).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"}):"";if(je){let _t=Je(je.target);return c`<div class="worker-provider-gate" role="status">
        ⏳ ${je.runner} 사용 한도 — 계정 미확인이라 러너 전체 디스패치
        보류${_t?`, \uB9AC\uC14B ${_t}`:""}
      </div>`}let Ot=[...new Set(y.map(_t=>Te(String(_t.target.account))))],tn=Je(y[0].target);return c`<div class="worker-provider-gate" role="status">
      ⏳ ${Ot.join(", ")} 사용 한도 —
      ${Ot.length>1?"\uADF8 \uACC4\uC815\uB4E4":"\uADF8 \uACC4\uC815"} 디스패치
      보류${tn?`, \uB9AC\uC14B ${tn}`:""}
    </div>`}function E(x){let y=Ie(),C=we(x),ue=C.sublanes.parallel,Te=ue.length>0?ue[0].id:"\u2014",je=c`<button
      type="button"
      class="worker-play${y.auto_advance?" is-active":""}"
    >
      ${y.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,Je=Et(x),Ot=C.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",tn=y.auto_advance?0:(Array.isArray(y.queue)?y.queue:[]).filter(pn=>pn&&typeof pn.armed_by_lane=="string"&&pn.armed_by_lane.length>0).length,_t=tn>0?c`<span
            class="worker-kpi__chip worker-kpi__chip--armed"
            title="모니터 연결 레인이 발차한 대기 행입니다 — 이 레포의 자동 진행은 꺼진 채입니다"
            >⏸ 자동 진행 꺼짐 · 연결 레인 ${tn}건 진행 중</span
          >`:"",_n=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${C.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${un(x).length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${B()} 완료 <b>${x.done.length}</b></span
      >`,Sn=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${C.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${C.declared_base||"?"}</span
    >`,qr=c`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${Ka}
          step="1"
          .value=${String(C.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:jm},(pn,sr)=>sr+1).map(pn=>c`<option
                value=${String(pn)}
                ?selected=${C.serial_lane_count===pn}
              >
                ${pn}
              </option>`)}
        </select>
      </label> `,Vn=c`<input
      type="search"
      class="worker-search"
      placeholder="ID·제목 검색"
      aria-label="이슈 검색 (ID·제목)"
      .value=${W}
    />`,nr=ap(C.repo_operations,C.cleanup_failures),rr=Vt(y),or=Be(y);return V?c`<div class="worker-ribbon">
          ${je} ${Je}
          <div class="worker-kpi worker-kpi--ribbon">
            ${Ot}${_t}${_n}
          </div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${qr}${Vn}</div>
          <div class="worker-kpi">${Sn}</div>
        </div>
        ${or}${rr}${nr}${Z.template()}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">
          ${je}${Je}${qr}${Vn}
        </div>
        <div class="worker-kpi">
          ${Ot}${_t}${_n}${Sn}
          ${(Array.isArray(C.token_total)?C.token_total:C.token_total?[{label:C.token_total,tooltip:`${B()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(pn=>c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${pn.tooltip}
                >${B()} 완료 · 누적 ${pn.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${Te}</b></span
          >
        </div>
      </div>
      ${or}${rr}${nr}${Z.template()}`}function he(x){let y=x.runnable_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${k.show_blocked}
        />
        🔒 blocked${y.blocked>0?` ${y.blocked}`:""}
      </label>
      <div
        class="worker-filter__readiness"
        role="group"
        aria-label="준비도 필터"
      >
        ${Ss.map(C=>c`<button
              type="button"
              class="worker-filter__chip${k.readiness===C.value?" is-active":""}"
              data-readiness=${C.value}
              aria-pressed=${k.readiness===C.value?"true":"false"}
            >
              ${C.label}
            </button>`)}
        ${y.readiness>0?c`<span class="worker-filter__hidden"
              >숨김 ${y.readiness}</span
            >`:""}
      </div>
      <div class="worker-filter__routes" role="group" aria-label="route 필터">
        ${ro.map(C=>c`<button
              type="button"
              class="worker-filter__chip worker-filter__route${k.routes.includes(C.value)?" is-active":""}"
              data-route=${C.value}
              aria-pressed=${k.routes.includes(C.value)?"true":"false"}
            >
              ${C.label}
            </button>`)}
        ${y.route>0?c`<span class="worker-filter__hidden"
              >숨김 ${y.route}</span
            >`:""}
      </div>
    </div>`}function De(){let x=F?"custom":Wc(q)||"custom";return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${x}
    >
      ${Ys.map(y=>c`<option value=${y.id} ?selected=${x===y.id}>
            ${y.label}
          </option>`)}
      <option value="custom" ?selected=${x==="custom"}>
        사용자 지정…
      </option>
    </select>`}function ht(){let x=Qs(q);return c`<div
      class="worker-sort-chain"
      role="group"
      aria-label="후보 정렬 체인"
    >
      ${[0,1,2].map(y=>{let C=x[y];return c`<span class="worker-sort-chain__step">
          <select
            class="worker-sort-chain__key"
            data-step=${y}
            aria-label=${`${y+1}\uCC28 \uC815\uB82C \uD0A4`}
            .value=${C?C.key:""}
          >
            ${y===0?"":c`<option value="" ?selected=${!C}>없음</option>`}
            ${bm.map(ue=>c`<option
                  value=${ue.key}
                  ?selected=${!!C&&C.key===ue.key}
                >
                  ${ue.label}
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
    </div>`}function Ke(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${z}
      >
        ${fo.map(x=>c`<option value=${x.value} ?selected=${z===x.value}>
              ${x.label}
            </option>`)}
      </select>
    </div>`}function Et(x){let y=we(x).merge,C=Ie().auto_merge===!0;if(y.running)return c`<button
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
      </button>`;let ue=new Set(y.auto_excluded),Te=un(x).filter(je=>je.merge_action&&je.merge_enabled&&!ue.has(je.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${Te>0?` ${Te}`:""}
    </button>`}function Pt(x,y){return c`<div
      data-bead-id=${x.id}
      data-drag-kind=${y.kind}
      data-root-dir=${y.root_dir}
      data-lane-id=${bn(y.lane_id)}
      data-row-index=${y.row_index}
      data-queue-index=${String(x.queue_index??0)}
    >
      ${Un({...x,...Go(x.id,{discard:x.discard,parked:!1},se.has(x.id))},{actions:Mo(x)})}
    </div>`}function Ht(x){let y=qt(x),C=$t();return Zi({parallel:{rows:y.map((ue,Te)=>Pt(ue,{kind:"parallel",root_dir:C,row_index:Te})),count:y.length,collapsed:N.isAreaCollapsed("parallel"),drop:{drop:"parallel",root_dir:C}},serial:{lanes:Kt(x).map(ue=>({id:ue.id,title:`\uC9C1\uB82C ${ue.index}`,rows:[...ue.ghosts.map(Te=>Un({...Te,...Go(Te.id,{discard:Te.discard,parked:!1},se.has(Te.id))},{actions:Mo(Te)})),...ue.items.map((Te,je)=>Pt(Te,{kind:"repo-serial",root_dir:C,row_index:je,lane_id:ue.id}))],count:ue.ghosts.length+ue.items.length,match_count:fe([...ue.ghosts,...ue.items]),empty:ue.ghosts.length+ue.items.length===0,badge:ue.badge,held:ue.occupied,cycle:ue.cycle,drop:{drop:"repo-serial",root_dir:C,lane_id:ue.id,lane_length:String(ue.raw_length)}})),collapsed:N.isAreaCollapsed("serial")}})}function Tt(x){return L_(an(x),Date.now(),Le)}function ln(x){return x.running.some(y=>y.kind!=="session"&&y.run_state==="running")}function Mt(x){let y=we(x),C=en(x),ue=qt(x),Te=kt(x),je=un(x),Je=an(x),Ot=er({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4",items:C,match_count:fe(C),src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:De(),header_row:F?ht():void 0,controls:he(x),collapsible:!0,collapsed:N.isCollapsed("candidate"),place_menu:ct(C),onOpenDoc:u?(_t,_n)=>u(_n):void 0}),tn=er({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:Te,match_count:fe(Te),empty:`${B()} \uC644\uB8CC \uC5C6\uC74C`,header_control:Ke(),collapsible:!0,collapsed:N.isCollapsed("done"),preview:V?Array.isArray(y.token_total)?y.token_total.map(_t=>_t.label).join(" \xB7 "):y.token_total||Fm(Te):void 0});return V?c`<div class="worker-lanes worker-lanes--mobile">
          ${Ji({live:ln(x),running_body:Je.length>0?Tt(x):"",pr_wait_rows:je.map(_t=>Un(_t)),count:Je.length+je.length})}
          ${er({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:ue,count:ue.length,match_count:fe(ue),collapsible:!0,collapsed:N.isCollapsed("queue"),preview:Fm(ue),body:Ht(x)})}
          ${Ot} ${tn}
        </div>
        ${Ko(ne,Ie())}`:c`<div class="worker-lanes">
        ${Ot}
        ${er({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:ue,count:ue.length,match_count:fe(ue),collapsible:!0,collapsed:N.isCollapsed("queue"),body:Ht(x)})}
        ${er({id:"worker-pane-running",lane:"running",title:"\uC2E4\uD589 \uC911",items:Je,match_count:fe(Je),header_control:c`<span class="worker-pane__meta"
            >슬롯 ${y.slots}</span
          >`,live:ln(x),collapsible:!0,collapsed:N.isCollapsed("running"),body:Tt(x)})}
        ${er({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:je,match_count:fe(je),empty:"PR \uB300\uAE30 \uC5C6\uC74C",collapsible:!0,collapsed:N.isCollapsed("pr_wait")})}
        ${tn}
      </div>
      ${Ko(ne,Ie())}`}function yn(x){N.toggle(x),$()}function v(x){N.toggleArea(x),$()}function p(x){let y=Date.now();if(!x.queue.some(ue=>Qi(ue.added_at,y)>0)){h();return}m===null&&(m=window.setInterval(()=>{try{$()}catch{}},$$))}function h(){m!==null&&(window.clearInterval(m),m=null)}function $(){let x=K();p(x),jt(x),lt(E(x),L),lt(Mt(x),le),ja(le)}function X(){let x=!0,y=Ia(C=>{if(V=C,x){x=!1;return}$()});J.push(y)}function g(x){k=x,A$(x),$()}function b(x){if(x==="custom"){F=!0,$();return}q=co(x),Hc(q),F=!1,$()}function te(x){q=co({chain:x}),Hc(q),$()}function ye(x){z=Yn(x),E$(z),f?.(z),$()}function xe(x){let y=x.target;if(ne){let _t=Na(ne,y,Ie());if(_t){_t!==ne&&(ne=_t,$());return}}let C=y?.closest?.(".worker-serial-lane-count");if(C){let _t=Number.parseInt(C.value,10);Number.isFinite(_t)&&U(_t).then($);return}let ue=x.target?.closest?.(".worker-filter__blocked");if(ue){g({...k,show_blocked:ue.checked});return}let Te=x.target?.closest?.(".worker-sort-chain__key");if(Te){let _t=Number.parseInt(Te.getAttribute("data-step")||"",10);Number.isFinite(_t)&&te(vm(Qs(q),_t,Te.value));return}let je=x.target?.closest?.(".worker-done-range");if(je){ye(je.value);return}let Je=x.target?.closest?.(".worker-sort");if(Je){b(Je.value);return}let Ot=x.target?.closest?.(".worker-slots__input");if(!Ot)return;let tn=Number.parseInt(Ot.value,10);if(!Number.isFinite(tn)){$();return}S(tn).then($)}function We(x){return x?{runner:x.runner||void 0,model:x.model||void 0,effort:x.effort||void 0,worktree:x.worktree||void 0,status:x.status||void 0,session_id:x.session_id||void 0}:{}}function ot(){let x=we(K()),y=Ie().workspace_info,C=y&&typeof y=="object"&&y.repo_ops&&typeof y.repo_ops=="object"?y.repo_ops:null;return{operations:x.repo_operations,cleanup_failures:x.cleanup_failures,repo:l&&l()||"",repo_ops:C}}function Yt(){Le&&qe.close(),ae.hidden=!1,ee.hidden=!1,Ze.open(ot()),$()}function fn(x){let y=Ie(),C=y.attempts?y.attempts[x]:null;Le=x,Ze.close(),ae.hidden=!0,ee.hidden=!1,qe.open({attempt_id:x,meta:We(C)}),$()}function Qt(x){let y=Ie(),C=(Array.isArray(y.session_active)?y.session_active:[]).find(Te=>Te&&Te.bead_id===x),ue=(C&&Array.isArray(C.session_refs)?C.session_refs:[]).find(Te=>Te&&Te.current===!0);ue&&(Ze.close(),ae.hidden=!0,ee.hidden=!1,qe.open(Fo(ue,x,"in_progress")),$())}function dn(){if(Ze.isOpen()&&Ze.refresh(ot()),!Le)return;let x=Ie(),y=x.attempts?x.attempts[Le]:null;if(y){qe.updateMeta(We(y));return}qe.close()}function In(x,y){if(x.length===0||!s)return;let C=l?l():void 0;if(y.length===0||!C||y===C||!a){s(x);return}Promise.resolve(a(y)).then(()=>{s(x)}).catch(()=>{ve("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})}function Jt(x){let y=x.target;if(y?.closest?.(".provider-resume-dialog__cancel")){st();return}if(y?.closest?.(".provider-resume-dialog__confirm")){Qe();return}if(y?.closest?.(".provider-resume-dialog")||y?.closest?.(".worker-mini__grip"))return;let C=y?.closest?.(".worker-sort-chain__dir");if(C){let pe=Number.parseInt(C.getAttribute("data-step")||"",10);Number.isFinite(pe)&&te(km(Qs(q),pe));return}let ue=y?.closest?.(".worker-dep__open");if(ue){In(ue.getAttribute("data-dep-id")||"",ue.getAttribute("data-root-dir")||"");return}let Te=y?.closest?.(".judgement-chip");if(Te){let pe=Te.closest("[data-bead-id]"),at=pe&&pe.getAttribute("data-bead-id")||"",Gt=Te.getAttribute("data-chip-key")||"";at&&Gt&&H.toggle({bead_id:at,chip_key:Gt});return}if(y?.closest?.(".chip-popover"))return;if(y?.closest?.(".worker-repo-strip")){Yt();return}let je=y?.closest?.(".worker-repo-op__dismiss");if(je){Ne(je.dataset.operationId||"");return}let Je=y?.closest?.(".worker-cleanup__resume");if(Je){let pe=Je.dataset.beadId;pe&&Ce(pe);return}let Ot=y?.closest?.(".worker-cleanup__resolve");if(Ot){let pe=Ot.dataset.beadId;pe&&Fe(pe);return}if(y?.closest?.(".worker-hold__retry")){Ue("worker-queue-hold-retry-now","\uC9C0\uAE08 \uC7AC\uC2DC\uB3C4 \uAC70\uBD80");return}if(y?.closest?.(".worker-hold__resume")){Ue("worker-queue-hold-resume","\uC7AC\uAC1C \uAC70\uBD80");return}if(y?.closest?.(".worker-play")){et(!Ie().auto_advance);return}let tn=y?.closest?.(".worker-merge-all");if(tn){tn.classList.contains("worker-merge-all--stop")?Ie().auto_merge===!0?de(!1):He():de(!0);return}let _t=y?.closest?.(".worker-pane__toggle[data-lane]");if(_t){let pe=_t.dataset.lane;(pe==="candidate"||pe==="queue"||pe==="running"||pe==="pr_wait"||pe==="done")&&yn(pe);return}let _n=y?.closest?.(".worker-wait__area-toggle[data-area]");if(_n){let pe=_n.dataset.area;(pe==="parallel"||pe==="serial")&&v(pe);return}let Sn=y?.closest?.(".worker-card__place-lane");if(Sn){let pe=Sn.dataset.beadId,at=Sn.dataset.lane;pe&&(at==="parallel"||/^s[1-5]$/.test(at||""))&&(R=null,$(),mt(pe,at));return}if(y?.closest?.(".worker-card__place-cancel")){R=null,$();return}let Vn=y?.closest?.(".worker-card__place");if(Vn){let pe=Vn.dataset.beadId;pe&&!Vn.disabled&&(bs(Ie())?(R=pe,$()):mt(pe,"parallel"));return}let nr=y?.closest?.(".worker-filter__route");if(nr){let pe=nr.dataset.route||"";pe&&g({...k,routes:sa(k.routes,pe)});return}let rr=y?.closest?.(".worker-filter__chip");if(rr){let pe=rr.dataset.readiness;(pe==="all"||pe==="ready"||pe==="not_ready")&&g({...k,readiness:pe});return}let or=y?.closest?.('[data-action="queue-start-now"]');if(or){dt(or.dataset.beadId||"");return}let pn=y?.closest?.('[data-action="queue-remove"]');if(pn){let pe=pn.dataset.beadId||"";pe&&ge.sendOp({type:"worker-queue-remove",payload:{bead_id:pe},root_dir:$t()},pe);return}let sr=y?.closest?.(".worker-mini__merge");if(sr){let pe=sr.dataset.beadId||"";Ie().cleanup_failed?.[pe]?Ce(pe):Me(pe);return}let br=y?.closest?.(".worker-mini__merge-cancel");if(br){ke(br.dataset.beadId||"");return}let yr=y?.closest?.(".worker-mini__resolve");if(yr){Fe(yr.dataset.beadId||"");return}let jr=y?.closest?.(".rtile__resolve");if(jr){let pe=jr.closest(".rtile");Fe(pe?.dataset.beadId||"");return}let Ve=y?.closest?.(".worker-mini__discard"),Ut=y?.closest?.(".worker-mini__discard-abandon");if(Ut){nt(Ut.dataset.beadId||"",Ut.dataset.operationId||"",{kind:Ut.dataset.operationKind||"",last_error:Ut.dataset.lastError||""});return}if(Ve){it(Ve.dataset.beadId||"",Ve.dataset.attemptId||null,Ve.dataset.discardMode==="merged"?"merged":"unmerged",Ve.dataset.operationId||null);return}let Rn=y?.closest?.(".worker-mini__stale-continue");if(Rn){pt("worker-stale-work-continue",Rn.dataset.beadId||"",Rn.dataset.actionId||"");return}let Vo=y?.closest?.(".worker-mini__stale-backup");if(Vo){pt("worker-stale-work-backup-fresh",Vo.dataset.beadId||"",Vo.dataset.actionId||"");return}let Yo=y?.closest?.(".worker-mini__stale-recheck");if(Yo){pt("worker-stale-work-recheck",Yo.dataset.beadId||"",Yo.dataset.actionId||"");return}let Xs=y?.closest?.(".worker-mini__revise-fix");if(Xs){yt("worker-revise-fix",Xs.dataset.beadId||"");return}let Zs=y?.closest?.(".worker-mini__revise-approve");if(Zs){yt("worker-revise-approve",Zs.dataset.beadId||"");return}if(y?.closest?.(".worker-mini__pr"))return;let rt=y?.closest?.(".rtile__failure-badge");if(rt){let pe=rt.dataset.attemptId||"";T=T===pe?null:pe,$();return}let w=y?.closest?.(".rtile__provider-hold-badge");if(w){let pe=w.dataset.attemptId||"";D=D===pe?null:pe,$();return}let M=y?.closest?.(".rtile__attempt-copy");if(M){let pe=M.dataset.attemptId||"";pe&&kn(pe).then(at=>{ve(at?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",at?"success":"error",1400)});return}let j=y?.closest?.(".rtile__discard-abandon");if(j){let at=y?.closest?.(".rtile")?.dataset?.beadId;at&&nt(at,j.dataset.operationId||"",{kind:j.dataset.operationKind||"",last_error:j.dataset.lastError||""});return}let $e=y?.closest?.(".rtile__discard");if($e){let pe=y?.closest?.(".rtile"),at=pe?.dataset?.beadId,Gt=pe?.dataset?.attemptId;at&&it(at,Gt||null,$e.dataset.confirmation==="merged"?"merged":"unmerged",$e.dataset.operationId||null);return}if(y?.closest?.(".rtile__pause")){let at=y?.closest?.(".rtile")?.dataset?.attemptId;at&&Zt(at);return}if(y?.closest?.(".rtile__resume-alternate")){let at=y?.closest?.(".rtile")?.dataset?.attemptId;at&&tt(at);return}if(y?.closest?.(".rtile__resume")){let pe=y?.closest?.(".rtile__resume"),Gt=y?.closest?.(".rtile")?.dataset?.attemptId;Gt&&A(Gt,pe?.dataset?.resumeKind==="settlement"?"settlement":"session");return}if(y?.closest?.(".rtile__session")){let pe=y?.closest?.(".rtile"),at=pe?.dataset?.attemptId;if(at){fn(at);return}let Gt=pe?.dataset?.beadId;Gt&&Qt(Gt);return}if(y?.closest?.(".rtile__failure-pop"))return;if(y?.closest?.(".worker-drawer-overlay__backdrop")){Ze.close(),qe.close();return}if(y?.closest?.(".worker-drawer-host"))return;let Ge=y?.closest?.(".rtile .board-card__roll-toggle");if(Ge){let pe=Ge.dataset.rollParent;pe&&(Q.has(pe)?Q.delete(pe):Q.add(pe),$());return}let ut=y?.closest?.(".rtile .board-card__roll-child");if(ut){let pe=ut.dataset.childId;pe&&s&&s(pe);return}let Nt=y?.closest?.(".rtile");if(Nt){if(y?.closest?.(".rtile__id")){let at=Nt.dataset.beadId;at&&kn(at).then(Gt=>{Gt?ve("\uBCF5\uC0AC\uB428","success",1200):ve("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let pe=Nt.dataset.beadId;pe&&s&&s(pe);return}let bt=y?.closest?.(".worker-mini, .worker-card");if(bt){let pe=bt.dataset.beadId;if(y?.closest?.('[data-seam="log-path-copy"]'))return;if(y?.closest?.(".worker-mini__id, .worker-card__id")){pe&&kn(pe).then(Gt=>{Gt?ve("\uBCF5\uC0AC\uB428","success",1200):ve("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let at=y?.closest?.(".ctl-chip--from");if(at){let Gt=at.dataset.fromId;Gt&&s&&s(Gt);return}pe&&s&&s(pe)}}function uo(x){let y=x.target;y?.closest?.(".worker-search")&&(W=y.value,$())}function Ln(x){let y=x.target;x.key!=="Escape"||!y?.closest?.(".worker-search")||W.length===0||(W="",$())}ge.attach(e),e.addEventListener("click",Jt),e.addEventListener("change",xe),e.addEventListener("input",uo),e.addEventListener("keydown",Ln);function Mr(x){let y=x.target,C=y&&typeof y.closest=="function"?Te=>y.closest(Te):()=>null,ue=!1;T&&!C(".rtile__failure-pop, .rtile__failure-badge")&&(T=null,ue=!0),D&&!C(".rtile__provider-hold-pop, .rtile__provider-hold-badge")&&(D=null,ue=!0),ue&&$()}function Nr(x){x.key==="Escape"&&(T===null&&D===null&&ne===null||(T=null,D=null,ne=null,$()))}return document.addEventListener("click",Mr),document.addEventListener("keydown",Nr),H.attach(),J.push(()=>{document.removeEventListener("click",Mr),document.removeEventListener("keydown",Nr),H.detach()}),X(),_&&J.push(_.subscribe(()=>{Se.notifyIssuesChanged(),$()})),o&&J.push(o.subscribe(()=>{let x=l&&l()||"";x!==ie&&(ie=x,ze.close()),$(),dn()})),$(),{load(){Se.ensureSessionDefaults(),$()},refreshSessionDefaults:be,destroy(){h();for(let x of J.splice(0))try{x()}catch{}ge.detach(),e.removeEventListener("click",Jt),e.removeEventListener("change",xe),Se.destroy();try{qe.destroy()}catch{}ee.hidden=!0;try{ze.destroy()}catch{}lt(c``,e)}}}function Yc(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function Hm(e,t,n,r=async()=>{},o=async()=>{}){let i=Bt("views:workspace-picker"),s=null,l=!1,a=!1,u=!1;async function d(q){let z=q.target.value,N=t.getState().workspace?.current?.path||"";if(z&&z!==N){i("switching workspace to %s",z),l=!0,O();try{await n(z)}catch(V){i("workspace switch failed: %o",V)}finally{l=!1,O()}}}async function f(){let q=t.getState(),F=q.workspace?.current?.path||q.workspace?.available?.[0]?.path||"";if(!(!F||a)){i("git-pulling workspace %s",F),a=!0,O();try{await r(F)}catch(z){i("workspace git pull failed: %o",z)}finally{a=!1,O()}}}function _(q){let F=q.target;F&&e.contains(F)||R()}function k(q){q.key==="Escape"&&R()}function m(){u||(u=!0,document.addEventListener("mousedown",_),document.addEventListener("keydown",k),O())}function R(){u&&(u=!1,document.removeEventListener("mousedown",_),document.removeEventListener("keydown",k),O())}function T(){u?R():m()}async function D(q){let F=q.target,z=F.value,B=F.checked;i("toggling visibility %s \u2192 %s",z,String(B));try{await o(z,B)}catch(N){i("workspace visibility toggle failed: %o",N)}}function ne(q){return q?c`
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
    `:c``}function H(q,F){return c`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${T}
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
                ${q.map(z=>c`
                    <label
                      class="workspace-picker__manage-row"
                      title="${z.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${z.path}"
                        .checked=${!F.has(z.path)}
                        @change=${D}
                      />
                      <span class="workspace-picker__manage-name"
                        >${Yc(z.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function P(){let q=t.getState(),F=q.workspace?.current,z=q.workspace?.available||[],B=new Set(q.workspace?.hidden||[]),N=F?.path||z[0]?.path||"";if(z.length===0)return c``;let V=z.filter(W=>!B.has(W.path)||W.path===N);if(V.length<=1){let W=V[0]||z[0],oe=Yc(W.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${W.path}"
            >${oe}</span
          >
          ${H(z,B)}
          ${ne(N)}
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
          ${V.map(W=>c`
              <option
                value="${W.path}"
                ?selected=${W.path===N}
                title="${W.path}"
              >
                ${Yc(W.path)}
              </option>
            `)}
        </select>
        ${H(z,B)}
        ${ne(N)}
        ${l||a?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function O(){lt(P(),e)}return O(),s=t.subscribe(()=>O()),{destroy(){s&&(s(),s=null),document.removeEventListener("mousedown",_),document.removeEventListener("keydown",k),lt(c``,e)}}}var zm=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","get-workspace-accounts","set-workspace-accounts","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-provider-auto-switch-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-dismiss","worker-repo-operation-deploy-run","worker-queue-set-slots","worker-queue-set-serial-lane-count","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-queue-arm","worker-queue-disarm","worker-queue-start-now","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-cleanup-retry","worker-resolve-in-session","worker-queue-hold-resume","worker-queue-hold-retry-now","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-discard-abandon","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-bead-timeline","get-worker-system-prompt","get-session-refs","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove","monitor-lane-provenance","get-compare","compare-snapshot","bench-run-create","bench-run-list","bench-runs-snapshot"];function Qc(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function Km(e,t,n=Qc()){return{id:n,type:e,payload:t}}function Gm(e={}){let t=Bt("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",o=null,i="closed",s=0,l=null,a=!0,u=new Map,d=[],f=new Map,_=new Set;function k(P){for(let O of Array.from(_))try{O(P)}catch{}}function m(){if(!a||l)return;i="reconnecting",t("ws reconnecting\u2026"),k(i);let P=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,s)),O=(n.jitterRatio||0)*P,q=Math.max(0,Math.round(P+(Math.random()*2-1)*O));t("ws retry in %d ms (attempt %d)",q,s+1),l=setTimeout(()=>{l=null,H()},q)}function R(P){try{o?.send(JSON.stringify(P))}catch(O){t("ws send failed",O)}}function T(){for(i="open",t("ws open"),k(i),s=0;d.length;){let P=d.shift();P&&R(P)}}function D(P){let O;try{O=JSON.parse(String(P.data))}catch{t("ws received non-JSON message");return}if(!O||typeof O.id!="string"||typeof O.type!="string"){t("ws received invalid envelope");return}if(u.has(O.id)){let F=u.get(O.id);u.delete(O.id),O.ok?F?.resolve(O.payload):F?.reject(O.error||new Error("ws error"));return}let q=f.get(O.type);if(q&&q.size>0)for(let F of Array.from(q))try{F(O.payload)}catch(z){t("ws event handler error",z)}else t("ws received unhandled message type: %s",O.type)}function ne(){i="closed",t("ws closed"),k(i);for(let[P,O]of u.entries())O.reject(new Error("ws disconnected")),u.delete(P);s+=1,m()}function H(){if(!a)return;let P=r();try{o=new WebSocket(P),t("ws connecting %s",P),i="connecting",k(i),o.addEventListener("open",T),o.addEventListener("message",D),o.addEventListener("error",()=>{}),o.addEventListener("close",ne)}catch(O){t("ws connect failed %o",O),m()}}return H(),{send(P,O){if(!zm.includes(P))return Promise.reject(new Error(`unknown message type: ${P}`));let q=Qc(),F=Km(P,O,q);return t("send %s id=%s",P,q),new Promise((z,B)=>{u.set(q,{resolve:z,reject:B,type:P}),o&&o.readyState===o.OPEN?R(F):(t("queue %s id=%s (state=%s)",P,q,i),d.push(F))})},on(P,O){f.has(P)||f.set(P,new Set);let q=f.get(P);return q?.add(O),()=>{q?.delete(O)}},onConnection(P){return _.add(P),()=>{_.delete(P)}},reconnect(){a=!0,l&&(clearTimeout(l),l=null),s=0,H()},close(){a=!1,l&&(clearTimeout(l),l=null);try{o?.close()}catch{}},getState(){return i}}}function W$(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function H$(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var Ga=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Vm=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],Pr="tab:worker:closed",z$="bdui.worker.done-range",Ym=Y_,Qm="worker:queue",Xm="ui:order",Zm="ui:display-policy",Jm="exec:presets",Dr="tab:board:closed",eg="beads-ui.board.closed-range";function K$(e){if(!e)return()=>{};function t(r){document.documentElement.style.setProperty("--app-header-h",`${Math.round(r)}px`)}if(t(e.getBoundingClientRect().height),typeof ResizeObserver!="function")return()=>{};let n=new ResizeObserver(r=>{for(let o of r)t(o.contentRect.height+G$(e))});return n.observe(e),()=>n.disconnect()}function G$(e){let t=getComputedStyle(e);return[t.paddingTop,t.paddingBottom,t.borderTopWidth,t.borderBottomWidth].reduce((r,o)=>r+(parseFloat(o)||0),0)}function V$(e){let t=Bt("main");t("bootstrap start"),K$(document.querySelector(".app-header"));let n=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="compare-root" class="route compare" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;lt(n,e);let r=document.getElementById("global-nav"),o=document.getElementById("top-nav"),i=document.getElementById("repo-scope"),s=document.getElementById("usage-meter"),l=document.getElementById("board-root"),a=document.getElementById("worker-root"),u=document.getElementById("monitor-root"),d=document.getElementById("compare-root"),f=document.getElementById("detail-panel");if(s&&fm(s),l&&a&&u&&d&&f){let Se=function(g,b){let te="Request failed",ye="";if(g&&typeof g=="object"){let We=g;if(typeof We.message=="string"&&We.message.length>0&&(te=We.message),typeof We.details=="string")ye=We.details;else if(We.details&&typeof We.details=="object")try{ye=JSON.stringify(We.details,null,2)}catch{ye=""}}else typeof g=="string"&&g.length>0&&(te=g);let xe=b&&b.length>0?`Failed to load ${b}`:"Request failed";J.open(xe,te,ye)},tt=function(g){return`${E.getState().workspace.current?.path||""}\0${g}`},st=function(){ge&&(ge().catch(()=>{}),ge=null),Le=null,qe=null},ct=function(g){Ze=g;let b=()=>{Ze!==g||E.getState().selected_id!==g||(Ze=null,Qe(g))};if(!Z){ie.then(b);return}b()},gt=function(g,b,te,ye,xe){return te!==Xe[b]?(xe().catch(()=>{}),!1):(g.set(ye,xe),!0)},A=function(){let g=E.getState();Ue(g.view==="board"),it(g.view==="worker"),S(Ne(g)),pt(g.view==="board"||g.view==="worker"||Zt||!!g.selected_id)},Ce=function(){let g=zr(re);return g===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:g}}},Fe=function(){let g=zr(Me);return g===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:g}}},Ue=function(g){if(g)for(let[b,te]of Ga){if($t.has(b)||mt.has(b))continue;let ye=b===Dr?Ce():{type:te};try{ee.register(b,ye)}catch(ot){t("register %s store failed: %o",b,ot)}mt.add(b);let xe=Xe.board,We=!1;L.subscribeList(b,ye).then(ot=>{We=!gt($t,"board",xe,b,ot)}).catch(ot=>{t("subscribe %s failed: %o",b,ot),Se(ot,"board")}).finally(()=>{mt.delete(b),We&&A()})}else de()},de=function(){Xe.board+=1;for(let[g]of Ga){let b=$t.get(g);b&&(b().catch(()=>{}),$t.delete(g));try{ee.unregister(g)}catch(te){t("unregister %s failed: %o",g,te)}}},it=function(g){if(!g){nt();return}for(let[b,te]of Vm){if(ke.has(b)||mt.has(b))continue;let ye=b===Pr?Fe():{type:te};try{ee.register(b,ye)}catch(ot){t("register %s store failed: %o",b,ot)}mt.add(b);let xe=Xe.worker,We=!1;L.subscribeList(b,ye).then(ot=>{We=!gt(ke,"worker",xe,b,ot)}).catch(ot=>{t("subscribe %s failed: %o",b,ot),Se(ot,"worker")}).finally(()=>{mt.delete(b),We&&A()})}},nt=function(){Xe.worker+=1;for(let[g]of Vm){let b=ke.get(g);b&&(b().catch(()=>{}),ke.delete(g));try{ee.unregister(g)}catch(te){t("unregister %s failed: %o",g,te)}}},pt=function(g){if(!g){yt();return}He||(me("subscribe-worker-queue",{id:Qm}).catch(b=>{t("subscribe-worker-queue failed: %o",b)}),He=()=>me("unsubscribe-worker-queue",{id:Qm}))},yt=function(){He&&(He().catch(()=>{}),He=null)},Ne=function(g){return g.view==="monitor"||g.selected_id!=null},S=function(g){if(!g){U();return}et||(me("subscribe-monitor-pipeline",{id:Ym}).catch(b=>{t("subscribe-monitor-pipeline failed: %o",b)}),et=()=>me("unsubscribe-monitor-pipeline",{id:Ym}))},U=function(){et&&(et().catch(()=>{}),et=null)},we=function(){K||(me("subscribe-ui-order",{id:Xm}).catch(g=>{t("subscribe-ui-order failed: %o",g)}),K=()=>me("unsubscribe-ui-order",{id:Xm}))},Ee=function(){K&&(K().catch(()=>{}),K=null),ae.clear()},vt=function(){ft||(me("subscribe-display-policy",{id:Zm}).catch(g=>{t("subscribe-display-policy failed: %o",g)}),ft=()=>me("unsubscribe-display-policy",{id:Zm}))},xt=function(){ft&&(ft().catch(()=>{}),ft=null),le.clear()},qt=function(){Ct||(me("subscribe-impl-presets",{id:Jm}).catch(g=>{t("subscribe-impl-presets failed: %o",g)}),Ct=()=>me("unsubscribe-impl-presets",{id:Jm}))},Lt=function(g){if(!g)return"Unknown";let b=g.split("/").filter(Boolean);return b.length>0?b[b.length-1]:"Unknown"},ln=function(g,b){Tt.open(g.path,{missing_state:g.missing_state,...b?{workspace:b}:{}})};var _=Se,k=tt,m=st,R=ct,T=gt,D=A,ne=Ce,H=Fe,P=Ue,O=de,q=it,F=nt,z=pt,B=yt,N=Ne,V=S,W=U,oe=we,fe=Ee,Pe=vt,G=xt,se=qt,_e=Lt,Oe=ln;let Q=document.getElementById("header-loading"),ce=qu(Q),J=v_(e),be=Gm(),me=ce.wrapSend((g,b)=>be.send(g,b)),L=Ou(me),ee=Iu(),Re=Pu(),I=uu(),ae=Lu(),le=lu(),Y=cu(),Ae=du();be.on("impl-presets-snapshot",g=>{let b=g;b&&typeof b.revision=="number"&&Array.isArray(b.presets)&&Y.set({revision:b.revision,presets:b.presets})}),be.on("monitor-pipeline-snapshot",g=>{let b=g;if(!(!b||!Array.isArray(b.workspaces)))try{I.set(b.workspaces,b.workspaces_state,b.cross_lanes)}catch{}}),be.on("ui-order-snapshot",g=>{let b=g;if(b&&typeof b.revision=="number")try{ae.set({revision:b.revision,order:b.order&&typeof b.order=="object"?b.order:{}})}catch{}}),be.on("display-policy-snapshot",g=>{let b=g;if(b&&b.policy&&typeof b.policy=="object")try{le.set(b.policy)}catch{}}),be.on("session-log-snapshot",g=>{let b=g;if(b&&typeof b.id=="string")try{Ae.set(b.id,Array.isArray(b.lines)?b.lines:[],typeof b.last_event_at=="number"?b.last_event_at:null)}catch{}}),be.on("session-log-append",g=>{let b=g;if(b&&typeof b.id=="string")try{Ae.append(b.id,b.event)}catch{}}),be.on("snapshot",g=>{let b=g,te=b&&typeof b.id=="string"?b.id:"",ye=te?ee.getStore(te):null;if(ye&&b&&b.type==="snapshot")try{ye.applyPush(b)}catch{}}),be.on("upsert",g=>{let b=g,te=b&&typeof b.id=="string"?b.id:"",ye=te?ee.getStore(te):null;if(ye&&b&&b.type==="upsert")try{ye.applyPush(b)}catch{}}),be.on("delete",g=>{let b=g,te=b&&typeof b.id=="string"?b.id:"",ye=te?ee.getStore(te):null;if(ye&&b&&b.type==="delete")try{ye.applyPush(b)}catch{}});let ge=null,Le=null,qe=null,Ze=null,ze=()=>{},ie=new Promise(g=>{ze=()=>g(void 0)}),Z=!1,Ie=!1;async function Qe(g){let b=tt(g);if(b===Le||b===qe)return;qe=b;let te=`detail:${g}`,ye={type:"issue-detail",params:{id:g}};try{ee.register(te,ye)}catch(xe){t("register detail store failed: %o",xe)}try{let xe=await L.subscribeList(te,ye);if(E.getState().selected_id!==g||tt(g)!==b){await xe().catch(()=>{});return}ge&&await ge().catch(()=>{}),ge=xe,Le=b}catch(xe){t("detail subscribe failed: %o",xe),Se(xe,"issue details")}finally{qe===b&&(qe=null)}}let $t=new Map,mt=new Set,Xe={board:0,worker:0},Zt=!1,re=ii;try{let g=window.localStorage.getItem(eg);tl(g)&&(re=g)}catch{}let Me="today";try{let g=window.localStorage.getItem(z$);g!==null&&(Me=Yn(g))}catch{}async function dt(g){if(!tl(g)||g===re)return;re=g;try{window.localStorage.setItem(eg,g)}catch{}let b=$t.get(Dr);if(!b)return;$t.delete(Dr),await b().catch(()=>{});let te=Ce();try{ee.register(Dr,te)}catch(ye){t("register %s store failed: %o",Dr,ye)}try{let ye=await L.subscribeList(Dr,te);$t.set(Dr,ye)}catch(ye){t("re-subscribe %s failed: %o",Dr,ye),Se(ye,"board")}}async function St(g){let b=Yn(g);if(b===Me)return;Me=b;let te=ke.get(Pr);if(!te)return;ke.delete(Pr),await te().catch(()=>{});let ye=Fe();try{ee.register(Pr,ye)}catch(xe){t("register %s store failed: %o",Pr,xe)}try{let xe=await L.subscribeList(Pr,ye);ke.set(Pr,xe)}catch(xe){t("re-subscribe %s failed: %o",Pr,xe),Se(xe,"worker")}}let ke=new Map,He=null,et=null,K=null,ft=null,Ct=null;async function Kt(){ft=null,le.clear(),Ct=null,Y.clear(),He=null,et=null,$t.clear(),ke.clear(),Xe.board+=1,Xe.worker+=1,qt();let g=E.getState().workspace.current?.path;if(g)try{await be.send("set-workspace",{path:g})}catch(te){t("workspace restore after reconnect failed: %o",te);return}vt();let b=E.getState();Ue(b.view==="board"),it(b.view==="worker"),S(Ne(b)),pt(b.view==="board"||b.view==="worker"||!!b.selected_id)}async function en(){t("clearing all subscriptions for workspace switch"),de(),nt(),yt(),Re.clear(),Ee(),we(),xt(),vt(),st();let g=E.getState();if(g.selected_id)try{ee.unregister(`detail:${g.selected_id}`)}catch{}let b=E.getState();Ue(b.view==="board"),it(b.view==="worker"),S(Ne(b)),pt(b.view==="board"||b.view==="worker"||!!b.selected_id),b.selected_id&&ct(b.selected_id)}async function kt(g){t("requesting workspace switch to %s",g),Ie=!0;try{let b=await be.send("set-workspace",{path:g});t("workspace switch result: %o",b),b&&b.workspace&&(E.setState({workspace:{current:{path:b.workspace.root_dir,database:b.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",g),b.changed&&(await en(),ve("Switched to "+Lt(g),"success",2e3)))}catch(b){throw t("workspace switch failed: %o",b),ve("Failed to switch workspace","error",3e3),b}finally{Ie=!1}}async function an(g){t("requesting workspace git pull for %s",g);try{let b=await be.send("git-pull-workspace",{});t("workspace git pull result: %o",b);let te=b?.status;if(te==="up_to_date"){ve("Already up to date","success",2e3);return}if(te==="stash_pop_conflict"){ve("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}ve("Git pulled "+Lt(g),"success",2e3)}catch(b){t("workspace git pull failed: %o",b);let te=b?.code,ye=b?.message;if(te==="rebase_conflict"){ve("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(te==="rebase_conflict_abort_failed"){ve("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(te==="busy"){ve("Git pull skipped: another operation is running","warning",3e3);return}let xe=ye?`: ${ye}`:"";throw ve(`Git pull failed${xe}`,"error",3e3),b}}async function un(g,b){t("setting workspace visibility %s \u2192 %s",g,String(b));try{await be.send("set-workspace-visibility",{path:g,visible:b}),await jt()}catch(te){t("workspace visibility update failed: %o",te),ve("Failed to update project visibility","error",3e3)}}async function jt(){try{let g=await be.send("list-workspaces",{});if(t("workspaces loaded: %o",g),g&&Array.isArray(g.workspaces)){let b=g.workspaces.map(We=>({path:We.path,database:We.database,pid:We.pid,version:We.version})),te=g.current?{path:g.current.root_dir,database:g.current.db_path}:null,ye=Array.isArray(g.hidden)?g.hidden.filter(We=>typeof We=="string"):[];E.setState({workspace:{current:te,available:b,hidden:ye}});let xe=window.localStorage.getItem("beads-ui.workspace");xe&&(!b.some(ot=>ot.path===xe)||ye.includes(xe)?window.localStorage.removeItem("beads-ui.workspace"):te&&xe!==te.path&&(t("restoring saved workspace preference: %s",xe),await kt(xe)))}}catch(g){t("failed to load workspaces: %o",g)}}be.on("workspace-changed",g=>{t("workspace-changed event: %o",g),g&&g.root_dir&&(E.setState({workspace:{current:{path:g.root_dir,database:g.db_path}}}),jt(),en())});let Vt=!1;if(typeof be.onConnection=="function"){let g=b=>{t("ws state %s",b),b==="reconnecting"||b==="closed"?(Vt=!0,ve("Connection lost. Reconnecting\u2026","error",4e3)):b==="open"&&Vt&&(Vt=!1,ve("Reconnected","success",2200),H$(E,(te,ye)=>{t(`${te}: %o`,ye)}),Kt())};be.onConnection(g)}let Be="board";try{let g=window.localStorage.getItem("beads-ui.view");(g==="board"||g==="worker"||g==="monitor"||g==="compare")&&(Be=g)}catch(g){t("view parse error: %o",g)}let E=Nu({config:W$(),view:Be});be.on("worker-queue-snapshot",g=>{let b=g;if(!b||!b.queue)return;let te=E.getState().workspace.current?.path;if(typeof te=="string"&&te.length>0&&b.root_dir!==te){t("dropping worker-queue snapshot for %s",String(b.root_dir));return}try{Re.set(b.queue)}catch{}});let he=Du(E);he.start();let De=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"]),ht=async(g,b)=>{try{return await me(g,b)}catch(te){if(De.has(g))throw te;return[]}};X_({global_element:r,repo_element:o},E,he);let Ke=document.getElementById("workspace-picker");Ke&&Hm(Ke,E,kt,an,un);let Et=J_(e,(g,b)=>me(g,b));try{let g=document.getElementById("new-issue-btn");g&&g.addEventListener("click",()=>Et.open())}catch{}let Pt=rm(e,{policyStore:le,queueStore:Re,implPresetStore:Y,transport:(g,b)=>me(g,b),onOpenChange:g=>{let b=Zt;Zt=g,A(),b&&g===!1&&yn.refreshSessionDefaults()},labelOptions:()=>{let g=new Set;for(let[b]of Ga)for(let te of ee.snapshotFor(b)||[]){let ye=te.labels;if(Array.isArray(ye))for(let xe of ye)typeof xe=="string"&&xe.length>0&&g.add(xe)}return Array.from(g).sort()}});try{let g=document.getElementById("display-settings-btn");g&&(g.setAttribute("aria-label","\uC124\uC815"),g.setAttribute("title","\uC124\uC815"),g.addEventListener("click",()=>Pt.open()))}catch{}let Ht=document.createElement("div");Ht.className="md-viewer-root",document.body.appendChild(Ht);let Tt=Ca(Ht,{getWorkspacePath:()=>E.getState().workspace.current?.path}),Mt=rd(l,{gotoIssue:g=>he.gotoIssue(g),issueStores:ee,transport:ht,workerQueueStore:Re,uiOrderStore:ae,displayPolicyStore:le,closedRange:re,onClosedRangeChange:g=>{dt(g)},onNewIssue:()=>Et.open(),openDoc:ln}),yn=Vc(a,{transport:ht,issueStores:ee,queueStore:Re,sessionLogStore:Ae,gotoIssue:g=>E.setState({selected_id:g}),getWorkspacePath:()=>E.getState().workspace.current?.path,switchWorkspace:g=>kt(g),openDoc:ln,doneRange:Me,onDoneRangeChange:g=>{St(g)}}),v=Q_(u,{transport:ht,pipelineStore:I,execPresetStore:Y,sessionLogStore:Ae,router:he,gotoIssue:g=>he.gotoIssue(g),getWorkspacePath:()=>E.getState().workspace.current?.path,switchWorkspace:g=>kt(g),openDoc:ln}),p=Gp(d,{transport:ht,gotoIssue:g=>he.gotoIssue(g),execPresetStore:Y,sourceCandidates:()=>{let g=new Map;for(let[b]of Ga)for(let te of ee.snapshotFor(b)||[]){let ye=te?.id;typeof ye=="string"&&ye.length>0&&!g.has(ye)&&g.set(ye,te)}return Array.from(g.values())}}),h=y_(f,{issueStores:ee,transport:ht,queueStore:Re,execPresetStore:Y,sessionLogStore:Ae,getWorkspacePath:()=>E.getState().workspace.current?.path,mdViewer:Tt,depCandidates:()=>{let g=I.get();if(g===null)return null;let b=I.getWorkspacesState(),te=E.getState();if(te.view==="monitor")return oc(g,b);let ye=te.workspace.current?.path;return ye?oc(g,b,{root_dir:ye}):null},subscribeCandidates:g=>I.subscribe(g),onDepChanged:({type:g,a:b,b:te})=>{let ye=v;g==="dep-add"&&ye&&typeof ye.recorrectSharedLane=="function"&&ye.recorrectSharedLane(g,b,te)},onNavigate:(g,b)=>{let te=()=>{E.getState().view==="worker"?E.setState({selected_id:g}):he.gotoIssue(g)},ye=E.getState().workspace.current?.path;if(typeof b!="string"||b.length===0||!ye||b===ye){te();return}Promise.resolve(kt(b)).then(te).catch(()=>{ve("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})},onClose:()=>{let g=E.getState();E.setState({selected_id:null});try{he.gotoView(g.view==="worker"||g.view==="monitor"?g.view:"board")}catch{}},onOpenExecPresets:()=>{Pt.open("execution")}}),$=E.getState().selected_id;$&&(f.hidden=!1,h.load($),ct($)),E.subscribe(g=>{let b=g.selected_id;b?(f.hidden=!1,h.load(b),Ie||ct(b)):(h.clear(),f.hidden=!0,st())});let X=g=>{l.hidden=g.view!=="board",a.hidden=g.view!=="worker",u.hidden=g.view!=="monitor",d.hidden=g.view!=="compare",i&&i.classList.toggle("is-quiet",g.view==="monitor"||g.view==="compare"),Ue(g.view==="board"),it(g.view==="worker"),S(Ne(g)),pt(g.view==="board"||g.view==="worker"||Zt||!!g.selected_id),!g.selected_id&&g.view==="board"&&Mt.load(),g.view==="worker"&&yn.load(),g.view==="monitor"?v.load():v.pause(),g.view==="compare"?p.load():p.pause(),window.localStorage.setItem("beads-ui.view",g.view)};E.subscribe(X),X(E.getState()),we(),vt(),qt(),jt().finally(()=>{Z=!0,ze()}),window.addEventListener("keydown",g=>{let b=g.ctrlKey||g.metaKey,te=String(g.key||"").toLowerCase(),ye=g.target,xe=ye&&ye.tagName?String(ye.tagName).toLowerCase():"",We=xe==="input"||xe==="textarea"||xe==="select"||ye&&typeof ye.isContentEditable=="boolean"&&ye.isContentEditable;b&&te==="n"&&(We||(g.preventDefault(),Et.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,o=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",o);let i=document.getElementById("theme-switch");i&&(i.checked=o==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&V$(t)});export{V$ as bootstrap,W$ as readBootstrapConfig,H$ as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
