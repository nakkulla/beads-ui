var Ul=Object.create;var os=Object.defineProperty;var jl=Object.getOwnPropertyDescriptor;var zl=Object.getOwnPropertyNames;var Hl=Object.getPrototypeOf,Wl=Object.prototype.hasOwnProperty;var Gl=(e,t,r)=>t in e?os(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var as=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Yl=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of zl(t))!Wl.call(e,s)&&s!==r&&os(e,s,{get:()=>t[s],enumerable:!(n=jl(t,s))||n.enumerable});return e};var Vl=(e,t,r)=>(r=e!=null?Ul(Hl(e)):{},Yl(t||!e||!e.__esModule?os(r,"default",{value:e,enumerable:!0}):r,e));var Ze=(e,t,r)=>Gl(e,typeof t!="symbol"?t+"":t,r);var Yo=as((cf,Go)=>{var Tr=1e3,Er=Tr*60,Cr=Er*60,hr=Cr*24,Jl=hr*7,ec=hr*365.25;Go.exports=function(e,t){t=t||{};var r=typeof e;if(r==="string"&&e.length>0)return tc(e);if(r==="number"&&isFinite(e))return t.long?nc(e):rc(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function tc(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*ec;case"weeks":case"week":case"w":return r*Jl;case"days":case"day":case"d":return r*hr;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Cr;case"minutes":case"minute":case"mins":case"min":case"m":return r*Er;case"seconds":case"second":case"secs":case"sec":case"s":return r*Tr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function rc(e){var t=Math.abs(e);return t>=hr?Math.round(e/hr)+"d":t>=Cr?Math.round(e/Cr)+"h":t>=Er?Math.round(e/Er)+"m":t>=Tr?Math.round(e/Tr)+"s":e+"ms"}function nc(e){var t=Math.abs(e);return t>=hr?yn(e,t,hr,"day"):t>=Cr?yn(e,t,Cr,"hour"):t>=Er?yn(e,t,Er,"minute"):t>=Tr?yn(e,t,Tr,"second"):e+" ms"}function yn(e,t,r,n){var s=t>=r*1.5;return Math.round(e/r)+" "+n+(s?"s":"")}});var Ko=as((df,Vo)=>{function sc(e){r.debug=r,r.default=r,r.coerce=l,r.disable=a,r.enable=s,r.enabled=i,r.humanize=Yo(),r.destroy=d,Object.keys(e).forEach(p=>{r[p]=e[p]}),r.names=[],r.skips=[],r.formatters={};function t(p){let f=0;for(let g=0;g<p.length;g++)f=(f<<5)-f+p.charCodeAt(g),f|=0;return r.colors[Math.abs(f)%r.colors.length]}r.selectColor=t;function r(p){let f,g=null,A,x;function T(...P){if(!T.enabled)return;let w=T,Y=Number(new Date),V=Y-(f||Y);w.diff=V,w.prev=f,w.curr=Y,f=Y,P[0]=r.coerce(P[0]),typeof P[0]!="string"&&P.unshift("%O");let q=0;P[0]=P[0].replace(/%([a-zA-Z%])/g,(S,L)=>{if(S==="%%")return"%";q++;let C=r.formatters[L];if(typeof C=="function"){let le=P[q];S=C.call(w,le),P.splice(q,1),q--}return S}),r.formatArgs.call(w,P),(w.log||r.log).apply(w,P)}return T.namespace=p,T.useColors=r.useColors(),T.color=r.selectColor(p),T.extend=n,T.destroy=r.destroy,Object.defineProperty(T,"enabled",{enumerable:!0,configurable:!1,get:()=>g!==null?g:(A!==r.namespaces&&(A=r.namespaces,x=r.enabled(p)),x),set:P=>{g=P}}),typeof r.init=="function"&&r.init(T),T}function n(p,f){let g=r(this.namespace+(typeof f>"u"?":":f)+p);return g.log=this.log,g}function s(p){r.save(p),r.namespaces=p,r.names=[],r.skips=[];let f=(typeof p=="string"?p:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let g of f)g[0]==="-"?r.skips.push(g.slice(1)):r.names.push(g)}function o(p,f){let g=0,A=0,x=-1,T=0;for(;g<p.length;)if(A<f.length&&(f[A]===p[g]||f[A]==="*"))f[A]==="*"?(x=A,T=g,A++):(g++,A++);else if(x!==-1)A=x+1,T++,g=T;else return!1;for(;A<f.length&&f[A]==="*";)A++;return A===f.length}function a(){let p=[...r.names,...r.skips.map(f=>"-"+f)].join(",");return r.enable(""),p}function i(p){for(let f of r.skips)if(o(p,f))return!1;for(let f of r.names)if(o(p,f))return!0;return!1}function l(p){return p instanceof Error?p.stack||p.message:p}function d(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}Vo.exports=sc});var Zo=as((Tt,kn)=>{Tt.formatArgs=ac;Tt.save=ic;Tt.load=lc;Tt.useColors=oc;Tt.storage=cc();Tt.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();Tt.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function oc(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function ac(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+kn.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let r=0,n=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),e.splice(n,0,t)}Tt.log=console.debug||console.log||(()=>{});function ic(e){try{e?Tt.storage.setItem("debug",e):Tt.storage.removeItem("debug")}catch{}}function lc(){let e;try{e=Tt.storage.getItem("debug")||Tt.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function cc(){try{return localStorage}catch{}}kn.exports=Ko()(Tt);var{formatters:dc}=kn.exports;dc.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var Ur=globalThis,vn=Ur.trustedTypes,Lo=vn?vn.createPolicy("lit-html",{createHTML:e=>e}):void 0,Fo="$lit$",rr=`lit$${Math.random().toFixed(9).slice(2)}$`,qo="?"+rr,Kl=`<${qo}>`,mr=document,jr=()=>mr.createComment(""),zr=e=>e===null||typeof e!="object"&&typeof e!="function",fs=Array.isArray,Zl=e=>fs(e)||typeof e?.[Symbol.iterator]=="function",is=`[ 	
\f\r]`,Br=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Oo=/-->/g,Do=/>/g,fr=RegExp(`>|${is}(?:([^\\s"'>=/]+)(${is}*=${is}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Po=/'/g,Mo=/"/g,Bo=/^(?:script|style|textarea|title)$/i,_s=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),c=_s(1),Vt=_s(2),tf=_s(3),gr=Symbol.for("lit-noChange"),ct=Symbol.for("lit-nothing"),No=new WeakMap,_r=mr.createTreeWalker(mr,129);function Uo(e,t){if(!fs(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Lo!==void 0?Lo.createHTML(t):t}var Xl=(e,t)=>{let r=e.length-1,n=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=Br;for(let i=0;i<r;i++){let l=e[i],d,p,f=-1,g=0;for(;g<l.length&&(a.lastIndex=g,p=a.exec(l),p!==null);)g=a.lastIndex,a===Br?p[1]==="!--"?a=Oo:p[1]!==void 0?a=Do:p[2]!==void 0?(Bo.test(p[2])&&(s=RegExp("</"+p[2],"g")),a=fr):p[3]!==void 0&&(a=fr):a===fr?p[0]===">"?(a=s??Br,f=-1):p[1]===void 0?f=-2:(f=a.lastIndex-p[2].length,d=p[1],a=p[3]===void 0?fr:p[3]==='"'?Mo:Po):a===Mo||a===Po?a=fr:a===Oo||a===Do?a=Br:(a=fr,s=void 0);let A=a===fr&&e[i+1].startsWith("/>")?" ":"";o+=a===Br?l+Kl:f>=0?(n.push(d),l.slice(0,f)+Fo+l.slice(f)+rr+A):l+rr+(f===-2?i:A)}return[Uo(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},Hr=class e{constructor({strings:t,_$litType$:r},n){let s;this.parts=[];let o=0,a=0,i=t.length-1,l=this.parts,[d,p]=Xl(t,r);if(this.el=e.createElement(d,n),_r.currentNode=this.el.content,r===2||r===3){let f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}for(;(s=_r.nextNode())!==null&&l.length<i;){if(s.nodeType===1){if(s.hasAttributes())for(let f of s.getAttributeNames())if(f.endsWith(Fo)){let g=p[a++],A=s.getAttribute(f).split(rr),x=/([.?@])?(.*)/.exec(g);l.push({type:1,index:o,name:x[2],strings:A,ctor:x[1]==="."?cs:x[1]==="?"?ds:x[1]==="@"?us:Sr}),s.removeAttribute(f)}else f.startsWith(rr)&&(l.push({type:6,index:o}),s.removeAttribute(f));if(Bo.test(s.tagName)){let f=s.textContent.split(rr),g=f.length-1;if(g>0){s.textContent=vn?vn.emptyScript:"";for(let A=0;A<g;A++)s.append(f[A],jr()),_r.nextNode(),l.push({type:2,index:++o});s.append(f[g],jr())}}}else if(s.nodeType===8)if(s.data===qo)l.push({type:2,index:o});else{let f=-1;for(;(f=s.data.indexOf(rr,f+1))!==-1;)l.push({type:7,index:o}),f+=rr.length-1}o++}}static createElement(t,r){let n=mr.createElement("template");return n.innerHTML=t,n}};function xr(e,t,r=e,n){if(t===gr)return t;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=zr(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(t=xr(e,s._$AS(e,t.values),s,n)),t}var ls=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:n}=this._$AD,s=(t?.creationScope??mr).importNode(r,!0);_r.currentNode=s;let o=_r.nextNode(),a=0,i=0,l=n[0];for(;l!==void 0;){if(a===l.index){let d;l.type===2?d=new Wr(o,o.nextSibling,this,t):l.type===1?d=new l.ctor(o,l.name,l.strings,this,t):l.type===6&&(d=new ps(o,this,t)),this._$AV.push(d),l=n[++i]}a!==l?.index&&(o=_r.nextNode(),a++)}return _r.currentNode=mr,s}p(t){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}},Wr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,n,s){this.type=2,this._$AH=ct,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=xr(this,t,r),zr(t)?t===ct||t==null||t===""?(this._$AH!==ct&&this._$AR(),this._$AH=ct):t!==this._$AH&&t!==gr&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Zl(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==ct&&zr(this._$AH)?this._$AA.nextSibling.data=t:this.T(mr.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=Hr.createElement(Uo(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new ls(s,this),a=o.u(this.options);o.p(r),this.T(a),this._$AH=o}}_$AC(t){let r=No.get(t.strings);return r===void 0&&No.set(t.strings,r=new Hr(t)),r}k(t){fs(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of t)s===r.length?r.push(n=new e(this.O(jr()),this.O(jr()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Sr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,n,s,o){this.type=1,this._$AH=ct,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=ct}_$AI(t,r=this,n,s){let o=this.strings,a=!1;if(o===void 0)t=xr(this,t,r,0),a=!zr(t)||t!==this._$AH&&t!==gr,a&&(this._$AH=t);else{let i=t,l,d;for(t=o[0],l=0;l<o.length-1;l++)d=xr(this,i[n+l],r,l),d===gr&&(d=this._$AH[l]),a||(a=!zr(d)||d!==this._$AH[l]),d===ct?t=ct:t!==ct&&(t+=(d??"")+o[l+1]),this._$AH[l]=d}a&&!s&&this.j(t)}j(t){t===ct?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},cs=class extends Sr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===ct?void 0:t}},ds=class extends Sr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==ct)}},us=class extends Sr{constructor(t,r,n,s,o){super(t,r,n,s,o),this.type=5}_$AI(t,r=this){if((t=xr(this,t,r,0)??ct)===gr)return;let n=this._$AH,s=t===ct&&n!==ct||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==ct&&(n===ct||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},ps=class{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){xr(this,t)}};var Ql=Ur.litHtmlPolyfillSupport;Ql?.(Hr,Wr),(Ur.litHtmlVersions??(Ur.litHtmlVersions=[])).push("3.3.1");var qe=(e,t,r)=>{let n=r?.renderBefore??t,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new Wr(t.insertBefore(jr(),o),o,void 0,r??{})}return s._$AI(e),s};var Lt="today",zt=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Kt(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function Ar(e,t=Date.now()){switch(e){case"today":{let r=new Date(t);return r.setHours(0,0,0,0),r.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function jo(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function zo(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Ho(){let e=null,t=[],r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],n()},clear(){e=null,t=[],n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function Wo(){let e=new Map,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{set(n,s,o=null){e.set(n,{lines:Array.isArray(s)?[...s]:[],last_event_at:typeof o=="number"?o:null}),r()},append(n,s){let o=e.get(n)||{lines:[],last_event_at:null};o.lines=[...o.lines,s],o.last_event_at=Date.now(),e.set(n,o),r()},get(n){return e.get(n)||null},clear(n){typeof n=="string"?e.delete(n):e.clear(),r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}var Xo=Vl(Zo(),1);function rt(e){return(0,Xo.default)(`beads-ui:${e}`)}function Ft(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function br(e,t){let r=Ft(e.created_at),n=Ft(t.created_at);if(r!==n)return r<n?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function ea(e,t){let r=Ft(e.created_at),n=Ft(t.created_at);if(r!==n)return r<n?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function ta(e,t){let r=Ft(e.updated_at),n=Ft(t.updated_at);if(r!==n)return r<n?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function ra(e,t){let r=e.priority??2,n=t.priority??2;if(r!==n)return r-n;let s=Ft(e.created_at),o=Ft(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function na(e,t){let r=e.closed_at??0,n=t.closed_at??0;if(r!==n)return r<n?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var uc=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Qo(e){let t=e&&e.metadata,r=t?t.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Jo(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let r=uc.exec(t);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function sa(e,t){let r=Qo(e),n=Qo(t);if(r!==n)return r<n?-1:1;let s=Jo(e),o=Jo(t);if(s!==o)return s<o?-1:1;let a=Ft(e&&e.created_at),i=Ft(t&&t.created_at);if(a!==i)return a<i?-1:1;let l=e&&e.id,d=t&&t.id;return l===d?0:String(l)<String(d)?-1:1}var ms=2**20;function Rr(e,t){let r=e&&e.id;return t&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(t,r)&&typeof t[r]=="number"&&Number.isFinite(t[r])?t[r]:-Ft(e&&e.created_at)}function wn(e){return(t,r)=>{let n=Rr(t,e),s=Rr(r,e);if(n!==s)return n<s?-1:1;let o=t?.id,a=r?.id;return o<a?-1:o>a?1:0}}function gs(e,t,r){let n=Array.isArray(e)?e:[],s=n.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?n[o-1]:null,i=o+1<s?n[o+1]:null;if(!a&&!i)return{rank:0};if(!a)return{rank:Rr(i,r)-ms};if(!i)return{rank:Rr(a,r)+ms};let l=Rr(a,r),d=Rr(i,r),p=(l+d)/2;return l<p&&p<d?{rank:p}:{renormalize:n.map((f,g)=>({bead_id:f.id,rank:g*ms}))}}function hs(e,t={}){let r=rt(`issue-store:${e}`),n=new Map,s=[],o=0,a=new Set,i=!1,l=t.sort||br;function d(){for(let g of Array.from(a))try{g()}catch{}}function p(){s=Array.from(n.values()).sort(l)}function f(g){if(i||!g||g.id!==e)return;let A=Number(g.revision)||0;if(r("apply %s rev=%d",g.type,A),!(A<=o&&g.type!=="snapshot")){if(g.type==="snapshot"){if(A<=o)return;n.clear();let x=Array.isArray(g.issues)?g.issues:[];for(let T of x)T&&typeof T.id=="string"&&T.id.length>0&&n.set(T.id,T);p(),o=A,d();return}if(g.type==="upsert"){let x=g.issue;if(x&&typeof x.id=="string"&&x.id.length>0){let T=n.get(x.id);if(!T)n.set(x.id,x);else{let P=Number.isFinite(T.updated_at)?T.updated_at:0,w=Number.isFinite(x.updated_at)?x.updated_at:0;if(P<=w){for(let Y of Object.keys(T))Y in x||delete T[Y];for(let[Y,V]of Object.entries(x))T[Y]=V}}p()}o=A,d()}else if(g.type==="delete"){let x=String(g.issue_id||"");x&&(n.delete(x),p()),o=A,d()}}}return{id:e,subscribe(g){return a.add(g),()=>{a.delete(g)}},applyPush:f,snapshot(){return s},size(){return n.size},getById(g){return n.get(g)},dispose(){i=!0,n.clear(),s=[],a.clear(),o=0}}}function $n(e){let t=String(e.type||"").trim(),r={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];r[o]=String(a)}}let n=new URLSearchParams(r).toString();return n.length>0?`${t}?${n}`:t}function oa(e){let t=rt("subs"),r=new Map,n=new Map;function s(i,l){t("applyDelta %s +%d ~%d -%d",i,(l.added||[]).length,(l.updated||[]).length,(l.removed||[]).length);let d=n.get(i);if(!d||d.size===0)return;let p=Array.isArray(l.added)?l.added:[],f=Array.isArray(l.updated)?l.updated:[],g=Array.isArray(l.removed)?l.removed:[];for(let A of Array.from(d)){let x=r.get(A);if(!x)continue;let T=x.itemsById;for(let P of p)typeof P=="string"&&P.length>0&&T.set(P,!0);for(let P of f)typeof P=="string"&&P.length>0&&T.set(P,!0);for(let P of g)typeof P=="string"&&P.length>0&&T.delete(P)}}async function o(i,l){let d=$n(l);if(t("subscribe %s key=%s",i,d),!r.has(i))r.set(i,{key:d,itemsById:new Map});else{let f=r.get(i);if(f&&f.key!==d){let g=n.get(f.key);g&&(g.delete(i),g.size===0&&n.delete(f.key)),r.set(i,{key:d,itemsById:new Map})}}n.has(d)||n.set(d,new Set);let p=n.get(d);p&&p.add(i);try{await e("subscribe-list",{id:i,type:l.type,params:l.params})}catch(f){let g=r.get(i)||null;if(g){let A=n.get(g.key);A&&(A.delete(i),A.size===0&&n.delete(g.key))}throw r.delete(i),f}return async()=>{t("unsubscribe %s key=%s",i,d);try{await e("unsubscribe-list",{id:i})}catch{}let f=r.get(i)||null;if(f){let g=n.get(f.key);g&&(g.delete(i),g.size===0&&n.delete(f.key))}r.delete(i)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:$n,selectors:{getIds(i){let l=r.get(i);return l?Array.from(l.itemsById.keys()):[]},has(i,l){let d=r.get(i);return d?d.itemsById.has(l):!1},count(i){let l=r.get(i);return l?l.itemsById.size:0},getItemsById(i){let l=r.get(i),d={};if(!l)return d;for(let p of l.itemsById.keys())d[p]=!0;return d}}}}function aa(){let e=rt("issue-stores"),t=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let l of Array.from(n))try{l()}catch{}}function a(l,d,p){let f=d?$n(d):"",g=r.get(l)||"",A=t.has(l);if(e("register %s key=%s (prev=%s)",l,f,g),A&&g&&f&&g!==f){let x=t.get(l);if(x)try{x.dispose()}catch{}let T=s.get(l);if(T){try{T()}catch{}s.delete(l)}let P=hs(l,p);t.set(l,P);let w=P.subscribe(()=>o());s.set(l,w)}else if(!A){let x=hs(l,p);t.set(l,x);let T=x.subscribe(()=>o());s.set(l,T)}return r.set(l,f),()=>i(l)}function i(l){e("unregister %s",l),r.delete(l);let d=t.get(l);d&&(d.dispose(),t.delete(l));let p=s.get(l);if(p){try{p()}catch{}s.delete(l)}}return{register:a,unregister:i,getStore(l){return t.get(l)||null},snapshotFor(l){let d=t.get(l);return d?d.snapshot().slice():[]},subscribe(l){return n.add(l),()=>n.delete(l)}}}function ia(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function la(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function bs(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function pc(e){let t=String(e||""),r=t.startsWith("#")?t.slice(1):t,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let i=new URLSearchParams(s).get("issue");if(i)return decodeURIComponent(i)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function fc(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function ca(e){let t=rt("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):pc(n),a=fc(n);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let l=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==l&&(window.location.hash=l)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=bs(o,n);t("goto issue %s (view=%s)",n,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?bs(n,o):`#/${n}`;t("goto view %s (id=%s)",n,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var _c=Object.freeze({workspace_config:{default_workspace:null}});function da(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:_c.workspace_config.default_workspace}}}function ua(e={}){let t=rt("state"),r={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:da(e.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let a={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?da(o.config):r.config},i=a.workspace.current?.path!==r.workspace.current?.path||a.workspace.available.length!==r.workspace.available.length||a.workspace.hidden.length!==r.workspace.hidden.length||a.workspace.hidden.some((d,p)=>d!==r.workspace.hidden[p]),l=a.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;a.selected_id===r.selected_id&&a.view===r.view&&a.filters.status===r.filters.status&&a.filters.search===r.filters.search&&a.filters.type===r.filters.type&&a.board.closed_filter===r.board.closed_filter&&a.worker.selected_parent_id===r.worker.selected_parent_id&&a.worker.show_closed_children.length===r.worker.show_closed_children.length&&a.worker.show_closed_children.every((d,p)=>d===r.worker.show_closed_children[p])&&!i&&!l||(r=a,t("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function pa(e){let t=rt("activity"),r=0,n=new Map,s=1;function o(){if(!e)return;let d=r>0;e.toggleAttribute("hidden",!d),e.setAttribute("aria-busy",d?"true":"false")}function a(){r+=1,t("start count=%d",r),o()}function i(){let d=r;r=Math.max(0,r-1),d<=0?t("done called but count was already %d",d):t("done count=%d\u2192%d",d,r),o()}function l(d){return async(f,g)=>{let A=s++,x=Date.now();n.set(A,{type:f,start_ts:x}),t("request start id=%d type=%s count=%d",A,f,r+1),a();let T=!1,P=()=>{T||(T=!0,n.delete(A),i())},w=setTimeout(()=>{T||(t("request TIMEOUT id=%d type=%s elapsed=%dms",A,f,Date.now()-x),P())},3e4);try{let Y=await d(f,g),V=Date.now()-x;return t("request done id=%d type=%s elapsed=%dms",A,f,V),Y}catch(Y){let V=Date.now()-x;throw t("request error id=%d type=%s elapsed=%dms err=%o",A,f,V,Y),Y}finally{clearTimeout(w),P()}}}return o(),{wrapSend:l,start:a,done:i,getCount:()=>r,getActiveRequests:()=>{let d=Date.now();return Array.from(n.entries()).map(([p,f])=>({id:p,type:f.type,elapsed_ms:d-f.start_ts}))}}}function te(e,t="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=e,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",t==="success"?n.style.background="#156d36":t==="warning"?n.style.background="#a36a00":t==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function xn(e=void 0,t=void 0){function r(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function n(o,a,i){let l=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return l.sort(na),l;switch(i){case"created_desc":return l.sort(br),l;case"created_asc":return l.sort(ea),l;case"updated_desc":return l.sort(ta),l;case"priority":return l.sort(ra),l;case"manual":default:{let d=r();return d?l.sort(wn(d)):l.sort(br),l}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let i of a)try{i()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function nr(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function bt(e){let t=nr(e);if(t===null)return"";let r=new Date(t),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function Rt(e,t){let r=nr(e);if(r===null)return"";let s=(typeof t=="number"?t:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let i=Math.floor(s/864e5);if(i<7)return`${i}\uC77C \uC804`;let l=Math.floor(i/7);if(i<30)return`${l}\uC8FC \uC804`;let d=Math.floor(i/30);return d<12?`${d}\uAC1C\uC6D4 \uC804`:`${Math.floor(i/365)}\uB144 \uC804`}function Sn(e){if(!Array.isArray(e))return null;let t=null,r=-1;for(let n of e){if(!n||n.status!=="in_progress")continue;let s=nr(n.updated_at)??0;if(t===null||s>r){t=n,r=s;continue}s===r&&String(n.id)<String(t.id)&&(t=n)}return t}function An(e){let t=e.transport,r=e.uiOrderStore;function n(a,i){return"renormalize"in a?a.renormalize:[{bead_id:i,rank:a.rank}]}function s(a,i){let l={...a.order};for(let d of i)l[d.bead_id]=d.rank;r&&r.set({revision:a.revision,order:l})}async function o(a,i,l){if(!t||!r)return;let d=r.get()||{revision:0,order:{}},p=n(gs(i,l,d.order),a);s(d,p);let f=await t("ui-order-set",{expected_revision:d.revision,entries:p});if(f&&f.conflict){let g={revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}};r.set(g);let A=n(gs(i,l,g.order),a);s(g,A);let x=await t("ui-order-set",{expected_revision:g.revision,entries:A});x&&x.applied&&r.set({revision:typeof x.revision=="number"?x.revision:0,order:x.order||{}})}else f&&f.applied&&r.set({revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}})}return{applyReorder:o}}function Tn(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function vs(e,t){return!t||typeof e!="string"||e.length===0||Tn(t.visible_labels).includes(e)?!0:Tn(t.hidden_labels).includes(e)?!1:!Tn(t.hidden_prefixes).some(r=>r.length>0&&e.startsWith(r))}function En(e,t){return Tn(e).filter(r=>vs(r,t))}function sr(e,t){let r=e&&e.chips?e.chips[t]:void 0;return typeof r=="boolean"?r:!0}var mc={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},_a={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},fa={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},gc={review:"\u2713",skip:"\u2298"},or={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function hc(e,t,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function ma(e){let t=e&&e.fill||"none";return t==="none"?or.none:e&&e.stale===!0?or.stale:t==="dim"?or.dim:e&&e.glyph==="review"?or.review:e&&e.glyph==="skip"?or.skip:or.done}function bc(e){if(!e||e.fill==="none"||!e.approval_state)return ma(e);let t=[];return e.glyph==="review"?t.push(or.review):e.glyph==="skip"&&t.push(or.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function vc(e,t,r){let n=mc[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,a=gc[t&&t.glyph||""]||"",i="bar";s==="dim"?i+=` b-${n} dim`:s==="full"&&(i+=` b-${n} full`),o&&(i+=" stale"),r&&(i+=" cur");let l=s==="none"?"lbl":`lbl l-${n} on`,d=r?`color: var(--stage-${n}-on)`:"";return c`
    <div class="seg">
      <div class=${i} style=${d}>${a}</div>
      <div class=${l}>
        ${_a[e]||e}
      </div>
    </div>
  `}function Cn(e,t){if(!e||!e.stages)return"";let r=fa[e.route]||fa.spec_backed,n=e.stages,s=hc(r,n,String(t||"open")),o=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${r.map(a=>`${_a[a]||a} ${a==="plan"?bc(n[a]||{}):ma(n[a]||{})}`).join(" \xB7 ")}`;return c`
    <div class="stp" role="img" aria-label=${o}>
      ${r.map(a=>vc(a,n[a]||{},a===s))}
    </div>
  `}function yc(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var ga=2;function kc(e){if(!e)return[];let t=[];if(e.external){let n=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(c`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(e.blockers)?e.blockers:[];if(r.length>0){let n=r.slice(0,ga).join(", "),s=r.length-ga,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;t.push(c`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function wc(e,t){let r=t.policy||null,n=e.workflow&&e.workflow.chips||{},s=[];if(n.route&&sr(r,"route")){let a=n.route_source==="derived";s.push(c`<span
        class="ctl-chip ctl-chip--route${a?" is-derived":""}"
        title=${a?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${a?"unset":n.route}</span
      >`)}if(n.fast_track&&sr(r,"fast_track")&&s.push(c`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&sr(r,"pr")){let a=n.pr.number;s.push(c`<span class="ctl-chip ctl-chip--pr"
        >${`PR${a!=null?` #${a}`:""}`}</span
      >`)}for(let a of En(e.labels,r))s.push(c`<span class="ctl-chip ctl-chip--label">${a}</span>`);return e.from_id&&sr(r,"from")&&s.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${a=>{a.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(a,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),sr(r,"blocked")&&s.push(...kc(e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&sr(r,"blocked")&&s.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 실패</span>`),s.length===0?"":c`<div class="board-card__chips">${s}</div>`}function $c(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function xc(e){let t=Rt(e.created_at),r=Rt(e.updated_at);return!t&&!r?"":c`<span class="board-card__times">
    ${t?c`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${bt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&r?c`<span class="board-card__time-sep">·</span>`:""}
    ${r?c`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${bt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function Sc(e,t){let r=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=t.isExpanded?t.isExpanded(e.id):!0,o=n>0?r.children.slice().sort(sa):r.children;return c`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?c`<button
              type="button"
              class="board-card__roll-toggle"
              aria-expanded=${s?"true":"false"}
              @click=${a=>t.onRollupToggle&&t.onRollupToggle(a,e.id)}
            >
              children ${r.count}/${n} ${s?"\u25B4":"\u25BE"}
            </button>`:c`<span class="board-card__roll-none">children 없음</span>`}
        ${xc(e)}
      </div>
      ${n>0&&r.current?c`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${r.current.title||r.current.id}</span
            >
          </div>`:""}
      ${s&&n>0?c`<div class="board-card__roll-list">
            ${o.map((a,i)=>c`<button
                  type="button"
                  class="board-card__roll-child"
                  @click=${l=>t.onChildClick&&t.onChildClick(l,a.id)}
                >
                  <span class=${$c(a.status)}>●</span>
                  <span class="board-card__roll-child-ord">${i+1}</span>
                  <span class="board-card__roll-child-title"
                    >${a.title||a.id}</span
                  >
                </button>`)}
          </div>`:""}
    </div>
  `}function Rn(e,t){let r=yc(e.priority);return c`
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
        ${r?c`<span class="board-card__pri">${r}</span>`:""}
      </div>
      <div class="board-card__title">${e.title||"(\uC81C\uBAA9 \uC5C6\uC74C)"}</div>
      ${wc(e,t)}
      ${e.workflow&&sr(t.policy||null,"stepper")?Cn(e.workflow,e.status):""}
      ${Sc(e,t)}
    </article>
  `}function Ir(e,t){let r=Array.isArray(e.items)?e.items.length:0,n=e.is_closed===!0;return c`
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
        ${n?c`<select
              class="board-column__closed-range"
              aria-label="Closed period"
              @change=${t.onClosedRangeChange}
            >
              ${zt.map(o=>c`<option
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
        ${e.items.map(o=>Rn(o,t))}
      </div>
    </section>
  `}function ha(e,t,r){return c`
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
          ${e.items.length===0?c`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(n=>Rn(n,t))}
        </div>
      </div>
    </dialog>
  `}var Ac=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],Tc=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],Ec=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function Cc(e,t,r){let n=e.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return c`
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
      ${r.label_menu_open?c`<div class="board-filter__label-menu" role="group">
            ${r.label_options.length===0?c`<div class="board-filter__label-empty">라벨 없음</div>`:r.label_options.map(o=>c`<label class="board-filter__label-row">
                      <input
                        type="checkbox"
                        .checked=${e.labels.includes(o)}
                        @change=${()=>t.onLabelToggle(o)}
                      />
                      <span>${o}</span>
                    </label>`)}
            ${n>0?c`<button
                  type="button"
                  class="board-filter__label-clear"
                  @click=${t.onLabelClear}
                >
                  선택 해제
                </button>`:""}
          </div>`:""}
    </div>
  `}function ba(e,t,r){return c`
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
        ${Ac.map(n=>c`<option
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
        ${Tc.map(n=>c`<option
              value=${n.value}
              ?selected=${e.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${Cc(e,t,r)}
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
        ${Ec.map(n=>c`<option
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
  `}var Rc=200,Ic={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},Lc=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),va="beads-ui.board.sort",ya=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function Oc(){try{let e=window.localStorage.getItem(va);if(e&&ya.has(e))return e}catch{}return"created_desc"}function ka(e,t){let r=rt("views:board"),n=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,i=t.displayPolicyStore,l=t.workerQueueStore,d=t.onClosedRangeChange,p=t.onNewIssue,f=t.closedRange||Lt,g=s?xn(s,a):null,A=An({transport:o,uiOrderStore:a}),x=[],T=[],P=[],w=[],Y=[],V=[],q=!1,E=0,S=Oc(),L=new Map,C=new Map,le=new Map,$e=new Set,de={search:"",priority:"",type:"",labels:[]},me=!1,Le=null;function Ge(M){return String(M.status||"open")==="open"}function Ye(M){let W=String(M.status||"open");return W==="open"||W==="blocked"}function Me(M){let W=de.search.trim().toLowerCase(),ce=de.priority,ue=de.type,he=de.labels;return M.filter(Te=>{if(W){let He=String(Te.id||"").toLowerCase(),Qe=String(Te.title||"").toLowerCase();if(!He.includes(W)&&!Qe.includes(W))return!1}if(ce!==""&&String(Te.priority)!==ce||ue!==""&&String(Te.issue_type||"")!==ue)return!1;if(he.length>0){let He=Array.isArray(Te.labels)?Te.labels:[];if(!he.some(Qe=>He.includes(Qe)))return!1}return!0})}function Be(){let M=new Set;for(let W of[x,T,P,w,Y,V])for(let ce of W){let ue=Array.isArray(ce.labels)?ce.labels:[];for(let he of ue)typeof he=="string"&&he.length>0&&M.add(he)}return Array.from(M).sort()}function ge(){return de.search.trim()!==""||de.priority!==""||de.type!==""||de.labels.length>0}function ye(){try{if(g){let M=g.selectBoardColumn("tab:board:in-progress","in_progress",S),W=g.selectBoardColumn("tab:board:blocked","blocked",S).filter(Ye),ce=new Set(M.map(u=>u.id)),ue=g.selectBoardColumn("tab:board:ready","ready",S).filter(u=>Ge(u)&&!ce.has(u.id)),he=g.selectBoardColumn("tab:board:resolved","resolved",S),Te=g.selectBoardColumn("tab:board:deferred","deferred",S),He=g.selectBoardColumn("tab:board:closed","closed").slice(0,Rc),Qe=[...W,...ue,...M,...he,...He];Re(Qe);let Ee=new Set;for(let u of Qe)u&&u.id&&!ys(u)&&Ee.add(u.id);let Ve=!ge();x=Ve?Gr(W,Ee):W,T=Ve?Gr(ue,Ee):ue,P=Ve?Gr(M,Ee):M,w=Ve?Gr(he,Ee):he,Y=Te,E=Te.length,V=Ve?Gr(He,Ee):He,L=new Map;for(let u of x)L.set(u.id,"open");for(let u of T)L.set(u.id,"open");for(let u of P)L.set(u.id,"in_progress");for(let u of w)L.set(u.id,"resolved");for(let u of Y)L.set(u.id,"deferred");for(let u of V)L.set(u.id,"closed");C=new Map;for(let u of x)C.set(u.id,"blocked-col");for(let u of T)C.set(u.id,"ready-col");for(let u of P)C.set(u.id,"in-progress-col");for(let u of w)C.set(u.id,"resolved-col");for(let u of V)C.set(u.id,"closed-col")}ze()}catch{x=[],T=[],P=[],w=[],Y=[],V=[],le=new Map,ze()}}function Re(M){let W=new Map;for(let ue of M)ue&&ue.id&&!W.has(ue.id)&&W.set(ue.id,ue);let ce=new Map;for(let ue of W.values()){let he=ys(ue);if(!he)continue;let Te=ce.get(he);Te||(Te=[],ce.set(he,Te)),Te.push({id:ue.id,title:ue.title,status:ue.status,metadata:ue.metadata,created_at:ue.created_at,updated_at:ue.updated_at})}le=ce}function J(M){let W=le.get(M)||[],ce=0;for(let he of W)(he.status==="resolved"||he.status==="closed")&&(ce+=1);let ue=Sn(W);return{total:W.length,count:ce,current:ue,children:W}}function H(M){return!$e.has(M)}function X(M,W){M.preventDefault(),M.stopPropagation(),$e.has(W)?$e.delete(W):$e.add(W),ze()}function Oe(M,W){M.preventDefault(),M.stopPropagation(),n(W)}function _e(M,W){M.preventDefault(),M.stopPropagation(),n(W)}function ke(M,W){Le||n(W)}function B(M,W){M.preventDefault(),M.stopPropagation(),Dc(W).then(ce=>{ce&&te("\uBCF5\uC0AC\uB428","success",1200)})}function O(M,W){Le=W,M.dataTransfer&&(M.dataTransfer.setData("text/plain",W),M.dataTransfer.effectAllowed="move"),M.target.classList.add("board-card--dragging")}function oe(M){M.target.classList.remove("board-card--dragging"),Ne(),setTimeout(()=>{Le=null},0)}function ve(M){let W=String(M.target.value||"");!W||W===f||(f=W,d&&d(W),ze())}function Ae(){return i?i.get():null}function Xe(M){let W=l?l.get():null,ce=W?W.cleanup_failed:null;if(!ce||typeof ce!="object"||Array.isArray(ce))return null;let ue=ce[M];return!ue||typeof ue!="object"||Array.isArray(ue)?null:ue}let Ie={onCardClick:ke,onCopyId:B,onDragStart:O,onDragEnd:oe,onClosedRangeChange:ve,rollupFor:J,isExpanded:H,onRollupToggle:X,onChildClick:Oe,onFromChipClick:_e,cleanupFailureFor:Xe,get policy(){return Ae()}};function D(M,W){Le||(De(),n(W))}function U(M,W){M.preventDefault(),M.stopPropagation(),De(),n(W)}let R={...Ie,onCardClick:D,onChildClick:U,onFromChipClick:U,get policy(){return Ae()}};function y(M){let W=M.target,ce=e.querySelector(".board-filter__labels");W&&ce&&ce.contains(W)||K()}function z(M){M.key==="Escape"&&K()}function F(){me||(me=!0,document.addEventListener("mousedown",y),document.addEventListener("keydown",z),ze())}function K(){me&&(me=!1,document.removeEventListener("mousedown",y),document.removeEventListener("keydown",z),ze())}function ae(M){M.key==="Escape"&&De()}function xe(){q||(q=!0,document.addEventListener("keydown",ae),ze())}function De(){q&&(q=!1,document.removeEventListener("keydown",ae),ze())}let at={onClose:De,onOverlayClick(M){M.target===M.currentTarget&&De()}},it={onSearchInput(M){de.search=String(M.target.value||""),ye()},onPriorityChange(M){de.priority=String(M.target.value||""),ye()},onTypeChange(M){de.type=String(M.target.value||""),ye()},onSortChange(M){let W=String(M.target.value||"");if(!(!ya.has(W)||W===S)){S=W;try{window.localStorage.setItem(va,W)}catch{}ye()}},onDeferredToggle(){q?De():xe()},onLabelMenuToggle(){me?K():F()},onLabelToggle(M){let W=de.labels.indexOf(M);W===-1?de.labels.push(M):de.labels.splice(W,1),ye()},onLabelClear(){de.labels.length!==0&&(de.labels=[],ye())},onNewIssue(){p&&p()}};function lt(){return c`
      <div class="board-view">
        ${ba(de,it,{sort_mode:S,deferred_popup_open:q,deferred_count:E,label_options:Be(),label_menu_open:me})}
        <div class="board-root">
          ${Ir({title:"Blocked",id:"blocked-col",items:Me(x)},Ie)}
          ${Ir({title:"Ready",id:"ready-col",items:Me(T)},Ie)}
          ${Ir({title:"In progress",id:"in-progress-col",items:Me(P)},Ie)}
          ${Ir({title:"Resolved",id:"resolved-col",items:Me(w)},Ie)}
          ${Ir({title:"Closed",id:"closed-col",items:Me(V),is_closed:!0,closed_range:f},Ie)}
        </div>
        ${q?ha({items:Me(Y),count:E},R,at):""}
      </div>
    `}function ze(){qe(lt(),e),Pt()}function Pt(){try{let M=e.querySelector("#deferred-popup");M&&!M.open&&(typeof M.showModal=="function"?M.showModal():M.setAttribute("open",""));let W=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let ce of W)Array.from(ce.querySelectorAll(".board-card")).forEach((he,Te)=>{he.tabIndex=Te===0?0:-1})}catch{}}async function vt(M,W){if(!o){te("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:M,status:W}),te("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(ce){r("update-status failed: %o",ce),te("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function _t(M){switch(M){case"blocked-col":return x;case"ready-col":return T;case"in-progress-col":return P;case"resolved-col":return w;default:return[]}}function dt(M,W,ce){if(!o||!a)return;let ue=_t(M),he=ue.find(Ve=>Ve.id===W);if(!he)return;let Te=ue.filter(Ve=>Ve.id!==W),He=ce.closest?ce.closest(".board-card"):null,Qe=Te.length;if(He){let Ve=He.getAttribute("data-issue-id");if(Ve===W)return;let u=Te.findIndex(k=>k.id===Ve);u>=0&&(Qe=u)}let Ee=Te.slice();Ee.splice(Qe,0,he),A.applyReorder(W,Ee,Qe)}function Ne(){for(let M of Array.from(e.querySelectorAll(".board-column--drag-over")))M.classList.remove("board-column--drag-over")}let tt=null;e.addEventListener("dragover",M=>{M.preventDefault(),M.dataTransfer&&(M.dataTransfer.dropEffect="move");let ce=M.target.closest(".board-column");ce&&ce!==tt&&(tt&&tt.classList.remove("board-column--drag-over"),ce.classList.add("board-column--drag-over"),tt=ce)}),e.addEventListener("dragleave",M=>{let W=M.relatedTarget;(!W||!e.contains(W))&&tt&&(tt.classList.remove("board-column--drag-over"),tt=null)}),e.addEventListener("drop",M=>{M.preventDefault(),tt&&(tt.classList.remove("board-column--drag-over"),tt=null);let W=M.target,ce=W.closest(".board-column");if(!ce)return;let ue=M.dataTransfer?.getData("text/plain")||"";if(!ue)return;let he=ce.id,Te=C.get(ue);if(Te&&Te===he){if(Lc.has(he)){if(S!=="manual"){te("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}dt(he,ue,W)}return}let He=Ic[he];if(!He){te("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}L.get(ue)!==He&&vt(ue,He)}),e.addEventListener("keydown",M=>{let W=M.target;if(!(W instanceof HTMLElement))return;let ce=String(W.tagName||"").toLowerCase();if(ce==="input"||ce==="textarea"||ce==="select"||ce==="button"||ce==="a"||W.isContentEditable===!0)return;let ue=W.closest(".board-card");if(!ue)return;let he=String(M.key||"");if(he==="Enter"||he===" "){M.preventDefault();let Ee=ue.getAttribute("data-issue-id");Ee&&n(Ee);return}if(he!=="ArrowUp"&&he!=="ArrowDown"&&he!=="ArrowLeft"&&he!=="ArrowRight")return;M.preventDefault();let Te=ue.closest(".board-column");if(!Te)return;let He=Array.from(Te.querySelectorAll(".board-card")),Qe=He.indexOf(ue);if(he==="ArrowDown"&&Qe<He.length-1){ut(ue,He[Qe+1]);return}if(he==="ArrowUp"&&Qe>0){ut(ue,He[Qe-1]);return}if(he==="ArrowLeft"||he==="ArrowRight"){let Ee=Array.from(e.querySelectorAll(".board-column")),Ve=Ee.indexOf(Te),u=he==="ArrowRight"?1:-1,k=Ve+u;for(;k>=0&&k<Ee.length;){let j=Ee[k].querySelector(".board-card");if(j){ut(ue,j);return}k+=u}}});function ut(M,W){try{M.tabIndex=-1,W.tabIndex=0,W.focus()}catch{}}let nt=null;g&&g.subscribe&&(nt=g.subscribe(()=>{try{ye()}catch{}}));let st=null;i&&i.subscribe&&(st=i.subscribe(()=>{try{ye()}catch{}}));let pt=null;return l&&l.subscribe&&(pt=l.subscribe(()=>{ze()})),{async load(){r("load"),ye()},clear(){K(),De(),nt&&(nt(),nt=null),st&&(st(),st=null),pt&&(pt(),pt=null),e.replaceChildren(),x=[],T=[],P=[],w=[],Y=[],V=[],L=new Map,C=new Map}}}function ys(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Gr(e,t){return e.filter(r=>{let n=ys(r);return!(n&&t.has(n))})}async function Dc(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let r=!1;try{r=document.execCommand("copy")}finally{t.remove()}return r}catch{return!1}}async function vr(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}var Aa="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function ft(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Zt=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],Yr=[...Zt,"reasoning_output_tokens"],Pc=["implementation","review-consult"];function ks(e){let t=0;for(let r of Zt)t+=ft(e?.[r]);return t}function Mc(e){return!e||typeof e!="object"?!1:Zt.some(t=>Number.isFinite(e[t]))}function wa(e){return!e||typeof e!="object"?!1:Yr.some(t=>Number.isFinite(e[t]))}function Nc(e){let t={};for(let r of Yr)e&&Number.isFinite(e[r])&&(t[r]=e[r]);return t}function $a(e){let t={};for(let r of Yr)Number.isFinite(e[r])&&(t[r]=e[r]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function xa(e,t){return e==="codex"?ft(t.input_tokens)+ft(t.output_tokens):ks(t)}function Fc(e){return e==="claude"?"Claude":"Codex"}function qc(e){return`\u03C4 ${Ta(e)}`}function Bc(e,t){let r=t.breakdown||{},n=[`\uC785\uB825 ${ft(r.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${ft(r.output_tokens).toLocaleString("en-US")}`];e==="claude"?n.push(`\uCE90\uC2DC\uC77D\uAE30 ${ft(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${ft(r.cache_creation_input_tokens).toLocaleString("en-US")}`):(n.push(`\uCE90\uC2DC\uC77D\uAE30 ${ft(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${ft(r.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(r.reasoning_output_tokens)&&n.push(`\uCD94\uB860\uCD9C\uB825 ${ft(r.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,n.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(Aa),o.join(`
`)}function gt(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let r of["claude","codex"]){let n=e.providers[r];n&&t.push({provider:r,label:`${Fc(r)} ${qc(n.subtotal)}${typeof n.total_cost_usd=="number"&&Number.isFinite(n.total_cost_usd)?` \xB7 $${n.total_cost_usd.toFixed(2)}`:""}`,tooltip:Bc(r,n)})}return t}function Ln(e){let t={},r={claude:!0,codex:!1},n={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let i=t[o];i||(i={subtotal:0,breakdown:{}},t[o]=i),i.subtotal+=a.subtotal;for(let l of Yr)Number.isFinite(a.breakdown[l])&&(i.breakdown[l]=ft(i.breakdown[l])+ft(a.breakdown[l]));a.replayed&&(i.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?n.claude+=a.total_cost_usd:r.claude=!1)}return t.claude&&r.claude&&(t.claude.total_cost_usd=n.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function ws(e){return!e||typeof e!="object"?null:Ot({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function Uc(e){return e==="codex"?"codex":"claude"}function ar(){return{subtotal:0,breakdown:Nc(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function In(e,t,r){e.subtotal+=t.subtotal;for(let n of Yr)Number.isFinite(t.usage[n])&&(e.breakdown[n]=ft(e.breakdown[n])+ft(t.usage[n]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),r&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function Sa(e,t){let r={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(r.legs=e.legs),e.replayed&&(r.replayed=!0),r}function Ta(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Lr(e){return Mc(e)?`\u03C4 ${Ta(ks(e))}`:null}function qt(e){let t=Lr(e);if(!t)return null;let r=e?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${t} \xB7 $${r.toFixed(2)}`:t}function Or(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${ft(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${ft(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${ft(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${ft(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${ks(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&r.push(Aa),r.join(`
`)}function Ot(e,t){let r={claude:ar(),codex:ar()},n={orchestrator:{claude:ar(),codex:ar()},implementation:{claude:ar(),codex:ar()},"review-consult":{claude:ar(),codex:ar()}},s=new Set;for(let i of Object.values(e||{})){if(!i||i.bead_id!==t)continue;let l=i.usage;if(wa(l)){let p=Uc(i.runner),f=$a(l),g={provider:p,role:"orchestrator",attempt_id:String(i.attempt_id||""),usage:f,subtotal:xa(p,f)};f.replayed===!0&&(g.replayed=!0),typeof i.model=="string"&&(g.model=i.model),typeof i.session_id=="string"&&(g.session_id=i.session_id),In(r[p],g,!0),In(n.orchestrator[p],g,!0)}let d=Array.isArray(i.usage_legs)?i.usage_legs:[];for(let p of d){if(!p||p.provider!=="codex"||!Pc.includes(p.role)||!wa(p.usage))continue;let f=typeof p.receipt_id=="string"&&p.receipt_id.length>0?p.receipt_id:null;if(!f||s.has(f))continue;s.add(f);let g=$a(p.usage),A={provider:"codex",role:p.role,attempt_id:String(i.attempt_id||""),usage:g,subtotal:xa("codex",g)};A.receipt_id=f,typeof p.model=="string"&&(A.model=p.model),typeof p.session_id=="string"?A.session_id=p.session_id:typeof p.thread_id=="string"&&(A.session_id=p.thread_id),typeof p.turn_id=="string"&&(A.turn_id=p.turn_id),typeof p.completed_at=="string"&&(A.completed_at=p.completed_at),g.replayed===!0&&(A.replayed=!0),In(r.codex,A,!1),In(n[A.role].codex,A,!1)}}let o={};for(let i of["claude","codex"]){let l=r[i];if(l.legs.length===0)continue;let d=Sa(l,!1);i==="claude"&&l.outer_count>0&&l.outer_cost_count===l.outer_count&&(d.total_cost_usd=l.outer_cost),o[i]=d}if(Object.keys(o).length===0)return null;let a={};for(let i of["orchestrator","implementation","review-consult"]){let l={};for(let d of["claude","codex"]){let p=n[i][d];p.legs.length>0&&(l[d]={...Sa(p,!0),legs:p.legs})}Object.keys(l).length>0&&(a[i]=l)}return{providers:o,roles:a}}var{entries:Ma,setPrototypeOf:Ea,isFrozen:jc,getPrototypeOf:zc,getOwnPropertyDescriptor:Hc}=Object,{freeze:kt,seal:Dt,create:Cs}=Object,{apply:Rs,construct:Is}=typeof Reflect<"u"&&Reflect;kt||(kt=function(t){return t});Dt||(Dt=function(t){return t});Rs||(Rs=function(t,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return t.apply(r,s)});Is||(Is=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new t(...n)});var On=wt(Array.prototype.forEach),Wc=wt(Array.prototype.lastIndexOf),Ca=wt(Array.prototype.pop),Vr=wt(Array.prototype.push),Gc=wt(Array.prototype.splice),Pn=wt(String.prototype.toLowerCase),$s=wt(String.prototype.toString),xs=wt(String.prototype.match),Kr=wt(String.prototype.replace),Yc=wt(String.prototype.indexOf),Vc=wt(String.prototype.trim),Bt=wt(Object.prototype.hasOwnProperty),yt=wt(RegExp.prototype.test),Zr=Kc(TypeError);function wt(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return Rs(e,t,n)}}function Kc(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return Is(e,r)}}function Pe(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Pn;Ea&&Ea(e,null);let n=t.length;for(;n--;){let s=t[n];if(typeof s=="string"){let o=r(s);o!==s&&(jc(t)||(t[n]=o),s=o)}e[s]=!0}return e}function Zc(e){for(let t=0;t<e.length;t++)Bt(e,t)||(e[t]=null);return e}function Xt(e){let t=Cs(null);for(let[r,n]of Ma(e))Bt(e,r)&&(Array.isArray(n)?t[r]=Zc(n):n&&typeof n=="object"&&n.constructor===Object?t[r]=Xt(n):t[r]=n);return t}function Xr(e,t){for(;e!==null;){let n=Hc(e,t);if(n){if(n.get)return wt(n.get);if(typeof n.value=="function")return wt(n.value)}e=zc(e)}function r(){return null}return r}var Ra=kt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Ss=kt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),As=kt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Xc=kt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Ts=kt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Qc=kt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Ia=kt(["#text"]),La=kt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Es=kt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Oa=kt(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Dn=kt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Jc=Dt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),ed=Dt(/<%[\w\W]*|[\w\W]*%>/gm),td=Dt(/\$\{[\w\W]*/gm),rd=Dt(/^data-[\-\w.\u00B7-\uFFFF]+$/),nd=Dt(/^aria-[\-\w]+$/),Na=Dt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),sd=Dt(/^(?:\w+script|data):/i),od=Dt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Fa=Dt(/^html$/i),ad=Dt(/^[a-z][.\w]*(-[.\w]+)+$/i),Da=Object.freeze({__proto__:null,ARIA_ATTR:nd,ATTR_WHITESPACE:od,CUSTOM_ELEMENT:ad,DATA_ATTR:rd,DOCTYPE_NAME:Fa,ERB_EXPR:ed,IS_ALLOWED_URI:Na,IS_SCRIPT_OR_DATA:sd,MUSTACHE_EXPR:Jc,TMPLIT_EXPR:td}),Qr={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},id=function(){return typeof window>"u"?null:window},ld=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Pa=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function qa(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:id(),t=Q=>qa(Q);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==Qr.document||!e.Element)return t.isSupported=!1,t;let{document:r}=e,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:i,Element:l,NodeFilter:d,NamedNodeMap:p=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:f,DOMParser:g,trustedTypes:A}=e,x=l.prototype,T=Xr(x,"cloneNode"),P=Xr(x,"remove"),w=Xr(x,"nextSibling"),Y=Xr(x,"childNodes"),V=Xr(x,"parentNode");if(typeof a=="function"){let Q=r.createElement("template");Q.content&&Q.content.ownerDocument&&(r=Q.content.ownerDocument)}let q,E="",{implementation:S,createNodeIterator:L,createDocumentFragment:C,getElementsByTagName:le}=r,{importNode:$e}=n,de=Pa();t.isSupported=typeof Ma=="function"&&typeof V=="function"&&S&&S.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:me,ERB_EXPR:Le,TMPLIT_EXPR:Ge,DATA_ATTR:Ye,ARIA_ATTR:Me,IS_SCRIPT_OR_DATA:Be,ATTR_WHITESPACE:ge,CUSTOM_ELEMENT:ye}=Da,{IS_ALLOWED_URI:Re}=Da,J=null,H=Pe({},[...Ra,...Ss,...As,...Ts,...Ia]),X=null,Oe=Pe({},[...La,...Es,...Oa,...Dn]),_e=Object.seal(Cs(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),ke=null,B=null,O=Object.seal(Cs(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),oe=!0,ve=!0,Ae=!1,Xe=!0,Ie=!1,D=!0,U=!1,R=!1,y=!1,z=!1,F=!1,K=!1,ae=!0,xe=!1,De="user-content-",at=!0,it=!1,lt={},ze=null,Pt=Pe({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),vt=null,_t=Pe({},["audio","video","img","source","image","track"]),dt=null,Ne=Pe({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),tt="http://www.w3.org/1998/Math/MathML",ut="http://www.w3.org/2000/svg",nt="http://www.w3.org/1999/xhtml",st=nt,pt=!1,M=null,W=Pe({},[tt,ut,nt],$s),ce=Pe({},["mi","mo","mn","ms","mtext"]),ue=Pe({},["annotation-xml"]),he=Pe({},["title","style","font","a","script"]),Te=null,He=["application/xhtml+xml","text/html"],Qe="text/html",Ee=null,Ve=null,u=r.createElement("form"),k=function(b){return b instanceof RegExp||b instanceof Function},j=function(){let b=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Ve&&Ve===b)){if((!b||typeof b!="object")&&(b={}),b=Xt(b),Te=He.indexOf(b.PARSER_MEDIA_TYPE)===-1?Qe:b.PARSER_MEDIA_TYPE,Ee=Te==="application/xhtml+xml"?$s:Pn,J=Bt(b,"ALLOWED_TAGS")?Pe({},b.ALLOWED_TAGS,Ee):H,X=Bt(b,"ALLOWED_ATTR")?Pe({},b.ALLOWED_ATTR,Ee):Oe,M=Bt(b,"ALLOWED_NAMESPACES")?Pe({},b.ALLOWED_NAMESPACES,$s):W,dt=Bt(b,"ADD_URI_SAFE_ATTR")?Pe(Xt(Ne),b.ADD_URI_SAFE_ATTR,Ee):Ne,vt=Bt(b,"ADD_DATA_URI_TAGS")?Pe(Xt(_t),b.ADD_DATA_URI_TAGS,Ee):_t,ze=Bt(b,"FORBID_CONTENTS")?Pe({},b.FORBID_CONTENTS,Ee):Pt,ke=Bt(b,"FORBID_TAGS")?Pe({},b.FORBID_TAGS,Ee):Xt({}),B=Bt(b,"FORBID_ATTR")?Pe({},b.FORBID_ATTR,Ee):Xt({}),lt=Bt(b,"USE_PROFILES")?b.USE_PROFILES:!1,oe=b.ALLOW_ARIA_ATTR!==!1,ve=b.ALLOW_DATA_ATTR!==!1,Ae=b.ALLOW_UNKNOWN_PROTOCOLS||!1,Xe=b.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Ie=b.SAFE_FOR_TEMPLATES||!1,D=b.SAFE_FOR_XML!==!1,U=b.WHOLE_DOCUMENT||!1,z=b.RETURN_DOM||!1,F=b.RETURN_DOM_FRAGMENT||!1,K=b.RETURN_TRUSTED_TYPE||!1,y=b.FORCE_BODY||!1,ae=b.SANITIZE_DOM!==!1,xe=b.SANITIZE_NAMED_PROPS||!1,at=b.KEEP_CONTENT!==!1,it=b.IN_PLACE||!1,Re=b.ALLOWED_URI_REGEXP||Na,st=b.NAMESPACE||nt,ce=b.MATHML_TEXT_INTEGRATION_POINTS||ce,ue=b.HTML_INTEGRATION_POINTS||ue,_e=b.CUSTOM_ELEMENT_HANDLING||{},b.CUSTOM_ELEMENT_HANDLING&&k(b.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(_e.tagNameCheck=b.CUSTOM_ELEMENT_HANDLING.tagNameCheck),b.CUSTOM_ELEMENT_HANDLING&&k(b.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(_e.attributeNameCheck=b.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),b.CUSTOM_ELEMENT_HANDLING&&typeof b.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(_e.allowCustomizedBuiltInElements=b.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Ie&&(ve=!1),F&&(z=!0),lt&&(J=Pe({},Ia),X=[],lt.html===!0&&(Pe(J,Ra),Pe(X,La)),lt.svg===!0&&(Pe(J,Ss),Pe(X,Es),Pe(X,Dn)),lt.svgFilters===!0&&(Pe(J,As),Pe(X,Es),Pe(X,Dn)),lt.mathMl===!0&&(Pe(J,Ts),Pe(X,Oa),Pe(X,Dn))),b.ADD_TAGS&&(typeof b.ADD_TAGS=="function"?O.tagCheck=b.ADD_TAGS:(J===H&&(J=Xt(J)),Pe(J,b.ADD_TAGS,Ee))),b.ADD_ATTR&&(typeof b.ADD_ATTR=="function"?O.attributeCheck=b.ADD_ATTR:(X===Oe&&(X=Xt(X)),Pe(X,b.ADD_ATTR,Ee))),b.ADD_URI_SAFE_ATTR&&Pe(dt,b.ADD_URI_SAFE_ATTR,Ee),b.FORBID_CONTENTS&&(ze===Pt&&(ze=Xt(ze)),Pe(ze,b.FORBID_CONTENTS,Ee)),at&&(J["#text"]=!0),U&&Pe(J,["html","head","body"]),J.table&&(Pe(J,["tbody"]),delete ke.tbody),b.TRUSTED_TYPES_POLICY){if(typeof b.TRUSTED_TYPES_POLICY.createHTML!="function")throw Zr('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof b.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Zr('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');q=b.TRUSTED_TYPES_POLICY,E=q.createHTML("")}else q===void 0&&(q=ld(A,s)),q!==null&&typeof E=="string"&&(E=q.createHTML(""));kt&&kt(b),Ve=b}},pe=Pe({},[...Ss,...As,...Xc]),be=Pe({},[...Ts,...Qc]),we=function(b){let G=V(b);(!G||!G.tagName)&&(G={namespaceURI:st,tagName:"template"});let _=Pn(b.tagName),v=Pn(G.tagName);return M[b.namespaceURI]?b.namespaceURI===ut?G.namespaceURI===nt?_==="svg":G.namespaceURI===tt?_==="svg"&&(v==="annotation-xml"||ce[v]):!!pe[_]:b.namespaceURI===tt?G.namespaceURI===nt?_==="math":G.namespaceURI===ut?_==="math"&&ue[v]:!!be[_]:b.namespaceURI===nt?G.namespaceURI===ut&&!ue[v]||G.namespaceURI===tt&&!ce[v]?!1:!be[_]&&(he[_]||!pe[_]):!!(Te==="application/xhtml+xml"&&M[b.namespaceURI]):!1},se=function(b){Vr(t.removed,{element:b});try{V(b).removeChild(b)}catch{P(b)}},Se=function(b,G){try{Vr(t.removed,{attribute:G.getAttributeNode(b),from:G})}catch{Vr(t.removed,{attribute:null,from:G})}if(G.removeAttribute(b),b==="is")if(z||F)try{se(G)}catch{}else try{G.setAttribute(b,"")}catch{}},fe=function(b){let G=null,_=null;if(y)b="<remove></remove>"+b;else{let ne=xs(b,/^[\r\n\t ]+/);_=ne&&ne[0]}Te==="application/xhtml+xml"&&st===nt&&(b='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+b+"</body></html>");let v=q?q.createHTML(b):b;if(st===nt)try{G=new g().parseFromString(v,Te)}catch{}if(!G||!G.documentElement){G=S.createDocument(st,"template",null);try{G.documentElement.innerHTML=pt?E:v}catch{}}let re=G.body||G.documentElement;return b&&_&&re.insertBefore(r.createTextNode(_),re.childNodes[0]||null),st===nt?le.call(G,U?"html":"body")[0]:U?G.documentElement:re},Je=function(b){return L.call(b.ownerDocument||b,b,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},St=function(b){return b instanceof f&&(typeof b.nodeName!="string"||typeof b.textContent!="string"||typeof b.removeChild!="function"||!(b.attributes instanceof p)||typeof b.removeAttribute!="function"||typeof b.setAttribute!="function"||typeof b.namespaceURI!="string"||typeof b.insertBefore!="function"||typeof b.hasChildNodes!="function")},mt=function(b){return typeof i=="function"&&b instanceof i};function et(Q,b,G){On(Q,_=>{_.call(t,b,G,Ve)})}let At=function(b){let G=null;if(et(de.beforeSanitizeElements,b,null),St(b))return se(b),!0;let _=Ee(b.nodeName);if(et(de.uponSanitizeElement,b,{tagName:_,allowedTags:J}),D&&b.hasChildNodes()&&!mt(b.firstElementChild)&&yt(/<[/\w!]/g,b.innerHTML)&&yt(/<[/\w!]/g,b.textContent)||b.nodeType===Qr.progressingInstruction||D&&b.nodeType===Qr.comment&&yt(/<[/\w]/g,b.data))return se(b),!0;if(!(O.tagCheck instanceof Function&&O.tagCheck(_))&&(!J[_]||ke[_])){if(!ke[_]&&Et(_)&&(_e.tagNameCheck instanceof RegExp&&yt(_e.tagNameCheck,_)||_e.tagNameCheck instanceof Function&&_e.tagNameCheck(_)))return!1;if(at&&!ze[_]){let v=V(b)||b.parentNode,re=Y(b)||b.childNodes;if(re&&v){let ne=re.length;for(let ee=ne-1;ee>=0;--ee){let m=T(re[ee],!0);m.__removalCount=(b.__removalCount||0)+1,v.insertBefore(m,w(b))}}}return se(b),!0}return b instanceof l&&!we(b)||(_==="noscript"||_==="noembed"||_==="noframes")&&yt(/<\/no(script|embed|frames)/i,b.innerHTML)?(se(b),!0):(Ie&&b.nodeType===Qr.text&&(G=b.textContent,On([me,Le,Ge],v=>{G=Kr(G,v," ")}),b.textContent!==G&&(Vr(t.removed,{element:b.cloneNode()}),b.textContent=G)),et(de.afterSanitizeElements,b,null),!1)},Mt=function(b,G,_){if(ae&&(G==="id"||G==="name")&&(_ in r||_ in u))return!1;if(!(ve&&!B[G]&&yt(Ye,G))){if(!(oe&&yt(Me,G))){if(!(O.attributeCheck instanceof Function&&O.attributeCheck(G,b))){if(!X[G]||B[G]){if(!(Et(b)&&(_e.tagNameCheck instanceof RegExp&&yt(_e.tagNameCheck,b)||_e.tagNameCheck instanceof Function&&_e.tagNameCheck(b))&&(_e.attributeNameCheck instanceof RegExp&&yt(_e.attributeNameCheck,G)||_e.attributeNameCheck instanceof Function&&_e.attributeNameCheck(G,b))||G==="is"&&_e.allowCustomizedBuiltInElements&&(_e.tagNameCheck instanceof RegExp&&yt(_e.tagNameCheck,_)||_e.tagNameCheck instanceof Function&&_e.tagNameCheck(_))))return!1}else if(!dt[G]){if(!yt(Re,Kr(_,ge,""))){if(!((G==="src"||G==="xlink:href"||G==="href")&&b!=="script"&&Yc(_,"data:")===0&&vt[b])){if(!(Ae&&!yt(Be,Kr(_,ge,"")))){if(_)return!1}}}}}}}return!0},Et=function(b){return b!=="annotation-xml"&&xs(b,ye)},Ct=function(b){et(de.beforeSanitizeAttributes,b,null);let{attributes:G}=b;if(!G||St(b))return;let _={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:X,forceKeepAttr:void 0},v=G.length;for(;v--;){let re=G[v],{name:ne,namespaceURI:ee,value:m}=re,I=Ee(ne),$=m,Z=ne==="value"?$:Vc($);if(_.attrName=I,_.attrValue=Z,_.keepAttr=!0,_.forceKeepAttr=void 0,et(de.uponSanitizeAttribute,b,_),Z=_.attrValue,xe&&(I==="id"||I==="name")&&(Se(ne,b),Z=De+Z),D&&yt(/((--!?|])>)|<\/(style|title|textarea)/i,Z)){Se(ne,b);continue}if(I==="attributename"&&xs(Z,"href")){Se(ne,b);continue}if(_.forceKeepAttr)continue;if(!_.keepAttr){Se(ne,b);continue}if(!Xe&&yt(/\/>/i,Z)){Se(ne,b);continue}Ie&&On([me,Le,Ge],ot=>{Z=Kr(Z,ot," ")});let Ue=Ee(b.nodeName);if(!Mt(Ue,I,Z)){Se(ne,b);continue}if(q&&typeof A=="object"&&typeof A.getAttributeType=="function"&&!ee)switch(A.getAttributeType(Ue,I)){case"TrustedHTML":{Z=q.createHTML(Z);break}case"TrustedScriptURL":{Z=q.createScriptURL(Z);break}}if(Z!==$)try{ee?b.setAttributeNS(ee,ne,Z):b.setAttribute(ne,Z),St(b)?se(b):Ca(t.removed)}catch{Se(ne,b)}}et(de.afterSanitizeAttributes,b,null)},Ce=function Q(b){let G=null,_=Je(b);for(et(de.beforeSanitizeShadowDOM,b,null);G=_.nextNode();)et(de.uponSanitizeShadowNode,G,null),At(G),Ct(G),G.content instanceof o&&Q(G.content);et(de.afterSanitizeShadowDOM,b,null)};return t.sanitize=function(Q){let b=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},G=null,_=null,v=null,re=null;if(pt=!Q,pt&&(Q="<!-->"),typeof Q!="string"&&!mt(Q))if(typeof Q.toString=="function"){if(Q=Q.toString(),typeof Q!="string")throw Zr("dirty is not a string, aborting")}else throw Zr("toString is not a function");if(!t.isSupported)return Q;if(R||j(b),t.removed=[],typeof Q=="string"&&(it=!1),it){if(Q.nodeName){let m=Ee(Q.nodeName);if(!J[m]||ke[m])throw Zr("root node is forbidden and cannot be sanitized in-place")}}else if(Q instanceof i)G=fe("<!---->"),_=G.ownerDocument.importNode(Q,!0),_.nodeType===Qr.element&&_.nodeName==="BODY"||_.nodeName==="HTML"?G=_:G.appendChild(_);else{if(!z&&!Ie&&!U&&Q.indexOf("<")===-1)return q&&K?q.createHTML(Q):Q;if(G=fe(Q),!G)return z?null:K?E:""}G&&y&&se(G.firstChild);let ne=Je(it?Q:G);for(;v=ne.nextNode();)At(v),Ct(v),v.content instanceof o&&Ce(v.content);if(it)return Q;if(z){if(F)for(re=C.call(G.ownerDocument);G.firstChild;)re.appendChild(G.firstChild);else re=G;return(X.shadowroot||X.shadowrootmode)&&(re=$e.call(n,re,!0)),re}let ee=U?G.outerHTML:G.innerHTML;return U&&J["!doctype"]&&G.ownerDocument&&G.ownerDocument.doctype&&G.ownerDocument.doctype.name&&yt(Fa,G.ownerDocument.doctype.name)&&(ee="<!DOCTYPE "+G.ownerDocument.doctype.name+`>
`+ee),Ie&&On([me,Le,Ge],m=>{ee=Kr(ee,m," ")}),q&&K?q.createHTML(ee):ee},t.setConfig=function(){let Q=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};j(Q),R=!0},t.clearConfig=function(){Ve=null,R=!1},t.isValidAttribute=function(Q,b,G){Ve||j({});let _=Ee(Q),v=Ee(b);return Mt(_,v,G)},t.addHook=function(Q,b){typeof b=="function"&&Vr(de[Q],b)},t.removeHook=function(Q,b){if(b!==void 0){let G=Wc(de[Q],b);return G===-1?void 0:Gc(de[Q],G,1)[0]}return Ca(de[Q])},t.removeHooks=function(Q){de[Q]=[]},t.removeAllHooks=function(){de=Pa()},t}var Ba=qa();var Ua={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},ja=e=>(...t)=>({_$litDirective$:e,values:t}),Mn=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,n){this._$Ct=t,this._$AM=r,this._$Ci=n}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var Jr=class extends Mn{constructor(t){if(super(t),this.it=ct,t.type!==Ua.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===ct||t==null)return this._t=void 0,this.it=t;if(t===gr)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};Jr.directiveName="unsafeHTML",Jr.resultType=1;var za=ja(Jr);function Ps(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var kr=Ps();function Za(e){kr=e}var nn={exec:()=>null};function je(e,t=""){let r=typeof e=="string"?e:e.source,n={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace($t.caret,"$1"),r=r.replace(s,a),n},getRegex:()=>new RegExp(r,t)};return n}var cd=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),$t={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},dd=/^(?:[ \t]*(?:\n|$))+/,ud=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,pd=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,sn=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,fd=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Ms=/(?:[*+-]|\d{1,9}[.)])/,Xa=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Qa=je(Xa).replace(/bull/g,Ms).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),_d=je(Xa).replace(/bull/g,Ms).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Ns=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,md=/^[^\n]+/,Fs=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,gd=je(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Fs).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),hd=je(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Ms).getRegex(),jn="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",qs=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,bd=je("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",qs).replace("tag",jn).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Ja=je(Ns).replace("hr",sn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",jn).getRegex(),vd=je(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Ja).getRegex(),Bs={blockquote:vd,code:ud,def:gd,fences:pd,heading:fd,hr:sn,html:bd,lheading:Qa,list:hd,newline:dd,paragraph:Ja,table:nn,text:md},Ha=je("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",sn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",jn).getRegex(),yd={...Bs,lheading:_d,table:Ha,paragraph:je(Ns).replace("hr",sn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Ha).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",jn).getRegex()},kd={...Bs,html:je(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",qs).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:nn,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:je(Ns).replace("hr",sn).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Qa).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},wd=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,$d=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,ei=/^( {2,}|\\)\n(?!\s*$)/,xd=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,zn=/[\p{P}\p{S}]/u,Us=/[\s\p{P}\p{S}]/u,ti=/[^\s\p{P}\p{S}]/u,Sd=je(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Us).getRegex(),ri=/(?!~)[\p{P}\p{S}]/u,Ad=/(?!~)[\s\p{P}\p{S}]/u,Td=/(?:[^\s\p{P}\p{S}]|~)/u,Ed=je(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",cd?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),ni=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Cd=je(ni,"u").replace(/punct/g,zn).getRegex(),Rd=je(ni,"u").replace(/punct/g,ri).getRegex(),si="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Id=je(si,"gu").replace(/notPunctSpace/g,ti).replace(/punctSpace/g,Us).replace(/punct/g,zn).getRegex(),Ld=je(si,"gu").replace(/notPunctSpace/g,Td).replace(/punctSpace/g,Ad).replace(/punct/g,ri).getRegex(),Od=je("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,ti).replace(/punctSpace/g,Us).replace(/punct/g,zn).getRegex(),Dd=je(/\\(punct)/,"gu").replace(/punct/g,zn).getRegex(),Pd=je(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Md=je(qs).replace("(?:-->|$)","-->").getRegex(),Nd=je("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Md).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),qn=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Fd=je(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",qn).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),oi=je(/^!?\[(label)\]\[(ref)\]/).replace("label",qn).replace("ref",Fs).getRegex(),ai=je(/^!?\[(ref)\](?:\[\])?/).replace("ref",Fs).getRegex(),qd=je("reflink|nolink(?!\\()","g").replace("reflink",oi).replace("nolink",ai).getRegex(),Wa=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,js={_backpedal:nn,anyPunctuation:Dd,autolink:Pd,blockSkip:Ed,br:ei,code:$d,del:nn,emStrongLDelim:Cd,emStrongRDelimAst:Id,emStrongRDelimUnd:Od,escape:wd,link:Fd,nolink:ai,punctuation:Sd,reflink:oi,reflinkSearch:qd,tag:Nd,text:xd,url:nn},Bd={...js,link:je(/^!?\[(label)\]\((.*?)\)/).replace("label",qn).getRegex(),reflink:je(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",qn).getRegex()},Ls={...js,emStrongRDelimAst:Ld,emStrongLDelim:Rd,url:je(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Wa).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:je(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Wa).getRegex()},Ud={...Ls,br:je(ei).replace("{2,}","*").getRegex(),text:je(Ls.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Nn={normal:Bs,gfm:yd,pedantic:kd},en={normal:js,gfm:Ls,breaks:Ud,pedantic:Bd},jd={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Ga=e=>jd[e];function Qt(e,t){if(t){if($t.escapeTest.test(e))return e.replace($t.escapeReplace,Ga)}else if($t.escapeTestNoEncode.test(e))return e.replace($t.escapeReplaceNoEncode,Ga);return e}function Ya(e){try{e=encodeURI(e).replace($t.percentDecode,"%")}catch{return null}return e}function Va(e,t){let r=e.replace($t.findPipe,(o,a,i)=>{let l=!1,d=a;for(;--d>=0&&i[d]==="\\";)l=!l;return l?"|":" |"}),n=r.split($t.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace($t.slashPipe,"|");return n}function tn(e,t,r){let n=e.length;if(n===0)return"";let s=0;for(;s<n;){let o=e.charAt(n-s-1);if(o===t&&!r)s++;else if(o!==t&&r)s++;else break}return e.slice(0,n-s)}function zd(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return r>0?-2:-1}function Ka(e,t,r,n,s){let o=t.href,a=t.title||null,i=e[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let l={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:a,text:i,tokens:n.inlineTokens(i)};return n.state.inLink=!1,l}function Hd(e,t,r){let n=e.match(r.other.indentCodeCompensation);if(n===null)return t;let s=n[1];return t.split(`
`).map(o=>{let a=o.match(r.other.beginningSpace);if(a===null)return o;let[i]=a;return i.length>=s.length?o.slice(s.length):o}).join(`
`)}var Bn=class{constructor(e){Ze(this,"options");Ze(this,"rules");Ze(this,"lexer");this.options=e||kr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:tn(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],n=Hd(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let n=tn(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:tn(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=tn(t[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let a=!1,i=[],l;for(l=0;l<r.length;l++)if(this.rules.other.blockquoteStart.test(r[l]))i.push(r[l]),a=!0;else if(!a)i.push(r[l]);else break;r=r.slice(l);let d=i.join(`
`),p=d.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${d}`:d,s=s?`${s}
${p}`:p;let f=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(p,o,!0),this.lexer.state.top=f,r.length===0)break;let g=o.at(-1);if(g?.type==="code")break;if(g?.type==="blockquote"){let A=g,x=A.raw+`
`+r.join(`
`),T=this.blockquote(x);o[o.length-1]=T,n=n.substring(0,n.length-A.raw.length)+T.raw,s=s.substring(0,s.length-A.text.length)+T.text;break}else if(g?.type==="list"){let A=g,x=A.raw+`
`+r.join(`
`),T=this.list(x);o[o.length-1]=T,n=n.substring(0,n.length-g.raw.length)+T.raw,s=s.substring(0,s.length-A.raw.length)+T.raw,r=x.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),a=!1;for(;e;){let l=!1,d="",p="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;d=t[0],e=e.substring(d.length);let f=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,T=>" ".repeat(3*T.length)),g=e.split(`
`,1)[0],A=!f.trim(),x=0;if(this.options.pedantic?(x=2,p=f.trimStart()):A?x=t[1].length+1:(x=t[2].search(this.rules.other.nonSpaceChar),x=x>4?1:x,p=f.slice(x),x+=t[1].length),A&&this.rules.other.blankLine.test(g)&&(d+=g+`
`,e=e.substring(g.length+1),l=!0),!l){let T=this.rules.other.nextBulletRegex(x),P=this.rules.other.hrRegex(x),w=this.rules.other.fencesBeginRegex(x),Y=this.rules.other.headingBeginRegex(x),V=this.rules.other.htmlBeginRegex(x);for(;e;){let q=e.split(`
`,1)[0],E;if(g=q,this.options.pedantic?(g=g.replace(this.rules.other.listReplaceNesting,"  "),E=g):E=g.replace(this.rules.other.tabCharGlobal,"    "),w.test(g)||Y.test(g)||V.test(g)||T.test(g)||P.test(g))break;if(E.search(this.rules.other.nonSpaceChar)>=x||!g.trim())p+=`
`+E.slice(x);else{if(A||f.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||w.test(f)||Y.test(f)||P.test(f))break;p+=`
`+g}!A&&!g.trim()&&(A=!0),d+=q+`
`,e=e.substring(q.length+1),f=E.slice(x)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(d)&&(a=!0)),s.items.push({type:"list_item",raw:d,task:!!this.options.gfm&&this.rules.other.listIsTask.test(p),loose:!1,text:p,tokens:[]}),s.raw+=d}let i=s.items.at(-1);if(i)i.raw=i.raw.trimEnd(),i.text=i.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let l of s.items){if(this.lexer.state.top=!1,l.tokens=this.lexer.blockTokens(l.text,[]),l.task){if(l.text=l.text.replace(this.rules.other.listReplaceTask,""),l.tokens[0]?.type==="text"||l.tokens[0]?.type==="paragraph"){l.tokens[0].raw=l.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),l.tokens[0].text=l.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let p=this.lexer.inlineQueue.length-1;p>=0;p--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[p].src)){this.lexer.inlineQueue[p].src=this.lexer.inlineQueue[p].src.replace(this.rules.other.listReplaceTask,"");break}}let d=this.rules.other.listTaskCheckbox.exec(l.raw);if(d){let p={type:"checkbox",raw:d[0]+" ",checked:d[0]!=="[ ]"};l.checked=p.checked,s.loose?l.tokens[0]&&["paragraph","text"].includes(l.tokens[0].type)&&"tokens"in l.tokens[0]&&l.tokens[0].tokens?(l.tokens[0].raw=p.raw+l.tokens[0].raw,l.tokens[0].text=p.raw+l.tokens[0].text,l.tokens[0].tokens.unshift(p)):l.tokens.unshift({type:"paragraph",raw:p.raw,text:p.raw,tokens:[p]}):l.tokens.unshift(p)}}if(!s.loose){let d=l.tokens.filter(f=>f.type==="space"),p=d.length>0&&d.some(f=>this.rules.other.anyLine.test(f.raw));s.loose=p}}if(s.loose)for(let l of s.items){l.loose=!0;for(let d of l.tokens)d.type==="text"&&(d.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:n,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=Va(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let a of n)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<r.length;a++)o.header.push({text:r[a],tokens:this.lexer.inline(r[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(Va(a,o.header.length).map((i,l)=>({text:i,tokens:this.lexer.inline(i),header:!1,align:o.align[l]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=tn(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=zd(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let n=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),Ka(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return Ka(r,s,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,a,i=s,l=0,d=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+s);(n=d.exec(t))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(a=[...o].length,n[3]||n[4]){i+=a;continue}else if((n[5]||n[6])&&s%3&&!((s+a)%3)){l+=a;continue}if(i-=a,i>0)continue;a=Math.min(a,a+i+l);let p=[...n[0]][0].length,f=e.slice(0,s+n.index+p+a);if(Math.min(s,a)%2){let A=f.slice(1,-1);return{type:"em",raw:f,text:A,tokens:this.lexer.inlineTokens(A)}}let g=f.slice(2,-2);return{type:"strong",raw:f,text:g,tokens:this.lexer.inlineTokens(g)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,n;return t[2]==="@"?(r=t[1],n="mailto:"+r):(r=t[1],n=r),{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,n;if(t[2]==="@")r=t[0],n="mailto:"+r;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);r=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},Ut=class Os{constructor(t){Ze(this,"tokens");Ze(this,"options");Ze(this,"state");Ze(this,"inlineQueue");Ze(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||kr,this.options.tokenizer=this.options.tokenizer||new Bn,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:$t,block:Nn.normal,inline:en.normal};this.options.pedantic?(r.block=Nn.pedantic,r.inline=en.pedantic):this.options.gfm&&(r.block=Nn.gfm,this.options.breaks?r.inline=en.breaks:r.inline=en.gfm),this.tokenizer.rules=r}static get rules(){return{block:Nn,inline:en}}static lex(t,r){return new Os(r).lex(t)}static lexInline(t,r){return new Os(r).inlineTokens(t)}lex(t){t=t.replace($t.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,r=[],n=!1){for(this.options.pedantic&&(t=t.replace($t.tabCharGlobal,"    ").replace($t.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,r))?(t=t.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=r.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
`:r.push(s);continue}if(s=this.tokenizer.code(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(s=this.tokenizer.fences(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.heading(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.hr(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.blockquote(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.list(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.html(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.def(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.raw,this.inlineQueue.at(-1).src=a.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},r.push(s));continue}if(s=this.tokenizer.table(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.lheading(t)){t=t.substring(s.raw.length),r.push(s);continue}let o=t;if(this.options.extensions?.startBlock){let a=1/0,i=t.slice(1),l;this.options.extensions.startBlock.forEach(d=>{l=d.call({lexer:this},i),typeof l=="number"&&l>=0&&(a=Math.min(a,l))}),a<1/0&&a>=0&&(o=t.substring(0,a+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let a=r.at(-1);n&&a?.type==="paragraph"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s),n=o.length!==t.length,t=t.substring(s.raw.length);continue}if(s=this.tokenizer.text(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,r}inline(t,r=[]){return this.inlineQueue.push({src:t,tokens:r}),r}inlineTokens(t,r=[]){let n=t,s=null;if(this.tokens.links){let l=Object.keys(this.tokens.links);if(l.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)l.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let a=!1,i="";for(;t;){a||(i=""),a=!1;let l;if(this.options.extensions?.inline?.some(p=>(l=p.call({lexer:this},t,r))?(t=t.substring(l.raw.length),r.push(l),!0):!1))continue;if(l=this.tokenizer.escape(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.tag(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.link(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(l.raw.length);let p=r.at(-1);l.type==="text"&&p?.type==="text"?(p.raw+=l.raw,p.text+=l.text):r.push(l);continue}if(l=this.tokenizer.emStrong(t,n,i)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.codespan(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.br(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.del(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.autolink(t)){t=t.substring(l.raw.length),r.push(l);continue}if(!this.state.inLink&&(l=this.tokenizer.url(t))){t=t.substring(l.raw.length),r.push(l);continue}let d=t;if(this.options.extensions?.startInline){let p=1/0,f=t.slice(1),g;this.options.extensions.startInline.forEach(A=>{g=A.call({lexer:this},f),typeof g=="number"&&g>=0&&(p=Math.min(p,g))}),p<1/0&&p>=0&&(d=t.substring(0,p+1))}if(l=this.tokenizer.inlineText(d)){t=t.substring(l.raw.length),l.raw.slice(-1)!=="_"&&(i=l.raw.slice(-1)),a=!0;let p=r.at(-1);p?.type==="text"?(p.raw+=l.raw,p.text+=l.text):r.push(l);continue}if(t){let p="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(p);break}else throw new Error(p)}}return r}},Un=class{constructor(e){Ze(this,"options");Ze(this,"parser");this.options=e||kr}space(e){return""}code({text:e,lang:t,escaped:r}){let n=(t||"").match($t.notSpaceStart)?.[0],s=e.replace($t.endingNewline,"")+`
`;return n?'<pre><code class="language-'+Qt(n)+'">'+(r?s:Qt(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:Qt(s,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,r=e.start,n="";for(let a=0;a<e.items.length;a++){let i=e.items[a];n+=this.listitem(i)}let s=t?"ol":"ul",o=t&&r!==1?' start="'+r+'"':"";return"<"+s+o+`>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Qt(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let n=this.parser.parseInline(r),s=Ya(e);if(s===null)return n;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+Qt(t)+'"'),o+=">"+n+"</a>",o}image({href:e,title:t,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=Ya(e);if(s===null)return Qt(r);e=s;let o=`<img src="${e}" alt="${r}"`;return t&&(o+=` title="${Qt(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Qt(e.text)}},zs=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},jt=class Ds{constructor(t){Ze(this,"options");Ze(this,"renderer");Ze(this,"textRenderer");this.options=t||kr,this.options.renderer=this.options.renderer||new Un,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new zs}static parse(t,r){return new Ds(r).parse(t)}static parseInline(t,r){return new Ds(r).parseInline(t)}parse(t){let r="";for(let n=0;n<t.length;n++){let s=t[n];if(this.options.extensions?.renderers?.[s.type]){let a=s,i=this.options.extensions.renderers[a.type].call({parser:this},a);if(i!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){r+=i||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}parseInline(t,r=this.renderer){let n="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let i=this.options.extensions.renderers[o.type].call({parser:this},o);if(i!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=i||"";continue}}let a=o;switch(a.type){case"escape":{n+=r.text(a);break}case"html":{n+=r.html(a);break}case"link":{n+=r.link(a);break}case"image":{n+=r.image(a);break}case"checkbox":{n+=r.checkbox(a);break}case"strong":{n+=r.strong(a);break}case"em":{n+=r.em(a);break}case"codespan":{n+=r.codespan(a);break}case"br":{n+=r.br(a);break}case"del":{n+=r.del(a);break}case"text":{n+=r.text(a);break}default:{let i='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return n}},Fn,rn=(Fn=class{constructor(e){Ze(this,"options");Ze(this,"block");this.options=e||kr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Ut.lex:Ut.lexInline}provideParser(){return this.block?jt.parse:jt.parseInline}},Ze(Fn,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),Ze(Fn,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Fn),Wd=class{constructor(...e){Ze(this,"defaults",Ps());Ze(this,"options",this.setOptions);Ze(this,"parse",this.parseMarkdown(!0));Ze(this,"parseInline",this.parseMarkdown(!1));Ze(this,"Parser",jt);Ze(this,"Renderer",Un);Ze(this,"TextRenderer",zs);Ze(this,"Lexer",Ut);Ze(this,"Tokenizer",Bn);Ze(this,"Hooks",rn);this.use(...e)}walkTokens(e,t){let r=[];for(let n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)r=r.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,t));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);r=r.concat(this.walkTokens(a,t))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let i=s.renderer.apply(this,a);return i===!1&&(i=o.apply(this,a)),i}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),n.extensions=t),r.renderer){let s=this.defaults.renderer||new Un(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,i=r.renderer[a],l=s[a];s[a]=(...d)=>{let p=i.apply(s,d);return p===!1&&(p=l.apply(s,d)),p||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new Bn(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,i=r.tokenizer[a],l=s[a];s[a]=(...d)=>{let p=i.apply(s,d);return p===!1&&(p=l.apply(s,d)),p}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new rn;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,i=r.hooks[a],l=s[a];rn.passThroughHooks.has(o)?s[a]=d=>{if(this.defaults.async&&rn.passThroughHooksRespectAsync.has(o))return(async()=>{let f=await i.call(s,d);return l.call(s,f)})();let p=i.call(s,d);return l.call(s,p)}:s[a]=(...d)=>{if(this.defaults.async)return(async()=>{let f=await i.apply(s,d);return f===!1&&(f=await l.apply(s,d)),f})();let p=i.apply(s,d);return p===!1&&(p=l.apply(s,d)),p}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(a){let i=[];return i.push(o.call(this,a)),s&&(i=i.concat(s.call(this,a))),i}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Ut.lex(e,t??this.defaults)}parser(e,t){return jt.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,i=await(s.hooks?await s.hooks.provideLexer():e?Ut.lex:Ut.lexInline)(a,s),l=s.hooks?await s.hooks.processAllTokens(i):i;s.walkTokens&&await Promise.all(this.walkTokens(l,s.walkTokens));let d=await(s.hooks?await s.hooks.provideParser():e?jt.parse:jt.parseInline)(l,s);return s.hooks?await s.hooks.postprocess(d):d})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?Ut.lex:Ut.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let i=(s.hooks?s.hooks.provideParser():e?jt.parse:jt.parseInline)(a,s);return s.hooks&&(i=s.hooks.postprocess(i)),i}catch(a){return o(a)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+Qt(r.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(r);throw r}}},yr=new Wd;function We(e,t){return yr.parse(e,t)}We.options=We.setOptions=function(e){return yr.setOptions(e),We.defaults=yr.defaults,Za(We.defaults),We};We.getDefaults=Ps;We.defaults=kr;We.use=function(...e){return yr.use(...e),We.defaults=yr.defaults,Za(We.defaults),We};We.walkTokens=function(e,t){return yr.walkTokens(e,t)};We.parseInline=yr.parseInline;We.Parser=jt;We.parser=jt.parse;We.Renderer=Un;We.TextRenderer=zs;We.Lexer=Ut;We.lexer=Ut.lex;We.Tokenizer=Bn;We.Hooks=rn;We.parse=We;var w_=We.options,$_=We.setOptions,x_=We.use,S_=We.walkTokens,A_=We.parseInline;var T_=jt.parse,E_=Ut.lex;function ir(e){let t=We.parse(e),r=Ba.sanitize(t);return za(r)}function Jt(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function Dr(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Hn(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())} ${r(t.getHours())}:${r(t.getMinutes())}`}var Gd={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Yd=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Vd=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function lr(e){return!!e&&typeof e=="object"}function Hs(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function ii(e,t){let r=Hs(e),n=Hs(t),s=new Map;for(let i of r)s.set(i,(s.get(i)||0)+1);let o=0;for(let i of n){let l=s.get(i)||0;l>0?s.set(i,l-1):o+=1}let a=0;for(let i of s.values())a+=i;return{added:o,removed:a}}function Kd(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>lr(s)&&typeof s.text=="string"?s.text:"").join(""):lr(e)&&typeof e.text=="string"&&(t=e.text);let n=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function Zd(e){let t=String(e.name||""),r=e.input||{},n={kind:"tool",tool:t,icon:Gd[t]||"\u{1F527}",input:r,expandable:!0};if((t==="Read"||t==="Write")&&(n.path=String(r.file_path||r.path||"")),t==="Write"&&(n.added=Hs(r.content).length),t==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=ii(r.old_string,r.new_string);n.added=s,n.removed=o}if(t==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,a=Array.isArray(r.edits)?r.edits:[];for(let i of a){let l=ii(lr(i)?i.old_string:"",lr(i)?i.new_string:"");s+=l.added,o+=l.removed}n.added=s,n.removed=o}return t==="Bash"&&(n.command=String(r.command||"")),(t==="Grep"||t==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function li(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function ci(e){let t=e.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=Yd.exec(t);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:t.trim()}:Vd.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Xd(e,t){if(e.type==="assistant"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(lr(o)){if(o.type==="text"&&typeof o.text=="string")s.push(ci(o.text));else if(o.type==="thinking"){let a=li(o.thinking);a&&s.push(a)}else if(o.type==="tool_use"){let a=Zd(o);typeof o.id=="string"&&t.set(o.id,a),s.push(a)}}return s}if(e.type==="user"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(lr(s)&&s.type==="tool_result"){let o=t.get(String(s.tool_use_id));if(o){let a=Kd(s.content);o.result=a,o.output=typeof s.content=="string"?s.content:a}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success";return[{kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""}]}return[]}function Qd(e){if(e.type==="item.completed"&&lr(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[ci(t.text)];if(t.type==="reasoning"){let r=li(t.text);return r?[r]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Jd(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function di(e){let t=[],r=new Map,n=Array.isArray(e)?e:[];for(let s of n){let o=s;if(typeof s=="string"){let i=s.trim();if(i.length===0)continue;try{o=JSON.parse(i)}catch{continue}}if(!lr(o))continue;let a=Jd(o)?Qd(o):Xd(o,r);for(let i of a)t.push(i)}return t}var eu=5,tu=10,ru=/Task\s+#(\d+)/,nu=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,su=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function Wn(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function ou(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function au(e){for(let t=e.length-1;t>=0;t-=1){let r=e[t];if(r.kind==="phase"||r.kind==="gate")return r.text||null}return null}function iu(e){let t=new Map,r=0;for(let s of e){if(s.kind!=="tool")continue;r+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let l=ru.exec(s.output||s.result||""),d=String(o.activeForm||o.subject||"").trim();if(!l||d.length===0)continue;t.set(l[1],{label:d,active:o.status==="in_progress"?r:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let i=o.activeForm||o.subject;typeof i=="string"&&i.trim().length>0&&(a.label=i.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?r:0)}let n=null;for(let s of t.values())s.active>0&&(!n||s.active>n.active)&&(n=s);return n?n.label:null}function lu(e){if(e.tool==="Bash"){let t=e.command||"";return nu.test(t)?"~ PR/\uAC8C\uC2DC \uC911":su.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function cu(e){let t=e.filter(s=>s.kind==="tool").slice(-tu),r=new Map;t.forEach((s,o)=>{let a=lu(s);if(!a)return;let i=r.get(a)||{count:0,last:-1};i.count+=1,i.last=o,r.set(a,i)});let n=null;for(let[s,o]of r)(!n||o.count>n.count||o.count===n.count&&o.last>n.last)&&(n={label:s,count:o.count,last:o.last});return n?n.label:null}function du(e){let t=au(e);if(t)return{text:t,guess:!1};let r=iu(e);if(r)return{text:r,guess:!1};let n=cu(e);return n?{text:n,guess:!0}:null}function uu(e,t){if(typeof e!="number")return"";let r=Math.max(0,Math.floor((t-e)/1e3));return r<60?`${r}\uCD08 \uC804`:Rt(e,t)}function Gn(e,t={}){let{transport:r,sessionLogStore:n,onClose:s}=t,o=null,a={},i=!0,l=new Set,d=new Set,p=null,f=null,g=!1,A=!1,x=!1,T=null,P=null;function w(){g=!1,A=!1,x=!1,T=null,P=null}async function Y(B){if(r){A=!0,x=!1,ge();try{let O=await Promise.resolve(r("get-attempt-prompt",{attempt_id:B}));if(o!==B)return;!O||typeof O!="object"||Array.isArray(O)?x=!0:(T=O,P=B)}catch{o===B&&(x=!0)}finally{o===B&&(A=!1,ge())}}}function V(){if(g=!g,g&&o&&P!==o){Y(o);return}ge()}function q(){if(!g)return"";let B=Dr({loading:A,error:x});if(B)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${B}
      </div>`;if(!T)return"";if(T.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let O=Hn(T.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${O?c`<div class="prompt-block__meta">${O} 발송</div>`:""}
      ${typeof T.task_prompt=="string"?Jt("\uACFC\uC5C5 (user)",T.task_prompt):""}
      ${typeof T.system_prompt=="string"?Jt("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",T.system_prompt):""}
    </div>`}function E(){if(!o||!n)return[];let B=n.get(o);return di(B?B.lines:[])}function S(){if(!o||!n)return null;let B=n.get(o),O=B?B.last_event_at:null;return typeof O=="number"?O:null}function L(){return a.status==="running"}function C(){if(L()&&o){f||(f=setInterval(()=>ge(),1e3));return}le()}function le(){f&&(clearInterval(f),f=null)}function $e(B){let O=[],oe=0;for(;oe<B.length;){let ve=B[oe];if(ve.kind==="tool"){let Ae=oe;for(;Ae<B.length&&B[Ae].kind==="tool"&&B[Ae].tool===ve.tool;)Ae+=1;if(Ae-oe>=eu&&!d.has(oe)){O.push({kind:"group",idx:oe,tool:ve.tool||"",lines:B.slice(oe,Ae).map((Xe,Ie)=>({idx:oe+Ie,line:Xe}))}),oe=Ae;continue}}O.push({kind:"line",idx:oe,line:ve}),oe+=1}return O}function de(B){for(let O=B.length-1;O>=0;O-=1){let oe=B[O];if(oe.kind==="result"||oe.kind==="error")return null;if(oe.kind==="tool"&&!Object.hasOwn(oe,"result"))return oe}return null}function me(B){for(let O=B.length-1;O>=0;O-=1)if(B[O].kind==="thinking")return B[O];return null}function Le(B,O){if(O.kind==="gate")return c`<div class="sv__gate">${O.text}</div>`;if(O.kind==="phase")return c`<div class="sv__phase">${O.text}</div>`;if(O.kind==="result")return c`<div
        class="sv__result${O.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${O.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${ir(O.text||(O.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(O.kind==="thinking"){let oe=l.has(B);return c`<div
        class="sv__think${oe?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Re(B)}
      >
        <span class="sv__think-line">💭 ${Wn(O.text)}</span>
        ${oe?c`<pre class="sv__think-expand">${O.text}</pre>`:""}
      </div>`}if(O.kind==="error")return c`<div class="sv__error">⛔ ${O.text}</div>`;if(O.kind==="blocker")return c`<div class="sv__error">⛔ ${O.text}</div>`;if(O.kind==="tool"){let oe=l.has(B),ve=O.tool==="Bash"?ou(O.command):0,Ae=O.tool==="Bash"?ve>1?Wn(O.command):O.command:O.path||O.command||"";return c`<div
        class="sv__tool${oe?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>Re(B)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${O.icon}</span>
          <span class="sv__tool-name">${O.tool}</span>
          ${Ae?c`<span class="sv__tool-detail">${Ae}</span>`:""}
          ${ve>1?c`<span class="sv__tool-more">⋯ ${ve}줄</span>`:""}
          ${typeof O.added=="number"?c`<span class="sv__diff-add">+${O.added}</span>`:""}
          ${typeof O.removed=="number"?c`<span class="sv__diff-del">−${O.removed}</span>`:""}
          ${O.result?c`<span class="sv__tool-ok">→ ${O.result}</span>`:""}
        </span>
        ${oe?c`<pre class="sv__tool-expand">${Ge(O)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${ir(O.text||"")}</div>`}function Ge(B){let O=[];if(B.tool==="Bash"&&typeof B.command=="string"&&B.command.length>0)O.push(B.command);else if(B.input!==void 0)try{O.push(`input: ${JSON.stringify(B.input,null,2)}`)}catch{}return typeof B.output=="string"&&B.output.length>0&&O.push(`output:
${B.output}`),O.join(`

`)}function Ye(){if(!o)return c``;let B=E(),O=[a.runner,a.model,a.effort].filter(Boolean).join(" \xB7 "),oe=a.session_id||"",ve=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${i?"ON":"OFF"}`,Ae=L(),Xe=Ae?uu(S(),Date.now()):"",Ie=Ae?de(B):null,D=Ae?me(B):null,U=du(B);return c`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${U?c`<span
              class="sv__stage${U.guess?" sv__stage--guess":""}"
              title=${U.text}
              >${U.text}</span
            >`:""}
        ${Ae?c`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${Xe?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${Xe}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${Xe?c`<span class="sv__live-ago">${Xe}</span>`:""}</span
            >`:""}
        ${oe?c`<button
              type="button"
              class="sv__session"
              title=${oe}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${oe}`}
              @click=${()=>H(oe)}
            >
              ⧉ ${oe.slice(0,8)}
            </button>`:""}
        ${O?c`<span class="sv__meta">${O}</span>`:""}
        ${a.worktree?c`<span class="sv__wt" title=${a.worktree}
              >${a.worktree}</span
            >`:""}
        <button
          type="button"
          class="sv__prompt-toggle${g?" sv__prompt-toggle--on":""}"
          data-seam="attempt-prompt-toggle"
          aria-pressed=${g?"true":"false"}
          aria-label="발송 프롬프트 보기"
          title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
          @click=${V}
        >
          ✉ 프롬프트
        </button>
        <button
          type="button"
          class="sv__follow${i?" sv__follow--on":""}"
          aria-pressed=${i?"true":"false"}
          aria-label=${ve}
          @click=${J}
        >
          <span class="sv__follow-full">⇣ ${ve}</span>
          <span class="sv__follow-short">⇣ ${i?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>ke()}
        >
          ✕
        </button>
      </div>
      ${q()}
      <div class="sv__body">
        ${B.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:$e(B).map(R=>R.kind==="group"?Me(R):Le(R.idx,R.line))}
      </div>
      ${Ie||D?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${Ie?c`<span class="sv__now-icon">${Ie.icon}</span>
                  <span class="sv__now-name">${Ie.tool}</span>
                  <span class="sv__now-detail"
                    >${Ie.tool==="Bash"?Wn(Ie.command):Ie.path||Ie.command||""}</span
                  >`:""}
            ${D?c`<span class="sv__now-think"
                  >💭 ${Wn(D.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function Me(B){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>Be(B.idx)}
    >
      <span class="sv__group-icon">${B.lines[0].line.icon}</span>
      <span class="sv__group-name">${B.tool}</span>
      <span class="sv__group-count">${B.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function Be(B){d.add(B),ge()}function ge(){qe(Ye(),e),C(),i&&ye()}function ye(){let B=e.querySelector(".sv__body");B&&(B.scrollTop=B.scrollHeight)}function Re(B){l.has(B)?l.delete(B):l.add(B),ge()}function J(){i=!i,ge()}function H(B){vr(B).then(O=>{O?te("\uBCF5\uC0AC\uB428","success",1200):te("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function X(B){!o||!B||(a={...a,...B},ge())}function Oe(B){let O=B.target;if(!O||!O.classList||!O.classList.contains("sv__body"))return;!(O.scrollHeight-O.scrollTop-O.clientHeight<=4)&&i&&(i=!1,ge())}e.addEventListener("scroll",Oe,!0);function _e(B){let O=B&&B.attempt_id;O&&(o=O,a=B.meta||{},i=!0,l.clear(),d.clear(),w(),!p&&n&&(p=n.subscribe(ge)),r&&Promise.resolve(r("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),ge())}function ke(){let B=o;o=null,l.clear(),d.clear(),w(),le(),r&&B&&Promise.resolve(r("unsubscribe-session-log",{id:`session-log:${B}`})).catch(()=>{}),qe(c``,e),s&&s()}return{open:_e,updateMeta:X,close:ke,isOpen(){return o!==null},destroy(){le(),p&&(p(),p=null),e.removeEventListener("scroll",Oe,!0),o=null,qe(c``,e)}}}function on(e){let t=e&&typeof e=="object"?e:{},r=t.metadata&&typeof t.metadata=="object"?t.metadata:{},n=ui(t.spec_id),s=ui(r.spec_id);return n?{path:n,source:"native",conflict:s.length>0&&s!==n}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function ui(e){return typeof e=="string"?e.trim():""}function pu(e){return["plan_review","plan_approval","plan_check"].some(t=>{let r=e[t];return typeof r=="string"&&r.trim().length>0})}function fu(e){let t=e&&e.metadata||{},r=on(e),n=[];return r.path&&n.push({kind:"spec",path:r.path,missing_state:null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&n.push({kind:"plan",path:t.plan_path.trim(),missing_state:pu(t)?null:"plan_pending"}),n}function pi(e,t){let r=fu(e);return c`
    <div class="detail-section-label">Artifacts</div>
    ${r.length===0?c`<div class="detail-empty">산출물 없음</div>`:c`
          ${r.map(n=>c`<div class="detail-art">
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
  `}var _u="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",mu=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,gu=/^\*\*결론\*\* — (.+)$/;function fi(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==_u)return null;let r=mu.exec(t[1]||"");if(!r)return null;let n=r[1].split(" ")[0],s=r[2],o=r[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let i=a<t.length?gu.exec(t[a]):null,l=i?i[1].replace(/\s+/g," ").trim():"",d=i?a+1:a;return{lane:n,identifier:s,timestamp:o,conclusion:l,body:t.slice(d).join(`
`).trim()}}var _i=20;function mi(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let r=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${r}-${n} ${s}:${o}`}function hu(e){return e.length>_i?`${e.slice(0,_i)}\u2026`:e}function bu(e,t,r,n){let s=`${t.lane} ${hu(t.identifier)}`;return c`<div class="detail-report">
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
        <span class="detail-report__time">${mi(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${n&&t.body.length>0?c`<div class="detail-report__body">
          ${ir(t.body)}
        </div>`:""}
  </div>`}function vu(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${mi(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${ir(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function gi(e,t={},r={}){let n=Array.isArray(e)?e.filter(Boolean):[],s=r.expanded||new Set,o=typeof r.draft=="string"?r.draft:"",a=r.sending===!0,i=n.slice().sort((l,d)=>String(d.created_at||"").localeCompare(String(l.created_at||"")));return c`
    <div class="detail-section-label">댓글 (${n.length})</div>
    ${r.error?c`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:i.length===0?c`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:c`<div class="detail-comments" data-seam="comments">
            ${i.map(l=>{let d=fi(typeof l.text=="string"?l.text:"");return d?bu(l,d,t,s.has(l.id)):vu(l)})}
          </div>`}
    <div class="detail-comment-compose">
      <textarea
        class="detail-comment-compose__input"
        aria-label="댓글 추가"
        placeholder="댓글 추가"
        rows="3"
        ?disabled=${a}
        .value=${o}
        @input=${l=>t.onDraftInput&&t.onDraftInput(l.target.value)}
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
  `}var yu=["codex","opus","fable","self","skip"],ku=["codex","fable","skip"],wu=["low","medium","high","xhigh"],$u=["standard","fast_track"],Mr=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"],Gs={orchestration_model:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uBAA8\uB378"},orchestration_effort:{title:"\uC6CC\uCEE4 reasoning effort"},orchestration_speed:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uC18D\uB3C4",help:"Fast\uB294 \uC9C0\uC6D0 \uBAA8\uB378\uC744 \uB354 \uBE60\uB974\uAC8C \uC2E4\uD589\uD558\uBA70 \uC0AC\uC6A9\uB7C9 \uBE44\uC6A9\uC774 \uC99D\uAC00\uD569\uB2C8\uB2E4."},spec_review_model:{title:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4"},spec_review_effort:{title:"\uC2A4\uD399 \uB9AC\uBDF0 reasoning effort"},plan_review_model:{title:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4"},plan_review_effort:{title:"\uACC4\uD68D \uB9AC\uBDF0 reasoning effort"},impl_review_model:{title:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4"},impl_review_effort:{title:"\uAD6C\uD604 \uB9AC\uBDF0 reasoning effort"},impl_runtime:{title:"\uAD6C\uD604 runtime"},impl_model:{title:"\uAD6C\uD604 \uBAA8\uB378",help:"\uC6CC\uD06C\uD50C\uB85C\uAC00 \uBCF5\uC7A1 \uAD6C\uD604\uC778\uC9C0, \uBC94\uC704\uAC00 \uD55C\uC815\uB41C \uAD6C\uD604\uC778\uC9C0 \uD310\uB2E8\uD574 \uD604\uC7AC runtime\uC758 \uAD6C\uD604\uC6A9 \uBAA8\uB378\uC744 \uC120\uD0DD\uD569\uB2C8\uB2E4."},impl_effort:{title:"\uAD6C\uD604 reasoning effort",help:"\uC790\uB3D9 \uC120\uD0DD\uC774\uBA74 workflow tier\uC5D0 \uC120\uC5B8\uB41C effort\uB97C, \uBAA8\uB378\uB9CC \uC9C1\uC811 \uC9C0\uC815\uD588\uC73C\uBA74 \uD574\uB2F9 \uD558\uC704 \uC5D0\uC774\uC804\uD2B8 \uD638\uCD9C\uC758 \uAE30\uBCF8 effort\uB97C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."},workflow_mode:{title:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC"}},hi={spec_review_effort:"spec_review_model",impl_review_effort:"impl_review_model",plan_review_effort:"plan_review_model"},xu=["self","skip"],Su="opus",Ys={orchestration_model:"(\uAE30\uBCF8: opus)",orchestration_effort:"(\uAE30\uBCF8: CLI \uAE30\uBCF8)",orchestration_speed:"(\uAE30\uBCF8: Standard)",spec_review_model:"(\uAE30\uBCF8: codex)",spec_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_review_model:"(\uAE30\uBCF8: codex)",impl_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_runtime:"(\uAE30\uBCF8: orchestration runtime \uC0C1\uC18D)",plan_review_model:"(\uAE30\uBCF8: codex)",plan_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_model:"(\uAE30\uBCF8: \uC791\uC5C5 \uC131\uACA9\uC5D0 \uB530\uB77C \uAD6C\uD604 \uBAA8\uB378 \uC790\uB3D9 \uC120\uD0DD)",impl_effort:"(\uAE30\uBCF8: \uC120\uD0DD\uB41C \uAD6C\uD604 \uC5D0\uC774\uC804\uD2B8\uC758 reasoning effort \uC0AC\uC6A9)"};function Vs(e){let t=Gs[e]||{title:e};return c`<span data-exec-setting-label>
    <span data-exec-setting-title>${t.title}</span>
    <code data-exec-setting-key>${e}</code>
    ${t.help?c`<small data-exec-setting-help=${e}>${t.help}</small>`:""}
  </span>`}function Au(e,t,r=""){let n=t&&t[e];return typeof n=="string"&&n.length>0?`(\uAE30\uBCF8: ${e==="orchestration_speed"?n==="default"?"Standard":n==="fast"?"Fast":n:n} \u2014 ${r||"\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uD504\uB9AC\uC14B"})`:Ys[e]||"(\uAE30\uBCF8)"}function Pr(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function wr(e){if(!Pr(e)||!Pr(e.runners))return null;let t=Object.entries(e.runners).filter(([,r])=>Pr(r)&&Pr(r.models));return t.length>0?t:null}function Ws(e){return{value:e,label:e}}function Ks(e){return{label:null,options:[{value:e,label:`${e} (\uBE44\uD638\uD658)`}]}}function bi(e,t,r=null){let n=wr(e);if(!n)return t?[{label:null,options:[Ws(t)]}]:[];let s=n.filter(([a])=>r===null||a===r).map(([a,i])=>({label:a,options:Object.keys(i.models).map(Ws)})),o=s.some(a=>a.options.some(i=>i.value===t));return t&&!o?[Ks(t),...s]:s}function cr(e,t){let r={label:null,options:e.map(Ws)};return t&&!e.includes(t)?[Ks(t),r]:[r]}function er(e,t){let r=wr(e);if(!r||!t)return null;for(let[n,s]of r)if(Object.hasOwn(s.models,t))return n;return null}function Zs(e,t){return Pr(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function Tu(e,t){return Pr(t)&&Array.isArray(t.orchestration_efforts)?t.orchestration_efforts.slice():Zs(e,t)}function Eu(e,t){let r=wr(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return Tu(n,n.models[t]);return[]}function Cu(e,t){let r=wr(e);if(!r||!t)return[];for(let[,n]of r){if(!Object.hasOwn(n.models,t))continue;let s=n.models[t];return Array.isArray(s.speed_tiers)?s.speed_tiers.slice():["default"]}return[]}function Xs(e,t){let r=wr(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return Zs(n,n.models[t]);return[]}function ki(e){let t=wr(e);if(!t)return[];let r=[];for(let[,n]of t)for(let s of Object.values(n.models))for(let o of Zs(n,s))r.includes(o)||r.push(o);return r}function wi(e,t){if(!t)return ki(e);let n=wr(e)?.find(([o])=>o===t)?.[1];if(!n)return[];let s=[];for(let o of Object.keys(n.models))for(let a of Xs(e,o))s.includes(a)||s.push(a);return s}function Vn(e,t,r){let n={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=n.impl_runtime==="inherit"?r:n.impl_runtime==="claude"||n.impl_runtime==="codex"?n.impl_runtime:null;if(n.impl_runtime==="inherit"&&!s)return n.impl_model="",n.impl_effort="",n;let o=er(t,n.impl_model);if(n.impl_model&&(!s||o!==s))return n.impl_model="",n.impl_effort="",n;let a=n.impl_model?Xs(t,n.impl_model):wi(t,s);return n.impl_effort&&a.length>0&&!a.includes(n.impl_effort)&&(n.impl_effort=""),n}function Nr(e){let{selectedOf:t,effectiveOf:r,runner_catalog:n,controller_runtime:s}=e,o=r("orchestration_model")||Su,a=r("impl_model"),i=r("impl_runtime"),l=i==="claude"||i==="codex"?i:i==="inherit"?s===void 0?er(n,o):s:null;return Mr.map(d=>{let p=t(d),f,g=!1;return d==="orchestration_model"?f=bi(n,p):d==="impl_runtime"?f=cr(["inherit","claude","codex"],p):d==="impl_model"?(f=l?bi(n,p,l):p?[Ks(p)]:[],g=i==="inherit"&&l===null):d==="orchestration_effort"?f=cr(Eu(n,o),p):d==="orchestration_speed"?f=Ru(Cu(n,o),p):d==="impl_effort"?(f=cr(a?Xs(n,a):l?wi(n,l):ki(n),p),g=i==="inherit"&&l===null):d==="plan_review_model"?f=cr(ku,p):Object.hasOwn(hi,d)?(f=cr(wu,p),g=xu.includes(r(hi[d]))):f=cr(yu,p),{key:d,groups:f,selected:p,disabled:g,runner:d==="orchestration_model"?er(n,o):null}})}function Yn(e,t,r){return c`
    ${typeof r=="string"?c`<option value="" ?selected=${!t}>${r}</option>`:""}
    ${e.map(n=>n.label===null?n.options.map(s=>vi(s,t)):c`<optgroup label=${n.label}>
            ${n.options.map(s=>vi(s,t))}
          </optgroup>`)}
  `}function Ru(e,t){return cr(e,t).map(r=>({...r,options:r.options.map(n=>{let s=n.label.endsWith("(\uBE44\uD638\uD658)"),o=n.value==="default"?"Standard":n.value==="fast"?"Fast":null;return{...n,label:s?o?`${o} (\uBE44\uD638\uD658)`:n.label:o||n.label}})}))}function vi(e,t){return c`<option value=${e.value} ?selected=${e.value===t}>
    ${e.label}
  </option>`}function yi(e,t,r,n,s,o,a){return c`
    <div class="detail-kv">
      <span class="detail-kv__k">${Vs(e)}</span>
      <span class="detail-kv__vgroup">
        <select
          class=${n?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
          aria-label=${e}
          data-key=${e}
          ?disabled=${s}
          @change=${i=>(e==="impl_runtime"||e==="impl_model"||e==="impl_effort")&&a.onImplTargetChange?a.onImplTargetChange(e,i.target.value):a.onChange(e,i.target.value)}
        >
          ${t}
        </select>
        ${o?c`<span class="detail-kv__note" data-runner-for=${e}
              >${o}</span
            >`:""}
      </span>
    </div>
  `}function $i(e,t,r,n,s=""){let o=e&&e.metadata||{},a=r&&typeof r=="object"?r:{},i=f=>typeof o[f]=="string"?o[f]:"",d=Nr({selectedOf:i,effectiveOf:f=>{let g=i(f);return g||(typeof a[f]=="string"?a[f]:"")},runner_catalog:n}),p=o.workflow_mode==="fast_track"?"fast_track":"standard";return c`
    <div class="detail-section-label">실행 설정 (수정 가능)</div>
    ${d.map(f=>yi(f.key,Yn(f.groups,f.selected,Au(f.key,a,s)),f.selected,!1,f.disabled,f.runner,t))}
    ${yi("workflow_mode",Yn(cr($u,p),p),p,o.workflow_mode==="fast_track",!1,null,t)}
  `}function Iu(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function xi(e,t){let r=t.getWorkspacePath,n=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",i="";function l(x){x.key==="Escape"&&s&&(x.preventDefault(),g())}document.addEventListener("keydown",l);function d(){return s?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>g()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${Iu(s)}</span
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
            ${o==="loading"?c`<div class="mv__status">불러오는 중…</div>`:o==="pending"?c`<div class="mv__status">${i}</div>`:o==="error"?c`<div class="mv__status mv__status--error">
                      ${i||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:ir(a)}
          </div>
        </div>
      </div>
    `:c``}function p(){qe(d(),e)}async function f(x,T={}){s=x,o="loading",a="",i="",p();let P=r?r():"";if(!P){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",p();return}if(!n){o="error",i="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",p();return}let w="/api/doc?workspace="+encodeURIComponent(P)+"&path="+encodeURIComponent(x);try{let Y=await n(w),V=await Y.json().catch(()=>({}));if(!Y.ok||!V||V.ok!==!0){if(V?.error==="not_found"&&T.missing_state==="plan_pending"){o="pending",i="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",p();return}o="error",i="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(V&&V.error||Y.status)+")",p();return}a=String(V.content||""),o="ready",p()}catch{o="error",i="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",p()}}function g(){s=null,qe(c``,e)}function A(){document.removeEventListener("keydown",l),g()}return{open:f,close:g,destroy:A}}var Lu=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],Ti="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function Ou(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function Du(e){let t=gt(e);if(t.length>0)return t.map(s=>c`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let r=Lr(e);if(!r||!e)return"";let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${r.replace(/^τ /,"\u03C4 \uCD1D ")}${n}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${Ti}
          >부분 집계</span
        >`:""}`}function Si(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function Ai(e){if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?Ei(t):""}function Pu(e){return e?["implementation","review-consult"].flatMap(r=>{let n=e.roles[r]?.codex;return n?n.legs.map(s=>{let a=gt({providers:{codex:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}})[0];return c`<div class="detail-session__leg detail-session__usage-detail">
        <span class="detail-session__leg-role detail-session__usage-label"
          >${r}</span
        >
        <span class="detail-session__leg-meta detail-session__usage-value"
          >${[s.provider,s.model].filter(Boolean).join(" \xB7 ")}</span
        >
        ${s.session_id?c`<span
              class="detail-session__leg-sid detail-session__sid"
              title=${s.session_id}
              >${s.session_id.slice(0,8)}</span
            >`:""}
        ${Ai(s.completed_at)?c`<span class="detail-session__leg-time detail-session__time"
              >${Ai(s.completed_at)}</span
            >`:""}
        ${a?c`<span class="detail-session__usage" title=${a.tooltip}
              >${a.label}</span
            >`:""}
      </div>`}):[]}):""}function Mu(e,t){let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,n=[...Lu,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return c`<div class="detail-session__usage-detail">
    ${n.map(s=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${Ou(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${r===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${r.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${Ti}</span>`:""}
  </div>`}var Nu={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Ei(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=String(t.getHours()).padStart(2,"0"),n=String(t.getMinutes()).padStart(2,"0");return`${r}:${n}`}function Fu(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,n])=>typeof n=="string"&&n.length>0).map(([n,s])=>`${n}=${s}`).join(" \xB7 "):"",r=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${r}</span>
    ${t?c`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function Ci(e,t={},r={}){let n=Array.isArray(e)?e:[],s=r.expanded||new Set;if(n.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let d of n)d&&typeof d.resumed_from=="string"&&d.resumed_from.length>0&&o.add(d.resumed_from);let a=d=>{if(!(d.status==="failed"||d.status==="orphaned"))return"";let f=typeof d.session_id=="string"&&d.session_id.length>0,g=o.has(d.attempt_id),A=f&&!g,x=f?g?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${d.attempt_id}
      ?disabled=${!A}
      title=${x}
      @click=${T=>{T.stopPropagation(),A&&t.onResume&&t.onResume(d.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},i=d=>{if(!(d.status==="failed"||d.status==="orphaned")||typeof d.cause!="string"||d.cause==="")return"";let f=d.cause_detail,g=f&&typeof f.reason=="string"&&f.reason.length>0?typeof f.command=="string"&&f.command.length>0?`${f.reason} \xB7 ${f.command}`:f.reason:d.cause;return c`<div class="detail-session__cause" title=${g}>
      ${d.cause}
    </div>`},l=d=>{let p=Si(ws(d));if(gt(p).length===0&&!Lr(d.usage))return"";let f=s.has(d.attempt_id);return c`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${d.attempt_id}
      aria-expanded=${f?"true":"false"}
      title=${f?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${g=>{g.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(d.attempt_id)}}
    >
      τ 자세히
    </button>`};return c`
    <div class="detail-section-label">
      세션 이력${Du(r.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${n.map(d=>{let p=ws(d),f=Si(p),g=gt(f);return c`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${d.status||"unknown"}"
            data-attempt-id=${d.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(d.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${Nu[d.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${d.attempt_id}</span>
            ${d.resumed_from?c`<span
                  class="detail-session__resumed"
                  title=${`\uC774\uC5B4\uBC1B\uC740 \uC138\uC158 (from ${d.resumed_from})`}
                  >↻</span
                >`:""}
            <span class="detail-session__meta"
              >${[d.runner,d.model].filter(Boolean).join(" \xB7 ")}</span
            >
            ${g.length>0?c`<span class="detail-session__role">orchestrator</span>`:""}
            ${d.session_id?c`<span class="detail-session__sid" title=${d.session_id}
                  >${String(d.session_id).slice(0,8)}</span
                >`:""}
            ${g.length>0?g.map(A=>c`<span
                      class="detail-session__usage"
                      title=${A.tooltip}
                      >${A.label}</span
                    >`):Lr(d.usage)?c`<span class="detail-session__usage"
                    >${Lr(d.usage)}</span
                  >`:""}
            <span class="detail-session__time">${Ei(d.started_at)}</span>
          </button>
          ${l(d)} ${a(d)} ${i(d)} ${Fu(d)}
          ${s.has(d.attempt_id)&&d.usage?Mu(d.usage,d.runner==="codex"?"codex":"claude"):""}
          ${Pu(p)}
        </div>`})}
    </div>
  `}function Ri(e,t={}){return c`
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
          ${qu(e)}
        </div>`:""}
  `}function qu(e){let t=Dr(e);if(t)return t;let r=e.data;if(!r)return"";if(r.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof r.default_task_prompt=="string"?Jt("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",r.default_task_prompt):""}`;let n=Hn(r.recorded_at);return c`<div class="detail-prompt__meta">
      ${r.attempt_id}${n?` \xB7 ${n}`:""}
    </div>
    ${typeof r.task_prompt=="string"?Jt("\uACFC\uC5C5 (user)",r.task_prompt):""}
    ${typeof r.system_prompt=="string"?Jt("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",r.system_prompt):""}`}var Bu=["open","in_progress","deferred","resolved","closed"],Uu=[0,1,2,3,4];function Ii(e,t){let r=t.issueStores,n=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,i=t.execPresetStore,l=t.sessionLogStore,d=null,p=null,f={},g="",A=!1,x=!1,T=!1,P="",w="",Y="";function V(){x=!1,T=!1,P="",w="",Y=""}let q=[],E=null,S=null,L=!1,C="",le=!1,$e=0,de=new Set;function me(){q=[],E=null,S=null,L=!1,C="",le=!1,$e+=1,de.clear()}async function Le(m){if(!s)return;let I=++$e;try{let $=await Promise.resolve(s("get-comments",{id:m}));if(I!==$e||m!==d)return;q=Array.isArray($)?$:[],L=!1}catch{if(I!==$e||m!==d)return;L=!0}ee()}function Ge(){if(!s||!d)return;let m=p&&typeof p.comment_count=="number"?p.comment_count:null;if(E!==d){E=d,S=m,Le(d);return}m!==null&&m!==S&&(S=m,Le(d))}function Ye(m){de.has(m)?de.delete(m):de.add(m),ee()}function Me(m){let I=C.trim().length===0;C=m,I!==(m.trim().length===0)&&ee()}async function Be(){let m=C.trim();if(!s||!d||m.length===0||le)return;let I=d;le=!0,ee();let $=!1;try{let Z=await Promise.resolve(s("add-comment",{id:I,text:m}));Array.isArray(Z)&&Z.length>0&&($=!0,I===d&&(q=Z,L=!1,C="",S=Z.length))}catch{$=!1}$||te("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),I===d&&(le=!1),ee()}let ge={onToggle:Ye,onDraftInput:Me,onSubmit:Be},ye=document.createElement("div");ye.className="md-viewer-root",document.body.appendChild(ye);let Re=xi(ye,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),J=document.createElement("div");J.className="session-log-root",document.body.appendChild(J);let H=Gn(J,{transport:s?(m,I)=>Promise.resolve(s(m,I)):void 0,sessionLogStore:l}),X=!1,Oe=!1,_e=!1,ke=null,B=null,O=0;function oe(m){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${m}`}function ve(){X=!1,Oe=!1,_e=!1,ke=null,B=null,O+=1}async function Ae(m){if(!s)return;let I=++O;Oe=!0,_e=!1,ee();try{let $=await Promise.resolve(s("get-bead-prompt",{bead_id:m}));if(I!==O)return;!$||typeof $!="object"||Array.isArray($)?_e=!0:(ke=$,B=oe(m))}catch{I===O&&(_e=!0)}finally{I===O&&(Oe=!1,ee())}}function Xe(){if(X=!X,X&&d&&B!==oe(d)){ke=null,Ae(d);return}ee()}function Ie(){if(!a||!d)return[];let m=a.get();return(m&&m.attempts?Object.values(m.attempts):[]).filter($=>$&&$.bead_id===d).sort(($,Z)=>(Z.started_at||0)-($.started_at||0)).map($=>({attempt_id:$.attempt_id,bead_id:$.bead_id,status:$.status,started_at:typeof $.started_at=="number"?$.started_at:null,runner:$.runner||null,model:$.model||null,session_id:$.session_id||null,resumed_from:$.resumed_from||null,dismissed_at:typeof $.dismissed_at=="number"?$.dismissed_at:null,cause:typeof $.cause=="string"?$.cause:null,cause_detail:$.cause_detail||null,exec_default_preset_id:typeof $.exec_default_preset_id=="string"?$.exec_default_preset_id:null,exec_default_preset_revision:typeof $.exec_default_preset_revision=="number"?$.exec_default_preset_revision:null,exec_values:$.exec_values&&typeof $.exec_values=="object"?$.exec_values:null,usage:$.usage||null,usage_legs:Array.isArray($.usage_legs)?$.usage_legs:[]}))}function D(){if(!a||!d)return null;let m=a.get();return Ot(m&&m.attempts||{},d)}let U=new Set;function R(m){U.has(m)?U.delete(m):U.add(m),ee()}function y(m){let I=a?a.get():null,$=I&&I.attempts?I.attempts[m]:null;H.open({attempt_id:m,meta:$?{runner:$.runner||void 0,model:$.model||void 0,effort:$.effort||void 0,status:$.status||void 0,session_id:$.session_id||void 0}:{}})}async function z(m){if(!s||!m)return;let I=()=>{let Z=a?a.get():null;return Z&&typeof Z.revision=="number"?Z.revision:0},$=await s("worker-attempt-resume",{attempt_id:m,expected_revision:I()});if($&&$.conflict){let Z=$.queue&&typeof $.queue.revision=="number"?$.queue.revision:I();$=await s("worker-attempt-resume",{attempt_id:m,expected_revision:Z})}$&&$.resumed===!1&&!$.conflict&&$.reason&&te(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${$.reason}`,"error",2400)}let F={onOpen:y,onResume:z,onToggleUsage:R};function K(){let m=a?a.get():null,I=m&&m.default_exec_preset_id,$=typeof I=="string"?at()?.presets.find(Z=>Z.id===I):null;return $&&$.compatible!==!1&&$.settings?$.settings:{}}function ae(){let m=a?a.get():null,I=m&&m.default_exec_preset_id,$=typeof I=="string"?at()?.presets.find(Z=>Z.id===I):null;return $&&$.compatible!==!1&&typeof $.name=="string"?$.name:""}function xe(){let m=a?a.get():null;return m&&m.runner_catalog||null}function De(){let m=p?.metadata&&typeof p.metadata=="object"?p.metadata:{},$=(Object.hasOwn(f,"orchestration_model")?f.orchestration_model:void 0)||(typeof m.orchestration_model=="string"?m.orchestration_model:"")||(typeof K().orchestration_model=="string"?K().orchestration_model:"")||"opus";return er(xe(),$)}function at(){let m=i?i.get():null;return!m||typeof m.revision!="number"?null:{revision:m.revision,presets:Array.isArray(m.presets)?m.presets:[]}}function it(m){let I=m&&m.settings&&typeof m.settings=="object"?m.settings:{},$=Z=>typeof I[Z]=="string"?I[Z]:Z==="impl_runtime"&&typeof I.impl_model=="string"&&er(xe(),I.impl_model)||"";return Nr({selectedOf:$,effectiveOf:$,runner_catalog:xe()}).some(Z=>Z.groups.some(Ue=>Ue.options.some(ot=>ot.value===Z.selected&&ot.label.endsWith("(\uBE44\uD638\uD658)"))))}function lt(m){i&&m&&typeof m.revision=="number"&&Array.isArray(m.presets)&&i.set({revision:m.revision,presets:m.presets})}async function ze(){let m=at(),I=m?.presets.find($=>$.id===g);if(!(!s||!d||!m||!I||it(I)||A)){A=!0,ee();try{let $=await Promise.resolve(s("apply-exec-preset",{id:d,preset_id:I.id,expected_revision:m.revision}));if($&&$.conflict){lt($),te("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let Z=$&&Array.isArray($.issue)?$.issue[0]:$?.issue;if($&&$.applied&&Z&&typeof Z=="object"){p=Z;for(let Ue of Mr)delete f[Ue];te("\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",2400);return}$&&$.error==="bd_readback_failed"?te("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):te("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch($){$&&typeof $=="object"&&$.code==="bd_readback_failed"?te("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):te("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{A=!1,ee()}}}function Pt(){let m=at();if(m&&m.presets.length===0)return c`<section class="detail-exec-presets">
        <div class="detail-section-label">실행 프리셋</div>
        <p>전역 실행 설정에서 프리셋을 추가하세요.</p>
        <button
          type="button"
          data-open-exec-presets
          @click=${()=>t.onOpenExecPresets?.()}
        >
          전역 실행 설정 열기
        </button>
      </section>`;let I=m?m.presets:[],$=I.find(Ue=>Ue.id===g),Z=$?it($):!1;return c`<section class="detail-exec-presets">
      <div class="detail-section-label">실행 프리셋</div>
      <div class="detail-exec-presets__controls">
        <select
          data-exec-preset-select
          aria-label="실행 프리셋"
          ?disabled=${m===null||A}
          @change=${Ue=>{g=Ue.target.value,ee()}}
        >
          <option value="" ?selected=${g===""}>
            ${m===null?"\uBD88\uB7EC\uC624\uB294 \uC911\u2026":"\uD504\uB9AC\uC14B \uC120\uD0DD"}
          </option>
          ${I.map(Ue=>{let ot=it(Ue);return c`<option
              value=${Ue.id}
              ?selected=${Ue.id===g}
            >
              ${Ue.name}${ot?" (\uBE44\uD638\uD658)":""}
            </option>`})}
        </select>
        <button
          type="button"
          data-apply-exec-preset
          ?disabled=${m===null||!$||Z||A}
          @click=${()=>{ze()}}
        >
          12개 설정 적용
        </button>
      </div>
      <p>적용하면 현재 이슈 실행 설정 전체를 교체합니다.</p>
    </section>`}let vt=null;r&&r.subscribe&&(vt=r.subscribe(()=>tt()));let _t=null;a&&typeof a.subscribe=="function"&&(_t=a.subscribe(()=>{d&&ee()}));let dt=null;i&&typeof i.subscribe=="function"&&(dt=i.subscribe(()=>{d&&ee()}));function Ne(m){m.key==="Escape"&&d&&(m.preventDefault(),n())}document.addEventListener("keydown",Ne);function tt(){if(d){if(r&&typeof r.snapshotFor=="function"){let m=r.snapshotFor("detail:"+d)||[];p=m.find($=>$&&$.id===d)||m[0]||p}Ge(),ee()}}function ut(m){vr(m).then(I=>{I?te("\uBCF5\uC0AC\uB428","success",1200):te("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function nt(m){m.preventDefault(),m.stopPropagation(),d&&ut(d)}function st(m,I){m.preventDefault(),m.stopPropagation(),ut(I)}function pt(m,I,$){m.preventDefault(),m.stopPropagation(),Re.open(I,{missing_state:$})}function M(m,I){f[m]=I,ee(),!(!s||!d)&&Promise.resolve(s("update-exec-settings",{id:d,key:m,value:I})).catch(()=>{te("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function W(m,I){let $=p||{},Z=$.metadata&&typeof $.metadata=="object"?$.metadata:{},Ue={};for(let Fe of["impl_runtime","impl_model","impl_effort"])Ue[Fe]=Object.hasOwn(f,Fe)?f[Fe]:typeof Z[Fe]=="string"?Z[Fe]:"";Ue[m]=I;let ot=Vn(Ue,xe(),De()),ht={};for(let Fe of["impl_runtime","impl_model","impl_effort"])ht[Fe]=f[Fe],f[Fe]=ot[Fe]||"";ee(),!(!s||!d)&&Promise.resolve(s("update-impl-target",{id:d,...ot,orchestration_runtime:De()})).then(Fe=>{let It=Array.isArray(Fe)?Fe[0]:Fe;if(!It||typeof It!="object"||!It.id)throw new Error("implementation target readback failed");p=It;for(let qr of["impl_runtime","impl_model","impl_effort"])delete f[qr];ee()}).catch(()=>{for(let Fe of["impl_runtime","impl_model","impl_effort"])ht[Fe]===void 0?delete f[Fe]:f[Fe]=ht[Fe];ee(),te("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function ce(m,I,$){if(!s||!d)return!1;try{let Z=await Promise.resolve(s(m,I)),Ue=Array.isArray(Z)?Z[0]:Z;return Ue&&typeof Ue=="object"&&Ue.id?(p=Ue,!0):(te($,"error"),!1)}catch{return te($,"error"),!1}}function ue(m){setTimeout(()=>{try{let I=e.querySelector(m);I&&typeof I.focus=="function"&&I.focus()}catch{}},0)}function he(){x=!0,P=p&&p.title||"",ee(),ue('.detail-edit__input[data-edit="title"]')}function Te(m){P=m.target.value}function He(){x=!1,P="",ee()}function Qe(){ce("edit-text",{id:d,field:"title",value:P},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(I=>{I&&(x=!1,P=""),ee()})}function Ee(){T=!0,w=p&&p.description||"",ee(),ue('.detail-edit__textarea[data-edit="description"]')}function Ve(m){w=m.target.value}function u(){T=!1,w="",ee()}function k(){ce("edit-text",{id:d,field:"description",value:w},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(I=>{I&&(T=!1,w=""),ee()})}function j(m,I,$,Z){if(m.key==="Escape"){m.stopPropagation(),$();return}m.key==="Enter"&&(!Z||m.ctrlKey||m.metaKey)&&(m.preventDefault(),I())}function pe(m){let I=m.target.value;ce("update-status",{id:d,status:I},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>ee())}function be(m){let I=Number(m.target.value);ce("update-priority",{id:d,priority:I},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>ee())}function we(m){Y=m.target.value}function se(){let m=Y.trim();m.length!==0&&ce("label-add",{id:d,label:m},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(I=>{I&&(Y=""),ee()})}function Se(m){if(m.key==="Escape"){m.stopPropagation(),Y="",ee();return}m.key==="Enter"&&(m.preventDefault(),se())}function fe(m){ce("label-remove",{id:d,label:m},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>ee())}let Je={onCopyPath:st,onOpenDoc:pt},St={onChange:M,onImplTargetChange:W};function mt(m){return typeof m=="string"?m:m&&typeof m=="object"?String(m.id||m.to||m.issue_id||m.depends_on||""):""}function et(m){switch(m&&typeof m=="object"?String(m.dependency_type||m.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function At(m){let $=(Array.isArray(m.dependencies)?m.dependencies:[]).map(Z=>({id:mt(Z),icon:et(Z)})).filter(Z=>Z.id.length>0);return c`
      <div class="detail-section-label">의존성</div>
      ${$.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${$.map(Z=>o?c`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(Z.id)}
                  >
                    ${Z.icon?`${Z.icon} `:""}${Z.id}
                  </button>`:c`<span class="detail-dep"
                    >${Z.icon?`${Z.icon} `:""}${Z.id}</span
                  >`)}
          </div>`}
    `}function Mt(m){let I=m.metadata||{},$=m.workflow||{},Z=$.stages||{},Ue=Z.spec&&Z.spec.stale,ot=Z.impl&&Z.impl.stale,ht=Z.plan||null,Fe=$.route_source==="derived",It=$.route||I.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${Fe?" detail-kv__v--derived":""}"
          title=${Fe?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${Fe?"unset":It}</span
        >
      </div>
      ${$.route!=="quick_fix"||Object.hasOwn(I,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${I.spec_review||"\uC5C6\uC74C"}${Ue?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${$.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${ht?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${ht?.approval_receipt||"\uC5C6\uC74C"}${ht?.approval_state==="stale"?" \xB7 stale":ht?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${$.route!=="quick_fix"||Object.hasOwn(I,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${I.impl_review||"\uC5C6\uC74C"}${ot?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${I.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${I.pr_url}</span>
          </div>`:""}
    `}let Et={route:["quick_fix","spec_backed","full_plan"]};async function Ct(m,I){let $=I.target.value;if(m==="route"&&p&&p.metadata&&p.metadata.route==="full_plan"&&$!=="full_plan"&&!window.confirm(`full_plan \u2192 ${$||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){ee();return}await ce("update-workflow-meta",{id:d,key:m,value:$},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),ee()}function Ce(m){let I=m.metadata||{};return c` ${((Z,Ue)=>{let ot=Et[Z],ht=typeof I[Z]=="string"?I[Z]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${Z}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${Z}
          data-edit=${`wfmeta-${Z}`}
          @change=${Fe=>Ct(Z,Fe)}
        >
          <option value="" ?selected=${!ot.includes(ht)}>
            ${Ue}
          </option>
          ${ot.map(Fe=>c`<option value=${Fe} ?selected=${ht===Fe}>${Fe}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function Q(m,I){return x?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${P}
            @input=${Te}
            @keydown=${$=>j($,Qe,He,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${Qe}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${He}
            >
              취소
            </button>
          </div>
        </div>
      `:c`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${m}</h2>
        ${gt(I).map($=>c`<span class="detail-usage-total" title=${$.tooltip}
              >${$.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${he}
        >
          ✎
        </button>
      </div>
    `}function b(m){let I=bt(m.created_at),$=bt(m.updated_at);return!I&&!$?c``:c`
      ${I?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${I}</span>
          </div>`:""}
      ${$?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${$}</span>
          </div>`:""}
    `}function G(m,I){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${pe}
        >
          ${Bu.map($=>c`<option value=${$} ?selected=${$===m}>${$}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${be}
        >
          ${Uu.map($=>c`<option value=${String($)} ?selected=${$===I}>
                P${$}
              </option>`)}
        </select>
      </div>
    `}function _(m){return c`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${T?"":c`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${Ee}
            >
              ✎
            </button>`}
      </div>
      ${T?c`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${w}
              @input=${Ve}
              @keydown=${I=>j(I,k,u,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${k}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${u}
              >
                취소
              </button>
            </div>
          </div>`:c`<div class="detail-overlay__desc">
            ${m||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function v(m){let I=typeof m.notes=="string"?m.notes:"";return I.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${I}</div>
    `}function re(m){let I=Array.isArray(m.labels)?m.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${I.map($=>c`<span class="detail-label-chip"
              >${$}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${$}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+$}
                @click=${()=>fe($)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${Y}
            @input=${we}
            @keydown=${Se}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${se}
          >
            추가
          </button>
        </span>
      </div>
    `}function ne(){if(!d)return c``;let m=p||{},I=String(m.id||d),$=m.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",Z=D(),Ue=m.status||"open",ot=typeof m.priority=="number"?Math.max(0,Math.min(4,m.priority)):"",ht=m.description||"",Fe={...m,metadata:{...m.metadata||{},...f}};return c`
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
            @click=${nt}
          >
            ${I}
          </button>
          ${Q($,Z)}
          ${G(Ue,ot)} ${b(m)}
          ${_(ht)}
          ${gi(q,ge,{expanded:de,draft:C,sending:le,error:L})}
          ${v(m)} ${re(m)} ${At(m)}
          ${Mt(m)} ${Ce(m)}
          ${pi(m,Je)}
          ${Pt()}
          ${$i(Fe,St,K(),xe(),ae())}
          ${Ri({expanded:X,loading:Oe,error:_e,data:ke},{onToggle:Xe})}
          ${Ci(Ie(),F,{total:Z,expanded:U})}
        </div>
      </div>
    `}function ee(){qe(ne(),e)}return{load(m){m!==d&&(f={},g="",V(),me(),ve()),d=m,p=null,tt()},clear(){d=null,p=null,f={},g="",A=!1,V(),me(),ve(),Re.close(),H.close(),qe(c``,e)},destroy(){vt&&(vt(),vt=null),_t&&(_t(),_t=null),dt&&(dt(),dt=null),document.removeEventListener("keydown",Ne),Re.destroy(),ye.parentNode&&ye.parentNode.removeChild(ye),H.destroy(),J.parentNode&&J.parentNode.removeChild(J),d=null,p=null,g="",A=!1,me(),ve(),qe(c``,e)}}}var ju=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function Li(e,t){return vs(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function zu(e,t,r){if(!r)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let n=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:n,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:n}}function Oi(e,t){let{policyStore:r,transport:n,labelOptions:s}=t,o=document.createElement("dialog");o.id="display-settings-dialog",o.className="display-settings",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),e.appendChild(o);let a="";async function i(S){let L=r.get();if(L)try{let C=await n("display-policy-set",{expected_revision:L.revision,policy:S(L)});l(C),C&&C.conflict&&C.policy&&(C=await n("display-policy-set",{expected_revision:C.policy.revision,policy:S(C.policy)}),l(C)),C&&C.conflict&&te("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{te("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function l(S){S&&S.policy&&typeof S.policy=="object"&&r.set(S.policy)}function d(S){let L=r.get();if(!L)return;let C=Li(S,L)!=="shown";i(le=>zu(S,le,C))}function p(){let S=a.trim();S.length!==0&&(a="",i(L=>L.hidden_prefixes.includes(S)?{hidden_prefixes:L.hidden_prefixes}:{hidden_prefixes:[...L.hidden_prefixes,S]}),P())}function f(S){i(L=>({hidden_prefixes:L.hidden_prefixes.filter(C=>C!==S)}))}function g(S){let L=r.get();if(!L)return;let C=L.chips[S]===!1;i(()=>({chips:{[S]:C}}))}function A(S){let L=s();return c`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">라벨 표시</h3>
        <p class="display-settings__hint">
          라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을
          누르면 그 라벨만 예외로 다시 표시됩니다.
        </p>
        ${L.length===0?c`<div class="display-settings__empty">라벨 없음</div>`:c`<div class="display-settings__pills">
              ${L.map(C=>{let le=Li(C,S);return c`<button
                  type="button"
                  class=${`display-settings__pill display-settings__pill--${le}`}
                  data-label=${C}
                  data-state=${le}
                  @click=${()=>d(C)}
                >
                  ${C}
                </button>`})}
            </div>`}
      </section>
    `}function x(S){return c`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">숨김 prefix</h3>
        <div class="display-settings__prefixes">
          ${S.hidden_prefixes.map(L=>c`<span class="display-settings__prefix">
                ${L}
                <button
                  type="button"
                  class="display-settings__prefix-remove"
                  aria-label=${`${L} \uADDC\uCE59 \uC81C\uAC70`}
                  @click=${()=>f(L)}
                >
                  ×
                </button>
              </span>`)}
        </div>
        <div class="display-settings__prefix-add">
          <input
            type="text"
            class="display-settings__prefix-input"
            aria-label="숨길 prefix"
            placeholder="예: reviewed:"
            .value=${a}
            @input=${L=>{a=String(L.target.value||"")}}
          />
          <button type="button" @click=${p}>추가</button>
        </div>
      </section>
    `}function T(S){return c`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">카드 표시 요소</h3>
        <div class="display-settings__toggles">
          ${ju.map(([L,C])=>c`<label class="display-settings__toggle">
                <input
                  type="checkbox"
                  data-chip=${L}
                  .checked=${S.chips[L]!==!1}
                  @change=${()=>g(L)}
                />
                <span>${C}</span>
              </label>`)}
        </div>
      </section>
    `}function P(){let S=r.get();qe(c`
        <div class="display-settings__container">
          <header class="display-settings__header">
            <div class="display-settings__title">표시 설정</div>
            <button
              type="button"
              class="display-settings__close"
              aria-label="닫기"
              @click=${E}
            >
              ×
            </button>
          </header>
          <div class="display-settings__body">
            ${S?c`${A(S)} ${x(S)}
                ${T(S)}`:c`<div class="display-settings__empty">
                  표시 정책을 불러오는 중…
                </div>`}
          </div>
        </div>
      `,o)}let w=!1,Y=()=>{w=!1};o.addEventListener("close",Y),o.addEventListener("cancel",Y);let V=null;r.subscribe&&(V=r.subscribe(()=>{w&&P()}));function q(){w||(a="",w=!0,P(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function E(){w&&(w=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:q,close:E,destroy(){w=!1,o.removeEventListener("close",Y),o.removeEventListener("cancel",Y),V&&(V(),V=null),o.remove()}}}function Di(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let r=t.querySelector("#fatal-error-title"),n=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),i=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},l=(d,p,f="")=>{r&&(r.textContent=d||"Unexpected Error"),n&&(n.textContent=p||"An unrecoverable error occurred.");let g=typeof f=="string"?f.trim():"";if(s&&(g.length>0?(s.textContent=g,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>i()),t.addEventListener("cancel",d=>{d.preventDefault(),i()}),{open:l,close:i,getElement(){return t}}}function Pi(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";if(e<6e4)return`${Math.round(e/1e3)}\uCD08`;let t=e/6e4;return`${Number.isInteger(t)?t:Math.round(t*10)/10}\uBD84`}function Mi(e){return Array.isArray(e)?e.filter(t=>typeof t=="string").join(" "):""}var Hu={deployed:{modifier:"ok",label:"\uC131\uACF5"},launched:{modifier:"launched",label:"\uBC1C\uC0AC\uB428 \xB7 \uACB0\uACFC \uBBF8\uAD00\uCE21"},failed:{modifier:"fail",label:"\uC2E4\uD328"}},Ni=160;function Wu(e){return e.length>Ni?`${e.slice(0,Ni)}\u2026`:e}function Kn(e,t){let{queueStore:r,presetStore:n,transport:s,getWorkspacePath:o}=t,a=document.createElement("dialog");a.id="worker-exec-defaults-dialog",a.className="exec-defaults",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),e.appendChild(a);let i=null,l=!1;function d(){return r&&r.get()||{revision:0,exec_defaults:{}}}function p(){let y=d();return typeof y.revision=="number"?y.revision:0}function f(){let y=n?n.get():null;return!y||typeof y.revision!="number"?null:{revision:y.revision,presets:Array.isArray(y.presets)?y.presets:[]}}function g(y){n&&y&&typeof y.revision=="number"&&Array.isArray(y.presets)&&n.set({revision:y.revision,presets:y.presets})}function A(y){y&&y.queue&&r&&r.set(y.queue)}function x(){return d().runner_catalog??null}let T=null;function P(){if(T!==null)return T;let y=d().default_exec_preset_id;return typeof y=="string"&&y.length>0?y:null}async function w(y){if(!s)return;let z=f();if(!z)return;T=y||"";let F=E(y);if(oe(),!F.viable){te(F.missing?"\uC120\uD0DD\uD55C \uD504\uB9AC\uC14B\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC5B4 \uC800\uC7A5\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.":"\uBE44\uD638\uD658 \uD504\uB9AC\uC14B\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8\uAC12\uC73C\uB85C \uC800\uC7A5\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.","error",4e3);return}try{let K=await s("worker-queue-set-default-exec-preset",{preset_id:y||null,expected_queue_revision:p(),expected_preset_revision:z.revision});if(A(K),K&&K.presets&&n&&n.set(K.presets),K&&K.conflict){te("\uAE30\uBCF8 \uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uC120\uD0DD\uC744 \uAC80\uD1A0\uD55C \uB4A4 \uB2E4\uC2DC \uC800\uC7A5\uD558\uC138\uC694.","error",4e3);return}if(K&&K.applied){T=null,oe();return}te("\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8 \uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}catch{te("\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8 \uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function Y(y){i={id:y.id,name:y.name,settings:{...y.settings||{}}},L(),l=!1,oe()}function V(){i={id:null,name:"",settings:{}},l=!1,oe()}function q(y){let z=y&&y.settings&&typeof y.settings=="object"?y.settings:{},F=K=>typeof z[K]=="string"?z[K]:K==="impl_runtime"&&typeof z.impl_model=="string"&&er(x(),z.impl_model)||"";return Nr({selectedOf:F,effectiveOf:F,runner_catalog:x()}).some(K=>K.groups.some(ae=>ae.options.some(xe=>xe.value===K.selected&&xe.label.endsWith("(\uBE44\uD638\uD658)"))))}function E(y){if(!y)return{viable:!0,missing:!1,incompatible:!1,preset:null};let F=f()?.presets.find(ae=>ae.id===y);if(!F||F.migration_pending===!0)return{viable:!1,missing:!0,incompatible:!1,preset:null};let K=F.compatible===!1||q(F);return{viable:!K,missing:!1,incompatible:K,preset:F}}function S(){let y=i?.settings.orchestration_model;return typeof y!="string"?null:er(x(),y)}function L(){if(!i)return;let y=Vn({impl_runtime:i.settings.impl_runtime||"",impl_model:i.settings.impl_model||"",impl_effort:i.settings.impl_effort||""},x(),S());for(let z of["impl_runtime","impl_model","impl_effort"])y[z]?i.settings[z]=y[z]:delete i.settings[z]}function C(y){let z=y&&y.settings&&typeof y.settings=="object"?y.settings:{},F=Mr.filter(ae=>typeof z[ae]=="string").length,K=Mr.filter(ae=>typeof z[ae]=="string").map(ae=>`${Gs[ae]?.title||ae}: ${z[ae]}`);return{count:`${F}/12 \uC9C0\uC815`,choices:K.length>0?K.join(" \xB7 "):"\uBAA8\uB4E0 \uD56D\uBAA9 \uAE30\uBCF8\uAC12"}}async function le(y){if(!s||!window.confirm(`\u201C${y.name}\u201D \uD504\uB9AC\uC14B\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694? \uC774\uBBF8 \uC801\uC6A9\uB41C \uC774\uC288\uB294 \uBCC0\uACBD\uB418\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.`))return;let z=f();if(z)try{let F=await s("exec-preset-delete",{expected_revision:z.revision,id:y.id});g(F),F&&F.conflict&&te("\uD504\uB9AC\uC14B\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694.","error",4e3)}catch{te("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328","error",4e3)}}async function $e(y=!1){if(!s||!i)return;let z=f();if(!z)return;let F=y||i.id===null,K={expected_revision:z.revision,...F?{}:{id:i.id},name:i.name,settings:{...i.settings}};try{let ae=await s(F?"exec-preset-create":"exec-preset-update",K);if(g(ae),ae&&ae.conflict){l=!0,oe();return}if(ae&&ae.applied){i=null,l=!1,oe();return}te("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}catch{te("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function de(y){return c`<div class="exec-defaults__row exec-preset-editor__row">
      <span class="exec-defaults__k">${Vs(y.key)}</span>
      <select
        class="exec-defaults__sel"
        data-preset-key=${y.key}
        ?disabled=${y.disabled}
        @change=${z=>{if(!i)return;let F=z.target.value;F?i.settings[y.key]=F:delete i.settings[y.key],(y.key==="impl_runtime"||y.key==="impl_model"||y.key==="impl_effort"||y.key==="orchestration_model")&&L(),l=!1,oe()}}
      >
        ${Yn(y.groups,y.selected,Ys[y.key]||"(\uAE30\uBCF8)")}
      </select>
    </div>`}function me(){if(!i)return"";let y=ae=>typeof i?.settings[ae]=="string"?i.settings[ae]:"",z=Nr({selectedOf:y,effectiveOf:y,runner_catalog:x(),controller_runtime:S()}),F=f(),K=i.id!==null&&F!==null&&!F.presets.some(ae=>ae.id===i?.id);return c`<div class="exec-preset-editor" data-preset-editor>
      <label class="exec-preset-editor__name">
        프리셋 이름
        <input
          type="text"
          value=${i.name}
          data-preset-name
          @input=${ae=>{i&&(i.name=ae.target.value,l=!1)}}
        />
      </label>
      ${l?c`<p class="exec-preset-editor__conflict" data-preset-conflict>
            다른 곳에서 변경됨 — 최신 목록을 확인한 뒤 다시 저장하세요.
          </p>`:""}
      ${K?c`<p class="exec-preset-editor__conflict">
            편집하던 프리셋이 다른 곳에서 삭제됐습니다.
          </p>`:""}
      ${z.map(de)}
      <div class="exec-preset-editor__actions">
        ${K?c`<button
              type="button"
              data-preset-save-as-new
              @click=${()=>{$e(!0)}}
            >
              새 프리셋으로 저장
            </button>`:c`<button
              type="button"
              data-preset-save
              @click=${()=>{$e(!1)}}
            >
              저장
            </button>`}
        <button
          type="button"
          data-preset-cancel
          @click=${()=>{i=null,l=!1,oe()}}
        >
          취소
        </button>
      </div>
    </div>`}function Le(){let y=f(),z=y?y.presets.filter(F=>F?.migration_pending!==!0):[];return c`<section class="exec-presets" data-exec-presets>
      <div class="exec-presets__heading">
        <h3>공용 실행 프리셋</h3>
        <button type="button" data-preset-new @click=${V}>
          + 새 프리셋
        </button>
      </div>
      <p class="exec-defaults__hint">
        모든 워크스페이스에서 공유하며, 이슈에 적용하면 값이 복사됩니다.
      </p>
      ${y===null?c`<p class="exec-presets__empty">프리셋을 불러오는 중…</p>`:z.length===0?c`<p class="exec-presets__empty">
              아직 공용 프리셋이 없습니다.
            </p>`:z.map(F=>{let K=C(F),ae=typeof F.reference_count=="number",xe=ae?F.reference_count:null,De=Array.isArray(F.reference_summary)?F.reference_summary.map(at=>at?.display_name||at?.workspace_key).filter(Boolean).join(", "):"";return c`<article
                class="exec-preset-card"
                data-preset-id=${F.id}
              >
                <div class="exec-preset-card__main">
                  <strong>${F.name}</strong>
                  <span>${K.count}</span>
                  <span data-preset-references=${F.id}
                    >${ae?`\uCC38\uC870 ${xe}\uAC1C`:"\uCC38\uC870 \uD655\uC778 \uBD88\uAC00"}</span
                  >
                  ${q(F)?c`<span data-preset-incompatible>비호환</span>`:""}
                  <small>${K.choices}</small>
                  ${De?c`<small data-preset-impact=${F.id}
                        >업데이트 영향: ${De}</small
                      >`:""}
                </div>
                <div class="exec-preset-card__actions">
                  <button
                    type="button"
                    data-preset-edit=${F.id}
                    @click=${()=>Y(F)}
                  >
                    편집
                  </button>
                  <button
                    type="button"
                    data-preset-delete=${F.id}
                    ?disabled=${xe===null||xe>0||F.reference_scan_complete===!1}
                    title=${xe===null?"\uCC38\uC870 \uC218\uB97C \uD655\uC778\uD560 \uC218 \uC5C6\uC5B4 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":xe>0?"\uCC38\uC870 \uC911\uC778 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC788\uC5B4 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":F.reference_scan_complete===!1?"\uCC38\uC870 \uC2A4\uCE94\uC774 \uC644\uB8CC\uB418\uC9C0 \uC54A\uC544 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":""}
                    @click=${()=>{le(F)}}
                  >
                    삭제
                  </button>
                </div>
              </article>`})}
      ${me()}
    </section>`}function Ge(){let y=f(),z=y?y.presets.filter(De=>De?.migration_pending!==!0):[],F=P()||"",K=E(F),ae=K.preset,xe=ae?C(ae):null;return c`<section class="exec-defaults__workspace" data-workspace-preset>
      <h3>현재 워크스페이스 기본 프리셋</h3>
      <p class="exec-defaults__hint">
        이 워크스페이스는 프리셋 하나를 참조합니다. 없음은 harness 기본값을
        사용합니다.
      </p>
      <select
        class="exec-defaults__sel"
        data-workspace-preset-select
        aria-label="워크스페이스 기본 프리셋"
        .value=${F}
        ?disabled=${y===null}
        @change=${De=>{w(De.target.value)}}
      >
        <option value="" ?selected=${F===""}>
          없음 — harness 기본값
        </option>
        ${F&&K.missing?c`<option value=${F} ?selected=${!0}>
              ${F} (선택한 프리셋 없음)
            </option>`:""}
        ${z.map(De=>c`<option
              value=${De.id}
              ?selected=${De.id===F}
              ?disabled=${De.compatible===!1}
            >
              ${De.name}${De.compatible===!1?" (\uBE44\uD638\uD658)":""}
            </option>`)}
      </select>
      ${ae?c`<p data-workspace-preset-summary>
            ${xe?.count} · ${xe?.choices}
            ${K.incompatible?" \xB7 \uBE44\uD638\uD658":""}
          </p>`:""}
      ${K.missing?c`<p data-workspace-preset-missing>
            선택한 프리셋을 찾을 수 없습니다. 실행이 차단됩니다.
          </p>`:K.incompatible?c`<p data-workspace-preset-incompatible>
              선택한 프리셋이 비호환입니다. 실행이 차단됩니다.
            </p>`:""}
    </section>`}function Ye(){let y=d().workspace_info;return y&&typeof y=="object"?y:{}}function Me(y,z){return c`<span
      class="exec-defaults__vd-badge exec-defaults__vd-badge--${y}"
      >${z}</span
    >`}function Be(y){let z=y?Mi(y.cmd):"",F=y?Pi(y.timeout_ms):"",K=o&&o()||"<workspace \uACBD\uB85C>";return c`<div class="exec-defaults__vd-group" data-vd="verify">
      <div class="exec-defaults__vd-label">머지 전 검증 (verify)</div>
      ${z?c`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${z}</span>
            ${Me("config","config")}
            ${F?c`<span class="exec-defaults__vd-meta"
                  >timeout ${F}</span
                >`:""}
          </div>`:c`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            검증 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.verify."${K}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function ge(y){let z=y?Mi(y.cmd):"",F=y?Pi(y.timeout_ms):"",K=F?`timeout ${F} \xB7 verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589`:"verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589",ae=o&&o()||"<workspace \uACBD\uB85C>";return c`<div class="exec-defaults__vd-group" data-vd="deploy">
      <div class="exec-defaults__vd-label">머지 후 배포 (deploy)</div>
      ${z?c`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${z}</span>
            ${Me("config","config")}
            ${y.detached===!0?Me("detached","detached"):""}
            <span class="exec-defaults__vd-meta">${K}</span>
          </div>`:c`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            배포 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.deploy."${ae}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function ye(y){if(!y||typeof y!="object")return"";let z=Hu[String(y.outcome)];if(!z)return"";let F=y.outcome==="failed"&&y.reason?`${z.label} \xB7 ${y.reason}`:z.label,K=[bt(y.at),typeof y.bead_id=="string"?y.bead_id:"",typeof y.base_sha=="string"?y.base_sha.slice(0,7):""].filter(De=>De.length>0).join(" \xB7 "),ae=typeof y.detail=="string"&&y.detail.length>0?Wu(y.detail):"",xe=typeof y.log_path=="string"&&y.log_path.length>0?y.log_path:"";return c`<div class="exec-defaults__vd-group" data-vd="last-deploy">
      <div class="exec-defaults__vd-label">마지막 배포</div>
      <div class="exec-defaults__vd-line">
        ${Me(z.modifier,F)}
        ${K?c`<span class="exec-defaults__vd-meta">${K}</span>`:""}
      </div>
      ${ae?c`<div class="exec-defaults__vd-line" data-vd-part="detail">
            <code class="exec-defaults__vd-cmd">${ae}</code>
          </div>`:""}
      ${xe?c`<div class="exec-defaults__vd-line" data-vd-part="log-path">
            전체 로그:
            <code class="exec-defaults__vd-cmd">${xe}</code>
          </div>`:""}
    </div>`}let Re=!1,J=!1,H=!1,X=null;async function Oe(){if(s){J=!0,H=!1,oe();try{let y=await Promise.resolve(s("get-worker-system-prompt",{}));!y||typeof y!="object"||Array.isArray(y)?H=!0:X=y}catch{H=!0}finally{J=!1,oe()}}}function _e(){if(Re=!Re,Re&&!X){Oe();return}oe()}function ke(){return c`<section class="exec-defaults__sp" data-seam="system-prompt">
      <p class="exec-defaults__vd-title">
        워커 시스템 프롬프트
        <span class="exec-defaults__vd-ro">읽기 전용 — 서버가 조립</span>
        <button
          type="button"
          class="exec-defaults__sp-toggle"
          data-seam="system-prompt-toggle"
          aria-expanded=${Re?"true":"false"}
          @click=${_e}
        >
          ${Re?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
        </button>
      </p>
      ${Re?B():""}
    </section>`}function B(){let y=Dr({loading:J,error:H});if(y)return y;if(!X)return"";let z=Array.isArray(X.variants)?X.variants:[];return c`<div class="exec-defaults__sp-body">
      ${X.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${X.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${z.map(F=>c`<div class="exec-defaults__sp-variant" data-variant=${F.key}>
            <div class="exec-defaults__sp-cond">${F.condition}</div>
            ${Jt(F.label,F.system_prompt)}
          </div>`)}
    </div>`}function O(y){return c`<section class="exec-defaults__vd">
      <p class="exec-defaults__vd-title">
        검증·배포 설정
        <span class="exec-defaults__vd-ro"
          >읽기 전용 — config.toml에서 정의</span
        >
      </p>
      ${Be(y.verify_cmd)} ${ge(y.deploy_cmd)}
      ${ye(y.last_deploy)}
    </section>`}function oe(){if(qe(c`
        <div class="exec-defaults__container">
          <header class="exec-defaults__header">
            <div class="exec-defaults__title">전역 실행 설정</div>
            <button
              type="button"
              class="exec-defaults__close"
              aria-label="닫기"
              @click=${R}
            >
              ×
            </button>
          </header>
          <div class="exec-defaults__body">
            ${Le()} ${Ge()}
            ${O(Ye())}
            ${ke()}
          </div>
        </div>
      `,a),T!==null){let y=a.querySelector("[data-workspace-preset-select]");y&&(y.value=T)}}let ve=!1,Ae=()=>{ve=!1},Xe=y=>{y.target===y.currentTarget&&R()};a.addEventListener("close",Ae),a.addEventListener("cancel",Ae),a.addEventListener("click",Xe);let Ie=null;r&&r.subscribe&&(Ie=r.subscribe(()=>{ve&&oe()}));let D=null;n&&n.subscribe&&(D=n.subscribe(()=>{ve&&oe()}));function U(){ve||(ve=!0,oe(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""))}function R(){ve&&(ve=!1,typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:U,close:R,destroy(){ve=!1,a.removeEventListener("close",Ae),a.removeEventListener("cancel",Ae),a.removeEventListener("click",Xe),Ie&&(Ie(),Ie=null),D&&(D(),D=null),a.remove()}}}function Fr(e){let t=Rt(e.created_at),r=Rt(e.updated_at);return!t&&!r?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${bt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&r?c`<span>·</span>`:""}${r?c`<span title=${`\uC218\uC815 ${bt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </div>`}function Gu(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function an(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function Zn(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function Ht(e,t,r={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(p=>p&&p.bead_id===t&&p.phase!=="done").sort((p,f)=>(p.requested_at||0)-(f.requested_at||0)).at(-1),o=typeof r.attempt_id=="string"&&r.attempt_id.length>0?r.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=r.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":r.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":r.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,i=typeof s?.last_error=="string"?s.last_error:null,l=s?Gu(s.phase):null,d=r.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!r.external&&!r.done,enabled:!a&&(!s||!!i),label:i?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(i?`\uD3D0\uAE30 \uC2E4\uD328: ${i} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${l||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:d==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:l,error:i,confirmation:d}}function tr(e){let t=e.discard;if(!t||!t.operation)return"";let r=t.operation,n=r.backup?.path,s=r.original_pr,o=r.revert_pr;return c`<div
    class="worker-discard-receipt"
    role=${t.error?"alert":"status"}
  >
    <span>${t.progress}</span>
    ${t.error?c`<span>폐기 실패: ${t.error}</span>`:""}
    <code>작업: ${r.operation_id}</code>
    ${n?c`<code>백업: ${n}</code>`:t.error?c`<span>아직 아무것도 삭제하지 않음</span>`:""}
    ${s?.url?c`<a href=${s.url} target="_blank" rel="noreferrer noopener"
          >원본 PR #${s.number||"?"}</a
        >`:""}
    ${o?.url?c`<a href=${o.url} target="_blank" rel="noreferrer noopener"
          >revert PR #${o.number||"?"} ·
          ${o.state||"\uC0C1\uD0DC \uBBF8\uD655\uC778"}</a
        >`:""}
  </div>`}function Qs(e){let t=e.draggable&&!e.done,r=t&&e.lane==="queue",n=Array.isArray(e.badges)?e.badges:[],s=gt(e.usage),o=qt(e.usage),a=e.merge_step||null,i=e.lane==="pr_wait"||!!e.revise_action,l=e.lane==="done"&&!i,d=l?Rt(e.done_at):"",p=e.selectable?c`<input
        class="worker-mini__select"
        type="checkbox"
        data-bead-id=${e.id}
        aria-label=${`${e.id} \uC120\uD0DD`}
        .checked=${e.selected===!0}
      />`:"",f=r?c`<button
        type="button"
        class="worker-mini__grip"
        draggable="true"
        data-bead-id=${e.id}
        aria-label=${`${e.id} \uC21C\uC11C \uBCC0\uACBD`}
        title="순서 변경"
      >
        ⠿
      </button>`:t?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",g=e.worker_serial===!0?c`<span class="worker-mini__serial">머지까지 단독</span>`:e.worker_serial===null?c`<span class="worker-mini__serial worker-mini__serial--unknown"
            >실행 방식 확인 중</span
          >`:"",A=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",x=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,T=c`<span class="worker-mini__title">${e.title}</span>`,P=e.pr_url&&e.pr_number?c`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",w=e.completion_repair_pr_url&&e.completion_repair_pr_number?c`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",Y=n.map(me=>me===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${me}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${me===e.completion_badge&&e.completion_title||""}
          >${me}</span
        >`),V=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",q=s.length>0?s.map(me=>c`<span class="worker-usage" title=${me.tooltip}
              >${me.label}</span
            >`):o?c`<span class="worker-usage" title=${Or(e.usage)}
            >${o}</span
          >`:"",E=a?c`<span class="merge-step"
        >${a.label}<span class="merge-step__n"
          >${a.index}/${a.total}</span
        ></span
      >`:"",S=e.merge_action?c`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",L=e.cancel_action?c`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",C=e.discard,le=C?.action||e.discard_action?c`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${C?.attempt_id||""}
          data-operation-id=${C?.operation?.operation_id||""}
          data-discard-mode=${C?.confirmation||"unmerged"}
          ?disabled=${C?!C.enabled:e.discard_enabled===!1}
          title=${C?C.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${C?.label||"\uD3D0\uAE30"}
        </button>`:"",$e=e.revise_action?c`<button
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
        </button>`:"",de=!!(o||a||e.merge_action||e.cancel_action||e.discard_action||C?.operation||e.revise_action);return c`<div
    class="worker-mini${i?" worker-mini--card":""}${e.selected?" worker-mini--selected":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${a?" worker-mini--merging":""}${e.external?" worker-mini--external":""}"
    style=${a?`--progress: ${a.percent}%`:""}
    draggable=${t&&!r?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${l?c`<div class="worker-mini__row1">${A}${x}${T}</div>
          <div class="worker-mini__row2">
            ${q}${d?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${bt(e.done_at)}`}
                  >완료 ${d}</span
                >`:""}${Y}${E}
            <span class="worker-mini__actions"
              >${S}${L}${le}</span
            >
            ${Fr(e)}
          </div>`:i?c`<div class="worker-mini__head">
              ${p}${f}${A}${x}${P}${w}${Y}${g}${V}
            </div>
            <div class="worker-mini__body">${T}</div>
            ${de?c`<div class="worker-mini__foot">
                  ${q}${E}
                  <span class="worker-mini__actions"
                    >${S}${L}${le}${$e}</span
                  >
                  ${tr(e)}
                </div>`:""}
            ${Fr(e)}`:c`<div class="worker-mini__line">
              ${p}${f}${A}${x}${T}${P}${w}${Y}${g}${V}${q}${E}${S}${L}${le}
            </div>
            ${tr(e)} ${Fr(e)}`}
  </div>`}function Yu(e){let t=e.draggable&&!e.done,r=e.workflow,n=r&&r.chips||{},s=n.route||r&&r.route,o=n.route_source==="derived"||!!(r&&r.route_source==="derived"),a=e.is_quick_fix===!0||!!r&&r.route==="quick_fix",i=typeof e.reason=="string"&&e.reason.startsWith("\u26D4");return c`<div
    class="worker-card${t?"":" worker-card--static"}"
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${t?c`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      ${e.workspace_name?c`<span class="worker-card__repo" title=${e.root_dir||""}
            >${e.workspace_name}</span
          >`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span>
      ${r&&s?c`<span
            class="ctl-chip ctl-chip--route${o?" is-derived":""}"
            title=${o?"route \uBBF8\uD540 (metadata unset)":"route"}
            >${o?"unset":s}</span
          >`:""}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${r?Cn(r,e.status):""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${e.reason?c`<span
            class="worker-card__reason${i?" worker-card__reason--danger":""}"
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
    ${Fr(e)}
  </div>`}function Wt(e){let t=!!e.collapsible&&!!e.collapsed,r=c`<span
      class="worker-pane__dot worker-pane__dot--${e.lane}"
      aria-hidden="true"
    ></span>
    <span class="worker-pane__title">${e.title}</span>
    ${t&&e.preview?c`<span class="worker-pane__preview">${e.preview}</span>`:""}
    <span class="worker-pane__count">${e.items.length}</span>`;return c`<section
    class="worker-pane worker-pane--lane-${e.lane}${e.src?" worker-pane--src":""}${e.live?" worker-pane--live":""}${e.collapsible?" worker-pane--collapsible":""}${t?" worker-pane--collapsed":""}"
    id=${e.id}
    data-lane=${e.lane}
  >
    ${e.collapsible?c`<button
          type="button"
          class="worker-pane__hd worker-pane__hd--toggle"
          data-lane=${e.lane}
          aria-expanded=${t?"false":"true"}
        >
          ${r}
          <span class="worker-pane__caret" aria-hidden="true"
            >${t?"\u25B8":"\u25BE"}</span
          >
        </button>`:c`<header class="worker-pane__hd">
          ${r}${e.header_control?e.header_control:""}
        </header>`}
    ${t?"":c`${e.controls?e.controls:""}
          <div class="worker-pane__body">
            ${e.body?e.body:e.items.length===0?c`<div class="worker-pane__empty">
                    ${e.empty||""}
                  </div>`:e.items.map(n=>e.lane==="candidate"?Yu(n):Qs(n))}
          </div>`}
  </section>`}var Fi=160;function qi(e){return e.length>Fi?`${e.slice(0,Fi)}\u2026`:e}function Vu(e){return!e||!e.reason?"":c`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?c` · <code>${qi(e.command)}</code>`:""}
  </div>`}function Ku(e){return e?c`<details class="worker-banner__tail">
    <summary>출력 tail</summary>
    <pre>${e}</pre>
  </details>`:""}function Zu(e){return e?c`<div class="worker-banner__log-path">
    전체 로그: <code>${e}</code>
  </div>`:""}function Js(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),r=Math.floor(t/60),n=t%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function Bi(e){let t=Array.isArray(e.cleanupFailures)?e.cleanupFailures:[];return c`<div class="worker-banners">
    ${e.failure?c`<div class="worker-banner worker-banner--failure" role="alert">
          ⛔ ${e.failure.repo||"repo"} 세션 실패 —
          ${e.failure.reason||""}. 자동 진행을 껐습니다, 수동 ▶ 필요.
          ${e.failure.resume_attempt_id?c`<button
                type="button"
                class="worker-banner__resume"
                data-attempt-id=${e.failure.resume_attempt_id}
                ?disabled=${!e.failure.resume_eligible}
                title=${e.failure.resume_eligible?"\uCD5C\uADFC \uC2E4\uD328 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":e.failure.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}
              >
                ↻ 이어하기
              </button>`:""}
          ${e.failure.discard?.action?c`<button
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
          ${e.failure.resume_attempt_id?c`<button
                type="button"
                class="worker-banner__dismiss"
                data-attempt-id=${e.failure.resume_attempt_id}
                title="이 실패를 처리 완료로 표시하고 배너를 닫습니다"
                aria-label="배너 닫기"
              >
                ✕
              </button>`:""}
          ${Vu(e.failure.cause_detail)}
          ${tr({discard:e.failure.discard})}
        </div>`:""}
    ${t.map(r=>c`<div
          class="worker-banner worker-banner--cleanup"
          role="alert"
          data-bead-id=${r.bead_id}
        >
          ⚠ ${r.bead_id} 머지 완료 — 머지 후 정리가 <b>${r.step}</b> 단계에서
          멈췄습니다 (${r.reason}).
          ${typeof r.retry_count=="number"&&Number.isInteger(r.retry_count)&&r.retry_count>0?c`${r.retry_count}회 자동 재시도 후에도 실패했습니다 — `:""}정리를
          사람이 마무리하세요.
          ${r.detail?c`<div class="worker-banner__detail">
                <code>${qi(r.detail)}</code>
              </div>`:""}
          ${Zu(r.log_path)} ${Ku(r.output_tail)}
        </div>`)}
  </div>`}function Xu(e,t,r=null){let n=e.failed===!0,s=!!e.paused,o=n?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):s?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?Js(t-e.started_at):"\u2014",a=[e.runner,e.model].filter(Boolean).join(" \xB7 "),i=gt(e.usage),l=qt(e.usage),d=e.conflict_resolution?s?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,p=e.base_exception||null,f=e.attempt_id&&e.attempt_id===r,g=e.discard?.action?c`<button
        type="button"
        class="rtile__discard"
        data-operation-id=${e.discard.operation?.operation_id||""}
        ?disabled=${!e.discard.enabled}
        title=${e.discard.title}
        aria-label=${e.discard.label}
      >
        ${e.discard.label}
      </button>`:"";return c`<div
    class="rtile${f?" rtile--sel":""}${s?" rtile--paused":""}${n?" rtile--failed":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span class="rtile__dot" aria-hidden="true"></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${e.resumed_from?c`<span
            class="rtile__resumed"
            title=${`\uC774\uC5B4\uBC1B\uC740 \uC138\uC158 (from ${e.resumed_from})`}
            >↻</span
          >`:""}
      <span class="rtile__elapsed">${o}</span>
      ${n?c`<button
              type="button"
              class="rtile__resume"
              ?disabled=${e.resume_eligible===!1}
              title=${e.resume_eligible===!1?e.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589"}
              aria-label="이어하기"
            >
              ↻ 이어하기
            </button>
            ${g}
            <button
              type="button"
              class="rtile__dismiss"
              title="실패 기록 닫기"
              aria-label="실패 기록 닫기"
            >
              ✕
            </button>`:c`<button
              type="button"
              class="rtile__session"
              title="라이브 세션 열기"
              aria-label="라이브 세션 열기"
            >
              ▤ 세션
            </button>
            ${s?c`<button
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
            ${g}`}
    </div>
    <div class="rtile__title">${e.title}</div>
    ${e.current_child?c`<div class="rtile__child" title="현재 진행중 child">
          └ ${e.current_child}
        </div>`:""}
    ${a||i.length>0||l||d||p?c`<div class="rtile__meta">
          ${d?c`<span class="worker-mini__badge">${d}</span>`:""}
          ${p?c`<span
                class="worker-mini__badge"
                title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                >${p}</span
              >`:""}
          ${a?c`<span class="rtile__runner">${a}</span>`:""}
          ${i.length>0?i.map(A=>c`<span class="worker-usage" title=${A.tooltip}
                    >${A.label}</span
                  >`):l?c`<span
                  class="worker-usage"
                  title=${Or(e.usage)}
                  >${l}</span
                >`:""}
        </div>`:""}
    ${Fr(e)} ${tr(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일): 큐
         스냅샷에는 페이즈명도 진행률도 없으므로 진행 바는 만들지 않는다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${n||s?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function eo(e,t=Date.now(),r=null){let n=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>Xu(s,t,r))}
  </div>`}function dr(e){return c`<svg
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
  </svg>`}function to(){return dr(Vt`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function ro(){return dr(Vt`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function Ui(){return dr(Vt`<rect x="4.3" y="4.3" width="7.4" height="7.4" rx="1.2" />`)}function ji(){return dr(Vt`<path d="M4.4 4.4 11.6 11.6M11.6 4.4 4.4 11.6" />`)}function zi(){return dr(Vt`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function Hi(){return dr(Vt`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function Wi(){return dr(Vt`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function Gi(){return dr(Vt`<path d="M3 3.6 8.2 8 3 12.4z" />
    <path d="M8.8 3.6 14 8l-5.2 4.4z" />`)}var ln=1,Qu=6e4,Ju={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"},ep=new Set(["auto_merge","merged","merge","done"]),Yi={running:3,paused:2,failed:1};function tp(e,t){let r=null,n=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=n&&(n=o,r=s)}return r}function rp(e,t){let r=Object.values(e||{}),n=new Set,s=new Map;for(let a of r)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&n.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of r){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let i=null;if(a.status==="running")i="running";else if(a.status==="paused"&&!n.has(a.attempt_id))i="paused";else if(a.status==="failed"||a.status==="orphaned"){let f=t.get(a.bead_id),g=typeof f=="number"&&f>0&&typeof a.finished_at=="number"&&f>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!g&&typeof a.dismissed_at!="number"&&(i="failed")}if(!i)continue;let l=typeof a.started_at=="number"?a.started_at:null,d=o.get(a.bead_id);if(d){let f=Yi[d.run_state],g=Yi[i];if(f>g||f===g&&(d.started_at??0)>(l??0))continue}let p=typeof a.session_id=="string"&&a.session_id.length>0;o.set(a.bead_id,{attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",run_state:i,started_at:l,last_event_at:typeof a.last_event_at=="number"?a.last_event_at:null,model:typeof a.model=="string"?a.model:null,usage:Ot(e,a.bead_id),can_pause:i==="running"&&p,can_resume:i!=="running"&&p&&!n.has(a.attempt_id)})}return o}function Vi(e,t){let r=e[t];if(!r)return"";if(r.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let n=typeof r.reason=="string"?r.reason:"",s=n.indexOf(":");return s>0&&s<n.length-1?`\u26D4 ${n.slice(0,s)} (${n.slice(s+1)})`:`\u26D4 ${n}`}function xt(e){return e&&typeof e=="object"?e:{}}function no(e,t,r){let n=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=r&&typeof r.done_since=="number"?r.done_since:void 0,a=new Map;for(let w of s)w&&typeof w.root_dir=="string"&&a.set(w.root_dir,w);let i=[],l=[],d=[],p=[],f=[],g=new Map;for(let w of n){if(!w||typeof w.root_dir!="string")continue;let Y=w.root_dir,V=w.name||Y,q=a.get(Y),E=q&&typeof q.revision=="number"?q.revision:typeof w.revision=="number"?w.revision:0,S=xt(w.attempts),L=xt(w.bead_titles),C=xt(w.pr_observations),le=xt(w.admission),$e=xt(w.revise_parked),de=xt(w.merge_queue_state),me=xt(w.cleanup_failed),Le=xt(w.deployment_reconcile||w.reconcile),Ge=xt(w.discard_operations),Ye=Array.isArray(w.merge_queue)?w.merge_queue:[],Me=new Set(Ye.filter(H=>H&&typeof H.bead_id=="string").map(H=>H.bead_id)),Be=Array.isArray(w.queue)?w.queue:[],ge=Array.isArray(w.done)?w.done:[],ye=new Map;for(let H of ge)H&&typeof H.bead_id=="string"&&typeof H.added_at=="number"&&ye.set(H.bead_id,H.added_at);let Re=H=>({id:H,title:L[H]||H,root_dir:Y,workspace_name:V,expected_revision:E,draggable:!1}),J=new Set;for(let[H,X]of rp(S,ye))J.add(H),l.push({...Re(H),lane:"running",attempt_id:X.attempt_id,run_state:X.run_state,can_pause:X.can_pause,can_resume:X.can_resume,started_at:X.started_at,last_event_at:X.last_event_at,model:X.model,usage:X.usage,discard:Ht(Ge,H,{attempt_id:X.attempt_id}),badges:X.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:X.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:X.run_state==="failed"});for(let H of Array.isArray(w.pr_wait)?w.pr_wait:[]){let X=H&&H.bead_id;if(typeof X!="string"||J.has(X))continue;J.add(X);let Oe=xt(C[X]),_e=xt(Oe.pr),ke=Oe.gate?xt(Oe.gate):null,B=Me.has(X),O=de.active===X,oe=H.external===!0,ve=me[X]||null,Ae=xt(Le[X]),Xe=!ve&&Ae.adapter==="managed"&&Ae.stage==="restarting",Ie=!!ke&&ke.base_badge==="\uCDA9\uB3CC",D=!!ve&&!!ke&&ke.tier==="merged",U=oe&&!!ke&&ke.tier==="merged",R=Ht(Ge,X,{external:oe,merge_active:O,merge_queued:B,merged:!!ve||ke?.tier==="merged"}),y=!!R.operation;d.push({...Re(X),lane:"pr_wait",pr_number:typeof _e.number=="number"?_e.number:null,pr_url:typeof _e.url=="string"?_e.url:void 0,external:oe,usage:Ot(S,X),badges:ve?["\uC815\uB9AC \uC2E4\uD328"]:Xe?["\uC815\uB9AC \uC911 \xB7 \uC7AC\uC2DC\uC791"]:[],alert:!!ve,reason:ve?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":Xe?"\uC815\uB9AC \uC911 \xB7 \uC7AC\uC2DC\uC791":"PR \uB300\uAE30",merge_action:!B,merge_enabled:!y&&(ke?.enabled===!0||Ie||D||U),merge_label:U||D?"\uC815\uB9AC":Ie&&!D?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:y?R.error?`\uD3D0\uAE30 \uC2E4\uD328: ${R.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${R.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:U?"\uBA38\uC9C0\uB428 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uB97C \uC218\uD589\uD569\uB2C8\uB2E4":D?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uC218\uD589\uD569\uB2C8\uB2E4":Ie?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":ke?.enabled===!0?`\uBA38\uC9C0 (${ke.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${ke?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:B,cancel_enabled:!O,discard:R,discard_action:R.action,discard_enabled:R.enabled,discard_title:R.title})}for(let H=0;H<Be.length;H++){let X=Be[H],Oe=X&&X.bead_id;if(typeof Oe!="string"||J.has(Oe))continue;J.add(Oe);let _e=$e[Oe],ke=Ht(Ge,Oe),B=ke.operation?ke:null,O={...Re(Oe),lane:"queue",draggable:!B,discard:B||void 0,reason:Vi(le,Oe),queue_position:H+1,queue_index:H,queue_length:Be.length,badges:_e?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!_e,revise_action:!!_e,revise_enabled:!!_e&&!B,revise_title:_e?_e.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${_e.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};p.push(O);let oe=g.get(Y);oe?oe.push(O):g.set(Y,[O])}for(let H of Array.isArray(w.runnable)?w.runnable:[]){let X=H&&H.bead_id;typeof X!="string"||J.has(X)||(J.add(X),i.push({...Re(X),title:H.title||L[X]||X,lane:"runnable",draggable:!0,reason:Vi(le,X),created_at:H.created_at??void 0,updated_at:H.updated_at??void 0,labels:Array.isArray(H.labels)?H.labels:[],spec_reviewer:typeof H.spec_reviewer=="string"?H.spec_reviewer:void 0,plan_state:H.plan_state==="approved"||H.plan_state==="authored"?H.plan_state:"none",workflow:H.route?{route:H.route,chips:{route:H.route}}:null,place_index:Be.length}))}for(let H of ge){let X=H&&H.bead_id;if(typeof X!="string"||J.has(X)||(J.add(X),o!==void 0&&typeof H.added_at=="number"&&H.added_at<o))continue;let Oe=tp(S,X);f.push({...Re(X),lane:"done",done:!0,usage:Ot(S,X),done_at:typeof H.added_at=="number"?H.added_at:void 0,done_kind:Oe&&typeof Oe.done_kind=="string"?Oe.done_kind:null})}}let A=new Map;s.forEach((w,Y)=>{w&&typeof w.root_dir=="string"&&A.set(w.root_dir,Y)});let x=r&&r.running_sort==="repo"?"repo":"started";l.sort((w,Y)=>{if(x==="repo"){let E=A.get(w.root_dir)??Number.MAX_SAFE_INTEGER,S=A.get(Y.root_dir)??Number.MAX_SAFE_INTEGER;if(E!==S)return E-S}let V=typeof w.started_at=="number"&&Number.isFinite(w.started_at)?w.started_at:null,q=typeof Y.started_at=="number"&&Number.isFinite(Y.started_at)?Y.started_at:null;return V!==null&&q!==null&&V!==q?V-q:V===null&&q!==null?1:V!==null&&q===null?-1:w.id.localeCompare(Y.id)}),f.sort((w,Y)=>(Y.done_at??0)-(w.done_at??0));let T=s.length>0?s:n.map(w=>({root_dir:w&&w.root_dir,name:w&&w.name,auto_advance:w&&w.auto_advance,auto_merge:w&&w.auto_merge,slots:w&&w.slots,revision:w&&w.revision,exec_defaults:w&&w.exec_defaults,default_exec_preset_id:w&&w.default_exec_preset_id,runner_catalog:w&&w.runner_catalog})),P=[];for(let w of T)!w||typeof w.root_dir!="string"||P.push({root_dir:w.root_dir,name:w.name||w.root_dir,auto_advance:w.auto_advance===!0,auto_merge:w.auto_merge===!0,slots:typeof w.slots=="number"&&w.slots>=ln?w.slots:ln,revision:typeof w.revision=="number"?w.revision:0,exec_defaults:xt(w.exec_defaults),default_exec_preset_id:typeof w.default_exec_preset_id=="string"?w.default_exec_preset_id:null,runner_catalog:xt(w.runner_catalog),items:g.get(w.root_dir)||[]});return{runnable:i,queue:p,queue_groups:P,running:l,pr_wait:d,done:f,automation:{total:P.length,both_on:P.filter(w=>w.auto_advance&&w.auto_merge).length}}}function np(e,t){if(typeof e!="number"||!Number.isFinite(e))return"";let n=t-e<Qu;return c`<span
    class="mon-beat${n?" mon-beat--live":""}"
    title=${`\uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${bt(e)}`}
    ><span class="mon-beat__dot" aria-hidden="true"></span>${n?"":c`<span class="mon-beat__age"
          >${Rt(e,t)}</span
        >`}</span
  >`}function cn(e){return c`<div class="mon-c__title">${e.title}</div>`}function dn(e){return c`<span class="mon-c__id" title="클릭하면 상세로 이동"
    >${e.id}</span
  >`}function Xn(e){return e.workspace_name?c`<span class="mon-c__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:""}function so(e){let t=gt(e.usage),r=qt(e.usage);return t.length>0?t.map(n=>c`<span class="mon-c__usage" title=${n.tooltip}
          >${n.label}</span
        >`):r?c`<span class="mon-c__usage" title=${Or(e.usage)}
        >${r}</span
      >`:""}function oo(e){return(Array.isArray(e.badges)?e.badges:[]).map(r=>c`<span class="mon-c__badge${e.alert?" mon-c__badge--alert":""}"
        >${r}</span
      >`)}function sp(e){return c`<span class="mon-c__ops">
    ${e.run_state==="running"?c`<button
          type="button"
          class="mon-op mon-op--pause"
          ?disabled=${e.can_pause===!1}
          aria-label="일시정지"
          title="일시정지 — 세션을 끊고 이어하기 가능 상태로 둡니다"
        >
          ${ro()}
        </button>`:c`<button
          type="button"
          class="mon-op mon-op--resume"
          ?disabled=${e.can_resume===!1}
          aria-label="이어하기"
          title="이어하기"
        >
          ${to()}
        </button>`}
    ${e.discard?.action?c`<button
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
    ${e.run_state==="failed"?c`<button
          type="button"
          class="mon-op mon-op--dismiss"
          aria-label="실패 기록 닫기"
          title="실패 기록 닫기"
        >
          ${ji()}
        </button>`:""}
  </span>`}function op(e,t){let r=typeof e.started_at=="number"?Js(t-e.started_at):"";return c`${cn(e)}
    <div class="mon-c__meta">
      ${oo(e)}${np(e.last_event_at,t)}${dn(e)}${Xn(e)}
      ${e.model?c`<span class="mon-c__model">${e.model}</span>`:""}
      ${r?c`<span class="mon-live__elapsed">${r}</span>`:""}
      ${so(e)}${sp(e)}${tr(e)}
    </div>`}function ap(e){let t=e.workflow,n=(t&&t.chips||{}).route||t&&t.route,s=typeof e.spec_reviewer=="string"?e.spec_reviewer:"",o=e.plan_state==="approved"?"plan \u2713":e.plan_state==="authored"?"plan \u270E":"plan \u2013",a=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),i=Rt(e.updated_at);return c`${cn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>${dn(e)}
      ${n?c`<span class="ctl-chip ctl-chip--route">${n}</span>`:""}
      ${s?c`<span
            class="ctl-chip mon-c__review${s==="skipped"?" mon-c__review--dim":""}"
            >spec:${s}</span
          >`:""}
      ${n==="full_plan"?c`<span
            class="ctl-chip mon-c__plan${e.plan_state==="none"?" mon-c__review--dim":""}"
            >${o}</span
          >`:""}
      ${En(e.labels,null).map(l=>c`<span class="ctl-chip ctl-chip--label">${l}</span>`)}
      ${Xn(e)}
      ${i?c`<span title=${`\uC218\uC815 ${bt(e.updated_at)}`}
            >수정 ${i}</span
          >`:""}
      ${e.reason?c`<span
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
    </div>`}function ip(e){let t=!!e.discard?.operation;return c`${cn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>
      <span class="mon-live__pos">#${e.queue_position}</span>${dn(e)}
      ${oo(e)}
      ${e.reason?c`<span class="mon-c__reason">${e.reason}</span>`:""}
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
        ${t?c`<button
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
    ${tr(e)}
    ${e.revise_action?c`<div class="mon-c__tail">
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
        </div>`:""}`}function lp(e){let t=!!(qt(e.usage)||e.merge_action||e.cancel_action||e.discard_action);return c`${cn(e)}
    <div class="mon-c__meta">
      ${dn(e)}${Xn(e)}
      ${e.pr_url&&e.pr_number?c`<a
            class="mon-c__pr"
            href=${e.pr_url}
            target="_blank"
            rel="noreferrer noopener"
            title="PR 열기"
            >#${e.pr_number} ↗</a
          >`:""}
      ${oo(e)}
      ${e.reason?c`<span class="mon-c__reason">${e.reason}</span>`:""}
    </div>
    ${t?c`<div class="mon-c__tail">
          ${so(e)}
          ${e.merge_action?c`<button
                type="button"
                class="worker-mini__merge"
                data-bead-id=${e.id}
                ?disabled=${e.merge_enabled===!1}
                title=${e.merge_title||""}
              >
                ${e.merge_label||"\uBA38\uC9C0"}
              </button>`:""}
          ${e.cancel_action?c`<button
                type="button"
                class="worker-mini__merge-cancel"
                data-bead-id=${e.id}
                ?disabled=${e.cancel_enabled===!1}
                title=${e.cancel_title||""}
              >
                취소
              </button>`:""}
          ${e.discard_action?c`<button
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
          ${tr(e)}
        </div>`:""}`}function cp(e,t){let r=e.done_kind||"",n=r?Ju[r]||r:"",s=Rt(e.done_at,t);return c`${cn(e)}
    <div class="mon-c__meta">
      ${dn(e)}${Xn(e)}
      ${n?c`<span
            class="mon-live__kind${ep.has(r)?" mon-live__kind--ok":" mon-live__kind--warn"}"
            >${n}</span
          >`:""}
      ${so(e)}
      ${s?c`<span title=${`\uC644\uB8CC ${bt(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
    </div>`}function Ki(e,t){return e.lane==="running"?op(e,t):e.lane==="runnable"?ap(e):e.lane==="queue"?ip(e):e.lane==="pr_wait"?lp(e):cp(e,t)}function Zi(e){let t=String(e.revision);return c`<header
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
        title=${e.auto_advance?"\uC790\uB3D9 \uC9C4\uD589 \uCF1C\uC9D0 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA48\uCDA5\uB2C8\uB2E4":"\uC790\uB3D9 \uC9C4\uD589 \uAEBC\uC9D0 \u2014 \uD074\uB9AD\uD558\uBA74 \uB300\uAE30 \uD050\uB97C \uB514\uC2A4\uD328\uCE58\uD569\uB2C8\uB2E4"}
      >
        ${e.auto_advance?ro():to()}
        <span class="mon-ctl__label">진행</span>
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
        ${zi()}
        <span class="mon-ctl__label">머지</span>
      </button>
      <label class="mon-ctl mon-ctl--slots" title="동시에 실행할 세션 수">
        ${Hi()}
        <span class="mon-ctl__label">슬롯</span>
        <input
          type="number"
          class="mon-slots__input"
          min=${ln}
          step="1"
          data-root-dir=${e.root_dir}
          data-revision=${t}
          aria-label=${`${e.name} \uB3D9\uC2DC \uC2E4\uD589 \uC2AC\uB86F`}
          .value=${String(e.slots)}
        />
      </label>
      <button
        type="button"
        class="mon-ctl mon-ctl--exec"
        data-root-dir=${e.root_dir}
        data-revision=${t}
        aria-haspopup="dialog"
        aria-label=${`${e.name} \uC2E4\uD589 \uAE30\uBCF8\uAC12`}
        title="실행 기본값"
      >
        ${Wi()}
        <span class="mon-ctl__label">설정</span>
      </button>
    </span>
  </header>`}function Xi(e){let{total:t,both_on:r}=e.automation,n=t>0&&r===t,s=e.running_sort==="repo"?"repo":"started",o=zt.find(i=>i.value===e.done_range)?.label||"",a=Array.isArray(e.token_total)?e.token_total:e.token_total?[{label:e.token_total,tooltip:e.token_tooltip}]:[];return c`<div class="mon-top">
    <button
      type="button"
      class="mon-auto-all${n?" is-active":""}"
      data-on=${n?"false":"true"}
      aria-pressed=${n?"true":"false"}
      ?disabled=${t===0}
      title=${n?"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4 (\uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4)":"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
    >
      ${n?Ui():Gi()}
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
        ${zt.map(i=>c`<option
              value=${i.value}
              ?selected=${e.done_range===i.value}
            >
              ${i.label}
            </option>`)}
      </select>
      ${a.map(i=>c`<span
            class="mon-kpi__chip mon-kpi__chip--tokens"
            title=${i.tooltip}
            >${o} 완료 · 누적 ${i.label}</span
          >`)}
    </div>
  </div>`}function Qi(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function Ji(e){let t=(Array.isArray(e)?e:[]).map(i=>i&&i.usage).filter(i=>i&&typeof i=="object"&&"providers"in i);if(t.length>0)return gt(Ln(t));let r={};for(let i of Zt)r[i]=0;let n=!1,s=0,o=0,a=0;for(let i of Array.isArray(e)?e:[]){let l=i&&i.usage;if(l&&typeof l=="object"){let d=!1;for(let p of Zt){let f=l[p];typeof f=="number"&&Number.isFinite(f)&&(r[p]+=f,n=!0,d=!0)}if(d){o+=1;let p=l.total_cost_usd;typeof p=="number"&&Number.isFinite(p)&&(s+=p,a+=1)}}}return o>0&&a===o&&(r.total_cost_usd=s),n?qt(r):null}var tl="bdui.monitor.done-range",rl="bdui.monitor.running_sort";function dp(){try{let e=window.localStorage.getItem(tl);return Kt(e)?e:Lt}catch{return Lt}}function up(e){try{window.localStorage.setItem(tl,e)}catch{}}function pp(){try{return window.localStorage.getItem(rl)==="repo"?"repo":"started"}catch{return"started"}}function fp(e){try{window.localStorage.setItem(rl,e)}catch{}}var nl="tab:monitor:pipeline",_p=1e3,mp=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}];function el(e,t){let r=(e.lane==="runnable"||e.lane==="queue")&&e.draggable!==!1;return c`<div
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
    ${Ki(e,t)}
  </div>`}function sl(e,t){let r=rt("views:monitor"),n=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.execPresetStore,i=t.getWorkspacePath,l=t.switchWorkspace,d=t.now||(()=>Date.now()),p=t.confirm||(D=>typeof globalThis.confirm!="function"||globalThis.confirm(D)),f=dp(),g=pp();function A(){let D=zt.find(U=>U.value===f);return D?D.label:""}let x=document.createElement("div");x.className="mon",e.appendChild(x);let T=no(null,null),P=null,w=new Map,Y=new Set;function V(D){return T.queue_groups.find(U=>U.root_dir===D)||null}let E=Kn(e,{queueStore:{get(){if(!P)return{revision:0,exec_defaults:{},default_exec_preset_id:null};let D=w.get(P);if(D)return D;let U=V(P),R=s&&s.get?s.get():null,y=(Array.isArray(R)?R:[]).find(z=>z&&z.root_dir===P);return{revision:U?U.revision:0,exec_defaults:U?U.exec_defaults:{},default_exec_preset_id:U?U.default_exec_preset_id:null,runner_catalog:U?U.runner_catalog:null,workspace_info:y?y.workspace_info:void 0}},set(D){P&&w.set(P,D);for(let U of Array.from(Y))U()},subscribe(D){return Y.add(D),()=>Y.delete(D)}},presetStore:a,transport:o?(D,U)=>o(D,D==="worker-queue-set-default-exec-preset"||D==="get-worker-system-prompt"?{...U||{},root_dir:P}:U):void 0,getWorkspacePath:()=>P||void 0}),S=null,L=null;async function C(D,U,R,y){if(!o||!R)return null;let z=await o(D,{...U,root_dir:R,expected_revision:y});if(z&&z.conflict){let F=z.queue&&typeof z.queue.revision=="number"?z.queue.revision:y;z=await o(D,{...U,root_dir:R,expected_revision:F})}return z&&z.queue&&R&&w.set(R,z.queue),z}async function le(D,U,R){let y=await C("worker-discard",D,U,R);if(y&&y.discarded===!0){te(Zn(y),"success",5e3);return}if(y&&y.reason){te(`\uD3D0\uAE30 \uC2E4\uD328: ${y.reason}`,"error");return}if(y&&y.accepted&&y.pending==="merged_revert"){te("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(y&&y.accepted){te(`\uD3D0\uAE30 \uC9C4\uD589: ${y.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}y&&!y.conflict&&te("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function $e(D,U,R){return!o||!R?null:await o(D,{...U,root_dir:R})}async function de(D){if(!o||!D&&!p("\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB055\uB2C8\uB2E4. \uAC01 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uD568\uAED8 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?"))return;let U=await o("monitor-auto-toggle",{on:D}),R=U&&Array.isArray(U.failed)?U.failed:[];R.length>0&&te(`\uC790\uB3D9\uD654 ${D?"\uCF1C\uAE30":"\uB044\uAE30"} \uC77C\uBD80 \uC2E4\uD328: ${R.map(y=>y.root_dir).join(", ")}`,"error",3200)}async function me(){let D=new Map;for(let U of T.pr_wait)D.has(U.root_dir)||D.set(U.root_dir,U.expected_revision);for(let[U,R]of D)await C("worker-merge-queue-add-all",{},U,R)}let Le=null,Ge=!1,Ye=null;function Me(){Ye!==null&&clearTimeout(Ye),Ye=setTimeout(()=>{Ye=null,Ge=!1},0)}function Be(D){let U=D.target;return typeof U?.closest=="function"?U.closest(".mon-group"):null}function ge(D){let U=Be(D);return!U||!Le?null:(U.getAttribute("data-root-dir")||"")===Le.root_dir?U:null}function ye(){for(let D of Array.from(x.querySelectorAll(".mon-group--drag-over")))D.classList.remove("mon-group--drag-over")}function Re(D){let U=D.target,R=typeof U?.closest=="function"?U.closest('.mon-card[draggable="true"]'):null;if(R){Le={bead_id:R.getAttribute("data-issue-id")||"",lane:R.getAttribute("data-lane")||"",root_dir:R.getAttribute("data-root-dir")||"",revision:Number(R.getAttribute("data-revision")||0)||0,queue_index:Number(R.getAttribute("data-queue-index")),queue_length:Number(R.getAttribute("data-queue-length")),place_index:Number(R.getAttribute("data-place-index"))},Ge=!0;try{D.dataTransfer?.setData("text/plain",Le.bead_id),D.dataTransfer&&(D.dataTransfer.effectAllowed="move")}catch{}}}function J(D){let U=ge(D);U&&(D.preventDefault(),D.dataTransfer&&(D.dataTransfer.dropEffect="move"),U.classList.add("mon-group--drag-over"))}function H(D){Be(D)?.classList.remove("mon-group--drag-over")}function X(){Le=null,ye(),Me()}function Oe(D){let U=ge(D),R=Le;if(Le=null,ye(),!U||!R||!R.bead_id)return;D.preventDefault();let y=D.target,z=typeof y?.closest=="function"?y.closest('.mon-card[data-lane="queue"]'):null,F=z&&U.contains(z)?Number(z.getAttribute("data-queue-index")):NaN;if(R.lane==="runnable"){let xe=Number.isFinite(F)?F:R.place_index;if(!Number.isFinite(xe))return;C("worker-queue-place",{bead_id:R.bead_id,index:xe},R.root_dir,R.revision);return}if(R.lane!=="queue"||z&&z.getAttribute("data-issue-id")===R.bead_id)return;let K=R.queue_index,ae=Number.isFinite(F)?K>F?F:F-1:R.queue_length-1;!Number.isFinite(ae)||ae<0||ae===K||C("worker-queue-reorder",{bead_id:R.bead_id,to_index:ae},R.root_dir,R.revision)}function _e(D){let U={runnable:T.runnable,queue:T.queue,running:T.running,pr_wait:T.pr_wait,done:T.done};return c`${Xi({automation:T.automation,counts:{running:T.running.length,queue:T.queue.length,pr_wait:T.pr_wait.length},running_sort:g,done_range:f,token_total:Ji(T.done),token_tooltip:Qi(A())})}
      <div class="worker-lanes mon-lanes">
        ${mp.map(R=>{let y=U[R.lane],z=R.lane==="queue"?T.queue_groups.length>0?c`${T.queue_groups.map(F=>c`<div
                        class="mon-group"
                        data-root-dir=${F.root_dir}
                      >
                        ${Zi(F)}
                        <div class="mon-group__list">
                          ${F.items.map(K=>el(K,D))}
                        </div>
                      </div>`)}`:void 0:y.length>0?c`${y.map(F=>el(F,D))}`:void 0;return Wt({id:`monitor-${R.lane}`,lane:R.pane,title:R.lane==="done"?`\uC644\uB8CC\xB7${A()}`:R.title,items:y,empty:R.empty,body:z,live:R.lane==="running"&&y.length>0,header_control:R.lane==="pr_wait"&&y.length>0?c`<button
                    type="button"
                    class="mon-lane-op mon-merge-all"
                    title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
                  >
                    일괄 머지
                  </button>`:""})})}
      </div>`}function ke(){let D=s&&s.get?s.get():null,U=s&&s.getWorkspacesState?s.getWorkspacesState():[],R=d();T=no(D,U,{done_since:Ar(f,R),running_sort:g}),qe(_e(R),x)}function B(D,U){let R=i?i():void 0;if(!U||!R||U===R||!l){n(D);return}l(U).then(()=>{n(D)}).catch(y=>{r("workspace switch for %s failed: %o",U,y)})}function O(D){return{root_dir:D.getAttribute("data-root-dir")||"",revision:Number(D.getAttribute("data-revision")||0)||0}}function oe(D,U){let{root_dir:R,revision:y}=O(D),z=D.getAttribute("data-issue-id")||"",F=U.dataset.attemptId||D.getAttribute("data-attempt-id")||"",K=U.classList;if(K.contains("worker-card__place")){C("worker-queue-place",{bead_id:z,index:Number(D.getAttribute("data-place-index")||0)||0},R,y);return}if(K.contains("mon-op--up")||K.contains("mon-op--down")){let ae=Number(D.getAttribute("data-queue-index")||0)||0,xe=K.contains("mon-op--up")?ae-1:ae+1;if(xe<0)return;C("worker-queue-reorder",{bead_id:z,to_index:xe},R,y);return}if(K.contains("mon-op--remove")){C("worker-queue-remove",{bead_id:z},R,y);return}if(K.contains("mon-op--pause")){$e("worker-attempt-pause",{attempt_id:F},R);return}if(K.contains("mon-op--discard")){if(!p(an(z,"unmerged")))return;le({bead_id:z,...F?{attempt_id:F}:{},...U.dataset.operationId?{operation_id:U.dataset.operationId}:{}},R,y);return}if(K.contains("mon-op--resume")){C("worker-attempt-resume",{attempt_id:F},R,y);return}if(K.contains("mon-op--dismiss")){C("worker-attempt-dismiss",{attempt_id:F},R,y);return}if(K.contains("worker-mini__merge")){C("worker-merge-queue-add",{bead_id:z},R,y);return}if(K.contains("worker-mini__merge-cancel")){C("worker-merge-queue-remove",{bead_id:z},R,y);return}if(K.contains("worker-mini__discard")){let ae=U.dataset.discardMode==="merged"?"merged":"unmerged";if(!p(an(z,ae)))return;le({bead_id:z,...F?{attempt_id:F}:{},...U.dataset.operationId?{operation_id:U.dataset.operationId}:{}},R,y);return}if(K.contains("worker-mini__revise-fix")){C("worker-revise-fix",{bead_id:z},R,y);return}K.contains("worker-mini__revise-approve")&&C("worker-revise-approve",{bead_id:z},R,y)}function ve(D){let U=Ge;Ge=!1;let R=D.target;if(!R||typeof R.closest!="function"||R.closest("dialog")||R.closest("a"))return;let y=R.closest(".mon-running-sort");if(y){D.preventDefault(),g=y.getAttribute("data-sort")==="repo"?"repo":"started",fp(g),ke();return}let z=R.closest(".mon-auto-all");if(z){D.preventDefault(),de(z.getAttribute("data-on")==="true");return}if(R.closest(".mon-merge-all")){D.preventDefault(),me();return}let K=R.closest(".mon-ctl--advance");if(K){D.preventDefault();let{root_dir:lt,revision:ze}=O(K);C("worker-queue-toggle",{on:K.getAttribute("data-on")==="true"},lt,ze);return}let ae=R.closest(".mon-ctl--merge-auto");if(ae){D.preventDefault();let{root_dir:lt,revision:ze}=O(ae);C("worker-merge-auto-toggle",{on:ae.getAttribute("data-on")==="true"},lt,ze);return}let xe=R.closest(".mon-ctl--exec");if(xe){D.preventDefault(),P=xe.getAttribute("data-root-dir")||null,w.delete(P||""),E.open();return}let De=R.closest(".mon-card");if(!De)return;let at=R.closest("button");if(at){D.preventDefault(),oe(De,at);return}let it=De.getAttribute("data-issue-id");it&&!U&&(D.preventDefault(),B(it,De.getAttribute("data-root-dir")||""))}function Ae(D){let U=D.target;if(!U||typeof U.closest!="function")return;let R=U.closest(".mon-done-range");if(R){f=Kt(R.value)?R.value:Lt,up(f),ke();return}let y=U.closest(".mon-slots__input");if(!y)return;let{root_dir:z,revision:F}=O(y),K=Number(y.value);if(!Number.isFinite(K))return;let ae=Math.max(ln,Math.floor(K));C("worker-queue-set-slots",{slots:ae},z,F)}e.addEventListener("click",ve),e.addEventListener("change",Ae),e.addEventListener("dragstart",Re),e.addEventListener("dragover",J),e.addEventListener("dragleave",H),e.addEventListener("drop",Oe),e.addEventListener("dragend",X),s&&typeof s.subscribe=="function"&&(S=s.subscribe(()=>{try{w.clear(),ke();for(let D of Array.from(Y))D()}catch{}}));function Xe(){L!==null&&(clearInterval(L),L=null)}function Ie(){Ye!==null&&(clearTimeout(Ye),Ye=null)}return{load(){r("load"),ke(),L===null&&(L=setInterval(()=>{try{ke()}catch{}},_p))},pause(){Xe()},clear(){Xe(),Ie(),S&&(S(),S=null),e.removeEventListener("click",ve),e.removeEventListener("change",Ae),e.removeEventListener("dragstart",Re),e.removeEventListener("dragover",J),e.removeEventListener("dragleave",H),e.removeEventListener("drop",Oe),e.removeEventListener("dragend",X),E.destroy(),Y.clear(),e.replaceChildren()}}}function ol(e,t,r){let n=rt("views:nav"),s=null;function o(l){return d=>{d.preventDefault(),n("click tab %s",l),r.gotoView(l)}}function a(){let l=t.getState(),d=l.view==="worker"||l.view==="monitor"?l.view:"board";return c`
      <div class="ctl-tabs" aria-label="Primary">
        <a
          href="#/board"
          class="ctl-tab ${d==="board"?"is-active":""}"
          @click=${o("board")}
          >Board</a
        >
        <a
          href="#/worker"
          class="ctl-tab ${d==="worker"?"is-active":""}"
          @click=${o("worker")}
          >Worker</a
        >
        <a
          href="#/monitor"
          class="ctl-tab ${d==="monitor"?"is-active":""}"
          @click=${o("monitor")}
          >Monitor</a
        >
      </div>
    `}function i(){qe(a(),e)}return i(),s=t.subscribe(()=>i()),{destroy(){s&&(s(),s=null),qe(c``,e)}}}var al=["bug","feature","task","epic","chore"];function il(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var ll=["Critical","High","Medium","Low","Backlog"];function cl(e,t){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,e.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),a=r.querySelector("#new-priority"),i=r.querySelector("#new-labels"),l=r.querySelector("#new-description"),d=r.querySelector("#new-issue-error"),p=r.querySelector("#btn-cancel"),f=r.querySelector("#btn-create"),g=r.querySelector(".new-issue__close");function A(){o.replaceChildren();let E=document.createElement("option");E.value="",E.textContent="\u2014 Select \u2014",o.appendChild(E);for(let S of al){let L=document.createElement("option");L.value=S,L.textContent=il(S),o.appendChild(L)}a.replaceChildren();for(let S=0;S<=4;S+=1){let L=document.createElement("option");L.value=String(S);let C=ll[S]||"Medium";L.textContent=`${S} \u2013 ${C}`,a.appendChild(L)}}A();function x(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function T(E){s.disabled=E,o.disabled=E,a.disabled=E,i.disabled=E,l.disabled=E,p.disabled=E,f.disabled=E,f.textContent=E?"Creating\u2026":"Create"}function P(){d.textContent=""}function w(E){d.textContent=E}function Y(){try{let E=window.localStorage.getItem("beads-ui.new.type");E?o.value=E:o.value="";let S=window.localStorage.getItem("beads-ui.new.priority");S&&/^\d$/.test(S)?a.value=S:a.value="2"}catch{o.value="",a.value="2"}}function V(){let E=o.value||"",S=a.value||"";E.length>0&&window.localStorage.setItem("beads-ui.new.type",E),S.length>0&&window.localStorage.setItem("beads-ui.new.priority",S)}async function q(){P();let E=String(s.value||"").trim();if(E.length===0){w("Title is required"),s.focus();return}let S=Number(a.value||"2");if(!(S>=0&&S<=4)){w("Priority must be 0..4"),a.focus();return}let L=String(o.value||""),C=String(l.value||""),le={title:E};L.length>0&&(le.type=L),String(S).length>0&&(le.priority=S),C.length>0&&(le.description=C),T(!0);try{await t("create-issue",le)}catch{T(!1),w("Failed to create issue");return}V(),T(!1),x()}return r.addEventListener("cancel",E=>{E.preventDefault(),x()}),g.addEventListener("click",()=>x()),p.addEventListener("click",()=>x()),r.addEventListener("keydown",E=>{E.key==="Enter"&&(E.ctrlKey||E.metaKey)&&(E.preventDefault(),q())}),n.addEventListener("submit",E=>{E.preventDefault(),q()}),{open(){n.reset(),P(),Y();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){x()}}}var gp=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function dl(e){return String(e).padStart(2,"0")}function hp(e,t){let r=Math.max(0,Math.ceil((e-t)/6e4)),n=Math.floor(r/1440),s=Math.floor(r%1440/60),o=r%60;return n>0?`${n}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function bp(e,t=Date.now()){let r=Date.parse(e);if(!Number.isFinite(r))return"";let n=new Date(r),s=new Date(t),o=`${dl(n.getHours())}:${dl(n.getMinutes())}`,i=n.getFullYear()===s.getFullYear()&&n.getMonth()===s.getMonth()&&n.getDate()===s.getDate()?o:`${gp[n.getMonth()]} ${n.getDate()} ${o}`;return`${hp(r,t)} \xB7 ${i}`}function vp(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}var ul=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage"}];function pl(e){let t=!1,r=null,n=new Map;function s(){qe(c``,e),e.hidden=!0}function o(){let l=ul.filter(p=>n.has(p.key));if(l.length===0){s();return}let d=Date.now();qe(c`<div class="usage-meter" aria-label="Usage">
        ${l.map(p=>{let f=n.get(p.key),g=typeof f.ageSeconds=="number"&&f.ageSeconds>600,A=g?`${Math.floor(f.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"";return c`<span
            class="usage-meter__group${g?" usage-meter__group--stale":""}"
            aria-label=${`${p.label} usage`}
          >
            <span class="usage-meter__provider">${p.label}</span>
            ${f.windows.map(x=>{let T=typeof x.pct=="number"&&Number.isFinite(x.pct)?x.pct:0,P=Math.min(100,Math.max(0,T)),Y=`resets ${bp(x.resetsAt,d)}${g?` \xB7 ${A}`:""}`;return c`<span
                class="usage-meter__window ${vp(P)}"
                style=${`--progress: ${P}%`}
                title=${Y}
              >
                <span class="usage-meter__label">${x.key}</span>
                <span class="usage-meter__track" aria-hidden="true">
                  <span class="usage-meter__fill"></span>
                </span>
                <span class="usage-meter__pct">${P}%</span>
              </span>`})}
          </span>`})}
      </div>`,e),e.hidden=!1}async function a(l){try{let d=await fetch(l.endpoint);if(!d.ok)return null;let p=await d.json();return!p||p.available!==!0||!Array.isArray(p.windows)?null:p}catch{return null}}async function i(){let l=await Promise.all(ul.map(async d=>({provider:d,payload:await a(d)})));if(!t){for(let d of l)d.payload?n.set(d.provider.key,d.payload):n.delete(d.provider.key);o()}}return s(),i(),r=setInterval(()=>{i()},6e4),{destroy(){t=!0,r!==null&&(clearInterval(r),r=null),s()}}}var yp="worker-ineligible";function ao(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function fl(e){return ao(e).includes(yp)}var io="worker-serial";function un(e){return ao(e).includes(io)}var kp="tab:worker:ready",wp="tab:worker:blocked",$p="tab:worker:in-progress",pn=1,xp=new Set(["done","failed","orphaned","stopped","discarded"]);function _l(e){return on(e).path.length>0}var hl="beads-ui.worker.candidate-filter",lo={show_blocked:!1,spec:"all"};function Sp(){try{let e=window.localStorage.getItem(hl);if(!e)return{...lo};let t=JSON.parse(e);if(!t||typeof t!="object")return{...lo};let r=t.spec;return{show_blocked:t.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...lo}}}function Ap(e){try{window.localStorage.setItem(hl,JSON.stringify(e))}catch{}}function Tp(e,t){let r=i=>t.show_blocked||!i.blocked,n=i=>t.spec==="all"||(t.spec==="with"?i.has_spec:!i.has_spec),s=[],o=0,a=0;for(let i of e){let l=r(i),d=n(i);l&&d?s.push(i):!l&&d?o+=1:l&&!d&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var Ep=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],bl="bdui.worker.candidate_sort",Cp=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],Qn="spec";function Rp(){try{let e=window.localStorage.getItem(bl);return e==="board"||e==="created"||e==="spec"?e:Qn}catch{return Qn}}function Ip(e){try{window.localStorage.setItem(bl,e)}catch{}}var vl="bdui.worker.done-range";function Lp(){try{let e=window.localStorage.getItem(vl);return Kt(e)?e:Lt}catch{return Lt}}function Op(e){try{window.localStorage.setItem(vl,e)}catch{}}var Dp="(max-width: 640px)",yl="beads-ui.worker.lane-collapsed",fn={queue:!0,done:!0};function Pp(){try{let e=window.localStorage.getItem(yl);if(!e)return{...fn};let t=JSON.parse(e);return!t||typeof t!="object"?{...fn}:{queue:typeof t.queue=="boolean"?t.queue:fn.queue,done:typeof t.done=="boolean"?t.done:fn.done}}catch{return{...fn}}}function Mp(e){try{window.localStorage.setItem(yl,JSON.stringify(e))}catch{}}function ml(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let r=typeof t.title=="string"?t.title:t.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function Np(e,t,r){let n=Array.isArray(e)?e.slice():[];return t==="created"?n.sort(br):(n.sort(wn(r)),t==="board"?n:[...n.filter(_l),...n.filter(s=>!_l(s))])}function Fp(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function qp(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Bp(e){let r=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(n=>typeof n=="string"?n:n&&n.id).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}var Up=["closed_unmerged","undecidable"],jp=[{from:"\uAD00\uCE21 \uB300\uAE30",activity:"checking",to:"\uD655\uC778\uC911"},{from:"\uB85C\uCEEC\uAC80\uC99D \uB300\uAE30",activity:"verifying",to:"\uB85C\uCEEC\uAC80\uC99D \uC2E4\uD589 \uC911"}];function zp(e,t){for(let r of jp)if(e===r.from&&t===r.activity)return{label:r.to,live:!0};return{label:e,live:!1}}var Hp=[{step:"merging",label:"\uBA38\uC9C0 \uC911",index:1},{step:"base_sync",label:"base \uB3D9\uAE30\uD654",index:2},{step:"reconcile_queued",label:"\uC815\uB9AC \uC900\uBE44",index:2},{step:"candidate_pinned",label:"\uBC30\uD3EC \uD6C4\uBCF4 \uACE0\uC815",index:3},{step:"post_merge_verify",label:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D",index:4},{step:"reconcile_verify",label:"\uC815\uB9AC \uC911 \xB7 \uAC80\uC99D",index:4},{step:"deploy",label:"\uBC30\uD3EC",index:5},{step:"reconcile_deploy",label:"\uC815\uB9AC \uC911 \xB7 \uBC30\uD3EC",index:5},{step:"reconcile_restart",label:"\uC815\uB9AC \uC911 \xB7 \uC7AC\uC2DC\uC791",index:6},{step:"reconcile_readback",label:"\uC815\uB9AC \uC911 \xB7 readback",index:6},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC",index:7},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC",index:8},{step:"parent_close",label:"\uBD80\uBAA8 close",index:9}];function Wp(e){if(typeof e!="string"||e.length===0)return null;let t=9,r=Hp.find(n=>n.step===e);return r?{label:r.label,index:r.index,total:t,percent:Math.round(r.index/t*100)}:{label:e,index:0,total:t,percent:0}}function Gp(e){if(!e||e.adapter!=="managed"&&e.stage!=="queued")return null;let t=e.stage==="queued"?"reconcile_queued":e.stage==="pinned"?"candidate_pinned":e.stage==="verifying"?"reconcile_verify":e.stage==="deploying"?"reconcile_deploy":e.stage==="restarting"?"reconcile_restart":e.stage==="readback"?"reconcile_readback":null;return t?{activity:null,merge_progress:{step:t,started_at:typeof e.updated_at=="number"?e.updated_at:0}}:null}function gl(e){switch(e){case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";default:return e}}function Yp(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function co(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function Vp(e){if(!e||typeof e!="object")return null;let t=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,n=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,s=n&&typeof n.pr_number=="number"?n.pr_number:null,o="";switch(e.phase){case"gating":o="root \uC7AC\uAC80\uC99D \uC911";break;case"repairing":o=e.subject_role==="root"?`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 \uC6D0 PR \uC218\uC815 \uC911`:`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 repair PR \uC900\uBE44 \uC911`;break;case"waiting_repair_pr":o=s?`repair PR #${s} \uB300\uAE30`:"repair PR \uB300\uAE30";break;case"merging":o=e.subject_role==="repair"?s?`repair PR #${s} \uBA38\uC9C0 \uC911`:"repair PR \uBA38\uC9C0 \uC911":"root \uBA38\uC9C0 \uC911";break;case"cleaning":o="\uC815\uB9AC \uBCF5\uAD6C \uC911";break;case"paused":o="\uC790\uB3D9\uBCF5\uAD6C \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":o=`\uC0AC\uB78C \uD655\uC778 \uD544\uC694 \xB7 ${e.terminal_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`;break;case"completed":return null;default:return null}let a=[`\uBCF5\uAD6C \uC138\uC158 ${t}/${r}`];return e.head_sha&&a.push(`head ${e.head_sha}`),e.base_sha&&a.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&a.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`),e.active_attempt_id&&a.push(`attempt ${e.active_attempt_id}`),n&&typeof n.bead_id=="string"&&a.push(`repair ${n.bead_id}`),e.evidence&&a.push(e.evidence),e.log_path&&a.push(e.log_path),{badge:o,title:a.join(`
`),alert:e.phase==="needs_human",lock_actions:e.phase!=="paused"&&e.phase!=="needs_human",repair_pr_url:n&&typeof n.pr_url=="string"?n.pr_url:"",repair_pr_number:s}}function Kp(e,t,r,n,s=null,o=null,a=null,i=!1,l=null,d=!0,p=null,f=null,g=null,A={},x=!1){let T=!!l&&l.position>0,P=!!l&&l.active===!0,w=l&&l.failure||null,Y=r[e]||null,V=Y&&Y.gate?Y.gate:null,q=Y&&Y.pr?Y.pr:null,E=Vp(g),S=Yp(l?l.resolution:null),L=[];i&&L.push("\uC138\uC158");let C=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":S?S.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":null,le=zp(i&&V&&V.tier==="closed_unmerged"?"\uB2EB\uD798":V&&V.gate_badge||"",C?null:o&&o.activity||null);C&&L.push(C),le.label&&L.push(le.label),V&&V.base_badge&&V.base_badge!==V.gate_badge&&L.push(V.base_badge),f&&L.push(f),n&&L.push("\uC815\uB9AC \uC2E4\uD328"),E&&L.push(E.badge),T&&!P&&L.push(`\uBA38\uC9C0 \uB300\uAE30 #${l.position}`),w&&L.push(`\uC77C\uAD04 \uBA38\uC9C0 \uC2E4\uD328: ${gl(w)}`),p&&L.push(`\uC790\uB3D9 \uC81C\uC678: ${gl(p)}`);let $e=!!V&&V.base_badge==="\uCDA9\uB3CC",de=!!V&&V.enabled===!0,me=Wp(o&&o.merge_progress?o.merge_progress.step:null),Le=!!n&&!!V&&V.tier==="merged",Ge=i&&!!V&&V.tier==="merged",Ye=i&&$e&&d===!1,Me=Ht(A,e,{external:i,merge_active:P||!!me,merge_queued:T,conflict_active:!!a,cleanup_active:!1,merged:!!n||V?.tier==="merged"}),Be=!!Me.operation;return{id:e,title:t,reason:n?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:x,external:i,pr_number:q&&typeof q.number=="number"?q.number:null,pr_url:q&&typeof q.url=="string"?q.url:"",completion_badge:E?E.badge:null,completion_title:E?E.title:"",completion_repair_pr_url:E?E.repair_pr_url:"",completion_repair_pr_number:E?E.repair_pr_number:null,badges:L,live_badge:a==="paused"?null:S?.live||a==="running"?C:le.live?le.label:null,usage:s,alert:!!V&&Up.includes(V.tier)||!!n||!!w||!!(E&&E.alert),merge_action:!T,cancel_action:T,cancel_enabled:!P&&!(E&&E.lock_actions),cancel_title:E&&E.lock_actions?"\uC790\uB3D9\uBCF5\uAD6C \uC911 \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694":P?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:Me,discard_action:Me.action,merge_step:me,discard_enabled:Me.enabled,discard_title:Me.title,merge_enabled:!me&&!a&&!Be&&!(E&&E.lock_actions)&&!Ye&&(de||$e||Le||Ge),merge_label:Le||Ge?"\uC815\uB9AC":$e&&!me&&!Le?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:Be?Me.error?`\uD3D0\uAE30 \uC2E4\uD328: ${Me.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${Me.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:me?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${me.label}`:Ge?"\uBA38\uC9C0\uB428 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uB97C \uC218\uD589\uD569\uB2C8\uB2E4":Ye?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":Le?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uC218\uD589\uD569\uB2C8\uB2E4":$e?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":de?`\uBA38\uC9C0 (${V.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:V&&V.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${V&&V.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function uo(e,t={}){let{transport:r,issueStores:n,queueStore:s,execPresetStore:o,sessionLogStore:a,uiOrderStore:i,gotoIssue:l,getWorkspacePath:d}=t,p=n?xn(n,i):null,f=An({transport:r,uiOrderStore:i}),g=null,A=[],x=Sp(),T=Rp(),P=Lp();function w(){let u=zt.find(k=>k.value===P);return u?u.label:"\uC624\uB298"}let Y=Pp(),V=!1,q=new Set,E=new Set,S=new Set,L="ordinary",C=!1,le=new Map,$e=[],de=document.createElement("div");de.className="worker-console";let me=document.createElement("div");me.className="worker-top";let Le=document.createElement("div");Le.className="worker-drawer-overlay",Le.hidden=!0;let Ge=document.createElement("div");Ge.className="worker-drawer-overlay__backdrop";let Ye=document.createElement("div");Ye.className="worker-drawer-host",Le.append(Ge,Ye);let Me=document.createElement("div");Me.className="worker-lanes-host",de.append(me,Le,Me),e.appendChild(de);let Be=null,ge=Gn(Ye,{transport:r,sessionLogStore:a,onClose:()=>{Be=null,Le.hidden=!0,Ne()}}),ye=Kn(de,{queueStore:s,presetStore:o,transport:r,getWorkspacePath:d});function Re(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,pr_wait_holds_slot:!1,slots:pn,queue:[],pr_wait:[],done:[]}}function J(){let u=Re();return typeof u.revision=="number"?u.revision:0}function H(u){u&&u.queue&&s&&s.set(u.queue)}function X(){let u=Re().queue;return Array.isArray(u)?u.length:0}async function Oe(u,k){if(!r)return;let j=await r("worker-queue-place",{bead_id:u,index:k,expected_revision:J()});H(j),j&&j.conflict&&await r("worker-queue-place",{bead_id:u,index:k,expected_revision:J()}).then(H)}async function _e(u,k){if(!r)return;let j=await r("worker-queue-reorder",{bead_id:u,to_index:k,expected_revision:J()});H(j),j&&j.conflict&&await r("worker-queue-reorder",{bead_id:u,to_index:k,expected_revision:J()}).then(H)}async function ke(u){if(!r)return;let k=await r("worker-queue-remove",{bead_id:u,expected_revision:J()});H(k),k&&k.conflict&&await r("worker-queue-remove",{bead_id:u,expected_revision:J()}).then(H)}async function B(){if(!r||C)return;let k=(Array.isArray(Re().queue)?Re().queue:[]).map(se=>se.bead_id).filter(se=>S.has(se));if(k.length===0)return;if(k.some(se=>{let Se=le.get(se);return Se!==!0&&Se!==!1})){te("\uC2E4\uD589 \uBC29\uC2DD \uD655\uC778 \uC911","warning");return}let j=L==="serial",pe=k.filter(se=>le.get(se)!==j);if(pe.length===0){S.clear(),Ne(),te("\uC774\uBBF8 \uAC19\uC740 \uC2E4\uD589 \uBC29\uC2DD\uC785\uB2C8\uB2E4","info");return}C=!0,Ne();let be=[],we=0;try{for(let se of pe){let Se=await Promise.resolve(r(j?"label-add":"label-remove",{id:se,label:io})).catch(()=>[]),fe=Array.isArray(Se)?Se[0]:Se,Je=fe&&typeof fe=="object"?fe.labels:null;fe&&typeof fe=="object"&&fe.id===se&&Array.isArray(Je)&&un(Je)===j?we+=1:be.push(se)}if(be.length===0){S.clear(),te(`${we}\uAC1C \uC2E4\uD589 \uBC29\uC2DD \uBCC0\uACBD`,"success");return}S.clear();for(let se of be)S.add(se);te(`${pe.length}\uAC1C \uC911 ${we}\uAC1C \uBCC0\uACBD \xB7 ${be.length}\uAC1C \uC2E4\uD328 (${be.join(", ")})`,"error")}finally{C=!1,Ne()}}async function O(u){if(!r||!u)return;let k=await r("worker-attempt-pause",{attempt_id:u});k&&k.paused===!1&&k.reason&&te(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${k.reason}`,"error",2400)}async function oe(u){if(!r||!u)return;let k=await r("worker-attempt-resume",{attempt_id:u,expected_revision:J()});H(k),k&&k.conflict&&(k=await r("worker-attempt-resume",{attempt_id:u,expected_revision:J()}),H(k)),k&&k.resumed===!1&&!k.conflict&&k.reason&&te(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${k.reason}`,"error",2400)}async function ve(u){if(!r||!u)return;let k=await r("worker-attempt-dismiss",{attempt_id:u,expected_revision:J()});H(k),k&&k.conflict&&(k=await r("worker-attempt-dismiss",{attempt_id:u,expected_revision:J()}),H(k)),k&&k.dismissed===!1&&!k.conflict&&k.reason&&te(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${k.reason}`,"error",2400)}async function Ae(u,k){if(!r)return null;let j=r,pe=await j(u,{...k,expected_revision:J()});return H(pe),pe&&pe.conflict&&(pe=await j(u,{...k,expected_revision:J()}),H(pe)),pe}async function Xe(u){if(!r||!u)return;q.add(u),Ne();let k;try{k=await Ae("worker-merge-queue-add",{bead_id:u})}finally{q.delete(u),Ne()}!k||k.conflict||k.applied||te("\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)","error",2400)}async function Ie(u){if(!r)return;let k=await Ae("worker-merge-auto-toggle",{on:u});!k||k.conflict||te(u?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",u?"success":"info",2400)}async function D(u){if(!r||!u)return;let k=await Ae("worker-merge-queue-remove",{bead_id:u});k&&!k.conflict&&!k.applied&&k.reason==="merge_active"&&te("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function U(){await Ae("worker-merge-queue-remove",{all:!0})}async function R(u,k=null,j="unmerged",pe=null){if(!r||!u)return;let be=an(u,j);if(!(typeof globalThis.confirm!="function"||globalThis.confirm(be)))return;let se=await r("worker-discard",{bead_id:u,...k?{attempt_id:k}:{},...pe?{operation_id:pe}:{},expected_revision:J()});if(H(se),se&&se.conflict&&(se=await r("worker-discard",{bead_id:u,...k?{attempt_id:k}:{},...pe?{operation_id:pe}:{},expected_revision:J()}),H(se)),se&&se.discarded===!0){te(Zn(se),"success",5e3);return}if(se&&se.reason){te(`\uD3D0\uAE30 \uC2E4\uD328: ${se.reason}`,"error",2800);return}if(se&&se.accepted&&se.pending==="merged_revert"){te("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(se&&se.accepted&&!se.discarded){te(`\uD3D0\uAE30 \uC9C4\uD589: ${se.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}se&&!se.conflict&&te("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function y(u,k){if(!r||!k||E.has(k))return;E.add(k),Ne();let j;try{j=await r(u,{bead_id:k,expected_revision:J()}),H(j),j&&j.conflict&&(j=await r(u,{bead_id:k,expected_revision:J()}),H(j))}finally{E.delete(k),Ne()}if(!(!j||j.conflict)){if(j.ok){te(u==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}te(`\uCC98\uBD84 \uAC70\uBD80: ${j.reason||""}`,"error",3e3)}}async function z(u){if(!r)return;let k=await r("worker-queue-toggle",{on:u,expected_revision:J()});H(k),k&&k.conflict&&await r("worker-queue-toggle",{on:u,expected_revision:J()}).then(H)}async function F(u){if(!r||!Number.isFinite(u))return;let k=Math.max(pn,Math.floor(u)),j=await r("worker-queue-set-slots",{slots:k,expected_revision:J()});H(j),j&&j.conflict&&await r("worker-queue-set-slots",{slots:k,expected_revision:J()}).then(H)}async function K(u){if(!r)return;let k=await r("worker-queue-set-pr-wait-hold",{on:u,expected_revision:J()});H(k),k&&k.conflict&&await r("worker-queue-set-pr-wait-hold",{on:u,expected_revision:J()}).then(H)}function ae(){let u=Re(),k=p?p.selectBoardColumn(kp,"ready"):[],j=p?p.selectBoardColumn(wp,"blocked"):[],pe=p?p.selectBoardColumn($p,"in_progress"):[],be=new Map;for(let h of pe){let N=qp(h);if(!N)continue;let ie=be.get(N);ie?ie.push(h):be.set(N,[h])}let we=h=>{let N=Sn(be.get(h)||[]);return N?N.title||N.id:null},se=u.bead_titles||{},Se=new Map;for(let[h,N]of Object.entries(se))typeof N=="string"&&N.length>0&&Se.set(h,N);for(let h of[...k,...j])Se.set(h.id,h.title||h.id);le.clear();let fe=u.bead_times&&typeof u.bead_times=="object"&&!Array.isArray(u.bead_times)?u.bead_times:{},Je=u.bead_labels&&typeof u.bead_labels=="object"&&!Array.isArray(u.bead_labels)?u.bead_labels:{};for(let[h,N]of Object.entries(Je))Array.isArray(N)&&le.set(h,un(N));for(let h of[...k,...j]){let N=h.labels;if(!Array.isArray(N))continue;if(!le.has(h.id)){le.set(h.id,un(N));continue}let ie=fe[h.id],Ke=nr(ie&&typeof ie=="object"?ie.updated_at:null),pr=nr(h.updated_at);pr!==null&&Ke!==null&&pr>Ke&&le.set(h.id,un(N))}let St=new Map;for(let[h,N]of Object.entries(fe))N&&typeof N=="object"&&St.set(h,N);for(let h of[...k,...j])St.set(h.id,{created_at:h.created_at,updated_at:h.updated_at});let mt=h=>St.get(h)||{},et=u.pr_wait||[],At=u.pr_observations||{},Mt=u.pr_activity||{},Et=u.deployment_reconcile||u.reconcile||{},Ct=u.cleanup_failed||{},Ce=Object.entries(Ct).map(([h,N])=>({bead_id:h,step:N&&N.step?N.step:"",reason:N&&N.reason?N.reason:"",detail:Et[h]?.adapter==="managed"&&(N?.detail==="checkout_dirty"||N?.detail==="checkout_not_on_base"||N?.detail==="head_not_base_sha")?null:N&&typeof N.detail=="string"?N.detail:null,output_tail:N&&typeof N.output_tail=="string"&&N.output_tail?N.output_tail:void 0,log_path:N&&typeof N.log_path=="string"&&N.log_path?N.log_path:void 0,retry_count:N&&typeof N.retry_count=="number"&&Number.isInteger(N.retry_count)&&N.retry_count>0?N.retry_count:0})),Q=u.queue||[],b=new Set(Q.map(h=>h.bead_id));for(let h of S)b.has(h)||S.delete(h);let G=new Set([...Q.map(h=>h.bead_id),...et.map(h=>h.bead_id),...u.done.map(h=>h.bead_id)]),_=new Set(j.map(h=>h.id)),v=i?i.get()?.order||{}:{},re=new Set,ne=[];for(let h of[...k,...j])G.has(h.id)||re.has(h.id)||Fp(h)||fl(h.labels)||(re.add(h.id),ne.push(h));A=Np(ne,T,v);let ee=u.admission||{},m=h=>{let N=ee[h];if(!N)return"";if(N.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let ie=typeof N.reason=="string"?N.reason:"",Ke=ie.indexOf(":");return Ke>0&&Ke<ie.length-1?`\u26D4 ${ie.slice(0,Ke)} (${ie.slice(Ke+1)})`:`\u26D4 ${ie}`},I=A.map(h=>{let N=on(h),ie=N.path.length>0,Ke=h.workflow?.route==="quick_fix"||h.metadata&&h.metadata.route==="quick_fix",pr=!Ke&&ie&&!N.conflict,$r=_.has(h.id),Gt=[];$r&&Gt.push(Bp(h)),Ke?Gt.push("quick_fix \xB7 \uC6CC\uCEE4 \uBE44\uB300\uC0C1"):N.conflict?Gt.push("spec_id_conflict"):ie||Gt.push("spec \uC5C6\uC74C");let bn=m(h.id);return bn&&Gt.push(bn),{id:h.id,title:h.title||h.id,reason:Gt.join(" \xB7 "),draggable:pr,lane:"candidate",created_at:h.created_at,updated_at:h.updated_at,workflow:h.workflow,is_quick_fix:Ke,status:h.status,blocked:$r,has_spec:ie}}),$=Tp(I,x),Z=$.visible,Ue=u.revise_parked||{},ot=u.discard_operations&&typeof u.discard_operations=="object"&&!Array.isArray(u.discard_operations)?u.discard_operations:{},ht=(h,N)=>h.map(ie=>{let Ke=N==="queue"?Ue[ie.bead_id]:null,pr=N==="queue"?Ht(ot,ie.bead_id):null,$r=pr?.operation?pr:null,Gt=N==="queue"?le.has(ie.bead_id)?le.get(ie.bead_id)||!1:null:!1,bn=Gt===!0&&(Object.values(u.attempts||{}).some(Yt=>Yt&&Yt.bead_id!==ie.bead_id&&!xp.has(Yt.status))||et.some(Yt=>Yt.bead_id!==ie.bead_id)||Object.values(ot).some(Yt=>Yt&&Yt.bead_id!==ie.bead_id&&Yt.phase!=="done")),Io=N==="done"?[]:[m(ie.bead_id)];return bn&&Io.unshift("\uB2E4\uB978 \uC791\uC5C5 \uC885\uB8CC \uB300\uAE30 \xB7 \uBA38\uC9C0\uAE4C\uC9C0 \uB2E8\uB3C5"),{id:ie.bead_id,title:Se.get(ie.bead_id)||ie.bead_id,reason:Io.filter(Boolean).join(" \xB7 "),draggable:N!=="done"&&!$r,done:N==="done",lane:N,selectable:N==="queue",selected:N==="queue"&&S.has(ie.bead_id),worker_serial:Gt,discard:$r,badges:Ke?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!Ke,revise_action:!!Ke,revise_enabled:!!Ke&&!$r&&!E.has(ie.bead_id),revise_title:Ke?Ke.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Ke.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:N==="done"?Ot(u.attempts||{},ie.bead_id):null,done_at:N==="done"&&typeof ie.added_at=="number"?ie.added_at:void 0,...mt(ie.bead_id)}}),Fe=new Map;for(let h of u.done)h&&typeof h.bead_id=="string"&&typeof h.added_at=="number"&&Fe.set(h.bead_id,h.added_at);let It=u.attempts?Object.values(u.attempts):[],qr=new Set;for(let h of It)h&&typeof h.resumed_from=="string"&&h.resumed_from.length>0&&qr.add(h.resumed_from);let Jn=new Map;for(let h of It)Jn.set(h.bead_id,h.attempt_id);let es=new Map;for(let h of It)es.set(h.attempt_id,h);function ts(h){let N=new Set,ie=h;for(;ie&&!N.has(ie.attempt_id);){if(ie.conflict_resolution===!0)return!0;N.add(ie.attempt_id),ie=typeof ie.resumed_from=="string"&&ie.resumed_from.length>0&&es.get(ie.resumed_from)||null}return!1}let _n=typeof u.declared_base=="string"?u.declared_base:null;function Ll(h){let N=null;for(let ie of It)!ie||ie.bead_id!==h||ts(ie)||(N===null||(typeof ie.started_at=="number"?ie.started_at:0)>=(typeof N.started_at=="number"?N.started_at:0))&&(N=ie);return N&&typeof N.target_base=="string"?N.target_base:null}let mo=[],go=[],Ol=h=>{let N=Jn.get(h.bead_id)!==h.attempt_id,ie=Fe.get(h.bead_id),Ke=typeof ie=="number"&&ie>0&&typeof h.finished_at=="number"&&ie>=h.finished_at;return!N&&!Ke&&typeof h.dismissed_at!="number"},ho=h=>{let N=typeof h.session_id=="string"&&h.session_id.length>0,ie=qr.has(h.attempt_id);return{eligible:N&&!ie,reason:N?ie?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},Nt=null;for(let h of It){let N=h.status==="paused"&&!qr.has(h.attempt_id);if(h.status==="running"||N)go.push({bead_id:h.bead_id,attempt_id:h.attempt_id,title:Se.get(h.bead_id)||h.bead_id,runner:h.runner||null,model:h.model||null,effort:h.effort||null,started_at:typeof h.started_at=="number"?h.started_at:null,resumed_from:h.resumed_from||null,paused:N,conflict_resolution:ts(h),base_exception:co(_n,h.target_base),can_pause:typeof h.session_id=="string"&&h.session_id.length>0,discard:Ht(ot,h.bead_id,{attempt_id:h.attempt_id}),usage:Ot(u.attempts||{},h.bead_id),current_child:we(h.bead_id),...mt(h.bead_id)});else if((h.status==="failed"||h.status==="orphaned")&&Ol(h)){let ie=ho(h);mo.push({bead_id:h.bead_id,attempt_id:h.attempt_id,title:Se.get(h.bead_id)||h.bead_id,runner:h.runner||null,model:h.model||null,effort:h.effort||null,started_at:typeof h.started_at=="number"?h.started_at:null,resumed_from:h.resumed_from||null,failed:!0,status:h.status,status_label:h.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:Ht(ot,h.bead_id,{attempt_id:h.attempt_id}),resume_eligible:ie.eligible,resume_reason:ie.reason,conflict_resolution:ts(h),base_exception:co(_n,h.target_base),usage:Ot(u.attempts||{},h.bead_id),current_child:we(h.bead_id),...mt(h.bead_id)}),Nt=h}}let mn=[...mo,...go],bo=null;if(Nt){let h=ho(Nt),N=Nt.cause_detail;bo={bead_id:Nt.bead_id,repo:Nt.repo||"",reason:Nt.cause||Nt.status,cause_detail:N&&typeof N.reason=="string"?{reason:N.reason,command:typeof N.command=="string"?N.command:null}:null,resume_attempt_id:Nt.attempt_id,resume_eligible:h.eligible,resume_reason:h.reason,discard:Ht(ot,Nt.bead_id,{attempt_id:Nt.attempt_id})}}let Dl=new Set(mn.map(h=>h.bead_id)),rs=Array.isArray(u.merge_queue)?u.merge_queue:[],vo=new Map,yo=new Map;rs.forEach((h,N)=>{h&&typeof h.bead_id=="string"&&(vo.set(h.bead_id,N+1),yo.set(h.bead_id,h.resolution))});let ko=u.merge_queue_state||{active:null,failures:{}},Pl=ko.failures||{},Ml=u.auto_merge_skips||{},wo=h=>{let N=Ml[h];if(!N)return null;let ie=At[h],Ke=ie&&ie.pr?ie.pr.head_sha:null;return Ke&&Ke===N.head_sha?N.reason||"":null},gn=new Map;for(let h of mn)h.failed!==!0&&h.conflict_resolution&&(h.paused?gn.has(h.bead_id)||gn.set(h.bead_id,"paused"):gn.set(h.bead_id,"running"));let $o=mn.filter(h=>!h.paused&&h.failed!==!0).length,xo=(u.workspace_info||{}).slots,Nl=typeof xo=="number"?xo:typeof u.slots=="number"?u.slots:pn,So=u.pr_wait_holds_slot===!0?pn:Nl,Fl=$o>So,Ao=Ar(P),ql=(Array.isArray(u.done)?u.done.slice():[]).filter(h=>Ao===void 0||typeof h.added_at!="number"||h.added_at>=Ao).sort((h,N)=>(N.added_at||0)-(h.added_at||0)),ns=ht(ql,"done"),hn={};for(let h of Zt)hn[h]=0;let To=!1,Eo=0,ss=0,Co=0;for(let h of ns){let N=h.usage;if(N&&typeof N=="object"){let ie=!1;for(let Ke of Zt)Number.isFinite(N[Ke])&&(hn[Ke]+=N[Ke],To=!0,ie=!0);ie&&(ss+=1,Number.isFinite(N.total_cost_usd)&&(Eo+=N.total_cost_usd,Co+=1))}}ss>0&&Co===ss&&(hn.total_cost_usd=Eo);let Ro=ns.map(h=>h.usage).filter(h=>h&&typeof h=="object"&&h.providers),Bl=Ro.length>0?gt(Ln(Ro)):To?qt(hn):null;return{queue:u,idToTitle:Se,candidates:Z,candidate_hidden:{blocked:$.hidden_blocked,spec:$.hidden_spec},running:mn,live_count:$o,slots:So,over_cap:Fl,failure:bo,waiting:ht(Q.filter(h=>!Dl.has(h.bead_id)),"queue"),pr_wait:et.map(h=>Kp(h.bead_id,Se.get(h.bead_id)||h.bead_id,At,Ct[h.bead_id]||null,Ot(u.attempts||{},h.bead_id),Gp(Et[h.bead_id])||Mt[h.bead_id]||(q.has(h.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),gn.get(h.bead_id)||null,h.external===!0,{position:vo.get(h.bead_id)||0,active:ko.active===h.bead_id,failure:Pl[h.bead_id]||null,resolution:yo.get(h.bead_id)},h.wt_present!==!1,u.auto_merge===!0?wo(h.bead_id):null,co(_n,Ll(h.bead_id)),u.completion_status&&typeof u.completion_status=="object"&&!Array.isArray(u.completion_status)&&u.completion_status[h.bead_id]||null,u.discard_operations&&typeof u.discard_operations=="object"&&!Array.isArray(u.discard_operations)?u.discard_operations:{},es.get(Jn.get(h.bead_id)||"")?.worker_serial===!0)).map(h=>({...h,...mt(h.id)})),merge_queue_length:rs.length,merge_queue_running:rs.length>0,auto_excluded:et.map(h=>h.bead_id).filter(h=>wo(h)!==null),verify_cmd_present:!!(u.workspace_info||{}).verify_cmd,declared_base:_n,done:ns,token_total:Bl,cleanup_failures:Ce}}function xe(u){let k=u.waiting.length>0?u.waiting[0].id:"\u2014",j=c`<button
      type="button"
      class="worker-play${u.queue.auto_advance?" is-active":""}"
    >
      ${u.queue.auto_advance?"\u23F8 \uC77C\uC2DC\uC815\uC9C0":"\u25B6 \uC790\uB3D9 \uC9C4\uD589"}
    </button>`,pe=vt(u),be=u.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",we=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${u.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${u.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${w()} 완료 <b>${u.done.length}</b></span
      >`,se=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${u.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${u.declared_base||"?"}</span
    >`,Se=c`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${pn}
          step="1"
          .value=${String(u.slots)}
          ?disabled=${u.queue.pr_wait_holds_slot===!0}
          title=${u.queue.pr_wait_holds_slot===!0?"\uBA38\uC9C0\uAE4C\uC9C0 \uC21C\uCC28 \uC2E4\uD589 \uC911 \u2014 \uD574\uC81C\uD558\uBA74 \uC800\uC7A5\uB41C \uB3D9\uC2DC \uC2E4\uD589 \uC218\uB85C \uB3CC\uC544\uAC11\uB2C8\uB2E4":"\uB3D9\uC2DC\uC5D0 \uC2E4\uD589\uD560 \uC138\uC158 \uC218 (\uCD5C\uC18C 1 = \uC21C\uCC28 \uC2E4\uD589)"}
      /></label>
      <label
        class="worker-tgl"
        title="각 이슈가 PR 머지·정리를 마칠 때까지 다음 이슈를 시작하지 않습니다"
      >
        <input
          type="checkbox"
          class="worker-pr-wait-hold"
          .checked=${u.queue.pr_wait_holds_slot===!0}
        />
        머지까지 순차 실행
      </label>
      <button
        type="button"
        class="worker-exec-defaults-btn"
        aria-haspopup="dialog"
        aria-label="전역 실행 설정"
        title="전역 실행 설정"
      >
        ⚙
      </button>`,fe=Bi({failure:u.failure,cleanupFailures:u.cleanup_failures});return V?c`<div class="worker-ribbon">
          ${j} ${pe}
          <div class="worker-kpi worker-kpi--ribbon">${be}${we}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${Se}</div>
          <div class="worker-kpi">${se}</div>
        </div>
        ${fe}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${j}${pe}${Se}</div>
        <div class="worker-kpi">
          ${be}${we}${se}
          ${(Array.isArray(u.token_total)?u.token_total:u.token_total?[{label:u.token_total,tooltip:`${w()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(Je=>c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${Je.tooltip}
                >${w()} 완료 · 누적 ${Je.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${k}</b></span
          >
        </div>
      </div>
      ${fe}`}function De(u){if(u.running.length===0&&u.pr_wait.length===0)return"";let k=u.running.some(j=>!j.paused&&j.failed!==!0);return c`<section
      class="worker-now${k?" worker-pane--live":""}"
      id="worker-now"
    >
      <header class="worker-now__hd">
        <span
          class="worker-pane__dot worker-pane__dot--running"
          aria-hidden="true"
        ></span>
        <span class="worker-now__title">지금</span>
        <span class="worker-now__count"
          >${u.running.length+u.pr_wait.length}</span
        >
      </header>
      ${u.running.length>0?eo(u.running,Date.now(),Be):""}
      ${u.pr_wait.map(j=>Qs(j))}
    </section>`}function at(u){let k=u.candidate_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${x.show_blocked}
        />
        🔒 blocked${k.blocked>0?` ${k.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Ep.map(j=>c`<button
              type="button"
              class="worker-filter__chip${x.spec===j.value?" is-active":""}"
              data-spec=${j.value}
              aria-pressed=${x.spec===j.value?"true":"false"}
            >
              ${j.label}
            </button>`)}
        ${k.spec>0?c`<span class="worker-filter__hidden">숨김 ${k.spec}</span>`:""}
      </div>
    </div>`}function it(){return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${T}
    >
      ${Cp.map(u=>c`<option value=${u.value} ?selected=${T===u.value}>
            ${u.label}
          </option>`)}
    </select>`}function lt(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${P}
      >
        ${zt.map(u=>c`<option value=${u.value} ?selected=${P===u.value}>
              ${u.label}
            </option>`)}
      </select>
    </div>`}function ze(){if(S.size===0)return"";let u=Array.from(S),k=u.some(j=>{let pe=le.get(j);return pe!==!0&&pe!==!1});return c`<div
      class="worker-bulk"
      role="group"
      aria-label="실행 방식 일괄 변경"
    >
      <span class="worker-bulk__count">${u.length}개 선택</span>
      <select
        class="worker-bulk__mode"
        aria-label="실행 방식"
        .value=${L}
        ?disabled=${C}
      >
        <option value="ordinary">일반 병렬</option>
        <option value="serial">🔒 머지까지 단독</option>
      </select>
      <button
        type="button"
        class="worker-bulk__apply"
        ?disabled=${k||C}
        title=${k?"\uC120\uD0DD\uD55C \uC791\uC5C5\uC758 \uC2E4\uD589 \uBC29\uC2DD\uC744 \uD655\uC778\uD558\uB294 \uC911\uC785\uB2C8\uB2E4":C?"\uC2E4\uD589 \uBC29\uC2DD \uBCC0\uACBD \uC911\uC785\uB2C8\uB2E4":"\uC120\uD0DD\uD55C \uC791\uC5C5\uC5D0 \uC801\uC6A9"}
      >
        적용
      </button>
      <span class="worker-bulk__hint">선택한 대기 작업에만 적용됩니다</span>
    </div>`}function Pt(u){let k=(u.queue.pr_wait||[]).filter(we=>we&&we.external!==!0&&typeof we.bead_id=="string"),j=new Set(u.running.filter(we=>!we.paused&&we.failed!==!0).map(we=>we.bead_id));for(let we of k)j.add(we.bead_id);let pe=!(u.queue.pr_wait_holds_slot!==!0||u.queue.auto_advance!==!0||u.queue.auto_merge===!0||k.length===0||u.waiting.length===0||j.size<u.slots),be=u.pr_wait.some(we=>we.worker_serial===!0);if(!(!pe&&!(be&&u.queue.auto_merge!==!0)))return c`${pe?c`<div class="worker-stat worker-pr-wait-hint">
          PR 머지 대기 중 — 다음 이슈는 머지·정리 완료 후 시작됩니다 (자동 머지
          꺼짐)
        </div>`:""}${be&&u.queue.auto_merge!==!0?c`<div
          class="worker-stat worker-pr-wait-hint worker-pr-wait-hint--serial"
        >
          단독 실행 작업의 PR 머지·정리가 끝날 때까지 다음 작업이 시작되지
          않습니다 (자동 머지 꺼짐)
        </div>`:""}`}function vt(u){let k=u.queue.auto_merge===!0;if(u.merge_queue_running)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${k?" is-active":""}"
        title=${k?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${k?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${u.merge_queue_length}
      </button>`;if(k)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let j=new Set(u.auto_excluded),pe=u.pr_wait.filter(be=>be.merge_action&&be.merge_enabled&&!j.has(be.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title=${u.verify_cmd_present?"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4 \u2014 \uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uB294 \uAC80\uC99D \uC2E0\uD638\uAC00 \uC5C6\uC5B4 CI\xB7\uB85C\uCEEC\uAC80\uC99D \uC5C6\uC774 \uBA38\uC9C0\uB429\uB2C8\uB2E4"}
    >
      ▶ 자동 머지${pe>0?` ${pe}`:""}
    </button>`}function _t(u){let k=Wt({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:u.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:it(),controls:at(u)});return V?c`<div class="worker-lanes worker-lanes--mobile">
        ${De(u)}
        ${Wt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:u.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",controls:c`${ze()}${Pt(u)}`,collapsible:!0,collapsed:Y.queue,preview:ml(u.waiting)})}
        ${k}
        ${Wt({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:u.done,empty:`${w()} \uC644\uB8CC \uC5C6\uC74C`,controls:lt(),collapsible:!0,collapsed:Y.done,preview:Array.isArray(u.token_total)?u.token_total.map(j=>j.label).join(" \xB7 "):u.token_total||ml(u.done)})}
      </div>`:c`<div class="worker-lanes">
      ${k}
      ${Wt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:u.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58",controls:c`${ze()}${Pt(u)}`})}
      ${Wt({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${u.slots}`,items:u.running,live:u.running.some(j=>!j.paused&&j.failed!==!0),body:eo(u.running,Date.now(),Be)})}
      ${Wt({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:u.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${Wt({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${w()} ${u.done.length}`,items:u.done,empty:`${w()} \uC644\uB8CC \uC5C6\uC74C`,controls:lt()})}
    </div>`}function dt(u){Y={...Y,[u]:!Y[u]},Mp(Y),Ne()}function Ne(){let u=ae();qe(xe(u),me),qe(_t(u),Me)}function tt(){let u=document.querySelector(".app-header");if(!u)return;let k=()=>{let j=Math.round(u.getBoundingClientRect().height);de.style.setProperty("--worker-ribbon-top",`${j}px`)};if(k(),typeof ResizeObserver=="function"){let j=new ResizeObserver(k);j.observe(u),$e.push(()=>j.disconnect())}else window.addEventListener("resize",k),$e.push(()=>window.removeEventListener("resize",k))}function ut(){if(typeof window.matchMedia!="function")return;let u=window.matchMedia(Dp);V=!!u.matches;let k=j=>{let pe=!!(j&&typeof j.matches=="boolean"?j.matches:u.matches);pe!==V&&(V=pe,Ne())};typeof u.addEventListener=="function"?(u.addEventListener("change",k),$e.push(()=>u.removeEventListener("change",k))):typeof u.addListener=="function"&&(u.addListener(k),$e.push(()=>u.removeListener(k)))}function nt(u){let k=u.target,j=k?.closest?.(".worker-mini__grip"),pe=j?j.closest('.worker-mini[data-lane="queue"]'):k?.closest?.('.worker-card[draggable="true"]');if(!pe)return;let be=pe.dataset.beadId||"",we=pe.dataset.lane||"";g={bead_id:be,from_lane:we};try{u.dataTransfer?.setData("text/plain",be),u.dataTransfer&&(u.dataTransfer.effectAllowed="move")}catch{}}function st(u){let k=u.target?.closest?.(".worker-pane");if(!k)return;let j=k.dataset.lane||"";j!=="candidate"&&j!=="queue"||(u.preventDefault(),u.dataTransfer&&(u.dataTransfer.dropEffect="move"),k.classList.add("worker-pane--drag-over"))}function pt(u){u.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function M(u,k){let j=A.find(se=>se.id===u);if(!j)return;let pe=A.filter(se=>se.id!==u),be=pe.length;if(k){let se=k.dataset.beadId;if(se===u)return;let Se=pe.findIndex(fe=>fe.id===se);Se>=0&&(be=Se)}let we=pe.slice();we.splice(be,0,j),f.applyReorder(u,we,be)}function W(u){let k=u.target?.closest?.(".worker-pane");if(!k)return;u.preventDefault(),k.classList.remove("worker-pane--drag-over");let j=k.dataset.lane||"",pe=g?.bead_id||u.dataTransfer?.getData("text/plain")||"",be=g?.from_lane||"";if(g=null,!pe)return;let we=u.target?.closest?.(".worker-mini, .worker-card"),se=Array.from(k.querySelectorAll(".worker-mini, .worker-card")),Se=se.length;if(we){let fe=se.indexOf(we);fe>=0&&(Se=fe)}if(k.classList.contains("worker-pane--collapsed")&&(Se=X()),j==="candidate"){if(be==="candidate"){M(pe,we);return}be==="queue"&&ke(pe);return}j==="queue"&&(be==="queue"?_e(pe,Se):Oe(pe,Se))}function ce(u){x=u,Ap(u),Ne()}function ue(u){T=u==="board"||u==="created"||u==="spec"?u:Qn,Ip(T),Ne()}function he(u){P=Kt(u)?u:Lt,Op(P),Ne()}function Te(u){let k=u.target?.closest?.(".worker-mini__select");if(k){let Je=k.dataset.beadId||"";Je&&(k.checked?S.add(Je):S.delete(Je),Ne());return}let j=u.target?.closest?.(".worker-bulk__mode");if(j){L=j.value==="serial"?"serial":"ordinary";return}let pe=u.target?.closest?.(".worker-filter__blocked");if(pe){ce({...x,show_blocked:pe.checked});return}let be=u.target?.closest?.(".worker-done-range");if(be){he(be.value);return}let we=u.target?.closest?.(".worker-sort");if(we){ue(we.value||Qn);return}let se=u.target?.closest?.(".worker-pr-wait-hold");if(se){K(se.checked);return}let Se=u.target?.closest?.(".worker-slots__input");if(!Se)return;let fe=Number.parseInt(Se.value,10);if(!Number.isFinite(fe)){Ne();return}F(fe).then(Ne)}function He(u){return u?{runner:u.runner||void 0,model:u.model||void 0,effort:u.effort||void 0,worktree:u.worktree||void 0,status:u.status||void 0,session_id:u.session_id||void 0}:{}}function Qe(u){let k=Re(),j=k.attempts?k.attempts[u]:null;Be=u,Le.hidden=!1,ge.open({attempt_id:u,meta:He(j)}),Ne()}function Ee(){if(!Be)return;let u=Re(),k=u.attempts?u.attempts[Be]:null;if(k){ge.updateMeta(He(k));return}ge.close()}function Ve(u){let k=u.target,j=k?.closest?.(".worker-bulk__apply");if(j){j.disabled||B();return}if(k?.closest?.(".worker-mini__select, .worker-mini__serial, .worker-mini__grip")||k?.closest?.("#worker-exec-defaults-dialog"))return;if(k?.closest?.(".worker-exec-defaults-btn")){ye.open();return}let pe=k?.closest?.(".worker-banner__resume");if(pe){let Ce=pe.dataset.attemptId;Ce&&oe(Ce);return}let be=k?.closest?.(".worker-banner__discard");if(be){let Ce=be.dataset.confirmation==="merged"?"merged":"unmerged";R(be.dataset.beadId||"",be.dataset.attemptId||null,Ce,be.dataset.operationId||null);return}let we=k?.closest?.(".worker-banner__dismiss");if(we){let Ce=we.dataset.attemptId;Ce&&ve(Ce);return}if(k?.closest?.(".worker-play")){z(!Re().auto_advance);return}let se=k?.closest?.(".worker-merge-all");if(se){se.classList.contains("worker-merge-all--stop")?Re().auto_merge===!0?Ie(!1):U():Ie(!0);return}let Se=k?.closest?.(".worker-pane__hd--toggle");if(Se){let Ce=Se.dataset.lane;(Ce==="queue"||Ce==="done")&&dt(Ce);return}let fe=k?.closest?.(".worker-card__place");if(fe){let Ce=fe.dataset.beadId;Ce&&!fe.disabled&&Oe(Ce,X());return}let Je=k?.closest?.(".worker-filter__chip");if(Je){let Ce=Je.dataset.spec;(Ce==="all"||Ce==="with"||Ce==="without")&&ce({...x,spec:Ce});return}let St=k?.closest?.(".worker-mini__merge");if(St){Xe(St.dataset.beadId||"");return}let mt=k?.closest?.(".worker-mini__merge-cancel");if(mt){D(mt.dataset.beadId||"");return}let et=k?.closest?.(".worker-mini__discard");if(et){R(et.dataset.beadId||"",et.dataset.attemptId||null,et.dataset.discardMode==="merged"?"merged":"unmerged",et.dataset.operationId||null);return}let At=k?.closest?.(".worker-mini__revise-fix");if(At){y("worker-revise-fix",At.dataset.beadId||"");return}let Mt=k?.closest?.(".worker-mini__revise-approve");if(Mt){y("worker-revise-approve",Mt.dataset.beadId||"");return}if(k?.closest?.(".worker-mini__pr"))return;if(k?.closest?.(".rtile__discard")){let Ce=k?.closest?.(".rtile"),Q=Ce?.dataset?.beadId,b=Ce?.dataset?.attemptId;Q&&R(Q,b||null,"unmerged",k?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(k?.closest?.(".rtile__dismiss")){let Q=k?.closest?.(".rtile")?.dataset?.attemptId;Q&&ve(Q);return}if(k?.closest?.(".rtile__pause")){let Q=k?.closest?.(".rtile")?.dataset?.attemptId;Q&&O(Q);return}if(k?.closest?.(".rtile__resume")){let Q=k?.closest?.(".rtile")?.dataset?.attemptId;Q&&oe(Q);return}if(k?.closest?.(".rtile__session")){let Q=k?.closest?.(".rtile")?.dataset?.attemptId;Q&&Qe(Q);return}if(k?.closest?.(".worker-drawer-overlay__backdrop")){ge.close();return}if(k?.closest?.(".worker-drawer-host"))return;let Et=k?.closest?.(".rtile");if(Et){if(k?.closest?.(".rtile__id")){let Q=Et.dataset.beadId;Q&&vr(Q).then(b=>{b?te("\uBCF5\uC0AC\uB428","success",1200):te("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Ce=Et.dataset.beadId;Ce&&l&&l(Ce);return}let Ct=k?.closest?.(".worker-mini, .worker-card");if(Ct){let Ce=Ct.dataset.beadId;if(k?.closest?.(".worker-mini__id, .worker-card__id")){Ce&&vr(Ce).then(Q=>{Q?te("\uBCF5\uC0AC\uB428","success",1200):te("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}Ce&&l&&l(Ce)}}return e.addEventListener("dragstart",nt),e.addEventListener("dragover",st),e.addEventListener("dragleave",pt),e.addEventListener("drop",W),e.addEventListener("click",Ve),e.addEventListener("change",Te),ut(),tt(),p&&$e.push(p.subscribe(Ne)),s&&$e.push(s.subscribe(()=>{Ne(),Ee()})),Ne(),{load(){Ne()},openExecDefaults(){ye.open()},destroy(){for(let u of $e.splice(0))try{u()}catch{}e.removeEventListener("dragstart",nt),e.removeEventListener("dragover",st),e.removeEventListener("dragleave",pt),e.removeEventListener("drop",W),e.removeEventListener("click",Ve),e.removeEventListener("change",Te);try{ge.destroy()}catch{}Le.hidden=!0;try{ye.destroy()}catch{}qe(c``,e)}}}function po(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function kl(e,t,r,n=async()=>{},s=async()=>{}){let o=rt("views:workspace-picker"),a=null,i=!1,l=!1,d=!1;async function p(S){let C=S.target.value,$e=t.getState().workspace?.current?.path||"";if(C&&C!==$e){o("switching workspace to %s",C),i=!0,E();try{await r(C)}catch(de){o("workspace switch failed: %o",de)}finally{i=!1,E()}}}async function f(){let S=t.getState(),L=S.workspace?.current?.path||S.workspace?.available?.[0]?.path||"";if(!(!L||l)){o("git-pulling workspace %s",L),l=!0,E();try{await n(L)}catch(C){o("workspace git pull failed: %o",C)}finally{l=!1,E()}}}function g(S){let L=S.target;L&&e.contains(L)||T()}function A(S){S.key==="Escape"&&T()}function x(){d||(d=!0,document.addEventListener("mousedown",g),document.addEventListener("keydown",A),E())}function T(){d&&(d=!1,document.removeEventListener("mousedown",g),document.removeEventListener("keydown",A),E())}function P(){d?T():x()}async function w(S){let L=S.target,C=L.value,le=L.checked;o("toggling visibility %s \u2192 %s",C,String(le));try{await s(C,le)}catch($e){o("workspace visibility toggle failed: %o",$e)}}function Y(S){return S?c`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${f}
        ?disabled=${i||l}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:c``}function V(S,L){return c`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${P}
          aria-haspopup="true"
          aria-expanded=${d?"true":"false"}
          aria-label="프로젝트 관리"
        >
          프로젝트 관리
        </button>
        ${d?c`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${S.map(C=>c`
                    <label
                      class="workspace-picker__manage-row"
                      title="${C.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${C.path}"
                        .checked=${!L.has(C.path)}
                        @change=${w}
                      />
                      <span class="workspace-picker__manage-name"
                        >${po(C.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function q(){let S=t.getState(),L=S.workspace?.current,C=S.workspace?.available||[],le=new Set(S.workspace?.hidden||[]),$e=L?.path||C[0]?.path||"";if(C.length===0)return c``;let de=C.filter(me=>!le.has(me.path)||me.path===$e);if(de.length<=1){let me=de[0]||C[0],Le=po(me.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${me.path}"
            >${Le}</span
          >
          ${V(C,le)}
          ${Y($e)}
          ${l?c`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return c`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${p}
          ?disabled=${i||l}
          aria-label="Select project workspace"
        >
          ${de.map(me=>c`
              <option
                value="${me.path}"
                ?selected=${me.path===$e}
                title="${me.path}"
              >
                ${po(me.path)}
              </option>
            `)}
        </select>
        ${V(C,le)}
        ${Y($e)}
        ${i||l?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function E(){qe(q(),e)}return E(),a=t.subscribe(()=>E()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",g),document.removeEventListener("keydown",A),qe(c``,e)}}}var wl=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-queue-set-slots","worker-queue-set-pr-wait-hold","worker-queue-set-default-exec-preset","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-exec-presets","unsubscribe-exec-presets","exec-presets-snapshot","exec-preset-create","exec-preset-update","exec-preset-delete","apply-exec-preset","monitor-auto-toggle"];function fo(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function $l(e,t,r=fo()){return{id:r,type:e,payload:t}}function xl(e={}){let t=rt("ws"),r={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},n=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,i=null,l=!0,d=new Map,p=[],f=new Map,g=new Set;function A(q){for(let E of Array.from(g))try{E(q)}catch{}}function x(){if(!l||i)return;o="reconnecting",t("ws reconnecting\u2026"),A(o);let q=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,a)),E=(r.jitterRatio||0)*q,S=Math.max(0,Math.round(q+(Math.random()*2-1)*E));t("ws retry in %d ms (attempt %d)",S,a+1),i=setTimeout(()=>{i=null,V()},S)}function T(q){try{s?.send(JSON.stringify(q))}catch(E){t("ws send failed",E)}}function P(){for(o="open",t("ws open"),A(o),a=0;p.length;){let q=p.shift();q&&T(q)}}function w(q){let E;try{E=JSON.parse(String(q.data))}catch{t("ws received non-JSON message");return}if(!E||typeof E.id!="string"||typeof E.type!="string"){t("ws received invalid envelope");return}if(d.has(E.id)){let L=d.get(E.id);d.delete(E.id),E.ok?L?.resolve(E.payload):L?.reject(E.error||new Error("ws error"));return}let S=f.get(E.type);if(S&&S.size>0)for(let L of Array.from(S))try{L(E.payload)}catch(C){t("ws event handler error",C)}else t("ws received unhandled message type: %s",E.type)}function Y(){o="closed",t("ws closed"),A(o);for(let[q,E]of d.entries())E.reject(new Error("ws disconnected")),d.delete(q);a+=1,x()}function V(){if(!l)return;let q=n();try{s=new WebSocket(q),t("ws connecting %s",q),o="connecting",A(o),s.addEventListener("open",P),s.addEventListener("message",w),s.addEventListener("error",()=>{}),s.addEventListener("close",Y)}catch(E){t("ws connect failed %o",E),x()}}return V(),{send(q,E){if(!wl.includes(q))return Promise.reject(new Error(`unknown message type: ${q}`));let S=fo(),L=$l(q,E,S);return t("send %s id=%s",q,S),new Promise((C,le)=>{d.set(S,{resolve:C,reject:le,type:q}),s&&s.readyState===s.OPEN?T(L):(t("queue %s id=%s (state=%s)",q,S,o),p.push(L))})},on(q,E){f.has(q)||f.set(q,new Set);let S=f.get(q);return S?.add(E),()=>{S?.delete(E)}},onConnection(q){return g.add(q),()=>{g.delete(q)}},reconnect(){l=!0,i&&(clearTimeout(i),i=null),a=0,V()},close(){l=!1,i&&(clearTimeout(i),i=null);try{s?.close()}catch{}},getState(){return o}}}function Zp(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function Xp(e,t){try{let n=await(await fetch("/api/config")).json();e.setState({config:n})}catch(r){t("config refresh failed",r)}}var _o=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Sl=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"]],Al=nl,Tl="worker:queue",El="ui:order",Cl="ui:display-policy",Rl="exec:presets",ur="tab:board:closed",Il="beads-ui.board.closed-range";function Qp(e){let t=rt("main");t("bootstrap start");let r=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;qe(r,e);let n=document.getElementById("top-nav"),s=document.getElementById("usage-meter"),o=document.getElementById("board-root"),a=document.getElementById("worker-root"),i=document.getElementById("monitor-root"),l=document.getElementById("detail-panel");if(s&&pl(s),o&&a&&i&&l){let Be=function(_,v){let re="Request failed",ne="";if(_&&typeof _=="object"){let m=_;if(typeof m.message=="string"&&m.message.length>0&&(re=m.message),typeof m.details=="string")ne=m.details;else if(m.details&&typeof m.details=="object")try{ne=JSON.stringify(m.details,null,2)}catch{ne=""}}else typeof _=="string"&&_.length>0&&(re=_);let ee=v&&v.length>0?`Failed to load ${v}`:"Request failed";Me.open(ee,re,ne)},R=function(_){return`${fe.getState().workspace.current?.path||""}\0${_}`},y=function(){O&&(O().catch(()=>{}),O=null),oe=null,ve=null},F=function(_){Ae=_;let v=()=>{Ae!==_||fe.getState().selected_id!==_||(Ae=null,z(_))};if(!D){Ie.then(v);return}v()},De=function(_,v,re,ne,ee){return re!==xe[v]?(ee().catch(()=>{}),!1):(_.set(ne,ee),!0)},at=function(){let _=fe.getState();ze(_.view==="board"),Ne(_.view==="worker"),pt(_.view==="monitor"),ut(_.view==="board"||_.view==="worker"||!!_.selected_id)},lt=function(){let _=Ar(it);return _===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:_}}},ze=function(_){if(_)for(let[v,re]of _o){if(K.has(v)||ae.has(v))continue;let ne=v===ur?lt():{type:re};try{J.register(v,ne)}catch(I){t("register %s store failed: %o",v,I)}ae.add(v);let ee=xe.board,m=!1;Re.subscribeList(v,ne).then(I=>{m=!De(K,"board",ee,v,I)}).catch(I=>{t("subscribe %s failed: %o",v,I),Be(I,"board")}).finally(()=>{ae.delete(v),m&&at()})}else vt()},vt=function(){xe.board+=1;for(let[_]of _o){let v=K.get(_);v&&(v().catch(()=>{}),K.delete(_));try{J.unregister(_)}catch(re){t("unregister %s failed: %o",_,re)}}},Ne=function(_){if(!_){tt();return}for(let[v,re]of Sl){if(_t.has(v)||ae.has(v))continue;try{J.register(v,{type:re})}catch(m){t("register %s store failed: %o",v,m)}ae.add(v);let ne=xe.worker,ee=!1;Re.subscribeList(v,{type:re}).then(m=>{ee=!De(_t,"worker",ne,v,m)}).catch(m=>{t("subscribe %s failed: %o",v,m),Be(m,"worker")}).finally(()=>{ae.delete(v),ee&&at()})}},tt=function(){xe.worker+=1;for(let[_]of Sl){let v=_t.get(_);v&&(v().catch(()=>{}),_t.delete(_));try{J.unregister(_)}catch(re){t("unregister %s failed: %o",_,re)}}},ut=function(_){if(!_){nt();return}dt||(ye("subscribe-worker-queue",{id:Tl}).catch(v=>{t("subscribe-worker-queue failed: %o",v)}),dt=()=>ye("unsubscribe-worker-queue",{id:Tl}))},nt=function(){dt&&(dt().catch(()=>{}),dt=null)},pt=function(_){if(!_){M();return}st||(ye("subscribe-monitor-pipeline",{id:Al}).catch(v=>{t("subscribe-monitor-pipeline failed: %o",v)}),st=()=>ye("unsubscribe-monitor-pipeline",{id:Al}))},M=function(){st&&(st().catch(()=>{}),st=null)},ce=function(){W||(ye("subscribe-ui-order",{id:El}).catch(_=>{t("subscribe-ui-order failed: %o",_)}),W=()=>ye("unsubscribe-ui-order",{id:El}))},ue=function(){W&&(W().catch(()=>{}),W=null),Oe.clear()},Te=function(){he||(ye("subscribe-display-policy",{id:Cl}).catch(_=>{t("subscribe-display-policy failed: %o",_)}),he=()=>ye("unsubscribe-display-policy",{id:Cl}))},He=function(){he&&(he().catch(()=>{}),he=null),_e.clear()},Ee=function(){Qe||(ye("subscribe-exec-presets",{id:Rl}).catch(_=>{t("subscribe-exec-presets failed: %o",_)}),Qe=()=>ye("unsubscribe-exec-presets",{id:Rl}))},be=function(_){if(!_)return"Unknown";let v=_.split("/").filter(Boolean);return v.length>0?v[v.length-1]:"Unknown"};var d=Be,p=R,f=y,g=F,A=De,x=at,T=lt,P=ze,w=vt,Y=Ne,V=tt,q=ut,E=nt,S=pt,L=M,C=ce,le=ue,$e=Te,de=He,me=Ee,Le=be;let Ge=document.getElementById("header-loading"),Ye=pa(Ge),Me=Di(e),ge=xl(),ye=Ye.wrapSend((_,v)=>ge.send(_,v)),Re=oa(ye),J=aa(),H=la(),X=Ho(),Oe=ia(),_e=jo(),ke=zo(),B=Wo();ge.on("exec-presets-snapshot",_=>{let v=_;v&&typeof v.revision=="number"&&Array.isArray(v.presets)&&ke.set({revision:v.revision,presets:v.presets})}),ge.on("monitor-pipeline-snapshot",_=>{let v=_;if(!(!v||!Array.isArray(v.workspaces)))try{X.set(v.workspaces,v.workspaces_state)}catch{}}),ge.on("ui-order-snapshot",_=>{let v=_;if(v&&typeof v.revision=="number")try{Oe.set({revision:v.revision,order:v.order&&typeof v.order=="object"?v.order:{}})}catch{}}),ge.on("display-policy-snapshot",_=>{let v=_;if(v&&v.policy&&typeof v.policy=="object")try{_e.set(v.policy)}catch{}}),ge.on("session-log-snapshot",_=>{let v=_;if(v&&typeof v.attempt_id=="string")try{B.set(v.attempt_id,Array.isArray(v.lines)?v.lines:[],typeof v.last_event_at=="number"?v.last_event_at:null)}catch{}}),ge.on("session-log-append",_=>{let v=_;if(v&&typeof v.attempt_id=="string")try{B.append(v.attempt_id,v.event)}catch{}}),ge.on("snapshot",_=>{let v=_,re=v&&typeof v.id=="string"?v.id:"",ne=re?J.getStore(re):null;if(ne&&v&&v.type==="snapshot")try{ne.applyPush(v)}catch{}}),ge.on("upsert",_=>{let v=_,re=v&&typeof v.id=="string"?v.id:"",ne=re?J.getStore(re):null;if(ne&&v&&v.type==="upsert")try{ne.applyPush(v)}catch{}}),ge.on("delete",_=>{let v=_,re=v&&typeof v.id=="string"?v.id:"",ne=re?J.getStore(re):null;if(ne&&v&&v.type==="delete")try{ne.applyPush(v)}catch{}});let O=null,oe=null,ve=null,Ae=null,Xe=()=>{},Ie=new Promise(_=>{Xe=()=>_(void 0)}),D=!1,U=!1;async function z(_){let v=R(_);if(v===oe||v===ve)return;ve=v;let re=`detail:${_}`,ne={type:"issue-detail",params:{id:_}};try{J.register(re,ne)}catch(ee){t("register detail store failed: %o",ee)}try{let ee=await Re.subscribeList(re,ne);if(fe.getState().selected_id!==_||R(_)!==v){await ee().catch(()=>{});return}O&&await O().catch(()=>{}),O=ee,oe=v}catch(ee){t("detail subscribe failed: %o",ee),Be(ee,"issue details")}finally{ve===v&&(ve=null)}}let K=new Map,ae=new Set,xe={board:0,worker:0},it=Lt;try{let _=window.localStorage.getItem(Il);Kt(_)&&(it=_)}catch{}async function Pt(_){if(!Kt(_)||_===it)return;it=_;try{window.localStorage.setItem(Il,_)}catch{}let v=K.get(ur);if(!v)return;K.delete(ur),await v().catch(()=>{});let re=lt();try{J.register(ur,re)}catch(ne){t("register %s store failed: %o",ur,ne)}try{let ne=await Re.subscribeList(ur,re);K.set(ur,ne)}catch(ne){t("re-subscribe %s failed: %o",ur,ne),Be(ne,"board")}}let _t=new Map,dt=null,st=null,W=null,he=null,Qe=null;async function Ve(){he=null,_e.clear(),Qe=null,ke.clear(),dt=null,st=null,K.clear(),_t.clear(),xe.board+=1,xe.worker+=1,Ee();let _=fe.getState().workspace.current?.path;if(_)try{await ge.send("set-workspace",{path:_})}catch(re){t("workspace restore after reconnect failed: %o",re);return}Te();let v=fe.getState();ze(v.view==="board"),Ne(v.view==="worker"),pt(v.view==="monitor"),ut(v.view==="board"||v.view==="worker"||!!v.selected_id)}async function u(){t("clearing all subscriptions for workspace switch"),vt(),tt(),nt(),H.clear(),ue(),ce(),He(),Te(),y();let _=fe.getState();if(_.selected_id)try{J.unregister(`detail:${_.selected_id}`)}catch{}let v=fe.getState();ze(v.view==="board"),Ne(v.view==="worker"),pt(v.view==="monitor"),ut(v.view==="board"||v.view==="worker"||!!v.selected_id),v.selected_id&&F(v.selected_id)}async function k(_){t("requesting workspace switch to %s",_),U=!0;try{let v=await ge.send("set-workspace",{path:_});t("workspace switch result: %o",v),v&&v.workspace&&(fe.setState({workspace:{current:{path:v.workspace.root_dir,database:v.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",_),v.changed&&(await u(),te("Switched to "+be(_),"success",2e3)))}catch(v){throw t("workspace switch failed: %o",v),te("Failed to switch workspace","error",3e3),v}finally{U=!1}}async function j(_){t("requesting workspace git pull for %s",_);try{let v=await ge.send("git-pull-workspace",{});t("workspace git pull result: %o",v);let re=v?.status;if(re==="up_to_date"){te("Already up to date","success",2e3);return}if(re==="stash_pop_conflict"){te("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}te("Git pulled "+be(_),"success",2e3)}catch(v){t("workspace git pull failed: %o",v);let re=v?.code,ne=v?.message;if(re==="rebase_conflict"){te("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(re==="rebase_conflict_abort_failed"){te("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(re==="busy"){te("Git pull skipped: another operation is running","warning",3e3);return}let ee=ne?`: ${ne}`:"";throw te(`Git pull failed${ee}`,"error",3e3),v}}async function pe(_,v){t("setting workspace visibility %s \u2192 %s",_,String(v));try{await ge.send("set-workspace-visibility",{path:_,visible:v}),await we()}catch(re){t("workspace visibility update failed: %o",re),te("Failed to update project visibility","error",3e3)}}async function we(){try{let _=await ge.send("list-workspaces",{});if(t("workspaces loaded: %o",_),_&&Array.isArray(_.workspaces)){let v=_.workspaces.map(m=>({path:m.path,database:m.database,pid:m.pid,version:m.version})),re=_.current?{path:_.current.root_dir,database:_.current.db_path}:null,ne=Array.isArray(_.hidden)?_.hidden.filter(m=>typeof m=="string"):[];fe.setState({workspace:{current:re,available:v,hidden:ne}});let ee=window.localStorage.getItem("beads-ui.workspace");ee&&(!v.some(I=>I.path===ee)||ne.includes(ee)?window.localStorage.removeItem("beads-ui.workspace"):re&&ee!==re.path&&(t("restoring saved workspace preference: %s",ee),await k(ee)))}}catch(_){t("failed to load workspaces: %o",_)}}ge.on("workspace-changed",_=>{t("workspace-changed event: %o",_),_&&_.root_dir&&(fe.setState({workspace:{current:{path:_.root_dir,database:_.db_path}}}),we(),u())});let se=!1;if(typeof ge.onConnection=="function"){let _=v=>{t("ws state %s",v),v==="reconnecting"||v==="closed"?(se=!0,te("Connection lost. Reconnecting\u2026","error",4e3)):v==="open"&&se&&(se=!1,te("Reconnected","success",2200),Xp(fe,(re,ne)=>{t(`${re}: %o`,ne)}),Ve())};ge.onConnection(_)}let Se="board";try{let _=window.localStorage.getItem("beads-ui.view");(_==="board"||_==="worker"||_==="monitor")&&(Se=_)}catch(_){t("view parse error: %o",_)}let fe=ua({config:Zp(),view:Se});ge.on("worker-queue-snapshot",_=>{let v=_;if(!v||!v.queue)return;let re=fe.getState().workspace.current?.path;if(typeof re=="string"&&re.length>0&&v.root_dir!==re){t("dropping worker-queue snapshot for %s",String(v.root_dir));return}try{H.set(v.queue)}catch{}});let Je=ca(fe);Je.start();let St=new Set(["get-comments","exec-preset-create","exec-preset-update","exec-preset-delete","apply-exec-preset"]),mt=async(_,v)=>{try{return await ye(_,v)}catch(re){if(St.has(_))throw re;return[]}};n&&ol(n,fe,Je);let et=document.getElementById("workspace-picker");et&&kl(et,fe,k,j,pe);let At=cl(e,(_,v)=>ye(_,v));try{let _=document.getElementById("new-issue-btn");_&&_.addEventListener("click",()=>At.open())}catch{}let Mt=Oi(e,{policyStore:_e,transport:(_,v)=>ye(_,v),labelOptions:()=>{let _=new Set;for(let[v]of _o)for(let re of J.snapshotFor(v)||[]){let ne=re.labels;if(Array.isArray(ne))for(let ee of ne)typeof ee=="string"&&ee.length>0&&_.add(ee)}return Array.from(_).sort()}});try{let _=document.getElementById("display-settings-btn");_&&_.addEventListener("click",()=>Mt.open())}catch{}let Et=ka(o,{gotoIssue:_=>Je.gotoIssue(_),issueStores:J,transport:mt,workerQueueStore:H,uiOrderStore:Oe,displayPolicyStore:_e,closedRange:it,onClosedRangeChange:_=>{Pt(_)},onNewIssue:()=>At.open()}),Ct=uo(a,{transport:mt,issueStores:J,queueStore:H,execPresetStore:ke,sessionLogStore:B,uiOrderStore:Oe,gotoIssue:_=>fe.setState({selected_id:_}),getWorkspacePath:()=>fe.getState().workspace.current?.path}),Ce=sl(i,{transport:mt,pipelineStore:X,execPresetStore:ke,gotoIssue:_=>Je.gotoIssue(_),getWorkspacePath:()=>fe.getState().workspace.current?.path,switchWorkspace:_=>k(_)}),Q=Ii(l,{issueStores:J,transport:mt,queueStore:H,execPresetStore:ke,sessionLogStore:B,getWorkspacePath:()=>fe.getState().workspace.current?.path,onNavigate:_=>{fe.getState().view==="worker"?fe.setState({selected_id:_}):Je.gotoIssue(_)},onClose:()=>{let _=fe.getState();fe.setState({selected_id:null});try{Je.gotoView(_.view==="worker"||_.view==="monitor"?_.view:"board")}catch{}},onOpenExecPresets:()=>{fe.setState({selected_id:null}),Je.gotoView("worker"),Ct.openExecDefaults()}}),b=fe.getState().selected_id;b&&(l.hidden=!1,Q.load(b),F(b)),fe.subscribe(_=>{let v=_.selected_id;v?(l.hidden=!1,Q.load(v),U||F(v)):(Q.clear(),l.hidden=!0,y())});let G=_=>{o.hidden=_.view!=="board",a.hidden=_.view!=="worker",i.hidden=_.view!=="monitor",ze(_.view==="board"),Ne(_.view==="worker"),pt(_.view==="monitor"),ut(_.view==="board"||_.view==="worker"||!!_.selected_id),!_.selected_id&&_.view==="board"&&Et.load(),_.view==="worker"&&Ct.load(),_.view==="monitor"?Ce.load():Ce.pause(),window.localStorage.setItem("beads-ui.view",_.view)};fe.subscribe(G),G(fe.getState()),ce(),Te(),Ee(),we().finally(()=>{D=!0,Xe()}),window.addEventListener("keydown",_=>{let v=_.ctrlKey||_.metaKey,re=String(_.key||"").toLowerCase(),ne=_.target,ee=ne&&ne.tagName?String(ne.tagName).toLowerCase():"",m=ee==="input"||ee==="textarea"||ee==="select"||ne&&typeof ne.isContentEditable=="boolean"&&ne.isContentEditable;v&&re==="n"&&(m||(_.preventDefault(),At.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let r=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let t=document.getElementById("app");t&&Qp(t)});export{Qp as bootstrap,Zp as readBootstrapConfig,Xp as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
