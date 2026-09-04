var im=Object.create;var Ta=Object.defineProperty;var am=Object.getOwnPropertyDescriptor;var lm=Object.getOwnPropertyNames;var cm=Object.getPrototypeOf,um=Object.prototype.hasOwnProperty;var dm=(e,t,n)=>t in e?Ta(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Ca=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var pm=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of lm(t))!um.call(e,o)&&o!==n&&Ta(e,o,{get:()=>t[o],enumerable:!(r=am(t,o))||r.enumerable});return e};var fm=(e,t,n)=>(n=e!=null?im(cm(e)):{},pm(t||!e||!e.__esModule?Ta(n,"default",{value:e,enumerable:!0}):n,e));var Mt=(e,t,n)=>dm(e,typeof t!="symbol"?t+"":t,n);var Mc=Ca((Ww,Pc)=>{var to=1e3,no=to*60,ro=no*60,qr=ro*24,gm=qr*7,hm=qr*365.25;Pc.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return bm(e);if(n==="number"&&isFinite(e))return t.long?vm(e):ym(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function bm(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*hm;case"weeks":case"week":case"w":return n*gm;case"days":case"day":case"d":return n*qr;case"hours":case"hour":case"hrs":case"hr":case"h":return n*ro;case"minutes":case"minute":case"mins":case"min":case"m":return n*no;case"seconds":case"second":case"secs":case"sec":case"s":return n*to;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function ym(e){var t=Math.abs(e);return t>=qr?Math.round(e/qr)+"d":t>=ro?Math.round(e/ro)+"h":t>=no?Math.round(e/no)+"m":t>=to?Math.round(e/to)+"s":e+"ms"}function vm(e){var t=Math.abs(e);return t>=qr?Ys(e,t,qr,"day"):t>=ro?Ys(e,t,ro,"hour"):t>=no?Ys(e,t,no,"minute"):t>=to?Ys(e,t,to,"second"):e+" ms"}function Ys(e,t,n,r){var o=t>=n*1.5;return Math.round(e/n)+" "+r+(o?"s":"")}});var Nc=Ca((zw,qc)=>{function km(e){n.debug=n,n.default=n,n.coerce=a,n.disable=s,n.enable=o,n.enabled=l,n.humanize=Mc(),n.destroy=u,Object.keys(e).forEach(d=>{n[d]=e[d]}),n.names=[],n.skips=[],n.formatters={};function t(d){let f=0;for(let h=0;h<d.length;h++)f=(f<<5)-f+d.charCodeAt(h),f|=0;return n.colors[Math.abs(f)%n.colors.length]}n.selectColor=t;function n(d){let f,h=null,g,k;function E(...C){if(!E.enabled)return;let te=E,ie=Number(new Date),z=ie-(f||ie);te.diff=z,te.prev=f,te.curr=ie,f=ie,C[0]=n.coerce(C[0]),typeof C[0]!="string"&&C.unshift("%O");let P=0;C[0]=C[0].replace(/%([a-zA-Z%])/g,(q,F)=>{if(q==="%%")return"%";P++;let H=n.formatters[F];if(typeof H=="function"){let U=C[P];q=H.call(te,U),C.splice(P,1),P--}return q}),n.formatArgs.call(te,C),(te.log||n.log).apply(te,C)}return E.namespace=d,E.useColors=n.useColors(),E.color=n.selectColor(d),E.extend=r,E.destroy=n.destroy,Object.defineProperty(E,"enabled",{enumerable:!0,configurable:!1,get:()=>h!==null?h:(g!==n.namespaces&&(g=n.namespaces,k=n.enabled(d)),k),set:C=>{h=C}}),typeof n.init=="function"&&n.init(E),E}function r(d,f){let h=n(this.namespace+(typeof f>"u"?":":f)+d);return h.log=this.log,h}function o(d){n.save(d),n.namespaces=d,n.names=[],n.skips=[];let f=(typeof d=="string"?d:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let h of f)h[0]==="-"?n.skips.push(h.slice(1)):n.names.push(h)}function i(d,f){let h=0,g=0,k=-1,E=0;for(;h<d.length;)if(g<f.length&&(f[g]===d[h]||f[g]==="*"))f[g]==="*"?(k=g,E=h,g++):(h++,g++);else if(k!==-1)g=k+1,E++,h=E;else return!1;for(;g<f.length&&f[g]==="*";)g++;return g===f.length}function s(){let d=[...n.names,...n.skips.map(f=>"-"+f)].join(",");return n.enable(""),d}function l(d){for(let f of n.skips)if(i(d,f))return!1;for(let f of n.names)if(i(d,f))return!0;return!1}function a(d){return d instanceof Error?d.stack||d.message:d}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}qc.exports=km});var jc=Ca((An,Vs)=>{An.formatArgs=$m;An.save=xm;An.load=Am;An.useColors=wm;An.storage=Sm();An.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();An.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function wm(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function $m(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+Vs.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,o=>{o!=="%%"&&(n++,o==="%c"&&(r=n))}),e.splice(r,0,t)}An.log=console.debug||console.log||(()=>{});function xm(e){try{e?An.storage.setItem("debug",e):An.storage.removeItem("debug")}catch{}}function Am(){let e;try{e=An.storage.getItem("debug")||An.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function Sm(){try{return localStorage}catch{}}Vs.exports=Nc()(An);var{formatters:Em}=Vs.exports;Em.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var Po=globalThis,Bs=Po.trustedTypes,yc=Bs?Bs.createPolicy("lit-html",{createHTML:e=>e}):void 0,Oa="$lit$",Jn=`lit$${Math.random().toFixed(9).slice(2)}$`,Ia="?"+Jn,_m=`<${Ia}>`,Lr=document,Mo=()=>Lr.createComment(""),qo=e=>e===null||typeof e!="object"&&typeof e!="function",La=Array.isArray,Ac=e=>La(e)||typeof e?.[Symbol.iterator]=="function",Ra=`[ 	
\f\r]`,Do=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,vc=/-->/g,kc=/>/g,Or=RegExp(`>|${Ra}(?:([^\\s"'>=/]+)(${Ra}*=${Ra}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),wc=/'/g,$c=/"/g,Sc=/^(?:script|style|textarea|title)$/i,Da=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),c=Da(1),jo=Da(2),Mw=Da(3),Rn=Symbol.for("lit-noChange"),zt=Symbol.for("lit-nothing"),xc=new WeakMap,Ir=Lr.createTreeWalker(Lr,129);function Ec(e,t){if(!La(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return yc!==void 0?yc.createHTML(t):t}var Tc=(e,t)=>{let n=e.length-1,r=[],o,i=t===2?"<svg>":t===3?"<math>":"",s=Do;for(let l=0;l<n;l++){let a=e[l],u,d,f=-1,h=0;for(;h<a.length&&(s.lastIndex=h,d=s.exec(a),d!==null);)h=s.lastIndex,s===Do?d[1]==="!--"?s=vc:d[1]!==void 0?s=kc:d[2]!==void 0?(Sc.test(d[2])&&(o=RegExp("</"+d[2],"g")),s=Or):d[3]!==void 0&&(s=Or):s===Or?d[0]===">"?(s=o??Do,f=-1):d[1]===void 0?f=-2:(f=s.lastIndex-d[2].length,u=d[1],s=d[3]===void 0?Or:d[3]==='"'?$c:wc):s===$c||s===wc?s=Or:s===vc||s===kc?s=Do:(s=Or,o=void 0);let g=s===Or&&e[l+1].startsWith("/>")?" ":"";i+=s===Do?a+_m:f>=0?(r.push(u),a.slice(0,f)+Oa+a.slice(f)+Jn+g):a+Jn+(f===-2?l:g)}return[Ec(e,i+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},No=class e{constructor({strings:t,_$litType$:n},r){let o;this.parts=[];let i=0,s=0,l=t.length-1,a=this.parts,[u,d]=Tc(t,n);if(this.el=e.createElement(u,r),Ir.currentNode=this.el.content,n===2||n===3){let f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}for(;(o=Ir.nextNode())!==null&&a.length<l;){if(o.nodeType===1){if(o.hasAttributes())for(let f of o.getAttributeNames())if(f.endsWith(Oa)){let h=d[s++],g=o.getAttribute(f).split(Jn),k=/([.?@])?(.*)/.exec(h);a.push({type:1,index:i,name:k[2],strings:g,ctor:k[1]==="."?Ws:k[1]==="?"?zs:k[1]==="@"?Hs:Pr}),o.removeAttribute(f)}else f.startsWith(Jn)&&(a.push({type:6,index:i}),o.removeAttribute(f));if(Sc.test(o.tagName)){let f=o.textContent.split(Jn),h=f.length-1;if(h>0){o.textContent=Bs?Bs.emptyScript:"";for(let g=0;g<h;g++)o.append(f[g],Mo()),Ir.nextNode(),a.push({type:2,index:++i});o.append(f[h],Mo())}}}else if(o.nodeType===8)if(o.data===Ia)a.push({type:2,index:i});else{let f=-1;for(;(f=o.data.indexOf(Jn,f+1))!==-1;)a.push({type:7,index:i}),f+=Jn.length-1}i++}}static createElement(t,n){let r=Lr.createElement("template");return r.innerHTML=t,r}};function Dr(e,t,n=e,r){if(t===Rn)return t;let o=r!==void 0?n._$Co?.[r]:n._$Cl,i=qo(t)?void 0:t._$litDirective$;return o?.constructor!==i&&(o?._$AO?.(!1),i===void 0?o=void 0:(o=new i(e),o._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=o:n._$Cl=o),o!==void 0&&(t=Dr(e,o._$AS(e,t.values),o,r)),t}var Us=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,o=(t?.creationScope??Lr).importNode(n,!0);Ir.currentNode=o;let i=Ir.nextNode(),s=0,l=0,a=r[0];for(;a!==void 0;){if(s===a.index){let u;a.type===2?u=new Jr(i,i.nextSibling,this,t):a.type===1?u=new a.ctor(i,a.name,a.strings,this,t):a.type===6&&(u=new Ks(i,this,t)),this._$AV.push(u),a=r[++l]}s!==a?.index&&(i=Ir.nextNode(),s++)}return Ir.currentNode=Lr,o}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},Jr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,o){this.type=2,this._$AH=zt,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=Dr(this,t,n),qo(t)?t===zt||t==null||t===""?(this._$AH!==zt&&this._$AR(),this._$AH=zt):t!==this._$AH&&t!==Rn&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ac(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==zt&&qo(this._$AH)?this._$AA.nextSibling.data=t:this.T(Lr.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,o=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=No.createElement(Ec(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===o)this._$AH.p(n);else{let i=new Us(o,this),s=i.u(this.options);i.p(n),this.T(s),this._$AH=i}}_$AC(t){let n=xc.get(t.strings);return n===void 0&&xc.set(t.strings,n=new No(t)),n}k(t){La(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,o=0;for(let i of t)o===n.length?n.push(r=new e(this.O(Mo()),this.O(Mo()),this,this.options)):r=n[o],r._$AI(i),o++;o<n.length&&(this._$AR(r&&r._$AB.nextSibling,o),n.length=o)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Pr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,o,i){this.type=1,this._$AH=zt,this._$AN=void 0,this.element=t,this.name=n,this._$AM=o,this.options=i,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=zt}_$AI(t,n=this,r,o){let i=this.strings,s=!1;if(i===void 0)t=Dr(this,t,n,0),s=!qo(t)||t!==this._$AH&&t!==Rn,s&&(this._$AH=t);else{let l=t,a,u;for(t=i[0],a=0;a<i.length-1;a++)u=Dr(this,l[r+a],n,a),u===Rn&&(u=this._$AH[a]),s||(s=!qo(u)||u!==this._$AH[a]),u===zt?t=zt:t!==zt&&(t+=(u??"")+i[a+1]),this._$AH[a]=u}s&&!o&&this.j(t)}j(t){t===zt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Ws=class extends Pr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===zt?void 0:t}},zs=class extends Pr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==zt)}},Hs=class extends Pr{constructor(t,n,r,o,i){super(t,n,r,o,i),this.type=5}_$AI(t,n=this){if((t=Dr(this,t,n,0)??zt)===Rn)return;let r=this._$AH,o=t===zt&&r!==zt||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,i=t!==zt&&(r===zt||o);o&&this.element.removeEventListener(this.name,this,r),i&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Ks=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){Dr(this,t)}},Cc={M:Oa,P:Jn,A:Ia,C:1,L:Tc,R:Us,D:Ac,V:Dr,I:Jr,H:Pr,N:zs,U:Hs,B:Ws,F:Ks},mm=Po.litHtmlPolyfillSupport;mm?.(No,Jr),(Po.litHtmlVersions??(Po.litHtmlVersions=[])).push("3.3.1");var dt=(e,t,n)=>{let r=n?.renderBefore??t,o=r._$litPart$;if(o===void 0){let i=n?.renderBefore??null;r._$litPart$=o=new Jr(t.insertBefore(Mo(),i),i,void 0,n??{})}return o._$AI(e),o};var Gs="today",Rc=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}],eo=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"}];function zn(e){return e==="today"?"today":"7d"}function Pa(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function Mr(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function Oc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Ic(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Lc(){let e=null,t=[],n,r=new Set;function o(){for(let i of Array.from(r))try{i()}catch{}}return{get(){return e},getWorkspacesState(){return t},crossLanes(){return n},set(i,s,l){e=Array.isArray(i)?i:null,t=Array.isArray(s)?s:[],n=l===void 0?void 0:l!==null&&typeof l=="object"&&typeof l.revision=="number"&&Array.isArray(l.lanes)?{revision:l.revision,lanes:l.lanes}:null,o()},clear(){e=null,t=[],n=void 0,o()},subscribe(i){return r.add(i),()=>r.delete(i)}}}function Dc(){let e=new Map,t=new Set;function n(o){return o.startsWith("session-log:")?o:`session-log:${o}`}function r(){for(let o of Array.from(t))try{o()}catch{}}return{set(o,i,s=null){e.set(n(o),{lines:Array.isArray(i)?[...i]:[],last_event_at:typeof s=="number"?s:null}),r()},append(o,i){let s=n(o),l=e.get(s)||{lines:[],last_event_at:null};l.lines=[...l.lines,i],l.last_event_at=Date.now(),e.set(s,l),r()},get(o){return e.get(n(o))||null},clear(o){typeof o=="string"?e.delete(n(o)):e.clear(),r()},subscribe(o){return t.add(o),()=>t.delete(o)}}}var Fc=fm(jc(),1);function Ut(e){return(0,Fc.default)(`beads-ui:${e}`)}function Tm(e){let n=Bc((e&&typeof e=="object"?e:{}).spec_id);return n?{path:n,source:"native",conflict:!1}:{path:"",source:"none",conflict:!1}}function Bc(e){return typeof e=="string"?e.trim():""}function Cm(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}var Rm=/^[A-Za-z0-9_.:-]+@[0-9a-fA-F]{40}$/;function oo(e){let t=Tm(e),n=Bc(Cm(e).spec_review),r=Rm.test(n),o=r&&n.slice(0,n.indexOf("@"))==="skipped";return t.source==="none"?{...t,evidence:"none",skipped:o}:{...t,evidence:r?"published":"draft",skipped:o}}function Ln(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Fo(e,t){let n=Ln(e.created_at),r=Ln(t.created_at);if(n!==r)return n<r?1:-1;let o=e.priority??2,i=t.priority??2;if(o!==i)return o-i;let s=e.id,l=t.id;return s<l?-1:s>l?1:0}function Gc(e,t){let n=Ln(e.created_at),r=Ln(t.created_at);if(n!==r)return n<r?-1:1;let o=e.priority??2,i=t.priority??2;if(o!==i)return o-i;let s=e.id,l=t.id;return s<l?-1:s>l?1:0}function Yc(e,t){let n=Ln(e.updated_at),r=Ln(t.updated_at);if(n!==r)return n<r?1:-1;let o=e.id,i=t.id;return o<i?-1:o>i?1:0}function Vc(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let o=Ln(e.created_at),i=Ln(t.created_at);if(o!==i)return o<i?1:-1;let s=e.id,l=t.id;return s<l?-1:s>l?1:0}function Qc(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let o=e?.id,i=t?.id;return o<i?-1:o>i?1:0}var Qs=Object.freeze({priority:"asc",dependents:"desc",released:"desc",spec:"desc",created:"asc",updated:"desc"});function Om(e){return typeof e=="string"&&Object.prototype.hasOwnProperty.call(Qs,e)}function qa(e){if(!e||typeof e!="object")return!1;let t=e;return Om(t.key)&&(t.dir==="asc"||t.dir==="desc")}function Uc(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function Wc(e,t){switch(t){case"priority":{let n=e.priority;return typeof n=="number"&&Number.isFinite(n)?n:null}case"dependents":{let n=e.dependents_info?e.dependents_info.count:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"released":{let n=e.release_info?e.release_info.last_released_at:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"spec":return oo(e).evidence==="published"?1:0;case"created":return Uc(e.created_at);case"updated":return Uc(e.updated_at);default:return null}}function zc(e,t,n){let r=Wc(e,n.key),o=Wc(t,n.key);if(r===null||o===null)return r===o?0:r===null?1:-1;if(r===o)return 0;let i=r<o?-1:1;return n.dir==="desc"?-i:i}function Xc(e){let t=Array.isArray(e)?e.filter(qa):[];return(n,r)=>{for(let l of t){let a=zc(n,r,l);if(a!==0)return a}let o=zc(n,r,{key:"created",dir:"asc"});if(o!==0)return o;let i=n.id,s=r.id;return i<s?-1:i>s?1:0}}var Im=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Hc(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Kc(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=Im.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Zc(e,t){let n=Hc(e),r=Hc(t);if(n!==r)return n<r?-1:1;let o=Kc(e),i=Kc(t);if(o!==i)return o<i?-1:1;let s=Ln(e&&e.created_at),l=Ln(t&&t.created_at);if(s!==l)return s<l?-1:1;let a=e&&e.id,u=t&&t.id;return a===u?0:String(a)<String(u)?-1:1}var Ma=2**20;function so(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-Ln(e&&e.created_at)}function Jc(e){return(t,n)=>{let r=so(t,e),o=so(n,e);if(r!==o)return r<o?-1:1;let i=t?.id,s=n?.id;return i<s?-1:i>s?1:0}}function Na(e,t,n){let r=Array.isArray(e)?e:[],o=r.length,i=Math.max(0,Math.min(t,o-1)),s=i-1>=0?r[i-1]:null,l=i+1<o?r[i+1]:null;if(!s&&!l)return{rank:0};if(!s)return{rank:so(l,n)-Ma};if(!l)return{rank:so(s,n)+Ma};let a=so(s,n),u=so(l,n),d=(a+u)/2;return a<d&&d<u?{rank:d}:{renormalize:r.map((f,h)=>({bead_id:f.id,rank:h*Ma}))}}function ja(e,t={}){let n=Ut(`issue-store:${e}`),r=new Map,o=[],i=0,s=new Set,l=!1,a=t.sort||Fo;function u(){for(let h of Array.from(s))try{h()}catch{}}function d(){o=Array.from(r.values()).sort(a)}function f(h){if(l||!h||h.id!==e)return;let g=Number(h.revision)||0;if(n("apply %s rev=%d",h.type,g),!(g<=i&&h.type!=="snapshot")){if(h.type==="snapshot"){if(g<=i)return;r.clear();let k=Array.isArray(h.issues)?h.issues:[];for(let E of k)E&&typeof E.id=="string"&&E.id.length>0&&r.set(E.id,E);d(),i=g,u();return}if(h.type==="upsert"){let k=h.issue;if(k&&typeof k.id=="string"&&k.id.length>0){let E=r.get(k.id);if(!E)r.set(k.id,k);else{let C=Number.isFinite(E.updated_at)?E.updated_at:0,te=Number.isFinite(k.updated_at)?k.updated_at:0;if(C<=te){for(let ie of Object.keys(E))ie in k||delete E[ie];for(let[ie,z]of Object.entries(k))E[ie]=z}}d()}i=g,u()}else if(h.type==="delete"){let k=String(h.issue_id||"");k&&(r.delete(k),d()),i=g,u()}}}return{id:e,subscribe(h){return s.add(h),()=>{s.delete(h)}},applyPush:f,snapshot(){return o},size(){return r.size},getById(h){return r.get(h)},dispose(){l=!0,r.clear(),o=[],s.clear(),i=0}}}function Xs(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let o=Object.keys(e.params).sort();for(let i of o){let s=e.params[i];n[i]=String(s)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function eu(e){let t=Ut("subs"),n=new Map,r=new Map;function o(l,a){t("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let u=r.get(l);if(!u||u.size===0)return;let d=Array.isArray(a.added)?a.added:[],f=Array.isArray(a.updated)?a.updated:[],h=Array.isArray(a.removed)?a.removed:[];for(let g of Array.from(u)){let k=n.get(g);if(!k)continue;let E=k.itemsById;for(let C of d)typeof C=="string"&&C.length>0&&E.set(C,!0);for(let C of f)typeof C=="string"&&C.length>0&&E.set(C,!0);for(let C of h)typeof C=="string"&&C.length>0&&E.delete(C)}}async function i(l,a){let u=Xs(a);if(t("subscribe %s key=%s",l,u),!n.has(l))n.set(l,{key:u,itemsById:new Map});else{let f=n.get(l);if(f&&f.key!==u){let h=r.get(f.key);h&&(h.delete(l),h.size===0&&r.delete(f.key)),n.set(l,{key:u,itemsById:new Map})}}r.has(u)||r.set(u,new Set);let d=r.get(u);d&&d.add(l);try{await e("subscribe-list",{id:l,type:a.type,params:a.params})}catch(f){let h=n.get(l)||null;if(h){let g=r.get(h.key);g&&(g.delete(l),g.size===0&&r.delete(h.key))}throw n.delete(l),f}return async()=>{t("unsubscribe %s key=%s",l,u);try{await e("unsubscribe-list",{id:l})}catch{}let f=n.get(l)||null;if(f){let h=r.get(f.key);h&&(h.delete(l),h.size===0&&r.delete(f.key))}n.delete(l)}}return{subscribeList:i,_applyDelta:o,_subKeyOf:Xs,selectors:{getIds(l){let a=n.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let u=n.get(l);return u?u.itemsById.has(a):!1},count(l){let a=n.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=n.get(l),u={};if(!a)return u;for(let d of a.itemsById.keys())u[d]=!0;return u}}}}function tu(){let e=Ut("issue-stores"),t=new Map,n=new Map,r=new Set,o=new Map;function i(){for(let a of Array.from(r))try{a()}catch{}}function s(a,u,d){let f=u?Xs(u):"",h=n.get(a)||"",g=t.has(a);if(e("register %s key=%s (prev=%s)",a,f,h),g&&h&&f&&h!==f){let k=t.get(a);if(k)try{k.dispose()}catch{}let E=o.get(a);if(E){try{E()}catch{}o.delete(a)}let C=ja(a,d);t.set(a,C);let te=C.subscribe(()=>i());o.set(a,te)}else if(!g){let k=ja(a,d);t.set(a,k);let E=k.subscribe(()=>i());o.set(a,E)}return n.set(a,f),()=>l(a)}function l(a){e("unregister %s",a),n.delete(a);let u=t.get(a);u&&(u.dispose(),t.delete(a));let d=o.get(a);if(d){try{d()}catch{}o.delete(a)}}return{register:s,unregister:l,getStore(a){return t.get(a)||null},snapshotFor(a){let u=t.get(a);return u?u.snapshot().slice():[]},subscribe(a){return r.add(a),()=>r.delete(a)}}}function nu(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function ru(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Fa(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function Lm(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),o=r>=0?n.slice(r+1):"";if(o){let l=new URLSearchParams(o).get("issue");if(l)return decodeURIComponent(l)}let i=/^\/issue\/([^\s?#]+)/.exec(n);return i&&i[1]?decodeURIComponent(i[1]):null}function Dm(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function ou(e){let t=Ut("router"),n=()=>{let r=window.location.hash||"",o=/^#\/issue\/([^\s?#]+)/.exec(r),i=o&&o[1]?decodeURIComponent(o[1]):Lm(r),s=Dm(r);if(t("hash change \u2192 view=%s id=%s",s,i),e.setState({selected_id:s==="worker"?null:i,view:s,worker:{selected_parent_id:s==="worker"?i:null}}),!!o||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let a=i?`#/${s}?issue=${encodeURIComponent(i)}`:`#/${s}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let o=e.getState?e.getState():{view:"board"},i=o.view==="worker"||o.view==="monitor"?o.view:"board",s=Fa(i,r);t("goto issue %s (view=%s)",r,i),window.location.hash!==s?window.location.hash=s:e.setState({selected_id:i==="worker"?null:r,view:i,worker:{selected_parent_id:i==="worker"?r:null}})},gotoView(r){let o=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},i=r==="worker"?o.worker?.selected_parent_id:o.selected_id,s=i?Fa(r,i):`#/${r}`;t("goto view %s (id=%s)",r,i||""),window.location.hash!==s?window.location.hash=s:e.setState({view:r,selected_id:r==="worker"?null:o.selected_id})}}}var Pm=Object.freeze({workspace_config:{default_workspace:null}});function su(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:Pm.workspace_config.default_workspace}}}function iu(e={}){let t=Ut("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:su(e.config)},r=new Set;function o(){for(let i of Array.from(r))try{i(n)}catch{}}return{getState(){return n},setState(i){let s={...n,...i,filters:{...n.filters,...i.filters||{}},board:{...n.board,...i.board||{}},worker:{...n.worker,...i.worker||{}},workspace:{current:i.workspace?.current!==void 0?i.workspace.current:n.workspace.current,available:i.workspace?.available!==void 0?i.workspace.available:n.workspace.available,hidden:i.workspace?.hidden!==void 0?i.workspace.hidden:n.workspace.hidden},config:i.config!==void 0?su(i.config):n.config},l=s.workspace.current?.path!==n.workspace.current?.path||s.workspace.available.length!==n.workspace.available.length||s.workspace.hidden.length!==n.workspace.hidden.length||s.workspace.hidden.some((u,d)=>u!==n.workspace.hidden[d]),a=s.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;s.selected_id===n.selected_id&&s.view===n.view&&s.filters.status===n.filters.status&&s.filters.search===n.filters.search&&s.filters.type===n.filters.type&&s.board.closed_filter===n.board.closed_filter&&s.worker.selected_parent_id===n.worker.selected_parent_id&&s.worker.show_closed_children.length===n.worker.show_closed_children.length&&s.worker.show_closed_children.every((u,d)=>u===n.worker.show_closed_children[d])&&!l&&!a||(n=s,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),o())},subscribe(i){return r.add(i),()=>r.delete(i)}}}function au(e){let t=Ut("activity"),n=0,r=new Map,o=1;function i(){if(!e)return;let u=n>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function s(){n+=1,t("start count=%d",n),i()}function l(){let u=n;n=Math.max(0,n-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,n),i()}function a(u){return async(f,h)=>{let g=o++,k=Date.now();r.set(g,{type:f,start_ts:k}),t("request start id=%d type=%s count=%d",g,f,n+1),s();let E=!1,C=()=>{E||(E=!0,r.delete(g),l())},te=setTimeout(()=>{E||(t("request TIMEOUT id=%d type=%s elapsed=%dms",g,f,Date.now()-k),C())},3e4);try{let ie=await u(f,h),z=Date.now()-k;return t("request done id=%d type=%s elapsed=%dms",g,f,z),ie}catch(ie){let z=Date.now()-k;throw t("request error id=%d type=%s elapsed=%dms err=%o",g,f,z,ie),ie}finally{clearTimeout(te),C()}}}return i(),{wrapSend:a,start:s,done:l,getCount:()=>n,getActiveRequests:()=>{let u=Date.now();return Array.from(r.entries()).map(([d,f])=>({id:d,type:f.type,elapsed_ms:u-f.start_ts}))}}}function me(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}function io(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let i=t.get();return i&&i.order?i.order:{}}function r(i,s,l){let a=e&&e.snapshotFor?e.snapshotFor(i).slice():[];if(s==="closed")return a.sort(Qc),a;switch(l){case"created_desc":return a.sort(Fo),a;case"created_asc":return a.sort(Gc),a;case"updated_desc":return a.sort(Yc),a;case"priority":return a.sort(Vc),a;case"manual":default:{let u=n();return u?a.sort(Jc(u)):a.sort(Fo),a}}}function o(i){let s=[];return e&&typeof e.subscribe=="function"&&s.push(e.subscribe(i)),t&&typeof t.subscribe=="function"&&s.push(t.subscribe(i)),()=>{for(let l of s)try{l()}catch{}}}return{selectBoardColumn:r,subscribe:o}}function pr(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function sn(e){let t=pr(e);if(t===null)return"";let n=new Date(t),r=o=>String(o).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function bn(e,t){let n=pr(e);if(n===null)return"";let o=(typeof t=="number"?t:Date.now())-n;if(o<6e4)return"\uBC29\uAE08";let i=Math.floor(o/6e4);if(i<60)return`${i}\uBD84 \uC804`;let s=Math.floor(o/36e5);if(s<24)return`${s}\uC2DC\uAC04 \uC804`;let l=Math.floor(o/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let u=Math.floor(l/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function lu(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let o=pr(r.updated_at)??0;if(t===null||o>n){t=r,n=o;continue}o===n&&String(r.id)<String(t.id)&&(t=r)}return t}function Zs(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Js(e){let t=new Map;for(let r of e)r&&r.id&&!t.has(r.id)&&t.set(r.id,r);let n=new Map;for(let r of t.values()){let o=Zs(r);if(!o)continue;let i=n.get(o);i||(i=[],n.set(o,i)),i.push({id:r.id,title:r.title,status:r.status,metadata:r.metadata,workflow:r.workflow,created_at:r.created_at,updated_at:r.updated_at})}return n}function ei(e,t){let n=e.get(t)||[],r=0;for(let i of n)(i.status==="resolved"||i.status==="closed")&&(r+=1);let o=lu(n);return{total:n.length,count:r,current:o,children:n}}function cu(e){let t=e.transport,n=e.uiOrderStore;function r(s,l){return"renormalize"in s?s.renormalize:[{bead_id:l,rank:s.rank}]}function o(s,l){let a={...s.order};for(let u of l)a[u.bead_id]=u.rank;n&&n.set({revision:s.revision,order:a})}async function i(s,l,a){if(!t||!n)return;let u=n.get()||{revision:0,order:{}},d=r(Na(l,a,u.order),s);o(u,d);let f=await t("ui-order-set",{expected_revision:u.revision,entries:d});if(f&&f.conflict){let h={revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}};n.set(h);let g=r(Na(l,a,h.order),s);o(h,g);let k=await t("ui-order-set",{expected_revision:h.revision,entries:g});k&&k.applied&&n.set({revision:typeof k.revision=="number"?k.revision:0,order:k.order||{}})}else f&&f.applied&&n.set({revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}})}return{applyReorder:i}}function uu(e){if(typeof e!="string")return"";let t=e.indexOf("-");return t>0?e.slice(0,t):""}function er(e,t){let n=uu(e),r=uu(t);return n.length===0||r.length===0?!1:n!==r}function ti(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Ba(e,t){return!t||typeof e!="string"||e.length===0||ti(t.visible_labels).includes(e)?!0:ti(t.hidden_labels).includes(e)?!1:!ti(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function du(e,t){return ti(e).filter(n=>Ba(n,t))}function fr(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}function Mm(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function qm(e,t,n,r,o){return c`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${r?"true":"false"}
    @click=${o}
  >
    children ${t}/${n} ${r?"\u25B4":"\u25BE"}
  </button>`}function Nm(e,t,n,r){return c`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${r?o=>r(o,e.id):void 0}
  >
    <span class=${Mm(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${n}
  </button>`}function ni(e,t){let n=e.total||0,r=!!t.expanded,o=t.trailing??"",i=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(n===0&&i===null)return"";let s=Array.isArray(e.children)?e.children:[],l=n>0?s.slice().sort(Zc):s;return c`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?qm(t.parent_id,e.count,n,r,t.onToggle):c`<span class="board-card__roll-none">${i}</span>`}
        ${o}
      </div>
      ${n>0&&e.current?c`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${r&&n>0?c`<div class="board-card__roll-list">
            ${l.map((a,u)=>Nm(a,u+1,t.childChips?t.childChips(a):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var jm={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},fu={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},pu={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},Fm={review:"\u2713",skip:"\u2298"},_r={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function Bm(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let o of e){let i=t[o];if(i&&i.fill==="dim"&&i.stale!==!0)return o}return null}function _u(e){let t=e&&e.fill||"none";return t==="none"?_r.none:e&&e.stale===!0?_r.stale:t==="dim"?_r.dim:e&&e.glyph==="review"?_r.review:e&&e.glyph==="skip"?_r.skip:_r.done}function Um(e){if(!e||e.fill==="none"||!e.approval_state)return _u(e);let t=[];return e.glyph==="review"?t.push(_r.review):e.glyph==="skip"&&t.push(_r.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function Wm(e,t,n,r){let o=jm[e]||e,i=t&&t.fill||"none",s=!!t&&t.stale===!0,l=Fm[t&&t.glyph||""]||"",a="bar";i==="dim"?a+=` b-${o} dim`:i==="full"&&(a+=` b-${o} full`),s&&(a+=" stale"),n&&(a+=" cur");let u=i==="none"?"lbl":`lbl l-${o} on`,d=n?`color: var(--stage-${o}-on)`:"",f=fu[e]||e,h=r?mu(t):null;if(!h)return c`
      <div class="seg">
        <div class=${a} style=${d}>${l}</div>
        <div class=${u}>${f}</div>
      </div>
    `;let g=`${f} \uBB38\uC11C \uC5F4\uAE30 \xB7 ${h.path}`;return c`
    <button
      type="button"
      class="seg seg--doc"
      aria-label=${g}
      title=${g}
      @click=${k=>{k.preventDefault(),k.stopPropagation(),r(k,h,e)}}
    >
      <div class=${a} style=${d}>${l}</div>
      <div class=${u}>${f}</div>
    </button>
  `}function mu(e){let t=e?e.doc:null;return!t||typeof t.path!="string"||t.path.length===0?null:t}function ri(e,t,n={}){if(!e||!e.stages)return"";let r=n.onOpenDoc,o=pu[e.route]||pu.spec_backed,i=e.stages,s=Bm(o,i,String(t||"open")),l=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${o.map(u=>`${fu[u]||u} ${u==="plan"?Um(i[u]||{}):_u(i[u]||{})}`).join(" \xB7 ")}`,a=!!r&&o.some(u=>mu(i[u]||{})!==null);return c`
    <div
      class="stp"
      role=${a?"group":"img"}
      aria-label=${l}
    >
      ${o.map(u=>Wm(u,i[u]||{},u===s,r))}
    </div>
  `}function zm(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var gu=2;function hu(e){let t=e.slice(0,gu).join(", "),n=e.length-gu;return`\u26D3 blocked: ${t}${n>0?` +${n}`:""}`}function Hm(e,t){if(!t)return[];let n=[],r=Array.isArray(t.blockers)?t.blockers:[],o=[],i=[];for(let s of r)(er(e,s)?i:o).push(s);return o.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-dep"
        >${hu(o)}</span
      >`),i.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-foreign"
        >${hu(i)}</span
      >`),n}function Km(e){if(!e||typeof e!="object")return null;let t=e.awaiting_user;if(typeof t!="string")return null;let n=t.trim();return n.length===0?null:c`<span class="ctl-chip ctl-chip--blocked"
    >${`\u23F8 \uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694: ${n}`}</span
  >`}function Ua(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function oi(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function tr(e){return`${e.kind}:${oi(e)}@${e.sha}`}function si(e,t){if(!e)return null;let n=Ua(e.kind),r=e.reason,o=e.kind==="delegated"?r===null:typeof r=="string"&&r.trim().length>0&&!/[\r\n]/.test(r);if(!n||!o)return null;let i=Ua(t?.kind),s=i!==null&&t?.kind!==e.kind,l=`\uACC4\uD68D \xB7 ${n}${s?` \u2192 ${i}`:""}`,a=`planned_execution ${e.kind}${typeof r=="string"?`:${r}`:""}`,u=t?` \xB7 exec_receipt ${tr(t)}`:"";return{kind:e.kind,label:l,title:`${a}${u}`}}function bu(e,t){let n=si(e,t);return n?c`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${n.kind}
        title=${n.title}
        >${n.label}</span
      >`:null}function Gm(e){if(!e)return null;let t=Ua(e.kind);return t?c`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${tr(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function Ym(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},o=[];if(r.route&&fr(n,"route")){let l=r.route_source==="derived";o.push(c`<span
        class="ctl-chip ctl-chip--route${l?" is-derived":""}"
        title=${l?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${l?"unset":r.route}</span
      >`)}if(r.fast_track&&fr(n,"fast_track")&&o.push(c`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),r.pr&&fr(n,"pr")){let l=r.pr.number;o.push(c`<span class="ctl-chip ctl-chip--pr"
        >${`PR${l!=null?` #${l}`:""}`}</span
      >`)}let i=bu(r.planned_execution,r.exec_receipt);if(i&&o.push(i),r.exec_receipt){let l=r.exec_receipt;o.push(c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${tr(l)}`}
        >${`exec ${l.kind==="delegated"?oi(l):`main:${l.actor}`} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}if(r.impl_entry){let l=r.impl_entry;o.push(c`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${l.actor}@${l.sha}`}
        >${`impl ${l.actor} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}for(let l of du(e.labels,n))o.push(c`<span class="ctl-chip ctl-chip--label">${l}</span>`);if(e.from_id&&fr(n,"from")&&o.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${l=>{l.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(l,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),fr(n,"blocked")){let l=Km(e.metadata);l&&o.push(l),o.push(...Hm(e.id,e.blocked_info))}return t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&fr(n,"blocked")&&o.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),o.length===0?"":c`<div class="board-card__chips">${o}</div>`}function Vm(e){let t=bn(e.created_at),n=bn(e.updated_at);return!t&&!n?"":c`<span class="board-card__times">
    ${t?c`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${sn(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&n?c`<span class="board-card__time-sep">·</span>`:""}
    ${n?c`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${sn(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </span>`}function Qm(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return ni(n,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:Vm(e),empty_label:"children \uC5C6\uC74C",childChips:Wa,onToggle:r=>t.onRollupToggle&&t.onRollupToggle(r,e.id),onChildClick:(r,o)=>t.onChildClick&&t.onChildClick(r,o)})}function Wa(e){let t=e?.workflow?.chips?.planned_execution,n=e?.workflow?.chips?.exec_receipt;return si(t,n)?c`<span class="board-card__roll-child-chips">
    ${bu(t,n)}
    ${Gm(n)}
  </span>`:null}function ii(e,t){let n=zm(e.priority);return c`
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
      ${Ym(e,t)}
      ${e.workflow&&fr(t.policy||null,"stepper")?ri(e.workflow,e.status,{onOpenDoc:t.onOpenDoc}):""}
      ${Qm(e,t)}
    </article>
  `}function ao(e,t){let n=Array.isArray(e.items)?e.items.length:0,r=e.is_closed===!0;return c`
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
              ${Rc.map(i=>c`<option
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
        ${e.items.map(i=>ii(i,t))}
      </div>
    </section>
  `}function yu(e,t,n){return c`
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
          ${e.items.length===0?c`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(r=>ii(r,t))}
        </div>
      </div>
    </dialog>
  `}var Xm=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],Zm=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],Jm=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function eg(e,t,n){let r=e.labels.length,o=r>0?`\uB77C\uBCA8 ${r}`:"\uB77C\uBCA8";return c`
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
  `}function vu(e,t,n){return c`
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
        ${Xm.map(r=>c`<option
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
        ${Zm.map(r=>c`<option
              value=${r.value}
              ?selected=${e.type===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      ${eg(e,t,n)}
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
        ${Jm.map(r=>c`<option
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
  `}var tg=200,ng={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},rg=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),ku="beads-ui.board.sort",wu=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function og(){try{let e=window.localStorage.getItem(ku);if(e&&wu.has(e))return e}catch{}return"created_desc"}function $u(e,t){let n=Ut("views:board"),r=t.gotoIssue,o=t.issueStores,i=t.transport,s=t.uiOrderStore,l=t.displayPolicyStore,a=t.workerQueueStore,u=t.onClosedRangeChange,d=t.onNewIssue,f=t.openDoc,h=t.closedRange||Gs,g=o?io(o,s):null,k=cu({transport:i,uiOrderStore:s}),E=[],C=[],te=[],ie=[],z=[],P=[],I=!1,q=0,F=og(),H=new Map,U=new Map,M=new Map,Q=new Set,B={search:"",priority:"",type:"",labels:[]},ne=!1,ge=null;function Oe(ue){return String(ue.status||"open")==="open"}function K(ue){return String(ue.status||"open")==="open"}function re(ue){let he=B.search.trim().toLowerCase(),Ke=B.priority,nt=B.type,Je=B.labels;return ue.filter(ut=>{if(he){let ft=String(ut.id||"").toLowerCase(),ot=String(ut.title||"").toLowerCase();if(!ft.includes(he)&&!ot.includes(he))return!1}if(Ke!==""&&String(ut.priority)!==Ke||nt!==""&&String(ut.issue_type||"")!==nt)return!1;if(Je.length>0){let ft=Array.isArray(ut.labels)?ut.labels:[];if(!Je.some(ot=>ft.includes(ot)))return!1}return!0})}function pe(){let ue=new Set;for(let he of[E,C,te,ie,z,P])for(let Ke of he){let nt=Array.isArray(Ke.labels)?Ke.labels:[];for(let Je of nt)typeof Je=="string"&&Je.length>0&&ue.add(Je)}return Array.from(ue).sort()}function Te(){return B.search.trim()!==""||B.priority!==""||B.type!==""||B.labels.length>0}function Y(){try{if(g){let ue=g.selectBoardColumn("tab:board:in-progress","in_progress",F),he=g.selectBoardColumn("tab:board:blocked","blocked",F).filter(K),Ke=new Set(ue.map(j=>j.id)),nt=g.selectBoardColumn("tab:board:ready","ready",F).filter(j=>Oe(j)&&!Ke.has(j.id)),Je=g.selectBoardColumn("tab:board:resolved","resolved",F),ut=g.selectBoardColumn("tab:board:deferred","deferred",F),ft=g.selectBoardColumn("tab:board:closed","closed").slice(0,tg),ot=[...he,...nt,...ue,...Je,...ft];ae(ot);let Ne=new Set;for(let j of ot)j&&j.id&&!Zs(j)&&Ne.add(j.id);let A=!Te();E=A?Bo(he,Ne):he,C=A?Bo(nt,Ne):nt,te=A?Bo(ue,Ne):ue,ie=A?Bo(Je,Ne):Je,z=ut,q=ut.length,P=A?Bo(ft,Ne):ft,H=new Map;for(let j of E)H.set(j.id,"open");for(let j of C)H.set(j.id,"open");for(let j of te)H.set(j.id,"in_progress");for(let j of ie)H.set(j.id,"resolved");for(let j of z)H.set(j.id,"deferred");for(let j of P)H.set(j.id,"closed");U=new Map;for(let j of E)U.set(j.id,"blocked-col");for(let j of C)U.set(j.id,"ready-col");for(let j of te)U.set(j.id,"in-progress-col");for(let j of ie)U.set(j.id,"resolved-col");for(let j of P)U.set(j.id,"closed-col")}Ve()}catch{E=[],C=[],te=[],ie=[],z=[],P=[],M=new Map,Ve()}}function ae(ue){M=Js(ue)}function Z(ue){return ei(M,ue)}function be(ue){return!Q.has(ue)}function Ie(ue,he){ue.preventDefault(),ue.stopPropagation(),Q.has(he)?Q.delete(he):Q.add(he),Ve()}function ye(ue,he){ue.preventDefault(),ue.stopPropagation(),r(he)}function Le(ue,he){ue.preventDefault(),ue.stopPropagation(),r(he)}function Ge(ue,he){ge||r(he)}function gt(ue,he){ue.preventDefault(),ue.stopPropagation(),sg(he).then(Ke=>{Ke&&me("\uBCF5\uC0AC\uB428","success",1200)})}function V(ue,he){ge=he,ue.dataTransfer&&(ue.dataTransfer.setData("text/plain",he),ue.dataTransfer.effectAllowed="move"),ue.target.classList.add("board-card--dragging")}function J(ue){ue.target.classList.remove("board-card--dragging"),Ze(),setTimeout(()=>{ge=null},0)}function oe(ue){let he=String(ue.target.value||"");!he||he===h||(h=he,u&&u(he),Ve())}function de(){return l?l.get():null}function Ee(ue){let he=a?a.get():null,Ke=he?he.cleanup_failed:null;if(!Ke||typeof Ke!="object"||Array.isArray(Ke))return null;let nt=Ke[ue];return!nt||typeof nt!="object"||Array.isArray(nt)?null:nt}let _e={onCardClick:Ge,onCopyId:gt,onDragStart:V,onDragEnd:J,onClosedRangeChange:oe,rollupFor:Z,isExpanded:be,onRollupToggle:Ie,onChildClick:ye,onFromChipClick:Le,onOpenDoc:f?(ue,he)=>f(he):void 0,cleanupFailureFor:Ee,get policy(){return de()}};function Re(ue,he){ge||(ze(),r(he))}function Fe(ue,he){ue.preventDefault(),ue.stopPropagation(),ze(),r(he)}let Ye={..._e,onCardClick:Re,onChildClick:Fe,onFromChipClick:Fe,onOpenDoc:f?(ue,he)=>{ze(),f(he)}:void 0,get policy(){return de()}};function Be(ue){let he=ue.target,Ke=e.querySelector(".board-filter__labels");he&&Ke&&Ke.contains(he)||Se()}function ee(ue){ue.key==="Escape"&&Se()}function G(){ne||(ne=!0,document.addEventListener("mousedown",Be),document.addEventListener("keydown",ee),Ve())}function Se(){ne&&(ne=!1,document.removeEventListener("mousedown",Be),document.removeEventListener("keydown",ee),Ve())}function ht(ue){ue.key==="Escape"&&ze()}function at(){I||(I=!0,document.addEventListener("keydown",ht),Ve())}function ze(){I&&(I=!1,document.removeEventListener("keydown",ht),Ve())}let et={onClose:ze,onOverlayClick(ue){ue.target===ue.currentTarget&&ze()}},St={onSearchInput(ue){B.search=String(ue.target.value||""),Y()},onPriorityChange(ue){B.priority=String(ue.target.value||""),Y()},onTypeChange(ue){B.type=String(ue.target.value||""),Y()},onSortChange(ue){let he=String(ue.target.value||"");if(!(!wu.has(he)||he===F)){F=he;try{window.localStorage.setItem(ku,he)}catch{}Y()}},onDeferredToggle(){I?ze():at()},onLabelMenuToggle(){ne?Se():G()},onLabelToggle(ue){let he=B.labels.indexOf(ue);he===-1?B.labels.push(ue):B.labels.splice(he,1),Y()},onLabelClear(){B.labels.length!==0&&(B.labels=[],Y())},onNewIssue(){d&&d()}};function pt(){return c`
      <div class="board-view">
        ${vu(B,St,{sort_mode:F,deferred_popup_open:I,deferred_count:q,label_options:pe(),label_menu_open:ne})}
        <div class="board-root">
          ${ao({title:"Blocked",id:"blocked-col",items:re(E)},_e)}
          ${ao({title:"Ready",id:"ready-col",items:re(C)},_e)}
          ${ao({title:"In progress",id:"in-progress-col",items:re(te)},_e)}
          ${ao({title:"Resolved",id:"resolved-col",items:re(ie)},_e)}
          ${ao({title:"Closed",id:"closed-col",items:re(P),is_closed:!0,closed_range:h},_e)}
        </div>
        ${I?yu({items:re(z),count:q},Ye,et):""}
      </div>
    `}function Ve(){dt(pt(),e),w()}function w(){try{let ue=e.querySelector("#deferred-popup");ue&&!ue.open&&(typeof ue.showModal=="function"?ue.showModal():ue.setAttribute("open",""));let he=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let Ke of he)Array.from(Ke.querySelectorAll(".board-card")).forEach((Je,ut)=>{Je.tabIndex=ut===0?0:-1})}catch{}}async function se(ue,he){if(!i){me("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await i("update-status",{id:ue,status:he}),me("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(Ke){n("update-status failed: %o",Ke),me("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function Me(ue){switch(ue){case"blocked-col":return E;case"ready-col":return C;case"in-progress-col":return te;case"resolved-col":return ie;default:return[]}}function Ue(ue,he,Ke){if(!i||!s)return;let nt=Me(ue),Je=nt.find(A=>A.id===he);if(!Je)return;let ut=nt.filter(A=>A.id!==he),ft=Ke.closest?Ke.closest(".board-card"):null,ot=ut.length;if(ft){let A=ft.getAttribute("data-issue-id");if(A===he)return;let j=ut.findIndex(W=>W.id===A);j>=0&&(ot=j)}let Ne=ut.slice();Ne.splice(ot,0,Je),k.applyReorder(he,Ne,ot)}function Ze(){for(let ue of Array.from(e.querySelectorAll(".board-column--drag-over")))ue.classList.remove("board-column--drag-over")}let Pe=null;e.addEventListener("dragover",ue=>{ue.preventDefault(),ue.dataTransfer&&(ue.dataTransfer.dropEffect="move");let Ke=ue.target.closest(".board-column");Ke&&Ke!==Pe&&(Pe&&Pe.classList.remove("board-column--drag-over"),Ke.classList.add("board-column--drag-over"),Pe=Ke)}),e.addEventListener("dragleave",ue=>{let he=ue.relatedTarget;(!he||!e.contains(he))&&Pe&&(Pe.classList.remove("board-column--drag-over"),Pe=null)}),e.addEventListener("drop",ue=>{ue.preventDefault(),Pe&&(Pe.classList.remove("board-column--drag-over"),Pe=null);let he=ue.target,Ke=he.closest(".board-column");if(!Ke)return;let nt=ue.dataTransfer?.getData("text/plain")||"";if(!nt)return;let Je=Ke.id,ut=U.get(nt);if(ut&&ut===Je){if(rg.has(Je)){if(F!=="manual"){me("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}Ue(Je,nt,he)}return}let ft=ng[Je];if(!ft){me("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}H.get(nt)!==ft&&se(nt,ft)}),e.addEventListener("keydown",ue=>{let he=ue.target;if(!(he instanceof HTMLElement))return;let Ke=String(he.tagName||"").toLowerCase();if(Ke==="input"||Ke==="textarea"||Ke==="select"||Ke==="button"||Ke==="a"||he.isContentEditable===!0)return;let nt=he.closest(".board-card");if(!nt)return;let Je=String(ue.key||"");if(Je==="Enter"||Je===" "){ue.preventDefault();let Ne=nt.getAttribute("data-issue-id");Ne&&r(Ne);return}if(Je!=="ArrowUp"&&Je!=="ArrowDown"&&Je!=="ArrowLeft"&&Je!=="ArrowRight")return;ue.preventDefault();let ut=nt.closest(".board-column");if(!ut)return;let ft=Array.from(ut.querySelectorAll(".board-card")),ot=ft.indexOf(nt);if(Je==="ArrowDown"&&ot<ft.length-1){tt(nt,ft[ot+1]);return}if(Je==="ArrowUp"&&ot>0){tt(nt,ft[ot-1]);return}if(Je==="ArrowLeft"||Je==="ArrowRight"){let Ne=Array.from(e.querySelectorAll(".board-column")),A=Ne.indexOf(ut),j=Je==="ArrowRight"?1:-1,W=A+j;for(;W>=0&&W<Ne.length;){let $e=Ne[W].querySelector(".board-card");if($e){tt(nt,$e);return}W+=j}}});function tt(ue,he){try{ue.tabIndex=-1,he.tabIndex=0,he.focus()}catch{}}let $t=null;g&&g.subscribe&&($t=g.subscribe(()=>{try{Y()}catch{}}));let qt=null;l&&l.subscribe&&(qt=l.subscribe(()=>{try{Y()}catch{}}));let Dt=null;return a&&a.subscribe&&(Dt=a.subscribe(()=>{Ve()})),{async load(){n("load"),Y()},clear(){Se(),ze(),$t&&($t(),$t=null),qt&&(qt(),qt=null),Dt&&(Dt(),Dt=null),e.replaceChildren(),E=[],C=[],te=[],ie=[],z=[],P=[],H=new Map,U=new Map}}}function Bo(e,t){return e.filter(n=>{let r=Zs(n);return!(r&&t.has(r))})}async function sg(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}var mn=e=>e??zt;function Tn(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function Uo(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}async function yn(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}var ig=["workflow_mode","spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_dispatch","quick_fix_impl_runtime","quick_fix_impl_model","quick_fix_impl_effort","quick_fix_impl_speed","orchestration_model","orchestration_effort","orchestration_speed","quick_fix_orchestration_model","quick_fix_orchestration_effort","quick_fix_orchestration_speed"],Eu=["orchestration_model","orchestration_effort","orchestration_speed"],Tu=["quick_fix_orchestration_model","quick_fix_orchestration_effort","quick_fix_orchestration_speed"],ag=[...Eu,...Tu],xu={quick_fix_impl_dispatch:"impl_dispatch",quick_fix_impl_runtime:"impl_runtime",quick_fix_impl_model:"impl_model",quick_fix_impl_effort:"impl_effort",quick_fix_impl_speed:"impl_speed",quick_fix_orchestration_model:"orchestration_model",quick_fix_orchestration_effort:"orchestration_effort",quick_fix_orchestration_speed:"orchestration_speed"},Au={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},Su={spec_review_speed:"spec_review_model",plan_review_speed:"plan_review_model",impl_review_speed:"impl_review_model"},lg=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function rn(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Ct(e){return typeof e=="string"&&e.length>0?e:null}function lo(e){return e.startsWith("gpt-")?e.slice(4):e}function yt(e,t,n,r,o){return{value:e,source:t,display:n,full_value:r,resolution:o}}function Cu(e,t,n){let r=Ct(t[e]);if(r!==null)return{value:r,source:"pin"};let o=Ct(n[e]);return o===null?null:{value:o,source:"global"}}function mr(e,t,n,r){return Cu(e,t,n)||{value:r,source:"base"}}function za(e,t,n,r){let o=n?.implementation?.model_catalog;if(t&&rn(o?.[t])){let s=Ct(o[t][e]);if(s!==null)return s}if(t&&Array.isArray(o?.[t])&&o[t].includes(e))return e;if(!t&&rn(o)){for(let s of Object.values(o))if(rn(s)){let l=Ct(s[e]);if(l!==null)return l}else if(Array.isArray(s)&&s.includes(e))return e}let i=r?.model_index?.[e];return Ct(r?.runners?.[i]?.models?.[e]?.id)||e}function cg(e,t){return Ct(t?.review?.reviewers?.[e]?.model)||e}function Dn(e,t,n=!1){if(e==="default")return yt(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let r=n?lo(e):e;return yt(e,t,r,e,"explicit")}function Ru(e,t,n){let r=t?.implementation?.model_catalog?.[e],o=[];rn(r)?o.push(...Object.keys(r)):Array.isArray(r)&&o.push(...r.filter(s=>typeof s=="string"));let i=n?.runners?.[e]?.models;if(rn(i))for(let s of Object.keys(i))o.includes(s)||o.push(s);return o}function ug(e,t){let n=[],r=e?.implementation?.model_catalog;rn(r)&&n.push(...Object.keys(r));let o=t?.runners;if(rn(o))for(let i of Object.keys(o))n.includes(i)||n.push(i);return n}function dg(e,t,n){if(e===null)return{runtime:null,offered:!1};let r=!1;for(let o of ug(t,n)){let i=Ru(o,t,n);if(i.length>0&&(r=!0),i.includes(e))return{runtime:o,offered:!0}}return{runtime:null,offered:r}}function ai(e){return yt(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function Ha(e,t,n){let r=Cu(e,t,n);return r?Dn(r.value,r.source):yt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function Cn(e){let t=rn(e.pin)?e.pin:{},n=rn(e.global)?e.global:{},r=rn(e.execution_defaults)?e.execution_defaults:null,o=r?.supported===!0&&rn(r.session)?r.session:null,i=r?.supported===!0&&rn(r.orchestration)?r.orchestration:null,s=rn(e.runner_catalog)?e.runner_catalog:null,l=Ct(n.quick_fix_impl_model),a=dg(l,o,s),u={};if(o){let d=mr("workflow_mode",t,n,Ct(o.workflow_mode_default));u.workflow_mode=d.source==="base"?yt(d.value,"base",d.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",d.value,"default"):Dn(d.value,d.source);for(let z of["spec_review","plan_review","impl_review"]){let P=`${z}_model`,I=Ct(z==="plan_review"?d.value==="fast_track"?o.plan_review?.fast_track_default:o.plan_review?.standard_recommended:o.review?.default),q=mr(P,t,n,I);if(q.value===null)u[P]=yt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(q.value!=="self"&&q.value!=="skip"&&!rn(o.review?.reviewers?.[q.value]))u[P]=ai(yt(q.value,q.source,"",null,"explicit"));else{let F=cg(q.value,o);u[P]=yt(q.value,q.source,lo(F),F,q.source==="base"?"default":"explicit")}}for(let[z,P]of Object.entries(Au)){let I=u[P].value;if(I==="self"||I==="skip"){u[z]=yt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let q=Ct(o.review?.reviewers?.[I||""]?.effort),F=mr(z,t,n,q);u[z]=F.value===null?yt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):yt(F.value,F.source,F.value,F.value,F.source==="base"?"default":"explicit")}for(let[z,P]of Object.entries(Su)){let I=u[P];if(I.resolution==="incompatible"||I.value==="self"||I.value==="skip"){u[z]=yt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}if(I.resolution==="unavailable"){u[z]=yt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}let q=mr(z,t,n,"default");u[z]=q.source==="base"?yt("default","base","default (\uC77C\uBC18)","default","default"):Dn(q.value,q.source)}let f=rn(o.implementation?.default)?o.implementation.default:{},h=Ct(e.route),g=h!==null&&["quick_fix","spec_backed","full_plan"].includes(h),k=rn(o.implementation?.route_defaults)?o.implementation.route_defaults:{},E=g&&rn(k[h])?k[h]:{},C={},te=!1;if(h==="quick_fix"){let z=Ct(t.impl_runtime),P=Ct(n.quick_fix_impl_runtime),I=z||P,q=I==="inherit"?Ct(e.controller_runtime):I;te=l!==null&&a.runtime!==null&&(I===null||q===a.runtime);let F=Ct(t.impl_dispatch),H=Ct(n.quick_fix_impl_dispatch);if(F!==null)u.impl_dispatch=Dn(F,"pin"),C.impl_dispatch="pin";else if(H!==null)u.impl_dispatch=Dn(H,"global"),C.impl_dispatch="quick_fix";else if(te)u.impl_dispatch=yt("delegated","global","\uC704\uC784 (\uBAA8\uB378 \uD568\uC758)","delegated","explicit"),C.impl_dispatch="implied";else{let U=Ct(E.dispatch)||Ct(f.dispatch);u.impl_dispatch=U?yt(U,"base",U,U,"default"):yt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"),C.impl_dispatch="base"}if(z!==null)u.impl_runtime=Dn(z,"pin"),C.impl_runtime="pin";else if(P!==null)u.impl_runtime=Dn(P,"global"),C.impl_runtime="quick_fix";else if(te){let U=a.runtime;u.impl_runtime=yt(U,"global",`${U} (\uC720\uB3C4)`,U,"explicit"),C.impl_runtime="derived"}else{let U=mr("impl_runtime",{},n,Ct(f.runtime));u.impl_runtime=U.value===null?yt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):yt(U.value,U.source,U.value,U.value,U.source==="base"?"default":"explicit"),C.impl_runtime=U.source}for(let U of["impl_model","impl_effort","impl_speed"]){let M=Ct(t[U]),Q=Ct(n[`quick_fix_${U}`]),B;M!==null?(B={value:M,source:"pin"},C[U]="pin"):U==="impl_model"&&te&&l!==null?(B={value:l,source:"global"},C[U]="quick_fix"):U!=="impl_model"&&Q!==null?(B={value:Q,source:"global"},C[U]="quick_fix"):(B=mr(U,{},n,Ct(f[U.replace("impl_","")])),C[U]=B.source),u[U]=B.value===null?yt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):yt(B.value,B.source,B.value,B.value,B.source==="base"?"default":"explicit")}}else for(let z of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let P=mr(z,t,n,z==="impl_dispatch"?Ct(E.dispatch)||Ct(f.dispatch):Ct(f[z.replace("impl_","")]));u[z]=P.value===null?yt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):yt(P.value,P.source,P.value,P.value,P.source==="base"?"default":"explicit")}let ie=u.impl_dispatch.value==="main";if(ie?u.impl_dispatch.display=C.impl_dispatch==="quick_fix"?"\uBA54\uC778 (quick_fix)":"\uBA54\uC778":u.impl_dispatch.value==="delegated"&&(C.impl_dispatch==="quick_fix"?u.impl_dispatch.display="\uC704\uC784 (quick_fix)":C.impl_dispatch!=="implied"&&(u.impl_dispatch.display="\uC704\uC784")),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_model.value!==null){let z=u.impl_runtime.value==="inherit"?Ct(e.controller_runtime):u.impl_runtime.value,P=z?Ru(z,o,s):[];h==="quick_fix"&&C.impl_model==="base"&&C.impl_runtime!=="base"&&P.length>0&&!P.includes(u.impl_model.value)&&(u.impl_model=yt("auto","base","auto","auto","default"));let I=u.impl_model.value;if(I!=="auto"&&P.length>0&&!P.includes(I))u.impl_model=ai(u.impl_model);else{let q=za(I,z,o,s);u.impl_model.display=lo(q),u.impl_model.full_value=q,C.impl_model==="quick_fix"&&(u.impl_model.display=`${u.impl_model.display} (quick_fix)`)}}if(u.impl_effort.value==="auto"){let z=Ct(e.transport)||(u.impl_runtime.value==="codex"?"codex-native-spawn":u.impl_runtime.value==="claude"?"implement-claude":null),P=z?Ct(o.implementation?.effort_by_transport?.[z]?.auto):null;P&&!lg.has(P)?(u.impl_effort.display=`${P} (\uBE44\uD638\uD658)`,u.impl_effort.full_value=P,u.impl_effort.resolution="incompatible"):(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}C.impl_effort==="quick_fix"&&u.impl_effort.value!==null&&(u.impl_effort=yt(u.impl_effort.value,"global",`${u.impl_effort.value} (quick_fix)`,u.impl_effort.value,"explicit")),u.impl_speed.value==="default"&&(u.impl_speed=C.impl_speed==="quick_fix"?yt("default","global","default (quick_fix)","default","explicit"):u.impl_speed.source==="base"?yt("default","base","default (\uC77C\uBC18)","default","default"):Dn("default",u.impl_speed.source));for(let z of["impl_runtime","impl_effort","impl_speed"])C[z]==="quick_fix"&&u[z].value!==null&&!u[z].display.endsWith("(quick_fix)")&&(u[z].display=`${u[z].display} (quick_fix)`);if(h==="quick_fix"){l!==null&&!te&&a.offered&&(u.quick_fix_impl_model=ai(yt(l,"global","",l,"explicit")));for(let[z,P]of Object.entries(xu))!z.startsWith("quick_fix_orchestration_")&&!Object.hasOwn(u,z)&&(u[z]={...u[P]});u.impl_dispatch.source==="base"&&u.impl_dispatch.value==="main"&&(u.quick_fix_impl_dispatch=yt("main","base","\uBA54\uC778 (\uD558\uB124\uC2A4)","main","default"))}if(ie)for(let z of["impl_runtime","impl_model","impl_effort","impl_speed"])u[z]=yt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else for(let d of ig.filter(f=>!ag.includes(f)))u[d]=Ha(d,t,n);if(!o){for(let[d,f]of Object.entries(Au))(u[f].value==="self"||u[f].value==="skip")&&(u[d]=yt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));for(let[d,f]of Object.entries(Su))(u[f].value==="self"||u[f].value==="skip")&&(u[d]=yt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let d of["impl_runtime","impl_model","impl_effort","impl_speed"])u[d]=yt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else u.impl_dispatch.value==="delegated"&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_effort.value==="auto"&&(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}for(let d of Eu){if(!i){u[d]=Ha(d,t,n);continue}let f=d.replace("orchestration_",""),h=Ct(i[f]),g=`quick_fix_${d}`,k=e.route==="quick_fix"?Ct(n[g]):null,E=Ct(t[d]),C=E!==null?{value:E,source:"pin"}:k!==null?{value:k,source:"global"}:mr(d,{},n,h),te=E===null&&k!==null;if(d==="orchestration_effort"&&C.source==="base"){u[d]=yt(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(C.value===null){u[d]=yt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(d==="orchestration_model"){let ie=C.source==="base"?Ct(i.model_id)||C.value:za(C.value,null,o,s);u[d]=yt(C.value,C.source,`${lo(ie)}${te?" (quick_fix)":""}`,ie,C.source==="base"?"default":"explicit");continue}if(C.value==="default"){u[d]=te?yt("default","global","default (quick_fix)","default","explicit"):C.source==="base"?yt("default","base","default (\uC77C\uBC18)","default","default"):Dn("default",C.source);continue}u[d]=te?yt(C.value,"global",`${C.value} (quick_fix)`,C.value,"explicit"):Dn(C.value,C.source)}for(let d of Tu){let f=xu[d];u[d]=u[f]?{...u[f]}:Ha(d,t,n)}if(o&&e.route!=="quick_fix")if(l===null){let d=u.orchestration_model.full_value;u.quick_fix_impl_model=yt(null,"base",d===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${lo(d)})`,null,"default")}else if(a.runtime!==null){let d=za(l,a.runtime,o,s);u.quick_fix_impl_model=yt(l,"global",lo(d),d,"explicit")}else a.offered?u.quick_fix_impl_model=ai(yt(l,"global","",null,"explicit")):u.quick_fix_impl_model=Dn(l,"global");return u}function pg(e,t){let n=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let r=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${n} (${r})`}function li(e){let t=rn(e.pin)?e.pin:{},n=rn(e.global)?e.global:{},r=rn(e.resolution_global)?{...e.resolution_global}:{};delete r[e.key];let o=f=>{let h={...r,...f};return Cn({pin:e.layer==="pin"?h:t,global:e.layer==="pin"?n:h,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},i=e.layer==="pin"?t:n,s={...i};delete s[e.key];let l=o(s)[e.key],a=o(i)[e.key],u=Ct(i[e.key]),d=[...e.choices];return u!==null&&!d.includes(u)&&d.unshift(u),{unset_label:pg(l,e.layer==="pin"),full_value:l.full_value,unavailable:l.resolution==="unavailable",disabled:a?.resolution==="not_applicable",options:d.map(f=>{let h=o({...i,[e.key]:f})[e.key];return{value:f,label:h.display,full_value:h.full_value}})}}function fg(e,t=document){let n=t.createElement("dialog");n.className="op-dialog continuation-dialog";let r=t.createElement("button"),o=t.createElement("button"),i=t.createElement("button"),s=t.createElement("h2"),l=t.createElement("p"),a=t.createElement("div");return a.className="op-dialog__actions",s.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",l.textContent=`${Tn(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${Tn(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,r.type="button",r.className="op-btn",r.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",r.disabled=e.prior_available===!1,o.type="button",o.className="op-btn",o.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",i.type="button",i.className="op-btn",i.textContent="\uCDE8\uC18C",a.append(r,o,i),n.append(s,l,a),t.body.append(n),new Promise(u=>{let d=f=>{typeof n.close=="function"&&n.close(),n.remove(),u(f)};r.addEventListener("click",()=>d("prior_session")),o.addEventListener("click",()=>d("fresh_current")),i.addEventListener("click",()=>d(null)),n.addEventListener("cancel",f=>{f.preventDefault(),d(null)}),typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")})}async function gr(e,t,n={}){let r=e;for(n.onResult?.(r);r?.continuation_mismatch;){let o=r.continuation_mismatch,i=await fg(o);if(i===null)return r;r=await t(i,o.decision_token),n.onResult?.(r),r?.conflict&&n.refresh&&(r=await n.refresh(r),n.onResult?.(r))}return r}function Ou(e,t=document){let n=e?.kind==="settlement",r=t.createElement("dialog");r.className="op-dialog resume-instructions-dialog";let o=t.createElement("h2"),i=t.createElement("textarea"),s=t.createElement("div"),l=t.createElement("button"),a=t.createElement("button"),u=[e?.bead_id,e?.tuple].filter(d=>typeof d=="string"&&d!=="").join(" \xB7 ");if(o.textContent=n?"\uCC29\uC9C0 \uC815\uC0B0 \uC7AC\uAC1C":"\uC138\uC158 \uC774\uC5B4\uD558\uAE30",i.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",i.maxLength=4e3,s.className="op-dialog__actions resume-instructions-dialog__actions",l.type="button",l.className="op-btn op-btn--primary",l.textContent=n?"\uC815\uC0B0 \uC7AC\uAC1C":"\uC774\uC5B4\uD558\uAE30",a.type="button",a.className="op-btn",a.textContent="\uCDE8\uC18C",s.append(l,a),r.append(o),u!==""){let d=t.createElement("p");d.className="resume-instructions-dialog__target",d.textContent=u,r.append(d)}return r.append(i,s),t.body.append(r),new Promise(d=>{let f=!1,h=k=>{f||(f=!0,typeof r.close=="function"&&r.close(),r.remove(),d(k))},g=()=>h(i.value.trim());l.addEventListener("click",g),a.addEventListener("click",()=>h(null)),i.addEventListener("keydown",k=>{k.key==="Enter"&&(k.ctrlKey||k.metaKey)&&(k.preventDefault(),g())}),r.addEventListener("cancel",k=>{k.preventDefault(),h(null)}),typeof r.showModal=="function"?r.showModal():r.setAttribute("open",""),i.focus()})}async function co(e){let{context:t,transport:n,adopt:r}=e,o=await Ou(t);if(o===null)return null;let i=o===""?{}:{instructions:o},s=await n({...i});if(r?.(s),s&&s.conflict&&(s=await n({...i}),r?.(s)),s=await gr(s,(l,a)=>n({...i,continuation:l,decision_token:a}),{onResult:r,refresh:()=>n({...i})}),s&&s.resumed===!1&&!s.conflict&&s.reason){let l=t?.kind==="settlement"?"\uC815\uC0B0 \uC7AC\uAC1C":"\uC774\uC5B4\uD558\uAE30";me(`${l} \uAC70\uBD80: ${s.reason}`,"error",2400)}return s}function Ka(e){return`session:${e.provider}:${e.session_id}`}function Wo(e){return`${e.provider} \xB7 ${e.session_id.slice(0,8)}`}function _g(e,t){return e.current&&t==="in_progress"&&e.locality==="local"?"running":"done"}function uo(e,t,n,r){return{attempt_id:Ka(e),session_ref:{bead_id:t,provider:e.provider,session_id:e.session_id},...typeof r=="string"&&r.length>0?{root_dir:r}:{},hide_prompt:!0,meta:{runner:e.provider,label:Wo(e),session_id:e.session_id,...typeof e.resume_command=="string"&&e.resume_command.length>0?{resume_command:e.resume_command}:{},status:_g(e,n)}}}var Ga="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",mg="\uBD84\uD574 \uC5C6\uC74C \u2014 \uCD1D\uB7C9\uB9CC \uBCF4\uACE0\uB428",Iu="\uBD84\uD574 \uC5C6\uB294 leg";function Zt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Kn=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],po=[...Kn,"reasoning_output_tokens"],gg={codex:["implementation","review-consult"],claude:["subagent"]};function Ya(e){return!e||typeof e!="object"?!1:Number.isFinite(e.total_tokens)&&!Kn.some(t=>Number.isFinite(e[t]))}function hg(e){return!e||typeof e!="object"?!1:po.some(t=>Number.isFinite(e[t]))}function Va(e){let t=0;for(let n of Kn)t+=Zt(e?.[n]);return t}function bg(e){return!e||typeof e!="object"?!1:Kn.some(t=>Number.isFinite(e[t]))}function Lu(e){return!e||typeof e!="object"?!1:po.some(t=>Number.isFinite(e[t]))||Number.isFinite(e.total_tokens)}function yg(e){let t={};for(let n of po)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function Du(e){let t={};for(let n of po)Number.isFinite(e[n])&&(t[n]=e[n]);return Number.isFinite(e.total_tokens)&&(t.total_tokens=e.total_tokens),e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function Pu(e,t){return Ya(t)?Zt(t.total_tokens):e==="codex"?Zt(t.input_tokens)+Zt(t.output_tokens):Va(t)}function vg(e){return e==="claude"?"Claude":"Codex"}function kg(e){return`\u03C4 ${qu(e)}`}function wg(e,t){let n=t.breakdown||{},r=Zt(t.total_only_subtotal);if(Ya(n)||r>0&&!hg(n)){let u=[`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,mg];return t.replayed&&u.push(Ga),u.join(`
`)}let o=[`\uC785\uB825 ${Zt(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Zt(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?o.push(`\uCE90\uC2DC\uC77D\uAE30 ${Zt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Zt(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(o.push(`\uCE90\uC2DC\uC77D\uAE30 ${Zt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${Zt(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&o.push(`\uCD94\uB860\uCD9C\uB825 ${Zt(n.reasoning_output_tokens).toLocaleString("en-US")}`)),r>0&&o.push(`${Iu} ${r.toLocaleString("en-US")}`);let i=e==="claude"?"\uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"\uC785\uB825 + \uCD9C\uB825",s=r>0?`${i} + ${Iu}`:i,a=[e==="claude"?`Claude subtotal = ${s}`:`Codex subtotal = ${s}; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset`,`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,o.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&a.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&a.push(Ga),a.join(`
`)}function pn(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];r&&t.push({provider:n,label:`${vg(n)} ${kg(r.subtotal)}${typeof r.total_cost_usd=="number"&&Number.isFinite(r.total_cost_usd)?` \xB7 $${r.total_cost_usd.toFixed(2)}`:""}`,tooltip:wg(n,r)})}return t}function ui(e){let t={},n={claude:!0,codex:!1},r={claude:0,codex:0};for(let o of e)if(!(!o||!o.providers))for(let i of["claude","codex"]){let s=o.providers[i];if(!s)continue;let l=t[i];l||(l={subtotal:0,breakdown:{}},t[i]=l),l.subtotal+=s.subtotal,Number.isFinite(s.total_only_subtotal)&&(l.total_only_subtotal=Zt(l.total_only_subtotal)+Zt(s.total_only_subtotal));for(let a of po)Number.isFinite(s.breakdown[a])&&(l.breakdown[a]=Zt(l.breakdown[a])+Zt(s.breakdown[a]));s.replayed&&(l.replayed=!0),i==="claude"&&(typeof s.total_cost_usd=="number"&&Number.isFinite(s.total_cost_usd)?r.claude+=s.total_cost_usd:n.claude=!1)}return t.claude&&n.claude&&(t.claude.total_cost_usd=r.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function Qa(e){return!e||typeof e!="object"?null:rr({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function $g(e){return e==="codex"?"codex":"claude"}function Hn(){return{subtotal:0,breakdown:yg(null),total_only:0,legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function ci(e,t,n){e.subtotal+=t.subtotal,Ya(t.usage)&&(e.total_only+=t.subtotal);for(let r of po)Number.isFinite(t.usage[r])&&(e.breakdown[r]=Zt(e.breakdown[r])+Zt(t.usage[r]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),n&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function Mu(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return e.total_only>0&&(n.total_only_subtotal=e.total_only),t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function qu(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function fo(e){return bg(e)?`\u03C4 ${qu(Va(e))}`:null}function nr(e){let t=fo(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function zo(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${Zt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Zt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Zt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Zt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${Va(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(Ga),n.join(`
`)}function rr(e,t){let n={claude:Hn(),codex:Hn()},r={orchestrator:{claude:Hn(),codex:Hn()},implementation:{claude:Hn(),codex:Hn()},"review-consult":{claude:Hn(),codex:Hn()},subagent:{claude:Hn(),codex:Hn()}},o=new Set;for(let l of Object.values(e||{})){if(!l||l.bead_id!==t)continue;let a=l.usage;if(Lu(a)){let d=$g(l.runner),f=Du(a),h={provider:d,role:"orchestrator",attempt_id:String(l.attempt_id||""),usage:f,subtotal:Pu(d,f)};f.replayed===!0&&(h.replayed=!0),typeof l.model=="string"&&(h.model=l.model),typeof l.session_id=="string"&&(h.session_id=l.session_id),ci(n[d],h,!0),ci(r.orchestrator[d],h,!0)}let u=Array.isArray(l.usage_legs)?l.usage_legs:[];for(let d of u){let f=d&&d.provider==="claude"?"claude":"codex";if(!d||d.provider!=="codex"&&d.provider!=="claude"||!gg[f].includes(d.role)||!Lu(d.usage))continue;let h=typeof d.receipt_id=="string"&&d.receipt_id.length>0?d.receipt_id:null;if(!h||o.has(h))continue;o.add(h);let g=Du(d.usage),k={provider:f,role:d.role,attempt_id:String(l.attempt_id||""),usage:g,subtotal:Pu(f,g)};k.receipt_id=h,typeof d.agent_type=="string"&&(k.agent_type=d.agent_type),typeof d.agent_id=="string"&&(k.agent_id=d.agent_id),typeof d.model=="string"&&(k.model=d.model),typeof d.effort=="string"&&d.effort.trim().length>0&&(k.effort=d.effort),typeof d.session_id=="string"?k.session_id=d.session_id:typeof d.thread_id=="string"&&(k.session_id=d.thread_id),typeof d.turn_id=="string"&&(k.turn_id=d.turn_id),(typeof d.completed_at=="string"||typeof d.completed_at=="number"&&Number.isFinite(d.completed_at))&&(k.completed_at=d.completed_at),g.replayed===!0&&(k.replayed=!0),ci(n[f],k,!1),ci(r[k.role][f],k,!1)}}let i={};for(let l of["claude","codex"]){let a=n[l];if(a.legs.length===0)continue;let u=Mu(a,!1);l==="claude"&&a.outer_count>0&&a.outer_cost_count===a.outer_count&&(u.total_cost_usd=a.outer_cost),i[l]=u}if(Object.keys(i).length===0)return null;let s={};for(let l of["orchestrator","implementation","review-consult","subagent"]){let a={};for(let u of["claude","codex"]){let d=r[l][u];d.legs.length>0&&(a[u]={...Mu(d,!0),legs:d.legs})}Object.keys(a).length>0&&(s[l]=a)}return{providers:i,roles:s}}var xg=".chip-popover, .judgement-chip";function _o(e){let t=null,n=!1;function r(d){return t!==null&&t.bead_id===d.bead_id&&t.chip_key===d.chip_key}function o(d){t=r(d)?null:{...d},e()}function i(){t!==null&&(t=null,e())}function s(d){let f=d.target;t!==null&&(f&&typeof f.closest=="function"&&f.closest(xg)||i())}function l(d){d.key==="Escape"&&i()}function a(){n||(n=!0,document.addEventListener("click",s),document.addEventListener("keydown",l))}function u(){n&&(n=!1,document.removeEventListener("click",s),document.removeEventListener("keydown",l))}return{toggle:o,close:i,isOpen:r,attach:a,detach:u}}function mo(e){return c`<div
    class="chip-popover"
    role="dialog"
    aria-label=${e.title}
  >
    <div class="chip-popover__title">${e.title}</div>
    <ul class="chip-popover__lines">
      ${e.lines.map(t=>c`<li>${t}</li>`)}
    </ul>
  </div>`}var Nu={running:3,paused:2,failed:1};function or(e){if(!e||typeof e!="object")return!1;let t=e.kind;return t==null||t==="implementation"}function ju(e){let t=Object.values(e||{}),n=new Map;for(let r of t){if(!r||typeof r.bead_id!="string"||r.bead_id.length===0||r.kind!=="review_session"||r.status!=="running")continue;let o=typeof r.started_at=="number"?r.started_at:null,i=n.get(r.bead_id);i&&(i.started_at??0)>(o??0)||n.set(r.bead_id,{attempt:r,origin:r.origin==="click"||r.origin==="auto"?r.origin:null,started_at:o})}return n}function Fu(e,t){let n=Object.values(e||{}),r=new Set,o=new Map;for(let s of n)!s||typeof s.bead_id!="string"||(typeof s.resumed_from=="string"&&s.resumed_from.length>0&&r.add(s.resumed_from),or(s)&&o.set(s.bead_id,s.attempt_id));let i=new Map;for(let s of n){if(!s||typeof s.bead_id!="string"||s.bead_id.length===0||!or(s))continue;let l=null;if(s.status==="running")l="running";else if(s.status==="paused"&&!r.has(s.attempt_id))l="paused";else if(s.status==="failed"||s.status==="orphaned"){let d=t.get(s.bead_id),f=typeof d=="number"&&d>0&&typeof s.finished_at=="number"&&d>=s.finished_at;o.get(s.bead_id)===s.attempt_id&&!f&&typeof s.dismissed_at!="number"&&(l="failed")}if(!l)continue;let a=typeof s.started_at=="number"?s.started_at:null,u=i.get(s.bead_id);if(u){let d=Nu[u.run_state],f=Nu[l];if(d>f||d===f&&(u.started_at??0)>(a??0))continue}i.set(s.bead_id,{attempt:s,run_state:l,started_at:a})}return{winners:i,resumed_from_ids:r}}var di=["workflow_mode","spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],Ag=["quick_fix_impl_dispatch","quick_fix_impl_runtime","quick_fix_impl_model","quick_fix_impl_effort","quick_fix_impl_speed"],Ho=[...di.filter(e=>e!=="impl_dispatch"),...Ag,"base_sync_accept_local_commits","bdui_url"],Bu=["base_sync_accept_local_commits"],Ko="true";function pi(e){let t={};if(!gn(e))return t;for(let[n,r]of Object.entries(e)){if(Bu.includes(n)){r===!0&&(t[n]=Ko);continue}typeof r=="string"&&(t[n]=r)}return t}function Uu(e){let t;try{t=new URL(e)}catch{return!1}return(t.protocol==="http:"||t.protocol==="https:")&&e===t.origin}var Pn=["orchestration_model","orchestration_effort","orchestration_speed"],go=["quick_fix_orchestration_model","quick_fix_orchestration_effort","quick_fix_orchestration_speed"],Xa=Object.freeze({orchestration_model:"quick_fix_orchestration_model",orchestration_effort:"quick_fix_orchestration_effort",orchestration_speed:"quick_fix_orchestration_speed",impl_dispatch:"quick_fix_impl_dispatch",impl_runtime:"quick_fix_impl_runtime",impl_model:"quick_fix_impl_model",impl_effort:"quick_fix_impl_effort",impl_speed:"quick_fix_impl_speed"}),ho=[...di,...Pn],Sg=Ho.filter(e=>ho.includes(e));function Eg(e,t){let n={},r=[];for(let[i,s]of Object.entries(Xa)){let l=e[i];if(!Object.hasOwn(e,i)){n[s]=null;continue}let a=t[s];if(typeof l!="string"||!Array.isArray(a)||!a.includes(l)){n[s]=null,r.push(`lane_incompatible:${s}`);continue}n[s]=l}let o=Object.keys(e).filter(i=>!Object.hasOwn(Xa,i));return{values:n,warnings:r,skipped_keys:o}}var Go=["delegated","main"],fi=["inherit","claude","codex"],Gn=["default","fast"],Yo=["standard","fast_track"],Vo=["codex","opus","fable","self","skip"],_i=["codex","fable","skip"],mi=["low","medium","high","xhigh"],Wu=["default","fast"],Sn="auto";function gn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function zu(e){if(!gn(e)||!gn(e.runners))return[];let t=[];for(let[n,r]of Object.entries(e.runners))gn(r)&&gn(r.models)&&t.push([n,Object.keys(r.models)]);return t}function bo(e,t){let n=zu(e),r=t&&t!=="inherit"?n.filter(([o])=>o===t):n;return[Sn,...r.flatMap(([,o])=>o)]}function Hu(e,t,n,r){if(!gn(e)||!gn(e.runners))return[Sn];let o=[];for(let[i,s]of Object.entries(e.runners))if(!(!gn(s)||!gn(s.models))&&!(t&&t!=="inherit"&&i!==t))for(let[l,a]of Object.entries(s.models)){if(n&&n!==Sn&&l!==n)continue;let u=r(s,a);if(Array.isArray(u))for(let d of u)typeof d=="string"&&!o.includes(d)&&o.push(d)}return[Sn,...o]}function Nr(e,t,n){return Hu(e,t,n,(r,o)=>gn(o)&&Array.isArray(o.efforts)?o.efforts:r.efforts)}function gi(e,t,n){return Hu(e,t,n,(r,o)=>gn(o)&&Array.isArray(o.orchestration_efforts)?o.orchestration_efforts:gn(o)&&Array.isArray(o.efforts)?o.efforts:r.efforts)}function yo(e,t){let n=zu(e);return(t?n.filter(([o])=>o===t):n).flatMap(([,o])=>o)}function Ku(e,t,n){let r={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},o=r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:r.impl_runtime==="inherit"?n:null;return o&&(r.impl_model&&!bo(t,o).includes(r.impl_model)&&(r.impl_model=void 0),r.impl_effort&&!Nr(t,o,r.impl_model||Sn).includes(r.impl_effort)&&(r.impl_effort=void 0)),r}var Tg={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",spec_review_speed:"\uC2A4\uD399 \uB9AC\uBDF0 \uC18D\uB3C4",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",plan_review_speed:"\uACC4\uD68D \uB9AC\uBDF0 \uC18D\uB3C4",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_review_speed:"\uAD6C\uD604 \uB9AC\uBDF0 \uC18D\uB3C4",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},Cg={quick_fix_orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",quick_fix_orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",quick_fix_orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4",quick_fix_impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",quick_fix_impl_runtime:"\uC704\uC784 \uB300\uC0C1",quick_fix_impl_model:"\uBAA8\uB378",quick_fix_impl_effort:"effort",quick_fix_impl_speed:"\uC18D\uB3C4"},Za=[...Sg,...Pn],Rg=[...ho,...Ho].filter((e,t,n)=>n.indexOf(e)===t&&!Za.includes(e));function Gu(e,t){let n=gn(e)?e:{},r=gn(t)?t:{},o=[];for(let s of Za){let l=n[s]??null,a=r[s]??null;l!==a&&o.push({key:s,label:Tg[s]||s,before:l,after:a,kind:l===null?"added":a===null?"removed":"changed"})}let i=[];for(let s of[...Rg,...Object.keys(r)])!Za.includes(s)&&!i.includes(s)&&Object.hasOwn(r,s)&&i.push(s);return{rows:o,ignored_keys:i}}function Yu(e,t,n){let r=gn(e)?e:{},o=Eg(gn(t)?t:{},n),i=[];for(let s of Object.values(Xa)){let l=r[s]??null,a=o.values[s]??null;l!==a&&i.push({key:s,label:Cg[s]||s,before:l,after:a,kind:l===null?"added":a===null?"removed":"changed"})}return{rows:i,ignored_keys:o.skipped_keys}}function Ja(e,t,n,r,o,i,s=null){return li({key:e,choices:t,layer:"global",global:n,resolution_global:i,execution_defaults:r,runner_catalog:o,route:s})}function Vu(e,t){let n={};for(let r of Ho){let o=e?.[r],i=t?.[r];if(o!==i){if(Bu.includes(r)){n[r]=i===Ko?!0:null;continue}n[r]=typeof i=="string"&&i.length>0?i:null}}return n}function Qu(e,t){let n={};for(let r of[...Pn,...go]){let o=e?.[r]??null,i=t?.[r]??null;o!==i&&(n[r]=typeof i=="string"&&i.length>0?i:null)}return n}var el=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Pn]}],hr={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",spec_review_speed:"\uC0AC\uC591 \uB9AC\uBDF0 \uC18D\uB3C4",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",plan_review_speed:"\uACC4\uD68D \uB9AC\uBDF0 \uC18D\uB3C4",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_review_speed:"\uAD6C\uD604 \uB9AC\uBDF0 \uC18D\uB3C4",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},hi={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function tl(e,t,n,r,o,i=null){let s=Cn({pin:t,global:n,execution_defaults:r,runner_catalog:o,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:i});return e.map(l=>({key:l,...s[l]}))}function Xu(e,t,n,r,o,i=null){let s={pin:0,global:0,base:0};for(let l of tl(e,t,n,r,o,i))s[l.source]+=1;return s}function Zu(e,t,n){return{id:e,key:t,value:typeof n=="string"?n:""}}function Ju(e,t,n){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:n}}var Ax=[...di,...Pn];var ed=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed","impl_runtime","impl_model","impl_effort"];function Qo(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function bi(e){if(!Qo(e)||!Qo(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>Qo(n)&&Qo(n.models));return t.length>0?t:null}function Mn(e,t){let n=bi(e);if(!n||!t)return null;for(let[r,o]of n)if(Object.hasOwn(o.models,t))return r;return null}function td(e,t){return Qo(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function nd(e,t){let n=bi(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return td(r,r.models[t]);return[]}function Og(e){let t=bi(e);if(!t)return[];let n=[];for(let[,r]of t)for(let o of Object.values(r.models))for(let i of td(r,o))n.includes(i)||n.push(i);return n}function Ig(e,t){if(!t)return Og(e);let r=bi(e)?.find(([i])=>i===t)?.[1];if(!r)return[];let o=[];for(let i of Object.keys(r.models))for(let s of nd(e,i))o.includes(s)||o.push(s);return o}function rd(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},o=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!o)return r.impl_model="",r.impl_effort="",r;let i=Mn(t,r.impl_model);if(r.impl_model&&(!o||i!==o))return r.impl_model="",r.impl_effort="",r;let s=r.impl_model?nd(t,r.impl_model):Ig(t,o);return r.impl_effort&&s.length>0&&!s.includes(r.impl_effort)&&(r.impl_effort=""),r}var nl=new Set(["unavailable","not_applicable"]);function br(e,t){if(typeof e!="object"||e===null)return null;let n=e[t];return typeof n=="object"&&n!==null?n:null}function od(e){return e.filter(t=>t!==null).join(" \xB7 ")}function yr(e,t){return t===null?null:`${hr[e]}: ${t.display} (${hi[t.source]})`}function rl(e){return e.filter(t=>t!==null).join(`
`)}function yi(e){if(typeof e!="object"||e===null)return null;let t=Tn(e);if(t==="")return null;let n=(r,o)=>typeof o=="string"&&o.length>0?`${r}: ${o}`:null;return{text:t,title:rl(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",n("runner",e.runner),n(hr.orchestration_model,e.model),n(hr.orchestration_effort,e.effort),n(hr.orchestration_speed,e.speed)])}}function vo(e,t){let n=br(e,"orchestration_model");if(n===null||n.resolution==="unavailable")return null;let r=br(e,"orchestration_effort"),o=br(e,"orchestration_speed"),i=od([Mn(t,n.value??""),n.display,r!==null&&r.value!==null?r.display:null,o!==null&&o.value==="fast"?"Fast":null]);return i===""?null:{text:i,title:rl(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",yr("orchestration_model",n),yr("orchestration_effort",r),yr("orchestration_speed",o)])}}function Lg(e,t){return e===null||e.value===null||nl.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function Dg(e){return e===null||nl.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function Pg(e){return e===null?null:e.value==="auto"?"auto":nl.has(e.resolution)?null:e.display}function jr(e,t){if(typeof e!="object"||e===null)return null;let n=br(e,"impl_dispatch"),r=br(e,"impl_runtime"),o=br(e,"impl_model"),i=br(e,"impl_effort"),s=br(e,"impl_speed"),l=n!==null&&n.value==="main"?"\uBA54\uC778":od([Lg(r,t??null),Dg(o),Pg(i),s!==null&&s.value==="fast"?"Fast":null]);return l===""?null:{text:l,title:rl(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",yr("impl_dispatch",n),yr("impl_runtime",r),yr("impl_model",o),yr("impl_effort",i),yr("impl_speed",s)])}}var Mg=Object.freeze(new Set(["push_not_contained","invalid_impl_review","premature_close","head_mismatch","foreign_deploy_unsupported","not_resolved"])),qg=Object.freeze(["delivery_unproven:"]);function vi(e){let t=e&&typeof e.reason=="string"?e.reason:"";if(t.length===0||Mg.has(t))return"session";for(let n of qg)if(t.startsWith(n))return"session";return"settlement"}var Ng=["hard_diagnosis","invariant_reasoning","verification_by_judgment","claude_bound"];var jg={hard_diagnosis:"\uC6D0\uC778\uC774 \uBD88\uBA85\uD655\uD558\uAC70\uB098 \uC7AC\uD604\uC774 \uBD88\uC548\uC815\uD574 \uAC00\uC124-\uAC80\uC99D \uB8E8\uD504\uAC00 \uD544\uC694\uD558\uB2E4",invariant_reasoning:"\uC815\uD569\uC131\uC774 \uC0C1\uD0DC\uAE30\uACC4\xB7\uB3D9\uC2DC\uC131\xB7\uBD88\uBCC0\uC2DD \uCD94\uB860\uC5D0 \uB2EC\uB824 \uC788\uB2E4",verification_by_judgment:"\uD14C\uC2A4\uD2B8\uAC00 \uBABB \uC7A1\uACE0 \uB9AC\uBDF0\uC5B4\uC758 \uCD94\uB860\uC73C\uB85C\uB9CC \uAC80\uC99D\uD560 \uC218 \uC788\uB2E4",claude_bound:"Claude \uC138\uC158 \uC790\uC0B0\xB7\uC758\uBBF8\uB860\uC5D0 \uAC15\uD558\uAC8C \uBB36\uC5EC \uC788\uB2E4"};function ol(e){return(e&&Array.isArray(e.reasons)?e.reasons:[]).map(n=>jg[n]||"").filter(n=>n.length>0)}var sd={orchestration_model:["fable"],impl_runtime:["claude"]},sl={unapplied:"\uBBF8\uC801\uC6A9",applied:"\uC801\uC6A9\uB428",diverged:"\uCD94\uCC9C\uACFC \uB2E4\uB984"};function id(e){return typeof e=="object"&&e!==null?e:null}function ad(e,t){return typeof e=="string"&&t.includes(e)?e:""}function Fg(e){return typeof e!="string"?[]:e.split("+").map(t=>t.trim()).filter(t=>Ng.includes(t))}function Xo(e,t=e){let n=id(e);if(!n)return null;let r=ad(n.rec_orchestration_model,sd.orchestration_model);if(r.length===0)return null;let o=ad(n.rec_impl_runtime,sd.impl_runtime),i={orchestration_model:r};o.length>0&&(i.impl_runtime=o);let s=id(t)||{},l=Object.keys(i),a=0,u=0;for(let f of l){let h=s[f];typeof h=="string"&&h.length>0&&(a+=1,h===i[f]&&(u+=1))}let d=a===0?"unapplied":u===l.length?"applied":"diverged";return{reasons:Fg(n.rec_reason),rec:i,state:d}}function ki(e){if(!e||typeof e!="object")return"";let t=ol(e),n=sl[e.state]||"",r=["\uBCF5\uC7A1\uD55C \uC791\uC5C5\uC73C\uB85C \uD310\uC815\uB428"];return t.length>0&&r.push(`\uC0AC\uC720: ${t.join(" \xB7 ")}`),n.length>0&&r.push(`\uC0C1\uD0DC: ${n}`),r.join(`
`)}function wi(e){return e.replace(/\/+$/,"")}function Bg(e,t){let n=wi(e),r=wi(t);return n===r||r.startsWith(`${n}/`)||n.startsWith(`${r}/`)}function $i(e,t){let n=new Set;for(let r of e)for(let o of t){if(!Bg(r,o))continue;let i=wi(r),s=wi(o);n.add(i.length>=s.length?i:s)}return[...n].sort()}function il(e,t){return`${e}\0${t}`}function ld(e){let t=new Map;for(let n of Array.isArray(e?.running)?e.running:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"running",state:"running"});for(let n of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let n of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let r=Array.isArray(n.sublanes?.parallel)?n.sublanes.parallel:Array.isArray(n.items)?n.items:[];for(let o of r)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:"parallel",position:o.queue_position});for(let o of Array.isArray(n.sublanes?.serial)?n.sublanes.serial:[])for(let i of o.items)t.set(i.id,{root_dir:i.root_dir,workspace_name:i.workspace_name,lane:o.id,position:i.queue_position})}for(let n of Array.isArray(e?.runnable)?e.runnable:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"runnable",state:"runnable"});for(let n of Array.isArray(e?.done)?e.done:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"done",state:"done"});return t}function Jo(e,t){let n=Array.isArray(t)?t:[],r=e.indexOf("-"),o=r>0?e.slice(0,r):e;return n.some(i=>typeof i?.issue_prefix=="string"&&i.issue_prefix===o)?"internal":n.length>0&&n.every(i=>typeof i?.issue_prefix=="string")?"external":"unknown"}function Zo(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function cd(e,t,n,r){let o=n.get(e);if(!!(o&&t&&o.root_dir===t.root_dir&&o.lane===t.lane&&typeof o.position=="number"&&typeof t.position=="number"&&o.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0};if(o)return{id:e,label:`\u{1F512} ${e} (${Zo(o)})`,location_label:Zo(o),scope:null,same_lane_ahead:!1};let s=Jo(e,r),l=s==="internal"?"\uBBF8\uC801\uC7AC":s==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${l})`,location_label:l,scope:s,same_lane_ahead:!1}}function ud(e){let t=Array.isArray(e)?e:[],n=new Map,r=new Map,o=new Map;for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let u=il(l.root_dir,a.id);n.set(u,{root_dir:l.root_dir,workspace_name:l.name,lane:a.id}),o.set(u,[]);for(let d of Array.isArray(a.items)?a.items:[])r.set(d.id,u)}for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let u=il(l.root_dir,a.id),d=Array.isArray(a.items)?a.items[0]:null,h=!!d&&d.queue_index===0&&(!Array.isArray(a.occupied_by)||a.occupied_by.length===0)&&Array.isArray(d.blocked_by)?d.blocked_by:[],g=o.get(u);if(g)for(let k of h){let E=r.get(k);E&&E!==u&&!g.includes(E)&&g.push(E)}}let i=(l,a)=>{let u=new Set,d=[l];for(;d.length>0;){let f=d.pop();if(f===a)return!0;!f||u.has(f)||(u.add(f),d.push(...o.get(f)||[]))}return!1},s=new Map;for(let[l,a]of o){let u=[];for(let d of a){let f=n.get(d);i(d,l)&&f&&u.push(f)}u.length>0&&s.set(l,u)}return s}function dd(e,t){return il(e,t)}var Ug=Object.freeze(["done","abandoned"]);function pd(e){return!e||typeof e!="object"||Array.isArray(e)?!1:typeof e.phase=="string"&&!Ug.includes(e.phase)}async function Wg(e){let t=await yn(e);me(t?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",t?"success":"error",1200)}function Fr(e){return typeof e!="string"||e.length===0?"":c`<span class="worker-ev__copyline"
    ><code class="worker-ev__path">${e}</code
    ><button
      type="button"
      class="worker-ev__copy"
      data-seam="log-path-copy"
      title="로그 경로 복사"
      aria-label=${`\uB85C\uADF8 \uACBD\uB85C \uBCF5\uC0AC: ${e}`}
      @click=${()=>{Wg(e)}}
    >
      ⧉
    </button></span
  >`}var fd=Object.freeze(["spec_backed","full_plan","quick_fix"]);var zg="worker-ineligible";function es(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function _d(e){return es(e).includes(zg)}var Hg=new Set(fd),md=new WeakMap;function ko(e){return e&&typeof e=="object"?e:{}}function Kg(e){let t=md.get(e);if(t)return t;let n=hd(e);return md.set(e,n),n}function xi(e,t){return(Array.isArray(e)?e:[]).findIndex(r=>r&&r.bead_id===t)}function Gg(e,t){if(e.length===0)return null;if(Kg(t).has(e))return{lane:"running"};if(xi(t.pr_wait,e)>=0)return{lane:"pr_wait"};let n=xi(t.queue,e);if(n>=0)return{lane:"parallel",index:n};for(let r of Array.isArray(t.serial_lanes)?t.serial_lanes:[]){if(!r||typeof r.id!="string"||!/^s[1-5]$/.test(r.id))continue;let o=xi(r.entries,e);if(o>=0)return{lane:r.id,index:o}}return xi(t.done,e)>=0?{lane:"done"}:null}function al(e,t){let n=Hg.has(e.route),r=e.route==="quick_fix";return{placeable:n&&!e.worker_ineligible&&!e.awaiting_user&&(r?e.has_description:e.spec==="published")&&t===null,route_ok:n,worker_ineligible:e.worker_ineligible,awaiting_user:e.awaiting_user,missing_description:r&&!e.has_description,spec:e.spec,location:t}}function ts(e,t){let n=ko(e),r=ko(t),o=oo(n),i=n.workflow?.route_source==="explicit"&&typeof n.workflow.route=="string"&&n.workflow.route||(typeof ko(n.metadata).route=="string"?ko(n.metadata).route:""),s=i==="quick_fix",l=!Object.hasOwn(n,"description")||typeof n.description=="string"&&n.description.trim().length>0,a=Object.hasOwn(n,"labels")&&_d(n.labels),u=Object.hasOwn(ko(n.metadata),"awaiting_user"),d=Gg(typeof n.id=="string"?n.id:"",r);return al({route:i,spec:s?"n/a":o.conflict?"conflict":o.evidence,has_description:l,awaiting_user:u,worker_ineligible:a},d)}function Br(e){let t=e.location;if(t)switch(t.lane){case"running":return"\uC2E4\uD589 \uC911\uC774\uB77C \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4";case"pr_wait":return"PR \uB300\uAE30 \uC911\uC774\uB77C \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4";case"done":return"\uC644\uB8CC \uB808\uC778\uC5D0 \uC788\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4";case"parallel":return`\uC774\uBBF8 \uB300\uAE30 \uC911 \xB7 \uBCD1\uB82C #${t.index+1}`;default:return`\uC774\uBBF8 \uB300\uAE30 \uC911 \xB7 \uC9C1\uB82C ${t.lane.slice(1)} #${t.index+1}`}return e.placeable?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":e.route_ok===!1?"route\uAC00 \uC815\uD574\uC9C0\uC9C0 \uC54A\uC544 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":e.worker_ineligible?"worker-ineligible label\uB85C \uC6CC\uCEE4\uC5D0\uC11C \uC2E4\uD589\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":e.awaiting_user?"\uC0AC\uC6A9\uC790 \uB9AC\uBDF0\uB97C \uAE30\uB2E4\uB9AC\uB294 \uC911\uC774\uB77C \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":e.missing_description?"description\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":e.spec==="conflict"?"spec \uACBD\uB85C\uAC00 \uCDA9\uB3CC\uD574 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"spec\uC774 \uBC1C\uD589\uB418\uC9C0 \uC54A\uC544 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}function ns(e){let t=ko(e),n=typeof t.serial_lane_count=="number"&&Number.isInteger(t.serial_lane_count)&&t.serial_lane_count>0?Math.min(t.serial_lane_count,5):0,r=Array.isArray(t.serial_lanes)?t.serial_lanes:[],o=[];for(let s of r){if(o.length>=n)break;!s||typeof s.id!="string"||!/^s[1-5]$/.test(s.id)||!Array.isArray(s.entries)||o.push({id:s.id,label:`\uC9C1\uB82C ${s.id.slice(1)}`,count:s.entries.length})}return o.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(t.queue)?t.queue:[]).length},...o]}function gd(e){return/^s[1-5]$/.test(e)?`\uC9C1\uB82C ${e.slice(1)}`:"\uBCD1\uB82C"}function Ei(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function vd(e){return e==="session"?"bead\uAC00 in_progress\uB85C \uC7A1\uD78C \uB4A4 \uB2EB\uD788\uAE30\uAE4C\uC9C0\uC758 \uACBD\uACFC":"attempt \uC2E4\uD589 \uC2DC\uAC04 \uD569\uC0B0 (\uC7AC\uAC1C \uC138\uC158 \uD3EC\uD568)"}function Ur(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let n=Math.floor(t/60);if(n<60)return`${n}\uBD84 ${Math.round(t-n*60)}\uCD08`;let r=Math.floor(n/60),o=n%60;return`${r}\uC2DC\uAC04 ${o}\uBD84`}function kd(e,t){if(typeof e!="object"||e===null)return[];let n=!1,r=!1;for(let o of Object.values(e)){if(typeof o!="object"||o===null)continue;let i=o;i.bead_id!==t||i.kind!=="review_session"||(n=!0,r=r||i.origin==="auto")}return n?[r?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"]:[]}function bd(e){return e==="auto"||e==="click"?e:null}function wd(e,t){if(typeof e!="object"||e===null)return{active:!1,failure:null,origin:null};let n=!1,r=null,o=-1,i=null,s=null,l=-1;for(let a of Object.values(e)){if(typeof a!="object"||a===null)continue;let u=a;if(u.bead_id!==t||u.kind!=="review_session")continue;if(u.status==="pending"||u.status==="running"){n=!0;let f=typeof u.started_at=="number"?u.started_at:0;f>=o&&(o=f,r=bd(u.origin));continue}if(u.status!=="failed")continue;let d=typeof u.finished_at=="number"?u.finished_at:0;d>=l&&(l=d,i=typeof u.cause=="string"&&u.cause.length>0?u.cause:null,s=bd(u.origin))}return n?{active:!0,failure:null,origin:r}:{active:!1,failure:i,origin:s}}function $d(e,t){if(typeof e!="object"||e===null)return null;let n=0,r=!1;for(let o of Object.values(e)){if(typeof o!="object"||o===null)continue;let i=o;if(i.bead_id!==t)continue;let s=i.started_at,l=i.finished_at;typeof s!="number"||typeof l!="number"||!Number.isFinite(s)||!Number.isFinite(l)||l<s||(n+=l-s,r=!0)}return r?n:null}function Ti(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function Yg(e,t){let n=Array.isArray(e)?e:[],r=Array.isArray(t)?t:[];if(n.length===0&&r.length===0)return null;let o=null;for(let s of n)s.kind!=="deploy"||s.state!=="succeeded"||typeof s.target_sha!="string"||(!o||(typeof s.finished_at=="number"?s.finished_at:0)>(typeof o.finished_at=="number"?o.finished_at:0))&&(o=s);let i=n.filter(s=>s.state==="failed"&&!s.dismissed&&!s.superseded_by).length+r.length;return{deploy:o?{sha:Ei(o.target_sha),at:typeof o.finished_at=="number"?o.finished_at:null,elapsed_ms:typeof o.elapsed_ms=="number"?o.elapsed_ms:null}:null,unresolved:i,badge:i>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${i}`}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function xd(e,t){let n=Yg(e,t);return n?c`<button
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
            title=${n.deploy.at?sn(n.deploy.at):""}
            >${Ti(n.deploy.at)}${n.deploy.elapsed_ms!==null?` \xB7 ${Ur(n.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${n.badge.tone}"
      >${n.badge.label}</span
    >
  </button>`:""}function wo(e){let t=bn(e.created_at),n=bn(e.updated_at);return!t&&!n?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${sn(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&n?c`<span>·</span>`:""}${n?c`<span title=${`\uC218\uC815 ${sn(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </div>`}function Vg(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="abandoned"?"\uD3D0\uAE30 \uD3EC\uAE30\uB428":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function os(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function ss(e,t){return t.kind==="stale_work_backup_fresh"?`${e}: \uC2E4\uD328\uD55C \uBC31\uC5C5 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4. \uBC31\uC5C5\uC740 \uB9CC\uB4E4\uC5B4\uC9C0\uC9C0 \uC54A\uC558\uACE0 \uAE30\uC874 \uC791\uC5C5\uC740 \uADF8\uB300\uB85C \uB0A8\uC2B5\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uC2E4\uD328\uD55C \uD3D0\uAE30 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4. \uBC31\uC5C5\uACFC \uD3D0\uAE30\uB294 \uC218\uD589\uB418\uC9C0 \uC54A\uC558\uACE0 bead\uB294 \uD3D0\uAE30 \uC774\uC804 \uC0C1\uD0DC\uB85C \uB3CC\uC544\uAC11\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function Ci(e){return e.kind==="stale_work_backup_fresh"?`\uBC31\uC5C5 \uD3EC\uAE30\uB428 \xB7 \uAE30\uC874 \uC791\uC5C5\uC740 \uADF8\uB300\uB85C \uB0A8\uC2B5\uB2C8\uB2E4 (\uC6D0\uC778: ${e.last_error})`:`\uD3D0\uAE30 \uD3EC\uAE30\uB428 \xB7 \uD3D0\uAE30\uB294 \uC218\uD589\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 (\uC6D0\uC778: ${e.last_error})`}function Ri(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function Ad(e){return e?.startsWith("orphan_gitlink_content:")?`\uB9E4\uD551 \uC5C6\uB294 gitlink \uACBD\uB85C ${e.slice(23)}\uC5D0 \uB0B4\uC6A9\uC774 \uC788\uC2B5\uB2C8\uB2E4 \u2014 \uC800\uC7A5\uC18C\uC5D0\uC11C \uADF8 \uACBD\uB85C\uB97C \uC815\uB9AC\uD55C \uB4A4 \uC7AC\uC2DC\uB3C4\uD558\uAC70\uB098 \uD3EC\uAE30\uD558\uC138\uC694`:e==="dirty_submodule"?"\uC11C\uBE0C\uBAA8\uB4C8\uC5D0 \uBBF8\uCEE4\uBC0B \uBCC0\uACBD\uC774\uB098 \uBBF8\uCD08\uAE30\uD654 \uD56D\uBAA9\uC774 \uC788\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC \uD6C4 \uC7AC\uC2DC\uB3C4\uD558\uC138\uC694":e==="submodule_observation_failed"?"\uC11C\uBE0C\uBAA8\uB4C8 \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (git \uC624\uB958) \u2014 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C git \uBA85\uB839\uC744 \uC9C1\uC811 \uD655\uC778\uD558\uC138\uC694":null}function sr(e,t,n={}){let o=Object.values(e&&typeof e=="object"?e:{}).filter(h=>h&&h.bead_id===t&&pd(h)).sort((h,g)=>(h.requested_at||0)-(g.requested_at||0)).at(-1),i=typeof n.attempt_id=="string"&&n.attempt_id.length>0?n.attempt_id:typeof o?.attempt_id=="string"?o.attempt_id:null,s=n.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":n.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":n.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,l=typeof o?.last_error=="string"?o.last_error:null,a=o?Vg(o.phase):null,u=o?.kind==="stale_work_backup_fresh",d=Ad(l),f=n.merged||o?.mode==="merged_revert"?"merged":"unmerged";return{action:!n.external&&!n.done,enabled:!s&&(!o||!!l),label:u?l?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":l?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:s||(l?d?`\uD3D0\uAE30 \uC2E4\uD328: ${l} \u2014 ${d}`:u?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${l} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${l} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:o?`${a||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:f==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:i,operation:o||null,progress:a,error:l,confirmation:f,abandon:{action:!!o&&o.phase==="requested"&&!!l,label:u?"\uBC31\uC5C5 \uD3EC\uAE30":"\uD3D0\uAE30 \uD3EC\uAE30",title:u?"\uC2E4\uD328\uD55C \uBC31\uC5C5 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4 \u2014 \uC6D0\uBCF8\uC740 \uADF8\uB300\uB85C \uB0A8\uACE0 \uC0C8\uB85C \uC2DC\uC791\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4":"\uC2E4\uD328\uD55C \uD3D0\uAE30 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4 \u2014 \uBC31\uC5C5\xB7\uD3D0\uAE30\uB294 \uC218\uD589\uB418\uC9C0 \uC54A\uC558\uACE0 bead\uB294 \uD3D0\uAE30 \uC774\uC804 \uC0C1\uD0DC\uB85C \uB3CC\uC544\uAC11\uB2C8\uB2E4"}}}function Sd(e){if(!e||e.quickfix_lane!==!0)return!1;let t=e.quickfix_landing;return!t||typeof t!="object"?!1:["repo_operations","branch_cleanup","parent_close"].includes(t.cursor)}function Si(e){let t=e.discard;if(!t||!t.operation)return"";let n=t.operation,r=Ad(t.error),o=n.kind==="stale_work_backup_fresh"&&!t.error?null:n.backup?.path,i=n.original_pr,s=n.revert_pr;return c`<div
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
  </div>`}var Qg={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function Ed(e,t=!1){if(!e||typeof e!="object")return null;let n=e;if(n.reason!=="worktree_stale_work"||!n.stale_work||typeof n.stale_work!="object")return null;let r=n.stale_work,o=r.residue==="branch"?"branch":"worktree",i=r.state==="unique"?"unique":"unknown",s=r.summary&&typeof r.summary=="object"?r.summary:{};function l(u){return Number.isInteger(s[u])?Number(s[u]):0}let a=typeof r.cause=="string"?r.cause:"observe_failed";return{residue:o,state:i,title:o==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":i==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:Qg[a]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:o==="branch"?`\uACE0\uC720 commit ${l("branch_ahead")}`:[`staged ${l("staged_count")}`,`unstaged ${l("unstaged_count")}`,`untracked ${l("untracked_count")}`,`branch ahead ${l("branch_ahead")}`,`HEAD ahead ${l("head_ahead")}`].join(" \xB7 "),action_id:typeof r.action_id=="string"?r.action_id:"",can_resume:r.can_resume===!0,can_continue:r.can_continue===!0,can_backup_fresh:r.can_backup_fresh===!0,can_recheck:r.can_recheck===!0,locked:t}}function Wr(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let n=t.pin===!0?" exec-chip--pin":"",r=t.pin===!0?`
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
      >`:""}`}function rs(e,t){let n=`worker-dep worker-dep--${t}${e.foreign?" worker-dep--foreign":""}`;return e.openable===!0?c`<button
        type="button"
        class=${`${n} worker-dep__open`}
        data-dep-id=${e.id}
        data-root-dir=${e.root_dir||""}
        title=${e.title||""}
      >
        ${e.label}
      </button>`:c`<span class=${n} title=${e.title||""}>${e.label}</span>`}function Xg(e){return{id:e.id,label:`\u29C9 ${e.id}`,title:[`\uACB9\uCE68 \xB7 ${e.location_label}`,...e.prefixes].join(`
`),openable:!0,...e.root_dir?{root_dir:e.root_dir}:{}}}function ll(e){return Array.isArray(e)?e.slice().sort((t,n)=>t.id<n.id?-1:t.id>n.id?1:0):[]}function Zg(e,t=!1){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__spec-after-blocker"
    data-chip-key="spec_after_blocker"
    aria-expanded=${t?"true":"false"}
    title="선행의 결과가 설계 전제라 스펙도 선행 뒤에 씁니다"
  >
    스펙 대기
  </button>`:""}function Td(e){if(!Object.hasOwn(e,"route_ok")||e.queue_placeable===!0)return null;let t="";return e.route_ok===!1&&(t="\uB77C\uC6B0\uD305 \uD544\uC694"),t.length===0&&(e.worker_ineligible===!0||e.awaiting_user===!0)||(t.length===0&&e.missing_description===!0?t="\uBCF8\uBB38 \uD544\uC694":t.length===0&&e.placement_spec==="conflict"?t="\uC2A4\uD399 \uCDA9\uB3CC":t.length===0&&Object.hasOwn(e,"placement_spec")&&e.placement_spec!=="published"&&(t="\uC2A4\uD399 \uBBF8\uBC1C\uD589"),t.length===0)?null:{label:t,title:Br({placeable:!1,route_ok:e.route_ok,worker_ineligible:e.worker_ineligible===!0,awaiting_user:e.awaiting_user===!0,missing_description:e.missing_description===!0,spec:e.placement_spec})}}function Jg(e,t){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__readiness"
    data-chip-key="readiness"
    aria-expanded=${t?"true":"false"}
    title=${e.title}
  >
    ${e.label}
  </button>`:""}function Oi(e,t=""){if(!e)return t===""?"":c`<div class="worker-deps worker-deps--primary">
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
            >`:""}${n.map(d=>rs(d,"pred"))}${t}${o.map(d=>rs(d,"dependents"))}
      </div>`:""}${u?c`<div class="worker-deps worker-deps--secondary">
        ${r.map(d=>rs(d,"released"))}${i.map(d=>rs(Xg(d),"overlap"))}${s?c`<span
              class="worker-dep worker-dep--muted"
              title="겹침 판정 불가 — 아티팩트가 있으면 스펙/플랜 front-matter, 없으면 description \`## scope\`에 선언 필요"
              >scope 없음</span
            >`:""}
      </div>`:""}`}function Cd(e,t=""){let n=(Array.isArray(e)?e:[]).filter(r=>typeof r=="string"&&r!=="").slice().sort();return n.length===0?"":c`<div class="worker-deps worker-deps--secondary">
    ${n.map(r=>rs({id:r,label:`\uC774\uC6D4 \u2192 ${r}`,title:`\uC774\uC6D4\uB41C \uD6C4\uC18D ${r} \uC5F4\uAE30`,openable:!0,...t?{root_dir:t}:{}},"dependents"))}
  </div>`}function Ii(e){return e?c`<button
    type="button"
    class="worker-dep worker-dep--lane mon-lane__chip"
    data-lane-id=${e.lane_id}
    title="이 연결 레인으로 이동"
  >
    ${e.label}
  </button>`:""}function zr(e){if(!e)return"";let t=e.chips||{},n=t.route||e.route,r=t.route_source==="derived"||e.route_source==="derived";return n?c`<span
    class="ctl-chip ctl-chip--route${r?" is-derived":""}"
    title=${r?"route \uBBF8\uD540 (metadata unset)":"route"}
    >${r?"unset":n}</span
  >`:""}function eh(e,t=!1){let n=e?e.quick_fix_review:null;if(!n)return"";let r=n.state;if(r!=="reviewed"&&r!=="stale")return"";let o=Array.isArray(n.missing)?n.missing:[],i=[r==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",...o].join(`
`);return c`<button
    type="button"
    class="ctl-chip judgement-chip worker-card__qfr worker-card__qfr--${r}"
    data-chip-key="qfr"
    aria-expanded=${t?"true":"false"}
    title=${i}
  >
    ${r==="reviewed"?"\uB9AC\uBDF0 \u2713":"\uB9AC\uBDF0 stale"}
  </button>`}function Rd(e){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--from"
    data-from-id=${e}
    title=${`\uCD9C\uCC98 ${e} \uC5F4\uAE30`}
  >
    ↩ from ${e}
  </button>`:""}function Li(e,t=!1){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__rec"
    data-chip-key="rec"
    data-state=${e.state}
    aria-expanded=${t?"true":"false"}
    title=${ki(e)}
  >
    ${"\uBCF5\uC7A1"}
  </button>`:""}var th={absent:"\uC2E4\uD589 \uC601\uC218\uC99D\uC774 \uAE30\uB85D\uB418\uC9C0 \uC54A\uC558\uB2E4 \u2014 \uACFC\uAC70 Bead\xB7\uC678\uBD80 \uACBD\uB85C PR\uC740 \uC6D0\uB798 \uC5C6\uB2E4",unparsable:"\uC601\uC218\uC99D \uAC12\uC744 \uC77D\uC744 \uC218 \uC5C6\uB2E4 \u2014 40hex SHA\uB098 `delegated:`/`main:` \uD615\uC2DD\uC774 \uC544\uB2C8\uB2E4",effort_unknown:"effort \uD1A0\uD070\uC774 harness \uC5B4\uD718 \uBC16\uC774\uB2E4 \u2014 \uBAA8\uB378\xB7SHA\xB7unit\uC740 \uC720\uD6A8\uD558\uB2E4",main_reason_retired:"`main:` \uC0AC\uC720\uAC00 \uACE0\uC815 4\uD1A0\uD070(bead\xB7quick_fix_default\xB7phase_line\xB7takeover) \uBC16\uC774\uB2E4",main_receipt_unbacked:"`main:` \uC0AC\uC720\uB97C \uB4B7\uBC1B\uCE68\uD558\uB294 \uBA54\uD0C0\uB370\uC774\uD130(impl_dispatch\xB7route\xB7planned_execution\xB7quick_fix \uAE30\uBCF8 dispatch)\uAC00 \uC5C6\uB2E4",takeover_lineage_missing:"`main:takeover`\uC778\uB370 resolved \uBAA8\uB378\uACFC \uC77C\uCE58\uD558\uB294 \uC644\uB8CC\uB41C \uC704\uC784 \uC138\uC158\uC774 \uC5C6\uB2E4",takeover_lineage_unobservable:"`main:takeover`\uC778\uB370 \uC704\uC784 \uACC4\uBCF4\uB97C \uBAA8\uB2C8\uD130\uAC00 \uBCFC \uC218 \uC5C6\uB2E4(Codex \uBC16 \uB7F0\uD0C0\uC784)"};function nh(e,t=!1){let n=Od(e);if(n.length===0)return"";let r=n.length>1?`\uC601\uC218\uC99D \xB7 ${n[0]} +${n.length-1}`:`\uC601\uC218\uC99D \xB7 ${n[0]}`;return c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__receipt"
    data-chip-key="receipt"
    data-bead-id=${e.id}
    aria-expanded=${t?"true":"false"}
    title=${n.join(", ")}
  >
    ${r}
  </button>`}function Od(e){let t=e.receipt_badge?e.receipt_badge.codes:null;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function Id(e,t){return!e||typeof t!="number"?"":c`<a
    class="worker-mini__pr"
    href=${e}
    target="_blank"
    rel="noreferrer noopener"
    title="PR 열기"
    >#${t} ↗</a
  >`}function Di(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=Math.max(0,Math.min(4,Math.trunc(e)));return c`<span class="worker-pri" title=${`\uC6B0\uC120\uC21C\uC704 P${t}`}
    >P${t}</span
  >`}function rh(e){let t=Array.isArray(e.badges)?e.badges:[],n=pn(e.usage),r=nr(e.usage),o=bn(e.done_at);return c`<div
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
      ${Id(e.pr_url,e.pr_number)}${o?c`<span
            class="worker-mini__done-at"
            title=${`\uC644\uB8CC ${sn(e.done_at)}`}
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
    ${Cd(e.carried_to,e.root_dir)}
    <div class="worker-mini__row3">
      ${zr(e.workflow)}${e.exec_chips?Wr(e.exec_chips):""}${n.length>0?n.map(i=>c`<span class="worker-usage" title=${i.tooltip}
                >${i.label}</span
              >`):r?c`<span class="worker-usage" title=${zo(e.usage)}
              >${r}</span
            >`:""}
      ${typeof e.work_ms=="number"?c`<span
            class="worker-mini__work"
            title=${vd(e.work_kind)}
            >작업 ${Ur(e.work_ms)}</span
          >`:""}
    </div>
  </div>`}function Pi(e,t){return typeof e=="number"?e+Dd-t:0}function ul(e,t=Date.now()){let n=Pi(e,t);return n<=0?"":c`<span
    class="worker-dep worker-dep--grace"
    title="대기에 막 들어온 항목입니다 — 남은 시간 동안 자동 실행이 미뤄집니다"
    >⏳ ${Math.ceil(n/1e3)}초</span
  >`}function dl(e,t=Date.now()){return Pi(e.added_at,t)<=0?"":c`<button
    type="button"
    class="op-btn worker-mini__start-now"
    data-action="queue-start-now"
    data-bead-id=${e.id}
    title="대기 진입 유예를 이 항목에 대해서만 걷고 지금 실행합니다"
  >
    지금 시작
  </button>`}function $o(e,t={}){if(!(e.draggable!==!0||e.done===!0))return c`<span class="worker-mini__rowops">
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
  </span>`}function qn(e,t={}){if(e.lane==="done"&&e.done_layout==="three_line")return rh(e);let n=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],o=pn(e.usage),i=nr(e.usage),s=e.merge_step||null,l=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work||e.discard?.abandon.action===!0,a=e.lane==="done"&&!l,u=a?bn(e.done_at):"",d=n?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",f=typeof e.seq=="number"?c`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",h=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",g=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,k=zr(e.workflow),E=e.lane==="done"?"":Rd(e.from_id),C=Di(e.priority),te=c`<span class="worker-mini__title">${e.title}</span>`,ie=Id(e.pr_url,e.pr_number),z=r.map(V=>V===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${V}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${V===e.completion_badge&&e.completion_title||""}
          >${V}</span
        >`),P=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",I=o.length>0?o.map(V=>c`<span class="worker-usage" title=${V.tooltip}
              >${V.label}</span
            >`):i?c`<span class="worker-usage" title=${zo(e.usage)}
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
      </button>`:"",H=e.cancel_action?c`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",U=e.discard,M=U?.action||e.discard_action?c`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${U?.attempt_id||""}
          data-operation-id=${U?.operation?.operation_id||""}
          data-discard-mode=${U?.confirmation||"unmerged"}
          ?disabled=${U?!U.enabled:e.discard_enabled===!1}
          title=${U?U.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${U?.label||"\uD3D0\uAE30"}
        </button>`:"",Q=U?.abandon.action?c`<button
        type="button"
        class="worker-mini__discard-abandon"
        data-bead-id=${e.id}
        data-operation-id=${U.operation.operation_id}
        data-operation-kind=${U.operation.kind||""}
        data-last-error=${U.error||""}
        title=${U.abandon.title}
      >
        ${U.abandon.label}
      </button>`:"",B=e.resolve_action?c`<button
        type="button"
        class="worker-mini__resolve"
        data-bead-id=${e.id}
        ?disabled=${e.resolve_enabled===!1}
        title=${e.resolve_title||"\uC2E4\uD328\uD55C \uC791\uC5C5\uC744 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 (\uAE30\uB85D\uB41C \uC138\uC158\uC774 \uC788\uC73C\uBA74 fork)"}
      >
        세션에서 해결
      </button>`:"",ne=U?.abandon.action?c`${M}${Q}${B}`:c`${B}${M}`,ge=e.stale_work||null,Oe=ge?c`${ge.can_resume||ge.can_continue?c`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${ge.action_id}
            ?disabled=${ge.locked}
          >
            기존 작업 이어가기
          </button>`:""}${ge.can_backup_fresh?c`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${ge.action_id}
            ?disabled=${ge.locked}
          >
            백업 후 새로 시작
          </button>`:""}${ge.can_recheck?c`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${ge.action_id}
            ?disabled=${ge.locked}
          >
            다시 확인
          </button>`:""}`:"",K=ge?c`<div class="worker-mini__stale">
        <strong>${ge.title}</strong>
        <span>${ge.summary}</span>
        <span>${ge.cause}</span>
        ${ge.can_backup_fresh?c`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",re=e.revise_action?c`<button
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
        </button>`:"",pe=!!(e.lane!=="pr_wait"&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)),Te=pe?Wr(e.exec_chips,{pin:e.exec_chips_pinned===!0}):"",Y=Li(e.rec,vr(e,"rec")),ae=nh(e,vr(e,"receipt")),Z=Ii(e.cross_lane_chip),be=Fr(e.log_path),Ie=h||Z||k||E||pe||Y||ae||I||be?c`<div class="worker-chips">
          ${h}${Z}${k}${E}${Te}${Y}${ae}${I}${be}${Ai(e)}
        </div>`:"",ye=Oi(e.dependency_chips,ul(e.added_at)),Le=Si(e),Ge=t.actions?t.actions:"",gt=!!(s||e.merge_action||e.cancel_action||e.resolve_action||e.discard_action||U?.operation||e.revise_action||ge);return c`<div
    class="worker-mini${l?" worker-mini--card":""}${n?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${s?" worker-mini--merging":""}${s?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}${e.search_match===!1?" is-dimmed":""}"
    style=${s?`--progress: ${s.percent}%`:""}
    draggable=${n?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${a?c`<div class="worker-mini__row1">
            ${h}${g}${C}${E}${ie}${te}${Ge}
          </div>
          ${Cd(e.carried_to,e.root_dir)}
          <div class="worker-mini__row2">
            ${k}${Te}${I}${u?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${sn(e.done_at)}`}
                  >완료 ${u}</span
                >`:""}${typeof e.work_ms=="number"?c`<span
                  class="worker-mini__work"
                  title=${vd(e.work_kind)}
                  >작업 ${Ur(e.work_ms)}</span
                >`:""}${z}${q}
            <span class="worker-mini__actions"
              >${F}${H}${ne}</span
            >
            ${wo(e)}
          </div>`:l?c`<div class="worker-mini__head">
              ${d}${f}${g}${C}${ie}${z}${P}${Ge}
            </div>
            <div class="worker-mini__body">${te}${K}</div>
            ${ye}${Ie}${gt?c`<div class="worker-mini__foot">
                  ${q}
                  <span class="worker-mini__actions"
                    >${F}${H}${ne}${re}${Oe}</span
                  >
                  ${Si(e)}
                </div>`:""}
            ${wo(e)}`:c`<div class="worker-mini__line">
              ${d}${f}${g}${C}${te}${ie}${z}${P}${q}${F}${H}${ne}${Ge}
            </div>
            ${ye}${Ie}${Le} ${wo(e)}`}
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
      </button>`)}return c`${r}`}var Ld={external_roundtrip:"\uD558\uB124\uC2A4 \uBC16 \uC0C1\uB300\uC640 \uC608\uCE21 \uBD88\uAC00 \uC655\uBCF5 \uBC18\uBCF5 \u2014 \uB2E4\uB978 rig \uC138\uC158\xB7\uC0AC\uB78C\xB7\uC678\uBD80 \uC2DC\uC2A4\uD15C",user_feedback_loop:"\uC9C4\uD589 \uC911 \uC0AC\uC6A9\uC790 \uD53C\uB4DC\uBC31 \uC5C6\uC774\uB294 \uD488\uC9C8\uC774 \uB0AE\uC74C \u2014 \uBB38\uC548\xB7\uC124\uACC4 \uC138\uBD80\xB7\uBC29\uD5A5 \uC120\uD0DD"};function fl(e,t){if(t==="rec"){let n=e.rec;if(!n)return null;let r=sl[n.state]||"";return{title:"\uBCF5\uC7A1\uD55C \uC791\uC5C5\uC73C\uB85C \uD310\uC815\uB428",lines:[...ol(n),...r.length>0?[`\uC0C1\uD0DC: ${r}`]:[],"\uC801\uC6A9\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uC2E4\uD589 \uC124\uC815 \uD3B8\uC9D1\uAE30\uC5D0\uC11C"]}}if(t==="session_preferred"){if(e.session_preferred!==!0)return null;let n=Ld[e.session_preferred_reason||""]||"";return{title:"\uC6CC\uCEE4\uB85C \uB3CC\uB9B4 \uC218 \uC788\uC9C0\uB9CC \uC138\uC158\uC774 \uB0AB\uB2E4",lines:n.length>0?[n]:[]}}if(t==="ineligible")return e.worker_ineligible!==!0?null:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uB300\uC0C1\uC774 \uC544\uB2C8\uB2E4",lines:["worker-ineligible \uB77C\uBCA8\uC774 \uBD99\uC5B4 \uC788\uB2E4 \u2014 \uB77C\uBCA8\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uB77C\uBCA8 \uC808\uC5D0\uC11C \uB5C0\uB2E4"]};if(t==="spec_after_blocker")return e.spec_after_blocker!==!0?null:{title:"\uC120\uD589 \uACB0\uACFC\uAC00 \uC124\uACC4 \uC804\uC81C \u2014 \uC2A4\uD399\uB3C4 \uC120\uD589 \uB4A4\uC5D0",lines:[`\uC120\uD589: ${(Array.isArray(e.blocked_by)?e.blocked_by:[]).join(" \xB7 ")}`,"\uC120\uD589\uC774 \uB2EB\uD788\uBA74 \uC774 \uD45C\uC2DC\uB294 \uC800\uC808\uB85C \uC0AC\uB77C\uC9C4\uB2E4 \u2014 \uB77C\uBCA8\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uB77C\uBCA8 \uC808\uC5D0\uC11C \uB5C0\uB2E4"]};if(t==="readiness"){let n=Td(e);return n?{title:n.title,lines:[]}:null}if(t==="receipt"){let n=Od(e);return n.length===0?null:{title:"\uC2E4\uD589 \uC601\uC218\uC99D \uD68C\uACC4 \uC794\uC5EC \u2014 \uBA38\uC9C0\uB294 \uC9C4\uD589",lines:[...n.map(r=>th[r]||r),"\uC790\uB3D9 \uBA38\uC9C0 \uD310\uC815\uC5D0\uB294 \uC601\uD5A5\uC774 \uC5C6\uB2E4 \u2014 \uC815\uC815\uC740 bd update --set-metadata exec_receipt=\u2026 \uB85C"]}}if(t==="qfr"){let n=e.workflow?e.workflow.quick_fix_review:null;if(!n||n.state!=="reviewed"&&n.state!=="stale")return null;let r=Array.isArray(n.missing)?n.missing:[];return{title:n.state==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",lines:r.length>0?r:["\uBE60\uC9C4 \uD56D\uBAA9 \uC5C6\uC74C"]}}return null}var oh=["rec","receipt","session_preferred","ineligible","qfr","spec_after_blocker","readiness"];function Mi(e,t){for(let n of oh){if(!t(n))continue;let r=fl(e,n);return r?{chip_key:n,content:r}:null}return null}function Ai(e){return e.chip_popover?mo(e.chip_popover.content):""}function vr(e,t){return!!e.chip_popover&&e.chip_popover.chip_key===t}var _l="\uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694";function ml(e,t=null,n={}){let r=e.worker_ineligible===!0,o=e.draggable&&!e.done&&!r,i=e.queue_placeable===!0&&!e.done&&!r,s=i&&t&&t.bead_id===e.id,l=e.session_preferred===!0,a=Ld[e.session_preferred_reason||""]||"",u=e.workflow,d=e.missing_description===!0,f=e.awaiting_user===!0,h=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),g=vr(e,"spec_after_blocker"),k=Zg(e.spec_after_blocker===!0,g),E=Td(e),C=vr(e,"readiness"),te=Jg(E,C),ie=c`${k}${g?Ai(e):""}${te}${C?Ai(e):""}`,z=Oi(e.dependency_chips,k===""&&te===""?"":ie),P=e.workspace_name?c`<span class="worker-card__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",I=Ii(e.cross_lane_chip),q=zr(u),F=Rd(e.from_id),H=!!(e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)),U=!r&&(e.blocked===!0||e.queue_placeable===!1);return c`<div
    class="worker-card${o?"":" worker-card--static"}${r?" worker-card--ineligible":""}${U?" worker-card--blocked":""}${e.search_match===!1?" is-dimmed":""}"
    draggable=${o?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${o?c`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span
      >${Di(e.priority)}
      ${r?c`<button
            type="button"
            class="ctl-chip ctl-chip--label judgement-chip worker-card__ineligible"
            data-chip-key="ineligible"
            aria-expanded=${vr(e,"ineligible")?"true":"false"}
            title="worker-ineligible label이 붙어 워커 실행 대상이 아닙니다"
          >
            worker-ineligible
          </button>`:l?c`<button
              type="button"
              class="ctl-chip ctl-chip--label judgement-chip worker-card__session-preferred"
              data-chip-key="session_preferred"
              aria-expanded=${vr(e,"session_preferred")?"true":"false"}
              title=${a}
            >
              세션 권장
            </button>`:""}${Li(e.rec,vr(e,"rec"))}${eh(u,vr(e,"qfr"))}
      ${g||C?"":Ai(e)}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${u?ri(u,e.status,{onOpenDoc:n.onOpenDoc}):""}${z}
    ${P||I||q||F||H?c`<div class="worker-chips">
          ${P}${I}${q}${F}${Wr(e.exec_chips,{pin:n.exec_chips_mode==="pinned_only"})}
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
                  class="worker-card__reason${h?" worker-card__reason--danger":""}"
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
              title=${Br({placeable:i,route_ok:e.route_ok,worker_ineligible:r,awaiting_user:f,missing_description:d,spec:e.placement_spec})}
            >
              ↴ 대기로
            </button>`}
    </div>
    ${wo(e)}
  </div>`}function Yn(e){let t=!!e.collapsible&&!!e.collapsed,n=typeof e.count=="number"?e.count:e.items.length,r=c`<span
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
                  </div>`:e.items.map(o=>e.lane==="candidate"?ml(o,e.place_menu,{onOpenDoc:e.onOpenDoc}):qn(o))}
          </div>`}
  </section>`}function yd(e,t,n){return c`<button
      type="button"
      class="worker-wait__area-toggle"
      data-area=${e}
      aria-expanded=${n?"false":"true"}
      aria-label=${`${t} ${n?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
    >
      ${n?"\u25B8":"\u25BE"}
    </button>
    <span class="worker-wait__area-name">${t}</span>`}function qi(e){let t=e.parallel,n=e.serial,r=t.drop||{};return c`<div class="worker-wait">
    <section
      class="worker-wait__area worker-wait__area--parallel${t.collapsed?" is-collapsed":""}"
      data-area="parallel"
    >
      <header class="worker-wait__area-hd">
        ${yd("parallel","\uBCD1\uB82C \uC601\uC5ED",t.collapsed)}
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
        ${yd("serial","\uC9C1\uB82C \uC601\uC5ED",n.collapsed)}
        ${n.header_control?n.header_control:""}
      </header>
      ${n.collapsed?"":c`<div class="worker-wait__area-body">
            ${n.notice?n.notice:""}
            ${n.extra_panes?n.extra_panes:""}
            ${n.lanes.map(o=>sh(o))}
          </div>`}
    </section>
  </div>`}function sh(e){let t=e.drop||{},n=e.badge?c`<span
        class="worker-lane__badge${e.held?" worker-lane__badge--held":""}"
        >${e.badge}</span
      >`:"";return c`<div
    class="worker-wait__lane${e.empty?" worker-wait__lane--empty":""}"
  >
    ${Yn({id:typeof e.pane_id=="string"?e.pane_id:`worker-pane-lane-${e.id}`,lane:e.id,title:e.title,items:[],count:e.count,match_count:e.match_count,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:c`${n}${e.header_control?e.header_control:""}`,body:c`<div
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
  </div>`}function Ni(e){return e.count?c`<section
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
  </section>`:""}var Pd=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],is=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"post_merge_jobs",label:"\uBA38\uC9C0 \uD6C4 \uC7A1"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function ji(e,t){let n=Pd.find(o=>o.step===e);if(!n)return null;let r=Pd.length;return{step:n.step,label:t,index:n.index,total:r,percent:Math.round(n.index/r*100)}}function Md(e){let t=is.findIndex(n=>n.step===e);return is.map((n,r)=>({step:n.step,label:n.label,state:t<0?"todo":r<t?"done":r===t?"stall":"todo"}))}function Hr(e){let t=is.find(n=>n.step===e);return t?t.label:typeof e=="string"?e:""}function ih(e){let t=is.findIndex(n=>n.step===e);return t<0?null:{index:t+1,total:is.length}}function Fi(e){let t=ih(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var hl=new Set(["queued","running","retry_pending"]),qd=new Set(["failed","succeeded"]),ah={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uC2DC\uB3C4 \uB300\uAE30"},as={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},lh={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:as.base_containment,child_sweep:as.child_sweep,branch_cleanup:as.branch_cleanup,parent_close:as.parent_close};function ch(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function uh(e,t,n){return!["verify","deploy"].includes(e.kind)||![...hl,...qd].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(r=>r&&typeof r=="object"&&r.bead_id===t&&r.merged_sha===n)}function dh(e,t){let n=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(n!==0)return n;let r=u=>u.state==="succeeded"?1:2,o=r(t)-r(e);if(o!==0)return o;let i=typeof e.requested_at=="number"?e.requested_at:0,s=typeof t.requested_at=="number"?t.requested_at:0;if(i!==s)return s-i;let l=typeof e.operation_id=="string"?e.operation_id:"",a=typeof t.operation_id=="string"?t.operation_id:"";return l.localeCompare(a)}function gl(e,t=!1){let n=e.kind,r=n==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",o=t?"failed":e.state,i=ah[o];if(!i)return null;let s=ji(n,`${r} ${i}`);return s?{...s,active:hl.has(o),failed:o==="failed"}:null}function ph(e){return!e||typeof e!="object"?null:lh[e.step]||null}function ls(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,n=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},r=ph(n),o=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,i=["post_merge_jobs","child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),s=!i&&(e.cleanup_cursor==="repo_operations"||n.step==="repo_operations"),l=ch(e.merge_sha)?e.merge_sha:null,a=!i&&l&&Array.isArray(e.repo_operations)?e.repo_operations.filter(k=>k&&typeof k=="object"&&uh(k,t,l)).sort(dh):[],u=s?a:[],d=u.find(k=>hl.has(k.state));if(d)return gl(d);if(o)return o.step==="repo_operations"&&a[0]?gl(a[0],!0):null;let f=u.find(k=>qd.has(k.state)?k.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(f)return gl(f);if(r){let k=ji(r.step,r.label);return k?{...k,active:!0,failed:!1}:null}let h=typeof e.cleanup_cursor=="string"?as[e.cleanup_cursor]:null;if(!h)return null;let g=ji(h.step,h.label);return g?{...g,active:!0,failed:!1}:null}function Bi(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var fh="\uBBF8\uC801\uC7AC";function bl(e,t){let n=er(e,t.id);return{id:t.id,label:`\u26D3 ${t.id}`,title:`\uC120\uD589 \u2014 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4 (${t.location_label})`,...n?{foreign:!0}:{}}}var _h=10080*60*1e3;function Nd(e,t,n){let r=t.closed_at;if(typeof r!="number"||!Number.isFinite(r)||r<n-_h)return null;let o=er(e,t.id),i=typeof t.root_dir=="string"?t.root_dir:"",s={id:t.id,label:`\u{1F513} ${t.id}`,title:`\uD574\uC81C \u2014 ${sn(r)}\uC5D0 close\uB418\uC5B4 \uC774 \uC774\uC288\uAC00 \uD480\uB838\uB2E4`,...o?{foreign:!0}:{}};return o?i.length>0&&(s.openable=!0,s.root_dir=i):s.openable=!0,s}function jd(e,t){let n=Array.isArray(t.ids)?t.ids.filter(i=>typeof i=="string"&&i.length>0):[],r=t.root_dirs&&typeof t.root_dirs=="object"?t.root_dirs:{},o=[];for(let i of[...new Set(n)].sort()){let s=er(e,i),l=typeof r[i]=="string"?r[i]:"",a={id:i,label:`\u2192 ${i}`,title:"\uD6C4\uC18D \u2014 \uC774 \uC774\uC288\uAC00 close\uB418\uBA74 \uD480\uB9B0\uB2E4",...s?{foreign:!0}:{}};l.length>0?(a.openable=!0,a.root_dir=l):s||(a.openable=!0),o.push(a)}return o}function Fd(e,t,n={}){let r=new Map,o=new Map;for(let i of t)o.has(i.id)||o.set(i.id,i.location_label);for(let[i,s]of e){if(typeof i!="string"||i.length===0)continue;let l=[];for(let a of Array.isArray(s)?s:[]){if(typeof a!="string"||a.length===0)continue;let u=bl(i,{id:a,location_label:o.get(a)||fh}),d=n[a];u.foreign!==!0?u.openable=!0:typeof d=="string"&&d.length>0&&(u.openable=!0,u.root_dir=d),l.push(u)}l.length>0&&r.set(i,l)}return r}var Wi=1,Dd=2e4,cs=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],us=[{value:"all",label:"\uC804\uCCB4"},{value:"ready",label:"\uCC29\uC218 \uAC00\uB2A5"},{value:"not_ready",label:"\uC900\uBE44 \uD544\uC694"}],ds=[{value:"quick_fix",label:"quick_fix"},{value:"spec_backed",label:"spec_backed"},{value:"full_plan",label:"full_plan"},{value:"unset",label:"unset"}];function Kr(e){if(!Array.isArray(e))return[];let t=new Set(ds.map(r=>r.value)),n=[];for(let r of e)typeof r=="string"&&t.has(r)&&!n.includes(r)&&n.push(r);return n}function zi(e,t){let n=Kr(e);return n.includes(t)?n.filter(r=>r!==t):Kr([...n,t])}var xo={show_blocked:!0,readiness:"all",routes:[]},Bd={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328",refuted:"\uBC18\uC99D",no_delta:"\uBB34-delta"};function mh(e,t){let n=null;for(let r of Object.values(e||{}))!r||r.bead_id!==t||!or(r)||(n=typeof r.status=="string"?r.status:null);return n}function gh(e,t){let n=null,r=-1/0;for(let o of Object.values(e)){if(!o||o.bead_id!==t||o.status==="running"||!or(o))continue;let i=typeof o.finished_at=="number"?o.finished_at:typeof o.started_at=="number"?o.started_at:0;i>=r&&(r=i,n=o)}return n}function hd(e){let t=Xe(e),n=new Map;for(let r of Array.isArray(t.done)?t.done:[])r&&typeof r.bead_id=="string"&&typeof r.added_at=="number"&&n.set(r.bead_id,r.added_at);return new Set(Yd(Xe(t.attempts),n).keys())}function Yd(e,t,n={}){let{winners:r,resumed_from_ids:o}=Fu(e,t),i=new Map;for(let[s,l]of r){let a=l.attempt,u=l.run_state;if(Qd(a))continue;let d=l.started_at,f=typeof a.session_id=="string"&&a.session_id.length>0,g=vi(a.quickfix_landing)==="session",k=u!=="running"&&(f||!g)&&!o.has(a.attempt_id),E=!f&&g?"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":o.has(a.attempt_id)?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null,C=Xe(n.observations?.[s]),te=Xe(C.pr),ie=typeof a.merge_sha=="string"&&a.merge_sha.length>0||te.state==="MERGED",z=sr(n.discard_operations,s,{attempt_id:a.attempt_id,merged:ie}),P=u==="failed"?Wd(a,{resume_eligible:k,resume_reason:E,confirmation:z.confirmation,history:n.bead_timelines?.[s]}):null;i.set(s,{...Ud(a,e,u),started_at:d,...P?{failure:P}:{},can_pause:u==="running"&&f,can_resume:k})}for(let[s,l]of xh(e,t)){if(i.has(s))continue;let a=l.attempt,u=sr(n.discard_operations,s,{attempt_id:a.attempt_id}),d=Xd(a),f=l.run_state==="provider_hold"?wh(a,{provider_hold:n.provider_hold,auto_resume_pending:n.auto_resume_pending,account_catalog:n.account_catalog,attempts:e,history:n.bead_timelines?.[s]}):null;i.set(s,{...Ud(a,e,l.run_state),started_at:typeof a.started_at=="number"?a.started_at:null,...l.run_state==="parked"?{failure:Wd(a,{resume_eligible:!1,resume_reason:"\uC138\uC158 \uB300\uAE30 \u2014 [\uC138\uC158\uC5D0\uC11C \uD574\uACB0]\uB85C \uBB38\uC758\uB97C \uC774\uC5B4\uAC11\uB2C8\uB2E4",confirmation:u.confirmation,history:n.bead_timelines?.[s]})}:{},...l.run_state==="waiting"?{wait:hh(a)}:{},...f?{hold:f}:{},...d?{retry:d}:{},can_pause:!1,can_resume:l.run_state==="provider_hold"})}return i}function Ud(e,t,n){return{attempt_id:typeof e.attempt_id=="string"?e.attempt_id:"",run_state:n,last_event_at:typeof e.last_event_at=="number"?e.last_event_at:null,last_activity:e.last_activity&&typeof e.last_activity=="object"?e.last_activity:null,legs:Array.isArray(e.legs)?e.legs:[],runner:typeof e.runner=="string"?e.runner:null,model:typeof e.model=="string"?e.model:null,effort:typeof e.effort=="string"?e.effort:null,speed:typeof e.speed=="string"?e.speed:null,resumed_from:typeof e.resumed_from=="string"?e.resumed_from:null,continuation_mode:e.continuation_mode==="session"||e.continuation_mode==="fresh"?e.continuation_mode:null,status:typeof e.status=="string"?e.status:null,usage:rr(t,e.bead_id)}}function Wd(e,t){let n=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null;return{cause:typeof e.cause=="string"?e.cause:null,cause_detail:n,summary:n&&typeof n.summary=="string"?n.summary:null,bead_id:typeof e.bead_id=="string"?e.bead_id:"",finished_at:typeof e.finished_at=="number"?e.finished_at:null,runner:typeof e.runner=="string"?e.runner:null,model:typeof e.model=="string"?e.model:null,effort:typeof e.effort=="string"?e.effort:null,observed_effort:typeof e.observed_effort=="string"?e.observed_effort:null,speed:typeof e.speed=="string"?e.speed:null,attempt_id:typeof e.attempt_id=="string"?e.attempt_id:"",usage:e.usage&&typeof e.usage=="object"?e.usage:null,halted_auto_advance:e.halted_auto_advance===!0,quickfix_lane:e.quickfix_lane===!0,quickfix_landing:e.quickfix_landing&&typeof e.quickfix_landing=="object"?e.quickfix_landing:null,retry:Xd(e),resume_eligible:t.resume_eligible,resume_reason:t.resume_reason,landed:Sd(e),confirmation:t.confirmation,...Vd(t.history)}}function Vd(e){if(!e||typeof e!="object")return{};let t=Array.isArray(e.events)?e.events:[],n=[];for(let o of t)!o||typeof o!="object"||typeof o.summary!="string"||o.summary.length===0||n.push({event_id:typeof o.event_id=="string"?o.event_id:"",kind:typeof o.kind=="string"?o.kind:"",summary:o.summary,at:typeof o.at=="number"?o.at:null});n.reverse();let r=typeof e.log_path=="string"&&e.log_path.length>0?e.log_path:null;return{...n.length>0?{timeline:n}:{},...r===null?{}:{log_path:r},...e.log_expired===!0?{log_expired:!0}:{},...e.log_unreadable===!0?{log_unreadable:!0}:{}}}function hh(e){let t=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null,n=Array.isArray(t?.blockers)?t.blockers:[],r=[];for(let o of n)!o||typeof o!="object"||typeof o.id!="string"||o.id.length===0||r.push({id:o.id,rig:typeof o.rig=="string"?o.rig:null,status:typeof o.status=="string"?o.status:""});return{summary:t&&typeof t.summary=="string"?t.summary:null,blockers:r,since:typeof e.finished_at=="number"?e.finished_at:null}}function Qd(e){return e?.status==="paused"&&typeof e.cause=="string"&&e.cause.startsWith("provider_outage:")}function bh(e,t){let n=typeof e.runner=="string"?e.runner:"",r=Xe(t)[n];return!r||!Array.isArray(r.targets)?null:r.targets.find(o=>Array.isArray(o?.attempt_ids)&&o.attempt_ids.includes(e.attempt_id))||null}function yh(e,t){if(e===null)return null;let n=Xe(t).claude;if(!Array.isArray(n))return null;let r=n.find(o=>o?.email===e);return r&&typeof r.alias=="string"&&r.alias.length>0?r.alias:null}function vh(e,t){let n=e,r=new Set;for(;n&&!r.has(n.attempt_id);){if(r.add(n.attempt_id),n.auto_resume_kind==="provider_outage")return!0;n=typeof n.resumed_from=="string"?t[n.resumed_from]:null}return!1}function kh(e,t,n,r){if((Array.isArray(r.auto_resume_pending)?r.auto_resume_pending:[]).some(s=>s?.attempt_id===e.attempt_id))return"pending";let i=e.auto_resume_refused;return typeof i=="string"&&i.length>0?`refused:${i}`:n.startsWith("auto_resume_disarmed:")||t?.auto_switch==="cap"||vh(e,r.attempts)?"disarmed":null}function wh(e,t){let n=e.cause.slice(16),r=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null,o=bh(e,t.provider_hold),i=typeof o?.model=="string"&&o.model.length>0?o.model:typeof e.model=="string"&&e.model.length>0?e.model:null,s=typeof o?.account=="string"&&o.account.length>0?o.account:typeof e.claude_account=="string"&&e.claude_account.length>0?e.claude_account:null,l=typeof o?.last_error=="string"?o.last_error:"",a=kh(e,o,l,{auto_resume_pending:t.auto_resume_pending,attempts:t.attempts}),u=typeof o?.resets_at=="number"?o.resets_at:typeof r?.resets_at=="number"?r.resets_at:null,d=typeof o?.next_probe_at=="number"?o.next_probe_at:null,f=yh(s,t.account_catalog),h=Vd(t.history);return{kind:o?.kind==="usage_limit"||n==="usage_limit"?"usage_limit":"outage",detail:n,...typeof r?.message=="string"?{message:r.message}:{},...typeof r?.summary=="string"?{summary:r.summary}:{},...i||s?{target:{...i?{model:i}:{},...s?{account:s}:{},...f?{account_alias:f}:{}}}:{},...u===null?{}:{resets_at:u},...a===null?{}:{auto_resume:a},...o?.auto_switch==="none"||o?.auto_switch==="disabled"?{auto_switch:o.auto_switch}:{},...d===null?{}:{next_probe_at:d},...h.log_path?{log_path:h.log_path}:{}}}function Xd(e){let t=e&&e.retry&&typeof e.retry=="object"?e.retry:null;return t?{cause:typeof t.cause=="string"?t.cause:null,attempts:typeof t.attempts=="number"?t.attempts:0,max:typeof t.max=="number"?t.max:0,next_at:typeof t.next_at=="number"?t.next_at:null}:null}var $h=new Set(["parked","retry_wait","waiting"]);function xh(e,t){let n=Object.values(e||{}),r=new Set(n.map(s=>s?.resumed_from).filter(s=>typeof s=="string")),o=new Map;for(let s of n)s&&typeof s.bead_id=="string"&&or(s)&&o.set(s.bead_id,s.attempt_id);let i=new Map;for(let s of n){let l=Qd(s);if(!s||typeof s.bead_id!="string"||s.bead_id.length===0||!or(s)||!$h.has(s.status)&&!l||o.get(s.bead_id)!==s.attempt_id||typeof s.dismissed_at=="number"||l&&r.has(s.attempt_id))continue;let a=t.get(s.bead_id);typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at||i.set(s.bead_id,{attempt:s,run_state:l?"provider_hold":s.status})}return i}function zd(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"";if(r==="grace_period")return"";if(r==="prerequisite_unmet"&&Array.isArray(n.blockers)&&n.blockers.length>0)return"\u26D3 \uC120\uD589 \uB300\uAE30";let o=r.indexOf(":");return o>0&&o<r.length-1?`\u26D4 ${r.slice(0,o)} (${r.slice(o+1)})`:`\u26D4 ${r}`}function Xe(e){return e&&typeof e=="object"?e:{}}function Ah(e){let t=Xe(e).badge_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function Sh(e,t,n){let r=Xe(t);if(Object.keys(r).length===0)return null;let o=e.execution_defaults,i=e.runner_catalog,s=e.session_defaults;if(!o||!i||!s)return null;let l=h=>Cn({pin:h,global:s,execution_defaults:o,runner_catalog:i,route:n}),a,u;try{a=l(r),u=l(null)}catch{return null}let d=Hd(vo(a,i),vo(u,i)),f=Hd(jr(a,null),jr(u,null));return d||f?{orchestration:d,worker:f}:null}function Hd(e,t){return!e||t&&t.text===e.text?null:e}function Eh(e,t,n){let o=(t&&typeof t=="object"&&Array.isArray(t.released_by)?t.released_by:[]).filter(s=>s&&typeof s=="object"&&typeof s.id=="string").slice().sort((s,l)=>(typeof l.closed_at=="number"?l.closed_at:0)-(typeof s.closed_at=="number"?s.closed_at:0)),i=[];for(let s of o){let l=Nd(e,s,n);l&&i.push(l)}return i.length===0?null:i}function kl(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}var Th=new Set(["quick_fix","spec_backed","full_plan"]);function Kd(e){return typeof e=="string"&&Th.has(e)}function Ch(e){let t={...Xe(e.session_defaults)};for(let n of["orchestration_model","orchestration_effort","orchestration_speed","quick_fix_orchestration_model","quick_fix_orchestration_effort","quick_fix_orchestration_speed"]){let r=e[n];typeof r=="string"&&(t[n]=r)}return t}function Rh(e,t,n){let r=e.runner_catalog??null,o=vl(e,t,n,null);if(!o)return null;let i=Mn(r,o.orchestration_model.value??""),s=i===null?o:vl(e,t,n,i)||o,l=vo(s,r),a=jr(s,i);return l||a?{orchestration:l,worker:a}:null}function vl(e,t,n,r){let o=Kd(n)?n:Kd(t.route)?t.route:null;try{return Cn({pin:t,global:Ch(e),execution_defaults:e.execution_defaults??null,runner_catalog:e.runner_catalog??null,route:o,controller_runtime:r})}catch{return null}}function Zd(e,t,n){return!t||!Object.hasOwn(t,"metadata")?null:jr(vl(e,Xe(t.metadata),t.route,n),n)}function Oh(e,t,n){if(!n)return null;let r=yi(n),o=Zd(e,t,typeof n.runner=="string"?n.runner:null);return r||o?{orchestration:r,worker:o}:null}function Ih(e){let t=Xe(e.workflow),n=Xe(t.chips),r=typeof n.route=="string"&&n.route.length>0?n.route:typeof t.route=="string"&&t.route.length>0?t.route:"",o=n.route_source==="derived"||t.route_source==="derived";return r.length===0||o?"unset":r}function wl(e,t){let n=new Set,r=e;for(;r&&!n.has(r.attempt_id);){if(r.conflict_resolution===!0)return!0;n.add(r.attempt_id),r=typeof r.resumed_from=="string"&&r.resumed_from.length>0&&t.get(r.resumed_from)||null}return!1}function Lh(e){let t={};for(let l of Kn)t[l]=0;let n=!1,r=0,o=0,i=0;for(let l of e){let a=l.usage;if(!a||typeof a!="object")continue;let u=!1;for(let d of Kn)Number.isFinite(a[d])&&(t[d]+=a[d],n=!0,u=!0);u&&(o+=1,Number.isFinite(a.total_cost_usd)&&(r+=a.total_cost_usd,i+=1))}o>0&&i===o&&(t.total_cost_usd=r);let s=e.map(l=>l.usage).filter(l=>l&&typeof l=="object"&&l.providers);return s.length>0?pn(ui(s)):n?nr(t):null}function Jd(e,t){let n=Jo(e,t);return n==="internal"?"\uBBF8\uC801\uC7AC":n==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function Dh(e,t,n){let r=t.get(e);if(!r)return Jd(e,n);if(typeof r.position=="number"){if(r.lane==="parallel")return`#${r.position}`;if(/^s[1-5]$/.test(r.lane))return`${r.lane} #${r.position}`}return Zo(r)}function Ph(e,t,n,r,o,i){let s=t.get(e);if(!s)return{label:i&&Jo(e,n)==="internal"?"\uC9C4\uD589 \uB300\uAE30":Jd(e,n),title:""};if(s.state==="runnable"&&i&&Jo(e,n)==="internal")return{label:"\uC9C4\uD589 \uB300\uAE30",title:""};if(typeof s.position=="number"&&(s.lane==="parallel"||/^s[1-5]$/.test(s.lane))){let a=r.get(e),u=s.lane==="parallel"?"\uBCD1\uB82C":s.lane,d=o.get(e);return{label:!!d&&d.reason==="prerequisite_unmet"&&Array.isArray(d.blockers)&&d.blockers.length>0?"\u26D3 \uC120\uD589 \uB300\uAE30":a&&a.length>0?"\u{1F512} \uB300\uAE30":"\uB300\uAE30",title:`${s.workspace_name||s.root_dir} ${u} #${s.position}`}}return{label:s.state==="running"?"\u25B6 \uC2E4\uD589\uC911":Zo(s),title:""}}function Mh(e,t){for(let n of Object.values(e||{}))if(n&&n.attempt_id===t&&typeof n.armed_by_lane=="string"&&n.armed_by_lane.length>0)return n.armed_by_lane;return null}function qh(e,t,n,r,o,i){return t==="draft"?{state:"draft",badge:"draft",run_label:null,can_stop:!1}:n.some(s=>i.failed_by_bead.get(s.id)===e)?{state:"failed",badge:"\u26D4 \uC2E4\uD328",run_label:"\u25B6 \uB2E4\uC2DC \uC9C4\uD589",can_stop:!1}:i.disarmed_lanes.has(e)?{state:"restart",badge:"\u23F8 \uC7AC\uC2DC\uC791",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}:n.some(s=>i.armed_by_bead.get(s.id)===e)?{state:"running",badge:"\u25B6 \uC9C4\uD589 \uC911",run_label:o.length>0?"\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589":null,can_stop:!0}:r?{state:"all_done",badge:"\uBAA8\uB450 \uC644\uB8CC",run_label:null,can_stop:!1}:{state:"confirmed",badge:"\uD655\uC815",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}}function Nh(e,t,n,r,o,i,s,l,a){let u=[];return e.forEach((d,f)=>{let h=typeof d.id=="string"?d.id:"";if(h.length===0)return;let g=d.status==="confirmed"?"confirmed":"draft",k=Array.isArray(d.entries)?d.entries:[],E=[];k.forEach((z,P)=>{let I=z&&typeof z.bead_id=="string"?z.bead_id:"";if(I.length===0)return;let q=z&&typeof z.root_dir=="string"?z.root_dir:"",F=n.get(I),H=F?F.state:void 0,U=H==="running"||H==="pr_wait"||H==="done",M=!F||H==="runnable",Q=F&&F.lane==="parallel"&&typeof F.position=="number"?F.position-1:null,B=Ph(I,n,r,t,l,g==="confirmed"),ne=E.length>0?E[E.length-1]:null,ge=g==="confirmed"&&ne!==null&&!ne.done&&!(t.get(I)||[]).includes(ne.id),Oe=a.get(I)||null;E.push({id:I,title:o.get(I)||I,route:Oe?Oe.route:null,route_source:Oe?Oe.route_source:null,exec_chips:Oe?Oe.exec_chips:null,added_at:Oe?Oe.added_at:null,root_dir:F?F.root_dir:q,workspace_name:F?F.workspace_name:i.get(q)||"",seq:P+1,location_label:B.label,location_title:B.title,draggable:!U,fixed:U,done:H==="done",unplaced:M,mismatch:ge,...Q!==null?{queue_index:Q}:{}})}),E.forEach((z,P)=>{z.seq=P+1});let C=E.length>0&&E.every(z=>z.done),te=E.filter(z=>!z.fixed&&s.armed_by_bead.get(z.id)!==h).map(z=>z.id),ie=qh(h,g,E,C,te,s);u.push({lane_id:h,status:g,draft:g==="draft",number:f+1,label:`\uC5F0\uACB0 ${f+1} \xB7 \uB808\uD3EC \uAC04`,rows:E,all_done:C,can_confirm:g==="draft"&&E.length>=2,has_mismatch:g==="confirmed"&&E.some(z=>z.mismatch),unlaunched:te,...ie})}),u}function jh(e,t,n){if(e.lane==="runnable"){let s=n.get(e.id);return s?s.length===0?{scope:[],state:"missing"}:{scope:s,state:"declared"}:{scope:[],state:void 0}}let r=t.get(e.root_dir),o=r?r[e.id]:void 0;if(!o||!Array.isArray(o.scope))return{scope:[],state:void 0};let i=o.scope.filter(s=>typeof s=="string"&&s.length>0);return{scope:i,state:i.length===0?"missing":"declared"}}function Fh(e,t,n,r,o){let i=new Map;for(let a of[...e.running,...e.queue,...e.runnable,...e.pr_wait]){if(!t.has(a.root_dir))continue;let u=`${a.root_dir}\0${a.id}`,d=i.get(u);if(d){d.cards.push(a);continue}let{scope:f,state:h}=jh(a,t,n);h!==void 0&&(a.scope_state=h),i.set(u,{cards:[a],scope:f})}let s=new Map;for(let a of i.values()){let u=a.cards[0].scope_state;if(u!==void 0)for(let h of a.cards)h.scope_state=u;if(a.scope.length===0)continue;let d=a.cards[0].root_dir,f=s.get(d);f?f.push(a):s.set(d,[a])}let l=(a,u,d)=>{let f=u.cards[0],h={id:f.id,title:f.title,location_label:Dh(f.id,r,o),prefixes:d,...typeof f.root_dir=="string"&&f.root_dir.length>0?{root_dir:f.root_dir}:{}};for(let g of a.cards)g.overlap_chips?g.overlap_chips.push(h):g.overlap_chips=[h]};for(let a of s.values())for(let u=0;u<a.length;u+=1)for(let d=u+1;d<a.length;d+=1){let f=$i(a[u].scope,a[d].scope);f.length!==0&&(l(a[u],a[d],f),l(a[d],a[u],f))}}function Gd(e,t,n){let r=n?n.get(t)?.root_dir:void 0,o=!er(e.id,t),i=typeof e.root_dir=="string"?e.root_dir:"",s=typeof r=="string"&&r.length>0?r:o&&i.length>0?i:"";return s.length>0?{openable:!0,root_dir:s}:o?{openable:!0}:{}}function Bh(e,t,n,r){let o=new Set(e?e.ids:[]);for(let l of t&&Array.isArray(t.ids)?t.ids:[])typeof l=="string"&&l.length>0&&o.add(l);if(o.size===0)return{ids:[]};let i={},s={...e?e.root_dirs:{},...t&&t.root_dirs&&typeof t.root_dirs=="object"?t.root_dirs:{}};for(let l of o){let a=s[l];if(typeof a=="string"&&a.length>0){i[l]=a;continue}if(!er(n.id,l)){n.root_dir.length>0&&(i[l]=n.root_dir);continue}let u=r.get(l)?.root_dir;typeof u=="string"&&u.length>0&&(i[l]=u)}return{ids:[...o],root_dirs:i}}function yl(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function Ui(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Uh(e){let t=typeof e=="string"?e.trim().toLowerCase():"";return t.length===0?null:n=>{let r=typeof n.id=="string"?n.id.toLowerCase():"",o=typeof n.title=="string"?n.title.toLowerCase():"";return r.includes(t)||o.includes(t)}}function Wh(e,t){let n=[e.runnable,e.runnable_all,e.queue,e.running,e.pr_wait,e.done,e.parallel_rows];for(let o of e.runnable_sections)n.push(o.items);let r=[];for(let o of e.queue_groups){n.push(o.items,o.sublanes.parallel);for(let i of o.sublanes.serial)n.push(i.items),r.push(i.occupants)}for(let o of n)for(let i of o)i.search_match=t(i);for(let o of r)for(let i of o)i.search_match=t(i)}function kr(e,t,n){let r=Array.isArray(e)?e:[],o=Array.isArray(t)?t:[],i=n&&typeof n.done_since=="number"?n.done_since:void 0,s={...xo,...n&&n.candidate_filter?n.candidate_filter:{}},l=n&&Object.hasOwn(n,"cross_lanes")?n.cross_lanes??null:void 0,a=n&&n.candidate_sort==="as_given"?"as_given":n&&cs.some(w=>w.value===n.candidate_sort)?n.candidate_sort:"repo_spec",u=n&&n.groups==="all"?"all":"nonempty",d=n&&n.candidate_hidden_counts==="per_control"?"per_control":"sequential",f=Date.now(),h=new Map;for(let w of o)w&&typeof w.root_dir=="string"&&h.set(w.root_dir,w);let g=new Map;for(let w of o)w&&typeof w.root_dir=="string"&&g.set(w.root_dir,w.name||w.root_dir);for(let w of r)w&&typeof w.root_dir=="string"&&g.set(w.root_dir,w.name||w.root_dir);let k=[],E=[],C=[],te=[],ie=[],z=[],P=new Map,I=new Map,q=new Map,F=new Map,H=new Map,U=new Map,M=new Map,Q=new Map,B=new Map,ne=new Map,ge=new Map,Oe=new Map,K=new Map,re=new Map,pe=new Set,Te=new Map,Y=new Map,ae=new Map;for(let w of r){if(!w||typeof w.root_dir!="string")continue;let se=w.root_dir,Me=w.name||se,Ue=h.get(se),Ze=Ue&&typeof Ue.revision=="number"?Ue.revision:typeof w.revision=="number"?w.revision:0,Pe=Xe(w.attempts),tt=Xe(w.bead_titles);for(let[x,O]of Object.entries(tt))typeof O=="string"&&O.length>0&&ae.set(x,O);let $t=Xe(w.bead_times),qt=Xe(w.pr_observations),Dt=Xe(w.admission);for(let[x,O]of Object.entries(Dt))O&&typeof O=="object"&&ge.set(x,O);let ue=Xe(w.revise_parked),he=Xe(w.merge_queue_state),Ke=Xe(w.cleanup_failed),nt=Xe(w.discard_operations),Je=Xe(w.bead_timelines),ut=Xe(w.bead_blocked_by);Object.hasOwn(w,"bead_scope")&&Te.set(se,Xe(w.bead_scope));let ft=Xe(w.bead_workflow),ot=Xe(w.pr_activity),Ne=Array.isArray(w.repo_operations)?w.repo_operations:[];Q.set(se,Ne);let A=typeof w.declared_base=="string"?w.declared_base:null;M.set(se,A),U.set(se,Object.entries(Ke).map(([x,O])=>({bead_id:x,step:O&&O.step?O.step:"",reason:O&&O.reason?O.reason:"",at:O&&typeof O.at=="number"?O.at:null,detail:O&&typeof O.detail=="string"?O.detail:null,output_tail:O&&typeof O.output_tail=="string"&&O.output_tail?O.output_tail:void 0,log_path:O&&typeof O.log_path=="string"&&O.log_path?O.log_path:void 0,retry_count:O&&typeof O.retry_count=="number"&&Number.isInteger(O.retry_count)&&O.retry_count>0?O.retry_count:0,failure_code:O&&typeof O.failure_code=="string"?O.failure_code:void 0})));for(let[x,O]of Object.entries(Xe(w.bead_overlay)))O&&typeof O=="object"&&B.set(`${se}\0${x}`,O);let j=new Map;for(let x of Object.values(Pe))x&&typeof x.attempt_id=="string"&&j.set(x.attempt_id,x);let W=Array.isArray(w.merge_queue)?w.merge_queue:[],$e=new Set(W.filter(x=>x&&typeof x.bead_id=="string").map(x=>x.bead_id)),we=new Map(W.filter(x=>x&&typeof x.bead_id=="string").map(x=>[x.bead_id,x])),_t=new Map,kt=new Map,vt=new Map,Tt=new Map;W.forEach((x,O)=>{x&&typeof x.bead_id=="string"&&(_t.set(x.bead_id,O+1),kt.set(x.bead_id,x.resolution),vt.set(x.bead_id,x.continuation_action||null),Tt.set(x.bead_id,x.authority||null))});let Wt=Xe(w.auto_merge_skips),Ht=x=>{let O=Wt[x];if(!O)return null;let Ce=Xe(Xe(qt[x]).pr).head_sha;return Ce&&Ce===O.head_sha?O.reason||"":null};H.set(se,{positions:_t,resolutions:kt,continuations:vt,authorities:Tt,state:{active:typeof he.active=="string"?he.active:null,failures:Xe(he.failures),waiting:he.waiting&&typeof he.waiting.bead_id=="string"&&typeof he.waiting.reason=="string"?he.waiting:null},auto_excluded:(Array.isArray(w.pr_wait)?w.pr_wait:[]).map(x=>x&&x.bead_id).filter(x=>typeof x=="string"&&Ht(x)!==null),running:W.length>0});let Nt=Array.isArray(w.queue)?w.queue:[];for(let x of[...Nt,...Array.isArray(w.pr_wait)?w.pr_wait:[]])x&&typeof x.bead_id=="string"&&typeof x.armed_by_lane=="string"&&x.armed_by_lane.length>0&&K.set(x.bead_id,x.armed_by_lane);for(let x of Array.isArray(w.disarmed_on_load)?w.disarmed_on_load:[])typeof x=="string"&&x.length>0&&pe.add(x);let wt=(Array.isArray(w.serial_lanes)?w.serial_lanes:[]).filter(x=>x&&/^s[1-5]$/.test(x.id)&&Array.isArray(x.entries)),Jt=Xe(w.lane_states),Kt=typeof w.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(w.serial_lane_count))):Math.min(5,wt.length);q.set(se,Kt),F.set(se,Nt.length);let jt=new Map(wt.map(x=>[x.id,x])),Ft=new Map;for(let x of wt)for(let O of x.entries)O&&typeof O.bead_id=="string"&&Ft.set(O.bead_id,x.id);for(let[x,O]of Object.entries(Xe(w.bead_dependents))){let Ce=Array.isArray(O?.ids)?O.ids:[],m=Xe(O?.root_dirs),_=Oe.get(x)||{ids:new Set,root_dirs:{}};for(let T of Ce)typeof T=="string"&&T.length>0&&_.ids.add(T);for(let[T,p]of Object.entries(m))typeof p=="string"&&p.length>0&&(_.root_dirs[T]=p);Oe.set(x,_)}for(let[x,O]of Object.entries(ut))Array.isArray(O)&&ne.set(x,O.filter(Ce=>typeof Ce=="string"&&Ce.length>0));let Qt=Array.isArray(w.done)?w.done:[];for(let x of Qt)x&&typeof x.bead_id=="string"&&z.push({id:x.bead_id,root_dir:se,workspace_name:Me});let Ae=new Map;for(let x of Qt)x&&typeof x.bead_id=="string"&&typeof x.added_at=="number"&&Ae.set(x.bead_id,x.added_at);let S=x=>({id:x,title:tt[x]||x,root_dir:se,workspace_name:Me,expected_revision:Ze,draggable:!1,...Xe($t[x]).created_at?{created_at:Xe($t[x]).created_at}:{},...Xe($t[x]).updated_at?{updated_at:Xe($t[x]).updated_at}:{}}),ve=x=>{let O=ft[x]?.chips?.pr;return O&&typeof O.number=="number"&&typeof O.url=="string"?{pr_number:O.number,pr_url:O.url}:{}},De=x=>Object.hasOwn(ut,x)?{blocked_by:Array.isArray(ut[x])?ut[x].filter(O=>typeof O=="string"&&O.length>0):[]}:{},bt=(x,O)=>{let Ce=De(x),m=Dt[x],_=m&&m.reason==="prerequisite_unmet"&&Array.isArray(m.blockers)?m.blockers:[],T=[...(O?.blockers||[]).map(b=>b.id),..._.map(b=>b.id)].filter(b=>typeof b=="string"&&b.length>0);if(T.length===0)return Ce;let p=[...Ce.blocked_by||[]];for(let b of T)p.includes(b)||p.push(b);return{blocked_by:p}},je=new Set;for(let[x,O]of Yd(Pe,Ae,{discard_operations:nt,observations:qt,bead_timelines:Je,provider_hold:Xe(w.provider_hold),auto_resume_pending:Array.isArray(w.auto_resume_pending)?w.auto_resume_pending:[],account_catalog:Xe(w.account_catalog)})){je.add(x);let Ce=O.run_state==="failed"?Mh(Pe,O.attempt_id):null;Ce!==null&&re.set(x,Ce);let m=j.get(O.attempt_id)||null,_=B.get(`${se}\0${x}`),T=_&&_.rollup?_.rollup:null,p=kl(A,m?m.target_base:null),b=m?wl(m,j):!1,D=m&&m.quickfix_lane===!0&&m.quickfix_landing&&typeof m.quickfix_landing=="object"?m.quickfix_landing:null,X=D&&typeof D.reason=="string"&&D.reason.length>0?D.reason:null,fe=D?ls({bead_id:x,merge_sha:D.head_sha,cleanup_cursor:D.cursor,cleanup_failed:X?{step:D.cursor,reason:X}:null,repo_operations:Ne}):null;E.push({...S(x),lane:"running",...bt(x,O.wait),...Ft.has(x)?{serial_lane_id:Ft.get(x)}:{},attempt_id:O.attempt_id,run_state:O.run_state,status:O.status||void 0,workflow:ft[x]||null,can_pause:O.can_pause,can_resume:O.can_resume,started_at:O.started_at,last_event_at:O.last_event_at,last_activity:O.last_activity,legs:O.legs,runner:O.runner,model:O.model,effort:O.effort,speed:O.speed,resumed_from:O.resumed_from,continuation_mode:O.continuation_mode,usage:O.usage,failure:O.failure||null,hold:O.hold||null,wait:O.wait||null,retry:O.retry||null,exec_chips:{orchestration:yi(O),worker:Zd(Xe(Ue),_,O.runner||null)},discard:sr(nt,x,{attempt_id:O.attempt_id,merged:O.failure?.confirmation==="merged"||Xe(qt[x]).pr?.state==="MERGED"}),...T?{rollup:T}:{},...b?{conflict_resolution:!0}:{},...p?{base_exception:p}:{},...fe?{landing:fe}:{},badges:O.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:O.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:O.run_state==="parked"?["\u23F8 \uC138\uC158 \uB300\uAE30"]:O.run_state==="retry_wait"?["\u21BB \uC7AC\uC2DC\uB3C4 \uB300\uAE30"]:O.run_state==="waiting"?["\u26D3 \uC120\uD589 \uB300\uAE30"]:O.run_state==="provider_hold"?["\uACF5\uAE09\uC790 \uBCF4\uB958"]:[],alert:O.run_state==="failed"})}for(let[x,O]of ju(Pe)){if(E.some(m=>m.id===x))continue;let Ce=O.attempt;E.push({...S(x),lane:"running",kind:"session",...De(x),attempt_id:typeof Ce.attempt_id=="string"?Ce.attempt_id:"",run_state:"running",status:"running",non_occupying:!0,workflow:ft[x]||null,can_pause:!1,can_resume:!1,started_at:O.started_at,last_event_at:typeof Ce.last_event_at=="number"?Ce.last_event_at:null,last_activity:Ce.last_activity&&typeof Ce.last_activity=="object"?Ce.last_activity:null,legs:Array.isArray(Ce.legs)?Ce.legs:[],runner:typeof Ce.runner=="string"?Ce.runner:null,model:typeof Ce.model=="string"?Ce.model:null,effort:typeof Ce.effort=="string"?Ce.effort:null,speed:typeof Ce.speed=="string"?Ce.speed:null,resumed_from:null,continuation_mode:null,usage:Ce.usage&&typeof Ce.usage=="object"?Ce.usage:null,exec_chips:{orchestration:yi(Ce),worker:null},discard:sr(nt,x,{merge_queued:!0}),badges:[O.origin==="auto"?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"],alert:!1})}for(let x of Array.isArray(w.session_active)?w.session_active:[]){let O=x&&x.bead_id;typeof O!="string"||je.has(O)||(je.add(O),Array.isArray(x.blocked_by)&&x.blocked_by.length>0&&ne.set(O,x.blocked_by.filter(Ce=>typeof Ce=="string"&&Ce.length>0)),typeof x.title=="string"&&x.title.length>0&&ae.set(O,x.title),E.push({...S(O),title:x.title||tt[O]||O,lane:"running",kind:"session",status:"in_progress",started_at:yl(x.started_at)??yl(x.updated_at)??void 0,updated_at:yl(x.updated_at)??void 0,workflow:x.workflow||null,labels:Array.isArray(x.labels)?x.labels:[],spec_id:typeof x.spec_id=="string"?x.spec_id:"",blocked:x.blocked===!0,...Array.isArray(x.blocked_by)?{blocked_by:x.blocked_by.filter(Ce=>typeof Ce=="string"&&Ce.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,session_refs:Array.isArray(x.session_refs)?x.session_refs:[],badges:[],alert:!1}))}for(let x of Array.isArray(w.pr_wait)?w.pr_wait:[]){let O=x&&x.bead_id;if(typeof O!="string"||je.has(O))continue;je.add(O);let Ce=Xe(qt[O]),m=Xe(Ce.pr),_=Ce.gate?Xe(Ce.gate):null,T=$e.has(O),p=we.get(O)?.continuation_action||null,b=!!p&&p.continuation===null,D=he.active===O,X=x.external===!0,fe=Ke[O]||null,st=Xe(ot[O]),xt=ls({bead_id:O,merge_sha:x.merge_sha,cleanup_cursor:x.cleanup_cursor,merge_progress:st.merge_progress||null,cleanup_failed:fe,repo_operations:Ne}),_n=Bi(xt),hn=!!_&&_.base_badge==="\uCDA9\uB3CC",ln=!!fe&&["post_merge_jobs","child_sweep","branch_cleanup","parent_close"].includes(fe.step)&&!!_&&_.tier==="merged",Yt=X&&!!fe&&!!_&&_.tier==="merged",cn=!!_&&["closed_unmerged","review","undecidable"].includes(_.tier),en=sr(nt,O,{external:X,merge_active:D||xt?.step==="merge",merge_queued:T,cleanup_active:_n,merged:!!fe||_?.tier==="merged"}),Zr=!!en.operation,Tr=Ah(Ce.receipt_check);C.push({...S(O),lane:"pr_wait",...De(O),...Tr.length>0?{receipt_badge:{codes:Tr}}:{},workflow:ft[O]||null,pr_number:typeof m.number=="number"?m.number:null,pr_url:typeof m.url=="string"?m.url:void 0,external:X,usage:rr(Pe,O),merge_step:xt,badges:b?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:xt?[_?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:fe?[Hr(fe.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Hr(fe.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof _?.gate_badge=="string"&&_.gate_badge.length>0?[_.gate_badge]:[],alert:xt?xt.failed===!0:!!fe||cn,reason:fe&&xt?.active!==!0?Fi(fe.step):"PR \uB300\uAE30",merge_action:_?.tier==="merged"&&!ln&&!Yt?!1:!T||b,merge_enabled:!Zr&&(b||_?.enabled===!0||hn||ln||Yt),merge_label:b?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Yt||ln?"\uC815\uB9AC \uC7AC\uC2DC\uB3C4":hn&&!ln?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:b?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Zr?en.error?`\uD3D0\uAE30 \uC2E4\uD328: ${en.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${en.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Yt?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":ln?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":hn?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":_?.enabled===!0?`\uBA38\uC9C0 (${_.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${_?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:T&&!b,cancel_enabled:!D,continuation_mismatch:p?.mismatch||null,discard:en,discard_action:en.action,discard_enabled:en.enabled,discard_title:en.title})}let Et=(x,O,Ce,m)=>{let _=x&&x.bead_id;if(typeof _!="string"||je.has(_))return null;je.add(_);let T=ue[_],p=sr(nt,_),b=p.operation?p:null,D={...S(_),lane:O,...typeof x.added_at=="number"?{added_at:x.added_at}:{},workflow:ft[_]||null,draggable:!b,discard:b||void 0,reason:zd(Dt,_),seq:Ce+1,queue_position:Ce+1,queue_index:Ce,queue_length:m,badges:T?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!T,revise_action:!!T,revise_enabled:!!T&&!b,revise_title:T?T.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${T.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""},X=bt(_,null);return Object.hasOwn(X,"blocked_by")&&(D.blocked_by=X.blocked_by),D};for(let x=0;x<Nt.length;x++){let O=Et(Nt[x],"queue",x,Nt.length);if(!O)continue;te.push(O);let Ce=P.get(se);Ce?Ce.push(O):P.set(se,[O])}let It=x=>{let O=C.find(T=>T.id===x&&T.root_dir===se);if(O)return{id:x,title:O.title,badge:"PR \uB300\uAE30 \xB7 \uC810\uC720"};let Ce=E.find(T=>T.id===x&&T.root_dir===se),m=Ce?Ce.run_state:mh(Pe,x),_=m==="failed"||m==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":m==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720";return{id:x,title:Ce?Ce.title:S(x).title,badge:_}},Gt=[];for(let x=0;x<Math.max(Kt,wt.length);x++){let O=`s${x+1}`,Ce=jt.get(O),m=Ce&&Array.isArray(Ce.entries)?Ce.entries:[],_=Xe(Jt[O]),T=Array.isArray(_.occupied_by)?_.occupied_by.filter(D=>typeof D=="string"):[],p=new Set(T),b=[];for(let D=0;D<m.length;D++){let X=m[D]&&m[D].bead_id;if(typeof X=="string"&&p.has(X)){je.add(X);continue}let fe=Et(m[D],O,D,m.length);fe&&(b.push(fe),te.push(fe))}b.length===0&&T.length===0&&(Kt<=1||x>=Kt)||Gt.push({id:O,index:x,items:b,raw_length:m.length,occupied_by:T,occupants:T.map(D=>It(D)),corrections:Array.isArray(_.corrections)?_.corrections.length:0,cycle:_.cycle===!0,...b.length===0&&T.length===0?{empty:!0}:{}})}I.set(se,Gt);let Xt=Array.from({length:Kt},(x,O)=>{let Ce=`s${O+1}`,m=jt.get(Ce),_=m&&Array.isArray(m.entries)?m.entries:[],T=Xe(Jt[Ce]);return{id:Ce,index:_.length,length:_.length,occupied_by:Array.isArray(T.occupied_by)?T.occupied_by.filter(p=>typeof p=="string"):[]}});for(let x of Array.isArray(w.runnable)?w.runnable:[]){let O=x&&x.bead_id;if(typeof O!="string"||je.has(O))continue;je.add(O);let Ce=x.workflow&&typeof x.workflow=="object"?x.workflow:null,m=Ce&&typeof Ce.route=="string"&&Ce.route||(typeof x.route=="string"?x.route:null),_=Sh(Xe(Ue),x.exec_pins,m),T=Xo(x.rec,x.exec_pins);Array.isArray(x.blocked_by)&&x.blocked_by.length>0&&ne.set(O,x.blocked_by.filter(Yt=>typeof Yt=="string"&&Yt.length>0)),typeof x.title=="string"&&x.title.length>0&&ae.set(O,x.title),Array.isArray(x.scope)&&Y.set(O,x.scope.filter(Yt=>typeof Yt=="string"&&Yt.length>0));let p=Object.hasOwn(x,"eligible"),D=!p&&Object.hasOwn(x,"route")&&Object.hasOwn(x,"spec_state")&&Object.hasOwn(x,"has_description")&&Object.hasOwn(x,"awaiting_user")&&Object.hasOwn(x,"worker_ineligible")?al({route:typeof x.route=="string"?x.route:"",spec:x.spec_state,has_description:x.has_description===!0,awaiting_user:x.awaiting_user===!0,worker_ineligible:x.worker_ineligible===!0},null):null,X=p?x.eligible!==!1:D?D.placeable:!0,fe=D?D.worker_ineligible:x.worker_ineligible===!0,st=X&&!fe,xt=D?{route_ok:D.route_ok,awaiting_user:D.awaiting_user,missing_description:D.missing_description,placement_spec:D.spec}:Object.hasOwn(x,"route_ok")?{route_ok:x.route_ok===!0,awaiting_user:x.awaiting_user===!0,missing_description:x.missing_description===!0,placement_spec:x.placement_spec}:null,_n=[];!p&&D&&!D.placeable&&_n.push(Br(D)),typeof x.reason=="string"&&x.reason.length>0&&_n.push(x.reason);let hn=zd(Dt,O);hn&&_n.push(hn);let ln=Eh(O,x.release_info,f)?.map(Yt=>({...Yt,...Gd({id:O,root_dir:se},Yt.id)}));k.push({...S(O),title:x.title||tt[O]||O,lane:"runnable",draggable:!p&&st,queue_placeable:st,...xt||{},...fe?{worker_ineligible:!0}:{},...x.session_preferred===!0?{session_preferred:!0,session_preferred_reason:typeof x.session_preferred_reason=="string"?x.session_preferred_reason:""}:{},...x.spec_after_blocker===!0?{spec_after_blocker:!0}:{},...ln?{dependency_chips:{released:ln}}:{},...x.dependents_info&&typeof x.dependents_info=="object"?{dependents_info:x.dependents_info}:{},reason:_n.join(" \xB7 "),created_at:x.created_at??void 0,updated_at:x.updated_at??void 0,status:typeof x.status=="string"?x.status:void 0,labels:Array.isArray(x.labels)?x.labels:[],spec_id:typeof x.spec_id=="string"?x.spec_id:"",published:x.published===!0,workflow:Ce||(m?{route:m,chips:{route:m}}:null),..._?{exec_chips:_}:{},...T?{rec:T}:{},blocked:x.blocked===!0,...Array.isArray(x.blocked_by)?{blocked_by:x.blocked_by.filter(Yt=>typeof Yt=="string"&&Yt.length>0)}:{},place_index:Nt.length,place_lanes:Xt})}for(let x of Qt){let O=x&&x.bead_id;if(typeof O!="string"||je.has(O)||(je.add(O),i!==void 0&&typeof x.added_at=="number"&&x.added_at<i))continue;let Ce=gh(Pe,O),m=Ce&&typeof Ce.done_kind=="string"?Ce.done_kind:null,_=Oh(Xe(Ue),B.get(`${se}\0${O}`),Ce);ie.push({...S(O),lane:"done",done:!0,workflow:ft[O]||null,..._?{exec_chips:_}:{},done_layout:"three_line",usage:rr(Pe,O),work_ms:$d(Pe,O),done_at:typeof x.added_at=="number"?x.added_at:void 0,done_kind:m,...ve(O),badges:[...m&&Bd[m]?[Bd[m]]:[],...kd(Pe,O)]})}for(let x of Array.isArray(w.session_done)?w.session_done:[]){let O=x&&(x.id||x.bead_id);typeof O!="string"||je.has(O)||(je.add(O),ie.push({...S(O),...x,id:O,root_dir:se,workspace_name:Me,expected_revision:Ze,lane:"done",done:!0}))}}if(B.size>0)for(let w of[...k,...te,...E,...C,...ie]){let se=B.get(`${w.root_dir}\0${w.id}`);if(!se||(typeof se.priority=="number"&&(w.priority=se.priority),typeof se.from_id=="string"&&se.from_id.length>0&&(w.from_id=se.from_id),w.lane==="done"&&Array.isArray(se.carried_to)&&se.carried_to.length>0&&(w.carried_to=se.carried_to),w.lane==="done"&&!Xe(w.workflow).route&&typeof se.route=="string"&&se.route.length>0&&(w.workflow={route:se.route,chips:{route:se.route}}),!Object.hasOwn(se,"metadata")))continue;let Me=Xe(se.metadata);if(w.rec=Xo(Me),w.lane==="runnable"||w.lane.startsWith("s")||w.lane==="queue"){let Ue=Rh(Xe(h.get(w.root_dir)),Me,typeof se.route=="string"&&se.route.length>0?se.route:Xe(w.workflow).route);Ue&&(w.exec_chips=Ue)}}let Z=new Map;o.forEach((w,se)=>{w&&typeof w.root_dir=="string"&&Z.set(w.root_dir,se)});let be=n&&n.running_sort==="repo"?"repo":"started";E.sort((w,se)=>{let Me=w.kind==="session",Ue=se.kind==="session";if(Me!==Ue)return Me?1:-1;if(Me&&Ue){let tt=Ui(se.updated_at)-Ui(w.updated_at);return tt!==0?tt:w.id.localeCompare(se.id)}if(be==="repo"){let tt=Z.get(w.root_dir)??Number.MAX_SAFE_INTEGER,$t=Z.get(se.root_dir)??Number.MAX_SAFE_INTEGER;if(tt!==$t)return tt-$t}let Ze=typeof w.started_at=="number"&&Number.isFinite(w.started_at)?w.started_at:null,Pe=typeof se.started_at=="number"&&Number.isFinite(se.started_at)?se.started_at:null;return Ze!==null&&Pe!==null&&Ze!==Pe?Ze-Pe:Ze===null&&Pe!==null?1:Ze!==null&&Pe===null?-1:w.id.localeCompare(se.id)}),ie.sort((w,se)=>(se.done_at??0)-(w.done_at??0));let Ie=o.length>0?o:r.map(w=>({root_dir:w&&w.root_dir,name:w&&w.name,auto_advance:w&&w.auto_advance,auto_merge:w&&w.auto_merge,slots:w&&w.slots,revision:w&&w.revision,runner_catalog:w&&w.runner_catalog})),ye=new Set(k.map(w=>w.root_dir)),Le=new Map;for(let w of E)w.kind==="session"||w.run_state!=="running"||Le.set(w.root_dir,(Le.get(w.root_dir)||0)+1);let Ge=new Map;for(let w of ie){let se=Ge.get(w.root_dir);se?se.push(w):Ge.set(w.root_dir,[w])}let gt={positions:new Map,resolutions:new Map,continuations:new Map,authorities:new Map,state:{active:null,failures:{},waiting:null},auto_excluded:[],running:!1},V=[];for(let w of Ie){if(!w||typeof w.root_dir!="string")continue;let se=P.get(w.root_dir)||[],Me=I.get(w.root_dir)||[],Ue=se.length>0||Me.some(tt=>tt.items.length>0||tt.occupied_by.length>0);if(u!=="all"&&!Ue&&!ye.has(w.root_dir))continue;let Ze=typeof w.slots=="number"&&w.slots>=Wi?w.slots:Wi,Pe=Le.get(w.root_dir)||0;V.push({live_count:Pe,over_cap:Pe>Ze,merge:H.get(w.root_dir)||gt,token_total:Lh(Ge.get(w.root_dir)||[]),cleanup_failures:U.get(w.root_dir)||[],declared_base:M.get(w.root_dir)??null,repo_operations:Q.get(w.root_dir)||[],root_dir:w.root_dir,name:w.name||w.root_dir,auto_advance:w.auto_advance===!0,auto_merge:w.auto_merge===!0,slots:Ze,revision:typeof w.revision=="number"?w.revision:0,runner_catalog:Xe(w.runner_catalog),items:se,sublanes:{parallel:se,serial:Me},serial_lane_count:q.get(w.root_dir)||0,raw_queue_length:F.get(w.root_dir)||0})}let J={runnable:k,runnable_all:k,runnable_hidden:{blocked:0,readiness:0,route:0},runnable_sections:[],runnable_flat:a==="updated_flat"||a==="as_given",queue:te,queue_groups:V,running:E,pr_wait:C,done:ie,parallel_rows:[],chain_lanes:[],cross_lanes_revision:l&&typeof l.revision=="number"?l.revision:null,cross_lanes_unreadable:l===null,parallel_raw_length:Object.fromEntries(F),owner_of:{}},oe=ld(J);for(let w of z)oe.has(w.id)||oe.set(w.id,{root_dir:w.root_dir,workspace_name:w.workspace_name,lane:"done",state:"done"});for(let w of[...J.queue,...J.runnable,...J.running,...J.pr_wait]){if(!Object.hasOwn(w,"blocked_by"))continue;let se=oe.get(w.id);w.blockers=(w.blocked_by||[]).map(Me=>cd(Me,se,oe,o))}for(let w of[...J.queue,...J.runnable,...J.running,...J.pr_wait]){let se=(w.blockers||[]).map(Ze=>({...bl(w.id,Ze),...Gd(w,Ze.id,oe)})),Me=jd(w.id,Bh(Oe.get(w.id),w.dependents_info,w,oe));if(se.length===0&&Me.length===0)continue;let Ue={...w.dependency_chips||{},...se.length>0?{predecessors:se}:{},...Me.length>0?{dependents:Me}:{}};w.dependency_chips=Ue}Fh(J,Te,Y,oe,o);let de=ud(J.queue_groups);for(let w of J.queue_groups)for(let se of w.sublanes.serial){let Me=de.get(dd(w.root_dir,se.id));Me&&(se.cross_wait_peers=Me)}let Ee=new Map;for(let w of[...J.queue,...J.running,...J.pr_wait,...J.done,...J.runnable]){if(Ee.has(w.id))continue;let se=Xe(w.workflow),Me=Xe(se.chips),Ue=B.get(`${w.root_dir}\0${w.id}`),Ze=(typeof Me.route=="string"&&Me.route.length>0?Me.route:typeof se.route=="string"&&se.route.length>0?se.route:Ue&&typeof Ue.route=="string"&&Ue.route.length>0?Ue.route:null)||null,Pe=typeof Me.route_source=="string"?Me.route_source:typeof se.route_source=="string"?se.route_source:null;Ee.set(w.id,{route:Ze,route_source:Pe,exec_chips:w.exec_chips||null,added_at:typeof w.added_at=="number"?w.added_at:null})}J.chain_lanes=Nh(l&&Array.isArray(l.lanes)?l.lanes:[],ne,oe,o,ae,g,{armed_by_bead:K,failed_by_bead:re,disarmed_lanes:pe},ge,Ee);let _e=new Map;for(let w of[...J.queue,...J.runnable])_e.has(w.id)||_e.set(w.id,w);let Re=new Set;for(let w of J.chain_lanes)for(let se of w.rows){if(w.status==="confirmed"&&!se.unplaced&&!se.fixed&&Re.add(se.id),!w.draft&&!se.unplaced)continue;let Me=_e.get(se.id);Me&&(Me.cross_lane_chip={lane_id:w.lane_id,number:w.number,status:w.status,label:w.draft?`\uC5F0\uACB0 ${w.number} (draft)`:`\uC5F0\uACB0 ${w.number}`})}let Fe=new Map(J.chain_lanes.map(w=>[w.lane_id,w]));for(let w of[...J.queue,...J.running]){let se=K.get(w.id);if(typeof se!="string"||se.length===0)continue;let Me=Fe.get(se);w.armed_lane_chip=Me===void 0||Me.status==="draft"?{lane_id:se,label:"\u25B6 \uC9C4\uD589 \uC911 \xB7 \uB808\uC778 \uC5C6\uC74C",orphan:!0}:{lane_id:se,label:`\u25B6 \uC5F0\uACB0 ${Me.number}`,orphan:!1}}let Ye=[];for(let w of P.values())for(let se of w)Re.has(se.id)||Ye.push(se);Ye.sort((w,se)=>{let Me=w.workspace_name.localeCompare(se.workspace_name);return Me!==0?Me:(w.queue_index??0)-(se.queue_index??0)}),J.parallel_rows=Ye;let Be={};for(let[w,se]of oe)typeof se.root_dir=="string"&&se.root_dir.length>0&&(Be[w]=se.root_dir);for(let w of J.chain_lanes)for(let se of w.rows)!Object.hasOwn(Be,se.id)&&se.root_dir.length>0&&g.has(se.root_dir)&&(Be[se.id]=se.root_dir);J.owner_of=Be;let ee=J.runnable.length;J.runnable_all=J.runnable.slice();let G=J.runnable,Se=w=>s.show_blocked||w.blocked!==!0,ht=w=>s.readiness==="all"||(s.readiness==="ready"?w.queue_placeable===!0:w.queue_placeable!==!0),at=Kr(s.routes),ze=w=>at.length===0||at.includes(Ih(w));if(d==="per_control"){let w=[],se=0,Me=0,Ue=0;for(let Ze of G){let Pe=Se(Ze),tt=ht(Ze),$t=ze(Ze);if(Pe&&tt&&$t){w.push(Ze);continue}(Pe?0:1)+(tt?0:1)+($t?0:1)>1||(Pe?tt?Ue+=1:Me+=1:se+=1)}G=w,J.runnable_hidden={blocked:se,readiness:Me,route:Ue}}else{G=G.filter(Se);let w=G.length;G=G.filter(ht);let se=G.length;G=G.filter(ze),J.runnable_hidden={blocked:ee-w,readiness:w-se,route:se-G.length}}let et=(w,se)=>{let Me=Ui(se.updated_at)-Ui(w.updated_at);return Me!==0?Me:w.id.localeCompare(se.id)},pt=a==="repo_spec"?(w,se)=>{let Me=w.queue_placeable===!0?0:1,Ue=se.queue_placeable===!0?0:1;if(Me!==Ue)return Me-Ue;let Ze=w.published===!0?0:1,Pe=se.published===!0?0:1;return Ze!==Pe?Ze-Pe:et(w,se)}:et;if(a==="as_given")J.runnable=G,J.runnable_sections=[];else if(a==="updated_flat")J.runnable=G.slice().sort(et),J.runnable_sections=[];else{let w=new Map;for(let Ue of G){let Ze=w.get(Ue.root_dir);Ze?Ze.push(Ue):w.set(Ue.root_dir,[Ue])}let se=[],Me=[];for(let Ue of Ie){if(!Ue||typeof Ue.root_dir!="string")continue;let Ze=(w.get(Ue.root_dir)||[]).slice().sort(pt);w.delete(Ue.root_dir),Ze.length!==0&&(se.push({root_dir:Ue.root_dir,name:Ue.name||Ue.root_dir,items:Ze.map(Pe=>({...Pe,workspace_name:""}))}),Me.push(...Ze))}for(let[Ue,Ze]of w){let Pe=Ze.slice().sort(pt);se.push({root_dir:Ue,name:Pe[0]?.workspace_name||Ue,items:Pe.map(tt=>({...tt,workspace_name:""}))}),Me.push(...Pe)}J.runnable=Me,J.runnable_sections=se}let Ve=Uh(n?n.search:void 0);return Ve&&Wh(J,Ve),J}function ep(e,t){let n=new Map(e.map((a,u)=>[a,u])),r=new Map(e.map(a=>[a,new Set]));for(let a of t)a.blocker!==a.blockee&&n.has(a.blocker)&&n.has(a.blockee)&&r.get(a.blockee).add(a.blocker);let o=new Set,i=[];for(;i.length<e.length;){let a=e.find(u=>{if(o.has(u))return!1;for(let d of r.get(u))if(!o.has(d))return!1;return!0});if(a===void 0)return{order:[...e],corrections:[],cycle:!0};o.add(a),i.push(a)}let s=[],l=new Map(i.map((a,u)=>[a,u]));for(let a of i){let u=null;for(let d of r.get(a)){let f=Number(n.get(a))<Number(n.get(d)),h=Number(l.get(a))>Number(l.get(d));f&&h&&(u===null||Number(l.get(d))>Number(l.get(u)))&&(u=d)}u!==null&&s.push({bead_id:a,after:u})}return{order:i,corrections:s,cycle:!1}}var zh="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",Hi="\uC758\uC874 \uC790\uB8CC \uBBF8\uD655\uC815 \u2014 \uAD50\uC815 \uBCF4\uB958",Hh="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694",Kh="\uC774\uBBF8 \uC9C4\uD589 \uC911\uC778 \uC774\uC288 \uC55E\uC5D0\uB294 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",Ao="\uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";function ps(e,t){return`${e}\0${t}`}function Gh(e,t){let n=new Set(e),r=new Map;for(let o of e){let i=t.placed_members.has(o)?t.snapshot_blocked_by:t.runnable_blocked_by,s=i instanceof Map?i.get(o):void 0;if(!Array.isArray(s))return null;r.set(o,s.filter(l=>l!==o&&n.has(l)))}return r}function Yh(e,t){if(e.status!=="confirmed")return 0;let n=-1;return e.entries.forEach((r,o)=>{t.fixed_members.has(r.bead_id)&&(n=o)}),n+1}function ms(e,t){let n=e.entries,r=n.map(f=>f.bead_id),o=Gh(r,t);if(o===null)return{entries:n,corrections:[],cycle:!1,held:!0,mismatched:[]};let i=[];for(let[f,h]of o)for(let g of h)i.push({blocker:g,blockee:f});let s=Yh(e,t),l=new Map(r.map((f,h)=>[f,h])),a=r.slice(0,s).filter(f=>o.get(f).some(h=>Number(l.get(h))>Number(l.get(f)))),u=ep(r.slice(s),i);if(u.cycle)return{entries:n,corrections:[],cycle:!0,held:!1,mismatched:a};let d=new Map(n.map(f=>[f.bead_id,f]));return{entries:[...n.slice(0,s),...u.order.map(f=>d.get(f))],corrections:u.corrections,cycle:!1,held:!1,mismatched:a}}function np(e,t){let n=t.cross_lanes.get(e);return n===void 0?null:ms(n,t)}function Vh(e,t){if(!(t.corrections.length===0&&!t.cycle&&!t.held&&t.mismatched.length===0))return{lane_id:e,corrected:t.corrections.length,cycle:t.cycle,held:t.held,mismatched:t.mismatched}}function Qh(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function Xh(e){let t=new Map;for(let[n,r]of e)t.set(n,r.slice());return t}function $l(e,t,n){let r=new Set([t]),o=[t];for(;o.length>0;){let i=o.pop();for(let s of e.get(i)||[]){if(s===n)return!0;r.has(s)||(r.add(s),o.push(s))}}return!1}function Zh(e,t){let n=new Set;for(let[s,l]of t)for(let a of l)n.add(ps(s,a));let r=new Map,o=new Map;for(let s of e){let l=ps(s.a,s.b);r.set(l,s),o.set(l,s.type==="dep-add")}let i=[];for(let s of e){let l=ps(s.a,s.b);r.get(l)===s&&o.get(l)!==n.has(l)&&i.push(s)}return i}function Jh(e,t,n){let r=e.parallel_rows,o=Math.max(0,Math.min(r.length,n)),i=r[o];if(i&&i.root_dir===t)return i.queue_index;for(let s=o-1;s>=0;s--)if(r[s].root_dir===t)return r[s].queue_index+1;for(let s=o;s<r.length;s++)if(r[s].root_dir===t)return r[s].queue_index;return e.parallel_raw_length.get(t)??0}function eb(e,t){return e.parallel_rows.some(n=>n.root_dir===t)}function tp(e,t,n,r){return{type:"worker-queue-place",payload:{bead_id:e,...r?{lane:r}:{},index:n},root_dir:t}}function xl(e,t){let n=0;for(let r of e.cross_lanes.keys())if(n+=1,r===t)return n;return n+1}function gs(e){let t=Xh(e.blocked_by_map),n=[],r=new Set,o={refusal:null},i=u=>{let d=e.owner_of.get(u);return typeof d!="string"||d.length===0?(o.refusal=Qh(u),null):d};return{graph:t,dep_ops:n,state:o,ownerOf:i,addDep:(u,d,f)=>{if(o.refusal!==null||u===d)return;let h=t.get(u)||[];if(h.includes(d))return;let g=i(u);if(g!==null){if($l(t,d,u)){o.refusal=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${u}\uAC00 \uC774\uBBF8 ${d}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}t.set(u,[...h,d]),f!==void 0&&r.add(ps(u,d)),n.push({type:"dep-add",a:u,b:d,root_dir:g,...f===void 0?{}:{lane_id:f}})}},removeDep:(u,d)=>{if(o.refusal!==null||u===d)return;let f=t.get(u)||[];if(!f.includes(d))return;let h=i(u);h!==null&&(t.set(u,f.filter(g=>g!==d)),n.push({type:"dep-remove",a:u,b:d,root_dir:h}))},laneCreated:(u,d)=>r.has(ps(u,d))}}function hs(e,t,n,r,o={}){if(e.state.refusal!==null)return{refused:e.state.refusal};let i=Zh(e.dep_ops,t.blocked_by_map),s=i.filter(d=>d.type==="dep-remove"),l=i.filter(d=>d.type==="dep-add"),a=o.disarm_ops??[],u=o.lane_id===void 0||o.correction===void 0?void 0:Vh(o.lane_id,o.correction);return{lane_ops:n,ops:[...s,...a,...l,...r],lane_op_index:s.length+a.length,...u===void 0?{}:{correction:u}}}function rp(e,t,n){for(let r=1;r<t.length;r+=1)e.addDep(t[r].bead_id,t[r-1].bead_id,n)}function fs(e,t){return t>0&&e.entries[t]?.dep_created_by_lane===!0}function op(e,t,n,r){if(t.status!=="confirmed")return[];let o=[],i=new Map;for(let s of r){let l=e.owner_of.get(s.bead_id)||s.root_dir;typeof l!="string"||l.length===0||i.set(l,[...i.get(l)||[],s.bead_id])}for(let[s,l]of i)o.push({type:"worker-queue-disarm",payload:{bead_ids:l,lane_id:n},root_dir:s});return o}function _s(e){return e.map(t=>({bead_id:t.bead_id,root_dir:t.root_dir}))}function Ki(e,t){return e.length===t.length&&e.every((n,r)=>n.bead_id===t[r].bead_id&&n.root_dir===t[r].root_dir)}function Gi(e,t,n){let r=gs(n),o=[],i=[],s=[],l,a=n.owner_lane_of.get(e.bead_id),u=e.kind==="chain"?e.lane_id??a:void 0,d=u===void 0?void 0:n.cross_lanes.get(u);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:zh};if(t.kind==="chain"){if(e.kind==="repo-serial")return{refused:Hh};if(e.kind!=="chain"&&typeof a=="string"&&a!==t.lane_id&&n.cross_lanes.has(a))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${xl(n,a)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`};if(!n.cross_lanes.has(t.lane_id))return{refused:Ao}}if(e.kind==="chain"&&d===void 0)return{refused:Ao};let f=()=>{if(d===void 0||d.status!=="confirmed")return;let k=d.entries.findIndex(z=>z.bead_id===e.bead_id);if(k<0)return;let E=k>0?d.entries[k-1]:null,C=k+1<d.entries.length?d.entries[k+1]:null,te=fs(d,k),ie=C!==null&&fs(d,k+1);te&&E!==null&&r.removeDep(e.bead_id,E.bead_id),ie&&C!==null&&r.removeDep(C.bead_id,e.bead_id),(te||ie)&&E!==null&&C!==null&&r.addDep(C.bead_id,E.bead_id,u)},h=(k,E)=>{let C=n.cross_lanes.get(k),te=C.entries.findIndex(M=>M.bead_id===e.bead_id),ie=C.entries.filter(M=>M.bead_id!==e.bead_id),z=Math.max(0,Math.min(ie.length,te>=0&&E>te?E-1:E)),P=-1;if(ie.forEach((M,Q)=>{n.fixed_members.has(M.bead_id)&&(P=Q)}),z<=P){r.state.refusal=Kh;return}let I=te>=0?C.entries[te]:d?.entries.find(M=>M.bead_id===e.bead_id)??{bead_id:e.bead_id,root_dir:e.root_dir};l=ms({status:C.status,entries:[...ie.slice(0,z),I,...ie.slice(z)]},n);let q=l.entries;if(Ki(q,C.entries)||o.push({type:"monitor-lane-update",payload:{lane_id:k,entries:_s(q)}}),C.status!=="confirmed")return;let F=q.findIndex(M=>M.bead_id===e.bead_id),H=F>0?q[F-1].bead_id:null,U=F+1<q.length?q[F+1].bead_id:null;if(H===null){U!==null&&r.addDep(U,e.bead_id,k);return}if(r.addDep(e.bead_id,H,k),U!==null&&(r.graph.get(U)||[]).includes(H)){let M=C.entries.findIndex(Q=>Q.bead_id===U);(r.laneCreated(U,H)||M>0&&C.entries[M-1].bead_id===H&&fs(C,M))&&r.removeDep(U,H),r.addDep(U,e.bead_id,k)}},g=typeof e.queue_index=="number"?e.queue_index:n.queue_index_of.get(e.bead_id);if(e.kind==="chain"&&(f(),d!==void 0&&(t.kind!=="chain"||t.lane_id!==u))){let k=d.entries.filter(C=>C.bead_id!==e.bead_id),E=d.status==="confirmed"&&k.length<2?d.entries:d.entries.filter(C=>C.bead_id===e.bead_id);s.push(...op(n,d,u,E)),o.push({type:"monitor-lane-update",payload:{lane_id:u,entries:_s(k)}})}if(t.kind==="chain"&&h(t.lane_id,t.marker_index),r.state.refusal!==null)return{refused:r.state.refusal};if(t.kind==="candidate")e.kind!=="candidate"&&i.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let k=Jh(n,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")i.push(tp(e.bead_id,e.root_dir,k));else if(e.kind==="parallel"){let E=n.parallel_rows,C=E[Math.max(0,Math.min(E.length,t.marker_index))];if(!(!!C&&C.bead_id===e.bead_id)&&eb(n,e.root_dir)&&g!==void 0){let ie=g>k?k:k-1;ie>=0&&ie!==g&&i.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:ie},root_dir:e.root_dir})}}}else if(t.kind!=="chain")if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(g!==void 0&&t.index!==g){let k=g>t.index?t.index:t.index-1;k>=0&&k!==g&&i.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:k},root_dir:e.root_dir})}}else i.push(tp(e.bead_id,e.root_dir,t.index,t.lane_id));return hs(r,n,o,i,{disarm_ops:s,...t.kind==="chain"?{lane_id:t.lane_id,correction:l}:{}})}function sp(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Ao};if(n.entries.length<2)return{refused:"\uD655\uC815\uD558\uB824\uBA74 \uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4"};let r=ms(n,t);if(r.held)return{refused:Hi};let o=r.entries,i=gs(t),s=[];rp(i,o,e);let l=Ki(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:_s(o)}}];return l.push({type:"monitor-lane-confirm",payload:{lane_id:e}}),hs(i,t,l,s,{lane_id:e,correction:r})}function ip(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Ao};let r=ms(n,t),o=r.entries,i=gs(t),s=[];rp(i,o,e);let l=Ki(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:_s(o)}}];return hs(i,t,l,s,{lane_id:e,correction:r})}function ap(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Ao};let r=ms(n,t),o=r.entries;return hs(gs(t),t,Ki(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:_s(o)}}],[],{lane_id:e,correction:r})}function lp(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Ao};let r=gs(t);if(n.status==="confirmed")for(let o=1;o<n.entries.length;o+=1)fs(n,o)&&r.removeDep(n.entries[o].bead_id,n.entries[o-1].bead_id);return hs(r,t,[{type:"monitor-lane-remove",payload:{lane_id:e}}],[],{disarm_ops:op(t,n,e,n.entries)})}function cp(e,t){let n=t.cross_lanes.get(e);if(n===void 0||n.status!=="confirmed")return null;let r=[],o=[];for(let s=1;s<n.entries.length;s+=1){let l=`  ${n.entries[s].bead_id} \u2190 ${n.entries[s-1].bead_id}`;fs(n,s)?r.push(l):o.push(`${l} (\uB808\uC778\uC774 \uB9CC\uB4E4\uC9C0 \uC54A\uC74C)`)}let i=`\uC5F0\uACB0 ${xl(t,e)}\uC744 \uC9C0\uC6C1\uB2C8\uB2E4.`;return r.length===0?`${i}
\uC758\uC874\uC740 \uADF8\uB300\uB85C \uB461\uB2C8\uB2E4`:[i,"\uD568\uAED8 \uC81C\uAC70\uD560 \uC758\uC874:",...r,...o.length===0?[]:["\uADF8\uB300\uB85C \uB450\uB294 \uC758\uC874:",...o]].join(`
`)}function up(e){let t=new Map;for(let n of e)n.type!=="dep-add"||typeof n.lane_id!="string"||t.set(n.lane_id,[...t.get(n.lane_id)||[],{bead_id:n.a,after:n.b}]);return[...t].map(([n,r])=>({lane_id:n,pairs:r}))}function dp(e,t){let n=new Map(e.map((r,o)=>[r.bead_id,o]));return t.filter(r=>{let o=n.get(r.bead_id);return o!==void 0&&o>0&&e[o-1].bead_id===r.after})}function Al(e,t){if(e!==null){let n=t.owner_lane_of.get(e.bead_id);if(typeof n=="string"&&t.cross_lanes.has(n))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${xl(t,n)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`}}return{lane_ops:[{type:"monitor-lane-create",payload:{entries:e===null?[]:[e]}}],ops:[],lane_op_index:0}}var tb="\uC0AC\uC774\uD074";function nb(e){let t=new Map,n=r=>Array.isArray(r)?r.filter(o=>typeof o=="string"&&o.length>0):[];for(let r of Array.isArray(e)?e:[]){if(!r||typeof r!="object")continue;let o=r.bead_blocked_by&&typeof r.bead_blocked_by=="object"?r.bead_blocked_by:{};for(let[i,s]of Object.entries(o))Array.isArray(s)&&t.set(i,n(s));for(let i of[...Array.isArray(r.runnable)?r.runnable:[],...Array.isArray(r.session_active)?r.session_active:[]])i&&typeof i.bead_id=="string"&&Array.isArray(i.blocked_by)&&i.blocked_by.length>0&&t.set(i.bead_id,n(i.blocked_by))}return t}function Sl(e,t,n){let r=kr(e,t),o=[],i=new Set,s=(a,u)=>{for(let d of a)i.has(d.id)||(i.add(d.id),o.push({bead_id:d.id,root_dir:d.root_dir,workspace_name:d.workspace_name,title:d.title,lane:u}))};s(r.running,"running"),s(r.pr_wait,"pr_wait"),s(r.queue,"queue"),s(r.runnable_all,"runnable");let l=n&&typeof n.root_dir=="string"&&n.root_dir.length?n.root_dir:null;return{issues:l===null?o:o.filter(a=>a.root_dir===l),blocked_by_map:nb(e)}}function pp(e,t){let n=new Map;for(let s of t.issues)!s||typeof s.bead_id!="string"||s.bead_id.length===0||n.has(s.bead_id)||n.set(s.bead_id,s);let r=n.get(e)?.root_dir,o=t.blocked_by_map.get(e)||[],i=[];for(let s of n.values()){if(s.bead_id===e||s.lane==="done"||o.includes(s.bead_id))continue;let l=$l(t.blocked_by_map,s.bead_id,e);i.push({...s,disabled:l,...l?{reason:tb}:{}})}return i.sort((s,l)=>{let a=r!==void 0&&s.root_dir===r,u=r!==void 0&&l.root_dir===r;return a!==u?a?-1:1:s.bead_id.localeCompare(l.bead_id)}),i}function fp(e,t){let n=t.trim().toLowerCase();return n.length===0?e.slice():e.filter(r=>r.bead_id.toLowerCase().includes(n)||r.title.toLowerCase().includes(n))}var rb=/^\S+-\S+$/;function _p(e){return rb.test(e.trim())}var{entries:$p,setPrototypeOf:mp,isFrozen:ob,getPrototypeOf:sb,getOwnPropertyDescriptor:ib}=Object,{freeze:kn,seal:On,create:Ll}=Object,{apply:Dl,construct:Pl}=typeof Reflect<"u"&&Reflect;kn||(kn=function(t){return t});On||(On=function(t){return t});Dl||(Dl=function(t,n){for(var r=arguments.length,o=new Array(r>2?r-2:0),i=2;i<r;i++)o[i-2]=arguments[i];return t.apply(n,o)});Pl||(Pl=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return new t(...r)});var Yi=wn(Array.prototype.forEach),ab=wn(Array.prototype.lastIndexOf),gp=wn(Array.prototype.pop),bs=wn(Array.prototype.push),lb=wn(Array.prototype.splice),Qi=wn(String.prototype.toLowerCase),El=wn(String.prototype.toString),Tl=wn(String.prototype.match),ys=wn(String.prototype.replace),cb=wn(String.prototype.indexOf),ub=wn(String.prototype.trim),Nn=wn(Object.prototype.hasOwnProperty),vn=wn(RegExp.prototype.test),vs=db(TypeError);function wn(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return Dl(e,t,r)}}function db(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return Pl(e,n)}}function At(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Qi;mp&&mp(e,null);let r=t.length;for(;r--;){let o=t[r];if(typeof o=="string"){let i=n(o);i!==o&&(ob(t)||(t[r]=i),o=i)}e[o]=!0}return e}function pb(e){for(let t=0;t<e.length;t++)Nn(e,t)||(e[t]=null);return e}function ir(e){let t=Ll(null);for(let[n,r]of $p(e))Nn(e,n)&&(Array.isArray(r)?t[n]=pb(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=ir(r):t[n]=r);return t}function ks(e,t){for(;e!==null;){let r=ib(e,t);if(r){if(r.get)return wn(r.get);if(typeof r.value=="function")return wn(r.value)}e=sb(e)}function n(){return null}return n}var hp=kn(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Cl=kn(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Rl=kn(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),fb=kn(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Ol=kn(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),_b=kn(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),bp=kn(["#text"]),yp=kn(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Il=kn(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),vp=kn(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Vi=kn(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),mb=On(/\{\{[\w\W]*|[\w\W]*\}\}/gm),gb=On(/<%[\w\W]*|[\w\W]*%>/gm),hb=On(/\$\{[\w\W]*/gm),bb=On(/^data-[\-\w.\u00B7-\uFFFF]+$/),yb=On(/^aria-[\-\w]+$/),xp=On(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),vb=On(/^(?:\w+script|data):/i),kb=On(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Ap=On(/^html$/i),wb=On(/^[a-z][.\w]*(-[.\w]+)+$/i),kp=Object.freeze({__proto__:null,ARIA_ATTR:yb,ATTR_WHITESPACE:kb,CUSTOM_ELEMENT:wb,DATA_ATTR:bb,DOCTYPE_NAME:Ap,ERB_EXPR:gb,IS_ALLOWED_URI:xp,IS_SCRIPT_OR_DATA:vb,MUSTACHE_EXPR:mb,TMPLIT_EXPR:hb}),ws={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},$b=function(){return typeof window>"u"?null:window},xb=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,o="data-tt-policy-suffix";n&&n.hasAttribute(o)&&(r=n.getAttribute(o));let i="dompurify"+(r?"#"+r:"");try{return t.createPolicy(i,{createHTML(s){return s},createScriptURL(s){return s}})}catch{return console.warn("TrustedTypes policy "+i+" could not be created."),null}},wp=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Sp(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:$b(),t=Ae=>Sp(Ae);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==ws.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,o=r.currentScript,{DocumentFragment:i,HTMLTemplateElement:s,Node:l,Element:a,NodeFilter:u,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:f,DOMParser:h,trustedTypes:g}=e,k=a.prototype,E=ks(k,"cloneNode"),C=ks(k,"remove"),te=ks(k,"nextSibling"),ie=ks(k,"childNodes"),z=ks(k,"parentNode");if(typeof s=="function"){let Ae=n.createElement("template");Ae.content&&Ae.content.ownerDocument&&(n=Ae.content.ownerDocument)}let P,I="",{implementation:q,createNodeIterator:F,createDocumentFragment:H,getElementsByTagName:U}=n,{importNode:M}=r,Q=wp();t.isSupported=typeof $p=="function"&&typeof z=="function"&&q&&q.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:B,ERB_EXPR:ne,TMPLIT_EXPR:ge,DATA_ATTR:Oe,ARIA_ATTR:K,IS_SCRIPT_OR_DATA:re,ATTR_WHITESPACE:pe,CUSTOM_ELEMENT:Te}=kp,{IS_ALLOWED_URI:Y}=kp,ae=null,Z=At({},[...hp,...Cl,...Rl,...Ol,...bp]),be=null,Ie=At({},[...yp,...Il,...vp,...Vi]),ye=Object.seal(Ll(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Le=null,Ge=null,gt=Object.seal(Ll(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),V=!0,J=!0,oe=!1,de=!0,Ee=!1,_e=!0,Re=!1,Fe=!1,Ye=!1,Be=!1,ee=!1,G=!1,Se=!0,ht=!1,at="user-content-",ze=!0,et=!1,St={},pt=null,Ve=At({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),w=null,se=At({},["audio","video","img","source","image","track"]),Me=null,Ue=At({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Ze="http://www.w3.org/1998/Math/MathML",Pe="http://www.w3.org/2000/svg",tt="http://www.w3.org/1999/xhtml",$t=tt,qt=!1,Dt=null,ue=At({},[Ze,Pe,tt],El),he=At({},["mi","mo","mn","ms","mtext"]),Ke=At({},["annotation-xml"]),nt=At({},["title","style","font","a","script"]),Je=null,ut=["application/xhtml+xml","text/html"],ft="text/html",ot=null,Ne=null,A=n.createElement("form"),j=function(S){return S instanceof RegExp||S instanceof Function},W=function(){let S=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Ne&&Ne===S)){if((!S||typeof S!="object")&&(S={}),S=ir(S),Je=ut.indexOf(S.PARSER_MEDIA_TYPE)===-1?ft:S.PARSER_MEDIA_TYPE,ot=Je==="application/xhtml+xml"?El:Qi,ae=Nn(S,"ALLOWED_TAGS")?At({},S.ALLOWED_TAGS,ot):Z,be=Nn(S,"ALLOWED_ATTR")?At({},S.ALLOWED_ATTR,ot):Ie,Dt=Nn(S,"ALLOWED_NAMESPACES")?At({},S.ALLOWED_NAMESPACES,El):ue,Me=Nn(S,"ADD_URI_SAFE_ATTR")?At(ir(Ue),S.ADD_URI_SAFE_ATTR,ot):Ue,w=Nn(S,"ADD_DATA_URI_TAGS")?At(ir(se),S.ADD_DATA_URI_TAGS,ot):se,pt=Nn(S,"FORBID_CONTENTS")?At({},S.FORBID_CONTENTS,ot):Ve,Le=Nn(S,"FORBID_TAGS")?At({},S.FORBID_TAGS,ot):ir({}),Ge=Nn(S,"FORBID_ATTR")?At({},S.FORBID_ATTR,ot):ir({}),St=Nn(S,"USE_PROFILES")?S.USE_PROFILES:!1,V=S.ALLOW_ARIA_ATTR!==!1,J=S.ALLOW_DATA_ATTR!==!1,oe=S.ALLOW_UNKNOWN_PROTOCOLS||!1,de=S.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Ee=S.SAFE_FOR_TEMPLATES||!1,_e=S.SAFE_FOR_XML!==!1,Re=S.WHOLE_DOCUMENT||!1,Be=S.RETURN_DOM||!1,ee=S.RETURN_DOM_FRAGMENT||!1,G=S.RETURN_TRUSTED_TYPE||!1,Ye=S.FORCE_BODY||!1,Se=S.SANITIZE_DOM!==!1,ht=S.SANITIZE_NAMED_PROPS||!1,ze=S.KEEP_CONTENT!==!1,et=S.IN_PLACE||!1,Y=S.ALLOWED_URI_REGEXP||xp,$t=S.NAMESPACE||tt,he=S.MATHML_TEXT_INTEGRATION_POINTS||he,Ke=S.HTML_INTEGRATION_POINTS||Ke,ye=S.CUSTOM_ELEMENT_HANDLING||{},S.CUSTOM_ELEMENT_HANDLING&&j(S.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(ye.tagNameCheck=S.CUSTOM_ELEMENT_HANDLING.tagNameCheck),S.CUSTOM_ELEMENT_HANDLING&&j(S.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(ye.attributeNameCheck=S.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),S.CUSTOM_ELEMENT_HANDLING&&typeof S.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(ye.allowCustomizedBuiltInElements=S.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Ee&&(J=!1),ee&&(Be=!0),St&&(ae=At({},bp),be=[],St.html===!0&&(At(ae,hp),At(be,yp)),St.svg===!0&&(At(ae,Cl),At(be,Il),At(be,Vi)),St.svgFilters===!0&&(At(ae,Rl),At(be,Il),At(be,Vi)),St.mathMl===!0&&(At(ae,Ol),At(be,vp),At(be,Vi))),S.ADD_TAGS&&(typeof S.ADD_TAGS=="function"?gt.tagCheck=S.ADD_TAGS:(ae===Z&&(ae=ir(ae)),At(ae,S.ADD_TAGS,ot))),S.ADD_ATTR&&(typeof S.ADD_ATTR=="function"?gt.attributeCheck=S.ADD_ATTR:(be===Ie&&(be=ir(be)),At(be,S.ADD_ATTR,ot))),S.ADD_URI_SAFE_ATTR&&At(Me,S.ADD_URI_SAFE_ATTR,ot),S.FORBID_CONTENTS&&(pt===Ve&&(pt=ir(pt)),At(pt,S.FORBID_CONTENTS,ot)),ze&&(ae["#text"]=!0),Re&&At(ae,["html","head","body"]),ae.table&&(At(ae,["tbody"]),delete Le.tbody),S.TRUSTED_TYPES_POLICY){if(typeof S.TRUSTED_TYPES_POLICY.createHTML!="function")throw vs('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof S.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw vs('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');P=S.TRUSTED_TYPES_POLICY,I=P.createHTML("")}else P===void 0&&(P=xb(g,o)),P!==null&&typeof I=="string"&&(I=P.createHTML(""));kn&&kn(S),Ne=S}},$e=At({},[...Cl,...Rl,...fb]),we=At({},[...Ol,..._b]),_t=function(S){let ve=z(S);(!ve||!ve.tagName)&&(ve={namespaceURI:$t,tagName:"template"});let De=Qi(S.tagName),bt=Qi(ve.tagName);return Dt[S.namespaceURI]?S.namespaceURI===Pe?ve.namespaceURI===tt?De==="svg":ve.namespaceURI===Ze?De==="svg"&&(bt==="annotation-xml"||he[bt]):!!$e[De]:S.namespaceURI===Ze?ve.namespaceURI===tt?De==="math":ve.namespaceURI===Pe?De==="math"&&Ke[bt]:!!we[De]:S.namespaceURI===tt?ve.namespaceURI===Pe&&!Ke[bt]||ve.namespaceURI===Ze&&!he[bt]?!1:!we[De]&&(nt[De]||!$e[De]):!!(Je==="application/xhtml+xml"&&Dt[S.namespaceURI]):!1},kt=function(S){bs(t.removed,{element:S});try{z(S).removeChild(S)}catch{C(S)}},vt=function(S,ve){try{bs(t.removed,{attribute:ve.getAttributeNode(S),from:ve})}catch{bs(t.removed,{attribute:null,from:ve})}if(ve.removeAttribute(S),S==="is")if(Be||ee)try{kt(ve)}catch{}else try{ve.setAttribute(S,"")}catch{}},Tt=function(S){let ve=null,De=null;if(Ye)S="<remove></remove>"+S;else{let Et=Tl(S,/^[\r\n\t ]+/);De=Et&&Et[0]}Je==="application/xhtml+xml"&&$t===tt&&(S='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+S+"</body></html>");let bt=P?P.createHTML(S):S;if($t===tt)try{ve=new h().parseFromString(bt,Je)}catch{}if(!ve||!ve.documentElement){ve=q.createDocument($t,"template",null);try{ve.documentElement.innerHTML=qt?I:bt}catch{}}let je=ve.body||ve.documentElement;return S&&De&&je.insertBefore(n.createTextNode(De),je.childNodes[0]||null),$t===tt?U.call(ve,Re?"html":"body")[0]:Re?ve.documentElement:je},Wt=function(S){return F.call(S.ownerDocument||S,S,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},Ht=function(S){return S instanceof f&&(typeof S.nodeName!="string"||typeof S.textContent!="string"||typeof S.removeChild!="function"||!(S.attributes instanceof d)||typeof S.removeAttribute!="function"||typeof S.setAttribute!="function"||typeof S.namespaceURI!="string"||typeof S.insertBefore!="function"||typeof S.hasChildNodes!="function")},Nt=function(S){return typeof l=="function"&&S instanceof l};function wt(Ae,S,ve){Yi(Ae,De=>{De.call(t,S,ve,Ne)})}let Jt=function(S){let ve=null;if(wt(Q.beforeSanitizeElements,S,null),Ht(S))return kt(S),!0;let De=ot(S.nodeName);if(wt(Q.uponSanitizeElement,S,{tagName:De,allowedTags:ae}),_e&&S.hasChildNodes()&&!Nt(S.firstElementChild)&&vn(/<[/\w!]/g,S.innerHTML)&&vn(/<[/\w!]/g,S.textContent)||S.nodeType===ws.progressingInstruction||_e&&S.nodeType===ws.comment&&vn(/<[/\w]/g,S.data))return kt(S),!0;if(!(gt.tagCheck instanceof Function&&gt.tagCheck(De))&&(!ae[De]||Le[De])){if(!Le[De]&&jt(De)&&(ye.tagNameCheck instanceof RegExp&&vn(ye.tagNameCheck,De)||ye.tagNameCheck instanceof Function&&ye.tagNameCheck(De)))return!1;if(ze&&!pt[De]){let bt=z(S)||S.parentNode,je=ie(S)||S.childNodes;if(je&&bt){let Et=je.length;for(let It=Et-1;It>=0;--It){let Gt=E(je[It],!0);Gt.__removalCount=(S.__removalCount||0)+1,bt.insertBefore(Gt,te(S))}}}return kt(S),!0}return S instanceof a&&!_t(S)||(De==="noscript"||De==="noembed"||De==="noframes")&&vn(/<\/no(script|embed|frames)/i,S.innerHTML)?(kt(S),!0):(Ee&&S.nodeType===ws.text&&(ve=S.textContent,Yi([B,ne,ge],bt=>{ve=ys(ve,bt," ")}),S.textContent!==ve&&(bs(t.removed,{element:S.cloneNode()}),S.textContent=ve)),wt(Q.afterSanitizeElements,S,null),!1)},Kt=function(S,ve,De){if(Se&&(ve==="id"||ve==="name")&&(De in n||De in A))return!1;if(!(J&&!Ge[ve]&&vn(Oe,ve))){if(!(V&&vn(K,ve))){if(!(gt.attributeCheck instanceof Function&&gt.attributeCheck(ve,S))){if(!be[ve]||Ge[ve]){if(!(jt(S)&&(ye.tagNameCheck instanceof RegExp&&vn(ye.tagNameCheck,S)||ye.tagNameCheck instanceof Function&&ye.tagNameCheck(S))&&(ye.attributeNameCheck instanceof RegExp&&vn(ye.attributeNameCheck,ve)||ye.attributeNameCheck instanceof Function&&ye.attributeNameCheck(ve,S))||ve==="is"&&ye.allowCustomizedBuiltInElements&&(ye.tagNameCheck instanceof RegExp&&vn(ye.tagNameCheck,De)||ye.tagNameCheck instanceof Function&&ye.tagNameCheck(De))))return!1}else if(!Me[ve]){if(!vn(Y,ys(De,pe,""))){if(!((ve==="src"||ve==="xlink:href"||ve==="href")&&S!=="script"&&cb(De,"data:")===0&&w[S])){if(!(oe&&!vn(re,ys(De,pe,"")))){if(De)return!1}}}}}}}return!0},jt=function(S){return S!=="annotation-xml"&&Tl(S,Te)},Ft=function(S){wt(Q.beforeSanitizeAttributes,S,null);let{attributes:ve}=S;if(!ve||Ht(S))return;let De={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:be,forceKeepAttr:void 0},bt=ve.length;for(;bt--;){let je=ve[bt],{name:Et,namespaceURI:It,value:Gt}=je,Xt=ot(Et),x=Gt,O=Et==="value"?x:ub(x);if(De.attrName=Xt,De.attrValue=O,De.keepAttr=!0,De.forceKeepAttr=void 0,wt(Q.uponSanitizeAttribute,S,De),O=De.attrValue,ht&&(Xt==="id"||Xt==="name")&&(vt(Et,S),O=at+O),_e&&vn(/((--!?|])>)|<\/(style|title|textarea)/i,O)){vt(Et,S);continue}if(Xt==="attributename"&&Tl(O,"href")){vt(Et,S);continue}if(De.forceKeepAttr)continue;if(!De.keepAttr){vt(Et,S);continue}if(!de&&vn(/\/>/i,O)){vt(Et,S);continue}Ee&&Yi([B,ne,ge],m=>{O=ys(O,m," ")});let Ce=ot(S.nodeName);if(!Kt(Ce,Xt,O)){vt(Et,S);continue}if(P&&typeof g=="object"&&typeof g.getAttributeType=="function"&&!It)switch(g.getAttributeType(Ce,Xt)){case"TrustedHTML":{O=P.createHTML(O);break}case"TrustedScriptURL":{O=P.createScriptURL(O);break}}if(O!==x)try{It?S.setAttributeNS(It,Et,O):S.setAttribute(Et,O),Ht(S)?kt(S):gp(t.removed)}catch{vt(Et,S)}}wt(Q.afterSanitizeAttributes,S,null)},Qt=function Ae(S){let ve=null,De=Wt(S);for(wt(Q.beforeSanitizeShadowDOM,S,null);ve=De.nextNode();)wt(Q.uponSanitizeShadowNode,ve,null),Jt(ve),Ft(ve),ve.content instanceof i&&Ae(ve.content);wt(Q.afterSanitizeShadowDOM,S,null)};return t.sanitize=function(Ae){let S=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},ve=null,De=null,bt=null,je=null;if(qt=!Ae,qt&&(Ae="<!-->"),typeof Ae!="string"&&!Nt(Ae))if(typeof Ae.toString=="function"){if(Ae=Ae.toString(),typeof Ae!="string")throw vs("dirty is not a string, aborting")}else throw vs("toString is not a function");if(!t.isSupported)return Ae;if(Fe||W(S),t.removed=[],typeof Ae=="string"&&(et=!1),et){if(Ae.nodeName){let Gt=ot(Ae.nodeName);if(!ae[Gt]||Le[Gt])throw vs("root node is forbidden and cannot be sanitized in-place")}}else if(Ae instanceof l)ve=Tt("<!---->"),De=ve.ownerDocument.importNode(Ae,!0),De.nodeType===ws.element&&De.nodeName==="BODY"||De.nodeName==="HTML"?ve=De:ve.appendChild(De);else{if(!Be&&!Ee&&!Re&&Ae.indexOf("<")===-1)return P&&G?P.createHTML(Ae):Ae;if(ve=Tt(Ae),!ve)return Be?null:G?I:""}ve&&Ye&&kt(ve.firstChild);let Et=Wt(et?Ae:ve);for(;bt=Et.nextNode();)Jt(bt),Ft(bt),bt.content instanceof i&&Qt(bt.content);if(et)return Ae;if(Be){if(ee)for(je=H.call(ve.ownerDocument);ve.firstChild;)je.appendChild(ve.firstChild);else je=ve;return(be.shadowroot||be.shadowrootmode)&&(je=M.call(r,je,!0)),je}let It=Re?ve.outerHTML:ve.innerHTML;return Re&&ae["!doctype"]&&ve.ownerDocument&&ve.ownerDocument.doctype&&ve.ownerDocument.doctype.name&&vn(Ap,ve.ownerDocument.doctype.name)&&(It="<!DOCTYPE "+ve.ownerDocument.doctype.name+`>
`+It),Ee&&Yi([B,ne,ge],Gt=>{It=ys(It,Gt," ")}),P&&G?P.createHTML(It):It},t.setConfig=function(){let Ae=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};W(Ae),Fe=!0},t.clearConfig=function(){Ne=null,Fe=!1},t.isValidAttribute=function(Ae,S,ve){Ne||W({});let De=ot(Ae),bt=ot(S);return Kt(De,bt,ve)},t.addHook=function(Ae,S){typeof S=="function"&&bs(Q[Ae],S)},t.removeHook=function(Ae,S){if(S!==void 0){let ve=ab(Q[Ae],S);return ve===-1?void 0:lb(Q[Ae],ve,1)[0]}return gp(Q[Ae])},t.removeHooks=function(Ae){Q[Ae]=[]},t.removeAllHooks=function(){Q=wp()},t}var Ep=Sp();var ar={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Xi=e=>(...t)=>({_$litDirective$:e,values:t}),So=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var $s=class extends So{constructor(t){if(super(t),this.it=zt,t.type!==ar.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===zt||t==null)return this._t=void 0,this.it=t;if(t===Rn)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};$s.directiveName="unsafeHTML",$s.resultType=1;var Tp=Xi($s);function jl(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Yr=jl();function Pp(e){Yr=e}var Es={exec:()=>null};function Ot(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(o,i)=>{let s=typeof i=="string"?i:i.source;return s=s.replace($n.caret,"$1"),n=n.replace(o,s),r},getRegex:()=>new RegExp(n,t)};return r}var Ab=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),$n={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Sb=/^(?:[ \t]*(?:\n|$))+/,Eb=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Tb=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Ts=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Cb=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Fl=/(?:[*+-]|\d{1,9}[.)])/,Mp=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,qp=Ot(Mp).replace(/bull/g,Fl).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Rb=Ot(Mp).replace(/bull/g,Fl).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Bl=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Ob=/^[^\n]+/,Ul=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Ib=Ot(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Ul).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Lb=Ot(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Fl).getRegex(),ra="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Wl=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Db=Ot("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Wl).replace("tag",ra).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Np=Ot(Bl).replace("hr",Ts).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ra).getRegex(),Pb=Ot(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Np).getRegex(),zl={blockquote:Pb,code:Eb,def:Ib,fences:Tb,heading:Cb,hr:Ts,html:Db,lheading:qp,list:Lb,newline:Sb,paragraph:Np,table:Es,text:Ob},Cp=Ot("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Ts).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ra).getRegex(),Mb={...zl,lheading:Rb,table:Cp,paragraph:Ot(Bl).replace("hr",Ts).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Cp).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ra).getRegex()},qb={...zl,html:Ot(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Wl).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Es,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Ot(Bl).replace("hr",Ts).replace("heading",` *#{1,6} *[^
]`).replace("lheading",qp).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Nb=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,jb=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,jp=/^( {2,}|\\)\n(?!\s*$)/,Fb=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,oa=/[\p{P}\p{S}]/u,Hl=/[\s\p{P}\p{S}]/u,Fp=/[^\s\p{P}\p{S}]/u,Bb=Ot(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Hl).getRegex(),Bp=/(?!~)[\p{P}\p{S}]/u,Ub=/(?!~)[\s\p{P}\p{S}]/u,Wb=/(?:[^\s\p{P}\p{S}]|~)/u,zb=Ot(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Ab?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Up=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Hb=Ot(Up,"u").replace(/punct/g,oa).getRegex(),Kb=Ot(Up,"u").replace(/punct/g,Bp).getRegex(),Wp="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Gb=Ot(Wp,"gu").replace(/notPunctSpace/g,Fp).replace(/punctSpace/g,Hl).replace(/punct/g,oa).getRegex(),Yb=Ot(Wp,"gu").replace(/notPunctSpace/g,Wb).replace(/punctSpace/g,Ub).replace(/punct/g,Bp).getRegex(),Vb=Ot("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Fp).replace(/punctSpace/g,Hl).replace(/punct/g,oa).getRegex(),Qb=Ot(/\\(punct)/,"gu").replace(/punct/g,oa).getRegex(),Xb=Ot(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Zb=Ot(Wl).replace("(?:-->|$)","-->").getRegex(),Jb=Ot("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Zb).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),ea=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,ey=Ot(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",ea).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),zp=Ot(/^!?\[(label)\]\[(ref)\]/).replace("label",ea).replace("ref",Ul).getRegex(),Hp=Ot(/^!?\[(ref)\](?:\[\])?/).replace("ref",Ul).getRegex(),ty=Ot("reflink|nolink(?!\\()","g").replace("reflink",zp).replace("nolink",Hp).getRegex(),Rp=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Kl={_backpedal:Es,anyPunctuation:Qb,autolink:Xb,blockSkip:zb,br:jp,code:jb,del:Es,emStrongLDelim:Hb,emStrongRDelimAst:Gb,emStrongRDelimUnd:Vb,escape:Nb,link:ey,nolink:Hp,punctuation:Bb,reflink:zp,reflinkSearch:ty,tag:Jb,text:Fb,url:Es},ny={...Kl,link:Ot(/^!?\[(label)\]\((.*?)\)/).replace("label",ea).getRegex(),reflink:Ot(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",ea).getRegex()},Ml={...Kl,emStrongRDelimAst:Yb,emStrongLDelim:Kb,url:Ot(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Rp).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:Ot(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Rp).getRegex()},ry={...Ml,br:Ot(jp).replace("{2,}","*").getRegex(),text:Ot(Ml.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Zi={normal:zl,gfm:Mb,pedantic:qb},xs={normal:Kl,gfm:Ml,breaks:ry,pedantic:ny},oy={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Op=e=>oy[e];function lr(e,t){if(t){if($n.escapeTest.test(e))return e.replace($n.escapeReplace,Op)}else if($n.escapeTestNoEncode.test(e))return e.replace($n.escapeReplaceNoEncode,Op);return e}function Ip(e){try{e=encodeURI(e).replace($n.percentDecode,"%")}catch{return null}return e}function Lp(e,t){let n=e.replace($n.findPipe,(i,s,l)=>{let a=!1,u=s;for(;--u>=0&&l[u]==="\\";)a=!a;return a?"|":" |"}),r=n.split($n.splitPipe),o=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;o<r.length;o++)r[o]=r[o].trim().replace($n.slashPipe,"|");return r}function As(e,t,n){let r=e.length;if(r===0)return"";let o=0;for(;o<r;){let i=e.charAt(r-o-1);if(i===t&&!n)o++;else if(i!==t&&n)o++;else break}return e.slice(0,r-o)}function sy(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function Dp(e,t,n,r,o){let i=t.href,s=t.title||null,l=e[1].replace(o.other.outputLinkReplace,"$1");r.state.inLink=!0;let a={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:i,title:s,text:l,tokens:r.inlineTokens(l)};return r.state.inLink=!1,a}function iy(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let o=r[1];return t.split(`
`).map(i=>{let s=i.match(n.other.beginningSpace);if(s===null)return i;let[l]=s;return l.length>=o.length?i.slice(o.length):i}).join(`
`)}var ta=class{constructor(e){Mt(this,"options");Mt(this,"rules");Mt(this,"lexer");this.options=e||Yr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:As(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=iy(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=As(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:As(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=As(t[0],`
`).split(`
`),r="",o="",i=[];for(;n.length>0;){let s=!1,l=[],a;for(a=0;a<n.length;a++)if(this.rules.other.blockquoteStart.test(n[a]))l.push(n[a]),s=!0;else if(!s)l.push(n[a]);else break;n=n.slice(a);let u=l.join(`
`),d=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${u}`:u,o=o?`${o}
${d}`:d;let f=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,i,!0),this.lexer.state.top=f,n.length===0)break;let h=i.at(-1);if(h?.type==="code")break;if(h?.type==="blockquote"){let g=h,k=g.raw+`
`+n.join(`
`),E=this.blockquote(k);i[i.length-1]=E,r=r.substring(0,r.length-g.raw.length)+E.raw,o=o.substring(0,o.length-g.text.length)+E.text;break}else if(h?.type==="list"){let g=h,k=g.raw+`
`+n.join(`
`),E=this.list(k);i[i.length-1]=E,r=r.substring(0,r.length-h.raw.length)+E.raw,o=o.substring(0,o.length-g.raw.length)+E.raw,n=k.substring(i.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:i,text:o}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,o={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let i=this.rules.other.listItemRegex(n),s=!1;for(;e;){let a=!1,u="",d="";if(!(t=i.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let f=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,E=>" ".repeat(3*E.length)),h=e.split(`
`,1)[0],g=!f.trim(),k=0;if(this.options.pedantic?(k=2,d=f.trimStart()):g?k=t[1].length+1:(k=t[2].search(this.rules.other.nonSpaceChar),k=k>4?1:k,d=f.slice(k),k+=t[1].length),g&&this.rules.other.blankLine.test(h)&&(u+=h+`
`,e=e.substring(h.length+1),a=!0),!a){let E=this.rules.other.nextBulletRegex(k),C=this.rules.other.hrRegex(k),te=this.rules.other.fencesBeginRegex(k),ie=this.rules.other.headingBeginRegex(k),z=this.rules.other.htmlBeginRegex(k);for(;e;){let P=e.split(`
`,1)[0],I;if(h=P,this.options.pedantic?(h=h.replace(this.rules.other.listReplaceNesting,"  "),I=h):I=h.replace(this.rules.other.tabCharGlobal,"    "),te.test(h)||ie.test(h)||z.test(h)||E.test(h)||C.test(h))break;if(I.search(this.rules.other.nonSpaceChar)>=k||!h.trim())d+=`
`+I.slice(k);else{if(g||f.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||te.test(f)||ie.test(f)||C.test(f))break;d+=`
`+h}!g&&!h.trim()&&(g=!0),u+=P+`
`,e=e.substring(P.length+1),f=I.slice(k)}}o.loose||(s?o.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(s=!0)),o.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(d),loose:!1,text:d,tokens:[]}),o.raw+=u}let l=o.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;o.raw=o.raw.trimEnd();for(let a of o.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let d=this.lexer.inlineQueue.length-1;d>=0;d--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[d].src)){this.lexer.inlineQueue[d].src=this.lexer.inlineQueue[d].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(a.raw);if(u){let d={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};a.checked=d.checked,o.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=d.raw+a.tokens[0].raw,a.tokens[0].text=d.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(d)):a.tokens.unshift({type:"paragraph",raw:d.raw,text:d.raw,tokens:[d]}):a.tokens.unshift(d)}}if(!o.loose){let u=a.tokens.filter(f=>f.type==="space"),d=u.length>0&&u.some(f=>this.rules.other.anyLine.test(f.raw));o.loose=d}}if(o.loose)for(let a of o.items){a.loose=!0;for(let u of a.tokens)u.type==="text"&&(u.type="paragraph")}return o}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",o=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:o}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=Lp(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),o=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],i={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let s of r)this.rules.other.tableAlignRight.test(s)?i.align.push("right"):this.rules.other.tableAlignCenter.test(s)?i.align.push("center"):this.rules.other.tableAlignLeft.test(s)?i.align.push("left"):i.align.push(null);for(let s=0;s<n.length;s++)i.header.push({text:n[s],tokens:this.lexer.inline(n[s]),header:!0,align:i.align[s]});for(let s of o)i.rows.push(Lp(s,i.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:i.align[a]})));return i}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let i=As(n.slice(0,-1),"\\");if((n.length-i.length)%2===0)return}else{let i=sy(t[2],"()");if(i===-2)return;if(i>-1){let s=(t[0].indexOf("!")===0?5:4)+t[1].length+i;t[2]=t[2].substring(0,i),t[0]=t[0].substring(0,s).trim(),t[3]=""}}let r=t[2],o="";if(this.options.pedantic){let i=this.rules.other.pedanticHrefTitle.exec(r);i&&(r=i[1],o=i[3])}else o=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),Dp(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:o&&o.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),o=t[r.toLowerCase()];if(!o){let i=n[0].charAt(0);return{type:"text",raw:i,text:i}}return Dp(n,o,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let o=[...r[0]].length-1,i,s,l=o,a=0,u=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+o);(r=u.exec(t))!=null;){if(i=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!i)continue;if(s=[...i].length,r[3]||r[4]){l+=s;continue}else if((r[5]||r[6])&&o%3&&!((o+s)%3)){a+=s;continue}if(l-=s,l>0)continue;s=Math.min(s,s+l+a);let d=[...r[0]][0].length,f=e.slice(0,o+r.index+d+s);if(Math.min(o,s)%2){let g=f.slice(1,-1);return{type:"em",raw:f,text:g,tokens:this.lexer.inlineTokens(g)}}let h=f.slice(2,-2);return{type:"strong",raw:f,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),o=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&o&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let o;do o=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(o!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},jn=class ql{constructor(t){Mt(this,"tokens");Mt(this,"options");Mt(this,"state");Mt(this,"inlineQueue");Mt(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Yr,this.options.tokenizer=this.options.tokenizer||new ta,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:$n,block:Zi.normal,inline:xs.normal};this.options.pedantic?(n.block=Zi.pedantic,n.inline=xs.pedantic):this.options.gfm&&(n.block=Zi.gfm,this.options.breaks?n.inline=xs.breaks:n.inline=xs.gfm),this.tokenizer.rules=n}static get rules(){return{block:Zi,inline:xs}}static lex(t,n){return new ql(n).lex(t)}static lexInline(t,n){return new ql(n).inlineTokens(t)}lex(t){t=t.replace($n.carriageReturn,`
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
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=s.text):n.push(o);continue}if(t){let s="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(s);break}else throw new Error(s)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,o=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(o=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)a.includes(o[0].slice(o[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,o.index)+"["+"a".repeat(o[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(o=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,o.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let i;for(;(o=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)i=o[2]?o[2].length:0,r=r.slice(0,o.index+i)+"["+"a".repeat(o[0].length-i-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let s=!1,l="";for(;t;){s||(l=""),s=!1;let a;if(this.options.extensions?.inline?.some(d=>(a=d.call({lexer:this},t,n))?(t=t.substring(a.raw.length),n.push(a),!0):!1))continue;if(a=this.tokenizer.escape(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.tag(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.link(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(a.raw.length);let d=n.at(-1);a.type==="text"&&d?.type==="text"?(d.raw+=a.raw,d.text+=a.text):n.push(a);continue}if(a=this.tokenizer.emStrong(t,r,l)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.codespan(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.br(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.del(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.autolink(t)){t=t.substring(a.raw.length),n.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(t))){t=t.substring(a.raw.length),n.push(a);continue}let u=t;if(this.options.extensions?.startInline){let d=1/0,f=t.slice(1),h;this.options.extensions.startInline.forEach(g=>{h=g.call({lexer:this},f),typeof h=="number"&&h>=0&&(d=Math.min(d,h))}),d<1/0&&d>=0&&(u=t.substring(0,d+1))}if(a=this.tokenizer.inlineText(u)){t=t.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),s=!0;let d=n.at(-1);d?.type==="text"?(d.raw+=a.raw,d.text+=a.text):n.push(a);continue}if(t){let d="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(d);break}else throw new Error(d)}}return n}},na=class{constructor(e){Mt(this,"options");Mt(this,"parser");this.options=e||Yr}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match($n.notSpaceStart)?.[0],o=e.replace($n.endingNewline,"")+`
`;return r?'<pre><code class="language-'+lr(r)+'">'+(n?o:lr(o,!0))+`</code></pre>
`:"<pre><code>"+(n?o:lr(o,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${lr(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),o=Ip(e);if(o===null)return r;e=o;let i='<a href="'+e+'"';return t&&(i+=' title="'+lr(t)+'"'),i+=">"+r+"</a>",i}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let o=Ip(e);if(o===null)return lr(n);e=o;let i=`<img src="${e}" alt="${n}"`;return t&&(i+=` title="${lr(t)}"`),i+=">",i}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:lr(e.text)}},Gl=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},Fn=class Nl{constructor(t){Mt(this,"options");Mt(this,"renderer");Mt(this,"textRenderer");this.options=t||Yr,this.options.renderer=this.options.renderer||new na,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Gl}static parse(t,n){return new Nl(n).parse(t)}static parseInline(t,n){return new Nl(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let o=t[r];if(this.options.extensions?.renderers?.[o.type]){let s=o,l=this.options.extensions.renderers[s.type].call({parser:this},s);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(s.type)){n+=l||"";continue}}let i=o;switch(i.type){case"space":{n+=this.renderer.space(i);break}case"hr":{n+=this.renderer.hr(i);break}case"heading":{n+=this.renderer.heading(i);break}case"code":{n+=this.renderer.code(i);break}case"table":{n+=this.renderer.table(i);break}case"blockquote":{n+=this.renderer.blockquote(i);break}case"list":{n+=this.renderer.list(i);break}case"checkbox":{n+=this.renderer.checkbox(i);break}case"html":{n+=this.renderer.html(i);break}case"def":{n+=this.renderer.def(i);break}case"paragraph":{n+=this.renderer.paragraph(i);break}case"text":{n+=this.renderer.text(i);break}default:{let s='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(s),"";throw new Error(s)}}}return n}parseInline(t,n=this.renderer){let r="";for(let o=0;o<t.length;o++){let i=t[o];if(this.options.extensions?.renderers?.[i.type]){let l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(i.type)){r+=l||"";continue}}let s=i;switch(s.type){case"escape":{r+=n.text(s);break}case"html":{r+=n.html(s);break}case"link":{r+=n.link(s);break}case"image":{r+=n.image(s);break}case"checkbox":{r+=n.checkbox(s);break}case"strong":{r+=n.strong(s);break}case"em":{r+=n.em(s);break}case"codespan":{r+=n.codespan(s);break}case"br":{r+=n.br(s);break}case"del":{r+=n.del(s);break}case"text":{r+=n.text(s);break}default:{let l='Token with "'+s.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return r}},Ji,Ss=(Ji=class{constructor(e){Mt(this,"options");Mt(this,"block");this.options=e||Yr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?jn.lex:jn.lexInline}provideParser(){return this.block?Fn.parse:Fn.parseInline}},Mt(Ji,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),Mt(Ji,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Ji),ay=class{constructor(...e){Mt(this,"defaults",jl());Mt(this,"options",this.setOptions);Mt(this,"parse",this.parseMarkdown(!0));Mt(this,"parseInline",this.parseMarkdown(!1));Mt(this,"Parser",Fn);Mt(this,"Renderer",na);Mt(this,"TextRenderer",Gl);Mt(this,"Lexer",jn);Mt(this,"Tokenizer",ta);Mt(this,"Hooks",Ss);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let o=r;for(let i of o.header)n=n.concat(this.walkTokens(i.tokens,t));for(let i of o.rows)for(let s of i)n=n.concat(this.walkTokens(s.tokens,t));break}case"list":{let o=r;n=n.concat(this.walkTokens(o.items,t));break}default:{let o=r;this.defaults.extensions?.childTokens?.[o.type]?this.defaults.extensions.childTokens[o.type].forEach(i=>{let s=o[i].flat(1/0);n=n.concat(this.walkTokens(s,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(o=>{if(!o.name)throw new Error("extension name required");if("renderer"in o){let i=t.renderers[o.name];i?t.renderers[o.name]=function(...s){let l=o.renderer.apply(this,s);return l===!1&&(l=i.apply(this,s)),l}:t.renderers[o.name]=o.renderer}if("tokenizer"in o){if(!o.level||o.level!=="block"&&o.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let i=t[o.level];i?i.unshift(o.tokenizer):t[o.level]=[o.tokenizer],o.start&&(o.level==="block"?t.startBlock?t.startBlock.push(o.start):t.startBlock=[o.start]:o.level==="inline"&&(t.startInline?t.startInline.push(o.start):t.startInline=[o.start]))}"childTokens"in o&&o.childTokens&&(t.childTokens[o.name]=o.childTokens)}),r.extensions=t),n.renderer){let o=this.defaults.renderer||new na(this.defaults);for(let i in n.renderer){if(!(i in o))throw new Error(`renderer '${i}' does not exist`);if(["options","parser"].includes(i))continue;let s=i,l=n.renderer[s],a=o[s];o[s]=(...u)=>{let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d||""}}r.renderer=o}if(n.tokenizer){let o=this.defaults.tokenizer||new ta(this.defaults);for(let i in n.tokenizer){if(!(i in o))throw new Error(`tokenizer '${i}' does not exist`);if(["options","rules","lexer"].includes(i))continue;let s=i,l=n.tokenizer[s],a=o[s];o[s]=(...u)=>{let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d}}r.tokenizer=o}if(n.hooks){let o=this.defaults.hooks||new Ss;for(let i in n.hooks){if(!(i in o))throw new Error(`hook '${i}' does not exist`);if(["options","block"].includes(i))continue;let s=i,l=n.hooks[s],a=o[s];Ss.passThroughHooks.has(i)?o[s]=u=>{if(this.defaults.async&&Ss.passThroughHooksRespectAsync.has(i))return(async()=>{let f=await l.call(o,u);return a.call(o,f)})();let d=l.call(o,u);return a.call(o,d)}:o[s]=(...u)=>{if(this.defaults.async)return(async()=>{let f=await l.apply(o,u);return f===!1&&(f=await a.apply(o,u)),f})();let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d}}r.hooks=o}if(n.walkTokens){let o=this.defaults.walkTokens,i=n.walkTokens;r.walkTokens=function(s){let l=[];return l.push(i.call(this,s)),o&&(l=l.concat(o.call(this,s))),l}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return jn.lex(e,t??this.defaults)}parser(e,t){return Fn.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},o={...this.defaults,...r},i=this.onError(!!o.silent,!!o.async);if(this.defaults.async===!0&&r.async===!1)return i(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return i(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return i(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(o.hooks&&(o.hooks.options=o,o.hooks.block=e),o.async)return(async()=>{let s=o.hooks?await o.hooks.preprocess(t):t,l=await(o.hooks?await o.hooks.provideLexer():e?jn.lex:jn.lexInline)(s,o),a=o.hooks?await o.hooks.processAllTokens(l):l;o.walkTokens&&await Promise.all(this.walkTokens(a,o.walkTokens));let u=await(o.hooks?await o.hooks.provideParser():e?Fn.parse:Fn.parseInline)(a,o);return o.hooks?await o.hooks.postprocess(u):u})().catch(i);try{o.hooks&&(t=o.hooks.preprocess(t));let s=(o.hooks?o.hooks.provideLexer():e?jn.lex:jn.lexInline)(t,o);o.hooks&&(s=o.hooks.processAllTokens(s)),o.walkTokens&&this.walkTokens(s,o.walkTokens);let l=(o.hooks?o.hooks.provideParser():e?Fn.parse:Fn.parseInline)(s,o);return o.hooks&&(l=o.hooks.postprocess(l)),l}catch(s){return i(s)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+lr(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},Gr=new ay;function Lt(e,t){return Gr.parse(e,t)}Lt.options=Lt.setOptions=function(e){return Gr.setOptions(e),Lt.defaults=Gr.defaults,Pp(Lt.defaults),Lt};Lt.getDefaults=jl;Lt.defaults=Yr;Lt.use=function(...e){return Gr.use(...e),Lt.defaults=Gr.defaults,Pp(Lt.defaults),Lt};Lt.walkTokens=function(e,t){return Gr.walkTokens(e,t)};Lt.parseInline=Gr.parseInline;Lt.Parser=Fn;Lt.parser=Fn.parse;Lt.Renderer=na;Lt.TextRenderer=Gl;Lt.Lexer=jn;Lt.lexer=jn.lex;Lt.Tokenizer=ta;Lt.Hooks=Ss;Lt.parse=Lt;var B0=Lt.options,U0=Lt.setOptions,W0=Lt.use,z0=Lt.walkTokens,H0=Lt.parseInline;var K0=Fn.parse,G0=jn.lex;function wr(e){let t=Lt.parse(e),n=Ep.sanitize(t);return Tp(n)}function cr(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function Eo(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function sa(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var Gp={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},ly={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},cy=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,uy=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function Bn(e){return!!e&&typeof e=="object"}function Yl(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function Vl(e,t){let n=Yl(e),r=Yl(t),o=new Map;for(let l of n)o.set(l,(o.get(l)||0)+1);let i=0;for(let l of r){let a=o.get(l)||0;a>0?o.set(l,a-1):i+=1}let s=0;for(let l of o.values())s+=l;return{added:i,removed:s}}function Yp(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(o=>Bn(o)&&typeof o.text=="string"?o.text:"").join(""):Bn(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(o=>o.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function dy(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:Gp[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=Yl(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:o,removed:i}=Vl(n.old_string,n.new_string);r.added=o,r.removed=i}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let o=0,i=0,s=Array.isArray(n.edits)?n.edits:[];for(let l of s){let a=Vl(Bn(l)?l.old_string:"",Bn(l)?l.new_string:"");o+=a.added,i+=a.removed}r.added=o,r.removed=i}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(r.launch_id=e.id),typeof n.description=="string"&&(r.command=n.description)),r}function Ql(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}var py=/<system-reminder>[\s\S]*?<\/system-reminder>/g;function Vp(e){let t;if(typeof e=="string")t=e;else if(Array.isArray(e))t=e.filter(r=>Bn(r)&&r.type==="text"&&typeof r.text=="string").map(r=>String(r.text)).join(`
`);else return null;let n=t.replace(py,"").trim();return n.length>0?{kind:"user",text:n}:null}function Xl(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=cy.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:uy.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function fy(e,t){if(e.subtype==="init"){let n=typeof e.model=="string"?e.model:"";return t.progress=null,[{kind:"thinking",text:n?`\uC138\uC158 \uC2DC\uC791 \xB7 ${n}`:"\uC138\uC158 \uC2DC\uC791"}]}if(e.subtype==="thinking_tokens"){let r=`\uC0DD\uAC01 \uC911\u2026 ${typeof e.estimated_tokens=="number"&&Number.isFinite(e.estimated_tokens)?Math.max(0,Math.round(e.estimated_tokens)):0} \uD1A0\uD070`;return t.progress?(t.progress.text=r,[]):(t.progress={kind:"thinking",text:r},[t.progress])}return[]}function _y(e,t){let n=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let r=e.message,o=r&&Array.isArray(r.content)?r.content:[],i=[];for(let s of o)if(Bn(s)){if(s.type==="text"&&typeof s.text=="string")i.push(Xl(s.text));else if(s.type==="thinking"){let l=Ql(s.thinking);l&&i.push(l)}else if(s.type==="tool_use"){let l=dy(s);typeof s.id=="string"&&t.set(s.id,l),i.push(l)}}return n?Kp(i,n):i}if(e.type==="user"){let r=e.message,o=r&&Array.isArray(r.content)?r.content:[];for(let s of o)if(Bn(s)&&s.type==="tool_result"){let l=t.get(String(s.tool_use_id));if(l){let a=Yp(s.content);l.result=a,l.output=typeof s.content=="string"?s.content:a,s.is_error===!0&&(l.is_error=!0)}}let i=Vp(r&&r.content);return i?[i]:[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success",o={kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""};return n?Kp([o],n):[o]}return[]}function Kp(e,t){for(let n of e)n.parent_tool_use_id=t;return e}function my(e){let t=typeof e.command=="string"?e.command:"",n=Yp(e.aggregated_output===void 0?e.output:e.aggregated_output),o=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",n].filter(s=>s.length>0).join(" \xB7 "),i={kind:"tool",tool:"shell",icon:Gp.Bash,command:t,input:{command:t},expandable:!0};return o.length>0&&(i.result=o),typeof e.aggregated_output=="string"&&(i.output=e.aggregated_output),i}function gy(e){if(e.type==="item.completed"&&Bn(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[Xl(t.text)];if(t.type==="user_message"){let n=Vp(t.text);return n?[n]:[]}if(t.type==="reasoning"){let n=Ql(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[my(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function hy(e){if(e.schema!=="codex-delegation-monitor-v1"||!Bn(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&Bn(t.item)){let n=t.item;if(typeof n.id!="string"||n.id.length===0)return[];if(t.type==="item.completed"&&n.kind==="agent_message"&&typeof n.text=="string"&&n.text.trim().length>0)return[Xl(n.text)];if(t.type==="item.completed"&&n.kind==="reasoning"){let s=Ql(n.text);return s?[s]:[]}if(t.type!=="item.completed"||n.kind!=="activity"||typeof n.activity!="string")return[];let r=ly[n.activity];if(!r)return[];let o,i;if(n.status==="completed")o="\uC644\uB8CC",i="\u2713";else if(n.status==="failed")o="\uC2E4\uD328",i="\u2717";else return[];return[{kind:"tool",tool:`${r} \xB7 ${o}`,icon:i,expandable:!1,result:""}]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function by(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function yy(e){let t=e;if(typeof e=="string"){let n=e.trim();if(n.length===0)return null;try{t=JSON.parse(n)}catch{return null}}return Bn(t)?t:null}function Qp(e={}){let t=e.skip_delegated===!0,n=new Map,r={progress:null};return{push(o){let i=yy(o);if(!i)return[];if(t&&typeof i.parent_tool_use_id=="string"&&i.parent_tool_use_id.length>0)return[];if(i.type==="system"&&i.schema!=="codex-delegation-monitor-v1")return fy(i,r);let s=i.schema==="codex-delegation-monitor-v1"?hy(i):by(i)?gy(i):_y(i,n);return s.length>0&&(r.progress=null),s}}}function Zl(e){let t=[],n=Qp(),r=Array.isArray(e)?e:[];for(let o of r)for(let i of n.push(o))t.push(i);return t}var vy=5,ky=10,wy=/Task\s+#(\d+)/,$y=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,xy=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function Cs(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Ay(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function Sy(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function Ey(e){let t=new Map,n=0;for(let o of e){if(o.kind!=="tool")continue;n+=1;let i=o.input||{};if(o.tool==="TaskCreate"){let a=wy.exec(o.output||o.result||""),u=String(i.activeForm||i.subject||"").trim();if(!a||u.length===0)continue;t.set(a[1],{label:u,active:i.status==="in_progress"?n:0});continue}if(o.tool!=="TaskUpdate")continue;let s=t.get(String(i.taskId??""));if(!s)continue;let l=i.activeForm||i.subject;typeof l=="string"&&l.trim().length>0&&(s.label=l.trim()),typeof i.status=="string"&&(s.active=i.status==="in_progress"?n:0)}let r=null;for(let o of t.values())o.active>0&&(!r||o.active>r.active)&&(r=o);return r?r.label:null}function Ty(e){if(e.tool==="Bash"){let t=e.command||"";return $y.test(t)?"~ PR/\uAC8C\uC2DC \uC911":xy.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function Cy(e){let t=e.filter(o=>o.kind==="tool").slice(-ky),n=new Map;t.forEach((o,i)=>{let s=Ty(o);if(!s)return;let l=n.get(s)||{count:0,last:-1};l.count+=1,l.last=i,n.set(s,l)});let r=null;for(let[o,i]of n)(!r||i.count>r.count||i.count===r.count&&i.last>r.last)&&(r={label:o,count:i.count,last:i.last});return r?r.label:null}function Ry(e){let t=Sy(e);if(t)return{text:t,guess:!1};let n=Ey(e);if(n)return{text:n,guess:!1};let r=Cy(e);return r?{text:r,guess:!0}:null}function Oy(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:bn(e,t)}function To(e,t={}){let{transport:n,sessionLogStore:r,onClose:o}=t,i=null,s=null,l=null,a=null,u=null,d=!1,f={},h=!0,g=new Set,k=new Set,E=null,C=null,te=!1,ie=!1,z=!1,P=null,I=null;function q(){te=!1,ie=!1,z=!1,P=null,I=null}async function F(ee){if(n){ie=!0,z=!1,Le();try{let G=await Promise.resolve(n("get-attempt-prompt",{attempt_id:ee,...u?{root_dir:u}:{}}));if(i!==ee)return;!G||typeof G!="object"||Array.isArray(G)?z=!0:(P=G,I=ee)}catch{i===ee&&(z=!0)}finally{i===ee&&(ie=!1,Le())}}}function H(){if(te=!te,te&&i&&I!==i){F(i);return}Le()}function U(){if(!te)return"";let ee=Eo({loading:ie,error:z});if(ee)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${ee}
      </div>`;if(!P)return"";if(P.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let G=sa(P.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${G?c`<div class="prompt-block__meta">${G} 발송</div>`:""}
      ${typeof P.task_prompt=="string"?cr("\uACFC\uC5C5 (user)",P.task_prompt):""}
      ${typeof P.system_prompt=="string"?cr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",P.system_prompt):""}
    </div>`}function M(){if(!a||!r)return[];let ee=r.get(a);return Zl(ee?ee.lines:[])}function Q(){if(!a||!r)return null;let ee=r.get(a),G=ee?ee.last_event_at:null;return typeof G=="number"?G:null}function B(){return f.status==="running"}function ne(){if(B()&&i){C||(C=setInterval(()=>Le(),1e3));return}ge()}function ge(){C&&(clearInterval(C),C=null)}function Oe(ee){let G=[],Se=0;for(;Se<ee.length;){let{idx:ht,line:at}=ee[Se];if(at.kind==="tool"){let ze=Se;for(;ze<ee.length&&ee[ze].line.kind==="tool"&&ee[ze].line.tool===at.tool;)ze+=1;if(ze-Se>=vy&&!k.has(ht)){G.push({kind:"group",idx:ht,tool:at.tool||"",lines:ee.slice(Se,ze)}),Se=ze;continue}}G.push({kind:"line",idx:ht,line:at}),Se+=1}return G}function K(ee){let G=[],Se=new Map;for(let ze=0;ze<ee.length;ze+=1){let et=ee[ze],St=et.parent_tool_use_id;if(typeof St=="string"&&St.length>0){let pt=Se.get(St);pt||(pt={kind:"subagent",idx:ze,launch_id:St,agent_type:null,header:null,lines:[]},Se.set(St,pt),G.push(pt)),pt.lines.push({idx:ze,line:et});continue}if(et.kind==="tool"&&et.tool==="Agent"&&typeof et.launch_id=="string"&&et.launch_id.length>0){let pt=re(et),Ve=Se.get(et.launch_id);if(Ve){Ve.header={idx:ze,line:et},Ve.agent_type=pt;continue}let w={kind:"subagent",idx:ze,launch_id:et.launch_id,agent_type:pt,header:{idx:ze,line:et},lines:[]};Se.set(et.launch_id,w),G.push(w);continue}G.push({kind:"entry",idx:ze,line:et})}let ht=[],at=0;for(;at<G.length;){if(G[at].kind!=="entry"){ht.push(G[at]),at+=1;continue}let ze=at;for(;ze<G.length&&G[ze].kind==="entry";)ze+=1;ht.push(...Oe(G.slice(at,ze))),at=ze}return ht}function re(ee){let G=ee.input;return G&&typeof G.subagent_type=="string"?G.subagent_type:null}function pe(ee){for(let G=ee.length-1;G>=0;G-=1){let Se=ee[G];if(Se.kind==="result"||Se.kind==="error")return null;if(Se.kind==="tool"&&!Object.hasOwn(Se,"result"))return Se}return null}function Te(ee){for(let G=ee.length-1;G>=0;G-=1)if(ee[G].kind==="thinking")return ee[G];return null}function Y(ee,G){if(G.kind==="gate")return c`<div class="sv__gate">${G.text}</div>`;if(G.kind==="phase")return c`<div class="sv__phase">${G.text}</div>`;if(G.kind==="result")return c`<div
        class="sv__result${G.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${G.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${wr(G.text||(G.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(G.kind==="thinking"){let Se=g.has(ee);return c`<div
        class="sv__think${Se?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>gt(ee)}
      >
        <span class="sv__think-line">💭 ${Cs(G.text)}</span>
        ${Se?c`<pre class="sv__think-expand">${G.text}</pre>`:""}
      </div>`}if(G.kind==="user"){let Se=g.has(ee);return c`<div
        class="sv__line sv__line--user${Se?" sv__line--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>gt(ee)}
      >
        <span class="sv__user-line">▷ ${Cs(G.text)}</span>
        ${Se?c`<pre class="sv__user-expand">${G.text}</pre>`:""}
      </div>`}if(G.kind==="error")return c`<div class="sv__error">⛔ ${G.text}</div>`;if(G.kind==="blocker")return c`<div class="sv__error">⛔ ${G.text}</div>`;if(G.kind==="tool"){let Se=g.has(ee),ht=G.tool==="Bash"?Ay(G.command):0,at=G.tool==="Bash"?ht>1?Cs(G.command):G.command:G.path||G.command||"";return c`<div
        class="sv__tool${Se?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>gt(ee)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${G.icon}</span>
          <span class="sv__tool-name">${G.tool}</span>
          ${at?c`<span class="sv__tool-detail">${at}</span>`:""}
          ${ht>1?c`<span class="sv__tool-more">⋯ ${ht}줄</span>`:""}
          ${typeof G.added=="number"?c`<span class="sv__diff-add">+${G.added}</span>`:""}
          ${typeof G.removed=="number"?c`<span class="sv__diff-del">−${G.removed}</span>`:""}
          ${G.result?c`<span class="sv__tool-ok">→ ${G.result}</span>`:""}
        </span>
        ${Se?c`<pre class="sv__tool-expand">${ae(G)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${wr(G.text||"")}</div>`}function ae(ee){let G=[];if(ee.tool==="Bash"&&typeof ee.command=="string"&&ee.command.length>0)G.push(ee.command);else if(ee.input!==void 0)try{G.push(`input: ${JSON.stringify(ee.input,null,2)}`)}catch{}return typeof ee.output=="string"&&ee.output.length>0&&G.push(`output:
${ee.output}`),G.join(`

`)}function Z(){if(!i)return c``;let ee=M(),G=(s?[f.agent_type,f.model,f.effort]:[f.runner,f.model,f.effort]).filter(Boolean).join(" \xB7 "),Se=f.session_id||"",ht=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${h?"ON":"OFF"}`,at=B(),ze=at?Oy(Q(),Date.now()):"",et=at?pe(ee):null,St=at?Te(ee):null,pt=Ry(ee);return c`<div class="sv" data-attempt-id=${i}>
      <div class="sv__bar">
        <span class="sv__id"
          >${f.label||(s?f.role||"":i)}</span
        >
        ${pt?c`<span
              class="sv__stage${pt.guess?" sv__stage--guess":""}"
              title=${pt.text}
              >${pt.text}</span
            >`:""}
        ${at?c`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${ze?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${ze}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${ze?c`<span class="sv__live-ago">${ze}</span>`:""}</span
            >`:""}
        ${Se?c`<button
              type="button"
              class="sv__session"
              title=${Se}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${Se}`}
              @click=${()=>J(Se)}
            >
              ⧉ ${Se.slice(0,8)}
            </button>`:""}
        ${f.resume_command?c`<button
              type="button"
              class="sv__resume-cmd"
              title=${f.resume_command}
              aria-label=${`\uC7AC\uAC1C \uBA85\uB839 \uBCF5\uC0AC: ${f.resume_command}`}
              @click=${()=>J(f.resume_command||"")}
            >
              ⧉ 재개 명령
            </button>`:""}
        ${G?c`<span class="sv__meta">${G}</span>`:""}
        ${f.worktree?c`<span class="sv__wt" title=${f.worktree}
              >${f.worktree}</span
            >`:""}
        ${s||d?"":c`<button
              type="button"
              class="sv__prompt-toggle${te?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${te?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${H}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${h?" sv__follow--on":""}"
          aria-pressed=${h?"true":"false"}
          aria-label=${ht}
          @click=${V}
        >
          <span class="sv__follow-full">⇣ ${ht}</span>
          <span class="sv__follow-short">⇣ ${h?"ON":"OFF"}</span>
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
      ${s||d?"":U()}
      <div class="sv__body">
        ${ee.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:K(ee).map(Ve=>Ve.kind==="subagent"?Ie(Ve):Ve.kind==="group"?be(Ve):Y(Ve.idx,Ve.line))}
      </div>
      ${et||St?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${et?c`<span class="sv__now-icon">${et.icon}</span>
                  <span class="sv__now-name">${et.tool}</span>
                  <span class="sv__now-detail"
                    >${et.tool==="Bash"?Cs(et.command):et.path||et.command||""}</span
                  >`:""}
            ${St?c`<span class="sv__now-think"
                  >💭 ${Cs(St.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function be(ee){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>ye(ee.idx)}
    >
      <span class="sv__group-icon">${ee.lines[0].line.icon}</span>
      <span class="sv__group-name">${ee.tool}</span>
      <span class="sv__group-count">${ee.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function Ie(ee){let G=k.has(ee.idx),Se=ee.header?ee.header.line:null,ht=Se?Se.is_error===!0?"\u2717":typeof Se.result=="string"?"\u2713":"\u27F3":"",at=Se&&Se.command?Se.command:"";return c`<div class="sv__sub${G?" sv__sub--open":""}">
      <div
        class="sv__sub-head"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>ye(ee.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${ee.agent_type||"subagent"}</span>
        ${at?c`<span class="sv__sub-detail">${at}</span>`:""}
        <span class="sv__sub-count">${ee.lines.length}줄</span>
        ${ht?c`<span class="sv__sub-state">${ht}</span>`:""}
        ${G?"":c`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${G?c`<div class="sv__sub-body">
            ${Oe(ee.lines).map(ze=>ze.kind==="group"?be(ze):Y(ze.idx,ze.line))}
          </div>`:""}
    </div>`}function ye(ee){k.add(ee),Le()}function Le(){dt(Z(),e),ne(),h&&Ge()}function Ge(){let ee=e.querySelector(".sv__body");ee&&(ee.scrollTop=ee.scrollHeight)}function gt(ee){g.has(ee)?g.delete(ee):g.add(ee),Le()}function V(){h=!h,Le()}function J(ee){yn(ee).then(G=>{G?me("\uBCF5\uC0AC\uB428","success",1200):me("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function oe(ee){!i||!ee||(f={...f,...ee},Le())}function de(ee){let G=ee.target;if(!G||!G.classList||!G.classList.contains("sv__body"))return;!(G.scrollHeight-G.scrollTop-G.clientHeight<=4)&&h&&(h=!1,Le())}e.addEventListener("scroll",de,!0);function Ee(ee){let G=ee.target;!G||typeof G.closest!="function"||e.contains(G)||G.closest("dialog")||G.closest(".md-viewer-root")||Be()}let _e=!1;function Re(){_e||(document.addEventListener("mousedown",Ee),_e=!0)}function Fe(){_e&&(document.removeEventListener("mousedown",Ee),_e=!1)}function Ye(ee){let G=ee&&ee.attempt_id;if(!G)return;let Se=typeof ee.launch_id=="string"&&ee.launch_id.length>0?ee.launch_id:null,ht=ee.session_ref&&typeof ee.session_ref=="object"?ee.session_ref:null;if(Se&&ht)return;let at=a;i=G,s=Se,l=ht,a=s?`session-log:${i}:${s}`:`session-log:${i}`,n&&at&&at!==a&&Promise.resolve(n("unsubscribe-session-log",{id:at})).catch(()=>{}),u=typeof ee.root_dir=="string"&&ee.root_dir.length>0?ee.root_dir:null,f=ee.meta||{},d=ee.hide_prompt===!0,h=!0,g.clear(),k.clear(),q(),!E&&r&&(E=r.subscribe(Le)),n&&Promise.resolve(n("subscribe-session-log",{id:a,attempt_id:i,...s?{launch_id:s}:{},...l?{session_ref:l}:{},...u?{root_dir:u}:{}})).catch(()=>{}),Re(),Le()}function Be(){let ee=a;Fe(),i=null,s=null,l=null,a=null,u=null,d=!1,g.clear(),k.clear(),q(),ge(),n&&ee&&Promise.resolve(n("unsubscribe-session-log",{id:ee})).catch(()=>{}),dt(c``,e),o&&o()}return{open:Ye,updateMeta:oe,close:Be,isOpen(){return i!==null},destroy(){ge(),Fe(),E&&(E(),E=null),e.removeEventListener("scroll",de,!0),i=null,s=null,l=null,a=null,u=null,d=!1,dt(c``,e)}}}function Iy(e){let t=[],n=e?.workflow?.stages,r=n?.spec?.doc;r&&t.push({kind:"spec",path:r.path,missing_state:r.missing_state});let o=n?.plan?.doc;return o&&t.push({kind:"plan",path:o.path,missing_state:o.missing_state}),t}function Xp(e,t){let n=Iy(e);return c`
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
  `}var Ly="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",Dy=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,Py=/^\*\*결론\*\* — (.+)$/;function ia(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==Ly)return null;let n=Dy.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],o=n[2],i=n[3],s=2;for(;s<t.length&&t[s].trim().length===0;)s+=1;let l=s<t.length?Py.exec(t[s]):null,a=l?l[1].replace(/\s+/g," ").trim():"",u=l?s+1:s;return{lane:r,identifier:o,timestamp:i,conclusion:a,body:t.slice(u).join(`
`).trim()}}var Zp=20;function Jp(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),o=String(t.getHours()).padStart(2,"0"),i=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${o}:${i}`}function My(e){return e.length>Zp?`${e.slice(0,Zp)}\u2026`:e}function qy(e,t,n,r){let o=`${t.lane} ${My(t.identifier)}`;return c`<div class="detail-report">
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
        <span class="detail-report__time">${Jp(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${r&&t.body.length>0?c`<div class="detail-report__body">
          ${wr(t.body)}
        </div>`:""}
  </div>`}function Ny(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${Jp(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${wr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function ef(e,t={},n={}){let r=Array.isArray(e)?e.filter(Boolean):[],o=n.expanded||new Set,i=typeof n.draft=="string"?n.draft:"",s=n.sending===!0,l=r.slice().sort((a,u)=>String(u.created_at||"").localeCompare(String(a.created_at||"")));return c`
    <div class="detail-section-label">댓글 (${r.length})</div>
    ${n.error?c`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:l.length===0?c`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:c`<div class="detail-comments" data-seam="comments">
            ${l.map(a=>{let u=ia(typeof a.text=="string"?a.text:"");return u?qy(a,u,t,o.has(a.id)):Ny(a)})}
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
  `}var{I:SA}=Cc;var tf=e=>e.strings===void 0;var jy={},nf=(e,t=jy)=>e._$AH=t;var $r=Xi(class extends So{constructor(e){if(super(e),e.type!==ar.PROPERTY&&e.type!==ar.ATTRIBUTE&&e.type!==ar.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!tf(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===Rn||t===zt)return t;let n=e.element,r=e.name;if(e.type===ar.PROPERTY){if(t===n[r])return Rn}else if(e.type===ar.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return Rn}else if(e.type===ar.ATTRIBUTE&&n.getAttribute(r)===t+"")return Rn;return nf(e),t}});var Fy=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review",receipt_stage:null,fill_stage:"spec",stale_stage:"spec",hue:"spec"},{id:"plan",label:"\uACC4\uD68D \uB9AC\uBDF0",receipt:null,receipt_stage:"plan",fill_stage:"plan",stale_stage:"plan",hue:"plan"},{id:"impl",label:"\uAD6C\uD604",receipt:null,receipt_stage:null,fill_stage:"impl",stale_stage:null,hue:"impl"},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review",receipt_stage:null,fill_stage:null,stale_stage:"impl",hue:"impl"},{id:"pr",label:"PR",receipt:null,receipt_stage:null,fill_stage:"pr",stale_stage:null,hue:"pr"}],Jl={quick_fix:["impl","impl_review"],spec_backed:["spec","impl","impl_review","pr"],full_plan:["spec","plan","impl","impl_review","pr"]},rf={missing:"\uC2B9\uC778 \uD544\uC694",stale:"\uC7AC\uC2B9\uC778 \uD544\uC694",unknown:"\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"},By={pin:"pin",global:"global",base:"base"};function Uy(e){return c`<span
    class=${`detail-layer-rail detail-layer-rail--${By[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function Wy(e,t,n){switch(e){case"workflow_mode":return Yo;case"spec_review_model":case"impl_review_model":return Vo;case"plan_review_model":return _i;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return mi;case"spec_review_speed":case"plan_review_speed":case"impl_review_speed":return Gn;case"impl_dispatch":return Go;case"impl_runtime":return fi;case"impl_model":return bo(n,t.impl_runtime);case"impl_effort":return Nr(n,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return Gn;case"orchestration_model":return yo(n,null);case"orchestration_effort":return Nr(n,void 0,t.orchestration_model||Sn).filter(r=>r!==Sn);default:return[]}}function zy(e,t){return c`<div class="detail-effective__row" data-key=${e.key}>
    ${Uy(e.source)}
    <span class="detail-effective__k"
      >${hr[e.key]||e.key}</span
    >
    <span
      class=${`detail-effective__v${e.source==="base"?" detail-effective__v--dim":""}`}
      title=${e.full_value||""}
      >${e.display}</span
    >
    <span
      class=${`detail-effective__badge detail-effective__badge--${e.source}`}
      >${hi[e.source]}</span
    >
    ${t.expanded?c`<select
          class="detail-effective__edit"
          data-edit-key=${e.key}
          aria-label=${`${hr[e.key]||e.key} \uD3B8\uC9D1`}
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
  </div>`}function of(e,t){let n=el.flatMap(a=>a.keys),r=tl(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Xu(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),i=Object.fromEntries(r.map(a=>[a.key,a])),s=Object.fromEntries(r.filter(a=>a.value!==null).map(a=>[a.key,a.value])),l=r.filter(a=>a.full_value&&a.display!==a.full_value).map(a=>a.full_value).join(" \xB7 ");return c`<details
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
        >${Hy(i)}</span
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
              ${r.filter(u=>a.keys.includes(u.key)).map(u=>{let d=li({key:u.key,choices:Wy(u.key,s,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return zy(u,{expanded:e.expanded,options:d.options,default_label:d.unset_label,default_full_value:d.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="실행 프리셋"
              .value=${$r(e.preset_id)}
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
  </details>`}function Hy(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let n=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${n}`)}for(let n of["impl_model","impl_effort","impl_speed"])e[n]?.resolution!=="not_applicable"&&t.push(e[n]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function Ky(e){if(!e||typeof e!="object")return null;let{kind:t,actor:n,effort:r,sha:o}=e;return typeof t!="string"||typeof n!="string"||typeof o!="string"?null:{kind:t,actor:n,effort:typeof r=="string"?r:null,sha:o}}function sf(e,t={}){let n=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},o=r.stages||{},i=r.route||n.route||null,s=typeof n.pr_url=="string"?n.pr_url:"",l=typeof n.exec_receipt=="string"?n.exec_receipt:"",a=Ky(r.exec_receipt),u=a?tr(a):l,d=a?`${a.kind}:${a.actor}`:l.split("@")[0],f=si(r.planned_execution,r.exec_receipt),h=r.chips?.pr?.number,g=typeof h=="number"?`PR #${h}`:"PR",k=Xo(n),E=k!==null&&t.isChipOpen?.("rec")===!0,C=E?fl({rec:k},"rec"):null;return c`<section class="detail-summary" data-seam="detail-summary">
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
            >${g}</a
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
            aria-expanded=${E?"true":"false"}
            title=${ki(k)}
            @click=${()=>t.onChipToggle?.("rec")}
          >
            ${"\uBCF5\uC7A1"}
          </button>`:""}
    </div>
    ${C?mo(C):""}
    <div
      class="detail-summary__gates"
      role="group"
      aria-label="워크플로 게이트"
    >
      ${Gy(i).map(te=>Yy(te,n,o,{label:te.id==="pr"?g:te.label,href:te.id==="pr"?s:""}))}
    </div>
  </section>`}function Gy(e){let n=typeof e=="string"&&Object.hasOwn(Jl,e)&&Jl[e]||Jl.spec_backed;return Fy.filter(r=>n.includes(r.id))}var aa={on:"\uD1B5\uACFC",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",current:"\uC9C4\uD589 \uC911",none:"\uBBF8\uB3C4\uB2EC"};function Yy(e,t,n,r){let o=Vy(e,t,n),i=e.fill_stage?n[e.fill_stage]:null,s=typeof i?.fill=="string"?i.fill:null,l=s?s==="full":o.length>0,a=!l&&s==="dim",u=e.stale_stage?n[e.stale_stage]?.stale===!0:!1,d=o&&o.split("@")[1]?.slice(0,7)||"",f=u?aa.stale:l?aa.on:a?aa.current:aa.none,h=Qy(e,n),g=`${r.label} \xB7 ${f}${h?` \xB7 ${h}`:""}${o?` \xB7 ${o}`:""}`,k=`detail-summary__gate${l?" detail-summary__gate--on":""}${a?" detail-summary__gate--current":""}${u?" detail-summary__gate--stale":""}${d?" detail-summary__gate--receipt":""}`,E=c`<span class="detail-summary__gate-label"
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
      title=${g}
      >${E}</a
    >`:c`<span
    class=${k}
    data-gate=${e.id}
    data-hue=${e.hue}
    title=${g}
    >${E}</span
  >`}function Vy(e,t,n){if(e.receipt&&typeof t[e.receipt]=="string")return String(t[e.receipt]);if(e.receipt_stage){let r=n[e.receipt_stage]?.receipt;return typeof r=="string"?r:""}return""}function Qy(e,t){if(e.id!=="plan")return"";let n=t.plan?.approval_state;return typeof n=="string"&&Object.hasOwn(rf,n)?rf[n]:""}function la(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function af(e){return la(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function lf(e,t){let n=e&&e[t];if(!la(n)||!Array.isArray(n.accounts))return null;let r=n.accounts.filter(af),o=af(n.active)?n.active:null;return{accounts:r,active:o||r.find(i=>i.active===!0)||null}}function df(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function ca(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${df(e)}${t}`}function Co(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${df(e)}`}function Xy(e,t,n){if(n!==null){let o=e==="claude"?ca:Co,i=t?t.accounts.find(s=>s.key===n):void 0;return`\uB808\uD3EC \uAE30\uBCF8\uAC12 \uC0AC\uC6A9(${i?o(i):n})`}return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:Co({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function cf(e,t){if(!la(e)||e.state!=="usable"||!la(e.values))return null;let n=e.values[t];return typeof n=="string"&&n.length>0?n:null}function uf(e){let t=e.provider_key==="claude"?ca:Co,n=!!e.provider?.accounts.some(r=>r.key===e.selected);return c`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${r=>e.handlers.onExecChange(e.key,r.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${Xy(e.provider_key,e.provider,e.workspace_default)}
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
  </div>`}function pf({md:e,catalog:t,workspace_defaults:n=null,handlers:r}){let o=typeof e.claude_account=="string"?e.claude_account:"",i=typeof e.codex_account=="string"?e.codex_account:"";return c`<section class="exec-accounts" data-exec-accounts>
    <div class="detail-section-label">실행 계정</div>
    <div class="exec-settings-core">
      ${uf({key:"claude_account",title:"Claude \uACC4\uC815",provider_key:"claude",provider:lf(t,"claude"),selected:o,workspace_default:cf(n,"claude_account"),handlers:r,hint:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uB7F0\uD0C0\uC784\uC774 claude\uC77C \uB54C \uC801\uC6A9\uB429\uB2C8\uB2E4"})}
      ${uf({key:"codex_account",title:"Codex \uACC4\uC815",provider_key:"codex",provider:lf(t,"codex"),selected:i,workspace_default:cf(n,"codex_account"),handlers:r})}
    </div>
  </section>`}function Zy(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function Jy(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let n=t[1].trim();return{front:n.length>0?n:null,body:e.slice(t[0].length)}}function ua(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),o=null,i="loading",s="",l=null,a="";function u(E){E.key==="Escape"&&o&&(E.preventDefault(),g())}document.addEventListener("keydown",u);function d(){return o?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>g()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${o}
              >${Zy(o)}</span
            >
            <button
              type="button"
              class="mv__close"
              aria-label="닫기"
              @click=${()=>g()}
            >
              ✕
            </button>
          </div>
          <div class="mv__body">
            ${i==="loading"?c`<div class="mv__status">불러오는 중…</div>`:i==="pending"?c`<div class="mv__status">${a}</div>`:i==="error"?c`<div class="mv__status mv__status--error">
                      ${a||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:c`${l===null?null:c`<pre class="mv__front">
${l}</pre
                        >`}${wr(s)}`}
          </div>
        </div>
      </div>
    `:c``}function f(){dt(d(),e)}async function h(E,C={}){o=E,i="loading",s="",l=null,a="",f();let te=C.workspace||(n?n():"");if(!te){i="error",a="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",f();return}if(!r){i="error",a="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",f();return}let ie="/api/doc?workspace="+encodeURIComponent(te)+"&path="+encodeURIComponent(E);try{let z=await r(ie),P=await z.json().catch(()=>({}));if(!z.ok||!P||P.ok!==!0){if(P?.error==="not_found"&&C.missing_state==="plan_pending"){i="pending",a="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",f();return}i="error",a="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(P&&P.error||z.status)+")",f();return}let I=Jy(String(P.content||""));l=I.front,s=I.body,i="ready",f()}catch{i="error",a="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",f()}}function g(){o=null,dt(c``,e)}function k(){document.removeEventListener("keydown",u),g()}return{open:h,close:g,destroy:k}}var ev=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],mf="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",da=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],tv=new Set(["codex-runner","Explore","Plan","advisor","advisor-xhigh","claude-code-guide","statusline-setup"]);function ff(e){return typeof e=="string"&&tv.has(e)}var nv=["running","done","failed","interrupted"],rv={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function ov(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function sv(e){let t=pn(e);if(t.length>0)return t.map(o=>c`<span class="detail-usage-total" title=${o.tooltip}
          >${o.label}</span
        >`);let n=fo(e);if(!n||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${n.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${mf}
          >부분 집계</span
        >`:""}`}function _f(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function nc(e){if(typeof e=="number")return Rs(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?Rs(t):""}function iv(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function gf(e,t,n){if(e.provider!=="claude"){let o=e.session_id?` \xB7 thread ${e.session_id}`:"",i=n?" \xB7 \uC774\uC804 \uB77C\uC6B4\uB4DC \uC2A4\uB808\uB4DC \uC774\uC5B4\uAC10":"";return{text:`${n?"\u21A9 ":""}${e.launch_id}`,title:`${e.launch_id}${o}${i}`,thread:e.session_id?{text:e.session_id.slice(0,8),title:e.session_id}:null}}let r=t&&typeof t.agent_id=="string"?t.agent_id:"";return r.length>0?{text:r.slice(0,8),title:r,thread:null}:{text:e.launch_id.slice(-8),title:e.launch_id,thread:null}}function hf(e){return e?c`<span
        class="detail-session__leg-thread detail-session__sid"
        title=${e.title}
        >${e.text}</span
      >`:""}function ec(e){return e===null||typeof e=="string"&&e.trim().length>0}function tc(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function av(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,n=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!da.some(r=>r.role===t.role&&r.provider===t.provider)||!(n?ec(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||ec(t.effort))||!(!("agent_type"in t)||ec(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!nv.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:n?!tc(t.started_at)||!tc(t.last_event_at)||!tc(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function lv(e,t,n,r){let i=pn({providers:{[t]:{subtotal:n.subtotal,breakdown:n.usage,...n.replayed?{replayed:!0}:{}}},roles:{}})[0],s=gf({provider:t,launch_id:n.receipt_id,session_id:typeof n.session_id=="string"?n.session_id:void 0},n,r);return c`<div class="detail-session__leg detail-session__usage-detail">
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
    ${hf(s.thread)}
    ${nc(n.completed_at)?c`<span class="detail-session__leg-time detail-session__time"
          >${nc(n.completed_at)}</span
        >`:""}
    ${i?c`<span class="detail-session__usage" title=${i.tooltip}
          >${i.label}</span
        >`:""}
  </div>`}function cv(e,t,n,r,o){let i=e.status==="running"?null:t,l=(i?pn({providers:{[e.provider]:{subtotal:i.subtotal,breakdown:i.usage,...i.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],a=e.status==="running"?Rs(e.last_event_at):i?nc(i.completed_at):"",u=(e.provider==="claude"?["Claude",e.agent_type,iv(e.model),e.effort]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),d=gf(e,i,o);return c`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>r.onOpenDelegation&&r.onOpenDelegation(n,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${rv[e.status]}</span
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
    ${hf(d.thread)}
    ${a?c`<span class="detail-session__leg-time detail-session__time"
          >${a}</span
        >`:""}
    ${l?c`<span class="detail-session__usage" title=${l.tooltip}
          >${l.label}</span
        >`:""}
  </button>`}function uv(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}function dv(e,t,n){let r=[],o=new Set,i=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let f of i){let h=av(f);!h||o.has(h.launch_id)||ff(h.agent_type)||(o.add(h.launch_id),r.push(h))}r.sort((f,h)=>(f.started_at||0)-(h.started_at||0));let s={};for(let{role:f,provider:h}of da){let g=t?t.roles[f]?.[h]:null;s[f]=g?[...g.legs]:[]}let l=da.flatMap(({role:f})=>s[f]),a=new Set,u=new Set,d=[];for(let{role:f,provider:h}of da){for(let g of r.filter(k=>k.role===f&&k.provider===h)){let k=l.find(C=>C.receipt_id===g.launch_id)||null;if(k&&!uv(g,k))continue;k&&a.add(k.receipt_id);let E=h==="codex"&&u.has(g.session_id);d.push(cv(g,k,e.attempt_id,n,E)),h==="codex"&&u.add(g.session_id)}for(let g of s[f])if(!a.has(g.receipt_id)&&!ff(g.agent_type)){let k=typeof g.session_id=="string"&&g.session_id.length>0?g.session_id:null,E=h==="codex"&&k!==null&&u.has(k);d.push(lv(f,h,g,E)),h==="codex"&&k!==null&&u.add(k)}}return d}function pv(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[...ev,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return c`<div class="detail-session__usage-detail">
    ${r.map(o=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${o.label}</span
          ><span class="detail-session__usage-value"
            >${ov(e[o.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${n===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${n.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${mf}</span>`:""}
  </div>`}var fv={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Rs(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function _v(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,r])=>typeof r=="string"&&r.length>0).map(([r,o])=>`${r}=${o}`).join(" \xB7 "):"",n=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${n}</span>
    ${t?c`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}var mv={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function gv(e,t){let n=mv[e.locality]||"",r=e.locality==="remote"?`${e.host} \xB7 \uB2E4\uB978 \uBA38\uC2E0`:e.locality==="missing"?`${e.host} \xB7 \uD30C\uC77C \uC5C6\uC74C`:e.host;return c`<div class="detail-session-row">
    <button
      type="button"
      class="detail-session detail-session--session"
      data-session-key=${Ka(e)}
      ?disabled=${n.length>0}
      title=${n}
      @click=${()=>{n.length===0&&t.onOpenSessionRef&&t.onOpenSessionRef(e)}}
    >
      <span class="detail-session__glyph">${e.current?"\u25D0":"\xB7"}</span>
      <span class="detail-session__id">${Wo(e)}</span>
      <span class="detail-session__meta">${r}</span>
      <span class="detail-session__sid" title=${e.session_id}
        >${e.session_id.slice(0,8)}</span
      >
      <span class="detail-session__time">${Rs(e.last_event_at)}</span>
    </button>
    ${e.resume_command?c`<button
          type="button"
          class="op-btn detail-session__resume-cmd"
          title=${e.resume_command}
          @click=${o=>{o.stopPropagation(),t.onCopyResumeCommand&&e.resume_command&&t.onCopyResumeCommand(e.resume_command)}}
        >
          ⧉ 재개
        </button>`:""}
  </div>`}function bf(e,t={},n={},r=[]){let o=Array.isArray(e)?e:[],i=Array.isArray(r)?r:[],s=[...i.filter(g=>g&&g.current===!0),...i.filter(g=>g&&g.current!==!0).sort((g,k)=>k.index-g.index)],l=s.map(g=>gv(g,t)),a=n.expanded||new Set;if(o.length===0&&s.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let u=new Set;for(let g of o)g&&typeof g.resumed_from=="string"&&g.resumed_from.length>0&&u.add(g.resumed_from);let d=g=>{if(!(g.status==="failed"||g.status==="orphaned"))return"";let E=typeof g.session_id=="string"&&g.session_id.length>0,C=u.has(g.attempt_id),te=E&&!C,ie=E?C?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="op-btn detail-session__resume"
      data-attempt-id=${g.attempt_id}
      ?disabled=${!te}
      title=${ie}
      @click=${z=>{z.stopPropagation(),te&&t.onResume&&t.onResume(g.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},f=g=>{if(!(g.status==="failed"||g.status==="orphaned")||typeof g.cause!="string"||g.cause==="")return"";let E=g.cause_detail,C=E&&typeof E.reason=="string"&&E.reason.length>0?typeof E.command=="string"&&E.command.length>0?`${E.reason} \xB7 ${E.command}`:E.reason:g.cause;return c`<div class="detail-session__cause" title=${C}>
      ${g.cause}
    </div>`},h=g=>{let k=_f(Qa(g));if(pn(k).length===0&&!fo(g.usage))return"";let E=a.has(g.attempt_id);return c`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${g.attempt_id}
      aria-expanded=${E?"true":"false"}
      title=${E?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${C=>{C.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(g.attempt_id)}}
    >
      τ 자세히
    </button>`};return c`
    <div class="detail-section-label">
      세션 이력${sv(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${l}${o.map(g=>{let k=Qa(g),E=_f(k),C=pn(E);return c`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${g.status||"unknown"}"
            data-attempt-id=${g.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(g.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${fv[g.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${g.attempt_id}</span>
            ${Uo(g)?c`<span
                  class="detail-session__resumed"
                  title=${Uo(g)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${Tn(g)}</span>
            ${C.length>0?c`<span class="detail-session__role">orchestrator</span>`:""}
            ${g.session_id?c`<span class="detail-session__sid" title=${g.session_id}
                  >${String(g.session_id).slice(0,8)}</span
                >`:""}
            ${C.length>0?C.map(te=>c`<span
                      class="detail-session__usage"
                      title=${te.tooltip}
                      >${te.label}</span
                    >`):fo(g.usage)?c`<span class="detail-session__usage"
                    >${fo(g.usage)}</span
                  >`:""}
            <span class="detail-session__time">${Rs(g.started_at)}</span>
          </button>
          ${h(g)} ${d(g)} ${f(g)} ${_v(g)}
          ${a.has(g.attempt_id)&&g.usage?pv(g.usage,g.runner==="codex"?"codex":"claude"):""}
          ${dv(g,k,t)}
        </div>`})}
    </div>
  `}function yf(e,t={}){return c`
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
          ${hv(e)}
        </div>`:""}
  `}function hv(e){let t=Eo(e);if(t)return t;let n=e.data;if(!n)return"";if(n.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof n.default_task_prompt=="string"?cr("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=sa(n.recorded_at);return c`<div class="detail-prompt__meta">
      ${n.attempt_id}${r?` \xB7 ${r}`:""}
    </div>
    ${typeof n.task_prompt=="string"?cr("\uACFC\uC5C5 (user)",n.task_prompt):""}
    ${typeof n.system_prompt=="string"?cr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",n.system_prompt):""}`}var Vr=10;function vf(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}function kf(e,t={}){let r=(Array.isArray(e?.events)?e.events:[]).filter(l=>l&&typeof l.summary=="string"&&l.summary.trim().length>0);if(r.length===0)return"";let o=typeof e.shown=="number"&&e.shown>0?e.shown:Vr,i=r.slice(0,o),s=r.length-i.length;return c`
    <div class="detail-section-label">Worker 이력 (${r.length})</div>
    <ol class="detail-timeline" data-seam="worker-timeline">
      ${i.map(l=>c`<li class="detail-timeline__row">
            ${vf(l.at)?c`<span class="detail-timeline__at"
                  >${vf(l.at)}</span
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
  `}var bv=["open","in_progress","deferred","resolved","closed"],yv=[0,1,2,3,4];function wf(e,t){let n=t.issueStores,r=t.onClose,o=t.transport,i=t.onNavigate,s=t.queueStore,l=t.execPresetStore,a=t.sessionLogStore,u=null,d=null,f={},h="",g=!1,k=[],E=!1,C=!1,te={},ie={claude:null,codex:null},z=null,P=null,I=0,q=!1,F=!1,H="",U="",M="",Q="",B=!1;function ne(){q=!1,F=!1,H="",U="",M="",Q="",B=!1}function ge(){ie={claude:null,codex:null},z=null,P=null,I+=1}async function Oe(){if(!o)return null;try{let v=await Promise.resolve(o("get-workspace-accounts",{}));return v&&typeof v.state=="string"?v:null}catch{return null}}async function K(v){try{let L=await fetch(v);if(!L.ok)return null;let N=await L.json();if(!N||typeof N!="object"||!Array.isArray(N.accounts))return null;let ke=N.accounts.filter(We=>We!==null&&typeof We=="object"&&!Array.isArray(We));return{accounts:ke,active:ke.find(We=>We.active===!0)||null}}catch{return null}}async function re(v){P=v;let L=++I,[N,ke,We]=await Promise.all([K("/api/claude-usage"),K("/api/codex-usage"),Oe()]);L!==I||v!==u||(ie={claude:N,codex:ke},z=We,rt())}let pe=[],Te=null,Y=null,ae=!1,Z="",be=!1,Ie=0,ye=new Set;function Le(){pe=[],Te=null,Y=null,ae=!1,Z="",be=!1,Ie+=1,ye.clear()}async function Ge(v){if(!o)return;let L=++Ie;try{let N=await Promise.resolve(o("get-comments",{id:v}));if(L!==Ie||v!==u)return;pe=Array.isArray(N)?N:[],ae=!1}catch{if(L!==Ie||v!==u)return;ae=!0}rt()}function gt(){if(!o||!u)return;let v=d&&typeof d.comment_count=="number"?d.comment_count:null;if(Te!==u){Te=u,Y=v,Ge(u);return}v!==null&&v!==Y&&(Y=v,Ge(u))}function V(v){ye.has(v)?ye.delete(v):ye.add(v),rt()}function J(v){let L=Z.trim().length===0;Z=v,L!==(v.trim().length===0)&&rt()}async function oe(){let v=Z.trim();if(!o||!u||v.length===0||be)return;let L=u;be=!0,rt();let N=!1;try{let ke=await Promise.resolve(o("add-comment",{id:L,text:v}));Array.isArray(ke)&&ke.length>0&&(N=!0,L===u&&(pe=ke,ae=!1,Z="",Y=ke.length))}catch{N=!1}N||me("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),L===u&&(be=!1),rt()}let de={onToggle:V,onDraftInput:J,onSubmit:oe},Ee=t.mdViewer||null,_e=null;Ee||(_e=document.createElement("div"),_e.className="md-viewer-root",document.body.appendChild(_e));let Re=Ee||ua(_e,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),Fe=document.createElement("div");Fe.className="session-log-root",document.body.appendChild(Fe);let Ye=To(Fe,{transport:o?(v,L)=>Promise.resolve(o(v,L)):void 0,sessionLogStore:a}),Be=!1,ee=!1,G=!1,Se=null,ht=null,at=0;function ze(v){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${v}`}function et(){Be=!1,ee=!1,G=!1,Se=null,ht=null,at+=1}async function St(v){if(!o)return;let L=++at;ee=!0,G=!1,rt();try{let N=await Promise.resolve(o("get-bead-prompt",{bead_id:v}));if(L!==at)return;!N||typeof N!="object"||Array.isArray(N)?G=!0:(Se=N,ht=ze(v))}catch{L===at&&(G=!0)}finally{L===at&&(ee=!1,rt())}}let pt=[],Ve=null,w=0;function se(v,L){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${v}::${L}`}function Me(){pt=[],Ve=null,w+=1}async function Ue(v,L){if(!o)return;let N=++w,ke;try{ke=await Promise.resolve(o("get-session-refs",{bead_id:v}))}catch{ke=null}N!==w||L!==Ve||(pt=ke&&Array.isArray(ke.sessions)?ke.sessions:[],rt())}function Ze(){if(!o||!u)return;let v=d&&d.metadata,L=v&&typeof v=="object"&&typeof v.session_ref=="string"?v.session_ref:null;if(L===null){Me();return}let N=se(u,L);Ve!==N&&(pt=[],Ve=N,Ue(u,N))}let Pe=[],tt=[],$t=Vr,qt=null,Dt=0;function ue(v){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${v}`}function he(){Pe=[],tt=[],$t=Vr,qt=null,Dt+=1}async function Ke(v,L){if(!o)return;let N=++Dt,ke;try{ke=await Promise.resolve(o("get-bead-timeline",{bead_id:v}))}catch{ke=null}N!==Dt||L!==qt||(Pe=ke&&Array.isArray(ke.events)?ke.events:[],tt=ke&&Array.isArray(ke.attempts)?ke.attempts:[],$t=Vr,rt())}function nt(){if(!o||!u)return;let v=ue(u);qt!==v&&(Pe=[],tt=[],$t=Vr,qt=v,Ke(u,v))}function Je(){$t+=Vr,rt()}function ut(){if(Be=!Be,Be&&u&&ht!==ze(u)){Se=null,St(u);return}rt()}function ft(){let v={};for(let N of tt)N&&typeof N=="object"&&N.bead_id===u&&(v[String(N.attempt_id)]=N);let L=s?s.get():null;for(let N of L&&L.attempts?Object.values(L.attempts):[]){let ke=N;ke&&ke.bead_id===u&&(v[String(ke.attempt_id)]=ke)}return v}function ot(){return u?Object.values(ft()).sort((L,N)=>(N.started_at||0)-(L.started_at||0)).map(L=>({attempt_id:L.attempt_id,bead_id:L.bead_id,status:L.status,started_at:typeof L.started_at=="number"?L.started_at:null,runner:L.runner||null,model:L.model||null,effort:L.effort||L.observed_effort||null,speed:L.speed||null,session_id:L.session_id||null,resumed_from:L.resumed_from||null,continuation_mode:L.continuation_mode||null,dismissed_at:typeof L.dismissed_at=="number"?L.dismissed_at:null,cause:typeof L.cause=="string"?L.cause:null,cause_detail:L.cause_detail||null,exec_default_preset_id:typeof L.exec_default_preset_id=="string"?L.exec_default_preset_id:null,exec_default_preset_revision:typeof L.exec_default_preset_revision=="number"?L.exec_default_preset_revision:null,exec_values:L.exec_values&&typeof L.exec_values=="object"?L.exec_values:null,usage:L.usage||null,usage_legs:Array.isArray(L.usage_legs)?L.usage_legs:[],delegation_sessions:Array.isArray(L.delegation_sessions)?L.delegation_sessions:[]})):[]}function Ne(){return u?rr(ft(),u):null}let A=new Set;function j(v){A.has(v)?A.delete(v):A.add(v),rt()}function W(v){let L=s?s.get():null,N=L&&L.attempts?L.attempts[v]:null;Ye.open({attempt_id:v,meta:N?{runner:N.runner||void 0,model:N.model||void 0,effort:N.effort||void 0,status:N.status||void 0,session_id:N.session_id||void 0}:{}})}function $e(v,L){let N=s?s.get():null,ke=N&&N.attempts?N.attempts[v]:null,lt=(ke&&Array.isArray(ke.delegation_sessions)?ke.delegation_sessions:[]).find(Pt=>Pt&&typeof Pt=="object"&&Pt.launch_id===L);lt&&Ye.open({attempt_id:v,launch_id:L,meta:{runner:lt.provider==="claude"?"claude":"codex",role:lt.role,...typeof lt.agent_type=="string"?{agent_type:lt.agent_type}:{},model:lt.model,effort:lt.effort,session_id:lt.session_id,status:lt.status}})}async function we(v){if(!o||!v)return;let L=o,N=()=>{let We=s?s.get():null;return We&&typeof We.revision=="number"?We.revision:0},ke=s?.get()?.attempts?.[v]||null;await co({context:{bead_id:ke?.bead_id||u||"",kind:"session",tuple:ke?Tn(ke):""},transport:We=>L("worker-attempt-resume",{attempt_id:v,expected_revision:N(),...We}),adopt:We=>{We?.queue&&s?.set&&s.set(We.queue)}})}async function _t(v,L){if(!o||!v)return;let N=o,ke=()=>{let mt=s?s.get():null;return{bead_id:v,...L==="parallel"?{}:{lane:L},expected_revision:mt&&typeof mt.revision=="number"?mt.revision:0}},We=mt=>{mt?.queue&&s?.set&&s.set(mt.queue)},lt=await Promise.resolve(N("worker-queue-place",ke()));if(We(lt),lt&&lt.conflict&&(lt=await Promise.resolve(N("worker-queue-place",ke())),We(lt)),rt(),!lt)return;if(lt.applied===!1&&typeof lt.admission_reason=="string"){me(`\uB300\uAE30 \uC801\uC7AC \uAC70\uBD80: ${lt.admission_reason}`,"error",2400);return}if(lt.reason==="rejected"){me("\uB300\uAE30 \uC801\uC7AC \uAC70\uBD80: rejected","error",2400);return}if(lt.applied===!1)return;let Pt=lt.queue?ts({id:v},lt.queue).location:null;Pt&&"index"in Pt&&me(`${gd(Pt.lane)} \uB300\uAE30 #${Pt.index+1}\uC5D0 \uCD94\uAC00`,"success",2400)}function kt(v,L){if(L){C=!0,rt();return}_t(v,"parallel")}function vt(v,L){let We=(v.target?.closest?.(".worker-card__place-lane")||null)?.dataset.lane;We&&(We!=="parallel"&&!/^s[1-5]$/.test(We)||(C=!1,rt(),_t(L,We)))}function Tt(v){!v||!u||Ye.open(uo(v,u,d&&d.status))}let Wt={onOpen:W,onOpenDelegation:$e,onResume:we,onToggleUsage:j,onOpenSessionRef:Tt,onCopyResumeCommand:Xt};function Ht(){let v=s?s.get():null,L={...te};for(let N of[...Pn,...go]){let ke=v&&v[N];typeof ke=="string"&&(L[N]=ke)}return L}async function Nt(){if(o){try{let v=await Promise.resolve(o("get-session-defaults",{}));te=v&&v.values&&typeof v.values=="object"?v.values:{}}catch{te={}}rt()}}function wt(){let v=s?s.get():null;return v&&v.runner_catalog||null}function Jt(){let v=s?s.get():null;return v&&typeof v.execution_defaults=="object"?v.execution_defaults:null}function Kt(){let v=d?.metadata&&typeof d.metadata=="object"?d.metadata:{},N=Cn({pin:{...v,...f},global:Ht(),execution_defaults:Jt(),runner_catalog:wt(),route:typeof v.route=="string"?v.route:null}).orchestration_model.value||"";return Mn(wt(),N)}function jt(){let v=l?l.get():null;return!v||typeof v.revision!="number"?null:{revision:v.revision,presets:Array.isArray(v.presets)?v.presets:[]}}function Ft(v){return v?.compatible===!1}function Qt(v){l&&v&&typeof v.revision=="number"&&Array.isArray(v.presets)&&l.set({revision:v.revision,presets:v.presets})}async function Ae(){let v=jt(),L=v?.presets.find(N=>N.id===h);if(!(!o||!u||!v||!L||Ft(L)||g)){g=!0,k=[],rt();try{let N=await Promise.resolve(o("apply-impl-preset",Ju(u,L.id,v.revision)));if(N&&N.conflict){Qt(N),me("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let ke=N&&Array.isArray(N.issue)?N.issue[0]:N?.issue;if(N&&N.applied&&ke&&typeof ke=="object"){d=ke,k=Array.isArray(N.skipped_orchestration_keys)?N.skipped_orchestration_keys.filter(We=>typeof We=="string"):[];for(let We of ed)delete f[We];me(k.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}N&&N.error==="bd_readback_failed"?me("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):me("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(N){N&&typeof N=="object"&&N.code==="bd_readback_failed"?me("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):me("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{g=!1,rt()}}}let S=null;n&&n.subscribe&&(S=n.subscribe(()=>Gt()));let ve=null;s&&typeof s.subscribe=="function"&&(ve=s.subscribe(()=>{u&&rt()}));let De=null,bt=null;function je(){bt&&(bt(),bt=null)}l&&typeof l.subscribe=="function"&&(De=l.subscribe(()=>{u&&rt()}));function Et(v){v.key==="Escape"&&u&&(v.preventDefault(),r())}document.addEventListener("keydown",Et);let It=_o(()=>rt());It.attach();function Gt(){if(u){if(n&&typeof n.snapshotFor=="function"){let v=n.snapshotFor("detail:"+u)||[];d=v.find(N=>N&&N.id===u)||v[0]||d}gt(),Ze(),nt(),rt()}}function Xt(v){yn(v).then(L=>{L?me("\uBCF5\uC0AC\uB428","success",1200):me("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function x(v){v.preventDefault(),v.stopPropagation(),u&&Xt(u)}function O(v,L){v.preventDefault(),v.stopPropagation(),Xt(L)}function Ce(v,L,N){v.preventDefault(),v.stopPropagation(),Re.open(L,{missing_state:N})}async function m(v,L){let N=Object.hasOwn(f,v),ke=f[v];if(f[v]=L,rt(),!(!o||!u))try{let We=await Promise.resolve(o("update-exec-settings",Zu(u,v,L.length===0?null:L))),lt=Array.isArray(We)?We[0]:We;if(!lt||typeof lt!="object"||!lt.id)throw new Error("exec settings readback failed");d=lt,delete f[v],rt()}catch(We){throw N?f[v]=ke:delete f[v],rt(),me("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error"),We}}function _(v){v.catch(()=>{})}async function T(v,L){let N=d||{},ke=N.metadata&&typeof N.metadata=="object"?N.metadata:{},We={};for(let mt of["impl_runtime","impl_model","impl_effort"])We[mt]=Object.hasOwn(f,mt)?f[mt]:typeof ke[mt]=="string"?ke[mt]:"";We[v]=L;let lt=rd(We,wt(),Kt()),Pt={};for(let mt of["impl_runtime","impl_model","impl_effort"])Pt[mt]=f[mt],f[mt]=lt[mt]||"";if(rt(),!(!o||!u))return Promise.resolve(o("update-impl-target",{id:u,...lt,orchestration_runtime:Kt()})).then(mt=>{let ce=Array.isArray(mt)?mt[0]:mt;if(!ce||typeof ce!="object"||!ce.id)throw new Error("implementation target readback failed");d=ce;for(let it of["impl_runtime","impl_model","impl_effort"])delete f[it];rt()}).catch(mt=>{for(let ce of["impl_runtime","impl_model","impl_effort"])Pt[ce]===void 0?delete f[ce]:f[ce]=Pt[ce];throw rt(),me("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error"),mt})}async function p(v,L,N){if(!o||!u)return!1;try{let ke=await Promise.resolve(o(v,L)),We=Array.isArray(ke)?ke[0]:ke;return We&&typeof We=="object"&&We.id?(d=We,!0):(me(N,"error"),!1)}catch(ke){return ke&&typeof ke=="object"&&ke.code==="bd_readback_failed"?(me("\uC800\uC7A5\uB410\uC73C\uB098 \uD655\uC778 \uC2E4\uD328 \u2014 \uACE7 \uAC31\uC2E0\uB429\uB2C8\uB2E4","error"),{ok:!1,saved:!0}):(me(b(N,ke),"error"),!1)}}function b(v,L){let N=L&&typeof L=="object"&&typeof L.message=="string"?L.message.trim():"";return N.length>0?`${v} \u2014 ${N}`:v}function D(v){setTimeout(()=>{try{let L=e.querySelector(v);L&&typeof L.focus=="function"&&L.focus()}catch{}},0)}function X(){q=!0,H=d&&d.title||"",rt(),D('.detail-edit__input[data-edit="title"]')}function fe(v){H=v.target.value}function st(){q=!1,H="",rt()}function xt(){p("edit-text",{id:u,field:"title",value:H},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(L=>{L===!0&&(q=!1,H=""),rt()})}function _n(){F=!0,U=d&&d.description||"",rt(),D('.detail-edit__textarea[data-edit="description"]')}function hn(v){U=v.target.value}function ln(){F=!1,U="",rt()}function Yt(){p("edit-text",{id:u,field:"description",value:U},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(L=>{L===!0&&(F=!1,U=""),rt()})}function cn(v,L,N,ke){if(v.key==="Escape"){v.stopPropagation(),N();return}v.key==="Enter"&&(!ke||v.ctrlKey||v.metaKey)&&(v.preventDefault(),L())}function en(v){let L=v.target.value;p("update-status",{id:u,status:L},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>rt())}function Zr(v){let L=Number(v.target.value);p("update-priority",{id:u,priority:L},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>rt())}function Tr(v){M=v.target.value}function Ps(){let v=M.trim();v.length!==0&&p("label-add",{id:u,label:v},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(L=>{L===!0&&(M=""),rt()})}function Ea(v){if(v.key==="Escape"){v.stopPropagation(),M="",rt();return}v.key==="Enter"&&(v.preventDefault(),Ps())}function Ms(v){p("label-remove",{id:u,label:v},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>rt())}let qs={onCopyPath:O,onOpenDoc:Ce};function $(v){return typeof v=="string"?v:v&&typeof v=="object"?String(v.id||v.to||v.issue_id||v.depends_on||""):""}function y(v){return v&&typeof v=="object"?String(v.dependency_type||v.type||""):""}function R(v){switch(v){case"discovered-from":return{glyph:"\u21A9 ",relation:"\uBC1C\uACAC"};case"parent-child":return{glyph:"\u2338 ",relation:"\uC0C1\uC704"};case"related":return{glyph:"\u2194 ",relation:"\uAD00\uB828"};default:return v.length>0?{glyph:`${v} `,relation:v}:{glyph:"",relation:""}}}function le(v,L){let N=xe(L),ke=[];return v.length>0&&ke.push(v),N&&ke.push(N),ke.length>0?ke.join(`
`):void 0}function xe(v){if(!v||typeof v!="object")return;let L=typeof v.status=="string"?v.status:"",N=typeof v.title=="string"?v.title:"";return L.length>0&&N.length>0?`${L} \xB7 ${N}`:void 0}function qe(){return(t.getWorkspacePath&&t.getWorkspacePath()||"").trim()}function Qe(){return t.depCandidates?t.depCandidates():null}async function Rt(v,L,N){let ke=qe(),We=u;if(!We)return;if(ke.length===0){me("\uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}let lt=await p(v,{a:We,b:L,view_id:We,root_dir:ke},N),Pt=lt===!0||lt!==!1&&lt.saved===!0;Pt&&t.onDepChanged&&t.onDepChanged({type:v,a:We,b:L}),v==="dep-add"&&Pt&&(Q="",B=!1),rt()}function tn(v){if(!u)return;let L=globalThis.confirm;typeof L=="function"&&!L(`${v}\uAC00 ${u}\uB97C \uB9C9\uB294 \uC5F0\uACB0\uC744 \uB04A\uC744\uAE4C\uC694?`)||Rt("dep-remove",v,"\uC758\uC874 \uD574\uC81C \uC2E4\uD328")}function ct(v){v.disabled||dn(v.bead_id)}function dn(v){Rt("dep-add",v,"\uC758\uC874 \uCD94\uAC00 \uC2E4\uD328")}function xn(v,L){let N=Q.trim();return!_p(N)||N===u||L.includes(N)||v.some(ke=>ke.bead_id===N)?null:N}function Cr(v){Q=v.target.value,B=!0,rt()}function Wn(){B||(B=!0,rt())}function Vn(v,L,N){if(v.key==="Escape"){v.stopPropagation(),Q="",B=!1,rt();return}v.key==="Enter"&&(v.preventDefault(),L.length===1&&!L[0].disabled?ct(L[0]):N!==null&&dn(N))}function Qn(v,L){return c`<div class="detail-dep-add">
      <input
        class="detail-dep-add__input"
        aria-label="막는 이슈 추가"
        placeholder="막는 이슈 추가"
        .value=${Q}
        @focus=${Wn}
        @input=${Cr}
        @keydown=${N=>Vn(N,v,L)}
      />
      ${B||Q.length>0?c`<div class="detail-dep-add__list">
            ${v.length===0&&L===null?c`<div class="detail-dep-add__empty">후보 없음</div>`:v.map(N=>c`<button
                      type="button"
                      class="detail-dep-add__cand"
                      data-dep-cand=${N.bead_id}
                      ?disabled=${N.disabled}
                      title=${mn(N.reason)}
                      @click=${()=>ct(N)}
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
            ${L===null?"":c`<button
                  type="button"
                  class="detail-dep-add__cand"
                  data-dep-cand=${L}
                  data-dep-direct="1"
                  @click=${()=>dn(L)}
                >
                  <span class="detail-dep-add__id">${L}</span>
                  <span class="detail-dep-add__title">직접 추가</span>
                </button>`}
          </div>`:""}
    </div>`}function Xn(v,L){let N=L.get(v.id),ke=i?c`<button
          type="button"
          class="detail-dep__link"
          title=${mn(v.title)}
          @click=${()=>N===void 0?i(v.id):i(v.id,N)}
        >
          ${v.label}
        </button>`:c`<span class="detail-dep__link" title=${mn(v.title)}
          >${v.label}</span
        >`;return c`<span
      class=${`detail-dep detail-dep--${v.kind}${i?" detail-dep--link":""}`}
      >${ke}${v.kind==="pred"?c`<button
            type="button"
            class="detail-dep__unlink"
            data-dep-b=${v.id}
            aria-label=${"\uC758\uC874 \uD574\uC81C: "+v.id}
            @click=${()=>tn(v.id)}
          >
            ✕
          </button>`:""}</span
    >`}function un(v){let L=Array.isArray(v.dependencies)?v.dependencies:[],N=Array.isArray(v.dependents)?v.dependents:[],ke=[];for(let ce of L){let it=$(ce);it.length>0&&y(ce)==="blocks"&&ke.push({id:it,label:`\u26D3 ${it}`,kind:"pred",title:le("\uB9C9\uB294",ce)})}for(let ce of N){let it=$(ce);it.length>0&&y(ce)==="blocks"&&ke.push({id:it,label:`\u2192 ${it}`,kind:"succ",title:le("\uB9C9\uD788\uB294",ce)})}for(let ce of L){let it=$(ce),Vt=y(ce);if(it.length>0&&Vt!=="blocks"){let nn=R(Vt);ke.push({id:it,label:`${nn.glyph}${it}`,kind:"other",title:le(nn.relation,ce)})}}let We=Qe(),lt=new Map;if(We)for(let ce of We.issues)lt.has(ce.bead_id)||lt.set(ce.bead_id,ce.root_dir);let Pt=We&&u?fp(pp(u,We),Q):[],mt=xn(Pt,ke.filter(ce=>ce.kind==="pred").map(ce=>ce.id));return c`
      <div class="detail-section-label">의존성</div>
      ${ke.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${ke.map(ce=>Xn(ce,lt))}
          </div>`}
      ${We===null?c`<div class="detail-empty">후보를 불러올 수 없음</div>`:Qn(Pt,mt)}
    `}function Zn(v){let L=v.metadata||{},N=v.workflow||{},ke=N.stages||{},We=ke.spec&&ke.spec.stale,lt=ke.impl&&ke.impl.stale,Pt=N.quick_fix_review?.state==="stale",mt=ke.plan||null,ce=N.route_source==="derived",it=N.route||L.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${ce?" detail-kv__v--derived":""}"
          title=${ce?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${ce?"unset":it}</span
        >
      </div>
      ${N.route!=="quick_fix"||Object.hasOwn(L,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${L.spec_review||"\uC5C6\uC74C"}${We?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${N.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${mt?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${mt?.approval_receipt||"\uC5C6\uC74C"}${mt?.approval_state==="stale"?" \xB7 stale":mt?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${N.route!=="quick_fix"||Object.hasOwn(L,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${L.impl_review||"\uC5C6\uC74C"}${lt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${N.resolver?c`<div class="detail-kv">
            <span class="detail-kv__k">↳ 충돌 해소</span>
            <span
              class="detail-kv__v detail-kv__v--resolver detail-kv__v--wrap"
              title=${`resolver-self:${N.resolver.attempt} \xB7 ${N.resolver.prior_sha} \u2192 ${N.resolver.sha}`}
              >${`${N.resolver.prior_sha.slice(0,7)} \u2192 ${N.resolver.sha.slice(0,7)}`}</span
            >
          </div>`:""}
      ${N.route==="quick_fix"||Object.hasOwn(L,"quick_fix_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">quick_fix_review</span>
            <span class="detail-kv__v"
              >${L.quick_fix_review||"\uC5C6\uC74C"}${Pt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${N.planned_execution?c`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${N.planned_execution.kind}</span>
            </div>
            ${N.planned_execution.kind==="main"?c`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${N.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${N.exec_receipt?c`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${tr(N.exec_receipt)}</span
            >
          </div>`:""}
      ${N.impl_entry?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${N.impl_entry.actor}@${N.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${L.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${L.pr_url}</span>
          </div>`:""}
    `}let ur={route:["quick_fix","spec_backed","full_plan"]};async function dr(v,L){let N=L.target.value;if(v==="route"&&d&&d.metadata&&d.metadata.route==="full_plan"&&N!=="full_plan"&&!window.confirm(`full_plan \u2192 ${N||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){rt();return}await p("update-workflow-meta",{id:u,key:v,value:N},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),rt()}function Rr(v){let L=v.metadata||{};return c` ${((ke,We)=>{let lt=ur[ke],Pt=typeof L[ke]=="string"?L[ke]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${ke}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${ke}
          data-edit=${`wfmeta-${ke}`}
          @change=${mt=>dr(ke,mt)}
        >
          <option value="" ?selected=${!lt.includes(Pt)}>
            ${We}
          </option>
          ${lt.map(mt=>c`<option value=${mt} ?selected=${Pt===mt}>${mt}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function He(v,L){return q?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${H}
            @input=${fe}
            @keydown=${N=>cn(N,xt,st,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${xt}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${st}
            >
              취소
            </button>
          </div>
        </div>
      `:c`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${v}</h2>
        ${pn(L).map(N=>c`<span class="detail-usage-total" title=${N.tooltip}
              >${N.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${X}
        >
          ✎
        </button>
      </div>
    `}function Bt(v){let L=sn(v.created_at),N=sn(v.updated_at);return!L&&!N?c``:c`
      ${L?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${L}</span>
          </div>`:""}
      ${N?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${N}</span>
          </div>`:""}
    `}function En(v,L){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${en}
        >
          ${bv.map(N=>c`<option value=${N} ?selected=${N===v}>${N}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${Zr}
        >
          ${yv.map(N=>c`<option value=${String(N)} ?selected=${N===L}>
                P${N}
              </option>`)}
        </select>
      </div>
    `}function Io(v){return c`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${F?"":c`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${_n}
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
              .value=${U}
              @input=${hn}
              @keydown=${L=>cn(L,Yt,ln,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${Yt}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${ln}
              >
                취소
              </button>
            </div>
          </div>`:c`<div class="detail-overlay__desc">
            ${v||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function Lo(v){let L=typeof v.notes=="string"?v.notes:"";return L.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${L}</div>
    `}function Ns(v){let L=Array.isArray(v.labels)?v.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${L.map(N=>c`<span class="detail-label-chip"
              >${N}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${N}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+N}
                @click=${()=>Ms(N)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${M}
            @input=${Tr}
            @keydown=${Ea}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${Ps}
          >
            추가
          </button>
        </span>
      </div>
    `}function js(){if(!u)return c``;let v=d||{},L=String(v.id||u),N=v.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",ke=Ne(),We=v.status||"open",lt=typeof v.priority=="number"?Math.max(0,Math.min(4,v.priority)):"",Pt=v.description||"",mt=s?s.get():null,ce=mt&&We!=="closed"?ts({...v,id:L},mt):null,it=mt?ns(mt):null,Vt={...v,metadata:{...v.metadata||{},...f}};return c`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${()=>r()}></div>
        <div class="detail-overlay__panel">
          <div class="detail-overlay__bar">
            <button
              type="button"
              class="detail-overlay__id"
              title="ID 복사"
              @click=${x}
            >
              ${L}
            </button>
            ${ce?c`<button
                  type="button"
                  class="op-btn op-btn--primary detail-overlay__place"
                  data-bead-id=${L}
                  ?disabled=${!ce.placeable}
                  title=${Br(ce)}
                  @click=${()=>kt(L,it)}
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
          ${ce&&C&&it?c`<div
                class="place-menu detail-overlay__place-menu"
                @click=${nn=>vt(nn,L)}
              >
                ${pl(it,L)}
                <button
                  type="button"
                  class="op-btn op-btn--icon worker-card__place-cancel"
                  data-bead-id=${L}
                  title="레인 선택 취소"
                  aria-label="레인 선택 취소"
                  @click=${()=>{C=!1,rt()}}
                >
                  ✕
                </button>
              </div>`:""}
          ${He(N,ke)}
          ${sf(Vt,{onChipToggle:nn=>It.toggle({bead_id:L,chip_key:nn}),isChipOpen:nn=>It.isOpen({bead_id:L,chip_key:nn})})}
          ${of({metadata:Vt.metadata,workspace_values:Ht(),catalog:wt(),execution_defaults:Jt(),expanded:E,presets:jt()?.presets||[],preset_id:h,preset_busy:g,skipped_orchestration_keys:k},{onToggle:nn=>{E=nn,rt()},onEdit:(nn,Fs)=>{if(nn==="impl_runtime"||nn==="impl_model"||nn==="impl_effort"){_(T(nn,Fs??""));return}_(m(nn,Fs??""))},onPresetSelect:nn=>{h=nn,k=[],rt()},onPresetApply:()=>{Ae()}})}
          ${pf({md:Vt.metadata,catalog:ie,workspace_defaults:z,handlers:{onExecChange:(nn,Fs)=>_(m(nn,Fs))}})}
          ${En(We,lt)} ${Bt(v)}
          ${Io(Pt)}
          ${ef(pe,de,{expanded:ye,draft:Z,sending:be,error:ae})}
          ${Lo(v)} ${Ns(v)} ${un(v)}
          ${Zn(v)} ${Rr(v)}
          ${Xp(v,qs)}
          ${yf({expanded:Be,loading:ee,error:G,data:Se},{onToggle:ut})}
          ${bf(ot(),Wt,{total:ke,expanded:A},pt)}
          ${kf({events:Pe,shown:$t},{onMore:Je})}
        </div>
      </div>
    `}function rt(){dt(js(),e)}return{load(v){v!==u&&(f={},C=!1,h="",k=[],E=!1,ne(),Le(),et(),Me(),he(),ge()),u=v,d=null,!bt&&t.subscribeCandidates&&(bt=t.subscribeCandidates(()=>{u&&rt()})),Gt(),Nt(),P!==v&&re(v)},clear(){u=null,d=null,f={},C=!1,h="",g=!1,k=[],E=!1,ne(),Le(),et(),Me(),he(),ge(),je(),Re.close(),Ye.close(),dt(c``,e)},destroy(){S&&(S(),S=null),ve&&(ve(),ve=null),De&&(De(),De=null),je(),document.removeEventListener("keydown",Et),It.detach(),Ee||(Re.destroy(),_e&&_e.parentNode&&_e.parentNode.removeChild(_e)),Ye.destroy(),Fe.parentNode&&Fe.parentNode.removeChild(Fe),u=null,d=null,ge(),h="",g=!1,k=[],Le(),et(),Me(),he(),dt(c``,e)}}}function $f(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),o=t.querySelector("#fatal-error-detail"),i=t.querySelector("#fatal-error-reload"),s=t.querySelector("#fatal-error-close"),l=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},a=(u,d,f="")=>{n&&(n.textContent=u||"Unexpected Error"),r&&(r.textContent=d||"An unrecoverable error occurred.");let h=typeof f=="string"?f.trim():"";if(o&&(h.length>0?(o.textContent=h,o.removeAttribute("hidden")):(o.textContent="No additional diagnostics available.",o.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return i&&i.addEventListener("click",()=>{window.location.reload()}),s&&s.addEventListener("click",()=>l()),t.addEventListener("cancel",u=>{u.preventDefault(),l()}),{open:a,close:l,getElement(){return t}}}var vv="(max-width: 640px)";function pa(e){if(typeof window.matchMedia!="function")return e(!1),()=>{};let t=window.matchMedia(vv),n=!!t.matches;e(n);let r=o=>{let s=!!(typeof o=="object"&&o!==null&&typeof o.matches=="boolean"?o.matches:t.matches);s!==n&&(n=s,e(s))};return typeof t.addEventListener=="function"?(t.addEventListener("change",r),()=>{t.removeEventListener("change",r)}):typeof t.addListener=="function"?(t.addListener(r),()=>{typeof t.removeListener=="function"&&t.removeListener(r)}):()=>{}}function kv(){return{lanes:{done:!0},areas:{}}}function Os(e){let t={};if(typeof e!="object"||e===null)return t;for(let[n,r]of Object.entries(e))typeof r=="boolean"&&(t[n]=r);return t}function wv(e){try{let t=window.localStorage.getItem(e);if(!t)return null;let n=JSON.parse(t);if(typeof n!="object"||n===null)return null;let r=n;return typeof r.lanes=="object"&&r.lanes!==null?{lanes:Os(r.lanes),areas:Os(r.areas)}:{lanes:Os(r),areas:{}}}catch{return null}}function xf(e,t){try{window.localStorage.setItem(e,JSON.stringify(t))}catch{}}function fa(e,t=kv()){let n={lanes:Os(t.lanes),areas:Os(t.areas)},r=wv(e),o={lanes:{...n.lanes,...r?r.lanes:{}},areas:{...n.areas,...r?r.areas:{}}};return{isCollapsed(i){return o.lanes[i]===!0},isAreaCollapsed(i){return o.areas[i]===!0},toggle(i){let s=o.lanes[i]!==!0;return o={...o,lanes:{...o.lanes,[i]:s}},xf(e,o),s},toggleArea(i){let s=o.areas[i]!==!0;return o={...o,areas:{...o.areas,[i]:s}},xf(e,o),s}}}function rc(e){if(typeof e=="string"&&e.length>0)return e;if(e&&typeof e=="object"){let t=e;if(typeof t.message=="string"&&t.message.length>0)return t.message;if(typeof t.error=="string"&&t.error.length>0)return t.error;if(t.error&&typeof t.error=="object"&&typeof t.error.message=="string")return t.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}function _a(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"&&t.length>0):[]}function ma(e){let{transport:t,console_el:n,getLanes:r,getWorkspaces:o,getCrossLanes:i,reproject:s,onCorrection:l,showToast:a,requestRender:u,adoptQueue:d,onDragBegin:f,candidate_drop:h}=e,g=[],k=null,E=!1,C=null,te=null,ie=null;function z(){C!==null&&clearTimeout(C),C=setTimeout(()=>{C=null,E=!1},0)}function P(){return i()??null}function I(){let V=new Map,J=o();for(let oe of Array.isArray(J)?J:[]){if(!oe||typeof oe!="object")continue;let de=oe.bead_blocked_by&&typeof oe.bead_blocked_by=="object"?oe.bead_blocked_by:{};for(let[Ee,_e]of Object.entries(de))Array.isArray(_e)&&V.set(Ee,_a(_e));for(let Ee of[...Array.isArray(oe.runnable)?oe.runnable:[],...Array.isArray(oe.session_active)?oe.session_active:[]])Ee&&typeof Ee.bead_id=="string"&&Array.isArray(Ee.blocked_by)&&Ee.blocked_by.length>0&&V.set(Ee.bead_id,_a(Ee.blocked_by))}return V}function q(){let V=new Map,J=new Map,oe=o();for(let de of Array.isArray(oe)?oe:[]){if(!de||typeof de!="object")continue;let Ee=de.bead_blocked_by&&typeof de.bead_blocked_by=="object"?de.bead_blocked_by:{};for(let[_e,Re]of Object.entries(Ee))Array.isArray(Re)&&V.set(_e,_a(Re));for(let _e of Array.isArray(de.runnable)?de.runnable:[])_e&&typeof _e.bead_id=="string"&&Array.isArray(_e.blocked_by)&&J.set(_e.bead_id,_a(_e.blocked_by))}for(let de of g)for(let Ee of[V,J]){let _e=Ee.get(de.a);_e!==void 0&&Ee.set(de.a,de.type==="dep-remove"?_e.filter(Re=>Re!==de.b):_e.includes(de.b)?_e:[..._e,de.b])}return{snapshot:V,runnable:J}}function F(){let V=I();for(let J of g){let oe=(V.get(J.a)||[]).slice();J.type==="dep-remove"?V.set(J.a,oe.filter(de=>de!==J.b)):oe.includes(J.b)||V.set(J.a,[...oe,J.b])}return V}function H(V=r(),J=P()){let oe=new Map;for(let Be of Array.isArray(J?.lanes)?J.lanes:[]){let ee=new Map;for(let G of Array.isArray(Be?.entries)?Be.entries:[])G&&typeof G.bead_id=="string"&&ee.set(G.bead_id,G.dep_created_by_lane===!0);oe.set(typeof Be?.id=="string"?Be.id:"",ee)}let de=new Map,Ee=new Map,_e=new Set,Re=new Set;for(let Be of V.chain_lanes){let ee=oe.get(Be.lane_id);de.set(Be.lane_id,{status:Be.status,entries:Be.rows.map((G,Se)=>({bead_id:G.id,root_dir:G.root_dir,...Se===0?{}:{dep_created_by_lane:ee?.get(G.id)===!0}}))});for(let G of Be.rows)Ee.set(G.id,Be.lane_id),G.fixed&&_e.add(G.id),G.unplaced||Re.add(G.id)}let Fe=new Map;for(let Be of V.parallel_rows)typeof Be.queue_index=="number"&&Fe.set(Be.id,Be.queue_index);for(let Be of V.queue_groups)for(let ee of Be.sublanes.serial)for(let G of ee.items)typeof G.queue_index=="number"&&Fe.set(G.id,G.queue_index);let Ye=q();return{blocked_by_map:F(),snapshot_blocked_by:Ye.snapshot,runnable_blocked_by:Ye.runnable,owner_of:new Map(Object.entries(V.owner_of)),cross_lanes:de,owner_lane_of:Ee,fixed_members:_e,placed_members:Re,parallel_rows:V.parallel_rows.map(Be=>({bead_id:Be.id,root_dir:Be.root_dir,queue_index:Be.queue_index??0})),parallel_raw_length:new Map(Object.entries(V.parallel_raw_length)),queue_index_of:Fe}}function U(V,J){let oe=r();for(let Ee of[...oe.runnable,...oe.queue,...oe.running,...oe.pr_wait,...oe.done])if(!(Ee.non_occupying||Ee.id!==J)){if(Ee.root_dir===V)return Ee.expected_revision;break}let de=oe.queue_groups.find(Ee=>Ee.root_dir===V);return de?de.revision:0}async function M(V,J,oe,de){if(!t)return null;let _e=await t(V,{...J,...oe?{root_dir:oe}:{},expected_revision:de});if(_e&&_e.conflict){_e.queue&&d?.(oe,_e.queue);let Re=_e.queue&&typeof _e.queue.revision=="number"?_e.queue.revision:de;_e=await t(V,{...J,...oe?{root_dir:oe}:{},expected_revision:Re})}return _e&&_e.queue&&d?.(oe,_e.queue),_e}async function Q(V,J,oe,de,Ee){try{let _e=await M(V,J,oe,de.get(oe)??U(oe,Ee.bead_id));return!_e||typeof _e.applied!="boolean"?(a("\uD050 \uC694\uCCAD\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error"),null):(_e.queue&&typeof _e.queue.revision=="number"&&de.set(oe,_e.queue.revision),_e.conflict?(a("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null):_e.applied===!1?(a(_e.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${_e.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null):_e.queue&&typeof _e.queue.revision=="number"?_e.queue.revision:de.get(oe)??0)}catch(_e){return a(rc(_e),"error"),null}}async function B(V,J,oe=new Map){if(V.type==="worker-queue-disarm"){try{let de=await M(V.type,V.payload,V.root_dir,oe.get(V.root_dir)??U(V.root_dir,J));de&&de.queue&&typeof de.queue.revision=="number"&&oe.set(V.root_dir,de.queue.revision)}catch{}return!0}if(V.type==="worker-queue-place"||V.type==="worker-queue-reorder"||V.type==="worker-queue-remove")return await Q(V.type,V.payload,V.root_dir,oe,{bead_id:J})!==null;try{return(V.type==="dep-add"||V.type==="dep-remove")&&t&&await t(V.type,{a:V.a,b:V.b,...V.root_dir?{root_dir:V.root_dir}:{}}),!0}catch(de){return a(rc(de),"error"),!1}}function ne(V){(V.type==="dep-add"||V.type==="dep-remove")&&(g=[...g,{type:V.type,a:V.a,b:V.b}])}async function ge(V,J){if(!t)return{ok:!1};try{let oe=await t(V.type,{...V.payload,expected_revision:J});return!oe||typeof oe.revision!="number"?(a("\uC5F0\uACB0 \uB808\uC778 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{ok:!1}):{ok:!0,revision:oe.revision}}catch(oe){let de=oe,Ee=de&&de.code==="conflict"?de.details?.cross_lanes:null;return Ee&&typeof Ee.revision=="number"&&Array.isArray(Ee.lanes)?{ok:!1,conflict:Ee}:(a(rc(oe),"error"),{ok:!1})}}async function Oe(V,J,oe){let de=new Map,Ee=[],_e=V.ops.slice(0,V.lane_op_index),Re=V.ops.slice(V.lane_op_index);for(let Ye of _e){if(!await B(Ye,oe,de))return{done:!0};ne(Ye)}let Fe=J;for(let Ye of V.lane_ops){if(Fe===null)return a("\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{done:!0};let Be=await ge(Ye,Fe);if(!Be.ok)return Be.conflict?{done:!1,conflict:Be.conflict}:{done:!0};Fe=Be.revision}for(let Ye of Re){if(!await B(Ye,oe,de))return{done:!0};ne(Ye),Ye.type==="dep-add"&&Ee.push(Ye)}for(let Ye of up(Ee))Fe=await K(Ye,Fe);return{done:!0}}async function K(V,J){if(J===null||!t)return J;let oe=V.pairs,de=J;for(let Ee=0;Ee<2;Ee+=1){if(oe.length===0)return de;try{let _e=await t("monitor-lane-provenance",{lane_id:V.lane_id,pairs:oe.map(Re=>({bead_id:Re.bead_id,after:Re.after,value:!0})),expected_revision:de});return _e&&typeof _e.revision=="number"?_e.revision:de}catch(_e){let Re=_e,Fe=Re&&Re.code==="conflict"?Re.details?.cross_lanes:null;if(!Fe||typeof Fe.revision!="number"||!Array.isArray(Fe.lanes))return de;let Ye=Fe.lanes.find(Be=>Be&&Be.id===V.lane_id);oe=dp(Array.isArray(Ye?.entries)?Ye.entries:[],oe),de=Fe.revision}}return de}async function re(V,J,oe=[]){g=oe,l("",0);let de=r(),Ee=P();for(let _e=0;;_e+=1){let Re=V(H(de,Ee));if("refused"in Re){a(Re.refused,"error");break}let Fe=await Oe(Re,de.cross_lanes_revision,J);if(Fe.done){Re.correction&&l(Re.correction.lane_id,Re.correction.corrected);break}if(_e>=1){a("\uB808\uC778\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4","error");break}let Ye=s(Fe.conflict);de=Ye.lanes,Ee=Ye.raw_lanes}g=[],u()}async function pe(V,J){await re(oe=>Gi(V,J,oe),V.bead_id)}function Te(V,J){let oe=J&&typeof J.closest=="function"?J.closest("[data-row-index]"):null;if(oe&&V.contains(oe)){let de=Number(oe.getAttribute("data-row-index"));return Number.isFinite(de)?de:0}return V.querySelectorAll("[data-row-index]").length}function Y(V){let J=typeof V?.closest=="function"?V.closest(".worker-pane--collapsed[data-lane]"):null;if(!J)return null;let oe=J.getAttribute("data-lane");return oe==="queue"?{zone:J,target:{kind:"parallel",marker_index:r().parallel_rows.length}}:oe==="candidate"&&h===!0?{zone:J,target:{kind:"candidate"}}:null}function ae(V){let J=V.target;if(!k)return null;let oe=typeof J?.closest=="function"?J.closest("[data-drop]"):null;if(!oe)return Y(J);let de=oe.getAttribute("data-drop");if(de==="candidate")return{zone:oe,target:{kind:"candidate"}};if(de==="parallel")return{zone:oe,target:{kind:"parallel",marker_index:Te(oe,J)}};if(de==="chain")return{zone:oe,target:{kind:"chain",lane_id:oe.getAttribute("data-lane-id")||"",marker_index:Te(oe,J)}};if(de==="repo-serial"){let Ee=oe.getAttribute("data-root-dir")||"";if(Ee!==k.root_dir)return null;let _e=typeof J?.closest=="function"?J.closest("[data-queue-index]"):null,Re=_e&&oe.contains(_e)?_e.getAttribute("data-queue-index"):oe.getAttribute("data-lane-length"),Fe=Number(Re);return{zone:oe,target:{kind:"repo-serial",root_dir:Ee,lane_id:oe.getAttribute("data-lane-id")||"",index:Number.isFinite(Fe)?Fe:0}}}return null}function Z(){for(let V of Array.from(n.querySelectorAll(".is-drop-over")))V.classList.remove("is-drop-over")}function be(V){te=V.target instanceof Element?V.target:null}function Ie(V){let J=V.target,oe=typeof J?.closest=="function"?J.closest('[draggable="true"][data-bead-id]'):null,de=oe?oe.closest("[data-drag-kind]"):null;if(!de)return;if(oe&&te&&oe.contains(te)&&typeof te.closest=="function"&&te.closest("input, button, a")){V.preventDefault();return}let Ee=de.getAttribute("data-bead-id")||"",_e=de.getAttribute("data-drag-kind")||"",Re=de.getAttribute("data-root-dir")||"";if(!Ee||!_e)return;let Fe=de.getAttribute("data-queue-index")||"",Ye=Number(Fe),Be=de.getAttribute("data-lane-id")||"";k={kind:_e,bead_id:Ee,root_dir:Re,...Fe!==""&&Number.isFinite(Ye)?{queue_index:Ye}:{},...Be?{lane_id:Be}:{}},E=!0,f?.(),n.classList.add("is-dragging");try{V.dataTransfer?.setData("text/plain",Ee),V.dataTransfer&&(V.dataTransfer.effectAllowed="move")}catch{}}function ye(V){let J=ae(V);J&&(V.preventDefault(),V.dataTransfer&&(V.dataTransfer.dropEffect="move"),J.zone.classList.add("is-drop-over"))}function Le(V){let J=V.target;typeof J?.closest=="function"&&(J.closest("[data-drop]")?.classList.remove("is-drop-over"),J.closest(".worker-pane--collapsed")?.classList.remove("is-drop-over"))}function Ge(){k=null,Z(),n.classList.remove("is-dragging"),z()}function gt(V){let J=ae(V),oe=k;k=null,Z(),n.classList.remove("is-dragging"),!(!J||!oe)&&(V.preventDefault(),pe(oe,J.target))}return{attach(V){ie||(ie=V,V.addEventListener("pointerdown",be),V.addEventListener("dragstart",Ie),V.addEventListener("dragover",ye),V.addEventListener("dragleave",Le),V.addEventListener("drop",gt),V.addEventListener("dragend",Ge))},detach(){C!==null&&(clearTimeout(C),C=null);let V=ie;ie=null,V&&(V.removeEventListener("pointerdown",be),V.removeEventListener("dragstart",Ie),V.removeEventListener("dragover",ye),V.removeEventListener("dragleave",Le),V.removeEventListener("drop",gt),V.removeEventListener("dragend",Ge))},isDragging(){return k!==null},consumeClickSuppression(){let V=E;return E=!1,V},applyDrop:pe,runPlanned:re,dropModel:H,sendOp:B,sendQueueCas:Q,rememberDep:ne}}function on(e){return e&&typeof e=="object"?e:{}}function $v(e,t){for(let n of Object.values(on(t.provider_hold)))for(let r of Array.isArray(n?.targets)?n.targets:[])if(Array.isArray(r?.attempt_ids)&&r.attempt_ids.includes(e))return r;return null}function xv(e){if(e?.status!=="ok")return{eligible:!1,reason:`\uACC4\uC815 \uC0C1\uD0DC ${String(e?.status||"\uBBF8\uC0C1")}`};let t=Array.isArray(e.windows)?e.windows:[],n=t.find(o=>o?.key==="5h"),r=t.find(o=>o?.key==="7d");if(!n||typeof n.pct!="number")return{eligible:!1,reason:"5\uC2DC\uAC04 \uC0AC\uC6A9\uB7C9 \uBBF8\uAD00\uCE21"};if(n.pct>80)return{eligible:!1,reason:"5\uC2DC\uAC04 \uC0AC\uC6A9\uB7C9 80% \uCD08\uACFC"};if(r){if(typeof r.pct!="number")return{eligible:!1,reason:"7\uC77C \uC0AC\uC6A9\uB7C9 \uBBF8\uAD00\uCE21"};if(r.pct>90)return{eligible:!1,reason:"7\uC77C \uC0AC\uC6A9\uB7C9 90% \uCD08\uACFC"}}return{eligible:!0,reason:""}}function ga(e,t){let n=on(on(t).attempts)[e];if(!n)return null;let r=on(on(t).runner_catalog),o=on(r.runners),i=typeof n.runner=="string"&&o[n.runner]?n.runner:Object.keys(o)[0]||"",s=on(o[i]),l=on(s.models),a=typeof n.model=="string"&&l[n.model]?n.model:typeof s.default_model=="string"?s.default_model:Object.keys(l)[0]||"",u=$v(e,on(t)),d=typeof n.claude_account=="string"?n.claude_account:typeof u?.account=="string"?u.account:"";return{attempt_id:e,original_runner:i,runner:i,model:a,account:d,fresh_current:!1}}function ha(e,t,n){if(!e||!t||typeof t.closest!="function")return null;let r=t.closest(".provider-resume-dialog__runner");if(r){let l=on(on(on(n).runner_catalog).runners),a=on(l[r.value]),u=Object.keys(on(a.models));return{...e,runner:r.value,model:typeof a.default_model=="string"?a.default_model:u[0]||""}}let o=t.closest(".provider-resume-dialog__model");if(o){try{let[l,a]=JSON.parse(o.value);if(typeof l=="string"&&typeof a=="string")return{...e,runner:l,model:a}}catch{}return e}let i=t.closest(".provider-resume-dialog__account");if(i)return{...e,account:i.value};let s=t.closest(".provider-resume-dialog__fresh-input");return s?{...e,fresh_current:s.checked}:null}function ba(e){if(!e||!e.runner||!e.model||e.runner==="claude"&&!e.account)return null;let t={runner:e.runner,model:e.model};e.runner==="claude"&&e.account&&(t.claude_account=e.account);let n=e.fresh_current||e.runner!==e.original_runner;return{attempt_id:e.attempt_id,payload:{exec_override:t,...n?{continuation:"fresh_current",decision_token:{}}:{}}}}function Ro(e,t){if(!e)return"";let n=on(on(on(t).runner_catalog).runners),r=on(on(t).account_catalog),o=Array.isArray(r.claude)?r.claude:[],i=e.runner!==e.original_runner;return c`<dialog
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
              ${o.map(s=>{let l=xv(s),a=s.alias||s.email;return c`<option
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
  </dialog>`}function ya(e){let t=e?.querySelector?.(".provider-resume-dialog")||null;!t||t.open||(typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""))}var oc=Object.freeze({repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",manual_target_missing:"\uC218\uB3D9 \uBC30\uD3EC \uAE30\uB85D\uC5D0 \uD540\uB41C \uB300\uC0C1 SHA\uAC00 \uC5C6\uC5B4 \uC2E4\uD589\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",bootstrap_not_approved:"\uCCAB [deploy] \uC120\uC5B8\uC740 \uC0AC\uB78C \uC2B9\uC778 \uC5C6\uC774 \uC2E4\uD589\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. Worker \uC124\uC815\uC758 [\uBC30\uD3EC \uC2E4\uD589]\uC73C\uB85C \uC6D0\uACA9 base tip\uC744 \uD55C \uBC88 \uBC30\uD3EC\uD55C \uB4A4 [\uC815\uC0B0 \uC7AC\uAC1C]\uB97C \uB204\uB974\uC138\uC694 \u2014 \uADF8 \uB4A4 \uBA38\uC9C0\uBD80\uD130\uB294 \uC790\uB3D9 \uBC30\uD3EC\uB429\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_red:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",cleanup_failed:"\uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uAC00 \uB05D\uB098\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",retry_exhausted:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB97C \uBAA8\uB450 \uC4F0\uACE0\uB3C4 \uAC19\uC740 \uC2E4\uD328\uAC00 \uC774\uC5B4\uC84C\uC2B5\uB2C8\uB2E4.",conflict_unresolved:"\uCDA9\uB3CC \uD574\uC18C\uAC00 \uB05D\uB098\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",internal_record_failed:"Worker \uB0B4\uBD80 \uAE30\uB85D\uC774 \uC2E4\uD328\uD574 \uC9C4\uD589\uC744 \uBA48\uCDC4\uC2B5\uB2C8\uB2E4.",foreign_landing_unpinned:"\uB2E4\uB978 \uC800\uC7A5\uC18C \uCC29\uC9C0\uC778\uB370 foreign_repo\xB7foreign_path\xB7foreign_base \uD540\uC774 \uC5C6\uAC70\uB098 \uD615\uC2DD\uC774 \uD2C0\uB9BD\uB2C8\uB2E4.",foreign_checkout_unavailable:"\uD540\uB41C \uB300\uC0C1 \uC800\uC7A5\uC18C \uCCB4\uD06C\uC544\uC6C3\uC774 \uC5C6\uAC70\uB098 foreign_repo\uC640 \uAC19\uC740 URL\uC758 remote\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",foreign_deploy_unsupported:"\uB300\uC0C1 \uC800\uC7A5\uC18C\uAC00 [deploy]\uB97C \uC120\uC5B8\uD574 Worker\uAC00 \uBC30\uD3EC \uC99D\uAC70\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uC138\uC158\uC774 \uBC30\uD3EC\uC640 \uB9C8\uAC10\uC744 \uC18C\uC720\uD569\uB2C8\uB2E4.",repair_lane_retired:"\uC790\uB3D9 \uC218\uB9AC \uB808\uC778\uC774 \uC740\uD1F4\uD574 \uC0AC\uB78C \uCC98\uB9AC\uB85C \uB118\uC5B4\uC654\uC2B5\uB2C8\uB2E4."});var Af={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",job_script_failure:"\uC7A1 \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428",quickfix_landing_failed:"\uCC29\uC9C0 \uC2E4\uD328",runner_exit:"\uC138\uC158 \uC2E4\uD328",session_parked:"\uC138\uC158 \uB300\uAE30",session_ended_unresolved:"\uC138\uC158 \uC885\uB8CC",prerequisite_unmet:"\uC120\uD589 \uB300\uAE30",delivery_unproven:"\uCC29\uC9C0 \uC99D\uAC70 \uBD80\uC871"},Sf={overloaded_529:"Claude API \uACFC\uBD80\uD558(529)\uB85C \uBCF4\uB958",rate_limited_429:"Claude API \uC694\uCCAD \uD55C\uB3C4(429)\uB85C \uBCF4\uB958"},Ef={"session_hard_stop:failure":"\uC138\uC158\uC774 \uC2E4\uD328\uB97C \uBCF4\uACE0\uD558\uACE0 \uC885\uB8CC","session_hard_stop:environment":"\uC138\uC158\uC774 \uD658\uACBD \uC624\uB958\uB97C \uBCF4\uACE0\uD558\uACE0 \uC885\uB8CC","resume_failed:transcript_missing":"\uC774\uC5B4\uD558\uAE30 \uB300\uC0C1 \uC138\uC158 \uAE30\uB85D\uC774 \uC5C6\uC74C \u2014 \uC0C8 \uC138\uC158\uC73C\uB85C \uB300\uCCB4"};function Av(e){return typeof e!="number"||!Number.isFinite(e)?"":new Date(e).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}function Sv(e,t){if(typeof e!="string"||!e.startsWith("provider_outage:"))return null;let n=e.slice(16);if(n==="usage_limit"){let o=t&&typeof t=="object"?t.resets_at:null,i=Av(o);return i?`\uACC4\uC815 \uC0AC\uC6A9 \uD55C\uB3C4\uB85C \uBCF4\uB958 \u2014 \uB9AC\uC14B ${i}`:"\uACC4\uC815 \uC0AC\uC6A9 \uD55C\uB3C4\uB85C \uBCF4\uB958"}if(Object.hasOwn(Sf,n))return Sf[n];let r=/^http_(5\d\d)$/.exec(n);return r?`Claude API \uC624\uB958(${r[1]})\uB85C \uBCF4\uB958`:null}function ka(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function va(e){for(let t of ka(e)){if(Object.hasOwn(Af,t))return Af[t];if(t.startsWith("session_"))return"\uC138\uC158 \uC2E4\uD328"}return null}function Cf(e){return ka(e).length===0?null:va(e)||"\uC2E4\uD328"}function Qr(e){let t=null;for(let n of ka(e))Object.hasOwn(oc,n)&&(t=oc[n]);return t}function xr(e,t){if(typeof e=="string"&&Object.hasOwn(Ef,e))return Ef[e];let n=Sv(e,t);if(n!==null)return n;let r=va(e),o=Qr(e);return r&&o?`${r} \u2014 ${o}`:r||o?r||o:typeof e=="string"?e:""}function Rf(e,t){let n=va(e)??va(t),r=Qr(t)??Qr(e);return n&&r?`${n} \u2014 ${r}`:n||r?n||r:typeof t=="string"?t:""}var Ev=new Set(["repo_operation_timeout_unresolved"]);function Tv(e){for(let t of ka(e))if(Ev.has(t)||t.startsWith("repo_ops_"))return!0;return!1}function Cv(e,t){return t.code==="interrupted"||t.interrupted===!0||e.failure_kind==="interrupted_without_terminal_exit"||t.code==="interrupted_without_terminal_exit"}function Of(e,t){if(!e||typeof e!="object")return"";let n=e.failure;if(!n||typeof n!="object"||Tv(n.code))return"";if(n.code==="timeout"){let o=Number(t);return Number.isFinite(o)&&o>0?`\uD0C0\uC784\uC544\uC6C3 ${Math.round(o/1e3)}\uCD08 \uCD08\uACFC`:"\uD0C0\uC784\uC544\uC6C3 \uCD08\uACFC"}if(Cv(e,n))return"\uC885\uB8CC \uAE30\uB85D \uC5C6\uC74C \u2014 \uC911\uB2E8\uB428";let r=typeof e.elapsed_ms=="number"&&Number.isFinite(e.elapsed_ms)&&e.elapsed_ms>=0?` \xB7 ${Ur(e.elapsed_ms)}`:"";return typeof e.signal=="string"&&e.signal.length>0?`signal ${e.signal}${r}`:Number.isInteger(e.exit_code)?`exit ${e.exit_code}${r}`:""}var Tf={schema_unsupported:"\uD540\uB41C \uC815\uCC45 \uC2A4\uD0A4\uB9C8\uB97C \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."};function If(e){if(!e||typeof e!="object")return"";let t=e.retry;if(!t||typeof t!="object")return"";if(typeof t.blocked_reason=="string"&&t.blocked_reason)return`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uBABB \uD568 \u2014 ${Object.hasOwn(Tf,t.blocked_reason)?Tf[t.blocked_reason]:t.blocked_reason}`;if(t.status==="absorbed"){let n=t.absorbed&&typeof t.absorbed=="object"?t.absorbed:null,r=xr(n?.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428 \u2014 \uCCAB \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428"}if(e.state!=="failed")return"";if(t.status==="not_applicable")return"\uC7AC\uC2DC\uB3C4 \uB300\uC0C1 \uC544\uB2D8 \u2014 \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804 \uC2E4\uD328";if(t.status==="consumed"){let n=typeof t.first_fingerprint=="string"&&t.first_fingerprint?t.first_fingerprint:null;if(n===null)return"";if(n===e.failure?.fingerprint)return"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uAC19\uC740 \uC2E4\uD328";let r=xr(t.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328"}return""}function Rv(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}var Lf=200;function Ov(e){return typeof e!="string"||e.length===0?"":e.length>Lf?`${e.slice(0,Lf)}\u2026`:e}function Iv(e){let t=e&&e.attempts>0&&e.max>0?` ${e.attempts}/${e.max}`:"",n=e&&typeof e.next_at=="number"?` \xB7 ${new Date(e.next_at).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}`:"";return`\u21BB \uC7AC\uC2DC\uB3C4 \uB300\uAE30${t}${n}`}function sc(e){return typeof e!="number"||!Number.isFinite(e)?"":new Date(e).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}function Lv(e){if(!e)return"";let t=e.auto_resume==="disarmed"?" \xB7 \uC218\uB3D9 \uC870\uCE58":"";if(e.kind==="usage_limit"){let r=sc(e.resets_at);if(!r)return`\u23F3 \uD55C\uB3C4 \uB300\uAE30 \xB7 \uB9AC\uC14B \uBBF8\uC0C1${t}`;let o=e.target?.account_alias||e.target?.account||"";return`\u23F3 \uD55C\uB3C4 \uB300\uAE30 ${r}${o?` \xB7 ${o}`:""}${t}`}let n=sc(e.next_probe_at);return`\u26A0\uFE0F \uACF5\uAE09\uC790 \uC7A5\uC560${n?` \xB7 \uB2E4\uC74C \uD504\uB85C\uBE0C ${n}`:""}${t}`}function Pf(e){if(!e)return"";let t=Array.isArray(e.timeline)?e.timeline:[],n=typeof e.log_path=="string"?e.log_path:"",r=e.log_expired===!0,o=e.log_unreadable===!0;return t.length===0&&n.length===0&&!r&&!o?"":c`${t.length>0?c`<ol class="rtile__history" data-seam="tile-timeline">
        ${t.map(i=>c`<li class="rtile__history-row">
              ${Df(i.at)?c`<span class="rtile__history-at"
                    >${Df(i.at)}</span
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
            ${Fr(n)}
          </p>`:""}`}function Df(e){return typeof e!="number"||!Number.isFinite(e)?"":new Date(e).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}function Dv(e,t){if(!e||e.open!==!0)return"";let n=Qr(e.cause)||xr(e.cause,e.cause_detail),r=e.retry&&e.retry.attempts>0?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 ${e.retry.attempts}\uD68C \u2014 \uAC19\uC740 \uC624\uB958`:"",o=e.cause_detail,i=e.quickfix_lane&&e.quickfix_landing?e.quickfix_landing:null,s=i?[i.cursor||null,typeof i.head_sha=="string"?i.head_sha.slice(0,7):null,i.reason||null].filter(Boolean).join(" \xB7 "):"",l=typeof e.finished_at=="number"?`${new Date(e.finished_at).toLocaleString("ko-KR")} \xB7 ${bn(e.finished_at,t)}`:"",a=[e.runner,e.model,e.observed_effort??e.effort,e.speed].filter(h=>typeof h=="string"&&h.length>0).join(" \xB7 "),u=e.usage?.total_cost_usd,d=typeof u=="number"&&Number.isFinite(u)?`$${u.toFixed(2)}`:"",f=Pf(e);return c`<div
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
  </div>`}function Pv(e){return e==="pending"?"\uD68C\uBCF5 \uD6C4 \uC790\uB3D9 \uC7AC\uAC1C \uB300\uAE30":e==="disarmed"?"\uC790\uB3D9 \uC7AC\uAC1C \uC18C\uC9C4 \xB7 \uC218\uB3D9 \uC870\uCE58 \uD544\uC694":typeof e=="string"&&e.startsWith("refused:")?`\uC790\uB3D9 \uC7AC\uAC1C \uAC70\uBD80 \xB7 ${e.slice(8)}`:""}function Mv(e){return e==="none"?"\uACC4\uC815 \uC804\uD658 \uC548 \uD568 \xB7 \uC870\uAC74\uC744 \uB9CC\uC871\uD558\uB294 \uB2E4\uB978 \uACC4\uC815 \uC5C6\uC74C":e==="disabled"?"\uACC4\uC815 \uC804\uD658 \uC548 \uD568 \xB7 \uC790\uB3D9 \uC804\uD658 \uAEBC\uC9D0":""}function qv(e){if(!e||e.open!==!0)return"";let t=[e.target?.model,e.target?.account_alias||e.target?.account].filter(i=>typeof i=="string"&&i.length>0).join(" \xB7 "),n=sc(e.resets_at),r=Pv(e.auto_resume),o=Mv(e.auto_switch);return c`<div
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
            <dd>${Fr(e.log_path)}</dd>
          </div>`:""}
    </dl>
  </div>`}function Nv(e){return!e||!e.repo&&!e.serial_lane_id?"":c`${e.repo?c`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?c`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`}var jv=new Set(["codex-runner"]);function Fv(e,t,n,r=null){if(!e)return"";let o=e.last_activity||null,i=o&&typeof o.text=="string"?o.text:"",s=o&&typeof o.at=="number"?o.at:null,l=(r||!Array.isArray(e.legs)?[]:e.legs).filter(g=>g&&!(typeof g.agent_type=="string"&&jv.has(g.agent_type))),a=l.filter(g=>g&&g.state==="live"),u=l.filter(g=>g&&g.state!=="live"),d=r&&typeof r.last_event_at=="number"?bn(r.last_event_at,t):"",f=r?bn(r.updated_at,t):"",h=d?`\uCD5C\uADFC \uD65C\uB3D9 ${d}`:f?`\uAC31\uC2E0 ${f}`:"";return c`${i?c`<div class="rtile__activity${n?" is-paused":""}">
        <span class="rtile__activity-dot" aria-hidden="true"></span>
        <span class="rtile__activity-text">${i}</span>
        ${s!==null?c`<span class="rtile__activity-age"
              >${bn(s,t)}</span
            >`:""}
      </div>`:h?c`<div class="rtile__activity rtile__activity--session">
          <span class="rtile__activity-dot" aria-hidden="true"></span>
          <span class="rtile__activity-text">${h}</span>
        </div>`:""}${a.length>0||u.length>0?c`<div class="rtile__legs">
        ${a.map(g=>c`<span
              class="rtile__leg rtile__leg--live"
              title="이 세션이 띄운 서브에이전트/Codex 세션이 실행 중입니다"
              >위임 중 · ${g.label}</span
            >`)}${u.length>0?c`<span
              class="rtile__leg rtile__leg--done"
              title=${`\uC644\uB8CC\uB41C \uC704\uC784: ${u.map(g=>g.label).join(", ")}`}
              >위임 완료 ${u.length}</span
            >`:""}
      </div>`:""}`}var Bv={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function Uv(e){if(!e)return"";let t=Bv[e.locality]||"";return c`<button
    type="button"
    class="rtile__session"
    ?disabled=${t.length>0}
    title=${t||"\uB77C\uC774\uBE0C \uC138\uC158 \uC5F4\uAE30"}
    aria-label="라이브 세션 열기"
  >
    ▤ 세션
  </button>`}function Wv(e,t,n,r="",o="",i=!1){if(e==="provider_hold")return c`<div class="rtile__foot">
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
    </div>`;if(e==="retry_wait")return n?c`<div class="rtile__foot">${n}</div>`:"";let s=Ov(t?.summary);if(e==="waiting")return c`${s?c`<p class="rtile__held-summary">${s}</p>`:""}${r}
      <div class="rtile__foot">${n}</div>`;let l=Pf(t);return c`${s?c`<p class="rtile__held-summary">${s}</p>`:""}${l}
    <div class="rtile__foot">
      ${i?c`${n}${o}`:c`${o}${n}`}
    </div>`}function ic(e,t,n=null,r={}){let o=e.kind==="session",i=o&&Array.isArray(e.session_refs)&&e.session_refs.find(Ee=>Ee&&Ee.current===!0)||null,s=e.failed===!0,l=s&&e.failure||null,a=e.parked===!0&&!s,u=e.retry_wait===!0&&!s&&!a,d=e.waiting===!0&&!s&&!a&&!u,f=e.provider_hold===!0&&!s&&!a&&!u&&!d,h=a&&e.failure||null,g=d&&e.wait||null,k=f&&e.hold||null,E=a||u||d||f,C=!!e.paused,te=s||E?e.status_label||(a?"\uC138\uC158 \uB300\uAE30":u?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":d?"\uC120\uD589 \uB300\uAE30":f?"\uACF5\uAE09\uC790 \uBCF4\uB958":e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):C?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?Rv(t-e.started_at):"\u2014",ie=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,z=Uo(e),P=pn(e.usage),I=nr(e.usage),q=e.conflict_resolution?C?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,F=e.base_exception||null,H=e.landing,U=e.attempt_id&&e.attempt_id===n,M=r.monitor||null,Q=Nv(M),B=Ii(M?.cross_lane_chip),ne=M?Oi(M.dependency_chips):"",ge=Fv(M,t,C,o?{updated_at:e.updated_at??null,last_event_at:i&&i.locality==="local"?i.last_event_at:null}:null),Oe=o&&e.workflow?.chips?.exec_receipt||null,K=zr(e.workflow),re=Li(e.rec,e.chip_popover?.chip_key==="rec"),pe=e.chip_popover?mo(e.chip_popover.content):"",Te=Oe?c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${tr(Oe)}`}
        >${`${Oe.kind}:${oi(Oe)}`}</span
      >`:"",Y=i?c`<span
        class="ctl-chip ctl-chip--sref"
        title=${`${i.provider}:${i.session_id}@${i.host}${(e.session_refs||[]).length>=2?` \xB7 \uC774\uB825 ${(e.session_refs||[]).length}`:""}`}
        >${Wo(i)}</span
      >`:"",ae=Q||B||K||Y||Te||re?c`<div class="rtile__meta">
          ${Q}${B}${K}${Y}${Te}${re}${pe}
        </div>`:"",Z=l?c`<button
          type="button"
          class="rtile__failure-badge"
          data-attempt-id=${l.attempt_id}
          aria-expanded=${l.open===!0?"true":"false"}
          aria-label="실패 상세"
        >
          ⛔ ${Cf(l.cause)||"\uC2E4\uD328"}
        </button>
        ${l.halted_auto_advance?c`<span class="rtile__auto-halted">자동 진행 꺼짐</span>`:""}`:"",be=a?c`<span
        class="rtile__held-badge"
        title="세션이 사용자 결정을 기다리며 정상 종료했습니다 — 큐는 계속 갑니다"
        >⏸ 세션 대기</span
      >`:u?c`<span
          class="rtile__held-badge"
          title="환경성 실패의 자동 재시도를 기다립니다 — 사람이 할 일은 없습니다"
          >${Iv(e.retry)}</span
        >`:d?c`<span
            class="rtile__held-badge"
            title="세션이 선행 미충족으로 착수를 거부했습니다 — 선행이 닫히면 저절로 다시 돕니다"
            >⛓ 선행 대기</span
          >`:f&&k?c`<button
              type="button"
              class="rtile__held-badge rtile__provider-hold-badge"
              data-attempt-id=${e.attempt_id}
              aria-expanded=${k.open===!0?"true":"false"}
              aria-label="공급자 보류 상세"
            >
              ${Lv(k)}
            </button>`:"",Ie=c`${q?c`<span class="worker-mini__badge">${q}</span>`:""}${F?c`<span
        class="worker-mini__badge"
        title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
        >${F}</span
      >`:""}${Z}${be}`,ye=o?"":wo(e),Le=vi(l?.quickfix_landing),Ge=Le==="settlement"?"\uC815\uC0B0 \uC7AC\uAC1C":"\uC774\uC5B4\uD558\uAE30",gt=Le==="settlement"?"\uCC29\uC9C0 \uC815\uC0B0\uC744 \uB2E4\uC2DC \uC2E4\uD589":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589",V=e.resolve_action?c`<button
        type="button"
        class="rtile__resolve"
        ?disabled=${e.resolve_enabled===!1}
        title=${e.resolve_title||"\uC774 \uC2E4\uD328\uB97C \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4"}
        aria-label="세션에서 해결"
      >
        세션에서 해결
      </button>`:"",J=e.discard?.action&&!(s&&l?.landed===!0)?c`<button
          type="button"
          class="rtile__discard"
          data-operation-id=${e.discard.operation?.operation_id||""}
          data-confirmation=${l?.confirmation||"unmerged"}
          ?disabled=${!e.discard.enabled}
          title=${e.discard.title}
          aria-label=${e.discard.label}
        >
          ${e.discard.label}
        </button>`:"",oe=J&&e.discard?.abandon?.action===!0?c`<button
          type="button"
          class="rtile__discard-abandon"
          data-operation-id=${e.discard.operation?.operation_id||""}
          data-operation-kind=${e.discard.operation?.kind||""}
          data-last-error=${e.discard.error||""}
          title=${e.discard.abandon.title}
          aria-label=${e.discard.abandon.label}
        >
          ${e.discard.abandon.label}
        </button>`:"",de=oe?c`${J}${oe}`:J;return c`<div
    class="rtile${U?" rtile--sel":""}${C?" rtile--paused":""}${s?" rtile--failed rtile--compact":""}${E?" rtile--held rtile--compact":""}${a?" rtile--parked":""}${u?" rtile--retry-wait":""}${d?" rtile--waiting":""}${o?" rtile--session":""}${f?" rtile--provider-hold":""}${e.search_match===!1?" is-dimmed":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span
        class="rtile__dot${o?" rtile__dot--session":""}"
        aria-hidden="true"
      ></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${Di(e.priority)}${z?c`<span class="rtile__resumed" title=${z}>↻</span>`:""}${Ie}
      <div class="rtile__hd-actions">
        ${o?c`${typeof e.started_at=="number"?c`<span class="rtile__elapsed">${te}</span>`:""}${Uv(i)}<span
                class="rtile__session-badge"
                title="Worker가 아닌 세션이 in_progress로 잡은 이슈"
                >세션</span
              >`:c`<span class="rtile__elapsed">${te}</span>`}
        ${o||E?"":s?c`<button
                  type="button"
                  class="op-btn rtile__resume"
                  data-resume-kind=${Le}
                  ?disabled=${l?.resume_eligible===!1}
                  title=${l?.resume_eligible===!1?l.resume_reason||`${Ge} \uBD88\uAC00`:gt}
                  aria-label=${Ge}
                >
                  ↻ ${Ge}
                </button>
                ${de}`:c`<button
                  type="button"
                  class="rtile__session"
                  title="라이브 세션 열기"
                  aria-label="라이브 세션 열기"
                >
                  ▤ 세션
                </button>
                ${C?c`<button
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
                ${de}`}${a?"":V}
      </div>
    </div>
    <div class="rtile__title">${e.title}</div>
    ${E?Wv(a?"parked":u?"retry_wait":d?"waiting":"provider_hold",a?h:d?g:k,de,d?ne:"",a?V:"",a&&!!e.discard?.error):s?"":c`${ge}${e.rollup?ni(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:Wa}):""}
            ${H?c`<div class="rtile__landing">
                  <span
                    class="merge-step${H.failed?" merge-step--failed":""}"
                    style=${`--progress: ${H.percent}%`}
                    >${H.label}${H.index>0?c`<span class="merge-step__n"
                          >${H.index}/${H.total}</span
                        >`:""}</span
                  >
                </div>`:""}
            ${ne}
            ${o?ae:Q||B||K||ie||re||P.length>0||I?c`<div class="rtile__meta">
                    ${Q}${B}${K}${Wr(e.exec_chips)}${re}
                    ${P.length>0?P.map(Ee=>c`<span
                              class="worker-usage"
                              title=${Ee.tooltip}
                              >${Ee.label}</span
                            >`):I?c`<span
                            class="worker-usage"
                            title=${zo(e.usage)}
                            >${I}</span
                          >`:""}${pe}
                  </div>`:""}
            ${Si(e)} ${ye}
            <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
            ${s||C?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}`}
    ${Dv(l,t)}${qv(k)}
  </div>`}function zv(e){let t=e.last_activity&&typeof e.last_activity=="object"?e.last_activity:null,n=Array.isArray(e.legs)?e.legs:[],r=e.dependency_chips||null;return!t&&n.length===0&&!r&&e.kind!=="session"?null:{...t?{last_activity:t}:{},...n.length>0?{legs:n}:{},...r?{dependency_chips:r}:{}}}function Mf(e,t=Date.now(),n=null){let r=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${r.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:r.map(o=>ic(o,t,n,{monitor:zv(o)}))}
  </div>`}function Oo(e,t,n=!1){let r=!!t.discard?.error;return!e||!r&&t.parked!==!0?{}:{resolve_action:!0,resolve_enabled:!n,resolve_title:n?"\uC138\uC158 \uAE30\uB3D9 \uC694\uCCAD \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":r?"\uC2E4\uD328\uD55C \uD3D0\uAE30\uB97C \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 \u2014 \uAE30\uB85D\uB41C \uC138\uC158\uC774 \uC788\uC73C\uBA74 fork\uD558\uACE0, \uC5C6\uC73C\uBA74 \uC0C8 \uC138\uC158\uC5D0 \uC0AC\uC720\uB97C \uC2E3\uC2B5\uB2C8\uB2E4":"\uD30C\uD0B9\uC744 \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 \u2014 \uC0B4\uC544 \uC788\uB294 \uBB38\uC758 \uC138\uC158\uC774 \uC788\uC73C\uBA74 \uADF8 \uCC3D\uC744 \uAC00\uB9AC\uD0B5\uB2C8\uB2E4"}}var an="",Hv=["impl_runtime","impl_model","impl_effort"],qf=["claude","codex"],Kv=["claude_account","codex_account"],Gv=5,wa=1;function In(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function $a(e,t){let n=t.transport,r=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,o=t.notify||(A=>me(A,"error",4e3)),i={},s={},l={},a={},u=[],d=!1,f={state:"absent",values:{},warnings:[]},h={},g={},k=Promise.resolve(),E=Promise.resolve(),C={claude:null,codex:null},te=!1,ie=null,z={},P="",I="general",q="",F=!1,H=!1,U=!1,M=null,Q=!1;function B(){let A=t.queue?t.queue():null;return In(A)?A:null}function ne(){let A=B();return A?A.runner_catalog:null}function ge(){let A=B();return A&&In(A.execution_defaults)?A.execution_defaults:null}function Oe(){let A=B();return!!(A&&Object.hasOwn(A,"quick_fix_orchestration_model"))}function K(){let A=t.implPresetStore?.get();return In(A)&&Array.isArray(A.presets)?A:null}function re(){return r===null?{}:{root_dir:r}}async function pe(A,j){return Q||!n?null:await n(A,j)}function Te(A){A&&In(A.queue)&&t.onQueueAdopt?.(A.queue)}async function Y(A,j){let W=B();if(!W||Q)return null;let $e=await pe(A,{...j,...re(),expected_revision:W.revision});if(Te($e),r!==null&&$e&&$e.conflict){let we=$e.queue&&typeof $e.queue.revision=="number"?$e.queue.revision:B()?.revision??W.revision;$e=await pe(A,{...j,...re(),expected_revision:we}),Te($e)}return $e}async function ae(){d=!0,Ne();try{let A=await pe("get-session-defaults",{...re()});i=pi(A?.values),s={...i},l={},a={},u=Array.isArray(A?.warnings)?A.warnings:[]}catch(A){u=["kv_read_failed"],o(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${A instanceof Error?A.message:String(A)}`)}finally{d=!1,Ne()}}function Z(A,j){let W={...j};for(let $e of Ho){let we=s[$e];we!==A[$e]&&(typeof we=="string"?W[$e]=we:delete W[$e])}return W}function be(){E=E.then(()=>Ie())}async function Ie(){let A=Vu(i,s);if(Object.keys(A).length===0)return;let j={...s};try{let W=await pe("set-session-defaults",{values:A,...re()});i=pi(W?.values),s=Z(j,i),u=Array.isArray(W?.warnings)?W.warnings:[]}catch(W){o(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${W instanceof Error?W.message:String(W)}`)}Ne()}function ye(A,j){if(!In(A))return;let W=A.state;f={state:W==="usable"||W==="unusable"||W==="absent"?W:"absent",values:In(A.values)?{...A.values}:{},warnings:Array.isArray(A.warnings)?A.warnings:[]},g={...f.values},j&&(h={...g})}async function Le(){try{ye(await pe("get-workspace-accounts",{...re()}),!0)}catch(A){f={state:"unusable",values:{},warnings:["kv_read_failed"]},g={},h={},o(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${A instanceof Error?A.message:String(A)}`)}Ne()}async function Ge(A){try{let j=await fetch(A);if(!j.ok)return null;let W=await j.json();if(!In(W)||!Array.isArray(W.accounts))return null;let $e=W.accounts.filter(we=>In(we)&&typeof we.key=="string"&&we.key.length>0&&typeof we.email=="string"&&we.email.length>0);return{accounts:$e,active:$e.find(we=>we.active===!0)||null}}catch{return null}}async function gt(){te=!0;let[A,j]=await Promise.all([Ge("/api/claude-usage"),Ge("/api/codex-usage")]);Q||(C={claude:A,codex:j},Ne())}function V(){let A={};for(let j of Kv){let W=Object.hasOwn(h,j)?h[j]:null,$e=Object.hasOwn(g,j)?g[j]:null;W!==$e&&(A[j]=W)}return A}async function J(){let A=V();if(Object.keys(A).length!==0){try{ye(await pe("set-workspace-accounts",{values:A,...re()}),!1)}catch(j){o(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${j instanceof Error?j.message:String(j)}`)}Ne()}}function oe(A,j){j===an?delete h[A]:h[A]=j,Ne(),k=k.then(()=>J())}function de(A,j){if(Hv.includes(A)){Ye(A,j);return}j===an?delete s[A]:s[A]=j,Ne(),be()}function Ee(A,j){l[A]=j,delete a[A]}function _e(A,j,W){if(l[A]=j,j.length>0&&!W(j)){a[A]=!0,Ne();return}delete l[A],delete a[A],j.length===0?delete s[A]:s[A]=j,Ne(),be()}function Re(){let A=ut().orchestration_model,j=Cn({global:{orchestration_model:A??void 0},execution_defaults:ge(),runner_catalog:ne()}).orchestration_model.value;return j?Mn(ne(),j):null}function Fe(A,j){typeof j=="string"&&j.length>0?s[A]=j:delete s[A]}function Ye(A,j){let W=j===an?void 0:j,$e=Ku({impl_runtime:A==="impl_runtime"?W:s.impl_runtime,impl_model:A==="impl_model"?W:s.impl_model,impl_effort:A==="impl_effort"?W:s.impl_effort},ne(),Re());Fe("impl_runtime",$e.impl_runtime),Fe("impl_model",$e.impl_model),Fe("impl_effort",$e.impl_effort),Ne(),be()}async function Be(){let A=B();if(!A)return;let j={orchestration_model:A.orchestration_model??null,orchestration_effort:A.orchestration_effort??null,orchestration_speed:A.orchestration_speed??null,quick_fix_orchestration_model:A.quick_fix_orchestration_model??null,quick_fix_orchestration_effort:A.quick_fix_orchestration_effort??null,quick_fix_orchestration_speed:A.quick_fix_orchestration_speed??null},W=Qu(j,{...j,...z});if(Object.keys(W).length!==0){try{let $e=await Y("worker-queue-set-orchestration-defaults",{values:W});if($e&&$e.applied===!1){o("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}z={}}catch($e){o(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${$e instanceof Error?$e.message:String($e)}`)}Ne()}}function ee(A,j){z[A]=j===an?null:j,Ne(),Be()}function G(A){if(ie=A,!A){Ne();return}let j=ne(),W=ut(),$e=W.orchestration_model;$e&&!yo(j,A).includes($e)&&(z.orchestration_model=null,$e=null);let we=W.orchestration_effort;we&&!gi(j,A,$e||Sn).includes(we)&&(z.orchestration_effort=null),Ne(),Be()}async function Se(A){if(!(!B()||A<wa)){try{await Y("worker-queue-set-slots",{slots:A})}catch(j){o(`slots \uC800\uC7A5 \uC2E4\uD328: ${j instanceof Error?j.message:String(j)}`)}Ne()}}async function ht(A){if(!(!B()||A<wa||A>Gv)){try{await Y("worker-queue-set-serial-lane-count",{count:A})}catch(j){o(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${j instanceof Error?j.message:String(j)}`)}Ne()}}async function at(A,j){let W=A==="auto_advance"?"worker-automation-toggle":A==="auto_merge"?"worker-merge-auto-toggle":"worker-provider-auto-switch-toggle";try{await Y(W,{on:j})}catch($e){o(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${$e instanceof Error?$e.message:String($e)}`)}Ne()}function ze(){let A={},j=ut();for(let W of ho){let $e=Pn.includes(W)?j[W]:s[W];typeof $e=="string"&&$e.length>0&&(A[W]=$e)}return A}async function et(){let A=K();if(!A)return;let j=ze();if(Object.keys(j).length===0){o("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let W=(A.presets||[]).find(we=>we.id===P),$e=q.trim()||(W?W.name:"");if(!$e){o("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let we=W?await pe("impl-preset-update",{expected_revision:A.revision,id:W.id,name:$e,settings:j}):await pe("impl-preset-create",{expected_revision:A.revision,name:$e,settings:j});if(we&&we.applied){if(q="",!W&&Array.isArray(we.presets)){let _t=we.presets.find(kt=>kt.name===$e);P=_t?_t.id:P}Ne()}else o("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Ne()}catch(we){o(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${we instanceof Error?we.message:String(we)}`)}}async function St(){let A=K();if(!(!A||P.length===0))try{let j=await pe("impl-preset-delete",{expected_revision:A.revision,id:P});j&&j.applied?(P="",Ne()):(o("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Ne())}catch(j){o(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${j instanceof Error?j.message:String(j)}`)}}function pt(A){i=pi(A.values),s={...i},u=Array.isArray(A.warnings)?A.warnings:[],In(A.queue)&&(t.onQueueAdopt?.(A.queue),z={})}async function Ve(A){let j=K(),W=B();if(!j||!W||P.length===0||A==="quick_fix"&&!Oe())return;let $e=we=>({preset_id:P,expected_revision:j.revision,expected_queue_revision:we,...A==="quick_fix"?{lane:"quick_fix"}:{},...re()});try{let we=await pe("apply-impl-preset-global",$e(W.revision));if(A==="quick_fix"&&we&&we.lane!=="quick_fix"){o("\uC11C\uBC84 \uC751\uB2F5\uC5D0 lane\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uD050 \uC2A4\uB0C5\uC0F7\uC744 \uB2E4\uC2DC \uBC1B\uC740 \uB4A4 \uD655\uC778\uD558\uC138\uC694"),Ne();return}if(we&&we.applied&&pt(we),r!==null&&we&&we.queue_applied===!1){let _t=we.queue&&typeof we.queue.revision=="number"?we.queue.revision:B()?.revision??W.revision;if(we=await pe("apply-impl-preset-global",$e(_t)),A==="quick_fix"&&we&&we.lane!=="quick_fix"){o("\uC11C\uBC84 \uC751\uB2F5\uC5D0 lane\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uD050 \uC2A4\uB0C5\uC0F7\uC744 \uB2E4\uC2DC \uBC1B\uC740 \uB4A4 \uD655\uC778\uD558\uC138\uC694"),Ne();return}we&&we.applied&&pt(we)}we&&we.applied?we.queue_applied===!1&&o("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):we&&we.conflict&&o("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(we){o(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${we instanceof Error?we.message:String(we)}`)}Ne()}async function w(){H=!0,U=!1,Ne();try{let A=await pe("get-worker-system-prompt",{});!A||typeof A!="object"||Array.isArray(A)?U=!0:M=A}catch{U=!0}finally{H=!1,Ne()}}function se(){if(F=!F,F&&!M){w();return}Ne()}function Me(){let A=Eo({loading:H,error:U});if(A)return A;if(!M)return"";let j=Array.isArray(M.variants)?M.variants:[];return c`<div class="settings-dialog__sp-body">
      ${M.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${M.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${j.map(W=>c`<div class="settings-dialog__sp-variant" data-variant=${W.key}>
            <div class="settings-dialog__sp-cond">${W.condition}</div>
            ${cr(W.label,W.system_prompt)}
          </div>`)}
    </div>`}function Ue(){return c`<section
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
        @click=${se}
      >
        ${F?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${F?Me():""}
    </section>`}function Ze(A,j,W,$e,we,_t,kt,vt){let Tt=we[A]??an,Wt=Ja(A,W,we,ge(),ne(),kt,vt),Ht=Wt.options.find(wt=>wt.value===Tt),Nt=Tt===an?Wt.full_value:Ht?.full_value;return c`<select
        class=${Tt===an?"settings-dialog__unset":""}
        data-key=${A}
        aria-label=${j}
        title=${Nt||""}
        ?disabled=${_t===!0||vt!=="quick_fix"&&Wt.disabled}
        .value=${$r(String(Tt))}
        @change=${wt=>$e(A,String(wt.target.value))}
      >
        <option value=${an} ?selected=${Tt===an}>
          ${Wt.unset_label}
        </option>
        ${Wt.options.map(wt=>c`<option
              value=${wt.value}
              title=${wt.full_value||""}
              ?selected=${wt.value===Tt}
            >
              ${wt.label}
            </option>`)}
      </select>
      ${Tt===an?c`<span class="settings-dialog__source-badge">기본</span>`:""}`}function Pe(A,j,W,$e,we,_t=!1,kt,vt=null,Tt=null){return c`<div
      class=${`settings-dialog__row${_t?" settings-dialog__row--off":""}`}
      title=${_t&&Tt?Tt:""}
    >
      <span class="settings-dialog__row-label">${j}</span>
      <span class="settings-dialog__controls">
        ${Ze(A,j,W,$e,we,_t,kt,vt)}
      </span>
    </div>`}function tt(A,j,W,$e,we,_t){let kt=Object.hasOwn(a,A),vt=l[A]??s[A]??an;return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${j}</span>
      <span class="settings-dialog__controls">
        <input
          type="text"
          class=${`settings-dialog__text${kt?" settings-dialog__text--invalid":""}`}
          data-key=${A}
          aria-label=${j}
          aria-invalid=${String(kt)}
          placeholder=${W}
          .value=${$r(vt)}
          @input=${Tt=>Ee(A,String(Tt.target.value))}
          @change=${Tt=>_e(A,String(Tt.target.value).trim(),_t)}
        />
        ${vt.length===0?c`<span class="settings-dialog__source-badge">기본</span>`:""}
        <span class="settings-dialog__hint" data-key-hint=${A}
          >${kt?we:$e}</span
        >
      </span>
    </div>`}function $t(A,j,W,$e){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${j}</span>
      <span class="settings-dialog__controls">
        <label class="settings-dialog__check">
          <input
            type="checkbox"
            data-key=${A}
            .checked=${s[A]===Ko}
            @change=${we=>de(A,we.target.checked?Ko:an)}
          />
          ${W}
        </label>
        <span class="settings-dialog__hint" data-key-hint=${A}>${$e}</span>
      </span>
    </div>`}function qt(A,j){let W=j?j.active:null;return In(W)?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${A==="claude"?W.email:Co({...W,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)"}function Dt(A,j,W){let $e=C[W],we=Object.hasOwn(h,A)?h[A]:an,_t=W==="claude"?ca:Co,kt=!!$e?.accounts.some(vt=>vt.key===we);return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${j}</span>
      <span class="settings-dialog__controls">
        <select
          aria-label=${j}
          data-account-key=${A}
          @change=${vt=>oe(A,String(vt.target.value))}
        >
          <option value=${an} ?selected=${we.length===0}>
            ${qt(W,$e)}
          </option>
          ${we.length>0&&!kt?c`<option value=${we} selected>
                ${we} (목록에 없음)
              </option>`:""}
          ${$e?.accounts.map(vt=>c`<option value=${vt.key} ?selected=${vt.key===we}>
                ${_t(vt)}
              </option>`)||""}
        </select>
        ${$e?"":c`<span class="settings-dialog__hint"
              >계정 목록을 불러올 수 없습니다</span
            >`}
      </span>
    </div>`}function ue(){let A=f.warnings.join(", ");return f.state==="unusable"?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uD574\uC11D\uD560 \uC218 \uC5C6\uC5B4 \uC774 \uB808\uD3EC\uC758 \uB514\uC2A4\uD328\uCE58\uAC00 \uAC70\uBD80\uB429\uB2C8\uB2E4 \u2014 ${A} \xB7 \uACC4\uC815\uC744 \uB2E4\uC2DC \uACE0\uB974\uBA74 \uD574\uC18C\uB429\uB2C8\uB2E4`:f.warnings.length>0?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC5D0 \uC54C \uC218 \uC5C6\uB294 \uD0A4\uAC00 \uC788\uC2B5\uB2C8\uB2E4 \u2014 ${A}`:null}function he(A,j,W,$e,we,_t){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${j}-on)`}
        ></i>
        ${A}
      </span>
      <span class="settings-dialog__controls">
        ${Ze(W,`${A} \uBAA8\uB378`,$e,de,s,!1)}
        ${Ze(we,`${A} effort`,mi,de,s,!1)}
        ${Ze(_t,`${A} \uC18D\uB3C4`,Wu,de,s,!1)}
      </span>
    </div>`}function Ke(A,j,W,$e){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${j}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${$e?" is-on":""}`}
          data-automation=${A}
          aria-pressed=${$e?"true":"false"}
          aria-label=${j}
          @click=${()=>at(A,!$e)}
        >
          ${$e?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${W}</span>
      </span>
    </div>`}function nt(A,j,W,$e){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${j}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${A}>
          <button
            type="button"
            aria-label=${`${j} \uAC10\uC18C`}
            @click=${()=>$e(W-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${W}</span>
          <button
            type="button"
            aria-label=${`${j} \uC99D\uAC00`}
            @click=${()=>$e(W+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function Je(A,j){return c`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${A.rows.length>0?`\uBCC0\uACBD ${A.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${A.rows.map(W=>c`<div
            class="settings-dialog__preset-diff-row"
            data-diff-kind=${W.kind}
          >
            <span class="settings-dialog__preset-diff-label">${W.label}</span>
            <span class="settings-dialog__preset-diff-value"
              >${W.before??"\uAE30\uBCF8"}</span
            >
            <span class="settings-dialog__preset-diff-arrow">→</span>
            <span
              class="settings-dialog__preset-diff-value settings-dialog__preset-diff-after"
              >${W.after??(j==="quick_fix"?"\uAE30\uBCF8(\uD574\uC81C \u2192 \uC77C\uBC18 \uD504\uB85C\uD30C\uC77C)":"\uAE30\uBCF8(\uD574\uC81C)")}</span
            >
          </div>`)}
      ${A.ignored_keys.length>0?c`<div class="settings-dialog__preset-diff-note">
            ${A.ignored_keys.join(", ")}은(는)
            ${j==="quick_fix"?"quick_fix \uB808\uC778":"\uC804\uC5ED"} 적용이 쓰지 않는
            키라 무시됩니다
          </div>`:""}
    </div>`}function ut(){let A=B(),j={};for(let W of[...Pn,...go])j[W]=Object.prototype.hasOwnProperty.call(z,W)?z[W]:A&&typeof A[W]=="string"?A[W]:null;return j}function ft(){let A=ut(),j={};for(let W of go)j[W]=A[W]??null;for(let W of["quick_fix_impl_dispatch","quick_fix_impl_runtime","quick_fix_impl_model","quick_fix_impl_effort","quick_fix_impl_speed"])j[W]=s[W]??null;return j}function ot(){let A=ne(),j=s.impl_runtime,W=s.impl_model,$e=K(),we=B(),_t=ut(),kt=yo(A,ie),vt=bo(A,void 0).filter(je=>je!==Sn),Tt=Nr(A,void 0,void 0),Wt=gi(A,ie,_t.orchestration_model||Sn).filter(je=>je!==Sn),Ht=P?($e?.presets||[]).find(je=>je.id===P):null,Nt=Ht?Gu(ze(),In(Ht.settings)?Ht.settings:{}):null,wt={quick_fix_orchestration_model:yo(A,null),quick_fix_orchestration_effort:gi(A,null,null).filter(je=>je!==Sn),quick_fix_orchestration_speed:Gn,quick_fix_impl_dispatch:Go,quick_fix_impl_runtime:qf,quick_fix_impl_model:vt,quick_fix_impl_effort:Tt,quick_fix_impl_speed:Gn},Jt=Ht?Yu(ft(),In(Ht.settings)?Ht.settings:{},wt):null,Kt=I==="quick_fix"?Jt:Nt,jt=Oe(),Ft=jt?null:"\uC11C\uBC84\uAC00 quick_fix \uB808\uC778\uC744 \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4",Qt={...s,..._t},Ae=we&&typeof we.slots=="number"?we.slots:wa+1,S=we&&typeof we.serial_lane_count=="number"?we.serial_lane_count:wa,ve=ge()?.supported===!0,De=ue(),bt=Ja("workflow_mode",Yo,s,ge(),A);return c`
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
                .value=${$r(P)}
                @change=${je=>{P=String(je.target.value),Ne()}}
              >
                <option value="" ?selected=${P===""}>
                  실행 프리셋…
                </option>
                ${($e?.presets||[]).map(je=>c`<option
                      value=${je.id}
                      ?selected=${je.id===P}
                    >
                      ${je.name}
                    </option>`)}
              </select>
              <button
                type="button"
                class="settings-dialog__btn settings-dialog__btn--primary op-btn"
                data-preset-apply-global
                data-preset-apply-general
                ?disabled=${!Nt||Nt.rows.length===0}
                @click=${()=>Ve("general")}
              >
                일반에 적용
              </button>
              <button
                type="button"
                class="settings-dialog__btn op-btn"
                data-preset-apply-quick-fix
                title=${Ft||""}
                ?disabled=${!jt||!Jt||Jt.rows.length===0}
                @click=${()=>Ve("quick_fix")}
              >
                quick_fix 레인에 적용
              </button>
              <input
                type="text"
                class="settings-dialog__preset-name"
                placeholder=${P?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                aria-label="프리셋 이름"
                .value=${$r(q)}
                @input=${je=>{q=String(je.target.value)}}
              />
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-save
                title=${P?"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC774 \uD504\uB9AC\uC14B\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4 (\uD504\uB9AC\uC14B \u2192 \uC124\uC815 \uBC29\uD5A5\uC774 \uC544\uB2D8)":"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC0C8 \uD504\uB9AC\uC14B\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4"}
                @click=${et}
              >
                ${P?"\uD604\uC7AC \uC124\uC815\uC73C\uB85C \uB36E\uC5B4\uC4F0\uAE30":"\uC0C8 \uD504\uB9AC\uC14B \uC800\uC7A5"}
              </button>
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-delete
                ?disabled=${P.length===0}
                @click=${St}
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
                aria-pressed=${String(I==="general")}
                @click=${()=>{I="general",Ne()}}
              >
                일반
              </button>
              <button
                type="button"
                data-preset-lane="quick_fix"
                aria-pressed=${String(I==="quick_fix")}
                @click=${()=>{I="quick_fix",Ne()}}
              >
                quick_fix
              </button>
            </div>
            ${Kt?Je(Kt,I):""}

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">오케스트레이션</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">런타임</span>
                <span class="settings-dialog__controls">
                  <select
                    aria-label="런타임"
                    data-key="orchestration_runtime_filter"
                    .value=${$r(ie||an)}
                    @change=${je=>{let Et=String(je.target.value);G(Et===an?null:Et)}}
                  >
                    <option value=${an} ?selected=${!ie}>
                      전체
                    </option>
                    <option
                      value="claude"
                      ?selected=${ie==="claude"}
                    >
                      claude
                    </option>
                    <option
                      value="codex"
                      ?selected=${ie==="codex"}
                    >
                      codex
                    </option>
                  </select>
                  <span class="settings-dialog__hint"
                    >모델 목록을 좁힙니다</span
                  >
                </span>
              </div>
              ${Pe("orchestration_model","\uBAA8\uB378",kt,ee,_t)}
              ${Pe("orchestration_effort","effort",Wt,ee,_t)}
              ${Pe("orchestration_speed","\uC18D\uB3C4",Gn,ee,_t)}
            </div>

            <div class="settings-dialog__group" data-exec-accounts-group>
              <div class="settings-dialog__group-title">실행 계정</div>
              ${Dt("claude_account","Claude","claude")}
              ${Dt("codex_account","Codex","codex")}
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">한도 대응</span>
                <span class="settings-dialog__controls">
                  <label class="settings-dialog__check">
                    <input
                      type="checkbox"
                      data-provider-auto-switch
                      .checked=${we?.provider_auto_switch!==!1}
                      @change=${je=>at("provider_auto_switch",je.target.checked)}
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
                      data-mode=${an}
                      aria-pressed=${String(!s.workflow_mode)}
                      @click=${()=>de("workflow_mode",an)}
                    >
                      ${bt.unset_label}
                    </button>
                    ${s.workflow_mode?"":c`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${Yo.map(je=>c`<button
                          type="button"
                          data-mode=${je}
                          aria-pressed=${String(s.workflow_mode===je)}
                          @click=${()=>de("workflow_mode",je)}
                        >
                          ${je}
                        </button>`)}
                  </span>
                </span>
              </div>
              ${tt("bdui_url","beads-ui \uC8FC\uC18C","http://\uD638\uC2A4\uD2B8:3000","\uC138\uC158\uC774 Worker \uB808\uC778 \uBC30\uCE58\uB97C \uBB3C\uC5B4\uBCFC \uB54C \uC4F0\uB294 \uC8FC\uC18C\uC785\uB2C8\uB2E4","http:// \uB610\uB294 https:// \uB85C \uC2DC\uC791\uD558\uB294 \uC8FC\uC18C\uB9CC \uC800\uC7A5\uB429\uB2C8\uB2E4 (\uACBD\uB85C \uC5C6\uC774)",Uu)}
              ${$t("base_sync_accept_local_commits","base \uB3D9\uAE30\uD654","\uB85C\uCEEC base \uC0AC\uC6A9\uC790 \uCEE4\uBC0B \uC790\uB3D9 rebase+push","\uAEBC\uB450\uBA74 \uB85C\uCEEC base \uCCB4\uD06C\uC544\uC6C3\uC758 \uC0AC\uC6A9\uC790 \uCEE4\uBC0B\uC740 \uADF8\uB300\uB85C \uB0A8\uC2B5\uB2C8\uB2E4")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                리뷰 게이트
                <span class="settings-dialog__hint">모델 · effort · 속도</span>
              </div>
              ${he("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",Vo,"spec_review_effort","spec_review_speed")}
              ${he("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",_i,"plan_review_effort","plan_review_speed")}
              ${he("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",Vo,"impl_review_effort","impl_review_speed")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${Pe("impl_runtime","\uC704\uC784 \uB300\uC0C1",fi,de,s)}
              ${Pe("impl_model","\uBAA8\uB378",bo(A,j),de,s)}
              ${Pe("impl_effort","effort",Nr(A,j,W),de,s)}
              ${Pe("impl_speed","\uC18D\uB3C4",Gn,de,s)}
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
              ${Pe("quick_fix_orchestration_model","\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",wt.quick_fix_orchestration_model,ee,_t,!jt,Qt,"quick_fix",Ft)}
              ${Pe("quick_fix_orchestration_effort","\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",wt.quick_fix_orchestration_effort,ee,_t,!jt,Qt,"quick_fix",Ft)}
              ${Pe("quick_fix_orchestration_speed","\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4",Gn,ee,_t,!jt,Qt,"quick_fix",Ft)}
              ${Pe("quick_fix_impl_dispatch","\uC2E4\uD589 \uBC29\uC2DD",Go,de,s,!jt,Qt,"quick_fix",Ft)}
              ${Pe("quick_fix_impl_runtime","\uC704\uC784 \uB300\uC0C1",qf,de,s,!jt,Qt,"quick_fix",Ft)}
              ${Pe("quick_fix_impl_model","\uBAA8\uB378",vt,de,s,!jt,Qt,"quick_fix",Ft)}
              ${Pe("quick_fix_impl_effort","effort",Tt,de,s,!jt,Qt,"quick_fix",Ft)}
              ${Pe("quick_fix_impl_speed","\uC18D\uB3C4",Gn,de,s,!jt,Qt,"quick_fix",Ft)}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                자동화
                <span class="settings-dialog__hint"
                  >이 레포의 워커 큐가 스스로 진행하는 범위</span
                >
              </div>
              ${Ke("auto_advance","\uC790\uB3D9\uD654","\uC2AC\uB86F\uC774 \uBE44\uBA74 \uB300\uAE30 \uC55E \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4",we?.auto_advance===!0)}
              ${Ke("auto_merge","\uBA38\uC9C0","\uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4",we?.auto_merge===!0)}
              ${nt("slots","\uB3D9\uC2DC \uC2E4\uD589",Ae,je=>Se(je))}
              ${nt("serial-lane-count","\uC9C1\uB82C \uB808\uC778",S,je=>ht(je))}
            </div>
            ${Ue()}
          `}
    `}function Ne(){Q||dt(ot(),e)}return{load(){z={},I="general",l={},a={};let A=[ae(),Le()];return te||A.push(gt()),Promise.all(A).then(()=>{})},render:Ne,sessionDraft:()=>({...s}),destroy(){Q=!0,dt(c``,e)}}}function xa(e){return c`<svg
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
  </svg>`}function Nf(){return xa(jo`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function jf(){return xa(jo`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function Ff(){return xa(jo`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function Bf(){return xa(jo`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function Uf(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function Wf(e){let t=(Array.isArray(e)?e:[]).map(l=>l&&l.usage).filter(l=>l&&typeof l=="object"&&"providers"in l);if(t.length>0)return pn(ui(t));let n={};for(let l of Kn)n[l]=0;let r=!1,o=0,i=0,s=0;for(let l of Array.isArray(e)?e:[]){let a=l&&l.usage;if(a&&typeof a=="object"){let u=!1;for(let d of Kn){let f=a[d];typeof f=="number"&&Number.isFinite(f)&&(n[d]+=f,r=!0,u=!0)}if(u){i+=1;let d=a.total_cost_usd;typeof d=="number"&&Number.isFinite(d)&&(o+=d,s+=1)}}}return i>0&&s===i&&(n.total_cost_usd=o),r?nr(n):null}function Un(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function ac(e,t){let n=Un(e?.counts)?e.counts:null,r=n?n[t]:null;return typeof r=="number"&&Number.isFinite(r)?r:0}function Yv(e,t){if(!Un(t))return e;let n={...e};for(let[r,o]of Object.entries(t))o!==void 0&&(n[r]=o);return n}function Vv(e){if(!Un(e)||!Un(e.execution_defaults)||!Un(e.runner_catalog)||!Un(e.session_defaults))return null;let t={...e.session_defaults};for(let s of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[s]=="string"&&e[s].length>0&&(t[s]=e[s]);let n=Cn({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),r=Mn(e.runner_catalog,n.orchestration_model.value??""),o=vo(n,e.runner_catalog),i=jr(n,r);return o===null&&i===null?null:{orchestration:o,worker:i}}function zf(e,t){let n=t.notify||(Y=>me(Y,"error",4e3)),r=document.createElement("div");r.className="mon2-deck__main",e.appendChild(r);let o=document.createElement("div");o.className="mon2-deck__panel",o.hidden=!0;let i=document.createElement("div");i.className="mon2-deck__panel-hd";let s=document.createElement("span");s.className="mon2-deck__panel-title";let l=document.createElement("button");l.type="button",l.className="mon2-deck__panel-close",l.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),l.textContent="\u2715",i.append(s,l);let a=document.createElement("div");a.className="mon2-deck__panel-body",o.append(i,a),e.appendChild(o);let u=null,d=null,f=null,h=new Map;function g(){let Y=t.workspacesState?t.workspacesState():[];return Array.isArray(Y)?Y.filter(ae=>Un(ae)):[]}function k(Y){return g().find(ae=>ae.root_dir===Y)||null}function E(Y){return Yv(k(Y),h.get(Y))}function C(){for(let Y of g()){let ae=h.get(Y.root_dir);ae&&typeof ae.revision=="number"&&typeof Y.revision=="number"&&Y.revision>=ae.revision&&h.delete(Y.root_dir)}}async function te(Y,ae,Z){let be=t.transport,Ie=E(ae);if(!(!be||!Un(Ie))){try{let ye=await be(Y,{...Z,root_dir:ae,expected_revision:Ie.revision});if(Un(ye?.queue)&&h.set(ae,ye.queue),ye&&ye.conflict){let Le=Un(ye.queue)&&typeof ye.queue.revision=="number"?ye.queue.revision:E(ae)?.revision;ye=await be(Y,{...Z,root_dir:ae,expected_revision:Le}),Un(ye?.queue)&&h.set(ae,ye.queue)}}catch(ye){n(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${ye instanceof Error?ye.message:String(ye)}`)}re()}}function ie(Y){u!==Y&&(u=Y,t.onFocusChange?.(u),re())}function z(Y){ie(u===Y?null:Y)}function P(Y){if(d===Y){q();return}I(),d=Y;let ae=k(Y);s.textContent=`${ae?.name||Y} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,o.hidden=!1,f=$a(a,{root_dir:Y,queue:()=>E(Y),transport:t.transport,implPresetStore:t.implPresetStore,notify:n,onQueueAdopt:Z=>{h.set(Y,Z),re()}}),f.load(),re()}function I(){f?.destroy(),f=null}function q(Y){I(),d=null,o.hidden=!0,s.textContent="",Y!==!0&&re()}let F=()=>q();l.addEventListener("click",F);function H(Y){Y.key==="Escape"&&u!==null&&ie(null)}document.addEventListener("keydown",H);function U(Y,ae){let Z=Math.max(ae,Y,1);return c`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${ae}\uAC1C \uC911 ${Y}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:Z},(be,Ie)=>Ie<Y?c`<i class="mon2-deck__slot is-run"></i>`:c`<i class="mon2-deck__slot"></i>`)}
    </span>`}function M(Y){let ae=Y.auto_advance===!0,Z=Y.auto_merge===!0;return c`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${ae?" is-on":""}`}
        data-act="auto"
        aria-pressed=${ae?"true":"false"}
        aria-label=${`${Y.name} \uC790\uB3D9\uD654`}
        title=${ae?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${ae?jf():Nf()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${Z?" is-on":""}`}
        data-act="merge"
        aria-pressed=${Z?"true":"false"}
        aria-label=${`${Y.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${Z?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${Ff()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__gear${d===Y.root_dir?" is-on":""}`}
        data-act="gear"
        aria-expanded=${d===Y.root_dir?"true":"false"}
        aria-label=${`${Y.name} \uC2E4\uD589 \uC124\uC815`}
        title="이 레포의 실행 설정"
      >
        ${Bf()}
      </button>`}function Q(Y){let ae=Vv(Y);return ae?c`<div class="mon2-deck__chips">
      ${ae.orchestration?c`<span class="mon2-deck__chip" title=${ae.orchestration.title}
            >오케 ${ae.orchestration.text}</span
          >`:""}
      ${ae.worker?c`<span class="mon2-deck__chip" title=${ae.worker.title}
            >워커 ${ae.worker.text}</span
          >`:""}
    </div>`:""}function B(Y){let ae=[];for(let[Z,be]of[["queue","\uB300\uAE30"],["pr_wait","PR"],["session_active","\uC138\uC158"]]){let Ie=ac(Y,Z);Ie>0&&ae.push(`${be} ${Ie}`)}return ae.join(" \xB7 ")}function ne(Y){let ae=ac(Y,"running"),Z=typeof Y.slots=="number"?Y.slots:1;return c`<div
      class=${`mon2-deck__tile${u===Y.root_dir?" is-focus":""}`}
      role="button"
      tabindex="0"
      data-root-dir=${Y.root_dir}
      aria-pressed=${u===Y.root_dir?"true":"false"}
      title="클릭하면 이 레포만 선명하게 봅니다 (Esc로 해제)"
    >
      <div class="mon2-deck__tile-hd">
        <span class="mon2-deck__name" title=${Y.root_dir}>${Y.name}</span>
        <span
          class="mon2-deck__load"
          title=${`\uC2AC\uB86F ${Z}\uAC1C \uC911 ${ae}\uAC1C \uC2E4\uD589 \uC911`}
        >
          <span class="mon2-deck__load-n">${ae}/${Z}</span>
          ${U(ae,Z)}
        </span>
        <button
          type="button"
          class="mon2-deck__worker"
          data-act="worker"
          aria-label=${`${Y.name} Worker \uD0ED\uC73C\uB85C \uC774\uB3D9`}
          title="이 레포의 Worker 탭으로 이동"
        >
          ↗
        </button>
      </div>
      <div class="mon2-deck__tile-ft">
        <div class="mon2-deck__ops">${M(Y)}</div>
        <span class="mon2-deck__counts">${B(Y)}</span>
        ${Q(Y)}
      </div>
    </div>`}function ge(Y){let ae=t.doneItems?t.doneItems():[],Z=t.rangeLabel?t.rangeLabel():"",be=Wf(Array.isArray(ae)?ae:[]),Ie=ye=>Y.reduce((Le,Ge)=>Le+ac(Ge,ye),0);return c`<div class="mon2-deck__bar">
      <span
        class="mon2-deck__total-counts"
        title=${`visible \uB808\uD3EC ${Y.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${Z}`}
        >실행 ${Ie("running")} · 대기 ${Ie("queue")} · PR
        ${Ie("pr_wait")}${Ie("session_active")>0?` \xB7 \uC138\uC158 ${Ie("session_active")}`:""}
        · ${Z} 완료
        ${Array.isArray(ae)?ae.length:0}</span
      >
      ${be===null?"":c`<span class="mon2-deck__total-tokens">
            ${typeof be=="string"?c`<span
                  class="mon2-deck__tok"
                  title=${Uf(Z)}
                  >${be}</span
                >`:be.map(ye=>c`<span
                      class="mon2-deck__tok"
                      data-provider=${ye.provider}
                      title=${ye.tooltip}
                      >${ye.label}</span
                    >`)}
          </span>`}
    </div>`}function Oe(){let Y=g();return Y.length===0?"":c`${ge(Y)}
      <div class="mon2-deck__strip">
        ${Y.map(ae=>ne(ae))}
      </div>`}function K(){u!==null&&!k(u)&&(u=null,t.onFocusChange?.(null))}function re(){C(),K(),d!==null&&!k(d)&&q(!0),dt(Oe(),r),f?.render()}function pe(Y){let ae=Y.target;if(!ae||typeof ae.closest!="function")return;let Z=ae.closest("[data-root-dir]");if(!Z)return;let be=Z.getAttribute("data-root-dir")||"",Ie=ae.closest("[data-act]")?.getAttribute("data-act");if(Ie==="worker"){t.gotoWorkerTab?.(be);return}if(Ie==="auto"){te("worker-automation-toggle",be,{on:E(be)?.auto_advance!==!0});return}if(Ie==="merge"){te("worker-merge-auto-toggle",be,{on:E(be)?.auto_merge!==!0});return}if(Ie==="gear"){P(be);return}z(be)}function Te(Y){if(Y.key!=="Enter"&&Y.key!==" ")return;let ae=Y.target;if(!ae||typeof ae.closest!="function")return;let Z=ae.closest('[data-root-dir][role="button"]');!Z||Z!==ae||(Y.preventDefault(),z(Z.getAttribute("data-root-dir")||""))}return r.addEventListener("click",pe),r.addEventListener("keydown",Te),{render:re,focusRoot:()=>u,panelRoot:()=>d,destroy(){document.removeEventListener("keydown",H),r.removeEventListener("click",pe),r.removeEventListener("keydown",Te),l.removeEventListener("click",F),I(),dt(c``,r),e.replaceChildren()}}}var Qv=1e4,Gf="bdui.monitor.done-range",Yf="bdui.monitor.running_sort",Vf="bdui.monitor.candidate_sort",Qf="beads-ui.monitor.candidate-filter",Xf="beads-ui.monitor.sections";function Xv(){try{let e=window.localStorage.getItem(Qf);if(!e)return{...xo};let t=JSON.parse(e);return!t||typeof t!="object"?{...xo}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:xo.show_blocked,readiness:us.some(n=>n.value===t.readiness)?t.readiness:"all",routes:Kr(t.routes)}}catch{return{...xo}}}function lc(e){try{window.localStorage.setItem(Qf,JSON.stringify({show_blocked:e.show_blocked,readiness:e.readiness,routes:e.routes}))}catch{}}function Zv(){try{let e=window.localStorage.getItem(Vf);return cs.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function Jv(e){try{window.localStorage.setItem(Vf,e)}catch{}}function ek(){try{let e=window.localStorage.getItem(Xf);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function tk(e){try{window.localStorage.setItem(Xf,JSON.stringify(e))}catch{}}function nk(){try{let e=window.localStorage.getItem(Gf);return e===null?"today":zn(e)}catch{return"today"}}function rk(e){try{window.localStorage.setItem(Gf,e)}catch{}}function ok(){try{return window.localStorage.getItem(Yf)==="repo"?"repo":"started"}catch{return"started"}}function sk(e){try{window.localStorage.setItem(Yf,e)}catch{}}var Zf="tab:monitor:pipeline",ik=1e3,Hf=[{lane:"runnable",pane:"candidate",title:"\uD6C4\uBCF4",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589 \uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],ak=["queue","runnable","done"],Kf="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function lk(e){return e>=1&&e<=Kf.length?Kf[e-1]:`(${e})`}function Jf(e,t){let n=Ut("views:monitor"),r=t.gotoIssue,o=t.pipelineStore,i=t.transport,s=t.getWorkspacePath,l=t.openDoc,a=t.switchWorkspace,u=t.router,d=t.now||(()=>Date.now()),f=t.confirm||(m=>typeof globalThis.confirm!="function"||globalThis.confirm(m)),h=nk(),g=ok(),k=Xv(),E=Zv(),C=ek(),te=fa("beads-ui.monitor.lane-collapsed"),ie=!1,z=null,P=null,I=null,q=null,F=null,H=null,U=_o(()=>W()),M=null,Q=null,B=null,ne=null;function ge(m){return ne===null&&(ne=de()),np(m,ne)}function Oe(m,_){K(),!(_<=0)&&(Q={lane_id:m,corrected:_},B=setTimeout(()=>{B=null,Q=null,W()},Qv))}function K(){B!==null&&(clearTimeout(B),B=null),Q=null}function re(){let m=eo.find(_=>_.value===h);return m?m.label:""}let pe=document.createElement("div");pe.className="mon",e.appendChild(pe);let Te=document.createElement("div");Te.className="worker-drawer-overlay",Te.hidden=!0;let Y=document.createElement("div");Y.className="worker-drawer-overlay__backdrop";let ae=document.createElement("div");ae.className="worker-drawer-host mon2-drawer",Te.append(Y,ae),e.appendChild(Te);let Z=kr(null,null),be=new Map,Ie=new Map,ye=new Set,Le=null,Ge=null,gt=null,V=To(ae,{transport:i,sessionLogStore:t.sessionLogStore,onClose:()=>{P=null,Te.hidden=!0,W()}}),J=ma({transport:i,console_el:pe,getLanes:()=>Z,getWorkspaces:()=>o&&o.get?o.get():null,getCrossLanes:Nt,reproject:m=>({lanes:j(m),raw_lanes:m}),onCorrection:Oe,showToast:me,requestRender:()=>W(),adoptQueue:(m,_)=>{Ie.set(m,_)},onDragBegin:()=>{I=null},candidate_drop:!0}),{applyDrop:oe,dropModel:de,runPlanned:Ee,sendQueueCas:_e}=J;async function Re(m,_,T,p,b=!0){if(!i||!T)return null;let D=await i(m,{..._,root_dir:T,expected_revision:p});if(D&&D.conflict&&b){D.queue&&Ie.set(T,D.queue);let X=D.queue&&typeof D.queue.revision=="number"?D.queue.revision:p;D=await i(m,{..._,root_dir:T,expected_revision:X})}return D&&D.queue&&T&&Ie.set(T,D.queue),D}function Fe(m){let _=Ie.get(m);if(_)return _;let T=o&&o.get?o.get():null;return(Array.isArray(T)?T:[]).find(p=>p?.root_dir===m)||{}}function Ye(m,_){return Fe(m)?.merge_queue?.find(p=>p.bead_id===_)?.continuation_action}async function Be(m,_,T,p){let b=await Re(m,_,T,p),D=Ie.get(T)?.revision??b?.queue?.revision??p;return gr(b,(X,fe)=>Re(m,{..._,continuation:X,decision_token:fe},T,D,!1),{refresh:X=>Re(m,_,T,X?.queue?.revision??Ie.get(T)?.revision??D,!1)})}async function ee(m,_,T,p){let b=await gr({continuation_mismatch:p},(X,fe)=>Re("worker-merge-queue-add",{bead_id:_,continuation:X,decision_token:fe},m,T,!1)),D=b?.queue?.merge_queue?.find(X=>X.bead_id===_)?.continuation_action;b?.applied!==!0&&D?.continuation===null&&D.mismatch&&await ee(m,_,b.queue.revision,D.mismatch)}async function G(m,_,T){let p=await Re("worker-discard",m,_,T);if(p&&p.discarded===!0){me(Ri(p),"success",5e3);return}if(p&&p.reason){me(`\uD3D0\uAE30 \uC2E4\uD328: ${p.reason}`,"error");return}if(p&&p.accepted&&p.pending==="merged_revert"){me("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(p&&p.accepted){me(`\uD3D0\uAE30 \uC9C4\uD589: ${p.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}p&&!p.conflict&&me("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function Se(m,_,T,p){let b=await Re("worker-discard-abandon",m,_,T);if(b&&b.abandoned===!0){me(Ci(p),"success",5e3);return}if(b&&b.reason){me(`\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: ${b.reason}`,"error");return}b&&!b.conflict&&me("\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: unknown","error")}async function ht(m,_,T){return!i||!T?null:await i(m,{..._,root_dir:T})}async function at(m,_,T){if(!ye.has(m)){ye.add(m),W();try{let p=await Re("worker-resolve-in-session",{bead_id:m},_,T,!1);p?.session==="already_running"?me(`\uC774\uBBF8 \uC5F4\uB824 \uC788\uC2B5\uB2C8\uB2E4 \xB7 ${p.tmux_window||"?"}`,"error"):p?.launched!==!0?me(`\uC138\uC158 \uAE30\uB3D9 \uC2E4\uD328: ${p?.reason||"unknown"}`,"error"):p.mode!=="fork"&&me(`\uC0C8 \uC138\uC158\uC73C\uB85C \uC2DC\uC791 (${p.fallback_reason||"unknown"})`,"success")}finally{ye.delete(m),W()}}}async function ze(){let m=new Map;for(let _ of Z.pr_wait)m.has(_.root_dir)||m.set(_.root_dir,_.expected_revision);for(let[_,T]of m)await Re("worker-merge-queue-add-all",{},_,T)}function et(m){let _=C[m];return!!(_&&_.runnable===!0)}function St(m){let _={...C[m]||{}};_.runnable=!_.runnable,C={...C,[m]:_},tk(C),W()}function pt(m){te.toggle(m),W()}function Ve(m){te.toggleArea(m),W()}function w(m){let _=m.dependency_chips||null,T=m.overlap_chips||[],p=m.scope_state==="missing",b=m.armed_lane_chip;return!_&&T.length===0&&!p&&!b?null:{..._||{},...T.length>0?{overlaps:T}:{},...p?{scope_missing:!0}:{},...b?{armed_lane:b}:{}}}function se(m){return Mi(m,_=>U.isOpen({bead_id:m.id,chip_key:_}))}function Me(m){let _=w(m),T=se(m);return _||T?{...m,..._?{dependency_chips:_}:{},...T?{chip_popover:T}:{}}:m}function Ue(m){let _=et(m.root_dir);return c`<header class="mon2-sec__hd">
      <button
        type="button"
        class="mon2-sec__toggle"
        data-root-dir=${m.root_dir}
        data-section="runnable"
        aria-expanded=${_?"false":"true"}
        aria-label=${`${m.name} \uC139\uC158 ${_?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
      >
        ${_?"\u25B8":"\u25BE"}
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
    </header>`}function Ze(m,_){return c`<div
      class="mon2-item"
      data-bead-id=${m.id}
      data-drag-kind="candidate"
      data-root-dir=${m.root_dir}
    >
      ${_}
    </div>`}function Pe(m){if(I!==m.id)return null;let _=Z.queue_groups.find(D=>D.root_dir===m.root_dir),T=m.place_lanes||[],p=Z.cross_lanes_revision!==null,b=[{id:"parallel",label:"\uBCD1\uB82C",count:m.place_index??0}];for(let D of Z.chain_lanes)b.push({id:`lane:${D.lane_id}`,label:`\uC5F0\uACB0 ${D.number} (${D.draft?"draft":"\uD655\uC815"}) \uB05D\uC5D0`,count:D.rows.length,group:"\uC5F0\uACB0 \uB808\uC778",disabled:!p});b.push({id:"new-lane",label:"+ \uC0C8 \uC5F0\uACB0 \uB808\uC778",group:"\uC5F0\uACB0 \uB808\uC778",disabled:!p,title:p?"\uC774 \uC774\uC288\uB9CC \uB4E0 draft \uB808\uC778\uC744 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"});for(let D of T)b.push({id:`serial:${D.id}`,label:`\uC9C1\uB82C ${Number(D.id.slice(1))}`,count:D.length,group:`${_?_.name:""} \uC9C1\uB82C`});return{bead_id:m.id,lanes:b}}function tt(m){return Ze(m,c`${ml(Me(m),Pe(m),{exec_chips_mode:"pinned_only",onOpenDoc:l?(_,T)=>l(T,m.root_dir):void 0})}`)}function $t(){return Z.runnable_flat?c`<div class="mon2-flat" data-drop="candidate">
        ${Z.runnable.map(m=>tt(m))}
      </div>`:c`${Z.runnable_sections.map(m=>{let _=et(m.root_dir);return c`<section
        class="mon2-sec${_?" is-collapsed":""}"
        data-root-dir=${m.root_dir}
        data-section="runnable"
      >
        ${Ue({root_dir:m.root_dir,name:m.name,count:m.items.length})}
        ${_?"":c`<div
              class="mon2-sec__body"
              data-lane="candidate"
              data-drop="candidate"
            >
              ${m.items.map(T=>tt(T))}
            </div>`}
      </section>`})}`}function qt(m,_){return c`<div
      class="mon2-item"
      data-bead-id=${m.id}
      data-drag-kind="parallel"
      data-root-dir=${m.root_dir}
      data-row-index=${_}
      data-queue-index=${String(m.queue_index??0)}
    >
      ${qn(Me(m),{actions:$o(m,{nudgeable:!0})})}
    </div>`}function Dt(m,_,T,p){return c`<div
      class="mon2-crow${_.fixed?" mon2-crow--fixed":""}"
      draggable=${_.draggable?"true":"false"}
      data-bead-id=${_.id}
      data-drag-kind="chain"
      data-root-dir=${_.root_dir}
      data-lane-id=${m.lane_id}
      data-row-index=${T}
      data-queue-index=${typeof _.queue_index=="number"?String(_.queue_index):""}
    >
      <span class="mon2-crow__seq" aria-hidden="true"
        >${lk(_.seq)}</span
      >
      ${_.workspace_name?c`<span class="worker-mini__repo" title=${_.root_dir}
            >${_.workspace_name}</span
          >`:""}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${_.id}</span>
      <span class="mon2-crow__title">${_.title}</span>
      ${_.mismatch?c`<span
            class="mon2-crow__mismatch"
            title="레인 순서가 주장하는 선행이 bd 의존에 없습니다 — 재적용으로 복구합니다"
            >⚠ 의존 없음</span
          >`:""}
      ${p.includes(_.id)?c`<span
            class="mon2-crow__mismatch"
            title="이미 실행된 뒤 의존이 바뀌었습니다 — 이 행은 움직일 수 없어 교정하지 않습니다"
            >⚠ 의존 순서와 다름</span
          >`:""}
      <span class="mon2-crow__where" title=${_.location_title}
        >${_.location_label}</span
      >
      ${zr(_.route?{route:_.route,route_source:_.route_source??void 0}:null)}${_.exec_chips?Wr(_.exec_chips):""}
      ${ul(_.added_at)}
      ${dl({id:_.id,...typeof _.added_at=="number"?{added_at:_.added_at}:{}})}
      <button
        type="button"
        class="mon2-crow__detach"
        data-bead-id=${_.id}
        title="연결에서 빼고 앞뒤를 이어 붙입니다"
        aria-label="연결에서 빼기"
      >
        ✕
      </button>
    </div>`}function ue(m){let _=Z.cross_lanes_revision!==null,T=ge(m.lane_id),p=T?.held===!0,b=T?.cycle===!0,D=T?T.mismatched:[],X=Q&&Q.lane_id===m.lane_id?Q.corrected:0;return c`<div class="mon2-clane" data-lane-id=${m.lane_id}>
      <header class="mon2-clane__hd">
        <span class="mon2-clane__name">${m.label}</span>
        <span class="mon2-clane__count">${m.rows.length}</span>
        <span class="mon2-clane__badge mon2-clane__badge--${m.state}"
          >${m.badge}</span
        >
        ${X>0?c`<span
              class="mon2-clane__corrected"
              title="기존 blocks 의존이 드롭 순서를 이깁니다 — 그 순서로 다시 놓았습니다"
              >의존에 맞춰 ${X}건 자동 교정</span
            >`:""}
        ${b?c`<span
              class="mon2-clane__cycle"
              title="멤버들의 blocks 의존이 순환합니다 — 어느 순서도 의존을 만족시키지 못합니다"
              >⛔ 의존 사이클 — 자동 교정 불가</span
            >`:""}
        ${p?c`<span
              class="mon2-clane__hold"
              title="멤버 한 명의 의존 자료가 이 스냅샷에 아직 없습니다 — 다음 스냅샷이 채우면 교정합니다"
              >${Hi}</span
            >`:""}
        ${m.draft?c`<button
              type="button"
              class="mon2-clane__confirm"
              data-lane-id=${m.lane_id}
              ?disabled=${!_||!m.can_confirm||p}
              title=${p?Hi:m.can_confirm?"\uC778\uC811 \uC758\uC874\uC744 \uAC78\uACE0 \uBBF8\uC801\uC7AC \uBA64\uBC84\uB97C \uAC01\uC790 \uB808\uD3EC \uBCD1\uB82C \uD050 \uB05D\uC5D0 \uC62C\uB9BD\uB2C8\uB2E4":"\uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD655\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4"}
            >
              확정
            </button>`:""}
        ${m.run_label!==null?c`<button
              type="button"
              class="mon2-clane__run"
              data-lane-id=${m.lane_id}
              ?disabled=${!_}
              title="이 레인 멤버만 발차합니다 — 레포 자동 진행은 켜지 않습니다"
            >
              ${m.run_label}
            </button>`:""}
        ${m.state==="confirmed"&&m.has_mismatch?c`<button
              type="button"
              class="mon2-clane__reapply"
              data-lane-id=${m.lane_id}
              ?disabled=${!_}
              title="빠진 인접 의존을 다시 걸고 미적재 멤버를 다시 올립니다"
            >
              재적용
            </button>`:""}
        ${m.can_stop?c`<button
              type="button"
              class="mon2-clane__stop"
              data-lane-id=${m.lane_id}
              ?disabled=${!_}
              title="남은 멤버의 발차만 멈춥니다 — 도는 세션과 머지 큐 항목은 끝까지 갑니다"
            >
              ⏸ 정지
            </button>`:""}
        <button
          type="button"
          class="mon2-clane__remove"
          data-lane-id=${m.lane_id}
          ?disabled=${!_}
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
        ${m.rows.length===0?c`<div class="mon2-clane__hint">
              여기로 끌어다 놓으면 연결이 시작됩니다
            </div>`:m.rows.map((fe,st)=>Dt(m,fe,st,D))}
      </div>
    </div>`}function he(m,_,T){return c`<div
      class="mon2-item"
      data-bead-id=${_.id}
      data-drag-kind="repo-serial"
      data-root-dir=${_.root_dir}
      data-lane-id=${m.id}
      data-row-index=${T}
      data-queue-index=${String(_.queue_index??0)}
    >
      ${qn(Me(_),{actions:$o(_)})}
    </div>`}function Ke(m){if(m.length===0)return"";let _=m.length-1;return`${m[0].id} \uC810\uC720${_>0?` +${_}`:""}`}function nt(m){return c`<div
      class="mon2-item mon2-item--ghost"
      data-bead-id=${m.id}
    >
      ${qn({id:m.id,title:m.title,lane:"running",draggable:!1,ghost:!0,badges:[m.badge]})}
    </div>`}function Je(m,_){let T=_.occupants,p=_.cross_wait_peers||[];return{id:_.id,pane_id:"",title:`${m.name} \xB7 \uC9C1\uB82C ${_.index+1}`,rows:[...T.map(b=>nt(b)),..._.items.map((b,D)=>he(_,b,D))],count:_.items.length,empty:_.empty===!0,...T.length>0?{badge:c`<span
              class="mon2-lane__occupant"
              title=${T.map(b=>`${b.id} \u2014 ${b.badge}`).join(`
`)}
              >${Ke(T)}</span
            >`,held:!0}:{},cycle:_.cycle,header_control:c`<button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${m.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>`,...p.length>0?{after:c`${p.map(b=>c`<div class="mon2-lane__cross-wait">
                  ⚠ 상호 정지 — ${b.workspace_name}·${b.lane}과 교차 대기
                </div>`)}`}:{}}}function ut(){let m=Z.cross_lanes_revision!==null,_=Z.chain_lanes.some(T=>T.draft&&T.rows.length===0);return qi({parallel:{rows:Z.parallel_rows.map((T,p)=>qt(T,p)),count:Z.parallel_rows.length,collapsed:te.isAreaCollapsed("parallel"),drop:{drop:"parallel"}},serial:{lanes:Z.queue_groups.flatMap(T=>T.sublanes.serial.map(p=>({...Je(T,p),drop:{drop:"repo-serial",root_dir:T.root_dir,lane_id:p.id,lane_length:String(p.raw_length)}}))),collapsed:te.isAreaCollapsed("serial"),extra_panes:Z.chain_lanes.map(T=>ue(T)),header_control:c`<button
          type="button"
          class="mon2-newlane"
          ?disabled=${_||!m}
          title=${m?_?"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC774 \uC774\uBBF8 \uC788\uC2B5\uB2C8\uB2E4":"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC744 \uD558\uB098 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
        >
          + 연결 레인
        </button>`,...Z.cross_lanes_unreadable?{notice:c`<div class="mon2-clane__unreadable">
                연결 레인 저장소를 읽을 수 없음
              </div>`}:{}}})}function ft(m){return c`<div class="worker-rungrid">
      ${Z.running.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:Z.running.map(_=>ic({bead_id:_.id,attempt_id:_.attempt_id||"",title:_.title,runner:_.runner??null,model:_.model??null,effort:_.effort??null,speed:_.speed??null,started_at:_.started_at??null,kind:_.kind,..._.kind==="session"?{updated_at:_.updated_at,session_refs:_.session_refs||[]}:{},workflow:_.workflow||null,resumed_from:_.resumed_from??null,continuation_mode:_.continuation_mode??null,paused:_.run_state==="paused",failed:_.run_state==="failed",parked:_.run_state==="parked",retry_wait:_.run_state==="retry_wait",waiting:_.run_state==="waiting",wait:_.wait||null,provider_hold:_.run_state==="provider_hold",hold:_.hold?{..._.hold,open:F===_.attempt_id}:null,retry:_.retry||null,status:_.status,status_label:_.run_state==="failed"?"\uC2E4\uD328":_.run_state==="parked"?"\uC138\uC158 \uB300\uAE30":_.run_state==="retry_wait"?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":_.run_state==="waiting"?"\uC120\uD589 \uB300\uAE30":_.run_state==="provider_hold"?"\uACF5\uAE09\uC790 \uBCF4\uB958":void 0,can_pause:_.can_pause!==!1,exec_chips:_.exec_chips||null,usage:_.usage||null,chip_popover:se(_),discard:_.discard,failure:_.failure?{..._.failure,open:q===_.attempt_id}:null,...Oo(_.id,{discard:_.discard,parked:_.run_state==="parked"},ye.has(_.id))},m,P,{monitor:{repo:_.workspace_name,root_dir:_.root_dir,serial_lane_id:_.serial_lane_id,cross_lane_chip:_.cross_lane_chip||null,last_activity:_.last_activity||null,legs:_.legs||[],dependency_chips:w(_)}}))}
    </div>`}function ot(m){let _={runnable:Z.runnable,queue:Z.queue,running:Z.running,pr_wait:Z.pr_wait,done:Z.done},T=p=>{let b=_[p.lane],D=p.lane==="runnable"?Z.runnable_flat?b.length>0?$t():void 0:Z.runnable_sections.length>0?$t():void 0:p.lane==="queue"?Z.queue_groups.length>0||Z.chain_lanes.length>0||Z.parallel_rows.length>0||Z.cross_lanes_unreadable?ut():void 0:p.lane==="running"?ft(m):b.length>0?c`${b.map(X=>qn(Me(X)))}`:void 0;return Yn({id:`monitor-${p.lane}`,lane:p.pane,title:p.title,items:b,count:b.length,src:p.lane==="runnable",empty:p.empty,body:D,live:p.lane==="running"&&b.length>0,collapsible:!0,collapsed:te.isCollapsed(p.pane),controls:p.lane==="runnable"?Ne():void 0,header_control:A(p.lane,b.length)})};if(ie){let p=ak.map(b=>Hf.find(D=>D.lane===b)).filter(b=>b!==void 0);return c`<div class="mon2-deck"></div>
        <div class="worker-lanes-host">
          <div class="worker-lanes worker-lanes--mobile mon2-lanes">
            ${Ni({live:Z.running.length>0,running_body:Z.running.length>0?ft(m):"",pr_wait_rows:Z.pr_wait.map(b=>qn(Me(b))),count:Z.running.length+Z.pr_wait.length})}
            ${p.map(b=>T(b))}
          </div>
        </div>
        ${Ro(H?.draft||null,H?Fe(H.root_dir):{})}`}return c`<div class="mon2-deck"></div>
      <div class="worker-lanes-host">
        <div class="worker-lanes mon2-lanes">
          ${Hf.map(p=>T(p))}
        </div>
      </div>
      ${Ro(H?.draft||null,H?Fe(H.root_dir):{})}`}function Ne(){return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시">
        <input
          type="checkbox"
          class="mon-filter__blocked"
          .checked=${k.show_blocked}
        />
        🔒
        blocked${Z.runnable_hidden.blocked>0?` ${Z.runnable_hidden.blocked}`:""}
      </label>
      <div
        class="worker-filter__readiness"
        role="group"
        aria-label="준비도 필터"
      >
        ${us.map(m=>c`<button
              type="button"
              class="mon-filter__readiness worker-filter__chip${k.readiness===m.value?" is-active":""}"
              data-readiness=${m.value}
              aria-pressed=${k.readiness===m.value?"true":"false"}
            >
              ${m.label}
            </button>`)}
        ${Z.runnable_hidden.readiness>0?c`<span class="worker-filter__hidden"
              >숨김 ${Z.runnable_hidden.readiness}</span
            >`:""}
      </div>
      <div class="worker-filter__routes" role="group" aria-label="route 필터">
        ${ds.map(m=>c`<button
              type="button"
              class="mon-filter__route worker-filter__chip${k.routes.includes(m.value)?" is-active":""}"
              data-route=${m.value}
              aria-pressed=${k.routes.includes(m.value)?"true":"false"}
            >
              ${m.label}
            </button>`)}
        ${Z.runnable_hidden.route>0?c`<span class="worker-filter__hidden"
              >숨김 ${Z.runnable_hidden.route}</span
            >`:""}
      </div>
    </div>`}function A(m,_){return m==="runnable"?c`<select
        class="mon-candidate-sort worker-sort"
        aria-label="후보 정렬"
        title="후보 정렬"
        .value=${E}
      >
        ${cs.map(T=>c`<option
              value=${T.value}
              ?selected=${E===T.value}
            >
              ${T.label}
            </option>`)}
      </select>`:m==="running"?c`<select
        class="mon-running-sort worker-sort"
        aria-label="실행중 정렬"
        title="실행중 정렬"
        .value=${g}
      >
        <option value="started" ?selected=${g==="started"}>
          시작순
        </option>
        <option value="repo" ?selected=${g==="repo"}>
          레포순
        </option>
      </select>`:m==="pr_wait"&&_>0?c`<button
        type="button"
        class="mon-lane-op mon-merge-all"
        title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
      >
        일괄 머지
      </button>`:m==="done"?c`<select
        class="mon-done-range worker-sort"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${h}
      >
        ${eo.map(T=>c`<option value=${T.value} ?selected=${h===T.value}>
              ${T.label}
            </option>`)}
      </select>`:""}function j(m){let _=o&&o.get?o.get():null,T=o&&o.getWorkspacesState?o.getWorkspacesState():[],p=m===void 0?o&&o.crossLanes?o.crossLanes():void 0:m,b={done_since:Mr(h,d()),running_sort:g,candidate_filter:k,candidate_sort:E};return p!==void 0&&(b.cross_lanes=p),kr(_,T,b)}function W(){let m=d();Z=j(),ne=null,be=new Map;for(let _ of[...Z.runnable,...Z.queue,...Z.running,...Z.pr_wait,...Z.done])!_.non_occupying&&!be.has(_.id)&&be.set(_.id,_);dt(ot(m),pe),ya(pe),we()?.render(),$e(),_t()}function $e(){let m=new Map;for(let _ of Z.queue_groups)m.set(_.root_dir,_.auto_advance);for(let _ of Array.from(pe.querySelectorAll(".worker-wait__area--parallel .worker-mini__repo"))){let T=_.closest(".mon2-item")?.getAttribute("data-root-dir")||"",p=m.get(T);typeof p=="boolean"&&_.setAttribute("title",`${_.textContent||""} \xB7 ${p?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function we(){if(gt)return gt;let m=pe.querySelector(".mon2-deck");return m?(gt=zf(m,{workspacesState:()=>o&&o.getWorkspacesState?o.getWorkspacesState():[],doneItems:()=>Z.done,rangeLabel:re,transport:i,implPresetStore:t.execPresetStore,gotoWorkerTab:vt,onFocusChange:_=>{M=_,_t()}}),gt):null}function _t(){pe.classList.toggle("has-focus",M!==null);for(let m of Array.from(pe.querySelectorAll(".mon2-sec[data-root-dir]")))m.classList.toggle("is-focus",M!==null&&m.getAttribute("data-root-dir")===M);for(let m of Array.from(pe.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let _=be.get(m.getAttribute("data-bead-id")||"");m.classList.toggle("is-focus",M!==null&&!!_&&_.root_dir===M)}for(let m of Array.from(pe.querySelectorAll(".mon2-crow[data-root-dir]")))m.classList.toggle("is-focus",M!==null&&m.getAttribute("data-root-dir")===M)}function kt(m,_){let T=s?s():void 0;if(!_||!T||_===T||!a){r(m);return}a(_).then(()=>{r(m)}).catch(p=>{n("workspace switch for %s failed: %o",_,p)})}function vt(m){if(!m)return;let _=s?s():void 0,T=()=>{try{u?.gotoView("worker")}catch(p){n("gotoView(worker) failed: %o",p)}};if(!a||_&&_===m){T();return}a(m).then(T).catch(p=>{n("workspace switch for %s failed: %o",m,p),me("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function Tt(m){yn(m).then(_=>{me(_?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",_?"success":"error",1400)})}function Wt(m){let _=be.get(m)||null;return{item:_,root_dir:_?_.root_dir:"",revision:_?_.expected_revision:0}}async function Ht(m,_,T){if(m!=="dep-add")return;let p=Z.chain_lanes.find(b=>b.rows.some(D=>D.id===_));!p||!p.rows.some(b=>b.id===T)||await Ee(b=>ap(p.lane_id,b),"",[{type:m,a:_,b:T}])}function Nt(){return(o&&o.crossLanes?o.crossLanes():null)??null}async function wt(m,_){if(m==="run"){await Kt(_);return}if(m==="stop"){await jt(_);return}if(m==="create"){await Ee(T=>Al(null,T),"");return}if(m==="remove"){let T=cp(_,de());if(T!==null&&!f(T))return;await Ee(p=>lp(_,p),"");return}await Ee(T=>m==="confirm"?sp(_,T):ip(_,T),"")}function Jt(m){let _=new Map;for(let T of m.rows){let p=Z.owner_of[T.id]||T.root_dir;typeof p!="string"||p.length===0||_.set(p,[..._.get(p)||[],T.id])}return _}async function Kt(m){let _=Z.chain_lanes.find(D=>D.lane_id===m);if(!_||Z.cross_lanes_revision===null){W();return}K();let T=new Map,p=new Map,b=Jt(_);for(let D of _.rows){if(D.fixed||typeof D.queue_index=="number")continue;let X=Z.owner_of[D.id]||D.root_dir;if(typeof X!="string"||X.length===0){me(`${D.id}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC801\uC7AC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`,"error"),W();return}let fe=p.get(X)??0;if(await _e("worker-queue-place",{bead_id:D.id,lane:"parallel",index:(Z.parallel_raw_length[X]??0)+fe},X,T,{bead_id:D.id})===null){W();return}p.set(X,fe+1)}for(let[D,X]of b)if(await _e("worker-queue-arm",{bead_ids:X,lane_id:m},D,T,{bead_id:X[0]})===null){me("\uC77C\uBD80 \uB808\uD3EC\uC5D0\uC11C \uC9C4\uD589\uC744 \uCF1C\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589]\uC73C\uB85C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694","error"),W();return}W()}async function jt(m){let _=Z.chain_lanes.find(p=>p.lane_id===m);if(!_||Z.cross_lanes_revision===null){W();return}K();let T=new Map;for(let[p,b]of Jt(_))if(await _e("worker-queue-disarm",{lane_id:m},p,T,{bead_id:b[0]})===null)break;W()}async function Ft(m,_){if(!i||!m||_.length===0){W();return}let T=await i("worker-queue-start-now",{bead_id:m,root_dir:_});T&&T.queue&&Ie.set(_,T.queue),T&&T.ok===!1&&me(`\uC9C0\uAE08 \uC2DC\uC791 \uAC70\uBD80: ${T.reason==="not_waiting"?"\uC774 \uC774\uC288\uB294 \uB354 \uC774\uC0C1 \uB300\uAE30 \uB808\uC778\uC5D0 \uC5C6\uC2B5\uB2C8\uB2E4":T.reason||""}`,"error",2800),W()}async function Qt(m,_){let{root_dir:T,revision:p}=Wt(m);if(T.length===0){W();return}await _e("worker-queue-disarm",{bead_ids:[m],lane_id:_},T,new Map([[T,p]]),{bead_id:m}),W()}async function Ae(m,_){let T=be.get(m);if(!T){W();return}let p={kind:"candidate",bead_id:m,root_dir:T.root_dir};if(_==="new-lane"){await Ee(b=>Al({bead_id:m,root_dir:T.root_dir},b),m);return}if(_.startsWith("lane:")){let b=_.slice(5);if(!Z.chain_lanes.find(X=>X.lane_id===b)){W();return}await Ee(X=>Gi(p,{kind:"chain",lane_id:b,marker_index:(X.cross_lanes.get(b)?.entries??[]).length},X),m);return}if(_.startsWith("serial:")){let b=_.slice(7),D=(T.place_lanes||[]).find(X=>X.id===b);await oe(p,{kind:"repo-serial",root_dir:T.root_dir,lane_id:b,index:D?D.index:0});return}await oe(p,{kind:"parallel",marker_index:Z.parallel_rows.length})}async function S(m,_){let T=Z.parallel_rows,p=T.findIndex(xt=>xt.id===m);if(p<0)return;let b=T[p].root_dir,D=[];T.forEach((xt,_n)=>{xt.root_dir===b&&D.push(_n)});let X=D.indexOf(p),fe=D[X+_];if(typeof fe!="number")return;let st=_===-1?fe:D[X+2]??Math.min(T.length,fe+1);await oe({kind:"parallel",bead_id:m,root_dir:b,queue_index:T[p].queue_index??0},{kind:"parallel",marker_index:st})}async function ve(m){for(let _ of Z.chain_lanes){let T=_.rows.find(p=>p.id===m);if(T){await oe({kind:"chain",bead_id:m,root_dir:T.root_dir,lane_id:_.lane_id,...typeof T.queue_index=="number"?{queue_index:T.queue_index}:{}},{kind:"parallel",marker_index:Z.parallel_rows.length});return}}}function De(m){return{runner:m.runner||void 0,model:m.model||void 0,effort:m.effort||void 0,status:m.run_state==="running"?"running":m.run_state,worktree:m.root_dir}}function bt(m,_,T,p,b={}){let D=be.get(m)||null;co({context:{bead_id:m,kind:p,tuple:D?Tn(D):""},transport:X=>Re("worker-attempt-resume",{attempt_id:_,...b,...X},T,Ie.get(T)?.revision??Wt(m).revision,!1)})}function je(){H=null,W()}function Et(){let m=H,_=m?ba(m.draft):null;!m||!_||(H=null,W(),bt(m.bead_id,_.attempt_id,m.root_dir,"session",_.payload))}function It(m,_){let{item:T,root_dir:p,revision:b}=Wt(_),D=T?.attempt_id||"",X=m.classList;if(X.contains("worker-mini__rowops-up")||X.contains("worker-mini__rowops-down")){S(_,X.contains("worker-mini__rowops-up")?-1:1);return}if(X.contains("worker-mini__rowops-remove")){Re("worker-queue-remove",{bead_id:_},p,b);return}if(X.contains("worker-mini__start-now")){Ft(_,p);return}if(X.contains("mon2-crow__detach")){ve(_);return}if(X.contains("worker-dep__open")){kt(m.getAttribute("data-dep-id")||"",m.getAttribute("data-root-dir")||"");return}if(X.contains("mon2-arm__release")){Qt(_,m.getAttribute("data-lane-id")||"");return}if(X.contains("mon-lane__chip")){let fe=m.getAttribute("data-lane-id")||"";pe.querySelector(`.mon2-clane[data-lane-id="${fe}"]`)?.scrollIntoView({block:"nearest"});return}if(X.contains("judgement-chip")){let fe=m.getAttribute("data-chip-key")||"";fe&&U.toggle({bead_id:_,chip_key:fe});return}if(X.contains("rtile__failure-badge")){q=q===D?null:D,W();return}if(X.contains("rtile__provider-hold-badge")){F=F===D?null:D,W();return}if(X.contains("rtile__attempt-copy")){let fe=m.getAttribute("data-attempt-id")||"";fe&&yn(fe).then(st=>{me(st?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",st?"success":"error",1400)});return}if(X.contains("worker-card__place")){I=I===_?null:_,W();return}if(X.contains("worker-card__place-cancel")){I=null,W();return}if(X.contains("worker-card__place-lane")){let fe=m.getAttribute("data-lane")||"parallel";I=null,Ae(_,fe);return}if(X.contains("rtile__session")){if(T&&T.kind==="session"){let fe=(T.session_refs||[]).find(st=>st&&st.current===!0);fe&&(Te.hidden=!1,V.open(uo(fe,_,"in_progress",p)),W());return}P=D,D&&T&&(Te.hidden=!1,V.open({attempt_id:D,root_dir:p,meta:De(T)})),W();return}if(X.contains("rtile__pause")){ht("worker-attempt-pause",{attempt_id:D},p);return}if(X.contains("rtile__resume-alternate")){let fe=ga(D,Fe(p));fe&&(H={root_dir:p,bead_id:_,draft:fe},W());return}if(X.contains("rtile__resume")){bt(_,D,p,m.dataset.resumeKind==="settlement"?"settlement":"session");return}if(X.contains("rtile__resolve")){at(_,p,Ie.get(p)?.revision??Wt(_).revision);return}if(X.contains("rtile__discard-abandon")){let fe={kind:m.dataset.operationKind||"",last_error:m.dataset.lastError||""};if(!f(ss(_,fe)))return;Se({bead_id:_,operation_id:m.dataset.operationId||""},p,b,fe);return}if(X.contains("rtile__discard")){let fe=m.dataset.confirmation==="merged"?"merged":"unmerged";if(!f(os(_,fe)))return;G({bead_id:_,...D?{attempt_id:D}:{},...m.dataset.operationId?{operation_id:m.dataset.operationId}:{}},p,b);return}if(X.contains("worker-mini__merge")){let fe=Ye(p,_);fe?.mismatch&&fe.continuation===null?ee(p,_,b,fe.mismatch):Re("worker-merge-queue-add",{bead_id:_},p,b);return}if(X.contains("worker-mini__merge-cancel")){Re("worker-merge-queue-remove",{bead_id:_},p,b);return}if(X.contains("worker-mini__discard-abandon")){let fe={kind:m.dataset.operationKind||"",last_error:m.dataset.lastError||""};if(!f(ss(_,fe)))return;Se({bead_id:_,operation_id:m.dataset.operationId||""},p,b,fe);return}if(X.contains("worker-mini__discard")){let fe=m.dataset.discardMode==="merged"?"merged":"unmerged";if(!f(os(_,fe)))return;G({bead_id:_,...m.dataset.attemptId?{attempt_id:m.dataset.attemptId}:{},...m.dataset.operationId?{operation_id:m.dataset.operationId}:{}},p,b);return}if(X.contains("worker-mini__revise-fix")){Be("worker-revise-fix",{bead_id:_},p,b);return}X.contains("worker-mini__revise-approve")&&Re("worker-revise-approve",{bead_id:_},p,b)}function Gt(m){let _=J.consumeClickSuppression(),T=m.target;if(!T||typeof T.closest!="function")return;if(T.closest(".provider-resume-dialog__cancel")){je();return}if(T.closest(".provider-resume-dialog__confirm")){Et();return}if(T.closest("dialog")||T.closest(".worker-drawer-overlay")||T.closest("a"))return;let p=T.closest(".worker-card__id, .worker-mini__id, .rtile__id");if(p){m.preventDefault();let en=T.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||p.textContent?.trim()||"";en&&Tt(en);return}let b=T.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(b){m.preventDefault();let cn=b.getAttribute("data-root-dir")||be.get(T.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||b.getAttribute("title")||"";vt(cn);return}let D=T.closest(".mon2-sec__toggle");if(D){m.preventDefault(),St(D.getAttribute("data-root-dir")||"");return}let X=T.closest(".worker-pane__toggle[data-lane]");if(X){m.preventDefault();let cn=X.getAttribute("data-lane")||"";(cn==="candidate"||cn==="queue"||cn==="running"||cn==="pr_wait"||cn==="done")&&pt(cn);return}let fe=T.closest(".worker-wait__area-toggle[data-area]");if(fe){m.preventDefault(),Ve(fe.getAttribute("data-area")||"parallel");return}if(T.closest(".mon2-newlane")){m.preventDefault(),wt("create","");return}let st=T.closest(".mon2-clane__confirm, .mon2-clane__reapply, .mon2-clane__remove, .mon2-clane__run, .mon2-clane__stop");if(st){m.preventDefault();let cn=st.getAttribute("data-lane-id")||"",en=st.classList;wt(en.contains("mon2-clane__confirm")?"confirm":en.contains("mon2-clane__reapply")?"reapply":en.contains("mon2-clane__run")?"run":en.contains("mon2-clane__stop")?"stop":"remove",cn);return}if(T.closest(".mon-merge-all")){m.preventDefault(),ze();return}let xt=T.closest(".mon-filter__route");if(xt){m.preventDefault(),k={...k,routes:zi(k.routes,xt.getAttribute("data-route")||"")},lc(k),W();return}let _n=T.closest(".mon-filter__readiness");if(_n){m.preventDefault(),k={...k,readiness:_n.getAttribute("data-readiness")||"all"},lc(k),W();return}let hn=T.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!hn)return;let ln=hn.getAttribute("data-bead-id")||"",Yt=T.closest("button");if(Yt){m.preventDefault(),It(Yt,ln);return}T.closest(".rtile__failure-pop, .chip-popover")||ln&&!_&&(m.preventDefault(),kt(ln,hn.getAttribute("data-root-dir")||Wt(ln).root_dir))}function Xt(m){let _=m.target;if(!_||typeof _.closest!="function")return;if(H){let X=ha(H.draft,_,Fe(H.root_dir));if(X){X!==H.draft&&(H={...H,draft:X},W());return}}let T=_.closest(".mon-filter__blocked");if(T){k={...k,show_blocked:T.checked},lc(k),W();return}let p=_.closest(".mon-candidate-sort");if(p){E=cs.some(X=>X.value===p.value)?p.value:"repo_spec",Jv(E),W();return}let b=_.closest(".mon-running-sort");if(b){g=b.value==="repo"?"repo":"started",sk(g),W();return}let D=_.closest(".mon-done-range");D&&(h=zn(D.value),rk(h),W())}function x(m){let _=m.target,T=_&&typeof _.closest=="function"?b=>_.closest(b):()=>null,p=!1;q&&!T(".rtile__failure-pop, .rtile__failure-badge")&&(q=null,p=!0),F&&!T(".rtile__provider-hold-pop, .rtile__provider-hold-badge")&&(F=null,p=!0),p&&W()}function O(m){m.key==="Escape"&&(q===null&&F===null&&H===null||(q=null,F=null,H=null,W()))}e.addEventListener("click",Gt),e.addEventListener("change",Xt),document.addEventListener("click",x),document.addEventListener("keydown",O),U.attach(),J.attach(e);{let m=!0;z=pa(_=>{if(ie=_,m){m=!1;return}W()})}o&&typeof o.subscribe=="function"&&(Le=o.subscribe(()=>{try{Ie.clear(),W()}catch{}}));function Ce(){Ge!==null&&(clearInterval(Ge),Ge=null)}return{recorrectSharedLane:Ht,load(){n("load"),W(),Ge===null&&(Ge=setInterval(()=>{try{W()}catch{}},ik))},pause(){Ce()},clear(){Ce(),J.detach(),Le&&(Le(),Le=null),z&&(z(),z=null),V.destroy(),Te.hidden=!0,gt?.destroy(),gt=null,e.removeEventListener("click",Gt),e.removeEventListener("change",Xt),document.removeEventListener("click",x),document.removeEventListener("keydown",O),U.detach(),e.replaceChildren()}}}function e_(e,t,n){let r=Ut("views:nav"),{global_element:o,repo_element:i}=e,s=null;function l(h){return g=>{g.preventDefault();let k=h==="monitor"&&a()==="monitor"?"worker":h;r("click tab %s",k),n.gotoView(k)}}function a(){let h=t.getState();return h.view==="worker"||h.view==="monitor"?h.view:"board"}function u(){let h=a();return c`
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
    `}function f(){o&&dt(u(),o),i&&dt(d(),i)}return f(),s=t.subscribe(()=>f()),{destroy(){s&&(s(),s=null),o&&dt(c``,o),i&&dt(c``,i)}}}var t_=["bug","feature","task","epic","chore"];function n_(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var r_=["Critical","High","Medium","Low","Backlog"];function o_(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),o=n.querySelector("#new-title"),i=n.querySelector("#new-type"),s=n.querySelector("#new-priority"),l=n.querySelector("#new-labels"),a=n.querySelector("#new-description"),u=n.querySelector("#new-issue-error"),d=n.querySelector("#btn-cancel"),f=n.querySelector("#btn-create"),h=n.querySelector(".new-issue__close");function g(){i.replaceChildren();let I=document.createElement("option");I.value="",I.textContent="\u2014 Select \u2014",i.appendChild(I);for(let q of t_){let F=document.createElement("option");F.value=q,F.textContent=n_(q),i.appendChild(F)}s.replaceChildren();for(let q=0;q<=4;q+=1){let F=document.createElement("option");F.value=String(q);let H=r_[q]||"Medium";F.textContent=`${q} \u2013 ${H}`,s.appendChild(F)}}g();function k(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function E(I){o.disabled=I,i.disabled=I,s.disabled=I,l.disabled=I,a.disabled=I,d.disabled=I,f.disabled=I,f.textContent=I?"Creating\u2026":"Create"}function C(){u.textContent=""}function te(I){u.textContent=I}function ie(){try{let I=window.localStorage.getItem("beads-ui.new.type");I?i.value=I:i.value="";let q=window.localStorage.getItem("beads-ui.new.priority");q&&/^\d$/.test(q)?s.value=q:s.value="2"}catch{i.value="",s.value="2"}}function z(){let I=i.value||"",q=s.value||"";I.length>0&&window.localStorage.setItem("beads-ui.new.type",I),q.length>0&&window.localStorage.setItem("beads-ui.new.priority",q)}async function P(){C();let I=String(o.value||"").trim();if(I.length===0){te("Title is required"),o.focus();return}let q=Number(s.value||"2");if(!(q>=0&&q<=4)){te("Priority must be 0..4"),s.focus();return}let F=String(i.value||""),H=String(a.value||""),U={title:I};F.length>0&&(U.type=F),String(q).length>0&&(U.priority=q),H.length>0&&(U.description=H),E(!0);try{await t("create-issue",U)}catch{E(!1),te("Failed to create issue");return}z(),E(!1),k()}return n.addEventListener("cancel",I=>{I.preventDefault(),k()}),h.addEventListener("click",()=>k()),d.addEventListener("click",()=>k()),n.addEventListener("keydown",I=>{I.key==="Enter"&&(I.ctrlKey||I.metaKey)&&(I.preventDefault(),P())}),r.addEventListener("submit",I=>{I.preventDefault(),P()}),{open(){r.reset(),C(),ie();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{o.focus()}catch{}},0)},close(){k()}}}var ck=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked\xB7\uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694 \uCE69"],["stepper","stepper"]];function uk(e,t){return Ba(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function s_(e,t,n){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?c`<div class="settings-dialog__empty">라벨 없음</div>`:c`<div class="settings-dialog__pills">
            ${t.map(r=>{let o=uk(r,e);return c`<button
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
  `}function i_(e,t,n){return c`
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
  `}function a_(e,t){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${ck.map(([n,r])=>c`<label class="settings-dialog__toggle">
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
  `}var dk=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function l_(e,t){let{transport:n,policyStore:r,labelOptions:o}=t,i=t.notify||(ne=>me(ne,"error",4e3)),s=document.createElement("dialog");s.id="settings-dialog",s.className="settings-dialog",s.setAttribute("role","dialog"),s.setAttribute("aria-modal","true"),s.setAttribute("aria-label","\uC124\uC815"),e.appendChild(s);let l="execution",a=!1,u="",d=null;function f(){if(d)return d;let ne=s.querySelector('[data-pane="execution"]');return ne?(d=$a(ne,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:n,implPresetStore:t.implPresetStore,notify:i,onQueueAdopt:ge=>t.queueStore?.set?.(ge)}),d):null}function h(){return c`
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
    `}function g(){let ne=r.get();return c`
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
              ${s_(ne,o(),te)}
              ${i_(ne,u,{onDraft:ge=>{u=ge},onAdd:ie,onRemove:z})}
              ${a_(ne,P)}
            `:c`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function k(ne){let ge=r.get();if(ge)try{let Oe=await n("display-policy-set",{expected_revision:ge.revision,policy:ne(ge)});E(Oe),Oe&&Oe.conflict&&Oe.policy&&(Oe=await n("display-policy-set",{expected_revision:Oe.policy.revision,policy:ne(Oe.policy)}),E(Oe)),Oe&&Oe.conflict&&i("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{i("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function E(ne){ne&&ne.policy&&typeof ne.policy=="object"&&r.set(ne.policy)}function C(ne){k(ne)}function te(ne){let ge=r.get();if(!ge)return;let Oe=!pk(ne,ge);C(K=>fk(ne,K,Oe))}function ie(){let ne=u.trim();ne.length!==0&&(u="",C(ge=>ge.hidden_prefixes.includes(ne)?{hidden_prefixes:ge.hidden_prefixes}:{hidden_prefixes:[...ge.hidden_prefixes,ne]}),I())}function z(ne){C(ge=>({hidden_prefixes:ge.hidden_prefixes.filter(Oe=>Oe!==ne)}))}function P(ne){let ge=r.get();if(!ge)return;let Oe=ge.chips[ne]===!1;C(()=>({chips:{[ne]:Oe}}))}function I(){dt(c`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${dk.map(ne=>c`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${ne.id}
                  aria-selected=${String(l===ne.id)}
                  aria-controls=${`settings-pane-${ne.id}`}
                  @click=${()=>q(ne.id)}
                >
                  <span class="settings-dialog__glyph">${ne.glyph}</span>
                  ${ne.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${B}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${h()} ${g()}
          </div>
        </div>
      `,s),f()}function q(ne){l=ne,I()}let F=()=>{a=!1,t.onOpenChange?.(!1)};s.addEventListener("close",F),s.addEventListener("cancel",F);let H=ne=>{ne.target===s&&B()};s.addEventListener("click",H);let U=null;r.subscribe&&(U=r.subscribe(()=>{a&&I()}));let M=null;t.implPresetStore?.subscribe&&(M=t.implPresetStore.subscribe(()=>{a&&d?.render()}));function Q(ne="execution"){a||(a=!0,t.onOpenChange?.(!0),l=ne,u="",I(),typeof s.showModal=="function"?s.showModal():s.setAttribute("open",""),f()?.load())}function B(){a&&(a=!1,t.onOpenChange?.(!1),typeof s.close=="function"?s.close():s.removeAttribute("open"))}return{open:Q,close:B,sessionDraft:()=>d?.sessionDraft()??{},destroy(){a=!1,s.removeEventListener("close",F),s.removeEventListener("cancel",F),s.removeEventListener("click",H),U&&(U(),U=null),M&&(M(),M=null),d?.destroy(),d=null,s.remove()}}}function pk(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(n=>n.length>0&&e.startsWith(n))}function fk(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(i=>i!==e)};let r=t.hidden_labels.filter(i=>i!==e);return t.hidden_prefixes.some(i=>i.length>0&&e.startsWith(i))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}var _k=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],c_="usage-meter-card",mk="usage-meter-layer",cc=600,gk=["token_expired","relogin_required"];function u_(e){return String(e).padStart(2,"0")}function hk(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),o=Math.floor(n%1440/60),i=n%60;return r>0?`${r}d${o>0?` ${o}h`:""}`:o>0?`${o}h${i>0?` ${i}m`:""}`:`${i}m`}function d_(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),o=new Date(t),i=`${u_(r.getHours())}:${u_(r.getMinutes())}`,l=r.getFullYear()===o.getFullYear()&&r.getMonth()===o.getMonth()&&r.getDate()===o.getDate()?i:`${_k[r.getMonth()]} ${r.getDate()} ${i}`;return`${hk(n,t)} \xB7 ${l}`}function bk(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function p_(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function f_(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var __=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function g_(e){let t=[];for(let n of e){if(!n||typeof n!="object")continue;let r=n;typeof r.key!="string"||r.key.length===0||typeof r.pct!="number"||!Number.isFinite(r.pct)||t.push({key:r.key,pct:r.pct,resetsAt:typeof r.resetsAt=="string"?r.resetsAt:""})}return t}function yk(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:g_(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function vk(e,t){if(!e||typeof e!="object")return null;let n=e,r=[];if(Array.isArray(n.accounts))for(let i of n.accounts){let s=yk(i);s&&r.push(s)}let o=n.available===!0&&Array.isArray(n.windows);return!o&&r.length===0?null:{available:o,windows:o?g_(n.windows):[],ageSeconds:typeof n.ageSeconds=="number"&&Number.isFinite(n.ageSeconds)?n.ageSeconds:null,accounts:r,receivedAtMs:t,held:!1}}function kk(e,t){if(!e||typeof e!="object")return{kind:"error"};let n=vk(e,t);return n?{kind:"ok",snapshot:n}:Array.isArray(e.accounts)?{kind:"empty"}:{kind:"error"}}function h_(e,t){return(e.ageSeconds===null?0:e.ageSeconds)+Math.max(0,t-e.receivedAtMs)/1e3}function wk(e,t){return!e.held||h_(e,t)<=cc?e:{...e,available:!1,windows:[],accounts:[]}}function m_(e,t){return`${e}:${t}`}function b_(e){let t=!1,n=null,r=new Map,o=null,i=new Map,s=new Map,l=0,a=null;function u(){dt(c``,e),e.hidden=!0,f()}function d(){if(a===null){let K=e.ownerDocument;a=K.createElement("div"),a.id=mk,a.className="usage-meter__layer",K.body.appendChild(a)}return a}function f(){a!==null&&(dt(c``,a),a.remove(),a=null)}function h(K){n!==K&&(n===null&&(document.addEventListener("mousedown",k),document.addEventListener("keydown",C),window.addEventListener("resize",E)),n=K)}function g(){n!==null&&(n=null,document.removeEventListener("mousedown",k),document.removeEventListener("keydown",C),window.removeEventListener("resize",E))}function k(K){let re=K.target;re&&(e.contains(re)||a!==null&&a.contains(re))||(g(),B())}function E(){B()}function C(K){K.key==="Escape"&&(g(),B())}function te(K){n===K?g():h(K),B()}function ie(){g(),B()}async function z(K,re){if(r.has(K.key))return;let pe=m_(K.key,re);r.set(K.key,re),s.delete(pe),B();let Te=null;try{Te=await(await fetch(K.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:re})})).json()}catch{Te=null}if(t)return;if(r.delete(K.key),!Te||Te.ok!==!0){let ae=Te&&typeof Te.error=="string"&&Te.error.length>0?Te.error:"network_error";s.set(pe,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${ae}`}),B();return}let Y=Array.isArray(Te.warnings)?Te.warnings.filter(ae=>typeof ae=="string"&&ae.length>0):[];Y.length>0&&s.set(pe,{kind:"warn",text:Y.join(" \xB7 ")}),B(),await Oe()}function P(K,re,pe,Te){let Y=f_(K.pct),Z=`resets ${d_(K.resetsAt,Te)}${re?` \xB7 ${pe}`:""}`;return c`<span
      class="usage-meter__window ${p_(Y)}"
      style=${`--progress: ${Y}%`}
      title=${Z}
    >
      <span class="usage-meter__label">${K.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${Y}%</span>
    </span>`}function I(K,re,pe){let Te=h_(re,pe),Y=re.available&&(re.held||Te>cc),ae=Y?`${Math.floor(Te/60)}\uBD84 \uC804 \uCE21\uC815`:"",Z=re.accounts.filter(Le=>!Le.active).length,be=`usage-meter__group${Y?" usage-meter__group--stale":""}`,Ie=c`<span class="usage-meter__provider"
        >${K.label}</span
      >
      ${re.available?re.windows.map(Le=>P(Le,Y,ae,pe)):c`<span class="usage-meter__empty">사용량 없음</span>`}
      ${Z>0?c`<span class="usage-meter__badge">+${Z}</span>`:""}`;if(re.accounts.length===0)return c`<span
        class=${be}
        aria-label=${`${K.label} usage`}
        >${Ie}</span
      >`;let ye=n===K.key;return c`<button
      type="button"
      class=${`usage-meter__toggle ${be}`}
      aria-label=${`${K.label} usage`}
      aria-expanded=${ye?"true":"false"}
      aria-controls=${c_}
      @click=${()=>te(K.key)}
    >
      ${Ie}
    </button>`}function q(K,re){return c`<span class="usage-meter" aria-label="Usage">
      ${K.map(pe=>I(pe.provider,pe.snapshot,re))}
    </span>`}function F(K,re){let pe=f_(K.pct),Te=d_(K.resetsAt,re);return c`<span
      class="usage-meter__account-window ${p_(pe)}"
      style=${`--progress: ${pe}%`}
    >
      <span class="usage-meter__account-key">${K.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${pe}%</span>
      <span class="usage-meter__account-reset"
        >${Te.length>0?`\u21BB ${Te}`:""}</span
      >
    </span>`}function H(K,re){return gk.includes(re)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${K.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function U(K,re,pe){let Te=re.status==="ok",Y=typeof re.ageSeconds=="number"&&re.ageSeconds>cc,ae=s.get(m_(K.key,re.number)),Z=r.get(K.key),be=Z!==void 0,Ie=Z===re.number,ye=["usage-meter__account"];return re.active&&ye.push("usage-meter__account--active"),Te||ye.push("usage-meter__account--unavailable"),Y&&ye.push("usage-meter__account--stale"),c`<div class=${ye.join(" ")}>
      <div class="usage-meter__account-head">
        <span class="usage-meter__account-label" title=${re.email}
          >${re.alias===null?re.email:re.alias}</span
        >
        ${re.plan===null?"":c`<span class="usage-meter__account-tag">${re.plan}</span>`}
        ${re.active?c`<span
              class="usage-meter__account-tag usage-meter__account-tag--active"
              >active</span
            >`:""}
        ${re.ageSeconds===null?"":c`<span class="usage-meter__account-age"
              >${bk(re.ageSeconds)}</span
            >`}
        ${re.active?"":c`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${be}
              @click=${()=>{z(K,re.number)}}
            >
              ${Ie?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${Te?c`<div class="usage-meter__account-windows">
            ${re.windows.map(Le=>F(Le,pe))}
          </div>`:c`<div class="usage-meter__account-status">
            ${H(K,re.status)}
          </div>`}
      ${ae===void 0?"":c`<div
            class="usage-meter__account-message usage-meter__account-message--${ae.kind}"
          >
            ${ae.text}
          </div>`}
    </div>`}function M(K,re,pe){let Te=re.accounts.filter(Y=>Y.active).length;return c`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${K.label} · 활성 ${Te} / 전체
        ${re.accounts.length}
      </h2>
      ${re.accounts.map(Y=>U(K,Y,pe))}
    </section>`}function Q(K,re){return c`<div
      class="usage-meter__card"
      id=${c_}
      role="dialog"
      aria-label=${`${K.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${M(K.provider,K.snapshot,re)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function B(){let K=Date.now(),re=[];for(let Te of __){let Y=i.get(Te.key);Y&&re.push({provider:Te,snapshot:wk(Y,K)})}if(re.length===0){g(),u();return}let pe=re.find(Te=>Te.provider.key===n&&Te.snapshot.accounts.length>0);pe||g(),dt(q(re,K),e),e.hidden=!1,pe?ne(pe,K):f()}function ne(K,re){let pe=d(),Te=e.getBoundingClientRect(),Y=e.ownerDocument.documentElement.clientWidth;pe.style.setProperty("--usage-meter-anchor-top",`${Te.bottom}px`),pe.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,Y-Te.right)}px`),dt(c`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${ie}
        ></div>
        ${Q(K,re)}`,pe)}async function ge(K){try{let re=await fetch(K.endpoint);return re.ok?kk(await re.json(),Date.now()):{kind:"error"}}catch{return{kind:"error"}}}async function Oe(){l+=1;let K=l,re=await Promise.all(__.map(async pe=>({provider:pe,read:await ge(pe)})));if(!(t||K!==l)){for(let pe of re){let Te=pe.provider.key;if(pe.read.kind==="ok"){i.set(Te,pe.read.snapshot);continue}if(pe.read.kind==="empty"){i.delete(Te);continue}let Y=i.get(Te);Y!==void 0&&!Y.held&&i.set(Te,{...Y,held:!0})}B()}}return u(),Oe(),o=setInterval(()=>{Oe()},6e4),{destroy(){t=!0,o!==null&&(clearInterval(o),o=null),g(),u()}}}function Is(e){let t=e?.blocked_info;return t&&typeof t=="object"?Array.isArray(t.blockers)?t.blockers.filter(r=>typeof r=="string"&&r.length>0):[]:(Array.isArray(e?.dependencies)?e.dependencies:[]).map(r=>{if(typeof r=="string")return r;if(!r||typeof r!="object")return"";let o=r.type??r.dependency_type;return o!==void 0&&o!=="blocks"?"":r.depends_on_id||r.id||""}).filter(Boolean)}var k_="bdui.worker.candidate_sort",Ls=Object.freeze([{id:"spec",label:"spec \uC6B0\uC120",chain:[{key:"spec",dir:"desc"},{key:"created",dir:"asc"}]},{id:"bottleneck",label:"\uBCD1\uBAA9 \uC6B0\uC120",chain:[{key:"priority",dir:"asc"},{key:"dependents",dir:"desc"},{key:"released",dir:"desc"}]},{id:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131",chain:[{key:"created",dir:"desc"},{key:"priority",dir:"asc"}]},{id:"updated",label:"\uCD5C\uC2E0 \uC218\uC815",chain:[{key:"updated",dir:"desc"}]}]),Aa=Object.freeze({preset:"spec"}),w_=3,$_=Object.freeze([{key:"priority",label:"\uC6B0\uC120\uC21C\uC704"},{key:"dependents",label:"\uD6C4\uC18D \uC218"},{key:"released",label:"\uD574\uC81C \uC2DC\uAC01"},{key:"spec",label:"spec \uC720\uBB34"},{key:"created",label:"\uC0DD\uC131"},{key:"updated",label:"\uC218\uC815"}]);function y_(e){return Ls.some(t=>t.id===e)}function v_(e){let t=Ls.find(n=>n.id===e);return t?t.chain.map(n=>({...n})):[]}function $k(e,t){return e.length===t.length&&e.every((n,r)=>n.key===t[r].key&&n.dir===t[r].dir)}function Ds(e){return e&&"preset"in e?v_(e.preset):e&&Array.isArray(e.chain)?e.chain.map(t=>({...t})):v_("spec")}function uc(e){return e&&"preset"in e?e.preset:null}function Xr(e){if(typeof e=="string"){let i;try{i=JSON.parse(e)}catch{return y_(e)?{preset:e}:Aa}return Xr(i)}if(!e||typeof e!="object")return Aa;let t=e;if(y_(t.preset))return{preset:t.preset};let n=t.chain;if(!Array.isArray(n)||n.length===0||n.length>w_||!n.every(qa))return Aa;let r=[];for(let i of n)r.some(s=>s.key===i.key)||r.push({key:i.key,dir:i.dir});let o=Ls.find(i=>$k(i.chain,r));return o?{preset:o.id}:{chain:r}}function x_(){try{return Xr(window.localStorage.getItem(k_))}catch{return Aa}}function dc(e){try{window.localStorage.setItem(k_,JSON.stringify(e))}catch{}}function A_(e,t,n){let r=e.map(a=>({...a}));if(!n)return r.slice(0,t);if(!Object.prototype.hasOwnProperty.call(Qs,n))return r;let o=n;if(r.slice(0,t).some(a=>a.key===o))return r.slice(0,t);let i={key:o,dir:r[t]&&r[t].key===o?r[t].dir:Qs[o]},s=r.slice(0,t),l=r.slice(t+1).filter(a=>a.key!==o);return[...s,i,...l].slice(0,w_)}function S_(e,t){return e.map((n,r)=>r===t?{key:n.key,dir:n.dir==="asc"?"desc":"asc"}:{...n})}function xk(e){let t=new Set(e.map(l=>l.id)),n=new Map,r=new Map;for(let l of e){let a=Is(l).filter(u=>t.has(u));n.set(l.id,a);for(let u of a){let d=r.get(u);d?d.push(l):r.set(u,[l])}}let o=new Set,i=[],s=l=>{o.add(l.id),i.push(l);for(let a of r.get(l.id)??[])!o.has(a.id)&&(n.get(a.id)??[]).every(u=>o.has(u))&&s(a)};for(;i.length<e.length;){let l=e.find(a=>!o.has(a.id)&&(n.get(a.id)??[]).every(u=>o.has(u)));s(l??e.find(a=>!o.has(a.id)))}return i}function E_(e,t){let n=Array.isArray(e)?e.slice():[];return n.sort(Xc(Ds(t))),xk(n)}function T_(e,t){let n=new Map;if(!e||typeof e!="object")return n;let r=e,o=[],i=new Set;for(let s of t){if(i.has(s.id))continue;i.add(s.id);let l=r[s.id];if(!l||!Array.isArray(l.scope))continue;let a=l.scope.filter(u=>typeof u=="string"&&u.length>0);if(a.length===0){n.set(s.id,{overlaps:[],scope_missing:!0});continue}n.set(s.id,{overlaps:[],scope_missing:!1}),o.push({member:s,scope:a})}for(let s=0;s<o.length;s+=1)for(let l=s+1;l<o.length;l+=1){let a=$i(o[s].scope,o[l].scope);if(a.length===0)continue;let u=o[s].member,d=o[l].member;n.get(u.id)?.overlaps.push({id:d.id,title:d.title,location_label:d.location_label,prefixes:a}),n.get(d.id)?.overlaps.push({id:u.id,title:u.title,location_label:u.location_label,prefixes:a})}return n}var C_=new Set(["sh","bash","zsh","dash","ksh"]),R_=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function O_(e){let t=e.split("/");return t[t.length-1]||""}function Ak(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let n=t.slice(2).trim().split(/\s+/).filter(Boolean);if(n.length===0)return!1;let r=O_(n[0]);if(r!=="env")return C_.has(r);let o=n.slice(1).find(i=>!i.startsWith("-")&&!i.includes("="));return o!==void 0&&C_.has(O_(o))}function Sk(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function Ek(e){let t=[],n=0;R_.lastIndex=0;for(let r of e.matchAll(R_)){let o=r.index;o>n&&t.push({text:e.slice(n,o),kind:"plain"}),t.push({text:r[0],kind:Sk(r[0])}),n=o+r[0].length}return n<e.length&&t.push({text:e.slice(n),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function Tk(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function I_(e){let t=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),r=document.createElement("div");r.className="repo-ops-script-viewer-root",document.body.appendChild(r);let o=null,i="loading",s="",l="",a=0,u=null,d=!1;function f(I,q){return q?Ek(I).map(F=>F.kind==="plain"?F.text:c`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${F.kind}"
            >${F.text}</span
          >`):I}function h(){if(!o)return c``;let I=i==="ready"&&Ak(s),q=i==="ready"?s.split(`
`):[];return c`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${o.path}`}
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
                  ${l}
                </div>`:c`<div class="repo-ops-script-viewer__code" tabindex="0">
                  ${q.map((F,H)=>c`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${H+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${f(F,I)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function g(){dt(h(),r)}async function k(){if(i!=="ready")return;let I=await yn(s);me(I?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",I?"success":"error")}function E(I){I.key==="Escape"&&o&&(I.preventDefault(),z())}function C(){d||(document.addEventListener("keydown",E),d=!0)}function te(){d&&(document.removeEventListener("keydown",E),d=!1)}async function ie(I,q=null){let F=++a;C(),o={...I},u=q||(document.activeElement instanceof HTMLElement?document.activeElement:null),i="loading",s="",l="",g(),r.querySelector(".repo-ops-script-viewer__close")?.focus();let U=t?t():"";if(!U){i="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",g();return}if(!n){i="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",g();return}let M="/api/repo-ops-script?workspace="+encodeURIComponent(U)+"&lane="+encodeURIComponent(I.lane)+"&base_sha="+encodeURIComponent(I.base_sha);try{let Q=await n(M),B=await Q.json().catch(()=>({}));if(F!==a)return;if((t?t():"")!==U){z();return}if(!Q.ok||!B||B.ok!==!0){i="error",l=Tk(B&&typeof B.error=="string"?B.error:""),g();return}o={lane:B.lane,base_sha:B.base_sha,path:B.path,base_ref:B.base_ref},s=String(B.content),i="ready",g()}catch{if(F!==a)return;i="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",g()}}function z(){a+=1,te(),o=null,s="",g();let I=u;u=null,I?.isConnected&&I.focus()}function P(){z(),r.remove()}return{open:ie,close:z,destroy:P}}var L_={deploy_not_declared:"\uC120\uC5B8 \uC5C6\uC74C",deploy_opted_out:"\uC774 workspace\uC5D0\uC11C \uBC30\uD3EC \uC2E4\uD589\uC774 \uAEBC\uC838 \uC788\uC74C",deploy_in_flight:"\uBC30\uD3EC \uC9C4\uD589 \uC911",target_unresolved:"\uB300\uC0C1 tip\uC744 \uD655\uC815\uD558\uC9C0 \uBABB\uD568",remote_history_not_monotonic:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uC640 \uC6D0\uACA9 \uC774\uB825\uC774 \uAC08\uB77C\uC9D0"},Ck=new Set(["queued","running","retry_pending"]);function D_(e){let t=e.queueStore,n=e.transport,r=e.onChanged||(()=>{}),o=e.onOpenScript;function i(){return t&&t.get()||{}}function s(){let M=i();return typeof M.revision=="number"?M.revision:0}function l(M){t&&M&&M.queue&&typeof M.queue=="object"&&t.set(M.queue)}function a(){let M=i().workspace_info;return M&&typeof M=="object"?M:{}}function u(M,Q){return c`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${M}"
      >${Q}</span
    >`}function d(M){if(typeof M!="number"||!Number.isFinite(M))return"";let Q=M/6e4;return Number.isInteger(Q)?`timeout ${Q}\uBD84`:`timeout ${Math.round(M/1e3)}\uCD08`}function f(M){let Q=d(M);return Q?u("config",Q):""}function h(M,Q,B){return c`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${B.script}
      @click=${ne=>{o&&o({lane:M,base_sha:Q.base_sha,path:B.script,base_ref:Q.base_ref},ne.currentTarget)}}
    ></button>`}function g(){let M=i().repo_operations;return Array.isArray(M)?M:[]}function k(){let M=a().repo_ops,Q=M&&typeof M=="object"?M.repo_id:null;return typeof Q=="string"&&Q?Q:null}function E(){return g().some(M=>M&&M.kind==="deploy"&&Ck.has(M.state))}function C(){let M=E(),Q=k()===null;return c`<button
      type="button"
      class="worker-repo-ops__deploy-run"
      data-seam="repo-ops-deploy-run"
      ?disabled=${M||Q}
      title=${M?"\uBC30\uD3EC \uC9C4\uD589 \uC911":Q?"\uC800\uC7A5\uC18C\uB97C \uD655\uC778\uD560 \uC218 \uC5C6\uC74C":"\uC6D0\uACA9 base tip\uC5D0\uC11C \uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uB97C 1\uD68C \uC2E4\uD589\uD569\uB2C8\uB2E4"}
      @click=${()=>{q()}}
    >
      배포 실행
    </button>`}function te(){let M=i().repo_ops_opt_out;return{verify:M?.verify===!0,deploy:M?.deploy===!0}}function ie(M,Q){return c`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!Q}
        @change=${B=>{I(M,!B.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function z(M){let Q=typeof M.base_sha=="string"?M.base_sha:"",B=`${M.source_path||"repo-ops/config.toml"} @ ${M.base_ref||"?"}${Q?`@${Q.slice(0,7)}`:""}`,ne=te(),ge=!!M.verify&&ne.verify,Oe=!!M.deploy&&ne.deploy;return c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${B}</span>
      </p>
      <div
        class="worker-repo-ops__lane${ge?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${M.verify?c`${h("verify",M,M.verify)}
              ${f(M.verify.timeout_ms)}
              ${ge?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:c`선언 없음${u("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${ge?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":M.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${M.verify?ie("verify",ne.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${Oe?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${M.deploy?c`${h("deploy",M,M.deploy)}
              ${f(M.deploy.timeout_ms)}
              ${Oe?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):C()}`:c`선언 없음${u("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${Oe?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":M.deploy?c`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${M.deploy?ie("deploy",ne.deploy):""}
      </div>
    </section>`}function P(M){let Q=M.repo_ops&&typeof M.repo_ops=="object"?M.repo_ops:null;return Q&&(Q.status==="resolved"||Q.status==="absent")?z(Q):Q&&(Q.status==="pending"||Q.status==="error")?c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${Q.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":c`선언 읽기
              실패${Q.error_code?c` — <code>${Q.error_code}</code>`:""}`}
        </div>
      </section>`:c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function I(M,Q){if(!n)return;let B=await n("worker-repo-ops-opt-out-toggle",{kind:M,opted_out:Q,expected_revision:s()});if(l(B),B&&B.conflict){let ne=await n("worker-repo-ops-opt-out-toggle",{kind:M,opted_out:Q,expected_revision:s()});l(ne)}r()}async function q(){let M=k();if(!n||M===null)return;let Q=await n("worker-repo-operation-deploy-run",{repo_id:M});if(l(Q),!Q||Q.ok!==!0){let B=Q&&typeof Q.reason=="string"?Q.reason:"",ne=Object.hasOwn(L_,B)?L_[B]:B||"\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";me(`\uBC30\uD3EC \uC2E4\uD589 \uAC70\uBD80 \u2014 ${ne}`,"error")}else me("\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD588\uC2B5\uB2C8\uB2E4","success");r()}let F={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",repair_session_dispatch:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC790\uB3D9 \uC2E4\uD589",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC"};function H(M,Q,B){return c`<div class="worker-repo-ops__policy-group" data-policy=${B}>
      <div class="worker-repo-ops__policy-label">${M}</div>
      <ul class="worker-repo-ops__policy-list">
        ${Q.map(ne=>c`<li data-token=${ne}>
              ${F[ne]||ne}
            </li>`)}
      </ul>
    </div>`}function U(){let M=i(),Q=M.repo_operation_policy&&typeof M.repo_operation_policy=="object"?M.repo_operation_policy:null;return Q?c`<section
      class="worker-repo-ops__repair"
      data-seam="repo-ops-policy"
    >
      <details class="worker-repo-ops__policy" data-seam="policy-lists">
        <summary>
          Worker 자동 처리 기준
          <span class="worker-repo-ops__policy-count"
            >자동 ${(Q.worker_automatic||[]).length} · 금지
            ${(Q.never_automatic||[]).length}</span
          >
        </summary>
        ${Q.supported===!1?c`<div
              class="worker-repo-ops__policy-group"
              data-policy="policy-schema"
            >
              ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uAC00 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${Q.schema_version})`}
            </div>`:""}
        ${H("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",Q.worker_automatic||[],"worker-automatic")}
        ${H("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",Q.never_automatic||[],"never-automatic")}
      </details>
    </section>`:""}return{template(){return c`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언
        </summary>
        ${P(a())} ${U()}
      </details>`}}}var q_=20,Rk=5,Ok=new Set(["failed","running","queued","retry_pending"]),pc={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC",job:"\uBA38\uC9C0 \uD6C4 \uC7A1"},P_={verify:"verify",deploy:"deploy",job:"deploy"};function Ik(e){if(typeof e!="string")return"";let t=e.split("/").filter(n=>n.length>0);return t.length>0?t[t.length-1]:""}function Lk(e){return!e||typeof e!="object"?"":e.kind==="job"?Ik(e.script_path)||pc.job:Object.hasOwn(pc,e.kind)?pc[e.kind]:e.kind}function Dk(e,t,n=q_){let r=[];for(let o of Array.isArray(e)?e:[])!o||typeof o!="object"||r.push({type:"operation",id:o.operation_id,at:typeof o.finished_at=="number"?o.finished_at:typeof o.requested_at=="number"?o.requested_at:null,operation:o});for(let o of Array.isArray(t)?t:[])!o||typeof o!="object"||r.push({type:"cleanup",id:o.bead_id,at:typeof o.at=="number"?o.at:null,cleanup:o});return r.sort((o,i)=>o.at===null&&i.at===null?String(o.id||"").localeCompare(String(i.id||"")):o.at===null?1:i.at===null?-1:i.at-o.at),r.slice(0,Math.max(0,n))}function Pk(e){if(e.type==="cleanup")return!0;let t=e.operation;return Ok.has(t.state)&&!t.dismissed&&!t.superseded_by}function Mk(e,t,n={}){let r=Dk(e,t,1/0),o=n.expanded===!0?q_:Rk,i=new Set(r.slice(0,o)),s=r.filter(l=>i.has(l)||Pk(l));return{visible:s,hidden:r.length-s.length}}function M_(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function qk(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function N_(e){let t=e.filter(n=>n.value);return t.length===0?"":c`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(n=>{let r=n.copy===!0?Fr(n.value):n.value;return c`<div>
          <dt>${n.term}</dt>
          <dd>${r}</dd>
        </div>`})}
    </dl>
  </details>`}function j_(e,t="",n=!1){return!e&&!t?"":c`<p
    class="worker-ev__explain${n?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?c`<br />${t}`:""}
  </p>`}function Nk(e,t){if(!e||typeof e!="object")return;let n=t&&typeof t=="object"?t.kind:"";if(!Object.hasOwn(P_,n))return;let r=e[P_[n]],o=r&&typeof r=="object"?r.timeout_ms:void 0;return typeof o=="number"&&Number.isFinite(o)?o:void 0}function jk(e,t){let n=Of(e,t),r=If(e);return!n&&!r?"":c`<p class="worker-ev__why">
    ${n?c`<span class="worker-ev__why-line">${n}</span>`:""}${r?c`<span class="worker-ev__why-line">${r}</span>`:""}
  </p>`}function Fk(e){return e.state!=="failed"||e.superseded_by||e.dismissed?"":c`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-repo-op__dismiss"
      data-operation-id=${e.operation_id}
      title="사람이 확인한 실패로 접수합니다 — 기록은 그대로 남고 해결 필요 집계에서만 빠집니다"
    >
      기록 닫기
    </button>
  </div>`}function Bk(e,t){let n=e.operation,r=n.state==="failed",o=n.failure?n.failure.code:"";return c`<li
    class="worker-ev"
    data-operation-id=${n.operation_id}
    data-state=${n.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?sn(e.at):""}
      >${Ti(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${M_(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what">${Lk(n)}</span>
        <span class="worker-ev__meta"
          >${n.target_base}@${Ei(n.target_sha)}${typeof n.elapsed_ms=="number"?` \xB7 ${Ur(n.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${M_(e)}"
          >${qk(e)}</span
        >
        ${n.dismissed?c`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${n.superseded_by?c`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
        ${n.source==="manual"?c`<span
              class="worker-ev__st worker-ev__st--manual"
              title="사람이 배포 실행을 눌러 시작한 작업입니다"
              >수동</span
            >`:""}
      </div>
      ${r?j_(Rf(n.failure_kind,o)):""}
      ${jk(n,Nk(t,n))}
      ${Fk(n)}
      ${N_([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?o:""},{term:"script",value:[n.script_path||"",n.script_blob_sha?`blob ${Ei(n.script_blob_sha)}`:"",Number.isInteger(n.exit_code)?`exit ${n.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:n.log_path||"",copy:!0},{term:"\uCD9C\uB825",value:n.output_tail||""}])}
    </div>
  </li>`}function Uk(e){let t=e.cleanup,n=Hr(t.step);return c`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?sn(e.at):""}
      >${Ti(e.at)||"\u2014"}</span
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
        ${Md(t.step).map(r=>c`<li
              class="worker-step worker-step--${r.state}"
              data-step=${r.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${r.label}</span>
            </li>`)}
      </ol>
      ${j_(xr(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
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
      ${N_([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||"",copy:!0},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function Wk(e){let t=typeof e.hidden=="number"?e.hidden:0,n=e.expanded===!0;return c`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(r=>r.type==="cleanup"?Uk(r):Bk(r,e.repo_ops))}
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
  </section>`}function F_(e,t={}){let n=null;function r(){if(n===null){dt(c``,e);return}let s=Mk(n.operations,n.cleanup_failures,{expanded:n.expanded});dt(Wk({events:s.visible,hidden:s.hidden,expanded:n.expanded,repo:n.repo,repo_ops:n.repo_ops}),e)}e.addEventListener("click",s=>{let l=s.target;if(l?.closest?.('[data-seam="repo-ops-close"]')){i();return}l?.closest?.('[data-seam="repo-ops-more"]')&&n&&(n.expanded=!n.expanded,r())});function o(s){n={operations:s.operations,cleanup_failures:s.cleanup_failures,repo:s.repo||"",repo_ops:s.repo_ops||null,expanded:!1},r()}function i(){n!==null&&(n=null,r(),t.onClose&&t.onClose())}return{open:o,close:i,isOpen:()=>n!==null,refresh(s){n&&(n={operations:s.operations,cleanup_failures:s.cleanup_failures,repo:s.repo||"",repo_ops:s.repo_ops||null,expanded:n.expanded},r())}}}var zk="session-preferred",Hk=["external_roundtrip","user_feedback_loop"];function B_(e,t){if(!es(e).includes(zk)||typeof t!="object"||t===null)return"";let n=t.session_preferred_reason;return typeof n=="string"&&Hk.includes(n)?n:""}var Kk="spec-after-blocker";function U_(e,t){return es(e).includes(Kk)&&Array.isArray(t)&&t.length>0}var Gk=Ut("views:worker:adapter"),Yk="tab:worker:ready",Vk="tab:worker:blocked",Qk="tab:worker:in-progress",Xk="tab:worker:resolved",Zk="tab:worker:closed",Jk="\u{1F512} blocked",ew={revision:0,auto_advance:!1,auto_merge:!1,slots:Wi,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]},tw=["claude_account","codex_account"],nw=[...ho,...tw];function rw(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function ow(e){let t=e&&typeof e=="object"?e.awaiting_user:void 0,n=typeof t=="string"?t.trim():"";return n.length>0?`${_l}: ${n}`:_l}function Ar(e){return e&&typeof e=="object"?e:{}}function sw(e){let t={};for(let n of nw){let r=e[n];typeof r=="string"&&r.length>0&&(t[n]=r)}return t}function iw(e){let t=new Map;for(let r of e){if(!r||typeof r.id!="string"||r.id.length===0)continue;let o=Ar(r.metadata).carried_from;if(!(typeof o!="string"||o.length===0))for(let i of Is(r)){let s=t.get(i);s||(s=new Set,t.set(i,s)),s.add(r.id)}}let n=new Map;for(let[r,o]of t)n.set(r,[...o].sort());return n}function aw(e){let t=e.replace(/\/+$/,""),n=t.lastIndexOf("/");return n>=0?t.slice(n+1):t}function W_(e={}){let{queueStore:t,issueStores:n,transport:r,getWorkspacePath:o,onInvalidate:i}=e,s=n?io(n):null,l=new Map,a={},u=null,d=0,f=null,h=!1;function g(){h||!i||i()}function k(q){return u===q?a:{}}async function E(){if(!r||h)return;let q=o?.()||"";if(u===q||f&&f.key===q&&f.generation===d)return;let F=++d;f={key:q,generation:F};let H=null;try{H=await Promise.resolve(r("get-session-defaults",{}))}catch(U){if(F!==d)return;f=null,Gk("get-session-defaults failed: %o",U),g();return}F===d&&(a=H&&typeof H.values=="object"&&H.values!==null?{...H.values}:{},u=q,f=null,g())}function C(){u=null,d+=1,E()}function te(){for(let[q,F]of l)F==="failed"&&l.delete(q)}function ie(q,F){return s?s.selectBoardColumn(q,F):[]}function z(q,F,H,U){let M=new Set(H.map(K=>K.id)),Q=new Set,B=new Map,ne=[];for(let K of[...F,...H]){if(Q.has(K.id)||rw(K))continue;let re=ts(K,q);re.location===null&&(Q.add(K.id),B.set(K.id,re),ne.push(K))}let ge=E_(ne,Xr(U)),Oe=Ar(q.bead_scope);return ge.map(K=>{let re=B.get(K.id),pe=oo(K),Te=pe.evidence==="published",Y=typeof K.workflow?.route=="string"&&K.workflow.route||(K.metadata&&typeof K.metadata.route=="string"?K.metadata.route:""),ae=re.worker_ineligible,Z=ae||!Object.hasOwn(K,"labels")?"":B_(K.labels,K.metadata),be=M.has(K.id),Ie=be?Is(K):[],ye=[];be&&Ie.length===0&&ye.push(Jk),re.awaiting_user&&ye.push(ow(K.metadata)),re.missing_description?ye.push("missing_description"):re.spec==="conflict"?ye.push("spec_id_conflict"):re.spec==="none"?ye.push("spec \uC5C6\uC74C"):re.spec==="draft"&&ye.push("spec \uBBF8\uBC1C\uD589(draft)");let Le=Oe[K.id];return{bead_id:K.id,title:K.title||K.id,route:Y,spec_id:pe.conflict?"":pe.path,published:Te,blocked:be,blocked_by:Ie,labels:Array.isArray(K.labels)?K.labels:[],created_at:K.created_at,updated_at:K.updated_at,status:K.status,workflow:K.workflow||null,exec_pins:sw(Ar(K.metadata)),rec:null,...Le&&Array.isArray(Le.scope)?{scope:Le.scope}:{},eligible:re.placeable,route_ok:re.route_ok,awaiting_user:re.awaiting_user,missing_description:re.missing_description,placement_spec:re.spec,reason:ye.join(" \xB7 "),worker_ineligible:ae,session_preferred:Z.length>0,session_preferred_reason:Z,spec_after_blocker:U_(K.labels,Ie),release_info:K.release_info,dependents_info:K.dependents_info}})}function P(q){let[F,H,U,M,Q]=q,B=Js([...F,...H,...U,...M,...Q]),ne=iw([...F,...H,...U,...M]),ge={},Oe=(K,re)=>{if(!K||typeof K.id!="string"||K.id.length===0)return;let pe=ge[K.id]||(ge[K.id]={});if(typeof K.priority=="number"&&!("priority"in pe)&&(pe.priority=K.priority),typeof K.from_id=="string"&&!("from_id"in pe)&&(pe.from_id=K.from_id),re&&!("metadata"in pe)){pe.metadata=Ar(K.metadata);let Te=Ar(K.workflow).route;typeof Te=="string"&&Te.length>0&&(pe.route=Te)}};for(let K of[...F,...H,...U])Oe(K,!0);for(let K of[...M,...Q])Oe(K,!1);for(let K of new Set([...Object.keys(ge),...B.keys()])){let re=ei(B,K);if(re.total>0){let pe=ge[K]||(ge[K]={});pe.rollup=re}}for(let[K,re]of ne){let pe=ge[K]||(ge[K]={});pe.carried_to=re}return ge}function I(q,F,H,U){let M=new Set((Array.isArray(q.done)?q.done:[]).map(B=>B?.bead_id).filter(B=>typeof B=="string")),Q=[];for(let B of F){let ne=pr(B.closed_at);if(typeof B.id!="string"||M.has(B.id)||ne===null||U!==void 0&&ne<U||typeof B.comment_count!="number"||B.comment_count<=0)continue;let ge=`${H}\0${B.id}\0${String(B.updated_at)}\0${B.comment_count}`,Oe=l.get(ge);if(Oe===void 0&&r&&(l.set(ge,"pending"),Promise.resolve(r("get-comments",{id:B.id})).then(re=>{let pe=Array.isArray(re)&&re.some(Te=>ia(typeof Te?.text=="string"?Te.text:"")?.lane==="session");l.set(ge,pe?"session":"not-session"),g()}).catch(()=>{l.set(ge,"failed"),g()})),Oe!=="session")continue;let K=pr(B.started_at);Q.push({id:B.id,title:B.title||B.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:K!==null&&ne>=K?ne-K:null,work_kind:"session",done_at:ne,created_at:B.created_at,updated_at:B.updated_at})}return Q}return{read(q){if(!t)return{workspaces:[],workspaces_state:[]};let F=t.get()||ew,H=o?.()||"",U=q&&typeof q.done_since=="number"?q.done_since:void 0,M=ie(Yk,"ready"),Q=ie(Vk,"blocked"),B=ie(Qk,"in_progress"),ne=ie(Xk,"resolved"),ge=ie(Zk,"closed");return{workspaces:[{...F,bead_titles:{...Ar(F.bead_titles),...Object.fromEntries([...M,...Q].filter(Oe=>Oe&&typeof Oe.id=="string").map(Oe=>[Oe.id,Oe.title||Oe.id]))},root_dir:H,name:aw(H),runnable:z(F,M,Q,q?q.candidate_sort:void 0),session_done:I(F,ge,H,U),bead_overlay:P([M,Q,B,ne,ge])}],workspaces_state:[{root_dir:H,revision:F.revision,auto_advance:F.auto_advance,auto_merge:F.auto_merge,slots:typeof Ar(F.workspace_info).slots=="number"?Ar(F.workspace_info).slots:F.slots,runner_catalog:F.runner_catalog,execution_defaults:F.execution_defaults,session_defaults:k(H),orchestration_model:F.orchestration_model,orchestration_effort:F.orchestration_effort,orchestration_speed:F.orchestration_speed,quick_fix_orchestration_model:F.quick_fix_orchestration_model,quick_fix_orchestration_effort:F.quick_fix_orchestration_effort,quick_fix_orchestration_speed:F.quick_fix_orchestration_speed,issue_prefix:""}]}},ensureSessionDefaults(){E()},refreshSessionDefaults:C,notifyIssuesChanged:te,destroy(){h=!0,d+=1,f=null,l.clear()}}}var Sa=1,z_=5,lw={root_dir:"",name:"",auto_advance:!1,auto_merge:!1,slots:Sa,revision:0,runner_catalog:{},items:[],sublanes:{parallel:[],serial:[]},serial_lane_count:0,raw_queue_length:0,live_count:0,over_cap:!1,merge:{positions:new Map,resolutions:new Map,continuations:new Map,authorities:new Map,state:{active:null,failures:{},waiting:null},auto_excluded:[],running:!1},token_total:null,cleanup_failures:[],declared_base:null,repo_operations:[]};function fn(e){return e&&typeof e=="object"?e:{}}var G_="beads-ui.worker.candidate-filter",fc={show_blocked:!1,readiness:"all",routes:[]},cw=1e3;function uw(){try{let e=window.localStorage.getItem(G_);if(!e)return{...fc};let t=JSON.parse(e);if(!t||typeof t!="object")return{...fc};let n=t.readiness;return{show_blocked:t.show_blocked===!0,readiness:n==="ready"||n==="not_ready"?n:"all",routes:Kr(t.routes)}}catch{return{...fc}}}function dw(e){try{window.localStorage.setItem(G_,JSON.stringify(e))}catch{}}var Y_="bdui.worker.done-range";function pw(){try{let e=window.localStorage.getItem(Y_);return e===null?"today":zn(e)}catch{return"today"}}function fw(e){try{window.localStorage.setItem(Y_,e)}catch{}}function H_(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function _w(e){return e==="receipt_not_current"?"\uB9AC\uBDF0 \uD6C4\uC5D0\uB3C4 \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC74C":e==="cancelled"?"\uB9AC\uBDF0 \uC138\uC158 \uCDE8\uC18C\uB428":e.startsWith("launch_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uC2DC\uC791 \uC2E4\uD328(${e.slice(14)})`:e.startsWith("session_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uBE44\uC815\uC0C1 \uC885\uB8CC(${e.slice(15)})`:`\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD328(${e})`}function K_(e){if(e.startsWith("receipt_unbacked:"))return`\uC2E4\uD589 \uC601\uC218\uC99D \uC790\uB3D9 \uAC80\uC99D \uBD88\uAC00(${e.slice(17)}) \u2014 [\uBA38\uC9C0] \uD074\uB9AD\uC73C\uB85C \uC218\uB3D9 \uC9C4\uD589 \uAC00\uB2A5`;switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_rebase_cap":return"\uD050 \uC7AC\uCDA9\uB3CC 3\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"worktree_restore_branch_mismatch":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uBE0C\uB79C\uCE58 \uC774\uB984 \uBD88\uC77C\uCE58";case"worktree_restore_path_exists":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uACBD\uB85C \uC774\uBBF8 \uC788\uC74C";case"worktree_restore_branch_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 origin\uC5D0 \uBE0C\uB79C\uCE58 \uC5C6\uC74C";case"worktree_restore_branch_diverged":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uB85C\uCEEC \uBE0C\uB79C\uCE58\uAC00 origin\uACFC \uB2E4\uB984";case"worktree_restore_failed":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function mw(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function gw(e){return!e||typeof e!="object"?"\uC138\uC158 \uAE30\uB3D9 \uC751\uB2F5\uC744 \uBC1B\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4":e.conflict===!0?"\uD050\uAC00 \uBC14\uB00C\uC5B4 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694":e.session==="already_running"?`\uC774\uBBF8 \uC5F4\uB824 \uC788\uC2B5\uB2C8\uB2E4 \xB7 ${e.tmux_window||"?"}`:e.launched!==!0?`\uC138\uC158 \uAE30\uB3D9 \uC2E4\uD328: ${e.reason||"unknown"}`:e.mode==="fork"?null:`\uC0C8 \uC138\uC158\uC73C\uB85C \uC2DC\uC791 (${e.fallback_reason||"unknown"})`}function hw(e){return e&&e.launched===!0?"success":"error"}function bw(e){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let t=e.slice(19);if(t.length===0)return null;switch(t){case"gating":return"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function yw(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}var vw=new Set(["paused","needs_human","waiting_metadata","reviewing","retrying"]),kw=new Set(["waiting_metadata","reviewing","retrying"]),_c=new Set(["review_receipt_missing","review_receipt_stale","review_receipt_invalid","review_receipt_undetermined"]);function ww(e){let t=e&&typeof e=="object"?e.auto_resolution:null,n=t&&typeof t=="object"&&!Array.isArray(t)?t:null;if(!n||!e)return null;let r=typeof n.origin_reason=="string"&&n.origin_reason.length>0?`\uC6D0 \uC0AC\uC720: ${n.origin_reason}`:"";switch(e.phase){case"waiting_metadata":return{label:"\uC815\uC815 \uB300\uAE30",details:[r,"\uBA54\uD0C0\uB370\uC774\uD130 \uC815\uC815\uC774 \uAD00\uCE21\uB418\uBA74 \uC790\uB3D9 \uC7AC\uAC1C"].filter(Boolean),live:!1};case"retrying":{let o=Number.isInteger(n.attempts)?Math.max(0,Number(n.attempts)):0,i=Number.isInteger(n.attempt_cap)&&Number(n.attempt_cap)>0?Number(n.attempt_cap):0,s=typeof n.next_at=="number"?sn(n.next_at):"",l=typeof n.last_error=="string"&&n.last_error.length>0?n.last_error:"";return{label:i>0?`\uC7AC\uC2DC\uB3C4 ${Math.min(o,i)}/${i}`:`\uC7AC\uC2DC\uB3C4 ${o}`,details:[r,s?`\uB2E4\uC74C \uC2DC\uAC01 ${s}`:"",l?`\uB9C8\uC9C0\uB9C9 \uC624\uB958: ${l}`:""].filter(Boolean),live:!0}}default:return null}}function $w(e){if(typeof e!="string")return"";for(let t of["retry_exhausted:","auto_review_exhausted:"])if(e.startsWith(t))return e.slice(t.length);return""}function xw(e,t=null){if(!e||typeof e!="object")return null;let n="";switch(e.phase){case"gating":n="\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"merging":n="\uBA38\uC9C0 \uC911";break;case"cleaning":n="\uB9C8\uBB34\uB9AC \uC911";break;case"waiting_metadata":case"reviewing":case"retrying":if(!t)return null;n=t.label;break;case"paused":n="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":n="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let r=[n];e.head_sha&&r.push(`head ${e.head_sha}`),e.base_sha&&r.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&r.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`);let o=$w(e.terminal_reason);o&&r.push(`\uC6D0 \uC0AC\uC720: ${o}`);let i=e.phase==="needs_human"&&!o?Qr(e.terminal_reason):null;i&&r.push(e.failure_stage?`${e.failure_stage} \xB7 ${i}`:i);for(let s of t?t.details:[])r.push(s);return e.active_attempt_id&&r.push(`attempt ${e.active_attempt_id}`),e.evidence&&r.push(e.evidence),e.log_path&&r.push(e.log_path),{badge:n,title:r.join(`
`),alert:e.phase==="needs_human",lock_actions:!vw.has(e.phase)}}function Aw(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function Sw(e){if(!e||typeof e!="object")return[];let t=e.badge_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function Ew(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",n=(i,s={})=>{let l=[s.title||"",t].filter(Boolean);return{label:i,title:l.join(`
`),live:s.live===!0,alert:s.alert===!0}};if(e.continuation_required)return n("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.queueing)return e.queueing==="cleanup"?n("\uC815\uB9AC \uC7AC\uC2DC\uB3C4 \uC694\uCCAD \uC911",{title:"\uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9AC\uB294 \uC911\uC785\uB2C8\uB2E4",live:!0}):n("\uD050 \uB4F1\uB85D \uC911",{title:"\uBA38\uC9C0 \uD050\uC5D0 \uB123\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.merge_step)return e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):n("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return n(e.conflict_badge,{live:e.conflict_live===!0});if(e.auto_resolution)return n(e.auto_resolution.label,{title:e.auto_resolution.details.join(`
`),live:e.auto_resolution.live===!0});if(e.recovery?.lock_actions)return n(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return n(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return n("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});let r=Aw(e.receipt_check),o=e.conflicting||e.gate?.reason==="base_behind"||r.length>0;if(e.auto_pending&&o)return n("\uD655\uC778 \uC911",{title:"\uBA38\uC9C0 \uD050\uAC00 \uC790\uB3D9\uC73C\uB85C \uCC98\uB9AC \uC911 \u2014 \uB2E4\uC74C \uAD00\uCE21\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.conflicting)return n("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="base_behind")return n("base \uAC31\uC2E0 \uD544\uC694",{alert:!0});if(_c.has(e.gate?.reason)){let i=e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uC785\uB2C8\uB2E4. [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":e.gate.reason==="review_receipt_invalid"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uAE30\uB85D\uC774 \uC131\uB9BD\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":e.gate.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC758 ancestry probe\uB97C \uC644\uB8CC\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4";if(e.review_session?.active===!0)return n(e.review_session.origin==="auto"?"\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911":"\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911",{title:`${i}
\uB9AC\uBDF0 \uC138\uC158\uC774 \uC2E4\uD589 \uC911\uC785\uB2C8\uB2E4 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4`,live:!0});if(e.auto_review_wait==="slot")return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uB9AC\uBDF0 \uC138\uC158 \uC2AC\uB86F \uB300\uAE30",{title:`${i}
\uC2E4\uD589 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uC790\uB3D9\uC73C\uB85C \uB9AC\uBDF0 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4. \uC9C0\uAE08 \uD074\uB9AD\uD558\uBA74 \uC989\uC2DC \uB744\uC6C1\uB2C8\uB2E4`,live:!0});if(e.review_session?.failure){let s=e.review_dispatch?.state==="exhausted"&&e.review_session.origin==="auto";return n(`\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 ${s?"\uC790\uB3D9 \uB9AC\uBDF0 1\uD68C \uC18C\uC9C4 \xB7 ":""}${_w(e.review_session.failure)}`,{title:`${i}
\uC9C1\uC804 \uB9AC\uBDF0 \uC138\uC158 \uC885\uB8CC \uC0AC\uC720: ${e.review_session.failure}`,alert:!0})}return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:i,alert:!0})}return e.gate?.reason==="spec_id_missing"?n("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0}):r.length>0?n(`\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694 \xB7 ${r[0]}`,{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${r.join(", ")}`,alert:!0}):e.recovery?n(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?n("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?n(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${K_(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?n(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${K_(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?n(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?n("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?n("\uB2EB\uD798",{alert:!0}):e.activity?n("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?n("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?n("\uD655\uC778 \uC911"):e.gate?.gate_badge?n(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function Tw(e,t,n,r,o=null,i=null,s=null,l=!1,a=null,u=!0,d=null,f=null,h=null,g={},k=!1,E={},C=null,te={active:!1,failure:null,origin:null},ie=!1){let z=!!a&&a.position>0,P=!!a?.continuation_action&&a.continuation_action.continuation===null,I=!!a&&a.active===!0,q=a&&a.failure||null,F=bw(a?a.waiting:null),H=n[e]||null,U=H&&H.gate?H.gate:null,M=H&&H.pr?H.pr:null,Q=yw(a?a.resolution:null),B=ww(h),ne=xw(h,B),ge=a&&a.authority||null,Oe=a&&a.review_dispatch||null,K=a?.hold?.auto_review_wait==="slot"?"slot":null,re=!!h&&typeof h=="object"&&kw.has(h.phase),pe=z&&!I&&(!ge||re||ge.source==="automatic"&&!k),Te=s==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":Q?Q.badge:s==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":F,Y=!!U&&U.base_badge==="\uCDA9\uB3CC",ae=!!U&&U.enabled===!0,Z=ls({bead_id:e,merge_sha:E.merge_sha,cleanup_cursor:E.cleanup_cursor,merge_progress:i&&i.merge_progress?i.merge_progress:null,cleanup_failed:r,repo_operations:E.repo_operations}),be=Bi(Z),Ie=i&&!Z&&(i.queueing??null)?i.queueing:null,ye=!!r&&["repo_operations","post_merge_jobs","child_sweep","branch_cleanup","parent_close"].includes(r.step)&&!!U&&U.tier==="merged",Le=r&&r.step==="repo_operations"&&Z?.failed===!0&&(Z.step==="deploy"||Z.step==="verify")?Z.step:null,Ge=l&&!!r&&!!U&&U.tier==="merged",gt=pe&&(ae||Y||U?.reason==="base_behind"||_c.has(U?.reason)||ye||Ge),V=_c.has(U?.reason),J=l&&Y&&u===!1,oe=sr(g,e,{external:l,merge_active:I||Z?.step==="merge",merge_queued:z,conflict_active:!!s,cleanup_active:be,merged:!!r||U?.tier==="merged"}),de=!!oe.operation,Ee=!!r||h?.phase==="needs_human"||!!oe.error,_e=z&&!q&&!P&&!ye&&!(ne&&ne.lock_actions),Re=Ew({auto_pending:_e,continuation_required:P,queueing:Ie,merge_step:Z,conflict_badge:Te,conflict_live:Q?.live===!0||s==="running",auto_resolution:B,recovery:ne,cleanup_failed:r,cleanup_label:r?Hr(r.step):null,base_exception:f,conflicting:Y,gate:U,receipt_check:H&&H.receipt_check?H.receipt_check:null,queue_failure:q,auto_skip:d,queued:z,queue_active:I,queue_position:a?a.position:0,review_session:te,review_dispatch:Oe,auto_review_wait:K,activity:Te?null:i&&i.activity||null}),Fe=Re?.live===!0&&Re.title?c`<span title=${Re.title}>${Re.label}</span>`:Re?.label||null,Ye=Sw(H&&H.receipt_check?H.receipt_check:null);return{id:e,title:l?c`${t}<span class="muted"> · 세션</span>`:t,reason:r&&Z?.active!==!0?Fi(r.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",...C?{dependency_chips:C}:{},external:l,pr_number:M&&typeof M.number=="number"?M.number:null,pr_url:M&&typeof M.url=="string"?M.url:"",completion_badge:Re?.live!==!0&&Re?.title?Re.label:null,completion_title:Re?.title||"",...h?.phase==="needs_human"&&typeof h.log_path=="string"&&h.log_path.length>0?{log_path:h.log_path}:{},...Ye.length>0?{receipt_badge:{codes:Ye}}:{},badges:Fe?[Fe]:[],live_badge:Re?.live===!0?Fe:null,usage:o,alert:Re?.alert===!0,merge_action:U?.tier==="merged"&&!ye&&!Ge?!1:!z||P||pe||V,cancel_action:z&&!P,cancel_enabled:!I&&!(ne&&ne.lock_actions),cancel_title:ne&&ne.lock_actions?`${ne.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:I?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:oe,discard_action:oe.action,resolve_action:Ee,resolve_enabled:!ie,resolve_title:ie?"\uC138\uC158 \uAE30\uB3D9 \uC694\uCCAD \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":"\uC774 \uC2E4\uD328\uB97C \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 \u2014 \uAE30\uB85D\uB41C \uC138\uC158\uC774 \uC788\uC73C\uBA74 fork\uD558\uACE0, \uC5C6\uC73C\uBA74 \uC0C8 \uC138\uC158\uC5D0 \uC0AC\uC720\uB97C \uC2E3\uC2B5\uB2C8\uB2E4",merge_step:Z,discard_enabled:oe.enabled,discard_title:oe.title,merge_enabled:!Z&&!Ie&&!s&&!de&&!f&&!(ne&&ne.lock_actions)&&!J&&te.active!==!0&&(ae||Y||U?.reason==="base_behind"||V||ye||Ge||gt||re&&!I),merge_label:P?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":ye||Ge?Le==="deploy"?"\uBC30\uD3EC \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":Le==="verify"?"\uAC80\uC99D \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":"\uC815\uB9AC \uC7AC\uC2DC\uB3C4":Y&&!Z&&!ye?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":U?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":V?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":pe?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:de?oe.error?`\uD3D0\uAE30 \uC2E4\uD328: ${oe.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${oe.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:P?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Ie?"\uC694\uCCAD\uC744 \uBCF4\uB0B4\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":Z?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${Z.label}`:Le?`\uBA38\uC9C0 \uC644\uB8CC \u2014 ${Le==="deploy"?"\uBC30\uD3EC":"\uAC80\uC99D"} \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD574 \uC815\uB9AC\uAC00 \uBA48\uCDC4\uC2B5\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uC800\uC7A5\uC18C \uC791\uC5C5\uBD80\uD130 \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4`:Ge?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":J?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":s==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":s==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":ye?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":Y?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":U?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":te.active===!0?te.origin==="auto"?"\uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":U?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uB9AC\uBDF0\uB9CC \uC218\uD589\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":U?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":U?.reason==="review_receipt_invalid"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uAE30\uB85D\uC774 \uC131\uB9BD\uD558\uC9C0 \uC54A\uC74C \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":U?.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D ancestry probe \uBBF8\uC644\uB8CC \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC0C8 \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":U?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":ae?`\uBA38\uC9C0 (${U.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:U&&U.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${U&&U.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function mc(e,t={}){let{transport:n,issueStores:r,queueStore:o,sessionLogStore:i,gotoIssue:s,getWorkspacePath:l,switchWorkspace:a,openDoc:u,doneRange:d,onDoneRangeChange:f}=t,h=r?io(r):null,g=uw(),k=null,E=null,C=null,te=null,ie=null,z=_o(()=>p()),P=new Map,I=new Map,q=x_(),F=uc(q)===null,H=d?zn(d):pw();function U(){let $=eo.find(y=>y.value===H);return $?$.label:"\uC624\uB298"}let M=fa("beads-ui.worker.lane-collapsed"),Q=!1,B="";function ne(){return B.trim().length>0}function ge($){return ne()?$.filter(y=>y.search_match===!0).length:void 0}let Oe=new Set,K=new Set,re=new Set,pe=new Set,Te=new Set,Y=new Set,ae=null,Z=[],be=W_({queueStore:o,issueStores:r,transport:n,getWorkspacePath:l,onInvalidate:()=>p()});function Ie(){be.refreshSessionDefaults()}let ye=document.createElement("div");ye.className="worker-console";let Le=document.createElement("div");Le.className="worker-top";let Ge=document.createElement("div");Ge.className="worker-drawer-overlay",Ge.hidden=!0;let gt=document.createElement("div");gt.className="worker-drawer-overlay__backdrop";let V=document.createElement("div");V.className="worker-drawer-host";let J=document.createElement("div");J.className="worker-drawer-host",J.hidden=!0,Ge.append(gt,V,J);let oe=document.createElement("div");oe.className="worker-lanes-host",ye.append(Le,Ge,oe),e.appendChild(ye);let de=kr(null,null),Ee=[],_e=ma({transport:n,console_el:ye,getLanes:()=>de,getWorkspaces:()=>Ee,getCrossLanes:()=>null,reproject:()=>({lanes:W(),raw_lanes:null}),onCorrection:()=>{},showToast:me,requestRender:()=>p(),adoptQueue:($,y)=>{o&&o.set(y)},onDragBegin:()=>{E=null}}),Re=null,Fe=To(V,{transport:n,sessionLogStore:i,onClose:()=>{Re=null,Ge.hidden=!0,p()}}),Ye=F_(J,{onClose:()=>{J.hidden=!0,Ge.hidden=!0,p()}}),Be=I_({getWorkspacePath:l||(()=>"")}),ee=l&&l()||"",G=D_({queueStore:o,transport:n,onChanged:()=>p(),onOpenScript:($,y)=>{Be.open($,y)}});function Se(){return o&&o.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:Sa,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function ht($){let y=ga($,Se());y&&(ie=y,p())}function at(){ie=null,p()}function ze(){let $=ba(ie);$&&(ie=null,p(),Me($.attempt_id,"session",$.payload))}function et($){if(!E||!$.some(R=>R.id===E))return null;let y=ns(Se());return y?{bead_id:E,lanes:y}:null}function St(){return l&&l()||""}async function pt($,y){await _e.sendOp({type:"worker-queue-place",payload:{bead_id:$,...y==="parallel"?{}:{lane:y}},root_dir:St()},$)}function Ve(){let $=Se();return typeof $.revision=="number"?$.revision:0}function w($){$&&$.queue&&o&&o.set($.queue)}async function se($){if(!n||!$)return;let y=await n("worker-attempt-pause",{attempt_id:$});y&&y.paused===!1&&y.reason&&me(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${y.reason}`,"error",2400)}async function Me($,y="session",R={}){if(!n||!$)return;let le=n,xe=Se().attempts?.[$]||null;await co({context:{bead_id:xe?.bead_id||"",kind:y,tuple:xe?Tn(xe):""},transport:qe=>le("worker-attempt-resume",{attempt_id:$,expected_revision:Ve(),...R,...qe}),adopt:w})}async function Ue($,y,R=!0){if(!n)return null;let le=n,xe=await le($,{...y,expected_revision:Ve()});return w(xe),xe&&xe.conflict&&R&&(xe=await le($,{...y,expected_revision:Ve()}),w(xe)),xe}async function Ze($){if(!n||!$)return;let y=Se().merge_queue?.find(le=>le.bead_id===$)?.continuation_action;if(y?.mismatch&&y.continuation===null){await Dt($,y.mismatch);return}Oe.add($),p();let R;try{R=await Ue("worker-merge-queue-add",{bead_id:$})}catch{me("\uBA38\uC9C0 \uD074\uB9AD\uC774 \uC11C\uBC84\uC5D0 \uC804\uB2EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4(\uC5F0\uACB0 \uBB38\uC81C) \u2014 \uC5F0\uACB0 \uBCF5\uAD6C \uD6C4 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",3200);return}finally{Oe.delete($),p()}if(!(!R||R.applied)){if(R.conflict){me("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}me(mw(R.reason),"error",2400)}}async function Pe($){if(!(!n||!$||K.has($))){K.add($),p();try{let y=await n("worker-cleanup-retry",{bead_id:$,expected_revision:Ve()});w(y),y&&!y.retried&&!y.conflict&&y.reason&&me(`\uC815\uB9AC \uC7AC\uC2DC\uB3C4 \uAC70\uBD80: ${y.reason}`,"error",2400)}finally{K.delete($),p()}}}async function tt($){if(!(!n||!$||re.has($))){re.add($),p();try{let y=await n("worker-resolve-in-session",{bead_id:$,expected_revision:Ve()});w(y);let R=gw(y);R!==null&&me(R,hw(y),4e3)}finally{re.delete($),p()}}}async function $t($,y){let R=Se().hold;if(!n||!R||typeof R.since!="number")return;let le=await n($,{since:R.since});w(le),le&&le.ok===!1&&me(`${y}: ${le.reason==="hold_changed"?"\uD050 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694":le.reason||""}`,"error",2800)}async function qt($){if(!n||!$)return;let y=await n("worker-queue-start-now",{bead_id:$});w(y),y&&y.ok===!1&&me(`\uC9C0\uAE08 \uC2DC\uC791 \uAC70\uBD80: ${y.reason==="not_waiting"?"\uC774 \uC774\uC288\uB294 \uB354 \uC774\uC0C1 \uB300\uAE30 \uB808\uC778\uC5D0 \uC5C6\uC2B5\uB2C8\uB2E4":y.reason||""}`,"error",2800)}async function Dt($,y){let R=await gr({continuation_mismatch:y},(xe,qe)=>Ue("worker-merge-queue-add",{bead_id:$,continuation:xe,decision_token:qe},!1)),le=R?.queue?.merge_queue?.find(xe=>xe.bead_id===$)?.continuation_action;if(R?.applied!==!0&&le?.continuation===null&&le.mismatch){await Dt($,le.mismatch);return}R&&R.applied===!1&&!R.conflict&&me("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function ue($){if(!n)return;let y=await Ue("worker-merge-auto-toggle",{on:$});!y||y.conflict||me($?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",$?"success":"info",2400)}async function he($){if(!n||!$)return;let y=await Ue("worker-merge-queue-remove",{bead_id:$});y&&!y.conflict&&!y.applied&&y.reason==="merge_active"&&me("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function Ke(){await Ue("worker-merge-queue-remove",{all:!0})}async function nt($,y=null,R="unmerged",le=null){if(!n||!$)return;let xe=os($,R);if(!(!!le||typeof globalThis.confirm!="function"||globalThis.confirm(xe)))return;let Qe=await n("worker-discard",{bead_id:$,...y?{attempt_id:y}:{},...le?{operation_id:le}:{},expected_revision:Ve()});if(w(Qe),Qe&&Qe.conflict&&(Qe=await n("worker-discard",{bead_id:$,...y?{attempt_id:y}:{},...le?{operation_id:le}:{},expected_revision:Ve()}),w(Qe)),Qe&&Qe.discarded===!0){me(Ri(Qe),"success",5e3);return}if(Qe&&Qe.reason){me(`\uD3D0\uAE30 \uC2E4\uD328: ${Qe.reason}`,"error",2800);return}if(Qe&&Qe.accepted&&Qe.pending==="merged_revert"){me("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(Qe&&Qe.accepted&&!Qe.discarded){me(`\uD3D0\uAE30 \uC9C4\uD589: ${Qe.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}Qe&&!Qe.conflict&&me("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function Je($,y,R){if(!n||!$||!y||typeof globalThis.confirm=="function"&&!globalThis.confirm(ss($,R)))return;let le=await n("worker-discard-abandon",{bead_id:$,operation_id:y,expected_revision:Ve()});if(w(le),le&&le.conflict&&(le=await n("worker-discard-abandon",{bead_id:$,operation_id:y,expected_revision:Ve()}),w(le)),le&&le.abandoned===!0){me(Ci(R),"success",5e3);return}if(le&&le.reason){me(`\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: ${le.reason}`,"error",2800);return}le&&!le.conflict&&me("\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: unknown","error",2800)}async function ut($,y,R){if(!(!n||!y||!R||Te.has(y))){Te.add(y),p();try{let le=await n($,{bead_id:y,action_id:R,expected_revision:Ve()});w(le),le?.conflict?me("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!le?.ok&&le?.reason&&me(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(le.reason)}`,"error",2800)}finally{Te.delete(y),p()}}}async function ft($,y){if(!n||!y||pe.has(y))return;pe.add(y),p();let R;try{let le=async(xe={})=>await n($,{bead_id:y,expected_revision:Ve(),...xe});R=await le(),w(R),R&&R.conflict&&(R=await n($,{bead_id:y,expected_revision:Ve()}),w(R)),$==="worker-revise-fix"&&(R=await gr(R,(xe,qe)=>le({continuation:xe,decision_token:qe}),{onResult:w,refresh:()=>le()}))}finally{pe.delete(y),p()}if(!(!R||R.conflict)){if(R.ok){me($==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}me(`\uCC98\uBD84 \uAC70\uBD80: ${R.reason||""}`,"error",3e3)}}async function ot($){if(!n)return;let y=await n("worker-automation-toggle",{on:$,expected_revision:Ve()});w(y),y&&y.conflict&&await n("worker-automation-toggle",{on:$,expected_revision:Ve()}).then(w)}async function Ne($){if(!n||!$)return;let y=await n("worker-repo-operation-dismiss",{operation_id:$});w(y),y&&y.ok===!1&&me(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${y.reason||""}`,"error",3e3)}async function A($){if(!n||!Number.isFinite($))return;let y=Math.max(Sa,Math.floor($)),R=await n("worker-queue-set-slots",{slots:y,expected_revision:Ve()});w(R),R&&R.conflict&&await n("worker-queue-set-slots",{slots:y,expected_revision:Ve()}).then(w)}async function j($){if(!n||!Number.isInteger($)||$<1||$>z_)return;let y=Se(),R=(Array.isArray(y.serial_lanes)?y.serial_lanes:[]).slice($).reduce((qe,Qe)=>qe+(Array.isArray(Qe?.entries)?Qe.entries.length:0),0),le=()=>({count:$,expected_revision:Ve()}),xe=await n("worker-queue-set-serial-lane-count",le());w(xe),xe&&xe.conflict&&(xe=await n("worker-queue-set-serial-lane-count",le()),w(xe)),xe&&xe.applied&&R>0&&me(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${R}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}function W(){let $=Mr(H),y=be.read({candidate_sort:q,done_since:$});return Ee=y.workspaces,de=kr(y.workspaces,y.workspaces_state,{done_since:$,candidate_filter:g,candidate_hidden_counts:"per_control",candidate_sort:"as_given",groups:"all",search:B}),de}function $e($){return $.queue_groups[0]||lw}function we($){let y=$.dependency_chips||null,R={...y&&y.released?{released:y.released}:{},...y&&y.dependents?{dependents:y.dependents}:{}},le=P.get($.id),xe=I.get($.id)||null,qe=le&&le.overlaps.length>0?le.overlaps:null,Qe=!!le&&le.scope_missing;return!xe&&!qe&&!Qe&&Object.keys(R).length===0?null:{...R,...xe?{predecessors:xe}:{},...qe?{overlaps:qe}:{},...Qe?{scope_missing:!0}:{}}}function _t($){return{...$,workspace_name:"",done_layout:void 0,dependency_chips:we($)||void 0,chip_popover:kt($)}}function kt($){return Mi($,y=>z.isOpen({bead_id:$.id,chip_key:y}))}function vt(){let $=Se(),y=new Map;for(let R of Object.values(fn($.lane_states))){let le=Array.isArray(R?.corrections)?R.corrections:[];for(let xe of le)xe&&typeof xe.bead_id=="string"&&typeof xe.after=="string"&&y.set(xe.bead_id,xe.after)}return{admission:fn($.admission),correction_after:y}}function Tt($,y){let R=_t($),le=Ed(y.admission[$.id]||null,!!$.discard||Te.has($.id)),xe=y.correction_after.get($.id);return{...R,draggable:R.draggable===!0&&!le,stale_work:le,reason:le?"":R.reason,badges:xe?[`\u{1F517} ${xe} \uB4A4 (blocks \uC790\uB3D9)`,...R.badges||[]]:R.badges,revise_enabled:R.revise_enabled===!0&&!pe.has($.id)}}function Wt($){let y=vt();return $e($).sublanes.parallel.map(R=>Tt(R,y))}function Ht($){let y=vt();return $e($).sublanes.serial.map(R=>{let le=R.occupants.map(xe=>({id:xe.id,title:xe.title,draggable:!1,lane:R.id,ghost:!0,badges:[xe.badge],...typeof xe.search_match=="boolean"?{search_match:xe.search_match}:{}}));return{id:R.id,index:R.index+1,raw_length:R.raw_length,ghosts:le,items:R.items.map(xe=>Tt(xe,y)),occupied:R.occupied_by.length>0,badge:R.occupants.length>0?R.occupants[0].badge:"\uB300\uAE30",cycle:R.cycle===!0}})}function Nt($){return $.runnable.map(y=>_t(y))}function wt($){return $.done.map(y=>_t(y))}function Jt($){let y=$.running.filter(R=>R.non_occupying!==!0).map(R=>({...R,bead_id:R.id,attempt_id:R.attempt_id||"",paused:R.run_state==="paused",failed:R.run_state==="failed",parked:R.run_state==="parked",retry_wait:R.run_state==="retry_wait",waiting:R.run_state==="waiting",wait:R.wait||null,provider_hold:R.run_state==="provider_hold",hold:R.hold?{...R.hold,open:te===R.attempt_id}:null,status_label:R.run_state==="failed"?R.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328":R.run_state==="parked"?"\uC138\uC158 \uB300\uAE30":R.run_state==="retry_wait"?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":R.run_state==="waiting"?"\uC120\uD589 \uB300\uAE30":R.run_state==="provider_hold"?"\uACF5\uAE09\uC790 \uBCF4\uB958":void 0,can_pause:R.can_pause!==!1,workspace_name:"",dependency_chips:we(R)||void 0,chip_popover:kt(R),rollup_expanded:Y.has(R.id),failure:R.failure?{...R.failure,open:C===R.attempt_id}:null,...Oo(R.id,{discard:R.discard,parked:R.run_state==="parked"},re.has(R.id))}));return[...y.filter(R=>R.failed===!0),...y.filter(R=>R.failed!==!0&&R.parked===!0),...y.filter(R=>R.failed!==!0&&R.parked!==!0)]}function Kt($){return jt($).map(y=>({...y,chip_popover:kt(y)}))}function jt($){if(ae&&ae.model===$)return ae.rows;let y=Se(),R=$e($),le=fn(y.attempts),xe=Object.values(le).filter(or),qe=new Map;for(let He of xe)qe.set(He.attempt_id,He);let Qe=new Map;for(let He of xe)Qe.set(He.bead_id,He);let Rt=new Map;for(let He of[...$.pr_wait,...$.running,...$.queue,...$.runnable,...$.done])Rt.has(He.id)||Rt.set(He.id,He);let tn=He=>{let Bt=null;for(let En of xe)!En||En.bead_id!==He||wl(En,qe)||(Bt===null||(typeof En.started_at=="number"?En.started_at:0)>=(typeof Bt.started_at=="number"?Bt.started_at:0))&&(Bt=En);return Bt&&typeof Bt.target_base=="string"?Bt.target_base:null},ct=new Map;for(let He of $.running)He.run_state==="failed"||He.conflict_resolution!==!0||(He.run_state!=="paused"?ct.set(He.id,"running"):ct.has(He.id)||ct.set(He.id,"paused"));let dn=fn(y.auto_merge_skips),xn=new Set(R.merge.auto_excluded),Cr=fn(y.pr_observations),Wn=fn(y.pr_activity),Vn=fn(y.cleanup_failed),Qn=fn(y.discard_operations),Xn=fn(y.bead_workflow),un=fn(y.bead_titles),Zn=y.merge_queue_state||{active:null,failures:{}},ur=R.merge.state.waiting,dr=new Map;for(let He of Array.isArray(y.merge_queue)?y.merge_queue:[])He&&typeof He=="object"&&He.bead_id&&dr.set(He.bead_id,He);let Rr=(Array.isArray(y.pr_wait)?y.pr_wait:[]).map(He=>{let Bt=Rt.get(He.bead_id);return{...Tw(He.bead_id,Bt?.title||un[He.bead_id]||He.bead_id,Cr,Vn[He.bead_id]||null,rr(le,He.bead_id),Wn[He.bead_id]||(Oe.has(He.bead_id)?{activity:null,merge_progress:null,queueing:"merge"}:K.has(He.bead_id)?{activity:null,merge_progress:null,queueing:"cleanup"}:null),ct.get(He.bead_id)||null,He.external===!0,{position:R.merge.positions.get(He.bead_id)||0,active:Zn.active===He.bead_id,failure:fn(Zn.failures)[He.bead_id]||null,waiting:ur&&ur.bead_id===He.bead_id?ur.reason:null,resolution:R.merge.resolutions.get(He.bead_id),continuation_action:R.merge.continuations.get(He.bead_id),authority:R.merge.authorities.get(He.bead_id)||null,hold:dr.get(He.bead_id)?.hold||null,review_dispatch:dr.get(He.bead_id)?.review_dispatch||null},He.wt_present!==!1,y.auto_merge===!0&&xn.has(He.bead_id)?dn[He.bead_id]?.reason||"":null,kl(R.declared_base,tn(He.bead_id)),fn(y.completion_status)[He.bead_id]||null,Qn,y.auto_merge===!0,{merge_sha:He.merge_sha,cleanup_cursor:He.cleanup_cursor,repo_operations:R.repo_operations},Bt?we(Bt):null,wd(le,He.bead_id),re.has(He.bead_id)),...Bt?.search_match===void 0?{}:{search_match:Bt.search_match},workflow:Xn[He.bead_id]||null,priority:Bt?.priority,from_id:Bt?.from_id,...Bt?.created_at===void 0?{}:{created_at:Bt.created_at},...Bt?.updated_at===void 0?{}:{updated_at:Bt.updated_at}}});return ae={model:$,rows:Rr},Rr}function Ft($){let y=$e($),R=[];for(let qe of $.running)qe.non_occupying!==!0&&R.push({id:qe.id,title:qe.title,location_label:"\uC2E4\uD589\uC911",kind:"running",lane_id:qe.serial_lane_id??null});for(let qe of $.pr_wait)R.push({id:qe.id,title:qe.title,location_label:"PR \uB300\uAE30",kind:"pr_wait",lane_id:null});for(let qe of y.sublanes.serial)qe.items.forEach((Qe,Rt)=>{R.push({id:Qe.id,title:Qe.title,location_label:`${qe.id} #${Rt+1}`,kind:"serial",lane_id:qe.id})});y.sublanes.parallel.forEach((qe,Qe)=>{R.push({id:qe.id,title:qe.title,location_label:`#${Qe+1}`,kind:"parallel",lane_id:null})});for(let qe of $.runnable)R.push({id:qe.id,title:qe.title,location_label:"\uD6C4\uBCF4",kind:"candidate",lane_id:null,queue_placeable:qe.queue_placeable===!0});let le=Se();P=T_(le.bead_scope,R);let xe=new Map;for(let qe of[...$.running,...$.runnable])Array.isArray(qe.blocked_by)&&qe.blocked_by.length>0&&xe.set(qe.id,qe.blocked_by);for(let[qe,Qe]of Object.entries(fn(le.bead_blocked_by)))Array.isArray(Qe)&&xe.set(qe,Qe.filter(Rt=>typeof Rt=="string"&&Rt.length>0));I=Fd(xe,R,fn(le.blocker_workspaces))}function Qt($){let y=$.hold&&typeof $.hold=="object"?$.hold:null;if(!y||y.kind!=="env"&&y.kind!=="systemic")return"";let R=xr(y.cause)||String(y.cause||""),le=Array.isArray($.lineages)?$.lineages:[];if(y.kind==="env"){let qe=le.map(Rt=>Rt&&Rt.next_at).filter(Rt=>typeof Rt=="number").sort((Rt,tn)=>Rt-tn)[0],Qe=typeof qe=="number"?` \xB7 \uB2E4\uC74C ${new Date(qe).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}`:"";return c`<div class="worker-hold worker-hold--env" role="status">
        <span class="worker-hold__text"
          >환경 보류: ${R} — 재시도 대기${Qe}</span
        >
        <button
          type="button"
          class="worker-hold__retry"
          title="예약된 재시도를 지금 실행합니다"
        >
          지금 재시도
        </button>
      </div>`}let xe=(Array.isArray(y.bead_ids)?y.bead_ids:[]).filter(qe=>typeof qe=="string"&&qe.length>0);return c`<div class="worker-hold worker-hold--systemic" role="alert">
      <span class="worker-hold__text"
        >${R}${xe.length>0?` \u2014 bead ${xe.join(", ")}`:""}</span
      >
      <button
        type="button"
        class="worker-hold__resume"
        title="정지를 풀고 멈춰 있던 bead를 다시 디스패치합니다"
      >
        재개
      </button>
    </div>`}function Ae($){let y=[];for(let[ct,dn]of Object.entries(fn($.provider_hold)))for(let xn of Array.isArray(dn?.targets)?dn.targets:[])y.push({runner:ct,target:xn});if(y.length===0)return"";let R=y.find(ct=>ct.target?.kind==="outage");if(R){let ct=typeof R.target.next_probe_at=="number"?new Date(R.target.next_probe_at).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"}):"";return c`<div class="worker-provider-gate" role="status">
        ⚠️ ${R.runner} 공급자 장애 — 신규 디스패치
        보류${ct?`, \uB2E4\uC74C \uD504\uB85C\uBE0C ${ct}`:""}
      </div>`}let le=Array.isArray(fn($.account_catalog).claude)?fn($.account_catalog).claude:[],xe=ct=>le.find(xn=>xn?.email===ct)?.alias||ct,qe=y.find(ct=>typeof ct.target?.account!="string"),Qe=ct=>typeof ct?.resets_at=="number"?new Date(ct.resets_at).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"}):"";if(qe){let ct=Qe(qe.target);return c`<div class="worker-provider-gate" role="status">
        ⏳ ${qe.runner} 사용 한도 — 계정 미확인이라 러너 전체 디스패치
        보류${ct?`, \uB9AC\uC14B ${ct}`:""}
      </div>`}let Rt=[...new Set(y.map(ct=>xe(String(ct.target.account))))],tn=Qe(y[0].target);return c`<div class="worker-provider-gate" role="status">
      ⏳ ${Rt.join(", ")} 사용 한도 —
      ${Rt.length>1?"\uADF8 \uACC4\uC815\uB4E4":"\uADF8 \uACC4\uC815"} 디스패치
      보류${tn?`, \uB9AC\uC14B ${tn}`:""}
    </div>`}function S($){let y=Se(),R=$e($),le=R.sublanes.parallel,xe=le.length>0?le[0].id:"\u2014",qe=c`<button
      type="button"
      class="worker-play${y.auto_advance?" is-active":""}"
    >
      ${y.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,Qe=Et($),Rt=R.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",tn=y.auto_advance?0:(Array.isArray(y.queue)?y.queue:[]).filter(un=>un&&typeof un.armed_by_lane=="string"&&un.armed_by_lane.length>0).length,ct=tn>0?c`<span
            class="worker-kpi__chip worker-kpi__chip--armed"
            title="모니터 연결 레인이 발차한 대기 행입니다 — 이 레포의 자동 진행은 꺼진 채입니다"
            >⏸ 자동 진행 꺼짐 · 연결 레인 ${tn}건 진행 중</span
          >`:"",dn=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${R.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${Kt($).length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${U()} 완료 <b>${$.done.length}</b></span
      >`,xn=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${R.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${R.declared_base||"?"}</span
    >`,Cr=c`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${Sa}
          step="1"
          .value=${String(R.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:z_},(un,Zn)=>Zn+1).map(un=>c`<option
                value=${String(un)}
                ?selected=${R.serial_lane_count===un}
              >
                ${un}
              </option>`)}
        </select>
      </label> `,Wn=c`<input
      type="search"
      class="worker-search"
      placeholder="ID·제목 검색"
      aria-label="이슈 검색 (ID·제목)"
      .value=${B}
    />`,Vn=xd(R.repo_operations,R.cleanup_failures),Qn=Qt(y),Xn=Ae(y);return Q?c`<div class="worker-ribbon">
          ${qe} ${Qe}
          <div class="worker-kpi worker-kpi--ribbon">
            ${Rt}${ct}${dn}
          </div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${Cr}${Wn}</div>
          <div class="worker-kpi">${xn}</div>
        </div>
        ${Xn}${Qn}${Vn}${G.template()}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">
          ${qe}${Qe}${Cr}${Wn}
        </div>
        <div class="worker-kpi">
          ${Rt}${ct}${dn}${xn}
          ${(Array.isArray(R.token_total)?R.token_total:R.token_total?[{label:R.token_total,tooltip:`${U()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(un=>c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${un.tooltip}
                >${U()} 완료 · 누적 ${un.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${xe}</b></span
          >
        </div>
      </div>
      ${Xn}${Qn}${Vn}${G.template()}`}function ve($){let y=$.runnable_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${g.show_blocked}
        />
        🔒 blocked${y.blocked>0?` ${y.blocked}`:""}
      </label>
      <div
        class="worker-filter__readiness"
        role="group"
        aria-label="준비도 필터"
      >
        ${us.map(R=>c`<button
              type="button"
              class="worker-filter__chip${g.readiness===R.value?" is-active":""}"
              data-readiness=${R.value}
              aria-pressed=${g.readiness===R.value?"true":"false"}
            >
              ${R.label}
            </button>`)}
        ${y.readiness>0?c`<span class="worker-filter__hidden"
              >숨김 ${y.readiness}</span
            >`:""}
      </div>
      <div class="worker-filter__routes" role="group" aria-label="route 필터">
        ${ds.map(R=>c`<button
              type="button"
              class="worker-filter__chip worker-filter__route${g.routes.includes(R.value)?" is-active":""}"
              data-route=${R.value}
              aria-pressed=${g.routes.includes(R.value)?"true":"false"}
            >
              ${R.label}
            </button>`)}
        ${y.route>0?c`<span class="worker-filter__hidden"
              >숨김 ${y.route}</span
            >`:""}
      </div>
    </div>`}function De(){let $=F?"custom":uc(q)||"custom";return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${$}
    >
      ${Ls.map(y=>c`<option value=${y.id} ?selected=${$===y.id}>
            ${y.label}
          </option>`)}
      <option value="custom" ?selected=${$==="custom"}>
        사용자 지정…
      </option>
    </select>`}function bt(){let $=Ds(q);return c`<div
      class="worker-sort-chain"
      role="group"
      aria-label="후보 정렬 체인"
    >
      ${[0,1,2].map(y=>{let R=$[y];return c`<span class="worker-sort-chain__step">
          <select
            class="worker-sort-chain__key"
            data-step=${y}
            aria-label=${`${y+1}\uCC28 \uC815\uB82C \uD0A4`}
            .value=${R?R.key:""}
          >
            ${y===0?"":c`<option value="" ?selected=${!R}>없음</option>`}
            ${$_.map(le=>c`<option
                  value=${le.key}
                  ?selected=${!!R&&R.key===le.key}
                >
                  ${le.label}
                </option>`)}
          </select>
          ${R?c`<button
                type="button"
                class="worker-sort-chain__dir"
                data-step=${y}
                aria-label=${R.dir==="asc"?"\uC624\uB984\uCC28\uC21C":"\uB0B4\uB9BC\uCC28\uC21C"}
                title=${R.dir==="asc"?"\uC624\uB984\uCC28\uC21C":"\uB0B4\uB9BC\uCC28\uC21C"}
              >
                ${R.dir==="asc"?"\u2191":"\u2193"}
              </button>`:""}
        </span>`})}
    </div>`}function je(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${H}
      >
        ${eo.map($=>c`<option value=${$.value} ?selected=${H===$.value}>
              ${$.label}
            </option>`)}
      </select>
    </div>`}function Et($){let y=$e($).merge,R=Se().auto_merge===!0;if(y.running)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${R?" is-active":""}"
        title=${R?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${R?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${y.positions.size}
      </button>`;if(R)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let le=new Set(y.auto_excluded),xe=Kt($).filter(qe=>qe.merge_action&&qe.merge_enabled&&!le.has(qe.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${xe>0?` ${xe}`:""}
    </button>`}function It($,y){return c`<div
      data-bead-id=${$.id}
      data-drag-kind=${y.kind}
      data-root-dir=${y.root_dir}
      data-lane-id=${mn(y.lane_id)}
      data-row-index=${y.row_index}
      data-queue-index=${String($.queue_index??0)}
    >
      ${qn({...$,...Oo($.id,{discard:$.discard,parked:!1},re.has($.id))},{actions:$o($)})}
    </div>`}function Gt($){let y=Wt($),R=St();return qi({parallel:{rows:y.map((le,xe)=>It(le,{kind:"parallel",root_dir:R,row_index:xe})),count:y.length,collapsed:M.isAreaCollapsed("parallel"),drop:{drop:"parallel",root_dir:R}},serial:{lanes:Ht($).map(le=>({id:le.id,title:`\uC9C1\uB82C ${le.index}`,rows:[...le.ghosts.map(xe=>qn({...xe,...Oo(xe.id,{discard:xe.discard,parked:!1},re.has(xe.id))},{actions:$o(xe)})),...le.items.map((xe,qe)=>It(xe,{kind:"repo-serial",root_dir:R,row_index:qe,lane_id:le.id}))],count:le.ghosts.length+le.items.length,match_count:ge([...le.ghosts,...le.items]),empty:le.ghosts.length+le.items.length===0,badge:le.badge,held:le.occupied,cycle:le.cycle,drop:{drop:"repo-serial",root_dir:R,lane_id:le.id,lane_length:String(le.raw_length)}})),collapsed:M.isAreaCollapsed("serial")}})}function Xt($){return Mf(Jt($),Date.now(),Re)}function x($){return $.running.some(y=>y.kind!=="session"&&y.run_state==="running")}function O($){let y=$e($),R=Nt($),le=Wt($),xe=wt($),qe=Kt($),Qe=Jt($),Rt=Yn({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4",items:R,match_count:ge(R),src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:De(),header_row:F?bt():void 0,controls:ve($),collapsible:!0,collapsed:M.isCollapsed("candidate"),place_menu:et(R),onOpenDoc:u?(ct,dn)=>u(dn):void 0}),tn=Yn({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:xe,match_count:ge(xe),empty:`${U()} \uC644\uB8CC \uC5C6\uC74C`,header_control:je(),collapsible:!0,collapsed:M.isCollapsed("done"),preview:Q?Array.isArray(y.token_total)?y.token_total.map(ct=>ct.label).join(" \xB7 "):y.token_total||H_(xe):void 0});return Q?c`<div class="worker-lanes worker-lanes--mobile">
          ${Ni({live:x($),running_body:Qe.length>0?Xt($):"",pr_wait_rows:qe.map(ct=>qn(ct)),count:Qe.length+qe.length})}
          ${Yn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:le,count:le.length,match_count:ge(le),collapsible:!0,collapsed:M.isCollapsed("queue"),preview:H_(le),body:Gt($)})}
          ${Rt} ${tn}
        </div>
        ${Ro(ie,Se())}`:c`<div class="worker-lanes">
        ${Rt}
        ${Yn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:le,count:le.length,match_count:ge(le),collapsible:!0,collapsed:M.isCollapsed("queue"),body:Gt($)})}
        ${Yn({id:"worker-pane-running",lane:"running",title:"\uC2E4\uD589 \uC911",items:Qe,match_count:ge(Qe),header_control:c`<span class="worker-pane__meta"
            >슬롯 ${y.slots}</span
          >`,live:x($),collapsible:!0,collapsed:M.isCollapsed("running"),body:Xt($)})}
        ${Yn({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:qe,match_count:ge(qe),empty:"PR \uB300\uAE30 \uC5C6\uC74C",collapsible:!0,collapsed:M.isCollapsed("pr_wait")})}
        ${tn}
      </div>
      ${Ro(ie,Se())}`}function Ce($){M.toggle($),p()}function m($){M.toggleArea($),p()}function _($){let y=Date.now();if(!$.queue.some(le=>Pi(le.added_at,y)>0)){T();return}k===null&&(k=window.setInterval(()=>{try{p()}catch{}},cw))}function T(){k!==null&&(window.clearInterval(k),k=null)}function p(){let $=W();_($),Ft($),dt(S($),Le),dt(O($),oe),ya(oe)}function b(){let $=!0,y=pa(R=>{if(Q=R,$){$=!1;return}p()});Z.push(y)}function D($){g=$,dw($),p()}function X($){if($==="custom"){F=!0,p();return}q=Xr($),dc(q),F=!1,p()}function fe($){q=Xr({chain:$}),dc(q),p()}function st($){H=zn($),fw(H),f?.(H),p()}function xt($){let y=$.target;if(ie){let ct=ha(ie,y,Se());if(ct){ct!==ie&&(ie=ct,p());return}}let R=y?.closest?.(".worker-serial-lane-count");if(R){let ct=Number.parseInt(R.value,10);Number.isFinite(ct)&&j(ct).then(p);return}let le=$.target?.closest?.(".worker-filter__blocked");if(le){D({...g,show_blocked:le.checked});return}let xe=$.target?.closest?.(".worker-sort-chain__key");if(xe){let ct=Number.parseInt(xe.getAttribute("data-step")||"",10);Number.isFinite(ct)&&fe(A_(Ds(q),ct,xe.value));return}let qe=$.target?.closest?.(".worker-done-range");if(qe){st(qe.value);return}let Qe=$.target?.closest?.(".worker-sort");if(Qe){X(Qe.value);return}let Rt=$.target?.closest?.(".worker-slots__input");if(!Rt)return;let tn=Number.parseInt(Rt.value,10);if(!Number.isFinite(tn)){p();return}A(tn).then(p)}function _n($){return $?{runner:$.runner||void 0,model:$.model||void 0,effort:$.effort||void 0,worktree:$.worktree||void 0,status:$.status||void 0,session_id:$.session_id||void 0}:{}}function hn(){let $=$e(W()),y=Se().workspace_info,R=y&&typeof y=="object"&&y.repo_ops&&typeof y.repo_ops=="object"?y.repo_ops:null;return{operations:$.repo_operations,cleanup_failures:$.cleanup_failures,repo:l&&l()||"",repo_ops:R}}function ln(){Re&&Fe.close(),J.hidden=!1,Ge.hidden=!1,Ye.open(hn()),p()}function Yt($){let y=Se(),R=y.attempts?y.attempts[$]:null;Re=$,Ye.close(),J.hidden=!0,Ge.hidden=!1,Fe.open({attempt_id:$,meta:_n(R)}),p()}function cn($){let y=Se(),R=(Array.isArray(y.session_active)?y.session_active:[]).find(xe=>xe&&xe.bead_id===$),le=(R&&Array.isArray(R.session_refs)?R.session_refs:[]).find(xe=>xe&&xe.current===!0);le&&(Ye.close(),J.hidden=!0,Ge.hidden=!1,Fe.open(uo(le,$,"in_progress")),p())}function en(){if(Ye.isOpen()&&Ye.refresh(hn()),!Re)return;let $=Se(),y=$.attempts?$.attempts[Re]:null;if(y){Fe.updateMeta(_n(y));return}Fe.close()}function Zr($,y){if($.length===0||!s)return;let R=l?l():void 0;if(y.length===0||!R||y===R||!a){s($);return}Promise.resolve(a(y)).then(()=>{s($)}).catch(()=>{me("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})}function Tr($){let y=$.target;if(y?.closest?.(".provider-resume-dialog__cancel")){at();return}if(y?.closest?.(".provider-resume-dialog__confirm")){ze();return}if(y?.closest?.(".provider-resume-dialog")||y?.closest?.(".worker-mini__grip"))return;let R=y?.closest?.(".worker-sort-chain__dir");if(R){let ce=Number.parseInt(R.getAttribute("data-step")||"",10);Number.isFinite(ce)&&fe(S_(Ds(q),ce));return}let le=y?.closest?.(".worker-dep__open");if(le){Zr(le.getAttribute("data-dep-id")||"",le.getAttribute("data-root-dir")||"");return}let xe=y?.closest?.(".judgement-chip");if(xe){let ce=xe.closest("[data-bead-id]"),it=ce&&ce.getAttribute("data-bead-id")||"",Vt=xe.getAttribute("data-chip-key")||"";it&&Vt&&z.toggle({bead_id:it,chip_key:Vt});return}if(y?.closest?.(".chip-popover"))return;if(y?.closest?.(".worker-repo-strip")){ln();return}let qe=y?.closest?.(".worker-repo-op__dismiss");if(qe){Ne(qe.dataset.operationId||"");return}let Qe=y?.closest?.(".worker-cleanup__resume");if(Qe){let ce=Qe.dataset.beadId;ce&&Pe(ce);return}let Rt=y?.closest?.(".worker-cleanup__resolve");if(Rt){let ce=Rt.dataset.beadId;ce&&tt(ce);return}if(y?.closest?.(".worker-hold__retry")){$t("worker-queue-hold-retry-now","\uC9C0\uAE08 \uC7AC\uC2DC\uB3C4 \uAC70\uBD80");return}if(y?.closest?.(".worker-hold__resume")){$t("worker-queue-hold-resume","\uC7AC\uAC1C \uAC70\uBD80");return}if(y?.closest?.(".worker-play")){ot(!Se().auto_advance);return}let tn=y?.closest?.(".worker-merge-all");if(tn){tn.classList.contains("worker-merge-all--stop")?Se().auto_merge===!0?ue(!1):Ke():ue(!0);return}let ct=y?.closest?.(".worker-pane__toggle[data-lane]");if(ct){let ce=ct.dataset.lane;(ce==="candidate"||ce==="queue"||ce==="running"||ce==="pr_wait"||ce==="done")&&Ce(ce);return}let dn=y?.closest?.(".worker-wait__area-toggle[data-area]");if(dn){let ce=dn.dataset.area;(ce==="parallel"||ce==="serial")&&m(ce);return}let xn=y?.closest?.(".worker-card__place-lane");if(xn){let ce=xn.dataset.beadId,it=xn.dataset.lane;ce&&(it==="parallel"||/^s[1-5]$/.test(it||""))&&(E=null,p(),pt(ce,it));return}if(y?.closest?.(".worker-card__place-cancel")){E=null,p();return}let Wn=y?.closest?.(".worker-card__place");if(Wn){let ce=Wn.dataset.beadId;ce&&!Wn.disabled&&(ns(Se())?(E=ce,p()):pt(ce,"parallel"));return}let Vn=y?.closest?.(".worker-filter__route");if(Vn){let ce=Vn.dataset.route||"";ce&&D({...g,routes:zi(g.routes,ce)});return}let Qn=y?.closest?.(".worker-filter__chip");if(Qn){let ce=Qn.dataset.readiness;(ce==="all"||ce==="ready"||ce==="not_ready")&&D({...g,readiness:ce});return}let Xn=y?.closest?.('[data-action="queue-start-now"]');if(Xn){qt(Xn.dataset.beadId||"");return}let un=y?.closest?.('[data-action="queue-remove"]');if(un){let ce=un.dataset.beadId||"";ce&&_e.sendOp({type:"worker-queue-remove",payload:{bead_id:ce},root_dir:St()},ce);return}let Zn=y?.closest?.(".worker-mini__merge");if(Zn){let ce=Zn.dataset.beadId||"";Se().cleanup_failed?.[ce]?Pe(ce):Ze(ce);return}let ur=y?.closest?.(".worker-mini__merge-cancel");if(ur){he(ur.dataset.beadId||"");return}let dr=y?.closest?.(".worker-mini__resolve");if(dr){tt(dr.dataset.beadId||"");return}let Rr=y?.closest?.(".rtile__resolve");if(Rr){let ce=Rr.closest(".rtile");tt(ce?.dataset.beadId||"");return}let He=y?.closest?.(".worker-mini__discard"),Bt=y?.closest?.(".worker-mini__discard-abandon");if(Bt){Je(Bt.dataset.beadId||"",Bt.dataset.operationId||"",{kind:Bt.dataset.operationKind||"",last_error:Bt.dataset.lastError||""});return}if(He){nt(He.dataset.beadId||"",He.dataset.attemptId||null,He.dataset.discardMode==="merged"?"merged":"unmerged",He.dataset.operationId||null);return}let En=y?.closest?.(".worker-mini__stale-continue");if(En){ut("worker-stale-work-continue",En.dataset.beadId||"",En.dataset.actionId||"");return}let Io=y?.closest?.(".worker-mini__stale-backup");if(Io){ut("worker-stale-work-backup-fresh",Io.dataset.beadId||"",Io.dataset.actionId||"");return}let Lo=y?.closest?.(".worker-mini__stale-recheck");if(Lo){ut("worker-stale-work-recheck",Lo.dataset.beadId||"",Lo.dataset.actionId||"");return}let Ns=y?.closest?.(".worker-mini__revise-fix");if(Ns){ft("worker-revise-fix",Ns.dataset.beadId||"");return}let js=y?.closest?.(".worker-mini__revise-approve");if(js){ft("worker-revise-approve",js.dataset.beadId||"");return}if(y?.closest?.(".worker-mini__pr"))return;let rt=y?.closest?.(".rtile__failure-badge");if(rt){let ce=rt.dataset.attemptId||"";C=C===ce?null:ce,p();return}let v=y?.closest?.(".rtile__provider-hold-badge");if(v){let ce=v.dataset.attemptId||"";te=te===ce?null:ce,p();return}let L=y?.closest?.(".rtile__attempt-copy");if(L){let ce=L.dataset.attemptId||"";ce&&yn(ce).then(it=>{me(it?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",it?"success":"error",1400)});return}let N=y?.closest?.(".rtile__discard-abandon");if(N){let it=y?.closest?.(".rtile")?.dataset?.beadId;it&&Je(it,N.dataset.operationId||"",{kind:N.dataset.operationKind||"",last_error:N.dataset.lastError||""});return}let ke=y?.closest?.(".rtile__discard");if(ke){let ce=y?.closest?.(".rtile"),it=ce?.dataset?.beadId,Vt=ce?.dataset?.attemptId;it&&nt(it,Vt||null,ke.dataset.confirmation==="merged"?"merged":"unmerged",ke.dataset.operationId||null);return}if(y?.closest?.(".rtile__pause")){let it=y?.closest?.(".rtile")?.dataset?.attemptId;it&&se(it);return}if(y?.closest?.(".rtile__resume-alternate")){let it=y?.closest?.(".rtile")?.dataset?.attemptId;it&&ht(it);return}if(y?.closest?.(".rtile__resume")){let ce=y?.closest?.(".rtile__resume"),Vt=y?.closest?.(".rtile")?.dataset?.attemptId;Vt&&Me(Vt,ce?.dataset?.resumeKind==="settlement"?"settlement":"session");return}if(y?.closest?.(".rtile__session")){let ce=y?.closest?.(".rtile"),it=ce?.dataset?.attemptId;if(it){Yt(it);return}let Vt=ce?.dataset?.beadId;Vt&&cn(Vt);return}if(y?.closest?.(".rtile__failure-pop"))return;if(y?.closest?.(".worker-drawer-overlay__backdrop")){Ye.close(),Fe.close();return}if(y?.closest?.(".worker-drawer-host"))return;let We=y?.closest?.(".rtile .board-card__roll-toggle");if(We){let ce=We.dataset.rollParent;ce&&(Y.has(ce)?Y.delete(ce):Y.add(ce),p());return}let lt=y?.closest?.(".rtile .board-card__roll-child");if(lt){let ce=lt.dataset.childId;ce&&s&&s(ce);return}let Pt=y?.closest?.(".rtile");if(Pt){if(y?.closest?.(".rtile__id")){let it=Pt.dataset.beadId;it&&yn(it).then(Vt=>{Vt?me("\uBCF5\uC0AC\uB428","success",1200):me("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let ce=Pt.dataset.beadId;ce&&s&&s(ce);return}let mt=y?.closest?.(".worker-mini, .worker-card");if(mt){let ce=mt.dataset.beadId;if(y?.closest?.('[data-seam="log-path-copy"]'))return;if(y?.closest?.(".worker-mini__id, .worker-card__id")){ce&&yn(ce).then(Vt=>{Vt?me("\uBCF5\uC0AC\uB428","success",1200):me("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let it=y?.closest?.(".ctl-chip--from");if(it){let Vt=it.dataset.fromId;Vt&&s&&s(Vt);return}ce&&s&&s(ce)}}function Ps($){let y=$.target;y?.closest?.(".worker-search")&&(B=y.value,p())}function Ea($){let y=$.target;$.key!=="Escape"||!y?.closest?.(".worker-search")||B.length===0||(B="",p())}_e.attach(e),e.addEventListener("click",Tr),e.addEventListener("change",xt),e.addEventListener("input",Ps),e.addEventListener("keydown",Ea);function Ms($){let y=$.target,R=y&&typeof y.closest=="function"?xe=>y.closest(xe):()=>null,le=!1;C&&!R(".rtile__failure-pop, .rtile__failure-badge")&&(C=null,le=!0),te&&!R(".rtile__provider-hold-pop, .rtile__provider-hold-badge")&&(te=null,le=!0),le&&p()}function qs($){$.key==="Escape"&&(C===null&&te===null&&ie===null||(C=null,te=null,ie=null,p()))}return document.addEventListener("click",Ms),document.addEventListener("keydown",qs),z.attach(),Z.push(()=>{document.removeEventListener("click",Ms),document.removeEventListener("keydown",qs),z.detach()}),b(),h&&Z.push(h.subscribe(()=>{be.notifyIssuesChanged(),p()})),o&&Z.push(o.subscribe(()=>{let $=l&&l()||"";$!==ee&&(ee=$,Be.close()),p(),en()})),p(),{load(){be.ensureSessionDefaults(),p()},refreshSessionDefaults:Ie,destroy(){T();for(let $ of Z.splice(0))try{$()}catch{}_e.detach(),e.removeEventListener("click",Tr),e.removeEventListener("change",xt),be.destroy();try{Fe.destroy()}catch{}Ge.hidden=!0;try{Be.destroy()}catch{}dt(c``,e)}}}function gc(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function V_(e,t,n,r=async()=>{},o=async()=>{}){let i=Ut("views:workspace-picker"),s=null,l=!1,a=!1,u=!1;async function d(q){let H=q.target.value,M=t.getState().workspace?.current?.path||"";if(H&&H!==M){i("switching workspace to %s",H),l=!0,I();try{await n(H)}catch(Q){i("workspace switch failed: %o",Q)}finally{l=!1,I()}}}async function f(){let q=t.getState(),F=q.workspace?.current?.path||q.workspace?.available?.[0]?.path||"";if(!(!F||a)){i("git-pulling workspace %s",F),a=!0,I();try{await r(F)}catch(H){i("workspace git pull failed: %o",H)}finally{a=!1,I()}}}function h(q){let F=q.target;F&&e.contains(F)||E()}function g(q){q.key==="Escape"&&E()}function k(){u||(u=!0,document.addEventListener("mousedown",h),document.addEventListener("keydown",g),I())}function E(){u&&(u=!1,document.removeEventListener("mousedown",h),document.removeEventListener("keydown",g),I())}function C(){u?E():k()}async function te(q){let F=q.target,H=F.value,U=F.checked;i("toggling visibility %s \u2192 %s",H,String(U));try{await o(H,U)}catch(M){i("workspace visibility toggle failed: %o",M)}}function ie(q){return q?c`
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
    `:c``}function z(q,F){return c`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${C}
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
                ${q.map(H=>c`
                    <label
                      class="workspace-picker__manage-row"
                      title="${H.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${H.path}"
                        .checked=${!F.has(H.path)}
                        @change=${te}
                      />
                      <span class="workspace-picker__manage-name"
                        >${gc(H.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function P(){let q=t.getState(),F=q.workspace?.current,H=q.workspace?.available||[],U=new Set(q.workspace?.hidden||[]),M=F?.path||H[0]?.path||"";if(H.length===0)return c``;let Q=H.filter(B=>!U.has(B.path)||B.path===M);if(Q.length<=1){let B=Q[0]||H[0],ne=gc(B.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${B.path}"
            >${ne}</span
          >
          ${z(H,U)}
          ${ie(M)}
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
          ${Q.map(B=>c`
              <option
                value="${B.path}"
                ?selected=${B.path===M}
                title="${B.path}"
              >
                ${gc(B.path)}
              </option>
            `)}
        </select>
        ${z(H,U)}
        ${ie(M)}
        ${l||a?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function I(){dt(P(),e)}return I(),s=t.subscribe(()=>I()),{destroy(){s&&(s(),s=null),document.removeEventListener("mousedown",h),document.removeEventListener("keydown",g),dt(c``,e)}}}var Q_=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","get-workspace-accounts","set-workspace-accounts","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-provider-auto-switch-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-dismiss","worker-repo-operation-deploy-run","worker-queue-set-slots","worker-queue-set-serial-lane-count","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-queue-arm","worker-queue-disarm","worker-queue-start-now","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-cleanup-retry","worker-resolve-in-session","worker-queue-hold-resume","worker-queue-hold-retry-now","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-discard-abandon","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-bead-timeline","get-worker-system-prompt","get-session-refs","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove","monitor-lane-provenance"];function hc(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function X_(e,t,n=hc()){return{id:n,type:e,payload:t}}function Z_(e={}){let t=Ut("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",o=null,i="closed",s=0,l=null,a=!0,u=new Map,d=[],f=new Map,h=new Set;function g(P){for(let I of Array.from(h))try{I(P)}catch{}}function k(){if(!a||l)return;i="reconnecting",t("ws reconnecting\u2026"),g(i);let P=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,s)),I=(n.jitterRatio||0)*P,q=Math.max(0,Math.round(P+(Math.random()*2-1)*I));t("ws retry in %d ms (attempt %d)",q,s+1),l=setTimeout(()=>{l=null,z()},q)}function E(P){try{o?.send(JSON.stringify(P))}catch(I){t("ws send failed",I)}}function C(){for(i="open",t("ws open"),g(i),s=0;d.length;){let P=d.shift();P&&E(P)}}function te(P){let I;try{I=JSON.parse(String(P.data))}catch{t("ws received non-JSON message");return}if(!I||typeof I.id!="string"||typeof I.type!="string"){t("ws received invalid envelope");return}if(u.has(I.id)){let F=u.get(I.id);u.delete(I.id),I.ok?F?.resolve(I.payload):F?.reject(I.error||new Error("ws error"));return}let q=f.get(I.type);if(q&&q.size>0)for(let F of Array.from(q))try{F(I.payload)}catch(H){t("ws event handler error",H)}else t("ws received unhandled message type: %s",I.type)}function ie(){i="closed",t("ws closed"),g(i);for(let[P,I]of u.entries())I.reject(new Error("ws disconnected")),u.delete(P);s+=1,k()}function z(){if(!a)return;let P=r();try{o=new WebSocket(P),t("ws connecting %s",P),i="connecting",g(i),o.addEventListener("open",C),o.addEventListener("message",te),o.addEventListener("error",()=>{}),o.addEventListener("close",ie)}catch(I){t("ws connect failed %o",I),k()}}return z(),{send(P,I){if(!Q_.includes(P))return Promise.reject(new Error(`unknown message type: ${P}`));let q=hc(),F=X_(P,I,q);return t("send %s id=%s",P,q),new Promise((H,U)=>{u.set(q,{resolve:H,reject:U,type:P}),o&&o.readyState===o.OPEN?E(F):(t("queue %s id=%s (state=%s)",P,q,i),d.push(F))})},on(P,I){f.has(P)||f.set(P,new Set);let q=f.get(P);return q?.add(I),()=>{q?.delete(I)}},onConnection(P){return h.add(P),()=>{h.delete(P)}},reconnect(){a=!0,l&&(clearTimeout(l),l=null),s=0,z()},close(){a=!1,l&&(clearTimeout(l),l=null);try{o?.close()}catch{}},getState(){return i}}}function Cw(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function Rw(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var bc=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],J_=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],Sr="tab:worker:closed",Ow="bdui.worker.done-range",em=Zf,tm="worker:queue",nm="ui:order",rm="ui:display-policy",om="exec:presets",Er="tab:board:closed",sm="beads-ui.board.closed-range";function Iw(e){if(!e)return()=>{};function t(r){document.documentElement.style.setProperty("--app-header-h",`${Math.round(r)}px`)}if(t(e.getBoundingClientRect().height),typeof ResizeObserver!="function")return()=>{};let n=new ResizeObserver(r=>{for(let o of r)t(o.contentRect.height+Lw(e))});return n.observe(e),()=>n.disconnect()}function Lw(e){let t=getComputedStyle(e);return[t.paddingTop,t.paddingBottom,t.borderTopWidth,t.borderBottomWidth].reduce((r,o)=>r+(parseFloat(o)||0),0)}function Dw(e){let t=Ut("main");t("bootstrap start"),Iw(document.querySelector(".app-header"));let n=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;dt(n,e);let r=document.getElementById("global-nav"),o=document.getElementById("top-nav"),i=document.getElementById("repo-scope"),s=document.getElementById("usage-meter"),l=document.getElementById("board-root"),a=document.getElementById("worker-root"),u=document.getElementById("monitor-root"),d=document.getElementById("detail-panel");if(s&&b_(s),l&&a&&u&&d){let Z=function(p,b){let D="Request failed",X="";if(p&&typeof p=="object"){let st=p;if(typeof st.message=="string"&&st.message.length>0&&(D=st.message),typeof st.details=="string")X=st.details;else if(st.details&&typeof st.details=="object")try{X=JSON.stringify(st.details,null,2)}catch{X=""}}else typeof p=="string"&&p.length>0&&(D=p);let fe=b&&b.length>0?`Failed to load ${b}`:"Request failed";ae.open(fe,D,X)},Se=function(p){return`${Ae.getState().workspace.current?.path||""}\0${p}`},ht=function(){Ee&&(Ee().catch(()=>{}),Ee=null),_e=null,Re=null},ze=function(p){Fe=p;let b=()=>{Fe!==p||Ae.getState().selected_id!==p||(Fe=null,at(p))};if(!ee){Be.then(b);return}b()},Ve=function(p,b,D,X,fe){return D!==pt[b]?(fe().catch(()=>{}),!1):(p.set(X,fe),!0)},se=function(){let p=Ae.getState();tt(p.view==="board"),Ke(p.view==="worker"),Ne(ot(p)),Je(p.view==="board"||p.view==="worker"||w||!!p.selected_id)},Ze=function(){let p=Mr(Me);return p===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:p}}},Pe=function(){let p=Mr(Ue);return p===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:p}}},tt=function(p){if(p)for(let[b,D]of bc){if(et.has(b)||St.has(b))continue;let X=b===Er?Ze():{type:D};try{Le.register(b,X)}catch(xt){t("register %s store failed: %o",b,xt)}St.add(b);let fe=pt.board,st=!1;ye.subscribeList(b,X).then(xt=>{st=!Ve(et,"board",fe,b,xt)}).catch(xt=>{t("subscribe %s failed: %o",b,xt),Z(xt,"board")}).finally(()=>{St.delete(b),st&&se()})}else Dt()},Dt=function(){pt.board+=1;for(let[p]of bc){let b=et.get(p);b&&(b().catch(()=>{}),et.delete(p));try{Le.unregister(p)}catch(D){t("unregister %s failed: %o",p,D)}}},Ke=function(p){if(!p){nt();return}for(let[b,D]of J_){if(ue.has(b)||St.has(b))continue;let X=b===Sr?Pe():{type:D};try{Le.register(b,X)}catch(xt){t("register %s store failed: %o",b,xt)}St.add(b);let fe=pt.worker,st=!1;ye.subscribeList(b,X).then(xt=>{st=!Ve(ue,"worker",fe,b,xt)}).catch(xt=>{t("subscribe %s failed: %o",b,xt),Z(xt,"worker")}).finally(()=>{St.delete(b),st&&se()})}},nt=function(){pt.worker+=1;for(let[p]of J_){let b=ue.get(p);b&&(b().catch(()=>{}),ue.delete(p));try{Le.unregister(p)}catch(D){t("unregister %s failed: %o",p,D)}}},Je=function(p){if(!p){ut();return}he||(Ie("subscribe-worker-queue",{id:tm}).catch(b=>{t("subscribe-worker-queue failed: %o",b)}),he=()=>Ie("unsubscribe-worker-queue",{id:tm}))},ut=function(){he&&(he().catch(()=>{}),he=null)},ot=function(p){return p.view==="monitor"||p.selected_id!=null},Ne=function(p){if(!p){A();return}ft||(Ie("subscribe-monitor-pipeline",{id:em}).catch(b=>{t("subscribe-monitor-pipeline failed: %o",b)}),ft=()=>Ie("unsubscribe-monitor-pipeline",{id:em}))},A=function(){ft&&(ft().catch(()=>{}),ft=null)},W=function(){j||(Ie("subscribe-ui-order",{id:nm}).catch(p=>{t("subscribe-ui-order failed: %o",p)}),j=()=>Ie("unsubscribe-ui-order",{id:nm}))},$e=function(){j&&(j().catch(()=>{}),j=null),V.clear()},_t=function(){we||(Ie("subscribe-display-policy",{id:rm}).catch(p=>{t("subscribe-display-policy failed: %o",p)}),we=()=>Ie("unsubscribe-display-policy",{id:rm}))},kt=function(){we&&(we().catch(()=>{}),we=null),J.clear()},Tt=function(){vt||(Ie("subscribe-impl-presets",{id:om}).catch(p=>{t("subscribe-impl-presets failed: %o",p)}),vt=()=>Ie("unsubscribe-impl-presets",{id:om}))},Kt=function(p){if(!p)return"Unknown";let b=p.split("/").filter(Boolean);return b.length>0?b[b.length-1]:"Unknown"},Xt=function(p,b){Gt.open(p.path,{missing_state:p.missing_state,...b?{workspace:b}:{}})};var f=Z,h=Se,g=ht,k=ze,E=Ve,C=se,te=Ze,ie=Pe,z=tt,P=Dt,I=Ke,q=nt,F=Je,H=ut,U=ot,M=Ne,Q=A,B=W,ne=$e,ge=_t,Oe=kt,K=Tt,re=Kt,pe=Xt;let Te=document.getElementById("header-loading"),Y=au(Te),ae=$f(e),be=Z_(),Ie=Y.wrapSend((p,b)=>be.send(p,b)),ye=eu(Ie),Le=tu(),Ge=ru(),gt=Lc(),V=nu(),J=Oc(),oe=Ic(),de=Dc();be.on("impl-presets-snapshot",p=>{let b=p;b&&typeof b.revision=="number"&&Array.isArray(b.presets)&&oe.set({revision:b.revision,presets:b.presets})}),be.on("monitor-pipeline-snapshot",p=>{let b=p;if(!(!b||!Array.isArray(b.workspaces)))try{gt.set(b.workspaces,b.workspaces_state,b.cross_lanes)}catch{}}),be.on("ui-order-snapshot",p=>{let b=p;if(b&&typeof b.revision=="number")try{V.set({revision:b.revision,order:b.order&&typeof b.order=="object"?b.order:{}})}catch{}}),be.on("display-policy-snapshot",p=>{let b=p;if(b&&b.policy&&typeof b.policy=="object")try{J.set(b.policy)}catch{}}),be.on("session-log-snapshot",p=>{let b=p;if(b&&typeof b.id=="string")try{de.set(b.id,Array.isArray(b.lines)?b.lines:[],typeof b.last_event_at=="number"?b.last_event_at:null)}catch{}}),be.on("session-log-append",p=>{let b=p;if(b&&typeof b.id=="string")try{de.append(b.id,b.event)}catch{}}),be.on("snapshot",p=>{let b=p,D=b&&typeof b.id=="string"?b.id:"",X=D?Le.getStore(D):null;if(X&&b&&b.type==="snapshot")try{X.applyPush(b)}catch{}}),be.on("upsert",p=>{let b=p,D=b&&typeof b.id=="string"?b.id:"",X=D?Le.getStore(D):null;if(X&&b&&b.type==="upsert")try{X.applyPush(b)}catch{}}),be.on("delete",p=>{let b=p,D=b&&typeof b.id=="string"?b.id:"",X=D?Le.getStore(D):null;if(X&&b&&b.type==="delete")try{X.applyPush(b)}catch{}});let Ee=null,_e=null,Re=null,Fe=null,Ye=()=>{},Be=new Promise(p=>{Ye=()=>p(void 0)}),ee=!1,G=!1;async function at(p){let b=Se(p);if(b===_e||b===Re)return;Re=b;let D=`detail:${p}`,X={type:"issue-detail",params:{id:p}};try{Le.register(D,X)}catch(fe){t("register detail store failed: %o",fe)}try{let fe=await ye.subscribeList(D,X);if(Ae.getState().selected_id!==p||Se(p)!==b){await fe().catch(()=>{});return}Ee&&await Ee().catch(()=>{}),Ee=fe,_e=b}catch(fe){t("detail subscribe failed: %o",fe),Z(fe,"issue details")}finally{Re===b&&(Re=null)}}let et=new Map,St=new Set,pt={board:0,worker:0},w=!1,Me=Gs;try{let p=window.localStorage.getItem(sm);Pa(p)&&(Me=p)}catch{}let Ue="today";try{let p=window.localStorage.getItem(Ow);p!==null&&(Ue=zn(p))}catch{}async function $t(p){if(!Pa(p)||p===Me)return;Me=p;try{window.localStorage.setItem(sm,p)}catch{}let b=et.get(Er);if(!b)return;et.delete(Er),await b().catch(()=>{});let D=Ze();try{Le.register(Er,D)}catch(X){t("register %s store failed: %o",Er,X)}try{let X=await ye.subscribeList(Er,D);et.set(Er,X)}catch(X){t("re-subscribe %s failed: %o",Er,X),Z(X,"board")}}async function qt(p){let b=zn(p);if(b===Ue)return;Ue=b;let D=ue.get(Sr);if(!D)return;ue.delete(Sr),await D().catch(()=>{});let X=Pe();try{Le.register(Sr,X)}catch(fe){t("register %s store failed: %o",Sr,fe)}try{let fe=await ye.subscribeList(Sr,X);ue.set(Sr,fe)}catch(fe){t("re-subscribe %s failed: %o",Sr,fe),Z(fe,"worker")}}let ue=new Map,he=null,ft=null,j=null,we=null,vt=null;async function Wt(){we=null,J.clear(),vt=null,oe.clear(),he=null,ft=null,et.clear(),ue.clear(),pt.board+=1,pt.worker+=1,Tt();let p=Ae.getState().workspace.current?.path;if(p)try{await be.send("set-workspace",{path:p})}catch(D){t("workspace restore after reconnect failed: %o",D);return}_t();let b=Ae.getState();tt(b.view==="board"),Ke(b.view==="worker"),Ne(ot(b)),Je(b.view==="board"||b.view==="worker"||!!b.selected_id)}async function Ht(){t("clearing all subscriptions for workspace switch"),Dt(),nt(),ut(),Ge.clear(),$e(),W(),kt(),_t(),ht();let p=Ae.getState();if(p.selected_id)try{Le.unregister(`detail:${p.selected_id}`)}catch{}let b=Ae.getState();tt(b.view==="board"),Ke(b.view==="worker"),Ne(ot(b)),Je(b.view==="board"||b.view==="worker"||!!b.selected_id),b.selected_id&&ze(b.selected_id)}async function Nt(p){t("requesting workspace switch to %s",p),G=!0;try{let b=await be.send("set-workspace",{path:p});t("workspace switch result: %o",b),b&&b.workspace&&(Ae.setState({workspace:{current:{path:b.workspace.root_dir,database:b.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",p),b.changed&&(await Ht(),me("Switched to "+Kt(p),"success",2e3)))}catch(b){throw t("workspace switch failed: %o",b),me("Failed to switch workspace","error",3e3),b}finally{G=!1}}async function wt(p){t("requesting workspace git pull for %s",p);try{let b=await be.send("git-pull-workspace",{});t("workspace git pull result: %o",b);let D=b?.status;if(D==="up_to_date"){me("Already up to date","success",2e3);return}if(D==="stash_pop_conflict"){me("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}me("Git pulled "+Kt(p),"success",2e3)}catch(b){t("workspace git pull failed: %o",b);let D=b?.code,X=b?.message;if(D==="rebase_conflict"){me("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(D==="rebase_conflict_abort_failed"){me("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(D==="busy"){me("Git pull skipped: another operation is running","warning",3e3);return}let fe=X?`: ${X}`:"";throw me(`Git pull failed${fe}`,"error",3e3),b}}async function Jt(p,b){t("setting workspace visibility %s \u2192 %s",p,String(b));try{await be.send("set-workspace-visibility",{path:p,visible:b}),await jt()}catch(D){t("workspace visibility update failed: %o",D),me("Failed to update project visibility","error",3e3)}}async function jt(){try{let p=await be.send("list-workspaces",{});if(t("workspaces loaded: %o",p),p&&Array.isArray(p.workspaces)){let b=p.workspaces.map(st=>({path:st.path,database:st.database,pid:st.pid,version:st.version})),D=p.current?{path:p.current.root_dir,database:p.current.db_path}:null,X=Array.isArray(p.hidden)?p.hidden.filter(st=>typeof st=="string"):[];Ae.setState({workspace:{current:D,available:b,hidden:X}});let fe=window.localStorage.getItem("beads-ui.workspace");fe&&(!b.some(xt=>xt.path===fe)||X.includes(fe)?window.localStorage.removeItem("beads-ui.workspace"):D&&fe!==D.path&&(t("restoring saved workspace preference: %s",fe),await Nt(fe)))}}catch(p){t("failed to load workspaces: %o",p)}}be.on("workspace-changed",p=>{t("workspace-changed event: %o",p),p&&p.root_dir&&(Ae.setState({workspace:{current:{path:p.root_dir,database:p.db_path}}}),jt(),Ht())});let Ft=!1;if(typeof be.onConnection=="function"){let p=b=>{t("ws state %s",b),b==="reconnecting"||b==="closed"?(Ft=!0,me("Connection lost. Reconnecting\u2026","error",4e3)):b==="open"&&Ft&&(Ft=!1,me("Reconnected","success",2200),Rw(Ae,(D,X)=>{t(`${D}: %o`,X)}),Wt())};be.onConnection(p)}let Qt="board";try{let p=window.localStorage.getItem("beads-ui.view");(p==="board"||p==="worker"||p==="monitor")&&(Qt=p)}catch(p){t("view parse error: %o",p)}let Ae=iu({config:Cw(),view:Qt});be.on("worker-queue-snapshot",p=>{let b=p;if(!b||!b.queue)return;let D=Ae.getState().workspace.current?.path;if(typeof D=="string"&&D.length>0&&b.root_dir!==D){t("dropping worker-queue snapshot for %s",String(b.root_dir));return}try{Ge.set(b.queue)}catch{}});let S=ou(Ae);S.start();let ve=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"]),De=async(p,b)=>{try{return await Ie(p,b)}catch(D){if(ve.has(p))throw D;return[]}};e_({global_element:r,repo_element:o},Ae,S);let bt=document.getElementById("workspace-picker");bt&&V_(bt,Ae,Nt,wt,Jt);let je=o_(e,(p,b)=>Ie(p,b));try{let p=document.getElementById("new-issue-btn");p&&p.addEventListener("click",()=>je.open())}catch{}let Et=l_(e,{policyStore:J,queueStore:Ge,implPresetStore:oe,transport:(p,b)=>Ie(p,b),onOpenChange:p=>{let b=w;w=p,se(),b&&p===!1&&O.refreshSessionDefaults()},labelOptions:()=>{let p=new Set;for(let[b]of bc)for(let D of Le.snapshotFor(b)||[]){let X=D.labels;if(Array.isArray(X))for(let fe of X)typeof fe=="string"&&fe.length>0&&p.add(fe)}return Array.from(p).sort()}});try{let p=document.getElementById("display-settings-btn");p&&(p.setAttribute("aria-label","\uC124\uC815"),p.setAttribute("title","\uC124\uC815"),p.addEventListener("click",()=>Et.open()))}catch{}let It=document.createElement("div");It.className="md-viewer-root",document.body.appendChild(It);let Gt=ua(It,{getWorkspacePath:()=>Ae.getState().workspace.current?.path}),x=$u(l,{gotoIssue:p=>S.gotoIssue(p),issueStores:Le,transport:De,workerQueueStore:Ge,uiOrderStore:V,displayPolicyStore:J,closedRange:Me,onClosedRangeChange:p=>{$t(p)},onNewIssue:()=>je.open(),openDoc:Xt}),O=mc(a,{transport:De,issueStores:Le,queueStore:Ge,sessionLogStore:de,gotoIssue:p=>Ae.setState({selected_id:p}),getWorkspacePath:()=>Ae.getState().workspace.current?.path,switchWorkspace:p=>Nt(p),openDoc:Xt,doneRange:Ue,onDoneRangeChange:p=>{qt(p)}}),Ce=Jf(u,{transport:De,pipelineStore:gt,execPresetStore:oe,sessionLogStore:de,router:S,gotoIssue:p=>S.gotoIssue(p),getWorkspacePath:()=>Ae.getState().workspace.current?.path,switchWorkspace:p=>Nt(p),openDoc:Xt}),m=wf(d,{issueStores:Le,transport:De,queueStore:Ge,execPresetStore:oe,sessionLogStore:de,getWorkspacePath:()=>Ae.getState().workspace.current?.path,mdViewer:Gt,depCandidates:()=>{let p=gt.get();if(p===null)return null;let b=gt.getWorkspacesState(),D=Ae.getState();if(D.view==="monitor")return Sl(p,b);let X=D.workspace.current?.path;return X?Sl(p,b,{root_dir:X}):null},subscribeCandidates:p=>gt.subscribe(p),onDepChanged:({type:p,a:b,b:D})=>{let X=Ce;p==="dep-add"&&X&&typeof X.recorrectSharedLane=="function"&&X.recorrectSharedLane(p,b,D)},onNavigate:(p,b)=>{let D=()=>{Ae.getState().view==="worker"?Ae.setState({selected_id:p}):S.gotoIssue(p)},X=Ae.getState().workspace.current?.path;if(typeof b!="string"||b.length===0||!X||b===X){D();return}Promise.resolve(Nt(b)).then(D).catch(()=>{me("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})},onClose:()=>{let p=Ae.getState();Ae.setState({selected_id:null});try{S.gotoView(p.view==="worker"||p.view==="monitor"?p.view:"board")}catch{}},onOpenExecPresets:()=>{Et.open("execution")}}),_=Ae.getState().selected_id;_&&(d.hidden=!1,m.load(_),ze(_)),Ae.subscribe(p=>{let b=p.selected_id;b?(d.hidden=!1,m.load(b),G||ze(b)):(m.clear(),d.hidden=!0,ht())});let T=p=>{l.hidden=p.view!=="board",a.hidden=p.view!=="worker",u.hidden=p.view!=="monitor",i&&i.classList.toggle("is-quiet",p.view==="monitor"),tt(p.view==="board"),Ke(p.view==="worker"),Ne(ot(p)),Je(p.view==="board"||p.view==="worker"||w||!!p.selected_id),!p.selected_id&&p.view==="board"&&x.load(),p.view==="worker"&&O.load(),p.view==="monitor"?Ce.load():Ce.pause(),window.localStorage.setItem("beads-ui.view",p.view)};Ae.subscribe(T),T(Ae.getState()),W(),_t(),Tt(),jt().finally(()=>{ee=!0,Ye()}),window.addEventListener("keydown",p=>{let b=p.ctrlKey||p.metaKey,D=String(p.key||"").toLowerCase(),X=p.target,fe=X&&X.tagName?String(X.tagName).toLowerCase():"",st=fe==="input"||fe==="textarea"||fe==="select"||X&&typeof X.isContentEditable=="boolean"&&X.isContentEditable;b&&D==="n"&&(st||(p.preventDefault(),je.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,o=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",o);let i=document.getElementById("theme-switch");i&&(i.checked=o==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&Dw(t)});export{Dw as bootstrap,Cw as readBootstrapConfig,Rw as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
