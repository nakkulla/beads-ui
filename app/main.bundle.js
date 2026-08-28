var If=Object.create;var Mi=Object.defineProperty;var Mf=Object.getOwnPropertyDescriptor;var Pf=Object.getOwnPropertyNames;var Df=Object.getPrototypeOf,Nf=Object.prototype.hasOwnProperty;var qf=(e,t,n)=>t in e?Mi(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Pi=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Ff=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of Pf(t))!Nf.call(e,o)&&o!==n&&Mi(e,o,{get:()=>t[o],enumerable:!(r=Mf(t,o))||r.enumerable});return e};var jf=(e,t,n)=>(n=e!=null?If(Df(e)):{},Ff(t||!e||!e.__esModule?Mi(n,"default",{value:e,enumerable:!0}):n,e));var Rt=(e,t,n)=>qf(e,typeof t!="symbol"?t+"":t,n);var Ml=Pi((Nv,Il)=>{var Ir=1e3,Mr=Ir*60,Pr=Mr*60,br=Pr*24,Wf=br*7,zf=br*365.25;Il.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return Hf(e);if(n==="number"&&isFinite(e))return t.long?Kf(e):Gf(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function Hf(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*zf;case"weeks":case"week":case"w":return n*Wf;case"days":case"day":case"d":return n*br;case"hours":case"hour":case"hrs":case"hr":case"h":return n*Pr;case"minutes":case"minute":case"mins":case"min":case"m":return n*Mr;case"seconds":case"second":case"secs":case"sec":case"s":return n*Ir;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function Gf(e){var t=Math.abs(e);return t>=br?Math.round(e/br)+"d":t>=Pr?Math.round(e/Pr)+"h":t>=Mr?Math.round(e/Mr)+"m":t>=Ir?Math.round(e/Ir)+"s":e+"ms"}function Kf(e){var t=Math.abs(e);return t>=br?fs(e,t,br,"day"):t>=Pr?fs(e,t,Pr,"hour"):t>=Mr?fs(e,t,Mr,"minute"):t>=Ir?fs(e,t,Ir,"second"):e+" ms"}function fs(e,t,n,r){var o=t>=n*1.5;return Math.round(e/n)+" "+r+(o?"s":"")}});var Dl=Pi((qv,Pl)=>{function Yf(e){n.debug=n,n.default=n,n.coerce=a,n.disable=i,n.enable=o,n.enabled=l,n.humanize=Ml(),n.destroy=u,Object.keys(e).forEach(d=>{n[d]=e[d]}),n.names=[],n.skips=[],n.formatters={};function t(d){let p=0;for(let b=0;b<d.length;b++)p=(p<<5)-p+d.charCodeAt(b),p|=0;return n.colors[Math.abs(p)%n.colors.length]}n.selectColor=t;function n(d){let p,b=null,m,$;function C(...j){if(!C.enabled)return;let K=C,ie=Number(new Date),ee=ie-(p||ie);K.diff=ee,K.prev=p,K.curr=ie,p=ie,j[0]=n.coerce(j[0]),typeof j[0]!="string"&&j.unshift("%O");let F=0;j[0]=j[0].replace(/%([a-zA-Z%])/g,(L,z)=>{if(L==="%%")return"%";F++;let V=n.formatters[z];if(typeof V=="function"){let ne=j[F];L=V.call(K,ne),j.splice(F,1),F--}return L}),n.formatArgs.call(K,j),(K.log||n.log).apply(K,j)}return C.namespace=d,C.useColors=n.useColors(),C.color=n.selectColor(d),C.extend=r,C.destroy=n.destroy,Object.defineProperty(C,"enabled",{enumerable:!0,configurable:!1,get:()=>b!==null?b:(m!==n.namespaces&&(m=n.namespaces,$=n.enabled(d)),$),set:j=>{b=j}}),typeof n.init=="function"&&n.init(C),C}function r(d,p){let b=n(this.namespace+(typeof p>"u"?":":p)+d);return b.log=this.log,b}function o(d){n.save(d),n.namespaces=d,n.names=[],n.skips=[];let p=(typeof d=="string"?d:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let b of p)b[0]==="-"?n.skips.push(b.slice(1)):n.names.push(b)}function s(d,p){let b=0,m=0,$=-1,C=0;for(;b<d.length;)if(m<p.length&&(p[m]===d[b]||p[m]==="*"))p[m]==="*"?($=m,C=b,m++):(b++,m++);else if($!==-1)m=$+1,C++,b=C;else return!1;for(;m<p.length&&p[m]==="*";)m++;return m===p.length}function i(){let d=[...n.names,...n.skips.map(p=>"-"+p)].join(",");return n.enable(""),d}function l(d){for(let p of n.skips)if(s(d,p))return!1;for(let p of n.names)if(s(d,p))return!0;return!1}function a(d){return d instanceof Error?d.stack||d.message:d}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}Pl.exports=Yf});var Nl=Pi((fn,_s)=>{fn.formatArgs=Qf;fn.save=Xf;fn.load=Zf;fn.useColors=Vf;fn.storage=Jf();fn.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();fn.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Vf(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Qf(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+_s.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,o=>{o!=="%%"&&(n++,o==="%c"&&(r=n))}),e.splice(r,0,t)}fn.log=console.debug||console.log||(()=>{});function Xf(e){try{e?fn.storage.setItem("debug",e):fn.storage.removeItem("debug")}catch{}}function Zf(){let e;try{e=fn.storage.getItem("debug")||fn.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function Jf(){try{return localStorage}catch{}}_s.exports=Dl()(fn);var{formatters:e_}=_s.exports;e_.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var ao=globalThis,is=ao.trustedTypes,hl=is?is.createPolicy("lit-html",{createHTML:e=>e}):void 0,Ni="$lit$",jn=`lit$${Math.random().toFixed(9).slice(2)}$`,qi="?"+jn,Bf=`<${qi}>`,_r=document,lo=()=>_r.createComment(""),co=e=>e===null||typeof e!="object"&&typeof e!="function",Fi=Array.isArray,$l=e=>Fi(e)||typeof e?.[Symbol.iterator]=="function",Di=`[ 	
\f\r]`,io=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,bl=/-->/g,yl=/>/g,pr=RegExp(`>|${Di}(?:([^\\s"'>=/]+)(${Di}*=${Di}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),vl=/'/g,kl=/"/g,xl=/^(?:script|style|textarea|title)$/i,ji=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),c=ji(1),po=ji(2),Rv=ji(3),yn=Symbol.for("lit-noChange"),Dt=Symbol.for("lit-nothing"),wl=new WeakMap,fr=_r.createTreeWalker(_r,129);function Al(e,t){if(!Fi(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return hl!==void 0?hl.createHTML(t):t}var Sl=(e,t)=>{let n=e.length-1,r=[],o,s=t===2?"<svg>":t===3?"<math>":"",i=io;for(let l=0;l<n;l++){let a=e[l],u,d,p=-1,b=0;for(;b<a.length&&(i.lastIndex=b,d=i.exec(a),d!==null);)b=i.lastIndex,i===io?d[1]==="!--"?i=bl:d[1]!==void 0?i=yl:d[2]!==void 0?(xl.test(d[2])&&(o=RegExp("</"+d[2],"g")),i=pr):d[3]!==void 0&&(i=pr):i===pr?d[0]===">"?(i=o??io,p=-1):d[1]===void 0?p=-2:(p=i.lastIndex-d[2].length,u=d[1],i=d[3]===void 0?pr:d[3]==='"'?kl:vl):i===kl||i===vl?i=pr:i===bl||i===yl?i=io:(i=pr,o=void 0);let m=i===pr&&e[l+1].startsWith("/>")?" ":"";s+=i===io?a+Bf:p>=0?(r.push(u),a.slice(0,p)+Ni+a.slice(p)+jn+m):a+jn+(p===-2?l:m)}return[Al(e,s+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},uo=class e{constructor({strings:t,_$litType$:n},r){let o;this.parts=[];let s=0,i=0,l=t.length-1,a=this.parts,[u,d]=Sl(t,n);if(this.el=e.createElement(u,r),fr.currentNode=this.el.content,n===2||n===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(o=fr.nextNode())!==null&&a.length<l;){if(o.nodeType===1){if(o.hasAttributes())for(let p of o.getAttributeNames())if(p.endsWith(Ni)){let b=d[i++],m=o.getAttribute(p).split(jn),$=/([.?@])?(.*)/.exec(b);a.push({type:1,index:s,name:$[2],strings:m,ctor:$[1]==="."?ls:$[1]==="?"?cs:$[1]==="@"?us:gr}),o.removeAttribute(p)}else p.startsWith(jn)&&(a.push({type:6,index:s}),o.removeAttribute(p));if(xl.test(o.tagName)){let p=o.textContent.split(jn),b=p.length-1;if(b>0){o.textContent=is?is.emptyScript:"";for(let m=0;m<b;m++)o.append(p[m],lo()),fr.nextNode(),a.push({type:2,index:++s});o.append(p[b],lo())}}}else if(o.nodeType===8)if(o.data===qi)a.push({type:2,index:s});else{let p=-1;for(;(p=o.data.indexOf(jn,p+1))!==-1;)a.push({type:7,index:s}),p+=jn.length-1}s++}}static createElement(t,n){let r=_r.createElement("template");return r.innerHTML=t,r}};function mr(e,t,n=e,r){if(t===yn)return t;let o=r!==void 0?n._$Co?.[r]:n._$Cl,s=co(t)?void 0:t._$litDirective$;return o?.constructor!==s&&(o?._$AO?.(!1),s===void 0?o=void 0:(o=new s(e),o._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=o:n._$Cl=o),o!==void 0&&(t=mr(e,o._$AS(e,t.values),o,r)),t}var as=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,o=(t?.creationScope??_r).importNode(n,!0);fr.currentNode=o;let s=fr.nextNode(),i=0,l=0,a=r[0];for(;a!==void 0;){if(i===a.index){let u;a.type===2?u=new Or(s,s.nextSibling,this,t):a.type===1?u=new a.ctor(s,a.name,a.strings,this,t):a.type===6&&(u=new ds(s,this,t)),this._$AV.push(u),a=r[++l]}i!==a?.index&&(s=fr.nextNode(),i++)}return fr.currentNode=_r,o}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},Or=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,o){this.type=2,this._$AH=Dt,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=mr(this,t,n),co(t)?t===Dt||t==null||t===""?(this._$AH!==Dt&&this._$AR(),this._$AH=Dt):t!==this._$AH&&t!==yn&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):$l(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Dt&&co(this._$AH)?this._$AA.nextSibling.data=t:this.T(_r.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,o=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=uo.createElement(Al(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===o)this._$AH.p(n);else{let s=new as(o,this),i=s.u(this.options);s.p(n),this.T(i),this._$AH=s}}_$AC(t){let n=wl.get(t.strings);return n===void 0&&wl.set(t.strings,n=new uo(t)),n}k(t){Fi(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,o=0;for(let s of t)o===n.length?n.push(r=new e(this.O(lo()),this.O(lo()),this,this.options)):r=n[o],r._$AI(s),o++;o<n.length&&(this._$AR(r&&r._$AB.nextSibling,o),n.length=o)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},gr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,o,s){this.type=1,this._$AH=Dt,this._$AN=void 0,this.element=t,this.name=n,this._$AM=o,this.options=s,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=Dt}_$AI(t,n=this,r,o){let s=this.strings,i=!1;if(s===void 0)t=mr(this,t,n,0),i=!co(t)||t!==this._$AH&&t!==yn,i&&(this._$AH=t);else{let l=t,a,u;for(t=s[0],a=0;a<s.length-1;a++)u=mr(this,l[r+a],n,a),u===yn&&(u=this._$AH[a]),i||(i=!co(u)||u!==this._$AH[a]),u===Dt?t=Dt:t!==Dt&&(t+=(u??"")+s[a+1]),this._$AH[a]=u}i&&!o&&this.j(t)}j(t){t===Dt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},ls=class extends gr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Dt?void 0:t}},cs=class extends gr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Dt)}},us=class extends gr{constructor(t,n,r,o,s){super(t,n,r,o,s),this.type=5}_$AI(t,n=this){if((t=mr(this,t,n,0)??Dt)===yn)return;let r=this._$AH,o=t===Dt&&r!==Dt||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,s=t!==Dt&&(r===Dt||o);o&&this.element.removeEventListener(this.name,this,r),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},ds=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){mr(this,t)}},El={M:Ni,P:jn,A:qi,C:1,L:Sl,R:as,D:$l,V:mr,I:Or,H:gr,N:cs,U:us,B:ls,F:ds},Uf=ao.litHtmlPolyfillSupport;Uf?.(uo,Or),(ao.litHtmlVersions??(ao.litHtmlVersions=[])).push("3.3.1");var lt=(e,t,n)=>{let r=n?.renderBefore??t,o=r._$litPart$;if(o===void 0){let s=n?.renderBefore??null;r._$litPart$=o=new Or(t.insertBefore(lo(),s),s,void 0,n??{})}return o._$AI(e),o};var ps="today",Tl=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}],Lr=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"}];function In(e){return e==="today"?"today":"7d"}function Bi(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function hr(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function Cl(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Rl(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Ol(){let e=null,t=[],n,r=new Set;function o(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},crossLanes(){return n},set(s,i,l){e=Array.isArray(s)?s:null,t=Array.isArray(i)?i:[],n=l===void 0?void 0:l!==null&&typeof l=="object"&&typeof l.revision=="number"&&Array.isArray(l.lanes)?{revision:l.revision,lanes:l.lanes}:null,o()},clear(){e=null,t=[],n=void 0,o()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function Ll(){let e=new Map,t=new Set;function n(o){return o.startsWith("session-log:")?o:`session-log:${o}`}function r(){for(let o of Array.from(t))try{o()}catch{}}return{set(o,s,i=null){e.set(n(o),{lines:Array.isArray(s)?[...s]:[],last_event_at:typeof i=="number"?i:null}),r()},append(o,s){let i=n(o),l=e.get(i)||{lines:[],last_event_at:null};l.lines=[...l.lines,s],l.last_event_at=Date.now(),e.set(i,l),r()},get(o){return e.get(n(o))||null},clear(o){typeof o=="string"?e.delete(n(o)):e.clear(),r()},subscribe(o){return t.add(o),()=>t.delete(o)}}}var ql=jf(Nl(),1);function It(e){return(0,ql.default)(`beads-ui:${e}`)}function t_(e){let n=Fl((e&&typeof e=="object"?e:{}).spec_id);return n?{path:n,source:"native",conflict:!1}:{path:"",source:"none",conflict:!1}}function Fl(e){return typeof e=="string"?e.trim():""}function n_(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}var r_=/^[A-Za-z0-9_.:-]+@[0-9a-fA-F]{40}$/;function Dr(e){let t=t_(e),n=Fl(n_(e).spec_review),r=r_.test(n),o=r&&n.slice(0,n.indexOf("@"))==="skipped";return t.source==="none"?{...t,evidence:"none",skipped:o}:{...t,evidence:r?"published":"draft",skipped:o}}function wn(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function fo(e,t){let n=wn(e.created_at),r=wn(t.created_at);if(n!==r)return n<r?1:-1;let o=e.priority??2,s=t.priority??2;if(o!==s)return o-s;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function Hl(e,t){let n=wn(e.created_at),r=wn(t.created_at);if(n!==r)return n<r?-1:1;let o=e.priority??2,s=t.priority??2;if(o!==s)return o-s;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function Gl(e,t){let n=wn(e.updated_at),r=wn(t.updated_at);if(n!==r)return n<r?1:-1;let o=e.id,s=t.id;return o<s?-1:o>s?1:0}function Kl(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let o=wn(e.created_at),s=wn(t.created_at);if(o!==s)return o<s?1:-1;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function Yl(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let o=e?.id,s=t?.id;return o<s?-1:o>s?1:0}var ms=Object.freeze({priority:"asc",dependents:"desc",released:"desc",spec:"desc",created:"asc",updated:"desc"});function o_(e){return typeof e=="string"&&Object.prototype.hasOwnProperty.call(ms,e)}function Wi(e){if(!e||typeof e!="object")return!1;let t=e;return o_(t.key)&&(t.dir==="asc"||t.dir==="desc")}function jl(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function Bl(e,t){switch(t){case"priority":{let n=e.priority;return typeof n=="number"&&Number.isFinite(n)?n:null}case"dependents":{let n=e.dependents_info?e.dependents_info.count:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"released":{let n=e.release_info?e.release_info.last_released_at:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"spec":return Dr(e).evidence==="published"?1:0;case"created":return jl(e.created_at);case"updated":return jl(e.updated_at);default:return null}}function Ul(e,t,n){let r=Bl(e,n.key),o=Bl(t,n.key);if(r===null||o===null)return r===o?0:r===null?1:-1;if(r===o)return 0;let s=r<o?-1:1;return n.dir==="desc"?-s:s}function Vl(e){let t=Array.isArray(e)?e.filter(Wi):[];return(n,r)=>{for(let l of t){let a=Ul(n,r,l);if(a!==0)return a}let o=Ul(n,r,{key:"created",dir:"asc"});if(o!==0)return o;let s=n.id,i=r.id;return s<i?-1:s>i?1:0}}var s_=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Wl(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function zl(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=s_.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Ql(e,t){let n=Wl(e),r=Wl(t);if(n!==r)return n<r?-1:1;let o=zl(e),s=zl(t);if(o!==s)return o<s?-1:1;let i=wn(e&&e.created_at),l=wn(t&&t.created_at);if(i!==l)return i<l?-1:1;let a=e&&e.id,u=t&&t.id;return a===u?0:String(a)<String(u)?-1:1}var Ui=2**20;function Nr(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-wn(e&&e.created_at)}function Xl(e){return(t,n)=>{let r=Nr(t,e),o=Nr(n,e);if(r!==o)return r<o?-1:1;let s=t?.id,i=n?.id;return s<i?-1:s>i?1:0}}function zi(e,t,n){let r=Array.isArray(e)?e:[],o=r.length,s=Math.max(0,Math.min(t,o-1)),i=s-1>=0?r[s-1]:null,l=s+1<o?r[s+1]:null;if(!i&&!l)return{rank:0};if(!i)return{rank:Nr(l,n)-Ui};if(!l)return{rank:Nr(i,n)+Ui};let a=Nr(i,n),u=Nr(l,n),d=(a+u)/2;return a<d&&d<u?{rank:d}:{renormalize:r.map((p,b)=>({bead_id:p.id,rank:b*Ui}))}}function Hi(e,t={}){let n=It(`issue-store:${e}`),r=new Map,o=[],s=0,i=new Set,l=!1,a=t.sort||fo;function u(){for(let b of Array.from(i))try{b()}catch{}}function d(){o=Array.from(r.values()).sort(a)}function p(b){if(l||!b||b.id!==e)return;let m=Number(b.revision)||0;if(n("apply %s rev=%d",b.type,m),!(m<=s&&b.type!=="snapshot")){if(b.type==="snapshot"){if(m<=s)return;r.clear();let $=Array.isArray(b.issues)?b.issues:[];for(let C of $)C&&typeof C.id=="string"&&C.id.length>0&&r.set(C.id,C);d(),s=m,u();return}if(b.type==="upsert"){let $=b.issue;if($&&typeof $.id=="string"&&$.id.length>0){let C=r.get($.id);if(!C)r.set($.id,$);else{let j=Number.isFinite(C.updated_at)?C.updated_at:0,K=Number.isFinite($.updated_at)?$.updated_at:0;if(j<=K){for(let ie of Object.keys(C))ie in $||delete C[ie];for(let[ie,ee]of Object.entries($))C[ie]=ee}}d()}s=m,u()}else if(b.type==="delete"){let $=String(b.issue_id||"");$&&(r.delete($),d()),s=m,u()}}}return{id:e,subscribe(b){return i.add(b),()=>{i.delete(b)}},applyPush:p,snapshot(){return o},size(){return r.size},getById(b){return r.get(b)},dispose(){l=!0,r.clear(),o=[],i.clear(),s=0}}}function gs(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let o=Object.keys(e.params).sort();for(let s of o){let i=e.params[s];n[s]=String(i)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function Zl(e){let t=It("subs"),n=new Map,r=new Map;function o(l,a){t("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let u=r.get(l);if(!u||u.size===0)return;let d=Array.isArray(a.added)?a.added:[],p=Array.isArray(a.updated)?a.updated:[],b=Array.isArray(a.removed)?a.removed:[];for(let m of Array.from(u)){let $=n.get(m);if(!$)continue;let C=$.itemsById;for(let j of d)typeof j=="string"&&j.length>0&&C.set(j,!0);for(let j of p)typeof j=="string"&&j.length>0&&C.set(j,!0);for(let j of b)typeof j=="string"&&j.length>0&&C.delete(j)}}async function s(l,a){let u=gs(a);if(t("subscribe %s key=%s",l,u),!n.has(l))n.set(l,{key:u,itemsById:new Map});else{let p=n.get(l);if(p&&p.key!==u){let b=r.get(p.key);b&&(b.delete(l),b.size===0&&r.delete(p.key)),n.set(l,{key:u,itemsById:new Map})}}r.has(u)||r.set(u,new Set);let d=r.get(u);d&&d.add(l);try{await e("subscribe-list",{id:l,type:a.type,params:a.params})}catch(p){let b=n.get(l)||null;if(b){let m=r.get(b.key);m&&(m.delete(l),m.size===0&&r.delete(b.key))}throw n.delete(l),p}return async()=>{t("unsubscribe %s key=%s",l,u);try{await e("unsubscribe-list",{id:l})}catch{}let p=n.get(l)||null;if(p){let b=r.get(p.key);b&&(b.delete(l),b.size===0&&r.delete(p.key))}n.delete(l)}}return{subscribeList:s,_applyDelta:o,_subKeyOf:gs,selectors:{getIds(l){let a=n.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let u=n.get(l);return u?u.itemsById.has(a):!1},count(l){let a=n.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=n.get(l),u={};if(!a)return u;for(let d of a.itemsById.keys())u[d]=!0;return u}}}}function Jl(){let e=It("issue-stores"),t=new Map,n=new Map,r=new Set,o=new Map;function s(){for(let a of Array.from(r))try{a()}catch{}}function i(a,u,d){let p=u?gs(u):"",b=n.get(a)||"",m=t.has(a);if(e("register %s key=%s (prev=%s)",a,p,b),m&&b&&p&&b!==p){let $=t.get(a);if($)try{$.dispose()}catch{}let C=o.get(a);if(C){try{C()}catch{}o.delete(a)}let j=Hi(a,d);t.set(a,j);let K=j.subscribe(()=>s());o.set(a,K)}else if(!m){let $=Hi(a,d);t.set(a,$);let C=$.subscribe(()=>s());o.set(a,C)}return n.set(a,p),()=>l(a)}function l(a){e("unregister %s",a),n.delete(a);let u=t.get(a);u&&(u.dispose(),t.delete(a));let d=o.get(a);if(d){try{d()}catch{}o.delete(a)}}return{register:i,unregister:l,getStore(a){return t.get(a)||null},snapshotFor(a){let u=t.get(a);return u?u.snapshot().slice():[]},subscribe(a){return r.add(a),()=>r.delete(a)}}}function ec(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function tc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Gi(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function i_(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),o=r>=0?n.slice(r+1):"";if(o){let l=new URLSearchParams(o).get("issue");if(l)return decodeURIComponent(l)}let s=/^\/issue\/([^\s?#]+)/.exec(n);return s&&s[1]?decodeURIComponent(s[1]):null}function a_(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function nc(e){let t=It("router"),n=()=>{let r=window.location.hash||"",o=/^#\/issue\/([^\s?#]+)/.exec(r),s=o&&o[1]?decodeURIComponent(o[1]):i_(r),i=a_(r);if(t("hash change \u2192 view=%s id=%s",i,s),e.setState({selected_id:i==="worker"?null:s,view:i,worker:{selected_parent_id:i==="worker"?s:null}}),!!o||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let a=s?`#/${i}?issue=${encodeURIComponent(s)}`:`#/${i}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let o=e.getState?e.getState():{view:"board"},s=o.view==="worker"||o.view==="monitor"?o.view:"board",i=Gi(s,r);t("goto issue %s (view=%s)",r,s),window.location.hash!==i?window.location.hash=i:e.setState({selected_id:s==="worker"?null:r,view:s,worker:{selected_parent_id:s==="worker"?r:null}})},gotoView(r){let o=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},s=r==="worker"?o.worker?.selected_parent_id:o.selected_id,i=s?Gi(r,s):`#/${r}`;t("goto view %s (id=%s)",r,s||""),window.location.hash!==i?window.location.hash=i:e.setState({view:r,selected_id:r==="worker"?null:o.selected_id})}}}var l_=Object.freeze({workspace_config:{default_workspace:null}});function rc(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:l_.workspace_config.default_workspace}}}function oc(e={}){let t=It("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:rc(e.config)},r=new Set;function o(){for(let s of Array.from(r))try{s(n)}catch{}}return{getState(){return n},setState(s){let i={...n,...s,filters:{...n.filters,...s.filters||{}},board:{...n.board,...s.board||{}},worker:{...n.worker,...s.worker||{}},workspace:{current:s.workspace?.current!==void 0?s.workspace.current:n.workspace.current,available:s.workspace?.available!==void 0?s.workspace.available:n.workspace.available,hidden:s.workspace?.hidden!==void 0?s.workspace.hidden:n.workspace.hidden},config:s.config!==void 0?rc(s.config):n.config},l=i.workspace.current?.path!==n.workspace.current?.path||i.workspace.available.length!==n.workspace.available.length||i.workspace.hidden.length!==n.workspace.hidden.length||i.workspace.hidden.some((u,d)=>u!==n.workspace.hidden[d]),a=i.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;i.selected_id===n.selected_id&&i.view===n.view&&i.filters.status===n.filters.status&&i.filters.search===n.filters.search&&i.filters.type===n.filters.type&&i.board.closed_filter===n.board.closed_filter&&i.worker.selected_parent_id===n.worker.selected_parent_id&&i.worker.show_closed_children.length===n.worker.show_closed_children.length&&i.worker.show_closed_children.every((u,d)=>u===n.worker.show_closed_children[d])&&!l&&!a||(n=i,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),o())},subscribe(s){return r.add(s),()=>r.delete(s)}}}function sc(e){let t=It("activity"),n=0,r=new Map,o=1;function s(){if(!e)return;let u=n>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function i(){n+=1,t("start count=%d",n),s()}function l(){let u=n;n=Math.max(0,n-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,n),s()}function a(u){return async(p,b)=>{let m=o++,$=Date.now();r.set(m,{type:p,start_ts:$}),t("request start id=%d type=%s count=%d",m,p,n+1),i();let C=!1,j=()=>{C||(C=!0,r.delete(m),l())},K=setTimeout(()=>{C||(t("request TIMEOUT id=%d type=%s elapsed=%dms",m,p,Date.now()-$),j())},3e4);try{let ie=await u(p,b),ee=Date.now()-$;return t("request done id=%d type=%s elapsed=%dms",m,p,ee),ie}catch(ie){let ee=Date.now()-$;throw t("request error id=%d type=%s elapsed=%dms err=%o",m,p,ee,ie),ie}finally{clearTimeout(K),j()}}}return s(),{wrapSend:a,start:i,done:l,getCount:()=>n,getActiveRequests:()=>{let u=Date.now();return Array.from(r.entries()).map(([d,p])=>({id:d,type:p.type,elapsed_ms:u-p.start_ts}))}}}function pe(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}function qr(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let s=t.get();return s&&s.order?s.order:{}}function r(s,i,l){let a=e&&e.snapshotFor?e.snapshotFor(s).slice():[];if(i==="closed")return a.sort(Yl),a;switch(l){case"created_desc":return a.sort(fo),a;case"created_asc":return a.sort(Hl),a;case"updated_desc":return a.sort(Gl),a;case"priority":return a.sort(Kl),a;case"manual":default:{let u=n();return u?a.sort(Xl(u)):a.sort(fo),a}}}function o(s){let i=[];return e&&typeof e.subscribe=="function"&&i.push(e.subscribe(s)),t&&typeof t.subscribe=="function"&&i.push(t.subscribe(s)),()=>{for(let l of i)try{l()}catch{}}}return{selectBoardColumn:r,subscribe:o}}function tr(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function Yt(e){let t=tr(e);if(t===null)return"";let n=new Date(t),r=o=>String(o).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function on(e,t){let n=tr(e);if(n===null)return"";let o=(typeof t=="number"?t:Date.now())-n;if(o<6e4)return"\uBC29\uAE08";let s=Math.floor(o/6e4);if(s<60)return`${s}\uBD84 \uC804`;let i=Math.floor(o/36e5);if(i<24)return`${i}\uC2DC\uAC04 \uC804`;let l=Math.floor(o/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let u=Math.floor(l/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function ic(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let o=tr(r.updated_at)??0;if(t===null||o>n){t=r,n=o;continue}o===n&&String(r.id)<String(t.id)&&(t=r)}return t}function hs(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function bs(e){let t=new Map;for(let r of e)r&&r.id&&!t.has(r.id)&&t.set(r.id,r);let n=new Map;for(let r of t.values()){let o=hs(r);if(!o)continue;let s=n.get(o);s||(s=[],n.set(o,s)),s.push({id:r.id,title:r.title,status:r.status,metadata:r.metadata,workflow:r.workflow,created_at:r.created_at,updated_at:r.updated_at})}return n}function ys(e,t){let n=e.get(t)||[],r=0;for(let s of n)(s.status==="resolved"||s.status==="closed")&&(r+=1);let o=ic(n);return{total:n.length,count:r,current:o,children:n}}function ac(e){let t=e.transport,n=e.uiOrderStore;function r(i,l){return"renormalize"in i?i.renormalize:[{bead_id:l,rank:i.rank}]}function o(i,l){let a={...i.order};for(let u of l)a[u.bead_id]=u.rank;n&&n.set({revision:i.revision,order:a})}async function s(i,l,a){if(!t||!n)return;let u=n.get()||{revision:0,order:{}},d=r(zi(l,a,u.order),i);o(u,d);let p=await t("ui-order-set",{expected_revision:u.revision,entries:d});if(p&&p.conflict){let b={revision:typeof p.revision=="number"?p.revision:0,order:p.order||{}};n.set(b);let m=r(zi(l,a,b.order),i);o(b,m);let $=await t("ui-order-set",{expected_revision:b.revision,entries:m});$&&$.applied&&n.set({revision:typeof $.revision=="number"?$.revision:0,order:$.order||{}})}else p&&p.applied&&n.set({revision:typeof p.revision=="number"?p.revision:0,order:p.order||{}})}return{applyReorder:s}}function lc(e){if(typeof e!="string")return"";let t=e.indexOf("-");return t>0?e.slice(0,t):""}function _o(e,t){let n=lc(e),r=lc(t);return n.length===0||r.length===0?!1:n!==r}function vs(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Ki(e,t){return!t||typeof e!="string"||e.length===0||vs(t.visible_labels).includes(e)?!0:vs(t.hidden_labels).includes(e)?!1:!vs(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function cc(e,t){return vs(e).filter(n=>Ki(n,t))}function nr(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}function c_(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function u_(e,t,n,r,o){return c`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${r?"true":"false"}
    @click=${o}
  >
    children ${t}/${n} ${r?"\u25B4":"\u25BE"}
  </button>`}function d_(e,t,n,r){return c`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${r?o=>r(o,e.id):void 0}
  >
    <span class=${c_(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${n}
  </button>`}function ks(e,t){let n=e.total||0,r=!!t.expanded,o=t.trailing??"",s=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(n===0&&s===null)return"";let i=Array.isArray(e.children)?e.children:[],l=n>0?i.slice().sort(Ql):i;return c`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?u_(t.parent_id,e.count,n,r,t.onToggle):c`<span class="board-card__roll-none">${s}</span>`}
        ${o}
      </div>
      ${n>0&&e.current?c`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${r&&n>0?c`<div class="board-card__roll-list">
            ${l.map((a,u)=>d_(a,u+1,t.childChips?t.childChips(a):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var p_={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},dc={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},uc={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},f_={review:"\u2713",skip:"\u2298"},rr={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function __(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let o of e){let s=t[o];if(s&&s.fill==="dim"&&s.stale!==!0)return o}return null}function pc(e){let t=e&&e.fill||"none";return t==="none"?rr.none:e&&e.stale===!0?rr.stale:t==="dim"?rr.dim:e&&e.glyph==="review"?rr.review:e&&e.glyph==="skip"?rr.skip:rr.done}function m_(e){if(!e||e.fill==="none"||!e.approval_state)return pc(e);let t=[];return e.glyph==="review"?t.push(rr.review):e.glyph==="skip"&&t.push(rr.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function g_(e,t,n,r){let o=p_[e]||e,s=t&&t.fill||"none",i=!!t&&t.stale===!0,l=f_[t&&t.glyph||""]||"",a="bar";s==="dim"?a+=` b-${o} dim`:s==="full"&&(a+=` b-${o} full`),i&&(a+=" stale"),n&&(a+=" cur");let u=s==="none"?"lbl":`lbl l-${o} on`,d=n?`color: var(--stage-${o}-on)`:"",p=dc[e]||e,b=r?fc(t):null;if(!b)return c`
      <div class="seg">
        <div class=${a} style=${d}>${l}</div>
        <div class=${u}>${p}</div>
      </div>
    `;let m=`${p} \uBB38\uC11C \uC5F4\uAE30 \xB7 ${b.path}`;return c`
    <button
      type="button"
      class="seg seg--doc"
      aria-label=${m}
      title=${m}
      @click=${$=>{$.preventDefault(),$.stopPropagation(),r($,b,e)}}
    >
      <div class=${a} style=${d}>${l}</div>
      <div class=${u}>${p}</div>
    </button>
  `}function fc(e){let t=e?e.doc:null;return!t||typeof t.path!="string"||t.path.length===0?null:t}function ws(e,t,n={}){if(!e||!e.stages)return"";let r=n.onOpenDoc,o=uc[e.route]||uc.spec_backed,s=e.stages,i=__(o,s,String(t||"open")),l=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${o.map(u=>`${dc[u]||u} ${u==="plan"?m_(s[u]||{}):pc(s[u]||{})}`).join(" \xB7 ")}`,a=!!r&&o.some(u=>fc(s[u]||{})!==null);return c`
    <div
      class="stp"
      role=${a?"group":"img"}
      aria-label=${l}
    >
      ${o.map(u=>g_(u,s[u]||{},u===i,r))}
    </div>
  `}function h_(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var _c=2;function mc(e){let t=e.slice(0,_c).join(", "),n=e.length-_c;return`\u26D3 blocked: ${t}${n>0?` +${n}`:""}`}function b_(e,t){if(!t)return[];let n=[],r=Array.isArray(t.blockers)?t.blockers:[],o=[],s=[];for(let i of r)(_o(e,i)?s:o).push(i);return o.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-dep"
        >${mc(o)}</span
      >`),s.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-foreign"
        >${mc(s)}</span
      >`),n}function y_(e){if(!e||typeof e!="object")return null;let t=e.awaiting_user;if(typeof t!="string")return null;let n=t.trim();return n.length===0?null:c`<span class="ctl-chip ctl-chip--blocked"
    >${`\u23F8 \uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694: ${n}`}</span
  >`}function Yi(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function $s(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function Bn(e){return`${e.kind}:${$s(e)}@${e.sha}`}function xs(e,t){if(!e)return null;let n=Yi(e.kind),r=e.reason,o=e.kind==="delegated"?r===null:typeof r=="string"&&r.trim().length>0&&!/[\r\n]/.test(r);if(!n||!o)return null;let s=Yi(t?.kind),i=s!==null&&t?.kind!==e.kind,l=`\uACC4\uD68D \xB7 ${n}${i?` \u2192 ${s}`:""}`,a=`planned_execution ${e.kind}${typeof r=="string"?`:${r}`:""}`,u=t?` \xB7 exec_receipt ${Bn(t)}`:"";return{kind:e.kind,label:l,title:`${a}${u}`}}function gc(e,t){let n=xs(e,t);return n?c`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${n.kind}
        title=${n.title}
        >${n.label}</span
      >`:null}function v_(e){if(!e)return null;let t=Yi(e.kind);return t?c`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${Bn(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function k_(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},o=[];if(r.route&&nr(n,"route")){let l=r.route_source==="derived";o.push(c`<span
        class="ctl-chip ctl-chip--route${l?" is-derived":""}"
        title=${l?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${l?"unset":r.route}</span
      >`)}if(r.fast_track&&nr(n,"fast_track")&&o.push(c`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),r.pr&&nr(n,"pr")){let l=r.pr.number;o.push(c`<span class="ctl-chip ctl-chip--pr"
        >${`PR${l!=null?` #${l}`:""}`}</span
      >`)}let s=gc(r.planned_execution,r.exec_receipt);if(s&&o.push(s),r.exec_receipt){let l=r.exec_receipt;o.push(c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Bn(l)}`}
        >${`exec ${l.kind==="delegated"?$s(l):`main:${l.actor}`} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}if(r.impl_entry){let l=r.impl_entry;o.push(c`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${l.actor}@${l.sha}`}
        >${`impl ${l.actor} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}for(let l of cc(e.labels,n))o.push(c`<span class="ctl-chip ctl-chip--label">${l}</span>`);if(e.from_id&&nr(n,"from")&&o.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${l=>{l.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(l,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),nr(n,"blocked")){let l=y_(e.metadata);l&&o.push(l),o.push(...b_(e.id,e.blocked_info))}return t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&nr(n,"blocked")&&o.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),o.length===0?"":c`<div class="board-card__chips">${o}</div>`}function w_(e){let t=on(e.created_at),n=on(e.updated_at);return!t&&!n?"":c`<span class="board-card__times">
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
  </span>`}function $_(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return ks(n,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:w_(e),empty_label:"children \uC5C6\uC74C",childChips:Vi,onToggle:r=>t.onRollupToggle&&t.onRollupToggle(r,e.id),onChildClick:(r,o)=>t.onChildClick&&t.onChildClick(r,o)})}function Vi(e){let t=e?.workflow?.chips?.planned_execution,n=e?.workflow?.chips?.exec_receipt;return xs(t,n)?c`<span class="board-card__roll-child-chips">
    ${gc(t,n)}
    ${v_(n)}
  </span>`:null}function As(e,t){let n=h_(e.priority);return c`
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
      ${k_(e,t)}
      ${e.workflow&&nr(t.policy||null,"stepper")?ws(e.workflow,e.status,{onOpenDoc:t.onOpenDoc}):""}
      ${$_(e,t)}
    </article>
  `}function Fr(e,t){let n=Array.isArray(e.items)?e.items.length:0,r=e.is_closed===!0;return c`
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
              ${Tl.map(s=>c`<option
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
        ${e.items.map(s=>As(s,t))}
      </div>
    </section>
  `}function hc(e,t,n){return c`
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
          ${e.items.length===0?c`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(r=>As(r,t))}
        </div>
      </div>
    </dialog>
  `}var x_=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],A_=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],S_=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function E_(e,t,n){let r=e.labels.length,o=r>0?`\uB77C\uBCA8 ${r}`:"\uB77C\uBCA8";return c`
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
  `}function bc(e,t,n){return c`
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
        ${x_.map(r=>c`<option
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
        ${A_.map(r=>c`<option
              value=${r.value}
              ?selected=${e.type===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      ${E_(e,t,n)}
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
        ${S_.map(r=>c`<option
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
  `}var T_=200,C_={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},R_=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),yc="beads-ui.board.sort",vc=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function O_(){try{let e=window.localStorage.getItem(yc);if(e&&vc.has(e))return e}catch{}return"created_desc"}function kc(e,t){let n=It("views:board"),r=t.gotoIssue,o=t.issueStores,s=t.transport,i=t.uiOrderStore,l=t.displayPolicyStore,a=t.workerQueueStore,u=t.onClosedRangeChange,d=t.onNewIssue,p=t.openDoc,b=t.closedRange||ps,m=o?qr(o,i):null,$=ac({transport:s,uiOrderStore:i}),C=[],j=[],K=[],ie=[],ee=[],F=[],P=!1,L=0,z=O_(),V=new Map,ne=new Map,N=new Map,Q=new Set,G={search:"",priority:"",type:"",labels:[]},X=!1,Re=null;function we(T){return String(T.status||"open")==="open"}function ce(T){return String(T.status||"open")==="open"}function q(T){let J=G.search.trim().toLowerCase(),Pe=G.priority,Ye=G.type,qe=G.labels;return T.filter(it=>{if(J){let at=String(it.id||"").toLowerCase(),Ue=String(it.title||"").toLowerCase();if(!at.includes(J)&&!Ue.includes(J))return!1}if(Pe!==""&&String(it.priority)!==Pe||Ye!==""&&String(it.issue_type||"")!==Ye)return!1;if(qe.length>0){let at=Array.isArray(it.labels)?it.labels:[];if(!qe.some(Ue=>at.includes(Ue)))return!1}return!0})}function $e(){let T=new Set;for(let J of[C,j,K,ie,ee,F])for(let Pe of J){let Ye=Array.isArray(Pe.labels)?Pe.labels:[];for(let qe of Ye)typeof qe=="string"&&qe.length>0&&T.add(qe)}return Array.from(T).sort()}function Se(){return G.search.trim()!==""||G.priority!==""||G.type!==""||G.labels.length>0}function S(){try{if(m){let T=m.selectBoardColumn("tab:board:in-progress","in_progress",z),J=m.selectBoardColumn("tab:board:blocked","blocked",z).filter(ce),Pe=new Set(T.map(Ge=>Ge.id)),Ye=m.selectBoardColumn("tab:board:ready","ready",z).filter(Ge=>we(Ge)&&!Pe.has(Ge.id)),qe=m.selectBoardColumn("tab:board:resolved","resolved",z),it=m.selectBoardColumn("tab:board:deferred","deferred",z),at=m.selectBoardColumn("tab:board:closed","closed").slice(0,T_),Ue=[...J,...Ye,...T,...qe,...at];Z(Ue);let tt=new Set;for(let Ge of Ue)Ge&&Ge.id&&!hs(Ge)&&tt.add(Ge.id);let kt=!Se();C=kt?mo(J,tt):J,j=kt?mo(Ye,tt):Ye,K=kt?mo(T,tt):T,ie=kt?mo(qe,tt):qe,ee=it,L=it.length,F=kt?mo(at,tt):at,V=new Map;for(let Ge of C)V.set(Ge.id,"open");for(let Ge of j)V.set(Ge.id,"open");for(let Ge of K)V.set(Ge.id,"in_progress");for(let Ge of ie)V.set(Ge.id,"resolved");for(let Ge of ee)V.set(Ge.id,"deferred");for(let Ge of F)V.set(Ge.id,"closed");ne=new Map;for(let Ge of C)ne.set(Ge.id,"blocked-col");for(let Ge of j)ne.set(Ge.id,"ready-col");for(let Ge of K)ne.set(Ge.id,"in-progress-col");for(let Ge of ie)ne.set(Ge.id,"resolved-col");for(let Ge of F)ne.set(Ge.id,"closed-col")}Fe()}catch{C=[],j=[],K=[],ie=[],ee=[],F=[],N=new Map,Fe()}}function Z(T){N=bs(T)}function Te(T){return ys(N,T)}function _e(T){return!Q.has(T)}function xe(T,J){T.preventDefault(),T.stopPropagation(),Q.has(J)?Q.delete(J):Q.add(J),Fe()}function ge(T,J){T.preventDefault(),T.stopPropagation(),r(J)}function je(T,J){T.preventDefault(),T.stopPropagation(),r(J)}function ft(T,J){Re||r(J)}function Le(T,J){T.preventDefault(),T.stopPropagation(),L_(J).then(Pe=>{Pe&&pe("\uBCF5\uC0AC\uB428","success",1200)})}function U(T,J){Re=J,T.dataTransfer&&(T.dataTransfer.setData("text/plain",J),T.dataTransfer.effectAllowed="move"),T.target.classList.add("board-card--dragging")}function de(T){T.target.classList.remove("board-card--dragging"),Ot(),setTimeout(()=>{Re=null},0)}function se(T){let J=String(T.target.value||"");!J||J===b||(b=J,u&&u(J),Fe())}function ae(){return l?l.get():null}function Ee(T){let J=a?a.get():null,Pe=J?J.cleanup_failed:null;if(!Pe||typeof Pe!="object"||Array.isArray(Pe))return null;let Ye=Pe[T];return!Ye||typeof Ye!="object"||Array.isArray(Ye)?null:Ye}let me={onCardClick:ft,onCopyId:Le,onDragStart:U,onDragEnd:de,onClosedRangeChange:se,rollupFor:Te,isExpanded:_e,onRollupToggle:xe,onChildClick:ge,onFromChipClick:je,onOpenDoc:p?(T,J)=>p(J):void 0,cleanupFailureFor:Ee,get policy(){return ae()}};function Oe(T,J){Re||(W(),r(J))}function Qe(T,J){T.preventDefault(),T.stopPropagation(),W(),r(J)}let He={...me,onCardClick:Oe,onChildClick:Qe,onFromChipClick:Qe,onOpenDoc:p?(T,J)=>{W(),p(J)}:void 0,get policy(){return ae()}};function Be(T){let J=T.target,Pe=e.querySelector(".board-filter__labels");J&&Pe&&Pe.contains(J)||Ae()}function te(T){T.key==="Escape"&&Ae()}function H(){X||(X=!0,document.addEventListener("mousedown",Be),document.addEventListener("keydown",te),Fe())}function Ae(){X&&(X=!1,document.removeEventListener("mousedown",Be),document.removeEventListener("keydown",te),Fe())}function ut(T){T.key==="Escape"&&W()}function x(){P||(P=!0,document.addEventListener("keydown",ut),Fe())}function W(){P&&(P=!1,document.removeEventListener("keydown",ut),Fe())}let be={onClose:W,onOverlayClick(T){T.target===T.currentTarget&&W()}},Ie={onSearchInput(T){G.search=String(T.target.value||""),S()},onPriorityChange(T){G.priority=String(T.target.value||""),S()},onTypeChange(T){G.type=String(T.target.value||""),S()},onSortChange(T){let J=String(T.target.value||"");if(!(!vc.has(J)||J===z)){z=J;try{window.localStorage.setItem(yc,J)}catch{}S()}},onDeferredToggle(){P?W():x()},onLabelMenuToggle(){X?Ae():H()},onLabelToggle(T){let J=G.labels.indexOf(T);J===-1?G.labels.push(T):G.labels.splice(J,1),S()},onLabelClear(){G.labels.length!==0&&(G.labels=[],S())},onNewIssue(){d&&d()}};function Ne(){return c`
      <div class="board-view">
        ${bc(G,Ie,{sort_mode:z,deferred_popup_open:P,deferred_count:L,label_options:$e(),label_menu_open:X})}
        <div class="board-root">
          ${Fr({title:"Blocked",id:"blocked-col",items:q(C)},me)}
          ${Fr({title:"Ready",id:"ready-col",items:q(j)},me)}
          ${Fr({title:"In progress",id:"in-progress-col",items:q(K)},me)}
          ${Fr({title:"Resolved",id:"resolved-col",items:q(ie)},me)}
          ${Fr({title:"Closed",id:"closed-col",items:q(F),is_closed:!0,closed_range:b},me)}
        </div>
        ${P?hc({items:q(ee),count:L},He,be):""}
      </div>
    `}function Fe(){lt(Ne(),e),dt()}function dt(){try{let T=e.querySelector("#deferred-popup");T&&!T.open&&(typeof T.showModal=="function"?T.showModal():T.setAttribute("open",""));let J=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let Pe of J)Array.from(Pe.querySelectorAll(".board-card")).forEach((qe,it)=>{qe.tabIndex=it===0?0:-1})}catch{}}async function At(T,J){if(!s){pe("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await s("update-status",{id:T,status:J}),pe("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(Pe){n("update-status failed: %o",Pe),pe("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function Mt(T){switch(T){case"blocked-col":return C;case"ready-col":return j;case"in-progress-col":return K;case"resolved-col":return ie;default:return[]}}function zt(T,J,Pe){if(!s||!i)return;let Ye=Mt(T),qe=Ye.find(kt=>kt.id===J);if(!qe)return;let it=Ye.filter(kt=>kt.id!==J),at=Pe.closest?Pe.closest(".board-card"):null,Ue=it.length;if(at){let kt=at.getAttribute("data-issue-id");if(kt===J)return;let Ge=it.findIndex(Tt=>Tt.id===kt);Ge>=0&&(Ue=Ge)}let tt=it.slice();tt.splice(Ue,0,qe),$.applyReorder(J,tt,Ue)}function Ot(){for(let T of Array.from(e.querySelectorAll(".board-column--drag-over")))T.classList.remove("board-column--drag-over")}let _t=null;e.addEventListener("dragover",T=>{T.preventDefault(),T.dataTransfer&&(T.dataTransfer.dropEffect="move");let Pe=T.target.closest(".board-column");Pe&&Pe!==_t&&(_t&&_t.classList.remove("board-column--drag-over"),Pe.classList.add("board-column--drag-over"),_t=Pe)}),e.addEventListener("dragleave",T=>{let J=T.relatedTarget;(!J||!e.contains(J))&&_t&&(_t.classList.remove("board-column--drag-over"),_t=null)}),e.addEventListener("drop",T=>{T.preventDefault(),_t&&(_t.classList.remove("board-column--drag-over"),_t=null);let J=T.target,Pe=J.closest(".board-column");if(!Pe)return;let Ye=T.dataTransfer?.getData("text/plain")||"";if(!Ye)return;let qe=Pe.id,it=ne.get(Ye);if(it&&it===qe){if(R_.has(qe)){if(z!=="manual"){pe("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}zt(qe,Ye,J)}return}let at=C_[qe];if(!at){pe("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}V.get(Ye)!==at&&At(Ye,at)}),e.addEventListener("keydown",T=>{let J=T.target;if(!(J instanceof HTMLElement))return;let Pe=String(J.tagName||"").toLowerCase();if(Pe==="input"||Pe==="textarea"||Pe==="select"||Pe==="button"||Pe==="a"||J.isContentEditable===!0)return;let Ye=J.closest(".board-card");if(!Ye)return;let qe=String(T.key||"");if(qe==="Enter"||qe===" "){T.preventDefault();let tt=Ye.getAttribute("data-issue-id");tt&&r(tt);return}if(qe!=="ArrowUp"&&qe!=="ArrowDown"&&qe!=="ArrowLeft"&&qe!=="ArrowRight")return;T.preventDefault();let it=Ye.closest(".board-column");if(!it)return;let at=Array.from(it.querySelectorAll(".board-card")),Ue=at.indexOf(Ye);if(qe==="ArrowDown"&&Ue<at.length-1){ze(Ye,at[Ue+1]);return}if(qe==="ArrowUp"&&Ue>0){ze(Ye,at[Ue-1]);return}if(qe==="ArrowLeft"||qe==="ArrowRight"){let tt=Array.from(e.querySelectorAll(".board-column")),kt=tt.indexOf(it),Ge=qe==="ArrowRight"?1:-1,Tt=kt+Ge;for(;Tt>=0&&Tt<tt.length;){let Xe=tt[Tt].querySelector(".board-card");if(Xe){ze(Ye,Xe);return}Tt+=Ge}}});function ze(T,J){try{T.tabIndex=-1,J.tabIndex=0,J.focus()}catch{}}let O=null;m&&m.subscribe&&(O=m.subscribe(()=>{try{S()}catch{}}));let re=null;l&&l.subscribe&&(re=l.subscribe(()=>{try{S()}catch{}}));let he=null;return a&&a.subscribe&&(he=a.subscribe(()=>{Fe()})),{async load(){n("load"),S()},clear(){Ae(),W(),O&&(O(),O=null),re&&(re(),re=null),he&&(he(),he=null),e.replaceChildren(),C=[],j=[],K=[],ie=[],ee=[],F=[],V=new Map,ne=new Map}}}function mo(e,t){return e.filter(n=>{let r=hs(n);return!(r&&t.has(r))})}async function L_(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}var nn=e=>e??Dt;async function sn(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}function yr(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function go(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function I_(e,t=document){let n=t.createElement("dialog");n.className="continuation-dialog";let r=t.createElement("button"),o=t.createElement("button"),s=t.createElement("button"),i=t.createElement("h2"),l=t.createElement("p");return i.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",l.textContent=`${yr(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${yr(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,r.type="button",r.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",r.disabled=e.prior_available===!1,o.type="button",o.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",s.type="button",s.textContent="\uCDE8\uC18C",n.append(i,l,r,o,s),t.body.append(n),new Promise(a=>{let u=d=>{typeof n.close=="function"&&n.close(),n.remove(),a(d)};r.addEventListener("click",()=>u("prior_session")),o.addEventListener("click",()=>u("fresh_current")),s.addEventListener("click",()=>u(null)),n.addEventListener("cancel",d=>{d.preventDefault(),u(null)}),typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")})}async function Un(e,t,n={}){let r=e;for(n.onResult?.(r);r?.continuation_mismatch;){let o=r.continuation_mismatch,s=await I_(o);if(s===null)return r;r=await t(s,o.decision_token),n.onResult?.(r),r?.conflict&&n.refresh&&(r=await n.refresh(r),n.onResult?.(r))}return r}var M_=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_model","orchestration_model","orchestration_effort","orchestration_speed"],wc={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},P_=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function Kt(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Nt(e){return typeof e=="string"&&e.length>0?e:null}function jr(e){return e.startsWith("gpt-")?e.slice(4):e}function Lt(e,t,n,r,o){return{value:e,source:t,display:n,full_value:r,resolution:o}}function xc(e,t,n){let r=Nt(t[e]);if(r!==null)return{value:r,source:"pin"};let o=Nt(n[e]);return o===null?null:{value:o,source:"global"}}function ho(e,t,n,r){return xc(e,t,n)||{value:r,source:"base"}}function Qi(e,t,n,r){let o=n?.implementation?.model_catalog;if(t&&Kt(o?.[t])){let i=Nt(o[t][e]);if(i!==null)return i}if(t&&Array.isArray(o?.[t])&&o[t].includes(e))return e;if(!t&&Kt(o)){for(let i of Object.values(o))if(Kt(i)){let l=Nt(i[e]);if(l!==null)return l}else if(Array.isArray(i)&&i.includes(e))return e}let s=r?.model_index?.[e];return Nt(r?.runners?.[s]?.models?.[e]?.id)||e}function D_(e,t){return Nt(t?.review?.reviewers?.[e]?.model)||e}function Br(e,t,n=!1){if(e==="default")return Lt(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let r=n?jr(e):e;return Lt(e,t,r,e,"explicit")}function Ac(e,t,n){let r=t?.implementation?.model_catalog?.[e],o=[];Kt(r)?o.push(...Object.keys(r)):Array.isArray(r)&&o.push(...r.filter(i=>typeof i=="string"));let s=n?.runners?.[e]?.models;if(Kt(s))for(let i of Object.keys(s))o.includes(i)||o.push(i);return o}function N_(e,t){let n=[],r=e?.implementation?.model_catalog;Kt(r)&&n.push(...Object.keys(r));let o=t?.runners;if(Kt(o))for(let s of Object.keys(o))n.includes(s)||n.push(s);return n}function q_(e,t,n){if(e===null)return{runtime:null,offered:!1};let r=!1;for(let o of N_(t,n)){let s=Ac(o,t,n);if(s.length>0&&(r=!0),s.includes(e))return{runtime:o,offered:!0}}return{runtime:null,offered:r}}function Xi(e){return Lt(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function $c(e,t,n){let r=xc(e,t,n);return r?Br(r.value,r.source):Lt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function mn(e){let t=Kt(e.pin)?e.pin:{},n=Kt(e.global)?e.global:{},r=Kt(e.execution_defaults)?e.execution_defaults:null,o=r?.supported===!0&&Kt(r.session)?r.session:null,s=r?.supported===!0&&Kt(r.orchestration)?r.orchestration:null,i=Kt(e.runner_catalog)?e.runner_catalog:null,l=Nt(n.quick_fix_impl_model),a=q_(l,o,i),u={};if(o){let d=ho("workflow_mode",t,n,Nt(o.workflow_mode_default));u.workflow_mode=d.source==="base"?Lt(d.value,"base",d.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",d.value,"default"):Br(d.value,d.source);for(let ee of["spec_review","plan_review","impl_review"]){let F=`${ee}_model`,P=Nt(ee==="plan_review"?d.value==="fast_track"?o.plan_review?.fast_track_default:o.plan_review?.standard_recommended:o.review?.default),L=ho(F,t,n,P);if(L.value===null)u[F]=Lt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(L.value!=="self"&&L.value!=="skip"&&!Kt(o.review?.reviewers?.[L.value]))u[F]=Xi(Lt(L.value,L.source,"",null,"explicit"));else{let z=D_(L.value,o);u[F]=Lt(L.value,L.source,jr(z),z,L.source==="base"?"default":"explicit")}}for(let[ee,F]of Object.entries(wc)){let P=u[F].value;if(P==="self"||P==="skip"){u[ee]=Lt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let L=Nt(o.review?.reviewers?.[P||""]?.effort),z=ho(ee,t,n,L);u[ee]=z.value===null?Lt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Lt(z.value,z.source,z.value,z.value,z.source==="base"?"default":"explicit")}let p=Kt(o.implementation?.default)?o.implementation.default:{},b=Nt(e.route),m=b!==null&&["quick_fix","spec_backed","full_plan"].includes(b),$=Kt(o.implementation?.route_defaults)?o.implementation.route_defaults:{},C=m&&Kt($[b])?$[b]:{};for(let ee of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let F=ho(ee,t,n,ee==="impl_dispatch"?Nt(C.dispatch)||Nt(p.dispatch):Nt(p[ee.replace("impl_","")]));u[ee]=F.value===null?Lt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Lt(F.value,F.source,F.value,F.value,F.source==="base"?"default":"explicit")}let j=Nt(t.impl_runtime),K=j==="inherit"?Nt(e.controller_runtime):j,ie=b==="quick_fix"&&Nt(t.impl_dispatch)===null&&a.runtime!==null&&(j===null||K===a.runtime);if(ie){let ee=a.runtime,F=l;u.impl_dispatch=Lt("delegated","global","\uC704\uC784 (\uC804\uC5ED quick_fix)","delegated","explicit"),j===null&&(u.impl_runtime=Lt(ee,"global",`${ee} (\uC720\uB3C4)`,ee,"explicit")),Nt(t.impl_model)===null&&(u.impl_model=Lt(F,"global",F,F,"explicit"))}if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let ee of["impl_runtime","impl_model","impl_effort","impl_speed"])u[ee]=Lt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(u.impl_dispatch.value==="delegated"&&!ie&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_model.value!==null){let ee=u.impl_runtime.value==="inherit"?Nt(e.controller_runtime):u.impl_runtime.value,F=ee?Ac(ee,o,i):[];if(u.impl_model.value!=="auto"&&F.length>0&&!F.includes(u.impl_model.value))u.impl_model=Xi(u.impl_model);else{let P=Qi(u.impl_model.value,ee,o,i);u.impl_model.display=jr(P),u.impl_model.full_value=P}}if(u.impl_effort.value==="auto"){let ee=Nt(e.transport)||(u.impl_runtime.value==="codex"?"codex-native-spawn":u.impl_runtime.value==="claude"?"implement-claude":null),F=ee?Nt(o.implementation?.effort_by_transport?.[ee]?.auto):null;F&&!P_.has(F)?(u.impl_effort.display=`${F} (\uBE44\uD638\uD658)`,u.impl_effort.full_value=F,u.impl_effort.resolution="incompatible"):(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}u.impl_speed.value==="default"&&(u.impl_speed=u.impl_speed.source==="base"?Lt("default","base","default (\uC77C\uBC18)","default","default"):Br("default",u.impl_speed.source))}}else for(let d of M_.filter(p=>!p.startsWith("orchestration_")))u[d]=$c(d,t,n);if(!o){for(let[d,p]of Object.entries(wc))(u[p].value==="self"||u[p].value==="skip")&&(u[d]=Lt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let d of["impl_runtime","impl_model","impl_effort","impl_speed"])u[d]=Lt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else u.impl_dispatch.value==="delegated"&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_effort.value==="auto"&&(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}for(let d of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!s){u[d]=$c(d,t,n);continue}let p=d.replace("orchestration_",""),b=Nt(s[p]),m=ho(d,t,n,b);if(d==="orchestration_effort"&&m.source==="base"){u[d]=Lt(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(m.value===null){u[d]=Lt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(d==="orchestration_model"){let $=m.source==="base"?Nt(s.model_id)||m.value:Qi(m.value,null,o,i);u[d]=Lt(m.value,m.source,jr($),$,m.source==="base"?"default":"explicit");continue}if(m.value==="default"){u[d]=m.source==="base"?Lt("default","base","default (\uC77C\uBC18)","default","default"):Br("default",m.source);continue}u[d]=Br(m.value,m.source)}if(o)if(l===null){let d=u.orchestration_model.full_value;u.quick_fix_impl_model=Lt(null,"base",d===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${jr(d)})`,null,"default")}else if(a.runtime!==null){let d=Qi(l,a.runtime,o,i);u.quick_fix_impl_model=Lt(l,"global",jr(d),d,"explicit")}else a.offered?u.quick_fix_impl_model=Xi(Lt(l,"global","",null,"explicit")):u.quick_fix_impl_model=Br(l,"global");return u}function F_(e,t){let n=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let r=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${n} (${r})`}function Ss(e){let t=Kt(e.pin)?e.pin:{},n=Kt(e.global)?e.global:{},r=Kt(e.resolution_global)?{...e.resolution_global}:{};delete r[e.key];let o=p=>{let b={...r,...p};return mn({pin:e.layer==="pin"?b:t,global:e.layer==="pin"?n:b,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},s=e.layer==="pin"?t:n,i={...s};delete i[e.key];let l=o(i)[e.key],a=o(s)[e.key],u=Nt(s[e.key]),d=[...e.choices];return u!==null&&!d.includes(u)&&d.unshift(u),{unset_label:F_(l,e.layer==="pin"),full_value:l.full_value,unavailable:l.resolution==="unavailable",disabled:a?.resolution==="not_applicable",options:d.map(p=>{let b=o({...s,[e.key]:p})[e.key];return{value:p,label:b.display,full_value:b.full_value}})}}function Ur(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let n=e.createElement("h2"),r=e.createElement("textarea"),o=e.createElement("div"),s=e.createElement("button"),i=e.createElement("button");return n.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",r.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",r.maxLength=4e3,o.className="resume-instructions-dialog__actions",s.type="button",s.textContent="\uC774\uC5B4\uD558\uAE30",i.type="button",i.textContent="\uCDE8\uC18C",o.append(s,i),t.append(n,r,o),e.body.append(t),new Promise(l=>{let a=!1,u=p=>{a||(a=!0,typeof t.close=="function"&&t.close(),t.remove(),l(p))},d=()=>u(r.value.trim());s.addEventListener("click",d),i.addEventListener("click",()=>u(null)),r.addEventListener("keydown",p=>{p.key==="Enter"&&(p.ctrlKey||p.metaKey)&&(p.preventDefault(),d())}),t.addEventListener("cancel",p=>{p.preventDefault(),u(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),r.focus()})}function Zi(e){return`session:${e.provider}:${e.session_id}`}function bo(e){return`${e.provider} \xB7 ${e.session_id.slice(0,8)}`}function j_(e,t){return e.current&&t==="in_progress"&&e.locality==="local"?"running":"done"}function Wr(e,t,n,r){return{attempt_id:Zi(e),session_ref:{bead_id:t,provider:e.provider,session_id:e.session_id},...typeof r=="string"&&r.length>0?{root_dir:r}:{},hide_prompt:!0,meta:{runner:e.provider,label:bo(e),session_id:e.session_id,...typeof e.resume_command=="string"&&e.resume_command.length>0?{resume_command:e.resume_command}:{},status:j_(e,n)}}}var Ji="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",B_="\uBD84\uD574 \uC5C6\uC74C \u2014 \uCD1D\uB7C9\uB9CC \uBCF4\uACE0\uB428",Sc="\uBD84\uD574 \uC5C6\uB294 leg";function Wt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Pn=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],zr=[...Pn,"reasoning_output_tokens"],U_={codex:["implementation","review-consult"],claude:["subagent"]};function ea(e){return!e||typeof e!="object"?!1:Number.isFinite(e.total_tokens)&&!Pn.some(t=>Number.isFinite(e[t]))}function W_(e){return!e||typeof e!="object"?!1:zr.some(t=>Number.isFinite(e[t]))}function ta(e){let t=0;for(let n of Pn)t+=Wt(e?.[n]);return t}function z_(e){return!e||typeof e!="object"?!1:Pn.some(t=>Number.isFinite(e[t]))}function Ec(e){return!e||typeof e!="object"?!1:zr.some(t=>Number.isFinite(e[t]))||Number.isFinite(e.total_tokens)}function H_(e){let t={};for(let n of zr)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function Tc(e){let t={};for(let n of zr)Number.isFinite(e[n])&&(t[n]=e[n]);return Number.isFinite(e.total_tokens)&&(t.total_tokens=e.total_tokens),e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function Cc(e,t){return ea(t)?Wt(t.total_tokens):e==="codex"?Wt(t.input_tokens)+Wt(t.output_tokens):ta(t)}function G_(e){return e==="claude"?"Claude":"Codex"}function K_(e){return`\u03C4 ${Oc(e)}`}function Y_(e,t){let n=t.breakdown||{},r=Wt(t.total_only_subtotal);if(ea(n)||r>0&&!W_(n)){let u=[`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,B_];return t.replayed&&u.push(Ji),u.join(`
`)}let o=[`\uC785\uB825 ${Wt(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Wt(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?o.push(`\uCE90\uC2DC\uC77D\uAE30 ${Wt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Wt(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(o.push(`\uCE90\uC2DC\uC77D\uAE30 ${Wt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${Wt(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&o.push(`\uCD94\uB860\uCD9C\uB825 ${Wt(n.reasoning_output_tokens).toLocaleString("en-US")}`)),r>0&&o.push(`${Sc} ${r.toLocaleString("en-US")}`);let s=e==="claude"?"\uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"\uC785\uB825 + \uCD9C\uB825",i=r>0?`${s} + ${Sc}`:s,a=[e==="claude"?`Claude subtotal = ${i}`:`Codex subtotal = ${i}; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset`,`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,o.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&a.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&a.push(Ji),a.join(`
`)}function en(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];r&&t.push({provider:n,label:`${G_(n)} ${K_(r.subtotal)}${typeof r.total_cost_usd=="number"&&Number.isFinite(r.total_cost_usd)?` \xB7 $${r.total_cost_usd.toFixed(2)}`:""}`,tooltip:Y_(n,r)})}return t}function Ts(e){let t={},n={claude:!0,codex:!1},r={claude:0,codex:0};for(let o of e)if(!(!o||!o.providers))for(let s of["claude","codex"]){let i=o.providers[s];if(!i)continue;let l=t[s];l||(l={subtotal:0,breakdown:{}},t[s]=l),l.subtotal+=i.subtotal,Number.isFinite(i.total_only_subtotal)&&(l.total_only_subtotal=Wt(l.total_only_subtotal)+Wt(i.total_only_subtotal));for(let a of zr)Number.isFinite(i.breakdown[a])&&(l.breakdown[a]=Wt(l.breakdown[a])+Wt(i.breakdown[a]));i.replayed&&(l.replayed=!0),s==="claude"&&(typeof i.total_cost_usd=="number"&&Number.isFinite(i.total_cost_usd)?r.claude+=i.total_cost_usd:n.claude=!1)}return t.claude&&n.claude&&(t.claude.total_cost_usd=r.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function na(e){return!e||typeof e!="object"?null:zn({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function V_(e){return e==="codex"?"codex":"claude"}function Mn(){return{subtotal:0,breakdown:H_(null),total_only:0,legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function Es(e,t,n){e.subtotal+=t.subtotal,ea(t.usage)&&(e.total_only+=t.subtotal);for(let r of zr)Number.isFinite(t.usage[r])&&(e.breakdown[r]=Wt(e.breakdown[r])+Wt(t.usage[r]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),n&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function Rc(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return e.total_only>0&&(n.total_only_subtotal=e.total_only),t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function Oc(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Hr(e){return z_(e)?`\u03C4 ${Oc(ta(e))}`:null}function Wn(e){let t=Hr(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function yo(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${Wt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Wt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Wt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Wt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${ta(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(Ji),n.join(`
`)}function zn(e,t){let n={claude:Mn(),codex:Mn()},r={orchestrator:{claude:Mn(),codex:Mn()},implementation:{claude:Mn(),codex:Mn()},"review-consult":{claude:Mn(),codex:Mn()},subagent:{claude:Mn(),codex:Mn()}},o=new Set;for(let l of Object.values(e||{})){if(!l||l.bead_id!==t)continue;let a=l.usage;if(Ec(a)){let d=V_(l.runner),p=Tc(a),b={provider:d,role:"orchestrator",attempt_id:String(l.attempt_id||""),usage:p,subtotal:Cc(d,p)};p.replayed===!0&&(b.replayed=!0),typeof l.model=="string"&&(b.model=l.model),typeof l.session_id=="string"&&(b.session_id=l.session_id),Es(n[d],b,!0),Es(r.orchestrator[d],b,!0)}let u=Array.isArray(l.usage_legs)?l.usage_legs:[];for(let d of u){let p=d&&d.provider==="claude"?"claude":"codex";if(!d||d.provider!=="codex"&&d.provider!=="claude"||!U_[p].includes(d.role)||!Ec(d.usage))continue;let b=typeof d.receipt_id=="string"&&d.receipt_id.length>0?d.receipt_id:null;if(!b||o.has(b))continue;o.add(b);let m=Tc(d.usage),$={provider:p,role:d.role,attempt_id:String(l.attempt_id||""),usage:m,subtotal:Cc(p,m)};$.receipt_id=b,typeof d.agent_type=="string"&&($.agent_type=d.agent_type),typeof d.agent_id=="string"&&($.agent_id=d.agent_id),typeof d.model=="string"&&($.model=d.model),typeof d.effort=="string"&&d.effort.trim().length>0&&($.effort=d.effort),typeof d.session_id=="string"?$.session_id=d.session_id:typeof d.thread_id=="string"&&($.session_id=d.thread_id),typeof d.turn_id=="string"&&($.turn_id=d.turn_id),(typeof d.completed_at=="string"||typeof d.completed_at=="number"&&Number.isFinite(d.completed_at))&&($.completed_at=d.completed_at),m.replayed===!0&&($.replayed=!0),Es(n[p],$,!1),Es(r[$.role][p],$,!1)}}let s={};for(let l of["claude","codex"]){let a=n[l];if(a.legs.length===0)continue;let u=Rc(a,!1);l==="claude"&&a.outer_count>0&&a.outer_cost_count===a.outer_count&&(u.total_cost_usd=a.outer_cost),s[l]=u}if(Object.keys(s).length===0)return null;let i={};for(let l of["orchestrator","implementation","review-consult","subagent"]){let a={};for(let u of["claude","codex"]){let d=r[l][u];d.legs.length>0&&(a[u]={...Rc(d,!0),legs:d.legs})}Object.keys(a).length>0&&(i[l]=a)}return{providers:s,roles:i}}var Lc={running:3,paused:2,failed:1};function Hn(e){if(!e||typeof e!="object")return!1;let t=e.kind;return t==null||t==="implementation"}function Ic(e){let t=Object.values(e||{}),n=new Map;for(let r of t){if(!r||typeof r.bead_id!="string"||r.bead_id.length===0||r.kind!=="review_session"||r.status!=="running")continue;let o=typeof r.started_at=="number"?r.started_at:null,s=n.get(r.bead_id);s&&(s.started_at??0)>(o??0)||n.set(r.bead_id,{attempt:r,origin:r.origin==="click"||r.origin==="auto"?r.origin:null,started_at:o})}return n}function Mc(e,t){let n=Object.values(e||{}),r=new Set,o=new Map;for(let i of n)!i||typeof i.bead_id!="string"||(typeof i.resumed_from=="string"&&i.resumed_from.length>0&&r.add(i.resumed_from),Hn(i)&&o.set(i.bead_id,i.attempt_id));let s=new Map;for(let i of n){if(!i||typeof i.bead_id!="string"||i.bead_id.length===0||!Hn(i))continue;let l=null;if(i.status==="running")l="running";else if(i.status==="paused"&&!r.has(i.attempt_id))l="paused";else if(i.status==="failed"||i.status==="orphaned"){let d=t.get(i.bead_id),p=typeof d=="number"&&d>0&&typeof i.finished_at=="number"&&d>=i.finished_at;o.get(i.bead_id)===i.attempt_id&&!p&&typeof i.dismissed_at!="number"&&(l="failed")}if(!l)continue;let a=typeof i.started_at=="number"?i.started_at:null,u=s.get(i.bead_id);if(u){let d=Lc[u.run_state],p=Lc[l];if(d>p||d===p&&(u.started_at??0)>(a??0))continue}s.set(i.bead_id,{attempt:i,run_state:l,started_at:a})}return{winners:s,resumed_from_ids:r}}var Cs=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],oa=[...Cs.filter(e=>e!=="impl_dispatch"),"quick_fix_impl_model"],Gn=["orchestration_model","orchestration_effort","orchestration_speed"],Gr=[...Cs,...Gn],Q_=oa.filter(e=>Gr.includes(e)),Pc=["delegated","main"],Rs=["inherit","claude","codex"],vo=["default","fast"],ko=["standard","fast_track"],wo=["codex","opus","fable","self","skip"],Os=["codex","fable","skip"],Ls=["low","medium","high","xhigh"],hn="auto";function gn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Dc(e){if(!gn(e)||!gn(e.runners))return[];let t=[];for(let[n,r]of Object.entries(e.runners))gn(r)&&gn(r.models)&&t.push([n,Object.keys(r.models)]);return t}function Kr(e,t){let n=Dc(e),r=t&&t!=="inherit"?n.filter(([o])=>o===t):n;return[hn,...r.flatMap(([,o])=>o)]}function Nc(e,t,n,r){if(!gn(e)||!gn(e.runners))return[hn];let o=[];for(let[s,i]of Object.entries(e.runners))if(!(!gn(i)||!gn(i.models))&&!(t&&t!=="inherit"&&s!==t))for(let[l,a]of Object.entries(i.models)){if(n&&n!==hn&&l!==n)continue;let u=r(i,a);if(Array.isArray(u))for(let d of u)typeof d=="string"&&!o.includes(d)&&o.push(d)}return[hn,...o]}function Yr(e,t,n){return Nc(e,t,n,(r,o)=>gn(o)&&Array.isArray(o.efforts)?o.efforts:r.efforts)}function sa(e,t,n){return Nc(e,t,n,(r,o)=>gn(o)&&Array.isArray(o.orchestration_efforts)?o.orchestration_efforts:gn(o)&&Array.isArray(o.efforts)?o.efforts:r.efforts)}function $o(e,t){let n=Dc(e);return(t?n.filter(([o])=>o===t):n).flatMap(([,o])=>o)}function qc(e,t,n){let r={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},o=r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:r.impl_runtime==="inherit"?n:null;return o&&(r.impl_model&&!Kr(t,o).includes(r.impl_model)&&(r.impl_model=void 0),r.impl_effort&&!Yr(t,o,r.impl_model||hn).includes(r.impl_effort)&&(r.impl_effort=void 0)),r}var X_={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},ra=[...Q_,...Gn],Z_=[...Gr,...oa].filter((e,t,n)=>n.indexOf(e)===t&&!ra.includes(e));function Fc(e,t){let n=gn(e)?e:{},r=gn(t)?t:{},o=[];for(let i of ra){let l=n[i]??null,a=r[i]??null;l!==a&&o.push({key:i,label:X_[i]||i,before:l,after:a,kind:l===null?"added":a===null?"removed":"changed"})}let s=[];for(let i of[...Z_,...Object.keys(r)])!ra.includes(i)&&!s.includes(i)&&Object.hasOwn(r,i)&&s.push(i);return{rows:o,ignored_keys:s}}function ia(e,t,n,r,o,s){return Ss({key:e,choices:t,layer:"global",global:n,resolution_global:s,execution_defaults:r,runner_catalog:o})}function jc(e,t){let n={};for(let r of oa){let o=e?.[r],s=t?.[r];o!==s&&(n[r]=typeof s=="string"&&s.length>0?s:null)}return n}function Bc(e,t){let n={};for(let r of Gn){let o=e?.[r]??null,s=t?.[r]??null;o!==s&&(n[r]=typeof s=="string"&&s.length>0?s:null)}return n}var aa=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Gn]}],or={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},Is={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function la(e,t,n,r,o,s=null){let i=mn({pin:t,global:n,execution_defaults:r,runner_catalog:o,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:s});return e.map(l=>({key:l,...i[l]}))}function Uc(e,t,n,r,o,s=null){let i={pin:0,global:0,base:0};for(let l of la(e,t,n,r,o,s))i[l.source]+=1;return i}function Wc(e,t,n){return{id:e,key:t,value:typeof n=="string"?n:""}}function zc(e,t,n){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:n}}var fw=[...Cs,...Gn];var Hc=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function xo(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Ms(e){if(!xo(e)||!xo(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>xo(n)&&xo(n.models));return t.length>0?t:null}function $n(e,t){let n=Ms(e);if(!n||!t)return null;for(let[r,o]of n)if(Object.hasOwn(o.models,t))return r;return null}function Gc(e,t){return xo(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function Kc(e,t){let n=Ms(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return Gc(r,r.models[t]);return[]}function J_(e){let t=Ms(e);if(!t)return[];let n=[];for(let[,r]of t)for(let o of Object.values(r.models))for(let s of Gc(r,o))n.includes(s)||n.push(s);return n}function em(e,t){if(!t)return J_(e);let r=Ms(e)?.find(([s])=>s===t)?.[1];if(!r)return[];let o=[];for(let s of Object.keys(r.models))for(let i of Kc(e,s))o.includes(i)||o.push(i);return o}function Yc(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},o=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!o)return r.impl_model="",r.impl_effort="",r;let s=$n(t,r.impl_model);if(r.impl_model&&(!o||s!==o))return r.impl_model="",r.impl_effort="",r;let i=r.impl_model?Kc(t,r.impl_model):em(t,o);return r.impl_effort&&i.length>0&&!i.includes(r.impl_effort)&&(r.impl_effort=""),r}var ca=new Set(["unavailable","not_applicable"]);function sr(e,t){if(typeof e!="object"||e===null)return null;let n=e[t];return typeof n=="object"&&n!==null?n:null}function Vc(e){return e.filter(t=>t!==null).join(" \xB7 ")}function ir(e,t){return t===null?null:`${or[e]}: ${t.display} (${Is[t.source]})`}function ua(e){return e.filter(t=>t!==null).join(`
`)}function da(e){if(typeof e!="object"||e===null)return null;let t=yr(e);if(t==="")return null;let n=(r,o)=>typeof o=="string"&&o.length>0?`${r}: ${o}`:null;return{text:t,title:ua(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",n("runner",e.runner),n(or.orchestration_model,e.model),n(or.orchestration_effort,e.effort),n(or.orchestration_speed,e.speed)])}}function Vr(e,t){let n=sr(e,"orchestration_model");if(n===null||n.resolution==="unavailable")return null;let r=sr(e,"orchestration_effort"),o=sr(e,"orchestration_speed"),s=Vc([$n(t,n.value??""),n.display,r!==null&&r.value!==null?r.display:null,o!==null&&o.value==="fast"?"Fast":null]);return s===""?null:{text:s,title:ua(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",ir("orchestration_model",n),ir("orchestration_effort",r),ir("orchestration_speed",o)])}}function tm(e,t){return e===null||e.value===null||ca.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function nm(e){return e===null||ca.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function rm(e){return e===null?null:e.value==="auto"?"auto":ca.has(e.resolution)?null:e.display}function vr(e,t){if(typeof e!="object"||e===null)return null;let n=sr(e,"impl_dispatch"),r=sr(e,"impl_runtime"),o=sr(e,"impl_model"),s=sr(e,"impl_effort"),i=sr(e,"impl_speed"),l=n!==null&&n.value==="main"?"\uBA54\uC778":Vc([tm(r,t??null),nm(o),rm(s),i!==null&&i.value==="fast"?"Fast":null]);return l===""?null:{text:l,title:ua(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",ir("impl_dispatch",n),ir("impl_runtime",r),ir("impl_model",o),ir("impl_effort",s),ir("impl_speed",i)])}}var om=["contract_change","multi_repo","open_design_fork","multi_phase","claude_bound"];var Qc={orchestration_model:["fable"],impl_runtime:["claude"]},sm={unapplied:"\uBBF8\uC801\uC6A9",applied:"\uC801\uC6A9\uB428",diverged:"\uCD94\uCC9C\uACFC \uB2E4\uB984"};function Xc(e){return typeof e=="object"&&e!==null?e:null}function Zc(e,t){return typeof e=="string"&&t.includes(e)?e:""}function im(e){return typeof e!="string"?[]:e.split("+").map(t=>t.trim()).filter(t=>om.includes(t))}function Ao(e,t=e){let n=Xc(e);if(!n)return null;let r=Zc(n.rec_orchestration_model,Qc.orchestration_model);if(r.length===0)return null;let o=Zc(n.rec_impl_runtime,Qc.impl_runtime),s={orchestration_model:r};o.length>0&&(s.impl_runtime=o);let i=Xc(t)||{},l=Object.keys(s),a=0,u=0;for(let p of l){let b=i[p];typeof b=="string"&&b.length>0&&(a+=1,b===s[p]&&(u+=1))}let d=a===0?"unapplied":u===l.length?"applied":"diverged";return{reasons:im(n.rec_reason),rec:s,state:d}}function Ps(e){if(!e||typeof e!="object")return"";let t=Array.isArray(e.reasons)?e.reasons:[],n=sm[e.state]||"",r=["\uBCF5\uC7A1\uD55C \uC791\uC5C5\uC73C\uB85C \uD310\uC815\uB428"];return t.length>0&&r.push(`\uC0AC\uC720: ${t.join(", ")}`),n.length>0&&r.push(`\uC0C1\uD0DC: ${n}`),r.join(`
`)}function Ds(e){return e.replace(/\/+$/,"")}function am(e,t){let n=Ds(e),r=Ds(t);return n===r||r.startsWith(`${n}/`)||n.startsWith(`${r}/`)}function Ns(e,t){let n=new Set;for(let r of e)for(let o of t){if(!am(r,o))continue;let s=Ds(r),i=Ds(o);n.add(s.length>=i.length?s:i)}return[...n].sort()}function pa(e,t){return`${e}\0${t}`}function Jc(e){let t=new Map;for(let n of Array.isArray(e?.running)?e.running:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"running",state:"running"});for(let n of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let n of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let r=Array.isArray(n.sublanes?.parallel)?n.sublanes.parallel:Array.isArray(n.items)?n.items:[];for(let o of r)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:"parallel",position:o.queue_position});for(let o of Array.isArray(n.sublanes?.serial)?n.sublanes.serial:[])for(let s of o.items)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:o.id,position:s.queue_position})}for(let n of Array.isArray(e?.runnable)?e.runnable:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"runnable",state:"runnable"});for(let n of Array.isArray(e?.done)?e.done:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"done",state:"done"});return t}function fa(e,t){let n=Array.isArray(t)?t:[],r=e.indexOf("-"),o=r>0?e.slice(0,r):e;return n.some(s=>typeof s?.issue_prefix=="string"&&s.issue_prefix===o)?"internal":n.length>0&&n.every(s=>typeof s?.issue_prefix=="string")?"external":"unknown"}function So(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function eu(e,t,n,r){let o=n.get(e);if(!!(o&&t&&o.root_dir===t.root_dir&&o.lane===t.lane&&typeof o.position=="number"&&typeof t.position=="number"&&o.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0};if(o)return{id:e,label:`\u{1F512} ${e} (${So(o)})`,location_label:So(o),scope:null,same_lane_ahead:!1};let i=fa(e,r),l=i==="internal"?"\uBBF8\uC801\uC7AC":i==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${l})`,location_label:l,scope:i,same_lane_ahead:!1}}function tu(e){let t=Array.isArray(e)?e:[],n=new Map,r=new Map,o=new Map;for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let u=pa(l.root_dir,a.id);n.set(u,{root_dir:l.root_dir,workspace_name:l.name,lane:a.id}),o.set(u,[]);for(let d of Array.isArray(a.items)?a.items:[])r.set(d.id,u)}for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let u=pa(l.root_dir,a.id),d=Array.isArray(a.items)?a.items[0]:null,b=!!d&&d.queue_index===0&&(!Array.isArray(a.occupied_by)||a.occupied_by.length===0)&&Array.isArray(d.blocked_by)?d.blocked_by:[],m=o.get(u);if(m)for(let $ of b){let C=r.get($);C&&C!==u&&!m.includes(C)&&m.push(C)}}let s=(l,a)=>{let u=new Set,d=[l];for(;d.length>0;){let p=d.pop();if(p===a)return!0;!p||u.has(p)||(u.add(p),d.push(...o.get(p)||[]))}return!1},i=new Map;for(let[l,a]of o){let u=[];for(let d of a){let p=n.get(d);s(d,l)&&p&&u.push(p)}u.length>0&&i.set(l,u)}return i}function nu(e,t){return pa(e,t)}async function lm(e){let t=await sn(e);pe(t?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",t?"success":"error",1200)}function Qr(e){return typeof e!="string"||e.length===0?"":c`<span class="worker-ev__copyline"
    ><code class="worker-ev__path">${e}</code
    ><button
      type="button"
      class="worker-ev__copy"
      data-seam="log-path-copy"
      title="로그 경로 복사"
      aria-label=${`\uB85C\uADF8 \uACBD\uB85C \uBCF5\uC0AC: ${e}`}
      @click=${()=>{lm(e)}}
    >
      ⧉
    </button></span
  >`}function Fs(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function ou(e){return e==="session"?"bead\uAC00 in_progress\uB85C \uC7A1\uD78C \uB4A4 \uB2EB\uD788\uAE30\uAE4C\uC9C0\uC758 \uACBD\uACFC":"attempt \uC2E4\uD589 \uC2DC\uAC04 \uD569\uC0B0 (\uC7AC\uAC1C \uC138\uC158 \uD3EC\uD568)"}function kr(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let n=Math.floor(t/60);if(n<60)return`${n}\uBD84 ${Math.round(t-n*60)}\uCD08`;let r=Math.floor(n/60),o=n%60;return`${r}\uC2DC\uAC04 ${o}\uBD84`}function su(e,t){if(typeof e!="object"||e===null)return[];let n=!1,r=!1;for(let o of Object.values(e)){if(typeof o!="object"||o===null)continue;let s=o;s.bead_id!==t||s.kind!=="review_session"||(n=!0,r=r||s.origin==="auto")}return n?[r?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"]:[]}function iu(e,t){if(typeof e!="object"||e===null)return{active:!1,failure:null};let n=!1,r=null,o=-1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let i=s;if(i.bead_id!==t||i.kind!=="review_session")continue;if(i.status==="pending"||i.status==="running"){n=!0;continue}if(i.status!=="failed")continue;let l=typeof i.finished_at=="number"?i.finished_at:0;l>=o&&(o=l,r=typeof i.cause=="string"&&i.cause.length>0?i.cause:null)}return n?{active:!0,failure:null}:{active:!1,failure:r}}function au(e,t){if(typeof e!="object"||e===null)return null;let n=0,r=!1;for(let o of Object.values(e)){if(typeof o!="object"||o===null)continue;let s=o;if(s.bead_id!==t)continue;let i=s.started_at,l=s.finished_at;typeof i!="number"||typeof l!="number"||!Number.isFinite(i)||!Number.isFinite(l)||l<i||(n+=l-i,r=!0)}return r?n:null}function js(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function cm(e,t){let n=Array.isArray(e)?e:[],r=Array.isArray(t)?t:[];if(n.length===0&&r.length===0)return null;let o=null;for(let i of n)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!o||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof o.finished_at=="number"?o.finished_at:0))&&(o=i);let s=n.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+r.length;return{deploy:o?{sha:Fs(o.target_sha),at:typeof o.finished_at=="number"?o.finished_at:null,elapsed_ms:typeof o.elapsed_ms=="number"?o.elapsed_ms:null}:null,unresolved:s,badge:s>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${s}`}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function lu(e,t){let n=cm(e,t);return n?c`<button
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
            >${js(n.deploy.at)}${n.deploy.elapsed_ms!==null?` \xB7 ${kr(n.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${n.badge.tone}"
      >${n.badge.label}</span
    >
  </button>`:""}function Xr(e){let t=on(e.created_at),n=on(e.updated_at);return!t&&!n?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${Yt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&n?c`<span>·</span>`:""}${n?c`<span title=${`\uC218\uC815 ${Yt(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </div>`}function um(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function Eo(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function Bs(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function Kn(e,t,n={}){let o=Object.values(e&&typeof e=="object"?e:{}).filter(p=>p&&p.bead_id===t&&p.phase!=="done").sort((p,b)=>(p.requested_at||0)-(b.requested_at||0)).at(-1),s=typeof n.attempt_id=="string"&&n.attempt_id.length>0?n.attempt_id:typeof o?.attempt_id=="string"?o.attempt_id:null,i=n.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":n.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":n.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,l=typeof o?.last_error=="string"?o.last_error:null,a=o?um(o.phase):null,u=o?.kind==="stale_work_backup_fresh",d=n.merged||o?.mode==="merged_revert"?"merged":"unmerged";return{action:!n.external&&!n.done,enabled:!i&&(!o||!!l),label:u?l?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":l?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:i||(l?u?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${l} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${l} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:o?`${a||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:d==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:s,operation:o||null,progress:a,error:l,confirmation:d}}function cu(e){if(!e||e.quickfix_lane!==!0)return!1;let t=e.quickfix_landing;return!t||typeof t!="object"?!1:["repo_operations","branch_cleanup","parent_close"].includes(t.cursor)}function qs(e){let t=e.discard;if(!t||!t.operation)return"";let n=t.operation,r=n.kind==="stale_work_backup_fresh"&&!t.error?null:n.backup?.path,o=n.original_pr,s=n.revert_pr;return c`<div
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
  </div>`}var dm={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function uu(e,t=!1){if(!e||typeof e!="object")return null;let n=e;if(n.reason!=="worktree_stale_work"||!n.stale_work||typeof n.stale_work!="object")return null;let r=n.stale_work,o=r.residue==="branch"?"branch":"worktree",s=r.state==="unique"?"unique":"unknown",i=r.summary&&typeof r.summary=="object"?r.summary:{};function l(u){return Number.isInteger(i[u])?Number(i[u]):0}let a=typeof r.cause=="string"?r.cause:"observe_failed";return{residue:o,state:s,title:o==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":s==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:dm[a]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:o==="branch"?`\uACE0\uC720 commit ${l("branch_ahead")}`:[`staged ${l("staged_count")}`,`unstaged ${l("unstaged_count")}`,`untracked ${l("untracked_count")}`,`branch ahead ${l("branch_ahead")}`,`HEAD ahead ${l("head_ahead")}`].join(" \xB7 "),action_id:typeof r.action_id=="string"?r.action_id:"",can_resume:r.can_resume===!0,can_continue:r.can_continue===!0,can_backup_fresh:r.can_backup_fresh===!0,can_recheck:r.can_recheck===!0,locked:t}}function Us(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let n=t.pin===!0?" exec-chip--pin":"",r=t.pin===!0?`
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
      >`:""}`}function pm(e){return c`<div
    class="mon-overlap__popover"
    role="dialog"
    aria-label="scope 겹침"
  >
    ${e.rows.map(t=>c`<div class="mon-overlap__row">
          <div class="mon-overlap__hd">
            <span class="mon-overlap__rid">${t.id}</span>
            <span class="mon-overlap__rtitle">${t.title}</span>
            <span class="mon-overlap__rwhere">${t.location_label}</span>
          </div>
          <ul class="mon-overlap__paths">
            ${t.prefixes.map(n=>c`<li>${n}</li>`)}
          </ul>
          ${t.action.kind==="note"?c`<p class="mon-overlap__note">${t.action.text}</p>`:c`<button
                type="button"
                class="mon-overlap__place"
                data-counterpart-id=${t.id}
                ?disabled=${t.action.kind==="disabled"}
                title=${t.action.title}
              >
                ${t.action.label}
              </button>`}
        </div>`)}
  </div>`}function Ws(e){if(!e)return"";let t=Array.isArray(e.predecessors)?e.predecessors:[],n=Array.isArray(e.released)?e.released:[],r=e.dependents||null,o=Array.isArray(e.overlaps)?e.overlaps:[],s=e.scope_missing===!0,i=e.popover||null,l=e.cross_lane||null,a=e.armed_lane||null;return t.length===0&&n.length===0&&!r&&o.length===0&&!s&&!l&&!a?"":c`<div class="worker-deps">
    ${l?c`<button
          type="button"
          class="worker-dep worker-dep--lane mon-lane__chip"
          data-lane-id=${l.lane_id}
          title="이 연결 레인으로 이동"
        >
          ${l.label}
        </button>`:""}
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
        >`:""}
    ${t.map(u=>c`<span
          class=${`worker-dep worker-dep--pred${u.foreign?" worker-dep--foreign":""}`}
          title=${u.title||""}
          >${u.openable===!0?c`<button
                type="button"
                class="worker-dep__label worker-dep__open"
                data-dep-id=${u.id}
                data-root-dir=${u.root_dir||""}
              >
                ${u.label}
              </button>`:u.label}</span
        >`)}${n.map(u=>c`<span
          class=${`worker-dep worker-dep--released${u.foreign?" worker-dep--foreign":""}`}
          title=${u.title||""}
          >${u.openable===!0?c`<button
                type="button"
                class="worker-dep__label worker-dep__open"
                data-dep-id=${u.id}
                data-root-dir=${u.root_dir||""}
              >
                ${u.label}
              </button>`:u.label}</span
        >`)}${r?c`<span
          class="worker-dep worker-dep--dependents"
          title=${r.title}
          >→ 후속 ${r.count}</span
        >`:""}${o.map(u=>c`<button
          type="button"
          class="worker-dep worker-dep--overlap mon-overlap__chip"
          data-overlap-id=${u.id}
          aria-label=${`scope \uACB9\uCE68 ${u.id} (${u.location_label})`}
          title=${[`\uACB9\uCE68 ${u.id} (${u.location_label})`,...u.prefixes].join(`
`)}
        >
          ⧉ ${u.id}
        </button>`)}${s?c`<span
          class="worker-dep worker-dep--muted"
          title="겹침 판정 불가 — 아티팩트가 있으면 스펙/플랜 front-matter, 없으면 description \`## scope\`에 선언 필요"
          >scope 없음</span
        >`:""}${i?pm(i):""}
  </div>`}function zs(e){if(!e)return"";let t=e.chips||{},n=t.route||e.route,r=t.route_source==="derived"||e.route_source==="derived";return n?c`<span
    class="ctl-chip ctl-chip--route${r?" is-derived":""}"
    title=${r?"route \uBBF8\uD540 (metadata unset)":"route"}
    >${r?"unset":n}</span
  >`:""}function fm(e){let t=e?e.quick_fix_review:null;if(!t)return"";let n=t.state;if(n!=="reviewed"&&n!=="stale")return"";let r=Array.isArray(t.missing)?t.missing:[],o=[n==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",...r].join(`
`);return c`<span
    class="ctl-chip worker-card__qfr worker-card__qfr--${n}"
    title=${o}
    >${n==="reviewed"?"\uB9AC\uBDF0 \u2713":"\uB9AC\uBDF0 stale"}</span
  >`}function du(e){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--from"
    data-from-id=${e}
    title=${`\uCD9C\uCC98 ${e} \uC5F4\uAE30`}
  >
    ↩ from ${e}
  </button>`:""}function Hs(e){return e?c`<span
    class="ctl-chip ctl-chip--label worker-card__rec"
    data-state=${e.state}
    title=${Ps(e)}
    >${"\uBCF5\uC7A1"}</span
  >`:""}function pu(e,t){return!e||typeof t!="number"?"":c`<a
    class="worker-mini__pr"
    href=${e}
    target="_blank"
    rel="noreferrer noopener"
    title="PR 열기"
    >#${t} ↗</a
  >`}function Gs(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=Math.max(0,Math.min(4,Math.trunc(e)));return c`<span class="worker-pri" title=${`\uC6B0\uC120\uC21C\uC704 P${t}`}
    >P${t}</span
  >`}function _m(e){let t=Array.isArray(e.badges)?e.badges:[],n=en(e.usage),r=Wn(e.usage),o=on(e.done_at);return c`<div
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
      ${pu(e.pr_url,e.pr_number)}${o?c`<span
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
              >`):r?c`<span class="worker-usage" title=${yo(e.usage)}
              >${r}</span
            >`:""}
      ${typeof e.work_ms=="number"?c`<span
            class="worker-mini__work"
            title=${ou(e.work_kind)}
            >작업 ${kr(e.work_ms)}</span
          >`:""}
    </div>
  </div>`}function xn(e,t={}){if(e.lane==="done"&&e.done_layout==="three_line")return _m(e);let n=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],o=en(e.usage),s=Wn(e.usage),i=e.merge_step||null,l=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,a=e.lane==="done"&&!l,u=a?on(e.done_at):"",d=n?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",p=typeof e.seq=="number"?c`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",b=e.worker_serial===!0?c`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",m=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",$=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,C=e.lane==="done"?"":zs(e.workflow),j=e.lane==="done"?"":du(e.from_id),K=Gs(e.priority),ie=c`<span class="worker-mini__title">${e.title}</span>`,ee=pu(e.pr_url,e.pr_number),F=r.map(xe=>xe===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${xe}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${xe===e.completion_badge&&e.completion_title||""}
          >${xe}</span
        >`),P=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",L=o.length>0?o.map(xe=>c`<span class="worker-usage" title=${xe.tooltip}
              >${xe.label}</span
            >`):s?c`<span class="worker-usage" title=${yo(e.usage)}
            >${s}</span
          >`:"",z=i?c`<span
        class="merge-step${i.failed?" merge-step--failed":""}"
        style=${`--progress: ${i.percent}%`}
        >${i.label}${i.index>0?c`<span class="merge-step__n"
              >${i.index}/${i.total}</span
            >`:""}</span
      >`:"",V=e.merge_action?c`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",ne=e.cancel_action?c`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",N=e.discard,Q=N?.action||e.discard_action?c`<button
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
        </button>`:"",G=e.stale_work||null,X=G?c`${G.can_resume||G.can_continue?c`<button
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
          </button>`:""}`:"",Re=G?c`<div class="worker-mini__stale">
        <strong>${G.title}</strong>
        <span>${G.summary}</span>
        <span>${G.cause}</span>
        ${G.can_backup_fresh?c`<small
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
        </button>`:"",ce=!!(e.lane!=="pr_wait"&&!e.done&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)),q=Hs(e.rec),$e=Qr(e.log_path),Se=m||C||j||ce||q||L||$e?c`<div class="worker-chips">
          ${m}${C}${j}${ce?Us(e.exec_chips,{pin:e.exec_chips_pinned===!0}):""}${q}${L}${$e}
        </div>`:"",S=Ws(e.dependency_chips),Z=qs(e),Te=t.actions?t.actions:"",_e=!!(i||e.merge_action||e.cancel_action||e.discard_action||N?.operation||e.revise_action||G);return c`<div
    class="worker-mini${l?" worker-mini--card":""}${n?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${i?" worker-mini--merging":""}${i?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${i?`--progress: ${i.percent}%`:""}
    draggable=${n?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${a?c`<div class="worker-mini__row1">
            ${m}${$}${K}${j}${ee}${ie}${Te}
          </div>
          <div class="worker-mini__row2">
            ${L}${u?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${Yt(e.done_at)}`}
                  >완료 ${u}</span
                >`:""}${typeof e.work_ms=="number"?c`<span
                  class="worker-mini__work"
                  title=${ou(e.work_kind)}
                  >작업 ${kr(e.work_ms)}</span
                >`:""}${F}${z}
            <span class="worker-mini__actions"
              >${V}${ne}${Q}</span
            >
            ${Xr(e)}
          </div>`:l?c`<div class="worker-mini__head">
              ${d}${p}${$}${K}${ee}${F}${b}${P}${Te}
            </div>
            <div class="worker-mini__body">${ie}${Re}</div>
            ${S}${Se}${_e?c`<div class="worker-mini__foot">
                  ${z}
                  <span class="worker-mini__actions"
                    >${V}${ne}${Q}${we}${X}</span
                  >
                  ${qs(e)}
                </div>`:""}
            ${Xr(e)}`:c`<div class="worker-mini__line">
              ${d}${p}${$}${K}${ie}${ee}${F}${b}${P}${z}${V}${ne}${Q}${Te}
            </div>
            ${S}${Se}${Z} ${Xr(e)}`}
  </div>`}function mm(e,t){let n,r=[];for(let o of e){let s=o.group||"";s.length>0&&s!==n&&r.push(c`<div class="worker-card__place-group">${s}</div>`),n=s,r.push(c`<button
        type="button"
        class="worker-card__place-lane${s.length>0?" worker-card__place-lane--nested":""}"
        data-bead-id=${t}
        data-lane=${o.id}
        ?disabled=${o.disabled===!0}
        title=${o.title||`${o.label} \uB300\uAE30 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00`}
      >
        <span>${o.label}</span>
        ${typeof o.count=="number"?c`<span class="worker-card__place-count">${o.count}</span>`:""}
      </button>`)}return c`${r}`}var gm={exclusive_machine:"\uC2E4\uD589 \uC911 \uBA38\uC2E0 \uB3C5\uC810 \uD544\uC694 \u2014 \uBD80\uD558 \uD558\uB124\uC2A4\xB7timing \uBE44\uAD50",iterative_user_judgment:"\uAD6C\uD604 \uC911 \uC0AC\uC6A9\uC790 \uD310\uB2E8 \uBC18\uBCF5 \uAC1C\uC785 \uD544\uC694 \u2014 \uBB38\uC548\xB7\uB808\uC774\uC544\uC6C3\xB7\uC124\uACC4 \uBBF8\uC138\uC870\uC815",visual_verification:"\uB80C\uB354 \uACB0\uACFC \uC0AC\uB78C \uD655\uC778 \uD544\uC694 \u2014 \uC2A4\uD06C\uB9B0\uC0F7\xB7\uBAA9\uC5C5\xB7\uB77C\uC774\uBE0C \uD398\uC774\uC9C0"},Ks="\uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694";function ma(e,t=null,n={}){let r=e.worker_ineligible===!0,o=e.draggable&&!e.done&&!r,s=e.queue_placeable===!0&&!e.done&&!r,i=s&&t&&t.bead_id===e.id,l=e.session_preferred===!0,a=gm[e.session_preferred_reason||""]||"",u=e.workflow,d=typeof e.reason=="string"?e.reason.split(" \xB7 "):[],p=d.includes("missing_description"),b=d.some(ee=>ee.startsWith(Ks)),m=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),$=Ws(e.dependency_chips),C=e.workspace_name?c`<span class="worker-card__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",j=zs(u),K=du(e.from_id),ie=!!(e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker));return c`<div
    class="worker-card${o?"":" worker-card--static"}${r?" worker-card--ineligible":""}"
    draggable=${o?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${o?c`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span
      >${Gs(e.priority)}
      ${r?c`<span
            class="ctl-chip ctl-chip--label worker-card__ineligible"
            title="worker-ineligible label이 붙어 워커 실행 대상이 아닙니다"
            >worker-ineligible</span
          >`:l?c`<span
              class="ctl-chip ctl-chip--label worker-card__session-preferred"
              title=${a}
              >세션 권장</span
            >`:""}${Hs(e.rec)}${fm(u)}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${u?ws(u,e.status,{onOpenDoc:n.onOpenDoc}):""}${$}
    ${C||j||K||ie?c`<div class="worker-chips">
          ${C}${j}${K}${Us(e.exec_chips,{pin:n.exec_chips_mode==="pinned_only"})}
        </div>`:""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${i?c`<div class="worker-card__place-menu">
            ${mm(t.lanes,e.id)}
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
              title=${s?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":r?"worker-ineligible label\uB85C \uC6CC\uCEE4\uC5D0\uC11C \uC2E4\uD589\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":b?"\uC0AC\uC6A9\uC790 \uB9AC\uBDF0\uB97C \uAE30\uB2E4\uB9AC\uB294 \uC911\uC774\uB77C \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":p?"description\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"spec\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
            >
              대기로 ↴
            </button>`}
    </div>
    ${Xr(e)}
  </div>`}function Dn(e){let t=!!e.collapsible&&!!e.collapsed,n=typeof e.count=="number"?e.count:e.items.length,r=c`<span
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
                  </div>`:e.items.map(o=>e.lane==="candidate"?ma(o,e.place_menu,{onOpenDoc:e.onOpenDoc}):xn(o))}
          </div>`}
  </section>`}function ru(e,t,n){return c`<button
      type="button"
      class="worker-wait__area-toggle"
      data-area=${e}
      aria-expanded=${n?"false":"true"}
      aria-label=${`${t} ${n?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
    >
      ${n?"\u25B8":"\u25BE"}
    </button>
    <span class="worker-wait__area-name">${t}</span>`}function Ys(e){let t=e.parallel,n=e.serial,r=t.drop||{};return c`<div class="worker-wait">
    <section
      class="worker-wait__area worker-wait__area--parallel${t.collapsed?" is-collapsed":""}"
      data-area="parallel"
    >
      <header class="worker-wait__area-hd">
        ${ru("parallel","\uBCD1\uB82C \uC601\uC5ED",t.collapsed)}
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
        ${ru("serial","\uC9C1\uB82C \uC601\uC5ED",n.collapsed)}
        ${n.header_control?n.header_control:""}
      </header>
      ${n.collapsed?"":c`<div class="worker-wait__area-body">
            ${n.notice?n.notice:""}
            ${n.extra_panes?n.extra_panes:""}
            ${n.lanes.map(o=>hm(o))}
          </div>`}
    </section>
  </div>`}function hm(e){let t=e.drop||{},n=e.badge?c`<span
        class="worker-lane__badge${e.held?" worker-lane__badge--held":""}"
        >${e.badge}</span
      >`:"";return c`<div
    class="worker-wait__lane${e.empty?" worker-wait__lane--empty":""}"
  >
    ${Dn({id:typeof e.pane_id=="string"?e.pane_id:`worker-pane-lane-${e.id}`,lane:e.id,title:e.title,items:[],count:e.count,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:c`${n}${e.header_control?e.header_control:""}`,body:c`<div
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
  </div>`}function Vs(e){return e.count?c`<section
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
  </section>`:""}var fu=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],To=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function Qs(e,t){let n=fu.find(o=>o.step===e);if(!n)return null;let r=fu.length;return{step:n.step,label:t,index:n.index,total:r,percent:Math.round(n.index/r*100)}}function _u(e){let t=To.findIndex(n=>n.step===e);return To.map((n,r)=>({step:n.step,label:n.label,state:t<0?"todo":r<t?"done":r===t?"stall":"todo"}))}function wr(e){let t=To.find(n=>n.step===e);return t?t.label:typeof e=="string"?e:""}function bm(e){let t=To.findIndex(n=>n.step===e);return t<0?null:{index:t+1,total:To.length}}function Xs(e){let t=bm(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var ha=new Set(["queued","running","retry_pending"]),mu=new Set(["failed","succeeded"]),ym={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},Co={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},vm={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:Co.base_containment,child_sweep:Co.child_sweep,branch_cleanup:Co.branch_cleanup,parent_close:Co.parent_close};function km(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function wm(e,t,n){return!["verify","deploy"].includes(e.kind)||![...ha,...mu].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(r=>r&&typeof r=="object"&&r.bead_id===t&&r.merged_sha===n)}function $m(e,t){let n=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(n!==0)return n;let r=u=>u.state==="succeeded"?1:2,o=r(t)-r(e);if(o!==0)return o;let s=typeof e.requested_at=="number"?e.requested_at:0,i=typeof t.requested_at=="number"?t.requested_at:0;if(s!==i)return i-s;let l=typeof e.operation_id=="string"?e.operation_id:"",a=typeof t.operation_id=="string"?t.operation_id:"";return l.localeCompare(a)}function ga(e,t=!1){let n=e.kind,r=n==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",o=t?"failed":e.state,s=ym[o];if(!s)return null;let i=Qs(n,`${r} ${s}`);return i?{...i,active:ha.has(o),failed:o==="failed"}:null}function xm(e){return!e||typeof e!="object"?null:vm[e.step]||null}function Ro(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,n=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},r=xm(n),o=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,s=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),i=!s&&(e.cleanup_cursor==="repo_operations"||n.step==="repo_operations"),l=km(e.merge_sha)?e.merge_sha:null,a=!s&&l&&Array.isArray(e.repo_operations)?e.repo_operations.filter($=>$&&typeof $=="object"&&wm($,t,l)).sort($m):[],u=i?a:[],d=u.find($=>ha.has($.state));if(d)return ga(d);if(o)return o.step==="repo_operations"&&a[0]?ga(a[0],!0):null;let p=u.find($=>mu.has($.state)?$.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(p)return ga(p);if(r){let $=Qs(r.step,r.label);return $?{...$,active:!0,failed:!1}:null}let b=typeof e.cleanup_cursor=="string"?Co[e.cleanup_cursor]:null;if(!b)return null;let m=Qs(b.step,b.label);return m?{...m,active:!0,failed:!1}:null}function Zs(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var Am="\uBBF8\uC801\uC7AC";function ba(e,t){let n=_o(e,t.id);return{id:t.id,label:`\u26D3 blocked: ${t.id}`,title:`\uC774 \uC774\uC288\uB294 ${t.id}\uAC00 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4 (${t.location_label})`,...n?{foreign:!0}:{}}}var Sm=10080*60*1e3;function gu(e,t,n){let r=t.closed_at;if(typeof r!="number"||!Number.isFinite(r)||r<n-Sm)return null;let o=_o(e,t.id),s=typeof t.root_dir=="string"?t.root_dir:"",i={id:t.id,label:`\u{1F513} \uD574\uC81C: ${t.id}`,title:`${t.id}\uAC00 ${Yt(r)}\uC5D0 close\uB418\uC5B4 \uC774 \uC774\uC288\uAC00 \uD480\uB838\uB2E4`,...o?{foreign:!0}:{}};return o?s.length>0&&(i.openable=!0,i.root_dir=s):i.openable=!0,i}function hu(e){let t=e.count;if(typeof t!="number"||!Number.isFinite(t)||t<=0)return null;let n=Array.isArray(e.ids)?e.ids.filter(s=>typeof s=="string"&&s.length>0):[],r=t-n.length,o=[n.join(", "),r>0?`\uC678 ${r}`:""].filter(s=>s.length>0);return{count:t,title:`\uC774 \uC774\uC288\uAC00 close\uB418\uBA74 \uD480\uB9AC\uB294 \uC774\uC288: ${o.join(" ")}`}}function bu(e,t,n={}){let r=new Map,o=new Map;for(let s of t)o.has(s.id)||o.set(s.id,s.location_label);for(let[s,i]of e){if(typeof s!="string"||s.length===0)continue;let l=[];for(let a of Array.isArray(i)?i:[]){if(typeof a!="string"||a.length===0)continue;let u=ba(s,{id:a,location_label:o.get(a)||Am}),d=n[a];u.foreign!==!0?u.openable=!0:typeof d=="string"&&d.length>0&&(u.openable=!0,u.root_dir=d),l.push(u)}l.length>0&&r.set(s,l)}return r}var ei=1,Oo=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],ka=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Zr={show_blocked:!0,spec:"all"},yu={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"};function Em(e,t){let n=null;for(let r of Object.values(e||{}))!r||r.bead_id!==t||!Hn(r)||(n=typeof r.status=="string"?r.status:null);return n}function Tm(e,t){let n=null,r=-1/0;for(let o of Object.values(e)){if(!o||o.bead_id!==t||o.status==="running"||!Hn(o))continue;let s=typeof o.finished_at=="number"?o.finished_at:typeof o.started_at=="number"?o.started_at:0;s>=r&&(r=s,n=o)}return n}function Cm(e,t,n={}){let{winners:r,resumed_from_ids:o}=Mc(e,t),s=new Map;for(let[i,l]of r){let a=l.attempt,u=l.run_state,d=l.started_at,p=typeof a.session_id=="string"&&a.session_id.length>0,b=u!=="running"&&p&&!o.has(a.attempt_id),m=p?o.has(a.attempt_id)?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00",$=mt(n.observations?.[i]),C=mt($.pr),j=typeof a.merge_sha=="string"&&a.merge_sha.length>0||C.state==="MERGED",K=Kn(n.discard_operations,i,{attempt_id:a.attempt_id,merged:j}),ie=u==="failed"?ku(a,{resume_eligible:b,resume_reason:m,confirmation:K.confirmation,history:n.bead_timelines?.[i]}):null;s.set(i,{...vu(a,e,u),started_at:d,...ie?{failure:ie}:{},can_pause:u==="running"&&p,can_resume:b})}for(let[i,l]of Lm(e,t)){if(s.has(i))continue;let a=l.attempt,u=Kn(n.discard_operations,i,{attempt_id:a.attempt_id}),d=Au(a);s.set(i,{...vu(a,e,l.run_state),started_at:typeof a.started_at=="number"?a.started_at:null,...l.run_state==="parked"?{failure:ku(a,{resume_eligible:!1,resume_reason:"\uC138\uC158 \uB300\uAE30 \u2014 [\uC7AC\uC2DC\uB3C4]\uAC00 \uC0C8 attempt\uB97C \uB744\uC6C1\uB2C8\uB2E4",confirmation:u.confirmation,history:n.bead_timelines?.[i]})}:{},...d?{retry:d}:{},can_pause:!1,can_resume:!1})}return s}function vu(e,t,n){return{attempt_id:typeof e.attempt_id=="string"?e.attempt_id:"",run_state:n,last_event_at:typeof e.last_event_at=="number"?e.last_event_at:null,last_activity:e.last_activity&&typeof e.last_activity=="object"?e.last_activity:null,legs:Array.isArray(e.legs)?e.legs:[],runner:typeof e.runner=="string"?e.runner:null,model:typeof e.model=="string"?e.model:null,effort:typeof e.effort=="string"?e.effort:null,speed:typeof e.speed=="string"?e.speed:null,resumed_from:typeof e.resumed_from=="string"?e.resumed_from:null,continuation_mode:e.continuation_mode==="session"||e.continuation_mode==="fresh"?e.continuation_mode:null,status:typeof e.status=="string"?e.status:null,usage:zn(t,e.bead_id)}}function ku(e,t){let n=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null;return{cause:typeof e.cause=="string"?e.cause:null,cause_detail:n,summary:n&&typeof n.summary=="string"?n.summary:null,bead_id:typeof e.bead_id=="string"?e.bead_id:"",finished_at:typeof e.finished_at=="number"?e.finished_at:null,runner:typeof e.runner=="string"?e.runner:null,model:typeof e.model=="string"?e.model:null,effort:typeof e.effort=="string"?e.effort:null,observed_effort:typeof e.observed_effort=="string"?e.observed_effort:null,speed:typeof e.speed=="string"?e.speed:null,attempt_id:typeof e.attempt_id=="string"?e.attempt_id:"",usage:e.usage&&typeof e.usage=="object"?e.usage:null,halted_auto_advance:e.halted_auto_advance===!0,quickfix_lane:e.quickfix_lane===!0,quickfix_landing:e.quickfix_landing&&typeof e.quickfix_landing=="object"?e.quickfix_landing:null,retry:Au(e),resume_eligible:t.resume_eligible,resume_reason:t.resume_reason,landed:cu(e),confirmation:t.confirmation,...Rm(t.history)}}function Rm(e){if(!e||typeof e!="object")return{};let t=Array.isArray(e.events)?e.events:[],n=[];for(let o of t)!o||typeof o!="object"||typeof o.summary!="string"||o.summary.length===0||n.push({event_id:typeof o.event_id=="string"?o.event_id:"",kind:typeof o.kind=="string"?o.kind:"",summary:o.summary,at:typeof o.at=="number"?o.at:null});n.reverse();let r=typeof e.log_path=="string"&&e.log_path.length>0?e.log_path:null;return{...n.length>0?{timeline:n}:{},...r===null?{}:{log_path:r},...e.log_expired===!0?{log_expired:!0}:{}}}function Au(e){let t=e&&e.retry&&typeof e.retry=="object"?e.retry:null;return t?{cause:typeof t.cause=="string"?t.cause:null,attempts:typeof t.attempts=="number"?t.attempts:0,max:typeof t.max=="number"?t.max:0,next_at:typeof t.next_at=="number"?t.next_at:null}:null}var Om=new Set(["parked","retry_wait"]);function Lm(e,t){let n=Object.values(e||{}),r=new Map;for(let s of n)s&&typeof s.bead_id=="string"&&Hn(s)&&r.set(s.bead_id,s.attempt_id);let o=new Map;for(let s of n){if(!s||typeof s.bead_id!="string"||s.bead_id.length===0||!Hn(s)||!Om.has(s.status)||r.get(s.bead_id)!==s.attempt_id||typeof s.dismissed_at=="number")continue;let i=t.get(s.bead_id);typeof i=="number"&&i>0&&typeof s.finished_at=="number"&&i>=s.finished_at||o.set(s.bead_id,{attempt:s,run_state:s.status})}return o}function wu(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"",o=r.indexOf(":");return o>0&&o<r.length-1?`\u26D4 ${r.slice(0,o)} (${r.slice(o+1)})`:`\u26D4 ${r}`}function mt(e){return e&&typeof e=="object"?e:{}}function Im(e,t,n){let r=mt(t);if(Object.keys(r).length===0)return null;let o=e.execution_defaults,s=e.runner_catalog,i=e.session_defaults;if(!o||!s||!i)return null;let l=b=>mn({pin:b,global:i,execution_defaults:o,runner_catalog:s,route:n}),a,u;try{a=l(r),u=l(null)}catch{return null}let d=$u(Vr(a,s),Vr(u,s)),p=$u(vr(a,null),vr(u,null));return d||p?{orchestration:d,worker:p}:null}function $u(e,t){return!e||t&&t.text===e.text?null:e}var Mm=2;function Pm(e,t,n){let o=(t&&typeof t=="object"&&Array.isArray(t.released_by)?t.released_by:[]).filter(a=>a&&typeof a=="object"&&typeof a.id=="string").slice().sort((a,u)=>(typeof u.closed_at=="number"?u.closed_at:0)-(typeof a.closed_at=="number"?a.closed_at:0)),s=[];for(let a of o){let u=gu(e,a,n);u&&s.push(u)}if(s.length===0)return null;let i=s.slice(0,Mm),l=s.length-i.length;if(l>0){let a=i[i.length-1];i[i.length-1]={...a,label:`${a.label} \uC678 ${l}`}}return i}function wa(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}var Dm=new Set(["quick_fix","spec_backed","full_plan"]);function xu(e){return typeof e=="string"&&Dm.has(e)}function Nm(e){let t={...mt(e.session_defaults)};for(let n of["orchestration_model","orchestration_effort","orchestration_speed"]){let r=e[n];typeof r=="string"&&(t[n]=r)}return t}function qm(e,t,n){let r=e.runner_catalog??null,o=va(e,t,n,null);if(!o)return null;let s=$n(r,o.orchestration_model.value??""),i=s===null?o:va(e,t,n,s)||o,l=Vr(i,r),a=vr(i,s);return l||a?{orchestration:l,worker:a}:null}function va(e,t,n,r){let o=xu(n)?n:xu(t.route)?t.route:null;try{return mn({pin:t,global:Nm(e),execution_defaults:e.execution_defaults??null,runner_catalog:e.runner_catalog??null,route:o,controller_runtime:r})}catch{return null}}function Fm(e,t,n){return!t||!Object.hasOwn(t,"metadata")?null:vr(va(e,mt(t.metadata),t.route,n),n)}function $a(e,t){let n=new Set,r=e;for(;r&&!n.has(r.attempt_id);){if(r.conflict_resolution===!0)return!0;n.add(r.attempt_id),r=typeof r.resumed_from=="string"&&r.resumed_from.length>0&&t.get(r.resumed_from)||null}return!1}function jm(e){let t={};for(let l of Pn)t[l]=0;let n=!1,r=0,o=0,s=0;for(let l of e){let a=l.usage;if(!a||typeof a!="object")continue;let u=!1;for(let d of Pn)Number.isFinite(a[d])&&(t[d]+=a[d],n=!0,u=!0);u&&(o+=1,Number.isFinite(a.total_cost_usd)&&(r+=a.total_cost_usd,s+=1))}o>0&&s===o&&(t.total_cost_usd=r);let i=e.map(l=>l.usage).filter(l=>l&&typeof l=="object"&&l.providers);return i.length>0?en(Ts(i)):n?Wn(t):null}function Su(e,t){let n=fa(e,t);return n==="internal"?"\uBBF8\uC801\uC7AC":n==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function Bm(e,t,n){let r=t.get(e);if(!r)return Su(e,n);if(typeof r.position=="number"){if(r.lane==="parallel")return`#${r.position}`;if(/^s[1-5]$/.test(r.lane))return`${r.lane} #${r.position}`}return So(r)}function Um(e,t,n,r){let o=t.get(e);if(!o)return{label:Su(e,n),title:""};if(typeof o.position=="number"&&(o.lane==="parallel"||/^s[1-5]$/.test(o.lane))){let i=r.get(e),l=o.lane==="parallel"?"\uBCD1\uB82C":o.lane;return{label:i&&i.length>0?"\u{1F512} \uB300\uAE30":"\uB300\uAE30",title:`${o.workspace_name||o.root_dir} ${l} #${o.position}`}}return{label:o.state==="running"?"\u25B6 \uC2E4\uD589\uC911":So(o),title:""}}function Wm(e,t){for(let n of Object.values(e||{}))if(n&&n.attempt_id===t&&typeof n.armed_by_lane=="string"&&n.armed_by_lane.length>0)return n.armed_by_lane;return null}function zm(e,t,n,r,o,s){return t==="draft"?{state:"draft",badge:"draft",run_label:null,can_stop:!1}:n.some(i=>s.failed_by_bead.get(i.id)===e)?{state:"failed",badge:"\u26D4 \uC2E4\uD328",run_label:"\u25B6 \uB2E4\uC2DC \uC9C4\uD589",can_stop:!1}:s.disarmed_lanes.has(e)?{state:"restart",badge:"\u23F8 \uC7AC\uC2DC\uC791",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}:n.some(i=>s.armed_by_bead.get(i.id)===e)?{state:"running",badge:"\u25B6 \uC9C4\uD589 \uC911",run_label:o.length>0?"\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589":null,can_stop:!0}:r?{state:"all_done",badge:"\uBAA8\uB450 \uC644\uB8CC",run_label:null,can_stop:!1}:{state:"confirmed",badge:"\uD655\uC815",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}}function Hm(e,t,n,r,o,s,i){let l=[];return e.forEach((a,u)=>{let d=typeof a.id=="string"?a.id:"";if(d.length===0)return;let p=a.status==="confirmed"?"confirmed":"draft",b=Array.isArray(a.entries)?a.entries:[],m=[];b.forEach((K,ie)=>{let ee=K&&typeof K.bead_id=="string"?K.bead_id:"";if(ee.length===0)return;let F=K&&typeof K.root_dir=="string"?K.root_dir:"",P=n.get(ee),L=P?P.state:void 0,z=L==="running"||L==="pr_wait"||L==="done",V=!P||L==="runnable",ne=P&&P.lane==="parallel"&&typeof P.position=="number"?P.position-1:null,N=Um(ee,n,r,t),Q=m.length>0?m[m.length-1].id:null,G=p==="confirmed"&&Q!==null&&!(t.get(ee)||[]).includes(Q);m.push({id:ee,title:o.get(ee)||ee,root_dir:P?P.root_dir:F,workspace_name:P?P.workspace_name:s.get(F)||"",seq:ie+1,location_label:N.label,location_title:N.title,draggable:!z,fixed:z,done:L==="done",unplaced:V,mismatch:G,...ne!==null?{queue_index:ne}:{}})}),m.forEach((K,ie)=>{K.seq=ie+1});let $=m.length>0&&m.every(K=>K.done),C=m.filter(K=>!K.fixed&&i.armed_by_bead.get(K.id)!==d).map(K=>K.id),j=zm(d,p,m,$,C,i);l.push({lane_id:d,status:p,draft:p==="draft",number:u+1,label:`\uC5F0\uACB0 ${u+1} \xB7 \uB808\uD3EC \uAC04`,rows:m,all_done:$,can_confirm:p==="draft"&&m.length>=2,has_mismatch:p==="confirmed"&&m.some(K=>K.mismatch||K.unplaced),unlaunched:C,...j})}),l}function Gm(e,t,n){if(e.lane==="runnable"){let i=n.get(e.id);return i?i.length===0?{scope:[],state:"missing"}:{scope:i,state:"declared"}:{scope:[],state:void 0}}let r=t.get(e.root_dir),o=r?r[e.id]:void 0;if(!o||!Array.isArray(o.scope))return{scope:[],state:void 0};let s=o.scope.filter(i=>typeof i=="string"&&i.length>0);return{scope:s,state:s.length===0?"missing":"declared"}}function Km(e,t,n,r,o){let s=new Map;for(let a of[...e.running,...e.queue,...e.runnable,...e.pr_wait]){if(!t.has(a.root_dir))continue;let u=`${a.root_dir}\0${a.id}`,d=s.get(u);if(d){d.cards.push(a);continue}let{scope:p,state:b}=Gm(a,t,n);b!==void 0&&(a.scope_state=b),s.set(u,{cards:[a],scope:p})}let i=new Map;for(let a of s.values()){let u=a.cards[0].scope_state;if(u!==void 0)for(let b of a.cards)b.scope_state=u;if(a.scope.length===0)continue;let d=a.cards[0].root_dir,p=i.get(d);p?p.push(a):i.set(d,[a])}let l=(a,u,d)=>{let p=u.cards[0],b={id:p.id,title:p.title,location_label:Bm(p.id,r,o),prefixes:d};for(let m of a.cards)m.overlap_chips?m.overlap_chips.push(b):m.overlap_chips=[b]};for(let a of i.values())for(let u=0;u<a.length;u+=1)for(let d=u+1;d<a.length;d+=1){let p=Ns(a[u].scope,a[d].scope);p.length!==0&&(l(a[u],a[d],p),l(a[d],a[u],p))}}function ya(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function Js(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function ar(e,t,n){let r=Array.isArray(e)?e:[],o=Array.isArray(t)?t:[],s=n&&typeof n.done_since=="number"?n.done_since:void 0,i={...Zr,...n&&n.candidate_filter?n.candidate_filter:{}},l=n&&Object.hasOwn(n,"cross_lanes")?n.cross_lanes??null:void 0,a=n&&n.candidate_sort==="as_given"?"as_given":n&&Oo.some(x=>x.value===n.candidate_sort)?n.candidate_sort:"repo_spec",u=n&&n.groups==="all"?"all":"nonempty",d=n&&n.candidate_hidden_counts==="per_control"?"per_control":"sequential",p=Date.now(),b=new Map;for(let x of o)x&&typeof x.root_dir=="string"&&b.set(x.root_dir,x);let m=new Map;for(let x of o)x&&typeof x.root_dir=="string"&&m.set(x.root_dir,x.name||x.root_dir);for(let x of r)x&&typeof x.root_dir=="string"&&m.set(x.root_dir,x.name||x.root_dir);let $=[],C=[],j=[],K=[],ie=[],ee=[],F=new Map,P=new Map,L=new Map,z=new Map,V=new Map,ne=new Map,N=new Map,Q=new Map,G=new Map,X=new Map,Re=new Map,we=new Map,ce=new Set,q=new Map,$e=new Map,Se=new Map;for(let x of r){if(!x||typeof x.root_dir!="string")continue;let W=x.root_dir,be=x.name||W,Ie=b.get(W),Ne=Ie&&typeof Ie.revision=="number"?Ie.revision:typeof x.revision=="number"?x.revision:0,Fe=mt(x.attempts),dt=mt(x.bead_titles);for(let[k,I]of Object.entries(dt))typeof I=="string"&&I.length>0&&Se.set(k,I);let At=mt(x.bead_times),Mt=mt(x.pr_observations),zt=mt(x.admission),Ot=mt(x.revise_parked),_t=mt(x.merge_queue_state),ze=mt(x.cleanup_failed),O=mt(x.discard_operations),re=mt(x.bead_timelines),he=mt(x.bead_blocked_by);Object.hasOwn(x,"bead_scope")&&q.set(W,mt(x.bead_scope));let T=mt(x.bead_workflow),J=mt(x.pr_activity),Pe=Array.isArray(x.repo_operations)?x.repo_operations:[];Q.set(W,Pe);let Ye=typeof x.declared_base=="string"?x.declared_base:null;N.set(W,Ye),ne.set(W,Object.entries(ze).map(([k,I])=>({bead_id:k,step:I&&I.step?I.step:"",reason:I&&I.reason?I.reason:"",at:I&&typeof I.at=="number"?I.at:null,detail:I&&typeof I.detail=="string"?I.detail:null,output_tail:I&&typeof I.output_tail=="string"&&I.output_tail?I.output_tail:void 0,log_path:I&&typeof I.log_path=="string"&&I.log_path?I.log_path:void 0,retry_count:I&&typeof I.retry_count=="number"&&Number.isInteger(I.retry_count)&&I.retry_count>0?I.retry_count:0,failure_code:I&&typeof I.failure_code=="string"?I.failure_code:void 0})));for(let[k,I]of Object.entries(mt(x.bead_overlay)))I&&typeof I=="object"&&G.set(`${W}\0${k}`,I);let qe=new Map;for(let k of Object.values(Fe))k&&typeof k.attempt_id=="string"&&qe.set(k.attempt_id,k);let it=Array.isArray(x.merge_queue)?x.merge_queue:[],at=new Set(it.filter(k=>k&&typeof k.bead_id=="string").map(k=>k.bead_id)),Ue=new Map(it.filter(k=>k&&typeof k.bead_id=="string").map(k=>[k.bead_id,k])),tt=new Map,kt=new Map,Ge=new Map,Tt=new Map;it.forEach((k,I)=>{k&&typeof k.bead_id=="string"&&(tt.set(k.bead_id,I+1),kt.set(k.bead_id,k.resolution),Ge.set(k.bead_id,k.continuation_action||null),Tt.set(k.bead_id,k.authority||null))});let Xe=mt(x.auto_merge_skips),pt=k=>{let I=Xe[k];if(!I)return null;let ke=mt(mt(Mt[k]).pr).head_sha;return ke&&ke===I.head_sha?I.reason||"":null};V.set(W,{positions:tt,resolutions:kt,continuations:Ge,authorities:Tt,state:{active:typeof _t.active=="string"?_t.active:null,failures:mt(_t.failures),waiting:_t.waiting&&typeof _t.waiting.bead_id=="string"&&typeof _t.waiting.reason=="string"?_t.waiting:null},auto_excluded:(Array.isArray(x.pr_wait)?x.pr_wait:[]).map(k=>k&&k.bead_id).filter(k=>typeof k=="string"&&pt(k)!==null),running:it.length>0});let jt=Array.isArray(x.queue)?x.queue:[];for(let k of[...jt,...Array.isArray(x.pr_wait)?x.pr_wait:[]])k&&typeof k.bead_id=="string"&&typeof k.armed_by_lane=="string"&&k.armed_by_lane.length>0&&Re.set(k.bead_id,k.armed_by_lane);for(let k of Array.isArray(x.disarmed_on_load)?x.disarmed_on_load:[])typeof k=="string"&&k.length>0&&ce.add(k);let Ct=(Array.isArray(x.serial_lanes)?x.serial_lanes:[]).filter(k=>k&&/^s[1-5]$/.test(k.id)&&Array.isArray(k.entries)),qt=mt(x.lane_states),Bt=typeof x.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(x.serial_lane_count))):Math.min(5,Ct.length);L.set(W,Bt),z.set(W,jt.length);let pn=new Map(Ct.map(k=>[k.id,k])),Vt=new Map;for(let k of Ct)for(let I of k.entries)I&&typeof I.bead_id=="string"&&Vt.set(I.bead_id,k.id);for(let[k,I]of Object.entries(he))Array.isArray(I)&&X.set(k,I.filter(ke=>typeof ke=="string"&&ke.length>0));let Qt=Array.isArray(x.done)?x.done:[];for(let k of Qt)k&&typeof k.bead_id=="string"&&ee.push({id:k.bead_id,root_dir:W,workspace_name:be});let Gt=new Map;for(let k of Qt)k&&typeof k.bead_id=="string"&&typeof k.added_at=="number"&&Gt.set(k.bead_id,k.added_at);let Ft=k=>({id:k,title:dt[k]||k,root_dir:W,workspace_name:be,expected_revision:Ne,draggable:!1,...mt(At[k]).created_at?{created_at:mt(At[k]).created_at}:{},...mt(At[k]).updated_at?{updated_at:mt(At[k]).updated_at}:{}}),Zt=k=>{let I=T[k]?.chips?.pr;return I&&typeof I.number=="number"&&typeof I.url=="string"?{pr_number:I.number,pr_url:I.url}:{}},Ht=k=>Object.hasOwn(he,k)?{blocked_by:Array.isArray(he[k])?he[k].filter(I=>typeof I=="string"&&I.length>0):[]}:{},wt=new Set;for(let[k,I]of Cm(Fe,Gt,{discard_operations:O,observations:Mt,bead_timelines:re})){wt.add(k);let ke=I.run_state==="failed"?Wm(Fe,I.attempt_id):null;ke!==null&&we.set(k,ke);let De=qe.get(I.attempt_id)||null,ue=G.get(`${W}\0${k}`),Ze=ue&&ue.rollup?ue.rollup:null,yt=wa(Ye,De?De.target_base:null),gt=De?$a(De,qe):!1,Ke=De&&De.quickfix_lane===!0&&De.quickfix_landing&&typeof De.quickfix_landing=="object"?De.quickfix_landing:null,h=Ke&&typeof Ke.reason=="string"&&Ke.reason.length>0?Ke.reason:null,g=Ke?Ro({bead_id:k,merge_sha:Ke.head_sha,cleanup_cursor:Ke.cursor,cleanup_failed:h?{step:Ke.cursor,reason:h}:null,repo_operations:Pe}):null;C.push({...Ft(k),lane:"running",...Ht(k),...Vt.has(k)?{serial_lane_id:Vt.get(k)}:{},attempt_id:I.attempt_id,run_state:I.run_state,status:I.status||void 0,workflow:T[k]||null,can_pause:I.can_pause,can_resume:I.can_resume,started_at:I.started_at,last_event_at:I.last_event_at,last_activity:I.last_activity,legs:I.legs,runner:I.runner,model:I.model,effort:I.effort,speed:I.speed,resumed_from:I.resumed_from,continuation_mode:I.continuation_mode,usage:I.usage,failure:I.failure||null,retry:I.retry||null,exec_chips:{orchestration:da(I),worker:Fm(mt(Ie),ue,I.runner||null)},discard:Kn(O,k,{attempt_id:I.attempt_id,merged:I.failure?.confirmation==="merged"||mt(Mt[k]).pr?.state==="MERGED"}),...Ze?{rollup:Ze}:{},...gt?{conflict_resolution:!0}:{},...yt?{base_exception:yt}:{},...g?{landing:g}:{},badges:I.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:I.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:I.run_state==="parked"?["\u23F8 \uC138\uC158 \uB300\uAE30"]:I.run_state==="retry_wait"?["\u21BB \uC7AC\uC2DC\uB3C4 \uB300\uAE30"]:[],alert:I.run_state==="failed"})}for(let[k,I]of Ic(Fe)){if(C.some(De=>De.id===k))continue;let ke=I.attempt;C.push({...Ft(k),lane:"running",kind:"session",...Ht(k),attempt_id:typeof ke.attempt_id=="string"?ke.attempt_id:"",run_state:"running",status:"running",non_occupying:!0,workflow:T[k]||null,can_pause:!1,can_resume:!1,started_at:I.started_at,last_event_at:typeof ke.last_event_at=="number"?ke.last_event_at:null,last_activity:ke.last_activity&&typeof ke.last_activity=="object"?ke.last_activity:null,legs:Array.isArray(ke.legs)?ke.legs:[],runner:typeof ke.runner=="string"?ke.runner:null,model:typeof ke.model=="string"?ke.model:null,effort:typeof ke.effort=="string"?ke.effort:null,speed:typeof ke.speed=="string"?ke.speed:null,resumed_from:null,continuation_mode:null,usage:ke.usage&&typeof ke.usage=="object"?ke.usage:null,exec_chips:{orchestration:da(ke),worker:null},discard:Kn(O,k,{merge_queued:!0}),badges:[I.origin==="auto"?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"],alert:!1})}for(let k of Array.isArray(x.session_active)?x.session_active:[]){let I=k&&k.bead_id;typeof I!="string"||wt.has(I)||(wt.add(I),Array.isArray(k.blocked_by)&&k.blocked_by.length>0&&X.set(I,k.blocked_by.filter(ke=>typeof ke=="string"&&ke.length>0)),typeof k.title=="string"&&k.title.length>0&&Se.set(I,k.title),C.push({...Ft(I),title:k.title||dt[I]||I,lane:"running",kind:"session",status:"in_progress",started_at:ya(k.started_at)??ya(k.updated_at)??void 0,updated_at:ya(k.updated_at)??void 0,workflow:k.workflow||null,labels:Array.isArray(k.labels)?k.labels:[],spec_id:typeof k.spec_id=="string"?k.spec_id:"",blocked:k.blocked===!0,...Array.isArray(k.blocked_by)?{blocked_by:k.blocked_by.filter(ke=>typeof ke=="string"&&ke.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,session_refs:Array.isArray(k.session_refs)?k.session_refs:[],badges:[],alert:!1}))}for(let k of Array.isArray(x.pr_wait)?x.pr_wait:[]){let I=k&&k.bead_id;if(typeof I!="string"||wt.has(I))continue;wt.add(I);let ke=mt(Mt[I]),De=mt(ke.pr),ue=ke.gate?mt(ke.gate):null,Ze=at.has(I),yt=Ue.get(I)?.continuation_action||null,gt=!!yt&&yt.continuation===null,Ke=_t.active===I,h=k.external===!0,g=ze[I]||null,R=mt(J[I]),D=Ro({bead_id:I,merge_sha:k.merge_sha,cleanup_cursor:k.cleanup_cursor,merge_progress:R.merge_progress||null,cleanup_failed:g,repo_operations:Pe}),_=Zs(D),y=!!ue&&ue.base_badge==="\uCDA9\uB3CC",Y=!!g&&["child_sweep","branch_cleanup","parent_close"].includes(g.step)&&!!ue&&ue.tier==="merged",le=h&&!!g&&!!ue&&ue.tier==="merged",Me=!!ue&&["closed_unmerged","review","undecidable"].includes(ue.tier)&&ue.reason!=="review_receipt_undetermined",ct=Kn(O,I,{external:h,merge_active:Ke||D?.step==="merge",merge_queued:Ze,cleanup_active:_,merged:!!g||ue?.tier==="merged"}),Et=!!ct.operation;j.push({...Ft(I),lane:"pr_wait",...Ht(I),workflow:T[I]||null,pr_number:typeof De.number=="number"?De.number:null,pr_url:typeof De.url=="string"?De.url:void 0,external:h,usage:zn(Fe,I),merge_step:D,badges:gt?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:D?[ue?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:g?[wr(g.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${wr(g.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof ue?.gate_badge=="string"&&ue.gate_badge.length>0?[ue.gate_badge]:[],alert:D?D.failed===!0:!!g||Me,reason:g&&D?.active!==!0?Xs(g.step):"PR \uB300\uAE30",merge_action:ue?.tier==="merged"&&!Y&&!le?!1:!Ze||gt,merge_enabled:!Et&&(gt||ue?.enabled===!0||y||Y||le),merge_label:gt?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":le||Y?"\uC815\uB9AC \uC7AC\uAC1C":y&&!Y?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:gt?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Et?ct.error?`\uD3D0\uAE30 \uC2E4\uD328: ${ct.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${ct.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:le?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Y?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":y?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":ue?.enabled===!0?`\uBA38\uC9C0 (${ue.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${ue?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:Ze&&!gt,cancel_enabled:!Ke,continuation_mismatch:yt?.mismatch||null,discard:ct,discard_action:ct.action,discard_enabled:ct.enabled,discard_title:ct.title})}let rn=(k,I,ke,De)=>{let ue=k&&k.bead_id;if(typeof ue!="string"||wt.has(ue))return null;wt.add(ue);let Ze=Ot[ue],yt=Kn(O,ue),gt=yt.operation?yt:null,Ke={...Ft(ue),lane:I,workflow:T[ue]||null,draggable:!gt,discard:gt||void 0,reason:wu(zt,ue),seq:ke+1,queue_position:ke+1,queue_index:ke,queue_length:De,badges:Ze?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!Ze,revise_action:!!Ze,revise_enabled:!!Ze&&!gt,revise_title:Ze?Ze.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Ze.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""},h=Ht(ue);return Object.hasOwn(h,"blocked_by")&&(Ke.blocked_by=h.blocked_by),Ke};for(let k=0;k<jt.length;k++){let I=rn(jt[k],"queue",k,jt.length);if(!I)continue;K.push(I);let ke=F.get(W);ke?ke.push(I):F.set(W,[I])}let ve=k=>{let I=j.find(Ze=>Ze.id===k&&Ze.root_dir===W);if(I)return{id:k,title:I.title,badge:"PR \uB300\uAE30 \xB7 \uC810\uC720"};let ke=C.find(Ze=>Ze.id===k&&Ze.root_dir===W),De=ke?ke.run_state:Em(Fe,k),ue=De==="failed"||De==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":De==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720";return{id:k,title:ke?ke.title:Ft(k).title,badge:ue}},E=[];for(let k=0;k<Math.max(Bt,Ct.length);k++){let I=`s${k+1}`,ke=pn.get(I),De=ke&&Array.isArray(ke.entries)?ke.entries:[],ue=mt(qt[I]),Ze=Array.isArray(ue.occupied_by)?ue.occupied_by.filter(Ke=>typeof Ke=="string"):[],yt=new Set(Ze),gt=[];for(let Ke=0;Ke<De.length;Ke++){let h=De[Ke]&&De[Ke].bead_id;if(typeof h=="string"&&yt.has(h)){wt.add(h);continue}let g=rn(De[Ke],I,Ke,De.length);g&&(gt.push(g),K.push(g))}gt.length===0&&Ze.length===0&&(Bt<=1||k>=Bt)||E.push({id:I,index:k,items:gt,raw_length:De.length,occupied_by:Ze,occupants:Ze.map(Ke=>ve(Ke)),corrections:Array.isArray(ue.corrections)?ue.corrections.length:0,cycle:ue.cycle===!0,...gt.length===0&&Ze.length===0?{empty:!0}:{}})}P.set(W,E);let fe=Array.from({length:Bt},(k,I)=>{let ke=`s${I+1}`,De=pn.get(ke),ue=De&&Array.isArray(De.entries)?De.entries:[],Ze=mt(qt[ke]);return{id:ke,index:ue.length,length:ue.length,occupied_by:Array.isArray(Ze.occupied_by)?Ze.occupied_by.filter(yt=>typeof yt=="string"):[]}});for(let k of Array.isArray(x.runnable)?x.runnable:[]){let I=k&&k.bead_id;if(typeof I!="string"||wt.has(I))continue;wt.add(I);let ke=k.workflow&&typeof k.workflow=="object"?k.workflow:null,De=ke&&typeof ke.route=="string"&&ke.route||(typeof k.route=="string"?k.route:null),ue=Im(mt(Ie),k.exec_pins,De),Ze=Ao(k.rec,k.exec_pins);Array.isArray(k.blocked_by)&&k.blocked_by.length>0&&X.set(I,k.blocked_by.filter(_=>typeof _=="string"&&_.length>0)),typeof k.title=="string"&&k.title.length>0&&Se.set(I,k.title),Array.isArray(k.scope)&&$e.set(I,k.scope.filter(_=>typeof _=="string"&&_.length>0));let yt=k.eligible!==!1,gt=k.worker_ineligible===!0,Ke=Object.hasOwn(k,"eligible"),h=[];typeof k.reason=="string"&&k.reason.length>0&&h.push(k.reason);let g=wu(zt,I);g&&h.push(g);let R=Pm(I,k.release_info,p),D=k.dependents_info&&typeof k.dependents_info=="object"?hu(k.dependents_info):null;$.push({...Ft(I),title:k.title||dt[I]||I,lane:"runnable",draggable:!Ke,queue_placeable:yt&&!gt,...gt?{worker_ineligible:!0}:{},...k.session_preferred===!0?{session_preferred:!0,session_preferred_reason:typeof k.session_preferred_reason=="string"?k.session_preferred_reason:""}:{},...R||D?{dependency_chips:{...R?{released:R}:{},...D?{dependents:D}:{}}}:{},reason:h.join(" \xB7 "),created_at:k.created_at??void 0,updated_at:k.updated_at??void 0,status:typeof k.status=="string"?k.status:void 0,labels:Array.isArray(k.labels)?k.labels:[],spec_id:typeof k.spec_id=="string"?k.spec_id:"",published:k.published===!0,workflow:ke||(De?{route:De,chips:{route:De}}:null),...ue?{exec_chips:ue}:{},...Ze?{rec:Ze}:{},blocked:k.blocked===!0,...Array.isArray(k.blocked_by)?{blocked_by:k.blocked_by.filter(_=>typeof _=="string"&&_.length>0)}:{},place_index:jt.length,place_lanes:fe})}for(let k of Qt){let I=k&&k.bead_id;if(typeof I!="string"||wt.has(I)||(wt.add(I),s!==void 0&&typeof k.added_at=="number"&&k.added_at<s))continue;let ke=Tm(Fe,I),De=ke&&typeof ke.done_kind=="string"?ke.done_kind:null;ie.push({...Ft(I),lane:"done",done:!0,done_layout:"three_line",usage:zn(Fe,I),work_ms:au(Fe,I),done_at:typeof k.added_at=="number"?k.added_at:void 0,done_kind:De,...Zt(I),badges:[...De&&yu[De]?[yu[De]]:[],...su(Fe,I)]})}for(let k of Array.isArray(x.session_done)?x.session_done:[]){let I=k&&(k.id||k.bead_id);typeof I!="string"||wt.has(I)||(wt.add(I),ie.push({...Ft(I),...k,id:I,root_dir:W,workspace_name:be,expected_revision:Ne,lane:"done",done:!0}))}}if(G.size>0)for(let x of[...$,...K,...C,...j,...ie]){let W=G.get(`${x.root_dir}\0${x.id}`);if(!W||(typeof W.priority=="number"&&(x.priority=W.priority),typeof W.from_id=="string"&&W.from_id.length>0&&(x.from_id=W.from_id),!Object.hasOwn(W,"metadata")))continue;let be=mt(W.metadata);if(x.rec=Ao(be),x.lane==="runnable"||x.lane.startsWith("s")||x.lane==="queue"){let Ie=qm(mt(b.get(x.root_dir)),be,typeof W.route=="string"&&W.route.length>0?W.route:mt(x.workflow).route);Ie&&(x.exec_chips=Ie)}}let S=new Map;o.forEach((x,W)=>{x&&typeof x.root_dir=="string"&&S.set(x.root_dir,W)});let Z=n&&n.running_sort==="repo"?"repo":"started";C.sort((x,W)=>{let be=x.kind==="session",Ie=W.kind==="session";if(be!==Ie)return be?1:-1;if(be&&Ie){let dt=Js(W.updated_at)-Js(x.updated_at);return dt!==0?dt:x.id.localeCompare(W.id)}if(Z==="repo"){let dt=S.get(x.root_dir)??Number.MAX_SAFE_INTEGER,At=S.get(W.root_dir)??Number.MAX_SAFE_INTEGER;if(dt!==At)return dt-At}let Ne=typeof x.started_at=="number"&&Number.isFinite(x.started_at)?x.started_at:null,Fe=typeof W.started_at=="number"&&Number.isFinite(W.started_at)?W.started_at:null;return Ne!==null&&Fe!==null&&Ne!==Fe?Ne-Fe:Ne===null&&Fe!==null?1:Ne!==null&&Fe===null?-1:x.id.localeCompare(W.id)}),ie.sort((x,W)=>(W.done_at??0)-(x.done_at??0));let Te=o.length>0?o:r.map(x=>({root_dir:x&&x.root_dir,name:x&&x.name,auto_advance:x&&x.auto_advance,auto_merge:x&&x.auto_merge,slots:x&&x.slots,revision:x&&x.revision,runner_catalog:x&&x.runner_catalog})),_e=new Set($.map(x=>x.root_dir)),xe=new Map;for(let x of C)x.kind==="session"||x.run_state!=="running"||xe.set(x.root_dir,(xe.get(x.root_dir)||0)+1);let ge=new Map;for(let x of ie){let W=ge.get(x.root_dir);W?W.push(x):ge.set(x.root_dir,[x])}let je={positions:new Map,resolutions:new Map,continuations:new Map,authorities:new Map,state:{active:null,failures:{},waiting:null},auto_excluded:[],running:!1},ft=[];for(let x of Te){if(!x||typeof x.root_dir!="string")continue;let W=F.get(x.root_dir)||[],be=P.get(x.root_dir)||[],Ie=W.length>0||be.some(dt=>dt.items.length>0||dt.occupied_by.length>0);if(u!=="all"&&!Ie&&!_e.has(x.root_dir))continue;let Ne=typeof x.slots=="number"&&x.slots>=ei?x.slots:ei,Fe=xe.get(x.root_dir)||0;ft.push({live_count:Fe,over_cap:Fe>Ne,merge:V.get(x.root_dir)||je,token_total:jm(ge.get(x.root_dir)||[]),cleanup_failures:ne.get(x.root_dir)||[],declared_base:N.get(x.root_dir)??null,repo_operations:Q.get(x.root_dir)||[],root_dir:x.root_dir,name:x.name||x.root_dir,auto_advance:x.auto_advance===!0,auto_merge:x.auto_merge===!0,slots:Ne,revision:typeof x.revision=="number"?x.revision:0,runner_catalog:mt(x.runner_catalog),items:W,sublanes:{parallel:W,serial:be},serial_lane_count:L.get(x.root_dir)||0,raw_queue_length:z.get(x.root_dir)||0})}let Le={runnable:$,runnable_all:$,runnable_hidden:{blocked:0,spec:0},runnable_sections:[],runnable_flat:a==="updated_flat"||a==="as_given",queue:K,queue_groups:ft,running:C,pr_wait:j,done:ie,parallel_rows:[],chain_lanes:[],cross_lanes_revision:l&&typeof l.revision=="number"?l.revision:null,cross_lanes_unreadable:l===null,parallel_raw_length:Object.fromEntries(z),owner_of:{}},U=Jc(Le);for(let x of ee)U.has(x.id)||U.set(x.id,{root_dir:x.root_dir,workspace_name:x.workspace_name,lane:"done",state:"done"});for(let x of[...Le.queue,...Le.runnable,...Le.running,...Le.pr_wait]){if(!Object.hasOwn(x,"blocked_by"))continue;let W=U.get(x.id);x.blockers=(x.blocked_by||[]).map(be=>eu(be,W,U,o))}for(let x of[...Le.queue,...Le.runnable,...Le.running,...Le.pr_wait]){let W=(x.blockers||[]).map(Ie=>{let Ne=U.get(Ie.id)?.root_dir;return{...ba(x.id,Ie),openable:!0,...typeof Ne=="string"&&Ne.length>0?{root_dir:Ne}:{}}});if(W.length===0)continue;let be={...x.dependency_chips||{},predecessors:W};x.dependency_chips=be}Km(Le,q,$e,U,o);let de=tu(Le.queue_groups);for(let x of Le.queue_groups)for(let W of x.sublanes.serial){let be=de.get(nu(x.root_dir,W.id));be&&(W.cross_wait_peers=be)}Le.chain_lanes=Hm(l&&Array.isArray(l.lanes)?l.lanes:[],X,U,o,Se,m,{armed_by_bead:Re,failed_by_bead:we,disarmed_lanes:ce});let se=new Map;for(let x of[...Le.queue,...Le.runnable])se.has(x.id)||se.set(x.id,x);let ae=new Set;for(let x of Le.chain_lanes)for(let W of x.rows){if(x.status==="confirmed"&&!W.unplaced&&!W.fixed&&ae.add(W.id),!x.draft&&!W.unplaced)continue;let be=se.get(W.id);be&&(be.cross_lane_chip={lane_id:x.lane_id,number:x.number,status:x.status,label:x.draft?`\uC5F0\uACB0 ${x.number} (draft)`:`\uC5F0\uACB0 ${x.number}`})}let Ee=new Map(Le.chain_lanes.map(x=>[x.lane_id,x.number]));for(let x of[...Le.queue,...Le.running]){let W=Re.get(x.id);if(typeof W!="string"||W.length===0)continue;let be=Ee.get(W);x.armed_lane_chip=be===void 0?{lane_id:W,label:"\u25B6 \uC9C4\uD589 \uC911 \xB7 \uB808\uC778 \uC5C6\uC74C",orphan:!0}:{lane_id:W,label:`\u25B6 \uC5F0\uACB0 ${be}`,orphan:!1}}let me=[];for(let x of F.values())for(let W of x)ae.has(W.id)||me.push(W);me.sort((x,W)=>{let be=x.workspace_name.localeCompare(W.workspace_name);return be!==0?be:(x.queue_index??0)-(W.queue_index??0)}),Le.parallel_rows=me;let Oe={};for(let[x,W]of U)typeof W.root_dir=="string"&&W.root_dir.length>0&&(Oe[x]=W.root_dir);for(let x of Le.chain_lanes)for(let W of x.rows)!Object.hasOwn(Oe,W.id)&&W.root_dir.length>0&&m.has(W.root_dir)&&(Oe[W.id]=W.root_dir);Le.owner_of=Oe;let Qe=Le.runnable.length;Le.runnable_all=Le.runnable.slice();let He=Le.runnable,Be=x=>i.show_blocked||x.blocked!==!0,te=x=>i.spec==="all"||(i.spec==="with"?x.published===!0:x.published!==!0);if(d==="per_control"){let x=[],W=0,be=0;for(let Ie of He){let Ne=Be(Ie),Fe=te(Ie);Ne&&Fe?x.push(Ie):!Ne&&Fe?W+=1:Ne&&!Fe&&(be+=1)}He=x,Le.runnable_hidden={blocked:W,spec:be}}else{He=He.filter(Be);let x=He.length;He=He.filter(te),Le.runnable_hidden={blocked:Qe-x,spec:x-He.length}}let H=(x,W)=>{let be=Js(W.updated_at)-Js(x.updated_at);return be!==0?be:x.id.localeCompare(W.id)},ut=a==="repo_spec"?(x,W)=>{let be=x.published===!0?0:1,Ie=W.published===!0?0:1;return be!==Ie?be-Ie:H(x,W)}:H;if(a==="as_given")Le.runnable=He,Le.runnable_sections=[];else if(a==="updated_flat")Le.runnable=He.slice().sort(H),Le.runnable_sections=[];else{let x=new Map;for(let Ie of He){let Ne=x.get(Ie.root_dir);Ne?Ne.push(Ie):x.set(Ie.root_dir,[Ie])}let W=[],be=[];for(let Ie of Te){if(!Ie||typeof Ie.root_dir!="string")continue;let Ne=(x.get(Ie.root_dir)||[]).slice().sort(ut);x.delete(Ie.root_dir),Ne.length!==0&&(W.push({root_dir:Ie.root_dir,name:Ie.name||Ie.root_dir,items:Ne.map(Fe=>({...Fe,workspace_name:""}))}),be.push(...Ne))}for(let[Ie,Ne]of x){let Fe=Ne.slice().sort(ut);W.push({root_dir:Ie,name:Fe[0]?.workspace_name||Ie,items:Fe.map(dt=>({...dt,workspace_name:""}))}),be.push(...Fe)}Le.runnable=be,Le.runnable_sections=W}return Le}function Eu(e,t){let n=new Map(e.map((a,u)=>[a,u])),r=new Map(e.map(a=>[a,new Set]));for(let a of t)a.blocker!==a.blockee&&n.has(a.blocker)&&n.has(a.blockee)&&r.get(a.blockee).add(a.blocker);let o=new Set,s=[];for(;s.length<e.length;){let a=e.find(u=>{if(o.has(u))return!1;for(let d of r.get(u))if(!o.has(d))return!1;return!0});if(a===void 0)return{order:[...e],corrections:[],cycle:!0};o.add(a),s.push(a)}let i=[],l=new Map(s.map((a,u)=>[a,u]));for(let a of s){let u=null;for(let d of r.get(a)){let p=Number(n.get(a))<Number(n.get(d)),b=Number(l.get(a))>Number(l.get(d));p&&b&&(u===null||Number(l.get(d))>Number(l.get(u)))&&(u=d)}u!==null&&i.push({bead_id:a,after:u})}return{order:s,corrections:i,cycle:!1}}var Ym="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",ni="\uC758\uC874 \uC790\uB8CC \uBBF8\uD655\uC815 \u2014 \uAD50\uC815 \uBCF4\uB958",Vm="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694",Qm="\uC774\uBBF8 \uC9C4\uD589 \uC911\uC778 \uC774\uC288 \uC55E\uC5D0\uB294 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",Jr="\uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";function Lo(e,t){return`${e}\0${t}`}function Xm(e,t){let n=new Set(e),r=new Map;for(let o of e){let s=t.placed_members.has(o)?t.snapshot_blocked_by:t.runnable_blocked_by,i=s instanceof Map?s.get(o):void 0;if(!Array.isArray(i))return null;r.set(o,i.filter(l=>l!==o&&n.has(l)))}return r}function Zm(e,t){if(e.status!=="confirmed")return 0;let n=-1;return e.entries.forEach((r,o)=>{t.fixed_members.has(r.bead_id)&&(n=o)}),n+1}function Po(e,t){let n=e.entries,r=n.map(p=>p.bead_id),o=Xm(r,t);if(o===null)return{entries:n,corrections:[],cycle:!1,held:!0,mismatched:[]};let s=[];for(let[p,b]of o)for(let m of b)s.push({blocker:m,blockee:p});let i=Zm(e,t),l=new Map(r.map((p,b)=>[p,b])),a=r.slice(0,i).filter(p=>o.get(p).some(b=>Number(l.get(b))>Number(l.get(p)))),u=Eu(r.slice(i),s);if(u.cycle)return{entries:n,corrections:[],cycle:!0,held:!1,mismatched:a};let d=new Map(n.map(p=>[p.bead_id,p]));return{entries:[...n.slice(0,i),...u.order.map(p=>d.get(p))],corrections:u.corrections,cycle:!1,held:!1,mismatched:a}}function Tu(e,t){let n=t.cross_lanes.get(e);return n===void 0?null:Po(n,t)}function Jm(e,t){if(!(t.corrections.length===0&&!t.cycle&&!t.held&&t.mismatched.length===0))return{lane_id:e,corrected:t.corrections.length,cycle:t.cycle,held:t.held,mismatched:t.mismatched}}function eg(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function tg(e){let t=new Map;for(let[n,r]of e)t.set(n,r.slice());return t}function xa(e,t,n){let r=new Set([t]),o=[t];for(;o.length>0;){let s=o.pop();for(let i of e.get(s)||[]){if(i===n)return!0;r.has(i)||(r.add(i),o.push(i))}}return!1}function ng(e,t){let n=new Set;for(let[i,l]of t)for(let a of l)n.add(Lo(i,a));let r=new Map,o=new Map;for(let i of e){let l=Lo(i.a,i.b);r.set(l,i),o.set(l,i.type==="dep-add")}let s=[];for(let i of e){let l=Lo(i.a,i.b);r.get(l)===i&&o.get(l)!==n.has(l)&&s.push(i)}return s}function rg(e,t,n){let r=e.parallel_rows,o=Math.max(0,Math.min(r.length,n)),s=r[o];if(s&&s.root_dir===t)return s.queue_index;for(let i=o-1;i>=0;i--)if(r[i].root_dir===t)return r[i].queue_index+1;for(let i=o;i<r.length;i++)if(r[i].root_dir===t)return r[i].queue_index;return e.parallel_raw_length.get(t)??0}function og(e,t){return e.parallel_rows.some(n=>n.root_dir===t)}function ti(e,t,n,r){return{type:"worker-queue-place",payload:{bead_id:e,...r?{lane:r}:{},index:n},root_dir:t}}function Aa(e,t){let n=0;for(let r of e.cross_lanes.keys())if(n+=1,r===t)return n;return n+1}function Do(e){let t=tg(e.blocked_by_map),n=[],r=new Set,o={refusal:null},s=u=>{let d=e.owner_of.get(u);return typeof d!="string"||d.length===0?(o.refusal=eg(u),null):d};return{graph:t,dep_ops:n,state:o,ownerOf:s,addDep:(u,d,p)=>{if(o.refusal!==null||u===d)return;let b=t.get(u)||[];if(b.includes(d))return;let m=s(u);if(m!==null){if(xa(t,d,u)){o.refusal=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${u}\uAC00 \uC774\uBBF8 ${d}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}t.set(u,[...b,d]),p!==void 0&&r.add(Lo(u,d)),n.push({type:"dep-add",a:u,b:d,root_dir:m,...p===void 0?{}:{lane_id:p}})}},removeDep:(u,d)=>{if(o.refusal!==null||u===d)return;let p=t.get(u)||[];if(!p.includes(d))return;let b=s(u);b!==null&&(t.set(u,p.filter(m=>m!==d)),n.push({type:"dep-remove",a:u,b:d,root_dir:b}))},laneCreated:(u,d)=>r.has(Lo(u,d))}}function No(e,t,n,r,o={}){if(e.state.refusal!==null)return{refused:e.state.refusal};let s=ng(e.dep_ops,t.blocked_by_map),i=s.filter(d=>d.type==="dep-remove"),l=s.filter(d=>d.type==="dep-add"),a=o.disarm_ops??[],u=o.lane_id===void 0||o.correction===void 0?void 0:Jm(o.lane_id,o.correction);return{lane_ops:n,ops:[...i,...a,...l,...r],lane_op_index:i.length+a.length,...u===void 0?{}:{correction:u}}}function Cu(e,t,n){for(let r=1;r<t.length;r+=1)e.addDep(t[r].bead_id,t[r-1].bead_id,n)}function Io(e,t){return t>0&&e.entries[t]?.dep_created_by_lane===!0}function Ru(e,t,n,r){if(t.status!=="confirmed")return[];let o=[],s=new Map;for(let i of r){let l=e.owner_of.get(i.bead_id)||i.root_dir;typeof l!="string"||l.length===0||s.set(l,[...s.get(l)||[],i.bead_id])}for(let[i,l]of s)o.push({type:"worker-queue-disarm",payload:{bead_ids:l,lane_id:n},root_dir:i});return o}function Ou(e,t,n,r){let o=new Map;for(let s of n){if(t.placed_members.has(s.bead_id))continue;let i=e.ownerOf(s.bead_id);if(i===null)return;let l=o.get(i)??0;r.push(ti(s.bead_id,i,(t.parallel_raw_length.get(i)??0)+l)),o.set(i,l+1)}}function Mo(e){return e.map(t=>({bead_id:t.bead_id,root_dir:t.root_dir}))}function ri(e,t){return e.length===t.length&&e.every((n,r)=>n.bead_id===t[r].bead_id&&n.root_dir===t[r].root_dir)}function oi(e,t,n){let r=Do(n),o=[],s=[],i=[],l,a=n.owner_lane_of.get(e.bead_id),u=e.kind==="chain"?e.lane_id??a:void 0,d=u===void 0?void 0:n.cross_lanes.get(u);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:Ym};if(t.kind==="chain"){if(e.kind==="repo-serial")return{refused:Vm};if(e.kind!=="chain"&&typeof a=="string"&&a!==t.lane_id&&n.cross_lanes.has(a))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${Aa(n,a)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`};if(!n.cross_lanes.has(t.lane_id))return{refused:Jr}}if(e.kind==="chain"&&d===void 0)return{refused:Jr};let p=()=>{if(d===void 0||d.status!=="confirmed")return;let $=d.entries.findIndex(ee=>ee.bead_id===e.bead_id);if($<0)return;let C=$>0?d.entries[$-1]:null,j=$+1<d.entries.length?d.entries[$+1]:null,K=Io(d,$),ie=j!==null&&Io(d,$+1);K&&C!==null&&r.removeDep(e.bead_id,C.bead_id),ie&&j!==null&&r.removeDep(j.bead_id,e.bead_id),(K||ie)&&C!==null&&j!==null&&r.addDep(j.bead_id,C.bead_id,u)},b=($,C)=>{let j=n.cross_lanes.get($),K=j.entries.findIndex(N=>N.bead_id===e.bead_id),ie=j.entries.filter(N=>N.bead_id!==e.bead_id),ee=Math.max(0,Math.min(ie.length,K>=0&&C>K?C-1:C)),F=-1;if(ie.forEach((N,Q)=>{n.fixed_members.has(N.bead_id)&&(F=Q)}),ee<=F){r.state.refusal=Qm;return}let P=K>=0?j.entries[K]:d?.entries.find(N=>N.bead_id===e.bead_id)??{bead_id:e.bead_id,root_dir:e.root_dir};l=Po({status:j.status,entries:[...ie.slice(0,ee),P,...ie.slice(ee)]},n);let L=l.entries;if(ri(L,j.entries)||o.push({type:"monitor-lane-update",payload:{lane_id:$,entries:Mo(L)}}),j.status!=="confirmed")return;let z=L.findIndex(N=>N.bead_id===e.bead_id),V=z>0?L[z-1].bead_id:null,ne=z+1<L.length?L[z+1].bead_id:null;if(V===null){ne!==null&&r.addDep(ne,e.bead_id,$);return}if(r.addDep(e.bead_id,V,$),ne!==null&&(r.graph.get(ne)||[]).includes(V)){let N=j.entries.findIndex(Q=>Q.bead_id===ne);(r.laneCreated(ne,V)||N>0&&j.entries[N-1].bead_id===V&&Io(j,N))&&r.removeDep(ne,V),r.addDep(ne,e.bead_id,$)}},m=typeof e.queue_index=="number"?e.queue_index:n.queue_index_of.get(e.bead_id);if(e.kind==="chain"&&(p(),d!==void 0&&(t.kind!=="chain"||t.lane_id!==u)&&(i.push(...Ru(n,d,u,d.entries.filter($=>$.bead_id===e.bead_id))),o.push({type:"monitor-lane-update",payload:{lane_id:u,entries:Mo(d.entries.filter($=>$.bead_id!==e.bead_id))}}))),t.kind==="chain"&&b(t.lane_id,t.marker_index),r.state.refusal!==null)return{refused:r.state.refusal};if(t.kind==="candidate")e.kind!=="candidate"&&s.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let $=rg(n,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")s.push(ti(e.bead_id,e.root_dir,$));else if(e.kind==="parallel"){let C=n.parallel_rows,j=C[Math.max(0,Math.min(C.length,t.marker_index))];if(!(!!j&&j.bead_id===e.bead_id)&&og(n,e.root_dir)&&m!==void 0){let ie=m>$?$:$-1;ie>=0&&ie!==m&&s.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:ie},root_dir:e.root_dir})}}}else if(t.kind==="chain"){let $=n.cross_lanes.get(t.lane_id);e.kind==="candidate"&&$.status==="confirmed"&&s.push(ti(e.bead_id,e.root_dir,n.parallel_raw_length.get(e.root_dir)??0))}else if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(m!==void 0&&t.index!==m){let $=m>t.index?t.index:t.index-1;$>=0&&$!==m&&s.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:$},root_dir:e.root_dir})}}else s.push(ti(e.bead_id,e.root_dir,t.index,t.lane_id));return No(r,n,o,s,{disarm_ops:i,...t.kind==="chain"?{lane_id:t.lane_id,correction:l}:{}})}function Lu(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Jr};if(n.entries.length<2)return{refused:"\uD655\uC815\uD558\uB824\uBA74 \uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4"};let r=Po(n,t);if(r.held)return{refused:ni};let o=r.entries,s=Do(t),i=[];Cu(s,o,e),s.state.refusal===null&&Ou(s,t,o,i);let l=ri(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Mo(o)}}];return l.push({type:"monitor-lane-confirm",payload:{lane_id:e}}),No(s,t,l,i,{lane_id:e,correction:r})}function Iu(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Jr};let r=Po(n,t),o=r.entries,s=Do(t),i=[];Cu(s,o,e),s.state.refusal===null&&Ou(s,t,o,i);let l=ri(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Mo(o)}}];return No(s,t,l,i,{lane_id:e,correction:r})}function Mu(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Jr};let r=Po(n,t),o=r.entries;return No(Do(t),t,ri(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Mo(o)}}],[],{lane_id:e,correction:r})}function Pu(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Jr};let r=Do(t);if(n.status==="confirmed")for(let o=1;o<n.entries.length;o+=1)Io(n,o)&&r.removeDep(n.entries[o].bead_id,n.entries[o-1].bead_id);return No(r,t,[{type:"monitor-lane-remove",payload:{lane_id:e}}],[],{disarm_ops:Ru(t,n,e,n.entries)})}function Du(e,t){let n=t.cross_lanes.get(e);if(n===void 0||n.status!=="confirmed")return null;let r=[],o=[];for(let i=1;i<n.entries.length;i+=1){let l=`  ${n.entries[i].bead_id} \u2190 ${n.entries[i-1].bead_id}`;Io(n,i)?r.push(l):o.push(`${l} (\uB808\uC778\uC774 \uB9CC\uB4E4\uC9C0 \uC54A\uC74C)`)}let s=`\uC5F0\uACB0 ${Aa(t,e)}\uC744 \uC9C0\uC6C1\uB2C8\uB2E4.`;return r.length===0?`${s}
\uC758\uC874\uC740 \uADF8\uB300\uB85C \uB461\uB2C8\uB2E4`:[s,"\uD568\uAED8 \uC81C\uAC70\uD560 \uC758\uC874:",...r,...o.length===0?[]:["\uADF8\uB300\uB85C \uB450\uB294 \uC758\uC874:",...o]].join(`
`)}function Nu(e){let t=new Map;for(let n of e)n.type!=="dep-add"||typeof n.lane_id!="string"||t.set(n.lane_id,[...t.get(n.lane_id)||[],{bead_id:n.a,after:n.b}]);return[...t].map(([n,r])=>({lane_id:n,pairs:r}))}function qu(e,t){let n=new Map(e.map((r,o)=>[r.bead_id,o]));return t.filter(r=>{let o=n.get(r.bead_id);return o!==void 0&&o>0&&e[o-1].bead_id===r.after})}function Sa(e,t){if(e!==null){let n=t.owner_lane_of.get(e.bead_id);if(typeof n=="string"&&t.cross_lanes.has(n))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${Aa(t,n)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`}}return{lane_ops:[{type:"monitor-lane-create",payload:{entries:e===null?[]:[e]}}],ops:[],lane_op_index:0}}var sg="\uC0AC\uC774\uD074";function ig(e){let t=new Map,n=r=>Array.isArray(r)?r.filter(o=>typeof o=="string"&&o.length>0):[];for(let r of Array.isArray(e)?e:[]){if(!r||typeof r!="object")continue;let o=r.bead_blocked_by&&typeof r.bead_blocked_by=="object"?r.bead_blocked_by:{};for(let[s,i]of Object.entries(o))Array.isArray(i)&&t.set(s,n(i));for(let s of[...Array.isArray(r.runnable)?r.runnable:[],...Array.isArray(r.session_active)?r.session_active:[]])s&&typeof s.bead_id=="string"&&Array.isArray(s.blocked_by)&&s.blocked_by.length>0&&t.set(s.bead_id,n(s.blocked_by))}return t}function Ea(e,t,n){let r=ar(e,t),o=[],s=new Set,i=(a,u)=>{for(let d of a)s.has(d.id)||(s.add(d.id),o.push({bead_id:d.id,root_dir:d.root_dir,workspace_name:d.workspace_name,title:d.title,lane:u}))};i(r.running,"running"),i(r.pr_wait,"pr_wait"),i(r.queue,"queue"),i(r.runnable_all,"runnable");let l=n&&typeof n.root_dir=="string"&&n.root_dir.length?n.root_dir:null;return{issues:l===null?o:o.filter(a=>a.root_dir===l),blocked_by_map:ig(e)}}function Fu(e,t){let n=new Map;for(let i of t.issues)!i||typeof i.bead_id!="string"||i.bead_id.length===0||n.has(i.bead_id)||n.set(i.bead_id,i);let r=n.get(e)?.root_dir,o=t.blocked_by_map.get(e)||[],s=[];for(let i of n.values()){if(i.bead_id===e||i.lane==="done"||o.includes(i.bead_id))continue;let l=xa(t.blocked_by_map,i.bead_id,e);s.push({...i,disabled:l,...l?{reason:sg}:{}})}return s.sort((i,l)=>{let a=r!==void 0&&i.root_dir===r,u=r!==void 0&&l.root_dir===r;return a!==u?a?-1:1:i.bead_id.localeCompare(l.bead_id)}),s}function ju(e,t){let n=t.trim().toLowerCase();return n.length===0?e.slice():e.filter(r=>r.bead_id.toLowerCase().includes(n)||r.title.toLowerCase().includes(n))}var{entries:Vu,setPrototypeOf:Bu,isFrozen:ag,getPrototypeOf:lg,getOwnPropertyDescriptor:cg}=Object,{freeze:ln,seal:vn,create:Ma}=Object,{apply:Pa,construct:Da}=typeof Reflect<"u"&&Reflect;ln||(ln=function(t){return t});vn||(vn=function(t){return t});Pa||(Pa=function(t,n){for(var r=arguments.length,o=new Array(r>2?r-2:0),s=2;s<r;s++)o[s-2]=arguments[s];return t.apply(n,o)});Da||(Da=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return new t(...r)});var si=cn(Array.prototype.forEach),ug=cn(Array.prototype.lastIndexOf),Uu=cn(Array.prototype.pop),qo=cn(Array.prototype.push),dg=cn(Array.prototype.splice),ai=cn(String.prototype.toLowerCase),Ta=cn(String.prototype.toString),Ca=cn(String.prototype.match),Fo=cn(String.prototype.replace),pg=cn(String.prototype.indexOf),fg=cn(String.prototype.trim),An=cn(Object.prototype.hasOwnProperty),an=cn(RegExp.prototype.test),jo=_g(TypeError);function cn(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return Pa(e,t,r)}}function _g(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return Da(e,n)}}function bt(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:ai;Bu&&Bu(e,null);let r=t.length;for(;r--;){let o=t[r];if(typeof o=="string"){let s=n(o);s!==o&&(ag(t)||(t[r]=s),o=s)}e[o]=!0}return e}function mg(e){for(let t=0;t<e.length;t++)An(e,t)||(e[t]=null);return e}function Yn(e){let t=Ma(null);for(let[n,r]of Vu(e))An(e,n)&&(Array.isArray(r)?t[n]=mg(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=Yn(r):t[n]=r);return t}function Bo(e,t){for(;e!==null;){let r=cg(e,t);if(r){if(r.get)return cn(r.get);if(typeof r.value=="function")return cn(r.value)}e=lg(e)}function n(){return null}return n}var Wu=ln(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Ra=ln(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Oa=ln(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),gg=ln(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),La=ln(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),hg=ln(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),zu=ln(["#text"]),Hu=ln(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Ia=ln(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Gu=ln(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),ii=ln(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),bg=vn(/\{\{[\w\W]*|[\w\W]*\}\}/gm),yg=vn(/<%[\w\W]*|[\w\W]*%>/gm),vg=vn(/\$\{[\w\W]*/gm),kg=vn(/^data-[\-\w.\u00B7-\uFFFF]+$/),wg=vn(/^aria-[\-\w]+$/),Qu=vn(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),$g=vn(/^(?:\w+script|data):/i),xg=vn(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Xu=vn(/^html$/i),Ag=vn(/^[a-z][.\w]*(-[.\w]+)+$/i),Ku=Object.freeze({__proto__:null,ARIA_ATTR:wg,ATTR_WHITESPACE:xg,CUSTOM_ELEMENT:Ag,DATA_ATTR:kg,DOCTYPE_NAME:Xu,ERB_EXPR:yg,IS_ALLOWED_URI:Qu,IS_SCRIPT_OR_DATA:$g,MUSTACHE_EXPR:bg,TMPLIT_EXPR:vg}),Uo={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Sg=function(){return typeof window>"u"?null:window},Eg=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,o="data-tt-policy-suffix";n&&n.hasAttribute(o)&&(r=n.getAttribute(o));let s="dompurify"+(r?"#"+r:"");try{return t.createPolicy(s,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+s+" could not be created."),null}},Yu=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Zu(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Sg(),t=ve=>Zu(ve);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==Uo.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,o=r.currentScript,{DocumentFragment:s,HTMLTemplateElement:i,Node:l,Element:a,NodeFilter:u,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:p,DOMParser:b,trustedTypes:m}=e,$=a.prototype,C=Bo($,"cloneNode"),j=Bo($,"remove"),K=Bo($,"nextSibling"),ie=Bo($,"childNodes"),ee=Bo($,"parentNode");if(typeof i=="function"){let ve=n.createElement("template");ve.content&&ve.content.ownerDocument&&(n=ve.content.ownerDocument)}let F,P="",{implementation:L,createNodeIterator:z,createDocumentFragment:V,getElementsByTagName:ne}=n,{importNode:N}=r,Q=Yu();t.isSupported=typeof Vu=="function"&&typeof ee=="function"&&L&&L.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:G,ERB_EXPR:X,TMPLIT_EXPR:Re,DATA_ATTR:we,ARIA_ATTR:ce,IS_SCRIPT_OR_DATA:q,ATTR_WHITESPACE:$e,CUSTOM_ELEMENT:Se}=Ku,{IS_ALLOWED_URI:S}=Ku,Z=null,Te=bt({},[...Wu,...Ra,...Oa,...La,...zu]),_e=null,xe=bt({},[...Hu,...Ia,...Gu,...ii]),ge=Object.seal(Ma(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),je=null,ft=null,Le=Object.seal(Ma(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),U=!0,de=!0,se=!1,ae=!0,Ee=!1,me=!0,Oe=!1,Qe=!1,He=!1,Be=!1,te=!1,H=!1,Ae=!0,ut=!1,x="user-content-",W=!0,be=!1,Ie={},Ne=null,Fe=bt({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),dt=null,At=bt({},["audio","video","img","source","image","track"]),Mt=null,zt=bt({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Ot="http://www.w3.org/1998/Math/MathML",_t="http://www.w3.org/2000/svg",ze="http://www.w3.org/1999/xhtml",O=ze,re=!1,he=null,T=bt({},[Ot,_t,ze],Ta),J=bt({},["mi","mo","mn","ms","mtext"]),Pe=bt({},["annotation-xml"]),Ye=bt({},["title","style","font","a","script"]),qe=null,it=["application/xhtml+xml","text/html"],at="text/html",Ue=null,tt=null,kt=n.createElement("form"),Ge=function(E){return E instanceof RegExp||E instanceof Function},Tt=function(){let E=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(tt&&tt===E)){if((!E||typeof E!="object")&&(E={}),E=Yn(E),qe=it.indexOf(E.PARSER_MEDIA_TYPE)===-1?at:E.PARSER_MEDIA_TYPE,Ue=qe==="application/xhtml+xml"?Ta:ai,Z=An(E,"ALLOWED_TAGS")?bt({},E.ALLOWED_TAGS,Ue):Te,_e=An(E,"ALLOWED_ATTR")?bt({},E.ALLOWED_ATTR,Ue):xe,he=An(E,"ALLOWED_NAMESPACES")?bt({},E.ALLOWED_NAMESPACES,Ta):T,Mt=An(E,"ADD_URI_SAFE_ATTR")?bt(Yn(zt),E.ADD_URI_SAFE_ATTR,Ue):zt,dt=An(E,"ADD_DATA_URI_TAGS")?bt(Yn(At),E.ADD_DATA_URI_TAGS,Ue):At,Ne=An(E,"FORBID_CONTENTS")?bt({},E.FORBID_CONTENTS,Ue):Fe,je=An(E,"FORBID_TAGS")?bt({},E.FORBID_TAGS,Ue):Yn({}),ft=An(E,"FORBID_ATTR")?bt({},E.FORBID_ATTR,Ue):Yn({}),Ie=An(E,"USE_PROFILES")?E.USE_PROFILES:!1,U=E.ALLOW_ARIA_ATTR!==!1,de=E.ALLOW_DATA_ATTR!==!1,se=E.ALLOW_UNKNOWN_PROTOCOLS||!1,ae=E.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Ee=E.SAFE_FOR_TEMPLATES||!1,me=E.SAFE_FOR_XML!==!1,Oe=E.WHOLE_DOCUMENT||!1,Be=E.RETURN_DOM||!1,te=E.RETURN_DOM_FRAGMENT||!1,H=E.RETURN_TRUSTED_TYPE||!1,He=E.FORCE_BODY||!1,Ae=E.SANITIZE_DOM!==!1,ut=E.SANITIZE_NAMED_PROPS||!1,W=E.KEEP_CONTENT!==!1,be=E.IN_PLACE||!1,S=E.ALLOWED_URI_REGEXP||Qu,O=E.NAMESPACE||ze,J=E.MATHML_TEXT_INTEGRATION_POINTS||J,Pe=E.HTML_INTEGRATION_POINTS||Pe,ge=E.CUSTOM_ELEMENT_HANDLING||{},E.CUSTOM_ELEMENT_HANDLING&&Ge(E.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(ge.tagNameCheck=E.CUSTOM_ELEMENT_HANDLING.tagNameCheck),E.CUSTOM_ELEMENT_HANDLING&&Ge(E.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(ge.attributeNameCheck=E.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),E.CUSTOM_ELEMENT_HANDLING&&typeof E.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(ge.allowCustomizedBuiltInElements=E.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Ee&&(de=!1),te&&(Be=!0),Ie&&(Z=bt({},zu),_e=[],Ie.html===!0&&(bt(Z,Wu),bt(_e,Hu)),Ie.svg===!0&&(bt(Z,Ra),bt(_e,Ia),bt(_e,ii)),Ie.svgFilters===!0&&(bt(Z,Oa),bt(_e,Ia),bt(_e,ii)),Ie.mathMl===!0&&(bt(Z,La),bt(_e,Gu),bt(_e,ii))),E.ADD_TAGS&&(typeof E.ADD_TAGS=="function"?Le.tagCheck=E.ADD_TAGS:(Z===Te&&(Z=Yn(Z)),bt(Z,E.ADD_TAGS,Ue))),E.ADD_ATTR&&(typeof E.ADD_ATTR=="function"?Le.attributeCheck=E.ADD_ATTR:(_e===xe&&(_e=Yn(_e)),bt(_e,E.ADD_ATTR,Ue))),E.ADD_URI_SAFE_ATTR&&bt(Mt,E.ADD_URI_SAFE_ATTR,Ue),E.FORBID_CONTENTS&&(Ne===Fe&&(Ne=Yn(Ne)),bt(Ne,E.FORBID_CONTENTS,Ue)),W&&(Z["#text"]=!0),Oe&&bt(Z,["html","head","body"]),Z.table&&(bt(Z,["tbody"]),delete je.tbody),E.TRUSTED_TYPES_POLICY){if(typeof E.TRUSTED_TYPES_POLICY.createHTML!="function")throw jo('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof E.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw jo('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');F=E.TRUSTED_TYPES_POLICY,P=F.createHTML("")}else F===void 0&&(F=Eg(m,o)),F!==null&&typeof P=="string"&&(P=F.createHTML(""));ln&&ln(E),tt=E}},Xe=bt({},[...Ra,...Oa,...gg]),pt=bt({},[...La,...hg]),jt=function(E){let fe=ee(E);(!fe||!fe.tagName)&&(fe={namespaceURI:O,tagName:"template"});let k=ai(E.tagName),I=ai(fe.tagName);return he[E.namespaceURI]?E.namespaceURI===_t?fe.namespaceURI===ze?k==="svg":fe.namespaceURI===Ot?k==="svg"&&(I==="annotation-xml"||J[I]):!!Xe[k]:E.namespaceURI===Ot?fe.namespaceURI===ze?k==="math":fe.namespaceURI===_t?k==="math"&&Pe[I]:!!pt[k]:E.namespaceURI===ze?fe.namespaceURI===_t&&!Pe[I]||fe.namespaceURI===Ot&&!J[I]?!1:!pt[k]&&(Ye[k]||!Xe[k]):!!(qe==="application/xhtml+xml"&&he[E.namespaceURI]):!1},Ct=function(E){qo(t.removed,{element:E});try{ee(E).removeChild(E)}catch{j(E)}},qt=function(E,fe){try{qo(t.removed,{attribute:fe.getAttributeNode(E),from:fe})}catch{qo(t.removed,{attribute:null,from:fe})}if(fe.removeAttribute(E),E==="is")if(Be||te)try{Ct(fe)}catch{}else try{fe.setAttribute(E,"")}catch{}},Bt=function(E){let fe=null,k=null;if(He)E="<remove></remove>"+E;else{let De=Ca(E,/^[\r\n\t ]+/);k=De&&De[0]}qe==="application/xhtml+xml"&&O===ze&&(E='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+E+"</body></html>");let I=F?F.createHTML(E):E;if(O===ze)try{fe=new b().parseFromString(I,qe)}catch{}if(!fe||!fe.documentElement){fe=L.createDocument(O,"template",null);try{fe.documentElement.innerHTML=re?P:I}catch{}}let ke=fe.body||fe.documentElement;return E&&k&&ke.insertBefore(n.createTextNode(k),ke.childNodes[0]||null),O===ze?ne.call(fe,Oe?"html":"body")[0]:Oe?fe.documentElement:ke},pn=function(E){return z.call(E.ownerDocument||E,E,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},Vt=function(E){return E instanceof p&&(typeof E.nodeName!="string"||typeof E.textContent!="string"||typeof E.removeChild!="function"||!(E.attributes instanceof d)||typeof E.removeAttribute!="function"||typeof E.setAttribute!="function"||typeof E.namespaceURI!="string"||typeof E.insertBefore!="function"||typeof E.hasChildNodes!="function")},Qt=function(E){return typeof l=="function"&&E instanceof l};function Gt(ve,E,fe){si(ve,k=>{k.call(t,E,fe,tt)})}let Ft=function(E){let fe=null;if(Gt(Q.beforeSanitizeElements,E,null),Vt(E))return Ct(E),!0;let k=Ue(E.nodeName);if(Gt(Q.uponSanitizeElement,E,{tagName:k,allowedTags:Z}),me&&E.hasChildNodes()&&!Qt(E.firstElementChild)&&an(/<[/\w!]/g,E.innerHTML)&&an(/<[/\w!]/g,E.textContent)||E.nodeType===Uo.progressingInstruction||me&&E.nodeType===Uo.comment&&an(/<[/\w]/g,E.data))return Ct(E),!0;if(!(Le.tagCheck instanceof Function&&Le.tagCheck(k))&&(!Z[k]||je[k])){if(!je[k]&&Ht(k)&&(ge.tagNameCheck instanceof RegExp&&an(ge.tagNameCheck,k)||ge.tagNameCheck instanceof Function&&ge.tagNameCheck(k)))return!1;if(W&&!Ne[k]){let I=ee(E)||E.parentNode,ke=ie(E)||E.childNodes;if(ke&&I){let De=ke.length;for(let ue=De-1;ue>=0;--ue){let Ze=C(ke[ue],!0);Ze.__removalCount=(E.__removalCount||0)+1,I.insertBefore(Ze,K(E))}}}return Ct(E),!0}return E instanceof a&&!jt(E)||(k==="noscript"||k==="noembed"||k==="noframes")&&an(/<\/no(script|embed|frames)/i,E.innerHTML)?(Ct(E),!0):(Ee&&E.nodeType===Uo.text&&(fe=E.textContent,si([G,X,Re],I=>{fe=Fo(fe,I," ")}),E.textContent!==fe&&(qo(t.removed,{element:E.cloneNode()}),E.textContent=fe)),Gt(Q.afterSanitizeElements,E,null),!1)},Zt=function(E,fe,k){if(Ae&&(fe==="id"||fe==="name")&&(k in n||k in kt))return!1;if(!(de&&!ft[fe]&&an(we,fe))){if(!(U&&an(ce,fe))){if(!(Le.attributeCheck instanceof Function&&Le.attributeCheck(fe,E))){if(!_e[fe]||ft[fe]){if(!(Ht(E)&&(ge.tagNameCheck instanceof RegExp&&an(ge.tagNameCheck,E)||ge.tagNameCheck instanceof Function&&ge.tagNameCheck(E))&&(ge.attributeNameCheck instanceof RegExp&&an(ge.attributeNameCheck,fe)||ge.attributeNameCheck instanceof Function&&ge.attributeNameCheck(fe,E))||fe==="is"&&ge.allowCustomizedBuiltInElements&&(ge.tagNameCheck instanceof RegExp&&an(ge.tagNameCheck,k)||ge.tagNameCheck instanceof Function&&ge.tagNameCheck(k))))return!1}else if(!Mt[fe]){if(!an(S,Fo(k,$e,""))){if(!((fe==="src"||fe==="xlink:href"||fe==="href")&&E!=="script"&&pg(k,"data:")===0&&dt[E])){if(!(se&&!an(q,Fo(k,$e,"")))){if(k)return!1}}}}}}}return!0},Ht=function(E){return E!=="annotation-xml"&&Ca(E,Se)},wt=function(E){Gt(Q.beforeSanitizeAttributes,E,null);let{attributes:fe}=E;if(!fe||Vt(E))return;let k={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:_e,forceKeepAttr:void 0},I=fe.length;for(;I--;){let ke=fe[I],{name:De,namespaceURI:ue,value:Ze}=ke,yt=Ue(De),gt=Ze,Ke=De==="value"?gt:fg(gt);if(k.attrName=yt,k.attrValue=Ke,k.keepAttr=!0,k.forceKeepAttr=void 0,Gt(Q.uponSanitizeAttribute,E,k),Ke=k.attrValue,ut&&(yt==="id"||yt==="name")&&(qt(De,E),Ke=x+Ke),me&&an(/((--!?|])>)|<\/(style|title|textarea)/i,Ke)){qt(De,E);continue}if(yt==="attributename"&&Ca(Ke,"href")){qt(De,E);continue}if(k.forceKeepAttr)continue;if(!k.keepAttr){qt(De,E);continue}if(!ae&&an(/\/>/i,Ke)){qt(De,E);continue}Ee&&si([G,X,Re],g=>{Ke=Fo(Ke,g," ")});let h=Ue(E.nodeName);if(!Zt(h,yt,Ke)){qt(De,E);continue}if(F&&typeof m=="object"&&typeof m.getAttributeType=="function"&&!ue)switch(m.getAttributeType(h,yt)){case"TrustedHTML":{Ke=F.createHTML(Ke);break}case"TrustedScriptURL":{Ke=F.createScriptURL(Ke);break}}if(Ke!==gt)try{ue?E.setAttributeNS(ue,De,Ke):E.setAttribute(De,Ke),Vt(E)?Ct(E):Uu(t.removed)}catch{qt(De,E)}}Gt(Q.afterSanitizeAttributes,E,null)},rn=function ve(E){let fe=null,k=pn(E);for(Gt(Q.beforeSanitizeShadowDOM,E,null);fe=k.nextNode();)Gt(Q.uponSanitizeShadowNode,fe,null),Ft(fe),wt(fe),fe.content instanceof s&&ve(fe.content);Gt(Q.afterSanitizeShadowDOM,E,null)};return t.sanitize=function(ve){let E=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},fe=null,k=null,I=null,ke=null;if(re=!ve,re&&(ve="<!-->"),typeof ve!="string"&&!Qt(ve))if(typeof ve.toString=="function"){if(ve=ve.toString(),typeof ve!="string")throw jo("dirty is not a string, aborting")}else throw jo("toString is not a function");if(!t.isSupported)return ve;if(Qe||Tt(E),t.removed=[],typeof ve=="string"&&(be=!1),be){if(ve.nodeName){let Ze=Ue(ve.nodeName);if(!Z[Ze]||je[Ze])throw jo("root node is forbidden and cannot be sanitized in-place")}}else if(ve instanceof l)fe=Bt("<!---->"),k=fe.ownerDocument.importNode(ve,!0),k.nodeType===Uo.element&&k.nodeName==="BODY"||k.nodeName==="HTML"?fe=k:fe.appendChild(k);else{if(!Be&&!Ee&&!Oe&&ve.indexOf("<")===-1)return F&&H?F.createHTML(ve):ve;if(fe=Bt(ve),!fe)return Be?null:H?P:""}fe&&He&&Ct(fe.firstChild);let De=pn(be?ve:fe);for(;I=De.nextNode();)Ft(I),wt(I),I.content instanceof s&&rn(I.content);if(be)return ve;if(Be){if(te)for(ke=V.call(fe.ownerDocument);fe.firstChild;)ke.appendChild(fe.firstChild);else ke=fe;return(_e.shadowroot||_e.shadowrootmode)&&(ke=N.call(r,ke,!0)),ke}let ue=Oe?fe.outerHTML:fe.innerHTML;return Oe&&Z["!doctype"]&&fe.ownerDocument&&fe.ownerDocument.doctype&&fe.ownerDocument.doctype.name&&an(Xu,fe.ownerDocument.doctype.name)&&(ue="<!DOCTYPE "+fe.ownerDocument.doctype.name+`>
`+ue),Ee&&si([G,X,Re],Ze=>{ue=Fo(ue,Ze," ")}),F&&H?F.createHTML(ue):ue},t.setConfig=function(){let ve=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Tt(ve),Qe=!0},t.clearConfig=function(){tt=null,Qe=!1},t.isValidAttribute=function(ve,E,fe){tt||Tt({});let k=Ue(ve),I=Ue(E);return Zt(k,I,fe)},t.addHook=function(ve,E){typeof E=="function"&&qo(Q[ve],E)},t.removeHook=function(ve,E){if(E!==void 0){let fe=ug(Q[ve],E);return fe===-1?void 0:dg(Q[ve],fe,1)[0]}return Uu(Q[ve])},t.removeHooks=function(ve){Q[ve]=[]},t.removeAllHooks=function(){Q=Yu()},t}var Ju=Zu();var Vn={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},li=e=>(...t)=>({_$litDirective$:e,values:t}),eo=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var Wo=class extends eo{constructor(t){if(super(t),this.it=Dt,t.type!==Vn.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Dt||t==null)return this._t=void 0,this.it=t;if(t===yn)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};Wo.directiveName="unsafeHTML",Wo.resultType=1;var ed=li(Wo);function ja(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var xr=ja();function ad(e){xr=e}var Ko={exec:()=>null};function xt(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(o,s)=>{let i=typeof s=="string"?s:s.source;return i=i.replace(un.caret,"$1"),n=n.replace(o,i),r},getRegex:()=>new RegExp(n,t)};return r}var Tg=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),un={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Cg=/^(?:[ \t]*(?:\n|$))+/,Rg=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Og=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Yo=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Lg=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Ba=/(?:[*+-]|\d{1,9}[.)])/,ld=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,cd=xt(ld).replace(/bull/g,Ba).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Ig=xt(ld).replace(/bull/g,Ba).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Ua=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Mg=/^[^\n]+/,Wa=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Pg=xt(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Wa).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Dg=xt(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Ba).getRegex(),_i="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",za=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Ng=xt("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",za).replace("tag",_i).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),ud=xt(Ua).replace("hr",Yo).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",_i).getRegex(),qg=xt(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",ud).getRegex(),Ha={blockquote:qg,code:Rg,def:Pg,fences:Og,heading:Lg,hr:Yo,html:Ng,lheading:cd,list:Dg,newline:Cg,paragraph:ud,table:Ko,text:Mg},td=xt("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Yo).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",_i).getRegex(),Fg={...Ha,lheading:Ig,table:td,paragraph:xt(Ua).replace("hr",Yo).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",td).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",_i).getRegex()},jg={...Ha,html:xt(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",za).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Ko,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:xt(Ua).replace("hr",Yo).replace("heading",` *#{1,6} *[^
]`).replace("lheading",cd).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Bg=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Ug=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,dd=/^( {2,}|\\)\n(?!\s*$)/,Wg=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,mi=/[\p{P}\p{S}]/u,Ga=/[\s\p{P}\p{S}]/u,pd=/[^\s\p{P}\p{S}]/u,zg=xt(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Ga).getRegex(),fd=/(?!~)[\p{P}\p{S}]/u,Hg=/(?!~)[\s\p{P}\p{S}]/u,Gg=/(?:[^\s\p{P}\p{S}]|~)/u,Kg=xt(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Tg?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),_d=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Yg=xt(_d,"u").replace(/punct/g,mi).getRegex(),Vg=xt(_d,"u").replace(/punct/g,fd).getRegex(),md="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Qg=xt(md,"gu").replace(/notPunctSpace/g,pd).replace(/punctSpace/g,Ga).replace(/punct/g,mi).getRegex(),Xg=xt(md,"gu").replace(/notPunctSpace/g,Gg).replace(/punctSpace/g,Hg).replace(/punct/g,fd).getRegex(),Zg=xt("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,pd).replace(/punctSpace/g,Ga).replace(/punct/g,mi).getRegex(),Jg=xt(/\\(punct)/,"gu").replace(/punct/g,mi).getRegex(),eh=xt(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),th=xt(za).replace("(?:-->|$)","-->").getRegex(),nh=xt("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",th).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),di=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,rh=xt(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",di).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),gd=xt(/^!?\[(label)\]\[(ref)\]/).replace("label",di).replace("ref",Wa).getRegex(),hd=xt(/^!?\[(ref)\](?:\[\])?/).replace("ref",Wa).getRegex(),oh=xt("reflink|nolink(?!\\()","g").replace("reflink",gd).replace("nolink",hd).getRegex(),nd=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Ka={_backpedal:Ko,anyPunctuation:Jg,autolink:eh,blockSkip:Kg,br:dd,code:Ug,del:Ko,emStrongLDelim:Yg,emStrongRDelimAst:Qg,emStrongRDelimUnd:Zg,escape:Bg,link:rh,nolink:hd,punctuation:zg,reflink:gd,reflinkSearch:oh,tag:nh,text:Wg,url:Ko},sh={...Ka,link:xt(/^!?\[(label)\]\((.*?)\)/).replace("label",di).getRegex(),reflink:xt(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",di).getRegex()},Na={...Ka,emStrongRDelimAst:Xg,emStrongLDelim:Vg,url:xt(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",nd).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:xt(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",nd).getRegex()},ih={...Na,br:xt(dd).replace("{2,}","*").getRegex(),text:xt(Na.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},ci={normal:Ha,gfm:Fg,pedantic:jg},zo={normal:Ka,gfm:Na,breaks:ih,pedantic:sh},ah={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},rd=e=>ah[e];function Qn(e,t){if(t){if(un.escapeTest.test(e))return e.replace(un.escapeReplace,rd)}else if(un.escapeTestNoEncode.test(e))return e.replace(un.escapeReplaceNoEncode,rd);return e}function od(e){try{e=encodeURI(e).replace(un.percentDecode,"%")}catch{return null}return e}function sd(e,t){let n=e.replace(un.findPipe,(s,i,l)=>{let a=!1,u=i;for(;--u>=0&&l[u]==="\\";)a=!a;return a?"|":" |"}),r=n.split(un.splitPipe),o=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;o<r.length;o++)r[o]=r[o].trim().replace(un.slashPipe,"|");return r}function Ho(e,t,n){let r=e.length;if(r===0)return"";let o=0;for(;o<r;){let s=e.charAt(r-o-1);if(s===t&&!n)o++;else if(s!==t&&n)o++;else break}return e.slice(0,r-o)}function lh(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function id(e,t,n,r,o){let s=t.href,i=t.title||null,l=e[1].replace(o.other.outputLinkReplace,"$1");r.state.inLink=!0;let a={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:s,title:i,text:l,tokens:r.inlineTokens(l)};return r.state.inLink=!1,a}function ch(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let o=r[1];return t.split(`
`).map(s=>{let i=s.match(n.other.beginningSpace);if(i===null)return s;let[l]=i;return l.length>=o.length?s.slice(o.length):s}).join(`
`)}var pi=class{constructor(e){Rt(this,"options");Rt(this,"rules");Rt(this,"lexer");this.options=e||xr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:Ho(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=ch(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=Ho(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Ho(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=Ho(t[0],`
`).split(`
`),r="",o="",s=[];for(;n.length>0;){let i=!1,l=[],a;for(a=0;a<n.length;a++)if(this.rules.other.blockquoteStart.test(n[a]))l.push(n[a]),i=!0;else if(!i)l.push(n[a]);else break;n=n.slice(a);let u=l.join(`
`),d=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${u}`:u,o=o?`${o}
${d}`:d;let p=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,s,!0),this.lexer.state.top=p,n.length===0)break;let b=s.at(-1);if(b?.type==="code")break;if(b?.type==="blockquote"){let m=b,$=m.raw+`
`+n.join(`
`),C=this.blockquote($);s[s.length-1]=C,r=r.substring(0,r.length-m.raw.length)+C.raw,o=o.substring(0,o.length-m.text.length)+C.text;break}else if(b?.type==="list"){let m=b,$=m.raw+`
`+n.join(`
`),C=this.list($);s[s.length-1]=C,r=r.substring(0,r.length-b.raw.length)+C.raw,o=o.substring(0,o.length-m.raw.length)+C.raw,n=$.substring(s.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:s,text:o}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,o={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let s=this.rules.other.listItemRegex(n),i=!1;for(;e;){let a=!1,u="",d="";if(!(t=s.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let p=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,C=>" ".repeat(3*C.length)),b=e.split(`
`,1)[0],m=!p.trim(),$=0;if(this.options.pedantic?($=2,d=p.trimStart()):m?$=t[1].length+1:($=t[2].search(this.rules.other.nonSpaceChar),$=$>4?1:$,d=p.slice($),$+=t[1].length),m&&this.rules.other.blankLine.test(b)&&(u+=b+`
`,e=e.substring(b.length+1),a=!0),!a){let C=this.rules.other.nextBulletRegex($),j=this.rules.other.hrRegex($),K=this.rules.other.fencesBeginRegex($),ie=this.rules.other.headingBeginRegex($),ee=this.rules.other.htmlBeginRegex($);for(;e;){let F=e.split(`
`,1)[0],P;if(b=F,this.options.pedantic?(b=b.replace(this.rules.other.listReplaceNesting,"  "),P=b):P=b.replace(this.rules.other.tabCharGlobal,"    "),K.test(b)||ie.test(b)||ee.test(b)||C.test(b)||j.test(b))break;if(P.search(this.rules.other.nonSpaceChar)>=$||!b.trim())d+=`
`+P.slice($);else{if(m||p.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||K.test(p)||ie.test(p)||j.test(p))break;d+=`
`+b}!m&&!b.trim()&&(m=!0),u+=F+`
`,e=e.substring(F.length+1),p=P.slice($)}}o.loose||(i?o.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(i=!0)),o.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(d),loose:!1,text:d,tokens:[]}),o.raw+=u}let l=o.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;o.raw=o.raw.trimEnd();for(let a of o.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let d=this.lexer.inlineQueue.length-1;d>=0;d--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[d].src)){this.lexer.inlineQueue[d].src=this.lexer.inlineQueue[d].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(a.raw);if(u){let d={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};a.checked=d.checked,o.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=d.raw+a.tokens[0].raw,a.tokens[0].text=d.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(d)):a.tokens.unshift({type:"paragraph",raw:d.raw,text:d.raw,tokens:[d]}):a.tokens.unshift(d)}}if(!o.loose){let u=a.tokens.filter(p=>p.type==="space"),d=u.length>0&&u.some(p=>this.rules.other.anyLine.test(p.raw));o.loose=d}}if(o.loose)for(let a of o.items){a.loose=!0;for(let u of a.tokens)u.type==="text"&&(u.type="paragraph")}return o}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",o=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:o}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=sd(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),o=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],s={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let i of r)this.rules.other.tableAlignRight.test(i)?s.align.push("right"):this.rules.other.tableAlignCenter.test(i)?s.align.push("center"):this.rules.other.tableAlignLeft.test(i)?s.align.push("left"):s.align.push(null);for(let i=0;i<n.length;i++)s.header.push({text:n[i],tokens:this.lexer.inline(n[i]),header:!0,align:s.align[i]});for(let i of o)s.rows.push(sd(i,s.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:s.align[a]})));return s}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let s=Ho(n.slice(0,-1),"\\");if((n.length-s.length)%2===0)return}else{let s=lh(t[2],"()");if(s===-2)return;if(s>-1){let i=(t[0].indexOf("!")===0?5:4)+t[1].length+s;t[2]=t[2].substring(0,s),t[0]=t[0].substring(0,i).trim(),t[3]=""}}let r=t[2],o="";if(this.options.pedantic){let s=this.rules.other.pedanticHrefTitle.exec(r);s&&(r=s[1],o=s[3])}else o=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),id(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:o&&o.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),o=t[r.toLowerCase()];if(!o){let s=n[0].charAt(0);return{type:"text",raw:s,text:s}}return id(n,o,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let o=[...r[0]].length-1,s,i,l=o,a=0,u=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+o);(r=u.exec(t))!=null;){if(s=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!s)continue;if(i=[...s].length,r[3]||r[4]){l+=i;continue}else if((r[5]||r[6])&&o%3&&!((o+i)%3)){a+=i;continue}if(l-=i,l>0)continue;i=Math.min(i,i+l+a);let d=[...r[0]][0].length,p=e.slice(0,o+r.index+d+i);if(Math.min(o,i)%2){let m=p.slice(1,-1);return{type:"em",raw:p,text:m,tokens:this.lexer.inlineTokens(m)}}let b=p.slice(2,-2);return{type:"strong",raw:p,text:b,tokens:this.lexer.inlineTokens(b)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),o=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&o&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let o;do o=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(o!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Sn=class qa{constructor(t){Rt(this,"tokens");Rt(this,"options");Rt(this,"state");Rt(this,"inlineQueue");Rt(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||xr,this.options.tokenizer=this.options.tokenizer||new pi,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:un,block:ci.normal,inline:zo.normal};this.options.pedantic?(n.block=ci.pedantic,n.inline=zo.pedantic):this.options.gfm&&(n.block=ci.gfm,this.options.breaks?n.inline=zo.breaks:n.inline=zo.gfm),this.tokenizer.rules=n}static get rules(){return{block:ci,inline:zo}}static lex(t,n){return new qa(n).lex(t)}static lexInline(t,n){return new qa(n).inlineTokens(t)}lex(t){t=t.replace(un.carriageReturn,`
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
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):n.push(o);continue}if(t){let i="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,o=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(o=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)a.includes(o[0].slice(o[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,o.index)+"["+"a".repeat(o[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(o=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,o.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let s;for(;(o=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)s=o[2]?o[2].length:0,r=r.slice(0,o.index+s)+"["+"a".repeat(o[0].length-s-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let i=!1,l="";for(;t;){i||(l=""),i=!1;let a;if(this.options.extensions?.inline?.some(d=>(a=d.call({lexer:this},t,n))?(t=t.substring(a.raw.length),n.push(a),!0):!1))continue;if(a=this.tokenizer.escape(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.tag(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.link(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(a.raw.length);let d=n.at(-1);a.type==="text"&&d?.type==="text"?(d.raw+=a.raw,d.text+=a.text):n.push(a);continue}if(a=this.tokenizer.emStrong(t,r,l)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.codespan(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.br(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.del(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.autolink(t)){t=t.substring(a.raw.length),n.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(t))){t=t.substring(a.raw.length),n.push(a);continue}let u=t;if(this.options.extensions?.startInline){let d=1/0,p=t.slice(1),b;this.options.extensions.startInline.forEach(m=>{b=m.call({lexer:this},p),typeof b=="number"&&b>=0&&(d=Math.min(d,b))}),d<1/0&&d>=0&&(u=t.substring(0,d+1))}if(a=this.tokenizer.inlineText(u)){t=t.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),i=!0;let d=n.at(-1);d?.type==="text"?(d.raw+=a.raw,d.text+=a.text):n.push(a);continue}if(t){let d="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(d);break}else throw new Error(d)}}return n}},fi=class{constructor(e){Rt(this,"options");Rt(this,"parser");this.options=e||xr}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(un.notSpaceStart)?.[0],o=e.replace(un.endingNewline,"")+`
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Qn(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),o=od(e);if(o===null)return r;e=o;let s='<a href="'+e+'"';return t&&(s+=' title="'+Qn(t)+'"'),s+=">"+r+"</a>",s}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let o=od(e);if(o===null)return Qn(n);e=o;let s=`<img src="${e}" alt="${n}"`;return t&&(s+=` title="${Qn(t)}"`),s+=">",s}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Qn(e.text)}},Ya=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},En=class Fa{constructor(t){Rt(this,"options");Rt(this,"renderer");Rt(this,"textRenderer");this.options=t||xr,this.options.renderer=this.options.renderer||new fi,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Ya}static parse(t,n){return new Fa(n).parse(t)}static parseInline(t,n){return new Fa(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let o=t[r];if(this.options.extensions?.renderers?.[o.type]){let i=o,l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(i.type)){n+=l||"";continue}}let s=o;switch(s.type){case"space":{n+=this.renderer.space(s);break}case"hr":{n+=this.renderer.hr(s);break}case"heading":{n+=this.renderer.heading(s);break}case"code":{n+=this.renderer.code(s);break}case"table":{n+=this.renderer.table(s);break}case"blockquote":{n+=this.renderer.blockquote(s);break}case"list":{n+=this.renderer.list(s);break}case"checkbox":{n+=this.renderer.checkbox(s);break}case"html":{n+=this.renderer.html(s);break}case"def":{n+=this.renderer.def(s);break}case"paragraph":{n+=this.renderer.paragraph(s);break}case"text":{n+=this.renderer.text(s);break}default:{let i='Token with "'+s.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return n}parseInline(t,n=this.renderer){let r="";for(let o=0;o<t.length;o++){let s=t[o];if(this.options.extensions?.renderers?.[s.type]){let l=this.options.extensions.renderers[s.type].call({parser:this},s);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(s.type)){r+=l||"";continue}}let i=s;switch(i.type){case"escape":{r+=n.text(i);break}case"html":{r+=n.html(i);break}case"link":{r+=n.link(i);break}case"image":{r+=n.image(i);break}case"checkbox":{r+=n.checkbox(i);break}case"strong":{r+=n.strong(i);break}case"em":{r+=n.em(i);break}case"codespan":{r+=n.codespan(i);break}case"br":{r+=n.br(i);break}case"del":{r+=n.del(i);break}case"text":{r+=n.text(i);break}default:{let l='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return r}},ui,Go=(ui=class{constructor(e){Rt(this,"options");Rt(this,"block");this.options=e||xr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Sn.lex:Sn.lexInline}provideParser(){return this.block?En.parse:En.parseInline}},Rt(ui,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),Rt(ui,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),ui),uh=class{constructor(...e){Rt(this,"defaults",ja());Rt(this,"options",this.setOptions);Rt(this,"parse",this.parseMarkdown(!0));Rt(this,"parseInline",this.parseMarkdown(!1));Rt(this,"Parser",En);Rt(this,"Renderer",fi);Rt(this,"TextRenderer",Ya);Rt(this,"Lexer",Sn);Rt(this,"Tokenizer",pi);Rt(this,"Hooks",Go);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let o=r;for(let s of o.header)n=n.concat(this.walkTokens(s.tokens,t));for(let s of o.rows)for(let i of s)n=n.concat(this.walkTokens(i.tokens,t));break}case"list":{let o=r;n=n.concat(this.walkTokens(o.items,t));break}default:{let o=r;this.defaults.extensions?.childTokens?.[o.type]?this.defaults.extensions.childTokens[o.type].forEach(s=>{let i=o[s].flat(1/0);n=n.concat(this.walkTokens(i,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(o=>{if(!o.name)throw new Error("extension name required");if("renderer"in o){let s=t.renderers[o.name];s?t.renderers[o.name]=function(...i){let l=o.renderer.apply(this,i);return l===!1&&(l=s.apply(this,i)),l}:t.renderers[o.name]=o.renderer}if("tokenizer"in o){if(!o.level||o.level!=="block"&&o.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let s=t[o.level];s?s.unshift(o.tokenizer):t[o.level]=[o.tokenizer],o.start&&(o.level==="block"?t.startBlock?t.startBlock.push(o.start):t.startBlock=[o.start]:o.level==="inline"&&(t.startInline?t.startInline.push(o.start):t.startInline=[o.start]))}"childTokens"in o&&o.childTokens&&(t.childTokens[o.name]=o.childTokens)}),r.extensions=t),n.renderer){let o=this.defaults.renderer||new fi(this.defaults);for(let s in n.renderer){if(!(s in o))throw new Error(`renderer '${s}' does not exist`);if(["options","parser"].includes(s))continue;let i=s,l=n.renderer[i],a=o[i];o[i]=(...u)=>{let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d||""}}r.renderer=o}if(n.tokenizer){let o=this.defaults.tokenizer||new pi(this.defaults);for(let s in n.tokenizer){if(!(s in o))throw new Error(`tokenizer '${s}' does not exist`);if(["options","rules","lexer"].includes(s))continue;let i=s,l=n.tokenizer[i],a=o[i];o[i]=(...u)=>{let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d}}r.tokenizer=o}if(n.hooks){let o=this.defaults.hooks||new Go;for(let s in n.hooks){if(!(s in o))throw new Error(`hook '${s}' does not exist`);if(["options","block"].includes(s))continue;let i=s,l=n.hooks[i],a=o[i];Go.passThroughHooks.has(s)?o[i]=u=>{if(this.defaults.async&&Go.passThroughHooksRespectAsync.has(s))return(async()=>{let p=await l.call(o,u);return a.call(o,p)})();let d=l.call(o,u);return a.call(o,d)}:o[i]=(...u)=>{if(this.defaults.async)return(async()=>{let p=await l.apply(o,u);return p===!1&&(p=await a.apply(o,u)),p})();let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d}}r.hooks=o}if(n.walkTokens){let o=this.defaults.walkTokens,s=n.walkTokens;r.walkTokens=function(i){let l=[];return l.push(s.call(this,i)),o&&(l=l.concat(o.call(this,i))),l}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Sn.lex(e,t??this.defaults)}parser(e,t){return En.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},o={...this.defaults,...r},s=this.onError(!!o.silent,!!o.async);if(this.defaults.async===!0&&r.async===!1)return s(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return s(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return s(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(o.hooks&&(o.hooks.options=o,o.hooks.block=e),o.async)return(async()=>{let i=o.hooks?await o.hooks.preprocess(t):t,l=await(o.hooks?await o.hooks.provideLexer():e?Sn.lex:Sn.lexInline)(i,o),a=o.hooks?await o.hooks.processAllTokens(l):l;o.walkTokens&&await Promise.all(this.walkTokens(a,o.walkTokens));let u=await(o.hooks?await o.hooks.provideParser():e?En.parse:En.parseInline)(a,o);return o.hooks?await o.hooks.postprocess(u):u})().catch(s);try{o.hooks&&(t=o.hooks.preprocess(t));let i=(o.hooks?o.hooks.provideLexer():e?Sn.lex:Sn.lexInline)(t,o);o.hooks&&(i=o.hooks.processAllTokens(i)),o.walkTokens&&this.walkTokens(i,o.walkTokens);let l=(o.hooks?o.hooks.provideParser():e?En.parse:En.parseInline)(i,o);return o.hooks&&(l=o.hooks.postprocess(l)),l}catch(i){return s(i)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+Qn(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},$r=new uh;function St(e,t){return $r.parse(e,t)}St.options=St.setOptions=function(e){return $r.setOptions(e),St.defaults=$r.defaults,ad(St.defaults),St};St.getDefaults=ja;St.defaults=xr;St.use=function(...e){return $r.use(...e),St.defaults=$r.defaults,ad(St.defaults),St};St.walkTokens=function(e,t){return $r.walkTokens(e,t)};St.parseInline=$r.parseInline;St.Parser=En;St.parser=En.parse;St.Renderer=fi;St.TextRenderer=Ya;St.Lexer=Sn;St.lexer=Sn.lex;St.Tokenizer=pi;St.Hooks=Go;St.parse=St;var f$=St.options,_$=St.setOptions,m$=St.use,g$=St.walkTokens,h$=St.parseInline;var b$=En.parse,y$=Sn.lex;function lr(e){let t=St.parse(e),n=Ju.sanitize(t);return ed(n)}function Xn(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function to(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function gi(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var yd={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},dh={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},ph=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,fh=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function Tn(e){return!!e&&typeof e=="object"}function Va(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function Qa(e,t){let n=Va(e),r=Va(t),o=new Map;for(let l of n)o.set(l,(o.get(l)||0)+1);let s=0;for(let l of r){let a=o.get(l)||0;a>0?o.set(l,a-1):s+=1}let i=0;for(let l of o.values())i+=l;return{added:s,removed:i}}function vd(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(o=>Tn(o)&&typeof o.text=="string"?o.text:"").join(""):Tn(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(o=>o.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function _h(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:yd[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=Va(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:o,removed:s}=Qa(n.old_string,n.new_string);r.added=o,r.removed=s}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let o=0,s=0,i=Array.isArray(n.edits)?n.edits:[];for(let l of i){let a=Qa(Tn(l)?l.old_string:"",Tn(l)?l.new_string:"");o+=a.added,s+=a.removed}r.added=o,r.removed=s}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(r.launch_id=e.id),typeof n.description=="string"&&(r.command=n.description)),r}function Xa(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}var mh=/<system-reminder>[\s\S]*?<\/system-reminder>/g;function kd(e){let t;if(typeof e=="string")t=e;else if(Array.isArray(e))t=e.filter(r=>Tn(r)&&r.type==="text"&&typeof r.text=="string").map(r=>String(r.text)).join(`
`);else return null;let n=t.replace(mh,"").trim();return n.length>0?{kind:"user",text:n}:null}function Za(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=ph.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:fh.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function gh(e,t){if(e.subtype==="init"){let n=typeof e.model=="string"?e.model:"";return t.progress=null,[{kind:"thinking",text:n?`\uC138\uC158 \uC2DC\uC791 \xB7 ${n}`:"\uC138\uC158 \uC2DC\uC791"}]}if(e.subtype==="thinking_tokens"){let r=`\uC0DD\uAC01 \uC911\u2026 ${typeof e.estimated_tokens=="number"&&Number.isFinite(e.estimated_tokens)?Math.max(0,Math.round(e.estimated_tokens)):0} \uD1A0\uD070`;return t.progress?(t.progress.text=r,[]):(t.progress={kind:"thinking",text:r},[t.progress])}return[]}function hh(e,t){let n=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let r=e.message,o=r&&Array.isArray(r.content)?r.content:[],s=[];for(let i of o)if(Tn(i)){if(i.type==="text"&&typeof i.text=="string")s.push(Za(i.text));else if(i.type==="thinking"){let l=Xa(i.thinking);l&&s.push(l)}else if(i.type==="tool_use"){let l=_h(i);typeof i.id=="string"&&t.set(i.id,l),s.push(l)}}return n?bd(s,n):s}if(e.type==="user"){let r=e.message,o=r&&Array.isArray(r.content)?r.content:[];for(let i of o)if(Tn(i)&&i.type==="tool_result"){let l=t.get(String(i.tool_use_id));if(l){let a=vd(i.content);l.result=a,l.output=typeof i.content=="string"?i.content:a,i.is_error===!0&&(l.is_error=!0)}}let s=kd(r&&r.content);return s?[s]:[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success",o={kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""};return n?bd([o],n):[o]}return[]}function bd(e,t){for(let n of e)n.parent_tool_use_id=t;return e}function bh(e){let t=typeof e.command=="string"?e.command:"",n=vd(e.aggregated_output===void 0?e.output:e.aggregated_output),o=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",n].filter(i=>i.length>0).join(" \xB7 "),s={kind:"tool",tool:"shell",icon:yd.Bash,command:t,input:{command:t},expandable:!0};return o.length>0&&(s.result=o),typeof e.aggregated_output=="string"&&(s.output=e.aggregated_output),s}function yh(e){if(e.type==="item.completed"&&Tn(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[Za(t.text)];if(t.type==="user_message"){let n=kd(t.text);return n?[n]:[]}if(t.type==="reasoning"){let n=Xa(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[bh(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function vh(e){if(e.schema!=="codex-delegation-monitor-v1"||!Tn(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&Tn(t.item)){let n=t.item;if(typeof n.id!="string"||n.id.length===0)return[];if(t.type==="item.completed"&&n.kind==="agent_message"&&typeof n.text=="string"&&n.text.trim().length>0)return[Za(n.text)];if(t.type==="item.completed"&&n.kind==="reasoning"){let l=Xa(n.text);return l?[l]:[]}if(n.kind!=="activity"||typeof n.activity!="string")return[];let r=dh[n.activity];if(!r)return[];let o="\uC2DC\uC791",s="\u2026",i={kind:"tool",tool:"",icon:s,expandable:!1};if(t.type==="item.completed"){if(n.status==="completed")o="\uC644\uB8CC",s="\u2713";else if(n.status==="failed")o="\uC2E4\uD328",s="\u2717";else return[];i.result=""}return i.tool=`${r} \xB7 ${o}`,i.icon=s,[i]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function kh(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function wh(e){let t=e;if(typeof e=="string"){let n=e.trim();if(n.length===0)return null;try{t=JSON.parse(n)}catch{return null}}return Tn(t)?t:null}function wd(e={}){let t=e.skip_delegated===!0,n=new Map,r={progress:null};return{push(o){let s=wh(o);if(!s)return[];if(t&&typeof s.parent_tool_use_id=="string"&&s.parent_tool_use_id.length>0)return[];if(s.type==="system"&&s.schema!=="codex-delegation-monitor-v1")return gh(s,r);let i=s.schema==="codex-delegation-monitor-v1"?vh(s):kh(s)?yh(s):hh(s,n);return i.length>0&&(r.progress=null),i}}}function Ja(e){let t=[],n=wd(),r=Array.isArray(e)?e:[];for(let o of r)for(let s of n.push(o))t.push(s);return t}var $h=5,xh=10,Ah=/Task\s+#(\d+)/,Sh=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Eh=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function Vo(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Th(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function Ch(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function Rh(e){let t=new Map,n=0;for(let o of e){if(o.kind!=="tool")continue;n+=1;let s=o.input||{};if(o.tool==="TaskCreate"){let a=Ah.exec(o.output||o.result||""),u=String(s.activeForm||s.subject||"").trim();if(!a||u.length===0)continue;t.set(a[1],{label:u,active:s.status==="in_progress"?n:0});continue}if(o.tool!=="TaskUpdate")continue;let i=t.get(String(s.taskId??""));if(!i)continue;let l=s.activeForm||s.subject;typeof l=="string"&&l.trim().length>0&&(i.label=l.trim()),typeof s.status=="string"&&(i.active=s.status==="in_progress"?n:0)}let r=null;for(let o of t.values())o.active>0&&(!r||o.active>r.active)&&(r=o);return r?r.label:null}function Oh(e){if(e.tool==="Bash"){let t=e.command||"";return Sh.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Eh.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function Lh(e){let t=e.filter(o=>o.kind==="tool").slice(-xh),n=new Map;t.forEach((o,s)=>{let i=Oh(o);if(!i)return;let l=n.get(i)||{count:0,last:-1};l.count+=1,l.last=s,n.set(i,l)});let r=null;for(let[o,s]of n)(!r||s.count>r.count||s.count===r.count&&s.last>r.last)&&(r={label:o,count:s.count,last:s.last});return r?r.label:null}function Ih(e){let t=Ch(e);if(t)return{text:t,guess:!1};let n=Rh(e);if(n)return{text:n,guess:!1};let r=Lh(e);return r?{text:r,guess:!0}:null}function Mh(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:on(e,t)}function no(e,t={}){let{transport:n,sessionLogStore:r,onClose:o}=t,s=null,i=null,l=null,a=null,u=null,d=!1,p={},b=!0,m=new Set,$=new Set,C=null,j=null,K=!1,ie=!1,ee=!1,F=null,P=null;function L(){K=!1,ie=!1,ee=!1,F=null,P=null}async function z(te){if(n){ie=!0,ee=!1,je();try{let H=await Promise.resolve(n("get-attempt-prompt",{attempt_id:te,...u?{root_dir:u}:{}}));if(s!==te)return;!H||typeof H!="object"||Array.isArray(H)?ee=!0:(F=H,P=te)}catch{s===te&&(ee=!0)}finally{s===te&&(ie=!1,je())}}}function V(){if(K=!K,K&&s&&P!==s){z(s);return}je()}function ne(){if(!K)return"";let te=to({loading:ie,error:ee});if(te)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${te}
      </div>`;if(!F)return"";if(F.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let H=gi(F.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${H?c`<div class="prompt-block__meta">${H} 발송</div>`:""}
      ${typeof F.task_prompt=="string"?Xn("\uACFC\uC5C5 (user)",F.task_prompt):""}
      ${typeof F.system_prompt=="string"?Xn("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",F.system_prompt):""}
    </div>`}function N(){if(!a||!r)return[];let te=r.get(a);return Ja(te?te.lines:[])}function Q(){if(!a||!r)return null;let te=r.get(a),H=te?te.last_event_at:null;return typeof H=="number"?H:null}function G(){return p.status==="running"}function X(){if(G()&&s){j||(j=setInterval(()=>je(),1e3));return}Re()}function Re(){j&&(clearInterval(j),j=null)}function we(te){let H=[],Ae=0;for(;Ae<te.length;){let{idx:ut,line:x}=te[Ae];if(x.kind==="tool"){let W=Ae;for(;W<te.length&&te[W].line.kind==="tool"&&te[W].line.tool===x.tool;)W+=1;if(W-Ae>=$h&&!$.has(ut)){H.push({kind:"group",idx:ut,tool:x.tool||"",lines:te.slice(Ae,W)}),Ae=W;continue}}H.push({kind:"line",idx:ut,line:x}),Ae+=1}return H}function ce(te){let H=[],Ae=new Map;for(let W=0;W<te.length;W+=1){let be=te[W],Ie=be.parent_tool_use_id;if(typeof Ie=="string"&&Ie.length>0){let Ne=Ae.get(Ie);Ne||(Ne={kind:"subagent",idx:W,launch_id:Ie,agent_type:null,header:null,lines:[]},Ae.set(Ie,Ne),H.push(Ne)),Ne.lines.push({idx:W,line:be});continue}if(be.kind==="tool"&&be.tool==="Agent"&&typeof be.launch_id=="string"&&be.launch_id.length>0){let Ne=q(be),Fe=Ae.get(be.launch_id);if(Fe){Fe.header={idx:W,line:be},Fe.agent_type=Ne;continue}let dt={kind:"subagent",idx:W,launch_id:be.launch_id,agent_type:Ne,header:{idx:W,line:be},lines:[]};Ae.set(be.launch_id,dt),H.push(dt);continue}H.push({kind:"entry",idx:W,line:be})}let ut=[],x=0;for(;x<H.length;){if(H[x].kind!=="entry"){ut.push(H[x]),x+=1;continue}let W=x;for(;W<H.length&&H[W].kind==="entry";)W+=1;ut.push(...we(H.slice(x,W))),x=W}return ut}function q(te){let H=te.input;return H&&typeof H.subagent_type=="string"?H.subagent_type:null}function $e(te){for(let H=te.length-1;H>=0;H-=1){let Ae=te[H];if(Ae.kind==="result"||Ae.kind==="error")return null;if(Ae.kind==="tool"&&!Object.hasOwn(Ae,"result"))return Ae}return null}function Se(te){for(let H=te.length-1;H>=0;H-=1)if(te[H].kind==="thinking")return te[H];return null}function S(te,H){if(H.kind==="gate")return c`<div class="sv__gate">${H.text}</div>`;if(H.kind==="phase")return c`<div class="sv__phase">${H.text}</div>`;if(H.kind==="result")return c`<div
        class="sv__result${H.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${H.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${lr(H.text||(H.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(H.kind==="thinking"){let Ae=m.has(te);return c`<div
        class="sv__think${Ae?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Le(te)}
      >
        <span class="sv__think-line">💭 ${Vo(H.text)}</span>
        ${Ae?c`<pre class="sv__think-expand">${H.text}</pre>`:""}
      </div>`}if(H.kind==="user"){let Ae=m.has(te);return c`<div
        class="sv__line sv__line--user${Ae?" sv__line--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Le(te)}
      >
        <span class="sv__user-line">▷ ${Vo(H.text)}</span>
        ${Ae?c`<pre class="sv__user-expand">${H.text}</pre>`:""}
      </div>`}if(H.kind==="error")return c`<div class="sv__error">⛔ ${H.text}</div>`;if(H.kind==="blocker")return c`<div class="sv__error">⛔ ${H.text}</div>`;if(H.kind==="tool"){let Ae=m.has(te),ut=H.tool==="Bash"?Th(H.command):0,x=H.tool==="Bash"?ut>1?Vo(H.command):H.command:H.path||H.command||"";return c`<div
        class="sv__tool${Ae?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>Le(te)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${H.icon}</span>
          <span class="sv__tool-name">${H.tool}</span>
          ${x?c`<span class="sv__tool-detail">${x}</span>`:""}
          ${ut>1?c`<span class="sv__tool-more">⋯ ${ut}줄</span>`:""}
          ${typeof H.added=="number"?c`<span class="sv__diff-add">+${H.added}</span>`:""}
          ${typeof H.removed=="number"?c`<span class="sv__diff-del">−${H.removed}</span>`:""}
          ${H.result?c`<span class="sv__tool-ok">→ ${H.result}</span>`:""}
        </span>
        ${Ae?c`<pre class="sv__tool-expand">${Z(H)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${lr(H.text||"")}</div>`}function Z(te){let H=[];if(te.tool==="Bash"&&typeof te.command=="string"&&te.command.length>0)H.push(te.command);else if(te.input!==void 0)try{H.push(`input: ${JSON.stringify(te.input,null,2)}`)}catch{}return typeof te.output=="string"&&te.output.length>0&&H.push(`output:
${te.output}`),H.join(`

`)}function Te(){if(!s)return c``;let te=N(),H=(i?[p.agent_type,p.model,p.effort]:[p.runner,p.model,p.effort]).filter(Boolean).join(" \xB7 "),Ae=p.session_id||"",ut=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${b?"ON":"OFF"}`,x=G(),W=x?Mh(Q(),Date.now()):"",be=x?$e(te):null,Ie=x?Se(te):null,Ne=Ih(te);return c`<div class="sv" data-attempt-id=${s}>
      <div class="sv__bar">
        <span class="sv__id"
          >${p.label||(i?p.role||"":s)}</span
        >
        ${Ne?c`<span
              class="sv__stage${Ne.guess?" sv__stage--guess":""}"
              title=${Ne.text}
              >${Ne.text}</span
            >`:""}
        ${x?c`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${W?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${W}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${W?c`<span class="sv__live-ago">${W}</span>`:""}</span
            >`:""}
        ${Ae?c`<button
              type="button"
              class="sv__session"
              title=${Ae}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${Ae}`}
              @click=${()=>de(Ae)}
            >
              ⧉ ${Ae.slice(0,8)}
            </button>`:""}
        ${p.resume_command?c`<button
              type="button"
              class="sv__resume-cmd"
              title=${p.resume_command}
              aria-label=${`\uC7AC\uAC1C \uBA85\uB839 \uBCF5\uC0AC: ${p.resume_command}`}
              @click=${()=>de(p.resume_command||"")}
            >
              ⧉ 재개 명령
            </button>`:""}
        ${H?c`<span class="sv__meta">${H}</span>`:""}
        ${p.worktree?c`<span class="sv__wt" title=${p.worktree}
              >${p.worktree}</span
            >`:""}
        ${i||d?"":c`<button
              type="button"
              class="sv__prompt-toggle${K?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${K?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${V}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${b?" sv__follow--on":""}"
          aria-pressed=${b?"true":"false"}
          aria-label=${ut}
          @click=${U}
        >
          <span class="sv__follow-full">⇣ ${ut}</span>
          <span class="sv__follow-short">⇣ ${b?"ON":"OFF"}</span>
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
      ${i||d?"":ne()}
      <div class="sv__body">
        ${te.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:ce(te).map(Fe=>Fe.kind==="subagent"?xe(Fe):Fe.kind==="group"?_e(Fe):S(Fe.idx,Fe.line))}
      </div>
      ${be||Ie?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${be?c`<span class="sv__now-icon">${be.icon}</span>
                  <span class="sv__now-name">${be.tool}</span>
                  <span class="sv__now-detail"
                    >${be.tool==="Bash"?Vo(be.command):be.path||be.command||""}</span
                  >`:""}
            ${Ie?c`<span class="sv__now-think"
                  >💭 ${Vo(Ie.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function _e(te){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>ge(te.idx)}
    >
      <span class="sv__group-icon">${te.lines[0].line.icon}</span>
      <span class="sv__group-name">${te.tool}</span>
      <span class="sv__group-count">${te.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function xe(te){let H=$.has(te.idx),Ae=te.header?te.header.line:null,ut=Ae?Ae.is_error===!0?"\u2717":typeof Ae.result=="string"?"\u2713":"\u27F3":"",x=Ae&&Ae.command?Ae.command:"";return c`<div class="sv__sub${H?" sv__sub--open":""}">
      <div
        class="sv__sub-head"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>ge(te.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${te.agent_type||"subagent"}</span>
        ${x?c`<span class="sv__sub-detail">${x}</span>`:""}
        <span class="sv__sub-count">${te.lines.length}줄</span>
        ${ut?c`<span class="sv__sub-state">${ut}</span>`:""}
        ${H?"":c`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${H?c`<div class="sv__sub-body">
            ${we(te.lines).map(W=>W.kind==="group"?_e(W):S(W.idx,W.line))}
          </div>`:""}
    </div>`}function ge(te){$.add(te),je()}function je(){lt(Te(),e),X(),b&&ft()}function ft(){let te=e.querySelector(".sv__body");te&&(te.scrollTop=te.scrollHeight)}function Le(te){m.has(te)?m.delete(te):m.add(te),je()}function U(){b=!b,je()}function de(te){sn(te).then(H=>{H?pe("\uBCF5\uC0AC\uB428","success",1200):pe("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function se(te){!s||!te||(p={...p,...te},je())}function ae(te){let H=te.target;if(!H||!H.classList||!H.classList.contains("sv__body"))return;!(H.scrollHeight-H.scrollTop-H.clientHeight<=4)&&b&&(b=!1,je())}e.addEventListener("scroll",ae,!0);function Ee(te){let H=te.target;!H||typeof H.closest!="function"||e.contains(H)||H.closest("dialog")||H.closest(".md-viewer-root")||Be()}let me=!1;function Oe(){me||(document.addEventListener("mousedown",Ee),me=!0)}function Qe(){me&&(document.removeEventListener("mousedown",Ee),me=!1)}function He(te){let H=te&&te.attempt_id;if(!H)return;let Ae=typeof te.launch_id=="string"&&te.launch_id.length>0?te.launch_id:null,ut=te.session_ref&&typeof te.session_ref=="object"?te.session_ref:null;if(Ae&&ut)return;let x=a;s=H,i=Ae,l=ut,a=i?`session-log:${s}:${i}`:`session-log:${s}`,n&&x&&x!==a&&Promise.resolve(n("unsubscribe-session-log",{id:x})).catch(()=>{}),u=typeof te.root_dir=="string"&&te.root_dir.length>0?te.root_dir:null,p=te.meta||{},d=te.hide_prompt===!0,b=!0,m.clear(),$.clear(),L(),!C&&r&&(C=r.subscribe(je)),n&&Promise.resolve(n("subscribe-session-log",{id:a,attempt_id:s,...i?{launch_id:i}:{},...l?{session_ref:l}:{},...u?{root_dir:u}:{}})).catch(()=>{}),Oe(),je()}function Be(){let te=a;Qe(),s=null,i=null,l=null,a=null,u=null,d=!1,m.clear(),$.clear(),L(),Re(),n&&te&&Promise.resolve(n("unsubscribe-session-log",{id:te})).catch(()=>{}),lt(c``,e),o&&o()}return{open:He,updateMeta:se,close:Be,isOpen(){return s!==null},destroy(){Re(),Qe(),C&&(C(),C=null),e.removeEventListener("scroll",ae,!0),s=null,i=null,l=null,a=null,u=null,d=!1,lt(c``,e)}}}function Ph(e){return["plan_review","plan_approval","plan_check"].some(t=>{let n=e[t];return typeof n=="string"&&n.trim().length>0})}function Dh(e){let t=e&&e.metadata||{},n=Dr(e),r=[];return n.path&&r.push({kind:"spec",path:n.path,missing_state:n.evidence==="draft"?"spec_draft":null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&r.push({kind:"plan",path:t.plan_path.trim(),missing_state:Ph(t)?null:"plan_pending"}),r}function $d(e,t){let n=Dh(e);return c`
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
  `}var Nh="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",qh=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,Fh=/^\*\*결론\*\* — (.+)$/;function hi(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==Nh)return null;let n=qh.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],o=n[2],s=n[3],i=2;for(;i<t.length&&t[i].trim().length===0;)i+=1;let l=i<t.length?Fh.exec(t[i]):null,a=l?l[1].replace(/\s+/g," ").trim():"",u=l?i+1:i;return{lane:r,identifier:o,timestamp:s,conclusion:a,body:t.slice(u).join(`
`).trim()}}var xd=20;function Ad(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),o=String(t.getHours()).padStart(2,"0"),s=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${o}:${s}`}function jh(e){return e.length>xd?`${e.slice(0,xd)}\u2026`:e}function Bh(e,t,n,r){let o=`${t.lane} ${jh(t.identifier)}`;return c`<div class="detail-report">
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
        <span class="detail-report__time">${Ad(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${r&&t.body.length>0?c`<div class="detail-report__body">
          ${lr(t.body)}
        </div>`:""}
  </div>`}function Uh(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${Ad(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${lr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function Sd(e,t={},n={}){let r=Array.isArray(e)?e.filter(Boolean):[],o=n.expanded||new Set,s=typeof n.draft=="string"?n.draft:"",i=n.sending===!0,l=r.slice().sort((a,u)=>String(u.created_at||"").localeCompare(String(a.created_at||"")));return c`
    <div class="detail-section-label">댓글 (${r.length})</div>
    ${n.error?c`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:l.length===0?c`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:c`<div class="detail-comments" data-seam="comments">
            ${l.map(a=>{let u=hi(typeof a.text=="string"?a.text:"");return u?Bh(a,u,t,o.has(a.id)):Uh(a)})}
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
  `}var{I:J$}=El;var Ed=e=>e.strings===void 0;var Wh={},Td=(e,t=Wh)=>e._$AH=t;var Ar=li(class extends eo{constructor(e){if(super(e),e.type!==Vn.PROPERTY&&e.type!==Vn.ATTRIBUTE&&e.type!==Vn.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Ed(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===yn||t===Dt)return t;let n=e.element,r=e.name;if(e.type===Vn.PROPERTY){if(t===n[r])return yn}else if(e.type===Vn.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return yn}else if(e.type===Vn.ATTRIBUTE&&n.getAttribute(r)===t+"")return yn;return Td(e),t}});var zh=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review",receipt_stage:null,fill_stage:"spec",stale_stage:"spec",hue:"spec"},{id:"plan",label:"\uACC4\uD68D \uB9AC\uBDF0",receipt:null,receipt_stage:"plan",fill_stage:"plan",stale_stage:"plan",hue:"plan"},{id:"impl",label:"\uAD6C\uD604",receipt:null,receipt_stage:null,fill_stage:"impl",stale_stage:null,hue:"impl"},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review",receipt_stage:null,fill_stage:null,stale_stage:"impl",hue:"impl"},{id:"pr",label:"PR",receipt:null,receipt_stage:null,fill_stage:"pr",stale_stage:null,hue:"pr"}],el={quick_fix:["impl","impl_review"],spec_backed:["spec","impl","impl_review","pr"],full_plan:["spec","plan","impl","impl_review","pr"]},Cd={missing:"\uC2B9\uC778 \uD544\uC694",stale:"\uC7AC\uC2B9\uC778 \uD544\uC694",unknown:"\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"},Hh={pin:"pin",global:"global",base:"base"};function Gh(e){return c`<span
    class=${`detail-layer-rail detail-layer-rail--${Hh[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function Kh(e,t,n){switch(e){case"workflow_mode":return ko;case"spec_review_model":case"impl_review_model":return wo;case"plan_review_model":return Os;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return Ls;case"impl_dispatch":return Pc;case"impl_runtime":return Rs;case"impl_model":return Kr(n,t.impl_runtime);case"impl_effort":return Yr(n,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return vo;case"orchestration_model":return $o(n,null);case"orchestration_effort":return Yr(n,void 0,t.orchestration_model||hn).filter(r=>r!==hn);default:return[]}}function Yh(e,t){return c`<div class="detail-effective__row" data-key=${e.key}>
    ${Gh(e.source)}
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
      >${Is[e.source]}</span
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
  </div>`}function Rd(e,t){let n=aa.flatMap(a=>a.keys),r=la(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Uc(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=Object.fromEntries(r.map(a=>[a.key,a])),i=Object.fromEntries(r.filter(a=>a.value!==null).map(a=>[a.key,a.value])),l=r.filter(a=>a.full_value&&a.display!==a.full_value).map(a=>a.full_value).join(" \xB7 ");return c`<details
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
        >${Vh(s)}</span
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
          ${aa.map(a=>c`
              <div class="detail-effective__subhead">${a.label}</div>
              ${r.filter(u=>a.keys.includes(u.key)).map(u=>{let d=Ss({key:u.key,choices:Kh(u.key,i,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return Yh(u,{expanded:e.expanded,options:d.options,default_label:d.unset_label,default_full_value:d.full_value,onEdit:t.onEdit})})}
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
              >세션 키 12개를 핀으로 기록</span
            >
            ${(e.skipped_orchestration_keys||[]).length>0?c`<span
                  class="detail-effective__hint"
                  data-preset-skip-notice
                  >오케스트레이션 3키는 Bead에 핀할 수 없어 건너뜀</span
                >`:""}
          </div>
        </div>`:""}
  </details>`}function Vh(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let n=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${n}`)}for(let n of["impl_model","impl_effort","impl_speed"])e[n]?.resolution!=="not_applicable"&&t.push(e[n]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function Qh(e){if(!e||typeof e!="object")return null;let{kind:t,actor:n,effort:r,sha:o}=e;return typeof t!="string"||typeof n!="string"||typeof o!="string"?null:{kind:t,actor:n,effort:typeof r=="string"?r:null,sha:o}}function Od(e,t={}){let n=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},o=r.stages||{},s=r.route||n.route||null,i=typeof n.pr_url=="string"?n.pr_url:"",l=typeof n.exec_receipt=="string"?n.exec_receipt:"",a=Qh(r.exec_receipt),u=a?Bn(a):l,d=a?`${a.kind}:${a.actor}`:l.split("@")[0],p=xs(r.planned_execution,r.exec_receipt),b=r.chips?.pr?.number,m=typeof b=="number"?`PR #${b}`:"PR",$=Ao(n),C=t.onApplyRec;return c`<section class="detail-summary" data-seam="detail-summary">
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
      ${p?c`<span
            class="detail-summary__chip detail-summary__chip--planned ctl-chip--planned"
            data-kind=${p.kind}
            title=${p.title}
            >${p.label}</span
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
            class="detail-summary__chip detail-summary__chip--rec"
            data-state=${$.state}
            title=${Ps($)}
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
      ${Xh(s).map(j=>Zh(j,n,o,{label:j.id==="pr"?m:j.label,href:j.id==="pr"?i:""}))}
    </div>
  </section>`}function Xh(e){let n=typeof e=="string"&&Object.hasOwn(el,e)&&el[e]||el.spec_backed;return zh.filter(r=>n.includes(r.id))}var bi={on:"\uD1B5\uACFC",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",current:"\uC9C4\uD589 \uC911",none:"\uBBF8\uB3C4\uB2EC"};function Zh(e,t,n,r){let o=Jh(e,t,n),s=e.fill_stage?n[e.fill_stage]:null,i=typeof s?.fill=="string"?s.fill:null,l=i?i==="full":o.length>0,a=!l&&i==="dim",u=e.stale_stage?n[e.stale_stage]?.stale===!0:!1,d=o&&o.split("@")[1]?.slice(0,7)||"",p=u?bi.stale:l?bi.on:a?bi.current:bi.none,b=eb(e,n),m=`${r.label} \xB7 ${p}${b?` \xB7 ${b}`:""}${o?` \xB7 ${o}`:""}`,$=`detail-summary__gate${l?" detail-summary__gate--on":""}${a?" detail-summary__gate--current":""}${u?" detail-summary__gate--stale":""}${d?" detail-summary__gate--receipt":""}`,C=c`<span class="detail-summary__gate-label"
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
      >${C}</a
    >`:c`<span
    class=${$}
    data-gate=${e.id}
    data-hue=${e.hue}
    title=${m}
    >${C}</span
  >`}function Jh(e,t,n){if(e.receipt&&typeof t[e.receipt]=="string")return String(t[e.receipt]);if(e.receipt_stage){let r=n[e.receipt_stage]?.receipt;return typeof r=="string"?r:""}return""}function eb(e,t){if(e.id!=="plan")return"";let n=t.plan?.approval_state;return typeof n=="string"&&Object.hasOwn(Cd,n)?Cd[n]:""}function yi(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Ld(e){return yi(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function Id(e,t){let n=e&&e[t];if(!yi(n)||!Array.isArray(n.accounts))return null;let r=n.accounts.filter(Ld),o=Ld(n.active)?n.active:null;return{accounts:r,active:o||r.find(s=>s.active===!0)||null}}function Dd(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function vi(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${Dd(e)}${t}`}function ro(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${Dd(e)}`}function tb(e,t,n){if(n!==null){let o=e==="claude"?vi:ro,s=t?t.accounts.find(i=>i.key===n):void 0;return`\uB808\uD3EC \uAE30\uBCF8\uAC12 \uC0AC\uC6A9(${s?o(s):n})`}return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:ro({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function Md(e,t){if(!yi(e)||e.state!=="usable"||!yi(e.values))return null;let n=e.values[t];return typeof n=="string"&&n.length>0?n:null}function Pd(e){let t=e.provider_key==="claude"?vi:ro,n=!!e.provider?.accounts.some(r=>r.key===e.selected);return c`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${r=>e.handlers.onExecChange(e.key,r.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${tb(e.provider_key,e.provider,e.workspace_default)}
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
  </div>`}function Nd({md:e,catalog:t,workspace_defaults:n=null,handlers:r}){let o=typeof e.claude_account=="string"?e.claude_account:"",s=typeof e.codex_account=="string"?e.codex_account:"";return c`<section class="exec-accounts" data-exec-accounts>
    <div class="detail-section-label">실행 계정</div>
    <div class="exec-settings-core">
      ${Pd({key:"claude_account",title:"Claude \uACC4\uC815",provider_key:"claude",provider:Id(t,"claude"),selected:o,workspace_default:Md(n,"claude_account"),handlers:r,hint:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uB7F0\uD0C0\uC784\uC774 claude\uC77C \uB54C \uC801\uC6A9\uB429\uB2C8\uB2E4"})}
      ${Pd({key:"codex_account",title:"Codex \uACC4\uC815",provider_key:"codex",provider:Id(t,"codex"),selected:s,workspace_default:Md(n,"codex_account"),handlers:r})}
    </div>
  </section>`}function nb(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function rb(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let n=t[1].trim();return{front:n.length>0?n:null,body:e.slice(t[0].length)}}function ki(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),o=null,s="loading",i="",l=null,a="";function u(C){C.key==="Escape"&&o&&(C.preventDefault(),m())}document.addEventListener("keydown",u);function d(){return o?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>m()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${o}
              >${nb(o)}</span
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
    `:c``}function p(){lt(d(),e)}async function b(C,j={}){o=C,s="loading",i="",l=null,a="",p();let K=j.workspace||(n?n():"");if(!K){s="error",a="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",p();return}if(!r){s="error",a="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",p();return}let ie="/api/doc?workspace="+encodeURIComponent(K)+"&path="+encodeURIComponent(C);try{let ee=await r(ie),F=await ee.json().catch(()=>({}));if(!ee.ok||!F||F.ok!==!0){if(F?.error==="not_found"&&j.missing_state==="plan_pending"){s="pending",a="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",p();return}s="error",a="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(F&&F.error||ee.status)+")",p();return}let P=rb(String(F.content||""));l=P.front,i=P.body,s="ready",p()}catch{s="error",a="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",p()}}function m(){o=null,lt(c``,e)}function $(){document.removeEventListener("keydown",u),m()}return{open:b,close:m,destroy:$}}var ob=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],jd="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",wi=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],sb=new Set(["codex-runner","Explore","Plan","advisor","advisor-xhigh","claude-code-guide","statusline-setup"]);function qd(e){return typeof e=="string"&&sb.has(e)}var ib=["running","done","failed","interrupted"],ab={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function lb(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function cb(e){let t=en(e);if(t.length>0)return t.map(o=>c`<span class="detail-usage-total" title=${o.tooltip}
          >${o.label}</span
        >`);let n=Hr(e);if(!n||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${n.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${jd}
          >부분 집계</span
        >`:""}`}function Fd(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function rl(e){if(typeof e=="number")return Qo(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?Qo(t):""}function ub(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function db(e,t){if(e.provider!=="claude")return{text:e.session_id.slice(0,8),title:e.session_id};let n=t&&typeof t.agent_id=="string"?t.agent_id:"";return n.length>0?{text:n.slice(0,8),title:n}:{text:e.launch_id.slice(-8),title:e.launch_id}}function tl(e){return e===null||typeof e=="string"&&e.trim().length>0}function nl(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function pb(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,n=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!wi.some(r=>r.role===t.role&&r.provider===t.provider)||!(n?tl(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||tl(t.effort))||!(!("agent_type"in t)||tl(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!ib.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:n?!nl(t.started_at)||!nl(t.last_event_at)||!nl(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function fb(e,t,n){let o=en({providers:{[t]:{subtotal:n.subtotal,breakdown:n.usage,...n.replayed?{replayed:!0}:{}}},roles:{}})[0];return c`<div class="detail-session__leg detail-session__usage-detail">
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
    ${rl(n.completed_at)?c`<span class="detail-session__leg-time detail-session__time"
          >${rl(n.completed_at)}</span
        >`:""}
    ${o?c`<span class="detail-session__usage" title=${o.tooltip}
          >${o.label}</span
        >`:""}
  </div>`}function _b(e,t,n,r){let o=e.status==="running"?null:t,i=(o?en({providers:{[e.provider]:{subtotal:o.subtotal,breakdown:o.usage,...o.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],l=e.status==="running"?Qo(e.last_event_at):o?rl(o.completed_at):"",a=(e.provider==="claude"?["Claude",e.agent_type,ub(e.model),e.effort]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),u=db(e,o);return c`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>r.onOpenDelegation&&r.onOpenDelegation(n,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${ab[e.status]}</span
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
  </button>`}function mb(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}function gb(e,t,n){let r=[],o=new Set,s=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let d of s){let p=pb(d);!p||o.has(p.launch_id)||qd(p.agent_type)||(o.add(p.launch_id),r.push(p))}r.sort((d,p)=>(d.started_at||0)-(p.started_at||0));let i={};for(let{role:d,provider:p}of wi){let b=t?t.roles[d]?.[p]:null;i[d]=b?[...b.legs]:[]}let l=wi.flatMap(({role:d})=>i[d]),a=new Set,u=[];for(let{role:d,provider:p}of wi){for(let b of r.filter(m=>m.role===d&&m.provider===p)){let m=l.find($=>$.receipt_id===b.launch_id)||null;m&&!mb(b,m)||(m&&a.add(m.receipt_id),u.push(_b(b,m,e.attempt_id,n)))}for(let b of i[d])!a.has(b.receipt_id)&&!qd(b.agent_type)&&u.push(fb(d,p,b))}return u}function hb(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[...ob,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return c`<div class="detail-session__usage-detail">
    ${r.map(o=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${o.label}</span
          ><span class="detail-session__usage-value"
            >${lb(e[o.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${n===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${n.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${jd}</span>`:""}
  </div>`}var bb={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Qo(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function yb(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,r])=>typeof r=="string"&&r.length>0).map(([r,o])=>`${r}=${o}`).join(" \xB7 "):"",n=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${n}</span>
    ${t?c`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}var vb={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function kb(e,t){let n=vb[e.locality]||"",r=e.locality==="remote"?`${e.host} \xB7 \uB2E4\uB978 \uBA38\uC2E0`:e.locality==="missing"?`${e.host} \xB7 \uD30C\uC77C \uC5C6\uC74C`:e.host;return c`<div class="detail-session-row">
    <button
      type="button"
      class="detail-session detail-session--session"
      data-session-key=${Zi(e)}
      ?disabled=${n.length>0}
      title=${n}
      @click=${()=>{n.length===0&&t.onOpenSessionRef&&t.onOpenSessionRef(e)}}
    >
      <span class="detail-session__glyph">${e.current?"\u25D0":"\xB7"}</span>
      <span class="detail-session__id">${bo(e)}</span>
      <span class="detail-session__meta">${r}</span>
      <span class="detail-session__sid" title=${e.session_id}
        >${e.session_id.slice(0,8)}</span
      >
      <span class="detail-session__time">${Qo(e.last_event_at)}</span>
    </button>
    ${e.resume_command?c`<button
          type="button"
          class="detail-session__resume-cmd"
          title=${e.resume_command}
          @click=${o=>{o.stopPropagation(),t.onCopyResumeCommand&&e.resume_command&&t.onCopyResumeCommand(e.resume_command)}}
        >
          ⧉ 재개
        </button>`:""}
  </div>`}function Bd(e,t={},n={},r=[]){let o=Array.isArray(e)?e:[],s=Array.isArray(r)?r:[],i=[...s.filter(m=>m&&m.current===!0),...s.filter(m=>m&&m.current!==!0).sort((m,$)=>$.index-m.index)],l=i.map(m=>kb(m,t)),a=n.expanded||new Set;if(o.length===0&&i.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let u=new Set;for(let m of o)m&&typeof m.resumed_from=="string"&&m.resumed_from.length>0&&u.add(m.resumed_from);let d=m=>{if(!(m.status==="failed"||m.status==="orphaned"))return"";let C=typeof m.session_id=="string"&&m.session_id.length>0,j=u.has(m.attempt_id),K=C&&!j,ie=C?j?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${m.attempt_id}
      ?disabled=${!K}
      title=${ie}
      @click=${ee=>{ee.stopPropagation(),K&&t.onResume&&t.onResume(m.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},p=m=>{if(!(m.status==="failed"||m.status==="orphaned")||typeof m.cause!="string"||m.cause==="")return"";let C=m.cause_detail,j=C&&typeof C.reason=="string"&&C.reason.length>0?typeof C.command=="string"&&C.command.length>0?`${C.reason} \xB7 ${C.command}`:C.reason:m.cause;return c`<div class="detail-session__cause" title=${j}>
      ${m.cause}
    </div>`},b=m=>{let $=Fd(na(m));if(en($).length===0&&!Hr(m.usage))return"";let C=a.has(m.attempt_id);return c`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${m.attempt_id}
      aria-expanded=${C?"true":"false"}
      title=${C?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${j=>{j.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(m.attempt_id)}}
    >
      τ 자세히
    </button>`};return c`
    <div class="detail-section-label">
      세션 이력${cb(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${l}${o.map(m=>{let $=na(m),C=Fd($),j=en(C);return c`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${m.status||"unknown"}"
            data-attempt-id=${m.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(m.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${bb[m.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${m.attempt_id}</span>
            ${go(m)?c`<span
                  class="detail-session__resumed"
                  title=${go(m)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${yr(m)}</span>
            ${j.length>0?c`<span class="detail-session__role">orchestrator</span>`:""}
            ${m.session_id?c`<span class="detail-session__sid" title=${m.session_id}
                  >${String(m.session_id).slice(0,8)}</span
                >`:""}
            ${j.length>0?j.map(K=>c`<span
                      class="detail-session__usage"
                      title=${K.tooltip}
                      >${K.label}</span
                    >`):Hr(m.usage)?c`<span class="detail-session__usage"
                    >${Hr(m.usage)}</span
                  >`:""}
            <span class="detail-session__time">${Qo(m.started_at)}</span>
          </button>
          ${b(m)} ${d(m)} ${p(m)} ${yb(m)}
          ${a.has(m.attempt_id)&&m.usage?hb(m.usage,m.runner==="codex"?"codex":"claude"):""}
          ${gb(m,$,t)}
        </div>`})}
    </div>
  `}function Ud(e,t={}){return c`
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
          ${wb(e)}
        </div>`:""}
  `}function wb(e){let t=to(e);if(t)return t;let n=e.data;if(!n)return"";if(n.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof n.default_task_prompt=="string"?Xn("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=gi(n.recorded_at);return c`<div class="detail-prompt__meta">
      ${n.attempt_id}${r?` \xB7 ${r}`:""}
    </div>
    ${typeof n.task_prompt=="string"?Xn("\uACFC\uC5C5 (user)",n.task_prompt):""}
    ${typeof n.system_prompt=="string"?Xn("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",n.system_prompt):""}`}var Sr=10;function Wd(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}function zd(e,t={}){let r=(Array.isArray(e?.events)?e.events:[]).filter(l=>l&&typeof l.summary=="string"&&l.summary.trim().length>0);if(r.length===0)return"";let o=typeof e.shown=="number"&&e.shown>0?e.shown:Sr,s=r.slice(0,o),i=r.length-s.length;return c`
    <div class="detail-section-label">Worker 이력 (${r.length})</div>
    <ol class="detail-timeline" data-seam="worker-timeline">
      ${s.map(l=>c`<li class="detail-timeline__row">
            ${Wd(l.at)?c`<span class="detail-timeline__at"
                  >${Wd(l.at)}</span
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
  `}var $b=["open","in_progress","deferred","resolved","closed"],xb=[0,1,2,3,4];function Hd(e,t){let n=t.issueStores,r=t.onClose,o=t.transport,s=t.onNavigate,i=t.queueStore,l=t.execPresetStore,a=t.sessionLogStore,u=null,d=null,p={},b="",m=!1,$=[],C=!1,j={},K={claude:null,codex:null},ie=null,ee=null,F=0,P=!1,L=!1,z="",V="",ne="",N="",Q=!1;function G(){P=!1,L=!1,z="",V="",ne="",N="",Q=!1}function X(){K={claude:null,codex:null},ie=null,ee=null,F+=1}async function Re(){if(!o)return null;try{let f=await Promise.resolve(o("get-workspace-accounts",{}));return f&&typeof f.state=="string"?f:null}catch{return null}}async function we(f){try{let B=await fetch(f);if(!B.ok)return null;let M=await B.json();if(!M||typeof M!="object"||!Array.isArray(M.accounts))return null;let Ce=M.accounts.filter(ot=>ot!==null&&typeof ot=="object"&&!Array.isArray(ot));return{accounts:Ce,active:Ce.find(ot=>ot.active===!0)||null}}catch{return null}}async function ce(f){ee=f;let B=++F,[M,Ce,ot]=await Promise.all([we("/api/claude-usage"),we("/api/codex-usage"),Re()]);B!==F||f!==u||(K={claude:M,codex:Ce},ie=ot,rt())}let q=[],$e=null,Se=null,S=!1,Z="",Te=!1,_e=0,xe=new Set;function ge(){q=[],$e=null,Se=null,S=!1,Z="",Te=!1,_e+=1,xe.clear()}async function je(f){if(!o)return;let B=++_e;try{let M=await Promise.resolve(o("get-comments",{id:f}));if(B!==_e||f!==u)return;q=Array.isArray(M)?M:[],S=!1}catch{if(B!==_e||f!==u)return;S=!0}rt()}function ft(){if(!o||!u)return;let f=d&&typeof d.comment_count=="number"?d.comment_count:null;if($e!==u){$e=u,Se=f,je(u);return}f!==null&&f!==Se&&(Se=f,je(u))}function Le(f){xe.has(f)?xe.delete(f):xe.add(f),rt()}function U(f){let B=Z.trim().length===0;Z=f,B!==(f.trim().length===0)&&rt()}async function de(){let f=Z.trim();if(!o||!u||f.length===0||Te)return;let B=u;Te=!0,rt();let M=!1;try{let Ce=await Promise.resolve(o("add-comment",{id:B,text:f}));Array.isArray(Ce)&&Ce.length>0&&(M=!0,B===u&&(q=Ce,S=!1,Z="",Se=Ce.length))}catch{M=!1}M||pe("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),B===u&&(Te=!1),rt()}let se={onToggle:Le,onDraftInput:U,onSubmit:de},ae=t.mdViewer||null,Ee=null;ae||(Ee=document.createElement("div"),Ee.className="md-viewer-root",document.body.appendChild(Ee));let me=ae||ki(Ee,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),Oe=document.createElement("div");Oe.className="session-log-root",document.body.appendChild(Oe);let Qe=no(Oe,{transport:o?(f,B)=>Promise.resolve(o(f,B)):void 0,sessionLogStore:a}),He=!1,Be=!1,te=!1,H=null,Ae=null,ut=0;function x(f){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${f}`}function W(){He=!1,Be=!1,te=!1,H=null,Ae=null,ut+=1}async function be(f){if(!o)return;let B=++ut;Be=!0,te=!1,rt();try{let M=await Promise.resolve(o("get-bead-prompt",{bead_id:f}));if(B!==ut)return;!M||typeof M!="object"||Array.isArray(M)?te=!0:(H=M,Ae=x(f))}catch{B===ut&&(te=!0)}finally{B===ut&&(Be=!1,rt())}}let Ie=[],Ne=null,Fe=0;function dt(f,B){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${f}::${B}`}function At(){Ie=[],Ne=null,Fe+=1}async function Mt(f,B){if(!o)return;let M=++Fe,Ce;try{Ce=await Promise.resolve(o("get-session-refs",{bead_id:f}))}catch{Ce=null}M!==Fe||B!==Ne||(Ie=Ce&&Array.isArray(Ce.sessions)?Ce.sessions:[],rt())}function zt(){if(!o||!u)return;let f=d&&d.metadata,B=f&&typeof f=="object"&&typeof f.session_ref=="string"?f.session_ref:null;if(B===null){At();return}let M=dt(u,B);Ne!==M&&(Ie=[],Ne=M,Mt(u,M))}let Ot=[],_t=Sr,ze=null,O=0;function re(f){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${f}`}function he(){Ot=[],_t=Sr,ze=null,O+=1}async function T(f,B){if(!o)return;let M=++O,Ce;try{Ce=await Promise.resolve(o("get-bead-timeline",{bead_id:f}))}catch{Ce=null}M!==O||B!==ze||(Ot=Ce&&Array.isArray(Ce.events)?Ce.events:[],_t=Sr,rt())}function J(){if(!o||!u)return;let f=re(u);ze!==f&&(Ot=[],_t=Sr,ze=f,T(u,f))}function Pe(){_t+=Sr,rt()}function Ye(){if(He=!He,He&&u&&Ae!==x(u)){H=null,be(u);return}rt()}function qe(){if(!i||!u)return[];let f=i.get();return(f&&f.attempts?Object.values(f.attempts):[]).filter(M=>M&&M.bead_id===u).sort((M,Ce)=>(Ce.started_at||0)-(M.started_at||0)).map(M=>({attempt_id:M.attempt_id,bead_id:M.bead_id,status:M.status,started_at:typeof M.started_at=="number"?M.started_at:null,runner:M.runner||null,model:M.model||null,effort:M.effort||M.observed_effort||null,speed:M.speed||null,session_id:M.session_id||null,resumed_from:M.resumed_from||null,continuation_mode:M.continuation_mode||null,dismissed_at:typeof M.dismissed_at=="number"?M.dismissed_at:null,cause:typeof M.cause=="string"?M.cause:null,cause_detail:M.cause_detail||null,exec_default_preset_id:typeof M.exec_default_preset_id=="string"?M.exec_default_preset_id:null,exec_default_preset_revision:typeof M.exec_default_preset_revision=="number"?M.exec_default_preset_revision:null,exec_values:M.exec_values&&typeof M.exec_values=="object"?M.exec_values:null,usage:M.usage||null,usage_legs:Array.isArray(M.usage_legs)?M.usage_legs:[],delegation_sessions:Array.isArray(M.delegation_sessions)?M.delegation_sessions:[]}))}function it(){if(!i||!u)return null;let f=i.get();return zn(f&&f.attempts||{},u)}let at=new Set;function Ue(f){at.has(f)?at.delete(f):at.add(f),rt()}function tt(f){let B=i?i.get():null,M=B&&B.attempts?B.attempts[f]:null;Qe.open({attempt_id:f,meta:M?{runner:M.runner||void 0,model:M.model||void 0,effort:M.effort||void 0,status:M.status||void 0,session_id:M.session_id||void 0}:{}})}function kt(f,B){let M=i?i.get():null,Ce=M&&M.attempts?M.attempts[f]:null,st=(Ce&&Array.isArray(Ce.delegation_sessions)?Ce.delegation_sessions:[]).find($t=>$t&&typeof $t=="object"&&$t.launch_id===B);st&&Qe.open({attempt_id:f,launch_id:B,meta:{runner:st.provider==="claude"?"claude":"codex",role:st.role,...typeof st.agent_type=="string"?{agent_type:st.agent_type}:{},model:st.model,effort:st.effort,session_id:st.session_id,status:st.status}})}async function Ge(f){if(!o||!f)return;let B=await Ur();if(B===null)return;let M=()=>{let $t=i?i.get():null;return $t&&typeof $t.revision=="number"?$t.revision:0},Ce=async($t={},et=M())=>await o("worker-attempt-resume",{attempt_id:f,expected_revision:et,...B!==""?{instructions:B}:{},...$t}),ot=$t=>{$t?.queue&&i?.set&&i.set($t.queue)},st=await Ce();if(ot(st),st&&st.conflict){let $t=st.queue&&typeof st.queue.revision=="number"?st.queue.revision:M();st=await Ce({},$t),ot(st)}st=await Un(st,($t,et)=>Ce({continuation:$t,decision_token:et}),{onResult:ot,refresh:()=>Ce()}),st&&st.resumed===!1&&!st.conflict&&st.reason&&pe(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${st.reason}`,"error",2400)}function Tt(f){!f||!u||Qe.open(Wr(f,u,d&&d.status))}let Xe={onOpen:tt,onOpenDelegation:kt,onResume:Ge,onToggleUsage:Ue,onOpenSessionRef:Tt,onCopyResumeCommand:fe};function pt(){let f=i?i.get():null,B={...j};for(let M of["orchestration_model","orchestration_effort","orchestration_speed"]){let Ce=f&&f[M];typeof Ce=="string"&&(B[M]=Ce)}return B}async function jt(){if(o){try{let f=await Promise.resolve(o("get-session-defaults",{}));j=f&&f.values&&typeof f.values=="object"?f.values:{}}catch{j={}}rt()}}function Ct(){let f=i?i.get():null;return f&&f.runner_catalog||null}function qt(){let f=i?i.get():null;return f&&typeof f.execution_defaults=="object"?f.execution_defaults:null}function Bt(){let f=d?.metadata&&typeof d.metadata=="object"?d.metadata:{},M=mn({pin:{...f,...p},global:pt(),execution_defaults:qt(),runner_catalog:Ct(),route:typeof f.route=="string"?f.route:null}).orchestration_model.value||"";return $n(Ct(),M)}function pn(){let f=l?l.get():null;return!f||typeof f.revision!="number"?null:{revision:f.revision,presets:Array.isArray(f.presets)?f.presets:[]}}function Vt(f){return f?.compatible===!1}function Qt(f){l&&f&&typeof f.revision=="number"&&Array.isArray(f.presets)&&l.set({revision:f.revision,presets:f.presets})}async function Gt(){let f=pn(),B=f?.presets.find(M=>M.id===b);if(!(!o||!u||!f||!B||Vt(B)||m)){m=!0,$=[],rt();try{let M=await Promise.resolve(o("apply-impl-preset",zc(u,B.id,f.revision)));if(M&&M.conflict){Qt(M),pe("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let Ce=M&&Array.isArray(M.issue)?M.issue[0]:M?.issue;if(M&&M.applied&&Ce&&typeof Ce=="object"){d=Ce,$=Array.isArray(M.skipped_orchestration_keys)?M.skipped_orchestration_keys.filter(ot=>typeof ot=="string"):[];for(let ot of Hc)delete p[ot];pe($.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}M&&M.error==="bd_readback_failed"?pe("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):pe("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(M){M&&typeof M=="object"&&M.code==="bd_readback_failed"?pe("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):pe("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{m=!1,rt()}}}let Ft=null;n&&n.subscribe&&(Ft=n.subscribe(()=>E()));let Zt=null;i&&typeof i.subscribe=="function"&&(Zt=i.subscribe(()=>{u&&rt()}));let Ht=null,wt=null;function rn(){wt&&(wt(),wt=null)}l&&typeof l.subscribe=="function"&&(Ht=l.subscribe(()=>{u&&rt()}));function ve(f){f.key==="Escape"&&u&&(f.preventDefault(),r())}document.addEventListener("keydown",ve);function E(){if(u){if(n&&typeof n.snapshotFor=="function"){let f=n.snapshotFor("detail:"+u)||[];d=f.find(M=>M&&M.id===u)||f[0]||d}ft(),zt(),J(),rt()}}function fe(f){sn(f).then(B=>{B?pe("\uBCF5\uC0AC\uB428","success",1200):pe("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function k(f){f.preventDefault(),f.stopPropagation(),u&&fe(u)}function I(f,B){f.preventDefault(),f.stopPropagation(),fe(B)}function ke(f,B,M){f.preventDefault(),f.stopPropagation(),me.open(B,{missing_state:M})}async function De(f,B){let M=Object.hasOwn(p,f),Ce=p[f];if(p[f]=B,rt(),!(!o||!u))try{let ot=await Promise.resolve(o("update-exec-settings",Wc(u,f,B.length===0?null:B))),st=Array.isArray(ot)?ot[0]:ot;if(!st||typeof st!="object"||!st.id)throw new Error("exec settings readback failed");d=st,delete p[f],rt()}catch(ot){throw M?p[f]=Ce:delete p[f],rt(),pe("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error"),ot}}function ue(f){f.catch(()=>{})}async function Ze(f,B){let M=d||{},Ce=M.metadata&&typeof M.metadata=="object"?M.metadata:{},ot={};for(let et of["impl_runtime","impl_model","impl_effort"])ot[et]=Object.hasOwn(p,et)?p[et]:typeof Ce[et]=="string"?Ce[et]:"";ot[f]=B;let st=Yc(ot,Ct(),Bt()),$t={};for(let et of["impl_runtime","impl_model","impl_effort"])$t[et]=p[et],p[et]=st[et]||"";if(rt(),!(!o||!u))return Promise.resolve(o("update-impl-target",{id:u,...st,orchestration_runtime:Bt()})).then(et=>{let ht=Array.isArray(et)?et[0]:et;if(!ht||typeof ht!="object"||!ht.id)throw new Error("implementation target readback failed");d=ht;for(let kn of["impl_runtime","impl_model","impl_effort"])delete p[kn];rt()}).catch(et=>{for(let ht of["impl_runtime","impl_model","impl_effort"])$t[ht]===void 0?delete p[ht]:p[ht]=$t[ht];throw rt(),pe("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error"),et})}async function yt(f,B){if(!(!f||typeof f!="object")&&!(B==="diverged"&&!window.confirm("\uCD94\uCC9C \uC2E4\uD589 \uC124\uC815\uC744 \uC801\uC6A9\uD560\uAE4C\uC694? \uD604\uC7AC \uC218\uB3D9 \uC124\uC815\uC744 \uB36E\uC5B4\uC501\uB2C8\uB2E4."))){try{await De("orchestration_model",f.orchestration_model)}catch{return}if(typeof f.impl_runtime=="string"&&f.impl_runtime.length>0)try{await Ze("impl_runtime",f.impl_runtime)}catch{}}}async function gt(f,B,M){if(!o||!u)return!1;try{let Ce=await Promise.resolve(o(f,B)),ot=Array.isArray(Ce)?Ce[0]:Ce;return ot&&typeof ot=="object"&&ot.id?(d=ot,!0):(pe(M,"error"),!1)}catch(Ce){return Ce&&typeof Ce=="object"&&Ce.code==="bd_readback_failed"?(pe("\uC800\uC7A5\uB410\uC73C\uB098 \uD655\uC778 \uC2E4\uD328 \u2014 \uACE7 \uAC31\uC2E0\uB429\uB2C8\uB2E4","error"),{ok:!1,saved:!0}):(pe(M,"error"),!1)}}function Ke(f){setTimeout(()=>{try{let B=e.querySelector(f);B&&typeof B.focus=="function"&&B.focus()}catch{}},0)}function h(){P=!0,z=d&&d.title||"",rt(),Ke('.detail-edit__input[data-edit="title"]')}function g(f){z=f.target.value}function R(){P=!1,z="",rt()}function D(){gt("edit-text",{id:u,field:"title",value:z},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(B=>{B===!0&&(P=!1,z=""),rt()})}function _(){L=!0,V=d&&d.description||"",rt(),Ke('.detail-edit__textarea[data-edit="description"]')}function y(f){V=f.target.value}function Y(){L=!1,V="",rt()}function le(){gt("edit-text",{id:u,field:"description",value:V},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(B=>{B===!0&&(L=!1,V=""),rt()})}function Me(f,B,M,Ce){if(f.key==="Escape"){f.stopPropagation(),M();return}f.key==="Enter"&&(!Ce||f.ctrlKey||f.metaKey)&&(f.preventDefault(),B())}function ct(f){let B=f.target.value;gt("update-status",{id:u,status:B},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>rt())}function Et(f){let B=Number(f.target.value);gt("update-priority",{id:u,priority:B},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>rt())}function Nn(f){ne=f.target.value}function w(){let f=ne.trim();f.length!==0&&gt("label-add",{id:u,label:f},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(B=>{B===!0&&(ne=""),rt()})}function v(f){if(f.key==="Escape"){f.stopPropagation(),ne="",rt();return}f.key==="Enter"&&(f.preventDefault(),w())}function A(f){gt("label-remove",{id:u,label:f},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>rt())}let oe={onCopyPath:I,onOpenDoc:ke};function ye(f){return typeof f=="string"?f:f&&typeof f=="object"?String(f.id||f.to||f.issue_id||f.depends_on||""):""}function We(f){return f&&typeof f=="object"?String(f.dependency_type||f.type||""):""}function nt(f){switch(f){case"discovered-from":return"\u21A9 \uBC1C\uACAC ";case"parent-child":return"\u2338 \uC0C1\uC704 ";case"related":return"\uAD00\uB828 ";default:return f.length>0?`${f} `:""}}function vt(f){if(!f||typeof f!="object")return;let B=typeof f.status=="string"?f.status:"",M=typeof f.title=="string"?f.title:"";return B.length>0&&M.length>0?`${B} \xB7 ${M}`:void 0}function Ve(){return(t.getWorkspacePath&&t.getWorkspacePath()||"").trim()}function Pt(){return t.depCandidates?t.depCandidates():null}async function Jt(f,B,M){let Ce=Ve(),ot=u;if(!ot)return;if(Ce.length===0){pe("\uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}let st=await gt(f,{a:ot,b:B,view_id:ot,root_dir:Ce},M),$t=st===!0||st!==!1&&st.saved===!0;$t&&t.onDepChanged&&t.onDepChanged({type:f,a:ot,b:B}),f==="dep-add"&&$t&&(N="",Q=!1),rt()}function Rn(f){if(!u)return;let B=globalThis.confirm;typeof B=="function"&&!B(`${f}\uAC00 ${u}\uB97C \uB9C9\uB294 \uC5F0\uACB0\uC744 \uB04A\uC744\uAE4C\uC694?`)||Jt("dep-remove",f,"\uC758\uC874 \uD574\uC81C \uC2E4\uD328")}function Zn(f){f.disabled||Jt("dep-add",f.bead_id,"\uC758\uC874 \uCD94\uAC00 \uC2E4\uD328")}function On(f){N=f.target.value,Q=!0,rt()}function qn(){Q||(Q=!0,rt())}function Xt(f,B){if(f.key==="Escape"){f.stopPropagation(),N="",Q=!1,rt();return}f.key==="Enter"&&(f.preventDefault(),B.length===1&&!B[0].disabled&&Zn(B[0]))}function Jn(f){return c`<div class="detail-dep-add">
      <input
        class="detail-dep-add__input"
        aria-label="막는 이슈 추가"
        placeholder="막는 이슈 추가"
        .value=${N}
        @focus=${qn}
        @input=${On}
        @keydown=${B=>Xt(B,f)}
      />
      ${Q||N.length>0?c`<div class="detail-dep-add__list">
            ${f.length===0?c`<div class="detail-dep-add__empty">후보 없음</div>`:f.map(B=>c`<button
                      type="button"
                      class="detail-dep-add__cand"
                      data-dep-cand=${B.bead_id}
                      ?disabled=${B.disabled}
                      title=${nn(B.reason)}
                      @click=${()=>Zn(B)}
                    >
                      <span class="detail-dep-add__repo"
                        >${B.workspace_name}</span
                      >
                      <span class="detail-dep-add__id"
                        >${B.bead_id}</span
                      >
                      <span class="detail-dep-add__title"
                        >${B.title}</span
                      >
                    </button>`)}
          </div>`:""}
    </div>`}function Rr(f,B){let M=B.get(f.id),Ce=s?c`<button
          type="button"
          class="detail-dep__link"
          title=${nn(f.title)}
          @click=${()=>M===void 0?s(f.id):s(f.id,M)}
        >
          ${f.label}
        </button>`:c`<span class="detail-dep__link" title=${nn(f.title)}
          >${f.label}</span
        >`;return c`<span
      class=${`detail-dep detail-dep--${f.kind}${s?" detail-dep--link":""}`}
      >${Ce}${f.kind==="pred"?c`<button
            type="button"
            class="detail-dep__unlink"
            data-dep-b=${f.id}
            aria-label=${"\uC758\uC874 \uD574\uC81C: "+f.id}
            @click=${()=>Rn(f.id)}
          >
            ✕
          </button>`:""}</span
    >`}function Ln(f){let B=Array.isArray(f.dependencies)?f.dependencies:[],M=Array.isArray(f.dependents)?f.dependents:[],Ce=[];for(let et of B){let ht=ye(et);ht.length>0&&We(et)==="blocks"&&Ce.push({id:ht,label:`\u26D3 \uB9C9\uB294 ${ht}`,kind:"pred",title:vt(et)})}for(let et of M){let ht=ye(et);ht.length>0&&We(et)==="blocks"&&Ce.push({id:ht,label:`\u26D3 \uB9C9\uD788\uB294 ${ht}`,kind:"succ",title:vt(et)})}for(let et of B){let ht=ye(et),kn=We(et);ht.length>0&&kn!=="blocks"&&Ce.push({id:ht,label:`${nt(kn)}${ht}`,kind:"other",title:vt(et)})}let ot=Pt(),st=new Map;if(ot)for(let et of ot.issues)st.has(et.bead_id)||st.set(et.bead_id,et.root_dir);let $t=ot&&u?ju(Fu(u,ot),N):[];return c`
      <div class="detail-section-label">의존성</div>
      ${Ce.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${Ce.map(et=>Rr(et,st))}
          </div>`}
      ${ot===null?c`<div class="detail-empty">후보를 불러올 수 없음</div>`:Jn($t)}
    `}function Fn(f){let B=f.metadata||{},M=f.workflow||{},Ce=M.stages||{},ot=Ce.spec&&Ce.spec.stale,st=Ce.impl&&Ce.impl.stale,$t=M.quick_fix_review?.state==="stale",et=Ce.plan||null,ht=M.route_source==="derived",kn=M.route||B.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${ht?" detail-kv__v--derived":""}"
          title=${ht?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${ht?"unset":kn}</span
        >
      </div>
      ${M.route!=="quick_fix"||Object.hasOwn(B,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${B.spec_review||"\uC5C6\uC74C"}${ot?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${M.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${et?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${et?.approval_receipt||"\uC5C6\uC74C"}${et?.approval_state==="stale"?" \xB7 stale":et?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${M.route!=="quick_fix"||Object.hasOwn(B,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${B.impl_review||"\uC5C6\uC74C"}${st?" \xB7 stale":""}</span
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
      ${M.route==="quick_fix"||Object.hasOwn(B,"quick_fix_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">quick_fix_review</span>
            <span class="detail-kv__v"
              >${B.quick_fix_review||"\uC5C6\uC74C"}${$t?" \xB7 stale":""}</span
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
              >${Bn(M.exec_receipt)}</span
            >
          </div>`:""}
      ${M.impl_entry?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${M.impl_entry.actor}@${M.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${B.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${B.pr_url}</span>
          </div>`:""}
    `}let er={route:["quick_fix","spec_backed","full_plan"]};async function Je(f,B){let M=B.target.value;if(f==="route"&&d&&d.metadata&&d.metadata.route==="full_plan"&&M!=="full_plan"&&!window.confirm(`full_plan \u2192 ${M||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){rt();return}await gt("update-workflow-meta",{id:u,key:f,value:M},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),rt()}function Ut(f){let B=f.metadata||{};return c` ${((Ce,ot)=>{let st=er[Ce],$t=typeof B[Ce]=="string"?B[Ce]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${Ce}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${Ce}
          data-edit=${`wfmeta-${Ce}`}
          @change=${et=>Je(Ce,et)}
        >
          <option value="" ?selected=${!st.includes($t)}>
            ${ot}
          </option>
          ${st.map(et=>c`<option value=${et} ?selected=${$t===et}>${et}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function bn(f,B){return P?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${z}
            @input=${g}
            @keydown=${M=>Me(M,D,R,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${D}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${R}
            >
              취소
            </button>
          </div>
        </div>
      `:c`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${f}</h2>
        ${en(B).map(M=>c`<span class="detail-usage-total" title=${M.tooltip}
              >${M.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${h}
        >
          ✎
        </button>
      </div>
    `}function ns(f){let B=Yt(f.created_at),M=Yt(f.updated_at);return!B&&!M?c``:c`
      ${B?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${B}</span>
          </div>`:""}
      ${M?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${M}</span>
          </div>`:""}
    `}function rs(f,B){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${ct}
        >
          ${$b.map(M=>c`<option value=${M} ?selected=${M===f}>${M}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${Et}
        >
          ${xb.map(M=>c`<option value=${String(M)} ?selected=${M===B}>
                P${M}
              </option>`)}
        </select>
      </div>
    `}function oo(f){return c`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${L?"":c`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${_}
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
              .value=${V}
              @input=${y}
              @keydown=${B=>Me(B,le,Y,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${le}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${Y}
              >
                취소
              </button>
            </div>
          </div>`:c`<div class="detail-overlay__desc">
            ${f||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function os(f){let B=typeof f.notes=="string"?f.notes:"";return B.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${B}</div>
    `}function ss(f){let B=Array.isArray(f.labels)?f.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${B.map(M=>c`<span class="detail-label-chip"
              >${M}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${M}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+M}
                @click=${()=>A(M)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${ne}
            @input=${Nn}
            @keydown=${v}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${w}
          >
            추가
          </button>
        </span>
      </div>
    `}function so(){if(!u)return c``;let f=d||{},B=String(f.id||u),M=f.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",Ce=it(),ot=f.status||"open",st=typeof f.priority=="number"?Math.max(0,Math.min(4,f.priority)):"",$t=f.description||"",et={...f,metadata:{...f.metadata||{},...p}};return c`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${()=>r()}></div>
        <div class="detail-overlay__panel">
          <div class="detail-overlay__bar">
            <button
              type="button"
              class="detail-overlay__id"
              title="ID 복사"
              @click=${k}
            >
              ${B}
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
          ${bn(M,Ce)}
          ${Od(et,{onApplyRec:yt})}
          ${Rd({metadata:et.metadata,workspace_values:pt(),catalog:Ct(),execution_defaults:qt(),expanded:C,presets:pn()?.presets||[],preset_id:b,preset_busy:m,skipped_orchestration_keys:$},{onToggle:ht=>{C=ht,rt()},onEdit:(ht,kn)=>{if(ht==="impl_runtime"||ht==="impl_model"||ht==="impl_effort"){ue(Ze(ht,kn??""));return}ue(De(ht,kn??""))},onPresetSelect:ht=>{b=ht,$=[],rt()},onPresetApply:()=>{Gt()}})}
          ${Nd({md:et.metadata,catalog:K,workspace_defaults:ie,handlers:{onExecChange:(ht,kn)=>ue(De(ht,kn))}})}
          ${rs(ot,st)} ${ns(f)}
          ${oo($t)}
          ${Sd(q,se,{expanded:xe,draft:Z,sending:Te,error:S})}
          ${os(f)} ${ss(f)} ${Ln(f)}
          ${Fn(f)} ${Ut(f)}
          ${$d(f,oe)}
          ${Ud({expanded:He,loading:Be,error:te,data:H},{onToggle:Ye})}
          ${Bd(qe(),Xe,{total:Ce,expanded:at},Ie)}
          ${zd({events:Ot,shown:_t},{onMore:Pe})}
        </div>
      </div>
    `}function rt(){lt(so(),e)}return{load(f){f!==u&&(p={},b="",$=[],C=!1,G(),ge(),W(),At(),he(),X()),u=f,d=null,!wt&&t.subscribeCandidates&&(wt=t.subscribeCandidates(()=>{u&&rt()})),E(),jt(),ee!==f&&ce(f)},clear(){u=null,d=null,p={},b="",m=!1,$=[],C=!1,G(),ge(),W(),At(),he(),X(),rn(),me.close(),Qe.close(),lt(c``,e)},destroy(){Ft&&(Ft(),Ft=null),Zt&&(Zt(),Zt=null),Ht&&(Ht(),Ht=null),rn(),document.removeEventListener("keydown",ve),ae||(me.destroy(),Ee&&Ee.parentNode&&Ee.parentNode.removeChild(Ee)),Qe.destroy(),Oe.parentNode&&Oe.parentNode.removeChild(Oe),u=null,d=null,X(),b="",m=!1,$=[],ge(),W(),At(),he(),lt(c``,e)}}}function Gd(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),o=t.querySelector("#fatal-error-detail"),s=t.querySelector("#fatal-error-reload"),i=t.querySelector("#fatal-error-close"),l=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},a=(u,d,p="")=>{n&&(n.textContent=u||"Unexpected Error"),r&&(r.textContent=d||"An unrecoverable error occurred.");let b=typeof p=="string"?p.trim():"";if(o&&(b.length>0?(o.textContent=b,o.removeAttribute("hidden")):(o.textContent="No additional diagnostics available.",o.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return s&&s.addEventListener("click",()=>{window.location.reload()}),i&&i.addEventListener("click",()=>l()),t.addEventListener("cancel",u=>{u.preventDefault(),l()}),{open:a,close:l,getElement(){return t}}}var Ab="(max-width: 640px)";function $i(e){if(typeof window.matchMedia!="function")return e(!1),()=>{};let t=window.matchMedia(Ab),n=!!t.matches;e(n);let r=o=>{let i=!!(typeof o=="object"&&o!==null&&typeof o.matches=="boolean"?o.matches:t.matches);i!==n&&(n=i,e(i))};return typeof t.addEventListener=="function"?(t.addEventListener("change",r),()=>{t.removeEventListener("change",r)}):typeof t.addListener=="function"?(t.addListener(r),()=>{typeof t.removeListener=="function"&&t.removeListener(r)}):()=>{}}function Sb(){return{lanes:{done:!0},areas:{}}}function Xo(e){let t={};if(typeof e!="object"||e===null)return t;for(let[n,r]of Object.entries(e))typeof r=="boolean"&&(t[n]=r);return t}function Eb(e){try{let t=window.localStorage.getItem(e);if(!t)return null;let n=JSON.parse(t);if(typeof n!="object"||n===null)return null;let r=n;return typeof r.lanes=="object"&&r.lanes!==null?{lanes:Xo(r.lanes),areas:Xo(r.areas)}:{lanes:Xo(r),areas:{}}}catch{return null}}function Kd(e,t){try{window.localStorage.setItem(e,JSON.stringify(t))}catch{}}function xi(e,t=Sb()){let n={lanes:Xo(t.lanes),areas:Xo(t.areas)},r=Eb(e),o={lanes:{...n.lanes,...r?r.lanes:{}},areas:{...n.areas,...r?r.areas:{}}};return{isCollapsed(s){return o.lanes[s]===!0},isAreaCollapsed(s){return o.areas[s]===!0},toggle(s){let i=o.lanes[s]!==!0;return o={...o,lanes:{...o.lanes,[s]:i}},Kd(e,o),i},toggleArea(s){let i=o.areas[s]!==!0;return o={...o,areas:{...o.areas,[s]:i}},Kd(e,o),i}}}function ol(e){if(typeof e=="string"&&e.length>0)return e;if(e&&typeof e=="object"){let t=e;if(typeof t.message=="string"&&t.message.length>0)return t.message;if(typeof t.error=="string"&&t.error.length>0)return t.error;if(t.error&&typeof t.error=="object"&&typeof t.error.message=="string")return t.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}function Ai(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"&&t.length>0):[]}function Si(e){let{transport:t,console_el:n,getLanes:r,getWorkspaces:o,getCrossLanes:s,reproject:i,onCorrection:l,showToast:a,requestRender:u,adoptQueue:d,onDragBegin:p,candidate_drop:b}=e,m=[],$=null,C=!1,j=null,K=null,ie=null;function ee(){j!==null&&clearTimeout(j),j=setTimeout(()=>{j=null,C=!1},0)}function F(){return s()??null}function P(){let U=new Map,de=o();for(let se of Array.isArray(de)?de:[]){if(!se||typeof se!="object")continue;let ae=se.bead_blocked_by&&typeof se.bead_blocked_by=="object"?se.bead_blocked_by:{};for(let[Ee,me]of Object.entries(ae))Array.isArray(me)&&U.set(Ee,Ai(me));for(let Ee of[...Array.isArray(se.runnable)?se.runnable:[],...Array.isArray(se.session_active)?se.session_active:[]])Ee&&typeof Ee.bead_id=="string"&&Array.isArray(Ee.blocked_by)&&Ee.blocked_by.length>0&&U.set(Ee.bead_id,Ai(Ee.blocked_by))}return U}function L(){let U=new Map,de=new Map,se=o();for(let ae of Array.isArray(se)?se:[]){if(!ae||typeof ae!="object")continue;let Ee=ae.bead_blocked_by&&typeof ae.bead_blocked_by=="object"?ae.bead_blocked_by:{};for(let[me,Oe]of Object.entries(Ee))Array.isArray(Oe)&&U.set(me,Ai(Oe));for(let me of Array.isArray(ae.runnable)?ae.runnable:[])me&&typeof me.bead_id=="string"&&Array.isArray(me.blocked_by)&&de.set(me.bead_id,Ai(me.blocked_by))}for(let ae of m)for(let Ee of[U,de]){let me=Ee.get(ae.a);me!==void 0&&Ee.set(ae.a,ae.type==="dep-remove"?me.filter(Oe=>Oe!==ae.b):me.includes(ae.b)?me:[...me,ae.b])}return{snapshot:U,runnable:de}}function z(){let U=P();for(let de of m){let se=(U.get(de.a)||[]).slice();de.type==="dep-remove"?U.set(de.a,se.filter(ae=>ae!==de.b)):se.includes(de.b)||U.set(de.a,[...se,de.b])}return U}function V(U=r(),de=F()){let se=new Map;for(let Be of Array.isArray(de?.lanes)?de.lanes:[]){let te=new Map;for(let H of Array.isArray(Be?.entries)?Be.entries:[])H&&typeof H.bead_id=="string"&&te.set(H.bead_id,H.dep_created_by_lane===!0);se.set(typeof Be?.id=="string"?Be.id:"",te)}let ae=new Map,Ee=new Map,me=new Set,Oe=new Set;for(let Be of U.chain_lanes){let te=se.get(Be.lane_id);ae.set(Be.lane_id,{status:Be.status,entries:Be.rows.map((H,Ae)=>({bead_id:H.id,root_dir:H.root_dir,...Ae===0?{}:{dep_created_by_lane:te?.get(H.id)===!0}}))});for(let H of Be.rows)Ee.set(H.id,Be.lane_id),H.fixed&&me.add(H.id),H.unplaced||Oe.add(H.id)}let Qe=new Map;for(let Be of U.parallel_rows)typeof Be.queue_index=="number"&&Qe.set(Be.id,Be.queue_index);for(let Be of U.queue_groups)for(let te of Be.sublanes.serial)for(let H of te.items)typeof H.queue_index=="number"&&Qe.set(H.id,H.queue_index);let He=L();return{blocked_by_map:z(),snapshot_blocked_by:He.snapshot,runnable_blocked_by:He.runnable,owner_of:new Map(Object.entries(U.owner_of)),cross_lanes:ae,owner_lane_of:Ee,fixed_members:me,placed_members:Oe,parallel_rows:U.parallel_rows.map(Be=>({bead_id:Be.id,root_dir:Be.root_dir,queue_index:Be.queue_index??0})),parallel_raw_length:new Map(Object.entries(U.parallel_raw_length)),queue_index_of:Qe}}function ne(U,de){let se=r();for(let Ee of[...se.runnable,...se.queue,...se.running,...se.pr_wait,...se.done])if(!(Ee.non_occupying||Ee.id!==de)){if(Ee.root_dir===U)return Ee.expected_revision;break}let ae=se.queue_groups.find(Ee=>Ee.root_dir===U);return ae?ae.revision:0}async function N(U,de,se,ae){if(!t)return null;let me=await t(U,{...de,...se?{root_dir:se}:{},expected_revision:ae});if(me&&me.conflict){me.queue&&d?.(se,me.queue);let Oe=me.queue&&typeof me.queue.revision=="number"?me.queue.revision:ae;me=await t(U,{...de,...se?{root_dir:se}:{},expected_revision:Oe})}return me&&me.queue&&d?.(se,me.queue),me}async function Q(U,de,se,ae,Ee){try{let me=await N(U,de,se,ae.get(se)??ne(se,Ee.bead_id));return!me||typeof me.applied!="boolean"?(a("\uD050 \uC694\uCCAD\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error"),null):(me.queue&&typeof me.queue.revision=="number"&&ae.set(se,me.queue.revision),me.conflict?(a("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null):me.applied===!1?(a(me.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${me.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null):me.queue&&typeof me.queue.revision=="number"?me.queue.revision:ae.get(se)??0)}catch(me){return a(ol(me),"error"),null}}async function G(U,de,se=new Map){if(U.type==="worker-queue-disarm"){try{let ae=await N(U.type,U.payload,U.root_dir,se.get(U.root_dir)??ne(U.root_dir,de));ae&&ae.queue&&typeof ae.queue.revision=="number"&&se.set(U.root_dir,ae.queue.revision)}catch{}return!0}if(U.type==="worker-queue-place"||U.type==="worker-queue-reorder"||U.type==="worker-queue-remove")return await Q(U.type,U.payload,U.root_dir,se,{bead_id:de})!==null;try{return(U.type==="dep-add"||U.type==="dep-remove")&&t&&await t(U.type,{a:U.a,b:U.b,...U.root_dir?{root_dir:U.root_dir}:{}}),!0}catch(ae){return a(ol(ae),"error"),!1}}function X(U){(U.type==="dep-add"||U.type==="dep-remove")&&(m=[...m,{type:U.type,a:U.a,b:U.b}])}async function Re(U,de){if(!t)return{ok:!1};try{let se=await t(U.type,{...U.payload,expected_revision:de});return!se||typeof se.revision!="number"?(a("\uC5F0\uACB0 \uB808\uC778 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{ok:!1}):{ok:!0,revision:se.revision}}catch(se){let ae=se,Ee=ae&&ae.code==="conflict"?ae.details?.cross_lanes:null;return Ee&&typeof Ee.revision=="number"&&Array.isArray(Ee.lanes)?{ok:!1,conflict:Ee}:(a(ol(se),"error"),{ok:!1})}}async function we(U,de,se){let ae=new Map,Ee=[],me=U.ops.slice(0,U.lane_op_index),Oe=U.ops.slice(U.lane_op_index);for(let He of me){if(!await G(He,se,ae))return{done:!0};X(He)}let Qe=de;for(let He of U.lane_ops){if(Qe===null)return a("\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{done:!0};let Be=await Re(He,Qe);if(!Be.ok)return Be.conflict?{done:!1,conflict:Be.conflict}:{done:!0};Qe=Be.revision}for(let He of Oe){if(!await G(He,se,ae))return{done:!0};X(He),He.type==="dep-add"&&Ee.push(He)}for(let He of Nu(Ee))Qe=await ce(He,Qe);return{done:!0}}async function ce(U,de){if(de===null||!t)return de;let se=U.pairs,ae=de;for(let Ee=0;Ee<2;Ee+=1){if(se.length===0)return ae;try{let me=await t("monitor-lane-provenance",{lane_id:U.lane_id,pairs:se.map(Oe=>({bead_id:Oe.bead_id,after:Oe.after,value:!0})),expected_revision:ae});return me&&typeof me.revision=="number"?me.revision:ae}catch(me){let Oe=me,Qe=Oe&&Oe.code==="conflict"?Oe.details?.cross_lanes:null;if(!Qe||typeof Qe.revision!="number"||!Array.isArray(Qe.lanes))return ae;let He=Qe.lanes.find(Be=>Be&&Be.id===U.lane_id);se=qu(Array.isArray(He?.entries)?He.entries:[],se),ae=Qe.revision}}return ae}async function q(U,de,se=[]){m=se,l("",0);let ae=r(),Ee=F();for(let me=0;;me+=1){let Oe=U(V(ae,Ee));if("refused"in Oe){a(Oe.refused,"error");break}let Qe=await we(Oe,ae.cross_lanes_revision,de);if(Qe.done){Oe.correction&&l(Oe.correction.lane_id,Oe.correction.corrected);break}if(me>=1){a("\uB808\uC778\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4","error");break}let He=i(Qe.conflict);ae=He.lanes,Ee=He.raw_lanes}m=[],u()}async function $e(U,de){await q(se=>oi(U,de,se),U.bead_id)}function Se(U,de){let se=de&&typeof de.closest=="function"?de.closest("[data-row-index]"):null;if(se&&U.contains(se)){let ae=Number(se.getAttribute("data-row-index"));return Number.isFinite(ae)?ae:0}return U.querySelectorAll("[data-row-index]").length}function S(U){let de=typeof U?.closest=="function"?U.closest(".worker-pane--collapsed[data-lane]"):null;if(!de)return null;let se=de.getAttribute("data-lane");return se==="queue"?{zone:de,target:{kind:"parallel",marker_index:r().parallel_rows.length}}:se==="candidate"&&b===!0?{zone:de,target:{kind:"candidate"}}:null}function Z(U){let de=U.target;if(!$)return null;let se=typeof de?.closest=="function"?de.closest("[data-drop]"):null;if(!se)return S(de);let ae=se.getAttribute("data-drop");if(ae==="candidate")return{zone:se,target:{kind:"candidate"}};if(ae==="parallel")return{zone:se,target:{kind:"parallel",marker_index:Se(se,de)}};if(ae==="chain")return{zone:se,target:{kind:"chain",lane_id:se.getAttribute("data-lane-id")||"",marker_index:Se(se,de)}};if(ae==="repo-serial"){let Ee=se.getAttribute("data-root-dir")||"";if(Ee!==$.root_dir)return null;let me=typeof de?.closest=="function"?de.closest("[data-queue-index]"):null,Oe=me&&se.contains(me)?me.getAttribute("data-queue-index"):se.getAttribute("data-lane-length"),Qe=Number(Oe);return{zone:se,target:{kind:"repo-serial",root_dir:Ee,lane_id:se.getAttribute("data-lane-id")||"",index:Number.isFinite(Qe)?Qe:0}}}return null}function Te(){for(let U of Array.from(n.querySelectorAll(".is-drop-over")))U.classList.remove("is-drop-over")}function _e(U){K=U.target instanceof Element?U.target:null}function xe(U){let de=U.target,se=typeof de?.closest=="function"?de.closest('[draggable="true"][data-bead-id]'):null,ae=se?se.closest("[data-drag-kind]"):null;if(!ae)return;if(se&&K&&se.contains(K)&&typeof K.closest=="function"&&K.closest("input, button, a")){U.preventDefault();return}let Ee=ae.getAttribute("data-bead-id")||"",me=ae.getAttribute("data-drag-kind")||"",Oe=ae.getAttribute("data-root-dir")||"";if(!Ee||!me)return;let Qe=ae.getAttribute("data-queue-index")||"",He=Number(Qe),Be=ae.getAttribute("data-lane-id")||"";$={kind:me,bead_id:Ee,root_dir:Oe,...Qe!==""&&Number.isFinite(He)?{queue_index:He}:{},...Be?{lane_id:Be}:{}},C=!0,p?.(),n.classList.add("is-dragging");try{U.dataTransfer?.setData("text/plain",Ee),U.dataTransfer&&(U.dataTransfer.effectAllowed="move")}catch{}}function ge(U){let de=Z(U);de&&(U.preventDefault(),U.dataTransfer&&(U.dataTransfer.dropEffect="move"),de.zone.classList.add("is-drop-over"))}function je(U){let de=U.target;typeof de?.closest=="function"&&(de.closest("[data-drop]")?.classList.remove("is-drop-over"),de.closest(".worker-pane--collapsed")?.classList.remove("is-drop-over"))}function ft(){$=null,Te(),n.classList.remove("is-dragging"),ee()}function Le(U){let de=Z(U),se=$;$=null,Te(),n.classList.remove("is-dragging"),!(!de||!se)&&(U.preventDefault(),$e(se,de.target))}return{attach(U){ie||(ie=U,U.addEventListener("pointerdown",_e),U.addEventListener("dragstart",xe),U.addEventListener("dragover",ge),U.addEventListener("dragleave",je),U.addEventListener("drop",Le),U.addEventListener("dragend",ft))},detach(){j!==null&&(clearTimeout(j),j=null);let U=ie;ie=null,U&&(U.removeEventListener("pointerdown",_e),U.removeEventListener("dragstart",xe),U.removeEventListener("dragover",ge),U.removeEventListener("dragleave",je),U.removeEventListener("drop",Le),U.removeEventListener("dragend",ft))},isDragging(){return $!==null},consumeClickSuppression(){let U=C;return C=!1,U},applyDrop:$e,runPlanned:q,dropModel:V,sendOp:G,sendQueueCas:Q,rememberDep:X}}function Vd(e,t){let n=new Map;if(!e||typeof e!="object")return n;let r=e,o=[],s=new Set;for(let i of t){if(s.has(i.id))continue;s.add(i.id);let l=r[i.id];if(!l||!Array.isArray(l.scope))continue;let a=l.scope.filter(u=>typeof u=="string"&&u.length>0);if(a.length===0){n.set(i.id,{overlaps:[],scope_missing:!0});continue}n.set(i.id,{overlaps:[],scope_missing:!1}),o.push({member:i,scope:a})}for(let i=0;i<o.length;i+=1)for(let l=i+1;l<o.length;l+=1){let a=Ns(o[i].scope,o[l].scope);if(a.length===0)continue;let u=o[i].member,d=o[l].member;n.get(u.id)?.overlaps.push({id:d.id,title:d.title,location_label:d.location_label,prefixes:a}),n.get(d.id)?.overlaps.push({id:u.id,title:u.title,location_label:u.location_label,prefixes:a})}return n}var Tb=["parallel","serial","candidate"];function Yd(e){return Tb.includes(e.kind)?e.kind!=="candidate"||e.queue_placeable===!0:!1}function Zo(e){return e==="pr_wait"?"PR \uB300\uAE30":"\uC2E4\uD589 \uC911"}function sl(e,t,n){let r=n.members_by_id.get(e),o=n.members_by_id.get(t);if(!r||!o)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let s=r.lane_id,i=o.lane_id;if(s!==null&&s===i)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let l=Yd(r),a=Yd(o);if(r.kind==="candidate"&&!l)return{kind:"disabled",title:`${e}\uB294 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 (spec \uC5C6\uC74C \uB610\uB294 worker-ineligible)`};if(o.kind==="candidate"&&!a)return{kind:"disabled",title:`${t}\uB294 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 (spec \uC5C6\uC74C \uB610\uB294 worker-ineligible)`};if(l&&i!==null)return{kind:"ops",title:`${i} \uB05D\uC5D0 ${e}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:e,lane:i,index:n.serial_raw_lengths[i]||0}]};if(s!==null&&a&&i===null)return{kind:"ops",title:`${s} \uB05D\uC5D0 ${t}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:s,index:n.serial_raw_lengths[s]||0}]};if(l&&s===null&&a&&i===null){let u=Cb(n);return u===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 \uC9C1\uB82C \uB808\uC778 \uC218\uB97C \uC870\uC808\uD558\uC138\uC694"}:{kind:"ops",title:`${u} \uB808\uC778\uC5D0 ${t} \u2192 ${e} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:u,index:0},{bead_id:e,lane:u,index:1}]}}return!l&&!a?{kind:"note",text:"\uB458 \uB2E4 \uC774\uBBF8 \uCD9C\uBC1C \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:l?{kind:"note",text:`${Zo(o.kind)} \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}:{kind:"note",text:`${Zo(r.kind)} \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}}function Cb(e){for(let t=0;t<e.serial_lane_count;t+=1){let n=`s${t+1}`;if((e.serial_raw_lengths[n]||0)===0&&!e.occupied_lanes.has(n))return n}return null}var il=Object.freeze({repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",manual_target_missing:"\uC218\uB3D9 \uBC30\uD3EC \uAE30\uB85D\uC5D0 \uD540\uB41C \uB300\uC0C1 SHA\uAC00 \uC5C6\uC5B4 \uC2E4\uD589\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_red:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",cleanup_failed:"\uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uAC00 \uB05D\uB098\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",retry_exhausted:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB97C \uBAA8\uB450 \uC4F0\uACE0\uB3C4 \uAC19\uC740 \uC2E4\uD328\uAC00 \uC774\uC5B4\uC84C\uC2B5\uB2C8\uB2E4.",conflict_unresolved:"\uCDA9\uB3CC \uD574\uC18C\uAC00 \uB05D\uB098\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",internal_record_failed:"Worker \uB0B4\uBD80 \uAE30\uB85D\uC774 \uC2E4\uD328\uD574 \uC9C4\uD589\uC744 \uBA48\uCDC4\uC2B5\uB2C8\uB2E4.",repair_lane_retired:"\uC790\uB3D9 \uC218\uB9AC \uB808\uC778\uC774 \uC740\uD1F4\uD574 \uC0AC\uB78C \uCC98\uB9AC\uB85C \uB118\uC5B4\uC654\uC2B5\uB2C8\uB2E4."});var Qd={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428",quickfix_landing_failed:"\uCC29\uC9C0 \uC2E4\uD328",runner_exit:"\uC138\uC158 \uC2E4\uD328",session_parked:"\uC138\uC158 \uB300\uAE30",session_ended_unresolved:"\uC138\uC158 \uC885\uB8CC",delivery_unproven:"\uCC29\uC9C0 \uC99D\uAC70 \uBD80\uC871"};function Ti(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function Ei(e){for(let t of Ti(e)){if(Object.hasOwn(Qd,t))return Qd[t];if(t.startsWith("session_"))return"\uC138\uC158 \uC2E4\uD328"}return null}function Zd(e){return Ti(e).length===0?null:Ei(e)||"\uC2E4\uD328"}function Er(e){let t=null;for(let n of Ti(e))Object.hasOwn(il,n)&&(t=il[n]);return t}function cr(e){let t=Ei(e),n=Er(e);return t&&n?`${t} \u2014 ${n}`:t||n?t||n:typeof e=="string"?e:""}function Jd(e,t){let n=Ei(e)??Ei(t),r=Er(t)??Er(e);return n&&r?`${n} \u2014 ${r}`:n||r?n||r:typeof t=="string"?t:""}var Rb=new Set(["repo_operation_timeout_unresolved"]);function Ob(e){for(let t of Ti(e))if(Rb.has(t)||t.startsWith("repo_ops_"))return!0;return!1}function Lb(e,t){return t.code==="interrupted"||t.interrupted===!0||e.failure_kind==="interrupted_without_terminal_exit"||t.code==="interrupted_without_terminal_exit"}function ep(e,t){if(!e||typeof e!="object")return"";let n=e.failure;if(!n||typeof n!="object"||Ob(n.code))return"";if(n.code==="timeout"){let o=Number(t);return Number.isFinite(o)&&o>0?`\uD0C0\uC784\uC544\uC6C3 ${Math.round(o/1e3)}\uCD08 \uCD08\uACFC`:"\uD0C0\uC784\uC544\uC6C3 \uCD08\uACFC"}if(Lb(e,n))return"\uC885\uB8CC \uAE30\uB85D \uC5C6\uC74C \u2014 \uC911\uB2E8\uB428";let r=typeof e.elapsed_ms=="number"&&Number.isFinite(e.elapsed_ms)&&e.elapsed_ms>=0?` \xB7 ${kr(e.elapsed_ms)}`:"";return typeof e.signal=="string"&&e.signal.length>0?`signal ${e.signal}${r}`:Number.isInteger(e.exit_code)?`exit ${e.exit_code}${r}`:""}var Xd={schema_unsupported:"\uD540\uB41C \uC815\uCC45 \uC2A4\uD0A4\uB9C8\uB97C \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."};function tp(e){if(!e||typeof e!="object")return"";let t=e.retry;if(!t||typeof t!="object")return"";if(typeof t.blocked_reason=="string"&&t.blocked_reason)return`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uBABB \uD568 \u2014 ${Object.hasOwn(Xd,t.blocked_reason)?Xd[t.blocked_reason]:t.blocked_reason}`;if(t.status==="absorbed"){let n=t.absorbed&&typeof t.absorbed=="object"?t.absorbed:null,r=cr(n?.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428 \u2014 \uCCAB \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428"}if(e.state!=="failed")return"";if(t.status==="not_applicable")return"\uC7AC\uC2DC\uB3C4 \uB300\uC0C1 \uC544\uB2D8 \u2014 \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804 \uC2E4\uD328";if(t.status==="consumed"){let n=typeof t.first_fingerprint=="string"&&t.first_fingerprint?t.first_fingerprint:null;if(n===null)return"";if(n===e.failure?.fingerprint)return"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uAC19\uC740 \uC2E4\uD328";let r=cr(t.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328"}return""}function Ib(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}var np=200;function Mb(e){return typeof e!="string"||e.length===0?"":e.length>np?`${e.slice(0,np)}\u2026`:e}function Pb(e){let t=e&&e.attempts>0&&e.max>0?` ${e.attempts}/${e.max}`:"",n=e&&typeof e.next_at=="number"?` \xB7 ${new Date(e.next_at).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}`:"";return`\u21BB \uC7AC\uC2DC\uB3C4 \uB300\uAE30${t}${n}`}function op(e){if(!e)return"";let t=Array.isArray(e.timeline)?e.timeline:[],n=typeof e.log_path=="string"?e.log_path:"",r=e.log_expired===!0;return t.length===0&&n.length===0&&!r?"":c`${t.length>0?c`<ol class="rtile__history" data-seam="tile-timeline">
        ${t.map(o=>c`<li class="rtile__history-row">
              ${rp(o.at)?c`<span class="rtile__history-at"
                    >${rp(o.at)}</span
                  >`:""}<span class="rtile__history-summary">${o.summary}</span>
            </li>`)}
      </ol>`:""}${r?c`<p
        class="rtile__history-log"
        data-seam="tile-log-path"
        title="180일 보존 정책으로 삭제됨"
      >
        만료됨
      </p>`:n.length>0?c`<p class="rtile__history-log" data-seam="tile-log-path">
          ${Qr(n)}
        </p>`:""}`}function rp(e){return typeof e!="number"||!Number.isFinite(e)?"":new Date(e).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}function Db(e,t){if(!e||e.open!==!0)return"";let n=Er(e.cause)||cr(e.cause),r=e.retry&&e.retry.attempts>0?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 ${e.retry.attempts}\uD68C \u2014 \uAC19\uC740 \uC624\uB958`:"",o=e.cause_detail,s=e.quickfix_lane&&e.quickfix_landing?e.quickfix_landing:null,i=s?[s.cursor||null,typeof s.head_sha=="string"?s.head_sha.slice(0,7):null,s.reason||null].filter(Boolean).join(" \xB7 "):"",l=typeof e.finished_at=="number"?`${new Date(e.finished_at).toLocaleString("ko-KR")} \xB7 ${on(e.finished_at,t)}`:"",a=[e.runner,e.model,e.observed_effort??e.effort,e.speed].filter(b=>typeof b=="string"&&b.length>0).join(" \xB7 "),u=e.usage?.total_cost_usd,d=typeof u=="number"&&Number.isFinite(u)?`$${u.toFixed(2)}`:"",p=op(e);return c`<div
    class="rtile__failure-pop"
    role="dialog"
    aria-label="실패 상세"
  >
    <dl class="rtile__failure-kv">
      ${e.summary?c`<div>
            <dt>보고</dt>
            <dd>${e.summary}</dd>
          </div>`:""}
      ${p?c`<div>
            <dt>이력</dt>
            <dd>${p}</dd>
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
  </div>`}function Nb(e){return!e||!e.repo&&!e.serial_lane_id?"":c`${e.repo?c`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?c`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`}var qb=new Set(["codex-runner"]);function Fb(e,t,n,r=null){if(!e)return"";let o=e.last_activity||null,s=o&&typeof o.text=="string"?o.text:"",i=o&&typeof o.at=="number"?o.at:null,l=(r||!Array.isArray(e.legs)?[]:e.legs).filter(m=>m&&!(typeof m.agent_type=="string"&&qb.has(m.agent_type))),a=l.filter(m=>m&&m.state==="live"),u=l.filter(m=>m&&m.state!=="live"),d=r&&typeof r.last_event_at=="number"?on(r.last_event_at,t):"",p=r?on(r.updated_at,t):"",b=d?`\uCD5C\uADFC \uD65C\uB3D9 ${d}`:p?`\uAC31\uC2E0 ${p}`:"";return c`${s?c`<div class="rtile__activity${n?" is-paused":""}">
        <span class="rtile__activity-dot" aria-hidden="true"></span>
        <span class="rtile__activity-text">${s}</span>
        ${i!==null?c`<span class="rtile__activity-age"
              >${on(i,t)}</span
            >`:""}
      </div>`:b?c`<div class="rtile__activity rtile__activity--session">
          <span class="rtile__activity-dot" aria-hidden="true"></span>
          <span class="rtile__activity-text">${b}</span>
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
      </div>`:""}`}var jb={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function Bb(e){if(!e)return"";let t=jb[e.locality]||"";return c`<button
    type="button"
    class="rtile__session"
    ?disabled=${t.length>0}
    title=${t||"\uB77C\uC774\uBE0C \uC138\uC158 \uC5F4\uAE30"}
    aria-label="라이브 세션 열기"
  >
    ▤ 세션
  </button>`}function Ub(e,t,n){if(!e)return"";let r=Mb(t?.summary),o=op(t);return c`${r?c`<p class="rtile__held-summary">${r}</p>`:""}${o}
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
    </div>`}function al(e,t,n=null,r={}){let o=e.kind==="session",s=o&&Array.isArray(e.session_refs)&&e.session_refs.find(Z=>Z&&Z.current===!0)||null,i=e.failed===!0,l=i&&e.failure||null,a=e.parked===!0&&!i,u=e.retry_wait===!0&&!i&&!a,d=a&&e.failure||null,p=a||u,b=!!e.paused,m=i||p?e.status_label||(a?"\uC138\uC158 \uB300\uAE30":u?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):b?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?Ib(t-e.started_at):"\u2014",$=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,C=go(e),j=en(e.usage),K=Wn(e.usage),ie=e.conflict_resolution?b?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,ee=e.base_exception||null,F=e.landing,P=e.attempt_id&&e.attempt_id===n,L=r.monitor||null,z=Nb(L),V=L?Ws(L.dependency_chips):"",ne=Fb(L,t,b,o?{updated_at:e.updated_at??null,last_event_at:s&&s.locality==="local"?s.last_event_at:null}:null),N=o&&e.workflow?.chips?.exec_receipt||null,Q=zs(e.workflow),G=Hs(e.rec),X=N?c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Bn(N)}`}
        >${`${N.kind}:${$s(N)}`}</span
      >`:"",Re=s?c`<span
        class="ctl-chip ctl-chip--sref"
        title=${`${s.provider}:${s.session_id}@${s.host}${(e.session_refs||[]).length>=2?` \xB7 \uC774\uB825 ${(e.session_refs||[]).length}`:""}`}
        >${bo(s)}</span
      >`:"",we=z||Q||Re||X||G?c`<div class="rtile__meta">
          ${z}${Q}${Re}${X}${G}
        </div>`:"",ce=l?c`<button
          type="button"
          class="rtile__failure-badge"
          data-attempt-id=${l.attempt_id}
          aria-expanded=${l.open===!0?"true":"false"}
          aria-label="실패 상세"
        >
          ⛔ ${Zd(l.cause)||"\uC2E4\uD328"}
        </button>
        ${l.halted_auto_advance?c`<span class="rtile__auto-halted">자동 진행 꺼짐</span>`:""}`:"",q=a?c`<span
        class="rtile__held-badge"
        title="세션이 사용자 결정을 기다리며 정상 종료했습니다 — 큐는 계속 갑니다"
        >⏸ 세션 대기</span
      >`:u?c`<span
          class="rtile__held-badge"
          title="환경성 실패의 자동 재시도를 기다립니다 — 사람이 할 일은 없습니다"
          >${Pb(e.retry)}</span
        >`:"",$e=c`${ie?c`<span class="worker-mini__badge">${ie}</span>`:""}${ee?c`<span
        class="worker-mini__badge"
        title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
        >${ee}</span
      >`:""}${ce}${q}`,Se=o?"":Xr(e),S=e.discard?.action&&!(i&&l?.landed===!0)?c`<button
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
    class="rtile${P?" rtile--sel":""}${b?" rtile--paused":""}${i?" rtile--failed rtile--compact":""}${p?" rtile--held rtile--compact":""}${a?" rtile--parked":""}${u?" rtile--retry-wait":""}${o?" rtile--session":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span
        class="rtile__dot${o?" rtile__dot--session":""}"
        aria-hidden="true"
      ></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${Gs(e.priority)}${C?c`<span class="rtile__resumed" title=${C}>↻</span>`:""}${$e}
      <div class="rtile__hd-actions">
        ${o?c`${typeof e.started_at=="number"?c`<span class="rtile__elapsed">${m}</span>`:""}${Bb(s)}<span
                class="rtile__session-badge"
                title="Worker가 아닌 세션이 in_progress로 잡은 이슈"
                >세션</span
              >`:c`<span class="rtile__elapsed">${m}</span>`}
        ${o||p?"":i?c`<button
                  type="button"
                  class="rtile__resume"
                  ?disabled=${l?.resume_eligible===!1}
                  title=${l?.resume_eligible===!1?l.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589"}
                  aria-label="이어하기"
                >
                  ↻ 이어하기
                </button>
                ${S}`:c`<button
                  type="button"
                  class="rtile__session"
                  title="라이브 세션 열기"
                  aria-label="라이브 세션 열기"
                >
                  ▤ 세션
                </button>
                ${b?c`<button
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
                ${S}`}
      </div>
    </div>
    <div class="rtile__title">${e.title}</div>
    ${p?Ub(a,d,S):i?"":c`${ne}${e.rollup?ks(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:Vi}):""}
            ${F?c`<div class="rtile__landing">
                  <span
                    class="merge-step${F.failed?" merge-step--failed":""}"
                    style=${`--progress: ${F.percent}%`}
                    >${F.label}${F.index>0?c`<span class="merge-step__n"
                          >${F.index}/${F.total}</span
                        >`:""}</span
                  >
                </div>`:""}
            ${V}
            ${o?we:z||Q||$||G||j.length>0||K?c`<div class="rtile__meta">
                    ${z}${Q}${Us(e.exec_chips)}${G}
                    ${j.length>0?j.map(Z=>c`<span
                              class="worker-usage"
                              title=${Z.tooltip}
                              >${Z.label}</span
                            >`):K?c`<span
                            class="worker-usage"
                            title=${yo(e.usage)}
                            >${K}</span
                          >`:""}
                  </div>`:""}
            ${qs(e)} ${Se}
            <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
            ${i||b?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}`}
    ${Db(l,t)}
  </div>`}function Wb(e){let t=e.last_activity&&typeof e.last_activity=="object"?e.last_activity:null,n=Array.isArray(e.legs)?e.legs:[],r=e.dependency_chips||null;return!t&&n.length===0&&!r&&e.kind!=="session"?null:{...t?{last_activity:t}:{},...n.length>0?{legs:n}:{},...r?{dependency_chips:r}:{}}}function sp(e,t=Date.now(),n=null){let r=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${r.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:r.map(o=>al(o,t,n,{monitor:Wb(o)}))}
  </div>`}var tn="",zb=["impl_runtime","impl_model","impl_effort"],Hb=["claude_account","codex_account"],Gb=5,Ci=1;function _n(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Ri(e,t){let n=t.transport,r=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,o=t.notify||(O=>pe(O,"error",4e3)),s={},i={},l=[],a=!1,u={state:"absent",values:{},warnings:[]},d={},p={},b=Promise.resolve(),m={claude:null,codex:null},$=!1,C=null,j={},K="",ie="",ee=!1,F=!1,P=!1,L=null,z=!1;function V(){let O=t.queue?t.queue():null;return _n(O)?O:null}function ne(){let O=V();return O?O.runner_catalog:null}function N(){let O=V();return O&&_n(O.execution_defaults)?O.execution_defaults:null}function Q(){let O=t.implPresetStore?.get();return _n(O)&&Array.isArray(O.presets)?O:null}function G(){return r===null?{}:{root_dir:r}}async function X(O,re){return z||!n?null:await n(O,re)}function Re(O){O&&_n(O.queue)&&t.onQueueAdopt?.(O.queue)}async function we(O,re){let he=V();if(!he||z)return null;let T=await X(O,{...re,...G(),expected_revision:he.revision});if(Re(T),r!==null&&T&&T.conflict){let J=T.queue&&typeof T.queue.revision=="number"?T.queue.revision:V()?.revision??he.revision;T=await X(O,{...re,...G(),expected_revision:J}),Re(T)}return T}async function ce(){a=!0,ze();try{let O=await X("get-session-defaults",{...G()});s=_n(O?.values)?{...O.values}:{},i={...s},l=Array.isArray(O?.warnings)?O.warnings:[]}catch(O){l=["kv_read_failed"],o(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${O instanceof Error?O.message:String(O)}`)}finally{a=!1,ze()}}async function q(){let O=jc(s,i);if(Object.keys(O).length!==0){try{let re=await X("set-session-defaults",{values:O,...G()});s=_n(re?.values)?{...re.values}:{},i={...s},l=Array.isArray(re?.warnings)?re.warnings:[]}catch(re){o(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${re instanceof Error?re.message:String(re)}`)}ze()}}function $e(O,re){if(!_n(O))return;let he=O.state;u={state:he==="usable"||he==="unusable"||he==="absent"?he:"absent",values:_n(O.values)?{...O.values}:{},warnings:Array.isArray(O.warnings)?O.warnings:[]},p={...u.values},re&&(d={...p})}async function Se(){try{$e(await X("get-workspace-accounts",{...G()}),!0)}catch(O){u={state:"unusable",values:{},warnings:["kv_read_failed"]},p={},d={},o(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${O instanceof Error?O.message:String(O)}`)}ze()}async function S(O){try{let re=await fetch(O);if(!re.ok)return null;let he=await re.json();if(!_n(he)||!Array.isArray(he.accounts))return null;let T=he.accounts.filter(J=>_n(J)&&typeof J.key=="string"&&J.key.length>0&&typeof J.email=="string"&&J.email.length>0);return{accounts:T,active:T.find(J=>J.active===!0)||null}}catch{return null}}async function Z(){$=!0;let[O,re]=await Promise.all([S("/api/claude-usage"),S("/api/codex-usage")]);z||(m={claude:O,codex:re},ze())}function Te(){let O={};for(let re of Hb){let he=Object.hasOwn(d,re)?d[re]:null,T=Object.hasOwn(p,re)?p[re]:null;he!==T&&(O[re]=he)}return O}async function _e(){let O=Te();if(Object.keys(O).length!==0){try{$e(await X("set-workspace-accounts",{values:O,...G()}),!1)}catch(re){o(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${re instanceof Error?re.message:String(re)}`)}ze()}}function xe(O,re){re===tn?delete d[O]:d[O]=re,ze(),b=b.then(()=>_e())}function ge(O,re){if(zb.includes(O)){Le(O,re);return}re===tn?delete i[O]:i[O]=re,ze(),q()}function je(){let O=Ot().orchestration_model,re=mn({global:{orchestration_model:O??void 0},execution_defaults:N(),runner_catalog:ne()}).orchestration_model.value;return re?$n(ne(),re):null}function ft(O,re){typeof re=="string"&&re.length>0?i[O]=re:delete i[O]}function Le(O,re){let he=re===tn?void 0:re,T=qc({impl_runtime:O==="impl_runtime"?he:i.impl_runtime,impl_model:O==="impl_model"?he:i.impl_model,impl_effort:O==="impl_effort"?he:i.impl_effort},ne(),je());ft("impl_runtime",T.impl_runtime),ft("impl_model",T.impl_model),ft("impl_effort",T.impl_effort),ze(),q()}async function U(){let O=V();if(!O)return;let re={orchestration_model:O.orchestration_model??null,orchestration_effort:O.orchestration_effort??null,orchestration_speed:O.orchestration_speed??null},he=Bc(re,{...re,...j});if(Object.keys(he).length!==0){try{let T=await we("worker-queue-set-orchestration-defaults",{values:he});if(T&&T.applied===!1){o("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}j={}}catch(T){o(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${T instanceof Error?T.message:String(T)}`)}ze()}}function de(O,re){j[O]=re===tn?null:re,ze(),U()}function se(O){if(C=O,!O){ze();return}let re=ne(),he=Ot(),T=he.orchestration_model;T&&!$o(re,O).includes(T)&&(j.orchestration_model=null,T=null);let J=he.orchestration_effort;J&&!sa(re,O,T||hn).includes(J)&&(j.orchestration_effort=null),ze(),U()}async function ae(O){if(!(!V()||O<Ci)){try{await we("worker-queue-set-slots",{slots:O})}catch(re){o(`slots \uC800\uC7A5 \uC2E4\uD328: ${re instanceof Error?re.message:String(re)}`)}ze()}}async function Ee(O){if(!(!V()||O<Ci||O>Gb)){try{await we("worker-queue-set-serial-lane-count",{count:O})}catch(re){o(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${re instanceof Error?re.message:String(re)}`)}ze()}}async function me(O,re){let he=O==="auto_advance"?"worker-automation-toggle":"worker-merge-auto-toggle";try{await we(he,{on:re})}catch(T){o(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${T instanceof Error?T.message:String(T)}`)}ze()}function Oe(){let O={},re=Ot();for(let he of Gr){let T=Gn.includes(he)?re[he]:i[he];typeof T=="string"&&T.length>0&&(O[he]=T)}return O}async function Qe(){let O=Q();if(!O)return;let re=Oe();if(Object.keys(re).length===0){o("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let he=(O.presets||[]).find(J=>J.id===K),T=ie.trim()||(he?he.name:"");if(!T){o("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let J=he?await X("impl-preset-update",{expected_revision:O.revision,id:he.id,name:T,settings:re}):await X("impl-preset-create",{expected_revision:O.revision,name:T,settings:re});if(J&&J.applied){if(ie="",!he&&Array.isArray(J.presets)){let Pe=J.presets.find(Ye=>Ye.name===T);K=Pe?Pe.id:K}ze()}else o("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),ze()}catch(J){o(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${J instanceof Error?J.message:String(J)}`)}}async function He(){let O=Q();if(!(!O||K.length===0))try{let re=await X("impl-preset-delete",{expected_revision:O.revision,id:K});re&&re.applied?(K="",ze()):(o("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),ze())}catch(re){o(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${re instanceof Error?re.message:String(re)}`)}}function Be(O){s=_n(O.values)?{...O.values}:{},i={...s},l=Array.isArray(O.warnings)?O.warnings:[],_n(O.queue)&&(t.onQueueAdopt?.(O.queue),j={})}async function te(){let O=Q(),re=V();if(!O||!re||K.length===0)return;let he=T=>({preset_id:K,expected_revision:O.revision,expected_queue_revision:T,...G()});try{let T=await X("apply-impl-preset-global",he(re.revision));if(T&&T.applied&&Be(T),r!==null&&T&&T.queue_applied===!1){let J=T.queue&&typeof T.queue.revision=="number"?T.queue.revision:V()?.revision??re.revision;T=await X("apply-impl-preset-global",he(J)),T&&T.applied&&Be(T)}T&&T.applied?T.queue_applied===!1&&o("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):T&&T.conflict&&o("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(T){o(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${T instanceof Error?T.message:String(T)}`)}ze()}async function H(){F=!0,P=!1,ze();try{let O=await X("get-worker-system-prompt",{});!O||typeof O!="object"||Array.isArray(O)?P=!0:L=O}catch{P=!0}finally{F=!1,ze()}}function Ae(){if(ee=!ee,ee&&!L){H();return}ze()}function ut(){let O=to({loading:F,error:P});if(O)return O;if(!L)return"";let re=Array.isArray(L.variants)?L.variants:[];return c`<div class="settings-dialog__sp-body">
      ${L.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${L.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${re.map(he=>c`<div class="settings-dialog__sp-variant" data-variant=${he.key}>
            <div class="settings-dialog__sp-cond">${he.condition}</div>
            ${Xn(he.label,he.system_prompt)}
          </div>`)}
    </div>`}function x(){return c`<section
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
      ${ee?ut():""}
    </section>`}function W(O,re,he,T,J,Pe,Ye){let qe=J[O]??tn,it=ia(O,he,J,N(),ne(),Ye),at=it.options.find(tt=>tt.value===qe),Ue=qe===tn?it.full_value:at?.full_value;return c`<select
        class=${qe===tn?"settings-dialog__unset":""}
        data-key=${O}
        aria-label=${re}
        title=${Ue||""}
        ?disabled=${Pe===!0||it.disabled}
        .value=${Ar(String(qe))}
        @change=${tt=>T(O,String(tt.target.value))}
      >
        <option value=${tn} ?selected=${qe===tn}>
          ${it.unset_label}
        </option>
        ${it.options.map(tt=>c`<option
              value=${tt.value}
              title=${tt.full_value||""}
              ?selected=${tt.value===qe}
            >
              ${tt.label}
            </option>`)}
      </select>
      ${qe===tn?c`<span class="settings-dialog__source-badge">기본</span>`:""}`}function be(O,re,he,T,J,Pe=!1,Ye){return c`<div
      class=${`settings-dialog__row${Pe?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${re}</span>
      <span class="settings-dialog__controls">
        ${W(O,re,he,T,J,Pe,Ye)}
      </span>
    </div>`}function Ie(O,re){let he=re?re.active:null;return _n(he)?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${O==="claude"?he.email:ro({...he,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)"}function Ne(O,re,he){let T=m[he],J=Object.hasOwn(d,O)?d[O]:tn,Pe=he==="claude"?vi:ro,Ye=!!T?.accounts.some(qe=>qe.key===J);return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${re}</span>
      <span class="settings-dialog__controls">
        <select
          aria-label=${re}
          data-account-key=${O}
          @change=${qe=>xe(O,String(qe.target.value))}
        >
          <option value=${tn} ?selected=${J.length===0}>
            ${Ie(he,T)}
          </option>
          ${J.length>0&&!Ye?c`<option value=${J} selected>
                ${J} (목록에 없음)
              </option>`:""}
          ${T?.accounts.map(qe=>c`<option value=${qe.key} ?selected=${qe.key===J}>
                ${Pe(qe)}
              </option>`)||""}
        </select>
        ${T?"":c`<span class="settings-dialog__hint"
              >계정 목록을 불러올 수 없습니다</span
            >`}
      </span>
    </div>`}function Fe(){let O=u.warnings.join(", ");return u.state==="unusable"?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uD574\uC11D\uD560 \uC218 \uC5C6\uC5B4 \uC774 \uB808\uD3EC\uC758 \uB514\uC2A4\uD328\uCE58\uAC00 \uAC70\uBD80\uB429\uB2C8\uB2E4 \u2014 ${O} \xB7 \uACC4\uC815\uC744 \uB2E4\uC2DC \uACE0\uB974\uBA74 \uD574\uC18C\uB429\uB2C8\uB2E4`:u.warnings.length>0?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC5D0 \uC54C \uC218 \uC5C6\uB294 \uD0A4\uAC00 \uC788\uC2B5\uB2C8\uB2E4 \u2014 ${O}`:null}function dt(O,re,he,T,J){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${re}-on)`}
        ></i>
        ${O}
      </span>
      <span class="settings-dialog__controls">
        ${W(he,`${O} \uBAA8\uB378`,T,ge,i,!1)}
        ${W(J,`${O} effort`,Ls,ge,i,!1)}
      </span>
    </div>`}function At(O,re,he,T){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${re}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${T?" is-on":""}`}
          data-automation=${O}
          aria-pressed=${T?"true":"false"}
          aria-label=${re}
          @click=${()=>me(O,!T)}
        >
          ${T?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${he}</span>
      </span>
    </div>`}function Mt(O,re,he,T){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${re}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${O}>
          <button
            type="button"
            aria-label=${`${re} \uAC10\uC18C`}
            @click=${()=>T(he-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${he}</span>
          <button
            type="button"
            aria-label=${`${re} \uC99D\uAC00`}
            @click=${()=>T(he+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function zt(O){return c`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${O.rows.length>0?`\uBCC0\uACBD ${O.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${O.rows.map(re=>c`<div
            class="settings-dialog__preset-diff-row"
            data-diff-kind=${re.kind}
          >
            <span class="settings-dialog__preset-diff-label">${re.label}</span>
            <span class="settings-dialog__preset-diff-value"
              >${re.before??"\uAE30\uBCF8"}</span
            >
            <span class="settings-dialog__preset-diff-arrow">→</span>
            <span
              class="settings-dialog__preset-diff-value settings-dialog__preset-diff-after"
              >${re.after??"\uAE30\uBCF8(\uD574\uC81C)"}</span
            >
          </div>`)}
      ${O.ignored_keys.length>0?c`<div class="settings-dialog__preset-diff-note">
            ${O.ignored_keys.join(", ")}은(는) 전역 적용이 쓰지 않는 키라
            무시됩니다
          </div>`:""}
    </div>`}function Ot(){let O=V(),re={};for(let he of Gn)re[he]=Object.prototype.hasOwnProperty.call(j,he)?j[he]:O&&typeof O[he]=="string"?O[he]:null;return re}function _t(){let O=ne(),re=i.impl_runtime,he=i.impl_model,T=Q(),J=V(),Pe=Ot(),Ye=$o(O,C),qe=Kr(O,void 0).filter(pt=>pt!==hn),it=sa(O,C,Pe.orchestration_model||hn).filter(pt=>pt!==hn),at=K?(T?.presets||[]).find(pt=>pt.id===K):null,Ue=at?Fc(Oe(),_n(at.settings)?at.settings:{}):null,tt=J&&typeof J.slots=="number"?J.slots:Ci+1,kt=J&&typeof J.serial_lane_count=="number"?J.serial_lane_count:Ci,Ge=N()?.supported===!0,Tt=Fe(),Xe=ia("workflow_mode",ko,i,N(),O);return c`
      ${l.length>0?c`<div class="settings-dialog__banner" role="alert">
            워크스페이스 기본값을 일부 읽지 못했습니다 —
            ${l.join(", ")}
          </div>`:""}
      ${Tt?c`<div
            class="settings-dialog__banner"
            data-account-warning
            role="alert"
          >
            ${Tt}
          </div>`:""}
      ${Ge?"":c`<div
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
                .value=${Ar(K)}
                @change=${pt=>{K=String(pt.target.value),ze()}}
              >
                <option value="" ?selected=${K===""}>
                  실행 프리셋…
                </option>
                ${(T?.presets||[]).map(pt=>c`<option
                      value=${pt.id}
                      ?selected=${pt.id===K}
                    >
                      ${pt.name}
                    </option>`)}
              </select>
              <button
                type="button"
                class="settings-dialog__btn settings-dialog__btn--primary"
                data-preset-apply-global
                ?disabled=${!Ue||Ue.rows.length===0}
                @click=${te}
              >
                적용
              </button>
              <input
                type="text"
                class="settings-dialog__preset-name"
                placeholder=${K?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                aria-label="프리셋 이름"
                .value=${Ar(ie)}
                @input=${pt=>{ie=String(pt.target.value)}}
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
            ${Ue?zt(Ue):""}

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">오케스트레이션</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">런타임</span>
                <span class="settings-dialog__controls">
                  <select
                    aria-label="런타임"
                    data-key="orchestration_runtime_filter"
                    .value=${Ar(C||tn)}
                    @change=${pt=>{let jt=String(pt.target.value);se(jt===tn?null:jt)}}
                  >
                    <option value=${tn} ?selected=${!C}>
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
              ${be("orchestration_model","\uBAA8\uB378",Ye,de,Pe)}
              ${be("orchestration_effort","effort",it,de,Pe)}
              ${be("orchestration_speed","\uC18D\uB3C4",vo,de,Pe)}
            </div>

            <div class="settings-dialog__group" data-exec-accounts-group>
              <div class="settings-dialog__group-title">실행 계정</div>
              ${Ne("claude_account","Claude","claude")}
              ${Ne("codex_account","Codex","codex")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">워크플로우</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">모드</span>
                <span class="settings-dialog__controls">
                  <span class="settings-dialog__seg" role="group">
                    <button
                      type="button"
                      data-mode=${tn}
                      aria-pressed=${String(!i.workflow_mode)}
                      @click=${()=>ge("workflow_mode",tn)}
                    >
                      ${Xe.unset_label}
                    </button>
                    ${i.workflow_mode?"":c`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${ko.map(pt=>c`<button
                          type="button"
                          data-mode=${pt}
                          aria-pressed=${String(i.workflow_mode===pt)}
                          @click=${()=>ge("workflow_mode",pt)}
                        >
                          ${pt}
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
              ${dt("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",wo,"spec_review_effort")}
              ${dt("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",Os,"plan_review_effort")}
              ${dt("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",wo,"impl_review_effort")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${be("impl_runtime","\uC704\uC784 \uB300\uC0C1",Rs,ge,i)}
              ${be("impl_model","\uBAA8\uB378",Kr(O,re),ge,i)}
              ${be("impl_effort","effort",Yr(O,re,he),ge,i)}
              ${be("impl_speed","\uC18D\uB3C4",vo,ge,i)}
              ${be("quick_fix_impl_model","quick_fix \uAD6C\uD604 \uBAA8\uB378",qe,ge,i,!1,{...i,...Pe})}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                자동화
                <span class="settings-dialog__hint"
                  >이 레포의 워커 큐가 스스로 진행하는 범위</span
                >
              </div>
              ${At("auto_advance","\uC790\uB3D9\uD654","\uC2AC\uB86F\uC774 \uBE44\uBA74 \uB300\uAE30 \uC55E \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4",J?.auto_advance===!0)}
              ${At("auto_merge","\uBA38\uC9C0","\uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4",J?.auto_merge===!0)}
              ${Mt("slots","\uB3D9\uC2DC \uC2E4\uD589",tt,pt=>ae(pt))}
              ${Mt("serial-lane-count","\uC9C1\uB82C \uB808\uC778",kt,pt=>Ee(pt))}
            </div>
            ${x()}
          `}
    `}function ze(){z||lt(_t(),e)}return{load(){j={};let O=[ce(),Se()];return $||O.push(Z()),Promise.all(O).then(()=>{})},render:ze,sessionDraft:()=>({...i}),destroy(){z=!0,lt(c``,e)}}}function Oi(e){return c`<svg
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
  </svg>`}function ip(){return Oi(po`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function ap(){return Oi(po`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function lp(){return Oi(po`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function cp(){return Oi(po`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function up(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function dp(e){let t=(Array.isArray(e)?e:[]).map(l=>l&&l.usage).filter(l=>l&&typeof l=="object"&&"providers"in l);if(t.length>0)return en(Ts(t));let n={};for(let l of Pn)n[l]=0;let r=!1,o=0,s=0,i=0;for(let l of Array.isArray(e)?e:[]){let a=l&&l.usage;if(a&&typeof a=="object"){let u=!1;for(let d of Pn){let p=a[d];typeof p=="number"&&Number.isFinite(p)&&(n[d]+=p,r=!0,u=!0)}if(u){s+=1;let d=a.total_cost_usd;typeof d=="number"&&Number.isFinite(d)&&(o+=d,i+=1)}}}return s>0&&i===s&&(n.total_cost_usd=o),r?Wn(n):null}function Cn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function ll(e,t){let n=Cn(e?.counts)?e.counts:null,r=n?n[t]:null;return typeof r=="number"&&Number.isFinite(r)?r:0}function Kb(e,t){if(!Cn(t))return e;let n={...e};for(let[r,o]of Object.entries(t))o!==void 0&&(n[r]=o);return n}function Yb(e){if(!Cn(e)||!Cn(e.execution_defaults)||!Cn(e.runner_catalog)||!Cn(e.session_defaults))return null;let t={...e.session_defaults};for(let i of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[i]=="string"&&e[i].length>0&&(t[i]=e[i]);let n=mn({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),r=$n(e.runner_catalog,n.orchestration_model.value??""),o=Vr(n,e.runner_catalog),s=vr(n,r);return o===null&&s===null?null:{orchestration:o,worker:s}}function pp(e,t){let n=t.notify||(S=>pe(S,"error",4e3)),r=document.createElement("div");r.className="mon2-deck__main",e.appendChild(r);let o=document.createElement("div");o.className="mon2-deck__panel",o.hidden=!0;let s=document.createElement("div");s.className="mon2-deck__panel-hd";let i=document.createElement("span");i.className="mon2-deck__panel-title";let l=document.createElement("button");l.type="button",l.className="mon2-deck__panel-close",l.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),l.textContent="\u2715",s.append(i,l);let a=document.createElement("div");a.className="mon2-deck__panel-body",o.append(s,a),e.appendChild(o);let u=null,d=null,p=null,b=new Map;function m(){let S=t.workspacesState?t.workspacesState():[];return Array.isArray(S)?S.filter(Z=>Cn(Z)):[]}function $(S){return m().find(Z=>Z.root_dir===S)||null}function C(S){return Kb($(S),b.get(S))}function j(){for(let S of m()){let Z=b.get(S.root_dir);Z&&typeof Z.revision=="number"&&typeof S.revision=="number"&&S.revision>=Z.revision&&b.delete(S.root_dir)}}async function K(S,Z,Te){let _e=t.transport,xe=C(Z);if(!(!_e||!Cn(xe))){try{let ge=await _e(S,{...Te,root_dir:Z,expected_revision:xe.revision});if(Cn(ge?.queue)&&b.set(Z,ge.queue),ge&&ge.conflict){let je=Cn(ge.queue)&&typeof ge.queue.revision=="number"?ge.queue.revision:C(Z)?.revision;ge=await _e(S,{...Te,root_dir:Z,expected_revision:je}),Cn(ge?.queue)&&b.set(Z,ge.queue)}}catch(ge){n(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${ge instanceof Error?ge.message:String(ge)}`)}q()}}function ie(S){u!==S&&(u=S,t.onFocusChange?.(u),q())}function ee(S){ie(u===S?null:S)}function F(S){if(d===S){L();return}P(),d=S;let Z=$(S);i.textContent=`${Z?.name||S} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,o.hidden=!1,p=Ri(a,{root_dir:S,queue:()=>C(S),transport:t.transport,implPresetStore:t.implPresetStore,notify:n,onQueueAdopt:Te=>{b.set(S,Te),q()}}),p.load(),q()}function P(){p?.destroy(),p=null}function L(S){P(),d=null,o.hidden=!0,i.textContent="",S!==!0&&q()}let z=()=>L();l.addEventListener("click",z);function V(S){S.key==="Escape"&&u!==null&&ie(null)}document.addEventListener("keydown",V);function ne(S,Z){let Te=Math.max(Z,S,1);return c`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${Z}\uAC1C \uC911 ${S}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:Te},(_e,xe)=>xe<S?c`<i class="mon2-deck__slot is-run"></i>`:c`<i class="mon2-deck__slot"></i>`)}
    </span>`}function N(S){let Z=S.auto_advance===!0,Te=S.auto_merge===!0;return c`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${Z?" is-on":""}`}
        data-act="auto"
        aria-pressed=${Z?"true":"false"}
        aria-label=${`${S.name} \uC790\uB3D9\uD654`}
        title=${Z?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${Z?ap():ip()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${Te?" is-on":""}`}
        data-act="merge"
        aria-pressed=${Te?"true":"false"}
        aria-label=${`${S.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${Te?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${lp()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__gear${d===S.root_dir?" is-on":""}`}
        data-act="gear"
        aria-expanded=${d===S.root_dir?"true":"false"}
        aria-label=${`${S.name} \uC2E4\uD589 \uC124\uC815`}
        title="이 레포의 실행 설정"
      >
        ${cp()}
      </button>`}function Q(S){let Z=Yb(S);return Z?c`<div class="mon2-deck__chips">
      ${Z.orchestration?c`<span class="mon2-deck__chip" title=${Z.orchestration.title}
            >오케 ${Z.orchestration.text}</span
          >`:""}
      ${Z.worker?c`<span class="mon2-deck__chip" title=${Z.worker.title}
            >워커 ${Z.worker.text}</span
          >`:""}
    </div>`:""}function G(S){let Z=[];for(let[Te,_e]of[["queue","\uB300\uAE30"],["pr_wait","PR"],["session_active","\uC138\uC158"]]){let xe=ll(S,Te);xe>0&&Z.push(`${_e} ${xe}`)}return Z.join(" \xB7 ")}function X(S){let Z=ll(S,"running"),Te=typeof S.slots=="number"?S.slots:1;return c`<div
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
          title=${`\uC2AC\uB86F ${Te}\uAC1C \uC911 ${Z}\uAC1C \uC2E4\uD589 \uC911`}
        >
          <span class="mon2-deck__load-n">${Z}/${Te}</span>
          ${ne(Z,Te)}
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
        <span class="mon2-deck__counts">${G(S)}</span>
        ${Q(S)}
      </div>
    </div>`}function Re(S){let Z=t.doneItems?t.doneItems():[],Te=t.rangeLabel?t.rangeLabel():"",_e=dp(Array.isArray(Z)?Z:[]),xe=ge=>S.reduce((je,ft)=>je+ll(ft,ge),0);return c`<div class="mon2-deck__bar">
      <span
        class="mon2-deck__total-counts"
        title=${`visible \uB808\uD3EC ${S.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${Te}`}
        >실행 ${xe("running")} · 대기 ${xe("queue")} · PR
        ${xe("pr_wait")}${xe("session_active")>0?` \xB7 \uC138\uC158 ${xe("session_active")}`:""}
        · ${Te} 완료
        ${Array.isArray(Z)?Z.length:0}</span
      >
      ${_e===null?"":c`<span class="mon2-deck__total-tokens">
            ${typeof _e=="string"?c`<span
                  class="mon2-deck__tok"
                  title=${up(Te)}
                  >${_e}</span
                >`:_e.map(ge=>c`<span
                      class="mon2-deck__tok"
                      data-provider=${ge.provider}
                      title=${ge.tooltip}
                      >${ge.label}</span
                    >`)}
          </span>`}
    </div>`}function we(){let S=m();return S.length===0?"":c`${Re(S)}
      <div class="mon2-deck__strip">
        ${S.map(Z=>X(Z))}
      </div>`}function ce(){u!==null&&!$(u)&&(u=null,t.onFocusChange?.(null))}function q(){j(),ce(),d!==null&&!$(d)&&L(!0),lt(we(),r),p?.render()}function $e(S){let Z=S.target;if(!Z||typeof Z.closest!="function")return;let Te=Z.closest("[data-root-dir]");if(!Te)return;let _e=Te.getAttribute("data-root-dir")||"",xe=Z.closest("[data-act]")?.getAttribute("data-act");if(xe==="worker"){t.gotoWorkerTab?.(_e);return}if(xe==="auto"){K("worker-automation-toggle",_e,{on:C(_e)?.auto_advance!==!0});return}if(xe==="merge"){K("worker-merge-auto-toggle",_e,{on:C(_e)?.auto_merge!==!0});return}if(xe==="gear"){F(_e);return}ee(_e)}function Se(S){if(S.key!=="Enter"&&S.key!==" ")return;let Z=S.target;if(!Z||typeof Z.closest!="function")return;let Te=Z.closest('[data-root-dir][role="button"]');!Te||Te!==Z||(S.preventDefault(),ee(Te.getAttribute("data-root-dir")||""))}return r.addEventListener("click",$e),r.addEventListener("keydown",Se),{render:q,focusRoot:()=>u,panelRoot:()=>d,destroy(){document.removeEventListener("keydown",V),r.removeEventListener("click",$e),r.removeEventListener("keydown",Se),l.removeEventListener("click",z),P(),lt(c``,r),e.replaceChildren()}}}var fp="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C",Vb=1e4;function _p(e){return typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)?e.lane:e.lane==="running"&&e.serial_lane_id?e.serial_lane_id:null}function mp(e){return e.lane==="runnable"||e.lane==="queue"||typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)}var yp="bdui.monitor.done-range",vp="bdui.monitor.running_sort",kp="bdui.monitor.candidate_sort",wp="beads-ui.monitor.candidate-filter",$p="beads-ui.monitor.sections";function Qb(){try{let e=window.localStorage.getItem(wp);if(!e)return{...Zr};let t=JSON.parse(e);return!t||typeof t!="object"?{...Zr}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:Zr.show_blocked,spec:ka.some(n=>n.value===t.spec)?t.spec:"all"}}catch{return{...Zr}}}function gp(e){try{window.localStorage.setItem(wp,JSON.stringify({show_blocked:e.show_blocked,spec:e.spec}))}catch{}}function Xb(){try{let e=window.localStorage.getItem(kp);return Oo.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function Zb(e){try{window.localStorage.setItem(kp,e)}catch{}}function Jb(){try{let e=window.localStorage.getItem($p);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function ey(e){try{window.localStorage.setItem($p,JSON.stringify(e))}catch{}}function ty(){try{let e=window.localStorage.getItem(yp);return e===null?"today":In(e)}catch{return"today"}}function ny(e){try{window.localStorage.setItem(yp,e)}catch{}}function ry(){try{return window.localStorage.getItem(vp)==="repo"?"repo":"started"}catch{return"started"}}function oy(e){try{window.localStorage.setItem(vp,e)}catch{}}var xp="tab:monitor:pipeline",sy=1e3,hp=[{lane:"runnable",pane:"candidate",title:"\uD6C4\uBCF4",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589 \uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],iy=["queue","runnable","done"],bp="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function ay(e){return e>=1&&e<=bp.length?bp[e-1]:`(${e})`}function Ap(e,t){let n=It("views:monitor"),r=t.gotoIssue,o=t.pipelineStore,s=t.transport,i=t.getWorkspacePath,l=t.openDoc,a=t.switchWorkspace,u=t.router,d=t.now||(()=>Date.now()),p=t.confirm||(h=>typeof globalThis.confirm!="function"||globalThis.confirm(h)),b=ty(),m=ry(),$=Qb(),C=Xb(),j=Jb(),K=xi("beads-ui.monitor.lane-collapsed"),ie=!1,ee=null,F=null,P=null,L=null,z=null,V=null,ne=null,N=null,Q=null;function G(h){return Q===null&&(Q=U()),Tu(h,Q)}function X(h,g){Re(),!(g<=0)&&(ne={lane_id:h,corrected:g},N=setTimeout(()=>{N=null,ne=null,Xe()},Vb))}function Re(){N!==null&&(clearTimeout(N),N=null),ne=null}function we(){let h=Lr.find(g=>g.value===b);return h?h.label:""}let ce=document.createElement("div");ce.className="mon",e.appendChild(ce);let q=document.createElement("div");q.className="worker-drawer-overlay",q.hidden=!0;let $e=document.createElement("div");$e.className="worker-drawer-overlay__backdrop";let Se=document.createElement("div");Se.className="worker-drawer-host mon2-drawer",q.append($e,Se),e.appendChild(q);let S=ar(null,null),Z=new Map,Te=new Map,_e=null,xe=null,ge=null,je=no(Se,{transport:s,sessionLogStore:t.sessionLogStore,onClose:()=>{F=null,q.hidden=!0,Xe()}}),ft=Si({transport:s,console_el:ce,getLanes:()=>S,getWorkspaces:()=>o&&o.get?o.get():null,getCrossLanes:Ft,reproject:h=>({lanes:Tt(h),raw_lanes:h}),onCorrection:X,showToast:pe,requestRender:()=>Xe(),adoptQueue:(h,g)=>{Te.set(h,g)},onDragBegin:()=>{P=null},candidate_drop:!0}),{applyDrop:Le,dropModel:U,runPlanned:de,sendQueueCas:se}=ft;async function ae(h,g,R,D,_=!0){if(!s||!R)return null;let y=await s(h,{...g,root_dir:R,expected_revision:D});if(y&&y.conflict&&_){y.queue&&Te.set(R,y.queue);let Y=y.queue&&typeof y.queue.revision=="number"?y.queue.revision:D;y=await s(h,{...g,root_dir:R,expected_revision:Y})}return y&&y.queue&&R&&Te.set(R,y.queue),y}function Ee(h,g){let R=Te.get(h),D=o&&o.get?o.get():null,_=(Array.isArray(D)?D:[]).find(Y=>Y?.root_dir===h);return(R||_)?.merge_queue?.find(Y=>Y.bead_id===g)?.continuation_action}async function me(h,g,R,D){let _=await ae(h,g,R,D),y=Te.get(R)?.revision??_?.queue?.revision??D;return Un(_,(Y,le)=>ae(h,{...g,continuation:Y,decision_token:le},R,y,!1),{refresh:Y=>ae(h,g,R,Y?.queue?.revision??Te.get(R)?.revision??y,!1)})}async function Oe(h,g,R,D){let _=await Un({continuation_mismatch:D},(Y,le)=>ae("worker-merge-queue-add",{bead_id:g,continuation:Y,decision_token:le},h,R,!1)),y=_?.queue?.merge_queue?.find(Y=>Y.bead_id===g)?.continuation_action;_?.applied!==!0&&y?.continuation===null&&y.mismatch&&await Oe(h,g,_.queue.revision,y.mismatch)}async function Qe(h,g,R){let D=await ae("worker-discard",h,g,R);if(D&&D.discarded===!0){pe(Bs(D),"success",5e3);return}if(D&&D.reason){pe(`\uD3D0\uAE30 \uC2E4\uD328: ${D.reason}`,"error");return}if(D&&D.accepted&&D.pending==="merged_revert"){pe("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(D&&D.accepted){pe(`\uD3D0\uAE30 \uC9C4\uD589: ${D.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}D&&!D.conflict&&pe("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function He(h,g,R){return!s||!R?null:await s(h,{...g,root_dir:R})}async function Be(){let h=new Map;for(let g of S.pr_wait)h.has(g.root_dir)||h.set(g.root_dir,g.expected_revision);for(let[g,R]of h)await ae("worker-merge-queue-add-all",{},g,R)}function te(h){let g=j[h];return!!(g&&g.runnable===!0)}function H(h){let g={...j[h]||{}};g.runnable=!g.runnable,j={...j,[h]:g},ey(j),Xe()}function Ae(h){K.toggle(h),Xe()}function ut(h){K.toggleArea(h),Xe()}function x(h){let g=S.queue_groups.find(R=>R.root_dir===h);if(!g)return null;for(let R=0;R<g.serial_lane_count;R+=1){let D=`s${R+1}`,_=g.sublanes.serial.find(y=>y.id===D);if(!_||_.raw_length===0&&_.occupied_by.length===0)return D}return null}function W(h,g){let R=S.queue_groups.find(_=>_.root_dir===h),D=R?R.sublanes.serial.find(_=>_.id===g):void 0;return D?D.raw_length:0}function be(h,g){let R=Z.get(h),D=Z.get(g);if(!R||!D)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let _=_p(R),y=_p(D);if(_!==null&&_===y&&R.root_dir===D.root_dir)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let Y=mp(R),le=mp(D);if(Y&&y!==null){let Me=y;return{kind:"ops",title:`${Me} \uB05D\uC5D0 ${h}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:D.root_dir,ops:[{bead_id:h,lane:Me,index:W(D.root_dir,Me)}]}}if(_!==null&&le&&y===null){let Me=_;return{kind:"ops",title:`${Me} \uB05D\uC5D0 ${g}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:R.root_dir,ops:[{bead_id:g,lane:Me,index:W(R.root_dir,Me)}]}}if(Y&&_===null&&le&&y===null){let Me=x(R.root_dir);return Me===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 Worker \uD0ED\uC5D0\uC11C \uB808\uC778 \uC218 \uC870\uC808"}:{kind:"ops",title:`${Me} \uB808\uC778\uC5D0 ${g} \u2192 ${h} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:R.root_dir,ops:[{bead_id:g,lane:Me,index:0},{bead_id:h,lane:Me,index:1}]}}return!Y&&!le?{kind:"note",text:"\uB458 \uB2E4 \uC774\uBBF8 \uCD9C\uBC1C \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:Y?{kind:"note",text:`${Zo(D.lane)} \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}:{kind:"note",text:`${Zo(R.lane)} \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}}function Ie(h,g){let R=be(h,g.id);return{id:g.id,title:g.title,location_label:g.location_label,prefixes:g.prefixes,action:R.kind==="note"?{kind:"note",text:R.text}:R.kind==="disabled"?{kind:"disabled",label:fp,title:R.title}:{kind:"place",label:fp,title:R.title}}}function Ne(h,g){if(!L||L.bead_id!==h)return null;let R=L.counterpart_id,D=g.filter(_=>_.id===R);return D.length===0?null:{rows:D.map(_=>Ie(h,_))}}function Fe(h){let g=h.dependency_chips||null,R=h.overlap_chips||[],D=h.scope_state==="missing",_=h.cross_lane_chip,y=h.armed_lane_chip;if(!g&&R.length===0&&!D&&!_&&!y)return null;let Y=Ne(h.id,R);return{...g||{},...R.length>0?{overlaps:R}:{},...D?{scope_missing:!0}:{},..._?{cross_lane:{lane_id:_.lane_id,label:_.label}}:{},...y?{armed_lane:y}:{},...Y?{popover:Y}:{}}}function dt(h){let g=Fe(h);return g?{...h,dependency_chips:g}:h}async function At(h,g){let R=be(h,g);if(L=null,R.kind!=="ops"){Xe();return}let D=Zt(R.root_dir,R.ops[0].bead_id);for(let _ of R.ops){let y=await Mt(_,R.root_dir,D);if(y===null)break;D=y}Xe()}async function Mt(h,g,R){try{let D=await ae("worker-queue-place",h,g,R,!1);if(D&&D.conflict)return pe("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!D||D.applied!==!0)return pe(D&&typeof D.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${D.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let _=D.queue?D.queue.revision:void 0;return typeof _!="number"?(pe("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):_}catch(D){return pe(Qt(D),"error"),null}}function zt(h){let g=te(h.root_dir);return c`<header class="mon2-sec__hd">
      <button
        type="button"
        class="mon2-sec__toggle"
        data-root-dir=${h.root_dir}
        data-section="runnable"
        aria-expanded=${g?"false":"true"}
        aria-label=${`${h.name} \uC139\uC158 ${g?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
      >
        ${g?"\u25B8":"\u25BE"}
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
    </header>`}function Ot(h,g){return c`<div
      class="mon2-item"
      data-bead-id=${h.id}
      data-drag-kind="candidate"
      data-root-dir=${h.root_dir}
    >
      ${g}
    </div>`}function _t(h){if(P!==h.id)return null;let g=S.queue_groups.find(y=>y.root_dir===h.root_dir),R=h.place_lanes||[],D=S.cross_lanes_revision!==null,_=[{id:"parallel",label:"\uBCD1\uB82C",count:h.place_index??0}];for(let y of S.chain_lanes)_.push({id:`lane:${y.lane_id}`,label:`\uC5F0\uACB0 ${y.number} (${y.draft?"draft":"\uD655\uC815"}) \uB05D\uC5D0`,count:y.rows.length,group:"\uC5F0\uACB0 \uB808\uC778",disabled:!D});_.push({id:"new-lane",label:"+ \uC0C8 \uC5F0\uACB0 \uB808\uC778",group:"\uC5F0\uACB0 \uB808\uC778",disabled:!D,title:D?"\uC774 \uC774\uC288\uB9CC \uB4E0 draft \uB808\uC778\uC744 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"});for(let y of R)_.push({id:`serial:${y.id}`,label:`\uC9C1\uB82C ${Number(y.id.slice(1))}`,count:y.length,group:`${g?g.name:""} \uC9C1\uB82C`});return{bead_id:h.id,lanes:_}}function ze(h){return Ot(h,c`${ma(dt(h),_t(h),{exec_chips_mode:"pinned_only",onOpenDoc:l?(g,R)=>l(R,h.root_dir):void 0})}`)}function O(){return S.runnable_flat?c`<div class="mon2-flat" data-drop="candidate">
        ${S.runnable.map(h=>ze(h))}
      </div>`:c`${S.runnable_sections.map(h=>{let g=te(h.root_dir);return c`<section
        class="mon2-sec${g?" is-collapsed":""}"
        data-root-dir=${h.root_dir}
        data-section="runnable"
      >
        ${zt({root_dir:h.root_dir,name:h.name,count:h.items.length})}
        ${g?"":c`<div
              class="mon2-sec__body"
              data-lane="candidate"
              data-drop="candidate"
            >
              ${h.items.map(R=>ze(R))}
            </div>`}
      </section>`})}`}function re(h,g=!1){return c`<span class="worker-mini__rowops">
      ${g?c`<button
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
    </span>`}function he(h,g){return c`<div
      class="mon2-item"
      data-bead-id=${h.id}
      data-drag-kind="parallel"
      data-root-dir=${h.root_dir}
      data-row-index=${g}
      data-queue-index=${String(h.queue_index??0)}
    >
      ${xn(dt(h),{actions:re(h,!0)})}
    </div>`}function T(h,g,R,D){return c`<div
      class="mon2-crow${g.fixed?" mon2-crow--fixed":""}"
      draggable=${g.draggable?"true":"false"}
      data-bead-id=${g.id}
      data-drag-kind="chain"
      data-root-dir=${g.root_dir}
      data-lane-id=${h.lane_id}
      data-row-index=${R}
      data-queue-index=${typeof g.queue_index=="number"?String(g.queue_index):""}
    >
      <span class="mon2-crow__seq" aria-hidden="true"
        >${ay(g.seq)}</span
      >
      ${g.workspace_name?c`<span class="worker-mini__repo" title=${g.root_dir}
            >${g.workspace_name}</span
          >`:""}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${g.id}</span>
      <span class="mon2-crow__title">${g.title}</span>
      ${g.mismatch?c`<span
            class="mon2-crow__mismatch"
            title="레인 순서가 주장하는 선행이 bd 의존에 없습니다 — 재적용으로 복구합니다"
            >⚠ 의존 없음</span
          >`:""}
      ${D.includes(g.id)?c`<span
            class="mon2-crow__mismatch"
            title="이미 실행된 뒤 의존이 바뀌었습니다 — 이 행은 움직일 수 없어 교정하지 않습니다"
            >⚠ 의존 순서와 다름</span
          >`:""}
      <span class="mon2-crow__where" title=${g.location_title}
        >${g.location_label}</span
      >
      <button
        type="button"
        class="mon2-crow__detach"
        data-bead-id=${g.id}
        title="연결에서 빼고 앞뒤를 이어 붙입니다"
        aria-label="연결에서 빼기"
      >
        ✕
      </button>
    </div>`}function J(h){let g=S.cross_lanes_revision!==null,R=G(h.lane_id),D=R?.held===!0,_=R?.cycle===!0,y=R?R.mismatched:[],Y=ne&&ne.lane_id===h.lane_id?ne.corrected:0;return c`<div class="mon2-clane" data-lane-id=${h.lane_id}>
      <header class="mon2-clane__hd">
        <span class="mon2-clane__name">${h.label}</span>
        <span class="mon2-clane__count">${h.rows.length}</span>
        <span class="mon2-clane__badge mon2-clane__badge--${h.state}"
          >${h.badge}</span
        >
        ${Y>0?c`<span
              class="mon2-clane__corrected"
              title="기존 blocks 의존이 드롭 순서를 이깁니다 — 그 순서로 다시 놓았습니다"
              >의존에 맞춰 ${Y}건 자동 교정</span
            >`:""}
        ${_?c`<span
              class="mon2-clane__cycle"
              title="멤버들의 blocks 의존이 순환합니다 — 어느 순서도 의존을 만족시키지 못합니다"
              >⛔ 의존 사이클 — 자동 교정 불가</span
            >`:""}
        ${D?c`<span
              class="mon2-clane__hold"
              title="멤버 한 명의 의존 자료가 이 스냅샷에 아직 없습니다 — 다음 스냅샷이 채우면 교정합니다"
              >${ni}</span
            >`:""}
        ${h.draft?c`<button
              type="button"
              class="mon2-clane__confirm"
              data-lane-id=${h.lane_id}
              ?disabled=${!g||!h.can_confirm||D}
              title=${D?ni:h.can_confirm?"\uC778\uC811 \uC758\uC874\uC744 \uAC78\uACE0 \uBBF8\uC801\uC7AC \uBA64\uBC84\uB97C \uAC01\uC790 \uB808\uD3EC \uBCD1\uB82C \uD050 \uB05D\uC5D0 \uC62C\uB9BD\uB2C8\uB2E4":"\uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD655\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4"}
            >
              확정
            </button>`:""}
        ${h.run_label!==null?c`<button
              type="button"
              class="mon2-clane__run"
              data-lane-id=${h.lane_id}
              ?disabled=${!g}
              title="이 레인 멤버만 발차합니다 — 레포 자동 진행은 켜지 않습니다"
            >
              ${h.run_label}
            </button>`:""}
        ${h.state==="confirmed"&&h.has_mismatch?c`<button
              type="button"
              class="mon2-clane__reapply"
              data-lane-id=${h.lane_id}
              ?disabled=${!g}
              title="빠진 인접 의존을 다시 걸고 미적재 멤버를 다시 올립니다"
            >
              재적용
            </button>`:""}
        ${h.can_stop?c`<button
              type="button"
              class="mon2-clane__stop"
              data-lane-id=${h.lane_id}
              ?disabled=${!g}
              title="남은 멤버의 발차만 멈춥니다 — 도는 세션과 머지 큐 항목은 끝까지 갑니다"
            >
              ⏸ 정지
            </button>`:""}
        <button
          type="button"
          class="mon2-clane__remove"
          data-lane-id=${h.lane_id}
          ?disabled=${!g}
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
            </div>`:h.rows.map((le,Me)=>T(h,le,Me,y))}
      </div>
    </div>`}function Pe(h,g,R){return c`<div
      class="mon2-item"
      data-bead-id=${g.id}
      data-drag-kind="repo-serial"
      data-root-dir=${g.root_dir}
      data-lane-id=${h.id}
      data-row-index=${R}
      data-queue-index=${String(g.queue_index??0)}
    >
      ${xn(dt(g),{actions:re(g)})}
    </div>`}function Ye(h){if(h.length===0)return"";let g=h.length-1;return`${h[0].id} \uC810\uC720${g>0?` +${g}`:""}`}function qe(h){return c`<div
      class="mon2-item mon2-item--ghost"
      data-bead-id=${h.id}
    >
      ${xn({id:h.id,title:h.title,lane:"running",draggable:!1,ghost:!0,badges:[h.badge]})}
    </div>`}function it(h,g){let R=g.occupants,D=g.cross_wait_peers||[];return{id:g.id,pane_id:"",title:`${h.name} \xB7 \uC9C1\uB82C ${g.index+1}`,rows:[...R.map(_=>qe(_)),...g.items.map((_,y)=>Pe(g,_,y))],count:g.items.length,empty:g.empty===!0,...R.length>0?{badge:c`<span
              class="mon2-lane__occupant"
              title=${R.map(_=>`${_.id} \u2014 ${_.badge}`).join(`
`)}
              >${Ye(R)}</span
            >`,held:!0}:{},cycle:g.cycle,header_control:c`<button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${h.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>`,...D.length>0?{after:c`${D.map(_=>c`<div class="mon2-lane__cross-wait">
                  ⚠ 상호 정지 — ${_.workspace_name}·${_.lane}과 교차 대기
                </div>`)}`}:{}}}function at(){let h=S.cross_lanes_revision!==null,g=S.chain_lanes.some(R=>R.draft&&R.rows.length===0);return Ys({parallel:{rows:S.parallel_rows.map((R,D)=>he(R,D)),count:S.parallel_rows.length,collapsed:K.isAreaCollapsed("parallel"),drop:{drop:"parallel"}},serial:{lanes:S.queue_groups.flatMap(R=>R.sublanes.serial.map(D=>({...it(R,D),drop:{drop:"repo-serial",root_dir:R.root_dir,lane_id:D.id,lane_length:String(D.raw_length)}}))),collapsed:K.isAreaCollapsed("serial"),extra_panes:S.chain_lanes.map(R=>J(R)),header_control:c`<button
          type="button"
          class="mon2-newlane"
          ?disabled=${g||!h}
          title=${h?g?"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC774 \uC774\uBBF8 \uC788\uC2B5\uB2C8\uB2E4":"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC744 \uD558\uB098 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
        >
          + 연결 레인
        </button>`,...S.cross_lanes_unreadable?{notice:c`<div class="mon2-clane__unreadable">
                연결 레인 저장소를 읽을 수 없음
              </div>`}:{}}})}function Ue(h){return c`<div class="worker-rungrid">
      ${S.running.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:S.running.map(g=>al({bead_id:g.id,attempt_id:g.attempt_id||"",title:g.title,runner:g.runner??null,model:g.model??null,effort:g.effort??null,speed:g.speed??null,started_at:g.started_at??null,kind:g.kind,...g.kind==="session"?{updated_at:g.updated_at,session_refs:g.session_refs||[]}:{},workflow:g.workflow||null,resumed_from:g.resumed_from??null,continuation_mode:g.continuation_mode??null,paused:g.run_state==="paused",failed:g.run_state==="failed",parked:g.run_state==="parked",retry_wait:g.run_state==="retry_wait",retry:g.retry||null,status:g.status,status_label:g.run_state==="failed"?"\uC2E4\uD328":g.run_state==="parked"?"\uC138\uC158 \uB300\uAE30":g.run_state==="retry_wait"?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":void 0,can_pause:g.can_pause!==!1,exec_chips:g.exec_chips||null,usage:g.usage||null,discard:g.discard,failure:g.failure?{...g.failure,open:z===g.attempt_id}:null},h,F,{monitor:{repo:g.workspace_name,root_dir:g.root_dir,serial_lane_id:g.serial_lane_id,last_activity:g.last_activity||null,legs:g.legs||[],dependency_chips:Fe(g)}}))}
    </div>`}function tt(h){let g={runnable:S.runnable,queue:S.queue,running:S.running,pr_wait:S.pr_wait,done:S.done},R=D=>{let _=g[D.lane],y=D.lane==="runnable"?S.runnable_flat?_.length>0?O():void 0:S.runnable_sections.length>0?O():void 0:D.lane==="queue"?S.queue_groups.length>0||S.chain_lanes.length>0||S.parallel_rows.length>0||S.cross_lanes_unreadable?at():void 0:D.lane==="running"?Ue(h):_.length>0?c`${_.map(Y=>xn(dt(Y)))}`:void 0;return Dn({id:`monitor-${D.lane}`,lane:D.pane,title:D.title,items:_,count:_.length,src:D.lane==="runnable",empty:D.empty,body:y,live:D.lane==="running"&&_.length>0,collapsible:!0,collapsed:K.isCollapsed(D.pane),controls:D.lane==="runnable"?kt():void 0,header_control:Ge(D.lane,_.length)})};if(ie){let D=iy.map(_=>hp.find(y=>y.lane===_)).filter(_=>_!==void 0);return c`<div class="mon2-deck"></div>
        <div class="worker-lanes-host">
          <div class="worker-lanes worker-lanes--mobile mon2-lanes">
            ${Vs({live:S.running.length>0,running_body:S.running.length>0?Ue(h):"",pr_wait_rows:S.pr_wait.map(_=>xn(dt(_))),count:S.running.length+S.pr_wait.length})}
            ${D.map(_=>R(_))}
          </div>
        </div>`}return c`<div class="mon2-deck"></div>
      <div class="worker-lanes-host">
        <div class="worker-lanes mon2-lanes">
          ${hp.map(D=>R(D))}
        </div>
      </div>`}function kt(){return c`<div class="worker-filter">
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
        ${ka.map(h=>c`<button
              type="button"
              class="mon-filter__spec worker-filter__chip${$.spec===h.value?" is-active":""}"
              data-spec=${h.value}
              aria-pressed=${$.spec===h.value?"true":"false"}
            >
              ${h.label}
            </button>`)}
        ${S.runnable_hidden.spec>0?c`<span class="worker-filter__hidden"
              >숨김 ${S.runnable_hidden.spec}</span
            >`:""}
      </div>
    </div>`}function Ge(h,g){return h==="runnable"?c`<select
        class="mon-candidate-sort worker-sort"
        aria-label="후보 정렬"
        title="후보 정렬"
        .value=${C}
      >
        ${Oo.map(R=>c`<option
              value=${R.value}
              ?selected=${C===R.value}
            >
              ${R.label}
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
      </select>`:h==="pr_wait"&&g>0?c`<button
        type="button"
        class="mon-lane-op mon-merge-all"
        title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
      >
        일괄 머지
      </button>`:h==="done"?c`<select
        class="mon-done-range worker-sort"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${b}
      >
        ${Lr.map(R=>c`<option value=${R.value} ?selected=${b===R.value}>
              ${R.label}
            </option>`)}
      </select>`:""}function Tt(h){let g=o&&o.get?o.get():null,R=o&&o.getWorkspacesState?o.getWorkspacesState():[],D=h===void 0?o&&o.crossLanes?o.crossLanes():void 0:h,_={done_since:hr(b,d()),running_sort:m,candidate_filter:$,candidate_sort:C};return D!==void 0&&(_.cross_lanes=D),ar(g,R,_)}function Xe(){let h=d();S=Tt(),Q=null,Z=new Map;for(let g of[...S.runnable,...S.queue,...S.running,...S.pr_wait,...S.done])!g.non_occupying&&!Z.has(g.id)&&Z.set(g.id,g);lt(tt(h),ce),jt()?.render(),pt(),Ct()}function pt(){let h=new Map;for(let g of S.queue_groups)h.set(g.root_dir,g.auto_advance);for(let g of Array.from(ce.querySelectorAll(".worker-wait__area--parallel .worker-mini__repo"))){let R=g.closest(".mon2-item")?.getAttribute("data-root-dir")||"",D=h.get(R);typeof D=="boolean"&&g.setAttribute("title",`${g.textContent||""} \xB7 ${D?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function jt(){if(ge)return ge;let h=ce.querySelector(".mon2-deck");return h?(ge=pp(h,{workspacesState:()=>o&&o.getWorkspacesState?o.getWorkspacesState():[],doneItems:()=>S.done,rangeLabel:we,transport:s,implPresetStore:t.execPresetStore,gotoWorkerTab:Bt,onFocusChange:g=>{V=g,Ct()}}),ge):null}function Ct(){ce.classList.toggle("has-focus",V!==null);for(let h of Array.from(ce.querySelectorAll(".mon2-sec[data-root-dir]")))h.classList.toggle("is-focus",V!==null&&h.getAttribute("data-root-dir")===V);for(let h of Array.from(ce.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let g=Z.get(h.getAttribute("data-bead-id")||"");h.classList.toggle("is-focus",V!==null&&!!g&&g.root_dir===V)}for(let h of Array.from(ce.querySelectorAll(".mon2-crow[data-root-dir]")))h.classList.toggle("is-focus",V!==null&&h.getAttribute("data-root-dir")===V)}function qt(h,g){let R=i?i():void 0;if(!g||!R||g===R||!a){r(h);return}a(g).then(()=>{r(h)}).catch(D=>{n("workspace switch for %s failed: %o",g,D)})}function Bt(h){if(!h)return;let g=i?i():void 0,R=()=>{try{u?.gotoView("worker")}catch(D){n("gotoView(worker) failed: %o",D)}};if(!a||g&&g===h){R();return}a(h).then(R).catch(D=>{n("workspace switch for %s failed: %o",h,D),pe("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function pn(h){sn(h).then(g=>{pe(g?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",g?"success":"error",1400)})}function Vt(h){let g=Z.get(h)||null;return{item:g,root_dir:g?g.root_dir:"",revision:g?g.expected_revision:0}}function Qt(h){if(typeof h=="string"&&h.length>0)return h;if(h&&typeof h=="object"){let g=h;if(typeof g.message=="string"&&g.message.length>0)return g.message;if(typeof g.error=="string"&&g.error.length>0)return g.error;if(g.error&&typeof g.error=="object"&&typeof g.error.message=="string")return g.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}async function Gt(h,g,R){if(h!=="dep-add")return;let D=S.chain_lanes.find(_=>_.rows.some(y=>y.id===g));!D||!D.rows.some(_=>_.id===R)||await de(_=>Mu(D.lane_id,_),"",[{type:h,a:g,b:R}])}function Ft(){return(o&&o.crossLanes?o.crossLanes():null)??null}function Zt(h,g){let R=Z.get(g);if(R&&R.root_dir===h)return R.expected_revision;let D=S.queue_groups.find(_=>_.root_dir===h);return D?D.revision:0}async function Ht(h,g){if(h==="run"){await rn(g);return}if(h==="stop"){await ve(g);return}if(h==="create"){await de(R=>Sa(null,R),"");return}if(h==="remove"){let R=Du(g,U());if(R!==null&&!p(R))return;await de(D=>Pu(g,D),"");return}await de(R=>h==="confirm"?Lu(g,R):Iu(g,R),"")}function wt(h){let g=new Map;for(let R of h.rows){let D=S.owner_of[R.id]||R.root_dir;typeof D!="string"||D.length===0||g.set(D,[...g.get(D)||[],R.id])}return g}async function rn(h){let g=S.chain_lanes.find(y=>y.lane_id===h);if(!g||S.cross_lanes_revision===null){Xe();return}Re();let R=new Map,D=new Map,_=wt(g);for(let y of g.rows){if(!y.unplaced)continue;let Y=S.owner_of[y.id]||y.root_dir;if(typeof Y!="string"||Y.length===0){pe(`${y.id}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC801\uC7AC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`,"error"),Xe();return}let le=D.get(Y)??0;if(await se("worker-queue-place",{bead_id:y.id,lane:"parallel",index:(S.parallel_raw_length[Y]??0)+le},Y,R,{bead_id:y.id})===null){Xe();return}D.set(Y,le+1)}for(let[y,Y]of _)if(await se("worker-queue-arm",{bead_ids:Y,lane_id:h},y,R,{bead_id:Y[0]})===null){pe("\uC77C\uBD80 \uB808\uD3EC\uC5D0\uC11C \uC9C4\uD589\uC744 \uCF1C\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589]\uC73C\uB85C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694","error"),Xe();return}Xe()}async function ve(h){let g=S.chain_lanes.find(D=>D.lane_id===h);if(!g||S.cross_lanes_revision===null){Xe();return}Re();let R=new Map;for(let[D,_]of wt(g))if(await se("worker-queue-disarm",{lane_id:h},D,R,{bead_id:_[0]})===null)break;Xe()}async function E(h,g){let{root_dir:R,revision:D}=Vt(h);if(R.length===0){Xe();return}await se("worker-queue-disarm",{bead_ids:[h],lane_id:g},R,new Map([[R,D]]),{bead_id:h}),Xe()}async function fe(h,g){let R=Z.get(h);if(!R){Xe();return}let D={kind:"candidate",bead_id:h,root_dir:R.root_dir};if(g==="new-lane"){await de(_=>Sa({bead_id:h,root_dir:R.root_dir},_),h);return}if(g.startsWith("lane:")){let _=g.slice(5);if(!S.chain_lanes.find(Y=>Y.lane_id===_)){Xe();return}await de(Y=>oi(D,{kind:"chain",lane_id:_,marker_index:(Y.cross_lanes.get(_)?.entries??[]).length},Y),h);return}if(g.startsWith("serial:")){let _=g.slice(7),y=(R.place_lanes||[]).find(Y=>Y.id===_);await Le(D,{kind:"repo-serial",root_dir:R.root_dir,lane_id:_,index:y?y.index:0});return}await Le(D,{kind:"parallel",marker_index:S.parallel_rows.length})}async function k(h,g){let R=S.parallel_rows,D=R.findIndex(ct=>ct.id===h);if(D<0)return;let _=R[D].root_dir,y=[];R.forEach((ct,Et)=>{ct.root_dir===_&&y.push(Et)});let Y=y.indexOf(D),le=y[Y+g];if(typeof le!="number")return;let Me=g===-1?le:y[Y+2]??Math.min(R.length,le+1);await Le({kind:"parallel",bead_id:h,root_dir:_,queue_index:R[D].queue_index??0},{kind:"parallel",marker_index:Me})}async function I(h){for(let g of S.chain_lanes){let R=g.rows.find(D=>D.id===h);if(R){await Le({kind:"chain",bead_id:h,root_dir:R.root_dir,lane_id:g.lane_id,...typeof R.queue_index=="number"?{queue_index:R.queue_index}:{}},{kind:"parallel",marker_index:S.parallel_rows.length});return}}}function ke(h){return{runner:h.runner||void 0,model:h.model||void 0,effort:h.effort||void 0,status:h.run_state==="running"?"running":h.run_state,worktree:h.root_dir}}function De(h,g){let{item:R,root_dir:D,revision:_}=Vt(g),y=R?.attempt_id||"",Y=h.classList;if(Y.contains("worker-mini__rowops-up")||Y.contains("worker-mini__rowops-down")){k(g,Y.contains("worker-mini__rowops-up")?-1:1);return}if(Y.contains("worker-mini__rowops-remove")){ae("worker-queue-remove",{bead_id:g},D,_);return}if(Y.contains("mon2-crow__detach")){I(g);return}if(Y.contains("worker-dep__open")){qt(h.getAttribute("data-dep-id")||"",h.getAttribute("data-root-dir")||"");return}if(Y.contains("mon2-arm__release")){E(g,h.getAttribute("data-lane-id")||"");return}if(Y.contains("mon-lane__chip")){let le=h.getAttribute("data-lane-id")||"";ce.querySelector(`.mon2-clane[data-lane-id="${le}"]`)?.scrollIntoView({block:"nearest"});return}if(Y.contains("mon-overlap__chip")){let le=h.getAttribute("data-overlap-id")||"";L=!!L&&L.bead_id===g&&L.counterpart_id===le?null:{bead_id:g,counterpart_id:le},Xe();return}if(Y.contains("mon-overlap__place")){At(g,h.getAttribute("data-counterpart-id")||"");return}if(Y.contains("rtile__failure-badge")){z=z===y?null:y,Xe();return}if(Y.contains("rtile__attempt-copy")){let le=h.getAttribute("data-attempt-id")||"";le&&sn(le).then(Me=>{pe(Me?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",Me?"success":"error",1400)});return}if(Y.contains("worker-card__place")){P=P===g?null:g,Xe();return}if(Y.contains("worker-card__place-cancel")){P=null,Xe();return}if(Y.contains("worker-card__place-lane")){let le=h.getAttribute("data-lane")||"parallel";P=null,fe(g,le);return}if(Y.contains("rtile__session")){if(R&&R.kind==="session"){let le=(R.session_refs||[]).find(Me=>Me&&Me.current===!0);le&&(q.hidden=!1,je.open(Wr(le,g,"in_progress",D)),Xe());return}F=y,y&&R&&(q.hidden=!1,je.open({attempt_id:y,root_dir:D,meta:ke(R)})),Xe();return}if(Y.contains("rtile__pause")){He("worker-attempt-pause",{attempt_id:y},D);return}if(Y.contains("rtile__resume")){Ur().then(le=>{if(le!==null)return me("worker-attempt-resume",{attempt_id:y,...le!==""?{instructions:le}:{}},D,_)});return}if(Y.contains("rtile__parked-retry")){He("worker-parked-retry",{bead_id:g,attempt_id:y},D).then(le=>{le&&le.ok===!1&&pe(`\uC7AC\uC2DC\uB3C4 \uAC70\uBD80: ${le.reason==="not_latest"?"\uC774 bead\uC5D0 \uB354 \uC0C8\uB85C\uC6B4 \uC2DC\uB3C4\uAC00 \uC788\uC2B5\uB2C8\uB2E4":le.reason||""}`,"error")});return}if(Y.contains("rtile__discard")){let le=h.dataset.confirmation==="merged"?"merged":"unmerged";if(!p(Eo(g,le)))return;Qe({bead_id:g,...y?{attempt_id:y}:{},...h.dataset.operationId?{operation_id:h.dataset.operationId}:{}},D,_);return}if(Y.contains("worker-mini__merge")){let le=Ee(D,g);le?.mismatch&&le.continuation===null?Oe(D,g,_,le.mismatch):ae("worker-merge-queue-add",{bead_id:g},D,_);return}if(Y.contains("worker-mini__merge-cancel")){ae("worker-merge-queue-remove",{bead_id:g},D,_);return}if(Y.contains("worker-mini__discard")){let le=h.dataset.discardMode==="merged"?"merged":"unmerged";if(!p(Eo(g,le)))return;Qe({bead_id:g,...h.dataset.attemptId?{attempt_id:h.dataset.attemptId}:{},...h.dataset.operationId?{operation_id:h.dataset.operationId}:{}},D,_);return}if(Y.contains("worker-mini__revise-fix")){me("worker-revise-fix",{bead_id:g},D,_);return}Y.contains("worker-mini__revise-approve")&&ae("worker-revise-approve",{bead_id:g},D,_)}function ue(h){let g=ft.consumeClickSuppression(),R=h.target;if(!R||typeof R.closest!="function"||R.closest("dialog")||R.closest(".worker-drawer-overlay")||R.closest("a"))return;let D=R.closest(".worker-card__id, .worker-mini__id, .rtile__id");if(D){h.preventDefault();let A=R.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||D.textContent?.trim()||"";A&&pn(A);return}let _=R.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(_){h.preventDefault();let v=_.getAttribute("data-root-dir")||Z.get(R.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||_.getAttribute("title")||"";Bt(v);return}let y=R.closest(".mon2-sec__toggle");if(y){h.preventDefault(),H(y.getAttribute("data-root-dir")||"");return}let Y=R.closest(".worker-pane__toggle[data-lane]");if(Y){h.preventDefault();let v=Y.getAttribute("data-lane")||"";(v==="candidate"||v==="queue"||v==="running"||v==="pr_wait"||v==="done")&&Ae(v);return}let le=R.closest(".worker-wait__area-toggle[data-area]");if(le){h.preventDefault(),ut(le.getAttribute("data-area")||"parallel");return}if(R.closest(".mon2-newlane")){h.preventDefault(),Ht("create","");return}let Me=R.closest(".mon2-clane__confirm, .mon2-clane__reapply, .mon2-clane__remove, .mon2-clane__run, .mon2-clane__stop");if(Me){h.preventDefault();let v=Me.getAttribute("data-lane-id")||"",A=Me.classList;Ht(A.contains("mon2-clane__confirm")?"confirm":A.contains("mon2-clane__reapply")?"reapply":A.contains("mon2-clane__run")?"run":A.contains("mon2-clane__stop")?"stop":"remove",v);return}if(R.closest(".mon-merge-all")){h.preventDefault(),Be();return}let ct=R.closest(".mon-filter__spec");if(ct){h.preventDefault(),$={...$,spec:ct.getAttribute("data-spec")||"all"},gp($),Xe();return}let Et=R.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!Et)return;let Nn=Et.getAttribute("data-bead-id")||"",w=R.closest("button");if(w){h.preventDefault(),De(w,Nn);return}R.closest(".rtile__failure-pop")||Nn&&!g&&(h.preventDefault(),qt(Nn,Et.getAttribute("data-root-dir")||Vt(Nn).root_dir))}function Ze(h){let g=h.target;if(!g||typeof g.closest!="function")return;let R=g.closest(".mon-filter__blocked");if(R){$={...$,show_blocked:R.checked},gp($),Xe();return}let D=g.closest(".mon-candidate-sort");if(D){C=Oo.some(Y=>Y.value===D.value)?D.value:"repo_spec",Zb(C),Xe();return}let _=g.closest(".mon-running-sort");if(_){m=_.value==="repo"?"repo":"started",oy(m),Xe();return}let y=g.closest(".mon-done-range");y&&(b=In(y.value),ny(b),Xe())}function yt(h){let g=h.target,R=g&&typeof g.closest=="function"?_=>g.closest(_):()=>null,D=!1;L&&!R(".mon-overlap__popover, .mon-overlap__chip")&&(L=null,D=!0),z&&!R(".rtile__failure-pop, .rtile__failure-badge")&&(z=null,D=!0),D&&Xe()}function gt(h){h.key!=="Escape"||!L&&z===null||(L=null,z=null,Xe())}e.addEventListener("click",ue),e.addEventListener("change",Ze),document.addEventListener("click",yt),document.addEventListener("keydown",gt),ft.attach(e);{let h=!0;ee=$i(g=>{if(ie=g,h){h=!1;return}Xe()})}o&&typeof o.subscribe=="function"&&(_e=o.subscribe(()=>{try{Te.clear(),Xe()}catch{}}));function Ke(){xe!==null&&(clearInterval(xe),xe=null)}return{recorrectSharedLane:Gt,load(){n("load"),Xe(),xe===null&&(xe=setInterval(()=>{try{Xe()}catch{}},sy))},pause(){Ke()},clear(){Ke(),ft.detach(),_e&&(_e(),_e=null),ee&&(ee(),ee=null),je.destroy(),q.hidden=!0,ge?.destroy(),ge=null,e.removeEventListener("click",ue),e.removeEventListener("change",Ze),document.removeEventListener("click",yt),document.removeEventListener("keydown",gt),e.replaceChildren()}}}function Sp(e,t,n){let r=It("views:nav"),{global_element:o,repo_element:s}=e,i=null;function l(b){return m=>{m.preventDefault();let $=b==="monitor"&&a()==="monitor"?"worker":b;r("click tab %s",$),n.gotoView($)}}function a(){let b=t.getState();return b.view==="worker"||b.view==="monitor"?b.view:"board"}function u(){let b=a();return c`
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
    `}function p(){o&&lt(u(),o),s&&lt(d(),s)}return p(),i=t.subscribe(()=>p()),{destroy(){i&&(i(),i=null),o&&lt(c``,o),s&&lt(c``,s)}}}var Ep=["bug","feature","task","epic","chore"];function Tp(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var Cp=["Critical","High","Medium","Low","Backlog"];function Rp(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),o=n.querySelector("#new-title"),s=n.querySelector("#new-type"),i=n.querySelector("#new-priority"),l=n.querySelector("#new-labels"),a=n.querySelector("#new-description"),u=n.querySelector("#new-issue-error"),d=n.querySelector("#btn-cancel"),p=n.querySelector("#btn-create"),b=n.querySelector(".new-issue__close");function m(){s.replaceChildren();let P=document.createElement("option");P.value="",P.textContent="\u2014 Select \u2014",s.appendChild(P);for(let L of Ep){let z=document.createElement("option");z.value=L,z.textContent=Tp(L),s.appendChild(z)}i.replaceChildren();for(let L=0;L<=4;L+=1){let z=document.createElement("option");z.value=String(L);let V=Cp[L]||"Medium";z.textContent=`${L} \u2013 ${V}`,i.appendChild(z)}}m();function $(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function C(P){o.disabled=P,s.disabled=P,i.disabled=P,l.disabled=P,a.disabled=P,d.disabled=P,p.disabled=P,p.textContent=P?"Creating\u2026":"Create"}function j(){u.textContent=""}function K(P){u.textContent=P}function ie(){try{let P=window.localStorage.getItem("beads-ui.new.type");P?s.value=P:s.value="";let L=window.localStorage.getItem("beads-ui.new.priority");L&&/^\d$/.test(L)?i.value=L:i.value="2"}catch{s.value="",i.value="2"}}function ee(){let P=s.value||"",L=i.value||"";P.length>0&&window.localStorage.setItem("beads-ui.new.type",P),L.length>0&&window.localStorage.setItem("beads-ui.new.priority",L)}async function F(){j();let P=String(o.value||"").trim();if(P.length===0){K("Title is required"),o.focus();return}let L=Number(i.value||"2");if(!(L>=0&&L<=4)){K("Priority must be 0..4"),i.focus();return}let z=String(s.value||""),V=String(a.value||""),ne={title:P};z.length>0&&(ne.type=z),String(L).length>0&&(ne.priority=L),V.length>0&&(ne.description=V),C(!0);try{await t("create-issue",ne)}catch{C(!1),K("Failed to create issue");return}ee(),C(!1),$()}return n.addEventListener("cancel",P=>{P.preventDefault(),$()}),b.addEventListener("click",()=>$()),d.addEventListener("click",()=>$()),n.addEventListener("keydown",P=>{P.key==="Enter"&&(P.ctrlKey||P.metaKey)&&(P.preventDefault(),F())}),r.addEventListener("submit",P=>{P.preventDefault(),F()}),{open(){r.reset(),j(),ie();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{o.focus()}catch{}},0)},close(){$()}}}var ly=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked\xB7\uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694 \uCE69"],["stepper","stepper"]];function cy(e,t){return Ki(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function Op(e,t,n){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?c`<div class="settings-dialog__empty">라벨 없음</div>`:c`<div class="settings-dialog__pills">
            ${t.map(r=>{let o=cy(r,e);return c`<button
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
  `}function Lp(e,t,n){return c`
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
  `}function Ip(e,t){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${ly.map(([n,r])=>c`<label class="settings-dialog__toggle">
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
  `}var uy=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function Mp(e,t){let{transport:n,policyStore:r,labelOptions:o}=t,s=t.notify||(X=>pe(X,"error",4e3)),i=document.createElement("dialog");i.id="settings-dialog",i.className="settings-dialog",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),i.setAttribute("aria-label","\uC124\uC815"),e.appendChild(i);let l="execution",a=!1,u="",d=null;function p(){if(d)return d;let X=i.querySelector('[data-pane="execution"]');return X?(d=Ri(X,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:n,implPresetStore:t.implPresetStore,notify:s,onQueueAdopt:Re=>t.queueStore?.set?.(Re)}),d):null}function b(){return c`
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
    `}function m(){let X=r.get();return c`
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
        ${X?c`
              ${Op(X,o(),K)}
              ${Lp(X,u,{onDraft:Re=>{u=Re},onAdd:ie,onRemove:ee})}
              ${Ip(X,F)}
            `:c`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function $(X){let Re=r.get();if(Re)try{let we=await n("display-policy-set",{expected_revision:Re.revision,policy:X(Re)});C(we),we&&we.conflict&&we.policy&&(we=await n("display-policy-set",{expected_revision:we.policy.revision,policy:X(we.policy)}),C(we)),we&&we.conflict&&s("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{s("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function C(X){X&&X.policy&&typeof X.policy=="object"&&r.set(X.policy)}function j(X){$(X)}function K(X){let Re=r.get();if(!Re)return;let we=!dy(X,Re);j(ce=>py(X,ce,we))}function ie(){let X=u.trim();X.length!==0&&(u="",j(Re=>Re.hidden_prefixes.includes(X)?{hidden_prefixes:Re.hidden_prefixes}:{hidden_prefixes:[...Re.hidden_prefixes,X]}),P())}function ee(X){j(Re=>({hidden_prefixes:Re.hidden_prefixes.filter(we=>we!==X)}))}function F(X){let Re=r.get();if(!Re)return;let we=Re.chips[X]===!1;j(()=>({chips:{[X]:we}}))}function P(){lt(c`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${uy.map(X=>c`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${X.id}
                  aria-selected=${String(l===X.id)}
                  aria-controls=${`settings-pane-${X.id}`}
                  @click=${()=>L(X.id)}
                >
                  <span class="settings-dialog__glyph">${X.glyph}</span>
                  ${X.label}
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
            ${b()} ${m()}
          </div>
        </div>
      `,i),p()}function L(X){l=X,P()}let z=()=>{a=!1,t.onOpenChange?.(!1)};i.addEventListener("close",z),i.addEventListener("cancel",z);let V=X=>{X.target===i&&G()};i.addEventListener("click",V);let ne=null;r.subscribe&&(ne=r.subscribe(()=>{a&&P()}));let N=null;t.implPresetStore?.subscribe&&(N=t.implPresetStore.subscribe(()=>{a&&d?.render()}));function Q(X="execution"){a||(a=!0,t.onOpenChange?.(!0),l=X,u="",P(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""),p()?.load())}function G(){a&&(a=!1,t.onOpenChange?.(!1),typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:Q,close:G,sessionDraft:()=>d?.sessionDraft()??{},destroy(){a=!1,i.removeEventListener("close",z),i.removeEventListener("cancel",z),i.removeEventListener("click",V),ne&&(ne(),ne=null),N&&(N(),N=null),d?.destroy(),d=null,i.remove()}}}function dy(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(n=>n.length>0&&e.startsWith(n))}function py(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(s=>s!==e)};let r=t.hidden_labels.filter(s=>s!==e);return t.hidden_prefixes.some(s=>s.length>0&&e.startsWith(s))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}var fy=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],Pp="usage-meter-card",_y="usage-meter-layer",cl=600,my=["token_expired","relogin_required"];function Dp(e){return String(e).padStart(2,"0")}function gy(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),o=Math.floor(n%1440/60),s=n%60;return r>0?`${r}d${o>0?` ${o}h`:""}`:o>0?`${o}h${s>0?` ${s}m`:""}`:`${s}m`}function Np(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),o=new Date(t),s=`${Dp(r.getHours())}:${Dp(r.getMinutes())}`,l=r.getFullYear()===o.getFullYear()&&r.getMonth()===o.getMonth()&&r.getDate()===o.getDate()?s:`${fy[r.getMonth()]} ${r.getDate()} ${s}`;return`${gy(n,t)} \xB7 ${l}`}function hy(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function qp(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function Fp(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var jp=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function Up(e){let t=[];for(let n of e){if(!n||typeof n!="object")continue;let r=n;typeof r.key!="string"||r.key.length===0||typeof r.pct!="number"||!Number.isFinite(r.pct)||t.push({key:r.key,pct:r.pct,resetsAt:typeof r.resetsAt=="string"?r.resetsAt:""})}return t}function by(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:Up(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function yy(e,t){if(!e||typeof e!="object")return null;let n=e,r=[];if(Array.isArray(n.accounts))for(let s of n.accounts){let i=by(s);i&&r.push(i)}let o=n.available===!0&&Array.isArray(n.windows);return!o&&r.length===0?null:{available:o,windows:o?Up(n.windows):[],ageSeconds:typeof n.ageSeconds=="number"&&Number.isFinite(n.ageSeconds)?n.ageSeconds:null,accounts:r,receivedAtMs:t,held:!1}}function vy(e,t){if(!e||typeof e!="object")return{kind:"error"};let n=yy(e,t);return n?{kind:"ok",snapshot:n}:Array.isArray(e.accounts)?{kind:"empty"}:{kind:"error"}}function Wp(e,t){return(e.ageSeconds===null?0:e.ageSeconds)+Math.max(0,t-e.receivedAtMs)/1e3}function ky(e,t){return!e.held||Wp(e,t)<=cl?e:{...e,available:!1,windows:[],accounts:[]}}function Bp(e,t){return`${e}:${t}`}function zp(e){let t=!1,n=null,r=new Map,o=null,s=new Map,i=new Map,l=0,a=null;function u(){lt(c``,e),e.hidden=!0,p()}function d(){if(a===null){let ce=e.ownerDocument;a=ce.createElement("div"),a.id=_y,a.className="usage-meter__layer",ce.body.appendChild(a)}return a}function p(){a!==null&&(lt(c``,a),a.remove(),a=null)}function b(ce){n!==ce&&(n===null&&(document.addEventListener("mousedown",$),document.addEventListener("keydown",j),window.addEventListener("resize",C)),n=ce)}function m(){n!==null&&(n=null,document.removeEventListener("mousedown",$),document.removeEventListener("keydown",j),window.removeEventListener("resize",C))}function $(ce){let q=ce.target;q&&(e.contains(q)||a!==null&&a.contains(q))||(m(),G())}function C(){G()}function j(ce){ce.key==="Escape"&&(m(),G())}function K(ce){n===ce?m():b(ce),G()}function ie(){m(),G()}async function ee(ce,q){if(r.has(ce.key))return;let $e=Bp(ce.key,q);r.set(ce.key,q),i.delete($e),G();let Se=null;try{Se=await(await fetch(ce.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:q})})).json()}catch{Se=null}if(t)return;if(r.delete(ce.key),!Se||Se.ok!==!0){let Z=Se&&typeof Se.error=="string"&&Se.error.length>0?Se.error:"network_error";i.set($e,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${Z}`}),G();return}let S=Array.isArray(Se.warnings)?Se.warnings.filter(Z=>typeof Z=="string"&&Z.length>0):[];S.length>0&&i.set($e,{kind:"warn",text:S.join(" \xB7 ")}),G(),await we()}function F(ce,q,$e,Se){let S=Fp(ce.pct),Te=`resets ${Np(ce.resetsAt,Se)}${q?` \xB7 ${$e}`:""}`;return c`<span
      class="usage-meter__window ${qp(S)}"
      style=${`--progress: ${S}%`}
      title=${Te}
    >
      <span class="usage-meter__label">${ce.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${S}%</span>
    </span>`}function P(ce,q,$e){let Se=Wp(q,$e),S=q.available&&(q.held||Se>cl),Z=S?`${Math.floor(Se/60)}\uBD84 \uC804 \uCE21\uC815`:"",Te=q.accounts.filter(je=>!je.active).length,_e=`usage-meter__group${S?" usage-meter__group--stale":""}`,xe=c`<span class="usage-meter__provider"
        >${ce.label}</span
      >
      ${q.available?q.windows.map(je=>F(je,S,Z,$e)):c`<span class="usage-meter__empty">사용량 없음</span>`}
      ${Te>0?c`<span class="usage-meter__badge">+${Te}</span>`:""}`;if(q.accounts.length===0)return c`<span
        class=${_e}
        aria-label=${`${ce.label} usage`}
        >${xe}</span
      >`;let ge=n===ce.key;return c`<button
      type="button"
      class=${`usage-meter__toggle ${_e}`}
      aria-label=${`${ce.label} usage`}
      aria-expanded=${ge?"true":"false"}
      aria-controls=${Pp}
      @click=${()=>K(ce.key)}
    >
      ${xe}
    </button>`}function L(ce,q){return c`<span class="usage-meter" aria-label="Usage">
      ${ce.map($e=>P($e.provider,$e.snapshot,q))}
    </span>`}function z(ce,q){let $e=Fp(ce.pct),Se=Np(ce.resetsAt,q);return c`<span
      class="usage-meter__account-window ${qp($e)}"
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
    </span>`}function V(ce,q){return my.includes(q)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${ce.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function ne(ce,q,$e){let Se=q.status==="ok",S=typeof q.ageSeconds=="number"&&q.ageSeconds>cl,Z=i.get(Bp(ce.key,q.number)),Te=r.get(ce.key),_e=Te!==void 0,xe=Te===q.number,ge=["usage-meter__account"];return q.active&&ge.push("usage-meter__account--active"),Se||ge.push("usage-meter__account--unavailable"),S&&ge.push("usage-meter__account--stale"),c`<div class=${ge.join(" ")}>
      <div class="usage-meter__account-head">
        <span class="usage-meter__account-label" title=${q.email}
          >${q.alias===null?q.email:q.alias}</span
        >
        ${q.plan===null?"":c`<span class="usage-meter__account-tag">${q.plan}</span>`}
        ${q.active?c`<span
              class="usage-meter__account-tag usage-meter__account-tag--active"
              >active</span
            >`:""}
        ${q.ageSeconds===null?"":c`<span class="usage-meter__account-age"
              >${hy(q.ageSeconds)}</span
            >`}
        ${q.active?"":c`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${_e}
              @click=${()=>{ee(ce,q.number)}}
            >
              ${xe?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${Se?c`<div class="usage-meter__account-windows">
            ${q.windows.map(je=>z(je,$e))}
          </div>`:c`<div class="usage-meter__account-status">
            ${V(ce,q.status)}
          </div>`}
      ${Z===void 0?"":c`<div
            class="usage-meter__account-message usage-meter__account-message--${Z.kind}"
          >
            ${Z.text}
          </div>`}
    </div>`}function N(ce,q,$e){let Se=q.accounts.filter(S=>S.active).length;return c`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${ce.label} · 활성 ${Se} / 전체
        ${q.accounts.length}
      </h2>
      ${q.accounts.map(S=>ne(ce,S,$e))}
    </section>`}function Q(ce,q){return c`<div
      class="usage-meter__card"
      id=${Pp}
      role="dialog"
      aria-label=${`${ce.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${N(ce.provider,ce.snapshot,q)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function G(){let ce=Date.now(),q=[];for(let Se of jp){let S=s.get(Se.key);S&&q.push({provider:Se,snapshot:ky(S,ce)})}if(q.length===0){m(),u();return}let $e=q.find(Se=>Se.provider.key===n&&Se.snapshot.accounts.length>0);$e||m(),lt(L(q,ce),e),e.hidden=!1,$e?X($e,ce):p()}function X(ce,q){let $e=d(),Se=e.getBoundingClientRect(),S=e.ownerDocument.documentElement.clientWidth;$e.style.setProperty("--usage-meter-anchor-top",`${Se.bottom}px`),$e.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,S-Se.right)}px`),lt(c`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${ie}
        ></div>
        ${Q(ce,q)}`,$e)}async function Re(ce){try{let q=await fetch(ce.endpoint);return q.ok?vy(await q.json(),Date.now()):{kind:"error"}}catch{return{kind:"error"}}}async function we(){l+=1;let ce=l,q=await Promise.all(jp.map(async $e=>({provider:$e,read:await Re($e)})));if(!(t||ce!==l)){for(let $e of q){let Se=$e.provider.key;if($e.read.kind==="ok"){s.set(Se,$e.read.snapshot);continue}if($e.read.kind==="empty"){s.delete(Se);continue}let S=s.get(Se);S!==void 0&&!S.held&&s.set(Se,{...S,held:!0})}G()}}return u(),we(),o=setInterval(()=>{we()},6e4),{destroy(){t=!0,o!==null&&(clearInterval(o),o=null),m(),u()}}}var wy="worker-ineligible";function Jo(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Hp(e){return Jo(e).includes(wy)}var $y="worker-serial";function Gp(e){return Jo(e).includes($y)}var Vp="bdui.worker.candidate_sort",es=Object.freeze([{id:"spec",label:"spec \uC6B0\uC120",chain:[{key:"spec",dir:"desc"},{key:"created",dir:"asc"}]},{id:"bottleneck",label:"\uBCD1\uBAA9 \uC6B0\uC120",chain:[{key:"priority",dir:"asc"},{key:"dependents",dir:"desc"},{key:"released",dir:"desc"}]},{id:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131",chain:[{key:"created",dir:"desc"},{key:"priority",dir:"asc"}]},{id:"updated",label:"\uCD5C\uC2E0 \uC218\uC815",chain:[{key:"updated",dir:"desc"}]}]),Li=Object.freeze({preset:"spec"}),Qp=3,Xp=Object.freeze([{key:"priority",label:"\uC6B0\uC120\uC21C\uC704"},{key:"dependents",label:"\uD6C4\uC18D \uC218"},{key:"released",label:"\uD574\uC81C \uC2DC\uAC01"},{key:"spec",label:"spec \uC720\uBB34"},{key:"created",label:"\uC0DD\uC131"},{key:"updated",label:"\uC218\uC815"}]);function Kp(e){return es.some(t=>t.id===e)}function Yp(e){let t=es.find(n=>n.id===e);return t?t.chain.map(n=>({...n})):[]}function xy(e,t){return e.length===t.length&&e.every((n,r)=>n.key===t[r].key&&n.dir===t[r].dir)}function ts(e){return e&&"preset"in e?Yp(e.preset):e&&Array.isArray(e.chain)?e.chain.map(t=>({...t})):Yp("spec")}function ul(e){return e&&"preset"in e?e.preset:null}function Tr(e){if(typeof e=="string"){let s;try{s=JSON.parse(e)}catch{return Kp(e)?{preset:e}:Li}return Tr(s)}if(!e||typeof e!="object")return Li;let t=e;if(Kp(t.preset))return{preset:t.preset};let n=t.chain;if(!Array.isArray(n)||n.length===0||n.length>Qp||!n.every(Wi))return Li;let r=[];for(let s of n)r.some(i=>i.key===s.key)||r.push({key:s.key,dir:s.dir});let o=es.find(s=>xy(s.chain,r));return o?{preset:o.id}:{chain:r}}function Zp(){try{return Tr(window.localStorage.getItem(Vp))}catch{return Li}}function dl(e){try{window.localStorage.setItem(Vp,JSON.stringify(e))}catch{}}function Jp(e,t,n){let r=e.map(a=>({...a}));if(!n)return r.slice(0,t);if(!Object.prototype.hasOwnProperty.call(ms,n))return r;let o=n;if(r.slice(0,t).some(a=>a.key===o))return r.slice(0,t);let s={key:o,dir:r[t]&&r[t].key===o?r[t].dir:ms[o]},i=r.slice(0,t),l=r.slice(t+1).filter(a=>a.key!==o);return[...i,s,...l].slice(0,Qp)}function ef(e,t){return e.map((n,r)=>r===t?{key:n.key,dir:n.dir==="asc"?"desc":"asc"}:{...n})}function tf(e,t){let n=Array.isArray(e)?e.slice():[];return n.sort(Vl(ts(t))),n}var nf=new Set(["sh","bash","zsh","dash","ksh"]),rf=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function of(e){let t=e.split("/");return t[t.length-1]||""}function Ay(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let n=t.slice(2).trim().split(/\s+/).filter(Boolean);if(n.length===0)return!1;let r=of(n[0]);if(r!=="env")return nf.has(r);let o=n.slice(1).find(s=>!s.startsWith("-")&&!s.includes("="));return o!==void 0&&nf.has(of(o))}function Sy(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function Ey(e){let t=[],n=0;rf.lastIndex=0;for(let r of e.matchAll(rf)){let o=r.index;o>n&&t.push({text:e.slice(n,o),kind:"plain"}),t.push({text:r[0],kind:Sy(r[0])}),n=o+r[0].length}return n<e.length&&t.push({text:e.slice(n),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function Ty(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function sf(e){let t=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),r=document.createElement("div");r.className="repo-ops-script-viewer-root",document.body.appendChild(r);let o=null,s="loading",i="",l="",a=0,u=null,d=!1;function p(P,L){return L?Ey(P).map(z=>z.kind==="plain"?z.text:c`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${z.kind}"
            >${z.text}</span
          >`):P}function b(){if(!o)return c``;let P=s==="ready"&&Ay(i),L=s==="ready"?i.split(`
`):[];return c`<div
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
          ${s==="loading"?c`<div class="repo-ops-script-viewer__status">
                스크립트 불러오는 중…
              </div>`:s==="error"?c`<div
                  class="repo-ops-script-viewer__status repo-ops-script-viewer__status--error"
                >
                  ${l}
                </div>`:c`<div class="repo-ops-script-viewer__code" tabindex="0">
                  ${L.map((z,V)=>c`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${V+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${p(z,P)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function m(){lt(b(),r)}async function $(){if(s!=="ready")return;let P=await sn(i);pe(P?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",P?"success":"error")}function C(P){P.key==="Escape"&&o&&(P.preventDefault(),ee())}function j(){d||(document.addEventListener("keydown",C),d=!0)}function K(){d&&(document.removeEventListener("keydown",C),d=!1)}async function ie(P,L=null){let z=++a;j(),o={...P},u=L||(document.activeElement instanceof HTMLElement?document.activeElement:null),s="loading",i="",l="",m(),r.querySelector(".repo-ops-script-viewer__close")?.focus();let ne=t?t():"";if(!ne){s="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",m();return}if(!n){s="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",m();return}let N="/api/repo-ops-script?workspace="+encodeURIComponent(ne)+"&lane="+encodeURIComponent(P.lane)+"&base_sha="+encodeURIComponent(P.base_sha);try{let Q=await n(N),G=await Q.json().catch(()=>({}));if(z!==a)return;if((t?t():"")!==ne){ee();return}if(!Q.ok||!G||G.ok!==!0){s="error",l=Ty(G&&typeof G.error=="string"?G.error:""),m();return}o={lane:G.lane,base_sha:G.base_sha,path:G.path,base_ref:G.base_ref},i=String(G.content),s="ready",m()}catch{if(z!==a)return;s="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",m()}}function ee(){a+=1,K(),o=null,i="",m();let P=u;u=null,P?.isConnected&&P.focus()}function F(){ee(),r.remove()}return{open:ie,close:ee,destroy:F}}var af={deploy_not_declared:"\uC120\uC5B8 \uC5C6\uC74C",deploy_opted_out:"\uC774 workspace\uC5D0\uC11C \uBC30\uD3EC \uC2E4\uD589\uC774 \uAEBC\uC838 \uC788\uC74C",deploy_in_flight:"\uBC30\uD3EC \uC9C4\uD589 \uC911",target_unresolved:"\uB300\uC0C1 tip\uC744 \uD655\uC815\uD558\uC9C0 \uBABB\uD568",remote_history_not_monotonic:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uC640 \uC6D0\uACA9 \uC774\uB825\uC774 \uAC08\uB77C\uC9D0"},Cy=new Set(["queued","running","retry_pending"]);function lf(e){let t=e.queueStore,n=e.transport,r=e.onChanged||(()=>{}),o=e.onOpenScript;function s(){return t&&t.get()||{}}function i(){let N=s();return typeof N.revision=="number"?N.revision:0}function l(N){t&&N&&N.queue&&typeof N.queue=="object"&&t.set(N.queue)}function a(){let N=s().workspace_info;return N&&typeof N=="object"?N:{}}function u(N,Q){return c`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${N}"
      >${Q}</span
    >`}function d(N){if(typeof N!="number"||!Number.isFinite(N))return"";let Q=N/6e4;return Number.isInteger(Q)?`timeout ${Q}\uBD84`:`timeout ${Math.round(N/1e3)}\uCD08`}function p(N){let Q=d(N);return Q?u("config",Q):""}function b(N,Q,G){return c`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${G.script}
      @click=${X=>{o&&o({lane:N,base_sha:Q.base_sha,path:G.script,base_ref:Q.base_ref},X.currentTarget)}}
    ></button>`}function m(){let N=s().repo_operations;return Array.isArray(N)?N:[]}function $(){let N=a().repo_ops,Q=N&&typeof N=="object"?N.repo_id:null;return typeof Q=="string"&&Q?Q:null}function C(){return m().some(N=>N&&N.kind==="deploy"&&Cy.has(N.state))}function j(){let N=C(),Q=$()===null;return c`<button
      type="button"
      class="worker-repo-ops__deploy-run"
      data-seam="repo-ops-deploy-run"
      ?disabled=${N||Q}
      title=${N?"\uBC30\uD3EC \uC9C4\uD589 \uC911":Q?"\uC800\uC7A5\uC18C\uB97C \uD655\uC778\uD560 \uC218 \uC5C6\uC74C":"\uC6D0\uACA9 base tip\uC5D0\uC11C \uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uB97C 1\uD68C \uC2E4\uD589\uD569\uB2C8\uB2E4"}
      @click=${()=>{L()}}
    >
      배포 실행
    </button>`}function K(){let N=s().repo_ops_opt_out;return{verify:N?.verify===!0,deploy:N?.deploy===!0}}function ie(N,Q){return c`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!Q}
        @change=${G=>{P(N,!G.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function ee(N){let Q=typeof N.base_sha=="string"?N.base_sha:"",G=`${N.source_path||"repo-ops/config.toml"} @ ${N.base_ref||"?"}${Q?`@${Q.slice(0,7)}`:""}`,X=K(),Re=!!N.verify&&X.verify,we=!!N.deploy&&X.deploy;return c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${G}</span>
      </p>
      <div
        class="worker-repo-ops__lane${Re?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${N.verify?c`${b("verify",N,N.verify)}
              ${p(N.verify.timeout_ms)}
              ${Re?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:c`선언 없음${u("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
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
          >${N.deploy?c`${b("deploy",N,N.deploy)}
              ${p(N.deploy.timeout_ms)}
              ${we?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):j()}`:c`선언 없음${u("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${we?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":N.deploy?c`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${N.deploy?ie("deploy",X.deploy):""}
      </div>
    </section>`}function F(N){let Q=N.repo_ops&&typeof N.repo_ops=="object"?N.repo_ops:null;return Q&&(Q.status==="resolved"||Q.status==="absent")?ee(Q):Q&&(Q.status==="pending"||Q.status==="error")?c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
    </section>`}async function P(N,Q){if(!n)return;let G=await n("worker-repo-ops-opt-out-toggle",{kind:N,opted_out:Q,expected_revision:i()});if(l(G),G&&G.conflict){let X=await n("worker-repo-ops-opt-out-toggle",{kind:N,opted_out:Q,expected_revision:i()});l(X)}r()}async function L(){let N=$();if(!n||N===null)return;let Q=await n("worker-repo-operation-deploy-run",{repo_id:N});if(l(Q),!Q||Q.ok!==!0){let G=Q&&typeof Q.reason=="string"?Q.reason:"",X=Object.hasOwn(af,G)?af[G]:G||"\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";pe(`\uBC30\uD3EC \uC2E4\uD589 \uAC70\uBD80 \u2014 ${X}`,"error")}else pe("\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD588\uC2B5\uB2C8\uB2E4","success");r()}let z={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",repair_session_dispatch:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC790\uB3D9 \uC2E4\uD589",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC"};function V(N,Q,G){return c`<div class="worker-repo-ops__policy-group" data-policy=${G}>
      <div class="worker-repo-ops__policy-label">${N}</div>
      <ul class="worker-repo-ops__policy-list">
        ${Q.map(X=>c`<li data-token=${X}>
              ${z[X]||X}
            </li>`)}
      </ul>
    </div>`}function ne(){let N=s(),Q=N.repo_operation_policy&&typeof N.repo_operation_policy=="object"?N.repo_operation_policy:null;return Q?c`<section
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
        ${V("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",Q.worker_automatic||[],"worker-automatic")}
        ${V("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",Q.never_automatic||[],"never-automatic")}
      </details>
    </section>`:""}return{template(){return c`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언
        </summary>
        ${F(a())} ${ne()}
      </details>`}}}var df=20,Ry=5,Oy=new Set(["failed","running","queued","retry_pending"]),cf={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"};function Ly(e,t,n=df){let r=[];for(let o of Array.isArray(e)?e:[])!o||typeof o!="object"||r.push({type:"operation",id:o.operation_id,at:typeof o.finished_at=="number"?o.finished_at:typeof o.requested_at=="number"?o.requested_at:null,operation:o});for(let o of Array.isArray(t)?t:[])!o||typeof o!="object"||r.push({type:"cleanup",id:o.bead_id,at:typeof o.at=="number"?o.at:null,cleanup:o});return r.sort((o,s)=>o.at===null&&s.at===null?String(o.id||"").localeCompare(String(s.id||"")):o.at===null?1:s.at===null?-1:s.at-o.at),r.slice(0,Math.max(0,n))}function Iy(e){if(e.type==="cleanup")return!0;let t=e.operation;return Oy.has(t.state)&&!t.dismissed&&!t.superseded_by}function My(e,t,n={}){let r=Ly(e,t,1/0),o=n.expanded===!0?df:Ry,s=new Set(r.slice(0,o)),i=r.filter(l=>s.has(l)||Iy(l));return{visible:i,hidden:r.length-i.length}}function uf(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function Py(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function pf(e){let t=e.filter(n=>n.value);return t.length===0?"":c`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(n=>{let r=n.copy===!0?Qr(n.value):n.value;return c`<div>
          <dt>${n.term}</dt>
          <dd>${r}</dd>
        </div>`})}
    </dl>
  </details>`}function ff(e,t="",n=!1){return!e&&!t?"":c`<p
    class="worker-ev__explain${n?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?c`<br />${t}`:""}
  </p>`}function Dy(e,t){if(!e||typeof e!="object")return;let n=t&&t.kind==="verify"?"verify":"deploy",r=e[n],o=r&&typeof r=="object"?r.timeout_ms:void 0;return typeof o=="number"&&Number.isFinite(o)?o:void 0}function Ny(e,t){let n=ep(e,t),r=tp(e);return!n&&!r?"":c`<p class="worker-ev__why">
    ${n?c`<span class="worker-ev__why-line">${n}</span>`:""}${r?c`<span class="worker-ev__why-line">${r}</span>`:""}
  </p>`}function qy(e){return e.state!=="failed"||e.superseded_by||e.dismissed?"":c`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-repo-op__dismiss"
      data-operation-id=${e.operation_id}
      title="사람이 확인한 실패로 접수합니다 — 기록은 그대로 남고 해결 필요 집계에서만 빠집니다"
    >
      기록 닫기
    </button>
  </div>`}function Fy(e,t){let n=e.operation,r=n.state==="failed",o=n.failure?n.failure.code:"";return c`<li
    class="worker-ev"
    data-operation-id=${n.operation_id}
    data-state=${n.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?Yt(e.at):""}
      >${js(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${uf(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(cf,n.kind)?cf[n.kind]:n.kind}</span
        >
        <span class="worker-ev__meta"
          >${n.target_base}@${Fs(n.target_sha)}${typeof n.elapsed_ms=="number"?` \xB7 ${kr(n.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${uf(e)}"
          >${Py(e)}</span
        >
        ${n.dismissed?c`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${n.superseded_by?c`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
        ${n.source==="manual"?c`<span
              class="worker-ev__st worker-ev__st--manual"
              title="사람이 배포 실행을 눌러 시작한 작업입니다"
              >수동</span
            >`:""}
      </div>
      ${r?ff(Jd(n.failure_kind,o)):""}
      ${Ny(n,Dy(t,n))}
      ${qy(n)}
      ${pf([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?o:""},{term:"script",value:[n.script_path||"",n.script_blob_sha?`blob ${Fs(n.script_blob_sha)}`:"",Number.isInteger(n.exit_code)?`exit ${n.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:n.log_path||"",copy:!0},{term:"\uCD9C\uB825",value:n.output_tail||""}])}
    </div>
  </li>`}function jy(e){let t=e.cleanup,n=wr(t.step);return c`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?Yt(e.at):""}
      >${js(e.at)||"\u2014"}</span
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
        ${_u(t.step).map(r=>c`<li
              class="worker-step worker-step--${r.state}"
              data-step=${r.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${r.label}</span>
            </li>`)}
      </ol>
      ${ff(cr(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
      <div class="worker-ev__acts">
        <button
          type="button"
          class="worker-ev__btn worker-ev__btn--warn worker-cleanup__resume"
          data-bead-id=${t.bead_id}
        >
          정리 재개${n?` \u2014 ${n} \uB2E8\uACC4\uBD80\uD130`:""}
        </button>
      </div>
      ${pf([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||"",copy:!0},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function By(e){let t=typeof e.hidden=="number"?e.hidden:0,n=e.expanded===!0;return c`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(r=>r.type==="cleanup"?jy(r):Fy(r,e.repo_ops))}
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
  </section>`}function _f(e,t={}){let n=null;function r(){if(n===null){lt(c``,e);return}let i=My(n.operations,n.cleanup_failures,{expanded:n.expanded});lt(By({events:i.visible,hidden:i.hidden,expanded:n.expanded,repo:n.repo,repo_ops:n.repo_ops}),e)}e.addEventListener("click",i=>{let l=i.target;if(l?.closest?.('[data-seam="repo-ops-close"]')){s();return}l?.closest?.('[data-seam="repo-ops-more"]')&&n&&(n.expanded=!n.expanded,r())});function o(i){n={operations:i.operations,cleanup_failures:i.cleanup_failures,repo:i.repo||"",repo_ops:i.repo_ops||null,expanded:!1},r()}function s(){n!==null&&(n=null,r(),t.onClose&&t.onClose())}return{open:o,close:s,isOpen:()=>n!==null,refresh(i){n&&(n={operations:i.operations,cleanup_failures:i.cleanup_failures,repo:i.repo||"",repo_ops:i.repo_ops||null,expanded:n.expanded},r())}}}var Uy="session-preferred",Wy=["exclusive_machine","iterative_user_judgment","visual_verification"];function mf(e,t){if(!Jo(e).includes(Uy)||typeof t!="object"||t===null)return"";let n=t.session_preferred_reason;return typeof n=="string"&&Wy.includes(n)?n:""}var zy=It("views:worker:adapter"),Hy="tab:worker:ready",Gy="tab:worker:blocked",Ky="tab:worker:in-progress",Yy="tab:worker:resolved",Vy="tab:worker:closed",Qy="\u{1F512} blocked",Xy={revision:0,auto_advance:!1,auto_merge:!1,slots:ei,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]},Zy=["claude_account","codex_account"],Jy=[...Gr,...Zy];function ev(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function tv(e){let t=e?.blocked_info;return t&&typeof t=="object"?Array.isArray(t.blockers)?t.blockers.filter(r=>typeof r=="string"&&r.length>0):[]:(Array.isArray(e?.dependencies)?e.dependencies:[]).map(r=>{if(typeof r=="string")return r;if(!r||typeof r!="object")return"";let o=r.type??r.dependency_type;return o!==void 0&&o!=="blocks"?"":r.depends_on_id||r.id||""}).filter(Boolean)}function nv(e){let t=e&&typeof e=="object"?e.awaiting_user:void 0,n=typeof t=="string"?t.trim():"";return n.length>0?`${Ks}: ${n}`:Ks}function Cr(e){return e&&typeof e=="object"?e:{}}function rv(e){let t={};for(let n of Jy){let r=e[n];typeof r=="string"&&r.length>0&&(t[n]=r)}return t}function ov(e){let t=e.replace(/\/+$/,""),n=t.lastIndexOf("/");return n>=0?t.slice(n+1):t}function gf(e={}){let{queueStore:t,issueStores:n,transport:r,getWorkspacePath:o,onInvalidate:s}=e,i=n?qr(n):null,l=new Map,a={},u=null,d=0,p=null,b=!1;function m(){b||!s||s()}function $(L){return u===L?a:{}}async function C(){if(!r||b)return;let L=o?.()||"";if(u===L||p&&p.key===L&&p.generation===d)return;let z=++d;p={key:L,generation:z};let V=null;try{V=await Promise.resolve(r("get-session-defaults",{}))}catch(ne){if(z!==d)return;p=null,zy("get-session-defaults failed: %o",ne),m();return}z===d&&(a=V&&typeof V.values=="object"&&V.values!==null?{...V.values}:{},u=L,p=null,m())}function j(){u=null,d+=1,C()}function K(){for(let[L,z]of l)z==="failed"&&l.delete(L)}function ie(L,z){return i?i.selectBoardColumn(L,z):[]}function ee(L,z,V,ne){let N=Array.isArray(L.queue)?L.queue:[],Q=new Set([...N.map(q=>q.bead_id),...(Array.isArray(L.serial_lanes)?L.serial_lanes:[]).flatMap(q=>(Array.isArray(q?.entries)?q.entries:[]).map($e=>$e.bead_id)),...(Array.isArray(L.pr_wait)?L.pr_wait:[]).map(q=>q.bead_id),...(Array.isArray(L.done)?L.done:[]).map(q=>q.bead_id)]),G=new Set(V.map(q=>q.id)),X=new Set,Re=[];for(let q of[...z,...V])Q.has(q.id)||X.has(q.id)||ev(q)||(X.add(q.id),Re.push(q));let we=tf(Re,Tr(ne)),ce=Cr(L.bead_scope);return we.map(q=>{let $e=Dr(q),Se=$e.evidence==="published",S=typeof q.workflow?.route=="string"&&q.workflow.route||(q.metadata&&typeof q.metadata.route=="string"?q.metadata.route:""),Z=S==="quick_fix",Te=!Object.hasOwn(q,"description")||typeof q.description=="string"&&q.description.trim().length>0,_e=Object.hasOwn(q,"labels")&&Hp(q.labels),xe=_e||!Object.hasOwn(q,"labels")?"":mf(q.labels,q.metadata),ge=q.metadata&&typeof q.metadata=="object"?Object.hasOwn(q.metadata,"awaiting_user"):!1,je=!_e&&!ge&&(Z?Te:Se&&!$e.conflict),ft=G.has(q.id),Le=ft?tv(q):[],U=[];ft&&Le.length===0&&U.push(Qy),ge&&U.push(nv(q.metadata)),Z&&!Te?U.push("missing_description"):!Z&&$e.conflict?U.push("spec_id_conflict"):!Z&&$e.evidence==="none"?U.push("spec \uC5C6\uC74C"):!Z&&$e.evidence==="draft"&&U.push("spec \uBBF8\uBC1C\uD589(draft)");let de=ce[q.id];return{bead_id:q.id,title:q.title||q.id,route:S,spec_id:$e.conflict?"":$e.path,published:Se,blocked:ft,blocked_by:Le,labels:Array.isArray(q.labels)?q.labels:[],created_at:q.created_at,updated_at:q.updated_at,status:q.status,workflow:q.workflow||null,exec_pins:rv(Cr(q.metadata)),rec:null,...de&&Array.isArray(de.scope)?{scope:de.scope}:{},eligible:je,reason:U.join(" \xB7 "),worker_ineligible:_e,session_preferred:xe.length>0,session_preferred_reason:xe,release_info:q.release_info,dependents_info:q.dependents_info}})}function F(L){let[z,V,ne,N,Q]=L,G=bs([...z,...V,...ne,...N,...Q]),X={},Re=(we,ce)=>{if(!we||typeof we.id!="string"||we.id.length===0)return;let q=X[we.id]||(X[we.id]={});if(typeof we.priority=="number"&&!("priority"in q)&&(q.priority=we.priority),typeof we.from_id=="string"&&!("from_id"in q)&&(q.from_id=we.from_id),ce&&!("metadata"in q)){q.metadata=Cr(we.metadata);let $e=Cr(we.workflow).route;typeof $e=="string"&&$e.length>0&&(q.route=$e)}};for(let we of[...z,...V,...ne])Re(we,!0);for(let we of[...N,...Q])Re(we,!1);for(let we of new Set([...Object.keys(X),...G.keys()])){let ce=ys(G,we);if(ce.total>0){let q=X[we]||(X[we]={});q.rollup=ce}}return X}function P(L,z,V,ne){let N=new Set((Array.isArray(L.done)?L.done:[]).map(G=>G?.bead_id).filter(G=>typeof G=="string")),Q=[];for(let G of z){let X=tr(G.closed_at);if(typeof G.id!="string"||N.has(G.id)||X===null||ne!==void 0&&X<ne||typeof G.comment_count!="number"||G.comment_count<=0)continue;let Re=`${V}\0${G.id}\0${String(G.updated_at)}\0${G.comment_count}`,we=l.get(Re);if(we===void 0&&r&&(l.set(Re,"pending"),Promise.resolve(r("get-comments",{id:G.id})).then(q=>{let $e=Array.isArray(q)&&q.some(Se=>hi(typeof Se?.text=="string"?Se.text:"")?.lane==="session");l.set(Re,$e?"session":"not-session"),m()}).catch(()=>{l.set(Re,"failed"),m()})),we!=="session")continue;let ce=tr(G.started_at);Q.push({id:G.id,title:G.title||G.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:ce!==null&&X>=ce?X-ce:null,work_kind:"session",done_at:X,created_at:G.created_at,updated_at:G.updated_at})}return Q}return{read(L){if(!t)return{workspaces:[],workspaces_state:[]};let z=t.get()||Xy,V=o?.()||"",ne=L&&typeof L.done_since=="number"?L.done_since:void 0,N=ie(Hy,"ready"),Q=ie(Gy,"blocked"),G=ie(Ky,"in_progress"),X=ie(Yy,"resolved"),Re=ie(Vy,"closed");return{workspaces:[{...z,bead_titles:{...Cr(z.bead_titles),...Object.fromEntries([...N,...Q].filter(we=>we&&typeof we.id=="string").map(we=>[we.id,we.title||we.id]))},root_dir:V,name:ov(V),runnable:ee(z,N,Q,L?L.candidate_sort:void 0),session_done:P(z,Re,V,ne),bead_overlay:F([N,Q,G,X,Re])}],workspaces_state:[{root_dir:V,revision:z.revision,auto_advance:z.auto_advance,auto_merge:z.auto_merge,slots:typeof Cr(z.workspace_info).slots=="number"?Cr(z.workspace_info).slots:z.slots,runner_catalog:z.runner_catalog,execution_defaults:z.execution_defaults,session_defaults:$(V),orchestration_model:z.orchestration_model,orchestration_effort:z.orchestration_effort,orchestration_speed:z.orchestration_speed,issue_prefix:""}]}},ensureSessionDefaults(){C()},refreshSessionDefaults:j,notifyIssuesChanged:K,destroy(){b=!0,d+=1,p=null,l.clear()}}}var Ii=1,hf=5,sv={root_dir:"",name:"",auto_advance:!1,auto_merge:!1,slots:Ii,revision:0,runner_catalog:{},items:[],sublanes:{parallel:[],serial:[]},serial_lane_count:0,raw_queue_length:0,live_count:0,over_cap:!1,merge:{positions:new Map,resolutions:new Map,continuations:new Map,authorities:new Map,state:{active:null,failures:{},waiting:null},auto_excluded:[],running:!1},token_total:null,cleanup_failures:[],declared_base:null,repo_operations:[]};function dn(e){return e&&typeof e=="object"?e:{}}var vf="beads-ui.worker.candidate-filter",pl={show_blocked:!1,spec:"all"};function iv(){try{let e=window.localStorage.getItem(vf);if(!e)return{...pl};let t=JSON.parse(e);if(!t||typeof t!="object")return{...pl};let n=t.spec;return{show_blocked:t.show_blocked===!0,spec:n==="with"||n==="without"?n:"all"}}catch{return{...pl}}}function av(e){try{window.localStorage.setItem(vf,JSON.stringify(e))}catch{}}var lv=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],kf="bdui.worker.done-range";function cv(){try{let e=window.localStorage.getItem(kf);return e===null?"today":In(e)}catch{return"today"}}function uv(e){try{window.localStorage.setItem(kf,e)}catch{}}function bf(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function dv(e){return e==="receipt_not_current"?"\uB9AC\uBDF0 \uD6C4\uC5D0\uB3C4 \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC74C":e==="cancelled"?"\uB9AC\uBDF0 \uC138\uC158 \uCDE8\uC18C\uB428":e.startsWith("launch_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uC2DC\uC791 \uC2E4\uD328(${e.slice(14)})`:e.startsWith("session_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uBE44\uC815\uC0C1 \uC885\uB8CC(${e.slice(15)})`:`\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD328(${e})`}function yf(e){if(e.startsWith("receipt_unbacked:"))return`\uC2E4\uD589 \uC601\uC218\uC99D \uC790\uB3D9 \uAC80\uC99D \uBD88\uAC00(${e.slice(17)}) \u2014 [\uBA38\uC9C0] \uD074\uB9AD\uC73C\uB85C \uC218\uB3D9 \uC9C4\uD589 \uAC00\uB2A5`;switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_rebase_cap":return"\uD050 \uC7AC\uCDA9\uB3CC 3\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"worktree_restore_branch_mismatch":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uBE0C\uB79C\uCE58 \uC774\uB984 \uBD88\uC77C\uCE58";case"worktree_restore_path_exists":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uACBD\uB85C \uC774\uBBF8 \uC788\uC74C";case"worktree_restore_branch_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 origin\uC5D0 \uBE0C\uB79C\uCE58 \uC5C6\uC74C";case"worktree_restore_branch_diverged":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uB85C\uCEEC \uBE0C\uB79C\uCE58\uAC00 origin\uACFC \uB2E4\uB984";case"worktree_restore_failed":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function pv(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function fv(e){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let t=e.slice(19);if(t.length===0)return null;switch(t){case"gating":return"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function _v(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}var mv=new Set(["paused","needs_human","waiting_metadata","reviewing","retrying"]),gv=new Set(["waiting_metadata","reviewing","retrying"]);function hv(e){let t=e&&typeof e=="object"?e.auto_resolution:null,n=t&&typeof t=="object"&&!Array.isArray(t)?t:null;if(!n||!e)return null;let r=typeof n.origin_reason=="string"&&n.origin_reason.length>0?`\uC6D0 \uC0AC\uC720: ${n.origin_reason}`:"";switch(e.phase){case"waiting_metadata":return{label:"\uC815\uC815 \uB300\uAE30",details:[r,"\uBA54\uD0C0\uB370\uC774\uD130 \uC815\uC815\uC774 \uAD00\uCE21\uB418\uBA74 \uC790\uB3D9 \uC7AC\uAC1C"].filter(Boolean),live:!1};case"retrying":{let o=Number.isInteger(n.attempts)?Math.max(0,Number(n.attempts)):0,s=Number.isInteger(n.attempt_cap)&&Number(n.attempt_cap)>0?Number(n.attempt_cap):0,i=typeof n.next_at=="number"?Yt(n.next_at):"",l=typeof n.last_error=="string"&&n.last_error.length>0?n.last_error:"";return{label:s>0?`\uC7AC\uC2DC\uB3C4 ${Math.min(o,s)}/${s}`:`\uC7AC\uC2DC\uB3C4 ${o}`,details:[r,i?`\uB2E4\uC74C \uC2DC\uAC01 ${i}`:"",l?`\uB9C8\uC9C0\uB9C9 \uC624\uB958: ${l}`:""].filter(Boolean),live:!0}}default:return null}}function bv(e){if(typeof e!="string")return"";for(let t of["retry_exhausted:","auto_review_exhausted:"])if(e.startsWith(t))return e.slice(t.length);return""}function yv(e,t=null){if(!e||typeof e!="object")return null;let n="";switch(e.phase){case"gating":n="\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"merging":n="\uBA38\uC9C0 \uC911";break;case"cleaning":n="\uB9C8\uBB34\uB9AC \uC911";break;case"waiting_metadata":case"reviewing":case"retrying":if(!t)return null;n=t.label;break;case"paused":n="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":n="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let r=[n];e.head_sha&&r.push(`head ${e.head_sha}`),e.base_sha&&r.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&r.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`);let o=bv(e.terminal_reason);o&&r.push(`\uC6D0 \uC0AC\uC720: ${o}`);let s=e.phase==="needs_human"&&!o?Er(e.terminal_reason):null;s&&r.push(e.failure_stage?`${e.failure_stage} \xB7 ${s}`:s);for(let i of t?t.details:[])r.push(i);return e.active_attempt_id&&r.push(`attempt ${e.active_attempt_id}`),e.evidence&&r.push(e.evidence),e.log_path&&r.push(e.log_path),{badge:n,title:r.join(`
`),alert:e.phase==="needs_human",lock_actions:!mv.has(e.phase)}}function vv(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function kv(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",n=(s,i={})=>{let l=[i.title||"",t].filter(Boolean);return{label:s,title:l.join(`
`),live:i.live===!0,alert:i.alert===!0}};if(e.continuation_required)return n("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.queueing)return e.queueing==="cleanup"?n("\uC815\uB9AC \uC7AC\uAC1C \uC694\uCCAD \uC911",{title:"\uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9AC\uB294 \uC911\uC785\uB2C8\uB2E4",live:!0}):n("\uD050 \uB4F1\uB85D \uC911",{title:"\uBA38\uC9C0 \uD050\uC5D0 \uB123\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.merge_step)return e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):n("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return n(e.conflict_badge,{live:e.conflict_live===!0});if(e.auto_resolution)return n(e.auto_resolution.label,{title:e.auto_resolution.details.join(`
`),live:e.auto_resolution.live===!0});if(e.recovery?.lock_actions)return n(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return n(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return n("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});let r=vv(e.receipt_check),o=e.conflicting||e.gate?.reason==="base_behind"||r.length>0;if(e.auto_pending&&o)return n("\uD655\uC778 \uC911",{title:"\uBA38\uC9C0 \uD050\uAC00 \uC790\uB3D9\uC73C\uB85C \uCC98\uB9AC \uC911 \u2014 \uB2E4\uC74C \uAD00\uCE21\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.conflicting)return n("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="base_behind")return n("base \uAC31\uC2E0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale"){let s=e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uC785\uB2C8\uB2E4. [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4";return e.review_session?.active===!0?n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911",{title:`${s}
\uB9AC\uBDF0 \uC138\uC158\uC774 \uC2E4\uD589 \uC911\uC785\uB2C8\uB2E4 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4`,live:!0}):e.review_session?.failure?n(`\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 ${dv(e.review_session.failure)}`,{title:`${s}
\uC9C1\uC804 \uB9AC\uBDF0 \uC138\uC158 \uC885\uB8CC \uC0AC\uC720: ${e.review_session.failure}`,alert:!0}):n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:s,alert:!0})}return e.gate?.reason==="spec_id_missing"?n("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0}):e.gate?.reason==="review_receipt_invalid"?n("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0}):r.length>0?n(`\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694 \xB7 ${r[0]}`,{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${r.join(", ")}`,alert:!0}):e.recovery?n(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?n("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?n(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${yf(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?n(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${yf(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?n(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?n("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?n("\uB2EB\uD798",{alert:!0}):e.activity?n("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?n("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?n("\uD655\uC778 \uC911"):e.gate?.gate_badge?n(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function wv(e,t,n,r,o=null,s=null,i=null,l=!1,a=null,u=!0,d=null,p=null,b=null,m={},$=!1,C=!1,j={},K=null,ie={active:!1,failure:null}){let ee=!!a&&a.position>0,F=!!a?.continuation_action&&a.continuation_action.continuation===null,P=!!a&&a.active===!0,L=a&&a.failure||null,z=fv(a?a.waiting:null),V=n[e]||null,ne=V&&V.gate?V.gate:null,N=V&&V.pr?V.pr:null,Q=_v(a?a.resolution:null),G=hv(b),X=yv(b,G),Re=a&&a.authority||null,we=!!b&&typeof b=="object"&&gv.has(b.phase),ce=ee&&!P&&(!Re||we||Re.source==="automatic"&&!C),q=i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":Q?Q.badge:i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":z,$e=!!ne&&ne.base_badge==="\uCDA9\uB3CC",Se=!!ne&&ne.enabled===!0,S=Ro({bead_id:e,merge_sha:j.merge_sha,cleanup_cursor:j.cleanup_cursor,merge_progress:s&&s.merge_progress?s.merge_progress:null,cleanup_failed:r,repo_operations:j.repo_operations}),Z=Zs(S),Te=s&&!S&&(s.queueing??null)?s.queueing:null,_e=!!r&&["repo_operations","child_sweep","branch_cleanup","parent_close"].includes(r.step)&&!!ne&&ne.tier==="merged",xe=r&&r.step==="repo_operations"&&S?.failed===!0&&(S.step==="deploy"||S.step==="verify")?S.step:null,ge=l&&!!r&&!!ne&&ne.tier==="merged",je=ce&&(Se||$e||ne?.reason==="base_behind"||ne?.reason==="review_receipt_missing"||ne?.reason==="review_receipt_stale"||_e||ge),ft=ne?.reason==="review_receipt_missing"||ne?.reason==="review_receipt_stale",Le=l&&$e&&u===!1,U=Kn(m,e,{external:l,merge_active:P||S?.step==="merge",merge_queued:ee,conflict_active:!!i,cleanup_active:Z,merged:!!r||ne?.tier==="merged"}),de=!!U.operation,se=ee&&!L&&!F&&!_e&&!(X&&X.lock_actions),ae=kv({auto_pending:se,continuation_required:F,queueing:Te,merge_step:S,conflict_badge:q,conflict_live:Q?.live===!0||i==="running",auto_resolution:G,recovery:X,cleanup_failed:r,cleanup_label:r?wr(r.step):null,base_exception:p,conflicting:$e,gate:ne,receipt_check:V&&V.receipt_check?V.receipt_check:null,queue_failure:L,auto_skip:d,queued:ee,queue_active:P,queue_position:a?a.position:0,review_session:ie,activity:q?null:s&&s.activity||null}),Ee=ae?.live===!0&&ae.title?c`<span title=${ae.title}>${ae.label}</span>`:ae?.label||null;return{id:e,title:l?c`${t}<span class="muted"> · 세션</span>`:t,reason:r&&S?.active!==!0?Xs(r.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:$,...K?{dependency_chips:K}:{},external:l,pr_number:N&&typeof N.number=="number"?N.number:null,pr_url:N&&typeof N.url=="string"?N.url:"",completion_badge:ae?.live!==!0&&ae?.title?ae.label:null,completion_title:ae?.title||"",...b?.phase==="needs_human"&&typeof b.log_path=="string"&&b.log_path.length>0?{log_path:b.log_path}:{},badges:Ee?[Ee]:[],live_badge:ae?.live===!0?Ee:null,usage:o,alert:ae?.alert===!0,merge_action:ne?.tier==="merged"&&!_e&&!ge?!1:!ee||F||ce||ft,cancel_action:ee&&!F,cancel_enabled:!P&&!(X&&X.lock_actions),cancel_title:X&&X.lock_actions?`${X.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:P?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:U,discard_action:U.action,merge_step:S,discard_enabled:U.enabled,discard_title:U.title,merge_enabled:!S&&!Te&&!i&&!de&&!p&&!(X&&X.lock_actions)&&!Le&&ie.active!==!0&&(Se||$e||ne?.reason==="base_behind"||ne?.reason==="review_receipt_missing"||ne?.reason==="review_receipt_stale"||_e||ge||je||we&&!P),merge_label:F?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":_e||ge?xe==="deploy"?"\uBC30\uD3EC \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":xe==="verify"?"\uAC80\uC99D \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":"\uC815\uB9AC \uC7AC\uAC1C":$e&&!S&&!_e?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":ne?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":ne?.reason==="review_receipt_missing"||ne?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":ce?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:de?U.error?`\uD3D0\uAE30 \uC2E4\uD328: ${U.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${U.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:F?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Te?"\uC694\uCCAD\uC744 \uBCF4\uB0B4\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":S?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${S.label}`:xe?`\uBA38\uC9C0 \uC644\uB8CC \u2014 ${xe==="deploy"?"\uBC30\uD3EC":"\uAC80\uC99D"} \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD574 \uC815\uB9AC\uAC00 \uBA48\uCDC4\uC2B5\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uC800\uC7A5\uC18C \uC791\uC5C5\uBD80\uD130 \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4`:ge?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Le?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":_e?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":$e?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":ne?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":ie.active===!0?"\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":ne?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uB9AC\uBDF0\uB9CC \uC218\uD589\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":ne?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":ne?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":Se?`\uBA38\uC9C0 (${ne.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:ne&&ne.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${ne&&ne.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function fl(e,t={}){let{transport:n,issueStores:r,queueStore:o,sessionLogStore:s,gotoIssue:i,getWorkspacePath:l,switchWorkspace:a,openDoc:u,doneRange:d,onDoneRangeChange:p}=t,b=r?qr(r):null,m=iv(),$=null,C=null,j=null,K={members_by_id:new Map,serial_raw_lengths:{},serial_lane_count:0,occupied_lanes:new Set},ie=new Map,ee=new Map,F=Zp(),P=ul(F)===null,L=d?In(d):cv();function z(){let w=Lr.find(v=>v.value===L);return w?w.label:"\uC624\uB298"}let V=xi("beads-ui.worker.lane-collapsed"),ne=!1,N=new Set,Q=new Set,G=new Set,X=new Set,Re=new Set,we=null,ce=[],q=gf({queueStore:o,issueStores:r,transport:n,getWorkspacePath:l,onInvalidate:()=>ue()});function $e(){q.refreshSessionDefaults()}let Se=document.createElement("div");Se.className="worker-console";let S=document.createElement("div");S.className="worker-top";let Z=document.createElement("div");Z.className="worker-drawer-overlay",Z.hidden=!0;let Te=document.createElement("div");Te.className="worker-drawer-overlay__backdrop";let _e=document.createElement("div");_e.className="worker-drawer-host";let xe=document.createElement("div");xe.className="worker-drawer-host",xe.hidden=!0,Z.append(Te,_e,xe);let ge=document.createElement("div");ge.className="worker-lanes-host",Se.append(S,Z,ge),e.appendChild(Se);let je=ar(null,null),ft=[],Le=Si({transport:n,console_el:Se,getLanes:()=>je,getWorkspaces:()=>ft,getCrossLanes:()=>null,reproject:()=>({lanes:at(),raw_lanes:null}),onCorrection:()=>{},showToast:pe,requestRender:()=>ue(),adoptQueue:(w,v)=>{o&&o.set(v)},onDragBegin:()=>{$=null}}),U=null,de=no(_e,{transport:n,sessionLogStore:s,onClose:()=>{U=null,Z.hidden=!0,ue()}}),se=_f(xe,{onClose:()=>{xe.hidden=!0,Z.hidden=!0,ue()}}),ae=sf({getWorkspacePath:l||(()=>"")}),Ee=l&&l()||"",me=lf({queueStore:o,transport:n,onChanged:()=>ue(),onOpenScript:(w,v)=>{ae.open(w,v)}});function Oe(){return o&&o.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:Ii,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function Qe(){let w=Oe(),v=typeof w.serial_lane_count=="number"&&Number.isInteger(w.serial_lane_count)&&w.serial_lane_count>0?Math.min(w.serial_lane_count,5):0,A=Array.isArray(w.serial_lanes)?w.serial_lanes:[],oe=[];for(let We of A){if(oe.length>=v)break;!We||typeof We.id!="string"||!/^s[1-5]$/.test(We.id)||!Array.isArray(We.entries)||oe.push({id:We.id,label:`\uC9C1\uB82C ${We.id.slice(1)}`,count:We.entries.length})}return oe.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(w.queue)?w.queue:[]).length},...oe]}function He(w){if(!$||!w.some(A=>A.id===$))return null;let v=Qe();return v?{bead_id:$,lanes:v}:null}function Be(){return l&&l()||""}async function te(w,v){await Le.sendOp({type:"worker-queue-place",payload:{bead_id:w,...v==="parallel"?{}:{lane:v}},root_dir:Be()},w)}function H(){let w=Oe();return typeof w.revision=="number"?w.revision:0}function Ae(w){w&&w.queue&&o&&o.set(w.queue)}async function ut(w){if(!n||!w)return;let v=await n("worker-attempt-pause",{attempt_id:w});v&&v.paused===!1&&v.reason&&pe(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${v.reason}`,"error",2400)}async function x(w){if(!n||!w)return;let v=await Ur();if(v===null)return;let A=async(ye={})=>await n("worker-attempt-resume",{attempt_id:w,expected_revision:H(),...v!==""?{instructions:v}:{},...ye}),oe=await A();Ae(oe),oe&&oe.conflict&&(oe=await A(),Ae(oe)),oe=await Un(oe,(ye,We)=>A({continuation:ye,decision_token:We}),{onResult:Ae,refresh:()=>A()}),oe&&oe.resumed===!1&&!oe.conflict&&oe.reason&&pe(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${oe.reason}`,"error",2400)}async function W(w,v,A=!0){if(!n)return null;let oe=n,ye=await oe(w,{...v,expected_revision:H()});return Ae(ye),ye&&ye.conflict&&A&&(ye=await oe(w,{...v,expected_revision:H()}),Ae(ye)),ye}async function be(w){if(!n||!w)return;let v=Oe().merge_queue?.find(oe=>oe.bead_id===w)?.continuation_action;if(v?.mismatch&&v.continuation===null){await dt(w,v.mismatch);return}N.add(w),ue();let A;try{A=await W("worker-merge-queue-add",{bead_id:w})}catch{pe("\uBA38\uC9C0 \uD074\uB9AD\uC774 \uC11C\uBC84\uC5D0 \uC804\uB2EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4(\uC5F0\uACB0 \uBB38\uC81C) \u2014 \uC5F0\uACB0 \uBCF5\uAD6C \uD6C4 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",3200);return}finally{N.delete(w),ue()}if(!(!A||A.applied)){if(A.conflict){pe("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}pe(pv(A.reason),"error",2400)}}async function Ie(w){if(!(!n||!w||Q.has(w))){Q.add(w),ue();try{let v=await n("worker-cleanup-retry",{bead_id:w,expected_revision:H()});Ae(v),v&&!v.retried&&!v.conflict&&v.reason&&pe(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${v.reason}`,"error",2400)}finally{Q.delete(w),ue()}}}async function Ne(w,v){let A=Oe().hold;if(!n||!A||typeof A.since!="number")return;let oe=await n(w,{since:A.since});Ae(oe),oe&&oe.ok===!1&&pe(`${v}: ${oe.reason==="hold_changed"?"\uD050 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694":oe.reason||""}`,"error",2800)}async function Fe(w,v){if(!n||!w||!v)return;let A=await n("worker-parked-retry",{bead_id:w,attempt_id:v});Ae(A),A&&A.ok===!1&&pe(`\uC7AC\uC2DC\uB3C4 \uAC70\uBD80: ${A.reason==="not_latest"?"\uC774 bead\uC5D0 \uB354 \uC0C8\uB85C\uC6B4 \uC2DC\uB3C4\uAC00 \uC788\uC2B5\uB2C8\uB2E4":A.reason||""}`,"error",2800)}async function dt(w,v){let A=await Un({continuation_mismatch:v},(ye,We)=>W("worker-merge-queue-add",{bead_id:w,continuation:ye,decision_token:We},!1)),oe=A?.queue?.merge_queue?.find(ye=>ye.bead_id===w)?.continuation_action;if(A?.applied!==!0&&oe?.continuation===null&&oe.mismatch){await dt(w,oe.mismatch);return}A&&A.applied===!1&&!A.conflict&&pe("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function At(w){if(!n)return;let v=await W("worker-merge-auto-toggle",{on:w});!v||v.conflict||pe(w?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",w?"success":"info",2400)}async function Mt(w){if(!n||!w)return;let v=await W("worker-merge-queue-remove",{bead_id:w});v&&!v.conflict&&!v.applied&&v.reason==="merge_active"&&pe("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function zt(){await W("worker-merge-queue-remove",{all:!0})}async function Ot(w,v=null,A="unmerged",oe=null){if(!n||!w)return;let ye=Eo(w,A);if(!(!!oe||typeof globalThis.confirm!="function"||globalThis.confirm(ye)))return;let nt=await n("worker-discard",{bead_id:w,...v?{attempt_id:v}:{},...oe?{operation_id:oe}:{},expected_revision:H()});if(Ae(nt),nt&&nt.conflict&&(nt=await n("worker-discard",{bead_id:w,...v?{attempt_id:v}:{},...oe?{operation_id:oe}:{},expected_revision:H()}),Ae(nt)),nt&&nt.discarded===!0){pe(Bs(nt),"success",5e3);return}if(nt&&nt.reason){pe(`\uD3D0\uAE30 \uC2E4\uD328: ${nt.reason}`,"error",2800);return}if(nt&&nt.accepted&&nt.pending==="merged_revert"){pe("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(nt&&nt.accepted&&!nt.discarded){pe(`\uD3D0\uAE30 \uC9C4\uD589: ${nt.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}nt&&!nt.conflict&&pe("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function _t(w,v,A){if(!(!n||!v||!A||X.has(v))){X.add(v),ue();try{let oe=await n(w,{bead_id:v,action_id:A,expected_revision:H()});Ae(oe),oe?.conflict?pe("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!oe?.ok&&oe?.reason&&pe(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(oe.reason)}`,"error",2800)}finally{X.delete(v),ue()}}}async function ze(w,v){if(!n||!v||G.has(v))return;G.add(v),ue();let A;try{let oe=async(ye={})=>await n(w,{bead_id:v,expected_revision:H(),...ye});A=await oe(),Ae(A),A&&A.conflict&&(A=await n(w,{bead_id:v,expected_revision:H()}),Ae(A)),w==="worker-revise-fix"&&(A=await Un(A,(ye,We)=>oe({continuation:ye,decision_token:We}),{onResult:Ae,refresh:()=>oe()}))}finally{G.delete(v),ue()}if(!(!A||A.conflict)){if(A.ok){pe(w==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}pe(`\uCC98\uBD84 \uAC70\uBD80: ${A.reason||""}`,"error",3e3)}}async function O(w){if(!n)return;let v=await n("worker-automation-toggle",{on:w,expected_revision:H()});Ae(v),v&&v.conflict&&await n("worker-automation-toggle",{on:w,expected_revision:H()}).then(Ae)}async function re(w){if(!n||!w)return;let v=await n("worker-repo-operation-dismiss",{operation_id:w});Ae(v),v&&v.ok===!1&&pe(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${v.reason||""}`,"error",3e3)}async function he(w){if(!n||!Number.isFinite(w))return;let v=Math.max(Ii,Math.floor(w)),A=await n("worker-queue-set-slots",{slots:v,expected_revision:H()});Ae(A),A&&A.conflict&&await n("worker-queue-set-slots",{slots:v,expected_revision:H()}).then(Ae)}async function T(w){if(!n||!Number.isInteger(w)||w<1||w>hf)return;let v=Oe(),A=(Array.isArray(v.serial_lanes)?v.serial_lanes:[]).slice(w).reduce((We,nt)=>We+(Array.isArray(nt?.entries)?nt.entries.length:0),0),oe=()=>({count:w,expected_revision:H()}),ye=await n("worker-queue-set-serial-lane-count",oe());Ae(ye),ye&&ye.conflict&&(ye=await n("worker-queue-set-serial-lane-count",oe()),Ae(ye)),ye&&ye.applied&&A>0&&pe(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${A}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}let J="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C";function Pe(w,v){let A=sl(w,v.id,K);return{id:v.id,title:v.title,location_label:v.location_label,prefixes:v.prefixes,action:A.kind==="note"?{kind:"note",text:A.text}:A.kind==="disabled"?{kind:"disabled",label:J,title:A.title}:{kind:"place",label:J,title:A.title}}}function Ye(w,v){if(!C||C.bead_id!==w)return null;let A=C.counterpart_id,oe=v.filter(ye=>ye.id===A);return oe.length===0?null:{rows:oe.map(ye=>Pe(w,ye))}}async function qe(w,v){let A=sl(w,v,K);if(C=null,A.kind!=="ops"){ue();return}let oe=H();for(let ye of A.ops){let We=await it(ye,oe);if(We===null)break;oe=We}ue()}async function it(w,v){if(!n)return null;try{let A=await n("worker-queue-place",{bead_id:w.bead_id,lane:w.lane,index:w.index,expected_revision:v});if(Ae(A),A&&A.conflict)return pe("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!A||A.applied!==!0)return pe(A&&typeof A.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${A.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let oe=A.queue?A.queue.revision:void 0;return typeof oe!="number"?(pe("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):oe}catch(A){return pe(A instanceof Error&&A.message?A.message:"\uD050 \uC694\uCCAD \uC2E4\uD328","error"),null}}function at(){let w=hr(L),v=q.read({candidate_sort:F,done_since:w});return ft=v.workspaces,je=ar(v.workspaces,v.workspaces_state,{done_since:w,candidate_filter:m,candidate_hidden_counts:"per_control",candidate_sort:"as_given",groups:"all"}),je}function Ue(w){return w.queue_groups[0]||sv}function tt(w){let v=w.dependency_chips||null,A={...v&&v.released?{released:v.released}:{},...v&&v.dependents?{dependents:v.dependents}:{}},oe=ie.get(w.id),ye=ee.get(w.id)||null,We=oe&&oe.overlaps.length>0?oe.overlaps:null,nt=!!oe&&oe.scope_missing;if(!ye&&!We&&!nt&&Object.keys(A).length===0)return null;let vt=We?Ye(w.id,We):null;return{...A,...ye?{predecessors:ye}:{},...We?{overlaps:We}:{},...nt?{scope_missing:!0}:{},...vt?{popover:vt}:{}}}function kt(w){return{...w,workspace_name:"",done_layout:void 0,dependency_chips:tt(w)||void 0}}function Ge(){let w=Oe(),v=new Map;for(let A of Object.values(dn(w.lane_states))){let oe=Array.isArray(A?.corrections)?A.corrections:[];for(let ye of oe)ye&&typeof ye.bead_id=="string"&&typeof ye.after=="string"&&v.set(ye.bead_id,ye.after)}return{admission:dn(w.admission),bead_labels:dn(w.bead_labels),correction_after:v}}function Tt(w,v){let A=kt(w),oe=uu(v.admission[w.id]||null,!!w.discard||X.has(w.id)),ye=v.bead_labels[w.id],We=v.correction_after.get(w.id);return{...A,draggable:A.draggable===!0&&!oe,stale_work:oe,reason:oe?"":A.reason,worker_serial:Array.isArray(ye)&&Gp(ye),badges:We?[`\u{1F517} ${We} \uB4A4 (blocks \uC790\uB3D9)`,...A.badges||[]]:A.badges,revise_enabled:A.revise_enabled===!0&&!G.has(w.id)}}function Xe(w){let v=Ge();return Ue(w).sublanes.parallel.map(A=>Tt(A,v))}function pt(w){let v=Ge();return Ue(w).sublanes.serial.map(A=>{let oe=A.occupants.map(ye=>({id:ye.id,title:ye.title,draggable:!1,lane:A.id,ghost:!0,badges:[ye.badge]}));return{id:A.id,index:A.index+1,raw_length:A.raw_length,ghosts:oe,items:A.items.map(ye=>Tt(ye,v)),occupied:A.occupied_by.length>0,badge:A.occupants.length>0?A.occupants[0].badge:"\uB300\uAE30",cycle:A.cycle===!0}})}function jt(w){return w.runnable.map(v=>kt(v))}function Ct(w){return w.done.map(v=>kt(v))}function qt(w){let v=w.running.filter(A=>A.non_occupying!==!0).map(A=>({...A,bead_id:A.id,attempt_id:A.attempt_id||"",paused:A.run_state==="paused",failed:A.run_state==="failed",parked:A.run_state==="parked",retry_wait:A.run_state==="retry_wait",status_label:A.run_state==="failed"?A.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328":A.run_state==="parked"?"\uC138\uC158 \uB300\uAE30":A.run_state==="retry_wait"?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":void 0,can_pause:A.can_pause!==!1,workspace_name:"",dependency_chips:tt(A)||void 0,rollup_expanded:Re.has(A.id),failure:A.failure?{...A.failure,open:j===A.attempt_id}:null}));return[...v.filter(A=>A.failed===!0),...v.filter(A=>A.failed!==!0&&A.parked===!0),...v.filter(A=>A.failed!==!0&&A.parked!==!0)]}function Bt(w){if(we&&we.model===w)return we.rows;let v=Oe(),A=Ue(w),oe=dn(v.attempts),ye=Object.values(oe).filter(Hn),We=new Map;for(let Je of ye)We.set(Je.attempt_id,Je);let nt=new Map;for(let Je of ye)nt.set(Je.bead_id,Je);let vt=new Map;for(let Je of[...w.pr_wait,...w.running,...w.queue,...w.runnable,...w.done])vt.has(Je.id)||vt.set(Je.id,Je);let Ve=Je=>{let Ut=null;for(let bn of ye)!bn||bn.bead_id!==Je||$a(bn,We)||(Ut===null||(typeof bn.started_at=="number"?bn.started_at:0)>=(typeof Ut.started_at=="number"?Ut.started_at:0))&&(Ut=bn);return Ut&&typeof Ut.target_base=="string"?Ut.target_base:null},Pt=new Map;for(let Je of w.running)Je.run_state==="failed"||Je.conflict_resolution!==!0||(Je.run_state!=="paused"?Pt.set(Je.id,"running"):Pt.has(Je.id)||Pt.set(Je.id,"paused"));let Jt=dn(v.auto_merge_skips),Rn=new Set(A.merge.auto_excluded),Zn=dn(v.pr_observations),On=dn(v.pr_activity),qn=dn(v.cleanup_failed),Xt=dn(v.discard_operations),Jn=dn(v.bead_workflow),Rr=dn(v.bead_titles),Ln=v.merge_queue_state||{active:null,failures:{}},Fn=A.merge.state.waiting,er=(Array.isArray(v.pr_wait)?v.pr_wait:[]).map(Je=>{let Ut=vt.get(Je.bead_id);return{...wv(Je.bead_id,Ut?.title||Rr[Je.bead_id]||Je.bead_id,Zn,qn[Je.bead_id]||null,zn(oe,Je.bead_id),On[Je.bead_id]||(N.has(Je.bead_id)?{activity:null,merge_progress:null,queueing:"merge"}:Q.has(Je.bead_id)?{activity:null,merge_progress:null,queueing:"cleanup"}:null),Pt.get(Je.bead_id)||null,Je.external===!0,{position:A.merge.positions.get(Je.bead_id)||0,active:Ln.active===Je.bead_id,failure:dn(Ln.failures)[Je.bead_id]||null,waiting:Fn&&Fn.bead_id===Je.bead_id?Fn.reason:null,resolution:A.merge.resolutions.get(Je.bead_id),continuation_action:A.merge.continuations.get(Je.bead_id),authority:A.merge.authorities.get(Je.bead_id)||null},Je.wt_present!==!1,v.auto_merge===!0&&Rn.has(Je.bead_id)?Jt[Je.bead_id]?.reason||"":null,wa(A.declared_base,Ve(Je.bead_id)),dn(v.completion_status)[Je.bead_id]||null,Xt,nt.get(Je.bead_id)?.worker_serial===!0,v.auto_merge===!0,{merge_sha:Je.merge_sha,cleanup_cursor:Je.cleanup_cursor,repo_operations:A.repo_operations},Ut?tt(Ut):null,iu(oe,Je.bead_id)),workflow:Jn[Je.bead_id]||null,priority:Ut?.priority,from_id:Ut?.from_id,...Ut?.created_at===void 0?{}:{created_at:Ut.created_at},...Ut?.updated_at===void 0?{}:{updated_at:Ut.updated_at}}});return we={model:w,rows:er},er}function pn(w){let v=Ue(w),A=[];for(let Ve of w.running)Ve.non_occupying!==!0&&A.push({id:Ve.id,title:Ve.title,location_label:"\uC2E4\uD589\uC911",kind:"running",lane_id:Ve.serial_lane_id??null});for(let Ve of w.pr_wait)A.push({id:Ve.id,title:Ve.title,location_label:"PR \uB300\uAE30",kind:"pr_wait",lane_id:null});for(let Ve of v.sublanes.serial)Ve.items.forEach((Pt,Jt)=>{A.push({id:Pt.id,title:Pt.title,location_label:`${Ve.id} #${Jt+1}`,kind:"serial",lane_id:Ve.id})});v.sublanes.parallel.forEach((Ve,Pt)=>{A.push({id:Ve.id,title:Ve.title,location_label:`#${Pt+1}`,kind:"parallel",lane_id:null})});for(let Ve of w.runnable)A.push({id:Ve.id,title:Ve.title,location_label:"\uD6C4\uBCF4",kind:"candidate",lane_id:null,queue_placeable:Ve.queue_placeable===!0});let oe=new Map;for(let Ve of A)oe.has(Ve.id)||oe.set(Ve.id,Ve);let ye={},We=new Set;for(let Ve of v.sublanes.serial)ye[Ve.id]=Ve.raw_length,Ve.occupied_by.length>0&&We.add(Ve.id);K={members_by_id:oe,serial_raw_lengths:ye,serial_lane_count:v.serial_lane_count,occupied_lanes:We};let nt=Oe();ie=Vd(nt.bead_scope,A);let vt=new Map;for(let Ve of[...w.running,...w.runnable])Array.isArray(Ve.blocked_by)&&Ve.blocked_by.length>0&&vt.set(Ve.id,Ve.blocked_by);for(let[Ve,Pt]of Object.entries(dn(nt.bead_blocked_by)))Array.isArray(Pt)&&vt.set(Ve,Pt.filter(Jt=>typeof Jt=="string"&&Jt.length>0));ee=bu(vt,A,dn(nt.blocker_workspaces))}function Vt(w){let v=w.hold&&typeof w.hold=="object"?w.hold:null;if(!v||v.kind!=="env"&&v.kind!=="systemic")return"";let A=cr(v.cause)||String(v.cause||""),oe=Array.isArray(w.lineages)?w.lineages:[];if(v.kind==="env"){let We=oe.map(vt=>vt&&vt.next_at).filter(vt=>typeof vt=="number").sort((vt,Ve)=>vt-Ve)[0],nt=typeof We=="number"?` \xB7 \uB2E4\uC74C ${new Date(We).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}`:"";return c`<div class="worker-hold worker-hold--env" role="status">
        <span class="worker-hold__text"
          >환경 보류: ${A} — 재시도 대기${nt}</span
        >
        <button
          type="button"
          class="worker-hold__retry"
          title="예약된 재시도를 지금 실행합니다"
        >
          지금 재시도
        </button>
      </div>`}let ye=(Array.isArray(v.bead_ids)?v.bead_ids:[]).filter(We=>typeof We=="string"&&We.length>0);return c`<div class="worker-hold worker-hold--systemic" role="alert">
      <span class="worker-hold__text"
        >${A}${ye.length>0?` \u2014 bead ${ye.join(", ")}`:""}</span
      >
      <button
        type="button"
        class="worker-hold__resume"
        title="정지를 풀고 멈춰 있던 bead를 다시 디스패치합니다"
      >
        재개
      </button>
    </div>`}function Qt(w){let v=Oe(),A=Ue(w),oe=A.sublanes.parallel,ye=oe.length>0?oe[0].id:"\u2014",We=c`<button
      type="button"
      class="worker-play${v.auto_advance?" is-active":""}"
    >
      ${v.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,nt=wt(w),vt=A.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",Ve=v.auto_advance?0:(Array.isArray(v.queue)?v.queue:[]).filter(Xt=>Xt&&typeof Xt.armed_by_lane=="string"&&Xt.armed_by_lane.length>0).length,Pt=Ve>0?c`<span
            class="worker-kpi__chip worker-kpi__chip--armed"
            title="모니터 연결 레인이 발차한 대기 행입니다 — 이 레포의 자동 진행은 꺼진 채입니다"
            >⏸ 자동 진행 꺼짐 · 연결 레인 ${Ve}건 진행 중</span
          >`:"",Jt=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${A.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${Bt(w).length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${z()} 완료 <b>${w.done.length}</b></span
      >`,Rn=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${A.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${A.declared_base||"?"}</span
    >`,Zn=c`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${Ii}
          step="1"
          .value=${String(A.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:hf},(Xt,Jn)=>Jn+1).map(Xt=>c`<option
                value=${String(Xt)}
                ?selected=${A.serial_lane_count===Xt}
              >
                ${Xt}
              </option>`)}
        </select>
      </label> `,On=lu(A.repo_operations,A.cleanup_failures),qn=Vt(v);return ne?c`<div class="worker-ribbon">
          ${We} ${nt}
          <div class="worker-kpi worker-kpi--ribbon">
            ${vt}${Pt}${Jt}
          </div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${Zn}</div>
          <div class="worker-kpi">${Rn}</div>
        </div>
        ${qn}${On}${me.template()}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${We}${nt}${Zn}</div>
        <div class="worker-kpi">
          ${vt}${Pt}${Jt}${Rn}
          ${(Array.isArray(A.token_total)?A.token_total:A.token_total?[{label:A.token_total,tooltip:`${z()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(Xt=>c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${Xt.tooltip}
                >${z()} 완료 · 누적 ${Xt.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${ye}</b></span
          >
        </div>
      </div>
      ${qn}${On}${me.template()}`}function Gt(w){let v=w.runnable_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${m.show_blocked}
        />
        🔒 blocked${v.blocked>0?` ${v.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${lv.map(A=>c`<button
              type="button"
              class="worker-filter__chip${m.spec===A.value?" is-active":""}"
              data-spec=${A.value}
              aria-pressed=${m.spec===A.value?"true":"false"}
            >
              ${A.label}
            </button>`)}
        ${v.spec>0?c`<span class="worker-filter__hidden">숨김 ${v.spec}</span>`:""}
      </div>
    </div>`}function Ft(){let w=P?"custom":ul(F)||"custom";return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${w}
    >
      ${es.map(v=>c`<option value=${v.id} ?selected=${w===v.id}>
            ${v.label}
          </option>`)}
      <option value="custom" ?selected=${w==="custom"}>
        사용자 지정…
      </option>
    </select>`}function Zt(){let w=ts(F);return c`<div
      class="worker-sort-chain"
      role="group"
      aria-label="후보 정렬 체인"
    >
      ${[0,1,2].map(v=>{let A=w[v];return c`<span class="worker-sort-chain__step">
          <select
            class="worker-sort-chain__key"
            data-step=${v}
            aria-label=${`${v+1}\uCC28 \uC815\uB82C \uD0A4`}
            .value=${A?A.key:""}
          >
            ${v===0?"":c`<option value="" ?selected=${!A}>없음</option>`}
            ${Xp.map(oe=>c`<option
                  value=${oe.key}
                  ?selected=${!!A&&A.key===oe.key}
                >
                  ${oe.label}
                </option>`)}
          </select>
          ${A?c`<button
                type="button"
                class="worker-sort-chain__dir"
                data-step=${v}
                aria-label=${A.dir==="asc"?"\uC624\uB984\uCC28\uC21C":"\uB0B4\uB9BC\uCC28\uC21C"}
                title=${A.dir==="asc"?"\uC624\uB984\uCC28\uC21C":"\uB0B4\uB9BC\uCC28\uC21C"}
              >
                ${A.dir==="asc"?"\u2191":"\u2193"}
              </button>`:""}
        </span>`})}
    </div>`}function Ht(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${L}
      >
        ${Lr.map(w=>c`<option value=${w.value} ?selected=${L===w.value}>
              ${w.label}
            </option>`)}
      </select>
    </div>`}function wt(w){let v=Ue(w).merge,A=Oe().auto_merge===!0;if(v.running)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${A?" is-active":""}"
        title=${A?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${A?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${v.positions.size}
      </button>`;if(A)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let oe=new Set(v.auto_excluded),ye=Bt(w).filter(We=>We.merge_action&&We.merge_enabled&&!oe.has(We.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${ye>0?` ${ye}`:""}
    </button>`}function rn(w){if(!(w.draggable!==!0||w.done===!0))return c`<span class="worker-mini__rowops">
      <button
        type="button"
        class="worker-mini__rowops-remove"
        data-action="queue-remove"
        data-bead-id=${w.id}
        title="대기에서 빼기"
        aria-label="대기에서 빼기"
      >
        ✕
      </button>
    </span>`}function ve(w,v){return c`<div
      data-bead-id=${w.id}
      data-drag-kind=${v.kind}
      data-root-dir=${v.root_dir}
      data-lane-id=${nn(v.lane_id)}
      data-row-index=${v.row_index}
      data-queue-index=${String(w.queue_index??0)}
    >
      ${xn(w,{actions:rn(w)})}
    </div>`}function E(w){let v=Xe(w),A=Be();return Ys({parallel:{rows:v.map((oe,ye)=>ve(oe,{kind:"parallel",root_dir:A,row_index:ye})),count:v.length,collapsed:V.isAreaCollapsed("parallel"),drop:{drop:"parallel",root_dir:A}},serial:{lanes:pt(w).map(oe=>({id:oe.id,title:`\uC9C1\uB82C ${oe.index}`,rows:[...oe.ghosts.map(ye=>xn(ye,{actions:rn(ye)})),...oe.items.map((ye,We)=>ve(ye,{kind:"repo-serial",root_dir:A,row_index:We,lane_id:oe.id}))],count:oe.ghosts.length+oe.items.length,empty:oe.ghosts.length+oe.items.length===0,badge:oe.badge,held:oe.occupied,cycle:oe.cycle,drop:{drop:"repo-serial",root_dir:A,lane_id:oe.id,lane_length:String(oe.raw_length)}})),collapsed:V.isAreaCollapsed("serial")}})}function fe(w){return sp(qt(w),Date.now(),U)}function k(w){return w.running.some(v=>v.kind!=="session"&&v.run_state==="running")}function I(w){let v=Ue(w),A=jt(w),oe=Xe(w),ye=Ct(w),We=Bt(w),nt=qt(w),vt=Dn({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4",items:A,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:Ft(),header_row:P?Zt():void 0,controls:Gt(w),collapsible:!0,collapsed:V.isCollapsed("candidate"),place_menu:He(A),onOpenDoc:u?(Pt,Jt)=>u(Jt):void 0}),Ve=Dn({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:ye,empty:`${z()} \uC644\uB8CC \uC5C6\uC74C`,header_control:Ht(),collapsible:!0,collapsed:V.isCollapsed("done"),preview:ne?Array.isArray(v.token_total)?v.token_total.map(Pt=>Pt.label).join(" \xB7 "):v.token_total||bf(ye):void 0});return ne?c`<div class="worker-lanes worker-lanes--mobile">
        ${Vs({live:k(w),running_body:nt.length>0?fe(w):"",pr_wait_rows:We.map(Pt=>xn(Pt)),count:nt.length+We.length})}
        ${Dn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:oe,count:oe.length,collapsible:!0,collapsed:V.isCollapsed("queue"),preview:bf(oe),body:E(w)})}
        ${vt} ${Ve}
      </div>`:c`<div class="worker-lanes">
      ${vt}
      ${Dn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:oe,count:oe.length,collapsible:!0,collapsed:V.isCollapsed("queue"),body:E(w)})}
      ${Dn({id:"worker-pane-running",lane:"running",title:"\uC2E4\uD589 \uC911",items:nt,header_control:c`<span class="worker-pane__meta"
          >슬롯 ${v.slots}</span
        >`,live:k(w),collapsible:!0,collapsed:V.isCollapsed("running"),body:fe(w)})}
      ${Dn({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:We,empty:"PR \uB300\uAE30 \uC5C6\uC74C",collapsible:!0,collapsed:V.isCollapsed("pr_wait")})}
      ${Ve}
    </div>`}function ke(w){V.toggle(w),ue()}function De(w){V.toggleArea(w),ue()}function ue(){let w=at();pn(w),lt(Qt(w),S),lt(I(w),ge)}function Ze(){let w=!0,v=$i(A=>{if(ne=A,w){w=!1;return}ue()});ce.push(v)}function yt(w){m=w,av(w),ue()}function gt(w){if(w==="custom"){P=!0,ue();return}F=Tr(w),dl(F),P=!1,ue()}function Ke(w){F=Tr({chain:w}),dl(F),ue()}function h(w){L=In(w),uv(L),p?.(L),ue()}function g(w){let v=w.target?.closest?.(".worker-serial-lane-count");if(v){let Ve=Number.parseInt(v.value,10);Number.isFinite(Ve)&&T(Ve).then(ue);return}let A=w.target?.closest?.(".worker-filter__blocked");if(A){yt({...m,show_blocked:A.checked});return}let oe=w.target?.closest?.(".worker-sort-chain__key");if(oe){let Ve=Number.parseInt(oe.getAttribute("data-step")||"",10);Number.isFinite(Ve)&&Ke(Jp(ts(F),Ve,oe.value));return}let ye=w.target?.closest?.(".worker-done-range");if(ye){h(ye.value);return}let We=w.target?.closest?.(".worker-sort");if(We){gt(We.value);return}let nt=w.target?.closest?.(".worker-slots__input");if(!nt)return;let vt=Number.parseInt(nt.value,10);if(!Number.isFinite(vt)){ue();return}he(vt).then(ue)}function R(w){return w?{runner:w.runner||void 0,model:w.model||void 0,effort:w.effort||void 0,worktree:w.worktree||void 0,status:w.status||void 0,session_id:w.session_id||void 0}:{}}function D(){let w=Ue(at()),v=Oe().workspace_info,A=v&&typeof v=="object"&&v.repo_ops&&typeof v.repo_ops=="object"?v.repo_ops:null;return{operations:w.repo_operations,cleanup_failures:w.cleanup_failures,repo:l&&l()||"",repo_ops:A}}function _(){U&&de.close(),xe.hidden=!1,Z.hidden=!1,se.open(D()),ue()}function y(w){let v=Oe(),A=v.attempts?v.attempts[w]:null;U=w,se.close(),xe.hidden=!0,Z.hidden=!1,de.open({attempt_id:w,meta:R(A)}),ue()}function Y(w){let v=Oe(),A=(Array.isArray(v.session_active)?v.session_active:[]).find(ye=>ye&&ye.bead_id===w),oe=(A&&Array.isArray(A.session_refs)?A.session_refs:[]).find(ye=>ye&&ye.current===!0);oe&&(se.close(),xe.hidden=!0,Z.hidden=!1,de.open(Wr(oe,w,"in_progress")),ue())}function le(){if(se.isOpen()&&se.refresh(D()),!U)return;let w=Oe(),v=w.attempts?w.attempts[U]:null;if(v){de.updateMeta(R(v));return}de.close()}function Me(w,v){if(w.length===0||!i)return;let A=l?l():void 0;if(v.length===0||!A||v===A||!a){i(w);return}Promise.resolve(a(v)).then(()=>{i(w)}).catch(()=>{pe("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})}function ct(w){let v=w.target;if(v?.closest?.(".worker-mini__serial, .worker-mini__grip"))return;let A=v?.closest?.(".worker-sort-chain__dir");if(A){let f=Number.parseInt(A.getAttribute("data-step")||"",10);Number.isFinite(f)&&Ke(ef(ts(F),f));return}let oe=v?.closest?.(".worker-dep__open");if(oe){Me(oe.getAttribute("data-dep-id")||"",oe.getAttribute("data-root-dir")||"");return}let ye=v?.closest?.(".mon-overlap__chip");if(ye){let f=ye.closest("[data-bead-id]"),B=f&&f.getAttribute("data-bead-id")||"";if(B){let M=ye.getAttribute("data-overlap-id")||"";C=!!C&&C.bead_id===B&&C.counterpart_id===M?null:{bead_id:B,counterpart_id:M},ue()}return}let We=v?.closest?.(".mon-overlap__place");if(We){let f=We.closest("[data-bead-id]"),B=f&&f.getAttribute("data-bead-id")||"";B&&qe(B,We.getAttribute("data-counterpart-id")||"");return}if(v?.closest?.(".mon-overlap__popover"))return;if(v?.closest?.(".worker-repo-strip")){_();return}let nt=v?.closest?.(".worker-repo-op__dismiss");if(nt){re(nt.dataset.operationId||"");return}let vt=v?.closest?.(".worker-cleanup__resume");if(vt){let f=vt.dataset.beadId;f&&Ie(f);return}if(v?.closest?.(".worker-hold__retry")){Ne("worker-queue-hold-retry-now","\uC9C0\uAE08 \uC7AC\uC2DC\uB3C4 \uAC70\uBD80");return}if(v?.closest?.(".worker-hold__resume")){Ne("worker-queue-hold-resume","\uC7AC\uAC1C \uAC70\uBD80");return}if(v?.closest?.(".worker-play")){O(!Oe().auto_advance);return}let Ve=v?.closest?.(".worker-merge-all");if(Ve){Ve.classList.contains("worker-merge-all--stop")?Oe().auto_merge===!0?At(!1):zt():At(!0);return}let Pt=v?.closest?.(".worker-pane__toggle[data-lane]");if(Pt){let f=Pt.dataset.lane;(f==="candidate"||f==="queue"||f==="running"||f==="pr_wait"||f==="done")&&ke(f);return}let Jt=v?.closest?.(".worker-wait__area-toggle[data-area]");if(Jt){let f=Jt.dataset.area;(f==="parallel"||f==="serial")&&De(f);return}let Rn=v?.closest?.(".worker-card__place-lane");if(Rn){let f=Rn.dataset.beadId,B=Rn.dataset.lane;f&&(B==="parallel"||/^s[1-5]$/.test(B||""))&&($=null,ue(),te(f,B));return}if(v?.closest?.(".worker-card__place-cancel")){$=null,ue();return}let On=v?.closest?.(".worker-card__place");if(On){let f=On.dataset.beadId;f&&!On.disabled&&(Qe()?($=f,ue()):te(f,"parallel"));return}let qn=v?.closest?.(".worker-filter__chip");if(qn){let f=qn.dataset.spec;(f==="all"||f==="with"||f==="without")&&yt({...m,spec:f});return}let Xt=v?.closest?.('[data-action="queue-remove"]');if(Xt){let f=Xt.dataset.beadId||"";f&&Le.sendOp({type:"worker-queue-remove",payload:{bead_id:f},root_dir:Be()},f);return}let Jn=v?.closest?.(".worker-mini__merge");if(Jn){let f=Jn.dataset.beadId||"";Oe().cleanup_failed?.[f]?Ie(f):be(f);return}let Rr=v?.closest?.(".worker-mini__merge-cancel");if(Rr){Mt(Rr.dataset.beadId||"");return}let Ln=v?.closest?.(".worker-mini__discard");if(Ln){Ot(Ln.dataset.beadId||"",Ln.dataset.attemptId||null,Ln.dataset.discardMode==="merged"?"merged":"unmerged",Ln.dataset.operationId||null);return}let Fn=v?.closest?.(".worker-mini__stale-continue");if(Fn){_t("worker-stale-work-continue",Fn.dataset.beadId||"",Fn.dataset.actionId||"");return}let er=v?.closest?.(".worker-mini__stale-backup");if(er){_t("worker-stale-work-backup-fresh",er.dataset.beadId||"",er.dataset.actionId||"");return}let Je=v?.closest?.(".worker-mini__stale-recheck");if(Je){_t("worker-stale-work-recheck",Je.dataset.beadId||"",Je.dataset.actionId||"");return}let Ut=v?.closest?.(".worker-mini__revise-fix");if(Ut){ze("worker-revise-fix",Ut.dataset.beadId||"");return}let bn=v?.closest?.(".worker-mini__revise-approve");if(bn){ze("worker-revise-approve",bn.dataset.beadId||"");return}if(v?.closest?.(".worker-mini__pr"))return;let ns=v?.closest?.(".rtile__failure-badge");if(ns){let f=ns.dataset.attemptId||"";j=j===f?null:f,ue();return}let rs=v?.closest?.(".rtile__attempt-copy");if(rs){let f=rs.dataset.attemptId||"";f&&sn(f).then(B=>{pe(B?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",B?"success":"error",1400)});return}if(v?.closest?.(".rtile__parked-retry")){let f=v?.closest?.(".rtile");Fe(f?.dataset?.beadId||"",f?.dataset?.attemptId||"");return}let oo=v?.closest?.(".rtile__discard");if(oo){let f=v?.closest?.(".rtile"),B=f?.dataset?.beadId,M=f?.dataset?.attemptId;B&&Ot(B,M||null,oo.dataset.confirmation==="merged"?"merged":"unmerged",oo.dataset.operationId||null);return}if(v?.closest?.(".rtile__pause")){let B=v?.closest?.(".rtile")?.dataset?.attemptId;B&&ut(B);return}if(v?.closest?.(".rtile__resume")){let B=v?.closest?.(".rtile")?.dataset?.attemptId;B&&x(B);return}if(v?.closest?.(".rtile__session")){let f=v?.closest?.(".rtile"),B=f?.dataset?.attemptId;if(B){y(B);return}let M=f?.dataset?.beadId;M&&Y(M);return}if(v?.closest?.(".rtile__failure-pop"))return;if(v?.closest?.(".worker-drawer-overlay__backdrop")){se.close(),de.close();return}if(v?.closest?.(".worker-drawer-host"))return;let os=v?.closest?.(".rtile .board-card__roll-toggle");if(os){let f=os.dataset.rollParent;f&&(Re.has(f)?Re.delete(f):Re.add(f),ue());return}let ss=v?.closest?.(".rtile .board-card__roll-child");if(ss){let f=ss.dataset.childId;f&&i&&i(f);return}let so=v?.closest?.(".rtile");if(so){if(v?.closest?.(".rtile__id")){let B=so.dataset.beadId;B&&sn(B).then(M=>{M?pe("\uBCF5\uC0AC\uB428","success",1200):pe("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let f=so.dataset.beadId;f&&i&&i(f);return}let rt=v?.closest?.(".worker-mini, .worker-card");if(rt){let f=rt.dataset.beadId;if(v?.closest?.('[data-seam="log-path-copy"]'))return;if(v?.closest?.(".worker-mini__id, .worker-card__id")){f&&sn(f).then(M=>{M?pe("\uBCF5\uC0AC\uB428","success",1200):pe("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let B=v?.closest?.(".ctl-chip--from");if(B){let M=B.dataset.fromId;M&&i&&i(M);return}f&&i&&i(f)}}Le.attach(e),e.addEventListener("click",ct),e.addEventListener("change",g);function Et(w){let v=w.target,A=v&&typeof v.closest=="function"?ye=>v.closest(ye):()=>null,oe=!1;C&&!A(".mon-overlap__popover, .mon-overlap__chip")&&(C=null,oe=!0),j&&!A(".rtile__failure-pop, .rtile__failure-badge")&&(j=null,oe=!0),oe&&ue()}function Nn(w){w.key!=="Escape"||!C&&j===null||(C=null,j=null,ue())}return document.addEventListener("click",Et),document.addEventListener("keydown",Nn),ce.push(()=>{document.removeEventListener("click",Et),document.removeEventListener("keydown",Nn)}),Ze(),b&&ce.push(b.subscribe(()=>{q.notifyIssuesChanged(),ue()})),o&&ce.push(o.subscribe(()=>{let w=l&&l()||"";w!==Ee&&(Ee=w,ae.close()),ue(),le()})),ue(),{load(){q.ensureSessionDefaults(),ue()},refreshSessionDefaults:$e,destroy(){for(let w of ce.splice(0))try{w()}catch{}Le.detach(),e.removeEventListener("click",ct),e.removeEventListener("change",g),q.destroy();try{de.destroy()}catch{}Z.hidden=!0;try{ae.destroy()}catch{}lt(c``,e)}}}function _l(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function wf(e,t,n,r=async()=>{},o=async()=>{}){let s=It("views:workspace-picker"),i=null,l=!1,a=!1,u=!1;async function d(L){let V=L.target.value,N=t.getState().workspace?.current?.path||"";if(V&&V!==N){s("switching workspace to %s",V),l=!0,P();try{await n(V)}catch(Q){s("workspace switch failed: %o",Q)}finally{l=!1,P()}}}async function p(){let L=t.getState(),z=L.workspace?.current?.path||L.workspace?.available?.[0]?.path||"";if(!(!z||a)){s("git-pulling workspace %s",z),a=!0,P();try{await r(z)}catch(V){s("workspace git pull failed: %o",V)}finally{a=!1,P()}}}function b(L){let z=L.target;z&&e.contains(z)||C()}function m(L){L.key==="Escape"&&C()}function $(){u||(u=!0,document.addEventListener("mousedown",b),document.addEventListener("keydown",m),P())}function C(){u&&(u=!1,document.removeEventListener("mousedown",b),document.removeEventListener("keydown",m),P())}function j(){u?C():$()}async function K(L){let z=L.target,V=z.value,ne=z.checked;s("toggling visibility %s \u2192 %s",V,String(ne));try{await o(V,ne)}catch(N){s("workspace visibility toggle failed: %o",N)}}function ie(L){return L?c`
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
    `:c``}function ee(L,z){return c`
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
                ${L.map(V=>c`
                    <label
                      class="workspace-picker__manage-row"
                      title="${V.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${V.path}"
                        .checked=${!z.has(V.path)}
                        @change=${K}
                      />
                      <span class="workspace-picker__manage-name"
                        >${_l(V.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function F(){let L=t.getState(),z=L.workspace?.current,V=L.workspace?.available||[],ne=new Set(L.workspace?.hidden||[]),N=z?.path||V[0]?.path||"";if(V.length===0)return c``;let Q=V.filter(G=>!ne.has(G.path)||G.path===N);if(Q.length<=1){let G=Q[0]||V[0],X=_l(G.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${G.path}"
            >${X}</span
          >
          ${ee(V,ne)}
          ${ie(N)}
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
          ${Q.map(G=>c`
              <option
                value="${G.path}"
                ?selected=${G.path===N}
                title="${G.path}"
              >
                ${_l(G.path)}
              </option>
            `)}
        </select>
        ${ee(V,ne)}
        ${ie(N)}
        ${l||a?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function P(){lt(F(),e)}return P(),i=t.subscribe(()=>P()),{destroy(){i&&(i(),i=null),document.removeEventListener("mousedown",b),document.removeEventListener("keydown",m),lt(c``,e)}}}var $f=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","get-workspace-accounts","set-workspace-accounts","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-dismiss","worker-repo-operation-deploy-run","worker-queue-set-slots","worker-queue-set-serial-lane-count","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-cleanup-retry","worker-parked-retry","worker-queue-hold-resume","worker-queue-hold-retry-now","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-bead-timeline","get-worker-system-prompt","get-session-refs","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"];function ml(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function xf(e,t,n=ml()){return{id:n,type:e,payload:t}}function Af(e={}){let t=It("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",o=null,s="closed",i=0,l=null,a=!0,u=new Map,d=[],p=new Map,b=new Set;function m(F){for(let P of Array.from(b))try{P(F)}catch{}}function $(){if(!a||l)return;s="reconnecting",t("ws reconnecting\u2026"),m(s);let F=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,i)),P=(n.jitterRatio||0)*F,L=Math.max(0,Math.round(F+(Math.random()*2-1)*P));t("ws retry in %d ms (attempt %d)",L,i+1),l=setTimeout(()=>{l=null,ee()},L)}function C(F){try{o?.send(JSON.stringify(F))}catch(P){t("ws send failed",P)}}function j(){for(s="open",t("ws open"),m(s),i=0;d.length;){let F=d.shift();F&&C(F)}}function K(F){let P;try{P=JSON.parse(String(F.data))}catch{t("ws received non-JSON message");return}if(!P||typeof P.id!="string"||typeof P.type!="string"){t("ws received invalid envelope");return}if(u.has(P.id)){let z=u.get(P.id);u.delete(P.id),P.ok?z?.resolve(P.payload):z?.reject(P.error||new Error("ws error"));return}let L=p.get(P.type);if(L&&L.size>0)for(let z of Array.from(L))try{z(P.payload)}catch(V){t("ws event handler error",V)}else t("ws received unhandled message type: %s",P.type)}function ie(){s="closed",t("ws closed"),m(s);for(let[F,P]of u.entries())P.reject(new Error("ws disconnected")),u.delete(F);i+=1,$()}function ee(){if(!a)return;let F=r();try{o=new WebSocket(F),t("ws connecting %s",F),s="connecting",m(s),o.addEventListener("open",j),o.addEventListener("message",K),o.addEventListener("error",()=>{}),o.addEventListener("close",ie)}catch(P){t("ws connect failed %o",P),$()}}return ee(),{send(F,P){if(!$f.includes(F))return Promise.reject(new Error(`unknown message type: ${F}`));let L=ml(),z=xf(F,P,L);return t("send %s id=%s",F,L),new Promise((V,ne)=>{u.set(L,{resolve:V,reject:ne,type:F}),o&&o.readyState===o.OPEN?C(z):(t("queue %s id=%s (state=%s)",F,L,s),d.push(z))})},on(F,P){p.has(F)||p.set(F,new Set);let L=p.get(F);return L?.add(P),()=>{L?.delete(P)}},onConnection(F){return b.add(F),()=>{b.delete(F)}},reconnect(){a=!0,l&&(clearTimeout(l),l=null),i=0,ee()},close(){a=!1,l&&(clearTimeout(l),l=null);try{o?.close()}catch{}},getState(){return s}}}function $v(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function xv(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var gl=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Sf=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],ur="tab:worker:closed",Av="bdui.worker.done-range",Ef=xp,Tf="worker:queue",Cf="ui:order",Rf="ui:display-policy",Of="exec:presets",dr="tab:board:closed",Lf="beads-ui.board.closed-range";function Sv(e){if(!e)return()=>{};function t(r){document.documentElement.style.setProperty("--app-header-h",`${Math.round(r)}px`)}if(t(e.getBoundingClientRect().height),typeof ResizeObserver!="function")return()=>{};let n=new ResizeObserver(r=>{for(let o of r)t(o.contentRect.height+Ev(e))});return n.observe(e),()=>n.disconnect()}function Ev(e){let t=getComputedStyle(e);return[t.paddingTop,t.paddingBottom,t.borderTopWidth,t.borderBottomWidth].reduce((r,o)=>r+(parseFloat(o)||0),0)}function Tv(e){let t=It("main");t("bootstrap start"),Sv(document.querySelector(".app-header"));let n=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;lt(n,e);let r=document.getElementById("global-nav"),o=document.getElementById("top-nav"),s=document.getElementById("repo-scope"),i=document.getElementById("usage-meter"),l=document.getElementById("board-root"),a=document.getElementById("worker-root"),u=document.getElementById("monitor-root"),d=document.getElementById("detail-panel");if(i&&zp(i),l&&a&&u&&d){let Te=function(_,y){let Y="Request failed",le="";if(_&&typeof _=="object"){let ct=_;if(typeof ct.message=="string"&&ct.message.length>0&&(Y=ct.message),typeof ct.details=="string")le=ct.details;else if(ct.details&&typeof ct.details=="object")try{le=JSON.stringify(ct.details,null,2)}catch{le=""}}else typeof _=="string"&&_.length>0&&(Y=_);let Me=y&&y.length>0?`Failed to load ${y}`:"Request failed";Z.open(Me,Y,le)},Ae=function(_){return`${ve.getState().workspace.current?.path||""}\0${_}`},ut=function(){Ee&&(Ee().catch(()=>{}),Ee=null),me=null,Oe=null},W=function(_){Qe=_;let y=()=>{Qe!==_||ve.getState().selected_id!==_||(Qe=null,x(_))};if(!te){Be.then(y);return}y()},Fe=function(_,y,Y,le,Me){return Y!==Ne[y]?(Me().catch(()=>{}),!1):(_.set(le,Me),!0)},At=function(){let _=ve.getState();ze(_.view==="board"),Pe(_.view==="worker"),tt(Ue(_)),qe(_.view==="board"||_.view==="worker"||dt||!!_.selected_id)},Ot=function(){let _=hr(Mt);return _===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:_}}},_t=function(){let _=hr(zt);return _===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:_}}},ze=function(_){if(_)for(let[y,Y]of gl){if(be.has(y)||Ie.has(y))continue;let le=y===dr?Ot():{type:Y};try{je.register(y,le)}catch(Et){t("register %s store failed: %o",y,Et)}Ie.add(y);let Me=Ne.board,ct=!1;ge.subscribeList(y,le).then(Et=>{ct=!Fe(be,"board",Me,y,Et)}).catch(Et=>{t("subscribe %s failed: %o",y,Et),Te(Et,"board")}).finally(()=>{Ie.delete(y),ct&&At()})}else he()},he=function(){Ne.board+=1;for(let[_]of gl){let y=be.get(_);y&&(y().catch(()=>{}),be.delete(_));try{je.unregister(_)}catch(Y){t("unregister %s failed: %o",_,Y)}}},Pe=function(_){if(!_){Ye();return}for(let[y,Y]of Sf){if(T.has(y)||Ie.has(y))continue;let le=y===ur?_t():{type:Y};try{je.register(y,le)}catch(Et){t("register %s store failed: %o",y,Et)}Ie.add(y);let Me=Ne.worker,ct=!1;ge.subscribeList(y,le).then(Et=>{ct=!Fe(T,"worker",Me,y,Et)}).catch(Et=>{t("subscribe %s failed: %o",y,Et),Te(Et,"worker")}).finally(()=>{Ie.delete(y),ct&&At()})}},Ye=function(){Ne.worker+=1;for(let[_]of Sf){let y=T.get(_);y&&(y().catch(()=>{}),T.delete(_));try{je.unregister(_)}catch(Y){t("unregister %s failed: %o",_,Y)}}},qe=function(_){if(!_){it();return}J||(xe("subscribe-worker-queue",{id:Tf}).catch(y=>{t("subscribe-worker-queue failed: %o",y)}),J=()=>xe("unsubscribe-worker-queue",{id:Tf}))},it=function(){J&&(J().catch(()=>{}),J=null)},Ue=function(_){return _.view==="monitor"||_.selected_id!=null},tt=function(_){if(!_){kt();return}at||(xe("subscribe-monitor-pipeline",{id:Ef}).catch(y=>{t("subscribe-monitor-pipeline failed: %o",y)}),at=()=>xe("unsubscribe-monitor-pipeline",{id:Ef}))},kt=function(){at&&(at().catch(()=>{}),at=null)},Tt=function(){Ge||(xe("subscribe-ui-order",{id:Cf}).catch(_=>{t("subscribe-ui-order failed: %o",_)}),Ge=()=>xe("unsubscribe-ui-order",{id:Cf}))},Xe=function(){Ge&&(Ge().catch(()=>{}),Ge=null),U.clear()},jt=function(){pt||(xe("subscribe-display-policy",{id:Rf}).catch(_=>{t("subscribe-display-policy failed: %o",_)}),pt=()=>xe("unsubscribe-display-policy",{id:Rf}))},Ct=function(){pt&&(pt().catch(()=>{}),pt=null),de.clear()},Bt=function(){qt||(xe("subscribe-impl-presets",{id:Of}).catch(_=>{t("subscribe-impl-presets failed: %o",_)}),qt=()=>xe("unsubscribe-impl-presets",{id:Of}))},Zt=function(_){if(!_)return"Unknown";let y=_.split("/").filter(Boolean);return y.length>0?y[y.length-1]:"Unknown"},yt=function(_,y){Ze.open(_.path,{missing_state:_.missing_state,...y?{workspace:y}:{}})};var p=Te,b=Ae,m=ut,$=W,C=Fe,j=At,K=Ot,ie=_t,ee=ze,F=he,P=Pe,L=Ye,z=qe,V=it,ne=Ue,N=tt,Q=kt,G=Tt,X=Xe,Re=jt,we=Ct,ce=Bt,q=Zt,$e=yt;let Se=document.getElementById("header-loading"),S=sc(Se),Z=Gd(e),_e=Af(),xe=S.wrapSend((_,y)=>_e.send(_,y)),ge=Zl(xe),je=Jl(),ft=tc(),Le=Ol(),U=ec(),de=Cl(),se=Rl(),ae=Ll();_e.on("impl-presets-snapshot",_=>{let y=_;y&&typeof y.revision=="number"&&Array.isArray(y.presets)&&se.set({revision:y.revision,presets:y.presets})}),_e.on("monitor-pipeline-snapshot",_=>{let y=_;if(!(!y||!Array.isArray(y.workspaces)))try{Le.set(y.workspaces,y.workspaces_state,y.cross_lanes)}catch{}}),_e.on("ui-order-snapshot",_=>{let y=_;if(y&&typeof y.revision=="number")try{U.set({revision:y.revision,order:y.order&&typeof y.order=="object"?y.order:{}})}catch{}}),_e.on("display-policy-snapshot",_=>{let y=_;if(y&&y.policy&&typeof y.policy=="object")try{de.set(y.policy)}catch{}}),_e.on("session-log-snapshot",_=>{let y=_;if(y&&typeof y.id=="string")try{ae.set(y.id,Array.isArray(y.lines)?y.lines:[],typeof y.last_event_at=="number"?y.last_event_at:null)}catch{}}),_e.on("session-log-append",_=>{let y=_;if(y&&typeof y.id=="string")try{ae.append(y.id,y.event)}catch{}}),_e.on("snapshot",_=>{let y=_,Y=y&&typeof y.id=="string"?y.id:"",le=Y?je.getStore(Y):null;if(le&&y&&y.type==="snapshot")try{le.applyPush(y)}catch{}}),_e.on("upsert",_=>{let y=_,Y=y&&typeof y.id=="string"?y.id:"",le=Y?je.getStore(Y):null;if(le&&y&&y.type==="upsert")try{le.applyPush(y)}catch{}}),_e.on("delete",_=>{let y=_,Y=y&&typeof y.id=="string"?y.id:"",le=Y?je.getStore(Y):null;if(le&&y&&y.type==="delete")try{le.applyPush(y)}catch{}});let Ee=null,me=null,Oe=null,Qe=null,He=()=>{},Be=new Promise(_=>{He=()=>_(void 0)}),te=!1,H=!1;async function x(_){let y=Ae(_);if(y===me||y===Oe)return;Oe=y;let Y=`detail:${_}`,le={type:"issue-detail",params:{id:_}};try{je.register(Y,le)}catch(Me){t("register detail store failed: %o",Me)}try{let Me=await ge.subscribeList(Y,le);if(ve.getState().selected_id!==_||Ae(_)!==y){await Me().catch(()=>{});return}Ee&&await Ee().catch(()=>{}),Ee=Me,me=y}catch(Me){t("detail subscribe failed: %o",Me),Te(Me,"issue details")}finally{Oe===y&&(Oe=null)}}let be=new Map,Ie=new Set,Ne={board:0,worker:0},dt=!1,Mt=ps;try{let _=window.localStorage.getItem(Lf);Bi(_)&&(Mt=_)}catch{}let zt="today";try{let _=window.localStorage.getItem(Av);_!==null&&(zt=In(_))}catch{}async function O(_){if(!Bi(_)||_===Mt)return;Mt=_;try{window.localStorage.setItem(Lf,_)}catch{}let y=be.get(dr);if(!y)return;be.delete(dr),await y().catch(()=>{});let Y=Ot();try{je.register(dr,Y)}catch(le){t("register %s store failed: %o",dr,le)}try{let le=await ge.subscribeList(dr,Y);be.set(dr,le)}catch(le){t("re-subscribe %s failed: %o",dr,le),Te(le,"board")}}async function re(_){let y=In(_);if(y===zt)return;zt=y;let Y=T.get(ur);if(!Y)return;T.delete(ur),await Y().catch(()=>{});let le=_t();try{je.register(ur,le)}catch(Me){t("register %s store failed: %o",ur,Me)}try{let Me=await ge.subscribeList(ur,le);T.set(ur,Me)}catch(Me){t("re-subscribe %s failed: %o",ur,Me),Te(Me,"worker")}}let T=new Map,J=null,at=null,Ge=null,pt=null,qt=null;async function pn(){pt=null,de.clear(),qt=null,se.clear(),J=null,at=null,be.clear(),T.clear(),Ne.board+=1,Ne.worker+=1,Bt();let _=ve.getState().workspace.current?.path;if(_)try{await _e.send("set-workspace",{path:_})}catch(Y){t("workspace restore after reconnect failed: %o",Y);return}jt();let y=ve.getState();ze(y.view==="board"),Pe(y.view==="worker"),tt(Ue(y)),qe(y.view==="board"||y.view==="worker"||!!y.selected_id)}async function Vt(){t("clearing all subscriptions for workspace switch"),he(),Ye(),it(),ft.clear(),Xe(),Tt(),Ct(),jt(),ut();let _=ve.getState();if(_.selected_id)try{je.unregister(`detail:${_.selected_id}`)}catch{}let y=ve.getState();ze(y.view==="board"),Pe(y.view==="worker"),tt(Ue(y)),qe(y.view==="board"||y.view==="worker"||!!y.selected_id),y.selected_id&&W(y.selected_id)}async function Qt(_){t("requesting workspace switch to %s",_),H=!0;try{let y=await _e.send("set-workspace",{path:_});t("workspace switch result: %o",y),y&&y.workspace&&(ve.setState({workspace:{current:{path:y.workspace.root_dir,database:y.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",_),y.changed&&(await Vt(),pe("Switched to "+Zt(_),"success",2e3)))}catch(y){throw t("workspace switch failed: %o",y),pe("Failed to switch workspace","error",3e3),y}finally{H=!1}}async function Gt(_){t("requesting workspace git pull for %s",_);try{let y=await _e.send("git-pull-workspace",{});t("workspace git pull result: %o",y);let Y=y?.status;if(Y==="up_to_date"){pe("Already up to date","success",2e3);return}if(Y==="stash_pop_conflict"){pe("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}pe("Git pulled "+Zt(_),"success",2e3)}catch(y){t("workspace git pull failed: %o",y);let Y=y?.code,le=y?.message;if(Y==="rebase_conflict"){pe("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(Y==="rebase_conflict_abort_failed"){pe("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(Y==="busy"){pe("Git pull skipped: another operation is running","warning",3e3);return}let Me=le?`: ${le}`:"";throw pe(`Git pull failed${Me}`,"error",3e3),y}}async function Ft(_,y){t("setting workspace visibility %s \u2192 %s",_,String(y));try{await _e.send("set-workspace-visibility",{path:_,visible:y}),await Ht()}catch(Y){t("workspace visibility update failed: %o",Y),pe("Failed to update project visibility","error",3e3)}}async function Ht(){try{let _=await _e.send("list-workspaces",{});if(t("workspaces loaded: %o",_),_&&Array.isArray(_.workspaces)){let y=_.workspaces.map(ct=>({path:ct.path,database:ct.database,pid:ct.pid,version:ct.version})),Y=_.current?{path:_.current.root_dir,database:_.current.db_path}:null,le=Array.isArray(_.hidden)?_.hidden.filter(ct=>typeof ct=="string"):[];ve.setState({workspace:{current:Y,available:y,hidden:le}});let Me=window.localStorage.getItem("beads-ui.workspace");Me&&(!y.some(Et=>Et.path===Me)||le.includes(Me)?window.localStorage.removeItem("beads-ui.workspace"):Y&&Me!==Y.path&&(t("restoring saved workspace preference: %s",Me),await Qt(Me)))}}catch(_){t("failed to load workspaces: %o",_)}}_e.on("workspace-changed",_=>{t("workspace-changed event: %o",_),_&&_.root_dir&&(ve.setState({workspace:{current:{path:_.root_dir,database:_.db_path}}}),Ht(),Vt())});let wt=!1;if(typeof _e.onConnection=="function"){let _=y=>{t("ws state %s",y),y==="reconnecting"||y==="closed"?(wt=!0,pe("Connection lost. Reconnecting\u2026","error",4e3)):y==="open"&&wt&&(wt=!1,pe("Reconnected","success",2200),xv(ve,(Y,le)=>{t(`${Y}: %o`,le)}),pn())};_e.onConnection(_)}let rn="board";try{let _=window.localStorage.getItem("beads-ui.view");(_==="board"||_==="worker"||_==="monitor")&&(rn=_)}catch(_){t("view parse error: %o",_)}let ve=oc({config:$v(),view:rn});_e.on("worker-queue-snapshot",_=>{let y=_;if(!y||!y.queue)return;let Y=ve.getState().workspace.current?.path;if(typeof Y=="string"&&Y.length>0&&y.root_dir!==Y){t("dropping worker-queue snapshot for %s",String(y.root_dir));return}try{ft.set(y.queue)}catch{}});let E=nc(ve);E.start();let fe=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"]),k=async(_,y)=>{try{return await xe(_,y)}catch(Y){if(fe.has(_))throw Y;return[]}};Sp({global_element:r,repo_element:o},ve,E);let I=document.getElementById("workspace-picker");I&&wf(I,ve,Qt,Gt,Ft);let ke=Rp(e,(_,y)=>xe(_,y));try{let _=document.getElementById("new-issue-btn");_&&_.addEventListener("click",()=>ke.open())}catch{}let De=Mp(e,{policyStore:de,queueStore:ft,implPresetStore:se,transport:(_,y)=>xe(_,y),onOpenChange:_=>{let y=dt;dt=_,At(),y&&_===!1&&Ke.refreshSessionDefaults()},labelOptions:()=>{let _=new Set;for(let[y]of gl)for(let Y of je.snapshotFor(y)||[]){let le=Y.labels;if(Array.isArray(le))for(let Me of le)typeof Me=="string"&&Me.length>0&&_.add(Me)}return Array.from(_).sort()}});try{let _=document.getElementById("display-settings-btn");_&&(_.setAttribute("aria-label","\uC124\uC815"),_.setAttribute("title","\uC124\uC815"),_.addEventListener("click",()=>De.open()))}catch{}let ue=document.createElement("div");ue.className="md-viewer-root",document.body.appendChild(ue);let Ze=ki(ue,{getWorkspacePath:()=>ve.getState().workspace.current?.path}),gt=kc(l,{gotoIssue:_=>E.gotoIssue(_),issueStores:je,transport:k,workerQueueStore:ft,uiOrderStore:U,displayPolicyStore:de,closedRange:Mt,onClosedRangeChange:_=>{O(_)},onNewIssue:()=>ke.open(),openDoc:yt}),Ke=fl(a,{transport:k,issueStores:je,queueStore:ft,sessionLogStore:ae,gotoIssue:_=>ve.setState({selected_id:_}),getWorkspacePath:()=>ve.getState().workspace.current?.path,switchWorkspace:_=>Qt(_),openDoc:yt,doneRange:zt,onDoneRangeChange:_=>{re(_)}}),h=Ap(u,{transport:k,pipelineStore:Le,execPresetStore:se,sessionLogStore:ae,router:E,gotoIssue:_=>E.gotoIssue(_),getWorkspacePath:()=>ve.getState().workspace.current?.path,switchWorkspace:_=>Qt(_),openDoc:yt}),g=Hd(d,{issueStores:je,transport:k,queueStore:ft,execPresetStore:se,sessionLogStore:ae,getWorkspacePath:()=>ve.getState().workspace.current?.path,mdViewer:Ze,depCandidates:()=>{let _=Le.get();if(_===null)return null;let y=Le.getWorkspacesState(),Y=ve.getState();if(Y.view==="monitor")return Ea(_,y);let le=Y.workspace.current?.path;return le?Ea(_,y,{root_dir:le}):null},subscribeCandidates:_=>Le.subscribe(_),onDepChanged:({type:_,a:y,b:Y})=>{let le=h;_==="dep-add"&&le&&typeof le.recorrectSharedLane=="function"&&le.recorrectSharedLane(_,y,Y)},onNavigate:(_,y)=>{let Y=()=>{ve.getState().view==="worker"?ve.setState({selected_id:_}):E.gotoIssue(_)},le=ve.getState().workspace.current?.path;if(typeof y!="string"||y.length===0||!le||y===le){Y();return}Promise.resolve(Qt(y)).then(Y).catch(()=>{pe("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})},onClose:()=>{let _=ve.getState();ve.setState({selected_id:null});try{E.gotoView(_.view==="worker"||_.view==="monitor"?_.view:"board")}catch{}},onOpenExecPresets:()=>{De.open("execution")}}),R=ve.getState().selected_id;R&&(d.hidden=!1,g.load(R),W(R)),ve.subscribe(_=>{let y=_.selected_id;y?(d.hidden=!1,g.load(y),H||W(y)):(g.clear(),d.hidden=!0,ut())});let D=_=>{l.hidden=_.view!=="board",a.hidden=_.view!=="worker",u.hidden=_.view!=="monitor",s&&s.classList.toggle("is-quiet",_.view==="monitor"),ze(_.view==="board"),Pe(_.view==="worker"),tt(Ue(_)),qe(_.view==="board"||_.view==="worker"||dt||!!_.selected_id),!_.selected_id&&_.view==="board"&&gt.load(),_.view==="worker"&&Ke.load(),_.view==="monitor"?h.load():h.pause(),window.localStorage.setItem("beads-ui.view",_.view)};ve.subscribe(D),D(ve.getState()),Tt(),jt(),Bt(),Ht().finally(()=>{te=!0,He()}),window.addEventListener("keydown",_=>{let y=_.ctrlKey||_.metaKey,Y=String(_.key||"").toLowerCase(),le=_.target,Me=le&&le.tagName?String(le.tagName).toLowerCase():"",ct=Me==="input"||Me==="textarea"||Me==="select"||le&&typeof le.isContentEditable=="boolean"&&le.isContentEditable;y&&Y==="n"&&(ct||(_.preventDefault(),ke.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,o=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",o);let s=document.getElementById("theme-switch");s&&(s.checked=o==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&Tv(t)});export{Tv as bootstrap,$v as readBootstrapConfig,xv as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
