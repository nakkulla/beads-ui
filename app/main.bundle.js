var mf=Object.create;var xi=Object.defineProperty;var gf=Object.getOwnPropertyDescriptor;var hf=Object.getOwnPropertyNames;var bf=Object.getPrototypeOf,yf=Object.prototype.hasOwnProperty;var vf=(e,t,n)=>t in e?xi(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Ai=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var wf=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of hf(t))!yf.call(e,o)&&o!==n&&xi(e,o,{get:()=>t[o],enumerable:!(r=gf(t,o))||r.enumerable});return e};var kf=(e,t,n)=>(n=e!=null?mf(bf(e)):{},wf(t||!e||!e.__esModule?xi(n,"default",{value:e,enumerable:!0}):n,e));var Et=(e,t,n)=>vf(e,typeof t!="symbol"?t+"":t,n);var xl=Ai((fv,$l)=>{var Tr=1e3,Cr=Tr*60,Rr=Cr*60,pr=Rr*24,Af=pr*7,Sf=pr*365.25;$l.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return Ef(e);if(n==="number"&&isFinite(e))return t.long?Cf(e):Tf(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function Ef(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*Sf;case"weeks":case"week":case"w":return n*Af;case"days":case"day":case"d":return n*pr;case"hours":case"hour":case"hrs":case"hr":case"h":return n*Rr;case"minutes":case"minute":case"mins":case"min":case"m":return n*Cr;case"seconds":case"second":case"secs":case"sec":case"s":return n*Tr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function Tf(e){var t=Math.abs(e);return t>=pr?Math.round(e/pr)+"d":t>=Rr?Math.round(e/Rr)+"h":t>=Cr?Math.round(e/Cr)+"m":t>=Tr?Math.round(e/Tr)+"s":e+"ms"}function Cf(e){var t=Math.abs(e);return t>=pr?ns(e,t,pr,"day"):t>=Rr?ns(e,t,Rr,"hour"):t>=Cr?ns(e,t,Cr,"minute"):t>=Tr?ns(e,t,Tr,"second"):e+" ms"}function ns(e,t,n,r){var o=t>=n*1.5;return Math.round(e/n)+" "+r+(o?"s":"")}});var Sl=Ai((_v,Al)=>{function Rf(e){n.debug=n,n.default=n,n.coerce=a,n.disable=i,n.enable=o,n.enabled=l,n.humanize=xl(),n.destroy=c,Object.keys(e).forEach(d=>{n[d]=e[d]}),n.names=[],n.skips=[],n.formatters={};function t(d){let p=0;for(let g=0;g<d.length;g++)p=(p<<5)-p+d.charCodeAt(g),p|=0;return n.colors[Math.abs(p)%n.colors.length]}n.selectColor=t;function n(d){let p,g=null,_,$;function C(...M){if(!C.enabled)return;let K=C,ie=Number(new Date),ee=ie-(p||ie);K.diff=ee,K.prev=p,K.curr=ie,p=ie,M[0]=n.coerce(M[0]),typeof M[0]!="string"&&M.unshift("%O");let j=0;M[0]=M[0].replace(/%([a-zA-Z%])/g,(I,W)=>{if(I==="%%")return"%";j++;let G=n.formatters[W];if(typeof G=="function"){let te=M[j];I=G.call(K,te),M.splice(j,1),j--}return I}),n.formatArgs.call(K,M),(K.log||n.log).apply(K,M)}return C.namespace=d,C.useColors=n.useColors(),C.color=n.selectColor(d),C.extend=r,C.destroy=n.destroy,Object.defineProperty(C,"enabled",{enumerable:!0,configurable:!1,get:()=>g!==null?g:(_!==n.namespaces&&(_=n.namespaces,$=n.enabled(d)),$),set:M=>{g=M}}),typeof n.init=="function"&&n.init(C),C}function r(d,p){let g=n(this.namespace+(typeof p>"u"?":":p)+d);return g.log=this.log,g}function o(d){n.save(d),n.namespaces=d,n.names=[],n.skips=[];let p=(typeof d=="string"?d:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let g of p)g[0]==="-"?n.skips.push(g.slice(1)):n.names.push(g)}function s(d,p){let g=0,_=0,$=-1,C=0;for(;g<d.length;)if(_<p.length&&(p[_]===d[g]||p[_]==="*"))p[_]==="*"?($=_,C=g,_++):(g++,_++);else if($!==-1)_=$+1,C++,g=C;else return!1;for(;_<p.length&&p[_]==="*";)_++;return _===p.length}function i(){let d=[...n.names,...n.skips.map(p=>"-"+p)].join(",");return n.enable(""),d}function l(d){for(let p of n.skips)if(s(d,p))return!1;for(let p of n.names)if(s(d,p))return!0;return!1}function a(d){return d instanceof Error?d.stack||d.message:d}function c(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}Al.exports=Rf});var El=Ai((un,rs)=>{un.formatArgs=Lf;un.save=If;un.load=Pf;un.useColors=Of;un.storage=Df();un.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();un.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Of(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Lf(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+rs.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,o=>{o!=="%%"&&(n++,o==="%c"&&(r=n))}),e.splice(r,0,t)}un.log=console.debug||console.log||(()=>{});function If(e){try{e?un.storage.setItem("debug",e):un.storage.removeItem("debug")}catch{}}function Pf(){let e;try{e=un.storage.getItem("debug")||un.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function Df(){try{return localStorage}catch{}}rs.exports=Sl()(un);var{formatters:Mf}=rs.exports;Mf.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var eo=globalThis,Vo=eo.trustedTypes,al=Vo?Vo.createPolicy("lit-html",{createHTML:e=>e}):void 0,Ei="$lit$",Mn=`lit$${Math.random().toFixed(9).slice(2)}$`,Ti="?"+Mn,$f=`<${Ti}>`,lr=document,to=()=>lr.createComment(""),no=e=>e===null||typeof e!="object"&&typeof e!="function",Ci=Array.isArray,fl=e=>Ci(e)||typeof e?.[Symbol.iterator]=="function",Si=`[ 	
\f\r]`,Jr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ll=/-->/g,cl=/>/g,ir=RegExp(`>|${Si}(?:([^\\s"'>=/]+)(${Si}*=${Si}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ul=/'/g,dl=/"/g,_l=/^(?:script|style|textarea|title)$/i,Ri=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),u=Ri(1),oo=Ri(2),iv=Ri(3),bn=Symbol.for("lit-noChange"),Pt=Symbol.for("lit-nothing"),pl=new WeakMap,ar=lr.createTreeWalker(lr,129);function ml(e,t){if(!Ci(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return al!==void 0?al.createHTML(t):t}var gl=(e,t)=>{let n=e.length-1,r=[],o,s=t===2?"<svg>":t===3?"<math>":"",i=Jr;for(let l=0;l<n;l++){let a=e[l],c,d,p=-1,g=0;for(;g<a.length&&(i.lastIndex=g,d=i.exec(a),d!==null);)g=i.lastIndex,i===Jr?d[1]==="!--"?i=ll:d[1]!==void 0?i=cl:d[2]!==void 0?(_l.test(d[2])&&(o=RegExp("</"+d[2],"g")),i=ir):d[3]!==void 0&&(i=ir):i===ir?d[0]===">"?(i=o??Jr,p=-1):d[1]===void 0?p=-2:(p=i.lastIndex-d[2].length,c=d[1],i=d[3]===void 0?ir:d[3]==='"'?dl:ul):i===dl||i===ul?i=ir:i===ll||i===cl?i=Jr:(i=ir,o=void 0);let _=i===ir&&e[l+1].startsWith("/>")?" ":"";s+=i===Jr?a+$f:p>=0?(r.push(c),a.slice(0,p)+Ei+a.slice(p)+Mn+_):a+Mn+(p===-2?l:_)}return[ml(e,s+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},ro=class e{constructor({strings:t,_$litType$:n},r){let o;this.parts=[];let s=0,i=0,l=t.length-1,a=this.parts,[c,d]=gl(t,n);if(this.el=e.createElement(c,r),ar.currentNode=this.el.content,n===2||n===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(o=ar.nextNode())!==null&&a.length<l;){if(o.nodeType===1){if(o.hasAttributes())for(let p of o.getAttributeNames())if(p.endsWith(Ei)){let g=d[i++],_=o.getAttribute(p).split(Mn),$=/([.?@])?(.*)/.exec(g);a.push({type:1,index:s,name:$[2],strings:_,ctor:$[1]==="."?Xo:$[1]==="?"?Zo:$[1]==="@"?Jo:ur}),o.removeAttribute(p)}else p.startsWith(Mn)&&(a.push({type:6,index:s}),o.removeAttribute(p));if(_l.test(o.tagName)){let p=o.textContent.split(Mn),g=p.length-1;if(g>0){o.textContent=Vo?Vo.emptyScript:"";for(let _=0;_<g;_++)o.append(p[_],to()),ar.nextNode(),a.push({type:2,index:++s});o.append(p[g],to())}}}else if(o.nodeType===8)if(o.data===Ti)a.push({type:2,index:s});else{let p=-1;for(;(p=o.data.indexOf(Mn,p+1))!==-1;)a.push({type:7,index:s}),p+=Mn.length-1}s++}}static createElement(t,n){let r=lr.createElement("template");return r.innerHTML=t,r}};function cr(e,t,n=e,r){if(t===bn)return t;let o=r!==void 0?n._$Co?.[r]:n._$Cl,s=no(t)?void 0:t._$litDirective$;return o?.constructor!==s&&(o?._$AO?.(!1),s===void 0?o=void 0:(o=new s(e),o._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=o:n._$Cl=o),o!==void 0&&(t=cr(e,o._$AS(e,t.values),o,r)),t}var Qo=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,o=(t?.creationScope??lr).importNode(n,!0);ar.currentNode=o;let s=ar.nextNode(),i=0,l=0,a=r[0];for(;a!==void 0;){if(i===a.index){let c;a.type===2?c=new Sr(s,s.nextSibling,this,t):a.type===1?c=new a.ctor(s,a.name,a.strings,this,t):a.type===6&&(c=new es(s,this,t)),this._$AV.push(c),a=r[++l]}i!==a?.index&&(s=ar.nextNode(),i++)}return ar.currentNode=lr,o}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},Sr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,o){this.type=2,this._$AH=Pt,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=cr(this,t,n),no(t)?t===Pt||t==null||t===""?(this._$AH!==Pt&&this._$AR(),this._$AH=Pt):t!==this._$AH&&t!==bn&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):fl(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Pt&&no(this._$AH)?this._$AA.nextSibling.data=t:this.T(lr.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,o=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=ro.createElement(ml(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===o)this._$AH.p(n);else{let s=new Qo(o,this),i=s.u(this.options);s.p(n),this.T(i),this._$AH=s}}_$AC(t){let n=pl.get(t.strings);return n===void 0&&pl.set(t.strings,n=new ro(t)),n}k(t){Ci(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,o=0;for(let s of t)o===n.length?n.push(r=new e(this.O(to()),this.O(to()),this,this.options)):r=n[o],r._$AI(s),o++;o<n.length&&(this._$AR(r&&r._$AB.nextSibling,o),n.length=o)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},ur=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,o,s){this.type=1,this._$AH=Pt,this._$AN=void 0,this.element=t,this.name=n,this._$AM=o,this.options=s,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=Pt}_$AI(t,n=this,r,o){let s=this.strings,i=!1;if(s===void 0)t=cr(this,t,n,0),i=!no(t)||t!==this._$AH&&t!==bn,i&&(this._$AH=t);else{let l=t,a,c;for(t=s[0],a=0;a<s.length-1;a++)c=cr(this,l[r+a],n,a),c===bn&&(c=this._$AH[a]),i||(i=!no(c)||c!==this._$AH[a]),c===Pt?t=Pt:t!==Pt&&(t+=(c??"")+s[a+1]),this._$AH[a]=c}i&&!o&&this.j(t)}j(t){t===Pt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Xo=class extends ur{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Pt?void 0:t}},Zo=class extends ur{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Pt)}},Jo=class extends ur{constructor(t,n,r,o,s){super(t,n,r,o,s),this.type=5}_$AI(t,n=this){if((t=cr(this,t,n,0)??Pt)===bn)return;let r=this._$AH,o=t===Pt&&r!==Pt||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,s=t!==Pt&&(r===Pt||o);o&&this.element.removeEventListener(this.name,this,r),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},es=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){cr(this,t)}},hl={M:Ei,P:Mn,A:Ti,C:1,L:gl,R:Qo,D:fl,V:cr,I:Sr,H:ur,N:Zo,U:Jo,B:Xo,F:es},xf=eo.litHtmlPolyfillSupport;xf?.(ro,Sr),(eo.litHtmlVersions??(eo.litHtmlVersions=[])).push("3.3.1");var ct=(e,t,n)=>{let r=n?.renderBefore??t,o=r._$litPart$;if(o===void 0){let s=n?.renderBefore??null;r._$litPart$=o=new Sr(t.insertBefore(to(),s),s,void 0,n??{})}return o._$AI(e),o};var ts="today",bl=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}],Er=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"}];function On(e){return e==="today"?"today":"7d"}function Oi(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function dr(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function yl(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function vl(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function wl(){let e=null,t=[],n,r=new Set;function o(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},crossLanes(){return n},set(s,i,l){e=Array.isArray(s)?s:null,t=Array.isArray(i)?i:[],n=l===void 0?void 0:l!==null&&typeof l=="object"&&typeof l.revision=="number"&&Array.isArray(l.lanes)?{revision:l.revision,lanes:l.lanes}:null,o()},clear(){e=null,t=[],n=void 0,o()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function kl(){let e=new Map,t=new Set;function n(o){return o.startsWith("session-log:")?o:`session-log:${o}`}function r(){for(let o of Array.from(t))try{o()}catch{}}return{set(o,s,i=null){e.set(n(o),{lines:Array.isArray(s)?[...s]:[],last_event_at:typeof i=="number"?i:null}),r()},append(o,s){let i=n(o),l=e.get(i)||{lines:[],last_event_at:null};l.lines=[...l.lines,s],l.last_event_at=Date.now(),e.set(i,l),r()},get(o){return e.get(n(o))||null},clear(o){typeof o=="string"?e.delete(n(o)):e.clear(),r()},subscribe(o){return t.add(o),()=>t.delete(o)}}}var Tl=kf(El(),1);function Lt(e){return(0,Tl.default)(`beads-ui:${e}`)}function Nf(e){let n=Cl((e&&typeof e=="object"?e:{}).spec_id);return n?{path:n,source:"native",conflict:!1}:{path:"",source:"none",conflict:!1}}function Cl(e){return typeof e=="string"?e.trim():""}function qf(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}var Ff=/^[A-Za-z0-9_.:-]+@[0-9a-fA-F]{40}$/;function Or(e){let t=Nf(e),n=Cl(qf(e).spec_review),r=Ff.test(n),o=r&&n.slice(0,n.indexOf("@"))==="skipped";return t.source==="none"?{...t,evidence:"none",skipped:o}:{...t,evidence:r?"published":"draft",skipped:o}}function vn(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function so(e,t){let n=vn(e.created_at),r=vn(t.created_at);if(n!==r)return n<r?1:-1;let o=e.priority??2,s=t.priority??2;if(o!==s)return o-s;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function Dl(e,t){let n=vn(e.created_at),r=vn(t.created_at);if(n!==r)return n<r?-1:1;let o=e.priority??2,s=t.priority??2;if(o!==s)return o-s;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function Ml(e,t){let n=vn(e.updated_at),r=vn(t.updated_at);if(n!==r)return n<r?1:-1;let o=e.id,s=t.id;return o<s?-1:o>s?1:0}function Nl(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let o=vn(e.created_at),s=vn(t.created_at);if(o!==s)return o<s?1:-1;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function ql(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let o=e?.id,s=t?.id;return o<s?-1:o>s?1:0}var os=Object.freeze({priority:"asc",dependents:"desc",released:"desc",spec:"desc",created:"asc",updated:"desc"});function jf(e){return typeof e=="string"&&Object.prototype.hasOwnProperty.call(os,e)}function Ii(e){if(!e||typeof e!="object")return!1;let t=e;return jf(t.key)&&(t.dir==="asc"||t.dir==="desc")}function Rl(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function Ol(e,t){switch(t){case"priority":{let n=e.priority;return typeof n=="number"&&Number.isFinite(n)?n:null}case"dependents":{let n=e.dependents_info?e.dependents_info.count:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"released":{let n=e.release_info?e.release_info.last_released_at:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"spec":return Or(e).evidence==="published"?1:0;case"created":return Rl(e.created_at);case"updated":return Rl(e.updated_at);default:return null}}function Ll(e,t,n){let r=Ol(e,n.key),o=Ol(t,n.key);if(r===null||o===null)return r===o?0:r===null?1:-1;if(r===o)return 0;let s=r<o?-1:1;return n.dir==="desc"?-s:s}function Fl(e){let t=Array.isArray(e)?e.filter(Ii):[];return(n,r)=>{for(let l of t){let a=Ll(n,r,l);if(a!==0)return a}let o=Ll(n,r,{key:"created",dir:"asc"});if(o!==0)return o;let s=n.id,i=r.id;return s<i?-1:s>i?1:0}}var Bf=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Il(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Pl(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=Bf.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function jl(e,t){let n=Il(e),r=Il(t);if(n!==r)return n<r?-1:1;let o=Pl(e),s=Pl(t);if(o!==s)return o<s?-1:1;let i=vn(e&&e.created_at),l=vn(t&&t.created_at);if(i!==l)return i<l?-1:1;let a=e&&e.id,c=t&&t.id;return a===c?0:String(a)<String(c)?-1:1}var Li=2**20;function Lr(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-vn(e&&e.created_at)}function Bl(e){return(t,n)=>{let r=Lr(t,e),o=Lr(n,e);if(r!==o)return r<o?-1:1;let s=t?.id,i=n?.id;return s<i?-1:s>i?1:0}}function Pi(e,t,n){let r=Array.isArray(e)?e:[],o=r.length,s=Math.max(0,Math.min(t,o-1)),i=s-1>=0?r[s-1]:null,l=s+1<o?r[s+1]:null;if(!i&&!l)return{rank:0};if(!i)return{rank:Lr(l,n)-Li};if(!l)return{rank:Lr(i,n)+Li};let a=Lr(i,n),c=Lr(l,n),d=(a+c)/2;return a<d&&d<c?{rank:d}:{renormalize:r.map((p,g)=>({bead_id:p.id,rank:g*Li}))}}function Di(e,t={}){let n=Lt(`issue-store:${e}`),r=new Map,o=[],s=0,i=new Set,l=!1,a=t.sort||so;function c(){for(let g of Array.from(i))try{g()}catch{}}function d(){o=Array.from(r.values()).sort(a)}function p(g){if(l||!g||g.id!==e)return;let _=Number(g.revision)||0;if(n("apply %s rev=%d",g.type,_),!(_<=s&&g.type!=="snapshot")){if(g.type==="snapshot"){if(_<=s)return;r.clear();let $=Array.isArray(g.issues)?g.issues:[];for(let C of $)C&&typeof C.id=="string"&&C.id.length>0&&r.set(C.id,C);d(),s=_,c();return}if(g.type==="upsert"){let $=g.issue;if($&&typeof $.id=="string"&&$.id.length>0){let C=r.get($.id);if(!C)r.set($.id,$);else{let M=Number.isFinite(C.updated_at)?C.updated_at:0,K=Number.isFinite($.updated_at)?$.updated_at:0;if(M<=K){for(let ie of Object.keys(C))ie in $||delete C[ie];for(let[ie,ee]of Object.entries($))C[ie]=ee}}d()}s=_,c()}else if(g.type==="delete"){let $=String(g.issue_id||"");$&&(r.delete($),d()),s=_,c()}}}return{id:e,subscribe(g){return i.add(g),()=>{i.delete(g)}},applyPush:p,snapshot(){return o},size(){return r.size},getById(g){return r.get(g)},dispose(){l=!0,r.clear(),o=[],i.clear(),s=0}}}function ss(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let o=Object.keys(e.params).sort();for(let s of o){let i=e.params[s];n[s]=String(i)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function Ul(e){let t=Lt("subs"),n=new Map,r=new Map;function o(l,a){t("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let c=r.get(l);if(!c||c.size===0)return;let d=Array.isArray(a.added)?a.added:[],p=Array.isArray(a.updated)?a.updated:[],g=Array.isArray(a.removed)?a.removed:[];for(let _ of Array.from(c)){let $=n.get(_);if(!$)continue;let C=$.itemsById;for(let M of d)typeof M=="string"&&M.length>0&&C.set(M,!0);for(let M of p)typeof M=="string"&&M.length>0&&C.set(M,!0);for(let M of g)typeof M=="string"&&M.length>0&&C.delete(M)}}async function s(l,a){let c=ss(a);if(t("subscribe %s key=%s",l,c),!n.has(l))n.set(l,{key:c,itemsById:new Map});else{let p=n.get(l);if(p&&p.key!==c){let g=r.get(p.key);g&&(g.delete(l),g.size===0&&r.delete(p.key)),n.set(l,{key:c,itemsById:new Map})}}r.has(c)||r.set(c,new Set);let d=r.get(c);d&&d.add(l);try{await e("subscribe-list",{id:l,type:a.type,params:a.params})}catch(p){let g=n.get(l)||null;if(g){let _=r.get(g.key);_&&(_.delete(l),_.size===0&&r.delete(g.key))}throw n.delete(l),p}return async()=>{t("unsubscribe %s key=%s",l,c);try{await e("unsubscribe-list",{id:l})}catch{}let p=n.get(l)||null;if(p){let g=r.get(p.key);g&&(g.delete(l),g.size===0&&r.delete(p.key))}n.delete(l)}}return{subscribeList:s,_applyDelta:o,_subKeyOf:ss,selectors:{getIds(l){let a=n.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let c=n.get(l);return c?c.itemsById.has(a):!1},count(l){let a=n.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=n.get(l),c={};if(!a)return c;for(let d of a.itemsById.keys())c[d]=!0;return c}}}}function Wl(){let e=Lt("issue-stores"),t=new Map,n=new Map,r=new Set,o=new Map;function s(){for(let a of Array.from(r))try{a()}catch{}}function i(a,c,d){let p=c?ss(c):"",g=n.get(a)||"",_=t.has(a);if(e("register %s key=%s (prev=%s)",a,p,g),_&&g&&p&&g!==p){let $=t.get(a);if($)try{$.dispose()}catch{}let C=o.get(a);if(C){try{C()}catch{}o.delete(a)}let M=Di(a,d);t.set(a,M);let K=M.subscribe(()=>s());o.set(a,K)}else if(!_){let $=Di(a,d);t.set(a,$);let C=$.subscribe(()=>s());o.set(a,C)}return n.set(a,p),()=>l(a)}function l(a){e("unregister %s",a),n.delete(a);let c=t.get(a);c&&(c.dispose(),t.delete(a));let d=o.get(a);if(d){try{d()}catch{}o.delete(a)}}return{register:i,unregister:l,getStore(a){return t.get(a)||null},snapshotFor(a){let c=t.get(a);return c?c.snapshot().slice():[]},subscribe(a){return r.add(a),()=>r.delete(a)}}}function zl(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Hl(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Mi(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function Uf(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),o=r>=0?n.slice(r+1):"";if(o){let l=new URLSearchParams(o).get("issue");if(l)return decodeURIComponent(l)}let s=/^\/issue\/([^\s?#]+)/.exec(n);return s&&s[1]?decodeURIComponent(s[1]):null}function Wf(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function Gl(e){let t=Lt("router"),n=()=>{let r=window.location.hash||"",o=/^#\/issue\/([^\s?#]+)/.exec(r),s=o&&o[1]?decodeURIComponent(o[1]):Uf(r),i=Wf(r);if(t("hash change \u2192 view=%s id=%s",i,s),e.setState({selected_id:i==="worker"?null:s,view:i,worker:{selected_parent_id:i==="worker"?s:null}}),!!o||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let a=s?`#/${i}?issue=${encodeURIComponent(s)}`:`#/${i}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let o=e.getState?e.getState():{view:"board"},s=o.view==="worker"||o.view==="monitor"?o.view:"board",i=Mi(s,r);t("goto issue %s (view=%s)",r,s),window.location.hash!==i?window.location.hash=i:e.setState({selected_id:s==="worker"?null:r,view:s,worker:{selected_parent_id:s==="worker"?r:null}})},gotoView(r){let o=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},s=r==="worker"?o.worker?.selected_parent_id:o.selected_id,i=s?Mi(r,s):`#/${r}`;t("goto view %s (id=%s)",r,s||""),window.location.hash!==i?window.location.hash=i:e.setState({view:r,selected_id:r==="worker"?null:o.selected_id})}}}var zf=Object.freeze({workspace_config:{default_workspace:null}});function Kl(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:zf.workspace_config.default_workspace}}}function Yl(e={}){let t=Lt("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:Kl(e.config)},r=new Set;function o(){for(let s of Array.from(r))try{s(n)}catch{}}return{getState(){return n},setState(s){let i={...n,...s,filters:{...n.filters,...s.filters||{}},board:{...n.board,...s.board||{}},worker:{...n.worker,...s.worker||{}},workspace:{current:s.workspace?.current!==void 0?s.workspace.current:n.workspace.current,available:s.workspace?.available!==void 0?s.workspace.available:n.workspace.available,hidden:s.workspace?.hidden!==void 0?s.workspace.hidden:n.workspace.hidden},config:s.config!==void 0?Kl(s.config):n.config},l=i.workspace.current?.path!==n.workspace.current?.path||i.workspace.available.length!==n.workspace.available.length||i.workspace.hidden.length!==n.workspace.hidden.length||i.workspace.hidden.some((c,d)=>c!==n.workspace.hidden[d]),a=i.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;i.selected_id===n.selected_id&&i.view===n.view&&i.filters.status===n.filters.status&&i.filters.search===n.filters.search&&i.filters.type===n.filters.type&&i.board.closed_filter===n.board.closed_filter&&i.worker.selected_parent_id===n.worker.selected_parent_id&&i.worker.show_closed_children.length===n.worker.show_closed_children.length&&i.worker.show_closed_children.every((c,d)=>c===n.worker.show_closed_children[d])&&!l&&!a||(n=i,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),o())},subscribe(s){return r.add(s),()=>r.delete(s)}}}function Vl(e){let t=Lt("activity"),n=0,r=new Map,o=1;function s(){if(!e)return;let c=n>0;e.toggleAttribute("hidden",!c),e.setAttribute("aria-busy",c?"true":"false")}function i(){n+=1,t("start count=%d",n),s()}function l(){let c=n;n=Math.max(0,n-1),c<=0?t("done called but count was already %d",c):t("done count=%d\u2192%d",c,n),s()}function a(c){return async(p,g)=>{let _=o++,$=Date.now();r.set(_,{type:p,start_ts:$}),t("request start id=%d type=%s count=%d",_,p,n+1),i();let C=!1,M=()=>{C||(C=!0,r.delete(_),l())},K=setTimeout(()=>{C||(t("request TIMEOUT id=%d type=%s elapsed=%dms",_,p,Date.now()-$),M())},3e4);try{let ie=await c(p,g),ee=Date.now()-$;return t("request done id=%d type=%s elapsed=%dms",_,p,ee),ie}catch(ie){let ee=Date.now()-$;throw t("request error id=%d type=%s elapsed=%dms err=%o",_,p,ee,ie),ie}finally{clearTimeout(K),M()}}}return s(),{wrapSend:a,start:i,done:l,getCount:()=>n,getActiveRequests:()=>{let c=Date.now();return Array.from(r.entries()).map(([d,p])=>({id:d,type:p.type,elapsed_ms:c-p.start_ts}))}}}function ge(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}function Ir(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let s=t.get();return s&&s.order?s.order:{}}function r(s,i,l){let a=e&&e.snapshotFor?e.snapshotFor(s).slice():[];if(i==="closed")return a.sort(ql),a;switch(l){case"created_desc":return a.sort(so),a;case"created_asc":return a.sort(Dl),a;case"updated_desc":return a.sort(Ml),a;case"priority":return a.sort(Nl),a;case"manual":default:{let c=n();return c?a.sort(Bl(c)):a.sort(so),a}}}function o(s){let i=[];return e&&typeof e.subscribe=="function"&&i.push(e.subscribe(s)),t&&typeof t.subscribe=="function"&&i.push(t.subscribe(s)),()=>{for(let l of i)try{l()}catch{}}}return{selectBoardColumn:r,subscribe:o}}function Yn(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function Gt(e){let t=Yn(e);if(t===null)return"";let n=new Date(t),r=o=>String(o).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function tn(e,t){let n=Yn(e);if(n===null)return"";let o=(typeof t=="number"?t:Date.now())-n;if(o<6e4)return"\uBC29\uAE08";let s=Math.floor(o/6e4);if(s<60)return`${s}\uBD84 \uC804`;let i=Math.floor(o/36e5);if(i<24)return`${i}\uC2DC\uAC04 \uC804`;let l=Math.floor(o/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let c=Math.floor(l/30);return c<12?`${c}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function Ql(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let o=Yn(r.updated_at)??0;if(t===null||o>n){t=r,n=o;continue}o===n&&String(r.id)<String(t.id)&&(t=r)}return t}function is(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function as(e){let t=new Map;for(let r of e)r&&r.id&&!t.has(r.id)&&t.set(r.id,r);let n=new Map;for(let r of t.values()){let o=is(r);if(!o)continue;let s=n.get(o);s||(s=[],n.set(o,s)),s.push({id:r.id,title:r.title,status:r.status,metadata:r.metadata,workflow:r.workflow,created_at:r.created_at,updated_at:r.updated_at})}return n}function ls(e,t){let n=e.get(t)||[],r=0;for(let s of n)(s.status==="resolved"||s.status==="closed")&&(r+=1);let o=Ql(n);return{total:n.length,count:r,current:o,children:n}}function Xl(e){let t=e.transport,n=e.uiOrderStore;function r(i,l){return"renormalize"in i?i.renormalize:[{bead_id:l,rank:i.rank}]}function o(i,l){let a={...i.order};for(let c of l)a[c.bead_id]=c.rank;n&&n.set({revision:i.revision,order:a})}async function s(i,l,a){if(!t||!n)return;let c=n.get()||{revision:0,order:{}},d=r(Pi(l,a,c.order),i);o(c,d);let p=await t("ui-order-set",{expected_revision:c.revision,entries:d});if(p&&p.conflict){let g={revision:typeof p.revision=="number"?p.revision:0,order:p.order||{}};n.set(g);let _=r(Pi(l,a,g.order),i);o(g,_);let $=await t("ui-order-set",{expected_revision:g.revision,entries:_});$&&$.applied&&n.set({revision:typeof $.revision=="number"?$.revision:0,order:$.order||{}})}else p&&p.applied&&n.set({revision:typeof p.revision=="number"?p.revision:0,order:p.order||{}})}return{applyReorder:s}}function Zl(e){if(typeof e!="string")return"";let t=e.indexOf("-");return t>0?e.slice(0,t):""}function io(e,t){let n=Zl(e),r=Zl(t);return n.length===0||r.length===0?!1:n!==r}function cs(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Ni(e,t){return!t||typeof e!="string"||e.length===0||cs(t.visible_labels).includes(e)?!0:cs(t.hidden_labels).includes(e)?!1:!cs(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function Jl(e,t){return cs(e).filter(n=>Ni(n,t))}function Vn(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}function Hf(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function Gf(e,t,n,r,o){return u`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${r?"true":"false"}
    @click=${o}
  >
    children ${t}/${n} ${r?"\u25B4":"\u25BE"}
  </button>`}function Kf(e,t,n,r){return u`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${r?o=>r(o,e.id):void 0}
  >
    <span class=${Hf(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${n}
  </button>`}function us(e,t){let n=e.total||0,r=!!t.expanded,o=t.trailing??"",s=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(n===0&&s===null)return"";let i=Array.isArray(e.children)?e.children:[],l=n>0?i.slice().sort(jl):i;return u`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?Gf(t.parent_id,e.count,n,r,t.onToggle):u`<span class="board-card__roll-none">${s}</span>`}
        ${o}
      </div>
      ${n>0&&e.current?u`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${r&&n>0?u`<div class="board-card__roll-list">
            ${l.map((a,c)=>Kf(a,c+1,t.childChips?t.childChips(a):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var Yf={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},tc={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},ec={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},Vf={review:"\u2713",skip:"\u2298"},Qn={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function Qf(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let o of e){let s=t[o];if(s&&s.fill==="dim"&&s.stale!==!0)return o}return null}function nc(e){let t=e&&e.fill||"none";return t==="none"?Qn.none:e&&e.stale===!0?Qn.stale:t==="dim"?Qn.dim:e&&e.glyph==="review"?Qn.review:e&&e.glyph==="skip"?Qn.skip:Qn.done}function Xf(e){if(!e||e.fill==="none"||!e.approval_state)return nc(e);let t=[];return e.glyph==="review"?t.push(Qn.review):e.glyph==="skip"&&t.push(Qn.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function Zf(e,t,n,r){let o=Yf[e]||e,s=t&&t.fill||"none",i=!!t&&t.stale===!0,l=Vf[t&&t.glyph||""]||"",a="bar";s==="dim"?a+=` b-${o} dim`:s==="full"&&(a+=` b-${o} full`),i&&(a+=" stale"),n&&(a+=" cur");let c=s==="none"?"lbl":`lbl l-${o} on`,d=n?`color: var(--stage-${o}-on)`:"",p=tc[e]||e,g=r?rc(t):null;if(!g)return u`
      <div class="seg">
        <div class=${a} style=${d}>${l}</div>
        <div class=${c}>${p}</div>
      </div>
    `;let _=`${p} \uBB38\uC11C \uC5F4\uAE30 \xB7 ${g.path}`;return u`
    <button
      type="button"
      class="seg seg--doc"
      aria-label=${_}
      title=${_}
      @click=${$=>{$.preventDefault(),$.stopPropagation(),r($,g,e)}}
    >
      <div class=${a} style=${d}>${l}</div>
      <div class=${c}>${p}</div>
    </button>
  `}function rc(e){let t=e?e.doc:null;return!t||typeof t.path!="string"||t.path.length===0?null:t}function ds(e,t,n={}){if(!e||!e.stages)return"";let r=n.onOpenDoc,o=ec[e.route]||ec.spec_backed,s=e.stages,i=Qf(o,s,String(t||"open")),l=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${o.map(c=>`${tc[c]||c} ${c==="plan"?Xf(s[c]||{}):nc(s[c]||{})}`).join(" \xB7 ")}`,a=!!r&&o.some(c=>rc(s[c]||{})!==null);return u`
    <div
      class="stp"
      role=${a?"group":"img"}
      aria-label=${l}
    >
      ${o.map(c=>Zf(c,s[c]||{},c===i,r))}
    </div>
  `}function Jf(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var oc=2;function sc(e){let t=e.slice(0,oc).join(", "),n=e.length-oc;return`\u26D3 blocked: ${t}${n>0?` +${n}`:""}`}function e_(e,t){if(!t)return[];let n=[],r=Array.isArray(t.blockers)?t.blockers:[],o=[],s=[];for(let i of r)(io(e,i)?s:o).push(i);return o.length>0&&n.push(u`<span class="ctl-chip ctl-chip--blocked-dep"
        >${sc(o)}</span
      >`),s.length>0&&n.push(u`<span class="ctl-chip ctl-chip--blocked-foreign"
        >${sc(s)}</span
      >`),n}function t_(e){if(!e||typeof e!="object")return null;let t=e.awaiting_user;if(typeof t!="string")return null;let n=t.trim();return n.length===0?null:u`<span class="ctl-chip ctl-chip--blocked"
    >${`\u23F8 \uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694: ${n}`}</span
  >`}function qi(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function ps(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function Nn(e){return`${e.kind}:${ps(e)}@${e.sha}`}function fs(e,t){if(!e)return null;let n=qi(e.kind),r=e.reason,o=e.kind==="delegated"?r===null:typeof r=="string"&&r.trim().length>0&&!/[\r\n]/.test(r);if(!n||!o)return null;let s=qi(t?.kind),i=s!==null&&t?.kind!==e.kind,l=`\uACC4\uD68D \xB7 ${n}${i?` \u2192 ${s}`:""}`,a=`planned_execution ${e.kind}${typeof r=="string"?`:${r}`:""}`,c=t?` \xB7 exec_receipt ${Nn(t)}`:"";return{kind:e.kind,label:l,title:`${a}${c}`}}function ic(e,t){let n=fs(e,t);return n?u`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${n.kind}
        title=${n.title}
        >${n.label}</span
      >`:null}function n_(e){if(!e)return null;let t=qi(e.kind);return t?u`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${Nn(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function r_(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},o=[];if(r.route&&Vn(n,"route")){let l=r.route_source==="derived";o.push(u`<span
        class="ctl-chip ctl-chip--route${l?" is-derived":""}"
        title=${l?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${l?"unset":r.route}</span
      >`)}if(r.fast_track&&Vn(n,"fast_track")&&o.push(u`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),r.pr&&Vn(n,"pr")){let l=r.pr.number;o.push(u`<span class="ctl-chip ctl-chip--pr"
        >${`PR${l!=null?` #${l}`:""}`}</span
      >`)}let s=ic(r.planned_execution,r.exec_receipt);if(s&&o.push(s),r.exec_receipt){let l=r.exec_receipt;o.push(u`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Nn(l)}`}
        >${`exec ${l.kind==="delegated"?ps(l):`main:${l.actor}`} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}if(r.impl_entry){let l=r.impl_entry;o.push(u`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${l.actor}@${l.sha}`}
        >${`impl ${l.actor} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}for(let l of Jl(e.labels,n))o.push(u`<span class="ctl-chip ctl-chip--label">${l}</span>`);if(e.from_id&&Vn(n,"from")&&o.push(u`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${l=>{l.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(l,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),Vn(n,"blocked")){let l=t_(e.metadata);l&&o.push(l),o.push(...e_(e.id,e.blocked_info))}return t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&Vn(n,"blocked")&&o.push(u`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),o.length===0?"":u`<div class="board-card__chips">${o}</div>`}function o_(e){let t=tn(e.created_at),n=tn(e.updated_at);return!t&&!n?"":u`<span class="board-card__times">
    ${t?u`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${Gt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&n?u`<span class="board-card__time-sep">·</span>`:""}
    ${n?u`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${Gt(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </span>`}function s_(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return us(n,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:o_(e),empty_label:"children \uC5C6\uC74C",childChips:Fi,onToggle:r=>t.onRollupToggle&&t.onRollupToggle(r,e.id),onChildClick:(r,o)=>t.onChildClick&&t.onChildClick(r,o)})}function Fi(e){let t=e?.workflow?.chips?.planned_execution,n=e?.workflow?.chips?.exec_receipt;return fs(t,n)?u`<span class="board-card__roll-child-chips">
    ${ic(t,n)}
    ${n_(n)}
  </span>`:null}function _s(e,t){let n=Jf(e.priority);return u`
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
        ${n?u`<span class="board-card__pri">${n}</span>`:""}
      </div>
      <div class="board-card__title">${e.title||"(\uC81C\uBAA9 \uC5C6\uC74C)"}</div>
      ${r_(e,t)}
      ${e.workflow&&Vn(t.policy||null,"stepper")?ds(e.workflow,e.status,{onOpenDoc:t.onOpenDoc}):""}
      ${s_(e,t)}
    </article>
  `}function Pr(e,t){let n=Array.isArray(e.items)?e.items.length:0,r=e.is_closed===!0;return u`
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
        ${r?u`<select
              class="board-column__closed-range"
              aria-label="Closed period"
              @change=${t.onClosedRangeChange}
            >
              ${bl.map(s=>u`<option
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
        ${e.items.map(s=>_s(s,t))}
      </div>
    </section>
  `}function ac(e,t,n){return u`
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
          ${e.items.length===0?u`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(r=>_s(r,t))}
        </div>
      </div>
    </dialog>
  `}var i_=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],a_=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],l_=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function c_(e,t,n){let r=e.labels.length,o=r>0?`\uB77C\uBCA8 ${r}`:"\uB77C\uBCA8";return u`
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
      ${n.label_menu_open?u`<div class="board-filter__label-menu" role="group">
            ${n.label_options.length===0?u`<div class="board-filter__label-empty">라벨 없음</div>`:n.label_options.map(s=>u`<label class="board-filter__label-row">
                      <input
                        type="checkbox"
                        .checked=${e.labels.includes(s)}
                        @change=${()=>t.onLabelToggle(s)}
                      />
                      <span>${s}</span>
                    </label>`)}
            ${r>0?u`<button
                  type="button"
                  class="board-filter__label-clear"
                  @click=${t.onLabelClear}
                >
                  선택 해제
                </button>`:""}
          </div>`:""}
    </div>
  `}function lc(e,t,n){return u`
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
        ${i_.map(r=>u`<option
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
        ${a_.map(r=>u`<option
              value=${r.value}
              ?selected=${e.type===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      ${c_(e,t,n)}
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
        ${l_.map(r=>u`<option
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
  `}var u_=200,d_={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},p_=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),cc="beads-ui.board.sort",uc=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function f_(){try{let e=window.localStorage.getItem(cc);if(e&&uc.has(e))return e}catch{}return"created_desc"}function dc(e,t){let n=Lt("views:board"),r=t.gotoIssue,o=t.issueStores,s=t.transport,i=t.uiOrderStore,l=t.displayPolicyStore,a=t.workerQueueStore,c=t.onClosedRangeChange,d=t.onNewIssue,p=t.openDoc,g=t.closedRange||ts,_=o?Ir(o,i):null,$=Xl({transport:s,uiOrderStore:i}),C=[],M=[],K=[],ie=[],ee=[],j=[],P=!1,I=0,W=f_(),G=new Map,te=new Map,N=new Map,V=new Set,H={search:"",priority:"",type:"",labels:[]},X=!1,Re=null;function we(R){return String(R.status||"open")==="open"}function ce(R){return String(R.status||"open")==="open"}function F(R){let Q=H.search.trim().toLowerCase(),Ne=H.priority,Ye=H.type,Me=H.labels;return R.filter(nt=>{if(Q){let at=String(nt.id||"").toLowerCase(),ze=String(nt.title||"").toLowerCase();if(!at.includes(Q)&&!ze.includes(Q))return!1}if(Ne!==""&&String(nt.priority)!==Ne||Ye!==""&&String(nt.issue_type||"")!==Ye)return!1;if(Me.length>0){let at=Array.isArray(nt.labels)?nt.labels:[];if(!Me.some(ze=>at.includes(ze)))return!1}return!0})}function $e(){let R=new Set;for(let Q of[C,M,K,ie,ee,j])for(let Ne of Q){let Ye=Array.isArray(Ne.labels)?Ne.labels:[];for(let Me of Ye)typeof Me=="string"&&Me.length>0&&R.add(Me)}return Array.from(R).sort()}function Se(){return H.search.trim()!==""||H.priority!==""||H.type!==""||H.labels.length>0}function S(){try{if(_){let R=_.selectBoardColumn("tab:board:in-progress","in_progress",W),Q=_.selectBoardColumn("tab:board:blocked","blocked",W).filter(ce),Ne=new Set(R.map(Ge=>Ge.id)),Ye=_.selectBoardColumn("tab:board:ready","ready",W).filter(Ge=>we(Ge)&&!Ne.has(Ge.id)),Me=_.selectBoardColumn("tab:board:resolved","resolved",W),nt=_.selectBoardColumn("tab:board:deferred","deferred",W),at=_.selectBoardColumn("tab:board:closed","closed").slice(0,u_),ze=[...Q,...Ye,...R,...Me,...at];ne(ze);let rt=new Set;for(let Ge of ze)Ge&&Ge.id&&!is(Ge)&&rt.add(Ge.id);let vt=!Se();C=vt?ao(Q,rt):Q,M=vt?ao(Ye,rt):Ye,K=vt?ao(R,rt):R,ie=vt?ao(Me,rt):Me,ee=nt,I=nt.length,j=vt?ao(at,rt):at,G=new Map;for(let Ge of C)G.set(Ge.id,"open");for(let Ge of M)G.set(Ge.id,"open");for(let Ge of K)G.set(Ge.id,"in_progress");for(let Ge of ie)G.set(Ge.id,"resolved");for(let Ge of ee)G.set(Ge.id,"deferred");for(let Ge of j)G.set(Ge.id,"closed");te=new Map;for(let Ge of C)te.set(Ge.id,"blocked-col");for(let Ge of M)te.set(Ge.id,"ready-col");for(let Ge of K)te.set(Ge.id,"in-progress-col");for(let Ge of ie)te.set(Ge.id,"resolved-col");for(let Ge of j)te.set(Ge.id,"closed-col")}je()}catch{C=[],M=[],K=[],ie=[],ee=[],j=[],N=new Map,je()}}function ne(R){N=as(R)}function Te(R){return ls(N,R)}function _e(R){return!V.has(R)}function ke(R,Q){R.preventDefault(),R.stopPropagation(),V.has(Q)?V.delete(Q):V.add(Q),je()}function he(R,Q){R.preventDefault(),R.stopPropagation(),r(Q)}function Be(R,Q){R.preventDefault(),R.stopPropagation(),r(Q)}function pt(R,Q){Re||r(Q)}function Pe(R,Q){R.preventDefault(),R.stopPropagation(),__(Q).then(Ne=>{Ne&&ge("\uBCF5\uC0AC\uB428","success",1200)})}function B(R,Q){Re=Q,R.dataTransfer&&(R.dataTransfer.setData("text/plain",Q),R.dataTransfer.effectAllowed="move"),R.target.classList.add("board-card--dragging")}function de(R){R.target.classList.remove("board-card--dragging"),Mt(),setTimeout(()=>{Re=null},0)}function ae(R){let Q=String(R.target.value||"");!Q||Q===g||(g=Q,c&&c(Q),je())}function le(){return l?l.get():null}function xe(R){let Q=a?a.get():null,Ne=Q?Q.cleanup_failed:null;if(!Ne||typeof Ne!="object"||Array.isArray(Ne))return null;let Ye=Ne[R];return!Ye||typeof Ye!="object"||Array.isArray(Ye)?null:Ye}let me={onCardClick:pt,onCopyId:Pe,onDragStart:B,onDragEnd:de,onClosedRangeChange:ae,rollupFor:Te,isExpanded:_e,onRollupToggle:ke,onChildClick:he,onFromChipClick:Be,onOpenDoc:p?(R,Q)=>p(Q):void 0,cleanupFailureFor:xe,get policy(){return le()}};function Oe(R,Q){Re||(U(),r(Q))}function Qe(R,Q){R.preventDefault(),R.stopPropagation(),U(),r(Q)}let He={...me,onCardClick:Oe,onChildClick:Qe,onFromChipClick:Qe,onOpenDoc:p?(R,Q)=>{U(),p(Q)}:void 0,get policy(){return le()}};function Ue(R){let Q=R.target,Ne=e.querySelector(".board-filter__labels");Q&&Ne&&Ne.contains(Q)||Ae()}function re(R){R.key==="Escape"&&Ae()}function z(){X||(X=!0,document.addEventListener("mousedown",Ue),document.addEventListener("keydown",re),je())}function Ae(){X&&(X=!1,document.removeEventListener("mousedown",Ue),document.removeEventListener("keydown",re),je())}function dt(R){R.key==="Escape"&&U()}function x(){P||(P=!0,document.addEventListener("keydown",dt),je())}function U(){P&&(P=!1,document.removeEventListener("keydown",dt),je())}let ye={onClose:U,onOverlayClick(R){R.target===R.currentTarget&&U()}},De={onSearchInput(R){H.search=String(R.target.value||""),S()},onPriorityChange(R){H.priority=String(R.target.value||""),S()},onTypeChange(R){H.type=String(R.target.value||""),S()},onSortChange(R){let Q=String(R.target.value||"");if(!(!uc.has(Q)||Q===W)){W=Q;try{window.localStorage.setItem(cc,Q)}catch{}S()}},onDeferredToggle(){P?U():x()},onLabelMenuToggle(){X?Ae():z()},onLabelToggle(R){let Q=H.labels.indexOf(R);Q===-1?H.labels.push(R):H.labels.splice(Q,1),S()},onLabelClear(){H.labels.length!==0&&(H.labels=[],S())},onNewIssue(){d&&d()}};function qe(){return u`
      <div class="board-view">
        ${lc(H,De,{sort_mode:W,deferred_popup_open:P,deferred_count:I,label_options:$e(),label_menu_open:X})}
        <div class="board-root">
          ${Pr({title:"Blocked",id:"blocked-col",items:F(C)},me)}
          ${Pr({title:"Ready",id:"ready-col",items:F(M)},me)}
          ${Pr({title:"In progress",id:"in-progress-col",items:F(K)},me)}
          ${Pr({title:"Resolved",id:"resolved-col",items:F(ie)},me)}
          ${Pr({title:"Closed",id:"closed-col",items:F(j),is_closed:!0,closed_range:g},me)}
        </div>
        ${P?ac({items:F(ee),count:I},He,ye):""}
      </div>
    `}function je(){ct(qe(),e),ft()}function ft(){try{let R=e.querySelector("#deferred-popup");R&&!R.open&&(typeof R.showModal=="function"?R.showModal():R.setAttribute("open",""));let Q=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let Ne of Q)Array.from(Ne.querySelectorAll(".board-card")).forEach((Me,nt)=>{Me.tabIndex=nt===0?0:-1})}catch{}}async function xt(R,Q){if(!s){ge("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await s("update-status",{id:R,status:Q}),ge("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(Ne){n("update-status failed: %o",Ne),ge("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function Rt(R){switch(R){case"blocked-col":return C;case"ready-col":return M;case"in-progress-col":return K;case"resolved-col":return ie;default:return[]}}function Ft(R,Q,Ne){if(!s||!i)return;let Ye=Rt(R),Me=Ye.find(vt=>vt.id===Q);if(!Me)return;let nt=Ye.filter(vt=>vt.id!==Q),at=Ne.closest?Ne.closest(".board-card"):null,ze=nt.length;if(at){let vt=at.getAttribute("data-issue-id");if(vt===Q)return;let Ge=nt.findIndex(Ot=>Ot.id===vt);Ge>=0&&(ze=Ge)}let rt=nt.slice();rt.splice(ze,0,Me),$.applyReorder(Q,rt,ze)}function Mt(){for(let R of Array.from(e.querySelectorAll(".board-column--drag-over")))R.classList.remove("board-column--drag-over")}let bt=null;e.addEventListener("dragover",R=>{R.preventDefault(),R.dataTransfer&&(R.dataTransfer.dropEffect="move");let Ne=R.target.closest(".board-column");Ne&&Ne!==bt&&(bt&&bt.classList.remove("board-column--drag-over"),Ne.classList.add("board-column--drag-over"),bt=Ne)}),e.addEventListener("dragleave",R=>{let Q=R.relatedTarget;(!Q||!e.contains(Q))&&bt&&(bt.classList.remove("board-column--drag-over"),bt=null)}),e.addEventListener("drop",R=>{R.preventDefault(),bt&&(bt.classList.remove("board-column--drag-over"),bt=null);let Q=R.target,Ne=Q.closest(".board-column");if(!Ne)return;let Ye=R.dataTransfer?.getData("text/plain")||"";if(!Ye)return;let Me=Ne.id,nt=te.get(Ye);if(nt&&nt===Me){if(p_.has(Me)){if(W!=="manual"){ge("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}Ft(Me,Ye,Q)}return}let at=d_[Me];if(!at){ge("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}G.get(Ye)!==at&&xt(Ye,at)}),e.addEventListener("keydown",R=>{let Q=R.target;if(!(Q instanceof HTMLElement))return;let Ne=String(Q.tagName||"").toLowerCase();if(Ne==="input"||Ne==="textarea"||Ne==="select"||Ne==="button"||Ne==="a"||Q.isContentEditable===!0)return;let Ye=Q.closest(".board-card");if(!Ye)return;let Me=String(R.key||"");if(Me==="Enter"||Me===" "){R.preventDefault();let rt=Ye.getAttribute("data-issue-id");rt&&r(rt);return}if(Me!=="ArrowUp"&&Me!=="ArrowDown"&&Me!=="ArrowLeft"&&Me!=="ArrowRight")return;R.preventDefault();let nt=Ye.closest(".board-column");if(!nt)return;let at=Array.from(nt.querySelectorAll(".board-card")),ze=at.indexOf(Ye);if(Me==="ArrowDown"&&ze<at.length-1){Ve(Ye,at[ze+1]);return}if(Me==="ArrowUp"&&ze>0){Ve(Ye,at[ze-1]);return}if(Me==="ArrowLeft"||Me==="ArrowRight"){let rt=Array.from(e.querySelectorAll(".board-column")),vt=rt.indexOf(nt),Ge=Me==="ArrowRight"?1:-1,Ot=vt+Ge;for(;Ot>=0&&Ot<rt.length;){let Xe=rt[Ot].querySelector(".board-card");if(Xe){Ve(Ye,Xe);return}Ot+=Ge}}});function Ve(R,Q){try{R.tabIndex=-1,Q.tabIndex=0,Q.focus()}catch{}}let L=null;_&&_.subscribe&&(L=_.subscribe(()=>{try{S()}catch{}}));let oe=null;l&&l.subscribe&&(oe=l.subscribe(()=>{try{S()}catch{}}));let be=null;return a&&a.subscribe&&(be=a.subscribe(()=>{je()})),{async load(){n("load"),S()},clear(){Ae(),U(),L&&(L(),L=null),oe&&(oe(),oe=null),be&&(be(),be=null),e.replaceChildren(),C=[],M=[],K=[],ie=[],ee=[],j=[],G=new Map,te=new Map}}}function ao(e,t){return e.filter(n=>{let r=is(n);return!(r&&t.has(r))})}async function __(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}var Jt=e=>e??Pt;async function nn(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}function fr(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function lo(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function m_(e,t=document){let n=t.createElement("dialog");n.className="continuation-dialog";let r=t.createElement("button"),o=t.createElement("button"),s=t.createElement("button"),i=t.createElement("h2"),l=t.createElement("p");return i.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",l.textContent=`${fr(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${fr(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,r.type="button",r.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",r.disabled=e.prior_available===!1,o.type="button",o.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",s.type="button",s.textContent="\uCDE8\uC18C",n.append(i,l,r,o,s),t.body.append(n),new Promise(a=>{let c=d=>{typeof n.close=="function"&&n.close(),n.remove(),a(d)};r.addEventListener("click",()=>c("prior_session")),o.addEventListener("click",()=>c("fresh_current")),s.addEventListener("click",()=>c(null)),n.addEventListener("cancel",d=>{d.preventDefault(),c(null)}),typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")})}async function qn(e,t,n={}){let r=e;for(n.onResult?.(r);r?.continuation_mismatch;){let o=r.continuation_mismatch,s=await m_(o);if(s===null)return r;r=await t(s,o.decision_token),n.onResult?.(r),r?.conflict&&n.refresh&&(r=await n.refresh(r),n.onResult?.(r))}return r}var g_=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_model","orchestration_model","orchestration_effort","orchestration_speed"],pc={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},h_=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function Ut(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Dt(e){return typeof e=="string"&&e.length>0?e:null}function Dr(e){return e.startsWith("gpt-")?e.slice(4):e}function Ct(e,t,n,r,o){return{value:e,source:t,display:n,full_value:r,resolution:o}}function _c(e,t,n){let r=Dt(t[e]);if(r!==null)return{value:r,source:"pin"};let o=Dt(n[e]);return o===null?null:{value:o,source:"global"}}function co(e,t,n,r){return _c(e,t,n)||{value:r,source:"base"}}function ji(e,t,n,r){let o=n?.implementation?.model_catalog;if(t&&Ut(o?.[t])){let i=Dt(o[t][e]);if(i!==null)return i}if(t&&Array.isArray(o?.[t])&&o[t].includes(e))return e;if(!t&&Ut(o)){for(let i of Object.values(o))if(Ut(i)){let l=Dt(i[e]);if(l!==null)return l}else if(Array.isArray(i)&&i.includes(e))return e}let s=r?.model_index?.[e];return Dt(r?.runners?.[s]?.models?.[e]?.id)||e}function b_(e,t){return Dt(t?.review?.reviewers?.[e]?.model)||e}function Mr(e,t,n=!1){if(e==="default")return Ct(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let r=n?Dr(e):e;return Ct(e,t,r,e,"explicit")}function mc(e,t,n){let r=t?.implementation?.model_catalog?.[e],o=[];Ut(r)?o.push(...Object.keys(r)):Array.isArray(r)&&o.push(...r.filter(i=>typeof i=="string"));let s=n?.runners?.[e]?.models;if(Ut(s))for(let i of Object.keys(s))o.includes(i)||o.push(i);return o}function y_(e,t){let n=[],r=e?.implementation?.model_catalog;Ut(r)&&n.push(...Object.keys(r));let o=t?.runners;if(Ut(o))for(let s of Object.keys(o))n.includes(s)||n.push(s);return n}function v_(e,t,n){if(e===null)return{runtime:null,offered:!1};let r=!1;for(let o of y_(t,n)){let s=mc(o,t,n);if(s.length>0&&(r=!0),s.includes(e))return{runtime:o,offered:!0}}return{runtime:null,offered:r}}function Bi(e){return Ct(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function fc(e,t,n){let r=_c(e,t,n);return r?Mr(r.value,r.source):Ct(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function pn(e){let t=Ut(e.pin)?e.pin:{},n=Ut(e.global)?e.global:{},r=Ut(e.execution_defaults)?e.execution_defaults:null,o=r?.supported===!0&&Ut(r.session)?r.session:null,s=r?.supported===!0&&Ut(r.orchestration)?r.orchestration:null,i=Ut(e.runner_catalog)?e.runner_catalog:null,l=Dt(n.quick_fix_impl_model),a=v_(l,o,i),c={};if(o){let d=co("workflow_mode",t,n,Dt(o.workflow_mode_default));c.workflow_mode=d.source==="base"?Ct(d.value,"base",d.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",d.value,"default"):Mr(d.value,d.source);for(let ee of["spec_review","plan_review","impl_review"]){let j=`${ee}_model`,P=Dt(ee==="plan_review"?d.value==="fast_track"?o.plan_review?.fast_track_default:o.plan_review?.standard_recommended:o.review?.default),I=co(j,t,n,P);if(I.value===null)c[j]=Ct(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(I.value!=="self"&&I.value!=="skip"&&!Ut(o.review?.reviewers?.[I.value]))c[j]=Bi(Ct(I.value,I.source,"",null,"explicit"));else{let W=b_(I.value,o);c[j]=Ct(I.value,I.source,Dr(W),W,I.source==="base"?"default":"explicit")}}for(let[ee,j]of Object.entries(pc)){let P=c[j].value;if(P==="self"||P==="skip"){c[ee]=Ct(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let I=Dt(o.review?.reviewers?.[P||""]?.effort),W=co(ee,t,n,I);c[ee]=W.value===null?Ct(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Ct(W.value,W.source,W.value,W.value,W.source==="base"?"default":"explicit")}let p=Ut(o.implementation?.default)?o.implementation.default:{},g=Dt(e.route),_=g!==null&&["quick_fix","spec_backed","full_plan"].includes(g),$=Ut(o.implementation?.route_defaults)?o.implementation.route_defaults:{},C=_&&Ut($[g])?$[g]:{};for(let ee of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let j=co(ee,t,n,ee==="impl_dispatch"?Dt(C.dispatch)||Dt(p.dispatch):Dt(p[ee.replace("impl_","")]));c[ee]=j.value===null?Ct(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Ct(j.value,j.source,j.value,j.value,j.source==="base"?"default":"explicit")}let M=Dt(t.impl_runtime),K=M==="inherit"?Dt(e.controller_runtime):M,ie=g==="quick_fix"&&Dt(t.impl_dispatch)===null&&a.runtime!==null&&(M===null||K===a.runtime);if(ie){let ee=a.runtime,j=l;c.impl_dispatch=Ct("delegated","global","\uC704\uC784 (\uC804\uC5ED quick_fix)","delegated","explicit"),M===null&&(c.impl_runtime=Ct(ee,"global",`${ee} (\uC720\uB3C4)`,ee,"explicit")),Dt(t.impl_model)===null&&(c.impl_model=Ct(j,"global",j,j,"explicit"))}if(c.impl_dispatch.value==="main"){c.impl_dispatch.display="\uBA54\uC778";for(let ee of["impl_runtime","impl_model","impl_effort","impl_speed"])c[ee]=Ct(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(c.impl_dispatch.value==="delegated"&&!ie&&(c.impl_dispatch.display="\uC704\uC784"),c.impl_runtime.value==="inherit"&&(c.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",c.impl_runtime.resolution="dynamic"),c.impl_model.value!==null){let ee=c.impl_runtime.value==="inherit"?Dt(e.controller_runtime):c.impl_runtime.value,j=ee?mc(ee,o,i):[];if(c.impl_model.value!=="auto"&&j.length>0&&!j.includes(c.impl_model.value))c.impl_model=Bi(c.impl_model);else{let P=ji(c.impl_model.value,ee,o,i);c.impl_model.display=Dr(P),c.impl_model.full_value=P}}if(c.impl_effort.value==="auto"){let ee=Dt(e.transport)||(c.impl_runtime.value==="codex"?"codex-native-spawn":c.impl_runtime.value==="claude"?"implement-claude":null),j=ee?Dt(o.implementation?.effort_by_transport?.[ee]?.auto):null;j&&!h_.has(j)?(c.impl_effort.display=`${j} (\uBE44\uD638\uD658)`,c.impl_effort.full_value=j,c.impl_effort.resolution="incompatible"):(c.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",c.impl_effort.resolution="dynamic")}c.impl_speed.value==="default"&&(c.impl_speed=c.impl_speed.source==="base"?Ct("default","base","default (\uC77C\uBC18)","default","default"):Mr("default",c.impl_speed.source))}}else for(let d of g_.filter(p=>!p.startsWith("orchestration_")))c[d]=fc(d,t,n);if(!o){for(let[d,p]of Object.entries(pc))(c[p].value==="self"||c[p].value==="skip")&&(c[d]=Ct(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(c.impl_dispatch.value==="main"){c.impl_dispatch.display="\uBA54\uC778";for(let d of["impl_runtime","impl_model","impl_effort","impl_speed"])c[d]=Ct(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else c.impl_dispatch.value==="delegated"&&(c.impl_dispatch.display="\uC704\uC784"),c.impl_runtime.value==="inherit"&&(c.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",c.impl_runtime.resolution="dynamic"),c.impl_effort.value==="auto"&&(c.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",c.impl_effort.resolution="dynamic")}for(let d of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!s){c[d]=fc(d,t,n);continue}let p=d.replace("orchestration_",""),g=Dt(s[p]),_=co(d,t,n,g);if(d==="orchestration_effort"&&_.source==="base"){c[d]=Ct(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(_.value===null){c[d]=Ct(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(d==="orchestration_model"){let $=_.source==="base"?Dt(s.model_id)||_.value:ji(_.value,null,o,i);c[d]=Ct(_.value,_.source,Dr($),$,_.source==="base"?"default":"explicit");continue}if(_.value==="default"){c[d]=_.source==="base"?Ct("default","base","default (\uC77C\uBC18)","default","default"):Mr("default",_.source);continue}c[d]=Mr(_.value,_.source)}if(o)if(l===null){let d=c.orchestration_model.full_value;c.quick_fix_impl_model=Ct(null,"base",d===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${Dr(d)})`,null,"default")}else if(a.runtime!==null){let d=ji(l,a.runtime,o,i);c.quick_fix_impl_model=Ct(l,"global",Dr(d),d,"explicit")}else a.offered?c.quick_fix_impl_model=Bi(Ct(l,"global","",null,"explicit")):c.quick_fix_impl_model=Mr(l,"global");return c}function w_(e,t){let n=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let r=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${n} (${r})`}function ms(e){let t=Ut(e.pin)?e.pin:{},n=Ut(e.global)?e.global:{},r=Ut(e.resolution_global)?{...e.resolution_global}:{};delete r[e.key];let o=p=>{let g={...r,...p};return pn({pin:e.layer==="pin"?g:t,global:e.layer==="pin"?n:g,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},s=e.layer==="pin"?t:n,i={...s};delete i[e.key];let l=o(i)[e.key],a=o(s)[e.key],c=Dt(s[e.key]),d=[...e.choices];return c!==null&&!d.includes(c)&&d.unshift(c),{unset_label:w_(l,e.layer==="pin"),full_value:l.full_value,unavailable:l.resolution==="unavailable",disabled:a?.resolution==="not_applicable",options:d.map(p=>{let g=o({...s,[e.key]:p})[e.key];return{value:p,label:g.display,full_value:g.full_value}})}}function Nr(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let n=e.createElement("h2"),r=e.createElement("textarea"),o=e.createElement("div"),s=e.createElement("button"),i=e.createElement("button");return n.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",r.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",r.maxLength=4e3,o.className="resume-instructions-dialog__actions",s.type="button",s.textContent="\uC774\uC5B4\uD558\uAE30",i.type="button",i.textContent="\uCDE8\uC18C",o.append(s,i),t.append(n,r,o),e.body.append(t),new Promise(l=>{let a=!1,c=p=>{a||(a=!0,typeof t.close=="function"&&t.close(),t.remove(),l(p))},d=()=>c(r.value.trim());s.addEventListener("click",d),i.addEventListener("click",()=>c(null)),r.addEventListener("keydown",p=>{p.key==="Enter"&&(p.ctrlKey||p.metaKey)&&(p.preventDefault(),d())}),t.addEventListener("cancel",p=>{p.preventDefault(),c(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),r.focus()})}function Ui(e){return`session:${e.provider}:${e.session_id}`}function uo(e){return`${e.provider} \xB7 ${e.session_id.slice(0,8)}`}function k_(e,t){return e.current&&t==="in_progress"&&e.locality==="local"?"running":"done"}function qr(e,t,n,r){return{attempt_id:Ui(e),session_ref:{bead_id:t,provider:e.provider,session_id:e.session_id},...typeof r=="string"&&r.length>0?{root_dir:r}:{},hide_prompt:!0,meta:{runner:e.provider,label:uo(e),session_id:e.session_id,...typeof e.resume_command=="string"&&e.resume_command.length>0?{resume_command:e.resume_command}:{},status:k_(e,n)}}}var Wi="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",$_="\uBD84\uD574 \uC5C6\uC74C \u2014 \uCD1D\uB7C9\uB9CC \uBCF4\uACE0\uB428",gc="\uBD84\uD574 \uC5C6\uB294 leg";function Bt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var In=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],Fr=[...In,"reasoning_output_tokens"],x_={codex:["implementation","review-consult"],claude:["subagent"]};function zi(e){return!e||typeof e!="object"?!1:Number.isFinite(e.total_tokens)&&!In.some(t=>Number.isFinite(e[t]))}function A_(e){return!e||typeof e!="object"?!1:Fr.some(t=>Number.isFinite(e[t]))}function Hi(e){let t=0;for(let n of In)t+=Bt(e?.[n]);return t}function S_(e){return!e||typeof e!="object"?!1:In.some(t=>Number.isFinite(e[t]))}function hc(e){return!e||typeof e!="object"?!1:Fr.some(t=>Number.isFinite(e[t]))||Number.isFinite(e.total_tokens)}function E_(e){let t={};for(let n of Fr)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function bc(e){let t={};for(let n of Fr)Number.isFinite(e[n])&&(t[n]=e[n]);return Number.isFinite(e.total_tokens)&&(t.total_tokens=e.total_tokens),e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function yc(e,t){return zi(t)?Bt(t.total_tokens):e==="codex"?Bt(t.input_tokens)+Bt(t.output_tokens):Hi(t)}function T_(e){return e==="claude"?"Claude":"Codex"}function C_(e){return`\u03C4 ${wc(e)}`}function R_(e,t){let n=t.breakdown||{},r=Bt(t.total_only_subtotal);if(zi(n)||r>0&&!A_(n)){let c=[`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,$_];return t.replayed&&c.push(Wi),c.join(`
`)}let o=[`\uC785\uB825 ${Bt(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Bt(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?o.push(`\uCE90\uC2DC\uC77D\uAE30 ${Bt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Bt(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(o.push(`\uCE90\uC2DC\uC77D\uAE30 ${Bt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${Bt(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&o.push(`\uCD94\uB860\uCD9C\uB825 ${Bt(n.reasoning_output_tokens).toLocaleString("en-US")}`)),r>0&&o.push(`${gc} ${r.toLocaleString("en-US")}`);let s=e==="claude"?"\uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"\uC785\uB825 + \uCD9C\uB825",i=r>0?`${s} + ${gc}`:s,a=[e==="claude"?`Claude subtotal = ${i}`:`Codex subtotal = ${i}; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset`,`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,o.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&a.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&a.push(Wi),a.join(`
`)}function Qt(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];r&&t.push({provider:n,label:`${T_(n)} ${C_(r.subtotal)}${typeof r.total_cost_usd=="number"&&Number.isFinite(r.total_cost_usd)?` \xB7 $${r.total_cost_usd.toFixed(2)}`:""}`,tooltip:R_(n,r)})}return t}function hs(e){let t={},n={claude:!0,codex:!1},r={claude:0,codex:0};for(let o of e)if(!(!o||!o.providers))for(let s of["claude","codex"]){let i=o.providers[s];if(!i)continue;let l=t[s];l||(l={subtotal:0,breakdown:{}},t[s]=l),l.subtotal+=i.subtotal,Number.isFinite(i.total_only_subtotal)&&(l.total_only_subtotal=Bt(l.total_only_subtotal)+Bt(i.total_only_subtotal));for(let a of Fr)Number.isFinite(i.breakdown[a])&&(l.breakdown[a]=Bt(l.breakdown[a])+Bt(i.breakdown[a]));i.replayed&&(l.replayed=!0),s==="claude"&&(typeof i.total_cost_usd=="number"&&Number.isFinite(i.total_cost_usd)?r.claude+=i.total_cost_usd:n.claude=!1)}return t.claude&&n.claude&&(t.claude.total_cost_usd=r.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function Gi(e){return!e||typeof e!="object"?null:jn({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function O_(e){return e==="codex"?"codex":"claude"}function Ln(){return{subtotal:0,breakdown:E_(null),total_only:0,legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function gs(e,t,n){e.subtotal+=t.subtotal,zi(t.usage)&&(e.total_only+=t.subtotal);for(let r of Fr)Number.isFinite(t.usage[r])&&(e.breakdown[r]=Bt(e.breakdown[r])+Bt(t.usage[r]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),n&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function vc(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return e.total_only>0&&(n.total_only_subtotal=e.total_only),t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function wc(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function jr(e){return S_(e)?`\u03C4 ${wc(Hi(e))}`:null}function Fn(e){let t=jr(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function po(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${Bt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Bt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Bt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Bt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${Hi(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(Wi),n.join(`
`)}function jn(e,t){let n={claude:Ln(),codex:Ln()},r={orchestrator:{claude:Ln(),codex:Ln()},implementation:{claude:Ln(),codex:Ln()},"review-consult":{claude:Ln(),codex:Ln()},subagent:{claude:Ln(),codex:Ln()}},o=new Set;for(let l of Object.values(e||{})){if(!l||l.bead_id!==t)continue;let a=l.usage;if(hc(a)){let d=O_(l.runner),p=bc(a),g={provider:d,role:"orchestrator",attempt_id:String(l.attempt_id||""),usage:p,subtotal:yc(d,p)};p.replayed===!0&&(g.replayed=!0),typeof l.model=="string"&&(g.model=l.model),typeof l.session_id=="string"&&(g.session_id=l.session_id),gs(n[d],g,!0),gs(r.orchestrator[d],g,!0)}let c=Array.isArray(l.usage_legs)?l.usage_legs:[];for(let d of c){let p=d&&d.provider==="claude"?"claude":"codex";if(!d||d.provider!=="codex"&&d.provider!=="claude"||!x_[p].includes(d.role)||!hc(d.usage))continue;let g=typeof d.receipt_id=="string"&&d.receipt_id.length>0?d.receipt_id:null;if(!g||o.has(g))continue;o.add(g);let _=bc(d.usage),$={provider:p,role:d.role,attempt_id:String(l.attempt_id||""),usage:_,subtotal:yc(p,_)};$.receipt_id=g,typeof d.agent_type=="string"&&($.agent_type=d.agent_type),typeof d.agent_id=="string"&&($.agent_id=d.agent_id),typeof d.model=="string"&&($.model=d.model),typeof d.effort=="string"&&d.effort.trim().length>0&&($.effort=d.effort),typeof d.session_id=="string"?$.session_id=d.session_id:typeof d.thread_id=="string"&&($.session_id=d.thread_id),typeof d.turn_id=="string"&&($.turn_id=d.turn_id),(typeof d.completed_at=="string"||typeof d.completed_at=="number"&&Number.isFinite(d.completed_at))&&($.completed_at=d.completed_at),_.replayed===!0&&($.replayed=!0),gs(n[p],$,!1),gs(r[$.role][p],$,!1)}}let s={};for(let l of["claude","codex"]){let a=n[l];if(a.legs.length===0)continue;let c=vc(a,!1);l==="claude"&&a.outer_count>0&&a.outer_cost_count===a.outer_count&&(c.total_cost_usd=a.outer_cost),s[l]=c}if(Object.keys(s).length===0)return null;let i={};for(let l of["orchestrator","implementation","review-consult","subagent"]){let a={};for(let c of["claude","codex"]){let d=r[l][c];d.legs.length>0&&(a[c]={...vc(d,!0),legs:d.legs})}Object.keys(a).length>0&&(i[l]=a)}return{providers:s,roles:i}}var kc={running:3,paused:2,failed:1};function _r(e){if(!e||typeof e!="object")return!1;let t=e.kind;return t==null||t==="implementation"}function $c(e){let t=Object.values(e||{}),n=new Map;for(let r of t){if(!r||typeof r.bead_id!="string"||r.bead_id.length===0||r.kind!=="review_session"||r.status!=="running")continue;let o=typeof r.started_at=="number"?r.started_at:null,s=n.get(r.bead_id);s&&(s.started_at??0)>(o??0)||n.set(r.bead_id,{attempt:r,origin:r.origin==="click"||r.origin==="auto"?r.origin:null,started_at:o})}return n}function xc(e,t){let n=Object.values(e||{}),r=new Set,o=new Map;for(let i of n)!i||typeof i.bead_id!="string"||(typeof i.resumed_from=="string"&&i.resumed_from.length>0&&r.add(i.resumed_from),_r(i)&&o.set(i.bead_id,i.attempt_id));let s=new Map;for(let i of n){if(!i||typeof i.bead_id!="string"||i.bead_id.length===0||!_r(i))continue;let l=null;if(i.status==="running")l="running";else if(i.status==="paused"&&!r.has(i.attempt_id))l="paused";else if(i.status==="failed"||i.status==="orphaned"){let d=t.get(i.bead_id),p=typeof d=="number"&&d>0&&typeof i.finished_at=="number"&&d>=i.finished_at;o.get(i.bead_id)===i.attempt_id&&!p&&typeof i.dismissed_at!="number"&&(l="failed")}if(!l)continue;let a=typeof i.started_at=="number"?i.started_at:null,c=s.get(i.bead_id);if(c){let d=kc[c.run_state],p=kc[l];if(d>p||d===p&&(c.started_at??0)>(a??0))continue}s.set(i.bead_id,{attempt:i,run_state:l,started_at:a})}return{winners:s,resumed_from_ids:r}}var bs=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],Yi=[...bs.filter(e=>e!=="impl_dispatch"),"quick_fix_impl_model"],Bn=["orchestration_model","orchestration_effort","orchestration_speed"],Br=[...bs,...Bn],L_=Yi.filter(e=>Br.includes(e)),Ac=["delegated","main"],ys=["inherit","claude","codex"],fo=["default","fast"],_o=["standard","fast_track"],mo=["codex","opus","fable","self","skip"],vs=["codex","fable","skip"],ws=["low","medium","high","xhigh"],_n="auto";function fn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Sc(e){if(!fn(e)||!fn(e.runners))return[];let t=[];for(let[n,r]of Object.entries(e.runners))fn(r)&&fn(r.models)&&t.push([n,Object.keys(r.models)]);return t}function Ur(e,t){let n=Sc(e),r=t&&t!=="inherit"?n.filter(([o])=>o===t):n;return[_n,...r.flatMap(([,o])=>o)]}function Ec(e,t,n,r){if(!fn(e)||!fn(e.runners))return[_n];let o=[];for(let[s,i]of Object.entries(e.runners))if(!(!fn(i)||!fn(i.models))&&!(t&&t!=="inherit"&&s!==t))for(let[l,a]of Object.entries(i.models)){if(n&&n!==_n&&l!==n)continue;let c=r(i,a);if(Array.isArray(c))for(let d of c)typeof d=="string"&&!o.includes(d)&&o.push(d)}return[_n,...o]}function Wr(e,t,n){return Ec(e,t,n,(r,o)=>fn(o)&&Array.isArray(o.efforts)?o.efforts:r.efforts)}function Vi(e,t,n){return Ec(e,t,n,(r,o)=>fn(o)&&Array.isArray(o.orchestration_efforts)?o.orchestration_efforts:fn(o)&&Array.isArray(o.efforts)?o.efforts:r.efforts)}function go(e,t){let n=Sc(e);return(t?n.filter(([o])=>o===t):n).flatMap(([,o])=>o)}function Tc(e,t,n){let r={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},o=r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:r.impl_runtime==="inherit"?n:null;return o&&(r.impl_model&&!Ur(t,o).includes(r.impl_model)&&(r.impl_model=void 0),r.impl_effort&&!Wr(t,o,r.impl_model||_n).includes(r.impl_effort)&&(r.impl_effort=void 0)),r}var I_={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},Ki=[...L_,...Bn],P_=[...Br,...Yi].filter((e,t,n)=>n.indexOf(e)===t&&!Ki.includes(e));function Cc(e,t){let n=fn(e)?e:{},r=fn(t)?t:{},o=[];for(let i of Ki){let l=n[i]??null,a=r[i]??null;l!==a&&o.push({key:i,label:I_[i]||i,before:l,after:a,kind:l===null?"added":a===null?"removed":"changed"})}let s=[];for(let i of[...P_,...Object.keys(r)])!Ki.includes(i)&&!s.includes(i)&&Object.hasOwn(r,i)&&s.push(i);return{rows:o,ignored_keys:s}}function Qi(e,t,n,r,o,s){return ms({key:e,choices:t,layer:"global",global:n,resolution_global:s,execution_defaults:r,runner_catalog:o})}function Rc(e,t){let n={};for(let r of Yi){let o=e?.[r],s=t?.[r];o!==s&&(n[r]=typeof s=="string"&&s.length>0?s:null)}return n}function Oc(e,t){let n={};for(let r of Bn){let o=e?.[r]??null,s=t?.[r]??null;o!==s&&(n[r]=typeof s=="string"&&s.length>0?s:null)}return n}var Xi=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Bn]}],Xn={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},ks={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function Zi(e,t,n,r,o,s=null){let i=pn({pin:t,global:n,execution_defaults:r,runner_catalog:o,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:s});return e.map(l=>({key:l,...i[l]}))}function Lc(e,t,n,r,o,s=null){let i={pin:0,global:0,base:0};for(let l of Zi(e,t,n,r,o,s))i[l.source]+=1;return i}function Ic(e,t,n){return{id:e,key:t,value:typeof n=="string"?n:""}}function Pc(e,t,n){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:n}}var Ww=[...bs,...Bn];var Dc=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function ho(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function $s(e){if(!ho(e)||!ho(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>ho(n)&&ho(n.models));return t.length>0?t:null}function wn(e,t){let n=$s(e);if(!n||!t)return null;for(let[r,o]of n)if(Object.hasOwn(o.models,t))return r;return null}function Mc(e,t){return ho(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function Nc(e,t){let n=$s(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return Mc(r,r.models[t]);return[]}function D_(e){let t=$s(e);if(!t)return[];let n=[];for(let[,r]of t)for(let o of Object.values(r.models))for(let s of Mc(r,o))n.includes(s)||n.push(s);return n}function M_(e,t){if(!t)return D_(e);let r=$s(e)?.find(([s])=>s===t)?.[1];if(!r)return[];let o=[];for(let s of Object.keys(r.models))for(let i of Nc(e,s))o.includes(i)||o.push(i);return o}function qc(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},o=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!o)return r.impl_model="",r.impl_effort="",r;let s=wn(t,r.impl_model);if(r.impl_model&&(!o||s!==o))return r.impl_model="",r.impl_effort="",r;let i=r.impl_model?Nc(t,r.impl_model):M_(t,o);return r.impl_effort&&i.length>0&&!i.includes(r.impl_effort)&&(r.impl_effort=""),r}var Ji=new Set(["unavailable","not_applicable"]);function Zn(e,t){if(typeof e!="object"||e===null)return null;let n=e[t];return typeof n=="object"&&n!==null?n:null}function Fc(e){return e.filter(t=>t!==null).join(" \xB7 ")}function Jn(e,t){return t===null?null:`${Xn[e]}: ${t.display} (${ks[t.source]})`}function ea(e){return e.filter(t=>t!==null).join(`
`)}function ta(e){if(typeof e!="object"||e===null)return null;let t=fr(e);if(t==="")return null;let n=(r,o)=>typeof o=="string"&&o.length>0?`${r}: ${o}`:null;return{text:t,title:ea(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",n("runner",e.runner),n(Xn.orchestration_model,e.model),n(Xn.orchestration_effort,e.effort),n(Xn.orchestration_speed,e.speed)])}}function zr(e,t){let n=Zn(e,"orchestration_model");if(n===null||n.resolution==="unavailable")return null;let r=Zn(e,"orchestration_effort"),o=Zn(e,"orchestration_speed"),s=Fc([wn(t,n.value??""),n.display,r!==null&&r.value!==null?r.display:null,o!==null&&o.value==="fast"?"Fast":null]);return s===""?null:{text:s,title:ea(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",Jn("orchestration_model",n),Jn("orchestration_effort",r),Jn("orchestration_speed",o)])}}function N_(e,t){return e===null||e.value===null||Ji.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function q_(e){return e===null||Ji.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function F_(e){return e===null?null:e.value==="auto"?"auto":Ji.has(e.resolution)?null:e.display}function mr(e,t){if(typeof e!="object"||e===null)return null;let n=Zn(e,"impl_dispatch"),r=Zn(e,"impl_runtime"),o=Zn(e,"impl_model"),s=Zn(e,"impl_effort"),i=Zn(e,"impl_speed"),l=n!==null&&n.value==="main"?"\uBA54\uC778":Fc([N_(r,t??null),q_(o),F_(s),i!==null&&i.value==="fast"?"Fast":null]);return l===""?null:{text:l,title:ea(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",Jn("impl_dispatch",n),Jn("impl_runtime",r),Jn("impl_model",o),Jn("impl_effort",s),Jn("impl_speed",i)])}}var j_=["contract_change","multi_repo","open_design_fork","multi_phase","claude_bound"];var jc={orchestration_model:["fable"],impl_runtime:["claude"]},B_={unapplied:"\uBBF8\uC801\uC6A9",applied:"\uC801\uC6A9\uB428",diverged:"\uCD94\uCC9C\uACFC \uB2E4\uB984"};function Bc(e){return typeof e=="object"&&e!==null?e:null}function Uc(e,t){return typeof e=="string"&&t.includes(e)?e:""}function U_(e){return typeof e!="string"?[]:e.split("+").map(t=>t.trim()).filter(t=>j_.includes(t))}function bo(e,t=e){let n=Bc(e);if(!n)return null;let r=Uc(n.rec_orchestration_model,jc.orchestration_model);if(r.length===0)return null;let o=Uc(n.rec_impl_runtime,jc.impl_runtime),s={orchestration_model:r};o.length>0&&(s.impl_runtime=o);let i=Bc(t)||{},l=Object.keys(s),a=0,c=0;for(let p of l){let g=i[p];typeof g=="string"&&g.length>0&&(a+=1,g===s[p]&&(c+=1))}let d=a===0?"unapplied":c===l.length?"applied":"diverged";return{reasons:U_(n.rec_reason),rec:s,state:d}}function xs(e){if(!e||typeof e!="object")return"";let t=Array.isArray(e.reasons)?e.reasons:[],n=B_[e.state]||"",r=["\uBCF5\uC7A1\uD55C \uC791\uC5C5\uC73C\uB85C \uD310\uC815\uB428"];return t.length>0&&r.push(`\uC0AC\uC720: ${t.join(", ")}`),n.length>0&&r.push(`\uC0C1\uD0DC: ${n}`),r.join(`
`)}function As(e){return e.replace(/\/+$/,"")}function W_(e,t){let n=As(e),r=As(t);return n===r||r.startsWith(`${n}/`)||n.startsWith(`${r}/`)}function Ss(e,t){let n=new Set;for(let r of e)for(let o of t){if(!W_(r,o))continue;let s=As(r),i=As(o);n.add(s.length>=i.length?s:i)}return[...n].sort()}function na(e,t){return`${e}\0${t}`}function Wc(e){let t=new Map;for(let n of Array.isArray(e?.running)?e.running:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"running",state:"running"});for(let n of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let n of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let r=Array.isArray(n.sublanes?.parallel)?n.sublanes.parallel:Array.isArray(n.items)?n.items:[];for(let o of r)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:"parallel",position:o.queue_position});for(let o of Array.isArray(n.sublanes?.serial)?n.sublanes.serial:[])for(let s of o.items)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:o.id,position:s.queue_position})}for(let n of Array.isArray(e?.runnable)?e.runnable:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"runnable",state:"runnable"});for(let n of Array.isArray(e?.done)?e.done:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"done",state:"done"});return t}function ra(e,t){let n=Array.isArray(t)?t:[],r=e.indexOf("-"),o=r>0?e.slice(0,r):e;return n.some(s=>typeof s?.issue_prefix=="string"&&s.issue_prefix===o)?"internal":n.length>0&&n.every(s=>typeof s?.issue_prefix=="string")?"external":"unknown"}function yo(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function zc(e,t,n,r){let o=n.get(e);if(!!(o&&t&&o.root_dir===t.root_dir&&o.lane===t.lane&&typeof o.position=="number"&&typeof t.position=="number"&&o.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0};if(o)return{id:e,label:`\u{1F512} ${e} (${yo(o)})`,location_label:yo(o),scope:null,same_lane_ahead:!1};let i=ra(e,r),l=i==="internal"?"\uBBF8\uC801\uC7AC":i==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${l})`,location_label:l,scope:i,same_lane_ahead:!1}}function Hc(e){let t=Array.isArray(e)?e:[],n=new Map,r=new Map,o=new Map;for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let c=na(l.root_dir,a.id);n.set(c,{root_dir:l.root_dir,workspace_name:l.name,lane:a.id}),o.set(c,[]);for(let d of Array.isArray(a.items)?a.items:[])r.set(d.id,c)}for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let c=na(l.root_dir,a.id),d=Array.isArray(a.items)?a.items[0]:null,g=!!d&&d.queue_index===0&&(!Array.isArray(a.occupied_by)||a.occupied_by.length===0)&&Array.isArray(d.blocked_by)?d.blocked_by:[],_=o.get(c);if(_)for(let $ of g){let C=r.get($);C&&C!==c&&!_.includes(C)&&_.push(C)}}let s=(l,a)=>{let c=new Set,d=[l];for(;d.length>0;){let p=d.pop();if(p===a)return!0;!p||c.has(p)||(c.add(p),d.push(...o.get(p)||[]))}return!1},i=new Map;for(let[l,a]of o){let c=[];for(let d of a){let p=n.get(d);s(d,l)&&p&&c.push(p)}c.length>0&&i.set(l,c)}return i}function Gc(e,t){return na(e,t)}async function z_(e){let t=await nn(e);ge(t?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",t?"success":"error",1200)}function Es(e){return typeof e!="string"||e.length===0?"":u`<span class="worker-ev__copyline"
    ><code class="worker-ev__path">${e}</code
    ><button
      type="button"
      class="worker-ev__copy"
      data-seam="log-path-copy"
      title="로그 경로 복사"
      aria-label=${`\uB85C\uADF8 \uACBD\uB85C \uBCF5\uC0AC: ${e}`}
      @click=${()=>{z_(e)}}
    >
      ⧉
    </button></span
  >`}function Cs(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function Yc(e){return e==="session"?"bead\uAC00 in_progress\uB85C \uC7A1\uD78C \uB4A4 \uB2EB\uD788\uAE30\uAE4C\uC9C0\uC758 \uACBD\uACFC":"attempt \uC2E4\uD589 \uC2DC\uAC04 \uD569\uC0B0 (\uC7AC\uAC1C \uC138\uC158 \uD3EC\uD568)"}function gr(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let n=Math.floor(t/60);if(n<60)return`${n}\uBD84 ${Math.round(t-n*60)}\uCD08`;let r=Math.floor(n/60),o=n%60;return`${r}\uC2DC\uAC04 ${o}\uBD84`}function Vc(e,t){if(typeof e!="object"||e===null)return[];let n=!1,r=!1;for(let o of Object.values(e)){if(typeof o!="object"||o===null)continue;let s=o;s.bead_id!==t||s.kind!=="review_session"||(n=!0,r=r||s.origin==="auto")}return n?[r?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"]:[]}function Qc(e,t){if(typeof e!="object"||e===null)return{active:!1,failure:null};let n=!1,r=null,o=-1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let i=s;if(i.bead_id!==t||i.kind!=="review_session")continue;if(i.status==="pending"||i.status==="running"){n=!0;continue}if(i.status!=="failed")continue;let l=typeof i.finished_at=="number"?i.finished_at:0;l>=o&&(o=l,r=typeof i.cause=="string"&&i.cause.length>0?i.cause:null)}return n?{active:!0,failure:null}:{active:!1,failure:r}}function Xc(e,t){if(typeof e!="object"||e===null)return null;let n=0,r=!1;for(let o of Object.values(e)){if(typeof o!="object"||o===null)continue;let s=o;if(s.bead_id!==t)continue;let i=s.started_at,l=s.finished_at;typeof i!="number"||typeof l!="number"||!Number.isFinite(i)||!Number.isFinite(l)||l<i||(n+=l-i,r=!0)}return r?n:null}function Rs(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function H_(e,t){let n=Array.isArray(e)?e:[],r=Array.isArray(t)?t:[];if(n.length===0&&r.length===0)return null;let o=null;for(let i of n)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!o||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof o.finished_at=="number"?o.finished_at:0))&&(o=i);let s=n.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+r.length;return{deploy:o?{sha:Cs(o.target_sha),at:typeof o.finished_at=="number"?o.finished_at:null,elapsed_ms:typeof o.elapsed_ms=="number"?o.elapsed_ms:null}:null,unresolved:s,badge:s>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${s}`}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function Zc(e,t){let n=H_(e,t);return n?u`<button
    type="button"
    class="worker-repo-strip"
    data-seam="repo-ops-strip"
    aria-label="저장소 작업 타임라인 열기"
  >
    <span class="worker-repo-strip__cue" aria-hidden="true">▸</span>
    <span class="worker-repo-strip__name">저장소 작업</span>
    ${n.deploy?u`<span class="worker-repo-strip__fact">
          배포
          <code class="worker-repo-strip__sha">${n.deploy.sha}</code>
          <span class="worker-repo-strip__ok">✓ 최신</span>
          <span
            class="worker-repo-strip__ago"
            title=${n.deploy.at?Gt(n.deploy.at):""}
            >${Rs(n.deploy.at)}${n.deploy.elapsed_ms!==null?` \xB7 ${gr(n.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${n.badge.tone}"
      >${n.badge.label}</span
    >
  </button>`:""}function Hr(e){let t=tn(e.created_at),n=tn(e.updated_at);return!t&&!n?"":u`<div class="worker-mini__meta">
    ${t?u`<span title=${`\uC0DD\uC131 ${Gt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&n?u`<span>·</span>`:""}${n?u`<span title=${`\uC218\uC815 ${Gt(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </div>`}function G_(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function vo(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function Os(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function er(e,t,n={}){let o=Object.values(e&&typeof e=="object"?e:{}).filter(p=>p&&p.bead_id===t&&p.phase!=="done").sort((p,g)=>(p.requested_at||0)-(g.requested_at||0)).at(-1),s=typeof n.attempt_id=="string"&&n.attempt_id.length>0?n.attempt_id:typeof o?.attempt_id=="string"?o.attempt_id:null,i=n.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":n.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":n.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,l=typeof o?.last_error=="string"?o.last_error:null,a=o?G_(o.phase):null,c=o?.kind==="stale_work_backup_fresh",d=n.merged||o?.mode==="merged_revert"?"merged":"unmerged";return{action:!n.external&&!n.done,enabled:!i&&(!o||!!l),label:c?l?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":l?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:i||(l?c?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${l} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${l} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:o?`${a||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:d==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:s,operation:o||null,progress:a,error:l,confirmation:d}}function Jc(e){if(!e||e.quickfix_lane!==!0)return!1;let t=e.quickfix_landing;return!t||typeof t!="object"?!1:["repo_operations","branch_cleanup","parent_close"].includes(t.cursor)}function Ts(e){let t=e.discard;if(!t||!t.operation)return"";let n=t.operation,r=n.kind==="stale_work_backup_fresh"&&!t.error?null:n.backup?.path,o=n.original_pr,s=n.revert_pr;return u`<div
    class="worker-discard-receipt"
    role=${t.error?"alert":"status"}
  >
    <span>${t.progress}</span>
    ${t.error?u`<span>폐기 실패: ${t.error}</span>`:""}
    <code>작업: ${n.operation_id}</code>
    ${r?u`<code>백업: ${r}</code>`:t.error?u`<span>아직 아무것도 삭제하지 않음</span>`:""}
    ${o?.url?u`<a href=${o.url} target="_blank" rel="noreferrer noopener"
          >원본 PR #${o.number||"?"}</a
        >`:""}
    ${s?.url?u`<a href=${s.url} target="_blank" rel="noreferrer noopener"
          >revert PR #${s.number||"?"} ·
          ${s.state||"\uC0C1\uD0DC \uBBF8\uD655\uC778"}</a
        >`:""}
  </div>`}var K_={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function eu(e,t=!1){if(!e||typeof e!="object")return null;let n=e;if(n.reason!=="worktree_stale_work"||!n.stale_work||typeof n.stale_work!="object")return null;let r=n.stale_work,o=r.residue==="branch"?"branch":"worktree",s=r.state==="unique"?"unique":"unknown",i=r.summary&&typeof r.summary=="object"?r.summary:{};function l(c){return Number.isInteger(i[c])?Number(i[c]):0}let a=typeof r.cause=="string"?r.cause:"observe_failed";return{residue:o,state:s,title:o==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":s==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:K_[a]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:o==="branch"?`\uACE0\uC720 commit ${l("branch_ahead")}`:[`staged ${l("staged_count")}`,`unstaged ${l("unstaged_count")}`,`untracked ${l("untracked_count")}`,`branch ahead ${l("branch_ahead")}`,`HEAD ahead ${l("head_ahead")}`].join(" \xB7 "),action_id:typeof r.action_id=="string"?r.action_id:"",can_resume:r.can_resume===!0,can_continue:r.can_continue===!0,can_backup_fresh:r.can_backup_fresh===!0,can_recheck:r.can_recheck===!0,locked:t}}function Ls(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let n=t.pin===!0?" exec-chip--pin":"",r=t.pin===!0?`
\uC774\uC288 \uD540 \u2014 \uB808\uD3EC \uAE30\uBCF8\uAC12\uACFC \uB2E4\uB984`:"";return u`${e.orchestration?u`<span
        class="exec-chip exec-chip--orch${n}"
        title=${`${e.orchestration.title}${r}`}
        ><span class="exec-chip__k">오케</span
        ><span class="exec-chip__v">${e.orchestration.text}</span></span
      >`:""}${e.worker?u`<span
        class="exec-chip exec-chip--worker${n}"
        title=${`${e.worker.title}${r}`}
        ><span class="exec-chip__k">워커</span
        ><span class="exec-chip__v">${e.worker.text}</span></span
      >`:""}`}function Y_(e){return u`<div
    class="mon-overlap__popover"
    role="dialog"
    aria-label="scope 겹침"
  >
    ${e.rows.map(t=>u`<div class="mon-overlap__row">
          <div class="mon-overlap__hd">
            <span class="mon-overlap__rid">${t.id}</span>
            <span class="mon-overlap__rtitle">${t.title}</span>
            <span class="mon-overlap__rwhere">${t.location_label}</span>
          </div>
          <ul class="mon-overlap__paths">
            ${t.prefixes.map(n=>u`<li>${n}</li>`)}
          </ul>
          ${t.action.kind==="note"?u`<p class="mon-overlap__note">${t.action.text}</p>`:u`<button
                type="button"
                class="mon-overlap__place"
                data-counterpart-id=${t.id}
                ?disabled=${t.action.kind==="disabled"}
                title=${t.action.title}
              >
                ${t.action.label}
              </button>`}
        </div>`)}
  </div>`}function Is(e){if(!e)return"";let t=Array.isArray(e.predecessors)?e.predecessors:[],n=Array.isArray(e.released)?e.released:[],r=e.dependents||null,o=Array.isArray(e.overlaps)?e.overlaps:[],s=e.scope_missing===!0,i=e.popover||null,l=e.cross_lane||null,a=e.armed_lane||null;return t.length===0&&n.length===0&&!r&&o.length===0&&!s&&!l&&!a?"":u`<div class="worker-deps">
    ${l?u`<button
          type="button"
          class="worker-dep worker-dep--lane mon-lane__chip"
          data-lane-id=${l.lane_id}
          title="이 연결 레인으로 이동"
        >
          ${l.label}
        </button>`:""}
    ${a?u`<span
          class=${`worker-dep worker-dep--armed${a.orphan?" worker-dep--armed-orphan":""}`}
          title=${a.orphan?"\uC774 \uD56D\uBAA9\uC744 \uBC1C\uCC28\uD55C \uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uC2A4\uCF00\uC904\uB7EC\uB294 \uACC4\uC18D \uBC1C\uCC28\uD569\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778\uC774 \uC774 \uD56D\uBAA9\uC744 \uBC1C\uCC28\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uB808\uD3EC \uC790\uB3D9 \uC9C4\uD589\uACFC \uBB34\uAD00\uD569\uB2C8\uB2E4"}
          >${a.orphan?u`${a.label}<button
                  type="button"
                  class="worker-dep__label mon2-arm__release"
                  data-lane-id=${a.lane_id}
                >
                  해제
                </button>`:a.label}</span
        >`:""}
    ${t.map(c=>u`<span
          class=${`worker-dep worker-dep--pred${c.foreign?" worker-dep--foreign":""}`}
          title=${c.title||""}
          >${c.openable===!0?u`<button
                type="button"
                class="worker-dep__label worker-dep__open"
                data-dep-id=${c.id}
                data-root-dir=${c.root_dir||""}
              >
                ${c.label}
              </button>`:c.label}</span
        >`)}${n.map(c=>u`<span
          class=${`worker-dep worker-dep--released${c.foreign?" worker-dep--foreign":""}`}
          title=${c.title||""}
          >${c.openable===!0?u`<button
                type="button"
                class="worker-dep__label worker-dep__open"
                data-dep-id=${c.id}
                data-root-dir=${c.root_dir||""}
              >
                ${c.label}
              </button>`:c.label}</span
        >`)}${r?u`<span
          class="worker-dep worker-dep--dependents"
          title=${r.title}
          >→ 후속 ${r.count}</span
        >`:""}${o.map(c=>u`<button
          type="button"
          class="worker-dep worker-dep--overlap mon-overlap__chip"
          data-overlap-id=${c.id}
          aria-label=${`scope \uACB9\uCE68 ${c.id} (${c.location_label})`}
          title=${[`\uACB9\uCE68 ${c.id} (${c.location_label})`,...c.prefixes].join(`
`)}
        >
          ⧉ ${c.id}
        </button>`)}${s?u`<span
          class="worker-dep worker-dep--muted"
          title="겹침 판정 불가 — 아티팩트가 있으면 스펙/플랜 front-matter, 없으면 description \`## scope\`에 선언 필요"
          >scope 없음</span
        >`:""}${i?Y_(i):""}
  </div>`}function Ps(e){if(!e)return"";let t=e.chips||{},n=t.route||e.route,r=t.route_source==="derived"||e.route_source==="derived";return n?u`<span
    class="ctl-chip ctl-chip--route${r?" is-derived":""}"
    title=${r?"route \uBBF8\uD540 (metadata unset)":"route"}
    >${r?"unset":n}</span
  >`:""}function V_(e){let t=e?e.quick_fix_review:null;if(!t)return"";let n=t.state;if(n!=="reviewed"&&n!=="stale")return"";let r=Array.isArray(t.missing)?t.missing:[],o=[n==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",...r].join(`
`);return u`<span
    class="ctl-chip worker-card__qfr worker-card__qfr--${n}"
    title=${o}
    >${n==="reviewed"?"\uB9AC\uBDF0 \u2713":"\uB9AC\uBDF0 stale"}</span
  >`}function tu(e){return e?u`<button
    type="button"
    class="ctl-chip ctl-chip--from"
    data-from-id=${e}
    title=${`\uCD9C\uCC98 ${e} \uC5F4\uAE30`}
  >
    ↩ from ${e}
  </button>`:""}function Ds(e){return e?u`<span
    class="ctl-chip ctl-chip--label worker-card__rec"
    data-state=${e.state}
    title=${xs(e)}
    >${"\uBCF5\uC7A1"}</span
  >`:""}function nu(e,t){return!e||typeof t!="number"?"":u`<a
    class="worker-mini__pr"
    href=${e}
    target="_blank"
    rel="noreferrer noopener"
    title="PR 열기"
    >#${t} ↗</a
  >`}function Ms(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=Math.max(0,Math.min(4,Math.trunc(e)));return u`<span class="worker-pri" title=${`\uC6B0\uC120\uC21C\uC704 P${t}`}
    >P${t}</span
  >`}function Q_(e){let t=Array.isArray(e.badges)?e.badges:[],n=Qt(e.usage),r=Fn(e.usage),o=tn(e.done_at);return u`<div
    class="worker-mini worker-mini--static worker-mini--done worker-mini--three-line"
    draggable="false"
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-mini__row1">
      ${e.workspace_name?u`<span class="worker-mini__repo" title=${e.root_dir||""}
            >${e.workspace_name}</span
          >`:""}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${e.id}</span>
      ${nu(e.pr_url,e.pr_number)}${o?u`<span
            class="worker-mini__done-at"
            title=${`\uC644\uB8CC ${Gt(e.done_at)}`}
            >완료 ${o}</span
          >`:""}
      ${t.map(s=>u`<span
            class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
            >${s}</span
          >`)}
    </div>
    <div class="worker-mini__row2">
      <span class="worker-mini__title">${e.title}</span>
    </div>
    <div class="worker-mini__row3">
      ${n.length>0?n.map(s=>u`<span class="worker-usage" title=${s.tooltip}
                >${s.label}</span
              >`):r?u`<span class="worker-usage" title=${po(e.usage)}
              >${r}</span
            >`:""}
      ${typeof e.work_ms=="number"?u`<span
            class="worker-mini__work"
            title=${Yc(e.work_kind)}
            >작업 ${gr(e.work_ms)}</span
          >`:""}
    </div>
  </div>`}function kn(e,t={}){if(e.lane==="done"&&e.done_layout==="three_line")return Q_(e);let n=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],o=Qt(e.usage),s=Fn(e.usage),i=e.merge_step||null,l=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,a=e.lane==="done"&&!l,c=a?tn(e.done_at):"",d=n?u`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",p=typeof e.seq=="number"?u`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",g=e.worker_serial===!0?u`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",_=e.workspace_name?u`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",$=u`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,C=e.lane==="done"?"":Ps(e.workflow),M=e.lane==="done"?"":tu(e.from_id),K=Ms(e.priority),ie=u`<span class="worker-mini__title">${e.title}</span>`,ee=nu(e.pr_url,e.pr_number),j=r.map(ke=>ke===e.live_badge?u`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${ke}</span
        >`:u`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${ke===e.completion_badge&&e.completion_title||""}
          >${ke}</span
        >`),P=e.reason?u`<span class="worker-mini__reason">${e.reason}</span>`:"",I=o.length>0?o.map(ke=>u`<span class="worker-usage" title=${ke.tooltip}
              >${ke.label}</span
            >`):s?u`<span class="worker-usage" title=${po(e.usage)}
            >${s}</span
          >`:"",W=i?u`<span
        class="merge-step${i.failed?" merge-step--failed":""}"
        style=${`--progress: ${i.percent}%`}
        >${i.label}${i.index>0?u`<span class="merge-step__n"
              >${i.index}/${i.total}</span
            >`:""}</span
      >`:"",G=e.merge_action?u`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",te=e.cancel_action?u`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",N=e.discard,V=N?.action||e.discard_action?u`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${N?.attempt_id||""}
          data-operation-id=${N?.operation?.operation_id||""}
          data-discard-mode=${N?.confirmation||"unmerged"}
          ?disabled=${N?!N.enabled:e.discard_enabled===!1}
          title=${N?N.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${N?.label||"\uD3D0\uAE30"}
        </button>`:"",H=e.stale_work||null,X=H?u`${H.can_resume||H.can_continue?u`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${H.action_id}
            ?disabled=${H.locked}
          >
            기존 작업 이어가기
          </button>`:""}${H.can_backup_fresh?u`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${H.action_id}
            ?disabled=${H.locked}
          >
            백업 후 새로 시작
          </button>`:""}${H.can_recheck?u`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${H.action_id}
            ?disabled=${H.locked}
          >
            다시 확인
          </button>`:""}`:"",Re=H?u`<div class="worker-mini__stale">
        <strong>${H.title}</strong>
        <span>${H.summary}</span>
        <span>${H.cause}</span>
        ${H.can_backup_fresh?u`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",we=e.revise_action?u`<button
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
        </button>`:"",ce=!!(e.lane!=="pr_wait"&&!e.done&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)),F=Ds(e.rec),$e=Es(e.log_path),Se=_||C||M||ce||F||I||$e?u`<div class="worker-chips">
          ${_}${C}${M}${ce?Ls(e.exec_chips,{pin:e.exec_chips_pinned===!0}):""}${F}${I}${$e}
        </div>`:"",S=Is(e.dependency_chips),ne=Ts(e),Te=t.actions?t.actions:"",_e=!!(i||e.merge_action||e.cancel_action||e.discard_action||N?.operation||e.revise_action||H);return u`<div
    class="worker-mini${l?" worker-mini--card":""}${n?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${i?" worker-mini--merging":""}${i?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${i?`--progress: ${i.percent}%`:""}
    draggable=${n?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${a?u`<div class="worker-mini__row1">
            ${_}${$}${K}${M}${ee}${ie}${Te}
          </div>
          <div class="worker-mini__row2">
            ${I}${c?u`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${Gt(e.done_at)}`}
                  >완료 ${c}</span
                >`:""}${typeof e.work_ms=="number"?u`<span
                  class="worker-mini__work"
                  title=${Yc(e.work_kind)}
                  >작업 ${gr(e.work_ms)}</span
                >`:""}${j}${W}
            <span class="worker-mini__actions"
              >${G}${te}${V}</span
            >
            ${Hr(e)}
          </div>`:l?u`<div class="worker-mini__head">
              ${d}${p}${$}${K}${ee}${j}${g}${P}${Te}
            </div>
            <div class="worker-mini__body">${ie}${Re}</div>
            ${S}${Se}${_e?u`<div class="worker-mini__foot">
                  ${W}
                  <span class="worker-mini__actions"
                    >${G}${te}${V}${we}${X}</span
                  >
                  ${Ts(e)}
                </div>`:""}
            ${Hr(e)}`:u`<div class="worker-mini__line">
              ${d}${p}${$}${K}${ie}${ee}${j}${g}${P}${W}${G}${te}${V}${Te}
            </div>
            ${S}${Se}${ne} ${Hr(e)}`}
  </div>`}function X_(e,t){let n,r=[];for(let o of e){let s=o.group||"";s.length>0&&s!==n&&r.push(u`<div class="worker-card__place-group">${s}</div>`),n=s,r.push(u`<button
        type="button"
        class="worker-card__place-lane${s.length>0?" worker-card__place-lane--nested":""}"
        data-bead-id=${t}
        data-lane=${o.id}
        ?disabled=${o.disabled===!0}
        title=${o.title||`${o.label} \uB300\uAE30 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00`}
      >
        <span>${o.label}</span>
        ${typeof o.count=="number"?u`<span class="worker-card__place-count">${o.count}</span>`:""}
      </button>`)}return u`${r}`}var Z_={exclusive_machine:"\uC2E4\uD589 \uC911 \uBA38\uC2E0 \uB3C5\uC810 \uD544\uC694 \u2014 \uBD80\uD558 \uD558\uB124\uC2A4\xB7timing \uBE44\uAD50",iterative_user_judgment:"\uAD6C\uD604 \uC911 \uC0AC\uC6A9\uC790 \uD310\uB2E8 \uBC18\uBCF5 \uAC1C\uC785 \uD544\uC694 \u2014 \uBB38\uC548\xB7\uB808\uC774\uC544\uC6C3\xB7\uC124\uACC4 \uBBF8\uC138\uC870\uC815",visual_verification:"\uB80C\uB354 \uACB0\uACFC \uC0AC\uB78C \uD655\uC778 \uD544\uC694 \u2014 \uC2A4\uD06C\uB9B0\uC0F7\xB7\uBAA9\uC5C5\xB7\uB77C\uC774\uBE0C \uD398\uC774\uC9C0"},Ns="\uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694";function sa(e,t=null,n={}){let r=e.worker_ineligible===!0,o=e.draggable&&!e.done&&!r,s=e.queue_placeable===!0&&!e.done&&!r,i=s&&t&&t.bead_id===e.id,l=e.session_preferred===!0,a=Z_[e.session_preferred_reason||""]||"",c=e.workflow,d=typeof e.reason=="string"?e.reason.split(" \xB7 "):[],p=d.includes("missing_description"),g=d.some(ee=>ee.startsWith(Ns)),_=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),$=Is(e.dependency_chips),C=e.workspace_name?u`<span class="worker-card__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",M=Ps(c),K=tu(e.from_id),ie=!!(e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker));return u`<div
    class="worker-card${o?"":" worker-card--static"}${r?" worker-card--ineligible":""}"
    draggable=${o?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${o?u`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span
      >${Ms(e.priority)}
      ${r?u`<span
            class="ctl-chip ctl-chip--label worker-card__ineligible"
            title="worker-ineligible label이 붙어 워커 실행 대상이 아닙니다"
            >worker-ineligible</span
          >`:l?u`<span
              class="ctl-chip ctl-chip--label worker-card__session-preferred"
              title=${a}
              >세션 권장</span
            >`:""}${Ds(e.rec)}${V_(c)}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${c?ds(c,e.status,{onOpenDoc:n.onOpenDoc}):""}${$}
    ${C||M||K||ie?u`<div class="worker-chips">
          ${C}${M}${K}${Ls(e.exec_chips,{pin:n.exec_chips_mode==="pinned_only"})}
        </div>`:""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${i?u`<div class="worker-card__place-menu">
            ${X_(t.lanes,e.id)}
            <button
              type="button"
              class="worker-card__place-cancel"
              data-bead-id=${e.id}
              title="레인 선택 취소"
              aria-label="레인 선택 취소"
            >
              ✕
            </button>
          </div>`:u`${e.reason?u`<span
                  class="worker-card__reason${_?" worker-card__reason--danger":""}"
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
              title=${s?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":r?"worker-ineligible label\uB85C \uC6CC\uCEE4\uC5D0\uC11C \uC2E4\uD589\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":g?"\uC0AC\uC6A9\uC790 \uB9AC\uBDF0\uB97C \uAE30\uB2E4\uB9AC\uB294 \uC911\uC774\uB77C \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":p?"description\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"spec\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
            >
              대기로 ↴
            </button>`}
    </div>
    ${Hr(e)}
  </div>`}function Pn(e){let t=!!e.collapsible&&!!e.collapsed,n=typeof e.count=="number"?e.count:e.items.length,r=u`<span
      class="worker-pane__dot worker-pane__dot--${e.lane}"
      aria-hidden="true"
    ></span>
    <span class="worker-pane__title">${e.title}</span>
    ${t&&e.preview?u`<span class="worker-pane__preview">${e.preview}</span>`:""}
    <span class="worker-pane__count">${n}</span>`;return u`<section
    class="worker-pane worker-pane--lane-${e.lane}${e.src?" worker-pane--src":""}${e.live?" worker-pane--live":""}${e.collapsible?" worker-pane--collapsible":""}${t?" worker-pane--collapsed":""}"
    id=${Jt(e.id||void 0)}
    data-lane=${e.lane}
  >
    ${e.collapsible?u`<header class="worker-pane__hd">
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
        </header>`:u`<header class="worker-pane__hd">
          ${r}${e.header_control?e.header_control:""}
        </header>`}
    ${t?"":u`${e.header_row?e.header_row:""}${e.controls?e.controls:""}
          <div class="worker-pane__body">
            ${e.body?e.body:e.items.length===0?u`<div class="worker-pane__empty">
                    ${e.empty||""}
                  </div>`:e.items.map(o=>e.lane==="candidate"?sa(o,e.place_menu,{onOpenDoc:e.onOpenDoc}):kn(o))}
          </div>`}
  </section>`}function Kc(e,t,n){return u`<button
      type="button"
      class="worker-wait__area-toggle"
      data-area=${e}
      aria-expanded=${n?"false":"true"}
      aria-label=${`${t} ${n?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
    >
      ${n?"\u25B8":"\u25BE"}
    </button>
    <span class="worker-wait__area-name">${t}</span>`}function qs(e){let t=e.parallel,n=e.serial,r=t.drop||{};return u`<div class="worker-wait">
    <section
      class="worker-wait__area worker-wait__area--parallel${t.collapsed?" is-collapsed":""}"
      data-area="parallel"
    >
      <header class="worker-wait__area-hd">
        ${Kc("parallel","\uBCD1\uB82C \uC601\uC5ED",t.collapsed)}
        <span class="worker-wait__area-count">${t.count}</span>
      </header>
      ${t.collapsed?"":u`<div
            class="worker-wait__area-body"
            data-drop=${Jt(r.drop)}
            data-root-dir=${Jt(r.root_dir)}
            data-lane-id=${Jt(r.lane_id)}
            data-lane-length=${Jt(r.lane_length)}
          >
            ${t.rows.length===0?u`<div class="worker-pane__empty">
                  비어 있음 — 드래그로 배치
                </div>`:t.rows}
          </div>`}
    </section>
    <section
      class="worker-wait__area worker-wait__area--serial${n.collapsed?" is-collapsed":""}"
      data-area="serial"
    >
      <header class="worker-wait__area-hd">
        ${Kc("serial","\uC9C1\uB82C \uC601\uC5ED",n.collapsed)}
        ${n.header_control?n.header_control:""}
      </header>
      ${n.collapsed?"":u`<div class="worker-wait__area-body">
            ${n.notice?n.notice:""}
            ${n.extra_panes?n.extra_panes:""}
            ${n.lanes.map(o=>J_(o))}
          </div>`}
    </section>
  </div>`}function J_(e){let t=e.drop||{},n=e.badge?u`<span
        class="worker-lane__badge${e.held?" worker-lane__badge--held":""}"
        >${e.badge}</span
      >`:"";return u`<div
    class="worker-wait__lane${e.empty?" worker-wait__lane--empty":""}"
  >
    ${Pn({id:typeof e.pane_id=="string"?e.pane_id:`worker-pane-lane-${e.id}`,lane:e.id,title:e.title,items:[],count:e.count,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:u`${n}${e.header_control?e.header_control:""}`,body:u`<div
        class="worker-wait__rows"
        data-drop=${Jt(t.drop)}
        data-root-dir=${Jt(t.root_dir)}
        data-lane-id=${Jt(t.lane_id)}
        data-lane-length=${Jt(t.lane_length)}
      >
        ${e.rows.length===0?u`<div class="worker-pane__empty">
              비어 있음 — 행을 여기로 드래그
            </div>`:e.rows}
      </div>`})}
    ${e.empty?u`<div class="worker-wait__hint">${e.title} · 비어 있음</div>`:""}
    ${e.cycle?u`<div class="worker-lane__cycle">
          ⚠ blocks 순환 감지 — 자동 정렬을 생략했습니다
        </div>`:""}
    ${e.after?e.after:""}
  </div>`}function Fs(e){return e.count?u`<section
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
  </section>`:""}var ru=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],wo=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function js(e,t){let n=ru.find(o=>o.step===e);if(!n)return null;let r=ru.length;return{step:n.step,label:t,index:n.index,total:r,percent:Math.round(n.index/r*100)}}function ou(e){let t=wo.findIndex(n=>n.step===e);return wo.map((n,r)=>({step:n.step,label:n.label,state:t<0?"todo":r<t?"done":r===t?"stall":"todo"}))}function hr(e){let t=wo.find(n=>n.step===e);return t?t.label:typeof e=="string"?e:""}function em(e){let t=wo.findIndex(n=>n.step===e);return t<0?null:{index:t+1,total:wo.length}}function Bs(e){let t=em(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var aa=new Set(["queued","running","retry_pending"]),su=new Set(["failed","succeeded"]),tm={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},ko={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},nm={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:ko.base_containment,child_sweep:ko.child_sweep,branch_cleanup:ko.branch_cleanup,parent_close:ko.parent_close};function rm(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function om(e,t,n){return!["verify","deploy"].includes(e.kind)||![...aa,...su].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(r=>r&&typeof r=="object"&&r.bead_id===t&&r.merged_sha===n)}function sm(e,t){let n=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(n!==0)return n;let r=c=>c.state==="succeeded"?1:2,o=r(t)-r(e);if(o!==0)return o;let s=typeof e.requested_at=="number"?e.requested_at:0,i=typeof t.requested_at=="number"?t.requested_at:0;if(s!==i)return i-s;let l=typeof e.operation_id=="string"?e.operation_id:"",a=typeof t.operation_id=="string"?t.operation_id:"";return l.localeCompare(a)}function ia(e,t=!1){let n=e.kind,r=n==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",o=t?"failed":e.state,s=tm[o];if(!s)return null;let i=js(n,`${r} ${s}`);return i?{...i,active:aa.has(o),failed:o==="failed"}:null}function im(e){return!e||typeof e!="object"?null:nm[e.step]||null}function $o(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,n=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},r=im(n),o=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,s=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),i=!s&&(e.cleanup_cursor==="repo_operations"||n.step==="repo_operations"),l=rm(e.merge_sha)?e.merge_sha:null,a=!s&&l&&Array.isArray(e.repo_operations)?e.repo_operations.filter($=>$&&typeof $=="object"&&om($,t,l)).sort(sm):[],c=i?a:[],d=c.find($=>aa.has($.state));if(d)return ia(d);if(o)return o.step==="repo_operations"&&a[0]?ia(a[0],!0):null;let p=c.find($=>su.has($.state)?$.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(p)return ia(p);if(r){let $=js(r.step,r.label);return $?{...$,active:!0,failed:!1}:null}let g=typeof e.cleanup_cursor=="string"?ko[e.cleanup_cursor]:null;if(!g)return null;let _=js(g.step,g.label);return _?{..._,active:!0,failed:!1}:null}function Us(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var am="\uBBF8\uC801\uC7AC";function la(e,t){let n=io(e,t.id);return{id:t.id,label:`\u26D3 blocked: ${t.id}`,title:`\uC774 \uC774\uC288\uB294 ${t.id}\uAC00 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4 (${t.location_label})`,...n?{foreign:!0}:{}}}var lm=10080*60*1e3;function iu(e,t,n){let r=t.closed_at;if(typeof r!="number"||!Number.isFinite(r)||r<n-lm)return null;let o=io(e,t.id),s=typeof t.root_dir=="string"?t.root_dir:"",i={id:t.id,label:`\u{1F513} \uD574\uC81C: ${t.id}`,title:`${t.id}\uAC00 ${Gt(r)}\uC5D0 close\uB418\uC5B4 \uC774 \uC774\uC288\uAC00 \uD480\uB838\uB2E4`,...o?{foreign:!0}:{}};return o?s.length>0&&(i.openable=!0,i.root_dir=s):i.openable=!0,i}function au(e){let t=e.count;if(typeof t!="number"||!Number.isFinite(t)||t<=0)return null;let n=Array.isArray(e.ids)?e.ids.filter(s=>typeof s=="string"&&s.length>0):[],r=t-n.length,o=[n.join(", "),r>0?`\uC678 ${r}`:""].filter(s=>s.length>0);return{count:t,title:`\uC774 \uC774\uC288\uAC00 close\uB418\uBA74 \uD480\uB9AC\uB294 \uC774\uC288: ${o.join(" ")}`}}function lu(e,t,n={}){let r=new Map,o=new Map;for(let s of t)o.has(s.id)||o.set(s.id,s.location_label);for(let[s,i]of e){if(typeof s!="string"||s.length===0)continue;let l=[];for(let a of Array.isArray(i)?i:[]){if(typeof a!="string"||a.length===0)continue;let c=la(s,{id:a,location_label:o.get(a)||am}),d=n[a];c.foreign!==!0?c.openable=!0:typeof d=="string"&&d.length>0&&(c.openable=!0,c.root_dir=d),l.push(c)}l.length>0&&r.set(s,l)}return r}var zs=1,xo=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],da=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Gr={show_blocked:!0,spec:"all"},cu={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"};function cm(e,t){let n=null;for(let r of Object.values(e||{}))!r||r.bead_id!==t||!_r(r)||(n=typeof r.status=="string"?r.status:null);return n}function um(e,t){let n=null,r=-1/0;for(let o of Object.values(e)){if(!o||o.bead_id!==t||o.status==="running"||!_r(o))continue;let s=typeof o.finished_at=="number"?o.finished_at:typeof o.started_at=="number"?o.started_at:0;s>=r&&(r=s,n=o)}return n}function dm(e,t,n={}){let{winners:r,resumed_from_ids:o}=xc(e,t),s=new Map;for(let[i,l]of r){let a=l.attempt,c=l.run_state,d=l.started_at,p=typeof a.session_id=="string"&&a.session_id.length>0,g=c!=="running"&&p&&!o.has(a.attempt_id),_=p?o.has(a.attempt_id)?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00",$=mt(n.observations?.[i]),C=mt($.pr),M=typeof a.merge_sha=="string"&&a.merge_sha.length>0||C.state==="MERGED",K=er(n.discard_operations,i,{attempt_id:a.attempt_id,merged:M}),ie=c==="failed"?{cause:typeof a.cause=="string"?a.cause:null,cause_detail:a.cause_detail&&typeof a.cause_detail=="object"?a.cause_detail:null,finished_at:typeof a.finished_at=="number"?a.finished_at:null,runner:typeof a.runner=="string"?a.runner:null,model:typeof a.model=="string"?a.model:null,effort:typeof a.effort=="string"?a.effort:null,observed_effort:typeof a.observed_effort=="string"?a.observed_effort:null,speed:typeof a.speed=="string"?a.speed:null,attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",usage:a.usage&&typeof a.usage=="object"?a.usage:null,halted_auto_advance:a.halted_auto_advance===!0,quickfix_lane:a.quickfix_lane===!0,quickfix_landing:a.quickfix_landing&&typeof a.quickfix_landing=="object"?a.quickfix_landing:null,resume_eligible:g,resume_reason:_,landed:Jc(a),confirmation:K.confirmation}:null;s.set(i,{attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",run_state:c,started_at:d,last_event_at:typeof a.last_event_at=="number"?a.last_event_at:null,last_activity:a.last_activity&&typeof a.last_activity=="object"?a.last_activity:null,legs:Array.isArray(a.legs)?a.legs:[],runner:typeof a.runner=="string"?a.runner:null,model:typeof a.model=="string"?a.model:null,effort:typeof a.effort=="string"?a.effort:null,speed:typeof a.speed=="string"?a.speed:null,resumed_from:typeof a.resumed_from=="string"?a.resumed_from:null,continuation_mode:a.continuation_mode==="session"||a.continuation_mode==="fresh"?a.continuation_mode:null,status:typeof a.status=="string"?a.status:null,usage:jn(e,a.bead_id),...ie?{failure:ie}:{},can_pause:c==="running"&&p,can_resume:g})}return s}function uu(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"",o=r.indexOf(":");return o>0&&o<r.length-1?`\u26D4 ${r.slice(0,o)} (${r.slice(o+1)})`:`\u26D4 ${r}`}function mt(e){return e&&typeof e=="object"?e:{}}function pm(e,t,n){let r=mt(t);if(Object.keys(r).length===0)return null;let o=e.execution_defaults,s=e.runner_catalog,i=e.session_defaults;if(!o||!s||!i)return null;let l=g=>pn({pin:g,global:i,execution_defaults:o,runner_catalog:s,route:n}),a,c;try{a=l(r),c=l(null)}catch{return null}let d=du(zr(a,s),zr(c,s)),p=du(mr(a,null),mr(c,null));return d||p?{orchestration:d,worker:p}:null}function du(e,t){return!e||t&&t.text===e.text?null:e}var fm=2;function _m(e,t,n){let o=(t&&typeof t=="object"&&Array.isArray(t.released_by)?t.released_by:[]).filter(a=>a&&typeof a=="object"&&typeof a.id=="string").slice().sort((a,c)=>(typeof c.closed_at=="number"?c.closed_at:0)-(typeof a.closed_at=="number"?a.closed_at:0)),s=[];for(let a of o){let c=iu(e,a,n);c&&s.push(c)}if(s.length===0)return null;let i=s.slice(0,fm),l=s.length-i.length;if(l>0){let a=i[i.length-1];i[i.length-1]={...a,label:`${a.label} \uC678 ${l}`}}return i}function pa(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}var mm=new Set(["quick_fix","spec_backed","full_plan"]);function pu(e){return typeof e=="string"&&mm.has(e)}function gm(e){let t={...mt(e.session_defaults)};for(let n of["orchestration_model","orchestration_effort","orchestration_speed"]){let r=e[n];typeof r=="string"&&(t[n]=r)}return t}function hm(e,t,n){let r=e.runner_catalog??null,o=ua(e,t,n,null);if(!o)return null;let s=wn(r,o.orchestration_model.value??""),i=s===null?o:ua(e,t,n,s)||o,l=zr(i,r),a=mr(i,s);return l||a?{orchestration:l,worker:a}:null}function ua(e,t,n,r){let o=pu(n)?n:pu(t.route)?t.route:null;try{return pn({pin:t,global:gm(e),execution_defaults:e.execution_defaults??null,runner_catalog:e.runner_catalog??null,route:o,controller_runtime:r})}catch{return null}}function bm(e,t,n){return!t||!Object.hasOwn(t,"metadata")?null:mr(ua(e,mt(t.metadata),t.route,n),n)}function fa(e,t){let n=new Set,r=e;for(;r&&!n.has(r.attempt_id);){if(r.conflict_resolution===!0)return!0;n.add(r.attempt_id),r=typeof r.resumed_from=="string"&&r.resumed_from.length>0&&t.get(r.resumed_from)||null}return!1}function ym(e){let t={};for(let l of In)t[l]=0;let n=!1,r=0,o=0,s=0;for(let l of e){let a=l.usage;if(!a||typeof a!="object")continue;let c=!1;for(let d of In)Number.isFinite(a[d])&&(t[d]+=a[d],n=!0,c=!0);c&&(o+=1,Number.isFinite(a.total_cost_usd)&&(r+=a.total_cost_usd,s+=1))}o>0&&s===o&&(t.total_cost_usd=r);let i=e.map(l=>l.usage).filter(l=>l&&typeof l=="object"&&l.providers);return i.length>0?Qt(hs(i)):n?Fn(t):null}function fu(e,t){let n=ra(e,t);return n==="internal"?"\uBBF8\uC801\uC7AC":n==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function vm(e,t,n){let r=t.get(e);if(!r)return fu(e,n);if(typeof r.position=="number"){if(r.lane==="parallel")return`#${r.position}`;if(/^s[1-5]$/.test(r.lane))return`${r.lane} #${r.position}`}return yo(r)}function wm(e,t,n,r){let o=t.get(e);if(!o)return{label:fu(e,n),title:""};if(typeof o.position=="number"&&(o.lane==="parallel"||/^s[1-5]$/.test(o.lane))){let i=r.get(e),l=o.lane==="parallel"?"\uBCD1\uB82C":o.lane;return{label:i&&i.length>0?"\u{1F512} \uB300\uAE30":"\uB300\uAE30",title:`${o.workspace_name||o.root_dir} ${l} #${o.position}`}}return{label:o.state==="running"?"\u25B6 \uC2E4\uD589\uC911":yo(o),title:""}}function km(e,t){for(let n of Object.values(e||{}))if(n&&n.attempt_id===t&&typeof n.armed_by_lane=="string"&&n.armed_by_lane.length>0)return n.armed_by_lane;return null}function $m(e,t,n,r,o,s){return t==="draft"?{state:"draft",badge:"draft",run_label:null,can_stop:!1}:n.some(i=>s.failed_by_bead.get(i.id)===e)?{state:"failed",badge:"\u26D4 \uC2E4\uD328",run_label:"\u25B6 \uB2E4\uC2DC \uC9C4\uD589",can_stop:!1}:s.disarmed_lanes.has(e)?{state:"restart",badge:"\u23F8 \uC7AC\uC2DC\uC791",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}:n.some(i=>s.armed_by_bead.get(i.id)===e)?{state:"running",badge:"\u25B6 \uC9C4\uD589 \uC911",run_label:o.length>0?"\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589":null,can_stop:!0}:r?{state:"all_done",badge:"\uBAA8\uB450 \uC644\uB8CC",run_label:null,can_stop:!1}:{state:"confirmed",badge:"\uD655\uC815",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}}function xm(e,t,n,r,o,s,i){let l=[];return e.forEach((a,c)=>{let d=typeof a.id=="string"?a.id:"";if(d.length===0)return;let p=a.status==="confirmed"?"confirmed":"draft",g=Array.isArray(a.entries)?a.entries:[],_=[];g.forEach((K,ie)=>{let ee=K&&typeof K.bead_id=="string"?K.bead_id:"";if(ee.length===0)return;let j=K&&typeof K.root_dir=="string"?K.root_dir:"",P=n.get(ee),I=P?P.state:void 0,W=I==="running"||I==="pr_wait"||I==="done",G=!P||I==="runnable",te=P&&P.lane==="parallel"&&typeof P.position=="number"?P.position-1:null,N=wm(ee,n,r,t),V=_.length>0?_[_.length-1].id:null,H=p==="confirmed"&&V!==null&&!(t.get(ee)||[]).includes(V);_.push({id:ee,title:o.get(ee)||ee,root_dir:P?P.root_dir:j,workspace_name:P?P.workspace_name:s.get(j)||"",seq:ie+1,location_label:N.label,location_title:N.title,draggable:!W,fixed:W,done:I==="done",unplaced:G,mismatch:H,...te!==null?{queue_index:te}:{}})}),_.forEach((K,ie)=>{K.seq=ie+1});let $=_.length>0&&_.every(K=>K.done),C=_.filter(K=>!K.fixed&&i.armed_by_bead.get(K.id)!==d).map(K=>K.id),M=$m(d,p,_,$,C,i);l.push({lane_id:d,status:p,draft:p==="draft",number:c+1,label:`\uC5F0\uACB0 ${c+1} \xB7 \uB808\uD3EC \uAC04`,rows:_,all_done:$,can_confirm:p==="draft"&&_.length>=2,has_mismatch:p==="confirmed"&&_.some(K=>K.mismatch||K.unplaced),unlaunched:C,...M})}),l}function Am(e,t,n){if(e.lane==="runnable"){let i=n.get(e.id);return i?i.length===0?{scope:[],state:"missing"}:{scope:i,state:"declared"}:{scope:[],state:void 0}}let r=t.get(e.root_dir),o=r?r[e.id]:void 0;if(!o||!Array.isArray(o.scope))return{scope:[],state:void 0};let s=o.scope.filter(i=>typeof i=="string"&&i.length>0);return{scope:s,state:s.length===0?"missing":"declared"}}function Sm(e,t,n,r,o){let s=new Map;for(let a of[...e.running,...e.queue,...e.runnable,...e.pr_wait]){if(!t.has(a.root_dir))continue;let c=`${a.root_dir}\0${a.id}`,d=s.get(c);if(d){d.cards.push(a);continue}let{scope:p,state:g}=Am(a,t,n);g!==void 0&&(a.scope_state=g),s.set(c,{cards:[a],scope:p})}let i=new Map;for(let a of s.values()){let c=a.cards[0].scope_state;if(c!==void 0)for(let g of a.cards)g.scope_state=c;if(a.scope.length===0)continue;let d=a.cards[0].root_dir,p=i.get(d);p?p.push(a):i.set(d,[a])}let l=(a,c,d)=>{let p=c.cards[0],g={id:p.id,title:p.title,location_label:vm(p.id,r,o),prefixes:d};for(let _ of a.cards)_.overlap_chips?_.overlap_chips.push(g):_.overlap_chips=[g]};for(let a of i.values())for(let c=0;c<a.length;c+=1)for(let d=c+1;d<a.length;d+=1){let p=Ss(a[c].scope,a[d].scope);p.length!==0&&(l(a[c],a[d],p),l(a[d],a[c],p))}}function ca(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function Ws(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function tr(e,t,n){let r=Array.isArray(e)?e:[],o=Array.isArray(t)?t:[],s=n&&typeof n.done_since=="number"?n.done_since:void 0,i={...Gr,...n&&n.candidate_filter?n.candidate_filter:{}},l=n&&Object.hasOwn(n,"cross_lanes")?n.cross_lanes??null:void 0,a=n&&n.candidate_sort==="as_given"?"as_given":n&&xo.some(x=>x.value===n.candidate_sort)?n.candidate_sort:"repo_spec",c=n&&n.groups==="all"?"all":"nonempty",d=n&&n.candidate_hidden_counts==="per_control"?"per_control":"sequential",p=Date.now(),g=new Map;for(let x of o)x&&typeof x.root_dir=="string"&&g.set(x.root_dir,x);let _=new Map;for(let x of o)x&&typeof x.root_dir=="string"&&_.set(x.root_dir,x.name||x.root_dir);for(let x of r)x&&typeof x.root_dir=="string"&&_.set(x.root_dir,x.name||x.root_dir);let $=[],C=[],M=[],K=[],ie=[],ee=[],j=new Map,P=new Map,I=new Map,W=new Map,G=new Map,te=new Map,N=new Map,V=new Map,H=new Map,X=new Map,Re=new Map,we=new Map,ce=new Set,F=new Map,$e=new Map,Se=new Map;for(let x of r){if(!x||typeof x.root_dir!="string")continue;let U=x.root_dir,ye=x.name||U,De=g.get(U),qe=De&&typeof De.revision=="number"?De.revision:typeof x.revision=="number"?x.revision:0,je=mt(x.attempts),ft=mt(x.bead_titles);for(let[h,A]of Object.entries(ft))typeof A=="string"&&A.length>0&&Se.set(h,A);let xt=mt(x.bead_times),Rt=mt(x.pr_observations),Ft=mt(x.admission),Mt=mt(x.revise_parked),bt=mt(x.merge_queue_state),Ve=mt(x.cleanup_failed),L=mt(x.discard_operations),oe=mt(x.bead_blocked_by);Object.hasOwn(x,"bead_scope")&&F.set(U,mt(x.bead_scope));let be=mt(x.bead_workflow),R=mt(x.pr_activity),Q=Array.isArray(x.repo_operations)?x.repo_operations:[];V.set(U,Q);let Ne=typeof x.declared_base=="string"?x.declared_base:null;N.set(U,Ne),te.set(U,Object.entries(Ve).map(([h,A])=>({bead_id:h,step:A&&A.step?A.step:"",reason:A&&A.reason?A.reason:"",at:A&&typeof A.at=="number"?A.at:null,detail:A&&typeof A.detail=="string"?A.detail:null,output_tail:A&&typeof A.output_tail=="string"&&A.output_tail?A.output_tail:void 0,log_path:A&&typeof A.log_path=="string"&&A.log_path?A.log_path:void 0,retry_count:A&&typeof A.retry_count=="number"&&Number.isInteger(A.retry_count)&&A.retry_count>0?A.retry_count:0,failure_code:A&&typeof A.failure_code=="string"?A.failure_code:void 0})));for(let[h,A]of Object.entries(mt(x.bead_overlay)))A&&typeof A=="object"&&H.set(`${U}\0${h}`,A);let Ye=new Map;for(let h of Object.values(je))h&&typeof h.attempt_id=="string"&&Ye.set(h.attempt_id,h);let Me=Array.isArray(x.merge_queue)?x.merge_queue:[],nt=new Set(Me.filter(h=>h&&typeof h.bead_id=="string").map(h=>h.bead_id)),at=new Map(Me.filter(h=>h&&typeof h.bead_id=="string").map(h=>[h.bead_id,h])),ze=new Map,rt=new Map,vt=new Map,Ge=new Map;Me.forEach((h,A)=>{h&&typeof h.bead_id=="string"&&(ze.set(h.bead_id,A+1),rt.set(h.bead_id,h.resolution),vt.set(h.bead_id,h.continuation_action||null),Ge.set(h.bead_id,h.authority||null))});let Ot=mt(x.auto_merge_skips),Xe=h=>{let A=Ot[h];if(!A)return null;let J=mt(mt(Rt[h]).pr).head_sha;return J&&J===A.head_sha?A.reason||"":null};G.set(U,{positions:ze,resolutions:rt,continuations:vt,authorities:Ge,state:{active:typeof bt.active=="string"?bt.active:null,failures:mt(bt.failures),waiting:bt.waiting&&typeof bt.waiting.bead_id=="string"&&typeof bt.waiting.reason=="string"?bt.waiting:null},auto_excluded:(Array.isArray(x.pr_wait)?x.pr_wait:[]).map(h=>h&&h.bead_id).filter(h=>typeof h=="string"&&Xe(h)!==null),running:Me.length>0});let st=Array.isArray(x.queue)?x.queue:[];for(let h of[...st,...Array.isArray(x.pr_wait)?x.pr_wait:[]])h&&typeof h.bead_id=="string"&&typeof h.armed_by_lane=="string"&&h.armed_by_lane.length>0&&Re.set(h.bead_id,h.armed_by_lane);for(let h of Array.isArray(x.disarmed_on_load)?x.disarmed_on_load:[])typeof h=="string"&&h.length>0&&ce.add(h);let Nt=(Array.isArray(x.serial_lanes)?x.serial_lanes:[]).filter(h=>h&&/^s[1-5]$/.test(h.id)&&Array.isArray(h.entries)),At=mt(x.lane_states),St=typeof x.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(x.serial_lane_count))):Math.min(5,Nt.length);I.set(U,St),W.set(U,st.length);let Vt=new Map(Nt.map(h=>[h.id,h])),en=new Map;for(let h of Nt)for(let A of h.entries)A&&typeof A.bead_id=="string"&&en.set(A.bead_id,h.id);for(let[h,A]of Object.entries(oe))Array.isArray(A)&&X.set(h,A.filter(J=>typeof J=="string"&&J.length>0));let Wt=Array.isArray(x.done)?x.done:[];for(let h of Wt)h&&typeof h.bead_id=="string"&&ee.push({id:h.bead_id,root_dir:U,workspace_name:ye});let zt=new Map;for(let h of Wt)h&&typeof h.bead_id=="string"&&typeof h.added_at=="number"&&zt.set(h.bead_id,h.added_at);let Tt=h=>({id:h,title:ft[h]||h,root_dir:U,workspace_name:ye,expected_revision:qe,draggable:!1,...mt(xt[h]).created_at?{created_at:mt(xt[h]).created_at}:{},...mt(xt[h]).updated_at?{updated_at:mt(xt[h]).updated_at}:{}}),mn=h=>{let A=be[h]?.chips?.pr;return A&&typeof A.number=="number"&&typeof A.url=="string"?{pr_number:A.number,pr_url:A.url}:{}},Kt=h=>Object.hasOwn(oe,h)?{blocked_by:Array.isArray(oe[h])?oe[h].filter(A=>typeof A=="string"&&A.length>0):[]}:{},kt=new Set;for(let[h,A]of dm(je,zt,{discard_operations:L,observations:Rt})){kt.add(h);let J=A.run_state==="failed"?km(je,A.attempt_id):null;J!==null&&we.set(h,J);let Fe=Ye.get(A.attempt_id)||null,Le=H.get(`${U}\0${h}`),Ke=Le&&Le.rollup?Le.rollup:null,yt=pa(Ne,Fe?Fe.target_base:null),gt=Fe?fa(Fe,Ye):!1,_t=Fe&&Fe.quickfix_lane===!0&&Fe.quickfix_landing&&typeof Fe.quickfix_landing=="object"?Fe.quickfix_landing:null,lt=_t&&typeof _t.reason=="string"&&_t.reason.length>0?_t.reason:null,m=_t?$o({bead_id:h,merge_sha:_t.head_sha,cleanup_cursor:_t.cursor,cleanup_failed:lt?{step:_t.cursor,reason:lt}:null,repo_operations:Q}):null;C.push({...Tt(h),lane:"running",...Kt(h),...en.has(h)?{serial_lane_id:en.get(h)}:{},attempt_id:A.attempt_id,run_state:A.run_state,status:A.status||void 0,workflow:be[h]||null,can_pause:A.can_pause,can_resume:A.can_resume,started_at:A.started_at,last_event_at:A.last_event_at,last_activity:A.last_activity,legs:A.legs,runner:A.runner,model:A.model,effort:A.effort,speed:A.speed,resumed_from:A.resumed_from,continuation_mode:A.continuation_mode,usage:A.usage,failure:A.failure||null,exec_chips:{orchestration:ta(A),worker:bm(mt(De),Le,A.runner||null)},discard:er(L,h,{attempt_id:A.attempt_id,merged:A.failure?.confirmation==="merged"||mt(Rt[h]).pr?.state==="MERGED"}),...Ke?{rollup:Ke}:{},...gt?{conflict_resolution:!0}:{},...yt?{base_exception:yt}:{},...m?{landing:m}:{},badges:A.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:A.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:A.run_state==="failed"})}for(let[h,A]of $c(je)){if(C.some(Fe=>Fe.id===h))continue;let J=A.attempt;C.push({...Tt(h),lane:"running",kind:"session",...Kt(h),attempt_id:typeof J.attempt_id=="string"?J.attempt_id:"",run_state:"running",status:"running",non_occupying:!0,workflow:be[h]||null,can_pause:!1,can_resume:!1,started_at:A.started_at,last_event_at:typeof J.last_event_at=="number"?J.last_event_at:null,last_activity:J.last_activity&&typeof J.last_activity=="object"?J.last_activity:null,legs:Array.isArray(J.legs)?J.legs:[],runner:typeof J.runner=="string"?J.runner:null,model:typeof J.model=="string"?J.model:null,effort:typeof J.effort=="string"?J.effort:null,speed:typeof J.speed=="string"?J.speed:null,resumed_from:null,continuation_mode:null,usage:J.usage&&typeof J.usage=="object"?J.usage:null,exec_chips:{orchestration:ta(J),worker:null},discard:er(L,h,{merge_queued:!0}),badges:[A.origin==="auto"?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"],alert:!1})}for(let h of Array.isArray(x.session_active)?x.session_active:[]){let A=h&&h.bead_id;typeof A!="string"||kt.has(A)||(kt.add(A),Array.isArray(h.blocked_by)&&h.blocked_by.length>0&&X.set(A,h.blocked_by.filter(J=>typeof J=="string"&&J.length>0)),typeof h.title=="string"&&h.title.length>0&&Se.set(A,h.title),C.push({...Tt(A),title:h.title||ft[A]||A,lane:"running",kind:"session",status:"in_progress",started_at:ca(h.started_at)??ca(h.updated_at)??void 0,updated_at:ca(h.updated_at)??void 0,workflow:h.workflow||null,labels:Array.isArray(h.labels)?h.labels:[],spec_id:typeof h.spec_id=="string"?h.spec_id:"",blocked:h.blocked===!0,...Array.isArray(h.blocked_by)?{blocked_by:h.blocked_by.filter(J=>typeof J=="string"&&J.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,session_refs:Array.isArray(h.session_refs)?h.session_refs:[],badges:[],alert:!1}))}for(let h of Array.isArray(x.pr_wait)?x.pr_wait:[]){let A=h&&h.bead_id;if(typeof A!="string"||kt.has(A))continue;kt.add(A);let J=mt(Rt[A]),Fe=mt(J.pr),Le=J.gate?mt(J.gate):null,Ke=nt.has(A),yt=at.get(A)?.continuation_action||null,gt=!!yt&&yt.continuation===null,_t=bt.active===A,lt=h.external===!0,m=Ve[A]||null,b=mt(R[A]),T=$o({bead_id:A,merge_sha:h.merge_sha,cleanup_cursor:h.cleanup_cursor,merge_progress:b.merge_progress||null,cleanup_failed:m,repo_operations:Q}),D=Us(T),f=!!Le&&Le.base_badge==="\uCDA9\uB3CC",y=!!m&&["child_sweep","branch_cleanup","parent_close"].includes(m.step)&&!!Le&&Le.tier==="merged",Y=lt&&!!m&&!!Le&&Le.tier==="merged",ue=!!Le&&["closed_unmerged","review","undecidable"].includes(Le.tier)&&Le.reason!=="review_receipt_undetermined",Ee=er(L,A,{external:lt,merge_active:_t||T?.step==="merge",merge_queued:Ke,cleanup_active:D,merged:!!m||Le?.tier==="merged"}),v=!!Ee.operation;M.push({...Tt(A),lane:"pr_wait",...Kt(A),workflow:be[A]||null,pr_number:typeof Fe.number=="number"?Fe.number:null,pr_url:typeof Fe.url=="string"?Fe.url:void 0,external:lt,usage:jn(je,A),merge_step:T,badges:gt?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:T?[Le?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:m?[hr(m.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${hr(m.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof Le?.gate_badge=="string"&&Le.gate_badge.length>0?[Le.gate_badge]:[],alert:T?T.failed===!0:!!m||ue,reason:m&&T?.active!==!0?Bs(m.step):"PR \uB300\uAE30",merge_action:Le?.tier==="merged"&&!y&&!Y?!1:!Ke||gt,merge_enabled:!v&&(gt||Le?.enabled===!0||f||y||Y),merge_label:gt?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Y||y?"\uC815\uB9AC \uC7AC\uAC1C":f&&!y?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:gt?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":v?Ee.error?`\uD3D0\uAE30 \uC2E4\uD328: ${Ee.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${Ee.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Y?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":y?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":f?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":Le?.enabled===!0?`\uBA38\uC9C0 (${Le.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${Le?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:Ke&&!gt,cancel_enabled:!_t,continuation_mismatch:yt?.mismatch||null,discard:Ee,discard_action:Ee.action,discard_enabled:Ee.enabled,discard_title:Ee.title})}let Ht=(h,A,J,Fe)=>{let Le=h&&h.bead_id;if(typeof Le!="string"||kt.has(Le))return null;kt.add(Le);let Ke=Mt[Le],yt=er(L,Le),gt=yt.operation?yt:null,_t={...Tt(Le),lane:A,workflow:be[Le]||null,draggable:!gt,discard:gt||void 0,reason:uu(Ft,Le),seq:J+1,queue_position:J+1,queue_index:J,queue_length:Fe,badges:Ke?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!Ke,revise_action:!!Ke,revise_enabled:!!Ke&&!gt,revise_title:Ke?Ke.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Ke.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""},lt=Kt(Le);return Object.hasOwn(lt,"blocked_by")&&(_t.blocked_by=lt.blocked_by),_t};for(let h=0;h<st.length;h++){let A=Ht(st[h],"queue",h,st.length);if(!A)continue;K.push(A);let J=j.get(U);J?J.push(A):j.set(U,[A])}let cn=h=>{let A=M.find(Ke=>Ke.id===h&&Ke.root_dir===U);if(A)return{id:h,title:A.title,badge:"PR \uB300\uAE30 \xB7 \uC810\uC720"};let J=C.find(Ke=>Ke.id===h&&Ke.root_dir===U),Fe=J?J.run_state:cm(je,h),Le=Fe==="failed"||Fe==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":Fe==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720";return{id:h,title:J?J.title:Tt(h).title,badge:Le}},ve=[];for(let h=0;h<Math.max(St,Nt.length);h++){let A=`s${h+1}`,J=Vt.get(A),Fe=J&&Array.isArray(J.entries)?J.entries:[],Le=mt(At[A]),Ke=Array.isArray(Le.occupied_by)?Le.occupied_by.filter(_t=>typeof _t=="string"):[],yt=new Set(Ke),gt=[];for(let _t=0;_t<Fe.length;_t++){let lt=Fe[_t]&&Fe[_t].bead_id;if(typeof lt=="string"&&yt.has(lt)){kt.add(lt);continue}let m=Ht(Fe[_t],A,_t,Fe.length);m&&(gt.push(m),K.push(m))}gt.length===0&&Ke.length===0&&(St<=1||h>=St)||ve.push({id:A,index:h,items:gt,raw_length:Fe.length,occupied_by:Ke,occupants:Ke.map(_t=>cn(_t)),corrections:Array.isArray(Le.corrections)?Le.corrections.length:0,cycle:Le.cycle===!0,...gt.length===0&&Ke.length===0?{empty:!0}:{}})}P.set(U,ve);let E=Array.from({length:St},(h,A)=>{let J=`s${A+1}`,Fe=Vt.get(J),Le=Fe&&Array.isArray(Fe.entries)?Fe.entries:[],Ke=mt(At[J]);return{id:J,index:Le.length,length:Le.length,occupied_by:Array.isArray(Ke.occupied_by)?Ke.occupied_by.filter(yt=>typeof yt=="string"):[]}});for(let h of Array.isArray(x.runnable)?x.runnable:[]){let A=h&&h.bead_id;if(typeof A!="string"||kt.has(A))continue;kt.add(A);let J=h.workflow&&typeof h.workflow=="object"?h.workflow:null,Fe=J&&typeof J.route=="string"&&J.route||(typeof h.route=="string"?h.route:null),Le=pm(mt(De),h.exec_pins,Fe),Ke=bo(h.rec,h.exec_pins);Array.isArray(h.blocked_by)&&h.blocked_by.length>0&&X.set(A,h.blocked_by.filter(D=>typeof D=="string"&&D.length>0)),typeof h.title=="string"&&h.title.length>0&&Se.set(A,h.title),Array.isArray(h.scope)&&$e.set(A,h.scope.filter(D=>typeof D=="string"&&D.length>0));let yt=h.eligible!==!1,gt=h.worker_ineligible===!0,_t=Object.hasOwn(h,"eligible"),lt=[];typeof h.reason=="string"&&h.reason.length>0&&lt.push(h.reason);let m=uu(Ft,A);m&&lt.push(m);let b=_m(A,h.release_info,p),T=h.dependents_info&&typeof h.dependents_info=="object"?au(h.dependents_info):null;$.push({...Tt(A),title:h.title||ft[A]||A,lane:"runnable",draggable:!_t,queue_placeable:yt&&!gt,...gt?{worker_ineligible:!0}:{},...h.session_preferred===!0?{session_preferred:!0,session_preferred_reason:typeof h.session_preferred_reason=="string"?h.session_preferred_reason:""}:{},...b||T?{dependency_chips:{...b?{released:b}:{},...T?{dependents:T}:{}}}:{},reason:lt.join(" \xB7 "),created_at:h.created_at??void 0,updated_at:h.updated_at??void 0,status:typeof h.status=="string"?h.status:void 0,labels:Array.isArray(h.labels)?h.labels:[],spec_id:typeof h.spec_id=="string"?h.spec_id:"",published:h.published===!0,workflow:J||(Fe?{route:Fe,chips:{route:Fe}}:null),...Le?{exec_chips:Le}:{},...Ke?{rec:Ke}:{},blocked:h.blocked===!0,...Array.isArray(h.blocked_by)?{blocked_by:h.blocked_by.filter(D=>typeof D=="string"&&D.length>0)}:{},place_index:st.length,place_lanes:E})}for(let h of Wt){let A=h&&h.bead_id;if(typeof A!="string"||kt.has(A)||(kt.add(A),s!==void 0&&typeof h.added_at=="number"&&h.added_at<s))continue;let J=um(je,A),Fe=J&&typeof J.done_kind=="string"?J.done_kind:null;ie.push({...Tt(A),lane:"done",done:!0,done_layout:"three_line",usage:jn(je,A),work_ms:Xc(je,A),done_at:typeof h.added_at=="number"?h.added_at:void 0,done_kind:Fe,...mn(A),badges:[...Fe&&cu[Fe]?[cu[Fe]]:[],...Vc(je,A)]})}for(let h of Array.isArray(x.session_done)?x.session_done:[]){let A=h&&(h.id||h.bead_id);typeof A!="string"||kt.has(A)||(kt.add(A),ie.push({...Tt(A),...h,id:A,root_dir:U,workspace_name:ye,expected_revision:qe,lane:"done",done:!0}))}}if(H.size>0)for(let x of[...$,...K,...C,...M,...ie]){let U=H.get(`${x.root_dir}\0${x.id}`);if(!U||(typeof U.priority=="number"&&(x.priority=U.priority),typeof U.from_id=="string"&&U.from_id.length>0&&(x.from_id=U.from_id),!Object.hasOwn(U,"metadata")))continue;let ye=mt(U.metadata);if(x.rec=bo(ye),x.lane==="runnable"||x.lane.startsWith("s")||x.lane==="queue"){let De=hm(mt(g.get(x.root_dir)),ye,typeof U.route=="string"&&U.route.length>0?U.route:mt(x.workflow).route);De&&(x.exec_chips=De)}}let S=new Map;o.forEach((x,U)=>{x&&typeof x.root_dir=="string"&&S.set(x.root_dir,U)});let ne=n&&n.running_sort==="repo"?"repo":"started";C.sort((x,U)=>{let ye=x.kind==="session",De=U.kind==="session";if(ye!==De)return ye?1:-1;if(ye&&De){let ft=Ws(U.updated_at)-Ws(x.updated_at);return ft!==0?ft:x.id.localeCompare(U.id)}if(ne==="repo"){let ft=S.get(x.root_dir)??Number.MAX_SAFE_INTEGER,xt=S.get(U.root_dir)??Number.MAX_SAFE_INTEGER;if(ft!==xt)return ft-xt}let qe=typeof x.started_at=="number"&&Number.isFinite(x.started_at)?x.started_at:null,je=typeof U.started_at=="number"&&Number.isFinite(U.started_at)?U.started_at:null;return qe!==null&&je!==null&&qe!==je?qe-je:qe===null&&je!==null?1:qe!==null&&je===null?-1:x.id.localeCompare(U.id)}),ie.sort((x,U)=>(U.done_at??0)-(x.done_at??0));let Te=o.length>0?o:r.map(x=>({root_dir:x&&x.root_dir,name:x&&x.name,auto_advance:x&&x.auto_advance,auto_merge:x&&x.auto_merge,slots:x&&x.slots,revision:x&&x.revision,runner_catalog:x&&x.runner_catalog})),_e=new Set($.map(x=>x.root_dir)),ke=new Map;for(let x of C)x.kind==="session"||x.run_state!=="running"||ke.set(x.root_dir,(ke.get(x.root_dir)||0)+1);let he=new Map;for(let x of ie){let U=he.get(x.root_dir);U?U.push(x):he.set(x.root_dir,[x])}let Be={positions:new Map,resolutions:new Map,continuations:new Map,authorities:new Map,state:{active:null,failures:{},waiting:null},auto_excluded:[],running:!1},pt=[];for(let x of Te){if(!x||typeof x.root_dir!="string")continue;let U=j.get(x.root_dir)||[],ye=P.get(x.root_dir)||[],De=U.length>0||ye.some(ft=>ft.items.length>0||ft.occupied_by.length>0);if(c!=="all"&&!De&&!_e.has(x.root_dir))continue;let qe=typeof x.slots=="number"&&x.slots>=zs?x.slots:zs,je=ke.get(x.root_dir)||0;pt.push({live_count:je,over_cap:je>qe,merge:G.get(x.root_dir)||Be,token_total:ym(he.get(x.root_dir)||[]),cleanup_failures:te.get(x.root_dir)||[],declared_base:N.get(x.root_dir)??null,repo_operations:V.get(x.root_dir)||[],root_dir:x.root_dir,name:x.name||x.root_dir,auto_advance:x.auto_advance===!0,auto_merge:x.auto_merge===!0,slots:qe,revision:typeof x.revision=="number"?x.revision:0,runner_catalog:mt(x.runner_catalog),items:U,sublanes:{parallel:U,serial:ye},serial_lane_count:I.get(x.root_dir)||0,raw_queue_length:W.get(x.root_dir)||0})}let Pe={runnable:$,runnable_all:$,runnable_hidden:{blocked:0,spec:0},runnable_sections:[],runnable_flat:a==="updated_flat"||a==="as_given",queue:K,queue_groups:pt,running:C,pr_wait:M,done:ie,parallel_rows:[],chain_lanes:[],cross_lanes_revision:l&&typeof l.revision=="number"?l.revision:null,cross_lanes_unreadable:l===null,parallel_raw_length:Object.fromEntries(W),owner_of:{}},B=Wc(Pe);for(let x of ee)B.has(x.id)||B.set(x.id,{root_dir:x.root_dir,workspace_name:x.workspace_name,lane:"done",state:"done"});for(let x of[...Pe.queue,...Pe.runnable,...Pe.running,...Pe.pr_wait]){if(!Object.hasOwn(x,"blocked_by"))continue;let U=B.get(x.id);x.blockers=(x.blocked_by||[]).map(ye=>zc(ye,U,B,o))}for(let x of[...Pe.queue,...Pe.runnable,...Pe.running,...Pe.pr_wait]){let U=(x.blockers||[]).map(De=>{let qe=B.get(De.id)?.root_dir;return{...la(x.id,De),openable:!0,...typeof qe=="string"&&qe.length>0?{root_dir:qe}:{}}});if(U.length===0)continue;let ye={...x.dependency_chips||{},predecessors:U};x.dependency_chips=ye}Sm(Pe,F,$e,B,o);let de=Hc(Pe.queue_groups);for(let x of Pe.queue_groups)for(let U of x.sublanes.serial){let ye=de.get(Gc(x.root_dir,U.id));ye&&(U.cross_wait_peers=ye)}Pe.chain_lanes=xm(l&&Array.isArray(l.lanes)?l.lanes:[],X,B,o,Se,_,{armed_by_bead:Re,failed_by_bead:we,disarmed_lanes:ce});let ae=new Map;for(let x of[...Pe.queue,...Pe.runnable])ae.has(x.id)||ae.set(x.id,x);let le=new Set;for(let x of Pe.chain_lanes)for(let U of x.rows){if(x.status==="confirmed"&&!U.unplaced&&!U.fixed&&le.add(U.id),!x.draft&&!U.unplaced)continue;let ye=ae.get(U.id);ye&&(ye.cross_lane_chip={lane_id:x.lane_id,number:x.number,status:x.status,label:x.draft?`\uC5F0\uACB0 ${x.number} (draft)`:`\uC5F0\uACB0 ${x.number}`})}let xe=new Map(Pe.chain_lanes.map(x=>[x.lane_id,x.number]));for(let x of[...Pe.queue,...Pe.running]){let U=Re.get(x.id);if(typeof U!="string"||U.length===0)continue;let ye=xe.get(U);x.armed_lane_chip=ye===void 0?{lane_id:U,label:"\u25B6 \uC9C4\uD589 \uC911 \xB7 \uB808\uC778 \uC5C6\uC74C",orphan:!0}:{lane_id:U,label:`\u25B6 \uC5F0\uACB0 ${ye}`,orphan:!1}}let me=[];for(let x of j.values())for(let U of x)le.has(U.id)||me.push(U);me.sort((x,U)=>{let ye=x.workspace_name.localeCompare(U.workspace_name);return ye!==0?ye:(x.queue_index??0)-(U.queue_index??0)}),Pe.parallel_rows=me;let Oe={};for(let[x,U]of B)typeof U.root_dir=="string"&&U.root_dir.length>0&&(Oe[x]=U.root_dir);for(let x of Pe.chain_lanes)for(let U of x.rows)!Object.hasOwn(Oe,U.id)&&U.root_dir.length>0&&_.has(U.root_dir)&&(Oe[U.id]=U.root_dir);Pe.owner_of=Oe;let Qe=Pe.runnable.length;Pe.runnable_all=Pe.runnable.slice();let He=Pe.runnable,Ue=x=>i.show_blocked||x.blocked!==!0,re=x=>i.spec==="all"||(i.spec==="with"?x.published===!0:x.published!==!0);if(d==="per_control"){let x=[],U=0,ye=0;for(let De of He){let qe=Ue(De),je=re(De);qe&&je?x.push(De):!qe&&je?U+=1:qe&&!je&&(ye+=1)}He=x,Pe.runnable_hidden={blocked:U,spec:ye}}else{He=He.filter(Ue);let x=He.length;He=He.filter(re),Pe.runnable_hidden={blocked:Qe-x,spec:x-He.length}}let z=(x,U)=>{let ye=Ws(U.updated_at)-Ws(x.updated_at);return ye!==0?ye:x.id.localeCompare(U.id)},dt=a==="repo_spec"?(x,U)=>{let ye=x.published===!0?0:1,De=U.published===!0?0:1;return ye!==De?ye-De:z(x,U)}:z;if(a==="as_given")Pe.runnable=He,Pe.runnable_sections=[];else if(a==="updated_flat")Pe.runnable=He.slice().sort(z),Pe.runnable_sections=[];else{let x=new Map;for(let De of He){let qe=x.get(De.root_dir);qe?qe.push(De):x.set(De.root_dir,[De])}let U=[],ye=[];for(let De of Te){if(!De||typeof De.root_dir!="string")continue;let qe=(x.get(De.root_dir)||[]).slice().sort(dt);x.delete(De.root_dir),qe.length!==0&&(U.push({root_dir:De.root_dir,name:De.name||De.root_dir,items:qe.map(je=>({...je,workspace_name:""}))}),ye.push(...qe))}for(let[De,qe]of x){let je=qe.slice().sort(dt);U.push({root_dir:De,name:je[0]?.workspace_name||De,items:je.map(ft=>({...ft,workspace_name:""}))}),ye.push(...je)}Pe.runnable=ye,Pe.runnable_sections=U}return Pe}function _u(e,t){let n=new Map(e.map((a,c)=>[a,c])),r=new Map(e.map(a=>[a,new Set]));for(let a of t)a.blocker!==a.blockee&&n.has(a.blocker)&&n.has(a.blockee)&&r.get(a.blockee).add(a.blocker);let o=new Set,s=[];for(;s.length<e.length;){let a=e.find(c=>{if(o.has(c))return!1;for(let d of r.get(c))if(!o.has(d))return!1;return!0});if(a===void 0)return{order:[...e],corrections:[],cycle:!0};o.add(a),s.push(a)}let i=[],l=new Map(s.map((a,c)=>[a,c]));for(let a of s){let c=null;for(let d of r.get(a)){let p=Number(n.get(a))<Number(n.get(d)),g=Number(l.get(a))>Number(l.get(d));p&&g&&(c===null||Number(l.get(d))>Number(l.get(c)))&&(c=d)}c!==null&&i.push({bead_id:a,after:c})}return{order:s,corrections:i,cycle:!1}}var Em="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",Gs="\uC758\uC874 \uC790\uB8CC \uBBF8\uD655\uC815 \u2014 \uAD50\uC815 \uBCF4\uB958",Tm="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694",Cm="\uC774\uBBF8 \uC9C4\uD589 \uC911\uC778 \uC774\uC288 \uC55E\uC5D0\uB294 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",Kr="\uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";function Ao(e,t){return`${e}\0${t}`}function Rm(e,t){let n=new Set(e),r=new Map;for(let o of e){let s=t.placed_members.has(o)?t.snapshot_blocked_by:t.runnable_blocked_by,i=s instanceof Map?s.get(o):void 0;if(!Array.isArray(i))return null;r.set(o,i.filter(l=>l!==o&&n.has(l)))}return r}function Om(e,t){if(e.status!=="confirmed")return 0;let n=-1;return e.entries.forEach((r,o)=>{t.fixed_members.has(r.bead_id)&&(n=o)}),n+1}function To(e,t){let n=e.entries,r=n.map(p=>p.bead_id),o=Rm(r,t);if(o===null)return{entries:n,corrections:[],cycle:!1,held:!0,mismatched:[]};let s=[];for(let[p,g]of o)for(let _ of g)s.push({blocker:_,blockee:p});let i=Om(e,t),l=new Map(r.map((p,g)=>[p,g])),a=r.slice(0,i).filter(p=>o.get(p).some(g=>Number(l.get(g))>Number(l.get(p)))),c=_u(r.slice(i),s);if(c.cycle)return{entries:n,corrections:[],cycle:!0,held:!1,mismatched:a};let d=new Map(n.map(p=>[p.bead_id,p]));return{entries:[...n.slice(0,i),...c.order.map(p=>d.get(p))],corrections:c.corrections,cycle:!1,held:!1,mismatched:a}}function mu(e,t){let n=t.cross_lanes.get(e);return n===void 0?null:To(n,t)}function Lm(e,t){if(!(t.corrections.length===0&&!t.cycle&&!t.held&&t.mismatched.length===0))return{lane_id:e,corrected:t.corrections.length,cycle:t.cycle,held:t.held,mismatched:t.mismatched}}function Im(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function Pm(e){let t=new Map;for(let[n,r]of e)t.set(n,r.slice());return t}function _a(e,t,n){let r=new Set([t]),o=[t];for(;o.length>0;){let s=o.pop();for(let i of e.get(s)||[]){if(i===n)return!0;r.has(i)||(r.add(i),o.push(i))}}return!1}function Dm(e,t){let n=new Set;for(let[i,l]of t)for(let a of l)n.add(Ao(i,a));let r=new Map,o=new Map;for(let i of e){let l=Ao(i.a,i.b);r.set(l,i),o.set(l,i.type==="dep-add")}let s=[];for(let i of e){let l=Ao(i.a,i.b);r.get(l)===i&&o.get(l)!==n.has(l)&&s.push(i)}return s}function Mm(e,t,n){let r=e.parallel_rows,o=Math.max(0,Math.min(r.length,n)),s=r[o];if(s&&s.root_dir===t)return s.queue_index;for(let i=o-1;i>=0;i--)if(r[i].root_dir===t)return r[i].queue_index+1;for(let i=o;i<r.length;i++)if(r[i].root_dir===t)return r[i].queue_index;return e.parallel_raw_length.get(t)??0}function Nm(e,t){return e.parallel_rows.some(n=>n.root_dir===t)}function Hs(e,t,n,r){return{type:"worker-queue-place",payload:{bead_id:e,...r?{lane:r}:{},index:n},root_dir:t}}function ma(e,t){let n=0;for(let r of e.cross_lanes.keys())if(n+=1,r===t)return n;return n+1}function Co(e){let t=Pm(e.blocked_by_map),n=[],r=new Set,o={refusal:null},s=c=>{let d=e.owner_of.get(c);return typeof d!="string"||d.length===0?(o.refusal=Im(c),null):d};return{graph:t,dep_ops:n,state:o,ownerOf:s,addDep:(c,d,p)=>{if(o.refusal!==null||c===d)return;let g=t.get(c)||[];if(g.includes(d))return;let _=s(c);if(_!==null){if(_a(t,d,c)){o.refusal=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${c}\uAC00 \uC774\uBBF8 ${d}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}t.set(c,[...g,d]),p!==void 0&&r.add(Ao(c,d)),n.push({type:"dep-add",a:c,b:d,root_dir:_,...p===void 0?{}:{lane_id:p}})}},removeDep:(c,d)=>{if(o.refusal!==null||c===d)return;let p=t.get(c)||[];if(!p.includes(d))return;let g=s(c);g!==null&&(t.set(c,p.filter(_=>_!==d)),n.push({type:"dep-remove",a:c,b:d,root_dir:g}))},laneCreated:(c,d)=>r.has(Ao(c,d))}}function Ro(e,t,n,r,o={}){if(e.state.refusal!==null)return{refused:e.state.refusal};let s=Dm(e.dep_ops,t.blocked_by_map),i=s.filter(d=>d.type==="dep-remove"),l=s.filter(d=>d.type==="dep-add"),a=o.disarm_ops??[],c=o.lane_id===void 0||o.correction===void 0?void 0:Lm(o.lane_id,o.correction);return{lane_ops:n,ops:[...i,...a,...l,...r],lane_op_index:i.length+a.length,...c===void 0?{}:{correction:c}}}function gu(e,t,n){for(let r=1;r<t.length;r+=1)e.addDep(t[r].bead_id,t[r-1].bead_id,n)}function So(e,t){return t>0&&e.entries[t]?.dep_created_by_lane===!0}function hu(e,t,n,r){if(t.status!=="confirmed")return[];let o=[],s=new Map;for(let i of r){let l=e.owner_of.get(i.bead_id)||i.root_dir;typeof l!="string"||l.length===0||s.set(l,[...s.get(l)||[],i.bead_id])}for(let[i,l]of s)o.push({type:"worker-queue-disarm",payload:{bead_ids:l,lane_id:n},root_dir:i});return o}function bu(e,t,n,r){let o=new Map;for(let s of n){if(t.placed_members.has(s.bead_id))continue;let i=e.ownerOf(s.bead_id);if(i===null)return;let l=o.get(i)??0;r.push(Hs(s.bead_id,i,(t.parallel_raw_length.get(i)??0)+l)),o.set(i,l+1)}}function Eo(e){return e.map(t=>({bead_id:t.bead_id,root_dir:t.root_dir}))}function Ks(e,t){return e.length===t.length&&e.every((n,r)=>n.bead_id===t[r].bead_id&&n.root_dir===t[r].root_dir)}function Ys(e,t,n){let r=Co(n),o=[],s=[],i=[],l,a=n.owner_lane_of.get(e.bead_id),c=e.kind==="chain"?e.lane_id??a:void 0,d=c===void 0?void 0:n.cross_lanes.get(c);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:Em};if(t.kind==="chain"){if(e.kind==="repo-serial")return{refused:Tm};if(e.kind!=="chain"&&typeof a=="string"&&a!==t.lane_id&&n.cross_lanes.has(a))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${ma(n,a)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`};if(!n.cross_lanes.has(t.lane_id))return{refused:Kr}}if(e.kind==="chain"&&d===void 0)return{refused:Kr};let p=()=>{if(d===void 0||d.status!=="confirmed")return;let $=d.entries.findIndex(ee=>ee.bead_id===e.bead_id);if($<0)return;let C=$>0?d.entries[$-1]:null,M=$+1<d.entries.length?d.entries[$+1]:null,K=So(d,$),ie=M!==null&&So(d,$+1);K&&C!==null&&r.removeDep(e.bead_id,C.bead_id),ie&&M!==null&&r.removeDep(M.bead_id,e.bead_id),(K||ie)&&C!==null&&M!==null&&r.addDep(M.bead_id,C.bead_id,c)},g=($,C)=>{let M=n.cross_lanes.get($),K=M.entries.findIndex(N=>N.bead_id===e.bead_id),ie=M.entries.filter(N=>N.bead_id!==e.bead_id),ee=Math.max(0,Math.min(ie.length,K>=0&&C>K?C-1:C)),j=-1;if(ie.forEach((N,V)=>{n.fixed_members.has(N.bead_id)&&(j=V)}),ee<=j){r.state.refusal=Cm;return}let P=K>=0?M.entries[K]:d?.entries.find(N=>N.bead_id===e.bead_id)??{bead_id:e.bead_id,root_dir:e.root_dir};l=To({status:M.status,entries:[...ie.slice(0,ee),P,...ie.slice(ee)]},n);let I=l.entries;if(Ks(I,M.entries)||o.push({type:"monitor-lane-update",payload:{lane_id:$,entries:Eo(I)}}),M.status!=="confirmed")return;let W=I.findIndex(N=>N.bead_id===e.bead_id),G=W>0?I[W-1].bead_id:null,te=W+1<I.length?I[W+1].bead_id:null;if(G===null){te!==null&&r.addDep(te,e.bead_id,$);return}if(r.addDep(e.bead_id,G,$),te!==null&&(r.graph.get(te)||[]).includes(G)){let N=M.entries.findIndex(V=>V.bead_id===te);(r.laneCreated(te,G)||N>0&&M.entries[N-1].bead_id===G&&So(M,N))&&r.removeDep(te,G),r.addDep(te,e.bead_id,$)}},_=typeof e.queue_index=="number"?e.queue_index:n.queue_index_of.get(e.bead_id);if(e.kind==="chain"&&(p(),d!==void 0&&(t.kind!=="chain"||t.lane_id!==c)&&(i.push(...hu(n,d,c,d.entries.filter($=>$.bead_id===e.bead_id))),o.push({type:"monitor-lane-update",payload:{lane_id:c,entries:Eo(d.entries.filter($=>$.bead_id!==e.bead_id))}}))),t.kind==="chain"&&g(t.lane_id,t.marker_index),r.state.refusal!==null)return{refused:r.state.refusal};if(t.kind==="candidate")e.kind!=="candidate"&&s.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let $=Mm(n,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")s.push(Hs(e.bead_id,e.root_dir,$));else if(e.kind==="parallel"){let C=n.parallel_rows,M=C[Math.max(0,Math.min(C.length,t.marker_index))];if(!(!!M&&M.bead_id===e.bead_id)&&Nm(n,e.root_dir)&&_!==void 0){let ie=_>$?$:$-1;ie>=0&&ie!==_&&s.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:ie},root_dir:e.root_dir})}}}else if(t.kind==="chain"){let $=n.cross_lanes.get(t.lane_id);e.kind==="candidate"&&$.status==="confirmed"&&s.push(Hs(e.bead_id,e.root_dir,n.parallel_raw_length.get(e.root_dir)??0))}else if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(_!==void 0&&t.index!==_){let $=_>t.index?t.index:t.index-1;$>=0&&$!==_&&s.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:$},root_dir:e.root_dir})}}else s.push(Hs(e.bead_id,e.root_dir,t.index,t.lane_id));return Ro(r,n,o,s,{disarm_ops:i,...t.kind==="chain"?{lane_id:t.lane_id,correction:l}:{}})}function yu(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Kr};if(n.entries.length<2)return{refused:"\uD655\uC815\uD558\uB824\uBA74 \uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4"};let r=To(n,t);if(r.held)return{refused:Gs};let o=r.entries,s=Co(t),i=[];gu(s,o,e),s.state.refusal===null&&bu(s,t,o,i);let l=Ks(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Eo(o)}}];return l.push({type:"monitor-lane-confirm",payload:{lane_id:e}}),Ro(s,t,l,i,{lane_id:e,correction:r})}function vu(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Kr};let r=To(n,t),o=r.entries,s=Co(t),i=[];gu(s,o,e),s.state.refusal===null&&bu(s,t,o,i);let l=Ks(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Eo(o)}}];return Ro(s,t,l,i,{lane_id:e,correction:r})}function wu(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Kr};let r=To(n,t),o=r.entries;return Ro(Co(t),t,Ks(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Eo(o)}}],[],{lane_id:e,correction:r})}function ku(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Kr};let r=Co(t);if(n.status==="confirmed")for(let o=1;o<n.entries.length;o+=1)So(n,o)&&r.removeDep(n.entries[o].bead_id,n.entries[o-1].bead_id);return Ro(r,t,[{type:"monitor-lane-remove",payload:{lane_id:e}}],[],{disarm_ops:hu(t,n,e,n.entries)})}function $u(e,t){let n=t.cross_lanes.get(e);if(n===void 0||n.status!=="confirmed")return null;let r=[],o=[];for(let i=1;i<n.entries.length;i+=1){let l=`  ${n.entries[i].bead_id} \u2190 ${n.entries[i-1].bead_id}`;So(n,i)?r.push(l):o.push(`${l} (\uB808\uC778\uC774 \uB9CC\uB4E4\uC9C0 \uC54A\uC74C)`)}let s=`\uC5F0\uACB0 ${ma(t,e)}\uC744 \uC9C0\uC6C1\uB2C8\uB2E4.`;return r.length===0?`${s}
\uC758\uC874\uC740 \uADF8\uB300\uB85C \uB461\uB2C8\uB2E4`:[s,"\uD568\uAED8 \uC81C\uAC70\uD560 \uC758\uC874:",...r,...o.length===0?[]:["\uADF8\uB300\uB85C \uB450\uB294 \uC758\uC874:",...o]].join(`
`)}function xu(e){let t=new Map;for(let n of e)n.type!=="dep-add"||typeof n.lane_id!="string"||t.set(n.lane_id,[...t.get(n.lane_id)||[],{bead_id:n.a,after:n.b}]);return[...t].map(([n,r])=>({lane_id:n,pairs:r}))}function Au(e,t){let n=new Map(e.map((r,o)=>[r.bead_id,o]));return t.filter(r=>{let o=n.get(r.bead_id);return o!==void 0&&o>0&&e[o-1].bead_id===r.after})}function ga(e,t){if(e!==null){let n=t.owner_lane_of.get(e.bead_id);if(typeof n=="string"&&t.cross_lanes.has(n))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${ma(t,n)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`}}return{lane_ops:[{type:"monitor-lane-create",payload:{entries:e===null?[]:[e]}}],ops:[],lane_op_index:0}}var qm="\uC0AC\uC774\uD074";function Fm(e){let t=new Map,n=r=>Array.isArray(r)?r.filter(o=>typeof o=="string"&&o.length>0):[];for(let r of Array.isArray(e)?e:[]){if(!r||typeof r!="object")continue;let o=r.bead_blocked_by&&typeof r.bead_blocked_by=="object"?r.bead_blocked_by:{};for(let[s,i]of Object.entries(o))Array.isArray(i)&&t.set(s,n(i));for(let s of[...Array.isArray(r.runnable)?r.runnable:[],...Array.isArray(r.session_active)?r.session_active:[]])s&&typeof s.bead_id=="string"&&Array.isArray(s.blocked_by)&&s.blocked_by.length>0&&t.set(s.bead_id,n(s.blocked_by))}return t}function ha(e,t,n){let r=tr(e,t),o=[],s=new Set,i=(a,c)=>{for(let d of a)s.has(d.id)||(s.add(d.id),o.push({bead_id:d.id,root_dir:d.root_dir,workspace_name:d.workspace_name,title:d.title,lane:c}))};i(r.running,"running"),i(r.pr_wait,"pr_wait"),i(r.queue,"queue"),i(r.runnable_all,"runnable");let l=n&&typeof n.root_dir=="string"&&n.root_dir.length?n.root_dir:null;return{issues:l===null?o:o.filter(a=>a.root_dir===l),blocked_by_map:Fm(e)}}function Su(e,t){let n=new Map;for(let i of t.issues)!i||typeof i.bead_id!="string"||i.bead_id.length===0||n.has(i.bead_id)||n.set(i.bead_id,i);let r=n.get(e)?.root_dir,o=t.blocked_by_map.get(e)||[],s=[];for(let i of n.values()){if(i.bead_id===e||i.lane==="done"||o.includes(i.bead_id))continue;let l=_a(t.blocked_by_map,i.bead_id,e);s.push({...i,disabled:l,...l?{reason:qm}:{}})}return s.sort((i,l)=>{let a=r!==void 0&&i.root_dir===r,c=r!==void 0&&l.root_dir===r;return a!==c?a?-1:1:i.bead_id.localeCompare(l.bead_id)}),s}function Eu(e,t){let n=t.trim().toLowerCase();return n.length===0?e.slice():e.filter(r=>r.bead_id.toLowerCase().includes(n)||r.title.toLowerCase().includes(n))}var{entries:Mu,setPrototypeOf:Tu,isFrozen:jm,getPrototypeOf:Bm,getOwnPropertyDescriptor:Um}=Object,{freeze:on,seal:yn,create:xa}=Object,{apply:Aa,construct:Sa}=typeof Reflect<"u"&&Reflect;on||(on=function(t){return t});yn||(yn=function(t){return t});Aa||(Aa=function(t,n){for(var r=arguments.length,o=new Array(r>2?r-2:0),s=2;s<r;s++)o[s-2]=arguments[s];return t.apply(n,o)});Sa||(Sa=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return new t(...r)});var Vs=sn(Array.prototype.forEach),Wm=sn(Array.prototype.lastIndexOf),Cu=sn(Array.prototype.pop),Oo=sn(Array.prototype.push),zm=sn(Array.prototype.splice),Xs=sn(String.prototype.toLowerCase),ba=sn(String.prototype.toString),ya=sn(String.prototype.match),Lo=sn(String.prototype.replace),Hm=sn(String.prototype.indexOf),Gm=sn(String.prototype.trim),$n=sn(Object.prototype.hasOwnProperty),rn=sn(RegExp.prototype.test),Io=Km(TypeError);function sn(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return Aa(e,t,r)}}function Km(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return Sa(e,n)}}function ht(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Xs;Tu&&Tu(e,null);let r=t.length;for(;r--;){let o=t[r];if(typeof o=="string"){let s=n(o);s!==o&&(jm(t)||(t[r]=s),o=s)}e[o]=!0}return e}function Ym(e){for(let t=0;t<e.length;t++)$n(e,t)||(e[t]=null);return e}function Un(e){let t=xa(null);for(let[n,r]of Mu(e))$n(e,n)&&(Array.isArray(r)?t[n]=Ym(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=Un(r):t[n]=r);return t}function Po(e,t){for(;e!==null;){let r=Um(e,t);if(r){if(r.get)return sn(r.get);if(typeof r.value=="function")return sn(r.value)}e=Bm(e)}function n(){return null}return n}var Ru=on(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),va=on(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),wa=on(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Vm=on(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),ka=on(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Qm=on(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Ou=on(["#text"]),Lu=on(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),$a=on(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Iu=on(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Qs=on(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Xm=yn(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Zm=yn(/<%[\w\W]*|[\w\W]*%>/gm),Jm=yn(/\$\{[\w\W]*/gm),eg=yn(/^data-[\-\w.\u00B7-\uFFFF]+$/),tg=yn(/^aria-[\-\w]+$/),Nu=yn(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),ng=yn(/^(?:\w+script|data):/i),rg=yn(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),qu=yn(/^html$/i),og=yn(/^[a-z][.\w]*(-[.\w]+)+$/i),Pu=Object.freeze({__proto__:null,ARIA_ATTR:tg,ATTR_WHITESPACE:rg,CUSTOM_ELEMENT:og,DATA_ATTR:eg,DOCTYPE_NAME:qu,ERB_EXPR:Zm,IS_ALLOWED_URI:Nu,IS_SCRIPT_OR_DATA:ng,MUSTACHE_EXPR:Xm,TMPLIT_EXPR:Jm}),Do={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},sg=function(){return typeof window>"u"?null:window},ig=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,o="data-tt-policy-suffix";n&&n.hasAttribute(o)&&(r=n.getAttribute(o));let s="dompurify"+(r?"#"+r:"");try{return t.createPolicy(s,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+s+" could not be created."),null}},Du=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Fu(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:sg(),t=ve=>Fu(ve);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==Do.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,o=r.currentScript,{DocumentFragment:s,HTMLTemplateElement:i,Node:l,Element:a,NodeFilter:c,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:p,DOMParser:g,trustedTypes:_}=e,$=a.prototype,C=Po($,"cloneNode"),M=Po($,"remove"),K=Po($,"nextSibling"),ie=Po($,"childNodes"),ee=Po($,"parentNode");if(typeof i=="function"){let ve=n.createElement("template");ve.content&&ve.content.ownerDocument&&(n=ve.content.ownerDocument)}let j,P="",{implementation:I,createNodeIterator:W,createDocumentFragment:G,getElementsByTagName:te}=n,{importNode:N}=r,V=Du();t.isSupported=typeof Mu=="function"&&typeof ee=="function"&&I&&I.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:H,ERB_EXPR:X,TMPLIT_EXPR:Re,DATA_ATTR:we,ARIA_ATTR:ce,IS_SCRIPT_OR_DATA:F,ATTR_WHITESPACE:$e,CUSTOM_ELEMENT:Se}=Pu,{IS_ALLOWED_URI:S}=Pu,ne=null,Te=ht({},[...Ru,...va,...wa,...ka,...Ou]),_e=null,ke=ht({},[...Lu,...$a,...Iu,...Qs]),he=Object.seal(xa(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Be=null,pt=null,Pe=Object.seal(xa(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),B=!0,de=!0,ae=!1,le=!0,xe=!1,me=!0,Oe=!1,Qe=!1,He=!1,Ue=!1,re=!1,z=!1,Ae=!0,dt=!1,x="user-content-",U=!0,ye=!1,De={},qe=null,je=ht({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),ft=null,xt=ht({},["audio","video","img","source","image","track"]),Rt=null,Ft=ht({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Mt="http://www.w3.org/1998/Math/MathML",bt="http://www.w3.org/2000/svg",Ve="http://www.w3.org/1999/xhtml",L=Ve,oe=!1,be=null,R=ht({},[Mt,bt,Ve],ba),Q=ht({},["mi","mo","mn","ms","mtext"]),Ne=ht({},["annotation-xml"]),Ye=ht({},["title","style","font","a","script"]),Me=null,nt=["application/xhtml+xml","text/html"],at="text/html",ze=null,rt=null,vt=n.createElement("form"),Ge=function(E){return E instanceof RegExp||E instanceof Function},Ot=function(){let E=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(rt&&rt===E)){if((!E||typeof E!="object")&&(E={}),E=Un(E),Me=nt.indexOf(E.PARSER_MEDIA_TYPE)===-1?at:E.PARSER_MEDIA_TYPE,ze=Me==="application/xhtml+xml"?ba:Xs,ne=$n(E,"ALLOWED_TAGS")?ht({},E.ALLOWED_TAGS,ze):Te,_e=$n(E,"ALLOWED_ATTR")?ht({},E.ALLOWED_ATTR,ze):ke,be=$n(E,"ALLOWED_NAMESPACES")?ht({},E.ALLOWED_NAMESPACES,ba):R,Rt=$n(E,"ADD_URI_SAFE_ATTR")?ht(Un(Ft),E.ADD_URI_SAFE_ATTR,ze):Ft,ft=$n(E,"ADD_DATA_URI_TAGS")?ht(Un(xt),E.ADD_DATA_URI_TAGS,ze):xt,qe=$n(E,"FORBID_CONTENTS")?ht({},E.FORBID_CONTENTS,ze):je,Be=$n(E,"FORBID_TAGS")?ht({},E.FORBID_TAGS,ze):Un({}),pt=$n(E,"FORBID_ATTR")?ht({},E.FORBID_ATTR,ze):Un({}),De=$n(E,"USE_PROFILES")?E.USE_PROFILES:!1,B=E.ALLOW_ARIA_ATTR!==!1,de=E.ALLOW_DATA_ATTR!==!1,ae=E.ALLOW_UNKNOWN_PROTOCOLS||!1,le=E.ALLOW_SELF_CLOSE_IN_ATTR!==!1,xe=E.SAFE_FOR_TEMPLATES||!1,me=E.SAFE_FOR_XML!==!1,Oe=E.WHOLE_DOCUMENT||!1,Ue=E.RETURN_DOM||!1,re=E.RETURN_DOM_FRAGMENT||!1,z=E.RETURN_TRUSTED_TYPE||!1,He=E.FORCE_BODY||!1,Ae=E.SANITIZE_DOM!==!1,dt=E.SANITIZE_NAMED_PROPS||!1,U=E.KEEP_CONTENT!==!1,ye=E.IN_PLACE||!1,S=E.ALLOWED_URI_REGEXP||Nu,L=E.NAMESPACE||Ve,Q=E.MATHML_TEXT_INTEGRATION_POINTS||Q,Ne=E.HTML_INTEGRATION_POINTS||Ne,he=E.CUSTOM_ELEMENT_HANDLING||{},E.CUSTOM_ELEMENT_HANDLING&&Ge(E.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(he.tagNameCheck=E.CUSTOM_ELEMENT_HANDLING.tagNameCheck),E.CUSTOM_ELEMENT_HANDLING&&Ge(E.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(he.attributeNameCheck=E.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),E.CUSTOM_ELEMENT_HANDLING&&typeof E.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(he.allowCustomizedBuiltInElements=E.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),xe&&(de=!1),re&&(Ue=!0),De&&(ne=ht({},Ou),_e=[],De.html===!0&&(ht(ne,Ru),ht(_e,Lu)),De.svg===!0&&(ht(ne,va),ht(_e,$a),ht(_e,Qs)),De.svgFilters===!0&&(ht(ne,wa),ht(_e,$a),ht(_e,Qs)),De.mathMl===!0&&(ht(ne,ka),ht(_e,Iu),ht(_e,Qs))),E.ADD_TAGS&&(typeof E.ADD_TAGS=="function"?Pe.tagCheck=E.ADD_TAGS:(ne===Te&&(ne=Un(ne)),ht(ne,E.ADD_TAGS,ze))),E.ADD_ATTR&&(typeof E.ADD_ATTR=="function"?Pe.attributeCheck=E.ADD_ATTR:(_e===ke&&(_e=Un(_e)),ht(_e,E.ADD_ATTR,ze))),E.ADD_URI_SAFE_ATTR&&ht(Rt,E.ADD_URI_SAFE_ATTR,ze),E.FORBID_CONTENTS&&(qe===je&&(qe=Un(qe)),ht(qe,E.FORBID_CONTENTS,ze)),U&&(ne["#text"]=!0),Oe&&ht(ne,["html","head","body"]),ne.table&&(ht(ne,["tbody"]),delete Be.tbody),E.TRUSTED_TYPES_POLICY){if(typeof E.TRUSTED_TYPES_POLICY.createHTML!="function")throw Io('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof E.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Io('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');j=E.TRUSTED_TYPES_POLICY,P=j.createHTML("")}else j===void 0&&(j=ig(_,o)),j!==null&&typeof P=="string"&&(P=j.createHTML(""));on&&on(E),rt=E}},Xe=ht({},[...va,...wa,...Vm]),st=ht({},[...ka,...Qm]),Nt=function(E){let h=ee(E);(!h||!h.tagName)&&(h={namespaceURI:L,tagName:"template"});let A=Xs(E.tagName),J=Xs(h.tagName);return be[E.namespaceURI]?E.namespaceURI===bt?h.namespaceURI===Ve?A==="svg":h.namespaceURI===Mt?A==="svg"&&(J==="annotation-xml"||Q[J]):!!Xe[A]:E.namespaceURI===Mt?h.namespaceURI===Ve?A==="math":h.namespaceURI===bt?A==="math"&&Ne[J]:!!st[A]:E.namespaceURI===Ve?h.namespaceURI===bt&&!Ne[J]||h.namespaceURI===Mt&&!Q[J]?!1:!st[A]&&(Ye[A]||!Xe[A]):!!(Me==="application/xhtml+xml"&&be[E.namespaceURI]):!1},At=function(E){Oo(t.removed,{element:E});try{ee(E).removeChild(E)}catch{M(E)}},St=function(E,h){try{Oo(t.removed,{attribute:h.getAttributeNode(E),from:h})}catch{Oo(t.removed,{attribute:null,from:h})}if(h.removeAttribute(E),E==="is")if(Ue||re)try{At(h)}catch{}else try{h.setAttribute(E,"")}catch{}},Vt=function(E){let h=null,A=null;if(He)E="<remove></remove>"+E;else{let Le=ya(E,/^[\r\n\t ]+/);A=Le&&Le[0]}Me==="application/xhtml+xml"&&L===Ve&&(E='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+E+"</body></html>");let J=j?j.createHTML(E):E;if(L===Ve)try{h=new g().parseFromString(J,Me)}catch{}if(!h||!h.documentElement){h=I.createDocument(L,"template",null);try{h.documentElement.innerHTML=oe?P:J}catch{}}let Fe=h.body||h.documentElement;return E&&A&&Fe.insertBefore(n.createTextNode(A),Fe.childNodes[0]||null),L===Ve?te.call(h,Oe?"html":"body")[0]:Oe?h.documentElement:Fe},en=function(E){return W.call(E.ownerDocument||E,E,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},Wt=function(E){return E instanceof p&&(typeof E.nodeName!="string"||typeof E.textContent!="string"||typeof E.removeChild!="function"||!(E.attributes instanceof d)||typeof E.removeAttribute!="function"||typeof E.setAttribute!="function"||typeof E.namespaceURI!="string"||typeof E.insertBefore!="function"||typeof E.hasChildNodes!="function")},zt=function(E){return typeof l=="function"&&E instanceof l};function Tt(ve,E,h){Vs(ve,A=>{A.call(t,E,h,rt)})}let mn=function(E){let h=null;if(Tt(V.beforeSanitizeElements,E,null),Wt(E))return At(E),!0;let A=ze(E.nodeName);if(Tt(V.uponSanitizeElement,E,{tagName:A,allowedTags:ne}),me&&E.hasChildNodes()&&!zt(E.firstElementChild)&&rn(/<[/\w!]/g,E.innerHTML)&&rn(/<[/\w!]/g,E.textContent)||E.nodeType===Do.progressingInstruction||me&&E.nodeType===Do.comment&&rn(/<[/\w]/g,E.data))return At(E),!0;if(!(Pe.tagCheck instanceof Function&&Pe.tagCheck(A))&&(!ne[A]||Be[A])){if(!Be[A]&&kt(A)&&(he.tagNameCheck instanceof RegExp&&rn(he.tagNameCheck,A)||he.tagNameCheck instanceof Function&&he.tagNameCheck(A)))return!1;if(U&&!qe[A]){let J=ee(E)||E.parentNode,Fe=ie(E)||E.childNodes;if(Fe&&J){let Le=Fe.length;for(let Ke=Le-1;Ke>=0;--Ke){let yt=C(Fe[Ke],!0);yt.__removalCount=(E.__removalCount||0)+1,J.insertBefore(yt,K(E))}}}return At(E),!0}return E instanceof a&&!Nt(E)||(A==="noscript"||A==="noembed"||A==="noframes")&&rn(/<\/no(script|embed|frames)/i,E.innerHTML)?(At(E),!0):(xe&&E.nodeType===Do.text&&(h=E.textContent,Vs([H,X,Re],J=>{h=Lo(h,J," ")}),E.textContent!==h&&(Oo(t.removed,{element:E.cloneNode()}),E.textContent=h)),Tt(V.afterSanitizeElements,E,null),!1)},Kt=function(E,h,A){if(Ae&&(h==="id"||h==="name")&&(A in n||A in vt))return!1;if(!(de&&!pt[h]&&rn(we,h))){if(!(B&&rn(ce,h))){if(!(Pe.attributeCheck instanceof Function&&Pe.attributeCheck(h,E))){if(!_e[h]||pt[h]){if(!(kt(E)&&(he.tagNameCheck instanceof RegExp&&rn(he.tagNameCheck,E)||he.tagNameCheck instanceof Function&&he.tagNameCheck(E))&&(he.attributeNameCheck instanceof RegExp&&rn(he.attributeNameCheck,h)||he.attributeNameCheck instanceof Function&&he.attributeNameCheck(h,E))||h==="is"&&he.allowCustomizedBuiltInElements&&(he.tagNameCheck instanceof RegExp&&rn(he.tagNameCheck,A)||he.tagNameCheck instanceof Function&&he.tagNameCheck(A))))return!1}else if(!Rt[h]){if(!rn(S,Lo(A,$e,""))){if(!((h==="src"||h==="xlink:href"||h==="href")&&E!=="script"&&Hm(A,"data:")===0&&ft[E])){if(!(ae&&!rn(F,Lo(A,$e,"")))){if(A)return!1}}}}}}}return!0},kt=function(E){return E!=="annotation-xml"&&ya(E,Se)},Ht=function(E){Tt(V.beforeSanitizeAttributes,E,null);let{attributes:h}=E;if(!h||Wt(E))return;let A={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:_e,forceKeepAttr:void 0},J=h.length;for(;J--;){let Fe=h[J],{name:Le,namespaceURI:Ke,value:yt}=Fe,gt=ze(Le),_t=yt,lt=Le==="value"?_t:Gm(_t);if(A.attrName=gt,A.attrValue=lt,A.keepAttr=!0,A.forceKeepAttr=void 0,Tt(V.uponSanitizeAttribute,E,A),lt=A.attrValue,dt&&(gt==="id"||gt==="name")&&(St(Le,E),lt=x+lt),me&&rn(/((--!?|])>)|<\/(style|title|textarea)/i,lt)){St(Le,E);continue}if(gt==="attributename"&&ya(lt,"href")){St(Le,E);continue}if(A.forceKeepAttr)continue;if(!A.keepAttr){St(Le,E);continue}if(!le&&rn(/\/>/i,lt)){St(Le,E);continue}xe&&Vs([H,X,Re],b=>{lt=Lo(lt,b," ")});let m=ze(E.nodeName);if(!Kt(m,gt,lt)){St(Le,E);continue}if(j&&typeof _=="object"&&typeof _.getAttributeType=="function"&&!Ke)switch(_.getAttributeType(m,gt)){case"TrustedHTML":{lt=j.createHTML(lt);break}case"TrustedScriptURL":{lt=j.createScriptURL(lt);break}}if(lt!==_t)try{Ke?E.setAttributeNS(Ke,Le,lt):E.setAttribute(Le,lt),Wt(E)?At(E):Cu(t.removed)}catch{St(Le,E)}}Tt(V.afterSanitizeAttributes,E,null)},cn=function ve(E){let h=null,A=en(E);for(Tt(V.beforeSanitizeShadowDOM,E,null);h=A.nextNode();)Tt(V.uponSanitizeShadowNode,h,null),mn(h),Ht(h),h.content instanceof s&&ve(h.content);Tt(V.afterSanitizeShadowDOM,E,null)};return t.sanitize=function(ve){let E=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},h=null,A=null,J=null,Fe=null;if(oe=!ve,oe&&(ve="<!-->"),typeof ve!="string"&&!zt(ve))if(typeof ve.toString=="function"){if(ve=ve.toString(),typeof ve!="string")throw Io("dirty is not a string, aborting")}else throw Io("toString is not a function");if(!t.isSupported)return ve;if(Qe||Ot(E),t.removed=[],typeof ve=="string"&&(ye=!1),ye){if(ve.nodeName){let yt=ze(ve.nodeName);if(!ne[yt]||Be[yt])throw Io("root node is forbidden and cannot be sanitized in-place")}}else if(ve instanceof l)h=Vt("<!---->"),A=h.ownerDocument.importNode(ve,!0),A.nodeType===Do.element&&A.nodeName==="BODY"||A.nodeName==="HTML"?h=A:h.appendChild(A);else{if(!Ue&&!xe&&!Oe&&ve.indexOf("<")===-1)return j&&z?j.createHTML(ve):ve;if(h=Vt(ve),!h)return Ue?null:z?P:""}h&&He&&At(h.firstChild);let Le=en(ye?ve:h);for(;J=Le.nextNode();)mn(J),Ht(J),J.content instanceof s&&cn(J.content);if(ye)return ve;if(Ue){if(re)for(Fe=G.call(h.ownerDocument);h.firstChild;)Fe.appendChild(h.firstChild);else Fe=h;return(_e.shadowroot||_e.shadowrootmode)&&(Fe=N.call(r,Fe,!0)),Fe}let Ke=Oe?h.outerHTML:h.innerHTML;return Oe&&ne["!doctype"]&&h.ownerDocument&&h.ownerDocument.doctype&&h.ownerDocument.doctype.name&&rn(qu,h.ownerDocument.doctype.name)&&(Ke="<!DOCTYPE "+h.ownerDocument.doctype.name+`>
`+Ke),xe&&Vs([H,X,Re],yt=>{Ke=Lo(Ke,yt," ")}),j&&z?j.createHTML(Ke):Ke},t.setConfig=function(){let ve=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Ot(ve),Qe=!0},t.clearConfig=function(){rt=null,Qe=!1},t.isValidAttribute=function(ve,E,h){rt||Ot({});let A=ze(ve),J=ze(E);return Kt(A,J,h)},t.addHook=function(ve,E){typeof E=="function"&&Oo(V[ve],E)},t.removeHook=function(ve,E){if(E!==void 0){let h=Wm(V[ve],E);return h===-1?void 0:zm(V[ve],h,1)[0]}return Cu(V[ve])},t.removeHooks=function(ve){V[ve]=[]},t.removeAllHooks=function(){V=Du()},t}var ju=Fu();var Wn={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Zs=e=>(...t)=>({_$litDirective$:e,values:t}),Yr=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var Mo=class extends Yr{constructor(t){if(super(t),this.it=Pt,t.type!==Wn.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Pt||t==null)return this._t=void 0,this.it=t;if(t===bn)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};Mo.directiveName="unsafeHTML",Mo.resultType=1;var Bu=Zs(Mo);function Ra(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var yr=Ra();function Yu(e){yr=e}var jo={exec:()=>null};function wt(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(o,s)=>{let i=typeof s=="string"?s:s.source;return i=i.replace(an.caret,"$1"),n=n.replace(o,i),r},getRegex:()=>new RegExp(n,t)};return r}var ag=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),an={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},lg=/^(?:[ \t]*(?:\n|$))+/,cg=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,ug=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Bo=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,dg=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Oa=/(?:[*+-]|\d{1,9}[.)])/,Vu=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Qu=wt(Vu).replace(/bull/g,Oa).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),pg=wt(Vu).replace(/bull/g,Oa).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),La=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,fg=/^[^\n]+/,Ia=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,_g=wt(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Ia).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),mg=wt(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Oa).getRegex(),oi="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Pa=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,gg=wt("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Pa).replace("tag",oi).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Xu=wt(La).replace("hr",Bo).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",oi).getRegex(),hg=wt(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Xu).getRegex(),Da={blockquote:hg,code:cg,def:_g,fences:ug,heading:dg,hr:Bo,html:gg,lheading:Qu,list:mg,newline:lg,paragraph:Xu,table:jo,text:fg},Uu=wt("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Bo).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",oi).getRegex(),bg={...Da,lheading:pg,table:Uu,paragraph:wt(La).replace("hr",Bo).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Uu).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",oi).getRegex()},yg={...Da,html:wt(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Pa).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:jo,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:wt(La).replace("hr",Bo).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Qu).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},vg=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,wg=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Zu=/^( {2,}|\\)\n(?!\s*$)/,kg=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,si=/[\p{P}\p{S}]/u,Ma=/[\s\p{P}\p{S}]/u,Ju=/[^\s\p{P}\p{S}]/u,$g=wt(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Ma).getRegex(),ed=/(?!~)[\p{P}\p{S}]/u,xg=/(?!~)[\s\p{P}\p{S}]/u,Ag=/(?:[^\s\p{P}\p{S}]|~)/u,Sg=wt(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",ag?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),td=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Eg=wt(td,"u").replace(/punct/g,si).getRegex(),Tg=wt(td,"u").replace(/punct/g,ed).getRegex(),nd="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Cg=wt(nd,"gu").replace(/notPunctSpace/g,Ju).replace(/punctSpace/g,Ma).replace(/punct/g,si).getRegex(),Rg=wt(nd,"gu").replace(/notPunctSpace/g,Ag).replace(/punctSpace/g,xg).replace(/punct/g,ed).getRegex(),Og=wt("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Ju).replace(/punctSpace/g,Ma).replace(/punct/g,si).getRegex(),Lg=wt(/\\(punct)/,"gu").replace(/punct/g,si).getRegex(),Ig=wt(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Pg=wt(Pa).replace("(?:-->|$)","-->").getRegex(),Dg=wt("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Pg).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),ti=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Mg=wt(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",ti).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),rd=wt(/^!?\[(label)\]\[(ref)\]/).replace("label",ti).replace("ref",Ia).getRegex(),od=wt(/^!?\[(ref)\](?:\[\])?/).replace("ref",Ia).getRegex(),Ng=wt("reflink|nolink(?!\\()","g").replace("reflink",rd).replace("nolink",od).getRegex(),Wu=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Na={_backpedal:jo,anyPunctuation:Lg,autolink:Ig,blockSkip:Sg,br:Zu,code:wg,del:jo,emStrongLDelim:Eg,emStrongRDelimAst:Cg,emStrongRDelimUnd:Og,escape:vg,link:Mg,nolink:od,punctuation:$g,reflink:rd,reflinkSearch:Ng,tag:Dg,text:kg,url:jo},qg={...Na,link:wt(/^!?\[(label)\]\((.*?)\)/).replace("label",ti).getRegex(),reflink:wt(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",ti).getRegex()},Ea={...Na,emStrongRDelimAst:Rg,emStrongLDelim:Tg,url:wt(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Wu).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:wt(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Wu).getRegex()},Fg={...Ea,br:wt(Zu).replace("{2,}","*").getRegex(),text:wt(Ea.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Js={normal:Da,gfm:bg,pedantic:yg},No={normal:Na,gfm:Ea,breaks:Fg,pedantic:qg},jg={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},zu=e=>jg[e];function zn(e,t){if(t){if(an.escapeTest.test(e))return e.replace(an.escapeReplace,zu)}else if(an.escapeTestNoEncode.test(e))return e.replace(an.escapeReplaceNoEncode,zu);return e}function Hu(e){try{e=encodeURI(e).replace(an.percentDecode,"%")}catch{return null}return e}function Gu(e,t){let n=e.replace(an.findPipe,(s,i,l)=>{let a=!1,c=i;for(;--c>=0&&l[c]==="\\";)a=!a;return a?"|":" |"}),r=n.split(an.splitPipe),o=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;o<r.length;o++)r[o]=r[o].trim().replace(an.slashPipe,"|");return r}function qo(e,t,n){let r=e.length;if(r===0)return"";let o=0;for(;o<r;){let s=e.charAt(r-o-1);if(s===t&&!n)o++;else if(s!==t&&n)o++;else break}return e.slice(0,r-o)}function Bg(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function Ku(e,t,n,r,o){let s=t.href,i=t.title||null,l=e[1].replace(o.other.outputLinkReplace,"$1");r.state.inLink=!0;let a={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:s,title:i,text:l,tokens:r.inlineTokens(l)};return r.state.inLink=!1,a}function Ug(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let o=r[1];return t.split(`
`).map(s=>{let i=s.match(n.other.beginningSpace);if(i===null)return s;let[l]=i;return l.length>=o.length?s.slice(o.length):s}).join(`
`)}var ni=class{constructor(e){Et(this,"options");Et(this,"rules");Et(this,"lexer");this.options=e||yr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:qo(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=Ug(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=qo(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:qo(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=qo(t[0],`
`).split(`
`),r="",o="",s=[];for(;n.length>0;){let i=!1,l=[],a;for(a=0;a<n.length;a++)if(this.rules.other.blockquoteStart.test(n[a]))l.push(n[a]),i=!0;else if(!i)l.push(n[a]);else break;n=n.slice(a);let c=l.join(`
`),d=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${c}`:c,o=o?`${o}
${d}`:d;let p=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,s,!0),this.lexer.state.top=p,n.length===0)break;let g=s.at(-1);if(g?.type==="code")break;if(g?.type==="blockquote"){let _=g,$=_.raw+`
`+n.join(`
`),C=this.blockquote($);s[s.length-1]=C,r=r.substring(0,r.length-_.raw.length)+C.raw,o=o.substring(0,o.length-_.text.length)+C.text;break}else if(g?.type==="list"){let _=g,$=_.raw+`
`+n.join(`
`),C=this.list($);s[s.length-1]=C,r=r.substring(0,r.length-g.raw.length)+C.raw,o=o.substring(0,o.length-_.raw.length)+C.raw,n=$.substring(s.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:s,text:o}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,o={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let s=this.rules.other.listItemRegex(n),i=!1;for(;e;){let a=!1,c="",d="";if(!(t=s.exec(e))||this.rules.block.hr.test(e))break;c=t[0],e=e.substring(c.length);let p=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,C=>" ".repeat(3*C.length)),g=e.split(`
`,1)[0],_=!p.trim(),$=0;if(this.options.pedantic?($=2,d=p.trimStart()):_?$=t[1].length+1:($=t[2].search(this.rules.other.nonSpaceChar),$=$>4?1:$,d=p.slice($),$+=t[1].length),_&&this.rules.other.blankLine.test(g)&&(c+=g+`
`,e=e.substring(g.length+1),a=!0),!a){let C=this.rules.other.nextBulletRegex($),M=this.rules.other.hrRegex($),K=this.rules.other.fencesBeginRegex($),ie=this.rules.other.headingBeginRegex($),ee=this.rules.other.htmlBeginRegex($);for(;e;){let j=e.split(`
`,1)[0],P;if(g=j,this.options.pedantic?(g=g.replace(this.rules.other.listReplaceNesting,"  "),P=g):P=g.replace(this.rules.other.tabCharGlobal,"    "),K.test(g)||ie.test(g)||ee.test(g)||C.test(g)||M.test(g))break;if(P.search(this.rules.other.nonSpaceChar)>=$||!g.trim())d+=`
`+P.slice($);else{if(_||p.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||K.test(p)||ie.test(p)||M.test(p))break;d+=`
`+g}!_&&!g.trim()&&(_=!0),c+=j+`
`,e=e.substring(j.length+1),p=P.slice($)}}o.loose||(i?o.loose=!0:this.rules.other.doubleBlankLine.test(c)&&(i=!0)),o.items.push({type:"list_item",raw:c,task:!!this.options.gfm&&this.rules.other.listIsTask.test(d),loose:!1,text:d,tokens:[]}),o.raw+=c}let l=o.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;o.raw=o.raw.trimEnd();for(let a of o.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let d=this.lexer.inlineQueue.length-1;d>=0;d--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[d].src)){this.lexer.inlineQueue[d].src=this.lexer.inlineQueue[d].src.replace(this.rules.other.listReplaceTask,"");break}}let c=this.rules.other.listTaskCheckbox.exec(a.raw);if(c){let d={type:"checkbox",raw:c[0]+" ",checked:c[0]!=="[ ]"};a.checked=d.checked,o.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=d.raw+a.tokens[0].raw,a.tokens[0].text=d.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(d)):a.tokens.unshift({type:"paragraph",raw:d.raw,text:d.raw,tokens:[d]}):a.tokens.unshift(d)}}if(!o.loose){let c=a.tokens.filter(p=>p.type==="space"),d=c.length>0&&c.some(p=>this.rules.other.anyLine.test(p.raw));o.loose=d}}if(o.loose)for(let a of o.items){a.loose=!0;for(let c of a.tokens)c.type==="text"&&(c.type="paragraph")}return o}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",o=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:o}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=Gu(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),o=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],s={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let i of r)this.rules.other.tableAlignRight.test(i)?s.align.push("right"):this.rules.other.tableAlignCenter.test(i)?s.align.push("center"):this.rules.other.tableAlignLeft.test(i)?s.align.push("left"):s.align.push(null);for(let i=0;i<n.length;i++)s.header.push({text:n[i],tokens:this.lexer.inline(n[i]),header:!0,align:s.align[i]});for(let i of o)s.rows.push(Gu(i,s.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:s.align[a]})));return s}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let s=qo(n.slice(0,-1),"\\");if((n.length-s.length)%2===0)return}else{let s=Bg(t[2],"()");if(s===-2)return;if(s>-1){let i=(t[0].indexOf("!")===0?5:4)+t[1].length+s;t[2]=t[2].substring(0,s),t[0]=t[0].substring(0,i).trim(),t[3]=""}}let r=t[2],o="";if(this.options.pedantic){let s=this.rules.other.pedanticHrefTitle.exec(r);s&&(r=s[1],o=s[3])}else o=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),Ku(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:o&&o.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),o=t[r.toLowerCase()];if(!o){let s=n[0].charAt(0);return{type:"text",raw:s,text:s}}return Ku(n,o,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let o=[...r[0]].length-1,s,i,l=o,a=0,c=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(c.lastIndex=0,t=t.slice(-1*e.length+o);(r=c.exec(t))!=null;){if(s=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!s)continue;if(i=[...s].length,r[3]||r[4]){l+=i;continue}else if((r[5]||r[6])&&o%3&&!((o+i)%3)){a+=i;continue}if(l-=i,l>0)continue;i=Math.min(i,i+l+a);let d=[...r[0]][0].length,p=e.slice(0,o+r.index+d+i);if(Math.min(o,i)%2){let _=p.slice(1,-1);return{type:"em",raw:p,text:_,tokens:this.lexer.inlineTokens(_)}}let g=p.slice(2,-2);return{type:"strong",raw:p,text:g,tokens:this.lexer.inlineTokens(g)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),o=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&o&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let o;do o=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(o!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},xn=class Ta{constructor(t){Et(this,"tokens");Et(this,"options");Et(this,"state");Et(this,"inlineQueue");Et(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||yr,this.options.tokenizer=this.options.tokenizer||new ni,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:an,block:Js.normal,inline:No.normal};this.options.pedantic?(n.block=Js.pedantic,n.inline=No.pedantic):this.options.gfm&&(n.block=Js.gfm,this.options.breaks?n.inline=No.breaks:n.inline=No.gfm),this.tokenizer.rules=n}static get rules(){return{block:Js,inline:No}}static lex(t,n){return new Ta(n).lex(t)}static lexInline(t,n){return new Ta(n).inlineTokens(t)}lex(t){t=t.replace(an.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],r=!1){for(this.options.pedantic&&(t=t.replace(an.tabCharGlobal,"    ").replace(an.spaceLine,""));t;){let o;if(this.options.extensions?.block?.some(i=>(o=i.call({lexer:this},t,n))?(t=t.substring(o.raw.length),n.push(o),!0):!1))continue;if(o=this.tokenizer.space(t)){t=t.substring(o.raw.length);let i=n.at(-1);o.raw.length===1&&i!==void 0?i.raw+=`
`:n.push(o);continue}if(o=this.tokenizer.code(t)){t=t.substring(o.raw.length);let i=n.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+o.raw,i.text+=`
`+o.text,this.inlineQueue.at(-1).src=i.text):n.push(o);continue}if(o=this.tokenizer.fences(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.heading(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.hr(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.blockquote(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.list(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.html(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.def(t)){t=t.substring(o.raw.length);let i=n.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+o.raw,i.text+=`
`+o.raw,this.inlineQueue.at(-1).src=i.text):this.tokens.links[o.tag]||(this.tokens.links[o.tag]={href:o.href,title:o.title},n.push(o));continue}if(o=this.tokenizer.table(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.lheading(t)){t=t.substring(o.raw.length),n.push(o);continue}let s=t;if(this.options.extensions?.startBlock){let i=1/0,l=t.slice(1),a;this.options.extensions.startBlock.forEach(c=>{a=c.call({lexer:this},l),typeof a=="number"&&a>=0&&(i=Math.min(i,a))}),i<1/0&&i>=0&&(s=t.substring(0,i+1))}if(this.state.top&&(o=this.tokenizer.paragraph(s))){let i=n.at(-1);r&&i?.type==="paragraph"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+o.raw,i.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):n.push(o),r=s.length!==t.length,t=t.substring(o.raw.length);continue}if(o=this.tokenizer.text(t)){t=t.substring(o.raw.length);let i=n.at(-1);i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+o.raw,i.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):n.push(o);continue}if(t){let i="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,o=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(o=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)a.includes(o[0].slice(o[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,o.index)+"["+"a".repeat(o[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(o=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,o.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let s;for(;(o=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)s=o[2]?o[2].length:0,r=r.slice(0,o.index+s)+"["+"a".repeat(o[0].length-s-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let i=!1,l="";for(;t;){i||(l=""),i=!1;let a;if(this.options.extensions?.inline?.some(d=>(a=d.call({lexer:this},t,n))?(t=t.substring(a.raw.length),n.push(a),!0):!1))continue;if(a=this.tokenizer.escape(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.tag(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.link(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(a.raw.length);let d=n.at(-1);a.type==="text"&&d?.type==="text"?(d.raw+=a.raw,d.text+=a.text):n.push(a);continue}if(a=this.tokenizer.emStrong(t,r,l)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.codespan(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.br(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.del(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.autolink(t)){t=t.substring(a.raw.length),n.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(t))){t=t.substring(a.raw.length),n.push(a);continue}let c=t;if(this.options.extensions?.startInline){let d=1/0,p=t.slice(1),g;this.options.extensions.startInline.forEach(_=>{g=_.call({lexer:this},p),typeof g=="number"&&g>=0&&(d=Math.min(d,g))}),d<1/0&&d>=0&&(c=t.substring(0,d+1))}if(a=this.tokenizer.inlineText(c)){t=t.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),i=!0;let d=n.at(-1);d?.type==="text"?(d.raw+=a.raw,d.text+=a.text):n.push(a);continue}if(t){let d="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(d);break}else throw new Error(d)}}return n}},ri=class{constructor(e){Et(this,"options");Et(this,"parser");this.options=e||yr}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(an.notSpaceStart)?.[0],o=e.replace(an.endingNewline,"")+`
`;return r?'<pre><code class="language-'+zn(r)+'">'+(n?o:zn(o,!0))+`</code></pre>
`:"<pre><code>"+(n?o:zn(o,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${zn(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),o=Hu(e);if(o===null)return r;e=o;let s='<a href="'+e+'"';return t&&(s+=' title="'+zn(t)+'"'),s+=">"+r+"</a>",s}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let o=Hu(e);if(o===null)return zn(n);e=o;let s=`<img src="${e}" alt="${n}"`;return t&&(s+=` title="${zn(t)}"`),s+=">",s}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:zn(e.text)}},qa=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},An=class Ca{constructor(t){Et(this,"options");Et(this,"renderer");Et(this,"textRenderer");this.options=t||yr,this.options.renderer=this.options.renderer||new ri,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new qa}static parse(t,n){return new Ca(n).parse(t)}static parseInline(t,n){return new Ca(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let o=t[r];if(this.options.extensions?.renderers?.[o.type]){let i=o,l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(i.type)){n+=l||"";continue}}let s=o;switch(s.type){case"space":{n+=this.renderer.space(s);break}case"hr":{n+=this.renderer.hr(s);break}case"heading":{n+=this.renderer.heading(s);break}case"code":{n+=this.renderer.code(s);break}case"table":{n+=this.renderer.table(s);break}case"blockquote":{n+=this.renderer.blockquote(s);break}case"list":{n+=this.renderer.list(s);break}case"checkbox":{n+=this.renderer.checkbox(s);break}case"html":{n+=this.renderer.html(s);break}case"def":{n+=this.renderer.def(s);break}case"paragraph":{n+=this.renderer.paragraph(s);break}case"text":{n+=this.renderer.text(s);break}default:{let i='Token with "'+s.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return n}parseInline(t,n=this.renderer){let r="";for(let o=0;o<t.length;o++){let s=t[o];if(this.options.extensions?.renderers?.[s.type]){let l=this.options.extensions.renderers[s.type].call({parser:this},s);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(s.type)){r+=l||"";continue}}let i=s;switch(i.type){case"escape":{r+=n.text(i);break}case"html":{r+=n.html(i);break}case"link":{r+=n.link(i);break}case"image":{r+=n.image(i);break}case"checkbox":{r+=n.checkbox(i);break}case"strong":{r+=n.strong(i);break}case"em":{r+=n.em(i);break}case"codespan":{r+=n.codespan(i);break}case"br":{r+=n.br(i);break}case"del":{r+=n.del(i);break}case"text":{r+=n.text(i);break}default:{let l='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return r}},ei,Fo=(ei=class{constructor(e){Et(this,"options");Et(this,"block");this.options=e||yr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?xn.lex:xn.lexInline}provideParser(){return this.block?An.parse:An.parseInline}},Et(ei,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),Et(ei,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),ei),Wg=class{constructor(...e){Et(this,"defaults",Ra());Et(this,"options",this.setOptions);Et(this,"parse",this.parseMarkdown(!0));Et(this,"parseInline",this.parseMarkdown(!1));Et(this,"Parser",An);Et(this,"Renderer",ri);Et(this,"TextRenderer",qa);Et(this,"Lexer",xn);Et(this,"Tokenizer",ni);Et(this,"Hooks",Fo);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let o=r;for(let s of o.header)n=n.concat(this.walkTokens(s.tokens,t));for(let s of o.rows)for(let i of s)n=n.concat(this.walkTokens(i.tokens,t));break}case"list":{let o=r;n=n.concat(this.walkTokens(o.items,t));break}default:{let o=r;this.defaults.extensions?.childTokens?.[o.type]?this.defaults.extensions.childTokens[o.type].forEach(s=>{let i=o[s].flat(1/0);n=n.concat(this.walkTokens(i,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(o=>{if(!o.name)throw new Error("extension name required");if("renderer"in o){let s=t.renderers[o.name];s?t.renderers[o.name]=function(...i){let l=o.renderer.apply(this,i);return l===!1&&(l=s.apply(this,i)),l}:t.renderers[o.name]=o.renderer}if("tokenizer"in o){if(!o.level||o.level!=="block"&&o.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let s=t[o.level];s?s.unshift(o.tokenizer):t[o.level]=[o.tokenizer],o.start&&(o.level==="block"?t.startBlock?t.startBlock.push(o.start):t.startBlock=[o.start]:o.level==="inline"&&(t.startInline?t.startInline.push(o.start):t.startInline=[o.start]))}"childTokens"in o&&o.childTokens&&(t.childTokens[o.name]=o.childTokens)}),r.extensions=t),n.renderer){let o=this.defaults.renderer||new ri(this.defaults);for(let s in n.renderer){if(!(s in o))throw new Error(`renderer '${s}' does not exist`);if(["options","parser"].includes(s))continue;let i=s,l=n.renderer[i],a=o[i];o[i]=(...c)=>{let d=l.apply(o,c);return d===!1&&(d=a.apply(o,c)),d||""}}r.renderer=o}if(n.tokenizer){let o=this.defaults.tokenizer||new ni(this.defaults);for(let s in n.tokenizer){if(!(s in o))throw new Error(`tokenizer '${s}' does not exist`);if(["options","rules","lexer"].includes(s))continue;let i=s,l=n.tokenizer[i],a=o[i];o[i]=(...c)=>{let d=l.apply(o,c);return d===!1&&(d=a.apply(o,c)),d}}r.tokenizer=o}if(n.hooks){let o=this.defaults.hooks||new Fo;for(let s in n.hooks){if(!(s in o))throw new Error(`hook '${s}' does not exist`);if(["options","block"].includes(s))continue;let i=s,l=n.hooks[i],a=o[i];Fo.passThroughHooks.has(s)?o[i]=c=>{if(this.defaults.async&&Fo.passThroughHooksRespectAsync.has(s))return(async()=>{let p=await l.call(o,c);return a.call(o,p)})();let d=l.call(o,c);return a.call(o,d)}:o[i]=(...c)=>{if(this.defaults.async)return(async()=>{let p=await l.apply(o,c);return p===!1&&(p=await a.apply(o,c)),p})();let d=l.apply(o,c);return d===!1&&(d=a.apply(o,c)),d}}r.hooks=o}if(n.walkTokens){let o=this.defaults.walkTokens,s=n.walkTokens;r.walkTokens=function(i){let l=[];return l.push(s.call(this,i)),o&&(l=l.concat(o.call(this,i))),l}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return xn.lex(e,t??this.defaults)}parser(e,t){return An.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},o={...this.defaults,...r},s=this.onError(!!o.silent,!!o.async);if(this.defaults.async===!0&&r.async===!1)return s(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return s(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return s(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(o.hooks&&(o.hooks.options=o,o.hooks.block=e),o.async)return(async()=>{let i=o.hooks?await o.hooks.preprocess(t):t,l=await(o.hooks?await o.hooks.provideLexer():e?xn.lex:xn.lexInline)(i,o),a=o.hooks?await o.hooks.processAllTokens(l):l;o.walkTokens&&await Promise.all(this.walkTokens(a,o.walkTokens));let c=await(o.hooks?await o.hooks.provideParser():e?An.parse:An.parseInline)(a,o);return o.hooks?await o.hooks.postprocess(c):c})().catch(s);try{o.hooks&&(t=o.hooks.preprocess(t));let i=(o.hooks?o.hooks.provideLexer():e?xn.lex:xn.lexInline)(t,o);o.hooks&&(i=o.hooks.processAllTokens(i)),o.walkTokens&&this.walkTokens(i,o.walkTokens);let l=(o.hooks?o.hooks.provideParser():e?An.parse:An.parseInline)(i,o);return o.hooks&&(l=o.hooks.postprocess(l)),l}catch(i){return s(i)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+zn(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},br=new Wg;function $t(e,t){return br.parse(e,t)}$t.options=$t.setOptions=function(e){return br.setOptions(e),$t.defaults=br.defaults,Yu($t.defaults),$t};$t.getDefaults=Ra;$t.defaults=yr;$t.use=function(...e){return br.use(...e),$t.defaults=br.defaults,Yu($t.defaults),$t};$t.walkTokens=function(e,t){return br.walkTokens(e,t)};$t.parseInline=br.parseInline;$t.Parser=An;$t.parser=An.parse;$t.Renderer=ri;$t.TextRenderer=qa;$t.Lexer=xn;$t.lexer=xn.lex;$t.Tokenizer=ni;$t.Hooks=Fo;$t.parse=$t;var Wk=$t.options,zk=$t.setOptions,Hk=$t.use,Gk=$t.walkTokens,Kk=$t.parseInline;var Yk=An.parse,Vk=xn.lex;function nr(e){let t=$t.parse(e),n=ju.sanitize(t);return Bu(n)}function Hn(e,t){return u`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function Vr(e){return e.loading?u`<div class="prompt-block__status">불러오는 중…</div>`:e.error?u`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function ii(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var id={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},zg={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},Hg=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Gg=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function Sn(e){return!!e&&typeof e=="object"}function Fa(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function ja(e,t){let n=Fa(e),r=Fa(t),o=new Map;for(let l of n)o.set(l,(o.get(l)||0)+1);let s=0;for(let l of r){let a=o.get(l)||0;a>0?o.set(l,a-1):s+=1}let i=0;for(let l of o.values())i+=l;return{added:s,removed:i}}function ad(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(o=>Sn(o)&&typeof o.text=="string"?o.text:"").join(""):Sn(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(o=>o.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function Kg(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:id[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=Fa(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:o,removed:s}=ja(n.old_string,n.new_string);r.added=o,r.removed=s}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let o=0,s=0,i=Array.isArray(n.edits)?n.edits:[];for(let l of i){let a=ja(Sn(l)?l.old_string:"",Sn(l)?l.new_string:"");o+=a.added,s+=a.removed}r.added=o,r.removed=s}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(r.launch_id=e.id),typeof n.description=="string"&&(r.command=n.description)),r}function Ba(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}var Yg=/<system-reminder>[\s\S]*?<\/system-reminder>/g;function ld(e){let t;if(typeof e=="string")t=e;else if(Array.isArray(e))t=e.filter(r=>Sn(r)&&r.type==="text"&&typeof r.text=="string").map(r=>String(r.text)).join(`
`);else return null;let n=t.replace(Yg,"").trim();return n.length>0?{kind:"user",text:n}:null}function Ua(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=Hg.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:Gg.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Vg(e,t){if(e.subtype==="init"){let n=typeof e.model=="string"?e.model:"";return t.progress=null,[{kind:"thinking",text:n?`\uC138\uC158 \uC2DC\uC791 \xB7 ${n}`:"\uC138\uC158 \uC2DC\uC791"}]}if(e.subtype==="thinking_tokens"){let r=`\uC0DD\uAC01 \uC911\u2026 ${typeof e.estimated_tokens=="number"&&Number.isFinite(e.estimated_tokens)?Math.max(0,Math.round(e.estimated_tokens)):0} \uD1A0\uD070`;return t.progress?(t.progress.text=r,[]):(t.progress={kind:"thinking",text:r},[t.progress])}return[]}function Qg(e,t){let n=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let r=e.message,o=r&&Array.isArray(r.content)?r.content:[],s=[];for(let i of o)if(Sn(i)){if(i.type==="text"&&typeof i.text=="string")s.push(Ua(i.text));else if(i.type==="thinking"){let l=Ba(i.thinking);l&&s.push(l)}else if(i.type==="tool_use"){let l=Kg(i);typeof i.id=="string"&&t.set(i.id,l),s.push(l)}}return n?sd(s,n):s}if(e.type==="user"){let r=e.message,o=r&&Array.isArray(r.content)?r.content:[];for(let i of o)if(Sn(i)&&i.type==="tool_result"){let l=t.get(String(i.tool_use_id));if(l){let a=ad(i.content);l.result=a,l.output=typeof i.content=="string"?i.content:a,i.is_error===!0&&(l.is_error=!0)}}let s=ld(r&&r.content);return s?[s]:[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success",o={kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""};return n?sd([o],n):[o]}return[]}function sd(e,t){for(let n of e)n.parent_tool_use_id=t;return e}function Xg(e){let t=typeof e.command=="string"?e.command:"",n=ad(e.aggregated_output===void 0?e.output:e.aggregated_output),o=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",n].filter(i=>i.length>0).join(" \xB7 "),s={kind:"tool",tool:"shell",icon:id.Bash,command:t,input:{command:t},expandable:!0};return o.length>0&&(s.result=o),typeof e.aggregated_output=="string"&&(s.output=e.aggregated_output),s}function Zg(e){if(e.type==="item.completed"&&Sn(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[Ua(t.text)];if(t.type==="user_message"){let n=ld(t.text);return n?[n]:[]}if(t.type==="reasoning"){let n=Ba(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[Xg(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Jg(e){if(e.schema!=="codex-delegation-monitor-v1"||!Sn(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&Sn(t.item)){let n=t.item;if(typeof n.id!="string"||n.id.length===0)return[];if(t.type==="item.completed"&&n.kind==="agent_message"&&typeof n.text=="string"&&n.text.trim().length>0)return[Ua(n.text)];if(t.type==="item.completed"&&n.kind==="reasoning"){let l=Ba(n.text);return l?[l]:[]}if(n.kind!=="activity"||typeof n.activity!="string")return[];let r=zg[n.activity];if(!r)return[];let o="\uC2DC\uC791",s="\u2026",i={kind:"tool",tool:"",icon:s,expandable:!1};if(t.type==="item.completed"){if(n.status==="completed")o="\uC644\uB8CC",s="\u2713";else if(n.status==="failed")o="\uC2E4\uD328",s="\u2717";else return[];i.result=""}return i.tool=`${r} \xB7 ${o}`,i.icon=s,[i]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function eh(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function th(e){let t=e;if(typeof e=="string"){let n=e.trim();if(n.length===0)return null;try{t=JSON.parse(n)}catch{return null}}return Sn(t)?t:null}function cd(e={}){let t=e.skip_delegated===!0,n=new Map,r={progress:null};return{push(o){let s=th(o);if(!s)return[];if(t&&typeof s.parent_tool_use_id=="string"&&s.parent_tool_use_id.length>0)return[];if(s.type==="system"&&s.schema!=="codex-delegation-monitor-v1")return Vg(s,r);let i=s.schema==="codex-delegation-monitor-v1"?Jg(s):eh(s)?Zg(s):Qg(s,n);return i.length>0&&(r.progress=null),i}}}function Wa(e){let t=[],n=cd(),r=Array.isArray(e)?e:[];for(let o of r)for(let s of n.push(o))t.push(s);return t}var nh=5,rh=10,oh=/Task\s+#(\d+)/,sh=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,ih=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function Uo(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function ah(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function lh(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function ch(e){let t=new Map,n=0;for(let o of e){if(o.kind!=="tool")continue;n+=1;let s=o.input||{};if(o.tool==="TaskCreate"){let a=oh.exec(o.output||o.result||""),c=String(s.activeForm||s.subject||"").trim();if(!a||c.length===0)continue;t.set(a[1],{label:c,active:s.status==="in_progress"?n:0});continue}if(o.tool!=="TaskUpdate")continue;let i=t.get(String(s.taskId??""));if(!i)continue;let l=s.activeForm||s.subject;typeof l=="string"&&l.trim().length>0&&(i.label=l.trim()),typeof s.status=="string"&&(i.active=s.status==="in_progress"?n:0)}let r=null;for(let o of t.values())o.active>0&&(!r||o.active>r.active)&&(r=o);return r?r.label:null}function uh(e){if(e.tool==="Bash"){let t=e.command||"";return sh.test(t)?"~ PR/\uAC8C\uC2DC \uC911":ih.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function dh(e){let t=e.filter(o=>o.kind==="tool").slice(-rh),n=new Map;t.forEach((o,s)=>{let i=uh(o);if(!i)return;let l=n.get(i)||{count:0,last:-1};l.count+=1,l.last=s,n.set(i,l)});let r=null;for(let[o,s]of n)(!r||s.count>r.count||s.count===r.count&&s.last>r.last)&&(r={label:o,count:s.count,last:s.last});return r?r.label:null}function ph(e){let t=lh(e);if(t)return{text:t,guess:!1};let n=ch(e);if(n)return{text:n,guess:!1};let r=dh(e);return r?{text:r,guess:!0}:null}function fh(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:tn(e,t)}function Qr(e,t={}){let{transport:n,sessionLogStore:r,onClose:o}=t,s=null,i=null,l=null,a=null,c=null,d=!1,p={},g=!0,_=new Set,$=new Set,C=null,M=null,K=!1,ie=!1,ee=!1,j=null,P=null;function I(){K=!1,ie=!1,ee=!1,j=null,P=null}async function W(re){if(n){ie=!0,ee=!1,Be();try{let z=await Promise.resolve(n("get-attempt-prompt",{attempt_id:re,...c?{root_dir:c}:{}}));if(s!==re)return;!z||typeof z!="object"||Array.isArray(z)?ee=!0:(j=z,P=re)}catch{s===re&&(ee=!0)}finally{s===re&&(ie=!1,Be())}}}function G(){if(K=!K,K&&s&&P!==s){W(s);return}Be()}function te(){if(!K)return"";let re=Vr({loading:ie,error:ee});if(re)return u`<div class="sv__prompt" data-seam="attempt-prompt">
        ${re}
      </div>`;if(!j)return"";if(j.missing)return u`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let z=ii(j.recorded_at);return u`<div class="sv__prompt" data-seam="attempt-prompt">
      ${z?u`<div class="prompt-block__meta">${z} 발송</div>`:""}
      ${typeof j.task_prompt=="string"?Hn("\uACFC\uC5C5 (user)",j.task_prompt):""}
      ${typeof j.system_prompt=="string"?Hn("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",j.system_prompt):""}
    </div>`}function N(){if(!a||!r)return[];let re=r.get(a);return Wa(re?re.lines:[])}function V(){if(!a||!r)return null;let re=r.get(a),z=re?re.last_event_at:null;return typeof z=="number"?z:null}function H(){return p.status==="running"}function X(){if(H()&&s){M||(M=setInterval(()=>Be(),1e3));return}Re()}function Re(){M&&(clearInterval(M),M=null)}function we(re){let z=[],Ae=0;for(;Ae<re.length;){let{idx:dt,line:x}=re[Ae];if(x.kind==="tool"){let U=Ae;for(;U<re.length&&re[U].line.kind==="tool"&&re[U].line.tool===x.tool;)U+=1;if(U-Ae>=nh&&!$.has(dt)){z.push({kind:"group",idx:dt,tool:x.tool||"",lines:re.slice(Ae,U)}),Ae=U;continue}}z.push({kind:"line",idx:dt,line:x}),Ae+=1}return z}function ce(re){let z=[],Ae=new Map;for(let U=0;U<re.length;U+=1){let ye=re[U],De=ye.parent_tool_use_id;if(typeof De=="string"&&De.length>0){let qe=Ae.get(De);qe||(qe={kind:"subagent",idx:U,launch_id:De,agent_type:null,header:null,lines:[]},Ae.set(De,qe),z.push(qe)),qe.lines.push({idx:U,line:ye});continue}if(ye.kind==="tool"&&ye.tool==="Agent"&&typeof ye.launch_id=="string"&&ye.launch_id.length>0){let qe=F(ye),je=Ae.get(ye.launch_id);if(je){je.header={idx:U,line:ye},je.agent_type=qe;continue}let ft={kind:"subagent",idx:U,launch_id:ye.launch_id,agent_type:qe,header:{idx:U,line:ye},lines:[]};Ae.set(ye.launch_id,ft),z.push(ft);continue}z.push({kind:"entry",idx:U,line:ye})}let dt=[],x=0;for(;x<z.length;){if(z[x].kind!=="entry"){dt.push(z[x]),x+=1;continue}let U=x;for(;U<z.length&&z[U].kind==="entry";)U+=1;dt.push(...we(z.slice(x,U))),x=U}return dt}function F(re){let z=re.input;return z&&typeof z.subagent_type=="string"?z.subagent_type:null}function $e(re){for(let z=re.length-1;z>=0;z-=1){let Ae=re[z];if(Ae.kind==="result"||Ae.kind==="error")return null;if(Ae.kind==="tool"&&!Object.hasOwn(Ae,"result"))return Ae}return null}function Se(re){for(let z=re.length-1;z>=0;z-=1)if(re[z].kind==="thinking")return re[z];return null}function S(re,z){if(z.kind==="gate")return u`<div class="sv__gate">${z.text}</div>`;if(z.kind==="phase")return u`<div class="sv__phase">${z.text}</div>`;if(z.kind==="result")return u`<div
        class="sv__result${z.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${z.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${nr(z.text||(z.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(z.kind==="thinking"){let Ae=_.has(re);return u`<div
        class="sv__think${Ae?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Pe(re)}
      >
        <span class="sv__think-line">💭 ${Uo(z.text)}</span>
        ${Ae?u`<pre class="sv__think-expand">${z.text}</pre>`:""}
      </div>`}if(z.kind==="user"){let Ae=_.has(re);return u`<div
        class="sv__line sv__line--user${Ae?" sv__line--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Pe(re)}
      >
        <span class="sv__user-line">▷ ${Uo(z.text)}</span>
        ${Ae?u`<pre class="sv__user-expand">${z.text}</pre>`:""}
      </div>`}if(z.kind==="error")return u`<div class="sv__error">⛔ ${z.text}</div>`;if(z.kind==="blocker")return u`<div class="sv__error">⛔ ${z.text}</div>`;if(z.kind==="tool"){let Ae=_.has(re),dt=z.tool==="Bash"?ah(z.command):0,x=z.tool==="Bash"?dt>1?Uo(z.command):z.command:z.path||z.command||"";return u`<div
        class="sv__tool${Ae?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>Pe(re)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${z.icon}</span>
          <span class="sv__tool-name">${z.tool}</span>
          ${x?u`<span class="sv__tool-detail">${x}</span>`:""}
          ${dt>1?u`<span class="sv__tool-more">⋯ ${dt}줄</span>`:""}
          ${typeof z.added=="number"?u`<span class="sv__diff-add">+${z.added}</span>`:""}
          ${typeof z.removed=="number"?u`<span class="sv__diff-del">−${z.removed}</span>`:""}
          ${z.result?u`<span class="sv__tool-ok">→ ${z.result}</span>`:""}
        </span>
        ${Ae?u`<pre class="sv__tool-expand">${ne(z)}</pre>`:""}
      </div>`}return u`<div class="sv__as">${nr(z.text||"")}</div>`}function ne(re){let z=[];if(re.tool==="Bash"&&typeof re.command=="string"&&re.command.length>0)z.push(re.command);else if(re.input!==void 0)try{z.push(`input: ${JSON.stringify(re.input,null,2)}`)}catch{}return typeof re.output=="string"&&re.output.length>0&&z.push(`output:
${re.output}`),z.join(`

`)}function Te(){if(!s)return u``;let re=N(),z=(i?[p.agent_type,p.model,p.effort]:[p.runner,p.model,p.effort]).filter(Boolean).join(" \xB7 "),Ae=p.session_id||"",dt=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${g?"ON":"OFF"}`,x=H(),U=x?fh(V(),Date.now()):"",ye=x?$e(re):null,De=x?Se(re):null,qe=ph(re);return u`<div class="sv" data-attempt-id=${s}>
      <div class="sv__bar">
        <span class="sv__id"
          >${p.label||(i?p.role||"":s)}</span
        >
        ${qe?u`<span
              class="sv__stage${qe.guess?" sv__stage--guess":""}"
              title=${qe.text}
              >${qe.text}</span
            >`:""}
        ${x?u`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${U?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${U}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${U?u`<span class="sv__live-ago">${U}</span>`:""}</span
            >`:""}
        ${Ae?u`<button
              type="button"
              class="sv__session"
              title=${Ae}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${Ae}`}
              @click=${()=>de(Ae)}
            >
              ⧉ ${Ae.slice(0,8)}
            </button>`:""}
        ${p.resume_command?u`<button
              type="button"
              class="sv__resume-cmd"
              title=${p.resume_command}
              aria-label=${`\uC7AC\uAC1C \uBA85\uB839 \uBCF5\uC0AC: ${p.resume_command}`}
              @click=${()=>de(p.resume_command||"")}
            >
              ⧉ 재개 명령
            </button>`:""}
        ${z?u`<span class="sv__meta">${z}</span>`:""}
        ${p.worktree?u`<span class="sv__wt" title=${p.worktree}
              >${p.worktree}</span
            >`:""}
        ${i||d?"":u`<button
              type="button"
              class="sv__prompt-toggle${K?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${K?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${G}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${g?" sv__follow--on":""}"
          aria-pressed=${g?"true":"false"}
          aria-label=${dt}
          @click=${B}
        >
          <span class="sv__follow-full">⇣ ${dt}</span>
          <span class="sv__follow-short">⇣ ${g?"ON":"OFF"}</span>
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
      ${i||d?"":te()}
      <div class="sv__body">
        ${re.length===0?u`<div class="sv__empty">세션 로그 없음</div>`:ce(re).map(je=>je.kind==="subagent"?ke(je):je.kind==="group"?_e(je):S(je.idx,je.line))}
      </div>
      ${ye||De?u`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${ye?u`<span class="sv__now-icon">${ye.icon}</span>
                  <span class="sv__now-name">${ye.tool}</span>
                  <span class="sv__now-detail"
                    >${ye.tool==="Bash"?Uo(ye.command):ye.path||ye.command||""}</span
                  >`:""}
            ${De?u`<span class="sv__now-think"
                  >💭 ${Uo(De.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function _e(re){return u`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>he(re.idx)}
    >
      <span class="sv__group-icon">${re.lines[0].line.icon}</span>
      <span class="sv__group-name">${re.tool}</span>
      <span class="sv__group-count">${re.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function ke(re){let z=$.has(re.idx),Ae=re.header?re.header.line:null,dt=Ae?Ae.is_error===!0?"\u2717":typeof Ae.result=="string"?"\u2713":"\u27F3":"",x=Ae&&Ae.command?Ae.command:"";return u`<div class="sv__sub${z?" sv__sub--open":""}">
      <div
        class="sv__sub-head"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>he(re.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${re.agent_type||"subagent"}</span>
        ${x?u`<span class="sv__sub-detail">${x}</span>`:""}
        <span class="sv__sub-count">${re.lines.length}줄</span>
        ${dt?u`<span class="sv__sub-state">${dt}</span>`:""}
        ${z?"":u`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${z?u`<div class="sv__sub-body">
            ${we(re.lines).map(U=>U.kind==="group"?_e(U):S(U.idx,U.line))}
          </div>`:""}
    </div>`}function he(re){$.add(re),Be()}function Be(){ct(Te(),e),X(),g&&pt()}function pt(){let re=e.querySelector(".sv__body");re&&(re.scrollTop=re.scrollHeight)}function Pe(re){_.has(re)?_.delete(re):_.add(re),Be()}function B(){g=!g,Be()}function de(re){nn(re).then(z=>{z?ge("\uBCF5\uC0AC\uB428","success",1200):ge("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function ae(re){!s||!re||(p={...p,...re},Be())}function le(re){let z=re.target;if(!z||!z.classList||!z.classList.contains("sv__body"))return;!(z.scrollHeight-z.scrollTop-z.clientHeight<=4)&&g&&(g=!1,Be())}e.addEventListener("scroll",le,!0);function xe(re){let z=re.target;!z||typeof z.closest!="function"||e.contains(z)||z.closest("dialog")||z.closest(".md-viewer-root")||Ue()}let me=!1;function Oe(){me||(document.addEventListener("mousedown",xe),me=!0)}function Qe(){me&&(document.removeEventListener("mousedown",xe),me=!1)}function He(re){let z=re&&re.attempt_id;if(!z)return;let Ae=typeof re.launch_id=="string"&&re.launch_id.length>0?re.launch_id:null,dt=re.session_ref&&typeof re.session_ref=="object"?re.session_ref:null;if(Ae&&dt)return;let x=a;s=z,i=Ae,l=dt,a=i?`session-log:${s}:${i}`:`session-log:${s}`,n&&x&&x!==a&&Promise.resolve(n("unsubscribe-session-log",{id:x})).catch(()=>{}),c=typeof re.root_dir=="string"&&re.root_dir.length>0?re.root_dir:null,p=re.meta||{},d=re.hide_prompt===!0,g=!0,_.clear(),$.clear(),I(),!C&&r&&(C=r.subscribe(Be)),n&&Promise.resolve(n("subscribe-session-log",{id:a,attempt_id:s,...i?{launch_id:i}:{},...l?{session_ref:l}:{},...c?{root_dir:c}:{}})).catch(()=>{}),Oe(),Be()}function Ue(){let re=a;Qe(),s=null,i=null,l=null,a=null,c=null,d=!1,_.clear(),$.clear(),I(),Re(),n&&re&&Promise.resolve(n("unsubscribe-session-log",{id:re})).catch(()=>{}),ct(u``,e),o&&o()}return{open:He,updateMeta:ae,close:Ue,isOpen(){return s!==null},destroy(){Re(),Qe(),C&&(C(),C=null),e.removeEventListener("scroll",le,!0),s=null,i=null,l=null,a=null,c=null,d=!1,ct(u``,e)}}}function _h(e){return["plan_review","plan_approval","plan_check"].some(t=>{let n=e[t];return typeof n=="string"&&n.trim().length>0})}function mh(e){let t=e&&e.metadata||{},n=Or(e),r=[];return n.path&&r.push({kind:"spec",path:n.path,missing_state:n.evidence==="draft"?"spec_draft":null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&r.push({kind:"plan",path:t.plan_path.trim(),missing_state:_h(t)?null:"plan_pending"}),r}function ud(e,t){let n=mh(e);return u`
    <div class="detail-section-label">Artifacts</div>
    ${n.length===0?u`<div class="detail-empty">산출물 없음</div>`:u`
          ${n.map(r=>u`<div class="detail-art">
                <span class="detail-art__ic" aria-hidden="true">▤</span>
                <button
                  type="button"
                  class="detail-art__path"
                  title=${`${r.path} \xB7 \uD074\uB9AD\uD558\uBA74 \uBCF5\uC0AC`}
                  @click=${o=>t.onCopyPath(o,r.path)}
                >
                  ${r.path}
                </button>
                ${r.missing_state==="spec_draft"?u`<span class="detail-art__badge">draft</span>`:null}
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
  `}var gh="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",hh=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,bh=/^\*\*결론\*\* — (.+)$/;function ai(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==gh)return null;let n=hh.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],o=n[2],s=n[3],i=2;for(;i<t.length&&t[i].trim().length===0;)i+=1;let l=i<t.length?bh.exec(t[i]):null,a=l?l[1].replace(/\s+/g," ").trim():"",c=l?i+1:i;return{lane:r,identifier:o,timestamp:s,conclusion:a,body:t.slice(c).join(`
`).trim()}}var dd=20;function pd(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),o=String(t.getHours()).padStart(2,"0"),s=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${o}:${s}`}function yh(e){return e.length>dd?`${e.slice(0,dd)}\u2026`:e}function vh(e,t,n,r){let o=`${t.lane} ${yh(t.identifier)}`;return u`<div class="detail-report">
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
        <span class="detail-report__time">${pd(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${r&&t.body.length>0?u`<div class="detail-report__body">
          ${nr(t.body)}
        </div>`:""}
  </div>`}function wh(e){return u`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${pd(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${nr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function fd(e,t={},n={}){let r=Array.isArray(e)?e.filter(Boolean):[],o=n.expanded||new Set,s=typeof n.draft=="string"?n.draft:"",i=n.sending===!0,l=r.slice().sort((a,c)=>String(c.created_at||"").localeCompare(String(a.created_at||"")));return u`
    <div class="detail-section-label">댓글 (${r.length})</div>
    ${n.error?u`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:l.length===0?u`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:u`<div class="detail-comments" data-seam="comments">
            ${l.map(a=>{let c=ai(typeof a.text=="string"?a.text:"");return c?vh(a,c,t,o.has(a.id)):wh(a)})}
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
  `}var{I:C$}=hl;var _d=e=>e.strings===void 0;var kh={},md=(e,t=kh)=>e._$AH=t;var vr=Zs(class extends Yr{constructor(e){if(super(e),e.type!==Wn.PROPERTY&&e.type!==Wn.ATTRIBUTE&&e.type!==Wn.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!_d(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===bn||t===Pt)return t;let n=e.element,r=e.name;if(e.type===Wn.PROPERTY){if(t===n[r])return bn}else if(e.type===Wn.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return bn}else if(e.type===Wn.ATTRIBUTE&&n.getAttribute(r)===t+"")return bn;return md(e),t}});var $h=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review",receipt_stage:null,fill_stage:"spec",stale_stage:"spec",hue:"spec"},{id:"plan",label:"\uACC4\uD68D \uB9AC\uBDF0",receipt:null,receipt_stage:"plan",fill_stage:"plan",stale_stage:"plan",hue:"plan"},{id:"impl",label:"\uAD6C\uD604",receipt:null,receipt_stage:null,fill_stage:"impl",stale_stage:null,hue:"impl"},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review",receipt_stage:null,fill_stage:null,stale_stage:"impl",hue:"impl"},{id:"pr",label:"PR",receipt:null,receipt_stage:null,fill_stage:"pr",stale_stage:null,hue:"pr"}],za={quick_fix:["impl","impl_review"],spec_backed:["spec","impl","impl_review","pr"],full_plan:["spec","plan","impl","impl_review","pr"]},gd={missing:"\uC2B9\uC778 \uD544\uC694",stale:"\uC7AC\uC2B9\uC778 \uD544\uC694",unknown:"\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"},xh={pin:"pin",global:"global",base:"base"};function Ah(e){return u`<span
    class=${`detail-layer-rail detail-layer-rail--${xh[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function Sh(e,t,n){switch(e){case"workflow_mode":return _o;case"spec_review_model":case"impl_review_model":return mo;case"plan_review_model":return vs;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return ws;case"impl_dispatch":return Ac;case"impl_runtime":return ys;case"impl_model":return Ur(n,t.impl_runtime);case"impl_effort":return Wr(n,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return fo;case"orchestration_model":return go(n,null);case"orchestration_effort":return Wr(n,void 0,t.orchestration_model||_n).filter(r=>r!==_n);default:return[]}}function Eh(e,t){return u`<div class="detail-effective__row" data-key=${e.key}>
    ${Ah(e.source)}
    <span class="detail-effective__k"
      >${Xn[e.key]||e.key}</span
    >
    <span
      class=${`detail-effective__v${e.source==="base"?" detail-effective__v--dim":""}`}
      title=${e.full_value||""}
      >${e.display}</span
    >
    <span
      class=${`detail-effective__badge detail-effective__badge--${e.source}`}
      >${ks[e.source]}</span
    >
    ${t.expanded?u`<select
          class="detail-effective__edit"
          data-edit-key=${e.key}
          aria-label=${`${Xn[e.key]||e.key} \uD3B8\uC9D1`}
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
          ${t.options.map(n=>u`<option
                value=${n.value}
                title=${n.full_value||""}
                ?selected=${e.source==="pin"&&e.value===n.value}
              >
                ${n.label}
              </option>`)}
        </select>`:""}
  </div>`}function hd(e,t){let n=Xi.flatMap(a=>a.keys),r=Zi(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Lc(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=Object.fromEntries(r.map(a=>[a.key,a])),i=Object.fromEntries(r.filter(a=>a.value!==null).map(a=>[a.key,a.value])),l=r.filter(a=>a.full_value&&a.display!==a.full_value).map(a=>a.full_value).join(" \xB7 ");return u`<details
    class=${`detail-effective${e.expanded?" detail-effective--open":""}`}
    data-seam="effective-settings"
    ?open=${e.expanded}
    @toggle=${a=>t.onToggle(a.currentTarget.open)}
  >
    <summary
      class="detail-effective__head"
      data-seam="effective-settings-toggle"
      @click=${a=>{a.preventDefault();let c=a.currentTarget.parentElement;t.onToggle(!c.open)}}
    >
      <span class="detail-effective__t">유효 실행 설정</span>
      <span class="detail-effective__summary" title=${l}
        >${Th(s)}</span
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
    ${e.expanded?u`<div class="detail-effective__body">
          ${Xi.map(a=>u`
              <div class="detail-effective__subhead">${a.label}</div>
              ${r.filter(c=>a.keys.includes(c.key)).map(c=>{let d=ms({key:c.key,choices:Sh(c.key,i,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return Eh(c,{expanded:e.expanded,options:d.options,default_label:d.unset_label,default_full_value:d.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="실행 프리셋"
              .value=${vr(e.preset_id)}
              ?disabled=${e.preset_busy}
              @change=${a=>t.onPresetSelect(String(a.target.value))}
            >
              <option value="" ?selected=${e.preset_id===""}>
                실행 프리셋…
              </option>
              ${e.presets.map(a=>u`<option
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
            ${(e.skipped_orchestration_keys||[]).length>0?u`<span
                  class="detail-effective__hint"
                  data-preset-skip-notice
                  >오케스트레이션 3키는 Bead에 핀할 수 없어 건너뜀</span
                >`:""}
          </div>
        </div>`:""}
  </details>`}function Th(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let n=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${n}`)}for(let n of["impl_model","impl_effort","impl_speed"])e[n]?.resolution!=="not_applicable"&&t.push(e[n]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function Ch(e){if(!e||typeof e!="object")return null;let{kind:t,actor:n,effort:r,sha:o}=e;return typeof t!="string"||typeof n!="string"||typeof o!="string"?null:{kind:t,actor:n,effort:typeof r=="string"?r:null,sha:o}}function bd(e,t={}){let n=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},o=r.stages||{},s=r.route||n.route||null,i=typeof n.pr_url=="string"?n.pr_url:"",l=typeof n.exec_receipt=="string"?n.exec_receipt:"",a=Ch(r.exec_receipt),c=a?Nn(a):l,d=a?`${a.kind}:${a.actor}`:l.split("@")[0],p=fs(r.planned_execution,r.exec_receipt),g=r.chips?.pr?.number,_=typeof g=="number"?`PR #${g}`:"PR",$=bo(n),C=t.onApplyRec;return u`<section class="detail-summary" data-seam="detail-summary">
    <div class="detail-summary__chips">
      <span class="detail-summary__chip detail-summary__chip--status"
        >${e?.status||"\u2014"}</span
      >
      ${s?u`<span class="detail-summary__chip detail-summary__chip--route"
            >${s}</span
          >`:""}
      ${n.workflow_mode==="fast_track"?u`<span class="detail-summary__chip detail-summary__chip--mode"
            >fast_track</span
          >`:""}
      ${i?u`<a
            class="detail-summary__chip detail-summary__chip--pr"
            href=${i}
            target="_blank"
            rel="noreferrer"
            >${_}</a
          >`:""}
      ${p?u`<span
            class="detail-summary__chip detail-summary__chip--planned ctl-chip--planned"
            data-kind=${p.kind}
            title=${p.title}
            >${p.label}</span
          >`:""}
      ${c?u`<span
            class="detail-summary__chip detail-summary__chip--receipt"
            title=${c}
            >${d}${a?.effort?u`${" "}<span
                    class="detail-summary__chip-effort"
                    data-seam="exec-receipt-effort"
                    >${a.effort}</span
                  >`:""}</span
          >`:""}
      ${$?u`<button
            type="button"
            class="detail-summary__chip detail-summary__chip--rec"
            data-state=${$.state}
            title=${xs($)}
            ?disabled=${$.state==="applied"}
            @click=${()=>C?.($.rec,$.state)}
          >
            ${"\uBCF5\uC7A1"}
          </button>`:""}
    </div>
    <div
      class="detail-summary__gates"
      role="group"
      aria-label="워크플로 게이트"
    >
      ${Rh(s).map(M=>Oh(M,n,o,{label:M.id==="pr"?_:M.label,href:M.id==="pr"?i:""}))}
    </div>
  </section>`}function Rh(e){let n=typeof e=="string"&&Object.hasOwn(za,e)&&za[e]||za.spec_backed;return $h.filter(r=>n.includes(r.id))}var li={on:"\uD1B5\uACFC",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",current:"\uC9C4\uD589 \uC911",none:"\uBBF8\uB3C4\uB2EC"};function Oh(e,t,n,r){let o=Lh(e,t,n),s=e.fill_stage?n[e.fill_stage]:null,i=typeof s?.fill=="string"?s.fill:null,l=i?i==="full":o.length>0,a=!l&&i==="dim",c=e.stale_stage?n[e.stale_stage]?.stale===!0:!1,d=o&&o.split("@")[1]?.slice(0,7)||"",p=c?li.stale:l?li.on:a?li.current:li.none,g=Ih(e,n),_=`${r.label} \xB7 ${p}${g?` \xB7 ${g}`:""}${o?` \xB7 ${o}`:""}`,$=`detail-summary__gate${l?" detail-summary__gate--on":""}${a?" detail-summary__gate--current":""}${c?" detail-summary__gate--stale":""}${d?" detail-summary__gate--receipt":""}`,C=u`<span class="detail-summary__gate-label"
      >${r.label}</span
    >
    <span class="detail-summary__gate-rail"></span>
    <span class="detail-summary__gate-sha">${d}</span>`;return r.href?u`<a
      class=${$}
      data-gate=${e.id}
      data-hue=${e.hue}
      href=${r.href}
      target="_blank"
      rel="noreferrer"
      title=${_}
      >${C}</a
    >`:u`<span
    class=${$}
    data-gate=${e.id}
    data-hue=${e.hue}
    title=${_}
    >${C}</span
  >`}function Lh(e,t,n){if(e.receipt&&typeof t[e.receipt]=="string")return String(t[e.receipt]);if(e.receipt_stage){let r=n[e.receipt_stage]?.receipt;return typeof r=="string"?r:""}return""}function Ih(e,t){if(e.id!=="plan")return"";let n=t.plan?.approval_state;return typeof n=="string"&&Object.hasOwn(gd,n)?gd[n]:""}function ci(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function yd(e){return ci(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function vd(e,t){let n=e&&e[t];if(!ci(n)||!Array.isArray(n.accounts))return null;let r=n.accounts.filter(yd),o=yd(n.active)?n.active:null;return{accounts:r,active:o||r.find(s=>s.active===!0)||null}}function $d(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function ui(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${$d(e)}${t}`}function Xr(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${$d(e)}`}function Ph(e,t,n){if(n!==null){let o=e==="claude"?ui:Xr,s=t?t.accounts.find(i=>i.key===n):void 0;return`\uB808\uD3EC \uAE30\uBCF8\uAC12 \uC0AC\uC6A9(${s?o(s):n})`}return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:Xr({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function wd(e,t){if(!ci(e)||e.state!=="usable"||!ci(e.values))return null;let n=e.values[t];return typeof n=="string"&&n.length>0?n:null}function kd(e){let t=e.provider_key==="claude"?ui:Xr,n=!!e.provider?.accounts.some(r=>r.key===e.selected);return u`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${r=>e.handlers.onExecChange(e.key,r.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${Ph(e.provider_key,e.provider,e.workspace_default)}
        </option>
        ${e.selected&&!n?u`<option value=${e.selected} selected>
              ${e.selected} (목록에 없음)
            </option>`:""}
        ${e.provider?.accounts.map(r=>u`<option
              value=${r.key}
              ?selected=${r.key===e.selected}
            >
              ${t(r)}
            </option>`)||""}
      </select>
      ${e.hint?u`<small class="detail-effective__hint">${e.hint}</small>`:""}
      ${e.provider?"":u`<small class="detail-effective__hint"
            >계정 목록을 불러올 수 없습니다</small
          >`}
    </span>
  </div>`}function xd({md:e,catalog:t,workspace_defaults:n=null,handlers:r}){let o=typeof e.claude_account=="string"?e.claude_account:"",s=typeof e.codex_account=="string"?e.codex_account:"";return u`<section class="exec-accounts" data-exec-accounts>
    <div class="detail-section-label">실행 계정</div>
    <div class="exec-settings-core">
      ${kd({key:"claude_account",title:"Claude \uACC4\uC815",provider_key:"claude",provider:vd(t,"claude"),selected:o,workspace_default:wd(n,"claude_account"),handlers:r,hint:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uB7F0\uD0C0\uC784\uC774 claude\uC77C \uB54C \uC801\uC6A9\uB429\uB2C8\uB2E4"})}
      ${kd({key:"codex_account",title:"Codex \uACC4\uC815",provider_key:"codex",provider:vd(t,"codex"),selected:s,workspace_default:wd(n,"codex_account"),handlers:r})}
    </div>
  </section>`}function Dh(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function Mh(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let n=t[1].trim();return{front:n.length>0?n:null,body:e.slice(t[0].length)}}function di(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),o=null,s="loading",i="",l=null,a="";function c(C){C.key==="Escape"&&o&&(C.preventDefault(),_())}document.addEventListener("keydown",c);function d(){return o?u`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>_()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${o}
              >${Dh(o)}</span
            >
            <button
              type="button"
              class="mv__close"
              aria-label="닫기"
              @click=${()=>_()}
            >
              ✕
            </button>
          </div>
          <div class="mv__body">
            ${s==="loading"?u`<div class="mv__status">불러오는 중…</div>`:s==="pending"?u`<div class="mv__status">${a}</div>`:s==="error"?u`<div class="mv__status mv__status--error">
                      ${a||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:u`${l===null?null:u`<pre class="mv__front">
${l}</pre
                        >`}${nr(i)}`}
          </div>
        </div>
      </div>
    `:u``}function p(){ct(d(),e)}async function g(C,M={}){o=C,s="loading",i="",l=null,a="",p();let K=M.workspace||(n?n():"");if(!K){s="error",a="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",p();return}if(!r){s="error",a="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",p();return}let ie="/api/doc?workspace="+encodeURIComponent(K)+"&path="+encodeURIComponent(C);try{let ee=await r(ie),j=await ee.json().catch(()=>({}));if(!ee.ok||!j||j.ok!==!0){if(j?.error==="not_found"&&M.missing_state==="plan_pending"){s="pending",a="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",p();return}s="error",a="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(j&&j.error||ee.status)+")",p();return}let P=Mh(String(j.content||""));l=P.front,i=P.body,s="ready",p()}catch{s="error",a="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",p()}}function _(){o=null,ct(u``,e)}function $(){document.removeEventListener("keydown",c),_()}return{open:g,close:_,destroy:$}}var Nh=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],Ed="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",pi=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],qh=new Set(["codex-runner","Explore","Plan","advisor","advisor-xhigh","claude-code-guide","statusline-setup"]);function Ad(e){return typeof e=="string"&&qh.has(e)}var Fh=["running","done","failed","interrupted"],jh={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function Bh(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function Uh(e){let t=Qt(e);if(t.length>0)return t.map(o=>u`<span class="detail-usage-total" title=${o.tooltip}
          >${o.label}</span
        >`);let n=jr(e);if(!n||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return u`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${n.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?u`<span class="detail-usage-partial" title=${Ed}
          >부분 집계</span
        >`:""}`}function Sd(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function Ka(e){if(typeof e=="number")return Wo(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?Wo(t):""}function Wh(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function zh(e,t){if(e.provider!=="claude")return{text:e.session_id.slice(0,8),title:e.session_id};let n=t&&typeof t.agent_id=="string"?t.agent_id:"";return n.length>0?{text:n.slice(0,8),title:n}:{text:e.launch_id.slice(-8),title:e.launch_id}}function Ha(e){return e===null||typeof e=="string"&&e.trim().length>0}function Ga(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function Hh(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,n=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!pi.some(r=>r.role===t.role&&r.provider===t.provider)||!(n?Ha(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||Ha(t.effort))||!(!("agent_type"in t)||Ha(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!Fh.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:n?!Ga(t.started_at)||!Ga(t.last_event_at)||!Ga(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function Gh(e,t,n){let o=Qt({providers:{[t]:{subtotal:n.subtotal,breakdown:n.usage,...n.replayed?{replayed:!0}:{}}},roles:{}})[0];return u`<div class="detail-session__leg detail-session__usage-detail">
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${[n.provider,n.model,n.effort].filter(Boolean).join(" \xB7 ")}</span
    >
    ${n.session_id?u`<span
          class="detail-session__leg-sid detail-session__sid"
          title=${n.session_id}
          >${n.session_id.slice(0,8)}</span
        >`:""}
    ${Ka(n.completed_at)?u`<span class="detail-session__leg-time detail-session__time"
          >${Ka(n.completed_at)}</span
        >`:""}
    ${o?u`<span class="detail-session__usage" title=${o.tooltip}
          >${o.label}</span
        >`:""}
  </div>`}function Kh(e,t,n,r){let o=e.status==="running"?null:t,i=(o?Qt({providers:{[e.provider]:{subtotal:o.subtotal,breakdown:o.usage,...o.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],l=e.status==="running"?Wo(e.last_event_at):o?Ka(o.completed_at):"",a=(e.provider==="claude"?["Claude",e.agent_type,Wh(e.model),e.effort]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),c=zh(e,o);return u`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>r.onOpenDelegation&&r.onOpenDelegation(n,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${jh[e.status]}</span
    >
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e.role}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${a}</span
    >
    <span
      class="detail-session__leg-sid detail-session__sid"
      title=${c.title}
      >${c.text}</span
    >
    ${l?u`<span class="detail-session__leg-time detail-session__time"
          >${l}</span
        >`:""}
    ${i?u`<span class="detail-session__usage" title=${i.tooltip}
          >${i.label}</span
        >`:""}
  </button>`}function Yh(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}function Vh(e,t,n){let r=[],o=new Set,s=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let d of s){let p=Hh(d);!p||o.has(p.launch_id)||Ad(p.agent_type)||(o.add(p.launch_id),r.push(p))}r.sort((d,p)=>(d.started_at||0)-(p.started_at||0));let i={};for(let{role:d,provider:p}of pi){let g=t?t.roles[d]?.[p]:null;i[d]=g?[...g.legs]:[]}let l=pi.flatMap(({role:d})=>i[d]),a=new Set,c=[];for(let{role:d,provider:p}of pi){for(let g of r.filter(_=>_.role===d&&_.provider===p)){let _=l.find($=>$.receipt_id===g.launch_id)||null;_&&!Yh(g,_)||(_&&a.add(_.receipt_id),c.push(Kh(g,_,e.attempt_id,n)))}for(let g of i[d])!a.has(g.receipt_id)&&!Ad(g.agent_type)&&c.push(Gh(d,p,g))}return c}function Qh(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[...Nh,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return u`<div class="detail-session__usage-detail">
    ${r.map(o=>u`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${o.label}</span
          ><span class="detail-session__usage-value"
            >${Bh(e[o.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${n===null?"":u`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${n.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?u`<span class="detail-session__usage-note">${Ed}</span>`:""}
  </div>`}var Xh={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Wo(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function Zh(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,r])=>typeof r=="string"&&r.length>0).map(([r,o])=>`${r}=${o}`).join(" \xB7 "):"",n=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return u`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${n}</span>
    ${t?u`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}var Jh={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function eb(e,t){let n=Jh[e.locality]||"",r=e.locality==="remote"?`${e.host} \xB7 \uB2E4\uB978 \uBA38\uC2E0`:e.locality==="missing"?`${e.host} \xB7 \uD30C\uC77C \uC5C6\uC74C`:e.host;return u`<div class="detail-session-row">
    <button
      type="button"
      class="detail-session detail-session--session"
      data-session-key=${Ui(e)}
      ?disabled=${n.length>0}
      title=${n}
      @click=${()=>{n.length===0&&t.onOpenSessionRef&&t.onOpenSessionRef(e)}}
    >
      <span class="detail-session__glyph">${e.current?"\u25D0":"\xB7"}</span>
      <span class="detail-session__id">${uo(e)}</span>
      <span class="detail-session__meta">${r}</span>
      <span class="detail-session__sid" title=${e.session_id}
        >${e.session_id.slice(0,8)}</span
      >
      <span class="detail-session__time">${Wo(e.last_event_at)}</span>
    </button>
    ${e.resume_command?u`<button
          type="button"
          class="detail-session__resume-cmd"
          title=${e.resume_command}
          @click=${o=>{o.stopPropagation(),t.onCopyResumeCommand&&e.resume_command&&t.onCopyResumeCommand(e.resume_command)}}
        >
          ⧉ 재개
        </button>`:""}
  </div>`}function Td(e,t={},n={},r=[]){let o=Array.isArray(e)?e:[],s=Array.isArray(r)?r:[],i=[...s.filter(_=>_&&_.current===!0),...s.filter(_=>_&&_.current!==!0).sort((_,$)=>$.index-_.index)],l=i.map(_=>eb(_,t)),a=n.expanded||new Set;if(o.length===0&&i.length===0)return u`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let c=new Set;for(let _ of o)_&&typeof _.resumed_from=="string"&&_.resumed_from.length>0&&c.add(_.resumed_from);let d=_=>{if(!(_.status==="failed"||_.status==="orphaned"))return"";let C=typeof _.session_id=="string"&&_.session_id.length>0,M=c.has(_.attempt_id),K=C&&!M,ie=C?M?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return u`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${_.attempt_id}
      ?disabled=${!K}
      title=${ie}
      @click=${ee=>{ee.stopPropagation(),K&&t.onResume&&t.onResume(_.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},p=_=>{if(!(_.status==="failed"||_.status==="orphaned")||typeof _.cause!="string"||_.cause==="")return"";let C=_.cause_detail,M=C&&typeof C.reason=="string"&&C.reason.length>0?typeof C.command=="string"&&C.command.length>0?`${C.reason} \xB7 ${C.command}`:C.reason:_.cause;return u`<div class="detail-session__cause" title=${M}>
      ${_.cause}
    </div>`},g=_=>{let $=Sd(Gi(_));if(Qt($).length===0&&!jr(_.usage))return"";let C=a.has(_.attempt_id);return u`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${_.attempt_id}
      aria-expanded=${C?"true":"false"}
      title=${C?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${M=>{M.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(_.attempt_id)}}
    >
      τ 자세히
    </button>`};return u`
    <div class="detail-section-label">
      세션 이력${Uh(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${l}${o.map(_=>{let $=Gi(_),C=Sd($),M=Qt(C);return u`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${_.status||"unknown"}"
            data-attempt-id=${_.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(_.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${Xh[_.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${_.attempt_id}</span>
            ${lo(_)?u`<span
                  class="detail-session__resumed"
                  title=${lo(_)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${fr(_)}</span>
            ${M.length>0?u`<span class="detail-session__role">orchestrator</span>`:""}
            ${_.session_id?u`<span class="detail-session__sid" title=${_.session_id}
                  >${String(_.session_id).slice(0,8)}</span
                >`:""}
            ${M.length>0?M.map(K=>u`<span
                      class="detail-session__usage"
                      title=${K.tooltip}
                      >${K.label}</span
                    >`):jr(_.usage)?u`<span class="detail-session__usage"
                    >${jr(_.usage)}</span
                  >`:""}
            <span class="detail-session__time">${Wo(_.started_at)}</span>
          </button>
          ${g(_)} ${d(_)} ${p(_)} ${Zh(_)}
          ${a.has(_.attempt_id)&&_.usage?Qh(_.usage,_.runner==="codex"?"codex":"claude"):""}
          ${Vh(_,$,t)}
        </div>`})}
    </div>
  `}function Cd(e,t={}){return u`
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
    ${e.expanded?u`<div class="detail-prompt" data-seam="task-prompt">
          ${tb(e)}
        </div>`:""}
  `}function tb(e){let t=Vr(e);if(t)return t;let n=e.data;if(!n)return"";if(n.missing)return u`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof n.default_task_prompt=="string"?Hn("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=ii(n.recorded_at);return u`<div class="detail-prompt__meta">
      ${n.attempt_id}${r?` \xB7 ${r}`:""}
    </div>
    ${typeof n.task_prompt=="string"?Hn("\uACFC\uC5C5 (user)",n.task_prompt):""}
    ${typeof n.system_prompt=="string"?Hn("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",n.system_prompt):""}`}var nb=["open","in_progress","deferred","resolved","closed"],rb=[0,1,2,3,4];function Rd(e,t){let n=t.issueStores,r=t.onClose,o=t.transport,s=t.onNavigate,i=t.queueStore,l=t.execPresetStore,a=t.sessionLogStore,c=null,d=null,p={},g="",_=!1,$=[],C=!1,M={},K={claude:null,codex:null},ie=null,ee=null,j=0,P=!1,I=!1,W="",G="",te="",N="",V=!1;function H(){P=!1,I=!1,W="",G="",te="",N="",V=!1}function X(){K={claude:null,codex:null},ie=null,ee=null,j+=1}async function Re(){if(!o)return null;try{let k=await Promise.resolve(o("get-workspace-accounts",{}));return k&&typeof k.state=="string"?k:null}catch{return null}}async function we(k){try{let Z=await fetch(k);if(!Z.ok)return null;let q=await Z.json();if(!q||typeof q!="object"||!Array.isArray(q.accounts))return null;let Ie=q.accounts.filter(et=>et!==null&&typeof et=="object"&&!Array.isArray(et));return{accounts:Ie,active:Ie.find(et=>et.active===!0)||null}}catch{return null}}async function ce(k){ee=k;let Z=++j,[q,Ie,et]=await Promise.all([we("/api/claude-usage"),we("/api/codex-usage"),Re()]);Z!==j||k!==c||(K={claude:q,codex:Ie},ie=et,ut())}let F=[],$e=null,Se=null,S=!1,ne="",Te=!1,_e=0,ke=new Set;function he(){F=[],$e=null,Se=null,S=!1,ne="",Te=!1,_e+=1,ke.clear()}async function Be(k){if(!o)return;let Z=++_e;try{let q=await Promise.resolve(o("get-comments",{id:k}));if(Z!==_e||k!==c)return;F=Array.isArray(q)?q:[],S=!1}catch{if(Z!==_e||k!==c)return;S=!0}ut()}function pt(){if(!o||!c)return;let k=d&&typeof d.comment_count=="number"?d.comment_count:null;if($e!==c){$e=c,Se=k,Be(c);return}k!==null&&k!==Se&&(Se=k,Be(c))}function Pe(k){ke.has(k)?ke.delete(k):ke.add(k),ut()}function B(k){let Z=ne.trim().length===0;ne=k,Z!==(k.trim().length===0)&&ut()}async function de(){let k=ne.trim();if(!o||!c||k.length===0||Te)return;let Z=c;Te=!0,ut();let q=!1;try{let Ie=await Promise.resolve(o("add-comment",{id:Z,text:k}));Array.isArray(Ie)&&Ie.length>0&&(q=!0,Z===c&&(F=Ie,S=!1,ne="",Se=Ie.length))}catch{q=!1}q||ge("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),Z===c&&(Te=!1),ut()}let ae={onToggle:Pe,onDraftInput:B,onSubmit:de},le=t.mdViewer||null,xe=null;le||(xe=document.createElement("div"),xe.className="md-viewer-root",document.body.appendChild(xe));let me=le||di(xe,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),Oe=document.createElement("div");Oe.className="session-log-root",document.body.appendChild(Oe);let Qe=Qr(Oe,{transport:o?(k,Z)=>Promise.resolve(o(k,Z)):void 0,sessionLogStore:a}),He=!1,Ue=!1,re=!1,z=null,Ae=null,dt=0;function x(k){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${k}`}function U(){He=!1,Ue=!1,re=!1,z=null,Ae=null,dt+=1}async function ye(k){if(!o)return;let Z=++dt;Ue=!0,re=!1,ut();try{let q=await Promise.resolve(o("get-bead-prompt",{bead_id:k}));if(Z!==dt)return;!q||typeof q!="object"||Array.isArray(q)?re=!0:(z=q,Ae=x(k))}catch{Z===dt&&(re=!0)}finally{Z===dt&&(Ue=!1,ut())}}let De=[],qe=null,je=0;function ft(k,Z){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${k}::${Z}`}function xt(){De=[],qe=null,je+=1}async function Rt(k,Z){if(!o)return;let q=++je,Ie;try{Ie=await Promise.resolve(o("get-session-refs",{bead_id:k}))}catch{Ie=null}q!==je||Z!==qe||(De=Ie&&Array.isArray(Ie.sessions)?Ie.sessions:[],ut())}function Ft(){if(!o||!c)return;let k=d&&d.metadata,Z=k&&typeof k=="object"&&typeof k.session_ref=="string"?k.session_ref:null;if(Z===null){xt();return}let q=ft(c,Z);qe!==q&&(De=[],qe=q,Rt(c,q))}function Mt(){if(He=!He,He&&c&&Ae!==x(c)){z=null,ye(c);return}ut()}function bt(){if(!i||!c)return[];let k=i.get();return(k&&k.attempts?Object.values(k.attempts):[]).filter(q=>q&&q.bead_id===c).sort((q,Ie)=>(Ie.started_at||0)-(q.started_at||0)).map(q=>({attempt_id:q.attempt_id,bead_id:q.bead_id,status:q.status,started_at:typeof q.started_at=="number"?q.started_at:null,runner:q.runner||null,model:q.model||null,effort:q.effort||q.observed_effort||null,speed:q.speed||null,session_id:q.session_id||null,resumed_from:q.resumed_from||null,continuation_mode:q.continuation_mode||null,dismissed_at:typeof q.dismissed_at=="number"?q.dismissed_at:null,cause:typeof q.cause=="string"?q.cause:null,cause_detail:q.cause_detail||null,exec_default_preset_id:typeof q.exec_default_preset_id=="string"?q.exec_default_preset_id:null,exec_default_preset_revision:typeof q.exec_default_preset_revision=="number"?q.exec_default_preset_revision:null,exec_values:q.exec_values&&typeof q.exec_values=="object"?q.exec_values:null,usage:q.usage||null,usage_legs:Array.isArray(q.usage_legs)?q.usage_legs:[],delegation_sessions:Array.isArray(q.delegation_sessions)?q.delegation_sessions:[]}))}function Ve(){if(!i||!c)return null;let k=i.get();return jn(k&&k.attempts||{},c)}let L=new Set;function oe(k){L.has(k)?L.delete(k):L.add(k),ut()}function be(k){let Z=i?i.get():null,q=Z&&Z.attempts?Z.attempts[k]:null;Qe.open({attempt_id:k,meta:q?{runner:q.runner||void 0,model:q.model||void 0,effort:q.effort||void 0,status:q.status||void 0,session_id:q.session_id||void 0}:{}})}function R(k,Z){let q=i?i.get():null,Ie=q&&q.attempts?q.attempts[k]:null,ot=(Ie&&Array.isArray(Ie.delegation_sessions)?Ie.delegation_sessions:[]).find(fe=>fe&&typeof fe=="object"&&fe.launch_id===Z);ot&&Qe.open({attempt_id:k,launch_id:Z,meta:{runner:ot.provider==="claude"?"claude":"codex",role:ot.role,...typeof ot.agent_type=="string"?{agent_type:ot.agent_type}:{},model:ot.model,effort:ot.effort,session_id:ot.session_id,status:ot.status}})}async function Q(k){if(!o||!k)return;let Z=await Nr();if(Z===null)return;let q=()=>{let fe=i?i.get():null;return fe&&typeof fe.revision=="number"?fe.revision:0},Ie=async(fe={},Ce=q())=>await o("worker-attempt-resume",{attempt_id:k,expected_revision:Ce,...Z!==""?{instructions:Z}:{},...fe}),et=fe=>{fe?.queue&&i?.set&&i.set(fe.queue)},ot=await Ie();if(et(ot),ot&&ot.conflict){let fe=ot.queue&&typeof ot.queue.revision=="number"?ot.queue.revision:q();ot=await Ie({},fe),et(ot)}ot=await qn(ot,(fe,Ce)=>Ie({continuation:fe,decision_token:Ce}),{onResult:et,refresh:()=>Ie()}),ot&&ot.resumed===!1&&!ot.conflict&&ot.reason&&ge(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${ot.reason}`,"error",2400)}function Ne(k){!k||!c||Qe.open(qr(k,c,d&&d.status))}let Ye={onOpen:be,onOpenDelegation:R,onResume:Q,onToggleUsage:oe,onOpenSessionRef:Ne,onCopyResumeCommand:zt};function Me(){let k=i?i.get():null,Z={...M};for(let q of["orchestration_model","orchestration_effort","orchestration_speed"]){let Ie=k&&k[q];typeof Ie=="string"&&(Z[q]=Ie)}return Z}async function nt(){if(o){try{let k=await Promise.resolve(o("get-session-defaults",{}));M=k&&k.values&&typeof k.values=="object"?k.values:{}}catch{M={}}ut()}}function at(){let k=i?i.get():null;return k&&k.runner_catalog||null}function ze(){let k=i?i.get():null;return k&&typeof k.execution_defaults=="object"?k.execution_defaults:null}function rt(){let k=d?.metadata&&typeof d.metadata=="object"?d.metadata:{},q=pn({pin:{...k,...p},global:Me(),execution_defaults:ze(),runner_catalog:at(),route:typeof k.route=="string"?k.route:null}).orchestration_model.value||"";return wn(at(),q)}function vt(){let k=l?l.get():null;return!k||typeof k.revision!="number"?null:{revision:k.revision,presets:Array.isArray(k.presets)?k.presets:[]}}function Ge(k){return k?.compatible===!1}function Ot(k){l&&k&&typeof k.revision=="number"&&Array.isArray(k.presets)&&l.set({revision:k.revision,presets:k.presets})}async function Xe(){let k=vt(),Z=k?.presets.find(q=>q.id===g);if(!(!o||!c||!k||!Z||Ge(Z)||_)){_=!0,$=[],ut();try{let q=await Promise.resolve(o("apply-impl-preset",Pc(c,Z.id,k.revision)));if(q&&q.conflict){Ot(q),ge("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let Ie=q&&Array.isArray(q.issue)?q.issue[0]:q?.issue;if(q&&q.applied&&Ie&&typeof Ie=="object"){d=Ie,$=Array.isArray(q.skipped_orchestration_keys)?q.skipped_orchestration_keys.filter(et=>typeof et=="string"):[];for(let et of Dc)delete p[et];ge($.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}q&&q.error==="bd_readback_failed"?ge("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ge("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(q){q&&typeof q=="object"&&q.code==="bd_readback_failed"?ge("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ge("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{_=!1,ut()}}}let st=null;n&&n.subscribe&&(st=n.subscribe(()=>Wt()));let Nt=null;i&&typeof i.subscribe=="function"&&(Nt=i.subscribe(()=>{c&&ut()}));let At=null,St=null;function Vt(){St&&(St(),St=null)}l&&typeof l.subscribe=="function"&&(At=l.subscribe(()=>{c&&ut()}));function en(k){k.key==="Escape"&&c&&(k.preventDefault(),r())}document.addEventListener("keydown",en);function Wt(){if(c){if(n&&typeof n.snapshotFor=="function"){let k=n.snapshotFor("detail:"+c)||[];d=k.find(q=>q&&q.id===c)||k[0]||d}pt(),Ft(),ut()}}function zt(k){nn(k).then(Z=>{Z?ge("\uBCF5\uC0AC\uB428","success",1200):ge("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function Tt(k){k.preventDefault(),k.stopPropagation(),c&&zt(c)}function mn(k,Z){k.preventDefault(),k.stopPropagation(),zt(Z)}function Kt(k,Z,q){k.preventDefault(),k.stopPropagation(),me.open(Z,{missing_state:q})}async function kt(k,Z){let q=Object.hasOwn(p,k),Ie=p[k];if(p[k]=Z,ut(),!(!o||!c))try{let et=await Promise.resolve(o("update-exec-settings",Ic(c,k,Z.length===0?null:Z))),ot=Array.isArray(et)?et[0]:et;if(!ot||typeof ot!="object"||!ot.id)throw new Error("exec settings readback failed");d=ot,delete p[k],ut()}catch(et){throw q?p[k]=Ie:delete p[k],ut(),ge("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error"),et}}function Ht(k){k.catch(()=>{})}async function cn(k,Z){let q=d||{},Ie=q.metadata&&typeof q.metadata=="object"?q.metadata:{},et={};for(let Ce of["impl_runtime","impl_model","impl_effort"])et[Ce]=Object.hasOwn(p,Ce)?p[Ce]:typeof Ie[Ce]=="string"?Ie[Ce]:"";et[k]=Z;let ot=qc(et,at(),rt()),fe={};for(let Ce of["impl_runtime","impl_model","impl_effort"])fe[Ce]=p[Ce],p[Ce]=ot[Ce]||"";if(ut(),!(!o||!c))return Promise.resolve(o("update-impl-target",{id:c,...ot,orchestration_runtime:rt()})).then(Ce=>{let tt=Array.isArray(Ce)?Ce[0]:Ce;if(!tt||typeof tt!="object"||!tt.id)throw new Error("implementation target readback failed");d=tt;for(let hn of["impl_runtime","impl_model","impl_effort"])delete p[hn];ut()}).catch(Ce=>{for(let tt of["impl_runtime","impl_model","impl_effort"])fe[tt]===void 0?delete p[tt]:p[tt]=fe[tt];throw ut(),ge("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error"),Ce})}async function ve(k,Z){if(!(!k||typeof k!="object")&&!(Z==="diverged"&&!window.confirm("\uCD94\uCC9C \uC2E4\uD589 \uC124\uC815\uC744 \uC801\uC6A9\uD560\uAE4C\uC694? \uD604\uC7AC \uC218\uB3D9 \uC124\uC815\uC744 \uB36E\uC5B4\uC501\uB2C8\uB2E4."))){try{await kt("orchestration_model",k.orchestration_model)}catch{return}if(typeof k.impl_runtime=="string"&&k.impl_runtime.length>0)try{await cn("impl_runtime",k.impl_runtime)}catch{}}}async function E(k,Z,q){if(!o||!c)return!1;try{let Ie=await Promise.resolve(o(k,Z)),et=Array.isArray(Ie)?Ie[0]:Ie;return et&&typeof et=="object"&&et.id?(d=et,!0):(ge(q,"error"),!1)}catch(Ie){return Ie&&typeof Ie=="object"&&Ie.code==="bd_readback_failed"?(ge("\uC800\uC7A5\uB410\uC73C\uB098 \uD655\uC778 \uC2E4\uD328 \u2014 \uACE7 \uAC31\uC2E0\uB429\uB2C8\uB2E4","error"),{ok:!1,saved:!0}):(ge(q,"error"),!1)}}function h(k){setTimeout(()=>{try{let Z=e.querySelector(k);Z&&typeof Z.focus=="function"&&Z.focus()}catch{}},0)}function A(){P=!0,W=d&&d.title||"",ut(),h('.detail-edit__input[data-edit="title"]')}function J(k){W=k.target.value}function Fe(){P=!1,W="",ut()}function Le(){E("edit-text",{id:c,field:"title",value:W},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(Z=>{Z===!0&&(P=!1,W=""),ut()})}function Ke(){I=!0,G=d&&d.description||"",ut(),h('.detail-edit__textarea[data-edit="description"]')}function yt(k){G=k.target.value}function gt(){I=!1,G="",ut()}function _t(){E("edit-text",{id:c,field:"description",value:G},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(Z=>{Z===!0&&(I=!1,G=""),ut()})}function lt(k,Z,q,Ie){if(k.key==="Escape"){k.stopPropagation(),q();return}k.key==="Enter"&&(!Ie||k.ctrlKey||k.metaKey)&&(k.preventDefault(),Z())}function m(k){let Z=k.target.value;E("update-status",{id:c,status:Z},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>ut())}function b(k){let Z=Number(k.target.value);E("update-priority",{id:c,priority:Z},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>ut())}function T(k){te=k.target.value}function D(){let k=te.trim();k.length!==0&&E("label-add",{id:c,label:k},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(Z=>{Z===!0&&(te=""),ut()})}function f(k){if(k.key==="Escape"){k.stopPropagation(),te="",ut();return}k.key==="Enter"&&(k.preventDefault(),D())}function y(k){E("label-remove",{id:c,label:k},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>ut())}let Y={onCopyPath:mn,onOpenDoc:Kt};function ue(k){return typeof k=="string"?k:k&&typeof k=="object"?String(k.id||k.to||k.issue_id||k.depends_on||""):""}function Ee(k){return k&&typeof k=="object"?String(k.dependency_type||k.type||""):""}function v(k){switch(k){case"discovered-from":return"\u21A9 \uBC1C\uACAC ";case"parent-child":return"\u2338 \uC0C1\uC704 ";case"related":return"\uAD00\uB828 ";default:return k.length>0?`${k} `:""}}function w(k){if(!k||typeof k!="object")return;let Z=typeof k.status=="string"?k.status:"",q=typeof k.title=="string"?k.title:"";return Z.length>0&&q.length>0?`${Z} \xB7 ${q}`:void 0}function O(){return(t.getWorkspacePath&&t.getWorkspacePath()||"").trim()}function se(){return t.depCandidates?t.depCandidates():null}async function pe(k,Z,q){let Ie=O(),et=c;if(!et)return;if(Ie.length===0){ge("\uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}let ot=await E(k,{a:et,b:Z,view_id:et,root_dir:Ie},q),fe=ot===!0||ot!==!1&&ot.saved===!0;fe&&t.onDepChanged&&t.onDepChanged({type:k,a:et,b:Z}),k==="dep-add"&&fe&&(N="",V=!1),ut()}function We(k){if(!c)return;let Z=globalThis.confirm;typeof Z=="function"&&!Z(`${k}\uAC00 ${c}\uB97C \uB9C9\uB294 \uC5F0\uACB0\uC744 \uB04A\uC744\uAE4C\uC694?`)||pe("dep-remove",k,"\uC758\uC874 \uD574\uC81C \uC2E4\uD328")}function it(k){k.disabled||pe("dep-add",k.bead_id,"\uC758\uC874 \uCD94\uAC00 \uC2E4\uD328")}function qt(k){N=k.target.value,V=!0,ut()}function Ze(){V||(V=!0,ut())}function It(k,Z){if(k.key==="Escape"){k.stopPropagation(),N="",V=!1,ut();return}k.key==="Enter"&&(k.preventDefault(),Z.length===1&&!Z[0].disabled&&it(Z[0]))}function Zt(k){return u`<div class="detail-dep-add">
      <input
        class="detail-dep-add__input"
        aria-label="막는 이슈 추가"
        placeholder="막는 이슈 추가"
        .value=${N}
        @focus=${Ze}
        @input=${qt}
        @keydown=${Z=>It(Z,k)}
      />
      ${V||N.length>0?u`<div class="detail-dep-add__list">
            ${k.length===0?u`<div class="detail-dep-add__empty">후보 없음</div>`:k.map(Z=>u`<button
                      type="button"
                      class="detail-dep-add__cand"
                      data-dep-cand=${Z.bead_id}
                      ?disabled=${Z.disabled}
                      title=${Jt(Z.reason)}
                      @click=${()=>it(Z)}
                    >
                      <span class="detail-dep-add__repo"
                        >${Z.workspace_name}</span
                      >
                      <span class="detail-dep-add__id"
                        >${Z.bead_id}</span
                      >
                      <span class="detail-dep-add__title"
                        >${Z.title}</span
                      >
                    </button>`)}
          </div>`:""}
    </div>`}function Tn(k,Z){let q=Z.get(k.id),Ie=s?u`<button
          type="button"
          class="detail-dep__link"
          title=${Jt(k.title)}
          @click=${()=>q===void 0?s(k.id):s(k.id,q)}
        >
          ${k.label}
        </button>`:u`<span class="detail-dep__link" title=${Jt(k.title)}
          >${k.label}</span
        >`;return u`<span
      class=${`detail-dep detail-dep--${k.kind}${s?" detail-dep--link":""}`}
      >${Ie}${k.kind==="pred"?u`<button
            type="button"
            class="detail-dep__unlink"
            data-dep-b=${k.id}
            aria-label=${"\uC758\uC874 \uD574\uC81C: "+k.id}
            @click=${()=>We(k.id)}
          >
            ✕
          </button>`:""}</span
    >`}function sr(k){let Z=Array.isArray(k.dependencies)?k.dependencies:[],q=Array.isArray(k.dependents)?k.dependents:[],Ie=[];for(let Ce of Z){let tt=ue(Ce);tt.length>0&&Ee(Ce)==="blocks"&&Ie.push({id:tt,label:`\u26D3 \uB9C9\uB294 ${tt}`,kind:"pred",title:w(Ce)})}for(let Ce of q){let tt=ue(Ce);tt.length>0&&Ee(Ce)==="blocks"&&Ie.push({id:tt,label:`\u26D3 \uB9C9\uD788\uB294 ${tt}`,kind:"succ",title:w(Ce)})}for(let Ce of Z){let tt=ue(Ce),hn=Ee(Ce);tt.length>0&&hn!=="blocks"&&Ie.push({id:tt,label:`${v(hn)}${tt}`,kind:"other",title:w(Ce)})}let et=se(),ot=new Map;if(et)for(let Ce of et.issues)ot.has(Ce.bead_id)||ot.set(Ce.bead_id,Ce.root_dir);let fe=et&&c?Eu(Su(c,et),N):[];return u`
      <div class="detail-section-label">의존성</div>
      ${Ie.length===0?u`<div class="detail-empty">의존성 없음</div>`:u`<div class="detail-deps">
            ${Ie.map(Ce=>Tn(Ce,ot))}
          </div>`}
      ${et===null?u`<div class="detail-empty">후보를 불러올 수 없음</div>`:Zt(fe)}
    `}function Cn(k){let Z=k.metadata||{},q=k.workflow||{},Ie=q.stages||{},et=Ie.spec&&Ie.spec.stale,ot=Ie.impl&&Ie.impl.stale,fe=q.quick_fix_review?.state==="stale",Ce=Ie.plan||null,tt=q.route_source==="derived",hn=q.route||Z.route||"\u2014";return u`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${tt?" detail-kv__v--derived":""}"
          title=${tt?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${tt?"unset":hn}</span
        >
      </div>
      ${q.route!=="quick_fix"||Object.hasOwn(Z,"spec_review")?u`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${Z.spec_review||"\uC5C6\uC74C"}${et?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${q.route==="full_plan"?u`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Ce?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Ce?.approval_receipt||"\uC5C6\uC74C"}${Ce?.approval_state==="stale"?" \xB7 stale":Ce?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${q.route!=="quick_fix"||Object.hasOwn(Z,"impl_review")?u`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${Z.impl_review||"\uC5C6\uC74C"}${ot?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${q.resolver?u`<div class="detail-kv">
            <span class="detail-kv__k">↳ 충돌 해소</span>
            <span
              class="detail-kv__v detail-kv__v--resolver detail-kv__v--wrap"
              title=${`resolver-self:${q.resolver.attempt} \xB7 ${q.resolver.prior_sha} \u2192 ${q.resolver.sha}`}
              >${`${q.resolver.prior_sha.slice(0,7)} \u2192 ${q.resolver.sha.slice(0,7)}`}</span
            >
          </div>`:""}
      ${q.route==="quick_fix"||Object.hasOwn(Z,"quick_fix_review")?u`<div class="detail-kv">
            <span class="detail-kv__k">quick_fix_review</span>
            <span class="detail-kv__v"
              >${Z.quick_fix_review||"\uC5C6\uC74C"}${fe?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${q.planned_execution?u`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${q.planned_execution.kind}</span>
            </div>
            ${q.planned_execution.kind==="main"?u`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${q.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${q.exec_receipt?u`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${Nn(q.exec_receipt)}</span
            >
          </div>`:""}
      ${q.impl_entry?u`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${q.impl_entry.actor}@${q.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${Z.pr_url?u`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${Z.pr_url}</span>
          </div>`:""}
    `}let Yt={route:["quick_fix","spec_backed","full_plan"]};async function Gn(k,Z){let q=Z.target.value;if(k==="route"&&d&&d.metadata&&d.metadata.route==="full_plan"&&q!=="full_plan"&&!window.confirm(`full_plan \u2192 ${q||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){ut();return}await E("update-workflow-meta",{id:c,key:k,value:q},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),ut()}function xr(k){let Z=k.metadata||{};return u` ${((Ie,et)=>{let ot=Yt[Ie],fe=typeof Z[Ie]=="string"?Z[Ie]:"";return u`<div class="detail-kv">
        <span class="detail-kv__k">${Ie}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${Ie}
          data-edit=${`wfmeta-${Ie}`}
          @change=${Ce=>Gn(Ie,Ce)}
        >
          <option value="" ?selected=${!ot.includes(fe)}>
            ${et}
          </option>
          ${ot.map(Ce=>u`<option value=${Ce} ?selected=${fe===Ce}>${Ce}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function Ar(k,Z){return P?u`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${W}
            @input=${J}
            @keydown=${q=>lt(q,Le,Fe,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${Le}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${Fe}
            >
              취소
            </button>
          </div>
        </div>
      `:u`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${k}</h2>
        ${Qt(Z).map(q=>u`<span class="detail-usage-total" title=${q.tooltip}
              >${q.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${A}
        >
          ✎
        </button>
      </div>
    `}function Rn(k){let Z=Gt(k.created_at),q=Gt(k.updated_at);return!Z&&!q?u``:u`
      ${Z?u`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${Z}</span>
          </div>`:""}
      ${q?u`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${q}</span>
          </div>`:""}
    `}function Dn(k,Z){return u`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${m}
        >
          ${nb.map(q=>u`<option value=${q} ?selected=${q===k}>${q}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${b}
        >
          ${rb.map(q=>u`<option value=${String(q)} ?selected=${q===Z}>
                P${q}
              </option>`)}
        </select>
      </div>
    `}function Kn(k){return u`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${I?"":u`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${Ke}
            >
              ✎
            </button>`}
      </div>
      ${I?u`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${G}
              @input=${yt}
              @keydown=${Z=>lt(Z,_t,gt,!0)}
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
                @click=${gt}
              >
                취소
              </button>
            </div>
          </div>`:u`<div class="detail-overlay__desc">
            ${k||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function Je(k){let Z=typeof k.notes=="string"?k.notes:"";return Z.trim().length===0?u``:u`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${Z}</div>
    `}function jt(k){let Z=Array.isArray(k.labels)?k.labels:[];return u`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${Z.map(q=>u`<span class="detail-label-chip"
              >${q}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${q}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+q}
                @click=${()=>y(q)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${te}
            @input=${T}
            @keydown=${f}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${D}
          >
            추가
          </button>
        </span>
      </div>
    `}function gn(){if(!c)return u``;let k=d||{},Z=String(k.id||c),q=k.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",Ie=Ve(),et=k.status||"open",ot=typeof k.priority=="number"?Math.max(0,Math.min(4,k.priority)):"",fe=k.description||"",Ce={...k,metadata:{...k.metadata||{},...p}};return u`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${()=>r()}></div>
        <div class="detail-overlay__panel">
          <div class="detail-overlay__bar">
            <button
              type="button"
              class="detail-overlay__id"
              title="ID 복사"
              @click=${Tt}
            >
              ${Z}
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
          ${Ar(q,Ie)}
          ${bd(Ce,{onApplyRec:ve})}
          ${hd({metadata:Ce.metadata,workspace_values:Me(),catalog:at(),execution_defaults:ze(),expanded:C,presets:vt()?.presets||[],preset_id:g,preset_busy:_,skipped_orchestration_keys:$},{onToggle:tt=>{C=tt,ut()},onEdit:(tt,hn)=>{if(tt==="impl_runtime"||tt==="impl_model"||tt==="impl_effort"){Ht(cn(tt,hn??""));return}Ht(kt(tt,hn??""))},onPresetSelect:tt=>{g=tt,$=[],ut()},onPresetApply:()=>{Xe()}})}
          ${xd({md:Ce.metadata,catalog:K,workspace_defaults:ie,handlers:{onExecChange:(tt,hn)=>Ht(kt(tt,hn))}})}
          ${Dn(et,ot)} ${Rn(k)}
          ${Kn(fe)}
          ${fd(F,ae,{expanded:ke,draft:ne,sending:Te,error:S})}
          ${Je(k)} ${jt(k)} ${sr(k)}
          ${Cn(k)} ${xr(k)}
          ${ud(k,Y)}
          ${Cd({expanded:He,loading:Ue,error:re,data:z},{onToggle:Mt})}
          ${Td(bt(),Ye,{total:Ie,expanded:L},De)}
        </div>
      </div>
    `}function ut(){ct(gn(),e)}return{load(k){k!==c&&(p={},g="",$=[],C=!1,H(),he(),U(),xt(),X()),c=k,d=null,!St&&t.subscribeCandidates&&(St=t.subscribeCandidates(()=>{c&&ut()})),Wt(),nt(),ee!==k&&ce(k)},clear(){c=null,d=null,p={},g="",_=!1,$=[],C=!1,H(),he(),U(),xt(),X(),Vt(),me.close(),Qe.close(),ct(u``,e)},destroy(){st&&(st(),st=null),Nt&&(Nt(),Nt=null),At&&(At(),At=null),Vt(),document.removeEventListener("keydown",en),le||(me.destroy(),xe&&xe.parentNode&&xe.parentNode.removeChild(xe)),Qe.destroy(),Oe.parentNode&&Oe.parentNode.removeChild(Oe),c=null,d=null,X(),g="",_=!1,$=[],he(),U(),xt(),ct(u``,e)}}}function Od(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),o=t.querySelector("#fatal-error-detail"),s=t.querySelector("#fatal-error-reload"),i=t.querySelector("#fatal-error-close"),l=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},a=(c,d,p="")=>{n&&(n.textContent=c||"Unexpected Error"),r&&(r.textContent=d||"An unrecoverable error occurred.");let g=typeof p=="string"?p.trim():"";if(o&&(g.length>0?(o.textContent=g,o.removeAttribute("hidden")):(o.textContent="No additional diagnostics available.",o.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return s&&s.addEventListener("click",()=>{window.location.reload()}),i&&i.addEventListener("click",()=>l()),t.addEventListener("cancel",c=>{c.preventDefault(),l()}),{open:a,close:l,getElement(){return t}}}var ob="(max-width: 640px)";function fi(e){if(typeof window.matchMedia!="function")return e(!1),()=>{};let t=window.matchMedia(ob),n=!!t.matches;e(n);let r=o=>{let i=!!(typeof o=="object"&&o!==null&&typeof o.matches=="boolean"?o.matches:t.matches);i!==n&&(n=i,e(i))};return typeof t.addEventListener=="function"?(t.addEventListener("change",r),()=>{t.removeEventListener("change",r)}):typeof t.addListener=="function"?(t.addListener(r),()=>{typeof t.removeListener=="function"&&t.removeListener(r)}):()=>{}}function sb(){return{lanes:{done:!0},areas:{}}}function zo(e){let t={};if(typeof e!="object"||e===null)return t;for(let[n,r]of Object.entries(e))typeof r=="boolean"&&(t[n]=r);return t}function ib(e){try{let t=window.localStorage.getItem(e);if(!t)return null;let n=JSON.parse(t);if(typeof n!="object"||n===null)return null;let r=n;return typeof r.lanes=="object"&&r.lanes!==null?{lanes:zo(r.lanes),areas:zo(r.areas)}:{lanes:zo(r),areas:{}}}catch{return null}}function Ld(e,t){try{window.localStorage.setItem(e,JSON.stringify(t))}catch{}}function _i(e,t=sb()){let n={lanes:zo(t.lanes),areas:zo(t.areas)},r=ib(e),o={lanes:{...n.lanes,...r?r.lanes:{}},areas:{...n.areas,...r?r.areas:{}}};return{isCollapsed(s){return o.lanes[s]===!0},isAreaCollapsed(s){return o.areas[s]===!0},toggle(s){let i=o.lanes[s]!==!0;return o={...o,lanes:{...o.lanes,[s]:i}},Ld(e,o),i},toggleArea(s){let i=o.areas[s]!==!0;return o={...o,areas:{...o.areas,[s]:i}},Ld(e,o),i}}}function Ya(e){if(typeof e=="string"&&e.length>0)return e;if(e&&typeof e=="object"){let t=e;if(typeof t.message=="string"&&t.message.length>0)return t.message;if(typeof t.error=="string"&&t.error.length>0)return t.error;if(t.error&&typeof t.error=="object"&&typeof t.error.message=="string")return t.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}function mi(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"&&t.length>0):[]}function gi(e){let{transport:t,console_el:n,getLanes:r,getWorkspaces:o,getCrossLanes:s,reproject:i,onCorrection:l,showToast:a,requestRender:c,adoptQueue:d,onDragBegin:p,candidate_drop:g}=e,_=[],$=null,C=!1,M=null,K=null,ie=null;function ee(){M!==null&&clearTimeout(M),M=setTimeout(()=>{M=null,C=!1},0)}function j(){return s()??null}function P(){let B=new Map,de=o();for(let ae of Array.isArray(de)?de:[]){if(!ae||typeof ae!="object")continue;let le=ae.bead_blocked_by&&typeof ae.bead_blocked_by=="object"?ae.bead_blocked_by:{};for(let[xe,me]of Object.entries(le))Array.isArray(me)&&B.set(xe,mi(me));for(let xe of[...Array.isArray(ae.runnable)?ae.runnable:[],...Array.isArray(ae.session_active)?ae.session_active:[]])xe&&typeof xe.bead_id=="string"&&Array.isArray(xe.blocked_by)&&xe.blocked_by.length>0&&B.set(xe.bead_id,mi(xe.blocked_by))}return B}function I(){let B=new Map,de=new Map,ae=o();for(let le of Array.isArray(ae)?ae:[]){if(!le||typeof le!="object")continue;let xe=le.bead_blocked_by&&typeof le.bead_blocked_by=="object"?le.bead_blocked_by:{};for(let[me,Oe]of Object.entries(xe))Array.isArray(Oe)&&B.set(me,mi(Oe));for(let me of Array.isArray(le.runnable)?le.runnable:[])me&&typeof me.bead_id=="string"&&Array.isArray(me.blocked_by)&&de.set(me.bead_id,mi(me.blocked_by))}for(let le of _)for(let xe of[B,de]){let me=xe.get(le.a);me!==void 0&&xe.set(le.a,le.type==="dep-remove"?me.filter(Oe=>Oe!==le.b):me.includes(le.b)?me:[...me,le.b])}return{snapshot:B,runnable:de}}function W(){let B=P();for(let de of _){let ae=(B.get(de.a)||[]).slice();de.type==="dep-remove"?B.set(de.a,ae.filter(le=>le!==de.b)):ae.includes(de.b)||B.set(de.a,[...ae,de.b])}return B}function G(B=r(),de=j()){let ae=new Map;for(let Ue of Array.isArray(de?.lanes)?de.lanes:[]){let re=new Map;for(let z of Array.isArray(Ue?.entries)?Ue.entries:[])z&&typeof z.bead_id=="string"&&re.set(z.bead_id,z.dep_created_by_lane===!0);ae.set(typeof Ue?.id=="string"?Ue.id:"",re)}let le=new Map,xe=new Map,me=new Set,Oe=new Set;for(let Ue of B.chain_lanes){let re=ae.get(Ue.lane_id);le.set(Ue.lane_id,{status:Ue.status,entries:Ue.rows.map((z,Ae)=>({bead_id:z.id,root_dir:z.root_dir,...Ae===0?{}:{dep_created_by_lane:re?.get(z.id)===!0}}))});for(let z of Ue.rows)xe.set(z.id,Ue.lane_id),z.fixed&&me.add(z.id),z.unplaced||Oe.add(z.id)}let Qe=new Map;for(let Ue of B.parallel_rows)typeof Ue.queue_index=="number"&&Qe.set(Ue.id,Ue.queue_index);for(let Ue of B.queue_groups)for(let re of Ue.sublanes.serial)for(let z of re.items)typeof z.queue_index=="number"&&Qe.set(z.id,z.queue_index);let He=I();return{blocked_by_map:W(),snapshot_blocked_by:He.snapshot,runnable_blocked_by:He.runnable,owner_of:new Map(Object.entries(B.owner_of)),cross_lanes:le,owner_lane_of:xe,fixed_members:me,placed_members:Oe,parallel_rows:B.parallel_rows.map(Ue=>({bead_id:Ue.id,root_dir:Ue.root_dir,queue_index:Ue.queue_index??0})),parallel_raw_length:new Map(Object.entries(B.parallel_raw_length)),queue_index_of:Qe}}function te(B,de){let ae=r();for(let xe of[...ae.runnable,...ae.queue,...ae.running,...ae.pr_wait,...ae.done])if(!(xe.non_occupying||xe.id!==de)){if(xe.root_dir===B)return xe.expected_revision;break}let le=ae.queue_groups.find(xe=>xe.root_dir===B);return le?le.revision:0}async function N(B,de,ae,le){if(!t)return null;let me=await t(B,{...de,...ae?{root_dir:ae}:{},expected_revision:le});if(me&&me.conflict){me.queue&&d?.(ae,me.queue);let Oe=me.queue&&typeof me.queue.revision=="number"?me.queue.revision:le;me=await t(B,{...de,...ae?{root_dir:ae}:{},expected_revision:Oe})}return me&&me.queue&&d?.(ae,me.queue),me}async function V(B,de,ae,le,xe){try{let me=await N(B,de,ae,le.get(ae)??te(ae,xe.bead_id));return!me||typeof me.applied!="boolean"?(a("\uD050 \uC694\uCCAD\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error"),null):(me.queue&&typeof me.queue.revision=="number"&&le.set(ae,me.queue.revision),me.conflict?(a("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null):me.applied===!1?(a(me.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${me.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null):me.queue&&typeof me.queue.revision=="number"?me.queue.revision:le.get(ae)??0)}catch(me){return a(Ya(me),"error"),null}}async function H(B,de,ae=new Map){if(B.type==="worker-queue-disarm"){try{let le=await N(B.type,B.payload,B.root_dir,ae.get(B.root_dir)??te(B.root_dir,de));le&&le.queue&&typeof le.queue.revision=="number"&&ae.set(B.root_dir,le.queue.revision)}catch{}return!0}if(B.type==="worker-queue-place"||B.type==="worker-queue-reorder"||B.type==="worker-queue-remove")return await V(B.type,B.payload,B.root_dir,ae,{bead_id:de})!==null;try{return(B.type==="dep-add"||B.type==="dep-remove")&&t&&await t(B.type,{a:B.a,b:B.b,...B.root_dir?{root_dir:B.root_dir}:{}}),!0}catch(le){return a(Ya(le),"error"),!1}}function X(B){(B.type==="dep-add"||B.type==="dep-remove")&&(_=[..._,{type:B.type,a:B.a,b:B.b}])}async function Re(B,de){if(!t)return{ok:!1};try{let ae=await t(B.type,{...B.payload,expected_revision:de});return!ae||typeof ae.revision!="number"?(a("\uC5F0\uACB0 \uB808\uC778 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{ok:!1}):{ok:!0,revision:ae.revision}}catch(ae){let le=ae,xe=le&&le.code==="conflict"?le.details?.cross_lanes:null;return xe&&typeof xe.revision=="number"&&Array.isArray(xe.lanes)?{ok:!1,conflict:xe}:(a(Ya(ae),"error"),{ok:!1})}}async function we(B,de,ae){let le=new Map,xe=[],me=B.ops.slice(0,B.lane_op_index),Oe=B.ops.slice(B.lane_op_index);for(let He of me){if(!await H(He,ae,le))return{done:!0};X(He)}let Qe=de;for(let He of B.lane_ops){if(Qe===null)return a("\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{done:!0};let Ue=await Re(He,Qe);if(!Ue.ok)return Ue.conflict?{done:!1,conflict:Ue.conflict}:{done:!0};Qe=Ue.revision}for(let He of Oe){if(!await H(He,ae,le))return{done:!0};X(He),He.type==="dep-add"&&xe.push(He)}for(let He of xu(xe))Qe=await ce(He,Qe);return{done:!0}}async function ce(B,de){if(de===null||!t)return de;let ae=B.pairs,le=de;for(let xe=0;xe<2;xe+=1){if(ae.length===0)return le;try{let me=await t("monitor-lane-provenance",{lane_id:B.lane_id,pairs:ae.map(Oe=>({bead_id:Oe.bead_id,after:Oe.after,value:!0})),expected_revision:le});return me&&typeof me.revision=="number"?me.revision:le}catch(me){let Oe=me,Qe=Oe&&Oe.code==="conflict"?Oe.details?.cross_lanes:null;if(!Qe||typeof Qe.revision!="number"||!Array.isArray(Qe.lanes))return le;let He=Qe.lanes.find(Ue=>Ue&&Ue.id===B.lane_id);ae=Au(Array.isArray(He?.entries)?He.entries:[],ae),le=Qe.revision}}return le}async function F(B,de,ae=[]){_=ae,l("",0);let le=r(),xe=j();for(let me=0;;me+=1){let Oe=B(G(le,xe));if("refused"in Oe){a(Oe.refused,"error");break}let Qe=await we(Oe,le.cross_lanes_revision,de);if(Qe.done){Oe.correction&&l(Oe.correction.lane_id,Oe.correction.corrected);break}if(me>=1){a("\uB808\uC778\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4","error");break}let He=i(Qe.conflict);le=He.lanes,xe=He.raw_lanes}_=[],c()}async function $e(B,de){await F(ae=>Ys(B,de,ae),B.bead_id)}function Se(B,de){let ae=de&&typeof de.closest=="function"?de.closest("[data-row-index]"):null;if(ae&&B.contains(ae)){let le=Number(ae.getAttribute("data-row-index"));return Number.isFinite(le)?le:0}return B.querySelectorAll("[data-row-index]").length}function S(B){let de=typeof B?.closest=="function"?B.closest(".worker-pane--collapsed[data-lane]"):null;if(!de)return null;let ae=de.getAttribute("data-lane");return ae==="queue"?{zone:de,target:{kind:"parallel",marker_index:r().parallel_rows.length}}:ae==="candidate"&&g===!0?{zone:de,target:{kind:"candidate"}}:null}function ne(B){let de=B.target;if(!$)return null;let ae=typeof de?.closest=="function"?de.closest("[data-drop]"):null;if(!ae)return S(de);let le=ae.getAttribute("data-drop");if(le==="candidate")return{zone:ae,target:{kind:"candidate"}};if(le==="parallel")return{zone:ae,target:{kind:"parallel",marker_index:Se(ae,de)}};if(le==="chain")return{zone:ae,target:{kind:"chain",lane_id:ae.getAttribute("data-lane-id")||"",marker_index:Se(ae,de)}};if(le==="repo-serial"){let xe=ae.getAttribute("data-root-dir")||"";if(xe!==$.root_dir)return null;let me=typeof de?.closest=="function"?de.closest("[data-queue-index]"):null,Oe=me&&ae.contains(me)?me.getAttribute("data-queue-index"):ae.getAttribute("data-lane-length"),Qe=Number(Oe);return{zone:ae,target:{kind:"repo-serial",root_dir:xe,lane_id:ae.getAttribute("data-lane-id")||"",index:Number.isFinite(Qe)?Qe:0}}}return null}function Te(){for(let B of Array.from(n.querySelectorAll(".is-drop-over")))B.classList.remove("is-drop-over")}function _e(B){K=B.target instanceof Element?B.target:null}function ke(B){let de=B.target,ae=typeof de?.closest=="function"?de.closest('[draggable="true"][data-bead-id]'):null,le=ae?ae.closest("[data-drag-kind]"):null;if(!le)return;if(ae&&K&&ae.contains(K)&&typeof K.closest=="function"&&K.closest("input, button, a")){B.preventDefault();return}let xe=le.getAttribute("data-bead-id")||"",me=le.getAttribute("data-drag-kind")||"",Oe=le.getAttribute("data-root-dir")||"";if(!xe||!me)return;let Qe=le.getAttribute("data-queue-index")||"",He=Number(Qe),Ue=le.getAttribute("data-lane-id")||"";$={kind:me,bead_id:xe,root_dir:Oe,...Qe!==""&&Number.isFinite(He)?{queue_index:He}:{},...Ue?{lane_id:Ue}:{}},C=!0,p?.(),n.classList.add("is-dragging");try{B.dataTransfer?.setData("text/plain",xe),B.dataTransfer&&(B.dataTransfer.effectAllowed="move")}catch{}}function he(B){let de=ne(B);de&&(B.preventDefault(),B.dataTransfer&&(B.dataTransfer.dropEffect="move"),de.zone.classList.add("is-drop-over"))}function Be(B){let de=B.target;typeof de?.closest=="function"&&(de.closest("[data-drop]")?.classList.remove("is-drop-over"),de.closest(".worker-pane--collapsed")?.classList.remove("is-drop-over"))}function pt(){$=null,Te(),n.classList.remove("is-dragging"),ee()}function Pe(B){let de=ne(B),ae=$;$=null,Te(),n.classList.remove("is-dragging"),!(!de||!ae)&&(B.preventDefault(),$e(ae,de.target))}return{attach(B){ie||(ie=B,B.addEventListener("pointerdown",_e),B.addEventListener("dragstart",ke),B.addEventListener("dragover",he),B.addEventListener("dragleave",Be),B.addEventListener("drop",Pe),B.addEventListener("dragend",pt))},detach(){M!==null&&(clearTimeout(M),M=null);let B=ie;ie=null,B&&(B.removeEventListener("pointerdown",_e),B.removeEventListener("dragstart",ke),B.removeEventListener("dragover",he),B.removeEventListener("dragleave",Be),B.removeEventListener("drop",Pe),B.removeEventListener("dragend",pt))},isDragging(){return $!==null},consumeClickSuppression(){let B=C;return C=!1,B},applyDrop:$e,runPlanned:F,dropModel:G,sendOp:H,sendQueueCas:V,rememberDep:X}}function Pd(e,t){let n=new Map;if(!e||typeof e!="object")return n;let r=e,o=[],s=new Set;for(let i of t){if(s.has(i.id))continue;s.add(i.id);let l=r[i.id];if(!l||!Array.isArray(l.scope))continue;let a=l.scope.filter(c=>typeof c=="string"&&c.length>0);if(a.length===0){n.set(i.id,{overlaps:[],scope_missing:!0});continue}n.set(i.id,{overlaps:[],scope_missing:!1}),o.push({member:i,scope:a})}for(let i=0;i<o.length;i+=1)for(let l=i+1;l<o.length;l+=1){let a=Ss(o[i].scope,o[l].scope);if(a.length===0)continue;let c=o[i].member,d=o[l].member;n.get(c.id)?.overlaps.push({id:d.id,title:d.title,location_label:d.location_label,prefixes:a}),n.get(d.id)?.overlaps.push({id:c.id,title:c.title,location_label:c.location_label,prefixes:a})}return n}var ab=["parallel","serial","candidate"];function Id(e){return ab.includes(e.kind)?e.kind!=="candidate"||e.queue_placeable===!0:!1}function Ho(e){return e==="pr_wait"?"PR \uB300\uAE30":"\uC2E4\uD589 \uC911"}function Va(e,t,n){let r=n.members_by_id.get(e),o=n.members_by_id.get(t);if(!r||!o)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let s=r.lane_id,i=o.lane_id;if(s!==null&&s===i)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let l=Id(r),a=Id(o);if(r.kind==="candidate"&&!l)return{kind:"disabled",title:`${e}\uB294 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 (spec \uC5C6\uC74C \uB610\uB294 worker-ineligible)`};if(o.kind==="candidate"&&!a)return{kind:"disabled",title:`${t}\uB294 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 (spec \uC5C6\uC74C \uB610\uB294 worker-ineligible)`};if(l&&i!==null)return{kind:"ops",title:`${i} \uB05D\uC5D0 ${e}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:e,lane:i,index:n.serial_raw_lengths[i]||0}]};if(s!==null&&a&&i===null)return{kind:"ops",title:`${s} \uB05D\uC5D0 ${t}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:s,index:n.serial_raw_lengths[s]||0}]};if(l&&s===null&&a&&i===null){let c=lb(n);return c===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 \uC9C1\uB82C \uB808\uC778 \uC218\uB97C \uC870\uC808\uD558\uC138\uC694"}:{kind:"ops",title:`${c} \uB808\uC778\uC5D0 ${t} \u2192 ${e} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:c,index:0},{bead_id:e,lane:c,index:1}]}}return!l&&!a?{kind:"note",text:"\uB458 \uB2E4 \uC774\uBBF8 \uCD9C\uBC1C \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:l?{kind:"note",text:`${Ho(o.kind)} \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}:{kind:"note",text:`${Ho(r.kind)} \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}}function lb(e){for(let t=0;t<e.serial_lane_count;t+=1){let n=`s${t+1}`;if((e.serial_raw_lengths[n]||0)===0&&!e.occupied_lanes.has(n))return n}return null}var Qa=Object.freeze({repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",manual_target_missing:"\uC218\uB3D9 \uBC30\uD3EC \uAE30\uB85D\uC5D0 \uD540\uB41C \uB300\uC0C1 SHA\uAC00 \uC5C6\uC5B4 \uC2E4\uD589\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_red:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",repair_lane_retired:"\uC790\uB3D9 \uC218\uB9AC \uB808\uC778\uC774 \uC740\uD1F4\uD574 \uC0AC\uB78C \uCC98\uB9AC\uB85C \uB118\uC5B4\uC654\uC2B5\uB2C8\uB2E4."});var Dd={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428",quickfix_landing_failed:"\uCC29\uC9C0 \uC2E4\uD328",runner_exit:"\uC138\uC158 \uC2E4\uD328"};function bi(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function hi(e){for(let t of bi(e)){if(Object.hasOwn(Dd,t))return Dd[t];if(t.startsWith("session_"))return"\uC138\uC158 \uC2E4\uD328"}return null}function Nd(e){return bi(e).length===0?null:hi(e)||"\uC2E4\uD328"}function wr(e){let t=null;for(let n of bi(e))Object.hasOwn(Qa,n)&&(t=Qa[n]);return t}function Zr(e){let t=hi(e),n=wr(e);return t&&n?`${t} \u2014 ${n}`:t||n?t||n:typeof e=="string"?e:""}function qd(e,t){let n=hi(e)??hi(t),r=wr(t)??wr(e);return n&&r?`${n} \u2014 ${r}`:n||r?n||r:typeof t=="string"?t:""}var cb=new Set(["repo_operation_timeout_unresolved"]);function ub(e){for(let t of bi(e))if(cb.has(t)||t.startsWith("repo_ops_"))return!0;return!1}function db(e,t){return t.code==="interrupted"||t.interrupted===!0||e.failure_kind==="interrupted_without_terminal_exit"||t.code==="interrupted_without_terminal_exit"}function Fd(e,t){if(!e||typeof e!="object")return"";let n=e.failure;if(!n||typeof n!="object"||ub(n.code))return"";if(n.code==="timeout"){let o=Number(t);return Number.isFinite(o)&&o>0?`\uD0C0\uC784\uC544\uC6C3 ${Math.round(o/1e3)}\uCD08 \uCD08\uACFC`:"\uD0C0\uC784\uC544\uC6C3 \uCD08\uACFC"}if(db(e,n))return"\uC885\uB8CC \uAE30\uB85D \uC5C6\uC74C \u2014 \uC911\uB2E8\uB428";let r=typeof e.elapsed_ms=="number"&&Number.isFinite(e.elapsed_ms)&&e.elapsed_ms>=0?` \xB7 ${gr(e.elapsed_ms)}`:"";return typeof e.signal=="string"&&e.signal.length>0?`signal ${e.signal}${r}`:Number.isInteger(e.exit_code)?`exit ${e.exit_code}${r}`:""}var Md={schema_unsupported:"\uD540\uB41C \uC815\uCC45 \uC2A4\uD0A4\uB9C8\uB97C \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."};function jd(e){if(!e||typeof e!="object")return"";let t=e.retry;if(!t||typeof t!="object")return"";if(typeof t.blocked_reason=="string"&&t.blocked_reason)return`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uBABB \uD568 \u2014 ${Object.hasOwn(Md,t.blocked_reason)?Md[t.blocked_reason]:t.blocked_reason}`;if(t.status==="absorbed"){let n=t.absorbed&&typeof t.absorbed=="object"?t.absorbed:null,r=Zr(n?.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428 \u2014 \uCCAB \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428"}if(e.state!=="failed")return"";if(t.status==="not_applicable")return"\uC7AC\uC2DC\uB3C4 \uB300\uC0C1 \uC544\uB2D8 \u2014 \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804 \uC2E4\uD328";if(t.status==="consumed"){let n=typeof t.first_fingerprint=="string"&&t.first_fingerprint?t.first_fingerprint:null;if(n===null)return"";if(n===e.failure?.fingerprint)return"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uAC19\uC740 \uC2E4\uD328";let r=Zr(t.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328"}return""}function pb(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}function fb(e,t){if(!e||e.open!==!0)return"";let n=wr(e.cause)||Zr(e.cause),r=e.cause_detail,o=e.quickfix_lane&&e.quickfix_landing?e.quickfix_landing:null,s=o?[o.cursor||null,typeof o.head_sha=="string"?o.head_sha.slice(0,7):null,o.reason||null].filter(Boolean).join(" \xB7 "):"",i=typeof e.finished_at=="number"?`${new Date(e.finished_at).toLocaleString("ko-KR")} \xB7 ${tn(e.finished_at,t)}`:"",l=[e.runner,e.model,e.observed_effort??e.effort,e.speed].filter(d=>typeof d=="string"&&d.length>0).join(" \xB7 "),a=e.usage?.total_cost_usd,c=typeof a=="number"&&Number.isFinite(a)?`$${a.toFixed(2)}`:"";return u`<div
    class="rtile__failure-pop"
    role="dialog"
    aria-label="실패 상세"
  >
    <dl class="rtile__failure-kv">
      ${n?u`<div>
            <dt>원인</dt>
            <dd>${n}</dd>
          </div>`:""}
      ${e.cause?u`<div>
            <dt>실패 코드</dt>
            <dd><code>${e.cause}</code></dd>
          </div>`:""}
      ${r?.reason?u`<div>
            <dt>가드/원인</dt>
            <dd>${r.reason}</dd>
          </div>`:""}
      ${r?.command?u`<div>
            <dt>명령</dt>
            <dd><code>${r.command}</code></dd>
          </div>`:""}
      ${s?u`<div>
            <dt>착지 단계</dt>
            <dd>${s}</dd>
          </div>`:""}
      ${i?u`<div>
            <dt>실패 시각</dt>
            <dd>${i}</dd>
          </div>`:""}
      ${l?u`<div>
            <dt>실행</dt>
            <dd>${l}</dd>
          </div>`:""}
      ${e.attempt_id?u`<div>
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
      ${c?u`<div>
            <dt>비용</dt>
            <dd>${c}</dd>
          </div>`:""}
      <div>
        <dt>재개</dt>
        <dd>
          ${e.resume_eligible?"\uC774\uC5B4\uD558\uAE30 \uAC00\uB2A5":e.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}
        </dd>
      </div>
    </dl>
    ${e.attempt_id?u`<button
          type="button"
          class="rtile__session"
          title="실패 세션 열기"
          aria-label="실패 세션 열기"
        >
          ▤ 세션
        </button>`:""}
    ${e.landed?u`<p class="rtile__failure-landed">
          이미 base에 착지됨 — 이어하기로 배포·정리를 재개
        </p>`:""}
  </div>`}function _b(e){return!e||!e.repo&&!e.serial_lane_id?"":u`${e.repo?u`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?u`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`}var mb=new Set(["codex-runner"]);function gb(e,t,n,r=null){if(!e)return"";let o=e.last_activity||null,s=o&&typeof o.text=="string"?o.text:"",i=o&&typeof o.at=="number"?o.at:null,l=(r||!Array.isArray(e.legs)?[]:e.legs).filter(_=>_&&!(typeof _.agent_type=="string"&&mb.has(_.agent_type))),a=l.filter(_=>_&&_.state==="live"),c=l.filter(_=>_&&_.state!=="live"),d=r&&typeof r.last_event_at=="number"?tn(r.last_event_at,t):"",p=r?tn(r.updated_at,t):"",g=d?`\uCD5C\uADFC \uD65C\uB3D9 ${d}`:p?`\uAC31\uC2E0 ${p}`:"";return u`${s?u`<div class="rtile__activity${n?" is-paused":""}">
        <span class="rtile__activity-dot" aria-hidden="true"></span>
        <span class="rtile__activity-text">${s}</span>
        ${i!==null?u`<span class="rtile__activity-age"
              >${tn(i,t)}</span
            >`:""}
      </div>`:g?u`<div class="rtile__activity rtile__activity--session">
          <span class="rtile__activity-dot" aria-hidden="true"></span>
          <span class="rtile__activity-text">${g}</span>
        </div>`:""}${a.length>0||c.length>0?u`<div class="rtile__legs">
        ${a.map(_=>u`<span
              class="rtile__leg rtile__leg--live"
              title="이 세션이 띄운 서브에이전트/Codex 세션이 실행 중입니다"
              >위임 중 · ${_.label}</span
            >`)}${c.length>0?u`<span
              class="rtile__leg rtile__leg--done"
              title=${`\uC644\uB8CC\uB41C \uC704\uC784: ${c.map(_=>_.label).join(", ")}`}
              >위임 완료 ${c.length}</span
            >`:""}
      </div>`:""}`}var hb={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function bb(e){if(!e)return"";let t=hb[e.locality]||"";return u`<button
    type="button"
    class="rtile__session"
    ?disabled=${t.length>0}
    title=${t||"\uB77C\uC774\uBE0C \uC138\uC158 \uC5F4\uAE30"}
    aria-label="라이브 세션 열기"
  >
    ▤ 세션
  </button>`}function Xa(e,t,n=null,r={}){let o=e.kind==="session",s=o&&Array.isArray(e.session_refs)&&e.session_refs.find(ce=>ce&&ce.current===!0)||null,i=e.failed===!0,l=i&&e.failure||null,a=!!e.paused,c=i?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):a?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?pb(t-e.started_at):"\u2014",d=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,p=lo(e),g=Qt(e.usage),_=Fn(e.usage),$=e.conflict_resolution?a?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,C=e.base_exception||null,M=e.landing,K=e.attempt_id&&e.attempt_id===n,ie=r.monitor||null,ee=_b(ie),j=ie?Is(ie.dependency_chips):"",P=gb(ie,t,a,o?{updated_at:e.updated_at??null,last_event_at:s&&s.locality==="local"?s.last_event_at:null}:null),I=o&&e.workflow?.chips?.exec_receipt||null,W=Ps(e.workflow),G=Ds(e.rec),te=I?u`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Nn(I)}`}
        >${`${I.kind}:${ps(I)}`}</span
      >`:"",N=s?u`<span
        class="ctl-chip ctl-chip--sref"
        title=${`${s.provider}:${s.session_id}@${s.host}${(e.session_refs||[]).length>=2?` \xB7 \uC774\uB825 ${(e.session_refs||[]).length}`:""}`}
        >${uo(s)}</span
      >`:"",V=ee||W||N||te||G?u`<div class="rtile__meta">
          ${ee}${W}${N}${te}${G}
        </div>`:"",H=l?u`<button
          type="button"
          class="rtile__failure-badge"
          data-attempt-id=${l.attempt_id}
          aria-expanded=${l.open===!0?"true":"false"}
          aria-label="실패 상세"
        >
          ⛔ ${Nd(l.cause)||"\uC2E4\uD328"}
        </button>
        ${l.halted_auto_advance?u`<span class="rtile__auto-halted">자동 진행 꺼짐</span>`:""}`:"",X=u`${$?u`<span class="worker-mini__badge">${$}</span>`:""}${C?u`<span
        class="worker-mini__badge"
        title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
        >${C}</span
      >`:""}${H}`,Re=o?"":Hr(e),we=e.discard?.action&&!(i&&l?.landed===!0)?u`<button
          type="button"
          class="rtile__discard"
          data-operation-id=${e.discard.operation?.operation_id||""}
          data-confirmation=${l?.confirmation||"unmerged"}
          ?disabled=${!e.discard.enabled}
          title=${e.discard.title}
          aria-label=${e.discard.label}
        >
          ${e.discard.label}
        </button>`:"";return u`<div
    class="rtile${K?" rtile--sel":""}${a?" rtile--paused":""}${i?" rtile--failed rtile--compact":""}${o?" rtile--session":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span
        class="rtile__dot${o?" rtile__dot--session":""}"
        aria-hidden="true"
      ></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${Ms(e.priority)}${p?u`<span class="rtile__resumed" title=${p}>↻</span>`:""}${X}
      <div class="rtile__hd-actions">
        ${o?u`${typeof e.started_at=="number"?u`<span class="rtile__elapsed">${c}</span>`:""}${bb(s)}<span
                class="rtile__session-badge"
                title="Worker가 아닌 세션이 in_progress로 잡은 이슈"
                >세션</span
              >`:u`<span class="rtile__elapsed">${c}</span>`}
        ${o?"":i?u`<button
                  type="button"
                  class="rtile__resume"
                  ?disabled=${l?.resume_eligible===!1}
                  title=${l?.resume_eligible===!1?l.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589"}
                  aria-label="이어하기"
                >
                  ↻ 이어하기
                </button>
                ${we}`:u`<button
                  type="button"
                  class="rtile__session"
                  title="라이브 세션 열기"
                  aria-label="라이브 세션 열기"
                >
                  ▤ 세션
                </button>
                ${a?u`<button
                      type="button"
                      class="rtile__resume"
                      title="같은 세션으로 이어서 재개"
                      aria-label="재개"
                    >
                      ▶
                    </button>`:u`<button
                      type="button"
                      class="rtile__pause"
                      ?disabled=${e.can_pause===!1}
                      title=${e.can_pause===!1?"\uC138\uC158 ID \uAE30\uB85D \uC804 \u2014 \uC77C\uC2DC\uC815\uC9C0 \uBD88\uAC00":"\uC77C\uC2DC\uC815\uC9C0 (\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC7AC\uAC1C \uAC00\uB2A5)"}
                      aria-label="일시정지"
                    >
                      ⏸
                    </button>`}
                ${we}`}
      </div>
    </div>
    <div class="rtile__title">${e.title}</div>
    ${i?"":u`${P}${e.rollup?us(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:Fi}):""}
          ${M?u`<div class="rtile__landing">
                <span
                  class="merge-step${M.failed?" merge-step--failed":""}"
                  style=${`--progress: ${M.percent}%`}
                  >${M.label}${M.index>0?u`<span class="merge-step__n"
                        >${M.index}/${M.total}</span
                      >`:""}</span
                >
              </div>`:""}
          ${j}
          ${o?V:ee||W||d||G||g.length>0||_?u`<div class="rtile__meta">
                  ${ee}${W}${Ls(e.exec_chips)}${G}
                  ${g.length>0?g.map(ce=>u`<span class="worker-usage" title=${ce.tooltip}
                            >${ce.label}</span
                          >`):_?u`<span
                          class="worker-usage"
                          title=${po(e.usage)}
                          >${_}</span
                        >`:""}
                </div>`:""}
          ${Ts(e)} ${Re}
          <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
          ${i||a?"":u`<div class="rtile__accent" aria-hidden="true"></div>`}`}
    ${fb(l,t)}
  </div>`}function yb(e){let t=e.last_activity&&typeof e.last_activity=="object"?e.last_activity:null,n=Array.isArray(e.legs)?e.legs:[],r=e.dependency_chips||null;return!t&&n.length===0&&!r&&e.kind!=="session"?null:{...t?{last_activity:t}:{},...n.length>0?{legs:n}:{},...r?{dependency_chips:r}:{}}}function Bd(e,t=Date.now(),n=null){let r=Array.isArray(e)?e:[];return u`<div class="worker-rungrid" id="worker-rungrid">
    ${r.length===0?u`<div class="worker-rungrid__empty">실행 세션 없음</div>`:r.map(o=>Xa(o,t,n,{monitor:yb(o)}))}
  </div>`}var Xt="",vb=["impl_runtime","impl_model","impl_effort"],wb=["claude_account","codex_account"],kb=5,yi=1;function dn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function vi(e,t){let n=t.transport,r=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,o=t.notify||(L=>ge(L,"error",4e3)),s={},i={},l=[],a=!1,c={state:"absent",values:{},warnings:[]},d={},p={},g=Promise.resolve(),_={claude:null,codex:null},$=!1,C=null,M={},K="",ie="",ee=!1,j=!1,P=!1,I=null,W=!1;function G(){let L=t.queue?t.queue():null;return dn(L)?L:null}function te(){let L=G();return L?L.runner_catalog:null}function N(){let L=G();return L&&dn(L.execution_defaults)?L.execution_defaults:null}function V(){let L=t.implPresetStore?.get();return dn(L)&&Array.isArray(L.presets)?L:null}function H(){return r===null?{}:{root_dir:r}}async function X(L,oe){return W||!n?null:await n(L,oe)}function Re(L){L&&dn(L.queue)&&t.onQueueAdopt?.(L.queue)}async function we(L,oe){let be=G();if(!be||W)return null;let R=await X(L,{...oe,...H(),expected_revision:be.revision});if(Re(R),r!==null&&R&&R.conflict){let Q=R.queue&&typeof R.queue.revision=="number"?R.queue.revision:G()?.revision??be.revision;R=await X(L,{...oe,...H(),expected_revision:Q}),Re(R)}return R}async function ce(){a=!0,Ve();try{let L=await X("get-session-defaults",{...H()});s=dn(L?.values)?{...L.values}:{},i={...s},l=Array.isArray(L?.warnings)?L.warnings:[]}catch(L){l=["kv_read_failed"],o(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${L instanceof Error?L.message:String(L)}`)}finally{a=!1,Ve()}}async function F(){let L=Rc(s,i);if(Object.keys(L).length!==0){try{let oe=await X("set-session-defaults",{values:L,...H()});s=dn(oe?.values)?{...oe.values}:{},i={...s},l=Array.isArray(oe?.warnings)?oe.warnings:[]}catch(oe){o(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${oe instanceof Error?oe.message:String(oe)}`)}Ve()}}function $e(L,oe){if(!dn(L))return;let be=L.state;c={state:be==="usable"||be==="unusable"||be==="absent"?be:"absent",values:dn(L.values)?{...L.values}:{},warnings:Array.isArray(L.warnings)?L.warnings:[]},p={...c.values},oe&&(d={...p})}async function Se(){try{$e(await X("get-workspace-accounts",{...H()}),!0)}catch(L){c={state:"unusable",values:{},warnings:["kv_read_failed"]},p={},d={},o(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${L instanceof Error?L.message:String(L)}`)}Ve()}async function S(L){try{let oe=await fetch(L);if(!oe.ok)return null;let be=await oe.json();if(!dn(be)||!Array.isArray(be.accounts))return null;let R=be.accounts.filter(Q=>dn(Q)&&typeof Q.key=="string"&&Q.key.length>0&&typeof Q.email=="string"&&Q.email.length>0);return{accounts:R,active:R.find(Q=>Q.active===!0)||null}}catch{return null}}async function ne(){$=!0;let[L,oe]=await Promise.all([S("/api/claude-usage"),S("/api/codex-usage")]);W||(_={claude:L,codex:oe},Ve())}function Te(){let L={};for(let oe of wb){let be=Object.hasOwn(d,oe)?d[oe]:null,R=Object.hasOwn(p,oe)?p[oe]:null;be!==R&&(L[oe]=be)}return L}async function _e(){let L=Te();if(Object.keys(L).length!==0){try{$e(await X("set-workspace-accounts",{values:L,...H()}),!1)}catch(oe){o(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${oe instanceof Error?oe.message:String(oe)}`)}Ve()}}function ke(L,oe){oe===Xt?delete d[L]:d[L]=oe,Ve(),g=g.then(()=>_e())}function he(L,oe){if(vb.includes(L)){Pe(L,oe);return}oe===Xt?delete i[L]:i[L]=oe,Ve(),F()}function Be(){let L=Mt().orchestration_model,oe=pn({global:{orchestration_model:L??void 0},execution_defaults:N(),runner_catalog:te()}).orchestration_model.value;return oe?wn(te(),oe):null}function pt(L,oe){typeof oe=="string"&&oe.length>0?i[L]=oe:delete i[L]}function Pe(L,oe){let be=oe===Xt?void 0:oe,R=Tc({impl_runtime:L==="impl_runtime"?be:i.impl_runtime,impl_model:L==="impl_model"?be:i.impl_model,impl_effort:L==="impl_effort"?be:i.impl_effort},te(),Be());pt("impl_runtime",R.impl_runtime),pt("impl_model",R.impl_model),pt("impl_effort",R.impl_effort),Ve(),F()}async function B(){let L=G();if(!L)return;let oe={orchestration_model:L.orchestration_model??null,orchestration_effort:L.orchestration_effort??null,orchestration_speed:L.orchestration_speed??null},be=Oc(oe,{...oe,...M});if(Object.keys(be).length!==0){try{let R=await we("worker-queue-set-orchestration-defaults",{values:be});if(R&&R.applied===!1){o("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}M={}}catch(R){o(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${R instanceof Error?R.message:String(R)}`)}Ve()}}function de(L,oe){M[L]=oe===Xt?null:oe,Ve(),B()}function ae(L){if(C=L,!L){Ve();return}let oe=te(),be=Mt(),R=be.orchestration_model;R&&!go(oe,L).includes(R)&&(M.orchestration_model=null,R=null);let Q=be.orchestration_effort;Q&&!Vi(oe,L,R||_n).includes(Q)&&(M.orchestration_effort=null),Ve(),B()}async function le(L){if(!(!G()||L<yi)){try{await we("worker-queue-set-slots",{slots:L})}catch(oe){o(`slots \uC800\uC7A5 \uC2E4\uD328: ${oe instanceof Error?oe.message:String(oe)}`)}Ve()}}async function xe(L){if(!(!G()||L<yi||L>kb)){try{await we("worker-queue-set-serial-lane-count",{count:L})}catch(oe){o(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${oe instanceof Error?oe.message:String(oe)}`)}Ve()}}async function me(L,oe){let be=L==="auto_advance"?"worker-automation-toggle":"worker-merge-auto-toggle";try{await we(be,{on:oe})}catch(R){o(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${R instanceof Error?R.message:String(R)}`)}Ve()}function Oe(){let L={},oe=Mt();for(let be of Br){let R=Bn.includes(be)?oe[be]:i[be];typeof R=="string"&&R.length>0&&(L[be]=R)}return L}async function Qe(){let L=V();if(!L)return;let oe=Oe();if(Object.keys(oe).length===0){o("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let be=(L.presets||[]).find(Q=>Q.id===K),R=ie.trim()||(be?be.name:"");if(!R){o("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let Q=be?await X("impl-preset-update",{expected_revision:L.revision,id:be.id,name:R,settings:oe}):await X("impl-preset-create",{expected_revision:L.revision,name:R,settings:oe});if(Q&&Q.applied){if(ie="",!be&&Array.isArray(Q.presets)){let Ne=Q.presets.find(Ye=>Ye.name===R);K=Ne?Ne.id:K}Ve()}else o("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Ve()}catch(Q){o(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${Q instanceof Error?Q.message:String(Q)}`)}}async function He(){let L=V();if(!(!L||K.length===0))try{let oe=await X("impl-preset-delete",{expected_revision:L.revision,id:K});oe&&oe.applied?(K="",Ve()):(o("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Ve())}catch(oe){o(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${oe instanceof Error?oe.message:String(oe)}`)}}function Ue(L){s=dn(L.values)?{...L.values}:{},i={...s},l=Array.isArray(L.warnings)?L.warnings:[],dn(L.queue)&&(t.onQueueAdopt?.(L.queue),M={})}async function re(){let L=V(),oe=G();if(!L||!oe||K.length===0)return;let be=R=>({preset_id:K,expected_revision:L.revision,expected_queue_revision:R,...H()});try{let R=await X("apply-impl-preset-global",be(oe.revision));if(R&&R.applied&&Ue(R),r!==null&&R&&R.queue_applied===!1){let Q=R.queue&&typeof R.queue.revision=="number"?R.queue.revision:G()?.revision??oe.revision;R=await X("apply-impl-preset-global",be(Q)),R&&R.applied&&Ue(R)}R&&R.applied?R.queue_applied===!1&&o("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):R&&R.conflict&&o("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(R){o(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${R instanceof Error?R.message:String(R)}`)}Ve()}async function z(){j=!0,P=!1,Ve();try{let L=await X("get-worker-system-prompt",{});!L||typeof L!="object"||Array.isArray(L)?P=!0:I=L}catch{P=!0}finally{j=!1,Ve()}}function Ae(){if(ee=!ee,ee&&!I){z();return}Ve()}function dt(){let L=Vr({loading:j,error:P});if(L)return L;if(!I)return"";let oe=Array.isArray(I.variants)?I.variants:[];return u`<div class="settings-dialog__sp-body">
      ${I.target_base_placeholder?u`<div class="prompt-block__meta">
            \`${I.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${oe.map(be=>u`<div class="settings-dialog__sp-variant" data-variant=${be.key}>
            <div class="settings-dialog__sp-cond">${be.condition}</div>
            ${Hn(be.label,be.system_prompt)}
          </div>`)}
    </div>`}function x(){return u`<section
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
        aria-expanded=${ee?"true":"false"}
        @click=${Ae}
      >
        ${ee?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${ee?dt():""}
    </section>`}function U(L,oe,be,R,Q,Ne,Ye){let Me=Q[L]??Xt,nt=Qi(L,be,Q,N(),te(),Ye),at=nt.options.find(rt=>rt.value===Me),ze=Me===Xt?nt.full_value:at?.full_value;return u`<select
        class=${Me===Xt?"settings-dialog__unset":""}
        data-key=${L}
        aria-label=${oe}
        title=${ze||""}
        ?disabled=${Ne===!0||nt.disabled}
        .value=${vr(String(Me))}
        @change=${rt=>R(L,String(rt.target.value))}
      >
        <option value=${Xt} ?selected=${Me===Xt}>
          ${nt.unset_label}
        </option>
        ${nt.options.map(rt=>u`<option
              value=${rt.value}
              title=${rt.full_value||""}
              ?selected=${rt.value===Me}
            >
              ${rt.label}
            </option>`)}
      </select>
      ${Me===Xt?u`<span class="settings-dialog__source-badge">기본</span>`:""}`}function ye(L,oe,be,R,Q,Ne=!1,Ye){return u`<div
      class=${`settings-dialog__row${Ne?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${oe}</span>
      <span class="settings-dialog__controls">
        ${U(L,oe,be,R,Q,Ne,Ye)}
      </span>
    </div>`}function De(L,oe){let be=oe?oe.active:null;return dn(be)?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${L==="claude"?be.email:Xr({...be,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)"}function qe(L,oe,be){let R=_[be],Q=Object.hasOwn(d,L)?d[L]:Xt,Ne=be==="claude"?ui:Xr,Ye=!!R?.accounts.some(Me=>Me.key===Q);return u`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${oe}</span>
      <span class="settings-dialog__controls">
        <select
          aria-label=${oe}
          data-account-key=${L}
          @change=${Me=>ke(L,String(Me.target.value))}
        >
          <option value=${Xt} ?selected=${Q.length===0}>
            ${De(be,R)}
          </option>
          ${Q.length>0&&!Ye?u`<option value=${Q} selected>
                ${Q} (목록에 없음)
              </option>`:""}
          ${R?.accounts.map(Me=>u`<option value=${Me.key} ?selected=${Me.key===Q}>
                ${Ne(Me)}
              </option>`)||""}
        </select>
        ${R?"":u`<span class="settings-dialog__hint"
              >계정 목록을 불러올 수 없습니다</span
            >`}
      </span>
    </div>`}function je(){let L=c.warnings.join(", ");return c.state==="unusable"?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uD574\uC11D\uD560 \uC218 \uC5C6\uC5B4 \uC774 \uB808\uD3EC\uC758 \uB514\uC2A4\uD328\uCE58\uAC00 \uAC70\uBD80\uB429\uB2C8\uB2E4 \u2014 ${L} \xB7 \uACC4\uC815\uC744 \uB2E4\uC2DC \uACE0\uB974\uBA74 \uD574\uC18C\uB429\uB2C8\uB2E4`:c.warnings.length>0?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC5D0 \uC54C \uC218 \uC5C6\uB294 \uD0A4\uAC00 \uC788\uC2B5\uB2C8\uB2E4 \u2014 ${L}`:null}function ft(L,oe,be,R,Q){return u`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${oe}-on)`}
        ></i>
        ${L}
      </span>
      <span class="settings-dialog__controls">
        ${U(be,`${L} \uBAA8\uB378`,R,he,i,!1)}
        ${U(Q,`${L} effort`,ws,he,i,!1)}
      </span>
    </div>`}function xt(L,oe,be,R){return u`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${oe}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${R?" is-on":""}`}
          data-automation=${L}
          aria-pressed=${R?"true":"false"}
          aria-label=${oe}
          @click=${()=>me(L,!R)}
        >
          ${R?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${be}</span>
      </span>
    </div>`}function Rt(L,oe,be,R){return u`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${oe}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${L}>
          <button
            type="button"
            aria-label=${`${oe} \uAC10\uC18C`}
            @click=${()=>R(be-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${be}</span>
          <button
            type="button"
            aria-label=${`${oe} \uC99D\uAC00`}
            @click=${()=>R(be+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function Ft(L){return u`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${L.rows.length>0?`\uBCC0\uACBD ${L.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${L.rows.map(oe=>u`<div
            class="settings-dialog__preset-diff-row"
            data-diff-kind=${oe.kind}
          >
            <span class="settings-dialog__preset-diff-label">${oe.label}</span>
            <span class="settings-dialog__preset-diff-value"
              >${oe.before??"\uAE30\uBCF8"}</span
            >
            <span class="settings-dialog__preset-diff-arrow">→</span>
            <span
              class="settings-dialog__preset-diff-value settings-dialog__preset-diff-after"
              >${oe.after??"\uAE30\uBCF8(\uD574\uC81C)"}</span
            >
          </div>`)}
      ${L.ignored_keys.length>0?u`<div class="settings-dialog__preset-diff-note">
            ${L.ignored_keys.join(", ")}은(는) 전역 적용이 쓰지 않는 키라
            무시됩니다
          </div>`:""}
    </div>`}function Mt(){let L=G(),oe={};for(let be of Bn)oe[be]=Object.prototype.hasOwnProperty.call(M,be)?M[be]:L&&typeof L[be]=="string"?L[be]:null;return oe}function bt(){let L=te(),oe=i.impl_runtime,be=i.impl_model,R=V(),Q=G(),Ne=Mt(),Ye=go(L,C),Me=Ur(L,void 0).filter(st=>st!==_n),nt=Vi(L,C,Ne.orchestration_model||_n).filter(st=>st!==_n),at=K?(R?.presets||[]).find(st=>st.id===K):null,ze=at?Cc(Oe(),dn(at.settings)?at.settings:{}):null,rt=Q&&typeof Q.slots=="number"?Q.slots:yi+1,vt=Q&&typeof Q.serial_lane_count=="number"?Q.serial_lane_count:yi,Ge=N()?.supported===!0,Ot=je(),Xe=Qi("workflow_mode",_o,i,N(),L);return u`
      ${l.length>0?u`<div class="settings-dialog__banner" role="alert">
            워크스페이스 기본값을 일부 읽지 못했습니다 —
            ${l.join(", ")}
          </div>`:""}
      ${Ot?u`<div
            class="settings-dialog__banner"
            data-account-warning
            role="alert"
          >
            ${Ot}
          </div>`:""}
      ${Ge?"":u`<div
            class="settings-dialog__banner settings-dialog__banner--projection"
            data-execution-defaults-warning
            role="alert"
          >
            실행 기본값 projection을 확인할 수 없습니다 — 기본값 확인 불가
          </div>`}
      ${a?u`<div class="settings-dialog__empty">불러오는 중…</div>`:u`
            <div class="settings-dialog__preset-bar">
              <select
                aria-label="실행 프리셋"
                .value=${vr(K)}
                @change=${st=>{K=String(st.target.value),Ve()}}
              >
                <option value="" ?selected=${K===""}>
                  실행 프리셋…
                </option>
                ${(R?.presets||[]).map(st=>u`<option
                      value=${st.id}
                      ?selected=${st.id===K}
                    >
                      ${st.name}
                    </option>`)}
              </select>
              <button
                type="button"
                class="settings-dialog__btn settings-dialog__btn--primary"
                data-preset-apply-global
                ?disabled=${!ze||ze.rows.length===0}
                @click=${re}
              >
                적용
              </button>
              <input
                type="text"
                class="settings-dialog__preset-name"
                placeholder=${K?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                aria-label="프리셋 이름"
                .value=${vr(ie)}
                @input=${st=>{ie=String(st.target.value)}}
              />
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-save
                title=${K?"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC774 \uD504\uB9AC\uC14B\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4 (\uD504\uB9AC\uC14B \u2192 \uC124\uC815 \uBC29\uD5A5\uC774 \uC544\uB2D8)":"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC0C8 \uD504\uB9AC\uC14B\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4"}
                @click=${Qe}
              >
                ${K?"\uD604\uC7AC \uC124\uC815\uC73C\uB85C \uB36E\uC5B4\uC4F0\uAE30":"\uC0C8 \uD504\uB9AC\uC14B \uC800\uC7A5"}
              </button>
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-delete
                ?disabled=${K.length===0}
                @click=${He}
              >
                삭제
              </button>
            </div>
            ${ze?Ft(ze):""}

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">오케스트레이션</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">런타임</span>
                <span class="settings-dialog__controls">
                  <select
                    aria-label="런타임"
                    data-key="orchestration_runtime_filter"
                    .value=${vr(C||Xt)}
                    @change=${st=>{let Nt=String(st.target.value);ae(Nt===Xt?null:Nt)}}
                  >
                    <option value=${Xt} ?selected=${!C}>
                      전체
                    </option>
                    <option
                      value="claude"
                      ?selected=${C==="claude"}
                    >
                      claude
                    </option>
                    <option
                      value="codex"
                      ?selected=${C==="codex"}
                    >
                      codex
                    </option>
                  </select>
                  <span class="settings-dialog__hint"
                    >모델 목록을 좁힙니다</span
                  >
                </span>
              </div>
              ${ye("orchestration_model","\uBAA8\uB378",Ye,de,Ne)}
              ${ye("orchestration_effort","effort",nt,de,Ne)}
              ${ye("orchestration_speed","\uC18D\uB3C4",fo,de,Ne)}
            </div>

            <div class="settings-dialog__group" data-exec-accounts-group>
              <div class="settings-dialog__group-title">실행 계정</div>
              ${qe("claude_account","Claude","claude")}
              ${qe("codex_account","Codex","codex")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">워크플로우</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">모드</span>
                <span class="settings-dialog__controls">
                  <span class="settings-dialog__seg" role="group">
                    <button
                      type="button"
                      data-mode=${Xt}
                      aria-pressed=${String(!i.workflow_mode)}
                      @click=${()=>he("workflow_mode",Xt)}
                    >
                      ${Xe.unset_label}
                    </button>
                    ${i.workflow_mode?"":u`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${_o.map(st=>u`<button
                          type="button"
                          data-mode=${st}
                          aria-pressed=${String(i.workflow_mode===st)}
                          @click=${()=>he("workflow_mode",st)}
                        >
                          ${st}
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
              ${ft("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",mo,"spec_review_effort")}
              ${ft("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",vs,"plan_review_effort")}
              ${ft("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",mo,"impl_review_effort")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${ye("impl_runtime","\uC704\uC784 \uB300\uC0C1",ys,he,i)}
              ${ye("impl_model","\uBAA8\uB378",Ur(L,oe),he,i)}
              ${ye("impl_effort","effort",Wr(L,oe,be),he,i)}
              ${ye("impl_speed","\uC18D\uB3C4",fo,he,i)}
              ${ye("quick_fix_impl_model","quick_fix \uAD6C\uD604 \uBAA8\uB378",Me,he,i,!1,{...i,...Ne})}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                자동화
                <span class="settings-dialog__hint"
                  >이 레포의 워커 큐가 스스로 진행하는 범위</span
                >
              </div>
              ${xt("auto_advance","\uC790\uB3D9\uD654","\uC2AC\uB86F\uC774 \uBE44\uBA74 \uB300\uAE30 \uC55E \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4",Q?.auto_advance===!0)}
              ${xt("auto_merge","\uBA38\uC9C0","\uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4",Q?.auto_merge===!0)}
              ${Rt("slots","\uB3D9\uC2DC \uC2E4\uD589",rt,st=>le(st))}
              ${Rt("serial-lane-count","\uC9C1\uB82C \uB808\uC778",vt,st=>xe(st))}
            </div>
            ${x()}
          `}
    `}function Ve(){W||ct(bt(),e)}return{load(){M={};let L=[ce(),Se()];return $||L.push(ne()),Promise.all(L).then(()=>{})},render:Ve,sessionDraft:()=>({...i}),destroy(){W=!0,ct(u``,e)}}}function wi(e){return u`<svg
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
  </svg>`}function Ud(){return wi(oo`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function Wd(){return wi(oo`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function zd(){return wi(oo`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function Hd(){return wi(oo`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function Gd(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function Kd(e){let t=(Array.isArray(e)?e:[]).map(l=>l&&l.usage).filter(l=>l&&typeof l=="object"&&"providers"in l);if(t.length>0)return Qt(hs(t));let n={};for(let l of In)n[l]=0;let r=!1,o=0,s=0,i=0;for(let l of Array.isArray(e)?e:[]){let a=l&&l.usage;if(a&&typeof a=="object"){let c=!1;for(let d of In){let p=a[d];typeof p=="number"&&Number.isFinite(p)&&(n[d]+=p,r=!0,c=!0)}if(c){s+=1;let d=a.total_cost_usd;typeof d=="number"&&Number.isFinite(d)&&(o+=d,i+=1)}}}return s>0&&i===s&&(n.total_cost_usd=o),r?Fn(n):null}function En(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Za(e,t){let n=En(e?.counts)?e.counts:null,r=n?n[t]:null;return typeof r=="number"&&Number.isFinite(r)?r:0}function $b(e,t){if(!En(t))return e;let n={...e};for(let[r,o]of Object.entries(t))o!==void 0&&(n[r]=o);return n}function xb(e){if(!En(e)||!En(e.execution_defaults)||!En(e.runner_catalog)||!En(e.session_defaults))return null;let t={...e.session_defaults};for(let i of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[i]=="string"&&e[i].length>0&&(t[i]=e[i]);let n=pn({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),r=wn(e.runner_catalog,n.orchestration_model.value??""),o=zr(n,e.runner_catalog),s=mr(n,r);return o===null&&s===null?null:{orchestration:o,worker:s}}function Yd(e,t){let n=t.notify||(S=>ge(S,"error",4e3)),r=document.createElement("div");r.className="mon2-deck__main",e.appendChild(r);let o=document.createElement("div");o.className="mon2-deck__panel",o.hidden=!0;let s=document.createElement("div");s.className="mon2-deck__panel-hd";let i=document.createElement("span");i.className="mon2-deck__panel-title";let l=document.createElement("button");l.type="button",l.className="mon2-deck__panel-close",l.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),l.textContent="\u2715",s.append(i,l);let a=document.createElement("div");a.className="mon2-deck__panel-body",o.append(s,a),e.appendChild(o);let c=null,d=null,p=null,g=new Map;function _(){let S=t.workspacesState?t.workspacesState():[];return Array.isArray(S)?S.filter(ne=>En(ne)):[]}function $(S){return _().find(ne=>ne.root_dir===S)||null}function C(S){return $b($(S),g.get(S))}function M(){for(let S of _()){let ne=g.get(S.root_dir);ne&&typeof ne.revision=="number"&&typeof S.revision=="number"&&S.revision>=ne.revision&&g.delete(S.root_dir)}}async function K(S,ne,Te){let _e=t.transport,ke=C(ne);if(!(!_e||!En(ke))){try{let he=await _e(S,{...Te,root_dir:ne,expected_revision:ke.revision});if(En(he?.queue)&&g.set(ne,he.queue),he&&he.conflict){let Be=En(he.queue)&&typeof he.queue.revision=="number"?he.queue.revision:C(ne)?.revision;he=await _e(S,{...Te,root_dir:ne,expected_revision:Be}),En(he?.queue)&&g.set(ne,he.queue)}}catch(he){n(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${he instanceof Error?he.message:String(he)}`)}F()}}function ie(S){c!==S&&(c=S,t.onFocusChange?.(c),F())}function ee(S){ie(c===S?null:S)}function j(S){if(d===S){I();return}P(),d=S;let ne=$(S);i.textContent=`${ne?.name||S} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,o.hidden=!1,p=vi(a,{root_dir:S,queue:()=>C(S),transport:t.transport,implPresetStore:t.implPresetStore,notify:n,onQueueAdopt:Te=>{g.set(S,Te),F()}}),p.load(),F()}function P(){p?.destroy(),p=null}function I(S){P(),d=null,o.hidden=!0,i.textContent="",S!==!0&&F()}let W=()=>I();l.addEventListener("click",W);function G(S){S.key==="Escape"&&c!==null&&ie(null)}document.addEventListener("keydown",G);function te(S,ne){let Te=Math.max(ne,S,1);return u`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${ne}\uAC1C \uC911 ${S}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:Te},(_e,ke)=>ke<S?u`<i class="mon2-deck__slot is-run"></i>`:u`<i class="mon2-deck__slot"></i>`)}
    </span>`}function N(S){let ne=S.auto_advance===!0,Te=S.auto_merge===!0;return u`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${ne?" is-on":""}`}
        data-act="auto"
        aria-pressed=${ne?"true":"false"}
        aria-label=${`${S.name} \uC790\uB3D9\uD654`}
        title=${ne?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${ne?Wd():Ud()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${Te?" is-on":""}`}
        data-act="merge"
        aria-pressed=${Te?"true":"false"}
        aria-label=${`${S.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${Te?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${zd()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__gear${d===S.root_dir?" is-on":""}`}
        data-act="gear"
        aria-expanded=${d===S.root_dir?"true":"false"}
        aria-label=${`${S.name} \uC2E4\uD589 \uC124\uC815`}
        title="이 레포의 실행 설정"
      >
        ${Hd()}
      </button>`}function V(S){let ne=xb(S);return ne?u`<div class="mon2-deck__chips">
      ${ne.orchestration?u`<span class="mon2-deck__chip" title=${ne.orchestration.title}
            >오케 ${ne.orchestration.text}</span
          >`:""}
      ${ne.worker?u`<span class="mon2-deck__chip" title=${ne.worker.title}
            >워커 ${ne.worker.text}</span
          >`:""}
    </div>`:""}function H(S){let ne=[];for(let[Te,_e]of[["queue","\uB300\uAE30"],["pr_wait","PR"],["session_active","\uC138\uC158"]]){let ke=Za(S,Te);ke>0&&ne.push(`${_e} ${ke}`)}return ne.join(" \xB7 ")}function X(S){let ne=Za(S,"running"),Te=typeof S.slots=="number"?S.slots:1;return u`<div
      class=${`mon2-deck__tile${c===S.root_dir?" is-focus":""}`}
      role="button"
      tabindex="0"
      data-root-dir=${S.root_dir}
      aria-pressed=${c===S.root_dir?"true":"false"}
      title="클릭하면 이 레포만 선명하게 봅니다 (Esc로 해제)"
    >
      <div class="mon2-deck__tile-hd">
        <span class="mon2-deck__name" title=${S.root_dir}>${S.name}</span>
        <span
          class="mon2-deck__load"
          title=${`\uC2AC\uB86F ${Te}\uAC1C \uC911 ${ne}\uAC1C \uC2E4\uD589 \uC911`}
        >
          <span class="mon2-deck__load-n">${ne}/${Te}</span>
          ${te(ne,Te)}
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
        <div class="mon2-deck__ops">${N(S)}</div>
        <span class="mon2-deck__counts">${H(S)}</span>
        ${V(S)}
      </div>
    </div>`}function Re(S){let ne=t.doneItems?t.doneItems():[],Te=t.rangeLabel?t.rangeLabel():"",_e=Kd(Array.isArray(ne)?ne:[]),ke=he=>S.reduce((Be,pt)=>Be+Za(pt,he),0);return u`<div class="mon2-deck__bar">
      <span
        class="mon2-deck__total-counts"
        title=${`visible \uB808\uD3EC ${S.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${Te}`}
        >실행 ${ke("running")} · 대기 ${ke("queue")} · PR
        ${ke("pr_wait")}${ke("session_active")>0?` \xB7 \uC138\uC158 ${ke("session_active")}`:""}
        · ${Te} 완료
        ${Array.isArray(ne)?ne.length:0}</span
      >
      ${_e===null?"":u`<span class="mon2-deck__total-tokens">
            ${typeof _e=="string"?u`<span
                  class="mon2-deck__tok"
                  title=${Gd(Te)}
                  >${_e}</span
                >`:_e.map(he=>u`<span
                      class="mon2-deck__tok"
                      data-provider=${he.provider}
                      title=${he.tooltip}
                      >${he.label}</span
                    >`)}
          </span>`}
    </div>`}function we(){let S=_();return S.length===0?"":u`${Re(S)}
      <div class="mon2-deck__strip">
        ${S.map(ne=>X(ne))}
      </div>`}function ce(){c!==null&&!$(c)&&(c=null,t.onFocusChange?.(null))}function F(){M(),ce(),d!==null&&!$(d)&&I(!0),ct(we(),r),p?.render()}function $e(S){let ne=S.target;if(!ne||typeof ne.closest!="function")return;let Te=ne.closest("[data-root-dir]");if(!Te)return;let _e=Te.getAttribute("data-root-dir")||"",ke=ne.closest("[data-act]")?.getAttribute("data-act");if(ke==="worker"){t.gotoWorkerTab?.(_e);return}if(ke==="auto"){K("worker-automation-toggle",_e,{on:C(_e)?.auto_advance!==!0});return}if(ke==="merge"){K("worker-merge-auto-toggle",_e,{on:C(_e)?.auto_merge!==!0});return}if(ke==="gear"){j(_e);return}ee(_e)}function Se(S){if(S.key!=="Enter"&&S.key!==" ")return;let ne=S.target;if(!ne||typeof ne.closest!="function")return;let Te=ne.closest('[data-root-dir][role="button"]');!Te||Te!==ne||(S.preventDefault(),ee(Te.getAttribute("data-root-dir")||""))}return r.addEventListener("click",$e),r.addEventListener("keydown",Se),{render:F,focusRoot:()=>c,panelRoot:()=>d,destroy(){document.removeEventListener("keydown",G),r.removeEventListener("click",$e),r.removeEventListener("keydown",Se),l.removeEventListener("click",W),P(),ct(u``,r),e.replaceChildren()}}}var Vd="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C",Ab=1e4;function Qd(e){return typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)?e.lane:e.lane==="running"&&e.serial_lane_id?e.serial_lane_id:null}function Xd(e){return e.lane==="runnable"||e.lane==="queue"||typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)}var tp="bdui.monitor.done-range",np="bdui.monitor.running_sort",rp="bdui.monitor.candidate_sort",op="beads-ui.monitor.candidate-filter",sp="beads-ui.monitor.sections";function Sb(){try{let e=window.localStorage.getItem(op);if(!e)return{...Gr};let t=JSON.parse(e);return!t||typeof t!="object"?{...Gr}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:Gr.show_blocked,spec:da.some(n=>n.value===t.spec)?t.spec:"all"}}catch{return{...Gr}}}function Zd(e){try{window.localStorage.setItem(op,JSON.stringify({show_blocked:e.show_blocked,spec:e.spec}))}catch{}}function Eb(){try{let e=window.localStorage.getItem(rp);return xo.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function Tb(e){try{window.localStorage.setItem(rp,e)}catch{}}function Cb(){try{let e=window.localStorage.getItem(sp);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function Rb(e){try{window.localStorage.setItem(sp,JSON.stringify(e))}catch{}}function Ob(){try{let e=window.localStorage.getItem(tp);return e===null?"today":On(e)}catch{return"today"}}function Lb(e){try{window.localStorage.setItem(tp,e)}catch{}}function Ib(){try{return window.localStorage.getItem(np)==="repo"?"repo":"started"}catch{return"started"}}function Pb(e){try{window.localStorage.setItem(np,e)}catch{}}var ip="tab:monitor:pipeline",Db=1e3,Jd=[{lane:"runnable",pane:"candidate",title:"\uD6C4\uBCF4",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589 \uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],Mb=["queue","runnable","done"],ep="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function Nb(e){return e>=1&&e<=ep.length?ep[e-1]:`(${e})`}function ap(e,t){let n=Lt("views:monitor"),r=t.gotoIssue,o=t.pipelineStore,s=t.transport,i=t.getWorkspacePath,l=t.openDoc,a=t.switchWorkspace,c=t.router,d=t.now||(()=>Date.now()),p=t.confirm||(m=>typeof globalThis.confirm!="function"||globalThis.confirm(m)),g=Ob(),_=Ib(),$=Sb(),C=Eb(),M=Cb(),K=_i("beads-ui.monitor.lane-collapsed"),ie=!1,ee=null,j=null,P=null,I=null,W=null,G=null,te=null,N=null,V=null;function H(m){return V===null&&(V=B()),mu(m,V)}function X(m,b){Re(),!(b<=0)&&(te={lane_id:m,corrected:b},N=setTimeout(()=>{N=null,te=null,Xe()},Ab))}function Re(){N!==null&&(clearTimeout(N),N=null),te=null}function we(){let m=Er.find(b=>b.value===g);return m?m.label:""}let ce=document.createElement("div");ce.className="mon",e.appendChild(ce);let F=document.createElement("div");F.className="worker-drawer-overlay",F.hidden=!0;let $e=document.createElement("div");$e.className="worker-drawer-overlay__backdrop";let Se=document.createElement("div");Se.className="worker-drawer-host mon2-drawer",F.append($e,Se),e.appendChild(F);let S=tr(null,null),ne=new Map,Te=new Map,_e=null,ke=null,he=null,Be=Qr(Se,{transport:s,sessionLogStore:t.sessionLogStore,onClose:()=>{j=null,F.hidden=!0,Xe()}}),pt=gi({transport:s,console_el:ce,getLanes:()=>S,getWorkspaces:()=>o&&o.get?o.get():null,getCrossLanes:mn,reproject:m=>({lanes:Ot(m),raw_lanes:m}),onCorrection:X,showToast:ge,requestRender:()=>Xe(),adoptQueue:(m,b)=>{Te.set(m,b)},onDragBegin:()=>{P=null},candidate_drop:!0}),{applyDrop:Pe,dropModel:B,runPlanned:de,sendQueueCas:ae}=pt;async function le(m,b,T,D,f=!0){if(!s||!T)return null;let y=await s(m,{...b,root_dir:T,expected_revision:D});if(y&&y.conflict&&f){y.queue&&Te.set(T,y.queue);let Y=y.queue&&typeof y.queue.revision=="number"?y.queue.revision:D;y=await s(m,{...b,root_dir:T,expected_revision:Y})}return y&&y.queue&&T&&Te.set(T,y.queue),y}function xe(m,b){let T=Te.get(m),D=o&&o.get?o.get():null,f=(Array.isArray(D)?D:[]).find(Y=>Y?.root_dir===m);return(T||f)?.merge_queue?.find(Y=>Y.bead_id===b)?.continuation_action}async function me(m,b,T,D){let f=await le(m,b,T,D),y=Te.get(T)?.revision??f?.queue?.revision??D;return qn(f,(Y,ue)=>le(m,{...b,continuation:Y,decision_token:ue},T,y,!1),{refresh:Y=>le(m,b,T,Y?.queue?.revision??Te.get(T)?.revision??y,!1)})}async function Oe(m,b,T,D){let f=await qn({continuation_mismatch:D},(Y,ue)=>le("worker-merge-queue-add",{bead_id:b,continuation:Y,decision_token:ue},m,T,!1)),y=f?.queue?.merge_queue?.find(Y=>Y.bead_id===b)?.continuation_action;f?.applied!==!0&&y?.continuation===null&&y.mismatch&&await Oe(m,b,f.queue.revision,y.mismatch)}async function Qe(m,b,T){let D=await le("worker-discard",m,b,T);if(D&&D.discarded===!0){ge(Os(D),"success",5e3);return}if(D&&D.reason){ge(`\uD3D0\uAE30 \uC2E4\uD328: ${D.reason}`,"error");return}if(D&&D.accepted&&D.pending==="merged_revert"){ge("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(D&&D.accepted){ge(`\uD3D0\uAE30 \uC9C4\uD589: ${D.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}D&&!D.conflict&&ge("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function He(m,b,T){return!s||!T?null:await s(m,{...b,root_dir:T})}async function Ue(){let m=new Map;for(let b of S.pr_wait)m.has(b.root_dir)||m.set(b.root_dir,b.expected_revision);for(let[b,T]of m)await le("worker-merge-queue-add-all",{},b,T)}function re(m){let b=M[m];return!!(b&&b.runnable===!0)}function z(m){let b={...M[m]||{}};b.runnable=!b.runnable,M={...M,[m]:b},Rb(M),Xe()}function Ae(m){K.toggle(m),Xe()}function dt(m){K.toggleArea(m),Xe()}function x(m){let b=S.queue_groups.find(T=>T.root_dir===m);if(!b)return null;for(let T=0;T<b.serial_lane_count;T+=1){let D=`s${T+1}`,f=b.sublanes.serial.find(y=>y.id===D);if(!f||f.raw_length===0&&f.occupied_by.length===0)return D}return null}function U(m,b){let T=S.queue_groups.find(f=>f.root_dir===m),D=T?T.sublanes.serial.find(f=>f.id===b):void 0;return D?D.raw_length:0}function ye(m,b){let T=ne.get(m),D=ne.get(b);if(!T||!D)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let f=Qd(T),y=Qd(D);if(f!==null&&f===y&&T.root_dir===D.root_dir)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let Y=Xd(T),ue=Xd(D);if(Y&&y!==null){let Ee=y;return{kind:"ops",title:`${Ee} \uB05D\uC5D0 ${m}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:D.root_dir,ops:[{bead_id:m,lane:Ee,index:U(D.root_dir,Ee)}]}}if(f!==null&&ue&&y===null){let Ee=f;return{kind:"ops",title:`${Ee} \uB05D\uC5D0 ${b}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:T.root_dir,ops:[{bead_id:b,lane:Ee,index:U(T.root_dir,Ee)}]}}if(Y&&f===null&&ue&&y===null){let Ee=x(T.root_dir);return Ee===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 Worker \uD0ED\uC5D0\uC11C \uB808\uC778 \uC218 \uC870\uC808"}:{kind:"ops",title:`${Ee} \uB808\uC778\uC5D0 ${b} \u2192 ${m} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:T.root_dir,ops:[{bead_id:b,lane:Ee,index:0},{bead_id:m,lane:Ee,index:1}]}}return!Y&&!ue?{kind:"note",text:"\uB458 \uB2E4 \uC774\uBBF8 \uCD9C\uBC1C \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:Y?{kind:"note",text:`${Ho(D.lane)} \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}:{kind:"note",text:`${Ho(T.lane)} \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}}function De(m,b){let T=ye(m,b.id);return{id:b.id,title:b.title,location_label:b.location_label,prefixes:b.prefixes,action:T.kind==="note"?{kind:"note",text:T.text}:T.kind==="disabled"?{kind:"disabled",label:Vd,title:T.title}:{kind:"place",label:Vd,title:T.title}}}function qe(m,b){if(!I||I.bead_id!==m)return null;let T=I.counterpart_id,D=b.filter(f=>f.id===T);return D.length===0?null:{rows:D.map(f=>De(m,f))}}function je(m){let b=m.dependency_chips||null,T=m.overlap_chips||[],D=m.scope_state==="missing",f=m.cross_lane_chip,y=m.armed_lane_chip;if(!b&&T.length===0&&!D&&!f&&!y)return null;let Y=qe(m.id,T);return{...b||{},...T.length>0?{overlaps:T}:{},...D?{scope_missing:!0}:{},...f?{cross_lane:{lane_id:f.lane_id,label:f.label}}:{},...y?{armed_lane:y}:{},...Y?{popover:Y}:{}}}function ft(m){let b=je(m);return b?{...m,dependency_chips:b}:m}async function xt(m,b){let T=ye(m,b);if(I=null,T.kind!=="ops"){Xe();return}let D=Kt(T.root_dir,T.ops[0].bead_id);for(let f of T.ops){let y=await Rt(f,T.root_dir,D);if(y===null)break;D=y}Xe()}async function Rt(m,b,T){try{let D=await le("worker-queue-place",m,b,T,!1);if(D&&D.conflict)return ge("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!D||D.applied!==!0)return ge(D&&typeof D.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${D.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let f=D.queue?D.queue.revision:void 0;return typeof f!="number"?(ge("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):f}catch(D){return ge(zt(D),"error"),null}}function Ft(m){let b=re(m.root_dir);return u`<header class="mon2-sec__hd">
      <button
        type="button"
        class="mon2-sec__toggle"
        data-root-dir=${m.root_dir}
        data-section="runnable"
        aria-expanded=${b?"false":"true"}
        aria-label=${`${m.name} \uC139\uC158 ${b?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
      >
        ${b?"\u25B8":"\u25BE"}
      </button>
      <span class="mon2-sec__name" title=${m.root_dir}>${m.name}</span>
      <span class="mon2-sec__count">${m.count}</span>
      <button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${m.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>
    </header>`}function Mt(m,b){return u`<div
      class="mon2-item"
      data-bead-id=${m.id}
      data-drag-kind="candidate"
      data-root-dir=${m.root_dir}
    >
      ${b}
    </div>`}function bt(m){if(P!==m.id)return null;let b=S.queue_groups.find(y=>y.root_dir===m.root_dir),T=m.place_lanes||[],D=S.cross_lanes_revision!==null,f=[{id:"parallel",label:"\uBCD1\uB82C",count:m.place_index??0}];for(let y of S.chain_lanes)f.push({id:`lane:${y.lane_id}`,label:`\uC5F0\uACB0 ${y.number} (${y.draft?"draft":"\uD655\uC815"}) \uB05D\uC5D0`,count:y.rows.length,group:"\uC5F0\uACB0 \uB808\uC778",disabled:!D});f.push({id:"new-lane",label:"+ \uC0C8 \uC5F0\uACB0 \uB808\uC778",group:"\uC5F0\uACB0 \uB808\uC778",disabled:!D,title:D?"\uC774 \uC774\uC288\uB9CC \uB4E0 draft \uB808\uC778\uC744 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"});for(let y of T)f.push({id:`serial:${y.id}`,label:`\uC9C1\uB82C ${Number(y.id.slice(1))}`,count:y.length,group:`${b?b.name:""} \uC9C1\uB82C`});return{bead_id:m.id,lanes:f}}function Ve(m){return Mt(m,u`${sa(ft(m),bt(m),{exec_chips_mode:"pinned_only",onOpenDoc:l?(b,T)=>l(T,m.root_dir):void 0})}`)}function L(){return S.runnable_flat?u`<div class="mon2-flat" data-drop="candidate">
        ${S.runnable.map(m=>Ve(m))}
      </div>`:u`${S.runnable_sections.map(m=>{let b=re(m.root_dir);return u`<section
        class="mon2-sec${b?" is-collapsed":""}"
        data-root-dir=${m.root_dir}
        data-section="runnable"
      >
        ${Ft({root_dir:m.root_dir,name:m.name,count:m.items.length})}
        ${b?"":u`<div
              class="mon2-sec__body"
              data-lane="candidate"
              data-drop="candidate"
            >
              ${m.items.map(T=>Ve(T))}
            </div>`}
      </section>`})}`}function oe(m,b=!1){return u`<span class="worker-mini__rowops">
      ${b?u`<button
              type="button"
              class="worker-mini__rowops-up"
              data-bead-id=${m.id}
              title="같은 레포 안에서 한 칸 위로"
              aria-label="한 칸 위로"
            >
              ↑
            </button>
            <button
              type="button"
              class="worker-mini__rowops-down"
              data-bead-id=${m.id}
              title="같은 레포 안에서 한 칸 아래로"
              aria-label="한 칸 아래로"
            >
              ↓
            </button>
            <button
              type="button"
              class="worker-mini__rowops-remove"
              data-bead-id=${m.id}
              title="대기에서 빼기"
              aria-label="대기에서 빼기"
            >
              ✕
            </button>`:""}
    </span>`}function be(m,b){return u`<div
      class="mon2-item"
      data-bead-id=${m.id}
      data-drag-kind="parallel"
      data-root-dir=${m.root_dir}
      data-row-index=${b}
      data-queue-index=${String(m.queue_index??0)}
    >
      ${kn(ft(m),{actions:oe(m,!0)})}
    </div>`}function R(m,b,T,D){return u`<div
      class="mon2-crow${b.fixed?" mon2-crow--fixed":""}"
      draggable=${b.draggable?"true":"false"}
      data-bead-id=${b.id}
      data-drag-kind="chain"
      data-root-dir=${b.root_dir}
      data-lane-id=${m.lane_id}
      data-row-index=${T}
      data-queue-index=${typeof b.queue_index=="number"?String(b.queue_index):""}
    >
      <span class="mon2-crow__seq" aria-hidden="true"
        >${Nb(b.seq)}</span
      >
      ${b.workspace_name?u`<span class="worker-mini__repo" title=${b.root_dir}
            >${b.workspace_name}</span
          >`:""}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${b.id}</span>
      <span class="mon2-crow__title">${b.title}</span>
      ${b.mismatch?u`<span
            class="mon2-crow__mismatch"
            title="레인 순서가 주장하는 선행이 bd 의존에 없습니다 — 재적용으로 복구합니다"
            >⚠ 의존 없음</span
          >`:""}
      ${D.includes(b.id)?u`<span
            class="mon2-crow__mismatch"
            title="이미 실행된 뒤 의존이 바뀌었습니다 — 이 행은 움직일 수 없어 교정하지 않습니다"
            >⚠ 의존 순서와 다름</span
          >`:""}
      <span class="mon2-crow__where" title=${b.location_title}
        >${b.location_label}</span
      >
      <button
        type="button"
        class="mon2-crow__detach"
        data-bead-id=${b.id}
        title="연결에서 빼고 앞뒤를 이어 붙입니다"
        aria-label="연결에서 빼기"
      >
        ✕
      </button>
    </div>`}function Q(m){let b=S.cross_lanes_revision!==null,T=H(m.lane_id),D=T?.held===!0,f=T?.cycle===!0,y=T?T.mismatched:[],Y=te&&te.lane_id===m.lane_id?te.corrected:0;return u`<div class="mon2-clane" data-lane-id=${m.lane_id}>
      <header class="mon2-clane__hd">
        <span class="mon2-clane__name">${m.label}</span>
        <span class="mon2-clane__count">${m.rows.length}</span>
        <span class="mon2-clane__badge mon2-clane__badge--${m.state}"
          >${m.badge}</span
        >
        ${Y>0?u`<span
              class="mon2-clane__corrected"
              title="기존 blocks 의존이 드롭 순서를 이깁니다 — 그 순서로 다시 놓았습니다"
              >의존에 맞춰 ${Y}건 자동 교정</span
            >`:""}
        ${f?u`<span
              class="mon2-clane__cycle"
              title="멤버들의 blocks 의존이 순환합니다 — 어느 순서도 의존을 만족시키지 못합니다"
              >⛔ 의존 사이클 — 자동 교정 불가</span
            >`:""}
        ${D?u`<span
              class="mon2-clane__hold"
              title="멤버 한 명의 의존 자료가 이 스냅샷에 아직 없습니다 — 다음 스냅샷이 채우면 교정합니다"
              >${Gs}</span
            >`:""}
        ${m.draft?u`<button
              type="button"
              class="mon2-clane__confirm"
              data-lane-id=${m.lane_id}
              ?disabled=${!b||!m.can_confirm||D}
              title=${D?Gs:m.can_confirm?"\uC778\uC811 \uC758\uC874\uC744 \uAC78\uACE0 \uBBF8\uC801\uC7AC \uBA64\uBC84\uB97C \uAC01\uC790 \uB808\uD3EC \uBCD1\uB82C \uD050 \uB05D\uC5D0 \uC62C\uB9BD\uB2C8\uB2E4":"\uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD655\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4"}
            >
              확정
            </button>`:""}
        ${m.run_label!==null?u`<button
              type="button"
              class="mon2-clane__run"
              data-lane-id=${m.lane_id}
              ?disabled=${!b}
              title="이 레인 멤버만 발차합니다 — 레포 자동 진행은 켜지 않습니다"
            >
              ${m.run_label}
            </button>`:""}
        ${m.state==="confirmed"&&m.has_mismatch?u`<button
              type="button"
              class="mon2-clane__reapply"
              data-lane-id=${m.lane_id}
              ?disabled=${!b}
              title="빠진 인접 의존을 다시 걸고 미적재 멤버를 다시 올립니다"
            >
              재적용
            </button>`:""}
        ${m.can_stop?u`<button
              type="button"
              class="mon2-clane__stop"
              data-lane-id=${m.lane_id}
              ?disabled=${!b}
              title="남은 멤버의 발차만 멈춥니다 — 도는 세션과 머지 큐 항목은 끝까지 갑니다"
            >
              ⏸ 정지
            </button>`:""}
        <button
          type="button"
          class="mon2-clane__remove"
          data-lane-id=${m.lane_id}
          ?disabled=${!b}
          title=${m.draft?"\uC774 draft \uB808\uC778\uC744 \uC9C0\uC6C1\uB2C8\uB2E4":"\uC774 \uB808\uC778\uACFC \uB808\uC778\uC774 \uB9CC\uB4E0 \uC758\uC874\uC744 \uD568\uAED8 \uC9C0\uC6C1\uB2C8\uB2E4"}
          aria-label="연결 레인 삭제"
        >
          ✕
        </button>
      </header>
      <div
        class="mon2-clane__body"
        data-drop="chain"
        data-lane-id=${m.lane_id}
      >
        ${m.rows.length===0?u`<div class="mon2-clane__hint">
              여기로 끌어다 놓으면 연결이 시작됩니다
            </div>`:m.rows.map((ue,Ee)=>R(m,ue,Ee,y))}
      </div>
    </div>`}function Ne(m,b,T){return u`<div
      class="mon2-item"
      data-bead-id=${b.id}
      data-drag-kind="repo-serial"
      data-root-dir=${b.root_dir}
      data-lane-id=${m.id}
      data-row-index=${T}
      data-queue-index=${String(b.queue_index??0)}
    >
      ${kn(ft(b),{actions:oe(b)})}
    </div>`}function Ye(m){if(m.length===0)return"";let b=m.length-1;return`${m[0].id} \uC810\uC720${b>0?` +${b}`:""}`}function Me(m){return u`<div
      class="mon2-item mon2-item--ghost"
      data-bead-id=${m.id}
    >
      ${kn({id:m.id,title:m.title,lane:"running",draggable:!1,ghost:!0,badges:[m.badge]})}
    </div>`}function nt(m,b){let T=b.occupants,D=b.cross_wait_peers||[];return{id:b.id,pane_id:"",title:`${m.name} \xB7 \uC9C1\uB82C ${b.index+1}`,rows:[...T.map(f=>Me(f)),...b.items.map((f,y)=>Ne(b,f,y))],count:b.items.length,empty:b.empty===!0,...T.length>0?{badge:u`<span
              class="mon2-lane__occupant"
              title=${T.map(f=>`${f.id} \u2014 ${f.badge}`).join(`
`)}
              >${Ye(T)}</span
            >`,held:!0}:{},cycle:b.cycle,header_control:u`<button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${m.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>`,...D.length>0?{after:u`${D.map(f=>u`<div class="mon2-lane__cross-wait">
                  ⚠ 상호 정지 — ${f.workspace_name}·${f.lane}과 교차 대기
                </div>`)}`}:{}}}function at(){let m=S.cross_lanes_revision!==null,b=S.chain_lanes.some(T=>T.draft&&T.rows.length===0);return qs({parallel:{rows:S.parallel_rows.map((T,D)=>be(T,D)),count:S.parallel_rows.length,collapsed:K.isAreaCollapsed("parallel"),drop:{drop:"parallel"}},serial:{lanes:S.queue_groups.flatMap(T=>T.sublanes.serial.map(D=>({...nt(T,D),drop:{drop:"repo-serial",root_dir:T.root_dir,lane_id:D.id,lane_length:String(D.raw_length)}}))),collapsed:K.isAreaCollapsed("serial"),extra_panes:S.chain_lanes.map(T=>Q(T)),header_control:u`<button
          type="button"
          class="mon2-newlane"
          ?disabled=${b||!m}
          title=${m?b?"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC774 \uC774\uBBF8 \uC788\uC2B5\uB2C8\uB2E4":"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC744 \uD558\uB098 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
        >
          + 연결 레인
        </button>`,...S.cross_lanes_unreadable?{notice:u`<div class="mon2-clane__unreadable">
                연결 레인 저장소를 읽을 수 없음
              </div>`}:{}}})}function ze(m){return u`<div class="worker-rungrid">
      ${S.running.length===0?u`<div class="worker-rungrid__empty">실행 세션 없음</div>`:S.running.map(b=>Xa({bead_id:b.id,attempt_id:b.attempt_id||"",title:b.title,runner:b.runner??null,model:b.model??null,effort:b.effort??null,speed:b.speed??null,started_at:b.started_at??null,kind:b.kind,...b.kind==="session"?{updated_at:b.updated_at,session_refs:b.session_refs||[]}:{},workflow:b.workflow||null,resumed_from:b.resumed_from??null,continuation_mode:b.continuation_mode??null,paused:b.run_state==="paused",failed:b.run_state==="failed",status:b.status,status_label:b.run_state==="failed"?"\uC2E4\uD328":void 0,can_pause:b.can_pause!==!1,exec_chips:b.exec_chips||null,usage:b.usage||null,discard:b.discard,failure:b.failure?{...b.failure,open:W===b.attempt_id}:null},m,j,{monitor:{repo:b.workspace_name,root_dir:b.root_dir,serial_lane_id:b.serial_lane_id,last_activity:b.last_activity||null,legs:b.legs||[],dependency_chips:je(b)}}))}
    </div>`}function rt(m){let b={runnable:S.runnable,queue:S.queue,running:S.running,pr_wait:S.pr_wait,done:S.done},T=D=>{let f=b[D.lane],y=D.lane==="runnable"?S.runnable_flat?f.length>0?L():void 0:S.runnable_sections.length>0?L():void 0:D.lane==="queue"?S.queue_groups.length>0||S.chain_lanes.length>0||S.parallel_rows.length>0||S.cross_lanes_unreadable?at():void 0:D.lane==="running"?ze(m):f.length>0?u`${f.map(Y=>kn(ft(Y)))}`:void 0;return Pn({id:`monitor-${D.lane}`,lane:D.pane,title:D.title,items:f,count:f.length,src:D.lane==="runnable",empty:D.empty,body:y,live:D.lane==="running"&&f.length>0,collapsible:!0,collapsed:K.isCollapsed(D.pane),controls:D.lane==="runnable"?vt():void 0,header_control:Ge(D.lane,f.length)})};if(ie){let D=Mb.map(f=>Jd.find(y=>y.lane===f)).filter(f=>f!==void 0);return u`<div class="mon2-deck"></div>
        <div class="worker-lanes-host">
          <div class="worker-lanes worker-lanes--mobile mon2-lanes">
            ${Fs({live:S.running.length>0,running_body:S.running.length>0?ze(m):"",pr_wait_rows:S.pr_wait.map(f=>kn(ft(f))),count:S.running.length+S.pr_wait.length})}
            ${D.map(f=>T(f))}
          </div>
        </div>`}return u`<div class="mon2-deck"></div>
      <div class="worker-lanes-host">
        <div class="worker-lanes mon2-lanes">
          ${Jd.map(D=>T(D))}
        </div>
      </div>`}function vt(){return u`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시">
        <input
          type="checkbox"
          class="mon-filter__blocked"
          .checked=${$.show_blocked}
        />
        🔒
        blocked${S.runnable_hidden.blocked>0?` ${S.runnable_hidden.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${da.map(m=>u`<button
              type="button"
              class="mon-filter__spec worker-filter__chip${$.spec===m.value?" is-active":""}"
              data-spec=${m.value}
              aria-pressed=${$.spec===m.value?"true":"false"}
            >
              ${m.label}
            </button>`)}
        ${S.runnable_hidden.spec>0?u`<span class="worker-filter__hidden"
              >숨김 ${S.runnable_hidden.spec}</span
            >`:""}
      </div>
    </div>`}function Ge(m,b){return m==="runnable"?u`<select
        class="mon-candidate-sort worker-sort"
        aria-label="후보 정렬"
        title="후보 정렬"
        .value=${C}
      >
        ${xo.map(T=>u`<option
              value=${T.value}
              ?selected=${C===T.value}
            >
              ${T.label}
            </option>`)}
      </select>`:m==="running"?u`<select
        class="mon-running-sort worker-sort"
        aria-label="실행중 정렬"
        title="실행중 정렬"
        .value=${_}
      >
        <option value="started" ?selected=${_==="started"}>
          시작순
        </option>
        <option value="repo" ?selected=${_==="repo"}>
          레포순
        </option>
      </select>`:m==="pr_wait"&&b>0?u`<button
        type="button"
        class="mon-lane-op mon-merge-all"
        title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
      >
        일괄 머지
      </button>`:m==="done"?u`<select
        class="mon-done-range worker-sort"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${g}
      >
        ${Er.map(T=>u`<option value=${T.value} ?selected=${g===T.value}>
              ${T.label}
            </option>`)}
      </select>`:""}function Ot(m){let b=o&&o.get?o.get():null,T=o&&o.getWorkspacesState?o.getWorkspacesState():[],D=m===void 0?o&&o.crossLanes?o.crossLanes():void 0:m,f={done_since:dr(g,d()),running_sort:_,candidate_filter:$,candidate_sort:C};return D!==void 0&&(f.cross_lanes=D),tr(b,T,f)}function Xe(){let m=d();S=Ot(),V=null,ne=new Map;for(let b of[...S.runnable,...S.queue,...S.running,...S.pr_wait,...S.done])!b.non_occupying&&!ne.has(b.id)&&ne.set(b.id,b);ct(rt(m),ce),Nt()?.render(),st(),At()}function st(){let m=new Map;for(let b of S.queue_groups)m.set(b.root_dir,b.auto_advance);for(let b of Array.from(ce.querySelectorAll(".worker-wait__area--parallel .worker-mini__repo"))){let T=b.closest(".mon2-item")?.getAttribute("data-root-dir")||"",D=m.get(T);typeof D=="boolean"&&b.setAttribute("title",`${b.textContent||""} \xB7 ${D?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function Nt(){if(he)return he;let m=ce.querySelector(".mon2-deck");return m?(he=Yd(m,{workspacesState:()=>o&&o.getWorkspacesState?o.getWorkspacesState():[],doneItems:()=>S.done,rangeLabel:we,transport:s,implPresetStore:t.execPresetStore,gotoWorkerTab:Vt,onFocusChange:b=>{G=b,At()}}),he):null}function At(){ce.classList.toggle("has-focus",G!==null);for(let m of Array.from(ce.querySelectorAll(".mon2-sec[data-root-dir]")))m.classList.toggle("is-focus",G!==null&&m.getAttribute("data-root-dir")===G);for(let m of Array.from(ce.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let b=ne.get(m.getAttribute("data-bead-id")||"");m.classList.toggle("is-focus",G!==null&&!!b&&b.root_dir===G)}for(let m of Array.from(ce.querySelectorAll(".mon2-crow[data-root-dir]")))m.classList.toggle("is-focus",G!==null&&m.getAttribute("data-root-dir")===G)}function St(m,b){let T=i?i():void 0;if(!b||!T||b===T||!a){r(m);return}a(b).then(()=>{r(m)}).catch(D=>{n("workspace switch for %s failed: %o",b,D)})}function Vt(m){if(!m)return;let b=i?i():void 0,T=()=>{try{c?.gotoView("worker")}catch(D){n("gotoView(worker) failed: %o",D)}};if(!a||b&&b===m){T();return}a(m).then(T).catch(D=>{n("workspace switch for %s failed: %o",m,D),ge("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function en(m){nn(m).then(b=>{ge(b?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",b?"success":"error",1400)})}function Wt(m){let b=ne.get(m)||null;return{item:b,root_dir:b?b.root_dir:"",revision:b?b.expected_revision:0}}function zt(m){if(typeof m=="string"&&m.length>0)return m;if(m&&typeof m=="object"){let b=m;if(typeof b.message=="string"&&b.message.length>0)return b.message;if(typeof b.error=="string"&&b.error.length>0)return b.error;if(b.error&&typeof b.error=="object"&&typeof b.error.message=="string")return b.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}async function Tt(m,b,T){if(m!=="dep-add")return;let D=S.chain_lanes.find(f=>f.rows.some(y=>y.id===b));!D||!D.rows.some(f=>f.id===T)||await de(f=>wu(D.lane_id,f),"",[{type:m,a:b,b:T}])}function mn(){return(o&&o.crossLanes?o.crossLanes():null)??null}function Kt(m,b){let T=ne.get(b);if(T&&T.root_dir===m)return T.expected_revision;let D=S.queue_groups.find(f=>f.root_dir===m);return D?D.revision:0}async function kt(m,b){if(m==="run"){await cn(b);return}if(m==="stop"){await ve(b);return}if(m==="create"){await de(T=>ga(null,T),"");return}if(m==="remove"){let T=$u(b,B());if(T!==null&&!p(T))return;await de(D=>ku(b,D),"");return}await de(T=>m==="confirm"?yu(b,T):vu(b,T),"")}function Ht(m){let b=new Map;for(let T of m.rows){let D=S.owner_of[T.id]||T.root_dir;typeof D!="string"||D.length===0||b.set(D,[...b.get(D)||[],T.id])}return b}async function cn(m){let b=S.chain_lanes.find(y=>y.lane_id===m);if(!b||S.cross_lanes_revision===null){Xe();return}Re();let T=new Map,D=new Map,f=Ht(b);for(let y of b.rows){if(!y.unplaced)continue;let Y=S.owner_of[y.id]||y.root_dir;if(typeof Y!="string"||Y.length===0){ge(`${y.id}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC801\uC7AC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`,"error"),Xe();return}let ue=D.get(Y)??0;if(await ae("worker-queue-place",{bead_id:y.id,lane:"parallel",index:(S.parallel_raw_length[Y]??0)+ue},Y,T,{bead_id:y.id})===null){Xe();return}D.set(Y,ue+1)}for(let[y,Y]of f)if(await ae("worker-queue-arm",{bead_ids:Y,lane_id:m},y,T,{bead_id:Y[0]})===null){ge("\uC77C\uBD80 \uB808\uD3EC\uC5D0\uC11C \uC9C4\uD589\uC744 \uCF1C\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589]\uC73C\uB85C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694","error"),Xe();return}Xe()}async function ve(m){let b=S.chain_lanes.find(D=>D.lane_id===m);if(!b||S.cross_lanes_revision===null){Xe();return}Re();let T=new Map;for(let[D,f]of Ht(b))if(await ae("worker-queue-disarm",{lane_id:m},D,T,{bead_id:f[0]})===null)break;Xe()}async function E(m,b){let{root_dir:T,revision:D}=Wt(m);if(T.length===0){Xe();return}await ae("worker-queue-disarm",{bead_ids:[m],lane_id:b},T,new Map([[T,D]]),{bead_id:m}),Xe()}async function h(m,b){let T=ne.get(m);if(!T){Xe();return}let D={kind:"candidate",bead_id:m,root_dir:T.root_dir};if(b==="new-lane"){await de(f=>ga({bead_id:m,root_dir:T.root_dir},f),m);return}if(b.startsWith("lane:")){let f=b.slice(5);if(!S.chain_lanes.find(Y=>Y.lane_id===f)){Xe();return}await de(Y=>Ys(D,{kind:"chain",lane_id:f,marker_index:(Y.cross_lanes.get(f)?.entries??[]).length},Y),m);return}if(b.startsWith("serial:")){let f=b.slice(7),y=(T.place_lanes||[]).find(Y=>Y.id===f);await Pe(D,{kind:"repo-serial",root_dir:T.root_dir,lane_id:f,index:y?y.index:0});return}await Pe(D,{kind:"parallel",marker_index:S.parallel_rows.length})}async function A(m,b){let T=S.parallel_rows,D=T.findIndex(v=>v.id===m);if(D<0)return;let f=T[D].root_dir,y=[];T.forEach((v,w)=>{v.root_dir===f&&y.push(w)});let Y=y.indexOf(D),ue=y[Y+b];if(typeof ue!="number")return;let Ee=b===-1?ue:y[Y+2]??Math.min(T.length,ue+1);await Pe({kind:"parallel",bead_id:m,root_dir:f,queue_index:T[D].queue_index??0},{kind:"parallel",marker_index:Ee})}async function J(m){for(let b of S.chain_lanes){let T=b.rows.find(D=>D.id===m);if(T){await Pe({kind:"chain",bead_id:m,root_dir:T.root_dir,lane_id:b.lane_id,...typeof T.queue_index=="number"?{queue_index:T.queue_index}:{}},{kind:"parallel",marker_index:S.parallel_rows.length});return}}}function Fe(m){return{runner:m.runner||void 0,model:m.model||void 0,effort:m.effort||void 0,status:m.run_state==="running"?"running":m.run_state,worktree:m.root_dir}}function Le(m,b){let{item:T,root_dir:D,revision:f}=Wt(b),y=T?.attempt_id||"",Y=m.classList;if(Y.contains("worker-mini__rowops-up")||Y.contains("worker-mini__rowops-down")){A(b,Y.contains("worker-mini__rowops-up")?-1:1);return}if(Y.contains("worker-mini__rowops-remove")){le("worker-queue-remove",{bead_id:b},D,f);return}if(Y.contains("mon2-crow__detach")){J(b);return}if(Y.contains("worker-dep__open")){St(m.getAttribute("data-dep-id")||"",m.getAttribute("data-root-dir")||"");return}if(Y.contains("mon2-arm__release")){E(b,m.getAttribute("data-lane-id")||"");return}if(Y.contains("mon-lane__chip")){let ue=m.getAttribute("data-lane-id")||"";ce.querySelector(`.mon2-clane[data-lane-id="${ue}"]`)?.scrollIntoView({block:"nearest"});return}if(Y.contains("mon-overlap__chip")){let ue=m.getAttribute("data-overlap-id")||"";I=!!I&&I.bead_id===b&&I.counterpart_id===ue?null:{bead_id:b,counterpart_id:ue},Xe();return}if(Y.contains("mon-overlap__place")){xt(b,m.getAttribute("data-counterpart-id")||"");return}if(Y.contains("rtile__failure-badge")){W=W===y?null:y,Xe();return}if(Y.contains("rtile__attempt-copy")){let ue=m.getAttribute("data-attempt-id")||"";ue&&nn(ue).then(Ee=>{ge(Ee?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",Ee?"success":"error",1400)});return}if(Y.contains("worker-card__place")){P=P===b?null:b,Xe();return}if(Y.contains("worker-card__place-cancel")){P=null,Xe();return}if(Y.contains("worker-card__place-lane")){let ue=m.getAttribute("data-lane")||"parallel";P=null,h(b,ue);return}if(Y.contains("rtile__session")){if(T&&T.kind==="session"){let ue=(T.session_refs||[]).find(Ee=>Ee&&Ee.current===!0);ue&&(F.hidden=!1,Be.open(qr(ue,b,"in_progress",D)),Xe());return}j=y,y&&T&&(F.hidden=!1,Be.open({attempt_id:y,root_dir:D,meta:Fe(T)})),Xe();return}if(Y.contains("rtile__pause")){He("worker-attempt-pause",{attempt_id:y},D);return}if(Y.contains("rtile__resume")){Nr().then(ue=>{if(ue!==null)return me("worker-attempt-resume",{attempt_id:y,...ue!==""?{instructions:ue}:{}},D,f)});return}if(Y.contains("rtile__discard")){let ue=m.dataset.confirmation==="merged"?"merged":"unmerged";if(!p(vo(b,ue)))return;Qe({bead_id:b,...y?{attempt_id:y}:{},...m.dataset.operationId?{operation_id:m.dataset.operationId}:{}},D,f);return}if(Y.contains("worker-mini__merge")){let ue=xe(D,b);ue?.mismatch&&ue.continuation===null?Oe(D,b,f,ue.mismatch):le("worker-merge-queue-add",{bead_id:b},D,f);return}if(Y.contains("worker-mini__merge-cancel")){le("worker-merge-queue-remove",{bead_id:b},D,f);return}if(Y.contains("worker-mini__discard")){let ue=m.dataset.discardMode==="merged"?"merged":"unmerged";if(!p(vo(b,ue)))return;Qe({bead_id:b,...m.dataset.attemptId?{attempt_id:m.dataset.attemptId}:{},...m.dataset.operationId?{operation_id:m.dataset.operationId}:{}},D,f);return}if(Y.contains("worker-mini__revise-fix")){me("worker-revise-fix",{bead_id:b},D,f);return}Y.contains("worker-mini__revise-approve")&&le("worker-revise-approve",{bead_id:b},D,f)}function Ke(m){let b=pt.consumeClickSuppression(),T=m.target;if(!T||typeof T.closest!="function"||T.closest("dialog")||T.closest(".worker-drawer-overlay")||T.closest("a"))return;let D=T.closest(".worker-card__id, .worker-mini__id, .rtile__id");if(D){m.preventDefault();let We=T.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||D.textContent?.trim()||"";We&&en(We);return}let f=T.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(f){m.preventDefault();let pe=f.getAttribute("data-root-dir")||ne.get(T.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||f.getAttribute("title")||"";Vt(pe);return}let y=T.closest(".mon2-sec__toggle");if(y){m.preventDefault(),z(y.getAttribute("data-root-dir")||"");return}let Y=T.closest(".worker-pane__toggle[data-lane]");if(Y){m.preventDefault();let pe=Y.getAttribute("data-lane")||"";(pe==="candidate"||pe==="queue"||pe==="running"||pe==="pr_wait"||pe==="done")&&Ae(pe);return}let ue=T.closest(".worker-wait__area-toggle[data-area]");if(ue){m.preventDefault(),dt(ue.getAttribute("data-area")||"parallel");return}if(T.closest(".mon2-newlane")){m.preventDefault(),kt("create","");return}let Ee=T.closest(".mon2-clane__confirm, .mon2-clane__reapply, .mon2-clane__remove, .mon2-clane__run, .mon2-clane__stop");if(Ee){m.preventDefault();let pe=Ee.getAttribute("data-lane-id")||"",We=Ee.classList;kt(We.contains("mon2-clane__confirm")?"confirm":We.contains("mon2-clane__reapply")?"reapply":We.contains("mon2-clane__run")?"run":We.contains("mon2-clane__stop")?"stop":"remove",pe);return}if(T.closest(".mon-merge-all")){m.preventDefault(),Ue();return}let v=T.closest(".mon-filter__spec");if(v){m.preventDefault(),$={...$,spec:v.getAttribute("data-spec")||"all"},Zd($),Xe();return}let w=T.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!w)return;let O=w.getAttribute("data-bead-id")||"",se=T.closest("button");if(se){m.preventDefault(),Le(se,O);return}T.closest(".rtile__failure-pop")||O&&!b&&(m.preventDefault(),St(O,w.getAttribute("data-root-dir")||Wt(O).root_dir))}function yt(m){let b=m.target;if(!b||typeof b.closest!="function")return;let T=b.closest(".mon-filter__blocked");if(T){$={...$,show_blocked:T.checked},Zd($),Xe();return}let D=b.closest(".mon-candidate-sort");if(D){C=xo.some(Y=>Y.value===D.value)?D.value:"repo_spec",Tb(C),Xe();return}let f=b.closest(".mon-running-sort");if(f){_=f.value==="repo"?"repo":"started",Pb(_),Xe();return}let y=b.closest(".mon-done-range");y&&(g=On(y.value),Lb(g),Xe())}function gt(m){let b=m.target,T=b&&typeof b.closest=="function"?f=>b.closest(f):()=>null,D=!1;I&&!T(".mon-overlap__popover, .mon-overlap__chip")&&(I=null,D=!0),W&&!T(".rtile__failure-pop, .rtile__failure-badge")&&(W=null,D=!0),D&&Xe()}function _t(m){m.key!=="Escape"||!I&&W===null||(I=null,W=null,Xe())}e.addEventListener("click",Ke),e.addEventListener("change",yt),document.addEventListener("click",gt),document.addEventListener("keydown",_t),pt.attach(e);{let m=!0;ee=fi(b=>{if(ie=b,m){m=!1;return}Xe()})}o&&typeof o.subscribe=="function"&&(_e=o.subscribe(()=>{try{Te.clear(),Xe()}catch{}}));function lt(){ke!==null&&(clearInterval(ke),ke=null)}return{recorrectSharedLane:Tt,load(){n("load"),Xe(),ke===null&&(ke=setInterval(()=>{try{Xe()}catch{}},Db))},pause(){lt()},clear(){lt(),pt.detach(),_e&&(_e(),_e=null),ee&&(ee(),ee=null),Be.destroy(),F.hidden=!0,he?.destroy(),he=null,e.removeEventListener("click",Ke),e.removeEventListener("change",yt),document.removeEventListener("click",gt),document.removeEventListener("keydown",_t),e.replaceChildren()}}}function lp(e,t,n){let r=Lt("views:nav"),{global_element:o,repo_element:s}=e,i=null;function l(g){return _=>{_.preventDefault();let $=g==="monitor"&&a()==="monitor"?"worker":g;r("click tab %s",$),n.gotoView($)}}function a(){let g=t.getState();return g.view==="worker"||g.view==="monitor"?g.view:"board"}function c(){let g=a();return u`
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
    `}function d(){let g=a();return u`
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
    `}function p(){o&&ct(c(),o),s&&ct(d(),s)}return p(),i=t.subscribe(()=>p()),{destroy(){i&&(i(),i=null),o&&ct(u``,o),s&&ct(u``,s)}}}var cp=["bug","feature","task","epic","chore"];function up(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var dp=["Critical","High","Medium","Low","Backlog"];function pp(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),o=n.querySelector("#new-title"),s=n.querySelector("#new-type"),i=n.querySelector("#new-priority"),l=n.querySelector("#new-labels"),a=n.querySelector("#new-description"),c=n.querySelector("#new-issue-error"),d=n.querySelector("#btn-cancel"),p=n.querySelector("#btn-create"),g=n.querySelector(".new-issue__close");function _(){s.replaceChildren();let P=document.createElement("option");P.value="",P.textContent="\u2014 Select \u2014",s.appendChild(P);for(let I of cp){let W=document.createElement("option");W.value=I,W.textContent=up(I),s.appendChild(W)}i.replaceChildren();for(let I=0;I<=4;I+=1){let W=document.createElement("option");W.value=String(I);let G=dp[I]||"Medium";W.textContent=`${I} \u2013 ${G}`,i.appendChild(W)}}_();function $(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function C(P){o.disabled=P,s.disabled=P,i.disabled=P,l.disabled=P,a.disabled=P,d.disabled=P,p.disabled=P,p.textContent=P?"Creating\u2026":"Create"}function M(){c.textContent=""}function K(P){c.textContent=P}function ie(){try{let P=window.localStorage.getItem("beads-ui.new.type");P?s.value=P:s.value="";let I=window.localStorage.getItem("beads-ui.new.priority");I&&/^\d$/.test(I)?i.value=I:i.value="2"}catch{s.value="",i.value="2"}}function ee(){let P=s.value||"",I=i.value||"";P.length>0&&window.localStorage.setItem("beads-ui.new.type",P),I.length>0&&window.localStorage.setItem("beads-ui.new.priority",I)}async function j(){M();let P=String(o.value||"").trim();if(P.length===0){K("Title is required"),o.focus();return}let I=Number(i.value||"2");if(!(I>=0&&I<=4)){K("Priority must be 0..4"),i.focus();return}let W=String(s.value||""),G=String(a.value||""),te={title:P};W.length>0&&(te.type=W),String(I).length>0&&(te.priority=I),G.length>0&&(te.description=G),C(!0);try{await t("create-issue",te)}catch{C(!1),K("Failed to create issue");return}ee(),C(!1),$()}return n.addEventListener("cancel",P=>{P.preventDefault(),$()}),g.addEventListener("click",()=>$()),d.addEventListener("click",()=>$()),n.addEventListener("keydown",P=>{P.key==="Enter"&&(P.ctrlKey||P.metaKey)&&(P.preventDefault(),j())}),r.addEventListener("submit",P=>{P.preventDefault(),j()}),{open(){r.reset(),M(),ie();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{o.focus()}catch{}},0)},close(){$()}}}var qb=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked\xB7\uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694 \uCE69"],["stepper","stepper"]];function Fb(e,t){return Ni(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function fp(e,t,n){return u`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?u`<div class="settings-dialog__empty">라벨 없음</div>`:u`<div class="settings-dialog__pills">
            ${t.map(r=>{let o=Fb(r,e);return u`<button
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
  `}function _p(e,t,n){return u`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">숨김 prefix</div>
      <div class="settings-dialog__prefixes">
        ${e.hidden_prefixes.map(r=>u`<span class="settings-dialog__prefix">
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
  `}function mp(e,t){return u`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${qb.map(([n,r])=>u`<label class="settings-dialog__toggle">
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
  `}var jb=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function gp(e,t){let{transport:n,policyStore:r,labelOptions:o}=t,s=t.notify||(X=>ge(X,"error",4e3)),i=document.createElement("dialog");i.id="settings-dialog",i.className="settings-dialog",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),i.setAttribute("aria-label","\uC124\uC815"),e.appendChild(i);let l="execution",a=!1,c="",d=null;function p(){if(d)return d;let X=i.querySelector('[data-pane="execution"]');return X?(d=vi(X,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:n,implPresetStore:t.implPresetStore,notify:s,onQueueAdopt:Re=>t.queueStore?.set?.(Re)}),d):null}function g(){return u`
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
    `}function _(){let X=r.get();return u`
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
        ${X?u`
              ${fp(X,o(),K)}
              ${_p(X,c,{onDraft:Re=>{c=Re},onAdd:ie,onRemove:ee})}
              ${mp(X,j)}
            `:u`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function $(X){let Re=r.get();if(Re)try{let we=await n("display-policy-set",{expected_revision:Re.revision,policy:X(Re)});C(we),we&&we.conflict&&we.policy&&(we=await n("display-policy-set",{expected_revision:we.policy.revision,policy:X(we.policy)}),C(we)),we&&we.conflict&&s("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{s("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function C(X){X&&X.policy&&typeof X.policy=="object"&&r.set(X.policy)}function M(X){$(X)}function K(X){let Re=r.get();if(!Re)return;let we=!Bb(X,Re);M(ce=>Ub(X,ce,we))}function ie(){let X=c.trim();X.length!==0&&(c="",M(Re=>Re.hidden_prefixes.includes(X)?{hidden_prefixes:Re.hidden_prefixes}:{hidden_prefixes:[...Re.hidden_prefixes,X]}),P())}function ee(X){M(Re=>({hidden_prefixes:Re.hidden_prefixes.filter(we=>we!==X)}))}function j(X){let Re=r.get();if(!Re)return;let we=Re.chips[X]===!1;M(()=>({chips:{[X]:we}}))}function P(){ct(u`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${jb.map(X=>u`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${X.id}
                  aria-selected=${String(l===X.id)}
                  aria-controls=${`settings-pane-${X.id}`}
                  @click=${()=>I(X.id)}
                >
                  <span class="settings-dialog__glyph">${X.glyph}</span>
                  ${X.label}
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
            ${g()} ${_()}
          </div>
        </div>
      `,i),p()}function I(X){l=X,P()}let W=()=>{a=!1,t.onOpenChange?.(!1)};i.addEventListener("close",W),i.addEventListener("cancel",W);let G=X=>{X.target===i&&H()};i.addEventListener("click",G);let te=null;r.subscribe&&(te=r.subscribe(()=>{a&&P()}));let N=null;t.implPresetStore?.subscribe&&(N=t.implPresetStore.subscribe(()=>{a&&d?.render()}));function V(X="execution"){a||(a=!0,t.onOpenChange?.(!0),l=X,c="",P(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""),p()?.load())}function H(){a&&(a=!1,t.onOpenChange?.(!1),typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:V,close:H,sessionDraft:()=>d?.sessionDraft()??{},destroy(){a=!1,i.removeEventListener("close",W),i.removeEventListener("cancel",W),i.removeEventListener("click",G),te&&(te(),te=null),N&&(N(),N=null),d?.destroy(),d=null,i.remove()}}}function Bb(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(n=>n.length>0&&e.startsWith(n))}function Ub(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(s=>s!==e)};let r=t.hidden_labels.filter(s=>s!==e);return t.hidden_prefixes.some(s=>s.length>0&&e.startsWith(s))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}var Wb=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],hp="usage-meter-card",zb="usage-meter-layer",Ja=600,Hb=["token_expired","relogin_required"];function bp(e){return String(e).padStart(2,"0")}function Gb(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),o=Math.floor(n%1440/60),s=n%60;return r>0?`${r}d${o>0?` ${o}h`:""}`:o>0?`${o}h${s>0?` ${s}m`:""}`:`${s}m`}function yp(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),o=new Date(t),s=`${bp(r.getHours())}:${bp(r.getMinutes())}`,l=r.getFullYear()===o.getFullYear()&&r.getMonth()===o.getMonth()&&r.getDate()===o.getDate()?s:`${Wb[r.getMonth()]} ${r.getDate()} ${s}`;return`${Gb(n,t)} \xB7 ${l}`}function Kb(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function vp(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function wp(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var kp=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function xp(e){let t=[];for(let n of e){if(!n||typeof n!="object")continue;let r=n;typeof r.key!="string"||r.key.length===0||typeof r.pct!="number"||!Number.isFinite(r.pct)||t.push({key:r.key,pct:r.pct,resetsAt:typeof r.resetsAt=="string"?r.resetsAt:""})}return t}function Yb(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:xp(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function Vb(e,t){if(!e||typeof e!="object")return null;let n=e,r=[];if(Array.isArray(n.accounts))for(let s of n.accounts){let i=Yb(s);i&&r.push(i)}let o=n.available===!0&&Array.isArray(n.windows);return!o&&r.length===0?null:{available:o,windows:o?xp(n.windows):[],ageSeconds:typeof n.ageSeconds=="number"&&Number.isFinite(n.ageSeconds)?n.ageSeconds:null,accounts:r,receivedAtMs:t,held:!1}}function Qb(e,t){if(!e||typeof e!="object")return{kind:"error"};let n=Vb(e,t);return n?{kind:"ok",snapshot:n}:Array.isArray(e.accounts)?{kind:"empty"}:{kind:"error"}}function Ap(e,t){return(e.ageSeconds===null?0:e.ageSeconds)+Math.max(0,t-e.receivedAtMs)/1e3}function Xb(e,t){return!e.held||Ap(e,t)<=Ja?e:{...e,available:!1,windows:[],accounts:[]}}function $p(e,t){return`${e}:${t}`}function Sp(e){let t=!1,n=null,r=new Map,o=null,s=new Map,i=new Map,l=0,a=null;function c(){ct(u``,e),e.hidden=!0,p()}function d(){if(a===null){let ce=e.ownerDocument;a=ce.createElement("div"),a.id=zb,a.className="usage-meter__layer",ce.body.appendChild(a)}return a}function p(){a!==null&&(ct(u``,a),a.remove(),a=null)}function g(ce){n!==ce&&(n===null&&(document.addEventListener("mousedown",$),document.addEventListener("keydown",M),window.addEventListener("resize",C)),n=ce)}function _(){n!==null&&(n=null,document.removeEventListener("mousedown",$),document.removeEventListener("keydown",M),window.removeEventListener("resize",C))}function $(ce){let F=ce.target;F&&(e.contains(F)||a!==null&&a.contains(F))||(_(),H())}function C(){H()}function M(ce){ce.key==="Escape"&&(_(),H())}function K(ce){n===ce?_():g(ce),H()}function ie(){_(),H()}async function ee(ce,F){if(r.has(ce.key))return;let $e=$p(ce.key,F);r.set(ce.key,F),i.delete($e),H();let Se=null;try{Se=await(await fetch(ce.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:F})})).json()}catch{Se=null}if(t)return;if(r.delete(ce.key),!Se||Se.ok!==!0){let ne=Se&&typeof Se.error=="string"&&Se.error.length>0?Se.error:"network_error";i.set($e,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${ne}`}),H();return}let S=Array.isArray(Se.warnings)?Se.warnings.filter(ne=>typeof ne=="string"&&ne.length>0):[];S.length>0&&i.set($e,{kind:"warn",text:S.join(" \xB7 ")}),H(),await we()}function j(ce,F,$e,Se){let S=wp(ce.pct),Te=`resets ${yp(ce.resetsAt,Se)}${F?` \xB7 ${$e}`:""}`;return u`<span
      class="usage-meter__window ${vp(S)}"
      style=${`--progress: ${S}%`}
      title=${Te}
    >
      <span class="usage-meter__label">${ce.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${S}%</span>
    </span>`}function P(ce,F,$e){let Se=Ap(F,$e),S=F.available&&(F.held||Se>Ja),ne=S?`${Math.floor(Se/60)}\uBD84 \uC804 \uCE21\uC815`:"",Te=F.accounts.filter(Be=>!Be.active).length,_e=`usage-meter__group${S?" usage-meter__group--stale":""}`,ke=u`<span class="usage-meter__provider"
        >${ce.label}</span
      >
      ${F.available?F.windows.map(Be=>j(Be,S,ne,$e)):u`<span class="usage-meter__empty">사용량 없음</span>`}
      ${Te>0?u`<span class="usage-meter__badge">+${Te}</span>`:""}`;if(F.accounts.length===0)return u`<span
        class=${_e}
        aria-label=${`${ce.label} usage`}
        >${ke}</span
      >`;let he=n===ce.key;return u`<button
      type="button"
      class=${`usage-meter__toggle ${_e}`}
      aria-label=${`${ce.label} usage`}
      aria-expanded=${he?"true":"false"}
      aria-controls=${hp}
      @click=${()=>K(ce.key)}
    >
      ${ke}
    </button>`}function I(ce,F){return u`<span class="usage-meter" aria-label="Usage">
      ${ce.map($e=>P($e.provider,$e.snapshot,F))}
    </span>`}function W(ce,F){let $e=wp(ce.pct),Se=yp(ce.resetsAt,F);return u`<span
      class="usage-meter__account-window ${vp($e)}"
      style=${`--progress: ${$e}%`}
    >
      <span class="usage-meter__account-key">${ce.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${$e}%</span>
      <span class="usage-meter__account-reset"
        >${Se.length>0?`\u21BB ${Se}`:""}</span
      >
    </span>`}function G(ce,F){return Hb.includes(F)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${ce.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function te(ce,F,$e){let Se=F.status==="ok",S=typeof F.ageSeconds=="number"&&F.ageSeconds>Ja,ne=i.get($p(ce.key,F.number)),Te=r.get(ce.key),_e=Te!==void 0,ke=Te===F.number,he=["usage-meter__account"];return F.active&&he.push("usage-meter__account--active"),Se||he.push("usage-meter__account--unavailable"),S&&he.push("usage-meter__account--stale"),u`<div class=${he.join(" ")}>
      <div class="usage-meter__account-head">
        <span class="usage-meter__account-label" title=${F.email}
          >${F.alias===null?F.email:F.alias}</span
        >
        ${F.plan===null?"":u`<span class="usage-meter__account-tag">${F.plan}</span>`}
        ${F.active?u`<span
              class="usage-meter__account-tag usage-meter__account-tag--active"
              >active</span
            >`:""}
        ${F.ageSeconds===null?"":u`<span class="usage-meter__account-age"
              >${Kb(F.ageSeconds)}</span
            >`}
        ${F.active?"":u`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${_e}
              @click=${()=>{ee(ce,F.number)}}
            >
              ${ke?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${Se?u`<div class="usage-meter__account-windows">
            ${F.windows.map(Be=>W(Be,$e))}
          </div>`:u`<div class="usage-meter__account-status">
            ${G(ce,F.status)}
          </div>`}
      ${ne===void 0?"":u`<div
            class="usage-meter__account-message usage-meter__account-message--${ne.kind}"
          >
            ${ne.text}
          </div>`}
    </div>`}function N(ce,F,$e){let Se=F.accounts.filter(S=>S.active).length;return u`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${ce.label} · 활성 ${Se} / 전체
        ${F.accounts.length}
      </h2>
      ${F.accounts.map(S=>te(ce,S,$e))}
    </section>`}function V(ce,F){return u`<div
      class="usage-meter__card"
      id=${hp}
      role="dialog"
      aria-label=${`${ce.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${N(ce.provider,ce.snapshot,F)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function H(){let ce=Date.now(),F=[];for(let Se of kp){let S=s.get(Se.key);S&&F.push({provider:Se,snapshot:Xb(S,ce)})}if(F.length===0){_(),c();return}let $e=F.find(Se=>Se.provider.key===n&&Se.snapshot.accounts.length>0);$e||_(),ct(I(F,ce),e),e.hidden=!1,$e?X($e,ce):p()}function X(ce,F){let $e=d(),Se=e.getBoundingClientRect(),S=e.ownerDocument.documentElement.clientWidth;$e.style.setProperty("--usage-meter-anchor-top",`${Se.bottom}px`),$e.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,S-Se.right)}px`),ct(u`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${ie}
        ></div>
        ${V(ce,F)}`,$e)}async function Re(ce){try{let F=await fetch(ce.endpoint);return F.ok?Qb(await F.json(),Date.now()):{kind:"error"}}catch{return{kind:"error"}}}async function we(){l+=1;let ce=l,F=await Promise.all(kp.map(async $e=>({provider:$e,read:await Re($e)})));if(!(t||ce!==l)){for(let $e of F){let Se=$e.provider.key;if($e.read.kind==="ok"){s.set(Se,$e.read.snapshot);continue}if($e.read.kind==="empty"){s.delete(Se);continue}let S=s.get(Se);S!==void 0&&!S.held&&s.set(Se,{...S,held:!0})}H()}}return c(),we(),o=setInterval(()=>{we()},6e4),{destroy(){t=!0,o!==null&&(clearInterval(o),o=null),_(),c()}}}var Zb="worker-ineligible";function Go(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Ep(e){return Go(e).includes(Zb)}var Jb="worker-serial";function Tp(e){return Go(e).includes(Jb)}var Op="bdui.worker.candidate_sort",Ko=Object.freeze([{id:"spec",label:"spec \uC6B0\uC120",chain:[{key:"spec",dir:"desc"},{key:"created",dir:"asc"}]},{id:"bottleneck",label:"\uBCD1\uBAA9 \uC6B0\uC120",chain:[{key:"priority",dir:"asc"},{key:"dependents",dir:"desc"},{key:"released",dir:"desc"}]},{id:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131",chain:[{key:"created",dir:"desc"},{key:"priority",dir:"asc"}]},{id:"updated",label:"\uCD5C\uC2E0 \uC218\uC815",chain:[{key:"updated",dir:"desc"}]}]),ki=Object.freeze({preset:"spec"}),Lp=3,Ip=Object.freeze([{key:"priority",label:"\uC6B0\uC120\uC21C\uC704"},{key:"dependents",label:"\uD6C4\uC18D \uC218"},{key:"released",label:"\uD574\uC81C \uC2DC\uAC01"},{key:"spec",label:"spec \uC720\uBB34"},{key:"created",label:"\uC0DD\uC131"},{key:"updated",label:"\uC218\uC815"}]);function Cp(e){return Ko.some(t=>t.id===e)}function Rp(e){let t=Ko.find(n=>n.id===e);return t?t.chain.map(n=>({...n})):[]}function ey(e,t){return e.length===t.length&&e.every((n,r)=>n.key===t[r].key&&n.dir===t[r].dir)}function Yo(e){return e&&"preset"in e?Rp(e.preset):e&&Array.isArray(e.chain)?e.chain.map(t=>({...t})):Rp("spec")}function el(e){return e&&"preset"in e?e.preset:null}function kr(e){if(typeof e=="string"){let s;try{s=JSON.parse(e)}catch{return Cp(e)?{preset:e}:ki}return kr(s)}if(!e||typeof e!="object")return ki;let t=e;if(Cp(t.preset))return{preset:t.preset};let n=t.chain;if(!Array.isArray(n)||n.length===0||n.length>Lp||!n.every(Ii))return ki;let r=[];for(let s of n)r.some(i=>i.key===s.key)||r.push({key:s.key,dir:s.dir});let o=Ko.find(s=>ey(s.chain,r));return o?{preset:o.id}:{chain:r}}function Pp(){try{return kr(window.localStorage.getItem(Op))}catch{return ki}}function tl(e){try{window.localStorage.setItem(Op,JSON.stringify(e))}catch{}}function Dp(e,t,n){let r=e.map(a=>({...a}));if(!n)return r.slice(0,t);if(!Object.prototype.hasOwnProperty.call(os,n))return r;let o=n;if(r.slice(0,t).some(a=>a.key===o))return r.slice(0,t);let s={key:o,dir:r[t]&&r[t].key===o?r[t].dir:os[o]},i=r.slice(0,t),l=r.slice(t+1).filter(a=>a.key!==o);return[...i,s,...l].slice(0,Lp)}function Mp(e,t){return e.map((n,r)=>r===t?{key:n.key,dir:n.dir==="asc"?"desc":"asc"}:{...n})}function Np(e,t){let n=Array.isArray(e)?e.slice():[];return n.sort(Fl(Yo(t))),n}var qp=new Set(["sh","bash","zsh","dash","ksh"]),Fp=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function jp(e){let t=e.split("/");return t[t.length-1]||""}function ty(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let n=t.slice(2).trim().split(/\s+/).filter(Boolean);if(n.length===0)return!1;let r=jp(n[0]);if(r!=="env")return qp.has(r);let o=n.slice(1).find(s=>!s.startsWith("-")&&!s.includes("="));return o!==void 0&&qp.has(jp(o))}function ny(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function ry(e){let t=[],n=0;Fp.lastIndex=0;for(let r of e.matchAll(Fp)){let o=r.index;o>n&&t.push({text:e.slice(n,o),kind:"plain"}),t.push({text:r[0],kind:ny(r[0])}),n=o+r[0].length}return n<e.length&&t.push({text:e.slice(n),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function oy(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function Bp(e){let t=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),r=document.createElement("div");r.className="repo-ops-script-viewer-root",document.body.appendChild(r);let o=null,s="loading",i="",l="",a=0,c=null,d=!1;function p(P,I){return I?ry(P).map(W=>W.kind==="plain"?W.text:u`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${W.kind}"
            >${W.text}</span
          >`):P}function g(){if(!o)return u``;let P=s==="ready"&&ty(i),I=s==="ready"?i.split(`
`):[];return u`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${o.path}`}
    >
      <div
        class="repo-ops-script-viewer__backdrop"
        @click=${()=>ee()}
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
              @click=${()=>ee()}
            >
              ✕
            </button>
          </div>
        </header>
        <div class="repo-ops-script-viewer__body" aria-live="polite">
          ${s==="loading"?u`<div class="repo-ops-script-viewer__status">
                스크립트 불러오는 중…
              </div>`:s==="error"?u`<div
                  class="repo-ops-script-viewer__status repo-ops-script-viewer__status--error"
                >
                  ${l}
                </div>`:u`<div class="repo-ops-script-viewer__code" tabindex="0">
                  ${I.map((W,G)=>u`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${G+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${p(W,P)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function _(){ct(g(),r)}async function $(){if(s!=="ready")return;let P=await nn(i);ge(P?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",P?"success":"error")}function C(P){P.key==="Escape"&&o&&(P.preventDefault(),ee())}function M(){d||(document.addEventListener("keydown",C),d=!0)}function K(){d&&(document.removeEventListener("keydown",C),d=!1)}async function ie(P,I=null){let W=++a;M(),o={...P},c=I||(document.activeElement instanceof HTMLElement?document.activeElement:null),s="loading",i="",l="",_(),r.querySelector(".repo-ops-script-viewer__close")?.focus();let te=t?t():"";if(!te){s="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",_();return}if(!n){s="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",_();return}let N="/api/repo-ops-script?workspace="+encodeURIComponent(te)+"&lane="+encodeURIComponent(P.lane)+"&base_sha="+encodeURIComponent(P.base_sha);try{let V=await n(N),H=await V.json().catch(()=>({}));if(W!==a)return;if((t?t():"")!==te){ee();return}if(!V.ok||!H||H.ok!==!0){s="error",l=oy(H&&typeof H.error=="string"?H.error:""),_();return}o={lane:H.lane,base_sha:H.base_sha,path:H.path,base_ref:H.base_ref},i=String(H.content),s="ready",_()}catch{if(W!==a)return;s="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",_()}}function ee(){a+=1,K(),o=null,i="",_();let P=c;c=null,P?.isConnected&&P.focus()}function j(){ee(),r.remove()}return{open:ie,close:ee,destroy:j}}var Up={deploy_not_declared:"\uC120\uC5B8 \uC5C6\uC74C",deploy_opted_out:"\uC774 workspace\uC5D0\uC11C \uBC30\uD3EC \uC2E4\uD589\uC774 \uAEBC\uC838 \uC788\uC74C",deploy_in_flight:"\uBC30\uD3EC \uC9C4\uD589 \uC911",target_unresolved:"\uB300\uC0C1 tip\uC744 \uD655\uC815\uD558\uC9C0 \uBABB\uD568",remote_history_not_monotonic:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uC640 \uC6D0\uACA9 \uC774\uB825\uC774 \uAC08\uB77C\uC9D0"},sy=new Set(["queued","running","retry_pending"]);function Wp(e){let t=e.queueStore,n=e.transport,r=e.onChanged||(()=>{}),o=e.onOpenScript;function s(){return t&&t.get()||{}}function i(){let N=s();return typeof N.revision=="number"?N.revision:0}function l(N){t&&N&&N.queue&&typeof N.queue=="object"&&t.set(N.queue)}function a(){let N=s().workspace_info;return N&&typeof N=="object"?N:{}}function c(N,V){return u`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${N}"
      >${V}</span
    >`}function d(N){if(typeof N!="number"||!Number.isFinite(N))return"";let V=N/6e4;return Number.isInteger(V)?`timeout ${V}\uBD84`:`timeout ${Math.round(N/1e3)}\uCD08`}function p(N){let V=d(N);return V?c("config",V):""}function g(N,V,H){return u`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${H.script}
      @click=${X=>{o&&o({lane:N,base_sha:V.base_sha,path:H.script,base_ref:V.base_ref},X.currentTarget)}}
    ></button>`}function _(){let N=s().repo_operations;return Array.isArray(N)?N:[]}function $(){let N=a().repo_ops,V=N&&typeof N=="object"?N.repo_id:null;return typeof V=="string"&&V?V:null}function C(){return _().some(N=>N&&N.kind==="deploy"&&sy.has(N.state))}function M(){let N=C(),V=$()===null;return u`<button
      type="button"
      class="worker-repo-ops__deploy-run"
      data-seam="repo-ops-deploy-run"
      ?disabled=${N||V}
      title=${N?"\uBC30\uD3EC \uC9C4\uD589 \uC911":V?"\uC800\uC7A5\uC18C\uB97C \uD655\uC778\uD560 \uC218 \uC5C6\uC74C":"\uC6D0\uACA9 base tip\uC5D0\uC11C \uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uB97C 1\uD68C \uC2E4\uD589\uD569\uB2C8\uB2E4"}
      @click=${()=>{I()}}
    >
      배포 실행
    </button>`}function K(){let N=s().repo_ops_opt_out;return{verify:N?.verify===!0,deploy:N?.deploy===!0}}function ie(N,V){return u`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!V}
        @change=${H=>{P(N,!H.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function ee(N){let V=typeof N.base_sha=="string"?N.base_sha:"",H=`${N.source_path||"repo-ops/config.toml"} @ ${N.base_ref||"?"}${V?`@${V.slice(0,7)}`:""}`,X=K(),Re=!!N.verify&&X.verify,we=!!N.deploy&&X.deploy;return u`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${H}</span>
      </p>
      <div
        class="worker-repo-ops__lane${Re?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${N.verify?u`${g("verify",N,N.verify)}
              ${p(N.verify.timeout_ms)}
              ${Re?c("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:u`선언 없음${c("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${Re?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":N.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${N.verify?ie("verify",X.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${we?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${N.deploy?u`${g("deploy",N,N.deploy)}
              ${p(N.deploy.timeout_ms)}
              ${we?c("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):M()}`:u`선언 없음${c("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${we?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":N.deploy?u`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${N.deploy?ie("deploy",X.deploy):""}
      </div>
    </section>`}function j(N){let V=N.repo_ops&&typeof N.repo_ops=="object"?N.repo_ops:null;return V&&(V.status==="resolved"||V.status==="absent")?ee(V):V&&(V.status==="pending"||V.status==="error")?u`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${V.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":u`선언 읽기
              실패${V.error_code?u` — <code>${V.error_code}</code>`:""}`}
        </div>
      </section>`:u`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function P(N,V){if(!n)return;let H=await n("worker-repo-ops-opt-out-toggle",{kind:N,opted_out:V,expected_revision:i()});if(l(H),H&&H.conflict){let X=await n("worker-repo-ops-opt-out-toggle",{kind:N,opted_out:V,expected_revision:i()});l(X)}r()}async function I(){let N=$();if(!n||N===null)return;let V=await n("worker-repo-operation-deploy-run",{repo_id:N});if(l(V),!V||V.ok!==!0){let H=V&&typeof V.reason=="string"?V.reason:"",X=Object.hasOwn(Up,H)?Up[H]:H||"\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";ge(`\uBC30\uD3EC \uC2E4\uD589 \uAC70\uBD80 \u2014 ${X}`,"error")}else ge("\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD588\uC2B5\uB2C8\uB2E4","success");r()}let W={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",repair_session_dispatch:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC790\uB3D9 \uC2E4\uD589",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC"};function G(N,V,H){return u`<div class="worker-repo-ops__policy-group" data-policy=${H}>
      <div class="worker-repo-ops__policy-label">${N}</div>
      <ul class="worker-repo-ops__policy-list">
        ${V.map(X=>u`<li data-token=${X}>
              ${W[X]||X}
            </li>`)}
      </ul>
    </div>`}function te(){let N=s(),V=N.repo_operation_policy&&typeof N.repo_operation_policy=="object"?N.repo_operation_policy:null;return V?u`<section
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
        ${V.supported===!1?u`<div
              class="worker-repo-ops__policy-group"
              data-policy="policy-schema"
            >
              ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uAC00 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${V.schema_version})`}
            </div>`:""}
        ${G("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",V.worker_automatic||[],"worker-automatic")}
        ${G("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",V.never_automatic||[],"never-automatic")}
      </details>
    </section>`:""}return{template(){return u`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언
        </summary>
        ${j(a())} ${te()}
      </details>`}}}var Gp=20,iy=5,ay=new Set(["failed","running","queued","retry_pending"]),zp={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"};function ly(e,t,n=Gp){let r=[];for(let o of Array.isArray(e)?e:[])!o||typeof o!="object"||r.push({type:"operation",id:o.operation_id,at:typeof o.finished_at=="number"?o.finished_at:typeof o.requested_at=="number"?o.requested_at:null,operation:o});for(let o of Array.isArray(t)?t:[])!o||typeof o!="object"||r.push({type:"cleanup",id:o.bead_id,at:typeof o.at=="number"?o.at:null,cleanup:o});return r.sort((o,s)=>o.at===null&&s.at===null?String(o.id||"").localeCompare(String(s.id||"")):o.at===null?1:s.at===null?-1:s.at-o.at),r.slice(0,Math.max(0,n))}function cy(e){if(e.type==="cleanup")return!0;let t=e.operation;return ay.has(t.state)&&!t.dismissed&&!t.superseded_by}function uy(e,t,n={}){let r=ly(e,t,1/0),o=n.expanded===!0?Gp:iy,s=new Set(r.slice(0,o)),i=r.filter(l=>s.has(l)||cy(l));return{visible:i,hidden:r.length-i.length}}function Hp(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function dy(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function Kp(e){let t=e.filter(n=>n.value);return t.length===0?"":u`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(n=>{let r=n.copy===!0?Es(n.value):n.value;return u`<div>
          <dt>${n.term}</dt>
          <dd>${r}</dd>
        </div>`})}
    </dl>
  </details>`}function Yp(e,t="",n=!1){return!e&&!t?"":u`<p
    class="worker-ev__explain${n?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?u`<br />${t}`:""}
  </p>`}function py(e,t){if(!e||typeof e!="object")return;let n=t&&t.kind==="verify"?"verify":"deploy",r=e[n],o=r&&typeof r=="object"?r.timeout_ms:void 0;return typeof o=="number"&&Number.isFinite(o)?o:void 0}function fy(e,t){let n=Fd(e,t),r=jd(e);return!n&&!r?"":u`<p class="worker-ev__why">
    ${n?u`<span class="worker-ev__why-line">${n}</span>`:""}${r?u`<span class="worker-ev__why-line">${r}</span>`:""}
  </p>`}function _y(e){return e.state!=="failed"||e.superseded_by||e.dismissed?"":u`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-repo-op__dismiss"
      data-operation-id=${e.operation_id}
      title="사람이 확인한 실패로 접수합니다 — 기록은 그대로 남고 해결 필요 집계에서만 빠집니다"
    >
      기록 닫기
    </button>
  </div>`}function my(e,t){let n=e.operation,r=n.state==="failed",o=n.failure?n.failure.code:"";return u`<li
    class="worker-ev"
    data-operation-id=${n.operation_id}
    data-state=${n.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?Gt(e.at):""}
      >${Rs(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${Hp(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(zp,n.kind)?zp[n.kind]:n.kind}</span
        >
        <span class="worker-ev__meta"
          >${n.target_base}@${Cs(n.target_sha)}${typeof n.elapsed_ms=="number"?` \xB7 ${gr(n.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${Hp(e)}"
          >${dy(e)}</span
        >
        ${n.dismissed?u`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${n.superseded_by?u`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
        ${n.source==="manual"?u`<span
              class="worker-ev__st worker-ev__st--manual"
              title="사람이 배포 실행을 눌러 시작한 작업입니다"
              >수동</span
            >`:""}
      </div>
      ${r?Yp(qd(n.failure_kind,o)):""}
      ${fy(n,py(t,n))}
      ${_y(n)}
      ${Kp([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?o:""},{term:"script",value:[n.script_path||"",n.script_blob_sha?`blob ${Cs(n.script_blob_sha)}`:"",Number.isInteger(n.exit_code)?`exit ${n.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:n.log_path||"",copy:!0},{term:"\uCD9C\uB825",value:n.output_tail||""}])}
    </div>
  </li>`}function gy(e){let t=e.cleanup,n=hr(t.step);return u`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?Gt(e.at):""}
      >${Rs(e.at)||"\u2014"}</span
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
        ${ou(t.step).map(r=>u`<li
              class="worker-step worker-step--${r.state}"
              data-step=${r.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${r.label}</span>
            </li>`)}
      </ol>
      ${Yp(Zr(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
      <div class="worker-ev__acts">
        <button
          type="button"
          class="worker-ev__btn worker-ev__btn--warn worker-cleanup__resume"
          data-bead-id=${t.bead_id}
        >
          정리 재개${n?` \u2014 ${n} \uB2E8\uACC4\uBD80\uD130`:""}
        </button>
      </div>
      ${Kp([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||"",copy:!0},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function hy(e){let t=typeof e.hidden=="number"?e.hidden:0,n=e.expanded===!0;return u`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
    ${e.events.length===0?u`<div class="worker-repo-drawer__empty">기록 없음</div>`:u`<ul class="worker-rail">
          ${e.events.map(r=>r.type==="cleanup"?gy(r):my(r,e.repo_ops))}
        </ul>`}
    ${t>0||n?u`<div class="worker-repo-drawer__more">
          <button
            type="button"
            class="worker-ev__btn"
            data-seam="repo-ops-more"
          >
            ${n?"\uC811\uAE30":`\uC774\uC804 ${t}\uAC1C \uB354 \uBCF4\uAE30`}
          </button>
        </div>`:""}
  </section>`}function Vp(e,t={}){let n=null;function r(){if(n===null){ct(u``,e);return}let i=uy(n.operations,n.cleanup_failures,{expanded:n.expanded});ct(hy({events:i.visible,hidden:i.hidden,expanded:n.expanded,repo:n.repo,repo_ops:n.repo_ops}),e)}e.addEventListener("click",i=>{let l=i.target;if(l?.closest?.('[data-seam="repo-ops-close"]')){s();return}l?.closest?.('[data-seam="repo-ops-more"]')&&n&&(n.expanded=!n.expanded,r())});function o(i){n={operations:i.operations,cleanup_failures:i.cleanup_failures,repo:i.repo||"",repo_ops:i.repo_ops||null,expanded:!1},r()}function s(){n!==null&&(n=null,r(),t.onClose&&t.onClose())}return{open:o,close:s,isOpen:()=>n!==null,refresh(i){n&&(n={operations:i.operations,cleanup_failures:i.cleanup_failures,repo:i.repo||"",repo_ops:i.repo_ops||null,expanded:n.expanded},r())}}}var by="session-preferred",yy=["exclusive_machine","iterative_user_judgment","visual_verification"];function Qp(e,t){if(!Go(e).includes(by)||typeof t!="object"||t===null)return"";let n=t.session_preferred_reason;return typeof n=="string"&&yy.includes(n)?n:""}var vy=Lt("views:worker:adapter"),wy="tab:worker:ready",ky="tab:worker:blocked",$y="tab:worker:in-progress",xy="tab:worker:resolved",Ay="tab:worker:closed",Sy="\u{1F512} blocked",Ey={revision:0,auto_advance:!1,auto_merge:!1,slots:zs,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]},Ty=["claude_account","codex_account"],Cy=[...Br,...Ty];function Ry(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function Oy(e){let t=e?.blocked_info;return t&&typeof t=="object"?Array.isArray(t.blockers)?t.blockers.filter(r=>typeof r=="string"&&r.length>0):[]:(Array.isArray(e?.dependencies)?e.dependencies:[]).map(r=>{if(typeof r=="string")return r;if(!r||typeof r!="object")return"";let o=r.type??r.dependency_type;return o!==void 0&&o!=="blocks"?"":r.depends_on_id||r.id||""}).filter(Boolean)}function Ly(e){let t=e&&typeof e=="object"?e.awaiting_user:void 0,n=typeof t=="string"?t.trim():"";return n.length>0?`${Ns}: ${n}`:Ns}function $r(e){return e&&typeof e=="object"?e:{}}function Iy(e){let t={};for(let n of Cy){let r=e[n];typeof r=="string"&&r.length>0&&(t[n]=r)}return t}function Py(e){let t=e.replace(/\/+$/,""),n=t.lastIndexOf("/");return n>=0?t.slice(n+1):t}function Xp(e={}){let{queueStore:t,issueStores:n,transport:r,getWorkspacePath:o,onInvalidate:s}=e,i=n?Ir(n):null,l=new Map,a={},c=null,d=0,p=null,g=!1;function _(){g||!s||s()}function $(I){return c===I?a:{}}async function C(){if(!r||g)return;let I=o?.()||"";if(c===I||p&&p.key===I&&p.generation===d)return;let W=++d;p={key:I,generation:W};let G=null;try{G=await Promise.resolve(r("get-session-defaults",{}))}catch(te){if(W!==d)return;p=null,vy("get-session-defaults failed: %o",te),_();return}W===d&&(a=G&&typeof G.values=="object"&&G.values!==null?{...G.values}:{},c=I,p=null,_())}function M(){c=null,d+=1,C()}function K(){for(let[I,W]of l)W==="failed"&&l.delete(I)}function ie(I,W){return i?i.selectBoardColumn(I,W):[]}function ee(I,W,G,te){let N=Array.isArray(I.queue)?I.queue:[],V=new Set([...N.map(F=>F.bead_id),...(Array.isArray(I.serial_lanes)?I.serial_lanes:[]).flatMap(F=>(Array.isArray(F?.entries)?F.entries:[]).map($e=>$e.bead_id)),...(Array.isArray(I.pr_wait)?I.pr_wait:[]).map(F=>F.bead_id),...(Array.isArray(I.done)?I.done:[]).map(F=>F.bead_id)]),H=new Set(G.map(F=>F.id)),X=new Set,Re=[];for(let F of[...W,...G])V.has(F.id)||X.has(F.id)||Ry(F)||(X.add(F.id),Re.push(F));let we=Np(Re,kr(te)),ce=$r(I.bead_scope);return we.map(F=>{let $e=Or(F),Se=$e.evidence==="published",S=typeof F.workflow?.route=="string"&&F.workflow.route||(F.metadata&&typeof F.metadata.route=="string"?F.metadata.route:""),ne=S==="quick_fix",Te=!Object.hasOwn(F,"description")||typeof F.description=="string"&&F.description.trim().length>0,_e=Object.hasOwn(F,"labels")&&Ep(F.labels),ke=_e||!Object.hasOwn(F,"labels")?"":Qp(F.labels,F.metadata),he=F.metadata&&typeof F.metadata=="object"?Object.hasOwn(F.metadata,"awaiting_user"):!1,Be=!_e&&!he&&(ne?Te:Se&&!$e.conflict),pt=H.has(F.id),Pe=pt?Oy(F):[],B=[];pt&&Pe.length===0&&B.push(Sy),he&&B.push(Ly(F.metadata)),ne&&!Te?B.push("missing_description"):!ne&&$e.conflict?B.push("spec_id_conflict"):!ne&&$e.evidence==="none"?B.push("spec \uC5C6\uC74C"):!ne&&$e.evidence==="draft"&&B.push("spec \uBBF8\uBC1C\uD589(draft)");let de=ce[F.id];return{bead_id:F.id,title:F.title||F.id,route:S,spec_id:$e.conflict?"":$e.path,published:Se,blocked:pt,blocked_by:Pe,labels:Array.isArray(F.labels)?F.labels:[],created_at:F.created_at,updated_at:F.updated_at,status:F.status,workflow:F.workflow||null,exec_pins:Iy($r(F.metadata)),rec:null,...de&&Array.isArray(de.scope)?{scope:de.scope}:{},eligible:Be,reason:B.join(" \xB7 "),worker_ineligible:_e,session_preferred:ke.length>0,session_preferred_reason:ke,release_info:F.release_info,dependents_info:F.dependents_info}})}function j(I){let[W,G,te,N,V]=I,H=as([...W,...G,...te,...N,...V]),X={},Re=(we,ce)=>{if(!we||typeof we.id!="string"||we.id.length===0)return;let F=X[we.id]||(X[we.id]={});if(typeof we.priority=="number"&&!("priority"in F)&&(F.priority=we.priority),typeof we.from_id=="string"&&!("from_id"in F)&&(F.from_id=we.from_id),ce&&!("metadata"in F)){F.metadata=$r(we.metadata);let $e=$r(we.workflow).route;typeof $e=="string"&&$e.length>0&&(F.route=$e)}};for(let we of[...W,...G,...te])Re(we,!0);for(let we of[...N,...V])Re(we,!1);for(let we of new Set([...Object.keys(X),...H.keys()])){let ce=ls(H,we);if(ce.total>0){let F=X[we]||(X[we]={});F.rollup=ce}}return X}function P(I,W,G,te){let N=new Set((Array.isArray(I.done)?I.done:[]).map(H=>H?.bead_id).filter(H=>typeof H=="string")),V=[];for(let H of W){let X=Yn(H.closed_at);if(typeof H.id!="string"||N.has(H.id)||X===null||te!==void 0&&X<te||typeof H.comment_count!="number"||H.comment_count<=0)continue;let Re=`${G}\0${H.id}\0${String(H.updated_at)}\0${H.comment_count}`,we=l.get(Re);if(we===void 0&&r&&(l.set(Re,"pending"),Promise.resolve(r("get-comments",{id:H.id})).then(F=>{let $e=Array.isArray(F)&&F.some(Se=>ai(typeof Se?.text=="string"?Se.text:"")?.lane==="session");l.set(Re,$e?"session":"not-session"),_()}).catch(()=>{l.set(Re,"failed"),_()})),we!=="session")continue;let ce=Yn(H.started_at);V.push({id:H.id,title:H.title||H.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:ce!==null&&X>=ce?X-ce:null,work_kind:"session",done_at:X,created_at:H.created_at,updated_at:H.updated_at})}return V}return{read(I){if(!t)return{workspaces:[],workspaces_state:[]};let W=t.get()||Ey,G=o?.()||"",te=I&&typeof I.done_since=="number"?I.done_since:void 0,N=ie(wy,"ready"),V=ie(ky,"blocked"),H=ie($y,"in_progress"),X=ie(xy,"resolved"),Re=ie(Ay,"closed");return{workspaces:[{...W,bead_titles:{...$r(W.bead_titles),...Object.fromEntries([...N,...V].filter(we=>we&&typeof we.id=="string").map(we=>[we.id,we.title||we.id]))},root_dir:G,name:Py(G),runnable:ee(W,N,V,I?I.candidate_sort:void 0),session_done:P(W,Re,G,te),bead_overlay:j([N,V,H,X,Re])}],workspaces_state:[{root_dir:G,revision:W.revision,auto_advance:W.auto_advance,auto_merge:W.auto_merge,slots:typeof $r(W.workspace_info).slots=="number"?$r(W.workspace_info).slots:W.slots,runner_catalog:W.runner_catalog,execution_defaults:W.execution_defaults,session_defaults:$(G),orchestration_model:W.orchestration_model,orchestration_effort:W.orchestration_effort,orchestration_speed:W.orchestration_speed,issue_prefix:""}]}},ensureSessionDefaults(){C()},refreshSessionDefaults:M,notifyIssuesChanged:K,destroy(){g=!0,d+=1,p=null,l.clear()}}}var $i=1,Zp=5,Dy={root_dir:"",name:"",auto_advance:!1,auto_merge:!1,slots:$i,revision:0,runner_catalog:{},items:[],sublanes:{parallel:[],serial:[]},serial_lane_count:0,raw_queue_length:0,live_count:0,over_cap:!1,merge:{positions:new Map,resolutions:new Map,continuations:new Map,authorities:new Map,state:{active:null,failures:{},waiting:null},auto_excluded:[],running:!1},token_total:null,cleanup_failures:[],declared_base:null,repo_operations:[]};function ln(e){return e&&typeof e=="object"?e:{}}var tf="beads-ui.worker.candidate-filter",nl={show_blocked:!1,spec:"all"};function My(){try{let e=window.localStorage.getItem(tf);if(!e)return{...nl};let t=JSON.parse(e);if(!t||typeof t!="object")return{...nl};let n=t.spec;return{show_blocked:t.show_blocked===!0,spec:n==="with"||n==="without"?n:"all"}}catch{return{...nl}}}function Ny(e){try{window.localStorage.setItem(tf,JSON.stringify(e))}catch{}}var qy=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],nf="bdui.worker.done-range";function Fy(){try{let e=window.localStorage.getItem(nf);return e===null?"today":On(e)}catch{return"today"}}function jy(e){try{window.localStorage.setItem(nf,e)}catch{}}function Jp(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function By(e){return e==="receipt_not_current"?"\uB9AC\uBDF0 \uD6C4\uC5D0\uB3C4 \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC74C":e==="cancelled"?"\uB9AC\uBDF0 \uC138\uC158 \uCDE8\uC18C\uB428":e.startsWith("launch_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uC2DC\uC791 \uC2E4\uD328(${e.slice(14)})`:e.startsWith("session_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uBE44\uC815\uC0C1 \uC885\uB8CC(${e.slice(15)})`:`\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD328(${e})`}function ef(e){if(e.startsWith("receipt_unbacked:"))return`\uC2E4\uD589 \uC601\uC218\uC99D \uC790\uB3D9 \uAC80\uC99D \uBD88\uAC00(${e.slice(17)}) \u2014 [\uBA38\uC9C0] \uD074\uB9AD\uC73C\uB85C \uC218\uB3D9 \uC9C4\uD589 \uAC00\uB2A5`;switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_rebase_cap":return"\uD050 \uC7AC\uCDA9\uB3CC 3\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"worktree_restore_branch_mismatch":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uBE0C\uB79C\uCE58 \uC774\uB984 \uBD88\uC77C\uCE58";case"worktree_restore_path_exists":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uACBD\uB85C \uC774\uBBF8 \uC788\uC74C";case"worktree_restore_branch_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 origin\uC5D0 \uBE0C\uB79C\uCE58 \uC5C6\uC74C";case"worktree_restore_branch_diverged":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uB85C\uCEEC \uBE0C\uB79C\uCE58\uAC00 origin\uACFC \uB2E4\uB984";case"worktree_restore_failed":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function Uy(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function Wy(e){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let t=e.slice(19);if(t.length===0)return null;switch(t){case"gating":return"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function zy(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}var Hy=new Set(["paused","needs_human","waiting_metadata","reviewing","retrying"]),Gy=new Set(["waiting_metadata","reviewing","retrying"]);function Ky(e){let t=e&&typeof e=="object"?e.auto_resolution:null,n=t&&typeof t=="object"&&!Array.isArray(t)?t:null;if(!n||!e)return null;let r=typeof n.origin_reason=="string"&&n.origin_reason.length>0?`\uC6D0 \uC0AC\uC720: ${n.origin_reason}`:"";switch(e.phase){case"waiting_metadata":return{label:"\uC815\uC815 \uB300\uAE30",details:[r,"\uBA54\uD0C0\uB370\uC774\uD130 \uC815\uC815\uC774 \uAD00\uCE21\uB418\uBA74 \uC790\uB3D9 \uC7AC\uAC1C"].filter(Boolean),live:!1};case"retrying":{let o=Number.isInteger(n.attempts)?Math.max(0,Number(n.attempts)):0,s=Number.isInteger(n.attempt_cap)&&Number(n.attempt_cap)>0?Number(n.attempt_cap):0,i=typeof n.next_at=="number"?Gt(n.next_at):"",l=typeof n.last_error=="string"&&n.last_error.length>0?n.last_error:"";return{label:s>0?`\uC7AC\uC2DC\uB3C4 ${Math.min(o,s)}/${s}`:`\uC7AC\uC2DC\uB3C4 ${o}`,details:[r,i?`\uB2E4\uC74C \uC2DC\uAC01 ${i}`:"",l?`\uB9C8\uC9C0\uB9C9 \uC624\uB958: ${l}`:""].filter(Boolean),live:!0}}default:return null}}function Yy(e){if(typeof e!="string")return"";for(let t of["retry_exhausted:","auto_review_exhausted:"])if(e.startsWith(t))return e.slice(t.length);return""}function Vy(e,t=null){if(!e||typeof e!="object")return null;let n="";switch(e.phase){case"gating":n="\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"merging":n="\uBA38\uC9C0 \uC911";break;case"cleaning":n="\uB9C8\uBB34\uB9AC \uC911";break;case"waiting_metadata":case"reviewing":case"retrying":if(!t)return null;n=t.label;break;case"paused":n="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":n="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let r=[n];e.head_sha&&r.push(`head ${e.head_sha}`),e.base_sha&&r.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&r.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`);let o=Yy(e.terminal_reason);o&&r.push(`\uC6D0 \uC0AC\uC720: ${o}`);let s=e.phase==="needs_human"&&!o?wr(e.terminal_reason):null;s&&r.push(e.failure_stage?`${e.failure_stage} \xB7 ${s}`:s);for(let i of t?t.details:[])r.push(i);return e.active_attempt_id&&r.push(`attempt ${e.active_attempt_id}`),e.evidence&&r.push(e.evidence),e.log_path&&r.push(e.log_path),{badge:n,title:r.join(`
`),alert:e.phase==="needs_human",lock_actions:!Hy.has(e.phase)}}function Qy(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function Xy(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",n=(s,i={})=>{let l=[i.title||"",t].filter(Boolean);return{label:s,title:l.join(`
`),live:i.live===!0,alert:i.alert===!0}};if(e.continuation_required)return n("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.queueing)return e.queueing==="cleanup"?n("\uC815\uB9AC \uC7AC\uAC1C \uC694\uCCAD \uC911",{title:"\uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9AC\uB294 \uC911\uC785\uB2C8\uB2E4",live:!0}):n("\uD050 \uB4F1\uB85D \uC911",{title:"\uBA38\uC9C0 \uD050\uC5D0 \uB123\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.merge_step)return e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):n("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return n(e.conflict_badge,{live:e.conflict_live===!0});if(e.auto_resolution)return n(e.auto_resolution.label,{title:e.auto_resolution.details.join(`
`),live:e.auto_resolution.live===!0});if(e.recovery?.lock_actions)return n(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return n(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return n("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});let r=Qy(e.receipt_check),o=e.conflicting||e.gate?.reason==="base_behind"||r.length>0;if(e.auto_pending&&o)return n("\uD655\uC778 \uC911",{title:"\uBA38\uC9C0 \uD050\uAC00 \uC790\uB3D9\uC73C\uB85C \uCC98\uB9AC \uC911 \u2014 \uB2E4\uC74C \uAD00\uCE21\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.conflicting)return n("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="base_behind")return n("base \uAC31\uC2E0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale"){let s=e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uC785\uB2C8\uB2E4. [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4";return e.review_session?.active===!0?n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911",{title:`${s}
\uB9AC\uBDF0 \uC138\uC158\uC774 \uC2E4\uD589 \uC911\uC785\uB2C8\uB2E4 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4`,live:!0}):e.review_session?.failure?n(`\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 ${By(e.review_session.failure)}`,{title:`${s}
\uC9C1\uC804 \uB9AC\uBDF0 \uC138\uC158 \uC885\uB8CC \uC0AC\uC720: ${e.review_session.failure}`,alert:!0}):n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:s,alert:!0})}return e.gate?.reason==="spec_id_missing"?n("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0}):e.gate?.reason==="review_receipt_invalid"?n("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0}):r.length>0?n(`\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694 \xB7 ${r[0]}`,{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${r.join(", ")}`,alert:!0}):e.recovery?n(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?n("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?n(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${ef(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?n(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${ef(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?n(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?n("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?n("\uB2EB\uD798",{alert:!0}):e.activity?n("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?n("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?n("\uD655\uC778 \uC911"):e.gate?.gate_badge?n(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function Zy(e,t,n,r,o=null,s=null,i=null,l=!1,a=null,c=!0,d=null,p=null,g=null,_={},$=!1,C=!1,M={},K=null,ie={active:!1,failure:null}){let ee=!!a&&a.position>0,j=!!a?.continuation_action&&a.continuation_action.continuation===null,P=!!a&&a.active===!0,I=a&&a.failure||null,W=Wy(a?a.waiting:null),G=n[e]||null,te=G&&G.gate?G.gate:null,N=G&&G.pr?G.pr:null,V=zy(a?a.resolution:null),H=Ky(g),X=Vy(g,H),Re=a&&a.authority||null,we=!!g&&typeof g=="object"&&Gy.has(g.phase),ce=ee&&!P&&(!Re||we||Re.source==="automatic"&&!C),F=i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":V?V.badge:i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":W,$e=!!te&&te.base_badge==="\uCDA9\uB3CC",Se=!!te&&te.enabled===!0,S=$o({bead_id:e,merge_sha:M.merge_sha,cleanup_cursor:M.cleanup_cursor,merge_progress:s&&s.merge_progress?s.merge_progress:null,cleanup_failed:r,repo_operations:M.repo_operations}),ne=Us(S),Te=s&&!S&&(s.queueing??null)?s.queueing:null,_e=!!r&&["repo_operations","child_sweep","branch_cleanup","parent_close"].includes(r.step)&&!!te&&te.tier==="merged",ke=r&&r.step==="repo_operations"&&S?.failed===!0&&(S.step==="deploy"||S.step==="verify")?S.step:null,he=l&&!!r&&!!te&&te.tier==="merged",Be=ce&&(Se||$e||te?.reason==="base_behind"||te?.reason==="review_receipt_missing"||te?.reason==="review_receipt_stale"||_e||he),pt=te?.reason==="review_receipt_missing"||te?.reason==="review_receipt_stale",Pe=l&&$e&&c===!1,B=er(_,e,{external:l,merge_active:P||S?.step==="merge",merge_queued:ee,conflict_active:!!i,cleanup_active:ne,merged:!!r||te?.tier==="merged"}),de=!!B.operation,ae=ee&&!I&&!j&&!_e&&!(X&&X.lock_actions),le=Xy({auto_pending:ae,continuation_required:j,queueing:Te,merge_step:S,conflict_badge:F,conflict_live:V?.live===!0||i==="running",auto_resolution:H,recovery:X,cleanup_failed:r,cleanup_label:r?hr(r.step):null,base_exception:p,conflicting:$e,gate:te,receipt_check:G&&G.receipt_check?G.receipt_check:null,queue_failure:I,auto_skip:d,queued:ee,queue_active:P,queue_position:a?a.position:0,review_session:ie,activity:F?null:s&&s.activity||null}),xe=le?.live===!0&&le.title?u`<span title=${le.title}>${le.label}</span>`:le?.label||null;return{id:e,title:l?u`${t}<span class="muted"> · 세션</span>`:t,reason:r&&S?.active!==!0?Bs(r.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:$,...K?{dependency_chips:K}:{},external:l,pr_number:N&&typeof N.number=="number"?N.number:null,pr_url:N&&typeof N.url=="string"?N.url:"",completion_badge:le?.live!==!0&&le?.title?le.label:null,completion_title:le?.title||"",...g?.phase==="needs_human"&&typeof g.log_path=="string"&&g.log_path.length>0?{log_path:g.log_path}:{},badges:xe?[xe]:[],live_badge:le?.live===!0?xe:null,usage:o,alert:le?.alert===!0,merge_action:te?.tier==="merged"&&!_e&&!he?!1:!ee||j||ce||pt,cancel_action:ee&&!j,cancel_enabled:!P&&!(X&&X.lock_actions),cancel_title:X&&X.lock_actions?`${X.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:P?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:B,discard_action:B.action,merge_step:S,discard_enabled:B.enabled,discard_title:B.title,merge_enabled:!S&&!Te&&!i&&!de&&!p&&!(X&&X.lock_actions)&&!Pe&&ie.active!==!0&&(Se||$e||te?.reason==="base_behind"||te?.reason==="review_receipt_missing"||te?.reason==="review_receipt_stale"||_e||he||Be||we&&!P),merge_label:j?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":_e||he?ke==="deploy"?"\uBC30\uD3EC \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":ke==="verify"?"\uAC80\uC99D \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":"\uC815\uB9AC \uC7AC\uAC1C":$e&&!S&&!_e?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":te?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":te?.reason==="review_receipt_missing"||te?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":ce?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:de?B.error?`\uD3D0\uAE30 \uC2E4\uD328: ${B.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${B.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:j?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Te?"\uC694\uCCAD\uC744 \uBCF4\uB0B4\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":S?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${S.label}`:ke?`\uBA38\uC9C0 \uC644\uB8CC \u2014 ${ke==="deploy"?"\uBC30\uD3EC":"\uAC80\uC99D"} \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD574 \uC815\uB9AC\uAC00 \uBA48\uCDC4\uC2B5\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uC800\uC7A5\uC18C \uC791\uC5C5\uBD80\uD130 \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4`:he?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Pe?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":_e?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":$e?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":te?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":ie.active===!0?"\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":te?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uB9AC\uBDF0\uB9CC \uC218\uD589\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":te?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":te?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":Se?`\uBA38\uC9C0 (${te.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:te&&te.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${te&&te.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function rl(e,t={}){let{transport:n,issueStores:r,queueStore:o,sessionLogStore:s,gotoIssue:i,getWorkspacePath:l,switchWorkspace:a,openDoc:c,doneRange:d,onDoneRangeChange:p}=t,g=r?Ir(r):null,_=My(),$=null,C=null,M=null,K={members_by_id:new Map,serial_raw_lengths:{},serial_lane_count:0,occupied_lanes:new Set},ie=new Map,ee=new Map,j=Pp(),P=el(j)===null,I=d?On(d):Fy();function W(){let v=Er.find(w=>w.value===I);return v?v.label:"\uC624\uB298"}let G=_i("beads-ui.worker.lane-collapsed"),te=!1,N=new Set,V=new Set,H=new Set,X=new Set,Re=new Set,we=null,ce=[],F=Xp({queueStore:o,issueStores:r,transport:n,getWorkspacePath:l,onInvalidate:()=>J()});function $e(){F.refreshSessionDefaults()}let Se=document.createElement("div");Se.className="worker-console";let S=document.createElement("div");S.className="worker-top";let ne=document.createElement("div");ne.className="worker-drawer-overlay",ne.hidden=!0;let Te=document.createElement("div");Te.className="worker-drawer-overlay__backdrop";let _e=document.createElement("div");_e.className="worker-drawer-host";let ke=document.createElement("div");ke.className="worker-drawer-host",ke.hidden=!0,ne.append(Te,_e,ke);let he=document.createElement("div");he.className="worker-lanes-host",Se.append(S,ne,he),e.appendChild(Se);let Be=tr(null,null),pt=[],Pe=gi({transport:n,console_el:Se,getLanes:()=>Be,getWorkspaces:()=>pt,getCrossLanes:()=>null,reproject:()=>({lanes:Me(),raw_lanes:null}),onCorrection:()=>{},showToast:ge,requestRender:()=>J(),adoptQueue:(v,w)=>{o&&o.set(w)},onDragBegin:()=>{$=null}}),B=null,de=Qr(_e,{transport:n,sessionLogStore:s,onClose:()=>{B=null,ne.hidden=!0,J()}}),ae=Vp(ke,{onClose:()=>{ke.hidden=!0,ne.hidden=!0,J()}}),le=Bp({getWorkspacePath:l||(()=>"")}),xe=l&&l()||"",me=Wp({queueStore:o,transport:n,onChanged:()=>J(),onOpenScript:(v,w)=>{le.open(v,w)}});function Oe(){return o&&o.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:$i,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function Qe(){let v=Oe(),w=typeof v.serial_lane_count=="number"&&Number.isInteger(v.serial_lane_count)&&v.serial_lane_count>0?Math.min(v.serial_lane_count,5):0,O=Array.isArray(v.serial_lanes)?v.serial_lanes:[],se=[];for(let We of O){if(se.length>=w)break;!We||typeof We.id!="string"||!/^s[1-5]$/.test(We.id)||!Array.isArray(We.entries)||se.push({id:We.id,label:`\uC9C1\uB82C ${We.id.slice(1)}`,count:We.entries.length})}return se.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(v.queue)?v.queue:[]).length},...se]}function He(v){if(!$||!v.some(O=>O.id===$))return null;let w=Qe();return w?{bead_id:$,lanes:w}:null}function Ue(){return l&&l()||""}async function re(v,w){await Pe.sendOp({type:"worker-queue-place",payload:{bead_id:v,...w==="parallel"?{}:{lane:w}},root_dir:Ue()},v)}function z(){let v=Oe();return typeof v.revision=="number"?v.revision:0}function Ae(v){v&&v.queue&&o&&o.set(v.queue)}async function dt(v){if(!n||!v)return;let w=await n("worker-attempt-pause",{attempt_id:v});w&&w.paused===!1&&w.reason&&ge(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${w.reason}`,"error",2400)}async function x(v){if(!n||!v)return;let w=await Nr();if(w===null)return;let O=async(pe={})=>await n("worker-attempt-resume",{attempt_id:v,expected_revision:z(),...w!==""?{instructions:w}:{},...pe}),se=await O();Ae(se),se&&se.conflict&&(se=await O(),Ae(se)),se=await qn(se,(pe,We)=>O({continuation:pe,decision_token:We}),{onResult:Ae,refresh:()=>O()}),se&&se.resumed===!1&&!se.conflict&&se.reason&&ge(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${se.reason}`,"error",2400)}async function U(v,w,O=!0){if(!n)return null;let se=n,pe=await se(v,{...w,expected_revision:z()});return Ae(pe),pe&&pe.conflict&&O&&(pe=await se(v,{...w,expected_revision:z()}),Ae(pe)),pe}async function ye(v){if(!n||!v)return;let w=Oe().merge_queue?.find(se=>se.bead_id===v)?.continuation_action;if(w?.mismatch&&w.continuation===null){await qe(v,w.mismatch);return}N.add(v),J();let O;try{O=await U("worker-merge-queue-add",{bead_id:v})}catch{ge("\uBA38\uC9C0 \uD074\uB9AD\uC774 \uC11C\uBC84\uC5D0 \uC804\uB2EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4(\uC5F0\uACB0 \uBB38\uC81C) \u2014 \uC5F0\uACB0 \uBCF5\uAD6C \uD6C4 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",3200);return}finally{N.delete(v),J()}if(!(!O||O.applied)){if(O.conflict){ge("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}ge(Uy(O.reason),"error",2400)}}async function De(v){if(!(!n||!v||V.has(v))){V.add(v),J();try{let w=await n("worker-cleanup-retry",{bead_id:v,expected_revision:z()});Ae(w),w&&!w.retried&&!w.conflict&&w.reason&&ge(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${w.reason}`,"error",2400)}finally{V.delete(v),J()}}}async function qe(v,w){let O=await qn({continuation_mismatch:w},(pe,We)=>U("worker-merge-queue-add",{bead_id:v,continuation:pe,decision_token:We},!1)),se=O?.queue?.merge_queue?.find(pe=>pe.bead_id===v)?.continuation_action;if(O?.applied!==!0&&se?.continuation===null&&se.mismatch){await qe(v,se.mismatch);return}O&&O.applied===!1&&!O.conflict&&ge("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function je(v){if(!n)return;let w=await U("worker-merge-auto-toggle",{on:v});!w||w.conflict||ge(v?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",v?"success":"info",2400)}async function ft(v){if(!n||!v)return;let w=await U("worker-merge-queue-remove",{bead_id:v});w&&!w.conflict&&!w.applied&&w.reason==="merge_active"&&ge("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function xt(){await U("worker-merge-queue-remove",{all:!0})}async function Rt(v,w=null,O="unmerged",se=null){if(!n||!v)return;let pe=vo(v,O);if(!(!!se||typeof globalThis.confirm!="function"||globalThis.confirm(pe)))return;let it=await n("worker-discard",{bead_id:v,...w?{attempt_id:w}:{},...se?{operation_id:se}:{},expected_revision:z()});if(Ae(it),it&&it.conflict&&(it=await n("worker-discard",{bead_id:v,...w?{attempt_id:w}:{},...se?{operation_id:se}:{},expected_revision:z()}),Ae(it)),it&&it.discarded===!0){ge(Os(it),"success",5e3);return}if(it&&it.reason){ge(`\uD3D0\uAE30 \uC2E4\uD328: ${it.reason}`,"error",2800);return}if(it&&it.accepted&&it.pending==="merged_revert"){ge("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(it&&it.accepted&&!it.discarded){ge(`\uD3D0\uAE30 \uC9C4\uD589: ${it.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}it&&!it.conflict&&ge("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function Ft(v,w,O){if(!(!n||!w||!O||X.has(w))){X.add(w),J();try{let se=await n(v,{bead_id:w,action_id:O,expected_revision:z()});Ae(se),se?.conflict?ge("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!se?.ok&&se?.reason&&ge(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(se.reason)}`,"error",2800)}finally{X.delete(w),J()}}}async function Mt(v,w){if(!n||!w||H.has(w))return;H.add(w),J();let O;try{let se=async(pe={})=>await n(v,{bead_id:w,expected_revision:z(),...pe});O=await se(),Ae(O),O&&O.conflict&&(O=await n(v,{bead_id:w,expected_revision:z()}),Ae(O)),v==="worker-revise-fix"&&(O=await qn(O,(pe,We)=>se({continuation:pe,decision_token:We}),{onResult:Ae,refresh:()=>se()}))}finally{H.delete(w),J()}if(!(!O||O.conflict)){if(O.ok){ge(v==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}ge(`\uCC98\uBD84 \uAC70\uBD80: ${O.reason||""}`,"error",3e3)}}async function bt(v){if(!n)return;let w=await n("worker-automation-toggle",{on:v,expected_revision:z()});Ae(w),w&&w.conflict&&await n("worker-automation-toggle",{on:v,expected_revision:z()}).then(Ae)}async function Ve(v){if(!n||!v)return;let w=await n("worker-repo-operation-dismiss",{operation_id:v});Ae(w),w&&w.ok===!1&&ge(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${w.reason||""}`,"error",3e3)}async function L(v){if(!n||!Number.isFinite(v))return;let w=Math.max($i,Math.floor(v)),O=await n("worker-queue-set-slots",{slots:w,expected_revision:z()});Ae(O),O&&O.conflict&&await n("worker-queue-set-slots",{slots:w,expected_revision:z()}).then(Ae)}async function oe(v){if(!n||!Number.isInteger(v)||v<1||v>Zp)return;let w=Oe(),O=(Array.isArray(w.serial_lanes)?w.serial_lanes:[]).slice(v).reduce((We,it)=>We+(Array.isArray(it?.entries)?it.entries.length:0),0),se=()=>({count:v,expected_revision:z()}),pe=await n("worker-queue-set-serial-lane-count",se());Ae(pe),pe&&pe.conflict&&(pe=await n("worker-queue-set-serial-lane-count",se()),Ae(pe)),pe&&pe.applied&&O>0&&ge(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${O}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}let be="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C";function R(v,w){let O=Va(v,w.id,K);return{id:w.id,title:w.title,location_label:w.location_label,prefixes:w.prefixes,action:O.kind==="note"?{kind:"note",text:O.text}:O.kind==="disabled"?{kind:"disabled",label:be,title:O.title}:{kind:"place",label:be,title:O.title}}}function Q(v,w){if(!C||C.bead_id!==v)return null;let O=C.counterpart_id,se=w.filter(pe=>pe.id===O);return se.length===0?null:{rows:se.map(pe=>R(v,pe))}}async function Ne(v,w){let O=Va(v,w,K);if(C=null,O.kind!=="ops"){J();return}let se=z();for(let pe of O.ops){let We=await Ye(pe,se);if(We===null)break;se=We}J()}async function Ye(v,w){if(!n)return null;try{let O=await n("worker-queue-place",{bead_id:v.bead_id,lane:v.lane,index:v.index,expected_revision:w});if(Ae(O),O&&O.conflict)return ge("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!O||O.applied!==!0)return ge(O&&typeof O.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${O.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let se=O.queue?O.queue.revision:void 0;return typeof se!="number"?(ge("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):se}catch(O){return ge(O instanceof Error&&O.message?O.message:"\uD050 \uC694\uCCAD \uC2E4\uD328","error"),null}}function Me(){let v=dr(I),w=F.read({candidate_sort:j,done_since:v});return pt=w.workspaces,Be=tr(w.workspaces,w.workspaces_state,{done_since:v,candidate_filter:_,candidate_hidden_counts:"per_control",candidate_sort:"as_given",groups:"all"}),Be}function nt(v){return v.queue_groups[0]||Dy}function at(v){let w=v.dependency_chips||null,O={...w&&w.released?{released:w.released}:{},...w&&w.dependents?{dependents:w.dependents}:{}},se=ie.get(v.id),pe=ee.get(v.id)||null,We=se&&se.overlaps.length>0?se.overlaps:null,it=!!se&&se.scope_missing;if(!pe&&!We&&!it&&Object.keys(O).length===0)return null;let qt=We?Q(v.id,We):null;return{...O,...pe?{predecessors:pe}:{},...We?{overlaps:We}:{},...it?{scope_missing:!0}:{},...qt?{popover:qt}:{}}}function ze(v){return{...v,workspace_name:"",done_layout:void 0,dependency_chips:at(v)||void 0}}function rt(){let v=Oe(),w=new Map;for(let O of Object.values(ln(v.lane_states))){let se=Array.isArray(O?.corrections)?O.corrections:[];for(let pe of se)pe&&typeof pe.bead_id=="string"&&typeof pe.after=="string"&&w.set(pe.bead_id,pe.after)}return{admission:ln(v.admission),bead_labels:ln(v.bead_labels),correction_after:w}}function vt(v,w){let O=ze(v),se=eu(w.admission[v.id]||null,!!v.discard||X.has(v.id)),pe=w.bead_labels[v.id],We=w.correction_after.get(v.id);return{...O,draggable:O.draggable===!0&&!se,stale_work:se,reason:se?"":O.reason,worker_serial:Array.isArray(pe)&&Tp(pe),badges:We?[`\u{1F517} ${We} \uB4A4 (blocks \uC790\uB3D9)`,...O.badges||[]]:O.badges,revise_enabled:O.revise_enabled===!0&&!H.has(v.id)}}function Ge(v){let w=rt();return nt(v).sublanes.parallel.map(O=>vt(O,w))}function Ot(v){let w=rt();return nt(v).sublanes.serial.map(O=>{let se=O.occupants.map(pe=>({id:pe.id,title:pe.title,draggable:!1,lane:O.id,ghost:!0,badges:[pe.badge]}));return{id:O.id,index:O.index+1,raw_length:O.raw_length,ghosts:se,items:O.items.map(pe=>vt(pe,w)),occupied:O.occupied_by.length>0,badge:O.occupants.length>0?O.occupants[0].badge:"\uB300\uAE30",cycle:O.cycle===!0}})}function Xe(v){return v.runnable.map(w=>ze(w))}function st(v){return v.done.map(w=>ze(w))}function Nt(v){let w=v.running.filter(O=>O.non_occupying!==!0).map(O=>({...O,bead_id:O.id,attempt_id:O.attempt_id||"",paused:O.run_state==="paused",failed:O.run_state==="failed",status_label:O.run_state==="failed"?O.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328":void 0,can_pause:O.can_pause!==!1,workspace_name:"",dependency_chips:at(O)||void 0,rollup_expanded:Re.has(O.id),failure:O.failure?{...O.failure,open:M===O.attempt_id}:null}));return[...w.filter(O=>O.failed===!0),...w.filter(O=>O.failed!==!0)]}function At(v){if(we&&we.model===v)return we.rows;let w=Oe(),O=nt(v),se=ln(w.attempts),pe=Object.values(se).filter(_r),We=new Map;for(let Je of pe)We.set(Je.attempt_id,Je);let it=new Map;for(let Je of pe)it.set(Je.bead_id,Je);let qt=new Map;for(let Je of[...v.pr_wait,...v.running,...v.queue,...v.runnable,...v.done])qt.has(Je.id)||qt.set(Je.id,Je);let Ze=Je=>{let jt=null;for(let gn of pe)!gn||gn.bead_id!==Je||fa(gn,We)||(jt===null||(typeof gn.started_at=="number"?gn.started_at:0)>=(typeof jt.started_at=="number"?jt.started_at:0))&&(jt=gn);return jt&&typeof jt.target_base=="string"?jt.target_base:null},It=new Map;for(let Je of v.running)Je.run_state==="failed"||Je.conflict_resolution!==!0||(Je.run_state!=="paused"?It.set(Je.id,"running"):It.has(Je.id)||It.set(Je.id,"paused"));let Zt=ln(w.auto_merge_skips),Tn=new Set(O.merge.auto_excluded),sr=ln(w.pr_observations),Cn=ln(w.pr_activity),Yt=ln(w.cleanup_failed),Gn=ln(w.discard_operations),xr=ln(w.bead_workflow),Ar=ln(w.bead_titles),Rn=w.merge_queue_state||{active:null,failures:{}},Dn=O.merge.state.waiting,Kn=(Array.isArray(w.pr_wait)?w.pr_wait:[]).map(Je=>{let jt=qt.get(Je.bead_id);return{...Zy(Je.bead_id,jt?.title||Ar[Je.bead_id]||Je.bead_id,sr,Yt[Je.bead_id]||null,jn(se,Je.bead_id),Cn[Je.bead_id]||(N.has(Je.bead_id)?{activity:null,merge_progress:null,queueing:"merge"}:V.has(Je.bead_id)?{activity:null,merge_progress:null,queueing:"cleanup"}:null),It.get(Je.bead_id)||null,Je.external===!0,{position:O.merge.positions.get(Je.bead_id)||0,active:Rn.active===Je.bead_id,failure:ln(Rn.failures)[Je.bead_id]||null,waiting:Dn&&Dn.bead_id===Je.bead_id?Dn.reason:null,resolution:O.merge.resolutions.get(Je.bead_id),continuation_action:O.merge.continuations.get(Je.bead_id),authority:O.merge.authorities.get(Je.bead_id)||null},Je.wt_present!==!1,w.auto_merge===!0&&Tn.has(Je.bead_id)?Zt[Je.bead_id]?.reason||"":null,pa(O.declared_base,Ze(Je.bead_id)),ln(w.completion_status)[Je.bead_id]||null,Gn,it.get(Je.bead_id)?.worker_serial===!0,w.auto_merge===!0,{merge_sha:Je.merge_sha,cleanup_cursor:Je.cleanup_cursor,repo_operations:O.repo_operations},jt?at(jt):null,Qc(se,Je.bead_id)),workflow:xr[Je.bead_id]||null,priority:jt?.priority,from_id:jt?.from_id,...jt?.created_at===void 0?{}:{created_at:jt.created_at},...jt?.updated_at===void 0?{}:{updated_at:jt.updated_at}}});return we={model:v,rows:Kn},Kn}function St(v){let w=nt(v),O=[];for(let Ze of v.running)Ze.non_occupying!==!0&&O.push({id:Ze.id,title:Ze.title,location_label:"\uC2E4\uD589\uC911",kind:"running",lane_id:Ze.serial_lane_id??null});for(let Ze of v.pr_wait)O.push({id:Ze.id,title:Ze.title,location_label:"PR \uB300\uAE30",kind:"pr_wait",lane_id:null});for(let Ze of w.sublanes.serial)Ze.items.forEach((It,Zt)=>{O.push({id:It.id,title:It.title,location_label:`${Ze.id} #${Zt+1}`,kind:"serial",lane_id:Ze.id})});w.sublanes.parallel.forEach((Ze,It)=>{O.push({id:Ze.id,title:Ze.title,location_label:`#${It+1}`,kind:"parallel",lane_id:null})});for(let Ze of v.runnable)O.push({id:Ze.id,title:Ze.title,location_label:"\uD6C4\uBCF4",kind:"candidate",lane_id:null,queue_placeable:Ze.queue_placeable===!0});let se=new Map;for(let Ze of O)se.has(Ze.id)||se.set(Ze.id,Ze);let pe={},We=new Set;for(let Ze of w.sublanes.serial)pe[Ze.id]=Ze.raw_length,Ze.occupied_by.length>0&&We.add(Ze.id);K={members_by_id:se,serial_raw_lengths:pe,serial_lane_count:w.serial_lane_count,occupied_lanes:We};let it=Oe();ie=Pd(it.bead_scope,O);let qt=new Map;for(let Ze of[...v.running,...v.runnable])Array.isArray(Ze.blocked_by)&&Ze.blocked_by.length>0&&qt.set(Ze.id,Ze.blocked_by);for(let[Ze,It]of Object.entries(ln(it.bead_blocked_by)))Array.isArray(It)&&qt.set(Ze,It.filter(Zt=>typeof Zt=="string"&&Zt.length>0));ee=lu(qt,O,ln(it.blocker_workspaces))}function Vt(v){let w=Oe(),O=nt(v),se=O.sublanes.parallel,pe=se.length>0?se[0].id:"\u2014",We=u`<button
      type="button"
      class="worker-play${w.auto_advance?" is-active":""}"
    >
      ${w.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,it=mn(v),qt=O.over_cap?u`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",Ze=w.auto_advance?0:(Array.isArray(w.queue)?w.queue:[]).filter(Yt=>Yt&&typeof Yt.armed_by_lane=="string"&&Yt.armed_by_lane.length>0).length,It=Ze>0?u`<span
            class="worker-kpi__chip worker-kpi__chip--armed"
            title="모니터 연결 레인이 발차한 대기 행입니다 — 이 레포의 자동 진행은 꺼진 채입니다"
            >⏸ 자동 진행 꺼짐 · 연결 레인 ${Ze}건 진행 중</span
          >`:"",Zt=u`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${O.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${At(v).length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${W()} 완료 <b>${v.done.length}</b></span
      >`,Tn=u`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${O.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${O.declared_base||"?"}</span
    >`,sr=u`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${$i}
          step="1"
          .value=${String(O.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:Zp},(Yt,Gn)=>Gn+1).map(Yt=>u`<option
                value=${String(Yt)}
                ?selected=${O.serial_lane_count===Yt}
              >
                ${Yt}
              </option>`)}
        </select>
      </label> `,Cn=Zc(O.repo_operations,O.cleanup_failures);return te?u`<div class="worker-ribbon">
          ${We} ${it}
          <div class="worker-kpi worker-kpi--ribbon">
            ${qt}${It}${Zt}
          </div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${sr}</div>
          <div class="worker-kpi">${Tn}</div>
        </div>
        ${Cn}${me.template()}`:u`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${We}${it}${sr}</div>
        <div class="worker-kpi">
          ${qt}${It}${Zt}${Tn}
          ${(Array.isArray(O.token_total)?O.token_total:O.token_total?[{label:O.token_total,tooltip:`${W()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(Yt=>u`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${Yt.tooltip}
                >${W()} 완료 · 누적 ${Yt.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${pe}</b></span
          >
        </div>
      </div>
      ${Cn}${me.template()}`}function en(v){let w=v.runnable_hidden;return u`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${_.show_blocked}
        />
        🔒 blocked${w.blocked>0?` ${w.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${qy.map(O=>u`<button
              type="button"
              class="worker-filter__chip${_.spec===O.value?" is-active":""}"
              data-spec=${O.value}
              aria-pressed=${_.spec===O.value?"true":"false"}
            >
              ${O.label}
            </button>`)}
        ${w.spec>0?u`<span class="worker-filter__hidden">숨김 ${w.spec}</span>`:""}
      </div>
    </div>`}function Wt(){let v=P?"custom":el(j)||"custom";return u`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${v}
    >
      ${Ko.map(w=>u`<option value=${w.id} ?selected=${v===w.id}>
            ${w.label}
          </option>`)}
      <option value="custom" ?selected=${v==="custom"}>
        사용자 지정…
      </option>
    </select>`}function zt(){let v=Yo(j);return u`<div
      class="worker-sort-chain"
      role="group"
      aria-label="후보 정렬 체인"
    >
      ${[0,1,2].map(w=>{let O=v[w];return u`<span class="worker-sort-chain__step">
          <select
            class="worker-sort-chain__key"
            data-step=${w}
            aria-label=${`${w+1}\uCC28 \uC815\uB82C \uD0A4`}
            .value=${O?O.key:""}
          >
            ${w===0?"":u`<option value="" ?selected=${!O}>없음</option>`}
            ${Ip.map(se=>u`<option
                  value=${se.key}
                  ?selected=${!!O&&O.key===se.key}
                >
                  ${se.label}
                </option>`)}
          </select>
          ${O?u`<button
                type="button"
                class="worker-sort-chain__dir"
                data-step=${w}
                aria-label=${O.dir==="asc"?"\uC624\uB984\uCC28\uC21C":"\uB0B4\uB9BC\uCC28\uC21C"}
                title=${O.dir==="asc"?"\uC624\uB984\uCC28\uC21C":"\uB0B4\uB9BC\uCC28\uC21C"}
              >
                ${O.dir==="asc"?"\u2191":"\u2193"}
              </button>`:""}
        </span>`})}
    </div>`}function Tt(){return u`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${I}
      >
        ${Er.map(v=>u`<option value=${v.value} ?selected=${I===v.value}>
              ${v.label}
            </option>`)}
      </select>
    </div>`}function mn(v){let w=nt(v).merge,O=Oe().auto_merge===!0;if(w.running)return u`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${O?" is-active":""}"
        title=${O?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${O?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${w.positions.size}
      </button>`;if(O)return u`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let se=new Set(w.auto_excluded),pe=At(v).filter(We=>We.merge_action&&We.merge_enabled&&!se.has(We.id)).length;return u`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${pe>0?` ${pe}`:""}
    </button>`}function Kt(v){if(!(v.draggable!==!0||v.done===!0))return u`<span class="worker-mini__rowops">
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
    </span>`}function kt(v,w){return u`<div
      data-bead-id=${v.id}
      data-drag-kind=${w.kind}
      data-root-dir=${w.root_dir}
      data-lane-id=${Jt(w.lane_id)}
      data-row-index=${w.row_index}
      data-queue-index=${String(v.queue_index??0)}
    >
      ${kn(v,{actions:Kt(v)})}
    </div>`}function Ht(v){let w=Ge(v),O=Ue();return qs({parallel:{rows:w.map((se,pe)=>kt(se,{kind:"parallel",root_dir:O,row_index:pe})),count:w.length,collapsed:G.isAreaCollapsed("parallel"),drop:{drop:"parallel",root_dir:O}},serial:{lanes:Ot(v).map(se=>({id:se.id,title:`\uC9C1\uB82C ${se.index}`,rows:[...se.ghosts.map(pe=>kn(pe,{actions:Kt(pe)})),...se.items.map((pe,We)=>kt(pe,{kind:"repo-serial",root_dir:O,row_index:We,lane_id:se.id}))],count:se.ghosts.length+se.items.length,empty:se.ghosts.length+se.items.length===0,badge:se.badge,held:se.occupied,cycle:se.cycle,drop:{drop:"repo-serial",root_dir:O,lane_id:se.id,lane_length:String(se.raw_length)}})),collapsed:G.isAreaCollapsed("serial")}})}function cn(v){return Bd(Nt(v),Date.now(),B)}function ve(v){return v.running.some(w=>w.kind!=="session"&&w.run_state==="running")}function E(v){let w=nt(v),O=Xe(v),se=Ge(v),pe=st(v),We=At(v),it=Nt(v),qt=Pn({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4",items:O,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:Wt(),header_row:P?zt():void 0,controls:en(v),collapsible:!0,collapsed:G.isCollapsed("candidate"),place_menu:He(O),onOpenDoc:c?(It,Zt)=>c(Zt):void 0}),Ze=Pn({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:pe,empty:`${W()} \uC644\uB8CC \uC5C6\uC74C`,header_control:Tt(),collapsible:!0,collapsed:G.isCollapsed("done"),preview:te?Array.isArray(w.token_total)?w.token_total.map(It=>It.label).join(" \xB7 "):w.token_total||Jp(pe):void 0});return te?u`<div class="worker-lanes worker-lanes--mobile">
        ${Fs({live:ve(v),running_body:it.length>0?cn(v):"",pr_wait_rows:We.map(It=>kn(It)),count:it.length+We.length})}
        ${Pn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:se,count:se.length,collapsible:!0,collapsed:G.isCollapsed("queue"),preview:Jp(se),body:Ht(v)})}
        ${qt} ${Ze}
      </div>`:u`<div class="worker-lanes">
      ${qt}
      ${Pn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:se,count:se.length,collapsible:!0,collapsed:G.isCollapsed("queue"),body:Ht(v)})}
      ${Pn({id:"worker-pane-running",lane:"running",title:"\uC2E4\uD589 \uC911",items:it,header_control:u`<span class="worker-pane__meta"
          >슬롯 ${w.slots}</span
        >`,live:ve(v),collapsible:!0,collapsed:G.isCollapsed("running"),body:cn(v)})}
      ${Pn({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:We,empty:"PR \uB300\uAE30 \uC5C6\uC74C",collapsible:!0,collapsed:G.isCollapsed("pr_wait")})}
      ${Ze}
    </div>`}function h(v){G.toggle(v),J()}function A(v){G.toggleArea(v),J()}function J(){let v=Me();St(v),ct(Vt(v),S),ct(E(v),he)}function Fe(){let v=!0,w=fi(O=>{if(te=O,v){v=!1;return}J()});ce.push(w)}function Le(v){_=v,Ny(v),J()}function Ke(v){if(v==="custom"){P=!0,J();return}j=kr(v),tl(j),P=!1,J()}function yt(v){j=kr({chain:v}),tl(j),J()}function gt(v){I=On(v),jy(I),p?.(I),J()}function _t(v){let w=v.target?.closest?.(".worker-serial-lane-count");if(w){let Ze=Number.parseInt(w.value,10);Number.isFinite(Ze)&&oe(Ze).then(J);return}let O=v.target?.closest?.(".worker-filter__blocked");if(O){Le({..._,show_blocked:O.checked});return}let se=v.target?.closest?.(".worker-sort-chain__key");if(se){let Ze=Number.parseInt(se.getAttribute("data-step")||"",10);Number.isFinite(Ze)&&yt(Dp(Yo(j),Ze,se.value));return}let pe=v.target?.closest?.(".worker-done-range");if(pe){gt(pe.value);return}let We=v.target?.closest?.(".worker-sort");if(We){Ke(We.value);return}let it=v.target?.closest?.(".worker-slots__input");if(!it)return;let qt=Number.parseInt(it.value,10);if(!Number.isFinite(qt)){J();return}L(qt).then(J)}function lt(v){return v?{runner:v.runner||void 0,model:v.model||void 0,effort:v.effort||void 0,worktree:v.worktree||void 0,status:v.status||void 0,session_id:v.session_id||void 0}:{}}function m(){let v=nt(Me()),w=Oe().workspace_info,O=w&&typeof w=="object"&&w.repo_ops&&typeof w.repo_ops=="object"?w.repo_ops:null;return{operations:v.repo_operations,cleanup_failures:v.cleanup_failures,repo:l&&l()||"",repo_ops:O}}function b(){B&&de.close(),ke.hidden=!1,ne.hidden=!1,ae.open(m()),J()}function T(v){let w=Oe(),O=w.attempts?w.attempts[v]:null;B=v,ae.close(),ke.hidden=!0,ne.hidden=!1,de.open({attempt_id:v,meta:lt(O)}),J()}function D(v){let w=Oe(),O=(Array.isArray(w.session_active)?w.session_active:[]).find(pe=>pe&&pe.bead_id===v),se=(O&&Array.isArray(O.session_refs)?O.session_refs:[]).find(pe=>pe&&pe.current===!0);se&&(ae.close(),ke.hidden=!0,ne.hidden=!1,de.open(qr(se,v,"in_progress")),J())}function f(){if(ae.isOpen()&&ae.refresh(m()),!B)return;let v=Oe(),w=v.attempts?v.attempts[B]:null;if(w){de.updateMeta(lt(w));return}de.close()}function y(v,w){if(v.length===0||!i)return;let O=l?l():void 0;if(w.length===0||!O||w===O||!a){i(v);return}Promise.resolve(a(w)).then(()=>{i(v)}).catch(()=>{ge("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})}function Y(v){let w=v.target;if(w?.closest?.(".worker-mini__serial, .worker-mini__grip"))return;let O=w?.closest?.(".worker-sort-chain__dir");if(O){let fe=Number.parseInt(O.getAttribute("data-step")||"",10);Number.isFinite(fe)&&yt(Mp(Yo(j),fe));return}let se=w?.closest?.(".worker-dep__open");if(se){y(se.getAttribute("data-dep-id")||"",se.getAttribute("data-root-dir")||"");return}let pe=w?.closest?.(".mon-overlap__chip");if(pe){let fe=pe.closest("[data-bead-id]"),Ce=fe&&fe.getAttribute("data-bead-id")||"";if(Ce){let tt=pe.getAttribute("data-overlap-id")||"";C=!!C&&C.bead_id===Ce&&C.counterpart_id===tt?null:{bead_id:Ce,counterpart_id:tt},J()}return}let We=w?.closest?.(".mon-overlap__place");if(We){let fe=We.closest("[data-bead-id]"),Ce=fe&&fe.getAttribute("data-bead-id")||"";Ce&&Ne(Ce,We.getAttribute("data-counterpart-id")||"");return}if(w?.closest?.(".mon-overlap__popover"))return;if(w?.closest?.(".worker-repo-strip")){b();return}let it=w?.closest?.(".worker-repo-op__dismiss");if(it){Ve(it.dataset.operationId||"");return}let qt=w?.closest?.(".worker-cleanup__resume");if(qt){let fe=qt.dataset.beadId;fe&&De(fe);return}if(w?.closest?.(".worker-play")){bt(!Oe().auto_advance);return}let Ze=w?.closest?.(".worker-merge-all");if(Ze){Ze.classList.contains("worker-merge-all--stop")?Oe().auto_merge===!0?je(!1):xt():je(!0);return}let It=w?.closest?.(".worker-pane__toggle[data-lane]");if(It){let fe=It.dataset.lane;(fe==="candidate"||fe==="queue"||fe==="running"||fe==="pr_wait"||fe==="done")&&h(fe);return}let Zt=w?.closest?.(".worker-wait__area-toggle[data-area]");if(Zt){let fe=Zt.dataset.area;(fe==="parallel"||fe==="serial")&&A(fe);return}let Tn=w?.closest?.(".worker-card__place-lane");if(Tn){let fe=Tn.dataset.beadId,Ce=Tn.dataset.lane;fe&&(Ce==="parallel"||/^s[1-5]$/.test(Ce||""))&&($=null,J(),re(fe,Ce));return}if(w?.closest?.(".worker-card__place-cancel")){$=null,J();return}let Cn=w?.closest?.(".worker-card__place");if(Cn){let fe=Cn.dataset.beadId;fe&&!Cn.disabled&&(Qe()?($=fe,J()):re(fe,"parallel"));return}let Yt=w?.closest?.(".worker-filter__chip");if(Yt){let fe=Yt.dataset.spec;(fe==="all"||fe==="with"||fe==="without")&&Le({..._,spec:fe});return}let Gn=w?.closest?.('[data-action="queue-remove"]');if(Gn){let fe=Gn.dataset.beadId||"";fe&&Pe.sendOp({type:"worker-queue-remove",payload:{bead_id:fe},root_dir:Ue()},fe);return}let xr=w?.closest?.(".worker-mini__merge");if(xr){let fe=xr.dataset.beadId||"";Oe().cleanup_failed?.[fe]?De(fe):ye(fe);return}let Ar=w?.closest?.(".worker-mini__merge-cancel");if(Ar){ft(Ar.dataset.beadId||"");return}let Rn=w?.closest?.(".worker-mini__discard");if(Rn){Rt(Rn.dataset.beadId||"",Rn.dataset.attemptId||null,Rn.dataset.discardMode==="merged"?"merged":"unmerged",Rn.dataset.operationId||null);return}let Dn=w?.closest?.(".worker-mini__stale-continue");if(Dn){Ft("worker-stale-work-continue",Dn.dataset.beadId||"",Dn.dataset.actionId||"");return}let Kn=w?.closest?.(".worker-mini__stale-backup");if(Kn){Ft("worker-stale-work-backup-fresh",Kn.dataset.beadId||"",Kn.dataset.actionId||"");return}let Je=w?.closest?.(".worker-mini__stale-recheck");if(Je){Ft("worker-stale-work-recheck",Je.dataset.beadId||"",Je.dataset.actionId||"");return}let jt=w?.closest?.(".worker-mini__revise-fix");if(jt){Mt("worker-revise-fix",jt.dataset.beadId||"");return}let gn=w?.closest?.(".worker-mini__revise-approve");if(gn){Mt("worker-revise-approve",gn.dataset.beadId||"");return}if(w?.closest?.(".worker-mini__pr"))return;let ut=w?.closest?.(".rtile__failure-badge");if(ut){let fe=ut.dataset.attemptId||"";M=M===fe?null:fe,J();return}let k=w?.closest?.(".rtile__attempt-copy");if(k){let fe=k.dataset.attemptId||"";fe&&nn(fe).then(Ce=>{ge(Ce?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",Ce?"success":"error",1400)});return}let Z=w?.closest?.(".rtile__discard");if(Z){let fe=w?.closest?.(".rtile"),Ce=fe?.dataset?.beadId,tt=fe?.dataset?.attemptId;Ce&&Rt(Ce,tt||null,Z.dataset.confirmation==="merged"?"merged":"unmerged",Z.dataset.operationId||null);return}if(w?.closest?.(".rtile__pause")){let Ce=w?.closest?.(".rtile")?.dataset?.attemptId;Ce&&dt(Ce);return}if(w?.closest?.(".rtile__resume")){let Ce=w?.closest?.(".rtile")?.dataset?.attemptId;Ce&&x(Ce);return}if(w?.closest?.(".rtile__session")){let fe=w?.closest?.(".rtile"),Ce=fe?.dataset?.attemptId;if(Ce){T(Ce);return}let tt=fe?.dataset?.beadId;tt&&D(tt);return}if(w?.closest?.(".rtile__failure-pop"))return;if(w?.closest?.(".worker-drawer-overlay__backdrop")){ae.close(),de.close();return}if(w?.closest?.(".worker-drawer-host"))return;let q=w?.closest?.(".rtile .board-card__roll-toggle");if(q){let fe=q.dataset.rollParent;fe&&(Re.has(fe)?Re.delete(fe):Re.add(fe),J());return}let Ie=w?.closest?.(".rtile .board-card__roll-child");if(Ie){let fe=Ie.dataset.childId;fe&&i&&i(fe);return}let et=w?.closest?.(".rtile");if(et){if(w?.closest?.(".rtile__id")){let Ce=et.dataset.beadId;Ce&&nn(Ce).then(tt=>{tt?ge("\uBCF5\uC0AC\uB428","success",1200):ge("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let fe=et.dataset.beadId;fe&&i&&i(fe);return}let ot=w?.closest?.(".worker-mini, .worker-card");if(ot){let fe=ot.dataset.beadId;if(w?.closest?.('[data-seam="log-path-copy"]'))return;if(w?.closest?.(".worker-mini__id, .worker-card__id")){fe&&nn(fe).then(tt=>{tt?ge("\uBCF5\uC0AC\uB428","success",1200):ge("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Ce=w?.closest?.(".ctl-chip--from");if(Ce){let tt=Ce.dataset.fromId;tt&&i&&i(tt);return}fe&&i&&i(fe)}}Pe.attach(e),e.addEventListener("click",Y),e.addEventListener("change",_t);function ue(v){let w=v.target,O=w&&typeof w.closest=="function"?pe=>w.closest(pe):()=>null,se=!1;C&&!O(".mon-overlap__popover, .mon-overlap__chip")&&(C=null,se=!0),M&&!O(".rtile__failure-pop, .rtile__failure-badge")&&(M=null,se=!0),se&&J()}function Ee(v){v.key!=="Escape"||!C&&M===null||(C=null,M=null,J())}return document.addEventListener("click",ue),document.addEventListener("keydown",Ee),ce.push(()=>{document.removeEventListener("click",ue),document.removeEventListener("keydown",Ee)}),Fe(),g&&ce.push(g.subscribe(()=>{F.notifyIssuesChanged(),J()})),o&&ce.push(o.subscribe(()=>{let v=l&&l()||"";v!==xe&&(xe=v,le.close()),J(),f()})),J(),{load(){F.ensureSessionDefaults(),J()},refreshSessionDefaults:$e,destroy(){for(let v of ce.splice(0))try{v()}catch{}Pe.detach(),e.removeEventListener("click",Y),e.removeEventListener("change",_t),F.destroy();try{de.destroy()}catch{}ne.hidden=!0;try{le.destroy()}catch{}ct(u``,e)}}}function ol(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function rf(e,t,n,r=async()=>{},o=async()=>{}){let s=Lt("views:workspace-picker"),i=null,l=!1,a=!1,c=!1;async function d(I){let G=I.target.value,N=t.getState().workspace?.current?.path||"";if(G&&G!==N){s("switching workspace to %s",G),l=!0,P();try{await n(G)}catch(V){s("workspace switch failed: %o",V)}finally{l=!1,P()}}}async function p(){let I=t.getState(),W=I.workspace?.current?.path||I.workspace?.available?.[0]?.path||"";if(!(!W||a)){s("git-pulling workspace %s",W),a=!0,P();try{await r(W)}catch(G){s("workspace git pull failed: %o",G)}finally{a=!1,P()}}}function g(I){let W=I.target;W&&e.contains(W)||C()}function _(I){I.key==="Escape"&&C()}function $(){c||(c=!0,document.addEventListener("mousedown",g),document.addEventListener("keydown",_),P())}function C(){c&&(c=!1,document.removeEventListener("mousedown",g),document.removeEventListener("keydown",_),P())}function M(){c?C():$()}async function K(I){let W=I.target,G=W.value,te=W.checked;s("toggling visibility %s \u2192 %s",G,String(te));try{await o(G,te)}catch(N){s("workspace visibility toggle failed: %o",N)}}function ie(I){return I?u`
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
    `:u``}function ee(I,W){return u`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${M}
          aria-haspopup="true"
          aria-expanded=${c?"true":"false"}
          aria-label="프로젝트 관리"
        >
          프로젝트 관리
        </button>
        ${c?u`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${I.map(G=>u`
                    <label
                      class="workspace-picker__manage-row"
                      title="${G.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${G.path}"
                        .checked=${!W.has(G.path)}
                        @change=${K}
                      />
                      <span class="workspace-picker__manage-name"
                        >${ol(G.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function j(){let I=t.getState(),W=I.workspace?.current,G=I.workspace?.available||[],te=new Set(I.workspace?.hidden||[]),N=W?.path||G[0]?.path||"";if(G.length===0)return u``;let V=G.filter(H=>!te.has(H.path)||H.path===N);if(V.length<=1){let H=V[0]||G[0],X=ol(H.path);return u`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${H.path}"
            >${X}</span
          >
          ${ee(G,te)}
          ${ie(N)}
          ${a?u`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return u`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${d}
          ?disabled=${l||a}
          aria-label="Select project workspace"
        >
          ${V.map(H=>u`
              <option
                value="${H.path}"
                ?selected=${H.path===N}
                title="${H.path}"
              >
                ${ol(H.path)}
              </option>
            `)}
        </select>
        ${ee(G,te)}
        ${ie(N)}
        ${l||a?u`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function P(){ct(j(),e)}return P(),i=t.subscribe(()=>P()),{destroy(){i&&(i(),i=null),document.removeEventListener("mousedown",g),document.removeEventListener("keydown",_),ct(u``,e)}}}var of=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","get-workspace-accounts","set-workspace-accounts","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-dismiss","worker-repo-operation-deploy-run","worker-queue-set-slots","worker-queue-set-serial-lane-count","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","get-session-refs","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"];function sl(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function sf(e,t,n=sl()){return{id:n,type:e,payload:t}}function af(e={}){let t=Lt("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",o=null,s="closed",i=0,l=null,a=!0,c=new Map,d=[],p=new Map,g=new Set;function _(j){for(let P of Array.from(g))try{P(j)}catch{}}function $(){if(!a||l)return;s="reconnecting",t("ws reconnecting\u2026"),_(s);let j=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,i)),P=(n.jitterRatio||0)*j,I=Math.max(0,Math.round(j+(Math.random()*2-1)*P));t("ws retry in %d ms (attempt %d)",I,i+1),l=setTimeout(()=>{l=null,ee()},I)}function C(j){try{o?.send(JSON.stringify(j))}catch(P){t("ws send failed",P)}}function M(){for(s="open",t("ws open"),_(s),i=0;d.length;){let j=d.shift();j&&C(j)}}function K(j){let P;try{P=JSON.parse(String(j.data))}catch{t("ws received non-JSON message");return}if(!P||typeof P.id!="string"||typeof P.type!="string"){t("ws received invalid envelope");return}if(c.has(P.id)){let W=c.get(P.id);c.delete(P.id),P.ok?W?.resolve(P.payload):W?.reject(P.error||new Error("ws error"));return}let I=p.get(P.type);if(I&&I.size>0)for(let W of Array.from(I))try{W(P.payload)}catch(G){t("ws event handler error",G)}else t("ws received unhandled message type: %s",P.type)}function ie(){s="closed",t("ws closed"),_(s);for(let[j,P]of c.entries())P.reject(new Error("ws disconnected")),c.delete(j);i+=1,$()}function ee(){if(!a)return;let j=r();try{o=new WebSocket(j),t("ws connecting %s",j),s="connecting",_(s),o.addEventListener("open",M),o.addEventListener("message",K),o.addEventListener("error",()=>{}),o.addEventListener("close",ie)}catch(P){t("ws connect failed %o",P),$()}}return ee(),{send(j,P){if(!of.includes(j))return Promise.reject(new Error(`unknown message type: ${j}`));let I=sl(),W=sf(j,P,I);return t("send %s id=%s",j,I),new Promise((G,te)=>{c.set(I,{resolve:G,reject:te,type:j}),o&&o.readyState===o.OPEN?C(W):(t("queue %s id=%s (state=%s)",j,I,s),d.push(W))})},on(j,P){p.has(j)||p.set(j,new Set);let I=p.get(j);return I?.add(P),()=>{I?.delete(P)}},onConnection(j){return g.add(j),()=>{g.delete(j)}},reconnect(){a=!0,l&&(clearTimeout(l),l=null),i=0,ee()},close(){a=!1,l&&(clearTimeout(l),l=null);try{o?.close()}catch{}},getState(){return s}}}function Jy(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function ev(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var il=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],lf=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],rr="tab:worker:closed",tv="bdui.worker.done-range",cf=ip,uf="worker:queue",df="ui:order",pf="ui:display-policy",ff="exec:presets",or="tab:board:closed",_f="beads-ui.board.closed-range";function nv(e){if(!e)return()=>{};function t(r){document.documentElement.style.setProperty("--app-header-h",`${Math.round(r)}px`)}if(t(e.getBoundingClientRect().height),typeof ResizeObserver!="function")return()=>{};let n=new ResizeObserver(r=>{for(let o of r)t(o.contentRect.height+rv(e))});return n.observe(e),()=>n.disconnect()}function rv(e){let t=getComputedStyle(e);return[t.paddingTop,t.paddingBottom,t.borderTopWidth,t.borderBottomWidth].reduce((r,o)=>r+(parseFloat(o)||0),0)}function ov(e){let t=Lt("main");t("bootstrap start"),nv(document.querySelector(".app-header"));let n=u`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;ct(n,e);let r=document.getElementById("global-nav"),o=document.getElementById("top-nav"),s=document.getElementById("repo-scope"),i=document.getElementById("usage-meter"),l=document.getElementById("board-root"),a=document.getElementById("worker-root"),c=document.getElementById("monitor-root"),d=document.getElementById("detail-panel");if(i&&Sp(i),l&&a&&c&&d){let Te=function(f,y){let Y="Request failed",ue="";if(f&&typeof f=="object"){let v=f;if(typeof v.message=="string"&&v.message.length>0&&(Y=v.message),typeof v.details=="string")ue=v.details;else if(v.details&&typeof v.details=="object")try{ue=JSON.stringify(v.details,null,2)}catch{ue=""}}else typeof f=="string"&&f.length>0&&(Y=f);let Ee=y&&y.length>0?`Failed to load ${y}`:"Request failed";ne.open(Ee,Y,ue)},Ae=function(f){return`${ve.getState().workspace.current?.path||""}\0${f}`},dt=function(){xe&&(xe().catch(()=>{}),xe=null),me=null,Oe=null},U=function(f){Qe=f;let y=()=>{Qe!==f||ve.getState().selected_id!==f||(Qe=null,x(f))};if(!re){Ue.then(y);return}y()},je=function(f,y,Y,ue,Ee){return Y!==qe[y]?(Ee().catch(()=>{}),!1):(f.set(ue,Ee),!0)},xt=function(){let f=ve.getState();Ve(f.view==="board"),Ne(f.view==="worker"),rt(ze(f)),Me(f.view==="board"||f.view==="worker"||ft||!!f.selected_id)},Mt=function(){let f=dr(Rt);return f===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:f}}},bt=function(){let f=dr(Ft);return f===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:f}}},Ve=function(f){if(f)for(let[y,Y]of il){if(ye.has(y)||De.has(y))continue;let ue=y===or?Mt():{type:Y};try{Be.register(y,ue)}catch(w){t("register %s store failed: %o",y,w)}De.add(y);let Ee=qe.board,v=!1;he.subscribeList(y,ue).then(w=>{v=!je(ye,"board",Ee,y,w)}).catch(w=>{t("subscribe %s failed: %o",y,w),Te(w,"board")}).finally(()=>{De.delete(y),v&&xt()})}else be()},be=function(){qe.board+=1;for(let[f]of il){let y=ye.get(f);y&&(y().catch(()=>{}),ye.delete(f));try{Be.unregister(f)}catch(Y){t("unregister %s failed: %o",f,Y)}}},Ne=function(f){if(!f){Ye();return}for(let[y,Y]of lf){if(R.has(y)||De.has(y))continue;let ue=y===rr?bt():{type:Y};try{Be.register(y,ue)}catch(w){t("register %s store failed: %o",y,w)}De.add(y);let Ee=qe.worker,v=!1;he.subscribeList(y,ue).then(w=>{v=!je(R,"worker",Ee,y,w)}).catch(w=>{t("subscribe %s failed: %o",y,w),Te(w,"worker")}).finally(()=>{De.delete(y),v&&xt()})}},Ye=function(){qe.worker+=1;for(let[f]of lf){let y=R.get(f);y&&(y().catch(()=>{}),R.delete(f));try{Be.unregister(f)}catch(Y){t("unregister %s failed: %o",f,Y)}}},Me=function(f){if(!f){nt();return}Q||(ke("subscribe-worker-queue",{id:uf}).catch(y=>{t("subscribe-worker-queue failed: %o",y)}),Q=()=>ke("unsubscribe-worker-queue",{id:uf}))},nt=function(){Q&&(Q().catch(()=>{}),Q=null)},ze=function(f){return f.view==="monitor"||f.selected_id!=null},rt=function(f){if(!f){vt();return}at||(ke("subscribe-monitor-pipeline",{id:cf}).catch(y=>{t("subscribe-monitor-pipeline failed: %o",y)}),at=()=>ke("unsubscribe-monitor-pipeline",{id:cf}))},vt=function(){at&&(at().catch(()=>{}),at=null)},Ot=function(){Ge||(ke("subscribe-ui-order",{id:df}).catch(f=>{t("subscribe-ui-order failed: %o",f)}),Ge=()=>ke("unsubscribe-ui-order",{id:df}))},Xe=function(){Ge&&(Ge().catch(()=>{}),Ge=null),B.clear()},Nt=function(){st||(ke("subscribe-display-policy",{id:pf}).catch(f=>{t("subscribe-display-policy failed: %o",f)}),st=()=>ke("unsubscribe-display-policy",{id:pf}))},At=function(){st&&(st().catch(()=>{}),st=null),de.clear()},Vt=function(){St||(ke("subscribe-impl-presets",{id:ff}).catch(f=>{t("subscribe-impl-presets failed: %o",f)}),St=()=>ke("unsubscribe-impl-presets",{id:ff}))},Kt=function(f){if(!f)return"Unknown";let y=f.split("/").filter(Boolean);return y.length>0?y[y.length-1]:"Unknown"},gt=function(f,y){yt.open(f.path,{missing_state:f.missing_state,...y?{workspace:y}:{}})};var p=Te,g=Ae,_=dt,$=U,C=je,M=xt,K=Mt,ie=bt,ee=Ve,j=be,P=Ne,I=Ye,W=Me,G=nt,te=ze,N=rt,V=vt,H=Ot,X=Xe,Re=Nt,we=At,ce=Vt,F=Kt,$e=gt;let Se=document.getElementById("header-loading"),S=Vl(Se),ne=Od(e),_e=af(),ke=S.wrapSend((f,y)=>_e.send(f,y)),he=Ul(ke),Be=Wl(),pt=Hl(),Pe=wl(),B=zl(),de=yl(),ae=vl(),le=kl();_e.on("impl-presets-snapshot",f=>{let y=f;y&&typeof y.revision=="number"&&Array.isArray(y.presets)&&ae.set({revision:y.revision,presets:y.presets})}),_e.on("monitor-pipeline-snapshot",f=>{let y=f;if(!(!y||!Array.isArray(y.workspaces)))try{Pe.set(y.workspaces,y.workspaces_state,y.cross_lanes)}catch{}}),_e.on("ui-order-snapshot",f=>{let y=f;if(y&&typeof y.revision=="number")try{B.set({revision:y.revision,order:y.order&&typeof y.order=="object"?y.order:{}})}catch{}}),_e.on("display-policy-snapshot",f=>{let y=f;if(y&&y.policy&&typeof y.policy=="object")try{de.set(y.policy)}catch{}}),_e.on("session-log-snapshot",f=>{let y=f;if(y&&typeof y.id=="string")try{le.set(y.id,Array.isArray(y.lines)?y.lines:[],typeof y.last_event_at=="number"?y.last_event_at:null)}catch{}}),_e.on("session-log-append",f=>{let y=f;if(y&&typeof y.id=="string")try{le.append(y.id,y.event)}catch{}}),_e.on("snapshot",f=>{let y=f,Y=y&&typeof y.id=="string"?y.id:"",ue=Y?Be.getStore(Y):null;if(ue&&y&&y.type==="snapshot")try{ue.applyPush(y)}catch{}}),_e.on("upsert",f=>{let y=f,Y=y&&typeof y.id=="string"?y.id:"",ue=Y?Be.getStore(Y):null;if(ue&&y&&y.type==="upsert")try{ue.applyPush(y)}catch{}}),_e.on("delete",f=>{let y=f,Y=y&&typeof y.id=="string"?y.id:"",ue=Y?Be.getStore(Y):null;if(ue&&y&&y.type==="delete")try{ue.applyPush(y)}catch{}});let xe=null,me=null,Oe=null,Qe=null,He=()=>{},Ue=new Promise(f=>{He=()=>f(void 0)}),re=!1,z=!1;async function x(f){let y=Ae(f);if(y===me||y===Oe)return;Oe=y;let Y=`detail:${f}`,ue={type:"issue-detail",params:{id:f}};try{Be.register(Y,ue)}catch(Ee){t("register detail store failed: %o",Ee)}try{let Ee=await he.subscribeList(Y,ue);if(ve.getState().selected_id!==f||Ae(f)!==y){await Ee().catch(()=>{});return}xe&&await xe().catch(()=>{}),xe=Ee,me=y}catch(Ee){t("detail subscribe failed: %o",Ee),Te(Ee,"issue details")}finally{Oe===y&&(Oe=null)}}let ye=new Map,De=new Set,qe={board:0,worker:0},ft=!1,Rt=ts;try{let f=window.localStorage.getItem(_f);Oi(f)&&(Rt=f)}catch{}let Ft="today";try{let f=window.localStorage.getItem(tv);f!==null&&(Ft=On(f))}catch{}async function L(f){if(!Oi(f)||f===Rt)return;Rt=f;try{window.localStorage.setItem(_f,f)}catch{}let y=ye.get(or);if(!y)return;ye.delete(or),await y().catch(()=>{});let Y=Mt();try{Be.register(or,Y)}catch(ue){t("register %s store failed: %o",or,ue)}try{let ue=await he.subscribeList(or,Y);ye.set(or,ue)}catch(ue){t("re-subscribe %s failed: %o",or,ue),Te(ue,"board")}}async function oe(f){let y=On(f);if(y===Ft)return;Ft=y;let Y=R.get(rr);if(!Y)return;R.delete(rr),await Y().catch(()=>{});let ue=bt();try{Be.register(rr,ue)}catch(Ee){t("register %s store failed: %o",rr,Ee)}try{let Ee=await he.subscribeList(rr,ue);R.set(rr,Ee)}catch(Ee){t("re-subscribe %s failed: %o",rr,Ee),Te(Ee,"worker")}}let R=new Map,Q=null,at=null,Ge=null,st=null,St=null;async function en(){st=null,de.clear(),St=null,ae.clear(),Q=null,at=null,ye.clear(),R.clear(),qe.board+=1,qe.worker+=1,Vt();let f=ve.getState().workspace.current?.path;if(f)try{await _e.send("set-workspace",{path:f})}catch(Y){t("workspace restore after reconnect failed: %o",Y);return}Nt();let y=ve.getState();Ve(y.view==="board"),Ne(y.view==="worker"),rt(ze(y)),Me(y.view==="board"||y.view==="worker"||!!y.selected_id)}async function Wt(){t("clearing all subscriptions for workspace switch"),be(),Ye(),nt(),pt.clear(),Xe(),Ot(),At(),Nt(),dt();let f=ve.getState();if(f.selected_id)try{Be.unregister(`detail:${f.selected_id}`)}catch{}let y=ve.getState();Ve(y.view==="board"),Ne(y.view==="worker"),rt(ze(y)),Me(y.view==="board"||y.view==="worker"||!!y.selected_id),y.selected_id&&U(y.selected_id)}async function zt(f){t("requesting workspace switch to %s",f),z=!0;try{let y=await _e.send("set-workspace",{path:f});t("workspace switch result: %o",y),y&&y.workspace&&(ve.setState({workspace:{current:{path:y.workspace.root_dir,database:y.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",f),y.changed&&(await Wt(),ge("Switched to "+Kt(f),"success",2e3)))}catch(y){throw t("workspace switch failed: %o",y),ge("Failed to switch workspace","error",3e3),y}finally{z=!1}}async function Tt(f){t("requesting workspace git pull for %s",f);try{let y=await _e.send("git-pull-workspace",{});t("workspace git pull result: %o",y);let Y=y?.status;if(Y==="up_to_date"){ge("Already up to date","success",2e3);return}if(Y==="stash_pop_conflict"){ge("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}ge("Git pulled "+Kt(f),"success",2e3)}catch(y){t("workspace git pull failed: %o",y);let Y=y?.code,ue=y?.message;if(Y==="rebase_conflict"){ge("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(Y==="rebase_conflict_abort_failed"){ge("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(Y==="busy"){ge("Git pull skipped: another operation is running","warning",3e3);return}let Ee=ue?`: ${ue}`:"";throw ge(`Git pull failed${Ee}`,"error",3e3),y}}async function mn(f,y){t("setting workspace visibility %s \u2192 %s",f,String(y));try{await _e.send("set-workspace-visibility",{path:f,visible:y}),await kt()}catch(Y){t("workspace visibility update failed: %o",Y),ge("Failed to update project visibility","error",3e3)}}async function kt(){try{let f=await _e.send("list-workspaces",{});if(t("workspaces loaded: %o",f),f&&Array.isArray(f.workspaces)){let y=f.workspaces.map(v=>({path:v.path,database:v.database,pid:v.pid,version:v.version})),Y=f.current?{path:f.current.root_dir,database:f.current.db_path}:null,ue=Array.isArray(f.hidden)?f.hidden.filter(v=>typeof v=="string"):[];ve.setState({workspace:{current:Y,available:y,hidden:ue}});let Ee=window.localStorage.getItem("beads-ui.workspace");Ee&&(!y.some(w=>w.path===Ee)||ue.includes(Ee)?window.localStorage.removeItem("beads-ui.workspace"):Y&&Ee!==Y.path&&(t("restoring saved workspace preference: %s",Ee),await zt(Ee)))}}catch(f){t("failed to load workspaces: %o",f)}}_e.on("workspace-changed",f=>{t("workspace-changed event: %o",f),f&&f.root_dir&&(ve.setState({workspace:{current:{path:f.root_dir,database:f.db_path}}}),kt(),Wt())});let Ht=!1;if(typeof _e.onConnection=="function"){let f=y=>{t("ws state %s",y),y==="reconnecting"||y==="closed"?(Ht=!0,ge("Connection lost. Reconnecting\u2026","error",4e3)):y==="open"&&Ht&&(Ht=!1,ge("Reconnected","success",2200),ev(ve,(Y,ue)=>{t(`${Y}: %o`,ue)}),en())};_e.onConnection(f)}let cn="board";try{let f=window.localStorage.getItem("beads-ui.view");(f==="board"||f==="worker"||f==="monitor")&&(cn=f)}catch(f){t("view parse error: %o",f)}let ve=Yl({config:Jy(),view:cn});_e.on("worker-queue-snapshot",f=>{let y=f;if(!y||!y.queue)return;let Y=ve.getState().workspace.current?.path;if(typeof Y=="string"&&Y.length>0&&y.root_dir!==Y){t("dropping worker-queue snapshot for %s",String(y.root_dir));return}try{pt.set(y.queue)}catch{}});let E=Gl(ve);E.start();let h=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"]),A=async(f,y)=>{try{return await ke(f,y)}catch(Y){if(h.has(f))throw Y;return[]}};lp({global_element:r,repo_element:o},ve,E);let J=document.getElementById("workspace-picker");J&&rf(J,ve,zt,Tt,mn);let Fe=pp(e,(f,y)=>ke(f,y));try{let f=document.getElementById("new-issue-btn");f&&f.addEventListener("click",()=>Fe.open())}catch{}let Le=gp(e,{policyStore:de,queueStore:pt,implPresetStore:ae,transport:(f,y)=>ke(f,y),onOpenChange:f=>{let y=ft;ft=f,xt(),y&&f===!1&&lt.refreshSessionDefaults()},labelOptions:()=>{let f=new Set;for(let[y]of il)for(let Y of Be.snapshotFor(y)||[]){let ue=Y.labels;if(Array.isArray(ue))for(let Ee of ue)typeof Ee=="string"&&Ee.length>0&&f.add(Ee)}return Array.from(f).sort()}});try{let f=document.getElementById("display-settings-btn");f&&(f.setAttribute("aria-label","\uC124\uC815"),f.setAttribute("title","\uC124\uC815"),f.addEventListener("click",()=>Le.open()))}catch{}let Ke=document.createElement("div");Ke.className="md-viewer-root",document.body.appendChild(Ke);let yt=di(Ke,{getWorkspacePath:()=>ve.getState().workspace.current?.path}),_t=dc(l,{gotoIssue:f=>E.gotoIssue(f),issueStores:Be,transport:A,workerQueueStore:pt,uiOrderStore:B,displayPolicyStore:de,closedRange:Rt,onClosedRangeChange:f=>{L(f)},onNewIssue:()=>Fe.open(),openDoc:gt}),lt=rl(a,{transport:A,issueStores:Be,queueStore:pt,sessionLogStore:le,gotoIssue:f=>ve.setState({selected_id:f}),getWorkspacePath:()=>ve.getState().workspace.current?.path,switchWorkspace:f=>zt(f),openDoc:gt,doneRange:Ft,onDoneRangeChange:f=>{oe(f)}}),m=ap(c,{transport:A,pipelineStore:Pe,execPresetStore:ae,sessionLogStore:le,router:E,gotoIssue:f=>E.gotoIssue(f),getWorkspacePath:()=>ve.getState().workspace.current?.path,switchWorkspace:f=>zt(f),openDoc:gt}),b=Rd(d,{issueStores:Be,transport:A,queueStore:pt,execPresetStore:ae,sessionLogStore:le,getWorkspacePath:()=>ve.getState().workspace.current?.path,mdViewer:yt,depCandidates:()=>{let f=Pe.get();if(f===null)return null;let y=Pe.getWorkspacesState(),Y=ve.getState();if(Y.view==="monitor")return ha(f,y);let ue=Y.workspace.current?.path;return ue?ha(f,y,{root_dir:ue}):null},subscribeCandidates:f=>Pe.subscribe(f),onDepChanged:({type:f,a:y,b:Y})=>{let ue=m;f==="dep-add"&&ue&&typeof ue.recorrectSharedLane=="function"&&ue.recorrectSharedLane(f,y,Y)},onNavigate:(f,y)=>{let Y=()=>{ve.getState().view==="worker"?ve.setState({selected_id:f}):E.gotoIssue(f)},ue=ve.getState().workspace.current?.path;if(typeof y!="string"||y.length===0||!ue||y===ue){Y();return}Promise.resolve(zt(y)).then(Y).catch(()=>{ge("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})},onClose:()=>{let f=ve.getState();ve.setState({selected_id:null});try{E.gotoView(f.view==="worker"||f.view==="monitor"?f.view:"board")}catch{}},onOpenExecPresets:()=>{Le.open("execution")}}),T=ve.getState().selected_id;T&&(d.hidden=!1,b.load(T),U(T)),ve.subscribe(f=>{let y=f.selected_id;y?(d.hidden=!1,b.load(y),z||U(y)):(b.clear(),d.hidden=!0,dt())});let D=f=>{l.hidden=f.view!=="board",a.hidden=f.view!=="worker",c.hidden=f.view!=="monitor",s&&s.classList.toggle("is-quiet",f.view==="monitor"),Ve(f.view==="board"),Ne(f.view==="worker"),rt(ze(f)),Me(f.view==="board"||f.view==="worker"||ft||!!f.selected_id),!f.selected_id&&f.view==="board"&&_t.load(),f.view==="worker"&&lt.load(),f.view==="monitor"?m.load():m.pause(),window.localStorage.setItem("beads-ui.view",f.view)};ve.subscribe(D),D(ve.getState()),Ot(),Nt(),Vt(),kt().finally(()=>{re=!0,He()}),window.addEventListener("keydown",f=>{let y=f.ctrlKey||f.metaKey,Y=String(f.key||"").toLowerCase(),ue=f.target,Ee=ue&&ue.tagName?String(ue.tagName).toLowerCase():"",v=Ee==="input"||Ee==="textarea"||Ee==="select"||ue&&typeof ue.isContentEditable=="boolean"&&ue.isContentEditable;y&&Y==="n"&&(v||(f.preventDefault(),Fe.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,o=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",o);let s=document.getElementById("theme-switch");s&&(s.checked=o==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&ov(t)});export{ov as bootstrap,Jy as readBootstrapConfig,ev as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
