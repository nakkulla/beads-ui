var $_=Object.create;var sa=Object.defineProperty;var x_=Object.getOwnPropertyDescriptor;var A_=Object.getOwnPropertyNames;var S_=Object.getPrototypeOf,E_=Object.prototype.hasOwnProperty;var T_=(e,t,n)=>t in e?sa(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var ia=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var C_=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of A_(t))!E_.call(e,o)&&o!==n&&sa(e,o,{get:()=>t[o],enumerable:!(r=x_(t,o))||r.enumerable});return e};var R_=(e,t,n)=>(n=e!=null?$_(S_(e)):{},C_(t||!e||!e.__esModule?sa(n,"default",{value:e,enumerable:!0}):n,e));var Et=(e,t,n)=>T_(e,typeof t!="symbol"?t+"":t,n);var pc=ia((Uw,dc)=>{var Ur=1e3,Wr=Ur*60,zr=Wr*60,Er=zr*24,I_=Er*7,M_=Er*365.25;dc.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return P_(e);if(n==="number"&&isFinite(e))return t.long?N_(e):D_(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function P_(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*M_;case"weeks":case"week":case"w":return n*I_;case"days":case"day":case"d":return n*Er;case"hours":case"hour":case"hrs":case"hr":case"h":return n*zr;case"minutes":case"minute":case"mins":case"min":case"m":return n*Wr;case"seconds":case"second":case"secs":case"sec":case"s":return n*Ur;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function D_(e){var t=Math.abs(e);return t>=Er?Math.round(e/Er)+"d":t>=zr?Math.round(e/zr)+"h":t>=Wr?Math.round(e/Wr)+"m":t>=Ur?Math.round(e/Ur)+"s":e+"ms"}function N_(e){var t=Math.abs(e);return t>=Er?Ls(e,t,Er,"day"):t>=zr?Ls(e,t,zr,"hour"):t>=Wr?Ls(e,t,Wr,"minute"):t>=Ur?Ls(e,t,Ur,"second"):e+" ms"}function Ls(e,t,n,r){var o=t>=n*1.5;return Math.round(e/n)+" "+r+(o?"s":"")}});var _c=ia((Ww,fc)=>{function q_(e){n.debug=n,n.default=n,n.coerce=a,n.disable=i,n.enable=o,n.enabled=l,n.humanize=pc(),n.destroy=u,Object.keys(e).forEach(d=>{n[d]=e[d]}),n.names=[],n.skips=[],n.formatters={};function t(d){let p=0;for(let h=0;h<d.length;h++)p=(p<<5)-p+d.charCodeAt(h),p|=0;return n.colors[Math.abs(p)%n.colors.length]}n.selectColor=t;function n(d){let p,h=null,m,v;function O(...B){if(!O.enabled)return;let V=O,ae=Number(new Date),F=ae-(p||ae);V.diff=F,V.prev=p,V.curr=ae,p=ae,B[0]=n.coerce(B[0]),typeof B[0]!="string"&&B.unshift("%O");let q=0;B[0]=B[0].replace(/%([a-zA-Z%])/g,(M,W)=>{if(M==="%%")return"%";q++;let K=n.formatters[W];if(typeof K=="function"){let H=B[q];M=K.call(V,H),B.splice(q,1),q--}return M}),n.formatArgs.call(V,B),(V.log||n.log).apply(V,B)}return O.namespace=d,O.useColors=n.useColors(),O.color=n.selectColor(d),O.extend=r,O.destroy=n.destroy,Object.defineProperty(O,"enabled",{enumerable:!0,configurable:!1,get:()=>h!==null?h:(m!==n.namespaces&&(m=n.namespaces,v=n.enabled(d)),v),set:B=>{h=B}}),typeof n.init=="function"&&n.init(O),O}function r(d,p){let h=n(this.namespace+(typeof p>"u"?":":p)+d);return h.log=this.log,h}function o(d){n.save(d),n.namespaces=d,n.names=[],n.skips=[];let p=(typeof d=="string"?d:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let h of p)h[0]==="-"?n.skips.push(h.slice(1)):n.names.push(h)}function s(d,p){let h=0,m=0,v=-1,O=0;for(;h<d.length;)if(m<p.length&&(p[m]===d[h]||p[m]==="*"))p[m]==="*"?(v=m,O=h,m++):(h++,m++);else if(v!==-1)m=v+1,O++,h=O;else return!1;for(;m<p.length&&p[m]==="*";)m++;return m===p.length}function i(){let d=[...n.names,...n.skips.map(p=>"-"+p)].join(",");return n.enable(""),d}function l(d){for(let p of n.skips)if(s(d,p))return!1;for(let p of n.names)if(s(d,p))return!0;return!1}function a(d){return d instanceof Error?d.stack||d.message:d}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}fc.exports=q_});var mc=ia((pn,Is)=>{pn.formatArgs=F_;pn.save=B_;pn.load=U_;pn.useColors=j_;pn.storage=W_();pn.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();pn.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function j_(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function F_(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+Is.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,o=>{o!=="%%"&&(n++,o==="%c"&&(r=n))}),e.splice(r,0,t)}pn.log=console.debug||console.log||(()=>{});function B_(e){try{e?pn.storage.setItem("debug",e):pn.storage.removeItem("debug")}catch{}}function U_(){let e;try{e=pn.storage.getItem("debug")||pn.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function W_(){try{return localStorage}catch{}}Is.exports=_c()(pn);var{formatters:z_}=Is.exports;z_.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var $o=globalThis,As=$o.trustedTypes,Vl=As?As.createPolicy("lit-html",{createHTML:e=>e}):void 0,la="$lit$",Wn=`lit$${Math.random().toFixed(9).slice(2)}$`,ca="?"+Wn,O_=`<${ca}>`,$r=document,xo=()=>$r.createComment(""),Ao=e=>e===null||typeof e!="object"&&typeof e!="function",ua=Array.isArray,tc=e=>ua(e)||typeof e?.[Symbol.iterator]=="function",aa=`[ 	
\f\r]`,ko=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Xl=/-->/g,Ql=/>/g,wr=RegExp(`>|${aa}(?:([^\\s"'>=/]+)(${aa}*=${aa}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Zl=/'/g,Jl=/"/g,nc=/^(?:script|style|textarea|title)$/i,da=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),c=da(1),Eo=da(2),Pw=da(3),kn=Symbol.for("lit-noChange"),Mt=Symbol.for("lit-nothing"),ec=new WeakMap,kr=$r.createTreeWalker($r,129);function rc(e,t){if(!ua(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Vl!==void 0?Vl.createHTML(t):t}var oc=(e,t)=>{let n=e.length-1,r=[],o,s=t===2?"<svg>":t===3?"<math>":"",i=ko;for(let l=0;l<n;l++){let a=e[l],u,d,p=-1,h=0;for(;h<a.length&&(i.lastIndex=h,d=i.exec(a),d!==null);)h=i.lastIndex,i===ko?d[1]==="!--"?i=Xl:d[1]!==void 0?i=Ql:d[2]!==void 0?(nc.test(d[2])&&(o=RegExp("</"+d[2],"g")),i=wr):d[3]!==void 0&&(i=wr):i===wr?d[0]===">"?(i=o??ko,p=-1):d[1]===void 0?p=-2:(p=i.lastIndex-d[2].length,u=d[1],i=d[3]===void 0?wr:d[3]==='"'?Jl:Zl):i===Jl||i===Zl?i=wr:i===Xl||i===Ql?i=ko:(i=wr,o=void 0);let m=i===wr&&e[l+1].startsWith("/>")?" ":"";s+=i===ko?a+O_:p>=0?(r.push(u),a.slice(0,p)+la+a.slice(p)+Wn+m):a+Wn+(p===-2?l:m)}return[rc(e,s+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},So=class e{constructor({strings:t,_$litType$:n},r){let o;this.parts=[];let s=0,i=0,l=t.length-1,a=this.parts,[u,d]=oc(t,n);if(this.el=e.createElement(u,r),kr.currentNode=this.el.content,n===2||n===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(o=kr.nextNode())!==null&&a.length<l;){if(o.nodeType===1){if(o.hasAttributes())for(let p of o.getAttributeNames())if(p.endsWith(la)){let h=d[i++],m=o.getAttribute(p).split(Wn),v=/([.?@])?(.*)/.exec(h);a.push({type:1,index:s,name:v[2],strings:m,ctor:v[1]==="."?Es:v[1]==="?"?Ts:v[1]==="@"?Cs:Ar}),o.removeAttribute(p)}else p.startsWith(Wn)&&(a.push({type:6,index:s}),o.removeAttribute(p));if(nc.test(o.tagName)){let p=o.textContent.split(Wn),h=p.length-1;if(h>0){o.textContent=As?As.emptyScript:"";for(let m=0;m<h;m++)o.append(p[m],xo()),kr.nextNode(),a.push({type:2,index:++s});o.append(p[h],xo())}}}else if(o.nodeType===8)if(o.data===ca)a.push({type:2,index:s});else{let p=-1;for(;(p=o.data.indexOf(Wn,p+1))!==-1;)a.push({type:7,index:s}),p+=Wn.length-1}s++}}static createElement(t,n){let r=$r.createElement("template");return r.innerHTML=t,r}};function xr(e,t,n=e,r){if(t===kn)return t;let o=r!==void 0?n._$Co?.[r]:n._$Cl,s=Ao(t)?void 0:t._$litDirective$;return o?.constructor!==s&&(o?._$AO?.(!1),s===void 0?o=void 0:(o=new s(e),o._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=o:n._$Cl=o),o!==void 0&&(t=xr(e,o._$AS(e,t.values),o,r)),t}var Ss=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,o=(t?.creationScope??$r).importNode(n,!0);kr.currentNode=o;let s=kr.nextNode(),i=0,l=0,a=r[0];for(;a!==void 0;){if(i===a.index){let u;a.type===2?u=new Fr(s,s.nextSibling,this,t):a.type===1?u=new a.ctor(s,a.name,a.strings,this,t):a.type===6&&(u=new Rs(s,this,t)),this._$AV.push(u),a=r[++l]}i!==a?.index&&(s=kr.nextNode(),i++)}return kr.currentNode=$r,o}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},Fr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,o){this.type=2,this._$AH=Mt,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=xr(this,t,n),Ao(t)?t===Mt||t==null||t===""?(this._$AH!==Mt&&this._$AR(),this._$AH=Mt):t!==this._$AH&&t!==kn&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):tc(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Mt&&Ao(this._$AH)?this._$AA.nextSibling.data=t:this.T($r.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,o=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=So.createElement(rc(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===o)this._$AH.p(n);else{let s=new Ss(o,this),i=s.u(this.options);s.p(n),this.T(i),this._$AH=s}}_$AC(t){let n=ec.get(t.strings);return n===void 0&&ec.set(t.strings,n=new So(t)),n}k(t){ua(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,o=0;for(let s of t)o===n.length?n.push(r=new e(this.O(xo()),this.O(xo()),this,this.options)):r=n[o],r._$AI(s),o++;o<n.length&&(this._$AR(r&&r._$AB.nextSibling,o),n.length=o)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Ar=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,o,s){this.type=1,this._$AH=Mt,this._$AN=void 0,this.element=t,this.name=n,this._$AM=o,this.options=s,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=Mt}_$AI(t,n=this,r,o){let s=this.strings,i=!1;if(s===void 0)t=xr(this,t,n,0),i=!Ao(t)||t!==this._$AH&&t!==kn,i&&(this._$AH=t);else{let l=t,a,u;for(t=s[0],a=0;a<s.length-1;a++)u=xr(this,l[r+a],n,a),u===kn&&(u=this._$AH[a]),i||(i=!Ao(u)||u!==this._$AH[a]),u===Mt?t=Mt:t!==Mt&&(t+=(u??"")+s[a+1]),this._$AH[a]=u}i&&!o&&this.j(t)}j(t){t===Mt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Es=class extends Ar{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Mt?void 0:t}},Ts=class extends Ar{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Mt)}},Cs=class extends Ar{constructor(t,n,r,o,s){super(t,n,r,o,s),this.type=5}_$AI(t,n=this){if((t=xr(this,t,n,0)??Mt)===kn)return;let r=this._$AH,o=t===Mt&&r!==Mt||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,s=t!==Mt&&(r===Mt||o);o&&this.element.removeEventListener(this.name,this,r),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Rs=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){xr(this,t)}},sc={M:la,P:Wn,A:ca,C:1,L:oc,R:Ss,D:tc,V:xr,I:Fr,H:Ar,N:Ts,U:Cs,B:Es,F:Rs},L_=$o.litHtmlPolyfillSupport;L_?.(So,Fr),($o.litHtmlVersions??($o.litHtmlVersions=[])).push("3.3.1");var ot=(e,t,n)=>{let r=n?.renderBefore??t,o=r._$litPart$;if(o===void 0){let s=n?.renderBefore??null;r._$litPart$=o=new Fr(t.insertBefore(xo(),s),s,void 0,n??{})}return o._$AI(e),o};var Os="today",ic=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}],Br=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"}];function qn(e){return e==="today"?"today":"7d"}function pa(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function Sr(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function ac(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function lc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function cc(){let e=null,t=[],n,r=new Set;function o(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},crossLanes(){return n},set(s,i,l){e=Array.isArray(s)?s:null,t=Array.isArray(i)?i:[],n=l===void 0?void 0:l!==null&&typeof l=="object"&&typeof l.revision=="number"&&Array.isArray(l.lanes)?{revision:l.revision,lanes:l.lanes}:null,o()},clear(){e=null,t=[],n=void 0,o()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function uc(){let e=new Map,t=new Set;function n(o){return o.startsWith("session-log:")?o:`session-log:${o}`}function r(){for(let o of Array.from(t))try{o()}catch{}}return{set(o,s,i=null){e.set(n(o),{lines:Array.isArray(s)?[...s]:[],last_event_at:typeof i=="number"?i:null}),r()},append(o,s){let i=n(o),l=e.get(i)||{lines:[],last_event_at:null};l.lines=[...l.lines,s],l.last_event_at=Date.now(),e.set(i,l),r()},get(o){return e.get(n(o))||null},clear(o){typeof o=="string"?e.delete(n(o)):e.clear(),r()},subscribe(o){return t.add(o),()=>t.delete(o)}}}var gc=R_(mc(),1);function Ct(e){return(0,gc.default)(`beads-ui:${e}`)}function H_(e){let n=hc((e&&typeof e=="object"?e:{}).spec_id);return n?{path:n,source:"native",conflict:!1}:{path:"",source:"none",conflict:!1}}function hc(e){return typeof e=="string"?e.trim():""}function G_(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}var K_=/^[A-Za-z0-9_.:-]+@[0-9a-fA-F]{40}$/;function Hr(e){let t=H_(e),n=hc(G_(e).spec_review),r=K_.test(n),o=r&&n.slice(0,n.indexOf("@"))==="skipped";return t.source==="none"?{...t,evidence:"none",skipped:o}:{...t,evidence:r?"published":"draft",skipped:o}}function An(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function To(e,t){let n=An(e.created_at),r=An(t.created_at);if(n!==r)return n<r?1:-1;let o=e.priority??2,s=t.priority??2;if(o!==s)return o-s;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function $c(e,t){let n=An(e.created_at),r=An(t.created_at);if(n!==r)return n<r?-1:1;let o=e.priority??2,s=t.priority??2;if(o!==s)return o-s;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function xc(e,t){let n=An(e.updated_at),r=An(t.updated_at);if(n!==r)return n<r?1:-1;let o=e.id,s=t.id;return o<s?-1:o>s?1:0}function Ac(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let o=An(e.created_at),s=An(t.created_at);if(o!==s)return o<s?1:-1;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function Sc(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let o=e?.id,s=t?.id;return o<s?-1:o>s?1:0}var Ms=Object.freeze({priority:"asc",dependents:"desc",released:"desc",spec:"desc",created:"asc",updated:"desc"});function Y_(e){return typeof e=="string"&&Object.prototype.hasOwnProperty.call(Ms,e)}function _a(e){if(!e||typeof e!="object")return!1;let t=e;return Y_(t.key)&&(t.dir==="asc"||t.dir==="desc")}function bc(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function yc(e,t){switch(t){case"priority":{let n=e.priority;return typeof n=="number"&&Number.isFinite(n)?n:null}case"dependents":{let n=e.dependents_info?e.dependents_info.count:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"released":{let n=e.release_info?e.release_info.last_released_at:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"spec":return Hr(e).evidence==="published"?1:0;case"created":return bc(e.created_at);case"updated":return bc(e.updated_at);default:return null}}function vc(e,t,n){let r=yc(e,n.key),o=yc(t,n.key);if(r===null||o===null)return r===o?0:r===null?1:-1;if(r===o)return 0;let s=r<o?-1:1;return n.dir==="desc"?-s:s}function Ec(e){let t=Array.isArray(e)?e.filter(_a):[];return(n,r)=>{for(let l of t){let a=vc(n,r,l);if(a!==0)return a}let o=vc(n,r,{key:"created",dir:"asc"});if(o!==0)return o;let s=n.id,i=r.id;return s<i?-1:s>i?1:0}}var V_=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function wc(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function kc(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=V_.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Tc(e,t){let n=wc(e),r=wc(t);if(n!==r)return n<r?-1:1;let o=kc(e),s=kc(t);if(o!==s)return o<s?-1:1;let i=An(e&&e.created_at),l=An(t&&t.created_at);if(i!==l)return i<l?-1:1;let a=e&&e.id,u=t&&t.id;return a===u?0:String(a)<String(u)?-1:1}var fa=2**20;function Gr(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-An(e&&e.created_at)}function Cc(e){return(t,n)=>{let r=Gr(t,e),o=Gr(n,e);if(r!==o)return r<o?-1:1;let s=t?.id,i=n?.id;return s<i?-1:s>i?1:0}}function ma(e,t,n){let r=Array.isArray(e)?e:[],o=r.length,s=Math.max(0,Math.min(t,o-1)),i=s-1>=0?r[s-1]:null,l=s+1<o?r[s+1]:null;if(!i&&!l)return{rank:0};if(!i)return{rank:Gr(l,n)-fa};if(!l)return{rank:Gr(i,n)+fa};let a=Gr(i,n),u=Gr(l,n),d=(a+u)/2;return a<d&&d<u?{rank:d}:{renormalize:r.map((p,h)=>({bead_id:p.id,rank:h*fa}))}}function ga(e,t={}){let n=Ct(`issue-store:${e}`),r=new Map,o=[],s=0,i=new Set,l=!1,a=t.sort||To;function u(){for(let h of Array.from(i))try{h()}catch{}}function d(){o=Array.from(r.values()).sort(a)}function p(h){if(l||!h||h.id!==e)return;let m=Number(h.revision)||0;if(n("apply %s rev=%d",h.type,m),!(m<=s&&h.type!=="snapshot")){if(h.type==="snapshot"){if(m<=s)return;r.clear();let v=Array.isArray(h.issues)?h.issues:[];for(let O of v)O&&typeof O.id=="string"&&O.id.length>0&&r.set(O.id,O);d(),s=m,u();return}if(h.type==="upsert"){let v=h.issue;if(v&&typeof v.id=="string"&&v.id.length>0){let O=r.get(v.id);if(!O)r.set(v.id,v);else{let B=Number.isFinite(O.updated_at)?O.updated_at:0,V=Number.isFinite(v.updated_at)?v.updated_at:0;if(B<=V){for(let ae of Object.keys(O))ae in v||delete O[ae];for(let[ae,F]of Object.entries(v))O[ae]=F}}d()}s=m,u()}else if(h.type==="delete"){let v=String(h.issue_id||"");v&&(r.delete(v),d()),s=m,u()}}}return{id:e,subscribe(h){return i.add(h),()=>{i.delete(h)}},applyPush:p,snapshot(){return o},size(){return r.size},getById(h){return r.get(h)},dispose(){l=!0,r.clear(),o=[],i.clear(),s=0}}}function Ps(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let o=Object.keys(e.params).sort();for(let s of o){let i=e.params[s];n[s]=String(i)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function Rc(e){let t=Ct("subs"),n=new Map,r=new Map;function o(l,a){t("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let u=r.get(l);if(!u||u.size===0)return;let d=Array.isArray(a.added)?a.added:[],p=Array.isArray(a.updated)?a.updated:[],h=Array.isArray(a.removed)?a.removed:[];for(let m of Array.from(u)){let v=n.get(m);if(!v)continue;let O=v.itemsById;for(let B of d)typeof B=="string"&&B.length>0&&O.set(B,!0);for(let B of p)typeof B=="string"&&B.length>0&&O.set(B,!0);for(let B of h)typeof B=="string"&&B.length>0&&O.delete(B)}}async function s(l,a){let u=Ps(a);if(t("subscribe %s key=%s",l,u),!n.has(l))n.set(l,{key:u,itemsById:new Map});else{let p=n.get(l);if(p&&p.key!==u){let h=r.get(p.key);h&&(h.delete(l),h.size===0&&r.delete(p.key)),n.set(l,{key:u,itemsById:new Map})}}r.has(u)||r.set(u,new Set);let d=r.get(u);d&&d.add(l);try{await e("subscribe-list",{id:l,type:a.type,params:a.params})}catch(p){let h=n.get(l)||null;if(h){let m=r.get(h.key);m&&(m.delete(l),m.size===0&&r.delete(h.key))}throw n.delete(l),p}return async()=>{t("unsubscribe %s key=%s",l,u);try{await e("unsubscribe-list",{id:l})}catch{}let p=n.get(l)||null;if(p){let h=r.get(p.key);h&&(h.delete(l),h.size===0&&r.delete(p.key))}n.delete(l)}}return{subscribeList:s,_applyDelta:o,_subKeyOf:Ps,selectors:{getIds(l){let a=n.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let u=n.get(l);return u?u.itemsById.has(a):!1},count(l){let a=n.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=n.get(l),u={};if(!a)return u;for(let d of a.itemsById.keys())u[d]=!0;return u}}}}function Oc(){let e=Ct("issue-stores"),t=new Map,n=new Map,r=new Set,o=new Map;function s(){for(let a of Array.from(r))try{a()}catch{}}function i(a,u,d){let p=u?Ps(u):"",h=n.get(a)||"",m=t.has(a);if(e("register %s key=%s (prev=%s)",a,p,h),m&&h&&p&&h!==p){let v=t.get(a);if(v)try{v.dispose()}catch{}let O=o.get(a);if(O){try{O()}catch{}o.delete(a)}let B=ga(a,d);t.set(a,B);let V=B.subscribe(()=>s());o.set(a,V)}else if(!m){let v=ga(a,d);t.set(a,v);let O=v.subscribe(()=>s());o.set(a,O)}return n.set(a,p),()=>l(a)}function l(a){e("unregister %s",a),n.delete(a);let u=t.get(a);u&&(u.dispose(),t.delete(a));let d=o.get(a);if(d){try{d()}catch{}o.delete(a)}}return{register:i,unregister:l,getStore(a){return t.get(a)||null},snapshotFor(a){let u=t.get(a);return u?u.snapshot().slice():[]},subscribe(a){return r.add(a),()=>r.delete(a)}}}function Lc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Ic(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function ha(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function X_(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),o=r>=0?n.slice(r+1):"";if(o){let l=new URLSearchParams(o).get("issue");if(l)return decodeURIComponent(l)}let s=/^\/issue\/([^\s?#]+)/.exec(n);return s&&s[1]?decodeURIComponent(s[1]):null}function Q_(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function Mc(e){let t=Ct("router"),n=()=>{let r=window.location.hash||"",o=/^#\/issue\/([^\s?#]+)/.exec(r),s=o&&o[1]?decodeURIComponent(o[1]):X_(r),i=Q_(r);if(t("hash change \u2192 view=%s id=%s",i,s),e.setState({selected_id:i==="worker"?null:s,view:i,worker:{selected_parent_id:i==="worker"?s:null}}),!!o||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let a=s?`#/${i}?issue=${encodeURIComponent(s)}`:`#/${i}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let o=e.getState?e.getState():{view:"board"},s=o.view==="worker"||o.view==="monitor"?o.view:"board",i=ha(s,r);t("goto issue %s (view=%s)",r,s),window.location.hash!==i?window.location.hash=i:e.setState({selected_id:s==="worker"?null:r,view:s,worker:{selected_parent_id:s==="worker"?r:null}})},gotoView(r){let o=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},s=r==="worker"?o.worker?.selected_parent_id:o.selected_id,i=s?ha(r,s):`#/${r}`;t("goto view %s (id=%s)",r,s||""),window.location.hash!==i?window.location.hash=i:e.setState({view:r,selected_id:r==="worker"?null:o.selected_id})}}}var Z_=Object.freeze({workspace_config:{default_workspace:null}});function Pc(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:Z_.workspace_config.default_workspace}}}function Dc(e={}){let t=Ct("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:Pc(e.config)},r=new Set;function o(){for(let s of Array.from(r))try{s(n)}catch{}}return{getState(){return n},setState(s){let i={...n,...s,filters:{...n.filters,...s.filters||{}},board:{...n.board,...s.board||{}},worker:{...n.worker,...s.worker||{}},workspace:{current:s.workspace?.current!==void 0?s.workspace.current:n.workspace.current,available:s.workspace?.available!==void 0?s.workspace.available:n.workspace.available,hidden:s.workspace?.hidden!==void 0?s.workspace.hidden:n.workspace.hidden},config:s.config!==void 0?Pc(s.config):n.config},l=i.workspace.current?.path!==n.workspace.current?.path||i.workspace.available.length!==n.workspace.available.length||i.workspace.hidden.length!==n.workspace.hidden.length||i.workspace.hidden.some((u,d)=>u!==n.workspace.hidden[d]),a=i.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;i.selected_id===n.selected_id&&i.view===n.view&&i.filters.status===n.filters.status&&i.filters.search===n.filters.search&&i.filters.type===n.filters.type&&i.board.closed_filter===n.board.closed_filter&&i.worker.selected_parent_id===n.worker.selected_parent_id&&i.worker.show_closed_children.length===n.worker.show_closed_children.length&&i.worker.show_closed_children.every((u,d)=>u===n.worker.show_closed_children[d])&&!l&&!a||(n=i,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),o())},subscribe(s){return r.add(s),()=>r.delete(s)}}}function Nc(e){let t=Ct("activity"),n=0,r=new Map,o=1;function s(){if(!e)return;let u=n>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function i(){n+=1,t("start count=%d",n),s()}function l(){let u=n;n=Math.max(0,n-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,n),s()}function a(u){return async(p,h)=>{let m=o++,v=Date.now();r.set(m,{type:p,start_ts:v}),t("request start id=%d type=%s count=%d",m,p,n+1),i();let O=!1,B=()=>{O||(O=!0,r.delete(m),l())},V=setTimeout(()=>{O||(t("request TIMEOUT id=%d type=%s elapsed=%dms",m,p,Date.now()-v),B())},3e4);try{let ae=await u(p,h),F=Date.now()-v;return t("request done id=%d type=%s elapsed=%dms",m,p,F),ae}catch(ae){let F=Date.now()-v;throw t("request error id=%d type=%s elapsed=%dms err=%o",m,p,F,ae),ae}finally{clearTimeout(V),B()}}}return s(),{wrapSend:a,start:i,done:l,getCount:()=>n,getActiveRequests:()=>{let u=Date.now();return Array.from(r.entries()).map(([d,p])=>({id:d,type:p.type,elapsed_ms:u-p.start_ts}))}}}function he(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}function Kr(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let s=t.get();return s&&s.order?s.order:{}}function r(s,i,l){let a=e&&e.snapshotFor?e.snapshotFor(s).slice():[];if(i==="closed")return a.sort(Sc),a;switch(l){case"created_desc":return a.sort(To),a;case"created_asc":return a.sort($c),a;case"updated_desc":return a.sort(xc),a;case"priority":return a.sort(Ac),a;case"manual":default:{let u=n();return u?a.sort(Cc(u)):a.sort(To),a}}}function o(s){let i=[];return e&&typeof e.subscribe=="function"&&i.push(e.subscribe(s)),t&&typeof t.subscribe=="function"&&i.push(t.subscribe(s)),()=>{for(let l of i)try{l()}catch{}}}return{selectBoardColumn:r,subscribe:o}}function sr(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function Kt(e){let t=sr(e);if(t===null)return"";let n=new Date(t),r=o=>String(o).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function on(e,t){let n=sr(e);if(n===null)return"";let o=(typeof t=="number"?t:Date.now())-n;if(o<6e4)return"\uBC29\uAE08";let s=Math.floor(o/6e4);if(s<60)return`${s}\uBD84 \uC804`;let i=Math.floor(o/36e5);if(i<24)return`${i}\uC2DC\uAC04 \uC804`;let l=Math.floor(o/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let u=Math.floor(l/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function qc(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let o=sr(r.updated_at)??0;if(t===null||o>n){t=r,n=o;continue}o===n&&String(r.id)<String(t.id)&&(t=r)}return t}function Ds(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Ns(e){let t=new Map;for(let r of e)r&&r.id&&!t.has(r.id)&&t.set(r.id,r);let n=new Map;for(let r of t.values()){let o=Ds(r);if(!o)continue;let s=n.get(o);s||(s=[],n.set(o,s)),s.push({id:r.id,title:r.title,status:r.status,metadata:r.metadata,workflow:r.workflow,created_at:r.created_at,updated_at:r.updated_at})}return n}function qs(e,t){let n=e.get(t)||[],r=0;for(let s of n)(s.status==="resolved"||s.status==="closed")&&(r+=1);let o=qc(n);return{total:n.length,count:r,current:o,children:n}}function jc(e){let t=e.transport,n=e.uiOrderStore;function r(i,l){return"renormalize"in i?i.renormalize:[{bead_id:l,rank:i.rank}]}function o(i,l){let a={...i.order};for(let u of l)a[u.bead_id]=u.rank;n&&n.set({revision:i.revision,order:a})}async function s(i,l,a){if(!t||!n)return;let u=n.get()||{revision:0,order:{}},d=r(ma(l,a,u.order),i);o(u,d);let p=await t("ui-order-set",{expected_revision:u.revision,entries:d});if(p&&p.conflict){let h={revision:typeof p.revision=="number"?p.revision:0,order:p.order||{}};n.set(h);let m=r(ma(l,a,h.order),i);o(h,m);let v=await t("ui-order-set",{expected_revision:h.revision,entries:m});v&&v.applied&&n.set({revision:typeof v.revision=="number"?v.revision:0,order:v.order||{}})}else p&&p.applied&&n.set({revision:typeof p.revision=="number"?p.revision:0,order:p.order||{}})}return{applyReorder:s}}function Fc(e){if(typeof e!="string")return"";let t=e.indexOf("-");return t>0?e.slice(0,t):""}function zn(e,t){let n=Fc(e),r=Fc(t);return n.length===0||r.length===0?!1:n!==r}function js(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function ba(e,t){return!t||typeof e!="string"||e.length===0||js(t.visible_labels).includes(e)?!0:js(t.hidden_labels).includes(e)?!1:!js(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function Bc(e,t){return js(e).filter(n=>ba(n,t))}function ir(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}function J_(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function em(e,t,n,r,o){return c`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${r?"true":"false"}
    @click=${o}
  >
    children ${t}/${n} ${r?"\u25B4":"\u25BE"}
  </button>`}function tm(e,t,n,r){return c`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${r?o=>r(o,e.id):void 0}
  >
    <span class=${J_(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${n}
  </button>`}function Fs(e,t){let n=e.total||0,r=!!t.expanded,o=t.trailing??"",s=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(n===0&&s===null)return"";let i=Array.isArray(e.children)?e.children:[],l=n>0?i.slice().sort(Tc):i;return c`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?em(t.parent_id,e.count,n,r,t.onToggle):c`<span class="board-card__roll-none">${s}</span>`}
        ${o}
      </div>
      ${n>0&&e.current?c`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${r&&n>0?c`<div class="board-card__roll-list">
            ${l.map((a,u)=>tm(a,u+1,t.childChips?t.childChips(a):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var nm={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},Wc={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},Uc={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},rm={review:"\u2713",skip:"\u2298"},ar={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function om(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let o of e){let s=t[o];if(s&&s.fill==="dim"&&s.stale!==!0)return o}return null}function zc(e){let t=e&&e.fill||"none";return t==="none"?ar.none:e&&e.stale===!0?ar.stale:t==="dim"?ar.dim:e&&e.glyph==="review"?ar.review:e&&e.glyph==="skip"?ar.skip:ar.done}function sm(e){if(!e||e.fill==="none"||!e.approval_state)return zc(e);let t=[];return e.glyph==="review"?t.push(ar.review):e.glyph==="skip"&&t.push(ar.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function im(e,t,n,r){let o=nm[e]||e,s=t&&t.fill||"none",i=!!t&&t.stale===!0,l=rm[t&&t.glyph||""]||"",a="bar";s==="dim"?a+=` b-${o} dim`:s==="full"&&(a+=` b-${o} full`),i&&(a+=" stale"),n&&(a+=" cur");let u=s==="none"?"lbl":`lbl l-${o} on`,d=n?`color: var(--stage-${o}-on)`:"",p=Wc[e]||e,h=r?Hc(t):null;if(!h)return c`
      <div class="seg">
        <div class=${a} style=${d}>${l}</div>
        <div class=${u}>${p}</div>
      </div>
    `;let m=`${p} \uBB38\uC11C \uC5F4\uAE30 \xB7 ${h.path}`;return c`
    <button
      type="button"
      class="seg seg--doc"
      aria-label=${m}
      title=${m}
      @click=${v=>{v.preventDefault(),v.stopPropagation(),r(v,h,e)}}
    >
      <div class=${a} style=${d}>${l}</div>
      <div class=${u}>${p}</div>
    </button>
  `}function Hc(e){let t=e?e.doc:null;return!t||typeof t.path!="string"||t.path.length===0?null:t}function Bs(e,t,n={}){if(!e||!e.stages)return"";let r=n.onOpenDoc,o=Uc[e.route]||Uc.spec_backed,s=e.stages,i=om(o,s,String(t||"open")),l=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${o.map(u=>`${Wc[u]||u} ${u==="plan"?sm(s[u]||{}):zc(s[u]||{})}`).join(" \xB7 ")}`,a=!!r&&o.some(u=>Hc(s[u]||{})!==null);return c`
    <div
      class="stp"
      role=${a?"group":"img"}
      aria-label=${l}
    >
      ${o.map(u=>im(u,s[u]||{},u===i,r))}
    </div>
  `}function am(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Gc=2;function Kc(e){let t=e.slice(0,Gc).join(", "),n=e.length-Gc;return`\u26D3 blocked: ${t}${n>0?` +${n}`:""}`}function lm(e,t){if(!t)return[];let n=[],r=Array.isArray(t.blockers)?t.blockers:[],o=[],s=[];for(let i of r)(zn(e,i)?s:o).push(i);return o.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-dep"
        >${Kc(o)}</span
      >`),s.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-foreign"
        >${Kc(s)}</span
      >`),n}function cm(e){if(!e||typeof e!="object")return null;let t=e.awaiting_user;if(typeof t!="string")return null;let n=t.trim();return n.length===0?null:c`<span class="ctl-chip ctl-chip--blocked"
    >${`\u23F8 \uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694: ${n}`}</span
  >`}function ya(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function Us(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function Hn(e){return`${e.kind}:${Us(e)}@${e.sha}`}function Ws(e,t){if(!e)return null;let n=ya(e.kind),r=e.reason,o=e.kind==="delegated"?r===null:typeof r=="string"&&r.trim().length>0&&!/[\r\n]/.test(r);if(!n||!o)return null;let s=ya(t?.kind),i=s!==null&&t?.kind!==e.kind,l=`\uACC4\uD68D \xB7 ${n}${i?` \u2192 ${s}`:""}`,a=`planned_execution ${e.kind}${typeof r=="string"?`:${r}`:""}`,u=t?` \xB7 exec_receipt ${Hn(t)}`:"";return{kind:e.kind,label:l,title:`${a}${u}`}}function Yc(e,t){let n=Ws(e,t);return n?c`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${n.kind}
        title=${n.title}
        >${n.label}</span
      >`:null}function um(e){if(!e)return null;let t=ya(e.kind);return t?c`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${Hn(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function dm(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},o=[];if(r.route&&ir(n,"route")){let l=r.route_source==="derived";o.push(c`<span
        class="ctl-chip ctl-chip--route${l?" is-derived":""}"
        title=${l?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${l?"unset":r.route}</span
      >`)}if(r.fast_track&&ir(n,"fast_track")&&o.push(c`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),r.pr&&ir(n,"pr")){let l=r.pr.number;o.push(c`<span class="ctl-chip ctl-chip--pr"
        >${`PR${l!=null?` #${l}`:""}`}</span
      >`)}let s=Yc(r.planned_execution,r.exec_receipt);if(s&&o.push(s),r.exec_receipt){let l=r.exec_receipt;o.push(c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Hn(l)}`}
        >${`exec ${l.kind==="delegated"?Us(l):`main:${l.actor}`} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}if(r.impl_entry){let l=r.impl_entry;o.push(c`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${l.actor}@${l.sha}`}
        >${`impl ${l.actor} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}for(let l of Bc(e.labels,n))o.push(c`<span class="ctl-chip ctl-chip--label">${l}</span>`);if(e.from_id&&ir(n,"from")&&o.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${l=>{l.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(l,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),ir(n,"blocked")){let l=cm(e.metadata);l&&o.push(l),o.push(...lm(e.id,e.blocked_info))}return t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&ir(n,"blocked")&&o.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),o.length===0?"":c`<div class="board-card__chips">${o}</div>`}function pm(e){let t=on(e.created_at),n=on(e.updated_at);return!t&&!n?"":c`<span class="board-card__times">
    ${t?c`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${Kt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&n?c`<span class="board-card__time-sep">·</span>`:""}
    ${n?c`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${Kt(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </span>`}function fm(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return Fs(n,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:pm(e),empty_label:"children \uC5C6\uC74C",childChips:va,onToggle:r=>t.onRollupToggle&&t.onRollupToggle(r,e.id),onChildClick:(r,o)=>t.onChildClick&&t.onChildClick(r,o)})}function va(e){let t=e?.workflow?.chips?.planned_execution,n=e?.workflow?.chips?.exec_receipt;return Ws(t,n)?c`<span class="board-card__roll-child-chips">
    ${Yc(t,n)}
    ${um(n)}
  </span>`:null}function zs(e,t){let n=am(e.priority);return c`
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
      ${dm(e,t)}
      ${e.workflow&&ir(t.policy||null,"stepper")?Bs(e.workflow,e.status,{onOpenDoc:t.onOpenDoc}):""}
      ${fm(e,t)}
    </article>
  `}function Yr(e,t){let n=Array.isArray(e.items)?e.items.length:0,r=e.is_closed===!0;return c`
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
              ${ic.map(s=>c`<option
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
        ${e.items.map(s=>zs(s,t))}
      </div>
    </section>
  `}function Vc(e,t,n){return c`
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
          ${e.items.length===0?c`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(r=>zs(r,t))}
        </div>
      </div>
    </dialog>
  `}var _m=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],mm=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],gm=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function hm(e,t,n){let r=e.labels.length,o=r>0?`\uB77C\uBCA8 ${r}`:"\uB77C\uBCA8";return c`
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
  `}function Xc(e,t,n){return c`
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
        ${_m.map(r=>c`<option
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
        ${mm.map(r=>c`<option
              value=${r.value}
              ?selected=${e.type===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      ${hm(e,t,n)}
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
        ${gm.map(r=>c`<option
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
  `}var bm=200,ym={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},vm=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Qc="beads-ui.board.sort",Zc=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function wm(){try{let e=window.localStorage.getItem(Qc);if(e&&Zc.has(e))return e}catch{}return"created_desc"}function Jc(e,t){let n=Ct("views:board"),r=t.gotoIssue,o=t.issueStores,s=t.transport,i=t.uiOrderStore,l=t.displayPolicyStore,a=t.workerQueueStore,u=t.onClosedRangeChange,d=t.onNewIssue,p=t.openDoc,h=t.closedRange||Os,m=o?Kr(o,i):null,v=jc({transport:s,uiOrderStore:i}),O=[],B=[],V=[],ae=[],F=[],q=[],L=!1,M=0,W=wm(),K=new Map,H=new Map,D=new Map,G=new Set,X={search:"",priority:"",type:"",labels:[]},J=!1,fe=null;function Ce(ue){return String(ue.status||"open")==="open"}function U(ue){return String(ue.status||"open")==="open"}function te(ue){let se=X.search.trim().toLowerCase(),A=X.priority,j=X.type,oe=X.labels;return ue.filter(ie=>{if(se){let ce=String(ie.id||"").toLowerCase(),Pe=String(ie.title||"").toLowerCase();if(!ce.includes(se)&&!Pe.includes(se))return!1}if(A!==""&&String(ie.priority)!==A||j!==""&&String(ie.issue_type||"")!==j)return!1;if(oe.length>0){let ce=Array.isArray(ie.labels)?ie.labels:[];if(!oe.some(Pe=>ce.includes(Pe)))return!1}return!0})}function xe(){let ue=new Set;for(let se of[O,B,V,ae,F,q])for(let A of se){let j=Array.isArray(A.labels)?A.labels:[];for(let oe of j)typeof oe=="string"&&oe.length>0&&ue.add(oe)}return Array.from(ue).sort()}function Ee(){return X.search.trim()!==""||X.priority!==""||X.type!==""||X.labels.length>0}function R(){try{if(m){let ue=m.selectBoardColumn("tab:board:in-progress","in_progress",W),se=m.selectBoardColumn("tab:board:blocked","blocked",W).filter(U),A=new Set(ue.map(je=>je.id)),j=m.selectBoardColumn("tab:board:ready","ready",W).filter(je=>Ce(je)&&!A.has(je.id)),oe=m.selectBoardColumn("tab:board:resolved","resolved",W),ie=m.selectBoardColumn("tab:board:deferred","deferred",W),ce=m.selectBoardColumn("tab:board:closed","closed").slice(0,bm),Pe=[...se,...j,...ue,...oe,...ce];re(Pe);let Je=new Set;for(let je of Pe)je&&je.id&&!Ds(je)&&Je.add(je.id);let Xe=!Ee();O=Xe?Co(se,Je):se,B=Xe?Co(j,Je):j,V=Xe?Co(ue,Je):ue,ae=Xe?Co(oe,Je):oe,F=ie,M=ie.length,q=Xe?Co(ce,Je):ce,K=new Map;for(let je of O)K.set(je.id,"open");for(let je of B)K.set(je.id,"open");for(let je of V)K.set(je.id,"in_progress");for(let je of ae)K.set(je.id,"resolved");for(let je of F)K.set(je.id,"deferred");for(let je of q)K.set(je.id,"closed");H=new Map;for(let je of O)H.set(je.id,"blocked-col");for(let je of B)H.set(je.id,"ready-col");for(let je of V)H.set(je.id,"in-progress-col");for(let je of ae)H.set(je.id,"resolved-col");for(let je of q)H.set(je.id,"closed-col")}Ie()}catch{O=[],B=[],V=[],ae=[],F=[],q=[],D=new Map,Ie()}}function re(ue){D=Ns(ue)}function ve(ue){return qs(D,ue)}function ye(ue){return!G.has(ue)}function Oe(ue,se){ue.preventDefault(),ue.stopPropagation(),G.has(se)?G.delete(se):G.add(se),Ie()}function _e(ue,se){ue.preventDefault(),ue.stopPropagation(),r(se)}function Le(ue,se){ue.preventDefault(),ue.stopPropagation(),r(se)}function Ve(ue,se){fe||r(se)}function Ye(ue,se){ue.preventDefault(),ue.stopPropagation(),km(se).then(A=>{A&&he("\uBCF5\uC0AC\uB428","success",1200)})}function P(ue,se){fe=se,ue.dataTransfer&&(ue.dataTransfer.setData("text/plain",se),ue.dataTransfer.effectAllowed="move"),ue.target.classList.add("board-card--dragging")}function pe(ue){ue.target.classList.remove("board-card--dragging"),Dt(),setTimeout(()=>{fe=null},0)}function ne(ue){let se=String(ue.target.value||"");!se||se===h||(h=se,u&&u(se),Ie())}function me(){return l?l.get():null}function Te(ue){let se=a?a.get():null,A=se?se.cleanup_failed:null;if(!A||typeof A!="object"||Array.isArray(A))return null;let j=A[ue];return!j||typeof j!="object"||Array.isArray(j)?null:j}let ge={onCardClick:Ve,onCopyId:Ye,onDragStart:P,onDragEnd:pe,onClosedRangeChange:ne,rollupFor:ve,isExpanded:ye,onRollupToggle:Oe,onChildClick:_e,onFromChipClick:Le,onOpenDoc:p?(ue,se)=>p(se):void 0,cleanupFailureFor:Te,get policy(){return me()}};function Me(ue,se){fe||(Re(),r(se))}function We(ue,se){ue.preventDefault(),ue.stopPropagation(),Re(),r(se)}let Ze={...ge,onCardClick:Me,onChildClick:We,onFromChipClick:We,onOpenDoc:p?(ue,se)=>{Re(),p(se)}:void 0,get policy(){return me()}};function qe(ue){let se=ue.target,A=e.querySelector(".board-filter__labels");se&&A&&A.contains(se)||Ne()}function z(ue){ue.key==="Escape"&&Ne()}function Y(){J||(J=!0,document.addEventListener("mousedown",qe),document.addEventListener("keydown",z),Ie())}function Ne(){J&&(J=!1,document.removeEventListener("mousedown",qe),document.removeEventListener("keydown",z),Ie())}function lt(ue){ue.key==="Escape"&&Re()}function Ue(){L||(L=!0,document.addEventListener("keydown",lt),Ie())}function Re(){L&&(L=!1,document.removeEventListener("keydown",lt),Ie())}let $={onClose:Re,onOverlayClick(ue){ue.target===ue.currentTarget&&Re()}},Z={onSearchInput(ue){X.search=String(ue.target.value||""),R()},onPriorityChange(ue){X.priority=String(ue.target.value||""),R()},onTypeChange(ue){X.type=String(ue.target.value||""),R()},onSortChange(ue){let se=String(ue.target.value||"");if(!(!Zc.has(se)||se===W)){W=se;try{window.localStorage.setItem(Qc,se)}catch{}R()}},onDeferredToggle(){L?Re():Ue()},onLabelMenuToggle(){J?Ne():Y()},onLabelToggle(ue){let se=X.labels.indexOf(ue);se===-1?X.labels.push(ue):X.labels.splice(se,1),R()},onLabelClear(){X.labels.length!==0&&(X.labels=[],R())},onNewIssue(){d&&d()}};function Se(){return c`
      <div class="board-view">
        ${Xc(X,Z,{sort_mode:W,deferred_popup_open:L,deferred_count:M,label_options:xe(),label_menu_open:J})}
        <div class="board-root">
          ${Yr({title:"Blocked",id:"blocked-col",items:te(O)},ge)}
          ${Yr({title:"Ready",id:"ready-col",items:te(B)},ge)}
          ${Yr({title:"In progress",id:"in-progress-col",items:te(V)},ge)}
          ${Yr({title:"Resolved",id:"resolved-col",items:te(ae)},ge)}
          ${Yr({title:"Closed",id:"closed-col",items:te(q),is_closed:!0,closed_range:h},ge)}
        </div>
        ${L?Vc({items:te(F),count:M},Ze,$):""}
      </div>
    `}function Ie(){ot(Se(),e),Ge()}function Ge(){try{let ue=e.querySelector("#deferred-popup");ue&&!ue.open&&(typeof ue.showModal=="function"?ue.showModal():ue.setAttribute("open",""));let se=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let A of se)Array.from(A.querySelectorAll(".board-card")).forEach((oe,ie)=>{oe.tabIndex=ie===0?0:-1})}catch{}}async function tt(ue,se){if(!s){he("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await s("update-status",{id:ue,status:se}),he("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(A){n("update-status failed: %o",A),he("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function ct(ue){switch(ue){case"blocked-col":return O;case"ready-col":return B;case"in-progress-col":return V;case"resolved-col":return ae;default:return[]}}function Tt(ue,se,A){if(!s||!i)return;let j=ct(ue),oe=j.find(Xe=>Xe.id===se);if(!oe)return;let ie=j.filter(Xe=>Xe.id!==se),ce=A.closest?A.closest(".board-card"):null,Pe=ie.length;if(ce){let Xe=ce.getAttribute("data-issue-id");if(Xe===se)return;let je=ie.findIndex(vt=>vt.id===Xe);je>=0&&(Pe=je)}let Je=ie.slice();Je.splice(Pe,0,oe),v.applyReorder(se,Je,Pe)}function Dt(){for(let ue of Array.from(e.querySelectorAll(".board-column--drag-over")))ue.classList.remove("board-column--drag-over")}let ft=null;e.addEventListener("dragover",ue=>{ue.preventDefault(),ue.dataTransfer&&(ue.dataTransfer.dropEffect="move");let A=ue.target.closest(".board-column");A&&A!==ft&&(ft&&ft.classList.remove("board-column--drag-over"),A.classList.add("board-column--drag-over"),ft=A)}),e.addEventListener("dragleave",ue=>{let se=ue.relatedTarget;(!se||!e.contains(se))&&ft&&(ft.classList.remove("board-column--drag-over"),ft=null)}),e.addEventListener("drop",ue=>{ue.preventDefault(),ft&&(ft.classList.remove("board-column--drag-over"),ft=null);let se=ue.target,A=se.closest(".board-column");if(!A)return;let j=ue.dataTransfer?.getData("text/plain")||"";if(!j)return;let oe=A.id,ie=H.get(j);if(ie&&ie===oe){if(vm.has(oe)){if(W!=="manual"){he("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}Tt(oe,j,se)}return}let ce=ym[oe];if(!ce){he("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}K.get(j)!==ce&&tt(j,ce)}),e.addEventListener("keydown",ue=>{let se=ue.target;if(!(se instanceof HTMLElement))return;let A=String(se.tagName||"").toLowerCase();if(A==="input"||A==="textarea"||A==="select"||A==="button"||A==="a"||se.isContentEditable===!0)return;let j=se.closest(".board-card");if(!j)return;let oe=String(ue.key||"");if(oe==="Enter"||oe===" "){ue.preventDefault();let Je=j.getAttribute("data-issue-id");Je&&r(Je);return}if(oe!=="ArrowUp"&&oe!=="ArrowDown"&&oe!=="ArrowLeft"&&oe!=="ArrowRight")return;ue.preventDefault();let ie=j.closest(".board-column");if(!ie)return;let ce=Array.from(ie.querySelectorAll(".board-card")),Pe=ce.indexOf(j);if(oe==="ArrowDown"&&Pe<ce.length-1){gt(j,ce[Pe+1]);return}if(oe==="ArrowUp"&&Pe>0){gt(j,ce[Pe-1]);return}if(oe==="ArrowLeft"||oe==="ArrowRight"){let Je=Array.from(e.querySelectorAll(".board-column")),Xe=Je.indexOf(ie),je=oe==="ArrowRight"?1:-1,vt=Xe+je;for(;vt>=0&&vt<Je.length;){let Ot=Je[vt].querySelector(".board-card");if(Ot){gt(j,Ot);return}vt+=je}}});function gt(ue,se){try{ue.tabIndex=-1,se.tabIndex=0,se.focus()}catch{}}let mt=null;m&&m.subscribe&&(mt=m.subscribe(()=>{try{R()}catch{}}));let Rt=null;l&&l.subscribe&&(Rt=l.subscribe(()=>{try{R()}catch{}}));let bt=null;return a&&a.subscribe&&(bt=a.subscribe(()=>{Ie()})),{async load(){n("load"),R()},clear(){Ne(),Re(),mt&&(mt(),mt=null),Rt&&(Rt(),Rt=null),bt&&(bt(),bt=null),e.replaceChildren(),O=[],B=[],V=[],ae=[],F=[],q=[],K=new Map,H=new Map}}}function Co(e,t){return e.filter(n=>{let r=Ds(n);return!(r&&t.has(r))})}async function km(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}var nn=e=>e??Mt;function bn(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function Ro(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}async function sn(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}var $m=["workflow_mode","spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_model","orchestration_model","orchestration_effort","orchestration_speed"],eu={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},tu={spec_review_speed:"spec_review_model",plan_review_speed:"plan_review_model",impl_review_speed:"impl_review_model"},xm=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function Ht(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Pt(e){return typeof e=="string"&&e.length>0?e:null}function Xr(e){return e.startsWith("gpt-")?e.slice(4):e}function kt(e,t,n,r,o){return{value:e,source:t,display:n,full_value:r,resolution:o}}function ru(e,t,n){let r=Pt(t[e]);if(r!==null)return{value:r,source:"pin"};let o=Pt(n[e]);return o===null?null:{value:o,source:"global"}}function Vr(e,t,n,r){return ru(e,t,n)||{value:r,source:"base"}}function wa(e,t,n,r){let o=n?.implementation?.model_catalog;if(t&&Ht(o?.[t])){let i=Pt(o[t][e]);if(i!==null)return i}if(t&&Array.isArray(o?.[t])&&o[t].includes(e))return e;if(!t&&Ht(o)){for(let i of Object.values(o))if(Ht(i)){let l=Pt(i[e]);if(l!==null)return l}else if(Array.isArray(i)&&i.includes(e))return e}let s=r?.model_index?.[e];return Pt(r?.runners?.[s]?.models?.[e]?.id)||e}function Am(e,t){return Pt(t?.review?.reviewers?.[e]?.model)||e}function Tr(e,t,n=!1){if(e==="default")return kt(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let r=n?Xr(e):e;return kt(e,t,r,e,"explicit")}function ou(e,t,n){let r=t?.implementation?.model_catalog?.[e],o=[];Ht(r)?o.push(...Object.keys(r)):Array.isArray(r)&&o.push(...r.filter(i=>typeof i=="string"));let s=n?.runners?.[e]?.models;if(Ht(s))for(let i of Object.keys(s))o.includes(i)||o.push(i);return o}function Sm(e,t){let n=[],r=e?.implementation?.model_catalog;Ht(r)&&n.push(...Object.keys(r));let o=t?.runners;if(Ht(o))for(let s of Object.keys(o))n.includes(s)||n.push(s);return n}function Em(e,t,n){if(e===null)return{runtime:null,offered:!1};let r=!1;for(let o of Sm(t,n)){let s=ou(o,t,n);if(s.length>0&&(r=!0),s.includes(e))return{runtime:o,offered:!0}}return{runtime:null,offered:r}}function ka(e){return kt(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function nu(e,t,n){let r=ru(e,t,n);return r?Tr(r.value,r.source):kt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function yn(e){let t=Ht(e.pin)?e.pin:{},n=Ht(e.global)?e.global:{},r=Ht(e.execution_defaults)?e.execution_defaults:null,o=r?.supported===!0&&Ht(r.session)?r.session:null,s=r?.supported===!0&&Ht(r.orchestration)?r.orchestration:null,i=Ht(e.runner_catalog)?e.runner_catalog:null,l=Pt(n.quick_fix_impl_model),a=Em(l,o,i),u={};if(o){let d=Vr("workflow_mode",t,n,Pt(o.workflow_mode_default));u.workflow_mode=d.source==="base"?kt(d.value,"base",d.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",d.value,"default"):Tr(d.value,d.source);for(let F of["spec_review","plan_review","impl_review"]){let q=`${F}_model`,L=Pt(F==="plan_review"?d.value==="fast_track"?o.plan_review?.fast_track_default:o.plan_review?.standard_recommended:o.review?.default),M=Vr(q,t,n,L);if(M.value===null)u[q]=kt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(M.value!=="self"&&M.value!=="skip"&&!Ht(o.review?.reviewers?.[M.value]))u[q]=ka(kt(M.value,M.source,"",null,"explicit"));else{let W=Am(M.value,o);u[q]=kt(M.value,M.source,Xr(W),W,M.source==="base"?"default":"explicit")}}for(let[F,q]of Object.entries(eu)){let L=u[q].value;if(L==="self"||L==="skip"){u[F]=kt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let M=Pt(o.review?.reviewers?.[L||""]?.effort),W=Vr(F,t,n,M);u[F]=W.value===null?kt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):kt(W.value,W.source,W.value,W.value,W.source==="base"?"default":"explicit")}for(let[F,q]of Object.entries(tu)){let L=u[q];if(L.resolution==="incompatible"||L.value==="self"||L.value==="skip"){u[F]=kt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}if(L.resolution==="unavailable"){u[F]=kt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}let M=Vr(F,t,n,"default");u[F]=M.source==="base"?kt("default","base","default (\uC77C\uBC18)","default","default"):Tr(M.value,M.source)}let p=Ht(o.implementation?.default)?o.implementation.default:{},h=Pt(e.route),m=h!==null&&["quick_fix","spec_backed","full_plan"].includes(h),v=Ht(o.implementation?.route_defaults)?o.implementation.route_defaults:{},O=m&&Ht(v[h])?v[h]:{};for(let F of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let q=Vr(F,t,n,F==="impl_dispatch"?Pt(O.dispatch)||Pt(p.dispatch):Pt(p[F.replace("impl_","")]));u[F]=q.value===null?kt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):kt(q.value,q.source,q.value,q.value,q.source==="base"?"default":"explicit")}let B=Pt(t.impl_runtime),V=B==="inherit"?Pt(e.controller_runtime):B,ae=h==="quick_fix"&&Pt(t.impl_dispatch)===null&&a.runtime!==null&&(B===null||V===a.runtime);if(ae){let F=a.runtime,q=l;u.impl_dispatch=kt("delegated","global","\uC704\uC784 (\uC804\uC5ED quick_fix)","delegated","explicit"),B===null&&(u.impl_runtime=kt(F,"global",`${F} (\uC720\uB3C4)`,F,"explicit")),Pt(t.impl_model)===null&&(u.impl_model=kt(q,"global",q,q,"explicit"))}if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let F of["impl_runtime","impl_model","impl_effort","impl_speed"])u[F]=kt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(u.impl_dispatch.value==="delegated"&&!ae&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_model.value!==null){let F=u.impl_runtime.value==="inherit"?Pt(e.controller_runtime):u.impl_runtime.value,q=F?ou(F,o,i):[];if(u.impl_model.value!=="auto"&&q.length>0&&!q.includes(u.impl_model.value))u.impl_model=ka(u.impl_model);else{let L=wa(u.impl_model.value,F,o,i);u.impl_model.display=Xr(L),u.impl_model.full_value=L}}if(u.impl_effort.value==="auto"){let F=Pt(e.transport)||(u.impl_runtime.value==="codex"?"codex-native-spawn":u.impl_runtime.value==="claude"?"implement-claude":null),q=F?Pt(o.implementation?.effort_by_transport?.[F]?.auto):null;q&&!xm.has(q)?(u.impl_effort.display=`${q} (\uBE44\uD638\uD658)`,u.impl_effort.full_value=q,u.impl_effort.resolution="incompatible"):(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}u.impl_speed.value==="default"&&(u.impl_speed=u.impl_speed.source==="base"?kt("default","base","default (\uC77C\uBC18)","default","default"):Tr("default",u.impl_speed.source))}}else for(let d of $m.filter(p=>!p.startsWith("orchestration_")))u[d]=nu(d,t,n);if(!o){for(let[d,p]of Object.entries(eu))(u[p].value==="self"||u[p].value==="skip")&&(u[d]=kt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));for(let[d,p]of Object.entries(tu))(u[p].value==="self"||u[p].value==="skip")&&(u[d]=kt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let d of["impl_runtime","impl_model","impl_effort","impl_speed"])u[d]=kt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else u.impl_dispatch.value==="delegated"&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_effort.value==="auto"&&(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}for(let d of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!s){u[d]=nu(d,t,n);continue}let p=d.replace("orchestration_",""),h=Pt(s[p]),m=Vr(d,t,n,h);if(d==="orchestration_effort"&&m.source==="base"){u[d]=kt(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(m.value===null){u[d]=kt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(d==="orchestration_model"){let v=m.source==="base"?Pt(s.model_id)||m.value:wa(m.value,null,o,i);u[d]=kt(m.value,m.source,Xr(v),v,m.source==="base"?"default":"explicit");continue}if(m.value==="default"){u[d]=m.source==="base"?kt("default","base","default (\uC77C\uBC18)","default","default"):Tr("default",m.source);continue}u[d]=Tr(m.value,m.source)}if(o)if(l===null){let d=u.orchestration_model.full_value;u.quick_fix_impl_model=kt(null,"base",d===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${Xr(d)})`,null,"default")}else if(a.runtime!==null){let d=wa(l,a.runtime,o,i);u.quick_fix_impl_model=kt(l,"global",Xr(d),d,"explicit")}else a.offered?u.quick_fix_impl_model=ka(kt(l,"global","",null,"explicit")):u.quick_fix_impl_model=Tr(l,"global");return u}function Tm(e,t){let n=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let r=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${n} (${r})`}function Hs(e){let t=Ht(e.pin)?e.pin:{},n=Ht(e.global)?e.global:{},r=Ht(e.resolution_global)?{...e.resolution_global}:{};delete r[e.key];let o=p=>{let h={...r,...p};return yn({pin:e.layer==="pin"?h:t,global:e.layer==="pin"?n:h,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},s=e.layer==="pin"?t:n,i={...s};delete i[e.key];let l=o(i)[e.key],a=o(s)[e.key],u=Pt(s[e.key]),d=[...e.choices];return u!==null&&!d.includes(u)&&d.unshift(u),{unset_label:Tm(l,e.layer==="pin"),full_value:l.full_value,unavailable:l.resolution==="unavailable",disabled:a?.resolution==="not_applicable",options:d.map(p=>{let h=o({...s,[e.key]:p})[e.key];return{value:p,label:h.display,full_value:h.full_value}})}}function Cm(e,t=document){let n=t.createElement("dialog");n.className="op-dialog continuation-dialog";let r=t.createElement("button"),o=t.createElement("button"),s=t.createElement("button"),i=t.createElement("h2"),l=t.createElement("p"),a=t.createElement("div");return a.className="op-dialog__actions",i.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",l.textContent=`${bn(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${bn(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,r.type="button",r.className="op-btn",r.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",r.disabled=e.prior_available===!1,o.type="button",o.className="op-btn",o.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",s.type="button",s.className="op-btn",s.textContent="\uCDE8\uC18C",a.append(r,o,s),n.append(i,l,a),t.body.append(n),new Promise(u=>{let d=p=>{typeof n.close=="function"&&n.close(),n.remove(),u(p)};r.addEventListener("click",()=>d("prior_session")),o.addEventListener("click",()=>d("fresh_current")),s.addEventListener("click",()=>d(null)),n.addEventListener("cancel",p=>{p.preventDefault(),d(null)}),typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")})}async function lr(e,t,n={}){let r=e;for(n.onResult?.(r);r?.continuation_mismatch;){let o=r.continuation_mismatch,s=await Cm(o);if(s===null)return r;r=await t(s,o.decision_token),n.onResult?.(r),r?.conflict&&n.refresh&&(r=await n.refresh(r),n.onResult?.(r))}return r}function su(e,t=document){let n=e?.kind==="settlement",r=t.createElement("dialog");r.className="op-dialog resume-instructions-dialog";let o=t.createElement("h2"),s=t.createElement("textarea"),i=t.createElement("div"),l=t.createElement("button"),a=t.createElement("button"),u=[e?.bead_id,e?.tuple].filter(d=>typeof d=="string"&&d!=="").join(" \xB7 ");if(o.textContent=n?"\uCC29\uC9C0 \uC815\uC0B0 \uC7AC\uAC1C":"\uC138\uC158 \uC774\uC5B4\uD558\uAE30",s.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",s.maxLength=4e3,i.className="op-dialog__actions resume-instructions-dialog__actions",l.type="button",l.className="op-btn op-btn--primary",l.textContent=n?"\uC815\uC0B0 \uC7AC\uAC1C":"\uC774\uC5B4\uD558\uAE30",a.type="button",a.className="op-btn",a.textContent="\uCDE8\uC18C",i.append(l,a),r.append(o),u!==""){let d=t.createElement("p");d.className="resume-instructions-dialog__target",d.textContent=u,r.append(d)}return r.append(s,i),t.body.append(r),new Promise(d=>{let p=!1,h=v=>{p||(p=!0,typeof r.close=="function"&&r.close(),r.remove(),d(v))},m=()=>h(s.value.trim());l.addEventListener("click",m),a.addEventListener("click",()=>h(null)),s.addEventListener("keydown",v=>{v.key==="Enter"&&(v.ctrlKey||v.metaKey)&&(v.preventDefault(),m())}),r.addEventListener("cancel",v=>{v.preventDefault(),h(null)}),typeof r.showModal=="function"?r.showModal():r.setAttribute("open",""),s.focus()})}async function Qr(e){let{context:t,transport:n,adopt:r}=e,o=await su(t);if(o===null)return null;let s=o===""?{}:{instructions:o},i=await n({...s});if(r?.(i),i&&i.conflict&&(i=await n({...s}),r?.(i)),i=await lr(i,(l,a)=>n({...s,continuation:l,decision_token:a}),{onResult:r,refresh:()=>n({...s})}),i&&i.resumed===!1&&!i.conflict&&i.reason){let l=t?.kind==="settlement"?"\uC815\uC0B0 \uC7AC\uAC1C":"\uC774\uC5B4\uD558\uAE30";he(`${l} \uAC70\uBD80: ${i.reason}`,"error",2400)}return i}function $a(e){return`session:${e.provider}:${e.session_id}`}function Oo(e){return`${e.provider} \xB7 ${e.session_id.slice(0,8)}`}function Rm(e,t){return e.current&&t==="in_progress"&&e.locality==="local"?"running":"done"}function Zr(e,t,n,r){return{attempt_id:$a(e),session_ref:{bead_id:t,provider:e.provider,session_id:e.session_id},...typeof r=="string"&&r.length>0?{root_dir:r}:{},hide_prompt:!0,meta:{runner:e.provider,label:Oo(e),session_id:e.session_id,...typeof e.resume_command=="string"&&e.resume_command.length>0?{resume_command:e.resume_command}:{},status:Rm(e,n)}}}var xa="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Om="\uBD84\uD574 \uC5C6\uC74C \u2014 \uCD1D\uB7C9\uB9CC \uBCF4\uACE0\uB428",iu="\uBD84\uD574 \uC5C6\uB294 leg";function Wt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Fn=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],Jr=[...Fn,"reasoning_output_tokens"],Lm={codex:["implementation","review-consult"],claude:["subagent"]};function Aa(e){return!e||typeof e!="object"?!1:Number.isFinite(e.total_tokens)&&!Fn.some(t=>Number.isFinite(e[t]))}function Im(e){return!e||typeof e!="object"?!1:Jr.some(t=>Number.isFinite(e[t]))}function Sa(e){let t=0;for(let n of Fn)t+=Wt(e?.[n]);return t}function Mm(e){return!e||typeof e!="object"?!1:Fn.some(t=>Number.isFinite(e[t]))}function au(e){return!e||typeof e!="object"?!1:Jr.some(t=>Number.isFinite(e[t]))||Number.isFinite(e.total_tokens)}function Pm(e){let t={};for(let n of Jr)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function lu(e){let t={};for(let n of Jr)Number.isFinite(e[n])&&(t[n]=e[n]);return Number.isFinite(e.total_tokens)&&(t.total_tokens=e.total_tokens),e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function cu(e,t){return Aa(t)?Wt(t.total_tokens):e==="codex"?Wt(t.input_tokens)+Wt(t.output_tokens):Sa(t)}function Dm(e){return e==="claude"?"Claude":"Codex"}function Nm(e){return`\u03C4 ${du(e)}`}function qm(e,t){let n=t.breakdown||{},r=Wt(t.total_only_subtotal);if(Aa(n)||r>0&&!Im(n)){let u=[`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,Om];return t.replayed&&u.push(xa),u.join(`
`)}let o=[`\uC785\uB825 ${Wt(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Wt(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?o.push(`\uCE90\uC2DC\uC77D\uAE30 ${Wt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Wt(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(o.push(`\uCE90\uC2DC\uC77D\uAE30 ${Wt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${Wt(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&o.push(`\uCD94\uB860\uCD9C\uB825 ${Wt(n.reasoning_output_tokens).toLocaleString("en-US")}`)),r>0&&o.push(`${iu} ${r.toLocaleString("en-US")}`);let s=e==="claude"?"\uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"\uC785\uB825 + \uCD9C\uB825",i=r>0?`${s} + ${iu}`:s,a=[e==="claude"?`Claude subtotal = ${i}`:`Codex subtotal = ${i}; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset`,`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,o.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&a.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&a.push(xa),a.join(`
`)}function Jt(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];r&&t.push({provider:n,label:`${Dm(n)} ${Nm(r.subtotal)}${typeof r.total_cost_usd=="number"&&Number.isFinite(r.total_cost_usd)?` \xB7 $${r.total_cost_usd.toFixed(2)}`:""}`,tooltip:qm(n,r)})}return t}function Ks(e){let t={},n={claude:!0,codex:!1},r={claude:0,codex:0};for(let o of e)if(!(!o||!o.providers))for(let s of["claude","codex"]){let i=o.providers[s];if(!i)continue;let l=t[s];l||(l={subtotal:0,breakdown:{}},t[s]=l),l.subtotal+=i.subtotal,Number.isFinite(i.total_only_subtotal)&&(l.total_only_subtotal=Wt(l.total_only_subtotal)+Wt(i.total_only_subtotal));for(let a of Jr)Number.isFinite(i.breakdown[a])&&(l.breakdown[a]=Wt(l.breakdown[a])+Wt(i.breakdown[a]));i.replayed&&(l.replayed=!0),s==="claude"&&(typeof i.total_cost_usd=="number"&&Number.isFinite(i.total_cost_usd)?r.claude+=i.total_cost_usd:n.claude=!1)}return t.claude&&n.claude&&(t.claude.total_cost_usd=r.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function Ea(e){return!e||typeof e!="object"?null:Kn({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function jm(e){return e==="codex"?"codex":"claude"}function jn(){return{subtotal:0,breakdown:Pm(null),total_only:0,legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function Gs(e,t,n){e.subtotal+=t.subtotal,Aa(t.usage)&&(e.total_only+=t.subtotal);for(let r of Jr)Number.isFinite(t.usage[r])&&(e.breakdown[r]=Wt(e.breakdown[r])+Wt(t.usage[r]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),n&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function uu(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return e.total_only>0&&(n.total_only_subtotal=e.total_only),t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function du(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function eo(e){return Mm(e)?`\u03C4 ${du(Sa(e))}`:null}function Gn(e){let t=eo(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function Lo(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${Wt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Wt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Wt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Wt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${Sa(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(xa),n.join(`
`)}function Kn(e,t){let n={claude:jn(),codex:jn()},r={orchestrator:{claude:jn(),codex:jn()},implementation:{claude:jn(),codex:jn()},"review-consult":{claude:jn(),codex:jn()},subagent:{claude:jn(),codex:jn()}},o=new Set;for(let l of Object.values(e||{})){if(!l||l.bead_id!==t)continue;let a=l.usage;if(au(a)){let d=jm(l.runner),p=lu(a),h={provider:d,role:"orchestrator",attempt_id:String(l.attempt_id||""),usage:p,subtotal:cu(d,p)};p.replayed===!0&&(h.replayed=!0),typeof l.model=="string"&&(h.model=l.model),typeof l.session_id=="string"&&(h.session_id=l.session_id),Gs(n[d],h,!0),Gs(r.orchestrator[d],h,!0)}let u=Array.isArray(l.usage_legs)?l.usage_legs:[];for(let d of u){let p=d&&d.provider==="claude"?"claude":"codex";if(!d||d.provider!=="codex"&&d.provider!=="claude"||!Lm[p].includes(d.role)||!au(d.usage))continue;let h=typeof d.receipt_id=="string"&&d.receipt_id.length>0?d.receipt_id:null;if(!h||o.has(h))continue;o.add(h);let m=lu(d.usage),v={provider:p,role:d.role,attempt_id:String(l.attempt_id||""),usage:m,subtotal:cu(p,m)};v.receipt_id=h,typeof d.agent_type=="string"&&(v.agent_type=d.agent_type),typeof d.agent_id=="string"&&(v.agent_id=d.agent_id),typeof d.model=="string"&&(v.model=d.model),typeof d.effort=="string"&&d.effort.trim().length>0&&(v.effort=d.effort),typeof d.session_id=="string"?v.session_id=d.session_id:typeof d.thread_id=="string"&&(v.session_id=d.thread_id),typeof d.turn_id=="string"&&(v.turn_id=d.turn_id),(typeof d.completed_at=="string"||typeof d.completed_at=="number"&&Number.isFinite(d.completed_at))&&(v.completed_at=d.completed_at),m.replayed===!0&&(v.replayed=!0),Gs(n[p],v,!1),Gs(r[v.role][p],v,!1)}}let s={};for(let l of["claude","codex"]){let a=n[l];if(a.legs.length===0)continue;let u=uu(a,!1);l==="claude"&&a.outer_count>0&&a.outer_cost_count===a.outer_count&&(u.total_cost_usd=a.outer_cost),s[l]=u}if(Object.keys(s).length===0)return null;let i={};for(let l of["orchestrator","implementation","review-consult","subagent"]){let a={};for(let u of["claude","codex"]){let d=r[l][u];d.legs.length>0&&(a[u]={...uu(d,!0),legs:d.legs})}Object.keys(a).length>0&&(i[l]=a)}return{providers:s,roles:i}}var Fm=".chip-popover, .judgement-chip";function to(e){let t=null,n=!1;function r(d){return t!==null&&t.bead_id===d.bead_id&&t.chip_key===d.chip_key}function o(d){t=r(d)?null:{...d},e()}function s(){t!==null&&(t=null,e())}function i(d){let p=d.target;t!==null&&(p&&typeof p.closest=="function"&&p.closest(Fm)||s())}function l(d){d.key==="Escape"&&s()}function a(){n||(n=!0,document.addEventListener("click",i),document.addEventListener("keydown",l))}function u(){n&&(n=!1,document.removeEventListener("click",i),document.removeEventListener("keydown",l))}return{toggle:o,close:s,isOpen:r,attach:a,detach:u}}function no(e){return c`<div
    class="chip-popover"
    role="dialog"
    aria-label=${e.title}
  >
    <div class="chip-popover__title">${e.title}</div>
    <ul class="chip-popover__lines">
      ${e.lines.map(t=>c`<li>${t}</li>`)}
    </ul>
  </div>`}var pu={running:3,paused:2,failed:1};function Yn(e){if(!e||typeof e!="object")return!1;let t=e.kind;return t==null||t==="implementation"}function fu(e){let t=Object.values(e||{}),n=new Map;for(let r of t){if(!r||typeof r.bead_id!="string"||r.bead_id.length===0||r.kind!=="review_session"||r.status!=="running")continue;let o=typeof r.started_at=="number"?r.started_at:null,s=n.get(r.bead_id);s&&(s.started_at??0)>(o??0)||n.set(r.bead_id,{attempt:r,origin:r.origin==="click"||r.origin==="auto"?r.origin:null,started_at:o})}return n}function _u(e,t){let n=Object.values(e||{}),r=new Set,o=new Map;for(let i of n)!i||typeof i.bead_id!="string"||(typeof i.resumed_from=="string"&&i.resumed_from.length>0&&r.add(i.resumed_from),Yn(i)&&o.set(i.bead_id,i.attempt_id));let s=new Map;for(let i of n){if(!i||typeof i.bead_id!="string"||i.bead_id.length===0||!Yn(i))continue;let l=null;if(i.status==="running")l="running";else if(i.status==="paused"&&!r.has(i.attempt_id))l="paused";else if(i.status==="failed"||i.status==="orphaned"){let d=t.get(i.bead_id),p=typeof d=="number"&&d>0&&typeof i.finished_at=="number"&&d>=i.finished_at;o.get(i.bead_id)===i.attempt_id&&!p&&typeof i.dismissed_at!="number"&&(l="failed")}if(!l)continue;let a=typeof i.started_at=="number"?i.started_at:null,u=s.get(i.bead_id);if(u){let d=pu[u.run_state],p=pu[l];if(d>p||d===p&&(u.started_at??0)>(a??0))continue}s.set(i.bead_id,{attempt:i,run_state:l,started_at:a})}return{winners:s,resumed_from_ids:r}}var Ys=["workflow_mode","spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],Ca=[...Ys.filter(e=>e!=="impl_dispatch"),"quick_fix_impl_model","bdui_url"];function mu(e){let t;try{t=new URL(e)}catch{return!1}return(t.protocol==="http:"||t.protocol==="https:")&&e===t.origin}var Vn=["orchestration_model","orchestration_effort","orchestration_speed"],ro=[...Ys,...Vn],Bm=Ca.filter(e=>ro.includes(e)),gu=["delegated","main"],Vs=["inherit","claude","codex"],oo=["default","fast"],Io=["standard","fast_track"],Mo=["codex","opus","fable","self","skip"],Xs=["codex","fable","skip"],Qs=["low","medium","high","xhigh"],hu=["default","fast"],wn="auto";function vn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function bu(e){if(!vn(e)||!vn(e.runners))return[];let t=[];for(let[n,r]of Object.entries(e.runners))vn(r)&&vn(r.models)&&t.push([n,Object.keys(r.models)]);return t}function so(e,t){let n=bu(e),r=t&&t!=="inherit"?n.filter(([o])=>o===t):n;return[wn,...r.flatMap(([,o])=>o)]}function yu(e,t,n,r){if(!vn(e)||!vn(e.runners))return[wn];let o=[];for(let[s,i]of Object.entries(e.runners))if(!(!vn(i)||!vn(i.models))&&!(t&&t!=="inherit"&&s!==t))for(let[l,a]of Object.entries(i.models)){if(n&&n!==wn&&l!==n)continue;let u=r(i,a);if(Array.isArray(u))for(let d of u)typeof d=="string"&&!o.includes(d)&&o.push(d)}return[wn,...o]}function io(e,t,n){return yu(e,t,n,(r,o)=>vn(o)&&Array.isArray(o.efforts)?o.efforts:r.efforts)}function Ra(e,t,n){return yu(e,t,n,(r,o)=>vn(o)&&Array.isArray(o.orchestration_efforts)?o.orchestration_efforts:vn(o)&&Array.isArray(o.efforts)?o.efforts:r.efforts)}function Po(e,t){let n=bu(e);return(t?n.filter(([o])=>o===t):n).flatMap(([,o])=>o)}function vu(e,t,n){let r={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},o=r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:r.impl_runtime==="inherit"?n:null;return o&&(r.impl_model&&!so(t,o).includes(r.impl_model)&&(r.impl_model=void 0),r.impl_effort&&!io(t,o,r.impl_model||wn).includes(r.impl_effort)&&(r.impl_effort=void 0)),r}var Um={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",spec_review_speed:"\uC2A4\uD399 \uB9AC\uBDF0 \uC18D\uB3C4",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",plan_review_speed:"\uACC4\uD68D \uB9AC\uBDF0 \uC18D\uB3C4",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_review_speed:"\uAD6C\uD604 \uB9AC\uBDF0 \uC18D\uB3C4",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},Ta=[...Bm,...Vn],Wm=[...ro,...Ca].filter((e,t,n)=>n.indexOf(e)===t&&!Ta.includes(e));function wu(e,t){let n=vn(e)?e:{},r=vn(t)?t:{},o=[];for(let i of Ta){let l=n[i]??null,a=r[i]??null;l!==a&&o.push({key:i,label:Um[i]||i,before:l,after:a,kind:l===null?"added":a===null?"removed":"changed"})}let s=[];for(let i of[...Wm,...Object.keys(r)])!Ta.includes(i)&&!s.includes(i)&&Object.hasOwn(r,i)&&s.push(i);return{rows:o,ignored_keys:s}}function Oa(e,t,n,r,o,s){return Hs({key:e,choices:t,layer:"global",global:n,resolution_global:s,execution_defaults:r,runner_catalog:o})}function ku(e,t){let n={};for(let r of Ca){let o=e?.[r],s=t?.[r];o!==s&&(n[r]=typeof s=="string"&&s.length>0?s:null)}return n}function $u(e,t){let n={};for(let r of Vn){let o=e?.[r]??null,s=t?.[r]??null;o!==s&&(n[r]=typeof s=="string"&&s.length>0?s:null)}return n}var La=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Vn]}],cr={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",spec_review_speed:"\uC0AC\uC591 \uB9AC\uBDF0 \uC18D\uB3C4",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",plan_review_speed:"\uACC4\uD68D \uB9AC\uBDF0 \uC18D\uB3C4",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_review_speed:"\uAD6C\uD604 \uB9AC\uBDF0 \uC18D\uB3C4",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},Zs={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function Ia(e,t,n,r,o,s=null){let i=yn({pin:t,global:n,execution_defaults:r,runner_catalog:o,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:s});return e.map(l=>({key:l,...i[l]}))}function xu(e,t,n,r,o,s=null){let i={pin:0,global:0,base:0};for(let l of Ia(e,t,n,r,o,s))i[l.source]+=1;return i}function Au(e,t,n){return{id:e,key:t,value:typeof n=="string"?n:""}}function Su(e,t,n){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:n}}var x$=[...Ys,...Vn];var Eu=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed","impl_runtime","impl_model","impl_effort"];function Do(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Js(e){if(!Do(e)||!Do(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>Do(n)&&Do(n.models));return t.length>0?t:null}function Sn(e,t){let n=Js(e);if(!n||!t)return null;for(let[r,o]of n)if(Object.hasOwn(o.models,t))return r;return null}function Tu(e,t){return Do(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function Cu(e,t){let n=Js(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return Tu(r,r.models[t]);return[]}function zm(e){let t=Js(e);if(!t)return[];let n=[];for(let[,r]of t)for(let o of Object.values(r.models))for(let s of Tu(r,o))n.includes(s)||n.push(s);return n}function Hm(e,t){if(!t)return zm(e);let r=Js(e)?.find(([s])=>s===t)?.[1];if(!r)return[];let o=[];for(let s of Object.keys(r.models))for(let i of Cu(e,s))o.includes(i)||o.push(i);return o}function Ru(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},o=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!o)return r.impl_model="",r.impl_effort="",r;let s=Sn(t,r.impl_model);if(r.impl_model&&(!o||s!==o))return r.impl_model="",r.impl_effort="",r;let i=r.impl_model?Cu(t,r.impl_model):Hm(t,o);return r.impl_effort&&i.length>0&&!i.includes(r.impl_effort)&&(r.impl_effort=""),r}var Ma=new Set(["unavailable","not_applicable"]);function ur(e,t){if(typeof e!="object"||e===null)return null;let n=e[t];return typeof n=="object"&&n!==null?n:null}function Ou(e){return e.filter(t=>t!==null).join(" \xB7 ")}function dr(e,t){return t===null?null:`${cr[e]}: ${t.display} (${Zs[t.source]})`}function Pa(e){return e.filter(t=>t!==null).join(`
`)}function Da(e){if(typeof e!="object"||e===null)return null;let t=bn(e);if(t==="")return null;let n=(r,o)=>typeof o=="string"&&o.length>0?`${r}: ${o}`:null;return{text:t,title:Pa(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",n("runner",e.runner),n(cr.orchestration_model,e.model),n(cr.orchestration_effort,e.effort),n(cr.orchestration_speed,e.speed)])}}function ao(e,t){let n=ur(e,"orchestration_model");if(n===null||n.resolution==="unavailable")return null;let r=ur(e,"orchestration_effort"),o=ur(e,"orchestration_speed"),s=Ou([Sn(t,n.value??""),n.display,r!==null&&r.value!==null?r.display:null,o!==null&&o.value==="fast"?"Fast":null]);return s===""?null:{text:s,title:Pa(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",dr("orchestration_model",n),dr("orchestration_effort",r),dr("orchestration_speed",o)])}}function Gm(e,t){return e===null||e.value===null||Ma.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function Km(e){return e===null||Ma.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function Ym(e){return e===null?null:e.value==="auto"?"auto":Ma.has(e.resolution)?null:e.display}function Cr(e,t){if(typeof e!="object"||e===null)return null;let n=ur(e,"impl_dispatch"),r=ur(e,"impl_runtime"),o=ur(e,"impl_model"),s=ur(e,"impl_effort"),i=ur(e,"impl_speed"),l=n!==null&&n.value==="main"?"\uBA54\uC778":Ou([Gm(r,t??null),Km(o),Ym(s),i!==null&&i.value==="fast"?"Fast":null]);return l===""?null:{text:l,title:Pa(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",dr("impl_dispatch",n),dr("impl_runtime",r),dr("impl_model",o),dr("impl_effort",s),dr("impl_speed",i)])}}var Vm=Object.freeze(new Set(["push_not_contained","invalid_impl_review","premature_close","head_mismatch","foreign_deploy_unsupported","not_resolved"])),Xm=Object.freeze(["delivery_unproven:"]);function ei(e){let t=e&&typeof e.reason=="string"?e.reason:"";if(t.length===0||Vm.has(t))return"session";for(let n of Xm)if(t.startsWith(n))return"session";return"settlement"}var Qm=["hard_diagnosis","invariant_reasoning","verification_by_judgment","claude_bound"];var Zm={hard_diagnosis:"\uC6D0\uC778\uC774 \uBD88\uBA85\uD655\uD558\uAC70\uB098 \uC7AC\uD604\uC774 \uBD88\uC548\uC815\uD574 \uAC00\uC124-\uAC80\uC99D \uB8E8\uD504\uAC00 \uD544\uC694\uD558\uB2E4",invariant_reasoning:"\uC815\uD569\uC131\uC774 \uC0C1\uD0DC\uAE30\uACC4\xB7\uB3D9\uC2DC\uC131\xB7\uBD88\uBCC0\uC2DD \uCD94\uB860\uC5D0 \uB2EC\uB824 \uC788\uB2E4",verification_by_judgment:"\uD14C\uC2A4\uD2B8\uAC00 \uBABB \uC7A1\uACE0 \uB9AC\uBDF0\uC5B4\uC758 \uCD94\uB860\uC73C\uB85C\uB9CC \uAC80\uC99D\uD560 \uC218 \uC788\uB2E4",claude_bound:"Claude \uC138\uC158 \uC790\uC0B0\xB7\uC758\uBBF8\uB860\uC5D0 \uAC15\uD558\uAC8C \uBB36\uC5EC \uC788\uB2E4"};function Na(e){return(e&&Array.isArray(e.reasons)?e.reasons:[]).map(n=>Zm[n]||"").filter(n=>n.length>0)}var Lu={orchestration_model:["fable"],impl_runtime:["claude"]},qa={unapplied:"\uBBF8\uC801\uC6A9",applied:"\uC801\uC6A9\uB428",diverged:"\uCD94\uCC9C\uACFC \uB2E4\uB984"};function Iu(e){return typeof e=="object"&&e!==null?e:null}function Mu(e,t){return typeof e=="string"&&t.includes(e)?e:""}function Jm(e){return typeof e!="string"?[]:e.split("+").map(t=>t.trim()).filter(t=>Qm.includes(t))}function No(e,t=e){let n=Iu(e);if(!n)return null;let r=Mu(n.rec_orchestration_model,Lu.orchestration_model);if(r.length===0)return null;let o=Mu(n.rec_impl_runtime,Lu.impl_runtime),s={orchestration_model:r};o.length>0&&(s.impl_runtime=o);let i=Iu(t)||{},l=Object.keys(s),a=0,u=0;for(let p of l){let h=i[p];typeof h=="string"&&h.length>0&&(a+=1,h===s[p]&&(u+=1))}let d=a===0?"unapplied":u===l.length?"applied":"diverged";return{reasons:Jm(n.rec_reason),rec:s,state:d}}function ti(e){if(!e||typeof e!="object")return"";let t=Na(e),n=qa[e.state]||"",r=["\uBCF5\uC7A1\uD55C \uC791\uC5C5\uC73C\uB85C \uD310\uC815\uB428"];return t.length>0&&r.push(`\uC0AC\uC720: ${t.join(" \xB7 ")}`),n.length>0&&r.push(`\uC0C1\uD0DC: ${n}`),r.join(`
`)}function ni(e){return e.replace(/\/+$/,"")}function eg(e,t){let n=ni(e),r=ni(t);return n===r||r.startsWith(`${n}/`)||n.startsWith(`${r}/`)}function ri(e,t){let n=new Set;for(let r of e)for(let o of t){if(!eg(r,o))continue;let s=ni(r),i=ni(o);n.add(s.length>=i.length?s:i)}return[...n].sort()}function ja(e,t){return`${e}\0${t}`}function Pu(e){let t=new Map;for(let n of Array.isArray(e?.running)?e.running:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"running",state:"running"});for(let n of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let n of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let r=Array.isArray(n.sublanes?.parallel)?n.sublanes.parallel:Array.isArray(n.items)?n.items:[];for(let o of r)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:"parallel",position:o.queue_position});for(let o of Array.isArray(n.sublanes?.serial)?n.sublanes.serial:[])for(let s of o.items)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:o.id,position:s.queue_position})}for(let n of Array.isArray(e?.runnable)?e.runnable:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"runnable",state:"runnable"});for(let n of Array.isArray(e?.done)?e.done:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"done",state:"done"});return t}function Fa(e,t){let n=Array.isArray(t)?t:[],r=e.indexOf("-"),o=r>0?e.slice(0,r):e;return n.some(s=>typeof s?.issue_prefix=="string"&&s.issue_prefix===o)?"internal":n.length>0&&n.every(s=>typeof s?.issue_prefix=="string")?"external":"unknown"}function qo(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function Du(e,t,n,r){let o=n.get(e);if(!!(o&&t&&o.root_dir===t.root_dir&&o.lane===t.lane&&typeof o.position=="number"&&typeof t.position=="number"&&o.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0};if(o)return{id:e,label:`\u{1F512} ${e} (${qo(o)})`,location_label:qo(o),scope:null,same_lane_ahead:!1};let i=Fa(e,r),l=i==="internal"?"\uBBF8\uC801\uC7AC":i==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${l})`,location_label:l,scope:i,same_lane_ahead:!1}}function Nu(e){let t=Array.isArray(e)?e:[],n=new Map,r=new Map,o=new Map;for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let u=ja(l.root_dir,a.id);n.set(u,{root_dir:l.root_dir,workspace_name:l.name,lane:a.id}),o.set(u,[]);for(let d of Array.isArray(a.items)?a.items:[])r.set(d.id,u)}for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let u=ja(l.root_dir,a.id),d=Array.isArray(a.items)?a.items[0]:null,h=!!d&&d.queue_index===0&&(!Array.isArray(a.occupied_by)||a.occupied_by.length===0)&&Array.isArray(d.blocked_by)?d.blocked_by:[],m=o.get(u);if(m)for(let v of h){let O=r.get(v);O&&O!==u&&!m.includes(O)&&m.push(O)}}let s=(l,a)=>{let u=new Set,d=[l];for(;d.length>0;){let p=d.pop();if(p===a)return!0;!p||u.has(p)||(u.add(p),d.push(...o.get(p)||[]))}return!1},i=new Map;for(let[l,a]of o){let u=[];for(let d of a){let p=n.get(d);s(d,l)&&p&&u.push(p)}u.length>0&&i.set(l,u)}return i}function qu(e,t){return ja(e,t)}var tg=Object.freeze(["done","abandoned"]);function ju(e){return!e||typeof e!="object"||Array.isArray(e)?!1:typeof e.phase=="string"&&!tg.includes(e.phase)}async function ng(e){let t=await sn(e);he(t?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",t?"success":"error",1200)}function lo(e){return typeof e!="string"||e.length===0?"":c`<span class="worker-ev__copyline"
    ><code class="worker-ev__path">${e}</code
    ><button
      type="button"
      class="worker-ev__copy"
      data-seam="log-path-copy"
      title="로그 경로 복사"
      aria-label=${`\uB85C\uADF8 \uACBD\uB85C \uBCF5\uC0AC: ${e}`}
      @click=${()=>{ng(e)}}
    >
      ⧉
    </button></span
  >`}var rg="worker-ineligible";function jo(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Fu(e){return jo(e).includes(rg)}var Bu=new WeakMap;function co(e){return e&&typeof e=="object"?e:{}}function og(e){let t=Bu.get(e);if(t)return t;let n=Wu(e);return Bu.set(e,n),n}function oi(e,t){return(Array.isArray(e)?e:[]).findIndex(r=>r&&r.bead_id===t)}function sg(e,t){if(e.length===0)return null;if(og(t).has(e))return{lane:"running"};if(oi(t.pr_wait,e)>=0)return{lane:"pr_wait"};let n=oi(t.queue,e);if(n>=0)return{lane:"parallel",index:n};for(let r of Array.isArray(t.serial_lanes)?t.serial_lanes:[]){if(!r||typeof r.id!="string"||!/^s[1-5]$/.test(r.id))continue;let o=oi(r.entries,e);if(o>=0)return{lane:r.id,index:o}}return oi(t.done,e)>=0?{lane:"done"}:null}function Fo(e,t){let n=co(e),r=co(t),o=Hr(n),i=(typeof n.workflow?.route=="string"&&n.workflow.route||(typeof co(n.metadata).route=="string"?co(n.metadata).route:""))==="quick_fix",l=!Object.hasOwn(n,"description")||typeof n.description=="string"&&n.description.trim().length>0,a=Object.hasOwn(n,"labels")&&Fu(n.labels),u=Object.hasOwn(co(n.metadata),"awaiting_user"),d=!a&&!u&&(i?l:o.evidence==="published"&&!o.conflict),p=sg(typeof n.id=="string"?n.id:"",r);return{placeable:d&&p===null,worker_ineligible:a,awaiting_user:u,missing_description:i&&!l,spec:i?"n/a":o.conflict?"conflict":o.evidence,location:p}}function si(e){let t=e.location;if(t)switch(t.lane){case"running":return"\uC2E4\uD589 \uC911\uC774\uB77C \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4";case"pr_wait":return"PR \uB300\uAE30 \uC911\uC774\uB77C \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4";case"done":return"\uC644\uB8CC \uB808\uC778\uC5D0 \uC788\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4";case"parallel":return`\uC774\uBBF8 \uB300\uAE30 \uC911 \xB7 \uBCD1\uB82C #${t.index+1}`;default:return`\uC774\uBBF8 \uB300\uAE30 \uC911 \xB7 \uC9C1\uB82C ${t.lane.slice(1)} #${t.index+1}`}return e.placeable?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":e.worker_ineligible?"worker-ineligible label\uB85C \uC6CC\uCEE4\uC5D0\uC11C \uC2E4\uD589\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":e.awaiting_user?"\uC0AC\uC6A9\uC790 \uB9AC\uBDF0\uB97C \uAE30\uB2E4\uB9AC\uB294 \uC911\uC774\uB77C \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":e.missing_description?"description\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"spec\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}function Bo(e){let t=co(e),n=typeof t.serial_lane_count=="number"&&Number.isInteger(t.serial_lane_count)&&t.serial_lane_count>0?Math.min(t.serial_lane_count,5):0,r=Array.isArray(t.serial_lanes)?t.serial_lanes:[],o=[];for(let i of r){if(o.length>=n)break;!i||typeof i.id!="string"||!/^s[1-5]$/.test(i.id)||!Array.isArray(i.entries)||o.push({id:i.id,label:`\uC9C1\uB82C ${i.id.slice(1)}`,count:i.entries.length})}return o.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(t.queue)?t.queue:[]).length},...o]}function Uu(e){return/^s[1-5]$/.test(e)?`\uC9C1\uB82C ${e.slice(1)}`:"\uBCD1\uB82C"}function ai(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function Gu(e){return e==="session"?"bead\uAC00 in_progress\uB85C \uC7A1\uD78C \uB4A4 \uB2EB\uD788\uAE30\uAE4C\uC9C0\uC758 \uACBD\uACFC":"attempt \uC2E4\uD589 \uC2DC\uAC04 \uD569\uC0B0 (\uC7AC\uAC1C \uC138\uC158 \uD3EC\uD568)"}function Or(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let n=Math.floor(t/60);if(n<60)return`${n}\uBD84 ${Math.round(t-n*60)}\uCD08`;let r=Math.floor(n/60),o=n%60;return`${r}\uC2DC\uAC04 ${o}\uBD84`}function Ku(e,t){if(typeof e!="object"||e===null)return[];let n=!1,r=!1;for(let o of Object.values(e)){if(typeof o!="object"||o===null)continue;let s=o;s.bead_id!==t||s.kind!=="review_session"||(n=!0,r=r||s.origin==="auto")}return n?[r?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"]:[]}function zu(e){return e==="auto"||e==="click"?e:null}function Yu(e,t){if(typeof e!="object"||e===null)return{active:!1,failure:null,origin:null};let n=!1,r=null,o=-1,s=null,i=null,l=-1;for(let a of Object.values(e)){if(typeof a!="object"||a===null)continue;let u=a;if(u.bead_id!==t||u.kind!=="review_session")continue;if(u.status==="pending"||u.status==="running"){n=!0;let p=typeof u.started_at=="number"?u.started_at:0;p>=o&&(o=p,r=zu(u.origin));continue}if(u.status!=="failed")continue;let d=typeof u.finished_at=="number"?u.finished_at:0;d>=l&&(l=d,s=typeof u.cause=="string"&&u.cause.length>0?u.cause:null,i=zu(u.origin))}return n?{active:!0,failure:null,origin:r}:{active:!1,failure:s,origin:i}}function Vu(e,t){if(typeof e!="object"||e===null)return null;let n=0,r=!1;for(let o of Object.values(e)){if(typeof o!="object"||o===null)continue;let s=o;if(s.bead_id!==t)continue;let i=s.started_at,l=s.finished_at;typeof i!="number"||typeof l!="number"||!Number.isFinite(i)||!Number.isFinite(l)||l<i||(n+=l-i,r=!0)}return r?n:null}function li(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function ig(e,t){let n=Array.isArray(e)?e:[],r=Array.isArray(t)?t:[];if(n.length===0&&r.length===0)return null;let o=null;for(let i of n)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!o||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof o.finished_at=="number"?o.finished_at:0))&&(o=i);let s=n.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+r.length;return{deploy:o?{sha:ai(o.target_sha),at:typeof o.finished_at=="number"?o.finished_at:null,elapsed_ms:typeof o.elapsed_ms=="number"?o.elapsed_ms:null}:null,unresolved:s,badge:s>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${s}`}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function Xu(e,t){let n=ig(e,t);return n?c`<button
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
            title=${n.deploy.at?Kt(n.deploy.at):""}
            >${li(n.deploy.at)}${n.deploy.elapsed_ms!==null?` \xB7 ${Or(n.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${n.badge.tone}"
      >${n.badge.label}</span
    >
  </button>`:""}function uo(e){let t=on(e.created_at),n=on(e.updated_at);return!t&&!n?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${Kt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&n?c`<span>·</span>`:""}${n?c`<span title=${`\uC218\uC815 ${Kt(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </div>`}function ag(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="abandoned"?"\uD3D0\uAE30 \uD3EC\uAE30\uB428":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function Wo(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function zo(e,t){return t.kind==="stale_work_backup_fresh"?`${e}: \uC2E4\uD328\uD55C \uBC31\uC5C5 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4. \uBC31\uC5C5\uC740 \uB9CC\uB4E4\uC5B4\uC9C0\uC9C0 \uC54A\uC558\uACE0 \uAE30\uC874 \uC791\uC5C5\uC740 \uADF8\uB300\uB85C \uB0A8\uC2B5\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uC2E4\uD328\uD55C \uD3D0\uAE30 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4. \uBC31\uC5C5\uACFC \uD3D0\uAE30\uB294 \uC218\uD589\uB418\uC9C0 \uC54A\uC558\uACE0 bead\uB294 \uD3D0\uAE30 \uC774\uC804 \uC0C1\uD0DC\uB85C \uB3CC\uC544\uAC11\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function ci(e){return e.kind==="stale_work_backup_fresh"?`\uBC31\uC5C5 \uD3EC\uAE30\uB428 \xB7 \uAE30\uC874 \uC791\uC5C5\uC740 \uADF8\uB300\uB85C \uB0A8\uC2B5\uB2C8\uB2E4 (\uC6D0\uC778: ${e.last_error})`:`\uD3D0\uAE30 \uD3EC\uAE30\uB428 \xB7 \uD3D0\uAE30\uB294 \uC218\uD589\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 (\uC6D0\uC778: ${e.last_error})`}function ui(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function Qu(e){return e?.startsWith("orphan_gitlink_content:")?`\uB9E4\uD551 \uC5C6\uB294 gitlink \uACBD\uB85C ${e.slice(23)}\uC5D0 \uB0B4\uC6A9\uC774 \uC788\uC2B5\uB2C8\uB2E4 \u2014 \uC800\uC7A5\uC18C\uC5D0\uC11C \uADF8 \uACBD\uB85C\uB97C \uC815\uB9AC\uD55C \uB4A4 \uC7AC\uC2DC\uB3C4\uD558\uAC70\uB098 \uD3EC\uAE30\uD558\uC138\uC694`:e==="dirty_submodule"?"\uC11C\uBE0C\uBAA8\uB4C8\uC5D0 \uBBF8\uCEE4\uBC0B \uBCC0\uACBD\uC774\uB098 \uBBF8\uCD08\uAE30\uD654 \uD56D\uBAA9\uC774 \uC788\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC \uD6C4 \uC7AC\uC2DC\uB3C4\uD558\uC138\uC694":e==="submodule_observation_failed"?"\uC11C\uBE0C\uBAA8\uB4C8 \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (git \uC624\uB958) \u2014 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C git \uBA85\uB839\uC744 \uC9C1\uC811 \uD655\uC778\uD558\uC138\uC694":null}function Xn(e,t,n={}){let o=Object.values(e&&typeof e=="object"?e:{}).filter(h=>h&&h.bead_id===t&&ju(h)).sort((h,m)=>(h.requested_at||0)-(m.requested_at||0)).at(-1),s=typeof n.attempt_id=="string"&&n.attempt_id.length>0?n.attempt_id:typeof o?.attempt_id=="string"?o.attempt_id:null,i=n.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":n.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":n.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,l=typeof o?.last_error=="string"?o.last_error:null,a=o?ag(o.phase):null,u=o?.kind==="stale_work_backup_fresh",d=Qu(l),p=n.merged||o?.mode==="merged_revert"?"merged":"unmerged";return{action:!n.external&&!n.done,enabled:!i&&(!o||!!l),label:u?l?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":l?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:i||(l?d?`\uD3D0\uAE30 \uC2E4\uD328: ${l} \u2014 ${d}`:u?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${l} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${l} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:o?`${a||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:p==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:s,operation:o||null,progress:a,error:l,confirmation:p,abandon:{action:!!o&&o.phase==="requested"&&!!l,label:u?"\uBC31\uC5C5 \uD3EC\uAE30":"\uD3D0\uAE30 \uD3EC\uAE30",title:u?"\uC2E4\uD328\uD55C \uBC31\uC5C5 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4 \u2014 \uC6D0\uBCF8\uC740 \uADF8\uB300\uB85C \uB0A8\uACE0 \uC0C8\uB85C \uC2DC\uC791\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4":"\uC2E4\uD328\uD55C \uD3D0\uAE30 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4 \u2014 \uBC31\uC5C5\xB7\uD3D0\uAE30\uB294 \uC218\uD589\uB418\uC9C0 \uC54A\uC558\uACE0 bead\uB294 \uD3D0\uAE30 \uC774\uC804 \uC0C1\uD0DC\uB85C \uB3CC\uC544\uAC11\uB2C8\uB2E4"}}}function Zu(e){if(!e||e.quickfix_lane!==!0)return!1;let t=e.quickfix_landing;return!t||typeof t!="object"?!1:["repo_operations","branch_cleanup","parent_close"].includes(t.cursor)}function ii(e){let t=e.discard;if(!t||!t.operation)return"";let n=t.operation,r=Qu(t.error),o=n.kind==="stale_work_backup_fresh"&&!t.error?null:n.backup?.path,s=n.original_pr,i=n.revert_pr;return c`<div
    class="worker-discard-receipt"
    role=${t.error?"alert":"status"}
  >
    <span>${t.progress}</span>
    ${t.error?c`<span
          >폐기 실패: ${t.error}${r?` \u2014 ${r}`:""}</span
        >`:""}
    <code>작업: ${n.operation_id}</code>
    ${o?c`<code>백업: ${o}</code>`:t.error?c`<span>아직 아무것도 삭제하지 않음</span>`:""}
    ${s?.url?c`<a href=${s.url} target="_blank" rel="noreferrer noopener"
          >원본 PR #${s.number||"?"}</a
        >`:""}
    ${i?.url?c`<a href=${i.url} target="_blank" rel="noreferrer noopener"
          >revert PR #${i.number||"?"} ·
          ${i.state||"\uC0C1\uD0DC \uBBF8\uD655\uC778"}</a
        >`:""}
  </div>`}var lg={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function Ju(e,t=!1){if(!e||typeof e!="object")return null;let n=e;if(n.reason!=="worktree_stale_work"||!n.stale_work||typeof n.stale_work!="object")return null;let r=n.stale_work,o=r.residue==="branch"?"branch":"worktree",s=r.state==="unique"?"unique":"unknown",i=r.summary&&typeof r.summary=="object"?r.summary:{};function l(u){return Number.isInteger(i[u])?Number(i[u]):0}let a=typeof r.cause=="string"?r.cause:"observe_failed";return{residue:o,state:s,title:o==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":s==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:lg[a]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:o==="branch"?`\uACE0\uC720 commit ${l("branch_ahead")}`:[`staged ${l("staged_count")}`,`unstaged ${l("unstaged_count")}`,`untracked ${l("untracked_count")}`,`branch ahead ${l("branch_ahead")}`,`HEAD ahead ${l("head_ahead")}`].join(" \xB7 "),action_id:typeof r.action_id=="string"?r.action_id:"",can_resume:r.can_resume===!0,can_continue:r.can_continue===!0,can_backup_fresh:r.can_backup_fresh===!0,can_recheck:r.can_recheck===!0,locked:t}}function di(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let n=t.pin===!0?" exec-chip--pin":"",r=t.pin===!0?`
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
      >`:""}`}function Uo(e,t){let n=`worker-dep worker-dep--${t}${e.foreign?" worker-dep--foreign":""}`;return e.openable===!0?c`<button
        type="button"
        class=${`${n} worker-dep__open`}
        data-dep-id=${e.id}
        data-root-dir=${e.root_dir||""}
        title=${e.title||""}
      >
        ${e.label}
      </button>`:c`<span class=${n} title=${e.title||""}>${e.label}</span>`}function cg(e){return{id:e.id,label:`\u29C9 ${e.id}`,title:[`\uACB9\uCE68 \xB7 ${e.location_label}`,...e.prefixes].join(`
`),openable:!0,...e.root_dir?{root_dir:e.root_dir}:{}}}function Ba(e){return Array.isArray(e)?e.slice().sort((t,n)=>t.id<n.id?-1:t.id>n.id?1:0):[]}function ug(e,t=!1){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__spec-after-blocker"
    data-chip-key="spec_after_blocker"
    aria-expanded=${t?"true":"false"}
    title="선행의 결과가 설계 전제라 스펙도 선행 뒤에 씁니다"
  >
    스펙 대기
  </button>`:""}function pi(e,t=""){if(!e)return t===""?"":c`<div class="worker-deps worker-deps--primary">
          ${t}
        </div>`;let n=Ba(e.predecessors),r=Array.isArray(e.released)?e.released:[],o=Ba(e.dependents),s=Ba(e.overlaps),i=e.scope_missing===!0,l=e.armed_lane||null,a=!!l||n.length>0||o.length>0||t!=="",u=r.length>0||s.length>0||i;return!a&&!u?"":c`${a?c`<div class="worker-deps worker-deps--primary">
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
            >`:""}${n.map(d=>Uo(d,"pred"))}${t}${o.map(d=>Uo(d,"dependents"))}
      </div>`:""}${u?c`<div class="worker-deps worker-deps--secondary">
        ${r.map(d=>Uo(d,"released"))}${s.map(d=>Uo(cg(d),"overlap"))}${i?c`<span
              class="worker-dep worker-dep--muted"
              title="겹침 판정 불가 — 아티팩트가 있으면 스펙/플랜 front-matter, 없으면 description \`## scope\`에 선언 필요"
              >scope 없음</span
            >`:""}
      </div>`:""}`}function ed(e,t=""){let n=(Array.isArray(e)?e:[]).filter(r=>typeof r=="string"&&r!=="").slice().sort();return n.length===0?"":c`<div class="worker-deps worker-deps--secondary">
    ${n.map(r=>Uo({id:r,label:`\uC774\uC6D4 \u2192 ${r}`,title:`\uC774\uC6D4\uB41C \uD6C4\uC18D ${r} \uC5F4\uAE30`,openable:!0,...t?{root_dir:t}:{}},"dependents"))}
  </div>`}function fi(e){return e?c`<button
    type="button"
    class="worker-dep worker-dep--lane mon-lane__chip"
    data-lane-id=${e.lane_id}
    title="이 연결 레인으로 이동"
  >
    ${e.label}
  </button>`:""}function _i(e){if(!e)return"";let t=e.chips||{},n=t.route||e.route,r=t.route_source==="derived"||e.route_source==="derived";return n?c`<span
    class="ctl-chip ctl-chip--route${r?" is-derived":""}"
    title=${r?"route \uBBF8\uD540 (metadata unset)":"route"}
    >${r?"unset":n}</span
  >`:""}function dg(e,t=!1){let n=e?e.quick_fix_review:null;if(!n)return"";let r=n.state;if(r!=="reviewed"&&r!=="stale")return"";let o=Array.isArray(n.missing)?n.missing:[],s=[r==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",...o].join(`
`);return c`<button
    type="button"
    class="ctl-chip judgement-chip worker-card__qfr worker-card__qfr--${r}"
    data-chip-key="qfr"
    aria-expanded=${t?"true":"false"}
    title=${s}
  >
    ${r==="reviewed"?"\uB9AC\uBDF0 \u2713":"\uB9AC\uBDF0 stale"}
  </button>`}function td(e){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--from"
    data-from-id=${e}
    title=${`\uCD9C\uCC98 ${e} \uC5F4\uAE30`}
  >
    ↩ from ${e}
  </button>`:""}function mi(e,t=!1){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__rec"
    data-chip-key="rec"
    data-state=${e.state}
    aria-expanded=${t?"true":"false"}
    title=${ti(e)}
  >
    ${"\uBCF5\uC7A1"}
  </button>`:""}var pg={absent:"\uC2E4\uD589 \uC601\uC218\uC99D\uC774 \uAE30\uB85D\uB418\uC9C0 \uC54A\uC558\uB2E4 \u2014 \uACFC\uAC70 Bead\xB7\uC678\uBD80 \uACBD\uB85C PR\uC740 \uC6D0\uB798 \uC5C6\uB2E4",unparsable:"\uC601\uC218\uC99D \uAC12\uC744 \uC77D\uC744 \uC218 \uC5C6\uB2E4 \u2014 40hex SHA\uB098 `delegated:`/`main:` \uD615\uC2DD\uC774 \uC544\uB2C8\uB2E4",effort_unknown:"effort \uD1A0\uD070\uC774 harness \uC5B4\uD718 \uBC16\uC774\uB2E4 \u2014 \uBAA8\uB378\xB7SHA\xB7unit\uC740 \uC720\uD6A8\uD558\uB2E4",main_reason_retired:"`main:` \uC0AC\uC720\uAC00 \uACE0\uC815 4\uD1A0\uD070(bead\xB7quick_fix_default\xB7phase_line\xB7takeover) \uBC16\uC774\uB2E4",main_receipt_unbacked:"`main:` \uC0AC\uC720\uB97C \uB4B7\uBC1B\uCE68\uD558\uB294 \uBA54\uD0C0\uB370\uC774\uD130(impl_dispatch\xB7route\xB7planned_execution\xB7quick_fix \uAE30\uBCF8 dispatch)\uAC00 \uC5C6\uB2E4",takeover_lineage_missing:"`main:takeover`\uC778\uB370 resolved \uBAA8\uB378\uACFC \uC77C\uCE58\uD558\uB294 \uC644\uB8CC\uB41C \uC704\uC784 \uC138\uC158\uC774 \uC5C6\uB2E4",takeover_lineage_unobservable:"`main:takeover`\uC778\uB370 \uC704\uC784 \uACC4\uBCF4\uB97C \uBAA8\uB2C8\uD130\uAC00 \uBCFC \uC218 \uC5C6\uB2E4(Codex \uBC16 \uB7F0\uD0C0\uC784)"};function fg(e,t=!1){let n=nd(e);if(n.length===0)return"";let r=n.length>1?`\uC601\uC218\uC99D \xB7 ${n[0]} +${n.length-1}`:`\uC601\uC218\uC99D \xB7 ${n[0]}`;return c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__receipt"
    data-chip-key="receipt"
    data-bead-id=${e.id}
    aria-expanded=${t?"true":"false"}
    title=${n.join(", ")}
  >
    ${r}
  </button>`}function nd(e){let t=e.receipt_badge?e.receipt_badge.codes:null;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function rd(e,t){return!e||typeof t!="number"?"":c`<a
    class="worker-mini__pr"
    href=${e}
    target="_blank"
    rel="noreferrer noopener"
    title="PR 열기"
    >#${t} ↗</a
  >`}function gi(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=Math.max(0,Math.min(4,Math.trunc(e)));return c`<span class="worker-pri" title=${`\uC6B0\uC120\uC21C\uC704 P${t}`}
    >P${t}</span
  >`}function _g(e){let t=Array.isArray(e.badges)?e.badges:[],n=Jt(e.usage),r=Gn(e.usage),o=on(e.done_at);return c`<div
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
      ${rd(e.pr_url,e.pr_number)}${o?c`<span
            class="worker-mini__done-at"
            title=${`\uC644\uB8CC ${Kt(e.done_at)}`}
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
    ${ed(e.carried_to,e.root_dir)}
    <div class="worker-mini__row3">
      ${n.length>0?n.map(s=>c`<span class="worker-usage" title=${s.tooltip}
                >${s.label}</span
              >`):r?c`<span class="worker-usage" title=${Lo(e.usage)}
              >${r}</span
            >`:""}
      ${typeof e.work_ms=="number"?c`<span
            class="worker-mini__work"
            title=${Gu(e.work_kind)}
            >작업 ${Or(e.work_ms)}</span
          >`:""}
    </div>
  </div>`}function po(e,t={}){if(!(e.draggable!==!0||e.done===!0))return c`<span class="worker-mini__rowops">
    ${t.nudgeable===!0?c`<button
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
  </span>`}function En(e,t={}){if(e.lane==="done"&&e.done_layout==="three_line")return _g(e);let n=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],o=Jt(e.usage),s=Gn(e.usage),i=e.merge_step||null,l=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work||e.discard?.abandon.action===!0,a=e.lane==="done"&&!l,u=a?on(e.done_at):"",d=n?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",p=typeof e.seq=="number"?c`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",h=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",m=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,v=e.lane==="done"?"":_i(e.workflow),O=e.lane==="done"?"":td(e.from_id),B=gi(e.priority),V=c`<span class="worker-mini__title">${e.title}</span>`,ae=rd(e.pr_url,e.pr_number),F=r.map(Ye=>Ye===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${Ye}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${Ye===e.completion_badge&&e.completion_title||""}
          >${Ye}</span
        >`),q=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",L=o.length>0?o.map(Ye=>c`<span class="worker-usage" title=${Ye.tooltip}
              >${Ye.label}</span
            >`):s?c`<span class="worker-usage" title=${Lo(e.usage)}
            >${s}</span
          >`:"",M=i?c`<span
        class="merge-step${i.failed?" merge-step--failed":""}"
        style=${`--progress: ${i.percent}%`}
        >${i.label}${i.index>0?c`<span class="merge-step__n"
              >${i.index}/${i.total}</span
            >`:""}</span
      >`:"",W=e.merge_action?c`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",K=e.cancel_action?c`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",H=e.discard,D=H?.action||e.discard_action?c`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${H?.attempt_id||""}
          data-operation-id=${H?.operation?.operation_id||""}
          data-discard-mode=${H?.confirmation||"unmerged"}
          ?disabled=${H?!H.enabled:e.discard_enabled===!1}
          title=${H?H.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${H?.label||"\uD3D0\uAE30"}
        </button>`:"",G=H?.abandon.action?c`<button
        type="button"
        class="worker-mini__discard-abandon"
        data-bead-id=${e.id}
        data-operation-id=${H.operation.operation_id}
        data-operation-kind=${H.operation.kind||""}
        data-last-error=${H.error||""}
        title=${H.abandon.title}
      >
        ${H.abandon.label}
      </button>`:"",X=e.resolve_action?c`<button
        type="button"
        class="worker-mini__resolve"
        data-bead-id=${e.id}
        ?disabled=${e.resolve_enabled===!1}
        title=${e.resolve_title||"\uC2E4\uD328\uD55C \uC791\uC5C5\uC744 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 (\uAE30\uB85D\uB41C \uC138\uC158\uC774 \uC788\uC73C\uBA74 fork)"}
      >
        세션에서 해결
      </button>`:"",J=H?.abandon.action?c`${D}${G}${X}`:c`${X}${D}`,fe=e.stale_work||null,Ce=fe?c`${fe.can_resume||fe.can_continue?c`<button
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
          </button>`:""}`:"",U=fe?c`<div class="worker-mini__stale">
        <strong>${fe.title}</strong>
        <span>${fe.summary}</span>
        <span>${fe.cause}</span>
        ${fe.can_backup_fresh?c`<small
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
        </button>`:"",xe=!!(e.lane!=="pr_wait"&&!e.done&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)),Ee=mi(e.rec,Rr(e,"rec")),R=fg(e,Rr(e,"receipt")),re=fi(e.cross_lane_chip),ve=lo(e.log_path),ye=h||re||v||O||xe||Ee||R||L||ve?c`<div class="worker-chips">
          ${h}${re}${v}${O}${xe?di(e.exec_chips,{pin:e.exec_chips_pinned===!0}):""}${Ee}${R}${L}${ve}${Ua(e)}
        </div>`:"",Oe=pi(e.dependency_chips),_e=ii(e),Le=t.actions?t.actions:"",Ve=!!(i||e.merge_action||e.cancel_action||e.resolve_action||e.discard_action||H?.operation||e.revise_action||fe);return c`<div
    class="worker-mini${l?" worker-mini--card":""}${n?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${i?" worker-mini--merging":""}${i?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}${e.search_match===!1?" is-dimmed":""}"
    style=${i?`--progress: ${i.percent}%`:""}
    draggable=${n?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${a?c`<div class="worker-mini__row1">
            ${h}${m}${B}${O}${ae}${V}${Le}
          </div>
          ${ed(e.carried_to,e.root_dir)}
          <div class="worker-mini__row2">
            ${L}${u?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${Kt(e.done_at)}`}
                  >완료 ${u}</span
                >`:""}${typeof e.work_ms=="number"?c`<span
                  class="worker-mini__work"
                  title=${Gu(e.work_kind)}
                  >작업 ${Or(e.work_ms)}</span
                >`:""}${F}${M}
            <span class="worker-mini__actions"
              >${W}${K}${J}</span
            >
            ${uo(e)}
          </div>`:l?c`<div class="worker-mini__head">
              ${d}${p}${m}${B}${ae}${F}${q}${Le}
            </div>
            <div class="worker-mini__body">${V}${U}</div>
            ${Oe}${ye}${Ve?c`<div class="worker-mini__foot">
                  ${M}
                  <span class="worker-mini__actions"
                    >${W}${K}${J}${te}${Ce}</span
                  >
                  ${ii(e)}
                </div>`:""}
            ${uo(e)}`:c`<div class="worker-mini__line">
              ${d}${p}${m}${B}${V}${ae}${F}${q}${M}${W}${K}${J}${Le}
            </div>
            ${Oe}${ye}${_e} ${uo(e)}`}
  </div>`}function za(e,t){let n,r=[];for(let o of e){let s=o.group||"";s.length>0&&s!==n&&r.push(c`<div class="worker-card__place-group">${s}</div>`),n=s,r.push(c`<button
        type="button"
        class="worker-card__place-lane${s.length>0?" worker-card__place-lane--nested":""}"
        data-bead-id=${t}
        data-lane=${o.id}
        ?disabled=${o.disabled===!0}
        title=${o.title||`${o.label} \uB300\uAE30 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00`}
      >
        <span>${o.label}</span>
        ${typeof o.count=="number"?c`<span class="worker-card__place-count">${o.count}</span>`:""}
      </button>`)}return c`${r}`}var od={external_roundtrip:"\uD558\uB124\uC2A4 \uBC16 \uC0C1\uB300\uC640 \uC608\uCE21 \uBD88\uAC00 \uC655\uBCF5 \uBC18\uBCF5 \u2014 \uB2E4\uB978 rig \uC138\uC158\xB7\uC0AC\uB78C\xB7\uC678\uBD80 \uC2DC\uC2A4\uD15C",user_feedback_loop:"\uC9C4\uD589 \uC911 \uC0AC\uC6A9\uC790 \uD53C\uB4DC\uBC31 \uC5C6\uC774\uB294 \uD488\uC9C8\uC774 \uB0AE\uC74C \u2014 \uBB38\uC548\xB7\uC124\uACC4 \uC138\uBD80\xB7\uBC29\uD5A5 \uC120\uD0DD"};function Ha(e,t){if(t==="rec"){let n=e.rec;if(!n)return null;let r=qa[n.state]||"";return{title:"\uBCF5\uC7A1\uD55C \uC791\uC5C5\uC73C\uB85C \uD310\uC815\uB428",lines:[...Na(n),...r.length>0?[`\uC0C1\uD0DC: ${r}`]:[],"\uC801\uC6A9\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uC2E4\uD589 \uC124\uC815 \uD3B8\uC9D1\uAE30\uC5D0\uC11C"]}}if(t==="session_preferred"){if(e.session_preferred!==!0)return null;let n=od[e.session_preferred_reason||""]||"";return{title:"\uC6CC\uCEE4\uB85C \uB3CC\uB9B4 \uC218 \uC788\uC9C0\uB9CC \uC138\uC158\uC774 \uB0AB\uB2E4",lines:n.length>0?[n]:[]}}if(t==="ineligible")return e.worker_ineligible!==!0?null:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uB300\uC0C1\uC774 \uC544\uB2C8\uB2E4",lines:["worker-ineligible \uB77C\uBCA8\uC774 \uBD99\uC5B4 \uC788\uB2E4 \u2014 \uB77C\uBCA8\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uB77C\uBCA8 \uC808\uC5D0\uC11C \uB5C0\uB2E4"]};if(t==="spec_after_blocker")return e.spec_after_blocker!==!0?null:{title:"\uC120\uD589 \uACB0\uACFC\uAC00 \uC124\uACC4 \uC804\uC81C \u2014 \uC2A4\uD399\uB3C4 \uC120\uD589 \uB4A4\uC5D0",lines:[`\uC120\uD589: ${(Array.isArray(e.blocked_by)?e.blocked_by:[]).join(" \xB7 ")}`,"\uC120\uD589\uC774 \uB2EB\uD788\uBA74 \uC774 \uD45C\uC2DC\uB294 \uC800\uC808\uB85C \uC0AC\uB77C\uC9C4\uB2E4 \u2014 \uB77C\uBCA8\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uB77C\uBCA8 \uC808\uC5D0\uC11C \uB5C0\uB2E4"]};if(t==="receipt"){let n=nd(e);return n.length===0?null:{title:"\uC2E4\uD589 \uC601\uC218\uC99D \uD68C\uACC4 \uC794\uC5EC \u2014 \uBA38\uC9C0\uB294 \uC9C4\uD589",lines:[...n.map(r=>pg[r]||r),"\uC790\uB3D9 \uBA38\uC9C0 \uD310\uC815\uC5D0\uB294 \uC601\uD5A5\uC774 \uC5C6\uB2E4 \u2014 \uC815\uC815\uC740 bd update --set-metadata exec_receipt=\u2026 \uB85C"]}}if(t==="qfr"){let n=e.workflow?e.workflow.quick_fix_review:null;if(!n||n.state!=="reviewed"&&n.state!=="stale")return null;let r=Array.isArray(n.missing)?n.missing:[];return{title:n.state==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",lines:r.length>0?r:["\uBE60\uC9C4 \uD56D\uBAA9 \uC5C6\uC74C"]}}return null}var mg=["rec","receipt","session_preferred","ineligible","qfr","spec_after_blocker"];function hi(e,t){for(let n of mg){if(!t(n))continue;let r=Ha(e,n);return r?{chip_key:n,content:r}:null}return null}function Ua(e){return e.chip_popover?no(e.chip_popover.content):""}function Rr(e,t){return!!e.chip_popover&&e.chip_popover.chip_key===t}var bi="\uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694";function Ga(e,t=null,n={}){let r=e.worker_ineligible===!0,o=e.draggable&&!e.done&&!r,s=e.queue_placeable===!0&&!e.done&&!r,i=s&&t&&t.bead_id===e.id,l=e.session_preferred===!0,a=od[e.session_preferred_reason||""]||"",u=e.workflow,d=typeof e.reason=="string"?e.reason.split(" \xB7 "):[],p=d.includes("missing_description"),h=d.some(M=>M.startsWith(bi)),m=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),v=Rr(e,"spec_after_blocker"),O=ug(e.spec_after_blocker===!0,v),B=pi(e.dependency_chips,O===""?"":c`${O}${v?Ua(e):""}`),V=e.workspace_name?c`<span class="worker-card__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",ae=fi(e.cross_lane_chip),F=_i(u),q=td(e.from_id),L=!!(e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker));return c`<div
    class="worker-card${o?"":" worker-card--static"}${r?" worker-card--ineligible":""}${e.search_match===!1?" is-dimmed":""}"
    draggable=${o?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${o?c`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span
      >${gi(e.priority)}
      ${r?c`<button
            type="button"
            class="ctl-chip ctl-chip--label judgement-chip worker-card__ineligible"
            data-chip-key="ineligible"
            aria-expanded=${Rr(e,"ineligible")?"true":"false"}
            title="worker-ineligible label이 붙어 워커 실행 대상이 아닙니다"
          >
            worker-ineligible
          </button>`:l?c`<button
              type="button"
              class="ctl-chip ctl-chip--label judgement-chip worker-card__session-preferred"
              data-chip-key="session_preferred"
              aria-expanded=${Rr(e,"session_preferred")?"true":"false"}
              title=${a}
            >
              세션 권장
            </button>`:""}${mi(e.rec,Rr(e,"rec"))}${dg(u,Rr(e,"qfr"))}
      ${v?"":Ua(e)}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${u?Bs(u,e.status,{onOpenDoc:n.onOpenDoc}):""}${B}
    ${V||ae||F||q||L?c`<div class="worker-chips">
          ${V}${ae}${F}${q}${di(e.exec_chips,{pin:n.exec_chips_mode==="pinned_only"})}
        </div>`:""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${i?c`<div class="worker-card__place-menu">
            ${za(t.lanes,e.id)}
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
                 유일한 경로다 (UI-d13v §6). 막는 것은 예전 드래그와 같다 — spec
                 없는 후보만 막고, blocked-with-spec은 적재할 수 있다. 포인터
                 종류로 감추지 않는다: 드래그라는 대체 경로가 없다. -->
            <button
              type="button"
              class="op-btn op-btn--primary worker-card__place"
              data-bead-id=${e.id}
              ?disabled=${!s}
              title=${si({placeable:s,worker_ineligible:r,awaiting_user:h,missing_description:p})}
            >
              ↴ 대기로
            </button>`}
    </div>
    ${uo(e)}
  </div>`}function Bn(e){let t=!!e.collapsible&&!!e.collapsed,n=typeof e.count=="number"?e.count:e.items.length,r=c`<span
      class="worker-pane__dot worker-pane__dot--${e.lane}"
      aria-hidden="true"
    ></span>
    <span class="worker-pane__title">${e.title}</span>
    ${t&&e.preview?c`<span class="worker-pane__preview">${e.preview}</span>`:""}
    <span class="worker-pane__count">${n}</span>
    ${typeof e.match_count=="number"?c`<span class="worker-pane__match">일치 ${e.match_count}</span>`:""}`;return c`<section
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
                  </div>`:e.items.map(o=>e.lane==="candidate"?Ga(o,e.place_menu,{onOpenDoc:e.onOpenDoc}):En(o))}
          </div>`}
  </section>`}function Hu(e,t,n){return c`<button
      type="button"
      class="worker-wait__area-toggle"
      data-area=${e}
      aria-expanded=${n?"false":"true"}
      aria-label=${`${t} ${n?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
    >
      ${n?"\u25B8":"\u25BE"}
    </button>
    <span class="worker-wait__area-name">${t}</span>`}function yi(e){let t=e.parallel,n=e.serial,r=t.drop||{};return c`<div class="worker-wait">
    <section
      class="worker-wait__area worker-wait__area--parallel${t.collapsed?" is-collapsed":""}"
      data-area="parallel"
    >
      <header class="worker-wait__area-hd">
        ${Hu("parallel","\uBCD1\uB82C \uC601\uC5ED",t.collapsed)}
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
        ${Hu("serial","\uC9C1\uB82C \uC601\uC5ED",n.collapsed)}
        ${n.header_control?n.header_control:""}
      </header>
      ${n.collapsed?"":c`<div class="worker-wait__area-body">
            ${n.notice?n.notice:""}
            ${n.extra_panes?n.extra_panes:""}
            ${n.lanes.map(o=>gg(o))}
          </div>`}
    </section>
  </div>`}function gg(e){let t=e.drop||{},n=e.badge?c`<span
        class="worker-lane__badge${e.held?" worker-lane__badge--held":""}"
        >${e.badge}</span
      >`:"";return c`<div
    class="worker-wait__lane${e.empty?" worker-wait__lane--empty":""}"
  >
    ${Bn({id:typeof e.pane_id=="string"?e.pane_id:`worker-pane-lane-${e.id}`,lane:e.id,title:e.title,items:[],count:e.count,match_count:e.match_count,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:c`${n}${e.header_control?e.header_control:""}`,body:c`<div
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
  </div>`}function vi(e){return e.count?c`<section
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
  </section>`:""}var sd=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],Ho=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"post_merge_jobs",label:"\uBA38\uC9C0 \uD6C4 \uC7A1"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function wi(e,t){let n=sd.find(o=>o.step===e);if(!n)return null;let r=sd.length;return{step:n.step,label:t,index:n.index,total:r,percent:Math.round(n.index/r*100)}}function id(e){let t=Ho.findIndex(n=>n.step===e);return Ho.map((n,r)=>({step:n.step,label:n.label,state:t<0?"todo":r<t?"done":r===t?"stall":"todo"}))}function Lr(e){let t=Ho.find(n=>n.step===e);return t?t.label:typeof e=="string"?e:""}function hg(e){let t=Ho.findIndex(n=>n.step===e);return t<0?null:{index:t+1,total:Ho.length}}function ki(e){let t=hg(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var Ya=new Set(["queued","running","retry_pending"]),ad=new Set(["failed","succeeded"]),bg={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uC2DC\uB3C4 \uB300\uAE30"},Go={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},yg={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:Go.base_containment,child_sweep:Go.child_sweep,branch_cleanup:Go.branch_cleanup,parent_close:Go.parent_close};function vg(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function wg(e,t,n){return!["verify","deploy"].includes(e.kind)||![...Ya,...ad].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(r=>r&&typeof r=="object"&&r.bead_id===t&&r.merged_sha===n)}function kg(e,t){let n=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(n!==0)return n;let r=u=>u.state==="succeeded"?1:2,o=r(t)-r(e);if(o!==0)return o;let s=typeof e.requested_at=="number"?e.requested_at:0,i=typeof t.requested_at=="number"?t.requested_at:0;if(s!==i)return i-s;let l=typeof e.operation_id=="string"?e.operation_id:"",a=typeof t.operation_id=="string"?t.operation_id:"";return l.localeCompare(a)}function Ka(e,t=!1){let n=e.kind,r=n==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",o=t?"failed":e.state,s=bg[o];if(!s)return null;let i=wi(n,`${r} ${s}`);return i?{...i,active:Ya.has(o),failed:o==="failed"}:null}function $g(e){return!e||typeof e!="object"?null:yg[e.step]||null}function Ko(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,n=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},r=$g(n),o=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,s=["post_merge_jobs","child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),i=!s&&(e.cleanup_cursor==="repo_operations"||n.step==="repo_operations"),l=vg(e.merge_sha)?e.merge_sha:null,a=!s&&l&&Array.isArray(e.repo_operations)?e.repo_operations.filter(v=>v&&typeof v=="object"&&wg(v,t,l)).sort(kg):[],u=i?a:[],d=u.find(v=>Ya.has(v.state));if(d)return Ka(d);if(o)return o.step==="repo_operations"&&a[0]?Ka(a[0],!0):null;let p=u.find(v=>ad.has(v.state)?v.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(p)return Ka(p);if(r){let v=wi(r.step,r.label);return v?{...v,active:!0,failed:!1}:null}let h=typeof e.cleanup_cursor=="string"?Go[e.cleanup_cursor]:null;if(!h)return null;let m=wi(h.step,h.label);return m?{...m,active:!0,failed:!1}:null}function $i(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var xg="\uBBF8\uC801\uC7AC";function Va(e,t){let n=zn(e,t.id);return{id:t.id,label:`\u26D3 ${t.id}`,title:`\uC120\uD589 \u2014 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4 (${t.location_label})`,...n?{foreign:!0}:{}}}var Ag=10080*60*1e3;function ld(e,t,n){let r=t.closed_at;if(typeof r!="number"||!Number.isFinite(r)||r<n-Ag)return null;let o=zn(e,t.id),s=typeof t.root_dir=="string"?t.root_dir:"",i={id:t.id,label:`\u{1F513} ${t.id}`,title:`\uD574\uC81C \u2014 ${Kt(r)}\uC5D0 close\uB418\uC5B4 \uC774 \uC774\uC288\uAC00 \uD480\uB838\uB2E4`,...o?{foreign:!0}:{}};return o?s.length>0&&(i.openable=!0,i.root_dir=s):i.openable=!0,i}function cd(e,t){let n=Array.isArray(t.ids)?t.ids.filter(s=>typeof s=="string"&&s.length>0):[],r=t.root_dirs&&typeof t.root_dirs=="object"?t.root_dirs:{},o=[];for(let s of[...new Set(n)].sort()){let i=zn(e,s),l=typeof r[s]=="string"?r[s]:"",a={id:s,label:`\u2192 ${s}`,title:"\uD6C4\uC18D \u2014 \uC774 \uC774\uC288\uAC00 close\uB418\uBA74 \uD480\uB9B0\uB2E4",...i?{foreign:!0}:{}};l.length>0?(a.openable=!0,a.root_dir=l):i||(a.openable=!0),o.push(a)}return o}function ud(e,t,n={}){let r=new Map,o=new Map;for(let s of t)o.has(s.id)||o.set(s.id,s.location_label);for(let[s,i]of e){if(typeof s!="string"||s.length===0)continue;let l=[];for(let a of Array.isArray(i)?i:[]){if(typeof a!="string"||a.length===0)continue;let u=Va(s,{id:a,location_label:o.get(a)||xg}),d=n[a];u.foreign!==!0?u.openable=!0:typeof d=="string"&&d.length>0&&(u.openable=!0,u.root_dir=d),l.push(u)}l.length>0&&r.set(s,l)}return r}var Ai=1,Yo=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],Za=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],fo={show_blocked:!0,spec:"all"},dd={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328",refuted:"\uBC18\uC99D",no_delta:"\uBB34-delta"};function Sg(e,t){let n=null;for(let r of Object.values(e||{}))!r||r.bead_id!==t||!Yn(r)||(n=typeof r.status=="string"?r.status:null);return n}function Eg(e,t){let n=null,r=-1/0;for(let o of Object.values(e)){if(!o||o.bead_id!==t||o.status==="running"||!Yn(o))continue;let s=typeof o.finished_at=="number"?o.finished_at:typeof o.started_at=="number"?o.started_at:0;s>=r&&(r=s,n=o)}return n}function Wu(e){let t=st(e),n=new Map;for(let r of Array.isArray(t.done)?t.done:[])r&&typeof r.bead_id=="string"&&typeof r.added_at=="number"&&n.set(r.bead_id,r.added_at);return new Set(bd(st(t.attempts),n).keys())}function bd(e,t,n={}){let{winners:r,resumed_from_ids:o}=_u(e,t),s=new Map;for(let[i,l]of r){let a=l.attempt,u=l.run_state,d=l.started_at,p=typeof a.session_id=="string"&&a.session_id.length>0,m=ei(a.quickfix_landing)==="session",v=u!=="running"&&(p||!m)&&!o.has(a.attempt_id),O=!p&&m?"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":o.has(a.attempt_id)?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null,B=st(n.observations?.[i]),V=st(B.pr),ae=typeof a.merge_sha=="string"&&a.merge_sha.length>0||V.state==="MERGED",F=Xn(n.discard_operations,i,{attempt_id:a.attempt_id,merged:ae}),q=u==="failed"?fd(a,{resume_eligible:v,resume_reason:O,confirmation:F.confirmation,history:n.bead_timelines?.[i]}):null;s.set(i,{...pd(a,e,u),started_at:d,...q?{failure:q}:{},can_pause:u==="running"&&p,can_resume:v})}for(let[i,l]of Og(e,t)){if(s.has(i))continue;let a=l.attempt,u=Xn(n.discard_operations,i,{attempt_id:a.attempt_id}),d=yd(a);s.set(i,{...pd(a,e,l.run_state),started_at:typeof a.started_at=="number"?a.started_at:null,...l.run_state==="parked"?{failure:fd(a,{resume_eligible:!1,resume_reason:"\uC138\uC158 \uB300\uAE30 \u2014 [\uC7AC\uC2DC\uB3C4]\uAC00 \uC0C8 attempt\uB97C \uB744\uC6C1\uB2C8\uB2E4",confirmation:u.confirmation,history:n.bead_timelines?.[i]})}:{},...l.run_state==="waiting"?{wait:Cg(a)}:{},...d?{retry:d}:{},can_pause:!1,can_resume:!1})}return s}function pd(e,t,n){return{attempt_id:typeof e.attempt_id=="string"?e.attempt_id:"",run_state:n,last_event_at:typeof e.last_event_at=="number"?e.last_event_at:null,last_activity:e.last_activity&&typeof e.last_activity=="object"?e.last_activity:null,legs:Array.isArray(e.legs)?e.legs:[],runner:typeof e.runner=="string"?e.runner:null,model:typeof e.model=="string"?e.model:null,effort:typeof e.effort=="string"?e.effort:null,speed:typeof e.speed=="string"?e.speed:null,resumed_from:typeof e.resumed_from=="string"?e.resumed_from:null,continuation_mode:e.continuation_mode==="session"||e.continuation_mode==="fresh"?e.continuation_mode:null,status:typeof e.status=="string"?e.status:null,usage:Kn(t,e.bead_id)}}function fd(e,t){let n=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null;return{cause:typeof e.cause=="string"?e.cause:null,cause_detail:n,summary:n&&typeof n.summary=="string"?n.summary:null,bead_id:typeof e.bead_id=="string"?e.bead_id:"",finished_at:typeof e.finished_at=="number"?e.finished_at:null,runner:typeof e.runner=="string"?e.runner:null,model:typeof e.model=="string"?e.model:null,effort:typeof e.effort=="string"?e.effort:null,observed_effort:typeof e.observed_effort=="string"?e.observed_effort:null,speed:typeof e.speed=="string"?e.speed:null,attempt_id:typeof e.attempt_id=="string"?e.attempt_id:"",usage:e.usage&&typeof e.usage=="object"?e.usage:null,halted_auto_advance:e.halted_auto_advance===!0,quickfix_lane:e.quickfix_lane===!0,quickfix_landing:e.quickfix_landing&&typeof e.quickfix_landing=="object"?e.quickfix_landing:null,retry:yd(e),resume_eligible:t.resume_eligible,resume_reason:t.resume_reason,landed:Zu(e),confirmation:t.confirmation,...Tg(t.history)}}function Tg(e){if(!e||typeof e!="object")return{};let t=Array.isArray(e.events)?e.events:[],n=[];for(let o of t)!o||typeof o!="object"||typeof o.summary!="string"||o.summary.length===0||n.push({event_id:typeof o.event_id=="string"?o.event_id:"",kind:typeof o.kind=="string"?o.kind:"",summary:o.summary,at:typeof o.at=="number"?o.at:null});n.reverse();let r=typeof e.log_path=="string"&&e.log_path.length>0?e.log_path:null;return{...n.length>0?{timeline:n}:{},...r===null?{}:{log_path:r},...e.log_expired===!0?{log_expired:!0}:{},...e.log_unreadable===!0?{log_unreadable:!0}:{}}}function Cg(e){let t=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null,n=Array.isArray(t?.blockers)?t.blockers:[],r=[];for(let o of n)!o||typeof o!="object"||typeof o.id!="string"||o.id.length===0||r.push({id:o.id,rig:typeof o.rig=="string"?o.rig:null,status:typeof o.status=="string"?o.status:""});return{summary:t&&typeof t.summary=="string"?t.summary:null,blockers:r,since:typeof e.finished_at=="number"?e.finished_at:null}}function yd(e){let t=e&&e.retry&&typeof e.retry=="object"?e.retry:null;return t?{cause:typeof t.cause=="string"?t.cause:null,attempts:typeof t.attempts=="number"?t.attempts:0,max:typeof t.max=="number"?t.max:0,next_at:typeof t.next_at=="number"?t.next_at:null}:null}var Rg=new Set(["parked","retry_wait","waiting"]);function Og(e,t){let n=Object.values(e||{}),r=new Map;for(let s of n)s&&typeof s.bead_id=="string"&&Yn(s)&&r.set(s.bead_id,s.attempt_id);let o=new Map;for(let s of n){if(!s||typeof s.bead_id!="string"||s.bead_id.length===0||!Yn(s)||!Rg.has(s.status)||r.get(s.bead_id)!==s.attempt_id||typeof s.dismissed_at=="number")continue;let i=t.get(s.bead_id);typeof i=="number"&&i>0&&typeof s.finished_at=="number"&&i>=s.finished_at||o.set(s.bead_id,{attempt:s,run_state:s.status})}return o}function _d(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"",o=r.indexOf(":");return o>0&&o<r.length-1?`\u26D4 ${r.slice(0,o)} (${r.slice(o+1)})`:`\u26D4 ${r}`}function st(e){return e&&typeof e=="object"?e:{}}function Lg(e){let t=st(e).badge_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function Ig(e,t,n){let r=st(t);if(Object.keys(r).length===0)return null;let o=e.execution_defaults,s=e.runner_catalog,i=e.session_defaults;if(!o||!s||!i)return null;let l=h=>yn({pin:h,global:i,execution_defaults:o,runner_catalog:s,route:n}),a,u;try{a=l(r),u=l(null)}catch{return null}let d=md(ao(a,s),ao(u,s)),p=md(Cr(a,null),Cr(u,null));return d||p?{orchestration:d,worker:p}:null}function md(e,t){return!e||t&&t.text===e.text?null:e}function Mg(e,t,n){let o=(t&&typeof t=="object"&&Array.isArray(t.released_by)?t.released_by:[]).filter(i=>i&&typeof i=="object"&&typeof i.id=="string").slice().sort((i,l)=>(typeof l.closed_at=="number"?l.closed_at:0)-(typeof i.closed_at=="number"?i.closed_at:0)),s=[];for(let i of o){let l=ld(e,i,n);l&&s.push(l)}return s.length===0?null:s}function Ja(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}var Pg=new Set(["quick_fix","spec_backed","full_plan"]);function gd(e){return typeof e=="string"&&Pg.has(e)}function Dg(e){let t={...st(e.session_defaults)};for(let n of["orchestration_model","orchestration_effort","orchestration_speed"]){let r=e[n];typeof r=="string"&&(t[n]=r)}return t}function Ng(e,t,n){let r=e.runner_catalog??null,o=Qa(e,t,n,null);if(!o)return null;let s=Sn(r,o.orchestration_model.value??""),i=s===null?o:Qa(e,t,n,s)||o,l=ao(i,r),a=Cr(i,s);return l||a?{orchestration:l,worker:a}:null}function Qa(e,t,n,r){let o=gd(n)?n:gd(t.route)?t.route:null;try{return yn({pin:t,global:Dg(e),execution_defaults:e.execution_defaults??null,runner_catalog:e.runner_catalog??null,route:o,controller_runtime:r})}catch{return null}}function qg(e,t,n){return!t||!Object.hasOwn(t,"metadata")?null:Cr(Qa(e,st(t.metadata),t.route,n),n)}function el(e,t){let n=new Set,r=e;for(;r&&!n.has(r.attempt_id);){if(r.conflict_resolution===!0)return!0;n.add(r.attempt_id),r=typeof r.resumed_from=="string"&&r.resumed_from.length>0&&t.get(r.resumed_from)||null}return!1}function jg(e){let t={};for(let l of Fn)t[l]=0;let n=!1,r=0,o=0,s=0;for(let l of e){let a=l.usage;if(!a||typeof a!="object")continue;let u=!1;for(let d of Fn)Number.isFinite(a[d])&&(t[d]+=a[d],n=!0,u=!0);u&&(o+=1,Number.isFinite(a.total_cost_usd)&&(r+=a.total_cost_usd,s+=1))}o>0&&s===o&&(t.total_cost_usd=r);let i=e.map(l=>l.usage).filter(l=>l&&typeof l=="object"&&l.providers);return i.length>0?Jt(Ks(i)):n?Gn(t):null}function vd(e,t){let n=Fa(e,t);return n==="internal"?"\uBBF8\uC801\uC7AC":n==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function Fg(e,t,n){let r=t.get(e);if(!r)return vd(e,n);if(typeof r.position=="number"){if(r.lane==="parallel")return`#${r.position}`;if(/^s[1-5]$/.test(r.lane))return`${r.lane} #${r.position}`}return qo(r)}function Bg(e,t,n,r){let o=t.get(e);if(!o)return{label:vd(e,n),title:""};if(typeof o.position=="number"&&(o.lane==="parallel"||/^s[1-5]$/.test(o.lane))){let i=r.get(e),l=o.lane==="parallel"?"\uBCD1\uB82C":o.lane;return{label:i&&i.length>0?"\u{1F512} \uB300\uAE30":"\uB300\uAE30",title:`${o.workspace_name||o.root_dir} ${l} #${o.position}`}}return{label:o.state==="running"?"\u25B6 \uC2E4\uD589\uC911":qo(o),title:""}}function Ug(e,t){for(let n of Object.values(e||{}))if(n&&n.attempt_id===t&&typeof n.armed_by_lane=="string"&&n.armed_by_lane.length>0)return n.armed_by_lane;return null}function Wg(e,t,n,r,o,s){return t==="draft"?{state:"draft",badge:"draft",run_label:null,can_stop:!1}:n.some(i=>s.failed_by_bead.get(i.id)===e)?{state:"failed",badge:"\u26D4 \uC2E4\uD328",run_label:"\u25B6 \uB2E4\uC2DC \uC9C4\uD589",can_stop:!1}:s.disarmed_lanes.has(e)?{state:"restart",badge:"\u23F8 \uC7AC\uC2DC\uC791",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}:n.some(i=>s.armed_by_bead.get(i.id)===e)?{state:"running",badge:"\u25B6 \uC9C4\uD589 \uC911",run_label:o.length>0?"\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589":null,can_stop:!0}:r?{state:"all_done",badge:"\uBAA8\uB450 \uC644\uB8CC",run_label:null,can_stop:!1}:{state:"confirmed",badge:"\uD655\uC815",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}}function zg(e,t,n,r,o,s,i){let l=[];return e.forEach((a,u)=>{let d=typeof a.id=="string"?a.id:"";if(d.length===0)return;let p=a.status==="confirmed"?"confirmed":"draft",h=Array.isArray(a.entries)?a.entries:[],m=[];h.forEach((V,ae)=>{let F=V&&typeof V.bead_id=="string"?V.bead_id:"";if(F.length===0)return;let q=V&&typeof V.root_dir=="string"?V.root_dir:"",L=n.get(F),M=L?L.state:void 0,W=M==="running"||M==="pr_wait"||M==="done",K=!L||M==="runnable",H=L&&L.lane==="parallel"&&typeof L.position=="number"?L.position-1:null,D=Bg(F,n,r,t),G=m.length>0?m[m.length-1].id:null,X=p==="confirmed"&&G!==null&&!(t.get(F)||[]).includes(G);m.push({id:F,title:o.get(F)||F,root_dir:L?L.root_dir:q,workspace_name:L?L.workspace_name:s.get(q)||"",seq:ae+1,location_label:D.label,location_title:D.title,draggable:!W,fixed:W,done:M==="done",unplaced:K,mismatch:X,...H!==null?{queue_index:H}:{}})}),m.forEach((V,ae)=>{V.seq=ae+1});let v=m.length>0&&m.every(V=>V.done),O=m.filter(V=>!V.fixed&&i.armed_by_bead.get(V.id)!==d).map(V=>V.id),B=Wg(d,p,m,v,O,i);l.push({lane_id:d,status:p,draft:p==="draft",number:u+1,label:`\uC5F0\uACB0 ${u+1} \xB7 \uB808\uD3EC \uAC04`,rows:m,all_done:v,can_confirm:p==="draft"&&m.length>=2,has_mismatch:p==="confirmed"&&m.some(V=>V.mismatch||V.unplaced),unlaunched:O,...B})}),l}function Hg(e,t,n){if(e.lane==="runnable"){let i=n.get(e.id);return i?i.length===0?{scope:[],state:"missing"}:{scope:i,state:"declared"}:{scope:[],state:void 0}}let r=t.get(e.root_dir),o=r?r[e.id]:void 0;if(!o||!Array.isArray(o.scope))return{scope:[],state:void 0};let s=o.scope.filter(i=>typeof i=="string"&&i.length>0);return{scope:s,state:s.length===0?"missing":"declared"}}function Gg(e,t,n,r,o){let s=new Map;for(let a of[...e.running,...e.queue,...e.runnable,...e.pr_wait]){if(!t.has(a.root_dir))continue;let u=`${a.root_dir}\0${a.id}`,d=s.get(u);if(d){d.cards.push(a);continue}let{scope:p,state:h}=Hg(a,t,n);h!==void 0&&(a.scope_state=h),s.set(u,{cards:[a],scope:p})}let i=new Map;for(let a of s.values()){let u=a.cards[0].scope_state;if(u!==void 0)for(let h of a.cards)h.scope_state=u;if(a.scope.length===0)continue;let d=a.cards[0].root_dir,p=i.get(d);p?p.push(a):i.set(d,[a])}let l=(a,u,d)=>{let p=u.cards[0],h={id:p.id,title:p.title,location_label:Fg(p.id,r,o),prefixes:d,...typeof p.root_dir=="string"&&p.root_dir.length>0?{root_dir:p.root_dir}:{}};for(let m of a.cards)m.overlap_chips?m.overlap_chips.push(h):m.overlap_chips=[h]};for(let a of i.values())for(let u=0;u<a.length;u+=1)for(let d=u+1;d<a.length;d+=1){let p=ri(a[u].scope,a[d].scope);p.length!==0&&(l(a[u],a[d],p),l(a[d],a[u],p))}}function hd(e,t,n){let r=n?n.get(t)?.root_dir:void 0,o=!zn(e.id,t),s=typeof e.root_dir=="string"?e.root_dir:"",i=typeof r=="string"&&r.length>0?r:o&&s.length>0?s:"";return i.length>0?{openable:!0,root_dir:i}:o?{openable:!0}:{}}function Kg(e,t,n,r){let o=new Set(e?e.ids:[]);for(let l of t&&Array.isArray(t.ids)?t.ids:[])typeof l=="string"&&l.length>0&&o.add(l);if(o.size===0)return{ids:[]};let s={},i={...e?e.root_dirs:{},...t&&t.root_dirs&&typeof t.root_dirs=="object"?t.root_dirs:{}};for(let l of o){let a=i[l];if(typeof a=="string"&&a.length>0){s[l]=a;continue}if(!zn(n.id,l)){n.root_dir.length>0&&(s[l]=n.root_dir);continue}let u=r.get(l)?.root_dir;typeof u=="string"&&u.length>0&&(s[l]=u)}return{ids:[...o],root_dirs:s}}function Xa(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function xi(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Yg(e){let t=typeof e=="string"?e.trim().toLowerCase():"";return t.length===0?null:n=>{let r=typeof n.id=="string"?n.id.toLowerCase():"",o=typeof n.title=="string"?n.title.toLowerCase():"";return r.includes(t)||o.includes(t)}}function Vg(e,t){let n=[e.runnable,e.runnable_all,e.queue,e.running,e.pr_wait,e.done,e.parallel_rows];for(let o of e.runnable_sections)n.push(o.items);let r=[];for(let o of e.queue_groups){n.push(o.items,o.sublanes.parallel);for(let s of o.sublanes.serial)n.push(s.items),r.push(s.occupants)}for(let o of n)for(let s of o)s.search_match=t(s);for(let o of r)for(let s of o)s.search_match=t(s)}function pr(e,t,n){let r=Array.isArray(e)?e:[],o=Array.isArray(t)?t:[],s=n&&typeof n.done_since=="number"?n.done_since:void 0,i={...fo,...n&&n.candidate_filter?n.candidate_filter:{}},l=n&&Object.hasOwn(n,"cross_lanes")?n.cross_lanes??null:void 0,a=n&&n.candidate_sort==="as_given"?"as_given":n&&Yo.some($=>$.value===n.candidate_sort)?n.candidate_sort:"repo_spec",u=n&&n.groups==="all"?"all":"nonempty",d=n&&n.candidate_hidden_counts==="per_control"?"per_control":"sequential",p=Date.now(),h=new Map;for(let $ of o)$&&typeof $.root_dir=="string"&&h.set($.root_dir,$);let m=new Map;for(let $ of o)$&&typeof $.root_dir=="string"&&m.set($.root_dir,$.name||$.root_dir);for(let $ of r)$&&typeof $.root_dir=="string"&&m.set($.root_dir,$.name||$.root_dir);let v=[],O=[],B=[],V=[],ae=[],F=[],q=new Map,L=new Map,M=new Map,W=new Map,K=new Map,H=new Map,D=new Map,G=new Map,X=new Map,J=new Map,fe=new Map,Ce=new Map,U=new Map,te=new Set,xe=new Map,Ee=new Map,R=new Map;for(let $ of r){if(!$||typeof $.root_dir!="string")continue;let Z=$.root_dir,Se=$.name||Z,Ie=h.get(Z),Ge=Ie&&typeof Ie.revision=="number"?Ie.revision:typeof $.revision=="number"?$.revision:0,tt=st($.attempts),ct=st($.bead_titles);for(let[f,g]of Object.entries(ct))typeof g=="string"&&g.length>0&&R.set(f,g);let Tt=st($.bead_times),Dt=st($.pr_observations),ft=st($.admission),gt=st($.revise_parked),mt=st($.merge_queue_state),Rt=st($.cleanup_failed),bt=st($.discard_operations),ue=st($.bead_timelines),se=st($.bead_blocked_by);Object.hasOwn($,"bead_scope")&&xe.set(Z,st($.bead_scope));let A=st($.bead_workflow),j=st($.pr_activity),oe=Array.isArray($.repo_operations)?$.repo_operations:[];G.set(Z,oe);let ie=typeof $.declared_base=="string"?$.declared_base:null;D.set(Z,ie),H.set(Z,Object.entries(Rt).map(([f,g])=>({bead_id:f,step:g&&g.step?g.step:"",reason:g&&g.reason?g.reason:"",at:g&&typeof g.at=="number"?g.at:null,detail:g&&typeof g.detail=="string"?g.detail:null,output_tail:g&&typeof g.output_tail=="string"&&g.output_tail?g.output_tail:void 0,log_path:g&&typeof g.log_path=="string"&&g.log_path?g.log_path:void 0,retry_count:g&&typeof g.retry_count=="number"&&Number.isInteger(g.retry_count)&&g.retry_count>0?g.retry_count:0,failure_code:g&&typeof g.failure_code=="string"?g.failure_code:void 0})));for(let[f,g]of Object.entries(st($.bead_overlay)))g&&typeof g=="object"&&X.set(`${Z}\0${f}`,g);let ce=new Map;for(let f of Object.values(tt))f&&typeof f.attempt_id=="string"&&ce.set(f.attempt_id,f);let Pe=Array.isArray($.merge_queue)?$.merge_queue:[],Je=new Set(Pe.filter(f=>f&&typeof f.bead_id=="string").map(f=>f.bead_id)),Xe=new Map(Pe.filter(f=>f&&typeof f.bead_id=="string").map(f=>[f.bead_id,f])),je=new Map,vt=new Map,Ot=new Map,ht=new Map;Pe.forEach((f,g)=>{f&&typeof f.bead_id=="string"&&(je.set(f.bead_id,g+1),vt.set(f.bead_id,f.resolution),Ot.set(f.bead_id,f.continuation_action||null),ht.set(f.bead_id,f.authority||null))});let Vt=st($.auto_merge_skips),jt=f=>{let g=Vt[f];if(!g)return null;let S=st(st(Dt[f]).pr).head_sha;return S&&S===g.head_sha?g.reason||"":null};K.set(Z,{positions:je,resolutions:vt,continuations:Ot,authorities:ht,state:{active:typeof mt.active=="string"?mt.active:null,failures:st(mt.failures),waiting:mt.waiting&&typeof mt.waiting.bead_id=="string"&&typeof mt.waiting.reason=="string"?mt.waiting:null},auto_excluded:(Array.isArray($.pr_wait)?$.pr_wait:[]).map(f=>f&&f.bead_id).filter(f=>typeof f=="string"&&jt(f)!==null),running:Pe.length>0});let St=Array.isArray($.queue)?$.queue:[];for(let f of[...St,...Array.isArray($.pr_wait)?$.pr_wait:[]])f&&typeof f.bead_id=="string"&&typeof f.armed_by_lane=="string"&&f.armed_by_lane.length>0&&Ce.set(f.bead_id,f.armed_by_lane);for(let f of Array.isArray($.disarmed_on_load)?$.disarmed_on_load:[])typeof f=="string"&&f.length>0&&te.add(f);let zt=(Array.isArray($.serial_lanes)?$.serial_lanes:[]).filter(f=>f&&/^s[1-5]$/.test(f.id)&&Array.isArray(f.entries)),ut=st($.lane_states),Bt=typeof $.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor($.serial_lane_count))):Math.min(5,zt.length);M.set(Z,Bt),W.set(Z,St.length);let Xt=new Map(zt.map(f=>[f.id,f])),Nt=new Map;for(let f of zt)for(let g of f.entries)g&&typeof g.bead_id=="string"&&Nt.set(g.bead_id,f.id);for(let[f,g]of Object.entries(st($.bead_dependents))){let S=Array.isArray(g?.ids)?g.ids:[],Q=st(g?.root_dirs),ee=fe.get(f)||{ids:new Set,root_dirs:{}};for(let de of S)typeof de=="string"&&de.length>0&&ee.ids.add(de);for(let[de,rt]of Object.entries(Q))typeof rt=="string"&&rt.length>0&&(ee.root_dirs[de]=rt);fe.set(f,ee)}for(let[f,g]of Object.entries(se))Array.isArray(g)&&J.set(f,g.filter(S=>typeof S=="string"&&S.length>0));let rn=Array.isArray($.done)?$.done:[];for(let f of rn)f&&typeof f.bead_id=="string"&&F.push({id:f.bead_id,root_dir:Z,workspace_name:Se});let en=new Map;for(let f of rn)f&&typeof f.bead_id=="string"&&typeof f.added_at=="number"&&en.set(f.bead_id,f.added_at);let Ft=f=>({id:f,title:ct[f]||f,root_dir:Z,workspace_name:Se,expected_revision:Ge,draggable:!1,...st(Tt[f]).created_at?{created_at:st(Tt[f]).created_at}:{},...st(Tt[f]).updated_at?{updated_at:st(Tt[f]).updated_at}:{}}),dn=f=>{let g=A[f]?.chips?.pr;return g&&typeof g.number=="number"&&typeof g.url=="string"?{pr_number:g.number,pr_url:g.url}:{}},tn=f=>Object.hasOwn(se,f)?{blocked_by:Array.isArray(se[f])?se[f].filter(g=>typeof g=="string"&&g.length>0):[]}:{},$e=(f,g)=>{let S=tn(f),Q=(g?.blockers||[]).map(de=>de.id);if(Q.length===0)return S;let ee=[...S.blocked_by||[]];for(let de of Q)ee.includes(de)||ee.push(de);return{blocked_by:ee}},E=new Set;for(let[f,g]of bd(tt,en,{discard_operations:bt,observations:Dt,bead_timelines:ue})){E.add(f);let S=g.run_state==="failed"?Ug(tt,g.attempt_id):null;S!==null&&U.set(f,S);let Q=ce.get(g.attempt_id)||null,ee=X.get(`${Z}\0${f}`),de=ee&&ee.rollup?ee.rollup:null,rt=Ja(ie,Q?Q.target_base:null),dt=Q?el(Q,ce):!1,at=Q&&Q.quickfix_lane===!0&&Q.quickfix_landing&&typeof Q.quickfix_landing=="object"?Q.quickfix_landing:null,$t=at&&typeof at.reason=="string"&&at.reason.length>0?at.reason:null,x=at?Ko({bead_id:f,merge_sha:at.head_sha,cleanup_cursor:at.cursor,cleanup_failed:$t?{step:at.cursor,reason:$t}:null,repo_operations:oe}):null;O.push({...Ft(f),lane:"running",...$e(f,g.wait),...Nt.has(f)?{serial_lane_id:Nt.get(f)}:{},attempt_id:g.attempt_id,run_state:g.run_state,status:g.status||void 0,workflow:A[f]||null,can_pause:g.can_pause,can_resume:g.can_resume,started_at:g.started_at,last_event_at:g.last_event_at,last_activity:g.last_activity,legs:g.legs,runner:g.runner,model:g.model,effort:g.effort,speed:g.speed,resumed_from:g.resumed_from,continuation_mode:g.continuation_mode,usage:g.usage,failure:g.failure||null,wait:g.wait||null,retry:g.retry||null,exec_chips:{orchestration:Da(g),worker:qg(st(Ie),ee,g.runner||null)},discard:Xn(bt,f,{attempt_id:g.attempt_id,merged:g.failure?.confirmation==="merged"||st(Dt[f]).pr?.state==="MERGED"}),...de?{rollup:de}:{},...dt?{conflict_resolution:!0}:{},...rt?{base_exception:rt}:{},...x?{landing:x}:{},badges:g.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:g.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:g.run_state==="parked"?["\u23F8 \uC138\uC158 \uB300\uAE30"]:g.run_state==="retry_wait"?["\u21BB \uC7AC\uC2DC\uB3C4 \uB300\uAE30"]:g.run_state==="waiting"?["\u26D3 \uC120\uD589 \uB300\uAE30"]:[],alert:g.run_state==="failed"})}for(let[f,g]of fu(tt)){if(O.some(Q=>Q.id===f))continue;let S=g.attempt;O.push({...Ft(f),lane:"running",kind:"session",...tn(f),attempt_id:typeof S.attempt_id=="string"?S.attempt_id:"",run_state:"running",status:"running",non_occupying:!0,workflow:A[f]||null,can_pause:!1,can_resume:!1,started_at:g.started_at,last_event_at:typeof S.last_event_at=="number"?S.last_event_at:null,last_activity:S.last_activity&&typeof S.last_activity=="object"?S.last_activity:null,legs:Array.isArray(S.legs)?S.legs:[],runner:typeof S.runner=="string"?S.runner:null,model:typeof S.model=="string"?S.model:null,effort:typeof S.effort=="string"?S.effort:null,speed:typeof S.speed=="string"?S.speed:null,resumed_from:null,continuation_mode:null,usage:S.usage&&typeof S.usage=="object"?S.usage:null,exec_chips:{orchestration:Da(S),worker:null},discard:Xn(bt,f,{merge_queued:!0}),badges:[g.origin==="auto"?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"],alert:!1})}for(let f of Array.isArray($.session_active)?$.session_active:[]){let g=f&&f.bead_id;typeof g!="string"||E.has(g)||(E.add(g),Array.isArray(f.blocked_by)&&f.blocked_by.length>0&&J.set(g,f.blocked_by.filter(S=>typeof S=="string"&&S.length>0)),typeof f.title=="string"&&f.title.length>0&&R.set(g,f.title),O.push({...Ft(g),title:f.title||ct[g]||g,lane:"running",kind:"session",status:"in_progress",started_at:Xa(f.started_at)??Xa(f.updated_at)??void 0,updated_at:Xa(f.updated_at)??void 0,workflow:f.workflow||null,labels:Array.isArray(f.labels)?f.labels:[],spec_id:typeof f.spec_id=="string"?f.spec_id:"",blocked:f.blocked===!0,...Array.isArray(f.blocked_by)?{blocked_by:f.blocked_by.filter(S=>typeof S=="string"&&S.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,session_refs:Array.isArray(f.session_refs)?f.session_refs:[],badges:[],alert:!1}))}for(let f of Array.isArray($.pr_wait)?$.pr_wait:[]){let g=f&&f.bead_id;if(typeof g!="string"||E.has(g))continue;E.add(g);let S=st(Dt[g]),Q=st(S.pr),ee=S.gate?st(S.gate):null,de=Je.has(g),rt=Xe.get(g)?.continuation_action||null,dt=!!rt&&rt.continuation===null,at=mt.active===g,$t=f.external===!0,x=Rt[g]||null,C=st(j[g]),we=Ko({bead_id:g,merge_sha:f.merge_sha,cleanup_cursor:f.cleanup_cursor,merge_progress:C.merge_progress||null,cleanup_failed:x,repo_operations:oe}),Fe=$i(we),nt=!!ee&&ee.base_badge==="\uCDA9\uB3CC",_t=!!x&&["post_merge_jobs","child_sweep","branch_cleanup","parent_close"].includes(x.step)&&!!ee&&ee.tier==="merged",Lt=$t&&!!x&&!!ee&&ee.tier==="merged",yo=!!ee&&["closed_unmerged","review","undecidable"].includes(ee.tier),mn=Xn(bt,g,{external:$t,merge_active:at||we?.step==="merge",merge_queued:de,cleanup_active:Fe,merged:!!x||ee?.tier==="merged"}),tr=!!mn.operation,nr=Lg(S.receipt_check);B.push({...Ft(g),lane:"pr_wait",...tn(g),...nr.length>0?{receipt_badge:{codes:nr}}:{},workflow:A[g]||null,pr_number:typeof Q.number=="number"?Q.number:null,pr_url:typeof Q.url=="string"?Q.url:void 0,external:$t,usage:Kn(tt,g),merge_step:we,badges:dt?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:we?[ee?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:x?[Lr(x.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Lr(x.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof ee?.gate_badge=="string"&&ee.gate_badge.length>0?[ee.gate_badge]:[],alert:we?we.failed===!0:!!x||yo,reason:x&&we?.active!==!0?ki(x.step):"PR \uB300\uAE30",merge_action:ee?.tier==="merged"&&!_t&&!Lt?!1:!de||dt,merge_enabled:!tr&&(dt||ee?.enabled===!0||nt||_t||Lt),merge_label:dt?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Lt||_t?"\uC815\uB9AC \uC7AC\uC2DC\uB3C4":nt&&!_t?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:dt?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":tr?mn.error?`\uD3D0\uAE30 \uC2E4\uD328: ${mn.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${mn.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Lt?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":_t?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":nt?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":ee?.enabled===!0?`\uBA38\uC9C0 (${ee.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${ee?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:de&&!dt,cancel_enabled:!at,continuation_mismatch:rt?.mismatch||null,discard:mn,discard_action:mn.action,discard_enabled:mn.enabled,discard_title:mn.title})}let be=(f,g,S,Q)=>{let ee=f&&f.bead_id;if(typeof ee!="string"||E.has(ee))return null;E.add(ee);let de=gt[ee],rt=Xn(bt,ee),dt=rt.operation?rt:null,at={...Ft(ee),lane:g,workflow:A[ee]||null,draggable:!dt,discard:dt||void 0,reason:_d(ft,ee),seq:S+1,queue_position:S+1,queue_index:S,queue_length:Q,badges:de?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!de,revise_action:!!de,revise_enabled:!!de&&!dt,revise_title:de?de.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${de.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""},$t=tn(ee);return Object.hasOwn($t,"blocked_by")&&(at.blocked_by=$t.blocked_by),at};for(let f=0;f<St.length;f++){let g=be(St[f],"queue",f,St.length);if(!g)continue;V.push(g);let S=q.get(Z);S?S.push(g):q.set(Z,[g])}let De=f=>{let g=B.find(de=>de.id===f&&de.root_dir===Z);if(g)return{id:f,title:g.title,badge:"PR \uB300\uAE30 \xB7 \uC810\uC720"};let S=O.find(de=>de.id===f&&de.root_dir===Z),Q=S?S.run_state:Sg(tt,f),ee=Q==="failed"||Q==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":Q==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720";return{id:f,title:S?S.title:Ft(f).title,badge:ee}},b=[];for(let f=0;f<Math.max(Bt,zt.length);f++){let g=`s${f+1}`,S=Xt.get(g),Q=S&&Array.isArray(S.entries)?S.entries:[],ee=st(ut[g]),de=Array.isArray(ee.occupied_by)?ee.occupied_by.filter(at=>typeof at=="string"):[],rt=new Set(de),dt=[];for(let at=0;at<Q.length;at++){let $t=Q[at]&&Q[at].bead_id;if(typeof $t=="string"&&rt.has($t)){E.add($t);continue}let x=be(Q[at],g,at,Q.length);x&&(dt.push(x),V.push(x))}dt.length===0&&de.length===0&&(Bt<=1||f>=Bt)||b.push({id:g,index:f,items:dt,raw_length:Q.length,occupied_by:de,occupants:de.map(at=>De(at)),corrections:Array.isArray(ee.corrections)?ee.corrections.length:0,cycle:ee.cycle===!0,...dt.length===0&&de.length===0?{empty:!0}:{}})}L.set(Z,b);let y=Array.from({length:Bt},(f,g)=>{let S=`s${g+1}`,Q=Xt.get(S),ee=Q&&Array.isArray(Q.entries)?Q.entries:[],de=st(ut[S]);return{id:S,index:ee.length,length:ee.length,occupied_by:Array.isArray(de.occupied_by)?de.occupied_by.filter(rt=>typeof rt=="string"):[]}});for(let f of Array.isArray($.runnable)?$.runnable:[]){let g=f&&f.bead_id;if(typeof g!="string"||E.has(g))continue;E.add(g);let S=f.workflow&&typeof f.workflow=="object"?f.workflow:null,Q=S&&typeof S.route=="string"&&S.route||(typeof f.route=="string"?f.route:null),ee=Ig(st(Ie),f.exec_pins,Q),de=No(f.rec,f.exec_pins);Array.isArray(f.blocked_by)&&f.blocked_by.length>0&&J.set(g,f.blocked_by.filter(we=>typeof we=="string"&&we.length>0)),typeof f.title=="string"&&f.title.length>0&&R.set(g,f.title),Array.isArray(f.scope)&&Ee.set(g,f.scope.filter(we=>typeof we=="string"&&we.length>0));let rt=f.eligible!==!1,dt=f.worker_ineligible===!0,at=Object.hasOwn(f,"eligible"),$t=[];typeof f.reason=="string"&&f.reason.length>0&&$t.push(f.reason);let x=_d(ft,g);x&&$t.push(x);let C=Mg(g,f.release_info,p)?.map(we=>({...we,...hd({id:g,root_dir:Z},we.id)}));v.push({...Ft(g),title:f.title||ct[g]||g,lane:"runnable",draggable:!at,queue_placeable:rt&&!dt,...dt?{worker_ineligible:!0}:{},...f.session_preferred===!0?{session_preferred:!0,session_preferred_reason:typeof f.session_preferred_reason=="string"?f.session_preferred_reason:""}:{},...f.spec_after_blocker===!0?{spec_after_blocker:!0}:{},...C?{dependency_chips:{released:C}}:{},...f.dependents_info&&typeof f.dependents_info=="object"?{dependents_info:f.dependents_info}:{},reason:$t.join(" \xB7 "),created_at:f.created_at??void 0,updated_at:f.updated_at??void 0,status:typeof f.status=="string"?f.status:void 0,labels:Array.isArray(f.labels)?f.labels:[],spec_id:typeof f.spec_id=="string"?f.spec_id:"",published:f.published===!0,workflow:S||(Q?{route:Q,chips:{route:Q}}:null),...ee?{exec_chips:ee}:{},...de?{rec:de}:{},blocked:f.blocked===!0,...Array.isArray(f.blocked_by)?{blocked_by:f.blocked_by.filter(we=>typeof we=="string"&&we.length>0)}:{},place_index:St.length,place_lanes:y})}for(let f of rn){let g=f&&f.bead_id;if(typeof g!="string"||E.has(g)||(E.add(g),s!==void 0&&typeof f.added_at=="number"&&f.added_at<s))continue;let S=Eg(tt,g),Q=S&&typeof S.done_kind=="string"?S.done_kind:null;ae.push({...Ft(g),lane:"done",done:!0,done_layout:"three_line",usage:Kn(tt,g),work_ms:Vu(tt,g),done_at:typeof f.added_at=="number"?f.added_at:void 0,done_kind:Q,...dn(g),badges:[...Q&&dd[Q]?[dd[Q]]:[],...Ku(tt,g)]})}for(let f of Array.isArray($.session_done)?$.session_done:[]){let g=f&&(f.id||f.bead_id);typeof g!="string"||E.has(g)||(E.add(g),ae.push({...Ft(g),...f,id:g,root_dir:Z,workspace_name:Se,expected_revision:Ge,lane:"done",done:!0}))}}if(X.size>0)for(let $ of[...v,...V,...O,...B,...ae]){let Z=X.get(`${$.root_dir}\0${$.id}`);if(!Z||(typeof Z.priority=="number"&&($.priority=Z.priority),typeof Z.from_id=="string"&&Z.from_id.length>0&&($.from_id=Z.from_id),$.lane==="done"&&Array.isArray(Z.carried_to)&&Z.carried_to.length>0&&($.carried_to=Z.carried_to),!Object.hasOwn(Z,"metadata")))continue;let Se=st(Z.metadata);if($.rec=No(Se),$.lane==="runnable"||$.lane.startsWith("s")||$.lane==="queue"){let Ie=Ng(st(h.get($.root_dir)),Se,typeof Z.route=="string"&&Z.route.length>0?Z.route:st($.workflow).route);Ie&&($.exec_chips=Ie)}}let re=new Map;o.forEach(($,Z)=>{$&&typeof $.root_dir=="string"&&re.set($.root_dir,Z)});let ve=n&&n.running_sort==="repo"?"repo":"started";O.sort(($,Z)=>{let Se=$.kind==="session",Ie=Z.kind==="session";if(Se!==Ie)return Se?1:-1;if(Se&&Ie){let ct=xi(Z.updated_at)-xi($.updated_at);return ct!==0?ct:$.id.localeCompare(Z.id)}if(ve==="repo"){let ct=re.get($.root_dir)??Number.MAX_SAFE_INTEGER,Tt=re.get(Z.root_dir)??Number.MAX_SAFE_INTEGER;if(ct!==Tt)return ct-Tt}let Ge=typeof $.started_at=="number"&&Number.isFinite($.started_at)?$.started_at:null,tt=typeof Z.started_at=="number"&&Number.isFinite(Z.started_at)?Z.started_at:null;return Ge!==null&&tt!==null&&Ge!==tt?Ge-tt:Ge===null&&tt!==null?1:Ge!==null&&tt===null?-1:$.id.localeCompare(Z.id)}),ae.sort(($,Z)=>(Z.done_at??0)-($.done_at??0));let ye=o.length>0?o:r.map($=>({root_dir:$&&$.root_dir,name:$&&$.name,auto_advance:$&&$.auto_advance,auto_merge:$&&$.auto_merge,slots:$&&$.slots,revision:$&&$.revision,runner_catalog:$&&$.runner_catalog})),Oe=new Set(v.map($=>$.root_dir)),_e=new Map;for(let $ of O)$.kind==="session"||$.run_state!=="running"||_e.set($.root_dir,(_e.get($.root_dir)||0)+1);let Le=new Map;for(let $ of ae){let Z=Le.get($.root_dir);Z?Z.push($):Le.set($.root_dir,[$])}let Ve={positions:new Map,resolutions:new Map,continuations:new Map,authorities:new Map,state:{active:null,failures:{},waiting:null},auto_excluded:[],running:!1},Ye=[];for(let $ of ye){if(!$||typeof $.root_dir!="string")continue;let Z=q.get($.root_dir)||[],Se=L.get($.root_dir)||[],Ie=Z.length>0||Se.some(ct=>ct.items.length>0||ct.occupied_by.length>0);if(u!=="all"&&!Ie&&!Oe.has($.root_dir))continue;let Ge=typeof $.slots=="number"&&$.slots>=Ai?$.slots:Ai,tt=_e.get($.root_dir)||0;Ye.push({live_count:tt,over_cap:tt>Ge,merge:K.get($.root_dir)||Ve,token_total:jg(Le.get($.root_dir)||[]),cleanup_failures:H.get($.root_dir)||[],declared_base:D.get($.root_dir)??null,repo_operations:G.get($.root_dir)||[],root_dir:$.root_dir,name:$.name||$.root_dir,auto_advance:$.auto_advance===!0,auto_merge:$.auto_merge===!0,slots:Ge,revision:typeof $.revision=="number"?$.revision:0,runner_catalog:st($.runner_catalog),items:Z,sublanes:{parallel:Z,serial:Se},serial_lane_count:M.get($.root_dir)||0,raw_queue_length:W.get($.root_dir)||0})}let P={runnable:v,runnable_all:v,runnable_hidden:{blocked:0,spec:0},runnable_sections:[],runnable_flat:a==="updated_flat"||a==="as_given",queue:V,queue_groups:Ye,running:O,pr_wait:B,done:ae,parallel_rows:[],chain_lanes:[],cross_lanes_revision:l&&typeof l.revision=="number"?l.revision:null,cross_lanes_unreadable:l===null,parallel_raw_length:Object.fromEntries(W),owner_of:{}},pe=Pu(P);for(let $ of F)pe.has($.id)||pe.set($.id,{root_dir:$.root_dir,workspace_name:$.workspace_name,lane:"done",state:"done"});for(let $ of[...P.queue,...P.runnable,...P.running,...P.pr_wait]){if(!Object.hasOwn($,"blocked_by"))continue;let Z=pe.get($.id);$.blockers=($.blocked_by||[]).map(Se=>Du(Se,Z,pe,o))}for(let $ of[...P.queue,...P.runnable,...P.running,...P.pr_wait]){let Z=($.blockers||[]).map(Ge=>({...Va($.id,Ge),...hd($,Ge.id,pe)})),Se=cd($.id,Kg(fe.get($.id),$.dependents_info,$,pe));if(Z.length===0&&Se.length===0)continue;let Ie={...$.dependency_chips||{},...Z.length>0?{predecessors:Z}:{},...Se.length>0?{dependents:Se}:{}};$.dependency_chips=Ie}Gg(P,xe,Ee,pe,o);let ne=Nu(P.queue_groups);for(let $ of P.queue_groups)for(let Z of $.sublanes.serial){let Se=ne.get(qu($.root_dir,Z.id));Se&&(Z.cross_wait_peers=Se)}P.chain_lanes=zg(l&&Array.isArray(l.lanes)?l.lanes:[],J,pe,o,R,m,{armed_by_bead:Ce,failed_by_bead:U,disarmed_lanes:te});let me=new Map;for(let $ of[...P.queue,...P.runnable])me.has($.id)||me.set($.id,$);let Te=new Set;for(let $ of P.chain_lanes)for(let Z of $.rows){if($.status==="confirmed"&&!Z.unplaced&&!Z.fixed&&Te.add(Z.id),!$.draft&&!Z.unplaced)continue;let Se=me.get(Z.id);Se&&(Se.cross_lane_chip={lane_id:$.lane_id,number:$.number,status:$.status,label:$.draft?`\uC5F0\uACB0 ${$.number} (draft)`:`\uC5F0\uACB0 ${$.number}`})}let ge=new Map(P.chain_lanes.map($=>[$.lane_id,$.number]));for(let $ of[...P.queue,...P.running]){let Z=Ce.get($.id);if(typeof Z!="string"||Z.length===0)continue;let Se=ge.get(Z);$.armed_lane_chip=Se===void 0?{lane_id:Z,label:"\u25B6 \uC9C4\uD589 \uC911 \xB7 \uB808\uC778 \uC5C6\uC74C",orphan:!0}:{lane_id:Z,label:`\u25B6 \uC5F0\uACB0 ${Se}`,orphan:!1}}let Me=[];for(let $ of q.values())for(let Z of $)Te.has(Z.id)||Me.push(Z);Me.sort(($,Z)=>{let Se=$.workspace_name.localeCompare(Z.workspace_name);return Se!==0?Se:($.queue_index??0)-(Z.queue_index??0)}),P.parallel_rows=Me;let We={};for(let[$,Z]of pe)typeof Z.root_dir=="string"&&Z.root_dir.length>0&&(We[$]=Z.root_dir);for(let $ of P.chain_lanes)for(let Z of $.rows)!Object.hasOwn(We,Z.id)&&Z.root_dir.length>0&&m.has(Z.root_dir)&&(We[Z.id]=Z.root_dir);P.owner_of=We;let Ze=P.runnable.length;P.runnable_all=P.runnable.slice();let qe=P.runnable,z=$=>i.show_blocked||$.blocked!==!0,Y=$=>i.spec==="all"||(i.spec==="with"?$.published===!0:$.published!==!0);if(d==="per_control"){let $=[],Z=0,Se=0;for(let Ie of qe){let Ge=z(Ie),tt=Y(Ie);Ge&&tt?$.push(Ie):!Ge&&tt?Z+=1:Ge&&!tt&&(Se+=1)}qe=$,P.runnable_hidden={blocked:Z,spec:Se}}else{qe=qe.filter(z);let $=qe.length;qe=qe.filter(Y),P.runnable_hidden={blocked:Ze-$,spec:$-qe.length}}let Ne=($,Z)=>{let Se=xi(Z.updated_at)-xi($.updated_at);return Se!==0?Se:$.id.localeCompare(Z.id)},Ue=a==="repo_spec"?($,Z)=>{let Se=$.published===!0?0:1,Ie=Z.published===!0?0:1;return Se!==Ie?Se-Ie:Ne($,Z)}:Ne;if(a==="as_given")P.runnable=qe,P.runnable_sections=[];else if(a==="updated_flat")P.runnable=qe.slice().sort(Ne),P.runnable_sections=[];else{let $=new Map;for(let Ie of qe){let Ge=$.get(Ie.root_dir);Ge?Ge.push(Ie):$.set(Ie.root_dir,[Ie])}let Z=[],Se=[];for(let Ie of ye){if(!Ie||typeof Ie.root_dir!="string")continue;let Ge=($.get(Ie.root_dir)||[]).slice().sort(Ue);$.delete(Ie.root_dir),Ge.length!==0&&(Z.push({root_dir:Ie.root_dir,name:Ie.name||Ie.root_dir,items:Ge.map(tt=>({...tt,workspace_name:""}))}),Se.push(...Ge))}for(let[Ie,Ge]of $){let tt=Ge.slice().sort(Ue);Z.push({root_dir:Ie,name:tt[0]?.workspace_name||Ie,items:tt.map(ct=>({...ct,workspace_name:""}))}),Se.push(...tt)}P.runnable=Se,P.runnable_sections=Z}let Re=Yg(n?n.search:void 0);return Re&&Vg(P,Re),P}function wd(e,t){let n=new Map(e.map((a,u)=>[a,u])),r=new Map(e.map(a=>[a,new Set]));for(let a of t)a.blocker!==a.blockee&&n.has(a.blocker)&&n.has(a.blockee)&&r.get(a.blockee).add(a.blocker);let o=new Set,s=[];for(;s.length<e.length;){let a=e.find(u=>{if(o.has(u))return!1;for(let d of r.get(u))if(!o.has(d))return!1;return!0});if(a===void 0)return{order:[...e],corrections:[],cycle:!0};o.add(a),s.push(a)}let i=[],l=new Map(s.map((a,u)=>[a,u]));for(let a of s){let u=null;for(let d of r.get(a)){let p=Number(n.get(a))<Number(n.get(d)),h=Number(l.get(a))>Number(l.get(d));p&&h&&(u===null||Number(l.get(d))>Number(l.get(u)))&&(u=d)}u!==null&&i.push({bead_id:a,after:u})}return{order:s,corrections:i,cycle:!1}}var Xg="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",Ei="\uC758\uC874 \uC790\uB8CC \uBBF8\uD655\uC815 \u2014 \uAD50\uC815 \uBCF4\uB958",Qg="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694",Zg="\uC774\uBBF8 \uC9C4\uD589 \uC911\uC778 \uC774\uC288 \uC55E\uC5D0\uB294 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",_o="\uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";function Vo(e,t){return`${e}\0${t}`}function Jg(e,t){let n=new Set(e),r=new Map;for(let o of e){let s=t.placed_members.has(o)?t.snapshot_blocked_by:t.runnable_blocked_by,i=s instanceof Map?s.get(o):void 0;if(!Array.isArray(i))return null;r.set(o,i.filter(l=>l!==o&&n.has(l)))}return r}function eh(e,t){if(e.status!=="confirmed")return 0;let n=-1;return e.entries.forEach((r,o)=>{t.fixed_members.has(r.bead_id)&&(n=o)}),n+1}function Zo(e,t){let n=e.entries,r=n.map(p=>p.bead_id),o=Jg(r,t);if(o===null)return{entries:n,corrections:[],cycle:!1,held:!0,mismatched:[]};let s=[];for(let[p,h]of o)for(let m of h)s.push({blocker:m,blockee:p});let i=eh(e,t),l=new Map(r.map((p,h)=>[p,h])),a=r.slice(0,i).filter(p=>o.get(p).some(h=>Number(l.get(h))>Number(l.get(p)))),u=wd(r.slice(i),s);if(u.cycle)return{entries:n,corrections:[],cycle:!0,held:!1,mismatched:a};let d=new Map(n.map(p=>[p.bead_id,p]));return{entries:[...n.slice(0,i),...u.order.map(p=>d.get(p))],corrections:u.corrections,cycle:!1,held:!1,mismatched:a}}function kd(e,t){let n=t.cross_lanes.get(e);return n===void 0?null:Zo(n,t)}function th(e,t){if(!(t.corrections.length===0&&!t.cycle&&!t.held&&t.mismatched.length===0))return{lane_id:e,corrected:t.corrections.length,cycle:t.cycle,held:t.held,mismatched:t.mismatched}}function nh(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function rh(e){let t=new Map;for(let[n,r]of e)t.set(n,r.slice());return t}function tl(e,t,n){let r=new Set([t]),o=[t];for(;o.length>0;){let s=o.pop();for(let i of e.get(s)||[]){if(i===n)return!0;r.has(i)||(r.add(i),o.push(i))}}return!1}function oh(e,t){let n=new Set;for(let[i,l]of t)for(let a of l)n.add(Vo(i,a));let r=new Map,o=new Map;for(let i of e){let l=Vo(i.a,i.b);r.set(l,i),o.set(l,i.type==="dep-add")}let s=[];for(let i of e){let l=Vo(i.a,i.b);r.get(l)===i&&o.get(l)!==n.has(l)&&s.push(i)}return s}function sh(e,t,n){let r=e.parallel_rows,o=Math.max(0,Math.min(r.length,n)),s=r[o];if(s&&s.root_dir===t)return s.queue_index;for(let i=o-1;i>=0;i--)if(r[i].root_dir===t)return r[i].queue_index+1;for(let i=o;i<r.length;i++)if(r[i].root_dir===t)return r[i].queue_index;return e.parallel_raw_length.get(t)??0}function ih(e,t){return e.parallel_rows.some(n=>n.root_dir===t)}function Si(e,t,n,r){return{type:"worker-queue-place",payload:{bead_id:e,...r?{lane:r}:{},index:n},root_dir:t}}function nl(e,t){let n=0;for(let r of e.cross_lanes.keys())if(n+=1,r===t)return n;return n+1}function Jo(e){let t=rh(e.blocked_by_map),n=[],r=new Set,o={refusal:null},s=u=>{let d=e.owner_of.get(u);return typeof d!="string"||d.length===0?(o.refusal=nh(u),null):d};return{graph:t,dep_ops:n,state:o,ownerOf:s,addDep:(u,d,p)=>{if(o.refusal!==null||u===d)return;let h=t.get(u)||[];if(h.includes(d))return;let m=s(u);if(m!==null){if(tl(t,d,u)){o.refusal=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${u}\uAC00 \uC774\uBBF8 ${d}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}t.set(u,[...h,d]),p!==void 0&&r.add(Vo(u,d)),n.push({type:"dep-add",a:u,b:d,root_dir:m,...p===void 0?{}:{lane_id:p}})}},removeDep:(u,d)=>{if(o.refusal!==null||u===d)return;let p=t.get(u)||[];if(!p.includes(d))return;let h=s(u);h!==null&&(t.set(u,p.filter(m=>m!==d)),n.push({type:"dep-remove",a:u,b:d,root_dir:h}))},laneCreated:(u,d)=>r.has(Vo(u,d))}}function es(e,t,n,r,o={}){if(e.state.refusal!==null)return{refused:e.state.refusal};let s=oh(e.dep_ops,t.blocked_by_map),i=s.filter(d=>d.type==="dep-remove"),l=s.filter(d=>d.type==="dep-add"),a=o.disarm_ops??[],u=o.lane_id===void 0||o.correction===void 0?void 0:th(o.lane_id,o.correction);return{lane_ops:n,ops:[...i,...a,...l,...r],lane_op_index:i.length+a.length,...u===void 0?{}:{correction:u}}}function $d(e,t,n){for(let r=1;r<t.length;r+=1)e.addDep(t[r].bead_id,t[r-1].bead_id,n)}function Xo(e,t){return t>0&&e.entries[t]?.dep_created_by_lane===!0}function xd(e,t,n,r){if(t.status!=="confirmed")return[];let o=[],s=new Map;for(let i of r){let l=e.owner_of.get(i.bead_id)||i.root_dir;typeof l!="string"||l.length===0||s.set(l,[...s.get(l)||[],i.bead_id])}for(let[i,l]of s)o.push({type:"worker-queue-disarm",payload:{bead_ids:l,lane_id:n},root_dir:i});return o}function Ad(e,t,n,r){let o=new Map;for(let s of n){if(t.placed_members.has(s.bead_id))continue;let i=e.ownerOf(s.bead_id);if(i===null)return;let l=o.get(i)??0;r.push(Si(s.bead_id,i,(t.parallel_raw_length.get(i)??0)+l)),o.set(i,l+1)}}function Qo(e){return e.map(t=>({bead_id:t.bead_id,root_dir:t.root_dir}))}function Ti(e,t){return e.length===t.length&&e.every((n,r)=>n.bead_id===t[r].bead_id&&n.root_dir===t[r].root_dir)}function Ci(e,t,n){let r=Jo(n),o=[],s=[],i=[],l,a=n.owner_lane_of.get(e.bead_id),u=e.kind==="chain"?e.lane_id??a:void 0,d=u===void 0?void 0:n.cross_lanes.get(u);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:Xg};if(t.kind==="chain"){if(e.kind==="repo-serial")return{refused:Qg};if(e.kind!=="chain"&&typeof a=="string"&&a!==t.lane_id&&n.cross_lanes.has(a))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${nl(n,a)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`};if(!n.cross_lanes.has(t.lane_id))return{refused:_o}}if(e.kind==="chain"&&d===void 0)return{refused:_o};let p=()=>{if(d===void 0||d.status!=="confirmed")return;let v=d.entries.findIndex(F=>F.bead_id===e.bead_id);if(v<0)return;let O=v>0?d.entries[v-1]:null,B=v+1<d.entries.length?d.entries[v+1]:null,V=Xo(d,v),ae=B!==null&&Xo(d,v+1);V&&O!==null&&r.removeDep(e.bead_id,O.bead_id),ae&&B!==null&&r.removeDep(B.bead_id,e.bead_id),(V||ae)&&O!==null&&B!==null&&r.addDep(B.bead_id,O.bead_id,u)},h=(v,O)=>{let B=n.cross_lanes.get(v),V=B.entries.findIndex(D=>D.bead_id===e.bead_id),ae=B.entries.filter(D=>D.bead_id!==e.bead_id),F=Math.max(0,Math.min(ae.length,V>=0&&O>V?O-1:O)),q=-1;if(ae.forEach((D,G)=>{n.fixed_members.has(D.bead_id)&&(q=G)}),F<=q){r.state.refusal=Zg;return}let L=V>=0?B.entries[V]:d?.entries.find(D=>D.bead_id===e.bead_id)??{bead_id:e.bead_id,root_dir:e.root_dir};l=Zo({status:B.status,entries:[...ae.slice(0,F),L,...ae.slice(F)]},n);let M=l.entries;if(Ti(M,B.entries)||o.push({type:"monitor-lane-update",payload:{lane_id:v,entries:Qo(M)}}),B.status!=="confirmed")return;let W=M.findIndex(D=>D.bead_id===e.bead_id),K=W>0?M[W-1].bead_id:null,H=W+1<M.length?M[W+1].bead_id:null;if(K===null){H!==null&&r.addDep(H,e.bead_id,v);return}if(r.addDep(e.bead_id,K,v),H!==null&&(r.graph.get(H)||[]).includes(K)){let D=B.entries.findIndex(G=>G.bead_id===H);(r.laneCreated(H,K)||D>0&&B.entries[D-1].bead_id===K&&Xo(B,D))&&r.removeDep(H,K),r.addDep(H,e.bead_id,v)}},m=typeof e.queue_index=="number"?e.queue_index:n.queue_index_of.get(e.bead_id);if(e.kind==="chain"&&(p(),d!==void 0&&(t.kind!=="chain"||t.lane_id!==u)&&(i.push(...xd(n,d,u,d.entries.filter(v=>v.bead_id===e.bead_id))),o.push({type:"monitor-lane-update",payload:{lane_id:u,entries:Qo(d.entries.filter(v=>v.bead_id!==e.bead_id))}}))),t.kind==="chain"&&h(t.lane_id,t.marker_index),r.state.refusal!==null)return{refused:r.state.refusal};if(t.kind==="candidate")e.kind!=="candidate"&&s.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let v=sh(n,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")s.push(Si(e.bead_id,e.root_dir,v));else if(e.kind==="parallel"){let O=n.parallel_rows,B=O[Math.max(0,Math.min(O.length,t.marker_index))];if(!(!!B&&B.bead_id===e.bead_id)&&ih(n,e.root_dir)&&m!==void 0){let ae=m>v?v:v-1;ae>=0&&ae!==m&&s.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:ae},root_dir:e.root_dir})}}}else if(t.kind==="chain"){let v=n.cross_lanes.get(t.lane_id);e.kind==="candidate"&&v.status==="confirmed"&&s.push(Si(e.bead_id,e.root_dir,n.parallel_raw_length.get(e.root_dir)??0))}else if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(m!==void 0&&t.index!==m){let v=m>t.index?t.index:t.index-1;v>=0&&v!==m&&s.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:v},root_dir:e.root_dir})}}else s.push(Si(e.bead_id,e.root_dir,t.index,t.lane_id));return es(r,n,o,s,{disarm_ops:i,...t.kind==="chain"?{lane_id:t.lane_id,correction:l}:{}})}function Sd(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:_o};if(n.entries.length<2)return{refused:"\uD655\uC815\uD558\uB824\uBA74 \uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4"};let r=Zo(n,t);if(r.held)return{refused:Ei};let o=r.entries,s=Jo(t),i=[];$d(s,o,e),s.state.refusal===null&&Ad(s,t,o,i);let l=Ti(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Qo(o)}}];return l.push({type:"monitor-lane-confirm",payload:{lane_id:e}}),es(s,t,l,i,{lane_id:e,correction:r})}function Ed(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:_o};let r=Zo(n,t),o=r.entries,s=Jo(t),i=[];$d(s,o,e),s.state.refusal===null&&Ad(s,t,o,i);let l=Ti(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Qo(o)}}];return es(s,t,l,i,{lane_id:e,correction:r})}function Td(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:_o};let r=Zo(n,t),o=r.entries;return es(Jo(t),t,Ti(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Qo(o)}}],[],{lane_id:e,correction:r})}function Cd(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:_o};let r=Jo(t);if(n.status==="confirmed")for(let o=1;o<n.entries.length;o+=1)Xo(n,o)&&r.removeDep(n.entries[o].bead_id,n.entries[o-1].bead_id);return es(r,t,[{type:"monitor-lane-remove",payload:{lane_id:e}}],[],{disarm_ops:xd(t,n,e,n.entries)})}function Rd(e,t){let n=t.cross_lanes.get(e);if(n===void 0||n.status!=="confirmed")return null;let r=[],o=[];for(let i=1;i<n.entries.length;i+=1){let l=`  ${n.entries[i].bead_id} \u2190 ${n.entries[i-1].bead_id}`;Xo(n,i)?r.push(l):o.push(`${l} (\uB808\uC778\uC774 \uB9CC\uB4E4\uC9C0 \uC54A\uC74C)`)}let s=`\uC5F0\uACB0 ${nl(t,e)}\uC744 \uC9C0\uC6C1\uB2C8\uB2E4.`;return r.length===0?`${s}
\uC758\uC874\uC740 \uADF8\uB300\uB85C \uB461\uB2C8\uB2E4`:[s,"\uD568\uAED8 \uC81C\uAC70\uD560 \uC758\uC874:",...r,...o.length===0?[]:["\uADF8\uB300\uB85C \uB450\uB294 \uC758\uC874:",...o]].join(`
`)}function Od(e){let t=new Map;for(let n of e)n.type!=="dep-add"||typeof n.lane_id!="string"||t.set(n.lane_id,[...t.get(n.lane_id)||[],{bead_id:n.a,after:n.b}]);return[...t].map(([n,r])=>({lane_id:n,pairs:r}))}function Ld(e,t){let n=new Map(e.map((r,o)=>[r.bead_id,o]));return t.filter(r=>{let o=n.get(r.bead_id);return o!==void 0&&o>0&&e[o-1].bead_id===r.after})}function rl(e,t){if(e!==null){let n=t.owner_lane_of.get(e.bead_id);if(typeof n=="string"&&t.cross_lanes.has(n))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${nl(t,n)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`}}return{lane_ops:[{type:"monitor-lane-create",payload:{entries:e===null?[]:[e]}}],ops:[],lane_op_index:0}}var ah="\uC0AC\uC774\uD074";function lh(e){let t=new Map,n=r=>Array.isArray(r)?r.filter(o=>typeof o=="string"&&o.length>0):[];for(let r of Array.isArray(e)?e:[]){if(!r||typeof r!="object")continue;let o=r.bead_blocked_by&&typeof r.bead_blocked_by=="object"?r.bead_blocked_by:{};for(let[s,i]of Object.entries(o))Array.isArray(i)&&t.set(s,n(i));for(let s of[...Array.isArray(r.runnable)?r.runnable:[],...Array.isArray(r.session_active)?r.session_active:[]])s&&typeof s.bead_id=="string"&&Array.isArray(s.blocked_by)&&s.blocked_by.length>0&&t.set(s.bead_id,n(s.blocked_by))}return t}function ol(e,t,n){let r=pr(e,t),o=[],s=new Set,i=(a,u)=>{for(let d of a)s.has(d.id)||(s.add(d.id),o.push({bead_id:d.id,root_dir:d.root_dir,workspace_name:d.workspace_name,title:d.title,lane:u}))};i(r.running,"running"),i(r.pr_wait,"pr_wait"),i(r.queue,"queue"),i(r.runnable_all,"runnable");let l=n&&typeof n.root_dir=="string"&&n.root_dir.length?n.root_dir:null;return{issues:l===null?o:o.filter(a=>a.root_dir===l),blocked_by_map:lh(e)}}function Id(e,t){let n=new Map;for(let i of t.issues)!i||typeof i.bead_id!="string"||i.bead_id.length===0||n.has(i.bead_id)||n.set(i.bead_id,i);let r=n.get(e)?.root_dir,o=t.blocked_by_map.get(e)||[],s=[];for(let i of n.values()){if(i.bead_id===e||i.lane==="done"||o.includes(i.bead_id))continue;let l=tl(t.blocked_by_map,i.bead_id,e);s.push({...i,disabled:l,...l?{reason:ah}:{}})}return s.sort((i,l)=>{let a=r!==void 0&&i.root_dir===r,u=r!==void 0&&l.root_dir===r;return a!==u?a?-1:1:i.bead_id.localeCompare(l.bead_id)}),s}function Md(e,t){let n=t.trim().toLowerCase();return n.length===0?e.slice():e.filter(r=>r.bead_id.toLowerCase().includes(n)||r.title.toLowerCase().includes(n))}var{entries:Wd,setPrototypeOf:Pd,isFrozen:ch,getPrototypeOf:uh,getOwnPropertyDescriptor:dh}=Object,{freeze:ln,seal:$n,create:dl}=Object,{apply:pl,construct:fl}=typeof Reflect<"u"&&Reflect;ln||(ln=function(t){return t});$n||($n=function(t){return t});pl||(pl=function(t,n){for(var r=arguments.length,o=new Array(r>2?r-2:0),s=2;s<r;s++)o[s-2]=arguments[s];return t.apply(n,o)});fl||(fl=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return new t(...r)});var Ri=cn(Array.prototype.forEach),ph=cn(Array.prototype.lastIndexOf),Dd=cn(Array.prototype.pop),ts=cn(Array.prototype.push),fh=cn(Array.prototype.splice),Li=cn(String.prototype.toLowerCase),sl=cn(String.prototype.toString),il=cn(String.prototype.match),ns=cn(String.prototype.replace),_h=cn(String.prototype.indexOf),mh=cn(String.prototype.trim),Tn=cn(Object.prototype.hasOwnProperty),an=cn(RegExp.prototype.test),rs=gh(TypeError);function cn(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return pl(e,t,r)}}function gh(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return fl(e,n)}}function pt(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Li;Pd&&Pd(e,null);let r=t.length;for(;r--;){let o=t[r];if(typeof o=="string"){let s=n(o);s!==o&&(ch(t)||(t[r]=s),o=s)}e[o]=!0}return e}function hh(e){for(let t=0;t<e.length;t++)Tn(e,t)||(e[t]=null);return e}function Qn(e){let t=dl(null);for(let[n,r]of Wd(e))Tn(e,n)&&(Array.isArray(r)?t[n]=hh(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=Qn(r):t[n]=r);return t}function os(e,t){for(;e!==null;){let r=dh(e,t);if(r){if(r.get)return cn(r.get);if(typeof r.value=="function")return cn(r.value)}e=uh(e)}function n(){return null}return n}var Nd=ln(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),al=ln(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),ll=ln(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),bh=ln(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),cl=ln(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),yh=ln(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),qd=ln(["#text"]),jd=ln(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),ul=ln(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Fd=ln(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Oi=ln(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),vh=$n(/\{\{[\w\W]*|[\w\W]*\}\}/gm),wh=$n(/<%[\w\W]*|[\w\W]*%>/gm),kh=$n(/\$\{[\w\W]*/gm),$h=$n(/^data-[\-\w.\u00B7-\uFFFF]+$/),xh=$n(/^aria-[\-\w]+$/),zd=$n(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Ah=$n(/^(?:\w+script|data):/i),Sh=$n(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Hd=$n(/^html$/i),Eh=$n(/^[a-z][.\w]*(-[.\w]+)+$/i),Bd=Object.freeze({__proto__:null,ARIA_ATTR:xh,ATTR_WHITESPACE:Sh,CUSTOM_ELEMENT:Eh,DATA_ATTR:$h,DOCTYPE_NAME:Hd,ERB_EXPR:wh,IS_ALLOWED_URI:zd,IS_SCRIPT_OR_DATA:Ah,MUSTACHE_EXPR:vh,TMPLIT_EXPR:kh}),ss={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Th=function(){return typeof window>"u"?null:window},Ch=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,o="data-tt-policy-suffix";n&&n.hasAttribute(o)&&(r=n.getAttribute(o));let s="dompurify"+(r?"#"+r:"");try{return t.createPolicy(s,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+s+" could not be created."),null}},Ud=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Gd(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Th(),t=$e=>Gd($e);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==ss.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,o=r.currentScript,{DocumentFragment:s,HTMLTemplateElement:i,Node:l,Element:a,NodeFilter:u,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:p,DOMParser:h,trustedTypes:m}=e,v=a.prototype,O=os(v,"cloneNode"),B=os(v,"remove"),V=os(v,"nextSibling"),ae=os(v,"childNodes"),F=os(v,"parentNode");if(typeof i=="function"){let $e=n.createElement("template");$e.content&&$e.content.ownerDocument&&(n=$e.content.ownerDocument)}let q,L="",{implementation:M,createNodeIterator:W,createDocumentFragment:K,getElementsByTagName:H}=n,{importNode:D}=r,G=Ud();t.isSupported=typeof Wd=="function"&&typeof F=="function"&&M&&M.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:X,ERB_EXPR:J,TMPLIT_EXPR:fe,DATA_ATTR:Ce,ARIA_ATTR:U,IS_SCRIPT_OR_DATA:te,ATTR_WHITESPACE:xe,CUSTOM_ELEMENT:Ee}=Bd,{IS_ALLOWED_URI:R}=Bd,re=null,ve=pt({},[...Nd,...al,...ll,...cl,...qd]),ye=null,Oe=pt({},[...jd,...ul,...Fd,...Oi]),_e=Object.seal(dl(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Le=null,Ve=null,Ye=Object.seal(dl(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),P=!0,pe=!0,ne=!1,me=!0,Te=!1,ge=!0,Me=!1,We=!1,Ze=!1,qe=!1,z=!1,Y=!1,Ne=!0,lt=!1,Ue="user-content-",Re=!0,$=!1,Z={},Se=null,Ie=pt({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Ge=null,tt=pt({},["audio","video","img","source","image","track"]),ct=null,Tt=pt({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Dt="http://www.w3.org/1998/Math/MathML",ft="http://www.w3.org/2000/svg",gt="http://www.w3.org/1999/xhtml",mt=gt,Rt=!1,bt=null,ue=pt({},[Dt,ft,gt],sl),se=pt({},["mi","mo","mn","ms","mtext"]),A=pt({},["annotation-xml"]),j=pt({},["title","style","font","a","script"]),oe=null,ie=["application/xhtml+xml","text/html"],ce="text/html",Pe=null,Je=null,Xe=n.createElement("form"),je=function(E){return E instanceof RegExp||E instanceof Function},vt=function(){let E=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Je&&Je===E)){if((!E||typeof E!="object")&&(E={}),E=Qn(E),oe=ie.indexOf(E.PARSER_MEDIA_TYPE)===-1?ce:E.PARSER_MEDIA_TYPE,Pe=oe==="application/xhtml+xml"?sl:Li,re=Tn(E,"ALLOWED_TAGS")?pt({},E.ALLOWED_TAGS,Pe):ve,ye=Tn(E,"ALLOWED_ATTR")?pt({},E.ALLOWED_ATTR,Pe):Oe,bt=Tn(E,"ALLOWED_NAMESPACES")?pt({},E.ALLOWED_NAMESPACES,sl):ue,ct=Tn(E,"ADD_URI_SAFE_ATTR")?pt(Qn(Tt),E.ADD_URI_SAFE_ATTR,Pe):Tt,Ge=Tn(E,"ADD_DATA_URI_TAGS")?pt(Qn(tt),E.ADD_DATA_URI_TAGS,Pe):tt,Se=Tn(E,"FORBID_CONTENTS")?pt({},E.FORBID_CONTENTS,Pe):Ie,Le=Tn(E,"FORBID_TAGS")?pt({},E.FORBID_TAGS,Pe):Qn({}),Ve=Tn(E,"FORBID_ATTR")?pt({},E.FORBID_ATTR,Pe):Qn({}),Z=Tn(E,"USE_PROFILES")?E.USE_PROFILES:!1,P=E.ALLOW_ARIA_ATTR!==!1,pe=E.ALLOW_DATA_ATTR!==!1,ne=E.ALLOW_UNKNOWN_PROTOCOLS||!1,me=E.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Te=E.SAFE_FOR_TEMPLATES||!1,ge=E.SAFE_FOR_XML!==!1,Me=E.WHOLE_DOCUMENT||!1,qe=E.RETURN_DOM||!1,z=E.RETURN_DOM_FRAGMENT||!1,Y=E.RETURN_TRUSTED_TYPE||!1,Ze=E.FORCE_BODY||!1,Ne=E.SANITIZE_DOM!==!1,lt=E.SANITIZE_NAMED_PROPS||!1,Re=E.KEEP_CONTENT!==!1,$=E.IN_PLACE||!1,R=E.ALLOWED_URI_REGEXP||zd,mt=E.NAMESPACE||gt,se=E.MATHML_TEXT_INTEGRATION_POINTS||se,A=E.HTML_INTEGRATION_POINTS||A,_e=E.CUSTOM_ELEMENT_HANDLING||{},E.CUSTOM_ELEMENT_HANDLING&&je(E.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(_e.tagNameCheck=E.CUSTOM_ELEMENT_HANDLING.tagNameCheck),E.CUSTOM_ELEMENT_HANDLING&&je(E.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(_e.attributeNameCheck=E.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),E.CUSTOM_ELEMENT_HANDLING&&typeof E.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(_e.allowCustomizedBuiltInElements=E.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Te&&(pe=!1),z&&(qe=!0),Z&&(re=pt({},qd),ye=[],Z.html===!0&&(pt(re,Nd),pt(ye,jd)),Z.svg===!0&&(pt(re,al),pt(ye,ul),pt(ye,Oi)),Z.svgFilters===!0&&(pt(re,ll),pt(ye,ul),pt(ye,Oi)),Z.mathMl===!0&&(pt(re,cl),pt(ye,Fd),pt(ye,Oi))),E.ADD_TAGS&&(typeof E.ADD_TAGS=="function"?Ye.tagCheck=E.ADD_TAGS:(re===ve&&(re=Qn(re)),pt(re,E.ADD_TAGS,Pe))),E.ADD_ATTR&&(typeof E.ADD_ATTR=="function"?Ye.attributeCheck=E.ADD_ATTR:(ye===Oe&&(ye=Qn(ye)),pt(ye,E.ADD_ATTR,Pe))),E.ADD_URI_SAFE_ATTR&&pt(ct,E.ADD_URI_SAFE_ATTR,Pe),E.FORBID_CONTENTS&&(Se===Ie&&(Se=Qn(Se)),pt(Se,E.FORBID_CONTENTS,Pe)),Re&&(re["#text"]=!0),Me&&pt(re,["html","head","body"]),re.table&&(pt(re,["tbody"]),delete Le.tbody),E.TRUSTED_TYPES_POLICY){if(typeof E.TRUSTED_TYPES_POLICY.createHTML!="function")throw rs('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof E.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw rs('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');q=E.TRUSTED_TYPES_POLICY,L=q.createHTML("")}else q===void 0&&(q=Ch(m,o)),q!==null&&typeof L=="string"&&(L=q.createHTML(""));ln&&ln(E),Je=E}},Ot=pt({},[...al,...ll,...bh]),ht=pt({},[...cl,...yh]),Vt=function(E){let be=F(E);(!be||!be.tagName)&&(be={namespaceURI:mt,tagName:"template"});let De=Li(E.tagName),b=Li(be.tagName);return bt[E.namespaceURI]?E.namespaceURI===ft?be.namespaceURI===gt?De==="svg":be.namespaceURI===Dt?De==="svg"&&(b==="annotation-xml"||se[b]):!!Ot[De]:E.namespaceURI===Dt?be.namespaceURI===gt?De==="math":be.namespaceURI===ft?De==="math"&&A[b]:!!ht[De]:E.namespaceURI===gt?be.namespaceURI===ft&&!A[b]||be.namespaceURI===Dt&&!se[b]?!1:!ht[De]&&(j[De]||!Ot[De]):!!(oe==="application/xhtml+xml"&&bt[E.namespaceURI]):!1},jt=function(E){ts(t.removed,{element:E});try{F(E).removeChild(E)}catch{B(E)}},St=function(E,be){try{ts(t.removed,{attribute:be.getAttributeNode(E),from:be})}catch{ts(t.removed,{attribute:null,from:be})}if(be.removeAttribute(E),E==="is")if(qe||z)try{jt(be)}catch{}else try{be.setAttribute(E,"")}catch{}},zt=function(E){let be=null,De=null;if(Ze)E="<remove></remove>"+E;else{let f=il(E,/^[\r\n\t ]+/);De=f&&f[0]}oe==="application/xhtml+xml"&&mt===gt&&(E='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+E+"</body></html>");let b=q?q.createHTML(E):E;if(mt===gt)try{be=new h().parseFromString(b,oe)}catch{}if(!be||!be.documentElement){be=M.createDocument(mt,"template",null);try{be.documentElement.innerHTML=Rt?L:b}catch{}}let y=be.body||be.documentElement;return E&&De&&y.insertBefore(n.createTextNode(De),y.childNodes[0]||null),mt===gt?H.call(be,Me?"html":"body")[0]:Me?be.documentElement:y},ut=function(E){return W.call(E.ownerDocument||E,E,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},Bt=function(E){return E instanceof p&&(typeof E.nodeName!="string"||typeof E.textContent!="string"||typeof E.removeChild!="function"||!(E.attributes instanceof d)||typeof E.removeAttribute!="function"||typeof E.setAttribute!="function"||typeof E.namespaceURI!="string"||typeof E.insertBefore!="function"||typeof E.hasChildNodes!="function")},Xt=function(E){return typeof l=="function"&&E instanceof l};function Nt($e,E,be){Ri($e,De=>{De.call(t,E,be,Je)})}let rn=function(E){let be=null;if(Nt(G.beforeSanitizeElements,E,null),Bt(E))return jt(E),!0;let De=Pe(E.nodeName);if(Nt(G.uponSanitizeElement,E,{tagName:De,allowedTags:re}),ge&&E.hasChildNodes()&&!Xt(E.firstElementChild)&&an(/<[/\w!]/g,E.innerHTML)&&an(/<[/\w!]/g,E.textContent)||E.nodeType===ss.progressingInstruction||ge&&E.nodeType===ss.comment&&an(/<[/\w]/g,E.data))return jt(E),!0;if(!(Ye.tagCheck instanceof Function&&Ye.tagCheck(De))&&(!re[De]||Le[De])){if(!Le[De]&&Ft(De)&&(_e.tagNameCheck instanceof RegExp&&an(_e.tagNameCheck,De)||_e.tagNameCheck instanceof Function&&_e.tagNameCheck(De)))return!1;if(Re&&!Se[De]){let b=F(E)||E.parentNode,y=ae(E)||E.childNodes;if(y&&b){let f=y.length;for(let g=f-1;g>=0;--g){let S=O(y[g],!0);S.__removalCount=(E.__removalCount||0)+1,b.insertBefore(S,V(E))}}}return jt(E),!0}return E instanceof a&&!Vt(E)||(De==="noscript"||De==="noembed"||De==="noframes")&&an(/<\/no(script|embed|frames)/i,E.innerHTML)?(jt(E),!0):(Te&&E.nodeType===ss.text&&(be=E.textContent,Ri([X,J,fe],b=>{be=ns(be,b," ")}),E.textContent!==be&&(ts(t.removed,{element:E.cloneNode()}),E.textContent=be)),Nt(G.afterSanitizeElements,E,null),!1)},en=function(E,be,De){if(Ne&&(be==="id"||be==="name")&&(De in n||De in Xe))return!1;if(!(pe&&!Ve[be]&&an(Ce,be))){if(!(P&&an(U,be))){if(!(Ye.attributeCheck instanceof Function&&Ye.attributeCheck(be,E))){if(!ye[be]||Ve[be]){if(!(Ft(E)&&(_e.tagNameCheck instanceof RegExp&&an(_e.tagNameCheck,E)||_e.tagNameCheck instanceof Function&&_e.tagNameCheck(E))&&(_e.attributeNameCheck instanceof RegExp&&an(_e.attributeNameCheck,be)||_e.attributeNameCheck instanceof Function&&_e.attributeNameCheck(be,E))||be==="is"&&_e.allowCustomizedBuiltInElements&&(_e.tagNameCheck instanceof RegExp&&an(_e.tagNameCheck,De)||_e.tagNameCheck instanceof Function&&_e.tagNameCheck(De))))return!1}else if(!ct[be]){if(!an(R,ns(De,xe,""))){if(!((be==="src"||be==="xlink:href"||be==="href")&&E!=="script"&&_h(De,"data:")===0&&Ge[E])){if(!(ne&&!an(te,ns(De,xe,"")))){if(De)return!1}}}}}}}return!0},Ft=function(E){return E!=="annotation-xml"&&il(E,Ee)},dn=function(E){Nt(G.beforeSanitizeAttributes,E,null);let{attributes:be}=E;if(!be||Bt(E))return;let De={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:ye,forceKeepAttr:void 0},b=be.length;for(;b--;){let y=be[b],{name:f,namespaceURI:g,value:S}=y,Q=Pe(f),ee=S,de=f==="value"?ee:mh(ee);if(De.attrName=Q,De.attrValue=de,De.keepAttr=!0,De.forceKeepAttr=void 0,Nt(G.uponSanitizeAttribute,E,De),de=De.attrValue,lt&&(Q==="id"||Q==="name")&&(St(f,E),de=Ue+de),ge&&an(/((--!?|])>)|<\/(style|title|textarea)/i,de)){St(f,E);continue}if(Q==="attributename"&&il(de,"href")){St(f,E);continue}if(De.forceKeepAttr)continue;if(!De.keepAttr){St(f,E);continue}if(!me&&an(/\/>/i,de)){St(f,E);continue}Te&&Ri([X,J,fe],dt=>{de=ns(de,dt," ")});let rt=Pe(E.nodeName);if(!en(rt,Q,de)){St(f,E);continue}if(q&&typeof m=="object"&&typeof m.getAttributeType=="function"&&!g)switch(m.getAttributeType(rt,Q)){case"TrustedHTML":{de=q.createHTML(de);break}case"TrustedScriptURL":{de=q.createScriptURL(de);break}}if(de!==ee)try{g?E.setAttributeNS(g,f,de):E.setAttribute(f,de),Bt(E)?jt(E):Dd(t.removed)}catch{St(f,E)}}Nt(G.afterSanitizeAttributes,E,null)},tn=function $e(E){let be=null,De=ut(E);for(Nt(G.beforeSanitizeShadowDOM,E,null);be=De.nextNode();)Nt(G.uponSanitizeShadowNode,be,null),rn(be),dn(be),be.content instanceof s&&$e(be.content);Nt(G.afterSanitizeShadowDOM,E,null)};return t.sanitize=function($e){let E=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},be=null,De=null,b=null,y=null;if(Rt=!$e,Rt&&($e="<!-->"),typeof $e!="string"&&!Xt($e))if(typeof $e.toString=="function"){if($e=$e.toString(),typeof $e!="string")throw rs("dirty is not a string, aborting")}else throw rs("toString is not a function");if(!t.isSupported)return $e;if(We||vt(E),t.removed=[],typeof $e=="string"&&($=!1),$){if($e.nodeName){let S=Pe($e.nodeName);if(!re[S]||Le[S])throw rs("root node is forbidden and cannot be sanitized in-place")}}else if($e instanceof l)be=zt("<!---->"),De=be.ownerDocument.importNode($e,!0),De.nodeType===ss.element&&De.nodeName==="BODY"||De.nodeName==="HTML"?be=De:be.appendChild(De);else{if(!qe&&!Te&&!Me&&$e.indexOf("<")===-1)return q&&Y?q.createHTML($e):$e;if(be=zt($e),!be)return qe?null:Y?L:""}be&&Ze&&jt(be.firstChild);let f=ut($?$e:be);for(;b=f.nextNode();)rn(b),dn(b),b.content instanceof s&&tn(b.content);if($)return $e;if(qe){if(z)for(y=K.call(be.ownerDocument);be.firstChild;)y.appendChild(be.firstChild);else y=be;return(ye.shadowroot||ye.shadowrootmode)&&(y=D.call(r,y,!0)),y}let g=Me?be.outerHTML:be.innerHTML;return Me&&re["!doctype"]&&be.ownerDocument&&be.ownerDocument.doctype&&be.ownerDocument.doctype.name&&an(Hd,be.ownerDocument.doctype.name)&&(g="<!DOCTYPE "+be.ownerDocument.doctype.name+`>
`+g),Te&&Ri([X,J,fe],S=>{g=ns(g,S," ")}),q&&Y?q.createHTML(g):g},t.setConfig=function(){let $e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};vt($e),We=!0},t.clearConfig=function(){Je=null,We=!1},t.isValidAttribute=function($e,E,be){Je||vt({});let De=Pe($e),b=Pe(E);return en(De,b,be)},t.addHook=function($e,E){typeof E=="function"&&ts(G[$e],E)},t.removeHook=function($e,E){if(E!==void 0){let be=ph(G[$e],E);return be===-1?void 0:fh(G[$e],be,1)[0]}return Dd(G[$e])},t.removeHooks=function($e){G[$e]=[]},t.removeAllHooks=function(){G=Ud()},t}var Kd=Gd();var Zn={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Ii=e=>(...t)=>({_$litDirective$:e,values:t}),mo=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var is=class extends mo{constructor(t){if(super(t),this.it=Mt,t.type!==Zn.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Mt||t==null)return this._t=void 0,this.it=t;if(t===kn)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};is.directiveName="unsafeHTML",is.resultType=1;var Yd=Ii(is);function hl(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Mr=hl();function tp(e){Mr=e}var us={exec:()=>null};function yt(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(o,s)=>{let i=typeof s=="string"?s:s.source;return i=i.replace(un.caret,"$1"),n=n.replace(o,i),r},getRegex:()=>new RegExp(n,t)};return r}var Rh=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),un={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Oh=/^(?:[ \t]*(?:\n|$))+/,Lh=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Ih=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,ds=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Mh=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,bl=/(?:[*+-]|\d{1,9}[.)])/,np=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,rp=yt(np).replace(/bull/g,bl).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Ph=yt(np).replace(/bull/g,bl).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),yl=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Dh=/^[^\n]+/,vl=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Nh=yt(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",vl).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),qh=yt(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,bl).getRegex(),ji="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",wl=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,jh=yt("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",wl).replace("tag",ji).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),op=yt(yl).replace("hr",ds).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ji).getRegex(),Fh=yt(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",op).getRegex(),kl={blockquote:Fh,code:Lh,def:Nh,fences:Ih,heading:Mh,hr:ds,html:jh,lheading:rp,list:qh,newline:Oh,paragraph:op,table:us,text:Dh},Vd=yt("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",ds).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ji).getRegex(),Bh={...kl,lheading:Ph,table:Vd,paragraph:yt(yl).replace("hr",ds).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Vd).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ji).getRegex()},Uh={...kl,html:yt(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",wl).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:us,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:yt(yl).replace("hr",ds).replace("heading",` *#{1,6} *[^
]`).replace("lheading",rp).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Wh=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,zh=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,sp=/^( {2,}|\\)\n(?!\s*$)/,Hh=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Fi=/[\p{P}\p{S}]/u,$l=/[\s\p{P}\p{S}]/u,ip=/[^\s\p{P}\p{S}]/u,Gh=yt(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,$l).getRegex(),ap=/(?!~)[\p{P}\p{S}]/u,Kh=/(?!~)[\s\p{P}\p{S}]/u,Yh=/(?:[^\s\p{P}\p{S}]|~)/u,Vh=yt(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Rh?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),lp=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Xh=yt(lp,"u").replace(/punct/g,Fi).getRegex(),Qh=yt(lp,"u").replace(/punct/g,ap).getRegex(),cp="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Zh=yt(cp,"gu").replace(/notPunctSpace/g,ip).replace(/punctSpace/g,$l).replace(/punct/g,Fi).getRegex(),Jh=yt(cp,"gu").replace(/notPunctSpace/g,Yh).replace(/punctSpace/g,Kh).replace(/punct/g,ap).getRegex(),eb=yt("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,ip).replace(/punctSpace/g,$l).replace(/punct/g,Fi).getRegex(),tb=yt(/\\(punct)/,"gu").replace(/punct/g,Fi).getRegex(),nb=yt(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),rb=yt(wl).replace("(?:-->|$)","-->").getRegex(),ob=yt("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",rb).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Di=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,sb=yt(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Di).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),up=yt(/^!?\[(label)\]\[(ref)\]/).replace("label",Di).replace("ref",vl).getRegex(),dp=yt(/^!?\[(ref)\](?:\[\])?/).replace("ref",vl).getRegex(),ib=yt("reflink|nolink(?!\\()","g").replace("reflink",up).replace("nolink",dp).getRegex(),Xd=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,xl={_backpedal:us,anyPunctuation:tb,autolink:nb,blockSkip:Vh,br:sp,code:zh,del:us,emStrongLDelim:Xh,emStrongRDelimAst:Zh,emStrongRDelimUnd:eb,escape:Wh,link:sb,nolink:dp,punctuation:Gh,reflink:up,reflinkSearch:ib,tag:ob,text:Hh,url:us},ab={...xl,link:yt(/^!?\[(label)\]\((.*?)\)/).replace("label",Di).getRegex(),reflink:yt(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Di).getRegex()},_l={...xl,emStrongRDelimAst:Jh,emStrongLDelim:Qh,url:yt(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Xd).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:yt(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Xd).getRegex()},lb={..._l,br:yt(sp).replace("{2,}","*").getRegex(),text:yt(_l.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Mi={normal:kl,gfm:Bh,pedantic:Uh},as={normal:xl,gfm:_l,breaks:lb,pedantic:ab},cb={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Qd=e=>cb[e];function Jn(e,t){if(t){if(un.escapeTest.test(e))return e.replace(un.escapeReplace,Qd)}else if(un.escapeTestNoEncode.test(e))return e.replace(un.escapeReplaceNoEncode,Qd);return e}function Zd(e){try{e=encodeURI(e).replace(un.percentDecode,"%")}catch{return null}return e}function Jd(e,t){let n=e.replace(un.findPipe,(s,i,l)=>{let a=!1,u=i;for(;--u>=0&&l[u]==="\\";)a=!a;return a?"|":" |"}),r=n.split(un.splitPipe),o=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;o<r.length;o++)r[o]=r[o].trim().replace(un.slashPipe,"|");return r}function ls(e,t,n){let r=e.length;if(r===0)return"";let o=0;for(;o<r;){let s=e.charAt(r-o-1);if(s===t&&!n)o++;else if(s!==t&&n)o++;else break}return e.slice(0,r-o)}function ub(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function ep(e,t,n,r,o){let s=t.href,i=t.title||null,l=e[1].replace(o.other.outputLinkReplace,"$1");r.state.inLink=!0;let a={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:s,title:i,text:l,tokens:r.inlineTokens(l)};return r.state.inLink=!1,a}function db(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let o=r[1];return t.split(`
`).map(s=>{let i=s.match(n.other.beginningSpace);if(i===null)return s;let[l]=i;return l.length>=o.length?s.slice(o.length):s}).join(`
`)}var Ni=class{constructor(e){Et(this,"options");Et(this,"rules");Et(this,"lexer");this.options=e||Mr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:ls(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=db(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=ls(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:ls(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=ls(t[0],`
`).split(`
`),r="",o="",s=[];for(;n.length>0;){let i=!1,l=[],a;for(a=0;a<n.length;a++)if(this.rules.other.blockquoteStart.test(n[a]))l.push(n[a]),i=!0;else if(!i)l.push(n[a]);else break;n=n.slice(a);let u=l.join(`
`),d=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${u}`:u,o=o?`${o}
${d}`:d;let p=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,s,!0),this.lexer.state.top=p,n.length===0)break;let h=s.at(-1);if(h?.type==="code")break;if(h?.type==="blockquote"){let m=h,v=m.raw+`
`+n.join(`
`),O=this.blockquote(v);s[s.length-1]=O,r=r.substring(0,r.length-m.raw.length)+O.raw,o=o.substring(0,o.length-m.text.length)+O.text;break}else if(h?.type==="list"){let m=h,v=m.raw+`
`+n.join(`
`),O=this.list(v);s[s.length-1]=O,r=r.substring(0,r.length-h.raw.length)+O.raw,o=o.substring(0,o.length-m.raw.length)+O.raw,n=v.substring(s.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:s,text:o}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,o={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let s=this.rules.other.listItemRegex(n),i=!1;for(;e;){let a=!1,u="",d="";if(!(t=s.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let p=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,O=>" ".repeat(3*O.length)),h=e.split(`
`,1)[0],m=!p.trim(),v=0;if(this.options.pedantic?(v=2,d=p.trimStart()):m?v=t[1].length+1:(v=t[2].search(this.rules.other.nonSpaceChar),v=v>4?1:v,d=p.slice(v),v+=t[1].length),m&&this.rules.other.blankLine.test(h)&&(u+=h+`
`,e=e.substring(h.length+1),a=!0),!a){let O=this.rules.other.nextBulletRegex(v),B=this.rules.other.hrRegex(v),V=this.rules.other.fencesBeginRegex(v),ae=this.rules.other.headingBeginRegex(v),F=this.rules.other.htmlBeginRegex(v);for(;e;){let q=e.split(`
`,1)[0],L;if(h=q,this.options.pedantic?(h=h.replace(this.rules.other.listReplaceNesting,"  "),L=h):L=h.replace(this.rules.other.tabCharGlobal,"    "),V.test(h)||ae.test(h)||F.test(h)||O.test(h)||B.test(h))break;if(L.search(this.rules.other.nonSpaceChar)>=v||!h.trim())d+=`
`+L.slice(v);else{if(m||p.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||V.test(p)||ae.test(p)||B.test(p))break;d+=`
`+h}!m&&!h.trim()&&(m=!0),u+=q+`
`,e=e.substring(q.length+1),p=L.slice(v)}}o.loose||(i?o.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(i=!0)),o.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(d),loose:!1,text:d,tokens:[]}),o.raw+=u}let l=o.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;o.raw=o.raw.trimEnd();for(let a of o.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let d=this.lexer.inlineQueue.length-1;d>=0;d--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[d].src)){this.lexer.inlineQueue[d].src=this.lexer.inlineQueue[d].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(a.raw);if(u){let d={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};a.checked=d.checked,o.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=d.raw+a.tokens[0].raw,a.tokens[0].text=d.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(d)):a.tokens.unshift({type:"paragraph",raw:d.raw,text:d.raw,tokens:[d]}):a.tokens.unshift(d)}}if(!o.loose){let u=a.tokens.filter(p=>p.type==="space"),d=u.length>0&&u.some(p=>this.rules.other.anyLine.test(p.raw));o.loose=d}}if(o.loose)for(let a of o.items){a.loose=!0;for(let u of a.tokens)u.type==="text"&&(u.type="paragraph")}return o}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",o=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:o}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=Jd(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),o=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],s={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let i of r)this.rules.other.tableAlignRight.test(i)?s.align.push("right"):this.rules.other.tableAlignCenter.test(i)?s.align.push("center"):this.rules.other.tableAlignLeft.test(i)?s.align.push("left"):s.align.push(null);for(let i=0;i<n.length;i++)s.header.push({text:n[i],tokens:this.lexer.inline(n[i]),header:!0,align:s.align[i]});for(let i of o)s.rows.push(Jd(i,s.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:s.align[a]})));return s}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let s=ls(n.slice(0,-1),"\\");if((n.length-s.length)%2===0)return}else{let s=ub(t[2],"()");if(s===-2)return;if(s>-1){let i=(t[0].indexOf("!")===0?5:4)+t[1].length+s;t[2]=t[2].substring(0,s),t[0]=t[0].substring(0,i).trim(),t[3]=""}}let r=t[2],o="";if(this.options.pedantic){let s=this.rules.other.pedanticHrefTitle.exec(r);s&&(r=s[1],o=s[3])}else o=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),ep(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:o&&o.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),o=t[r.toLowerCase()];if(!o){let s=n[0].charAt(0);return{type:"text",raw:s,text:s}}return ep(n,o,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let o=[...r[0]].length-1,s,i,l=o,a=0,u=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+o);(r=u.exec(t))!=null;){if(s=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!s)continue;if(i=[...s].length,r[3]||r[4]){l+=i;continue}else if((r[5]||r[6])&&o%3&&!((o+i)%3)){a+=i;continue}if(l-=i,l>0)continue;i=Math.min(i,i+l+a);let d=[...r[0]][0].length,p=e.slice(0,o+r.index+d+i);if(Math.min(o,i)%2){let m=p.slice(1,-1);return{type:"em",raw:p,text:m,tokens:this.lexer.inlineTokens(m)}}let h=p.slice(2,-2);return{type:"strong",raw:p,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),o=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&o&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let o;do o=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(o!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Cn=class ml{constructor(t){Et(this,"tokens");Et(this,"options");Et(this,"state");Et(this,"inlineQueue");Et(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Mr,this.options.tokenizer=this.options.tokenizer||new Ni,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:un,block:Mi.normal,inline:as.normal};this.options.pedantic?(n.block=Mi.pedantic,n.inline=as.pedantic):this.options.gfm&&(n.block=Mi.gfm,this.options.breaks?n.inline=as.breaks:n.inline=as.gfm),this.tokenizer.rules=n}static get rules(){return{block:Mi,inline:as}}static lex(t,n){return new ml(n).lex(t)}static lexInline(t,n){return new ml(n).inlineTokens(t)}lex(t){t=t.replace(un.carriageReturn,`
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
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):n.push(o);continue}if(t){let i="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,o=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(o=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)a.includes(o[0].slice(o[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,o.index)+"["+"a".repeat(o[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(o=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,o.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let s;for(;(o=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)s=o[2]?o[2].length:0,r=r.slice(0,o.index+s)+"["+"a".repeat(o[0].length-s-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let i=!1,l="";for(;t;){i||(l=""),i=!1;let a;if(this.options.extensions?.inline?.some(d=>(a=d.call({lexer:this},t,n))?(t=t.substring(a.raw.length),n.push(a),!0):!1))continue;if(a=this.tokenizer.escape(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.tag(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.link(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(a.raw.length);let d=n.at(-1);a.type==="text"&&d?.type==="text"?(d.raw+=a.raw,d.text+=a.text):n.push(a);continue}if(a=this.tokenizer.emStrong(t,r,l)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.codespan(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.br(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.del(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.autolink(t)){t=t.substring(a.raw.length),n.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(t))){t=t.substring(a.raw.length),n.push(a);continue}let u=t;if(this.options.extensions?.startInline){let d=1/0,p=t.slice(1),h;this.options.extensions.startInline.forEach(m=>{h=m.call({lexer:this},p),typeof h=="number"&&h>=0&&(d=Math.min(d,h))}),d<1/0&&d>=0&&(u=t.substring(0,d+1))}if(a=this.tokenizer.inlineText(u)){t=t.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),i=!0;let d=n.at(-1);d?.type==="text"?(d.raw+=a.raw,d.text+=a.text):n.push(a);continue}if(t){let d="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(d);break}else throw new Error(d)}}return n}},qi=class{constructor(e){Et(this,"options");Et(this,"parser");this.options=e||Mr}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(un.notSpaceStart)?.[0],o=e.replace(un.endingNewline,"")+`
`;return r?'<pre><code class="language-'+Jn(r)+'">'+(n?o:Jn(o,!0))+`</code></pre>
`:"<pre><code>"+(n?o:Jn(o,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Jn(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),o=Zd(e);if(o===null)return r;e=o;let s='<a href="'+e+'"';return t&&(s+=' title="'+Jn(t)+'"'),s+=">"+r+"</a>",s}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let o=Zd(e);if(o===null)return Jn(n);e=o;let s=`<img src="${e}" alt="${n}"`;return t&&(s+=` title="${Jn(t)}"`),s+=">",s}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Jn(e.text)}},Al=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},Rn=class gl{constructor(t){Et(this,"options");Et(this,"renderer");Et(this,"textRenderer");this.options=t||Mr,this.options.renderer=this.options.renderer||new qi,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Al}static parse(t,n){return new gl(n).parse(t)}static parseInline(t,n){return new gl(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let o=t[r];if(this.options.extensions?.renderers?.[o.type]){let i=o,l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(i.type)){n+=l||"";continue}}let s=o;switch(s.type){case"space":{n+=this.renderer.space(s);break}case"hr":{n+=this.renderer.hr(s);break}case"heading":{n+=this.renderer.heading(s);break}case"code":{n+=this.renderer.code(s);break}case"table":{n+=this.renderer.table(s);break}case"blockquote":{n+=this.renderer.blockquote(s);break}case"list":{n+=this.renderer.list(s);break}case"checkbox":{n+=this.renderer.checkbox(s);break}case"html":{n+=this.renderer.html(s);break}case"def":{n+=this.renderer.def(s);break}case"paragraph":{n+=this.renderer.paragraph(s);break}case"text":{n+=this.renderer.text(s);break}default:{let i='Token with "'+s.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return n}parseInline(t,n=this.renderer){let r="";for(let o=0;o<t.length;o++){let s=t[o];if(this.options.extensions?.renderers?.[s.type]){let l=this.options.extensions.renderers[s.type].call({parser:this},s);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(s.type)){r+=l||"";continue}}let i=s;switch(i.type){case"escape":{r+=n.text(i);break}case"html":{r+=n.html(i);break}case"link":{r+=n.link(i);break}case"image":{r+=n.image(i);break}case"checkbox":{r+=n.checkbox(i);break}case"strong":{r+=n.strong(i);break}case"em":{r+=n.em(i);break}case"codespan":{r+=n.codespan(i);break}case"br":{r+=n.br(i);break}case"del":{r+=n.del(i);break}case"text":{r+=n.text(i);break}default:{let l='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return r}},Pi,cs=(Pi=class{constructor(e){Et(this,"options");Et(this,"block");this.options=e||Mr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Cn.lex:Cn.lexInline}provideParser(){return this.block?Rn.parse:Rn.parseInline}},Et(Pi,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),Et(Pi,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Pi),pb=class{constructor(...e){Et(this,"defaults",hl());Et(this,"options",this.setOptions);Et(this,"parse",this.parseMarkdown(!0));Et(this,"parseInline",this.parseMarkdown(!1));Et(this,"Parser",Rn);Et(this,"Renderer",qi);Et(this,"TextRenderer",Al);Et(this,"Lexer",Cn);Et(this,"Tokenizer",Ni);Et(this,"Hooks",cs);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let o=r;for(let s of o.header)n=n.concat(this.walkTokens(s.tokens,t));for(let s of o.rows)for(let i of s)n=n.concat(this.walkTokens(i.tokens,t));break}case"list":{let o=r;n=n.concat(this.walkTokens(o.items,t));break}default:{let o=r;this.defaults.extensions?.childTokens?.[o.type]?this.defaults.extensions.childTokens[o.type].forEach(s=>{let i=o[s].flat(1/0);n=n.concat(this.walkTokens(i,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(o=>{if(!o.name)throw new Error("extension name required");if("renderer"in o){let s=t.renderers[o.name];s?t.renderers[o.name]=function(...i){let l=o.renderer.apply(this,i);return l===!1&&(l=s.apply(this,i)),l}:t.renderers[o.name]=o.renderer}if("tokenizer"in o){if(!o.level||o.level!=="block"&&o.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let s=t[o.level];s?s.unshift(o.tokenizer):t[o.level]=[o.tokenizer],o.start&&(o.level==="block"?t.startBlock?t.startBlock.push(o.start):t.startBlock=[o.start]:o.level==="inline"&&(t.startInline?t.startInline.push(o.start):t.startInline=[o.start]))}"childTokens"in o&&o.childTokens&&(t.childTokens[o.name]=o.childTokens)}),r.extensions=t),n.renderer){let o=this.defaults.renderer||new qi(this.defaults);for(let s in n.renderer){if(!(s in o))throw new Error(`renderer '${s}' does not exist`);if(["options","parser"].includes(s))continue;let i=s,l=n.renderer[i],a=o[i];o[i]=(...u)=>{let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d||""}}r.renderer=o}if(n.tokenizer){let o=this.defaults.tokenizer||new Ni(this.defaults);for(let s in n.tokenizer){if(!(s in o))throw new Error(`tokenizer '${s}' does not exist`);if(["options","rules","lexer"].includes(s))continue;let i=s,l=n.tokenizer[i],a=o[i];o[i]=(...u)=>{let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d}}r.tokenizer=o}if(n.hooks){let o=this.defaults.hooks||new cs;for(let s in n.hooks){if(!(s in o))throw new Error(`hook '${s}' does not exist`);if(["options","block"].includes(s))continue;let i=s,l=n.hooks[i],a=o[i];cs.passThroughHooks.has(s)?o[i]=u=>{if(this.defaults.async&&cs.passThroughHooksRespectAsync.has(s))return(async()=>{let p=await l.call(o,u);return a.call(o,p)})();let d=l.call(o,u);return a.call(o,d)}:o[i]=(...u)=>{if(this.defaults.async)return(async()=>{let p=await l.apply(o,u);return p===!1&&(p=await a.apply(o,u)),p})();let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d}}r.hooks=o}if(n.walkTokens){let o=this.defaults.walkTokens,s=n.walkTokens;r.walkTokens=function(i){let l=[];return l.push(s.call(this,i)),o&&(l=l.concat(o.call(this,i))),l}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Cn.lex(e,t??this.defaults)}parser(e,t){return Rn.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},o={...this.defaults,...r},s=this.onError(!!o.silent,!!o.async);if(this.defaults.async===!0&&r.async===!1)return s(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return s(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return s(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(o.hooks&&(o.hooks.options=o,o.hooks.block=e),o.async)return(async()=>{let i=o.hooks?await o.hooks.preprocess(t):t,l=await(o.hooks?await o.hooks.provideLexer():e?Cn.lex:Cn.lexInline)(i,o),a=o.hooks?await o.hooks.processAllTokens(l):l;o.walkTokens&&await Promise.all(this.walkTokens(a,o.walkTokens));let u=await(o.hooks?await o.hooks.provideParser():e?Rn.parse:Rn.parseInline)(a,o);return o.hooks?await o.hooks.postprocess(u):u})().catch(s);try{o.hooks&&(t=o.hooks.preprocess(t));let i=(o.hooks?o.hooks.provideLexer():e?Cn.lex:Cn.lexInline)(t,o);o.hooks&&(i=o.hooks.processAllTokens(i)),o.walkTokens&&this.walkTokens(i,o.walkTokens);let l=(o.hooks?o.hooks.provideParser():e?Rn.parse:Rn.parseInline)(i,o);return o.hooks&&(l=o.hooks.postprocess(l)),l}catch(i){return s(i)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+Jn(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},Ir=new pb;function At(e,t){return Ir.parse(e,t)}At.options=At.setOptions=function(e){return Ir.setOptions(e),At.defaults=Ir.defaults,tp(At.defaults),At};At.getDefaults=hl;At.defaults=Mr;At.use=function(...e){return Ir.use(...e),At.defaults=Ir.defaults,tp(At.defaults),At};At.walkTokens=function(e,t){return Ir.walkTokens(e,t)};At.parseInline=Ir.parseInline;At.Parser=Rn;At.parser=Rn.parse;At.Renderer=qi;At.TextRenderer=Al;At.Lexer=Cn;At.lexer=Cn.lex;At.Tokenizer=Ni;At.Hooks=cs;At.parse=At;var Dx=At.options,Nx=At.setOptions,qx=At.use,jx=At.walkTokens,Fx=At.parseInline;var Bx=Rn.parse,Ux=Cn.lex;function fr(e){let t=At.parse(e),n=Kd.sanitize(t);return Yd(n)}function er(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function go(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Bi(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var fp={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},fb={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},_b=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,mb=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function On(e){return!!e&&typeof e=="object"}function Sl(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function El(e,t){let n=Sl(e),r=Sl(t),o=new Map;for(let l of n)o.set(l,(o.get(l)||0)+1);let s=0;for(let l of r){let a=o.get(l)||0;a>0?o.set(l,a-1):s+=1}let i=0;for(let l of o.values())i+=l;return{added:s,removed:i}}function _p(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(o=>On(o)&&typeof o.text=="string"?o.text:"").join(""):On(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(o=>o.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function gb(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:fp[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=Sl(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:o,removed:s}=El(n.old_string,n.new_string);r.added=o,r.removed=s}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let o=0,s=0,i=Array.isArray(n.edits)?n.edits:[];for(let l of i){let a=El(On(l)?l.old_string:"",On(l)?l.new_string:"");o+=a.added,s+=a.removed}r.added=o,r.removed=s}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(r.launch_id=e.id),typeof n.description=="string"&&(r.command=n.description)),r}function Tl(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}var hb=/<system-reminder>[\s\S]*?<\/system-reminder>/g;function mp(e){let t;if(typeof e=="string")t=e;else if(Array.isArray(e))t=e.filter(r=>On(r)&&r.type==="text"&&typeof r.text=="string").map(r=>String(r.text)).join(`
`);else return null;let n=t.replace(hb,"").trim();return n.length>0?{kind:"user",text:n}:null}function Cl(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=_b.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:mb.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function bb(e,t){if(e.subtype==="init"){let n=typeof e.model=="string"?e.model:"";return t.progress=null,[{kind:"thinking",text:n?`\uC138\uC158 \uC2DC\uC791 \xB7 ${n}`:"\uC138\uC158 \uC2DC\uC791"}]}if(e.subtype==="thinking_tokens"){let r=`\uC0DD\uAC01 \uC911\u2026 ${typeof e.estimated_tokens=="number"&&Number.isFinite(e.estimated_tokens)?Math.max(0,Math.round(e.estimated_tokens)):0} \uD1A0\uD070`;return t.progress?(t.progress.text=r,[]):(t.progress={kind:"thinking",text:r},[t.progress])}return[]}function yb(e,t){let n=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let r=e.message,o=r&&Array.isArray(r.content)?r.content:[],s=[];for(let i of o)if(On(i)){if(i.type==="text"&&typeof i.text=="string")s.push(Cl(i.text));else if(i.type==="thinking"){let l=Tl(i.thinking);l&&s.push(l)}else if(i.type==="tool_use"){let l=gb(i);typeof i.id=="string"&&t.set(i.id,l),s.push(l)}}return n?pp(s,n):s}if(e.type==="user"){let r=e.message,o=r&&Array.isArray(r.content)?r.content:[];for(let i of o)if(On(i)&&i.type==="tool_result"){let l=t.get(String(i.tool_use_id));if(l){let a=_p(i.content);l.result=a,l.output=typeof i.content=="string"?i.content:a,i.is_error===!0&&(l.is_error=!0)}}let s=mp(r&&r.content);return s?[s]:[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success",o={kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""};return n?pp([o],n):[o]}return[]}function pp(e,t){for(let n of e)n.parent_tool_use_id=t;return e}function vb(e){let t=typeof e.command=="string"?e.command:"",n=_p(e.aggregated_output===void 0?e.output:e.aggregated_output),o=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",n].filter(i=>i.length>0).join(" \xB7 "),s={kind:"tool",tool:"shell",icon:fp.Bash,command:t,input:{command:t},expandable:!0};return o.length>0&&(s.result=o),typeof e.aggregated_output=="string"&&(s.output=e.aggregated_output),s}function wb(e){if(e.type==="item.completed"&&On(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[Cl(t.text)];if(t.type==="user_message"){let n=mp(t.text);return n?[n]:[]}if(t.type==="reasoning"){let n=Tl(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[vb(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function kb(e){if(e.schema!=="codex-delegation-monitor-v1"||!On(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&On(t.item)){let n=t.item;if(typeof n.id!="string"||n.id.length===0)return[];if(t.type==="item.completed"&&n.kind==="agent_message"&&typeof n.text=="string"&&n.text.trim().length>0)return[Cl(n.text)];if(t.type==="item.completed"&&n.kind==="reasoning"){let i=Tl(n.text);return i?[i]:[]}if(t.type!=="item.completed"||n.kind!=="activity"||typeof n.activity!="string")return[];let r=fb[n.activity];if(!r)return[];let o,s;if(n.status==="completed")o="\uC644\uB8CC",s="\u2713";else if(n.status==="failed")o="\uC2E4\uD328",s="\u2717";else return[];return[{kind:"tool",tool:`${r} \xB7 ${o}`,icon:s,expandable:!1,result:""}]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function $b(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function xb(e){let t=e;if(typeof e=="string"){let n=e.trim();if(n.length===0)return null;try{t=JSON.parse(n)}catch{return null}}return On(t)?t:null}function gp(e={}){let t=e.skip_delegated===!0,n=new Map,r={progress:null};return{push(o){let s=xb(o);if(!s)return[];if(t&&typeof s.parent_tool_use_id=="string"&&s.parent_tool_use_id.length>0)return[];if(s.type==="system"&&s.schema!=="codex-delegation-monitor-v1")return bb(s,r);let i=s.schema==="codex-delegation-monitor-v1"?kb(s):$b(s)?wb(s):yb(s,n);return i.length>0&&(r.progress=null),i}}}function Rl(e){let t=[],n=gp(),r=Array.isArray(e)?e:[];for(let o of r)for(let s of n.push(o))t.push(s);return t}var Ab=5,Sb=10,Eb=/Task\s+#(\d+)/,Tb=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Cb=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function ps(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Rb(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function Ob(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function Lb(e){let t=new Map,n=0;for(let o of e){if(o.kind!=="tool")continue;n+=1;let s=o.input||{};if(o.tool==="TaskCreate"){let a=Eb.exec(o.output||o.result||""),u=String(s.activeForm||s.subject||"").trim();if(!a||u.length===0)continue;t.set(a[1],{label:u,active:s.status==="in_progress"?n:0});continue}if(o.tool!=="TaskUpdate")continue;let i=t.get(String(s.taskId??""));if(!i)continue;let l=s.activeForm||s.subject;typeof l=="string"&&l.trim().length>0&&(i.label=l.trim()),typeof s.status=="string"&&(i.active=s.status==="in_progress"?n:0)}let r=null;for(let o of t.values())o.active>0&&(!r||o.active>r.active)&&(r=o);return r?r.label:null}function Ib(e){if(e.tool==="Bash"){let t=e.command||"";return Tb.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Cb.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function Mb(e){let t=e.filter(o=>o.kind==="tool").slice(-Sb),n=new Map;t.forEach((o,s)=>{let i=Ib(o);if(!i)return;let l=n.get(i)||{count:0,last:-1};l.count+=1,l.last=s,n.set(i,l)});let r=null;for(let[o,s]of n)(!r||s.count>r.count||s.count===r.count&&s.last>r.last)&&(r={label:o,count:s.count,last:s.last});return r?r.label:null}function Pb(e){let t=Ob(e);if(t)return{text:t,guess:!1};let n=Lb(e);if(n)return{text:n,guess:!1};let r=Mb(e);return r?{text:r,guess:!0}:null}function Db(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:on(e,t)}function ho(e,t={}){let{transport:n,sessionLogStore:r,onClose:o}=t,s=null,i=null,l=null,a=null,u=null,d=!1,p={},h=!0,m=new Set,v=new Set,O=null,B=null,V=!1,ae=!1,F=!1,q=null,L=null;function M(){V=!1,ae=!1,F=!1,q=null,L=null}async function W(z){if(n){ae=!0,F=!1,Le();try{let Y=await Promise.resolve(n("get-attempt-prompt",{attempt_id:z,...u?{root_dir:u}:{}}));if(s!==z)return;!Y||typeof Y!="object"||Array.isArray(Y)?F=!0:(q=Y,L=z)}catch{s===z&&(F=!0)}finally{s===z&&(ae=!1,Le())}}}function K(){if(V=!V,V&&s&&L!==s){W(s);return}Le()}function H(){if(!V)return"";let z=go({loading:ae,error:F});if(z)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${z}
      </div>`;if(!q)return"";if(q.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let Y=Bi(q.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${Y?c`<div class="prompt-block__meta">${Y} 발송</div>`:""}
      ${typeof q.task_prompt=="string"?er("\uACFC\uC5C5 (user)",q.task_prompt):""}
      ${typeof q.system_prompt=="string"?er("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",q.system_prompt):""}
    </div>`}function D(){if(!a||!r)return[];let z=r.get(a);return Rl(z?z.lines:[])}function G(){if(!a||!r)return null;let z=r.get(a),Y=z?z.last_event_at:null;return typeof Y=="number"?Y:null}function X(){return p.status==="running"}function J(){if(X()&&s){B||(B=setInterval(()=>Le(),1e3));return}fe()}function fe(){B&&(clearInterval(B),B=null)}function Ce(z){let Y=[],Ne=0;for(;Ne<z.length;){let{idx:lt,line:Ue}=z[Ne];if(Ue.kind==="tool"){let Re=Ne;for(;Re<z.length&&z[Re].line.kind==="tool"&&z[Re].line.tool===Ue.tool;)Re+=1;if(Re-Ne>=Ab&&!v.has(lt)){Y.push({kind:"group",idx:lt,tool:Ue.tool||"",lines:z.slice(Ne,Re)}),Ne=Re;continue}}Y.push({kind:"line",idx:lt,line:Ue}),Ne+=1}return Y}function U(z){let Y=[],Ne=new Map;for(let Re=0;Re<z.length;Re+=1){let $=z[Re],Z=$.parent_tool_use_id;if(typeof Z=="string"&&Z.length>0){let Se=Ne.get(Z);Se||(Se={kind:"subagent",idx:Re,launch_id:Z,agent_type:null,header:null,lines:[]},Ne.set(Z,Se),Y.push(Se)),Se.lines.push({idx:Re,line:$});continue}if($.kind==="tool"&&$.tool==="Agent"&&typeof $.launch_id=="string"&&$.launch_id.length>0){let Se=te($),Ie=Ne.get($.launch_id);if(Ie){Ie.header={idx:Re,line:$},Ie.agent_type=Se;continue}let Ge={kind:"subagent",idx:Re,launch_id:$.launch_id,agent_type:Se,header:{idx:Re,line:$},lines:[]};Ne.set($.launch_id,Ge),Y.push(Ge);continue}Y.push({kind:"entry",idx:Re,line:$})}let lt=[],Ue=0;for(;Ue<Y.length;){if(Y[Ue].kind!=="entry"){lt.push(Y[Ue]),Ue+=1;continue}let Re=Ue;for(;Re<Y.length&&Y[Re].kind==="entry";)Re+=1;lt.push(...Ce(Y.slice(Ue,Re))),Ue=Re}return lt}function te(z){let Y=z.input;return Y&&typeof Y.subagent_type=="string"?Y.subagent_type:null}function xe(z){for(let Y=z.length-1;Y>=0;Y-=1){let Ne=z[Y];if(Ne.kind==="result"||Ne.kind==="error")return null;if(Ne.kind==="tool"&&!Object.hasOwn(Ne,"result"))return Ne}return null}function Ee(z){for(let Y=z.length-1;Y>=0;Y-=1)if(z[Y].kind==="thinking")return z[Y];return null}function R(z,Y){if(Y.kind==="gate")return c`<div class="sv__gate">${Y.text}</div>`;if(Y.kind==="phase")return c`<div class="sv__phase">${Y.text}</div>`;if(Y.kind==="result")return c`<div
        class="sv__result${Y.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${Y.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${fr(Y.text||(Y.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(Y.kind==="thinking"){let Ne=m.has(z);return c`<div
        class="sv__think${Ne?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Ye(z)}
      >
        <span class="sv__think-line">💭 ${ps(Y.text)}</span>
        ${Ne?c`<pre class="sv__think-expand">${Y.text}</pre>`:""}
      </div>`}if(Y.kind==="user"){let Ne=m.has(z);return c`<div
        class="sv__line sv__line--user${Ne?" sv__line--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Ye(z)}
      >
        <span class="sv__user-line">▷ ${ps(Y.text)}</span>
        ${Ne?c`<pre class="sv__user-expand">${Y.text}</pre>`:""}
      </div>`}if(Y.kind==="error")return c`<div class="sv__error">⛔ ${Y.text}</div>`;if(Y.kind==="blocker")return c`<div class="sv__error">⛔ ${Y.text}</div>`;if(Y.kind==="tool"){let Ne=m.has(z),lt=Y.tool==="Bash"?Rb(Y.command):0,Ue=Y.tool==="Bash"?lt>1?ps(Y.command):Y.command:Y.path||Y.command||"";return c`<div
        class="sv__tool${Ne?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>Ye(z)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${Y.icon}</span>
          <span class="sv__tool-name">${Y.tool}</span>
          ${Ue?c`<span class="sv__tool-detail">${Ue}</span>`:""}
          ${lt>1?c`<span class="sv__tool-more">⋯ ${lt}줄</span>`:""}
          ${typeof Y.added=="number"?c`<span class="sv__diff-add">+${Y.added}</span>`:""}
          ${typeof Y.removed=="number"?c`<span class="sv__diff-del">−${Y.removed}</span>`:""}
          ${Y.result?c`<span class="sv__tool-ok">→ ${Y.result}</span>`:""}
        </span>
        ${Ne?c`<pre class="sv__tool-expand">${re(Y)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${fr(Y.text||"")}</div>`}function re(z){let Y=[];if(z.tool==="Bash"&&typeof z.command=="string"&&z.command.length>0)Y.push(z.command);else if(z.input!==void 0)try{Y.push(`input: ${JSON.stringify(z.input,null,2)}`)}catch{}return typeof z.output=="string"&&z.output.length>0&&Y.push(`output:
${z.output}`),Y.join(`

`)}function ve(){if(!s)return c``;let z=D(),Y=(i?[p.agent_type,p.model,p.effort]:[p.runner,p.model,p.effort]).filter(Boolean).join(" \xB7 "),Ne=p.session_id||"",lt=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${h?"ON":"OFF"}`,Ue=X(),Re=Ue?Db(G(),Date.now()):"",$=Ue?xe(z):null,Z=Ue?Ee(z):null,Se=Pb(z);return c`<div class="sv" data-attempt-id=${s}>
      <div class="sv__bar">
        <span class="sv__id"
          >${p.label||(i?p.role||"":s)}</span
        >
        ${Se?c`<span
              class="sv__stage${Se.guess?" sv__stage--guess":""}"
              title=${Se.text}
              >${Se.text}</span
            >`:""}
        ${Ue?c`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${Re?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${Re}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${Re?c`<span class="sv__live-ago">${Re}</span>`:""}</span
            >`:""}
        ${Ne?c`<button
              type="button"
              class="sv__session"
              title=${Ne}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${Ne}`}
              @click=${()=>pe(Ne)}
            >
              ⧉ ${Ne.slice(0,8)}
            </button>`:""}
        ${p.resume_command?c`<button
              type="button"
              class="sv__resume-cmd"
              title=${p.resume_command}
              aria-label=${`\uC7AC\uAC1C \uBA85\uB839 \uBCF5\uC0AC: ${p.resume_command}`}
              @click=${()=>pe(p.resume_command||"")}
            >
              ⧉ 재개 명령
            </button>`:""}
        ${Y?c`<span class="sv__meta">${Y}</span>`:""}
        ${p.worktree?c`<span class="sv__wt" title=${p.worktree}
              >${p.worktree}</span
            >`:""}
        ${i||d?"":c`<button
              type="button"
              class="sv__prompt-toggle${V?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${V?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${K}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${h?" sv__follow--on":""}"
          aria-pressed=${h?"true":"false"}
          aria-label=${lt}
          @click=${P}
        >
          <span class="sv__follow-full">⇣ ${lt}</span>
          <span class="sv__follow-short">⇣ ${h?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>qe()}
        >
          ✕
        </button>
      </div>
      ${i||d?"":H()}
      <div class="sv__body">
        ${z.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:U(z).map(Ie=>Ie.kind==="subagent"?Oe(Ie):Ie.kind==="group"?ye(Ie):R(Ie.idx,Ie.line))}
      </div>
      ${$||Z?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${$?c`<span class="sv__now-icon">${$.icon}</span>
                  <span class="sv__now-name">${$.tool}</span>
                  <span class="sv__now-detail"
                    >${$.tool==="Bash"?ps($.command):$.path||$.command||""}</span
                  >`:""}
            ${Z?c`<span class="sv__now-think"
                  >💭 ${ps(Z.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function ye(z){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>_e(z.idx)}
    >
      <span class="sv__group-icon">${z.lines[0].line.icon}</span>
      <span class="sv__group-name">${z.tool}</span>
      <span class="sv__group-count">${z.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function Oe(z){let Y=v.has(z.idx),Ne=z.header?z.header.line:null,lt=Ne?Ne.is_error===!0?"\u2717":typeof Ne.result=="string"?"\u2713":"\u27F3":"",Ue=Ne&&Ne.command?Ne.command:"";return c`<div class="sv__sub${Y?" sv__sub--open":""}">
      <div
        class="sv__sub-head"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>_e(z.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${z.agent_type||"subagent"}</span>
        ${Ue?c`<span class="sv__sub-detail">${Ue}</span>`:""}
        <span class="sv__sub-count">${z.lines.length}줄</span>
        ${lt?c`<span class="sv__sub-state">${lt}</span>`:""}
        ${Y?"":c`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${Y?c`<div class="sv__sub-body">
            ${Ce(z.lines).map(Re=>Re.kind==="group"?ye(Re):R(Re.idx,Re.line))}
          </div>`:""}
    </div>`}function _e(z){v.add(z),Le()}function Le(){ot(ve(),e),J(),h&&Ve()}function Ve(){let z=e.querySelector(".sv__body");z&&(z.scrollTop=z.scrollHeight)}function Ye(z){m.has(z)?m.delete(z):m.add(z),Le()}function P(){h=!h,Le()}function pe(z){sn(z).then(Y=>{Y?he("\uBCF5\uC0AC\uB428","success",1200):he("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function ne(z){!s||!z||(p={...p,...z},Le())}function me(z){let Y=z.target;if(!Y||!Y.classList||!Y.classList.contains("sv__body"))return;!(Y.scrollHeight-Y.scrollTop-Y.clientHeight<=4)&&h&&(h=!1,Le())}e.addEventListener("scroll",me,!0);function Te(z){let Y=z.target;!Y||typeof Y.closest!="function"||e.contains(Y)||Y.closest("dialog")||Y.closest(".md-viewer-root")||qe()}let ge=!1;function Me(){ge||(document.addEventListener("mousedown",Te),ge=!0)}function We(){ge&&(document.removeEventListener("mousedown",Te),ge=!1)}function Ze(z){let Y=z&&z.attempt_id;if(!Y)return;let Ne=typeof z.launch_id=="string"&&z.launch_id.length>0?z.launch_id:null,lt=z.session_ref&&typeof z.session_ref=="object"?z.session_ref:null;if(Ne&&lt)return;let Ue=a;s=Y,i=Ne,l=lt,a=i?`session-log:${s}:${i}`:`session-log:${s}`,n&&Ue&&Ue!==a&&Promise.resolve(n("unsubscribe-session-log",{id:Ue})).catch(()=>{}),u=typeof z.root_dir=="string"&&z.root_dir.length>0?z.root_dir:null,p=z.meta||{},d=z.hide_prompt===!0,h=!0,m.clear(),v.clear(),M(),!O&&r&&(O=r.subscribe(Le)),n&&Promise.resolve(n("subscribe-session-log",{id:a,attempt_id:s,...i?{launch_id:i}:{},...l?{session_ref:l}:{},...u?{root_dir:u}:{}})).catch(()=>{}),Me(),Le()}function qe(){let z=a;We(),s=null,i=null,l=null,a=null,u=null,d=!1,m.clear(),v.clear(),M(),fe(),n&&z&&Promise.resolve(n("unsubscribe-session-log",{id:z})).catch(()=>{}),ot(c``,e),o&&o()}return{open:Ze,updateMeta:ne,close:qe,isOpen(){return s!==null},destroy(){fe(),We(),O&&(O(),O=null),e.removeEventListener("scroll",me,!0),s=null,i=null,l=null,a=null,u=null,d=!1,ot(c``,e)}}}function Nb(e){let t=[],n=e?.workflow?.stages,r=n?.spec?.doc;r&&t.push({kind:"spec",path:r.path,missing_state:r.missing_state});let o=n?.plan?.doc;return o&&t.push({kind:"plan",path:o.path,missing_state:o.missing_state}),t}function hp(e,t){let n=Nb(e);return c`
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
  `}var qb="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",jb=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,Fb=/^\*\*결론\*\* — (.+)$/;function Ui(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==qb)return null;let n=jb.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],o=n[2],s=n[3],i=2;for(;i<t.length&&t[i].trim().length===0;)i+=1;let l=i<t.length?Fb.exec(t[i]):null,a=l?l[1].replace(/\s+/g," ").trim():"",u=l?i+1:i;return{lane:r,identifier:o,timestamp:s,conclusion:a,body:t.slice(u).join(`
`).trim()}}var bp=20;function yp(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),o=String(t.getHours()).padStart(2,"0"),s=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${o}:${s}`}function Bb(e){return e.length>bp?`${e.slice(0,bp)}\u2026`:e}function Ub(e,t,n,r){let o=`${t.lane} ${Bb(t.identifier)}`;return c`<div class="detail-report">
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
        <span class="detail-report__time">${yp(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${r&&t.body.length>0?c`<div class="detail-report__body">
          ${fr(t.body)}
        </div>`:""}
  </div>`}function Wb(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${yp(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${fr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function vp(e,t={},n={}){let r=Array.isArray(e)?e.filter(Boolean):[],o=n.expanded||new Set,s=typeof n.draft=="string"?n.draft:"",i=n.sending===!0,l=r.slice().sort((a,u)=>String(u.created_at||"").localeCompare(String(a.created_at||"")));return c`
    <div class="detail-section-label">댓글 (${r.length})</div>
    ${n.error?c`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:l.length===0?c`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:c`<div class="detail-comments" data-seam="comments">
            ${l.map(a=>{let u=Ui(typeof a.text=="string"?a.text:"");return u?Ub(a,u,t,o.has(a.id)):Wb(a)})}
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
  `}var{I:w0}=sc;var wp=e=>e.strings===void 0;var zb={},kp=(e,t=zb)=>e._$AH=t;var _r=Ii(class extends mo{constructor(e){if(super(e),e.type!==Zn.PROPERTY&&e.type!==Zn.ATTRIBUTE&&e.type!==Zn.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!wp(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===kn||t===Mt)return t;let n=e.element,r=e.name;if(e.type===Zn.PROPERTY){if(t===n[r])return kn}else if(e.type===Zn.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return kn}else if(e.type===Zn.ATTRIBUTE&&n.getAttribute(r)===t+"")return kn;return kp(e),t}});var Hb=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review",receipt_stage:null,fill_stage:"spec",stale_stage:"spec",hue:"spec"},{id:"plan",label:"\uACC4\uD68D \uB9AC\uBDF0",receipt:null,receipt_stage:"plan",fill_stage:"plan",stale_stage:"plan",hue:"plan"},{id:"impl",label:"\uAD6C\uD604",receipt:null,receipt_stage:null,fill_stage:"impl",stale_stage:null,hue:"impl"},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review",receipt_stage:null,fill_stage:null,stale_stage:"impl",hue:"impl"},{id:"pr",label:"PR",receipt:null,receipt_stage:null,fill_stage:"pr",stale_stage:null,hue:"pr"}],Ol={quick_fix:["impl","impl_review"],spec_backed:["spec","impl","impl_review","pr"],full_plan:["spec","plan","impl","impl_review","pr"]},$p={missing:"\uC2B9\uC778 \uD544\uC694",stale:"\uC7AC\uC2B9\uC778 \uD544\uC694",unknown:"\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"},Gb={pin:"pin",global:"global",base:"base"};function Kb(e){return c`<span
    class=${`detail-layer-rail detail-layer-rail--${Gb[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function Yb(e,t,n){switch(e){case"workflow_mode":return Io;case"spec_review_model":case"impl_review_model":return Mo;case"plan_review_model":return Xs;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return Qs;case"spec_review_speed":case"plan_review_speed":case"impl_review_speed":return oo;case"impl_dispatch":return gu;case"impl_runtime":return Vs;case"impl_model":return so(n,t.impl_runtime);case"impl_effort":return io(n,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return oo;case"orchestration_model":return Po(n,null);case"orchestration_effort":return io(n,void 0,t.orchestration_model||wn).filter(r=>r!==wn);default:return[]}}function Vb(e,t){return c`<div class="detail-effective__row" data-key=${e.key}>
    ${Kb(e.source)}
    <span class="detail-effective__k"
      >${cr[e.key]||e.key}</span
    >
    <span
      class=${`detail-effective__v${e.source==="base"?" detail-effective__v--dim":""}`}
      title=${e.full_value||""}
      >${e.display}</span
    >
    <span
      class=${`detail-effective__badge detail-effective__badge--${e.source}`}
      >${Zs[e.source]}</span
    >
    ${t.expanded?c`<select
          class="detail-effective__edit"
          data-edit-key=${e.key}
          aria-label=${`${cr[e.key]||e.key} \uD3B8\uC9D1`}
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
  </div>`}function xp(e,t){let n=La.flatMap(a=>a.keys),r=Ia(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=xu(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=Object.fromEntries(r.map(a=>[a.key,a])),i=Object.fromEntries(r.filter(a=>a.value!==null).map(a=>[a.key,a.value])),l=r.filter(a=>a.full_value&&a.display!==a.full_value).map(a=>a.full_value).join(" \xB7 ");return c`<details
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
        >${Xb(s)}</span
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
          ${La.map(a=>c`
              <div class="detail-effective__subhead">${a.label}</div>
              ${r.filter(u=>a.keys.includes(u.key)).map(u=>{let d=Hs({key:u.key,choices:Yb(u.key,i,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return Vb(u,{expanded:e.expanded,options:d.options,default_label:d.unset_label,default_full_value:d.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="실행 프리셋"
              .value=${_r(e.preset_id)}
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
  </details>`}function Xb(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let n=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${n}`)}for(let n of["impl_model","impl_effort","impl_speed"])e[n]?.resolution!=="not_applicable"&&t.push(e[n]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function Qb(e){if(!e||typeof e!="object")return null;let{kind:t,actor:n,effort:r,sha:o}=e;return typeof t!="string"||typeof n!="string"||typeof o!="string"?null:{kind:t,actor:n,effort:typeof r=="string"?r:null,sha:o}}function Ap(e,t={}){let n=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},o=r.stages||{},s=r.route||n.route||null,i=typeof n.pr_url=="string"?n.pr_url:"",l=typeof n.exec_receipt=="string"?n.exec_receipt:"",a=Qb(r.exec_receipt),u=a?Hn(a):l,d=a?`${a.kind}:${a.actor}`:l.split("@")[0],p=Ws(r.planned_execution,r.exec_receipt),h=r.chips?.pr?.number,m=typeof h=="number"?`PR #${h}`:"PR",v=No(n),O=v!==null&&t.isChipOpen?.("rec")===!0,B=O?Ha({rec:v},"rec"):null;return c`<section class="detail-summary" data-seam="detail-summary">
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
      ${v?c`<button
            type="button"
            class="detail-summary__chip detail-summary__chip--rec judgement-chip"
            data-chip-key="rec"
            data-state=${v.state}
            aria-expanded=${O?"true":"false"}
            title=${ti(v)}
            @click=${()=>t.onChipToggle?.("rec")}
          >
            ${"\uBCF5\uC7A1"}
          </button>`:""}
    </div>
    ${B?no(B):""}
    <div
      class="detail-summary__gates"
      role="group"
      aria-label="워크플로 게이트"
    >
      ${Zb(s).map(V=>Jb(V,n,o,{label:V.id==="pr"?m:V.label,href:V.id==="pr"?i:""}))}
    </div>
  </section>`}function Zb(e){let n=typeof e=="string"&&Object.hasOwn(Ol,e)&&Ol[e]||Ol.spec_backed;return Hb.filter(r=>n.includes(r.id))}var Wi={on:"\uD1B5\uACFC",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",current:"\uC9C4\uD589 \uC911",none:"\uBBF8\uB3C4\uB2EC"};function Jb(e,t,n,r){let o=ey(e,t,n),s=e.fill_stage?n[e.fill_stage]:null,i=typeof s?.fill=="string"?s.fill:null,l=i?i==="full":o.length>0,a=!l&&i==="dim",u=e.stale_stage?n[e.stale_stage]?.stale===!0:!1,d=o&&o.split("@")[1]?.slice(0,7)||"",p=u?Wi.stale:l?Wi.on:a?Wi.current:Wi.none,h=ty(e,n),m=`${r.label} \xB7 ${p}${h?` \xB7 ${h}`:""}${o?` \xB7 ${o}`:""}`,v=`detail-summary__gate${l?" detail-summary__gate--on":""}${a?" detail-summary__gate--current":""}${u?" detail-summary__gate--stale":""}${d?" detail-summary__gate--receipt":""}`,O=c`<span class="detail-summary__gate-label"
      >${r.label}</span
    >
    <span class="detail-summary__gate-rail"></span>
    <span class="detail-summary__gate-sha">${d}</span>`;return r.href?c`<a
      class=${v}
      data-gate=${e.id}
      data-hue=${e.hue}
      href=${r.href}
      target="_blank"
      rel="noreferrer"
      title=${m}
      >${O}</a
    >`:c`<span
    class=${v}
    data-gate=${e.id}
    data-hue=${e.hue}
    title=${m}
    >${O}</span
  >`}function ey(e,t,n){if(e.receipt&&typeof t[e.receipt]=="string")return String(t[e.receipt]);if(e.receipt_stage){let r=n[e.receipt_stage]?.receipt;return typeof r=="string"?r:""}return""}function ty(e,t){if(e.id!=="plan")return"";let n=t.plan?.approval_state;return typeof n=="string"&&Object.hasOwn($p,n)?$p[n]:""}function zi(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Sp(e){return zi(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function Ep(e,t){let n=e&&e[t];if(!zi(n)||!Array.isArray(n.accounts))return null;let r=n.accounts.filter(Sp),o=Sp(n.active)?n.active:null;return{accounts:r,active:o||r.find(s=>s.active===!0)||null}}function Rp(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function Hi(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${Rp(e)}${t}`}function bo(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${Rp(e)}`}function ny(e,t,n){if(n!==null){let o=e==="claude"?Hi:bo,s=t?t.accounts.find(i=>i.key===n):void 0;return`\uB808\uD3EC \uAE30\uBCF8\uAC12 \uC0AC\uC6A9(${s?o(s):n})`}return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:bo({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function Tp(e,t){if(!zi(e)||e.state!=="usable"||!zi(e.values))return null;let n=e.values[t];return typeof n=="string"&&n.length>0?n:null}function Cp(e){let t=e.provider_key==="claude"?Hi:bo,n=!!e.provider?.accounts.some(r=>r.key===e.selected);return c`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${r=>e.handlers.onExecChange(e.key,r.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${ny(e.provider_key,e.provider,e.workspace_default)}
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
  </div>`}function Op({md:e,catalog:t,workspace_defaults:n=null,handlers:r}){let o=typeof e.claude_account=="string"?e.claude_account:"",s=typeof e.codex_account=="string"?e.codex_account:"";return c`<section class="exec-accounts" data-exec-accounts>
    <div class="detail-section-label">실행 계정</div>
    <div class="exec-settings-core">
      ${Cp({key:"claude_account",title:"Claude \uACC4\uC815",provider_key:"claude",provider:Ep(t,"claude"),selected:o,workspace_default:Tp(n,"claude_account"),handlers:r,hint:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uB7F0\uD0C0\uC784\uC774 claude\uC77C \uB54C \uC801\uC6A9\uB429\uB2C8\uB2E4"})}
      ${Cp({key:"codex_account",title:"Codex \uACC4\uC815",provider_key:"codex",provider:Ep(t,"codex"),selected:s,workspace_default:Tp(n,"codex_account"),handlers:r})}
    </div>
  </section>`}function ry(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function oy(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let n=t[1].trim();return{front:n.length>0?n:null,body:e.slice(t[0].length)}}function Gi(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),o=null,s="loading",i="",l=null,a="";function u(O){O.key==="Escape"&&o&&(O.preventDefault(),m())}document.addEventListener("keydown",u);function d(){return o?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>m()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${o}
              >${ry(o)}</span
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
                        >`}${fr(i)}`}
          </div>
        </div>
      </div>
    `:c``}function p(){ot(d(),e)}async function h(O,B={}){o=O,s="loading",i="",l=null,a="",p();let V=B.workspace||(n?n():"");if(!V){s="error",a="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",p();return}if(!r){s="error",a="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",p();return}let ae="/api/doc?workspace="+encodeURIComponent(V)+"&path="+encodeURIComponent(O);try{let F=await r(ae),q=await F.json().catch(()=>({}));if(!F.ok||!q||q.ok!==!0){if(q?.error==="not_found"&&B.missing_state==="plan_pending"){s="pending",a="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",p();return}s="error",a="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(q&&q.error||F.status)+")",p();return}let L=oy(String(q.content||""));l=L.front,i=L.body,s="ready",p()}catch{s="error",a="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",p()}}function m(){o=null,ot(c``,e)}function v(){document.removeEventListener("keydown",u),m()}return{open:h,close:m,destroy:v}}var sy=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],Mp="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Ki=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],iy=new Set(["codex-runner","Explore","Plan","advisor","advisor-xhigh","claude-code-guide","statusline-setup"]);function Lp(e){return typeof e=="string"&&iy.has(e)}var ay=["running","done","failed","interrupted"],ly={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function cy(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function uy(e){let t=Jt(e);if(t.length>0)return t.map(o=>c`<span class="detail-usage-total" title=${o.tooltip}
          >${o.label}</span
        >`);let n=eo(e);if(!n||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${n.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${Mp}
          >부분 집계</span
        >`:""}`}function Ip(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function Ml(e){if(typeof e=="number")return fs(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?fs(t):""}function dy(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function Pp(e,t,n){if(e.provider!=="claude"){let o=e.session_id?` \xB7 thread ${e.session_id}`:"",s=n?" \xB7 \uC774\uC804 \uB77C\uC6B4\uB4DC \uC2A4\uB808\uB4DC \uC774\uC5B4\uAC10":"";return{text:`${n?"\u21A9 ":""}${e.launch_id}`,title:`${e.launch_id}${o}${s}`}}let r=t&&typeof t.agent_id=="string"?t.agent_id:"";return r.length>0?{text:r.slice(0,8),title:r}:{text:e.launch_id.slice(-8),title:e.launch_id}}function Ll(e){return e===null||typeof e=="string"&&e.trim().length>0}function Il(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function py(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,n=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!Ki.some(r=>r.role===t.role&&r.provider===t.provider)||!(n?Ll(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||Ll(t.effort))||!(!("agent_type"in t)||Ll(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!ay.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:n?!Il(t.started_at)||!Il(t.last_event_at)||!Il(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function fy(e,t,n,r){let s=Jt({providers:{[t]:{subtotal:n.subtotal,breakdown:n.usage,...n.replayed?{replayed:!0}:{}}},roles:{}})[0],i=Pp({provider:t,launch_id:n.receipt_id,session_id:typeof n.session_id=="string"?n.session_id:void 0},n,r);return c`<div class="detail-session__leg detail-session__usage-detail">
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${[n.provider,n.model,n.effort].filter(Boolean).join(" \xB7 ")}</span
    >
    <span
      class="detail-session__leg-sid detail-session__sid"
      title=${i.title}
      >${i.text}</span
    >
    ${Ml(n.completed_at)?c`<span class="detail-session__leg-time detail-session__time"
          >${Ml(n.completed_at)}</span
        >`:""}
    ${s?c`<span class="detail-session__usage" title=${s.tooltip}
          >${s.label}</span
        >`:""}
  </div>`}function _y(e,t,n,r,o){let s=e.status==="running"?null:t,l=(s?Jt({providers:{[e.provider]:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],a=e.status==="running"?fs(e.last_event_at):s?Ml(s.completed_at):"",u=(e.provider==="claude"?["Claude",e.agent_type,dy(e.model),e.effort]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),d=Pp(e,s,o);return c`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>r.onOpenDelegation&&r.onOpenDelegation(n,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${ly[e.status]}</span
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
    ${a?c`<span class="detail-session__leg-time detail-session__time"
          >${a}</span
        >`:""}
    ${l?c`<span class="detail-session__usage" title=${l.tooltip}
          >${l.label}</span
        >`:""}
  </button>`}function my(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}function gy(e,t,n){let r=[],o=new Set,s=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let p of s){let h=py(p);!h||o.has(h.launch_id)||Lp(h.agent_type)||(o.add(h.launch_id),r.push(h))}r.sort((p,h)=>(p.started_at||0)-(h.started_at||0));let i={};for(let{role:p,provider:h}of Ki){let m=t?t.roles[p]?.[h]:null;i[p]=m?[...m.legs]:[]}let l=Ki.flatMap(({role:p})=>i[p]),a=new Set,u=new Set,d=[];for(let{role:p,provider:h}of Ki){for(let m of r.filter(v=>v.role===p&&v.provider===h)){let v=l.find(B=>B.receipt_id===m.launch_id)||null;if(v&&!my(m,v))continue;v&&a.add(v.receipt_id);let O=h==="codex"&&u.has(m.session_id);d.push(_y(m,v,e.attempt_id,n,O)),h==="codex"&&u.add(m.session_id)}for(let m of i[p])if(!a.has(m.receipt_id)&&!Lp(m.agent_type)){let v=typeof m.session_id=="string"&&m.session_id.length>0?m.session_id:null,O=h==="codex"&&v!==null&&u.has(v);d.push(fy(p,h,m,O)),h==="codex"&&v!==null&&u.add(v)}}return d}function hy(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[...sy,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return c`<div class="detail-session__usage-detail">
    ${r.map(o=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${o.label}</span
          ><span class="detail-session__usage-value"
            >${cy(e[o.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${n===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${n.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${Mp}</span>`:""}
  </div>`}var by={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function fs(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function yy(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,r])=>typeof r=="string"&&r.length>0).map(([r,o])=>`${r}=${o}`).join(" \xB7 "):"",n=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${n}</span>
    ${t?c`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}var vy={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function wy(e,t){let n=vy[e.locality]||"",r=e.locality==="remote"?`${e.host} \xB7 \uB2E4\uB978 \uBA38\uC2E0`:e.locality==="missing"?`${e.host} \xB7 \uD30C\uC77C \uC5C6\uC74C`:e.host;return c`<div class="detail-session-row">
    <button
      type="button"
      class="detail-session detail-session--session"
      data-session-key=${$a(e)}
      ?disabled=${n.length>0}
      title=${n}
      @click=${()=>{n.length===0&&t.onOpenSessionRef&&t.onOpenSessionRef(e)}}
    >
      <span class="detail-session__glyph">${e.current?"\u25D0":"\xB7"}</span>
      <span class="detail-session__id">${Oo(e)}</span>
      <span class="detail-session__meta">${r}</span>
      <span class="detail-session__sid" title=${e.session_id}
        >${e.session_id.slice(0,8)}</span
      >
      <span class="detail-session__time">${fs(e.last_event_at)}</span>
    </button>
    ${e.resume_command?c`<button
          type="button"
          class="op-btn detail-session__resume-cmd"
          title=${e.resume_command}
          @click=${o=>{o.stopPropagation(),t.onCopyResumeCommand&&e.resume_command&&t.onCopyResumeCommand(e.resume_command)}}
        >
          ⧉ 재개
        </button>`:""}
  </div>`}function Dp(e,t={},n={},r=[]){let o=Array.isArray(e)?e:[],s=Array.isArray(r)?r:[],i=[...s.filter(m=>m&&m.current===!0),...s.filter(m=>m&&m.current!==!0).sort((m,v)=>v.index-m.index)],l=i.map(m=>wy(m,t)),a=n.expanded||new Set;if(o.length===0&&i.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let u=new Set;for(let m of o)m&&typeof m.resumed_from=="string"&&m.resumed_from.length>0&&u.add(m.resumed_from);let d=m=>{if(!(m.status==="failed"||m.status==="orphaned"))return"";let O=typeof m.session_id=="string"&&m.session_id.length>0,B=u.has(m.attempt_id),V=O&&!B,ae=O?B?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="op-btn detail-session__resume"
      data-attempt-id=${m.attempt_id}
      ?disabled=${!V}
      title=${ae}
      @click=${F=>{F.stopPropagation(),V&&t.onResume&&t.onResume(m.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},p=m=>{if(!(m.status==="failed"||m.status==="orphaned")||typeof m.cause!="string"||m.cause==="")return"";let O=m.cause_detail,B=O&&typeof O.reason=="string"&&O.reason.length>0?typeof O.command=="string"&&O.command.length>0?`${O.reason} \xB7 ${O.command}`:O.reason:m.cause;return c`<div class="detail-session__cause" title=${B}>
      ${m.cause}
    </div>`},h=m=>{let v=Ip(Ea(m));if(Jt(v).length===0&&!eo(m.usage))return"";let O=a.has(m.attempt_id);return c`<button
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
      세션 이력${uy(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${l}${o.map(m=>{let v=Ea(m),O=Ip(v),B=Jt(O);return c`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${m.status||"unknown"}"
            data-attempt-id=${m.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(m.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${by[m.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${m.attempt_id}</span>
            ${Ro(m)?c`<span
                  class="detail-session__resumed"
                  title=${Ro(m)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${bn(m)}</span>
            ${B.length>0?c`<span class="detail-session__role">orchestrator</span>`:""}
            ${m.session_id?c`<span class="detail-session__sid" title=${m.session_id}
                  >${String(m.session_id).slice(0,8)}</span
                >`:""}
            ${B.length>0?B.map(V=>c`<span
                      class="detail-session__usage"
                      title=${V.tooltip}
                      >${V.label}</span
                    >`):eo(m.usage)?c`<span class="detail-session__usage"
                    >${eo(m.usage)}</span
                  >`:""}
            <span class="detail-session__time">${fs(m.started_at)}</span>
          </button>
          ${h(m)} ${d(m)} ${p(m)} ${yy(m)}
          ${a.has(m.attempt_id)&&m.usage?hy(m.usage,m.runner==="codex"?"codex":"claude"):""}
          ${gy(m,v,t)}
        </div>`})}
    </div>
  `}function Np(e,t={}){return c`
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
          ${ky(e)}
        </div>`:""}
  `}function ky(e){let t=go(e);if(t)return t;let n=e.data;if(!n)return"";if(n.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof n.default_task_prompt=="string"?er("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=Bi(n.recorded_at);return c`<div class="detail-prompt__meta">
      ${n.attempt_id}${r?` \xB7 ${r}`:""}
    </div>
    ${typeof n.task_prompt=="string"?er("\uACFC\uC5C5 (user)",n.task_prompt):""}
    ${typeof n.system_prompt=="string"?er("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",n.system_prompt):""}`}var Pr=10;function qp(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}function jp(e,t={}){let r=(Array.isArray(e?.events)?e.events:[]).filter(l=>l&&typeof l.summary=="string"&&l.summary.trim().length>0);if(r.length===0)return"";let o=typeof e.shown=="number"&&e.shown>0?e.shown:Pr,s=r.slice(0,o),i=r.length-s.length;return c`
    <div class="detail-section-label">Worker 이력 (${r.length})</div>
    <ol class="detail-timeline" data-seam="worker-timeline">
      ${s.map(l=>c`<li class="detail-timeline__row">
            ${qp(l.at)?c`<span class="detail-timeline__at"
                  >${qp(l.at)}</span
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
  `}var $y=["open","in_progress","deferred","resolved","closed"],xy=[0,1,2,3,4];function Fp(e,t){let n=t.issueStores,r=t.onClose,o=t.transport,s=t.onNavigate,i=t.queueStore,l=t.execPresetStore,a=t.sessionLogStore,u=null,d=null,p={},h="",m=!1,v=[],O=!1,B=!1,V={},ae={claude:null,codex:null},F=null,q=null,L=0,M=!1,W=!1,K="",H="",D="",G="",X=!1;function J(){M=!1,W=!1,K="",H="",D="",G="",X=!1}function fe(){ae={claude:null,codex:null},F=null,q=null,L+=1}async function Ce(){if(!o)return null;try{let _=await Promise.resolve(o("get-workspace-accounts",{}));return _&&typeof _.state=="string"?_:null}catch{return null}}async function U(_){try{let T=await fetch(_);if(!T.ok)return null;let N=await T.json();if(!N||typeof N!="object"||!Array.isArray(N.accounts))return null;let ke=N.accounts.filter(ze=>ze!==null&&typeof ze=="object"&&!Array.isArray(ze));return{accounts:ke,active:ke.find(ze=>ze.active===!0)||null}}catch{return null}}async function te(_){q=_;let T=++L,[N,ke,ze]=await Promise.all([U("/api/claude-usage"),U("/api/codex-usage"),Ce()]);T!==L||_!==u||(ae={claude:N,codex:ke},F=ze,et())}let xe=[],Ee=null,R=null,re=!1,ve="",ye=!1,Oe=0,_e=new Set;function Le(){xe=[],Ee=null,R=null,re=!1,ve="",ye=!1,Oe+=1,_e.clear()}async function Ve(_){if(!o)return;let T=++Oe;try{let N=await Promise.resolve(o("get-comments",{id:_}));if(T!==Oe||_!==u)return;xe=Array.isArray(N)?N:[],re=!1}catch{if(T!==Oe||_!==u)return;re=!0}et()}function Ye(){if(!o||!u)return;let _=d&&typeof d.comment_count=="number"?d.comment_count:null;if(Ee!==u){Ee=u,R=_,Ve(u);return}_!==null&&_!==R&&(R=_,Ve(u))}function P(_){_e.has(_)?_e.delete(_):_e.add(_),et()}function pe(_){let T=ve.trim().length===0;ve=_,T!==(_.trim().length===0)&&et()}async function ne(){let _=ve.trim();if(!o||!u||_.length===0||ye)return;let T=u;ye=!0,et();let N=!1;try{let ke=await Promise.resolve(o("add-comment",{id:T,text:_}));Array.isArray(ke)&&ke.length>0&&(N=!0,T===u&&(xe=ke,re=!1,ve="",R=ke.length))}catch{N=!1}N||he("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),T===u&&(ye=!1),et()}let me={onToggle:P,onDraftInput:pe,onSubmit:ne},Te=t.mdViewer||null,ge=null;Te||(ge=document.createElement("div"),ge.className="md-viewer-root",document.body.appendChild(ge));let Me=Te||Gi(ge,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),We=document.createElement("div");We.className="session-log-root",document.body.appendChild(We);let Ze=ho(We,{transport:o?(_,T)=>Promise.resolve(o(_,T)):void 0,sessionLogStore:a}),qe=!1,z=!1,Y=!1,Ne=null,lt=null,Ue=0;function Re(_){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${_}`}function $(){qe=!1,z=!1,Y=!1,Ne=null,lt=null,Ue+=1}async function Z(_){if(!o)return;let T=++Ue;z=!0,Y=!1,et();try{let N=await Promise.resolve(o("get-bead-prompt",{bead_id:_}));if(T!==Ue)return;!N||typeof N!="object"||Array.isArray(N)?Y=!0:(Ne=N,lt=Re(_))}catch{T===Ue&&(Y=!0)}finally{T===Ue&&(z=!1,et())}}let Se=[],Ie=null,Ge=0;function tt(_,T){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${_}::${T}`}function ct(){Se=[],Ie=null,Ge+=1}async function Tt(_,T){if(!o)return;let N=++Ge,ke;try{ke=await Promise.resolve(o("get-session-refs",{bead_id:_}))}catch{ke=null}N!==Ge||T!==Ie||(Se=ke&&Array.isArray(ke.sessions)?ke.sessions:[],et())}function Dt(){if(!o||!u)return;let _=d&&d.metadata,T=_&&typeof _=="object"&&typeof _.session_ref=="string"?_.session_ref:null;if(T===null){ct();return}let N=tt(u,T);Ie!==N&&(Se=[],Ie=N,Tt(u,N))}let ft=[],gt=[],mt=Pr,Rt=null,bt=0;function ue(_){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${_}`}function se(){ft=[],gt=[],mt=Pr,Rt=null,bt+=1}async function A(_,T){if(!o)return;let N=++bt,ke;try{ke=await Promise.resolve(o("get-bead-timeline",{bead_id:_}))}catch{ke=null}N!==bt||T!==Rt||(ft=ke&&Array.isArray(ke.events)?ke.events:[],gt=ke&&Array.isArray(ke.attempts)?ke.attempts:[],mt=Pr,et())}function j(){if(!o||!u)return;let _=ue(u);Rt!==_&&(ft=[],gt=[],mt=Pr,Rt=_,A(u,_))}function oe(){mt+=Pr,et()}function ie(){if(qe=!qe,qe&&u&&lt!==Re(u)){Ne=null,Z(u);return}et()}function ce(){let _={};for(let N of gt)N&&typeof N=="object"&&N.bead_id===u&&(_[String(N.attempt_id)]=N);let T=i?i.get():null;for(let N of T&&T.attempts?Object.values(T.attempts):[]){let ke=N;ke&&ke.bead_id===u&&(_[String(ke.attempt_id)]=ke)}return _}function Pe(){return u?Object.values(ce()).sort((T,N)=>(N.started_at||0)-(T.started_at||0)).map(T=>({attempt_id:T.attempt_id,bead_id:T.bead_id,status:T.status,started_at:typeof T.started_at=="number"?T.started_at:null,runner:T.runner||null,model:T.model||null,effort:T.effort||T.observed_effort||null,speed:T.speed||null,session_id:T.session_id||null,resumed_from:T.resumed_from||null,continuation_mode:T.continuation_mode||null,dismissed_at:typeof T.dismissed_at=="number"?T.dismissed_at:null,cause:typeof T.cause=="string"?T.cause:null,cause_detail:T.cause_detail||null,exec_default_preset_id:typeof T.exec_default_preset_id=="string"?T.exec_default_preset_id:null,exec_default_preset_revision:typeof T.exec_default_preset_revision=="number"?T.exec_default_preset_revision:null,exec_values:T.exec_values&&typeof T.exec_values=="object"?T.exec_values:null,usage:T.usage||null,usage_legs:Array.isArray(T.usage_legs)?T.usage_legs:[],delegation_sessions:Array.isArray(T.delegation_sessions)?T.delegation_sessions:[]})):[]}function Je(){return u?Kn(ce(),u):null}let Xe=new Set;function je(_){Xe.has(_)?Xe.delete(_):Xe.add(_),et()}function vt(_){let T=i?i.get():null,N=T&&T.attempts?T.attempts[_]:null;Ze.open({attempt_id:_,meta:N?{runner:N.runner||void 0,model:N.model||void 0,effort:N.effort||void 0,status:N.status||void 0,session_id:N.session_id||void 0}:{}})}function Ot(_,T){let N=i?i.get():null,ke=N&&N.attempts?N.attempts[_]:null,it=(ke&&Array.isArray(ke.delegation_sessions)?ke.delegation_sessions:[]).find(qt=>qt&&typeof qt=="object"&&qt.launch_id===T);it&&Ze.open({attempt_id:_,launch_id:T,meta:{runner:it.provider==="claude"?"claude":"codex",role:it.role,...typeof it.agent_type=="string"?{agent_type:it.agent_type}:{},model:it.model,effort:it.effort,session_id:it.session_id,status:it.status}})}async function ht(_){if(!o||!_)return;let T=o,N=()=>{let ze=i?i.get():null;return ze&&typeof ze.revision=="number"?ze.revision:0},ke=i?.get()?.attempts?.[_]||null;await Qr({context:{bead_id:ke?.bead_id||u||"",kind:"session",tuple:ke?bn(ke):""},transport:ze=>T("worker-attempt-resume",{attempt_id:_,expected_revision:N(),...ze}),adopt:ze=>{ze?.queue&&i?.set&&i.set(ze.queue)}})}async function Vt(_,T){if(!o||!_)return;let N=o,ke=()=>{let Ke=i?i.get():null;return{bead_id:_,...T==="parallel"?{}:{lane:T},expected_revision:Ke&&typeof Ke.revision=="number"?Ke.revision:0}},ze=Ke=>{Ke?.queue&&i?.set&&i.set(Ke.queue)},it=await Promise.resolve(N("worker-queue-place",ke()));if(ze(it),it&&it.conflict&&(it=await Promise.resolve(N("worker-queue-place",ke())),ze(it)),et(),!it)return;if(it.applied===!1&&typeof it.admission_reason=="string"){he(`\uB300\uAE30 \uC801\uC7AC \uAC70\uBD80: ${it.admission_reason}`,"error",2400);return}if(it.reason==="rejected"){he("\uB300\uAE30 \uC801\uC7AC \uAC70\uBD80: rejected","error",2400);return}if(it.applied===!1)return;let qt=it.queue?Fo({id:_},it.queue).location:null;qt&&"index"in qt&&he(`${Uu(qt.lane)} \uB300\uAE30 #${qt.index+1}\uC5D0 \uCD94\uAC00`,"success",2400)}function jt(_,T){if(T){B=!0,et();return}Vt(_,"parallel")}function St(_,T){let ze=(_.target?.closest?.(".worker-card__place-lane")||null)?.dataset.lane;ze&&(ze!=="parallel"&&!/^s[1-5]$/.test(ze)||(B=!1,et(),Vt(T,ze)))}function zt(_){!_||!u||Ze.open(Zr(_,u,d&&d.status))}let ut={onOpen:vt,onOpenDelegation:Ot,onResume:ht,onToggleUsage:je,onOpenSessionRef:zt,onCopyResumeCommand:Q};function Bt(){let _=i?i.get():null,T={...V};for(let N of["orchestration_model","orchestration_effort","orchestration_speed"]){let ke=_&&_[N];typeof ke=="string"&&(T[N]=ke)}return T}async function Xt(){if(o){try{let _=await Promise.resolve(o("get-session-defaults",{}));V=_&&_.values&&typeof _.values=="object"?_.values:{}}catch{V={}}et()}}function Nt(){let _=i?i.get():null;return _&&_.runner_catalog||null}function rn(){let _=i?i.get():null;return _&&typeof _.execution_defaults=="object"?_.execution_defaults:null}function en(){let _=d?.metadata&&typeof d.metadata=="object"?d.metadata:{},N=yn({pin:{..._,...p},global:Bt(),execution_defaults:rn(),runner_catalog:Nt(),route:typeof _.route=="string"?_.route:null}).orchestration_model.value||"";return Sn(Nt(),N)}function Ft(){let _=l?l.get():null;return!_||typeof _.revision!="number"?null:{revision:_.revision,presets:Array.isArray(_.presets)?_.presets:[]}}function dn(_){return _?.compatible===!1}function tn(_){l&&_&&typeof _.revision=="number"&&Array.isArray(_.presets)&&l.set({revision:_.revision,presets:_.presets})}async function $e(){let _=Ft(),T=_?.presets.find(N=>N.id===h);if(!(!o||!u||!_||!T||dn(T)||m)){m=!0,v=[],et();try{let N=await Promise.resolve(o("apply-impl-preset",Su(u,T.id,_.revision)));if(N&&N.conflict){tn(N),he("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let ke=N&&Array.isArray(N.issue)?N.issue[0]:N?.issue;if(N&&N.applied&&ke&&typeof ke=="object"){d=ke,v=Array.isArray(N.skipped_orchestration_keys)?N.skipped_orchestration_keys.filter(ze=>typeof ze=="string"):[];for(let ze of Eu)delete p[ze];he(v.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}N&&N.error==="bd_readback_failed"?he("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):he("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(N){N&&typeof N=="object"&&N.code==="bd_readback_failed"?he("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):he("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{m=!1,et()}}}let E=null;n&&n.subscribe&&(E=n.subscribe(()=>S()));let be=null;i&&typeof i.subscribe=="function"&&(be=i.subscribe(()=>{u&&et()}));let De=null,b=null;function y(){b&&(b(),b=null)}l&&typeof l.subscribe=="function"&&(De=l.subscribe(()=>{u&&et()}));function f(_){_.key==="Escape"&&u&&(_.preventDefault(),r())}document.addEventListener("keydown",f);let g=to(()=>et());g.attach();function S(){if(u){if(n&&typeof n.snapshotFor=="function"){let _=n.snapshotFor("detail:"+u)||[];d=_.find(N=>N&&N.id===u)||_[0]||d}Ye(),Dt(),j(),et()}}function Q(_){sn(_).then(T=>{T?he("\uBCF5\uC0AC\uB428","success",1200):he("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function ee(_){_.preventDefault(),_.stopPropagation(),u&&Q(u)}function de(_,T){_.preventDefault(),_.stopPropagation(),Q(T)}function rt(_,T,N){_.preventDefault(),_.stopPropagation(),Me.open(T,{missing_state:N})}async function dt(_,T){let N=Object.hasOwn(p,_),ke=p[_];if(p[_]=T,et(),!(!o||!u))try{let ze=await Promise.resolve(o("update-exec-settings",Au(u,_,T.length===0?null:T))),it=Array.isArray(ze)?ze[0]:ze;if(!it||typeof it!="object"||!it.id)throw new Error("exec settings readback failed");d=it,delete p[_],et()}catch(ze){throw N?p[_]=ke:delete p[_],et(),he("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error"),ze}}function at(_){_.catch(()=>{})}async function $t(_,T){let N=d||{},ke=N.metadata&&typeof N.metadata=="object"?N.metadata:{},ze={};for(let Ke of["impl_runtime","impl_model","impl_effort"])ze[Ke]=Object.hasOwn(p,Ke)?p[Ke]:typeof ke[Ke]=="string"?ke[Ke]:"";ze[_]=T;let it=Ru(ze,Nt(),en()),qt={};for(let Ke of["impl_runtime","impl_model","impl_effort"])qt[Ke]=p[Ke],p[Ke]=it[Ke]||"";if(et(),!(!o||!u))return Promise.resolve(o("update-impl-target",{id:u,...it,orchestration_runtime:en()})).then(Ke=>{let xt=Array.isArray(Ke)?Ke[0]:Ke;if(!xt||typeof xt!="object"||!xt.id)throw new Error("implementation target readback failed");d=xt;for(let Nn of["impl_runtime","impl_model","impl_effort"])delete p[Nn];et()}).catch(Ke=>{for(let xt of["impl_runtime","impl_model","impl_effort"])qt[xt]===void 0?delete p[xt]:p[xt]=qt[xt];throw et(),he("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error"),Ke})}async function x(_,T,N){if(!o||!u)return!1;try{let ke=await Promise.resolve(o(_,T)),ze=Array.isArray(ke)?ke[0]:ke;return ze&&typeof ze=="object"&&ze.id?(d=ze,!0):(he(N,"error"),!1)}catch(ke){return ke&&typeof ke=="object"&&ke.code==="bd_readback_failed"?(he("\uC800\uC7A5\uB410\uC73C\uB098 \uD655\uC778 \uC2E4\uD328 \u2014 \uACE7 \uAC31\uC2E0\uB429\uB2C8\uB2E4","error"),{ok:!1,saved:!0}):(he(N,"error"),!1)}}function C(_){setTimeout(()=>{try{let T=e.querySelector(_);T&&typeof T.focus=="function"&&T.focus()}catch{}},0)}function we(){M=!0,K=d&&d.title||"",et(),C('.detail-edit__input[data-edit="title"]')}function Fe(_){K=_.target.value}function nt(){M=!1,K="",et()}function _t(){x("edit-text",{id:u,field:"title",value:K},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(T=>{T===!0&&(M=!1,K=""),et()})}function Lt(){W=!0,H=d&&d.description||"",et(),C('.detail-edit__textarea[data-edit="description"]')}function yo(_){H=_.target.value}function mn(){W=!1,H="",et()}function tr(){x("edit-text",{id:u,field:"description",value:H},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(T=>{T===!0&&(W=!1,H=""),et()})}function nr(_,T,N,ke){if(_.key==="Escape"){_.stopPropagation(),N();return}_.key==="Enter"&&(!ke||_.ctrlKey||_.metaKey)&&(_.preventDefault(),T())}function k(_){let T=_.target.value;x("update-status",{id:u,status:T},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>et())}function w(_){let T=Number(_.target.value);x("update-priority",{id:u,priority:T},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>et())}function I(_){D=_.target.value}function le(){let _=D.trim();_.length!==0&&x("label-add",{id:u,label:_},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(T=>{T===!0&&(D=""),et()})}function Ae(_){if(_.key==="Escape"){_.stopPropagation(),D="",et();return}_.key==="Enter"&&(_.preventDefault(),le())}function Be(_){x("label-remove",{id:u,label:_},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>et())}let Qe={onCopyPath:de,onOpenDoc:rt};function wt(_){return typeof _=="string"?_:_&&typeof _=="object"?String(_.id||_.to||_.issue_id||_.depends_on||""):""}function Ut(_){return _&&typeof _=="object"?String(_.dependency_type||_.type||""):""}function Qt(_){switch(_){case"discovered-from":return{glyph:"\u21A9 ",relation:"\uBC1C\uACAC"};case"parent-child":return{glyph:"\u2338 ",relation:"\uC0C1\uC704"};case"related":return{glyph:"\u2194 ",relation:"\uAD00\uB828"};default:return _.length>0?{glyph:`${_} `,relation:_}:{glyph:"",relation:""}}}function gn(_,T){let N=In(T),ke=[];return _.length>0&&ke.push(_),N&&ke.push(N),ke.length>0?ke.join(`
`):void 0}function In(_){if(!_||typeof _!="object")return;let T=typeof _.status=="string"?_.status:"",N=typeof _.title=="string"?_.title:"";return T.length>0&&N.length>0?`${T} \xB7 ${N}`:void 0}function yr(){return(t.getWorkspacePath&&t.getWorkspacePath()||"").trim()}function Mn(){return t.depCandidates?t.depCandidates():null}async function Pn(_,T,N){let ke=yr(),ze=u;if(!ze)return;if(ke.length===0){he("\uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}let it=await x(_,{a:ze,b:T,view_id:ze,root_dir:ke},N),qt=it===!0||it!==!1&&it.saved===!0;qt&&t.onDepChanged&&t.onDepChanged({type:_,a:ze,b:T}),_==="dep-add"&&qt&&(G="",X=!1),et()}function Un(_){if(!u)return;let T=globalThis.confirm;typeof T=="function"&&!T(`${_}\uAC00 ${u}\uB97C \uB9C9\uB294 \uC5F0\uACB0\uC744 \uB04A\uC744\uAE4C\uC694?`)||Pn("dep-remove",_,"\uC758\uC874 \uD574\uC81C \uC2E4\uD328")}function Gt(_){_.disabled||Pn("dep-add",_.bead_id,"\uC758\uC874 \uCD94\uAC00 \uC2E4\uD328")}function rr(_){G=_.target.value,X=!0,et()}function vr(){X||(X=!0,et())}function or(_,T){if(_.key==="Escape"){_.stopPropagation(),G="",X=!1,et();return}_.key==="Enter"&&(_.preventDefault(),T.length===1&&!T[0].disabled&&Gt(T[0]))}function xn(_){return c`<div class="detail-dep-add">
      <input
        class="detail-dep-add__input"
        aria-label="막는 이슈 추가"
        placeholder="막는 이슈 추가"
        .value=${G}
        @focus=${vr}
        @input=${rr}
        @keydown=${T=>or(T,_)}
      />
      ${X||G.length>0?c`<div class="detail-dep-add__list">
            ${_.length===0?c`<div class="detail-dep-add__empty">후보 없음</div>`:_.map(T=>c`<button
                      type="button"
                      class="detail-dep-add__cand"
                      data-dep-cand=${T.bead_id}
                      ?disabled=${T.disabled}
                      title=${nn(T.reason)}
                      @click=${()=>Gt(T)}
                    >
                      <span class="detail-dep-add__repo"
                        >${T.workspace_name}</span
                      >
                      <span class="detail-dep-add__id"
                        >${T.bead_id}</span
                      >
                      <span class="detail-dep-add__title"
                        >${T.title}</span
                      >
                    </button>`)}
          </div>`:""}
    </div>`}function Dn(_,T){let N=T.get(_.id),ke=s?c`<button
          type="button"
          class="detail-dep__link"
          title=${nn(_.title)}
          @click=${()=>N===void 0?s(_.id):s(_.id,N)}
        >
          ${_.label}
        </button>`:c`<span class="detail-dep__link" title=${nn(_.title)}
          >${_.label}</span
        >`;return c`<span
      class=${`detail-dep detail-dep--${_.kind}${s?" detail-dep--link":""}`}
      >${ke}${_.kind==="pred"?c`<button
            type="button"
            class="detail-dep__unlink"
            data-dep-b=${_.id}
            aria-label=${"\uC758\uC874 \uD574\uC81C: "+_.id}
            @click=${()=>Un(_.id)}
          >
            ✕
          </button>`:""}</span
    >`}function He(_){let T=Array.isArray(_.dependencies)?_.dependencies:[],N=Array.isArray(_.dependents)?_.dependents:[],ke=[];for(let Ke of T){let xt=wt(Ke);xt.length>0&&Ut(Ke)==="blocks"&&ke.push({id:xt,label:`\u26D3 ${xt}`,kind:"pred",title:gn("\uB9C9\uB294",Ke)})}for(let Ke of N){let xt=wt(Ke);xt.length>0&&Ut(Ke)==="blocks"&&ke.push({id:xt,label:`\u2192 ${xt}`,kind:"succ",title:gn("\uB9C9\uD788\uB294",Ke)})}for(let Ke of T){let xt=wt(Ke),Nn=Ut(Ke);if(xt.length>0&&Nn!=="blocks"){let jr=Qt(Nn);ke.push({id:xt,label:`${jr.glyph}${xt}`,kind:"other",title:gn(jr.relation,Ke)})}}let ze=Mn(),it=new Map;if(ze)for(let Ke of ze.issues)it.has(Ke.bead_id)||it.set(Ke.bead_id,Ke.root_dir);let qt=ze&&u?Md(Id(u,ze),G):[];return c`
      <div class="detail-section-label">의존성</div>
      ${ke.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${ke.map(Ke=>Dn(Ke,it))}
          </div>`}
      ${ze===null?c`<div class="detail-empty">후보를 불러올 수 없음</div>`:xn(qt)}
    `}function It(_){let T=_.metadata||{},N=_.workflow||{},ke=N.stages||{},ze=ke.spec&&ke.spec.stale,it=ke.impl&&ke.impl.stale,qt=N.quick_fix_review?.state==="stale",Ke=ke.plan||null,xt=N.route_source==="derived",Nn=N.route||T.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${xt?" detail-kv__v--derived":""}"
          title=${xt?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${xt?"unset":Nn}</span
        >
      </div>
      ${N.route!=="quick_fix"||Object.hasOwn(T,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${T.spec_review||"\uC5C6\uC74C"}${ze?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${N.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Ke?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Ke?.approval_receipt||"\uC5C6\uC74C"}${Ke?.approval_state==="stale"?" \xB7 stale":Ke?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${N.route!=="quick_fix"||Object.hasOwn(T,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${T.impl_review||"\uC5C6\uC74C"}${it?" \xB7 stale":""}</span
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
      ${N.route==="quick_fix"||Object.hasOwn(T,"quick_fix_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">quick_fix_review</span>
            <span class="detail-kv__v"
              >${T.quick_fix_review||"\uC5C6\uC74C"}${qt?" \xB7 stale":""}</span
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
              >${Hn(N.exec_receipt)}</span
            >
          </div>`:""}
      ${N.impl_entry?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${N.impl_entry.actor}@${N.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${T.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${T.pr_url}</span>
          </div>`:""}
    `}let hn={route:["quick_fix","spec_backed","full_plan"]};async function bs(_,T){let N=T.target.value;if(_==="route"&&d&&d.metadata&&d.metadata.route==="full_plan"&&N!=="full_plan"&&!window.confirm(`full_plan \u2192 ${N||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){et();return}await x("update-workflow-meta",{id:u,key:_,value:N},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),et()}function ys(_){let T=_.metadata||{};return c` ${((ke,ze)=>{let it=hn[ke],qt=typeof T[ke]=="string"?T[ke]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${ke}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${ke}
          data-edit=${`wfmeta-${ke}`}
          @change=${Ke=>bs(ke,Ke)}
        >
          <option value="" ?selected=${!it.includes(qt)}>
            ${ze}
          </option>
          ${it.map(Ke=>c`<option value=${Ke} ?selected=${qt===Ke}>${Ke}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function vs(_,T){return M?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${K}
            @input=${Fe}
            @keydown=${N=>nr(N,_t,nt,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${_t}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${nt}
            >
              취소
            </button>
          </div>
        </div>
      `:c`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${_}</h2>
        ${Jt(T).map(N=>c`<span class="detail-usage-total" title=${N.tooltip}
              >${N.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${we}
        >
          ✎
        </button>
      </div>
    `}function ws(_){let T=Kt(_.created_at),N=Kt(_.updated_at);return!T&&!N?c``:c`
      ${T?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${T}</span>
          </div>`:""}
      ${N?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${N}</span>
          </div>`:""}
    `}function qr(_,T){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${k}
        >
          ${$y.map(N=>c`<option value=${N} ?selected=${N===_}>${N}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${w}
        >
          ${xy.map(N=>c`<option value=${String(N)} ?selected=${N===T}>
                P${N}
              </option>`)}
        </select>
      </div>
    `}function vo(_){return c`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${W?"":c`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${Lt}
            >
              ✎
            </button>`}
      </div>
      ${W?c`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${H}
              @input=${yo}
              @keydown=${T=>nr(T,tr,mn,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${tr}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${mn}
              >
                취소
              </button>
            </div>
          </div>`:c`<div class="detail-overlay__desc">
            ${_||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function ks(_){let T=typeof _.notes=="string"?_.notes:"";return T.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${T}</div>
    `}function $s(_){let T=Array.isArray(_.labels)?_.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${T.map(N=>c`<span class="detail-label-chip"
              >${N}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${N}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+N}
                @click=${()=>Be(N)}
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
            @input=${I}
            @keydown=${Ae}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${le}
          >
            추가
          </button>
        </span>
      </div>
    `}function wo(){if(!u)return c``;let _=d||{},T=String(_.id||u),N=_.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",ke=Je(),ze=_.status||"open",it=typeof _.priority=="number"?Math.max(0,Math.min(4,_.priority)):"",qt=_.description||"",Ke=i?i.get():null,xt=Ke&&ze!=="closed"?Fo({..._,id:T},Ke):null,Nn=Ke?Bo(Ke):null,jr={..._,metadata:{..._.metadata||{},...p}};return c`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${()=>r()}></div>
        <div class="detail-overlay__panel">
          <div class="detail-overlay__bar">
            <button
              type="button"
              class="detail-overlay__id"
              title="ID 복사"
              @click=${ee}
            >
              ${T}
            </button>
            ${xt?c`<button
                  type="button"
                  class="op-btn op-btn--primary detail-overlay__place"
                  data-bead-id=${T}
                  ?disabled=${!xt.placeable}
                  title=${si(xt)}
                  @click=${()=>jt(T,Nn)}
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
          ${xt&&B&&Nn?c`<div
                class="place-menu detail-overlay__place-menu"
                @click=${Zt=>St(Zt,T)}
              >
                ${za(Nn,T)}
                <button
                  type="button"
                  class="op-btn op-btn--icon worker-card__place-cancel"
                  data-bead-id=${T}
                  title="레인 선택 취소"
                  aria-label="레인 선택 취소"
                  @click=${()=>{B=!1,et()}}
                >
                  ✕
                </button>
              </div>`:""}
          ${vs(N,ke)}
          ${Ap(jr,{onChipToggle:Zt=>g.toggle({bead_id:T,chip_key:Zt}),isChipOpen:Zt=>g.isOpen({bead_id:T,chip_key:Zt})})}
          ${xp({metadata:jr.metadata,workspace_values:Bt(),catalog:Nt(),execution_defaults:rn(),expanded:O,presets:Ft()?.presets||[],preset_id:h,preset_busy:m,skipped_orchestration_keys:v},{onToggle:Zt=>{O=Zt,et()},onEdit:(Zt,xs)=>{if(Zt==="impl_runtime"||Zt==="impl_model"||Zt==="impl_effort"){at($t(Zt,xs??""));return}at(dt(Zt,xs??""))},onPresetSelect:Zt=>{h=Zt,v=[],et()},onPresetApply:()=>{$e()}})}
          ${Op({md:jr.metadata,catalog:ae,workspace_defaults:F,handlers:{onExecChange:(Zt,xs)=>at(dt(Zt,xs))}})}
          ${qr(ze,it)} ${ws(_)}
          ${vo(qt)}
          ${vp(xe,me,{expanded:_e,draft:ve,sending:ye,error:re})}
          ${ks(_)} ${$s(_)} ${He(_)}
          ${It(_)} ${ys(_)}
          ${hp(_,Qe)}
          ${Np({expanded:qe,loading:z,error:Y,data:Ne},{onToggle:ie})}
          ${Dp(Pe(),ut,{total:ke,expanded:Xe},Se)}
          ${jp({events:ft,shown:mt},{onMore:oe})}
        </div>
      </div>
    `}function et(){ot(wo(),e)}return{load(_){_!==u&&(p={},B=!1,h="",v=[],O=!1,J(),Le(),$(),ct(),se(),fe()),u=_,d=null,!b&&t.subscribeCandidates&&(b=t.subscribeCandidates(()=>{u&&et()})),S(),Xt(),q!==_&&te(_)},clear(){u=null,d=null,p={},B=!1,h="",m=!1,v=[],O=!1,J(),Le(),$(),ct(),se(),fe(),y(),Me.close(),Ze.close(),ot(c``,e)},destroy(){E&&(E(),E=null),be&&(be(),be=null),De&&(De(),De=null),y(),document.removeEventListener("keydown",f),g.detach(),Te||(Me.destroy(),ge&&ge.parentNode&&ge.parentNode.removeChild(ge)),Ze.destroy(),We.parentNode&&We.parentNode.removeChild(We),u=null,d=null,fe(),h="",m=!1,v=[],Le(),$(),ct(),se(),ot(c``,e)}}}function Bp(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),o=t.querySelector("#fatal-error-detail"),s=t.querySelector("#fatal-error-reload"),i=t.querySelector("#fatal-error-close"),l=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},a=(u,d,p="")=>{n&&(n.textContent=u||"Unexpected Error"),r&&(r.textContent=d||"An unrecoverable error occurred.");let h=typeof p=="string"?p.trim():"";if(o&&(h.length>0?(o.textContent=h,o.removeAttribute("hidden")):(o.textContent="No additional diagnostics available.",o.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return s&&s.addEventListener("click",()=>{window.location.reload()}),i&&i.addEventListener("click",()=>l()),t.addEventListener("cancel",u=>{u.preventDefault(),l()}),{open:a,close:l,getElement(){return t}}}var Ay="(max-width: 640px)";function Yi(e){if(typeof window.matchMedia!="function")return e(!1),()=>{};let t=window.matchMedia(Ay),n=!!t.matches;e(n);let r=o=>{let i=!!(typeof o=="object"&&o!==null&&typeof o.matches=="boolean"?o.matches:t.matches);i!==n&&(n=i,e(i))};return typeof t.addEventListener=="function"?(t.addEventListener("change",r),()=>{t.removeEventListener("change",r)}):typeof t.addListener=="function"?(t.addListener(r),()=>{typeof t.removeListener=="function"&&t.removeListener(r)}):()=>{}}function Sy(){return{lanes:{done:!0},areas:{}}}function _s(e){let t={};if(typeof e!="object"||e===null)return t;for(let[n,r]of Object.entries(e))typeof r=="boolean"&&(t[n]=r);return t}function Ey(e){try{let t=window.localStorage.getItem(e);if(!t)return null;let n=JSON.parse(t);if(typeof n!="object"||n===null)return null;let r=n;return typeof r.lanes=="object"&&r.lanes!==null?{lanes:_s(r.lanes),areas:_s(r.areas)}:{lanes:_s(r),areas:{}}}catch{return null}}function Up(e,t){try{window.localStorage.setItem(e,JSON.stringify(t))}catch{}}function Vi(e,t=Sy()){let n={lanes:_s(t.lanes),areas:_s(t.areas)},r=Ey(e),o={lanes:{...n.lanes,...r?r.lanes:{}},areas:{...n.areas,...r?r.areas:{}}};return{isCollapsed(s){return o.lanes[s]===!0},isAreaCollapsed(s){return o.areas[s]===!0},toggle(s){let i=o.lanes[s]!==!0;return o={...o,lanes:{...o.lanes,[s]:i}},Up(e,o),i},toggleArea(s){let i=o.areas[s]!==!0;return o={...o,areas:{...o.areas,[s]:i}},Up(e,o),i}}}function Pl(e){if(typeof e=="string"&&e.length>0)return e;if(e&&typeof e=="object"){let t=e;if(typeof t.message=="string"&&t.message.length>0)return t.message;if(typeof t.error=="string"&&t.error.length>0)return t.error;if(t.error&&typeof t.error=="object"&&typeof t.error.message=="string")return t.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}function Xi(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"&&t.length>0):[]}function Qi(e){let{transport:t,console_el:n,getLanes:r,getWorkspaces:o,getCrossLanes:s,reproject:i,onCorrection:l,showToast:a,requestRender:u,adoptQueue:d,onDragBegin:p,candidate_drop:h}=e,m=[],v=null,O=!1,B=null,V=null,ae=null;function F(){B!==null&&clearTimeout(B),B=setTimeout(()=>{B=null,O=!1},0)}function q(){return s()??null}function L(){let P=new Map,pe=o();for(let ne of Array.isArray(pe)?pe:[]){if(!ne||typeof ne!="object")continue;let me=ne.bead_blocked_by&&typeof ne.bead_blocked_by=="object"?ne.bead_blocked_by:{};for(let[Te,ge]of Object.entries(me))Array.isArray(ge)&&P.set(Te,Xi(ge));for(let Te of[...Array.isArray(ne.runnable)?ne.runnable:[],...Array.isArray(ne.session_active)?ne.session_active:[]])Te&&typeof Te.bead_id=="string"&&Array.isArray(Te.blocked_by)&&Te.blocked_by.length>0&&P.set(Te.bead_id,Xi(Te.blocked_by))}return P}function M(){let P=new Map,pe=new Map,ne=o();for(let me of Array.isArray(ne)?ne:[]){if(!me||typeof me!="object")continue;let Te=me.bead_blocked_by&&typeof me.bead_blocked_by=="object"?me.bead_blocked_by:{};for(let[ge,Me]of Object.entries(Te))Array.isArray(Me)&&P.set(ge,Xi(Me));for(let ge of Array.isArray(me.runnable)?me.runnable:[])ge&&typeof ge.bead_id=="string"&&Array.isArray(ge.blocked_by)&&pe.set(ge.bead_id,Xi(ge.blocked_by))}for(let me of m)for(let Te of[P,pe]){let ge=Te.get(me.a);ge!==void 0&&Te.set(me.a,me.type==="dep-remove"?ge.filter(Me=>Me!==me.b):ge.includes(me.b)?ge:[...ge,me.b])}return{snapshot:P,runnable:pe}}function W(){let P=L();for(let pe of m){let ne=(P.get(pe.a)||[]).slice();pe.type==="dep-remove"?P.set(pe.a,ne.filter(me=>me!==pe.b)):ne.includes(pe.b)||P.set(pe.a,[...ne,pe.b])}return P}function K(P=r(),pe=q()){let ne=new Map;for(let qe of Array.isArray(pe?.lanes)?pe.lanes:[]){let z=new Map;for(let Y of Array.isArray(qe?.entries)?qe.entries:[])Y&&typeof Y.bead_id=="string"&&z.set(Y.bead_id,Y.dep_created_by_lane===!0);ne.set(typeof qe?.id=="string"?qe.id:"",z)}let me=new Map,Te=new Map,ge=new Set,Me=new Set;for(let qe of P.chain_lanes){let z=ne.get(qe.lane_id);me.set(qe.lane_id,{status:qe.status,entries:qe.rows.map((Y,Ne)=>({bead_id:Y.id,root_dir:Y.root_dir,...Ne===0?{}:{dep_created_by_lane:z?.get(Y.id)===!0}}))});for(let Y of qe.rows)Te.set(Y.id,qe.lane_id),Y.fixed&&ge.add(Y.id),Y.unplaced||Me.add(Y.id)}let We=new Map;for(let qe of P.parallel_rows)typeof qe.queue_index=="number"&&We.set(qe.id,qe.queue_index);for(let qe of P.queue_groups)for(let z of qe.sublanes.serial)for(let Y of z.items)typeof Y.queue_index=="number"&&We.set(Y.id,Y.queue_index);let Ze=M();return{blocked_by_map:W(),snapshot_blocked_by:Ze.snapshot,runnable_blocked_by:Ze.runnable,owner_of:new Map(Object.entries(P.owner_of)),cross_lanes:me,owner_lane_of:Te,fixed_members:ge,placed_members:Me,parallel_rows:P.parallel_rows.map(qe=>({bead_id:qe.id,root_dir:qe.root_dir,queue_index:qe.queue_index??0})),parallel_raw_length:new Map(Object.entries(P.parallel_raw_length)),queue_index_of:We}}function H(P,pe){let ne=r();for(let Te of[...ne.runnable,...ne.queue,...ne.running,...ne.pr_wait,...ne.done])if(!(Te.non_occupying||Te.id!==pe)){if(Te.root_dir===P)return Te.expected_revision;break}let me=ne.queue_groups.find(Te=>Te.root_dir===P);return me?me.revision:0}async function D(P,pe,ne,me){if(!t)return null;let ge=await t(P,{...pe,...ne?{root_dir:ne}:{},expected_revision:me});if(ge&&ge.conflict){ge.queue&&d?.(ne,ge.queue);let Me=ge.queue&&typeof ge.queue.revision=="number"?ge.queue.revision:me;ge=await t(P,{...pe,...ne?{root_dir:ne}:{},expected_revision:Me})}return ge&&ge.queue&&d?.(ne,ge.queue),ge}async function G(P,pe,ne,me,Te){try{let ge=await D(P,pe,ne,me.get(ne)??H(ne,Te.bead_id));return!ge||typeof ge.applied!="boolean"?(a("\uD050 \uC694\uCCAD\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error"),null):(ge.queue&&typeof ge.queue.revision=="number"&&me.set(ne,ge.queue.revision),ge.conflict?(a("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null):ge.applied===!1?(a(ge.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${ge.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null):ge.queue&&typeof ge.queue.revision=="number"?ge.queue.revision:me.get(ne)??0)}catch(ge){return a(Pl(ge),"error"),null}}async function X(P,pe,ne=new Map){if(P.type==="worker-queue-disarm"){try{let me=await D(P.type,P.payload,P.root_dir,ne.get(P.root_dir)??H(P.root_dir,pe));me&&me.queue&&typeof me.queue.revision=="number"&&ne.set(P.root_dir,me.queue.revision)}catch{}return!0}if(P.type==="worker-queue-place"||P.type==="worker-queue-reorder"||P.type==="worker-queue-remove")return await G(P.type,P.payload,P.root_dir,ne,{bead_id:pe})!==null;try{return(P.type==="dep-add"||P.type==="dep-remove")&&t&&await t(P.type,{a:P.a,b:P.b,...P.root_dir?{root_dir:P.root_dir}:{}}),!0}catch(me){return a(Pl(me),"error"),!1}}function J(P){(P.type==="dep-add"||P.type==="dep-remove")&&(m=[...m,{type:P.type,a:P.a,b:P.b}])}async function fe(P,pe){if(!t)return{ok:!1};try{let ne=await t(P.type,{...P.payload,expected_revision:pe});return!ne||typeof ne.revision!="number"?(a("\uC5F0\uACB0 \uB808\uC778 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{ok:!1}):{ok:!0,revision:ne.revision}}catch(ne){let me=ne,Te=me&&me.code==="conflict"?me.details?.cross_lanes:null;return Te&&typeof Te.revision=="number"&&Array.isArray(Te.lanes)?{ok:!1,conflict:Te}:(a(Pl(ne),"error"),{ok:!1})}}async function Ce(P,pe,ne){let me=new Map,Te=[],ge=P.ops.slice(0,P.lane_op_index),Me=P.ops.slice(P.lane_op_index);for(let Ze of ge){if(!await X(Ze,ne,me))return{done:!0};J(Ze)}let We=pe;for(let Ze of P.lane_ops){if(We===null)return a("\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{done:!0};let qe=await fe(Ze,We);if(!qe.ok)return qe.conflict?{done:!1,conflict:qe.conflict}:{done:!0};We=qe.revision}for(let Ze of Me){if(!await X(Ze,ne,me))return{done:!0};J(Ze),Ze.type==="dep-add"&&Te.push(Ze)}for(let Ze of Od(Te))We=await U(Ze,We);return{done:!0}}async function U(P,pe){if(pe===null||!t)return pe;let ne=P.pairs,me=pe;for(let Te=0;Te<2;Te+=1){if(ne.length===0)return me;try{let ge=await t("monitor-lane-provenance",{lane_id:P.lane_id,pairs:ne.map(Me=>({bead_id:Me.bead_id,after:Me.after,value:!0})),expected_revision:me});return ge&&typeof ge.revision=="number"?ge.revision:me}catch(ge){let Me=ge,We=Me&&Me.code==="conflict"?Me.details?.cross_lanes:null;if(!We||typeof We.revision!="number"||!Array.isArray(We.lanes))return me;let Ze=We.lanes.find(qe=>qe&&qe.id===P.lane_id);ne=Ld(Array.isArray(Ze?.entries)?Ze.entries:[],ne),me=We.revision}}return me}async function te(P,pe,ne=[]){m=ne,l("",0);let me=r(),Te=q();for(let ge=0;;ge+=1){let Me=P(K(me,Te));if("refused"in Me){a(Me.refused,"error");break}let We=await Ce(Me,me.cross_lanes_revision,pe);if(We.done){Me.correction&&l(Me.correction.lane_id,Me.correction.corrected);break}if(ge>=1){a("\uB808\uC778\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4","error");break}let Ze=i(We.conflict);me=Ze.lanes,Te=Ze.raw_lanes}m=[],u()}async function xe(P,pe){await te(ne=>Ci(P,pe,ne),P.bead_id)}function Ee(P,pe){let ne=pe&&typeof pe.closest=="function"?pe.closest("[data-row-index]"):null;if(ne&&P.contains(ne)){let me=Number(ne.getAttribute("data-row-index"));return Number.isFinite(me)?me:0}return P.querySelectorAll("[data-row-index]").length}function R(P){let pe=typeof P?.closest=="function"?P.closest(".worker-pane--collapsed[data-lane]"):null;if(!pe)return null;let ne=pe.getAttribute("data-lane");return ne==="queue"?{zone:pe,target:{kind:"parallel",marker_index:r().parallel_rows.length}}:ne==="candidate"&&h===!0?{zone:pe,target:{kind:"candidate"}}:null}function re(P){let pe=P.target;if(!v)return null;let ne=typeof pe?.closest=="function"?pe.closest("[data-drop]"):null;if(!ne)return R(pe);let me=ne.getAttribute("data-drop");if(me==="candidate")return{zone:ne,target:{kind:"candidate"}};if(me==="parallel")return{zone:ne,target:{kind:"parallel",marker_index:Ee(ne,pe)}};if(me==="chain")return{zone:ne,target:{kind:"chain",lane_id:ne.getAttribute("data-lane-id")||"",marker_index:Ee(ne,pe)}};if(me==="repo-serial"){let Te=ne.getAttribute("data-root-dir")||"";if(Te!==v.root_dir)return null;let ge=typeof pe?.closest=="function"?pe.closest("[data-queue-index]"):null,Me=ge&&ne.contains(ge)?ge.getAttribute("data-queue-index"):ne.getAttribute("data-lane-length"),We=Number(Me);return{zone:ne,target:{kind:"repo-serial",root_dir:Te,lane_id:ne.getAttribute("data-lane-id")||"",index:Number.isFinite(We)?We:0}}}return null}function ve(){for(let P of Array.from(n.querySelectorAll(".is-drop-over")))P.classList.remove("is-drop-over")}function ye(P){V=P.target instanceof Element?P.target:null}function Oe(P){let pe=P.target,ne=typeof pe?.closest=="function"?pe.closest('[draggable="true"][data-bead-id]'):null,me=ne?ne.closest("[data-drag-kind]"):null;if(!me)return;if(ne&&V&&ne.contains(V)&&typeof V.closest=="function"&&V.closest("input, button, a")){P.preventDefault();return}let Te=me.getAttribute("data-bead-id")||"",ge=me.getAttribute("data-drag-kind")||"",Me=me.getAttribute("data-root-dir")||"";if(!Te||!ge)return;let We=me.getAttribute("data-queue-index")||"",Ze=Number(We),qe=me.getAttribute("data-lane-id")||"";v={kind:ge,bead_id:Te,root_dir:Me,...We!==""&&Number.isFinite(Ze)?{queue_index:Ze}:{},...qe?{lane_id:qe}:{}},O=!0,p?.(),n.classList.add("is-dragging");try{P.dataTransfer?.setData("text/plain",Te),P.dataTransfer&&(P.dataTransfer.effectAllowed="move")}catch{}}function _e(P){let pe=re(P);pe&&(P.preventDefault(),P.dataTransfer&&(P.dataTransfer.dropEffect="move"),pe.zone.classList.add("is-drop-over"))}function Le(P){let pe=P.target;typeof pe?.closest=="function"&&(pe.closest("[data-drop]")?.classList.remove("is-drop-over"),pe.closest(".worker-pane--collapsed")?.classList.remove("is-drop-over"))}function Ve(){v=null,ve(),n.classList.remove("is-dragging"),F()}function Ye(P){let pe=re(P),ne=v;v=null,ve(),n.classList.remove("is-dragging"),!(!pe||!ne)&&(P.preventDefault(),xe(ne,pe.target))}return{attach(P){ae||(ae=P,P.addEventListener("pointerdown",ye),P.addEventListener("dragstart",Oe),P.addEventListener("dragover",_e),P.addEventListener("dragleave",Le),P.addEventListener("drop",Ye),P.addEventListener("dragend",Ve))},detach(){B!==null&&(clearTimeout(B),B=null);let P=ae;ae=null,P&&(P.removeEventListener("pointerdown",ye),P.removeEventListener("dragstart",Oe),P.removeEventListener("dragover",_e),P.removeEventListener("dragleave",Le),P.removeEventListener("drop",Ye),P.removeEventListener("dragend",Ve))},isDragging(){return v!==null},consumeClickSuppression(){let P=O;return O=!1,P},applyDrop:xe,runPlanned:te,dropModel:K,sendOp:X,sendQueueCas:G,rememberDep:J}}var Dl=Object.freeze({repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",manual_target_missing:"\uC218\uB3D9 \uBC30\uD3EC \uAE30\uB85D\uC5D0 \uD540\uB41C \uB300\uC0C1 SHA\uAC00 \uC5C6\uC5B4 \uC2E4\uD589\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",bootstrap_not_approved:"\uCCAB [deploy] \uC120\uC5B8\uC740 \uC0AC\uB78C \uC2B9\uC778 \uC5C6\uC774 \uC2E4\uD589\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. Worker \uC124\uC815\uC758 [\uBC30\uD3EC \uC2E4\uD589]\uC73C\uB85C \uC6D0\uACA9 base tip\uC744 \uD55C \uBC88 \uBC30\uD3EC\uD55C \uB4A4 [\uC815\uC0B0 \uC7AC\uAC1C]\uB97C \uB204\uB974\uC138\uC694 \u2014 \uADF8 \uB4A4 \uBA38\uC9C0\uBD80\uD130\uB294 \uC790\uB3D9 \uBC30\uD3EC\uB429\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_red:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",cleanup_failed:"\uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uAC00 \uB05D\uB098\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",retry_exhausted:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB97C \uBAA8\uB450 \uC4F0\uACE0\uB3C4 \uAC19\uC740 \uC2E4\uD328\uAC00 \uC774\uC5B4\uC84C\uC2B5\uB2C8\uB2E4.",conflict_unresolved:"\uCDA9\uB3CC \uD574\uC18C\uAC00 \uB05D\uB098\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",internal_record_failed:"Worker \uB0B4\uBD80 \uAE30\uB85D\uC774 \uC2E4\uD328\uD574 \uC9C4\uD589\uC744 \uBA48\uCDC4\uC2B5\uB2C8\uB2E4.",foreign_landing_unpinned:"\uB2E4\uB978 \uC800\uC7A5\uC18C \uCC29\uC9C0\uC778\uB370 foreign_repo\xB7foreign_path\xB7foreign_base \uD540\uC774 \uC5C6\uAC70\uB098 \uD615\uC2DD\uC774 \uD2C0\uB9BD\uB2C8\uB2E4.",foreign_checkout_unavailable:"\uD540\uB41C \uB300\uC0C1 \uC800\uC7A5\uC18C \uCCB4\uD06C\uC544\uC6C3\uC774 \uC5C6\uAC70\uB098 foreign_repo\uC640 \uAC19\uC740 URL\uC758 remote\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",foreign_deploy_unsupported:"\uB300\uC0C1 \uC800\uC7A5\uC18C\uAC00 [deploy]\uB97C \uC120\uC5B8\uD574 Worker\uAC00 \uBC30\uD3EC \uC99D\uAC70\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uC138\uC158\uC774 \uBC30\uD3EC\uC640 \uB9C8\uAC10\uC744 \uC18C\uC720\uD569\uB2C8\uB2E4.",repair_lane_retired:"\uC790\uB3D9 \uC218\uB9AC \uB808\uC778\uC774 \uC740\uD1F4\uD574 \uC0AC\uB78C \uCC98\uB9AC\uB85C \uB118\uC5B4\uC654\uC2B5\uB2C8\uB2E4."});var Wp={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",job_script_failure:"\uC7A1 \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428",quickfix_landing_failed:"\uCC29\uC9C0 \uC2E4\uD328",runner_exit:"\uC138\uC158 \uC2E4\uD328",session_parked:"\uC138\uC158 \uB300\uAE30",session_ended_unresolved:"\uC138\uC158 \uC885\uB8CC",prerequisite_unmet:"\uC120\uD589 \uB300\uAE30",delivery_unproven:"\uCC29\uC9C0 \uC99D\uAC70 \uBD80\uC871"};function Ji(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function Zi(e){for(let t of Ji(e)){if(Object.hasOwn(Wp,t))return Wp[t];if(t.startsWith("session_"))return"\uC138\uC158 \uC2E4\uD328"}return null}function Hp(e){return Ji(e).length===0?null:Zi(e)||"\uC2E4\uD328"}function Dr(e){let t=null;for(let n of Ji(e))Object.hasOwn(Dl,n)&&(t=Dl[n]);return t}function mr(e){let t=Zi(e),n=Dr(e);return t&&n?`${t} \u2014 ${n}`:t||n?t||n:typeof e=="string"?e:""}function Gp(e,t){let n=Zi(e)??Zi(t),r=Dr(t)??Dr(e);return n&&r?`${n} \u2014 ${r}`:n||r?n||r:typeof t=="string"?t:""}var Ty=new Set(["repo_operation_timeout_unresolved"]);function Cy(e){for(let t of Ji(e))if(Ty.has(t)||t.startsWith("repo_ops_"))return!0;return!1}function Ry(e,t){return t.code==="interrupted"||t.interrupted===!0||e.failure_kind==="interrupted_without_terminal_exit"||t.code==="interrupted_without_terminal_exit"}function Kp(e,t){if(!e||typeof e!="object")return"";let n=e.failure;if(!n||typeof n!="object"||Cy(n.code))return"";if(n.code==="timeout"){let o=Number(t);return Number.isFinite(o)&&o>0?`\uD0C0\uC784\uC544\uC6C3 ${Math.round(o/1e3)}\uCD08 \uCD08\uACFC`:"\uD0C0\uC784\uC544\uC6C3 \uCD08\uACFC"}if(Ry(e,n))return"\uC885\uB8CC \uAE30\uB85D \uC5C6\uC74C \u2014 \uC911\uB2E8\uB428";let r=typeof e.elapsed_ms=="number"&&Number.isFinite(e.elapsed_ms)&&e.elapsed_ms>=0?` \xB7 ${Or(e.elapsed_ms)}`:"";return typeof e.signal=="string"&&e.signal.length>0?`signal ${e.signal}${r}`:Number.isInteger(e.exit_code)?`exit ${e.exit_code}${r}`:""}var zp={schema_unsupported:"\uD540\uB41C \uC815\uCC45 \uC2A4\uD0A4\uB9C8\uB97C \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."};function Yp(e){if(!e||typeof e!="object")return"";let t=e.retry;if(!t||typeof t!="object")return"";if(typeof t.blocked_reason=="string"&&t.blocked_reason)return`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uBABB \uD568 \u2014 ${Object.hasOwn(zp,t.blocked_reason)?zp[t.blocked_reason]:t.blocked_reason}`;if(t.status==="absorbed"){let n=t.absorbed&&typeof t.absorbed=="object"?t.absorbed:null,r=mr(n?.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428 \u2014 \uCCAB \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428"}if(e.state!=="failed")return"";if(t.status==="not_applicable")return"\uC7AC\uC2DC\uB3C4 \uB300\uC0C1 \uC544\uB2D8 \u2014 \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804 \uC2E4\uD328";if(t.status==="consumed"){let n=typeof t.first_fingerprint=="string"&&t.first_fingerprint?t.first_fingerprint:null;if(n===null)return"";if(n===e.failure?.fingerprint)return"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uAC19\uC740 \uC2E4\uD328";let r=mr(t.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328"}return""}function Oy(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}var Vp=200;function Ly(e){return typeof e!="string"||e.length===0?"":e.length>Vp?`${e.slice(0,Vp)}\u2026`:e}function Iy(e){let t=e&&e.attempts>0&&e.max>0?` ${e.attempts}/${e.max}`:"",n=e&&typeof e.next_at=="number"?` \xB7 ${new Date(e.next_at).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}`:"";return`\u21BB \uC7AC\uC2DC\uB3C4 \uB300\uAE30${t}${n}`}function Qp(e){if(!e)return"";let t=Array.isArray(e.timeline)?e.timeline:[],n=typeof e.log_path=="string"?e.log_path:"",r=e.log_expired===!0,o=e.log_unreadable===!0;return t.length===0&&n.length===0&&!r&&!o?"":c`${t.length>0?c`<ol class="rtile__history" data-seam="tile-timeline">
        ${t.map(s=>c`<li class="rtile__history-row">
              ${Xp(s.at)?c`<span class="rtile__history-at"
                    >${Xp(s.at)}</span
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
            ${lo(n)}
          </p>`:""}`}function Xp(e){return typeof e!="number"||!Number.isFinite(e)?"":new Date(e).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}function My(e,t){if(!e||e.open!==!0)return"";let n=Dr(e.cause)||mr(e.cause),r=e.retry&&e.retry.attempts>0?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 ${e.retry.attempts}\uD68C \u2014 \uAC19\uC740 \uC624\uB958`:"",o=e.cause_detail,s=e.quickfix_lane&&e.quickfix_landing?e.quickfix_landing:null,i=s?[s.cursor||null,typeof s.head_sha=="string"?s.head_sha.slice(0,7):null,s.reason||null].filter(Boolean).join(" \xB7 "):"",l=typeof e.finished_at=="number"?`${new Date(e.finished_at).toLocaleString("ko-KR")} \xB7 ${on(e.finished_at,t)}`:"",a=[e.runner,e.model,e.observed_effort??e.effort,e.speed].filter(h=>typeof h=="string"&&h.length>0).join(" \xB7 "),u=e.usage?.total_cost_usd,d=typeof u=="number"&&Number.isFinite(u)?`$${u.toFixed(2)}`:"",p=Qp(e);return c`<div
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
  </div>`}function Py(e){return!e||!e.repo&&!e.serial_lane_id?"":c`${e.repo?c`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?c`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`}var Dy=new Set(["codex-runner"]);function Ny(e,t,n,r=null){if(!e)return"";let o=e.last_activity||null,s=o&&typeof o.text=="string"?o.text:"",i=o&&typeof o.at=="number"?o.at:null,l=(r||!Array.isArray(e.legs)?[]:e.legs).filter(m=>m&&!(typeof m.agent_type=="string"&&Dy.has(m.agent_type))),a=l.filter(m=>m&&m.state==="live"),u=l.filter(m=>m&&m.state!=="live"),d=r&&typeof r.last_event_at=="number"?on(r.last_event_at,t):"",p=r?on(r.updated_at,t):"",h=d?`\uCD5C\uADFC \uD65C\uB3D9 ${d}`:p?`\uAC31\uC2E0 ${p}`:"";return c`${s?c`<div class="rtile__activity${n?" is-paused":""}">
        <span class="rtile__activity-dot" aria-hidden="true"></span>
        <span class="rtile__activity-text">${s}</span>
        ${i!==null?c`<span class="rtile__activity-age"
              >${on(i,t)}</span
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
      </div>`:""}`}var qy={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function jy(e){if(!e)return"";let t=qy[e.locality]||"";return c`<button
    type="button"
    class="rtile__session"
    ?disabled=${t.length>0}
    title=${t||"\uB77C\uC774\uBE0C \uC138\uC158 \uC5F4\uAE30"}
    aria-label="라이브 세션 열기"
  >
    ▤ 세션
  </button>`}function Fy(e,t,n,r=""){if(e==="retry_wait")return n?c`<div class="rtile__foot">${n}</div>`:"";let o=Ly(t?.summary);if(e==="waiting")return c`${o?c`<p class="rtile__held-summary">${o}</p>`:""}${r}
      <div class="rtile__foot">${n}</div>`;let s=Qp(t);return c`${o?c`<p class="rtile__held-summary">${o}</p>`:""}${s}
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
    </div>`}function Nl(e,t,n=null,r={}){let o=e.kind==="session",s=o&&Array.isArray(e.session_refs)&&e.session_refs.find(ne=>ne&&ne.current===!0)||null,i=e.failed===!0,l=i&&e.failure||null,a=e.parked===!0&&!i,u=e.retry_wait===!0&&!i&&!a,d=e.waiting===!0&&!i&&!a&&!u,p=a&&e.failure||null,h=d&&e.wait||null,m=a||u||d,v=!!e.paused,O=i||m?e.status_label||(a?"\uC138\uC158 \uB300\uAE30":u?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":d?"\uC120\uD589 \uB300\uAE30":e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):v?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?Oy(t-e.started_at):"\u2014",B=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,V=Ro(e),ae=Jt(e.usage),F=Gn(e.usage),q=e.conflict_resolution?v?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,L=e.base_exception||null,M=e.landing,W=e.attempt_id&&e.attempt_id===n,K=r.monitor||null,H=Py(K),D=fi(K?.cross_lane_chip),G=K?pi(K.dependency_chips):"",X=Ny(K,t,v,o?{updated_at:e.updated_at??null,last_event_at:s&&s.locality==="local"?s.last_event_at:null}:null),J=o&&e.workflow?.chips?.exec_receipt||null,fe=_i(e.workflow),Ce=mi(e.rec,e.chip_popover?.chip_key==="rec"),U=e.chip_popover?no(e.chip_popover.content):"",te=J?c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Hn(J)}`}
        >${`${J.kind}:${Us(J)}`}</span
      >`:"",xe=s?c`<span
        class="ctl-chip ctl-chip--sref"
        title=${`${s.provider}:${s.session_id}@${s.host}${(e.session_refs||[]).length>=2?` \xB7 \uC774\uB825 ${(e.session_refs||[]).length}`:""}`}
        >${Oo(s)}</span
      >`:"",Ee=H||D||fe||xe||te||Ce?c`<div class="rtile__meta">
          ${H}${D}${fe}${xe}${te}${Ce}${U}
        </div>`:"",R=l?c`<button
          type="button"
          class="rtile__failure-badge"
          data-attempt-id=${l.attempt_id}
          aria-expanded=${l.open===!0?"true":"false"}
          aria-label="실패 상세"
        >
          ⛔ ${Hp(l.cause)||"\uC2E4\uD328"}
        </button>
        ${l.halted_auto_advance?c`<span class="rtile__auto-halted">자동 진행 꺼짐</span>`:""}`:"",re=a?c`<span
        class="rtile__held-badge"
        title="세션이 사용자 결정을 기다리며 정상 종료했습니다 — 큐는 계속 갑니다"
        >⏸ 세션 대기</span
      >`:u?c`<span
          class="rtile__held-badge"
          title="환경성 실패의 자동 재시도를 기다립니다 — 사람이 할 일은 없습니다"
          >${Iy(e.retry)}</span
        >`:d?c`<span
            class="rtile__held-badge"
            title="세션이 선행 미충족으로 착수를 거부했습니다 — 선행이 닫히면 저절로 다시 돕니다"
            >⛓ 선행 대기</span
          >`:"",ve=c`${q?c`<span class="worker-mini__badge">${q}</span>`:""}${L?c`<span
        class="worker-mini__badge"
        title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
        >${L}</span
      >`:""}${R}${re}`,ye=o?"":uo(e),Oe=ei(l?.quickfix_landing),_e=Oe==="settlement"?"\uC815\uC0B0 \uC7AC\uAC1C":"\uC774\uC5B4\uD558\uAE30",Le=Oe==="settlement"?"\uCC29\uC9C0 \uC815\uC0B0\uC744 \uB2E4\uC2DC \uC2E4\uD589":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589",Ve=e.resolve_action?c`<button
        type="button"
        class="rtile__resolve"
        ?disabled=${e.resolve_enabled===!1}
        title=${e.resolve_title||"\uC774 \uC2E4\uD328\uB97C \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4"}
        aria-label="세션에서 해결"
      >
        세션에서 해결
      </button>`:"",Ye=e.discard?.action&&!(i&&l?.landed===!0)?c`<button
          type="button"
          class="rtile__discard"
          data-operation-id=${e.discard.operation?.operation_id||""}
          data-confirmation=${l?.confirmation||"unmerged"}
          ?disabled=${!e.discard.enabled}
          title=${e.discard.title}
          aria-label=${e.discard.label}
        >
          ${e.discard.label}
        </button>`:"",P=Ye&&e.discard?.abandon?.action===!0?c`<button
          type="button"
          class="rtile__discard-abandon"
          data-operation-id=${e.discard.operation?.operation_id||""}
          data-operation-kind=${e.discard.operation?.kind||""}
          data-last-error=${e.discard.error||""}
          title=${e.discard.abandon.title}
          aria-label=${e.discard.abandon.label}
        >
          ${e.discard.abandon.label}
        </button>`:"",pe=P?c`${Ye}${P}`:Ye;return c`<div
    class="rtile${W?" rtile--sel":""}${v?" rtile--paused":""}${i?" rtile--failed rtile--compact":""}${m?" rtile--held rtile--compact":""}${a?" rtile--parked":""}${u?" rtile--retry-wait":""}${d?" rtile--waiting":""}${o?" rtile--session":""}${e.search_match===!1?" is-dimmed":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span
        class="rtile__dot${o?" rtile__dot--session":""}"
        aria-hidden="true"
      ></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${gi(e.priority)}${V?c`<span class="rtile__resumed" title=${V}>↻</span>`:""}${ve}
      <div class="rtile__hd-actions">
        ${o?c`${typeof e.started_at=="number"?c`<span class="rtile__elapsed">${O}</span>`:""}${jy(s)}<span
                class="rtile__session-badge"
                title="Worker가 아닌 세션이 in_progress로 잡은 이슈"
                >세션</span
              >`:c`<span class="rtile__elapsed">${O}</span>`}
        ${o||m?"":i?c`<button
                  type="button"
                  class="op-btn rtile__resume"
                  data-resume-kind=${Oe}
                  ?disabled=${l?.resume_eligible===!1}
                  title=${l?.resume_eligible===!1?l.resume_reason||`${_e} \uBD88\uAC00`:Le}
                  aria-label=${_e}
                >
                  ↻ ${_e}
                </button>
                ${pe}`:c`<button
                  type="button"
                  class="rtile__session"
                  title="라이브 세션 열기"
                  aria-label="라이브 세션 열기"
                >
                  ▤ 세션
                </button>
                ${v?c`<button
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
                ${pe}`}${Ve}
      </div>
    </div>
    <div class="rtile__title">${e.title}</div>
    ${m?Fy(a?"parked":u?"retry_wait":"waiting",a?p:h,pe,d?G:""):i?"":c`${X}${e.rollup?Fs(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:va}):""}
            ${M?c`<div class="rtile__landing">
                  <span
                    class="merge-step${M.failed?" merge-step--failed":""}"
                    style=${`--progress: ${M.percent}%`}
                    >${M.label}${M.index>0?c`<span class="merge-step__n"
                          >${M.index}/${M.total}</span
                        >`:""}</span
                  >
                </div>`:""}
            ${G}
            ${o?Ee:H||D||fe||B||Ce||ae.length>0||F?c`<div class="rtile__meta">
                    ${H}${D}${fe}${di(e.exec_chips)}${Ce}
                    ${ae.length>0?ae.map(ne=>c`<span
                              class="worker-usage"
                              title=${ne.tooltip}
                              >${ne.label}</span
                            >`):F?c`<span
                            class="worker-usage"
                            title=${Lo(e.usage)}
                            >${F}</span
                          >`:""}${U}
                  </div>`:""}
            ${ii(e)} ${ye}
            <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
            ${i||v?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}`}
    ${My(l,t)}
  </div>`}function By(e){let t=e.last_activity&&typeof e.last_activity=="object"?e.last_activity:null,n=Array.isArray(e.legs)?e.legs:[],r=e.dependency_chips||null;return!t&&n.length===0&&!r&&e.kind!=="session"?null:{...t?{last_activity:t}:{},...n.length>0?{legs:n}:{},...r?{dependency_chips:r}:{}}}function Zp(e,t=Date.now(),n=null){let r=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${r.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:r.map(o=>Nl(o,t,n,{monitor:By(o)}))}
  </div>`}var Yt="",Uy=["impl_runtime","impl_model","impl_effort"],Wy=["claude_account","codex_account"],zy=5,ea=1;function fn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function ta(e,t){let n=t.transport,r=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,o=t.notify||(A=>he(A,"error",4e3)),s={},i={},l={},a={},u=[],d=!1,p={state:"absent",values:{},warnings:[]},h={},m={},v=Promise.resolve(),O={claude:null,codex:null},B=!1,V=null,ae={},F="",q="",L=!1,M=!1,W=!1,K=null,H=!1;function D(){let A=t.queue?t.queue():null;return fn(A)?A:null}function G(){let A=D();return A?A.runner_catalog:null}function X(){let A=D();return A&&fn(A.execution_defaults)?A.execution_defaults:null}function J(){let A=t.implPresetStore?.get();return fn(A)&&Array.isArray(A.presets)?A:null}function fe(){return r===null?{}:{root_dir:r}}async function Ce(A,j){return H||!n?null:await n(A,j)}function U(A){A&&fn(A.queue)&&t.onQueueAdopt?.(A.queue)}async function te(A,j){let oe=D();if(!oe||H)return null;let ie=await Ce(A,{...j,...fe(),expected_revision:oe.revision});if(U(ie),r!==null&&ie&&ie.conflict){let ce=ie.queue&&typeof ie.queue.revision=="number"?ie.queue.revision:D()?.revision??oe.revision;ie=await Ce(A,{...j,...fe(),expected_revision:ce}),U(ie)}return ie}async function xe(){d=!0,se();try{let A=await Ce("get-session-defaults",{...fe()});s=fn(A?.values)?{...A.values}:{},i={...s},l={},a={},u=Array.isArray(A?.warnings)?A.warnings:[]}catch(A){u=["kv_read_failed"],o(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${A instanceof Error?A.message:String(A)}`)}finally{d=!1,se()}}async function Ee(){let A=ku(s,i);if(Object.keys(A).length!==0){try{let j=await Ce("set-session-defaults",{values:A,...fe()});s=fn(j?.values)?{...j.values}:{},i={...s},u=Array.isArray(j?.warnings)?j.warnings:[]}catch(j){o(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${j instanceof Error?j.message:String(j)}`)}se()}}function R(A,j){if(!fn(A))return;let oe=A.state;p={state:oe==="usable"||oe==="unusable"||oe==="absent"?oe:"absent",values:fn(A.values)?{...A.values}:{},warnings:Array.isArray(A.warnings)?A.warnings:[]},m={...p.values},j&&(h={...m})}async function re(){try{R(await Ce("get-workspace-accounts",{...fe()}),!0)}catch(A){p={state:"unusable",values:{},warnings:["kv_read_failed"]},m={},h={},o(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${A instanceof Error?A.message:String(A)}`)}se()}async function ve(A){try{let j=await fetch(A);if(!j.ok)return null;let oe=await j.json();if(!fn(oe)||!Array.isArray(oe.accounts))return null;let ie=oe.accounts.filter(ce=>fn(ce)&&typeof ce.key=="string"&&ce.key.length>0&&typeof ce.email=="string"&&ce.email.length>0);return{accounts:ie,active:ie.find(ce=>ce.active===!0)||null}}catch{return null}}async function ye(){B=!0;let[A,j]=await Promise.all([ve("/api/claude-usage"),ve("/api/codex-usage")]);H||(O={claude:A,codex:j},se())}function Oe(){let A={};for(let j of Wy){let oe=Object.hasOwn(h,j)?h[j]:null,ie=Object.hasOwn(m,j)?m[j]:null;oe!==ie&&(A[j]=oe)}return A}async function _e(){let A=Oe();if(Object.keys(A).length!==0){try{R(await Ce("set-workspace-accounts",{values:A,...fe()}),!1)}catch(j){o(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${j instanceof Error?j.message:String(j)}`)}se()}}function Le(A,j){j===Yt?delete h[A]:h[A]=j,se(),v=v.then(()=>_e())}function Ve(A,j){if(Uy.includes(A)){me(A,j);return}j===Yt?delete i[A]:i[A]=j,se(),Ee()}function Ye(A,j){l[A]=j,delete a[A]}function P(A,j,oe){if(l[A]=j,j.length>0&&!oe(j)){a[A]=!0,se();return}delete l[A],delete a[A],j.length===0?delete i[A]:i[A]=j,se(),Ee()}function pe(){let A=bt().orchestration_model,j=yn({global:{orchestration_model:A??void 0},execution_defaults:X(),runner_catalog:G()}).orchestration_model.value;return j?Sn(G(),j):null}function ne(A,j){typeof j=="string"&&j.length>0?i[A]=j:delete i[A]}function me(A,j){let oe=j===Yt?void 0:j,ie=vu({impl_runtime:A==="impl_runtime"?oe:i.impl_runtime,impl_model:A==="impl_model"?oe:i.impl_model,impl_effort:A==="impl_effort"?oe:i.impl_effort},G(),pe());ne("impl_runtime",ie.impl_runtime),ne("impl_model",ie.impl_model),ne("impl_effort",ie.impl_effort),se(),Ee()}async function Te(){let A=D();if(!A)return;let j={orchestration_model:A.orchestration_model??null,orchestration_effort:A.orchestration_effort??null,orchestration_speed:A.orchestration_speed??null},oe=$u(j,{...j,...ae});if(Object.keys(oe).length!==0){try{let ie=await te("worker-queue-set-orchestration-defaults",{values:oe});if(ie&&ie.applied===!1){o("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}ae={}}catch(ie){o(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${ie instanceof Error?ie.message:String(ie)}`)}se()}}function ge(A,j){ae[A]=j===Yt?null:j,se(),Te()}function Me(A){if(V=A,!A){se();return}let j=G(),oe=bt(),ie=oe.orchestration_model;ie&&!Po(j,A).includes(ie)&&(ae.orchestration_model=null,ie=null);let ce=oe.orchestration_effort;ce&&!Ra(j,A,ie||wn).includes(ce)&&(ae.orchestration_effort=null),se(),Te()}async function We(A){if(!(!D()||A<ea)){try{await te("worker-queue-set-slots",{slots:A})}catch(j){o(`slots \uC800\uC7A5 \uC2E4\uD328: ${j instanceof Error?j.message:String(j)}`)}se()}}async function Ze(A){if(!(!D()||A<ea||A>zy)){try{await te("worker-queue-set-serial-lane-count",{count:A})}catch(j){o(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${j instanceof Error?j.message:String(j)}`)}se()}}async function qe(A,j){let oe=A==="auto_advance"?"worker-automation-toggle":"worker-merge-auto-toggle";try{await te(oe,{on:j})}catch(ie){o(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${ie instanceof Error?ie.message:String(ie)}`)}se()}function z(){let A={},j=bt();for(let oe of ro){let ie=Vn.includes(oe)?j[oe]:i[oe];typeof ie=="string"&&ie.length>0&&(A[oe]=ie)}return A}async function Y(){let A=J();if(!A)return;let j=z();if(Object.keys(j).length===0){o("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let oe=(A.presets||[]).find(ce=>ce.id===F),ie=q.trim()||(oe?oe.name:"");if(!ie){o("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let ce=oe?await Ce("impl-preset-update",{expected_revision:A.revision,id:oe.id,name:ie,settings:j}):await Ce("impl-preset-create",{expected_revision:A.revision,name:ie,settings:j});if(ce&&ce.applied){if(q="",!oe&&Array.isArray(ce.presets)){let Pe=ce.presets.find(Je=>Je.name===ie);F=Pe?Pe.id:F}se()}else o("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),se()}catch(ce){o(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${ce instanceof Error?ce.message:String(ce)}`)}}async function Ne(){let A=J();if(!(!A||F.length===0))try{let j=await Ce("impl-preset-delete",{expected_revision:A.revision,id:F});j&&j.applied?(F="",se()):(o("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),se())}catch(j){o(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${j instanceof Error?j.message:String(j)}`)}}function lt(A){s=fn(A.values)?{...A.values}:{},i={...s},u=Array.isArray(A.warnings)?A.warnings:[],fn(A.queue)&&(t.onQueueAdopt?.(A.queue),ae={})}async function Ue(){let A=J(),j=D();if(!A||!j||F.length===0)return;let oe=ie=>({preset_id:F,expected_revision:A.revision,expected_queue_revision:ie,...fe()});try{let ie=await Ce("apply-impl-preset-global",oe(j.revision));if(ie&&ie.applied&&lt(ie),r!==null&&ie&&ie.queue_applied===!1){let ce=ie.queue&&typeof ie.queue.revision=="number"?ie.queue.revision:D()?.revision??j.revision;ie=await Ce("apply-impl-preset-global",oe(ce)),ie&&ie.applied&&lt(ie)}ie&&ie.applied?ie.queue_applied===!1&&o("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):ie&&ie.conflict&&o("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(ie){o(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${ie instanceof Error?ie.message:String(ie)}`)}se()}async function Re(){M=!0,W=!1,se();try{let A=await Ce("get-worker-system-prompt",{});!A||typeof A!="object"||Array.isArray(A)?W=!0:K=A}catch{W=!0}finally{M=!1,se()}}function $(){if(L=!L,L&&!K){Re();return}se()}function Z(){let A=go({loading:M,error:W});if(A)return A;if(!K)return"";let j=Array.isArray(K.variants)?K.variants:[];return c`<div class="settings-dialog__sp-body">
      ${K.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${K.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${j.map(oe=>c`<div class="settings-dialog__sp-variant" data-variant=${oe.key}>
            <div class="settings-dialog__sp-cond">${oe.condition}</div>
            ${er(oe.label,oe.system_prompt)}
          </div>`)}
    </div>`}function Se(){return c`<section
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
        aria-expanded=${L?"true":"false"}
        @click=${$}
      >
        ${L?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${L?Z():""}
    </section>`}function Ie(A,j,oe,ie,ce,Pe,Je){let Xe=ce[A]??Yt,je=Oa(A,oe,ce,X(),G(),Je),vt=je.options.find(ht=>ht.value===Xe),Ot=Xe===Yt?je.full_value:vt?.full_value;return c`<select
        class=${Xe===Yt?"settings-dialog__unset":""}
        data-key=${A}
        aria-label=${j}
        title=${Ot||""}
        ?disabled=${Pe===!0||je.disabled}
        .value=${_r(String(Xe))}
        @change=${ht=>ie(A,String(ht.target.value))}
      >
        <option value=${Yt} ?selected=${Xe===Yt}>
          ${je.unset_label}
        </option>
        ${je.options.map(ht=>c`<option
              value=${ht.value}
              title=${ht.full_value||""}
              ?selected=${ht.value===Xe}
            >
              ${ht.label}
            </option>`)}
      </select>
      ${Xe===Yt?c`<span class="settings-dialog__source-badge">기본</span>`:""}`}function Ge(A,j,oe,ie,ce,Pe=!1,Je){return c`<div
      class=${`settings-dialog__row${Pe?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${j}</span>
      <span class="settings-dialog__controls">
        ${Ie(A,j,oe,ie,ce,Pe,Je)}
      </span>
    </div>`}function tt(A,j,oe,ie,ce,Pe){let Je=Object.hasOwn(a,A),Xe=l[A]??i[A]??Yt;return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${j}</span>
      <span class="settings-dialog__controls">
        <input
          type="text"
          class=${`settings-dialog__text${Je?" settings-dialog__text--invalid":""}`}
          data-key=${A}
          aria-label=${j}
          aria-invalid=${String(Je)}
          placeholder=${oe}
          .value=${_r(Xe)}
          @input=${je=>Ye(A,String(je.target.value))}
          @change=${je=>P(A,String(je.target.value).trim(),Pe)}
        />
        ${Xe.length===0?c`<span class="settings-dialog__source-badge">기본</span>`:""}
        <span class="settings-dialog__hint" data-key-hint=${A}
          >${Je?ce:ie}</span
        >
      </span>
    </div>`}function ct(A,j){let oe=j?j.active:null;return fn(oe)?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${A==="claude"?oe.email:bo({...oe,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)"}function Tt(A,j,oe){let ie=O[oe],ce=Object.hasOwn(h,A)?h[A]:Yt,Pe=oe==="claude"?Hi:bo,Je=!!ie?.accounts.some(Xe=>Xe.key===ce);return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${j}</span>
      <span class="settings-dialog__controls">
        <select
          aria-label=${j}
          data-account-key=${A}
          @change=${Xe=>Le(A,String(Xe.target.value))}
        >
          <option value=${Yt} ?selected=${ce.length===0}>
            ${ct(oe,ie)}
          </option>
          ${ce.length>0&&!Je?c`<option value=${ce} selected>
                ${ce} (목록에 없음)
              </option>`:""}
          ${ie?.accounts.map(Xe=>c`<option value=${Xe.key} ?selected=${Xe.key===ce}>
                ${Pe(Xe)}
              </option>`)||""}
        </select>
        ${ie?"":c`<span class="settings-dialog__hint"
              >계정 목록을 불러올 수 없습니다</span
            >`}
      </span>
    </div>`}function Dt(){let A=p.warnings.join(", ");return p.state==="unusable"?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uD574\uC11D\uD560 \uC218 \uC5C6\uC5B4 \uC774 \uB808\uD3EC\uC758 \uB514\uC2A4\uD328\uCE58\uAC00 \uAC70\uBD80\uB429\uB2C8\uB2E4 \u2014 ${A} \xB7 \uACC4\uC815\uC744 \uB2E4\uC2DC \uACE0\uB974\uBA74 \uD574\uC18C\uB429\uB2C8\uB2E4`:p.warnings.length>0?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC5D0 \uC54C \uC218 \uC5C6\uB294 \uD0A4\uAC00 \uC788\uC2B5\uB2C8\uB2E4 \u2014 ${A}`:null}function ft(A,j,oe,ie,ce,Pe){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${j}-on)`}
        ></i>
        ${A}
      </span>
      <span class="settings-dialog__controls">
        ${Ie(oe,`${A} \uBAA8\uB378`,ie,Ve,i,!1)}
        ${Ie(ce,`${A} effort`,Qs,Ve,i,!1)}
        ${Ie(Pe,`${A} \uC18D\uB3C4`,hu,Ve,i,!1)}
      </span>
    </div>`}function gt(A,j,oe,ie){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${j}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${ie?" is-on":""}`}
          data-automation=${A}
          aria-pressed=${ie?"true":"false"}
          aria-label=${j}
          @click=${()=>qe(A,!ie)}
        >
          ${ie?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${oe}</span>
      </span>
    </div>`}function mt(A,j,oe,ie){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${j}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${A}>
          <button
            type="button"
            aria-label=${`${j} \uAC10\uC18C`}
            @click=${()=>ie(oe-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${oe}</span>
          <button
            type="button"
            aria-label=${`${j} \uC99D\uAC00`}
            @click=${()=>ie(oe+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function Rt(A){return c`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${A.rows.length>0?`\uBCC0\uACBD ${A.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${A.rows.map(j=>c`<div
            class="settings-dialog__preset-diff-row"
            data-diff-kind=${j.kind}
          >
            <span class="settings-dialog__preset-diff-label">${j.label}</span>
            <span class="settings-dialog__preset-diff-value"
              >${j.before??"\uAE30\uBCF8"}</span
            >
            <span class="settings-dialog__preset-diff-arrow">→</span>
            <span
              class="settings-dialog__preset-diff-value settings-dialog__preset-diff-after"
              >${j.after??"\uAE30\uBCF8(\uD574\uC81C)"}</span
            >
          </div>`)}
      ${A.ignored_keys.length>0?c`<div class="settings-dialog__preset-diff-note">
            ${A.ignored_keys.join(", ")}은(는) 전역 적용이 쓰지 않는 키라
            무시됩니다
          </div>`:""}
    </div>`}function bt(){let A=D(),j={};for(let oe of Vn)j[oe]=Object.prototype.hasOwnProperty.call(ae,oe)?ae[oe]:A&&typeof A[oe]=="string"?A[oe]:null;return j}function ue(){let A=G(),j=i.impl_runtime,oe=i.impl_model,ie=J(),ce=D(),Pe=bt(),Je=Po(A,V),Xe=so(A,void 0).filter(ut=>ut!==wn),je=Ra(A,V,Pe.orchestration_model||wn).filter(ut=>ut!==wn),vt=F?(ie?.presets||[]).find(ut=>ut.id===F):null,Ot=vt?wu(z(),fn(vt.settings)?vt.settings:{}):null,ht=ce&&typeof ce.slots=="number"?ce.slots:ea+1,Vt=ce&&typeof ce.serial_lane_count=="number"?ce.serial_lane_count:ea,jt=X()?.supported===!0,St=Dt(),zt=Oa("workflow_mode",Io,i,X(),A);return c`
      ${u.length>0?c`<div class="settings-dialog__banner" role="alert">
            워크스페이스 기본값을 일부 읽지 못했습니다 —
            ${u.join(", ")}
          </div>`:""}
      ${St?c`<div
            class="settings-dialog__banner"
            data-account-warning
            role="alert"
          >
            ${St}
          </div>`:""}
      ${jt?"":c`<div
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
                .value=${_r(F)}
                @change=${ut=>{F=String(ut.target.value),se()}}
              >
                <option value="" ?selected=${F===""}>
                  실행 프리셋…
                </option>
                ${(ie?.presets||[]).map(ut=>c`<option
                      value=${ut.id}
                      ?selected=${ut.id===F}
                    >
                      ${ut.name}
                    </option>`)}
              </select>
              <button
                type="button"
                class="settings-dialog__btn settings-dialog__btn--primary"
                data-preset-apply-global
                ?disabled=${!Ot||Ot.rows.length===0}
                @click=${Ue}
              >
                적용
              </button>
              <input
                type="text"
                class="settings-dialog__preset-name"
                placeholder=${F?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                aria-label="프리셋 이름"
                .value=${_r(q)}
                @input=${ut=>{q=String(ut.target.value)}}
              />
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-save
                title=${F?"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC774 \uD504\uB9AC\uC14B\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4 (\uD504\uB9AC\uC14B \u2192 \uC124\uC815 \uBC29\uD5A5\uC774 \uC544\uB2D8)":"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC0C8 \uD504\uB9AC\uC14B\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4"}
                @click=${Y}
              >
                ${F?"\uD604\uC7AC \uC124\uC815\uC73C\uB85C \uB36E\uC5B4\uC4F0\uAE30":"\uC0C8 \uD504\uB9AC\uC14B \uC800\uC7A5"}
              </button>
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-delete
                ?disabled=${F.length===0}
                @click=${Ne}
              >
                삭제
              </button>
            </div>
            ${Ot?Rt(Ot):""}

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">오케스트레이션</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">런타임</span>
                <span class="settings-dialog__controls">
                  <select
                    aria-label="런타임"
                    data-key="orchestration_runtime_filter"
                    .value=${_r(V||Yt)}
                    @change=${ut=>{let Bt=String(ut.target.value);Me(Bt===Yt?null:Bt)}}
                  >
                    <option value=${Yt} ?selected=${!V}>
                      전체
                    </option>
                    <option
                      value="claude"
                      ?selected=${V==="claude"}
                    >
                      claude
                    </option>
                    <option
                      value="codex"
                      ?selected=${V==="codex"}
                    >
                      codex
                    </option>
                  </select>
                  <span class="settings-dialog__hint"
                    >모델 목록을 좁힙니다</span
                  >
                </span>
              </div>
              ${Ge("orchestration_model","\uBAA8\uB378",Je,ge,Pe)}
              ${Ge("orchestration_effort","effort",je,ge,Pe)}
              ${Ge("orchestration_speed","\uC18D\uB3C4",oo,ge,Pe)}
            </div>

            <div class="settings-dialog__group" data-exec-accounts-group>
              <div class="settings-dialog__group-title">실행 계정</div>
              ${Tt("claude_account","Claude","claude")}
              ${Tt("codex_account","Codex","codex")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">워크플로우</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">모드</span>
                <span class="settings-dialog__controls">
                  <span class="settings-dialog__seg" role="group">
                    <button
                      type="button"
                      data-mode=${Yt}
                      aria-pressed=${String(!i.workflow_mode)}
                      @click=${()=>Ve("workflow_mode",Yt)}
                    >
                      ${zt.unset_label}
                    </button>
                    ${i.workflow_mode?"":c`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${Io.map(ut=>c`<button
                          type="button"
                          data-mode=${ut}
                          aria-pressed=${String(i.workflow_mode===ut)}
                          @click=${()=>Ve("workflow_mode",ut)}
                        >
                          ${ut}
                        </button>`)}
                  </span>
                </span>
              </div>
              ${tt("bdui_url","beads-ui \uC8FC\uC18C","http://\uD638\uC2A4\uD2B8:3000","\uC138\uC158\uC774 Worker \uB808\uC778 \uBC30\uCE58\uB97C \uBB3C\uC5B4\uBCFC \uB54C \uC4F0\uB294 \uC8FC\uC18C\uC785\uB2C8\uB2E4","http:// \uB610\uB294 https:// \uB85C \uC2DC\uC791\uD558\uB294 \uC8FC\uC18C\uB9CC \uC800\uC7A5\uB429\uB2C8\uB2E4 (\uACBD\uB85C \uC5C6\uC774)",mu)}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                리뷰 게이트
                <span class="settings-dialog__hint">모델 · effort · 속도</span>
              </div>
              ${ft("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",Mo,"spec_review_effort","spec_review_speed")}
              ${ft("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",Xs,"plan_review_effort","plan_review_speed")}
              ${ft("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",Mo,"impl_review_effort","impl_review_speed")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${Ge("impl_runtime","\uC704\uC784 \uB300\uC0C1",Vs,Ve,i)}
              ${Ge("impl_model","\uBAA8\uB378",so(A,j),Ve,i)}
              ${Ge("impl_effort","effort",io(A,j,oe),Ve,i)}
              ${Ge("impl_speed","\uC18D\uB3C4",oo,Ve,i)}
              ${Ge("quick_fix_impl_model","quick_fix \uAD6C\uD604 \uBAA8\uB378",Xe,Ve,i,!1,{...i,...Pe})}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                자동화
                <span class="settings-dialog__hint"
                  >이 레포의 워커 큐가 스스로 진행하는 범위</span
                >
              </div>
              ${gt("auto_advance","\uC790\uB3D9\uD654","\uC2AC\uB86F\uC774 \uBE44\uBA74 \uB300\uAE30 \uC55E \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4",ce?.auto_advance===!0)}
              ${gt("auto_merge","\uBA38\uC9C0","\uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4",ce?.auto_merge===!0)}
              ${mt("slots","\uB3D9\uC2DC \uC2E4\uD589",ht,ut=>We(ut))}
              ${mt("serial-lane-count","\uC9C1\uB82C \uB808\uC778",Vt,ut=>Ze(ut))}
            </div>
            ${Se()}
          `}
    `}function se(){H||ot(ue(),e)}return{load(){ae={},l={},a={};let A=[xe(),re()];return B||A.push(ye()),Promise.all(A).then(()=>{})},render:se,sessionDraft:()=>({...i}),destroy(){H=!0,ot(c``,e)}}}function na(e){return c`<svg
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
  </svg>`}function Jp(){return na(Eo`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function ef(){return na(Eo`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function tf(){return na(Eo`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function nf(){return na(Eo`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function rf(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function of(e){let t=(Array.isArray(e)?e:[]).map(l=>l&&l.usage).filter(l=>l&&typeof l=="object"&&"providers"in l);if(t.length>0)return Jt(Ks(t));let n={};for(let l of Fn)n[l]=0;let r=!1,o=0,s=0,i=0;for(let l of Array.isArray(e)?e:[]){let a=l&&l.usage;if(a&&typeof a=="object"){let u=!1;for(let d of Fn){let p=a[d];typeof p=="number"&&Number.isFinite(p)&&(n[d]+=p,r=!0,u=!0)}if(u){s+=1;let d=a.total_cost_usd;typeof d=="number"&&Number.isFinite(d)&&(o+=d,i+=1)}}}return s>0&&i===s&&(n.total_cost_usd=o),r?Gn(n):null}function Ln(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function ql(e,t){let n=Ln(e?.counts)?e.counts:null,r=n?n[t]:null;return typeof r=="number"&&Number.isFinite(r)?r:0}function Hy(e,t){if(!Ln(t))return e;let n={...e};for(let[r,o]of Object.entries(t))o!==void 0&&(n[r]=o);return n}function Gy(e){if(!Ln(e)||!Ln(e.execution_defaults)||!Ln(e.runner_catalog)||!Ln(e.session_defaults))return null;let t={...e.session_defaults};for(let i of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[i]=="string"&&e[i].length>0&&(t[i]=e[i]);let n=yn({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),r=Sn(e.runner_catalog,n.orchestration_model.value??""),o=ao(n,e.runner_catalog),s=Cr(n,r);return o===null&&s===null?null:{orchestration:o,worker:s}}function sf(e,t){let n=t.notify||(R=>he(R,"error",4e3)),r=document.createElement("div");r.className="mon2-deck__main",e.appendChild(r);let o=document.createElement("div");o.className="mon2-deck__panel",o.hidden=!0;let s=document.createElement("div");s.className="mon2-deck__panel-hd";let i=document.createElement("span");i.className="mon2-deck__panel-title";let l=document.createElement("button");l.type="button",l.className="mon2-deck__panel-close",l.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),l.textContent="\u2715",s.append(i,l);let a=document.createElement("div");a.className="mon2-deck__panel-body",o.append(s,a),e.appendChild(o);let u=null,d=null,p=null,h=new Map;function m(){let R=t.workspacesState?t.workspacesState():[];return Array.isArray(R)?R.filter(re=>Ln(re)):[]}function v(R){return m().find(re=>re.root_dir===R)||null}function O(R){return Hy(v(R),h.get(R))}function B(){for(let R of m()){let re=h.get(R.root_dir);re&&typeof re.revision=="number"&&typeof R.revision=="number"&&R.revision>=re.revision&&h.delete(R.root_dir)}}async function V(R,re,ve){let ye=t.transport,Oe=O(re);if(!(!ye||!Ln(Oe))){try{let _e=await ye(R,{...ve,root_dir:re,expected_revision:Oe.revision});if(Ln(_e?.queue)&&h.set(re,_e.queue),_e&&_e.conflict){let Le=Ln(_e.queue)&&typeof _e.queue.revision=="number"?_e.queue.revision:O(re)?.revision;_e=await ye(R,{...ve,root_dir:re,expected_revision:Le}),Ln(_e?.queue)&&h.set(re,_e.queue)}}catch(_e){n(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${_e instanceof Error?_e.message:String(_e)}`)}te()}}function ae(R){u!==R&&(u=R,t.onFocusChange?.(u),te())}function F(R){ae(u===R?null:R)}function q(R){if(d===R){M();return}L(),d=R;let re=v(R);i.textContent=`${re?.name||R} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,o.hidden=!1,p=ta(a,{root_dir:R,queue:()=>O(R),transport:t.transport,implPresetStore:t.implPresetStore,notify:n,onQueueAdopt:ve=>{h.set(R,ve),te()}}),p.load(),te()}function L(){p?.destroy(),p=null}function M(R){L(),d=null,o.hidden=!0,i.textContent="",R!==!0&&te()}let W=()=>M();l.addEventListener("click",W);function K(R){R.key==="Escape"&&u!==null&&ae(null)}document.addEventListener("keydown",K);function H(R,re){let ve=Math.max(re,R,1);return c`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${re}\uAC1C \uC911 ${R}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:ve},(ye,Oe)=>Oe<R?c`<i class="mon2-deck__slot is-run"></i>`:c`<i class="mon2-deck__slot"></i>`)}
    </span>`}function D(R){let re=R.auto_advance===!0,ve=R.auto_merge===!0;return c`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${re?" is-on":""}`}
        data-act="auto"
        aria-pressed=${re?"true":"false"}
        aria-label=${`${R.name} \uC790\uB3D9\uD654`}
        title=${re?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${re?ef():Jp()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${ve?" is-on":""}`}
        data-act="merge"
        aria-pressed=${ve?"true":"false"}
        aria-label=${`${R.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${ve?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${tf()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__gear${d===R.root_dir?" is-on":""}`}
        data-act="gear"
        aria-expanded=${d===R.root_dir?"true":"false"}
        aria-label=${`${R.name} \uC2E4\uD589 \uC124\uC815`}
        title="이 레포의 실행 설정"
      >
        ${nf()}
      </button>`}function G(R){let re=Gy(R);return re?c`<div class="mon2-deck__chips">
      ${re.orchestration?c`<span class="mon2-deck__chip" title=${re.orchestration.title}
            >오케 ${re.orchestration.text}</span
          >`:""}
      ${re.worker?c`<span class="mon2-deck__chip" title=${re.worker.title}
            >워커 ${re.worker.text}</span
          >`:""}
    </div>`:""}function X(R){let re=[];for(let[ve,ye]of[["queue","\uB300\uAE30"],["pr_wait","PR"],["session_active","\uC138\uC158"]]){let Oe=ql(R,ve);Oe>0&&re.push(`${ye} ${Oe}`)}return re.join(" \xB7 ")}function J(R){let re=ql(R,"running"),ve=typeof R.slots=="number"?R.slots:1;return c`<div
      class=${`mon2-deck__tile${u===R.root_dir?" is-focus":""}`}
      role="button"
      tabindex="0"
      data-root-dir=${R.root_dir}
      aria-pressed=${u===R.root_dir?"true":"false"}
      title="클릭하면 이 레포만 선명하게 봅니다 (Esc로 해제)"
    >
      <div class="mon2-deck__tile-hd">
        <span class="mon2-deck__name" title=${R.root_dir}>${R.name}</span>
        <span
          class="mon2-deck__load"
          title=${`\uC2AC\uB86F ${ve}\uAC1C \uC911 ${re}\uAC1C \uC2E4\uD589 \uC911`}
        >
          <span class="mon2-deck__load-n">${re}/${ve}</span>
          ${H(re,ve)}
        </span>
        <button
          type="button"
          class="mon2-deck__worker"
          data-act="worker"
          aria-label=${`${R.name} Worker \uD0ED\uC73C\uB85C \uC774\uB3D9`}
          title="이 레포의 Worker 탭으로 이동"
        >
          ↗
        </button>
      </div>
      <div class="mon2-deck__tile-ft">
        <div class="mon2-deck__ops">${D(R)}</div>
        <span class="mon2-deck__counts">${X(R)}</span>
        ${G(R)}
      </div>
    </div>`}function fe(R){let re=t.doneItems?t.doneItems():[],ve=t.rangeLabel?t.rangeLabel():"",ye=of(Array.isArray(re)?re:[]),Oe=_e=>R.reduce((Le,Ve)=>Le+ql(Ve,_e),0);return c`<div class="mon2-deck__bar">
      <span
        class="mon2-deck__total-counts"
        title=${`visible \uB808\uD3EC ${R.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${ve}`}
        >실행 ${Oe("running")} · 대기 ${Oe("queue")} · PR
        ${Oe("pr_wait")}${Oe("session_active")>0?` \xB7 \uC138\uC158 ${Oe("session_active")}`:""}
        · ${ve} 완료
        ${Array.isArray(re)?re.length:0}</span
      >
      ${ye===null?"":c`<span class="mon2-deck__total-tokens">
            ${typeof ye=="string"?c`<span
                  class="mon2-deck__tok"
                  title=${rf(ve)}
                  >${ye}</span
                >`:ye.map(_e=>c`<span
                      class="mon2-deck__tok"
                      data-provider=${_e.provider}
                      title=${_e.tooltip}
                      >${_e.label}</span
                    >`)}
          </span>`}
    </div>`}function Ce(){let R=m();return R.length===0?"":c`${fe(R)}
      <div class="mon2-deck__strip">
        ${R.map(re=>J(re))}
      </div>`}function U(){u!==null&&!v(u)&&(u=null,t.onFocusChange?.(null))}function te(){B(),U(),d!==null&&!v(d)&&M(!0),ot(Ce(),r),p?.render()}function xe(R){let re=R.target;if(!re||typeof re.closest!="function")return;let ve=re.closest("[data-root-dir]");if(!ve)return;let ye=ve.getAttribute("data-root-dir")||"",Oe=re.closest("[data-act]")?.getAttribute("data-act");if(Oe==="worker"){t.gotoWorkerTab?.(ye);return}if(Oe==="auto"){V("worker-automation-toggle",ye,{on:O(ye)?.auto_advance!==!0});return}if(Oe==="merge"){V("worker-merge-auto-toggle",ye,{on:O(ye)?.auto_merge!==!0});return}if(Oe==="gear"){q(ye);return}F(ye)}function Ee(R){if(R.key!=="Enter"&&R.key!==" ")return;let re=R.target;if(!re||typeof re.closest!="function")return;let ve=re.closest('[data-root-dir][role="button"]');!ve||ve!==re||(R.preventDefault(),F(ve.getAttribute("data-root-dir")||""))}return r.addEventListener("click",xe),r.addEventListener("keydown",Ee),{render:te,focusRoot:()=>u,panelRoot:()=>d,destroy(){document.removeEventListener("keydown",K),r.removeEventListener("click",xe),r.removeEventListener("keydown",Ee),l.removeEventListener("click",W),L(),ot(c``,r),e.replaceChildren()}}}var Ky=1e4,uf="bdui.monitor.done-range",df="bdui.monitor.running_sort",pf="bdui.monitor.candidate_sort",ff="beads-ui.monitor.candidate-filter",_f="beads-ui.monitor.sections";function Yy(){try{let e=window.localStorage.getItem(ff);if(!e)return{...fo};let t=JSON.parse(e);return!t||typeof t!="object"?{...fo}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:fo.show_blocked,spec:Za.some(n=>n.value===t.spec)?t.spec:"all"}}catch{return{...fo}}}function af(e){try{window.localStorage.setItem(ff,JSON.stringify({show_blocked:e.show_blocked,spec:e.spec}))}catch{}}function Vy(){try{let e=window.localStorage.getItem(pf);return Yo.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function Xy(e){try{window.localStorage.setItem(pf,e)}catch{}}function Qy(){try{let e=window.localStorage.getItem(_f);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function Zy(e){try{window.localStorage.setItem(_f,JSON.stringify(e))}catch{}}function Jy(){try{let e=window.localStorage.getItem(uf);return e===null?"today":qn(e)}catch{return"today"}}function ev(e){try{window.localStorage.setItem(uf,e)}catch{}}function tv(){try{return window.localStorage.getItem(df)==="repo"?"repo":"started"}catch{return"started"}}function nv(e){try{window.localStorage.setItem(df,e)}catch{}}var mf="tab:monitor:pipeline",rv=1e3,lf=[{lane:"runnable",pane:"candidate",title:"\uD6C4\uBCF4",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589 \uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],ov=["queue","runnable","done"],cf="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function sv(e){return e>=1&&e<=cf.length?cf[e-1]:`(${e})`}function gf(e,t){let n=Ct("views:monitor"),r=t.gotoIssue,o=t.pipelineStore,s=t.transport,i=t.getWorkspacePath,l=t.openDoc,a=t.switchWorkspace,u=t.router,d=t.now||(()=>Date.now()),p=t.confirm||(b=>typeof globalThis.confirm!="function"||globalThis.confirm(b)),h=Jy(),m=tv(),v=Yy(),O=Vy(),B=Qy(),V=Vi("beads-ui.monitor.lane-collapsed"),ae=!1,F=null,q=null,L=null,M=null,W=to(()=>ce()),K=null,H=null,D=null,G=null;function X(b){return G===null&&(G=P()),kd(b,G)}function J(b,y){fe(),!(y<=0)&&(H={lane_id:b,corrected:y},D=setTimeout(()=>{D=null,H=null,ce()},Ky))}function fe(){D!==null&&(clearTimeout(D),D=null),H=null}function Ce(){let b=Br.find(y=>y.value===h);return b?b.label:""}let U=document.createElement("div");U.className="mon",e.appendChild(U);let te=document.createElement("div");te.className="worker-drawer-overlay",te.hidden=!0;let xe=document.createElement("div");xe.className="worker-drawer-overlay__backdrop";let Ee=document.createElement("div");Ee.className="worker-drawer-host mon2-drawer",te.append(xe,Ee),e.appendChild(te);let R=pr(null,null),re=new Map,ve=new Map,ye=null,Oe=null,_e=null,Le=ho(Ee,{transport:s,sessionLogStore:t.sessionLogStore,onClose:()=>{q=null,te.hidden=!0,ce()}}),Ve=Qi({transport:s,console_el:U,getLanes:()=>R,getWorkspaces:()=>o&&o.get?o.get():null,getCrossLanes:jt,reproject:b=>({lanes:ie(b),raw_lanes:b}),onCorrection:J,showToast:he,requestRender:()=>ce(),adoptQueue:(b,y)=>{ve.set(b,y)},onDragBegin:()=>{L=null},candidate_drop:!0}),{applyDrop:Ye,dropModel:P,runPlanned:pe,sendQueueCas:ne}=Ve;async function me(b,y,f,g,S=!0){if(!s||!f)return null;let Q=await s(b,{...y,root_dir:f,expected_revision:g});if(Q&&Q.conflict&&S){Q.queue&&ve.set(f,Q.queue);let ee=Q.queue&&typeof Q.queue.revision=="number"?Q.queue.revision:g;Q=await s(b,{...y,root_dir:f,expected_revision:ee})}return Q&&Q.queue&&f&&ve.set(f,Q.queue),Q}function Te(b,y){let f=ve.get(b),g=o&&o.get?o.get():null,S=(Array.isArray(g)?g:[]).find(ee=>ee?.root_dir===b);return(f||S)?.merge_queue?.find(ee=>ee.bead_id===y)?.continuation_action}async function ge(b,y,f,g){let S=await me(b,y,f,g),Q=ve.get(f)?.revision??S?.queue?.revision??g;return lr(S,(ee,de)=>me(b,{...y,continuation:ee,decision_token:de},f,Q,!1),{refresh:ee=>me(b,y,f,ee?.queue?.revision??ve.get(f)?.revision??Q,!1)})}async function Me(b,y,f,g){let S=await lr({continuation_mismatch:g},(ee,de)=>me("worker-merge-queue-add",{bead_id:y,continuation:ee,decision_token:de},b,f,!1)),Q=S?.queue?.merge_queue?.find(ee=>ee.bead_id===y)?.continuation_action;S?.applied!==!0&&Q?.continuation===null&&Q.mismatch&&await Me(b,y,S.queue.revision,Q.mismatch)}async function We(b,y,f){let g=await me("worker-discard",b,y,f);if(g&&g.discarded===!0){he(ui(g),"success",5e3);return}if(g&&g.reason){he(`\uD3D0\uAE30 \uC2E4\uD328: ${g.reason}`,"error");return}if(g&&g.accepted&&g.pending==="merged_revert"){he("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(g&&g.accepted){he(`\uD3D0\uAE30 \uC9C4\uD589: ${g.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}g&&!g.conflict&&he("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function Ze(b,y,f,g){let S=await me("worker-discard-abandon",b,y,f);if(S&&S.abandoned===!0){he(ci(g),"success",5e3);return}if(S&&S.reason){he(`\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: ${S.reason}`,"error");return}S&&!S.conflict&&he("\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: unknown","error")}async function qe(b,y,f){return!s||!f?null:await s(b,{...y,root_dir:f})}async function z(){let b=new Map;for(let y of R.pr_wait)b.has(y.root_dir)||b.set(y.root_dir,y.expected_revision);for(let[y,f]of b)await me("worker-merge-queue-add-all",{},y,f)}function Y(b){let y=B[b];return!!(y&&y.runnable===!0)}function Ne(b){let y={...B[b]||{}};y.runnable=!y.runnable,B={...B,[b]:y},Zy(B),ce()}function lt(b){V.toggle(b),ce()}function Ue(b){V.toggleArea(b),ce()}function Re(b){let y=b.dependency_chips||null,f=b.overlap_chips||[],g=b.scope_state==="missing",S=b.armed_lane_chip;return!y&&f.length===0&&!g&&!S?null:{...y||{},...f.length>0?{overlaps:f}:{},...g?{scope_missing:!0}:{},...S?{armed_lane:S}:{}}}function $(b){return hi(b,y=>W.isOpen({bead_id:b.id,chip_key:y}))}function Z(b){let y=Re(b),f=$(b);return y||f?{...b,...y?{dependency_chips:y}:{},...f?{chip_popover:f}:{}}:b}function Se(b){let y=Y(b.root_dir);return c`<header class="mon2-sec__hd">
      <button
        type="button"
        class="mon2-sec__toggle"
        data-root-dir=${b.root_dir}
        data-section="runnable"
        aria-expanded=${y?"false":"true"}
        aria-label=${`${b.name} \uC139\uC158 ${y?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
      >
        ${y?"\u25B8":"\u25BE"}
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
    </header>`}function Ie(b,y){return c`<div
      class="mon2-item"
      data-bead-id=${b.id}
      data-drag-kind="candidate"
      data-root-dir=${b.root_dir}
    >
      ${y}
    </div>`}function Ge(b){if(L!==b.id)return null;let y=R.queue_groups.find(Q=>Q.root_dir===b.root_dir),f=b.place_lanes||[],g=R.cross_lanes_revision!==null,S=[{id:"parallel",label:"\uBCD1\uB82C",count:b.place_index??0}];for(let Q of R.chain_lanes)S.push({id:`lane:${Q.lane_id}`,label:`\uC5F0\uACB0 ${Q.number} (${Q.draft?"draft":"\uD655\uC815"}) \uB05D\uC5D0`,count:Q.rows.length,group:"\uC5F0\uACB0 \uB808\uC778",disabled:!g});S.push({id:"new-lane",label:"+ \uC0C8 \uC5F0\uACB0 \uB808\uC778",group:"\uC5F0\uACB0 \uB808\uC778",disabled:!g,title:g?"\uC774 \uC774\uC288\uB9CC \uB4E0 draft \uB808\uC778\uC744 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"});for(let Q of f)S.push({id:`serial:${Q.id}`,label:`\uC9C1\uB82C ${Number(Q.id.slice(1))}`,count:Q.length,group:`${y?y.name:""} \uC9C1\uB82C`});return{bead_id:b.id,lanes:S}}function tt(b){return Ie(b,c`${Ga(Z(b),Ge(b),{exec_chips_mode:"pinned_only",onOpenDoc:l?(y,f)=>l(f,b.root_dir):void 0})}`)}function ct(){return R.runnable_flat?c`<div class="mon2-flat" data-drop="candidate">
        ${R.runnable.map(b=>tt(b))}
      </div>`:c`${R.runnable_sections.map(b=>{let y=Y(b.root_dir);return c`<section
        class="mon2-sec${y?" is-collapsed":""}"
        data-root-dir=${b.root_dir}
        data-section="runnable"
      >
        ${Se({root_dir:b.root_dir,name:b.name,count:b.items.length})}
        ${y?"":c`<div
              class="mon2-sec__body"
              data-lane="candidate"
              data-drop="candidate"
            >
              ${b.items.map(f=>tt(f))}
            </div>`}
      </section>`})}`}function Tt(b,y){return c`<div
      class="mon2-item"
      data-bead-id=${b.id}
      data-drag-kind="parallel"
      data-root-dir=${b.root_dir}
      data-row-index=${y}
      data-queue-index=${String(b.queue_index??0)}
    >
      ${En(Z(b),{actions:po(b,{nudgeable:!0})})}
    </div>`}function Dt(b,y,f,g){return c`<div
      class="mon2-crow${y.fixed?" mon2-crow--fixed":""}"
      draggable=${y.draggable?"true":"false"}
      data-bead-id=${y.id}
      data-drag-kind="chain"
      data-root-dir=${y.root_dir}
      data-lane-id=${b.lane_id}
      data-row-index=${f}
      data-queue-index=${typeof y.queue_index=="number"?String(y.queue_index):""}
    >
      <span class="mon2-crow__seq" aria-hidden="true"
        >${sv(y.seq)}</span
      >
      ${y.workspace_name?c`<span class="worker-mini__repo" title=${y.root_dir}
            >${y.workspace_name}</span
          >`:""}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${y.id}</span>
      <span class="mon2-crow__title">${y.title}</span>
      ${y.mismatch?c`<span
            class="mon2-crow__mismatch"
            title="레인 순서가 주장하는 선행이 bd 의존에 없습니다 — 재적용으로 복구합니다"
            >⚠ 의존 없음</span
          >`:""}
      ${g.includes(y.id)?c`<span
            class="mon2-crow__mismatch"
            title="이미 실행된 뒤 의존이 바뀌었습니다 — 이 행은 움직일 수 없어 교정하지 않습니다"
            >⚠ 의존 순서와 다름</span
          >`:""}
      <span class="mon2-crow__where" title=${y.location_title}
        >${y.location_label}</span
      >
      <button
        type="button"
        class="mon2-crow__detach"
        data-bead-id=${y.id}
        title="연결에서 빼고 앞뒤를 이어 붙입니다"
        aria-label="연결에서 빼기"
      >
        ✕
      </button>
    </div>`}function ft(b){let y=R.cross_lanes_revision!==null,f=X(b.lane_id),g=f?.held===!0,S=f?.cycle===!0,Q=f?f.mismatched:[],ee=H&&H.lane_id===b.lane_id?H.corrected:0;return c`<div class="mon2-clane" data-lane-id=${b.lane_id}>
      <header class="mon2-clane__hd">
        <span class="mon2-clane__name">${b.label}</span>
        <span class="mon2-clane__count">${b.rows.length}</span>
        <span class="mon2-clane__badge mon2-clane__badge--${b.state}"
          >${b.badge}</span
        >
        ${ee>0?c`<span
              class="mon2-clane__corrected"
              title="기존 blocks 의존이 드롭 순서를 이깁니다 — 그 순서로 다시 놓았습니다"
              >의존에 맞춰 ${ee}건 자동 교정</span
            >`:""}
        ${S?c`<span
              class="mon2-clane__cycle"
              title="멤버들의 blocks 의존이 순환합니다 — 어느 순서도 의존을 만족시키지 못합니다"
              >⛔ 의존 사이클 — 자동 교정 불가</span
            >`:""}
        ${g?c`<span
              class="mon2-clane__hold"
              title="멤버 한 명의 의존 자료가 이 스냅샷에 아직 없습니다 — 다음 스냅샷이 채우면 교정합니다"
              >${Ei}</span
            >`:""}
        ${b.draft?c`<button
              type="button"
              class="mon2-clane__confirm"
              data-lane-id=${b.lane_id}
              ?disabled=${!y||!b.can_confirm||g}
              title=${g?Ei:b.can_confirm?"\uC778\uC811 \uC758\uC874\uC744 \uAC78\uACE0 \uBBF8\uC801\uC7AC \uBA64\uBC84\uB97C \uAC01\uC790 \uB808\uD3EC \uBCD1\uB82C \uD050 \uB05D\uC5D0 \uC62C\uB9BD\uB2C8\uB2E4":"\uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD655\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4"}
            >
              확정
            </button>`:""}
        ${b.run_label!==null?c`<button
              type="button"
              class="mon2-clane__run"
              data-lane-id=${b.lane_id}
              ?disabled=${!y}
              title="이 레인 멤버만 발차합니다 — 레포 자동 진행은 켜지 않습니다"
            >
              ${b.run_label}
            </button>`:""}
        ${b.state==="confirmed"&&b.has_mismatch?c`<button
              type="button"
              class="mon2-clane__reapply"
              data-lane-id=${b.lane_id}
              ?disabled=${!y}
              title="빠진 인접 의존을 다시 걸고 미적재 멤버를 다시 올립니다"
            >
              재적용
            </button>`:""}
        ${b.can_stop?c`<button
              type="button"
              class="mon2-clane__stop"
              data-lane-id=${b.lane_id}
              ?disabled=${!y}
              title="남은 멤버의 발차만 멈춥니다 — 도는 세션과 머지 큐 항목은 끝까지 갑니다"
            >
              ⏸ 정지
            </button>`:""}
        <button
          type="button"
          class="mon2-clane__remove"
          data-lane-id=${b.lane_id}
          ?disabled=${!y}
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
            </div>`:b.rows.map((de,rt)=>Dt(b,de,rt,Q))}
      </div>
    </div>`}function gt(b,y,f){return c`<div
      class="mon2-item"
      data-bead-id=${y.id}
      data-drag-kind="repo-serial"
      data-root-dir=${y.root_dir}
      data-lane-id=${b.id}
      data-row-index=${f}
      data-queue-index=${String(y.queue_index??0)}
    >
      ${En(Z(y),{actions:po(y)})}
    </div>`}function mt(b){if(b.length===0)return"";let y=b.length-1;return`${b[0].id} \uC810\uC720${y>0?` +${y}`:""}`}function Rt(b){return c`<div
      class="mon2-item mon2-item--ghost"
      data-bead-id=${b.id}
    >
      ${En({id:b.id,title:b.title,lane:"running",draggable:!1,ghost:!0,badges:[b.badge]})}
    </div>`}function bt(b,y){let f=y.occupants,g=y.cross_wait_peers||[];return{id:y.id,pane_id:"",title:`${b.name} \xB7 \uC9C1\uB82C ${y.index+1}`,rows:[...f.map(S=>Rt(S)),...y.items.map((S,Q)=>gt(y,S,Q))],count:y.items.length,empty:y.empty===!0,...f.length>0?{badge:c`<span
              class="mon2-lane__occupant"
              title=${f.map(S=>`${S.id} \u2014 ${S.badge}`).join(`
`)}
              >${mt(f)}</span
            >`,held:!0}:{},cycle:y.cycle,header_control:c`<button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${b.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>`,...g.length>0?{after:c`${g.map(S=>c`<div class="mon2-lane__cross-wait">
                  ⚠ 상호 정지 — ${S.workspace_name}·${S.lane}과 교차 대기
                </div>`)}`}:{}}}function ue(){let b=R.cross_lanes_revision!==null,y=R.chain_lanes.some(f=>f.draft&&f.rows.length===0);return yi({parallel:{rows:R.parallel_rows.map((f,g)=>Tt(f,g)),count:R.parallel_rows.length,collapsed:V.isAreaCollapsed("parallel"),drop:{drop:"parallel"}},serial:{lanes:R.queue_groups.flatMap(f=>f.sublanes.serial.map(g=>({...bt(f,g),drop:{drop:"repo-serial",root_dir:f.root_dir,lane_id:g.id,lane_length:String(g.raw_length)}}))),collapsed:V.isAreaCollapsed("serial"),extra_panes:R.chain_lanes.map(f=>ft(f)),header_control:c`<button
          type="button"
          class="mon2-newlane"
          ?disabled=${y||!b}
          title=${b?y?"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC774 \uC774\uBBF8 \uC788\uC2B5\uB2C8\uB2E4":"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC744 \uD558\uB098 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
        >
          + 연결 레인
        </button>`,...R.cross_lanes_unreadable?{notice:c`<div class="mon2-clane__unreadable">
                연결 레인 저장소를 읽을 수 없음
              </div>`}:{}}})}function se(b){return c`<div class="worker-rungrid">
      ${R.running.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:R.running.map(y=>Nl({bead_id:y.id,attempt_id:y.attempt_id||"",title:y.title,runner:y.runner??null,model:y.model??null,effort:y.effort??null,speed:y.speed??null,started_at:y.started_at??null,kind:y.kind,...y.kind==="session"?{updated_at:y.updated_at,session_refs:y.session_refs||[]}:{},workflow:y.workflow||null,resumed_from:y.resumed_from??null,continuation_mode:y.continuation_mode??null,paused:y.run_state==="paused",failed:y.run_state==="failed",parked:y.run_state==="parked",retry_wait:y.run_state==="retry_wait",waiting:y.run_state==="waiting",wait:y.wait||null,retry:y.retry||null,status:y.status,status_label:y.run_state==="failed"?"\uC2E4\uD328":y.run_state==="parked"?"\uC138\uC158 \uB300\uAE30":y.run_state==="retry_wait"?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":y.run_state==="waiting"?"\uC120\uD589 \uB300\uAE30":void 0,can_pause:y.can_pause!==!1,exec_chips:y.exec_chips||null,usage:y.usage||null,chip_popover:$(y),discard:y.discard,failure:y.failure?{...y.failure,open:M===y.attempt_id}:null},b,q,{monitor:{repo:y.workspace_name,root_dir:y.root_dir,serial_lane_id:y.serial_lane_id,cross_lane_chip:y.cross_lane_chip||null,last_activity:y.last_activity||null,legs:y.legs||[],dependency_chips:Re(y)}}))}
    </div>`}function A(b){let y={runnable:R.runnable,queue:R.queue,running:R.running,pr_wait:R.pr_wait,done:R.done},f=g=>{let S=y[g.lane],Q=g.lane==="runnable"?R.runnable_flat?S.length>0?ct():void 0:R.runnable_sections.length>0?ct():void 0:g.lane==="queue"?R.queue_groups.length>0||R.chain_lanes.length>0||R.parallel_rows.length>0||R.cross_lanes_unreadable?ue():void 0:g.lane==="running"?se(b):S.length>0?c`${S.map(ee=>En(Z(ee)))}`:void 0;return Bn({id:`monitor-${g.lane}`,lane:g.pane,title:g.title,items:S,count:S.length,src:g.lane==="runnable",empty:g.empty,body:Q,live:g.lane==="running"&&S.length>0,collapsible:!0,collapsed:V.isCollapsed(g.pane),controls:g.lane==="runnable"?j():void 0,header_control:oe(g.lane,S.length)})};if(ae){let g=ov.map(S=>lf.find(Q=>Q.lane===S)).filter(S=>S!==void 0);return c`<div class="mon2-deck"></div>
        <div class="worker-lanes-host">
          <div class="worker-lanes worker-lanes--mobile mon2-lanes">
            ${vi({live:R.running.length>0,running_body:R.running.length>0?se(b):"",pr_wait_rows:R.pr_wait.map(S=>En(Z(S))),count:R.running.length+R.pr_wait.length})}
            ${g.map(S=>f(S))}
          </div>
        </div>`}return c`<div class="mon2-deck"></div>
      <div class="worker-lanes-host">
        <div class="worker-lanes mon2-lanes">
          ${lf.map(g=>f(g))}
        </div>
      </div>`}function j(){return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시">
        <input
          type="checkbox"
          class="mon-filter__blocked"
          .checked=${v.show_blocked}
        />
        🔒
        blocked${R.runnable_hidden.blocked>0?` ${R.runnable_hidden.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Za.map(b=>c`<button
              type="button"
              class="mon-filter__spec worker-filter__chip${v.spec===b.value?" is-active":""}"
              data-spec=${b.value}
              aria-pressed=${v.spec===b.value?"true":"false"}
            >
              ${b.label}
            </button>`)}
        ${R.runnable_hidden.spec>0?c`<span class="worker-filter__hidden"
              >숨김 ${R.runnable_hidden.spec}</span
            >`:""}
      </div>
    </div>`}function oe(b,y){return b==="runnable"?c`<select
        class="mon-candidate-sort worker-sort"
        aria-label="후보 정렬"
        title="후보 정렬"
        .value=${O}
      >
        ${Yo.map(f=>c`<option
              value=${f.value}
              ?selected=${O===f.value}
            >
              ${f.label}
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
      </select>`:b==="pr_wait"&&y>0?c`<button
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
        ${Br.map(f=>c`<option value=${f.value} ?selected=${h===f.value}>
              ${f.label}
            </option>`)}
      </select>`:""}function ie(b){let y=o&&o.get?o.get():null,f=o&&o.getWorkspacesState?o.getWorkspacesState():[],g=b===void 0?o&&o.crossLanes?o.crossLanes():void 0:b,S={done_since:Sr(h,d()),running_sort:m,candidate_filter:v,candidate_sort:O};return g!==void 0&&(S.cross_lanes=g),pr(y,f,S)}function ce(){let b=d();R=ie(),G=null,re=new Map;for(let y of[...R.runnable,...R.queue,...R.running,...R.pr_wait,...R.done])!y.non_occupying&&!re.has(y.id)&&re.set(y.id,y);ot(A(b),U),Je()?.render(),Pe(),Xe()}function Pe(){let b=new Map;for(let y of R.queue_groups)b.set(y.root_dir,y.auto_advance);for(let y of Array.from(U.querySelectorAll(".worker-wait__area--parallel .worker-mini__repo"))){let f=y.closest(".mon2-item")?.getAttribute("data-root-dir")||"",g=b.get(f);typeof g=="boolean"&&y.setAttribute("title",`${y.textContent||""} \xB7 ${g?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function Je(){if(_e)return _e;let b=U.querySelector(".mon2-deck");return b?(_e=sf(b,{workspacesState:()=>o&&o.getWorkspacesState?o.getWorkspacesState():[],doneItems:()=>R.done,rangeLabel:Ce,transport:s,implPresetStore:t.execPresetStore,gotoWorkerTab:vt,onFocusChange:y=>{K=y,Xe()}}),_e):null}function Xe(){U.classList.toggle("has-focus",K!==null);for(let b of Array.from(U.querySelectorAll(".mon2-sec[data-root-dir]")))b.classList.toggle("is-focus",K!==null&&b.getAttribute("data-root-dir")===K);for(let b of Array.from(U.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let y=re.get(b.getAttribute("data-bead-id")||"");b.classList.toggle("is-focus",K!==null&&!!y&&y.root_dir===K)}for(let b of Array.from(U.querySelectorAll(".mon2-crow[data-root-dir]")))b.classList.toggle("is-focus",K!==null&&b.getAttribute("data-root-dir")===K)}function je(b,y){let f=i?i():void 0;if(!y||!f||y===f||!a){r(b);return}a(y).then(()=>{r(b)}).catch(g=>{n("workspace switch for %s failed: %o",y,g)})}function vt(b){if(!b)return;let y=i?i():void 0,f=()=>{try{u?.gotoView("worker")}catch(g){n("gotoView(worker) failed: %o",g)}};if(!a||y&&y===b){f();return}a(b).then(f).catch(g=>{n("workspace switch for %s failed: %o",b,g),he("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function Ot(b){sn(b).then(y=>{he(y?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",y?"success":"error",1400)})}function ht(b){let y=re.get(b)||null;return{item:y,root_dir:y?y.root_dir:"",revision:y?y.expected_revision:0}}async function Vt(b,y,f){if(b!=="dep-add")return;let g=R.chain_lanes.find(S=>S.rows.some(Q=>Q.id===y));!g||!g.rows.some(S=>S.id===f)||await pe(S=>Td(g.lane_id,S),"",[{type:b,a:y,b:f}])}function jt(){return(o&&o.crossLanes?o.crossLanes():null)??null}async function St(b,y){if(b==="run"){await ut(y);return}if(b==="stop"){await Bt(y);return}if(b==="create"){await pe(f=>rl(null,f),"");return}if(b==="remove"){let f=Rd(y,P());if(f!==null&&!p(f))return;await pe(g=>Cd(y,g),"");return}await pe(f=>b==="confirm"?Sd(y,f):Ed(y,f),"")}function zt(b){let y=new Map;for(let f of b.rows){let g=R.owner_of[f.id]||f.root_dir;typeof g!="string"||g.length===0||y.set(g,[...y.get(g)||[],f.id])}return y}async function ut(b){let y=R.chain_lanes.find(Q=>Q.lane_id===b);if(!y||R.cross_lanes_revision===null){ce();return}fe();let f=new Map,g=new Map,S=zt(y);for(let Q of y.rows){if(!Q.unplaced)continue;let ee=R.owner_of[Q.id]||Q.root_dir;if(typeof ee!="string"||ee.length===0){he(`${Q.id}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC801\uC7AC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`,"error"),ce();return}let de=g.get(ee)??0;if(await ne("worker-queue-place",{bead_id:Q.id,lane:"parallel",index:(R.parallel_raw_length[ee]??0)+de},ee,f,{bead_id:Q.id})===null){ce();return}g.set(ee,de+1)}for(let[Q,ee]of S)if(await ne("worker-queue-arm",{bead_ids:ee,lane_id:b},Q,f,{bead_id:ee[0]})===null){he("\uC77C\uBD80 \uB808\uD3EC\uC5D0\uC11C \uC9C4\uD589\uC744 \uCF1C\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589]\uC73C\uB85C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694","error"),ce();return}ce()}async function Bt(b){let y=R.chain_lanes.find(g=>g.lane_id===b);if(!y||R.cross_lanes_revision===null){ce();return}fe();let f=new Map;for(let[g,S]of zt(y))if(await ne("worker-queue-disarm",{lane_id:b},g,f,{bead_id:S[0]})===null)break;ce()}async function Xt(b,y){let{root_dir:f,revision:g}=ht(b);if(f.length===0){ce();return}await ne("worker-queue-disarm",{bead_ids:[b],lane_id:y},f,new Map([[f,g]]),{bead_id:b}),ce()}async function Nt(b,y){let f=re.get(b);if(!f){ce();return}let g={kind:"candidate",bead_id:b,root_dir:f.root_dir};if(y==="new-lane"){await pe(S=>rl({bead_id:b,root_dir:f.root_dir},S),b);return}if(y.startsWith("lane:")){let S=y.slice(5);if(!R.chain_lanes.find(ee=>ee.lane_id===S)){ce();return}await pe(ee=>Ci(g,{kind:"chain",lane_id:S,marker_index:(ee.cross_lanes.get(S)?.entries??[]).length},ee),b);return}if(y.startsWith("serial:")){let S=y.slice(7),Q=(f.place_lanes||[]).find(ee=>ee.id===S);await Ye(g,{kind:"repo-serial",root_dir:f.root_dir,lane_id:S,index:Q?Q.index:0});return}await Ye(g,{kind:"parallel",marker_index:R.parallel_rows.length})}async function rn(b,y){let f=R.parallel_rows,g=f.findIndex(dt=>dt.id===b);if(g<0)return;let S=f[g].root_dir,Q=[];f.forEach((dt,at)=>{dt.root_dir===S&&Q.push(at)});let ee=Q.indexOf(g),de=Q[ee+y];if(typeof de!="number")return;let rt=y===-1?de:Q[ee+2]??Math.min(f.length,de+1);await Ye({kind:"parallel",bead_id:b,root_dir:S,queue_index:f[g].queue_index??0},{kind:"parallel",marker_index:rt})}async function en(b){for(let y of R.chain_lanes){let f=y.rows.find(g=>g.id===b);if(f){await Ye({kind:"chain",bead_id:b,root_dir:f.root_dir,lane_id:y.lane_id,...typeof f.queue_index=="number"?{queue_index:f.queue_index}:{}},{kind:"parallel",marker_index:R.parallel_rows.length});return}}}function Ft(b){return{runner:b.runner||void 0,model:b.model||void 0,effort:b.effort||void 0,status:b.run_state==="running"?"running":b.run_state,worktree:b.root_dir}}function dn(b,y){let{item:f,root_dir:g,revision:S}=ht(y),Q=f?.attempt_id||"",ee=b.classList;if(ee.contains("worker-mini__rowops-up")||ee.contains("worker-mini__rowops-down")){rn(y,ee.contains("worker-mini__rowops-up")?-1:1);return}if(ee.contains("worker-mini__rowops-remove")){me("worker-queue-remove",{bead_id:y},g,S);return}if(ee.contains("mon2-crow__detach")){en(y);return}if(ee.contains("worker-dep__open")){je(b.getAttribute("data-dep-id")||"",b.getAttribute("data-root-dir")||"");return}if(ee.contains("mon2-arm__release")){Xt(y,b.getAttribute("data-lane-id")||"");return}if(ee.contains("mon-lane__chip")){let de=b.getAttribute("data-lane-id")||"";U.querySelector(`.mon2-clane[data-lane-id="${de}"]`)?.scrollIntoView({block:"nearest"});return}if(ee.contains("judgement-chip")){let de=b.getAttribute("data-chip-key")||"";de&&W.toggle({bead_id:y,chip_key:de});return}if(ee.contains("rtile__failure-badge")){M=M===Q?null:Q,ce();return}if(ee.contains("rtile__attempt-copy")){let de=b.getAttribute("data-attempt-id")||"";de&&sn(de).then(rt=>{he(rt?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",rt?"success":"error",1400)});return}if(ee.contains("worker-card__place")){L=L===y?null:y,ce();return}if(ee.contains("worker-card__place-cancel")){L=null,ce();return}if(ee.contains("worker-card__place-lane")){let de=b.getAttribute("data-lane")||"parallel";L=null,Nt(y,de);return}if(ee.contains("rtile__session")){if(f&&f.kind==="session"){let de=(f.session_refs||[]).find(rt=>rt&&rt.current===!0);de&&(te.hidden=!1,Le.open(Zr(de,y,"in_progress",g)),ce());return}q=Q,Q&&f&&(te.hidden=!1,Le.open({attempt_id:Q,root_dir:g,meta:Ft(f)})),ce();return}if(ee.contains("rtile__pause")){qe("worker-attempt-pause",{attempt_id:Q},g);return}if(ee.contains("rtile__resume")){Qr({context:{bead_id:y,kind:b.dataset.resumeKind==="settlement"?"settlement":"session",tuple:f?bn(f):""},transport:de=>me("worker-attempt-resume",{attempt_id:Q,...de},g,ve.get(g)?.revision??ht(y).revision,!1)});return}if(ee.contains("rtile__parked-retry")){qe("worker-parked-retry",{bead_id:y,attempt_id:Q},g).then(de=>{de&&de.ok===!1&&he(`\uC7AC\uC2DC\uB3C4 \uAC70\uBD80: ${de.reason==="not_latest"?"\uC774 bead\uC5D0 \uB354 \uC0C8\uB85C\uC6B4 \uC2DC\uB3C4\uAC00 \uC788\uC2B5\uB2C8\uB2E4":de.reason||""}`,"error")});return}if(ee.contains("rtile__discard-abandon")){let de={kind:b.dataset.operationKind||"",last_error:b.dataset.lastError||""};if(!p(zo(y,de)))return;Ze({bead_id:y,operation_id:b.dataset.operationId||""},g,S,de);return}if(ee.contains("rtile__discard")){let de=b.dataset.confirmation==="merged"?"merged":"unmerged";if(!p(Wo(y,de)))return;We({bead_id:y,...Q?{attempt_id:Q}:{},...b.dataset.operationId?{operation_id:b.dataset.operationId}:{}},g,S);return}if(ee.contains("worker-mini__merge")){let de=Te(g,y);de?.mismatch&&de.continuation===null?Me(g,y,S,de.mismatch):me("worker-merge-queue-add",{bead_id:y},g,S);return}if(ee.contains("worker-mini__merge-cancel")){me("worker-merge-queue-remove",{bead_id:y},g,S);return}if(ee.contains("worker-mini__discard-abandon")){let de={kind:b.dataset.operationKind||"",last_error:b.dataset.lastError||""};if(!p(zo(y,de)))return;Ze({bead_id:y,operation_id:b.dataset.operationId||""},g,S,de);return}if(ee.contains("worker-mini__discard")){let de=b.dataset.discardMode==="merged"?"merged":"unmerged";if(!p(Wo(y,de)))return;We({bead_id:y,...b.dataset.attemptId?{attempt_id:b.dataset.attemptId}:{},...b.dataset.operationId?{operation_id:b.dataset.operationId}:{}},g,S);return}if(ee.contains("worker-mini__revise-fix")){ge("worker-revise-fix",{bead_id:y},g,S);return}ee.contains("worker-mini__revise-approve")&&me("worker-revise-approve",{bead_id:y},g,S)}function tn(b){let y=Ve.consumeClickSuppression(),f=b.target;if(!f||typeof f.closest!="function"||f.closest("dialog")||f.closest(".worker-drawer-overlay")||f.closest("a"))return;let g=f.closest(".worker-card__id, .worker-mini__id, .rtile__id");if(g){b.preventDefault();let we=f.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||g.textContent?.trim()||"";we&&Ot(we);return}let S=f.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(S){b.preventDefault();let C=S.getAttribute("data-root-dir")||re.get(f.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||S.getAttribute("title")||"";vt(C);return}let Q=f.closest(".mon2-sec__toggle");if(Q){b.preventDefault(),Ne(Q.getAttribute("data-root-dir")||"");return}let ee=f.closest(".worker-pane__toggle[data-lane]");if(ee){b.preventDefault();let C=ee.getAttribute("data-lane")||"";(C==="candidate"||C==="queue"||C==="running"||C==="pr_wait"||C==="done")&&lt(C);return}let de=f.closest(".worker-wait__area-toggle[data-area]");if(de){b.preventDefault(),Ue(de.getAttribute("data-area")||"parallel");return}if(f.closest(".mon2-newlane")){b.preventDefault(),St("create","");return}let rt=f.closest(".mon2-clane__confirm, .mon2-clane__reapply, .mon2-clane__remove, .mon2-clane__run, .mon2-clane__stop");if(rt){b.preventDefault();let C=rt.getAttribute("data-lane-id")||"",we=rt.classList;St(we.contains("mon2-clane__confirm")?"confirm":we.contains("mon2-clane__reapply")?"reapply":we.contains("mon2-clane__run")?"run":we.contains("mon2-clane__stop")?"stop":"remove",C);return}if(f.closest(".mon-merge-all")){b.preventDefault(),z();return}let dt=f.closest(".mon-filter__spec");if(dt){b.preventDefault(),v={...v,spec:dt.getAttribute("data-spec")||"all"},af(v),ce();return}let at=f.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!at)return;let $t=at.getAttribute("data-bead-id")||"",x=f.closest("button");if(x){b.preventDefault(),dn(x,$t);return}f.closest(".rtile__failure-pop, .chip-popover")||$t&&!y&&(b.preventDefault(),je($t,at.getAttribute("data-root-dir")||ht($t).root_dir))}function $e(b){let y=b.target;if(!y||typeof y.closest!="function")return;let f=y.closest(".mon-filter__blocked");if(f){v={...v,show_blocked:f.checked},af(v),ce();return}let g=y.closest(".mon-candidate-sort");if(g){O=Yo.some(ee=>ee.value===g.value)?g.value:"repo_spec",Xy(O),ce();return}let S=y.closest(".mon-running-sort");if(S){m=S.value==="repo"?"repo":"started",nv(m),ce();return}let Q=y.closest(".mon-done-range");Q&&(h=qn(Q.value),ev(h),ce())}function E(b){let y=b.target,f=y&&typeof y.closest=="function"?g=>y.closest(g):()=>null;M&&!f(".rtile__failure-pop, .rtile__failure-badge")&&(M=null,ce())}function be(b){b.key!=="Escape"||M===null||(M=null,ce())}e.addEventListener("click",tn),e.addEventListener("change",$e),document.addEventListener("click",E),document.addEventListener("keydown",be),W.attach(),Ve.attach(e);{let b=!0;F=Yi(y=>{if(ae=y,b){b=!1;return}ce()})}o&&typeof o.subscribe=="function"&&(ye=o.subscribe(()=>{try{ve.clear(),ce()}catch{}}));function De(){Oe!==null&&(clearInterval(Oe),Oe=null)}return{recorrectSharedLane:Vt,load(){n("load"),ce(),Oe===null&&(Oe=setInterval(()=>{try{ce()}catch{}},rv))},pause(){De()},clear(){De(),Ve.detach(),ye&&(ye(),ye=null),F&&(F(),F=null),Le.destroy(),te.hidden=!0,_e?.destroy(),_e=null,e.removeEventListener("click",tn),e.removeEventListener("change",$e),document.removeEventListener("click",E),document.removeEventListener("keydown",be),W.detach(),e.replaceChildren()}}}function hf(e,t,n){let r=Ct("views:nav"),{global_element:o,repo_element:s}=e,i=null;function l(h){return m=>{m.preventDefault();let v=h==="monitor"&&a()==="monitor"?"worker":h;r("click tab %s",v),n.gotoView(v)}}function a(){let h=t.getState();return h.view==="worker"||h.view==="monitor"?h.view:"board"}function u(){let h=a();return c`
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
    `}function p(){o&&ot(u(),o),s&&ot(d(),s)}return p(),i=t.subscribe(()=>p()),{destroy(){i&&(i(),i=null),o&&ot(c``,o),s&&ot(c``,s)}}}var bf=["bug","feature","task","epic","chore"];function yf(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var vf=["Critical","High","Medium","Low","Backlog"];function wf(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),o=n.querySelector("#new-title"),s=n.querySelector("#new-type"),i=n.querySelector("#new-priority"),l=n.querySelector("#new-labels"),a=n.querySelector("#new-description"),u=n.querySelector("#new-issue-error"),d=n.querySelector("#btn-cancel"),p=n.querySelector("#btn-create"),h=n.querySelector(".new-issue__close");function m(){s.replaceChildren();let L=document.createElement("option");L.value="",L.textContent="\u2014 Select \u2014",s.appendChild(L);for(let M of bf){let W=document.createElement("option");W.value=M,W.textContent=yf(M),s.appendChild(W)}i.replaceChildren();for(let M=0;M<=4;M+=1){let W=document.createElement("option");W.value=String(M);let K=vf[M]||"Medium";W.textContent=`${M} \u2013 ${K}`,i.appendChild(W)}}m();function v(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function O(L){o.disabled=L,s.disabled=L,i.disabled=L,l.disabled=L,a.disabled=L,d.disabled=L,p.disabled=L,p.textContent=L?"Creating\u2026":"Create"}function B(){u.textContent=""}function V(L){u.textContent=L}function ae(){try{let L=window.localStorage.getItem("beads-ui.new.type");L?s.value=L:s.value="";let M=window.localStorage.getItem("beads-ui.new.priority");M&&/^\d$/.test(M)?i.value=M:i.value="2"}catch{s.value="",i.value="2"}}function F(){let L=s.value||"",M=i.value||"";L.length>0&&window.localStorage.setItem("beads-ui.new.type",L),M.length>0&&window.localStorage.setItem("beads-ui.new.priority",M)}async function q(){B();let L=String(o.value||"").trim();if(L.length===0){V("Title is required"),o.focus();return}let M=Number(i.value||"2");if(!(M>=0&&M<=4)){V("Priority must be 0..4"),i.focus();return}let W=String(s.value||""),K=String(a.value||""),H={title:L};W.length>0&&(H.type=W),String(M).length>0&&(H.priority=M),K.length>0&&(H.description=K),O(!0);try{await t("create-issue",H)}catch{O(!1),V("Failed to create issue");return}F(),O(!1),v()}return n.addEventListener("cancel",L=>{L.preventDefault(),v()}),h.addEventListener("click",()=>v()),d.addEventListener("click",()=>v()),n.addEventListener("keydown",L=>{L.key==="Enter"&&(L.ctrlKey||L.metaKey)&&(L.preventDefault(),q())}),r.addEventListener("submit",L=>{L.preventDefault(),q()}),{open(){r.reset(),B(),ae();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{o.focus()}catch{}},0)},close(){v()}}}var iv=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked\xB7\uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694 \uCE69"],["stepper","stepper"]];function av(e,t){return ba(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function kf(e,t,n){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?c`<div class="settings-dialog__empty">라벨 없음</div>`:c`<div class="settings-dialog__pills">
            ${t.map(r=>{let o=av(r,e);return c`<button
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
  `}function $f(e,t,n){return c`
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
  `}function xf(e,t){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${iv.map(([n,r])=>c`<label class="settings-dialog__toggle">
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
  `}var lv=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function Af(e,t){let{transport:n,policyStore:r,labelOptions:o}=t,s=t.notify||(J=>he(J,"error",4e3)),i=document.createElement("dialog");i.id="settings-dialog",i.className="settings-dialog",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),i.setAttribute("aria-label","\uC124\uC815"),e.appendChild(i);let l="execution",a=!1,u="",d=null;function p(){if(d)return d;let J=i.querySelector('[data-pane="execution"]');return J?(d=ta(J,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:n,implPresetStore:t.implPresetStore,notify:s,onQueueAdopt:fe=>t.queueStore?.set?.(fe)}),d):null}function h(){return c`
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
    `}function m(){let J=r.get();return c`
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
              ${kf(J,o(),V)}
              ${$f(J,u,{onDraft:fe=>{u=fe},onAdd:ae,onRemove:F})}
              ${xf(J,q)}
            `:c`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function v(J){let fe=r.get();if(fe)try{let Ce=await n("display-policy-set",{expected_revision:fe.revision,policy:J(fe)});O(Ce),Ce&&Ce.conflict&&Ce.policy&&(Ce=await n("display-policy-set",{expected_revision:Ce.policy.revision,policy:J(Ce.policy)}),O(Ce)),Ce&&Ce.conflict&&s("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{s("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function O(J){J&&J.policy&&typeof J.policy=="object"&&r.set(J.policy)}function B(J){v(J)}function V(J){let fe=r.get();if(!fe)return;let Ce=!cv(J,fe);B(U=>uv(J,U,Ce))}function ae(){let J=u.trim();J.length!==0&&(u="",B(fe=>fe.hidden_prefixes.includes(J)?{hidden_prefixes:fe.hidden_prefixes}:{hidden_prefixes:[...fe.hidden_prefixes,J]}),L())}function F(J){B(fe=>({hidden_prefixes:fe.hidden_prefixes.filter(Ce=>Ce!==J)}))}function q(J){let fe=r.get();if(!fe)return;let Ce=fe.chips[J]===!1;B(()=>({chips:{[J]:Ce}}))}function L(){ot(c`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${lv.map(J=>c`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${J.id}
                  aria-selected=${String(l===J.id)}
                  aria-controls=${`settings-pane-${J.id}`}
                  @click=${()=>M(J.id)}
                >
                  <span class="settings-dialog__glyph">${J.glyph}</span>
                  ${J.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${X}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${h()} ${m()}
          </div>
        </div>
      `,i),p()}function M(J){l=J,L()}let W=()=>{a=!1,t.onOpenChange?.(!1)};i.addEventListener("close",W),i.addEventListener("cancel",W);let K=J=>{J.target===i&&X()};i.addEventListener("click",K);let H=null;r.subscribe&&(H=r.subscribe(()=>{a&&L()}));let D=null;t.implPresetStore?.subscribe&&(D=t.implPresetStore.subscribe(()=>{a&&d?.render()}));function G(J="execution"){a||(a=!0,t.onOpenChange?.(!0),l=J,u="",L(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""),p()?.load())}function X(){a&&(a=!1,t.onOpenChange?.(!1),typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:G,close:X,sessionDraft:()=>d?.sessionDraft()??{},destroy(){a=!1,i.removeEventListener("close",W),i.removeEventListener("cancel",W),i.removeEventListener("click",K),H&&(H(),H=null),D&&(D(),D=null),d?.destroy(),d=null,i.remove()}}}function cv(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(n=>n.length>0&&e.startsWith(n))}function uv(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(s=>s!==e)};let r=t.hidden_labels.filter(s=>s!==e);return t.hidden_prefixes.some(s=>s.length>0&&e.startsWith(s))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}var dv=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],Sf="usage-meter-card",pv="usage-meter-layer",jl=600,fv=["token_expired","relogin_required"];function Ef(e){return String(e).padStart(2,"0")}function _v(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),o=Math.floor(n%1440/60),s=n%60;return r>0?`${r}d${o>0?` ${o}h`:""}`:o>0?`${o}h${s>0?` ${s}m`:""}`:`${s}m`}function Tf(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),o=new Date(t),s=`${Ef(r.getHours())}:${Ef(r.getMinutes())}`,l=r.getFullYear()===o.getFullYear()&&r.getMonth()===o.getMonth()&&r.getDate()===o.getDate()?s:`${dv[r.getMonth()]} ${r.getDate()} ${s}`;return`${_v(n,t)} \xB7 ${l}`}function mv(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function Cf(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function Rf(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var Of=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function If(e){let t=[];for(let n of e){if(!n||typeof n!="object")continue;let r=n;typeof r.key!="string"||r.key.length===0||typeof r.pct!="number"||!Number.isFinite(r.pct)||t.push({key:r.key,pct:r.pct,resetsAt:typeof r.resetsAt=="string"?r.resetsAt:""})}return t}function gv(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:If(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function hv(e,t){if(!e||typeof e!="object")return null;let n=e,r=[];if(Array.isArray(n.accounts))for(let s of n.accounts){let i=gv(s);i&&r.push(i)}let o=n.available===!0&&Array.isArray(n.windows);return!o&&r.length===0?null:{available:o,windows:o?If(n.windows):[],ageSeconds:typeof n.ageSeconds=="number"&&Number.isFinite(n.ageSeconds)?n.ageSeconds:null,accounts:r,receivedAtMs:t,held:!1}}function bv(e,t){if(!e||typeof e!="object")return{kind:"error"};let n=hv(e,t);return n?{kind:"ok",snapshot:n}:Array.isArray(e.accounts)?{kind:"empty"}:{kind:"error"}}function Mf(e,t){return(e.ageSeconds===null?0:e.ageSeconds)+Math.max(0,t-e.receivedAtMs)/1e3}function yv(e,t){return!e.held||Mf(e,t)<=jl?e:{...e,available:!1,windows:[],accounts:[]}}function Lf(e,t){return`${e}:${t}`}function Pf(e){let t=!1,n=null,r=new Map,o=null,s=new Map,i=new Map,l=0,a=null;function u(){ot(c``,e),e.hidden=!0,p()}function d(){if(a===null){let U=e.ownerDocument;a=U.createElement("div"),a.id=pv,a.className="usage-meter__layer",U.body.appendChild(a)}return a}function p(){a!==null&&(ot(c``,a),a.remove(),a=null)}function h(U){n!==U&&(n===null&&(document.addEventListener("mousedown",v),document.addEventListener("keydown",B),window.addEventListener("resize",O)),n=U)}function m(){n!==null&&(n=null,document.removeEventListener("mousedown",v),document.removeEventListener("keydown",B),window.removeEventListener("resize",O))}function v(U){let te=U.target;te&&(e.contains(te)||a!==null&&a.contains(te))||(m(),X())}function O(){X()}function B(U){U.key==="Escape"&&(m(),X())}function V(U){n===U?m():h(U),X()}function ae(){m(),X()}async function F(U,te){if(r.has(U.key))return;let xe=Lf(U.key,te);r.set(U.key,te),i.delete(xe),X();let Ee=null;try{Ee=await(await fetch(U.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:te})})).json()}catch{Ee=null}if(t)return;if(r.delete(U.key),!Ee||Ee.ok!==!0){let re=Ee&&typeof Ee.error=="string"&&Ee.error.length>0?Ee.error:"network_error";i.set(xe,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${re}`}),X();return}let R=Array.isArray(Ee.warnings)?Ee.warnings.filter(re=>typeof re=="string"&&re.length>0):[];R.length>0&&i.set(xe,{kind:"warn",text:R.join(" \xB7 ")}),X(),await Ce()}function q(U,te,xe,Ee){let R=Rf(U.pct),ve=`resets ${Tf(U.resetsAt,Ee)}${te?` \xB7 ${xe}`:""}`;return c`<span
      class="usage-meter__window ${Cf(R)}"
      style=${`--progress: ${R}%`}
      title=${ve}
    >
      <span class="usage-meter__label">${U.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${R}%</span>
    </span>`}function L(U,te,xe){let Ee=Mf(te,xe),R=te.available&&(te.held||Ee>jl),re=R?`${Math.floor(Ee/60)}\uBD84 \uC804 \uCE21\uC815`:"",ve=te.accounts.filter(Le=>!Le.active).length,ye=`usage-meter__group${R?" usage-meter__group--stale":""}`,Oe=c`<span class="usage-meter__provider"
        >${U.label}</span
      >
      ${te.available?te.windows.map(Le=>q(Le,R,re,xe)):c`<span class="usage-meter__empty">사용량 없음</span>`}
      ${ve>0?c`<span class="usage-meter__badge">+${ve}</span>`:""}`;if(te.accounts.length===0)return c`<span
        class=${ye}
        aria-label=${`${U.label} usage`}
        >${Oe}</span
      >`;let _e=n===U.key;return c`<button
      type="button"
      class=${`usage-meter__toggle ${ye}`}
      aria-label=${`${U.label} usage`}
      aria-expanded=${_e?"true":"false"}
      aria-controls=${Sf}
      @click=${()=>V(U.key)}
    >
      ${Oe}
    </button>`}function M(U,te){return c`<span class="usage-meter" aria-label="Usage">
      ${U.map(xe=>L(xe.provider,xe.snapshot,te))}
    </span>`}function W(U,te){let xe=Rf(U.pct),Ee=Tf(U.resetsAt,te);return c`<span
      class="usage-meter__account-window ${Cf(xe)}"
      style=${`--progress: ${xe}%`}
    >
      <span class="usage-meter__account-key">${U.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${xe}%</span>
      <span class="usage-meter__account-reset"
        >${Ee.length>0?`\u21BB ${Ee}`:""}</span
      >
    </span>`}function K(U,te){return fv.includes(te)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${U.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function H(U,te,xe){let Ee=te.status==="ok",R=typeof te.ageSeconds=="number"&&te.ageSeconds>jl,re=i.get(Lf(U.key,te.number)),ve=r.get(U.key),ye=ve!==void 0,Oe=ve===te.number,_e=["usage-meter__account"];return te.active&&_e.push("usage-meter__account--active"),Ee||_e.push("usage-meter__account--unavailable"),R&&_e.push("usage-meter__account--stale"),c`<div class=${_e.join(" ")}>
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
              >${mv(te.ageSeconds)}</span
            >`}
        ${te.active?"":c`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${ye}
              @click=${()=>{F(U,te.number)}}
            >
              ${Oe?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${Ee?c`<div class="usage-meter__account-windows">
            ${te.windows.map(Le=>W(Le,xe))}
          </div>`:c`<div class="usage-meter__account-status">
            ${K(U,te.status)}
          </div>`}
      ${re===void 0?"":c`<div
            class="usage-meter__account-message usage-meter__account-message--${re.kind}"
          >
            ${re.text}
          </div>`}
    </div>`}function D(U,te,xe){let Ee=te.accounts.filter(R=>R.active).length;return c`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${U.label} · 활성 ${Ee} / 전체
        ${te.accounts.length}
      </h2>
      ${te.accounts.map(R=>H(U,R,xe))}
    </section>`}function G(U,te){return c`<div
      class="usage-meter__card"
      id=${Sf}
      role="dialog"
      aria-label=${`${U.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${D(U.provider,U.snapshot,te)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function X(){let U=Date.now(),te=[];for(let Ee of Of){let R=s.get(Ee.key);R&&te.push({provider:Ee,snapshot:yv(R,U)})}if(te.length===0){m(),u();return}let xe=te.find(Ee=>Ee.provider.key===n&&Ee.snapshot.accounts.length>0);xe||m(),ot(M(te,U),e),e.hidden=!1,xe?J(xe,U):p()}function J(U,te){let xe=d(),Ee=e.getBoundingClientRect(),R=e.ownerDocument.documentElement.clientWidth;xe.style.setProperty("--usage-meter-anchor-top",`${Ee.bottom}px`),xe.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,R-Ee.right)}px`),ot(c`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${ae}
        ></div>
        ${G(U,te)}`,xe)}async function fe(U){try{let te=await fetch(U.endpoint);return te.ok?bv(await te.json(),Date.now()):{kind:"error"}}catch{return{kind:"error"}}}async function Ce(){l+=1;let U=l,te=await Promise.all(Of.map(async xe=>({provider:xe,read:await fe(xe)})));if(!(t||U!==l)){for(let xe of te){let Ee=xe.provider.key;if(xe.read.kind==="ok"){s.set(Ee,xe.read.snapshot);continue}if(xe.read.kind==="empty"){s.delete(Ee);continue}let R=s.get(Ee);R!==void 0&&!R.held&&s.set(Ee,{...R,held:!0})}X()}}return u(),Ce(),o=setInterval(()=>{Ce()},6e4),{destroy(){t=!0,o!==null&&(clearInterval(o),o=null),m(),u()}}}function ms(e){let t=e?.blocked_info;return t&&typeof t=="object"?Array.isArray(t.blockers)?t.blockers.filter(r=>typeof r=="string"&&r.length>0):[]:(Array.isArray(e?.dependencies)?e.dependencies:[]).map(r=>{if(typeof r=="string")return r;if(!r||typeof r!="object")return"";let o=r.type??r.dependency_type;return o!==void 0&&o!=="blocks"?"":r.depends_on_id||r.id||""}).filter(Boolean)}var qf="bdui.worker.candidate_sort",gs=Object.freeze([{id:"spec",label:"spec \uC6B0\uC120",chain:[{key:"spec",dir:"desc"},{key:"created",dir:"asc"}]},{id:"bottleneck",label:"\uBCD1\uBAA9 \uC6B0\uC120",chain:[{key:"priority",dir:"asc"},{key:"dependents",dir:"desc"},{key:"released",dir:"desc"}]},{id:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131",chain:[{key:"created",dir:"desc"},{key:"priority",dir:"asc"}]},{id:"updated",label:"\uCD5C\uC2E0 \uC218\uC815",chain:[{key:"updated",dir:"desc"}]}]),ra=Object.freeze({preset:"spec"}),jf=3,Ff=Object.freeze([{key:"priority",label:"\uC6B0\uC120\uC21C\uC704"},{key:"dependents",label:"\uD6C4\uC18D \uC218"},{key:"released",label:"\uD574\uC81C \uC2DC\uAC01"},{key:"spec",label:"spec \uC720\uBB34"},{key:"created",label:"\uC0DD\uC131"},{key:"updated",label:"\uC218\uC815"}]);function Df(e){return gs.some(t=>t.id===e)}function Nf(e){let t=gs.find(n=>n.id===e);return t?t.chain.map(n=>({...n})):[]}function vv(e,t){return e.length===t.length&&e.every((n,r)=>n.key===t[r].key&&n.dir===t[r].dir)}function hs(e){return e&&"preset"in e?Nf(e.preset):e&&Array.isArray(e.chain)?e.chain.map(t=>({...t})):Nf("spec")}function Fl(e){return e&&"preset"in e?e.preset:null}function Nr(e){if(typeof e=="string"){let s;try{s=JSON.parse(e)}catch{return Df(e)?{preset:e}:ra}return Nr(s)}if(!e||typeof e!="object")return ra;let t=e;if(Df(t.preset))return{preset:t.preset};let n=t.chain;if(!Array.isArray(n)||n.length===0||n.length>jf||!n.every(_a))return ra;let r=[];for(let s of n)r.some(i=>i.key===s.key)||r.push({key:s.key,dir:s.dir});let o=gs.find(s=>vv(s.chain,r));return o?{preset:o.id}:{chain:r}}function Bf(){try{return Nr(window.localStorage.getItem(qf))}catch{return ra}}function Bl(e){try{window.localStorage.setItem(qf,JSON.stringify(e))}catch{}}function Uf(e,t,n){let r=e.map(a=>({...a}));if(!n)return r.slice(0,t);if(!Object.prototype.hasOwnProperty.call(Ms,n))return r;let o=n;if(r.slice(0,t).some(a=>a.key===o))return r.slice(0,t);let s={key:o,dir:r[t]&&r[t].key===o?r[t].dir:Ms[o]},i=r.slice(0,t),l=r.slice(t+1).filter(a=>a.key!==o);return[...i,s,...l].slice(0,jf)}function Wf(e,t){return e.map((n,r)=>r===t?{key:n.key,dir:n.dir==="asc"?"desc":"asc"}:{...n})}function wv(e){let t=new Set(e.map(l=>l.id)),n=new Map,r=new Map;for(let l of e){let a=ms(l).filter(u=>t.has(u));n.set(l.id,a);for(let u of a){let d=r.get(u);d?d.push(l):r.set(u,[l])}}let o=new Set,s=[],i=l=>{o.add(l.id),s.push(l);for(let a of r.get(l.id)??[])!o.has(a.id)&&(n.get(a.id)??[]).every(u=>o.has(u))&&i(a)};for(;s.length<e.length;){let l=e.find(a=>!o.has(a.id)&&(n.get(a.id)??[]).every(u=>o.has(u)));i(l??e.find(a=>!o.has(a.id)))}return s}function zf(e,t){let n=Array.isArray(e)?e.slice():[];return n.sort(Ec(hs(t))),wv(n)}function Hf(e,t){let n=new Map;if(!e||typeof e!="object")return n;let r=e,o=[],s=new Set;for(let i of t){if(s.has(i.id))continue;s.add(i.id);let l=r[i.id];if(!l||!Array.isArray(l.scope))continue;let a=l.scope.filter(u=>typeof u=="string"&&u.length>0);if(a.length===0){n.set(i.id,{overlaps:[],scope_missing:!0});continue}n.set(i.id,{overlaps:[],scope_missing:!1}),o.push({member:i,scope:a})}for(let i=0;i<o.length;i+=1)for(let l=i+1;l<o.length;l+=1){let a=ri(o[i].scope,o[l].scope);if(a.length===0)continue;let u=o[i].member,d=o[l].member;n.get(u.id)?.overlaps.push({id:d.id,title:d.title,location_label:d.location_label,prefixes:a}),n.get(d.id)?.overlaps.push({id:u.id,title:u.title,location_label:u.location_label,prefixes:a})}return n}var Gf=new Set(["sh","bash","zsh","dash","ksh"]),Kf=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function Yf(e){let t=e.split("/");return t[t.length-1]||""}function kv(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let n=t.slice(2).trim().split(/\s+/).filter(Boolean);if(n.length===0)return!1;let r=Yf(n[0]);if(r!=="env")return Gf.has(r);let o=n.slice(1).find(s=>!s.startsWith("-")&&!s.includes("="));return o!==void 0&&Gf.has(Yf(o))}function $v(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function xv(e){let t=[],n=0;Kf.lastIndex=0;for(let r of e.matchAll(Kf)){let o=r.index;o>n&&t.push({text:e.slice(n,o),kind:"plain"}),t.push({text:r[0],kind:$v(r[0])}),n=o+r[0].length}return n<e.length&&t.push({text:e.slice(n),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function Av(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function Vf(e){let t=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),r=document.createElement("div");r.className="repo-ops-script-viewer-root",document.body.appendChild(r);let o=null,s="loading",i="",l="",a=0,u=null,d=!1;function p(L,M){return M?xv(L).map(W=>W.kind==="plain"?W.text:c`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${W.kind}"
            >${W.text}</span
          >`):L}function h(){if(!o)return c``;let L=s==="ready"&&kv(i),M=s==="ready"?i.split(`
`):[];return c`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${o.path}`}
    >
      <div
        class="repo-ops-script-viewer__backdrop"
        @click=${()=>F()}
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
              @click=${()=>{v()}}
            >
              복사
            </button>
            <button
              type="button"
              class="repo-ops-script-viewer__close"
              aria-label="스크립트 팝업 닫기"
              @click=${()=>F()}
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
                  ${M.map((W,K)=>c`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${K+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${p(W,L)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function m(){ot(h(),r)}async function v(){if(s!=="ready")return;let L=await sn(i);he(L?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",L?"success":"error")}function O(L){L.key==="Escape"&&o&&(L.preventDefault(),F())}function B(){d||(document.addEventListener("keydown",O),d=!0)}function V(){d&&(document.removeEventListener("keydown",O),d=!1)}async function ae(L,M=null){let W=++a;B(),o={...L},u=M||(document.activeElement instanceof HTMLElement?document.activeElement:null),s="loading",i="",l="",m(),r.querySelector(".repo-ops-script-viewer__close")?.focus();let H=t?t():"";if(!H){s="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",m();return}if(!n){s="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",m();return}let D="/api/repo-ops-script?workspace="+encodeURIComponent(H)+"&lane="+encodeURIComponent(L.lane)+"&base_sha="+encodeURIComponent(L.base_sha);try{let G=await n(D),X=await G.json().catch(()=>({}));if(W!==a)return;if((t?t():"")!==H){F();return}if(!G.ok||!X||X.ok!==!0){s="error",l=Av(X&&typeof X.error=="string"?X.error:""),m();return}o={lane:X.lane,base_sha:X.base_sha,path:X.path,base_ref:X.base_ref},i=String(X.content),s="ready",m()}catch{if(W!==a)return;s="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",m()}}function F(){a+=1,V(),o=null,i="",m();let L=u;u=null,L?.isConnected&&L.focus()}function q(){F(),r.remove()}return{open:ae,close:F,destroy:q}}var Xf={deploy_not_declared:"\uC120\uC5B8 \uC5C6\uC74C",deploy_opted_out:"\uC774 workspace\uC5D0\uC11C \uBC30\uD3EC \uC2E4\uD589\uC774 \uAEBC\uC838 \uC788\uC74C",deploy_in_flight:"\uBC30\uD3EC \uC9C4\uD589 \uC911",target_unresolved:"\uB300\uC0C1 tip\uC744 \uD655\uC815\uD558\uC9C0 \uBABB\uD568",remote_history_not_monotonic:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uC640 \uC6D0\uACA9 \uC774\uB825\uC774 \uAC08\uB77C\uC9D0"},Sv=new Set(["queued","running","retry_pending"]);function Qf(e){let t=e.queueStore,n=e.transport,r=e.onChanged||(()=>{}),o=e.onOpenScript;function s(){return t&&t.get()||{}}function i(){let D=s();return typeof D.revision=="number"?D.revision:0}function l(D){t&&D&&D.queue&&typeof D.queue=="object"&&t.set(D.queue)}function a(){let D=s().workspace_info;return D&&typeof D=="object"?D:{}}function u(D,G){return c`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${D}"
      >${G}</span
    >`}function d(D){if(typeof D!="number"||!Number.isFinite(D))return"";let G=D/6e4;return Number.isInteger(G)?`timeout ${G}\uBD84`:`timeout ${Math.round(D/1e3)}\uCD08`}function p(D){let G=d(D);return G?u("config",G):""}function h(D,G,X){return c`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${X.script}
      @click=${J=>{o&&o({lane:D,base_sha:G.base_sha,path:X.script,base_ref:G.base_ref},J.currentTarget)}}
    ></button>`}function m(){let D=s().repo_operations;return Array.isArray(D)?D:[]}function v(){let D=a().repo_ops,G=D&&typeof D=="object"?D.repo_id:null;return typeof G=="string"&&G?G:null}function O(){return m().some(D=>D&&D.kind==="deploy"&&Sv.has(D.state))}function B(){let D=O(),G=v()===null;return c`<button
      type="button"
      class="worker-repo-ops__deploy-run"
      data-seam="repo-ops-deploy-run"
      ?disabled=${D||G}
      title=${D?"\uBC30\uD3EC \uC9C4\uD589 \uC911":G?"\uC800\uC7A5\uC18C\uB97C \uD655\uC778\uD560 \uC218 \uC5C6\uC74C":"\uC6D0\uACA9 base tip\uC5D0\uC11C \uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uB97C 1\uD68C \uC2E4\uD589\uD569\uB2C8\uB2E4"}
      @click=${()=>{M()}}
    >
      배포 실행
    </button>`}function V(){let D=s().repo_ops_opt_out;return{verify:D?.verify===!0,deploy:D?.deploy===!0}}function ae(D,G){return c`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!G}
        @change=${X=>{L(D,!X.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function F(D){let G=typeof D.base_sha=="string"?D.base_sha:"",X=`${D.source_path||"repo-ops/config.toml"} @ ${D.base_ref||"?"}${G?`@${G.slice(0,7)}`:""}`,J=V(),fe=!!D.verify&&J.verify,Ce=!!D.deploy&&J.deploy;return c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${X}</span>
      </p>
      <div
        class="worker-repo-ops__lane${fe?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${D.verify?c`${h("verify",D,D.verify)}
              ${p(D.verify.timeout_ms)}
              ${fe?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:c`선언 없음${u("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${fe?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":D.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${D.verify?ae("verify",J.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${Ce?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${D.deploy?c`${h("deploy",D,D.deploy)}
              ${p(D.deploy.timeout_ms)}
              ${Ce?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):B()}`:c`선언 없음${u("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${Ce?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":D.deploy?c`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${D.deploy?ae("deploy",J.deploy):""}
      </div>
    </section>`}function q(D){let G=D.repo_ops&&typeof D.repo_ops=="object"?D.repo_ops:null;return G&&(G.status==="resolved"||G.status==="absent")?F(G):G&&(G.status==="pending"||G.status==="error")?c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${G.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":c`선언 읽기
              실패${G.error_code?c` — <code>${G.error_code}</code>`:""}`}
        </div>
      </section>`:c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function L(D,G){if(!n)return;let X=await n("worker-repo-ops-opt-out-toggle",{kind:D,opted_out:G,expected_revision:i()});if(l(X),X&&X.conflict){let J=await n("worker-repo-ops-opt-out-toggle",{kind:D,opted_out:G,expected_revision:i()});l(J)}r()}async function M(){let D=v();if(!n||D===null)return;let G=await n("worker-repo-operation-deploy-run",{repo_id:D});if(l(G),!G||G.ok!==!0){let X=G&&typeof G.reason=="string"?G.reason:"",J=Object.hasOwn(Xf,X)?Xf[X]:X||"\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";he(`\uBC30\uD3EC \uC2E4\uD589 \uAC70\uBD80 \u2014 ${J}`,"error")}else he("\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD588\uC2B5\uB2C8\uB2E4","success");r()}let W={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",repair_session_dispatch:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC790\uB3D9 \uC2E4\uD589",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC"};function K(D,G,X){return c`<div class="worker-repo-ops__policy-group" data-policy=${X}>
      <div class="worker-repo-ops__policy-label">${D}</div>
      <ul class="worker-repo-ops__policy-list">
        ${G.map(J=>c`<li data-token=${J}>
              ${W[J]||J}
            </li>`)}
      </ul>
    </div>`}function H(){let D=s(),G=D.repo_operation_policy&&typeof D.repo_operation_policy=="object"?D.repo_operation_policy:null;return G?c`<section
      class="worker-repo-ops__repair"
      data-seam="repo-ops-policy"
    >
      <details class="worker-repo-ops__policy" data-seam="policy-lists">
        <summary>
          Worker 자동 처리 기준
          <span class="worker-repo-ops__policy-count"
            >자동 ${(G.worker_automatic||[]).length} · 금지
            ${(G.never_automatic||[]).length}</span
          >
        </summary>
        ${G.supported===!1?c`<div
              class="worker-repo-ops__policy-group"
              data-policy="policy-schema"
            >
              ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uAC00 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${G.schema_version})`}
            </div>`:""}
        ${K("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",G.worker_automatic||[],"worker-automatic")}
        ${K("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",G.never_automatic||[],"never-automatic")}
      </details>
    </section>`:""}return{template(){return c`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언
        </summary>
        ${q(a())} ${H()}
      </details>`}}}var e_=20,Ev=5,Tv=new Set(["failed","running","queued","retry_pending"]),Ul={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC",job:"\uBA38\uC9C0 \uD6C4 \uC7A1"},Zf={verify:"verify",deploy:"deploy",job:"deploy"};function Cv(e){if(typeof e!="string")return"";let t=e.split("/").filter(n=>n.length>0);return t.length>0?t[t.length-1]:""}function Rv(e){return!e||typeof e!="object"?"":e.kind==="job"?Cv(e.script_path)||Ul.job:Object.hasOwn(Ul,e.kind)?Ul[e.kind]:e.kind}function Ov(e,t,n=e_){let r=[];for(let o of Array.isArray(e)?e:[])!o||typeof o!="object"||r.push({type:"operation",id:o.operation_id,at:typeof o.finished_at=="number"?o.finished_at:typeof o.requested_at=="number"?o.requested_at:null,operation:o});for(let o of Array.isArray(t)?t:[])!o||typeof o!="object"||r.push({type:"cleanup",id:o.bead_id,at:typeof o.at=="number"?o.at:null,cleanup:o});return r.sort((o,s)=>o.at===null&&s.at===null?String(o.id||"").localeCompare(String(s.id||"")):o.at===null?1:s.at===null?-1:s.at-o.at),r.slice(0,Math.max(0,n))}function Lv(e){if(e.type==="cleanup")return!0;let t=e.operation;return Tv.has(t.state)&&!t.dismissed&&!t.superseded_by}function Iv(e,t,n={}){let r=Ov(e,t,1/0),o=n.expanded===!0?e_:Ev,s=new Set(r.slice(0,o)),i=r.filter(l=>s.has(l)||Lv(l));return{visible:i,hidden:r.length-i.length}}function Jf(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function Mv(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function t_(e){let t=e.filter(n=>n.value);return t.length===0?"":c`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(n=>{let r=n.copy===!0?lo(n.value):n.value;return c`<div>
          <dt>${n.term}</dt>
          <dd>${r}</dd>
        </div>`})}
    </dl>
  </details>`}function n_(e,t="",n=!1){return!e&&!t?"":c`<p
    class="worker-ev__explain${n?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?c`<br />${t}`:""}
  </p>`}function Pv(e,t){if(!e||typeof e!="object")return;let n=t&&typeof t=="object"?t.kind:"";if(!Object.hasOwn(Zf,n))return;let r=e[Zf[n]],o=r&&typeof r=="object"?r.timeout_ms:void 0;return typeof o=="number"&&Number.isFinite(o)?o:void 0}function Dv(e,t){let n=Kp(e,t),r=Yp(e);return!n&&!r?"":c`<p class="worker-ev__why">
    ${n?c`<span class="worker-ev__why-line">${n}</span>`:""}${r?c`<span class="worker-ev__why-line">${r}</span>`:""}
  </p>`}function Nv(e){return e.state!=="failed"||e.superseded_by||e.dismissed?"":c`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-repo-op__dismiss"
      data-operation-id=${e.operation_id}
      title="사람이 확인한 실패로 접수합니다 — 기록은 그대로 남고 해결 필요 집계에서만 빠집니다"
    >
      기록 닫기
    </button>
  </div>`}function qv(e,t){let n=e.operation,r=n.state==="failed",o=n.failure?n.failure.code:"";return c`<li
    class="worker-ev"
    data-operation-id=${n.operation_id}
    data-state=${n.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?Kt(e.at):""}
      >${li(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${Jf(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what">${Rv(n)}</span>
        <span class="worker-ev__meta"
          >${n.target_base}@${ai(n.target_sha)}${typeof n.elapsed_ms=="number"?` \xB7 ${Or(n.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${Jf(e)}"
          >${Mv(e)}</span
        >
        ${n.dismissed?c`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${n.superseded_by?c`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
        ${n.source==="manual"?c`<span
              class="worker-ev__st worker-ev__st--manual"
              title="사람이 배포 실행을 눌러 시작한 작업입니다"
              >수동</span
            >`:""}
      </div>
      ${r?n_(Gp(n.failure_kind,o)):""}
      ${Dv(n,Pv(t,n))}
      ${Nv(n)}
      ${t_([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?o:""},{term:"script",value:[n.script_path||"",n.script_blob_sha?`blob ${ai(n.script_blob_sha)}`:"",Number.isInteger(n.exit_code)?`exit ${n.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:n.log_path||"",copy:!0},{term:"\uCD9C\uB825",value:n.output_tail||""}])}
    </div>
  </li>`}function jv(e){let t=e.cleanup,n=Lr(t.step);return c`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?Kt(e.at):""}
      >${li(e.at)||"\u2014"}</span
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
        ${id(t.step).map(r=>c`<li
              class="worker-step worker-step--${r.state}"
              data-step=${r.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${r.label}</span>
            </li>`)}
      </ol>
      ${n_(mr(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
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
      ${t_([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||"",copy:!0},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function Fv(e){let t=typeof e.hidden=="number"?e.hidden:0,n=e.expanded===!0;return c`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(r=>r.type==="cleanup"?jv(r):qv(r,e.repo_ops))}
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
  </section>`}function r_(e,t={}){let n=null;function r(){if(n===null){ot(c``,e);return}let i=Iv(n.operations,n.cleanup_failures,{expanded:n.expanded});ot(Fv({events:i.visible,hidden:i.hidden,expanded:n.expanded,repo:n.repo,repo_ops:n.repo_ops}),e)}e.addEventListener("click",i=>{let l=i.target;if(l?.closest?.('[data-seam="repo-ops-close"]')){s();return}l?.closest?.('[data-seam="repo-ops-more"]')&&n&&(n.expanded=!n.expanded,r())});function o(i){n={operations:i.operations,cleanup_failures:i.cleanup_failures,repo:i.repo||"",repo_ops:i.repo_ops||null,expanded:!1},r()}function s(){n!==null&&(n=null,r(),t.onClose&&t.onClose())}return{open:o,close:s,isOpen:()=>n!==null,refresh(i){n&&(n={operations:i.operations,cleanup_failures:i.cleanup_failures,repo:i.repo||"",repo_ops:i.repo_ops||null,expanded:n.expanded},r())}}}var Bv="session-preferred",Uv=["external_roundtrip","user_feedback_loop"];function o_(e,t){if(!jo(e).includes(Bv)||typeof t!="object"||t===null)return"";let n=t.session_preferred_reason;return typeof n=="string"&&Uv.includes(n)?n:""}var Wv="spec-after-blocker";function s_(e,t){return jo(e).includes(Wv)&&Array.isArray(t)&&t.length>0}var zv=Ct("views:worker:adapter"),Hv="tab:worker:ready",Gv="tab:worker:blocked",Kv="tab:worker:in-progress",Yv="tab:worker:resolved",Vv="tab:worker:closed",Xv="\u{1F512} blocked",Qv={revision:0,auto_advance:!1,auto_merge:!1,slots:Ai,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]},Zv=["claude_account","codex_account"],Jv=[...ro,...Zv];function ew(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function tw(e){let t=e&&typeof e=="object"?e.awaiting_user:void 0,n=typeof t=="string"?t.trim():"";return n.length>0?`${bi}: ${n}`:bi}function gr(e){return e&&typeof e=="object"?e:{}}function nw(e){let t={};for(let n of Jv){let r=e[n];typeof r=="string"&&r.length>0&&(t[n]=r)}return t}function rw(e){let t=new Map;for(let r of e){if(!r||typeof r.id!="string"||r.id.length===0)continue;let o=gr(r.metadata).carried_from;if(!(typeof o!="string"||o.length===0))for(let s of ms(r)){let i=t.get(s);i||(i=new Set,t.set(s,i)),i.add(r.id)}}let n=new Map;for(let[r,o]of t)n.set(r,[...o].sort());return n}function ow(e){let t=e.replace(/\/+$/,""),n=t.lastIndexOf("/");return n>=0?t.slice(n+1):t}function i_(e={}){let{queueStore:t,issueStores:n,transport:r,getWorkspacePath:o,onInvalidate:s}=e,i=n?Kr(n):null,l=new Map,a={},u=null,d=0,p=null,h=!1;function m(){h||!s||s()}function v(M){return u===M?a:{}}async function O(){if(!r||h)return;let M=o?.()||"";if(u===M||p&&p.key===M&&p.generation===d)return;let W=++d;p={key:M,generation:W};let K=null;try{K=await Promise.resolve(r("get-session-defaults",{}))}catch(H){if(W!==d)return;p=null,zv("get-session-defaults failed: %o",H),m();return}W===d&&(a=K&&typeof K.values=="object"&&K.values!==null?{...K.values}:{},u=M,p=null,m())}function B(){u=null,d+=1,O()}function V(){for(let[M,W]of l)W==="failed"&&l.delete(M)}function ae(M,W){return i?i.selectBoardColumn(M,W):[]}function F(M,W,K,H){let D=new Set(K.map(U=>U.id)),G=new Set,X=new Map,J=[];for(let U of[...W,...K]){if(G.has(U.id)||ew(U))continue;let te=Fo(U,M);te.location===null&&(G.add(U.id),X.set(U.id,te),J.push(U))}let fe=zf(J,Nr(H)),Ce=gr(M.bead_scope);return fe.map(U=>{let te=X.get(U.id),xe=Hr(U),Ee=xe.evidence==="published",R=typeof U.workflow?.route=="string"&&U.workflow.route||(U.metadata&&typeof U.metadata.route=="string"?U.metadata.route:""),re=te.worker_ineligible,ve=re||!Object.hasOwn(U,"labels")?"":o_(U.labels,U.metadata),ye=D.has(U.id),Oe=ye?ms(U):[],_e=[];ye&&Oe.length===0&&_e.push(Xv),te.awaiting_user&&_e.push(tw(U.metadata)),te.missing_description?_e.push("missing_description"):te.spec==="conflict"?_e.push("spec_id_conflict"):te.spec==="none"?_e.push("spec \uC5C6\uC74C"):te.spec==="draft"&&_e.push("spec \uBBF8\uBC1C\uD589(draft)");let Le=Ce[U.id];return{bead_id:U.id,title:U.title||U.id,route:R,spec_id:xe.conflict?"":xe.path,published:Ee,blocked:ye,blocked_by:Oe,labels:Array.isArray(U.labels)?U.labels:[],created_at:U.created_at,updated_at:U.updated_at,status:U.status,workflow:U.workflow||null,exec_pins:nw(gr(U.metadata)),rec:null,...Le&&Array.isArray(Le.scope)?{scope:Le.scope}:{},eligible:te.placeable,reason:_e.join(" \xB7 "),worker_ineligible:re,session_preferred:ve.length>0,session_preferred_reason:ve,spec_after_blocker:s_(U.labels,Oe),release_info:U.release_info,dependents_info:U.dependents_info}})}function q(M){let[W,K,H,D,G]=M,X=Ns([...W,...K,...H,...D,...G]),J=rw([...W,...K,...H,...D]),fe={},Ce=(U,te)=>{if(!U||typeof U.id!="string"||U.id.length===0)return;let xe=fe[U.id]||(fe[U.id]={});if(typeof U.priority=="number"&&!("priority"in xe)&&(xe.priority=U.priority),typeof U.from_id=="string"&&!("from_id"in xe)&&(xe.from_id=U.from_id),te&&!("metadata"in xe)){xe.metadata=gr(U.metadata);let Ee=gr(U.workflow).route;typeof Ee=="string"&&Ee.length>0&&(xe.route=Ee)}};for(let U of[...W,...K,...H])Ce(U,!0);for(let U of[...D,...G])Ce(U,!1);for(let U of new Set([...Object.keys(fe),...X.keys()])){let te=qs(X,U);if(te.total>0){let xe=fe[U]||(fe[U]={});xe.rollup=te}}for(let[U,te]of J){let xe=fe[U]||(fe[U]={});xe.carried_to=te}return fe}function L(M,W,K,H){let D=new Set((Array.isArray(M.done)?M.done:[]).map(X=>X?.bead_id).filter(X=>typeof X=="string")),G=[];for(let X of W){let J=sr(X.closed_at);if(typeof X.id!="string"||D.has(X.id)||J===null||H!==void 0&&J<H||typeof X.comment_count!="number"||X.comment_count<=0)continue;let fe=`${K}\0${X.id}\0${String(X.updated_at)}\0${X.comment_count}`,Ce=l.get(fe);if(Ce===void 0&&r&&(l.set(fe,"pending"),Promise.resolve(r("get-comments",{id:X.id})).then(te=>{let xe=Array.isArray(te)&&te.some(Ee=>Ui(typeof Ee?.text=="string"?Ee.text:"")?.lane==="session");l.set(fe,xe?"session":"not-session"),m()}).catch(()=>{l.set(fe,"failed"),m()})),Ce!=="session")continue;let U=sr(X.started_at);G.push({id:X.id,title:X.title||X.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:U!==null&&J>=U?J-U:null,work_kind:"session",done_at:J,created_at:X.created_at,updated_at:X.updated_at})}return G}return{read(M){if(!t)return{workspaces:[],workspaces_state:[]};let W=t.get()||Qv,K=o?.()||"",H=M&&typeof M.done_since=="number"?M.done_since:void 0,D=ae(Hv,"ready"),G=ae(Gv,"blocked"),X=ae(Kv,"in_progress"),J=ae(Yv,"resolved"),fe=ae(Vv,"closed");return{workspaces:[{...W,bead_titles:{...gr(W.bead_titles),...Object.fromEntries([...D,...G].filter(Ce=>Ce&&typeof Ce.id=="string").map(Ce=>[Ce.id,Ce.title||Ce.id]))},root_dir:K,name:ow(K),runnable:F(W,D,G,M?M.candidate_sort:void 0),session_done:L(W,fe,K,H),bead_overlay:q([D,G,X,J,fe])}],workspaces_state:[{root_dir:K,revision:W.revision,auto_advance:W.auto_advance,auto_merge:W.auto_merge,slots:typeof gr(W.workspace_info).slots=="number"?gr(W.workspace_info).slots:W.slots,runner_catalog:W.runner_catalog,execution_defaults:W.execution_defaults,session_defaults:v(K),orchestration_model:W.orchestration_model,orchestration_effort:W.orchestration_effort,orchestration_speed:W.orchestration_speed,issue_prefix:""}]}},ensureSessionDefaults(){O()},refreshSessionDefaults:B,notifyIssuesChanged:V,destroy(){h=!0,d+=1,p=null,l.clear()}}}var oa=1,a_=5,sw={root_dir:"",name:"",auto_advance:!1,auto_merge:!1,slots:oa,revision:0,runner_catalog:{},items:[],sublanes:{parallel:[],serial:[]},serial_lane_count:0,raw_queue_length:0,live_count:0,over_cap:!1,merge:{positions:new Map,resolutions:new Map,continuations:new Map,authorities:new Map,state:{active:null,failures:{},waiting:null},auto_excluded:[],running:!1},token_total:null,cleanup_failures:[],declared_base:null,repo_operations:[]};function _n(e){return e&&typeof e=="object"?e:{}}var u_="beads-ui.worker.candidate-filter",Wl={show_blocked:!1,spec:"all"};function iw(){try{let e=window.localStorage.getItem(u_);if(!e)return{...Wl};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Wl};let n=t.spec;return{show_blocked:t.show_blocked===!0,spec:n==="with"||n==="without"?n:"all"}}catch{return{...Wl}}}function aw(e){try{window.localStorage.setItem(u_,JSON.stringify(e))}catch{}}var lw=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],d_="bdui.worker.done-range";function cw(){try{let e=window.localStorage.getItem(d_);return e===null?"today":qn(e)}catch{return"today"}}function uw(e){try{window.localStorage.setItem(d_,e)}catch{}}function l_(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function dw(e){return e==="receipt_not_current"?"\uB9AC\uBDF0 \uD6C4\uC5D0\uB3C4 \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC74C":e==="cancelled"?"\uB9AC\uBDF0 \uC138\uC158 \uCDE8\uC18C\uB428":e.startsWith("launch_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uC2DC\uC791 \uC2E4\uD328(${e.slice(14)})`:e.startsWith("session_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uBE44\uC815\uC0C1 \uC885\uB8CC(${e.slice(15)})`:`\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD328(${e})`}function c_(e){if(e.startsWith("receipt_unbacked:"))return`\uC2E4\uD589 \uC601\uC218\uC99D \uC790\uB3D9 \uAC80\uC99D \uBD88\uAC00(${e.slice(17)}) \u2014 [\uBA38\uC9C0] \uD074\uB9AD\uC73C\uB85C \uC218\uB3D9 \uC9C4\uD589 \uAC00\uB2A5`;switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_rebase_cap":return"\uD050 \uC7AC\uCDA9\uB3CC 3\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"worktree_restore_branch_mismatch":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uBE0C\uB79C\uCE58 \uC774\uB984 \uBD88\uC77C\uCE58";case"worktree_restore_path_exists":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uACBD\uB85C \uC774\uBBF8 \uC788\uC74C";case"worktree_restore_branch_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 origin\uC5D0 \uBE0C\uB79C\uCE58 \uC5C6\uC74C";case"worktree_restore_branch_diverged":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uB85C\uCEEC \uBE0C\uB79C\uCE58\uAC00 origin\uACFC \uB2E4\uB984";case"worktree_restore_failed":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function pw(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function fw(e){switch(e){case"no_terminal_failure":return"\uC774 \uD589\uC5D0 \uC774\uC5B4\uBC1B\uC744 terminal \uC2E4\uD328 \uAE30\uB85D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";case"tmux_unavailable":return"tmux\uC5D0 \uB2FF\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC138\uC158\uC744 \uB744\uC6B0\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4";case"launch_failed:claude_not_found":return"claude \uC2E4\uD589 \uD30C\uC77C\uC744 PATH\uC5D0\uC11C \uCC3E\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";case"launch_failed:new_session":return"tmux \uC138\uC158\uC744 \uB9CC\uB4E4\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";case"launch_failed:new_window":return"tmux \uCC3D\uC744 \uB9CC\uB4E4\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";case"launch_failed:exited":return"\uB744\uC6B4 \uC138\uC158\uC774 \uACE7\uBC14\uB85C \uC885\uB8CC\uB410\uC2B5\uB2C8\uB2E4";case"error":return"\uC138\uC158 \uAE30\uB3D9 \uC911 \uC624\uB958\uAC00 \uB0AC\uC2B5\uB2C8\uB2E4";default:return typeof e=="string"&&e.length>0?e:"\uC138\uC158\uC744 \uB744\uC6B0\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}}function _w(e){switch(e){case"no_session_ref":return"\uAE30\uB85D\uB41C \uC138\uC158 \uC5C6\uC74C";case"unsafe_session_id":return"\uC138\uC158 ID\uB97C \uC778\uC790\uB85C \uC4F8 \uC218 \uC5C6\uC74C";case"provider_mismatch":return"\uAE30\uB85D\uB41C \uC138\uC158\uC774 claude\uAC00 \uC544\uB2D8";case"not_local":return"\uAE30\uB85D\uB41C \uC138\uC158\uC758 transcript\uAC00 \uC774 \uAE30\uAE30\uC5D0 \uC5C6\uC74C";case"bd_unavailable":return"Bead \uBA54\uD0C0\uB370\uC774\uD130\uB97C \uC77D\uC9C0 \uBABB\uD568";default:return typeof e=="string"&&e.length>0?e:"\uC0AC\uC720 \uBBF8\uC0C1"}}function mw(e){if(!e||typeof e!="object")return"\uC138\uC158 \uAE30\uB3D9 \uC751\uB2F5\uC744 \uBC1B\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";if(e.conflict===!0)return"\uD050\uAC00 \uBC14\uB00C\uC5B4 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694";if(e.session==="already_running")return"\uC774\uBBF8 \uC774 \uC774\uC288\uC758 \uD574\uACB0 \uC138\uC158\uC774 \uC5F4\uB824 \uC788\uC2B5\uB2C8\uB2E4";if(e.launched!==!0)return`\uC138\uC158\uC5D0\uC11C \uD574\uACB0 \uAC70\uBD80: ${fw(e.reason)}`;let t=e.bridge_active===!0?"":" (Discord \uC911\uACC4 \uBE44\uD65C\uC131 \u2014 tmux\uC5D0\uC11C \uB2F5\uD558\uC138\uC694)";return e.mode==="fork"?`\uAE30\uB85D\uB41C \uC138\uC158\uC744 fork\uD574 \uB744\uC6E0\uC2B5\uB2C8\uB2E4${t}`:`\uC0C8 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 ${_w(e.fallback_reason)}${t}`}function gw(e){return e&&e.launched===!0?"success":"error"}function hw(e){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let t=e.slice(19);if(t.length===0)return null;switch(t){case"gating":return"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function bw(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}var yw=new Set(["paused","needs_human","waiting_metadata","reviewing","retrying"]),vw=new Set(["waiting_metadata","reviewing","retrying"]),zl=new Set(["review_receipt_missing","review_receipt_stale","review_receipt_invalid","review_receipt_undetermined"]);function ww(e){let t=e&&typeof e=="object"?e.auto_resolution:null,n=t&&typeof t=="object"&&!Array.isArray(t)?t:null;if(!n||!e)return null;let r=typeof n.origin_reason=="string"&&n.origin_reason.length>0?`\uC6D0 \uC0AC\uC720: ${n.origin_reason}`:"";switch(e.phase){case"waiting_metadata":return{label:"\uC815\uC815 \uB300\uAE30",details:[r,"\uBA54\uD0C0\uB370\uC774\uD130 \uC815\uC815\uC774 \uAD00\uCE21\uB418\uBA74 \uC790\uB3D9 \uC7AC\uAC1C"].filter(Boolean),live:!1};case"retrying":{let o=Number.isInteger(n.attempts)?Math.max(0,Number(n.attempts)):0,s=Number.isInteger(n.attempt_cap)&&Number(n.attempt_cap)>0?Number(n.attempt_cap):0,i=typeof n.next_at=="number"?Kt(n.next_at):"",l=typeof n.last_error=="string"&&n.last_error.length>0?n.last_error:"";return{label:s>0?`\uC7AC\uC2DC\uB3C4 ${Math.min(o,s)}/${s}`:`\uC7AC\uC2DC\uB3C4 ${o}`,details:[r,i?`\uB2E4\uC74C \uC2DC\uAC01 ${i}`:"",l?`\uB9C8\uC9C0\uB9C9 \uC624\uB958: ${l}`:""].filter(Boolean),live:!0}}default:return null}}function kw(e){if(typeof e!="string")return"";for(let t of["retry_exhausted:","auto_review_exhausted:"])if(e.startsWith(t))return e.slice(t.length);return""}function $w(e,t=null){if(!e||typeof e!="object")return null;let n="";switch(e.phase){case"gating":n="\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"merging":n="\uBA38\uC9C0 \uC911";break;case"cleaning":n="\uB9C8\uBB34\uB9AC \uC911";break;case"waiting_metadata":case"reviewing":case"retrying":if(!t)return null;n=t.label;break;case"paused":n="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":n="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let r=[n];e.head_sha&&r.push(`head ${e.head_sha}`),e.base_sha&&r.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&r.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`);let o=kw(e.terminal_reason);o&&r.push(`\uC6D0 \uC0AC\uC720: ${o}`);let s=e.phase==="needs_human"&&!o?Dr(e.terminal_reason):null;s&&r.push(e.failure_stage?`${e.failure_stage} \xB7 ${s}`:s);for(let i of t?t.details:[])r.push(i);return e.active_attempt_id&&r.push(`attempt ${e.active_attempt_id}`),e.evidence&&r.push(e.evidence),e.log_path&&r.push(e.log_path),{badge:n,title:r.join(`
`),alert:e.phase==="needs_human",lock_actions:!yw.has(e.phase)}}function xw(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function Aw(e){if(!e||typeof e!="object")return[];let t=e.badge_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function Sw(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",n=(s,i={})=>{let l=[i.title||"",t].filter(Boolean);return{label:s,title:l.join(`
`),live:i.live===!0,alert:i.alert===!0}};if(e.continuation_required)return n("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.queueing)return e.queueing==="cleanup"?n("\uC815\uB9AC \uC7AC\uC2DC\uB3C4 \uC694\uCCAD \uC911",{title:"\uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9AC\uB294 \uC911\uC785\uB2C8\uB2E4",live:!0}):n("\uD050 \uB4F1\uB85D \uC911",{title:"\uBA38\uC9C0 \uD050\uC5D0 \uB123\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.merge_step)return e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):n("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return n(e.conflict_badge,{live:e.conflict_live===!0});if(e.auto_resolution)return n(e.auto_resolution.label,{title:e.auto_resolution.details.join(`
`),live:e.auto_resolution.live===!0});if(e.recovery?.lock_actions)return n(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return n(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return n("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});let r=xw(e.receipt_check),o=e.conflicting||e.gate?.reason==="base_behind"||r.length>0;if(e.auto_pending&&o)return n("\uD655\uC778 \uC911",{title:"\uBA38\uC9C0 \uD050\uAC00 \uC790\uB3D9\uC73C\uB85C \uCC98\uB9AC \uC911 \u2014 \uB2E4\uC74C \uAD00\uCE21\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.conflicting)return n("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="base_behind")return n("base \uAC31\uC2E0 \uD544\uC694",{alert:!0});if(zl.has(e.gate?.reason)){let s=e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uC785\uB2C8\uB2E4. [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":e.gate.reason==="review_receipt_invalid"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uAE30\uB85D\uC774 \uC131\uB9BD\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":e.gate.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC758 ancestry probe\uB97C \uC644\uB8CC\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4";if(e.review_session?.active===!0)return n(e.review_session.origin==="auto"?"\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911":"\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911",{title:`${s}
\uB9AC\uBDF0 \uC138\uC158\uC774 \uC2E4\uD589 \uC911\uC785\uB2C8\uB2E4 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4`,live:!0});if(e.auto_review_wait==="slot")return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uB9AC\uBDF0 \uC138\uC158 \uC2AC\uB86F \uB300\uAE30",{title:`${s}
\uC2E4\uD589 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uC790\uB3D9\uC73C\uB85C \uB9AC\uBDF0 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4. \uC9C0\uAE08 \uD074\uB9AD\uD558\uBA74 \uC989\uC2DC \uB744\uC6C1\uB2C8\uB2E4`,live:!0});if(e.review_session?.failure){let i=e.review_dispatch?.state==="exhausted"&&e.review_session.origin==="auto";return n(`\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 ${i?"\uC790\uB3D9 \uB9AC\uBDF0 1\uD68C \uC18C\uC9C4 \xB7 ":""}${dw(e.review_session.failure)}`,{title:`${s}
\uC9C1\uC804 \uB9AC\uBDF0 \uC138\uC158 \uC885\uB8CC \uC0AC\uC720: ${e.review_session.failure}`,alert:!0})}return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:s,alert:!0})}return e.gate?.reason==="spec_id_missing"?n("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0}):r.length>0?n(`\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694 \xB7 ${r[0]}`,{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${r.join(", ")}`,alert:!0}):e.recovery?n(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?n("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?n(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${c_(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?n(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${c_(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?n(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?n("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?n("\uB2EB\uD798",{alert:!0}):e.activity?n("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?n("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?n("\uD655\uC778 \uC911"):e.gate?.gate_badge?n(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function Ew(e,t,n,r,o=null,s=null,i=null,l=!1,a=null,u=!0,d=null,p=null,h=null,m={},v=!1,O={},B=null,V={active:!1,failure:null,origin:null},ae=!1){let F=!!a&&a.position>0,q=!!a?.continuation_action&&a.continuation_action.continuation===null,L=!!a&&a.active===!0,M=a&&a.failure||null,W=hw(a?a.waiting:null),K=n[e]||null,H=K&&K.gate?K.gate:null,D=K&&K.pr?K.pr:null,G=bw(a?a.resolution:null),X=ww(h),J=$w(h,X),fe=a&&a.authority||null,Ce=a&&a.review_dispatch||null,U=a?.hold?.auto_review_wait==="slot"?"slot":null,te=!!h&&typeof h=="object"&&vw.has(h.phase),xe=F&&!L&&(!fe||te||fe.source==="automatic"&&!v),Ee=i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":G?G.badge:i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":W,R=!!H&&H.base_badge==="\uCDA9\uB3CC",re=!!H&&H.enabled===!0,ve=Ko({bead_id:e,merge_sha:O.merge_sha,cleanup_cursor:O.cleanup_cursor,merge_progress:s&&s.merge_progress?s.merge_progress:null,cleanup_failed:r,repo_operations:O.repo_operations}),ye=$i(ve),Oe=s&&!ve&&(s.queueing??null)?s.queueing:null,_e=!!r&&["repo_operations","post_merge_jobs","child_sweep","branch_cleanup","parent_close"].includes(r.step)&&!!H&&H.tier==="merged",Le=r&&r.step==="repo_operations"&&ve?.failed===!0&&(ve.step==="deploy"||ve.step==="verify")?ve.step:null,Ve=l&&!!r&&!!H&&H.tier==="merged",Ye=xe&&(re||R||H?.reason==="base_behind"||zl.has(H?.reason)||_e||Ve),P=zl.has(H?.reason),pe=l&&R&&u===!1,ne=Xn(m,e,{external:l,merge_active:L||ve?.step==="merge",merge_queued:F,conflict_active:!!i,cleanup_active:ye,merged:!!r||H?.tier==="merged"}),me=!!ne.operation,Te=!!r||h?.phase==="needs_human"||!!ne.error,ge=F&&!M&&!q&&!_e&&!(J&&J.lock_actions),Me=Sw({auto_pending:ge,continuation_required:q,queueing:Oe,merge_step:ve,conflict_badge:Ee,conflict_live:G?.live===!0||i==="running",auto_resolution:X,recovery:J,cleanup_failed:r,cleanup_label:r?Lr(r.step):null,base_exception:p,conflicting:R,gate:H,receipt_check:K&&K.receipt_check?K.receipt_check:null,queue_failure:M,auto_skip:d,queued:F,queue_active:L,queue_position:a?a.position:0,review_session:V,review_dispatch:Ce,auto_review_wait:U,activity:Ee?null:s&&s.activity||null}),We=Me?.live===!0&&Me.title?c`<span title=${Me.title}>${Me.label}</span>`:Me?.label||null,Ze=Aw(K&&K.receipt_check?K.receipt_check:null);return{id:e,title:l?c`${t}<span class="muted"> · 세션</span>`:t,reason:r&&ve?.active!==!0?ki(r.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",...B?{dependency_chips:B}:{},external:l,pr_number:D&&typeof D.number=="number"?D.number:null,pr_url:D&&typeof D.url=="string"?D.url:"",completion_badge:Me?.live!==!0&&Me?.title?Me.label:null,completion_title:Me?.title||"",...h?.phase==="needs_human"&&typeof h.log_path=="string"&&h.log_path.length>0?{log_path:h.log_path}:{},...Ze.length>0?{receipt_badge:{codes:Ze}}:{},badges:We?[We]:[],live_badge:Me?.live===!0?We:null,usage:o,alert:Me?.alert===!0,merge_action:H?.tier==="merged"&&!_e&&!Ve?!1:!F||q||xe||P,cancel_action:F&&!q,cancel_enabled:!L&&!(J&&J.lock_actions),cancel_title:J&&J.lock_actions?`${J.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:L?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:ne,discard_action:ne.action,resolve_action:Te,resolve_enabled:!ae,resolve_title:ae?"\uC138\uC158 \uAE30\uB3D9 \uC694\uCCAD \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":"\uC774 \uC2E4\uD328\uB97C \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 \u2014 \uAE30\uB85D\uB41C \uC138\uC158\uC774 \uC788\uC73C\uBA74 fork\uD558\uACE0, \uC5C6\uC73C\uBA74 \uC0C8 \uC138\uC158\uC5D0 \uC0AC\uC720\uB97C \uC2E3\uC2B5\uB2C8\uB2E4",merge_step:ve,discard_enabled:ne.enabled,discard_title:ne.title,merge_enabled:!ve&&!Oe&&!i&&!me&&!p&&!(J&&J.lock_actions)&&!pe&&V.active!==!0&&(re||R||H?.reason==="base_behind"||P||_e||Ve||Ye||te&&!L),merge_label:q?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":_e||Ve?Le==="deploy"?"\uBC30\uD3EC \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":Le==="verify"?"\uAC80\uC99D \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":"\uC815\uB9AC \uC7AC\uC2DC\uB3C4":R&&!ve&&!_e?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":H?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":P?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":xe?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:me?ne.error?`\uD3D0\uAE30 \uC2E4\uD328: ${ne.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${ne.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:q?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Oe?"\uC694\uCCAD\uC744 \uBCF4\uB0B4\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":ve?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${ve.label}`:Le?`\uBA38\uC9C0 \uC644\uB8CC \u2014 ${Le==="deploy"?"\uBC30\uD3EC":"\uAC80\uC99D"} \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD574 \uC815\uB9AC\uAC00 \uBA48\uCDC4\uC2B5\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uC800\uC7A5\uC18C \uC791\uC5C5\uBD80\uD130 \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4`:Ve?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":pe?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":_e?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":R?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":H?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":V.active===!0?V.origin==="auto"?"\uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":H?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uB9AC\uBDF0\uB9CC \uC218\uD589\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":H?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":H?.reason==="review_receipt_invalid"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uAE30\uB85D\uC774 \uC131\uB9BD\uD558\uC9C0 \uC54A\uC74C \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":H?.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D ancestry probe \uBBF8\uC644\uB8CC \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC0C8 \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":H?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":re?`\uBA38\uC9C0 (${H.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:H&&H.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${H&&H.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Hl(e,t={}){let{transport:n,issueStores:r,queueStore:o,sessionLogStore:s,gotoIssue:i,getWorkspacePath:l,switchWorkspace:a,openDoc:u,doneRange:d,onDoneRangeChange:p}=t,h=r?Kr(r):null,m=iw(),v=null,O=null,B=to(()=>S()),V=new Map,ae=new Map,F=Bf(),q=Fl(F)===null,L=d?qn(d):cw();function M(){let k=Br.find(w=>w.value===L);return k?k.label:"\uC624\uB298"}let W=Vi("beads-ui.worker.lane-collapsed"),K=!1,H="";function D(){return H.trim().length>0}function G(k){return D()?k.filter(w=>w.search_match===!0).length:void 0}let X=new Set,J=new Set,fe=new Set;function Ce(k,w){return!w?.error||!k?{}:{resolve_action:!0,resolve_enabled:!fe.has(k),resolve_title:fe.has(k)?"\uC138\uC158 \uAE30\uB3D9 \uC694\uCCAD \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":"\uC2E4\uD328\uD55C \uD3D0\uAE30\uB97C \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 \u2014 \uAE30\uB85D\uB41C \uC138\uC158\uC774 \uC788\uC73C\uBA74 fork\uD558\uACE0, \uC5C6\uC73C\uBA74 \uC0C8 \uC138\uC158\uC5D0 \uC0AC\uC720\uB97C \uC2E3\uC2B5\uB2C8\uB2E4"}}let U=new Set,te=new Set,xe=new Set,Ee=null,R=[],re=i_({queueStore:o,issueStores:r,transport:n,getWorkspacePath:l,onInvalidate:()=>S()});function ve(){re.refreshSessionDefaults()}let ye=document.createElement("div");ye.className="worker-console";let Oe=document.createElement("div");Oe.className="worker-top";let _e=document.createElement("div");_e.className="worker-drawer-overlay",_e.hidden=!0;let Le=document.createElement("div");Le.className="worker-drawer-overlay__backdrop";let Ve=document.createElement("div");Ve.className="worker-drawer-host";let Ye=document.createElement("div");Ye.className="worker-drawer-host",Ye.hidden=!0,_e.append(Le,Ve,Ye);let P=document.createElement("div");P.className="worker-lanes-host",ye.append(Oe,_e,P),e.appendChild(ye);let pe=pr(null,null),ne=[],me=Qi({transport:n,console_el:ye,getLanes:()=>pe,getWorkspaces:()=>ne,getCrossLanes:()=>null,reproject:()=>({lanes:ce(),raw_lanes:null}),onCorrection:()=>{},showToast:he,requestRender:()=>S(),adoptQueue:(k,w)=>{o&&o.set(w)},onDragBegin:()=>{v=null}}),Te=null,ge=ho(Ve,{transport:n,sessionLogStore:s,onClose:()=>{Te=null,_e.hidden=!0,S()}}),Me=r_(Ye,{onClose:()=>{Ye.hidden=!0,_e.hidden=!0,S()}}),We=Vf({getWorkspacePath:l||(()=>"")}),Ze=l&&l()||"",qe=Qf({queueStore:o,transport:n,onChanged:()=>S(),onOpenScript:(k,w)=>{We.open(k,w)}});function z(){return o&&o.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:oa,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function Y(k){if(!v||!k.some(I=>I.id===v))return null;let w=Bo(z());return w?{bead_id:v,lanes:w}:null}function Ne(){return l&&l()||""}async function lt(k,w){await me.sendOp({type:"worker-queue-place",payload:{bead_id:k,...w==="parallel"?{}:{lane:w}},root_dir:Ne()},k)}function Ue(){let k=z();return typeof k.revision=="number"?k.revision:0}function Re(k){k&&k.queue&&o&&o.set(k.queue)}async function $(k){if(!n||!k)return;let w=await n("worker-attempt-pause",{attempt_id:k});w&&w.paused===!1&&w.reason&&he(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${w.reason}`,"error",2400)}async function Z(k,w="session"){if(!n||!k)return;let I=n,le=z().attempts?.[k]||null;await Qr({context:{bead_id:le?.bead_id||"",kind:w,tuple:le?bn(le):""},transport:Ae=>I("worker-attempt-resume",{attempt_id:k,expected_revision:Ue(),...Ae}),adopt:Re})}async function Se(k,w,I=!0){if(!n)return null;let le=n,Ae=await le(k,{...w,expected_revision:Ue()});return Re(Ae),Ae&&Ae.conflict&&I&&(Ae=await le(k,{...w,expected_revision:Ue()}),Re(Ae)),Ae}async function Ie(k){if(!n||!k)return;let w=z().merge_queue?.find(le=>le.bead_id===k)?.continuation_action;if(w?.mismatch&&w.continuation===null){await Dt(k,w.mismatch);return}X.add(k),S();let I;try{I=await Se("worker-merge-queue-add",{bead_id:k})}catch{he("\uBA38\uC9C0 \uD074\uB9AD\uC774 \uC11C\uBC84\uC5D0 \uC804\uB2EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4(\uC5F0\uACB0 \uBB38\uC81C) \u2014 \uC5F0\uACB0 \uBCF5\uAD6C \uD6C4 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",3200);return}finally{X.delete(k),S()}if(!(!I||I.applied)){if(I.conflict){he("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}he(pw(I.reason),"error",2400)}}async function Ge(k){if(!(!n||!k||J.has(k))){J.add(k),S();try{let w=await n("worker-cleanup-retry",{bead_id:k,expected_revision:Ue()});Re(w),w&&!w.retried&&!w.conflict&&w.reason&&he(`\uC815\uB9AC \uC7AC\uC2DC\uB3C4 \uAC70\uBD80: ${w.reason}`,"error",2400)}finally{J.delete(k),S()}}}async function tt(k){if(!(!n||!k||fe.has(k))){fe.add(k),S();try{let w=await n("worker-resolve-in-session",{bead_id:k,expected_revision:Ue()});Re(w),he(mw(w),gw(w),4e3)}finally{fe.delete(k),S()}}}async function ct(k,w){let I=z().hold;if(!n||!I||typeof I.since!="number")return;let le=await n(k,{since:I.since});Re(le),le&&le.ok===!1&&he(`${w}: ${le.reason==="hold_changed"?"\uD050 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694":le.reason||""}`,"error",2800)}async function Tt(k,w){if(!n||!k||!w)return;let I=await n("worker-parked-retry",{bead_id:k,attempt_id:w});Re(I),I&&I.ok===!1&&he(`\uC7AC\uC2DC\uB3C4 \uAC70\uBD80: ${I.reason==="not_latest"?"\uC774 bead\uC5D0 \uB354 \uC0C8\uB85C\uC6B4 \uC2DC\uB3C4\uAC00 \uC788\uC2B5\uB2C8\uB2E4":I.reason||""}`,"error",2800)}async function Dt(k,w){let I=await lr({continuation_mismatch:w},(Ae,Be)=>Se("worker-merge-queue-add",{bead_id:k,continuation:Ae,decision_token:Be},!1)),le=I?.queue?.merge_queue?.find(Ae=>Ae.bead_id===k)?.continuation_action;if(I?.applied!==!0&&le?.continuation===null&&le.mismatch){await Dt(k,le.mismatch);return}I&&I.applied===!1&&!I.conflict&&he("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function ft(k){if(!n)return;let w=await Se("worker-merge-auto-toggle",{on:k});!w||w.conflict||he(k?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",k?"success":"info",2400)}async function gt(k){if(!n||!k)return;let w=await Se("worker-merge-queue-remove",{bead_id:k});w&&!w.conflict&&!w.applied&&w.reason==="merge_active"&&he("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function mt(){await Se("worker-merge-queue-remove",{all:!0})}async function Rt(k,w=null,I="unmerged",le=null){if(!n||!k)return;let Ae=Wo(k,I);if(!(!!le||typeof globalThis.confirm!="function"||globalThis.confirm(Ae)))return;let Qe=await n("worker-discard",{bead_id:k,...w?{attempt_id:w}:{},...le?{operation_id:le}:{},expected_revision:Ue()});if(Re(Qe),Qe&&Qe.conflict&&(Qe=await n("worker-discard",{bead_id:k,...w?{attempt_id:w}:{},...le?{operation_id:le}:{},expected_revision:Ue()}),Re(Qe)),Qe&&Qe.discarded===!0){he(ui(Qe),"success",5e3);return}if(Qe&&Qe.reason){he(`\uD3D0\uAE30 \uC2E4\uD328: ${Qe.reason}`,"error",2800);return}if(Qe&&Qe.accepted&&Qe.pending==="merged_revert"){he("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(Qe&&Qe.accepted&&!Qe.discarded){he(`\uD3D0\uAE30 \uC9C4\uD589: ${Qe.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}Qe&&!Qe.conflict&&he("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function bt(k,w,I){if(!n||!k||!w||typeof globalThis.confirm=="function"&&!globalThis.confirm(zo(k,I)))return;let le=await n("worker-discard-abandon",{bead_id:k,operation_id:w,expected_revision:Ue()});if(Re(le),le&&le.conflict&&(le=await n("worker-discard-abandon",{bead_id:k,operation_id:w,expected_revision:Ue()}),Re(le)),le&&le.abandoned===!0){he(ci(I),"success",5e3);return}if(le&&le.reason){he(`\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: ${le.reason}`,"error",2800);return}le&&!le.conflict&&he("\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: unknown","error",2800)}async function ue(k,w,I){if(!(!n||!w||!I||te.has(w))){te.add(w),S();try{let le=await n(k,{bead_id:w,action_id:I,expected_revision:Ue()});Re(le),le?.conflict?he("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!le?.ok&&le?.reason&&he(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(le.reason)}`,"error",2800)}finally{te.delete(w),S()}}}async function se(k,w){if(!n||!w||U.has(w))return;U.add(w),S();let I;try{let le=async(Ae={})=>await n(k,{bead_id:w,expected_revision:Ue(),...Ae});I=await le(),Re(I),I&&I.conflict&&(I=await n(k,{bead_id:w,expected_revision:Ue()}),Re(I)),k==="worker-revise-fix"&&(I=await lr(I,(Ae,Be)=>le({continuation:Ae,decision_token:Be}),{onResult:Re,refresh:()=>le()}))}finally{U.delete(w),S()}if(!(!I||I.conflict)){if(I.ok){he(k==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}he(`\uCC98\uBD84 \uAC70\uBD80: ${I.reason||""}`,"error",3e3)}}async function A(k){if(!n)return;let w=await n("worker-automation-toggle",{on:k,expected_revision:Ue()});Re(w),w&&w.conflict&&await n("worker-automation-toggle",{on:k,expected_revision:Ue()}).then(Re)}async function j(k){if(!n||!k)return;let w=await n("worker-repo-operation-dismiss",{operation_id:k});Re(w),w&&w.ok===!1&&he(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${w.reason||""}`,"error",3e3)}async function oe(k){if(!n||!Number.isFinite(k))return;let w=Math.max(oa,Math.floor(k)),I=await n("worker-queue-set-slots",{slots:w,expected_revision:Ue()});Re(I),I&&I.conflict&&await n("worker-queue-set-slots",{slots:w,expected_revision:Ue()}).then(Re)}async function ie(k){if(!n||!Number.isInteger(k)||k<1||k>a_)return;let w=z(),I=(Array.isArray(w.serial_lanes)?w.serial_lanes:[]).slice(k).reduce((Be,Qe)=>Be+(Array.isArray(Qe?.entries)?Qe.entries.length:0),0),le=()=>({count:k,expected_revision:Ue()}),Ae=await n("worker-queue-set-serial-lane-count",le());Re(Ae),Ae&&Ae.conflict&&(Ae=await n("worker-queue-set-serial-lane-count",le()),Re(Ae)),Ae&&Ae.applied&&I>0&&he(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${I}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}function ce(){let k=Sr(L),w=re.read({candidate_sort:F,done_since:k});return ne=w.workspaces,pe=pr(w.workspaces,w.workspaces_state,{done_since:k,candidate_filter:m,candidate_hidden_counts:"per_control",candidate_sort:"as_given",groups:"all",search:H}),pe}function Pe(k){return k.queue_groups[0]||sw}function Je(k){let w=k.dependency_chips||null,I={...w&&w.released?{released:w.released}:{},...w&&w.dependents?{dependents:w.dependents}:{}},le=V.get(k.id),Ae=ae.get(k.id)||null,Be=le&&le.overlaps.length>0?le.overlaps:null,Qe=!!le&&le.scope_missing;return!Ae&&!Be&&!Qe&&Object.keys(I).length===0?null:{...I,...Ae?{predecessors:Ae}:{},...Be?{overlaps:Be}:{},...Qe?{scope_missing:!0}:{}}}function Xe(k){return{...k,workspace_name:"",done_layout:void 0,dependency_chips:Je(k)||void 0,chip_popover:je(k)}}function je(k){return hi(k,w=>B.isOpen({bead_id:k.id,chip_key:w}))}function vt(){let k=z(),w=new Map;for(let I of Object.values(_n(k.lane_states))){let le=Array.isArray(I?.corrections)?I.corrections:[];for(let Ae of le)Ae&&typeof Ae.bead_id=="string"&&typeof Ae.after=="string"&&w.set(Ae.bead_id,Ae.after)}return{admission:_n(k.admission),correction_after:w}}function Ot(k,w){let I=Xe(k),le=Ju(w.admission[k.id]||null,!!k.discard||te.has(k.id)),Ae=w.correction_after.get(k.id);return{...I,draggable:I.draggable===!0&&!le,stale_work:le,reason:le?"":I.reason,badges:Ae?[`\u{1F517} ${Ae} \uB4A4 (blocks \uC790\uB3D9)`,...I.badges||[]]:I.badges,revise_enabled:I.revise_enabled===!0&&!U.has(k.id)}}function ht(k){let w=vt();return Pe(k).sublanes.parallel.map(I=>Ot(I,w))}function Vt(k){let w=vt();return Pe(k).sublanes.serial.map(I=>{let le=I.occupants.map(Ae=>({id:Ae.id,title:Ae.title,draggable:!1,lane:I.id,ghost:!0,badges:[Ae.badge],...typeof Ae.search_match=="boolean"?{search_match:Ae.search_match}:{}}));return{id:I.id,index:I.index+1,raw_length:I.raw_length,ghosts:le,items:I.items.map(Ae=>Ot(Ae,w)),occupied:I.occupied_by.length>0,badge:I.occupants.length>0?I.occupants[0].badge:"\uB300\uAE30",cycle:I.cycle===!0}})}function jt(k){return k.runnable.map(w=>Xe(w))}function St(k){return k.done.map(w=>Xe(w))}function zt(k){let w=k.running.filter(I=>I.non_occupying!==!0).map(I=>({...I,bead_id:I.id,attempt_id:I.attempt_id||"",paused:I.run_state==="paused",failed:I.run_state==="failed",parked:I.run_state==="parked",retry_wait:I.run_state==="retry_wait",waiting:I.run_state==="waiting",wait:I.wait||null,status_label:I.run_state==="failed"?I.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328":I.run_state==="parked"?"\uC138\uC158 \uB300\uAE30":I.run_state==="retry_wait"?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":I.run_state==="waiting"?"\uC120\uD589 \uB300\uAE30":void 0,can_pause:I.can_pause!==!1,workspace_name:"",dependency_chips:Je(I)||void 0,chip_popover:je(I),rollup_expanded:xe.has(I.id),failure:I.failure?{...I.failure,open:O===I.attempt_id}:null,...Ce(I.id,I.discard)}));return[...w.filter(I=>I.failed===!0),...w.filter(I=>I.failed!==!0&&I.parked===!0),...w.filter(I=>I.failed!==!0&&I.parked!==!0)]}function ut(k){return Bt(k).map(w=>({...w,chip_popover:je(w)}))}function Bt(k){if(Ee&&Ee.model===k)return Ee.rows;let w=z(),I=Pe(k),le=_n(w.attempts),Ae=Object.values(le).filter(Yn),Be=new Map;for(let He of Ae)Be.set(He.attempt_id,He);let Qe=new Map;for(let He of Ae)Qe.set(He.bead_id,He);let wt=new Map;for(let He of[...k.pr_wait,...k.running,...k.queue,...k.runnable,...k.done])wt.has(He.id)||wt.set(He.id,He);let Ut=He=>{let It=null;for(let hn of Ae)!hn||hn.bead_id!==He||el(hn,Be)||(It===null||(typeof hn.started_at=="number"?hn.started_at:0)>=(typeof It.started_at=="number"?It.started_at:0))&&(It=hn);return It&&typeof It.target_base=="string"?It.target_base:null},Qt=new Map;for(let He of k.running)He.run_state==="failed"||He.conflict_resolution!==!0||(He.run_state!=="paused"?Qt.set(He.id,"running"):Qt.has(He.id)||Qt.set(He.id,"paused"));let gn=_n(w.auto_merge_skips),In=new Set(I.merge.auto_excluded),yr=_n(w.pr_observations),Mn=_n(w.pr_activity),Pn=_n(w.cleanup_failed),Un=_n(w.discard_operations),Gt=_n(w.bead_workflow),rr=_n(w.bead_titles),vr=w.merge_queue_state||{active:null,failures:{}},or=I.merge.state.waiting,xn=new Map;for(let He of Array.isArray(w.merge_queue)?w.merge_queue:[])He&&typeof He=="object"&&He.bead_id&&xn.set(He.bead_id,He);let Dn=(Array.isArray(w.pr_wait)?w.pr_wait:[]).map(He=>{let It=wt.get(He.bead_id);return{...Ew(He.bead_id,It?.title||rr[He.bead_id]||He.bead_id,yr,Pn[He.bead_id]||null,Kn(le,He.bead_id),Mn[He.bead_id]||(X.has(He.bead_id)?{activity:null,merge_progress:null,queueing:"merge"}:J.has(He.bead_id)?{activity:null,merge_progress:null,queueing:"cleanup"}:null),Qt.get(He.bead_id)||null,He.external===!0,{position:I.merge.positions.get(He.bead_id)||0,active:vr.active===He.bead_id,failure:_n(vr.failures)[He.bead_id]||null,waiting:or&&or.bead_id===He.bead_id?or.reason:null,resolution:I.merge.resolutions.get(He.bead_id),continuation_action:I.merge.continuations.get(He.bead_id),authority:I.merge.authorities.get(He.bead_id)||null,hold:xn.get(He.bead_id)?.hold||null,review_dispatch:xn.get(He.bead_id)?.review_dispatch||null},He.wt_present!==!1,w.auto_merge===!0&&In.has(He.bead_id)?gn[He.bead_id]?.reason||"":null,Ja(I.declared_base,Ut(He.bead_id)),_n(w.completion_status)[He.bead_id]||null,Un,w.auto_merge===!0,{merge_sha:He.merge_sha,cleanup_cursor:He.cleanup_cursor,repo_operations:I.repo_operations},It?Je(It):null,Yu(le,He.bead_id),fe.has(He.bead_id)),...It?.search_match===void 0?{}:{search_match:It.search_match},workflow:Gt[He.bead_id]||null,priority:It?.priority,from_id:It?.from_id,...It?.created_at===void 0?{}:{created_at:It.created_at},...It?.updated_at===void 0?{}:{updated_at:It.updated_at}}});return Ee={model:k,rows:Dn},Dn}function Xt(k){let w=Pe(k),I=[];for(let Be of k.running)Be.non_occupying!==!0&&I.push({id:Be.id,title:Be.title,location_label:"\uC2E4\uD589\uC911",kind:"running",lane_id:Be.serial_lane_id??null});for(let Be of k.pr_wait)I.push({id:Be.id,title:Be.title,location_label:"PR \uB300\uAE30",kind:"pr_wait",lane_id:null});for(let Be of w.sublanes.serial)Be.items.forEach((Qe,wt)=>{I.push({id:Qe.id,title:Qe.title,location_label:`${Be.id} #${wt+1}`,kind:"serial",lane_id:Be.id})});w.sublanes.parallel.forEach((Be,Qe)=>{I.push({id:Be.id,title:Be.title,location_label:`#${Qe+1}`,kind:"parallel",lane_id:null})});for(let Be of k.runnable)I.push({id:Be.id,title:Be.title,location_label:"\uD6C4\uBCF4",kind:"candidate",lane_id:null,queue_placeable:Be.queue_placeable===!0});let le=z();V=Hf(le.bead_scope,I);let Ae=new Map;for(let Be of[...k.running,...k.runnable])Array.isArray(Be.blocked_by)&&Be.blocked_by.length>0&&Ae.set(Be.id,Be.blocked_by);for(let[Be,Qe]of Object.entries(_n(le.bead_blocked_by)))Array.isArray(Qe)&&Ae.set(Be,Qe.filter(wt=>typeof wt=="string"&&wt.length>0));ae=ud(Ae,I,_n(le.blocker_workspaces))}function Nt(k){let w=k.hold&&typeof k.hold=="object"?k.hold:null;if(!w||w.kind!=="env"&&w.kind!=="systemic")return"";let I=mr(w.cause)||String(w.cause||""),le=Array.isArray(k.lineages)?k.lineages:[];if(w.kind==="env"){let Be=le.map(wt=>wt&&wt.next_at).filter(wt=>typeof wt=="number").sort((wt,Ut)=>wt-Ut)[0],Qe=typeof Be=="number"?` \xB7 \uB2E4\uC74C ${new Date(Be).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}`:"";return c`<div class="worker-hold worker-hold--env" role="status">
        <span class="worker-hold__text"
          >환경 보류: ${I} — 재시도 대기${Qe}</span
        >
        <button
          type="button"
          class="worker-hold__retry"
          title="예약된 재시도를 지금 실행합니다"
        >
          지금 재시도
        </button>
      </div>`}let Ae=(Array.isArray(w.bead_ids)?w.bead_ids:[]).filter(Be=>typeof Be=="string"&&Be.length>0);return c`<div class="worker-hold worker-hold--systemic" role="alert">
      <span class="worker-hold__text"
        >${I}${Ae.length>0?` \u2014 bead ${Ae.join(", ")}`:""}</span
      >
      <button
        type="button"
        class="worker-hold__resume"
        title="정지를 풀고 멈춰 있던 bead를 다시 디스패치합니다"
      >
        재개
      </button>
    </div>`}function rn(k){let w=z(),I=Pe(k),le=I.sublanes.parallel,Ae=le.length>0?le[0].id:"\u2014",Be=c`<button
      type="button"
      class="worker-play${w.auto_advance?" is-active":""}"
    >
      ${w.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,Qe=$e(k),wt=I.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",Ut=w.auto_advance?0:(Array.isArray(w.queue)?w.queue:[]).filter(Gt=>Gt&&typeof Gt.armed_by_lane=="string"&&Gt.armed_by_lane.length>0).length,Qt=Ut>0?c`<span
            class="worker-kpi__chip worker-kpi__chip--armed"
            title="모니터 연결 레인이 발차한 대기 행입니다 — 이 레포의 자동 진행은 꺼진 채입니다"
            >⏸ 자동 진행 꺼짐 · 연결 레인 ${Ut}건 진행 중</span
          >`:"",gn=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${I.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${ut(k).length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${M()} 완료 <b>${k.done.length}</b></span
      >`,In=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${I.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${I.declared_base||"?"}</span
    >`,yr=c`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${oa}
          step="1"
          .value=${String(I.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:a_},(Gt,rr)=>rr+1).map(Gt=>c`<option
                value=${String(Gt)}
                ?selected=${I.serial_lane_count===Gt}
              >
                ${Gt}
              </option>`)}
        </select>
      </label> `,Mn=c`<input
      type="search"
      class="worker-search"
      placeholder="ID·제목 검색"
      aria-label="이슈 검색 (ID·제목)"
      .value=${H}
    />`,Pn=Xu(I.repo_operations,I.cleanup_failures),Un=Nt(w);return K?c`<div class="worker-ribbon">
          ${Be} ${Qe}
          <div class="worker-kpi worker-kpi--ribbon">
            ${wt}${Qt}${gn}
          </div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${yr}${Mn}</div>
          <div class="worker-kpi">${In}</div>
        </div>
        ${Un}${Pn}${qe.template()}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">
          ${Be}${Qe}${yr}${Mn}
        </div>
        <div class="worker-kpi">
          ${wt}${Qt}${gn}${In}
          ${(Array.isArray(I.token_total)?I.token_total:I.token_total?[{label:I.token_total,tooltip:`${M()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(Gt=>c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${Gt.tooltip}
                >${M()} 완료 · 누적 ${Gt.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${Ae}</b></span
          >
        </div>
      </div>
      ${Un}${Pn}${qe.template()}`}function en(k){let w=k.runnable_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${m.show_blocked}
        />
        🔒 blocked${w.blocked>0?` ${w.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${lw.map(I=>c`<button
              type="button"
              class="worker-filter__chip${m.spec===I.value?" is-active":""}"
              data-spec=${I.value}
              aria-pressed=${m.spec===I.value?"true":"false"}
            >
              ${I.label}
            </button>`)}
        ${w.spec>0?c`<span class="worker-filter__hidden">숨김 ${w.spec}</span>`:""}
      </div>
    </div>`}function Ft(){let k=q?"custom":Fl(F)||"custom";return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${k}
    >
      ${gs.map(w=>c`<option value=${w.id} ?selected=${k===w.id}>
            ${w.label}
          </option>`)}
      <option value="custom" ?selected=${k==="custom"}>
        사용자 지정…
      </option>
    </select>`}function dn(){let k=hs(F);return c`<div
      class="worker-sort-chain"
      role="group"
      aria-label="후보 정렬 체인"
    >
      ${[0,1,2].map(w=>{let I=k[w];return c`<span class="worker-sort-chain__step">
          <select
            class="worker-sort-chain__key"
            data-step=${w}
            aria-label=${`${w+1}\uCC28 \uC815\uB82C \uD0A4`}
            .value=${I?I.key:""}
          >
            ${w===0?"":c`<option value="" ?selected=${!I}>없음</option>`}
            ${Ff.map(le=>c`<option
                  value=${le.key}
                  ?selected=${!!I&&I.key===le.key}
                >
                  ${le.label}
                </option>`)}
          </select>
          ${I?c`<button
                type="button"
                class="worker-sort-chain__dir"
                data-step=${w}
                aria-label=${I.dir==="asc"?"\uC624\uB984\uCC28\uC21C":"\uB0B4\uB9BC\uCC28\uC21C"}
                title=${I.dir==="asc"?"\uC624\uB984\uCC28\uC21C":"\uB0B4\uB9BC\uCC28\uC21C"}
              >
                ${I.dir==="asc"?"\u2191":"\u2193"}
              </button>`:""}
        </span>`})}
    </div>`}function tn(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${L}
      >
        ${Br.map(k=>c`<option value=${k.value} ?selected=${L===k.value}>
              ${k.label}
            </option>`)}
      </select>
    </div>`}function $e(k){let w=Pe(k).merge,I=z().auto_merge===!0;if(w.running)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${I?" is-active":""}"
        title=${I?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${I?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${w.positions.size}
      </button>`;if(I)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let le=new Set(w.auto_excluded),Ae=ut(k).filter(Be=>Be.merge_action&&Be.merge_enabled&&!le.has(Be.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${Ae>0?` ${Ae}`:""}
    </button>`}function E(k,w){return c`<div
      data-bead-id=${k.id}
      data-drag-kind=${w.kind}
      data-root-dir=${w.root_dir}
      data-lane-id=${nn(w.lane_id)}
      data-row-index=${w.row_index}
      data-queue-index=${String(k.queue_index??0)}
    >
      ${En({...k,...Ce(k.id,k.discard)},{actions:po(k)})}
    </div>`}function be(k){let w=ht(k),I=Ne();return yi({parallel:{rows:w.map((le,Ae)=>E(le,{kind:"parallel",root_dir:I,row_index:Ae})),count:w.length,collapsed:W.isAreaCollapsed("parallel"),drop:{drop:"parallel",root_dir:I}},serial:{lanes:Vt(k).map(le=>({id:le.id,title:`\uC9C1\uB82C ${le.index}`,rows:[...le.ghosts.map(Ae=>En({...Ae,...Ce(Ae.id,Ae.discard)},{actions:po(Ae)})),...le.items.map((Ae,Be)=>E(Ae,{kind:"repo-serial",root_dir:I,row_index:Be,lane_id:le.id}))],count:le.ghosts.length+le.items.length,match_count:G([...le.ghosts,...le.items]),empty:le.ghosts.length+le.items.length===0,badge:le.badge,held:le.occupied,cycle:le.cycle,drop:{drop:"repo-serial",root_dir:I,lane_id:le.id,lane_length:String(le.raw_length)}})),collapsed:W.isAreaCollapsed("serial")}})}function De(k){return Zp(zt(k),Date.now(),Te)}function b(k){return k.running.some(w=>w.kind!=="session"&&w.run_state==="running")}function y(k){let w=Pe(k),I=jt(k),le=ht(k),Ae=St(k),Be=ut(k),Qe=zt(k),wt=Bn({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4",items:I,match_count:G(I),src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:Ft(),header_row:q?dn():void 0,controls:en(k),collapsible:!0,collapsed:W.isCollapsed("candidate"),place_menu:Y(I),onOpenDoc:u?(Qt,gn)=>u(gn):void 0}),Ut=Bn({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:Ae,match_count:G(Ae),empty:`${M()} \uC644\uB8CC \uC5C6\uC74C`,header_control:tn(),collapsible:!0,collapsed:W.isCollapsed("done"),preview:K?Array.isArray(w.token_total)?w.token_total.map(Qt=>Qt.label).join(" \xB7 "):w.token_total||l_(Ae):void 0});return K?c`<div class="worker-lanes worker-lanes--mobile">
        ${vi({live:b(k),running_body:Qe.length>0?De(k):"",pr_wait_rows:Be.map(Qt=>En(Qt)),count:Qe.length+Be.length})}
        ${Bn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:le,count:le.length,match_count:G(le),collapsible:!0,collapsed:W.isCollapsed("queue"),preview:l_(le),body:be(k)})}
        ${wt} ${Ut}
      </div>`:c`<div class="worker-lanes">
      ${wt}
      ${Bn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:le,count:le.length,match_count:G(le),collapsible:!0,collapsed:W.isCollapsed("queue"),body:be(k)})}
      ${Bn({id:"worker-pane-running",lane:"running",title:"\uC2E4\uD589 \uC911",items:Qe,match_count:G(Qe),header_control:c`<span class="worker-pane__meta"
          >슬롯 ${w.slots}</span
        >`,live:b(k),collapsible:!0,collapsed:W.isCollapsed("running"),body:De(k)})}
      ${Bn({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:Be,match_count:G(Be),empty:"PR \uB300\uAE30 \uC5C6\uC74C",collapsible:!0,collapsed:W.isCollapsed("pr_wait")})}
      ${Ut}
    </div>`}function f(k){W.toggle(k),S()}function g(k){W.toggleArea(k),S()}function S(){let k=ce();Xt(k),ot(rn(k),Oe),ot(y(k),P)}function Q(){let k=!0,w=Yi(I=>{if(K=I,k){k=!1;return}S()});R.push(w)}function ee(k){m=k,aw(k),S()}function de(k){if(k==="custom"){q=!0,S();return}F=Nr(k),Bl(F),q=!1,S()}function rt(k){F=Nr({chain:k}),Bl(F),S()}function dt(k){L=qn(k),uw(L),p?.(L),S()}function at(k){let w=k.target?.closest?.(".worker-serial-lane-count");if(w){let Ut=Number.parseInt(w.value,10);Number.isFinite(Ut)&&ie(Ut).then(S);return}let I=k.target?.closest?.(".worker-filter__blocked");if(I){ee({...m,show_blocked:I.checked});return}let le=k.target?.closest?.(".worker-sort-chain__key");if(le){let Ut=Number.parseInt(le.getAttribute("data-step")||"",10);Number.isFinite(Ut)&&rt(Uf(hs(F),Ut,le.value));return}let Ae=k.target?.closest?.(".worker-done-range");if(Ae){dt(Ae.value);return}let Be=k.target?.closest?.(".worker-sort");if(Be){de(Be.value);return}let Qe=k.target?.closest?.(".worker-slots__input");if(!Qe)return;let wt=Number.parseInt(Qe.value,10);if(!Number.isFinite(wt)){S();return}oe(wt).then(S)}function $t(k){return k?{runner:k.runner||void 0,model:k.model||void 0,effort:k.effort||void 0,worktree:k.worktree||void 0,status:k.status||void 0,session_id:k.session_id||void 0}:{}}function x(){let k=Pe(ce()),w=z().workspace_info,I=w&&typeof w=="object"&&w.repo_ops&&typeof w.repo_ops=="object"?w.repo_ops:null;return{operations:k.repo_operations,cleanup_failures:k.cleanup_failures,repo:l&&l()||"",repo_ops:I}}function C(){Te&&ge.close(),Ye.hidden=!1,_e.hidden=!1,Me.open(x()),S()}function we(k){let w=z(),I=w.attempts?w.attempts[k]:null;Te=k,Me.close(),Ye.hidden=!0,_e.hidden=!1,ge.open({attempt_id:k,meta:$t(I)}),S()}function Fe(k){let w=z(),I=(Array.isArray(w.session_active)?w.session_active:[]).find(Ae=>Ae&&Ae.bead_id===k),le=(I&&Array.isArray(I.session_refs)?I.session_refs:[]).find(Ae=>Ae&&Ae.current===!0);le&&(Me.close(),Ye.hidden=!0,_e.hidden=!1,ge.open(Zr(le,k,"in_progress")),S())}function nt(){if(Me.isOpen()&&Me.refresh(x()),!Te)return;let k=z(),w=k.attempts?k.attempts[Te]:null;if(w){ge.updateMeta($t(w));return}ge.close()}function _t(k,w){if(k.length===0||!i)return;let I=l?l():void 0;if(w.length===0||!I||w===I||!a){i(k);return}Promise.resolve(a(w)).then(()=>{i(k)}).catch(()=>{he("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})}function Lt(k){let w=k.target;if(w?.closest?.(".worker-mini__grip"))return;let I=w?.closest?.(".worker-sort-chain__dir");if(I){let _=Number.parseInt(I.getAttribute("data-step")||"",10);Number.isFinite(_)&&rt(Wf(hs(F),_));return}let le=w?.closest?.(".worker-dep__open");if(le){_t(le.getAttribute("data-dep-id")||"",le.getAttribute("data-root-dir")||"");return}let Ae=w?.closest?.(".judgement-chip");if(Ae){let _=Ae.closest("[data-bead-id]"),T=_&&_.getAttribute("data-bead-id")||"",N=Ae.getAttribute("data-chip-key")||"";T&&N&&B.toggle({bead_id:T,chip_key:N});return}if(w?.closest?.(".chip-popover"))return;if(w?.closest?.(".worker-repo-strip")){C();return}let Be=w?.closest?.(".worker-repo-op__dismiss");if(Be){j(Be.dataset.operationId||"");return}let Qe=w?.closest?.(".worker-cleanup__resume");if(Qe){let _=Qe.dataset.beadId;_&&Ge(_);return}let wt=w?.closest?.(".worker-cleanup__resolve");if(wt){let _=wt.dataset.beadId;_&&tt(_);return}if(w?.closest?.(".worker-hold__retry")){ct("worker-queue-hold-retry-now","\uC9C0\uAE08 \uC7AC\uC2DC\uB3C4 \uAC70\uBD80");return}if(w?.closest?.(".worker-hold__resume")){ct("worker-queue-hold-resume","\uC7AC\uAC1C \uAC70\uBD80");return}if(w?.closest?.(".worker-play")){A(!z().auto_advance);return}let Ut=w?.closest?.(".worker-merge-all");if(Ut){Ut.classList.contains("worker-merge-all--stop")?z().auto_merge===!0?ft(!1):mt():ft(!0);return}let Qt=w?.closest?.(".worker-pane__toggle[data-lane]");if(Qt){let _=Qt.dataset.lane;(_==="candidate"||_==="queue"||_==="running"||_==="pr_wait"||_==="done")&&f(_);return}let gn=w?.closest?.(".worker-wait__area-toggle[data-area]");if(gn){let _=gn.dataset.area;(_==="parallel"||_==="serial")&&g(_);return}let In=w?.closest?.(".worker-card__place-lane");if(In){let _=In.dataset.beadId,T=In.dataset.lane;_&&(T==="parallel"||/^s[1-5]$/.test(T||""))&&(v=null,S(),lt(_,T));return}if(w?.closest?.(".worker-card__place-cancel")){v=null,S();return}let Mn=w?.closest?.(".worker-card__place");if(Mn){let _=Mn.dataset.beadId;_&&!Mn.disabled&&(Bo(z())?(v=_,S()):lt(_,"parallel"));return}let Pn=w?.closest?.(".worker-filter__chip");if(Pn){let _=Pn.dataset.spec;(_==="all"||_==="with"||_==="without")&&ee({...m,spec:_});return}let Un=w?.closest?.('[data-action="queue-remove"]');if(Un){let _=Un.dataset.beadId||"";_&&me.sendOp({type:"worker-queue-remove",payload:{bead_id:_},root_dir:Ne()},_);return}let Gt=w?.closest?.(".worker-mini__merge");if(Gt){let _=Gt.dataset.beadId||"";z().cleanup_failed?.[_]?Ge(_):Ie(_);return}let rr=w?.closest?.(".worker-mini__merge-cancel");if(rr){gt(rr.dataset.beadId||"");return}let vr=w?.closest?.(".worker-mini__resolve");if(vr){tt(vr.dataset.beadId||"");return}let or=w?.closest?.(".rtile__resolve");if(or){let _=or.closest(".rtile");tt(_?.dataset.beadId||"");return}let xn=w?.closest?.(".worker-mini__discard"),Dn=w?.closest?.(".worker-mini__discard-abandon");if(Dn){bt(Dn.dataset.beadId||"",Dn.dataset.operationId||"",{kind:Dn.dataset.operationKind||"",last_error:Dn.dataset.lastError||""});return}if(xn){Rt(xn.dataset.beadId||"",xn.dataset.attemptId||null,xn.dataset.discardMode==="merged"?"merged":"unmerged",xn.dataset.operationId||null);return}let He=w?.closest?.(".worker-mini__stale-continue");if(He){ue("worker-stale-work-continue",He.dataset.beadId||"",He.dataset.actionId||"");return}let It=w?.closest?.(".worker-mini__stale-backup");if(It){ue("worker-stale-work-backup-fresh",It.dataset.beadId||"",It.dataset.actionId||"");return}let hn=w?.closest?.(".worker-mini__stale-recheck");if(hn){ue("worker-stale-work-recheck",hn.dataset.beadId||"",hn.dataset.actionId||"");return}let bs=w?.closest?.(".worker-mini__revise-fix");if(bs){se("worker-revise-fix",bs.dataset.beadId||"");return}let ys=w?.closest?.(".worker-mini__revise-approve");if(ys){se("worker-revise-approve",ys.dataset.beadId||"");return}if(w?.closest?.(".worker-mini__pr"))return;let vs=w?.closest?.(".rtile__failure-badge");if(vs){let _=vs.dataset.attemptId||"";O=O===_?null:_,S();return}let ws=w?.closest?.(".rtile__attempt-copy");if(ws){let _=ws.dataset.attemptId||"";_&&sn(_).then(T=>{he(T?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",T?"success":"error",1400)});return}if(w?.closest?.(".rtile__parked-retry")){let _=w?.closest?.(".rtile");Tt(_?.dataset?.beadId||"",_?.dataset?.attemptId||"");return}let qr=w?.closest?.(".rtile__discard-abandon");if(qr){let T=w?.closest?.(".rtile")?.dataset?.beadId;T&&bt(T,qr.dataset.operationId||"",{kind:qr.dataset.operationKind||"",last_error:qr.dataset.lastError||""});return}let vo=w?.closest?.(".rtile__discard");if(vo){let _=w?.closest?.(".rtile"),T=_?.dataset?.beadId,N=_?.dataset?.attemptId;T&&Rt(T,N||null,vo.dataset.confirmation==="merged"?"merged":"unmerged",vo.dataset.operationId||null);return}if(w?.closest?.(".rtile__pause")){let T=w?.closest?.(".rtile")?.dataset?.attemptId;T&&$(T);return}if(w?.closest?.(".rtile__resume")){let _=w?.closest?.(".rtile__resume"),N=w?.closest?.(".rtile")?.dataset?.attemptId;N&&Z(N,_?.dataset?.resumeKind==="settlement"?"settlement":"session");return}if(w?.closest?.(".rtile__session")){let _=w?.closest?.(".rtile"),T=_?.dataset?.attemptId;if(T){we(T);return}let N=_?.dataset?.beadId;N&&Fe(N);return}if(w?.closest?.(".rtile__failure-pop"))return;if(w?.closest?.(".worker-drawer-overlay__backdrop")){Me.close(),ge.close();return}if(w?.closest?.(".worker-drawer-host"))return;let ks=w?.closest?.(".rtile .board-card__roll-toggle");if(ks){let _=ks.dataset.rollParent;_&&(xe.has(_)?xe.delete(_):xe.add(_),S());return}let $s=w?.closest?.(".rtile .board-card__roll-child");if($s){let _=$s.dataset.childId;_&&i&&i(_);return}let wo=w?.closest?.(".rtile");if(wo){if(w?.closest?.(".rtile__id")){let T=wo.dataset.beadId;T&&sn(T).then(N=>{N?he("\uBCF5\uC0AC\uB428","success",1200):he("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let _=wo.dataset.beadId;_&&i&&i(_);return}let et=w?.closest?.(".worker-mini, .worker-card");if(et){let _=et.dataset.beadId;if(w?.closest?.('[data-seam="log-path-copy"]'))return;if(w?.closest?.(".worker-mini__id, .worker-card__id")){_&&sn(_).then(N=>{N?he("\uBCF5\uC0AC\uB428","success",1200):he("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let T=w?.closest?.(".ctl-chip--from");if(T){let N=T.dataset.fromId;N&&i&&i(N);return}_&&i&&i(_)}}function yo(k){let w=k.target;w?.closest?.(".worker-search")&&(H=w.value,S())}function mn(k){let w=k.target;k.key!=="Escape"||!w?.closest?.(".worker-search")||H.length===0||(H="",S())}me.attach(e),e.addEventListener("click",Lt),e.addEventListener("change",at),e.addEventListener("input",yo),e.addEventListener("keydown",mn);function tr(k){let w=k.target,I=w&&typeof w.closest=="function"?le=>w.closest(le):()=>null;O&&!I(".rtile__failure-pop, .rtile__failure-badge")&&(O=null,S())}function nr(k){k.key!=="Escape"||O===null||(O=null,S())}return document.addEventListener("click",tr),document.addEventListener("keydown",nr),B.attach(),R.push(()=>{document.removeEventListener("click",tr),document.removeEventListener("keydown",nr),B.detach()}),Q(),h&&R.push(h.subscribe(()=>{re.notifyIssuesChanged(),S()})),o&&R.push(o.subscribe(()=>{let k=l&&l()||"";k!==Ze&&(Ze=k,We.close()),S(),nt()})),S(),{load(){re.ensureSessionDefaults(),S()},refreshSessionDefaults:ve,destroy(){for(let k of R.splice(0))try{k()}catch{}me.detach(),e.removeEventListener("click",Lt),e.removeEventListener("change",at),re.destroy();try{ge.destroy()}catch{}_e.hidden=!0;try{We.destroy()}catch{}ot(c``,e)}}}function Gl(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function p_(e,t,n,r=async()=>{},o=async()=>{}){let s=Ct("views:workspace-picker"),i=null,l=!1,a=!1,u=!1;async function d(M){let K=M.target.value,D=t.getState().workspace?.current?.path||"";if(K&&K!==D){s("switching workspace to %s",K),l=!0,L();try{await n(K)}catch(G){s("workspace switch failed: %o",G)}finally{l=!1,L()}}}async function p(){let M=t.getState(),W=M.workspace?.current?.path||M.workspace?.available?.[0]?.path||"";if(!(!W||a)){s("git-pulling workspace %s",W),a=!0,L();try{await r(W)}catch(K){s("workspace git pull failed: %o",K)}finally{a=!1,L()}}}function h(M){let W=M.target;W&&e.contains(W)||O()}function m(M){M.key==="Escape"&&O()}function v(){u||(u=!0,document.addEventListener("mousedown",h),document.addEventListener("keydown",m),L())}function O(){u&&(u=!1,document.removeEventListener("mousedown",h),document.removeEventListener("keydown",m),L())}function B(){u?O():v()}async function V(M){let W=M.target,K=W.value,H=W.checked;s("toggling visibility %s \u2192 %s",K,String(H));try{await o(K,H)}catch(D){s("workspace visibility toggle failed: %o",D)}}function ae(M){return M?c`
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
    `:c``}function F(M,W){return c`
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
                ${M.map(K=>c`
                    <label
                      class="workspace-picker__manage-row"
                      title="${K.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${K.path}"
                        .checked=${!W.has(K.path)}
                        @change=${V}
                      />
                      <span class="workspace-picker__manage-name"
                        >${Gl(K.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function q(){let M=t.getState(),W=M.workspace?.current,K=M.workspace?.available||[],H=new Set(M.workspace?.hidden||[]),D=W?.path||K[0]?.path||"";if(K.length===0)return c``;let G=K.filter(X=>!H.has(X.path)||X.path===D);if(G.length<=1){let X=G[0]||K[0],J=Gl(X.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${X.path}"
            >${J}</span
          >
          ${F(K,H)}
          ${ae(D)}
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
          ${G.map(X=>c`
              <option
                value="${X.path}"
                ?selected=${X.path===D}
                title="${X.path}"
              >
                ${Gl(X.path)}
              </option>
            `)}
        </select>
        ${F(K,H)}
        ${ae(D)}
        ${l||a?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function L(){ot(q(),e)}return L(),i=t.subscribe(()=>L()),{destroy(){i&&(i(),i=null),document.removeEventListener("mousedown",h),document.removeEventListener("keydown",m),ot(c``,e)}}}var f_=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","get-workspace-accounts","set-workspace-accounts","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-dismiss","worker-repo-operation-deploy-run","worker-queue-set-slots","worker-queue-set-serial-lane-count","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-cleanup-retry","worker-resolve-in-session","worker-parked-retry","worker-queue-hold-resume","worker-queue-hold-retry-now","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-discard-abandon","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-bead-timeline","get-worker-system-prompt","get-session-refs","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"];function Kl(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function __(e,t,n=Kl()){return{id:n,type:e,payload:t}}function m_(e={}){let t=Ct("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",o=null,s="closed",i=0,l=null,a=!0,u=new Map,d=[],p=new Map,h=new Set;function m(q){for(let L of Array.from(h))try{L(q)}catch{}}function v(){if(!a||l)return;s="reconnecting",t("ws reconnecting\u2026"),m(s);let q=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,i)),L=(n.jitterRatio||0)*q,M=Math.max(0,Math.round(q+(Math.random()*2-1)*L));t("ws retry in %d ms (attempt %d)",M,i+1),l=setTimeout(()=>{l=null,F()},M)}function O(q){try{o?.send(JSON.stringify(q))}catch(L){t("ws send failed",L)}}function B(){for(s="open",t("ws open"),m(s),i=0;d.length;){let q=d.shift();q&&O(q)}}function V(q){let L;try{L=JSON.parse(String(q.data))}catch{t("ws received non-JSON message");return}if(!L||typeof L.id!="string"||typeof L.type!="string"){t("ws received invalid envelope");return}if(u.has(L.id)){let W=u.get(L.id);u.delete(L.id),L.ok?W?.resolve(L.payload):W?.reject(L.error||new Error("ws error"));return}let M=p.get(L.type);if(M&&M.size>0)for(let W of Array.from(M))try{W(L.payload)}catch(K){t("ws event handler error",K)}else t("ws received unhandled message type: %s",L.type)}function ae(){s="closed",t("ws closed"),m(s);for(let[q,L]of u.entries())L.reject(new Error("ws disconnected")),u.delete(q);i+=1,v()}function F(){if(!a)return;let q=r();try{o=new WebSocket(q),t("ws connecting %s",q),s="connecting",m(s),o.addEventListener("open",B),o.addEventListener("message",V),o.addEventListener("error",()=>{}),o.addEventListener("close",ae)}catch(L){t("ws connect failed %o",L),v()}}return F(),{send(q,L){if(!f_.includes(q))return Promise.reject(new Error(`unknown message type: ${q}`));let M=Kl(),W=__(q,L,M);return t("send %s id=%s",q,M),new Promise((K,H)=>{u.set(M,{resolve:K,reject:H,type:q}),o&&o.readyState===o.OPEN?O(W):(t("queue %s id=%s (state=%s)",q,M,s),d.push(W))})},on(q,L){p.has(q)||p.set(q,new Set);let M=p.get(q);return M?.add(L),()=>{M?.delete(L)}},onConnection(q){return h.add(q),()=>{h.delete(q)}},reconnect(){a=!0,l&&(clearTimeout(l),l=null),i=0,F()},close(){a=!1,l&&(clearTimeout(l),l=null);try{o?.close()}catch{}},getState(){return s}}}function Tw(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function Cw(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var Yl=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],g_=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],hr="tab:worker:closed",Rw="bdui.worker.done-range",h_=mf,b_="worker:queue",y_="ui:order",v_="ui:display-policy",w_="exec:presets",br="tab:board:closed",k_="beads-ui.board.closed-range";function Ow(e){if(!e)return()=>{};function t(r){document.documentElement.style.setProperty("--app-header-h",`${Math.round(r)}px`)}if(t(e.getBoundingClientRect().height),typeof ResizeObserver!="function")return()=>{};let n=new ResizeObserver(r=>{for(let o of r)t(o.contentRect.height+Lw(e))});return n.observe(e),()=>n.disconnect()}function Lw(e){let t=getComputedStyle(e);return[t.paddingTop,t.paddingBottom,t.borderTopWidth,t.borderBottomWidth].reduce((r,o)=>r+(parseFloat(o)||0),0)}function Iw(e){let t=Ct("main");t("bootstrap start"),Ow(document.querySelector(".app-header"));let n=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;ot(n,e);let r=document.getElementById("global-nav"),o=document.getElementById("top-nav"),s=document.getElementById("repo-scope"),i=document.getElementById("usage-meter"),l=document.getElementById("board-root"),a=document.getElementById("worker-root"),u=document.getElementById("monitor-root"),d=document.getElementById("detail-panel");if(i&&Pf(i),l&&a&&u&&d){let ve=function(x,C){let we="Request failed",Fe="";if(x&&typeof x=="object"){let _t=x;if(typeof _t.message=="string"&&_t.message.length>0&&(we=_t.message),typeof _t.details=="string")Fe=_t.details;else if(_t.details&&typeof _t.details=="object")try{Fe=JSON.stringify(_t.details,null,2)}catch{Fe=""}}else typeof x=="string"&&x.length>0&&(we=x);let nt=C&&C.length>0?`Failed to load ${C}`:"Request failed";re.open(nt,we,Fe)},Ne=function(x){return`${$e.getState().workspace.current?.path||""}\0${x}`},lt=function(){Te&&(Te().catch(()=>{}),Te=null),ge=null,Me=null},Re=function(x){We=x;let C=()=>{We!==x||$e.getState().selected_id!==x||(We=null,Ue(x))};if(!z){qe.then(C);return}C()},Ie=function(x,C,we,Fe,nt){return we!==Se[C]?(nt().catch(()=>{}),!1):(x.set(Fe,nt),!0)},tt=function(){let x=$e.getState();gt(x.view==="board"),A(x.view==="worker"),Je(Pe(x)),oe(x.view==="board"||x.view==="worker"||Ge||!!x.selected_id)},Dt=function(){let x=Sr(ct);return x===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:x}}},ft=function(){let x=Sr(Tt);return x===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:x}}},gt=function(x){if(x)for(let[C,we]of Yl){if($.has(C)||Z.has(C))continue;let Fe=C===br?Dt():{type:we};try{Le.register(C,Fe)}catch(Lt){t("register %s store failed: %o",C,Lt)}Z.add(C);let nt=Se.board,_t=!1;_e.subscribeList(C,Fe).then(Lt=>{_t=!Ie($,"board",nt,C,Lt)}).catch(Lt=>{t("subscribe %s failed: %o",C,Lt),ve(Lt,"board")}).finally(()=>{Z.delete(C),_t&&tt()})}else bt()},bt=function(){Se.board+=1;for(let[x]of Yl){let C=$.get(x);C&&(C().catch(()=>{}),$.delete(x));try{Le.unregister(x)}catch(we){t("unregister %s failed: %o",x,we)}}},A=function(x){if(!x){j();return}for(let[C,we]of g_){if(ue.has(C)||Z.has(C))continue;let Fe=C===hr?ft():{type:we};try{Le.register(C,Fe)}catch(Lt){t("register %s store failed: %o",C,Lt)}Z.add(C);let nt=Se.worker,_t=!1;_e.subscribeList(C,Fe).then(Lt=>{_t=!Ie(ue,"worker",nt,C,Lt)}).catch(Lt=>{t("subscribe %s failed: %o",C,Lt),ve(Lt,"worker")}).finally(()=>{Z.delete(C),_t&&tt()})}},j=function(){Se.worker+=1;for(let[x]of g_){let C=ue.get(x);C&&(C().catch(()=>{}),ue.delete(x));try{Le.unregister(x)}catch(we){t("unregister %s failed: %o",x,we)}}},oe=function(x){if(!x){ie();return}se||(Oe("subscribe-worker-queue",{id:b_}).catch(C=>{t("subscribe-worker-queue failed: %o",C)}),se=()=>Oe("unsubscribe-worker-queue",{id:b_}))},ie=function(){se&&(se().catch(()=>{}),se=null)},Pe=function(x){return x.view==="monitor"||x.selected_id!=null},Je=function(x){if(!x){Xe();return}ce||(Oe("subscribe-monitor-pipeline",{id:h_}).catch(C=>{t("subscribe-monitor-pipeline failed: %o",C)}),ce=()=>Oe("unsubscribe-monitor-pipeline",{id:h_}))},Xe=function(){ce&&(ce().catch(()=>{}),ce=null)},vt=function(){je||(Oe("subscribe-ui-order",{id:y_}).catch(x=>{t("subscribe-ui-order failed: %o",x)}),je=()=>Oe("unsubscribe-ui-order",{id:y_}))},Ot=function(){je&&(je().catch(()=>{}),je=null),P.clear()},Vt=function(){ht||(Oe("subscribe-display-policy",{id:v_}).catch(x=>{t("subscribe-display-policy failed: %o",x)}),ht=()=>Oe("unsubscribe-display-policy",{id:v_}))},jt=function(){ht&&(ht().catch(()=>{}),ht=null),pe.clear()},zt=function(){St||(Oe("subscribe-impl-presets",{id:w_}).catch(x=>{t("subscribe-impl-presets failed: %o",x)}),St=()=>Oe("unsubscribe-impl-presets",{id:w_}))},en=function(x){if(!x)return"Unknown";let C=x.split("/").filter(Boolean);return C.length>0?C[C.length-1]:"Unknown"},Q=function(x,C){S.open(x.path,{missing_state:x.missing_state,...C?{workspace:C}:{}})};var p=ve,h=Ne,m=lt,v=Re,O=Ie,B=tt,V=Dt,ae=ft,F=gt,q=bt,L=A,M=j,W=oe,K=ie,H=Pe,D=Je,G=Xe,X=vt,J=Ot,fe=Vt,Ce=jt,U=zt,te=en,xe=Q;let Ee=document.getElementById("header-loading"),R=Nc(Ee),re=Bp(e),ye=m_(),Oe=R.wrapSend((x,C)=>ye.send(x,C)),_e=Rc(Oe),Le=Oc(),Ve=Ic(),Ye=cc(),P=Lc(),pe=ac(),ne=lc(),me=uc();ye.on("impl-presets-snapshot",x=>{let C=x;C&&typeof C.revision=="number"&&Array.isArray(C.presets)&&ne.set({revision:C.revision,presets:C.presets})}),ye.on("monitor-pipeline-snapshot",x=>{let C=x;if(!(!C||!Array.isArray(C.workspaces)))try{Ye.set(C.workspaces,C.workspaces_state,C.cross_lanes)}catch{}}),ye.on("ui-order-snapshot",x=>{let C=x;if(C&&typeof C.revision=="number")try{P.set({revision:C.revision,order:C.order&&typeof C.order=="object"?C.order:{}})}catch{}}),ye.on("display-policy-snapshot",x=>{let C=x;if(C&&C.policy&&typeof C.policy=="object")try{pe.set(C.policy)}catch{}}),ye.on("session-log-snapshot",x=>{let C=x;if(C&&typeof C.id=="string")try{me.set(C.id,Array.isArray(C.lines)?C.lines:[],typeof C.last_event_at=="number"?C.last_event_at:null)}catch{}}),ye.on("session-log-append",x=>{let C=x;if(C&&typeof C.id=="string")try{me.append(C.id,C.event)}catch{}}),ye.on("snapshot",x=>{let C=x,we=C&&typeof C.id=="string"?C.id:"",Fe=we?Le.getStore(we):null;if(Fe&&C&&C.type==="snapshot")try{Fe.applyPush(C)}catch{}}),ye.on("upsert",x=>{let C=x,we=C&&typeof C.id=="string"?C.id:"",Fe=we?Le.getStore(we):null;if(Fe&&C&&C.type==="upsert")try{Fe.applyPush(C)}catch{}}),ye.on("delete",x=>{let C=x,we=C&&typeof C.id=="string"?C.id:"",Fe=we?Le.getStore(we):null;if(Fe&&C&&C.type==="delete")try{Fe.applyPush(C)}catch{}});let Te=null,ge=null,Me=null,We=null,Ze=()=>{},qe=new Promise(x=>{Ze=()=>x(void 0)}),z=!1,Y=!1;async function Ue(x){let C=Ne(x);if(C===ge||C===Me)return;Me=C;let we=`detail:${x}`,Fe={type:"issue-detail",params:{id:x}};try{Le.register(we,Fe)}catch(nt){t("register detail store failed: %o",nt)}try{let nt=await _e.subscribeList(we,Fe);if($e.getState().selected_id!==x||Ne(x)!==C){await nt().catch(()=>{});return}Te&&await Te().catch(()=>{}),Te=nt,ge=C}catch(nt){t("detail subscribe failed: %o",nt),ve(nt,"issue details")}finally{Me===C&&(Me=null)}}let $=new Map,Z=new Set,Se={board:0,worker:0},Ge=!1,ct=Os;try{let x=window.localStorage.getItem(k_);pa(x)&&(ct=x)}catch{}let Tt="today";try{let x=window.localStorage.getItem(Rw);x!==null&&(Tt=qn(x))}catch{}async function mt(x){if(!pa(x)||x===ct)return;ct=x;try{window.localStorage.setItem(k_,x)}catch{}let C=$.get(br);if(!C)return;$.delete(br),await C().catch(()=>{});let we=Dt();try{Le.register(br,we)}catch(Fe){t("register %s store failed: %o",br,Fe)}try{let Fe=await _e.subscribeList(br,we);$.set(br,Fe)}catch(Fe){t("re-subscribe %s failed: %o",br,Fe),ve(Fe,"board")}}async function Rt(x){let C=qn(x);if(C===Tt)return;Tt=C;let we=ue.get(hr);if(!we)return;ue.delete(hr),await we().catch(()=>{});let Fe=ft();try{Le.register(hr,Fe)}catch(nt){t("register %s store failed: %o",hr,nt)}try{let nt=await _e.subscribeList(hr,Fe);ue.set(hr,nt)}catch(nt){t("re-subscribe %s failed: %o",hr,nt),ve(nt,"worker")}}let ue=new Map,se=null,ce=null,je=null,ht=null,St=null;async function ut(){ht=null,pe.clear(),St=null,ne.clear(),se=null,ce=null,$.clear(),ue.clear(),Se.board+=1,Se.worker+=1,zt();let x=$e.getState().workspace.current?.path;if(x)try{await ye.send("set-workspace",{path:x})}catch(we){t("workspace restore after reconnect failed: %o",we);return}Vt();let C=$e.getState();gt(C.view==="board"),A(C.view==="worker"),Je(Pe(C)),oe(C.view==="board"||C.view==="worker"||!!C.selected_id)}async function Bt(){t("clearing all subscriptions for workspace switch"),bt(),j(),ie(),Ve.clear(),Ot(),vt(),jt(),Vt(),lt();let x=$e.getState();if(x.selected_id)try{Le.unregister(`detail:${x.selected_id}`)}catch{}let C=$e.getState();gt(C.view==="board"),A(C.view==="worker"),Je(Pe(C)),oe(C.view==="board"||C.view==="worker"||!!C.selected_id),C.selected_id&&Re(C.selected_id)}async function Xt(x){t("requesting workspace switch to %s",x),Y=!0;try{let C=await ye.send("set-workspace",{path:x});t("workspace switch result: %o",C),C&&C.workspace&&($e.setState({workspace:{current:{path:C.workspace.root_dir,database:C.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",x),C.changed&&(await Bt(),he("Switched to "+en(x),"success",2e3)))}catch(C){throw t("workspace switch failed: %o",C),he("Failed to switch workspace","error",3e3),C}finally{Y=!1}}async function Nt(x){t("requesting workspace git pull for %s",x);try{let C=await ye.send("git-pull-workspace",{});t("workspace git pull result: %o",C);let we=C?.status;if(we==="up_to_date"){he("Already up to date","success",2e3);return}if(we==="stash_pop_conflict"){he("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}he("Git pulled "+en(x),"success",2e3)}catch(C){t("workspace git pull failed: %o",C);let we=C?.code,Fe=C?.message;if(we==="rebase_conflict"){he("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(we==="rebase_conflict_abort_failed"){he("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(we==="busy"){he("Git pull skipped: another operation is running","warning",3e3);return}let nt=Fe?`: ${Fe}`:"";throw he(`Git pull failed${nt}`,"error",3e3),C}}async function rn(x,C){t("setting workspace visibility %s \u2192 %s",x,String(C));try{await ye.send("set-workspace-visibility",{path:x,visible:C}),await Ft()}catch(we){t("workspace visibility update failed: %o",we),he("Failed to update project visibility","error",3e3)}}async function Ft(){try{let x=await ye.send("list-workspaces",{});if(t("workspaces loaded: %o",x),x&&Array.isArray(x.workspaces)){let C=x.workspaces.map(_t=>({path:_t.path,database:_t.database,pid:_t.pid,version:_t.version})),we=x.current?{path:x.current.root_dir,database:x.current.db_path}:null,Fe=Array.isArray(x.hidden)?x.hidden.filter(_t=>typeof _t=="string"):[];$e.setState({workspace:{current:we,available:C,hidden:Fe}});let nt=window.localStorage.getItem("beads-ui.workspace");nt&&(!C.some(Lt=>Lt.path===nt)||Fe.includes(nt)?window.localStorage.removeItem("beads-ui.workspace"):we&&nt!==we.path&&(t("restoring saved workspace preference: %s",nt),await Xt(nt)))}}catch(x){t("failed to load workspaces: %o",x)}}ye.on("workspace-changed",x=>{t("workspace-changed event: %o",x),x&&x.root_dir&&($e.setState({workspace:{current:{path:x.root_dir,database:x.db_path}}}),Ft(),Bt())});let dn=!1;if(typeof ye.onConnection=="function"){let x=C=>{t("ws state %s",C),C==="reconnecting"||C==="closed"?(dn=!0,he("Connection lost. Reconnecting\u2026","error",4e3)):C==="open"&&dn&&(dn=!1,he("Reconnected","success",2200),Cw($e,(we,Fe)=>{t(`${we}: %o`,Fe)}),ut())};ye.onConnection(x)}let tn="board";try{let x=window.localStorage.getItem("beads-ui.view");(x==="board"||x==="worker"||x==="monitor")&&(tn=x)}catch(x){t("view parse error: %o",x)}let $e=Dc({config:Tw(),view:tn});ye.on("worker-queue-snapshot",x=>{let C=x;if(!C||!C.queue)return;let we=$e.getState().workspace.current?.path;if(typeof we=="string"&&we.length>0&&C.root_dir!==we){t("dropping worker-queue snapshot for %s",String(C.root_dir));return}try{Ve.set(C.queue)}catch{}});let E=Mc($e);E.start();let be=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"]),De=async(x,C)=>{try{return await Oe(x,C)}catch(we){if(be.has(x))throw we;return[]}};hf({global_element:r,repo_element:o},$e,E);let b=document.getElementById("workspace-picker");b&&p_(b,$e,Xt,Nt,rn);let y=wf(e,(x,C)=>Oe(x,C));try{let x=document.getElementById("new-issue-btn");x&&x.addEventListener("click",()=>y.open())}catch{}let f=Af(e,{policyStore:pe,queueStore:Ve,implPresetStore:ne,transport:(x,C)=>Oe(x,C),onOpenChange:x=>{let C=Ge;Ge=x,tt(),C&&x===!1&&de.refreshSessionDefaults()},labelOptions:()=>{let x=new Set;for(let[C]of Yl)for(let we of Le.snapshotFor(C)||[]){let Fe=we.labels;if(Array.isArray(Fe))for(let nt of Fe)typeof nt=="string"&&nt.length>0&&x.add(nt)}return Array.from(x).sort()}});try{let x=document.getElementById("display-settings-btn");x&&(x.setAttribute("aria-label","\uC124\uC815"),x.setAttribute("title","\uC124\uC815"),x.addEventListener("click",()=>f.open()))}catch{}let g=document.createElement("div");g.className="md-viewer-root",document.body.appendChild(g);let S=Gi(g,{getWorkspacePath:()=>$e.getState().workspace.current?.path}),ee=Jc(l,{gotoIssue:x=>E.gotoIssue(x),issueStores:Le,transport:De,workerQueueStore:Ve,uiOrderStore:P,displayPolicyStore:pe,closedRange:ct,onClosedRangeChange:x=>{mt(x)},onNewIssue:()=>y.open(),openDoc:Q}),de=Hl(a,{transport:De,issueStores:Le,queueStore:Ve,sessionLogStore:me,gotoIssue:x=>$e.setState({selected_id:x}),getWorkspacePath:()=>$e.getState().workspace.current?.path,switchWorkspace:x=>Xt(x),openDoc:Q,doneRange:Tt,onDoneRangeChange:x=>{Rt(x)}}),rt=gf(u,{transport:De,pipelineStore:Ye,execPresetStore:ne,sessionLogStore:me,router:E,gotoIssue:x=>E.gotoIssue(x),getWorkspacePath:()=>$e.getState().workspace.current?.path,switchWorkspace:x=>Xt(x),openDoc:Q}),dt=Fp(d,{issueStores:Le,transport:De,queueStore:Ve,execPresetStore:ne,sessionLogStore:me,getWorkspacePath:()=>$e.getState().workspace.current?.path,mdViewer:S,depCandidates:()=>{let x=Ye.get();if(x===null)return null;let C=Ye.getWorkspacesState(),we=$e.getState();if(we.view==="monitor")return ol(x,C);let Fe=we.workspace.current?.path;return Fe?ol(x,C,{root_dir:Fe}):null},subscribeCandidates:x=>Ye.subscribe(x),onDepChanged:({type:x,a:C,b:we})=>{let Fe=rt;x==="dep-add"&&Fe&&typeof Fe.recorrectSharedLane=="function"&&Fe.recorrectSharedLane(x,C,we)},onNavigate:(x,C)=>{let we=()=>{$e.getState().view==="worker"?$e.setState({selected_id:x}):E.gotoIssue(x)},Fe=$e.getState().workspace.current?.path;if(typeof C!="string"||C.length===0||!Fe||C===Fe){we();return}Promise.resolve(Xt(C)).then(we).catch(()=>{he("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})},onClose:()=>{let x=$e.getState();$e.setState({selected_id:null});try{E.gotoView(x.view==="worker"||x.view==="monitor"?x.view:"board")}catch{}},onOpenExecPresets:()=>{f.open("execution")}}),at=$e.getState().selected_id;at&&(d.hidden=!1,dt.load(at),Re(at)),$e.subscribe(x=>{let C=x.selected_id;C?(d.hidden=!1,dt.load(C),Y||Re(C)):(dt.clear(),d.hidden=!0,lt())});let $t=x=>{l.hidden=x.view!=="board",a.hidden=x.view!=="worker",u.hidden=x.view!=="monitor",s&&s.classList.toggle("is-quiet",x.view==="monitor"),gt(x.view==="board"),A(x.view==="worker"),Je(Pe(x)),oe(x.view==="board"||x.view==="worker"||Ge||!!x.selected_id),!x.selected_id&&x.view==="board"&&ee.load(),x.view==="worker"&&de.load(),x.view==="monitor"?rt.load():rt.pause(),window.localStorage.setItem("beads-ui.view",x.view)};$e.subscribe($t),$t($e.getState()),vt(),Vt(),zt(),Ft().finally(()=>{z=!0,Ze()}),window.addEventListener("keydown",x=>{let C=x.ctrlKey||x.metaKey,we=String(x.key||"").toLowerCase(),Fe=x.target,nt=Fe&&Fe.tagName?String(Fe.tagName).toLowerCase():"",_t=nt==="input"||nt==="textarea"||nt==="select"||Fe&&typeof Fe.isContentEditable=="boolean"&&Fe.isContentEditable;C&&we==="n"&&(_t||(x.preventDefault(),y.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,o=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",o);let s=document.getElementById("theme-switch");s&&(s.checked=o==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&Iw(t)});export{Iw as bootstrap,Tw as readBootstrapConfig,Cw as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
