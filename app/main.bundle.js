var pm=Object.create;var Ta=Object.defineProperty;var fm=Object.getOwnPropertyDescriptor;var _m=Object.getOwnPropertyNames;var mm=Object.getPrototypeOf,gm=Object.prototype.hasOwnProperty;var hm=(e,t,n)=>t in e?Ta(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Ca=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var bm=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of _m(t))!gm.call(e,o)&&o!==n&&Ta(e,o,{get:()=>t[o],enumerable:!(r=fm(t,o))||r.enumerable});return e};var ym=(e,t,n)=>(n=e!=null?pm(mm(e)):{},bm(t||!e||!e.__esModule?Ta(n,"default",{value:e,enumerable:!0}):n,e));var qt=(e,t,n)=>hm(e,typeof t!="symbol"?t+"":t,n);var Fc=Ca((Qw,jc)=>{var oo=1e3,so=oo*60,io=so*60,jr=io*24,wm=jr*7,$m=jr*365.25;jc.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return xm(e);if(n==="number"&&isFinite(e))return t.long?Sm(e):Am(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function xm(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*$m;case"weeks":case"week":case"w":return n*wm;case"days":case"day":case"d":return n*jr;case"hours":case"hour":case"hrs":case"hr":case"h":return n*io;case"minutes":case"minute":case"mins":case"min":case"m":return n*so;case"seconds":case"second":case"secs":case"sec":case"s":return n*oo;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function Am(e){var t=Math.abs(e);return t>=jr?Math.round(e/jr)+"d":t>=io?Math.round(e/io)+"h":t>=so?Math.round(e/so)+"m":t>=oo?Math.round(e/oo)+"s":e+"ms"}function Sm(e){var t=Math.abs(e);return t>=jr?Vs(e,t,jr,"day"):t>=io?Vs(e,t,io,"hour"):t>=so?Vs(e,t,so,"minute"):t>=oo?Vs(e,t,oo,"second"):e+" ms"}function Vs(e,t,n,r){var o=t>=n*1.5;return Math.round(e/n)+" "+r+(o?"s":"")}});var Uc=Ca((Xw,Bc)=>{function Em(e){n.debug=n,n.default=n,n.coerce=a,n.disable=s,n.enable=o,n.enabled=l,n.humanize=Fc(),n.destroy=u,Object.keys(e).forEach(d=>{n[d]=e[d]}),n.names=[],n.skips=[],n.formatters={};function t(d){let m=0;for(let b=0;b<d.length;b++)m=(m<<5)-m+d.charCodeAt(b),m|=0;return n.colors[Math.abs(m)%n.colors.length]}n.selectColor=t;function n(d){let m,b=null,h,k;function S(...T){if(!S.enabled)return;let ee=S,re=Number(new Date),U=re-(m||re);ee.diff=U,ee.prev=m,ee.curr=re,m=re,T[0]=n.coerce(T[0]),typeof T[0]!="string"&&T.unshift("%O");let L=0;T[0]=T[0].replace(/%([a-zA-Z%])/g,(P,q)=>{if(P==="%%")return"%";L++;let W=n.formatters[q];if(typeof W=="function"){let F=T[L];P=W.call(ee,F),T.splice(L,1),L--}return P}),n.formatArgs.call(ee,T),(ee.log||n.log).apply(ee,T)}return S.namespace=d,S.useColors=n.useColors(),S.color=n.selectColor(d),S.extend=r,S.destroy=n.destroy,Object.defineProperty(S,"enabled",{enumerable:!0,configurable:!1,get:()=>b!==null?b:(h!==n.namespaces&&(h=n.namespaces,k=n.enabled(d)),k),set:T=>{b=T}}),typeof n.init=="function"&&n.init(S),S}function r(d,m){let b=n(this.namespace+(typeof m>"u"?":":m)+d);return b.log=this.log,b}function o(d){n.save(d),n.namespaces=d,n.names=[],n.skips=[];let m=(typeof d=="string"?d:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let b of m)b[0]==="-"?n.skips.push(b.slice(1)):n.names.push(b)}function i(d,m){let b=0,h=0,k=-1,S=0;for(;b<d.length;)if(h<m.length&&(m[h]===d[b]||m[h]==="*"))m[h]==="*"?(k=h,S=b,h++):(b++,h++);else if(k!==-1)h=k+1,S++,b=S;else return!1;for(;h<m.length&&m[h]==="*";)h++;return h===m.length}function s(){let d=[...n.names,...n.skips.map(m=>"-"+m)].join(",");return n.enable(""),d}function l(d){for(let m of n.skips)if(i(d,m))return!1;for(let m of n.names)if(i(d,m))return!0;return!1}function a(d){return d instanceof Error?d.stack||d.message:d}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}Bc.exports=Em});var Wc=Ca((Sn,Qs)=>{Sn.formatArgs=Cm;Sn.save=Rm;Sn.load=Om;Sn.useColors=Tm;Sn.storage=Im();Sn.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();Sn.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Tm(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Cm(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+Qs.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,o=>{o!=="%%"&&(n++,o==="%c"&&(r=n))}),e.splice(r,0,t)}Sn.log=console.debug||console.log||(()=>{});function Rm(e){try{e?Sn.storage.setItem("debug",e):Sn.storage.removeItem("debug")}catch{}}function Om(){let e;try{e=Sn.storage.getItem("debug")||Sn.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function Im(){try{return localStorage}catch{}}Qs.exports=Uc()(Sn);var{formatters:Lm}=Qs.exports;Lm.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var No=globalThis,Us=No.trustedTypes,$c=Us?Us.createPolicy("lit-html",{createHTML:e=>e}):void 0,Oa="$lit$",nr=`lit$${Math.random().toFixed(9).slice(2)}$`,Ia="?"+nr,vm=`<${Ia}>`,Pr=document,jo=()=>Pr.createComment(""),Fo=e=>e===null||typeof e!="object"&&typeof e!="function",La=Array.isArray,Cc=e=>La(e)||typeof e?.[Symbol.iterator]=="function",Ra=`[ 	
\f\r]`,qo=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,xc=/-->/g,Ac=/>/g,Lr=RegExp(`>|${Ra}(?:([^\\s"'>=/]+)(${Ra}*=${Ra}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Sc=/'/g,Ec=/"/g,Rc=/^(?:script|style|textarea|title)$/i,Da=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),c=Da(1),Uo=Da(2),Ww=Da(3),In=Symbol.for("lit-noChange"),Ht=Symbol.for("lit-nothing"),Tc=new WeakMap,Dr=Pr.createTreeWalker(Pr,129);function Oc(e,t){if(!La(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return $c!==void 0?$c.createHTML(t):t}var Ic=(e,t)=>{let n=e.length-1,r=[],o,i=t===2?"<svg>":t===3?"<math>":"",s=qo;for(let l=0;l<n;l++){let a=e[l],u,d,m=-1,b=0;for(;b<a.length&&(s.lastIndex=b,d=s.exec(a),d!==null);)b=s.lastIndex,s===qo?d[1]==="!--"?s=xc:d[1]!==void 0?s=Ac:d[2]!==void 0?(Rc.test(d[2])&&(o=RegExp("</"+d[2],"g")),s=Lr):d[3]!==void 0&&(s=Lr):s===Lr?d[0]===">"?(s=o??qo,m=-1):d[1]===void 0?m=-2:(m=s.lastIndex-d[2].length,u=d[1],s=d[3]===void 0?Lr:d[3]==='"'?Ec:Sc):s===Ec||s===Sc?s=Lr:s===xc||s===Ac?s=qo:(s=Lr,o=void 0);let h=s===Lr&&e[l+1].startsWith("/>")?" ":"";i+=s===qo?a+vm:m>=0?(r.push(u),a.slice(0,m)+Oa+a.slice(m)+nr+h):a+nr+(m===-2?l:h)}return[Oc(e,i+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},Bo=class e{constructor({strings:t,_$litType$:n},r){let o;this.parts=[];let i=0,s=0,l=t.length-1,a=this.parts,[u,d]=Ic(t,n);if(this.el=e.createElement(u,r),Dr.currentNode=this.el.content,n===2||n===3){let m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(o=Dr.nextNode())!==null&&a.length<l;){if(o.nodeType===1){if(o.hasAttributes())for(let m of o.getAttributeNames())if(m.endsWith(Oa)){let b=d[s++],h=o.getAttribute(m).split(nr),k=/([.?@])?(.*)/.exec(b);a.push({type:1,index:i,name:k[2],strings:h,ctor:k[1]==="."?zs:k[1]==="?"?Hs:k[1]==="@"?Ks:qr}),o.removeAttribute(m)}else m.startsWith(nr)&&(a.push({type:6,index:i}),o.removeAttribute(m));if(Rc.test(o.tagName)){let m=o.textContent.split(nr),b=m.length-1;if(b>0){o.textContent=Us?Us.emptyScript:"";for(let h=0;h<b;h++)o.append(m[h],jo()),Dr.nextNode(),a.push({type:2,index:++i});o.append(m[b],jo())}}}else if(o.nodeType===8)if(o.data===Ia)a.push({type:2,index:i});else{let m=-1;for(;(m=o.data.indexOf(nr,m+1))!==-1;)a.push({type:7,index:i}),m+=nr.length-1}i++}}static createElement(t,n){let r=Pr.createElement("template");return r.innerHTML=t,r}};function Mr(e,t,n=e,r){if(t===In)return t;let o=r!==void 0?n._$Co?.[r]:n._$Cl,i=Fo(t)?void 0:t._$litDirective$;return o?.constructor!==i&&(o?._$AO?.(!1),i===void 0?o=void 0:(o=new i(e),o._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=o:n._$Cl=o),o!==void 0&&(t=Mr(e,o._$AS(e,t.values),o,r)),t}var Ws=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,o=(t?.creationScope??Pr).importNode(n,!0);Dr.currentNode=o;let i=Dr.nextNode(),s=0,l=0,a=r[0];for(;a!==void 0;){if(s===a.index){let u;a.type===2?u=new no(i,i.nextSibling,this,t):a.type===1?u=new a.ctor(i,a.name,a.strings,this,t):a.type===6&&(u=new Gs(i,this,t)),this._$AV.push(u),a=r[++l]}s!==a?.index&&(i=Dr.nextNode(),s++)}return Dr.currentNode=Pr,o}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},no=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,o){this.type=2,this._$AH=Ht,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=Mr(this,t,n),Fo(t)?t===Ht||t==null||t===""?(this._$AH!==Ht&&this._$AR(),this._$AH=Ht):t!==this._$AH&&t!==In&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Cc(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Ht&&Fo(this._$AH)?this._$AA.nextSibling.data=t:this.T(Pr.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,o=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=Bo.createElement(Oc(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===o)this._$AH.p(n);else{let i=new Ws(o,this),s=i.u(this.options);i.p(n),this.T(s),this._$AH=i}}_$AC(t){let n=Tc.get(t.strings);return n===void 0&&Tc.set(t.strings,n=new Bo(t)),n}k(t){La(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,o=0;for(let i of t)o===n.length?n.push(r=new e(this.O(jo()),this.O(jo()),this,this.options)):r=n[o],r._$AI(i),o++;o<n.length&&(this._$AR(r&&r._$AB.nextSibling,o),n.length=o)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},qr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,o,i){this.type=1,this._$AH=Ht,this._$AN=void 0,this.element=t,this.name=n,this._$AM=o,this.options=i,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=Ht}_$AI(t,n=this,r,o){let i=this.strings,s=!1;if(i===void 0)t=Mr(this,t,n,0),s=!Fo(t)||t!==this._$AH&&t!==In,s&&(this._$AH=t);else{let l=t,a,u;for(t=i[0],a=0;a<i.length-1;a++)u=Mr(this,l[r+a],n,a),u===In&&(u=this._$AH[a]),s||(s=!Fo(u)||u!==this._$AH[a]),u===Ht?t=Ht:t!==Ht&&(t+=(u??"")+i[a+1]),this._$AH[a]=u}s&&!o&&this.j(t)}j(t){t===Ht?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},zs=class extends qr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Ht?void 0:t}},Hs=class extends qr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Ht)}},Ks=class extends qr{constructor(t,n,r,o,i){super(t,n,r,o,i),this.type=5}_$AI(t,n=this){if((t=Mr(this,t,n,0)??Ht)===In)return;let r=this._$AH,o=t===Ht&&r!==Ht||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,i=t!==Ht&&(r===Ht||o);o&&this.element.removeEventListener(this.name,this,r),i&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Gs=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){Mr(this,t)}},Lc={M:Oa,P:nr,A:Ia,C:1,L:Ic,R:Ws,D:Cc,V:Mr,I:no,H:qr,N:Hs,U:Ks,B:zs,F:Gs},km=No.litHtmlPolyfillSupport;km?.(Bo,no),(No.litHtmlVersions??(No.litHtmlVersions=[])).push("3.3.1");var ft=(e,t,n)=>{let r=n?.renderBefore??t,o=r._$litPart$;if(o===void 0){let i=n?.renderBefore??null;r._$litPart$=o=new no(t.insertBefore(jo(),i),i,void 0,n??{})}return o._$AI(e),o};var Ys="today",Dc=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}],ro=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"}];function Kn(e){return e==="today"?"today":"7d"}function Pa(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function Nr(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function Pc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Mc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function qc(){let e=null,t=[],n,r=new Set;function o(){for(let i of Array.from(r))try{i()}catch{}}return{get(){return e},getWorkspacesState(){return t},crossLanes(){return n},set(i,s,l){e=Array.isArray(i)?i:null,t=Array.isArray(s)?s:[],n=l===void 0?void 0:l!==null&&typeof l=="object"&&typeof l.revision=="number"&&Array.isArray(l.lanes)?{revision:l.revision,lanes:l.lanes}:null,o()},clear(){e=null,t=[],n=void 0,o()},subscribe(i){return r.add(i),()=>r.delete(i)}}}function Nc(){let e=new Map,t=new Set;function n(o){return o.startsWith("session-log:")?o:`session-log:${o}`}function r(){for(let o of Array.from(t))try{o()}catch{}}return{set(o,i,s=null){e.set(n(o),{lines:Array.isArray(i)?[...i]:[],last_event_at:typeof s=="number"?s:null}),r()},append(o,i){let s=n(o),l=e.get(s)||{lines:[],last_event_at:null};l.lines=[...l.lines,i],l.last_event_at=Date.now(),e.set(s,l),r()},get(o){return e.get(n(o))||null},clear(o){typeof o=="string"?e.delete(n(o)):e.clear(),r()},subscribe(o){return t.add(o),()=>t.delete(o)}}}var zc=ym(Wc(),1);function Bt(e){return(0,zc.default)(`beads-ui:${e}`)}function Dm(e){let n=Hc((e&&typeof e=="object"?e:{}).spec_id);return n?{path:n,source:"native",conflict:!1}:{path:"",source:"none",conflict:!1}}function Hc(e){return typeof e=="string"?e.trim():""}function Pm(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}var Mm=/^[A-Za-z0-9_.:-]+@[0-9a-fA-F]{40}$/;function ao(e){let t=Dm(e),n=Hc(Pm(e).spec_review),r=Mm.test(n),o=r&&n.slice(0,n.indexOf("@"))==="skipped";return t.source==="none"?{...t,evidence:"none",skipped:o}:{...t,evidence:r?"published":"draft",skipped:o}}function Pn(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Wo(e,t){let n=Pn(e.created_at),r=Pn(t.created_at);if(n!==r)return n<r?1:-1;let o=e.priority??2,i=t.priority??2;if(o!==i)return o-i;let s=e.id,l=t.id;return s<l?-1:s>l?1:0}function Xc(e,t){let n=Pn(e.created_at),r=Pn(t.created_at);if(n!==r)return n<r?-1:1;let o=e.priority??2,i=t.priority??2;if(o!==i)return o-i;let s=e.id,l=t.id;return s<l?-1:s>l?1:0}function Zc(e,t){let n=Pn(e.updated_at),r=Pn(t.updated_at);if(n!==r)return n<r?1:-1;let o=e.id,i=t.id;return o<i?-1:o>i?1:0}function Jc(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let o=Pn(e.created_at),i=Pn(t.created_at);if(o!==i)return o<i?1:-1;let s=e.id,l=t.id;return s<l?-1:s>l?1:0}function eu(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let o=e?.id,i=t?.id;return o<i?-1:o>i?1:0}var Xs=Object.freeze({priority:"asc",dependents:"desc",released:"desc",spec:"desc",created:"asc",updated:"desc"});function qm(e){return typeof e=="string"&&Object.prototype.hasOwnProperty.call(Xs,e)}function qa(e){if(!e||typeof e!="object")return!1;let t=e;return qm(t.key)&&(t.dir==="asc"||t.dir==="desc")}function Kc(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function Gc(e,t){switch(t){case"priority":{let n=e.priority;return typeof n=="number"&&Number.isFinite(n)?n:null}case"dependents":{let n=e.dependents_info?e.dependents_info.count:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"released":{let n=e.release_info?e.release_info.last_released_at:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"spec":return ao(e).evidence==="published"?1:0;case"created":return Kc(e.created_at);case"updated":return Kc(e.updated_at);default:return null}}function Yc(e,t,n){let r=Gc(e,n.key),o=Gc(t,n.key);if(r===null||o===null)return r===o?0:r===null?1:-1;if(r===o)return 0;let i=r<o?-1:1;return n.dir==="desc"?-i:i}function tu(e){let t=Array.isArray(e)?e.filter(qa):[];return(n,r)=>{for(let l of t){let a=Yc(n,r,l);if(a!==0)return a}let o=Yc(n,r,{key:"created",dir:"asc"});if(o!==0)return o;let i=n.id,s=r.id;return i<s?-1:i>s?1:0}}var Nm=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Vc(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Qc(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=Nm.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function nu(e,t){let n=Vc(e),r=Vc(t);if(n!==r)return n<r?-1:1;let o=Qc(e),i=Qc(t);if(o!==i)return o<i?-1:1;let s=Pn(e&&e.created_at),l=Pn(t&&t.created_at);if(s!==l)return s<l?-1:1;let a=e&&e.id,u=t&&t.id;return a===u?0:String(a)<String(u)?-1:1}var Ma=2**20;function lo(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-Pn(e&&e.created_at)}function ru(e){return(t,n)=>{let r=lo(t,e),o=lo(n,e);if(r!==o)return r<o?-1:1;let i=t?.id,s=n?.id;return i<s?-1:i>s?1:0}}function Na(e,t,n){let r=Array.isArray(e)?e:[],o=r.length,i=Math.max(0,Math.min(t,o-1)),s=i-1>=0?r[i-1]:null,l=i+1<o?r[i+1]:null;if(!s&&!l)return{rank:0};if(!s)return{rank:lo(l,n)-Ma};if(!l)return{rank:lo(s,n)+Ma};let a=lo(s,n),u=lo(l,n),d=(a+u)/2;return a<d&&d<u?{rank:d}:{renormalize:r.map((m,b)=>({bead_id:m.id,rank:b*Ma}))}}function ja(e,t={}){let n=Bt(`issue-store:${e}`),r=new Map,o=[],i=0,s=new Set,l=!1,a=t.sort||Wo;function u(){for(let b of Array.from(s))try{b()}catch{}}function d(){o=Array.from(r.values()).sort(a)}function m(b){if(l||!b||b.id!==e)return;let h=Number(b.revision)||0;if(n("apply %s rev=%d",b.type,h),!(h<=i&&b.type!=="snapshot")){if(b.type==="snapshot"){if(h<=i)return;r.clear();let k=Array.isArray(b.issues)?b.issues:[];for(let S of k)S&&typeof S.id=="string"&&S.id.length>0&&r.set(S.id,S);d(),i=h,u();return}if(b.type==="upsert"){let k=b.issue;if(k&&typeof k.id=="string"&&k.id.length>0){let S=r.get(k.id);if(!S)r.set(k.id,k);else{let T=Number.isFinite(S.updated_at)?S.updated_at:0,ee=Number.isFinite(k.updated_at)?k.updated_at:0;if(T<=ee){for(let re of Object.keys(S))re in k||delete S[re];for(let[re,U]of Object.entries(k))S[re]=U}}d()}i=h,u()}else if(b.type==="delete"){let k=String(b.issue_id||"");k&&(r.delete(k),d()),i=h,u()}}}return{id:e,subscribe(b){return s.add(b),()=>{s.delete(b)}},applyPush:m,snapshot(){return o},size(){return r.size},getById(b){return r.get(b)},dispose(){l=!0,r.clear(),o=[],s.clear(),i=0}}}function Zs(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let o=Object.keys(e.params).sort();for(let i of o){let s=e.params[i];n[i]=String(s)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function ou(e){let t=Bt("subs"),n=new Map,r=new Map;function o(l,a){t("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let u=r.get(l);if(!u||u.size===0)return;let d=Array.isArray(a.added)?a.added:[],m=Array.isArray(a.updated)?a.updated:[],b=Array.isArray(a.removed)?a.removed:[];for(let h of Array.from(u)){let k=n.get(h);if(!k)continue;let S=k.itemsById;for(let T of d)typeof T=="string"&&T.length>0&&S.set(T,!0);for(let T of m)typeof T=="string"&&T.length>0&&S.set(T,!0);for(let T of b)typeof T=="string"&&T.length>0&&S.delete(T)}}async function i(l,a){let u=Zs(a);if(t("subscribe %s key=%s",l,u),!n.has(l))n.set(l,{key:u,itemsById:new Map});else{let m=n.get(l);if(m&&m.key!==u){let b=r.get(m.key);b&&(b.delete(l),b.size===0&&r.delete(m.key)),n.set(l,{key:u,itemsById:new Map})}}r.has(u)||r.set(u,new Set);let d=r.get(u);d&&d.add(l);try{await e("subscribe-list",{id:l,type:a.type,params:a.params})}catch(m){let b=n.get(l)||null;if(b){let h=r.get(b.key);h&&(h.delete(l),h.size===0&&r.delete(b.key))}throw n.delete(l),m}return async()=>{t("unsubscribe %s key=%s",l,u);try{await e("unsubscribe-list",{id:l})}catch{}let m=n.get(l)||null;if(m){let b=r.get(m.key);b&&(b.delete(l),b.size===0&&r.delete(m.key))}n.delete(l)}}return{subscribeList:i,_applyDelta:o,_subKeyOf:Zs,selectors:{getIds(l){let a=n.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let u=n.get(l);return u?u.itemsById.has(a):!1},count(l){let a=n.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=n.get(l),u={};if(!a)return u;for(let d of a.itemsById.keys())u[d]=!0;return u}}}}function su(){let e=Bt("issue-stores"),t=new Map,n=new Map,r=new Set,o=new Map;function i(){for(let a of Array.from(r))try{a()}catch{}}function s(a,u,d){let m=u?Zs(u):"",b=n.get(a)||"",h=t.has(a);if(e("register %s key=%s (prev=%s)",a,m,b),h&&b&&m&&b!==m){let k=t.get(a);if(k)try{k.dispose()}catch{}let S=o.get(a);if(S){try{S()}catch{}o.delete(a)}let T=ja(a,d);t.set(a,T);let ee=T.subscribe(()=>i());o.set(a,ee)}else if(!h){let k=ja(a,d);t.set(a,k);let S=k.subscribe(()=>i());o.set(a,S)}return n.set(a,m),()=>l(a)}function l(a){e("unregister %s",a),n.delete(a);let u=t.get(a);u&&(u.dispose(),t.delete(a));let d=o.get(a);if(d){try{d()}catch{}o.delete(a)}}return{register:s,unregister:l,getStore(a){return t.get(a)||null},snapshotFor(a){let u=t.get(a);return u?u.snapshot().slice():[]},subscribe(a){return r.add(a),()=>r.delete(a)}}}function iu(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function au(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Fa(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function jm(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),o=r>=0?n.slice(r+1):"";if(o){let l=new URLSearchParams(o).get("issue");if(l)return decodeURIComponent(l)}let i=/^\/issue\/([^\s?#]+)/.exec(n);return i&&i[1]?decodeURIComponent(i[1]):null}function Fm(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function lu(e){let t=Bt("router"),n=()=>{let r=window.location.hash||"",o=/^#\/issue\/([^\s?#]+)/.exec(r),i=o&&o[1]?decodeURIComponent(o[1]):jm(r),s=Fm(r);if(t("hash change \u2192 view=%s id=%s",s,i),e.setState({selected_id:s==="worker"?null:i,view:s,worker:{selected_parent_id:s==="worker"?i:null}}),!!o||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let a=i?`#/${s}?issue=${encodeURIComponent(i)}`:`#/${s}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let o=e.getState?e.getState():{view:"board"},i=o.view==="worker"||o.view==="monitor"?o.view:"board",s=Fa(i,r);t("goto issue %s (view=%s)",r,i),window.location.hash!==s?window.location.hash=s:e.setState({selected_id:i==="worker"?null:r,view:i,worker:{selected_parent_id:i==="worker"?r:null}})},gotoView(r){let o=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},i=r==="worker"?o.worker?.selected_parent_id:o.selected_id,s=i?Fa(r,i):`#/${r}`;t("goto view %s (id=%s)",r,i||""),window.location.hash!==s?window.location.hash=s:e.setState({view:r,selected_id:r==="worker"?null:o.selected_id})}}}var Bm=Object.freeze({workspace_config:{default_workspace:null}});function cu(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:Bm.workspace_config.default_workspace}}}function uu(e={}){let t=Bt("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:cu(e.config)},r=new Set;function o(){for(let i of Array.from(r))try{i(n)}catch{}}return{getState(){return n},setState(i){let s={...n,...i,filters:{...n.filters,...i.filters||{}},board:{...n.board,...i.board||{}},worker:{...n.worker,...i.worker||{}},workspace:{current:i.workspace?.current!==void 0?i.workspace.current:n.workspace.current,available:i.workspace?.available!==void 0?i.workspace.available:n.workspace.available,hidden:i.workspace?.hidden!==void 0?i.workspace.hidden:n.workspace.hidden},config:i.config!==void 0?cu(i.config):n.config},l=s.workspace.current?.path!==n.workspace.current?.path||s.workspace.available.length!==n.workspace.available.length||s.workspace.hidden.length!==n.workspace.hidden.length||s.workspace.hidden.some((u,d)=>u!==n.workspace.hidden[d]),a=s.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;s.selected_id===n.selected_id&&s.view===n.view&&s.filters.status===n.filters.status&&s.filters.search===n.filters.search&&s.filters.type===n.filters.type&&s.board.closed_filter===n.board.closed_filter&&s.worker.selected_parent_id===n.worker.selected_parent_id&&s.worker.show_closed_children.length===n.worker.show_closed_children.length&&s.worker.show_closed_children.every((u,d)=>u===n.worker.show_closed_children[d])&&!l&&!a||(n=s,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),o())},subscribe(i){return r.add(i),()=>r.delete(i)}}}function du(e){let t=Bt("activity"),n=0,r=new Map,o=1;function i(){if(!e)return;let u=n>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function s(){n+=1,t("start count=%d",n),i()}function l(){let u=n;n=Math.max(0,n-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,n),i()}function a(u){return async(m,b)=>{let h=o++,k=Date.now();r.set(h,{type:m,start_ts:k}),t("request start id=%d type=%s count=%d",h,m,n+1),s();let S=!1,T=()=>{S||(S=!0,r.delete(h),l())},ee=setTimeout(()=>{S||(t("request TIMEOUT id=%d type=%s elapsed=%dms",h,m,Date.now()-k),T())},3e4);try{let re=await u(m,b),U=Date.now()-k;return t("request done id=%d type=%s elapsed=%dms",h,m,U),re}catch(re){let U=Date.now()-k;throw t("request error id=%d type=%s elapsed=%dms err=%o",h,m,U,re),re}finally{clearTimeout(ee),T()}}}return i(),{wrapSend:a,start:s,done:l,getCount:()=>n,getActiveRequests:()=>{let u=Date.now();return Array.from(r.entries()).map(([d,m])=>({id:d,type:m.type,elapsed_ms:u-m.start_ts}))}}}function _e(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}function co(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let i=t.get();return i&&i.order?i.order:{}}function r(i,s,l){let a=e&&e.snapshotFor?e.snapshotFor(i).slice():[];if(s==="closed")return a.sort(eu),a;switch(l){case"created_desc":return a.sort(Wo),a;case"created_asc":return a.sort(Xc),a;case"updated_desc":return a.sort(Zc),a;case"priority":return a.sort(Jc),a;case"manual":default:{let u=n();return u?a.sort(ru(u)):a.sort(Wo),a}}}function o(i){let s=[];return e&&typeof e.subscribe=="function"&&s.push(e.subscribe(i)),t&&typeof t.subscribe=="function"&&s.push(t.subscribe(i)),()=>{for(let l of s)try{l()}catch{}}}return{selectBoardColumn:r,subscribe:o}}function _r(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function ln(e){let t=_r(e);if(t===null)return"";let n=new Date(t),r=o=>String(o).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function bn(e,t){let n=_r(e);if(n===null)return"";let o=(typeof t=="number"?t:Date.now())-n;if(o<6e4)return"\uBC29\uAE08";let i=Math.floor(o/6e4);if(i<60)return`${i}\uBD84 \uC804`;let s=Math.floor(o/36e5);if(s<24)return`${s}\uC2DC\uAC04 \uC804`;let l=Math.floor(o/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let u=Math.floor(l/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function pu(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let o=_r(r.updated_at)??0;if(t===null||o>n){t=r,n=o;continue}o===n&&String(r.id)<String(t.id)&&(t=r)}return t}function Js(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function ei(e){let t=new Map;for(let r of e)r&&r.id&&!t.has(r.id)&&t.set(r.id,r);let n=new Map;for(let r of t.values()){let o=Js(r);if(!o)continue;let i=n.get(o);i||(i=[],n.set(o,i)),i.push({id:r.id,title:r.title,status:r.status,metadata:r.metadata,workflow:r.workflow,created_at:r.created_at,updated_at:r.updated_at})}return n}function ti(e,t){let n=e.get(t)||[],r=0;for(let i of n)(i.status==="resolved"||i.status==="closed")&&(r+=1);let o=pu(n);return{total:n.length,count:r,current:o,children:n}}function fu(e){let t=e.transport,n=e.uiOrderStore;function r(s,l){return"renormalize"in s?s.renormalize:[{bead_id:l,rank:s.rank}]}function o(s,l){let a={...s.order};for(let u of l)a[u.bead_id]=u.rank;n&&n.set({revision:s.revision,order:a})}async function i(s,l,a){if(!t||!n)return;let u=n.get()||{revision:0,order:{}},d=r(Na(l,a,u.order),s);o(u,d);let m=await t("ui-order-set",{expected_revision:u.revision,entries:d});if(m&&m.conflict){let b={revision:typeof m.revision=="number"?m.revision:0,order:m.order||{}};n.set(b);let h=r(Na(l,a,b.order),s);o(b,h);let k=await t("ui-order-set",{expected_revision:b.revision,entries:h});k&&k.applied&&n.set({revision:typeof k.revision=="number"?k.revision:0,order:k.order||{}})}else m&&m.applied&&n.set({revision:typeof m.revision=="number"?m.revision:0,order:m.order||{}})}return{applyReorder:i}}function _u(e){if(typeof e!="string")return"";let t=e.indexOf("-");return t>0?e.slice(0,t):""}function Gn(e,t){let n=_u(e),r=_u(t);return n.length===0||r.length===0?!1:n!==r}function ni(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Ba(e,t){return!t||typeof e!="string"||e.length===0||ni(t.visible_labels).includes(e)?!0:ni(t.hidden_labels).includes(e)?!1:!ni(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function mu(e,t){return ni(e).filter(n=>Ba(n,t))}function mr(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}function Um(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function Wm(e,t,n,r,o){return c`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${r?"true":"false"}
    @click=${o}
  >
    children ${t}/${n} ${r?"\u25B4":"\u25BE"}
  </button>`}function zm(e,t,n,r){return c`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${r?o=>r(o,e.id):void 0}
  >
    <span class=${Um(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${n}
  </button>`}function ri(e,t){let n=e.total||0,r=!!t.expanded,o=t.trailing??"",i=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(n===0&&i===null)return"";let s=Array.isArray(e.children)?e.children:[],l=n>0?s.slice().sort(nu):s;return c`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?Wm(t.parent_id,e.count,n,r,t.onToggle):c`<span class="board-card__roll-none">${i}</span>`}
        ${o}
      </div>
      ${n>0&&e.current?c`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${r&&n>0?c`<div class="board-card__roll-list">
            ${l.map((a,u)=>zm(a,u+1,t.childChips?t.childChips(a):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var Hm={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},hu={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},gu={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},Km={review:"\u2713",skip:"\u2298"},gr={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function Gm(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let o of e){let i=t[o];if(i&&i.fill==="dim"&&i.stale!==!0)return o}return null}function bu(e){let t=e&&e.fill||"none";return t==="none"?gr.none:e&&e.stale===!0?gr.stale:t==="dim"?gr.dim:e&&e.glyph==="review"?gr.review:e&&e.glyph==="skip"?gr.skip:gr.done}function Ym(e){if(!e||e.fill==="none"||!e.approval_state)return bu(e);let t=[];return e.glyph==="review"?t.push(gr.review):e.glyph==="skip"&&t.push(gr.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function Vm(e,t,n,r){let o=Hm[e]||e,i=t&&t.fill||"none",s=!!t&&t.stale===!0,l=Km[t&&t.glyph||""]||"",a="bar";i==="dim"?a+=` b-${o} dim`:i==="full"&&(a+=` b-${o} full`),s&&(a+=" stale"),n&&(a+=" cur");let u=i==="none"?"lbl":`lbl l-${o} on`,d=n?`color: var(--stage-${o}-on)`:"",m=hu[e]||e,b=r?yu(t):null;if(!b)return c`
      <div class="seg">
        <div class=${a} style=${d}>${l}</div>
        <div class=${u}>${m}</div>
      </div>
    `;let h=`${m} \uBB38\uC11C \uC5F4\uAE30 \xB7 ${b.path}`;return c`
    <button
      type="button"
      class="seg seg--doc"
      aria-label=${h}
      title=${h}
      @click=${k=>{k.preventDefault(),k.stopPropagation(),r(k,b,e)}}
    >
      <div class=${a} style=${d}>${l}</div>
      <div class=${u}>${m}</div>
    </button>
  `}function yu(e){let t=e?e.doc:null;return!t||typeof t.path!="string"||t.path.length===0?null:t}function oi(e,t,n={}){if(!e||!e.stages)return"";let r=n.onOpenDoc,o=gu[e.route]||gu.spec_backed,i=e.stages,s=Gm(o,i,String(t||"open")),l=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${o.map(u=>`${hu[u]||u} ${u==="plan"?Ym(i[u]||{}):bu(i[u]||{})}`).join(" \xB7 ")}`,a=!!r&&o.some(u=>yu(i[u]||{})!==null);return c`
    <div
      class="stp"
      role=${a?"group":"img"}
      aria-label=${l}
    >
      ${o.map(u=>Vm(u,i[u]||{},u===s,r))}
    </div>
  `}function Qm(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var vu=2;function ku(e){let t=e.slice(0,vu).join(", "),n=e.length-vu;return`\u26D3 blocked: ${t}${n>0?` +${n}`:""}`}function Xm(e,t){if(!t)return[];let n=[],r=Array.isArray(t.blockers)?t.blockers:[],o=[],i=[];for(let s of r)(Gn(e,s)?i:o).push(s);return o.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-dep"
        >${ku(o)}</span
      >`),i.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-foreign"
        >${ku(i)}</span
      >`),n}function Zm(e){if(!e||typeof e!="object")return null;let t=e.awaiting_user;if(typeof t!="string")return null;let n=t.trim();return n.length===0?null:c`<span class="ctl-chip ctl-chip--blocked"
    >${`\u23F8 \uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694: ${n}`}</span
  >`}function Ua(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function si(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function rr(e){return`${e.kind}:${si(e)}@${e.sha}`}function ii(e,t){if(!e)return null;let n=Ua(e.kind),r=e.reason,o=e.kind==="delegated"?r===null:typeof r=="string"&&r.trim().length>0&&!/[\r\n]/.test(r);if(!n||!o)return null;let i=Ua(t?.kind),s=i!==null&&t?.kind!==e.kind,l=`\uACC4\uD68D \xB7 ${n}${s?` \u2192 ${i}`:""}`,a=`planned_execution ${e.kind}${typeof r=="string"?`:${r}`:""}`,u=t?` \xB7 exec_receipt ${rr(t)}`:"";return{kind:e.kind,label:l,title:`${a}${u}`}}function wu(e,t){let n=ii(e,t);return n?c`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${n.kind}
        title=${n.title}
        >${n.label}</span
      >`:null}function Jm(e){if(!e)return null;let t=Ua(e.kind);return t?c`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${rr(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function eg(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},o=[];if(r.route&&mr(n,"route")){let l=r.route_source==="derived";o.push(c`<span
        class="ctl-chip ctl-chip--route${l?" is-derived":""}"
        title=${l?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${l?"unset":r.route}</span
      >`)}if(r.fast_track&&mr(n,"fast_track")&&o.push(c`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),r.pr&&mr(n,"pr")){let l=r.pr.number;o.push(c`<span class="ctl-chip ctl-chip--pr"
        >${`PR${l!=null?` #${l}`:""}`}</span
      >`)}let i=wu(r.planned_execution,r.exec_receipt);if(i&&o.push(i),r.exec_receipt){let l=r.exec_receipt;o.push(c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${rr(l)}`}
        >${`exec ${l.kind==="delegated"?si(l):`main:${l.actor}`} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}if(r.impl_entry){let l=r.impl_entry;o.push(c`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${l.actor}@${l.sha}`}
        >${`impl ${l.actor} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}for(let l of mu(e.labels,n))o.push(c`<span class="ctl-chip ctl-chip--label">${l}</span>`);if(e.from_id&&mr(n,"from")&&o.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${l=>{l.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(l,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),mr(n,"blocked")){let l=Zm(e.metadata);l&&o.push(l),o.push(...Xm(e.id,e.blocked_info))}return t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&mr(n,"blocked")&&o.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),o.length===0?"":c`<div class="board-card__chips">${o}</div>`}function tg(e){let t=bn(e.created_at),n=bn(e.updated_at);return!t&&!n?"":c`<span class="board-card__times">
    ${t?c`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${ln(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&n?c`<span class="board-card__time-sep">·</span>`:""}
    ${n?c`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${ln(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </span>`}function ng(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return ri(n,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:tg(e),empty_label:"children \uC5C6\uC74C",childChips:Wa,onToggle:r=>t.onRollupToggle&&t.onRollupToggle(r,e.id),onChildClick:(r,o)=>t.onChildClick&&t.onChildClick(r,o)})}function Wa(e){let t=e?.workflow?.chips?.planned_execution,n=e?.workflow?.chips?.exec_receipt;return ii(t,n)?c`<span class="board-card__roll-child-chips">
    ${wu(t,n)}
    ${Jm(n)}
  </span>`:null}function ai(e,t){let n=Qm(e.priority);return c`
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
      ${eg(e,t)}
      ${e.workflow&&mr(t.policy||null,"stepper")?oi(e.workflow,e.status,{onOpenDoc:t.onOpenDoc}):""}
      ${ng(e,t)}
    </article>
  `}function uo(e,t){let n=Array.isArray(e.items)?e.items.length:0,r=e.is_closed===!0;return c`
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
              ${Dc.map(i=>c`<option
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
        ${e.items.map(i=>ai(i,t))}
      </div>
    </section>
  `}function $u(e,t,n){return c`
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
          ${e.items.length===0?c`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(r=>ai(r,t))}
        </div>
      </div>
    </dialog>
  `}var rg=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],og=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],sg=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function ig(e,t,n){let r=e.labels.length,o=r>0?`\uB77C\uBCA8 ${r}`:"\uB77C\uBCA8";return c`
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
  `}function xu(e,t,n){return c`
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
        ${rg.map(r=>c`<option
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
        ${og.map(r=>c`<option
              value=${r.value}
              ?selected=${e.type===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      ${ig(e,t,n)}
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
        ${sg.map(r=>c`<option
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
  `}var ag=200,lg={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},cg=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Au="beads-ui.board.sort",Su=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function ug(){try{let e=window.localStorage.getItem(Au);if(e&&Su.has(e))return e}catch{}return"created_desc"}function Eu(e,t){let n=Bt("views:board"),r=t.gotoIssue,o=t.issueStores,i=t.transport,s=t.uiOrderStore,l=t.displayPolicyStore,a=t.workerQueueStore,u=t.onClosedRangeChange,d=t.onNewIssue,m=t.openDoc,b=t.closedRange||Ys,h=o?co(o,s):null,k=fu({transport:i,uiOrderStore:s}),S=[],T=[],ee=[],re=[],U=[],L=[],R=!1,P=0,q=ug(),W=new Map,F=new Map,D=new Map,V=new Set,j={search:"",priority:"",type:"",labels:[]},ne=!1,me=null;function Oe(se){return String(se.status||"open")==="open"}function H(se){return String(se.status||"open")==="open"}function te(se){let ge=j.search.trim().toLowerCase(),Ge=j.priority,it=j.type,ze=j.labels;return se.filter(mt=>{if(ge){let gt=String(mt.id||"").toLowerCase(),nt=String(mt.title||"").toLowerCase();if(!gt.includes(ge)&&!nt.includes(ge))return!1}if(Ge!==""&&String(mt.priority)!==Ge||it!==""&&String(mt.issue_type||"")!==it)return!1;if(ze.length>0){let gt=Array.isArray(mt.labels)?mt.labels:[];if(!ze.some(nt=>gt.includes(nt)))return!1}return!0})}function ce(){let se=new Set;for(let ge of[S,T,ee,re,U,L])for(let Ge of ge){let it=Array.isArray(Ge.labels)?Ge.labels:[];for(let ze of it)typeof ze=="string"&&ze.length>0&&se.add(ze)}return Array.from(se).sort()}function Te(){return j.search.trim()!==""||j.priority!==""||j.type!==""||j.labels.length>0}function K(){try{if(h){let se=h.selectBoardColumn("tab:board:in-progress","in_progress",q),ge=h.selectBoardColumn("tab:board:blocked","blocked",q).filter(H),Ge=new Set(se.map(N=>N.id)),it=h.selectBoardColumn("tab:board:ready","ready",q).filter(N=>Oe(N)&&!Ge.has(N.id)),ze=h.selectBoardColumn("tab:board:resolved","resolved",q),mt=h.selectBoardColumn("tab:board:deferred","deferred",q),gt=h.selectBoardColumn("tab:board:closed","closed").slice(0,ag),nt=[...ge,...it,...se,...ze,...gt];ae(nt);let Pe=new Set;for(let N of nt)N&&N.id&&!Js(N)&&Pe.add(N.id);let A=!Te();S=A?zo(ge,Pe):ge,T=A?zo(it,Pe):it,ee=A?zo(se,Pe):se,re=A?zo(ze,Pe):ze,U=mt,P=mt.length,L=A?zo(gt,Pe):gt,W=new Map;for(let N of S)W.set(N.id,"open");for(let N of T)W.set(N.id,"open");for(let N of ee)W.set(N.id,"in_progress");for(let N of re)W.set(N.id,"resolved");for(let N of U)W.set(N.id,"deferred");for(let N of L)W.set(N.id,"closed");F=new Map;for(let N of S)F.set(N.id,"blocked-col");for(let N of T)F.set(N.id,"ready-col");for(let N of ee)F.set(N.id,"in-progress-col");for(let N of re)F.set(N.id,"resolved-col");for(let N of L)F.set(N.id,"closed-col")}Ze()}catch{S=[],T=[],ee=[],re=[],U=[],L=[],D=new Map,Ze()}}function ae(se){D=ei(se)}function Q(se){return ti(D,se)}function de(se){return!V.has(se)}function Re(se,ge){se.preventDefault(),se.stopPropagation(),V.has(ge)?V.delete(ge):V.add(ge),Ze()}function be(se,ge){se.preventDefault(),se.stopPropagation(),r(ge)}function Ie(se,ge){se.preventDefault(),se.stopPropagation(),r(ge)}function Ye(se,ge){me||r(ge)}function _t(se,ge){se.preventDefault(),se.stopPropagation(),dg(ge).then(Ge=>{Ge&&_e("\uBCF5\uC0AC\uB428","success",1200)})}function G(se,ge){me=ge,se.dataTransfer&&(se.dataTransfer.setData("text/plain",ge),se.dataTransfer.effectAllowed="move"),se.target.classList.add("board-card--dragging")}function pe(se){se.target.classList.remove("board-card--dragging"),qe(),setTimeout(()=>{me=null},0)}function oe(se){let ge=String(se.target.value||"");!ge||ge===b||(b=ge,u&&u(ge),Ze())}function Y(){return l?l.get():null}function we(se){let ge=a?a.get():null,Ge=ge?ge.cleanup_failed:null;if(!Ge||typeof Ge!="object"||Array.isArray(Ge))return null;let it=Ge[se];return!it||typeof it!="object"||Array.isArray(it)?null:it}let fe={onCardClick:Ye,onCopyId:_t,onDragStart:G,onDragEnd:pe,onClosedRangeChange:oe,rollupFor:Q,isExpanded:de,onRollupToggle:Re,onChildClick:be,onFromChipClick:Ie,onOpenDoc:m?(se,ge)=>m(ge):void 0,cleanupFailureFor:we,get policy(){return Y()}};function Ce(se,ge){me||(Ue(),r(ge))}function Ne(se,ge){se.preventDefault(),se.stopPropagation(),Ue(),r(ge)}let Qe={...fe,onCardClick:Ce,onChildClick:Ne,onFromChipClick:Ne,onOpenDoc:m?(se,ge)=>{Ue(),m(ge)}:void 0,get policy(){return Y()}};function Fe(se){let ge=se.target,Ge=e.querySelector(".board-filter__labels");ge&&Ge&&Ge.contains(ge)||Ee()}function J(se){se.key==="Escape"&&Ee()}function X(){ne||(ne=!0,document.addEventListener("mousedown",Fe),document.addEventListener("keydown",J),Ze())}function Ee(){ne&&(ne=!1,document.removeEventListener("mousedown",Fe),document.removeEventListener("keydown",J),Ze())}function Je(se){se.key==="Escape"&&Ue()}function st(){R||(R=!0,document.addEventListener("keydown",Je),Ze())}function Ue(){R&&(R=!1,document.removeEventListener("keydown",Je),Ze())}let et={onClose:Ue,onOverlayClick(se){se.target===se.currentTarget&&Ue()}},vt={onSearchInput(se){j.search=String(se.target.value||""),K()},onPriorityChange(se){j.priority=String(se.target.value||""),K()},onTypeChange(se){j.type=String(se.target.value||""),K()},onSortChange(se){let ge=String(se.target.value||"");if(!(!Su.has(ge)||ge===q)){q=ge;try{window.localStorage.setItem(Au,ge)}catch{}K()}},onDeferredToggle(){R?Ue():st()},onLabelMenuToggle(){ne?Ee():X()},onLabelToggle(se){let ge=j.labels.indexOf(se);ge===-1?j.labels.push(se):j.labels.splice(ge,1),K()},onLabelClear(){j.labels.length!==0&&(j.labels=[],K())},onNewIssue(){d&&d()}};function ut(){return c`
      <div class="board-view">
        ${xu(j,vt,{sort_mode:q,deferred_popup_open:R,deferred_count:P,label_options:ce(),label_menu_open:ne})}
        <div class="board-root">
          ${uo({title:"Blocked",id:"blocked-col",items:te(S)},fe)}
          ${uo({title:"Ready",id:"ready-col",items:te(T)},fe)}
          ${uo({title:"In progress",id:"in-progress-col",items:te(ee)},fe)}
          ${uo({title:"Resolved",id:"resolved-col",items:te(re)},fe)}
          ${uo({title:"Closed",id:"closed-col",items:te(L),is_closed:!0,closed_range:b},fe)}
        </div>
        ${R?$u({items:te(U),count:P},Qe,et):""}
      </div>
    `}function Ze(){ft(ut(),e),dt()}function dt(){try{let se=e.querySelector("#deferred-popup");se&&!se.open&&(typeof se.showModal=="function"?se.showModal():se.setAttribute("open",""));let ge=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let Ge of ge)Array.from(Ge.querySelectorAll(".board-card")).forEach((ze,mt)=>{ze.tabIndex=mt===0?0:-1})}catch{}}async function Zt(se,ge){if(!i){_e("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await i("update-status",{id:se,status:ge}),_e("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(Ge){n("update-status failed: %o",Ge),_e("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function $(se){switch(se){case"blocked-col":return S;case"ready-col":return T;case"in-progress-col":return ee;case"resolved-col":return re;default:return[]}}function Z(se,ge,Ge){if(!i||!s)return;let it=$(se),ze=it.find(A=>A.id===ge);if(!ze)return;let mt=it.filter(A=>A.id!==ge),gt=Ge.closest?Ge.closest(".board-card"):null,nt=mt.length;if(gt){let A=gt.getAttribute("data-issue-id");if(A===ge)return;let N=mt.findIndex(B=>B.id===A);N>=0&&(nt=N)}let Pe=mt.slice();Pe.splice(nt,0,ze),k.applyReorder(ge,Pe,nt)}function qe(){for(let se of Array.from(e.querySelectorAll(".board-column--drag-over")))se.classList.remove("board-column--drag-over")}let Se=null;e.addEventListener("dragover",se=>{se.preventDefault(),se.dataTransfer&&(se.dataTransfer.dropEffect="move");let Ge=se.target.closest(".board-column");Ge&&Ge!==Se&&(Se&&Se.classList.remove("board-column--drag-over"),Ge.classList.add("board-column--drag-over"),Se=Ge)}),e.addEventListener("dragleave",se=>{let ge=se.relatedTarget;(!ge||!e.contains(ge))&&Se&&(Se.classList.remove("board-column--drag-over"),Se=null)}),e.addEventListener("drop",se=>{se.preventDefault(),Se&&(Se.classList.remove("board-column--drag-over"),Se=null);let ge=se.target,Ge=ge.closest(".board-column");if(!Ge)return;let it=se.dataTransfer?.getData("text/plain")||"";if(!it)return;let ze=Ge.id,mt=F.get(it);if(mt&&mt===ze){if(cg.has(ze)){if(q!=="manual"){_e("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}Z(ze,it,ge)}return}let gt=lg[ze];if(!gt){_e("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}W.get(it)!==gt&&Zt(it,gt)}),e.addEventListener("keydown",se=>{let ge=se.target;if(!(ge instanceof HTMLElement))return;let Ge=String(ge.tagName||"").toLowerCase();if(Ge==="input"||Ge==="textarea"||Ge==="select"||Ge==="button"||Ge==="a"||ge.isContentEditable===!0)return;let it=ge.closest(".board-card");if(!it)return;let ze=String(se.key||"");if(ze==="Enter"||ze===" "){se.preventDefault();let Pe=it.getAttribute("data-issue-id");Pe&&r(Pe);return}if(ze!=="ArrowUp"&&ze!=="ArrowDown"&&ze!=="ArrowLeft"&&ze!=="ArrowRight")return;se.preventDefault();let mt=it.closest(".board-column");if(!mt)return;let gt=Array.from(mt.querySelectorAll(".board-card")),nt=gt.indexOf(it);if(ze==="ArrowDown"&&nt<gt.length-1){De(it,gt[nt+1]);return}if(ze==="ArrowUp"&&nt>0){De(it,gt[nt-1]);return}if(ze==="ArrowLeft"||ze==="ArrowRight"){let Pe=Array.from(e.querySelectorAll(".board-column")),A=Pe.indexOf(mt),N=ze==="ArrowRight"?1:-1,B=A+N;for(;B>=0&&B<Pe.length;){let ke=Pe[B].querySelector(".board-card");if(ke){De(it,ke);return}B+=N}}});function De(se,ge){try{se.tabIndex=-1,ge.tabIndex=0,ge.focus()}catch{}}let je=null;h&&h.subscribe&&(je=h.subscribe(()=>{try{K()}catch{}}));let lt=null;l&&l.subscribe&&(lt=l.subscribe(()=>{try{K()}catch{}}));let kt=null;return a&&a.subscribe&&(kt=a.subscribe(()=>{Ze()})),{async load(){n("load"),K()},clear(){Ee(),Ue(),je&&(je(),je=null),lt&&(lt(),lt=null),kt&&(kt(),kt=null),e.replaceChildren(),S=[],T=[],ee=[],re=[],U=[],L=[],W=new Map,F=new Map}}}function zo(e,t){return e.filter(n=>{let r=Js(n);return!(r&&t.has(r))})}async function dg(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}var mn=e=>e??Ht;function Rn(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function Ho(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}async function yn(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}var pg=["workflow_mode","spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_dispatch","quick_fix_impl_runtime","quick_fix_impl_model","quick_fix_impl_effort","quick_fix_impl_speed","orchestration_model","orchestration_effort","orchestration_speed","quick_fix_orchestration_model","quick_fix_orchestration_effort","quick_fix_orchestration_speed"],Ou=["orchestration_model","orchestration_effort","orchestration_speed"],Iu=["quick_fix_orchestration_model","quick_fix_orchestration_effort","quick_fix_orchestration_speed"],fg=[...Ou,...Iu],Tu={quick_fix_impl_dispatch:"impl_dispatch",quick_fix_impl_runtime:"impl_runtime",quick_fix_impl_model:"impl_model",quick_fix_impl_effort:"impl_effort",quick_fix_impl_speed:"impl_speed",quick_fix_orchestration_model:"orchestration_model",quick_fix_orchestration_effort:"orchestration_effort",quick_fix_orchestration_speed:"orchestration_speed"},Cu={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},Ru={spec_review_speed:"spec_review_model",plan_review_speed:"plan_review_model",impl_review_speed:"impl_review_model"},_g=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function rn(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Ct(e){return typeof e=="string"&&e.length>0?e:null}function po(e){return e.startsWith("gpt-")?e.slice(4):e}function bt(e,t,n,r,o){return{value:e,source:t,display:n,full_value:r,resolution:o}}function Lu(e,t,n){let r=Ct(t[e]);if(r!==null)return{value:r,source:"pin"};let o=Ct(n[e]);return o===null?null:{value:o,source:"global"}}function hr(e,t,n,r){return Lu(e,t,n)||{value:r,source:"base"}}function za(e,t,n,r){let o=n?.implementation?.model_catalog;if(t&&rn(o?.[t])){let s=Ct(o[t][e]);if(s!==null)return s}if(t&&Array.isArray(o?.[t])&&o[t].includes(e))return e;if(!t&&rn(o)){for(let s of Object.values(o))if(rn(s)){let l=Ct(s[e]);if(l!==null)return l}else if(Array.isArray(s)&&s.includes(e))return e}let i=r?.model_index?.[e];return Ct(r?.runners?.[i]?.models?.[e]?.id)||e}function mg(e,t){return Ct(t?.review?.reviewers?.[e]?.model)||e}function Mn(e,t,n=!1){if(e==="default")return bt(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let r=n?po(e):e;return bt(e,t,r,e,"explicit")}function Du(e,t,n){let r=t?.implementation?.model_catalog?.[e],o=[];rn(r)?o.push(...Object.keys(r)):Array.isArray(r)&&o.push(...r.filter(s=>typeof s=="string"));let i=n?.runners?.[e]?.models;if(rn(i))for(let s of Object.keys(i))o.includes(s)||o.push(s);return o}function gg(e,t){let n=[],r=e?.implementation?.model_catalog;rn(r)&&n.push(...Object.keys(r));let o=t?.runners;if(rn(o))for(let i of Object.keys(o))n.includes(i)||n.push(i);return n}function hg(e,t,n){if(e===null)return{runtime:null,offered:!1};let r=!1;for(let o of gg(t,n)){let i=Du(o,t,n);if(i.length>0&&(r=!0),i.includes(e))return{runtime:o,offered:!0}}return{runtime:null,offered:r}}function li(e){return bt(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function Ha(e,t,n){let r=Lu(e,t,n);return r?Mn(r.value,r.source):bt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function On(e){let t=rn(e.pin)?e.pin:{},n=rn(e.global)?e.global:{},r=rn(e.execution_defaults)?e.execution_defaults:null,o=r?.supported===!0&&rn(r.session)?r.session:null,i=r?.supported===!0&&rn(r.orchestration)?r.orchestration:null,s=rn(e.runner_catalog)?e.runner_catalog:null,l=Ct(n.quick_fix_impl_model),a=hg(l,o,s),u={};if(o){let d=hr("workflow_mode",t,n,Ct(o.workflow_mode_default));u.workflow_mode=d.source==="base"?bt(d.value,"base",d.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",d.value,"default"):Mn(d.value,d.source);for(let U of["spec_review","plan_review","impl_review"]){let L=`${U}_model`,R=Ct(U==="plan_review"?d.value==="fast_track"?o.plan_review?.fast_track_default:o.plan_review?.standard_recommended:o.review?.default),P=hr(L,t,n,R);if(P.value===null)u[L]=bt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(P.value!=="self"&&P.value!=="skip"&&!rn(o.review?.reviewers?.[P.value]))u[L]=li(bt(P.value,P.source,"",null,"explicit"));else{let q=mg(P.value,o);u[L]=bt(P.value,P.source,po(q),q,P.source==="base"?"default":"explicit")}}for(let[U,L]of Object.entries(Cu)){let R=u[L].value;if(R==="self"||R==="skip"){u[U]=bt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let P=Ct(o.review?.reviewers?.[R||""]?.effort),q=hr(U,t,n,P);u[U]=q.value===null?bt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):bt(q.value,q.source,q.value,q.value,q.source==="base"?"default":"explicit")}for(let[U,L]of Object.entries(Ru)){let R=u[L];if(R.resolution==="incompatible"||R.value==="self"||R.value==="skip"){u[U]=bt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}if(R.resolution==="unavailable"){u[U]=bt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}let P=hr(U,t,n,"default");u[U]=P.source==="base"?bt("default","base","default (\uC77C\uBC18)","default","default"):Mn(P.value,P.source)}let m=rn(o.implementation?.default)?o.implementation.default:{},b=Ct(e.route),h=b!==null&&["quick_fix","spec_backed","full_plan"].includes(b),k=rn(o.implementation?.route_defaults)?o.implementation.route_defaults:{},S=h&&rn(k[b])?k[b]:{},T={},ee=!1;if(b==="quick_fix"){let U=Ct(t.impl_runtime),L=Ct(n.quick_fix_impl_runtime),R=U||L,P=R==="inherit"?Ct(e.controller_runtime):R;ee=l!==null&&a.runtime!==null&&(R===null||P===a.runtime);let q=Ct(t.impl_dispatch),W=Ct(n.quick_fix_impl_dispatch);if(q!==null)u.impl_dispatch=Mn(q,"pin"),T.impl_dispatch="pin";else if(W!==null)u.impl_dispatch=Mn(W,"global"),T.impl_dispatch="quick_fix";else if(ee)u.impl_dispatch=bt("delegated","global","\uC704\uC784 (\uBAA8\uB378 \uD568\uC758)","delegated","explicit"),T.impl_dispatch="implied";else{let F=Ct(S.dispatch)||Ct(m.dispatch);u.impl_dispatch=F?bt(F,"base",F,F,"default"):bt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"),T.impl_dispatch="base"}if(U!==null)u.impl_runtime=Mn(U,"pin"),T.impl_runtime="pin";else if(L!==null)u.impl_runtime=Mn(L,"global"),T.impl_runtime="quick_fix";else if(ee){let F=a.runtime;u.impl_runtime=bt(F,"global",`${F} (\uC720\uB3C4)`,F,"explicit"),T.impl_runtime="derived"}else{let F=hr("impl_runtime",{},n,Ct(m.runtime));u.impl_runtime=F.value===null?bt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):bt(F.value,F.source,F.value,F.value,F.source==="base"?"default":"explicit"),T.impl_runtime=F.source}for(let F of["impl_model","impl_effort","impl_speed"]){let D=Ct(t[F]),V=Ct(n[`quick_fix_${F}`]),j;D!==null?(j={value:D,source:"pin"},T[F]="pin"):F==="impl_model"&&ee&&l!==null?(j={value:l,source:"global"},T[F]="quick_fix"):F!=="impl_model"&&V!==null?(j={value:V,source:"global"},T[F]="quick_fix"):(j=hr(F,{},n,Ct(m[F.replace("impl_","")])),T[F]=j.source),u[F]=j.value===null?bt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):bt(j.value,j.source,j.value,j.value,j.source==="base"?"default":"explicit")}}else for(let U of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let L=hr(U,t,n,U==="impl_dispatch"?Ct(S.dispatch)||Ct(m.dispatch):Ct(m[U.replace("impl_","")]));u[U]=L.value===null?bt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):bt(L.value,L.source,L.value,L.value,L.source==="base"?"default":"explicit")}let re=u.impl_dispatch.value==="main";if(re?u.impl_dispatch.display=T.impl_dispatch==="quick_fix"?"\uBA54\uC778 (quick_fix)":"\uBA54\uC778":u.impl_dispatch.value==="delegated"&&(T.impl_dispatch==="quick_fix"?u.impl_dispatch.display="\uC704\uC784 (quick_fix)":T.impl_dispatch!=="implied"&&(u.impl_dispatch.display="\uC704\uC784")),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_model.value!==null){let U=u.impl_runtime.value==="inherit"?Ct(e.controller_runtime):u.impl_runtime.value,L=U?Du(U,o,s):[];b==="quick_fix"&&T.impl_model==="base"&&T.impl_runtime!=="base"&&L.length>0&&!L.includes(u.impl_model.value)&&(u.impl_model=bt("auto","base","auto","auto","default"));let R=u.impl_model.value;if(R!=="auto"&&L.length>0&&!L.includes(R))u.impl_model=li(u.impl_model);else{let P=za(R,U,o,s);u.impl_model.display=po(P),u.impl_model.full_value=P,T.impl_model==="quick_fix"&&(u.impl_model.display=`${u.impl_model.display} (quick_fix)`)}}if(u.impl_effort.value==="auto"){let U=Ct(e.transport)||(u.impl_runtime.value==="codex"?"codex-native-spawn":u.impl_runtime.value==="claude"?"implement-claude":null),L=U?Ct(o.implementation?.effort_by_transport?.[U]?.auto):null;L&&!_g.has(L)?(u.impl_effort.display=`${L} (\uBE44\uD638\uD658)`,u.impl_effort.full_value=L,u.impl_effort.resolution="incompatible"):(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}T.impl_effort==="quick_fix"&&u.impl_effort.value!==null&&(u.impl_effort=bt(u.impl_effort.value,"global",`${u.impl_effort.value} (quick_fix)`,u.impl_effort.value,"explicit")),u.impl_speed.value==="default"&&(u.impl_speed=T.impl_speed==="quick_fix"?bt("default","global","default (quick_fix)","default","explicit"):u.impl_speed.source==="base"?bt("default","base","default (\uC77C\uBC18)","default","default"):Mn("default",u.impl_speed.source));for(let U of["impl_runtime","impl_effort","impl_speed"])T[U]==="quick_fix"&&u[U].value!==null&&!u[U].display.endsWith("(quick_fix)")&&(u[U].display=`${u[U].display} (quick_fix)`);if(b==="quick_fix"){l!==null&&!ee&&a.offered&&(u.quick_fix_impl_model=li(bt(l,"global","",l,"explicit")));for(let[U,L]of Object.entries(Tu))!U.startsWith("quick_fix_orchestration_")&&!Object.hasOwn(u,U)&&(u[U]={...u[L]});u.impl_dispatch.source==="base"&&u.impl_dispatch.value==="main"&&(u.quick_fix_impl_dispatch=bt("main","base","\uBA54\uC778 (\uD558\uB124\uC2A4)","main","default"))}if(re)for(let U of["impl_runtime","impl_model","impl_effort","impl_speed"])u[U]=bt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else for(let d of pg.filter(m=>!fg.includes(m)))u[d]=Ha(d,t,n);if(!o){for(let[d,m]of Object.entries(Cu))(u[m].value==="self"||u[m].value==="skip")&&(u[d]=bt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));for(let[d,m]of Object.entries(Ru))(u[m].value==="self"||u[m].value==="skip")&&(u[d]=bt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let d of["impl_runtime","impl_model","impl_effort","impl_speed"])u[d]=bt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else u.impl_dispatch.value==="delegated"&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_effort.value==="auto"&&(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}for(let d of Ou){if(!i){u[d]=Ha(d,t,n);continue}let m=d.replace("orchestration_",""),b=Ct(i[m]),h=`quick_fix_${d}`,k=e.route==="quick_fix"?Ct(n[h]):null,S=Ct(t[d]),T=S!==null?{value:S,source:"pin"}:k!==null?{value:k,source:"global"}:hr(d,{},n,b),ee=S===null&&k!==null;if(d==="orchestration_effort"&&T.source==="base"){u[d]=bt(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(T.value===null){u[d]=bt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(d==="orchestration_model"){let re=T.source==="base"?Ct(i.model_id)||T.value:za(T.value,null,o,s);u[d]=bt(T.value,T.source,`${po(re)}${ee?" (quick_fix)":""}`,re,T.source==="base"?"default":"explicit");continue}if(T.value==="default"){u[d]=ee?bt("default","global","default (quick_fix)","default","explicit"):T.source==="base"?bt("default","base","default (\uC77C\uBC18)","default","default"):Mn("default",T.source);continue}u[d]=ee?bt(T.value,"global",`${T.value} (quick_fix)`,T.value,"explicit"):Mn(T.value,T.source)}for(let d of Iu){let m=Tu[d];u[d]=u[m]?{...u[m]}:Ha(d,t,n)}if(o&&e.route!=="quick_fix")if(l===null){let d=u.orchestration_model.full_value;u.quick_fix_impl_model=bt(null,"base",d===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${po(d)})`,null,"default")}else if(a.runtime!==null){let d=za(l,a.runtime,o,s);u.quick_fix_impl_model=bt(l,"global",po(d),d,"explicit")}else a.offered?u.quick_fix_impl_model=li(bt(l,"global","",null,"explicit")):u.quick_fix_impl_model=Mn(l,"global");return u}function bg(e,t){let n=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let r=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${n} (${r})`}function ci(e){let t=rn(e.pin)?e.pin:{},n=rn(e.global)?e.global:{},r=rn(e.resolution_global)?{...e.resolution_global}:{};delete r[e.key];let o=m=>{let b={...r,...m};return On({pin:e.layer==="pin"?b:t,global:e.layer==="pin"?n:b,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},i=e.layer==="pin"?t:n,s={...i};delete s[e.key];let l=o(s)[e.key],a=o(i)[e.key],u=Ct(i[e.key]),d=[...e.choices];return u!==null&&!d.includes(u)&&d.unshift(u),{unset_label:bg(l,e.layer==="pin"),full_value:l.full_value,unavailable:l.resolution==="unavailable",disabled:a?.resolution==="not_applicable",options:d.map(m=>{let b=o({...i,[e.key]:m})[e.key];return{value:m,label:b.display,full_value:b.full_value}})}}function yg(e,t=document){let n=t.createElement("dialog");n.className="op-dialog continuation-dialog";let r=t.createElement("button"),o=t.createElement("button"),i=t.createElement("button"),s=t.createElement("h2"),l=t.createElement("p"),a=t.createElement("div");return a.className="op-dialog__actions",s.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",l.textContent=`${Rn(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${Rn(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,r.type="button",r.className="op-btn",r.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",r.disabled=e.prior_available===!1,o.type="button",o.className="op-btn",o.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",i.type="button",i.className="op-btn",i.textContent="\uCDE8\uC18C",a.append(r,o,i),n.append(s,l,a),t.body.append(n),new Promise(u=>{let d=m=>{typeof n.close=="function"&&n.close(),n.remove(),u(m)};r.addEventListener("click",()=>d("prior_session")),o.addEventListener("click",()=>d("fresh_current")),i.addEventListener("click",()=>d(null)),n.addEventListener("cancel",m=>{m.preventDefault(),d(null)}),typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")})}async function br(e,t,n={}){let r=e;for(n.onResult?.(r);r?.continuation_mismatch;){let o=r.continuation_mismatch,i=await yg(o);if(i===null)return r;r=await t(i,o.decision_token),n.onResult?.(r),r?.conflict&&n.refresh&&(r=await n.refresh(r),n.onResult?.(r))}return r}function Pu(e,t=document){let n=e?.kind==="settlement",r=t.createElement("dialog");r.className="op-dialog resume-instructions-dialog";let o=t.createElement("h2"),i=t.createElement("textarea"),s=t.createElement("div"),l=t.createElement("button"),a=t.createElement("button"),u=[e?.bead_id,e?.tuple].filter(d=>typeof d=="string"&&d!=="").join(" \xB7 ");if(o.textContent=n?"\uCC29\uC9C0 \uC815\uC0B0 \uC7AC\uAC1C":"\uC138\uC158 \uC774\uC5B4\uD558\uAE30",i.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",i.maxLength=4e3,s.className="op-dialog__actions resume-instructions-dialog__actions",l.type="button",l.className="op-btn op-btn--primary",l.textContent=n?"\uC815\uC0B0 \uC7AC\uAC1C":"\uC774\uC5B4\uD558\uAE30",a.type="button",a.className="op-btn",a.textContent="\uCDE8\uC18C",s.append(l,a),r.append(o),u!==""){let d=t.createElement("p");d.className="resume-instructions-dialog__target",d.textContent=u,r.append(d)}return r.append(i,s),t.body.append(r),new Promise(d=>{let m=!1,b=k=>{m||(m=!0,typeof r.close=="function"&&r.close(),r.remove(),d(k))},h=()=>b(i.value.trim());l.addEventListener("click",h),a.addEventListener("click",()=>b(null)),i.addEventListener("keydown",k=>{k.key==="Enter"&&(k.ctrlKey||k.metaKey)&&(k.preventDefault(),h())}),r.addEventListener("cancel",k=>{k.preventDefault(),b(null)}),typeof r.showModal=="function"?r.showModal():r.setAttribute("open",""),i.focus()})}async function fo(e){let{context:t,transport:n,adopt:r}=e,o=await Pu(t);if(o===null)return null;let i=o===""?{}:{instructions:o},s=await n({...i});if(r?.(s),s&&s.conflict&&(s=await n({...i}),r?.(s)),s=await br(s,(l,a)=>n({...i,continuation:l,decision_token:a}),{onResult:r,refresh:()=>n({...i})}),s&&s.resumed===!1&&!s.conflict&&s.reason){let l=t?.kind==="settlement"?"\uC815\uC0B0 \uC7AC\uAC1C":"\uC774\uC5B4\uD558\uAE30";_e(`${l} \uAC70\uBD80: ${s.reason}`,"error",2400)}return s}function Ka(e){return`session:${e.provider}:${e.session_id}`}function Ko(e){return`${e.provider} \xB7 ${e.session_id.slice(0,8)}`}function vg(e,t){return e.current&&t==="in_progress"&&e.locality==="local"?"running":"done"}function _o(e,t,n,r){return{attempt_id:Ka(e),session_ref:{bead_id:t,provider:e.provider,session_id:e.session_id},...typeof r=="string"&&r.length>0?{root_dir:r}:{},hide_prompt:!0,meta:{runner:e.provider,label:Ko(e),session_id:e.session_id,...typeof e.resume_command=="string"&&e.resume_command.length>0?{resume_command:e.resume_command}:{},status:vg(e,n)}}}var Ga="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",kg="\uBD84\uD574 \uC5C6\uC74C \u2014 \uCD1D\uB7C9\uB9CC \uBCF4\uACE0\uB428",Mu="\uBD84\uD574 \uC5C6\uB294 leg";function Xt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Vn=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],mo=[...Vn,"reasoning_output_tokens"],wg={codex:["implementation","review-consult"],claude:["subagent"]};function Ya(e){return!e||typeof e!="object"?!1:Number.isFinite(e.total_tokens)&&!Vn.some(t=>Number.isFinite(e[t]))}function $g(e){return!e||typeof e!="object"?!1:mo.some(t=>Number.isFinite(e[t]))}function Va(e){let t=0;for(let n of Vn)t+=Xt(e?.[n]);return t}function xg(e){return!e||typeof e!="object"?!1:Vn.some(t=>Number.isFinite(e[t]))}function qu(e){return!e||typeof e!="object"?!1:mo.some(t=>Number.isFinite(e[t]))||Number.isFinite(e.total_tokens)}function Ag(e){let t={};for(let n of mo)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function Nu(e){let t={};for(let n of mo)Number.isFinite(e[n])&&(t[n]=e[n]);return Number.isFinite(e.total_tokens)&&(t.total_tokens=e.total_tokens),e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function ju(e,t){return Ya(t)?Xt(t.total_tokens):e==="codex"?Xt(t.input_tokens)+Xt(t.output_tokens):Va(t)}function Sg(e){return e==="claude"?"Claude":"Codex"}function Eg(e){return`\u03C4 ${Bu(e)}`}function Tg(e,t){let n=t.breakdown||{},r=Xt(t.total_only_subtotal);if(Ya(n)||r>0&&!$g(n)){let u=[`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,kg];return t.replayed&&u.push(Ga),u.join(`
`)}let o=[`\uC785\uB825 ${Xt(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Xt(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?o.push(`\uCE90\uC2DC\uC77D\uAE30 ${Xt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Xt(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(o.push(`\uCE90\uC2DC\uC77D\uAE30 ${Xt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${Xt(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&o.push(`\uCD94\uB860\uCD9C\uB825 ${Xt(n.reasoning_output_tokens).toLocaleString("en-US")}`)),r>0&&o.push(`${Mu} ${r.toLocaleString("en-US")}`);let i=e==="claude"?"\uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"\uC785\uB825 + \uCD9C\uB825",s=r>0?`${i} + ${Mu}`:i,a=[e==="claude"?`Claude subtotal = ${s}`:`Codex subtotal = ${s}; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset`,`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,o.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&a.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&a.push(Ga),a.join(`
`)}function pn(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];r&&t.push({provider:n,label:`${Sg(n)} ${Eg(r.subtotal)}${typeof r.total_cost_usd=="number"&&Number.isFinite(r.total_cost_usd)?` \xB7 $${r.total_cost_usd.toFixed(2)}`:""}`,tooltip:Tg(n,r)})}return t}function di(e){let t={},n={claude:!0,codex:!1},r={claude:0,codex:0};for(let o of e)if(!(!o||!o.providers))for(let i of["claude","codex"]){let s=o.providers[i];if(!s)continue;let l=t[i];l||(l={subtotal:0,breakdown:{}},t[i]=l),l.subtotal+=s.subtotal,Number.isFinite(s.total_only_subtotal)&&(l.total_only_subtotal=Xt(l.total_only_subtotal)+Xt(s.total_only_subtotal));for(let a of mo)Number.isFinite(s.breakdown[a])&&(l.breakdown[a]=Xt(l.breakdown[a])+Xt(s.breakdown[a]));s.replayed&&(l.replayed=!0),i==="claude"&&(typeof s.total_cost_usd=="number"&&Number.isFinite(s.total_cost_usd)?r.claude+=s.total_cost_usd:n.claude=!1)}return t.claude&&n.claude&&(t.claude.total_cost_usd=r.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function Qa(e){return!e||typeof e!="object"?null:sr({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function Cg(e){return e==="codex"?"codex":"claude"}function Yn(){return{subtotal:0,breakdown:Ag(null),total_only:0,legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function ui(e,t,n){e.subtotal+=t.subtotal,Ya(t.usage)&&(e.total_only+=t.subtotal);for(let r of mo)Number.isFinite(t.usage[r])&&(e.breakdown[r]=Xt(e.breakdown[r])+Xt(t.usage[r]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),n&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function Fu(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return e.total_only>0&&(n.total_only_subtotal=e.total_only),t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function Bu(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function go(e){return xg(e)?`\u03C4 ${Bu(Va(e))}`:null}function or(e){let t=go(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function Go(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${Xt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Xt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Xt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Xt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${Va(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(Ga),n.join(`
`)}function sr(e,t){let n={claude:Yn(),codex:Yn()},r={orchestrator:{claude:Yn(),codex:Yn()},implementation:{claude:Yn(),codex:Yn()},"review-consult":{claude:Yn(),codex:Yn()},subagent:{claude:Yn(),codex:Yn()}},o=new Set;for(let l of Object.values(e||{})){if(!l||l.bead_id!==t)continue;let a=l.usage;if(qu(a)){let d=Cg(l.runner),m=Nu(a),b={provider:d,role:"orchestrator",attempt_id:String(l.attempt_id||""),usage:m,subtotal:ju(d,m)};m.replayed===!0&&(b.replayed=!0),typeof l.model=="string"&&(b.model=l.model),typeof l.session_id=="string"&&(b.session_id=l.session_id),ui(n[d],b,!0),ui(r.orchestrator[d],b,!0)}let u=Array.isArray(l.usage_legs)?l.usage_legs:[];for(let d of u){let m=d&&d.provider==="claude"?"claude":"codex";if(!d||d.provider!=="codex"&&d.provider!=="claude"||!wg[m].includes(d.role)||!qu(d.usage))continue;let b=typeof d.receipt_id=="string"&&d.receipt_id.length>0?d.receipt_id:null;if(!b||o.has(b))continue;o.add(b);let h=Nu(d.usage),k={provider:m,role:d.role,attempt_id:String(l.attempt_id||""),usage:h,subtotal:ju(m,h)};k.receipt_id=b,typeof d.agent_type=="string"&&(k.agent_type=d.agent_type),typeof d.agent_id=="string"&&(k.agent_id=d.agent_id),typeof d.model=="string"&&(k.model=d.model),typeof d.effort=="string"&&d.effort.trim().length>0&&(k.effort=d.effort),typeof d.session_id=="string"?k.session_id=d.session_id:typeof d.thread_id=="string"&&(k.session_id=d.thread_id),typeof d.turn_id=="string"&&(k.turn_id=d.turn_id),(typeof d.completed_at=="string"||typeof d.completed_at=="number"&&Number.isFinite(d.completed_at))&&(k.completed_at=d.completed_at),h.replayed===!0&&(k.replayed=!0),ui(n[m],k,!1),ui(r[k.role][m],k,!1)}}let i={};for(let l of["claude","codex"]){let a=n[l];if(a.legs.length===0)continue;let u=Fu(a,!1);l==="claude"&&a.outer_count>0&&a.outer_cost_count===a.outer_count&&(u.total_cost_usd=a.outer_cost),i[l]=u}if(Object.keys(i).length===0)return null;let s={};for(let l of["orchestrator","implementation","review-consult","subagent"]){let a={};for(let u of["claude","codex"]){let d=r[l][u];d.legs.length>0&&(a[u]={...Fu(d,!0),legs:d.legs})}Object.keys(a).length>0&&(s[l]=a)}return{providers:i,roles:s}}var Rg=".chip-popover, .judgement-chip";function ho(e){let t=null,n=!1;function r(d){return t!==null&&t.bead_id===d.bead_id&&t.chip_key===d.chip_key}function o(d){t=r(d)?null:{...d},e()}function i(){t!==null&&(t=null,e())}function s(d){let m=d.target;t!==null&&(m&&typeof m.closest=="function"&&m.closest(Rg)||i())}function l(d){d.key==="Escape"&&i()}function a(){n||(n=!0,document.addEventListener("click",s),document.addEventListener("keydown",l))}function u(){n&&(n=!1,document.removeEventListener("click",s),document.removeEventListener("keydown",l))}return{toggle:o,close:i,isOpen:r,attach:a,detach:u}}function bo(e){return c`<div
    class="chip-popover"
    role="dialog"
    aria-label=${e.title}
  >
    <div class="chip-popover__title">${e.title}</div>
    <ul class="chip-popover__lines">
      ${e.lines.map(t=>c`<li>${t}</li>`)}
    </ul>
  </div>`}var Uu={running:3,paused:2,failed:1};function ir(e){if(!e||typeof e!="object")return!1;let t=e.kind;return t==null||t==="implementation"}function Wu(e){let t=Object.values(e||{}),n=new Map;for(let r of t){if(!r||typeof r.bead_id!="string"||r.bead_id.length===0||r.kind!=="review_session"||r.status!=="running")continue;let o=typeof r.started_at=="number"?r.started_at:null,i=n.get(r.bead_id);i&&(i.started_at??0)>(o??0)||n.set(r.bead_id,{attempt:r,origin:r.origin==="click"||r.origin==="auto"?r.origin:null,started_at:o})}return n}function zu(e,t){let n=Object.values(e||{}),r=new Set,o=new Map;for(let s of n)!s||typeof s.bead_id!="string"||(typeof s.resumed_from=="string"&&s.resumed_from.length>0&&r.add(s.resumed_from),ir(s)&&o.set(s.bead_id,s.attempt_id));let i=new Map;for(let s of n){if(!s||typeof s.bead_id!="string"||s.bead_id.length===0||!ir(s))continue;let l=null;if(s.status==="running")l="running";else if(s.status==="paused"&&!r.has(s.attempt_id))l="paused";else if(s.status==="failed"||s.status==="orphaned"){let d=t.get(s.bead_id),m=typeof d=="number"&&d>0&&typeof s.finished_at=="number"&&d>=s.finished_at;o.get(s.bead_id)===s.attempt_id&&!m&&typeof s.dismissed_at!="number"&&(l="failed")}if(!l)continue;let a=typeof s.started_at=="number"?s.started_at:null,u=i.get(s.bead_id);if(u){let d=Uu[u.run_state],m=Uu[l];if(d>m||d===m&&(u.started_at??0)>(a??0))continue}i.set(s.bead_id,{attempt:s,run_state:l,started_at:a})}return{winners:i,resumed_from_ids:r}}var pi=["workflow_mode","spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],Og=["quick_fix_impl_dispatch","quick_fix_impl_runtime","quick_fix_impl_model","quick_fix_impl_effort","quick_fix_impl_speed"],Yo=[...pi.filter(e=>e!=="impl_dispatch"),...Og,"base_sync_accept_local_commits","bdui_url"],Hu=["base_sync_accept_local_commits"],Vo="true";function fi(e){let t={};if(!gn(e))return t;for(let[n,r]of Object.entries(e)){if(Hu.includes(n)){r===!0&&(t[n]=Vo);continue}typeof r=="string"&&(t[n]=r)}return t}function Ku(e){let t;try{t=new URL(e)}catch{return!1}return(t.protocol==="http:"||t.protocol==="https:")&&e===t.origin}var qn=["orchestration_model","orchestration_effort","orchestration_speed"],yo=["quick_fix_orchestration_model","quick_fix_orchestration_effort","quick_fix_orchestration_speed"],Xa=Object.freeze({orchestration_model:"quick_fix_orchestration_model",orchestration_effort:"quick_fix_orchestration_effort",orchestration_speed:"quick_fix_orchestration_speed",impl_dispatch:"quick_fix_impl_dispatch",impl_runtime:"quick_fix_impl_runtime",impl_model:"quick_fix_impl_model",impl_effort:"quick_fix_impl_effort",impl_speed:"quick_fix_impl_speed"}),vo=[...pi,...qn],Ig=Yo.filter(e=>vo.includes(e));function Lg(e,t){let n={},r=[];for(let[i,s]of Object.entries(Xa)){let l=e[i];if(!Object.hasOwn(e,i)){n[s]=null;continue}let a=t[s];if(typeof l!="string"||!Array.isArray(a)||!a.includes(l)){n[s]=null,r.push(`lane_incompatible:${s}`);continue}n[s]=l}let o=Object.keys(e).filter(i=>!Object.hasOwn(Xa,i));return{values:n,warnings:r,skipped_keys:o}}var Qo=["delegated","main"],_i=["inherit","claude","codex"],Qn=["default","fast"],Xo=["standard","fast_track"],Zo=["codex","opus","fable","self","skip"],mi=["codex","fable","skip"],gi=["low","medium","high","xhigh"],Gu=["default","fast"],En="auto";function gn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Yu(e){if(!gn(e)||!gn(e.runners))return[];let t=[];for(let[n,r]of Object.entries(e.runners))gn(r)&&gn(r.models)&&t.push([n,Object.keys(r.models)]);return t}function ko(e,t){let n=Yu(e),r=t&&t!=="inherit"?n.filter(([o])=>o===t):n;return[En,...r.flatMap(([,o])=>o)]}function Vu(e,t,n,r){if(!gn(e)||!gn(e.runners))return[En];let o=[];for(let[i,s]of Object.entries(e.runners))if(!(!gn(s)||!gn(s.models))&&!(t&&t!=="inherit"&&i!==t))for(let[l,a]of Object.entries(s.models)){if(n&&n!==En&&l!==n)continue;let u=r(s,a);if(Array.isArray(u))for(let d of u)typeof d=="string"&&!o.includes(d)&&o.push(d)}return[En,...o]}function Fr(e,t,n){return Vu(e,t,n,(r,o)=>gn(o)&&Array.isArray(o.efforts)?o.efforts:r.efforts)}function hi(e,t,n){return Vu(e,t,n,(r,o)=>gn(o)&&Array.isArray(o.orchestration_efforts)?o.orchestration_efforts:gn(o)&&Array.isArray(o.efforts)?o.efforts:r.efforts)}function wo(e,t){let n=Yu(e);return(t?n.filter(([o])=>o===t):n).flatMap(([,o])=>o)}function Qu(e,t,n){let r={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},o=r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:r.impl_runtime==="inherit"?n:null;return o&&(r.impl_model&&!ko(t,o).includes(r.impl_model)&&(r.impl_model=void 0),r.impl_effort&&!Fr(t,o,r.impl_model||En).includes(r.impl_effort)&&(r.impl_effort=void 0)),r}var Dg={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",spec_review_speed:"\uC2A4\uD399 \uB9AC\uBDF0 \uC18D\uB3C4",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",plan_review_speed:"\uACC4\uD68D \uB9AC\uBDF0 \uC18D\uB3C4",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_review_speed:"\uAD6C\uD604 \uB9AC\uBDF0 \uC18D\uB3C4",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},Pg={quick_fix_orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",quick_fix_orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",quick_fix_orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4",quick_fix_impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",quick_fix_impl_runtime:"\uC704\uC784 \uB300\uC0C1",quick_fix_impl_model:"\uBAA8\uB378",quick_fix_impl_effort:"effort",quick_fix_impl_speed:"\uC18D\uB3C4"},Za=[...Ig,...qn],Mg=[...vo,...Yo].filter((e,t,n)=>n.indexOf(e)===t&&!Za.includes(e));function Xu(e,t){let n=gn(e)?e:{},r=gn(t)?t:{},o=[];for(let s of Za){let l=n[s]??null,a=r[s]??null;l!==a&&o.push({key:s,label:Dg[s]||s,before:l,after:a,kind:l===null?"added":a===null?"removed":"changed"})}let i=[];for(let s of[...Mg,...Object.keys(r)])!Za.includes(s)&&!i.includes(s)&&Object.hasOwn(r,s)&&i.push(s);return{rows:o,ignored_keys:i}}function Zu(e,t,n){let r=gn(e)?e:{},o=Lg(gn(t)?t:{},n),i=[];for(let s of Object.values(Xa)){let l=r[s]??null,a=o.values[s]??null;l!==a&&i.push({key:s,label:Pg[s]||s,before:l,after:a,kind:l===null?"added":a===null?"removed":"changed"})}return{rows:i,ignored_keys:o.skipped_keys}}function Ja(e,t,n,r,o,i,s=null){return ci({key:e,choices:t,layer:"global",global:n,resolution_global:i,execution_defaults:r,runner_catalog:o,route:s})}function Ju(e,t){let n={};for(let r of Yo){let o=e?.[r],i=t?.[r];if(o!==i){if(Hu.includes(r)){n[r]=i===Vo?!0:null;continue}n[r]=typeof i=="string"&&i.length>0?i:null}}return n}function ed(e,t){let n={};for(let r of[...qn,...yo]){let o=e?.[r]??null,i=t?.[r]??null;o!==i&&(n[r]=typeof i=="string"&&i.length>0?i:null)}return n}var el=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...qn]}],yr={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",spec_review_speed:"\uC0AC\uC591 \uB9AC\uBDF0 \uC18D\uB3C4",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",plan_review_speed:"\uACC4\uD68D \uB9AC\uBDF0 \uC18D\uB3C4",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_review_speed:"\uAD6C\uD604 \uB9AC\uBDF0 \uC18D\uB3C4",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},bi={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function tl(e,t,n,r,o,i=null){let s=On({pin:t,global:n,execution_defaults:r,runner_catalog:o,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:i});return e.map(l=>({key:l,...s[l]}))}function td(e,t,n,r,o,i=null){let s={pin:0,global:0,base:0};for(let l of tl(e,t,n,r,o,i))s[l.source]+=1;return s}function nd(e,t,n){return{id:e,key:t,value:typeof n=="string"?n:""}}function rd(e,t,n){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:n}}var Ix=[...pi,...qn];var od=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed","impl_runtime","impl_model","impl_effort"];function Jo(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function yi(e){if(!Jo(e)||!Jo(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>Jo(n)&&Jo(n.models));return t.length>0?t:null}function Nn(e,t){let n=yi(e);if(!n||!t)return null;for(let[r,o]of n)if(Object.hasOwn(o.models,t))return r;return null}function sd(e,t){return Jo(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function id(e,t){let n=yi(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return sd(r,r.models[t]);return[]}function qg(e){let t=yi(e);if(!t)return[];let n=[];for(let[,r]of t)for(let o of Object.values(r.models))for(let i of sd(r,o))n.includes(i)||n.push(i);return n}function Ng(e,t){if(!t)return qg(e);let r=yi(e)?.find(([i])=>i===t)?.[1];if(!r)return[];let o=[];for(let i of Object.keys(r.models))for(let s of id(e,i))o.includes(s)||o.push(s);return o}function ad(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},o=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!o)return r.impl_model="",r.impl_effort="",r;let i=Nn(t,r.impl_model);if(r.impl_model&&(!o||i!==o))return r.impl_model="",r.impl_effort="",r;let s=r.impl_model?id(t,r.impl_model):Ng(t,o);return r.impl_effort&&s.length>0&&!s.includes(r.impl_effort)&&(r.impl_effort=""),r}var nl=new Set(["unavailable","not_applicable"]);function vr(e,t){if(typeof e!="object"||e===null)return null;let n=e[t];return typeof n=="object"&&n!==null?n:null}function ld(e){return e.filter(t=>t!==null).join(" \xB7 ")}function kr(e,t){return t===null?null:`${yr[e]}: ${t.display} (${bi[t.source]})`}function rl(e){return e.filter(t=>t!==null).join(`
`)}function vi(e){if(typeof e!="object"||e===null)return null;let t=Rn(e);if(t==="")return null;let n=(r,o)=>typeof o=="string"&&o.length>0?`${r}: ${o}`:null;return{text:t,title:rl(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",n("runner",e.runner),n(yr.orchestration_model,e.model),n(yr.orchestration_effort,e.effort),n(yr.orchestration_speed,e.speed)])}}function $o(e,t){let n=vr(e,"orchestration_model");if(n===null||n.resolution==="unavailable")return null;let r=vr(e,"orchestration_effort"),o=vr(e,"orchestration_speed"),i=ld([Nn(t,n.value??""),n.display,r!==null&&r.value!==null?r.display:null,o!==null&&o.value==="fast"?"Fast":null]);return i===""?null:{text:i,title:rl(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",kr("orchestration_model",n),kr("orchestration_effort",r),kr("orchestration_speed",o)])}}function jg(e,t){return e===null||e.value===null||nl.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function Fg(e){return e===null||nl.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function Bg(e){return e===null?null:e.value==="auto"?"auto":nl.has(e.resolution)?null:e.display}function Br(e,t){if(typeof e!="object"||e===null)return null;let n=vr(e,"impl_dispatch"),r=vr(e,"impl_runtime"),o=vr(e,"impl_model"),i=vr(e,"impl_effort"),s=vr(e,"impl_speed"),l=n!==null&&n.value==="main"?"\uBA54\uC778":ld([jg(r,t??null),Fg(o),Bg(i),s!==null&&s.value==="fast"?"Fast":null]);return l===""?null:{text:l,title:rl(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",kr("impl_dispatch",n),kr("impl_runtime",r),kr("impl_model",o),kr("impl_effort",i),kr("impl_speed",s)])}}var Ug=Object.freeze(new Set(["push_not_contained","invalid_impl_review","premature_close","head_mismatch","foreign_deploy_unsupported","not_resolved"])),Wg=Object.freeze(["delivery_unproven:"]);function ki(e){let t=e&&typeof e.reason=="string"?e.reason:"";if(t.length===0||Ug.has(t))return"session";for(let n of Wg)if(t.startsWith(n))return"session";return"settlement"}var zg=["hard_diagnosis","invariant_reasoning","verification_by_judgment","claude_bound"];var Hg={hard_diagnosis:"\uC6D0\uC778\uC774 \uBD88\uBA85\uD655\uD558\uAC70\uB098 \uC7AC\uD604\uC774 \uBD88\uC548\uC815\uD574 \uAC00\uC124-\uAC80\uC99D \uB8E8\uD504\uAC00 \uD544\uC694\uD558\uB2E4",invariant_reasoning:"\uC815\uD569\uC131\uC774 \uC0C1\uD0DC\uAE30\uACC4\xB7\uB3D9\uC2DC\uC131\xB7\uBD88\uBCC0\uC2DD \uCD94\uB860\uC5D0 \uB2EC\uB824 \uC788\uB2E4",verification_by_judgment:"\uD14C\uC2A4\uD2B8\uAC00 \uBABB \uC7A1\uACE0 \uB9AC\uBDF0\uC5B4\uC758 \uCD94\uB860\uC73C\uB85C\uB9CC \uAC80\uC99D\uD560 \uC218 \uC788\uB2E4",claude_bound:"Claude \uC138\uC158 \uC790\uC0B0\xB7\uC758\uBBF8\uB860\uC5D0 \uAC15\uD558\uAC8C \uBB36\uC5EC \uC788\uB2E4"};function ol(e){return(e&&Array.isArray(e.reasons)?e.reasons:[]).map(n=>Hg[n]||"").filter(n=>n.length>0)}var cd={orchestration_model:["fable"],impl_runtime:["claude"]},sl={unapplied:"\uBBF8\uC801\uC6A9",applied:"\uC801\uC6A9\uB428",diverged:"\uCD94\uCC9C\uACFC \uB2E4\uB984"};function ud(e){return typeof e=="object"&&e!==null?e:null}function dd(e,t){return typeof e=="string"&&t.includes(e)?e:""}function Kg(e){return typeof e!="string"?[]:e.split("+").map(t=>t.trim()).filter(t=>zg.includes(t))}function es(e,t=e){let n=ud(e);if(!n)return null;let r=dd(n.rec_orchestration_model,cd.orchestration_model);if(r.length===0)return null;let o=dd(n.rec_impl_runtime,cd.impl_runtime),i={orchestration_model:r};o.length>0&&(i.impl_runtime=o);let s=ud(t)||{},l=Object.keys(i),a=0,u=0;for(let m of l){let b=s[m];typeof b=="string"&&b.length>0&&(a+=1,b===i[m]&&(u+=1))}let d=a===0?"unapplied":u===l.length?"applied":"diverged";return{reasons:Kg(n.rec_reason),rec:i,state:d}}function wi(e){if(!e||typeof e!="object")return"";let t=ol(e),n=sl[e.state]||"",r=["\uBCF5\uC7A1\uD55C \uC791\uC5C5\uC73C\uB85C \uD310\uC815\uB428"];return t.length>0&&r.push(`\uC0AC\uC720: ${t.join(" \xB7 ")}`),n.length>0&&r.push(`\uC0C1\uD0DC: ${n}`),r.join(`
`)}function $i(e){return e.replace(/\/+$/,"")}function Gg(e,t){let n=$i(e),r=$i(t);return n===r||r.startsWith(`${n}/`)||n.startsWith(`${r}/`)}function xi(e,t){let n=new Set;for(let r of e)for(let o of t){if(!Gg(r,o))continue;let i=$i(r),s=$i(o);n.add(i.length>=s.length?i:s)}return[...n].sort()}function il(e,t){return`${e}\0${t}`}function pd(e){let t=new Map;for(let n of Array.isArray(e?.running)?e.running:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"running",state:"running"});for(let n of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let n of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let r=Array.isArray(n.sublanes?.parallel)?n.sublanes.parallel:Array.isArray(n.items)?n.items:[];for(let o of r)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:"parallel",position:o.queue_position});for(let o of Array.isArray(n.sublanes?.serial)?n.sublanes.serial:[])for(let i of o.items)t.set(i.id,{root_dir:i.root_dir,workspace_name:i.workspace_name,lane:o.id,position:i.queue_position})}for(let n of Array.isArray(e?.runnable)?e.runnable:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"runnable",state:"runnable"});for(let n of Array.isArray(e?.done)?e.done:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"done",state:"done"});return t}function ns(e,t){let n=Array.isArray(t)?t:[],r=e.indexOf("-"),o=r>0?e.slice(0,r):e;return n.some(i=>typeof i?.issue_prefix=="string"&&i.issue_prefix===o)?"internal":n.length>0&&n.every(i=>typeof i?.issue_prefix=="string")?"external":"unknown"}function ts(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function fd(e,t,n,r){let o=n.get(e);if(!!(o&&t&&o.root_dir===t.root_dir&&o.lane===t.lane&&typeof o.position=="number"&&typeof t.position=="number"&&o.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0};if(o)return{id:e,label:`\u{1F512} ${e} (${ts(o)})`,location_label:ts(o),scope:null,same_lane_ahead:!1};let s=ns(e,r),l=s==="internal"?"\uBBF8\uC801\uC7AC":s==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${l})`,location_label:l,scope:s,same_lane_ahead:!1}}function _d(e){let t=Array.isArray(e)?e:[],n=new Map,r=new Map,o=new Map;for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let u=il(l.root_dir,a.id);n.set(u,{root_dir:l.root_dir,workspace_name:l.name,lane:a.id}),o.set(u,[]);for(let d of Array.isArray(a.items)?a.items:[])r.set(d.id,u)}for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let u=il(l.root_dir,a.id),d=Array.isArray(a.items)?a.items[0]:null,b=!!d&&d.queue_index===0&&(!Array.isArray(a.occupied_by)||a.occupied_by.length===0)&&Array.isArray(d.blocked_by)?d.blocked_by:[],h=o.get(u);if(h)for(let k of b){let S=r.get(k);S&&S!==u&&!h.includes(S)&&h.push(S)}}let i=(l,a)=>{let u=new Set,d=[l];for(;d.length>0;){let m=d.pop();if(m===a)return!0;!m||u.has(m)||(u.add(m),d.push(...o.get(m)||[]))}return!1},s=new Map;for(let[l,a]of o){let u=[];for(let d of a){let m=n.get(d);i(d,l)&&m&&u.push(m)}u.length>0&&s.set(l,u)}return s}function md(e,t){return il(e,t)}var Yg=Object.freeze(["done","abandoned"]);function gd(e){return!e||typeof e!="object"||Array.isArray(e)?!1:typeof e.phase=="string"&&!Yg.includes(e.phase)}async function Vg(e){let t=await yn(e);_e(t?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",t?"success":"error",1200)}function Ur(e){return typeof e!="string"||e.length===0?"":c`<span class="worker-ev__copyline"
    ><code class="worker-ev__path">${e}</code
    ><button
      type="button"
      class="worker-ev__copy"
      data-seam="log-path-copy"
      title="로그 경로 복사"
      aria-label=${`\uB85C\uADF8 \uACBD\uB85C \uBCF5\uC0AC: ${e}`}
      @click=${()=>{Vg(e)}}
    >
      ⧉
    </button></span
  >`}var hd=Object.freeze(["spec_backed","full_plan","quick_fix"]);var Qg="worker-ineligible";function rs(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function bd(e){return rs(e).includes(Qg)}var Xg=new Set(hd),yd=new WeakMap;function xo(e){return e&&typeof e=="object"?e:{}}function Zg(e){let t=yd.get(e);if(t)return t;let n=kd(e);return yd.set(e,n),n}function Ai(e,t){return(Array.isArray(e)?e:[]).findIndex(r=>r&&r.bead_id===t)}function Jg(e,t){if(e.length===0)return null;if(Zg(t).has(e))return{lane:"running"};if(Ai(t.pr_wait,e)>=0)return{lane:"pr_wait"};let n=Ai(t.queue,e);if(n>=0)return{lane:"parallel",index:n};for(let r of Array.isArray(t.serial_lanes)?t.serial_lanes:[]){if(!r||typeof r.id!="string"||!/^s[1-5]$/.test(r.id))continue;let o=Ai(r.entries,e);if(o>=0)return{lane:r.id,index:o}}return Ai(t.done,e)>=0?{lane:"done"}:null}function al(e,t){let n=Xg.has(e.route),r=e.route==="quick_fix";return{placeable:n&&!e.worker_ineligible&&!e.awaiting_user&&(r?e.has_description:e.spec==="published")&&t===null,route_ok:n,worker_ineligible:e.worker_ineligible,awaiting_user:e.awaiting_user,missing_description:r&&!e.has_description,spec:e.spec,location:t}}function os(e,t){let n=xo(e),r=xo(t),o=ao(n),i=n.workflow?.route_source==="explicit"&&typeof n.workflow.route=="string"&&n.workflow.route||(typeof xo(n.metadata).route=="string"?xo(n.metadata).route:""),s=i==="quick_fix",l=!Object.hasOwn(n,"description")||typeof n.description=="string"&&n.description.trim().length>0,a=Object.hasOwn(n,"labels")&&bd(n.labels),u=Object.hasOwn(xo(n.metadata),"awaiting_user"),d=Jg(typeof n.id=="string"?n.id:"",r);return al({route:i,spec:s?"n/a":o.conflict?"conflict":o.evidence,has_description:l,awaiting_user:u,worker_ineligible:a},d)}function Wr(e){let t=e.location;if(t)switch(t.lane){case"running":return"\uC2E4\uD589 \uC911\uC774\uB77C \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4";case"pr_wait":return"PR \uB300\uAE30 \uC911\uC774\uB77C \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4";case"done":return"\uC644\uB8CC \uB808\uC778\uC5D0 \uC788\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4";case"parallel":return`\uC774\uBBF8 \uB300\uAE30 \uC911 \xB7 \uBCD1\uB82C #${t.index+1}`;default:return`\uC774\uBBF8 \uB300\uAE30 \uC911 \xB7 \uC9C1\uB82C ${t.lane.slice(1)} #${t.index+1}`}return e.placeable?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":e.route_ok===!1?"route\uAC00 \uC815\uD574\uC9C0\uC9C0 \uC54A\uC544 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":e.worker_ineligible?"worker-ineligible label\uB85C \uC6CC\uCEE4\uC5D0\uC11C \uC2E4\uD589\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":e.awaiting_user?"\uC0AC\uC6A9\uC790 \uB9AC\uBDF0\uB97C \uAE30\uB2E4\uB9AC\uB294 \uC911\uC774\uB77C \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":e.missing_description?"description\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":e.spec==="conflict"?"spec \uACBD\uB85C\uAC00 \uCDA9\uB3CC\uD574 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"spec\uC774 \uBC1C\uD589\uB418\uC9C0 \uC54A\uC544 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}function ss(e){let t=xo(e),n=typeof t.serial_lane_count=="number"&&Number.isInteger(t.serial_lane_count)&&t.serial_lane_count>0?Math.min(t.serial_lane_count,5):0,r=Array.isArray(t.serial_lanes)?t.serial_lanes:[],o=[];for(let s of r){if(o.length>=n)break;!s||typeof s.id!="string"||!/^s[1-5]$/.test(s.id)||!Array.isArray(s.entries)||o.push({id:s.id,label:`\uC9C1\uB82C ${s.id.slice(1)}`,count:s.entries.length})}return o.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(t.queue)?t.queue:[]).length},...o]}function vd(e){return/^s[1-5]$/.test(e)?`\uC9C1\uB82C ${e.slice(1)}`:"\uBCD1\uB82C"}function Ti(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function xd(e){return e==="session"?"bead\uAC00 in_progress\uB85C \uC7A1\uD78C \uB4A4 \uB2EB\uD788\uAE30\uAE4C\uC9C0\uC758 \uACBD\uACFC":"attempt \uC2E4\uD589 \uC2DC\uAC04 \uD569\uC0B0 (\uC7AC\uAC1C \uC138\uC158 \uD3EC\uD568)"}function zr(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let n=Math.floor(t/60);if(n<60)return`${n}\uBD84 ${Math.round(t-n*60)}\uCD08`;let r=Math.floor(n/60),o=n%60;return`${r}\uC2DC\uAC04 ${o}\uBD84`}function Ad(e,t){if(typeof e!="object"||e===null)return[];let n=!1,r=!1;for(let o of Object.values(e)){if(typeof o!="object"||o===null)continue;let i=o;i.bead_id!==t||i.kind!=="review_session"||(n=!0,r=r||i.origin==="auto")}return n?[r?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"]:[]}function wd(e){return e==="auto"||e==="click"?e:null}function Sd(e,t){if(typeof e!="object"||e===null)return{active:!1,failure:null,origin:null};let n=!1,r=null,o=-1,i=null,s=null,l=-1;for(let a of Object.values(e)){if(typeof a!="object"||a===null)continue;let u=a;if(u.bead_id!==t||u.kind!=="review_session")continue;if(u.status==="pending"||u.status==="running"){n=!0;let m=typeof u.started_at=="number"?u.started_at:0;m>=o&&(o=m,r=wd(u.origin));continue}if(u.status!=="failed")continue;let d=typeof u.finished_at=="number"?u.finished_at:0;d>=l&&(l=d,i=typeof u.cause=="string"&&u.cause.length>0?u.cause:null,s=wd(u.origin))}return n?{active:!0,failure:null,origin:r}:{active:!1,failure:i,origin:s}}function Ed(e,t){if(typeof e!="object"||e===null)return null;let n=0,r=!1;for(let o of Object.values(e)){if(typeof o!="object"||o===null)continue;let i=o;if(i.bead_id!==t)continue;let s=i.started_at,l=i.finished_at;typeof s!="number"||typeof l!="number"||!Number.isFinite(s)||!Number.isFinite(l)||l<s||(n+=l-s,r=!0)}return r?n:null}function Ci(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function eh(e,t){let n=Array.isArray(e)?e:[],r=Array.isArray(t)?t:[];if(n.length===0&&r.length===0)return null;let o=null;for(let s of n)s.kind!=="deploy"||s.state!=="succeeded"||typeof s.target_sha!="string"||(!o||(typeof s.finished_at=="number"?s.finished_at:0)>(typeof o.finished_at=="number"?o.finished_at:0))&&(o=s);let i=n.filter(s=>s.state==="failed"&&!s.dismissed&&!s.superseded_by).length+r.length;return{deploy:o?{sha:Ti(o.target_sha),at:typeof o.finished_at=="number"?o.finished_at:null,elapsed_ms:typeof o.elapsed_ms=="number"?o.elapsed_ms:null}:null,unresolved:i,badge:i>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${i}`}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function Td(e,t){let n=eh(e,t);return n?c`<button
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
            title=${n.deploy.at?ln(n.deploy.at):""}
            >${Ci(n.deploy.at)}${n.deploy.elapsed_ms!==null?` \xB7 ${zr(n.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${n.badge.tone}"
      >${n.badge.label}</span
    >
  </button>`:""}function Ao(e){let t=bn(e.created_at),n=bn(e.updated_at);return!t&&!n?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${ln(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&n?c`<span>·</span>`:""}${n?c`<span title=${`\uC218\uC815 ${ln(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </div>`}function th(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="abandoned"?"\uD3D0\uAE30 \uD3EC\uAE30\uB428":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function as(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function ls(e,t){return t.kind==="stale_work_backup_fresh"?`${e}: \uC2E4\uD328\uD55C \uBC31\uC5C5 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4. \uBC31\uC5C5\uC740 \uB9CC\uB4E4\uC5B4\uC9C0\uC9C0 \uC54A\uC558\uACE0 \uAE30\uC874 \uC791\uC5C5\uC740 \uADF8\uB300\uB85C \uB0A8\uC2B5\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uC2E4\uD328\uD55C \uD3D0\uAE30 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4. \uBC31\uC5C5\uACFC \uD3D0\uAE30\uB294 \uC218\uD589\uB418\uC9C0 \uC54A\uC558\uACE0 bead\uB294 \uD3D0\uAE30 \uC774\uC804 \uC0C1\uD0DC\uB85C \uB3CC\uC544\uAC11\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function Ri(e){return e.kind==="stale_work_backup_fresh"?`\uBC31\uC5C5 \uD3EC\uAE30\uB428 \xB7 \uAE30\uC874 \uC791\uC5C5\uC740 \uADF8\uB300\uB85C \uB0A8\uC2B5\uB2C8\uB2E4 (\uC6D0\uC778: ${e.last_error})`:`\uD3D0\uAE30 \uD3EC\uAE30\uB428 \xB7 \uD3D0\uAE30\uB294 \uC218\uD589\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 (\uC6D0\uC778: ${e.last_error})`}function Oi(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function Cd(e){return e?.startsWith("orphan_gitlink_content:")?`\uB9E4\uD551 \uC5C6\uB294 gitlink \uACBD\uB85C ${e.slice(23)}\uC5D0 \uB0B4\uC6A9\uC774 \uC788\uC2B5\uB2C8\uB2E4 \u2014 \uC800\uC7A5\uC18C\uC5D0\uC11C \uADF8 \uACBD\uB85C\uB97C \uC815\uB9AC\uD55C \uB4A4 \uC7AC\uC2DC\uB3C4\uD558\uAC70\uB098 \uD3EC\uAE30\uD558\uC138\uC694`:e==="dirty_submodule"?"\uC11C\uBE0C\uBAA8\uB4C8\uC5D0 \uBBF8\uCEE4\uBC0B \uBCC0\uACBD\uC774\uB098 \uBBF8\uCD08\uAE30\uD654 \uD56D\uBAA9\uC774 \uC788\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC \uD6C4 \uC7AC\uC2DC\uB3C4\uD558\uC138\uC694":e==="submodule_observation_failed"?"\uC11C\uBE0C\uBAA8\uB4C8 \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (git \uC624\uB958) \u2014 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C git \uBA85\uB839\uC744 \uC9C1\uC811 \uD655\uC778\uD558\uC138\uC694":null}function ar(e,t,n={}){let o=Object.values(e&&typeof e=="object"?e:{}).filter(b=>b&&b.bead_id===t&&gd(b)).sort((b,h)=>(b.requested_at||0)-(h.requested_at||0)).at(-1),i=typeof n.attempt_id=="string"&&n.attempt_id.length>0?n.attempt_id:typeof o?.attempt_id=="string"?o.attempt_id:null,s=n.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":n.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":n.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,l=typeof o?.last_error=="string"?o.last_error:null,a=o?th(o.phase):null,u=o?.kind==="stale_work_backup_fresh",d=Cd(l),m=n.merged||o?.mode==="merged_revert"?"merged":"unmerged";return{action:!n.external&&!n.done,enabled:!s&&(!o||!!l),label:u?l?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":l?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:s||(l?d?`\uD3D0\uAE30 \uC2E4\uD328: ${l} \u2014 ${d}`:u?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${l} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${l} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:o?`${a||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:m==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:i,operation:o||null,progress:a,error:l,confirmation:m,abandon:{action:!!o&&o.phase==="requested"&&!!l,label:u?"\uBC31\uC5C5 \uD3EC\uAE30":"\uD3D0\uAE30 \uD3EC\uAE30",title:u?"\uC2E4\uD328\uD55C \uBC31\uC5C5 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4 \u2014 \uC6D0\uBCF8\uC740 \uADF8\uB300\uB85C \uB0A8\uACE0 \uC0C8\uB85C \uC2DC\uC791\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4":"\uC2E4\uD328\uD55C \uD3D0\uAE30 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4 \u2014 \uBC31\uC5C5\xB7\uD3D0\uAE30\uB294 \uC218\uD589\uB418\uC9C0 \uC54A\uC558\uACE0 bead\uB294 \uD3D0\uAE30 \uC774\uC804 \uC0C1\uD0DC\uB85C \uB3CC\uC544\uAC11\uB2C8\uB2E4"}}}function Rd(e){if(!e||e.quickfix_lane!==!0)return!1;let t=e.quickfix_landing;return!t||typeof t!="object"?!1:["repo_operations","branch_cleanup","parent_close"].includes(t.cursor)}function Ei(e){let t=e.discard;if(!t||!t.operation)return"";let n=t.operation,r=Cd(t.error),o=n.kind==="stale_work_backup_fresh"&&!t.error?null:n.backup?.path,i=n.original_pr,s=n.revert_pr;return c`<div
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
  </div>`}var nh={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function Od(e,t=!1){if(!e||typeof e!="object")return null;let n=e;if(n.reason!=="worktree_stale_work"||!n.stale_work||typeof n.stale_work!="object")return null;let r=n.stale_work,o=r.action_id;if(typeof o!="string"||o.length===0)return null;let i=r.residue==="branch"?"branch":"worktree",s=r.state==="unique"?"unique":"unknown",l=r.summary&&typeof r.summary=="object"?r.summary:{};function a(d){return Number.isInteger(l[d])?Number(l[d]):0}let u=typeof r.cause=="string"?r.cause:"observe_failed";return{residue:i,state:s,title:i==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":s==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:nh[u]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:i==="branch"?`\uACE0\uC720 commit ${a("branch_ahead")}`:[`staged ${a("staged_count")}`,`unstaged ${a("unstaged_count")}`,`untracked ${a("untracked_count")}`,`branch ahead ${a("branch_ahead")}`,`HEAD ahead ${a("head_ahead")}`].join(" \xB7 "),action_id:o,can_resume:r.can_resume===!0,can_continue:r.can_continue===!0,can_backup_fresh:r.can_backup_fresh===!0,can_recheck:r.can_recheck===!0,locked:t}}function Hr(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let n=t.pin===!0?" exec-chip--pin":"",r=t.pin===!0?`
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
      >`:""}`}function is(e,t){let n=`worker-dep worker-dep--${t}${e.foreign?" worker-dep--foreign":""}`;return e.openable===!0?c`<button
        type="button"
        class=${`${n} worker-dep__open`}
        data-dep-id=${e.id}
        data-root-dir=${e.root_dir||""}
        title=${e.title||""}
      >
        ${e.label}
      </button>`:c`<span class=${n} title=${e.title||""}>${e.label}</span>`}function rh(e){return{id:e.id,label:`\u29C9 ${e.id}`,title:[`\uACB9\uCE68 \xB7 ${e.location_label}`,...e.prefixes].join(`
`),openable:!0,...e.root_dir?{root_dir:e.root_dir}:{}}}function ll(e){return Array.isArray(e)?e.slice().sort((t,n)=>t.id<n.id?-1:t.id>n.id?1:0):[]}function oh(e,t=!1){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__spec-after-blocker"
    data-chip-key="spec_after_blocker"
    aria-expanded=${t?"true":"false"}
    title="선행의 결과가 설계 전제라 스펙도 선행 뒤에 씁니다"
  >
    스펙 대기
  </button>`:""}function Id(e){if(!Object.hasOwn(e,"route_ok")||e.queue_placeable===!0)return null;let t="";return e.route_ok===!1&&(t="\uB77C\uC6B0\uD305 \uD544\uC694"),t.length===0&&(e.worker_ineligible===!0||e.awaiting_user===!0)||(t.length===0&&e.missing_description===!0?t="\uBCF8\uBB38 \uD544\uC694":t.length===0&&e.placement_spec==="conflict"?t="\uC2A4\uD399 \uCDA9\uB3CC":t.length===0&&Object.hasOwn(e,"placement_spec")&&e.placement_spec!=="published"&&(t="\uC2A4\uD399 \uBBF8\uBC1C\uD589"),t.length===0)?null:{label:t,title:Wr({placeable:!1,route_ok:e.route_ok,worker_ineligible:e.worker_ineligible===!0,awaiting_user:e.awaiting_user===!0,missing_description:e.missing_description===!0,spec:e.placement_spec})}}function sh(e,t){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__readiness"
    data-chip-key="readiness"
    aria-expanded=${t?"true":"false"}
    title=${e.title}
  >
    ${e.label}
  </button>`:""}function Ii(e,t=""){if(!e)return t===""?"":c`<div class="worker-deps worker-deps--primary">
          ${t}
        </div>`;let n=ll(e.predecessors),r=Array.isArray(e.released)?e.released:[],o=ll(e.dependents),i=ll(e.overlaps),s=e.scope_missing===!0,l=e.armed_lane||null,a=!!l||n.length>0||o.length>0||t!=="",u=r.length>0||i.length>0||s;return!a&&!u?"":c`${a?c`<div class="worker-deps worker-deps--primary">
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
            >`:""}${n.map(d=>is(d,"pred"))}${t}${o.map(d=>is(d,"dependents"))}
      </div>`:""}${u?c`<div class="worker-deps worker-deps--secondary">
        ${r.map(d=>is(d,"released"))}${i.map(d=>is(rh(d),"overlap"))}${s?c`<span
              class="worker-dep worker-dep--muted"
              title="겹침 판정 불가 — 아티팩트가 있으면 스펙/플랜 front-matter, 없으면 description \`## scope\`에 선언 필요"
              >scope 없음</span
            >`:""}
      </div>`:""}`}function Ld(e,t=""){let n=(Array.isArray(e)?e:[]).filter(r=>typeof r=="string"&&r!=="").slice().sort();return n.length===0?"":c`<div class="worker-deps worker-deps--secondary">
    ${n.map(r=>is({id:r,label:`\uC774\uC6D4 \u2192 ${r}`,title:`\uC774\uC6D4\uB41C \uD6C4\uC18D ${r} \uC5F4\uAE30`,openable:!0,...t?{root_dir:t}:{}},"dependents"))}
  </div>`}function Li(e){return e?c`<button
    type="button"
    class="worker-dep worker-dep--lane mon-lane__chip"
    data-lane-id=${e.lane_id}
    title="이 연결 레인으로 이동"
  >
    ${e.label}
  </button>`:""}function Kr(e){let t=gl(e);if(t===null)return"";let n=t==="unset";return c`<span
    class="ctl-chip ctl-chip--route${n?" is-derived":""}"
    title=${n?"route \uBBF8\uD540 (metadata unset)":"route"}
    >${t}</span
  >`}function ih(e,t=!1){let n=e?e.quick_fix_review:null;if(!n)return"";let r=n.state;if(r!=="reviewed"&&r!=="stale")return"";let o=Array.isArray(n.missing)?n.missing:[],i=[r==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",...o].join(`
`);return c`<button
    type="button"
    class="ctl-chip judgement-chip worker-card__qfr worker-card__qfr--${r}"
    data-chip-key="qfr"
    aria-expanded=${t?"true":"false"}
    title=${i}
  >
    ${r==="reviewed"?"\uB9AC\uBDF0 \u2713":"\uB9AC\uBDF0 stale"}
  </button>`}function Dd(e){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--from"
    data-from-id=${e}
    title=${`\uCD9C\uCC98 ${e} \uC5F4\uAE30`}
  >
    ↩ from ${e}
  </button>`:""}function Di(e,t=!1){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__rec"
    data-chip-key="rec"
    data-state=${e.state}
    aria-expanded=${t?"true":"false"}
    title=${wi(e)}
  >
    ${"\uBCF5\uC7A1"}
  </button>`:""}var ah={absent:"\uC2E4\uD589 \uC601\uC218\uC99D\uC774 \uAE30\uB85D\uB418\uC9C0 \uC54A\uC558\uB2E4 \u2014 \uACFC\uAC70 Bead\xB7\uC678\uBD80 \uACBD\uB85C PR\uC740 \uC6D0\uB798 \uC5C6\uB2E4",unparsable:"\uC601\uC218\uC99D \uAC12\uC744 \uC77D\uC744 \uC218 \uC5C6\uB2E4 \u2014 40hex SHA\uB098 `delegated:`/`main:` \uD615\uC2DD\uC774 \uC544\uB2C8\uB2E4",effort_unknown:"effort \uD1A0\uD070\uC774 harness \uC5B4\uD718 \uBC16\uC774\uB2E4 \u2014 \uBAA8\uB378\xB7SHA\xB7unit\uC740 \uC720\uD6A8\uD558\uB2E4",main_reason_retired:"`main:` \uC0AC\uC720\uAC00 \uACE0\uC815 4\uD1A0\uD070(bead\xB7quick_fix_default\xB7phase_line\xB7takeover) \uBC16\uC774\uB2E4",main_receipt_unbacked:"`main:` \uC0AC\uC720\uB97C \uB4B7\uBC1B\uCE68\uD558\uB294 \uBA54\uD0C0\uB370\uC774\uD130(impl_dispatch\xB7route\xB7planned_execution\xB7quick_fix \uAE30\uBCF8 dispatch)\uAC00 \uC5C6\uB2E4",takeover_lineage_missing:"`main:takeover`\uC778\uB370 resolved \uBAA8\uB378\uACFC \uC77C\uCE58\uD558\uB294 \uC644\uB8CC\uB41C \uC704\uC784 \uC138\uC158\uC774 \uC5C6\uB2E4",takeover_lineage_unobservable:"`main:takeover`\uC778\uB370 \uC704\uC784 \uACC4\uBCF4\uB97C \uBAA8\uB2C8\uD130\uAC00 \uBCFC \uC218 \uC5C6\uB2E4(Codex \uBC16 \uB7F0\uD0C0\uC784)"};function lh(e,t=!1){let n=Pd(e);if(n.length===0)return"";let r=n.length>1?`\uC601\uC218\uC99D \xB7 ${n[0]} +${n.length-1}`:`\uC601\uC218\uC99D \xB7 ${n[0]}`;return c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__receipt"
    data-chip-key="receipt"
    data-bead-id=${e.id}
    aria-expanded=${t?"true":"false"}
    title=${n.join(", ")}
  >
    ${r}
  </button>`}function Pd(e){let t=e.receipt_badge?e.receipt_badge.codes:null;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function Md(e,t){return!e||typeof t!="number"?"":c`<a
    class="worker-mini__pr"
    href=${e}
    target="_blank"
    rel="noreferrer noopener"
    title="PR 열기"
    >#${t} ↗</a
  >`}function Pi(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=Math.max(0,Math.min(4,Math.trunc(e)));return c`<span class="worker-pri" title=${`\uC6B0\uC120\uC21C\uC704 P${t}`}
    >P${t}</span
  >`}function ch(e){let t=Array.isArray(e.badges)?e.badges:[],n=pn(e.usage),r=or(e.usage),o=bn(e.done_at);return c`<div
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
      ${Md(e.pr_url,e.pr_number)}${o?c`<span
            class="worker-mini__done-at"
            title=${`\uC644\uB8CC ${ln(e.done_at)}`}
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
    ${Ld(e.carried_to,e.root_dir)}
    <div class="worker-mini__row3">
      ${Kr(e.workflow)}${e.exec_chips?Hr(e.exec_chips):""}${n.length>0?n.map(i=>c`<span class="worker-usage" title=${i.tooltip}
                >${i.label}</span
              >`):r?c`<span class="worker-usage" title=${Go(e.usage)}
              >${r}</span
            >`:""}
      ${typeof e.work_ms=="number"?c`<span
            class="worker-mini__work"
            title=${xd(e.work_kind)}
            >작업 ${zr(e.work_ms)}</span
          >`:""}
    </div>
  </div>`}function Mi(e,t){return typeof e=="number"?e+Nd-t:0}function ul(e,t=Date.now()){let n=Mi(e,t);return n<=0?"":c`<span
    class="worker-dep worker-dep--grace"
    title="대기에 막 들어온 항목입니다 — 남은 시간 동안 자동 실행이 미뤄집니다"
    >⏳ ${Math.ceil(n/1e3)}초</span
  >`}function dl(e,t=Date.now()){return Mi(e.added_at,t)<=0?"":c`<button
    type="button"
    class="op-btn worker-mini__start-now"
    data-action="queue-start-now"
    data-bead-id=${e.id}
    title="대기 진입 유예를 이 항목에 대해서만 걷고 지금 실행합니다"
  >
    지금 시작
  </button>`}function So(e,t={}){if(!(e.draggable!==!0||e.done===!0))return c`<span class="worker-mini__rowops">
    ${dl(e)}${t.nudgeable===!0?c`<button
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
  </span>`}function jn(e,t={}){if(e.lane==="done"&&e.done_layout==="three_line")return ch(e);let n=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],o=pn(e.usage),i=or(e.usage),s=e.merge_step||null,l=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work||e.discard?.abandon.action===!0,a=e.lane==="done"&&!l,u=a?bn(e.done_at):"",d=n?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",m=typeof e.seq=="number"?c`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",b=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",h=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,k=Kr(e.workflow),S=e.lane==="done"?"":Dd(e.from_id),T=Pi(e.priority),ee=c`<span class="worker-mini__title">${e.title}</span>`,re=Md(e.pr_url,e.pr_number),U=r.map(G=>G===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${G}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${G===e.completion_badge&&e.completion_title||""}
          >${G}</span
        >`),L=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",R=o.length>0?o.map(G=>c`<span class="worker-usage" title=${G.tooltip}
              >${G.label}</span
            >`):i?c`<span class="worker-usage" title=${Go(e.usage)}
            >${i}</span
          >`:"",P=s?c`<span
        class="merge-step${s.failed?" merge-step--failed":""}"
        style=${`--progress: ${s.percent}%`}
        >${s.label}${s.index>0?c`<span class="merge-step__n"
              >${s.index}/${s.total}</span
            >`:""}</span
      >`:"",q=e.merge_action?c`<button
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
      </button>`:"",F=e.discard,D=F?.action||e.discard_action?c`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${F?.attempt_id||""}
          data-operation-id=${F?.operation?.operation_id||""}
          data-discard-mode=${F?.confirmation||"unmerged"}
          ?disabled=${F?!F.enabled:e.discard_enabled===!1}
          title=${F?F.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${F?.label||"\uD3D0\uAE30"}
        </button>`:"",V=F?.abandon.action?c`<button
        type="button"
        class="worker-mini__discard-abandon"
        data-bead-id=${e.id}
        data-operation-id=${F.operation.operation_id}
        data-operation-kind=${F.operation.kind||""}
        data-last-error=${F.error||""}
        title=${F.abandon.title}
      >
        ${F.abandon.label}
      </button>`:"",j=e.resolve_action?c`<button
        type="button"
        class="worker-mini__resolve"
        data-bead-id=${e.id}
        ?disabled=${e.resolve_enabled===!1}
        title=${e.resolve_title||"\uC2E4\uD328\uD55C \uC791\uC5C5\uC744 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 (\uAE30\uB85D\uB41C \uC138\uC158\uC774 \uC788\uC73C\uBA74 fork)"}
      >
        세션에서 해결
      </button>`:"",ne=F?.abandon.action?c`${D}${V}${j}`:c`${j}${D}`,me=e.stale_work||null,Oe=me?c`${me.can_resume||me.can_continue?c`<button
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
          </button>`:""}`:"",H=me?c`<div class="worker-mini__stale">
        <strong>${me.title}</strong>
        <span>${me.summary}</span>
        <span>${me.cause}</span>
        ${me.can_backup_fresh?c`<small
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
        </button>`:"",ce=!!(e.lane!=="pr_wait"&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)),Te=ce?Hr(e.exec_chips,{pin:e.exec_chips_pinned===!0}):"",K=Di(e.rec,wr(e,"rec")),ae=lh(e,wr(e,"receipt")),Q=Li(e.cross_lane_chip),de=Ur(e.log_path),Re=b||Q||k||S||ce||K||ae||R||de?c`<div class="worker-chips">
          ${b}${Q}${k}${S}${Te}${K}${ae}${R}${de}${Si(e)}
        </div>`:"",be=Ii(e.dependency_chips,ul(e.added_at)),Ie=Ei(e),Ye=t.actions?t.actions:"",_t=!!(s||e.merge_action||e.cancel_action||e.resolve_action||e.discard_action||F?.operation||e.revise_action||me);return c`<div
    class="worker-mini${l?" worker-mini--card":""}${n?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${s?" worker-mini--merging":""}${s?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}${e.search_match===!1?" is-dimmed":""}"
    style=${s?`--progress: ${s.percent}%`:""}
    draggable=${n?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${a?c`<div class="worker-mini__row1">
            ${b}${h}${T}${S}${re}${ee}${Ye}
          </div>
          ${Ld(e.carried_to,e.root_dir)}
          <div class="worker-mini__row2">
            ${k}${Te}${R}${u?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${ln(e.done_at)}`}
                  >완료 ${u}</span
                >`:""}${typeof e.work_ms=="number"?c`<span
                  class="worker-mini__work"
                  title=${xd(e.work_kind)}
                  >작업 ${zr(e.work_ms)}</span
                >`:""}${U}${P}
            <span class="worker-mini__actions"
              >${q}${W}${ne}</span
            >
            ${Ao(e)}
          </div>`:l?c`<div class="worker-mini__head">
              ${d}${m}${h}${T}${re}${U}${L}${Ye}
            </div>
            <div class="worker-mini__body">${ee}${H}</div>
            ${be}${Re}${_t?c`<div class="worker-mini__foot">
                  ${P}
                  <span class="worker-mini__actions"
                    >${q}${W}${ne}${te}${Oe}</span
                  >
                  ${Ei(e)}
                </div>`:""}
            ${Ao(e)}`:c`<div class="worker-mini__line">
              ${d}${m}${h}${T}${ee}${re}${U}${L}${P}${q}${W}${ne}${Ye}
            </div>
            ${be}${Re}${Ie} ${Ao(e)}`}
  </div>`}function pl(e,t){let n,r=[];for(let o of e){let i=o.group||"";i.length>0&&i!==n&&r.push(c`<div class="worker-card__place-group">${i}</div>`),n=i,r.push(c`<button
        type="button"
        class="worker-card__place-lane${i.length>0?" worker-card__place-lane--nested":""}"
        data-bead-id=${t}
        data-lane=${o.id}
        ?disabled=${o.disabled===!0}
        title=${o.title||`${o.label} \uB300\uAE30 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00`}
      >
        <span>${o.label}</span>
        ${typeof o.count=="number"?c`<span class="worker-card__place-count">${o.count}</span>`:""}
      </button>`)}return c`${r}`}var qd={external_roundtrip:"\uD558\uB124\uC2A4 \uBC16 \uC0C1\uB300\uC640 \uC608\uCE21 \uBD88\uAC00 \uC655\uBCF5 \uBC18\uBCF5 \u2014 \uB2E4\uB978 rig \uC138\uC158\xB7\uC0AC\uB78C\xB7\uC678\uBD80 \uC2DC\uC2A4\uD15C",user_feedback_loop:"\uC9C4\uD589 \uC911 \uC0AC\uC6A9\uC790 \uD53C\uB4DC\uBC31 \uC5C6\uC774\uB294 \uD488\uC9C8\uC774 \uB0AE\uC74C \u2014 \uBB38\uC548\xB7\uC124\uACC4 \uC138\uBD80\xB7\uBC29\uD5A5 \uC120\uD0DD"};function fl(e,t){if(t==="rec"){let n=e.rec;if(!n)return null;let r=sl[n.state]||"";return{title:"\uBCF5\uC7A1\uD55C \uC791\uC5C5\uC73C\uB85C \uD310\uC815\uB428",lines:[...ol(n),...r.length>0?[`\uC0C1\uD0DC: ${r}`]:[],"\uC801\uC6A9\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uC2E4\uD589 \uC124\uC815 \uD3B8\uC9D1\uAE30\uC5D0\uC11C"]}}if(t==="session_preferred"){if(e.session_preferred!==!0)return null;let n=qd[e.session_preferred_reason||""]||"";return{title:"\uC6CC\uCEE4\uB85C \uB3CC\uB9B4 \uC218 \uC788\uC9C0\uB9CC \uC138\uC158\uC774 \uB0AB\uB2E4",lines:n.length>0?[n]:[]}}if(t==="ineligible")return e.worker_ineligible!==!0?null:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uB300\uC0C1\uC774 \uC544\uB2C8\uB2E4",lines:["worker-ineligible \uB77C\uBCA8\uC774 \uBD99\uC5B4 \uC788\uB2E4 \u2014 \uB77C\uBCA8\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uB77C\uBCA8 \uC808\uC5D0\uC11C \uB5C0\uB2E4"]};if(t==="spec_after_blocker")return e.spec_after_blocker!==!0?null:{title:"\uC120\uD589 \uACB0\uACFC\uAC00 \uC124\uACC4 \uC804\uC81C \u2014 \uC2A4\uD399\uB3C4 \uC120\uD589 \uB4A4\uC5D0",lines:[`\uC120\uD589: ${(Array.isArray(e.blocked_by)?e.blocked_by:[]).join(" \xB7 ")}`,"\uC120\uD589\uC774 \uB2EB\uD788\uBA74 \uC774 \uD45C\uC2DC\uB294 \uC800\uC808\uB85C \uC0AC\uB77C\uC9C4\uB2E4 \u2014 \uB77C\uBCA8\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uB77C\uBCA8 \uC808\uC5D0\uC11C \uB5C0\uB2E4"]};if(t==="readiness"){let n=Id(e);return n?{title:n.title,lines:[]}:null}if(t==="receipt"){let n=Pd(e);return n.length===0?null:{title:"\uC2E4\uD589 \uC601\uC218\uC99D \uD68C\uACC4 \uC794\uC5EC \u2014 \uBA38\uC9C0\uB294 \uC9C4\uD589",lines:[...n.map(r=>ah[r]||r),"\uC790\uB3D9 \uBA38\uC9C0 \uD310\uC815\uC5D0\uB294 \uC601\uD5A5\uC774 \uC5C6\uB2E4 \u2014 \uC815\uC815\uC740 bd update --set-metadata exec_receipt=\u2026 \uB85C"]}}if(t==="qfr"){let n=e.workflow?e.workflow.quick_fix_review:null;if(!n||n.state!=="reviewed"&&n.state!=="stale")return null;let r=Array.isArray(n.missing)?n.missing:[];return{title:n.state==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",lines:r.length>0?r:["\uBE60\uC9C4 \uD56D\uBAA9 \uC5C6\uC74C"]}}return null}var uh=["rec","receipt","session_preferred","ineligible","qfr","spec_after_blocker","readiness"];function qi(e,t){for(let n of uh){if(!t(n))continue;let r=fl(e,n);return r?{chip_key:n,content:r}:null}return null}function Si(e){return e.chip_popover?bo(e.chip_popover.content):""}function wr(e,t){return!!e.chip_popover&&e.chip_popover.chip_key===t}var _l="\uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694";function ml(e,t=null,n={}){let r=e.worker_ineligible===!0,o=e.draggable&&!e.done&&!r,i=e.queue_placeable===!0&&!e.done&&!r,s=i&&t&&t.bead_id===e.id,l=e.session_preferred===!0,a=qd[e.session_preferred_reason||""]||"",u=e.workflow,d=e.missing_description===!0,m=e.awaiting_user===!0,b=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),h=wr(e,"spec_after_blocker"),k=oh(e.spec_after_blocker===!0,h),S=Id(e),T=wr(e,"readiness"),ee=sh(S,T),re=c`${k}${h?Si(e):""}${ee}${T?Si(e):""}`,U=Ii(e.dependency_chips,k===""&&ee===""?"":re),L=e.workspace_name?c`<span class="worker-card__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",R=Li(e.cross_lane_chip),P=Kr(u),q=Dd(e.from_id),W=!!(e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)),F=!r&&(e.blocked===!0||e.queue_placeable===!1);return c`<div
    class="worker-card${o?"":" worker-card--static"}${r?" worker-card--ineligible":""}${F?" worker-card--blocked":""}${e.search_match===!1?" is-dimmed":""}"
    draggable=${o?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${o?c`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span
      >${Pi(e.priority)}
      ${r?c`<button
            type="button"
            class="ctl-chip ctl-chip--label judgement-chip worker-card__ineligible"
            data-chip-key="ineligible"
            aria-expanded=${wr(e,"ineligible")?"true":"false"}
            title="worker-ineligible label이 붙어 워커 실행 대상이 아닙니다"
          >
            worker-ineligible
          </button>`:l?c`<button
              type="button"
              class="ctl-chip ctl-chip--label judgement-chip worker-card__session-preferred"
              data-chip-key="session_preferred"
              aria-expanded=${wr(e,"session_preferred")?"true":"false"}
              title=${a}
            >
              세션 권장
            </button>`:""}${Di(e.rec,wr(e,"rec"))}${ih(u,wr(e,"qfr"))}
      ${h||T?"":Si(e)}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${u?oi(u,e.status,{onOpenDoc:n.onOpenDoc}):""}${U}
    ${L||R||P||q||W?c`<div class="worker-chips">
          ${L}${R}${P}${q}${Hr(e.exec_chips,{pin:n.exec_chips_mode==="pinned_only"})}
        </div>`:""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${s?c`<div class="worker-card__place-menu">
            ${pl(t.lanes,e.id)}
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
                  class="worker-card__reason${b?" worker-card__reason--danger":""}"
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
              title=${Wr({placeable:i,route_ok:e.route_ok,worker_ineligible:r,awaiting_user:m,missing_description:d,spec:e.placement_spec})}
            >
              ↴ 대기로
            </button>`}
    </div>
    ${Ao(e)}
  </div>`}function Xn(e){let t=!!e.collapsible&&!!e.collapsed,n=typeof e.count=="number"?e.count:e.items.length,r=c`<span
      class="worker-pane__dot worker-pane__dot--${e.lane}"
      aria-hidden="true"
    ></span>
    <span class="worker-pane__title">${e.title}</span>
    ${t&&e.preview?c`<span class="worker-pane__preview">${e.preview}</span>`:""}
    <span class="worker-pane__count">${n}</span>
    ${typeof e.match_count=="number"?c`<span class="worker-pane__match">일치 ${e.match_count}</span>`:""}`;return c`<section
    class="worker-pane worker-pane--lane-${e.lane}${e.src?" worker-pane--src":""}${e.live?" worker-pane--live":""}${e.collapsible?" worker-pane--collapsible":""}${t?" worker-pane--collapsed":""}"
    id=${mn(e.id||void 0)}
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
                  </div>`:e.items.map(o=>e.lane==="candidate"?ml(o,e.place_menu,{onOpenDoc:e.onOpenDoc}):jn(o))}
          </div>`}
  </section>`}function $d(e,t,n){return c`<button
      type="button"
      class="worker-wait__area-toggle"
      data-area=${e}
      aria-expanded=${n?"false":"true"}
      aria-label=${`${t} ${n?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
    >
      ${n?"\u25B8":"\u25BE"}
    </button>
    <span class="worker-wait__area-name">${t}</span>`}function Ni(e){let t=e.parallel,n=e.serial,r=t.drop||{};return c`<div class="worker-wait">
    <section
      class="worker-wait__area worker-wait__area--parallel${t.collapsed?" is-collapsed":""}"
      data-area="parallel"
    >
      <header class="worker-wait__area-hd">
        ${$d("parallel","\uBCD1\uB82C \uC601\uC5ED",t.collapsed)}
        <span class="worker-wait__area-count">${t.count}</span>
      </header>
      ${t.collapsed?"":c`<div
            class="worker-wait__area-body"
            data-drop=${mn(r.drop)}
            data-root-dir=${mn(r.root_dir)}
            data-lane-id=${mn(r.lane_id)}
            data-lane-length=${mn(r.lane_length)}
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
        ${$d("serial","\uC9C1\uB82C \uC601\uC5ED",n.collapsed)}
        ${n.header_control?n.header_control:""}
      </header>
      ${n.collapsed?"":c`<div class="worker-wait__area-body">
            ${n.notice?n.notice:""}
            ${n.extra_panes?n.extra_panes:""}
            ${n.lanes.map(o=>dh(o))}
          </div>`}
    </section>
  </div>`}function dh(e){let t=e.drop||{},n=e.badge?c`<span
        class="worker-lane__badge${e.held?" worker-lane__badge--held":""}"
        >${e.badge}</span
      >`:"";return c`<div
    class="worker-wait__lane${e.empty?" worker-wait__lane--empty":""}"
  >
    ${Xn({id:typeof e.pane_id=="string"?e.pane_id:`worker-pane-lane-${e.id}`,lane:e.id,title:e.title,items:[],count:e.count,match_count:e.match_count,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:c`${n}${e.header_control?e.header_control:""}`,body:c`<div
        class="worker-wait__rows"
        data-drop=${mn(t.drop)}
        data-root-dir=${mn(t.root_dir)}
        data-lane-id=${mn(t.lane_id)}
        data-lane-length=${mn(t.lane_length)}
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
  </div>`}function ji(e){return e.count?c`<section
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
  </section>`:""}var jd=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],cs=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"post_merge_jobs",label:"\uBA38\uC9C0 \uD6C4 \uC7A1"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function Fi(e,t){let n=jd.find(o=>o.step===e);if(!n)return null;let r=jd.length;return{step:n.step,label:t,index:n.index,total:r,percent:Math.round(n.index/r*100)}}function Fd(e){let t=cs.findIndex(n=>n.step===e);return cs.map((n,r)=>({step:n.step,label:n.label,state:t<0?"todo":r<t?"done":r===t?"stall":"todo"}))}function Gr(e){let t=cs.find(n=>n.step===e);return t?t.label:typeof e=="string"?e:""}function ph(e){let t=cs.findIndex(n=>n.step===e);return t<0?null:{index:t+1,total:cs.length}}function Bi(e){let t=ph(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var bl=new Set(["queued","running","retry_pending"]),Bd=new Set(["failed","succeeded"]),fh={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uC2DC\uB3C4 \uB300\uAE30"},us={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},_h={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:us.base_containment,child_sweep:us.child_sweep,branch_cleanup:us.branch_cleanup,parent_close:us.parent_close};function mh(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function gh(e,t,n){return!["verify","deploy"].includes(e.kind)||![...bl,...Bd].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(r=>r&&typeof r=="object"&&r.bead_id===t&&r.merged_sha===n)}function hh(e,t){let n=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(n!==0)return n;let r=u=>u.state==="succeeded"?1:2,o=r(t)-r(e);if(o!==0)return o;let i=typeof e.requested_at=="number"?e.requested_at:0,s=typeof t.requested_at=="number"?t.requested_at:0;if(i!==s)return s-i;let l=typeof e.operation_id=="string"?e.operation_id:"",a=typeof t.operation_id=="string"?t.operation_id:"";return l.localeCompare(a)}function hl(e,t=!1){let n=e.kind,r=n==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",o=t?"failed":e.state,i=fh[o];if(!i)return null;let s=Fi(n,`${r} ${i}`);return s?{...s,active:bl.has(o),failed:o==="failed"}:null}function bh(e){return!e||typeof e!="object"?null:_h[e.step]||null}function ds(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,n=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},r=bh(n),o=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,i=["post_merge_jobs","child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),s=!i&&(e.cleanup_cursor==="repo_operations"||n.step==="repo_operations"),l=mh(e.merge_sha)?e.merge_sha:null,a=!i&&l&&Array.isArray(e.repo_operations)?e.repo_operations.filter(k=>k&&typeof k=="object"&&gh(k,t,l)).sort(hh):[],u=s?a:[],d=u.find(k=>bl.has(k.state));if(d)return hl(d);if(o)return o.step==="repo_operations"&&a[0]?hl(a[0],!0):null;let m=u.find(k=>Bd.has(k.state)?k.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(m)return hl(m);if(r){let k=Fi(r.step,r.label);return k?{...k,active:!0,failed:!1}:null}let b=typeof e.cleanup_cursor=="string"?us[e.cleanup_cursor]:null;if(!b)return null;let h=Fi(b.step,b.label);return h?{...h,active:!0,failed:!1}:null}function Ui(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var yh="\uBBF8\uC801\uC7AC";function yl(e,t,n,r){if(!n)return`${e} ${t}`;let o=typeof r=="string"&&r.length>0?r:"\uC678\uBD80";return`${e} ${o}/${t}`}function vl(e,t,n){return`${e} \u2014 ${t}${n?" \xB7 \uB2E4\uB978 \uC800\uC7A5\uC18C\uC758 \uC774\uC288\uB77C \uC5EC\uAE30\uC11C \uB2EB\uC744 \uC218 \uC5C6\uB2E4":""}`}function vh(e){if(typeof e!="string"||e.length===0)return;let t=e.replace(/\/+$/,""),n=t.lastIndexOf("/"),r=t.slice(n+1);return r.length>0?r:void 0}function kl(e,t){let n=Gn(e,t.id),r=yl("\u26D3",t.id,n,t.workspace_name);return{id:t.id,label:r,title:vl(r,`\uC120\uD589 \u2014 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4 (${t.location_label})`,n),...n?{foreign:!0}:{}}}var kh=10080*60*1e3;function Ud(e,t,n){let r=t.closed_at;if(typeof r!="number"||!Number.isFinite(r)||r<n-kh)return null;let o=Gn(e,t.id),i=typeof t.root_dir=="string"?t.root_dir:"",s=yl("\u{1F513}",t.id,o,t.workspace_name),l={id:t.id,label:s,title:vl(s,`\uD574\uC81C \u2014 ${ln(r)}\uC5D0 close\uB418\uC5B4 \uC774 \uC774\uC288\uAC00 \uD480\uB838\uB2E4`,o),...o?{foreign:!0}:{}};return o?i.length>0&&(l.openable=!0,l.root_dir=i):l.openable=!0,l}function Wd(e,t,n,r){let o=Gn(e,t),i=yl("\u{1F513}",t,o,n),s={id:t,label:i,title:vl(i,"\uD574\uC81C \u2014 \uB354 \uC774\uC0C1 \uC774 \uC774\uC288\uB97C \uB9C9\uC9C0 \uC54A\uB294\uB2E4 \xB7 \uBCF5\uADC0 \uB300\uAE30",o),...o?{foreign:!0}:{}};return o?typeof r=="string"&&r.length>0&&(s.openable=!0,s.root_dir=r):s.openable=!0,s}function zd(e,t){let n=Array.isArray(t.ids)?t.ids.filter(i=>typeof i=="string"&&i.length>0):[],r=t.root_dirs&&typeof t.root_dirs=="object"?t.root_dirs:{},o=[];for(let i of[...new Set(n)].sort()){let s=Gn(e,i),l=typeof r[i]=="string"?r[i]:"",a={id:i,label:`\u2192 ${i}`,title:"\uD6C4\uC18D \u2014 \uC774 \uC774\uC288\uAC00 close\uB418\uBA74 \uD480\uB9B0\uB2E4",...s?{foreign:!0}:{}};l.length>0?(a.openable=!0,a.root_dir=l):s||(a.openable=!0),o.push(a)}return o}function Hd(e,t,n={}){let r=new Map,o=new Map;for(let i of t)o.has(i.id)||o.set(i.id,i.location_label);for(let[i,s]of e){if(typeof i!="string"||i.length===0)continue;let l=[];for(let a of Array.isArray(s)?s:[]){if(typeof a!="string"||a.length===0)continue;let u=n[a],d=vh(u),m=kl(i,{id:a,location_label:o.get(a)||yh,...d?{workspace_name:d}:{}});m.foreign!==!0?m.openable=!0:typeof u=="string"&&u.length>0&&(m.openable=!0,m.root_dir=u),l.push(m)}l.length>0&&r.set(i,l)}return r}var zi=1,Nd=2e4,ps=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],fs=[{value:"all",label:"\uC804\uCCB4"},{value:"ready",label:"\uCC29\uC218 \uAC00\uB2A5"},{value:"not_ready",label:"\uC900\uBE44 \uD544\uC694"}],_s=[{value:"quick_fix",label:"quick_fix"},{value:"spec_backed",label:"spec_backed"},{value:"full_plan",label:"full_plan"},{value:"unset",label:"unset"}];function Yr(e){if(!Array.isArray(e))return[];let t=new Set(_s.map(r=>r.value)),n=[];for(let r of e)typeof r=="string"&&t.has(r)&&!n.includes(r)&&n.push(r);return n}function Hi(e,t){let n=Yr(e);return n.includes(t)?n.filter(r=>r!==t):Yr([...n,t])}var Eo={show_blocked:!0,readiness:"all",routes:[]},Kd={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328",refuted:"\uBC18\uC99D",no_delta:"\uBB34-delta"};function wh(e,t){let n=null;for(let r of Object.values(e||{}))!r||r.bead_id!==t||!ir(r)||(n=typeof r.status=="string"?r.status:null);return n}function $h(e,t){let n=null,r=-1/0;for(let o of Object.values(e)){if(!o||o.bead_id!==t||o.status==="running"||!ir(o))continue;let i=typeof o.finished_at=="number"?o.finished_at:typeof o.started_at=="number"?o.started_at:0;i>=r&&(r=i,n=o)}return n}function kd(e){let t=Ke(e),n=new Map;for(let r of Array.isArray(t.done)?t.done:[])r&&typeof r.bead_id=="string"&&typeof r.added_at=="number"&&n.set(r.bead_id,r.added_at);return new Set(Jd(Ke(t.attempts),n).keys())}function Jd(e,t,n={}){let{winners:r,resumed_from_ids:o}=zu(e,t),i=new Map;for(let[s,l]of r){let a=l.attempt,u=l.run_state;if(tp(a))continue;let d=l.started_at,m=typeof a.session_id=="string"&&a.session_id.length>0,h=ki(a.quickfix_landing)==="session",k=u!=="running"&&(m||!h)&&!o.has(a.attempt_id),S=!m&&h?"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":o.has(a.attempt_id)?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null,T=Ke(n.observations?.[s]),ee=Ke(T.pr),re=typeof a.merge_sha=="string"&&a.merge_sha.length>0||ee.state==="MERGED",U=ar(n.discard_operations,s,{attempt_id:a.attempt_id,merged:re}),L=u==="failed"?Yd(a,{resume_eligible:k,resume_reason:S,confirmation:U.confirmation,history:n.bead_timelines?.[s]}):null;i.set(s,{...Gd(a,e,u),started_at:d,...L?{failure:L}:{},can_pause:u==="running"&&m,can_resume:k})}for(let[s,l]of Oh(e,t)){if(i.has(s)||l.run_state==="waiting"&&rp(n.admission,s))continue;let a=l.attempt,u=ar(n.discard_operations,s,{attempt_id:a.attempt_id}),d=np(a),m=l.run_state==="provider_hold"?Ch(a,{provider_hold:n.provider_hold,auto_resume_pending:n.auto_resume_pending,account_catalog:n.account_catalog,attempts:e,history:n.bead_timelines?.[s]}):null;i.set(s,{...Gd(a,e,l.run_state),started_at:typeof a.started_at=="number"?a.started_at:null,...l.run_state==="parked"?{failure:Yd(a,{resume_eligible:!1,resume_reason:"\uC138\uC158 \uB300\uAE30 \u2014 [\uC138\uC158\uC5D0\uC11C \uD574\uACB0]\uB85C \uBB38\uC758\uB97C \uC774\uC5B4\uAC11\uB2C8\uB2E4",confirmation:u.confirmation,history:n.bead_timelines?.[s]})}:{},...l.run_state==="waiting"?{wait:xh(a)}:{},...m?{hold:m}:{},...d?{retry:d}:{},can_pause:!1,can_resume:l.run_state==="provider_hold"})}return i}function Gd(e,t,n){return{attempt_id:typeof e.attempt_id=="string"?e.attempt_id:"",run_state:n,last_event_at:typeof e.last_event_at=="number"?e.last_event_at:null,last_activity:e.last_activity&&typeof e.last_activity=="object"?e.last_activity:null,legs:Array.isArray(e.legs)?e.legs:[],runner:typeof e.runner=="string"?e.runner:null,model:typeof e.model=="string"?e.model:null,effort:typeof e.effort=="string"?e.effort:null,speed:typeof e.speed=="string"?e.speed:null,resumed_from:typeof e.resumed_from=="string"?e.resumed_from:null,continuation_mode:e.continuation_mode==="session"||e.continuation_mode==="fresh"?e.continuation_mode:null,status:typeof e.status=="string"?e.status:null,usage:sr(t,e.bead_id)}}function Yd(e,t){let n=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null;return{cause:typeof e.cause=="string"?e.cause:null,cause_detail:n,summary:n&&typeof n.summary=="string"?n.summary:null,bead_id:typeof e.bead_id=="string"?e.bead_id:"",finished_at:typeof e.finished_at=="number"?e.finished_at:null,runner:typeof e.runner=="string"?e.runner:null,model:typeof e.model=="string"?e.model:null,effort:typeof e.effort=="string"?e.effort:null,observed_effort:typeof e.observed_effort=="string"?e.observed_effort:null,speed:typeof e.speed=="string"?e.speed:null,attempt_id:typeof e.attempt_id=="string"?e.attempt_id:"",usage:e.usage&&typeof e.usage=="object"?e.usage:null,halted_auto_advance:e.halted_auto_advance===!0,quickfix_lane:e.quickfix_lane===!0,quickfix_landing:e.quickfix_landing&&typeof e.quickfix_landing=="object"?e.quickfix_landing:null,retry:np(e),resume_eligible:t.resume_eligible,resume_reason:t.resume_reason,landed:Rd(e),confirmation:t.confirmation,...ep(t.history)}}function ep(e){if(!e||typeof e!="object")return{};let t=Array.isArray(e.events)?e.events:[],n=[];for(let o of t)!o||typeof o!="object"||typeof o.summary!="string"||o.summary.length===0||n.push({event_id:typeof o.event_id=="string"?o.event_id:"",kind:typeof o.kind=="string"?o.kind:"",summary:o.summary,at:typeof o.at=="number"?o.at:null});n.reverse();let r=typeof e.log_path=="string"&&e.log_path.length>0?e.log_path:null;return{...n.length>0?{timeline:n}:{},...r===null?{}:{log_path:r},...e.log_expired===!0?{log_expired:!0}:{},...e.log_unreadable===!0?{log_unreadable:!0}:{}}}function xh(e){let t=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null,n=Array.isArray(t?.blockers)?t.blockers:[],r=[];for(let o of n)!o||typeof o!="object"||typeof o.id!="string"||o.id.length===0||r.push({id:o.id,rig:typeof o.rig=="string"?o.rig:null,status:typeof o.status=="string"?o.status:""});return{summary:t&&typeof t.summary=="string"?t.summary:null,blockers:r,since:typeof e.finished_at=="number"?e.finished_at:null}}function tp(e){return e?.status==="paused"&&typeof e.cause=="string"&&e.cause.startsWith("provider_outage:")}function Ah(e,t){let n=typeof e.runner=="string"?e.runner:"",r=Ke(t)[n];return!r||!Array.isArray(r.targets)?null:r.targets.find(o=>Array.isArray(o?.attempt_ids)&&o.attempt_ids.includes(e.attempt_id))||null}function Sh(e,t){if(e===null)return null;let n=Ke(t).claude;if(!Array.isArray(n))return null;let r=n.find(o=>o?.email===e);return r&&typeof r.alias=="string"&&r.alias.length>0?r.alias:null}function Eh(e,t){let n=e,r=new Set;for(;n&&!r.has(n.attempt_id);){if(r.add(n.attempt_id),n.auto_resume_kind==="provider_outage")return!0;n=typeof n.resumed_from=="string"?t[n.resumed_from]:null}return!1}function Th(e,t,n,r){if((Array.isArray(r.auto_resume_pending)?r.auto_resume_pending:[]).some(s=>s?.attempt_id===e.attempt_id))return"pending";let i=e.auto_resume_refused;return typeof i=="string"&&i.length>0?`refused:${i}`:n.startsWith("auto_resume_disarmed:")||t?.auto_switch==="cap"||Eh(e,r.attempts)?"disarmed":null}function Ch(e,t){let n=e.cause.slice(16),r=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null,o=Ah(e,t.provider_hold),i=typeof o?.model=="string"&&o.model.length>0?o.model:typeof e.model=="string"&&e.model.length>0?e.model:null,s=typeof o?.account=="string"&&o.account.length>0?o.account:typeof e.claude_account=="string"&&e.claude_account.length>0?e.claude_account:null,l=typeof o?.last_error=="string"?o.last_error:"",a=Th(e,o,l,{auto_resume_pending:t.auto_resume_pending,attempts:t.attempts}),u=typeof o?.resets_at=="number"?o.resets_at:typeof r?.resets_at=="number"?r.resets_at:null,d=typeof o?.next_probe_at=="number"?o.next_probe_at:null,m=Sh(s,t.account_catalog),b=ep(t.history);return{kind:o?.kind==="usage_limit"||n==="usage_limit"?"usage_limit":"outage",detail:n,...typeof r?.message=="string"?{message:r.message}:{},...typeof r?.summary=="string"?{summary:r.summary}:{},...i||s?{target:{...i?{model:i}:{},...s?{account:s}:{},...m?{account_alias:m}:{}}}:{},...u===null?{}:{resets_at:u},...a===null?{}:{auto_resume:a},...o?.auto_switch==="none"||o?.auto_switch==="disabled"?{auto_switch:o.auto_switch}:{},...d===null?{}:{next_probe_at:d},...b.log_path?{log_path:b.log_path}:{}}}function np(e){let t=e&&e.retry&&typeof e.retry=="object"?e.retry:null;return t?{cause:typeof t.cause=="string"?t.cause:null,attempts:typeof t.attempts=="number"?t.attempts:0,max:typeof t.max=="number"?t.max:0,next_at:typeof t.next_at=="number"?t.next_at:null}:null}var Rh=new Set(["parked","retry_wait","waiting"]);function Oh(e,t){let n=Object.values(e||{}),r=new Set(n.map(s=>s?.resumed_from).filter(s=>typeof s=="string")),o=new Map;for(let s of n)s&&typeof s.bead_id=="string"&&ir(s)&&o.set(s.bead_id,s.attempt_id);let i=new Map;for(let s of n){let l=tp(s);if(!s||typeof s.bead_id!="string"||s.bead_id.length===0||!ir(s)||!Rh.has(s.status)&&!l||o.get(s.bead_id)!==s.attempt_id||typeof s.dismissed_at=="number"||l&&r.has(s.attempt_id))continue;let a=t.get(s.bead_id);typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at||i.set(s.bead_id,{attempt:s,run_state:l?"provider_hold":s.status})}return i}function Vd(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"";if(r==="grace_period")return"";if(r==="prerequisite_unmet"&&Array.isArray(n.blockers)&&n.blockers.length>0)return"\u26D3 \uC120\uD589 \uB300\uAE30";let o=r.indexOf(":");return o>0&&o<r.length-1?`\u26D4 ${r.slice(0,o)} (${r.slice(o+1)})`:`\u26D4 ${r}`}function rp(e,t){let n=Ke(Ke(e)[t]),r=Ke(n.stale_work);return n.reason==="worktree_stale_work"&&typeof r.action_id=="string"&&r.action_id.length>0}function Ke(e){return e&&typeof e=="object"?e:{}}function $l(e){if(typeof e!="string"||e.length===0)return;let t=e.replace(/\/+$/,""),n=t.lastIndexOf("/"),r=t.slice(n+1);return r.length>0?r:void 0}function Ih(e){let t=Ke(e).badge_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function Lh(e,t,n){let r=Ke(t);if(Object.keys(r).length===0)return null;let o=e.execution_defaults,i=e.runner_catalog,s=e.session_defaults;if(!o||!i||!s)return null;let l=b=>On({pin:b,global:s,execution_defaults:o,runner_catalog:i,route:n}),a,u;try{a=l(r),u=l(null)}catch{return null}let d=Qd($o(a,i),$o(u,i)),m=Qd(Br(a,null),Br(u,null));return d||m?{orchestration:d,worker:m}:null}function Qd(e,t){return!e||t&&t.text===e.text?null:e}function Dh(e,t,n){let o=(t&&typeof t=="object"&&Array.isArray(t.released_by)?t.released_by:[]).filter(s=>s&&typeof s=="object"&&typeof s.id=="string").slice().sort((s,l)=>(typeof l.closed_at=="number"?l.closed_at:0)-(typeof s.closed_at=="number"?s.closed_at:0)),i=[];for(let s of o){let l=typeof s.workspace_name=="string"&&s.workspace_name.length>0?s.workspace_name:$l(s.root_dir),a=Ud(e,{...s,...l?{workspace_name:l}:{}},n);a&&i.push(a)}return i.length===0?null:i}function Al(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}var Ph=new Set(["quick_fix","spec_backed","full_plan"]);function Xd(e){return typeof e=="string"&&Ph.has(e)}function Mh(e){let t={...Ke(e.session_defaults)};for(let n of["orchestration_model","orchestration_effort","orchestration_speed","quick_fix_orchestration_model","quick_fix_orchestration_effort","quick_fix_orchestration_speed"]){let r=e[n];typeof r=="string"&&(t[n]=r)}return t}function qh(e,t,n){let r=e.runner_catalog??null,o=xl(e,t,n,null);if(!o)return null;let i=Nn(r,o.orchestration_model.value??""),s=i===null?o:xl(e,t,n,i)||o,l=$o(s,r),a=Br(s,i);return l||a?{orchestration:l,worker:a}:null}function xl(e,t,n,r){let o=Xd(n)?n:Xd(t.route)?t.route:null;try{return On({pin:t,global:Mh(e),execution_defaults:e.execution_defaults??null,runner_catalog:e.runner_catalog??null,route:o,controller_runtime:r})}catch{return null}}function op(e,t,n){return!t||!Object.hasOwn(t,"metadata")?null:Br(xl(e,Ke(t.metadata),t.route,n),n)}function Nh(e,t,n){if(!n)return null;let r=vi(n),o=op(e,t,typeof n.runner=="string"?n.runner:null);return r||o?{orchestration:r,worker:o}:null}function gl(e){if(!e)return null;let t=Ke(e),n=Ke(t.chips),r=typeof n.route=="string"&&n.route.length>0?n.route:typeof t.route=="string"&&t.route.length>0?t.route:"",o=n.route_source==="derived"||t.route_source==="derived";return r.length===0||o?"unset":r}function jh(e){return gl(e.workflow)??"unset"}function Sl(e,t){let n=new Set,r=e;for(;r&&!n.has(r.attempt_id);){if(r.conflict_resolution===!0)return!0;n.add(r.attempt_id),r=typeof r.resumed_from=="string"&&r.resumed_from.length>0&&t.get(r.resumed_from)||null}return!1}function Fh(e){let t={};for(let l of Vn)t[l]=0;let n=!1,r=0,o=0,i=0;for(let l of e){let a=l.usage;if(!a||typeof a!="object")continue;let u=!1;for(let d of Vn)Number.isFinite(a[d])&&(t[d]+=a[d],n=!0,u=!0);u&&(o+=1,Number.isFinite(a.total_cost_usd)&&(r+=a.total_cost_usd,i+=1))}o>0&&i===o&&(t.total_cost_usd=r);let s=e.map(l=>l.usage).filter(l=>l&&typeof l=="object"&&l.providers);return s.length>0?pn(di(s)):n?or(t):null}function sp(e,t){let n=ns(e,t);return n==="internal"?"\uBBF8\uC801\uC7AC":n==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function Bh(e,t,n){let r=t.get(e);if(!r)return sp(e,n);if(typeof r.position=="number"){if(r.lane==="parallel")return`#${r.position}`;if(/^s[1-5]$/.test(r.lane))return`${r.lane} #${r.position}`}return ts(r)}function Uh(e,t,n,r,o,i){let s=t.get(e);if(!s)return{label:i&&ns(e,n)==="internal"?"\uC9C4\uD589 \uB300\uAE30":sp(e,n),title:""};if(s.state==="runnable"&&i&&ns(e,n)==="internal")return{label:"\uC9C4\uD589 \uB300\uAE30",title:""};if(typeof s.position=="number"&&(s.lane==="parallel"||/^s[1-5]$/.test(s.lane))){let a=r.get(e),u=s.lane==="parallel"?"\uBCD1\uB82C":s.lane,d=o.get(e);return{label:!!d&&d.reason==="prerequisite_unmet"&&Array.isArray(d.blockers)&&d.blockers.length>0?"\u26D3 \uC120\uD589 \uB300\uAE30":a&&a.length>0?"\u{1F512} \uB300\uAE30":"\uB300\uAE30",title:`${s.workspace_name||s.root_dir} ${u} #${s.position}`}}return{label:s.state==="running"?"\u25B6 \uC2E4\uD589\uC911":ts(s),title:""}}function Wh(e,t){for(let n of Object.values(e||{}))if(n&&n.attempt_id===t&&typeof n.armed_by_lane=="string"&&n.armed_by_lane.length>0)return n.armed_by_lane;return null}function zh(e,t,n,r,o,i){return t==="draft"?{state:"draft",badge:"draft",run_label:null,can_stop:!1}:n.some(s=>i.failed_by_bead.get(s.id)===e)?{state:"failed",badge:"\u26D4 \uC2E4\uD328",run_label:"\u25B6 \uB2E4\uC2DC \uC9C4\uD589",can_stop:!1}:i.disarmed_lanes.has(e)?{state:"restart",badge:"\u23F8 \uC7AC\uC2DC\uC791",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}:n.some(s=>i.armed_by_bead.get(s.id)===e)?{state:"running",badge:"\u25B6 \uC9C4\uD589 \uC911",run_label:o.length>0?"\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589":null,can_stop:!0}:r?{state:"all_done",badge:"\uBAA8\uB450 \uC644\uB8CC",run_label:null,can_stop:!1}:{state:"confirmed",badge:"\uD655\uC815",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}}function Hh(e,t,n,r,o,i,s,l,a){let u=[];return e.forEach((d,m)=>{let b=typeof d.id=="string"?d.id:"";if(b.length===0)return;let h=d.status==="confirmed"?"confirmed":"draft",k=Array.isArray(d.entries)?d.entries:[],S=[];k.forEach((U,L)=>{let R=U&&typeof U.bead_id=="string"?U.bead_id:"";if(R.length===0)return;let P=U&&typeof U.root_dir=="string"?U.root_dir:"",q=n.get(R),W=q?q.state:void 0,F=W==="running"||W==="pr_wait"||W==="done",D=!q||W==="runnable",V=q&&q.lane==="parallel"&&typeof q.position=="number"?q.position-1:null,j=Uh(R,n,r,t,l,h==="confirmed"),ne=S.length>0?S[S.length-1]:null,me=h==="confirmed"&&ne!==null&&!ne.done&&!(t.get(R)||[]).includes(ne.id),Oe=a.get(R)||null;S.push({id:R,title:o.get(R)||R,route:Oe?Oe.route:null,route_source:Oe?Oe.route_source:null,exec_chips:Oe?Oe.exec_chips:null,added_at:Oe?Oe.added_at:null,root_dir:q?q.root_dir:P,workspace_name:q?q.workspace_name:i.get(P)||"",seq:L+1,location_label:j.label,location_title:j.title,draggable:!F,fixed:F,done:W==="done",unplaced:D,mismatch:me,...V!==null?{queue_index:V}:{}})}),S.forEach((U,L)=>{U.seq=L+1});let T=S.length>0&&S.every(U=>U.done),ee=S.filter(U=>!U.fixed&&s.armed_by_bead.get(U.id)!==b).map(U=>U.id),re=zh(b,h,S,T,ee,s);u.push({lane_id:b,status:h,draft:h==="draft",number:m+1,label:`\uC5F0\uACB0 ${m+1} \xB7 \uB808\uD3EC \uAC04`,rows:S,all_done:T,can_confirm:h==="draft"&&S.length>=2,has_mismatch:h==="confirmed"&&S.some(U=>U.mismatch),unlaunched:ee,...re})}),u}function Kh(e,t,n){if(e.lane==="runnable"){let s=n.get(e.id);return s?s.length===0?{scope:[],state:"missing"}:{scope:s,state:"declared"}:{scope:[],state:void 0}}let r=t.get(e.root_dir),o=r?r[e.id]:void 0;if(!o||!Array.isArray(o.scope))return{scope:[],state:void 0};let i=o.scope.filter(s=>typeof s=="string"&&s.length>0);return{scope:i,state:i.length===0?"missing":"declared"}}function Gh(e,t,n,r,o){let i=new Map;for(let a of[...e.running,...e.queue,...e.runnable,...e.pr_wait]){if(!t.has(a.root_dir))continue;let u=`${a.root_dir}\0${a.id}`,d=i.get(u);if(d){d.cards.push(a);continue}let{scope:m,state:b}=Kh(a,t,n);b!==void 0&&(a.scope_state=b),i.set(u,{cards:[a],scope:m})}let s=new Map;for(let a of i.values()){let u=a.cards[0].scope_state;if(u!==void 0)for(let b of a.cards)b.scope_state=u;if(a.scope.length===0)continue;let d=a.cards[0].root_dir,m=s.get(d);m?m.push(a):s.set(d,[a])}let l=(a,u,d)=>{let m=u.cards[0],b={id:m.id,title:m.title,location_label:Bh(m.id,r,o),prefixes:d,...typeof m.root_dir=="string"&&m.root_dir.length>0?{root_dir:m.root_dir}:{}};for(let h of a.cards)h.overlap_chips?h.overlap_chips.push(b):h.overlap_chips=[b]};for(let a of s.values())for(let u=0;u<a.length;u+=1)for(let d=u+1;d<a.length;d+=1){let m=xi(a[u].scope,a[d].scope);m.length!==0&&(l(a[u],a[d],m),l(a[d],a[u],m))}}function Zd(e,t,n){let r=n?n.get(t)?.root_dir:void 0,o=!Gn(e.id,t),i=typeof e.root_dir=="string"?e.root_dir:"",s=typeof r=="string"&&r.length>0?r:o&&i.length>0?i:"";return s.length>0?{openable:!0,root_dir:s}:o?{openable:!0}:{}}function Yh(e,t,n,r){let o=new Set(e?e.ids:[]);for(let l of t&&Array.isArray(t.ids)?t.ids:[])typeof l=="string"&&l.length>0&&o.add(l);if(o.size===0)return{ids:[]};let i={},s={...e?e.root_dirs:{},...t&&t.root_dirs&&typeof t.root_dirs=="object"?t.root_dirs:{}};for(let l of o){let a=s[l];if(typeof a=="string"&&a.length>0){i[l]=a;continue}if(!Gn(n.id,l)){n.root_dir.length>0&&(i[l]=n.root_dir);continue}let u=r.get(l)?.root_dir;typeof u=="string"&&u.length>0&&(i[l]=u)}return{ids:[...o],root_dirs:i}}function wl(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function Wi(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Vh(e){let t=typeof e=="string"?e.trim().toLowerCase():"";return t.length===0?null:n=>{let r=typeof n.id=="string"?n.id.toLowerCase():"",o=typeof n.title=="string"?n.title.toLowerCase():"";return r.includes(t)||o.includes(t)}}function Qh(e,t){let n=[e.runnable,e.runnable_all,e.queue,e.running,e.pr_wait,e.done,e.parallel_rows];for(let o of e.runnable_sections)n.push(o.items);let r=[];for(let o of e.queue_groups){n.push(o.items,o.sublanes.parallel);for(let i of o.sublanes.serial)n.push(i.items),r.push(i.occupants)}for(let o of n)for(let i of o)i.search_match=t(i);for(let o of r)for(let i of o)i.search_match=t(i)}function $r(e,t,n){let r=Array.isArray(e)?e:[],o=Array.isArray(t)?t:[],i=n&&typeof n.done_since=="number"?n.done_since:void 0,s={...Eo,...n&&n.candidate_filter?n.candidate_filter:{}},l=n&&Object.hasOwn(n,"cross_lanes")?n.cross_lanes??null:void 0,a=n&&n.candidate_sort==="as_given"?"as_given":n&&ps.some($=>$.value===n.candidate_sort)?n.candidate_sort:"repo_spec",u=n&&n.groups==="all"?"all":"nonempty",d=n&&n.candidate_hidden_counts==="per_control"?"per_control":"sequential",m=Date.now(),b=new Map;for(let $ of o)$&&typeof $.root_dir=="string"&&b.set($.root_dir,$);let h=new Map;for(let $ of o)$&&typeof $.root_dir=="string"&&h.set($.root_dir,$.name||$.root_dir);for(let $ of r)$&&typeof $.root_dir=="string"&&h.set($.root_dir,$.name||$.root_dir);let k=[],S=[],T=[],ee=[],re=[],U=[],L=new Map,R=new Map,P=new Map,q=new Map,W=new Map,F=new Map,D=new Map,V=new Map,j=new Map,ne=new Map,me=new Map,Oe=new Map,H=new Map,te=new Map,ce=new Map,Te=new Map,K=new Set,ae=new Map,Q=new Map,de=new Map;for(let $ of r){if(!$||typeof $.root_dir!="string")continue;let Z=$.root_dir,qe=$.name||Z,Se=b.get(Z),De=Se&&typeof Se.revision=="number"?Se.revision:typeof $.revision=="number"?$.revision:0,je=Ke($.attempts),lt=Ke($.bead_titles);for(let[p,f]of Object.entries(lt))typeof f=="string"&&f.length>0&&de.set(p,f);let kt=Ke($.bead_times),se=Ke($.pr_observations),ge=Ke($.admission),Ge=Ke($.blocker_workspaces);Oe.set(Z,Ge);for(let[p,f]of Object.entries(ge))f&&typeof f=="object"&&me.set(p,f);let it=Ke($.revise_parked),ze=Ke($.merge_queue_state),mt=Ke($.cleanup_failed),gt=Ke($.discard_operations),nt=Ke($.bead_timelines),Pe=Ke($.bead_blocked_by);Object.hasOwn($,"bead_scope")&&ae.set(Z,Ke($.bead_scope));let A=Ke($.bead_workflow),N=Ke($.pr_activity),B=Array.isArray($.repo_operations)?$.repo_operations:[];V.set(Z,B);let ke=typeof $.declared_base=="string"?$.declared_base:null;D.set(Z,ke),F.set(Z,Object.entries(mt).map(([p,f])=>({bead_id:p,step:f&&f.step?f.step:"",reason:f&&f.reason?f.reason:"",at:f&&typeof f.at=="number"?f.at:null,detail:f&&typeof f.detail=="string"?f.detail:null,output_tail:f&&typeof f.output_tail=="string"&&f.output_tail?f.output_tail:void 0,log_path:f&&typeof f.log_path=="string"&&f.log_path?f.log_path:void 0,retry_count:f&&typeof f.retry_count=="number"&&Number.isInteger(f.retry_count)&&f.retry_count>0?f.retry_count:0,failure_code:f&&typeof f.failure_code=="string"?f.failure_code:void 0})));for(let[p,f]of Object.entries(Ke($.bead_overlay)))f&&typeof f=="object"&&j.set(`${Z}\0${p}`,f);let ye=new Map;for(let p of Object.values(je))p&&typeof p.attempt_id=="string"&&ye.set(p.attempt_id,p);let pt=Array.isArray($.merge_queue)?$.merge_queue:[],wt=new Set(pt.filter(p=>p&&typeof p.bead_id=="string").map(p=>p.bead_id)),yt=new Map(pt.filter(p=>p&&typeof p.bead_id=="string").map(p=>[p.bead_id,p])),Tt=new Map,jt=new Map,Ut=new Map,Yt=new Map;pt.forEach((p,f)=>{p&&typeof p.bead_id=="string"&&(Tt.set(p.bead_id,f+1),jt.set(p.bead_id,p.resolution),Ut.set(p.bead_id,p.continuation_action||null),Yt.set(p.bead_id,p.authority||null))});let St=Ke($.auto_merge_skips),sn=p=>{let f=St[p];if(!f)return null;let x=Ke(Ke(se[p]).pr).head_sha;return x&&x===f.head_sha?f.reason||"":null};W.set(Z,{positions:Tt,resolutions:jt,continuations:Ut,authorities:Yt,state:{active:typeof ze.active=="string"?ze.active:null,failures:Ke(ze.failures),waiting:ze.waiting&&typeof ze.waiting.bead_id=="string"&&typeof ze.waiting.reason=="string"?ze.waiting:null},auto_excluded:(Array.isArray($.pr_wait)?$.pr_wait:[]).map(p=>p&&p.bead_id).filter(p=>typeof p=="string"&&sn(p)!==null),running:pt.length>0});let Wt=Array.isArray($.queue)?$.queue:[];for(let p of[...Wt,...Array.isArray($.pr_wait)?$.pr_wait:[]])p&&typeof p.bead_id=="string"&&typeof p.armed_by_lane=="string"&&p.armed_by_lane.length>0&&ce.set(p.bead_id,p.armed_by_lane);for(let p of Array.isArray($.disarmed_on_load)?$.disarmed_on_load:[])typeof p=="string"&&p.length>0&&K.add(p);let Pt=(Array.isArray($.serial_lanes)?$.serial_lanes:[]).filter(p=>p&&/^s[1-5]$/.test(p.id)&&Array.isArray(p.entries)),Ft=Ke($.lane_states),zt=typeof $.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor($.serial_lane_count))):Math.min(5,Pt.length);P.set(Z,zt),q.set(Z,Wt.length);let xe=new Map(Pt.map(p=>[p.id,p])),E=new Map;for(let p of Pt)for(let f of p.entries)f&&typeof f.bead_id=="string"&&E.set(f.bead_id,p.id);for(let[p,f]of Object.entries(Ke($.bead_dependents))){let x=Array.isArray(f?.ids)?f.ids:[],_=Ke(f?.root_dirs),g=te.get(p)||{ids:new Set,root_dirs:{}};for(let O of x)typeof O=="string"&&O.length>0&&g.ids.add(O);for(let[O,z]of Object.entries(_))typeof z=="string"&&z.length>0&&(g.root_dirs[O]=z);te.set(p,g)}for(let[p,f]of Object.entries(Pe))Array.isArray(f)&&ne.set(p,f.filter(x=>typeof x=="string"&&x.length>0));let he=Array.isArray($.done)?$.done:[];for(let p of he)p&&typeof p.bead_id=="string"&&U.push({id:p.bead_id,root_dir:Z,workspace_name:qe});let Le=new Map;for(let p of he)p&&typeof p.bead_id=="string"&&typeof p.added_at=="number"&&Le.set(p.bead_id,p.added_at);let ot=p=>({id:p,title:lt[p]||p,root_dir:Z,workspace_name:qe,expected_revision:De,draggable:!1,...Ke(kt[p]).created_at?{created_at:Ke(kt[p]).created_at}:{},...Ke(kt[p]).updated_at?{updated_at:Ke(kt[p]).updated_at}:{}}),Ve=p=>{let f=A[p]?.chips?.pr;return f&&typeof f.number=="number"&&typeof f.url=="string"?{pr_number:f.number,pr_url:f.url}:{}},$t=p=>Object.hasOwn(Pe,p)?{blocked_by:Array.isArray(Pe[p])?Pe[p].filter(f=>typeof f=="string"&&f.length>0):[]}:{},It=(p,f)=>{let x=$t(p),_=ge[p],g=_&&_.reason==="prerequisite_unmet"&&Array.isArray(_.blockers)?_.blockers:[],O=(f?.blockers||[]).map(Ae=>Ae.id).filter(Ae=>typeof Ae=="string"&&Ae.length>0);if(f&&Object.hasOwn(Pe,p)){let Ae=x.blocked_by||[],He=O.filter(xt=>!Ae.includes(xt));return He.length>0&&H.set(`${Z}\0${p}`,He),{blocked_by:Ae,wait:{...f,returning:Ae.length===0}}}let z=[...O,...g.map(Ae=>Ae.id)].filter(Ae=>typeof Ae=="string"&&Ae.length>0);if(z.length===0)return f?{...x,wait:{...f,returning:!1}}:x;let ue=[...x.blocked_by||[]];for(let Ae of z)ue.includes(Ae)||ue.push(Ae);return{blocked_by:ue,...f?{wait:{...f,returning:!1}}:{}}},Et=new Set;for(let[p,f]of Jd(je,Le,{discard_operations:gt,observations:se,bead_timelines:nt,provider_hold:Ke($.provider_hold),auto_resume_pending:Array.isArray($.auto_resume_pending)?$.auto_resume_pending:[],account_catalog:Ke($.account_catalog),admission:ge})){Et.add(p);let x=f.run_state==="failed"?Wh(je,f.attempt_id):null;x!==null&&Te.set(p,x);let _=ye.get(f.attempt_id)||null,g=j.get(`${Z}\0${p}`),O=g&&g.rollup?g.rollup:null,z=Al(ke,_?_.target_base:null),ue=_?Sl(_,ye):!1,Ae=_&&_.quickfix_lane===!0&&_.quickfix_landing&&typeof _.quickfix_landing=="object"?_.quickfix_landing:null,He=Ae&&typeof Ae.reason=="string"&&Ae.reason.length>0?Ae.reason:null,xt=Ae?ds({bead_id:p,merge_sha:Ae.head_sha,cleanup_cursor:Ae.cursor,cleanup_failed:He?{step:Ae.cursor,reason:He}:null,repo_operations:B}):null,Qt=It(p,f.wait);S.push({...ot(p),lane:"running",...Qt,...E.has(p)?{serial_lane_id:E.get(p)}:{},attempt_id:f.attempt_id,run_state:f.run_state,status:f.status||void 0,workflow:A[p]||null,can_pause:f.can_pause,can_resume:f.can_resume,started_at:f.started_at,last_event_at:f.last_event_at,last_activity:f.last_activity,legs:f.legs,runner:f.runner,model:f.model,effort:f.effort,speed:f.speed,resumed_from:f.resumed_from,continuation_mode:f.continuation_mode,usage:f.usage,failure:f.failure||null,hold:f.hold||null,wait:Qt.wait||f.wait||null,retry:f.retry||null,exec_chips:{orchestration:vi(f),worker:op(Ke(Se),g,f.runner||null)},discard:ar(gt,p,{attempt_id:f.attempt_id,merged:f.failure?.confirmation==="merged"||Ke(se[p]).pr?.state==="MERGED"}),...O?{rollup:O}:{},...ue?{conflict_resolution:!0}:{},...z?{base_exception:z}:{},...xt?{landing:xt}:{},badges:f.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:f.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:f.run_state==="parked"?["\u23F8 \uC138\uC158 \uB300\uAE30"]:f.run_state==="retry_wait"?["\u21BB \uC7AC\uC2DC\uB3C4 \uB300\uAE30"]:f.run_state==="waiting"?["\u26D3 \uC120\uD589 \uB300\uAE30"]:f.run_state==="provider_hold"?["\uACF5\uAE09\uC790 \uBCF4\uB958"]:[],alert:f.run_state==="failed"})}for(let[p,f]of Wu(je)){if(S.some(_=>_.id===p))continue;let x=f.attempt;S.push({...ot(p),lane:"running",kind:"session",...$t(p),attempt_id:typeof x.attempt_id=="string"?x.attempt_id:"",run_state:"running",status:"running",non_occupying:!0,workflow:A[p]||null,can_pause:!1,can_resume:!1,started_at:f.started_at,last_event_at:typeof x.last_event_at=="number"?x.last_event_at:null,last_activity:x.last_activity&&typeof x.last_activity=="object"?x.last_activity:null,legs:Array.isArray(x.legs)?x.legs:[],runner:typeof x.runner=="string"?x.runner:null,model:typeof x.model=="string"?x.model:null,effort:typeof x.effort=="string"?x.effort:null,speed:typeof x.speed=="string"?x.speed:null,resumed_from:null,continuation_mode:null,usage:x.usage&&typeof x.usage=="object"?x.usage:null,exec_chips:{orchestration:vi(x),worker:null},discard:ar(gt,p,{merge_queued:!0}),badges:[f.origin==="auto"?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"],alert:!1})}for(let p of Array.isArray($.session_active)?$.session_active:[]){let f=p&&p.bead_id;typeof f!="string"||Et.has(f)||(Et.add(f),Array.isArray(p.blocked_by)&&p.blocked_by.length>0&&ne.set(f,p.blocked_by.filter(x=>typeof x=="string"&&x.length>0)),typeof p.title=="string"&&p.title.length>0&&de.set(f,p.title),S.push({...ot(f),title:p.title||lt[f]||f,lane:"running",kind:"session",status:"in_progress",started_at:wl(p.started_at)??wl(p.updated_at)??void 0,updated_at:wl(p.updated_at)??void 0,workflow:p.workflow||null,labels:Array.isArray(p.labels)?p.labels:[],spec_id:typeof p.spec_id=="string"?p.spec_id:"",blocked:p.blocked===!0,...Array.isArray(p.blocked_by)?{blocked_by:p.blocked_by.filter(x=>typeof x=="string"&&x.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,session_refs:Array.isArray(p.session_refs)?p.session_refs:[],badges:[],alert:!1}))}for(let p of Array.isArray($.pr_wait)?$.pr_wait:[]){let f=p&&p.bead_id;if(typeof f!="string"||Et.has(f))continue;Et.add(f);let x=Ke(se[f]),_=Ke(x.pr),g=x.gate?Ke(x.gate):null,O=wt.has(f),z=yt.get(f)?.continuation_action||null,ue=!!z&&z.continuation===null,Ae=ze.active===f,He=p.external===!0,xt=mt[f]||null,Qt=Ke(N[f]),an=ds({bead_id:f,merge_sha:p.merge_sha,cleanup_cursor:p.cleanup_cursor,merge_progress:Qt.merge_progress||null,cleanup_failed:xt,repo_operations:B}),xn=Ui(an),Vt=!!g&&g.base_badge==="\uCDA9\uB3CC",Jt=!!xt&&["post_merge_jobs","child_sweep","branch_cleanup","parent_close"].includes(xt.step)&&!!g&&g.tier==="merged",en=He&&!!xt&&!!g&&g.tier==="merged",eo=!!g&&["closed_unmerged","review","undecidable"].includes(g.tier),Tn=ar(gt,f,{external:He,merge_active:Ae||an?.step==="merge",merge_queued:O,cleanup_active:xn,merged:!!xt||g?.tier==="merged"}),to=!!Tn.operation,Rr=Ih(x.receipt_check);T.push({...ot(f),lane:"pr_wait",...$t(f),...Rr.length>0?{receipt_badge:{codes:Rr}}:{},workflow:A[f]||null,pr_number:typeof _.number=="number"?_.number:null,pr_url:typeof _.url=="string"?_.url:void 0,external:He,usage:sr(je,f),merge_step:an,badges:ue?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:an?[g?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:xt?[Gr(xt.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Gr(xt.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof g?.gate_badge=="string"&&g.gate_badge.length>0?[g.gate_badge]:[],alert:an?an.failed===!0:!!xt||eo,reason:xt&&an?.active!==!0?Bi(xt.step):"PR \uB300\uAE30",merge_action:g?.tier==="merged"&&!Jt&&!en?!1:!O||ue,merge_enabled:!to&&(ue||g?.enabled===!0||Vt||Jt||en),merge_label:ue?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":en||Jt?"\uC815\uB9AC \uC7AC\uC2DC\uB3C4":Vt&&!Jt?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:ue?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":to?Tn.error?`\uD3D0\uAE30 \uC2E4\uD328: ${Tn.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${Tn.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:en?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":Jt?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":Vt?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":g?.enabled===!0?`\uBA38\uC9C0 (${g.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${g?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:O&&!ue,cancel_enabled:!Ae,continuation_mismatch:z?.mismatch||null,discard:Tn,discard_action:Tn.action,discard_enabled:Tn.enabled,discard_title:Tn.title})}let Kt=(p,f,x,_)=>{let g=p&&p.bead_id;if(typeof g!="string"||Et.has(g))return null;Et.add(g);let O=it[g],z=ar(gt,g),ue=z.operation?z:null,Ae={...ot(g),lane:f,...typeof p.added_at=="number"?{added_at:p.added_at}:{},workflow:A[g]||null,draggable:!ue,discard:ue||void 0,reason:Vd(ge,g),seq:x+1,queue_position:x+1,queue_index:x,queue_length:_,badges:O?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!O,revise_action:!!O,revise_enabled:!!O&&!ue,revise_title:O?O.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${O.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""},He=It(g,null);return Object.hasOwn(He,"blocked_by")&&(Ae.blocked_by=He.blocked_by),Ae};for(let p=0;p<Wt.length;p++){let f=Kt(Wt[p],"queue",p,Wt.length);if(!f)continue;ee.push(f);let x=L.get(Z);x?x.push(f):L.set(Z,[f])}let _n=p=>{let f=T.find(O=>O.id===p&&O.root_dir===Z);if(f)return{id:p,title:f.title,badge:"PR \uB300\uAE30 \xB7 \uC810\uC720"};let x=S.find(O=>O.id===p&&O.root_dir===Z),_=x?x.run_state:wh(je,p),g=_==="failed"||_==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":_==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720";return{id:p,title:x?x.title:ot(p).title,badge:g}},Lt=[];for(let p=0;p<Math.max(zt,Pt.length);p++){let f=`s${p+1}`,x=xe.get(f),_=x&&Array.isArray(x.entries)?x.entries:[],g=Ke(Ft[f]),O=Array.isArray(g.occupied_by)?g.occupied_by.filter(He=>typeof He=="string"):[],z=new Set(O),ue=new Set(_.map(He=>He?.bead_id).filter(He=>typeof He=="string"&&z.has(He)&&rp(ge,He))),Ae=[];for(let He=0;He<_.length;He++){let xt=_[He]&&_[He].bead_id;if(typeof xt=="string"&&z.has(xt)&&!ue.has(xt)){Et.add(xt);continue}let Qt=Kt(_[He],f,He,_.length);Qt&&(typeof xt=="string"&&ue.has(xt)&&(Qt.badges=[_n(xt).badge,...Qt.badges||[]]),Ae.push(Qt),ee.push(Qt))}Ae.length===0&&O.length===0&&(zt<=1||p>=zt)||Lt.push({id:f,index:p,items:Ae,raw_length:_.length,occupied_by:O,occupants:O.filter(He=>!ue.has(He)).map(He=>_n(He)),corrections:Array.isArray(g.corrections)?g.corrections.length:0,cycle:g.cycle===!0,...Ae.length===0&&O.length===0?{empty:!0}:{}})}R.set(Z,Lt);let hn=Array.from({length:zt},(p,f)=>{let x=`s${f+1}`,_=xe.get(x),g=_&&Array.isArray(_.entries)?_.entries:[],O=Ke(Ft[x]);return{id:x,index:g.length,length:g.length,occupied_by:Array.isArray(O.occupied_by)?O.occupied_by.filter(z=>typeof z=="string"):[]}});for(let p of Array.isArray($.runnable)?$.runnable:[]){let f=p&&p.bead_id;if(typeof f!="string"||Et.has(f))continue;Et.add(f);let x=p.workflow&&typeof p.workflow=="object"?p.workflow:null,_=x&&typeof x.route=="string"&&x.route||(typeof p.route=="string"?p.route:null),g=Lh(Ke(Se),p.exec_pins,_),O=es(p.rec,p.exec_pins);Array.isArray(p.blocked_by)&&p.blocked_by.length>0&&ne.set(f,p.blocked_by.filter(en=>typeof en=="string"&&en.length>0)),typeof p.title=="string"&&p.title.length>0&&de.set(f,p.title),Array.isArray(p.scope)&&Q.set(f,p.scope.filter(en=>typeof en=="string"&&en.length>0));let z=Object.hasOwn(p,"eligible"),Ae=!z&&Object.hasOwn(p,"route")&&Object.hasOwn(p,"spec_state")&&Object.hasOwn(p,"has_description")&&Object.hasOwn(p,"awaiting_user")&&Object.hasOwn(p,"worker_ineligible")?al({route:typeof p.route=="string"?p.route:"",spec:p.spec_state,has_description:p.has_description===!0,awaiting_user:p.awaiting_user===!0,worker_ineligible:p.worker_ineligible===!0},null):null,He=z?p.eligible!==!1:Ae?Ae.placeable:!0,xt=Ae?Ae.worker_ineligible:p.worker_ineligible===!0,Qt=He&&!xt,an=Ae?{route_ok:Ae.route_ok,awaiting_user:Ae.awaiting_user,missing_description:Ae.missing_description,placement_spec:Ae.spec}:Object.hasOwn(p,"route_ok")?{route_ok:p.route_ok===!0,awaiting_user:p.awaiting_user===!0,missing_description:p.missing_description===!0,placement_spec:p.placement_spec}:null,xn=[];!z&&Ae&&!Ae.placeable&&xn.push(Wr(Ae)),typeof p.reason=="string"&&p.reason.length>0&&xn.push(p.reason);let Vt=Vd(ge,f);Vt&&xn.push(Vt);let Jt=Dh(f,p.release_info,m)?.map(en=>({...en,...Zd({id:f,root_dir:Z},en.id)}));k.push({...ot(f),title:p.title||lt[f]||f,lane:"runnable",draggable:!z&&Qt,queue_placeable:Qt,...an||{},...xt?{worker_ineligible:!0}:{},...p.session_preferred===!0?{session_preferred:!0,session_preferred_reason:typeof p.session_preferred_reason=="string"?p.session_preferred_reason:""}:{},...p.spec_after_blocker===!0?{spec_after_blocker:!0}:{},...Jt?{dependency_chips:{released:Jt}}:{},...p.dependents_info&&typeof p.dependents_info=="object"?{dependents_info:p.dependents_info}:{},reason:xn.join(" \xB7 "),created_at:p.created_at??void 0,updated_at:p.updated_at??void 0,status:typeof p.status=="string"?p.status:void 0,labels:Array.isArray(p.labels)?p.labels:[],spec_id:typeof p.spec_id=="string"?p.spec_id:"",published:p.published===!0,workflow:x||(_?{route:_,chips:{route:_}}:null),...g?{exec_chips:g}:{},...O?{rec:O}:{},blocked:p.blocked===!0,...Array.isArray(p.blocked_by)?{blocked_by:p.blocked_by.filter(en=>typeof en=="string"&&en.length>0)}:{},place_index:Wt.length,place_lanes:hn})}for(let p of he){let f=p&&p.bead_id;if(typeof f!="string"||Et.has(f)||(Et.add(f),i!==void 0&&typeof p.added_at=="number"&&p.added_at<i))continue;let x=$h(je,f),_=x&&typeof x.done_kind=="string"?x.done_kind:null,g=Nh(Ke(Se),j.get(`${Z}\0${f}`),x);re.push({...ot(f),lane:"done",done:!0,workflow:A[f]||null,...g?{exec_chips:g}:{},done_layout:"three_line",usage:sr(je,f),work_ms:Ed(je,f),done_at:typeof p.added_at=="number"?p.added_at:void 0,done_kind:_,...Ve(f),badges:[..._&&Kd[_]?[Kd[_]]:[],...Ad(je,f)]})}for(let p of Array.isArray($.session_done)?$.session_done:[]){let f=p&&(p.id||p.bead_id);typeof f!="string"||Et.has(f)||(Et.add(f),re.push({...ot(f),...p,id:f,root_dir:Z,workspace_name:qe,expected_revision:De,lane:"done",done:!0}))}}if(j.size>0)for(let $ of[...k,...ee,...S,...T,...re]){let Z=j.get(`${$.root_dir}\0${$.id}`);if(!Z)continue;typeof Z.priority=="number"&&($.priority=Z.priority),typeof Z.from_id=="string"&&Z.from_id.length>0&&($.from_id=Z.from_id),$.lane==="done"&&Array.isArray(Z.carried_to)&&Z.carried_to.length>0&&($.carried_to=Z.carried_to);let qe=Ke($.workflow),Se=Ke(qe.chips);if(!Se.route&&!qe.route&&typeof Z.route=="string"&&Z.route.length>0&&($.workflow={...qe,route:Z.route,chips:{...Se,route:Z.route}}),!Object.hasOwn(Z,"metadata"))continue;let De=Ke(Z.metadata);if($.rec=es(De),$.lane==="runnable"||$.lane.startsWith("s")||$.lane==="queue"){let je=qh(Ke(b.get($.root_dir)),De,typeof Z.route=="string"&&Z.route.length>0?Z.route:Ke($.workflow).route);je&&($.exec_chips=je)}}let Re=new Map;o.forEach(($,Z)=>{$&&typeof $.root_dir=="string"&&Re.set($.root_dir,Z)});let be=n&&n.running_sort==="repo"?"repo":"started";S.sort(($,Z)=>{let qe=$.kind==="session",Se=Z.kind==="session";if(qe!==Se)return qe?1:-1;if(qe&&Se){let lt=Wi(Z.updated_at)-Wi($.updated_at);return lt!==0?lt:$.id.localeCompare(Z.id)}if(be==="repo"){let lt=Re.get($.root_dir)??Number.MAX_SAFE_INTEGER,kt=Re.get(Z.root_dir)??Number.MAX_SAFE_INTEGER;if(lt!==kt)return lt-kt}let De=typeof $.started_at=="number"&&Number.isFinite($.started_at)?$.started_at:null,je=typeof Z.started_at=="number"&&Number.isFinite(Z.started_at)?Z.started_at:null;return De!==null&&je!==null&&De!==je?De-je:De===null&&je!==null?1:De!==null&&je===null?-1:$.id.localeCompare(Z.id)}),re.sort(($,Z)=>(Z.done_at??0)-($.done_at??0));let Ie=o.length>0?o:r.map($=>({root_dir:$&&$.root_dir,name:$&&$.name,auto_advance:$&&$.auto_advance,auto_merge:$&&$.auto_merge,slots:$&&$.slots,revision:$&&$.revision,runner_catalog:$&&$.runner_catalog})),Ye=new Set(k.map($=>$.root_dir)),_t=new Map;for(let $ of S)$.kind==="session"||$.run_state!=="running"||_t.set($.root_dir,(_t.get($.root_dir)||0)+1);let G=new Map;for(let $ of re){let Z=G.get($.root_dir);Z?Z.push($):G.set($.root_dir,[$])}let pe={positions:new Map,resolutions:new Map,continuations:new Map,authorities:new Map,state:{active:null,failures:{},waiting:null},auto_excluded:[],running:!1},oe=[];for(let $ of Ie){if(!$||typeof $.root_dir!="string")continue;let Z=L.get($.root_dir)||[],qe=R.get($.root_dir)||[],Se=Z.length>0||qe.some(lt=>lt.items.length>0||lt.occupied_by.length>0);if(u!=="all"&&!Se&&!Ye.has($.root_dir))continue;let De=typeof $.slots=="number"&&$.slots>=zi?$.slots:zi,je=_t.get($.root_dir)||0;oe.push({live_count:je,over_cap:je>De,merge:W.get($.root_dir)||pe,token_total:Fh(G.get($.root_dir)||[]),cleanup_failures:F.get($.root_dir)||[],declared_base:D.get($.root_dir)??null,repo_operations:V.get($.root_dir)||[],root_dir:$.root_dir,name:$.name||$.root_dir,auto_advance:$.auto_advance===!0,auto_merge:$.auto_merge===!0,slots:De,revision:typeof $.revision=="number"?$.revision:0,runner_catalog:Ke($.runner_catalog),items:Z,sublanes:{parallel:Z,serial:qe},serial_lane_count:P.get($.root_dir)||0,raw_queue_length:q.get($.root_dir)||0})}let Y={runnable:k,runnable_all:k,runnable_hidden:{blocked:0,readiness:0,route:0},runnable_sections:[],runnable_flat:a==="updated_flat"||a==="as_given",queue:ee,queue_groups:oe,running:S,pr_wait:T,done:re,parallel_rows:[],chain_lanes:[],cross_lanes_revision:l&&typeof l.revision=="number"?l.revision:null,cross_lanes_unreadable:l===null,parallel_raw_length:Object.fromEntries(q),owner_of:{}},we=pd(Y);for(let $ of U)we.has($.id)||we.set($.id,{root_dir:$.root_dir,workspace_name:$.workspace_name,lane:"done",state:"done"});for(let $ of[...Y.queue,...Y.runnable,...Y.running,...Y.pr_wait]){if(!Object.hasOwn($,"blocked_by"))continue;let Z=we.get($.id),qe=Oe.get($.root_dir)||{};$.blockers=($.blocked_by||[]).map(Se=>{let De=we.get(Se)?.workspace_name||$l(qe[Se]);return{...fd(Se,Z,we,o),...De?{workspace_name:De}:{}}})}for(let $ of[...Y.queue,...Y.runnable,...Y.running,...Y.pr_wait]){let Z=($.blockers||[]).map(lt=>({...kl($.id,lt),...Zd($,lt.id,we)})),qe=Oe.get($.root_dir)||{},Se=(H.get(`${$.root_dir}\0${$.id}`)||[]).map(lt=>{let kt=we.get(lt),se=kt?.root_dir||qe[lt];return Wd($.id,lt,kt?.workspace_name||$l(se),se)}),De=zd($.id,Yh(te.get($.id),$.dependents_info,$,we));if(Z.length===0&&Se.length===0&&De.length===0)continue;let je={...$.dependency_chips||{},...Z.length>0?{predecessors:Z}:{},...Se.length>0?{released:Se}:{},...De.length>0?{dependents:De}:{}};$.dependency_chips=je}Gh(Y,ae,Q,we,o);let fe=_d(Y.queue_groups);for(let $ of Y.queue_groups)for(let Z of $.sublanes.serial){let qe=fe.get(md($.root_dir,Z.id));qe&&(Z.cross_wait_peers=qe)}let Ce=new Map;for(let $ of[...Y.queue,...Y.running,...Y.pr_wait,...Y.done,...Y.runnable]){if(Ce.has($.id))continue;let Z=Ke($.workflow),qe=Ke(Z.chips),Se=j.get(`${$.root_dir}\0${$.id}`),De=(typeof qe.route=="string"&&qe.route.length>0?qe.route:typeof Z.route=="string"&&Z.route.length>0?Z.route:Se&&typeof Se.route=="string"&&Se.route.length>0?Se.route:null)||null,je=typeof qe.route_source=="string"?qe.route_source:typeof Z.route_source=="string"?Z.route_source:null;Ce.set($.id,{route:De,route_source:je,exec_chips:$.exec_chips||null,added_at:typeof $.added_at=="number"?$.added_at:null})}Y.chain_lanes=Hh(l&&Array.isArray(l.lanes)?l.lanes:[],ne,we,o,de,h,{armed_by_bead:ce,failed_by_bead:Te,disarmed_lanes:K},me,Ce);let Ne=new Map;for(let $ of[...Y.queue,...Y.runnable])Ne.has($.id)||Ne.set($.id,$);let Qe=new Set;for(let $ of Y.chain_lanes)for(let Z of $.rows){if($.status==="confirmed"&&!Z.unplaced&&!Z.fixed&&Qe.add(Z.id),!$.draft&&!Z.unplaced)continue;let qe=Ne.get(Z.id);qe&&(qe.cross_lane_chip={lane_id:$.lane_id,number:$.number,status:$.status,label:$.draft?`\uC5F0\uACB0 ${$.number} (draft)`:`\uC5F0\uACB0 ${$.number}`})}let Fe=new Map(Y.chain_lanes.map($=>[$.lane_id,$]));for(let $ of[...Y.queue,...Y.running]){let Z=ce.get($.id);if(typeof Z!="string"||Z.length===0)continue;let qe=Fe.get(Z);$.armed_lane_chip=qe===void 0||qe.status==="draft"?{lane_id:Z,label:"\u25B6 \uC9C4\uD589 \uC911 \xB7 \uB808\uC778 \uC5C6\uC74C",orphan:!0}:{lane_id:Z,label:`\u25B6 \uC5F0\uACB0 ${qe.number}`,orphan:!1}}let J=[];for(let $ of L.values())for(let Z of $)Qe.has(Z.id)||J.push(Z);J.sort(($,Z)=>{let qe=$.workspace_name.localeCompare(Z.workspace_name);return qe!==0?qe:($.queue_index??0)-(Z.queue_index??0)}),Y.parallel_rows=J;let X={};for(let[$,Z]of we)typeof Z.root_dir=="string"&&Z.root_dir.length>0&&(X[$]=Z.root_dir);for(let $ of Y.chain_lanes)for(let Z of $.rows)!Object.hasOwn(X,Z.id)&&Z.root_dir.length>0&&h.has(Z.root_dir)&&(X[Z.id]=Z.root_dir);Y.owner_of=X;let Ee=Y.runnable.length;Y.runnable_all=Y.runnable.slice();let Je=Y.runnable,st=$=>s.show_blocked||$.blocked!==!0,Ue=$=>s.readiness==="all"||(s.readiness==="ready"?$.queue_placeable===!0:$.queue_placeable!==!0),et=Yr(s.routes),vt=$=>et.length===0||et.includes(jh($));if(d==="per_control"){let $=[],Z=0,qe=0,Se=0;for(let De of Je){let je=st(De),lt=Ue(De),kt=vt(De);if(je&&lt&&kt){$.push(De);continue}(je?0:1)+(lt?0:1)+(kt?0:1)>1||(je?lt?Se+=1:qe+=1:Z+=1)}Je=$,Y.runnable_hidden={blocked:Z,readiness:qe,route:Se}}else{Je=Je.filter(st);let $=Je.length;Je=Je.filter(Ue);let Z=Je.length;Je=Je.filter(vt),Y.runnable_hidden={blocked:Ee-$,readiness:$-Z,route:Z-Je.length}}let ut=($,Z)=>{let qe=Wi(Z.updated_at)-Wi($.updated_at);return qe!==0?qe:$.id.localeCompare(Z.id)},dt=a==="repo_spec"?($,Z)=>{let qe=$.queue_placeable===!0?0:1,Se=Z.queue_placeable===!0?0:1;if(qe!==Se)return qe-Se;let De=$.published===!0?0:1,je=Z.published===!0?0:1;return De!==je?De-je:ut($,Z)}:ut;if(a==="as_given")Y.runnable=Je,Y.runnable_sections=[];else if(a==="updated_flat")Y.runnable=Je.slice().sort(ut),Y.runnable_sections=[];else{let $=new Map;for(let Se of Je){let De=$.get(Se.root_dir);De?De.push(Se):$.set(Se.root_dir,[Se])}let Z=[],qe=[];for(let Se of Ie){if(!Se||typeof Se.root_dir!="string")continue;let De=($.get(Se.root_dir)||[]).slice().sort(dt);$.delete(Se.root_dir),De.length!==0&&(Z.push({root_dir:Se.root_dir,name:Se.name||Se.root_dir,items:De.map(je=>({...je,workspace_name:""}))}),qe.push(...De))}for(let[Se,De]of $){let je=De.slice().sort(dt);Z.push({root_dir:Se,name:je[0]?.workspace_name||Se,items:je.map(lt=>({...lt,workspace_name:""}))}),qe.push(...je)}Y.runnable=qe,Y.runnable_sections=Z}let Zt=Vh(n?n.search:void 0);return Zt&&Qh(Y,Zt),Y}function ip(e,t){let n=new Map(e.map((a,u)=>[a,u])),r=new Map(e.map(a=>[a,new Set]));for(let a of t)a.blocker!==a.blockee&&n.has(a.blocker)&&n.has(a.blockee)&&r.get(a.blockee).add(a.blocker);let o=new Set,i=[];for(;i.length<e.length;){let a=e.find(u=>{if(o.has(u))return!1;for(let d of r.get(u))if(!o.has(d))return!1;return!0});if(a===void 0)return{order:[...e],corrections:[],cycle:!0};o.add(a),i.push(a)}let s=[],l=new Map(i.map((a,u)=>[a,u]));for(let a of i){let u=null;for(let d of r.get(a)){let m=Number(n.get(a))<Number(n.get(d)),b=Number(l.get(a))>Number(l.get(d));m&&b&&(u===null||Number(l.get(d))>Number(l.get(u)))&&(u=d)}u!==null&&s.push({bead_id:a,after:u})}return{order:i,corrections:s,cycle:!1}}var Xh="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",Ki="\uC758\uC874 \uC790\uB8CC \uBBF8\uD655\uC815 \u2014 \uAD50\uC815 \uBCF4\uB958",Zh="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694",Jh="\uC774\uBBF8 \uC9C4\uD589 \uC911\uC778 \uC774\uC288 \uC55E\uC5D0\uB294 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",To="\uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";function ms(e,t){return`${e}\0${t}`}function eb(e,t){let n=new Set(e),r=new Map;for(let o of e){let i=t.placed_members.has(o)?t.snapshot_blocked_by:t.runnable_blocked_by,s=i instanceof Map?i.get(o):void 0;if(!Array.isArray(s))return null;r.set(o,s.filter(l=>l!==o&&n.has(l)))}return r}function tb(e,t){if(e.status!=="confirmed")return 0;let n=-1;return e.entries.forEach((r,o)=>{t.fixed_members.has(r.bead_id)&&(n=o)}),n+1}function bs(e,t){let n=e.entries,r=n.map(m=>m.bead_id),o=eb(r,t);if(o===null)return{entries:n,corrections:[],cycle:!1,held:!0,mismatched:[]};let i=[];for(let[m,b]of o)for(let h of b)i.push({blocker:h,blockee:m});let s=tb(e,t),l=new Map(r.map((m,b)=>[m,b])),a=r.slice(0,s).filter(m=>o.get(m).some(b=>Number(l.get(b))>Number(l.get(m)))),u=ip(r.slice(s),i);if(u.cycle)return{entries:n,corrections:[],cycle:!0,held:!1,mismatched:a};let d=new Map(n.map(m=>[m.bead_id,m]));return{entries:[...n.slice(0,s),...u.order.map(m=>d.get(m))],corrections:u.corrections,cycle:!1,held:!1,mismatched:a}}function lp(e,t){let n=t.cross_lanes.get(e);return n===void 0?null:bs(n,t)}function nb(e,t){if(!(t.corrections.length===0&&!t.cycle&&!t.held&&t.mismatched.length===0))return{lane_id:e,corrected:t.corrections.length,cycle:t.cycle,held:t.held,mismatched:t.mismatched}}function rb(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function ob(e){let t=new Map;for(let[n,r]of e)t.set(n,r.slice());return t}function El(e,t,n){let r=new Set([t]),o=[t];for(;o.length>0;){let i=o.pop();for(let s of e.get(i)||[]){if(s===n)return!0;r.has(s)||(r.add(s),o.push(s))}}return!1}function sb(e,t){let n=new Set;for(let[s,l]of t)for(let a of l)n.add(ms(s,a));let r=new Map,o=new Map;for(let s of e){let l=ms(s.a,s.b);r.set(l,s),o.set(l,s.type==="dep-add")}let i=[];for(let s of e){let l=ms(s.a,s.b);r.get(l)===s&&o.get(l)!==n.has(l)&&i.push(s)}return i}function ib(e,t,n){let r=e.parallel_rows,o=Math.max(0,Math.min(r.length,n)),i=r[o];if(i&&i.root_dir===t)return i.queue_index;for(let s=o-1;s>=0;s--)if(r[s].root_dir===t)return r[s].queue_index+1;for(let s=o;s<r.length;s++)if(r[s].root_dir===t)return r[s].queue_index;return e.parallel_raw_length.get(t)??0}function ab(e,t){return e.parallel_rows.some(n=>n.root_dir===t)}function ap(e,t,n,r){return{type:"worker-queue-place",payload:{bead_id:e,...r?{lane:r}:{},index:n},root_dir:t}}function Tl(e,t){let n=0;for(let r of e.cross_lanes.keys())if(n+=1,r===t)return n;return n+1}function ys(e){let t=ob(e.blocked_by_map),n=[],r=new Set,o={refusal:null},i=u=>{let d=e.owner_of.get(u);return typeof d!="string"||d.length===0?(o.refusal=rb(u),null):d};return{graph:t,dep_ops:n,state:o,ownerOf:i,addDep:(u,d,m)=>{if(o.refusal!==null||u===d)return;let b=t.get(u)||[];if(b.includes(d))return;let h=i(u);if(h!==null){if(El(t,d,u)){o.refusal=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${u}\uAC00 \uC774\uBBF8 ${d}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}t.set(u,[...b,d]),m!==void 0&&r.add(ms(u,d)),n.push({type:"dep-add",a:u,b:d,root_dir:h,...m===void 0?{}:{lane_id:m}})}},removeDep:(u,d)=>{if(o.refusal!==null||u===d)return;let m=t.get(u)||[];if(!m.includes(d))return;let b=i(u);b!==null&&(t.set(u,m.filter(h=>h!==d)),n.push({type:"dep-remove",a:u,b:d,root_dir:b}))},laneCreated:(u,d)=>r.has(ms(u,d))}}function vs(e,t,n,r,o={}){if(e.state.refusal!==null)return{refused:e.state.refusal};let i=sb(e.dep_ops,t.blocked_by_map),s=i.filter(d=>d.type==="dep-remove"),l=i.filter(d=>d.type==="dep-add"),a=o.disarm_ops??[],u=o.lane_id===void 0||o.correction===void 0?void 0:nb(o.lane_id,o.correction);return{lane_ops:n,ops:[...s,...a,...l,...r],lane_op_index:s.length+a.length,...u===void 0?{}:{correction:u}}}function cp(e,t,n){for(let r=1;r<t.length;r+=1)e.addDep(t[r].bead_id,t[r-1].bead_id,n)}function gs(e,t){return t>0&&e.entries[t]?.dep_created_by_lane===!0}function up(e,t,n,r){if(t.status!=="confirmed")return[];let o=[],i=new Map;for(let s of r){let l=e.owner_of.get(s.bead_id)||s.root_dir;typeof l!="string"||l.length===0||i.set(l,[...i.get(l)||[],s.bead_id])}for(let[s,l]of i)o.push({type:"worker-queue-disarm",payload:{bead_ids:l,lane_id:n},root_dir:s});return o}function hs(e){return e.map(t=>({bead_id:t.bead_id,root_dir:t.root_dir}))}function Gi(e,t){return e.length===t.length&&e.every((n,r)=>n.bead_id===t[r].bead_id&&n.root_dir===t[r].root_dir)}function Yi(e,t,n){let r=ys(n),o=[],i=[],s=[],l,a=n.owner_lane_of.get(e.bead_id),u=e.kind==="chain"?e.lane_id??a:void 0,d=u===void 0?void 0:n.cross_lanes.get(u);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:Xh};if(t.kind==="chain"){if(e.kind==="repo-serial")return{refused:Zh};if(e.kind!=="chain"&&typeof a=="string"&&a!==t.lane_id&&n.cross_lanes.has(a))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${Tl(n,a)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`};if(!n.cross_lanes.has(t.lane_id))return{refused:To}}if(e.kind==="chain"&&d===void 0)return{refused:To};let m=()=>{if(d===void 0||d.status!=="confirmed")return;let k=d.entries.findIndex(U=>U.bead_id===e.bead_id);if(k<0)return;let S=k>0?d.entries[k-1]:null,T=k+1<d.entries.length?d.entries[k+1]:null,ee=gs(d,k),re=T!==null&&gs(d,k+1);ee&&S!==null&&r.removeDep(e.bead_id,S.bead_id),re&&T!==null&&r.removeDep(T.bead_id,e.bead_id),(ee||re)&&S!==null&&T!==null&&r.addDep(T.bead_id,S.bead_id,u)},b=(k,S)=>{let T=n.cross_lanes.get(k),ee=T.entries.findIndex(D=>D.bead_id===e.bead_id),re=T.entries.filter(D=>D.bead_id!==e.bead_id),U=Math.max(0,Math.min(re.length,ee>=0&&S>ee?S-1:S)),L=-1;if(re.forEach((D,V)=>{n.fixed_members.has(D.bead_id)&&(L=V)}),U<=L){r.state.refusal=Jh;return}let R=ee>=0?T.entries[ee]:d?.entries.find(D=>D.bead_id===e.bead_id)??{bead_id:e.bead_id,root_dir:e.root_dir};l=bs({status:T.status,entries:[...re.slice(0,U),R,...re.slice(U)]},n);let P=l.entries;if(Gi(P,T.entries)||o.push({type:"monitor-lane-update",payload:{lane_id:k,entries:hs(P)}}),T.status!=="confirmed")return;let q=P.findIndex(D=>D.bead_id===e.bead_id),W=q>0?P[q-1].bead_id:null,F=q+1<P.length?P[q+1].bead_id:null;if(W===null){F!==null&&r.addDep(F,e.bead_id,k);return}if(r.addDep(e.bead_id,W,k),F!==null&&(r.graph.get(F)||[]).includes(W)){let D=T.entries.findIndex(V=>V.bead_id===F);(r.laneCreated(F,W)||D>0&&T.entries[D-1].bead_id===W&&gs(T,D))&&r.removeDep(F,W),r.addDep(F,e.bead_id,k)}},h=typeof e.queue_index=="number"?e.queue_index:n.queue_index_of.get(e.bead_id);if(e.kind==="chain"&&(m(),d!==void 0&&(t.kind!=="chain"||t.lane_id!==u))){let k=d.entries.filter(T=>T.bead_id!==e.bead_id),S=d.status==="confirmed"&&k.length<2?d.entries:d.entries.filter(T=>T.bead_id===e.bead_id);s.push(...up(n,d,u,S)),o.push({type:"monitor-lane-update",payload:{lane_id:u,entries:hs(k)}})}if(t.kind==="chain"&&b(t.lane_id,t.marker_index),r.state.refusal!==null)return{refused:r.state.refusal};if(t.kind==="candidate")e.kind!=="candidate"&&i.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let k=ib(n,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")i.push(ap(e.bead_id,e.root_dir,k));else if(e.kind==="parallel"){let S=n.parallel_rows,T=S[Math.max(0,Math.min(S.length,t.marker_index))];if(!(!!T&&T.bead_id===e.bead_id)&&ab(n,e.root_dir)&&h!==void 0){let re=h>k?k:k-1;re>=0&&re!==h&&i.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:re},root_dir:e.root_dir})}}}else if(t.kind!=="chain")if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(h!==void 0&&t.index!==h){let k=h>t.index?t.index:t.index-1;k>=0&&k!==h&&i.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:k},root_dir:e.root_dir})}}else i.push(ap(e.bead_id,e.root_dir,t.index,t.lane_id));return vs(r,n,o,i,{disarm_ops:s,...t.kind==="chain"?{lane_id:t.lane_id,correction:l}:{}})}function dp(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:To};if(n.entries.length<2)return{refused:"\uD655\uC815\uD558\uB824\uBA74 \uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4"};let r=bs(n,t);if(r.held)return{refused:Ki};let o=r.entries,i=ys(t),s=[];cp(i,o,e);let l=Gi(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:hs(o)}}];return l.push({type:"monitor-lane-confirm",payload:{lane_id:e}}),vs(i,t,l,s,{lane_id:e,correction:r})}function pp(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:To};let r=bs(n,t),o=r.entries,i=ys(t),s=[];cp(i,o,e);let l=Gi(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:hs(o)}}];return vs(i,t,l,s,{lane_id:e,correction:r})}function fp(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:To};let r=bs(n,t),o=r.entries;return vs(ys(t),t,Gi(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:hs(o)}}],[],{lane_id:e,correction:r})}function _p(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:To};let r=ys(t);if(n.status==="confirmed")for(let o=1;o<n.entries.length;o+=1)gs(n,o)&&r.removeDep(n.entries[o].bead_id,n.entries[o-1].bead_id);return vs(r,t,[{type:"monitor-lane-remove",payload:{lane_id:e}}],[],{disarm_ops:up(t,n,e,n.entries)})}function mp(e,t){let n=t.cross_lanes.get(e);if(n===void 0||n.status!=="confirmed")return null;let r=[],o=[];for(let s=1;s<n.entries.length;s+=1){let l=`  ${n.entries[s].bead_id} \u2190 ${n.entries[s-1].bead_id}`;gs(n,s)?r.push(l):o.push(`${l} (\uB808\uC778\uC774 \uB9CC\uB4E4\uC9C0 \uC54A\uC74C)`)}let i=`\uC5F0\uACB0 ${Tl(t,e)}\uC744 \uC9C0\uC6C1\uB2C8\uB2E4.`;return r.length===0?`${i}
\uC758\uC874\uC740 \uADF8\uB300\uB85C \uB461\uB2C8\uB2E4`:[i,"\uD568\uAED8 \uC81C\uAC70\uD560 \uC758\uC874:",...r,...o.length===0?[]:["\uADF8\uB300\uB85C \uB450\uB294 \uC758\uC874:",...o]].join(`
`)}function gp(e){let t=new Map;for(let n of e)n.type!=="dep-add"||typeof n.lane_id!="string"||t.set(n.lane_id,[...t.get(n.lane_id)||[],{bead_id:n.a,after:n.b}]);return[...t].map(([n,r])=>({lane_id:n,pairs:r}))}function hp(e,t){let n=new Map(e.map((r,o)=>[r.bead_id,o]));return t.filter(r=>{let o=n.get(r.bead_id);return o!==void 0&&o>0&&e[o-1].bead_id===r.after})}function Cl(e,t){if(e!==null){let n=t.owner_lane_of.get(e.bead_id);if(typeof n=="string"&&t.cross_lanes.has(n))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${Tl(t,n)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`}}return{lane_ops:[{type:"monitor-lane-create",payload:{entries:e===null?[]:[e]}}],ops:[],lane_op_index:0}}var lb="\uC0AC\uC774\uD074";function cb(e){let t=new Map,n=r=>Array.isArray(r)?r.filter(o=>typeof o=="string"&&o.length>0):[];for(let r of Array.isArray(e)?e:[]){if(!r||typeof r!="object")continue;let o=r.bead_blocked_by&&typeof r.bead_blocked_by=="object"?r.bead_blocked_by:{};for(let[i,s]of Object.entries(o))Array.isArray(s)&&t.set(i,n(s));for(let i of[...Array.isArray(r.runnable)?r.runnable:[],...Array.isArray(r.session_active)?r.session_active:[]])i&&typeof i.bead_id=="string"&&Array.isArray(i.blocked_by)&&i.blocked_by.length>0&&t.set(i.bead_id,n(i.blocked_by))}return t}function Rl(e,t,n){let r=$r(e,t),o=[],i=new Set,s=(a,u)=>{for(let d of a)i.has(d.id)||(i.add(d.id),o.push({bead_id:d.id,root_dir:d.root_dir,workspace_name:d.workspace_name,title:d.title,lane:u}))};s(r.running,"running"),s(r.pr_wait,"pr_wait"),s(r.queue,"queue"),s(r.runnable_all,"runnable");let l=n&&typeof n.root_dir=="string"&&n.root_dir.length?n.root_dir:null;return{issues:l===null?o:o.filter(a=>a.root_dir===l),blocked_by_map:cb(e)}}function bp(e,t){let n=new Map;for(let s of t.issues)!s||typeof s.bead_id!="string"||s.bead_id.length===0||n.has(s.bead_id)||n.set(s.bead_id,s);let r=n.get(e)?.root_dir,o=t.blocked_by_map.get(e)||[],i=[];for(let s of n.values()){if(s.bead_id===e||s.lane==="done"||o.includes(s.bead_id))continue;let l=El(t.blocked_by_map,s.bead_id,e);i.push({...s,disabled:l,...l?{reason:lb}:{}})}return i.sort((s,l)=>{let a=r!==void 0&&s.root_dir===r,u=r!==void 0&&l.root_dir===r;return a!==u?a?-1:1:s.bead_id.localeCompare(l.bead_id)}),i}function yp(e,t){let n=t.trim().toLowerCase();return n.length===0?e.slice():e.filter(r=>r.bead_id.toLowerCase().includes(n)||r.title.toLowerCase().includes(n))}var ub=/^\S+-\S+$/;function vp(e){return ub.test(e.trim())}var{entries:Cp,setPrototypeOf:kp,isFrozen:db,getPrototypeOf:pb,getOwnPropertyDescriptor:fb}=Object,{freeze:kn,seal:Ln,create:ql}=Object,{apply:Nl,construct:jl}=typeof Reflect<"u"&&Reflect;kn||(kn=function(t){return t});Ln||(Ln=function(t){return t});Nl||(Nl=function(t,n){for(var r=arguments.length,o=new Array(r>2?r-2:0),i=2;i<r;i++)o[i-2]=arguments[i];return t.apply(n,o)});jl||(jl=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return new t(...r)});var Vi=wn(Array.prototype.forEach),_b=wn(Array.prototype.lastIndexOf),wp=wn(Array.prototype.pop),ks=wn(Array.prototype.push),mb=wn(Array.prototype.splice),Xi=wn(String.prototype.toLowerCase),Ol=wn(String.prototype.toString),Il=wn(String.prototype.match),ws=wn(String.prototype.replace),gb=wn(String.prototype.indexOf),hb=wn(String.prototype.trim),Fn=wn(Object.prototype.hasOwnProperty),vn=wn(RegExp.prototype.test),$s=bb(TypeError);function wn(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return Nl(e,t,r)}}function bb(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return jl(e,n)}}function At(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Xi;kp&&kp(e,null);let r=t.length;for(;r--;){let o=t[r];if(typeof o=="string"){let i=n(o);i!==o&&(db(t)||(t[r]=i),o=i)}e[o]=!0}return e}function yb(e){for(let t=0;t<e.length;t++)Fn(e,t)||(e[t]=null);return e}function lr(e){let t=ql(null);for(let[n,r]of Cp(e))Fn(e,n)&&(Array.isArray(r)?t[n]=yb(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=lr(r):t[n]=r);return t}function xs(e,t){for(;e!==null;){let r=fb(e,t);if(r){if(r.get)return wn(r.get);if(typeof r.value=="function")return wn(r.value)}e=pb(e)}function n(){return null}return n}var $p=kn(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Ll=kn(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Dl=kn(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),vb=kn(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Pl=kn(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),kb=kn(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),xp=kn(["#text"]),Ap=kn(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Ml=kn(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Sp=kn(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Qi=kn(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),wb=Ln(/\{\{[\w\W]*|[\w\W]*\}\}/gm),$b=Ln(/<%[\w\W]*|[\w\W]*%>/gm),xb=Ln(/\$\{[\w\W]*/gm),Ab=Ln(/^data-[\-\w.\u00B7-\uFFFF]+$/),Sb=Ln(/^aria-[\-\w]+$/),Rp=Ln(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Eb=Ln(/^(?:\w+script|data):/i),Tb=Ln(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Op=Ln(/^html$/i),Cb=Ln(/^[a-z][.\w]*(-[.\w]+)+$/i),Ep=Object.freeze({__proto__:null,ARIA_ATTR:Sb,ATTR_WHITESPACE:Tb,CUSTOM_ELEMENT:Cb,DATA_ATTR:Ab,DOCTYPE_NAME:Op,ERB_EXPR:$b,IS_ALLOWED_URI:Rp,IS_SCRIPT_OR_DATA:Eb,MUSTACHE_EXPR:wb,TMPLIT_EXPR:xb}),As={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Rb=function(){return typeof window>"u"?null:window},Ob=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,o="data-tt-policy-suffix";n&&n.hasAttribute(o)&&(r=n.getAttribute(o));let i="dompurify"+(r?"#"+r:"");try{return t.createPolicy(i,{createHTML(s){return s},createScriptURL(s){return s}})}catch{return console.warn("TrustedTypes policy "+i+" could not be created."),null}},Tp=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Ip(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Rb(),t=xe=>Ip(xe);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==As.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,o=r.currentScript,{DocumentFragment:i,HTMLTemplateElement:s,Node:l,Element:a,NodeFilter:u,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:m,DOMParser:b,trustedTypes:h}=e,k=a.prototype,S=xs(k,"cloneNode"),T=xs(k,"remove"),ee=xs(k,"nextSibling"),re=xs(k,"childNodes"),U=xs(k,"parentNode");if(typeof s=="function"){let xe=n.createElement("template");xe.content&&xe.content.ownerDocument&&(n=xe.content.ownerDocument)}let L,R="",{implementation:P,createNodeIterator:q,createDocumentFragment:W,getElementsByTagName:F}=n,{importNode:D}=r,V=Tp();t.isSupported=typeof Cp=="function"&&typeof U=="function"&&P&&P.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:j,ERB_EXPR:ne,TMPLIT_EXPR:me,DATA_ATTR:Oe,ARIA_ATTR:H,IS_SCRIPT_OR_DATA:te,ATTR_WHITESPACE:ce,CUSTOM_ELEMENT:Te}=Ep,{IS_ALLOWED_URI:K}=Ep,ae=null,Q=At({},[...$p,...Ll,...Dl,...Pl,...xp]),de=null,Re=At({},[...Ap,...Ml,...Sp,...Qi]),be=Object.seal(ql(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Ie=null,Ye=null,_t=Object.seal(ql(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),G=!0,pe=!0,oe=!1,Y=!0,we=!1,fe=!0,Ce=!1,Ne=!1,Qe=!1,Fe=!1,J=!1,X=!1,Ee=!0,Je=!1,st="user-content-",Ue=!0,et=!1,vt={},ut=null,Ze=At({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),dt=null,Zt=At({},["audio","video","img","source","image","track"]),$=null,Z=At({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),qe="http://www.w3.org/1998/Math/MathML",Se="http://www.w3.org/2000/svg",De="http://www.w3.org/1999/xhtml",je=De,lt=!1,kt=null,se=At({},[qe,Se,De],Ol),ge=At({},["mi","mo","mn","ms","mtext"]),Ge=At({},["annotation-xml"]),it=At({},["title","style","font","a","script"]),ze=null,mt=["application/xhtml+xml","text/html"],gt="text/html",nt=null,Pe=null,A=n.createElement("form"),N=function(E){return E instanceof RegExp||E instanceof Function},B=function(){let E=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Pe&&Pe===E)){if((!E||typeof E!="object")&&(E={}),E=lr(E),ze=mt.indexOf(E.PARSER_MEDIA_TYPE)===-1?gt:E.PARSER_MEDIA_TYPE,nt=ze==="application/xhtml+xml"?Ol:Xi,ae=Fn(E,"ALLOWED_TAGS")?At({},E.ALLOWED_TAGS,nt):Q,de=Fn(E,"ALLOWED_ATTR")?At({},E.ALLOWED_ATTR,nt):Re,kt=Fn(E,"ALLOWED_NAMESPACES")?At({},E.ALLOWED_NAMESPACES,Ol):se,$=Fn(E,"ADD_URI_SAFE_ATTR")?At(lr(Z),E.ADD_URI_SAFE_ATTR,nt):Z,dt=Fn(E,"ADD_DATA_URI_TAGS")?At(lr(Zt),E.ADD_DATA_URI_TAGS,nt):Zt,ut=Fn(E,"FORBID_CONTENTS")?At({},E.FORBID_CONTENTS,nt):Ze,Ie=Fn(E,"FORBID_TAGS")?At({},E.FORBID_TAGS,nt):lr({}),Ye=Fn(E,"FORBID_ATTR")?At({},E.FORBID_ATTR,nt):lr({}),vt=Fn(E,"USE_PROFILES")?E.USE_PROFILES:!1,G=E.ALLOW_ARIA_ATTR!==!1,pe=E.ALLOW_DATA_ATTR!==!1,oe=E.ALLOW_UNKNOWN_PROTOCOLS||!1,Y=E.ALLOW_SELF_CLOSE_IN_ATTR!==!1,we=E.SAFE_FOR_TEMPLATES||!1,fe=E.SAFE_FOR_XML!==!1,Ce=E.WHOLE_DOCUMENT||!1,Fe=E.RETURN_DOM||!1,J=E.RETURN_DOM_FRAGMENT||!1,X=E.RETURN_TRUSTED_TYPE||!1,Qe=E.FORCE_BODY||!1,Ee=E.SANITIZE_DOM!==!1,Je=E.SANITIZE_NAMED_PROPS||!1,Ue=E.KEEP_CONTENT!==!1,et=E.IN_PLACE||!1,K=E.ALLOWED_URI_REGEXP||Rp,je=E.NAMESPACE||De,ge=E.MATHML_TEXT_INTEGRATION_POINTS||ge,Ge=E.HTML_INTEGRATION_POINTS||Ge,be=E.CUSTOM_ELEMENT_HANDLING||{},E.CUSTOM_ELEMENT_HANDLING&&N(E.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(be.tagNameCheck=E.CUSTOM_ELEMENT_HANDLING.tagNameCheck),E.CUSTOM_ELEMENT_HANDLING&&N(E.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(be.attributeNameCheck=E.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),E.CUSTOM_ELEMENT_HANDLING&&typeof E.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(be.allowCustomizedBuiltInElements=E.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),we&&(pe=!1),J&&(Fe=!0),vt&&(ae=At({},xp),de=[],vt.html===!0&&(At(ae,$p),At(de,Ap)),vt.svg===!0&&(At(ae,Ll),At(de,Ml),At(de,Qi)),vt.svgFilters===!0&&(At(ae,Dl),At(de,Ml),At(de,Qi)),vt.mathMl===!0&&(At(ae,Pl),At(de,Sp),At(de,Qi))),E.ADD_TAGS&&(typeof E.ADD_TAGS=="function"?_t.tagCheck=E.ADD_TAGS:(ae===Q&&(ae=lr(ae)),At(ae,E.ADD_TAGS,nt))),E.ADD_ATTR&&(typeof E.ADD_ATTR=="function"?_t.attributeCheck=E.ADD_ATTR:(de===Re&&(de=lr(de)),At(de,E.ADD_ATTR,nt))),E.ADD_URI_SAFE_ATTR&&At($,E.ADD_URI_SAFE_ATTR,nt),E.FORBID_CONTENTS&&(ut===Ze&&(ut=lr(ut)),At(ut,E.FORBID_CONTENTS,nt)),Ue&&(ae["#text"]=!0),Ce&&At(ae,["html","head","body"]),ae.table&&(At(ae,["tbody"]),delete Ie.tbody),E.TRUSTED_TYPES_POLICY){if(typeof E.TRUSTED_TYPES_POLICY.createHTML!="function")throw $s('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof E.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw $s('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');L=E.TRUSTED_TYPES_POLICY,R=L.createHTML("")}else L===void 0&&(L=Ob(h,o)),L!==null&&typeof R=="string"&&(R=L.createHTML(""));kn&&kn(E),Pe=E}},ke=At({},[...Ll,...Dl,...vb]),ye=At({},[...Pl,...kb]),pt=function(E){let he=U(E);(!he||!he.tagName)&&(he={namespaceURI:je,tagName:"template"});let Le=Xi(E.tagName),ot=Xi(he.tagName);return kt[E.namespaceURI]?E.namespaceURI===Se?he.namespaceURI===De?Le==="svg":he.namespaceURI===qe?Le==="svg"&&(ot==="annotation-xml"||ge[ot]):!!ke[Le]:E.namespaceURI===qe?he.namespaceURI===De?Le==="math":he.namespaceURI===Se?Le==="math"&&Ge[ot]:!!ye[Le]:E.namespaceURI===De?he.namespaceURI===Se&&!Ge[ot]||he.namespaceURI===qe&&!ge[ot]?!1:!ye[Le]&&(it[Le]||!ke[Le]):!!(ze==="application/xhtml+xml"&&kt[E.namespaceURI]):!1},wt=function(E){ks(t.removed,{element:E});try{U(E).removeChild(E)}catch{T(E)}},yt=function(E,he){try{ks(t.removed,{attribute:he.getAttributeNode(E),from:he})}catch{ks(t.removed,{attribute:null,from:he})}if(he.removeAttribute(E),E==="is")if(Fe||J)try{wt(he)}catch{}else try{he.setAttribute(E,"")}catch{}},Tt=function(E){let he=null,Le=null;if(Qe)E="<remove></remove>"+E;else{let $t=Il(E,/^[\r\n\t ]+/);Le=$t&&$t[0]}ze==="application/xhtml+xml"&&je===De&&(E='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+E+"</body></html>");let ot=L?L.createHTML(E):E;if(je===De)try{he=new b().parseFromString(ot,ze)}catch{}if(!he||!he.documentElement){he=P.createDocument(je,"template",null);try{he.documentElement.innerHTML=lt?R:ot}catch{}}let Ve=he.body||he.documentElement;return E&&Le&&Ve.insertBefore(n.createTextNode(Le),Ve.childNodes[0]||null),je===De?F.call(he,Ce?"html":"body")[0]:Ce?he.documentElement:Ve},jt=function(E){return q.call(E.ownerDocument||E,E,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},Ut=function(E){return E instanceof m&&(typeof E.nodeName!="string"||typeof E.textContent!="string"||typeof E.removeChild!="function"||!(E.attributes instanceof d)||typeof E.removeAttribute!="function"||typeof E.setAttribute!="function"||typeof E.namespaceURI!="string"||typeof E.insertBefore!="function"||typeof E.hasChildNodes!="function")},Yt=function(E){return typeof l=="function"&&E instanceof l};function St(xe,E,he){Vi(xe,Le=>{Le.call(t,E,he,Pe)})}let sn=function(E){let he=null;if(St(V.beforeSanitizeElements,E,null),Ut(E))return wt(E),!0;let Le=nt(E.nodeName);if(St(V.uponSanitizeElement,E,{tagName:Le,allowedTags:ae}),fe&&E.hasChildNodes()&&!Yt(E.firstElementChild)&&vn(/<[/\w!]/g,E.innerHTML)&&vn(/<[/\w!]/g,E.textContent)||E.nodeType===As.progressingInstruction||fe&&E.nodeType===As.comment&&vn(/<[/\w]/g,E.data))return wt(E),!0;if(!(_t.tagCheck instanceof Function&&_t.tagCheck(Le))&&(!ae[Le]||Ie[Le])){if(!Ie[Le]&&Pt(Le)&&(be.tagNameCheck instanceof RegExp&&vn(be.tagNameCheck,Le)||be.tagNameCheck instanceof Function&&be.tagNameCheck(Le)))return!1;if(Ue&&!ut[Le]){let ot=U(E)||E.parentNode,Ve=re(E)||E.childNodes;if(Ve&&ot){let $t=Ve.length;for(let It=$t-1;It>=0;--It){let Et=S(Ve[It],!0);Et.__removalCount=(E.__removalCount||0)+1,ot.insertBefore(Et,ee(E))}}}return wt(E),!0}return E instanceof a&&!pt(E)||(Le==="noscript"||Le==="noembed"||Le==="noframes")&&vn(/<\/no(script|embed|frames)/i,E.innerHTML)?(wt(E),!0):(we&&E.nodeType===As.text&&(he=E.textContent,Vi([j,ne,me],ot=>{he=ws(he,ot," ")}),E.textContent!==he&&(ks(t.removed,{element:E.cloneNode()}),E.textContent=he)),St(V.afterSanitizeElements,E,null),!1)},Wt=function(E,he,Le){if(Ee&&(he==="id"||he==="name")&&(Le in n||Le in A))return!1;if(!(pe&&!Ye[he]&&vn(Oe,he))){if(!(G&&vn(H,he))){if(!(_t.attributeCheck instanceof Function&&_t.attributeCheck(he,E))){if(!de[he]||Ye[he]){if(!(Pt(E)&&(be.tagNameCheck instanceof RegExp&&vn(be.tagNameCheck,E)||be.tagNameCheck instanceof Function&&be.tagNameCheck(E))&&(be.attributeNameCheck instanceof RegExp&&vn(be.attributeNameCheck,he)||be.attributeNameCheck instanceof Function&&be.attributeNameCheck(he,E))||he==="is"&&be.allowCustomizedBuiltInElements&&(be.tagNameCheck instanceof RegExp&&vn(be.tagNameCheck,Le)||be.tagNameCheck instanceof Function&&be.tagNameCheck(Le))))return!1}else if(!$[he]){if(!vn(K,ws(Le,ce,""))){if(!((he==="src"||he==="xlink:href"||he==="href")&&E!=="script"&&gb(Le,"data:")===0&&dt[E])){if(!(oe&&!vn(te,ws(Le,ce,"")))){if(Le)return!1}}}}}}}return!0},Pt=function(E){return E!=="annotation-xml"&&Il(E,Te)},Ft=function(E){St(V.beforeSanitizeAttributes,E,null);let{attributes:he}=E;if(!he||Ut(E))return;let Le={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:de,forceKeepAttr:void 0},ot=he.length;for(;ot--;){let Ve=he[ot],{name:$t,namespaceURI:It,value:Et}=Ve,Kt=nt($t),_n=Et,Lt=$t==="value"?_n:hb(_n);if(Le.attrName=Kt,Le.attrValue=Lt,Le.keepAttr=!0,Le.forceKeepAttr=void 0,St(V.uponSanitizeAttribute,E,Le),Lt=Le.attrValue,Je&&(Kt==="id"||Kt==="name")&&(yt($t,E),Lt=st+Lt),fe&&vn(/((--!?|])>)|<\/(style|title|textarea)/i,Lt)){yt($t,E);continue}if(Kt==="attributename"&&Il(Lt,"href")){yt($t,E);continue}if(Le.forceKeepAttr)continue;if(!Le.keepAttr){yt($t,E);continue}if(!Y&&vn(/\/>/i,Lt)){yt($t,E);continue}we&&Vi([j,ne,me],p=>{Lt=ws(Lt,p," ")});let hn=nt(E.nodeName);if(!Wt(hn,Kt,Lt)){yt($t,E);continue}if(L&&typeof h=="object"&&typeof h.getAttributeType=="function"&&!It)switch(h.getAttributeType(hn,Kt)){case"TrustedHTML":{Lt=L.createHTML(Lt);break}case"TrustedScriptURL":{Lt=L.createScriptURL(Lt);break}}if(Lt!==_n)try{It?E.setAttributeNS(It,$t,Lt):E.setAttribute($t,Lt),Ut(E)?wt(E):wp(t.removed)}catch{yt($t,E)}}St(V.afterSanitizeAttributes,E,null)},zt=function xe(E){let he=null,Le=jt(E);for(St(V.beforeSanitizeShadowDOM,E,null);he=Le.nextNode();)St(V.uponSanitizeShadowNode,he,null),sn(he),Ft(he),he.content instanceof i&&xe(he.content);St(V.afterSanitizeShadowDOM,E,null)};return t.sanitize=function(xe){let E=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},he=null,Le=null,ot=null,Ve=null;if(lt=!xe,lt&&(xe="<!-->"),typeof xe!="string"&&!Yt(xe))if(typeof xe.toString=="function"){if(xe=xe.toString(),typeof xe!="string")throw $s("dirty is not a string, aborting")}else throw $s("toString is not a function");if(!t.isSupported)return xe;if(Ne||B(E),t.removed=[],typeof xe=="string"&&(et=!1),et){if(xe.nodeName){let Et=nt(xe.nodeName);if(!ae[Et]||Ie[Et])throw $s("root node is forbidden and cannot be sanitized in-place")}}else if(xe instanceof l)he=Tt("<!---->"),Le=he.ownerDocument.importNode(xe,!0),Le.nodeType===As.element&&Le.nodeName==="BODY"||Le.nodeName==="HTML"?he=Le:he.appendChild(Le);else{if(!Fe&&!we&&!Ce&&xe.indexOf("<")===-1)return L&&X?L.createHTML(xe):xe;if(he=Tt(xe),!he)return Fe?null:X?R:""}he&&Qe&&wt(he.firstChild);let $t=jt(et?xe:he);for(;ot=$t.nextNode();)sn(ot),Ft(ot),ot.content instanceof i&&zt(ot.content);if(et)return xe;if(Fe){if(J)for(Ve=W.call(he.ownerDocument);he.firstChild;)Ve.appendChild(he.firstChild);else Ve=he;return(de.shadowroot||de.shadowrootmode)&&(Ve=D.call(r,Ve,!0)),Ve}let It=Ce?he.outerHTML:he.innerHTML;return Ce&&ae["!doctype"]&&he.ownerDocument&&he.ownerDocument.doctype&&he.ownerDocument.doctype.name&&vn(Op,he.ownerDocument.doctype.name)&&(It="<!DOCTYPE "+he.ownerDocument.doctype.name+`>
`+It),we&&Vi([j,ne,me],Et=>{It=ws(It,Et," ")}),L&&X?L.createHTML(It):It},t.setConfig=function(){let xe=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};B(xe),Ne=!0},t.clearConfig=function(){Pe=null,Ne=!1},t.isValidAttribute=function(xe,E,he){Pe||B({});let Le=nt(xe),ot=nt(E);return Wt(Le,ot,he)},t.addHook=function(xe,E){typeof E=="function"&&ks(V[xe],E)},t.removeHook=function(xe,E){if(E!==void 0){let he=_b(V[xe],E);return he===-1?void 0:mb(V[xe],he,1)[0]}return wp(V[xe])},t.removeHooks=function(xe){V[xe]=[]},t.removeAllHooks=function(){V=Tp()},t}var Lp=Ip();var cr={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Zi=e=>(...t)=>({_$litDirective$:e,values:t}),Co=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var Ss=class extends Co{constructor(t){if(super(t),this.it=Ht,t.type!==cr.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Ht||t==null)return this._t=void 0,this.it=t;if(t===In)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};Ss.directiveName="unsafeHTML",Ss.resultType=1;var Dp=Zi(Ss);function Wl(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Qr=Wl();function Bp(e){Qr=e}var Rs={exec:()=>null};function Ot(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(o,i)=>{let s=typeof i=="string"?i:i.source;return s=s.replace($n.caret,"$1"),n=n.replace(o,s),r},getRegex:()=>new RegExp(n,t)};return r}var Ib=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),$n={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Lb=/^(?:[ \t]*(?:\n|$))+/,Db=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Pb=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Os=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Mb=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,zl=/(?:[*+-]|\d{1,9}[.)])/,Up=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Wp=Ot(Up).replace(/bull/g,zl).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),qb=Ot(Up).replace(/bull/g,zl).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Hl=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Nb=/^[^\n]+/,Kl=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,jb=Ot(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Kl).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Fb=Ot(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,zl).getRegex(),oa="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Gl=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Bb=Ot("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Gl).replace("tag",oa).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),zp=Ot(Hl).replace("hr",Os).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",oa).getRegex(),Ub=Ot(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",zp).getRegex(),Yl={blockquote:Ub,code:Db,def:jb,fences:Pb,heading:Mb,hr:Os,html:Bb,lheading:Wp,list:Fb,newline:Lb,paragraph:zp,table:Rs,text:Nb},Pp=Ot("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Os).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",oa).getRegex(),Wb={...Yl,lheading:qb,table:Pp,paragraph:Ot(Hl).replace("hr",Os).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Pp).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",oa).getRegex()},zb={...Yl,html:Ot(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Gl).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Rs,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Ot(Hl).replace("hr",Os).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Wp).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Hb=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Kb=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Hp=/^( {2,}|\\)\n(?!\s*$)/,Gb=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,sa=/[\p{P}\p{S}]/u,Vl=/[\s\p{P}\p{S}]/u,Kp=/[^\s\p{P}\p{S}]/u,Yb=Ot(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Vl).getRegex(),Gp=/(?!~)[\p{P}\p{S}]/u,Vb=/(?!~)[\s\p{P}\p{S}]/u,Qb=/(?:[^\s\p{P}\p{S}]|~)/u,Xb=Ot(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Ib?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Yp=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Zb=Ot(Yp,"u").replace(/punct/g,sa).getRegex(),Jb=Ot(Yp,"u").replace(/punct/g,Gp).getRegex(),Vp="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",ey=Ot(Vp,"gu").replace(/notPunctSpace/g,Kp).replace(/punctSpace/g,Vl).replace(/punct/g,sa).getRegex(),ty=Ot(Vp,"gu").replace(/notPunctSpace/g,Qb).replace(/punctSpace/g,Vb).replace(/punct/g,Gp).getRegex(),ny=Ot("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Kp).replace(/punctSpace/g,Vl).replace(/punct/g,sa).getRegex(),ry=Ot(/\\(punct)/,"gu").replace(/punct/g,sa).getRegex(),oy=Ot(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),sy=Ot(Gl).replace("(?:-->|$)","-->").getRegex(),iy=Ot("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",sy).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),ta=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,ay=Ot(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",ta).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Qp=Ot(/^!?\[(label)\]\[(ref)\]/).replace("label",ta).replace("ref",Kl).getRegex(),Xp=Ot(/^!?\[(ref)\](?:\[\])?/).replace("ref",Kl).getRegex(),ly=Ot("reflink|nolink(?!\\()","g").replace("reflink",Qp).replace("nolink",Xp).getRegex(),Mp=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Ql={_backpedal:Rs,anyPunctuation:ry,autolink:oy,blockSkip:Xb,br:Hp,code:Kb,del:Rs,emStrongLDelim:Zb,emStrongRDelimAst:ey,emStrongRDelimUnd:ny,escape:Hb,link:ay,nolink:Xp,punctuation:Yb,reflink:Qp,reflinkSearch:ly,tag:iy,text:Gb,url:Rs},cy={...Ql,link:Ot(/^!?\[(label)\]\((.*?)\)/).replace("label",ta).getRegex(),reflink:Ot(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",ta).getRegex()},Fl={...Ql,emStrongRDelimAst:ty,emStrongLDelim:Jb,url:Ot(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Mp).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:Ot(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Mp).getRegex()},uy={...Fl,br:Ot(Hp).replace("{2,}","*").getRegex(),text:Ot(Fl.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Ji={normal:Yl,gfm:Wb,pedantic:zb},Es={normal:Ql,gfm:Fl,breaks:uy,pedantic:cy},dy={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},qp=e=>dy[e];function ur(e,t){if(t){if($n.escapeTest.test(e))return e.replace($n.escapeReplace,qp)}else if($n.escapeTestNoEncode.test(e))return e.replace($n.escapeReplaceNoEncode,qp);return e}function Np(e){try{e=encodeURI(e).replace($n.percentDecode,"%")}catch{return null}return e}function jp(e,t){let n=e.replace($n.findPipe,(i,s,l)=>{let a=!1,u=s;for(;--u>=0&&l[u]==="\\";)a=!a;return a?"|":" |"}),r=n.split($n.splitPipe),o=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;o<r.length;o++)r[o]=r[o].trim().replace($n.slashPipe,"|");return r}function Ts(e,t,n){let r=e.length;if(r===0)return"";let o=0;for(;o<r;){let i=e.charAt(r-o-1);if(i===t&&!n)o++;else if(i!==t&&n)o++;else break}return e.slice(0,r-o)}function py(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function Fp(e,t,n,r,o){let i=t.href,s=t.title||null,l=e[1].replace(o.other.outputLinkReplace,"$1");r.state.inLink=!0;let a={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:i,title:s,text:l,tokens:r.inlineTokens(l)};return r.state.inLink=!1,a}function fy(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let o=r[1];return t.split(`
`).map(i=>{let s=i.match(n.other.beginningSpace);if(s===null)return i;let[l]=s;return l.length>=o.length?i.slice(o.length):i}).join(`
`)}var na=class{constructor(e){qt(this,"options");qt(this,"rules");qt(this,"lexer");this.options=e||Qr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:Ts(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=fy(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=Ts(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Ts(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=Ts(t[0],`
`).split(`
`),r="",o="",i=[];for(;n.length>0;){let s=!1,l=[],a;for(a=0;a<n.length;a++)if(this.rules.other.blockquoteStart.test(n[a]))l.push(n[a]),s=!0;else if(!s)l.push(n[a]);else break;n=n.slice(a);let u=l.join(`
`),d=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${u}`:u,o=o?`${o}
${d}`:d;let m=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,i,!0),this.lexer.state.top=m,n.length===0)break;let b=i.at(-1);if(b?.type==="code")break;if(b?.type==="blockquote"){let h=b,k=h.raw+`
`+n.join(`
`),S=this.blockquote(k);i[i.length-1]=S,r=r.substring(0,r.length-h.raw.length)+S.raw,o=o.substring(0,o.length-h.text.length)+S.text;break}else if(b?.type==="list"){let h=b,k=h.raw+`
`+n.join(`
`),S=this.list(k);i[i.length-1]=S,r=r.substring(0,r.length-b.raw.length)+S.raw,o=o.substring(0,o.length-h.raw.length)+S.raw,n=k.substring(i.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:i,text:o}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,o={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let i=this.rules.other.listItemRegex(n),s=!1;for(;e;){let a=!1,u="",d="";if(!(t=i.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let m=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,S=>" ".repeat(3*S.length)),b=e.split(`
`,1)[0],h=!m.trim(),k=0;if(this.options.pedantic?(k=2,d=m.trimStart()):h?k=t[1].length+1:(k=t[2].search(this.rules.other.nonSpaceChar),k=k>4?1:k,d=m.slice(k),k+=t[1].length),h&&this.rules.other.blankLine.test(b)&&(u+=b+`
`,e=e.substring(b.length+1),a=!0),!a){let S=this.rules.other.nextBulletRegex(k),T=this.rules.other.hrRegex(k),ee=this.rules.other.fencesBeginRegex(k),re=this.rules.other.headingBeginRegex(k),U=this.rules.other.htmlBeginRegex(k);for(;e;){let L=e.split(`
`,1)[0],R;if(b=L,this.options.pedantic?(b=b.replace(this.rules.other.listReplaceNesting,"  "),R=b):R=b.replace(this.rules.other.tabCharGlobal,"    "),ee.test(b)||re.test(b)||U.test(b)||S.test(b)||T.test(b))break;if(R.search(this.rules.other.nonSpaceChar)>=k||!b.trim())d+=`
`+R.slice(k);else{if(h||m.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||ee.test(m)||re.test(m)||T.test(m))break;d+=`
`+b}!h&&!b.trim()&&(h=!0),u+=L+`
`,e=e.substring(L.length+1),m=R.slice(k)}}o.loose||(s?o.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(s=!0)),o.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(d),loose:!1,text:d,tokens:[]}),o.raw+=u}let l=o.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;o.raw=o.raw.trimEnd();for(let a of o.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let d=this.lexer.inlineQueue.length-1;d>=0;d--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[d].src)){this.lexer.inlineQueue[d].src=this.lexer.inlineQueue[d].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(a.raw);if(u){let d={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};a.checked=d.checked,o.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=d.raw+a.tokens[0].raw,a.tokens[0].text=d.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(d)):a.tokens.unshift({type:"paragraph",raw:d.raw,text:d.raw,tokens:[d]}):a.tokens.unshift(d)}}if(!o.loose){let u=a.tokens.filter(m=>m.type==="space"),d=u.length>0&&u.some(m=>this.rules.other.anyLine.test(m.raw));o.loose=d}}if(o.loose)for(let a of o.items){a.loose=!0;for(let u of a.tokens)u.type==="text"&&(u.type="paragraph")}return o}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",o=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:o}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=jp(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),o=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],i={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let s of r)this.rules.other.tableAlignRight.test(s)?i.align.push("right"):this.rules.other.tableAlignCenter.test(s)?i.align.push("center"):this.rules.other.tableAlignLeft.test(s)?i.align.push("left"):i.align.push(null);for(let s=0;s<n.length;s++)i.header.push({text:n[s],tokens:this.lexer.inline(n[s]),header:!0,align:i.align[s]});for(let s of o)i.rows.push(jp(s,i.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:i.align[a]})));return i}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let i=Ts(n.slice(0,-1),"\\");if((n.length-i.length)%2===0)return}else{let i=py(t[2],"()");if(i===-2)return;if(i>-1){let s=(t[0].indexOf("!")===0?5:4)+t[1].length+i;t[2]=t[2].substring(0,i),t[0]=t[0].substring(0,s).trim(),t[3]=""}}let r=t[2],o="";if(this.options.pedantic){let i=this.rules.other.pedanticHrefTitle.exec(r);i&&(r=i[1],o=i[3])}else o=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),Fp(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:o&&o.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),o=t[r.toLowerCase()];if(!o){let i=n[0].charAt(0);return{type:"text",raw:i,text:i}}return Fp(n,o,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let o=[...r[0]].length-1,i,s,l=o,a=0,u=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+o);(r=u.exec(t))!=null;){if(i=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!i)continue;if(s=[...i].length,r[3]||r[4]){l+=s;continue}else if((r[5]||r[6])&&o%3&&!((o+s)%3)){a+=s;continue}if(l-=s,l>0)continue;s=Math.min(s,s+l+a);let d=[...r[0]][0].length,m=e.slice(0,o+r.index+d+s);if(Math.min(o,s)%2){let h=m.slice(1,-1);return{type:"em",raw:m,text:h,tokens:this.lexer.inlineTokens(h)}}let b=m.slice(2,-2);return{type:"strong",raw:m,text:b,tokens:this.lexer.inlineTokens(b)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),o=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&o&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let o;do o=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(o!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Bn=class Bl{constructor(t){qt(this,"tokens");qt(this,"options");qt(this,"state");qt(this,"inlineQueue");qt(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Qr,this.options.tokenizer=this.options.tokenizer||new na,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:$n,block:Ji.normal,inline:Es.normal};this.options.pedantic?(n.block=Ji.pedantic,n.inline=Es.pedantic):this.options.gfm&&(n.block=Ji.gfm,this.options.breaks?n.inline=Es.breaks:n.inline=Es.gfm),this.tokenizer.rules=n}static get rules(){return{block:Ji,inline:Es}}static lex(t,n){return new Bl(n).lex(t)}static lexInline(t,n){return new Bl(n).inlineTokens(t)}lex(t){t=t.replace($n.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],r=!1){for(this.options.pedantic&&(t=t.replace($n.tabCharGlobal,"    ").replace($n.spaceLine,""));t;){let o;if(this.options.extensions?.block?.some(s=>(o=s.call({lexer:this},t,n))?(t=t.substring(o.raw.length),n.push(o),!0):!1))continue;if(o=this.tokenizer.space(t)){t=t.substring(o.raw.length);let s=n.at(-1);o.raw.length===1&&s!==void 0?s.raw+=`
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
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=s.text):n.push(o);continue}if(t){let s="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(s);break}else throw new Error(s)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,o=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(o=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)a.includes(o[0].slice(o[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,o.index)+"["+"a".repeat(o[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(o=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,o.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let i;for(;(o=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)i=o[2]?o[2].length:0,r=r.slice(0,o.index+i)+"["+"a".repeat(o[0].length-i-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let s=!1,l="";for(;t;){s||(l=""),s=!1;let a;if(this.options.extensions?.inline?.some(d=>(a=d.call({lexer:this},t,n))?(t=t.substring(a.raw.length),n.push(a),!0):!1))continue;if(a=this.tokenizer.escape(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.tag(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.link(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(a.raw.length);let d=n.at(-1);a.type==="text"&&d?.type==="text"?(d.raw+=a.raw,d.text+=a.text):n.push(a);continue}if(a=this.tokenizer.emStrong(t,r,l)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.codespan(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.br(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.del(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.autolink(t)){t=t.substring(a.raw.length),n.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(t))){t=t.substring(a.raw.length),n.push(a);continue}let u=t;if(this.options.extensions?.startInline){let d=1/0,m=t.slice(1),b;this.options.extensions.startInline.forEach(h=>{b=h.call({lexer:this},m),typeof b=="number"&&b>=0&&(d=Math.min(d,b))}),d<1/0&&d>=0&&(u=t.substring(0,d+1))}if(a=this.tokenizer.inlineText(u)){t=t.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),s=!0;let d=n.at(-1);d?.type==="text"?(d.raw+=a.raw,d.text+=a.text):n.push(a);continue}if(t){let d="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(d);break}else throw new Error(d)}}return n}},ra=class{constructor(e){qt(this,"options");qt(this,"parser");this.options=e||Qr}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match($n.notSpaceStart)?.[0],o=e.replace($n.endingNewline,"")+`
`;return r?'<pre><code class="language-'+ur(r)+'">'+(n?o:ur(o,!0))+`</code></pre>
`:"<pre><code>"+(n?o:ur(o,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${ur(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),o=Np(e);if(o===null)return r;e=o;let i='<a href="'+e+'"';return t&&(i+=' title="'+ur(t)+'"'),i+=">"+r+"</a>",i}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let o=Np(e);if(o===null)return ur(n);e=o;let i=`<img src="${e}" alt="${n}"`;return t&&(i+=` title="${ur(t)}"`),i+=">",i}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:ur(e.text)}},Xl=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},Un=class Ul{constructor(t){qt(this,"options");qt(this,"renderer");qt(this,"textRenderer");this.options=t||Qr,this.options.renderer=this.options.renderer||new ra,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Xl}static parse(t,n){return new Ul(n).parse(t)}static parseInline(t,n){return new Ul(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let o=t[r];if(this.options.extensions?.renderers?.[o.type]){let s=o,l=this.options.extensions.renderers[s.type].call({parser:this},s);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(s.type)){n+=l||"";continue}}let i=o;switch(i.type){case"space":{n+=this.renderer.space(i);break}case"hr":{n+=this.renderer.hr(i);break}case"heading":{n+=this.renderer.heading(i);break}case"code":{n+=this.renderer.code(i);break}case"table":{n+=this.renderer.table(i);break}case"blockquote":{n+=this.renderer.blockquote(i);break}case"list":{n+=this.renderer.list(i);break}case"checkbox":{n+=this.renderer.checkbox(i);break}case"html":{n+=this.renderer.html(i);break}case"def":{n+=this.renderer.def(i);break}case"paragraph":{n+=this.renderer.paragraph(i);break}case"text":{n+=this.renderer.text(i);break}default:{let s='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(s),"";throw new Error(s)}}}return n}parseInline(t,n=this.renderer){let r="";for(let o=0;o<t.length;o++){let i=t[o];if(this.options.extensions?.renderers?.[i.type]){let l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(i.type)){r+=l||"";continue}}let s=i;switch(s.type){case"escape":{r+=n.text(s);break}case"html":{r+=n.html(s);break}case"link":{r+=n.link(s);break}case"image":{r+=n.image(s);break}case"checkbox":{r+=n.checkbox(s);break}case"strong":{r+=n.strong(s);break}case"em":{r+=n.em(s);break}case"codespan":{r+=n.codespan(s);break}case"br":{r+=n.br(s);break}case"del":{r+=n.del(s);break}case"text":{r+=n.text(s);break}default:{let l='Token with "'+s.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return r}},ea,Cs=(ea=class{constructor(e){qt(this,"options");qt(this,"block");this.options=e||Qr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Bn.lex:Bn.lexInline}provideParser(){return this.block?Un.parse:Un.parseInline}},qt(ea,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),qt(ea,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),ea),_y=class{constructor(...e){qt(this,"defaults",Wl());qt(this,"options",this.setOptions);qt(this,"parse",this.parseMarkdown(!0));qt(this,"parseInline",this.parseMarkdown(!1));qt(this,"Parser",Un);qt(this,"Renderer",ra);qt(this,"TextRenderer",Xl);qt(this,"Lexer",Bn);qt(this,"Tokenizer",na);qt(this,"Hooks",Cs);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let o=r;for(let i of o.header)n=n.concat(this.walkTokens(i.tokens,t));for(let i of o.rows)for(let s of i)n=n.concat(this.walkTokens(s.tokens,t));break}case"list":{let o=r;n=n.concat(this.walkTokens(o.items,t));break}default:{let o=r;this.defaults.extensions?.childTokens?.[o.type]?this.defaults.extensions.childTokens[o.type].forEach(i=>{let s=o[i].flat(1/0);n=n.concat(this.walkTokens(s,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(o=>{if(!o.name)throw new Error("extension name required");if("renderer"in o){let i=t.renderers[o.name];i?t.renderers[o.name]=function(...s){let l=o.renderer.apply(this,s);return l===!1&&(l=i.apply(this,s)),l}:t.renderers[o.name]=o.renderer}if("tokenizer"in o){if(!o.level||o.level!=="block"&&o.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let i=t[o.level];i?i.unshift(o.tokenizer):t[o.level]=[o.tokenizer],o.start&&(o.level==="block"?t.startBlock?t.startBlock.push(o.start):t.startBlock=[o.start]:o.level==="inline"&&(t.startInline?t.startInline.push(o.start):t.startInline=[o.start]))}"childTokens"in o&&o.childTokens&&(t.childTokens[o.name]=o.childTokens)}),r.extensions=t),n.renderer){let o=this.defaults.renderer||new ra(this.defaults);for(let i in n.renderer){if(!(i in o))throw new Error(`renderer '${i}' does not exist`);if(["options","parser"].includes(i))continue;let s=i,l=n.renderer[s],a=o[s];o[s]=(...u)=>{let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d||""}}r.renderer=o}if(n.tokenizer){let o=this.defaults.tokenizer||new na(this.defaults);for(let i in n.tokenizer){if(!(i in o))throw new Error(`tokenizer '${i}' does not exist`);if(["options","rules","lexer"].includes(i))continue;let s=i,l=n.tokenizer[s],a=o[s];o[s]=(...u)=>{let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d}}r.tokenizer=o}if(n.hooks){let o=this.defaults.hooks||new Cs;for(let i in n.hooks){if(!(i in o))throw new Error(`hook '${i}' does not exist`);if(["options","block"].includes(i))continue;let s=i,l=n.hooks[s],a=o[s];Cs.passThroughHooks.has(i)?o[s]=u=>{if(this.defaults.async&&Cs.passThroughHooksRespectAsync.has(i))return(async()=>{let m=await l.call(o,u);return a.call(o,m)})();let d=l.call(o,u);return a.call(o,d)}:o[s]=(...u)=>{if(this.defaults.async)return(async()=>{let m=await l.apply(o,u);return m===!1&&(m=await a.apply(o,u)),m})();let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d}}r.hooks=o}if(n.walkTokens){let o=this.defaults.walkTokens,i=n.walkTokens;r.walkTokens=function(s){let l=[];return l.push(i.call(this,s)),o&&(l=l.concat(o.call(this,s))),l}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Bn.lex(e,t??this.defaults)}parser(e,t){return Un.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},o={...this.defaults,...r},i=this.onError(!!o.silent,!!o.async);if(this.defaults.async===!0&&r.async===!1)return i(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return i(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return i(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(o.hooks&&(o.hooks.options=o,o.hooks.block=e),o.async)return(async()=>{let s=o.hooks?await o.hooks.preprocess(t):t,l=await(o.hooks?await o.hooks.provideLexer():e?Bn.lex:Bn.lexInline)(s,o),a=o.hooks?await o.hooks.processAllTokens(l):l;o.walkTokens&&await Promise.all(this.walkTokens(a,o.walkTokens));let u=await(o.hooks?await o.hooks.provideParser():e?Un.parse:Un.parseInline)(a,o);return o.hooks?await o.hooks.postprocess(u):u})().catch(i);try{o.hooks&&(t=o.hooks.preprocess(t));let s=(o.hooks?o.hooks.provideLexer():e?Bn.lex:Bn.lexInline)(t,o);o.hooks&&(s=o.hooks.processAllTokens(s)),o.walkTokens&&this.walkTokens(s,o.walkTokens);let l=(o.hooks?o.hooks.provideParser():e?Un.parse:Un.parseInline)(s,o);return o.hooks&&(l=o.hooks.postprocess(l)),l}catch(s){return i(s)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+ur(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},Vr=new _y;function Dt(e,t){return Vr.parse(e,t)}Dt.options=Dt.setOptions=function(e){return Vr.setOptions(e),Dt.defaults=Vr.defaults,Bp(Dt.defaults),Dt};Dt.getDefaults=Wl;Dt.defaults=Qr;Dt.use=function(...e){return Vr.use(...e),Dt.defaults=Vr.defaults,Bp(Dt.defaults),Dt};Dt.walkTokens=function(e,t){return Vr.walkTokens(e,t)};Dt.parseInline=Vr.parseInline;Dt.Parser=Un;Dt.parser=Un.parse;Dt.Renderer=ra;Dt.TextRenderer=Xl;Dt.Lexer=Bn;Dt.lexer=Bn.lex;Dt.Tokenizer=na;Dt.Hooks=Cs;Dt.parse=Dt;var Y0=Dt.options,V0=Dt.setOptions,Q0=Dt.use,X0=Dt.walkTokens,Z0=Dt.parseInline;var J0=Un.parse,eA=Bn.lex;function xr(e){let t=Dt.parse(e),n=Lp.sanitize(t);return Dp(n)}function dr(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function Ro(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function ia(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var Jp={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},my={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},gy=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,hy=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function Wn(e){return!!e&&typeof e=="object"}function Zl(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function Jl(e,t){let n=Zl(e),r=Zl(t),o=new Map;for(let l of n)o.set(l,(o.get(l)||0)+1);let i=0;for(let l of r){let a=o.get(l)||0;a>0?o.set(l,a-1):i+=1}let s=0;for(let l of o.values())s+=l;return{added:i,removed:s}}function ef(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(o=>Wn(o)&&typeof o.text=="string"?o.text:"").join(""):Wn(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(o=>o.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function by(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:Jp[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=Zl(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:o,removed:i}=Jl(n.old_string,n.new_string);r.added=o,r.removed=i}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let o=0,i=0,s=Array.isArray(n.edits)?n.edits:[];for(let l of s){let a=Jl(Wn(l)?l.old_string:"",Wn(l)?l.new_string:"");o+=a.added,i+=a.removed}r.added=o,r.removed=i}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(r.launch_id=e.id),typeof n.description=="string"&&(r.command=n.description)),r}function ec(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}var yy=/<system-reminder>[\s\S]*?<\/system-reminder>/g;function tf(e){let t;if(typeof e=="string")t=e;else if(Array.isArray(e))t=e.filter(r=>Wn(r)&&r.type==="text"&&typeof r.text=="string").map(r=>String(r.text)).join(`
`);else return null;let n=t.replace(yy,"").trim();return n.length>0?{kind:"user",text:n}:null}function tc(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=gy.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:hy.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function vy(e,t){if(e.subtype==="init"){let n=typeof e.model=="string"?e.model:"";return t.progress=null,[{kind:"thinking",text:n?`\uC138\uC158 \uC2DC\uC791 \xB7 ${n}`:"\uC138\uC158 \uC2DC\uC791"}]}if(e.subtype==="thinking_tokens"){let r=`\uC0DD\uAC01 \uC911\u2026 ${typeof e.estimated_tokens=="number"&&Number.isFinite(e.estimated_tokens)?Math.max(0,Math.round(e.estimated_tokens)):0} \uD1A0\uD070`;return t.progress?(t.progress.text=r,[]):(t.progress={kind:"thinking",text:r},[t.progress])}return[]}function ky(e,t){let n=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let r=e.message,o=r&&Array.isArray(r.content)?r.content:[],i=[];for(let s of o)if(Wn(s)){if(s.type==="text"&&typeof s.text=="string")i.push(tc(s.text));else if(s.type==="thinking"){let l=ec(s.thinking);l&&i.push(l)}else if(s.type==="tool_use"){let l=by(s);typeof s.id=="string"&&t.set(s.id,l),i.push(l)}}return n?Zp(i,n):i}if(e.type==="user"){let r=e.message,o=r&&Array.isArray(r.content)?r.content:[];for(let s of o)if(Wn(s)&&s.type==="tool_result"){let l=t.get(String(s.tool_use_id));if(l){let a=ef(s.content);l.result=a,l.output=typeof s.content=="string"?s.content:a,s.is_error===!0&&(l.is_error=!0)}}let i=tf(r&&r.content);return i?[i]:[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success",o={kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""};return n?Zp([o],n):[o]}return[]}function Zp(e,t){for(let n of e)n.parent_tool_use_id=t;return e}function wy(e){let t=typeof e.command=="string"?e.command:"",n=ef(e.aggregated_output===void 0?e.output:e.aggregated_output),o=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",n].filter(s=>s.length>0).join(" \xB7 "),i={kind:"tool",tool:"shell",icon:Jp.Bash,command:t,input:{command:t},expandable:!0};return o.length>0&&(i.result=o),typeof e.aggregated_output=="string"&&(i.output=e.aggregated_output),i}function $y(e){if(e.type==="item.completed"&&Wn(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[tc(t.text)];if(t.type==="user_message"){let n=tf(t.text);return n?[n]:[]}if(t.type==="reasoning"){let n=ec(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[wy(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function xy(e){if(e.schema!=="codex-delegation-monitor-v1"||!Wn(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&Wn(t.item)){let n=t.item;if(typeof n.id!="string"||n.id.length===0)return[];if(t.type==="item.completed"&&n.kind==="agent_message"&&typeof n.text=="string"&&n.text.trim().length>0)return[tc(n.text)];if(t.type==="item.completed"&&n.kind==="reasoning"){let s=ec(n.text);return s?[s]:[]}if(t.type!=="item.completed"||n.kind!=="activity"||typeof n.activity!="string")return[];let r=my[n.activity];if(!r)return[];let o,i;if(n.status==="completed")o="\uC644\uB8CC",i="\u2713";else if(n.status==="failed")o="\uC2E4\uD328",i="\u2717";else return[];return[{kind:"tool",tool:`${r} \xB7 ${o}`,icon:i,expandable:!1,result:""}]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function Ay(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Sy(e){let t=e;if(typeof e=="string"){let n=e.trim();if(n.length===0)return null;try{t=JSON.parse(n)}catch{return null}}return Wn(t)?t:null}function nf(e={}){let t=e.skip_delegated===!0,n=new Map,r={progress:null};return{push(o){let i=Sy(o);if(!i)return[];if(t&&typeof i.parent_tool_use_id=="string"&&i.parent_tool_use_id.length>0)return[];if(i.type==="system"&&i.schema!=="codex-delegation-monitor-v1")return vy(i,r);let s=i.schema==="codex-delegation-monitor-v1"?xy(i):Ay(i)?$y(i):ky(i,n);return s.length>0&&(r.progress=null),s}}}function nc(e){let t=[],n=nf(),r=Array.isArray(e)?e:[];for(let o of r)for(let i of n.push(o))t.push(i);return t}var Ey=5,Ty=10,Cy=/Task\s+#(\d+)/,Ry=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Oy=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function Is(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Iy(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function Ly(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function Dy(e){let t=new Map,n=0;for(let o of e){if(o.kind!=="tool")continue;n+=1;let i=o.input||{};if(o.tool==="TaskCreate"){let a=Cy.exec(o.output||o.result||""),u=String(i.activeForm||i.subject||"").trim();if(!a||u.length===0)continue;t.set(a[1],{label:u,active:i.status==="in_progress"?n:0});continue}if(o.tool!=="TaskUpdate")continue;let s=t.get(String(i.taskId??""));if(!s)continue;let l=i.activeForm||i.subject;typeof l=="string"&&l.trim().length>0&&(s.label=l.trim()),typeof i.status=="string"&&(s.active=i.status==="in_progress"?n:0)}let r=null;for(let o of t.values())o.active>0&&(!r||o.active>r.active)&&(r=o);return r?r.label:null}function Py(e){if(e.tool==="Bash"){let t=e.command||"";return Ry.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Oy.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function My(e){let t=e.filter(o=>o.kind==="tool").slice(-Ty),n=new Map;t.forEach((o,i)=>{let s=Py(o);if(!s)return;let l=n.get(s)||{count:0,last:-1};l.count+=1,l.last=i,n.set(s,l)});let r=null;for(let[o,i]of n)(!r||i.count>r.count||i.count===r.count&&i.last>r.last)&&(r={label:o,count:i.count,last:i.last});return r?r.label:null}function qy(e){let t=Ly(e);if(t)return{text:t,guess:!1};let n=Dy(e);if(n)return{text:n,guess:!1};let r=My(e);return r?{text:r,guess:!0}:null}function Ny(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:bn(e,t)}function Oo(e,t={}){let{transport:n,sessionLogStore:r,onClose:o}=t,i=null,s=null,l=null,a=null,u=null,d=!1,m={},b=!0,h=new Set,k=new Set,S=null,T=null,ee=!1,re=!1,U=!1,L=null,R=null;function P(){ee=!1,re=!1,U=!1,L=null,R=null}async function q(J){if(n){re=!0,U=!1,Ie();try{let X=await Promise.resolve(n("get-attempt-prompt",{attempt_id:J,...u?{root_dir:u}:{}}));if(i!==J)return;!X||typeof X!="object"||Array.isArray(X)?U=!0:(L=X,R=J)}catch{i===J&&(U=!0)}finally{i===J&&(re=!1,Ie())}}}function W(){if(ee=!ee,ee&&i&&R!==i){q(i);return}Ie()}function F(){if(!ee)return"";let J=Ro({loading:re,error:U});if(J)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${J}
      </div>`;if(!L)return"";if(L.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let X=ia(L.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${X?c`<div class="prompt-block__meta">${X} 발송</div>`:""}
      ${typeof L.task_prompt=="string"?dr("\uACFC\uC5C5 (user)",L.task_prompt):""}
      ${typeof L.system_prompt=="string"?dr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",L.system_prompt):""}
    </div>`}function D(){if(!a||!r)return[];let J=r.get(a);return nc(J?J.lines:[])}function V(){if(!a||!r)return null;let J=r.get(a),X=J?J.last_event_at:null;return typeof X=="number"?X:null}function j(){return m.status==="running"}function ne(){if(j()&&i){T||(T=setInterval(()=>Ie(),1e3));return}me()}function me(){T&&(clearInterval(T),T=null)}function Oe(J){let X=[],Ee=0;for(;Ee<J.length;){let{idx:Je,line:st}=J[Ee];if(st.kind==="tool"){let Ue=Ee;for(;Ue<J.length&&J[Ue].line.kind==="tool"&&J[Ue].line.tool===st.tool;)Ue+=1;if(Ue-Ee>=Ey&&!k.has(Je)){X.push({kind:"group",idx:Je,tool:st.tool||"",lines:J.slice(Ee,Ue)}),Ee=Ue;continue}}X.push({kind:"line",idx:Je,line:st}),Ee+=1}return X}function H(J){let X=[],Ee=new Map;for(let Ue=0;Ue<J.length;Ue+=1){let et=J[Ue],vt=et.parent_tool_use_id;if(typeof vt=="string"&&vt.length>0){let ut=Ee.get(vt);ut||(ut={kind:"subagent",idx:Ue,launch_id:vt,agent_type:null,header:null,lines:[]},Ee.set(vt,ut),X.push(ut)),ut.lines.push({idx:Ue,line:et});continue}if(et.kind==="tool"&&et.tool==="Agent"&&typeof et.launch_id=="string"&&et.launch_id.length>0){let ut=te(et),Ze=Ee.get(et.launch_id);if(Ze){Ze.header={idx:Ue,line:et},Ze.agent_type=ut;continue}let dt={kind:"subagent",idx:Ue,launch_id:et.launch_id,agent_type:ut,header:{idx:Ue,line:et},lines:[]};Ee.set(et.launch_id,dt),X.push(dt);continue}X.push({kind:"entry",idx:Ue,line:et})}let Je=[],st=0;for(;st<X.length;){if(X[st].kind!=="entry"){Je.push(X[st]),st+=1;continue}let Ue=st;for(;Ue<X.length&&X[Ue].kind==="entry";)Ue+=1;Je.push(...Oe(X.slice(st,Ue))),st=Ue}return Je}function te(J){let X=J.input;return X&&typeof X.subagent_type=="string"?X.subagent_type:null}function ce(J){for(let X=J.length-1;X>=0;X-=1){let Ee=J[X];if(Ee.kind==="result"||Ee.kind==="error")return null;if(Ee.kind==="tool"&&!Object.hasOwn(Ee,"result"))return Ee}return null}function Te(J){for(let X=J.length-1;X>=0;X-=1)if(J[X].kind==="thinking")return J[X];return null}function K(J,X){if(X.kind==="gate")return c`<div class="sv__gate">${X.text}</div>`;if(X.kind==="phase")return c`<div class="sv__phase">${X.text}</div>`;if(X.kind==="result")return c`<div
        class="sv__result${X.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${X.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${xr(X.text||(X.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(X.kind==="thinking"){let Ee=h.has(J);return c`<div
        class="sv__think${Ee?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>_t(J)}
      >
        <span class="sv__think-line">💭 ${Is(X.text)}</span>
        ${Ee?c`<pre class="sv__think-expand">${X.text}</pre>`:""}
      </div>`}if(X.kind==="user"){let Ee=h.has(J);return c`<div
        class="sv__line sv__line--user${Ee?" sv__line--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>_t(J)}
      >
        <span class="sv__user-line">▷ ${Is(X.text)}</span>
        ${Ee?c`<pre class="sv__user-expand">${X.text}</pre>`:""}
      </div>`}if(X.kind==="error")return c`<div class="sv__error">⛔ ${X.text}</div>`;if(X.kind==="blocker")return c`<div class="sv__error">⛔ ${X.text}</div>`;if(X.kind==="tool"){let Ee=h.has(J),Je=X.tool==="Bash"?Iy(X.command):0,st=X.tool==="Bash"?Je>1?Is(X.command):X.command:X.path||X.command||"";return c`<div
        class="sv__tool${Ee?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>_t(J)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${X.icon}</span>
          <span class="sv__tool-name">${X.tool}</span>
          ${st?c`<span class="sv__tool-detail">${st}</span>`:""}
          ${Je>1?c`<span class="sv__tool-more">⋯ ${Je}줄</span>`:""}
          ${typeof X.added=="number"?c`<span class="sv__diff-add">+${X.added}</span>`:""}
          ${typeof X.removed=="number"?c`<span class="sv__diff-del">−${X.removed}</span>`:""}
          ${X.result?c`<span class="sv__tool-ok">→ ${X.result}</span>`:""}
        </span>
        ${Ee?c`<pre class="sv__tool-expand">${ae(X)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${xr(X.text||"")}</div>`}function ae(J){let X=[];if(J.tool==="Bash"&&typeof J.command=="string"&&J.command.length>0)X.push(J.command);else if(J.input!==void 0)try{X.push(`input: ${JSON.stringify(J.input,null,2)}`)}catch{}return typeof J.output=="string"&&J.output.length>0&&X.push(`output:
${J.output}`),X.join(`

`)}function Q(){if(!i)return c``;let J=D(),X=(s?[m.agent_type,m.model,m.effort]:[m.runner,m.model,m.effort]).filter(Boolean).join(" \xB7 "),Ee=m.session_id||"",Je=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${b?"ON":"OFF"}`,st=j(),Ue=st?Ny(V(),Date.now()):"",et=st?ce(J):null,vt=st?Te(J):null,ut=qy(J);return c`<div class="sv" data-attempt-id=${i}>
      <div class="sv__bar">
        <span class="sv__id"
          >${m.label||(s?m.role||"":i)}</span
        >
        ${ut?c`<span
              class="sv__stage${ut.guess?" sv__stage--guess":""}"
              title=${ut.text}
              >${ut.text}</span
            >`:""}
        ${st?c`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${Ue?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${Ue}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${Ue?c`<span class="sv__live-ago">${Ue}</span>`:""}</span
            >`:""}
        ${Ee?c`<button
              type="button"
              class="sv__session"
              title=${Ee}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${Ee}`}
              @click=${()=>pe(Ee)}
            >
              ⧉ ${Ee.slice(0,8)}
            </button>`:""}
        ${m.resume_command?c`<button
              type="button"
              class="sv__resume-cmd"
              title=${m.resume_command}
              aria-label=${`\uC7AC\uAC1C \uBA85\uB839 \uBCF5\uC0AC: ${m.resume_command}`}
              @click=${()=>pe(m.resume_command||"")}
            >
              ⧉ 재개 명령
            </button>`:""}
        ${X?c`<span class="sv__meta">${X}</span>`:""}
        ${m.worktree?c`<span class="sv__wt" title=${m.worktree}
              >${m.worktree}</span
            >`:""}
        ${s||d?"":c`<button
              type="button"
              class="sv__prompt-toggle${ee?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${ee?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${W}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${b?" sv__follow--on":""}"
          aria-pressed=${b?"true":"false"}
          aria-label=${Je}
          @click=${G}
        >
          <span class="sv__follow-full">⇣ ${Je}</span>
          <span class="sv__follow-short">⇣ ${b?"ON":"OFF"}</span>
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
      ${s||d?"":F()}
      <div class="sv__body">
        ${J.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:H(J).map(Ze=>Ze.kind==="subagent"?Re(Ze):Ze.kind==="group"?de(Ze):K(Ze.idx,Ze.line))}
      </div>
      ${et||vt?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${et?c`<span class="sv__now-icon">${et.icon}</span>
                  <span class="sv__now-name">${et.tool}</span>
                  <span class="sv__now-detail"
                    >${et.tool==="Bash"?Is(et.command):et.path||et.command||""}</span
                  >`:""}
            ${vt?c`<span class="sv__now-think"
                  >💭 ${Is(vt.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function de(J){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>be(J.idx)}
    >
      <span class="sv__group-icon">${J.lines[0].line.icon}</span>
      <span class="sv__group-name">${J.tool}</span>
      <span class="sv__group-count">${J.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function Re(J){let X=k.has(J.idx),Ee=J.header?J.header.line:null,Je=Ee?Ee.is_error===!0?"\u2717":typeof Ee.result=="string"?"\u2713":"\u27F3":"",st=Ee&&Ee.command?Ee.command:"";return c`<div class="sv__sub${X?" sv__sub--open":""}">
      <div
        class="sv__sub-head"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>be(J.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${J.agent_type||"subagent"}</span>
        ${st?c`<span class="sv__sub-detail">${st}</span>`:""}
        <span class="sv__sub-count">${J.lines.length}줄</span>
        ${Je?c`<span class="sv__sub-state">${Je}</span>`:""}
        ${X?"":c`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${X?c`<div class="sv__sub-body">
            ${Oe(J.lines).map(Ue=>Ue.kind==="group"?de(Ue):K(Ue.idx,Ue.line))}
          </div>`:""}
    </div>`}function be(J){k.add(J),Ie()}function Ie(){ft(Q(),e),ne(),b&&Ye()}function Ye(){let J=e.querySelector(".sv__body");J&&(J.scrollTop=J.scrollHeight)}function _t(J){h.has(J)?h.delete(J):h.add(J),Ie()}function G(){b=!b,Ie()}function pe(J){yn(J).then(X=>{X?_e("\uBCF5\uC0AC\uB428","success",1200):_e("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function oe(J){!i||!J||(m={...m,...J},Ie())}function Y(J){let X=J.target;if(!X||!X.classList||!X.classList.contains("sv__body"))return;!(X.scrollHeight-X.scrollTop-X.clientHeight<=4)&&b&&(b=!1,Ie())}e.addEventListener("scroll",Y,!0);function we(J){let X=J.target;!X||typeof X.closest!="function"||e.contains(X)||X.closest("dialog")||X.closest(".md-viewer-root")||Fe()}let fe=!1;function Ce(){fe||(document.addEventListener("mousedown",we),fe=!0)}function Ne(){fe&&(document.removeEventListener("mousedown",we),fe=!1)}function Qe(J){let X=J&&J.attempt_id;if(!X)return;let Ee=typeof J.launch_id=="string"&&J.launch_id.length>0?J.launch_id:null,Je=J.session_ref&&typeof J.session_ref=="object"?J.session_ref:null;if(Ee&&Je)return;let st=a;i=X,s=Ee,l=Je,a=s?`session-log:${i}:${s}`:`session-log:${i}`,n&&st&&st!==a&&Promise.resolve(n("unsubscribe-session-log",{id:st})).catch(()=>{}),u=typeof J.root_dir=="string"&&J.root_dir.length>0?J.root_dir:null,m=J.meta||{},d=J.hide_prompt===!0,b=!0,h.clear(),k.clear(),P(),!S&&r&&(S=r.subscribe(Ie)),n&&Promise.resolve(n("subscribe-session-log",{id:a,attempt_id:i,...s?{launch_id:s}:{},...l?{session_ref:l}:{},...u?{root_dir:u}:{}})).catch(()=>{}),Ce(),Ie()}function Fe(){let J=a;Ne(),i=null,s=null,l=null,a=null,u=null,d=!1,h.clear(),k.clear(),P(),me(),n&&J&&Promise.resolve(n("unsubscribe-session-log",{id:J})).catch(()=>{}),ft(c``,e),o&&o()}return{open:Qe,updateMeta:oe,close:Fe,isOpen(){return i!==null},destroy(){me(),Ne(),S&&(S(),S=null),e.removeEventListener("scroll",Y,!0),i=null,s=null,l=null,a=null,u=null,d=!1,ft(c``,e)}}}function jy(e){let t=[],n=e?.workflow?.stages,r=n?.spec?.doc;r&&t.push({kind:"spec",path:r.path,missing_state:r.missing_state});let o=n?.plan?.doc;return o&&t.push({kind:"plan",path:o.path,missing_state:o.missing_state}),t}function rf(e,t){let n=jy(e);return c`
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
  `}var Fy="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",By=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,Uy=/^\*\*결론\*\* — (.+)$/;function aa(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==Fy)return null;let n=By.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],o=n[2],i=n[3],s=2;for(;s<t.length&&t[s].trim().length===0;)s+=1;let l=s<t.length?Uy.exec(t[s]):null,a=l?l[1].replace(/\s+/g," ").trim():"",u=l?s+1:s;return{lane:r,identifier:o,timestamp:i,conclusion:a,body:t.slice(u).join(`
`).trim()}}var of=20;function sf(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),o=String(t.getHours()).padStart(2,"0"),i=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${o}:${i}`}function Wy(e){return e.length>of?`${e.slice(0,of)}\u2026`:e}function zy(e,t,n,r){let o=`${t.lane} ${Wy(t.identifier)}`;return c`<div class="detail-report">
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
        <span class="detail-report__time">${sf(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${r&&t.body.length>0?c`<div class="detail-report__body">
          ${xr(t.body)}
        </div>`:""}
  </div>`}function Hy(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${sf(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${xr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function af(e,t={},n={}){let r=Array.isArray(e)?e.filter(Boolean):[],o=n.expanded||new Set,i=typeof n.draft=="string"?n.draft:"",s=n.sending===!0,l=r.slice().sort((a,u)=>String(u.created_at||"").localeCompare(String(a.created_at||"")));return c`
    <div class="detail-section-label">댓글 (${r.length})</div>
    ${n.error?c`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:l.length===0?c`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:c`<div class="detail-comments" data-seam="comments">
            ${l.map(a=>{let u=aa(typeof a.text=="string"?a.text:"");return u?zy(a,u,t,o.has(a.id)):Hy(a)})}
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
  `}var{I:LA}=Lc;var lf=e=>e.strings===void 0;var Ky={},cf=(e,t=Ky)=>e._$AH=t;var Ar=Zi(class extends Co{constructor(e){if(super(e),e.type!==cr.PROPERTY&&e.type!==cr.ATTRIBUTE&&e.type!==cr.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!lf(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===In||t===Ht)return t;let n=e.element,r=e.name;if(e.type===cr.PROPERTY){if(t===n[r])return In}else if(e.type===cr.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return In}else if(e.type===cr.ATTRIBUTE&&n.getAttribute(r)===t+"")return In;return cf(e),t}});var Gy=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review",receipt_stage:null,fill_stage:"spec",stale_stage:"spec",hue:"spec"},{id:"plan",label:"\uACC4\uD68D \uB9AC\uBDF0",receipt:null,receipt_stage:"plan",fill_stage:"plan",stale_stage:"plan",hue:"plan"},{id:"impl",label:"\uAD6C\uD604",receipt:null,receipt_stage:null,fill_stage:"impl",stale_stage:null,hue:"impl"},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review",receipt_stage:null,fill_stage:null,stale_stage:"impl",hue:"impl"},{id:"pr",label:"PR",receipt:null,receipt_stage:null,fill_stage:"pr",stale_stage:null,hue:"pr"}],rc={quick_fix:["impl","impl_review"],spec_backed:["spec","impl","impl_review","pr"],full_plan:["spec","plan","impl","impl_review","pr"]},uf={missing:"\uC2B9\uC778 \uD544\uC694",stale:"\uC7AC\uC2B9\uC778 \uD544\uC694",unknown:"\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"},Yy={pin:"pin",global:"global",base:"base"};function Vy(e){return c`<span
    class=${`detail-layer-rail detail-layer-rail--${Yy[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function Qy(e,t,n){switch(e){case"workflow_mode":return Xo;case"spec_review_model":case"impl_review_model":return Zo;case"plan_review_model":return mi;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return gi;case"spec_review_speed":case"plan_review_speed":case"impl_review_speed":return Qn;case"impl_dispatch":return Qo;case"impl_runtime":return _i;case"impl_model":return ko(n,t.impl_runtime);case"impl_effort":return Fr(n,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return Qn;case"orchestration_model":return wo(n,null);case"orchestration_effort":return Fr(n,void 0,t.orchestration_model||En).filter(r=>r!==En);default:return[]}}function Xy(e,t){return c`<div class="detail-effective__row" data-key=${e.key}>
    ${Vy(e.source)}
    <span class="detail-effective__k"
      >${yr[e.key]||e.key}</span
    >
    <span
      class=${`detail-effective__v${e.source==="base"?" detail-effective__v--dim":""}`}
      title=${e.full_value||""}
      >${e.display}</span
    >
    <span
      class=${`detail-effective__badge detail-effective__badge--${e.source}`}
      >${bi[e.source]}</span
    >
    ${t.expanded?c`<select
          class="detail-effective__edit"
          data-edit-key=${e.key}
          aria-label=${`${yr[e.key]||e.key} \uD3B8\uC9D1`}
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
  </div>`}function df(e,t){let n=el.flatMap(a=>a.keys),r=tl(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=td(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),i=Object.fromEntries(r.map(a=>[a.key,a])),s=Object.fromEntries(r.filter(a=>a.value!==null).map(a=>[a.key,a.value])),l=r.filter(a=>a.full_value&&a.display!==a.full_value).map(a=>a.full_value).join(" \xB7 ");return c`<details
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
        >${Zy(i)}</span
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
          ${el.map(a=>c`
              <div class="detail-effective__subhead">${a.label}</div>
              ${r.filter(u=>a.keys.includes(u.key)).map(u=>{let d=ci({key:u.key,choices:Qy(u.key,s,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return Xy(u,{expanded:e.expanded,options:d.options,default_label:d.unset_label,default_full_value:d.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="실행 프리셋"
              .value=${Ar(e.preset_id)}
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
  </details>`}function Zy(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let n=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${n}`)}for(let n of["impl_model","impl_effort","impl_speed"])e[n]?.resolution!=="not_applicable"&&t.push(e[n]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function Jy(e){if(!e||typeof e!="object")return null;let{kind:t,actor:n,effort:r,sha:o}=e;return typeof t!="string"||typeof n!="string"||typeof o!="string"?null:{kind:t,actor:n,effort:typeof r=="string"?r:null,sha:o}}function pf(e,t={}){let n=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},o=r.stages||{},i=r.route||n.route||null,s=typeof n.pr_url=="string"?n.pr_url:"",l=typeof n.exec_receipt=="string"?n.exec_receipt:"",a=Jy(r.exec_receipt),u=a?rr(a):l,d=a?`${a.kind}:${a.actor}`:l.split("@")[0],m=ii(r.planned_execution,r.exec_receipt),b=r.chips?.pr?.number,h=typeof b=="number"?`PR #${b}`:"PR",k=es(n),S=k!==null&&t.isChipOpen?.("rec")===!0,T=S?fl({rec:k},"rec"):null;return c`<section class="detail-summary" data-seam="detail-summary">
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
            >${h}</a
          >`:""}
      ${m?c`<span
            class="detail-summary__chip detail-summary__chip--planned ctl-chip--planned"
            data-kind=${m.kind}
            title=${m.title}
            >${m.label}</span
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
            aria-expanded=${S?"true":"false"}
            title=${wi(k)}
            @click=${()=>t.onChipToggle?.("rec")}
          >
            ${"\uBCF5\uC7A1"}
          </button>`:""}
    </div>
    ${T?bo(T):""}
    <div
      class="detail-summary__gates"
      role="group"
      aria-label="워크플로 게이트"
    >
      ${ev(i).map(ee=>tv(ee,n,o,{label:ee.id==="pr"?h:ee.label,href:ee.id==="pr"?s:""}))}
    </div>
  </section>`}function ev(e){let n=typeof e=="string"&&Object.hasOwn(rc,e)&&rc[e]||rc.spec_backed;return Gy.filter(r=>n.includes(r.id))}var la={on:"\uD1B5\uACFC",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",current:"\uC9C4\uD589 \uC911",none:"\uBBF8\uB3C4\uB2EC"};function tv(e,t,n,r){let o=nv(e,t,n),i=e.fill_stage?n[e.fill_stage]:null,s=typeof i?.fill=="string"?i.fill:null,l=s?s==="full":o.length>0,a=!l&&s==="dim",u=e.stale_stage?n[e.stale_stage]?.stale===!0:!1,d=o&&o.split("@")[1]?.slice(0,7)||"",m=u?la.stale:l?la.on:a?la.current:la.none,b=rv(e,n),h=`${r.label} \xB7 ${m}${b?` \xB7 ${b}`:""}${o?` \xB7 ${o}`:""}`,k=`detail-summary__gate${l?" detail-summary__gate--on":""}${a?" detail-summary__gate--current":""}${u?" detail-summary__gate--stale":""}${d?" detail-summary__gate--receipt":""}`,S=c`<span class="detail-summary__gate-label"
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
      title=${h}
      >${S}</a
    >`:c`<span
    class=${k}
    data-gate=${e.id}
    data-hue=${e.hue}
    title=${h}
    >${S}</span
  >`}function nv(e,t,n){if(e.receipt&&typeof t[e.receipt]=="string")return String(t[e.receipt]);if(e.receipt_stage){let r=n[e.receipt_stage]?.receipt;return typeof r=="string"?r:""}return""}function rv(e,t){if(e.id!=="plan")return"";let n=t.plan?.approval_state;return typeof n=="string"&&Object.hasOwn(uf,n)?uf[n]:""}function ca(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function ff(e){return ca(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function _f(e,t){let n=e&&e[t];if(!ca(n)||!Array.isArray(n.accounts))return null;let r=n.accounts.filter(ff),o=ff(n.active)?n.active:null;return{accounts:r,active:o||r.find(i=>i.active===!0)||null}}function hf(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function ua(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${hf(e)}${t}`}function Io(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${hf(e)}`}function ov(e,t,n){if(n!==null){let o=e==="claude"?ua:Io,i=t?t.accounts.find(s=>s.key===n):void 0;return`\uB808\uD3EC \uAE30\uBCF8\uAC12 \uC0AC\uC6A9(${i?o(i):n})`}return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:Io({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function mf(e,t){if(!ca(e)||e.state!=="usable"||!ca(e.values))return null;let n=e.values[t];return typeof n=="string"&&n.length>0?n:null}function gf(e){let t=e.provider_key==="claude"?ua:Io,n=!!e.provider?.accounts.some(r=>r.key===e.selected);return c`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${r=>e.handlers.onExecChange(e.key,r.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${ov(e.provider_key,e.provider,e.workspace_default)}
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
  </div>`}function bf({md:e,catalog:t,workspace_defaults:n=null,handlers:r}){let o=typeof e.claude_account=="string"?e.claude_account:"",i=typeof e.codex_account=="string"?e.codex_account:"";return c`<section class="exec-accounts" data-exec-accounts>
    <div class="detail-section-label">실행 계정</div>
    <div class="exec-settings-core">
      ${gf({key:"claude_account",title:"Claude \uACC4\uC815",provider_key:"claude",provider:_f(t,"claude"),selected:o,workspace_default:mf(n,"claude_account"),handlers:r,hint:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uB7F0\uD0C0\uC784\uC774 claude\uC77C \uB54C \uC801\uC6A9\uB429\uB2C8\uB2E4"})}
      ${gf({key:"codex_account",title:"Codex \uACC4\uC815",provider_key:"codex",provider:_f(t,"codex"),selected:i,workspace_default:mf(n,"codex_account"),handlers:r})}
    </div>
  </section>`}function sv(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function iv(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let n=t[1].trim();return{front:n.length>0?n:null,body:e.slice(t[0].length)}}function da(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),o=null,i="loading",s="",l=null,a="";function u(S){S.key==="Escape"&&o&&(S.preventDefault(),h())}document.addEventListener("keydown",u);function d(){return o?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>h()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${o}
              >${sv(o)}</span
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
            ${i==="loading"?c`<div class="mv__status">불러오는 중…</div>`:i==="pending"?c`<div class="mv__status">${a}</div>`:i==="error"?c`<div class="mv__status mv__status--error">
                      ${a||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:c`${l===null?null:c`<pre class="mv__front">
${l}</pre
                        >`}${xr(s)}`}
          </div>
        </div>
      </div>
    `:c``}function m(){ft(d(),e)}async function b(S,T={}){o=S,i="loading",s="",l=null,a="",m();let ee=T.workspace||(n?n():"");if(!ee){i="error",a="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",m();return}if(!r){i="error",a="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",m();return}let re="/api/doc?workspace="+encodeURIComponent(ee)+"&path="+encodeURIComponent(S);try{let U=await r(re),L=await U.json().catch(()=>({}));if(!U.ok||!L||L.ok!==!0){if(L?.error==="not_found"&&T.missing_state==="plan_pending"){i="pending",a="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",m();return}i="error",a="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(L&&L.error||U.status)+")",m();return}let R=iv(String(L.content||""));l=R.front,s=R.body,i="ready",m()}catch{i="error",a="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",m()}}function h(){o=null,ft(c``,e)}function k(){document.removeEventListener("keydown",u),h()}return{open:b,close:h,destroy:k}}var av=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],kf="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",pa=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],lv=new Set(["codex-runner","Explore","Plan","advisor","advisor-xhigh","claude-code-guide","statusline-setup"]);function yf(e){return typeof e=="string"&&lv.has(e)}var cv=["running","done","failed","interrupted"],uv={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function dv(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function pv(e){let t=pn(e);if(t.length>0)return t.map(o=>c`<span class="detail-usage-total" title=${o.tooltip}
          >${o.label}</span
        >`);let n=go(e);if(!n||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${n.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${kf}
          >부분 집계</span
        >`:""}`}function vf(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function ic(e){if(typeof e=="number")return Ls(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?Ls(t):""}function fv(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function wf(e,t,n){if(e.provider!=="claude"){let o=e.session_id?` \xB7 thread ${e.session_id}`:"",i=n?" \xB7 \uC774\uC804 \uB77C\uC6B4\uB4DC \uC2A4\uB808\uB4DC \uC774\uC5B4\uAC10":"";return{text:`${n?"\u21A9 ":""}${e.launch_id}`,title:`${e.launch_id}${o}${i}`,thread:e.session_id?{text:e.session_id.slice(0,8),title:e.session_id}:null}}let r=t&&typeof t.agent_id=="string"?t.agent_id:"";return r.length>0?{text:r.slice(0,8),title:r,thread:null}:{text:e.launch_id.slice(-8),title:e.launch_id,thread:null}}function $f(e){return e?c`<span
        class="detail-session__leg-thread detail-session__sid"
        title=${e.title}
        >${e.text}</span
      >`:""}function oc(e){return e===null||typeof e=="string"&&e.trim().length>0}function sc(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function _v(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,n=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!pa.some(r=>r.role===t.role&&r.provider===t.provider)||!(n?oc(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||oc(t.effort))||!(!("agent_type"in t)||oc(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!cv.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:n?!sc(t.started_at)||!sc(t.last_event_at)||!sc(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function mv(e,t,n,r){let i=pn({providers:{[t]:{subtotal:n.subtotal,breakdown:n.usage,...n.replayed?{replayed:!0}:{}}},roles:{}})[0],s=wf({provider:t,launch_id:n.receipt_id,session_id:typeof n.session_id=="string"?n.session_id:void 0},n,r);return c`<div class="detail-session__leg detail-session__usage-detail">
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
    ${$f(s.thread)}
    ${ic(n.completed_at)?c`<span class="detail-session__leg-time detail-session__time"
          >${ic(n.completed_at)}</span
        >`:""}
    ${i?c`<span class="detail-session__usage" title=${i.tooltip}
          >${i.label}</span
        >`:""}
  </div>`}function gv(e,t,n,r,o){let i=e.status==="running"?null:t,l=(i?pn({providers:{[e.provider]:{subtotal:i.subtotal,breakdown:i.usage,...i.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],a=e.status==="running"?Ls(e.last_event_at):i?ic(i.completed_at):"",u=(e.provider==="claude"?["Claude",e.agent_type,fv(e.model),e.effort]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),d=wf(e,i,o);return c`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>r.onOpenDelegation&&r.onOpenDelegation(n,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${uv[e.status]}</span
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
    ${$f(d.thread)}
    ${a?c`<span class="detail-session__leg-time detail-session__time"
          >${a}</span
        >`:""}
    ${l?c`<span class="detail-session__usage" title=${l.tooltip}
          >${l.label}</span
        >`:""}
  </button>`}function hv(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}function bv(e,t,n){let r=[],o=new Set,i=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let m of i){let b=_v(m);!b||o.has(b.launch_id)||yf(b.agent_type)||(o.add(b.launch_id),r.push(b))}r.sort((m,b)=>(m.started_at||0)-(b.started_at||0));let s={};for(let{role:m,provider:b}of pa){let h=t?t.roles[m]?.[b]:null;s[m]=h?[...h.legs]:[]}let l=pa.flatMap(({role:m})=>s[m]),a=new Set,u=new Set,d=[];for(let{role:m,provider:b}of pa){for(let h of r.filter(k=>k.role===m&&k.provider===b)){let k=l.find(T=>T.receipt_id===h.launch_id)||null;if(k&&!hv(h,k))continue;k&&a.add(k.receipt_id);let S=b==="codex"&&u.has(h.session_id);d.push(gv(h,k,e.attempt_id,n,S)),b==="codex"&&u.add(h.session_id)}for(let h of s[m])if(!a.has(h.receipt_id)&&!yf(h.agent_type)){let k=typeof h.session_id=="string"&&h.session_id.length>0?h.session_id:null,S=b==="codex"&&k!==null&&u.has(k);d.push(mv(m,b,h,S)),b==="codex"&&k!==null&&u.add(k)}}return d}function yv(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[...av,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return c`<div class="detail-session__usage-detail">
    ${r.map(o=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${o.label}</span
          ><span class="detail-session__usage-value"
            >${dv(e[o.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${n===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${n.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${kf}</span>`:""}
  </div>`}var vv={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Ls(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function kv(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,r])=>typeof r=="string"&&r.length>0).map(([r,o])=>`${r}=${o}`).join(" \xB7 "):"",n=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${n}</span>
    ${t?c`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}var wv={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function $v(e,t){let n=wv[e.locality]||"",r=e.locality==="remote"?`${e.host} \xB7 \uB2E4\uB978 \uBA38\uC2E0`:e.locality==="missing"?`${e.host} \xB7 \uD30C\uC77C \uC5C6\uC74C`:e.host;return c`<div class="detail-session-row">
    <button
      type="button"
      class="detail-session detail-session--session"
      data-session-key=${Ka(e)}
      ?disabled=${n.length>0}
      title=${n}
      @click=${()=>{n.length===0&&t.onOpenSessionRef&&t.onOpenSessionRef(e)}}
    >
      <span class="detail-session__glyph">${e.current?"\u25D0":"\xB7"}</span>
      <span class="detail-session__id">${Ko(e)}</span>
      <span class="detail-session__meta">${r}</span>
      <span class="detail-session__sid" title=${e.session_id}
        >${e.session_id.slice(0,8)}</span
      >
      <span class="detail-session__time">${Ls(e.last_event_at)}</span>
    </button>
    ${e.resume_command?c`<button
          type="button"
          class="op-btn detail-session__resume-cmd"
          title=${e.resume_command}
          @click=${o=>{o.stopPropagation(),t.onCopyResumeCommand&&e.resume_command&&t.onCopyResumeCommand(e.resume_command)}}
        >
          ⧉ 재개
        </button>`:""}
  </div>`}function xf(e,t={},n={},r=[]){let o=Array.isArray(e)?e:[],i=Array.isArray(r)?r:[],s=[...i.filter(h=>h&&h.current===!0),...i.filter(h=>h&&h.current!==!0).sort((h,k)=>k.index-h.index)],l=s.map(h=>$v(h,t)),a=n.expanded||new Set;if(o.length===0&&s.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let u=new Set;for(let h of o)h&&typeof h.resumed_from=="string"&&h.resumed_from.length>0&&u.add(h.resumed_from);let d=h=>{if(!(h.status==="failed"||h.status==="orphaned"))return"";let S=typeof h.session_id=="string"&&h.session_id.length>0,T=u.has(h.attempt_id),ee=S&&!T,re=S?T?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="op-btn detail-session__resume"
      data-attempt-id=${h.attempt_id}
      ?disabled=${!ee}
      title=${re}
      @click=${U=>{U.stopPropagation(),ee&&t.onResume&&t.onResume(h.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},m=h=>{if(!(h.status==="failed"||h.status==="orphaned")||typeof h.cause!="string"||h.cause==="")return"";let S=h.cause_detail,T=S&&typeof S.reason=="string"&&S.reason.length>0?typeof S.command=="string"&&S.command.length>0?`${S.reason} \xB7 ${S.command}`:S.reason:h.cause;return c`<div class="detail-session__cause" title=${T}>
      ${h.cause}
    </div>`},b=h=>{let k=vf(Qa(h));if(pn(k).length===0&&!go(h.usage))return"";let S=a.has(h.attempt_id);return c`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${h.attempt_id}
      aria-expanded=${S?"true":"false"}
      title=${S?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${T=>{T.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(h.attempt_id)}}
    >
      τ 자세히
    </button>`};return c`
    <div class="detail-section-label">
      세션 이력${pv(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${l}${o.map(h=>{let k=Qa(h),S=vf(k),T=pn(S);return c`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${h.status||"unknown"}"
            data-attempt-id=${h.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(h.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${vv[h.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${h.attempt_id}</span>
            ${Ho(h)?c`<span
                  class="detail-session__resumed"
                  title=${Ho(h)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${Rn(h)}</span>
            ${T.length>0?c`<span class="detail-session__role">orchestrator</span>`:""}
            ${h.session_id?c`<span class="detail-session__sid" title=${h.session_id}
                  >${String(h.session_id).slice(0,8)}</span
                >`:""}
            ${T.length>0?T.map(ee=>c`<span
                      class="detail-session__usage"
                      title=${ee.tooltip}
                      >${ee.label}</span
                    >`):go(h.usage)?c`<span class="detail-session__usage"
                    >${go(h.usage)}</span
                  >`:""}
            <span class="detail-session__time">${Ls(h.started_at)}</span>
          </button>
          ${b(h)} ${d(h)} ${m(h)} ${kv(h)}
          ${a.has(h.attempt_id)&&h.usage?yv(h.usage,h.runner==="codex"?"codex":"claude"):""}
          ${bv(h,k,t)}
        </div>`})}
    </div>
  `}function Af(e,t={}){return c`
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
          ${xv(e)}
        </div>`:""}
  `}function xv(e){let t=Ro(e);if(t)return t;let n=e.data;if(!n)return"";if(n.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof n.default_task_prompt=="string"?dr("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=ia(n.recorded_at);return c`<div class="detail-prompt__meta">
      ${n.attempt_id}${r?` \xB7 ${r}`:""}
    </div>
    ${typeof n.task_prompt=="string"?dr("\uACFC\uC5C5 (user)",n.task_prompt):""}
    ${typeof n.system_prompt=="string"?dr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",n.system_prompt):""}`}var Xr=10;function Sf(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}function Ef(e,t={}){let r=(Array.isArray(e?.events)?e.events:[]).filter(l=>l&&typeof l.summary=="string"&&l.summary.trim().length>0);if(r.length===0)return"";let o=typeof e.shown=="number"&&e.shown>0?e.shown:Xr,i=r.slice(0,o),s=r.length-i.length;return c`
    <div class="detail-section-label">Worker 이력 (${r.length})</div>
    <ol class="detail-timeline" data-seam="worker-timeline">
      ${i.map(l=>c`<li class="detail-timeline__row">
            ${Sf(l.at)?c`<span class="detail-timeline__at"
                  >${Sf(l.at)}</span
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
  `}var Av=["open","in_progress","deferred","resolved","closed"],Sv=[0,1,2,3,4];function Tf(e,t){let n=t.issueStores,r=t.onClose,o=t.transport,i=t.onNavigate,s=t.queueStore,l=t.execPresetStore,a=t.sessionLogStore,u=null,d=null,m={},b="",h=!1,k=[],S=!1,T=!1,ee={},re={claude:null,codex:null},U=null,L=null,R=0,P=!1,q=!1,W="",F="",D="",V="",j=!1;function ne(){P=!1,q=!1,W="",F="",D="",V="",j=!1}function me(){re={claude:null,codex:null},U=null,L=null,R+=1}async function Oe(){if(!o)return null;try{let v=await Promise.resolve(o("get-workspace-accounts",{}));return v&&typeof v.state=="string"?v:null}catch{return null}}async function H(v){try{let I=await fetch(v);if(!I.ok)return null;let M=await I.json();if(!M||typeof M!="object"||!Array.isArray(M.accounts))return null;let ve=M.accounts.filter(Be=>Be!==null&&typeof Be=="object"&&!Array.isArray(Be));return{accounts:ve,active:ve.find(Be=>Be.active===!0)||null}}catch{return null}}async function te(v){L=v;let I=++R,[M,ve,Be]=await Promise.all([H("/api/claude-usage"),H("/api/codex-usage"),Oe()]);I!==R||v!==u||(re={claude:M,codex:ve},U=Be,tt())}let ce=[],Te=null,K=null,ae=!1,Q="",de=!1,Re=0,be=new Set;function Ie(){ce=[],Te=null,K=null,ae=!1,Q="",de=!1,Re+=1,be.clear()}async function Ye(v){if(!o)return;let I=++Re;try{let M=await Promise.resolve(o("get-comments",{id:v}));if(I!==Re||v!==u)return;ce=Array.isArray(M)?M:[],ae=!1}catch{if(I!==Re||v!==u)return;ae=!0}tt()}function _t(){if(!o||!u)return;let v=d&&typeof d.comment_count=="number"?d.comment_count:null;if(Te!==u){Te=u,K=v,Ye(u);return}v!==null&&v!==K&&(K=v,Ye(u))}function G(v){be.has(v)?be.delete(v):be.add(v),tt()}function pe(v){let I=Q.trim().length===0;Q=v,I!==(v.trim().length===0)&&tt()}async function oe(){let v=Q.trim();if(!o||!u||v.length===0||de)return;let I=u;de=!0,tt();let M=!1;try{let ve=await Promise.resolve(o("add-comment",{id:I,text:v}));Array.isArray(ve)&&ve.length>0&&(M=!0,I===u&&(ce=ve,ae=!1,Q="",K=ve.length))}catch{M=!1}M||_e("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),I===u&&(de=!1),tt()}let Y={onToggle:G,onDraftInput:pe,onSubmit:oe},we=t.mdViewer||null,fe=null;we||(fe=document.createElement("div"),fe.className="md-viewer-root",document.body.appendChild(fe));let Ce=we||da(fe,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),Ne=document.createElement("div");Ne.className="session-log-root",document.body.appendChild(Ne);let Qe=Oo(Ne,{transport:o?(v,I)=>Promise.resolve(o(v,I)):void 0,sessionLogStore:a}),Fe=!1,J=!1,X=!1,Ee=null,Je=null,st=0;function Ue(v){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${v}`}function et(){Fe=!1,J=!1,X=!1,Ee=null,Je=null,st+=1}async function vt(v){if(!o)return;let I=++st;J=!0,X=!1,tt();try{let M=await Promise.resolve(o("get-bead-prompt",{bead_id:v}));if(I!==st)return;!M||typeof M!="object"||Array.isArray(M)?X=!0:(Ee=M,Je=Ue(v))}catch{I===st&&(X=!0)}finally{I===st&&(J=!1,tt())}}let ut=[],Ze=null,dt=0;function Zt(v,I){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${v}::${I}`}function $(){ut=[],Ze=null,dt+=1}async function Z(v,I){if(!o)return;let M=++dt,ve;try{ve=await Promise.resolve(o("get-session-refs",{bead_id:v}))}catch{ve=null}M!==dt||I!==Ze||(ut=ve&&Array.isArray(ve.sessions)?ve.sessions:[],tt())}function qe(){if(!o||!u)return;let v=d&&d.metadata,I=v&&typeof v=="object"&&typeof v.session_ref=="string"?v.session_ref:null;if(I===null){$();return}let M=Zt(u,I);Ze!==M&&(ut=[],Ze=M,Z(u,M))}let Se=[],De=[],je=Xr,lt=null,kt=0;function se(v){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${v}`}function ge(){Se=[],De=[],je=Xr,lt=null,kt+=1}async function Ge(v,I){if(!o)return;let M=++kt,ve;try{ve=await Promise.resolve(o("get-bead-timeline",{bead_id:v}))}catch{ve=null}M!==kt||I!==lt||(Se=ve&&Array.isArray(ve.events)?ve.events:[],De=ve&&Array.isArray(ve.attempts)?ve.attempts:[],je=Xr,tt())}function it(){if(!o||!u)return;let v=se(u);lt!==v&&(Se=[],De=[],je=Xr,lt=v,Ge(u,v))}function ze(){je+=Xr,tt()}function mt(){if(Fe=!Fe,Fe&&u&&Je!==Ue(u)){Ee=null,vt(u);return}tt()}function gt(){let v={};for(let M of De)M&&typeof M=="object"&&M.bead_id===u&&(v[String(M.attempt_id)]=M);let I=s?s.get():null;for(let M of I&&I.attempts?Object.values(I.attempts):[]){let ve=M;ve&&ve.bead_id===u&&(v[String(ve.attempt_id)]=ve)}return v}function nt(){return u?Object.values(gt()).sort((I,M)=>(M.started_at||0)-(I.started_at||0)).map(I=>({attempt_id:I.attempt_id,bead_id:I.bead_id,status:I.status,started_at:typeof I.started_at=="number"?I.started_at:null,runner:I.runner||null,model:I.model||null,effort:I.effort||I.observed_effort||null,speed:I.speed||null,session_id:I.session_id||null,resumed_from:I.resumed_from||null,continuation_mode:I.continuation_mode||null,dismissed_at:typeof I.dismissed_at=="number"?I.dismissed_at:null,cause:typeof I.cause=="string"?I.cause:null,cause_detail:I.cause_detail||null,exec_default_preset_id:typeof I.exec_default_preset_id=="string"?I.exec_default_preset_id:null,exec_default_preset_revision:typeof I.exec_default_preset_revision=="number"?I.exec_default_preset_revision:null,exec_values:I.exec_values&&typeof I.exec_values=="object"?I.exec_values:null,usage:I.usage||null,usage_legs:Array.isArray(I.usage_legs)?I.usage_legs:[],delegation_sessions:Array.isArray(I.delegation_sessions)?I.delegation_sessions:[]})):[]}function Pe(){return u?sr(gt(),u):null}let A=new Set;function N(v){A.has(v)?A.delete(v):A.add(v),tt()}function B(v){let I=s?s.get():null,M=I&&I.attempts?I.attempts[v]:null;Qe.open({attempt_id:v,meta:M?{runner:M.runner||void 0,model:M.model||void 0,effort:M.effort||void 0,status:M.status||void 0,session_id:M.session_id||void 0}:{}})}function ke(v,I){let M=s?s.get():null,ve=M&&M.attempts?M.attempts[v]:null,at=(ve&&Array.isArray(ve.delegation_sessions)?ve.delegation_sessions:[]).find(Mt=>Mt&&typeof Mt=="object"&&Mt.launch_id===I);at&&Qe.open({attempt_id:v,launch_id:I,meta:{runner:at.provider==="claude"?"claude":"codex",role:at.role,...typeof at.agent_type=="string"?{agent_type:at.agent_type}:{},model:at.model,effort:at.effort,session_id:at.session_id,status:at.status}})}async function ye(v){if(!o||!v)return;let I=o,M=()=>{let Be=s?s.get():null;return Be&&typeof Be.revision=="number"?Be.revision:0},ve=s?.get()?.attempts?.[v]||null;await fo({context:{bead_id:ve?.bead_id||u||"",kind:"session",tuple:ve?Rn(ve):""},transport:Be=>I("worker-attempt-resume",{attempt_id:v,expected_revision:M(),...Be}),adopt:Be=>{Be?.queue&&s?.set&&s.set(Be.queue)}})}async function pt(v,I){if(!o||!v)return;let M=o,ve=()=>{let ht=s?s.get():null;return{bead_id:v,...I==="parallel"?{}:{lane:I},expected_revision:ht&&typeof ht.revision=="number"?ht.revision:0}},Be=ht=>{ht?.queue&&s?.set&&s.set(ht.queue)},at=await Promise.resolve(M("worker-queue-place",ve()));if(Be(at),at&&at.conflict&&(at=await Promise.resolve(M("worker-queue-place",ve())),Be(at)),tt(),!at)return;if(at.applied===!1&&typeof at.admission_reason=="string"){_e(`\uB300\uAE30 \uC801\uC7AC \uAC70\uBD80: ${at.admission_reason}`,"error",2400);return}if(at.reason==="rejected"){_e("\uB300\uAE30 \uC801\uC7AC \uAC70\uBD80: rejected","error",2400);return}if(at.applied===!1)return;let Mt=at.queue?os({id:v},at.queue).location:null;Mt&&"index"in Mt&&_e(`${vd(Mt.lane)} \uB300\uAE30 #${Mt.index+1}\uC5D0 \uCD94\uAC00`,"success",2400)}function wt(v,I){if(I){T=!0,tt();return}pt(v,"parallel")}function yt(v,I){let Be=(v.target?.closest?.(".worker-card__place-lane")||null)?.dataset.lane;Be&&(Be!=="parallel"&&!/^s[1-5]$/.test(Be)||(T=!1,tt(),pt(I,Be)))}function Tt(v){!v||!u||Qe.open(_o(v,u,d&&d.status))}let jt={onOpen:B,onOpenDelegation:ke,onResume:ye,onToggleUsage:N,onOpenSessionRef:Tt,onCopyResumeCommand:Kt};function Ut(){let v=s?s.get():null,I={...ee};for(let M of[...qn,...yo]){let ve=v&&v[M];typeof ve=="string"&&(I[M]=ve)}return I}async function Yt(){if(o){try{let v=await Promise.resolve(o("get-session-defaults",{}));ee=v&&v.values&&typeof v.values=="object"?v.values:{}}catch{ee={}}tt()}}function St(){let v=s?s.get():null;return v&&v.runner_catalog||null}function sn(){let v=s?s.get():null;return v&&typeof v.execution_defaults=="object"?v.execution_defaults:null}function Wt(){let v=d?.metadata&&typeof d.metadata=="object"?d.metadata:{},M=On({pin:{...v,...m},global:Ut(),execution_defaults:sn(),runner_catalog:St(),route:typeof v.route=="string"?v.route:null}).orchestration_model.value||"";return Nn(St(),M)}function Pt(){let v=l?l.get():null;return!v||typeof v.revision!="number"?null:{revision:v.revision,presets:Array.isArray(v.presets)?v.presets:[]}}function Ft(v){return v?.compatible===!1}function zt(v){l&&v&&typeof v.revision=="number"&&Array.isArray(v.presets)&&l.set({revision:v.revision,presets:v.presets})}async function xe(){let v=Pt(),I=v?.presets.find(M=>M.id===b);if(!(!o||!u||!v||!I||Ft(I)||h)){h=!0,k=[],tt();try{let M=await Promise.resolve(o("apply-impl-preset",rd(u,I.id,v.revision)));if(M&&M.conflict){zt(M),_e("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let ve=M&&Array.isArray(M.issue)?M.issue[0]:M?.issue;if(M&&M.applied&&ve&&typeof ve=="object"){d=ve,k=Array.isArray(M.skipped_orchestration_keys)?M.skipped_orchestration_keys.filter(Be=>typeof Be=="string"):[];for(let Be of od)delete m[Be];_e(k.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}M&&M.error==="bd_readback_failed"?_e("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):_e("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(M){M&&typeof M=="object"&&M.code==="bd_readback_failed"?_e("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):_e("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{h=!1,tt()}}}let E=null;n&&n.subscribe&&(E=n.subscribe(()=>Et()));let he=null;s&&typeof s.subscribe=="function"&&(he=s.subscribe(()=>{u&&tt()}));let Le=null,ot=null;function Ve(){ot&&(ot(),ot=null)}l&&typeof l.subscribe=="function"&&(Le=l.subscribe(()=>{u&&tt()}));function $t(v){v.key==="Escape"&&u&&(v.preventDefault(),r())}document.addEventListener("keydown",$t);let It=ho(()=>tt());It.attach();function Et(){if(u){if(n&&typeof n.snapshotFor=="function"){let v=n.snapshotFor("detail:"+u)||[];d=v.find(M=>M&&M.id===u)||v[0]||d}_t(),qe(),it(),tt()}}function Kt(v){yn(v).then(I=>{I?_e("\uBCF5\uC0AC\uB428","success",1200):_e("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function _n(v){v.preventDefault(),v.stopPropagation(),u&&Kt(u)}function Lt(v,I){v.preventDefault(),v.stopPropagation(),Kt(I)}function hn(v,I,M){v.preventDefault(),v.stopPropagation(),Ce.open(I,{missing_state:M})}async function p(v,I){let M=Object.hasOwn(m,v),ve=m[v];if(m[v]=I,tt(),!(!o||!u))try{let Be=await Promise.resolve(o("update-exec-settings",nd(u,v,I.length===0?null:I))),at=Array.isArray(Be)?Be[0]:Be;if(!at||typeof at!="object"||!at.id)throw new Error("exec settings readback failed");d=at,delete m[v],tt()}catch(Be){throw M?m[v]=ve:delete m[v],tt(),_e("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error"),Be}}function f(v){v.catch(()=>{})}async function x(v,I){let M=d||{},ve=M.metadata&&typeof M.metadata=="object"?M.metadata:{},Be={};for(let ht of["impl_runtime","impl_model","impl_effort"])Be[ht]=Object.hasOwn(m,ht)?m[ht]:typeof ve[ht]=="string"?ve[ht]:"";Be[v]=I;let at=ad(Be,St(),Wt()),Mt={};for(let ht of["impl_runtime","impl_model","impl_effort"])Mt[ht]=m[ht],m[ht]=at[ht]||"";if(tt(),!(!o||!u))return Promise.resolve(o("update-impl-target",{id:u,...at,orchestration_runtime:Wt()})).then(ht=>{let le=Array.isArray(ht)?ht[0]:ht;if(!le||typeof le!="object"||!le.id)throw new Error("implementation target readback failed");d=le;for(let rt of["impl_runtime","impl_model","impl_effort"])delete m[rt];tt()}).catch(ht=>{for(let le of["impl_runtime","impl_model","impl_effort"])Mt[le]===void 0?delete m[le]:m[le]=Mt[le];throw tt(),_e("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error"),ht})}async function _(v,I,M){if(!o||!u)return!1;try{let ve=await Promise.resolve(o(v,I)),Be=Array.isArray(ve)?ve[0]:ve;return Be&&typeof Be=="object"&&Be.id?(d=Be,!0):(_e(M,"error"),!1)}catch(ve){return ve&&typeof ve=="object"&&ve.code==="bd_readback_failed"?(_e("\uC800\uC7A5\uB410\uC73C\uB098 \uD655\uC778 \uC2E4\uD328 \u2014 \uACE7 \uAC31\uC2E0\uB429\uB2C8\uB2E4","error"),{ok:!1,saved:!0}):(_e(g(M,ve),"error"),!1)}}function g(v,I){let M=I&&typeof I=="object"&&typeof I.message=="string"?I.message.trim():"";return M.length>0?`${v} \u2014 ${M}`:v}function O(v){setTimeout(()=>{try{let I=e.querySelector(v);I&&typeof I.focus=="function"&&I.focus()}catch{}},0)}function z(){P=!0,W=d&&d.title||"",tt(),O('.detail-edit__input[data-edit="title"]')}function ue(v){W=v.target.value}function Ae(){P=!1,W="",tt()}function He(){_("edit-text",{id:u,field:"title",value:W},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(I=>{I===!0&&(P=!1,W=""),tt()})}function xt(){q=!0,F=d&&d.description||"",tt(),O('.detail-edit__textarea[data-edit="description"]')}function Qt(v){F=v.target.value}function an(){q=!1,F="",tt()}function xn(){_("edit-text",{id:u,field:"description",value:F},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(I=>{I===!0&&(q=!1,F=""),tt()})}function Vt(v,I,M,ve){if(v.key==="Escape"){v.stopPropagation(),M();return}v.key==="Enter"&&(!ve||v.ctrlKey||v.metaKey)&&(v.preventDefault(),I())}function Jt(v){let I=v.target.value;_("update-status",{id:u,status:I},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>tt())}function en(v){let I=Number(v.target.value);_("update-priority",{id:u,priority:I},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>tt())}function eo(v){D=v.target.value}function Tn(){let v=D.trim();v.length!==0&&_("label-add",{id:u,label:v},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(I=>{I===!0&&(D=""),tt()})}function to(v){if(v.key==="Escape"){v.stopPropagation(),D="",tt();return}v.key==="Enter"&&(v.preventDefault(),Tn())}function Rr(v){_("label-remove",{id:u,label:v},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>tt())}let Ns={onCopyPath:Lt,onOpenDoc:hn};function w(v){return typeof v=="string"?v:v&&typeof v=="object"?String(v.id||v.to||v.issue_id||v.depends_on||""):""}function y(v){return v&&typeof v=="object"?String(v.dependency_type||v.type||""):""}function C(v){switch(v){case"discovered-from":return{glyph:"\u21A9 ",relation:"\uBC1C\uACAC"};case"parent-child":return{glyph:"\u2338 ",relation:"\uC0C1\uC704"};case"related":return{glyph:"\u2194 ",relation:"\uAD00\uB828"};default:return v.length>0?{glyph:`${v} `,relation:v}:{glyph:"",relation:""}}}function ie(v,I){let M=$e(I),ve=[];return v.length>0&&ve.push(v),M&&ve.push(M),ve.length>0?ve.join(`
`):void 0}function $e(v){if(!v||typeof v!="object")return;let I=typeof v.status=="string"?v.status:"",M=typeof v.title=="string"?v.title:"";return I.length>0&&M.length>0?`${I} \xB7 ${M}`:void 0}function Me(){return(t.getWorkspacePath&&t.getWorkspacePath()||"").trim()}function Xe(){return t.depCandidates?t.depCandidates():null}async function Rt(v,I,M){let ve=Me(),Be=u;if(!Be)return;if(ve.length===0){_e("\uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}let at=await _(v,{a:Be,b:I,view_id:Be,root_dir:ve},M),Mt=at===!0||at!==!1&&at.saved===!0;Mt&&t.onDepChanged&&t.onDepChanged({type:v,a:Be,b:I}),v==="dep-add"&&Mt&&(V="",j=!1),tt()}function tn(v){if(!u)return;let I=globalThis.confirm;typeof I=="function"&&!I(`${v}\uAC00 ${u}\uB97C \uB9C9\uB294 \uC5F0\uACB0\uC744 \uB04A\uC744\uAE4C\uC694?`)||Rt("dep-remove",v,"\uC758\uC874 \uD574\uC81C \uC2E4\uD328")}function ct(v){v.disabled||dn(v.bead_id)}function dn(v){Rt("dep-add",v,"\uC758\uC874 \uCD94\uAC00 \uC2E4\uD328")}function An(v,I){let M=V.trim();return!vp(M)||M===u||I.includes(M)||v.some(ve=>ve.bead_id===M)?null:M}function Or(v){V=v.target.value,j=!0,tt()}function Hn(){j||(j=!0,tt())}function Zn(v,I,M){if(v.key==="Escape"){v.stopPropagation(),V="",j=!1,tt();return}v.key==="Enter"&&(v.preventDefault(),I.length===1&&!I[0].disabled?ct(I[0]):M!==null&&dn(M))}function Jn(v,I){return c`<div class="detail-dep-add">
      <input
        class="detail-dep-add__input"
        aria-label="막는 이슈 추가"
        placeholder="막는 이슈 추가"
        .value=${V}
        @focus=${Hn}
        @input=${Or}
        @keydown=${M=>Zn(M,v,I)}
      />
      ${j||V.length>0?c`<div class="detail-dep-add__list">
            ${v.length===0&&I===null?c`<div class="detail-dep-add__empty">후보 없음</div>`:v.map(M=>c`<button
                      type="button"
                      class="detail-dep-add__cand"
                      data-dep-cand=${M.bead_id}
                      ?disabled=${M.disabled}
                      title=${mn(M.reason)}
                      @click=${()=>ct(M)}
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
            ${I===null?"":c`<button
                  type="button"
                  class="detail-dep-add__cand"
                  data-dep-cand=${I}
                  data-dep-direct="1"
                  @click=${()=>dn(I)}
                >
                  <span class="detail-dep-add__id">${I}</span>
                  <span class="detail-dep-add__title">직접 추가</span>
                </button>`}
          </div>`:""}
    </div>`}function er(v,I){let M=I.get(v.id),ve=i?c`<button
          type="button"
          class="detail-dep__link"
          title=${mn(v.title)}
          @click=${()=>M===void 0?i(v.id):i(v.id,M)}
        >
          ${v.label}
        </button>`:c`<span class="detail-dep__link" title=${mn(v.title)}
          >${v.label}</span
        >`;return c`<span
      class=${`detail-dep detail-dep--${v.kind}${i?" detail-dep--link":""}`}
      >${ve}${v.kind==="pred"?c`<button
            type="button"
            class="detail-dep__unlink"
            data-dep-b=${v.id}
            aria-label=${"\uC758\uC874 \uD574\uC81C: "+v.id}
            @click=${()=>tn(v.id)}
          >
            ✕
          </button>`:""}</span
    >`}function un(v){let I=Array.isArray(v.dependencies)?v.dependencies:[],M=Array.isArray(v.dependents)?v.dependents:[],ve=[];for(let le of I){let rt=w(le);rt.length>0&&y(le)==="blocks"&&ve.push({id:rt,label:`\u26D3 ${rt}`,kind:"pred",title:ie("\uB9C9\uB294",le)})}for(let le of M){let rt=w(le);rt.length>0&&y(le)==="blocks"&&ve.push({id:rt,label:`\u2192 ${rt}`,kind:"succ",title:ie("\uB9C9\uD788\uB294",le)})}for(let le of I){let rt=w(le),Gt=y(le);if(rt.length>0&&Gt!=="blocks"){let nn=C(Gt);ve.push({id:rt,label:`${nn.glyph}${rt}`,kind:"other",title:ie(nn.relation,le)})}}let Be=Xe(),at=new Map;if(Be)for(let le of Be.issues)at.has(le.bead_id)||at.set(le.bead_id,le.root_dir);let Mt=Be&&u?yp(bp(u,Be),V):[],ht=An(Mt,ve.filter(le=>le.kind==="pred").map(le=>le.id));return c`
      <div class="detail-section-label">의존성</div>
      ${ve.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${ve.map(le=>er(le,at))}
          </div>`}
      ${Be===null?c`<div class="detail-empty">후보를 불러올 수 없음</div>`:Jn(Mt,ht)}
    `}function tr(v){let I=v.metadata||{},M=v.workflow||{},ve=M.stages||{},Be=ve.spec&&ve.spec.stale,at=ve.impl&&ve.impl.stale,Mt=M.quick_fix_review?.state==="stale",ht=ve.plan||null,le=M.route_source==="derived",rt=M.route||I.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${le?" detail-kv__v--derived":""}"
          title=${le?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${le?"unset":rt}</span
        >
      </div>
      ${M.route!=="quick_fix"||Object.hasOwn(I,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${I.spec_review||"\uC5C6\uC74C"}${Be?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${M.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${ht?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${ht?.approval_receipt||"\uC5C6\uC74C"}${ht?.approval_state==="stale"?" \xB7 stale":ht?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${M.route!=="quick_fix"||Object.hasOwn(I,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${I.impl_review||"\uC5C6\uC74C"}${at?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${M.resolver?c`<div class="detail-kv">
            <span class="detail-kv__k">↳ 충돌 해소</span>
            <span
              class="detail-kv__v detail-kv__v--resolver detail-kv__v--wrap"
              title=${`resolver-self:${M.resolver.attempt} \xB7 ${M.resolver.prior_sha} \u2192 ${M.resolver.sha}`}
              >${`${M.resolver.prior_sha.slice(0,7)} \u2192 ${M.resolver.sha.slice(0,7)}`}</span
            >
          </div>`:""}
      ${M.route==="quick_fix"||Object.hasOwn(I,"quick_fix_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">quick_fix_review</span>
            <span class="detail-kv__v"
              >${I.quick_fix_review||"\uC5C6\uC74C"}${Mt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${M.planned_execution?c`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${M.planned_execution.kind}</span>
            </div>
            ${M.planned_execution.kind==="main"?c`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${M.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${M.exec_receipt?c`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${rr(M.exec_receipt)}</span
            >
          </div>`:""}
      ${M.impl_entry?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${M.impl_entry.actor}@${M.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${I.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${I.pr_url}</span>
          </div>`:""}
    `}let pr={route:["quick_fix","spec_backed","full_plan"]};async function fr(v,I){let M=I.target.value;if(v==="route"&&d&&d.metadata&&d.metadata.route==="full_plan"&&M!=="full_plan"&&!window.confirm(`full_plan \u2192 ${M||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){tt();return}await _("update-workflow-meta",{id:u,key:v,value:M},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),tt()}function Ir(v){let I=v.metadata||{};return c` ${((ve,Be)=>{let at=pr[ve],Mt=typeof I[ve]=="string"?I[ve]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${ve}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${ve}
          data-edit=${`wfmeta-${ve}`}
          @change=${ht=>fr(ve,ht)}
        >
          <option value="" ?selected=${!at.includes(Mt)}>
            ${Be}
          </option>
          ${at.map(ht=>c`<option value=${ht} ?selected=${Mt===ht}>${ht}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function We(v,I){return P?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${W}
            @input=${ue}
            @keydown=${M=>Vt(M,He,Ae,!1)}
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
              @click=${Ae}
            >
              취소
            </button>
          </div>
        </div>
      `:c`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${v}</h2>
        ${pn(I).map(M=>c`<span class="detail-usage-total" title=${M.tooltip}
              >${M.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${z}
        >
          ✎
        </button>
      </div>
    `}function Nt(v){let I=ln(v.created_at),M=ln(v.updated_at);return!I&&!M?c``:c`
      ${I?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${I}</span>
          </div>`:""}
      ${M?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${M}</span>
          </div>`:""}
    `}function Cn(v,I){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${Jt}
        >
          ${Av.map(M=>c`<option value=${M} ?selected=${M===v}>${M}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${en}
        >
          ${Sv.map(M=>c`<option value=${String(M)} ?selected=${M===I}>
                P${M}
              </option>`)}
        </select>
      </div>
    `}function Po(v){return c`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${q?"":c`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${xt}
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
              .value=${F}
              @input=${Qt}
              @keydown=${I=>Vt(I,xn,an,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${xn}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${an}
              >
                취소
              </button>
            </div>
          </div>`:c`<div class="detail-overlay__desc">
            ${v||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function Mo(v){let I=typeof v.notes=="string"?v.notes:"";return I.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${I}</div>
    `}function js(v){let I=Array.isArray(v.labels)?v.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${I.map(M=>c`<span class="detail-label-chip"
              >${M}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${M}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+M}
                @click=${()=>Rr(M)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${D}
            @input=${eo}
            @keydown=${to}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${Tn}
          >
            추가
          </button>
        </span>
      </div>
    `}function Fs(){if(!u)return c``;let v=d||{},I=String(v.id||u),M=v.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",ve=Pe(),Be=v.status||"open",at=typeof v.priority=="number"?Math.max(0,Math.min(4,v.priority)):"",Mt=v.description||"",ht=s?s.get():null,le=ht&&Be!=="closed"?os({...v,id:I},ht):null,rt=ht?ss(ht):null,Gt={...v,metadata:{...v.metadata||{},...m}};return c`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${()=>r()}></div>
        <div class="detail-overlay__panel">
          <div class="detail-overlay__bar">
            <button
              type="button"
              class="detail-overlay__id"
              title="ID 복사"
              @click=${_n}
            >
              ${I}
            </button>
            ${le?c`<button
                  type="button"
                  class="op-btn op-btn--primary detail-overlay__place"
                  data-bead-id=${I}
                  ?disabled=${!le.placeable}
                  title=${Wr(le)}
                  @click=${()=>wt(I,rt)}
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
          ${le&&T&&rt?c`<div
                class="place-menu detail-overlay__place-menu"
                @click=${nn=>yt(nn,I)}
              >
                ${pl(rt,I)}
                <button
                  type="button"
                  class="op-btn op-btn--icon worker-card__place-cancel"
                  data-bead-id=${I}
                  title="레인 선택 취소"
                  aria-label="레인 선택 취소"
                  @click=${()=>{T=!1,tt()}}
                >
                  ✕
                </button>
              </div>`:""}
          ${We(M,ve)}
          ${pf(Gt,{onChipToggle:nn=>It.toggle({bead_id:I,chip_key:nn}),isChipOpen:nn=>It.isOpen({bead_id:I,chip_key:nn})})}
          ${df({metadata:Gt.metadata,workspace_values:Ut(),catalog:St(),execution_defaults:sn(),expanded:S,presets:Pt()?.presets||[],preset_id:b,preset_busy:h,skipped_orchestration_keys:k},{onToggle:nn=>{S=nn,tt()},onEdit:(nn,Bs)=>{if(nn==="impl_runtime"||nn==="impl_model"||nn==="impl_effort"){f(x(nn,Bs??""));return}f(p(nn,Bs??""))},onPresetSelect:nn=>{b=nn,k=[],tt()},onPresetApply:()=>{xe()}})}
          ${bf({md:Gt.metadata,catalog:re,workspace_defaults:U,handlers:{onExecChange:(nn,Bs)=>f(p(nn,Bs))}})}
          ${Cn(Be,at)} ${Nt(v)}
          ${Po(Mt)}
          ${af(ce,Y,{expanded:be,draft:Q,sending:de,error:ae})}
          ${Mo(v)} ${js(v)} ${un(v)}
          ${tr(v)} ${Ir(v)}
          ${rf(v,Ns)}
          ${Af({expanded:Fe,loading:J,error:X,data:Ee},{onToggle:mt})}
          ${xf(nt(),jt,{total:ve,expanded:A},ut)}
          ${Ef({events:Se,shown:je},{onMore:ze})}
        </div>
      </div>
    `}function tt(){ft(Fs(),e)}return{load(v){v!==u&&(m={},T=!1,b="",k=[],S=!1,ne(),Ie(),et(),$(),ge(),me()),u=v,d=null,!ot&&t.subscribeCandidates&&(ot=t.subscribeCandidates(()=>{u&&tt()})),Et(),Yt(),L!==v&&te(v)},clear(){u=null,d=null,m={},T=!1,b="",h=!1,k=[],S=!1,ne(),Ie(),et(),$(),ge(),me(),Ve(),Ce.close(),Qe.close(),ft(c``,e)},destroy(){E&&(E(),E=null),he&&(he(),he=null),Le&&(Le(),Le=null),Ve(),document.removeEventListener("keydown",$t),It.detach(),we||(Ce.destroy(),fe&&fe.parentNode&&fe.parentNode.removeChild(fe)),Qe.destroy(),Ne.parentNode&&Ne.parentNode.removeChild(Ne),u=null,d=null,me(),b="",h=!1,k=[],Ie(),et(),$(),ge(),ft(c``,e)}}}function Cf(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),o=t.querySelector("#fatal-error-detail"),i=t.querySelector("#fatal-error-reload"),s=t.querySelector("#fatal-error-close"),l=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},a=(u,d,m="")=>{n&&(n.textContent=u||"Unexpected Error"),r&&(r.textContent=d||"An unrecoverable error occurred.");let b=typeof m=="string"?m.trim():"";if(o&&(b.length>0?(o.textContent=b,o.removeAttribute("hidden")):(o.textContent="No additional diagnostics available.",o.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return i&&i.addEventListener("click",()=>{window.location.reload()}),s&&s.addEventListener("click",()=>l()),t.addEventListener("cancel",u=>{u.preventDefault(),l()}),{open:a,close:l,getElement(){return t}}}var Ev="(max-width: 640px)";function fa(e){if(typeof window.matchMedia!="function")return e(!1),()=>{};let t=window.matchMedia(Ev),n=!!t.matches;e(n);let r=o=>{let s=!!(typeof o=="object"&&o!==null&&typeof o.matches=="boolean"?o.matches:t.matches);s!==n&&(n=s,e(s))};return typeof t.addEventListener=="function"?(t.addEventListener("change",r),()=>{t.removeEventListener("change",r)}):typeof t.addListener=="function"?(t.addListener(r),()=>{typeof t.removeListener=="function"&&t.removeListener(r)}):()=>{}}function Tv(){return{lanes:{done:!0},areas:{}}}function Ds(e){let t={};if(typeof e!="object"||e===null)return t;for(let[n,r]of Object.entries(e))typeof r=="boolean"&&(t[n]=r);return t}function Cv(e){try{let t=window.localStorage.getItem(e);if(!t)return null;let n=JSON.parse(t);if(typeof n!="object"||n===null)return null;let r=n;return typeof r.lanes=="object"&&r.lanes!==null?{lanes:Ds(r.lanes),areas:Ds(r.areas)}:{lanes:Ds(r),areas:{}}}catch{return null}}function Rf(e,t){try{window.localStorage.setItem(e,JSON.stringify(t))}catch{}}function _a(e,t=Tv()){let n={lanes:Ds(t.lanes),areas:Ds(t.areas)},r=Cv(e),o={lanes:{...n.lanes,...r?r.lanes:{}},areas:{...n.areas,...r?r.areas:{}}};return{isCollapsed(i){return o.lanes[i]===!0},isAreaCollapsed(i){return o.areas[i]===!0},toggle(i){let s=o.lanes[i]!==!0;return o={...o,lanes:{...o.lanes,[i]:s}},Rf(e,o),s},toggleArea(i){let s=o.areas[i]!==!0;return o={...o,areas:{...o.areas,[i]:s}},Rf(e,o),s}}}function ac(e){if(typeof e=="string"&&e.length>0)return e;if(e&&typeof e=="object"){let t=e;if(typeof t.message=="string"&&t.message.length>0)return t.message;if(typeof t.error=="string"&&t.error.length>0)return t.error;if(t.error&&typeof t.error=="object"&&typeof t.error.message=="string")return t.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}function ma(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"&&t.length>0):[]}function ga(e){let{transport:t,console_el:n,getLanes:r,getWorkspaces:o,getCrossLanes:i,reproject:s,onCorrection:l,showToast:a,requestRender:u,adoptQueue:d,onDragBegin:m,candidate_drop:b}=e,h=[],k=null,S=!1,T=null,ee=null,re=null;function U(){T!==null&&clearTimeout(T),T=setTimeout(()=>{T=null,S=!1},0)}function L(){return i()??null}function R(){let G=new Map,pe=o();for(let oe of Array.isArray(pe)?pe:[]){if(!oe||typeof oe!="object")continue;let Y=oe.bead_blocked_by&&typeof oe.bead_blocked_by=="object"?oe.bead_blocked_by:{};for(let[we,fe]of Object.entries(Y))Array.isArray(fe)&&G.set(we,ma(fe));for(let we of[...Array.isArray(oe.runnable)?oe.runnable:[],...Array.isArray(oe.session_active)?oe.session_active:[]])we&&typeof we.bead_id=="string"&&Array.isArray(we.blocked_by)&&we.blocked_by.length>0&&G.set(we.bead_id,ma(we.blocked_by))}return G}function P(){let G=new Map,pe=new Map,oe=o();for(let Y of Array.isArray(oe)?oe:[]){if(!Y||typeof Y!="object")continue;let we=Y.bead_blocked_by&&typeof Y.bead_blocked_by=="object"?Y.bead_blocked_by:{};for(let[fe,Ce]of Object.entries(we))Array.isArray(Ce)&&G.set(fe,ma(Ce));for(let fe of Array.isArray(Y.runnable)?Y.runnable:[])fe&&typeof fe.bead_id=="string"&&Array.isArray(fe.blocked_by)&&pe.set(fe.bead_id,ma(fe.blocked_by))}for(let Y of h)for(let we of[G,pe]){let fe=we.get(Y.a);fe!==void 0&&we.set(Y.a,Y.type==="dep-remove"?fe.filter(Ce=>Ce!==Y.b):fe.includes(Y.b)?fe:[...fe,Y.b])}return{snapshot:G,runnable:pe}}function q(){let G=R();for(let pe of h){let oe=(G.get(pe.a)||[]).slice();pe.type==="dep-remove"?G.set(pe.a,oe.filter(Y=>Y!==pe.b)):oe.includes(pe.b)||G.set(pe.a,[...oe,pe.b])}return G}function W(G=r(),pe=L()){let oe=new Map;for(let Fe of Array.isArray(pe?.lanes)?pe.lanes:[]){let J=new Map;for(let X of Array.isArray(Fe?.entries)?Fe.entries:[])X&&typeof X.bead_id=="string"&&J.set(X.bead_id,X.dep_created_by_lane===!0);oe.set(typeof Fe?.id=="string"?Fe.id:"",J)}let Y=new Map,we=new Map,fe=new Set,Ce=new Set;for(let Fe of G.chain_lanes){let J=oe.get(Fe.lane_id);Y.set(Fe.lane_id,{status:Fe.status,entries:Fe.rows.map((X,Ee)=>({bead_id:X.id,root_dir:X.root_dir,...Ee===0?{}:{dep_created_by_lane:J?.get(X.id)===!0}}))});for(let X of Fe.rows)we.set(X.id,Fe.lane_id),X.fixed&&fe.add(X.id),X.unplaced||Ce.add(X.id)}let Ne=new Map;for(let Fe of G.parallel_rows)typeof Fe.queue_index=="number"&&Ne.set(Fe.id,Fe.queue_index);for(let Fe of G.queue_groups)for(let J of Fe.sublanes.serial)for(let X of J.items)typeof X.queue_index=="number"&&Ne.set(X.id,X.queue_index);let Qe=P();return{blocked_by_map:q(),snapshot_blocked_by:Qe.snapshot,runnable_blocked_by:Qe.runnable,owner_of:new Map(Object.entries(G.owner_of)),cross_lanes:Y,owner_lane_of:we,fixed_members:fe,placed_members:Ce,parallel_rows:G.parallel_rows.map(Fe=>({bead_id:Fe.id,root_dir:Fe.root_dir,queue_index:Fe.queue_index??0})),parallel_raw_length:new Map(Object.entries(G.parallel_raw_length)),queue_index_of:Ne}}function F(G,pe){let oe=r();for(let we of[...oe.runnable,...oe.queue,...oe.running,...oe.pr_wait,...oe.done])if(!(we.non_occupying||we.id!==pe)){if(we.root_dir===G)return we.expected_revision;break}let Y=oe.queue_groups.find(we=>we.root_dir===G);return Y?Y.revision:0}async function D(G,pe,oe,Y){if(!t)return null;let fe=await t(G,{...pe,...oe?{root_dir:oe}:{},expected_revision:Y});if(fe&&fe.conflict){fe.queue&&d?.(oe,fe.queue);let Ce=fe.queue&&typeof fe.queue.revision=="number"?fe.queue.revision:Y;fe=await t(G,{...pe,...oe?{root_dir:oe}:{},expected_revision:Ce})}return fe&&fe.queue&&d?.(oe,fe.queue),fe}async function V(G,pe,oe,Y,we){try{let fe=await D(G,pe,oe,Y.get(oe)??F(oe,we.bead_id));return!fe||typeof fe.applied!="boolean"?(a("\uD050 \uC694\uCCAD\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error"),null):(fe.queue&&typeof fe.queue.revision=="number"&&Y.set(oe,fe.queue.revision),fe.conflict?(a("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null):fe.applied===!1?(a(fe.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${fe.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null):fe.queue&&typeof fe.queue.revision=="number"?fe.queue.revision:Y.get(oe)??0)}catch(fe){return a(ac(fe),"error"),null}}async function j(G,pe,oe=new Map){if(G.type==="worker-queue-disarm"){try{let Y=await D(G.type,G.payload,G.root_dir,oe.get(G.root_dir)??F(G.root_dir,pe));Y&&Y.queue&&typeof Y.queue.revision=="number"&&oe.set(G.root_dir,Y.queue.revision)}catch{}return!0}if(G.type==="worker-queue-place"||G.type==="worker-queue-reorder"||G.type==="worker-queue-remove")return await V(G.type,G.payload,G.root_dir,oe,{bead_id:pe})!==null;try{return(G.type==="dep-add"||G.type==="dep-remove")&&t&&await t(G.type,{a:G.a,b:G.b,...G.root_dir?{root_dir:G.root_dir}:{}}),!0}catch(Y){return a(ac(Y),"error"),!1}}function ne(G){(G.type==="dep-add"||G.type==="dep-remove")&&(h=[...h,{type:G.type,a:G.a,b:G.b}])}async function me(G,pe){if(!t)return{ok:!1};try{let oe=await t(G.type,{...G.payload,expected_revision:pe});return!oe||typeof oe.revision!="number"?(a("\uC5F0\uACB0 \uB808\uC778 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{ok:!1}):{ok:!0,revision:oe.revision}}catch(oe){let Y=oe,we=Y&&Y.code==="conflict"?Y.details?.cross_lanes:null;return we&&typeof we.revision=="number"&&Array.isArray(we.lanes)?{ok:!1,conflict:we}:(a(ac(oe),"error"),{ok:!1})}}async function Oe(G,pe,oe){let Y=new Map,we=[],fe=G.ops.slice(0,G.lane_op_index),Ce=G.ops.slice(G.lane_op_index);for(let Qe of fe){if(!await j(Qe,oe,Y))return{done:!0};ne(Qe)}let Ne=pe;for(let Qe of G.lane_ops){if(Ne===null)return a("\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{done:!0};let Fe=await me(Qe,Ne);if(!Fe.ok)return Fe.conflict?{done:!1,conflict:Fe.conflict}:{done:!0};Ne=Fe.revision}for(let Qe of Ce){if(!await j(Qe,oe,Y))return{done:!0};ne(Qe),Qe.type==="dep-add"&&we.push(Qe)}for(let Qe of gp(we))Ne=await H(Qe,Ne);return{done:!0}}async function H(G,pe){if(pe===null||!t)return pe;let oe=G.pairs,Y=pe;for(let we=0;we<2;we+=1){if(oe.length===0)return Y;try{let fe=await t("monitor-lane-provenance",{lane_id:G.lane_id,pairs:oe.map(Ce=>({bead_id:Ce.bead_id,after:Ce.after,value:!0})),expected_revision:Y});return fe&&typeof fe.revision=="number"?fe.revision:Y}catch(fe){let Ce=fe,Ne=Ce&&Ce.code==="conflict"?Ce.details?.cross_lanes:null;if(!Ne||typeof Ne.revision!="number"||!Array.isArray(Ne.lanes))return Y;let Qe=Ne.lanes.find(Fe=>Fe&&Fe.id===G.lane_id);oe=hp(Array.isArray(Qe?.entries)?Qe.entries:[],oe),Y=Ne.revision}}return Y}async function te(G,pe,oe=[]){h=oe,l("",0);let Y=r(),we=L();for(let fe=0;;fe+=1){let Ce=G(W(Y,we));if("refused"in Ce){a(Ce.refused,"error");break}let Ne=await Oe(Ce,Y.cross_lanes_revision,pe);if(Ne.done){Ce.correction&&l(Ce.correction.lane_id,Ce.correction.corrected);break}if(fe>=1){a("\uB808\uC778\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4","error");break}let Qe=s(Ne.conflict);Y=Qe.lanes,we=Qe.raw_lanes}h=[],u()}async function ce(G,pe){await te(oe=>Yi(G,pe,oe),G.bead_id)}function Te(G,pe){let oe=pe&&typeof pe.closest=="function"?pe.closest("[data-row-index]"):null;if(oe&&G.contains(oe)){let Y=Number(oe.getAttribute("data-row-index"));return Number.isFinite(Y)?Y:0}return G.querySelectorAll("[data-row-index]").length}function K(G){let pe=typeof G?.closest=="function"?G.closest(".worker-pane--collapsed[data-lane]"):null;if(!pe)return null;let oe=pe.getAttribute("data-lane");return oe==="queue"?{zone:pe,target:{kind:"parallel",marker_index:r().parallel_rows.length}}:oe==="candidate"&&b===!0?{zone:pe,target:{kind:"candidate"}}:null}function ae(G){let pe=G.target;if(!k)return null;let oe=typeof pe?.closest=="function"?pe.closest("[data-drop]"):null;if(!oe)return K(pe);let Y=oe.getAttribute("data-drop");if(Y==="candidate")return{zone:oe,target:{kind:"candidate"}};if(Y==="parallel")return{zone:oe,target:{kind:"parallel",marker_index:Te(oe,pe)}};if(Y==="chain")return{zone:oe,target:{kind:"chain",lane_id:oe.getAttribute("data-lane-id")||"",marker_index:Te(oe,pe)}};if(Y==="repo-serial"){let we=oe.getAttribute("data-root-dir")||"";if(we!==k.root_dir)return null;let fe=typeof pe?.closest=="function"?pe.closest("[data-queue-index]"):null,Ce=fe&&oe.contains(fe)?fe.getAttribute("data-queue-index"):oe.getAttribute("data-lane-length"),Ne=Number(Ce);return{zone:oe,target:{kind:"repo-serial",root_dir:we,lane_id:oe.getAttribute("data-lane-id")||"",index:Number.isFinite(Ne)?Ne:0}}}return null}function Q(){for(let G of Array.from(n.querySelectorAll(".is-drop-over")))G.classList.remove("is-drop-over")}function de(G){ee=G.target instanceof Element?G.target:null}function Re(G){let pe=G.target,oe=typeof pe?.closest=="function"?pe.closest('[draggable="true"][data-bead-id]'):null,Y=oe?oe.closest("[data-drag-kind]"):null;if(!Y)return;if(oe&&ee&&oe.contains(ee)&&typeof ee.closest=="function"&&ee.closest("input, button, a")){G.preventDefault();return}let we=Y.getAttribute("data-bead-id")||"",fe=Y.getAttribute("data-drag-kind")||"",Ce=Y.getAttribute("data-root-dir")||"";if(!we||!fe)return;let Ne=Y.getAttribute("data-queue-index")||"",Qe=Number(Ne),Fe=Y.getAttribute("data-lane-id")||"";k={kind:fe,bead_id:we,root_dir:Ce,...Ne!==""&&Number.isFinite(Qe)?{queue_index:Qe}:{},...Fe?{lane_id:Fe}:{}},S=!0,m?.(),n.classList.add("is-dragging");try{G.dataTransfer?.setData("text/plain",we),G.dataTransfer&&(G.dataTransfer.effectAllowed="move")}catch{}}function be(G){let pe=ae(G);pe&&(G.preventDefault(),G.dataTransfer&&(G.dataTransfer.dropEffect="move"),pe.zone.classList.add("is-drop-over"))}function Ie(G){let pe=G.target;typeof pe?.closest=="function"&&(pe.closest("[data-drop]")?.classList.remove("is-drop-over"),pe.closest(".worker-pane--collapsed")?.classList.remove("is-drop-over"))}function Ye(){k=null,Q(),n.classList.remove("is-dragging"),U()}function _t(G){let pe=ae(G),oe=k;k=null,Q(),n.classList.remove("is-dragging"),!(!pe||!oe)&&(G.preventDefault(),ce(oe,pe.target))}return{attach(G){re||(re=G,G.addEventListener("pointerdown",de),G.addEventListener("dragstart",Re),G.addEventListener("dragover",be),G.addEventListener("dragleave",Ie),G.addEventListener("drop",_t),G.addEventListener("dragend",Ye))},detach(){T!==null&&(clearTimeout(T),T=null);let G=re;re=null,G&&(G.removeEventListener("pointerdown",de),G.removeEventListener("dragstart",Re),G.removeEventListener("dragover",be),G.removeEventListener("dragleave",Ie),G.removeEventListener("drop",_t),G.removeEventListener("dragend",Ye))},isDragging(){return k!==null},consumeClickSuppression(){let G=S;return S=!1,G},applyDrop:ce,runPlanned:te,dropModel:W,sendOp:j,sendQueueCas:V,rememberDep:ne}}function on(e){return e&&typeof e=="object"?e:{}}function Rv(e,t){for(let n of Object.values(on(t.provider_hold)))for(let r of Array.isArray(n?.targets)?n.targets:[])if(Array.isArray(r?.attempt_ids)&&r.attempt_ids.includes(e))return r;return null}function Ov(e){if(e?.status!=="ok")return{eligible:!1,reason:`\uACC4\uC815 \uC0C1\uD0DC ${String(e?.status||"\uBBF8\uC0C1")}`};let t=Array.isArray(e.windows)?e.windows:[],n=t.find(o=>o?.key==="5h"),r=t.find(o=>o?.key==="7d");if(!n||typeof n.pct!="number")return{eligible:!1,reason:"5\uC2DC\uAC04 \uC0AC\uC6A9\uB7C9 \uBBF8\uAD00\uCE21"};if(n.pct>80)return{eligible:!1,reason:"5\uC2DC\uAC04 \uC0AC\uC6A9\uB7C9 80% \uCD08\uACFC"};if(r){if(typeof r.pct!="number")return{eligible:!1,reason:"7\uC77C \uC0AC\uC6A9\uB7C9 \uBBF8\uAD00\uCE21"};if(r.pct>90)return{eligible:!1,reason:"7\uC77C \uC0AC\uC6A9\uB7C9 90% \uCD08\uACFC"}}return{eligible:!0,reason:""}}function ha(e,t){let n=on(on(t).attempts)[e];if(!n)return null;let r=on(on(t).runner_catalog),o=on(r.runners),i=typeof n.runner=="string"&&o[n.runner]?n.runner:Object.keys(o)[0]||"",s=on(o[i]),l=on(s.models),a=typeof n.model=="string"&&l[n.model]?n.model:typeof s.default_model=="string"?s.default_model:Object.keys(l)[0]||"",u=Rv(e,on(t)),d=typeof n.claude_account=="string"?n.claude_account:typeof u?.account=="string"?u.account:"";return{attempt_id:e,original_runner:i,runner:i,model:a,account:d,fresh_current:!1}}function ba(e,t,n){if(!e||!t||typeof t.closest!="function")return null;let r=t.closest(".provider-resume-dialog__runner");if(r){let l=on(on(on(n).runner_catalog).runners),a=on(l[r.value]),u=Object.keys(on(a.models));return{...e,runner:r.value,model:typeof a.default_model=="string"?a.default_model:u[0]||""}}let o=t.closest(".provider-resume-dialog__model");if(o){try{let[l,a]=JSON.parse(o.value);if(typeof l=="string"&&typeof a=="string")return{...e,runner:l,model:a}}catch{}return e}let i=t.closest(".provider-resume-dialog__account");if(i)return{...e,account:i.value};let s=t.closest(".provider-resume-dialog__fresh-input");return s?{...e,fresh_current:s.checked}:null}function ya(e){if(!e||!e.runner||!e.model||e.runner==="claude"&&!e.account)return null;let t={runner:e.runner,model:e.model};e.runner==="claude"&&e.account&&(t.claude_account=e.account);let n=e.fresh_current||e.runner!==e.original_runner;return{attempt_id:e.attempt_id,payload:{exec_override:t,...n?{continuation:"fresh_current",decision_token:{}}:{}}}}function Lo(e,t){if(!e)return"";let n=on(on(on(t).runner_catalog).runners),r=on(on(t).account_catalog),o=Array.isArray(r.claude)?r.claude:[],i=e.runner!==e.original_runner;return c`<dialog
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
                ${Object.keys(on(l?.models)).map(a=>c`<option
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
              ${o.map(s=>{let l=Ov(s),a=s.alias||s.email;return c`<option
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
  </dialog>`}function va(e){let t=e?.querySelector?.(".provider-resume-dialog")||null;!t||t.open||(typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""))}var lc=Object.freeze({repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",manual_target_missing:"\uC218\uB3D9 \uBC30\uD3EC \uAE30\uB85D\uC5D0 \uD540\uB41C \uB300\uC0C1 SHA\uAC00 \uC5C6\uC5B4 \uC2E4\uD589\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",bootstrap_not_approved:"\uCCAB [deploy] \uC120\uC5B8\uC740 \uC0AC\uB78C \uC2B9\uC778 \uC5C6\uC774 \uC2E4\uD589\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. Worker \uC124\uC815\uC758 [\uBC30\uD3EC \uC2E4\uD589]\uC73C\uB85C \uC6D0\uACA9 base tip\uC744 \uD55C \uBC88 \uBC30\uD3EC\uD55C \uB4A4 [\uC815\uC0B0 \uC7AC\uAC1C]\uB97C \uB204\uB974\uC138\uC694 \u2014 \uADF8 \uB4A4 \uBA38\uC9C0\uBD80\uD130\uB294 \uC790\uB3D9 \uBC30\uD3EC\uB429\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_red:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",cleanup_failed:"\uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uAC00 \uB05D\uB098\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",retry_exhausted:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB97C \uBAA8\uB450 \uC4F0\uACE0\uB3C4 \uAC19\uC740 \uC2E4\uD328\uAC00 \uC774\uC5B4\uC84C\uC2B5\uB2C8\uB2E4.",conflict_unresolved:"\uCDA9\uB3CC \uD574\uC18C\uAC00 \uB05D\uB098\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",internal_record_failed:"Worker \uB0B4\uBD80 \uAE30\uB85D\uC774 \uC2E4\uD328\uD574 \uC9C4\uD589\uC744 \uBA48\uCDC4\uC2B5\uB2C8\uB2E4.",foreign_landing_unpinned:"\uB2E4\uB978 \uC800\uC7A5\uC18C \uCC29\uC9C0\uC778\uB370 foreign_repo\xB7foreign_path\xB7foreign_base \uD540\uC774 \uC5C6\uAC70\uB098 \uD615\uC2DD\uC774 \uD2C0\uB9BD\uB2C8\uB2E4.",foreign_checkout_unavailable:"\uD540\uB41C \uB300\uC0C1 \uC800\uC7A5\uC18C \uCCB4\uD06C\uC544\uC6C3\uC774 \uC5C6\uAC70\uB098 foreign_repo\uC640 \uAC19\uC740 URL\uC758 remote\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",foreign_deploy_unsupported:"\uB300\uC0C1 \uC800\uC7A5\uC18C\uAC00 [deploy]\uB97C \uC120\uC5B8\uD574 Worker\uAC00 \uBC30\uD3EC \uC99D\uAC70\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uC138\uC158\uC774 \uBC30\uD3EC\uC640 \uB9C8\uAC10\uC744 \uC18C\uC720\uD569\uB2C8\uB2E4.",repair_lane_retired:"\uC790\uB3D9 \uC218\uB9AC \uB808\uC778\uC774 \uC740\uD1F4\uD574 \uC0AC\uB78C \uCC98\uB9AC\uB85C \uB118\uC5B4\uC654\uC2B5\uB2C8\uB2E4."});var Of={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",job_script_failure:"\uC7A1 \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428",quickfix_landing_failed:"\uCC29\uC9C0 \uC2E4\uD328",runner_exit:"\uC138\uC158 \uC2E4\uD328",session_parked:"\uC138\uC158 \uB300\uAE30",session_ended_unresolved:"\uC138\uC158 \uC885\uB8CC",prerequisite_unmet:"\uC120\uD589 \uB300\uAE30",delivery_unproven:"\uCC29\uC9C0 \uC99D\uAC70 \uBD80\uC871"},If={overloaded_529:"Claude API \uACFC\uBD80\uD558(529)\uB85C \uBCF4\uB958",rate_limited_429:"Claude API \uC694\uCCAD \uD55C\uB3C4(429)\uB85C \uBCF4\uB958"},Lf={"session_hard_stop:failure":"\uC138\uC158\uC774 \uC2E4\uD328\uB97C \uBCF4\uACE0\uD558\uACE0 \uC885\uB8CC","session_hard_stop:environment":"\uC138\uC158\uC774 \uD658\uACBD \uC624\uB958\uB97C \uBCF4\uACE0\uD558\uACE0 \uC885\uB8CC","resume_failed:transcript_missing":"\uC774\uC5B4\uD558\uAE30 \uB300\uC0C1 \uC138\uC158 \uAE30\uB85D\uC774 \uC5C6\uC74C \u2014 \uC0C8 \uC138\uC158\uC73C\uB85C \uB300\uCCB4"};function Iv(e){return typeof e!="number"||!Number.isFinite(e)?"":new Date(e).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}function Lv(e,t){if(typeof e!="string"||!e.startsWith("provider_outage:"))return null;let n=e.slice(16);if(n==="usage_limit"){let o=t&&typeof t=="object"?t.resets_at:null,i=Iv(o);return i?`\uACC4\uC815 \uC0AC\uC6A9 \uD55C\uB3C4\uB85C \uBCF4\uB958 \u2014 \uB9AC\uC14B ${i}`:"\uACC4\uC815 \uC0AC\uC6A9 \uD55C\uB3C4\uB85C \uBCF4\uB958"}if(Object.hasOwn(If,n))return If[n];let r=/^http_(5\d\d)$/.exec(n);return r?`Claude API \uC624\uB958(${r[1]})\uB85C \uBCF4\uB958`:null}function wa(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function ka(e){for(let t of wa(e)){if(Object.hasOwn(Of,t))return Of[t];if(t.startsWith("session_"))return"\uC138\uC158 \uC2E4\uD328"}return null}function Pf(e){return wa(e).length===0?null:ka(e)||"\uC2E4\uD328"}function Zr(e){let t=null;for(let n of wa(e))Object.hasOwn(lc,n)&&(t=lc[n]);return t}function Sr(e,t){if(typeof e=="string"&&Object.hasOwn(Lf,e))return Lf[e];let n=Lv(e,t);if(n!==null)return n;let r=ka(e),o=Zr(e);return r&&o?`${r} \u2014 ${o}`:r||o?r||o:typeof e=="string"?e:""}function Mf(e,t){let n=ka(e)??ka(t),r=Zr(t)??Zr(e);return n&&r?`${n} \u2014 ${r}`:n||r?n||r:typeof t=="string"?t:""}var Dv=new Set(["repo_operation_timeout_unresolved"]);function Pv(e){for(let t of wa(e))if(Dv.has(t)||t.startsWith("repo_ops_"))return!0;return!1}function Mv(e,t){return t.code==="interrupted"||t.interrupted===!0||e.failure_kind==="interrupted_without_terminal_exit"||t.code==="interrupted_without_terminal_exit"}function qf(e,t){if(!e||typeof e!="object")return"";let n=e.failure;if(!n||typeof n!="object"||Pv(n.code))return"";if(n.code==="timeout"){let o=Number(t);return Number.isFinite(o)&&o>0?`\uD0C0\uC784\uC544\uC6C3 ${Math.round(o/1e3)}\uCD08 \uCD08\uACFC`:"\uD0C0\uC784\uC544\uC6C3 \uCD08\uACFC"}if(Mv(e,n))return"\uC885\uB8CC \uAE30\uB85D \uC5C6\uC74C \u2014 \uC911\uB2E8\uB428";let r=typeof e.elapsed_ms=="number"&&Number.isFinite(e.elapsed_ms)&&e.elapsed_ms>=0?` \xB7 ${zr(e.elapsed_ms)}`:"";return typeof e.signal=="string"&&e.signal.length>0?`signal ${e.signal}${r}`:Number.isInteger(e.exit_code)?`exit ${e.exit_code}${r}`:""}var Df={schema_unsupported:"\uD540\uB41C \uC815\uCC45 \uC2A4\uD0A4\uB9C8\uB97C \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."};function Nf(e){if(!e||typeof e!="object")return"";let t=e.retry;if(!t||typeof t!="object")return"";if(typeof t.blocked_reason=="string"&&t.blocked_reason)return`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uBABB \uD568 \u2014 ${Object.hasOwn(Df,t.blocked_reason)?Df[t.blocked_reason]:t.blocked_reason}`;if(t.status==="absorbed"){let n=t.absorbed&&typeof t.absorbed=="object"?t.absorbed:null,r=Sr(n?.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428 \u2014 \uCCAB \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428"}if(e.state!=="failed")return"";if(t.status==="not_applicable")return"\uC7AC\uC2DC\uB3C4 \uB300\uC0C1 \uC544\uB2D8 \u2014 \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804 \uC2E4\uD328";if(t.status==="consumed"){let n=typeof t.first_fingerprint=="string"&&t.first_fingerprint?t.first_fingerprint:null;if(n===null)return"";if(n===e.failure?.fingerprint)return"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uAC19\uC740 \uC2E4\uD328";let r=Sr(t.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328"}return""}function qv(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}var jf=200;function Nv(e){return typeof e!="string"||e.length===0?"":e.length>jf?`${e.slice(0,jf)}\u2026`:e}function jv(e){let t=e&&e.attempts>0&&e.max>0?` ${e.attempts}/${e.max}`:"",n=e&&typeof e.next_at=="number"?` \xB7 ${new Date(e.next_at).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}`:"";return`\u21BB \uC7AC\uC2DC\uB3C4 \uB300\uAE30${t}${n}`}function cc(e){return typeof e!="number"||!Number.isFinite(e)?"":new Date(e).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}function Fv(e){if(!e)return"";let t=e.auto_resume==="disarmed"?" \xB7 \uC218\uB3D9 \uC870\uCE58":"";if(e.kind==="usage_limit"){let r=cc(e.resets_at);if(!r)return`\u23F3 \uD55C\uB3C4 \uB300\uAE30 \xB7 \uB9AC\uC14B \uBBF8\uC0C1${t}`;let o=e.target?.account_alias||e.target?.account||"";return`\u23F3 \uD55C\uB3C4 \uB300\uAE30 ${r}${o?` \xB7 ${o}`:""}${t}`}let n=cc(e.next_probe_at);return`\u26A0\uFE0F \uACF5\uAE09\uC790 \uC7A5\uC560${n?` \xB7 \uB2E4\uC74C \uD504\uB85C\uBE0C ${n}`:""}${t}`}function Bf(e){if(!e)return"";let t=Array.isArray(e.timeline)?e.timeline:[],n=typeof e.log_path=="string"?e.log_path:"",r=e.log_expired===!0,o=e.log_unreadable===!0;return t.length===0&&n.length===0&&!r&&!o?"":c`${t.length>0?c`<ol class="rtile__history" data-seam="tile-timeline">
        ${t.map(i=>c`<li class="rtile__history-row">
              ${Ff(i.at)?c`<span class="rtile__history-at"
                    >${Ff(i.at)}</span
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
            ${Ur(n)}
          </p>`:""}`}function Ff(e){return typeof e!="number"||!Number.isFinite(e)?"":new Date(e).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}function Bv(e,t){if(!e||e.open!==!0)return"";let n=Zr(e.cause)||Sr(e.cause,e.cause_detail),r=e.retry&&e.retry.attempts>0?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 ${e.retry.attempts}\uD68C \u2014 \uAC19\uC740 \uC624\uB958`:"",o=e.cause_detail,i=e.quickfix_lane&&e.quickfix_landing?e.quickfix_landing:null,s=i?[i.cursor||null,typeof i.head_sha=="string"?i.head_sha.slice(0,7):null,i.reason||null].filter(Boolean).join(" \xB7 "):"",l=typeof e.finished_at=="number"?`${new Date(e.finished_at).toLocaleString("ko-KR")} \xB7 ${bn(e.finished_at,t)}`:"",a=[e.runner,e.model,e.observed_effort??e.effort,e.speed].filter(b=>typeof b=="string"&&b.length>0).join(" \xB7 "),u=e.usage?.total_cost_usd,d=typeof u=="number"&&Number.isFinite(u)?`$${u.toFixed(2)}`:"",m=Bf(e);return c`<div
    class="rtile__failure-pop"
    role="dialog"
    aria-label="실패 상세"
  >
    <dl class="rtile__failure-kv">
      ${e.summary?c`<div>
            <dt>보고</dt>
            <dd>${e.summary}</dd>
          </div>`:""}
      ${m?c`<div>
            <dt>이력</dt>
            <dd>${m}</dd>
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
  </div>`}function Uv(e){return e==="pending"?"\uD68C\uBCF5 \uD6C4 \uC790\uB3D9 \uC7AC\uAC1C \uB300\uAE30":e==="disarmed"?"\uC790\uB3D9 \uC7AC\uAC1C \uC18C\uC9C4 \xB7 \uC218\uB3D9 \uC870\uCE58 \uD544\uC694":typeof e=="string"&&e.startsWith("refused:")?`\uC790\uB3D9 \uC7AC\uAC1C \uAC70\uBD80 \xB7 ${e.slice(8)}`:""}function Wv(e){return e==="none"?"\uACC4\uC815 \uC804\uD658 \uC548 \uD568 \xB7 \uC870\uAC74\uC744 \uB9CC\uC871\uD558\uB294 \uB2E4\uB978 \uACC4\uC815 \uC5C6\uC74C":e==="disabled"?"\uACC4\uC815 \uC804\uD658 \uC548 \uD568 \xB7 \uC790\uB3D9 \uC804\uD658 \uAEBC\uC9D0":""}function zv(e){if(!e||e.open!==!0)return"";let t=[e.target?.model,e.target?.account_alias||e.target?.account].filter(i=>typeof i=="string"&&i.length>0).join(" \xB7 "),n=cc(e.resets_at),r=Uv(e.auto_resume),o=Wv(e.auto_switch);return c`<div
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
            <dd>${Ur(e.log_path)}</dd>
          </div>`:""}
    </dl>
  </div>`}function Hv(e){return!e||!e.repo&&!e.serial_lane_id?"":c`${e.repo?c`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?c`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`}var Kv=new Set(["codex-runner"]);function Gv(e,t,n,r=null){if(!e)return"";let o=e.last_activity||null,i=o&&typeof o.text=="string"?o.text:"",s=o&&typeof o.at=="number"?o.at:null,l=(r||!Array.isArray(e.legs)?[]:e.legs).filter(h=>h&&!(typeof h.agent_type=="string"&&Kv.has(h.agent_type))),a=l.filter(h=>h&&h.state==="live"),u=l.filter(h=>h&&h.state!=="live"),d=r&&typeof r.last_event_at=="number"?bn(r.last_event_at,t):"",m=r?bn(r.updated_at,t):"",b=d?`\uCD5C\uADFC \uD65C\uB3D9 ${d}`:m?`\uAC31\uC2E0 ${m}`:"";return c`${i?c`<div class="rtile__activity${n?" is-paused":""}">
        <span class="rtile__activity-dot" aria-hidden="true"></span>
        <span class="rtile__activity-text">${i}</span>
        ${s!==null?c`<span class="rtile__activity-age"
              >${bn(s,t)}</span
            >`:""}
      </div>`:b?c`<div class="rtile__activity rtile__activity--session">
          <span class="rtile__activity-dot" aria-hidden="true"></span>
          <span class="rtile__activity-text">${b}</span>
        </div>`:""}${a.length>0||u.length>0?c`<div class="rtile__legs">
        ${a.map(h=>c`<span
              class="rtile__leg rtile__leg--live"
              title="이 세션이 띄운 서브에이전트/Codex 세션이 실행 중입니다"
              >위임 중 · ${h.label}</span
            >`)}${u.length>0?c`<span
              class="rtile__leg rtile__leg--done"
              title=${`\uC644\uB8CC\uB41C \uC704\uC784: ${u.map(h=>h.label).join(", ")}`}
              >위임 완료 ${u.length}</span
            >`:""}
      </div>`:""}`}var Yv={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function Vv(e){if(!e)return"";let t=Yv[e.locality]||"";return c`<button
    type="button"
    class="rtile__session"
    ?disabled=${t.length>0}
    title=${t||"\uB77C\uC774\uBE0C \uC138\uC158 \uC5F4\uAE30"}
    aria-label="라이브 세션 열기"
  >
    ▤ 세션
  </button>`}function Qv(e,t,n,r="",o="",i=!1){if(e==="provider_hold")return c`<div class="rtile__foot">
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
    </div>`;if(e==="retry_wait")return n?c`<div class="rtile__foot">${n}</div>`:"";let s=Nv(t?.summary);if(e==="waiting")return c`${s?c`<p class="rtile__held-summary">${s}</p>`:""}${r}
      <div class="rtile__foot">${n}</div>`;let l=Bf(t);return c`${s?c`<p class="rtile__held-summary">${s}</p>`:""}${l}
    <div class="rtile__foot">
      ${i?c`${n}${o}`:c`${o}${n}`}
    </div>`}function uc(e,t,n=null,r={}){let o=e.kind==="session",i=o&&Array.isArray(e.session_refs)&&e.session_refs.find(we=>we&&we.current===!0)||null,s=e.failed===!0,l=s&&e.failure||null,a=e.parked===!0&&!s,u=e.retry_wait===!0&&!s&&!a,d=e.waiting===!0&&!s&&!a&&!u,m=e.provider_hold===!0&&!s&&!a&&!u&&!d,b=a&&e.failure||null,h=d&&e.wait||null,k=m&&e.hold||null,S=a||u||d||m,T=!!e.paused,ee=s||S?e.status_label||(a?"\uC138\uC158 \uB300\uAE30":u?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":d?"\uC120\uD589 \uB300\uAE30":m?"\uACF5\uAE09\uC790 \uBCF4\uB958":e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):T?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?qv(t-e.started_at):"\u2014",re=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,U=Ho(e),L=pn(e.usage),R=or(e.usage),P=e.conflict_resolution?T?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,q=e.base_exception||null,W=e.landing,F=e.attempt_id&&e.attempt_id===n,D=r.monitor||null,V=Hv(D),j=Li(D?.cross_lane_chip),ne=D?Ii(D.dependency_chips):"",me=Gv(D,t,T,o?{updated_at:e.updated_at??null,last_event_at:i&&i.locality==="local"?i.last_event_at:null}:null),Oe=o&&e.workflow?.chips?.exec_receipt||null,H=Kr(e.workflow),te=Di(e.rec,e.chip_popover?.chip_key==="rec"),ce=e.chip_popover?bo(e.chip_popover.content):"",Te=Oe?c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${rr(Oe)}`}
        >${`${Oe.kind}:${si(Oe)}`}</span
      >`:"",K=i?c`<span
        class="ctl-chip ctl-chip--sref"
        title=${`${i.provider}:${i.session_id}@${i.host}${(e.session_refs||[]).length>=2?` \xB7 \uC774\uB825 ${(e.session_refs||[]).length}`:""}`}
        >${Ko(i)}</span
      >`:"",ae=V||j||H||K||Te||te?c`<div class="rtile__meta">
          ${V}${j}${H}${K}${Te}${te}${ce}
        </div>`:"",Q=l?c`<button
          type="button"
          class="rtile__failure-badge"
          data-attempt-id=${l.attempt_id}
          aria-expanded=${l.open===!0?"true":"false"}
          aria-label="실패 상세"
        >
          ⛔ ${Pf(l.cause)||"\uC2E4\uD328"}
        </button>
        ${l.halted_auto_advance?c`<span class="rtile__auto-halted">자동 진행 꺼짐</span>`:""}`:"",de=a?c`<span
        class="rtile__held-badge"
        title="세션이 사용자 결정을 기다리며 정상 종료했습니다 — 큐는 계속 갑니다"
        >⏸ 세션 대기</span
      >`:u?c`<span
          class="rtile__held-badge"
          title="환경성 실패의 자동 재시도를 기다립니다 — 사람이 할 일은 없습니다"
          >${jv(e.retry)}</span
        >`:d?e.wait?.returning?c`<span
              class="rtile__held-badge"
              title="막고 있던 선행이 남지 않았습니다 — 다음 pass에서 후보로 돌아갑니다 (슬롯·레인 순서 대기)"
              >⛓ 복귀 대기</span
            >`:c`<span
              class="rtile__held-badge"
              title="세션이 선행 미충족으로 착수를 거부했습니다 — 선행이 닫히면 저절로 다시 돕니다"
              >⛓ 선행 대기</span
            >`:m&&k?c`<button
              type="button"
              class="rtile__held-badge rtile__provider-hold-badge"
              data-attempt-id=${e.attempt_id}
              aria-expanded=${k.open===!0?"true":"false"}
              aria-label="공급자 보류 상세"
            >
              ${Fv(k)}
            </button>`:"",Re=c`${P?c`<span class="worker-mini__badge">${P}</span>`:""}${q?c`<span
        class="worker-mini__badge"
        title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
        >${q}</span
      >`:""}${Q}${de}`,be=o?"":Ao(e),Ie=ki(l?.quickfix_landing),Ye=Ie==="settlement"?"\uC815\uC0B0 \uC7AC\uAC1C":"\uC774\uC5B4\uD558\uAE30",_t=Ie==="settlement"?"\uCC29\uC9C0 \uC815\uC0B0\uC744 \uB2E4\uC2DC \uC2E4\uD589":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589",G=e.resolve_action?c`<button
        type="button"
        class="rtile__resolve"
        ?disabled=${e.resolve_enabled===!1}
        title=${e.resolve_title||"\uC774 \uC2E4\uD328\uB97C \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4"}
        aria-label="세션에서 해결"
      >
        세션에서 해결
      </button>`:"",pe=e.discard?.action&&!(s&&l?.landed===!0)?c`<button
          type="button"
          class="rtile__discard"
          data-operation-id=${e.discard.operation?.operation_id||""}
          data-confirmation=${l?.confirmation||"unmerged"}
          ?disabled=${!e.discard.enabled}
          title=${e.discard.title}
          aria-label=${e.discard.label}
        >
          ${e.discard.label}
        </button>`:"",oe=pe&&e.discard?.abandon?.action===!0?c`<button
          type="button"
          class="rtile__discard-abandon"
          data-operation-id=${e.discard.operation?.operation_id||""}
          data-operation-kind=${e.discard.operation?.kind||""}
          data-last-error=${e.discard.error||""}
          title=${e.discard.abandon.title}
          aria-label=${e.discard.abandon.label}
        >
          ${e.discard.abandon.label}
        </button>`:"",Y=oe?c`${pe}${oe}`:pe;return c`<div
    class="rtile${F?" rtile--sel":""}${T?" rtile--paused":""}${s?" rtile--failed rtile--compact":""}${S?" rtile--held rtile--compact":""}${a?" rtile--parked":""}${u?" rtile--retry-wait":""}${d?" rtile--waiting":""}${o?" rtile--session":""}${m?" rtile--provider-hold":""}${e.search_match===!1?" is-dimmed":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span
        class="rtile__dot${o?" rtile__dot--session":""}"
        aria-hidden="true"
      ></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${Pi(e.priority)}${U?c`<span class="rtile__resumed" title=${U}>↻</span>`:""}${Re}
      <div class="rtile__hd-actions">
        ${o?c`${typeof e.started_at=="number"?c`<span class="rtile__elapsed">${ee}</span>`:""}${Vv(i)}<span
                class="rtile__session-badge"
                title="Worker가 아닌 세션이 in_progress로 잡은 이슈"
                >세션</span
              >`:c`<span class="rtile__elapsed">${ee}</span>`}
        ${o||S?"":s?c`<button
                  type="button"
                  class="op-btn rtile__resume"
                  data-resume-kind=${Ie}
                  ?disabled=${l?.resume_eligible===!1}
                  title=${l?.resume_eligible===!1?l.resume_reason||`${Ye} \uBD88\uAC00`:_t}
                  aria-label=${Ye}
                >
                  ↻ ${Ye}
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
                ${Y}`}${a?"":G}
      </div>
    </div>
    <div class="rtile__title">${e.title}</div>
    ${S?Qv(a?"parked":u?"retry_wait":d?"waiting":"provider_hold",a?b:d?h:k,Y,d?ne:"",a?G:"",a&&!!e.discard?.error):s?"":c`${me}${e.rollup?ri(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:Wa}):""}
            ${W?c`<div class="rtile__landing">
                  <span
                    class="merge-step${W.failed?" merge-step--failed":""}"
                    style=${`--progress: ${W.percent}%`}
                    >${W.label}${W.index>0?c`<span class="merge-step__n"
                          >${W.index}/${W.total}</span
                        >`:""}</span
                  >
                </div>`:""}
            ${ne}
            ${o?ae:V||j||H||re||te||L.length>0||R?c`<div class="rtile__meta">
                    ${V}${j}${H}${Hr(e.exec_chips)}${te}
                    ${L.length>0?L.map(we=>c`<span
                              class="worker-usage"
                              title=${we.tooltip}
                              >${we.label}</span
                            >`):R?c`<span
                            class="worker-usage"
                            title=${Go(e.usage)}
                            >${R}</span
                          >`:""}${ce}
                  </div>`:""}
            ${Ei(e)} ${be}
            <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
            ${s||T?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}`}
    ${Bv(l,t)}${zv(k)}
  </div>`}function Xv(e){let t=e.last_activity&&typeof e.last_activity=="object"?e.last_activity:null,n=Array.isArray(e.legs)?e.legs:[],r=e.dependency_chips||null;return!t&&n.length===0&&!r&&e.kind!=="session"?null:{...t?{last_activity:t}:{},...n.length>0?{legs:n}:{},...r?{dependency_chips:r}:{}}}function Uf(e,t=Date.now(),n=null){let r=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${r.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:r.map(o=>uc(o,t,n,{monitor:Xv(o)}))}
  </div>`}function Do(e,t,n=!1){let r=!!t.discard?.error;return!e||!r&&t.parked!==!0?{}:{resolve_action:!0,resolve_enabled:!n,resolve_title:n?"\uC138\uC158 \uAE30\uB3D9 \uC694\uCCAD \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":r?"\uC2E4\uD328\uD55C \uD3D0\uAE30\uB97C \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 \u2014 \uAE30\uB85D\uB41C \uC138\uC158\uC774 \uC788\uC73C\uBA74 fork\uD558\uACE0, \uC5C6\uC73C\uBA74 \uC0C8 \uC138\uC158\uC5D0 \uC0AC\uC720\uB97C \uC2E3\uC2B5\uB2C8\uB2E4":"\uD30C\uD0B9\uC744 \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 \u2014 \uC0B4\uC544 \uC788\uB294 \uBB38\uC758 \uC138\uC158\uC774 \uC788\uC73C\uBA74 \uADF8 \uCC3D\uC744 \uAC00\uB9AC\uD0B5\uB2C8\uB2E4"}}var cn="",Zv=["impl_runtime","impl_model","impl_effort"],Wf=["claude","codex"],Jv=["claude_account","codex_account"],ek=5,$a=1;function Dn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function xa(e,t){let n=t.transport,r=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,o=t.notify||(A=>_e(A,"error",4e3)),i={},s={},l={},a={},u=[],d=!1,m={state:"absent",values:{},warnings:[]},b={},h={},k=Promise.resolve(),S=Promise.resolve(),T={claude:null,codex:null},ee=!1,re=null,U={},L="",R="general",P="",q=!1,W=!1,F=!1,D=null,V=!1;function j(){let A=t.queue?t.queue():null;return Dn(A)?A:null}function ne(){let A=j();return A?A.runner_catalog:null}function me(){let A=j();return A&&Dn(A.execution_defaults)?A.execution_defaults:null}function Oe(){let A=j();return!!(A&&Object.hasOwn(A,"quick_fix_orchestration_model"))}function H(){let A=t.implPresetStore?.get();return Dn(A)&&Array.isArray(A.presets)?A:null}function te(){return r===null?{}:{root_dir:r}}async function ce(A,N){return V||!n?null:await n(A,N)}function Te(A){A&&Dn(A.queue)&&t.onQueueAdopt?.(A.queue)}async function K(A,N){let B=j();if(!B||V)return null;let ke=await ce(A,{...N,...te(),expected_revision:B.revision});if(Te(ke),r!==null&&ke&&ke.conflict){let ye=ke.queue&&typeof ke.queue.revision=="number"?ke.queue.revision:j()?.revision??B.revision;ke=await ce(A,{...N,...te(),expected_revision:ye}),Te(ke)}return ke}async function ae(){d=!0,Pe();try{let A=await ce("get-session-defaults",{...te()});i=fi(A?.values),s={...i},l={},a={},u=Array.isArray(A?.warnings)?A.warnings:[]}catch(A){u=["kv_read_failed"],o(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${A instanceof Error?A.message:String(A)}`)}finally{d=!1,Pe()}}function Q(A,N){let B={...N};for(let ke of Yo){let ye=s[ke];ye!==A[ke]&&(typeof ye=="string"?B[ke]=ye:delete B[ke])}return B}function de(){S=S.then(()=>Re())}async function Re(){let A=Ju(i,s);if(Object.keys(A).length===0)return;let N={...s};try{let B=await ce("set-session-defaults",{values:A,...te()});i=fi(B?.values),s=Q(N,i),u=Array.isArray(B?.warnings)?B.warnings:[]}catch(B){o(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${B instanceof Error?B.message:String(B)}`)}Pe()}function be(A,N){if(!Dn(A))return;let B=A.state;m={state:B==="usable"||B==="unusable"||B==="absent"?B:"absent",values:Dn(A.values)?{...A.values}:{},warnings:Array.isArray(A.warnings)?A.warnings:[]},h={...m.values},N&&(b={...h})}async function Ie(){try{be(await ce("get-workspace-accounts",{...te()}),!0)}catch(A){m={state:"unusable",values:{},warnings:["kv_read_failed"]},h={},b={},o(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${A instanceof Error?A.message:String(A)}`)}Pe()}async function Ye(A){try{let N=await fetch(A);if(!N.ok)return null;let B=await N.json();if(!Dn(B)||!Array.isArray(B.accounts))return null;let ke=B.accounts.filter(ye=>Dn(ye)&&typeof ye.key=="string"&&ye.key.length>0&&typeof ye.email=="string"&&ye.email.length>0);return{accounts:ke,active:ke.find(ye=>ye.active===!0)||null}}catch{return null}}async function _t(){ee=!0;let[A,N]=await Promise.all([Ye("/api/claude-usage"),Ye("/api/codex-usage")]);V||(T={claude:A,codex:N},Pe())}function G(){let A={};for(let N of Jv){let B=Object.hasOwn(b,N)?b[N]:null,ke=Object.hasOwn(h,N)?h[N]:null;B!==ke&&(A[N]=B)}return A}async function pe(){let A=G();if(Object.keys(A).length!==0){try{be(await ce("set-workspace-accounts",{values:A,...te()}),!1)}catch(N){o(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${N instanceof Error?N.message:String(N)}`)}Pe()}}function oe(A,N){N===cn?delete b[A]:b[A]=N,Pe(),k=k.then(()=>pe())}function Y(A,N){if(Zv.includes(A)){Qe(A,N);return}N===cn?delete s[A]:s[A]=N,Pe(),de()}function we(A,N){l[A]=N,delete a[A]}function fe(A,N,B){if(l[A]=N,N.length>0&&!B(N)){a[A]=!0,Pe();return}delete l[A],delete a[A],N.length===0?delete s[A]:s[A]=N,Pe(),de()}function Ce(){let A=mt().orchestration_model,N=On({global:{orchestration_model:A??void 0},execution_defaults:me(),runner_catalog:ne()}).orchestration_model.value;return N?Nn(ne(),N):null}function Ne(A,N){typeof N=="string"&&N.length>0?s[A]=N:delete s[A]}function Qe(A,N){let B=N===cn?void 0:N,ke=Qu({impl_runtime:A==="impl_runtime"?B:s.impl_runtime,impl_model:A==="impl_model"?B:s.impl_model,impl_effort:A==="impl_effort"?B:s.impl_effort},ne(),Ce());Ne("impl_runtime",ke.impl_runtime),Ne("impl_model",ke.impl_model),Ne("impl_effort",ke.impl_effort),Pe(),de()}async function Fe(){let A=j();if(!A)return;let N={orchestration_model:A.orchestration_model??null,orchestration_effort:A.orchestration_effort??null,orchestration_speed:A.orchestration_speed??null,quick_fix_orchestration_model:A.quick_fix_orchestration_model??null,quick_fix_orchestration_effort:A.quick_fix_orchestration_effort??null,quick_fix_orchestration_speed:A.quick_fix_orchestration_speed??null},B=ed(N,{...N,...U});if(Object.keys(B).length!==0){try{let ke=await K("worker-queue-set-orchestration-defaults",{values:B});if(ke&&ke.applied===!1){o("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}U={}}catch(ke){o(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${ke instanceof Error?ke.message:String(ke)}`)}Pe()}}function J(A,N){U[A]=N===cn?null:N,Pe(),Fe()}function X(A){if(re=A,!A){Pe();return}let N=ne(),B=mt(),ke=B.orchestration_model;ke&&!wo(N,A).includes(ke)&&(U.orchestration_model=null,ke=null);let ye=B.orchestration_effort;ye&&!hi(N,A,ke||En).includes(ye)&&(U.orchestration_effort=null),Pe(),Fe()}async function Ee(A){if(!(!j()||A<$a)){try{await K("worker-queue-set-slots",{slots:A})}catch(N){o(`slots \uC800\uC7A5 \uC2E4\uD328: ${N instanceof Error?N.message:String(N)}`)}Pe()}}async function Je(A){if(!(!j()||A<$a||A>ek)){try{await K("worker-queue-set-serial-lane-count",{count:A})}catch(N){o(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${N instanceof Error?N.message:String(N)}`)}Pe()}}async function st(A,N){let B=A==="auto_advance"?"worker-automation-toggle":A==="auto_merge"?"worker-merge-auto-toggle":"worker-provider-auto-switch-toggle";try{await K(B,{on:N})}catch(ke){o(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${ke instanceof Error?ke.message:String(ke)}`)}Pe()}function Ue(){let A={},N=mt();for(let B of vo){let ke=qn.includes(B)?N[B]:s[B];typeof ke=="string"&&ke.length>0&&(A[B]=ke)}return A}async function et(){let A=H();if(!A)return;let N=Ue();if(Object.keys(N).length===0){o("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let B=(A.presets||[]).find(ye=>ye.id===L),ke=P.trim()||(B?B.name:"");if(!ke){o("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let ye=B?await ce("impl-preset-update",{expected_revision:A.revision,id:B.id,name:ke,settings:N}):await ce("impl-preset-create",{expected_revision:A.revision,name:ke,settings:N});if(ye&&ye.applied){if(P="",!B&&Array.isArray(ye.presets)){let pt=ye.presets.find(wt=>wt.name===ke);L=pt?pt.id:L}Pe()}else o("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Pe()}catch(ye){o(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${ye instanceof Error?ye.message:String(ye)}`)}}async function vt(){let A=H();if(!(!A||L.length===0))try{let N=await ce("impl-preset-delete",{expected_revision:A.revision,id:L});N&&N.applied?(L="",Pe()):(o("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Pe())}catch(N){o(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${N instanceof Error?N.message:String(N)}`)}}function ut(A){i=fi(A.values),s={...i},u=Array.isArray(A.warnings)?A.warnings:[],Dn(A.queue)&&(t.onQueueAdopt?.(A.queue),U={})}async function Ze(A){let N=H(),B=j();if(!N||!B||L.length===0||A==="quick_fix"&&!Oe())return;let ke=ye=>({preset_id:L,expected_revision:N.revision,expected_queue_revision:ye,...A==="quick_fix"?{lane:"quick_fix"}:{},...te()});try{let ye=await ce("apply-impl-preset-global",ke(B.revision));if(A==="quick_fix"&&ye&&ye.lane!=="quick_fix"){o("\uC11C\uBC84 \uC751\uB2F5\uC5D0 lane\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uD050 \uC2A4\uB0C5\uC0F7\uC744 \uB2E4\uC2DC \uBC1B\uC740 \uB4A4 \uD655\uC778\uD558\uC138\uC694"),Pe();return}if(ye&&ye.applied&&ut(ye),r!==null&&ye&&ye.queue_applied===!1){let pt=ye.queue&&typeof ye.queue.revision=="number"?ye.queue.revision:j()?.revision??B.revision;if(ye=await ce("apply-impl-preset-global",ke(pt)),A==="quick_fix"&&ye&&ye.lane!=="quick_fix"){o("\uC11C\uBC84 \uC751\uB2F5\uC5D0 lane\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uD050 \uC2A4\uB0C5\uC0F7\uC744 \uB2E4\uC2DC \uBC1B\uC740 \uB4A4 \uD655\uC778\uD558\uC138\uC694"),Pe();return}ye&&ye.applied&&ut(ye)}ye&&ye.applied?ye.queue_applied===!1&&o("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):ye&&ye.conflict&&o("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(ye){o(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${ye instanceof Error?ye.message:String(ye)}`)}Pe()}async function dt(){W=!0,F=!1,Pe();try{let A=await ce("get-worker-system-prompt",{});!A||typeof A!="object"||Array.isArray(A)?F=!0:D=A}catch{F=!0}finally{W=!1,Pe()}}function Zt(){if(q=!q,q&&!D){dt();return}Pe()}function $(){let A=Ro({loading:W,error:F});if(A)return A;if(!D)return"";let N=Array.isArray(D.variants)?D.variants:[];return c`<div class="settings-dialog__sp-body">
      ${D.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${D.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${N.map(B=>c`<div class="settings-dialog__sp-variant" data-variant=${B.key}>
            <div class="settings-dialog__sp-cond">${B.condition}</div>
            ${dr(B.label,B.system_prompt)}
          </div>`)}
    </div>`}function Z(){return c`<section
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
        @click=${Zt}
      >
        ${q?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${q?$():""}
    </section>`}function qe(A,N,B,ke,ye,pt,wt,yt){let Tt=ye[A]??cn,jt=Ja(A,B,ye,me(),ne(),wt,yt),Ut=jt.options.find(St=>St.value===Tt),Yt=Tt===cn?jt.full_value:Ut?.full_value;return c`<select
        class=${Tt===cn?"settings-dialog__unset":""}
        data-key=${A}
        aria-label=${N}
        title=${Yt||""}
        ?disabled=${pt===!0||yt!=="quick_fix"&&jt.disabled}
        .value=${Ar(String(Tt))}
        @change=${St=>ke(A,String(St.target.value))}
      >
        <option value=${cn} ?selected=${Tt===cn}>
          ${jt.unset_label}
        </option>
        ${jt.options.map(St=>c`<option
              value=${St.value}
              title=${St.full_value||""}
              ?selected=${St.value===Tt}
            >
              ${St.label}
            </option>`)}
      </select>
      ${Tt===cn?c`<span class="settings-dialog__source-badge">기본</span>`:""}`}function Se(A,N,B,ke,ye,pt=!1,wt,yt=null,Tt=null){return c`<div
      class=${`settings-dialog__row${pt?" settings-dialog__row--off":""}`}
      title=${pt&&Tt?Tt:""}
    >
      <span class="settings-dialog__row-label">${N}</span>
      <span class="settings-dialog__controls">
        ${qe(A,N,B,ke,ye,pt,wt,yt)}
      </span>
    </div>`}function De(A,N,B,ke,ye,pt){let wt=Object.hasOwn(a,A),yt=l[A]??s[A]??cn;return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${N}</span>
      <span class="settings-dialog__controls">
        <input
          type="text"
          class=${`settings-dialog__text${wt?" settings-dialog__text--invalid":""}`}
          data-key=${A}
          aria-label=${N}
          aria-invalid=${String(wt)}
          placeholder=${B}
          .value=${Ar(yt)}
          @input=${Tt=>we(A,String(Tt.target.value))}
          @change=${Tt=>fe(A,String(Tt.target.value).trim(),pt)}
        />
        ${yt.length===0?c`<span class="settings-dialog__source-badge">기본</span>`:""}
        <span class="settings-dialog__hint" data-key-hint=${A}
          >${wt?ye:ke}</span
        >
      </span>
    </div>`}function je(A,N,B,ke){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${N}</span>
      <span class="settings-dialog__controls">
        <label class="settings-dialog__check">
          <input
            type="checkbox"
            data-key=${A}
            .checked=${s[A]===Vo}
            @change=${ye=>Y(A,ye.target.checked?Vo:cn)}
          />
          ${B}
        </label>
        <span class="settings-dialog__hint" data-key-hint=${A}>${ke}</span>
      </span>
    </div>`}function lt(A,N){let B=N?N.active:null;return Dn(B)?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${A==="claude"?B.email:Io({...B,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)"}function kt(A,N,B){let ke=T[B],ye=Object.hasOwn(b,A)?b[A]:cn,pt=B==="claude"?ua:Io,wt=!!ke?.accounts.some(yt=>yt.key===ye);return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${N}</span>
      <span class="settings-dialog__controls">
        <select
          aria-label=${N}
          data-account-key=${A}
          @change=${yt=>oe(A,String(yt.target.value))}
        >
          <option value=${cn} ?selected=${ye.length===0}>
            ${lt(B,ke)}
          </option>
          ${ye.length>0&&!wt?c`<option value=${ye} selected>
                ${ye} (목록에 없음)
              </option>`:""}
          ${ke?.accounts.map(yt=>c`<option value=${yt.key} ?selected=${yt.key===ye}>
                ${pt(yt)}
              </option>`)||""}
        </select>
        ${ke?"":c`<span class="settings-dialog__hint"
              >계정 목록을 불러올 수 없습니다</span
            >`}
      </span>
    </div>`}function se(){let A=m.warnings.join(", ");return m.state==="unusable"?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uD574\uC11D\uD560 \uC218 \uC5C6\uC5B4 \uC774 \uB808\uD3EC\uC758 \uB514\uC2A4\uD328\uCE58\uAC00 \uAC70\uBD80\uB429\uB2C8\uB2E4 \u2014 ${A} \xB7 \uACC4\uC815\uC744 \uB2E4\uC2DC \uACE0\uB974\uBA74 \uD574\uC18C\uB429\uB2C8\uB2E4`:m.warnings.length>0?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC5D0 \uC54C \uC218 \uC5C6\uB294 \uD0A4\uAC00 \uC788\uC2B5\uB2C8\uB2E4 \u2014 ${A}`:null}function ge(A,N,B,ke,ye,pt){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${N}-on)`}
        ></i>
        ${A}
      </span>
      <span class="settings-dialog__controls">
        ${qe(B,`${A} \uBAA8\uB378`,ke,Y,s,!1)}
        ${qe(ye,`${A} effort`,gi,Y,s,!1)}
        ${qe(pt,`${A} \uC18D\uB3C4`,Gu,Y,s,!1)}
      </span>
    </div>`}function Ge(A,N,B,ke){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${N}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${ke?" is-on":""}`}
          data-automation=${A}
          aria-pressed=${ke?"true":"false"}
          aria-label=${N}
          @click=${()=>st(A,!ke)}
        >
          ${ke?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${B}</span>
      </span>
    </div>`}function it(A,N,B,ke){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${N}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${A}>
          <button
            type="button"
            aria-label=${`${N} \uAC10\uC18C`}
            @click=${()=>ke(B-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${B}</span>
          <button
            type="button"
            aria-label=${`${N} \uC99D\uAC00`}
            @click=${()=>ke(B+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function ze(A,N){return c`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${A.rows.length>0?`\uBCC0\uACBD ${A.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${A.rows.map(B=>c`<div
            class="settings-dialog__preset-diff-row"
            data-diff-kind=${B.kind}
          >
            <span class="settings-dialog__preset-diff-label">${B.label}</span>
            <span class="settings-dialog__preset-diff-value"
              >${B.before??"\uAE30\uBCF8"}</span
            >
            <span class="settings-dialog__preset-diff-arrow">→</span>
            <span
              class="settings-dialog__preset-diff-value settings-dialog__preset-diff-after"
              >${B.after??(N==="quick_fix"?"\uAE30\uBCF8(\uD574\uC81C \u2192 \uC77C\uBC18 \uD504\uB85C\uD30C\uC77C)":"\uAE30\uBCF8(\uD574\uC81C)")}</span
            >
          </div>`)}
      ${A.ignored_keys.length>0?c`<div class="settings-dialog__preset-diff-note">
            ${A.ignored_keys.join(", ")}은(는)
            ${N==="quick_fix"?"quick_fix \uB808\uC778":"\uC804\uC5ED"} 적용이 쓰지 않는
            키라 무시됩니다
          </div>`:""}
    </div>`}function mt(){let A=j(),N={};for(let B of[...qn,...yo])N[B]=Object.prototype.hasOwnProperty.call(U,B)?U[B]:A&&typeof A[B]=="string"?A[B]:null;return N}function gt(){let A=mt(),N={};for(let B of yo)N[B]=A[B]??null;for(let B of["quick_fix_impl_dispatch","quick_fix_impl_runtime","quick_fix_impl_model","quick_fix_impl_effort","quick_fix_impl_speed"])N[B]=s[B]??null;return N}function nt(){let A=ne(),N=s.impl_runtime,B=s.impl_model,ke=H(),ye=j(),pt=mt(),wt=wo(A,re),yt=ko(A,void 0).filter(Ve=>Ve!==En),Tt=Fr(A,void 0,void 0),jt=hi(A,re,pt.orchestration_model||En).filter(Ve=>Ve!==En),Ut=L?(ke?.presets||[]).find(Ve=>Ve.id===L):null,Yt=Ut?Xu(Ue(),Dn(Ut.settings)?Ut.settings:{}):null,St={quick_fix_orchestration_model:wo(A,null),quick_fix_orchestration_effort:hi(A,null,null).filter(Ve=>Ve!==En),quick_fix_orchestration_speed:Qn,quick_fix_impl_dispatch:Qo,quick_fix_impl_runtime:Wf,quick_fix_impl_model:yt,quick_fix_impl_effort:Tt,quick_fix_impl_speed:Qn},sn=Ut?Zu(gt(),Dn(Ut.settings)?Ut.settings:{},St):null,Wt=R==="quick_fix"?sn:Yt,Pt=Oe(),Ft=Pt?null:"\uC11C\uBC84\uAC00 quick_fix \uB808\uC778\uC744 \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4",zt={...s,...pt},xe=ye&&typeof ye.slots=="number"?ye.slots:$a+1,E=ye&&typeof ye.serial_lane_count=="number"?ye.serial_lane_count:$a,he=me()?.supported===!0,Le=se(),ot=Ja("workflow_mode",Xo,s,me(),A);return c`
      ${u.length>0?c`<div class="settings-dialog__banner" role="alert">
            워크스페이스 기본값을 일부 읽지 못했습니다 —
            ${u.join(", ")}
          </div>`:""}
      ${Le?c`<div
            class="settings-dialog__banner"
            data-account-warning
            role="alert"
          >
            ${Le}
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
                .value=${Ar(L)}
                @change=${Ve=>{L=String(Ve.target.value),Pe()}}
              >
                <option value="" ?selected=${L===""}>
                  실행 프리셋…
                </option>
                ${(ke?.presets||[]).map(Ve=>c`<option
                      value=${Ve.id}
                      ?selected=${Ve.id===L}
                    >
                      ${Ve.name}
                    </option>`)}
              </select>
              <button
                type="button"
                class="settings-dialog__btn settings-dialog__btn--primary op-btn"
                data-preset-apply-global
                data-preset-apply-general
                ?disabled=${!Yt||Yt.rows.length===0}
                @click=${()=>Ze("general")}
              >
                일반에 적용
              </button>
              <button
                type="button"
                class="settings-dialog__btn op-btn"
                data-preset-apply-quick-fix
                title=${Ft||""}
                ?disabled=${!Pt||!sn||sn.rows.length===0}
                @click=${()=>Ze("quick_fix")}
              >
                quick_fix 레인에 적용
              </button>
              <input
                type="text"
                class="settings-dialog__preset-name"
                placeholder=${L?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                aria-label="프리셋 이름"
                .value=${Ar(P)}
                @input=${Ve=>{P=String(Ve.target.value)}}
              />
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-save
                title=${L?"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC774 \uD504\uB9AC\uC14B\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4 (\uD504\uB9AC\uC14B \u2192 \uC124\uC815 \uBC29\uD5A5\uC774 \uC544\uB2D8)":"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC0C8 \uD504\uB9AC\uC14B\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4"}
                @click=${et}
              >
                ${L?"\uD604\uC7AC \uC124\uC815\uC73C\uB85C \uB36E\uC5B4\uC4F0\uAE30":"\uC0C8 \uD504\uB9AC\uC14B \uC800\uC7A5"}
              </button>
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-delete
                ?disabled=${L.length===0}
                @click=${vt}
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
                aria-pressed=${String(R==="general")}
                @click=${()=>{R="general",Pe()}}
              >
                일반
              </button>
              <button
                type="button"
                data-preset-lane="quick_fix"
                aria-pressed=${String(R==="quick_fix")}
                @click=${()=>{R="quick_fix",Pe()}}
              >
                quick_fix
              </button>
            </div>
            ${Wt?ze(Wt,R):""}

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">오케스트레이션</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">런타임</span>
                <span class="settings-dialog__controls">
                  <select
                    aria-label="런타임"
                    data-key="orchestration_runtime_filter"
                    .value=${Ar(re||cn)}
                    @change=${Ve=>{let $t=String(Ve.target.value);X($t===cn?null:$t)}}
                  >
                    <option value=${cn} ?selected=${!re}>
                      전체
                    </option>
                    <option
                      value="claude"
                      ?selected=${re==="claude"}
                    >
                      claude
                    </option>
                    <option
                      value="codex"
                      ?selected=${re==="codex"}
                    >
                      codex
                    </option>
                  </select>
                  <span class="settings-dialog__hint"
                    >모델 목록을 좁힙니다</span
                  >
                </span>
              </div>
              ${Se("orchestration_model","\uBAA8\uB378",wt,J,pt)}
              ${Se("orchestration_effort","effort",jt,J,pt)}
              ${Se("orchestration_speed","\uC18D\uB3C4",Qn,J,pt)}
            </div>

            <div class="settings-dialog__group" data-exec-accounts-group>
              <div class="settings-dialog__group-title">실행 계정</div>
              ${kt("claude_account","Claude","claude")}
              ${kt("codex_account","Codex","codex")}
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">한도 대응</span>
                <span class="settings-dialog__controls">
                  <label class="settings-dialog__check">
                    <input
                      type="checkbox"
                      data-provider-auto-switch
                      .checked=${ye?.provider_auto_switch!==!1}
                      @change=${Ve=>st("provider_auto_switch",Ve.target.checked)}
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
                      ${ot.unset_label}
                    </button>
                    ${s.workflow_mode?"":c`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${Xo.map(Ve=>c`<button
                          type="button"
                          data-mode=${Ve}
                          aria-pressed=${String(s.workflow_mode===Ve)}
                          @click=${()=>Y("workflow_mode",Ve)}
                        >
                          ${Ve}
                        </button>`)}
                  </span>
                </span>
              </div>
              ${De("bdui_url","beads-ui \uC8FC\uC18C","http://\uD638\uC2A4\uD2B8:3000","\uC138\uC158\uC774 Worker \uB808\uC778 \uBC30\uCE58\uB97C \uBB3C\uC5B4\uBCFC \uB54C \uC4F0\uB294 \uC8FC\uC18C\uC785\uB2C8\uB2E4","http:// \uB610\uB294 https:// \uB85C \uC2DC\uC791\uD558\uB294 \uC8FC\uC18C\uB9CC \uC800\uC7A5\uB429\uB2C8\uB2E4 (\uACBD\uB85C \uC5C6\uC774)",Ku)}
              ${je("base_sync_accept_local_commits","base \uB3D9\uAE30\uD654","\uB85C\uCEEC base \uC0AC\uC6A9\uC790 \uCEE4\uBC0B \uC790\uB3D9 rebase+push","\uAEBC\uB450\uBA74 \uB85C\uCEEC base \uCCB4\uD06C\uC544\uC6C3\uC758 \uC0AC\uC6A9\uC790 \uCEE4\uBC0B\uC740 \uADF8\uB300\uB85C \uB0A8\uC2B5\uB2C8\uB2E4")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                리뷰 게이트
                <span class="settings-dialog__hint">모델 · effort · 속도</span>
              </div>
              ${ge("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",Zo,"spec_review_effort","spec_review_speed")}
              ${ge("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",mi,"plan_review_effort","plan_review_speed")}
              ${ge("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",Zo,"impl_review_effort","impl_review_speed")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${Se("impl_runtime","\uC704\uC784 \uB300\uC0C1",_i,Y,s)}
              ${Se("impl_model","\uBAA8\uB378",ko(A,N),Y,s)}
              ${Se("impl_effort","effort",Fr(A,N,B),Y,s)}
              ${Se("impl_speed","\uC18D\uB3C4",Qn,Y,s)}
            </div>

            <div
              class="settings-dialog__group"
              data-quick-fix-group
              title=${Ft||""}
            >
              <div class="settings-dialog__group-title">
                quick_fix 레인
                <span class="settings-dialog__hint"
                  >${"\uBE44\uC5B4 \uC788\uB294 \uAC12\uC740 \uC77C\uBC18 \uD504\uB85C\uD30C\uC77C\uB85C \uB5A8\uC5B4\uC9D1\uB2C8\uB2E4. \uC774\uC288 \uD540\uC774 \uC788\uC73C\uBA74 \uD540\uC774 \uC6B0\uC120\uD569\uB2C8\uB2E4."}</span
                >
              </div>
              ${Se("quick_fix_orchestration_model","\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",St.quick_fix_orchestration_model,J,pt,!Pt,zt,"quick_fix",Ft)}
              ${Se("quick_fix_orchestration_effort","\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",St.quick_fix_orchestration_effort,J,pt,!Pt,zt,"quick_fix",Ft)}
              ${Se("quick_fix_orchestration_speed","\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4",Qn,J,pt,!Pt,zt,"quick_fix",Ft)}
              ${Se("quick_fix_impl_dispatch","\uC2E4\uD589 \uBC29\uC2DD",Qo,Y,s,!Pt,zt,"quick_fix",Ft)}
              ${Se("quick_fix_impl_runtime","\uC704\uC784 \uB300\uC0C1",Wf,Y,s,!Pt,zt,"quick_fix",Ft)}
              ${Se("quick_fix_impl_model","\uBAA8\uB378",yt,Y,s,!Pt,zt,"quick_fix",Ft)}
              ${Se("quick_fix_impl_effort","effort",Tt,Y,s,!Pt,zt,"quick_fix",Ft)}
              ${Se("quick_fix_impl_speed","\uC18D\uB3C4",Qn,Y,s,!Pt,zt,"quick_fix",Ft)}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                자동화
                <span class="settings-dialog__hint"
                  >이 레포의 워커 큐가 스스로 진행하는 범위</span
                >
              </div>
              ${Ge("auto_advance","\uC790\uB3D9\uD654","\uC2AC\uB86F\uC774 \uBE44\uBA74 \uB300\uAE30 \uC55E \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4",ye?.auto_advance===!0)}
              ${Ge("auto_merge","\uBA38\uC9C0","\uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4",ye?.auto_merge===!0)}
              ${it("slots","\uB3D9\uC2DC \uC2E4\uD589",xe,Ve=>Ee(Ve))}
              ${it("serial-lane-count","\uC9C1\uB82C \uB808\uC778",E,Ve=>Je(Ve))}
            </div>
            ${Z()}
          `}
    `}function Pe(){V||ft(nt(),e)}return{load(){U={},R="general",l={},a={};let A=[ae(),Ie()];return ee||A.push(_t()),Promise.all(A).then(()=>{})},render:Pe,sessionDraft:()=>({...s}),destroy(){V=!0,ft(c``,e)}}}function Aa(e){return c`<svg
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
  </svg>`}function zf(){return Aa(Uo`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function Hf(){return Aa(Uo`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function Kf(){return Aa(Uo`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function Gf(){return Aa(Uo`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function Yf(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function Vf(e){let t=(Array.isArray(e)?e:[]).map(l=>l&&l.usage).filter(l=>l&&typeof l=="object"&&"providers"in l);if(t.length>0)return pn(di(t));let n={};for(let l of Vn)n[l]=0;let r=!1,o=0,i=0,s=0;for(let l of Array.isArray(e)?e:[]){let a=l&&l.usage;if(a&&typeof a=="object"){let u=!1;for(let d of Vn){let m=a[d];typeof m=="number"&&Number.isFinite(m)&&(n[d]+=m,r=!0,u=!0)}if(u){i+=1;let d=a.total_cost_usd;typeof d=="number"&&Number.isFinite(d)&&(o+=d,s+=1)}}}return i>0&&s===i&&(n.total_cost_usd=o),r?or(n):null}function zn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function dc(e,t){let n=zn(e?.counts)?e.counts:null,r=n?n[t]:null;return typeof r=="number"&&Number.isFinite(r)?r:0}function tk(e,t){if(!zn(t))return e;let n={...e};for(let[r,o]of Object.entries(t))o!==void 0&&(n[r]=o);return n}function nk(e){if(!zn(e)||!zn(e.execution_defaults)||!zn(e.runner_catalog)||!zn(e.session_defaults))return null;let t={...e.session_defaults};for(let s of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[s]=="string"&&e[s].length>0&&(t[s]=e[s]);let n=On({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),r=Nn(e.runner_catalog,n.orchestration_model.value??""),o=$o(n,e.runner_catalog),i=Br(n,r);return o===null&&i===null?null:{orchestration:o,worker:i}}function Qf(e,t){let n=t.notify||(K=>_e(K,"error",4e3)),r=document.createElement("div");r.className="mon2-deck__main",e.appendChild(r);let o=document.createElement("div");o.className="mon2-deck__panel",o.hidden=!0;let i=document.createElement("div");i.className="mon2-deck__panel-hd";let s=document.createElement("span");s.className="mon2-deck__panel-title";let l=document.createElement("button");l.type="button",l.className="mon2-deck__panel-close",l.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),l.textContent="\u2715",i.append(s,l);let a=document.createElement("div");a.className="mon2-deck__panel-body",o.append(i,a),e.appendChild(o);let u=null,d=null,m=null,b=new Map;function h(){let K=t.workspacesState?t.workspacesState():[];return Array.isArray(K)?K.filter(ae=>zn(ae)):[]}function k(K){return h().find(ae=>ae.root_dir===K)||null}function S(K){return tk(k(K),b.get(K))}function T(){for(let K of h()){let ae=b.get(K.root_dir);ae&&typeof ae.revision=="number"&&typeof K.revision=="number"&&K.revision>=ae.revision&&b.delete(K.root_dir)}}async function ee(K,ae,Q){let de=t.transport,Re=S(ae);if(!(!de||!zn(Re))){try{let be=await de(K,{...Q,root_dir:ae,expected_revision:Re.revision});if(zn(be?.queue)&&b.set(ae,be.queue),be&&be.conflict){let Ie=zn(be.queue)&&typeof be.queue.revision=="number"?be.queue.revision:S(ae)?.revision;be=await de(K,{...Q,root_dir:ae,expected_revision:Ie}),zn(be?.queue)&&b.set(ae,be.queue)}}catch(be){n(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${be instanceof Error?be.message:String(be)}`)}te()}}function re(K){u!==K&&(u=K,t.onFocusChange?.(u),te())}function U(K){re(u===K?null:K)}function L(K){if(d===K){P();return}R(),d=K;let ae=k(K);s.textContent=`${ae?.name||K} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,o.hidden=!1,m=xa(a,{root_dir:K,queue:()=>S(K),transport:t.transport,implPresetStore:t.implPresetStore,notify:n,onQueueAdopt:Q=>{b.set(K,Q),te()}}),m.load(),te()}function R(){m?.destroy(),m=null}function P(K){R(),d=null,o.hidden=!0,s.textContent="",K!==!0&&te()}let q=()=>P();l.addEventListener("click",q);function W(K){K.key==="Escape"&&u!==null&&re(null)}document.addEventListener("keydown",W);function F(K,ae){let Q=Math.max(ae,K,1);return c`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${ae}\uAC1C \uC911 ${K}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:Q},(de,Re)=>Re<K?c`<i class="mon2-deck__slot is-run"></i>`:c`<i class="mon2-deck__slot"></i>`)}
    </span>`}function D(K){let ae=K.auto_advance===!0,Q=K.auto_merge===!0;return c`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${ae?" is-on":""}`}
        data-act="auto"
        aria-pressed=${ae?"true":"false"}
        aria-label=${`${K.name} \uC790\uB3D9\uD654`}
        title=${ae?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${ae?Hf():zf()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${Q?" is-on":""}`}
        data-act="merge"
        aria-pressed=${Q?"true":"false"}
        aria-label=${`${K.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${Q?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${Kf()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__gear${d===K.root_dir?" is-on":""}`}
        data-act="gear"
        aria-expanded=${d===K.root_dir?"true":"false"}
        aria-label=${`${K.name} \uC2E4\uD589 \uC124\uC815`}
        title="이 레포의 실행 설정"
      >
        ${Gf()}
      </button>`}function V(K){let ae=nk(K);return ae?c`<div class="mon2-deck__chips">
      ${ae.orchestration?c`<span class="mon2-deck__chip" title=${ae.orchestration.title}
            >오케 ${ae.orchestration.text}</span
          >`:""}
      ${ae.worker?c`<span class="mon2-deck__chip" title=${ae.worker.title}
            >워커 ${ae.worker.text}</span
          >`:""}
    </div>`:""}function j(K){let ae=[];for(let[Q,de]of[["queue","\uB300\uAE30"],["pr_wait","PR"],["session_active","\uC138\uC158"]]){let Re=dc(K,Q);Re>0&&ae.push(`${de} ${Re}`)}return ae.join(" \xB7 ")}function ne(K){let ae=dc(K,"running"),Q=typeof K.slots=="number"?K.slots:1;return c`<div
      class=${`mon2-deck__tile${u===K.root_dir?" is-focus":""}`}
      role="button"
      tabindex="0"
      data-root-dir=${K.root_dir}
      aria-pressed=${u===K.root_dir?"true":"false"}
      title="클릭하면 이 레포만 선명하게 봅니다 (Esc로 해제)"
    >
      <div class="mon2-deck__tile-hd">
        <span class="mon2-deck__name" title=${K.root_dir}>${K.name}</span>
        <span
          class="mon2-deck__load"
          title=${`\uC2AC\uB86F ${Q}\uAC1C \uC911 ${ae}\uAC1C \uC2E4\uD589 \uC911`}
        >
          <span class="mon2-deck__load-n">${ae}/${Q}</span>
          ${F(ae,Q)}
        </span>
        <button
          type="button"
          class="mon2-deck__worker"
          data-act="worker"
          aria-label=${`${K.name} Worker \uD0ED\uC73C\uB85C \uC774\uB3D9`}
          title="이 레포의 Worker 탭으로 이동"
        >
          ↗
        </button>
      </div>
      <div class="mon2-deck__tile-ft">
        <div class="mon2-deck__ops">${D(K)}</div>
        <span class="mon2-deck__counts">${j(K)}</span>
        ${V(K)}
      </div>
    </div>`}function me(K){let ae=t.doneItems?t.doneItems():[],Q=t.rangeLabel?t.rangeLabel():"",de=Vf(Array.isArray(ae)?ae:[]),Re=be=>K.reduce((Ie,Ye)=>Ie+dc(Ye,be),0);return c`<div class="mon2-deck__bar">
      <span
        class="mon2-deck__total-counts"
        title=${`visible \uB808\uD3EC ${K.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${Q}`}
        >실행 ${Re("running")} · 대기 ${Re("queue")} · PR
        ${Re("pr_wait")}${Re("session_active")>0?` \xB7 \uC138\uC158 ${Re("session_active")}`:""}
        · ${Q} 완료
        ${Array.isArray(ae)?ae.length:0}</span
      >
      ${de===null?"":c`<span class="mon2-deck__total-tokens">
            ${typeof de=="string"?c`<span
                  class="mon2-deck__tok"
                  title=${Yf(Q)}
                  >${de}</span
                >`:de.map(be=>c`<span
                      class="mon2-deck__tok"
                      data-provider=${be.provider}
                      title=${be.tooltip}
                      >${be.label}</span
                    >`)}
          </span>`}
    </div>`}function Oe(){let K=h();return K.length===0?"":c`${me(K)}
      <div class="mon2-deck__strip">
        ${K.map(ae=>ne(ae))}
      </div>`}function H(){u!==null&&!k(u)&&(u=null,t.onFocusChange?.(null))}function te(){T(),H(),d!==null&&!k(d)&&P(!0),ft(Oe(),r),m?.render()}function ce(K){let ae=K.target;if(!ae||typeof ae.closest!="function")return;let Q=ae.closest("[data-root-dir]");if(!Q)return;let de=Q.getAttribute("data-root-dir")||"",Re=ae.closest("[data-act]")?.getAttribute("data-act");if(Re==="worker"){t.gotoWorkerTab?.(de);return}if(Re==="auto"){ee("worker-automation-toggle",de,{on:S(de)?.auto_advance!==!0});return}if(Re==="merge"){ee("worker-merge-auto-toggle",de,{on:S(de)?.auto_merge!==!0});return}if(Re==="gear"){L(de);return}U(de)}function Te(K){if(K.key!=="Enter"&&K.key!==" ")return;let ae=K.target;if(!ae||typeof ae.closest!="function")return;let Q=ae.closest('[data-root-dir][role="button"]');!Q||Q!==ae||(K.preventDefault(),U(Q.getAttribute("data-root-dir")||""))}return r.addEventListener("click",ce),r.addEventListener("keydown",Te),{render:te,focusRoot:()=>u,panelRoot:()=>d,destroy(){document.removeEventListener("keydown",W),r.removeEventListener("click",ce),r.removeEventListener("keydown",Te),l.removeEventListener("click",q),R(),ft(c``,r),e.replaceChildren()}}}var rk=1e4,Jf="bdui.monitor.done-range",e_="bdui.monitor.running_sort",t_="bdui.monitor.candidate_sort",n_="beads-ui.monitor.candidate-filter",r_="beads-ui.monitor.sections";function ok(){try{let e=window.localStorage.getItem(n_);if(!e)return{...Eo};let t=JSON.parse(e);return!t||typeof t!="object"?{...Eo}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:Eo.show_blocked,readiness:fs.some(n=>n.value===t.readiness)?t.readiness:"all",routes:Yr(t.routes)}}catch{return{...Eo}}}function pc(e){try{window.localStorage.setItem(n_,JSON.stringify({show_blocked:e.show_blocked,readiness:e.readiness,routes:e.routes}))}catch{}}function sk(){try{let e=window.localStorage.getItem(t_);return ps.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function ik(e){try{window.localStorage.setItem(t_,e)}catch{}}function ak(){try{let e=window.localStorage.getItem(r_);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function lk(e){try{window.localStorage.setItem(r_,JSON.stringify(e))}catch{}}function ck(){try{let e=window.localStorage.getItem(Jf);return e===null?"today":Kn(e)}catch{return"today"}}function uk(e){try{window.localStorage.setItem(Jf,e)}catch{}}function dk(){try{return window.localStorage.getItem(e_)==="repo"?"repo":"started"}catch{return"started"}}function pk(e){try{window.localStorage.setItem(e_,e)}catch{}}var o_="tab:monitor:pipeline",fk=1e3,Xf=[{lane:"runnable",pane:"candidate",title:"\uD6C4\uBCF4",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589 \uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],_k=["queue","runnable","done"],Zf="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function mk(e){return e>=1&&e<=Zf.length?Zf[e-1]:`(${e})`}function s_(e,t){let n=Bt("views:monitor"),r=t.gotoIssue,o=t.pipelineStore,i=t.transport,s=t.getWorkspacePath,l=t.openDoc,a=t.switchWorkspace,u=t.router,d=t.now||(()=>Date.now()),m=t.confirm||(p=>typeof globalThis.confirm!="function"||globalThis.confirm(p)),b=ck(),h=dk(),k=ok(),S=sk(),T=ak(),ee=_a("beads-ui.monitor.lane-collapsed"),re=!1,U=null,L=null,R=null,P=null,q=null,W=null,F=ho(()=>B()),D=null,V=null,j=null,ne=null;function me(p){return ne===null&&(ne=Y()),lp(p,ne)}function Oe(p,f){H(),!(f<=0)&&(V={lane_id:p,corrected:f},j=setTimeout(()=>{j=null,V=null,B()},rk))}function H(){j!==null&&(clearTimeout(j),j=null),V=null}function te(){let p=ro.find(f=>f.value===b);return p?p.label:""}let ce=document.createElement("div");ce.className="mon",e.appendChild(ce);let Te=document.createElement("div");Te.className="worker-drawer-overlay",Te.hidden=!0;let K=document.createElement("div");K.className="worker-drawer-overlay__backdrop";let ae=document.createElement("div");ae.className="worker-drawer-host mon2-drawer",Te.append(K,ae),e.appendChild(Te);let Q=$r(null,null),de=new Map,Re=new Map,be=new Set,Ie=null,Ye=null,_t=null,G=Oo(ae,{transport:i,sessionLogStore:t.sessionLogStore,onClose:()=>{L=null,Te.hidden=!0,B()}}),pe=ga({transport:i,console_el:ce,getLanes:()=>Q,getWorkspaces:()=>o&&o.get?o.get():null,getCrossLanes:Yt,reproject:p=>({lanes:N(p),raw_lanes:p}),onCorrection:Oe,showToast:_e,requestRender:()=>B(),adoptQueue:(p,f)=>{Re.set(p,f)},onDragBegin:()=>{R=null},candidate_drop:!0}),{applyDrop:oe,dropModel:Y,runPlanned:we,sendQueueCas:fe}=pe;async function Ce(p,f,x,_,g=!0){if(!i||!x)return null;let O=await i(p,{...f,root_dir:x,expected_revision:_});if(O&&O.conflict&&g){O.queue&&Re.set(x,O.queue);let z=O.queue&&typeof O.queue.revision=="number"?O.queue.revision:_;O=await i(p,{...f,root_dir:x,expected_revision:z})}return O&&O.queue&&x&&Re.set(x,O.queue),O}function Ne(p){let f=Re.get(p);if(f)return f;let x=o&&o.get?o.get():null;return(Array.isArray(x)?x:[]).find(_=>_?.root_dir===p)||{}}function Qe(p,f){return Ne(p)?.merge_queue?.find(_=>_.bead_id===f)?.continuation_action}async function Fe(p,f,x,_){let g=await Ce(p,f,x,_),O=Re.get(x)?.revision??g?.queue?.revision??_;return br(g,(z,ue)=>Ce(p,{...f,continuation:z,decision_token:ue},x,O,!1),{refresh:z=>Ce(p,f,x,z?.queue?.revision??Re.get(x)?.revision??O,!1)})}async function J(p,f,x,_){let g=await br({continuation_mismatch:_},(z,ue)=>Ce("worker-merge-queue-add",{bead_id:f,continuation:z,decision_token:ue},p,x,!1)),O=g?.queue?.merge_queue?.find(z=>z.bead_id===f)?.continuation_action;g?.applied!==!0&&O?.continuation===null&&O.mismatch&&await J(p,f,g.queue.revision,O.mismatch)}async function X(p,f,x){let _=await Ce("worker-discard",p,f,x);if(_&&_.discarded===!0){_e(Oi(_),"success",5e3);return}if(_&&_.reason){_e(`\uD3D0\uAE30 \uC2E4\uD328: ${_.reason}`,"error");return}if(_&&_.accepted&&_.pending==="merged_revert"){_e("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(_&&_.accepted){_e(`\uD3D0\uAE30 \uC9C4\uD589: ${_.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}_&&!_.conflict&&_e("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function Ee(p,f,x,_){let g=await Ce("worker-discard-abandon",p,f,x);if(g&&g.abandoned===!0){_e(Ri(_),"success",5e3);return}if(g&&g.reason){_e(`\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: ${g.reason}`,"error");return}g&&!g.conflict&&_e("\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: unknown","error")}async function Je(p,f,x){return!i||!x?null:await i(p,{...f,root_dir:x})}async function st(p,f,x){if(!be.has(p)){be.add(p),B();try{let _=await Ce("worker-resolve-in-session",{bead_id:p},f,x,!1);_?.session==="already_running"?_e(`\uC774\uBBF8 \uC5F4\uB824 \uC788\uC2B5\uB2C8\uB2E4 \xB7 ${_.tmux_window||"?"}`,"error"):_?.launched!==!0?_e(`\uC138\uC158 \uAE30\uB3D9 \uC2E4\uD328: ${_?.reason||"unknown"}`,"error"):_.mode!=="fork"&&_e(`\uC0C8 \uC138\uC158\uC73C\uB85C \uC2DC\uC791 (${_.fallback_reason||"unknown"})`,"success")}finally{be.delete(p),B()}}}async function Ue(){let p=new Map;for(let f of Q.pr_wait)p.has(f.root_dir)||p.set(f.root_dir,f.expected_revision);for(let[f,x]of p)await Ce("worker-merge-queue-add-all",{},f,x)}function et(p){let f=T[p];return!!(f&&f.runnable===!0)}function vt(p){let f={...T[p]||{}};f.runnable=!f.runnable,T={...T,[p]:f},lk(T),B()}function ut(p){ee.toggle(p),B()}function Ze(p){ee.toggleArea(p),B()}function dt(p){let f=p.dependency_chips||null,x=p.overlap_chips||[],_=p.scope_state==="missing",g=p.armed_lane_chip;return!f&&x.length===0&&!_&&!g?null:{...f||{},...x.length>0?{overlaps:x}:{},..._?{scope_missing:!0}:{},...g?{armed_lane:g}:{}}}function Zt(p){return qi(p,f=>F.isOpen({bead_id:p.id,chip_key:f}))}function $(p){let f=dt(p),x=Zt(p);return f||x?{...p,...f?{dependency_chips:f}:{},...x?{chip_popover:x}:{}}:p}function Z(p){let f=et(p.root_dir);return c`<header class="mon2-sec__hd">
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
    </header>`}function qe(p,f){return c`<div
      class="mon2-item"
      data-bead-id=${p.id}
      data-drag-kind="candidate"
      data-root-dir=${p.root_dir}
    >
      ${f}
    </div>`}function Se(p){if(R!==p.id)return null;let f=Q.queue_groups.find(O=>O.root_dir===p.root_dir),x=p.place_lanes||[],_=Q.cross_lanes_revision!==null,g=[{id:"parallel",label:"\uBCD1\uB82C",count:p.place_index??0}];for(let O of Q.chain_lanes)g.push({id:`lane:${O.lane_id}`,label:`\uC5F0\uACB0 ${O.number} (${O.draft?"draft":"\uD655\uC815"}) \uB05D\uC5D0`,count:O.rows.length,group:"\uC5F0\uACB0 \uB808\uC778",disabled:!_});g.push({id:"new-lane",label:"+ \uC0C8 \uC5F0\uACB0 \uB808\uC778",group:"\uC5F0\uACB0 \uB808\uC778",disabled:!_,title:_?"\uC774 \uC774\uC288\uB9CC \uB4E0 draft \uB808\uC778\uC744 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"});for(let O of x)g.push({id:`serial:${O.id}`,label:`\uC9C1\uB82C ${Number(O.id.slice(1))}`,count:O.length,group:`${f?f.name:""} \uC9C1\uB82C`});return{bead_id:p.id,lanes:g}}function De(p){return qe(p,c`${ml($(p),Se(p),{exec_chips_mode:"pinned_only",onOpenDoc:l?(f,x)=>l(x,p.root_dir):void 0})}`)}function je(){return Q.runnable_flat?c`<div class="mon2-flat" data-drop="candidate">
        ${Q.runnable.map(p=>De(p))}
      </div>`:c`${Q.runnable_sections.map(p=>{let f=et(p.root_dir);return c`<section
        class="mon2-sec${f?" is-collapsed":""}"
        data-root-dir=${p.root_dir}
        data-section="runnable"
      >
        ${Z({root_dir:p.root_dir,name:p.name,count:p.items.length})}
        ${f?"":c`<div
              class="mon2-sec__body"
              data-lane="candidate"
              data-drop="candidate"
            >
              ${p.items.map(x=>De(x))}
            </div>`}
      </section>`})}`}function lt(p,f){return c`<div
      class="mon2-item"
      data-bead-id=${p.id}
      data-drag-kind="parallel"
      data-root-dir=${p.root_dir}
      data-row-index=${f}
      data-queue-index=${String(p.queue_index??0)}
    >
      ${jn($(p),{actions:So(p,{nudgeable:!0})})}
    </div>`}function kt(p,f,x,_){return c`<div
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
        >${mk(f.seq)}</span
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
      ${_.includes(f.id)?c`<span
            class="mon2-crow__mismatch"
            title="이미 실행된 뒤 의존이 바뀌었습니다 — 이 행은 움직일 수 없어 교정하지 않습니다"
            >⚠ 의존 순서와 다름</span
          >`:""}
      <span class="mon2-crow__where" title=${f.location_title}
        >${f.location_label}</span
      >
      ${Kr(f.route?{route:f.route,route_source:f.route_source??void 0}:null)}${f.exec_chips?Hr(f.exec_chips):""}
      ${ul(f.added_at)}
      ${dl({id:f.id,...typeof f.added_at=="number"?{added_at:f.added_at}:{}})}
      <button
        type="button"
        class="mon2-crow__detach"
        data-bead-id=${f.id}
        title="연결에서 빼고 앞뒤를 이어 붙입니다"
        aria-label="연결에서 빼기"
      >
        ✕
      </button>
    </div>`}function se(p){let f=Q.cross_lanes_revision!==null,x=me(p.lane_id),_=x?.held===!0,g=x?.cycle===!0,O=x?x.mismatched:[],z=V&&V.lane_id===p.lane_id?V.corrected:0;return c`<div class="mon2-clane" data-lane-id=${p.lane_id}>
      <header class="mon2-clane__hd">
        <span class="mon2-clane__name">${p.label}</span>
        <span class="mon2-clane__count">${p.rows.length}</span>
        <span class="mon2-clane__badge mon2-clane__badge--${p.state}"
          >${p.badge}</span
        >
        ${z>0?c`<span
              class="mon2-clane__corrected"
              title="기존 blocks 의존이 드롭 순서를 이깁니다 — 그 순서로 다시 놓았습니다"
              >의존에 맞춰 ${z}건 자동 교정</span
            >`:""}
        ${g?c`<span
              class="mon2-clane__cycle"
              title="멤버들의 blocks 의존이 순환합니다 — 어느 순서도 의존을 만족시키지 못합니다"
              >⛔ 의존 사이클 — 자동 교정 불가</span
            >`:""}
        ${_?c`<span
              class="mon2-clane__hold"
              title="멤버 한 명의 의존 자료가 이 스냅샷에 아직 없습니다 — 다음 스냅샷이 채우면 교정합니다"
              >${Ki}</span
            >`:""}
        ${p.draft?c`<button
              type="button"
              class="mon2-clane__confirm"
              data-lane-id=${p.lane_id}
              ?disabled=${!f||!p.can_confirm||_}
              title=${_?Ki:p.can_confirm?"\uC778\uC811 \uC758\uC874\uC744 \uAC78\uACE0 \uBBF8\uC801\uC7AC \uBA64\uBC84\uB97C \uAC01\uC790 \uB808\uD3EC \uBCD1\uB82C \uD050 \uB05D\uC5D0 \uC62C\uB9BD\uB2C8\uB2E4":"\uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD655\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4"}
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
            </div>`:p.rows.map((ue,Ae)=>kt(p,ue,Ae,O))}
      </div>
    </div>`}function ge(p,f,x){return c`<div
      class="mon2-item"
      data-bead-id=${f.id}
      data-drag-kind="repo-serial"
      data-root-dir=${f.root_dir}
      data-lane-id=${p.id}
      data-row-index=${x}
      data-queue-index=${String(f.queue_index??0)}
    >
      ${jn($(f),{actions:So(f)})}
    </div>`}function Ge(p){if(p.length===0)return"";let f=p.length-1;return`${p[0].id} \uC810\uC720${f>0?` +${f}`:""}`}function it(p){return c`<div
      class="mon2-item mon2-item--ghost"
      data-bead-id=${p.id}
    >
      ${jn({id:p.id,title:p.title,lane:"running",draggable:!1,ghost:!0,badges:[p.badge]})}
    </div>`}function ze(p,f){let x=f.occupants,_=f.cross_wait_peers||[];return{id:f.id,pane_id:"",title:`${p.name} \xB7 \uC9C1\uB82C ${f.index+1}`,rows:[...x.map(g=>it(g)),...f.items.map((g,O)=>ge(f,g,O))],count:f.items.length,empty:f.empty===!0,...x.length>0?{badge:c`<span
              class="mon2-lane__occupant"
              title=${x.map(g=>`${g.id} \u2014 ${g.badge}`).join(`
`)}
              >${Ge(x)}</span
            >`,held:!0}:{},cycle:f.cycle,header_control:c`<button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${p.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>`,..._.length>0?{after:c`${_.map(g=>c`<div class="mon2-lane__cross-wait">
                  ⚠ 상호 정지 — ${g.workspace_name}·${g.lane}과 교차 대기
                </div>`)}`}:{}}}function mt(){let p=Q.cross_lanes_revision!==null,f=Q.chain_lanes.some(x=>x.draft&&x.rows.length===0);return Ni({parallel:{rows:Q.parallel_rows.map((x,_)=>lt(x,_)),count:Q.parallel_rows.length,collapsed:ee.isAreaCollapsed("parallel"),drop:{drop:"parallel"}},serial:{lanes:Q.queue_groups.flatMap(x=>x.sublanes.serial.map(_=>({...ze(x,_),drop:{drop:"repo-serial",root_dir:x.root_dir,lane_id:_.id,lane_length:String(_.raw_length)}}))),collapsed:ee.isAreaCollapsed("serial"),extra_panes:Q.chain_lanes.map(x=>se(x)),header_control:c`<button
          type="button"
          class="mon2-newlane"
          ?disabled=${f||!p}
          title=${p?f?"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC774 \uC774\uBBF8 \uC788\uC2B5\uB2C8\uB2E4":"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC744 \uD558\uB098 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
        >
          + 연결 레인
        </button>`,...Q.cross_lanes_unreadable?{notice:c`<div class="mon2-clane__unreadable">
                연결 레인 저장소를 읽을 수 없음
              </div>`}:{}}})}function gt(p){return c`<div class="worker-rungrid">
      ${Q.running.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:Q.running.map(f=>uc({bead_id:f.id,attempt_id:f.attempt_id||"",title:f.title,runner:f.runner??null,model:f.model??null,effort:f.effort??null,speed:f.speed??null,started_at:f.started_at??null,kind:f.kind,...f.kind==="session"?{updated_at:f.updated_at,session_refs:f.session_refs||[]}:{},workflow:f.workflow||null,resumed_from:f.resumed_from??null,continuation_mode:f.continuation_mode??null,paused:f.run_state==="paused",failed:f.run_state==="failed",parked:f.run_state==="parked",retry_wait:f.run_state==="retry_wait",waiting:f.run_state==="waiting",wait:f.wait||null,provider_hold:f.run_state==="provider_hold",hold:f.hold?{...f.hold,open:q===f.attempt_id}:null,retry:f.retry||null,status:f.status,status_label:f.run_state==="failed"?"\uC2E4\uD328":f.run_state==="parked"?"\uC138\uC158 \uB300\uAE30":f.run_state==="retry_wait"?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":f.run_state==="waiting"?"\uC120\uD589 \uB300\uAE30":f.run_state==="provider_hold"?"\uACF5\uAE09\uC790 \uBCF4\uB958":void 0,can_pause:f.can_pause!==!1,exec_chips:f.exec_chips||null,usage:f.usage||null,chip_popover:Zt(f),discard:f.discard,failure:f.failure?{...f.failure,open:P===f.attempt_id}:null,...Do(f.id,{discard:f.discard,parked:f.run_state==="parked"},be.has(f.id))},p,L,{monitor:{repo:f.workspace_name,root_dir:f.root_dir,serial_lane_id:f.serial_lane_id,cross_lane_chip:f.cross_lane_chip||null,last_activity:f.last_activity||null,legs:f.legs||[],dependency_chips:dt(f)}}))}
    </div>`}function nt(p){let f={runnable:Q.runnable,queue:Q.queue,running:Q.running,pr_wait:Q.pr_wait,done:Q.done},x=_=>{let g=f[_.lane],O=_.lane==="runnable"?Q.runnable_flat?g.length>0?je():void 0:Q.runnable_sections.length>0?je():void 0:_.lane==="queue"?Q.queue_groups.length>0||Q.chain_lanes.length>0||Q.parallel_rows.length>0||Q.cross_lanes_unreadable?mt():void 0:_.lane==="running"?gt(p):g.length>0?c`${g.map(z=>jn($(z)))}`:void 0;return Xn({id:`monitor-${_.lane}`,lane:_.pane,title:_.title,items:g,count:g.length,src:_.lane==="runnable",empty:_.empty,body:O,live:_.lane==="running"&&g.length>0,collapsible:!0,collapsed:ee.isCollapsed(_.pane),controls:_.lane==="runnable"?Pe():void 0,header_control:A(_.lane,g.length)})};if(re){let _=_k.map(g=>Xf.find(O=>O.lane===g)).filter(g=>g!==void 0);return c`<div class="mon2-deck"></div>
        <div class="worker-lanes-host">
          <div class="worker-lanes worker-lanes--mobile mon2-lanes">
            ${ji({live:Q.running.length>0,running_body:Q.running.length>0?gt(p):"",pr_wait_rows:Q.pr_wait.map(g=>jn($(g))),count:Q.running.length+Q.pr_wait.length})}
            ${_.map(g=>x(g))}
          </div>
        </div>
        ${Lo(W?.draft||null,W?Ne(W.root_dir):{})}`}return c`<div class="mon2-deck"></div>
      <div class="worker-lanes-host">
        <div class="worker-lanes mon2-lanes">
          ${Xf.map(_=>x(_))}
        </div>
      </div>
      ${Lo(W?.draft||null,W?Ne(W.root_dir):{})}`}function Pe(){return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시">
        <input
          type="checkbox"
          class="mon-filter__blocked"
          .checked=${k.show_blocked}
        />
        🔒
        blocked${Q.runnable_hidden.blocked>0?` ${Q.runnable_hidden.blocked}`:""}
      </label>
      <div
        class="worker-filter__readiness"
        role="group"
        aria-label="준비도 필터"
      >
        ${fs.map(p=>c`<button
              type="button"
              class="mon-filter__readiness worker-filter__chip${k.readiness===p.value?" is-active":""}"
              data-readiness=${p.value}
              aria-pressed=${k.readiness===p.value?"true":"false"}
            >
              ${p.label}
            </button>`)}
        ${Q.runnable_hidden.readiness>0?c`<span class="worker-filter__hidden"
              >숨김 ${Q.runnable_hidden.readiness}</span
            >`:""}
      </div>
      <div class="worker-filter__routes" role="group" aria-label="route 필터">
        ${_s.map(p=>c`<button
              type="button"
              class="mon-filter__route worker-filter__chip${k.routes.includes(p.value)?" is-active":""}"
              data-route=${p.value}
              aria-pressed=${k.routes.includes(p.value)?"true":"false"}
            >
              ${p.label}
            </button>`)}
        ${Q.runnable_hidden.route>0?c`<span class="worker-filter__hidden"
              >숨김 ${Q.runnable_hidden.route}</span
            >`:""}
      </div>
    </div>`}function A(p,f){return p==="runnable"?c`<select
        class="mon-candidate-sort worker-sort"
        aria-label="후보 정렬"
        title="후보 정렬"
        .value=${S}
      >
        ${ps.map(x=>c`<option
              value=${x.value}
              ?selected=${S===x.value}
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
        .value=${b}
      >
        ${ro.map(x=>c`<option value=${x.value} ?selected=${b===x.value}>
              ${x.label}
            </option>`)}
      </select>`:""}function N(p){let f=o&&o.get?o.get():null,x=o&&o.getWorkspacesState?o.getWorkspacesState():[],_=p===void 0?o&&o.crossLanes?o.crossLanes():void 0:p,g={done_since:Nr(b,d()),running_sort:h,candidate_filter:k,candidate_sort:S};return _!==void 0&&(g.cross_lanes=_),$r(f,x,g)}function B(){let p=d();Q=N(),ne=null,de=new Map;for(let f of[...Q.runnable,...Q.queue,...Q.running,...Q.pr_wait,...Q.done])!f.non_occupying&&!de.has(f.id)&&de.set(f.id,f);ft(nt(p),ce),va(ce),ye()?.render(),ke(),pt()}function ke(){let p=new Map;for(let f of Q.queue_groups)p.set(f.root_dir,f.auto_advance);for(let f of Array.from(ce.querySelectorAll(".worker-wait__area--parallel .worker-mini__repo"))){let x=f.closest(".mon2-item")?.getAttribute("data-root-dir")||"",_=p.get(x);typeof _=="boolean"&&f.setAttribute("title",`${f.textContent||""} \xB7 ${_?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function ye(){if(_t)return _t;let p=ce.querySelector(".mon2-deck");return p?(_t=Qf(p,{workspacesState:()=>o&&o.getWorkspacesState?o.getWorkspacesState():[],doneItems:()=>Q.done,rangeLabel:te,transport:i,implPresetStore:t.execPresetStore,gotoWorkerTab:yt,onFocusChange:f=>{D=f,pt()}}),_t):null}function pt(){ce.classList.toggle("has-focus",D!==null);for(let p of Array.from(ce.querySelectorAll(".mon2-sec[data-root-dir]")))p.classList.toggle("is-focus",D!==null&&p.getAttribute("data-root-dir")===D);for(let p of Array.from(ce.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let f=de.get(p.getAttribute("data-bead-id")||"");p.classList.toggle("is-focus",D!==null&&!!f&&f.root_dir===D)}for(let p of Array.from(ce.querySelectorAll(".mon2-crow[data-root-dir]")))p.classList.toggle("is-focus",D!==null&&p.getAttribute("data-root-dir")===D)}function wt(p,f){let x=s?s():void 0;if(!f||!x||f===x||!a){r(p);return}a(f).then(()=>{r(p)}).catch(_=>{n("workspace switch for %s failed: %o",f,_)})}function yt(p){if(!p)return;let f=s?s():void 0,x=()=>{try{u?.gotoView("worker")}catch(_){n("gotoView(worker) failed: %o",_)}};if(!a||f&&f===p){x();return}a(p).then(x).catch(_=>{n("workspace switch for %s failed: %o",p,_),_e("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function Tt(p){yn(p).then(f=>{_e(f?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",f?"success":"error",1400)})}function jt(p){let f=de.get(p)||null;return{item:f,root_dir:f?f.root_dir:"",revision:f?f.expected_revision:0}}async function Ut(p,f,x){if(p!=="dep-add")return;let _=Q.chain_lanes.find(g=>g.rows.some(O=>O.id===f));!_||!_.rows.some(g=>g.id===x)||await we(g=>fp(_.lane_id,g),"",[{type:p,a:f,b:x}])}function Yt(){return(o&&o.crossLanes?o.crossLanes():null)??null}async function St(p,f){if(p==="run"){await Wt(f);return}if(p==="stop"){await Pt(f);return}if(p==="create"){await we(x=>Cl(null,x),"");return}if(p==="remove"){let x=mp(f,Y());if(x!==null&&!m(x))return;await we(_=>_p(f,_),"");return}await we(x=>p==="confirm"?dp(f,x):pp(f,x),"")}function sn(p){let f=new Map;for(let x of p.rows){let _=Q.owner_of[x.id]||x.root_dir;typeof _!="string"||_.length===0||f.set(_,[...f.get(_)||[],x.id])}return f}async function Wt(p){let f=Q.chain_lanes.find(O=>O.lane_id===p);if(!f||Q.cross_lanes_revision===null){B();return}H();let x=new Map,_=new Map,g=sn(f);for(let O of f.rows){if(O.fixed||typeof O.queue_index=="number")continue;let z=Q.owner_of[O.id]||O.root_dir;if(typeof z!="string"||z.length===0){_e(`${O.id}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC801\uC7AC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`,"error"),B();return}let ue=_.get(z)??0;if(await fe("worker-queue-place",{bead_id:O.id,lane:"parallel",index:(Q.parallel_raw_length[z]??0)+ue},z,x,{bead_id:O.id})===null){B();return}_.set(z,ue+1)}for(let[O,z]of g)if(await fe("worker-queue-arm",{bead_ids:z,lane_id:p},O,x,{bead_id:z[0]})===null){_e("\uC77C\uBD80 \uB808\uD3EC\uC5D0\uC11C \uC9C4\uD589\uC744 \uCF1C\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589]\uC73C\uB85C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694","error"),B();return}B()}async function Pt(p){let f=Q.chain_lanes.find(_=>_.lane_id===p);if(!f||Q.cross_lanes_revision===null){B();return}H();let x=new Map;for(let[_,g]of sn(f))if(await fe("worker-queue-disarm",{lane_id:p},_,x,{bead_id:g[0]})===null)break;B()}async function Ft(p,f){if(!i||!p||f.length===0){B();return}let x=await i("worker-queue-start-now",{bead_id:p,root_dir:f});x&&x.queue&&Re.set(f,x.queue),x&&x.ok===!1&&_e(`\uC9C0\uAE08 \uC2DC\uC791 \uAC70\uBD80: ${x.reason==="not_waiting"?"\uC774 \uC774\uC288\uB294 \uB354 \uC774\uC0C1 \uB300\uAE30 \uB808\uC778\uC5D0 \uC5C6\uC2B5\uB2C8\uB2E4":x.reason||""}`,"error",2800),B()}async function zt(p,f){let{root_dir:x,revision:_}=jt(p);if(x.length===0){B();return}await fe("worker-queue-disarm",{bead_ids:[p],lane_id:f},x,new Map([[x,_]]),{bead_id:p}),B()}async function xe(p,f){let x=de.get(p);if(!x){B();return}let _={kind:"candidate",bead_id:p,root_dir:x.root_dir};if(f==="new-lane"){await we(g=>Cl({bead_id:p,root_dir:x.root_dir},g),p);return}if(f.startsWith("lane:")){let g=f.slice(5);if(!Q.chain_lanes.find(z=>z.lane_id===g)){B();return}await we(z=>Yi(_,{kind:"chain",lane_id:g,marker_index:(z.cross_lanes.get(g)?.entries??[]).length},z),p);return}if(f.startsWith("serial:")){let g=f.slice(7),O=(x.place_lanes||[]).find(z=>z.id===g);await oe(_,{kind:"repo-serial",root_dir:x.root_dir,lane_id:g,index:O?O.index:0});return}await oe(_,{kind:"parallel",marker_index:Q.parallel_rows.length})}async function E(p,f){let x=Q.parallel_rows,_=x.findIndex(He=>He.id===p);if(_<0)return;let g=x[_].root_dir,O=[];x.forEach((He,xt)=>{He.root_dir===g&&O.push(xt)});let z=O.indexOf(_),ue=O[z+f];if(typeof ue!="number")return;let Ae=f===-1?ue:O[z+2]??Math.min(x.length,ue+1);await oe({kind:"parallel",bead_id:p,root_dir:g,queue_index:x[_].queue_index??0},{kind:"parallel",marker_index:Ae})}async function he(p){for(let f of Q.chain_lanes){let x=f.rows.find(_=>_.id===p);if(x){await oe({kind:"chain",bead_id:p,root_dir:x.root_dir,lane_id:f.lane_id,...typeof x.queue_index=="number"?{queue_index:x.queue_index}:{}},{kind:"parallel",marker_index:Q.parallel_rows.length});return}}}function Le(p){return{runner:p.runner||void 0,model:p.model||void 0,effort:p.effort||void 0,status:p.run_state==="running"?"running":p.run_state,worktree:p.root_dir}}function ot(p,f,x,_,g={}){let O=de.get(p)||null;fo({context:{bead_id:p,kind:_,tuple:O?Rn(O):""},transport:z=>Ce("worker-attempt-resume",{attempt_id:f,...g,...z},x,Re.get(x)?.revision??jt(p).revision,!1)})}function Ve(){W=null,B()}function $t(){let p=W,f=p?ya(p.draft):null;!p||!f||(W=null,B(),ot(p.bead_id,f.attempt_id,p.root_dir,"session",f.payload))}function It(p,f){let{item:x,root_dir:_,revision:g}=jt(f),O=x?.attempt_id||"",z=p.classList;if(z.contains("worker-mini__rowops-up")||z.contains("worker-mini__rowops-down")){E(f,z.contains("worker-mini__rowops-up")?-1:1);return}if(z.contains("worker-mini__rowops-remove")){Ce("worker-queue-remove",{bead_id:f},_,g);return}if(z.contains("worker-mini__start-now")){Ft(f,_);return}if(z.contains("mon2-crow__detach")){he(f);return}if(z.contains("worker-dep__open")){wt(p.getAttribute("data-dep-id")||"",p.getAttribute("data-root-dir")||"");return}if(z.contains("mon2-arm__release")){zt(f,p.getAttribute("data-lane-id")||"");return}if(z.contains("mon-lane__chip")){let ue=p.getAttribute("data-lane-id")||"";ce.querySelector(`.mon2-clane[data-lane-id="${ue}"]`)?.scrollIntoView({block:"nearest"});return}if(z.contains("judgement-chip")){let ue=p.getAttribute("data-chip-key")||"";ue&&F.toggle({bead_id:f,chip_key:ue});return}if(z.contains("rtile__failure-badge")){P=P===O?null:O,B();return}if(z.contains("rtile__provider-hold-badge")){q=q===O?null:O,B();return}if(z.contains("rtile__attempt-copy")){let ue=p.getAttribute("data-attempt-id")||"";ue&&yn(ue).then(Ae=>{_e(Ae?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",Ae?"success":"error",1400)});return}if(z.contains("worker-card__place")){R=R===f?null:f,B();return}if(z.contains("worker-card__place-cancel")){R=null,B();return}if(z.contains("worker-card__place-lane")){let ue=p.getAttribute("data-lane")||"parallel";R=null,xe(f,ue);return}if(z.contains("rtile__session")){if(x&&x.kind==="session"){let ue=(x.session_refs||[]).find(Ae=>Ae&&Ae.current===!0);ue&&(Te.hidden=!1,G.open(_o(ue,f,"in_progress",_)),B());return}L=O,O&&x&&(Te.hidden=!1,G.open({attempt_id:O,root_dir:_,meta:Le(x)})),B();return}if(z.contains("rtile__pause")){Je("worker-attempt-pause",{attempt_id:O},_);return}if(z.contains("rtile__resume-alternate")){let ue=ha(O,Ne(_));ue&&(W={root_dir:_,bead_id:f,draft:ue},B());return}if(z.contains("rtile__resume")){ot(f,O,_,p.dataset.resumeKind==="settlement"?"settlement":"session");return}if(z.contains("rtile__resolve")){st(f,_,Re.get(_)?.revision??jt(f).revision);return}if(z.contains("rtile__discard-abandon")){let ue={kind:p.dataset.operationKind||"",last_error:p.dataset.lastError||""};if(!m(ls(f,ue)))return;Ee({bead_id:f,operation_id:p.dataset.operationId||""},_,g,ue);return}if(z.contains("rtile__discard")){let ue=p.dataset.confirmation==="merged"?"merged":"unmerged";if(!m(as(f,ue)))return;X({bead_id:f,...O?{attempt_id:O}:{},...p.dataset.operationId?{operation_id:p.dataset.operationId}:{}},_,g);return}if(z.contains("worker-mini__merge")){let ue=Qe(_,f);ue?.mismatch&&ue.continuation===null?J(_,f,g,ue.mismatch):Ce("worker-merge-queue-add",{bead_id:f},_,g);return}if(z.contains("worker-mini__merge-cancel")){Ce("worker-merge-queue-remove",{bead_id:f},_,g);return}if(z.contains("worker-mini__discard-abandon")){let ue={kind:p.dataset.operationKind||"",last_error:p.dataset.lastError||""};if(!m(ls(f,ue)))return;Ee({bead_id:f,operation_id:p.dataset.operationId||""},_,g,ue);return}if(z.contains("worker-mini__discard")){let ue=p.dataset.discardMode==="merged"?"merged":"unmerged";if(!m(as(f,ue)))return;X({bead_id:f,...p.dataset.attemptId?{attempt_id:p.dataset.attemptId}:{},...p.dataset.operationId?{operation_id:p.dataset.operationId}:{}},_,g);return}if(z.contains("worker-mini__revise-fix")){Fe("worker-revise-fix",{bead_id:f},_,g);return}z.contains("worker-mini__revise-approve")&&Ce("worker-revise-approve",{bead_id:f},_,g)}function Et(p){let f=pe.consumeClickSuppression(),x=p.target;if(!x||typeof x.closest!="function")return;if(x.closest(".provider-resume-dialog__cancel")){Ve();return}if(x.closest(".provider-resume-dialog__confirm")){$t();return}if(x.closest("dialog")||x.closest(".worker-drawer-overlay")||x.closest("a"))return;let _=x.closest(".worker-card__id, .worker-mini__id, .rtile__id");if(_){p.preventDefault();let Jt=x.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||_.textContent?.trim()||"";Jt&&Tt(Jt);return}let g=x.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(g){p.preventDefault();let Vt=g.getAttribute("data-root-dir")||de.get(x.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||g.getAttribute("title")||"";yt(Vt);return}let O=x.closest(".mon2-sec__toggle");if(O){p.preventDefault(),vt(O.getAttribute("data-root-dir")||"");return}let z=x.closest(".worker-pane__toggle[data-lane]");if(z){p.preventDefault();let Vt=z.getAttribute("data-lane")||"";(Vt==="candidate"||Vt==="queue"||Vt==="running"||Vt==="pr_wait"||Vt==="done")&&ut(Vt);return}let ue=x.closest(".worker-wait__area-toggle[data-area]");if(ue){p.preventDefault(),Ze(ue.getAttribute("data-area")||"parallel");return}if(x.closest(".mon2-newlane")){p.preventDefault(),St("create","");return}let Ae=x.closest(".mon2-clane__confirm, .mon2-clane__reapply, .mon2-clane__remove, .mon2-clane__run, .mon2-clane__stop");if(Ae){p.preventDefault();let Vt=Ae.getAttribute("data-lane-id")||"",Jt=Ae.classList;St(Jt.contains("mon2-clane__confirm")?"confirm":Jt.contains("mon2-clane__reapply")?"reapply":Jt.contains("mon2-clane__run")?"run":Jt.contains("mon2-clane__stop")?"stop":"remove",Vt);return}if(x.closest(".mon-merge-all")){p.preventDefault(),Ue();return}let He=x.closest(".mon-filter__route");if(He){p.preventDefault(),k={...k,routes:Hi(k.routes,He.getAttribute("data-route")||"")},pc(k),B();return}let xt=x.closest(".mon-filter__readiness");if(xt){p.preventDefault(),k={...k,readiness:xt.getAttribute("data-readiness")||"all"},pc(k),B();return}let Qt=x.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!Qt)return;let an=Qt.getAttribute("data-bead-id")||"",xn=x.closest("button");if(xn){p.preventDefault(),It(xn,an);return}x.closest(".rtile__failure-pop, .chip-popover")||an&&!f&&(p.preventDefault(),wt(an,Qt.getAttribute("data-root-dir")||jt(an).root_dir))}function Kt(p){let f=p.target;if(!f||typeof f.closest!="function")return;if(W){let z=ba(W.draft,f,Ne(W.root_dir));if(z){z!==W.draft&&(W={...W,draft:z},B());return}}let x=f.closest(".mon-filter__blocked");if(x){k={...k,show_blocked:x.checked},pc(k),B();return}let _=f.closest(".mon-candidate-sort");if(_){S=ps.some(z=>z.value===_.value)?_.value:"repo_spec",ik(S),B();return}let g=f.closest(".mon-running-sort");if(g){h=g.value==="repo"?"repo":"started",pk(h),B();return}let O=f.closest(".mon-done-range");O&&(b=Kn(O.value),uk(b),B())}function _n(p){let f=p.target,x=f&&typeof f.closest=="function"?g=>f.closest(g):()=>null,_=!1;P&&!x(".rtile__failure-pop, .rtile__failure-badge")&&(P=null,_=!0),q&&!x(".rtile__provider-hold-pop, .rtile__provider-hold-badge")&&(q=null,_=!0),_&&B()}function Lt(p){p.key==="Escape"&&(P===null&&q===null&&W===null||(P=null,q=null,W=null,B()))}e.addEventListener("click",Et),e.addEventListener("change",Kt),document.addEventListener("click",_n),document.addEventListener("keydown",Lt),F.attach(),pe.attach(e);{let p=!0;U=fa(f=>{if(re=f,p){p=!1;return}B()})}o&&typeof o.subscribe=="function"&&(Ie=o.subscribe(()=>{try{Re.clear(),B()}catch{}}));function hn(){Ye!==null&&(clearInterval(Ye),Ye=null)}return{recorrectSharedLane:Ut,load(){n("load"),B(),Ye===null&&(Ye=setInterval(()=>{try{B()}catch{}},fk))},pause(){hn()},clear(){hn(),pe.detach(),Ie&&(Ie(),Ie=null),U&&(U(),U=null),G.destroy(),Te.hidden=!0,_t?.destroy(),_t=null,e.removeEventListener("click",Et),e.removeEventListener("change",Kt),document.removeEventListener("click",_n),document.removeEventListener("keydown",Lt),F.detach(),e.replaceChildren()}}}function i_(e,t,n){let r=Bt("views:nav"),{global_element:o,repo_element:i}=e,s=null;function l(b){return h=>{h.preventDefault();let k=b==="monitor"&&a()==="monitor"?"worker":b;r("click tab %s",k),n.gotoView(k)}}function a(){let b=t.getState();return b.view==="worker"||b.view==="monitor"?b.view:"board"}function u(){let b=a();return c`
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
    `}function m(){o&&ft(u(),o),i&&ft(d(),i)}return m(),s=t.subscribe(()=>m()),{destroy(){s&&(s(),s=null),o&&ft(c``,o),i&&ft(c``,i)}}}var a_=["bug","feature","task","epic","chore"];function l_(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var c_=["Critical","High","Medium","Low","Backlog"];function u_(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),o=n.querySelector("#new-title"),i=n.querySelector("#new-type"),s=n.querySelector("#new-priority"),l=n.querySelector("#new-labels"),a=n.querySelector("#new-description"),u=n.querySelector("#new-issue-error"),d=n.querySelector("#btn-cancel"),m=n.querySelector("#btn-create"),b=n.querySelector(".new-issue__close");function h(){i.replaceChildren();let R=document.createElement("option");R.value="",R.textContent="\u2014 Select \u2014",i.appendChild(R);for(let P of a_){let q=document.createElement("option");q.value=P,q.textContent=l_(P),i.appendChild(q)}s.replaceChildren();for(let P=0;P<=4;P+=1){let q=document.createElement("option");q.value=String(P);let W=c_[P]||"Medium";q.textContent=`${P} \u2013 ${W}`,s.appendChild(q)}}h();function k(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function S(R){o.disabled=R,i.disabled=R,s.disabled=R,l.disabled=R,a.disabled=R,d.disabled=R,m.disabled=R,m.textContent=R?"Creating\u2026":"Create"}function T(){u.textContent=""}function ee(R){u.textContent=R}function re(){try{let R=window.localStorage.getItem("beads-ui.new.type");R?i.value=R:i.value="";let P=window.localStorage.getItem("beads-ui.new.priority");P&&/^\d$/.test(P)?s.value=P:s.value="2"}catch{i.value="",s.value="2"}}function U(){let R=i.value||"",P=s.value||"";R.length>0&&window.localStorage.setItem("beads-ui.new.type",R),P.length>0&&window.localStorage.setItem("beads-ui.new.priority",P)}async function L(){T();let R=String(o.value||"").trim();if(R.length===0){ee("Title is required"),o.focus();return}let P=Number(s.value||"2");if(!(P>=0&&P<=4)){ee("Priority must be 0..4"),s.focus();return}let q=String(i.value||""),W=String(a.value||""),F={title:R};q.length>0&&(F.type=q),String(P).length>0&&(F.priority=P),W.length>0&&(F.description=W),S(!0);try{await t("create-issue",F)}catch{S(!1),ee("Failed to create issue");return}U(),S(!1),k()}return n.addEventListener("cancel",R=>{R.preventDefault(),k()}),b.addEventListener("click",()=>k()),d.addEventListener("click",()=>k()),n.addEventListener("keydown",R=>{R.key==="Enter"&&(R.ctrlKey||R.metaKey)&&(R.preventDefault(),L())}),r.addEventListener("submit",R=>{R.preventDefault(),L()}),{open(){r.reset(),T(),re();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{o.focus()}catch{}},0)},close(){k()}}}var gk=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked\xB7\uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694 \uCE69"],["stepper","stepper"]];function hk(e,t){return Ba(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function d_(e,t,n){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?c`<div class="settings-dialog__empty">라벨 없음</div>`:c`<div class="settings-dialog__pills">
            ${t.map(r=>{let o=hk(r,e);return c`<button
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
  `}function p_(e,t,n){return c`
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
  `}function f_(e,t){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${gk.map(([n,r])=>c`<label class="settings-dialog__toggle">
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
  `}var bk=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function __(e,t){let{transport:n,policyStore:r,labelOptions:o}=t,i=t.notify||(ne=>_e(ne,"error",4e3)),s=document.createElement("dialog");s.id="settings-dialog",s.className="settings-dialog",s.setAttribute("role","dialog"),s.setAttribute("aria-modal","true"),s.setAttribute("aria-label","\uC124\uC815"),e.appendChild(s);let l="execution",a=!1,u="",d=null;function m(){if(d)return d;let ne=s.querySelector('[data-pane="execution"]');return ne?(d=xa(ne,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:n,implPresetStore:t.implPresetStore,notify:i,onQueueAdopt:me=>t.queueStore?.set?.(me)}),d):null}function b(){return c`
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
    `}function h(){let ne=r.get();return c`
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
              ${d_(ne,o(),ee)}
              ${p_(ne,u,{onDraft:me=>{u=me},onAdd:re,onRemove:U})}
              ${f_(ne,L)}
            `:c`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function k(ne){let me=r.get();if(me)try{let Oe=await n("display-policy-set",{expected_revision:me.revision,policy:ne(me)});S(Oe),Oe&&Oe.conflict&&Oe.policy&&(Oe=await n("display-policy-set",{expected_revision:Oe.policy.revision,policy:ne(Oe.policy)}),S(Oe)),Oe&&Oe.conflict&&i("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{i("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function S(ne){ne&&ne.policy&&typeof ne.policy=="object"&&r.set(ne.policy)}function T(ne){k(ne)}function ee(ne){let me=r.get();if(!me)return;let Oe=!yk(ne,me);T(H=>vk(ne,H,Oe))}function re(){let ne=u.trim();ne.length!==0&&(u="",T(me=>me.hidden_prefixes.includes(ne)?{hidden_prefixes:me.hidden_prefixes}:{hidden_prefixes:[...me.hidden_prefixes,ne]}),R())}function U(ne){T(me=>({hidden_prefixes:me.hidden_prefixes.filter(Oe=>Oe!==ne)}))}function L(ne){let me=r.get();if(!me)return;let Oe=me.chips[ne]===!1;T(()=>({chips:{[ne]:Oe}}))}function R(){ft(c`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${bk.map(ne=>c`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${ne.id}
                  aria-selected=${String(l===ne.id)}
                  aria-controls=${`settings-pane-${ne.id}`}
                  @click=${()=>P(ne.id)}
                >
                  <span class="settings-dialog__glyph">${ne.glyph}</span>
                  ${ne.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${j}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${b()} ${h()}
          </div>
        </div>
      `,s),m()}function P(ne){l=ne,R()}let q=()=>{a=!1,t.onOpenChange?.(!1)};s.addEventListener("close",q),s.addEventListener("cancel",q);let W=ne=>{ne.target===s&&j()};s.addEventListener("click",W);let F=null;r.subscribe&&(F=r.subscribe(()=>{a&&R()}));let D=null;t.implPresetStore?.subscribe&&(D=t.implPresetStore.subscribe(()=>{a&&d?.render()}));function V(ne="execution"){a||(a=!0,t.onOpenChange?.(!0),l=ne,u="",R(),typeof s.showModal=="function"?s.showModal():s.setAttribute("open",""),m()?.load())}function j(){a&&(a=!1,t.onOpenChange?.(!1),typeof s.close=="function"?s.close():s.removeAttribute("open"))}return{open:V,close:j,sessionDraft:()=>d?.sessionDraft()??{},destroy(){a=!1,s.removeEventListener("close",q),s.removeEventListener("cancel",q),s.removeEventListener("click",W),F&&(F(),F=null),D&&(D(),D=null),d?.destroy(),d=null,s.remove()}}}function yk(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(n=>n.length>0&&e.startsWith(n))}function vk(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(i=>i!==e)};let r=t.hidden_labels.filter(i=>i!==e);return t.hidden_prefixes.some(i=>i.length>0&&e.startsWith(i))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}var kk=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],m_="usage-meter-card",wk="usage-meter-layer",fc=600,$k=["token_expired","relogin_required"];function g_(e){return String(e).padStart(2,"0")}function xk(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),o=Math.floor(n%1440/60),i=n%60;return r>0?`${r}d${o>0?` ${o}h`:""}`:o>0?`${o}h${i>0?` ${i}m`:""}`:`${i}m`}function h_(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),o=new Date(t),i=`${g_(r.getHours())}:${g_(r.getMinutes())}`,l=r.getFullYear()===o.getFullYear()&&r.getMonth()===o.getMonth()&&r.getDate()===o.getDate()?i:`${kk[r.getMonth()]} ${r.getDate()} ${i}`;return`${xk(n,t)} \xB7 ${l}`}function Ak(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function b_(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function y_(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var v_=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function w_(e){let t=[];for(let n of e){if(!n||typeof n!="object")continue;let r=n;typeof r.key!="string"||r.key.length===0||typeof r.pct!="number"||!Number.isFinite(r.pct)||t.push({key:r.key,pct:r.pct,resetsAt:typeof r.resetsAt=="string"?r.resetsAt:""})}return t}function Sk(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:w_(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function Ek(e,t){if(!e||typeof e!="object")return null;let n=e,r=[];if(Array.isArray(n.accounts))for(let i of n.accounts){let s=Sk(i);s&&r.push(s)}let o=n.available===!0&&Array.isArray(n.windows);return!o&&r.length===0?null:{available:o,windows:o?w_(n.windows):[],ageSeconds:typeof n.ageSeconds=="number"&&Number.isFinite(n.ageSeconds)?n.ageSeconds:null,accounts:r,receivedAtMs:t,held:!1}}function Tk(e,t){if(!e||typeof e!="object")return{kind:"error"};let n=Ek(e,t);return n?{kind:"ok",snapshot:n}:Array.isArray(e.accounts)?{kind:"empty"}:{kind:"error"}}function $_(e,t){return(e.ageSeconds===null?0:e.ageSeconds)+Math.max(0,t-e.receivedAtMs)/1e3}function Ck(e,t){return!e.held||$_(e,t)<=fc?e:{...e,available:!1,windows:[],accounts:[]}}function k_(e,t){return`${e}:${t}`}function x_(e){let t=!1,n=null,r=new Map,o=null,i=new Map,s=new Map,l=0,a=null;function u(){ft(c``,e),e.hidden=!0,m()}function d(){if(a===null){let H=e.ownerDocument;a=H.createElement("div"),a.id=wk,a.className="usage-meter__layer",H.body.appendChild(a)}return a}function m(){a!==null&&(ft(c``,a),a.remove(),a=null)}function b(H){n!==H&&(n===null&&(document.addEventListener("mousedown",k),document.addEventListener("keydown",T),window.addEventListener("resize",S)),n=H)}function h(){n!==null&&(n=null,document.removeEventListener("mousedown",k),document.removeEventListener("keydown",T),window.removeEventListener("resize",S))}function k(H){let te=H.target;te&&(e.contains(te)||a!==null&&a.contains(te))||(h(),j())}function S(){j()}function T(H){H.key==="Escape"&&(h(),j())}function ee(H){n===H?h():b(H),j()}function re(){h(),j()}async function U(H,te){if(r.has(H.key))return;let ce=k_(H.key,te);r.set(H.key,te),s.delete(ce),j();let Te=null;try{Te=await(await fetch(H.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:te})})).json()}catch{Te=null}if(t)return;if(r.delete(H.key),!Te||Te.ok!==!0){let ae=Te&&typeof Te.error=="string"&&Te.error.length>0?Te.error:"network_error";s.set(ce,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${ae}`}),j();return}let K=Array.isArray(Te.warnings)?Te.warnings.filter(ae=>typeof ae=="string"&&ae.length>0):[];K.length>0&&s.set(ce,{kind:"warn",text:K.join(" \xB7 ")}),j(),await Oe()}function L(H,te,ce,Te){let K=y_(H.pct),Q=`resets ${h_(H.resetsAt,Te)}${te?` \xB7 ${ce}`:""}`;return c`<span
      class="usage-meter__window ${b_(K)}"
      style=${`--progress: ${K}%`}
      title=${Q}
    >
      <span class="usage-meter__label">${H.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${K}%</span>
    </span>`}function R(H,te,ce){let Te=$_(te,ce),K=te.available&&(te.held||Te>fc),ae=K?`${Math.floor(Te/60)}\uBD84 \uC804 \uCE21\uC815`:"",Q=te.accounts.filter(Ie=>!Ie.active).length,de=`usage-meter__group${K?" usage-meter__group--stale":""}`,Re=c`<span class="usage-meter__provider"
        >${H.label}</span
      >
      ${te.available?te.windows.map(Ie=>L(Ie,K,ae,ce)):c`<span class="usage-meter__empty">사용량 없음</span>`}
      ${Q>0?c`<span class="usage-meter__badge">+${Q}</span>`:""}`;if(te.accounts.length===0)return c`<span
        class=${de}
        aria-label=${`${H.label} usage`}
        >${Re}</span
      >`;let be=n===H.key;return c`<button
      type="button"
      class=${`usage-meter__toggle ${de}`}
      aria-label=${`${H.label} usage`}
      aria-expanded=${be?"true":"false"}
      aria-controls=${m_}
      @click=${()=>ee(H.key)}
    >
      ${Re}
    </button>`}function P(H,te){return c`<span class="usage-meter" aria-label="Usage">
      ${H.map(ce=>R(ce.provider,ce.snapshot,te))}
    </span>`}function q(H,te){let ce=y_(H.pct),Te=h_(H.resetsAt,te);return c`<span
      class="usage-meter__account-window ${b_(ce)}"
      style=${`--progress: ${ce}%`}
    >
      <span class="usage-meter__account-key">${H.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${ce}%</span>
      <span class="usage-meter__account-reset"
        >${Te.length>0?`\u21BB ${Te}`:""}</span
      >
    </span>`}function W(H,te){return $k.includes(te)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${H.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function F(H,te,ce){let Te=te.status==="ok",K=typeof te.ageSeconds=="number"&&te.ageSeconds>fc,ae=s.get(k_(H.key,te.number)),Q=r.get(H.key),de=Q!==void 0,Re=Q===te.number,be=["usage-meter__account"];return te.active&&be.push("usage-meter__account--active"),Te||be.push("usage-meter__account--unavailable"),K&&be.push("usage-meter__account--stale"),c`<div class=${be.join(" ")}>
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
              >${Ak(te.ageSeconds)}</span
            >`}
        ${te.active?"":c`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${de}
              @click=${()=>{U(H,te.number)}}
            >
              ${Re?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${Te?c`<div class="usage-meter__account-windows">
            ${te.windows.map(Ie=>q(Ie,ce))}
          </div>`:c`<div class="usage-meter__account-status">
            ${W(H,te.status)}
          </div>`}
      ${ae===void 0?"":c`<div
            class="usage-meter__account-message usage-meter__account-message--${ae.kind}"
          >
            ${ae.text}
          </div>`}
    </div>`}function D(H,te,ce){let Te=te.accounts.filter(K=>K.active).length;return c`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${H.label} · 활성 ${Te} / 전체
        ${te.accounts.length}
      </h2>
      ${te.accounts.map(K=>F(H,K,ce))}
    </section>`}function V(H,te){return c`<div
      class="usage-meter__card"
      id=${m_}
      role="dialog"
      aria-label=${`${H.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${D(H.provider,H.snapshot,te)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function j(){let H=Date.now(),te=[];for(let Te of v_){let K=i.get(Te.key);K&&te.push({provider:Te,snapshot:Ck(K,H)})}if(te.length===0){h(),u();return}let ce=te.find(Te=>Te.provider.key===n&&Te.snapshot.accounts.length>0);ce||h(),ft(P(te,H),e),e.hidden=!1,ce?ne(ce,H):m()}function ne(H,te){let ce=d(),Te=e.getBoundingClientRect(),K=e.ownerDocument.documentElement.clientWidth;ce.style.setProperty("--usage-meter-anchor-top",`${Te.bottom}px`),ce.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,K-Te.right)}px`),ft(c`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${re}
        ></div>
        ${V(H,te)}`,ce)}async function me(H){try{let te=await fetch(H.endpoint);return te.ok?Tk(await te.json(),Date.now()):{kind:"error"}}catch{return{kind:"error"}}}async function Oe(){l+=1;let H=l,te=await Promise.all(v_.map(async ce=>({provider:ce,read:await me(ce)})));if(!(t||H!==l)){for(let ce of te){let Te=ce.provider.key;if(ce.read.kind==="ok"){i.set(Te,ce.read.snapshot);continue}if(ce.read.kind==="empty"){i.delete(Te);continue}let K=i.get(Te);K!==void 0&&!K.held&&i.set(Te,{...K,held:!0})}j()}}return u(),Oe(),o=setInterval(()=>{Oe()},6e4),{destroy(){t=!0,o!==null&&(clearInterval(o),o=null),h(),u()}}}function Ps(e){let t=e?.blocked_info;return t&&typeof t=="object"?Array.isArray(t.blockers)?t.blockers.filter(r=>typeof r=="string"&&r.length>0):[]:(Array.isArray(e?.dependencies)?e.dependencies:[]).map(r=>{if(typeof r=="string")return r;if(!r||typeof r!="object")return"";let o=r.type??r.dependency_type;return o!==void 0&&o!=="blocks"?"":r.depends_on_id||r.id||""}).filter(Boolean)}var E_="bdui.worker.candidate_sort",Ms=Object.freeze([{id:"spec",label:"spec \uC6B0\uC120",chain:[{key:"spec",dir:"desc"},{key:"created",dir:"asc"}]},{id:"bottleneck",label:"\uBCD1\uBAA9 \uC6B0\uC120",chain:[{key:"priority",dir:"asc"},{key:"dependents",dir:"desc"},{key:"released",dir:"desc"}]},{id:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131",chain:[{key:"created",dir:"desc"},{key:"priority",dir:"asc"}]},{id:"updated",label:"\uCD5C\uC2E0 \uC218\uC815",chain:[{key:"updated",dir:"desc"}]}]),Sa=Object.freeze({preset:"spec"}),T_=3,C_=Object.freeze([{key:"priority",label:"\uC6B0\uC120\uC21C\uC704"},{key:"dependents",label:"\uD6C4\uC18D \uC218"},{key:"released",label:"\uD574\uC81C \uC2DC\uAC01"},{key:"spec",label:"spec \uC720\uBB34"},{key:"created",label:"\uC0DD\uC131"},{key:"updated",label:"\uC218\uC815"}]);function A_(e){return Ms.some(t=>t.id===e)}function S_(e){let t=Ms.find(n=>n.id===e);return t?t.chain.map(n=>({...n})):[]}function Rk(e,t){return e.length===t.length&&e.every((n,r)=>n.key===t[r].key&&n.dir===t[r].dir)}function qs(e){return e&&"preset"in e?S_(e.preset):e&&Array.isArray(e.chain)?e.chain.map(t=>({...t})):S_("spec")}function _c(e){return e&&"preset"in e?e.preset:null}function Jr(e){if(typeof e=="string"){let i;try{i=JSON.parse(e)}catch{return A_(e)?{preset:e}:Sa}return Jr(i)}if(!e||typeof e!="object")return Sa;let t=e;if(A_(t.preset))return{preset:t.preset};let n=t.chain;if(!Array.isArray(n)||n.length===0||n.length>T_||!n.every(qa))return Sa;let r=[];for(let i of n)r.some(s=>s.key===i.key)||r.push({key:i.key,dir:i.dir});let o=Ms.find(i=>Rk(i.chain,r));return o?{preset:o.id}:{chain:r}}function R_(){try{return Jr(window.localStorage.getItem(E_))}catch{return Sa}}function mc(e){try{window.localStorage.setItem(E_,JSON.stringify(e))}catch{}}function O_(e,t,n){let r=e.map(a=>({...a}));if(!n)return r.slice(0,t);if(!Object.prototype.hasOwnProperty.call(Xs,n))return r;let o=n;if(r.slice(0,t).some(a=>a.key===o))return r.slice(0,t);let i={key:o,dir:r[t]&&r[t].key===o?r[t].dir:Xs[o]},s=r.slice(0,t),l=r.slice(t+1).filter(a=>a.key!==o);return[...s,i,...l].slice(0,T_)}function I_(e,t){return e.map((n,r)=>r===t?{key:n.key,dir:n.dir==="asc"?"desc":"asc"}:{...n})}function Ok(e){let t=new Set(e.map(l=>l.id)),n=new Map,r=new Map;for(let l of e){let a=Ps(l).filter(u=>t.has(u));n.set(l.id,a);for(let u of a){let d=r.get(u);d?d.push(l):r.set(u,[l])}}let o=new Set,i=[],s=l=>{o.add(l.id),i.push(l);for(let a of r.get(l.id)??[])!o.has(a.id)&&(n.get(a.id)??[]).every(u=>o.has(u))&&s(a)};for(;i.length<e.length;){let l=e.find(a=>!o.has(a.id)&&(n.get(a.id)??[]).every(u=>o.has(u)));s(l??e.find(a=>!o.has(a.id)))}return i}function L_(e,t){let n=Array.isArray(e)?e.slice():[];return n.sort(tu(qs(t))),Ok(n)}function D_(e,t){let n=new Map;if(!e||typeof e!="object")return n;let r=e,o=[],i=new Set;for(let s of t){if(i.has(s.id))continue;i.add(s.id);let l=r[s.id];if(!l||!Array.isArray(l.scope))continue;let a=l.scope.filter(u=>typeof u=="string"&&u.length>0);if(a.length===0){n.set(s.id,{overlaps:[],scope_missing:!0});continue}n.set(s.id,{overlaps:[],scope_missing:!1}),o.push({member:s,scope:a})}for(let s=0;s<o.length;s+=1)for(let l=s+1;l<o.length;l+=1){let a=xi(o[s].scope,o[l].scope);if(a.length===0)continue;let u=o[s].member,d=o[l].member;n.get(u.id)?.overlaps.push({id:d.id,title:d.title,location_label:d.location_label,prefixes:a}),n.get(d.id)?.overlaps.push({id:u.id,title:u.title,location_label:u.location_label,prefixes:a})}return n}var P_=new Set(["sh","bash","zsh","dash","ksh"]),M_=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function q_(e){let t=e.split("/");return t[t.length-1]||""}function Ik(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let n=t.slice(2).trim().split(/\s+/).filter(Boolean);if(n.length===0)return!1;let r=q_(n[0]);if(r!=="env")return P_.has(r);let o=n.slice(1).find(i=>!i.startsWith("-")&&!i.includes("="));return o!==void 0&&P_.has(q_(o))}function Lk(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function Dk(e){let t=[],n=0;M_.lastIndex=0;for(let r of e.matchAll(M_)){let o=r.index;o>n&&t.push({text:e.slice(n,o),kind:"plain"}),t.push({text:r[0],kind:Lk(r[0])}),n=o+r[0].length}return n<e.length&&t.push({text:e.slice(n),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function Pk(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function N_(e){let t=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),r=document.createElement("div");r.className="repo-ops-script-viewer-root",document.body.appendChild(r);let o=null,i="loading",s="",l="",a=0,u=null,d=!1;function m(R,P){return P?Dk(R).map(q=>q.kind==="plain"?q.text:c`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${q.kind}"
            >${q.text}</span
          >`):R}function b(){if(!o)return c``;let R=i==="ready"&&Ik(s),P=i==="ready"?s.split(`
`):[];return c`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${o.path}`}
    >
      <div
        class="repo-ops-script-viewer__backdrop"
        @click=${()=>U()}
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
              @click=${()=>{k()}}
            >
              복사
            </button>
            <button
              type="button"
              class="repo-ops-script-viewer__close"
              aria-label="스크립트 팝업 닫기"
              @click=${()=>U()}
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
                  ${P.map((q,W)=>c`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${W+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${m(q,R)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function h(){ft(b(),r)}async function k(){if(i!=="ready")return;let R=await yn(s);_e(R?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",R?"success":"error")}function S(R){R.key==="Escape"&&o&&(R.preventDefault(),U())}function T(){d||(document.addEventListener("keydown",S),d=!0)}function ee(){d&&(document.removeEventListener("keydown",S),d=!1)}async function re(R,P=null){let q=++a;T(),o={...R},u=P||(document.activeElement instanceof HTMLElement?document.activeElement:null),i="loading",s="",l="",h(),r.querySelector(".repo-ops-script-viewer__close")?.focus();let F=t?t():"";if(!F){i="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",h();return}if(!n){i="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",h();return}let D="/api/repo-ops-script?workspace="+encodeURIComponent(F)+"&lane="+encodeURIComponent(R.lane)+"&base_sha="+encodeURIComponent(R.base_sha);try{let V=await n(D),j=await V.json().catch(()=>({}));if(q!==a)return;if((t?t():"")!==F){U();return}if(!V.ok||!j||j.ok!==!0){i="error",l=Pk(j&&typeof j.error=="string"?j.error:""),h();return}o={lane:j.lane,base_sha:j.base_sha,path:j.path,base_ref:j.base_ref},s=String(j.content),i="ready",h()}catch{if(q!==a)return;i="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",h()}}function U(){a+=1,ee(),o=null,s="",h();let R=u;u=null,R?.isConnected&&R.focus()}function L(){U(),r.remove()}return{open:re,close:U,destroy:L}}var j_={deploy_not_declared:"\uC120\uC5B8 \uC5C6\uC74C",deploy_opted_out:"\uC774 workspace\uC5D0\uC11C \uBC30\uD3EC \uC2E4\uD589\uC774 \uAEBC\uC838 \uC788\uC74C",deploy_in_flight:"\uBC30\uD3EC \uC9C4\uD589 \uC911",target_unresolved:"\uB300\uC0C1 tip\uC744 \uD655\uC815\uD558\uC9C0 \uBABB\uD568",remote_history_not_monotonic:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uC640 \uC6D0\uACA9 \uC774\uB825\uC774 \uAC08\uB77C\uC9D0"},Mk=new Set(["queued","running","retry_pending"]);function F_(e){let t=e.queueStore,n=e.transport,r=e.onChanged||(()=>{}),o=e.onOpenScript;function i(){return t&&t.get()||{}}function s(){let D=i();return typeof D.revision=="number"?D.revision:0}function l(D){t&&D&&D.queue&&typeof D.queue=="object"&&t.set(D.queue)}function a(){let D=i().workspace_info;return D&&typeof D=="object"?D:{}}function u(D,V){return c`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${D}"
      >${V}</span
    >`}function d(D){if(typeof D!="number"||!Number.isFinite(D))return"";let V=D/6e4;return Number.isInteger(V)?`timeout ${V}\uBD84`:`timeout ${Math.round(D/1e3)}\uCD08`}function m(D){let V=d(D);return V?u("config",V):""}function b(D,V,j){return c`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${j.script}
      @click=${ne=>{o&&o({lane:D,base_sha:V.base_sha,path:j.script,base_ref:V.base_ref},ne.currentTarget)}}
    ></button>`}function h(){let D=i().repo_operations;return Array.isArray(D)?D:[]}function k(){let D=a().repo_ops,V=D&&typeof D=="object"?D.repo_id:null;return typeof V=="string"&&V?V:null}function S(){return h().some(D=>D&&D.kind==="deploy"&&Mk.has(D.state))}function T(){let D=S(),V=k()===null;return c`<button
      type="button"
      class="worker-repo-ops__deploy-run"
      data-seam="repo-ops-deploy-run"
      ?disabled=${D||V}
      title=${D?"\uBC30\uD3EC \uC9C4\uD589 \uC911":V?"\uC800\uC7A5\uC18C\uB97C \uD655\uC778\uD560 \uC218 \uC5C6\uC74C":"\uC6D0\uACA9 base tip\uC5D0\uC11C \uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uB97C 1\uD68C \uC2E4\uD589\uD569\uB2C8\uB2E4"}
      @click=${()=>{P()}}
    >
      배포 실행
    </button>`}function ee(){let D=i().repo_ops_opt_out;return{verify:D?.verify===!0,deploy:D?.deploy===!0}}function re(D,V){return c`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!V}
        @change=${j=>{R(D,!j.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function U(D){let V=typeof D.base_sha=="string"?D.base_sha:"",j=`${D.source_path||"repo-ops/config.toml"} @ ${D.base_ref||"?"}${V?`@${V.slice(0,7)}`:""}`,ne=ee(),me=!!D.verify&&ne.verify,Oe=!!D.deploy&&ne.deploy;return c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${j}</span>
      </p>
      <div
        class="worker-repo-ops__lane${me?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${D.verify?c`${b("verify",D,D.verify)}
              ${m(D.verify.timeout_ms)}
              ${me?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:c`선언 없음${u("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${me?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":D.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${D.verify?re("verify",ne.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${Oe?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${D.deploy?c`${b("deploy",D,D.deploy)}
              ${m(D.deploy.timeout_ms)}
              ${Oe?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):T()}`:c`선언 없음${u("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${Oe?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":D.deploy?c`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${D.deploy?re("deploy",ne.deploy):""}
      </div>
    </section>`}function L(D){let V=D.repo_ops&&typeof D.repo_ops=="object"?D.repo_ops:null;return V&&(V.status==="resolved"||V.status==="absent")?U(V):V&&(V.status==="pending"||V.status==="error")?c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
    </section>`}async function R(D,V){if(!n)return;let j=await n("worker-repo-ops-opt-out-toggle",{kind:D,opted_out:V,expected_revision:s()});if(l(j),j&&j.conflict){let ne=await n("worker-repo-ops-opt-out-toggle",{kind:D,opted_out:V,expected_revision:s()});l(ne)}r()}async function P(){let D=k();if(!n||D===null)return;let V=await n("worker-repo-operation-deploy-run",{repo_id:D});if(l(V),!V||V.ok!==!0){let j=V&&typeof V.reason=="string"?V.reason:"",ne=Object.hasOwn(j_,j)?j_[j]:j||"\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";_e(`\uBC30\uD3EC \uC2E4\uD589 \uAC70\uBD80 \u2014 ${ne}`,"error")}else _e("\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD588\uC2B5\uB2C8\uB2E4","success");r()}let q={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",repair_session_dispatch:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC790\uB3D9 \uC2E4\uD589",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC"};function W(D,V,j){return c`<div class="worker-repo-ops__policy-group" data-policy=${j}>
      <div class="worker-repo-ops__policy-label">${D}</div>
      <ul class="worker-repo-ops__policy-list">
        ${V.map(ne=>c`<li data-token=${ne}>
              ${q[ne]||ne}
            </li>`)}
      </ul>
    </div>`}function F(){let D=i(),V=D.repo_operation_policy&&typeof D.repo_operation_policy=="object"?D.repo_operation_policy:null;return V?c`<section
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
        ${W("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",V.worker_automatic||[],"worker-automatic")}
        ${W("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",V.never_automatic||[],"never-automatic")}
      </details>
    </section>`:""}return{template(){return c`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언
        </summary>
        ${L(a())} ${F()}
      </details>`}}}var W_=20,qk=5,Nk=new Set(["failed","running","queued","retry_pending"]),gc={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC",job:"\uBA38\uC9C0 \uD6C4 \uC7A1"},B_={verify:"verify",deploy:"deploy",job:"deploy"};function jk(e){if(typeof e!="string")return"";let t=e.split("/").filter(n=>n.length>0);return t.length>0?t[t.length-1]:""}function Fk(e){return!e||typeof e!="object"?"":e.kind==="job"?jk(e.script_path)||gc.job:Object.hasOwn(gc,e.kind)?gc[e.kind]:e.kind}function Bk(e,t,n=W_){let r=[];for(let o of Array.isArray(e)?e:[])!o||typeof o!="object"||r.push({type:"operation",id:o.operation_id,at:typeof o.finished_at=="number"?o.finished_at:typeof o.requested_at=="number"?o.requested_at:null,operation:o});for(let o of Array.isArray(t)?t:[])!o||typeof o!="object"||r.push({type:"cleanup",id:o.bead_id,at:typeof o.at=="number"?o.at:null,cleanup:o});return r.sort((o,i)=>o.at===null&&i.at===null?String(o.id||"").localeCompare(String(i.id||"")):o.at===null?1:i.at===null?-1:i.at-o.at),r.slice(0,Math.max(0,n))}function Uk(e){if(e.type==="cleanup")return!0;let t=e.operation;return Nk.has(t.state)&&!t.dismissed&&!t.superseded_by}function Wk(e,t,n={}){let r=Bk(e,t,1/0),o=n.expanded===!0?W_:qk,i=new Set(r.slice(0,o)),s=r.filter(l=>i.has(l)||Uk(l));return{visible:s,hidden:r.length-s.length}}function U_(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function zk(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function z_(e){let t=e.filter(n=>n.value);return t.length===0?"":c`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(n=>{let r=n.copy===!0?Ur(n.value):n.value;return c`<div>
          <dt>${n.term}</dt>
          <dd>${r}</dd>
        </div>`})}
    </dl>
  </details>`}function H_(e,t="",n=!1){return!e&&!t?"":c`<p
    class="worker-ev__explain${n?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?c`<br />${t}`:""}
  </p>`}function Hk(e,t){if(!e||typeof e!="object")return;let n=t&&typeof t=="object"?t.kind:"";if(!Object.hasOwn(B_,n))return;let r=e[B_[n]],o=r&&typeof r=="object"?r.timeout_ms:void 0;return typeof o=="number"&&Number.isFinite(o)?o:void 0}function Kk(e,t){let n=qf(e,t),r=Nf(e);return!n&&!r?"":c`<p class="worker-ev__why">
    ${n?c`<span class="worker-ev__why-line">${n}</span>`:""}${r?c`<span class="worker-ev__why-line">${r}</span>`:""}
  </p>`}function Gk(e){return e.state!=="failed"||e.superseded_by||e.dismissed?"":c`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-repo-op__dismiss"
      data-operation-id=${e.operation_id}
      title="사람이 확인한 실패로 접수합니다 — 기록은 그대로 남고 해결 필요 집계에서만 빠집니다"
    >
      기록 닫기
    </button>
  </div>`}function Yk(e,t){let n=e.operation,r=n.state==="failed",o=n.failure?n.failure.code:"";return c`<li
    class="worker-ev"
    data-operation-id=${n.operation_id}
    data-state=${n.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?ln(e.at):""}
      >${Ci(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${U_(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what">${Fk(n)}</span>
        <span class="worker-ev__meta"
          >${n.target_base}@${Ti(n.target_sha)}${typeof n.elapsed_ms=="number"?` \xB7 ${zr(n.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${U_(e)}"
          >${zk(e)}</span
        >
        ${n.dismissed?c`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${n.superseded_by?c`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
        ${n.source==="manual"?c`<span
              class="worker-ev__st worker-ev__st--manual"
              title="사람이 배포 실행을 눌러 시작한 작업입니다"
              >수동</span
            >`:""}
      </div>
      ${r?H_(Mf(n.failure_kind,o)):""}
      ${Kk(n,Hk(t,n))}
      ${Gk(n)}
      ${z_([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?o:""},{term:"script",value:[n.script_path||"",n.script_blob_sha?`blob ${Ti(n.script_blob_sha)}`:"",Number.isInteger(n.exit_code)?`exit ${n.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:n.log_path||"",copy:!0},{term:"\uCD9C\uB825",value:n.output_tail||""}])}
    </div>
  </li>`}function Vk(e){let t=e.cleanup,n=Gr(t.step);return c`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?ln(e.at):""}
      >${Ci(e.at)||"\u2014"}</span
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
        ${Fd(t.step).map(r=>c`<li
              class="worker-step worker-step--${r.state}"
              data-step=${r.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${r.label}</span>
            </li>`)}
      </ol>
      ${H_(Sr(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
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
      ${z_([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||"",copy:!0},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function Qk(e){let t=typeof e.hidden=="number"?e.hidden:0,n=e.expanded===!0;return c`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(r=>r.type==="cleanup"?Vk(r):Yk(r,e.repo_ops))}
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
  </section>`}function K_(e,t={}){let n=null;function r(){if(n===null){ft(c``,e);return}let s=Wk(n.operations,n.cleanup_failures,{expanded:n.expanded});ft(Qk({events:s.visible,hidden:s.hidden,expanded:n.expanded,repo:n.repo,repo_ops:n.repo_ops}),e)}e.addEventListener("click",s=>{let l=s.target;if(l?.closest?.('[data-seam="repo-ops-close"]')){i();return}l?.closest?.('[data-seam="repo-ops-more"]')&&n&&(n.expanded=!n.expanded,r())});function o(s){n={operations:s.operations,cleanup_failures:s.cleanup_failures,repo:s.repo||"",repo_ops:s.repo_ops||null,expanded:!1},r()}function i(){n!==null&&(n=null,r(),t.onClose&&t.onClose())}return{open:o,close:i,isOpen:()=>n!==null,refresh(s){n&&(n={operations:s.operations,cleanup_failures:s.cleanup_failures,repo:s.repo||"",repo_ops:s.repo_ops||null,expanded:n.expanded},r())}}}var Xk="session-preferred",Zk=["external_roundtrip","user_feedback_loop"];function G_(e,t){if(!rs(e).includes(Xk)||typeof t!="object"||t===null)return"";let n=t.session_preferred_reason;return typeof n=="string"&&Zk.includes(n)?n:""}var Jk="spec-after-blocker";function Y_(e,t){return rs(e).includes(Jk)&&Array.isArray(t)&&t.length>0}var ew=Bt("views:worker:adapter"),tw="tab:worker:ready",nw="tab:worker:blocked",rw="tab:worker:in-progress",ow="tab:worker:resolved",sw="tab:worker:closed",iw="\u{1F512} blocked",aw={revision:0,auto_advance:!1,auto_merge:!1,slots:zi,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]},lw=["claude_account","codex_account"],cw=[...vo,...lw];function uw(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function dw(e){let t=e&&typeof e=="object"?e.awaiting_user:void 0,n=typeof t=="string"?t.trim():"";return n.length>0?`${_l}: ${n}`:_l}function Er(e){return e&&typeof e=="object"?e:{}}function pw(e){let t={};for(let n of cw){let r=e[n];typeof r=="string"&&r.length>0&&(t[n]=r)}return t}function fw(e){let t=new Map;for(let r of e){if(!r||typeof r.id!="string"||r.id.length===0)continue;let o=Er(r.metadata).carried_from;if(!(typeof o!="string"||o.length===0))for(let i of Ps(r)){let s=t.get(i);s||(s=new Set,t.set(i,s)),s.add(r.id)}}let n=new Map;for(let[r,o]of t)n.set(r,[...o].sort());return n}function _w(e){let t=e.replace(/\/+$/,""),n=t.lastIndexOf("/");return n>=0?t.slice(n+1):t}function V_(e={}){let{queueStore:t,issueStores:n,transport:r,getWorkspacePath:o,onInvalidate:i}=e,s=n?co(n):null,l=new Map,a={},u=null,d=0,m=null,b=!1;function h(){b||!i||i()}function k(P){return u===P?a:{}}async function S(){if(!r||b)return;let P=o?.()||"";if(u===P||m&&m.key===P&&m.generation===d)return;let q=++d;m={key:P,generation:q};let W=null;try{W=await Promise.resolve(r("get-session-defaults",{}))}catch(F){if(q!==d)return;m=null,ew("get-session-defaults failed: %o",F),h();return}q===d&&(a=W&&typeof W.values=="object"&&W.values!==null?{...W.values}:{},u=P,m=null,h())}function T(){u=null,d+=1,S()}function ee(){for(let[P,q]of l)q==="failed"&&l.delete(P)}function re(P,q){return s?s.selectBoardColumn(P,q):[]}function U(P,q,W,F){let D=new Set(W.map(H=>H.id)),V=new Set,j=new Map,ne=[];for(let H of[...q,...W]){if(V.has(H.id)||uw(H))continue;let te=os(H,P);te.location===null&&(V.add(H.id),j.set(H.id,te),ne.push(H))}let me=L_(ne,Jr(F)),Oe=Er(P.bead_scope);return me.map(H=>{let te=j.get(H.id),ce=ao(H),Te=ce.evidence==="published",K=typeof H.workflow?.route=="string"&&H.workflow.route||(H.metadata&&typeof H.metadata.route=="string"?H.metadata.route:""),ae=te.worker_ineligible,Q=ae||!Object.hasOwn(H,"labels")?"":G_(H.labels,H.metadata),de=D.has(H.id),Re=de?Ps(H):[],be=[];de&&Re.length===0&&be.push(iw),te.awaiting_user&&be.push(dw(H.metadata)),te.missing_description?be.push("missing_description"):te.spec==="conflict"?be.push("spec_id_conflict"):te.spec==="none"?be.push("spec \uC5C6\uC74C"):te.spec==="draft"&&be.push("spec \uBBF8\uBC1C\uD589(draft)");let Ie=Oe[H.id];return{bead_id:H.id,title:H.title||H.id,route:K,spec_id:ce.conflict?"":ce.path,published:Te,blocked:de,blocked_by:Re,labels:Array.isArray(H.labels)?H.labels:[],created_at:H.created_at,updated_at:H.updated_at,status:H.status,workflow:H.workflow||null,exec_pins:pw(Er(H.metadata)),rec:null,...Ie&&Array.isArray(Ie.scope)?{scope:Ie.scope}:{},eligible:te.placeable,route_ok:te.route_ok,awaiting_user:te.awaiting_user,missing_description:te.missing_description,placement_spec:te.spec,reason:be.join(" \xB7 "),worker_ineligible:ae,session_preferred:Q.length>0,session_preferred_reason:Q,spec_after_blocker:Y_(H.labels,Re),release_info:H.release_info,dependents_info:H.dependents_info}})}function L(P){let[q,W,F,D,V]=P,j=ei([...q,...W,...F,...D,...V]),ne=fw([...q,...W,...F,...D]),me={},Oe=(H,te)=>{if(!H||typeof H.id!="string"||H.id.length===0)return;let ce=me[H.id]||(me[H.id]={});if(typeof H.priority=="number"&&!("priority"in ce)&&(ce.priority=H.priority),typeof H.from_id=="string"&&!("from_id"in ce)&&(ce.from_id=H.from_id),te&&!("metadata"in ce)){ce.metadata=Er(H.metadata);let Te=Er(H.workflow).route;typeof Te=="string"&&Te.length>0&&(ce.route=Te)}};for(let H of[...q,...W,...F])Oe(H,!0);for(let H of[...D,...V])Oe(H,!1);for(let H of new Set([...Object.keys(me),...j.keys()])){let te=ti(j,H);if(te.total>0){let ce=me[H]||(me[H]={});ce.rollup=te}}for(let[H,te]of ne){let ce=me[H]||(me[H]={});ce.carried_to=te}return me}function R(P,q,W,F){let D=new Set((Array.isArray(P.done)?P.done:[]).map(j=>j?.bead_id).filter(j=>typeof j=="string")),V=[];for(let j of q){let ne=_r(j.closed_at);if(typeof j.id!="string"||D.has(j.id)||ne===null||F!==void 0&&ne<F||typeof j.comment_count!="number"||j.comment_count<=0)continue;let me=`${W}\0${j.id}\0${String(j.updated_at)}\0${j.comment_count}`,Oe=l.get(me);if(Oe===void 0&&r&&(l.set(me,"pending"),Promise.resolve(r("get-comments",{id:j.id})).then(te=>{let ce=Array.isArray(te)&&te.some(Te=>aa(typeof Te?.text=="string"?Te.text:"")?.lane==="session");l.set(me,ce?"session":"not-session"),h()}).catch(()=>{l.set(me,"failed"),h()})),Oe!=="session")continue;let H=_r(j.started_at);V.push({id:j.id,title:j.title||j.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:H!==null&&ne>=H?ne-H:null,work_kind:"session",done_at:ne,created_at:j.created_at,updated_at:j.updated_at})}return V}return{read(P){if(!t)return{workspaces:[],workspaces_state:[]};let q=t.get()||aw,W=o?.()||"",F=P&&typeof P.done_since=="number"?P.done_since:void 0,D=re(tw,"ready"),V=re(nw,"blocked"),j=re(rw,"in_progress"),ne=re(ow,"resolved"),me=re(sw,"closed");return{workspaces:[{...q,bead_titles:{...Er(q.bead_titles),...Object.fromEntries([...D,...V].filter(Oe=>Oe&&typeof Oe.id=="string").map(Oe=>[Oe.id,Oe.title||Oe.id]))},root_dir:W,name:_w(W),runnable:U(q,D,V,P?P.candidate_sort:void 0),session_done:R(q,me,W,F),bead_overlay:L([D,V,j,ne,me])}],workspaces_state:[{root_dir:W,revision:q.revision,auto_advance:q.auto_advance,auto_merge:q.auto_merge,slots:typeof Er(q.workspace_info).slots=="number"?Er(q.workspace_info).slots:q.slots,runner_catalog:q.runner_catalog,execution_defaults:q.execution_defaults,session_defaults:k(W),orchestration_model:q.orchestration_model,orchestration_effort:q.orchestration_effort,orchestration_speed:q.orchestration_speed,quick_fix_orchestration_model:q.quick_fix_orchestration_model,quick_fix_orchestration_effort:q.quick_fix_orchestration_effort,quick_fix_orchestration_speed:q.quick_fix_orchestration_speed,issue_prefix:""}]}},ensureSessionDefaults(){S()},refreshSessionDefaults:T,notifyIssuesChanged:ee,destroy(){b=!0,d+=1,m=null,l.clear()}}}var Ea=1,Q_=5,mw={root_dir:"",name:"",auto_advance:!1,auto_merge:!1,slots:Ea,revision:0,runner_catalog:{},items:[],sublanes:{parallel:[],serial:[]},serial_lane_count:0,raw_queue_length:0,live_count:0,over_cap:!1,merge:{positions:new Map,resolutions:new Map,continuations:new Map,authorities:new Map,state:{active:null,failures:{},waiting:null},auto_excluded:[],running:!1},token_total:null,cleanup_failures:[],declared_base:null,repo_operations:[]};function fn(e){return e&&typeof e=="object"?e:{}}var J_="beads-ui.worker.candidate-filter",hc={show_blocked:!1,readiness:"all",routes:[]},gw=1e3;function hw(){try{let e=window.localStorage.getItem(J_);if(!e)return{...hc};let t=JSON.parse(e);if(!t||typeof t!="object")return{...hc};let n=t.readiness;return{show_blocked:t.show_blocked===!0,readiness:n==="ready"||n==="not_ready"?n:"all",routes:Yr(t.routes)}}catch{return{...hc}}}function bw(e){try{window.localStorage.setItem(J_,JSON.stringify(e))}catch{}}var em="bdui.worker.done-range";function yw(){try{let e=window.localStorage.getItem(em);return e===null?"today":Kn(e)}catch{return"today"}}function vw(e){try{window.localStorage.setItem(em,e)}catch{}}function X_(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function kw(e){return e==="receipt_not_current"?"\uB9AC\uBDF0 \uD6C4\uC5D0\uB3C4 \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC74C":e==="cancelled"?"\uB9AC\uBDF0 \uC138\uC158 \uCDE8\uC18C\uB428":e.startsWith("launch_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uC2DC\uC791 \uC2E4\uD328(${e.slice(14)})`:e.startsWith("session_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uBE44\uC815\uC0C1 \uC885\uB8CC(${e.slice(15)})`:`\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD328(${e})`}function Z_(e){if(e.startsWith("receipt_unbacked:"))return`\uC2E4\uD589 \uC601\uC218\uC99D \uC790\uB3D9 \uAC80\uC99D \uBD88\uAC00(${e.slice(17)}) \u2014 [\uBA38\uC9C0] \uD074\uB9AD\uC73C\uB85C \uC218\uB3D9 \uC9C4\uD589 \uAC00\uB2A5`;switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_rebase_cap":return"\uD050 \uC7AC\uCDA9\uB3CC 3\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"worktree_restore_branch_mismatch":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uBE0C\uB79C\uCE58 \uC774\uB984 \uBD88\uC77C\uCE58";case"worktree_restore_path_exists":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uACBD\uB85C \uC774\uBBF8 \uC788\uC74C";case"worktree_restore_branch_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 origin\uC5D0 \uBE0C\uB79C\uCE58 \uC5C6\uC74C";case"worktree_restore_branch_diverged":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uB85C\uCEEC \uBE0C\uB79C\uCE58\uAC00 origin\uACFC \uB2E4\uB984";case"worktree_restore_failed":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function ww(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function $w(e){return!e||typeof e!="object"?"\uC138\uC158 \uAE30\uB3D9 \uC751\uB2F5\uC744 \uBC1B\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4":e.conflict===!0?"\uD050\uAC00 \uBC14\uB00C\uC5B4 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694":e.session==="already_running"?`\uC774\uBBF8 \uC5F4\uB824 \uC788\uC2B5\uB2C8\uB2E4 \xB7 ${e.tmux_window||"?"}`:e.launched!==!0?`\uC138\uC158 \uAE30\uB3D9 \uC2E4\uD328: ${e.reason||"unknown"}`:e.mode==="fork"?null:`\uC0C8 \uC138\uC158\uC73C\uB85C \uC2DC\uC791 (${e.fallback_reason||"unknown"})`}function xw(e){return e&&e.launched===!0?"success":"error"}function Aw(e){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let t=e.slice(19);if(t.length===0)return null;switch(t){case"gating":return"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function Sw(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}var Ew=new Set(["paused","needs_human","waiting_metadata","reviewing","retrying"]),Tw=new Set(["waiting_metadata","reviewing","retrying"]),bc=new Set(["review_receipt_missing","review_receipt_stale","review_receipt_invalid","review_receipt_undetermined"]);function Cw(e){let t=e&&typeof e=="object"?e.auto_resolution:null,n=t&&typeof t=="object"&&!Array.isArray(t)?t:null;if(!n||!e)return null;let r=typeof n.origin_reason=="string"&&n.origin_reason.length>0?`\uC6D0 \uC0AC\uC720: ${n.origin_reason}`:"";switch(e.phase){case"waiting_metadata":return{label:"\uC815\uC815 \uB300\uAE30",details:[r,"\uBA54\uD0C0\uB370\uC774\uD130 \uC815\uC815\uC774 \uAD00\uCE21\uB418\uBA74 \uC790\uB3D9 \uC7AC\uAC1C"].filter(Boolean),live:!1};case"retrying":{let o=Number.isInteger(n.attempts)?Math.max(0,Number(n.attempts)):0,i=Number.isInteger(n.attempt_cap)&&Number(n.attempt_cap)>0?Number(n.attempt_cap):0,s=typeof n.next_at=="number"?ln(n.next_at):"",l=typeof n.last_error=="string"&&n.last_error.length>0?n.last_error:"";return{label:i>0?`\uC7AC\uC2DC\uB3C4 ${Math.min(o,i)}/${i}`:`\uC7AC\uC2DC\uB3C4 ${o}`,details:[r,s?`\uB2E4\uC74C \uC2DC\uAC01 ${s}`:"",l?`\uB9C8\uC9C0\uB9C9 \uC624\uB958: ${l}`:""].filter(Boolean),live:!0}}default:return null}}function Rw(e){if(typeof e!="string")return"";for(let t of["retry_exhausted:","auto_review_exhausted:"])if(e.startsWith(t))return e.slice(t.length);return""}function Ow(e,t=null){if(!e||typeof e!="object")return null;let n="";switch(e.phase){case"gating":n="\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"merging":n="\uBA38\uC9C0 \uC911";break;case"cleaning":n="\uB9C8\uBB34\uB9AC \uC911";break;case"waiting_metadata":case"reviewing":case"retrying":if(!t)return null;n=t.label;break;case"paused":n="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":n="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let r=[n];e.head_sha&&r.push(`head ${e.head_sha}`),e.base_sha&&r.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&r.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`);let o=Rw(e.terminal_reason);o&&r.push(`\uC6D0 \uC0AC\uC720: ${o}`);let i=e.phase==="needs_human"&&!o?Zr(e.terminal_reason):null;i&&r.push(e.failure_stage?`${e.failure_stage} \xB7 ${i}`:i);for(let s of t?t.details:[])r.push(s);return e.active_attempt_id&&r.push(`attempt ${e.active_attempt_id}`),e.evidence&&r.push(e.evidence),e.log_path&&r.push(e.log_path),{badge:n,title:r.join(`
`),alert:e.phase==="needs_human",lock_actions:!Ew.has(e.phase)}}function Iw(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function Lw(e){if(!e||typeof e!="object")return[];let t=e.badge_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function Dw(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",n=(i,s={})=>{let l=[s.title||"",t].filter(Boolean);return{label:i,title:l.join(`
`),live:s.live===!0,alert:s.alert===!0}};if(e.continuation_required)return n("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.queueing)return e.queueing==="cleanup"?n("\uC815\uB9AC \uC7AC\uC2DC\uB3C4 \uC694\uCCAD \uC911",{title:"\uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9AC\uB294 \uC911\uC785\uB2C8\uB2E4",live:!0}):n("\uD050 \uB4F1\uB85D \uC911",{title:"\uBA38\uC9C0 \uD050\uC5D0 \uB123\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.merge_step)return e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):n("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return n(e.conflict_badge,{live:e.conflict_live===!0});if(e.auto_resolution)return n(e.auto_resolution.label,{title:e.auto_resolution.details.join(`
`),live:e.auto_resolution.live===!0});if(e.recovery?.lock_actions)return n(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return n(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return n("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});let r=Iw(e.receipt_check),o=e.conflicting||e.gate?.reason==="base_behind"||r.length>0;if(e.auto_pending&&o)return n("\uD655\uC778 \uC911",{title:"\uBA38\uC9C0 \uD050\uAC00 \uC790\uB3D9\uC73C\uB85C \uCC98\uB9AC \uC911 \u2014 \uB2E4\uC74C \uAD00\uCE21\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.conflicting)return n("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="base_behind")return n("base \uAC31\uC2E0 \uD544\uC694",{alert:!0});if(bc.has(e.gate?.reason)){let i=e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uC785\uB2C8\uB2E4. [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":e.gate.reason==="review_receipt_invalid"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uAE30\uB85D\uC774 \uC131\uB9BD\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":e.gate.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC758 ancestry probe\uB97C \uC644\uB8CC\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4";if(e.review_session?.active===!0)return n(e.review_session.origin==="auto"?"\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911":"\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911",{title:`${i}
\uB9AC\uBDF0 \uC138\uC158\uC774 \uC2E4\uD589 \uC911\uC785\uB2C8\uB2E4 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4`,live:!0});if(e.auto_review_wait==="slot")return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uB9AC\uBDF0 \uC138\uC158 \uC2AC\uB86F \uB300\uAE30",{title:`${i}
\uC2E4\uD589 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uC790\uB3D9\uC73C\uB85C \uB9AC\uBDF0 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4. \uC9C0\uAE08 \uD074\uB9AD\uD558\uBA74 \uC989\uC2DC \uB744\uC6C1\uB2C8\uB2E4`,live:!0});if(e.review_session?.failure){let s=e.review_dispatch?.state==="exhausted"&&e.review_session.origin==="auto";return n(`\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 ${s?"\uC790\uB3D9 \uB9AC\uBDF0 1\uD68C \uC18C\uC9C4 \xB7 ":""}${kw(e.review_session.failure)}`,{title:`${i}
\uC9C1\uC804 \uB9AC\uBDF0 \uC138\uC158 \uC885\uB8CC \uC0AC\uC720: ${e.review_session.failure}`,alert:!0})}return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:i,alert:!0})}return e.gate?.reason==="spec_id_missing"?n("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0}):r.length>0?n(`\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694 \xB7 ${r[0]}`,{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${r.join(", ")}`,alert:!0}):e.recovery?n(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?n("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?n(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${Z_(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?n(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${Z_(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?n(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?n("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?n("\uB2EB\uD798",{alert:!0}):e.activity?n("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?n("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?n("\uD655\uC778 \uC911"):e.gate?.gate_badge?n(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function Pw(e,t,n,r,o=null,i=null,s=null,l=!1,a=null,u=!0,d=null,m=null,b=null,h={},k=!1,S={},T=null,ee={active:!1,failure:null,origin:null},re=!1){let U=!!a&&a.position>0,L=!!a?.continuation_action&&a.continuation_action.continuation===null,R=!!a&&a.active===!0,P=a&&a.failure||null,q=Aw(a?a.waiting:null),W=n[e]||null,F=W&&W.gate?W.gate:null,D=W&&W.pr?W.pr:null,V=Sw(a?a.resolution:null),j=Cw(b),ne=Ow(b,j),me=a&&a.authority||null,Oe=a&&a.review_dispatch||null,H=a?.hold?.auto_review_wait==="slot"?"slot":null,te=!!b&&typeof b=="object"&&Tw.has(b.phase),ce=U&&!R&&(!me||te||me.source==="automatic"&&!k),Te=s==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":V?V.badge:s==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":q,K=!!F&&F.base_badge==="\uCDA9\uB3CC",ae=!!F&&F.enabled===!0,Q=ds({bead_id:e,merge_sha:S.merge_sha,cleanup_cursor:S.cleanup_cursor,merge_progress:i&&i.merge_progress?i.merge_progress:null,cleanup_failed:r,repo_operations:S.repo_operations}),de=Ui(Q),Re=i&&!Q&&(i.queueing??null)?i.queueing:null,be=!!r&&["repo_operations","post_merge_jobs","child_sweep","branch_cleanup","parent_close"].includes(r.step)&&!!F&&F.tier==="merged",Ie=r&&r.step==="repo_operations"&&Q?.failed===!0&&(Q.step==="deploy"||Q.step==="verify")?Q.step:null,Ye=l&&!!r&&!!F&&F.tier==="merged",_t=ce&&(ae||K||F?.reason==="base_behind"||bc.has(F?.reason)||be||Ye),G=bc.has(F?.reason),pe=l&&K&&u===!1,oe=ar(h,e,{external:l,merge_active:R||Q?.step==="merge",merge_queued:U,conflict_active:!!s,cleanup_active:de,merged:!!r||F?.tier==="merged"}),Y=!!oe.operation,we=!!r||b?.phase==="needs_human"||!!oe.error,fe=U&&!P&&!L&&!be&&!(ne&&ne.lock_actions),Ce=Dw({auto_pending:fe,continuation_required:L,queueing:Re,merge_step:Q,conflict_badge:Te,conflict_live:V?.live===!0||s==="running",auto_resolution:j,recovery:ne,cleanup_failed:r,cleanup_label:r?Gr(r.step):null,base_exception:m,conflicting:K,gate:F,receipt_check:W&&W.receipt_check?W.receipt_check:null,queue_failure:P,auto_skip:d,queued:U,queue_active:R,queue_position:a?a.position:0,review_session:ee,review_dispatch:Oe,auto_review_wait:H,activity:Te?null:i&&i.activity||null}),Ne=Ce?.live===!0&&Ce.title?c`<span title=${Ce.title}>${Ce.label}</span>`:Ce?.label||null,Qe=Lw(W&&W.receipt_check?W.receipt_check:null);return{id:e,title:l?c`${t}<span class="muted"> · 세션</span>`:t,reason:r&&Q?.active!==!0?Bi(r.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",...T?{dependency_chips:T}:{},external:l,pr_number:D&&typeof D.number=="number"?D.number:null,pr_url:D&&typeof D.url=="string"?D.url:"",completion_badge:Ce?.live!==!0&&Ce?.title?Ce.label:null,completion_title:Ce?.title||"",...b?.phase==="needs_human"&&typeof b.log_path=="string"&&b.log_path.length>0?{log_path:b.log_path}:{},...Qe.length>0?{receipt_badge:{codes:Qe}}:{},badges:Ne?[Ne]:[],live_badge:Ce?.live===!0?Ne:null,usage:o,alert:Ce?.alert===!0,merge_action:F?.tier==="merged"&&!be&&!Ye?!1:!U||L||ce||G,cancel_action:U&&!L,cancel_enabled:!R&&!(ne&&ne.lock_actions),cancel_title:ne&&ne.lock_actions?`${ne.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:R?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:oe,discard_action:oe.action,resolve_action:we,resolve_enabled:!re,resolve_title:re?"\uC138\uC158 \uAE30\uB3D9 \uC694\uCCAD \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":"\uC774 \uC2E4\uD328\uB97C \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 \u2014 \uAE30\uB85D\uB41C \uC138\uC158\uC774 \uC788\uC73C\uBA74 fork\uD558\uACE0, \uC5C6\uC73C\uBA74 \uC0C8 \uC138\uC158\uC5D0 \uC0AC\uC720\uB97C \uC2E3\uC2B5\uB2C8\uB2E4",merge_step:Q,discard_enabled:oe.enabled,discard_title:oe.title,merge_enabled:!Q&&!Re&&!s&&!Y&&!m&&!(ne&&ne.lock_actions)&&!pe&&ee.active!==!0&&(ae||K||F?.reason==="base_behind"||G||be||Ye||_t||te&&!R),merge_label:L?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":be||Ye?Ie==="deploy"?"\uBC30\uD3EC \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":Ie==="verify"?"\uAC80\uC99D \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":"\uC815\uB9AC \uC7AC\uC2DC\uB3C4":K&&!Q&&!be?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":F?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":G?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":ce?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:Y?oe.error?`\uD3D0\uAE30 \uC2E4\uD328: ${oe.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${oe.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:L?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Re?"\uC694\uCCAD\uC744 \uBCF4\uB0B4\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":Q?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${Q.label}`:Ie?`\uBA38\uC9C0 \uC644\uB8CC \u2014 ${Ie==="deploy"?"\uBC30\uD3EC":"\uAC80\uC99D"} \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD574 \uC815\uB9AC\uAC00 \uBA48\uCDC4\uC2B5\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uC800\uC7A5\uC18C \uC791\uC5C5\uBD80\uD130 \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4`:Ye?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":pe?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":s==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":s==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":be?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":K?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":F?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":ee.active===!0?ee.origin==="auto"?"\uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":F?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uB9AC\uBDF0\uB9CC \uC218\uD589\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":F?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":F?.reason==="review_receipt_invalid"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uAE30\uB85D\uC774 \uC131\uB9BD\uD558\uC9C0 \uC54A\uC74C \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":F?.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D ancestry probe \uBBF8\uC644\uB8CC \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC0C8 \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":F?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":ae?`\uBA38\uC9C0 (${F.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:F&&F.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${F&&F.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function yc(e,t={}){let{transport:n,issueStores:r,queueStore:o,sessionLogStore:i,gotoIssue:s,getWorkspacePath:l,switchWorkspace:a,openDoc:u,doneRange:d,onDoneRangeChange:m}=t,b=r?co(r):null,h=hw(),k=null,S=null,T=null,ee=null,re=null,U=ho(()=>_()),L=new Map,R=new Map,P=R_(),q=_c(P)===null,W=d?Kn(d):yw();function F(){let w=ro.find(y=>y.value===W);return w?w.label:"\uC624\uB298"}let D=_a("beads-ui.worker.lane-collapsed"),V=!1,j="";function ne(){return j.trim().length>0}function me(w){return ne()?w.filter(y=>y.search_match===!0).length:void 0}let Oe=new Set,H=new Set,te=new Set,ce=new Set,Te=new Set,K=new Set,ae=null,Q=[],de=V_({queueStore:o,issueStores:r,transport:n,getWorkspacePath:l,onInvalidate:()=>_()});function Re(){de.refreshSessionDefaults()}let be=document.createElement("div");be.className="worker-console";let Ie=document.createElement("div");Ie.className="worker-top";let Ye=document.createElement("div");Ye.className="worker-drawer-overlay",Ye.hidden=!0;let _t=document.createElement("div");_t.className="worker-drawer-overlay__backdrop";let G=document.createElement("div");G.className="worker-drawer-host";let pe=document.createElement("div");pe.className="worker-drawer-host",pe.hidden=!0,Ye.append(_t,G,pe);let oe=document.createElement("div");oe.className="worker-lanes-host",be.append(Ie,Ye,oe),e.appendChild(be);let Y=$r(null,null),we=[],fe=ga({transport:n,console_el:be,getLanes:()=>Y,getWorkspaces:()=>we,getCrossLanes:()=>null,reproject:()=>({lanes:B(),raw_lanes:null}),onCorrection:()=>{},showToast:_e,requestRender:()=>_(),adoptQueue:(w,y)=>{o&&o.set(y)},onDragBegin:()=>{S=null}}),Ce=null,Ne=Oo(G,{transport:n,sessionLogStore:i,onClose:()=>{Ce=null,Ye.hidden=!0,_()}}),Qe=K_(pe,{onClose:()=>{pe.hidden=!0,Ye.hidden=!0,_()}}),Fe=N_({getWorkspacePath:l||(()=>"")}),J=l&&l()||"",X=F_({queueStore:o,transport:n,onChanged:()=>_(),onOpenScript:(w,y)=>{Fe.open(w,y)}});function Ee(){return o&&o.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:Ea,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function Je(w){let y=ha(w,Ee());y&&(re=y,_())}function st(){re=null,_()}function Ue(){let w=ya(re);w&&(re=null,_(),$(w.attempt_id,"session",w.payload))}function et(w){if(!S||!w.some(C=>C.id===S))return null;let y=ss(Ee());return y?{bead_id:S,lanes:y}:null}function vt(){return l&&l()||""}async function ut(w,y){await fe.sendOp({type:"worker-queue-place",payload:{bead_id:w,...y==="parallel"?{}:{lane:y}},root_dir:vt()},w)}function Ze(){let w=Ee();return typeof w.revision=="number"?w.revision:0}function dt(w){w&&w.queue&&o&&o.set(w.queue)}async function Zt(w){if(!n||!w)return;let y=await n("worker-attempt-pause",{attempt_id:w});y&&y.paused===!1&&y.reason&&_e(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${y.reason}`,"error",2400)}async function $(w,y="session",C={}){if(!n||!w)return;let ie=n,$e=Ee().attempts?.[w]||null;await fo({context:{bead_id:$e?.bead_id||"",kind:y,tuple:$e?Rn($e):""},transport:Me=>ie("worker-attempt-resume",{attempt_id:w,expected_revision:Ze(),...C,...Me}),adopt:dt})}async function Z(w,y,C=!0){if(!n)return null;let ie=n,$e=await ie(w,{...y,expected_revision:Ze()});return dt($e),$e&&$e.conflict&&C&&($e=await ie(w,{...y,expected_revision:Ze()}),dt($e)),$e}async function qe(w){if(!n||!w)return;let y=Ee().merge_queue?.find(ie=>ie.bead_id===w)?.continuation_action;if(y?.mismatch&&y.continuation===null){await kt(w,y.mismatch);return}Oe.add(w),_();let C;try{C=await Z("worker-merge-queue-add",{bead_id:w})}catch{_e("\uBA38\uC9C0 \uD074\uB9AD\uC774 \uC11C\uBC84\uC5D0 \uC804\uB2EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4(\uC5F0\uACB0 \uBB38\uC81C) \u2014 \uC5F0\uACB0 \uBCF5\uAD6C \uD6C4 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",3200);return}finally{Oe.delete(w),_()}if(!(!C||C.applied)){if(C.conflict){_e("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}_e(ww(C.reason),"error",2400)}}async function Se(w){if(!(!n||!w||H.has(w))){H.add(w),_();try{let y=await n("worker-cleanup-retry",{bead_id:w,expected_revision:Ze()});dt(y),y&&!y.retried&&!y.conflict&&y.reason&&_e(`\uC815\uB9AC \uC7AC\uC2DC\uB3C4 \uAC70\uBD80: ${y.reason}`,"error",2400)}finally{H.delete(w),_()}}}async function De(w){if(!(!n||!w||te.has(w))){te.add(w),_();try{let y=await n("worker-resolve-in-session",{bead_id:w,expected_revision:Ze()});dt(y);let C=$w(y);C!==null&&_e(C,xw(y),4e3)}finally{te.delete(w),_()}}}async function je(w,y){let C=Ee().hold;if(!n||!C||typeof C.since!="number")return;let ie=await n(w,{since:C.since});dt(ie),ie&&ie.ok===!1&&_e(`${y}: ${ie.reason==="hold_changed"?"\uD050 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694":ie.reason||""}`,"error",2800)}async function lt(w){if(!n||!w)return;let y=await n("worker-queue-start-now",{bead_id:w});dt(y),y&&y.ok===!1&&_e(`\uC9C0\uAE08 \uC2DC\uC791 \uAC70\uBD80: ${y.reason==="not_waiting"?"\uC774 \uC774\uC288\uB294 \uB354 \uC774\uC0C1 \uB300\uAE30 \uB808\uC778\uC5D0 \uC5C6\uC2B5\uB2C8\uB2E4":y.reason||""}`,"error",2800)}async function kt(w,y){let C=await br({continuation_mismatch:y},($e,Me)=>Z("worker-merge-queue-add",{bead_id:w,continuation:$e,decision_token:Me},!1)),ie=C?.queue?.merge_queue?.find($e=>$e.bead_id===w)?.continuation_action;if(C?.applied!==!0&&ie?.continuation===null&&ie.mismatch){await kt(w,ie.mismatch);return}C&&C.applied===!1&&!C.conflict&&_e("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function se(w){if(!n)return;let y=await Z("worker-merge-auto-toggle",{on:w});!y||y.conflict||_e(w?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",w?"success":"info",2400)}async function ge(w){if(!n||!w)return;let y=await Z("worker-merge-queue-remove",{bead_id:w});y&&!y.conflict&&!y.applied&&y.reason==="merge_active"&&_e("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function Ge(){await Z("worker-merge-queue-remove",{all:!0})}async function it(w,y=null,C="unmerged",ie=null){if(!n||!w)return;let $e=as(w,C);if(!(!!ie||typeof globalThis.confirm!="function"||globalThis.confirm($e)))return;let Xe=await n("worker-discard",{bead_id:w,...y?{attempt_id:y}:{},...ie?{operation_id:ie}:{},expected_revision:Ze()});if(dt(Xe),Xe&&Xe.conflict&&(Xe=await n("worker-discard",{bead_id:w,...y?{attempt_id:y}:{},...ie?{operation_id:ie}:{},expected_revision:Ze()}),dt(Xe)),Xe&&Xe.discarded===!0){_e(Oi(Xe),"success",5e3);return}if(Xe&&Xe.reason){_e(`\uD3D0\uAE30 \uC2E4\uD328: ${Xe.reason}`,"error",2800);return}if(Xe&&Xe.accepted&&Xe.pending==="merged_revert"){_e("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(Xe&&Xe.accepted&&!Xe.discarded){_e(`\uD3D0\uAE30 \uC9C4\uD589: ${Xe.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}Xe&&!Xe.conflict&&_e("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function ze(w,y,C){if(!n||!w||!y||typeof globalThis.confirm=="function"&&!globalThis.confirm(ls(w,C)))return;let ie=await n("worker-discard-abandon",{bead_id:w,operation_id:y,expected_revision:Ze()});if(dt(ie),ie&&ie.conflict&&(ie=await n("worker-discard-abandon",{bead_id:w,operation_id:y,expected_revision:Ze()}),dt(ie)),ie&&ie.abandoned===!0){_e(Ri(C),"success",5e3);return}if(ie&&ie.reason){_e(`\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: ${ie.reason}`,"error",2800);return}ie&&!ie.conflict&&_e("\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: unknown","error",2800)}async function mt(w,y,C){if(!(!n||!y||!C||Te.has(y))){Te.add(y),_();try{let ie=await n(w,{bead_id:y,action_id:C,expected_revision:Ze()});dt(ie),ie?.conflict?_e("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!ie?.ok&&ie?.reason&&_e(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(ie.reason)}`,"error",2800)}finally{Te.delete(y),_()}}}async function gt(w,y){if(!n||!y||ce.has(y))return;ce.add(y),_();let C;try{let ie=async($e={})=>await n(w,{bead_id:y,expected_revision:Ze(),...$e});C=await ie(),dt(C),C&&C.conflict&&(C=await n(w,{bead_id:y,expected_revision:Ze()}),dt(C)),w==="worker-revise-fix"&&(C=await br(C,($e,Me)=>ie({continuation:$e,decision_token:Me}),{onResult:dt,refresh:()=>ie()}))}finally{ce.delete(y),_()}if(!(!C||C.conflict)){if(C.ok){_e(w==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}_e(`\uCC98\uBD84 \uAC70\uBD80: ${C.reason||""}`,"error",3e3)}}async function nt(w){if(!n)return;let y=await n("worker-automation-toggle",{on:w,expected_revision:Ze()});dt(y),y&&y.conflict&&await n("worker-automation-toggle",{on:w,expected_revision:Ze()}).then(dt)}async function Pe(w){if(!n||!w)return;let y=await n("worker-repo-operation-dismiss",{operation_id:w});dt(y),y&&y.ok===!1&&_e(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${y.reason||""}`,"error",3e3)}async function A(w){if(!n||!Number.isFinite(w))return;let y=Math.max(Ea,Math.floor(w)),C=await n("worker-queue-set-slots",{slots:y,expected_revision:Ze()});dt(C),C&&C.conflict&&await n("worker-queue-set-slots",{slots:y,expected_revision:Ze()}).then(dt)}async function N(w){if(!n||!Number.isInteger(w)||w<1||w>Q_)return;let y=Ee(),C=(Array.isArray(y.serial_lanes)?y.serial_lanes:[]).slice(w).reduce((Me,Xe)=>Me+(Array.isArray(Xe?.entries)?Xe.entries.length:0),0),ie=()=>({count:w,expected_revision:Ze()}),$e=await n("worker-queue-set-serial-lane-count",ie());dt($e),$e&&$e.conflict&&($e=await n("worker-queue-set-serial-lane-count",ie()),dt($e)),$e&&$e.applied&&C>0&&_e(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${C}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}function B(){let w=Nr(W),y=de.read({candidate_sort:P,done_since:w});return we=y.workspaces,Y=$r(y.workspaces,y.workspaces_state,{done_since:w,candidate_filter:h,candidate_hidden_counts:"per_control",candidate_sort:"as_given",groups:"all",search:j}),Y}function ke(w){return w.queue_groups[0]||mw}function ye(w){let y=w.dependency_chips||null,C={...y&&y.released?{released:y.released}:{},...y&&y.dependents?{dependents:y.dependents}:{}},ie=L.get(w.id),$e=R.get(w.id)||null,Me=ie&&ie.overlaps.length>0?ie.overlaps:null,Xe=!!ie&&ie.scope_missing;return!$e&&!Me&&!Xe&&Object.keys(C).length===0?null:{...C,...$e?{predecessors:$e}:{},...Me?{overlaps:Me}:{},...Xe?{scope_missing:!0}:{}}}function pt(w){return{...w,workspace_name:"",done_layout:void 0,dependency_chips:ye(w)||void 0,chip_popover:wt(w)}}function wt(w){return qi(w,y=>U.isOpen({bead_id:w.id,chip_key:y}))}function yt(){let w=Ee(),y=new Map;for(let C of Object.values(fn(w.lane_states))){let ie=Array.isArray(C?.corrections)?C.corrections:[];for(let $e of ie)$e&&typeof $e.bead_id=="string"&&typeof $e.after=="string"&&y.set($e.bead_id,$e.after)}return{admission:fn(w.admission),correction_after:y}}function Tt(w,y){let C=pt(w),ie=Od(y.admission[w.id]||null,!!w.discard||Te.has(w.id)),$e=y.correction_after.get(w.id);return{...C,draggable:C.draggable===!0&&!ie,stale_work:ie,reason:ie?"":C.reason,badges:$e?[`\u{1F517} ${$e} \uB4A4 (blocks \uC790\uB3D9)`,...C.badges||[]]:C.badges,revise_enabled:C.revise_enabled===!0&&!ce.has(w.id)}}function jt(w){let y=yt();return ke(w).sublanes.parallel.map(C=>Tt(C,y))}function Ut(w){let y=yt();return ke(w).sublanes.serial.map(C=>{let ie=C.occupants.map($e=>({id:$e.id,title:$e.title,draggable:!1,lane:C.id,ghost:!0,badges:[$e.badge],...typeof $e.search_match=="boolean"?{search_match:$e.search_match}:{}}));return{id:C.id,index:C.index+1,raw_length:C.raw_length,ghosts:ie,items:C.items.map($e=>Tt($e,y)),occupied:C.occupied_by.length>0,badge:C.occupants.length>0?C.occupants[0].badge:"\uB300\uAE30",cycle:C.cycle===!0}})}function Yt(w){return w.runnable.map(y=>pt(y))}function St(w){return w.done.map(y=>pt(y))}function sn(w){let y=w.running.filter(C=>C.non_occupying!==!0).map(C=>({...C,bead_id:C.id,attempt_id:C.attempt_id||"",paused:C.run_state==="paused",failed:C.run_state==="failed",parked:C.run_state==="parked",retry_wait:C.run_state==="retry_wait",waiting:C.run_state==="waiting",wait:C.wait||null,provider_hold:C.run_state==="provider_hold",hold:C.hold?{...C.hold,open:ee===C.attempt_id}:null,status_label:C.run_state==="failed"?C.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328":C.run_state==="parked"?"\uC138\uC158 \uB300\uAE30":C.run_state==="retry_wait"?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":C.run_state==="waiting"?"\uC120\uD589 \uB300\uAE30":C.run_state==="provider_hold"?"\uACF5\uAE09\uC790 \uBCF4\uB958":void 0,can_pause:C.can_pause!==!1,workspace_name:"",dependency_chips:ye(C)||void 0,chip_popover:wt(C),rollup_expanded:K.has(C.id),failure:C.failure?{...C.failure,open:T===C.attempt_id}:null,...Do(C.id,{discard:C.discard,parked:C.run_state==="parked"},te.has(C.id))}));return[...y.filter(C=>C.failed===!0),...y.filter(C=>C.failed!==!0&&C.parked===!0),...y.filter(C=>C.failed!==!0&&C.parked!==!0)]}function Wt(w){return Pt(w).map(y=>({...y,chip_popover:wt(y)}))}function Pt(w){if(ae&&ae.model===w)return ae.rows;let y=Ee(),C=ke(w),ie=fn(y.attempts),$e=Object.values(ie).filter(ir),Me=new Map;for(let We of $e)Me.set(We.attempt_id,We);let Xe=new Map;for(let We of $e)Xe.set(We.bead_id,We);let Rt=new Map;for(let We of[...w.pr_wait,...w.running,...w.queue,...w.runnable,...w.done])Rt.has(We.id)||Rt.set(We.id,We);let tn=We=>{let Nt=null;for(let Cn of $e)!Cn||Cn.bead_id!==We||Sl(Cn,Me)||(Nt===null||(typeof Cn.started_at=="number"?Cn.started_at:0)>=(typeof Nt.started_at=="number"?Nt.started_at:0))&&(Nt=Cn);return Nt&&typeof Nt.target_base=="string"?Nt.target_base:null},ct=new Map;for(let We of w.running)We.run_state==="failed"||We.conflict_resolution!==!0||(We.run_state!=="paused"?ct.set(We.id,"running"):ct.has(We.id)||ct.set(We.id,"paused"));let dn=fn(y.auto_merge_skips),An=new Set(C.merge.auto_excluded),Or=fn(y.pr_observations),Hn=fn(y.pr_activity),Zn=fn(y.cleanup_failed),Jn=fn(y.discard_operations),er=fn(y.bead_workflow),un=fn(y.bead_titles),tr=y.merge_queue_state||{active:null,failures:{}},pr=C.merge.state.waiting,fr=new Map;for(let We of Array.isArray(y.merge_queue)?y.merge_queue:[])We&&typeof We=="object"&&We.bead_id&&fr.set(We.bead_id,We);let Ir=(Array.isArray(y.pr_wait)?y.pr_wait:[]).map(We=>{let Nt=Rt.get(We.bead_id);return{...Pw(We.bead_id,Nt?.title||un[We.bead_id]||We.bead_id,Or,Zn[We.bead_id]||null,sr(ie,We.bead_id),Hn[We.bead_id]||(Oe.has(We.bead_id)?{activity:null,merge_progress:null,queueing:"merge"}:H.has(We.bead_id)?{activity:null,merge_progress:null,queueing:"cleanup"}:null),ct.get(We.bead_id)||null,We.external===!0,{position:C.merge.positions.get(We.bead_id)||0,active:tr.active===We.bead_id,failure:fn(tr.failures)[We.bead_id]||null,waiting:pr&&pr.bead_id===We.bead_id?pr.reason:null,resolution:C.merge.resolutions.get(We.bead_id),continuation_action:C.merge.continuations.get(We.bead_id),authority:C.merge.authorities.get(We.bead_id)||null,hold:fr.get(We.bead_id)?.hold||null,review_dispatch:fr.get(We.bead_id)?.review_dispatch||null},We.wt_present!==!1,y.auto_merge===!0&&An.has(We.bead_id)?dn[We.bead_id]?.reason||"":null,Al(C.declared_base,tn(We.bead_id)),fn(y.completion_status)[We.bead_id]||null,Jn,y.auto_merge===!0,{merge_sha:We.merge_sha,cleanup_cursor:We.cleanup_cursor,repo_operations:C.repo_operations},Nt?ye(Nt):null,Sd(ie,We.bead_id),te.has(We.bead_id)),...Nt?.search_match===void 0?{}:{search_match:Nt.search_match},workflow:er[We.bead_id]||null,priority:Nt?.priority,from_id:Nt?.from_id,...Nt?.created_at===void 0?{}:{created_at:Nt.created_at},...Nt?.updated_at===void 0?{}:{updated_at:Nt.updated_at}}});return ae={model:w,rows:Ir},Ir}function Ft(w){let y=ke(w),C=[];for(let Me of w.running)Me.non_occupying!==!0&&C.push({id:Me.id,title:Me.title,location_label:"\uC2E4\uD589\uC911",kind:"running",lane_id:Me.serial_lane_id??null});for(let Me of w.pr_wait)C.push({id:Me.id,title:Me.title,location_label:"PR \uB300\uAE30",kind:"pr_wait",lane_id:null});for(let Me of y.sublanes.serial)Me.items.forEach((Xe,Rt)=>{C.push({id:Xe.id,title:Xe.title,location_label:`${Me.id} #${Rt+1}`,kind:"serial",lane_id:Me.id})});y.sublanes.parallel.forEach((Me,Xe)=>{C.push({id:Me.id,title:Me.title,location_label:`#${Xe+1}`,kind:"parallel",lane_id:null})});for(let Me of w.runnable)C.push({id:Me.id,title:Me.title,location_label:"\uD6C4\uBCF4",kind:"candidate",lane_id:null,queue_placeable:Me.queue_placeable===!0});let ie=Ee();L=D_(ie.bead_scope,C);let $e=new Map;for(let Me of[...w.running,...w.runnable])Array.isArray(Me.blocked_by)&&Me.blocked_by.length>0&&$e.set(Me.id,Me.blocked_by);for(let[Me,Xe]of Object.entries(fn(ie.bead_blocked_by)))Array.isArray(Xe)&&$e.set(Me,Xe.filter(Rt=>typeof Rt=="string"&&Rt.length>0));R=Hd($e,C,fn(ie.blocker_workspaces))}function zt(w){let y=w.hold&&typeof w.hold=="object"?w.hold:null;if(!y||y.kind!=="env"&&y.kind!=="systemic")return"";let C=Sr(y.cause)||String(y.cause||""),ie=Array.isArray(w.lineages)?w.lineages:[];if(y.kind==="env"){let Me=ie.map(Rt=>Rt&&Rt.next_at).filter(Rt=>typeof Rt=="number").sort((Rt,tn)=>Rt-tn)[0],Xe=typeof Me=="number"?` \xB7 \uB2E4\uC74C ${new Date(Me).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}`:"";return c`<div class="worker-hold worker-hold--env" role="status">
        <span class="worker-hold__text"
          >환경 보류: ${C} — 재시도 대기${Xe}</span
        >
        <button
          type="button"
          class="worker-hold__retry"
          title="예약된 재시도를 지금 실행합니다"
        >
          지금 재시도
        </button>
      </div>`}let $e=(Array.isArray(y.bead_ids)?y.bead_ids:[]).filter(Me=>typeof Me=="string"&&Me.length>0);return c`<div class="worker-hold worker-hold--systemic" role="alert">
      <span class="worker-hold__text"
        >${C}${$e.length>0?` \u2014 bead ${$e.join(", ")}`:""}</span
      >
      <button
        type="button"
        class="worker-hold__resume"
        title="정지를 풀고 멈춰 있던 bead를 다시 디스패치합니다"
      >
        재개
      </button>
    </div>`}function xe(w){let y=[];for(let[ct,dn]of Object.entries(fn(w.provider_hold)))for(let An of Array.isArray(dn?.targets)?dn.targets:[])y.push({runner:ct,target:An});if(y.length===0)return"";let C=y.find(ct=>ct.target?.kind==="outage");if(C){let ct=typeof C.target.next_probe_at=="number"?new Date(C.target.next_probe_at).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"}):"";return c`<div class="worker-provider-gate" role="status">
        ⚠️ ${C.runner} 공급자 장애 — 신규 디스패치
        보류${ct?`, \uB2E4\uC74C \uD504\uB85C\uBE0C ${ct}`:""}
      </div>`}let ie=Array.isArray(fn(w.account_catalog).claude)?fn(w.account_catalog).claude:[],$e=ct=>ie.find(An=>An?.email===ct)?.alias||ct,Me=y.find(ct=>typeof ct.target?.account!="string"),Xe=ct=>typeof ct?.resets_at=="number"?new Date(ct.resets_at).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"}):"";if(Me){let ct=Xe(Me.target);return c`<div class="worker-provider-gate" role="status">
        ⏳ ${Me.runner} 사용 한도 — 계정 미확인이라 러너 전체 디스패치
        보류${ct?`, \uB9AC\uC14B ${ct}`:""}
      </div>`}let Rt=[...new Set(y.map(ct=>$e(String(ct.target.account))))],tn=Xe(y[0].target);return c`<div class="worker-provider-gate" role="status">
      ⏳ ${Rt.join(", ")} 사용 한도 —
      ${Rt.length>1?"\uADF8 \uACC4\uC815\uB4E4":"\uADF8 \uACC4\uC815"} 디스패치
      보류${tn?`, \uB9AC\uC14B ${tn}`:""}
    </div>`}function E(w){let y=Ee(),C=ke(w),ie=C.sublanes.parallel,$e=ie.length>0?ie[0].id:"\u2014",Me=c`<button
      type="button"
      class="worker-play${y.auto_advance?" is-active":""}"
    >
      ${y.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,Xe=$t(w),Rt=C.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",tn=y.auto_advance?0:(Array.isArray(y.queue)?y.queue:[]).filter(un=>un&&typeof un.armed_by_lane=="string"&&un.armed_by_lane.length>0).length,ct=tn>0?c`<span
            class="worker-kpi__chip worker-kpi__chip--armed"
            title="모니터 연결 레인이 발차한 대기 행입니다 — 이 레포의 자동 진행은 꺼진 채입니다"
            >⏸ 자동 진행 꺼짐 · 연결 레인 ${tn}건 진행 중</span
          >`:"",dn=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${C.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${Wt(w).length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${F()} 완료 <b>${w.done.length}</b></span
      >`,An=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${C.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${C.declared_base||"?"}</span
    >`,Or=c`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${Ea}
          step="1"
          .value=${String(C.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:Q_},(un,tr)=>tr+1).map(un=>c`<option
                value=${String(un)}
                ?selected=${C.serial_lane_count===un}
              >
                ${un}
              </option>`)}
        </select>
      </label> `,Hn=c`<input
      type="search"
      class="worker-search"
      placeholder="ID·제목 검색"
      aria-label="이슈 검색 (ID·제목)"
      .value=${j}
    />`,Zn=Td(C.repo_operations,C.cleanup_failures),Jn=zt(y),er=xe(y);return V?c`<div class="worker-ribbon">
          ${Me} ${Xe}
          <div class="worker-kpi worker-kpi--ribbon">
            ${Rt}${ct}${dn}
          </div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${Or}${Hn}</div>
          <div class="worker-kpi">${An}</div>
        </div>
        ${er}${Jn}${Zn}${X.template()}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">
          ${Me}${Xe}${Or}${Hn}
        </div>
        <div class="worker-kpi">
          ${Rt}${ct}${dn}${An}
          ${(Array.isArray(C.token_total)?C.token_total:C.token_total?[{label:C.token_total,tooltip:`${F()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(un=>c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${un.tooltip}
                >${F()} 완료 · 누적 ${un.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${$e}</b></span
          >
        </div>
      </div>
      ${er}${Jn}${Zn}${X.template()}`}function he(w){let y=w.runnable_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${h.show_blocked}
        />
        🔒 blocked${y.blocked>0?` ${y.blocked}`:""}
      </label>
      <div
        class="worker-filter__readiness"
        role="group"
        aria-label="준비도 필터"
      >
        ${fs.map(C=>c`<button
              type="button"
              class="worker-filter__chip${h.readiness===C.value?" is-active":""}"
              data-readiness=${C.value}
              aria-pressed=${h.readiness===C.value?"true":"false"}
            >
              ${C.label}
            </button>`)}
        ${y.readiness>0?c`<span class="worker-filter__hidden"
              >숨김 ${y.readiness}</span
            >`:""}
      </div>
      <div class="worker-filter__routes" role="group" aria-label="route 필터">
        ${_s.map(C=>c`<button
              type="button"
              class="worker-filter__chip worker-filter__route${h.routes.includes(C.value)?" is-active":""}"
              data-route=${C.value}
              aria-pressed=${h.routes.includes(C.value)?"true":"false"}
            >
              ${C.label}
            </button>`)}
        ${y.route>0?c`<span class="worker-filter__hidden"
              >숨김 ${y.route}</span
            >`:""}
      </div>
    </div>`}function Le(){let w=q?"custom":_c(P)||"custom";return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${w}
    >
      ${Ms.map(y=>c`<option value=${y.id} ?selected=${w===y.id}>
            ${y.label}
          </option>`)}
      <option value="custom" ?selected=${w==="custom"}>
        사용자 지정…
      </option>
    </select>`}function ot(){let w=qs(P);return c`<div
      class="worker-sort-chain"
      role="group"
      aria-label="후보 정렬 체인"
    >
      ${[0,1,2].map(y=>{let C=w[y];return c`<span class="worker-sort-chain__step">
          <select
            class="worker-sort-chain__key"
            data-step=${y}
            aria-label=${`${y+1}\uCC28 \uC815\uB82C \uD0A4`}
            .value=${C?C.key:""}
          >
            ${y===0?"":c`<option value="" ?selected=${!C}>없음</option>`}
            ${C_.map(ie=>c`<option
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
    </div>`}function Ve(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${W}
      >
        ${ro.map(w=>c`<option value=${w.value} ?selected=${W===w.value}>
              ${w.label}
            </option>`)}
      </select>
    </div>`}function $t(w){let y=ke(w).merge,C=Ee().auto_merge===!0;if(y.running)return c`<button
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
      </button>`;let ie=new Set(y.auto_excluded),$e=Wt(w).filter(Me=>Me.merge_action&&Me.merge_enabled&&!ie.has(Me.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${$e>0?` ${$e}`:""}
    </button>`}function It(w,y){return c`<div
      data-bead-id=${w.id}
      data-drag-kind=${y.kind}
      data-root-dir=${y.root_dir}
      data-lane-id=${mn(y.lane_id)}
      data-row-index=${y.row_index}
      data-queue-index=${String(w.queue_index??0)}
    >
      ${jn({...w,...Do(w.id,{discard:w.discard,parked:!1},te.has(w.id))},{actions:So(w)})}
    </div>`}function Et(w){let y=jt(w),C=vt();return Ni({parallel:{rows:y.map((ie,$e)=>It(ie,{kind:"parallel",root_dir:C,row_index:$e})),count:y.length,collapsed:D.isAreaCollapsed("parallel"),drop:{drop:"parallel",root_dir:C}},serial:{lanes:Ut(w).map(ie=>({id:ie.id,title:`\uC9C1\uB82C ${ie.index}`,rows:[...ie.ghosts.map($e=>jn({...$e,...Do($e.id,{discard:$e.discard,parked:!1},te.has($e.id))},{actions:So($e)})),...ie.items.map(($e,Me)=>It($e,{kind:"repo-serial",root_dir:C,row_index:Me,lane_id:ie.id}))],count:ie.ghosts.length+ie.items.length,match_count:me([...ie.ghosts,...ie.items]),empty:ie.ghosts.length+ie.items.length===0,badge:ie.badge,held:ie.occupied,cycle:ie.cycle,drop:{drop:"repo-serial",root_dir:C,lane_id:ie.id,lane_length:String(ie.raw_length)}})),collapsed:D.isAreaCollapsed("serial")}})}function Kt(w){return Uf(sn(w),Date.now(),Ce)}function _n(w){return w.running.some(y=>y.kind!=="session"&&y.run_state==="running")}function Lt(w){let y=ke(w),C=Yt(w),ie=jt(w),$e=St(w),Me=Wt(w),Xe=sn(w),Rt=Xn({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4",items:C,match_count:me(C),src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:Le(),header_row:q?ot():void 0,controls:he(w),collapsible:!0,collapsed:D.isCollapsed("candidate"),place_menu:et(C),onOpenDoc:u?(ct,dn)=>u(dn):void 0}),tn=Xn({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:$e,match_count:me($e),empty:`${F()} \uC644\uB8CC \uC5C6\uC74C`,header_control:Ve(),collapsible:!0,collapsed:D.isCollapsed("done"),preview:V?Array.isArray(y.token_total)?y.token_total.map(ct=>ct.label).join(" \xB7 "):y.token_total||X_($e):void 0});return V?c`<div class="worker-lanes worker-lanes--mobile">
          ${ji({live:_n(w),running_body:Xe.length>0?Kt(w):"",pr_wait_rows:Me.map(ct=>jn(ct)),count:Xe.length+Me.length})}
          ${Xn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:ie,count:ie.length,match_count:me(ie),collapsible:!0,collapsed:D.isCollapsed("queue"),preview:X_(ie),body:Et(w)})}
          ${Rt} ${tn}
        </div>
        ${Lo(re,Ee())}`:c`<div class="worker-lanes">
        ${Rt}
        ${Xn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:ie,count:ie.length,match_count:me(ie),collapsible:!0,collapsed:D.isCollapsed("queue"),body:Et(w)})}
        ${Xn({id:"worker-pane-running",lane:"running",title:"\uC2E4\uD589 \uC911",items:Xe,match_count:me(Xe),header_control:c`<span class="worker-pane__meta"
            >슬롯 ${y.slots}</span
          >`,live:_n(w),collapsible:!0,collapsed:D.isCollapsed("running"),body:Kt(w)})}
        ${Xn({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:Me,match_count:me(Me),empty:"PR \uB300\uAE30 \uC5C6\uC74C",collapsible:!0,collapsed:D.isCollapsed("pr_wait")})}
        ${tn}
      </div>
      ${Lo(re,Ee())}`}function hn(w){D.toggle(w),_()}function p(w){D.toggleArea(w),_()}function f(w){let y=Date.now();if(!w.queue.some(ie=>Mi(ie.added_at,y)>0)){x();return}k===null&&(k=window.setInterval(()=>{try{_()}catch{}},gw))}function x(){k!==null&&(window.clearInterval(k),k=null)}function _(){let w=B();f(w),Ft(w),ft(E(w),Ie),ft(Lt(w),oe),va(oe)}function g(){let w=!0,y=fa(C=>{if(V=C,w){w=!1;return}_()});Q.push(y)}function O(w){h=w,bw(w),_()}function z(w){if(w==="custom"){q=!0,_();return}P=Jr(w),mc(P),q=!1,_()}function ue(w){P=Jr({chain:w}),mc(P),_()}function Ae(w){W=Kn(w),vw(W),m?.(W),_()}function He(w){let y=w.target;if(re){let ct=ba(re,y,Ee());if(ct){ct!==re&&(re=ct,_());return}}let C=y?.closest?.(".worker-serial-lane-count");if(C){let ct=Number.parseInt(C.value,10);Number.isFinite(ct)&&N(ct).then(_);return}let ie=w.target?.closest?.(".worker-filter__blocked");if(ie){O({...h,show_blocked:ie.checked});return}let $e=w.target?.closest?.(".worker-sort-chain__key");if($e){let ct=Number.parseInt($e.getAttribute("data-step")||"",10);Number.isFinite(ct)&&ue(O_(qs(P),ct,$e.value));return}let Me=w.target?.closest?.(".worker-done-range");if(Me){Ae(Me.value);return}let Xe=w.target?.closest?.(".worker-sort");if(Xe){z(Xe.value);return}let Rt=w.target?.closest?.(".worker-slots__input");if(!Rt)return;let tn=Number.parseInt(Rt.value,10);if(!Number.isFinite(tn)){_();return}A(tn).then(_)}function xt(w){return w?{runner:w.runner||void 0,model:w.model||void 0,effort:w.effort||void 0,worktree:w.worktree||void 0,status:w.status||void 0,session_id:w.session_id||void 0}:{}}function Qt(){let w=ke(B()),y=Ee().workspace_info,C=y&&typeof y=="object"&&y.repo_ops&&typeof y.repo_ops=="object"?y.repo_ops:null;return{operations:w.repo_operations,cleanup_failures:w.cleanup_failures,repo:l&&l()||"",repo_ops:C}}function an(){Ce&&Ne.close(),pe.hidden=!1,Ye.hidden=!1,Qe.open(Qt()),_()}function xn(w){let y=Ee(),C=y.attempts?y.attempts[w]:null;Ce=w,Qe.close(),pe.hidden=!0,Ye.hidden=!1,Ne.open({attempt_id:w,meta:xt(C)}),_()}function Vt(w){let y=Ee(),C=(Array.isArray(y.session_active)?y.session_active:[]).find($e=>$e&&$e.bead_id===w),ie=(C&&Array.isArray(C.session_refs)?C.session_refs:[]).find($e=>$e&&$e.current===!0);ie&&(Qe.close(),pe.hidden=!0,Ye.hidden=!1,Ne.open(_o(ie,w,"in_progress")),_())}function Jt(){if(Qe.isOpen()&&Qe.refresh(Qt()),!Ce)return;let w=Ee(),y=w.attempts?w.attempts[Ce]:null;if(y){Ne.updateMeta(xt(y));return}Ne.close()}function en(w,y){if(w.length===0||!s)return;let C=l?l():void 0;if(y.length===0||!C||y===C||!a){s(w);return}Promise.resolve(a(y)).then(()=>{s(w)}).catch(()=>{_e("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})}function eo(w){let y=w.target;if(y?.closest?.(".provider-resume-dialog__cancel")){st();return}if(y?.closest?.(".provider-resume-dialog__confirm")){Ue();return}if(y?.closest?.(".provider-resume-dialog")||y?.closest?.(".worker-mini__grip"))return;let C=y?.closest?.(".worker-sort-chain__dir");if(C){let le=Number.parseInt(C.getAttribute("data-step")||"",10);Number.isFinite(le)&&ue(I_(qs(P),le));return}let ie=y?.closest?.(".worker-dep__open");if(ie){en(ie.getAttribute("data-dep-id")||"",ie.getAttribute("data-root-dir")||"");return}let $e=y?.closest?.(".judgement-chip");if($e){let le=$e.closest("[data-bead-id]"),rt=le&&le.getAttribute("data-bead-id")||"",Gt=$e.getAttribute("data-chip-key")||"";rt&&Gt&&U.toggle({bead_id:rt,chip_key:Gt});return}if(y?.closest?.(".chip-popover"))return;if(y?.closest?.(".worker-repo-strip")){an();return}let Me=y?.closest?.(".worker-repo-op__dismiss");if(Me){Pe(Me.dataset.operationId||"");return}let Xe=y?.closest?.(".worker-cleanup__resume");if(Xe){let le=Xe.dataset.beadId;le&&Se(le);return}let Rt=y?.closest?.(".worker-cleanup__resolve");if(Rt){let le=Rt.dataset.beadId;le&&De(le);return}if(y?.closest?.(".worker-hold__retry")){je("worker-queue-hold-retry-now","\uC9C0\uAE08 \uC7AC\uC2DC\uB3C4 \uAC70\uBD80");return}if(y?.closest?.(".worker-hold__resume")){je("worker-queue-hold-resume","\uC7AC\uAC1C \uAC70\uBD80");return}if(y?.closest?.(".worker-play")){nt(!Ee().auto_advance);return}let tn=y?.closest?.(".worker-merge-all");if(tn){tn.classList.contains("worker-merge-all--stop")?Ee().auto_merge===!0?se(!1):Ge():se(!0);return}let ct=y?.closest?.(".worker-pane__toggle[data-lane]");if(ct){let le=ct.dataset.lane;(le==="candidate"||le==="queue"||le==="running"||le==="pr_wait"||le==="done")&&hn(le);return}let dn=y?.closest?.(".worker-wait__area-toggle[data-area]");if(dn){let le=dn.dataset.area;(le==="parallel"||le==="serial")&&p(le);return}let An=y?.closest?.(".worker-card__place-lane");if(An){let le=An.dataset.beadId,rt=An.dataset.lane;le&&(rt==="parallel"||/^s[1-5]$/.test(rt||""))&&(S=null,_(),ut(le,rt));return}if(y?.closest?.(".worker-card__place-cancel")){S=null,_();return}let Hn=y?.closest?.(".worker-card__place");if(Hn){let le=Hn.dataset.beadId;le&&!Hn.disabled&&(ss(Ee())?(S=le,_()):ut(le,"parallel"));return}let Zn=y?.closest?.(".worker-filter__route");if(Zn){let le=Zn.dataset.route||"";le&&O({...h,routes:Hi(h.routes,le)});return}let Jn=y?.closest?.(".worker-filter__chip");if(Jn){let le=Jn.dataset.readiness;(le==="all"||le==="ready"||le==="not_ready")&&O({...h,readiness:le});return}let er=y?.closest?.('[data-action="queue-start-now"]');if(er){lt(er.dataset.beadId||"");return}let un=y?.closest?.('[data-action="queue-remove"]');if(un){let le=un.dataset.beadId||"";le&&fe.sendOp({type:"worker-queue-remove",payload:{bead_id:le},root_dir:vt()},le);return}let tr=y?.closest?.(".worker-mini__merge");if(tr){let le=tr.dataset.beadId||"";Ee().cleanup_failed?.[le]?Se(le):qe(le);return}let pr=y?.closest?.(".worker-mini__merge-cancel");if(pr){ge(pr.dataset.beadId||"");return}let fr=y?.closest?.(".worker-mini__resolve");if(fr){De(fr.dataset.beadId||"");return}let Ir=y?.closest?.(".rtile__resolve");if(Ir){let le=Ir.closest(".rtile");De(le?.dataset.beadId||"");return}let We=y?.closest?.(".worker-mini__discard"),Nt=y?.closest?.(".worker-mini__discard-abandon");if(Nt){ze(Nt.dataset.beadId||"",Nt.dataset.operationId||"",{kind:Nt.dataset.operationKind||"",last_error:Nt.dataset.lastError||""});return}if(We){it(We.dataset.beadId||"",We.dataset.attemptId||null,We.dataset.discardMode==="merged"?"merged":"unmerged",We.dataset.operationId||null);return}let Cn=y?.closest?.(".worker-mini__stale-continue");if(Cn){mt("worker-stale-work-continue",Cn.dataset.beadId||"",Cn.dataset.actionId||"");return}let Po=y?.closest?.(".worker-mini__stale-backup");if(Po){mt("worker-stale-work-backup-fresh",Po.dataset.beadId||"",Po.dataset.actionId||"");return}let Mo=y?.closest?.(".worker-mini__stale-recheck");if(Mo){mt("worker-stale-work-recheck",Mo.dataset.beadId||"",Mo.dataset.actionId||"");return}let js=y?.closest?.(".worker-mini__revise-fix");if(js){gt("worker-revise-fix",js.dataset.beadId||"");return}let Fs=y?.closest?.(".worker-mini__revise-approve");if(Fs){gt("worker-revise-approve",Fs.dataset.beadId||"");return}if(y?.closest?.(".worker-mini__pr"))return;let tt=y?.closest?.(".rtile__failure-badge");if(tt){let le=tt.dataset.attemptId||"";T=T===le?null:le,_();return}let v=y?.closest?.(".rtile__provider-hold-badge");if(v){let le=v.dataset.attemptId||"";ee=ee===le?null:le,_();return}let I=y?.closest?.(".rtile__attempt-copy");if(I){let le=I.dataset.attemptId||"";le&&yn(le).then(rt=>{_e(rt?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",rt?"success":"error",1400)});return}let M=y?.closest?.(".rtile__discard-abandon");if(M){let rt=y?.closest?.(".rtile")?.dataset?.beadId;rt&&ze(rt,M.dataset.operationId||"",{kind:M.dataset.operationKind||"",last_error:M.dataset.lastError||""});return}let ve=y?.closest?.(".rtile__discard");if(ve){let le=y?.closest?.(".rtile"),rt=le?.dataset?.beadId,Gt=le?.dataset?.attemptId;rt&&it(rt,Gt||null,ve.dataset.confirmation==="merged"?"merged":"unmerged",ve.dataset.operationId||null);return}if(y?.closest?.(".rtile__pause")){let rt=y?.closest?.(".rtile")?.dataset?.attemptId;rt&&Zt(rt);return}if(y?.closest?.(".rtile__resume-alternate")){let rt=y?.closest?.(".rtile")?.dataset?.attemptId;rt&&Je(rt);return}if(y?.closest?.(".rtile__resume")){let le=y?.closest?.(".rtile__resume"),Gt=y?.closest?.(".rtile")?.dataset?.attemptId;Gt&&$(Gt,le?.dataset?.resumeKind==="settlement"?"settlement":"session");return}if(y?.closest?.(".rtile__session")){let le=y?.closest?.(".rtile"),rt=le?.dataset?.attemptId;if(rt){xn(rt);return}let Gt=le?.dataset?.beadId;Gt&&Vt(Gt);return}if(y?.closest?.(".rtile__failure-pop"))return;if(y?.closest?.(".worker-drawer-overlay__backdrop")){Qe.close(),Ne.close();return}if(y?.closest?.(".worker-drawer-host"))return;let Be=y?.closest?.(".rtile .board-card__roll-toggle");if(Be){let le=Be.dataset.rollParent;le&&(K.has(le)?K.delete(le):K.add(le),_());return}let at=y?.closest?.(".rtile .board-card__roll-child");if(at){let le=at.dataset.childId;le&&s&&s(le);return}let Mt=y?.closest?.(".rtile");if(Mt){if(y?.closest?.(".rtile__id")){let rt=Mt.dataset.beadId;rt&&yn(rt).then(Gt=>{Gt?_e("\uBCF5\uC0AC\uB428","success",1200):_e("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let le=Mt.dataset.beadId;le&&s&&s(le);return}let ht=y?.closest?.(".worker-mini, .worker-card");if(ht){let le=ht.dataset.beadId;if(y?.closest?.('[data-seam="log-path-copy"]'))return;if(y?.closest?.(".worker-mini__id, .worker-card__id")){le&&yn(le).then(Gt=>{Gt?_e("\uBCF5\uC0AC\uB428","success",1200):_e("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let rt=y?.closest?.(".ctl-chip--from");if(rt){let Gt=rt.dataset.fromId;Gt&&s&&s(Gt);return}le&&s&&s(le)}}function Tn(w){let y=w.target;y?.closest?.(".worker-search")&&(j=y.value,_())}function to(w){let y=w.target;w.key!=="Escape"||!y?.closest?.(".worker-search")||j.length===0||(j="",_())}fe.attach(e),e.addEventListener("click",eo),e.addEventListener("change",He),e.addEventListener("input",Tn),e.addEventListener("keydown",to);function Rr(w){let y=w.target,C=y&&typeof y.closest=="function"?$e=>y.closest($e):()=>null,ie=!1;T&&!C(".rtile__failure-pop, .rtile__failure-badge")&&(T=null,ie=!0),ee&&!C(".rtile__provider-hold-pop, .rtile__provider-hold-badge")&&(ee=null,ie=!0),ie&&_()}function Ns(w){w.key==="Escape"&&(T===null&&ee===null&&re===null||(T=null,ee=null,re=null,_()))}return document.addEventListener("click",Rr),document.addEventListener("keydown",Ns),U.attach(),Q.push(()=>{document.removeEventListener("click",Rr),document.removeEventListener("keydown",Ns),U.detach()}),g(),b&&Q.push(b.subscribe(()=>{de.notifyIssuesChanged(),_()})),o&&Q.push(o.subscribe(()=>{let w=l&&l()||"";w!==J&&(J=w,Fe.close()),_(),Jt()})),_(),{load(){de.ensureSessionDefaults(),_()},refreshSessionDefaults:Re,destroy(){x();for(let w of Q.splice(0))try{w()}catch{}fe.detach(),e.removeEventListener("click",eo),e.removeEventListener("change",He),de.destroy();try{Ne.destroy()}catch{}Ye.hidden=!0;try{Fe.destroy()}catch{}ft(c``,e)}}}function vc(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function tm(e,t,n,r=async()=>{},o=async()=>{}){let i=Bt("views:workspace-picker"),s=null,l=!1,a=!1,u=!1;async function d(P){let W=P.target.value,D=t.getState().workspace?.current?.path||"";if(W&&W!==D){i("switching workspace to %s",W),l=!0,R();try{await n(W)}catch(V){i("workspace switch failed: %o",V)}finally{l=!1,R()}}}async function m(){let P=t.getState(),q=P.workspace?.current?.path||P.workspace?.available?.[0]?.path||"";if(!(!q||a)){i("git-pulling workspace %s",q),a=!0,R();try{await r(q)}catch(W){i("workspace git pull failed: %o",W)}finally{a=!1,R()}}}function b(P){let q=P.target;q&&e.contains(q)||S()}function h(P){P.key==="Escape"&&S()}function k(){u||(u=!0,document.addEventListener("mousedown",b),document.addEventListener("keydown",h),R())}function S(){u&&(u=!1,document.removeEventListener("mousedown",b),document.removeEventListener("keydown",h),R())}function T(){u?S():k()}async function ee(P){let q=P.target,W=q.value,F=q.checked;i("toggling visibility %s \u2192 %s",W,String(F));try{await o(W,F)}catch(D){i("workspace visibility toggle failed: %o",D)}}function re(P){return P?c`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${m}
        ?disabled=${l||a}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:c``}function U(P,q){return c`
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
                ${P.map(W=>c`
                    <label
                      class="workspace-picker__manage-row"
                      title="${W.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${W.path}"
                        .checked=${!q.has(W.path)}
                        @change=${ee}
                      />
                      <span class="workspace-picker__manage-name"
                        >${vc(W.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function L(){let P=t.getState(),q=P.workspace?.current,W=P.workspace?.available||[],F=new Set(P.workspace?.hidden||[]),D=q?.path||W[0]?.path||"";if(W.length===0)return c``;let V=W.filter(j=>!F.has(j.path)||j.path===D);if(V.length<=1){let j=V[0]||W[0],ne=vc(j.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${j.path}"
            >${ne}</span
          >
          ${U(W,F)}
          ${re(D)}
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
          ${V.map(j=>c`
              <option
                value="${j.path}"
                ?selected=${j.path===D}
                title="${j.path}"
              >
                ${vc(j.path)}
              </option>
            `)}
        </select>
        ${U(W,F)}
        ${re(D)}
        ${l||a?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function R(){ft(L(),e)}return R(),s=t.subscribe(()=>R()),{destroy(){s&&(s(),s=null),document.removeEventListener("mousedown",b),document.removeEventListener("keydown",h),ft(c``,e)}}}var nm=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","get-workspace-accounts","set-workspace-accounts","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-provider-auto-switch-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-dismiss","worker-repo-operation-deploy-run","worker-queue-set-slots","worker-queue-set-serial-lane-count","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-queue-arm","worker-queue-disarm","worker-queue-start-now","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-cleanup-retry","worker-resolve-in-session","worker-queue-hold-resume","worker-queue-hold-retry-now","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-discard-abandon","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-bead-timeline","get-worker-system-prompt","get-session-refs","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove","monitor-lane-provenance"];function kc(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function rm(e,t,n=kc()){return{id:n,type:e,payload:t}}function om(e={}){let t=Bt("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",o=null,i="closed",s=0,l=null,a=!0,u=new Map,d=[],m=new Map,b=new Set;function h(L){for(let R of Array.from(b))try{R(L)}catch{}}function k(){if(!a||l)return;i="reconnecting",t("ws reconnecting\u2026"),h(i);let L=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,s)),R=(n.jitterRatio||0)*L,P=Math.max(0,Math.round(L+(Math.random()*2-1)*R));t("ws retry in %d ms (attempt %d)",P,s+1),l=setTimeout(()=>{l=null,U()},P)}function S(L){try{o?.send(JSON.stringify(L))}catch(R){t("ws send failed",R)}}function T(){for(i="open",t("ws open"),h(i),s=0;d.length;){let L=d.shift();L&&S(L)}}function ee(L){let R;try{R=JSON.parse(String(L.data))}catch{t("ws received non-JSON message");return}if(!R||typeof R.id!="string"||typeof R.type!="string"){t("ws received invalid envelope");return}if(u.has(R.id)){let q=u.get(R.id);u.delete(R.id),R.ok?q?.resolve(R.payload):q?.reject(R.error||new Error("ws error"));return}let P=m.get(R.type);if(P&&P.size>0)for(let q of Array.from(P))try{q(R.payload)}catch(W){t("ws event handler error",W)}else t("ws received unhandled message type: %s",R.type)}function re(){i="closed",t("ws closed"),h(i);for(let[L,R]of u.entries())R.reject(new Error("ws disconnected")),u.delete(L);s+=1,k()}function U(){if(!a)return;let L=r();try{o=new WebSocket(L),t("ws connecting %s",L),i="connecting",h(i),o.addEventListener("open",T),o.addEventListener("message",ee),o.addEventListener("error",()=>{}),o.addEventListener("close",re)}catch(R){t("ws connect failed %o",R),k()}}return U(),{send(L,R){if(!nm.includes(L))return Promise.reject(new Error(`unknown message type: ${L}`));let P=kc(),q=rm(L,R,P);return t("send %s id=%s",L,P),new Promise((W,F)=>{u.set(P,{resolve:W,reject:F,type:L}),o&&o.readyState===o.OPEN?S(q):(t("queue %s id=%s (state=%s)",L,P,i),d.push(q))})},on(L,R){m.has(L)||m.set(L,new Set);let P=m.get(L);return P?.add(R),()=>{P?.delete(R)}},onConnection(L){return b.add(L),()=>{b.delete(L)}},reconnect(){a=!0,l&&(clearTimeout(l),l=null),s=0,U()},close(){a=!1,l&&(clearTimeout(l),l=null);try{o?.close()}catch{}},getState(){return i}}}function Mw(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function qw(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var wc=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],sm=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],Tr="tab:worker:closed",Nw="bdui.worker.done-range",im=o_,am="worker:queue",lm="ui:order",cm="ui:display-policy",um="exec:presets",Cr="tab:board:closed",dm="beads-ui.board.closed-range";function jw(e){if(!e)return()=>{};function t(r){document.documentElement.style.setProperty("--app-header-h",`${Math.round(r)}px`)}if(t(e.getBoundingClientRect().height),typeof ResizeObserver!="function")return()=>{};let n=new ResizeObserver(r=>{for(let o of r)t(o.contentRect.height+Fw(e))});return n.observe(e),()=>n.disconnect()}function Fw(e){let t=getComputedStyle(e);return[t.paddingTop,t.paddingBottom,t.borderTopWidth,t.borderBottomWidth].reduce((r,o)=>r+(parseFloat(o)||0),0)}function Bw(e){let t=Bt("main");t("bootstrap start"),jw(document.querySelector(".app-header"));let n=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;ft(n,e);let r=document.getElementById("global-nav"),o=document.getElementById("top-nav"),i=document.getElementById("repo-scope"),s=document.getElementById("usage-meter"),l=document.getElementById("board-root"),a=document.getElementById("worker-root"),u=document.getElementById("monitor-root"),d=document.getElementById("detail-panel");if(s&&x_(s),l&&a&&u&&d){let Q=function(_,g){let O="Request failed",z="";if(_&&typeof _=="object"){let Ae=_;if(typeof Ae.message=="string"&&Ae.message.length>0&&(O=Ae.message),typeof Ae.details=="string")z=Ae.details;else if(Ae.details&&typeof Ae.details=="object")try{z=JSON.stringify(Ae.details,null,2)}catch{z=""}}else typeof _=="string"&&_.length>0&&(O=_);let ue=g&&g.length>0?`Failed to load ${g}`:"Request failed";ae.open(ue,O,z)},Ee=function(_){return`${xe.getState().workspace.current?.path||""}\0${_}`},Je=function(){we&&(we().catch(()=>{}),we=null),fe=null,Ce=null},Ue=function(_){Ne=_;let g=()=>{Ne!==_||xe.getState().selected_id!==_||(Ne=null,st(_))};if(!J){Fe.then(g);return}g()},Ze=function(_,g,O,z,ue){return O!==ut[g]?(ue().catch(()=>{}),!1):(_.set(z,ue),!0)},Zt=function(){let _=xe.getState();De(_.view==="board"),Ge(_.view==="worker"),Pe(nt(_)),ze(_.view==="board"||_.view==="worker"||dt||!!_.selected_id)},qe=function(){let _=Nr($);return _===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:_}}},Se=function(){let _=Nr(Z);return _===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:_}}},De=function(_){if(_)for(let[g,O]of wc){if(et.has(g)||vt.has(g))continue;let z=g===Cr?qe():{type:O};try{Ie.register(g,z)}catch(He){t("register %s store failed: %o",g,He)}vt.add(g);let ue=ut.board,Ae=!1;be.subscribeList(g,z).then(He=>{Ae=!Ze(et,"board",ue,g,He)}).catch(He=>{t("subscribe %s failed: %o",g,He),Q(He,"board")}).finally(()=>{vt.delete(g),Ae&&Zt()})}else kt()},kt=function(){ut.board+=1;for(let[_]of wc){let g=et.get(_);g&&(g().catch(()=>{}),et.delete(_));try{Ie.unregister(_)}catch(O){t("unregister %s failed: %o",_,O)}}},Ge=function(_){if(!_){it();return}for(let[g,O]of sm){if(se.has(g)||vt.has(g))continue;let z=g===Tr?Se():{type:O};try{Ie.register(g,z)}catch(He){t("register %s store failed: %o",g,He)}vt.add(g);let ue=ut.worker,Ae=!1;be.subscribeList(g,z).then(He=>{Ae=!Ze(se,"worker",ue,g,He)}).catch(He=>{t("subscribe %s failed: %o",g,He),Q(He,"worker")}).finally(()=>{vt.delete(g),Ae&&Zt()})}},it=function(){ut.worker+=1;for(let[_]of sm){let g=se.get(_);g&&(g().catch(()=>{}),se.delete(_));try{Ie.unregister(_)}catch(O){t("unregister %s failed: %o",_,O)}}},ze=function(_){if(!_){mt();return}ge||(Re("subscribe-worker-queue",{id:am}).catch(g=>{t("subscribe-worker-queue failed: %o",g)}),ge=()=>Re("unsubscribe-worker-queue",{id:am}))},mt=function(){ge&&(ge().catch(()=>{}),ge=null)},nt=function(_){return _.view==="monitor"||_.selected_id!=null},Pe=function(_){if(!_){A();return}gt||(Re("subscribe-monitor-pipeline",{id:im}).catch(g=>{t("subscribe-monitor-pipeline failed: %o",g)}),gt=()=>Re("unsubscribe-monitor-pipeline",{id:im}))},A=function(){gt&&(gt().catch(()=>{}),gt=null)},B=function(){N||(Re("subscribe-ui-order",{id:lm}).catch(_=>{t("subscribe-ui-order failed: %o",_)}),N=()=>Re("unsubscribe-ui-order",{id:lm}))},ke=function(){N&&(N().catch(()=>{}),N=null),G.clear()},pt=function(){ye||(Re("subscribe-display-policy",{id:cm}).catch(_=>{t("subscribe-display-policy failed: %o",_)}),ye=()=>Re("unsubscribe-display-policy",{id:cm}))},wt=function(){ye&&(ye().catch(()=>{}),ye=null),pe.clear()},Tt=function(){yt||(Re("subscribe-impl-presets",{id:um}).catch(_=>{t("subscribe-impl-presets failed: %o",_)}),yt=()=>Re("unsubscribe-impl-presets",{id:um}))},Wt=function(_){if(!_)return"Unknown";let g=_.split("/").filter(Boolean);return g.length>0?g[g.length-1]:"Unknown"},Kt=function(_,g){Et.open(_.path,{missing_state:_.missing_state,...g?{workspace:g}:{}})};var m=Q,b=Ee,h=Je,k=Ue,S=Ze,T=Zt,ee=qe,re=Se,U=De,L=kt,R=Ge,P=it,q=ze,W=mt,F=nt,D=Pe,V=A,j=B,ne=ke,me=pt,Oe=wt,H=Tt,te=Wt,ce=Kt;let Te=document.getElementById("header-loading"),K=du(Te),ae=Cf(e),de=om(),Re=K.wrapSend((_,g)=>de.send(_,g)),be=ou(Re),Ie=su(),Ye=au(),_t=qc(),G=iu(),pe=Pc(),oe=Mc(),Y=Nc();de.on("impl-presets-snapshot",_=>{let g=_;g&&typeof g.revision=="number"&&Array.isArray(g.presets)&&oe.set({revision:g.revision,presets:g.presets})}),de.on("monitor-pipeline-snapshot",_=>{let g=_;if(!(!g||!Array.isArray(g.workspaces)))try{_t.set(g.workspaces,g.workspaces_state,g.cross_lanes)}catch{}}),de.on("ui-order-snapshot",_=>{let g=_;if(g&&typeof g.revision=="number")try{G.set({revision:g.revision,order:g.order&&typeof g.order=="object"?g.order:{}})}catch{}}),de.on("display-policy-snapshot",_=>{let g=_;if(g&&g.policy&&typeof g.policy=="object")try{pe.set(g.policy)}catch{}}),de.on("session-log-snapshot",_=>{let g=_;if(g&&typeof g.id=="string")try{Y.set(g.id,Array.isArray(g.lines)?g.lines:[],typeof g.last_event_at=="number"?g.last_event_at:null)}catch{}}),de.on("session-log-append",_=>{let g=_;if(g&&typeof g.id=="string")try{Y.append(g.id,g.event)}catch{}}),de.on("snapshot",_=>{let g=_,O=g&&typeof g.id=="string"?g.id:"",z=O?Ie.getStore(O):null;if(z&&g&&g.type==="snapshot")try{z.applyPush(g)}catch{}}),de.on("upsert",_=>{let g=_,O=g&&typeof g.id=="string"?g.id:"",z=O?Ie.getStore(O):null;if(z&&g&&g.type==="upsert")try{z.applyPush(g)}catch{}}),de.on("delete",_=>{let g=_,O=g&&typeof g.id=="string"?g.id:"",z=O?Ie.getStore(O):null;if(z&&g&&g.type==="delete")try{z.applyPush(g)}catch{}});let we=null,fe=null,Ce=null,Ne=null,Qe=()=>{},Fe=new Promise(_=>{Qe=()=>_(void 0)}),J=!1,X=!1;async function st(_){let g=Ee(_);if(g===fe||g===Ce)return;Ce=g;let O=`detail:${_}`,z={type:"issue-detail",params:{id:_}};try{Ie.register(O,z)}catch(ue){t("register detail store failed: %o",ue)}try{let ue=await be.subscribeList(O,z);if(xe.getState().selected_id!==_||Ee(_)!==g){await ue().catch(()=>{});return}we&&await we().catch(()=>{}),we=ue,fe=g}catch(ue){t("detail subscribe failed: %o",ue),Q(ue,"issue details")}finally{Ce===g&&(Ce=null)}}let et=new Map,vt=new Set,ut={board:0,worker:0},dt=!1,$=Ys;try{let _=window.localStorage.getItem(dm);Pa(_)&&($=_)}catch{}let Z="today";try{let _=window.localStorage.getItem(Nw);_!==null&&(Z=Kn(_))}catch{}async function je(_){if(!Pa(_)||_===$)return;$=_;try{window.localStorage.setItem(dm,_)}catch{}let g=et.get(Cr);if(!g)return;et.delete(Cr),await g().catch(()=>{});let O=qe();try{Ie.register(Cr,O)}catch(z){t("register %s store failed: %o",Cr,z)}try{let z=await be.subscribeList(Cr,O);et.set(Cr,z)}catch(z){t("re-subscribe %s failed: %o",Cr,z),Q(z,"board")}}async function lt(_){let g=Kn(_);if(g===Z)return;Z=g;let O=se.get(Tr);if(!O)return;se.delete(Tr),await O().catch(()=>{});let z=Se();try{Ie.register(Tr,z)}catch(ue){t("register %s store failed: %o",Tr,ue)}try{let ue=await be.subscribeList(Tr,z);se.set(Tr,ue)}catch(ue){t("re-subscribe %s failed: %o",Tr,ue),Q(ue,"worker")}}let se=new Map,ge=null,gt=null,N=null,ye=null,yt=null;async function jt(){ye=null,pe.clear(),yt=null,oe.clear(),ge=null,gt=null,et.clear(),se.clear(),ut.board+=1,ut.worker+=1,Tt();let _=xe.getState().workspace.current?.path;if(_)try{await de.send("set-workspace",{path:_})}catch(O){t("workspace restore after reconnect failed: %o",O);return}pt();let g=xe.getState();De(g.view==="board"),Ge(g.view==="worker"),Pe(nt(g)),ze(g.view==="board"||g.view==="worker"||!!g.selected_id)}async function Ut(){t("clearing all subscriptions for workspace switch"),kt(),it(),mt(),Ye.clear(),ke(),B(),wt(),pt(),Je();let _=xe.getState();if(_.selected_id)try{Ie.unregister(`detail:${_.selected_id}`)}catch{}let g=xe.getState();De(g.view==="board"),Ge(g.view==="worker"),Pe(nt(g)),ze(g.view==="board"||g.view==="worker"||!!g.selected_id),g.selected_id&&Ue(g.selected_id)}async function Yt(_){t("requesting workspace switch to %s",_),X=!0;try{let g=await de.send("set-workspace",{path:_});t("workspace switch result: %o",g),g&&g.workspace&&(xe.setState({workspace:{current:{path:g.workspace.root_dir,database:g.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",_),g.changed&&(await Ut(),_e("Switched to "+Wt(_),"success",2e3)))}catch(g){throw t("workspace switch failed: %o",g),_e("Failed to switch workspace","error",3e3),g}finally{X=!1}}async function St(_){t("requesting workspace git pull for %s",_);try{let g=await de.send("git-pull-workspace",{});t("workspace git pull result: %o",g);let O=g?.status;if(O==="up_to_date"){_e("Already up to date","success",2e3);return}if(O==="stash_pop_conflict"){_e("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}_e("Git pulled "+Wt(_),"success",2e3)}catch(g){t("workspace git pull failed: %o",g);let O=g?.code,z=g?.message;if(O==="rebase_conflict"){_e("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(O==="rebase_conflict_abort_failed"){_e("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(O==="busy"){_e("Git pull skipped: another operation is running","warning",3e3);return}let ue=z?`: ${z}`:"";throw _e(`Git pull failed${ue}`,"error",3e3),g}}async function sn(_,g){t("setting workspace visibility %s \u2192 %s",_,String(g));try{await de.send("set-workspace-visibility",{path:_,visible:g}),await Pt()}catch(O){t("workspace visibility update failed: %o",O),_e("Failed to update project visibility","error",3e3)}}async function Pt(){try{let _=await de.send("list-workspaces",{});if(t("workspaces loaded: %o",_),_&&Array.isArray(_.workspaces)){let g=_.workspaces.map(Ae=>({path:Ae.path,database:Ae.database,pid:Ae.pid,version:Ae.version})),O=_.current?{path:_.current.root_dir,database:_.current.db_path}:null,z=Array.isArray(_.hidden)?_.hidden.filter(Ae=>typeof Ae=="string"):[];xe.setState({workspace:{current:O,available:g,hidden:z}});let ue=window.localStorage.getItem("beads-ui.workspace");ue&&(!g.some(He=>He.path===ue)||z.includes(ue)?window.localStorage.removeItem("beads-ui.workspace"):O&&ue!==O.path&&(t("restoring saved workspace preference: %s",ue),await Yt(ue)))}}catch(_){t("failed to load workspaces: %o",_)}}de.on("workspace-changed",_=>{t("workspace-changed event: %o",_),_&&_.root_dir&&(xe.setState({workspace:{current:{path:_.root_dir,database:_.db_path}}}),Pt(),Ut())});let Ft=!1;if(typeof de.onConnection=="function"){let _=g=>{t("ws state %s",g),g==="reconnecting"||g==="closed"?(Ft=!0,_e("Connection lost. Reconnecting\u2026","error",4e3)):g==="open"&&Ft&&(Ft=!1,_e("Reconnected","success",2200),qw(xe,(O,z)=>{t(`${O}: %o`,z)}),jt())};de.onConnection(_)}let zt="board";try{let _=window.localStorage.getItem("beads-ui.view");(_==="board"||_==="worker"||_==="monitor")&&(zt=_)}catch(_){t("view parse error: %o",_)}let xe=uu({config:Mw(),view:zt});de.on("worker-queue-snapshot",_=>{let g=_;if(!g||!g.queue)return;let O=xe.getState().workspace.current?.path;if(typeof O=="string"&&O.length>0&&g.root_dir!==O){t("dropping worker-queue snapshot for %s",String(g.root_dir));return}try{Ye.set(g.queue)}catch{}});let E=lu(xe);E.start();let he=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"]),Le=async(_,g)=>{try{return await Re(_,g)}catch(O){if(he.has(_))throw O;return[]}};i_({global_element:r,repo_element:o},xe,E);let ot=document.getElementById("workspace-picker");ot&&tm(ot,xe,Yt,St,sn);let Ve=u_(e,(_,g)=>Re(_,g));try{let _=document.getElementById("new-issue-btn");_&&_.addEventListener("click",()=>Ve.open())}catch{}let $t=__(e,{policyStore:pe,queueStore:Ye,implPresetStore:oe,transport:(_,g)=>Re(_,g),onOpenChange:_=>{let g=dt;dt=_,Zt(),g&&_===!1&&Lt.refreshSessionDefaults()},labelOptions:()=>{let _=new Set;for(let[g]of wc)for(let O of Ie.snapshotFor(g)||[]){let z=O.labels;if(Array.isArray(z))for(let ue of z)typeof ue=="string"&&ue.length>0&&_.add(ue)}return Array.from(_).sort()}});try{let _=document.getElementById("display-settings-btn");_&&(_.setAttribute("aria-label","\uC124\uC815"),_.setAttribute("title","\uC124\uC815"),_.addEventListener("click",()=>$t.open()))}catch{}let It=document.createElement("div");It.className="md-viewer-root",document.body.appendChild(It);let Et=da(It,{getWorkspacePath:()=>xe.getState().workspace.current?.path}),_n=Eu(l,{gotoIssue:_=>E.gotoIssue(_),issueStores:Ie,transport:Le,workerQueueStore:Ye,uiOrderStore:G,displayPolicyStore:pe,closedRange:$,onClosedRangeChange:_=>{je(_)},onNewIssue:()=>Ve.open(),openDoc:Kt}),Lt=yc(a,{transport:Le,issueStores:Ie,queueStore:Ye,sessionLogStore:Y,gotoIssue:_=>xe.setState({selected_id:_}),getWorkspacePath:()=>xe.getState().workspace.current?.path,switchWorkspace:_=>Yt(_),openDoc:Kt,doneRange:Z,onDoneRangeChange:_=>{lt(_)}}),hn=s_(u,{transport:Le,pipelineStore:_t,execPresetStore:oe,sessionLogStore:Y,router:E,gotoIssue:_=>E.gotoIssue(_),getWorkspacePath:()=>xe.getState().workspace.current?.path,switchWorkspace:_=>Yt(_),openDoc:Kt}),p=Tf(d,{issueStores:Ie,transport:Le,queueStore:Ye,execPresetStore:oe,sessionLogStore:Y,getWorkspacePath:()=>xe.getState().workspace.current?.path,mdViewer:Et,depCandidates:()=>{let _=_t.get();if(_===null)return null;let g=_t.getWorkspacesState(),O=xe.getState();if(O.view==="monitor")return Rl(_,g);let z=O.workspace.current?.path;return z?Rl(_,g,{root_dir:z}):null},subscribeCandidates:_=>_t.subscribe(_),onDepChanged:({type:_,a:g,b:O})=>{let z=hn;_==="dep-add"&&z&&typeof z.recorrectSharedLane=="function"&&z.recorrectSharedLane(_,g,O)},onNavigate:(_,g)=>{let O=()=>{xe.getState().view==="worker"?xe.setState({selected_id:_}):E.gotoIssue(_)},z=xe.getState().workspace.current?.path;if(typeof g!="string"||g.length===0||!z||g===z){O();return}Promise.resolve(Yt(g)).then(O).catch(()=>{_e("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})},onClose:()=>{let _=xe.getState();xe.setState({selected_id:null});try{E.gotoView(_.view==="worker"||_.view==="monitor"?_.view:"board")}catch{}},onOpenExecPresets:()=>{$t.open("execution")}}),f=xe.getState().selected_id;f&&(d.hidden=!1,p.load(f),Ue(f)),xe.subscribe(_=>{let g=_.selected_id;g?(d.hidden=!1,p.load(g),X||Ue(g)):(p.clear(),d.hidden=!0,Je())});let x=_=>{l.hidden=_.view!=="board",a.hidden=_.view!=="worker",u.hidden=_.view!=="monitor",i&&i.classList.toggle("is-quiet",_.view==="monitor"),De(_.view==="board"),Ge(_.view==="worker"),Pe(nt(_)),ze(_.view==="board"||_.view==="worker"||dt||!!_.selected_id),!_.selected_id&&_.view==="board"&&_n.load(),_.view==="worker"&&Lt.load(),_.view==="monitor"?hn.load():hn.pause(),window.localStorage.setItem("beads-ui.view",_.view)};xe.subscribe(x),x(xe.getState()),B(),pt(),Tt(),Pt().finally(()=>{J=!0,Qe()}),window.addEventListener("keydown",_=>{let g=_.ctrlKey||_.metaKey,O=String(_.key||"").toLowerCase(),z=_.target,ue=z&&z.tagName?String(z.tagName).toLowerCase():"",Ae=ue==="input"||ue==="textarea"||ue==="select"||z&&typeof z.isContentEditable=="boolean"&&z.isContentEditable;g&&O==="n"&&(Ae||(_.preventDefault(),Ve.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,o=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",o);let i=document.getElementById("theme-switch");i&&(i.checked=o==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&Bw(t)});export{Bw as bootstrap,Mw as readBootstrapConfig,qw as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
