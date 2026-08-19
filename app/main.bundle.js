var Od=Object.create;var Xs=Object.defineProperty;var Pd=Object.getOwnPropertyDescriptor;var Dd=Object.getOwnPropertyNames;var Md=Object.getPrototypeOf,Nd=Object.prototype.hasOwnProperty;var Fd=(e,t,r)=>t in e?Xs(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var Qs=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var qd=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Dd(t))!Nd.call(e,s)&&s!==r&&Xs(e,s,{get:()=>t[s],enumerable:!(n=Pd(t,s))||n.enumerable});return e};var Bd=(e,t,r)=>(r=e!=null?Od(Md(e)):{},qd(t||!e||!e.__esModule?Xs(r,"default",{value:e,enumerable:!0}):r,e));var rt=(e,t,r)=>Fd(e,typeof t!="symbol"?t+"":t,r);var ti=Qs((Cm,ei)=>{var jr=1e3,Ur=jr*60,Wr=Ur*60,Ir=Wr*24,Wd=Ir*7,zd=Ir*365.25;ei.exports=function(e,t){t=t||{};var r=typeof e;if(r==="string"&&e.length>0)return Hd(e);if(r==="number"&&isFinite(e))return t.long?Vd(e):Gd(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function Hd(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*zd;case"weeks":case"week":case"w":return r*Wd;case"days":case"day":case"d":return r*Ir;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Wr;case"minutes":case"minute":case"mins":case"min":case"m":return r*Ur;case"seconds":case"second":case"secs":case"sec":case"s":return r*jr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function Gd(e){var t=Math.abs(e);return t>=Ir?Math.round(e/Ir)+"d":t>=Wr?Math.round(e/Wr)+"h":t>=Ur?Math.round(e/Ur)+"m":t>=jr?Math.round(e/jr)+"s":e+"ms"}function Vd(e){var t=Math.abs(e);return t>=Ir?Wn(e,t,Ir,"day"):t>=Wr?Wn(e,t,Wr,"hour"):t>=Ur?Wn(e,t,Ur,"minute"):t>=jr?Wn(e,t,jr,"second"):e+" ms"}function Wn(e,t,r,n){var s=t>=r*1.5;return Math.round(e/r)+" "+n+(s?"s":"")}});var ni=Qs((Rm,ri)=>{function Yd(e){r.debug=r,r.default=r,r.coerce=c,r.disable=a,r.enable=s,r.enabled=l,r.humanize=ti(),r.destroy=u,Object.keys(e).forEach(f=>{r[f]=e[f]}),r.names=[],r.skips=[],r.formatters={};function t(f){let m=0;for(let b=0;b<f.length;b++)m=(m<<5)-m+f.charCodeAt(b),m|=0;return r.colors[Math.abs(m)%r.colors.length]}r.selectColor=t;function r(f){let m,b=null,E,k;function N(...D){if(!N.enabled)return;let A=N,j=Number(new Date),ee=j-(m||j);A.diff=ee,A.prev=m,A.curr=j,m=j,D[0]=r.coerce(D[0]),typeof D[0]!="string"&&D.unshift("%O");let x=0;D[0]=D[0].replace(/%([a-zA-Z%])/g,(S,H)=>{if(S==="%%")return"%";x++;let Y=r.formatters[H];if(typeof Y=="function"){let ge=D[x];S=Y.call(A,ge),D.splice(x,1),x--}return S}),r.formatArgs.call(A,D),(A.log||r.log).apply(A,D)}return N.namespace=f,N.useColors=r.useColors(),N.color=r.selectColor(f),N.extend=n,N.destroy=r.destroy,Object.defineProperty(N,"enabled",{enumerable:!0,configurable:!1,get:()=>b!==null?b:(E!==r.namespaces&&(E=r.namespaces,k=r.enabled(f)),k),set:D=>{b=D}}),typeof r.init=="function"&&r.init(N),N}function n(f,m){let b=r(this.namespace+(typeof m>"u"?":":m)+f);return b.log=this.log,b}function s(f){r.save(f),r.namespaces=f,r.names=[],r.skips=[];let m=(typeof f=="string"?f:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let b of m)b[0]==="-"?r.skips.push(b.slice(1)):r.names.push(b)}function o(f,m){let b=0,E=0,k=-1,N=0;for(;b<f.length;)if(E<m.length&&(m[E]===f[b]||m[E]==="*"))m[E]==="*"?(k=E,N=b,E++):(b++,E++);else if(k!==-1)E=k+1,N++,b=N;else return!1;for(;E<m.length&&m[E]==="*";)E++;return E===m.length}function a(){let f=[...r.names,...r.skips.map(m=>"-"+m)].join(",");return r.enable(""),f}function l(f){for(let m of r.skips)if(o(f,m))return!1;for(let m of r.names)if(o(f,m))return!0;return!1}function c(f){return f instanceof Error?f.stack||f.message:f}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}ri.exports=Yd});var si=Qs((Ct,zn)=>{Ct.formatArgs=Zd;Ct.save=Xd;Ct.load=Qd;Ct.useColors=Kd;Ct.storage=Jd();Ct.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();Ct.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Kd(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Zd(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+zn.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let r=0,n=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),e.splice(n,0,t)}Ct.log=console.debug||console.log||(()=>{});function Xd(e){try{e?Ct.storage.setItem("debug",e):Ct.storage.removeItem("debug")}catch{}}function Qd(){let e;try{e=Ct.storage.getItem("debug")||Ct.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function Jd(){try{return localStorage}catch{}}zn.exports=ni()(Ct);var{formatters:eu}=zn.exports;eu.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var tn=globalThis,Nn=tn.trustedTypes,qa=Nn?Nn.createPolicy("lit-html",{createHTML:e=>e}):void 0,eo="$lit$",ar=`lit$${Math.random().toFixed(9).slice(2)}$`,to="?"+ar,jd=`<${to}>`,Er=document,rn=()=>Er.createComment(""),nn=e=>e===null||typeof e!="object"&&typeof e!="function",ro=Array.isArray,Ha=e=>ro(e)||typeof e?.[Symbol.iterator]=="function",Js=`[ 	
\f\r]`,en=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ba=/-->/g,ja=/>/g,Sr=RegExp(`>|${Js}(?:([^\\s"'>=/]+)(${Js}*=${Js}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ua=/'/g,Wa=/"/g,Ga=/^(?:script|style|textarea|title)$/i,no=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),i=no(1),gr=no(2),km=no(3),Mt=Symbol.for("lit-noChange"),lt=Symbol.for("lit-nothing"),za=new WeakMap,Ar=Er.createTreeWalker(Er,129);function Va(e,t){if(!ro(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return qa!==void 0?qa.createHTML(t):t}var Ya=(e,t)=>{let r=e.length-1,n=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=en;for(let l=0;l<r;l++){let c=e[l],u,f,m=-1,b=0;for(;b<c.length&&(a.lastIndex=b,f=a.exec(c),f!==null);)b=a.lastIndex,a===en?f[1]==="!--"?a=Ba:f[1]!==void 0?a=ja:f[2]!==void 0?(Ga.test(f[2])&&(s=RegExp("</"+f[2],"g")),a=Sr):f[3]!==void 0&&(a=Sr):a===Sr?f[0]===">"?(a=s??en,m=-1):f[1]===void 0?m=-2:(m=a.lastIndex-f[2].length,u=f[1],a=f[3]===void 0?Sr:f[3]==='"'?Wa:Ua):a===Wa||a===Ua?a=Sr:a===Ba||a===ja?a=en:(a=Sr,s=void 0);let E=a===Sr&&e[l+1].startsWith("/>")?" ":"";o+=a===en?c+jd:m>=0?(n.push(u),c.slice(0,m)+eo+c.slice(m)+ar+E):c+ar+(m===-2?l:E)}return[Va(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},sn=class e{constructor({strings:t,_$litType$:r},n){let s;this.parts=[];let o=0,a=0,l=t.length-1,c=this.parts,[u,f]=Ya(t,r);if(this.el=e.createElement(u,n),Ar.currentNode=this.el.content,r===2||r===3){let m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(s=Ar.nextNode())!==null&&c.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let m of s.getAttributeNames())if(m.endsWith(eo)){let b=f[a++],E=s.getAttribute(m).split(ar),k=/([.?@])?(.*)/.exec(b);c.push({type:1,index:o,name:k[2],strings:E,ctor:k[1]==="."?qn:k[1]==="?"?Bn:k[1]==="@"?jn:Cr}),s.removeAttribute(m)}else m.startsWith(ar)&&(c.push({type:6,index:o}),s.removeAttribute(m));if(Ga.test(s.tagName)){let m=s.textContent.split(ar),b=m.length-1;if(b>0){s.textContent=Nn?Nn.emptyScript:"";for(let E=0;E<b;E++)s.append(m[E],rn()),Ar.nextNode(),c.push({type:2,index:++o});s.append(m[b],rn())}}}else if(s.nodeType===8)if(s.data===to)c.push({type:2,index:o});else{let m=-1;for(;(m=s.data.indexOf(ar,m+1))!==-1;)c.push({type:7,index:o}),m+=ar.length-1}o++}}static createElement(t,r){let n=Er.createElement("template");return n.innerHTML=t,n}};function Tr(e,t,r=e,n){if(t===Mt)return t;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=nn(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(t=Tr(e,s._$AS(e,t.values),s,n)),t}var Fn=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:n}=this._$AD,s=(t?.creationScope??Er).importNode(r,!0);Ar.currentNode=s;let o=Ar.nextNode(),a=0,l=0,c=n[0];for(;c!==void 0;){if(a===c.index){let u;c.type===2?u=new Br(o,o.nextSibling,this,t):c.type===1?u=new c.ctor(o,c.name,c.strings,this,t):c.type===6&&(u=new Un(o,this,t)),this._$AV.push(u),c=n[++l]}a!==c?.index&&(o=Ar.nextNode(),a++)}return Ar.currentNode=Er,s}p(t){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}},Br=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,n,s){this.type=2,this._$AH=lt,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=Tr(this,t,r),nn(t)?t===lt||t==null||t===""?(this._$AH!==lt&&this._$AR(),this._$AH=lt):t!==this._$AH&&t!==Mt&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ha(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==lt&&nn(this._$AH)?this._$AA.nextSibling.data=t:this.T(Er.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=sn.createElement(Va(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new Fn(s,this),a=o.u(this.options);o.p(r),this.T(a),this._$AH=o}}_$AC(t){let r=za.get(t.strings);return r===void 0&&za.set(t.strings,r=new sn(t)),r}k(t){ro(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of t)s===r.length?r.push(n=new e(this.O(rn()),this.O(rn()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Cr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,n,s,o){this.type=1,this._$AH=lt,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=lt}_$AI(t,r=this,n,s){let o=this.strings,a=!1;if(o===void 0)t=Tr(this,t,r,0),a=!nn(t)||t!==this._$AH&&t!==Mt,a&&(this._$AH=t);else{let l=t,c,u;for(t=o[0],c=0;c<o.length-1;c++)u=Tr(this,l[n+c],r,c),u===Mt&&(u=this._$AH[c]),a||(a=!nn(u)||u!==this._$AH[c]),u===lt?t=lt:t!==lt&&(t+=(u??"")+o[c+1]),this._$AH[c]=u}a&&!s&&this.j(t)}j(t){t===lt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},qn=class extends Cr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===lt?void 0:t}},Bn=class extends Cr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==lt)}},jn=class extends Cr{constructor(t,r,n,s,o){super(t,r,n,s,o),this.type=5}_$AI(t,r=this){if((t=Tr(this,t,r,0)??lt)===Mt)return;let n=this._$AH,s=t===lt&&n!==lt||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==lt&&(n===lt||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Un=class{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){Tr(this,t)}},Ka={M:eo,P:ar,A:to,C:1,L:Ya,R:Fn,D:Ha,V:Tr,I:Br,H:Cr,N:Bn,U:jn,B:qn,F:Un},Ud=tn.litHtmlPolyfillSupport;Ud?.(sn,Br),(tn.litHtmlVersions??(tn.litHtmlVersions=[])).push("3.3.1");var je=(e,t,r)=>{let n=r?.renderBefore??t,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new Br(t.insertBefore(rn(),o),o,void 0,r??{})}return s._$AI(e),s};var Lt="today",tr=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Nt(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function Rr(e,t=Date.now()){switch(e){case"today":{let r=new Date(t);return r.setHours(0,0,0,0),r.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function Za(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Xa(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Qa(){let e=null,t=[],r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],n()},clear(){e=null,t=[],n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function Ja(){let e=new Map,t=new Set;function r(s){return s.startsWith("session-log:")?s:`session-log:${s}`}function n(){for(let s of Array.from(t))try{s()}catch{}}return{set(s,o,a=null){e.set(r(s),{lines:Array.isArray(o)?[...o]:[],last_event_at:typeof a=="number"?a:null}),n()},append(s,o){let a=r(s),l=e.get(a)||{lines:[],last_event_at:null};l.lines=[...l.lines,o],l.last_event_at=Date.now(),e.set(a,l),n()},get(s){return e.get(r(s))||null},clear(s){typeof s=="string"?e.delete(r(s)):e.clear(),n()},subscribe(s){return t.add(s),()=>t.delete(s)}}}var oi=Bd(si(),1);function at(e){return(0,oi.default)(`beads-ui:${e}`)}function zt(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Lr(e,t){let r=zt(e.created_at),n=zt(t.created_at);if(r!==n)return r<n?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,l=t.id;return a<l?-1:a>l?1:0}function li(e,t){let r=zt(e.created_at),n=zt(t.created_at);if(r!==n)return r<n?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,l=t.id;return a<l?-1:a>l?1:0}function ci(e,t){let r=zt(e.updated_at),n=zt(t.updated_at);if(r!==n)return r<n?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function di(e,t){let r=e.priority??2,n=t.priority??2;if(r!==n)return r-n;let s=zt(e.created_at),o=zt(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,l=t.id;return a<l?-1:a>l?1:0}function ui(e,t){let r=e.closed_at??0,n=t.closed_at??0;if(r!==n)return r<n?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var tu=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function ai(e){let t=e&&e.metadata,r=t?t.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function ii(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let r=tu.exec(t);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function pi(e,t){let r=ai(e),n=ai(t);if(r!==n)return r<n?-1:1;let s=ii(e),o=ii(t);if(s!==o)return s<o?-1:1;let a=zt(e&&e.created_at),l=zt(t&&t.created_at);if(a!==l)return a<l?-1:1;let c=e&&e.id,u=t&&t.id;return c===u?0:String(c)<String(u)?-1:1}var so=2**20;function zr(e,t){let r=e&&e.id;return t&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(t,r)&&typeof t[r]=="number"&&Number.isFinite(t[r])?t[r]:-zt(e&&e.created_at)}function Hn(e){return(t,r)=>{let n=zr(t,e),s=zr(r,e);if(n!==s)return n<s?-1:1;let o=t?.id,a=r?.id;return o<a?-1:o>a?1:0}}function oo(e,t,r){let n=Array.isArray(e)?e:[],s=n.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?n[o-1]:null,l=o+1<s?n[o+1]:null;if(!a&&!l)return{rank:0};if(!a)return{rank:zr(l,r)-so};if(!l)return{rank:zr(a,r)+so};let c=zr(a,r),u=zr(l,r),f=(c+u)/2;return c<f&&f<u?{rank:f}:{renormalize:n.map((m,b)=>({bead_id:m.id,rank:b*so}))}}function ao(e,t={}){let r=at(`issue-store:${e}`),n=new Map,s=[],o=0,a=new Set,l=!1,c=t.sort||Lr;function u(){for(let b of Array.from(a))try{b()}catch{}}function f(){s=Array.from(n.values()).sort(c)}function m(b){if(l||!b||b.id!==e)return;let E=Number(b.revision)||0;if(r("apply %s rev=%d",b.type,E),!(E<=o&&b.type!=="snapshot")){if(b.type==="snapshot"){if(E<=o)return;n.clear();let k=Array.isArray(b.issues)?b.issues:[];for(let N of k)N&&typeof N.id=="string"&&N.id.length>0&&n.set(N.id,N);f(),o=E,u();return}if(b.type==="upsert"){let k=b.issue;if(k&&typeof k.id=="string"&&k.id.length>0){let N=n.get(k.id);if(!N)n.set(k.id,k);else{let D=Number.isFinite(N.updated_at)?N.updated_at:0,A=Number.isFinite(k.updated_at)?k.updated_at:0;if(D<=A){for(let j of Object.keys(N))j in k||delete N[j];for(let[j,ee]of Object.entries(k))N[j]=ee}}f()}o=E,u()}else if(b.type==="delete"){let k=String(b.issue_id||"");k&&(n.delete(k),f()),o=E,u()}}}return{id:e,subscribe(b){return a.add(b),()=>{a.delete(b)}},applyPush:m,snapshot(){return s},size(){return n.size},getById(b){return n.get(b)},dispose(){l=!0,n.clear(),s=[],a.clear(),o=0}}}function Gn(e){let t=String(e.type||"").trim(),r={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];r[o]=String(a)}}let n=new URLSearchParams(r).toString();return n.length>0?`${t}?${n}`:t}function fi(e){let t=at("subs"),r=new Map,n=new Map;function s(l,c){t("applyDelta %s +%d ~%d -%d",l,(c.added||[]).length,(c.updated||[]).length,(c.removed||[]).length);let u=n.get(l);if(!u||u.size===0)return;let f=Array.isArray(c.added)?c.added:[],m=Array.isArray(c.updated)?c.updated:[],b=Array.isArray(c.removed)?c.removed:[];for(let E of Array.from(u)){let k=r.get(E);if(!k)continue;let N=k.itemsById;for(let D of f)typeof D=="string"&&D.length>0&&N.set(D,!0);for(let D of m)typeof D=="string"&&D.length>0&&N.set(D,!0);for(let D of b)typeof D=="string"&&D.length>0&&N.delete(D)}}async function o(l,c){let u=Gn(c);if(t("subscribe %s key=%s",l,u),!r.has(l))r.set(l,{key:u,itemsById:new Map});else{let m=r.get(l);if(m&&m.key!==u){let b=n.get(m.key);b&&(b.delete(l),b.size===0&&n.delete(m.key)),r.set(l,{key:u,itemsById:new Map})}}n.has(u)||n.set(u,new Set);let f=n.get(u);f&&f.add(l);try{await e("subscribe-list",{id:l,type:c.type,params:c.params})}catch(m){let b=r.get(l)||null;if(b){let E=n.get(b.key);E&&(E.delete(l),E.size===0&&n.delete(b.key))}throw r.delete(l),m}return async()=>{t("unsubscribe %s key=%s",l,u);try{await e("unsubscribe-list",{id:l})}catch{}let m=r.get(l)||null;if(m){let b=n.get(m.key);b&&(b.delete(l),b.size===0&&n.delete(m.key))}r.delete(l)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:Gn,selectors:{getIds(l){let c=r.get(l);return c?Array.from(c.itemsById.keys()):[]},has(l,c){let u=r.get(l);return u?u.itemsById.has(c):!1},count(l){let c=r.get(l);return c?c.itemsById.size:0},getItemsById(l){let c=r.get(l),u={};if(!c)return u;for(let f of c.itemsById.keys())u[f]=!0;return u}}}}function _i(){let e=at("issue-stores"),t=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let c of Array.from(n))try{c()}catch{}}function a(c,u,f){let m=u?Gn(u):"",b=r.get(c)||"",E=t.has(c);if(e("register %s key=%s (prev=%s)",c,m,b),E&&b&&m&&b!==m){let k=t.get(c);if(k)try{k.dispose()}catch{}let N=s.get(c);if(N){try{N()}catch{}s.delete(c)}let D=ao(c,f);t.set(c,D);let A=D.subscribe(()=>o());s.set(c,A)}else if(!E){let k=ao(c,f);t.set(c,k);let N=k.subscribe(()=>o());s.set(c,N)}return r.set(c,m),()=>l(c)}function l(c){e("unregister %s",c),r.delete(c);let u=t.get(c);u&&(u.dispose(),t.delete(c));let f=s.get(c);if(f){try{f()}catch{}s.delete(c)}}return{register:a,unregister:l,getStore(c){return t.get(c)||null},snapshotFor(c){let u=t.get(c);return u?u.snapshot().slice():[]},subscribe(c){return n.add(c),()=>n.delete(c)}}}function mi(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function gi(){let e=null,t=!1,r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},set(s){e=s,n()},isPending(){return t},setPending(s){let o=s===!0;o!==t&&(t=o,n())},clear(){e=null,t=!1,n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function bi(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function io(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function ru(e){let t=String(e||""),r=t.startsWith("#")?t.slice(1):t,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let l=new URLSearchParams(s).get("issue");if(l)return decodeURIComponent(l)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function nu(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function hi(e){let t=at("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):ru(n),a=nu(n);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let c=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==c&&(window.location.hash=c)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=io(o,n);t("goto issue %s (view=%s)",n,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?io(n,o):`#/${n}`;t("goto view %s (id=%s)",n,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var su=Object.freeze({workspace_config:{default_workspace:null}});function yi(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:su.workspace_config.default_workspace}}}function vi(e={}){let t=at("state"),r={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:yi(e.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let a={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?yi(o.config):r.config},l=a.workspace.current?.path!==r.workspace.current?.path||a.workspace.available.length!==r.workspace.available.length||a.workspace.hidden.length!==r.workspace.hidden.length||a.workspace.hidden.some((u,f)=>u!==r.workspace.hidden[f]),c=a.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;a.selected_id===r.selected_id&&a.view===r.view&&a.filters.status===r.filters.status&&a.filters.search===r.filters.search&&a.filters.type===r.filters.type&&a.board.closed_filter===r.board.closed_filter&&a.worker.selected_parent_id===r.worker.selected_parent_id&&a.worker.show_closed_children.length===r.worker.show_closed_children.length&&a.worker.show_closed_children.every((u,f)=>u===r.worker.show_closed_children[f])&&!l&&!c||(r=a,t("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function wi(e){let t=at("activity"),r=0,n=new Map,s=1;function o(){if(!e)return;let u=r>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function a(){r+=1,t("start count=%d",r),o()}function l(){let u=r;r=Math.max(0,r-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,r),o()}function c(u){return async(m,b)=>{let E=s++,k=Date.now();n.set(E,{type:m,start_ts:k}),t("request start id=%d type=%s count=%d",E,m,r+1),a();let N=!1,D=()=>{N||(N=!0,n.delete(E),l())},A=setTimeout(()=>{N||(t("request TIMEOUT id=%d type=%s elapsed=%dms",E,m,Date.now()-k),D())},3e4);try{let j=await u(m,b),ee=Date.now()-k;return t("request done id=%d type=%s elapsed=%dms",E,m,ee),j}catch(j){let ee=Date.now()-k;throw t("request error id=%d type=%s elapsed=%dms err=%o",E,m,ee,j),j}finally{clearTimeout(A),D()}}}return o(),{wrapSend:c,start:a,done:l,getCount:()=>r,getActiveRequests:()=>{let u=Date.now();return Array.from(n.entries()).map(([f,m])=>({id:f,type:m.type,elapsed_ms:u-m.start_ts}))}}}function ie(e,t="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=e,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",t==="success"?n.style.background="#156d36":t==="warning"?n.style.background="#a36a00":t==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function Vn(e=void 0,t=void 0){function r(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function n(o,a,l){let c=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return c.sort(ui),c;switch(l){case"created_desc":return c.sort(Lr),c;case"created_asc":return c.sort(li),c;case"updated_desc":return c.sort(ci),c;case"priority":return c.sort(di),c;case"manual":default:{let u=r();return u?c.sort(Hn(u)):c.sort(Lr),c}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let l of a)try{l()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function Or(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function mt(e){let t=Or(e);if(t===null)return"";let r=new Date(t),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function Ot(e,t){let r=Or(e);if(r===null)return"";let s=(typeof t=="number"?t:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let l=Math.floor(s/864e5);if(l<7)return`${l}\uC77C \uC804`;let c=Math.floor(l/7);if(l<30)return`${c}\uC8FC \uC804`;let u=Math.floor(l/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function Yn(e){if(!Array.isArray(e))return null;let t=null,r=-1;for(let n of e){if(!n||n.status!=="in_progress")continue;let s=Or(n.updated_at)??0;if(t===null||s>r){t=n,r=s;continue}s===r&&String(n.id)<String(t.id)&&(t=n)}return t}function Kn(e){let t=e.transport,r=e.uiOrderStore;function n(a,l){return"renormalize"in a?a.renormalize:[{bead_id:l,rank:a.rank}]}function s(a,l){let c={...a.order};for(let u of l)c[u.bead_id]=u.rank;r&&r.set({revision:a.revision,order:c})}async function o(a,l,c){if(!t||!r)return;let u=r.get()||{revision:0,order:{}},f=n(oo(l,c,u.order),a);s(u,f);let m=await t("ui-order-set",{expected_revision:u.revision,entries:f});if(m&&m.conflict){let b={revision:typeof m.revision=="number"?m.revision:0,order:m.order||{}};r.set(b);let E=n(oo(l,c,b.order),a);s(b,E);let k=await t("ui-order-set",{expected_revision:b.revision,entries:E});k&&k.applied&&r.set({revision:typeof k.revision=="number"?k.revision:0,order:k.order||{}})}else m&&m.applied&&r.set({revision:typeof m.revision=="number"?m.revision:0,order:m.order||{}})}return{applyReorder:o}}function Zn(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function lo(e,t){return!t||typeof e!="string"||e.length===0||Zn(t.visible_labels).includes(e)?!0:Zn(t.hidden_labels).includes(e)?!1:!Zn(t.hidden_prefixes).some(r=>r.length>0&&e.startsWith(r))}function Xn(e,t){return Zn(e).filter(r=>lo(r,t))}function br(e,t){let r=e&&e.chips?e.chips[t]:void 0;return typeof r=="boolean"?r:!0}var ou={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},$i={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},ki={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},au={review:"\u2713",skip:"\u2298"},hr={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function iu(e,t,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function xi(e){let t=e&&e.fill||"none";return t==="none"?hr.none:e&&e.stale===!0?hr.stale:t==="dim"?hr.dim:e&&e.glyph==="review"?hr.review:e&&e.glyph==="skip"?hr.skip:hr.done}function lu(e){if(!e||e.fill==="none"||!e.approval_state)return xi(e);let t=[];return e.glyph==="review"?t.push(hr.review):e.glyph==="skip"&&t.push(hr.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function cu(e,t,r){let n=ou[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,a=au[t&&t.glyph||""]||"",l="bar";s==="dim"?l+=` b-${n} dim`:s==="full"&&(l+=` b-${n} full`),o&&(l+=" stale"),r&&(l+=" cur");let c=s==="none"?"lbl":`lbl l-${n} on`,u=r?`color: var(--stage-${n}-on)`:"";return i`
    <div class="seg">
      <div class=${l} style=${u}>${a}</div>
      <div class=${c}>
        ${$i[e]||e}
      </div>
    </div>
  `}function Qn(e,t){if(!e||!e.stages)return"";let r=ki[e.route]||ki.spec_backed,n=e.stages,s=iu(r,n,String(t||"open")),o=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${r.map(a=>`${$i[a]||a} ${a==="plan"?lu(n[a]||{}):xi(n[a]||{})}`).join(" \xB7 ")}`;return i`
    <div class="stp" role="img" aria-label=${o}>
      ${r.map(a=>cu(a,n[a]||{},a===s))}
    </div>
  `}function du(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Si=2;function uu(e){if(!e)return[];let t=[];if(e.external){let n=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(i`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(e.blockers)?e.blockers:[];if(r.length>0){let n=r.slice(0,Si).join(", "),s=r.length-Si,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;t.push(i`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function co(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function Jn(e,t){if(!e)return null;let r=co(e.kind),n=e.reason,s=e.kind==="delegated"?n===null:typeof n=="string"&&n.trim().length>0&&!/[\r\n]/.test(n);if(!r||!s)return null;let o=co(t?.kind),a=o!==null&&t?.kind!==e.kind,l=`\uACC4\uD68D \xB7 ${r}${a?` \u2192 ${o}`:""}`,c=`planned_execution ${e.kind}${typeof n=="string"?`:${n}`:""}`,u=t?` \xB7 exec_receipt ${t.kind}:${t.actor}@${t.sha}`:"";return{kind:e.kind,label:l,title:`${c}${u}`}}function Ai(e,t){let r=Jn(e,t);return r?i`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${r.kind}
        title=${r.title}
        >${r.label}</span
      >`:null}function pu(e){if(!e)return null;let t=co(e.kind);return t?i`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${e.kind}:${e.actor}@${e.sha}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function fu(e,t){let r=t.policy||null,n=e.workflow&&e.workflow.chips||{},s=[];if(n.route&&br(r,"route")){let l=n.route_source==="derived";s.push(i`<span
        class="ctl-chip ctl-chip--route${l?" is-derived":""}"
        title=${l?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${l?"unset":n.route}</span
      >`)}if(n.fast_track&&br(r,"fast_track")&&s.push(i`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&br(r,"pr")){let l=n.pr.number;s.push(i`<span class="ctl-chip ctl-chip--pr"
        >${`PR${l!=null?` #${l}`:""}`}</span
      >`)}let o=Ai(n.planned_execution,n.exec_receipt);if(o&&s.push(o),n.exec_receipt){let l=n.exec_receipt;s.push(i`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${l.kind}:${l.actor}@${l.sha}`}
        >${`exec ${l.kind==="delegated"?l.actor:`main:${l.actor}`} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}if(n.impl_entry){let l=n.impl_entry;s.push(i`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${l.actor}@${l.sha}`}
        >${`impl ${l.actor} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}for(let l of Xn(e.labels,r))s.push(i`<span class="ctl-chip ctl-chip--label">${l}</span>`);return e.from_id&&br(r,"from")&&s.push(i`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${l=>{l.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(l,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),br(r,"blocked")&&s.push(...uu(e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&br(r,"blocked")&&s.push(i`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":i`<div class="board-card__chips">${s}</div>`}function _u(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function mu(e){let t=Ot(e.created_at),r=Ot(e.updated_at);return!t&&!r?"":i`<span class="board-card__times">
    ${t?i`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${mt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&r?i`<span class="board-card__time-sep">·</span>`:""}
    ${r?i`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${mt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function gu(e,t){let r=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=t.isExpanded?t.isExpanded(e.id):!0,o=n>0?r.children.slice().sort(pi):r.children;return i`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?i`<button
              type="button"
              class="board-card__roll-toggle"
              aria-expanded=${s?"true":"false"}
              @click=${a=>t.onRollupToggle&&t.onRollupToggle(a,e.id)}
            >
              children ${r.count}/${n} ${s?"\u25B4":"\u25BE"}
            </button>`:i`<span class="board-card__roll-none">children 없음</span>`}
        ${mu(e)}
      </div>
      ${n>0&&r.current?i`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${r.current.title||r.current.id}</span
            >
          </div>`:""}
      ${s&&n>0?i`<div class="board-card__roll-list">
            ${o.map((a,l)=>i`<button
                  type="button"
                  class="board-card__roll-child"
                  @click=${c=>t.onChildClick&&t.onChildClick(c,a.id)}
                >
                  <span class=${_u(a.status)}>●</span>
                  <span class="board-card__roll-child-ord">${l+1}</span>
                  <span class="board-card__roll-child-title"
                    >${a.title||a.id}</span
                  >
                  ${Jn(a.workflow?.chips?.planned_execution,a.workflow?.chips?.exec_receipt)?i`<span class="board-card__roll-child-chips">
                        ${Ai(a.workflow?.chips?.planned_execution,a.workflow?.chips?.exec_receipt)}
                        ${pu(a.workflow?.chips?.exec_receipt)}
                      </span>`:""}
                </button>`)}
          </div>`:""}
    </div>
  `}function es(e,t){let r=du(e.priority);return i`
    <article
      class="board-card"
      data-issue-id=${e.id}
      role="listitem"
      tabindex="-1"
      draggable="true"
      @click=${n=>t.onCardClick(n,e.id)}
      @dragstart=${n=>t.onDragStart(n,e.id)}
      @dragend=${t.onDragEnd}
    >
      <div class="board-card__head">
        <button
          type="button"
          class="board-card__id"
          title="ID 복사"
          aria-label=${`\uC774\uC288 ID ${e.id} \uBCF5\uC0AC`}
          @click=${n=>t.onCopyId(n,e.id)}
        >
          ${e.id}
        </button>
        ${r?i`<span class="board-card__pri">${r}</span>`:""}
      </div>
      <div class="board-card__title">${e.title||"(\uC81C\uBAA9 \uC5C6\uC74C)"}</div>
      ${fu(e,t)}
      ${e.workflow&&br(t.policy||null,"stepper")?Qn(e.workflow,e.status):""}
      ${gu(e,t)}
    </article>
  `}function Hr(e,t){let r=Array.isArray(e.items)?e.items.length:0,n=e.is_closed===!0;return i`
    <section class=${n?"board-column board-column--closed":"board-column"} id=${e.id}>
      <header
        class="board-column__header"
        id=${e.id+"-header"}
        role="heading"
        aria-level="2"
      >
        <div class="board-column__title">
          <span class="board-column__title-text">${e.title}</span>
          <span class="board-column__count" aria-label=${`${r}\uAC74`}
            >${r}</span
          >
        </div>
        ${n?i`<select
              class="board-column__closed-range"
              aria-label="Closed period"
              @change=${t.onClosedRangeChange}
            >
              ${tr.map(o=>i`<option
                    value=${o.value}
                    ?selected=${o.value===e.closed_range}
                  >
                    ${o.label}
                  </option>`)}
            </select>`:""}
      </header>
      <div
        class="board-column__body"
        role="list"
        aria-labelledby=${e.id+"-header"}
      >
        ${e.items.map(o=>es(o,t))}
      </div>
    </section>
  `}function Ei(e,t,r){return i`
    <dialog
      id="deferred-popup"
      class="deferred-popup"
      role="dialog"
      aria-modal="true"
      aria-labelledby="deferred-popup-title"
      @click=${r.onOverlayClick}
      @cancel=${r.onClose}
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
            @click=${r.onClose}
          >
            ×
          </button>
        </header>
        <div
          class="deferred-popup__body"
          role="list"
          aria-labelledby="deferred-popup-title"
        >
          ${e.items.length===0?i`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(n=>es(n,t))}
        </div>
      </div>
    </dialog>
  `}var bu=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],hu=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],yu=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function vu(e,t,r){let n=e.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return i`
    <div class="board-filter__labels">
      <button
        type="button"
        class=${n>0?"board-filter__label-btn is-on":"board-filter__label-btn"}
        aria-haspopup="true"
        aria-expanded=${r.label_menu_open?"true":"false"}
        @click=${t.onLabelMenuToggle}
      >
        ${s} ▾
      </button>
      ${r.label_menu_open?i`<div class="board-filter__label-menu" role="group">
            ${r.label_options.length===0?i`<div class="board-filter__label-empty">라벨 없음</div>`:r.label_options.map(o=>i`<label class="board-filter__label-row">
                      <input
                        type="checkbox"
                        .checked=${e.labels.includes(o)}
                        @change=${()=>t.onLabelToggle(o)}
                      />
                      <span>${o}</span>
                    </label>`)}
            ${n>0?i`<button
                  type="button"
                  class="board-filter__label-clear"
                  @click=${t.onLabelClear}
                >
                  선택 해제
                </button>`:""}
          </div>`:""}
    </div>
  `}function Ti(e,t,r){return i`
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
        ${bu.map(n=>i`<option
              value=${n.value}
              ?selected=${e.priority===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      <select
        class="board-filter__select"
        aria-label="타입 필터"
        @change=${t.onTypeChange}
      >
        ${hu.map(n=>i`<option
              value=${n.value}
              ?selected=${e.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${vu(e,t,r)}
      <span class="board-filter__spacer"></span>
      <button
        type="button"
        class=${r.deferred_popup_open?"board-filter__deferred is-on":"board-filter__deferred"}
        aria-haspopup="dialog"
        aria-expanded=${r.deferred_popup_open?"true":"false"}
        @click=${t.onDeferredToggle}
      >
        Deferred ${r.deferred_count}
      </button>
      <select
        class="board-filter__select board-filter__sort"
        aria-label="정렬 규칙"
        @change=${t.onSortChange}
      >
        ${yu.map(n=>i`<option
              value=${n.value}
              ?selected=${r.sort_mode===n.value}
            >
              ${n.label}
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
  `}var wu=200,ku={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},$u=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Ci="beads-ui.board.sort",Ri=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function xu(){try{let e=window.localStorage.getItem(Ci);if(e&&Ri.has(e))return e}catch{}return"created_desc"}function Ii(e,t){let r=at("views:board"),n=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,l=t.displayPolicyStore,c=t.workerQueueStore,u=t.onClosedRangeChange,f=t.onNewIssue,m=t.closedRange||Lt,b=s?Vn(s,a):null,E=Kn({transport:o,uiOrderStore:a}),k=[],N=[],D=[],A=[],j=[],ee=[],x=!1,w=0,S=xu(),H=new Map,Y=new Map,ge=new Map,le=new Set,ne={search:"",priority:"",type:"",labels:[]},de=!1,De=null;function Ue(W){return String(W.status||"open")==="open"}function Ge(W){let J=String(W.status||"open");return J==="open"||J==="blocked"}function ze(W){let J=ne.search.trim().toLowerCase(),be=ne.priority,he=ne.type,se=ne.labels;return W.filter(Pe=>{if(J){let tt=String(Pe.id||"").toLowerCase(),Ye=String(Pe.title||"").toLowerCase();if(!tt.includes(J)&&!Ye.includes(J))return!1}if(be!==""&&String(Pe.priority)!==be||he!==""&&String(Pe.issue_type||"")!==he)return!1;if(se.length>0){let tt=Array.isArray(Pe.labels)?Pe.labels:[];if(!se.some(Ye=>tt.includes(Ye)))return!1}return!0})}function Ze(){let W=new Set;for(let J of[k,N,D,A,j,ee])for(let be of J){let he=Array.isArray(be.labels)?be.labels:[];for(let se of he)typeof se=="string"&&se.length>0&&W.add(se)}return Array.from(W).sort()}function Fe(){return ne.search.trim()!==""||ne.priority!==""||ne.type!==""||ne.labels.length>0}function we(){try{if(b){let W=b.selectBoardColumn("tab:board:in-progress","in_progress",S),J=b.selectBoardColumn("tab:board:blocked","blocked",S).filter(Ge),be=new Set(W.map(Ae=>Ae.id)),he=b.selectBoardColumn("tab:board:ready","ready",S).filter(Ae=>Ue(Ae)&&!be.has(Ae.id)),se=b.selectBoardColumn("tab:board:resolved","resolved",S),Pe=b.selectBoardColumn("tab:board:deferred","deferred",S),tt=b.selectBoardColumn("tab:board:closed","closed").slice(0,wu),Ye=[...J,...he,...W,...se,...tt];ve(Ye);let Oe=new Set;for(let Ae of Ye)Ae&&Ae.id&&!uo(Ae)&&Oe.add(Ae.id);let Xe=!Fe();k=Xe?on(J,Oe):J,N=Xe?on(he,Oe):he,D=Xe?on(W,Oe):W,A=Xe?on(se,Oe):se,j=Pe,w=Pe.length,ee=Xe?on(tt,Oe):tt,H=new Map;for(let Ae of k)H.set(Ae.id,"open");for(let Ae of N)H.set(Ae.id,"open");for(let Ae of D)H.set(Ae.id,"in_progress");for(let Ae of A)H.set(Ae.id,"resolved");for(let Ae of j)H.set(Ae.id,"deferred");for(let Ae of ee)H.set(Ae.id,"closed");Y=new Map;for(let Ae of k)Y.set(Ae.id,"blocked-col");for(let Ae of N)Y.set(Ae.id,"ready-col");for(let Ae of D)Y.set(Ae.id,"in-progress-col");for(let Ae of A)Y.set(Ae.id,"resolved-col");for(let Ae of ee)Y.set(Ae.id,"closed-col")}Ce()}catch{k=[],N=[],D=[],A=[],j=[],ee=[],ge=new Map,Ce()}}function ve(W){let J=new Map;for(let he of W)he&&he.id&&!J.has(he.id)&&J.set(he.id,he);let be=new Map;for(let he of J.values()){let se=uo(he);if(!se)continue;let Pe=be.get(se);Pe||(Pe=[],be.set(se,Pe)),Pe.push({id:he.id,title:he.title,status:he.status,metadata:he.metadata,workflow:he.workflow,created_at:he.created_at,updated_at:he.updated_at})}ge=be}function xe(W){let J=ge.get(W)||[],be=0;for(let se of J)(se.status==="resolved"||se.status==="closed")&&(be+=1);let he=Yn(J);return{total:J.length,count:be,current:he,children:J}}function Re(W){return!le.has(W)}function me(W,J){W.preventDefault(),W.stopPropagation(),le.has(J)?le.delete(J):le.add(J),Ce()}function X(W,J){W.preventDefault(),W.stopPropagation(),n(J)}function G(W,J){W.preventDefault(),W.stopPropagation(),n(J)}function ke(W,J){De||n(J)}function fe(W,J){W.preventDefault(),W.stopPropagation(),Su(J).then(be=>{be&&ie("\uBCF5\uC0AC\uB428","success",1200)})}function oe(W,J){De=J,W.dataTransfer&&(W.dataTransfer.setData("text/plain",J),W.dataTransfer.effectAllowed="move"),W.target.classList.add("board-card--dragging")}function U(W){W.target.classList.remove("board-card--dragging"),yt(),setTimeout(()=>{De=null},0)}function B(W){let J=String(W.target.value||"");!J||J===m||(m=J,u&&u(J),Ce())}function C(){return l?l.get():null}function z(W){let J=c?c.get():null,be=J?J.cleanup_failed:null;if(!be||typeof be!="object"||Array.isArray(be))return null;let he=be[W];return!he||typeof he!="object"||Array.isArray(he)?null:he}let R={onCardClick:ke,onCopyId:fe,onDragStart:oe,onDragEnd:U,onClosedRangeChange:B,rollupFor:xe,isExpanded:Re,onRollupToggle:me,onChildClick:X,onFromChipClick:G,cleanupFailureFor:z,get policy(){return C()}};function K(W,J){De||($(),n(J))}function Z(W,J){W.preventDefault(),W.stopPropagation(),$(),n(J)}let ce={...R,onCardClick:K,onChildClick:Z,onFromChipClick:Z,get policy(){return C()}};function _e(W){let J=W.target,be=e.querySelector(".board-filter__labels");J&&be&&be.contains(J)||F()}function $e(W){W.key==="Escape"&&F()}function T(){de||(de=!0,document.addEventListener("mousedown",_e),document.addEventListener("keydown",$e),Ce())}function F(){de&&(de=!1,document.removeEventListener("mousedown",_e),document.removeEventListener("keydown",$e),Ce())}function te(W){W.key==="Escape"&&$()}function Q(){x||(x=!0,document.addEventListener("keydown",te),Ce())}function $(){x&&(x=!1,document.removeEventListener("keydown",te),Ce())}let M={onClose:$,onOverlayClick(W){W.target===W.currentTarget&&$()}},V={onSearchInput(W){ne.search=String(W.target.value||""),we()},onPriorityChange(W){ne.priority=String(W.target.value||""),we()},onTypeChange(W){ne.type=String(W.target.value||""),we()},onSortChange(W){let J=String(W.target.value||"");if(!(!Ri.has(J)||J===S)){S=J;try{window.localStorage.setItem(Ci,J)}catch{}we()}},onDeferredToggle(){x?$():Q()},onLabelMenuToggle(){de?F():T()},onLabelToggle(W){let J=ne.labels.indexOf(W);J===-1?ne.labels.push(W):ne.labels.splice(J,1),we()},onLabelClear(){ne.labels.length!==0&&(ne.labels=[],we())},onNewIssue(){f&&f()}};function Ie(){return i`
      <div class="board-view">
        ${Ti(ne,V,{sort_mode:S,deferred_popup_open:x,deferred_count:w,label_options:Ze(),label_menu_open:de})}
        <div class="board-root">
          ${Hr({title:"Blocked",id:"blocked-col",items:ze(k)},R)}
          ${Hr({title:"Ready",id:"ready-col",items:ze(N)},R)}
          ${Hr({title:"In progress",id:"in-progress-col",items:ze(D)},R)}
          ${Hr({title:"Resolved",id:"resolved-col",items:ze(A)},R)}
          ${Hr({title:"Closed",id:"closed-col",items:ze(ee),is_closed:!0,closed_range:m},R)}
        </div>
        ${x?Ei({items:ze(j),count:w},ce,M):""}
      </div>
    `}function Ce(){je(Ie(),e),Me()}function Me(){try{let W=e.querySelector("#deferred-popup");W&&!W.open&&(typeof W.showModal=="function"?W.showModal():W.setAttribute("open",""));let J=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let be of J)Array.from(be.querySelectorAll(".board-card")).forEach((se,Pe)=>{se.tabIndex=Pe===0?0:-1})}catch{}}async function Te(W,J){if(!o){ie("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:W,status:J}),ie("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(be){r("update-status failed: %o",be),ie("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function et(W){switch(W){case"blocked-col":return k;case"ready-col":return N;case"in-progress-col":return D;case"resolved-col":return A;default:return[]}}function ht(W,J,be){if(!o||!a)return;let he=et(W),se=he.find(Xe=>Xe.id===J);if(!se)return;let Pe=he.filter(Xe=>Xe.id!==J),tt=be.closest?be.closest(".board-card"):null,Ye=Pe.length;if(tt){let Xe=tt.getAttribute("data-issue-id");if(Xe===J)return;let Ae=Pe.findIndex(_t=>_t.id===Xe);Ae>=0&&(Ye=Ae)}let Oe=Pe.slice();Oe.splice(Ye,0,se),E.applyReorder(J,Oe,Ye)}function yt(){for(let W of Array.from(e.querySelectorAll(".board-column--drag-over")))W.classList.remove("board-column--drag-over")}let ot=null;e.addEventListener("dragover",W=>{W.preventDefault(),W.dataTransfer&&(W.dataTransfer.dropEffect="move");let be=W.target.closest(".board-column");be&&be!==ot&&(ot&&ot.classList.remove("board-column--drag-over"),be.classList.add("board-column--drag-over"),ot=be)}),e.addEventListener("dragleave",W=>{let J=W.relatedTarget;(!J||!e.contains(J))&&ot&&(ot.classList.remove("board-column--drag-over"),ot=null)}),e.addEventListener("drop",W=>{W.preventDefault(),ot&&(ot.classList.remove("board-column--drag-over"),ot=null);let J=W.target,be=J.closest(".board-column");if(!be)return;let he=W.dataTransfer?.getData("text/plain")||"";if(!he)return;let se=be.id,Pe=Y.get(he);if(Pe&&Pe===se){if($u.has(se)){if(S!=="manual"){ie("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}ht(se,he,J)}return}let tt=ku[se];if(!tt){ie("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}H.get(he)!==tt&&Te(he,tt)}),e.addEventListener("keydown",W=>{let J=W.target;if(!(J instanceof HTMLElement))return;let be=String(J.tagName||"").toLowerCase();if(be==="input"||be==="textarea"||be==="select"||be==="button"||be==="a"||J.isContentEditable===!0)return;let he=J.closest(".board-card");if(!he)return;let se=String(W.key||"");if(se==="Enter"||se===" "){W.preventDefault();let Oe=he.getAttribute("data-issue-id");Oe&&n(Oe);return}if(se!=="ArrowUp"&&se!=="ArrowDown"&&se!=="ArrowLeft"&&se!=="ArrowRight")return;W.preventDefault();let Pe=he.closest(".board-column");if(!Pe)return;let tt=Array.from(Pe.querySelectorAll(".board-card")),Ye=tt.indexOf(he);if(se==="ArrowDown"&&Ye<tt.length-1){$t(he,tt[Ye+1]);return}if(se==="ArrowUp"&&Ye>0){$t(he,tt[Ye-1]);return}if(se==="ArrowLeft"||se==="ArrowRight"){let Oe=Array.from(e.querySelectorAll(".board-column")),Xe=Oe.indexOf(Pe),Ae=se==="ArrowRight"?1:-1,_t=Xe+Ae;for(;_t>=0&&_t<Oe.length;){let Tt=Oe[_t].querySelector(".board-card");if(Tt){$t(he,Tt);return}_t+=Ae}}});function $t(W,J){try{W.tabIndex=-1,J.tabIndex=0,J.focus()}catch{}}let it=null;b&&b.subscribe&&(it=b.subscribe(()=>{try{we()}catch{}}));let st=null;l&&l.subscribe&&(st=l.subscribe(()=>{try{we()}catch{}}));let pt=null;return c&&c.subscribe&&(pt=c.subscribe(()=>{Ce()})),{async load(){r("load"),we()},clear(){F(),$(),it&&(it(),it=null),st&&(st(),st=null),pt&&(pt(),pt=null),e.replaceChildren(),k=[],N=[],D=[],A=[],j=[],ee=[],H=new Map,Y=new Map}}}function uo(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function on(e,t){return e.filter(r=>{let n=uo(r);return!(n&&t.has(n))})}async function Su(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let r=!1;try{r=document.execCommand("copy")}finally{t.remove()}return r}catch{return!1}}async function ir(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}function rr(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function yr(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function Au(e,t=document){let r=t.createElement("dialog");r.className="continuation-dialog";let n=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),l=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",l.textContent=`${rr(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${rr(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,n.type="button",n.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",n.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",r.append(a,l,n,s,o),t.body.append(r),new Promise(c=>{let u=f=>{typeof r.close=="function"&&r.close(),r.remove(),c(f)};n.addEventListener("click",()=>u("prior_session")),s.addEventListener("click",()=>u("fresh_current")),o.addEventListener("click",()=>u(null)),r.addEventListener("cancel",f=>{f.preventDefault(),u(null)}),typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")})}async function lr(e,t,r={}){let n=e;for(r.onResult?.(n);n?.continuation_mismatch;){let s=n.continuation_mismatch,o=await Au(s);if(o===null)return n;n=await t(o,s.decision_token),r.onResult?.(n),n?.conflict&&r.refresh&&(n=await r.refresh(n),r.onResult?.(n))}return n}var Mi="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function gt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var cr=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],an=[...cr,"reasoning_output_tokens"],Eu=["implementation","review-consult"];function po(e){let t=0;for(let r of cr)t+=gt(e?.[r]);return t}function Tu(e){return!e||typeof e!="object"?!1:cr.some(t=>Number.isFinite(e[t]))}function Li(e){return!e||typeof e!="object"?!1:an.some(t=>Number.isFinite(e[t]))}function Cu(e){let t={};for(let r of an)e&&Number.isFinite(e[r])&&(t[r]=e[r]);return t}function Oi(e){let t={};for(let r of an)Number.isFinite(e[r])&&(t[r]=e[r]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function Pi(e,t){return e==="codex"?gt(t.input_tokens)+gt(t.output_tokens):po(t)}function Ru(e){return e==="claude"?"Claude":"Codex"}function Iu(e){return`\u03C4 ${Ni(e)}`}function Lu(e,t){let r=t.breakdown||{},n=[`\uC785\uB825 ${gt(r.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${gt(r.output_tokens).toLocaleString("en-US")}`];e==="claude"?n.push(`\uCE90\uC2DC\uC77D\uAE30 ${gt(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${gt(r.cache_creation_input_tokens).toLocaleString("en-US")}`):(n.push(`\uCE90\uC2DC\uC77D\uAE30 ${gt(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${gt(r.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(r.reasoning_output_tokens)&&n.push(`\uCD94\uB860\uCD9C\uB825 ${gt(r.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,n.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(Mi),o.join(`
`)}function bt(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let r of["claude","codex"]){let n=e.providers[r];n&&t.push({provider:r,label:`${Ru(r)} ${Iu(n.subtotal)}${typeof n.total_cost_usd=="number"&&Number.isFinite(n.total_cost_usd)?` \xB7 $${n.total_cost_usd.toFixed(2)}`:""}`,tooltip:Lu(r,n)})}return t}function rs(e){let t={},r={claude:!0,codex:!1},n={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let l=t[o];l||(l={subtotal:0,breakdown:{}},t[o]=l),l.subtotal+=a.subtotal;for(let c of an)Number.isFinite(a.breakdown[c])&&(l.breakdown[c]=gt(l.breakdown[c])+gt(a.breakdown[c]));a.replayed&&(l.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?n.claude+=a.total_cost_usd:r.claude=!1)}return t.claude&&r.claude&&(t.claude.total_cost_usd=n.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function fo(e){return!e||typeof e!="object"?null:Ft({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function Ou(e){return e==="codex"?"codex":"claude"}function vr(){return{subtotal:0,breakdown:Cu(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function ts(e,t,r){e.subtotal+=t.subtotal;for(let n of an)Number.isFinite(t.usage[n])&&(e.breakdown[n]=gt(e.breakdown[n])+gt(t.usage[n]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),r&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function Di(e,t){let r={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(r.legs=e.legs),e.replayed&&(r.replayed=!0),r}function Ni(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Gr(e){return Tu(e)?`\u03C4 ${Ni(po(e))}`:null}function Ht(e){let t=Gr(e);if(!t)return null;let r=e?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${t} \xB7 $${r.toFixed(2)}`:t}function Vr(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${gt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${gt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${gt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${gt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${po(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&r.push(Mi),r.join(`
`)}function Ft(e,t){let r={claude:vr(),codex:vr()},n={orchestrator:{claude:vr(),codex:vr()},implementation:{claude:vr(),codex:vr()},"review-consult":{claude:vr(),codex:vr()}},s=new Set;for(let l of Object.values(e||{})){if(!l||l.bead_id!==t)continue;let c=l.usage;if(Li(c)){let f=Ou(l.runner),m=Oi(c),b={provider:f,role:"orchestrator",attempt_id:String(l.attempt_id||""),usage:m,subtotal:Pi(f,m)};m.replayed===!0&&(b.replayed=!0),typeof l.model=="string"&&(b.model=l.model),typeof l.session_id=="string"&&(b.session_id=l.session_id),ts(r[f],b,!0),ts(n.orchestrator[f],b,!0)}let u=Array.isArray(l.usage_legs)?l.usage_legs:[];for(let f of u){if(!f||f.provider!=="codex"||!Eu.includes(f.role)||!Li(f.usage))continue;let m=typeof f.receipt_id=="string"&&f.receipt_id.length>0?f.receipt_id:null;if(!m||s.has(m))continue;s.add(m);let b=Oi(f.usage),E={provider:"codex",role:f.role,attempt_id:String(l.attempt_id||""),usage:b,subtotal:Pi("codex",b)};E.receipt_id=m,typeof f.model=="string"&&(E.model=f.model),typeof f.session_id=="string"?E.session_id=f.session_id:typeof f.thread_id=="string"&&(E.session_id=f.thread_id),typeof f.turn_id=="string"&&(E.turn_id=f.turn_id),typeof f.completed_at=="string"&&(E.completed_at=f.completed_at),b.replayed===!0&&(E.replayed=!0),ts(r.codex,E,!1),ts(n[E.role].codex,E,!1)}}let o={};for(let l of["claude","codex"]){let c=r[l];if(c.legs.length===0)continue;let u=Di(c,!1);l==="claude"&&c.outer_count>0&&c.outer_cost_count===c.outer_count&&(u.total_cost_usd=c.outer_cost),o[l]=u}if(Object.keys(o).length===0)return null;let a={};for(let l of["orchestrator","implementation","review-consult"]){let c={};for(let u of["claude","codex"]){let f=n[l][u];f.legs.length>0&&(c[u]={...Di(f,!0),legs:f.legs})}Object.keys(c).length>0&&(a[l]=c)}return{providers:o,roles:a}}var{entries:Gi,setPrototypeOf:Fi,isFrozen:Pu,getPrototypeOf:Du,getOwnPropertyDescriptor:Mu}=Object,{freeze:St,seal:qt,create:vo}=Object,{apply:wo,construct:ko}=typeof Reflect<"u"&&Reflect;St||(St=function(t){return t});qt||(qt=function(t){return t});wo||(wo=function(t,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return t.apply(r,s)});ko||(ko=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new t(...n)});var ns=At(Array.prototype.forEach),Nu=At(Array.prototype.lastIndexOf),qi=At(Array.prototype.pop),ln=At(Array.prototype.push),Fu=At(Array.prototype.splice),os=At(String.prototype.toLowerCase),_o=At(String.prototype.toString),mo=At(String.prototype.match),cn=At(String.prototype.replace),qu=At(String.prototype.indexOf),Bu=At(String.prototype.trim),Gt=At(Object.prototype.hasOwnProperty),xt=At(RegExp.prototype.test),dn=ju(TypeError);function At(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return wo(e,t,n)}}function ju(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return ko(e,r)}}function We(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:os;Fi&&Fi(e,null);let n=t.length;for(;n--;){let s=t[n];if(typeof s=="string"){let o=r(s);o!==s&&(Pu(t)||(t[n]=o),s=o)}e[s]=!0}return e}function Uu(e){for(let t=0;t<e.length;t++)Gt(e,t)||(e[t]=null);return e}function dr(e){let t=vo(null);for(let[r,n]of Gi(e))Gt(e,r)&&(Array.isArray(n)?t[r]=Uu(n):n&&typeof n=="object"&&n.constructor===Object?t[r]=dr(n):t[r]=n);return t}function un(e,t){for(;e!==null;){let n=Mu(e,t);if(n){if(n.get)return At(n.get);if(typeof n.value=="function")return At(n.value)}e=Du(e)}function r(){return null}return r}var Bi=St(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),go=St(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),bo=St(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Wu=St(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),ho=St(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),zu=St(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),ji=St(["#text"]),Ui=St(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),yo=St(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Wi=St(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),ss=St(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Hu=qt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Gu=qt(/<%[\w\W]*|[\w\W]*%>/gm),Vu=qt(/\$\{[\w\W]*/gm),Yu=qt(/^data-[\-\w.\u00B7-\uFFFF]+$/),Ku=qt(/^aria-[\-\w]+$/),Vi=qt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Zu=qt(/^(?:\w+script|data):/i),Xu=qt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Yi=qt(/^html$/i),Qu=qt(/^[a-z][.\w]*(-[.\w]+)+$/i),zi=Object.freeze({__proto__:null,ARIA_ATTR:Ku,ATTR_WHITESPACE:Xu,CUSTOM_ELEMENT:Qu,DATA_ATTR:Yu,DOCTYPE_NAME:Yi,ERB_EXPR:Gu,IS_ALLOWED_URI:Vi,IS_SCRIPT_OR_DATA:Zu,MUSTACHE_EXPR:Hu,TMPLIT_EXPR:Vu}),pn={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Ju=function(){return typeof window>"u"?null:window},ep=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Hi=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Ki(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Ju(),t=q=>Ki(q);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==pn.document||!e.Element)return t.isSupported=!1,t;let{document:r}=e,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:l,Element:c,NodeFilter:u,NamedNodeMap:f=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:m,DOMParser:b,trustedTypes:E}=e,k=c.prototype,N=un(k,"cloneNode"),D=un(k,"remove"),A=un(k,"nextSibling"),j=un(k,"childNodes"),ee=un(k,"parentNode");if(typeof a=="function"){let q=r.createElement("template");q.content&&q.content.ownerDocument&&(r=q.content.ownerDocument)}let x,w="",{implementation:S,createNodeIterator:H,createDocumentFragment:Y,getElementsByTagName:ge}=r,{importNode:le}=n,ne=Hi();t.isSupported=typeof Gi=="function"&&typeof ee=="function"&&S&&S.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:de,ERB_EXPR:De,TMPLIT_EXPR:Ue,DATA_ATTR:Ge,ARIA_ATTR:ze,IS_SCRIPT_OR_DATA:Ze,ATTR_WHITESPACE:Fe,CUSTOM_ELEMENT:we}=zi,{IS_ALLOWED_URI:ve}=zi,xe=null,Re=We({},[...Bi,...go,...bo,...ho,...ji]),me=null,X=We({},[...Ui,...yo,...Wi,...ss]),G=Object.seal(vo(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),ke=null,fe=null,oe=Object.seal(vo(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),U=!0,B=!0,C=!1,z=!0,R=!1,K=!0,Z=!1,ce=!1,_e=!1,$e=!1,T=!1,F=!1,te=!0,Q=!1,$="user-content-",M=!0,V=!1,Ie={},Ce=null,Me=We({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Te=null,et=We({},["audio","video","img","source","image","track"]),ht=null,yt=We({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),ot="http://www.w3.org/1998/Math/MathML",$t="http://www.w3.org/2000/svg",it="http://www.w3.org/1999/xhtml",st=it,pt=!1,W=null,J=We({},[ot,$t,it],_o),be=We({},["mi","mo","mn","ms","mtext"]),he=We({},["annotation-xml"]),se=We({},["title","style","font","a","script"]),Pe=null,tt=["application/xhtml+xml","text/html"],Ye="text/html",Oe=null,Xe=null,Ae=r.createElement("form"),_t=function(y){return y instanceof RegExp||y instanceof Function},Tt=function(){let y=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Xe&&Xe===y)){if((!y||typeof y!="object")&&(y={}),y=dr(y),Pe=tt.indexOf(y.PARSER_MEDIA_TYPE)===-1?Ye:y.PARSER_MEDIA_TYPE,Oe=Pe==="application/xhtml+xml"?_o:os,xe=Gt(y,"ALLOWED_TAGS")?We({},y.ALLOWED_TAGS,Oe):Re,me=Gt(y,"ALLOWED_ATTR")?We({},y.ALLOWED_ATTR,Oe):X,W=Gt(y,"ALLOWED_NAMESPACES")?We({},y.ALLOWED_NAMESPACES,_o):J,ht=Gt(y,"ADD_URI_SAFE_ATTR")?We(dr(yt),y.ADD_URI_SAFE_ATTR,Oe):yt,Te=Gt(y,"ADD_DATA_URI_TAGS")?We(dr(et),y.ADD_DATA_URI_TAGS,Oe):et,Ce=Gt(y,"FORBID_CONTENTS")?We({},y.FORBID_CONTENTS,Oe):Me,ke=Gt(y,"FORBID_TAGS")?We({},y.FORBID_TAGS,Oe):dr({}),fe=Gt(y,"FORBID_ATTR")?We({},y.FORBID_ATTR,Oe):dr({}),Ie=Gt(y,"USE_PROFILES")?y.USE_PROFILES:!1,U=y.ALLOW_ARIA_ATTR!==!1,B=y.ALLOW_DATA_ATTR!==!1,C=y.ALLOW_UNKNOWN_PROTOCOLS||!1,z=y.ALLOW_SELF_CLOSE_IN_ATTR!==!1,R=y.SAFE_FOR_TEMPLATES||!1,K=y.SAFE_FOR_XML!==!1,Z=y.WHOLE_DOCUMENT||!1,$e=y.RETURN_DOM||!1,T=y.RETURN_DOM_FRAGMENT||!1,F=y.RETURN_TRUSTED_TYPE||!1,_e=y.FORCE_BODY||!1,te=y.SANITIZE_DOM!==!1,Q=y.SANITIZE_NAMED_PROPS||!1,M=y.KEEP_CONTENT!==!1,V=y.IN_PLACE||!1,ve=y.ALLOWED_URI_REGEXP||Vi,st=y.NAMESPACE||it,be=y.MATHML_TEXT_INTEGRATION_POINTS||be,he=y.HTML_INTEGRATION_POINTS||he,G=y.CUSTOM_ELEMENT_HANDLING||{},y.CUSTOM_ELEMENT_HANDLING&&_t(y.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(G.tagNameCheck=y.CUSTOM_ELEMENT_HANDLING.tagNameCheck),y.CUSTOM_ELEMENT_HANDLING&&_t(y.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(G.attributeNameCheck=y.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),y.CUSTOM_ELEMENT_HANDLING&&typeof y.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(G.allowCustomizedBuiltInElements=y.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),R&&(B=!1),T&&($e=!0),Ie&&(xe=We({},ji),me=[],Ie.html===!0&&(We(xe,Bi),We(me,Ui)),Ie.svg===!0&&(We(xe,go),We(me,yo),We(me,ss)),Ie.svgFilters===!0&&(We(xe,bo),We(me,yo),We(me,ss)),Ie.mathMl===!0&&(We(xe,ho),We(me,Wi),We(me,ss))),y.ADD_TAGS&&(typeof y.ADD_TAGS=="function"?oe.tagCheck=y.ADD_TAGS:(xe===Re&&(xe=dr(xe)),We(xe,y.ADD_TAGS,Oe))),y.ADD_ATTR&&(typeof y.ADD_ATTR=="function"?oe.attributeCheck=y.ADD_ATTR:(me===X&&(me=dr(me)),We(me,y.ADD_ATTR,Oe))),y.ADD_URI_SAFE_ATTR&&We(ht,y.ADD_URI_SAFE_ATTR,Oe),y.FORBID_CONTENTS&&(Ce===Me&&(Ce=dr(Ce)),We(Ce,y.FORBID_CONTENTS,Oe)),M&&(xe["#text"]=!0),Z&&We(xe,["html","head","body"]),xe.table&&(We(xe,["tbody"]),delete ke.tbody),y.TRUSTED_TYPES_POLICY){if(typeof y.TRUSTED_TYPES_POLICY.createHTML!="function")throw dn('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof y.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw dn('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');x=y.TRUSTED_TYPES_POLICY,w=x.createHTML("")}else x===void 0&&(x=ep(E,s)),x!==null&&typeof w=="string"&&(w=x.createHTML(""));St&&St(y),Xe=y}},Pt=We({},[...go,...bo,...Wu]),Dt=We({},[...ho,...zu]),xr=function(y){let I=ee(y);(!I||!I.tagName)&&(I={namespaceURI:st,tagName:"template"});let re=os(y.tagName),Ee=os(I.tagName);return W[y.namespaceURI]?y.namespaceURI===$t?I.namespaceURI===it?re==="svg":I.namespaceURI===ot?re==="svg"&&(Ee==="annotation-xml"||be[Ee]):!!Pt[re]:y.namespaceURI===ot?I.namespaceURI===it?re==="math":I.namespaceURI===$t?re==="math"&&he[Ee]:!!Dt[re]:y.namespaceURI===it?I.namespaceURI===$t&&!he[Ee]||I.namespaceURI===ot&&!be[Ee]?!1:!Dt[re]&&(se[re]||!Pt[re]):!!(Pe==="application/xhtml+xml"&&W[y.namespaceURI]):!1},vt=function(y){ln(t.removed,{element:y});try{ee(y).removeChild(y)}catch{D(y)}},kt=function(y,I){try{ln(t.removed,{attribute:I.getAttributeNode(y),from:I})}catch{ln(t.removed,{attribute:null,from:I})}if(I.removeAttribute(y),y==="is")if($e||T)try{vt(I)}catch{}else try{I.setAttribute(y,"")}catch{}},Qt=function(y){let I=null,re=null;if(_e)y="<remove></remove>"+y;else{let qe=mo(y,/^[\r\n\t ]+/);re=qe&&qe[0]}Pe==="application/xhtml+xml"&&st===it&&(y='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+y+"</body></html>");let Ee=x?x.createHTML(y):y;if(st===it)try{I=new b().parseFromString(Ee,Pe)}catch{}if(!I||!I.documentElement){I=S.createDocument(st,"template",null);try{I.documentElement.innerHTML=pt?w:Ee}catch{}}let Je=I.body||I.documentElement;return y&&re&&Je.insertBefore(r.createTextNode(re),Je.childNodes[0]||null),st===it?ge.call(I,Z?"html":"body")[0]:Z?I.documentElement:Je},or=function(y){return H.call(y.ownerDocument||y,y,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},jt=function(y){return y instanceof m&&(typeof y.nodeName!="string"||typeof y.textContent!="string"||typeof y.removeChild!="function"||!(y.attributes instanceof f)||typeof y.removeAttribute!="function"||typeof y.setAttribute!="function"||typeof y.namespaceURI!="string"||typeof y.insertBefore!="function"||typeof y.hasChildNodes!="function")},Ut=function(y){return typeof l=="function"&&y instanceof l};function wt(q,y,I){ns(q,re=>{re.call(t,y,I,Xe)})}let Jt=function(y){let I=null;if(wt(ne.beforeSanitizeElements,y,null),jt(y))return vt(y),!0;let re=Oe(y.nodeName);if(wt(ne.uponSanitizeElement,y,{tagName:re,allowedTags:xe}),K&&y.hasChildNodes()&&!Ut(y.firstElementChild)&&xt(/<[/\w!]/g,y.innerHTML)&&xt(/<[/\w!]/g,y.textContent)||y.nodeType===pn.progressingInstruction||K&&y.nodeType===pn.comment&&xt(/<[/\w]/g,y.data))return vt(y),!0;if(!(oe.tagCheck instanceof Function&&oe.tagCheck(re))&&(!xe[re]||ke[re])){if(!ke[re]&&v(re)&&(G.tagNameCheck instanceof RegExp&&xt(G.tagNameCheck,re)||G.tagNameCheck instanceof Function&&G.tagNameCheck(re)))return!1;if(M&&!Ce[re]){let Ee=ee(y)||y.parentNode,Je=j(y)||y.childNodes;if(Je&&Ee){let qe=Je.length;for(let Ke=qe-1;Ke>=0;--Ke){let Se=N(Je[Ke],!0);Se.__removalCount=(y.__removalCount||0)+1,Ee.insertBefore(Se,A(y))}}}return vt(y),!0}return y instanceof c&&!xr(y)||(re==="noscript"||re==="noembed"||re==="noframes")&&xt(/<\/no(script|embed|frames)/i,y.innerHTML)?(vt(y),!0):(R&&y.nodeType===pn.text&&(I=y.textContent,ns([de,De,Ue],Ee=>{I=cn(I,Ee," ")}),y.textContent!==I&&(ln(t.removed,{element:y.cloneNode()}),y.textContent=I)),wt(ne.afterSanitizeElements,y,null),!1)},p=function(y,I,re){if(te&&(I==="id"||I==="name")&&(re in r||re in Ae))return!1;if(!(B&&!fe[I]&&xt(Ge,I))){if(!(U&&xt(ze,I))){if(!(oe.attributeCheck instanceof Function&&oe.attributeCheck(I,y))){if(!me[I]||fe[I]){if(!(v(y)&&(G.tagNameCheck instanceof RegExp&&xt(G.tagNameCheck,y)||G.tagNameCheck instanceof Function&&G.tagNameCheck(y))&&(G.attributeNameCheck instanceof RegExp&&xt(G.attributeNameCheck,I)||G.attributeNameCheck instanceof Function&&G.attributeNameCheck(I,y))||I==="is"&&G.allowCustomizedBuiltInElements&&(G.tagNameCheck instanceof RegExp&&xt(G.tagNameCheck,re)||G.tagNameCheck instanceof Function&&G.tagNameCheck(re))))return!1}else if(!ht[I]){if(!xt(ve,cn(re,Fe,""))){if(!((I==="src"||I==="xlink:href"||I==="href")&&y!=="script"&&qu(re,"data:")===0&&Te[y])){if(!(C&&!xt(Ze,cn(re,Fe,"")))){if(re)return!1}}}}}}}return!0},v=function(y){return y!=="annotation-xml"&&mo(y,we)},L=function(y){wt(ne.beforeSanitizeAttributes,y,null);let{attributes:I}=y;if(!I||jt(y))return;let re={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:me,forceKeepAttr:void 0},Ee=I.length;for(;Ee--;){let Je=I[Ee],{name:qe,namespaceURI:Ke,value:Se}=Je,d=Oe(qe),_=Se,h=qe==="value"?_:Bu(_);if(re.attrName=d,re.attrValue=h,re.keepAttr=!0,re.forceKeepAttr=void 0,wt(ne.uponSanitizeAttribute,y,re),h=re.attrValue,Q&&(d==="id"||d==="name")&&(kt(qe,y),h=$+h),K&&xt(/((--!?|])>)|<\/(style|title|textarea)/i,h)){kt(qe,y);continue}if(d==="attributename"&&mo(h,"href")){kt(qe,y);continue}if(re.forceKeepAttr)continue;if(!re.keepAttr){kt(qe,y);continue}if(!z&&xt(/\/>/i,h)){kt(qe,y);continue}R&&ns([de,De,Ue],ue=>{h=cn(h,ue," ")});let P=Oe(y.nodeName);if(!p(P,d,h)){kt(qe,y);continue}if(x&&typeof E=="object"&&typeof E.getAttributeType=="function"&&!Ke)switch(E.getAttributeType(P,d)){case"TrustedHTML":{h=x.createHTML(h);break}case"TrustedScriptURL":{h=x.createScriptURL(h);break}}if(h!==_)try{Ke?y.setAttributeNS(Ke,qe,h):y.setAttribute(qe,h),jt(y)?vt(y):qi(t.removed)}catch{kt(qe,y)}}wt(ne.afterSanitizeAttributes,y,null)},ae=function q(y){let I=null,re=or(y);for(wt(ne.beforeSanitizeShadowDOM,y,null);I=re.nextNode();)wt(ne.uponSanitizeShadowNode,I,null),Jt(I),L(I),I.content instanceof o&&q(I.content);wt(ne.afterSanitizeShadowDOM,y,null)};return t.sanitize=function(q){let y=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},I=null,re=null,Ee=null,Je=null;if(pt=!q,pt&&(q="<!-->"),typeof q!="string"&&!Ut(q))if(typeof q.toString=="function"){if(q=q.toString(),typeof q!="string")throw dn("dirty is not a string, aborting")}else throw dn("toString is not a function");if(!t.isSupported)return q;if(ce||Tt(y),t.removed=[],typeof q=="string"&&(V=!1),V){if(q.nodeName){let Se=Oe(q.nodeName);if(!xe[Se]||ke[Se])throw dn("root node is forbidden and cannot be sanitized in-place")}}else if(q instanceof l)I=Qt("<!---->"),re=I.ownerDocument.importNode(q,!0),re.nodeType===pn.element&&re.nodeName==="BODY"||re.nodeName==="HTML"?I=re:I.appendChild(re);else{if(!$e&&!R&&!Z&&q.indexOf("<")===-1)return x&&F?x.createHTML(q):q;if(I=Qt(q),!I)return $e?null:F?w:""}I&&_e&&vt(I.firstChild);let qe=or(V?q:I);for(;Ee=qe.nextNode();)Jt(Ee),L(Ee),Ee.content instanceof o&&ae(Ee.content);if(V)return q;if($e){if(T)for(Je=Y.call(I.ownerDocument);I.firstChild;)Je.appendChild(I.firstChild);else Je=I;return(me.shadowroot||me.shadowrootmode)&&(Je=le.call(n,Je,!0)),Je}let Ke=Z?I.outerHTML:I.innerHTML;return Z&&xe["!doctype"]&&I.ownerDocument&&I.ownerDocument.doctype&&I.ownerDocument.doctype.name&&xt(Yi,I.ownerDocument.doctype.name)&&(Ke="<!DOCTYPE "+I.ownerDocument.doctype.name+`>
`+Ke),R&&ns([de,De,Ue],Se=>{Ke=cn(Ke,Se," ")}),x&&F?x.createHTML(Ke):Ke},t.setConfig=function(){let q=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Tt(q),ce=!0},t.clearConfig=function(){Xe=null,ce=!1},t.isValidAttribute=function(q,y,I){Xe||Tt({});let re=Oe(q),Ee=Oe(y);return p(re,Ee,I)},t.addHook=function(q,y){typeof y=="function"&&ln(ne[q],y)},t.removeHook=function(q,y){if(y!==void 0){let I=Nu(ne[q],y);return I===-1?void 0:Fu(ne[q],I,1)[0]}return qi(ne[q])},t.removeHooks=function(q){ne[q]=[]},t.removeAllHooks=function(){ne=Hi()},t}var Zi=Ki();var ur={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},as=e=>(...t)=>({_$litDirective$:e,values:t}),Yr=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,n){this._$Ct=t,this._$AM=r,this._$Ci=n}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var fn=class extends Yr{constructor(t){if(super(t),this.it=lt,t.type!==ur.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===lt||t==null)return this._t=void 0,this.it=t;if(t===Mt)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};fn.directiveName="unsafeHTML",fn.resultType=1;var Xi=as(fn);function Ao(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Dr=Ao();function sl(e){Dr=e}var bn={exec:()=>null};function Ve(e,t=""){let r=typeof e=="string"?e:e.source,n={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(Et.caret,"$1"),r=r.replace(s,a),n},getRegex:()=>new RegExp(r,t)};return n}var tp=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Et={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},rp=/^(?:[ \t]*(?:\n|$))+/,np=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,sp=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,hn=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,op=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Eo=/(?:[*+-]|\d{1,9}[.)])/,ol=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,al=Ve(ol).replace(/bull/g,Eo).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),ap=Ve(ol).replace(/bull/g,Eo).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),To=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,ip=/^[^\n]+/,Co=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,lp=Ve(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Co).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),cp=Ve(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Eo).getRegex(),ps="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Ro=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,dp=Ve("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Ro).replace("tag",ps).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),il=Ve(To).replace("hr",hn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ps).getRegex(),up=Ve(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",il).getRegex(),Io={blockquote:up,code:np,def:lp,fences:sp,heading:op,hr:hn,html:dp,lheading:al,list:cp,newline:rp,paragraph:il,table:bn,text:ip},Qi=Ve("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",hn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ps).getRegex(),pp={...Io,lheading:ap,table:Qi,paragraph:Ve(To).replace("hr",hn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Qi).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ps).getRegex()},fp={...Io,html:Ve(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Ro).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:bn,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Ve(To).replace("hr",hn).replace("heading",` *#{1,6} *[^
]`).replace("lheading",al).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},_p=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,mp=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,ll=/^( {2,}|\\)\n(?!\s*$)/,gp=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,fs=/[\p{P}\p{S}]/u,Lo=/[\s\p{P}\p{S}]/u,cl=/[^\s\p{P}\p{S}]/u,bp=Ve(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Lo).getRegex(),dl=/(?!~)[\p{P}\p{S}]/u,hp=/(?!~)[\s\p{P}\p{S}]/u,yp=/(?:[^\s\p{P}\p{S}]|~)/u,vp=Ve(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",tp?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),ul=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,wp=Ve(ul,"u").replace(/punct/g,fs).getRegex(),kp=Ve(ul,"u").replace(/punct/g,dl).getRegex(),pl="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",$p=Ve(pl,"gu").replace(/notPunctSpace/g,cl).replace(/punctSpace/g,Lo).replace(/punct/g,fs).getRegex(),xp=Ve(pl,"gu").replace(/notPunctSpace/g,yp).replace(/punctSpace/g,hp).replace(/punct/g,dl).getRegex(),Sp=Ve("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,cl).replace(/punctSpace/g,Lo).replace(/punct/g,fs).getRegex(),Ap=Ve(/\\(punct)/,"gu").replace(/punct/g,fs).getRegex(),Ep=Ve(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Tp=Ve(Ro).replace("(?:-->|$)","-->").getRegex(),Cp=Ve("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Tp).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),cs=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Rp=Ve(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",cs).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),fl=Ve(/^!?\[(label)\]\[(ref)\]/).replace("label",cs).replace("ref",Co).getRegex(),_l=Ve(/^!?\[(ref)\](?:\[\])?/).replace("ref",Co).getRegex(),Ip=Ve("reflink|nolink(?!\\()","g").replace("reflink",fl).replace("nolink",_l).getRegex(),Ji=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Oo={_backpedal:bn,anyPunctuation:Ap,autolink:Ep,blockSkip:vp,br:ll,code:mp,del:bn,emStrongLDelim:wp,emStrongRDelimAst:$p,emStrongRDelimUnd:Sp,escape:_p,link:Rp,nolink:_l,punctuation:bp,reflink:fl,reflinkSearch:Ip,tag:Cp,text:gp,url:bn},Lp={...Oo,link:Ve(/^!?\[(label)\]\((.*?)\)/).replace("label",cs).getRegex(),reflink:Ve(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",cs).getRegex()},$o={...Oo,emStrongRDelimAst:xp,emStrongLDelim:kp,url:Ve(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Ji).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:Ve(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Ji).getRegex()},Op={...$o,br:Ve(ll).replace("{2,}","*").getRegex(),text:Ve($o.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},is={normal:Io,gfm:pp,pedantic:fp},_n={normal:Oo,gfm:$o,breaks:Op,pedantic:Lp},Pp={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},el=e=>Pp[e];function pr(e,t){if(t){if(Et.escapeTest.test(e))return e.replace(Et.escapeReplace,el)}else if(Et.escapeTestNoEncode.test(e))return e.replace(Et.escapeReplaceNoEncode,el);return e}function tl(e){try{e=encodeURI(e).replace(Et.percentDecode,"%")}catch{return null}return e}function rl(e,t){let r=e.replace(Et.findPipe,(o,a,l)=>{let c=!1,u=a;for(;--u>=0&&l[u]==="\\";)c=!c;return c?"|":" |"}),n=r.split(Et.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(Et.slashPipe,"|");return n}function mn(e,t,r){let n=e.length;if(n===0)return"";let s=0;for(;s<n;){let o=e.charAt(n-s-1);if(o===t&&!r)s++;else if(o!==t&&r)s++;else break}return e.slice(0,n-s)}function Dp(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return r>0?-2:-1}function nl(e,t,r,n,s){let o=t.href,a=t.title||null,l=e[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let c={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:a,text:l,tokens:n.inlineTokens(l)};return n.state.inLink=!1,c}function Mp(e,t,r){let n=e.match(r.other.indentCodeCompensation);if(n===null)return t;let s=n[1];return t.split(`
`).map(o=>{let a=o.match(r.other.beginningSpace);if(a===null)return o;let[l]=a;return l.length>=s.length?o.slice(s.length):o}).join(`
`)}var ds=class{constructor(e){rt(this,"options");rt(this,"rules");rt(this,"lexer");this.options=e||Dr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:mn(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],n=Mp(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let n=mn(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:mn(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=mn(t[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let a=!1,l=[],c;for(c=0;c<r.length;c++)if(this.rules.other.blockquoteStart.test(r[c]))l.push(r[c]),a=!0;else if(!a)l.push(r[c]);else break;r=r.slice(c);let u=l.join(`
`),f=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${u}`:u,s=s?`${s}
${f}`:f;let m=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(f,o,!0),this.lexer.state.top=m,r.length===0)break;let b=o.at(-1);if(b?.type==="code")break;if(b?.type==="blockquote"){let E=b,k=E.raw+`
`+r.join(`
`),N=this.blockquote(k);o[o.length-1]=N,n=n.substring(0,n.length-E.raw.length)+N.raw,s=s.substring(0,s.length-E.text.length)+N.text;break}else if(b?.type==="list"){let E=b,k=E.raw+`
`+r.join(`
`),N=this.list(k);o[o.length-1]=N,n=n.substring(0,n.length-b.raw.length)+N.raw,s=s.substring(0,s.length-E.raw.length)+N.raw,r=k.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),a=!1;for(;e;){let c=!1,u="",f="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let m=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,N=>" ".repeat(3*N.length)),b=e.split(`
`,1)[0],E=!m.trim(),k=0;if(this.options.pedantic?(k=2,f=m.trimStart()):E?k=t[1].length+1:(k=t[2].search(this.rules.other.nonSpaceChar),k=k>4?1:k,f=m.slice(k),k+=t[1].length),E&&this.rules.other.blankLine.test(b)&&(u+=b+`
`,e=e.substring(b.length+1),c=!0),!c){let N=this.rules.other.nextBulletRegex(k),D=this.rules.other.hrRegex(k),A=this.rules.other.fencesBeginRegex(k),j=this.rules.other.headingBeginRegex(k),ee=this.rules.other.htmlBeginRegex(k);for(;e;){let x=e.split(`
`,1)[0],w;if(b=x,this.options.pedantic?(b=b.replace(this.rules.other.listReplaceNesting,"  "),w=b):w=b.replace(this.rules.other.tabCharGlobal,"    "),A.test(b)||j.test(b)||ee.test(b)||N.test(b)||D.test(b))break;if(w.search(this.rules.other.nonSpaceChar)>=k||!b.trim())f+=`
`+w.slice(k);else{if(E||m.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||A.test(m)||j.test(m)||D.test(m))break;f+=`
`+b}!E&&!b.trim()&&(E=!0),u+=x+`
`,e=e.substring(x.length+1),m=w.slice(k)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(a=!0)),s.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(f),loose:!1,text:f,tokens:[]}),s.raw+=u}let l=s.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let c of s.items){if(this.lexer.state.top=!1,c.tokens=this.lexer.blockTokens(c.text,[]),c.task){if(c.text=c.text.replace(this.rules.other.listReplaceTask,""),c.tokens[0]?.type==="text"||c.tokens[0]?.type==="paragraph"){c.tokens[0].raw=c.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),c.tokens[0].text=c.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let f=this.lexer.inlineQueue.length-1;f>=0;f--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[f].src)){this.lexer.inlineQueue[f].src=this.lexer.inlineQueue[f].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(c.raw);if(u){let f={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};c.checked=f.checked,s.loose?c.tokens[0]&&["paragraph","text"].includes(c.tokens[0].type)&&"tokens"in c.tokens[0]&&c.tokens[0].tokens?(c.tokens[0].raw=f.raw+c.tokens[0].raw,c.tokens[0].text=f.raw+c.tokens[0].text,c.tokens[0].tokens.unshift(f)):c.tokens.unshift({type:"paragraph",raw:f.raw,text:f.raw,tokens:[f]}):c.tokens.unshift(f)}}if(!s.loose){let u=c.tokens.filter(m=>m.type==="space"),f=u.length>0&&u.some(m=>this.rules.other.anyLine.test(m.raw));s.loose=f}}if(s.loose)for(let c of s.items){c.loose=!0;for(let u of c.tokens)u.type==="text"&&(u.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:n,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=rl(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let a of n)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<r.length;a++)o.header.push({text:r[a],tokens:this.lexer.inline(r[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(rl(a,o.header.length).map((l,c)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:o.align[c]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=mn(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=Dp(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let n=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),nl(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return nl(r,s,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,a,l=s,c=0,u=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+s);(n=u.exec(t))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(a=[...o].length,n[3]||n[4]){l+=a;continue}else if((n[5]||n[6])&&s%3&&!((s+a)%3)){c+=a;continue}if(l-=a,l>0)continue;a=Math.min(a,a+l+c);let f=[...n[0]][0].length,m=e.slice(0,s+n.index+f+a);if(Math.min(s,a)%2){let E=m.slice(1,-1);return{type:"em",raw:m,text:E,tokens:this.lexer.inlineTokens(E)}}let b=m.slice(2,-2);return{type:"strong",raw:m,text:b,tokens:this.lexer.inlineTokens(b)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,n;return t[2]==="@"?(r=t[1],n="mailto:"+r):(r=t[1],n=r),{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,n;if(t[2]==="@")r=t[0],n="mailto:"+r;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);r=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},Vt=class xo{constructor(t){rt(this,"tokens");rt(this,"options");rt(this,"state");rt(this,"inlineQueue");rt(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Dr,this.options.tokenizer=this.options.tokenizer||new ds,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:Et,block:is.normal,inline:_n.normal};this.options.pedantic?(r.block=is.pedantic,r.inline=_n.pedantic):this.options.gfm&&(r.block=is.gfm,this.options.breaks?r.inline=_n.breaks:r.inline=_n.gfm),this.tokenizer.rules=r}static get rules(){return{block:is,inline:_n}}static lex(t,r){return new xo(r).lex(t)}static lexInline(t,r){return new xo(r).inlineTokens(t)}lex(t){t=t.replace(Et.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,r=[],n=!1){for(this.options.pedantic&&(t=t.replace(Et.tabCharGlobal,"    ").replace(Et.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,r))?(t=t.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=r.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
`:r.push(s);continue}if(s=this.tokenizer.code(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(s=this.tokenizer.fences(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.heading(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.hr(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.blockquote(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.list(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.html(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.def(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.raw,this.inlineQueue.at(-1).src=a.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},r.push(s));continue}if(s=this.tokenizer.table(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.lheading(t)){t=t.substring(s.raw.length),r.push(s);continue}let o=t;if(this.options.extensions?.startBlock){let a=1/0,l=t.slice(1),c;this.options.extensions.startBlock.forEach(u=>{c=u.call({lexer:this},l),typeof c=="number"&&c>=0&&(a=Math.min(a,c))}),a<1/0&&a>=0&&(o=t.substring(0,a+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let a=r.at(-1);n&&a?.type==="paragraph"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s),n=o.length!==t.length,t=t.substring(s.raw.length);continue}if(s=this.tokenizer.text(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,r}inline(t,r=[]){return this.inlineQueue.push({src:t,tokens:r}),r}inlineTokens(t,r=[]){let n=t,s=null;if(this.tokens.links){let c=Object.keys(this.tokens.links);if(c.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)c.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let a=!1,l="";for(;t;){a||(l=""),a=!1;let c;if(this.options.extensions?.inline?.some(f=>(c=f.call({lexer:this},t,r))?(t=t.substring(c.raw.length),r.push(c),!0):!1))continue;if(c=this.tokenizer.escape(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.tag(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.link(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(c.raw.length);let f=r.at(-1);c.type==="text"&&f?.type==="text"?(f.raw+=c.raw,f.text+=c.text):r.push(c);continue}if(c=this.tokenizer.emStrong(t,n,l)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.codespan(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.br(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.del(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.autolink(t)){t=t.substring(c.raw.length),r.push(c);continue}if(!this.state.inLink&&(c=this.tokenizer.url(t))){t=t.substring(c.raw.length),r.push(c);continue}let u=t;if(this.options.extensions?.startInline){let f=1/0,m=t.slice(1),b;this.options.extensions.startInline.forEach(E=>{b=E.call({lexer:this},m),typeof b=="number"&&b>=0&&(f=Math.min(f,b))}),f<1/0&&f>=0&&(u=t.substring(0,f+1))}if(c=this.tokenizer.inlineText(u)){t=t.substring(c.raw.length),c.raw.slice(-1)!=="_"&&(l=c.raw.slice(-1)),a=!0;let f=r.at(-1);f?.type==="text"?(f.raw+=c.raw,f.text+=c.text):r.push(c);continue}if(t){let f="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(f);break}else throw new Error(f)}}return r}},us=class{constructor(e){rt(this,"options");rt(this,"parser");this.options=e||Dr}space(e){return""}code({text:e,lang:t,escaped:r}){let n=(t||"").match(Et.notSpaceStart)?.[0],s=e.replace(Et.endingNewline,"")+`
`;return n?'<pre><code class="language-'+pr(n)+'">'+(r?s:pr(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:pr(s,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,r=e.start,n="";for(let a=0;a<e.items.length;a++){let l=e.items[a];n+=this.listitem(l)}let s=t?"ol":"ul",o=t&&r!==1?' start="'+r+'"':"";return"<"+s+o+`>
`+n+"</"+s+`>
`}listitem(e){return`<li>${this.parser.parse(e.tokens)}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",r="";for(let s=0;s<e.header.length;s++)r+=this.tablecell(e.header[s]);t+=this.tablerow({text:r});let n="";for(let s=0;s<e.rows.length;s++){let o=e.rows[s];r="";for(let a=0;a<o.length;a++)r+=this.tablecell(o[a]);n+=this.tablerow({text:r})}return n&&(n=`<tbody>${n}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+n+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){let t=this.parser.parseInline(e.tokens),r=e.header?"th":"td";return(e.align?`<${r} align="${e.align}">`:`<${r}>`)+t+`</${r}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${pr(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let n=this.parser.parseInline(r),s=tl(e);if(s===null)return n;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+pr(t)+'"'),o+=">"+n+"</a>",o}image({href:e,title:t,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=tl(e);if(s===null)return pr(r);e=s;let o=`<img src="${e}" alt="${r}"`;return t&&(o+=` title="${pr(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:pr(e.text)}},Po=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},Yt=class So{constructor(t){rt(this,"options");rt(this,"renderer");rt(this,"textRenderer");this.options=t||Dr,this.options.renderer=this.options.renderer||new us,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Po}static parse(t,r){return new So(r).parse(t)}static parseInline(t,r){return new So(r).parseInline(t)}parse(t){let r="";for(let n=0;n<t.length;n++){let s=t[n];if(this.options.extensions?.renderers?.[s.type]){let a=s,l=this.options.extensions.renderers[a.type].call({parser:this},a);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){r+=l||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}parseInline(t,r=this.renderer){let n="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=l||"";continue}}let a=o;switch(a.type){case"escape":{n+=r.text(a);break}case"html":{n+=r.html(a);break}case"link":{n+=r.link(a);break}case"image":{n+=r.image(a);break}case"checkbox":{n+=r.checkbox(a);break}case"strong":{n+=r.strong(a);break}case"em":{n+=r.em(a);break}case"codespan":{n+=r.codespan(a);break}case"br":{n+=r.br(a);break}case"del":{n+=r.del(a);break}case"text":{n+=r.text(a);break}default:{let l='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return n}},ls,gn=(ls=class{constructor(e){rt(this,"options");rt(this,"block");this.options=e||Dr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Vt.lex:Vt.lexInline}provideParser(){return this.block?Yt.parse:Yt.parseInline}},rt(ls,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),rt(ls,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),ls),Np=class{constructor(...e){rt(this,"defaults",Ao());rt(this,"options",this.setOptions);rt(this,"parse",this.parseMarkdown(!0));rt(this,"parseInline",this.parseMarkdown(!1));rt(this,"Parser",Yt);rt(this,"Renderer",us);rt(this,"TextRenderer",Po);rt(this,"Lexer",Vt);rt(this,"Tokenizer",ds);rt(this,"Hooks",gn);this.use(...e)}walkTokens(e,t){let r=[];for(let n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)r=r.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,t));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);r=r.concat(this.walkTokens(a,t))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let l=s.renderer.apply(this,a);return l===!1&&(l=o.apply(this,a)),l}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),n.extensions=t),r.renderer){let s=this.defaults.renderer||new us(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,l=r.renderer[a],c=s[a];s[a]=(...u)=>{let f=l.apply(s,u);return f===!1&&(f=c.apply(s,u)),f||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new ds(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,l=r.tokenizer[a],c=s[a];s[a]=(...u)=>{let f=l.apply(s,u);return f===!1&&(f=c.apply(s,u)),f}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new gn;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,l=r.hooks[a],c=s[a];gn.passThroughHooks.has(o)?s[a]=u=>{if(this.defaults.async&&gn.passThroughHooksRespectAsync.has(o))return(async()=>{let m=await l.call(s,u);return c.call(s,m)})();let f=l.call(s,u);return c.call(s,f)}:s[a]=(...u)=>{if(this.defaults.async)return(async()=>{let m=await l.apply(s,u);return m===!1&&(m=await c.apply(s,u)),m})();let f=l.apply(s,u);return f===!1&&(f=c.apply(s,u)),f}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(a){let l=[];return l.push(o.call(this,a)),s&&(l=l.concat(s.call(this,a))),l}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Vt.lex(e,t??this.defaults)}parser(e,t){return Yt.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,l=await(s.hooks?await s.hooks.provideLexer():e?Vt.lex:Vt.lexInline)(a,s),c=s.hooks?await s.hooks.processAllTokens(l):l;s.walkTokens&&await Promise.all(this.walkTokens(c,s.walkTokens));let u=await(s.hooks?await s.hooks.provideParser():e?Yt.parse:Yt.parseInline)(c,s);return s.hooks?await s.hooks.postprocess(u):u})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?Vt.lex:Vt.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let l=(s.hooks?s.hooks.provideParser():e?Yt.parse:Yt.parseInline)(a,s);return s.hooks&&(l=s.hooks.postprocess(l)),l}catch(a){return o(a)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+pr(r.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(r);throw r}}},Pr=new Np;function Qe(e,t){return Pr.parse(e,t)}Qe.options=Qe.setOptions=function(e){return Pr.setOptions(e),Qe.defaults=Pr.defaults,sl(Qe.defaults),Qe};Qe.getDefaults=Ao;Qe.defaults=Dr;Qe.use=function(...e){return Pr.use(...e),Qe.defaults=Pr.defaults,sl(Qe.defaults),Qe};Qe.walkTokens=function(e,t){return Pr.walkTokens(e,t)};Qe.parseInline=Pr.parseInline;Qe.Parser=Yt;Qe.parser=Yt.parse;Qe.Renderer=us;Qe.TextRenderer=Po;Qe.Lexer=Vt;Qe.lexer=Vt.lex;Qe.Tokenizer=ds;Qe.Hooks=gn;Qe.parse=Qe;var Gg=Qe.options,Vg=Qe.setOptions,Yg=Qe.use,Kg=Qe.walkTokens,Zg=Qe.parseInline;var Xg=Yt.parse,Qg=Vt.lex;function wr(e){let t=Qe.parse(e),r=Zi.sanitize(t);return Xi(r)}function fr(e,t){return i`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function Kr(e){return e.loading?i`<div class="prompt-block__status">불러오는 중…</div>`:e.error?i`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function _s(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())} ${r(t.getHours())}:${r(t.getMinutes())}`}var Fp={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},qp={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},Bp=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,jp=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function nr(e){return!!e&&typeof e=="object"}function Do(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function ml(e,t){let r=Do(e),n=Do(t),s=new Map;for(let l of r)s.set(l,(s.get(l)||0)+1);let o=0;for(let l of n){let c=s.get(l)||0;c>0?s.set(l,c-1):o+=1}let a=0;for(let l of s.values())a+=l;return{added:o,removed:a}}function Up(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>nr(s)&&typeof s.text=="string"?s.text:"").join(""):nr(e)&&typeof e.text=="string"&&(t=e.text);let n=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function Wp(e){let t=String(e.name||""),r=e.input||{},n={kind:"tool",tool:t,icon:Fp[t]||"\u{1F527}",input:r,expandable:!0};if((t==="Read"||t==="Write")&&(n.path=String(r.file_path||r.path||"")),t==="Write"&&(n.added=Do(r.content).length),t==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=ml(r.old_string,r.new_string);n.added=s,n.removed=o}if(t==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,a=Array.isArray(r.edits)?r.edits:[];for(let l of a){let c=ml(nr(l)?l.old_string:"",nr(l)?l.new_string:"");s+=c.added,o+=c.removed}n.added=s,n.removed=o}return t==="Bash"&&(n.command=String(r.command||"")),(t==="Grep"||t==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function Mo(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function No(e){let t=e.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=Bp.exec(t);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:t.trim()}:jp.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function zp(e,t){if(e.type==="assistant"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(nr(o)){if(o.type==="text"&&typeof o.text=="string")s.push(No(o.text));else if(o.type==="thinking"){let a=Mo(o.thinking);a&&s.push(a)}else if(o.type==="tool_use"){let a=Wp(o);typeof o.id=="string"&&t.set(o.id,a),s.push(a)}}return s}if(e.type==="user"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(nr(s)&&s.type==="tool_result"){let o=t.get(String(s.tool_use_id));if(o){let a=Up(s.content);o.result=a,o.output=typeof s.content=="string"?s.content:a}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success";return[{kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""}]}return[]}function Hp(e){if(e.type==="item.completed"&&nr(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[No(t.text)];if(t.type==="reasoning"){let r=Mo(t.text);return r?[r]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Gp(e){if(e.schema!=="codex-delegation-monitor-v1"||!nr(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&nr(t.item)){let r=t.item;if(typeof r.id!="string"||r.id.length===0)return[];if(t.type==="item.completed"&&r.kind==="agent_message"&&typeof r.text=="string"&&r.text.trim().length>0)return[No(r.text)];if(t.type==="item.completed"&&r.kind==="reasoning"){let l=Mo(r.text);return l?[l]:[]}if(r.kind!=="activity"||typeof r.activity!="string")return[];let n=qp[r.activity];if(!n)return[];let s="\uC2DC\uC791",o="\u2026",a={kind:"tool",tool:"",icon:o,expandable:!1};if(t.type==="item.completed"){if(r.status==="completed")s="\uC644\uB8CC",o="\u2713";else if(r.status==="failed")s="\uC2E4\uD328",o="\u2717";else return[];a.result=""}return a.tool=`${n} \xB7 ${s}`,a.icon=o,[a]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function Vp(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function gl(e){let t=[],r=new Map,n=Array.isArray(e)?e:[];for(let s of n){let o=s;if(typeof s=="string"){let l=s.trim();if(l.length===0)continue;try{o=JSON.parse(l)}catch{continue}}if(!nr(o))continue;let a=o.schema==="codex-delegation-monitor-v1"?Gp(o):Vp(o)?Hp(o):zp(o,r);for(let l of a)t.push(l)}return t}var Yp=5,Kp=10,Zp=/Task\s+#(\d+)/,Xp=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Qp=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function ms(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Jp(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function ef(e){for(let t=e.length-1;t>=0;t-=1){let r=e[t];if(r.kind==="phase"||r.kind==="gate")return r.text||null}return null}function tf(e){let t=new Map,r=0;for(let s of e){if(s.kind!=="tool")continue;r+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let c=Zp.exec(s.output||s.result||""),u=String(o.activeForm||o.subject||"").trim();if(!c||u.length===0)continue;t.set(c[1],{label:u,active:o.status==="in_progress"?r:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let l=o.activeForm||o.subject;typeof l=="string"&&l.trim().length>0&&(a.label=l.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?r:0)}let n=null;for(let s of t.values())s.active>0&&(!n||s.active>n.active)&&(n=s);return n?n.label:null}function rf(e){if(e.tool==="Bash"){let t=e.command||"";return Xp.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Qp.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function nf(e){let t=e.filter(s=>s.kind==="tool").slice(-Kp),r=new Map;t.forEach((s,o)=>{let a=rf(s);if(!a)return;let l=r.get(a)||{count:0,last:-1};l.count+=1,l.last=o,r.set(a,l)});let n=null;for(let[s,o]of r)(!n||o.count>n.count||o.count===n.count&&o.last>n.last)&&(n={label:s,count:o.count,last:o.last});return n?n.label:null}function sf(e){let t=ef(e);if(t)return{text:t,guess:!1};let r=tf(e);if(r)return{text:r,guess:!1};let n=nf(e);return n?{text:n,guess:!0}:null}function of(e,t){if(typeof e!="number")return"";let r=Math.max(0,Math.floor((t-e)/1e3));return r<60?`${r}\uCD08 \uC804`:Ot(e,t)}function gs(e,t={}){let{transport:r,sessionLogStore:n,onClose:s}=t,o=null,a=null,l=null,c={},u=!0,f=new Set,m=new Set,b=null,E=null,k=!1,N=!1,D=!1,A=null,j=null;function ee(){k=!1,N=!1,D=!1,A=null,j=null}async function x(U){if(r){N=!0,D=!1,ve();try{let B=await Promise.resolve(r("get-attempt-prompt",{attempt_id:U}));if(o!==U)return;!B||typeof B!="object"||Array.isArray(B)?D=!0:(A=B,j=U)}catch{o===U&&(D=!0)}finally{o===U&&(N=!1,ve())}}}function w(){if(k=!k,k&&o&&j!==o){x(o);return}ve()}function S(){if(!k)return"";let U=Kr({loading:N,error:D});if(U)return i`<div class="sv__prompt" data-seam="attempt-prompt">
        ${U}
      </div>`;if(!A)return"";if(A.missing)return i`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let B=_s(A.recorded_at);return i`<div class="sv__prompt" data-seam="attempt-prompt">
      ${B?i`<div class="prompt-block__meta">${B} 발송</div>`:""}
      ${typeof A.task_prompt=="string"?fr("\uACFC\uC5C5 (user)",A.task_prompt):""}
      ${typeof A.system_prompt=="string"?fr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",A.system_prompt):""}
    </div>`}function H(){if(!l||!n)return[];let U=n.get(l);return gl(U?U.lines:[])}function Y(){if(!l||!n)return null;let U=n.get(l),B=U?U.last_event_at:null;return typeof B=="number"?B:null}function ge(){return c.status==="running"}function le(){if(ge()&&o){E||(E=setInterval(()=>ve(),1e3));return}ne()}function ne(){E&&(clearInterval(E),E=null)}function de(U){let B=[],C=0;for(;C<U.length;){let z=U[C];if(z.kind==="tool"){let R=C;for(;R<U.length&&U[R].kind==="tool"&&U[R].tool===z.tool;)R+=1;if(R-C>=Yp&&!m.has(C)){B.push({kind:"group",idx:C,tool:z.tool||"",lines:U.slice(C,R).map((K,Z)=>({idx:C+Z,line:K}))}),C=R;continue}}B.push({kind:"line",idx:C,line:z}),C+=1}return B}function De(U){for(let B=U.length-1;B>=0;B-=1){let C=U[B];if(C.kind==="result"||C.kind==="error")return null;if(C.kind==="tool"&&!Object.hasOwn(C,"result"))return C}return null}function Ue(U){for(let B=U.length-1;B>=0;B-=1)if(U[B].kind==="thinking")return U[B];return null}function Ge(U,B){if(B.kind==="gate")return i`<div class="sv__gate">${B.text}</div>`;if(B.kind==="phase")return i`<div class="sv__phase">${B.text}</div>`;if(B.kind==="result")return i`<div
        class="sv__result${B.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${B.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${wr(B.text||(B.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(B.kind==="thinking"){let C=f.has(U);return i`<div
        class="sv__think${C?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Re(U)}
      >
        <span class="sv__think-line">💭 ${ms(B.text)}</span>
        ${C?i`<pre class="sv__think-expand">${B.text}</pre>`:""}
      </div>`}if(B.kind==="error")return i`<div class="sv__error">⛔ ${B.text}</div>`;if(B.kind==="blocker")return i`<div class="sv__error">⛔ ${B.text}</div>`;if(B.kind==="tool"){let C=f.has(U),z=B.tool==="Bash"?Jp(B.command):0,R=B.tool==="Bash"?z>1?ms(B.command):B.command:B.path||B.command||"";return i`<div
        class="sv__tool${C?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>Re(U)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${B.icon}</span>
          <span class="sv__tool-name">${B.tool}</span>
          ${R?i`<span class="sv__tool-detail">${R}</span>`:""}
          ${z>1?i`<span class="sv__tool-more">⋯ ${z}줄</span>`:""}
          ${typeof B.added=="number"?i`<span class="sv__diff-add">+${B.added}</span>`:""}
          ${typeof B.removed=="number"?i`<span class="sv__diff-del">−${B.removed}</span>`:""}
          ${B.result?i`<span class="sv__tool-ok">→ ${B.result}</span>`:""}
        </span>
        ${C?i`<pre class="sv__tool-expand">${ze(B)}</pre>`:""}
      </div>`}return i`<div class="sv__as">${wr(B.text||"")}</div>`}function ze(U){let B=[];if(U.tool==="Bash"&&typeof U.command=="string"&&U.command.length>0)B.push(U.command);else if(U.input!==void 0)try{B.push(`input: ${JSON.stringify(U.input,null,2)}`)}catch{}return typeof U.output=="string"&&U.output.length>0&&B.push(`output:
${U.output}`),B.join(`

`)}function Ze(){if(!o)return i``;let U=H(),B=(a?[c.model]:[c.runner,c.model,c.effort]).filter(Boolean).join(" \xB7 "),C=c.session_id||"",z=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${u?"ON":"OFF"}`,R=ge(),K=R?of(Y(),Date.now()):"",Z=R?De(U):null,ce=R?Ue(U):null,_e=sf(U);return i`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${a?c.role||"":o}</span>
        ${_e?i`<span
              class="sv__stage${_e.guess?" sv__stage--guess":""}"
              title=${_e.text}
              >${_e.text}</span
            >`:""}
        ${R?i`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${K?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${K}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${K?i`<span class="sv__live-ago">${K}</span>`:""}</span
            >`:""}
        ${C?i`<button
              type="button"
              class="sv__session"
              title=${C}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${C}`}
              @click=${()=>X(C)}
            >
              ⧉ ${C.slice(0,8)}
            </button>`:""}
        ${B?i`<span class="sv__meta">${B}</span>`:""}
        ${c.worktree?i`<span class="sv__wt" title=${c.worktree}
              >${c.worktree}</span
            >`:""}
        ${a?"":i`<button
              type="button"
              class="sv__prompt-toggle${k?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${k?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${w}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${u?" sv__follow--on":""}"
          aria-pressed=${u?"true":"false"}
          aria-label=${z}
          @click=${me}
        >
          <span class="sv__follow-full">⇣ ${z}</span>
          <span class="sv__follow-short">⇣ ${u?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>oe()}
        >
          ✕
        </button>
      </div>
      ${a?"":S()}
      <div class="sv__body">
        ${U.length===0?i`<div class="sv__empty">세션 로그 없음</div>`:de(U).map($e=>$e.kind==="group"?Fe($e):Ge($e.idx,$e.line))}
      </div>
      ${Z||ce?i`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${Z?i`<span class="sv__now-icon">${Z.icon}</span>
                  <span class="sv__now-name">${Z.tool}</span>
                  <span class="sv__now-detail"
                    >${Z.tool==="Bash"?ms(Z.command):Z.path||Z.command||""}</span
                  >`:""}
            ${ce?i`<span class="sv__now-think"
                  >💭 ${ms(ce.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function Fe(U){return i`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>we(U.idx)}
    >
      <span class="sv__group-icon">${U.lines[0].line.icon}</span>
      <span class="sv__group-name">${U.tool}</span>
      <span class="sv__group-count">${U.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function we(U){m.add(U),ve()}function ve(){je(Ze(),e),le(),u&&xe()}function xe(){let U=e.querySelector(".sv__body");U&&(U.scrollTop=U.scrollHeight)}function Re(U){f.has(U)?f.delete(U):f.add(U),ve()}function me(){u=!u,ve()}function X(U){ir(U).then(B=>{B?ie("\uBCF5\uC0AC\uB428","success",1200):ie("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function G(U){!o||!U||(c={...c,...U},ve())}function ke(U){let B=U.target;if(!B||!B.classList||!B.classList.contains("sv__body"))return;!(B.scrollHeight-B.scrollTop-B.clientHeight<=4)&&u&&(u=!1,ve())}e.addEventListener("scroll",ke,!0);function fe(U){let B=U&&U.attempt_id;B&&(o=B,a=typeof U.launch_id=="string"&&U.launch_id.length>0?U.launch_id:null,l=a?`session-log:${o}:${a}`:`session-log:${o}`,c=U.meta||{},u=!0,f.clear(),m.clear(),ee(),!b&&n&&(b=n.subscribe(ve)),r&&Promise.resolve(r("subscribe-session-log",{id:l,attempt_id:o,...a?{launch_id:a}:{}})).catch(()=>{}),ve())}function oe(){let U=l;o=null,a=null,l=null,f.clear(),m.clear(),ee(),ne(),r&&U&&Promise.resolve(r("unsubscribe-session-log",{id:U})).catch(()=>{}),je(i``,e),s&&s()}return{open:fe,updateMeta:G,close:oe,isOpen(){return o!==null},destroy(){ne(),b&&(b(),b=null),e.removeEventListener("scroll",ke,!0),o=null,a=null,l=null,je(i``,e)}}}function yn(e){let t=e&&typeof e=="object"?e:{},r=t.metadata&&typeof t.metadata=="object"?t.metadata:{},n=bl(t.spec_id),s=bl(r.spec_id);return n?{path:n,source:"native",conflict:s.length>0&&s!==n}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function bl(e){return typeof e=="string"?e.trim():""}function af(e){return["plan_review","plan_approval","plan_check"].some(t=>{let r=e[t];return typeof r=="string"&&r.trim().length>0})}function lf(e){let t=e&&e.metadata||{},r=yn(e),n=[];return r.path&&n.push({kind:"spec",path:r.path,missing_state:null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&n.push({kind:"plan",path:t.plan_path.trim(),missing_state:af(t)?null:"plan_pending"}),n}function hl(e,t){let r=lf(e);return i`
    <div class="detail-section-label">Artifacts</div>
    ${r.length===0?i`<div class="detail-empty">산출물 없음</div>`:i`
          ${r.map(n=>i`<div class="detail-art">
                <span class="detail-art__ic" aria-hidden="true">▤</span>
                <button
                  type="button"
                  class="detail-art__path"
                  title=${`${n.path} \xB7 \uD074\uB9AD\uD558\uBA74 \uBCF5\uC0AC`}
                  @click=${s=>t.onCopyPath(s,n.path)}
                >
                  ${n.path}
                </button>
                <button
                  type="button"
                  class="detail-art__op"
                  @click=${s=>t.onOpenDoc(s,n.path,n.missing_state)}
                >
                  열기
                </button>
              </div>`)}
          <div class="detail-art__cap">경로 클릭 = 복사 · 열기 = 뷰어</div>
        `}
  `}var cf="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",df=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,uf=/^\*\*결론\*\* — (.+)$/;function bs(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==cf)return null;let r=df.exec(t[1]||"");if(!r)return null;let n=r[1].split(" ")[0],s=r[2],o=r[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let l=a<t.length?uf.exec(t[a]):null,c=l?l[1].replace(/\s+/g," ").trim():"",u=l?a+1:a;return{lane:n,identifier:s,timestamp:o,conclusion:c,body:t.slice(u).join(`
`).trim()}}var yl=20;function vl(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let r=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${r}-${n} ${s}:${o}`}function pf(e){return e.length>yl?`${e.slice(0,yl)}\u2026`:e}function ff(e,t,r,n){let s=`${t.lane} ${pf(t.identifier)}`;return i`<div class="detail-report">
    <button
      type="button"
      class="detail-report__head"
      data-comment-id=${e.id}
      aria-expanded=${n?"true":"false"}
      @click=${()=>r.onToggle&&r.onToggle(e.id)}
    >
      <span class="detail-report__tri">${n?"\u25BE":"\u25B8"}</span>
      <span class="detail-report__glyph">🤖</span>
      <span class="detail-report__meta">
        <span class="detail-report__kind">작업 보고서</span>
        <span
          class="detail-report__lane${t.lane==="worker"?" detail-report__lane--worker":""}"
          title=${`${t.lane} ${t.identifier} \xB7 ${t.timestamp}`}
          >${s}</span
        >
        <span class="detail-report__time">${vl(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${n&&t.body.length>0?i`<div class="detail-report__body">
          ${wr(t.body)}
        </div>`:""}
  </div>`}function _f(e){return i`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${vl(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${wr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function wl(e,t={},r={}){let n=Array.isArray(e)?e.filter(Boolean):[],s=r.expanded||new Set,o=typeof r.draft=="string"?r.draft:"",a=r.sending===!0,l=n.slice().sort((c,u)=>String(u.created_at||"").localeCompare(String(c.created_at||"")));return i`
    <div class="detail-section-label">댓글 (${n.length})</div>
    ${r.error?i`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:l.length===0?i`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:i`<div class="detail-comments" data-seam="comments">
            ${l.map(c=>{let u=bs(typeof c.text=="string"?c.text:"");return u?ff(c,u,t,s.has(c.id)):_f(c)})}
          </div>`}
    <div class="detail-comment-compose">
      <textarea
        class="detail-comment-compose__input"
        aria-label="댓글 추가"
        placeholder="댓글 추가"
        rows="3"
        ?disabled=${a}
        .value=${o}
        @input=${c=>t.onDraftInput&&t.onDraftInput(c.target.value)}
      ></textarea>
      <div class="detail-comment-compose__row">
        <button
          type="button"
          class="detail-comment-compose__btn"
          ?disabled=${a||o.trim().length===0}
          @click=${()=>t.onSubmit&&t.onSubmit()}
        >
          댓글 추가
        </button>
      </div>
    </div>
  `}var{I:Ib}=Ka;var kl=e=>e.strings===void 0;var mf={},$l=(e,t=mf)=>e._$AH=t;var Mr=as(class extends Yr{constructor(e){if(super(e),e.type!==ur.PROPERTY&&e.type!==ur.ATTRIBUTE&&e.type!==ur.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!kl(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===Mt||t===lt)return t;let r=e.element,n=e.name;if(e.type===ur.PROPERTY){if(t===r[n])return Mt}else if(e.type===ur.BOOLEAN_ATTRIBUTE){if(!!t===r.hasAttribute(n))return Mt}else if(e.type===ur.ATTRIBUTE&&r.getAttribute(n)===t+"")return Mt;return $l(e),t}});var Fo=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],hs=["orchestration_model","orchestration_effort","orchestration_speed"],xl=["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],ys=["delegated","main"],vs=["inherit","claude","codex"],vn=["default","fast"],ws=["standard","fast_track"],wn=["codex","opus","fable","self","skip"],ks=["codex","fable","skip"],$s=["low","medium","high","xhigh"],Bt="auto";function _r(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Sl(e){if(!_r(e)||!_r(e.runners))return[];let t=[];for(let[r,n]of Object.entries(e.runners))_r(n)&&_r(n.models)&&t.push([r,Object.keys(n.models)]);return t}function Al(e){return e?.impl_dispatch==="main"}function xs(e,t){let r=Sl(e),n=t&&t!=="inherit"?r.filter(([s])=>s===t):r;return[Bt,...n.flatMap(([,s])=>s)]}function Zr(e,t,r){if(!_r(e)||!_r(e.runners))return[Bt];let n=[];for(let[s,o]of Object.entries(e.runners))if(!(!_r(o)||!_r(o.models))&&!(t&&t!=="inherit"&&s!==t))for(let[a,l]of Object.entries(o.models)){if(r&&r!==Bt&&a!==r)continue;let c=_r(l)?l.efforts:null;if(Array.isArray(c))for(let u of c)typeof u=="string"&&!n.includes(u)&&n.push(u)}return[Bt,...n]}function Ss(e,t){let r=Sl(e);return(t?r.filter(([s])=>s===t):r).flatMap(([,s])=>s)}function El(e,t){let r={};for(let n of Fo){let s=e?.[n],o=t?.[n];s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}function Tl(e,t){let r={};for(let n of hs){let s=e?.[n]??null,o=t?.[n]??null;s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}var qo=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...hs]}],Bo={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},Rl={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function Cl(e){return typeof e=="string"&&e.length>0?e:null}function gf(e,t,r){let n=Cl(t?.[e]);if(n!==null)return{value:n,source:"pin"};let s=Cl(r?.[e]);return s!==null?{value:s,source:"global"}:{value:null,source:"base"}}function As(e,t,r){return e.map(n=>({key:n,...gf(n,t,r)}))}function Il(e,t,r){let n={pin:0,global:0,base:0};for(let s of As(e,t,r))n[s.source]+=1;return n}function Ll(e,t,r){return{id:e,key:t,value:typeof r=="string"?r:""}}function Ol(e,t,r){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:r}}var Bb=[...Fo,...hs];var bf=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review"},{id:"impl",label:"\uAD6C\uD604",receipt:null},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review"},{id:"pr",label:"PR",receipt:null}],hf={pin:"pin",global:"global",base:"base"};function yf(e){return i`<span
    class=${`detail-layer-rail detail-layer-rail--${hf[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function vf(e,t,r){switch(e){case"workflow_mode":return ws;case"spec_review_model":case"impl_review_model":return wn;case"plan_review_model":return ks;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return $s;case"impl_dispatch":return ys;case"impl_runtime":return vs;case"impl_model":return xs(r,t.impl_runtime);case"impl_effort":return Zr(r,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return vn;case"orchestration_model":return Ss(r,null);case"orchestration_effort":return Zr(r,void 0,t.orchestration_model||Bt).filter(n=>n!==Bt);default:return[]}}function wf(e,t){return i`<div class="detail-effective__row" data-key=${e.key}>
    ${yf(e.source)}
    <span class="detail-effective__k"
      >${Bo[e.key]||e.key}</span
    >
    <span
      class=${`detail-effective__v${e.source==="base"?" detail-effective__v--dim":""}`}
      >${e.value??"(harness \uAE30\uBCF8)"}</span
    >
    <span
      class=${`detail-effective__badge detail-effective__badge--${e.source}`}
      >${Rl[e.source]}</span
    >
    ${t.expanded?i`<select
          class="detail-effective__edit"
          data-edit-key=${e.key}
          aria-label=${`${Bo[e.key]||e.key} \uD3B8\uC9D1`}
          @change=${r=>{let n=String(r.target.value);t.onEdit(e.key,n.length===0?null:n)}}
        >
          <option value="" ?selected=${e.source!=="pin"}>(기본)</option>
          ${t.options.map(r=>i`<option
                value=${r}
                ?selected=${e.source==="pin"&&e.value===r}
              >
                ${r===Bt?"\uC790\uB3D9":r}
              </option>`)}
        </select>`:""}
  </div>`}function Pl(e,t){let r=qo.flatMap(o=>o.keys),n=Il(r,e.metadata,e.workspace_values),s={};for(let o of As(r,e.metadata,e.workspace_values))o.value!==null&&(s[o.key]=o.value);return i`<section
    class=${`detail-effective${e.expanded?" detail-effective--open":""}`}
    data-seam="effective-settings"
  >
    <button
      type="button"
      class="detail-effective__head"
      data-seam="effective-settings-toggle"
      aria-expanded=${e.expanded?"true":"false"}
      @click=${t.onToggle}
    >
      <span class="detail-effective__t">유효 실행 설정</span>
      <span class="detail-effective__summary">${kf(s)}</span>
      <span class="detail-effective__counts">
        <span class="detail-effective__count detail-effective__count--pin"
          >핀 ${n.pin}</span
        >
        <span class="detail-effective__count detail-effective__count--global"
          >전역 ${n.global}</span
        >
      </span>
      <span class="detail-effective__chev">▸</span>
    </button>
    <div class="detail-effective__body">
      ${qo.map(o=>i`
          <div class="detail-effective__subhead">${o.label}</div>
          ${As(o.keys,e.metadata,e.workspace_values).map(a=>wf(a,{expanded:e.expanded,options:vf(a.key,s,e.catalog),onEdit:t.onEdit}))}
        `)}
      <div class="detail-effective__foot">
        <select
          data-impl-preset-select
          aria-label="구현 프리셋"
          .value=${Mr(e.preset_id)}
          ?disabled=${e.preset_busy}
          @change=${o=>t.onPresetSelect(String(o.target.value))}
        >
          <option value="" ?selected=${e.preset_id===""}>
            구현 프리셋…
          </option>
          ${e.presets.map(o=>i`<option
                value=${o.id}
                ?selected=${o.id===e.preset_id}
              >
                ${o.name}${o.compatible===!1?" (\uBE44\uD638\uD658)":""}
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
        <span class="detail-effective__hint">구현 키 5개를 핀으로 기록</span>
      </div>
    </div>
  </section>`}function kf(e){let t=[];if(typeof e.workflow_mode=="string"&&t.push(String(e.workflow_mode)),e.impl_dispatch==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch==="delegated"){let r=typeof e.impl_runtime=="string"?` ${e.impl_runtime}`:"";t.push(`\uC704\uC784${r}`)}else typeof e.impl_runtime=="string"&&t.push(`\uC704\uC784 ${e.impl_runtime}`);return typeof e.impl_model=="string"&&t.push(String(e.impl_model)),t.length>0?t.join(" \xB7 "):"\uAE30\uBCF8"}function Dl(e){let t=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},n=r.stages||{},s=r.route||t.route||null,o=typeof t.pr_url=="string"?t.pr_url:"",a=typeof t.exec_receipt=="string"?t.exec_receipt:"",l=Jn(r.planned_execution,r.exec_receipt);return i`<section class="detail-summary" data-seam="detail-summary">
    <div class="detail-summary__chips">
      <span class="detail-summary__chip detail-summary__chip--status"
        >${e?.status||"\u2014"}</span
      >
      ${s?i`<span class="detail-summary__chip detail-summary__chip--route"
            >${s}</span
          >`:""}
      ${t.workflow_mode==="fast_track"?i`<span class="detail-summary__chip detail-summary__chip--mode"
            >fast_track</span
          >`:""}
      ${o?i`<a
            class="detail-summary__chip detail-summary__chip--pr"
            href=${o}
            target="_blank"
            rel="noreferrer"
            >PR</a
          >`:""}
      ${l?i`<span
            class="detail-summary__chip detail-summary__chip--planned ctl-chip--planned"
            data-kind=${l.kind}
            title=${l.title}
            >${l.label}</span
          >`:""}
      ${a?i`<span
            class="detail-summary__chip detail-summary__chip--receipt"
            title=${a}
            >${a.split("@")[0]}</span
          >`:""}
    </div>
    <div class="detail-summary__gates">
      ${bf.map(c=>{let u=c.receipt&&typeof t[c.receipt]=="string"?String(t[c.receipt]):"",f=n[c.id],m=u.length>0||f?.fill==="full",b=!m&&f?.fill==="dim",E=f?.stale===!0;return i`<span
          class=${`detail-summary__gate${m?" detail-summary__gate--on":""}${b?" detail-summary__gate--current":""}${E?" detail-summary__gate--stale":""}`}
          data-gate=${c.id}
        >
          <span class="detail-summary__gate-pill">${c.label}</span>
          ${u?i`<span class="detail-summary__gate-sha"
                >${u.split("@")[1]?.slice(0,7)||""}</span
              >`:""}
        </span>`})}
    </div>
  </section>`}var Ml=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function kn(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Es(e){if(!kn(e)||!kn(e.runners))return null;let t=Object.entries(e.runners).filter(([,r])=>kn(r)&&kn(r.models));return t.length>0?t:null}function jo(e,t){let r=Es(e);if(!r||!t)return null;for(let[n,s]of r)if(Object.hasOwn(s.models,t))return n;return null}function Nl(e,t){return kn(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function Fl(e,t){let r=Es(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return Nl(n,n.models[t]);return[]}function $f(e){let t=Es(e);if(!t)return[];let r=[];for(let[,n]of t)for(let s of Object.values(n.models))for(let o of Nl(n,s))r.includes(o)||r.push(o);return r}function xf(e,t){if(!t)return $f(e);let n=Es(e)?.find(([o])=>o===t)?.[1];if(!n)return[];let s=[];for(let o of Object.keys(n.models))for(let a of Fl(e,o))s.includes(a)||s.push(a);return s}function ql(e,t,r){let n={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=n.impl_runtime==="inherit"?r:n.impl_runtime==="claude"||n.impl_runtime==="codex"?n.impl_runtime:null;if(n.impl_runtime==="inherit"&&!s)return n.impl_model="",n.impl_effort="",n;let o=jo(t,n.impl_model);if(n.impl_model&&(!s||o!==s))return n.impl_model="",n.impl_effort="",n;let a=n.impl_model?Fl(t,n.impl_model):xf(t,s);return n.impl_effort&&a.length>0&&!a.includes(n.impl_effort)&&(n.impl_effort=""),n}function Sf(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function Bl(e,t){let r=t.getWorkspacePath,n=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",l="";function c(k){k.key==="Escape"&&s&&(k.preventDefault(),b())}document.addEventListener("keydown",c);function u(){return s?i`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>b()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${Sf(s)}</span
            >
            <button
              type="button"
              class="mv__close"
              aria-label="닫기"
              @click=${()=>b()}
            >
              ✕
            </button>
          </div>
          <div class="mv__body">
            ${o==="loading"?i`<div class="mv__status">불러오는 중…</div>`:o==="pending"?i`<div class="mv__status">${l}</div>`:o==="error"?i`<div class="mv__status mv__status--error">
                      ${l||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:wr(a)}
          </div>
        </div>
      </div>
    `:i``}function f(){je(u(),e)}async function m(k,N={}){s=k,o="loading",a="",l="",f();let D=r?r():"";if(!D){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",f();return}if(!n){o="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",f();return}let A="/api/doc?workspace="+encodeURIComponent(D)+"&path="+encodeURIComponent(k);try{let j=await n(A),ee=await j.json().catch(()=>({}));if(!j.ok||!ee||ee.ok!==!0){if(ee?.error==="not_found"&&N.missing_state==="plan_pending"){o="pending",l="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",f();return}o="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(ee&&ee.error||j.status)+")",f();return}a=String(ee.content||""),o="ready",f()}catch{o="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",f()}}function b(){s=null,je(i``,e)}function E(){document.removeEventListener("keydown",c),b()}return{open:m,close:b,destroy:E}}var Af=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],Ul="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Ts=["implementation","review-consult"],Ef=["running","done","failed","interrupted"],Tf={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function Cf(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function Rf(e){let t=bt(e);if(t.length>0)return t.map(s=>i`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let r=Gr(e);if(!r||!e)return"";let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return i`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${r.replace(/^τ /,"\u03C4 \uCD1D ")}${n}</span
    >${e.replayed?i`<span class="detail-usage-partial" title=${Ul}
          >부분 집계</span
        >`:""}`}function jl(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function Uo(e){if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?Wo(t):""}function If(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e;return typeof t.launch_id!="string"||t.launch_id.length===0||t.provider!=="codex"||!Ts.includes(t.role)||typeof t.model!="string"||t.model.length===0||typeof t.session_id!="string"||t.session_id.length===0||!Ef.includes(t.status)||typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))||!(t.turn_id===null||typeof t.turn_id=="string")?null:t}function Lf(e,t){let n=bt({providers:{codex:{subtotal:t.subtotal,breakdown:t.usage,...t.replayed?{replayed:!0}:{}}},roles:{}})[0];return i`<div class="detail-session__leg detail-session__usage-detail">
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${[t.provider,t.model].filter(Boolean).join(" \xB7 ")}</span
    >
    ${t.session_id?i`<span
          class="detail-session__leg-sid detail-session__sid"
          title=${t.session_id}
          >${t.session_id.slice(0,8)}</span
        >`:""}
    ${Uo(t.completed_at)?i`<span class="detail-session__leg-time detail-session__time"
          >${Uo(t.completed_at)}</span
        >`:""}
    ${n?i`<span class="detail-session__usage" title=${n.tooltip}
          >${n.label}</span
        >`:""}
  </div>`}function Of(e,t,r,n){let s=e.status==="running"?null:t,a=(s?bt({providers:{codex:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],l=e.status==="running"?Wo(e.last_event_at):s?Uo(s.completed_at):"";return i`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>n.onOpenDelegation&&n.onOpenDelegation(r,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${Tf[e.status]}</span
    >
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e.role}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >codex · ${e.model}</span
    >
    <span
      class="detail-session__leg-sid detail-session__sid"
      title=${e.session_id}
      >${e.session_id.slice(0,8)}</span
    >
    ${l?i`<span class="detail-session__leg-time detail-session__time"
          >${l}</span
        >`:""}
    ${a?i`<span class="detail-session__usage" title=${a.tooltip}
          >${a.label}</span
        >`:""}
  </button>`}function Pf(e,t){return e.role===t.role&&e.model===t.model&&e.session_id===t.session_id}function Df(e,t,r){let n=[],s=new Set,o=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let f of o){let m=If(f);!m||s.has(m.launch_id)||(s.add(m.launch_id),n.push(m))}n.sort((f,m)=>f.started_at-m.started_at);let a={implementation:[],"review-consult":[]};if(t)for(let f of Ts){let m=t.roles[f]?.codex;a[f]=m?[...m.legs]:[]}let l=Ts.flatMap(f=>a[f]),c=new Set,u=[];for(let f of Ts){for(let m of n.filter(b=>b.role===f)){let b=l.find(E=>E.receipt_id===m.launch_id)||null;b&&!Pf(m,b)||(b&&c.add(b.receipt_id),u.push(Of(m,b,e.attempt_id,r)))}for(let m of a[f])c.has(m.receipt_id)||u.push(Lf(f,m))}return u}function Mf(e,t){let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,n=[...Af,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return i`<div class="detail-session__usage-detail">
    ${n.map(s=>i`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${Cf(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${r===null?"":i`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${r.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?i`<span class="detail-session__usage-note">${Ul}</span>`:""}
  </div>`}var Nf={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Wo(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=String(t.getHours()).padStart(2,"0"),n=String(t.getMinutes()).padStart(2,"0");return`${r}:${n}`}function Ff(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,n])=>typeof n=="string"&&n.length>0).map(([n,s])=>`${n}=${s}`).join(" \xB7 "):"",r=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return i`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${r}</span>
    ${t?i`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function Wl(e,t={},r={}){let n=Array.isArray(e)?e:[],s=r.expanded||new Set;if(n.length===0)return i`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let u of n)u&&typeof u.resumed_from=="string"&&u.resumed_from.length>0&&o.add(u.resumed_from);let a=u=>{if(!(u.status==="failed"||u.status==="orphaned"))return"";let m=typeof u.session_id=="string"&&u.session_id.length>0,b=o.has(u.attempt_id),E=m&&!b,k=m?b?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return i`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${u.attempt_id}
      ?disabled=${!E}
      title=${k}
      @click=${N=>{N.stopPropagation(),E&&t.onResume&&t.onResume(u.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},l=u=>{if(!(u.status==="failed"||u.status==="orphaned")||typeof u.cause!="string"||u.cause==="")return"";let m=u.cause_detail,b=m&&typeof m.reason=="string"&&m.reason.length>0?typeof m.command=="string"&&m.command.length>0?`${m.reason} \xB7 ${m.command}`:m.reason:u.cause;return i`<div class="detail-session__cause" title=${b}>
      ${u.cause}
    </div>`},c=u=>{let f=jl(fo(u));if(bt(f).length===0&&!Gr(u.usage))return"";let m=s.has(u.attempt_id);return i`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${u.attempt_id}
      aria-expanded=${m?"true":"false"}
      title=${m?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${b=>{b.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(u.attempt_id)}}
    >
      τ 자세히
    </button>`};return i`
    <div class="detail-section-label">
      세션 이력${Rf(r.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${n.map(u=>{let f=fo(u),m=jl(f),b=bt(m);return i`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${u.status||"unknown"}"
            data-attempt-id=${u.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(u.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${Nf[u.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${u.attempt_id}</span>
            ${yr(u)?i`<span
                  class="detail-session__resumed"
                  title=${yr(u)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${rr(u)}</span>
            ${b.length>0?i`<span class="detail-session__role">orchestrator</span>`:""}
            ${u.session_id?i`<span class="detail-session__sid" title=${u.session_id}
                  >${String(u.session_id).slice(0,8)}</span
                >`:""}
            ${b.length>0?b.map(E=>i`<span
                      class="detail-session__usage"
                      title=${E.tooltip}
                      >${E.label}</span
                    >`):Gr(u.usage)?i`<span class="detail-session__usage"
                    >${Gr(u.usage)}</span
                  >`:""}
            <span class="detail-session__time">${Wo(u.started_at)}</span>
          </button>
          ${c(u)} ${a(u)} ${l(u)} ${Ff(u)}
          ${s.has(u.attempt_id)&&u.usage?Mf(u.usage,u.runner==="codex"?"codex":"claude"):""}
          ${Df(u,f,t)}
        </div>`})}
    </div>
  `}function zl(e,t={}){return i`
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
    ${e.expanded?i`<div class="detail-prompt" data-seam="task-prompt">
          ${qf(e)}
        </div>`:""}
  `}function qf(e){let t=Kr(e);if(t)return t;let r=e.data;if(!r)return"";if(r.missing)return i`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof r.default_task_prompt=="string"?fr("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",r.default_task_prompt):""}`;let n=_s(r.recorded_at);return i`<div class="detail-prompt__meta">
      ${r.attempt_id}${n?` \xB7 ${n}`:""}
    </div>
    ${typeof r.task_prompt=="string"?fr("\uACFC\uC5C5 (user)",r.task_prompt):""}
    ${typeof r.system_prompt=="string"?fr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",r.system_prompt):""}`}var Bf=["open","in_progress","deferred","resolved","closed"],jf=[0,1,2,3,4];function Hl(e,t){let r=t.issueStores,n=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,l=t.execPresetStore,c=t.sessionLogStore,u=null,f=null,m={},b="",E=!1,k=!1,N={},D=!1,A=!1,j="",ee="",x="";function w(){D=!1,A=!1,j="",ee="",x=""}let S=[],H=null,Y=null,ge=!1,le="",ne=!1,de=0,De=new Set;function Ue(){S=[],H=null,Y=null,ge=!1,le="",ne=!1,de+=1,De.clear()}async function Ge(d){if(!s)return;let _=++de;try{let h=await Promise.resolve(s("get-comments",{id:d}));if(_!==de||d!==u)return;S=Array.isArray(h)?h:[],ge=!1}catch{if(_!==de||d!==u)return;ge=!0}Se()}function ze(){if(!s||!u)return;let d=f&&typeof f.comment_count=="number"?f.comment_count:null;if(H!==u){H=u,Y=d,Ge(u);return}d!==null&&d!==Y&&(Y=d,Ge(u))}function Ze(d){De.has(d)?De.delete(d):De.add(d),Se()}function Fe(d){let _=le.trim().length===0;le=d,_!==(d.trim().length===0)&&Se()}async function we(){let d=le.trim();if(!s||!u||d.length===0||ne)return;let _=u;ne=!0,Se();let h=!1;try{let P=await Promise.resolve(s("add-comment",{id:_,text:d}));Array.isArray(P)&&P.length>0&&(h=!0,_===u&&(S=P,ge=!1,le="",Y=P.length))}catch{h=!1}h||ie("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),_===u&&(ne=!1),Se()}let ve={onToggle:Ze,onDraftInput:Fe,onSubmit:we},xe=document.createElement("div");xe.className="md-viewer-root",document.body.appendChild(xe);let Re=Bl(xe,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),me=document.createElement("div");me.className="session-log-root",document.body.appendChild(me);let X=gs(me,{transport:s?(d,_)=>Promise.resolve(s(d,_)):void 0,sessionLogStore:c}),G=!1,ke=!1,fe=!1,oe=null,U=null,B=0;function C(d){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${d}`}function z(){G=!1,ke=!1,fe=!1,oe=null,U=null,B+=1}async function R(d){if(!s)return;let _=++B;ke=!0,fe=!1,Se();try{let h=await Promise.resolve(s("get-bead-prompt",{bead_id:d}));if(_!==B)return;!h||typeof h!="object"||Array.isArray(h)?fe=!0:(oe=h,U=C(d))}catch{_===B&&(fe=!0)}finally{_===B&&(ke=!1,Se())}}function K(){if(G=!G,G&&u&&U!==C(u)){oe=null,R(u);return}Se()}function Z(){if(!a||!u)return[];let d=a.get();return(d&&d.attempts?Object.values(d.attempts):[]).filter(h=>h&&h.bead_id===u).sort((h,P)=>(P.started_at||0)-(h.started_at||0)).map(h=>({attempt_id:h.attempt_id,bead_id:h.bead_id,status:h.status,started_at:typeof h.started_at=="number"?h.started_at:null,runner:h.runner||null,model:h.model||null,effort:h.effort||null,speed:h.speed||null,session_id:h.session_id||null,resumed_from:h.resumed_from||null,continuation_mode:h.continuation_mode||null,dismissed_at:typeof h.dismissed_at=="number"?h.dismissed_at:null,cause:typeof h.cause=="string"?h.cause:null,cause_detail:h.cause_detail||null,exec_default_preset_id:typeof h.exec_default_preset_id=="string"?h.exec_default_preset_id:null,exec_default_preset_revision:typeof h.exec_default_preset_revision=="number"?h.exec_default_preset_revision:null,exec_values:h.exec_values&&typeof h.exec_values=="object"?h.exec_values:null,usage:h.usage||null,usage_legs:Array.isArray(h.usage_legs)?h.usage_legs:[],delegation_sessions:Array.isArray(h.delegation_sessions)?h.delegation_sessions:[]}))}function ce(){if(!a||!u)return null;let d=a.get();return Ft(d&&d.attempts||{},u)}let _e=new Set;function $e(d){_e.has(d)?_e.delete(d):_e.add(d),Se()}function T(d){let _=a?a.get():null,h=_&&_.attempts?_.attempts[d]:null;X.open({attempt_id:d,meta:h?{runner:h.runner||void 0,model:h.model||void 0,effort:h.effort||void 0,status:h.status||void 0,session_id:h.session_id||void 0}:{}})}function F(d,_){let h=a?a.get():null,P=h&&h.attempts?h.attempts[d]:null,ye=(P&&Array.isArray(P.delegation_sessions)?P.delegation_sessions:[]).find(Ne=>Ne&&typeof Ne=="object"&&Ne.launch_id===_);ye&&X.open({attempt_id:d,launch_id:_,meta:{runner:"codex",role:ye.role,model:ye.model,session_id:ye.session_id,status:ye.status}})}async function te(d){if(!s||!d)return;let _=()=>{let ye=a?a.get():null;return ye&&typeof ye.revision=="number"?ye.revision:0},h=async(ye={})=>await s("worker-attempt-resume",{attempt_id:d,expected_revision:_(),...ye}),P=ye=>{ye?.queue&&a?.set&&a.set(ye.queue)},ue=await h();if(P(ue),ue&&ue.conflict){let ye=ue.queue&&typeof ue.queue.revision=="number"?ue.queue.revision:_();ue=await s("worker-attempt-resume",{attempt_id:d,expected_revision:ye}),P(ue)}ue=await lr(ue,(ye,Ne)=>h({continuation:ye,decision_token:Ne}),{onResult:P,refresh:()=>h()}),ue&&ue.resumed===!1&&!ue.conflict&&ue.reason&&ie(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${ue.reason}`,"error",2400)}let Q={onOpen:T,onOpenDelegation:F,onResume:te,onToggleUsage:$e};function $(){let d=a?a.get():null,_={...N};for(let h of["orchestration_model","orchestration_effort","orchestration_speed"]){let P=d&&d[h];typeof P=="string"&&(_[h]=P)}return _}async function M(){if(s){try{let d=await Promise.resolve(s("get-session-defaults",{}));N=d&&d.values&&typeof d.values=="object"?d.values:{}}catch{N={}}Se()}}function V(){let d=a?a.get():null;return d&&d.runner_catalog||null}function Ie(){let d=f?.metadata&&typeof f.metadata=="object"?f.metadata:{},h=(Object.hasOwn(m,"orchestration_model")?m.orchestration_model:void 0)||(typeof d.orchestration_model=="string"?d.orchestration_model:"")||(typeof $().orchestration_model=="string"?$().orchestration_model:"")||"opus";return jo(V(),h)}function Ce(){let d=l?l.get():null;return!d||typeof d.revision!="number"?null:{revision:d.revision,presets:Array.isArray(d.presets)?d.presets:[]}}function Me(d){return d?.compatible===!1}function Te(d){l&&d&&typeof d.revision=="number"&&Array.isArray(d.presets)&&l.set({revision:d.revision,presets:d.presets})}async function et(){let d=Ce(),_=d?.presets.find(h=>h.id===b);if(!(!s||!u||!d||!_||Me(_)||E)){E=!0,Se();try{let h=await Promise.resolve(s("apply-impl-preset",Ol(u,_.id,d.revision)));if(h&&h.conflict){Te(h),ie("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let P=h&&Array.isArray(h.issue)?h.issue[0]:h?.issue;if(h&&h.applied&&P&&typeof P=="object"){f=P;for(let ue of Ml)delete m[ue];ie("\uAD6C\uD604 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",2400);return}h&&h.error==="bd_readback_failed"?ie("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ie("\uAD6C\uD604 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(h){h&&typeof h=="object"&&h.code==="bd_readback_failed"?ie("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ie("\uAD6C\uD604 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{E=!1,Se()}}}let ht=null;r&&r.subscribe&&(ht=r.subscribe(()=>it()));let yt=null;a&&typeof a.subscribe=="function"&&(yt=a.subscribe(()=>{u&&Se()}));let ot=null;l&&typeof l.subscribe=="function"&&(ot=l.subscribe(()=>{u&&Se()}));function $t(d){d.key==="Escape"&&u&&(d.preventDefault(),n())}document.addEventListener("keydown",$t);function it(){if(u){if(r&&typeof r.snapshotFor=="function"){let d=r.snapshotFor("detail:"+u)||[];f=d.find(h=>h&&h.id===u)||d[0]||f}ze(),Se()}}function st(d){ir(d).then(_=>{_?ie("\uBCF5\uC0AC\uB428","success",1200):ie("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function pt(d){d.preventDefault(),d.stopPropagation(),u&&st(u)}function W(d,_){d.preventDefault(),d.stopPropagation(),st(_)}function J(d,_,h){d.preventDefault(),d.stopPropagation(),Re.open(_,{missing_state:h})}function be(d,_){m[d]=_,Se(),!(!s||!u)&&Promise.resolve(s("update-exec-settings",Ll(u,d,_.length===0?null:_))).catch(()=>{ie("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function he(d,_){let h=f||{},P=h.metadata&&typeof h.metadata=="object"?h.metadata:{},ue={};for(let Be of["impl_runtime","impl_model","impl_effort"])ue[Be]=Object.hasOwn(m,Be)?m[Be]:typeof P[Be]=="string"?P[Be]:"";ue[d]=_;let ye=ql(ue,V(),Ie()),Ne={};for(let Be of["impl_runtime","impl_model","impl_effort"])Ne[Be]=m[Be],m[Be]=ye[Be]||"";Se(),!(!s||!u)&&Promise.resolve(s("update-impl-target",{id:u,...ye,orchestration_runtime:Ie()})).then(Be=>{let ft=Array.isArray(Be)?Be[0]:Be;if(!ft||typeof ft!="object"||!ft.id)throw new Error("implementation target readback failed");f=ft;for(let er of["impl_runtime","impl_model","impl_effort"])delete m[er];Se()}).catch(()=>{for(let Be of["impl_runtime","impl_model","impl_effort"])Ne[Be]===void 0?delete m[Be]:m[Be]=Ne[Be];Se(),ie("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function se(d,_,h){if(!s||!u)return!1;try{let P=await Promise.resolve(s(d,_)),ue=Array.isArray(P)?P[0]:P;return ue&&typeof ue=="object"&&ue.id?(f=ue,!0):(ie(h,"error"),!1)}catch{return ie(h,"error"),!1}}function Pe(d){setTimeout(()=>{try{let _=e.querySelector(d);_&&typeof _.focus=="function"&&_.focus()}catch{}},0)}function tt(){D=!0,j=f&&f.title||"",Se(),Pe('.detail-edit__input[data-edit="title"]')}function Ye(d){j=d.target.value}function Oe(){D=!1,j="",Se()}function Xe(){se("edit-text",{id:u,field:"title",value:j},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(_=>{_&&(D=!1,j=""),Se()})}function Ae(){A=!0,ee=f&&f.description||"",Se(),Pe('.detail-edit__textarea[data-edit="description"]')}function _t(d){ee=d.target.value}function Tt(){A=!1,ee="",Se()}function Pt(){se("edit-text",{id:u,field:"description",value:ee},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(_=>{_&&(A=!1,ee=""),Se()})}function Dt(d,_,h,P){if(d.key==="Escape"){d.stopPropagation(),h();return}d.key==="Enter"&&(!P||d.ctrlKey||d.metaKey)&&(d.preventDefault(),_())}function xr(d){let _=d.target.value;se("update-status",{id:u,status:_},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>Se())}function vt(d){let _=Number(d.target.value);se("update-priority",{id:u,priority:_},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>Se())}function kt(d){x=d.target.value}function Qt(){let d=x.trim();d.length!==0&&se("label-add",{id:u,label:d},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(_=>{_&&(x=""),Se()})}function or(d){if(d.key==="Escape"){d.stopPropagation(),x="",Se();return}d.key==="Enter"&&(d.preventDefault(),Qt())}function jt(d){se("label-remove",{id:u,label:d},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>Se())}let Ut={onCopyPath:W,onOpenDoc:J};function wt(d){return typeof d=="string"?d:d&&typeof d=="object"?String(d.id||d.to||d.issue_id||d.depends_on||""):""}function Jt(d){switch(d&&typeof d=="object"?String(d.dependency_type||d.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function p(d){let h=(Array.isArray(d.dependencies)?d.dependencies:[]).map(P=>({id:wt(P),icon:Jt(P)})).filter(P=>P.id.length>0);return i`
      <div class="detail-section-label">의존성</div>
      ${h.length===0?i`<div class="detail-empty">의존성 없음</div>`:i`<div class="detail-deps">
            ${h.map(P=>o?i`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(P.id)}
                  >
                    ${P.icon?`${P.icon} `:""}${P.id}
                  </button>`:i`<span class="detail-dep"
                    >${P.icon?`${P.icon} `:""}${P.id}</span
                  >`)}
          </div>`}
    `}function v(d){let _=d.metadata||{},h=d.workflow||{},P=h.stages||{},ue=P.spec&&P.spec.stale,ye=P.impl&&P.impl.stale,Ne=P.plan||null,Be=h.route_source==="derived",ft=h.route||_.route||"\u2014";return i`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${Be?" detail-kv__v--derived":""}"
          title=${Be?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${Be?"unset":ft}</span
        >
      </div>
      ${h.route!=="quick_fix"||Object.hasOwn(_,"spec_review")?i`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${_.spec_review||"\uC5C6\uC74C"}${ue?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${h.route==="full_plan"?i`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Ne?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Ne?.approval_receipt||"\uC5C6\uC74C"}${Ne?.approval_state==="stale"?" \xB7 stale":Ne?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${h.route!=="quick_fix"||Object.hasOwn(_,"impl_review")?i`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${_.impl_review||"\uC5C6\uC74C"}${ye?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${h.planned_execution?i`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${h.planned_execution.kind}</span>
            </div>
            ${h.planned_execution.kind==="main"?i`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${h.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${h.exec_receipt?i`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${`${h.exec_receipt.kind}:${h.exec_receipt.actor}@${h.exec_receipt.sha}`}</span
            >
          </div>`:""}
      ${h.impl_entry?i`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${h.impl_entry.actor}@${h.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${_.pr_url?i`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${_.pr_url}</span>
          </div>`:""}
    `}let L={route:["quick_fix","spec_backed","full_plan"]};async function ae(d,_){let h=_.target.value;if(d==="route"&&f&&f.metadata&&f.metadata.route==="full_plan"&&h!=="full_plan"&&!window.confirm(`full_plan \u2192 ${h||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){Se();return}await se("update-workflow-meta",{id:u,key:d,value:h},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),Se()}function q(d){let _=d.metadata||{};return i` ${((P,ue)=>{let ye=L[P],Ne=typeof _[P]=="string"?_[P]:"";return i`<div class="detail-kv">
        <span class="detail-kv__k">${P}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${P}
          data-edit=${`wfmeta-${P}`}
          @change=${Be=>ae(P,Be)}
        >
          <option value="" ?selected=${!ye.includes(Ne)}>
            ${ue}
          </option>
          ${ye.map(Be=>i`<option value=${Be} ?selected=${Ne===Be}>${Be}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function y(d,_){return D?i`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${j}
            @input=${Ye}
            @keydown=${h=>Dt(h,Xe,Oe,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${Xe}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${Oe}
            >
              취소
            </button>
          </div>
        </div>
      `:i`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${d}</h2>
        ${bt(_).map(h=>i`<span class="detail-usage-total" title=${h.tooltip}
              >${h.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${tt}
        >
          ✎
        </button>
      </div>
    `}function I(d){let _=mt(d.created_at),h=mt(d.updated_at);return!_&&!h?i``:i`
      ${_?i`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${_}</span>
          </div>`:""}
      ${h?i`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${h}</span>
          </div>`:""}
    `}function re(d,_){return i`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${xr}
        >
          ${Bf.map(h=>i`<option value=${h} ?selected=${h===d}>${h}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${vt}
        >
          ${jf.map(h=>i`<option value=${String(h)} ?selected=${h===_}>
                P${h}
              </option>`)}
        </select>
      </div>
    `}function Ee(d){return i`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${A?"":i`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${Ae}
            >
              ✎
            </button>`}
      </div>
      ${A?i`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${ee}
              @input=${_t}
              @keydown=${_=>Dt(_,Pt,Tt,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${Pt}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${Tt}
              >
                취소
              </button>
            </div>
          </div>`:i`<div class="detail-overlay__desc">
            ${d||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function Je(d){let _=typeof d.notes=="string"?d.notes:"";return _.trim().length===0?i``:i`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${_}</div>
    `}function qe(d){let _=Array.isArray(d.labels)?d.labels:[];return i`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${_.map(h=>i`<span class="detail-label-chip"
              >${h}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${h}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+h}
                @click=${()=>jt(h)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${x}
            @input=${kt}
            @keydown=${or}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${Qt}
          >
            추가
          </button>
        </span>
      </div>
    `}function Ke(){if(!u)return i``;let d=f||{},_=String(d.id||u),h=d.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",P=ce(),ue=d.status||"open",ye=typeof d.priority=="number"?Math.max(0,Math.min(4,d.priority)):"",Ne=d.description||"",Be={...d,metadata:{...d.metadata||{},...m}};return i`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${()=>n()}></div>
        <div class="detail-overlay__panel">
          <button
            type="button"
            class="detail-overlay__close"
            aria-label="닫기"
            @click=${()=>n()}
          >
            ✕
          </button>
          <button
            type="button"
            class="detail-overlay__id"
            title="ID 복사"
            @click=${pt}
          >
            ${_}
          </button>
          ${y(h,P)}
          ${Dl(Be)}
          ${Pl({metadata:Be.metadata,workspace_values:$(),catalog:V(),expanded:k,presets:Ce()?.presets||[],preset_id:b,preset_busy:E},{onToggle:()=>{k=!k,Se()},onEdit:(ft,er)=>{if(ft==="impl_runtime"||ft==="impl_model"||ft==="impl_effort"){he(ft,er??"");return}be(ft,er??"")},onPresetSelect:ft=>{b=ft,Se()},onPresetApply:()=>{et()}})}
          ${re(ue,ye)} ${I(d)}
          ${Ee(Ne)}
          ${wl(S,ve,{expanded:De,draft:le,sending:ne,error:ge})}
          ${Je(d)} ${qe(d)} ${p(d)}
          ${v(d)} ${q(d)}
          ${hl(d,Ut)}
          ${zl({expanded:G,loading:ke,error:fe,data:oe},{onToggle:K})}
          ${Wl(Z(),Q,{total:P,expanded:_e})}
        </div>
      </div>
    `}function Se(){je(Ke(),e)}return{load(d){d!==u&&(m={},b="",k=!1,w(),Ue(),z()),u=d,f=null,it(),M()},clear(){u=null,f=null,m={},b="",E=!1,w(),Ue(),z(),Re.close(),X.close(),je(i``,e)},destroy(){ht&&(ht(),ht=null),yt&&(yt(),yt=null),ot&&(ot(),ot=null),document.removeEventListener("keydown",$t),Re.destroy(),xe.parentNode&&xe.parentNode.removeChild(xe),X.destroy(),me.parentNode&&me.parentNode.removeChild(me),u=null,f=null,b="",E=!1,Ue(),z(),je(i``,e)}}}function Gl(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let r=t.querySelector("#fatal-error-title"),n=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),l=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},c=(u,f,m="")=>{r&&(r.textContent=u||"Unexpected Error"),n&&(n.textContent=f||"An unrecoverable error occurred.");let b=typeof m=="string"?m.trim():"";if(s&&(b.length>0?(s.textContent=b,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>l()),t.addEventListener("cancel",u=>{u.preventDefault(),l()}),{open:c,close:l,getElement(){return t}}}function Cs(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function Rs(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let r=Math.floor(t/60);if(r<60)return`${r}\uBD84 ${Math.round(t-r*60)}\uCD08`;let n=Math.floor(r/60),s=r%60;return`${n}\uC2DC\uAC04 ${s}\uBD84`}function Vl(e,t){if(typeof e!="object"||e===null)return null;let r=0,n=!1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t)continue;let a=o.started_at,l=o.finished_at;typeof a!="number"||typeof l!="number"||!Number.isFinite(a)||!Number.isFinite(l)||l<a||(r+=l-a,n=!0)}return n?r:null}function Is(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function Uf(e,t){let r=Array.isArray(e)?e:[],n=Array.isArray(t)?t:[];if(r.length===0&&n.length===0)return null;let s=null;for(let l of r)l.kind!=="deploy"||l.state!=="succeeded"||typeof l.target_sha!="string"||(!s||(typeof l.finished_at=="number"?l.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=l);let o=r.filter(l=>l.state==="failed"&&!l.dismissed&&!l.superseded_by).length+n.length,a=r.some(l=>l.state==="repairing");return{deploy:s?{sha:Cs(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function Yl(e,t){let r=Uf(e,t);return r?i`<button
    type="button"
    class="worker-repo-strip"
    data-seam="repo-ops-strip"
    aria-label="저장소 작업 타임라인 열기"
  >
    <span class="worker-repo-strip__cue" aria-hidden="true">▸</span>
    <span class="worker-repo-strip__name">저장소 작업</span>
    ${r.deploy?i`<span class="worker-repo-strip__fact">
          배포
          <code class="worker-repo-strip__sha">${r.deploy.sha}</code>
          <span class="worker-repo-strip__ok">✓ 최신</span>
          <span
            class="worker-repo-strip__ago"
            title=${r.deploy.at?mt(r.deploy.at):""}
            >${Is(r.deploy.at)}${r.deploy.elapsed_ms!==null?` \xB7 ${Rs(r.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${r.badge.tone}"
      >${r.badge.label}</span
    >
  </button>`:""}function Xr(e){let t=Ot(e.created_at),r=Ot(e.updated_at);return!t&&!r?"":i`<div class="worker-mini__meta">
    ${t?i`<span title=${`\uC0DD\uC131 ${mt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&r?i`<span>·</span>`:""}${r?i`<span title=${`\uC218\uC815 ${mt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </div>`}function Wf(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function $n(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function Ls(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function sr(e,t,r={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(m=>m&&m.bead_id===t&&m.phase!=="done").sort((m,b)=>(m.requested_at||0)-(b.requested_at||0)).at(-1),o=typeof r.attempt_id=="string"&&r.attempt_id.length>0?r.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=r.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":r.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":r.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,l=typeof s?.last_error=="string"?s.last_error:null,c=s?Wf(s.phase):null,u=s?.kind==="stale_work_backup_fresh",f=r.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!r.external&&!r.done,enabled:!a&&(!s||!!l),label:u?l?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":l?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(l?u?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${l} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${l} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${c||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:f==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:c,error:l,confirmation:f}}function mr(e){let t=e.discard;if(!t||!t.operation)return"";let r=t.operation,n=r.kind==="stale_work_backup_fresh"&&!t.error?null:r.backup?.path,s=r.original_pr,o=r.revert_pr;return i`<div
    class="worker-discard-receipt"
    role=${t.error?"alert":"status"}
  >
    <span>${t.progress}</span>
    ${t.error?i`<span>폐기 실패: ${t.error}</span>`:""}
    <code>작업: ${r.operation_id}</code>
    ${n?i`<code>백업: ${n}</code>`:t.error?i`<span>아직 아무것도 삭제하지 않음</span>`:""}
    ${s?.url?i`<a href=${s.url} target="_blank" rel="noreferrer noopener"
          >원본 PR #${s.number||"?"}</a
        >`:""}
    ${o?.url?i`<a href=${o.url} target="_blank" rel="noreferrer noopener"
          >revert PR #${o.number||"?"} ·
          ${o.state||"\uC0C1\uD0DC \uBBF8\uD655\uC778"}</a
        >`:""}
  </div>`}var zf={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function Kl(e,t=!1){if(!e||typeof e!="object")return null;let r=e;if(r.reason!=="worktree_stale_work"||!r.stale_work||typeof r.stale_work!="object")return null;let n=r.stale_work,s=n.residue==="branch"?"branch":"worktree",o=n.state==="unique"?"unique":"unknown",a=n.summary&&typeof n.summary=="object"?n.summary:{};function l(u){return Number.isInteger(a[u])?Number(a[u]):0}let c=typeof n.cause=="string"?n.cause:"observe_failed";return{residue:s,state:o,title:s==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":o==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:zf[c]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:s==="branch"?`\uACE0\uC720 commit ${l("branch_ahead")}`:[`staged ${l("staged_count")}`,`unstaged ${l("unstaged_count")}`,`untracked ${l("untracked_count")}`,`branch ahead ${l("branch_ahead")}`,`HEAD ahead ${l("head_ahead")}`].join(" \xB7 "),action_id:typeof n.action_id=="string"?n.action_id:"",can_resume:n.can_resume===!0,can_continue:n.can_continue===!0,can_backup_fresh:n.can_backup_fresh===!0,can_recheck:n.can_recheck===!0,locked:t}}function zo(e){let t=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],n=bt(e.usage),s=Ht(e.usage),o=e.merge_step||null,a=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,l=e.lane==="done"&&!a,c=l?Ot(e.done_at):"",u=t?i`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",f=typeof e.seq=="number"?i`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",m=e.worker_serial===!0?i`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",b=e.workspace_name?i`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",E=i`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,k=i`<span class="worker-mini__title">${e.title}</span>`,N=e.pr_url&&e.pr_number?i`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",D=e.completion_repair_pr_url&&e.completion_repair_pr_number?i`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",A=r.map(Ge=>Ge===e.live_badge?i`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${Ge}</span
        >`:i`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${Ge===e.completion_badge&&e.completion_title||""}
          >${Ge}</span
        >`),j=e.reason?i`<span class="worker-mini__reason">${e.reason}</span>`:"",ee=n.length>0?n.map(Ge=>i`<span class="worker-usage" title=${Ge.tooltip}
              >${Ge.label}</span
            >`):s?i`<span class="worker-usage" title=${Vr(e.usage)}
            >${s}</span
          >`:"",x=o?i`<span
        class="merge-step${o.failed?" merge-step--failed":""}"
        style=${`--progress: ${o.percent}%`}
        >${o.label}${o.index>0?i`<span class="merge-step__n"
              >${o.index}/${o.total}</span
            >`:""}</span
      >`:"",w=e.merge_action?i`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",S=e.cancel_action?i`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",H=e.timeline_action?i`<button
        type="button"
        class="worker-mini__timeline"
        data-bead-id=${e.id}
        title="저장소 작업이 끝나지 않아 머지 액션이 잠겼습니다 — 타임라인에서 원인과 해결 버튼을 볼 수 있습니다"
      >
        저장소 작업 보기
      </button>`:"",Y=e.discard,ge=Y?.action||e.discard_action?i`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${Y?.attempt_id||""}
          data-operation-id=${Y?.operation?.operation_id||""}
          data-discard-mode=${Y?.confirmation||"unmerged"}
          ?disabled=${Y?!Y.enabled:e.discard_enabled===!1}
          title=${Y?Y.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${Y?.label||"\uD3D0\uAE30"}
        </button>`:"",le=e.stale_work||null,ne=le?i`${le.can_resume||le.can_continue?i`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${le.action_id}
            ?disabled=${le.locked}
          >
            기존 작업 이어가기
          </button>`:""}${le.can_backup_fresh?i`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${le.action_id}
            ?disabled=${le.locked}
          >
            백업 후 새로 시작
          </button>`:""}${le.can_recheck?i`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${le.action_id}
            ?disabled=${le.locked}
          >
            다시 확인
          </button>`:""}`:"",de=le?i`<div class="worker-mini__stale">
        <strong>${le.title}</strong>
        <span>${le.summary}</span>
        <span>${le.cause}</span>
        ${le.can_backup_fresh?i`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",De=e.revise_action?i`<button
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
        </button>`:"",Ue=!!(s||o||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||Y?.operation||e.revise_action||le);return i`<div
    class="worker-mini${a?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${o?" worker-mini--merging":""}${o?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${l?i`<div class="worker-mini__row1">${b}${E}${k}</div>
          <div class="worker-mini__row2">
            ${ee}${c?i`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${mt(e.done_at)}`}
                  >완료 ${c}</span
                >`:""}${typeof e.work_ms=="number"?i`<span
                  class="worker-mini__work"
                  title="attempt 실행 시간 합산 (재개 세션 포함)"
                  >작업 ${Rs(e.work_ms)}</span
                >`:""}${A}${x}
            <span class="worker-mini__actions"
              >${w}${S}${H}${ge}</span
            >
            ${Xr(e)}
          </div>`:a?i`<div class="worker-mini__head">
              ${u}${f}${b}${E}${N}${D}${A}${m}${j}
            </div>
            <div class="worker-mini__body">${k}${de}</div>
            ${Ue?i`<div class="worker-mini__foot">
                  ${ee}${x}
                  <span class="worker-mini__actions"
                    >${w}${S}${H}${ge}${De}${ne}</span
                  >
                  ${mr(e)}
                </div>`:""}
            ${Xr(e)}`:i`<div class="worker-mini__line">
              ${u}${f}${b}${E}${k}${N}${D}${A}${m}${j}${ee}${x}${w}${S}${H}${ge}
            </div>
            ${mr(e)} ${Xr(e)}`}
  </div>`}function Hf(e){let t=e.draggable&&!e.done,r=e.workflow,n=r&&r.chips||{},s=n.route||r&&r.route,o=n.route_source==="derived"||!!(r&&r.route_source==="derived"),a=e.is_quick_fix===!0||!!r&&r.route==="quick_fix",l=typeof e.reason=="string"&&e.reason.startsWith("\u26D4");return i`<div
    class="worker-card${t?"":" worker-card--static"}"
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${t?i`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      ${e.workspace_name?i`<span class="worker-card__repo" title=${e.root_dir||""}
            >${e.workspace_name}</span
          >`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span>
      ${r&&s?i`<span
            class="ctl-chip ctl-chip--route${o?" is-derived":""}"
            title=${o?"route \uBBF8\uD540 (metadata unset)":"route"}
            >${o?"unset":s}</span
          >`:""}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${r?Qn(r,e.status):""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${e.reason?i`<span
            class="worker-card__reason${l?" worker-card__reason--danger":""}"
            >${e.reason}</span
          >`:""}
      <!-- 버튼식 큐 적재 (UI-58y2 §[대기로 ↴]): 드래그의 보완재이지 대체재가
           아니므로 자격 조건은 드래그와 완전히 같다 — spec 없는 후보만 막고,
           blocked-with-spec은 드래그와 마찬가지로 적재할 수 있다. 표시 조건
           (coarse pointer / 좁은 화면)은 CSS가 소유한다. -->
      <button
        type="button"
        class="worker-card__place"
        data-bead-id=${e.id}
        ?disabled=${!t}
        title=${t?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":a?"quick_fix route\uB294 \uC6CC\uCEE4 \uC2E4\uD589 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4":"spec\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
      >
        대기로 ↴
      </button>
    </div>
    ${Xr(e)}
  </div>`}function Kt(e){let t=!!e.collapsible&&!!e.collapsed,r=i`<span
      class="worker-pane__dot worker-pane__dot--${e.lane}"
      aria-hidden="true"
    ></span>
    <span class="worker-pane__title">${e.title}</span>
    ${t&&e.preview?i`<span class="worker-pane__preview">${e.preview}</span>`:""}
    <span class="worker-pane__count">${e.items.length}</span>`;return i`<section
    class="worker-pane worker-pane--lane-${e.lane}${e.src?" worker-pane--src":""}${e.live?" worker-pane--live":""}${e.collapsible?" worker-pane--collapsible":""}${t?" worker-pane--collapsed":""}"
    id=${e.id}
    data-lane=${e.lane}
  >
    ${e.collapsible?i`<button
          type="button"
          class="worker-pane__hd worker-pane__hd--toggle"
          data-lane=${e.lane}
          aria-expanded=${t?"false":"true"}
        >
          ${r}
          <span class="worker-pane__caret" aria-hidden="true"
            >${t?"\u25B8":"\u25BE"}</span
          >
        </button>`:i`<header class="worker-pane__hd">
          ${r}${e.header_control?e.header_control:""}
        </header>`}
    ${t?"":i`${e.controls?e.controls:""}
          <div class="worker-pane__body">
            ${e.body?e.body:e.items.length===0?i`<div class="worker-pane__empty">
                    ${e.empty||""}
                  </div>`:e.items.map(n=>e.lane==="candidate"?Hf(n):zo(n))}
          </div>`}
  </section>`}var Zl=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],xn=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function Os(e,t){let r=Zl.find(s=>s.step===e);if(!r)return null;let n=Zl.length;return{step:r.step,label:t,index:r.index,total:n,percent:Math.round(r.index/n*100)}}function Xl(e){let t=xn.findIndex(r=>r.step===e);return xn.map((r,n)=>({step:r.step,label:r.label,state:t<0?"todo":n<t?"done":n===t?"stall":"todo"}))}function Nr(e){let t=xn.find(r=>r.step===e);return t?t.label:typeof e=="string"?e:""}function Gf(e){let t=xn.findIndex(r=>r.step===e);return t<0?null:{index:t+1,total:xn.length}}function Ps(e){let t=Gf(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var Go=new Set(["queued","running","retry_pending","repairing"]),Ql=new Set(["failed","succeeded"]),Vf={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",repairing:"\uC790\uB3D9 \uD574\uACB0 \uC911",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},Sn={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},Yf={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:Sn.base_containment,child_sweep:Sn.child_sweep,branch_cleanup:Sn.branch_cleanup,parent_close:Sn.parent_close};function Kf(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function Zf(e,t,r){return!["verify","deploy"].includes(e.kind)||![...Go,...Ql].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(n=>n&&typeof n=="object"&&n.bead_id===t&&n.merged_sha===r)}function Xf(e,t){let r=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(r!==0)return r;let n=u=>u.state==="succeeded"?1:2,s=n(t)-n(e);if(s!==0)return s;let o=typeof e.requested_at=="number"?e.requested_at:0,a=typeof t.requested_at=="number"?t.requested_at:0;if(o!==a)return a-o;let l=typeof e.operation_id=="string"?e.operation_id:"",c=typeof t.operation_id=="string"?t.operation_id:"";return l.localeCompare(c)}function Ho(e,t=!1){let r=e.kind,n=r==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",s=t?"failed":e.state,o=Vf[s];if(!o)return null;let a=Os(r,`${n} ${o}`);return a?{...a,active:Go.has(s),failed:s==="failed"}:null}function Qf(e){return!e||typeof e!="object"?null:Yf[e.step]||null}function Ds(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,r=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},n=Qf(r),s=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,o=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),a=!o&&(e.cleanup_cursor==="repo_operations"||r.step==="repo_operations"),l=Kf(e.merge_sha)?e.merge_sha:null,c=!o&&l&&Array.isArray(e.repo_operations)?e.repo_operations.filter(k=>k&&typeof k=="object"&&Zf(k,t,l)).sort(Xf):[],u=a?c:[],f=u.find(k=>Go.has(k.state));if(f)return Ho(f);if(s)return s.step==="repo_operations"&&c[0]?Ho(c[0],!0):null;let m=u.find(k=>Ql.has(k.state)?k.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(m)return Ho(m);if(n){let k=Os(n.step,n.label);return k?{...k,active:!0,failed:!1}:null}let b=typeof e.cleanup_cursor=="string"?Sn[e.cleanup_cursor]:null;if(!b)return null;let E=Os(b.step,b.label);return E?{...E,active:!0,failed:!1}:null}function Ms(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var Jl={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},ec={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."};function tc(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function Vo(e){for(let t of tc(e))if(Object.hasOwn(Jl,t))return Jl[t];return null}function Yo(e){let t=null;for(let r of tc(e))Object.hasOwn(ec,r)&&(t=ec[r]);return t}function Ns(e){let t=Vo(e),r=Yo(e);return t&&r?`${t} \u2014 ${r}`:t||r?t||r:typeof e=="string"?e:""}function rc(e,t){let r=Vo(e)??Vo(t),n=Yo(t)??Yo(e);return r&&n?`${r} \u2014 ${n}`:r||n?r||n:typeof t=="string"?t:""}var nc=160;function Jf(e){return e.length>nc?`${e.slice(0,nc)}\u2026`:e}function e_(e){return!e||!e.reason?"":i`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?i` · <code>${Jf(e.command)}</code>`:""}
  </div>`}function t_(e){return e?i`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function Ko(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),r=Math.floor(t/60),n=t%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function sc(e){let t=e.failure?Ns(e.failure.reason):"";return i`<div class="worker-banners">
    ${e.failure?i`<div class="worker-banner worker-banner--failure" role="alert">
          ⛔ ${e.failure.repo||"repo"} 세션 실패 —
          ${t}${t&&!t.endsWith(".")?".":""}
          자동 진행을 껐습니다, 수동 ▶ 필요.
          ${e.failure.resume_attempt_id?i`<button
                type="button"
                class="worker-banner__resume"
                data-attempt-id=${e.failure.resume_attempt_id}
                ?disabled=${!e.failure.resume_eligible}
                title=${e.failure.resume_eligible?"\uCD5C\uADFC \uC2E4\uD328 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":e.failure.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}
              >
                ↻ 이어하기
              </button>`:""}
          ${e.failure.discard?.action?i`<button
                type="button"
                class="worker-banner__discard"
                data-bead-id=${e.failure.bead_id}
                data-attempt-id=${e.failure.resume_attempt_id||""}
                data-operation-id=${e.failure.discard.operation?.operation_id||""}
                data-confirmation=${e.failure.discard.confirmation}
                ?disabled=${!e.failure.discard.enabled}
                title=${e.failure.discard.title}
              >
                ${e.failure.discard.label}
              </button>`:""}
          ${e.failure.resume_attempt_id?i`<button
                type="button"
                class="worker-banner__dismiss"
                data-attempt-id=${e.failure.resume_attempt_id}
                title="이 실패를 처리 완료로 표시하고 배너를 닫습니다"
                aria-label="배너 닫기"
              >
                ✕
              </button>`:""}
          ${e_(e.failure.cause_detail)}
          ${t_(e.failure.reason)}
          ${mr({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function r_(e,t,r=null){let n=e.failed===!0,s=!!e.paused,o=n?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):s?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?Ko(t-e.started_at):"\u2014",a=rr(e),l=yr(e),c=bt(e.usage),u=Ht(e.usage),f=e.conflict_resolution?s?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,m=e.base_exception||null,b=e.attempt_id&&e.attempt_id===r,E=e.discard?.action?i`<button
        type="button"
        class="rtile__discard"
        data-operation-id=${e.discard.operation?.operation_id||""}
        ?disabled=${!e.discard.enabled}
        title=${e.discard.title}
        aria-label=${e.discard.label}
      >
        ${e.discard.label}
      </button>`:"";return i`<div
    class="rtile${b?" rtile--sel":""}${s?" rtile--paused":""}${n?" rtile--failed":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span class="rtile__dot" aria-hidden="true"></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${l?i`<span class="rtile__resumed" title=${l}>↻</span>`:""}
      <span class="rtile__elapsed">${o}</span>
      ${n?i`<button
              type="button"
              class="rtile__resume"
              ?disabled=${e.resume_eligible===!1}
              title=${e.resume_eligible===!1?e.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589"}
              aria-label="이어하기"
            >
              ↻ 이어하기
            </button>
            ${E}
            <button
              type="button"
              class="rtile__dismiss"
              title="실패 기록 닫기"
              aria-label="실패 기록 닫기"
            >
              ✕
            </button>`:i`<button
              type="button"
              class="rtile__session"
              title="라이브 세션 열기"
              aria-label="라이브 세션 열기"
            >
              ▤ 세션
            </button>
            ${s?i`<button
                  type="button"
                  class="rtile__resume"
                  title="같은 세션으로 이어서 재개"
                  aria-label="재개"
                >
                  ▶
                </button>`:i`<button
                  type="button"
                  class="rtile__pause"
                  ?disabled=${e.can_pause===!1}
                  title=${e.can_pause===!1?"\uC138\uC158 ID \uAE30\uB85D \uC804 \u2014 \uC77C\uC2DC\uC815\uC9C0 \uBD88\uAC00":"\uC77C\uC2DC\uC815\uC9C0 (\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC7AC\uAC1C \uAC00\uB2A5)"}
                  aria-label="일시정지"
                >
                  ⏸
                </button>`}
            ${E}`}
    </div>
    <div class="rtile__title">${e.title}</div>
    ${e.current_child?i`<div class="rtile__child" title="현재 진행중 child">
          └ ${e.current_child}
        </div>`:""}
    ${a||c.length>0||u||f||m?i`<div class="rtile__meta">
          ${f?i`<span class="worker-mini__badge">${f}</span>`:""}
          ${m?i`<span
                class="worker-mini__badge"
                title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                >${m}</span
              >`:""}
          ${a?i`<span class="rtile__runner">${a}</span>`:""}
          ${c.length>0?c.map(k=>i`<span class="worker-usage" title=${k.tooltip}
                    >${k.label}</span
                  >`):u?i`<span
                  class="worker-usage"
                  title=${Vr(e.usage)}
                  >${u}</span
                >`:""}
        </div>`:""}
    ${Xr(e)} ${mr(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일): 큐
         스냅샷에는 페이즈명도 진행률도 없으므로 진행 바는 만들지 않는다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${n||s?"":i`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function Zo(e,t=Date.now(),r=null){let n=Array.isArray(e)?e:[];return i`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?i`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>r_(s,t,r))}
  </div>`}function Fr(e){return i`<svg
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
  </svg>`}function Xo(){return Fr(gr`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function Qo(){return Fr(gr`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function oc(){return Fr(gr`<rect x="4.3" y="4.3" width="7.4" height="7.4" rx="1.2" />`)}function ac(){return Fr(gr`<path d="M4.4 4.4 11.6 11.6M11.6 4.4 4.4 11.6" />`)}function ic(){return Fr(gr`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function lc(){return Fr(gr`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function cc(){return Fr(gr`<path d="M3 3.6 8.2 8 3 12.4z" />
    <path d="M8.8 3.6 14 8l-5.2 4.4z" />`)}var An=1,n_=6e4,s_={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"},o_=new Set(["auto_merge","merged","merge","done"]),dc={running:3,paused:2,failed:1};function a_(e,t){let r=null,n=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=n&&(n=o,r=s)}return r}function i_(e,t){let r=Object.values(e||{}),n=new Set,s=new Map;for(let a of r)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&n.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of r){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let l=null;if(a.status==="running")l="running";else if(a.status==="paused"&&!n.has(a.attempt_id))l="paused";else if(a.status==="failed"||a.status==="orphaned"){let m=t.get(a.bead_id),b=typeof m=="number"&&m>0&&typeof a.finished_at=="number"&&m>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!b&&typeof a.dismissed_at!="number"&&(l="failed")}if(!l)continue;let c=typeof a.started_at=="number"?a.started_at:null,u=o.get(a.bead_id);if(u){let m=dc[u.run_state],b=dc[l];if(m>b||m===b&&(u.started_at??0)>(c??0))continue}let f=typeof a.session_id=="string"&&a.session_id.length>0;o.set(a.bead_id,{attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",run_state:l,started_at:c,last_event_at:typeof a.last_event_at=="number"?a.last_event_at:null,runner:typeof a.runner=="string"?a.runner:null,model:typeof a.model=="string"?a.model:null,effort:typeof a.effort=="string"?a.effort:null,speed:typeof a.speed=="string"?a.speed:null,resumed_from:typeof a.resumed_from=="string"?a.resumed_from:null,continuation_mode:a.continuation_mode==="session"||a.continuation_mode==="fresh"?a.continuation_mode:null,usage:Ft(e,a.bead_id),can_pause:l==="running"&&f,can_resume:l!=="running"&&f&&!n.has(a.attempt_id)})}return o}function uc(e,t){let r=e[t];if(!r)return"";if(r.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let n=typeof r.reason=="string"?r.reason:"",s=n.indexOf(":");return s>0&&s<n.length-1?`\u26D4 ${n.slice(0,s)} (${n.slice(s+1)})`:`\u26D4 ${n}`}function Rt(e){return e&&typeof e=="object"?e:{}}function Jo(e,t,r){let n=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=r&&typeof r.done_since=="number"?r.done_since:void 0,a=new Map;for(let A of s)A&&typeof A.root_dir=="string"&&a.set(A.root_dir,A);let l=[],c=[],u=[],f=[],m=[],b=new Map;for(let A of n){if(!A||typeof A.root_dir!="string")continue;let j=A.root_dir,ee=A.name||j,x=a.get(j),w=x&&typeof x.revision=="number"?x.revision:typeof A.revision=="number"?A.revision:0,S=Rt(A.attempts),H=Rt(A.bead_titles),Y=Rt(A.pr_observations),ge=Rt(A.admission),le=Rt(A.revise_parked),ne=Rt(A.merge_queue_state),de=Rt(A.cleanup_failed),De=Rt(A.discard_operations),Ue=Rt(A.pr_activity),Ge=Array.isArray(A.repo_operations)?A.repo_operations:[],ze=Array.isArray(A.merge_queue)?A.merge_queue:[],Ze=new Set(ze.filter(X=>X&&typeof X.bead_id=="string").map(X=>X.bead_id)),Fe=new Map(ze.filter(X=>X&&typeof X.bead_id=="string").map(X=>[X.bead_id,X])),we=Array.isArray(A.queue)?A.queue:[],ve=Array.isArray(A.done)?A.done:[],xe=new Map;for(let X of ve)X&&typeof X.bead_id=="string"&&typeof X.added_at=="number"&&xe.set(X.bead_id,X.added_at);let Re=X=>({id:X,title:H[X]||X,root_dir:j,workspace_name:ee,expected_revision:w,draggable:!1}),me=new Set;for(let[X,G]of i_(S,xe))me.add(X),c.push({...Re(X),lane:"running",attempt_id:G.attempt_id,run_state:G.run_state,can_pause:G.can_pause,can_resume:G.can_resume,started_at:G.started_at,last_event_at:G.last_event_at,runner:G.runner,model:G.model,effort:G.effort,speed:G.speed,resumed_from:G.resumed_from,continuation_mode:G.continuation_mode,usage:G.usage,discard:sr(De,X,{attempt_id:G.attempt_id}),badges:G.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:G.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:G.run_state==="failed"});for(let X of Array.isArray(A.pr_wait)?A.pr_wait:[]){let G=X&&X.bead_id;if(typeof G!="string"||me.has(G))continue;me.add(G);let ke=Rt(Y[G]),fe=Rt(ke.pr),oe=ke.gate?Rt(ke.gate):null,U=Ze.has(G),B=Fe.get(G)?.continuation_action||null,C=!!B&&B.continuation===null,z=ne.active===G,R=X.external===!0,K=de[G]||null,Z=Rt(Ue[G]),ce=Ds({bead_id:G,merge_sha:X.merge_sha,cleanup_cursor:X.cleanup_cursor,merge_progress:Z.merge_progress||null,cleanup_failed:K,repo_operations:Ge}),_e=Ms(ce),$e=!!oe&&oe.base_badge==="\uCDA9\uB3CC",T=!!K&&["child_sweep","branch_cleanup","parent_close"].includes(K.step)&&!!oe&&oe.tier==="merged",F=R&&!!K&&!!oe&&oe.tier==="merged",te=!!oe&&["closed_unmerged","review","undecidable"].includes(oe.tier),Q=sr(De,G,{external:R,merge_active:z||ce?.step==="merge",merge_queued:U,cleanup_active:_e,merged:!!K||oe?.tier==="merged"}),$=!!Q.operation;u.push({...Re(G),lane:"pr_wait",pr_number:typeof fe.number=="number"?fe.number:null,pr_url:typeof fe.url=="string"?fe.url:void 0,external:R,usage:Ft(S,G),merge_step:ce,badges:C?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:ce?[oe?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:K?[Nr(K.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Nr(K.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof oe?.gate_badge=="string"&&oe.gate_badge.length>0?[oe.gate_badge]:[],alert:ce?ce.failed===!0:!!K||te,reason:K&&ce?.active!==!0?Ps(K.step):"PR \uB300\uAE30",merge_action:oe?.tier==="merged"&&!T&&!F?!1:!U||C,merge_enabled:!$&&(C||oe?.enabled===!0||$e||T||F),merge_label:C?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":F||T?"\uC815\uB9AC \uC7AC\uAC1C":$e&&!T?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:C?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":$?Q.error?`\uD3D0\uAE30 \uC2E4\uD328: ${Q.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${Q.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:F?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":T?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":$e?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":oe?.enabled===!0?`\uBA38\uC9C0 (${oe.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${oe?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:U&&!C,cancel_enabled:!z,continuation_mismatch:B?.mismatch||null,discard:Q,discard_action:Q.action,discard_enabled:Q.enabled,discard_title:Q.title})}for(let X=0;X<we.length;X++){let G=we[X],ke=G&&G.bead_id;if(typeof ke!="string"||me.has(ke))continue;me.add(ke);let fe=le[ke],oe=sr(De,ke),U=oe.operation?oe:null,B={...Re(ke),lane:"queue",draggable:!U,discard:U||void 0,reason:uc(ge,ke),queue_position:X+1,queue_index:X,queue_length:we.length,badges:fe?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!fe,revise_action:!!fe,revise_enabled:!!fe&&!U,revise_title:fe?fe.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${fe.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};f.push(B);let C=b.get(j);C?C.push(B):b.set(j,[B])}for(let X of Array.isArray(A.runnable)?A.runnable:[]){let G=X&&X.bead_id;typeof G!="string"||me.has(G)||(me.add(G),l.push({...Re(G),title:X.title||H[G]||G,lane:"runnable",draggable:!0,reason:uc(ge,G),created_at:X.created_at??void 0,updated_at:X.updated_at??void 0,labels:Array.isArray(X.labels)?X.labels:[],spec_reviewer:typeof X.spec_reviewer=="string"?X.spec_reviewer:void 0,plan_state:X.plan_state==="approved"||X.plan_state==="authored"?X.plan_state:"none",workflow:X.route?{route:X.route,chips:{route:X.route}}:null,place_index:we.length}))}for(let X of ve){let G=X&&X.bead_id;if(typeof G!="string"||me.has(G)||(me.add(G),o!==void 0&&typeof X.added_at=="number"&&X.added_at<o))continue;let ke=a_(S,G);m.push({...Re(G),lane:"done",done:!0,usage:Ft(S,G),done_at:typeof X.added_at=="number"?X.added_at:void 0,done_kind:ke&&typeof ke.done_kind=="string"?ke.done_kind:null})}}let E=new Map;s.forEach((A,j)=>{A&&typeof A.root_dir=="string"&&E.set(A.root_dir,j)});let k=r&&r.running_sort==="repo"?"repo":"started";c.sort((A,j)=>{if(k==="repo"){let w=E.get(A.root_dir)??Number.MAX_SAFE_INTEGER,S=E.get(j.root_dir)??Number.MAX_SAFE_INTEGER;if(w!==S)return w-S}let ee=typeof A.started_at=="number"&&Number.isFinite(A.started_at)?A.started_at:null,x=typeof j.started_at=="number"&&Number.isFinite(j.started_at)?j.started_at:null;return ee!==null&&x!==null&&ee!==x?ee-x:ee===null&&x!==null?1:ee!==null&&x===null?-1:A.id.localeCompare(j.id)}),m.sort((A,j)=>(j.done_at??0)-(A.done_at??0));let N=s.length>0?s:n.map(A=>({root_dir:A&&A.root_dir,name:A&&A.name,auto_advance:A&&A.auto_advance,auto_merge:A&&A.auto_merge,slots:A&&A.slots,revision:A&&A.revision,runner_catalog:A&&A.runner_catalog})),D=[];for(let A of N)!A||typeof A.root_dir!="string"||D.push({root_dir:A.root_dir,name:A.name||A.root_dir,auto_advance:A.auto_advance===!0,auto_merge:A.auto_merge===!0,slots:typeof A.slots=="number"&&A.slots>=An?A.slots:An,revision:typeof A.revision=="number"?A.revision:0,runner_catalog:Rt(A.runner_catalog),items:b.get(A.root_dir)||[]});return{runnable:l,queue:f,queue_groups:D,running:c,pr_wait:u,done:m,automation:{total:D.length,both_on:D.filter(A=>A.auto_advance&&A.auto_merge).length}}}function l_(e,t){if(typeof e!="number"||!Number.isFinite(e))return"";let n=t-e<n_;return i`<span
    class="mon-beat${n?" mon-beat--live":""}"
    title=${`\uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${mt(e)}`}
    ><span class="mon-beat__dot" aria-hidden="true"></span>${n?"":i`<span class="mon-beat__age"
          >${Ot(e,t)}</span
        >`}</span
  >`}function En(e){return i`<div class="mon-c__title">${e.title}</div>`}function Tn(e){return i`<span class="mon-c__id" title="클릭하면 상세로 이동"
    >${e.id}</span
  >`}function Fs(e){return e.workspace_name?i`<span class="mon-c__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:""}function ea(e){let t=bt(e.usage),r=Ht(e.usage);return t.length>0?t.map(n=>i`<span class="mon-c__usage" title=${n.tooltip}
          >${n.label}</span
        >`):r?i`<span class="mon-c__usage" title=${Vr(e.usage)}
        >${r}</span
      >`:""}function ta(e){return(Array.isArray(e.badges)?e.badges:[]).map(r=>i`<span class="mon-c__badge${e.alert?" mon-c__badge--alert":""}"
        >${r}</span
      >`)}function c_(e){return i`<span class="mon-c__ops">
    ${e.run_state==="running"?i`<button
          type="button"
          class="mon-op mon-op--pause"
          ?disabled=${e.can_pause===!1}
          aria-label="일시정지"
          title="일시정지 — 세션을 끊고 이어하기 가능 상태로 둡니다"
        >
          ${Qo()}
        </button>`:i`<button
          type="button"
          class="mon-op mon-op--resume"
          ?disabled=${e.can_resume===!1}
          aria-label="이어하기"
          title="이어하기"
        >
          ${Xo()}
        </button>`}
    ${e.discard?.action?i`<button
          type="button"
          class="mon-op mon-op--discard"
          data-operation-id=${e.discard.operation?.operation_id||""}
          data-discard-mode=${e.discard.confirmation}
          ?disabled=${!e.discard.enabled}
          aria-label=${e.discard.label}
          title=${e.discard.title}
        >
          ${e.discard.label}
        </button>`:""}
    ${e.run_state==="failed"?i`<button
          type="button"
          class="mon-op mon-op--dismiss"
          aria-label="실패 기록 닫기"
          title="실패 기록 닫기"
        >
          ${ac()}
        </button>`:""}
  </span>`}function d_(e,t){let r=typeof e.started_at=="number"?Ko(t-e.started_at):"";return i`${En(e)}
    <div class="mon-c__meta">
      ${ta(e)}${l_(e.last_event_at,t)}${Tn(e)}${Fs(e)}
      ${rr(e)?i`<span class="mon-c__model">${rr(e)}</span>`:""}
      ${yr(e)?i`<span
            class="rtile__resumed"
            title=${yr(e)}
            >↻</span
          >`:""}
      ${r?i`<span class="mon-live__elapsed">${r}</span>`:""}
      ${ea(e)}${c_(e)}${mr(e)}
    </div>`}function u_(e){let t=e.workflow,n=(t&&t.chips||{}).route||t&&t.route,s=typeof e.spec_reviewer=="string"?e.spec_reviewer:"",o=e.plan_state==="approved"?"plan \u2713":e.plan_state==="authored"?"plan \u270E":"plan \u2013",a=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),l=Ot(e.updated_at);return i`${En(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>${Tn(e)}
      ${n?i`<span class="ctl-chip ctl-chip--route">${n}</span>`:""}
      ${s?i`<span
            class="ctl-chip mon-c__review${s==="skipped"?" mon-c__review--dim":""}"
            >spec:${s}</span
          >`:""}
      ${n==="full_plan"?i`<span
            class="ctl-chip mon-c__plan${e.plan_state==="none"?" mon-c__review--dim":""}"
            >${o}</span
          >`:""}
      ${Xn(e.labels,null).map(c=>i`<span class="ctl-chip ctl-chip--label">${c}</span>`)}
      ${Fs(e)}
      ${l?i`<span title=${`\uC218\uC815 ${mt(e.updated_at)}`}
            >수정 ${l}</span
          >`:""}
      ${e.reason?i`<span
            class="mon-c__reason${a?" mon-c__reason--danger":""}"
            >${e.reason}</span
          >`:""}
      <span class="mon-c__ops">
        <button
          type="button"
          class="worker-card__place"
          data-bead-id=${e.id}
          title="대기 큐 맨 뒤에 추가"
        >
          대기로 ↴
        </button>
      </span>
    </div>`}function p_(e){let t=!!e.discard?.operation;return i`${En(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>
      <span class="mon-live__pos">#${e.queue_position}</span>${Tn(e)}
      ${ta(e)}
      ${e.reason?i`<span class="mon-c__reason">${e.reason}</span>`:""}
      <span class="mon-c__ops">
        <button
          type="button"
          class="mon-op mon-op--up"
          ?disabled=${t||(e.queue_position??1)<=1}
          aria-label="한 칸 앞으로"
          title="한 칸 앞으로"
        >
          ↑
        </button>
        <button
          type="button"
          class="mon-op mon-op--down"
          ?disabled=${t||(e.queue_index??0)>=(e.queue_length??1)-1}
          aria-label="한 칸 뒤로"
          title="한 칸 뒤로"
        >
          ↓
        </button>
        <button
          type="button"
          class="mon-op mon-op--remove"
          ?disabled=${t}
          aria-label="대기 큐에서 제거"
          title="대기 큐에서 제거"
        >
          ✕
        </button>
        ${t?i`<button
              type="button"
              class="worker-mini__discard"
              data-bead-id=${e.id}
              data-attempt-id=${e.discard?.attempt_id||""}
              data-operation-id=${e.discard?.operation?.operation_id||""}
              data-discard-mode=${e.discard?.confirmation||"unmerged"}
              ?disabled=${!e.discard?.enabled}
              aria-label=${e.discard?.label||"\uD3D0\uAE30"}
              title=${e.discard?.title||""}
            >
              ${e.discard?.label||"\uD3D0\uAE30"}
            </button>`:""}
      </span>
    </div>
    ${mr(e)}
    ${e.revise_action?i`<div class="mon-c__tail">
          <button
            type="button"
            class="worker-mini__revise-fix"
            data-bead-id=${e.id}
            ?disabled=${e.revise_enabled===!1}
            title=${e.revise_title||""}
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
          </button>
        </div>`:""}`}function f_(e){let t=e.merge_step||null,r=!!(Ht(e.usage)||t||e.merge_action||e.cancel_action||e.discard_action);return i`${En(e)}
    <div class="mon-c__meta">
      ${Tn(e)}${Fs(e)}
      ${e.pr_url&&e.pr_number?i`<a
            class="mon-c__pr"
            href=${e.pr_url}
            target="_blank"
            rel="noreferrer noopener"
            title="PR 열기"
            >#${e.pr_number} ↗</a
          >`:""}
      ${ta(e)}
      ${e.reason?i`<span class="mon-c__reason">${e.reason}</span>`:""}
    </div>
    ${r?i`<div class="mon-c__tail">
          ${ea(e)}${t?i`<span
                class="merge-step${t.failed?" merge-step--failed":""}"
                style=${`--progress: ${t.percent}%`}
                >${t.label}${t.index>0?i`<span class="merge-step__n"
                      >${t.index}/${t.total}</span
                    >`:""}</span
              >`:""}
          ${e.merge_action?i`<button
                type="button"
                class="worker-mini__merge"
                data-bead-id=${e.id}
                ?disabled=${e.merge_enabled===!1}
                title=${e.merge_title||""}
              >
                ${e.merge_label||"\uBA38\uC9C0"}
              </button>`:""}
          ${e.cancel_action?i`<button
                type="button"
                class="worker-mini__merge-cancel"
                data-bead-id=${e.id}
                ?disabled=${e.cancel_enabled===!1}
                title=${e.cancel_title||""}
              >
                취소
              </button>`:""}
          ${e.discard_action?i`<button
                type="button"
                class="worker-mini__discard"
                data-bead-id=${e.id}
                data-attempt-id=${e.discard?.attempt_id||""}
                data-operation-id=${e.discard?.operation?.operation_id||""}
                data-discard-mode=${e.discard?.confirmation||"unmerged"}
                ?disabled=${e.discard_enabled===!1}
                title=${e.discard_title}
              >
                ${e.discard?.label||"\uD3D0\uAE30"}
              </button>`:""}
          ${mr(e)}
        </div>`:""}`}function __(e,t){let r=e.done_kind||"",n=r?s_[r]||r:"",s=Ot(e.done_at,t);return i`${En(e)}
    <div class="mon-c__meta">
      ${Tn(e)}${Fs(e)}
      ${n?i`<span
            class="mon-live__kind${o_.has(r)?" mon-live__kind--ok":" mon-live__kind--warn"}"
            >${n}</span
          >`:""}
      ${ea(e)}
      ${s?i`<span title=${`\uC644\uB8CC ${mt(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
    </div>`}function pc(e,t){return e.lane==="running"?d_(e,t):e.lane==="runnable"?u_(e):e.lane==="queue"?p_(e):e.lane==="pr_wait"?f_(e):__(e,t)}function fc(e){let t=String(e.revision);return i`<header
    class="mon-group__hd${e.items.length===0?" is-empty":""}"
    data-root-dir=${e.root_dir}
    data-revision=${t}
  >
    <span class="mon-group__name" title=${e.root_dir}>${e.name}</span>
    <span class="mon-group__count">${e.items.length}</span>
    <span class="mon-group__ops">
      <button
        type="button"
        class="mon-ctl mon-ctl--advance${e.auto_advance?" is-active":""}"
        data-root-dir=${e.root_dir}
        data-revision=${t}
        data-on=${e.auto_advance?"false":"true"}
        aria-pressed=${e.auto_advance?"true":"false"}
        title=${e.auto_advance?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uD074\uB9AD\uD558\uBA74 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uD074\uB9AD\uD558\uBA74 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
      >
        ${e.auto_advance?Qo():Xo()}
        <span class="mon-ctl__label">자동화</span>
      </button>
      <button
        type="button"
        class="mon-ctl mon-ctl--merge-auto${e.auto_merge?" is-active":""}"
        data-root-dir=${e.root_dir}
        data-revision=${t}
        data-on=${e.auto_merge?"false":"true"}
        aria-pressed=${e.auto_merge?"true":"false"}
        title=${e.auto_merge?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uD074\uB9AD\uD558\uBA74 \uB044\uACE0 \uC774 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uC744 \uBE44\uC6C1\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uD074\uB9AD\uD558\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4"}
      >
        ${ic()}
        <span class="mon-ctl__label">머지</span>
      </button>
      <label class="mon-ctl mon-ctl--slots" title="동시에 실행할 세션 수">
        ${lc()}
        <span class="mon-ctl__label">슬롯</span>
        <input
          type="number"
          class="mon-slots__input"
          min=${An}
          step="1"
          data-root-dir=${e.root_dir}
          data-revision=${t}
          aria-label=${`${e.name} \uB3D9\uC2DC \uC2E4\uD589 \uC2AC\uB86F`}
          .value=${String(e.slots)}
        />
      </label>
    </span>
  </header>`}function _c(e){let{total:t,both_on:r}=e.automation,n=t>0&&r===t,s=e.running_sort==="repo"?"repo":"started",o=tr.find(l=>l.value===e.done_range)?.label||"",a=Array.isArray(e.token_total)?e.token_total:e.token_total?[{label:e.token_total,tooltip:e.token_tooltip}]:[];return i`<div class="mon-top">
    <button
      type="button"
      class="mon-auto-all${n?" is-active":""}"
      data-on=${n?"false":"true"}
      aria-pressed=${n?"true":"false"}
      ?disabled=${t===0}
      title=${n?"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4 (\uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4)":"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
    >
      ${n?oc():cc()}
      <span class="mon-auto-all__label"
        >${n?"\uC804\uCCB4 \uC790\uB3D9\uD654 \uBA48\uCDA4":`\uC804\uCCB4 \uC790\uB3D9\uD654 ${r}/${t}`}</span
      >
    </button>
    <div class="mon-kpi">
      <span
        class="mon-running-sort-group"
        role="group"
        aria-label="실행중 정렬"
      >
        <button
          type="button"
          class="mon-running-sort${s==="started"?" is-active":""}"
          data-sort="started"
          aria-pressed=${s==="started"?"true":"false"}
        >
          시작순
        </button>
        <span aria-hidden="true">|</span>
        <button
          type="button"
          class="mon-running-sort${s==="repo"?" is-active":""}"
          data-sort="repo"
          aria-pressed=${s==="repo"?"true":"false"}
        >
          레포순
        </button>
      </span>
      <span class="mon-kpi__chip mon-kpi__chip--running"
        >실행 <b>${e.counts.running}</b></span
      >
      <span class="mon-kpi__chip mon-kpi__chip--queue"
        >대기 <b>${e.counts.queue}</b></span
      >
      <span class="mon-kpi__chip mon-kpi__chip--pr"
        >PR <b>${e.counts.pr_wait}</b></span
      >
      <select
        class="mon-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${e.done_range}
      >
        ${tr.map(l=>i`<option
              value=${l.value}
              ?selected=${e.done_range===l.value}
            >
              ${l.label}
            </option>`)}
      </select>
      ${a.map(l=>i`<span
            class="mon-kpi__chip mon-kpi__chip--tokens"
            title=${l.tooltip}
            >${o} 완료 · 누적 ${l.label}</span
          >`)}
    </div>
  </div>`}function mc(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function gc(e){let t=(Array.isArray(e)?e:[]).map(l=>l&&l.usage).filter(l=>l&&typeof l=="object"&&"providers"in l);if(t.length>0)return bt(rs(t));let r={};for(let l of cr)r[l]=0;let n=!1,s=0,o=0,a=0;for(let l of Array.isArray(e)?e:[]){let c=l&&l.usage;if(c&&typeof c=="object"){let u=!1;for(let f of cr){let m=c[f];typeof m=="number"&&Number.isFinite(m)&&(r[f]+=m,n=!0,u=!0)}if(u){o+=1;let f=c.total_cost_usd;typeof f=="number"&&Number.isFinite(f)&&(s+=f,a+=1)}}}return o>0&&a===o&&(r.total_cost_usd=s),n?Ht(r):null}var hc="bdui.monitor.done-range",yc="bdui.monitor.running_sort";function m_(){try{let e=window.localStorage.getItem(hc);return Nt(e)?e:Lt}catch{return Lt}}function g_(e){try{window.localStorage.setItem(hc,e)}catch{}}function b_(){try{return window.localStorage.getItem(yc)==="repo"?"repo":"started"}catch{return"started"}}function h_(e){try{window.localStorage.setItem(yc,e)}catch{}}var vc="tab:monitor:pipeline",y_=1e3,v_=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}];function bc(e,t){let r=(e.lane==="runnable"||e.lane==="queue")&&e.draggable!==!1;return i`<div
    class="mon-card mon-card--${e.lane}${e.alert?" mon-card--alert":""}"
    draggable=${r?"true":"false"}
    data-issue-id=${e.id}
    data-root-dir=${e.root_dir}
    data-revision=${String(e.expected_revision)}
    data-lane=${e.lane}
    data-attempt-id=${e.attempt_id||""}
    data-place-index=${String(e.place_index??"")}
    data-queue-index=${String(e.queue_index??"")}
    data-queue-length=${String(e.queue_length??"")}
  >
    ${pc(e,t)}
  </div>`}function wc(e,t){let r=at("views:monitor"),n=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,l=t.switchWorkspace,c=t.now||(()=>Date.now()),u=t.confirm||(C=>typeof globalThis.confirm!="function"||globalThis.confirm(C)),f=m_(),m=b_();function b(){let C=tr.find(z=>z.value===f);return C?C.label:""}let E=document.createElement("div");E.className="mon",e.appendChild(E);let k=Jo(null,null),N=new Map,D=null,A=null;async function j(C,z,R,K,Z=!0){if(!o||!R)return null;let ce=await o(C,{...z,root_dir:R,expected_revision:K});if(ce&&ce.conflict&&Z){ce.queue&&N.set(R,ce.queue);let _e=ce.queue&&typeof ce.queue.revision=="number"?ce.queue.revision:K;ce=await o(C,{...z,root_dir:R,expected_revision:_e})}return ce&&ce.queue&&R&&N.set(R,ce.queue),ce}function ee(C,z){let R=N.get(C),K=s&&s.get?s.get():null,Z=(Array.isArray(K)?K:[]).find(_e=>_e?.root_dir===C);return(R||Z)?.merge_queue?.find(_e=>_e.bead_id===z)?.continuation_action}async function x(C,z,R,K){let Z=await j(C,z,R,K),ce=N.get(R)?.revision??Z?.queue?.revision??K;return lr(Z,(_e,$e)=>j(C,{...z,continuation:_e,decision_token:$e},R,ce,!1),{refresh:_e=>j(C,z,R,_e?.queue?.revision??N.get(R)?.revision??ce,!1)})}async function w(C,z,R,K){let Z=await lr({continuation_mismatch:K},(_e,$e)=>j("worker-merge-queue-add",{bead_id:z,continuation:_e,decision_token:$e},C,R,!1)),ce=Z?.queue?.merge_queue?.find(_e=>_e.bead_id===z)?.continuation_action;Z?.applied!==!0&&ce?.continuation===null&&ce.mismatch&&await w(C,z,Z.queue.revision,ce.mismatch)}async function S(C,z,R){let K=await j("worker-discard",C,z,R);if(K&&K.discarded===!0){ie(Ls(K),"success",5e3);return}if(K&&K.reason){ie(`\uD3D0\uAE30 \uC2E4\uD328: ${K.reason}`,"error");return}if(K&&K.accepted&&K.pending==="merged_revert"){ie("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(K&&K.accepted){ie(`\uD3D0\uAE30 \uC9C4\uD589: ${K.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}K&&!K.conflict&&ie("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function H(C,z,R){return!o||!R?null:await o(C,{...z,root_dir:R})}async function Y(C){if(!o||!C&&!u("\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB055\uB2C8\uB2E4. \uAC01 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uD568\uAED8 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?"))return;let z=await o("monitor-auto-toggle",{on:C}),R=z&&Array.isArray(z.failed)?z.failed:[];R.length>0&&ie(`\uC790\uB3D9\uD654 ${C?"\uCF1C\uAE30":"\uB044\uAE30"} \uC77C\uBD80 \uC2E4\uD328: ${R.map(K=>K.root_dir).join(", ")}`,"error",3200)}async function ge(){let C=new Map;for(let z of k.pr_wait)C.has(z.root_dir)||C.set(z.root_dir,z.expected_revision);for(let[z,R]of C)await j("worker-merge-queue-add-all",{},z,R)}let le=null,ne=!1,de=null;function De(){de!==null&&clearTimeout(de),de=setTimeout(()=>{de=null,ne=!1},0)}function Ue(C){let z=C.target;return typeof z?.closest=="function"?z.closest(".mon-group"):null}function Ge(C){let z=Ue(C);return!z||!le?null:(z.getAttribute("data-root-dir")||"")===le.root_dir?z:null}function ze(){for(let C of Array.from(E.querySelectorAll(".mon-group--drag-over")))C.classList.remove("mon-group--drag-over")}function Ze(C){let z=C.target,R=typeof z?.closest=="function"?z.closest('.mon-card[draggable="true"]'):null;if(R){le={bead_id:R.getAttribute("data-issue-id")||"",lane:R.getAttribute("data-lane")||"",root_dir:R.getAttribute("data-root-dir")||"",revision:Number(R.getAttribute("data-revision")||0)||0,queue_index:Number(R.getAttribute("data-queue-index")),queue_length:Number(R.getAttribute("data-queue-length")),place_index:Number(R.getAttribute("data-place-index"))},ne=!0;try{C.dataTransfer?.setData("text/plain",le.bead_id),C.dataTransfer&&(C.dataTransfer.effectAllowed="move")}catch{}}}function Fe(C){let z=Ge(C);z&&(C.preventDefault(),C.dataTransfer&&(C.dataTransfer.dropEffect="move"),z.classList.add("mon-group--drag-over"))}function we(C){Ue(C)?.classList.remove("mon-group--drag-over")}function ve(){le=null,ze(),De()}function xe(C){let z=Ge(C),R=le;if(le=null,ze(),!z||!R||!R.bead_id)return;C.preventDefault();let K=C.target,Z=typeof K?.closest=="function"?K.closest('.mon-card[data-lane="queue"]'):null,ce=Z&&z.contains(Z)?Number(Z.getAttribute("data-queue-index")):NaN;if(R.lane==="runnable"){let T=Number.isFinite(ce)?ce:R.place_index;if(!Number.isFinite(T))return;j("worker-queue-place",{bead_id:R.bead_id,index:T},R.root_dir,R.revision);return}if(R.lane!=="queue"||Z&&Z.getAttribute("data-issue-id")===R.bead_id)return;let _e=R.queue_index,$e=Number.isFinite(ce)?_e>ce?ce:ce-1:R.queue_length-1;!Number.isFinite($e)||$e<0||$e===_e||j("worker-queue-reorder",{bead_id:R.bead_id,to_index:$e},R.root_dir,R.revision)}function Re(C){let z={runnable:k.runnable,queue:k.queue,running:k.running,pr_wait:k.pr_wait,done:k.done};return i`${_c({automation:k.automation,counts:{running:k.running.length,queue:k.queue.length,pr_wait:k.pr_wait.length},running_sort:m,done_range:f,token_total:gc(k.done),token_tooltip:mc(b())})}
      <div class="worker-lanes mon-lanes">
        ${v_.map(R=>{let K=z[R.lane],Z=R.lane==="queue"?k.queue_groups.length>0?i`${k.queue_groups.map(ce=>i`<div
                        class="mon-group"
                        data-root-dir=${ce.root_dir}
                      >
                        ${fc(ce)}
                        <div class="mon-group__list">
                          ${ce.items.map(_e=>bc(_e,C))}
                        </div>
                      </div>`)}`:void 0:K.length>0?i`${K.map(ce=>bc(ce,C))}`:void 0;return Kt({id:`monitor-${R.lane}`,lane:R.pane,title:R.lane==="done"?`\uC644\uB8CC\xB7${b()}`:R.title,items:K,empty:R.empty,body:Z,live:R.lane==="running"&&K.length>0,header_control:R.lane==="pr_wait"&&K.length>0?i`<button
                    type="button"
                    class="mon-lane-op mon-merge-all"
                    title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
                  >
                    일괄 머지
                  </button>`:""})})}
      </div>`}function me(){let C=s&&s.get?s.get():null,z=s&&s.getWorkspacesState?s.getWorkspacesState():[],R=c();k=Jo(C,z,{done_since:Rr(f,R),running_sort:m}),je(Re(R),E)}function X(C,z){let R=a?a():void 0;if(!z||!R||z===R||!l){n(C);return}l(z).then(()=>{n(C)}).catch(K=>{r("workspace switch for %s failed: %o",z,K)})}function G(C){return{root_dir:C.getAttribute("data-root-dir")||"",revision:Number(C.getAttribute("data-revision")||0)||0}}function ke(C,z){let{root_dir:R,revision:K}=G(C),Z=C.getAttribute("data-issue-id")||"",ce=z.dataset.attemptId||C.getAttribute("data-attempt-id")||"",_e=z.classList;if(_e.contains("worker-card__place")){j("worker-queue-place",{bead_id:Z,index:Number(C.getAttribute("data-place-index")||0)||0},R,K);return}if(_e.contains("mon-op--up")||_e.contains("mon-op--down")){let $e=Number(C.getAttribute("data-queue-index")||0)||0,T=_e.contains("mon-op--up")?$e-1:$e+1;if(T<0)return;j("worker-queue-reorder",{bead_id:Z,to_index:T},R,K);return}if(_e.contains("mon-op--remove")){j("worker-queue-remove",{bead_id:Z},R,K);return}if(_e.contains("mon-op--pause")){H("worker-attempt-pause",{attempt_id:ce},R);return}if(_e.contains("mon-op--discard")){if(!u($n(Z,"unmerged")))return;S({bead_id:Z,...ce?{attempt_id:ce}:{},...z.dataset.operationId?{operation_id:z.dataset.operationId}:{}},R,K);return}if(_e.contains("mon-op--resume")){x("worker-attempt-resume",{attempt_id:ce},R,K);return}if(_e.contains("mon-op--dismiss")){j("worker-attempt-dismiss",{attempt_id:ce},R,K);return}if(_e.contains("worker-mini__merge")){let $e=ee(R,Z);$e?.mismatch&&$e.continuation===null?w(R,Z,K,$e.mismatch):j("worker-merge-queue-add",{bead_id:Z},R,K);return}if(_e.contains("worker-mini__merge-cancel")){j("worker-merge-queue-remove",{bead_id:Z},R,K);return}if(_e.contains("worker-mini__discard")){let $e=z.dataset.discardMode==="merged"?"merged":"unmerged";if(!u($n(Z,$e)))return;S({bead_id:Z,...ce?{attempt_id:ce}:{},...z.dataset.operationId?{operation_id:z.dataset.operationId}:{}},R,K);return}if(_e.contains("worker-mini__revise-fix")){x("worker-revise-fix",{bead_id:Z},R,K);return}_e.contains("worker-mini__revise-approve")&&j("worker-revise-approve",{bead_id:Z},R,K)}function fe(C){let z=ne;ne=!1;let R=C.target;if(!R||typeof R.closest!="function"||R.closest("dialog")||R.closest("a"))return;let K=R.closest(".mon-running-sort");if(K){C.preventDefault(),m=K.getAttribute("data-sort")==="repo"?"repo":"started",h_(m),me();return}let Z=R.closest(".mon-auto-all");if(Z){C.preventDefault(),Y(Z.getAttribute("data-on")==="true");return}if(R.closest(".mon-merge-all")){C.preventDefault(),ge();return}let _e=R.closest(".mon-ctl--advance");if(_e){C.preventDefault();let{root_dir:Q,revision:$}=G(_e);j("worker-automation-toggle",{on:_e.getAttribute("data-on")==="true"},Q,$);return}let $e=R.closest(".mon-ctl--merge-auto");if($e){C.preventDefault();let{root_dir:Q,revision:$}=G($e);j("worker-merge-auto-toggle",{on:$e.getAttribute("data-on")==="true"},Q,$);return}let T=R.closest(".mon-card");if(!T)return;let F=R.closest("button");if(F){C.preventDefault(),ke(T,F);return}let te=T.getAttribute("data-issue-id");te&&!z&&(C.preventDefault(),X(te,T.getAttribute("data-root-dir")||""))}function oe(C){let z=C.target;if(!z||typeof z.closest!="function")return;let R=z.closest(".mon-done-range");if(R){f=Nt(R.value)?R.value:Lt,g_(f),me();return}let K=z.closest(".mon-slots__input");if(!K)return;let{root_dir:Z,revision:ce}=G(K),_e=Number(K.value);if(!Number.isFinite(_e))return;let $e=Math.max(An,Math.floor(_e));j("worker-queue-set-slots",{slots:$e},Z,ce)}e.addEventListener("click",fe),e.addEventListener("change",oe),e.addEventListener("dragstart",Ze),e.addEventListener("dragover",Fe),e.addEventListener("dragleave",we),e.addEventListener("drop",xe),e.addEventListener("dragend",ve),s&&typeof s.subscribe=="function"&&(D=s.subscribe(()=>{try{N.clear(),me()}catch{}}));function U(){A!==null&&(clearInterval(A),A=null)}function B(){de!==null&&(clearTimeout(de),de=null)}return{load(){r("load"),me(),A===null&&(A=setInterval(()=>{try{me()}catch{}},y_))},pause(){U()},clear(){U(),B(),D&&(D(),D=null),e.removeEventListener("click",fe),e.removeEventListener("change",oe),e.removeEventListener("dragstart",Ze),e.removeEventListener("dragover",Fe),e.removeEventListener("dragleave",we),e.removeEventListener("drop",xe),e.removeEventListener("dragend",ve),e.replaceChildren()}}}function kc(e,t,r){let n=at("views:nav"),s=null;function o(c){return u=>{u.preventDefault(),n("click tab %s",c),r.gotoView(c)}}function a(){let c=t.getState(),u=c.view==="worker"||c.view==="monitor"?c.view:"board";return i`
      <div class="ctl-tabs" aria-label="Primary">
        <a
          href="#/board"
          class="ctl-tab ${u==="board"?"is-active":""}"
          @click=${o("board")}
          >Board</a
        >
        <a
          href="#/worker"
          class="ctl-tab ${u==="worker"?"is-active":""}"
          @click=${o("worker")}
          >Worker</a
        >
        <a
          href="#/monitor"
          class="ctl-tab ${u==="monitor"?"is-active":""}"
          @click=${o("monitor")}
          >Monitor</a
        >
      </div>
    `}function l(){je(a(),e)}return l(),s=t.subscribe(()=>l()),{destroy(){s&&(s(),s=null),je(i``,e)}}}var $c=["bug","feature","task","epic","chore"];function xc(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var Sc=["Critical","High","Medium","Low","Backlog"];function Ac(e,t){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,e.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),a=r.querySelector("#new-priority"),l=r.querySelector("#new-labels"),c=r.querySelector("#new-description"),u=r.querySelector("#new-issue-error"),f=r.querySelector("#btn-cancel"),m=r.querySelector("#btn-create"),b=r.querySelector(".new-issue__close");function E(){o.replaceChildren();let w=document.createElement("option");w.value="",w.textContent="\u2014 Select \u2014",o.appendChild(w);for(let S of $c){let H=document.createElement("option");H.value=S,H.textContent=xc(S),o.appendChild(H)}a.replaceChildren();for(let S=0;S<=4;S+=1){let H=document.createElement("option");H.value=String(S);let Y=Sc[S]||"Medium";H.textContent=`${S} \u2013 ${Y}`,a.appendChild(H)}}E();function k(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function N(w){s.disabled=w,o.disabled=w,a.disabled=w,l.disabled=w,c.disabled=w,f.disabled=w,m.disabled=w,m.textContent=w?"Creating\u2026":"Create"}function D(){u.textContent=""}function A(w){u.textContent=w}function j(){try{let w=window.localStorage.getItem("beads-ui.new.type");w?o.value=w:o.value="";let S=window.localStorage.getItem("beads-ui.new.priority");S&&/^\d$/.test(S)?a.value=S:a.value="2"}catch{o.value="",a.value="2"}}function ee(){let w=o.value||"",S=a.value||"";w.length>0&&window.localStorage.setItem("beads-ui.new.type",w),S.length>0&&window.localStorage.setItem("beads-ui.new.priority",S)}async function x(){D();let w=String(s.value||"").trim();if(w.length===0){A("Title is required"),s.focus();return}let S=Number(a.value||"2");if(!(S>=0&&S<=4)){A("Priority must be 0..4"),a.focus();return}let H=String(o.value||""),Y=String(c.value||""),ge={title:w};H.length>0&&(ge.type=H),String(S).length>0&&(ge.priority=S),Y.length>0&&(ge.description=Y),N(!0);try{await t("create-issue",ge)}catch{N(!1),A("Failed to create issue");return}ee(),N(!1),k()}return r.addEventListener("cancel",w=>{w.preventDefault(),k()}),b.addEventListener("click",()=>k()),f.addEventListener("click",()=>k()),r.addEventListener("keydown",w=>{w.key==="Enter"&&(w.ctrlKey||w.metaKey)&&(w.preventDefault(),x())}),n.addEventListener("submit",w=>{w.preventDefault(),x()}),{open(){n.reset(),D(),j();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){k()}}}var w_=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function k_(e,t){return lo(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function Ec(e,t,r){return i`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?i`<div class="settings-dialog__empty">라벨 없음</div>`:i`<div class="settings-dialog__pills">
            ${t.map(n=>{let s=k_(n,e);return i`<button
                type="button"
                class=${`settings-dialog__pill settings-dialog__pill--${s}`}
                data-label=${n}
                data-state=${s}
                @click=${()=>r(n)}
              >
                ${n}
              </button>`})}
          </div>`}
    </section>
  `}function Tc(e,t,r){return i`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">숨김 prefix</div>
      <div class="settings-dialog__prefixes">
        ${e.hidden_prefixes.map(n=>i`<span class="settings-dialog__prefix">
              ${n}
              <button
                type="button"
                class="settings-dialog__prefix-remove"
                aria-label=${`${n} \uADDC\uCE59 \uC81C\uAC70`}
                @click=${()=>r.onRemove(n)}
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
          @input=${n=>r.onDraft(String(n.target.value||""))}
        />
        <button
          type="button"
          class="settings-dialog__btn"
          @click=${r.onAdd}
        >
          추가
        </button>
      </div>
    </section>
  `}function Cc(e,t){return i`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${w_.map(([r,n])=>i`<label class="settings-dialog__toggle">
              <input
                type="checkbox"
                data-chip=${r}
                .checked=${e.chips[r]!==!1}
                @change=${()=>t(r)}
              />
              <span>${n}</span>
            </label>`)}
      </div>
    </section>
  `}var $_=[{id:"session",label:"\uC138\uC158",glyph:"\u25C6"},{id:"worker",label:"Worker",glyph:"\u25A4"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}],Zt="";function Xt(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Rc(e,t){let{transport:r,policyStore:n,labelOptions:s}=t,o=t.notify||($=>ie($,"error",4e3)),a=document.createElement("dialog");a.id="settings-dialog",a.className="settings-dialog",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","\uC124\uC815"),e.appendChild(a);let l="session",c=!1,u="",f={},m={},b=[],E=!1,k=null,N={},D="",A="",j=!1,ee=!1,x=!1,w=null;function S(){let $=t.queueStore?.get();return Xt($)?$.runner_catalog:null}function H(){let $=t.implPresetStore?.get();return Xt($)&&Array.isArray($.presets)?$:null}async function Y(){E=!0,Z();try{let $=await r("get-session-defaults",{});f=Xt($?.values)?{...$.values}:{},m={...f},b=Array.isArray($?.warnings)?$.warnings:[]}catch($){b=["kv_read_failed"],o(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${$ instanceof Error?$.message:String($)}`)}finally{E=!1,Z()}}async function ge(){let $=El(f,m);if(Object.keys($).length!==0){try{let M=await r("set-session-defaults",{values:$});f=Xt(M?.values)?{...M.values}:{},m={...f},b=Array.isArray(M?.warnings)?M.warnings:[]}catch(M){o(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${M instanceof Error?M.message:String(M)}`)}Z()}}function le($,M){M===Zt?delete m[$]:m[$]=M,Z(),ge()}async function ne(){let $=t.queueStore?.get();if(!Xt($))return;let M={orchestration_model:$.orchestration_model??null,orchestration_effort:$.orchestration_effort??null,orchestration_speed:$.orchestration_speed??null},V=Tl(M,{...M,...N});if(Object.keys(V).length!==0){try{let Ie=await r("worker-queue-set-orchestration-defaults",{expected_revision:$.revision,values:V});if(Ie&&Ie.applied===!1){o("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}N={}}catch(Ie){o(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${Ie instanceof Error?Ie.message:String(Ie)}`)}Z()}}function de($,M){N[$]=M===Zt?null:M,Z(),ne()}async function De($){let M=t.queueStore?.get();if(!(!Xt(M)||$<1)){try{await r("worker-queue-set-slots",{expected_revision:M.revision,slots:$})}catch(V){o(`slots \uC800\uC7A5 \uC2E4\uD328: ${V instanceof Error?V.message:String(V)}`)}Z()}}function Ue(){let $={};for(let M of xl){let V=m[M];typeof V=="string"&&V.length>0&&($[M]=V)}return $}async function Ge(){let $=H();if(!$)return;let M=Ue();if(Object.keys(M).length===0){o("\uC800\uC7A5\uD560 \uAD6C\uD604 \uAC12\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uAD6C\uD604 \uADF8\uB8F9\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let V=($.presets||[]).find(Ce=>Ce.id===D),Ie=A.trim()||(V?V.name:"");if(!Ie){o("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let Ce=V?await r("impl-preset-update",{expected_revision:$.revision,id:V.id,name:Ie,settings:M}):await r("impl-preset-create",{expected_revision:$.revision,name:Ie,settings:M});if(Ce&&Ce.applied){if(A="",!V&&Array.isArray(Ce.presets)){let Me=Ce.presets.find(Te=>Te.name===Ie);D=Me?Me.id:D}Z()}else o("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Z()}catch(Ce){o(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${Ce instanceof Error?Ce.message:String(Ce)}`)}}async function ze(){let $=H();if(!(!$||D.length===0))try{let M=await r("impl-preset-delete",{expected_revision:$.revision,id:D});M&&M.applied?(D="",Z()):(o("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Z())}catch(M){o(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${M instanceof Error?M.message:String(M)}`)}}async function Ze(){let $=H();if(!(!$||D.length===0)){try{let M=await r("apply-impl-preset-global",{preset_id:D,expected_revision:$.revision});M&&M.applied?(f=Xt(M.values)?{...M.values}:{},m={...f},b=Array.isArray(M.warnings)?M.warnings:[]):M&&M.conflict&&o("\uAD6C\uD604 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(M){o(`\uAD6C\uD604 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${M instanceof Error?M.message:String(M)}`)}Z()}}async function Fe(){ee=!0,x=!1,Z();try{let $=await r("get-worker-system-prompt",{});!$||typeof $!="object"||Array.isArray($)?x=!0:w=$}catch{x=!0}finally{ee=!1,Z()}}function we(){if(j=!j,j&&!w){Fe();return}Z()}function ve(){let $=Kr({loading:ee,error:x});if($)return $;if(!w)return"";let M=Array.isArray(w.variants)?w.variants:[];return i`<div class="settings-dialog__sp-body">
      ${w.target_base_placeholder?i`<div class="prompt-block__meta">
            \`${w.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${M.map(V=>i`<div class="settings-dialog__sp-variant" data-variant=${V.key}>
            <div class="settings-dialog__sp-cond">${V.condition}</div>
            ${fr(V.label,V.system_prompt)}
          </div>`)}
    </div>`}function xe(){return i`<section
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
        aria-expanded=${j?"true":"false"}
        @click=${we}
      >
        ${j?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${j?ve():""}
    </section>`}function Re($,M,V,Ie,Ce,Me){let Te=Ce[$]??Zt;return i`<select
      class=${Te===Zt?"settings-dialog__unset":""}
      data-key=${$}
      aria-label=${M}
      ?disabled=${Me===!0}
      .value=${Mr(String(Te))}
      @change=${et=>Ie($,String(et.target.value))}
    >
      <option value=${Zt} ?selected=${Te===Zt}>(기본)</option>
      ${V.map(et=>i`<option value=${et} ?selected=${et===Te}>
            ${et===Bt?"\uC790\uB3D9":et}
          </option>`)}
    </select>`}function me($,M,V,Ie,Ce,Me=!1){return i`<div
      class=${`settings-dialog__row${Me?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${M}</span>
      <span class="settings-dialog__controls">
        ${Re($,M,V,Ie,Ce,Me)}
      </span>
    </div>`}function X($,M,V,Ie,Ce){return i`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${M}-on)`}
        ></i>
        ${$}
      </span>
      <span class="settings-dialog__controls">
        ${Re(V,`${$} \uBAA8\uB378`,Ie,le,m,!1)}
        ${Re(Ce,`${$} effort`,$s,le,m,!1)}
      </span>
    </div>`}function G(){let $=S(),M=Al(m),V=m.impl_runtime,Ie=m.impl_model,Ce=H();return i`
      <section
        class=${`settings-dialog__pane${l==="session"?" settings-dialog__pane--active":""}`}
        role="tabpanel"
        id="settings-pane-session"
        aria-label="세션 기본값"
      >
        <header class="settings-dialog__pane-head"><h2>세션 기본값</h2></header>
        <p class="settings-dialog__pane-sub">
          모든 세션(터미널 대화형 포함)이 따르는 전역 기본값입니다. 이슈에 핀이
          있으면 핀이 우선합니다.
        </p>
        ${b.length>0?i`<div class="settings-dialog__banner" role="alert">
              워크스페이스 기본값을 일부 읽지 못했습니다 —
              ${b.join(", ")}
            </div>`:""}
        ${E?i`<div class="settings-dialog__empty">불러오는 중…</div>`:i`
              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">워크플로우</div>
                <div class="settings-dialog__row">
                  <span class="settings-dialog__row-label">모드</span>
                  <span class="settings-dialog__controls">
                    <span class="settings-dialog__seg" role="group">
                      <button
                        type="button"
                        data-mode=${Zt}
                        aria-pressed=${String(!m.workflow_mode)}
                        @click=${()=>le("workflow_mode",Zt)}
                      >
                        (기본)
                      </button>
                      ${ws.map(Me=>i`<button
                            type="button"
                            data-mode=${Me}
                            aria-pressed=${String(m.workflow_mode===Me)}
                            @click=${()=>le("workflow_mode",Me)}
                          >
                            ${Me}
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
                ${X("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",wn,"spec_review_effort")}
                ${X("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",ks,"plan_review_effort")}
                ${X("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",wn,"impl_review_effort")}
              </div>

              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">
                  구현
                  <span class="settings-dialog__hint"
                    >이슈 핀이 있으면 핀이 우선합니다</span
                  >
                </div>
                ${me("impl_dispatch","\uC2E4\uD589 \uBC29\uC2DD",ys,le,m)}
                ${me("impl_runtime","\uC704\uC784 \uB300\uC0C1",vs,le,m,M)}
                ${me("impl_model","\uBAA8\uB378",xs($,V),le,m,M)}
                ${me("impl_effort","effort",Zr($,V,Ie),le,m,M)}
                ${me("impl_speed","\uC18D\uB3C4",vn,le,m,M)}
              </div>

              <div class="settings-dialog__preset-bar">
                <select
                  aria-label="구현 프리셋"
                  .value=${Mr(D)}
                  @change=${Me=>{D=String(Me.target.value),Z()}}
                >
                  <option value="" ?selected=${D===""}>
                    구현 프리셋…
                  </option>
                  ${(Ce?.presets||[]).map(Me=>i`<option
                        value=${Me.id}
                        ?selected=${Me.id===D}
                      >
                        ${Me.name}
                      </option>`)}
                </select>
                <button
                  type="button"
                  class="settings-dialog__btn settings-dialog__btn--primary"
                  ?disabled=${D.length===0}
                  @click=${Ze}
                >
                  전역 기본값으로 적용
                </button>
                <input
                  type="text"
                  class="settings-dialog__preset-name"
                  placeholder=${D?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                  aria-label="프리셋 이름"
                  .value=${Mr(A)}
                  @input=${Me=>{A=String(Me.target.value)}}
                />
                <button
                  type="button"
                  class="settings-dialog__btn"
                  data-preset-save
                  @click=${Ge}
                >
                  ${D?"\uAC31\uC2E0":"\uC800\uC7A5"}
                </button>
                <button
                  type="button"
                  class="settings-dialog__btn"
                  data-preset-delete
                  ?disabled=${D.length===0}
                  @click=${ze}
                >
                  삭제
                </button>
              </div>
            `}
      </section>
    `}function ke(){let $=t.queueStore?.get(),M=S(),V={orchestration_model:N.orchestration_model??(Xt($)?$.orchestration_model:null),orchestration_effort:N.orchestration_effort??(Xt($)?$.orchestration_effort:null),orchestration_speed:N.orchestration_speed??(Xt($)?$.orchestration_speed:null)},Ie=Ss(M,k),Ce=Zr(M,k||void 0,V.orchestration_model||Bt).filter(Te=>Te!==Bt),Me=Xt($)&&typeof $.slots=="number"?$.slots:2;return i`
      <section
        class=${`settings-dialog__pane${l==="worker"?" settings-dialog__pane--active":""}`}
        role="tabpanel"
        id="settings-pane-worker"
        aria-label="Worker 설정"
      >
        <header class="settings-dialog__pane-head"><h2>Worker 설정</h2></header>
        <p class="settings-dialog__pane-sub">
          Worker가 세션을 띄울 때 쓰는 오케스트레이션 설정과 동시 실행 수입니다.
        </p>
        <div class="settings-dialog__group">
          <div class="settings-dialog__group-title">오케스트레이션</div>
          <div class="settings-dialog__row">
            <span class="settings-dialog__row-label">런타임</span>
            <span class="settings-dialog__controls">
              <select
                aria-label="런타임"
                data-key="orchestration_runtime_filter"
                .value=${Mr(k||Zt)}
                @change=${Te=>{let et=String(Te.target.value);k=et===Zt?null:et,Z()}}
              >
                <option value=${Zt} ?selected=${!k}>
                  전체
                </option>
                <option
                  value="claude"
                  ?selected=${k==="claude"}
                >
                  claude
                </option>
                <option
                  value="codex"
                  ?selected=${k==="codex"}
                >
                  codex
                </option>
              </select>
              <span class="settings-dialog__hint">모델 목록을 좁힙니다</span>
            </span>
          </div>
          ${me("orchestration_model","\uBAA8\uB378",Ie,de,V)}
          ${me("orchestration_effort","effort",Ce,de,V)}
          ${me("orchestration_speed","\uC18D\uB3C4",vn,de,V)}
        </div>
        <div class="settings-dialog__group">
          <div class="settings-dialog__group-title">동시 실행</div>
          <div class="settings-dialog__row">
            <span class="settings-dialog__row-label">slots</span>
            <span class="settings-dialog__controls">
              <span class="settings-dialog__stepper">
                <button
                  type="button"
                  aria-label="slots 감소"
                  @click=${()=>De(Me-1)}
                >
                  −
                </button>
                <span class="settings-dialog__stepper-value">${Me}</span>
                <button
                  type="button"
                  aria-label="slots 증가"
                  @click=${()=>De(Me+1)}
                >
                  +
                </button>
              </span>
            </span>
          </div>
        </div>
        ${xe()}
      </section>
    `}function fe(){let $=n.get();return i`
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
        ${$?i`
              ${Ec($,s(),C)}
              ${Tc($,u,{onDraft:M=>{u=M},onAdd:z,onRemove:R})}
              ${Cc($,K)}
            `:i`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function oe($){let M=n.get();if(M)try{let V=await r("display-policy-set",{expected_revision:M.revision,policy:$(M)});U(V),V&&V.conflict&&V.policy&&(V=await r("display-policy-set",{expected_revision:V.policy.revision,policy:$(V.policy)}),U(V)),V&&V.conflict&&o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function U($){$&&$.policy&&typeof $.policy=="object"&&n.set($.policy)}function B($){oe($)}function C($){let M=n.get();if(!M)return;let V=!x_($,M);B(Ie=>S_($,Ie,V))}function z(){let $=u.trim();$.length!==0&&(u="",B(M=>M.hidden_prefixes.includes($)?{hidden_prefixes:M.hidden_prefixes}:{hidden_prefixes:[...M.hidden_prefixes,$]}),Z())}function R($){B(M=>({hidden_prefixes:M.hidden_prefixes.filter(V=>V!==$)}))}function K($){let M=n.get();if(!M)return;let V=M.chips[$]===!1;B(()=>({chips:{[$]:V}}))}function Z(){je(i`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${$_.map($=>i`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${$.id}
                  aria-selected=${String(l===$.id)}
                  aria-controls=${`settings-pane-${$.id}`}
                  @click=${()=>ce($.id)}
                >
                  <span class="settings-dialog__glyph">${$.glyph}</span>
                  ${$.label}
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
            ${G()} ${ke()} ${fe()}
          </div>
        </div>
      `,a)}function ce($){l=$,Z()}let _e=()=>{c=!1,t.onOpenChange?.(!1)};a.addEventListener("close",_e),a.addEventListener("cancel",_e);let $e=$=>{$.target===a&&Q()};a.addEventListener("click",$e);let T=null;n.subscribe&&(T=n.subscribe(()=>{c&&Z()}));let F=null;t.implPresetStore?.subscribe&&(F=t.implPresetStore.subscribe(()=>{c&&Z()}));function te($="session"){c||(c=!0,t.onOpenChange?.(!0),l=$,u="",N={},Z(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),Y())}function Q(){c&&(c=!1,t.onOpenChange?.(!1),typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:te,close:Q,sessionDraft:()=>({...m}),destroy(){c=!1,a.removeEventListener("close",_e),a.removeEventListener("cancel",_e),a.removeEventListener("click",$e),T&&(T(),T=null),F&&(F(),F=null),a.remove()}}}function x_(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(r=>r.length>0&&e.startsWith(r))}function S_(e,t,r){if(!r)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let n=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:n,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:n}}var A_=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function Ic(e){return String(e).padStart(2,"0")}function E_(e,t){let r=Math.max(0,Math.ceil((e-t)/6e4)),n=Math.floor(r/1440),s=Math.floor(r%1440/60),o=r%60;return n>0?`${n}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function T_(e,t=Date.now()){let r=Date.parse(e);if(!Number.isFinite(r))return"";let n=new Date(r),s=new Date(t),o=`${Ic(n.getHours())}:${Ic(n.getMinutes())}`,l=n.getFullYear()===s.getFullYear()&&n.getMonth()===s.getMonth()&&n.getDate()===s.getDate()?o:`${A_[n.getMonth()]} ${n.getDate()} ${o}`;return`${E_(r,t)} \xB7 ${l}`}function C_(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}var Lc=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage"}];function Oc(e){let t=!1,r=null,n=new Map;function s(){je(i``,e),e.hidden=!0}function o(){let c=Lc.filter(f=>n.has(f.key));if(c.length===0){s();return}let u=Date.now();je(i`<div class="usage-meter" aria-label="Usage">
        ${c.map(f=>{let m=n.get(f.key),b=typeof m.ageSeconds=="number"&&m.ageSeconds>600,E=b?`${Math.floor(m.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"";return i`<span
            class="usage-meter__group${b?" usage-meter__group--stale":""}"
            aria-label=${`${f.label} usage`}
          >
            <span class="usage-meter__provider">${f.label}</span>
            ${m.windows.map(k=>{let N=typeof k.pct=="number"&&Number.isFinite(k.pct)?k.pct:0,D=Math.min(100,Math.max(0,N)),j=`resets ${T_(k.resetsAt,u)}${b?` \xB7 ${E}`:""}`;return i`<span
                class="usage-meter__window ${C_(D)}"
                style=${`--progress: ${D}%`}
                title=${j}
              >
                <span class="usage-meter__label">${k.key}</span>
                <span class="usage-meter__track" aria-hidden="true">
                  <span class="usage-meter__fill"></span>
                </span>
                <span class="usage-meter__pct">${D}%</span>
              </span>`})}
          </span>`})}
      </div>`,e),e.hidden=!1}async function a(c){try{let u=await fetch(c.endpoint);if(!u.ok)return null;let f=await u.json();return!f||f.available!==!0||!Array.isArray(f.windows)?null:f}catch{return null}}async function l(){let c=await Promise.all(Lc.map(async u=>({provider:u,payload:await a(u)})));if(!t){for(let u of c)u.payload?n.set(u.provider.key,u.payload):n.delete(u.provider.key);o()}}return s(),l(),r=setInterval(()=>{l()},6e4),{destroy(){t=!0,r!==null&&(clearInterval(r),r=null),s()}}}function Pc(e){let t=e.attempts?Object.values(e.attempts):[],r=new Map;for(let s of t)s&&r.set(s.bead_id,s.attempt_id);let n=new Map;for(let s of e.done||[])s&&typeof s.bead_id=="string"&&typeof s.added_at=="number"&&n.set(s.bead_id,s.added_at);return s=>{let o=r.get(s.bead_id)!==s.attempt_id,a=n.get(s.bead_id),l=typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at;return!o&&!l&&typeof s.dismissed_at!="number"}}var R_="worker-ineligible";function ra(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Dc(e){return ra(e).includes(R_)}var I_="worker-serial";function na(e){return ra(e).includes(I_)}function sa(e,t,r){if(typeof t!="string"||typeof r!="string")return[];let n=e?.runners;if(!n||!Object.hasOwn(n,t))return[];let s=n[t],o=s?.models;if(!o||!Object.hasOwn(o,r))return[];let a=o[r]?.efforts;return Array.isArray(a)?a.slice():Array.isArray(s.efforts)?s.efforts.slice():[]}var L_=new Set(["done","failed","orphaned","stopped","discarded"]);function Mc(e,t){let{queueStore:r,analysisStore:n,transport:s}=t,o=document.createElement("dialog");o.id="worker-parallel-analysis-dialog",o.className="pa",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),e.appendChild(o);let a=new Map,l=new Map,c=!1,u=null,f=null;function m(){return r&&r.get()||{revision:0,queue:[],serial_lanes:[],serial_lane_count:0,attempts:{},pr_wait:[]}}function b(){return n&&n.get()||{settings:{revision:0,runner:null,model:null,effort:null},job:null,last_good:null}}function E(){let T=m(),F=new Set;for(let te of Object.values(T.attempts||{})){let Q=te;Q&&typeof Q.bead_id=="string"&&!L_.has(Q.status)&&F.add(Q.bead_id)}for(let te of Array.isArray(T.pr_wait)?T.pr_wait:[])te&&typeof te.bead_id=="string"&&F.add(te.bead_id);for(let te of Object.values(T.discard_operations||{})){let Q=te;Q&&Q.phase!=="done"&&typeof Q.bead_id=="string"&&F.add(Q.bead_id)}return F}function k(T){return T.filter(F=>N(F)===null)}function N(T){let F=m();for(let te of Array.isArray(F.serial_lanes)?F.serial_lanes:[])if(Array.isArray(te?.entries)&&te.entries.some(Q=>Q.bead_id===T))return te.id;return(Array.isArray(F.queue)?F.queue:[]).some(te=>te.bead_id===T)?"parallel":null}function D(T,F){let te=a.get(T);return te||[...F.order]}function A(T){if(T.length<2)return!1;let F=N(T[0]);if(!F||F==="parallel")return!1;let te=m(),Q=(Array.isArray(te.serial_lanes)?te.serial_lanes:[]).find(M=>M.id===F)?.entries.map(M=>M.bead_id);if(!Array.isArray(Q))return!1;let $=T.map(M=>Q.indexOf(M));return $.every(M=>M>=0)&&$.every((M,V)=>V===0||M>$[V-1])}function j(){let T=m(),F=Array.isArray(T.serial_lanes)?T.serial_lanes:[],te=F.find(Q=>Array.isArray(Q.entries)&&Q.entries.length===0);return te?te.id:F[0]?.id||"s1"}function ee(T){let F=m().bead_titles||{};return typeof F[T]=="string"?F[T]:T}async function x(T,F){if(!s||c)return null;c=!0,C();try{return await s(T,F)}finally{c=!1,C()}}async function w(T){n?.setPending?.(!0);try{let F=await x("worker-parallel-analysis-start",{force:T});F&&F.applied===!1&&F.reason&&ie(`\uBD84\uC11D \uC2E4\uD328: ${F.reason}`,"error",2800)}finally{n?.setPending?.(!1)}}async function S(){let T=b().job;!s||!T||await s("worker-parallel-analysis-cancel",{job_id:T.job_id})}function H(){return m().runner_catalog}function Y(T){return Object.keys(H()?.runners?.[T]?.models||{})}function ge(T){let F=Y(T),te=H()?.runners?.[T]?.default_model;return typeof te=="string"&&F.includes(te)?te:F[0]||""}function le(){let T=b().settings,F=u||T.runner||"claude",te=Y(F),Q=u?ge(F):T.model||te[0]||"",$=sa(H(),F,Q),M=T.effort||"",V=$.includes(M)?M:$[0]||"";return{runner:F,model:Q,effort:V,models:te,efforts:$}}async function ne(T){let F=b().settings,te=await x("worker-parallel-analysis-settings-update",{expected_revision:F.revision,runner:T.runner,model:T.model,effort:T.effort});(!te||te.applied!==!0)&&(u=null,C(),te&&te.reason&&ie(`\uBD84\uC11D \uC124\uC815 \uAC70\uBD80: ${te.reason}`,"error",2800))}function de(T){u=T,C();let F=le();ne({runner:T,model:F.model,effort:F.effort})}function De(T){let F=le(),te=sa(H(),F.runner,T);ne({runner:F.runner,model:T,effort:te.includes(F.effort)?F.effort:te[0]||""})}function Ue(T){let F=le();ne({runner:F.runner,model:F.model,effort:T})}async function Ge(T,F){if(!s||c)return;let te=D(T,F),Q=b();if(te.length<2||!Q.last_good){ie("\uC81C\uCD9C\uD558\uB824\uBA74 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4","warning");return}let $=l.get(T)||j(),M=()=>({snapshot_digest:Q.last_good.identity_digest,group_index:T,lane:$,ordered_bead_ids:te,expected_revision:m().revision});c=!0,C();try{let V=await s("worker-parallel-analysis-submit",M());V&&V.queue&&r&&r.set(V.queue),V&&V.applied!==!0&&V.conflict===!0&&(V=await s("worker-parallel-analysis-submit",M()),V&&V.queue&&r&&r.set(V.queue)),V&&V.applied===!0?(a.delete(T),ie(`\uC9C1\uB82C \uB808\uC778 ${$}\uC5D0 ${te.length}\uAC1C \uBC30\uCE58`,"success")):ie(`\uC81C\uCD9C \uAC70\uBD80: ${V?.reason||"conflict"} (\uD050 \uBB34\uBCC0\uACBD)`,"error",2800)}finally{c=!1,C()}}function ze(T,F,te){a.set(T,D(T,F).filter(Q=>Q!==te)),C()}function Ze(T){a.delete(T),C()}function Fe(T,F,te,Q){let $=[...D(T,F)],M=$.indexOf(te),V=M+Q;M<0||V<0||V>=$.length||($.splice(V,0,...$.splice(M,1)),a.set(T,$),C())}function we(){let T=b().settings,F=Object.keys(H()?.runners||{}),te=le();return i`<div class="pa-settings">
      <label class="pa-settings__field"
        >러너
        <select
          class="pa-settings__runner"
          aria-label="분석 러너"
          @change=${Q=>de(Q.target.value)}
        >
          ${F.map(Q=>i`<option
                value=${Q}
                ?selected=${te.runner===Q}
              >
                ${Q}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >분석 모델
        <select
          class="pa-settings__model"
          aria-label="분석 모델"
          @change=${Q=>De(Q.target.value)}
        >
          ${te.models.map(Q=>i`<option
                value=${Q}
                ?selected=${te.model===Q}
              >
                ${Q}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >effort
        <select
          class="pa-settings__effort-select"
          aria-label="분석 effort"
          @change=${Q=>Ue(Q.target.value)}
        >
          ${te.efforts.map(Q=>i`<option
                value=${Q}
                ?selected=${te.effort===Q}
              >
                ${Q}
              </option>`)}
        </select>
      </label>
      ${ve(T)}
    </div>`}function ve(T){return!Re(T)||xe(T)?i`<span class="pa-settings__unset">분석 모델 설정 필요</span>`:T.compatible===!1?i`<span class="pa-settings__incompatible"
        >설정 비호환 — 저장된 ${T.runner}/${T.model} · effort
        ${T.effort} 을(를) 카탈로그가 더는 제공하지 않습니다</span
      >`:T.is_default===!0?i`<span class="pa-settings__default">기본값</span>`:""}function xe(T){return T.is_default===!0&&T.compatible===!1}function Re(T){return!!(T.runner&&T.model&&T.effort)}function me(T){return Re(T)&&T.compatible!==!1}function X(T){let F=Math.max(0,Math.floor(T/1e3)),te=Math.floor(F/60),Q=F%60;return`${te}:${String(Q).padStart(2,"0")}`}function G(T){let F=T.job;if(F){let te=typeof F.started_at=="number"?F.started_at:0,Q=`${F.runner||"?"}/${F.model||"?"}`,$=te?` \xB7 \uACBD\uACFC ${X(Date.now()-te)}`:"";return i`<span class="pa-meta__progress"
        >분석 중 — ${Q} · effort ${F.effort||"?"}${$}</span
      >`}return ke()?i`<span class="pa-meta__progress"
          >준비 중 — 대상과 아티팩트 수집 중</span
        >`:""}function ke(){return n?.isPending?.()===!0}function fe(T){let F=m(),te=(Array.isArray(F.queue)?F.queue.length:0)+(Array.isArray(F.serial_lanes)?F.serial_lanes:[]).reduce((V,Ie)=>V+(Array.isArray(Ie.entries)?Ie.entries.length:0),0),Q=!!T.job,$=me(T.settings),M=Q||c||ke();return i`<div class="pa-meta">
      <span class="pa-meta__targets">대상 ${te}</span>
      ${T.last_good?i`<span class="pa-meta__at"
            >분석 ${new Date(T.last_good.at||0).toLocaleString()}</span
          >`:i`<span class="pa-meta__at">분석 결과 없음</span>`}
      ${G(T)}
      <button
        type="button"
        class="pa-run"
        ?disabled=${!$||M}
        @click=${()=>{w(!1)}}
      >
        ✳ 분석
      </button>
      <button
        type="button"
        class="pa-rerun"
        ?disabled=${!$||M}
        @click=${()=>{w(!0)}}
      >
        재분석
      </button>
      <button
        type="button"
        class="pa-cancel"
        ?disabled=${!Q}
        @click=${()=>{S()}}
      >
        취소
      </button>
    </div>`}function oe(T,F){let te=D(T,F),Q=E(),$=te.filter(Te=>Q.has(Te)),M=k(te),V=A(te),Ie=Array.isArray(m().serial_lanes)?m().serial_lanes:[],Ce=l.get(T)||j(),Me=F.eligible!==!0||te.length<2||$.length>0||M.length>0||V||c;return i`<section class="pa-group" data-group-index=${String(T)}>
      <header class="pa-group__head">
        <span class="pa-group__confidence">${F.confidence}</span>
        ${F.categories.map(Te=>i`<span class="pa-group__category">${Te}</span>`)}
        ${V?i`<span class="pa-group__applied">✓ 이미 반영됨</span>`:""}
        ${F.eligible===!0?"":i`<span class="pa-group__weak">근거 부족 — 제출 불가</span>`}
        ${M.length>0?i`<span class="pa-group__stale"
              >stale — ${M.join(", ")} 대기 영역 이탈</span
            >`:""}
      </header>
      <p class="pa-group__reason">${F.reason}</p>
      <ol class="pa-group__members">
        ${te.map((Te,et)=>i`<li class="pa-member" data-bead-id=${Te}>
              <span class="pa-member__seq">${et+1}</span>
              <span class="pa-member__title">${ee(Te)}</span>
              ${Q.has(Te)?i`<span class="pa-member__active">실행 중</span>`:""}
              <button
                type="button"
                class="pa-member__up"
                data-bead-id=${Te}
                ?disabled=${et===0}
                aria-label=${`${Te} \uC704\uB85C`}
                @click=${()=>Fe(T,F,Te,-1)}
              >
                ↑
              </button>
              <button
                type="button"
                class="pa-member__down"
                data-bead-id=${Te}
                ?disabled=${et===te.length-1}
                aria-label=${`${Te} \uC544\uB798\uB85C`}
                @click=${()=>Fe(T,F,Te,1)}
              >
                ↓
              </button>
              <button
                type="button"
                class="pa-member__exclude"
                data-bead-id=${Te}
                aria-label=${`${Te} \uC81C\uC678`}
                @click=${()=>ze(T,F,Te)}
              >
                ✕
              </button>
            </li>`)}
      </ol>
      <ul class="pa-group__evidence">
        ${F.evidence.map(Te=>i`<li class="pa-evidence">
              <code>${Te.path}</code>
              <span class="pa-evidence__locator">${Te.locator}</span>
            </li>`)}
      </ul>
      <footer class="pa-group__foot">
        <button
          type="button"
          class="pa-group__restore"
          @click=${()=>Ze(T)}
        >
          제안으로 되돌리기
        </button>
        <label class="pa-group__lane-field"
          >제출
          <select
            class="pa-group__lane"
            aria-label="제출 대상 레인"
            @change=${Te=>{l.set(T,Te.target.value),C()}}
          >
            ${Ie.map((Te,et)=>i`<option
                  value=${Te.id}
                  ?selected=${Ce===Te.id}
                >
                  직렬 ${et+1}
                </option>`)}
          </select>
        </label>
        <button
          type="button"
          class="pa-group__submit"
          ?disabled=${Me}
          @click=${()=>{Ge(T,F)}}
        >
          제출
        </button>
      </footer>
    </section>`}function U(T){let F=Array.isArray(T.issues)?T.issues:[],te=F.filter($=>$.verdict==="parallel_ok").length,Q=F.filter($=>$.verdict==="uncertain").length;return i`<div class="pa-summary">
      <span>parallel_ok ${te}</span>
      <span>uncertain ${Q}</span>
    </div>`}function B(){let T=z&&!!b().job;if(T&&f===null){f=setInterval(()=>C(),1e3);return}!T&&f!==null&&(clearInterval(f),f=null)}function C(){let T=b();u&&T.settings.runner===u&&(u=null);let F=T.last_good?.result;B(),je(i`
        <div class="pa__container">
          <header class="pa__header">
            <div class="pa__title">병렬성 분석</div>
            <button
              type="button"
              class="pa__close"
              aria-label="닫기"
              @click=${$e}
            >
              ×
            </button>
          </header>
          <div class="pa__body">
            ${we()} ${fe(T)}
            ${F?i`${F.groups.map((te,Q)=>oe(Q,te))}
                ${F.groups.length===0?i`<p class="pa-empty">직렬 권장 그룹 없음</p>`:""}
                ${U(F)}`:i`<p class="pa-empty">
                  아직 분석 결과가 없습니다 — [✳ 분석]을 눌러 시작하세요
                </p>`}
          </div>
        </div>
      `,o)}let z=!1,R=()=>{z=!1,B()},K=T=>{T.target===T.currentTarget&&$e()};o.addEventListener("close",R),o.addEventListener("cancel",R),o.addEventListener("click",K);let Z=null;r&&r.subscribe&&(Z=r.subscribe(()=>{z&&C()}));let ce=null;n&&n.subscribe&&(ce=n.subscribe(()=>{z&&C()}));function _e(){z||(z=!0,C(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function $e(){z&&(z=!1,B(),typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:_e,close:$e,destroy(){z=!1,f!==null&&(clearInterval(f),f=null),o.removeEventListener("close",R),o.removeEventListener("cancel",R),o.removeEventListener("click",K),Z&&(Z(),Z=null),ce&&(ce(),ce=null),o.remove()}}}var Nc=new Set(["sh","bash","zsh","dash","ksh"]),Fc=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function qc(e){let t=e.split("/");return t[t.length-1]||""}function O_(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let r=t.slice(2).trim().split(/\s+/).filter(Boolean);if(r.length===0)return!1;let n=qc(r[0]);if(n!=="env")return Nc.has(n);let s=r.slice(1).find(o=>!o.startsWith("-")&&!o.includes("="));return s!==void 0&&Nc.has(qc(s))}function P_(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function D_(e){let t=[],r=0;Fc.lastIndex=0;for(let n of e.matchAll(Fc)){let s=n.index;s>r&&t.push({text:e.slice(r,s),kind:"plain"}),t.push({text:n[0],kind:P_(n[0])}),r=s+n[0].length}return r<e.length&&t.push({text:e.slice(r),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function M_(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function Bc(e){let t=e.getWorkspacePath,r=e.fetchImpl||globalThis.fetch?.bind(globalThis),n=document.createElement("div");n.className="repo-ops-script-viewer-root",document.body.appendChild(n);let s=null,o="loading",a="",l="",c=0,u=null,f=!1;function m(w,S){return S?D_(w).map(H=>H.kind==="plain"?H.text:i`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${H.kind}"
            >${H.text}</span
          >`):w}function b(){if(!s)return i``;let w=o==="ready"&&O_(a),S=o==="ready"?a.split(`
`):[];return i`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${s.path}`}
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
              ?disabled=${o!=="ready"}
              @click=${()=>{k()}}
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
          ${o==="loading"?i`<div class="repo-ops-script-viewer__status">
                스크립트 불러오는 중…
              </div>`:o==="error"?i`<div
                  class="repo-ops-script-viewer__status repo-ops-script-viewer__status--error"
                >
                  ${l}
                </div>`:i`<div class="repo-ops-script-viewer__code" tabindex="0">
                  ${S.map((H,Y)=>i`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${Y+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${m(H,w)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function E(){je(b(),n)}async function k(){if(o!=="ready")return;let w=await ir(a);ie(w?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",w?"success":"error")}function N(w){w.key==="Escape"&&s&&(w.preventDefault(),ee())}function D(){f||(document.addEventListener("keydown",N),f=!0)}function A(){f&&(document.removeEventListener("keydown",N),f=!1)}async function j(w,S=null){let H=++c;D(),s={...w},u=S||(document.activeElement instanceof HTMLElement?document.activeElement:null),o="loading",a="",l="",E(),n.querySelector(".repo-ops-script-viewer__close")?.focus();let ge=t?t():"";if(!ge){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",E();return}if(!r){o="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",E();return}let le="/api/repo-ops-script?workspace="+encodeURIComponent(ge)+"&lane="+encodeURIComponent(w.lane)+"&base_sha="+encodeURIComponent(w.base_sha);try{let ne=await r(le),de=await ne.json().catch(()=>({}));if(H!==c)return;if((t?t():"")!==ge){ee();return}if(!ne.ok||!de||de.ok!==!0){o="error",l=M_(de&&typeof de.error=="string"?de.error:""),E();return}s={lane:de.lane,base_sha:de.base_sha,path:de.path,base_ref:de.base_ref},a=String(de.content),o="ready",E()}catch{if(H!==c)return;o="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",E()}}function ee(){c+=1,A(),s=null,a="",E();let w=u;u=null,w?.isConnected&&w.focus()}function x(){ee(),n.remove()}return{open:j,close:ee,destroy:x}}function jc(e){let t=e.queueStore,r=e.transport,n=e.onChanged||(()=>{}),s=e.onOpenScript;function o(){return t&&t.get()||{}}function a(){let x=o();return typeof x.revision=="number"?x.revision:0}function l(x){t&&x&&x.queue&&typeof x.queue=="object"&&t.set(x.queue)}function c(){let x=o().workspace_info;return x&&typeof x=="object"?x:{}}function u(x,w){return i`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${x}"
      >${w}</span
    >`}function f(x){if(typeof x!="number"||!Number.isFinite(x))return"";let w=x/6e4;return Number.isInteger(w)?`timeout ${w}\uBD84`:`timeout ${Math.round(x/1e3)}\uCD08`}function m(x){let w=f(x);return w?u("config",w):""}function b(x,w,S){return i`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${S.script}
      @click=${H=>{s&&s({lane:x,base_sha:w.base_sha,path:S.script,base_ref:w.base_ref},H.currentTarget)}}
    ></button>`}function E(x){let w=typeof x.base_sha=="string"?x.base_sha:"",S=`${x.source_path||"repo-ops/config.toml"} @ ${x.base_ref||"?"}${w?`@${w.slice(0,7)}`:""}`;return i`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${S}</span>
      </p>
      <div class="worker-repo-ops__lane" data-lane="verify">
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${x.verify?i`${b("verify",x,x.verify)}
              ${m(x.verify.timeout_ms)}`:i`선언 없음${u("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${x.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
      </div>
      <div class="worker-repo-ops__lane" data-lane="deploy">
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${x.deploy?i`${b("deploy",x,x.deploy)}
              ${m(x.deploy.timeout_ms)}`:i`선언 없음${u("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${x.deploy?i`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
      </div>
    </section>`}function k(x){let w=x.repo_ops&&typeof x.repo_ops=="object"?x.repo_ops:null;return w&&(w.status==="resolved"||w.status==="absent")?E(w):w&&(w.status==="pending"||w.status==="error")?i`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${w.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":i`선언 읽기
              실패${w.error_code?i` — <code>${w.error_code}</code>`:""}`}
        </div>
      </section>`:i`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function N(x){if(!r)return;let w=await r("worker-auto-repair-toggle",{on:x,expected_revision:a()});if(l(w),w&&w.conflict){let S=await r("worker-auto-repair-toggle",{on:x,expected_revision:a()});l(S)}n()}let D={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function A(x,w,S){return i`<div class="worker-repo-ops__policy-group" data-policy=${S}>
      <div class="worker-repo-ops__policy-label">${x}</div>
      <ul class="worker-repo-ops__policy-list">
        ${w.map(H=>i`<li data-token=${H}>
              ${D[H]||H}
            </li>`)}
      </ul>
    </div>`}function j(x){return i`<div
      class="worker-repo-ops__policy-group"
      data-policy="resolution-ladder"
    >
      <div class="worker-repo-ops__policy-label">해결 사다리</div>
      <ol class="worker-repo-ops__policy-list">
        ${x.map(w=>{let S=[D[w.trigger]||w.trigger];return Number.isInteger(w.attempts_per_operation_attempt)?S.push(`operation\uB2F9 ${w.attempts_per_operation_attempt}\uD68C`):Number.isInteger(w.attempts)?S.push(`${D[w.budget]||w.budget} ${w.attempts}\uD68C`):Number.isInteger(w.sessions_per_user_action)&&S.push(`${w.sessions_per_user_action}\uD68C`,D[w.user_actions]||w.user_actions),w.applies_when&&S.push(D[w.applies_when]||w.applies_when),i`<li data-token=${w.id}>
            <strong>${D[w.id]||w.id}</strong>
            <span>${S.filter(Boolean).join(" \xB7 ")}</span>
          </li>`})}
      </ol>
    </div>`}function ee(){let x=o(),w=x.auto_repair!==!1,S=x.repo_operation_policy&&typeof x.repo_operation_policy=="object"?x.repo_operation_policy:null,H=Array.isArray(x.repo_operations)?x.repo_operations:[],Y=H.find(de=>de.state==="repairing"),ge=H.filter(de=>de.state==="failed"||de.state==="repairing"),le=ge.length?Math.min(...ge.map(de=>typeof de.repair?.remaining=="number"?de.repair.remaining:0)):S?.auto_repair?.resolution_ladder?.find(de=>de.id==="auto_repair_session")?.attempts??1,ne=Array.isArray(S?.auto_repair?.resolution_ladder)?S.auto_repair.resolution_ladder:[];return i`<section
      class="worker-repo-ops__repair"
      data-seam="auto-repair"
    >
      <p class="worker-repo-ops__vd-title">
        자동 해결
        <span class="worker-repo-ops__vd-ro"
          >자동화(대기열·머지)와 독립된 스위치</span
        >
      </p>
      <label class="worker-repo-ops__repair-toggle">
        <input
          type="checkbox"
          class="worker-repo-ops__repair-input"
          .checked=${w}
          @change=${de=>{N(de.target.checked)}}
        />
        검증·배포 실패를 자동으로 해결 시도
      </label>
      <div class="worker-repo-ops__repair-state">
        <span
          class="worker-repo-ops__repair-value"
          data-seam="auto-repair-value"
          >${w?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}</span
        >
        <span
          class="worker-repo-ops__repair-budget"
          data-seam="auto-repair-budget"
          >남은 자동 해결 ${le}회</span
        >
        <span
          class="worker-repo-ops__repair-session"
          data-seam="auto-repair-session"
          >${Y?`\uD574\uACB0 \uC138\uC158 \uC2E4\uD589 \uC911 \xB7 ${Y.repair?.owner_bead||Y.operation_id}`:"\uC2E4\uD589 \uC911\uC778 \uD574\uACB0 \uC138\uC158 \uC5C6\uC74C"}</span
        >
      </div>
      ${S?i`<details
            class="worker-repo-ops__policy"
            data-seam="policy-lists"
          >
            <summary>
              Worker 자동 처리 기준
              <span class="worker-repo-ops__policy-count"
                >자동 ${(S.worker_automatic||[]).length} · 해결 사다리
                ${ne.length} · 금지
                ${(S.never_automatic||[]).length}</span
              >
            </summary>
            ${A("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",S.worker_automatic||[],"worker-automatic")}
            ${S.supported===!1||S.schema_version!==2?i`<div
                  class="worker-repo-ops__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uD574\uACB0\uC774 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${S.schema_version})`}
                </div>`:j(ne)}
            ${A("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",S.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}return{template(){return i`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언 · 자동 해결
        </summary>
        ${k(c())} ${ee()}
      </details>`}}}var N_=20,Uc={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"},Wc={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8"};function F_(e,t,r=N_){let n=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||n.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||n.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return n.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),n.slice(0,Math.max(0,r))}function zc(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function q_(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"repairing":return"\uC790\uB3D9 \uD574\uACB0 \uC911";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function Hc(e){let t=e.filter(r=>r.value);return t.length===0?"":i`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(r=>i`<div>
            <dt>${r.term}</dt>
            <dd>${r.value}</dd>
          </div>`)}
    </dl>
  </details>`}function Gc(e,t="",r=!1){return!e&&!t?"":i`<p
    class="worker-ev__explain${r?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?i`<br />${t}`:""}
  </p>`}function B_(e){if(e.state!=="failed"||e.superseded_by)return"";let t=e.repair||{},r=typeof t.remaining=="number"?t.remaining:0,n=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"",s=r<=0;return i`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
      data-operation-id=${e.operation_id}
      data-failure-kind=${e.failure_kind||""}
      title="해결 세션을 엽니다"
    >
      ${Object.hasOwn(Wc,n)?Wc[n]:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC2DC\uC791"}
    </button>
    <span class="worker-ev__btn-sub"
      >${s?"\uC790\uB3D9 \uD574\uACB0\uC744 \uB2E4 \uC37C\uC2B5\uB2C8\uB2E4 \xB7 \uB20C\uB7EC\uC11C \uD574\uACB0 \uC138\uC158\uC744 \uC5FD\uB2C8\uB2E4":`\uC790\uB3D9 \uD574\uACB0 ${r}\uD68C\uAC00 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4`}</span
    >
    ${t.attempt_id?i`<button
          type="button"
          class="worker-ev__btn worker-repo-op__session"
          data-attempt-id=${t.attempt_id}
        >
          해결 세션 보기
        </button>`:""}
    ${e.dismissed?"":i`<button
          type="button"
          class="worker-ev__btn worker-repo-op__dismiss"
          data-operation-id=${e.operation_id}
          title="사람이 확인한 실패로 접수합니다 — 기록은 그대로 남고 해결 필요 집계에서만 빠집니다"
        >
          기록 닫기
        </button>`}
  </div>`}function j_(e){let t=e.operation,r=t.state==="failed",n=t.failure?t.failure.code:"";return i`<li
    class="worker-ev"
    data-operation-id=${t.operation_id}
    data-state=${t.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?mt(e.at):""}
      >${Is(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${zc(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(Uc,t.kind)?Uc[t.kind]:t.kind}</span
        >
        <span class="worker-ev__meta"
          >${t.target_base}@${Cs(t.target_sha)}${typeof t.elapsed_ms=="number"?` \xB7 ${Rs(t.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${zc(e)}"
          >${q_(e)}</span
        >
        ${t.dismissed?i`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${t.superseded_by?i`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
      </div>
      ${r?Gc(rc(t.failure_kind,n)):""}
      ${B_(t)}
      ${Hc([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?n:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${Cs(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function U_(e){let t=e.cleanup,r=Nr(t.step);return i`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?mt(e.at):""}
      >${Is(e.at)||"\u2014"}</span
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
        ${Xl(t.step).map(n=>i`<li
              class="worker-step worker-step--${n.state}"
              data-step=${n.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${n.label}</span>
            </li>`)}
      </ol>
      ${Gc(Ns(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
      <div class="worker-ev__acts">
        <button
          type="button"
          class="worker-ev__btn worker-ev__btn--warn worker-cleanup__resume"
          data-bead-id=${t.bead_id}
        >
          정리 재개${r?` \u2014 ${r} \uB2E8\uACC4\uBD80\uD130`:""}
        </button>
        ${t.repair_eligible?i`<button
              type="button"
              class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
              data-operation-id=${`cleanup:${t.bead_id}`}
              data-failure-kind=${t.failure_code||t.reason||""}
            >
              실패 해결 세션 시작
            </button>`:""}
      </div>
      ${Hc([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function W_(e){return i`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
    ${e.events.length===0?i`<div class="worker-repo-drawer__empty">기록 없음</div>`:i`<ul class="worker-rail">
          ${e.events.map(t=>t.type==="cleanup"?U_(t):j_(t))}
        </ul>`}
  </section>`}function Vc(e,t={}){let r=null;function n(){je(r?W_(r):i``,e)}e.addEventListener("click",a=>{a.target?.closest?.('[data-seam="repo-ops-close"]')&&o()});function s(a){r={events:F_(a.operations,a.cleanup_failures),repo:a.repo||""},n()}function o(){r!==null&&(r=null,n(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>r!==null,refresh(a){r&&s(a)}}}var z_="tab:worker:ready",H_="tab:worker:blocked",G_="tab:worker:in-progress",V_="tab:worker:closed",qs=1,Yc=5;function Kc(e){return yn(e).path.length>0}var Qc="beads-ui.worker.candidate-filter",oa={show_blocked:!1,spec:"all"};function Y_(){try{let e=window.localStorage.getItem(Qc);if(!e)return{...oa};let t=JSON.parse(e);if(!t||typeof t!="object")return{...oa};let r=t.spec;return{show_blocked:t.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...oa}}}function K_(e){try{window.localStorage.setItem(Qc,JSON.stringify(e))}catch{}}function Z_(e,t){let r=l=>t.show_blocked||!l.blocked,n=l=>t.spec==="all"||(t.spec==="with"?l.has_spec:!l.has_spec),s=[],o=0,a=0;for(let l of e){let c=r(l),u=n(l);c&&u?s.push(l):!c&&u?o+=1:c&&!u&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var X_=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Jc="bdui.worker.candidate_sort",Q_=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],Bs="spec";function J_(){try{let e=window.localStorage.getItem(Jc);return e==="board"||e==="created"||e==="spec"?e:Bs}catch{return Bs}}function em(e){try{window.localStorage.setItem(Jc,e)}catch{}}var ed="bdui.worker.done-range";function tm(){try{let e=window.localStorage.getItem(ed);return Nt(e)?e:Lt}catch{return Lt}}function rm(e){try{window.localStorage.setItem(ed,e)}catch{}}var nm="(max-width: 640px)",td="beads-ui.worker.lane-collapsed",Cn={queue:!0,done:!0};function sm(){try{let e=window.localStorage.getItem(td);if(!e)return{...Cn};let t=JSON.parse(e);return!t||typeof t!="object"?{...Cn}:{queue:typeof t.queue=="boolean"?t.queue:Cn.queue,done:typeof t.done=="boolean"?t.done:Cn.done}}catch{return{...Cn}}}function om(e){try{window.localStorage.setItem(td,JSON.stringify(e))}catch{}}function Zc(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let r=typeof t.title=="string"?t.title:t.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function am(e,t,r){let n=Array.isArray(e)?e.slice():[];return t==="created"?n.sort(Lr):(n.sort(Hn(r)),t==="board"?n:[...n.filter(Kc),...n.filter(s=>!Kc(s))])}function im(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function lm(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function cm(e){let t=e?.blocked_info;if(t&&typeof t=="object"){let s=Array.isArray(t.blockers)?t.blockers.filter(o=>typeof o=="string"&&o.length>0):[];return s.length>0?`\u{1F512} ${s.join(", ")}`:"\u{1F512} blocked"}let n=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(s=>{if(typeof s=="string")return s;if(!s||typeof s!="object")return"";let o=s.type??s.dependency_type;return o!==void 0&&o!=="blocks"?"":s.depends_on_id||s.id||""}).filter(Boolean);return n.length>0?`\u{1F512} ${n.join(", ")}`:"\u{1F512} blocked"}function Xc(e){switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function dm(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function um(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"implementation review \uB300\uAE30",live:!1,alert:!1};case"reviewing":return{badge:"implementation review \uC911",live:!0,alert:!1};case"revising":return{badge:"review \uC218\uC815 \uC911 \xB7 1\uD68C",live:!0,alert:!1};case"failed":{let r=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:r.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${r.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",live:!1,alert:!0}}default:return null}}function aa(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function pm(e){if(!e||typeof e!="object")return null;let t=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,n=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,s=n&&typeof n.pr_number=="number"?n.pr_number:null,o="";switch(e.phase){case"gating":o="root \uC7AC\uAC80\uC99D \uC911";break;case"repairing":o=e.subject_role==="root"?`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 \uC6D0 PR \uC218\uC815 \uC911`:`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 repair PR \uC900\uBE44 \uC911`;break;case"waiting_repair_pr":o=s?`repair PR #${s} \uB300\uAE30`:"repair PR \uB300\uAE30";break;case"merging":o=e.subject_role==="repair"?s?`repair PR #${s} \uBA38\uC9C0 \uC911`:"repair PR \uBA38\uC9C0 \uC911":"root \uBA38\uC9C0 \uC911";break;case"cleaning":o="\uC815\uB9AC \uBCF5\uAD6C \uC911";break;case"paused":o="\uC790\uB3D9\uBCF5\uAD6C \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":o=`\uC0AC\uB78C \uD655\uC778 \uD544\uC694 \xB7 ${e.terminal_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`;break;case"completed":return null;default:return null}let a=[o,`\uBCF5\uAD6C \uC138\uC158 ${t}/${r}`];return e.head_sha&&a.push(`head ${e.head_sha}`),e.base_sha&&a.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&a.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`),e.active_attempt_id&&a.push(`attempt ${e.active_attempt_id}`),n&&typeof n.bead_id=="string"&&a.push(`repair ${n.bead_id}`),e.evidence&&a.push(e.evidence),e.log_path&&a.push(e.log_path),{badge:o,title:a.join(`
`),alert:e.phase==="needs_human",lock_actions:e.phase!=="paused"&&e.phase!=="needs_human",repair_pr_url:n&&typeof n.pr_url=="string"?n.pr_url:"",repair_pr_number:s}}function fm(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",r=(n,s={})=>{let o=[s.title||"",t].filter(Boolean);return{label:n,title:o.join(`
`),live:s.live===!0,alert:s.alert===!0}};return e.continuation_required?r("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0}):e.merge_step?e.gate?.tier==="merged"?r("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):r("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0}):e.conflict_badge?r(e.conflict_badge,{live:e.conflict_live===!0}):e.head_review&&e.head_review.state!=="failed"?r("\uB9AC\uBDF0 \uC9C4\uD589 \uC911",{title:e.head_review.badge,live:e.head_review.live===!0}):e.recovery?.lock_actions?r("\uC790\uB3D9\uBCF5\uAD6C \uC911",{title:e.recovery.title,live:!0}):e.cleanup_failed?r(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0}):e.base_exception?r("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0}):e.conflicting?r("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0}):e.gate?.reason==="base_behind"?r("base \uAC31\uC2E0 \uD544\uC694",{alert:!0}):e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale"?r("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{alert:!0}):e.gate?.reason==="spec_id_missing"?r("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0}):e.gate?.reason==="review_receipt_invalid"?r("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0}):e.head_review?.state==="failed"?r("\uB9AC\uBDF0 \uC2E4\uD328",{title:e.head_review.failure_reason||"",alert:!0}):e.recovery?r(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?r("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?r(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${Xc(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?r(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${Xc(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?r(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?r("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?r("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?r("\uB2EB\uD798",{alert:!0}):e.activity?r("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?r("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?r("\uD655\uC778 \uC911"):e.gate?.gate_badge?r(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function _m(e,t,r,n,s=null,o=null,a=null,l=!1,c=null,u=!0,f=null,m=null,b=null,E={},k=!1,N=!1,D={}){let A=!!c&&c.position>0,j=!!c?.continuation_action&&c.continuation_action.continuation===null,ee=!!c&&c.active===!0,x=c&&c.failure||null,w=r[e]||null,S=w&&w.gate?w.gate:null,H=w&&w.pr?w.pr:null,Y=pm(b),ge=dm(c?c.resolution:null),le=um(c?c.head_review:null),ne=c&&c.head_review||null,de=c&&c.authority||null,De=!!ne&&["pending","reviewing","revising"].includes(ne.state),Ue=A&&!ee&&(ne?.state==="failed"||!de||de.source==="automatic"&&!N),Ge=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":ge?ge.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":null,ze=!!S&&S.base_badge==="\uCDA9\uB3CC",Ze=!!S&&S.enabled===!0,Fe=Ds({bead_id:e,merge_sha:D.merge_sha,cleanup_cursor:D.cleanup_cursor,merge_progress:o&&o.merge_progress?o.merge_progress:null,cleanup_failed:n,repo_operations:D.repo_operations}),we=Ms(Fe),ve=!!n&&["child_sweep","branch_cleanup","parent_close"].includes(n.step)&&!!S&&S.tier==="merged",xe=l&&!!n&&!!S&&S.tier==="merged",Re=Ue&&(Ze||ze||S?.reason==="base_behind"||S?.reason==="review_receipt_missing"||S?.reason==="review_receipt_stale"||ve||xe),me=l&&ze&&u===!1,X=sr(E,e,{external:l,merge_active:ee||Fe?.step==="merge",merge_queued:A,conflict_active:!!a,cleanup_active:we,merged:!!n||S?.tier==="merged"}),G=!!X.operation,ke=!ve&&!!n&&n.step==="repo_operations",fe=fm({continuation_required:j,merge_step:Fe,conflict_badge:Ge,conflict_live:ge?.live===!0||a==="running",head_review:ne&&le?{...le,state:ne.state,failure_reason:ne.failure_reason}:null,recovery:Y,cleanup_failed:n,cleanup_label:n?Nr(n.step):null,base_exception:m,conflicting:ze,gate:S,queue_failure:x,auto_skip:f,queued:A,queue_active:ee,queue_position:c?c.position:0,activity:Ge?null:o&&o.activity||null}),oe=fe?.live===!0&&fe.title?i`<span title=${fe.title}>${fe.label}</span>`:fe?.label||null;return{id:e,title:l?i`${t}<span class="muted"> · 세션</span>`:t,reason:n&&Fe?.active!==!0?Ps(n.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:k,external:l,pr_number:H&&typeof H.number=="number"?H.number:null,pr_url:H&&typeof H.url=="string"?H.url:"",completion_badge:fe?.live!==!0&&fe?.title?fe.label:null,completion_title:fe?.title||"",completion_repair_pr_url:Y?Y.repair_pr_url:"",completion_repair_pr_number:Y?Y.repair_pr_number:null,badges:oe?[oe]:[],live_badge:fe?.live===!0?oe:null,usage:s,alert:fe?.alert===!0,merge_action:S?.tier==="merged"&&!ve&&!xe||ke?!1:!A||j||Ue,timeline_action:ke,cancel_action:A&&!j,cancel_enabled:(!ee||De)&&!(Y&&Y.lock_actions),cancel_title:Y&&Y.lock_actions?"\uC790\uB3D9\uBCF5\uAD6C \uC911 \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694":ee&&!De?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":De?"review \uC9C4\uD589\uC744 \uCDE8\uC18C\uD558\uACE0 \uBA38\uC9C0 \uAD8C\uD55C\uC744 \uD3D0\uAE30\uD569\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:X,discard_action:X.action,merge_step:Fe,discard_enabled:X.enabled,discard_title:X.title,merge_enabled:!Fe&&!a&&!G&&!m&&!(Y&&Y.lock_actions)&&!me&&!ke&&(Ze||ze||S?.reason==="base_behind"||S?.reason==="review_receipt_missing"||S?.reason==="review_receipt_stale"||ve||xe||Re),merge_label:j?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":ve||xe?"\uC815\uB9AC \uC7AC\uAC1C":ze&&!Fe&&!ve?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":S?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":S?.reason==="review_receipt_missing"||S?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":Ue?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:G?X.error?`\uD3D0\uAE30 \uC2E4\uD328: ${X.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${X.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:j?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Fe?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${Fe.label}`:xe?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":me?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":ve?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":ze?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":S?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":S?.reason==="review_receipt_missing"||S?.reason==="review_receipt_stale"?"\uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":S?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":Ze?`\uBA38\uC9C0 (${S.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:S&&S.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${S&&S.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function ia(e,t={}){let{transport:r,issueStores:n,queueStore:s,analysisStore:o,sessionLogStore:a,uiOrderStore:l,gotoIssue:c,getWorkspacePath:u,doneRange:f,onDoneRangeChange:m}=t,b=n?Vn(n,l):null,E=Kn({transport:r,uiOrderStore:l}),k=null,N=[],D=Y_(),A=J_(),j=Nt(f)?f:tm(),ee=new Map;function x(){let p=tr.find(v=>v.value===j);return p?p.label:"\uC624\uB298"}let w=sm(),S=!1,H=new Set,Y=new Set,ge=new Set,le=new Set,ne=[],de=document.createElement("div");de.className="worker-console";let De=document.createElement("div");De.className="worker-top";let Ue=document.createElement("div");Ue.className="worker-drawer-overlay",Ue.hidden=!0;let Ge=document.createElement("div");Ge.className="worker-drawer-overlay__backdrop";let ze=document.createElement("div");ze.className="worker-drawer-host";let Ze=document.createElement("div");Ze.className="worker-drawer-host",Ze.hidden=!0,Ue.append(Ge,ze,Ze);let Fe=document.createElement("div");Fe.className="worker-lanes-host",de.append(De,Ue,Fe),e.appendChild(de);let we=null,ve=gs(ze,{transport:r,sessionLogStore:a,onClose:()=>{we=null,Ue.hidden=!0,se()}}),xe=Vc(Ze,{onClose:()=>{Ze.hidden=!0,Ue.hidden=!0,se()}}),Re=Bc({getWorkspacePath:u||(()=>"")}),me=u&&u()||"",X=jc({queueStore:s,transport:r,onChanged:()=>se(),onOpenScript:(p,v)=>{Re.open(p,v)}}),G=o?Mc(de,{queueStore:s,analysisStore:o,transport:r}):null;function ke(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:qs,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function fe(){let p=ke();return typeof p.revision=="number"?p.revision:0}function oe(p){p&&p.queue&&s&&s.set(p.queue)}function U(){let p=ke().queue;return Array.isArray(p)?p.length:0}async function B(p,v,L){if(!r)return;let ae=()=>({bead_id:p,...v==="parallel"?{}:{lane:v},index:L,expected_revision:fe()}),q=await r("worker-queue-place",ae());oe(q),q&&q.conflict&&await r("worker-queue-place",ae()).then(oe)}async function C(p,v,L){if(!r)return;let ae=()=>({bead_id:p,...v==="parallel"?{}:{lane:v},to_index:L,expected_revision:fe()}),q=await r("worker-queue-reorder",ae());oe(q),q&&q.conflict&&await r("worker-queue-reorder",ae()).then(oe)}async function z(p){if(!r)return;let v=await r("worker-queue-remove",{bead_id:p,expected_revision:fe()});oe(v),v&&v.conflict&&await r("worker-queue-remove",{bead_id:p,expected_revision:fe()}).then(oe)}async function R(p){if(!r||!p)return;let v=await r("worker-attempt-pause",{attempt_id:p});v&&v.paused===!1&&v.reason&&ie(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${v.reason}`,"error",2400)}async function K(p){if(!r||!p)return;let v=async(ae={})=>await r("worker-attempt-resume",{attempt_id:p,expected_revision:fe(),...ae}),L=await v();oe(L),L&&L.conflict&&(L=await r("worker-attempt-resume",{attempt_id:p,expected_revision:fe()}),oe(L)),L=await lr(L,(ae,q)=>v({continuation:ae,decision_token:q}),{onResult:oe,refresh:()=>v()}),L&&L.resumed===!1&&!L.conflict&&L.reason&&ie(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${L.reason}`,"error",2400)}async function Z(p){if(!r||!p)return;let v=await r("worker-attempt-dismiss",{attempt_id:p,expected_revision:fe()});oe(v),v&&v.conflict&&(v=await r("worker-attempt-dismiss",{attempt_id:p,expected_revision:fe()}),oe(v)),v&&v.dismissed===!1&&!v.conflict&&v.reason&&ie(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${v.reason}`,"error",2400)}async function ce(p,v,L=!0){if(!r)return null;let ae=r,q=await ae(p,{...v,expected_revision:fe()});return oe(q),q&&q.conflict&&L&&(q=await ae(p,{...v,expected_revision:fe()}),oe(q)),q}async function _e(p){if(!r||!p)return;let v=ke().merge_queue?.find(ae=>ae.bead_id===p)?.continuation_action;if(v?.mismatch&&v.continuation===null){await T(p,v.mismatch);return}H.add(p),se();let L;try{L=await ce("worker-merge-queue-add",{bead_id:p})}finally{H.delete(p),se()}!L||L.conflict||L.applied||ie("\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)","error",2400)}async function $e(p){if(!(!r||!p||Y.has(p))){Y.add(p),se();try{let v=await r("worker-cleanup-retry",{bead_id:p,expected_revision:fe()});oe(v),v&&!v.retried&&!v.conflict&&v.reason&&ie(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${v.reason}`,"error",2400)}finally{Y.delete(p),se()}}}async function T(p,v){let L=await lr({continuation_mismatch:v},(q,y)=>ce("worker-merge-queue-add",{bead_id:p,continuation:q,decision_token:y},!1)),ae=L?.queue?.merge_queue?.find(q=>q.bead_id===p)?.continuation_action;if(L?.applied!==!0&&ae?.continuation===null&&ae.mismatch){await T(p,ae.mismatch);return}L&&L.applied===!1&&!L.conflict&&ie("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function F(p){if(!r)return;let v=await ce("worker-merge-auto-toggle",{on:p});!v||v.conflict||ie(p?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",p?"success":"info",2400)}async function te(p){if(!r||!p)return;let v=await ce("worker-merge-queue-remove",{bead_id:p});v&&!v.conflict&&!v.applied&&v.reason==="merge_active"&&ie("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function Q(){await ce("worker-merge-queue-remove",{all:!0})}async function $(p,v=null,L="unmerged",ae=null){if(!r||!p)return;let q=$n(p,L);if(!(!!ae||typeof globalThis.confirm!="function"||globalThis.confirm(q)))return;let I=await r("worker-discard",{bead_id:p,...v?{attempt_id:v}:{},...ae?{operation_id:ae}:{},expected_revision:fe()});if(oe(I),I&&I.conflict&&(I=await r("worker-discard",{bead_id:p,...v?{attempt_id:v}:{},...ae?{operation_id:ae}:{},expected_revision:fe()}),oe(I)),I&&I.discarded===!0){ie(Ls(I),"success",5e3);return}if(I&&I.reason){ie(`\uD3D0\uAE30 \uC2E4\uD328: ${I.reason}`,"error",2800);return}if(I&&I.accepted&&I.pending==="merged_revert"){ie("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(I&&I.accepted&&!I.discarded){ie(`\uD3D0\uAE30 \uC9C4\uD589: ${I.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}I&&!I.conflict&&ie("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function M(p,v,L){if(!(!r||!v||!L||le.has(v))){le.add(v),se();try{let ae=await r(p,{bead_id:v,action_id:L,expected_revision:fe()});oe(ae),ae?.conflict?ie("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!ae?.ok&&ae?.reason&&ie(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(ae.reason)}`,"error",2800)}finally{le.delete(v),se()}}}async function V(p,v){if(!r||!v||ge.has(v))return;ge.add(v),se();let L;try{let ae=async(q={})=>await r(p,{bead_id:v,expected_revision:fe(),...q});L=await ae(),oe(L),L&&L.conflict&&(L=await r(p,{bead_id:v,expected_revision:fe()}),oe(L)),p==="worker-revise-fix"&&(L=await lr(L,(q,y)=>ae({continuation:q,decision_token:y}),{onResult:oe,refresh:()=>ae()}))}finally{ge.delete(v),se()}if(!(!L||L.conflict)){if(L.ok){ie(p==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}ie(`\uCC98\uBD84 \uAC70\uBD80: ${L.reason||""}`,"error",3e3)}}async function Ie(p){if(!r)return;let v=await r("worker-automation-toggle",{on:p,expected_revision:fe()});oe(v),v&&v.conflict&&await r("worker-automation-toggle",{on:p,expected_revision:fe()}).then(oe)}async function Ce(p){if(!r||!p)return;let v=await r("worker-repo-operation-repair",{operation_id:p});if(oe(v),v&&v.ok===!1){ie(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${v.reason||""}`,"error",3e3);return}v&&v.ok===!0&&ie("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function Me(p){if(!r||!p)return;let v=await r("worker-repo-operation-dismiss",{operation_id:p});oe(v),v&&v.ok===!1&&ie(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${v.reason||""}`,"error",3e3)}async function Te(p){if(!r||!Number.isFinite(p))return;let v=Math.max(qs,Math.floor(p)),L=await r("worker-queue-set-slots",{slots:v,expected_revision:fe()});oe(L),L&&L.conflict&&await r("worker-queue-set-slots",{slots:v,expected_revision:fe()}).then(oe)}async function et(p){if(!r||!Number.isInteger(p)||p<1||p>Yc)return;let v=ke(),L=(Array.isArray(v.serial_lanes)?v.serial_lanes:[]).slice(p).reduce((y,I)=>y+(Array.isArray(I?.entries)?I.entries.length:0),0),ae=()=>({count:p,expected_revision:fe()}),q=await r("worker-queue-set-serial-lane-count",ae());oe(q),q&&q.conflict&&(q=await r("worker-queue-set-serial-lane-count",ae()),oe(q)),q&&q.applied&&L>0&&ie(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${L}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}function ht(){let p=ke(),v=b?b.selectBoardColumn(z_,"ready"):[],L=b?b.selectBoardColumn(H_,"blocked"):[],ae=b?b.selectBoardColumn(V_,"closed"):[],q=b?b.selectBoardColumn(G_,"in_progress"):[],y=new Map;for(let g of q){let O=lm(g);if(!O)continue;let pe=y.get(O);pe?pe.push(g):y.set(O,[g])}let I=g=>{let O=Yn(y.get(g)||[]);return O?O.title||O.id:null},re=p.bead_titles||{},Ee=new Map;for(let[g,O]of Object.entries(re))typeof O=="string"&&O.length>0&&Ee.set(g,O);for(let g of[...v,...L])Ee.set(g.id,g.title||g.id);let Je=p.bead_times&&typeof p.bead_times=="object"&&!Array.isArray(p.bead_times)?p.bead_times:{},qe=p.bead_labels&&typeof p.bead_labels=="object"&&!Array.isArray(p.bead_labels)?p.bead_labels:{},Ke=new Map;for(let[g,O]of Object.entries(qe))Array.isArray(O)&&Ke.set(g,na(O));for(let g of[...v,...L]){let O=g.labels;Array.isArray(O)&&!Ke.has(g.id)&&Ke.set(g.id,na(O))}let Se=new Map,d=o?.get()?.last_good?.result?.groups;for(let g of Array.isArray(d)?d:[]){if(g?.eligible!==!0||!Array.isArray(g.members))continue;let O=g.members.map(He=>{let dt=(Array.isArray(p.serial_lanes)?p.serial_lanes:[]).find(It=>It.entries.some(ut=>ut.bead_id===He));return dt?dt.id:null});if(!(O.every(He=>He!==null)&&new Set(O).size===1))for(let He of g.members)Se.set(He,g.members.filter(dt=>dt!==He))}let _=p.bead_blocked_by&&typeof p.bead_blocked_by=="object"&&!Array.isArray(p.bead_blocked_by)?p.bead_blocked_by:{},h=new Map;for(let[g,O]of Object.entries(Je))O&&typeof O=="object"&&h.set(g,O);for(let g of[...v,...L])h.set(g.id,{created_at:g.created_at,updated_at:g.updated_at});let P=g=>h.get(g)||{},ue=p.pr_wait||[],ye=p.pr_observations||{},Ne=p.pr_activity||{},Be=p.cleanup_failed||{},ft=Object.entries(Be).map(([g,O])=>({bead_id:g,step:O&&O.step?O.step:"",reason:O&&O.reason?O.reason:"",at:O&&typeof O.at=="number"?O.at:null,detail:O&&typeof O.detail=="string"?O.detail:null,output_tail:O&&typeof O.output_tail=="string"&&O.output_tail?O.output_tail:void 0,log_path:O&&typeof O.log_path=="string"&&O.log_path?O.log_path:void 0,retry_count:O&&typeof O.retry_count=="number"&&Number.isInteger(O.retry_count)&&O.retry_count>0?O.retry_count:0,failure_code:O&&typeof O.failure_code=="string"?O.failure_code:void 0,subject_id:O&&typeof O.subject_id=="string"?O.subject_id:void 0,repair_eligible:!!(O&&O.repair_eligible),repair:O&&O.repair?O.repair:void 0})),er=p.queue||[],Le=new Set([...er.map(g=>g.bead_id),...(Array.isArray(p.serial_lanes)?p.serial_lanes:[]).flatMap(g=>(Array.isArray(g?.entries)?g.entries:[]).map(O=>O.bead_id)),...ue.map(g=>g.bead_id),...p.done.map(g=>g.bead_id)]),ct=new Set(L.map(g=>g.id)),Qr=l?l.get()?.order||{}:{},ua=new Set,pa=[];for(let g of[...v,...L])Le.has(g.id)||ua.has(g.id)||im(g)||Dc(g.labels)||(ua.add(g.id),pa.push(g));N=am(pa,A,Qr);let _d=p.admission||{},fa=g=>{let O=_d[g];if(!O)return"";if(O.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let pe=typeof O.reason=="string"?O.reason:"",He=pe.indexOf(":");return He>0&&He<pe.length-1?`\u26D4 ${pe.slice(0,He)} (${pe.slice(He+1)})`:`\u26D4 ${pe}`},md=N.map(g=>{let O=yn(g),pe=O.path.length>0,He=g.workflow?.route==="quick_fix"||g.metadata&&g.metadata.route==="quick_fix",dt=!He&&pe&&!O.conflict,It=ct.has(g.id),ut=[];It&&ut.push(cm(g)),He?ut.push("quick_fix \xB7 \uC6CC\uCEE4 \uBE44\uB300\uC0C1"):O.conflict?ut.push("spec_id_conflict"):pe||ut.push("spec \uC5C6\uC74C");let nt=fa(g.id);return nt&&ut.push(nt),{id:g.id,title:g.title||g.id,reason:ut.join(" \xB7 "),draggable:dt,lane:"candidate",created_at:g.created_at,updated_at:g.updated_at,workflow:g.workflow,is_quick_fix:He,status:g.status,blocked:It,has_spec:pe}}),js=Z_(md,D),gd=js.visible,bd=p.revise_parked||{},Rn=p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},Us=(g,O)=>g.map((pe,He)=>{let dt=O!=="done",It=O!=="done"&&O!=="queue",ut=dt?bd[pe.bead_id]:null,nt=dt?sr(Rn,pe.bead_id):null,Mn=nt?.operation?nt:null,Rd=dt&&Ke.get(pe.bead_id)===!0,Na=_[pe.bead_id]||[],Ys=p.admission&&typeof p.admission=="object"?p.admission[pe.bead_id]:null,Ks=dt?Kl(Ys,!!Mn||le.has(pe.bead_id)):null,Id=dt&&!Ks?fa(pe.bead_id):null,Ld=dt?[Id]:[],Fa=dt&&Na.length>0&&typeof Ys?.reason=="string"&&Ys.reason.startsWith("not_ready")?[`\u23F8 ${Na.join(", ")} \uC644\uB8CC \uB300\uAE30 (blocks)`]:[],Zs=dt?Se.get(pe.bead_id):void 0;return Zs&&Zs.length>0&&Fa.push(`\u2733 serial \uAD8C\uC7A5 \xB7 ${Zs.join(", ")}\uC640`),{id:pe.bead_id,title:Ee.get(pe.bead_id)||pe.bead_id,reason:Ld.filter(Boolean).join(" \xB7 "),draggable:dt&&!Mn&&!Ks,done:O==="done",lane:O,seq:It?He+1:void 0,worker_serial:Rd,discard:Mn,stale_work:Ks,badges:[...Fa,...ut?["\u23F8 REVISE \uD30C\uD0B9"]:[]],alert:!!ut,revise_action:!!ut,revise_enabled:!!ut&&!Mn&&!ge.has(pe.bead_id),revise_title:ut?ut.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${ut.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:O==="done"?Ft(p.attempts||{},pe.bead_id):null,work_ms:O==="done"?Vl(p.attempts||{},pe.bead_id):null,done_at:O==="done"&&typeof pe.added_at=="number"?pe.added_at:void 0,...P(pe.bead_id)}}),qr=p.attempts?Object.values(p.attempts):[],Ws=new Set;for(let g of qr)g&&typeof g.resumed_from=="string"&&g.resumed_from.length>0&&Ws.add(g.resumed_from);let _a=new Map;for(let g of qr)_a.set(g.bead_id,g.attempt_id);let zs=new Map;for(let g of qr)zs.set(g.attempt_id,g);function Hs(g){let O=new Set,pe=g;for(;pe&&!O.has(pe.attempt_id);){if(pe.conflict_resolution===!0)return!0;O.add(pe.attempt_id),pe=typeof pe.resumed_from=="string"&&pe.resumed_from.length>0&&zs.get(pe.resumed_from)||null}return!1}let In=typeof p.declared_base=="string"?p.declared_base:null;function hd(g){let O=null;for(let pe of qr)!pe||pe.bead_id!==g||Hs(pe)||(O===null||(typeof pe.started_at=="number"?pe.started_at:0)>=(typeof O.started_at=="number"?O.started_at:0))&&(O=pe);return O&&typeof O.target_base=="string"?O.target_base:null}let ma=[],ga=[],yd=Pc(p),ba=g=>{let O=typeof g.session_id=="string"&&g.session_id.length>0,pe=Ws.has(g.attempt_id);return{eligible:O&&!pe,reason:O?pe?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},Wt=null;for(let g of qr){let O=g.status==="paused"&&!Ws.has(g.attempt_id);if(g.status==="running"||O)ga.push({bead_id:g.bead_id,attempt_id:g.attempt_id,title:Ee.get(g.bead_id)||g.bead_id,runner:g.runner||null,model:g.model||null,effort:g.effort||null,speed:g.speed||null,continuation_mode:g.continuation_mode||null,started_at:typeof g.started_at=="number"?g.started_at:null,resumed_from:g.resumed_from||null,paused:O,conflict_resolution:Hs(g),base_exception:aa(In,g.target_base),can_pause:typeof g.session_id=="string"&&g.session_id.length>0,discard:sr(Rn,g.bead_id,{attempt_id:g.attempt_id}),usage:Ft(p.attempts||{},g.bead_id),current_child:I(g.bead_id),...P(g.bead_id)});else if((g.status==="failed"||g.status==="orphaned")&&yd(g)){let pe=ba(g);ma.push({bead_id:g.bead_id,attempt_id:g.attempt_id,title:Ee.get(g.bead_id)||g.bead_id,runner:g.runner||null,model:g.model||null,effort:g.effort||null,speed:g.speed||null,continuation_mode:g.continuation_mode||null,started_at:typeof g.started_at=="number"?g.started_at:null,resumed_from:g.resumed_from||null,failed:!0,status:g.status,status_label:g.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:sr(Rn,g.bead_id,{attempt_id:g.attempt_id}),resume_eligible:pe.eligible,resume_reason:pe.reason,conflict_resolution:Hs(g),base_exception:aa(In,g.target_base),usage:Ft(p.attempts||{},g.bead_id),current_child:I(g.bead_id),...P(g.bead_id)}),Wt=g}}let Ln=[...ma,...ga],ha=null;if(Wt){let g=ba(Wt),O=Wt.cause_detail;ha={bead_id:Wt.bead_id,repo:Wt.repo||"",reason:Wt.cause||Wt.status,cause_detail:O&&typeof O.reason=="string"?{reason:O.reason,command:typeof O.command=="string"?O.command:null}:null,resume_attempt_id:Wt.attempt_id,resume_eligible:g.eligible,resume_reason:g.reason,discard:sr(Rn,Wt.bead_id,{attempt_id:Wt.attempt_id})}}let ya=new Set(Ln.map(g=>g.bead_id)),Gs=Array.isArray(p.merge_queue)?p.merge_queue:[],va=new Map,wa=new Map,ka=new Map,$a=new Map,xa=new Map;Gs.forEach((g,O)=>{g&&typeof g.bead_id=="string"&&(va.set(g.bead_id,O+1),wa.set(g.bead_id,g.resolution),ka.set(g.bead_id,g.continuation_action||null),$a.set(g.bead_id,g.head_review||null),xa.set(g.bead_id,g.authority||null))});let Sa=p.merge_queue_state||{active:null,failures:{}},vd=Sa.failures||{},wd=p.auto_merge_skips||{},Aa=g=>{let O=wd[g];if(!O)return null;let pe=ye[g],He=pe&&pe.pr?pe.pr.head_sha:null;return He&&He===O.head_sha?O.reason||"":null},On=new Map;for(let g of Ln)g.failed!==!0&&g.conflict_resolution&&(g.paused?On.has(g.bead_id)||On.set(g.bead_id,"paused"):On.set(g.bead_id,"running"));let Ea=Ln.filter(g=>!g.paused&&g.failed!==!0).length,Ta=(p.workspace_info||{}).slots,Ca=typeof Ta=="number"?Ta:typeof p.slots=="number"?p.slots:qs,kd=Ea>Ca,Pn=Rr(j),$d=(Array.isArray(p.done)?p.done.slice():[]).filter(g=>Pn===void 0||typeof g.added_at!="number"||g.added_at>=Pn).sort((g,O)=>(O.added_at||0)-(g.added_at||0)),Jr=Us($d,"done"),xd=new Set((Array.isArray(p.done)?p.done:[]).map(g=>g?.bead_id).filter(g=>typeof g=="string")),Ra=[],Sd=u?.()||"";for(let g of ae){let O=Or(g.closed_at);if(typeof g.id!="string"||xd.has(g.id)||O===null||Pn!==void 0&&O<Pn||typeof g.comment_count!="number"||g.comment_count<=0)continue;let pe=`${Sd}\0${g.id}\0${String(g.updated_at)}\0${g.comment_count}`,He=ee.get(pe);He===void 0&&r&&(ee.set(pe,"pending"),Promise.resolve(r("get-comments",{id:g.id})).then(dt=>{let It=Array.isArray(dt)&&dt.some(ut=>bs(typeof ut?.text=="string"?ut.text:"")?.lane==="session");ee.set(pe,It?"session":"not-session"),se()}).catch(()=>{ee.set(pe,"failed"),se()})),He==="session"&&Ra.push({id:g.id,title:g.title||g.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:null,done_at:O,created_at:g.created_at,updated_at:g.updated_at})}Jr.push(...Ra),Jr.sort((g,O)=>(O.done_at||0)-(g.done_at||0));let Dn={};for(let g of cr)Dn[g]=0;let Ia=!1,La=0,Vs=0,Oa=0;for(let g of Jr){let O=g.usage;if(O&&typeof O=="object"){let pe=!1;for(let He of cr)Number.isFinite(O[He])&&(Dn[He]+=O[He],Ia=!0,pe=!0);pe&&(Vs+=1,Number.isFinite(O.total_cost_usd)&&(La+=O.total_cost_usd,Oa+=1))}}Vs>0&&Oa===Vs&&(Dn.total_cost_usd=La);let Pa=Jr.map(g=>g.usage).filter(g=>g&&typeof g=="object"&&g.providers),Ad=Pa.length>0?bt(rs(Pa)):Ia?Ht(Dn):null,Ed=p.lane_states&&typeof p.lane_states=="object"&&!Array.isArray(p.lane_states)?p.lane_states:{},Td=Array.isArray(p.serial_lanes)?p.serial_lanes:[],Da=g=>{if(ue.some(He=>He.bead_id===g))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let O=qr.filter(He=>He&&He.bead_id===g),pe=O.length>0?O[O.length-1].status:null;return pe==="failed"||pe==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":pe==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},Ma=Td.filter(g=>g&&typeof g.id=="string"&&Array.isArray(g.entries)).map((g,O)=>{let pe=Ed[g.id]||{},He=new Map((Array.isArray(pe.corrections)?pe.corrections:[]).filter(nt=>nt&&typeof nt.bead_id=="string"&&typeof nt.after=="string").map(nt=>[nt.bead_id,nt.after])),dt=Us(g.entries.filter(nt=>!ya.has(nt.bead_id)),g.id).map(nt=>He.has(nt.id)?{...nt,badges:[`\u{1F517} ${He.get(nt.id)} \uB4A4 (blocks \uC790\uB3D9)`,...nt.badges]}:nt),It=Array.isArray(pe.occupied_by)?pe.occupied_by.filter(nt=>typeof nt=="string"):[],ut=It.map(nt=>({id:nt,title:Ee.get(nt)||nt,draggable:!1,lane:g.id,ghost:!0,badges:[Da(nt)]}));return{id:g.id,index:O+1,rows:[...ut,...dt],occupied:It.length>0,badge:It.length>0?Da(It[0]):"\uB300\uAE30",cycle:pe.cycle===!0}}),Cd=typeof p.serial_lane_count=="number"?p.serial_lane_count:Ma.length;return{queue:p,idToTitle:Ee,candidates:gd,candidate_hidden:{blocked:js.hidden_blocked,spec:js.hidden_spec},running:Ln,live_count:Ea,slots:Ca,over_cap:kd,failure:ha,waiting:Us(er.filter(g=>!ya.has(g.bead_id)),"queue"),serial_lanes:Ma,serial_lane_count:Cd,pr_wait:ue.map(g=>_m(g.bead_id,Ee.get(g.bead_id)||g.bead_id,ye,Be[g.bead_id]||null,Ft(p.attempts||{},g.bead_id),Ne[g.bead_id]||(H.has(g.bead_id)||Y.has(g.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),On.get(g.bead_id)||null,g.external===!0,{position:va.get(g.bead_id)||0,active:Sa.active===g.bead_id,failure:vd[g.bead_id]||null,resolution:wa.get(g.bead_id),continuation_action:ka.get(g.bead_id),head_review:$a.get(g.bead_id)||null,authority:xa.get(g.bead_id)||null},g.wt_present!==!1,p.auto_merge===!0?Aa(g.bead_id):null,aa(In,hd(g.bead_id)),p.completion_status&&typeof p.completion_status=="object"&&!Array.isArray(p.completion_status)&&p.completion_status[g.bead_id]||null,p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},zs.get(_a.get(g.bead_id)||"")?.worker_serial===!0,p.auto_merge===!0,{merge_sha:g.merge_sha,cleanup_cursor:g.cleanup_cursor,repo_operations:Array.isArray(p.repo_operations)?p.repo_operations:[]})).map(g=>({...g,...P(g.id)})),merge_queue_length:Gs.length,merge_queue_running:Gs.length>0,auto_excluded:ue.map(g=>g.bead_id).filter(g=>Aa(g)!==null),declared_base:In,done:Jr,token_total:Ad,cleanup_failures:ft,repo_operations:Array.isArray(p.repo_operations)?p.repo_operations:[]}}function yt(){let v=!!o?.get()?.job,L=!v&&o?.isPending?.()===!0,ae=v?"\uBD84\uC11D \uC911":L?"\uC900\uBE44 \uC911":"";return i`<button
      type="button"
      class=${ae?"worker-analysis-btn worker-analysis-btn--running":"worker-analysis-btn"}
      aria-busy=${ae?"true":"false"}
      title="대기 이슈의 병렬 실행 가능성을 분석해 직렬 그룹을 제안합니다 (클릭할 때만 실행)"
    >
      ✳ 병렬성
      분석${ae?i`<span class="worker-analysis-btn__badge">${ae}</span>`:""}
    </button>`}function ot(p){let v=p.waiting.length>0?p.waiting[0].id:"\u2014",L=i`<button
      type="button"
      class="worker-play${p.queue.auto_advance?" is-active":""}"
    >
      ${p.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,ae=J(p),q=p.over_cap?i`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",y=i`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${p.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${p.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${x()} 완료 <b>${p.done.length}</b></span
      >`,I=i`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${p.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${p.declared_base||"?"}</span
    >`,re=i`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${qs}
          step="1"
          .value=${String(p.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:Yc},(qe,Ke)=>Ke+1).map(qe=>i`<option
                value=${String(qe)}
                ?selected=${p.serial_lane_count===qe}
              >
                ${qe}
              </option>`)}
        </select>
      </label>
      ${o?yt():""} `,Ee=sc({failure:p.failure}),Je=Yl(p.repo_operations,p.cleanup_failures);return S?i`<div class="worker-ribbon">
          ${L} ${ae}
          <div class="worker-kpi worker-kpi--ribbon">${q}${y}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${re}</div>
          <div class="worker-kpi">${I}</div>
        </div>
        ${Je}${X.template()}${Ee}`:i`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${L}${ae}${re}</div>
        <div class="worker-kpi">
          ${q}${y}${I}
          ${(Array.isArray(p.token_total)?p.token_total:p.token_total?[{label:p.token_total,tooltip:`${x()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(qe=>i`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${qe.tooltip}
                >${x()} 완료 · 누적 ${qe.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${v}</b></span
          >
        </div>
      </div>
      ${Je}${X.template()}${Ee}`}function $t(p){if(p.running.length===0&&p.pr_wait.length===0)return"";let v=p.running.some(L=>!L.paused&&L.failed!==!0);return i`<section
      class="worker-now${v?" worker-pane--live":""}"
      id="worker-now"
    >
      <header class="worker-now__hd">
        <span
          class="worker-pane__dot worker-pane__dot--running"
          aria-hidden="true"
        ></span>
        <span class="worker-now__title">지금</span>
        <span class="worker-now__count"
          >${p.running.length+p.pr_wait.length}</span
        >
      </header>
      ${p.running.length>0?Zo(p.running,Date.now(),we):""}
      ${p.pr_wait.map(L=>zo(L))}
    </section>`}function it(p){let v=p.candidate_hidden;return i`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${D.show_blocked}
        />
        🔒 blocked${v.blocked>0?` ${v.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${X_.map(L=>i`<button
              type="button"
              class="worker-filter__chip${D.spec===L.value?" is-active":""}"
              data-spec=${L.value}
              aria-pressed=${D.spec===L.value?"true":"false"}
            >
              ${L.label}
            </button>`)}
        ${v.spec>0?i`<span class="worker-filter__hidden">숨김 ${v.spec}</span>`:""}
      </div>
    </div>`}function st(){return i`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${A}
    >
      ${Q_.map(p=>i`<option value=${p.value} ?selected=${A===p.value}>
            ${p.label}
          </option>`)}
    </select>`}function pt(){return i`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${j}
      >
        ${tr.map(p=>i`<option value=${p.value} ?selected=${j===p.value}>
              ${p.label}
            </option>`)}
      </select>
    </div>`}function W(p){let v=i`<span
      class="worker-lane__badge${p.occupied?" worker-lane__badge--held":""}"
      >${p.badge}</span
    >`,L=p.cycle?i`<div class="worker-lane__cycle">
          ⚠ blocks 순환 감지 — 자동 정렬을 생략했습니다
        </div>`:"";return Kt({id:`worker-pane-lane-${p.id}`,lane:p.id,title:`\uC9C1\uB82C ${p.index}`,items:p.rows,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:v,controls:L})}function J(p){let v=p.queue.auto_merge===!0;if(p.merge_queue_running)return i`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${v?" is-active":""}"
        title=${v?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${v?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${p.merge_queue_length}
      </button>`;if(v)return i`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let L=new Set(p.auto_excluded),ae=p.pr_wait.filter(q=>q.merge_action&&q.merge_enabled&&!L.has(q.id)).length;return i`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${ae>0?` ${ae}`:""}
    </button>`}function be(p){let v=Kt({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:p.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:st(),controls:it(p)});return S?i`<div class="worker-lanes worker-lanes--mobile">
        ${$t(p)}
        ${Kt({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:p.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:w.queue,preview:Zc(p.waiting)})}
        ${p.serial_lanes.map(L=>W(L))}
        ${v}
        ${Kt({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:p.done,empty:`${x()} \uC644\uB8CC \uC5C6\uC74C`,controls:pt(),collapsible:!0,collapsed:w.done,preview:Array.isArray(p.token_total)?p.token_total.map(L=>L.label).join(" \xB7 "):p.token_total||Zc(p.done)})}
      </div>`:i`<div class="worker-lanes">
      ${v}
      <div class="worker-wait">
        ${Kt({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:p.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
        ${p.serial_lanes.map(L=>W(L))}
      </div>
      ${Kt({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${p.slots}`,items:p.running,live:p.running.some(L=>!L.paused&&L.failed!==!0),body:Zo(p.running,Date.now(),we)})}
      ${Kt({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:p.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${Kt({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${x()} ${p.done.length}`,items:p.done,empty:`${x()} \uC644\uB8CC \uC5C6\uC74C`,controls:pt()})}
    </div>`}function he(p){w={...w,[p]:!w[p]},om(w),se()}function se(){let p=ht();je(ot(p),De),je(be(p),Fe)}function Pe(){let p=document.querySelector(".app-header");if(!p)return;let v=()=>{let L=Math.round(p.getBoundingClientRect().height);de.style.setProperty("--worker-ribbon-top",`${L}px`)};if(v(),typeof ResizeObserver=="function"){let L=new ResizeObserver(v);L.observe(p),ne.push(()=>L.disconnect())}else window.addEventListener("resize",v),ne.push(()=>window.removeEventListener("resize",v))}function tt(){if(typeof window.matchMedia!="function")return;let p=window.matchMedia(nm);S=!!p.matches;let v=L=>{let ae=!!(L&&typeof L.matches=="boolean"?L.matches:p.matches);ae!==S&&(S=ae,se())};typeof p.addEventListener=="function"?(p.addEventListener("change",v),ne.push(()=>p.removeEventListener("change",v))):typeof p.addListener=="function"&&(p.addListener(v),ne.push(()=>p.removeListener(v)))}let Ye=null;function Oe(p){Ye=p.target instanceof Element?p.target:null}function Xe(p){let L=p.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!L)return;if(Ye&&L.contains(Ye)&&Ye.closest("input, button, a")){p.preventDefault();return}let ae=L.dataset.beadId||"",q=L.dataset.lane||"";k={bead_id:ae,from_lane:q};try{p.dataTransfer?.setData("text/plain",ae),p.dataTransfer&&(p.dataTransfer.effectAllowed="move")}catch{}}function Ae(p){let v=p.target?.closest?.(".worker-pane");if(!v)return;let L=v.dataset.lane||"";L!=="candidate"&&L!=="queue"&&!/^s[1-5]$/.test(L)||(p.preventDefault(),p.dataTransfer&&(p.dataTransfer.dropEffect="move"),v.classList.add("worker-pane--drag-over"))}function _t(p){p.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function Tt(p,v){let L=N.find(I=>I.id===p);if(!L)return;let ae=N.filter(I=>I.id!==p),q=ae.length;if(v){let I=v.dataset.beadId;if(I===p)return;let re=ae.findIndex(Ee=>Ee.id===I);re>=0&&(q=re)}let y=ae.slice();y.splice(q,0,L),E.applyReorder(p,y,q)}function Pt(p){let v=p.target?.closest?.(".worker-pane");if(!v)return;p.preventDefault(),v.classList.remove("worker-pane--drag-over");let L=v.dataset.lane||"",ae=k?.bead_id||p.dataTransfer?.getData("text/plain")||"",q=k?.from_lane||"";if(k=null,!ae)return;let y=p.target?.closest?.(".worker-mini, .worker-card"),I=Array.from(v.querySelectorAll(".worker-mini, .worker-card")),re=I.length;if(y){let Ee=I.indexOf(y);Ee>=0&&(re=Ee)}if(re=Math.max(0,re-v.querySelectorAll(".worker-mini--ghost").length),v.classList.contains("worker-pane--collapsed")&&(re=U()),L==="candidate"){if(q==="candidate"){Tt(ae,y);return}(q==="queue"||/^s[1-5]$/.test(q))&&z(ae);return}if(L==="queue"||/^s[1-5]$/.test(L)){let Ee=L==="queue"?"parallel":L;q===L?C(ae,Ee,re):B(ae,Ee,re)}}function Dt(p){D=p,K_(p),se()}function xr(p){A=p==="board"||p==="created"||p==="spec"?p:Bs,em(A),se()}function vt(p){j=Nt(p)?p:Lt,rm(j),m?.(j),se()}function kt(p){let v=p.target?.closest?.(".worker-serial-lane-count");if(v){let re=Number.parseInt(v.value,10);Number.isFinite(re)&&et(re).then(se);return}let L=p.target?.closest?.(".worker-filter__blocked");if(L){Dt({...D,show_blocked:L.checked});return}let ae=p.target?.closest?.(".worker-done-range");if(ae){vt(ae.value);return}let q=p.target?.closest?.(".worker-sort");if(q){xr(q.value||Bs);return}let y=p.target?.closest?.(".worker-slots__input");if(!y)return;let I=Number.parseInt(y.value,10);if(!Number.isFinite(I)){se();return}Te(I).then(se)}function Qt(p){return p?{runner:p.runner||void 0,model:p.model||void 0,effort:p.effort||void 0,worktree:p.worktree||void 0,status:p.status||void 0,session_id:p.session_id||void 0}:{}}function or(){let p=ht();return{operations:p.repo_operations,cleanup_failures:p.cleanup_failures,repo:u&&u()||""}}function jt(){we&&ve.close(),Ze.hidden=!1,Ue.hidden=!1,xe.open(or()),se()}function Ut(p){let v=ke(),L=v.attempts?v.attempts[p]:null;we=p,xe.close(),Ze.hidden=!0,Ue.hidden=!1,ve.open({attempt_id:p,meta:Qt(L)}),se()}function wt(){if(xe.isOpen()&&xe.refresh(or()),!we)return;let p=ke(),v=p.attempts?p.attempts[we]:null;if(v){ve.updateMeta(Qt(v));return}ve.close()}function Jt(p){let v=p.target;if(v?.closest?.(".worker-mini__serial, .worker-mini__grip")||v?.closest?.("#worker-parallel-analysis-dialog"))return;if(v?.closest?.(".worker-analysis-btn")){G?.open();return}if(v?.closest?.(".worker-repo-strip")||v?.closest?.(".worker-mini__timeline")){jt();return}let L=v?.closest?.(".worker-repo-op__session");if(L){let Le=L.dataset.attemptId;Le&&Ut(Le);return}let ae=v?.closest?.(".worker-repo-op__resolve");if(ae){Ce(ae.dataset.operationId||"");return}let q=v?.closest?.(".worker-repo-op__dismiss");if(q){Me(q.dataset.operationId||"");return}let y=v?.closest?.(".worker-cleanup__resume");if(y){let Le=y.dataset.beadId;Le&&$e(Le);return}let I=v?.closest?.(".worker-banner__resume");if(I){let Le=I.dataset.attemptId;Le&&K(Le);return}let re=v?.closest?.(".worker-banner__discard");if(re){let Le=re.dataset.confirmation==="merged"?"merged":"unmerged";$(re.dataset.beadId||"",re.dataset.attemptId||null,Le,re.dataset.operationId||null);return}let Ee=v?.closest?.(".worker-banner__dismiss");if(Ee){let Le=Ee.dataset.attemptId;Le&&Z(Le);return}if(v?.closest?.(".worker-play")){Ie(!ke().auto_advance);return}let Je=v?.closest?.(".worker-merge-all");if(Je){Je.classList.contains("worker-merge-all--stop")?ke().auto_merge===!0?F(!1):Q():F(!0);return}let qe=v?.closest?.(".worker-pane__hd--toggle");if(qe){let Le=qe.dataset.lane;(Le==="queue"||Le==="done")&&he(Le);return}let Ke=v?.closest?.(".worker-card__place");if(Ke){let Le=Ke.dataset.beadId;Le&&!Ke.disabled&&B(Le,"parallel",U());return}let Se=v?.closest?.(".worker-filter__chip");if(Se){let Le=Se.dataset.spec;(Le==="all"||Le==="with"||Le==="without")&&Dt({...D,spec:Le});return}let d=v?.closest?.(".worker-mini__merge");if(d){let Le=d.dataset.beadId||"";ke().cleanup_failed?.[Le]?$e(Le):_e(Le);return}let _=v?.closest?.(".worker-mini__merge-cancel");if(_){te(_.dataset.beadId||"");return}let h=v?.closest?.(".worker-mini__discard");if(h){$(h.dataset.beadId||"",h.dataset.attemptId||null,h.dataset.discardMode==="merged"?"merged":"unmerged",h.dataset.operationId||null);return}let P=v?.closest?.(".worker-mini__stale-continue");if(P){M("worker-stale-work-continue",P.dataset.beadId||"",P.dataset.actionId||"");return}let ue=v?.closest?.(".worker-mini__stale-backup");if(ue){M("worker-stale-work-backup-fresh",ue.dataset.beadId||"",ue.dataset.actionId||"");return}let ye=v?.closest?.(".worker-mini__stale-recheck");if(ye){M("worker-stale-work-recheck",ye.dataset.beadId||"",ye.dataset.actionId||"");return}let Ne=v?.closest?.(".worker-mini__revise-fix");if(Ne){V("worker-revise-fix",Ne.dataset.beadId||"");return}let Be=v?.closest?.(".worker-mini__revise-approve");if(Be){V("worker-revise-approve",Be.dataset.beadId||"");return}if(v?.closest?.(".worker-mini__pr"))return;if(v?.closest?.(".rtile__discard")){let Le=v?.closest?.(".rtile"),ct=Le?.dataset?.beadId,Qr=Le?.dataset?.attemptId;ct&&$(ct,Qr||null,"unmerged",v?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(v?.closest?.(".rtile__dismiss")){let ct=v?.closest?.(".rtile")?.dataset?.attemptId;ct&&Z(ct);return}if(v?.closest?.(".rtile__pause")){let ct=v?.closest?.(".rtile")?.dataset?.attemptId;ct&&R(ct);return}if(v?.closest?.(".rtile__resume")){let ct=v?.closest?.(".rtile")?.dataset?.attemptId;ct&&K(ct);return}if(v?.closest?.(".rtile__session")){let ct=v?.closest?.(".rtile")?.dataset?.attemptId;ct&&Ut(ct);return}if(v?.closest?.(".worker-drawer-overlay__backdrop")){xe.close(),ve.close();return}if(v?.closest?.(".worker-drawer-host"))return;let ft=v?.closest?.(".rtile");if(ft){if(v?.closest?.(".rtile__id")){let ct=ft.dataset.beadId;ct&&ir(ct).then(Qr=>{Qr?ie("\uBCF5\uC0AC\uB428","success",1200):ie("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Le=ft.dataset.beadId;Le&&c&&c(Le);return}let er=v?.closest?.(".worker-mini, .worker-card");if(er){let Le=er.dataset.beadId;if(v?.closest?.(".worker-mini__id, .worker-card__id")){Le&&ir(Le).then(ct=>{ct?ie("\uBCF5\uC0AC\uB428","success",1200):ie("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}Le&&c&&c(Le)}}return e.addEventListener("pointerdown",Oe),e.addEventListener("dragstart",Xe),e.addEventListener("dragover",Ae),e.addEventListener("dragleave",_t),e.addEventListener("drop",Pt),e.addEventListener("click",Jt),e.addEventListener("change",kt),tt(),Pe(),b&&ne.push(b.subscribe(()=>{for(let[p,v]of ee)v==="failed"&&ee.delete(p);se()})),s&&ne.push(s.subscribe(()=>{let p=u&&u()||"";p!==me&&(me=p,Re.close()),se(),wt()})),o&&typeof o.subscribe=="function"&&ne.push(o.subscribe(()=>se())),se(),{load(){se()},destroy(){for(let p of ne.splice(0))try{p()}catch{}e.removeEventListener("pointerdown",Oe),e.removeEventListener("dragstart",Xe),e.removeEventListener("dragover",Ae),e.removeEventListener("dragleave",_t),e.removeEventListener("drop",Pt),e.removeEventListener("click",Jt),e.removeEventListener("change",kt);try{ve.destroy()}catch{}Ue.hidden=!0;try{G?.destroy()}catch{}try{Re.destroy()}catch{}je(i``,e)}}}function la(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function rd(e,t,r,n=async()=>{},s=async()=>{}){let o=at("views:workspace-picker"),a=null,l=!1,c=!1,u=!1;async function f(S){let Y=S.target.value,le=t.getState().workspace?.current?.path||"";if(Y&&Y!==le){o("switching workspace to %s",Y),l=!0,w();try{await r(Y)}catch(ne){o("workspace switch failed: %o",ne)}finally{l=!1,w()}}}async function m(){let S=t.getState(),H=S.workspace?.current?.path||S.workspace?.available?.[0]?.path||"";if(!(!H||c)){o("git-pulling workspace %s",H),c=!0,w();try{await n(H)}catch(Y){o("workspace git pull failed: %o",Y)}finally{c=!1,w()}}}function b(S){let H=S.target;H&&e.contains(H)||N()}function E(S){S.key==="Escape"&&N()}function k(){u||(u=!0,document.addEventListener("mousedown",b),document.addEventListener("keydown",E),w())}function N(){u&&(u=!1,document.removeEventListener("mousedown",b),document.removeEventListener("keydown",E),w())}function D(){u?N():k()}async function A(S){let H=S.target,Y=H.value,ge=H.checked;o("toggling visibility %s \u2192 %s",Y,String(ge));try{await s(Y,ge)}catch(le){o("workspace visibility toggle failed: %o",le)}}function j(S){return S?i`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${m}
        ?disabled=${l||c}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:i``}function ee(S,H){return i`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${D}
          aria-haspopup="true"
          aria-expanded=${u?"true":"false"}
          aria-label="프로젝트 관리"
        >
          프로젝트 관리
        </button>
        ${u?i`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${S.map(Y=>i`
                    <label
                      class="workspace-picker__manage-row"
                      title="${Y.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${Y.path}"
                        .checked=${!H.has(Y.path)}
                        @change=${A}
                      />
                      <span class="workspace-picker__manage-name"
                        >${la(Y.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function x(){let S=t.getState(),H=S.workspace?.current,Y=S.workspace?.available||[],ge=new Set(S.workspace?.hidden||[]),le=H?.path||Y[0]?.path||"";if(Y.length===0)return i``;let ne=Y.filter(de=>!ge.has(de.path)||de.path===le);if(ne.length<=1){let de=ne[0]||Y[0],De=la(de.path);return i`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${de.path}"
            >${De}</span
          >
          ${ee(Y,ge)}
          ${j(le)}
          ${c?i`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return i`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${f}
          ?disabled=${l||c}
          aria-label="Select project workspace"
        >
          ${ne.map(de=>i`
              <option
                value="${de.path}"
                ?selected=${de.path===le}
                title="${de.path}"
              >
                ${la(de.path)}
              </option>
            `)}
        </select>
        ${ee(Y,ge)}
        ${j(le)}
        ${l||c?i`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function w(){je(x(),e)}return w(),a=t.subscribe(()=>w()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",b),document.removeEventListener("keydown",E),je(i``,e)}}}var nd=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-serial-lane-count","subscribe-worker-parallel-analysis","unsubscribe-worker-parallel-analysis","worker-parallel-analysis-snapshot","worker-parallel-analysis-start","worker-parallel-analysis-cancel","worker-parallel-analysis-settings-update","worker-parallel-analysis-submit","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle"];function ca(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function sd(e,t,r=ca()){return{id:r,type:e,payload:t}}function od(e={}){let t=at("ws"),r={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},n=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,l=null,c=!0,u=new Map,f=[],m=new Map,b=new Set;function E(x){for(let w of Array.from(b))try{w(x)}catch{}}function k(){if(!c||l)return;o="reconnecting",t("ws reconnecting\u2026"),E(o);let x=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,a)),w=(r.jitterRatio||0)*x,S=Math.max(0,Math.round(x+(Math.random()*2-1)*w));t("ws retry in %d ms (attempt %d)",S,a+1),l=setTimeout(()=>{l=null,ee()},S)}function N(x){try{s?.send(JSON.stringify(x))}catch(w){t("ws send failed",w)}}function D(){for(o="open",t("ws open"),E(o),a=0;f.length;){let x=f.shift();x&&N(x)}}function A(x){let w;try{w=JSON.parse(String(x.data))}catch{t("ws received non-JSON message");return}if(!w||typeof w.id!="string"||typeof w.type!="string"){t("ws received invalid envelope");return}if(u.has(w.id)){let H=u.get(w.id);u.delete(w.id),w.ok?H?.resolve(w.payload):H?.reject(w.error||new Error("ws error"));return}let S=m.get(w.type);if(S&&S.size>0)for(let H of Array.from(S))try{H(w.payload)}catch(Y){t("ws event handler error",Y)}else t("ws received unhandled message type: %s",w.type)}function j(){o="closed",t("ws closed"),E(o);for(let[x,w]of u.entries())w.reject(new Error("ws disconnected")),u.delete(x);a+=1,k()}function ee(){if(!c)return;let x=n();try{s=new WebSocket(x),t("ws connecting %s",x),o="connecting",E(o),s.addEventListener("open",D),s.addEventListener("message",A),s.addEventListener("error",()=>{}),s.addEventListener("close",j)}catch(w){t("ws connect failed %o",w),k()}}return ee(),{send(x,w){if(!nd.includes(x))return Promise.reject(new Error(`unknown message type: ${x}`));let S=ca(),H=sd(x,w,S);return t("send %s id=%s",x,S),new Promise((Y,ge)=>{u.set(S,{resolve:Y,reject:ge,type:x}),s&&s.readyState===s.OPEN?N(H):(t("queue %s id=%s (state=%s)",x,S,o),f.push(H))})},on(x,w){m.has(x)||m.set(x,new Set);let S=m.get(x);return S?.add(w),()=>{S?.delete(w)}},onConnection(x){return b.add(x),()=>{b.delete(x)}},reconnect(){c=!0,l&&(clearTimeout(l),l=null),a=0,ee()},close(){c=!1,l&&(clearTimeout(l),l=null);try{s?.close()}catch{}},getState(){return o}}}function mm(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function gm(e,t){try{let n=await(await fetch("/api/config")).json();e.setState({config:n})}catch(r){t("config refresh failed",r)}}var da=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],ad=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:closed","closed-issues"]],kr="tab:worker:closed",bm="bdui.worker.done-range",id=vc,ld="worker:queue",cd="worker:parallel-analysis",dd="ui:order",ud="ui:display-policy",pd="exec:presets",$r="tab:board:closed",fd="beads-ui.board.closed-range";function hm(e){let t=at("main");t("bootstrap start");let r=i`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;je(r,e);let n=document.getElementById("top-nav"),s=document.getElementById("usage-meter"),o=document.getElementById("board-root"),a=document.getElementById("worker-root"),l=document.getElementById("monitor-root"),c=document.getElementById("detail-panel");if(s&&Oc(s),o&&a&&l&&c){let Fe=function(d,_){let h="Request failed",P="";if(d&&typeof d=="object"){let ye=d;if(typeof ye.message=="string"&&ye.message.length>0&&(h=ye.message),typeof ye.details=="string")P=ye.details;else if(ye.details&&typeof ye.details=="object")try{P=JSON.stringify(ye.details,null,2)}catch{P=""}}else typeof d=="string"&&d.length>0&&(h=d);let ue=_&&_.length>0?`Failed to load ${_}`:"Request failed";Ze.open(ue,h,P)},$e=function(d){return`${p.getState().workspace.current?.path||""}\0${d}`},T=function(){B&&(B().catch(()=>{}),B=null),C=null,z=null},te=function(d){R=d;let _=()=>{R!==d||p.getState().selected_id!==d||(R=null,F(d))};if(!ce){Z.then(_);return}_()},V=function(d,_,h,P,ue){return h!==M[_]?(ue().catch(()=>{}),!1):(d.set(P,ue),!0)},Ce=function(){let d=p.getState();yt(d.view==="board"),W(d.view==="worker"),Pe(d.view==="monitor"),be(d.view==="board"||d.view==="worker"||Ie||!!d.selected_id)},et=function(){let d=Rr(Me);return d===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:d}}},ht=function(){let d=Rr(Te);return d===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:d}}},yt=function(d){if(d)for(let[_,h]of da){if(Q.has(_)||$.has(_))continue;let P=_===$r?et():{type:h};try{Re.register(_,P)}catch(Ne){t("register %s store failed: %o",_,Ne)}$.add(_);let ue=M.board,ye=!1;xe.subscribeList(_,P).then(Ne=>{ye=!V(Q,"board",ue,_,Ne)}).catch(Ne=>{t("subscribe %s failed: %o",_,Ne),Fe(Ne,"board")}).finally(()=>{$.delete(_),ye&&Ce()})}else it()},it=function(){M.board+=1;for(let[d]of da){let _=Q.get(d);_&&(_().catch(()=>{}),Q.delete(d));try{Re.unregister(d)}catch(h){t("unregister %s failed: %o",d,h)}}},W=function(d){if(!d){J();return}for(let[_,h]of ad){if(st.has(_)||$.has(_))continue;let P=_===kr?ht():{type:h};try{Re.register(_,P)}catch(Ne){t("register %s store failed: %o",_,Ne)}$.add(_);let ue=M.worker,ye=!1;xe.subscribeList(_,P).then(Ne=>{ye=!V(st,"worker",ue,_,Ne)}).catch(Ne=>{t("subscribe %s failed: %o",_,Ne),Fe(Ne,"worker")}).finally(()=>{$.delete(_),ye&&Ce()})}},J=function(){M.worker+=1;for(let[d]of ad){let _=st.get(d);_&&(_().catch(()=>{}),st.delete(d));try{Re.unregister(d)}catch(h){t("unregister %s failed: %o",d,h)}}},be=function(d){if(!d){he();return}pt||(ve("subscribe-worker-queue",{id:ld}).catch(_=>{t("subscribe-worker-queue failed: %o",_)}),ve("subscribe-worker-parallel-analysis",{id:cd}).catch(_=>{t("subscribe-worker-parallel-analysis failed: %o",_)}),pt=()=>(ve("unsubscribe-worker-parallel-analysis",{id:cd}),ve("unsubscribe-worker-queue",{id:ld})))},he=function(){pt&&(pt().catch(()=>{}),pt=null),X.clear()},Pe=function(d){if(!d){tt();return}se||(ve("subscribe-monitor-pipeline",{id}).catch(_=>{t("subscribe-monitor-pipeline failed: %o",_)}),se=()=>ve("unsubscribe-monitor-pipeline",{id}))},tt=function(){se&&(se().catch(()=>{}),se=null)},Oe=function(){Ye||(ve("subscribe-ui-order",{id:dd}).catch(d=>{t("subscribe-ui-order failed: %o",d)}),Ye=()=>ve("unsubscribe-ui-order",{id:dd}))},Xe=function(){Ye&&(Ye().catch(()=>{}),Ye=null),ke.clear()},_t=function(){Ae||(ve("subscribe-display-policy",{id:ud}).catch(d=>{t("subscribe-display-policy failed: %o",d)}),Ae=()=>ve("unsubscribe-display-policy",{id:ud}))},Tt=function(){Ae&&(Ae().catch(()=>{}),Ae=null),fe.clear()},Dt=function(){Pt||(ve("subscribe-impl-presets",{id:pd}).catch(d=>{t("subscribe-impl-presets failed: %o",d)}),Pt=()=>ve("unsubscribe-impl-presets",{id:pd}))},jt=function(d){if(!d)return"Unknown";let _=d.split("/").filter(Boolean);return _.length>0?_[_.length-1]:"Unknown"};var u=Fe,f=$e,m=T,b=te,E=V,k=Ce,N=et,D=ht,A=yt,j=it,ee=W,x=J,w=be,S=he,H=Pe,Y=tt,ge=Oe,le=Xe,ne=_t,de=Tt,De=Dt,Ue=jt;let Ge=document.getElementById("header-loading"),ze=wi(Ge),Ze=Gl(e),we=od(),ve=ze.wrapSend((d,_)=>we.send(d,_)),xe=fi(ve),Re=_i(),me=bi(),X=gi(),G=Qa(),ke=mi(),fe=Za(),oe=Xa(),U=Ja();we.on("impl-presets-snapshot",d=>{let _=d;_&&typeof _.revision=="number"&&Array.isArray(_.presets)&&oe.set({revision:_.revision,presets:_.presets})}),we.on("monitor-pipeline-snapshot",d=>{let _=d;if(!(!_||!Array.isArray(_.workspaces)))try{G.set(_.workspaces,_.workspaces_state)}catch{}}),we.on("ui-order-snapshot",d=>{let _=d;if(_&&typeof _.revision=="number")try{ke.set({revision:_.revision,order:_.order&&typeof _.order=="object"?_.order:{}})}catch{}}),we.on("display-policy-snapshot",d=>{let _=d;if(_&&_.policy&&typeof _.policy=="object")try{fe.set(_.policy)}catch{}}),we.on("session-log-snapshot",d=>{let _=d;if(_&&typeof _.id=="string")try{U.set(_.id,Array.isArray(_.lines)?_.lines:[],typeof _.last_event_at=="number"?_.last_event_at:null)}catch{}}),we.on("session-log-append",d=>{let _=d;if(_&&typeof _.id=="string")try{U.append(_.id,_.event)}catch{}}),we.on("snapshot",d=>{let _=d,h=_&&typeof _.id=="string"?_.id:"",P=h?Re.getStore(h):null;if(P&&_&&_.type==="snapshot")try{P.applyPush(_)}catch{}}),we.on("upsert",d=>{let _=d,h=_&&typeof _.id=="string"?_.id:"",P=h?Re.getStore(h):null;if(P&&_&&_.type==="upsert")try{P.applyPush(_)}catch{}}),we.on("delete",d=>{let _=d,h=_&&typeof _.id=="string"?_.id:"",P=h?Re.getStore(h):null;if(P&&_&&_.type==="delete")try{P.applyPush(_)}catch{}});let B=null,C=null,z=null,R=null,K=()=>{},Z=new Promise(d=>{K=()=>d(void 0)}),ce=!1,_e=!1;async function F(d){let _=$e(d);if(_===C||_===z)return;z=_;let h=`detail:${d}`,P={type:"issue-detail",params:{id:d}};try{Re.register(h,P)}catch(ue){t("register detail store failed: %o",ue)}try{let ue=await xe.subscribeList(h,P);if(p.getState().selected_id!==d||$e(d)!==_){await ue().catch(()=>{});return}B&&await B().catch(()=>{}),B=ue,C=_}catch(ue){t("detail subscribe failed: %o",ue),Fe(ue,"issue details")}finally{z===_&&(z=null)}}let Q=new Map,$=new Set,M={board:0,worker:0},Ie=!1,Me=Lt;try{let d=window.localStorage.getItem(fd);Nt(d)&&(Me=d)}catch{}let Te=Lt;try{let d=window.localStorage.getItem(bm);Nt(d)&&(Te=d)}catch{}async function ot(d){if(!Nt(d)||d===Me)return;Me=d;try{window.localStorage.setItem(fd,d)}catch{}let _=Q.get($r);if(!_)return;Q.delete($r),await _().catch(()=>{});let h=et();try{Re.register($r,h)}catch(P){t("register %s store failed: %o",$r,P)}try{let P=await xe.subscribeList($r,h);Q.set($r,P)}catch(P){t("re-subscribe %s failed: %o",$r,P),Fe(P,"board")}}async function $t(d){if(!Nt(d)||d===Te)return;Te=d;let _=st.get(kr);if(!_)return;st.delete(kr),await _().catch(()=>{});let h=ht();try{Re.register(kr,h)}catch(P){t("register %s store failed: %o",kr,P)}try{let P=await xe.subscribeList(kr,h);st.set(kr,P)}catch(P){t("re-subscribe %s failed: %o",kr,P),Fe(P,"worker")}}let st=new Map,pt=null,se=null,Ye=null,Ae=null,Pt=null;async function xr(){Ae=null,fe.clear(),Pt=null,oe.clear(),pt=null,se=null,Q.clear(),st.clear(),M.board+=1,M.worker+=1,Dt();let d=p.getState().workspace.current?.path;if(d)try{await we.send("set-workspace",{path:d})}catch(h){t("workspace restore after reconnect failed: %o",h);return}_t();let _=p.getState();yt(_.view==="board"),W(_.view==="worker"),Pe(_.view==="monitor"),be(_.view==="board"||_.view==="worker"||!!_.selected_id)}async function vt(){t("clearing all subscriptions for workspace switch"),it(),J(),he(),me.clear(),Xe(),Oe(),Tt(),_t(),T();let d=p.getState();if(d.selected_id)try{Re.unregister(`detail:${d.selected_id}`)}catch{}let _=p.getState();yt(_.view==="board"),W(_.view==="worker"),Pe(_.view==="monitor"),be(_.view==="board"||_.view==="worker"||!!_.selected_id),_.selected_id&&te(_.selected_id)}async function kt(d){t("requesting workspace switch to %s",d),_e=!0;try{let _=await we.send("set-workspace",{path:d});t("workspace switch result: %o",_),_&&_.workspace&&(p.setState({workspace:{current:{path:_.workspace.root_dir,database:_.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",d),_.changed&&(await vt(),ie("Switched to "+jt(d),"success",2e3)))}catch(_){throw t("workspace switch failed: %o",_),ie("Failed to switch workspace","error",3e3),_}finally{_e=!1}}async function Qt(d){t("requesting workspace git pull for %s",d);try{let _=await we.send("git-pull-workspace",{});t("workspace git pull result: %o",_);let h=_?.status;if(h==="up_to_date"){ie("Already up to date","success",2e3);return}if(h==="stash_pop_conflict"){ie("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}ie("Git pulled "+jt(d),"success",2e3)}catch(_){t("workspace git pull failed: %o",_);let h=_?.code,P=_?.message;if(h==="rebase_conflict"){ie("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(h==="rebase_conflict_abort_failed"){ie("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(h==="busy"){ie("Git pull skipped: another operation is running","warning",3e3);return}let ue=P?`: ${P}`:"";throw ie(`Git pull failed${ue}`,"error",3e3),_}}async function or(d,_){t("setting workspace visibility %s \u2192 %s",d,String(_));try{await we.send("set-workspace-visibility",{path:d,visible:_}),await Ut()}catch(h){t("workspace visibility update failed: %o",h),ie("Failed to update project visibility","error",3e3)}}async function Ut(){try{let d=await we.send("list-workspaces",{});if(t("workspaces loaded: %o",d),d&&Array.isArray(d.workspaces)){let _=d.workspaces.map(ye=>({path:ye.path,database:ye.database,pid:ye.pid,version:ye.version})),h=d.current?{path:d.current.root_dir,database:d.current.db_path}:null,P=Array.isArray(d.hidden)?d.hidden.filter(ye=>typeof ye=="string"):[];p.setState({workspace:{current:h,available:_,hidden:P}});let ue=window.localStorage.getItem("beads-ui.workspace");ue&&(!_.some(Ne=>Ne.path===ue)||P.includes(ue)?window.localStorage.removeItem("beads-ui.workspace"):h&&ue!==h.path&&(t("restoring saved workspace preference: %s",ue),await kt(ue)))}}catch(d){t("failed to load workspaces: %o",d)}}we.on("workspace-changed",d=>{t("workspace-changed event: %o",d),d&&d.root_dir&&(p.setState({workspace:{current:{path:d.root_dir,database:d.db_path}}}),Ut(),vt())});let wt=!1;if(typeof we.onConnection=="function"){let d=_=>{t("ws state %s",_),_==="reconnecting"||_==="closed"?(wt=!0,ie("Connection lost. Reconnecting\u2026","error",4e3)):_==="open"&&wt&&(wt=!1,ie("Reconnected","success",2200),gm(p,(h,P)=>{t(`${h}: %o`,P)}),xr())};we.onConnection(d)}let Jt="board";try{let d=window.localStorage.getItem("beads-ui.view");(d==="board"||d==="worker"||d==="monitor")&&(Jt=d)}catch(d){t("view parse error: %o",d)}let p=vi({config:mm(),view:Jt});we.on("worker-queue-snapshot",d=>{let _=d;if(!_||!_.queue)return;let h=p.getState().workspace.current?.path;if(typeof h=="string"&&h.length>0&&_.root_dir!==h){t("dropping worker-queue snapshot for %s",String(_.root_dir));return}try{me.set(_.queue)}catch{}}),we.on("worker-parallel-analysis-snapshot",d=>{let _=d;if(!_)return;let h=p.getState().workspace.current?.path;if(!(typeof h=="string"&&h.length>0&&typeof _.root_dir=="string"&&_.root_dir!==h))try{X.set({settings:_.settings,job:_.job??null,last_good:_.last_good??null})}catch{}});let v=hi(p);v.start();let L=new Set(["get-comments","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults"]),ae=async(d,_)=>{try{return await ve(d,_)}catch(h){if(L.has(d))throw h;return[]}};n&&kc(n,p,v);let q=document.getElementById("workspace-picker");q&&rd(q,p,kt,Qt,or);let y=Ac(e,(d,_)=>ve(d,_));try{let d=document.getElementById("new-issue-btn");d&&d.addEventListener("click",()=>y.open())}catch{}let I=Rc(e,{policyStore:fe,queueStore:me,implPresetStore:oe,transport:(d,_)=>ve(d,_),onOpenChange:d=>{Ie=d,Ce()},labelOptions:()=>{let d=new Set;for(let[_]of da)for(let h of Re.snapshotFor(_)||[]){let P=h.labels;if(Array.isArray(P))for(let ue of P)typeof ue=="string"&&ue.length>0&&d.add(ue)}return Array.from(d).sort()}});try{let d=document.getElementById("display-settings-btn");d&&(d.setAttribute("aria-label","\uC124\uC815"),d.setAttribute("title","\uC124\uC815"),d.addEventListener("click",()=>I.open()))}catch{}let re=Ii(o,{gotoIssue:d=>v.gotoIssue(d),issueStores:Re,transport:ae,workerQueueStore:me,uiOrderStore:ke,displayPolicyStore:fe,closedRange:Me,onClosedRangeChange:d=>{ot(d)},onNewIssue:()=>y.open()}),Ee=ia(a,{transport:ae,issueStores:Re,queueStore:me,analysisStore:X,sessionLogStore:U,uiOrderStore:ke,gotoIssue:d=>p.setState({selected_id:d}),getWorkspacePath:()=>p.getState().workspace.current?.path,doneRange:Te,onDoneRangeChange:d=>{$t(d)}}),Je=wc(l,{transport:ae,pipelineStore:G,execPresetStore:oe,gotoIssue:d=>v.gotoIssue(d),getWorkspacePath:()=>p.getState().workspace.current?.path,switchWorkspace:d=>kt(d)}),qe=Hl(c,{issueStores:Re,transport:ae,queueStore:me,execPresetStore:oe,sessionLogStore:U,getWorkspacePath:()=>p.getState().workspace.current?.path,onNavigate:d=>{p.getState().view==="worker"?p.setState({selected_id:d}):v.gotoIssue(d)},onClose:()=>{let d=p.getState();p.setState({selected_id:null});try{v.gotoView(d.view==="worker"||d.view==="monitor"?d.view:"board")}catch{}},onOpenExecPresets:()=>{I.open("session")}}),Ke=p.getState().selected_id;Ke&&(c.hidden=!1,qe.load(Ke),te(Ke)),p.subscribe(d=>{let _=d.selected_id;_?(c.hidden=!1,qe.load(_),_e||te(_)):(qe.clear(),c.hidden=!0,T())});let Se=d=>{o.hidden=d.view!=="board",a.hidden=d.view!=="worker",l.hidden=d.view!=="monitor",yt(d.view==="board"),W(d.view==="worker"),Pe(d.view==="monitor"),be(d.view==="board"||d.view==="worker"||Ie||!!d.selected_id),!d.selected_id&&d.view==="board"&&re.load(),d.view==="worker"&&Ee.load(),d.view==="monitor"?Je.load():Je.pause(),window.localStorage.setItem("beads-ui.view",d.view)};p.subscribe(Se),Se(p.getState()),Oe(),_t(),Dt(),Ut().finally(()=>{ce=!0,K()}),window.addEventListener("keydown",d=>{let _=d.ctrlKey||d.metaKey,h=String(d.key||"").toLowerCase(),P=d.target,ue=P&&P.tagName?String(P.tagName).toLowerCase():"",ye=ue==="input"||ue==="textarea"||ue==="select"||P&&typeof P.isContentEditable=="boolean"&&P.isContentEditable;_&&h==="n"&&(ye||(d.preventDefault(),y.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let r=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let t=document.getElementById("app");t&&hm(t)});export{hm as bootstrap,mm as readBootstrapConfig,gm as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
