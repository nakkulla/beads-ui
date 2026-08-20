var pu=Object.create;var bo=Object.defineProperty;var fu=Object.getOwnPropertyDescriptor;var _u=Object.getOwnPropertyNames;var mu=Object.getPrototypeOf,gu=Object.prototype.hasOwnProperty;var bu=(e,t,r)=>t in e?bo(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var ho=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var hu=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of _u(t))!gu.call(e,s)&&s!==r&&bo(e,s,{get:()=>t[s],enumerable:!(n=fu(t,s))||n.enumerable});return e};var yu=(e,t,r)=>(r=e!=null?pu(mu(e)):{},hu(t||!e||!e.__esModule?bo(r,"default",{value:e,enumerable:!0}):r,e));var ct=(e,t,r)=>bu(e,typeof t!="symbol"?t+"":t,r);var xi=ho(($g,$i)=>{var Xr=1e3,Qr=Xr*60,Jr=Qr*60,qr=Jr*24,ku=qr*7,$u=qr*365.25;$i.exports=function(e,t){t=t||{};var r=typeof e;if(r==="string"&&e.length>0)return xu(e);if(r==="number"&&isFinite(e))return t.long?Su(e):Au(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function xu(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*$u;case"weeks":case"week":case"w":return r*ku;case"days":case"day":case"d":return r*qr;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Jr;case"minutes":case"minute":case"mins":case"min":case"m":return r*Qr;case"seconds":case"second":case"secs":case"sec":case"s":return r*Xr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function Au(e){var t=Math.abs(e);return t>=qr?Math.round(e/qr)+"d":t>=Jr?Math.round(e/Jr)+"h":t>=Qr?Math.round(e/Qr)+"m":t>=Xr?Math.round(e/Xr)+"s":e+"ms"}function Su(e){var t=Math.abs(e);return t>=qr?cs(e,t,qr,"day"):t>=Jr?cs(e,t,Jr,"hour"):t>=Qr?cs(e,t,Qr,"minute"):t>=Xr?cs(e,t,Xr,"second"):e+" ms"}function cs(e,t,r,n){var s=t>=r*1.5;return Math.round(e/r)+" "+n+(s?"s":"")}});var Si=ho((xg,Ai)=>{function Eu(e){r.debug=r,r.default=r,r.coerce=c,r.disable=a,r.enable=s,r.enabled=i,r.humanize=xi(),r.destroy=u,Object.keys(e).forEach(p=>{r[p]=e[p]}),r.names=[],r.skips=[],r.formatters={};function t(p){let f=0;for(let h=0;h<p.length;h++)f=(f<<5)-f+p.charCodeAt(h),f|=0;return r.colors[Math.abs(f)%r.colors.length]}r.selectColor=t;function r(p){let f,h=null,R,A;function L(...N){if(!L.enabled)return;let V=L,K=Number(new Date),W=K-(f||K);V.diff=W,V.prev=f,V.curr=K,f=K,N[0]=r.coerce(N[0]),typeof N[0]!="string"&&N.unshift("%O");let I=0;N[0]=N[0].replace(/%([a-zA-Z%])/g,(D,k)=>{if(D==="%%")return"%";I++;let B=r.formatters[k];if(typeof B=="function"){let oe=N[I];D=B.call(V,oe),N.splice(I,1),I--}return D}),r.formatArgs.call(V,N),(V.log||r.log).apply(V,N)}return L.namespace=p,L.useColors=r.useColors(),L.color=r.selectColor(p),L.extend=n,L.destroy=r.destroy,Object.defineProperty(L,"enabled",{enumerable:!0,configurable:!1,get:()=>h!==null?h:(R!==r.namespaces&&(R=r.namespaces,A=r.enabled(p)),A),set:N=>{h=N}}),typeof r.init=="function"&&r.init(L),L}function n(p,f){let h=r(this.namespace+(typeof f>"u"?":":f)+p);return h.log=this.log,h}function s(p){r.save(p),r.namespaces=p,r.names=[],r.skips=[];let f=(typeof p=="string"?p:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let h of f)h[0]==="-"?r.skips.push(h.slice(1)):r.names.push(h)}function o(p,f){let h=0,R=0,A=-1,L=0;for(;h<p.length;)if(R<f.length&&(f[R]===p[h]||f[R]==="*"))f[R]==="*"?(A=R,L=h,R++):(h++,R++);else if(A!==-1)R=A+1,L++,h=L;else return!1;for(;R<f.length&&f[R]==="*";)R++;return R===f.length}function a(){let p=[...r.names,...r.skips.map(f=>"-"+f)].join(",");return r.enable(""),p}function i(p){for(let f of r.skips)if(o(p,f))return!1;for(let f of r.names)if(o(p,f))return!0;return!1}function c(p){return p instanceof Error?p.stack||p.message:p}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}Ai.exports=Eu});var Ei=ho((Mt,ds)=>{Mt.formatArgs=Cu;Mt.save=Ru;Mt.load=Iu;Mt.useColors=Tu;Mt.storage=Lu();Mt.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();Mt.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Tu(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Cu(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+ds.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let r=0,n=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),e.splice(n,0,t)}Mt.log=console.debug||console.log||(()=>{});function Ru(e){try{e?Mt.storage.setItem("debug",e):Mt.storage.removeItem("debug")}catch{}}function Iu(){let e;try{e=Mt.storage.getItem("debug")||Mt.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function Lu(){try{return localStorage}catch{}}ds.exports=Si()(Mt);var{formatters:Ou}=ds.exports;Ou.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var mn=globalThis,ns=mn.trustedTypes,li=ns?ns.createPolicy("lit-html",{createHTML:e=>e}):void 0,vo="$lit$",pr=`lit$${Math.random().toFixed(9).slice(2)}$`,wo="?"+pr,vu=`<${wo}>`,Mr=document,gn=()=>Mr.createComment(""),bn=e=>e===null||typeof e!="object"&&typeof e!="function",ko=Array.isArray,_i=e=>ko(e)||typeof e?.[Symbol.iterator]=="function",yo=`[ 	
\f\r]`,_n=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ci=/-->/g,di=/>/g,Lr=RegExp(`>|${yo}(?:([^\\s"'>=/]+)(${yo}*=${yo}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ui=/'/g,pi=/"/g,mi=/^(?:script|style|textarea|title)$/i,$o=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),d=$o(1),$r=$o(2),gg=$o(3),Bt=Symbol.for("lit-noChange"),gt=Symbol.for("lit-nothing"),fi=new WeakMap,Or=Mr.createTreeWalker(Mr,129);function gi(e,t){if(!ko(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return li!==void 0?li.createHTML(t):t}var bi=(e,t)=>{let r=e.length-1,n=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=_n;for(let i=0;i<r;i++){let c=e[i],u,p,f=-1,h=0;for(;h<c.length&&(a.lastIndex=h,p=a.exec(c),p!==null);)h=a.lastIndex,a===_n?p[1]==="!--"?a=ci:p[1]!==void 0?a=di:p[2]!==void 0?(mi.test(p[2])&&(s=RegExp("</"+p[2],"g")),a=Lr):p[3]!==void 0&&(a=Lr):a===Lr?p[0]===">"?(a=s??_n,f=-1):p[1]===void 0?f=-2:(f=a.lastIndex-p[2].length,u=p[1],a=p[3]===void 0?Lr:p[3]==='"'?pi:ui):a===pi||a===ui?a=Lr:a===ci||a===di?a=_n:(a=Lr,s=void 0);let R=a===Lr&&e[i+1].startsWith("/>")?" ":"";o+=a===_n?c+vu:f>=0?(n.push(u),c.slice(0,f)+vo+c.slice(f)+pr+R):c+pr+(f===-2?i:R)}return[gi(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},hn=class e{constructor({strings:t,_$litType$:r},n){let s;this.parts=[];let o=0,a=0,i=t.length-1,c=this.parts,[u,p]=bi(t,r);if(this.el=e.createElement(u,n),Or.currentNode=this.el.content,r===2||r===3){let f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}for(;(s=Or.nextNode())!==null&&c.length<i;){if(s.nodeType===1){if(s.hasAttributes())for(let f of s.getAttributeNames())if(f.endsWith(vo)){let h=p[a++],R=s.getAttribute(f).split(pr),A=/([.?@])?(.*)/.exec(h);c.push({type:1,index:o,name:A[2],strings:R,ctor:A[1]==="."?os:A[1]==="?"?as:A[1]==="@"?is:Dr}),s.removeAttribute(f)}else f.startsWith(pr)&&(c.push({type:6,index:o}),s.removeAttribute(f));if(mi.test(s.tagName)){let f=s.textContent.split(pr),h=f.length-1;if(h>0){s.textContent=ns?ns.emptyScript:"";for(let R=0;R<h;R++)s.append(f[R],gn()),Or.nextNode(),c.push({type:2,index:++o});s.append(f[h],gn())}}}else if(s.nodeType===8)if(s.data===wo)c.push({type:2,index:o});else{let f=-1;for(;(f=s.data.indexOf(pr,f+1))!==-1;)c.push({type:7,index:o}),f+=pr.length-1}o++}}static createElement(t,r){let n=Mr.createElement("template");return n.innerHTML=t,n}};function Pr(e,t,r=e,n){if(t===Bt)return t;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=bn(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(t=Pr(e,s._$AS(e,t.values),s,n)),t}var ss=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:n}=this._$AD,s=(t?.creationScope??Mr).importNode(r,!0);Or.currentNode=s;let o=Or.nextNode(),a=0,i=0,c=n[0];for(;c!==void 0;){if(a===c.index){let u;c.type===2?u=new Zr(o,o.nextSibling,this,t):c.type===1?u=new c.ctor(o,c.name,c.strings,this,t):c.type===6&&(u=new ls(o,this,t)),this._$AV.push(u),c=n[++i]}a!==c?.index&&(o=Or.nextNode(),a++)}return Or.currentNode=Mr,s}p(t){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}},Zr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,n,s){this.type=2,this._$AH=gt,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=Pr(this,t,r),bn(t)?t===gt||t==null||t===""?(this._$AH!==gt&&this._$AR(),this._$AH=gt):t!==this._$AH&&t!==Bt&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):_i(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==gt&&bn(this._$AH)?this._$AA.nextSibling.data=t:this.T(Mr.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=hn.createElement(gi(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new ss(s,this),a=o.u(this.options);o.p(r),this.T(a),this._$AH=o}}_$AC(t){let r=fi.get(t.strings);return r===void 0&&fi.set(t.strings,r=new hn(t)),r}k(t){ko(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of t)s===r.length?r.push(n=new e(this.O(gn()),this.O(gn()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Dr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,n,s,o){this.type=1,this._$AH=gt,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=gt}_$AI(t,r=this,n,s){let o=this.strings,a=!1;if(o===void 0)t=Pr(this,t,r,0),a=!bn(t)||t!==this._$AH&&t!==Bt,a&&(this._$AH=t);else{let i=t,c,u;for(t=o[0],c=0;c<o.length-1;c++)u=Pr(this,i[n+c],r,c),u===Bt&&(u=this._$AH[c]),a||(a=!bn(u)||u!==this._$AH[c]),u===gt?t=gt:t!==gt&&(t+=(u??"")+o[c+1]),this._$AH[c]=u}a&&!s&&this.j(t)}j(t){t===gt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},os=class extends Dr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===gt?void 0:t}},as=class extends Dr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==gt)}},is=class extends Dr{constructor(t,r,n,s,o){super(t,r,n,s,o),this.type=5}_$AI(t,r=this){if((t=Pr(this,t,r,0)??gt)===Bt)return;let n=this._$AH,s=t===gt&&n!==gt||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==gt&&(n===gt||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},ls=class{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){Pr(this,t)}},hi={M:vo,P:pr,A:wo,C:1,L:bi,R:ss,D:_i,V:Pr,I:Zr,H:Dr,N:as,U:is,B:os,F:ls},wu=mn.litHtmlPolyfillSupport;wu?.(hn,Zr),(mn.litHtmlVersions??(mn.litHtmlVersions=[])).push("3.3.1");var Qe=(e,t,r)=>{let n=r?.renderBefore??t,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new Zr(t.insertBefore(gn(),o),o,void 0,r??{})}return s._$AI(e),s};var Pt="today",or=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Ut(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function Nr(e,t=Date.now()){switch(e){case"today":{let r=new Date(t);return r.setHours(0,0,0,0),r.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function yi(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function vi(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function wi(){let e=null,t=[],r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],n()},clear(){e=null,t=[],n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function ki(){let e=new Map,t=new Set;function r(s){return s.startsWith("session-log:")?s:`session-log:${s}`}function n(){for(let s of Array.from(t))try{s()}catch{}}return{set(s,o,a=null){e.set(r(s),{lines:Array.isArray(o)?[...o]:[],last_event_at:typeof a=="number"?a:null}),n()},append(s,o){let a=r(s),i=e.get(a)||{lines:[],last_event_at:null};i.lines=[...i.lines,o],i.last_event_at=Date.now(),e.set(a,i),n()},get(s){return e.get(r(s))||null},clear(s){typeof s=="string"?e.delete(r(s)):e.clear(),n()},subscribe(s){return t.add(s),()=>t.delete(s)}}}var Ti=yu(Ei(),1);function _t(e){return(0,Ti.default)(`beads-ui:${e}`)}function Zt(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Fr(e,t){let r=Zt(e.created_at),n=Zt(t.created_at);if(r!==n)return r<n?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Ii(e,t){let r=Zt(e.created_at),n=Zt(t.created_at);if(r!==n)return r<n?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Li(e,t){let r=Zt(e.updated_at),n=Zt(t.updated_at);if(r!==n)return r<n?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function Oi(e,t){let r=e.priority??2,n=t.priority??2;if(r!==n)return r-n;let s=Zt(e.created_at),o=Zt(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Mi(e,t){let r=e.closed_at??0,n=t.closed_at??0;if(r!==n)return r<n?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var Mu=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Ci(e){let t=e&&e.metadata,r=t?t.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Ri(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let r=Mu.exec(t);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Pi(e,t){let r=Ci(e),n=Ci(t);if(r!==n)return r<n?-1:1;let s=Ri(e),o=Ri(t);if(s!==o)return s<o?-1:1;let a=Zt(e&&e.created_at),i=Zt(t&&t.created_at);if(a!==i)return a<i?-1:1;let c=e&&e.id,u=t&&t.id;return c===u?0:String(c)<String(u)?-1:1}var xo=2**20;function en(e,t){let r=e&&e.id;return t&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(t,r)&&typeof t[r]=="number"&&Number.isFinite(t[r])?t[r]:-Zt(e&&e.created_at)}function us(e){return(t,r)=>{let n=en(t,e),s=en(r,e);if(n!==s)return n<s?-1:1;let o=t?.id,a=r?.id;return o<a?-1:o>a?1:0}}function Ao(e,t,r){let n=Array.isArray(e)?e:[],s=n.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?n[o-1]:null,i=o+1<s?n[o+1]:null;if(!a&&!i)return{rank:0};if(!a)return{rank:en(i,r)-xo};if(!i)return{rank:en(a,r)+xo};let c=en(a,r),u=en(i,r),p=(c+u)/2;return c<p&&p<u?{rank:p}:{renormalize:n.map((f,h)=>({bead_id:f.id,rank:h*xo}))}}function So(e,t={}){let r=_t(`issue-store:${e}`),n=new Map,s=[],o=0,a=new Set,i=!1,c=t.sort||Fr;function u(){for(let h of Array.from(a))try{h()}catch{}}function p(){s=Array.from(n.values()).sort(c)}function f(h){if(i||!h||h.id!==e)return;let R=Number(h.revision)||0;if(r("apply %s rev=%d",h.type,R),!(R<=o&&h.type!=="snapshot")){if(h.type==="snapshot"){if(R<=o)return;n.clear();let A=Array.isArray(h.issues)?h.issues:[];for(let L of A)L&&typeof L.id=="string"&&L.id.length>0&&n.set(L.id,L);p(),o=R,u();return}if(h.type==="upsert"){let A=h.issue;if(A&&typeof A.id=="string"&&A.id.length>0){let L=n.get(A.id);if(!L)n.set(A.id,A);else{let N=Number.isFinite(L.updated_at)?L.updated_at:0,V=Number.isFinite(A.updated_at)?A.updated_at:0;if(N<=V){for(let K of Object.keys(L))K in A||delete L[K];for(let[K,W]of Object.entries(A))L[K]=W}}p()}o=R,u()}else if(h.type==="delete"){let A=String(h.issue_id||"");A&&(n.delete(A),p()),o=R,u()}}}return{id:e,subscribe(h){return a.add(h),()=>{a.delete(h)}},applyPush:f,snapshot(){return s},size(){return n.size},getById(h){return n.get(h)},dispose(){i=!0,n.clear(),s=[],a.clear(),o=0}}}function ps(e){let t=String(e.type||"").trim(),r={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];r[o]=String(a)}}let n=new URLSearchParams(r).toString();return n.length>0?`${t}?${n}`:t}function Di(e){let t=_t("subs"),r=new Map,n=new Map;function s(i,c){t("applyDelta %s +%d ~%d -%d",i,(c.added||[]).length,(c.updated||[]).length,(c.removed||[]).length);let u=n.get(i);if(!u||u.size===0)return;let p=Array.isArray(c.added)?c.added:[],f=Array.isArray(c.updated)?c.updated:[],h=Array.isArray(c.removed)?c.removed:[];for(let R of Array.from(u)){let A=r.get(R);if(!A)continue;let L=A.itemsById;for(let N of p)typeof N=="string"&&N.length>0&&L.set(N,!0);for(let N of f)typeof N=="string"&&N.length>0&&L.set(N,!0);for(let N of h)typeof N=="string"&&N.length>0&&L.delete(N)}}async function o(i,c){let u=ps(c);if(t("subscribe %s key=%s",i,u),!r.has(i))r.set(i,{key:u,itemsById:new Map});else{let f=r.get(i);if(f&&f.key!==u){let h=n.get(f.key);h&&(h.delete(i),h.size===0&&n.delete(f.key)),r.set(i,{key:u,itemsById:new Map})}}n.has(u)||n.set(u,new Set);let p=n.get(u);p&&p.add(i);try{await e("subscribe-list",{id:i,type:c.type,params:c.params})}catch(f){let h=r.get(i)||null;if(h){let R=n.get(h.key);R&&(R.delete(i),R.size===0&&n.delete(h.key))}throw r.delete(i),f}return async()=>{t("unsubscribe %s key=%s",i,u);try{await e("unsubscribe-list",{id:i})}catch{}let f=r.get(i)||null;if(f){let h=n.get(f.key);h&&(h.delete(i),h.size===0&&n.delete(f.key))}r.delete(i)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:ps,selectors:{getIds(i){let c=r.get(i);return c?Array.from(c.itemsById.keys()):[]},has(i,c){let u=r.get(i);return u?u.itemsById.has(c):!1},count(i){let c=r.get(i);return c?c.itemsById.size:0},getItemsById(i){let c=r.get(i),u={};if(!c)return u;for(let p of c.itemsById.keys())u[p]=!0;return u}}}}function Ni(){let e=_t("issue-stores"),t=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let c of Array.from(n))try{c()}catch{}}function a(c,u,p){let f=u?ps(u):"",h=r.get(c)||"",R=t.has(c);if(e("register %s key=%s (prev=%s)",c,f,h),R&&h&&f&&h!==f){let A=t.get(c);if(A)try{A.dispose()}catch{}let L=s.get(c);if(L){try{L()}catch{}s.delete(c)}let N=So(c,p);t.set(c,N);let V=N.subscribe(()=>o());s.set(c,V)}else if(!R){let A=So(c,p);t.set(c,A);let L=A.subscribe(()=>o());s.set(c,L)}return r.set(c,f),()=>i(c)}function i(c){e("unregister %s",c),r.delete(c);let u=t.get(c);u&&(u.dispose(),t.delete(c));let p=s.get(c);if(p){try{p()}catch{}s.delete(c)}}return{register:a,unregister:i,getStore(c){return t.get(c)||null},snapshotFor(c){let u=t.get(c);return u?u.snapshot().slice():[]},subscribe(c){return n.add(c),()=>n.delete(c)}}}function qi(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Fi(){let e=null,t=!1,r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},set(s){e=s,n()},isPending(){return t},setPending(s){let o=s===!0;o!==t&&(t=o,n())},clear(){e=null,t=!1,n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function ji(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Eo(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function Pu(e){let t=String(e||""),r=t.startsWith("#")?t.slice(1):t,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let i=new URLSearchParams(s).get("issue");if(i)return decodeURIComponent(i)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function Du(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function Bi(e){let t=_t("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):Pu(n),a=Du(n);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let c=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==c&&(window.location.hash=c)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=Eo(o,n);t("goto issue %s (view=%s)",n,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?Eo(n,o):`#/${n}`;t("goto view %s (id=%s)",n,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var Nu=Object.freeze({workspace_config:{default_workspace:null}});function Ui(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:Nu.workspace_config.default_workspace}}}function Wi(e={}){let t=_t("state"),r={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:Ui(e.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let a={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?Ui(o.config):r.config},i=a.workspace.current?.path!==r.workspace.current?.path||a.workspace.available.length!==r.workspace.available.length||a.workspace.hidden.length!==r.workspace.hidden.length||a.workspace.hidden.some((u,p)=>u!==r.workspace.hidden[p]),c=a.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;a.selected_id===r.selected_id&&a.view===r.view&&a.filters.status===r.filters.status&&a.filters.search===r.filters.search&&a.filters.type===r.filters.type&&a.board.closed_filter===r.board.closed_filter&&a.worker.selected_parent_id===r.worker.selected_parent_id&&a.worker.show_closed_children.length===r.worker.show_closed_children.length&&a.worker.show_closed_children.every((u,p)=>u===r.worker.show_closed_children[p])&&!i&&!c||(r=a,t("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function zi(e){let t=_t("activity"),r=0,n=new Map,s=1;function o(){if(!e)return;let u=r>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function a(){r+=1,t("start count=%d",r),o()}function i(){let u=r;r=Math.max(0,r-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,r),o()}function c(u){return async(f,h)=>{let R=s++,A=Date.now();n.set(R,{type:f,start_ts:A}),t("request start id=%d type=%s count=%d",R,f,r+1),a();let L=!1,N=()=>{L||(L=!0,n.delete(R),i())},V=setTimeout(()=>{L||(t("request TIMEOUT id=%d type=%s elapsed=%dms",R,f,Date.now()-A),N())},3e4);try{let K=await u(f,h),W=Date.now()-A;return t("request done id=%d type=%s elapsed=%dms",R,f,W),K}catch(K){let W=Date.now()-A;throw t("request error id=%d type=%s elapsed=%dms err=%o",R,f,W,K),K}finally{clearTimeout(V),N()}}}return o(),{wrapSend:c,start:a,done:i,getCount:()=>r,getActiveRequests:()=>{let u=Date.now();return Array.from(n.entries()).map(([p,f])=>({id:p,type:f.type,elapsed_ms:u-f.start_ts}))}}}function ie(e,t="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=e,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",t==="success"?n.style.background="#156d36":t==="warning"?n.style.background="#a36a00":t==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function fs(e=void 0,t=void 0){function r(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function n(o,a,i){let c=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return c.sort(Mi),c;switch(i){case"created_desc":return c.sort(Fr),c;case"created_asc":return c.sort(Ii),c;case"updated_desc":return c.sort(Li),c;case"priority":return c.sort(Oi),c;case"manual":default:{let u=r();return u?c.sort(us(u)):c.sort(Fr),c}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let i of a)try{i()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function jr(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function wt(e){let t=jr(e);if(t===null)return"";let r=new Date(t),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function Dt(e,t){let r=jr(e);if(r===null)return"";let s=(typeof t=="number"?t:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let i=Math.floor(s/864e5);if(i<7)return`${i}\uC77C \uC804`;let c=Math.floor(i/7);if(i<30)return`${c}\uC8FC \uC804`;let u=Math.floor(i/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(i/365)}\uB144 \uC804`}function _s(e){if(!Array.isArray(e))return null;let t=null,r=-1;for(let n of e){if(!n||n.status!=="in_progress")continue;let s=jr(n.updated_at)??0;if(t===null||s>r){t=n,r=s;continue}s===r&&String(n.id)<String(t.id)&&(t=n)}return t}function ms(e){let t=e.transport,r=e.uiOrderStore;function n(a,i){return"renormalize"in a?a.renormalize:[{bead_id:i,rank:a.rank}]}function s(a,i){let c={...a.order};for(let u of i)c[u.bead_id]=u.rank;r&&r.set({revision:a.revision,order:c})}async function o(a,i,c){if(!t||!r)return;let u=r.get()||{revision:0,order:{}},p=n(Ao(i,c,u.order),a);s(u,p);let f=await t("ui-order-set",{expected_revision:u.revision,entries:p});if(f&&f.conflict){let h={revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}};r.set(h);let R=n(Ao(i,c,h.order),a);s(h,R);let A=await t("ui-order-set",{expected_revision:h.revision,entries:R});A&&A.applied&&r.set({revision:typeof A.revision=="number"?A.revision:0,order:A.order||{}})}else f&&f.applied&&r.set({revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}})}return{applyReorder:o}}function gs(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function To(e,t){return!t||typeof e!="string"||e.length===0||gs(t.visible_labels).includes(e)?!0:gs(t.hidden_labels).includes(e)?!1:!gs(t.hidden_prefixes).some(r=>r.length>0&&e.startsWith(r))}function bs(e,t){return gs(e).filter(r=>To(r,t))}function xr(e,t){let r=e&&e.chips?e.chips[t]:void 0;return typeof r=="boolean"?r:!0}var qu={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},Gi={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},Hi={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},Fu={review:"\u2713",skip:"\u2298"},Ar={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function ju(e,t,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function Vi(e){let t=e&&e.fill||"none";return t==="none"?Ar.none:e&&e.stale===!0?Ar.stale:t==="dim"?Ar.dim:e&&e.glyph==="review"?Ar.review:e&&e.glyph==="skip"?Ar.skip:Ar.done}function Bu(e){if(!e||e.fill==="none"||!e.approval_state)return Vi(e);let t=[];return e.glyph==="review"?t.push(Ar.review):e.glyph==="skip"&&t.push(Ar.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function Uu(e,t,r){let n=qu[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,a=Fu[t&&t.glyph||""]||"",i="bar";s==="dim"?i+=` b-${n} dim`:s==="full"&&(i+=` b-${n} full`),o&&(i+=" stale"),r&&(i+=" cur");let c=s==="none"?"lbl":`lbl l-${n} on`,u=r?`color: var(--stage-${n}-on)`:"";return d`
    <div class="seg">
      <div class=${i} style=${u}>${a}</div>
      <div class=${c}>
        ${Gi[e]||e}
      </div>
    </div>
  `}function hs(e,t){if(!e||!e.stages)return"";let r=Hi[e.route]||Hi.spec_backed,n=e.stages,s=ju(r,n,String(t||"open")),o=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${r.map(a=>`${Gi[a]||a} ${a==="plan"?Bu(n[a]||{}):Vi(n[a]||{})}`).join(" \xB7 ")}`;return d`
    <div class="stp" role="img" aria-label=${o}>
      ${r.map(a=>Uu(a,n[a]||{},a===s))}
    </div>
  `}function Wu(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Ki=2;function zu(e){if(!e)return[];let t=[];if(e.external){let n=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(d`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(e.blockers)?e.blockers:[];if(r.length>0){let n=r.slice(0,Ki).join(", "),s=r.length-Ki,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;t.push(d`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function Co(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function ys(e,t){if(!e)return null;let r=Co(e.kind),n=e.reason,s=e.kind==="delegated"?n===null:typeof n=="string"&&n.trim().length>0&&!/[\r\n]/.test(n);if(!r||!s)return null;let o=Co(t?.kind),a=o!==null&&t?.kind!==e.kind,i=`\uACC4\uD68D \xB7 ${r}${a?` \u2192 ${o}`:""}`,c=`planned_execution ${e.kind}${typeof n=="string"?`:${n}`:""}`,u=t?` \xB7 exec_receipt ${t.kind}:${t.actor}@${t.sha}`:"";return{kind:e.kind,label:i,title:`${c}${u}`}}function Yi(e,t){let r=ys(e,t);return r?d`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${r.kind}
        title=${r.title}
        >${r.label}</span
      >`:null}function Hu(e){if(!e)return null;let t=Co(e.kind);return t?d`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${e.kind}:${e.actor}@${e.sha}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function Gu(e,t){let r=t.policy||null,n=e.workflow&&e.workflow.chips||{},s=[];if(n.route&&xr(r,"route")){let i=n.route_source==="derived";s.push(d`<span
        class="ctl-chip ctl-chip--route${i?" is-derived":""}"
        title=${i?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${i?"unset":n.route}</span
      >`)}if(n.fast_track&&xr(r,"fast_track")&&s.push(d`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&xr(r,"pr")){let i=n.pr.number;s.push(d`<span class="ctl-chip ctl-chip--pr"
        >${`PR${i!=null?` #${i}`:""}`}</span
      >`)}let o=Yi(n.planned_execution,n.exec_receipt);if(o&&s.push(o),n.exec_receipt){let i=n.exec_receipt;s.push(d`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${i.kind}:${i.actor}@${i.sha}`}
        >${`exec ${i.kind==="delegated"?i.actor:`main:${i.actor}`} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}if(n.impl_entry){let i=n.impl_entry;s.push(d`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${i.actor}@${i.sha}`}
        >${`impl ${i.actor} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}for(let i of bs(e.labels,r))s.push(d`<span class="ctl-chip ctl-chip--label">${i}</span>`);return e.from_id&&xr(r,"from")&&s.push(d`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${i=>{i.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(i,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),xr(r,"blocked")&&s.push(...zu(e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&xr(r,"blocked")&&s.push(d`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":d`<div class="board-card__chips">${s}</div>`}function Vu(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function Ku(e){let t=Dt(e.created_at),r=Dt(e.updated_at);return!t&&!r?"":d`<span class="board-card__times">
    ${t?d`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${wt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&r?d`<span class="board-card__time-sep">·</span>`:""}
    ${r?d`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${wt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function Yu(e,t){let r=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=t.isExpanded?t.isExpanded(e.id):!0,o=n>0?r.children.slice().sort(Pi):r.children;return d`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?d`<button
              type="button"
              class="board-card__roll-toggle"
              aria-expanded=${s?"true":"false"}
              @click=${a=>t.onRollupToggle&&t.onRollupToggle(a,e.id)}
            >
              children ${r.count}/${n} ${s?"\u25B4":"\u25BE"}
            </button>`:d`<span class="board-card__roll-none">children 없음</span>`}
        ${Ku(e)}
      </div>
      ${n>0&&r.current?d`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${r.current.title||r.current.id}</span
            >
          </div>`:""}
      ${s&&n>0?d`<div class="board-card__roll-list">
            ${o.map((a,i)=>d`<button
                  type="button"
                  class="board-card__roll-child"
                  @click=${c=>t.onChildClick&&t.onChildClick(c,a.id)}
                >
                  <span class=${Vu(a.status)}>●</span>
                  <span class="board-card__roll-child-ord">${i+1}</span>
                  <span class="board-card__roll-child-title"
                    >${a.title||a.id}</span
                  >
                  ${ys(a.workflow?.chips?.planned_execution,a.workflow?.chips?.exec_receipt)?d`<span class="board-card__roll-child-chips">
                        ${Yi(a.workflow?.chips?.planned_execution,a.workflow?.chips?.exec_receipt)}
                        ${Hu(a.workflow?.chips?.exec_receipt)}
                      </span>`:""}
                </button>`)}
          </div>`:""}
    </div>
  `}function vs(e,t){let r=Wu(e.priority);return d`
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
        ${r?d`<span class="board-card__pri">${r}</span>`:""}
      </div>
      <div class="board-card__title">${e.title||"(\uC81C\uBAA9 \uC5C6\uC74C)"}</div>
      ${Gu(e,t)}
      ${e.workflow&&xr(t.policy||null,"stepper")?hs(e.workflow,e.status):""}
      ${Yu(e,t)}
    </article>
  `}function tn(e,t){let r=Array.isArray(e.items)?e.items.length:0,n=e.is_closed===!0;return d`
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
        ${n?d`<select
              class="board-column__closed-range"
              aria-label="Closed period"
              @change=${t.onClosedRangeChange}
            >
              ${or.map(o=>d`<option
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
        ${e.items.map(o=>vs(o,t))}
      </div>
    </section>
  `}function Zi(e,t,r){return d`
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
          ${e.items.length===0?d`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(n=>vs(n,t))}
        </div>
      </div>
    </dialog>
  `}var Zu=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],Xu=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],Qu=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function Ju(e,t,r){let n=e.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return d`
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
      ${r.label_menu_open?d`<div class="board-filter__label-menu" role="group">
            ${r.label_options.length===0?d`<div class="board-filter__label-empty">라벨 없음</div>`:r.label_options.map(o=>d`<label class="board-filter__label-row">
                      <input
                        type="checkbox"
                        .checked=${e.labels.includes(o)}
                        @change=${()=>t.onLabelToggle(o)}
                      />
                      <span>${o}</span>
                    </label>`)}
            ${n>0?d`<button
                  type="button"
                  class="board-filter__label-clear"
                  @click=${t.onLabelClear}
                >
                  선택 해제
                </button>`:""}
          </div>`:""}
    </div>
  `}function Xi(e,t,r){return d`
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
        ${Zu.map(n=>d`<option
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
        ${Xu.map(n=>d`<option
              value=${n.value}
              ?selected=${e.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${Ju(e,t,r)}
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
        ${Qu.map(n=>d`<option
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
  `}var ep=200,tp={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},rp=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Qi="beads-ui.board.sort",Ji=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function np(){try{let e=window.localStorage.getItem(Qi);if(e&&Ji.has(e))return e}catch{}return"created_desc"}function el(e,t){let r=_t("views:board"),n=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,i=t.displayPolicyStore,c=t.workerQueueStore,u=t.onClosedRangeChange,p=t.onNewIssue,f=t.closedRange||Pt,h=s?fs(s,a):null,R=ms({transport:o,uiOrderStore:a}),A=[],L=[],N=[],V=[],K=[],W=[],I=!1,S=0,D=np(),k=new Map,B=new Map,oe=new Map,de=new Set,te={search:"",priority:"",type:"",labels:[]},re=!1,Ie=null;function rt(j){return String(j.status||"open")==="open"}function De(j){let Q=String(j.status||"open");return Q==="open"||Q==="blocked"}function ot(j){let Q=te.search.trim().toLowerCase(),w=te.priority,C=te.type,P=te.labels;return j.filter(Z=>{if(Q){let pe=String(Z.id||"").toLowerCase(),$e=String(Z.title||"").toLowerCase();if(!pe.includes(Q)&&!$e.includes(Q))return!1}if(w!==""&&String(Z.priority)!==w||C!==""&&String(Z.issue_type||"")!==C)return!1;if(P.length>0){let pe=Array.isArray(Z.labels)?Z.labels:[];if(!P.some($e=>pe.includes($e)))return!1}return!0})}function it(){let j=new Set;for(let Q of[A,L,N,V,K,W])for(let w of Q){let C=Array.isArray(w.labels)?w.labels:[];for(let P of C)typeof P=="string"&&P.length>0&&j.add(P)}return Array.from(j).sort()}function Ve(){return te.search.trim()!==""||te.priority!==""||te.type!==""||te.labels.length>0}function be(){try{if(h){let j=h.selectBoardColumn("tab:board:in-progress","in_progress",D),Q=h.selectBoardColumn("tab:board:blocked","blocked",D).filter(De),w=new Set(j.map(Ee=>Ee.id)),C=h.selectBoardColumn("tab:board:ready","ready",D).filter(Ee=>rt(Ee)&&!w.has(Ee.id)),P=h.selectBoardColumn("tab:board:resolved","resolved",D),Z=h.selectBoardColumn("tab:board:deferred","deferred",D),pe=h.selectBoardColumn("tab:board:closed","closed").slice(0,ep),$e=[...Q,...C,...j,...P,...pe];Le($e);let X=new Set;for(let Ee of $e)Ee&&Ee.id&&!Ro(Ee)&&X.add(Ee.id);let nt=!Ve();A=nt?yn(Q,X):Q,L=nt?yn(C,X):C,N=nt?yn(j,X):j,V=nt?yn(P,X):P,K=Z,S=Z.length,W=nt?yn(pe,X):pe,k=new Map;for(let Ee of A)k.set(Ee.id,"open");for(let Ee of L)k.set(Ee.id,"open");for(let Ee of N)k.set(Ee.id,"in_progress");for(let Ee of V)k.set(Ee.id,"resolved");for(let Ee of K)k.set(Ee.id,"deferred");for(let Ee of W)k.set(Ee.id,"closed");B=new Map;for(let Ee of A)B.set(Ee.id,"blocked-col");for(let Ee of L)B.set(Ee.id,"ready-col");for(let Ee of N)B.set(Ee.id,"in-progress-col");for(let Ee of V)B.set(Ee.id,"resolved-col");for(let Ee of W)B.set(Ee.id,"closed-col")}M()}catch{A=[],L=[],N=[],V=[],K=[],W=[],oe=new Map,M()}}function Le(j){let Q=new Map;for(let C of j)C&&C.id&&!Q.has(C.id)&&Q.set(C.id,C);let w=new Map;for(let C of Q.values()){let P=Ro(C);if(!P)continue;let Z=w.get(P);Z||(Z=[],w.set(P,Z)),Z.push({id:C.id,title:C.title,status:C.status,metadata:C.metadata,workflow:C.workflow,created_at:C.created_at,updated_at:C.updated_at})}oe=w}function _e(j){let Q=oe.get(j)||[],w=0;for(let P of Q)(P.status==="resolved"||P.status==="closed")&&(w+=1);let C=_s(Q);return{total:Q.length,count:w,current:C,children:Q}}function ye(j){return!de.has(j)}function Ae(j,Q){j.preventDefault(),j.stopPropagation(),de.has(Q)?de.delete(Q):de.add(Q),M()}function Ne(j,Q){j.preventDefault(),j.stopPropagation(),n(Q)}function ve(j,Q){j.preventDefault(),j.stopPropagation(),n(Q)}function Fe(j,Q){Ie||n(Q)}function Ke(j,Q){j.preventDefault(),j.stopPropagation(),sp(Q).then(w=>{w&&ie("\uBCF5\uC0AC\uB428","success",1200)})}function xe(j,Q){Ie=Q,j.dataTransfer&&(j.dataTransfer.setData("text/plain",Q),j.dataTransfer.effectAllowed="move"),j.target.classList.add("board-card--dragging")}function tt(j){j.target.classList.remove("board-card--dragging"),he(),setTimeout(()=>{Ie=null},0)}function H(j){let Q=String(j.target.value||"");!Q||Q===f||(f=Q,u&&u(Q),M())}function F(){return i?i.get():null}function se(j){let Q=c?c.get():null,w=Q?Q.cleanup_failed:null;if(!w||typeof w!="object"||Array.isArray(w))return null;let C=w[j];return!C||typeof C!="object"||Array.isArray(C)?null:C}let Te={onCardClick:Fe,onCopyId:Ke,onDragStart:xe,onDragEnd:tt,onClosedRangeChange:H,rollupFor:_e,isExpanded:ye,onRollupToggle:Ae,onChildClick:Ne,onFromChipClick:ve,cleanupFailureFor:se,get policy(){return F()}};function je(j,Q){Ie||(ue(),n(Q))}function We(j,Q){j.preventDefault(),j.stopPropagation(),ue(),n(Q)}let Se={...Te,onCardClick:je,onChildClick:We,onFromChipClick:We,get policy(){return F()}};function lt(j){let Q=j.target,w=e.querySelector(".board-filter__labels");Q&&w&&w.contains(Q)||J()}function Ye(j){j.key==="Escape"&&J()}function z(){re||(re=!0,document.addEventListener("mousedown",lt),document.addEventListener("keydown",Ye),M())}function J(){re&&(re=!1,document.removeEventListener("mousedown",lt),document.removeEventListener("keydown",Ye),M())}function Ce(j){j.key==="Escape"&&ue()}function Be(){I||(I=!0,document.addEventListener("keydown",Ce),M())}function ue(){I&&(I=!1,document.removeEventListener("keydown",Ce),M())}let g={onClose:ue,onOverlayClick(j){j.target===j.currentTarget&&ue()}},$={onSearchInput(j){te.search=String(j.target.value||""),be()},onPriorityChange(j){te.priority=String(j.target.value||""),be()},onTypeChange(j){te.type=String(j.target.value||""),be()},onSortChange(j){let Q=String(j.target.value||"");if(!(!Ji.has(Q)||Q===D)){D=Q;try{window.localStorage.setItem(Qi,Q)}catch{}be()}},onDeferredToggle(){I?ue():Be()},onLabelMenuToggle(){re?J():z()},onLabelToggle(j){let Q=te.labels.indexOf(j);Q===-1?te.labels.push(j):te.labels.splice(Q,1),be()},onLabelClear(){te.labels.length!==0&&(te.labels=[],be())},onNewIssue(){p&&p()}};function x(){return d`
      <div class="board-view">
        ${Xi(te,$,{sort_mode:D,deferred_popup_open:I,deferred_count:S,label_options:it(),label_menu_open:re})}
        <div class="board-root">
          ${tn({title:"Blocked",id:"blocked-col",items:ot(A)},Te)}
          ${tn({title:"Ready",id:"ready-col",items:ot(L)},Te)}
          ${tn({title:"In progress",id:"in-progress-col",items:ot(N)},Te)}
          ${tn({title:"Resolved",id:"resolved-col",items:ot(V)},Te)}
          ${tn({title:"Closed",id:"closed-col",items:ot(W),is_closed:!0,closed_range:f},Te)}
        </div>
        ${I?Zi({items:ot(K),count:S},Se,g):""}
      </div>
    `}function M(){Qe(x(),e),G()}function G(){try{let j=e.querySelector("#deferred-popup");j&&!j.open&&(typeof j.showModal=="function"?j.showModal():j.setAttribute("open",""));let Q=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let w of Q)Array.from(w.querySelectorAll(".board-card")).forEach((P,Z)=>{P.tabIndex=Z===0?0:-1})}catch{}}async function Y(j,Q){if(!o){ie("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:j,status:Q}),ie("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(w){r("update-status failed: %o",w),ie("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function ne(j){switch(j){case"blocked-col":return A;case"ready-col":return L;case"in-progress-col":return N;case"resolved-col":return V;default:return[]}}function ce(j,Q,w){if(!o||!a)return;let C=ne(j),P=C.find(nt=>nt.id===Q);if(!P)return;let Z=C.filter(nt=>nt.id!==Q),pe=w.closest?w.closest(".board-card"):null,$e=Z.length;if(pe){let nt=pe.getAttribute("data-issue-id");if(nt===Q)return;let Ee=Z.findIndex(ft=>ft.id===nt);Ee>=0&&($e=Ee)}let X=Z.slice();X.splice($e,0,P),R.applyReorder(Q,X,$e)}function he(){for(let j of Array.from(e.querySelectorAll(".board-column--drag-over")))j.classList.remove("board-column--drag-over")}let we=null;e.addEventListener("dragover",j=>{j.preventDefault(),j.dataTransfer&&(j.dataTransfer.dropEffect="move");let w=j.target.closest(".board-column");w&&w!==we&&(we&&we.classList.remove("board-column--drag-over"),w.classList.add("board-column--drag-over"),we=w)}),e.addEventListener("dragleave",j=>{let Q=j.relatedTarget;(!Q||!e.contains(Q))&&we&&(we.classList.remove("board-column--drag-over"),we=null)}),e.addEventListener("drop",j=>{j.preventDefault(),we&&(we.classList.remove("board-column--drag-over"),we=null);let Q=j.target,w=Q.closest(".board-column");if(!w)return;let C=j.dataTransfer?.getData("text/plain")||"";if(!C)return;let P=w.id,Z=B.get(C);if(Z&&Z===P){if(rp.has(P)){if(D!=="manual"){ie("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}ce(P,C,Q)}return}let pe=tp[P];if(!pe){ie("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}k.get(C)!==pe&&Y(C,pe)}),e.addEventListener("keydown",j=>{let Q=j.target;if(!(Q instanceof HTMLElement))return;let w=String(Q.tagName||"").toLowerCase();if(w==="input"||w==="textarea"||w==="select"||w==="button"||w==="a"||Q.isContentEditable===!0)return;let C=Q.closest(".board-card");if(!C)return;let P=String(j.key||"");if(P==="Enter"||P===" "){j.preventDefault();let X=C.getAttribute("data-issue-id");X&&n(X);return}if(P!=="ArrowUp"&&P!=="ArrowDown"&&P!=="ArrowLeft"&&P!=="ArrowRight")return;j.preventDefault();let Z=C.closest(".board-column");if(!Z)return;let pe=Array.from(Z.querySelectorAll(".board-card")),$e=pe.indexOf(C);if(P==="ArrowDown"&&$e<pe.length-1){Pe(C,pe[$e+1]);return}if(P==="ArrowUp"&&$e>0){Pe(C,pe[$e-1]);return}if(P==="ArrowLeft"||P==="ArrowRight"){let X=Array.from(e.querySelectorAll(".board-column")),nt=X.indexOf(Z),Ee=P==="ArrowRight"?1:-1,ft=nt+Ee;for(;ft>=0&&ft<X.length;){let He=X[ft].querySelector(".board-card");if(He){Pe(C,He);return}ft+=Ee}}});function Pe(j,Q){try{j.tabIndex=-1,Q.tabIndex=0,Q.focus()}catch{}}let Oe=null;h&&h.subscribe&&(Oe=h.subscribe(()=>{try{be()}catch{}}));let ke=null;i&&i.subscribe&&(ke=i.subscribe(()=>{try{be()}catch{}}));let ze=null;return c&&c.subscribe&&(ze=c.subscribe(()=>{M()})),{async load(){r("load"),be()},clear(){J(),ue(),Oe&&(Oe(),Oe=null),ke&&(ke(),ke=null),ze&&(ze(),ze=null),e.replaceChildren(),A=[],L=[],N=[],V=[],K=[],W=[],k=new Map,B=new Map}}}function Ro(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function yn(e,t){return e.filter(r=>{let n=Ro(r);return!(n&&t.has(n))})}async function sp(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let r=!1;try{r=document.execCommand("copy")}finally{t.remove()}return r}catch{return!1}}async function Xt(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}function ar(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function Sr(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function op(e,t=document){let r=t.createElement("dialog");r.className="continuation-dialog";let n=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),i=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",i.textContent=`${ar(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${ar(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,n.type="button",n.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",n.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",r.append(a,i,n,s,o),t.body.append(r),new Promise(c=>{let u=p=>{typeof r.close=="function"&&r.close(),r.remove(),c(p)};n.addEventListener("click",()=>u("prior_session")),s.addEventListener("click",()=>u("fresh_current")),o.addEventListener("click",()=>u(null)),r.addEventListener("cancel",p=>{p.preventDefault(),u(null)}),typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")})}async function fr(e,t,r={}){let n=e;for(r.onResult?.(n);n?.continuation_mismatch;){let s=n.continuation_mismatch,o=await op(s);if(o===null)return n;n=await t(o,s.decision_token),r.onResult?.(n),n?.conflict&&r.refresh&&(n=await r.refresh(n),r.onResult?.(n))}return n}var ap=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","orchestration_model","orchestration_effort","orchestration_speed"],tl={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},ip=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function St(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function ht(e){return typeof e=="string"&&e.length>0?e:null}function ws(e){return e.startsWith("gpt-")?e.slice(4):e}function bt(e,t,r,n,s){return{value:e,source:t,display:r,full_value:n,resolution:s}}function ol(e,t,r){let n=ht(t[e]);if(n!==null)return{value:n,source:"pin"};let s=ht(r[e]);return s===null?null:{value:s,source:"global"}}function vn(e,t,r,n){return ol(e,t,r)||{value:n,source:"base"}}function rl(e,t,r,n){let s=r?.implementation?.model_catalog;if(t&&St(s?.[t])){let a=ht(s[t][e]);if(a!==null)return a}if(t&&Array.isArray(s?.[t])&&s[t].includes(e))return e;if(!t&&St(s)){for(let a of Object.values(s))if(St(a)){let i=ht(a[e]);if(i!==null)return i}else if(Array.isArray(a)&&a.includes(e))return e}let o=n?.model_index?.[e];return ht(n?.runners?.[o]?.models?.[e]?.id)||e}function lp(e,t){return ht(t?.review?.reviewers?.[e]?.model)||e}function wn(e,t,r=!1){if(e==="default")return bt(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let n=r?ws(e):e;return bt(e,t,n,e,"explicit")}function cp(e,t,r){let n=t?.implementation?.model_catalog?.[e],s=[];St(n)?s.push(...Object.keys(n)):Array.isArray(n)&&s.push(...n.filter(a=>typeof a=="string"));let o=r?.runners?.[e]?.models;if(St(o))for(let a of Object.keys(o))s.includes(a)||s.push(a);return s}function nl(e){return bt(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function sl(e,t,r){let n=ol(e,t,r);return n?wn(n.value,n.source):bt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function rn(e){let t=St(e.pin)?e.pin:{},r=St(e.global)?e.global:{},n=St(e.execution_defaults)?e.execution_defaults:null,s=n?.supported===!0&&St(n.session)?n.session:null,o=n?.supported===!0&&St(n.orchestration)?n.orchestration:null,a=St(e.runner_catalog)?e.runner_catalog:null,i={};if(s){let c=vn("workflow_mode",t,r,ht(s.workflow_mode_default));i.workflow_mode=c.source==="base"?bt(c.value,"base",c.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",c.value,"default"):wn(c.value,c.source);for(let A of["spec_review","plan_review","impl_review"]){let L=`${A}_model`,N=ht(A==="plan_review"?c.value==="fast_track"?s.plan_review?.fast_track_default:s.plan_review?.standard_recommended:s.review?.default),V=vn(L,t,r,N);if(V.value===null)i[L]=bt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(V.value!=="self"&&V.value!=="skip"&&!St(s.review?.reviewers?.[V.value]))i[L]=nl(bt(V.value,V.source,"",null,"explicit"));else{let K=lp(V.value,s);i[L]=bt(V.value,V.source,ws(K),K,V.source==="base"?"default":"explicit")}}for(let[A,L]of Object.entries(tl)){let N=i[L].value;if(N==="self"||N==="skip"){i[A]=bt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let V=ht(s.review?.reviewers?.[N||""]?.effort),K=vn(A,t,r,V);i[A]=K.value===null?bt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):bt(K.value,K.source,K.value,K.value,K.source==="base"?"default":"explicit")}let u=St(s.implementation?.default)?s.implementation.default:{},p=ht(e.route),f=p!==null&&["quick_fix","spec_backed","full_plan"].includes(p),h=St(s.implementation?.route_defaults)?s.implementation.route_defaults:{},R=f&&St(h[p])?h[p]:{};for(let A of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let L=vn(A,t,r,A==="impl_dispatch"?ht(R.dispatch)||ht(u.dispatch):ht(u[A.replace("impl_","")]));i[A]=L.value===null?bt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):bt(L.value,L.source,L.value,L.value,L.source==="base"?"default":"explicit")}if(i.impl_dispatch.value==="main"){i.impl_dispatch.display="\uBA54\uC778";for(let A of["impl_runtime","impl_model","impl_effort","impl_speed"])i[A]=bt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(i.impl_dispatch.value==="delegated"&&(i.impl_dispatch.display="\uC704\uC784"),i.impl_runtime.value==="inherit"&&(i.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",i.impl_runtime.resolution="dynamic"),i.impl_model.value!==null){let A=i.impl_runtime.value==="inherit"?ht(e.controller_runtime):i.impl_runtime.value,L=A?cp(A,s,a):[];if(i.impl_model.value!=="auto"&&L.length>0&&!L.includes(i.impl_model.value))i.impl_model=nl(i.impl_model);else{let N=rl(i.impl_model.value,A,s,a);i.impl_model.display=ws(N),i.impl_model.full_value=N}}if(i.impl_effort.value==="auto"){let A=ht(e.transport)||(i.impl_runtime.value==="codex"?"codex-native-spawn":i.impl_runtime.value==="claude"?"implement-claude":null),L=A?ht(s.implementation?.effort_by_transport?.[A]?.auto):null;L&&!ip.has(L)?(i.impl_effort.display=`${L} (\uBE44\uD638\uD658)`,i.impl_effort.full_value=L,i.impl_effort.resolution="incompatible"):(i.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",i.impl_effort.resolution="dynamic")}i.impl_speed.value==="default"&&(i.impl_speed=i.impl_speed.source==="base"?bt("default","base","default (\uC77C\uBC18)","default","default"):wn("default",i.impl_speed.source))}}else for(let c of ap.filter(u=>!u.startsWith("orchestration_")))i[c]=sl(c,t,r);if(!s){for(let[c,u]of Object.entries(tl))(i[u].value==="self"||i[u].value==="skip")&&(i[c]=bt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(i.impl_dispatch.value==="main"){i.impl_dispatch.display="\uBA54\uC778";for(let c of["impl_runtime","impl_model","impl_effort","impl_speed"])i[c]=bt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else i.impl_dispatch.value==="delegated"&&(i.impl_dispatch.display="\uC704\uC784"),i.impl_runtime.value==="inherit"&&(i.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",i.impl_runtime.resolution="dynamic"),i.impl_effort.value==="auto"&&(i.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",i.impl_effort.resolution="dynamic")}for(let c of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!o){i[c]=sl(c,t,r);continue}let u=c.replace("orchestration_",""),p=ht(o[u]),f=vn(c,t,r,p);if(c==="orchestration_effort"&&f.source==="base"){i[c]=bt(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(f.value===null){i[c]=bt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(c==="orchestration_model"){let h=f.source==="base"?ht(o.model_id)||f.value:rl(f.value,null,s,a);i[c]=bt(f.value,f.source,ws(h),h,f.source==="base"?"default":"explicit");continue}if(f.value==="default"){i[c]=f.source==="base"?bt("default","base","default (\uC77C\uBC18)","default","default"):wn("default",f.source);continue}i[c]=wn(f.value,f.source)}return i}function dp(e,t){let r=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let n=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${r} (${n})`}function ks(e){let t=St(e.pin)?e.pin:{},r=St(e.global)?e.global:{},n=p=>rn({pin:e.layer==="pin"?p:t,global:e.layer==="pin"?r:p,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,controller_runtime:e.controller_runtime}),s=e.layer==="pin"?t:r,o={...s};delete o[e.key];let a=n(o)[e.key],i=n(s)[e.key],c=ht(s[e.key]),u=[...e.choices];return c!==null&&!u.includes(c)&&u.unshift(c),{unset_label:dp(a,e.layer==="pin"),full_value:a.full_value,unavailable:a.resolution==="unavailable",disabled:i?.resolution==="not_applicable",options:u.map(p=>{let f=n({...s,[e.key]:p})[e.key];return{value:p,label:f.display,full_value:f.full_value}})}}function nn(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let r=e.createElement("h2"),n=e.createElement("textarea"),s=e.createElement("div"),o=e.createElement("button"),a=e.createElement("button");return r.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",n.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",n.maxLength=4e3,s.className="resume-instructions-dialog__actions",o.type="button",o.textContent="\uC774\uC5B4\uD558\uAE30",a.type="button",a.textContent="\uCDE8\uC18C",s.append(o,a),t.append(r,n,s),e.body.append(t),new Promise(i=>{let c=!1,u=f=>{c||(c=!0,typeof t.close=="function"&&t.close(),t.remove(),i(f))},p=()=>u(n.value.trim());o.addEventListener("click",p),a.addEventListener("click",()=>u(null)),n.addEventListener("keydown",f=>{f.key==="Enter"&&(f.ctrlKey||f.metaKey)&&(f.preventDefault(),p())}),t.addEventListener("cancel",f=>{f.preventDefault(),u(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),n.focus()})}var dl="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function kt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var _r=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],kn=[..._r,"reasoning_output_tokens"],up=["implementation","review-consult"];function Io(e){let t=0;for(let r of _r)t+=kt(e?.[r]);return t}function pp(e){return!e||typeof e!="object"?!1:_r.some(t=>Number.isFinite(e[t]))}function al(e){return!e||typeof e!="object"?!1:kn.some(t=>Number.isFinite(e[t]))}function fp(e){let t={};for(let r of kn)e&&Number.isFinite(e[r])&&(t[r]=e[r]);return t}function il(e){let t={};for(let r of kn)Number.isFinite(e[r])&&(t[r]=e[r]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function ll(e,t){return e==="codex"?kt(t.input_tokens)+kt(t.output_tokens):Io(t)}function _p(e){return e==="claude"?"Claude":"Codex"}function mp(e){return`\u03C4 ${ul(e)}`}function gp(e,t){let r=t.breakdown||{},n=[`\uC785\uB825 ${kt(r.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${kt(r.output_tokens).toLocaleString("en-US")}`];e==="claude"?n.push(`\uCE90\uC2DC\uC77D\uAE30 ${kt(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${kt(r.cache_creation_input_tokens).toLocaleString("en-US")}`):(n.push(`\uCE90\uC2DC\uC77D\uAE30 ${kt(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${kt(r.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(r.reasoning_output_tokens)&&n.push(`\uCD94\uB860\uCD9C\uB825 ${kt(r.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,n.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(dl),o.join(`
`)}function $t(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let r of["claude","codex"]){let n=e.providers[r];n&&t.push({provider:r,label:`${_p(r)} ${mp(n.subtotal)}${typeof n.total_cost_usd=="number"&&Number.isFinite(n.total_cost_usd)?` \xB7 $${n.total_cost_usd.toFixed(2)}`:""}`,tooltip:gp(r,n)})}return t}function xs(e){let t={},r={claude:!0,codex:!1},n={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let i=t[o];i||(i={subtotal:0,breakdown:{}},t[o]=i),i.subtotal+=a.subtotal;for(let c of kn)Number.isFinite(a.breakdown[c])&&(i.breakdown[c]=kt(i.breakdown[c])+kt(a.breakdown[c]));a.replayed&&(i.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?n.claude+=a.total_cost_usd:r.claude=!1)}return t.claude&&r.claude&&(t.claude.total_cost_usd=n.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function Lo(e){return!e||typeof e!="object"?null:Wt({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function bp(e){return e==="codex"?"codex":"claude"}function Er(){return{subtotal:0,breakdown:fp(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function $s(e,t,r){e.subtotal+=t.subtotal;for(let n of kn)Number.isFinite(t.usage[n])&&(e.breakdown[n]=kt(e.breakdown[n])+kt(t.usage[n]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),r&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function cl(e,t){let r={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(r.legs=e.legs),e.replayed&&(r.replayed=!0),r}function ul(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function sn(e){return pp(e)?`\u03C4 ${ul(Io(e))}`:null}function Qt(e){let t=sn(e);if(!t)return null;let r=e?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${t} \xB7 $${r.toFixed(2)}`:t}function on(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${kt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${kt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${kt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${kt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${Io(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&r.push(dl),r.join(`
`)}function Wt(e,t){let r={claude:Er(),codex:Er()},n={orchestrator:{claude:Er(),codex:Er()},implementation:{claude:Er(),codex:Er()},"review-consult":{claude:Er(),codex:Er()}},s=new Set;for(let i of Object.values(e||{})){if(!i||i.bead_id!==t)continue;let c=i.usage;if(al(c)){let p=bp(i.runner),f=il(c),h={provider:p,role:"orchestrator",attempt_id:String(i.attempt_id||""),usage:f,subtotal:ll(p,f)};f.replayed===!0&&(h.replayed=!0),typeof i.model=="string"&&(h.model=i.model),typeof i.session_id=="string"&&(h.session_id=i.session_id),$s(r[p],h,!0),$s(n.orchestrator[p],h,!0)}let u=Array.isArray(i.usage_legs)?i.usage_legs:[];for(let p of u){if(!p||p.provider!=="codex"||!up.includes(p.role)||!al(p.usage))continue;let f=typeof p.receipt_id=="string"&&p.receipt_id.length>0?p.receipt_id:null;if(!f||s.has(f))continue;s.add(f);let h=il(p.usage),R={provider:"codex",role:p.role,attempt_id:String(i.attempt_id||""),usage:h,subtotal:ll("codex",h)};R.receipt_id=f,typeof p.model=="string"&&(R.model=p.model),typeof p.effort=="string"&&p.effort.trim().length>0&&(R.effort=p.effort),typeof p.session_id=="string"?R.session_id=p.session_id:typeof p.thread_id=="string"&&(R.session_id=p.thread_id),typeof p.turn_id=="string"&&(R.turn_id=p.turn_id),typeof p.completed_at=="string"&&(R.completed_at=p.completed_at),h.replayed===!0&&(R.replayed=!0),$s(r.codex,R,!1),$s(n[R.role].codex,R,!1)}}let o={};for(let i of["claude","codex"]){let c=r[i];if(c.legs.length===0)continue;let u=cl(c,!1);i==="claude"&&c.outer_count>0&&c.outer_cost_count===c.outer_count&&(u.total_cost_usd=c.outer_cost),o[i]=u}if(Object.keys(o).length===0)return null;let a={};for(let i of["orchestrator","implementation","review-consult"]){let c={};for(let u of["claude","codex"]){let p=n[i][u];p.legs.length>0&&(c[u]={...cl(p,!0),legs:p.legs})}Object.keys(c).length>0&&(a[i]=c)}return{providers:o,roles:a}}var{entries:vl,setPrototypeOf:pl,isFrozen:hp,getPrototypeOf:yp,getOwnPropertyDescriptor:vp}=Object,{freeze:Rt,seal:zt,create:Fo}=Object,{apply:jo,construct:Bo}=typeof Reflect<"u"&&Reflect;Rt||(Rt=function(t){return t});zt||(zt=function(t){return t});jo||(jo=function(t,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return t.apply(r,s)});Bo||(Bo=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new t(...n)});var As=It(Array.prototype.forEach),wp=It(Array.prototype.lastIndexOf),fl=It(Array.prototype.pop),$n=It(Array.prototype.push),kp=It(Array.prototype.splice),Es=It(String.prototype.toLowerCase),Oo=It(String.prototype.toString),Mo=It(String.prototype.match),xn=It(String.prototype.replace),$p=It(String.prototype.indexOf),xp=It(String.prototype.trim),Jt=It(Object.prototype.hasOwnProperty),Ct=It(RegExp.prototype.test),An=Ap(TypeError);function It(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return jo(e,t,n)}}function Ap(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return Bo(e,r)}}function Je(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Es;pl&&pl(e,null);let n=t.length;for(;n--;){let s=t[n];if(typeof s=="string"){let o=r(s);o!==s&&(hp(t)||(t[n]=o),s=o)}e[s]=!0}return e}function Sp(e){for(let t=0;t<e.length;t++)Jt(e,t)||(e[t]=null);return e}function mr(e){let t=Fo(null);for(let[r,n]of vl(e))Jt(e,r)&&(Array.isArray(n)?t[r]=Sp(n):n&&typeof n=="object"&&n.constructor===Object?t[r]=mr(n):t[r]=n);return t}function Sn(e,t){for(;e!==null;){let n=vp(e,t);if(n){if(n.get)return It(n.get);if(typeof n.value=="function")return It(n.value)}e=yp(e)}function r(){return null}return r}var _l=Rt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Po=Rt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Do=Rt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Ep=Rt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),No=Rt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Tp=Rt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),ml=Rt(["#text"]),gl=Rt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),qo=Rt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),bl=Rt(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Ss=Rt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Cp=zt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Rp=zt(/<%[\w\W]*|[\w\W]*%>/gm),Ip=zt(/\$\{[\w\W]*/gm),Lp=zt(/^data-[\-\w.\u00B7-\uFFFF]+$/),Op=zt(/^aria-[\-\w]+$/),wl=zt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Mp=zt(/^(?:\w+script|data):/i),Pp=zt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),kl=zt(/^html$/i),Dp=zt(/^[a-z][.\w]*(-[.\w]+)+$/i),hl=Object.freeze({__proto__:null,ARIA_ATTR:Op,ATTR_WHITESPACE:Pp,CUSTOM_ELEMENT:Dp,DATA_ATTR:Lp,DOCTYPE_NAME:kl,ERB_EXPR:Rp,IS_ALLOWED_URI:wl,IS_SCRIPT_OR_DATA:Mp,MUSTACHE_EXPR:Cp,TMPLIT_EXPR:Ip}),En={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Np=function(){return typeof window>"u"?null:window},qp=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},yl=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function $l(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Np(),t=me=>$l(me);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==En.document||!e.Element)return t.isSupported=!1,t;let{document:r}=e,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:i,Element:c,NodeFilter:u,NamedNodeMap:p=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:f,DOMParser:h,trustedTypes:R}=e,A=c.prototype,L=Sn(A,"cloneNode"),N=Sn(A,"remove"),V=Sn(A,"nextSibling"),K=Sn(A,"childNodes"),W=Sn(A,"parentNode");if(typeof a=="function"){let me=r.createElement("template");me.content&&me.content.ownerDocument&&(r=me.content.ownerDocument)}let I,S="",{implementation:D,createNodeIterator:k,createDocumentFragment:B,getElementsByTagName:oe}=r,{importNode:de}=n,te=yl();t.isSupported=typeof vl=="function"&&typeof W=="function"&&D&&D.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:re,ERB_EXPR:Ie,TMPLIT_EXPR:rt,DATA_ATTR:De,ARIA_ATTR:ot,IS_SCRIPT_OR_DATA:it,ATTR_WHITESPACE:Ve,CUSTOM_ELEMENT:be}=hl,{IS_ALLOWED_URI:Le}=hl,_e=null,ye=Je({},[..._l,...Po,...Do,...No,...ml]),Ae=null,Ne=Je({},[...gl,...qo,...bl,...Ss]),ve=Object.seal(Fo(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Fe=null,Ke=null,xe=Object.seal(Fo(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),tt=!0,H=!0,F=!1,se=!0,Te=!1,je=!0,We=!1,Se=!1,lt=!1,Ye=!1,z=!1,J=!1,Ce=!0,Be=!1,ue="user-content-",g=!0,$=!1,x={},M=null,G=Je({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Y=null,ne=Je({},["audio","video","img","source","image","track"]),ce=null,he=Je({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),we="http://www.w3.org/1998/Math/MathML",Pe="http://www.w3.org/2000/svg",Oe="http://www.w3.org/1999/xhtml",ke=Oe,ze=!1,j=null,Q=Je({},[we,Pe,Oe],Oo),w=Je({},["mi","mo","mn","ms","mtext"]),C=Je({},["annotation-xml"]),P=Je({},["title","style","font","a","script"]),Z=null,pe=["application/xhtml+xml","text/html"],$e="text/html",X=null,nt=null,Ee=r.createElement("form"),ft=function(l){return l instanceof RegExp||l instanceof Function},He=function(){let l=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(nt&&nt===l)){if((!l||typeof l!="object")&&(l={}),l=mr(l),Z=pe.indexOf(l.PARSER_MEDIA_TYPE)===-1?$e:l.PARSER_MEDIA_TYPE,X=Z==="application/xhtml+xml"?Oo:Es,_e=Jt(l,"ALLOWED_TAGS")?Je({},l.ALLOWED_TAGS,X):ye,Ae=Jt(l,"ALLOWED_ATTR")?Je({},l.ALLOWED_ATTR,X):Ne,j=Jt(l,"ALLOWED_NAMESPACES")?Je({},l.ALLOWED_NAMESPACES,Oo):Q,ce=Jt(l,"ADD_URI_SAFE_ATTR")?Je(mr(he),l.ADD_URI_SAFE_ATTR,X):he,Y=Jt(l,"ADD_DATA_URI_TAGS")?Je(mr(ne),l.ADD_DATA_URI_TAGS,X):ne,M=Jt(l,"FORBID_CONTENTS")?Je({},l.FORBID_CONTENTS,X):G,Fe=Jt(l,"FORBID_TAGS")?Je({},l.FORBID_TAGS,X):mr({}),Ke=Jt(l,"FORBID_ATTR")?Je({},l.FORBID_ATTR,X):mr({}),x=Jt(l,"USE_PROFILES")?l.USE_PROFILES:!1,tt=l.ALLOW_ARIA_ATTR!==!1,H=l.ALLOW_DATA_ATTR!==!1,F=l.ALLOW_UNKNOWN_PROTOCOLS||!1,se=l.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Te=l.SAFE_FOR_TEMPLATES||!1,je=l.SAFE_FOR_XML!==!1,We=l.WHOLE_DOCUMENT||!1,Ye=l.RETURN_DOM||!1,z=l.RETURN_DOM_FRAGMENT||!1,J=l.RETURN_TRUSTED_TYPE||!1,lt=l.FORCE_BODY||!1,Ce=l.SANITIZE_DOM!==!1,Be=l.SANITIZE_NAMED_PROPS||!1,g=l.KEEP_CONTENT!==!1,$=l.IN_PLACE||!1,Le=l.ALLOWED_URI_REGEXP||wl,ke=l.NAMESPACE||Oe,w=l.MATHML_TEXT_INTEGRATION_POINTS||w,C=l.HTML_INTEGRATION_POINTS||C,ve=l.CUSTOM_ELEMENT_HANDLING||{},l.CUSTOM_ELEMENT_HANDLING&&ft(l.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(ve.tagNameCheck=l.CUSTOM_ELEMENT_HANDLING.tagNameCheck),l.CUSTOM_ELEMENT_HANDLING&&ft(l.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(ve.attributeNameCheck=l.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),l.CUSTOM_ELEMENT_HANDLING&&typeof l.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(ve.allowCustomizedBuiltInElements=l.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Te&&(H=!1),z&&(Ye=!0),x&&(_e=Je({},ml),Ae=[],x.html===!0&&(Je(_e,_l),Je(Ae,gl)),x.svg===!0&&(Je(_e,Po),Je(Ae,qo),Je(Ae,Ss)),x.svgFilters===!0&&(Je(_e,Do),Je(Ae,qo),Je(Ae,Ss)),x.mathMl===!0&&(Je(_e,No),Je(Ae,bl),Je(Ae,Ss))),l.ADD_TAGS&&(typeof l.ADD_TAGS=="function"?xe.tagCheck=l.ADD_TAGS:(_e===ye&&(_e=mr(_e)),Je(_e,l.ADD_TAGS,X))),l.ADD_ATTR&&(typeof l.ADD_ATTR=="function"?xe.attributeCheck=l.ADD_ATTR:(Ae===Ne&&(Ae=mr(Ae)),Je(Ae,l.ADD_ATTR,X))),l.ADD_URI_SAFE_ATTR&&Je(ce,l.ADD_URI_SAFE_ATTR,X),l.FORBID_CONTENTS&&(M===G&&(M=mr(M)),Je(M,l.FORBID_CONTENTS,X)),g&&(_e["#text"]=!0),We&&Je(_e,["html","head","body"]),_e.table&&(Je(_e,["tbody"]),delete Fe.tbody),l.TRUSTED_TYPES_POLICY){if(typeof l.TRUSTED_TYPES_POLICY.createHTML!="function")throw An('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof l.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw An('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');I=l.TRUSTED_TYPES_POLICY,S=I.createHTML("")}else I===void 0&&(I=qp(R,s)),I!==null&&typeof S=="string"&&(S=I.createHTML(""));Rt&&Rt(l),nt=l}},At=Je({},[...Po,...Do,...Ep]),Ft=Je({},[...No,...Tp]),dr=function(l){let _=W(l);(!_||!_.tagName)&&(_={namespaceURI:ke,tagName:"template"});let E=Es(l.tagName),U=Es(_.tagName);return j[l.namespaceURI]?l.namespaceURI===Pe?_.namespaceURI===Oe?E==="svg":_.namespaceURI===we?E==="svg"&&(U==="annotation-xml"||w[U]):!!At[E]:l.namespaceURI===we?_.namespaceURI===Oe?E==="math":_.namespaceURI===Pe?E==="math"&&C[U]:!!Ft[E]:l.namespaceURI===Oe?_.namespaceURI===Pe&&!C[U]||_.namespaceURI===we&&!w[U]?!1:!Ft[E]&&(P[E]||!At[E]):!!(Z==="application/xhtml+xml"&&j[l.namespaceURI]):!1},yt=function(l){$n(t.removed,{element:l});try{W(l).removeChild(l)}catch{N(l)}},Et=function(l,_){try{$n(t.removed,{attribute:_.getAttributeNode(l),from:_})}catch{$n(t.removed,{attribute:null,from:_})}if(_.removeAttribute(l),l==="is")if(Ye||z)try{yt(_)}catch{}else try{_.setAttribute(l,"")}catch{}},ur=function(l){let _=null,E=null;if(lt)l="<remove></remove>"+l;else{let ge=Mo(l,/^[\r\n\t ]+/);E=ge&&ge[0]}Z==="application/xhtml+xml"&&ke===Oe&&(l='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+l+"</body></html>");let U=I?I.createHTML(l):l;if(ke===Oe)try{_=new h().parseFromString(U,Z)}catch{}if(!_||!_.documentElement){_=D.createDocument(ke,"template",null);try{_.documentElement.innerHTML=ze?S:U}catch{}}let ae=_.body||_.documentElement;return l&&E&&ae.insertBefore(r.createTextNode(E),ae.childNodes[0]||null),ke===Oe?oe.call(_,We?"html":"body")[0]:We?_.documentElement:ae},wr=function(l){return k.call(l.ownerDocument||l,l,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},jt=function(l){return l instanceof f&&(typeof l.nodeName!="string"||typeof l.textContent!="string"||typeof l.removeChild!="function"||!(l.attributes instanceof p)||typeof l.removeAttribute!="function"||typeof l.setAttribute!="function"||typeof l.namespaceURI!="string"||typeof l.insertBefore!="function"||typeof l.hasChildNodes!="function")},Ht=function(l){return typeof i=="function"&&l instanceof i};function vt(me,l,_){As(me,E=>{E.call(t,l,_,nt)})}let nr=function(l){let _=null;if(vt(te.beforeSanitizeElements,l,null),jt(l))return yt(l),!0;let E=X(l.nodeName);if(vt(te.uponSanitizeElement,l,{tagName:E,allowedTags:_e}),je&&l.hasChildNodes()&&!Ht(l.firstElementChild)&&Ct(/<[/\w!]/g,l.innerHTML)&&Ct(/<[/\w!]/g,l.textContent)||l.nodeType===En.progressingInstruction||je&&l.nodeType===En.comment&&Ct(/<[/\w]/g,l.data))return yt(l),!0;if(!(xe.tagCheck instanceof Function&&xe.tagCheck(E))&&(!_e[E]||Fe[E])){if(!Fe[E]&&Ot(E)&&(ve.tagNameCheck instanceof RegExp&&Ct(ve.tagNameCheck,E)||ve.tagNameCheck instanceof Function&&ve.tagNameCheck(E)))return!1;if(g&&!M[E]){let U=W(l)||l.parentNode,ae=K(l)||l.childNodes;if(ae&&U){let ge=ae.length;for(let fe=ge-1;fe>=0;--fe){let Ze=L(ae[fe],!0);Ze.__removalCount=(l.__removalCount||0)+1,U.insertBefore(Ze,V(l))}}}return yt(l),!0}return l instanceof c&&!dr(l)||(E==="noscript"||E==="noembed"||E==="noframes")&&Ct(/<\/no(script|embed|frames)/i,l.innerHTML)?(yt(l),!0):(Te&&l.nodeType===En.text&&(_=l.textContent,As([re,Ie,rt],U=>{_=xn(_,U," ")}),l.textContent!==_&&($n(t.removed,{element:l.cloneNode()}),l.textContent=_)),vt(te.afterSanitizeElements,l,null),!1)},et=function(l,_,E){if(Ce&&(_==="id"||_==="name")&&(E in r||E in Ee))return!1;if(!(H&&!Ke[_]&&Ct(De,_))){if(!(tt&&Ct(ot,_))){if(!(xe.attributeCheck instanceof Function&&xe.attributeCheck(_,l))){if(!Ae[_]||Ke[_]){if(!(Ot(l)&&(ve.tagNameCheck instanceof RegExp&&Ct(ve.tagNameCheck,l)||ve.tagNameCheck instanceof Function&&ve.tagNameCheck(l))&&(ve.attributeNameCheck instanceof RegExp&&Ct(ve.attributeNameCheck,_)||ve.attributeNameCheck instanceof Function&&ve.attributeNameCheck(_,l))||_==="is"&&ve.allowCustomizedBuiltInElements&&(ve.tagNameCheck instanceof RegExp&&Ct(ve.tagNameCheck,E)||ve.tagNameCheck instanceof Function&&ve.tagNameCheck(E))))return!1}else if(!ce[_]){if(!Ct(Le,xn(E,Ve,""))){if(!((_==="src"||_==="xlink:href"||_==="href")&&l!=="script"&&$p(E,"data:")===0&&Y[l])){if(!(F&&!Ct(it,xn(E,Ve,"")))){if(E)return!1}}}}}}}return!0},Ot=function(l){return l!=="annotation-xml"&&Mo(l,be)},kr=function(l){vt(te.beforeSanitizeAttributes,l,null);let{attributes:_}=l;if(!_||jt(l))return;let E={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:Ae,forceKeepAttr:void 0},U=_.length;for(;U--;){let ae=_[U],{name:ge,namespaceURI:fe,value:Ze}=ae,y=X(ge),v=Ze,m=ge==="value"?v:xp(v);if(E.attrName=y,E.attrValue=m,E.keepAttr=!0,E.forceKeepAttr=void 0,vt(te.uponSanitizeAttribute,l,E),m=E.attrValue,Be&&(y==="id"||y==="name")&&(Et(ge,l),m=ue+m),je&&Ct(/((--!?|])>)|<\/(style|title|textarea)/i,m)){Et(ge,l);continue}if(y==="attributename"&&Mo(m,"href")){Et(ge,l);continue}if(E.forceKeepAttr)continue;if(!E.keepAttr){Et(ge,l);continue}if(!se&&Ct(/\/>/i,m)){Et(ge,l);continue}Te&&As([re,Ie,rt],T=>{m=xn(m,T," ")});let O=X(l.nodeName);if(!et(O,y,m)){Et(ge,l);continue}if(I&&typeof R=="object"&&typeof R.getAttributeType=="function"&&!fe)switch(R.getAttributeType(O,y)){case"TrustedHTML":{m=I.createHTML(m);break}case"TrustedScriptURL":{m=I.createScriptURL(m);break}}if(m!==v)try{fe?l.setAttributeNS(fe,ge,m):l.setAttribute(ge,m),jt(l)?yt(l):fl(t.removed)}catch{Et(ge,l)}}vt(te.afterSanitizeAttributes,l,null)},Gt=function me(l){let _=null,E=wr(l);for(vt(te.beforeSanitizeShadowDOM,l,null);_=E.nextNode();)vt(te.uponSanitizeShadowNode,_,null),nr(_),kr(_),_.content instanceof o&&me(_.content);vt(te.afterSanitizeShadowDOM,l,null)};return t.sanitize=function(me){let l=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},_=null,E=null,U=null,ae=null;if(ze=!me,ze&&(me="<!-->"),typeof me!="string"&&!Ht(me))if(typeof me.toString=="function"){if(me=me.toString(),typeof me!="string")throw An("dirty is not a string, aborting")}else throw An("toString is not a function");if(!t.isSupported)return me;if(Se||He(l),t.removed=[],typeof me=="string"&&($=!1),$){if(me.nodeName){let Ze=X(me.nodeName);if(!_e[Ze]||Fe[Ze])throw An("root node is forbidden and cannot be sanitized in-place")}}else if(me instanceof i)_=ur("<!---->"),E=_.ownerDocument.importNode(me,!0),E.nodeType===En.element&&E.nodeName==="BODY"||E.nodeName==="HTML"?_=E:_.appendChild(E);else{if(!Ye&&!Te&&!We&&me.indexOf("<")===-1)return I&&J?I.createHTML(me):me;if(_=ur(me),!_)return Ye?null:J?S:""}_&&lt&&yt(_.firstChild);let ge=wr($?me:_);for(;U=ge.nextNode();)nr(U),kr(U),U.content instanceof o&&Gt(U.content);if($)return me;if(Ye){if(z)for(ae=B.call(_.ownerDocument);_.firstChild;)ae.appendChild(_.firstChild);else ae=_;return(Ae.shadowroot||Ae.shadowrootmode)&&(ae=de.call(n,ae,!0)),ae}let fe=We?_.outerHTML:_.innerHTML;return We&&_e["!doctype"]&&_.ownerDocument&&_.ownerDocument.doctype&&_.ownerDocument.doctype.name&&Ct(kl,_.ownerDocument.doctype.name)&&(fe="<!DOCTYPE "+_.ownerDocument.doctype.name+`>
`+fe),Te&&As([re,Ie,rt],Ze=>{fe=xn(fe,Ze," ")}),I&&J?I.createHTML(fe):fe},t.setConfig=function(){let me=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};He(me),Se=!0},t.clearConfig=function(){nt=null,Se=!1},t.isValidAttribute=function(me,l,_){nt||He({});let E=X(me),U=X(l);return et(E,U,_)},t.addHook=function(me,l){typeof l=="function"&&$n(te[me],l)},t.removeHook=function(me,l){if(l!==void 0){let _=wp(te[me],l);return _===-1?void 0:kp(te[me],_,1)[0]}return fl(te[me])},t.removeHooks=function(me){te[me]=[]},t.removeAllHooks=function(){te=yl()},t}var xl=$l();var gr={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Ts=e=>(...t)=>({_$litDirective$:e,values:t}),an=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,n){this._$Ct=t,this._$AM=r,this._$Ci=n}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var Tn=class extends an{constructor(t){if(super(t),this.it=gt,t.type!==gr.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===gt||t==null)return this._t=void 0,this.it=t;if(t===Bt)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};Tn.directiveName="unsafeHTML",Tn.resultType=1;var Al=Ts(Tn);function Ho(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Ur=Ho();function Ll(e){Ur=e}var Ln={exec:()=>null};function st(e,t=""){let r=typeof e=="string"?e:e.source,n={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(Lt.caret,"$1"),r=r.replace(s,a),n},getRegex:()=>new RegExp(r,t)};return n}var Fp=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Lt={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},jp=/^(?:[ \t]*(?:\n|$))+/,Bp=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Up=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,On=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Wp=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Go=/(?:[*+-]|\d{1,9}[.)])/,Ol=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Ml=st(Ol).replace(/bull/g,Go).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),zp=st(Ol).replace(/bull/g,Go).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Vo=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Hp=/^[^\n]+/,Ko=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Gp=st(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Ko).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Vp=st(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Go).getRegex(),Ms="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Yo=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Kp=st("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Yo).replace("tag",Ms).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Pl=st(Vo).replace("hr",On).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ms).getRegex(),Yp=st(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Pl).getRegex(),Zo={blockquote:Yp,code:Bp,def:Gp,fences:Up,heading:Wp,hr:On,html:Kp,lheading:Ml,list:Vp,newline:jp,paragraph:Pl,table:Ln,text:Hp},Sl=st("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",On).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ms).getRegex(),Zp={...Zo,lheading:zp,table:Sl,paragraph:st(Vo).replace("hr",On).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Sl).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ms).getRegex()},Xp={...Zo,html:st(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Yo).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Ln,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:st(Vo).replace("hr",On).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Ml).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Qp=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Jp=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Dl=/^( {2,}|\\)\n(?!\s*$)/,ef=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Ps=/[\p{P}\p{S}]/u,Xo=/[\s\p{P}\p{S}]/u,Nl=/[^\s\p{P}\p{S}]/u,tf=st(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Xo).getRegex(),ql=/(?!~)[\p{P}\p{S}]/u,rf=/(?!~)[\s\p{P}\p{S}]/u,nf=/(?:[^\s\p{P}\p{S}]|~)/u,sf=st(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Fp?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Fl=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,of=st(Fl,"u").replace(/punct/g,Ps).getRegex(),af=st(Fl,"u").replace(/punct/g,ql).getRegex(),jl="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",lf=st(jl,"gu").replace(/notPunctSpace/g,Nl).replace(/punctSpace/g,Xo).replace(/punct/g,Ps).getRegex(),cf=st(jl,"gu").replace(/notPunctSpace/g,nf).replace(/punctSpace/g,rf).replace(/punct/g,ql).getRegex(),df=st("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Nl).replace(/punctSpace/g,Xo).replace(/punct/g,Ps).getRegex(),uf=st(/\\(punct)/,"gu").replace(/punct/g,Ps).getRegex(),pf=st(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),ff=st(Yo).replace("(?:-->|$)","-->").getRegex(),_f=st("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",ff).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Is=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,mf=st(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Is).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Bl=st(/^!?\[(label)\]\[(ref)\]/).replace("label",Is).replace("ref",Ko).getRegex(),Ul=st(/^!?\[(ref)\](?:\[\])?/).replace("ref",Ko).getRegex(),gf=st("reflink|nolink(?!\\()","g").replace("reflink",Bl).replace("nolink",Ul).getRegex(),El=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Qo={_backpedal:Ln,anyPunctuation:uf,autolink:pf,blockSkip:sf,br:Dl,code:Jp,del:Ln,emStrongLDelim:of,emStrongRDelimAst:lf,emStrongRDelimUnd:df,escape:Qp,link:mf,nolink:Ul,punctuation:tf,reflink:Bl,reflinkSearch:gf,tag:_f,text:ef,url:Ln},bf={...Qo,link:st(/^!?\[(label)\]\((.*?)\)/).replace("label",Is).getRegex(),reflink:st(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Is).getRegex()},Uo={...Qo,emStrongRDelimAst:cf,emStrongLDelim:af,url:st(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",El).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:st(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",El).getRegex()},hf={...Uo,br:st(Dl).replace("{2,}","*").getRegex(),text:st(Uo.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Cs={normal:Zo,gfm:Zp,pedantic:Xp},Cn={normal:Qo,gfm:Uo,breaks:hf,pedantic:bf},yf={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Tl=e=>yf[e];function br(e,t){if(t){if(Lt.escapeTest.test(e))return e.replace(Lt.escapeReplace,Tl)}else if(Lt.escapeTestNoEncode.test(e))return e.replace(Lt.escapeReplaceNoEncode,Tl);return e}function Cl(e){try{e=encodeURI(e).replace(Lt.percentDecode,"%")}catch{return null}return e}function Rl(e,t){let r=e.replace(Lt.findPipe,(o,a,i)=>{let c=!1,u=a;for(;--u>=0&&i[u]==="\\";)c=!c;return c?"|":" |"}),n=r.split(Lt.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(Lt.slashPipe,"|");return n}function Rn(e,t,r){let n=e.length;if(n===0)return"";let s=0;for(;s<n;){let o=e.charAt(n-s-1);if(o===t&&!r)s++;else if(o!==t&&r)s++;else break}return e.slice(0,n-s)}function vf(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return r>0?-2:-1}function Il(e,t,r,n,s){let o=t.href,a=t.title||null,i=e[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let c={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:a,text:i,tokens:n.inlineTokens(i)};return n.state.inLink=!1,c}function wf(e,t,r){let n=e.match(r.other.indentCodeCompensation);if(n===null)return t;let s=n[1];return t.split(`
`).map(o=>{let a=o.match(r.other.beginningSpace);if(a===null)return o;let[i]=a;return i.length>=s.length?o.slice(s.length):o}).join(`
`)}var Ls=class{constructor(e){ct(this,"options");ct(this,"rules");ct(this,"lexer");this.options=e||Ur}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:Rn(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],n=wf(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let n=Rn(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Rn(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=Rn(t[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let a=!1,i=[],c;for(c=0;c<r.length;c++)if(this.rules.other.blockquoteStart.test(r[c]))i.push(r[c]),a=!0;else if(!a)i.push(r[c]);else break;r=r.slice(c);let u=i.join(`
`),p=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${u}`:u,s=s?`${s}
${p}`:p;let f=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(p,o,!0),this.lexer.state.top=f,r.length===0)break;let h=o.at(-1);if(h?.type==="code")break;if(h?.type==="blockquote"){let R=h,A=R.raw+`
`+r.join(`
`),L=this.blockquote(A);o[o.length-1]=L,n=n.substring(0,n.length-R.raw.length)+L.raw,s=s.substring(0,s.length-R.text.length)+L.text;break}else if(h?.type==="list"){let R=h,A=R.raw+`
`+r.join(`
`),L=this.list(A);o[o.length-1]=L,n=n.substring(0,n.length-h.raw.length)+L.raw,s=s.substring(0,s.length-R.raw.length)+L.raw,r=A.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),a=!1;for(;e;){let c=!1,u="",p="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let f=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,L=>" ".repeat(3*L.length)),h=e.split(`
`,1)[0],R=!f.trim(),A=0;if(this.options.pedantic?(A=2,p=f.trimStart()):R?A=t[1].length+1:(A=t[2].search(this.rules.other.nonSpaceChar),A=A>4?1:A,p=f.slice(A),A+=t[1].length),R&&this.rules.other.blankLine.test(h)&&(u+=h+`
`,e=e.substring(h.length+1),c=!0),!c){let L=this.rules.other.nextBulletRegex(A),N=this.rules.other.hrRegex(A),V=this.rules.other.fencesBeginRegex(A),K=this.rules.other.headingBeginRegex(A),W=this.rules.other.htmlBeginRegex(A);for(;e;){let I=e.split(`
`,1)[0],S;if(h=I,this.options.pedantic?(h=h.replace(this.rules.other.listReplaceNesting,"  "),S=h):S=h.replace(this.rules.other.tabCharGlobal,"    "),V.test(h)||K.test(h)||W.test(h)||L.test(h)||N.test(h))break;if(S.search(this.rules.other.nonSpaceChar)>=A||!h.trim())p+=`
`+S.slice(A);else{if(R||f.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||V.test(f)||K.test(f)||N.test(f))break;p+=`
`+h}!R&&!h.trim()&&(R=!0),u+=I+`
`,e=e.substring(I.length+1),f=S.slice(A)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(a=!0)),s.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(p),loose:!1,text:p,tokens:[]}),s.raw+=u}let i=s.items.at(-1);if(i)i.raw=i.raw.trimEnd(),i.text=i.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let c of s.items){if(this.lexer.state.top=!1,c.tokens=this.lexer.blockTokens(c.text,[]),c.task){if(c.text=c.text.replace(this.rules.other.listReplaceTask,""),c.tokens[0]?.type==="text"||c.tokens[0]?.type==="paragraph"){c.tokens[0].raw=c.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),c.tokens[0].text=c.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let p=this.lexer.inlineQueue.length-1;p>=0;p--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[p].src)){this.lexer.inlineQueue[p].src=this.lexer.inlineQueue[p].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(c.raw);if(u){let p={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};c.checked=p.checked,s.loose?c.tokens[0]&&["paragraph","text"].includes(c.tokens[0].type)&&"tokens"in c.tokens[0]&&c.tokens[0].tokens?(c.tokens[0].raw=p.raw+c.tokens[0].raw,c.tokens[0].text=p.raw+c.tokens[0].text,c.tokens[0].tokens.unshift(p)):c.tokens.unshift({type:"paragraph",raw:p.raw,text:p.raw,tokens:[p]}):c.tokens.unshift(p)}}if(!s.loose){let u=c.tokens.filter(f=>f.type==="space"),p=u.length>0&&u.some(f=>this.rules.other.anyLine.test(f.raw));s.loose=p}}if(s.loose)for(let c of s.items){c.loose=!0;for(let u of c.tokens)u.type==="text"&&(u.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:n,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=Rl(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let a of n)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<r.length;a++)o.header.push({text:r[a],tokens:this.lexer.inline(r[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(Rl(a,o.header.length).map((i,c)=>({text:i,tokens:this.lexer.inline(i),header:!1,align:o.align[c]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=Rn(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=vf(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let n=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),Il(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return Il(r,s,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,a,i=s,c=0,u=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+s);(n=u.exec(t))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(a=[...o].length,n[3]||n[4]){i+=a;continue}else if((n[5]||n[6])&&s%3&&!((s+a)%3)){c+=a;continue}if(i-=a,i>0)continue;a=Math.min(a,a+i+c);let p=[...n[0]][0].length,f=e.slice(0,s+n.index+p+a);if(Math.min(s,a)%2){let R=f.slice(1,-1);return{type:"em",raw:f,text:R,tokens:this.lexer.inlineTokens(R)}}let h=f.slice(2,-2);return{type:"strong",raw:f,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,n;return t[2]==="@"?(r=t[1],n="mailto:"+r):(r=t[1],n=r),{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,n;if(t[2]==="@")r=t[0],n="mailto:"+r;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);r=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},er=class Wo{constructor(t){ct(this,"tokens");ct(this,"options");ct(this,"state");ct(this,"inlineQueue");ct(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Ur,this.options.tokenizer=this.options.tokenizer||new Ls,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:Lt,block:Cs.normal,inline:Cn.normal};this.options.pedantic?(r.block=Cs.pedantic,r.inline=Cn.pedantic):this.options.gfm&&(r.block=Cs.gfm,this.options.breaks?r.inline=Cn.breaks:r.inline=Cn.gfm),this.tokenizer.rules=r}static get rules(){return{block:Cs,inline:Cn}}static lex(t,r){return new Wo(r).lex(t)}static lexInline(t,r){return new Wo(r).inlineTokens(t)}lex(t){t=t.replace(Lt.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,r=[],n=!1){for(this.options.pedantic&&(t=t.replace(Lt.tabCharGlobal,"    ").replace(Lt.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,r))?(t=t.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=r.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
`:r.push(s);continue}if(s=this.tokenizer.code(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(s=this.tokenizer.fences(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.heading(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.hr(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.blockquote(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.list(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.html(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.def(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.raw,this.inlineQueue.at(-1).src=a.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},r.push(s));continue}if(s=this.tokenizer.table(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.lheading(t)){t=t.substring(s.raw.length),r.push(s);continue}let o=t;if(this.options.extensions?.startBlock){let a=1/0,i=t.slice(1),c;this.options.extensions.startBlock.forEach(u=>{c=u.call({lexer:this},i),typeof c=="number"&&c>=0&&(a=Math.min(a,c))}),a<1/0&&a>=0&&(o=t.substring(0,a+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let a=r.at(-1);n&&a?.type==="paragraph"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s),n=o.length!==t.length,t=t.substring(s.raw.length);continue}if(s=this.tokenizer.text(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,r}inline(t,r=[]){return this.inlineQueue.push({src:t,tokens:r}),r}inlineTokens(t,r=[]){let n=t,s=null;if(this.tokens.links){let c=Object.keys(this.tokens.links);if(c.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)c.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let a=!1,i="";for(;t;){a||(i=""),a=!1;let c;if(this.options.extensions?.inline?.some(p=>(c=p.call({lexer:this},t,r))?(t=t.substring(c.raw.length),r.push(c),!0):!1))continue;if(c=this.tokenizer.escape(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.tag(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.link(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(c.raw.length);let p=r.at(-1);c.type==="text"&&p?.type==="text"?(p.raw+=c.raw,p.text+=c.text):r.push(c);continue}if(c=this.tokenizer.emStrong(t,n,i)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.codespan(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.br(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.del(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.autolink(t)){t=t.substring(c.raw.length),r.push(c);continue}if(!this.state.inLink&&(c=this.tokenizer.url(t))){t=t.substring(c.raw.length),r.push(c);continue}let u=t;if(this.options.extensions?.startInline){let p=1/0,f=t.slice(1),h;this.options.extensions.startInline.forEach(R=>{h=R.call({lexer:this},f),typeof h=="number"&&h>=0&&(p=Math.min(p,h))}),p<1/0&&p>=0&&(u=t.substring(0,p+1))}if(c=this.tokenizer.inlineText(u)){t=t.substring(c.raw.length),c.raw.slice(-1)!=="_"&&(i=c.raw.slice(-1)),a=!0;let p=r.at(-1);p?.type==="text"?(p.raw+=c.raw,p.text+=c.text):r.push(c);continue}if(t){let p="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(p);break}else throw new Error(p)}}return r}},Os=class{constructor(e){ct(this,"options");ct(this,"parser");this.options=e||Ur}space(e){return""}code({text:e,lang:t,escaped:r}){let n=(t||"").match(Lt.notSpaceStart)?.[0],s=e.replace(Lt.endingNewline,"")+`
`;return n?'<pre><code class="language-'+br(n)+'">'+(r?s:br(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:br(s,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${br(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let n=this.parser.parseInline(r),s=Cl(e);if(s===null)return n;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+br(t)+'"'),o+=">"+n+"</a>",o}image({href:e,title:t,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=Cl(e);if(s===null)return br(r);e=s;let o=`<img src="${e}" alt="${r}"`;return t&&(o+=` title="${br(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:br(e.text)}},Jo=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},tr=class zo{constructor(t){ct(this,"options");ct(this,"renderer");ct(this,"textRenderer");this.options=t||Ur,this.options.renderer=this.options.renderer||new Os,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Jo}static parse(t,r){return new zo(r).parse(t)}static parseInline(t,r){return new zo(r).parseInline(t)}parse(t){let r="";for(let n=0;n<t.length;n++){let s=t[n];if(this.options.extensions?.renderers?.[s.type]){let a=s,i=this.options.extensions.renderers[a.type].call({parser:this},a);if(i!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){r+=i||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}parseInline(t,r=this.renderer){let n="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let i=this.options.extensions.renderers[o.type].call({parser:this},o);if(i!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=i||"";continue}}let a=o;switch(a.type){case"escape":{n+=r.text(a);break}case"html":{n+=r.html(a);break}case"link":{n+=r.link(a);break}case"image":{n+=r.image(a);break}case"checkbox":{n+=r.checkbox(a);break}case"strong":{n+=r.strong(a);break}case"em":{n+=r.em(a);break}case"codespan":{n+=r.codespan(a);break}case"br":{n+=r.br(a);break}case"del":{n+=r.del(a);break}case"text":{n+=r.text(a);break}default:{let i='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return n}},Rs,In=(Rs=class{constructor(e){ct(this,"options");ct(this,"block");this.options=e||Ur}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?er.lex:er.lexInline}provideParser(){return this.block?tr.parse:tr.parseInline}},ct(Rs,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),ct(Rs,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Rs),kf=class{constructor(...e){ct(this,"defaults",Ho());ct(this,"options",this.setOptions);ct(this,"parse",this.parseMarkdown(!0));ct(this,"parseInline",this.parseMarkdown(!1));ct(this,"Parser",tr);ct(this,"Renderer",Os);ct(this,"TextRenderer",Jo);ct(this,"Lexer",er);ct(this,"Tokenizer",Ls);ct(this,"Hooks",In);this.use(...e)}walkTokens(e,t){let r=[];for(let n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)r=r.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,t));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);r=r.concat(this.walkTokens(a,t))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let i=s.renderer.apply(this,a);return i===!1&&(i=o.apply(this,a)),i}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),n.extensions=t),r.renderer){let s=this.defaults.renderer||new Os(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,i=r.renderer[a],c=s[a];s[a]=(...u)=>{let p=i.apply(s,u);return p===!1&&(p=c.apply(s,u)),p||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new Ls(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,i=r.tokenizer[a],c=s[a];s[a]=(...u)=>{let p=i.apply(s,u);return p===!1&&(p=c.apply(s,u)),p}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new In;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,i=r.hooks[a],c=s[a];In.passThroughHooks.has(o)?s[a]=u=>{if(this.defaults.async&&In.passThroughHooksRespectAsync.has(o))return(async()=>{let f=await i.call(s,u);return c.call(s,f)})();let p=i.call(s,u);return c.call(s,p)}:s[a]=(...u)=>{if(this.defaults.async)return(async()=>{let f=await i.apply(s,u);return f===!1&&(f=await c.apply(s,u)),f})();let p=i.apply(s,u);return p===!1&&(p=c.apply(s,u)),p}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(a){let i=[];return i.push(o.call(this,a)),s&&(i=i.concat(s.call(this,a))),i}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return er.lex(e,t??this.defaults)}parser(e,t){return tr.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,i=await(s.hooks?await s.hooks.provideLexer():e?er.lex:er.lexInline)(a,s),c=s.hooks?await s.hooks.processAllTokens(i):i;s.walkTokens&&await Promise.all(this.walkTokens(c,s.walkTokens));let u=await(s.hooks?await s.hooks.provideParser():e?tr.parse:tr.parseInline)(c,s);return s.hooks?await s.hooks.postprocess(u):u})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?er.lex:er.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let i=(s.hooks?s.hooks.provideParser():e?tr.parse:tr.parseInline)(a,s);return s.hooks&&(i=s.hooks.postprocess(i)),i}catch(a){return o(a)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+br(r.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(r);throw r}}},Br=new kf;function at(e,t){return Br.parse(e,t)}at.options=at.setOptions=function(e){return Br.setOptions(e),at.defaults=Br.defaults,Ll(at.defaults),at};at.getDefaults=Ho;at.defaults=Ur;at.use=function(...e){return Br.use(...e),at.defaults=Br.defaults,Ll(at.defaults),at};at.walkTokens=function(e,t){return Br.walkTokens(e,t)};at.parseInline=Br.parseInline;at.Parser=tr;at.parser=tr.parse;at.Renderer=Os;at.TextRenderer=Jo;at.Lexer=er;at.lexer=er.lex;at.Tokenizer=Ls;at.Hooks=In;at.parse=at;var Ub=at.options,Wb=at.setOptions,zb=at.use,Hb=at.walkTokens,Gb=at.parseInline;var Vb=tr.parse,Kb=er.lex;function Tr(e){let t=at.parse(e),r=xl.sanitize(t);return Al(r)}function hr(e,t){return d`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function ln(e){return e.loading?d`<div class="prompt-block__status">불러오는 중…</div>`:e.error?d`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Ds(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())} ${r(t.getHours())}:${r(t.getMinutes())}`}var $f={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},xf={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},Af=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Sf=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function ir(e){return!!e&&typeof e=="object"}function ea(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function Wl(e,t){let r=ea(e),n=ea(t),s=new Map;for(let i of r)s.set(i,(s.get(i)||0)+1);let o=0;for(let i of n){let c=s.get(i)||0;c>0?s.set(i,c-1):o+=1}let a=0;for(let i of s.values())a+=i;return{added:o,removed:a}}function Ef(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>ir(s)&&typeof s.text=="string"?s.text:"").join(""):ir(e)&&typeof e.text=="string"&&(t=e.text);let n=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function Tf(e){let t=String(e.name||""),r=e.input||{},n={kind:"tool",tool:t,icon:$f[t]||"\u{1F527}",input:r,expandable:!0};if((t==="Read"||t==="Write")&&(n.path=String(r.file_path||r.path||"")),t==="Write"&&(n.added=ea(r.content).length),t==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=Wl(r.old_string,r.new_string);n.added=s,n.removed=o}if(t==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,a=Array.isArray(r.edits)?r.edits:[];for(let i of a){let c=Wl(ir(i)?i.old_string:"",ir(i)?i.new_string:"");s+=c.added,o+=c.removed}n.added=s,n.removed=o}return t==="Bash"&&(n.command=String(r.command||"")),(t==="Grep"||t==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function ta(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function ra(e){let t=e.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=Af.exec(t);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:t.trim()}:Sf.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Cf(e,t){if(e.type==="assistant"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(ir(o)){if(o.type==="text"&&typeof o.text=="string")s.push(ra(o.text));else if(o.type==="thinking"){let a=ta(o.thinking);a&&s.push(a)}else if(o.type==="tool_use"){let a=Tf(o);typeof o.id=="string"&&t.set(o.id,a),s.push(a)}}return s}if(e.type==="user"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(ir(s)&&s.type==="tool_result"){let o=t.get(String(s.tool_use_id));if(o){let a=Ef(s.content);o.result=a,o.output=typeof s.content=="string"?s.content:a}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success";return[{kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""}]}return[]}function Rf(e){if(e.type==="item.completed"&&ir(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[ra(t.text)];if(t.type==="reasoning"){let r=ta(t.text);return r?[r]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function If(e){if(e.schema!=="codex-delegation-monitor-v1"||!ir(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&ir(t.item)){let r=t.item;if(typeof r.id!="string"||r.id.length===0)return[];if(t.type==="item.completed"&&r.kind==="agent_message"&&typeof r.text=="string"&&r.text.trim().length>0)return[ra(r.text)];if(t.type==="item.completed"&&r.kind==="reasoning"){let i=ta(r.text);return i?[i]:[]}if(r.kind!=="activity"||typeof r.activity!="string")return[];let n=xf[r.activity];if(!n)return[];let s="\uC2DC\uC791",o="\u2026",a={kind:"tool",tool:"",icon:o,expandable:!1};if(t.type==="item.completed"){if(r.status==="completed")s="\uC644\uB8CC",o="\u2713";else if(r.status==="failed")s="\uC2E4\uD328",o="\u2717";else return[];a.result=""}return a.tool=`${n} \xB7 ${s}`,a.icon=o,[a]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function Lf(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function zl(e){let t=[],r=new Map,n=Array.isArray(e)?e:[];for(let s of n){let o=s;if(typeof s=="string"){let i=s.trim();if(i.length===0)continue;try{o=JSON.parse(i)}catch{continue}}if(!ir(o))continue;let a=o.schema==="codex-delegation-monitor-v1"?If(o):Lf(o)?Rf(o):Cf(o,r);for(let i of a)t.push(i)}return t}var Of=5,Mf=10,Pf=/Task\s+#(\d+)/,Df=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Nf=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function Ns(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function qf(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function Ff(e){for(let t=e.length-1;t>=0;t-=1){let r=e[t];if(r.kind==="phase"||r.kind==="gate")return r.text||null}return null}function jf(e){let t=new Map,r=0;for(let s of e){if(s.kind!=="tool")continue;r+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let c=Pf.exec(s.output||s.result||""),u=String(o.activeForm||o.subject||"").trim();if(!c||u.length===0)continue;t.set(c[1],{label:u,active:o.status==="in_progress"?r:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let i=o.activeForm||o.subject;typeof i=="string"&&i.trim().length>0&&(a.label=i.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?r:0)}let n=null;for(let s of t.values())s.active>0&&(!n||s.active>n.active)&&(n=s);return n?n.label:null}function Bf(e){if(e.tool==="Bash"){let t=e.command||"";return Df.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Nf.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function Uf(e){let t=e.filter(s=>s.kind==="tool").slice(-Mf),r=new Map;t.forEach((s,o)=>{let a=Bf(s);if(!a)return;let i=r.get(a)||{count:0,last:-1};i.count+=1,i.last=o,r.set(a,i)});let n=null;for(let[s,o]of r)(!n||o.count>n.count||o.count===n.count&&o.last>n.last)&&(n={label:s,count:o.count,last:o.last});return n?n.label:null}function Wf(e){let t=Ff(e);if(t)return{text:t,guess:!1};let r=jf(e);if(r)return{text:r,guess:!1};let n=Uf(e);return n?{text:n,guess:!0}:null}function zf(e,t){if(typeof e!="number")return"";let r=Math.max(0,Math.floor((t-e)/1e3));return r<60?`${r}\uCD08 \uC804`:Dt(e,t)}function qs(e,t={}){let{transport:r,sessionLogStore:n,onClose:s}=t,o=null,a=null,i=null,c=!1,u={},p=!0,f=new Set,h=new Set,R=null,A=null,L=!1,N=!1,V=!1,K=null,W=null;function I(){L=!1,N=!1,V=!1,K=null,W=null}async function S(H){if(r){N=!0,V=!1,_e();try{let F=await Promise.resolve(r("get-attempt-prompt",{attempt_id:H}));if(o!==H)return;!F||typeof F!="object"||Array.isArray(F)?V=!0:(K=F,W=H)}catch{o===H&&(V=!0)}finally{o===H&&(N=!1,_e())}}}function D(){if(L=!L,L&&o&&W!==o){S(o);return}_e()}function k(){if(!L)return"";let H=ln({loading:N,error:V});if(H)return d`<div class="sv__prompt" data-seam="attempt-prompt">
        ${H}
      </div>`;if(!K)return"";if(K.missing)return d`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let F=Ds(K.recorded_at);return d`<div class="sv__prompt" data-seam="attempt-prompt">
      ${F?d`<div class="prompt-block__meta">${F} 발송</div>`:""}
      ${typeof K.task_prompt=="string"?hr("\uACFC\uC5C5 (user)",K.task_prompt):""}
      ${typeof K.system_prompt=="string"?hr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",K.system_prompt):""}
    </div>`}function B(){if(!i||!n)return[];let H=n.get(i);return zl(H?H.lines:[])}function oe(){if(!i||!n)return null;let H=n.get(i),F=H?H.last_event_at:null;return typeof F=="number"?F:null}function de(){return u.status==="running"}function te(){if(de()&&o){A||(A=setInterval(()=>_e(),1e3));return}re()}function re(){A&&(clearInterval(A),A=null)}function Ie(H){let F=[],se=0;for(;se<H.length;){let Te=H[se];if(Te.kind==="tool"){let je=se;for(;je<H.length&&H[je].kind==="tool"&&H[je].tool===Te.tool;)je+=1;if(je-se>=Of&&!h.has(se)){F.push({kind:"group",idx:se,tool:Te.tool||"",lines:H.slice(se,je).map((We,Se)=>({idx:se+Se,line:We}))}),se=je;continue}}F.push({kind:"line",idx:se,line:Te}),se+=1}return F}function rt(H){for(let F=H.length-1;F>=0;F-=1){let se=H[F];if(se.kind==="result"||se.kind==="error")return null;if(se.kind==="tool"&&!Object.hasOwn(se,"result"))return se}return null}function De(H){for(let F=H.length-1;F>=0;F-=1)if(H[F].kind==="thinking")return H[F];return null}function ot(H,F){if(F.kind==="gate")return d`<div class="sv__gate">${F.text}</div>`;if(F.kind==="phase")return d`<div class="sv__phase">${F.text}</div>`;if(F.kind==="result")return d`<div
        class="sv__result${F.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${F.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${Tr(F.text||(F.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(F.kind==="thinking"){let se=f.has(H);return d`<div
        class="sv__think${se?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Ae(H)}
      >
        <span class="sv__think-line">💭 ${Ns(F.text)}</span>
        ${se?d`<pre class="sv__think-expand">${F.text}</pre>`:""}
      </div>`}if(F.kind==="error")return d`<div class="sv__error">⛔ ${F.text}</div>`;if(F.kind==="blocker")return d`<div class="sv__error">⛔ ${F.text}</div>`;if(F.kind==="tool"){let se=f.has(H),Te=F.tool==="Bash"?qf(F.command):0,je=F.tool==="Bash"?Te>1?Ns(F.command):F.command:F.path||F.command||"";return d`<div
        class="sv__tool${se?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>Ae(H)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${F.icon}</span>
          <span class="sv__tool-name">${F.tool}</span>
          ${je?d`<span class="sv__tool-detail">${je}</span>`:""}
          ${Te>1?d`<span class="sv__tool-more">⋯ ${Te}줄</span>`:""}
          ${typeof F.added=="number"?d`<span class="sv__diff-add">+${F.added}</span>`:""}
          ${typeof F.removed=="number"?d`<span class="sv__diff-del">−${F.removed}</span>`:""}
          ${F.result?d`<span class="sv__tool-ok">→ ${F.result}</span>`:""}
        </span>
        ${se?d`<pre class="sv__tool-expand">${it(F)}</pre>`:""}
      </div>`}return d`<div class="sv__as">${Tr(F.text||"")}</div>`}function it(H){let F=[];if(H.tool==="Bash"&&typeof H.command=="string"&&H.command.length>0)F.push(H.command);else if(H.input!==void 0)try{F.push(`input: ${JSON.stringify(H.input,null,2)}`)}catch{}return typeof H.output=="string"&&H.output.length>0&&F.push(`output:
${H.output}`),F.join(`

`)}function Ve(){if(!o)return d``;let H=B(),F=(a?[u.model,u.effort]:[u.runner,u.model,u.effort]).filter(Boolean).join(" \xB7 "),se=u.session_id||"",Te=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${p?"ON":"OFF"}`,je=de(),We=je?zf(oe(),Date.now()):"",Se=je?rt(H):null,lt=je?De(H):null,Ye=Wf(H);return d`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${a?u.role||"":o}</span>
        ${Ye?d`<span
              class="sv__stage${Ye.guess?" sv__stage--guess":""}"
              title=${Ye.text}
              >${Ye.text}</span
            >`:""}
        ${je?d`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${We?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${We}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${We?d`<span class="sv__live-ago">${We}</span>`:""}</span
            >`:""}
        ${se?d`<button
              type="button"
              class="sv__session"
              title=${se}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${se}`}
              @click=${()=>ve(se)}
            >
              ⧉ ${se.slice(0,8)}
            </button>`:""}
        ${F?d`<span class="sv__meta">${F}</span>`:""}
        ${u.worktree?d`<span class="sv__wt" title=${u.worktree}
              >${u.worktree}</span
            >`:""}
        ${a||c?"":d`<button
              type="button"
              class="sv__prompt-toggle${L?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${L?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${D}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${p?" sv__follow--on":""}"
          aria-pressed=${p?"true":"false"}
          aria-label=${Te}
          @click=${Ne}
        >
          <span class="sv__follow-full">⇣ ${Te}</span>
          <span class="sv__follow-short">⇣ ${p?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>tt()}
        >
          ✕
        </button>
      </div>
      ${a||c?"":k()}
      <div class="sv__body">
        ${H.length===0?d`<div class="sv__empty">세션 로그 없음</div>`:Ie(H).map(z=>z.kind==="group"?be(z):ot(z.idx,z.line))}
      </div>
      ${Se||lt?d`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${Se?d`<span class="sv__now-icon">${Se.icon}</span>
                  <span class="sv__now-name">${Se.tool}</span>
                  <span class="sv__now-detail"
                    >${Se.tool==="Bash"?Ns(Se.command):Se.path||Se.command||""}</span
                  >`:""}
            ${lt?d`<span class="sv__now-think"
                  >💭 ${Ns(lt.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function be(H){return d`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>Le(H.idx)}
    >
      <span class="sv__group-icon">${H.lines[0].line.icon}</span>
      <span class="sv__group-name">${H.tool}</span>
      <span class="sv__group-count">${H.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function Le(H){h.add(H),_e()}function _e(){Qe(Ve(),e),te(),p&&ye()}function ye(){let H=e.querySelector(".sv__body");H&&(H.scrollTop=H.scrollHeight)}function Ae(H){f.has(H)?f.delete(H):f.add(H),_e()}function Ne(){p=!p,_e()}function ve(H){Xt(H).then(F=>{F?ie("\uBCF5\uC0AC\uB428","success",1200):ie("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function Fe(H){!o||!H||(u={...u,...H},_e())}function Ke(H){let F=H.target;if(!F||!F.classList||!F.classList.contains("sv__body"))return;!(F.scrollHeight-F.scrollTop-F.clientHeight<=4)&&p&&(p=!1,_e())}e.addEventListener("scroll",Ke,!0);function xe(H){let F=H&&H.attempt_id;if(!F)return;let se=i;o=F,a=typeof H.launch_id=="string"&&H.launch_id.length>0?H.launch_id:null,i=a?`session-log:${o}:${a}`:`session-log:${o}`,r&&se&&se!==i&&Promise.resolve(r("unsubscribe-session-log",{id:se})).catch(()=>{}),u=H.meta||{},c=H.hide_prompt===!0,p=!0,f.clear(),h.clear(),I(),!R&&n&&(R=n.subscribe(_e)),r&&Promise.resolve(r("subscribe-session-log",{id:i,attempt_id:o,...a?{launch_id:a}:{}})).catch(()=>{}),_e()}function tt(){let H=i;o=null,a=null,i=null,c=!1,f.clear(),h.clear(),I(),re(),r&&H&&Promise.resolve(r("unsubscribe-session-log",{id:H})).catch(()=>{}),Qe(d``,e),s&&s()}return{open:xe,updateMeta:Fe,close:tt,isOpen(){return o!==null},destroy(){re(),R&&(R(),R=null),e.removeEventListener("scroll",Ke,!0),o=null,a=null,i=null,c=!1,Qe(d``,e)}}}function Mn(e){let t=e&&typeof e=="object"?e:{},r=t.metadata&&typeof t.metadata=="object"?t.metadata:{},n=Hl(t.spec_id),s=Hl(r.spec_id);return n?{path:n,source:"native",conflict:s.length>0&&s!==n}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function Hl(e){return typeof e=="string"?e.trim():""}function Hf(e){return["plan_review","plan_approval","plan_check"].some(t=>{let r=e[t];return typeof r=="string"&&r.trim().length>0})}function Gf(e){let t=e&&e.metadata||{},r=Mn(e),n=[];return r.path&&n.push({kind:"spec",path:r.path,missing_state:null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&n.push({kind:"plan",path:t.plan_path.trim(),missing_state:Hf(t)?null:"plan_pending"}),n}function Gl(e,t){let r=Gf(e);return d`
    <div class="detail-section-label">Artifacts</div>
    ${r.length===0?d`<div class="detail-empty">산출물 없음</div>`:d`
          ${r.map(n=>d`<div class="detail-art">
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
  `}var Vf="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",Kf=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,Yf=/^\*\*결론\*\* — (.+)$/;function Fs(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==Vf)return null;let r=Kf.exec(t[1]||"");if(!r)return null;let n=r[1].split(" ")[0],s=r[2],o=r[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let i=a<t.length?Yf.exec(t[a]):null,c=i?i[1].replace(/\s+/g," ").trim():"",u=i?a+1:a;return{lane:n,identifier:s,timestamp:o,conclusion:c,body:t.slice(u).join(`
`).trim()}}var Vl=20;function Kl(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let r=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${r}-${n} ${s}:${o}`}function Zf(e){return e.length>Vl?`${e.slice(0,Vl)}\u2026`:e}function Xf(e,t,r,n){let s=`${t.lane} ${Zf(t.identifier)}`;return d`<div class="detail-report">
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
        <span class="detail-report__time">${Kl(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${n&&t.body.length>0?d`<div class="detail-report__body">
          ${Tr(t.body)}
        </div>`:""}
  </div>`}function Qf(e){return d`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${Kl(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${Tr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function Yl(e,t={},r={}){let n=Array.isArray(e)?e.filter(Boolean):[],s=r.expanded||new Set,o=typeof r.draft=="string"?r.draft:"",a=r.sending===!0,i=n.slice().sort((c,u)=>String(u.created_at||"").localeCompare(String(c.created_at||"")));return d`
    <div class="detail-section-label">댓글 (${n.length})</div>
    ${r.error?d`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:i.length===0?d`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:d`<div class="detail-comments" data-seam="comments">
            ${i.map(c=>{let u=Fs(typeof c.text=="string"?c.text:"");return u?Xf(c,u,t,s.has(c.id)):Qf(c)})}
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
  `}var{I:Eh}=hi;var Zl=e=>e.strings===void 0;var Jf={},Xl=(e,t=Jf)=>e._$AH=t;var Wr=Ts(class extends an{constructor(e){if(super(e),e.type!==gr.PROPERTY&&e.type!==gr.ATTRIBUTE&&e.type!==gr.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Zl(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===Bt||t===gt)return t;let r=e.element,n=e.name;if(e.type===gr.PROPERTY){if(t===r[n])return Bt}else if(e.type===gr.BOOLEAN_ATTRIBUTE){if(!!t===r.hasAttribute(n))return Bt}else if(e.type===gr.ATTRIBUTE&&r.getAttribute(n)===t+"")return Bt;return Xl(e),t}});var js=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],Cr=["orchestration_model","orchestration_effort","orchestration_speed"],Ql=[...js,...Cr],Bs=["delegated","main"],Us=["inherit","claude","codex"],Pn=["default","fast"],Dn=["standard","fast_track"],Nn=["codex","opus","fable","self","skip"],Ws=["codex","fable","skip"],zs=["low","medium","high","xhigh"],lr="auto";function yr(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Jl(e){if(!yr(e)||!yr(e.runners))return[];let t=[];for(let[r,n]of Object.entries(e.runners))yr(n)&&yr(n.models)&&t.push([r,Object.keys(n.models)]);return t}function ec(e){return e?.impl_dispatch==="main"}function Hs(e,t){let r=Jl(e),n=t&&t!=="inherit"?r.filter(([s])=>s===t):r;return[lr,...n.flatMap(([,s])=>s)]}function cn(e,t,r){if(!yr(e)||!yr(e.runners))return[lr];let n=[];for(let[s,o]of Object.entries(e.runners))if(!(!yr(o)||!yr(o.models))&&!(t&&t!=="inherit"&&s!==t))for(let[a,i]of Object.entries(o.models)){if(r&&r!==lr&&a!==r)continue;let c=yr(i)?i.efforts:null;if(Array.isArray(c))for(let u of c)typeof u=="string"&&!n.includes(u)&&n.push(u)}return[lr,...n]}function Gs(e,t){let r=Jl(e);return(t?r.filter(([s])=>s===t):r).flatMap(([,s])=>s)}function na(e,t,r,n,s){return ks({key:e,choices:t,layer:"global",global:r,execution_defaults:n,runner_catalog:s})}function tc(e,t){let r={};for(let n of js){let s=e?.[n],o=t?.[n];s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}function rc(e,t){let r={};for(let n of Cr){let s=e?.[n]??null,o=t?.[n]??null;s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}var sa=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Cr]}],oa={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},nc={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function aa(e,t,r,n,s,o=null){let a=rn({pin:t,global:r,execution_defaults:n,runner_catalog:s,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:o});return e.map(i=>({key:i,...a[i]}))}function sc(e,t,r,n,s,o=null){let a={pin:0,global:0,base:0};for(let i of aa(e,t,r,n,s,o))a[i.source]+=1;return a}function oc(e,t,r){return{id:e,key:t,value:typeof r=="string"?r:""}}function ac(e,t,r){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:r}}var qh=[...js,...Cr];var e_=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review"},{id:"impl",label:"\uAD6C\uD604",receipt:null},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review"},{id:"pr",label:"PR",receipt:null}],t_={pin:"pin",global:"global",base:"base"};function r_(e){return d`<span
    class=${`detail-layer-rail detail-layer-rail--${t_[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function n_(e,t,r){switch(e){case"workflow_mode":return Dn;case"spec_review_model":case"impl_review_model":return Nn;case"plan_review_model":return Ws;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return zs;case"impl_dispatch":return Bs;case"impl_runtime":return Us;case"impl_model":return Hs(r,t.impl_runtime);case"impl_effort":return cn(r,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return Pn;case"orchestration_model":return Gs(r,null);case"orchestration_effort":return cn(r,void 0,t.orchestration_model||lr).filter(n=>n!==lr);default:return[]}}function s_(e,t){return d`<div class="detail-effective__row" data-key=${e.key}>
    ${r_(e.source)}
    <span class="detail-effective__k"
      >${oa[e.key]||e.key}</span
    >
    <span
      class=${`detail-effective__v${e.source==="base"?" detail-effective__v--dim":""}`}
      title=${e.full_value||""}
      >${e.display}</span
    >
    <span
      class=${`detail-effective__badge detail-effective__badge--${e.source}`}
      >${nc[e.source]}</span
    >
    ${t.expanded?d`<select
          class="detail-effective__edit"
          data-edit-key=${e.key}
          aria-label=${`${oa[e.key]||e.key} \uD3B8\uC9D1`}
          ?disabled=${e.resolution==="not_applicable"}
          @change=${r=>{let n=String(r.target.value);t.onEdit(e.key,n.length===0?null:n)}}
        >
          <option
            value=""
            title=${t.default_full_value||""}
            ?selected=${e.source!=="pin"}
          >
            ${t.default_label}
          </option>
          ${t.options.map(r=>d`<option
                value=${r.value}
                title=${r.full_value||""}
                ?selected=${e.source==="pin"&&e.value===r.value}
              >
                ${r.label}
              </option>`)}
        </select>`:""}
  </div>`}function ic(e,t){let r=sa.flatMap(c=>c.keys),n=aa(r,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=sc(r,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Object.fromEntries(n.map(c=>[c.key,c])),a=Object.fromEntries(n.filter(c=>c.value!==null).map(c=>[c.key,c.value])),i=n.filter(c=>c.full_value&&c.display!==c.full_value).map(c=>c.full_value).join(" \xB7 ");return d`<details
    class=${`detail-effective${e.expanded?" detail-effective--open":""}`}
    data-seam="effective-settings"
    ?open=${e.expanded}
    @toggle=${c=>t.onToggle(c.currentTarget.open)}
  >
    <summary
      class="detail-effective__head"
      data-seam="effective-settings-toggle"
      @click=${c=>{c.preventDefault();let u=c.currentTarget.parentElement;t.onToggle(!u.open)}}
    >
      <span class="detail-effective__t">유효 실행 설정</span>
      <span class="detail-effective__summary" title=${i}
        >${o_(o)}</span
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
    ${e.expanded?d`<div class="detail-effective__body">
          ${sa.map(c=>d`
              <div class="detail-effective__subhead">${c.label}</div>
              ${n.filter(u=>c.keys.includes(u.key)).map(u=>{let p=ks({key:u.key,choices:n_(u.key,a,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,controller_runtime:e.controller_runtime||null});return s_(u,{expanded:e.expanded,options:p.options,default_label:p.unset_label,default_full_value:p.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="실행 프리셋"
              .value=${Wr(e.preset_id)}
              ?disabled=${e.preset_busy}
              @change=${c=>t.onPresetSelect(String(c.target.value))}
            >
              <option value="" ?selected=${e.preset_id===""}>
                실행 프리셋…
              </option>
              ${e.presets.map(c=>d`<option
                    value=${c.id}
                    ?selected=${c.id===e.preset_id}
                  >
                    ${c.name}${c.compatible===!1?" (\uBE44\uD638\uD658)":""}
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
            ${(e.skipped_orchestration_keys||[]).length>0?d`<span
                  class="detail-effective__hint"
                  data-preset-skip-notice
                  >오케스트레이션 3키는 Bead에 핀할 수 없어 건너뜀</span
                >`:""}
          </div>
        </div>`:""}
  </details>`}function o_(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let r=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${r}`)}for(let r of["impl_model","impl_effort","impl_speed"])e[r]?.resolution!=="not_applicable"&&t.push(e[r]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function lc(e){let t=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},n=r.stages||{},s=r.route||t.route||null,o=typeof t.pr_url=="string"?t.pr_url:"",a=typeof t.exec_receipt=="string"?t.exec_receipt:"",i=ys(r.planned_execution,r.exec_receipt);return d`<section class="detail-summary" data-seam="detail-summary">
    <div class="detail-summary__chips">
      <span class="detail-summary__chip detail-summary__chip--status"
        >${e?.status||"\u2014"}</span
      >
      ${s?d`<span class="detail-summary__chip detail-summary__chip--route"
            >${s}</span
          >`:""}
      ${t.workflow_mode==="fast_track"?d`<span class="detail-summary__chip detail-summary__chip--mode"
            >fast_track</span
          >`:""}
      ${o?d`<a
            class="detail-summary__chip detail-summary__chip--pr"
            href=${o}
            target="_blank"
            rel="noreferrer"
            >PR</a
          >`:""}
      ${i?d`<span
            class="detail-summary__chip detail-summary__chip--planned ctl-chip--planned"
            data-kind=${i.kind}
            title=${i.title}
            >${i.label}</span
          >`:""}
      ${a?d`<span
            class="detail-summary__chip detail-summary__chip--receipt"
            title=${a}
            >${a.split("@")[0]}</span
          >`:""}
    </div>
    <div class="detail-summary__gates">
      ${e_.map(c=>{let u=c.receipt&&typeof t[c.receipt]=="string"?String(t[c.receipt]):"",p=n[c.id],f=u.length>0||p?.fill==="full",h=!f&&p?.fill==="dim",R=p?.stale===!0;return d`<span
          class=${`detail-summary__gate${f?" detail-summary__gate--on":""}${h?" detail-summary__gate--current":""}${R?" detail-summary__gate--stale":""}`}
          data-gate=${c.id}
        >
          <span class="detail-summary__gate-pill">${c.label}</span>
          ${u?d`<span class="detail-summary__gate-sha"
                >${u.split("@")[1]?.slice(0,7)||""}</span
              >`:""}
        </span>`})}
    </div>
  </section>`}var cc=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function qn(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Vs(e){if(!qn(e)||!qn(e.runners))return null;let t=Object.entries(e.runners).filter(([,r])=>qn(r)&&qn(r.models));return t.length>0?t:null}function ia(e,t){let r=Vs(e);if(!r||!t)return null;for(let[n,s]of r)if(Object.hasOwn(s.models,t))return n;return null}function dc(e,t){return qn(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function uc(e,t){let r=Vs(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return dc(n,n.models[t]);return[]}function a_(e){let t=Vs(e);if(!t)return[];let r=[];for(let[,n]of t)for(let s of Object.values(n.models))for(let o of dc(n,s))r.includes(o)||r.push(o);return r}function i_(e,t){if(!t)return a_(e);let n=Vs(e)?.find(([o])=>o===t)?.[1];if(!n)return[];let s=[];for(let o of Object.keys(n.models))for(let a of uc(e,o))s.includes(a)||s.push(a);return s}function pc(e,t,r){let n={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=n.impl_runtime==="inherit"?r:n.impl_runtime==="claude"||n.impl_runtime==="codex"?n.impl_runtime:null;if(n.impl_runtime==="inherit"&&!s)return n.impl_model="",n.impl_effort="",n;let o=ia(t,n.impl_model);if(n.impl_model&&(!s||o!==s))return n.impl_model="",n.impl_effort="",n;let a=n.impl_model?uc(t,n.impl_model):i_(t,s);return n.impl_effort&&a.length>0&&!a.includes(n.impl_effort)&&(n.impl_effort=""),n}function l_(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function fc(e,t){let r=t.getWorkspacePath,n=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",i="";function c(A){A.key==="Escape"&&s&&(A.preventDefault(),h())}document.addEventListener("keydown",c);function u(){return s?d`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>h()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${l_(s)}</span
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
            ${o==="loading"?d`<div class="mv__status">불러오는 중…</div>`:o==="pending"?d`<div class="mv__status">${i}</div>`:o==="error"?d`<div class="mv__status mv__status--error">
                      ${i||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:Tr(a)}
          </div>
        </div>
      </div>
    `:d``}function p(){Qe(u(),e)}async function f(A,L={}){s=A,o="loading",a="",i="",p();let N=r?r():"";if(!N){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",p();return}if(!n){o="error",i="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",p();return}let V="/api/doc?workspace="+encodeURIComponent(N)+"&path="+encodeURIComponent(A);try{let K=await n(V),W=await K.json().catch(()=>({}));if(!K.ok||!W||W.ok!==!0){if(W?.error==="not_found"&&L.missing_state==="plan_pending"){o="pending",i="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",p();return}o="error",i="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(W&&W.error||K.status)+")",p();return}a=String(W.content||""),o="ready",p()}catch{o="error",i="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",p()}}function h(){s=null,Qe(d``,e)}function R(){document.removeEventListener("keydown",c),h()}return{open:f,close:h,destroy:R}}var c_=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],mc="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Ks=["implementation","review-consult"],d_=["running","done","failed","interrupted"],u_={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function p_(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function f_(e){let t=$t(e);if(t.length>0)return t.map(s=>d`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let r=sn(e);if(!r||!e)return"";let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return d`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${r.replace(/^τ /,"\u03C4 \uCD1D ")}${n}</span
    >${e.replayed?d`<span class="detail-usage-partial" title=${mc}
          >부분 집계</span
        >`:""}`}function _c(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function la(e){if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?ca(t):""}function __(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e;return typeof t.launch_id!="string"||t.launch_id.length===0||t.provider!=="codex"||!Ks.includes(t.role)||typeof t.model!="string"||t.model.length===0||!(!("effort"in t)||t.effort===null||typeof t.effort=="string"&&t.effort.trim().length>0)||typeof t.session_id!="string"||t.session_id.length===0||!d_.includes(t.status)||typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))||!(t.turn_id===null||typeof t.turn_id=="string")?null:t}function m_(e,t){let n=$t({providers:{codex:{subtotal:t.subtotal,breakdown:t.usage,...t.replayed?{replayed:!0}:{}}},roles:{}})[0];return d`<div class="detail-session__leg detail-session__usage-detail">
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${[t.provider,t.model,t.effort].filter(Boolean).join(" \xB7 ")}</span
    >
    ${t.session_id?d`<span
          class="detail-session__leg-sid detail-session__sid"
          title=${t.session_id}
          >${t.session_id.slice(0,8)}</span
        >`:""}
    ${la(t.completed_at)?d`<span class="detail-session__leg-time detail-session__time"
          >${la(t.completed_at)}</span
        >`:""}
    ${n?d`<span class="detail-session__usage" title=${n.tooltip}
          >${n.label}</span
        >`:""}
  </div>`}function g_(e,t,r,n){let s=e.status==="running"?null:t,a=(s?$t({providers:{codex:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],i=e.status==="running"?ca(e.last_event_at):s?la(s.completed_at):"";return d`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>n.onOpenDelegation&&n.onOpenDelegation(r,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${u_[e.status]}</span
    >
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e.role}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${["codex",e.model,e.effort].filter(Boolean).join(" \xB7 ")}</span
    >
    <span
      class="detail-session__leg-sid detail-session__sid"
      title=${e.session_id}
      >${e.session_id.slice(0,8)}</span
    >
    ${i?d`<span class="detail-session__leg-time detail-session__time"
          >${i}</span
        >`:""}
    ${a?d`<span class="detail-session__usage" title=${a.tooltip}
          >${a.label}</span
        >`:""}
  </button>`}function b_(e,t){return e.role===t.role&&e.model===t.model&&e.session_id===t.session_id}function h_(e,t,r){let n=[],s=new Set,o=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let p of o){let f=__(p);!f||s.has(f.launch_id)||(s.add(f.launch_id),n.push(f))}n.sort((p,f)=>p.started_at-f.started_at);let a={implementation:[],"review-consult":[]};if(t)for(let p of Ks){let f=t.roles[p]?.codex;a[p]=f?[...f.legs]:[]}let i=Ks.flatMap(p=>a[p]),c=new Set,u=[];for(let p of Ks){for(let f of n.filter(h=>h.role===p)){let h=i.find(R=>R.receipt_id===f.launch_id)||null;h&&!b_(f,h)||(h&&c.add(h.receipt_id),u.push(g_(f,h,e.attempt_id,r)))}for(let f of a[p])c.has(f.receipt_id)||u.push(m_(p,f))}return u}function y_(e,t){let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,n=[...c_,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return d`<div class="detail-session__usage-detail">
    ${n.map(s=>d`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${p_(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${r===null?"":d`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${r.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?d`<span class="detail-session__usage-note">${mc}</span>`:""}
  </div>`}var v_={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function ca(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=String(t.getHours()).padStart(2,"0"),n=String(t.getMinutes()).padStart(2,"0");return`${r}:${n}`}function w_(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,n])=>typeof n=="string"&&n.length>0).map(([n,s])=>`${n}=${s}`).join(" \xB7 "):"",r=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return d`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${r}</span>
    ${t?d`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function gc(e,t={},r={}){let n=Array.isArray(e)?e:[],s=r.expanded||new Set;if(n.length===0)return d`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let u of n)u&&typeof u.resumed_from=="string"&&u.resumed_from.length>0&&o.add(u.resumed_from);let a=u=>{if(!(u.status==="failed"||u.status==="orphaned"))return"";let f=typeof u.session_id=="string"&&u.session_id.length>0,h=o.has(u.attempt_id),R=f&&!h,A=f?h?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return d`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${u.attempt_id}
      ?disabled=${!R}
      title=${A}
      @click=${L=>{L.stopPropagation(),R&&t.onResume&&t.onResume(u.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},i=u=>{if(!(u.status==="failed"||u.status==="orphaned")||typeof u.cause!="string"||u.cause==="")return"";let f=u.cause_detail,h=f&&typeof f.reason=="string"&&f.reason.length>0?typeof f.command=="string"&&f.command.length>0?`${f.reason} \xB7 ${f.command}`:f.reason:u.cause;return d`<div class="detail-session__cause" title=${h}>
      ${u.cause}
    </div>`},c=u=>{let p=_c(Lo(u));if($t(p).length===0&&!sn(u.usage))return"";let f=s.has(u.attempt_id);return d`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${u.attempt_id}
      aria-expanded=${f?"true":"false"}
      title=${f?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${h=>{h.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(u.attempt_id)}}
    >
      τ 자세히
    </button>`};return d`
    <div class="detail-section-label">
      세션 이력${f_(r.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${n.map(u=>{let p=Lo(u),f=_c(p),h=$t(f);return d`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${u.status||"unknown"}"
            data-attempt-id=${u.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(u.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${v_[u.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${u.attempt_id}</span>
            ${Sr(u)?d`<span
                  class="detail-session__resumed"
                  title=${Sr(u)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${ar(u)}</span>
            ${h.length>0?d`<span class="detail-session__role">orchestrator</span>`:""}
            ${u.session_id?d`<span class="detail-session__sid" title=${u.session_id}
                  >${String(u.session_id).slice(0,8)}</span
                >`:""}
            ${h.length>0?h.map(R=>d`<span
                      class="detail-session__usage"
                      title=${R.tooltip}
                      >${R.label}</span
                    >`):sn(u.usage)?d`<span class="detail-session__usage"
                    >${sn(u.usage)}</span
                  >`:""}
            <span class="detail-session__time">${ca(u.started_at)}</span>
          </button>
          ${c(u)} ${a(u)} ${i(u)} ${w_(u)}
          ${s.has(u.attempt_id)&&u.usage?y_(u.usage,u.runner==="codex"?"codex":"claude"):""}
          ${h_(u,p,t)}
        </div>`})}
    </div>
  `}function bc(e,t={}){return d`
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
    ${e.expanded?d`<div class="detail-prompt" data-seam="task-prompt">
          ${k_(e)}
        </div>`:""}
  `}function k_(e){let t=ln(e);if(t)return t;let r=e.data;if(!r)return"";if(r.missing)return d`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof r.default_task_prompt=="string"?hr("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",r.default_task_prompt):""}`;let n=Ds(r.recorded_at);return d`<div class="detail-prompt__meta">
      ${r.attempt_id}${n?` \xB7 ${n}`:""}
    </div>
    ${typeof r.task_prompt=="string"?hr("\uACFC\uC5C5 (user)",r.task_prompt):""}
    ${typeof r.system_prompt=="string"?hr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",r.system_prompt):""}`}var $_=["open","in_progress","deferred","resolved","closed"],x_=[0,1,2,3,4];function hc(e,t){let r=t.issueStores,n=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,i=t.execPresetStore,c=t.sessionLogStore,u=null,p=null,f={},h="",R=!1,A=[],L=!1,N={},V=!1,K=!1,W="",I="",S="";function D(){V=!1,K=!1,W="",I="",S=""}let k=[],B=null,oe=null,de=!1,te="",re=!1,Ie=0,rt=new Set;function De(){k=[],B=null,oe=null,de=!1,te="",re=!1,Ie+=1,rt.clear()}async function ot(m){if(!s)return;let O=++Ie;try{let T=await Promise.resolve(s("get-comments",{id:m}));if(O!==Ie||m!==u)return;k=Array.isArray(T)?T:[],de=!1}catch{if(O!==Ie||m!==u)return;de=!0}v()}function it(){if(!s||!u)return;let m=p&&typeof p.comment_count=="number"?p.comment_count:null;if(B!==u){B=u,oe=m,ot(u);return}m!==null&&m!==oe&&(oe=m,ot(u))}function Ve(m){rt.has(m)?rt.delete(m):rt.add(m),v()}function be(m){let O=te.trim().length===0;te=m,O!==(m.trim().length===0)&&v()}async function Le(){let m=te.trim();if(!s||!u||m.length===0||re)return;let O=u;re=!0,v();let T=!1;try{let ee=await Promise.resolve(s("add-comment",{id:O,text:m}));Array.isArray(ee)&&ee.length>0&&(T=!0,O===u&&(k=ee,de=!1,te="",oe=ee.length))}catch{T=!1}T||ie("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),O===u&&(re=!1),v()}let _e={onToggle:Ve,onDraftInput:be,onSubmit:Le},ye=document.createElement("div");ye.className="md-viewer-root",document.body.appendChild(ye);let Ae=fc(ye,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),Ne=document.createElement("div");Ne.className="session-log-root",document.body.appendChild(Ne);let ve=qs(Ne,{transport:s?(m,O)=>Promise.resolve(s(m,O)):void 0,sessionLogStore:c}),Fe=!1,Ke=!1,xe=!1,tt=null,H=null,F=0;function se(m){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${m}`}function Te(){Fe=!1,Ke=!1,xe=!1,tt=null,H=null,F+=1}async function je(m){if(!s)return;let O=++F;Ke=!0,xe=!1,v();try{let T=await Promise.resolve(s("get-bead-prompt",{bead_id:m}));if(O!==F)return;!T||typeof T!="object"||Array.isArray(T)?xe=!0:(tt=T,H=se(m))}catch{O===F&&(xe=!0)}finally{O===F&&(Ke=!1,v())}}function We(){if(Fe=!Fe,Fe&&u&&H!==se(u)){tt=null,je(u);return}v()}function Se(){if(!a||!u)return[];let m=a.get();return(m&&m.attempts?Object.values(m.attempts):[]).filter(T=>T&&T.bead_id===u).sort((T,ee)=>(ee.started_at||0)-(T.started_at||0)).map(T=>({attempt_id:T.attempt_id,bead_id:T.bead_id,status:T.status,started_at:typeof T.started_at=="number"?T.started_at:null,runner:T.runner||null,model:T.model||null,effort:T.effort||T.observed_effort||null,speed:T.speed||null,session_id:T.session_id||null,resumed_from:T.resumed_from||null,continuation_mode:T.continuation_mode||null,dismissed_at:typeof T.dismissed_at=="number"?T.dismissed_at:null,cause:typeof T.cause=="string"?T.cause:null,cause_detail:T.cause_detail||null,exec_default_preset_id:typeof T.exec_default_preset_id=="string"?T.exec_default_preset_id:null,exec_default_preset_revision:typeof T.exec_default_preset_revision=="number"?T.exec_default_preset_revision:null,exec_values:T.exec_values&&typeof T.exec_values=="object"?T.exec_values:null,usage:T.usage||null,usage_legs:Array.isArray(T.usage_legs)?T.usage_legs:[],delegation_sessions:Array.isArray(T.delegation_sessions)?T.delegation_sessions:[]}))}function lt(){if(!a||!u)return null;let m=a.get();return Wt(m&&m.attempts||{},u)}let Ye=new Set;function z(m){Ye.has(m)?Ye.delete(m):Ye.add(m),v()}function J(m){let O=a?a.get():null,T=O&&O.attempts?O.attempts[m]:null;ve.open({attempt_id:m,meta:T?{runner:T.runner||void 0,model:T.model||void 0,effort:T.effort||void 0,status:T.status||void 0,session_id:T.session_id||void 0}:{}})}function Ce(m,O){let T=a?a.get():null,ee=T&&T.attempts?T.attempts[m]:null,Ge=(ee&&Array.isArray(ee.delegation_sessions)?ee.delegation_sessions:[]).find(Xe=>Xe&&typeof Xe=="object"&&Xe.launch_id===O);Ge&&ve.open({attempt_id:m,launch_id:O,meta:{runner:"codex",role:Ge.role,model:Ge.model,effort:Ge.effort,session_id:Ge.session_id,status:Ge.status}})}async function Be(m){if(!s||!m)return;let O=await nn();if(O===null)return;let T=()=>{let Xe=a?a.get():null;return Xe&&typeof Xe.revision=="number"?Xe.revision:0},ee=async(Xe={},Me=T())=>await s("worker-attempt-resume",{attempt_id:m,expected_revision:Me,...O!==""?{instructions:O}:{},...Xe}),qe=Xe=>{Xe?.queue&&a?.set&&a.set(Xe.queue)},Ge=await ee();if(qe(Ge),Ge&&Ge.conflict){let Xe=Ge.queue&&typeof Ge.queue.revision=="number"?Ge.queue.revision:T();Ge=await ee({},Xe),qe(Ge)}Ge=await fr(Ge,(Xe,Me)=>ee({continuation:Xe,decision_token:Me}),{onResult:qe,refresh:()=>ee()}),Ge&&Ge.resumed===!1&&!Ge.conflict&&Ge.reason&&ie(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${Ge.reason}`,"error",2400)}let ue={onOpen:J,onOpenDelegation:Ce,onResume:Be,onToggleUsage:z};function g(){let m=a?a.get():null,O={...N};for(let T of["orchestration_model","orchestration_effort","orchestration_speed"]){let ee=m&&m[T];typeof ee=="string"&&(O[T]=ee)}return O}async function $(){if(s){try{let m=await Promise.resolve(s("get-session-defaults",{}));N=m&&m.values&&typeof m.values=="object"?m.values:{}}catch{N={}}v()}}function x(){let m=a?a.get():null;return m&&m.runner_catalog||null}function M(){let m=a?a.get():null;return m&&typeof m.execution_defaults=="object"?m.execution_defaults:null}function G(){let m=p?.metadata&&typeof p.metadata=="object"?p.metadata:{},T=rn({pin:{...m,...f},global:g(),execution_defaults:M(),runner_catalog:x(),route:typeof m.route=="string"?m.route:null}).orchestration_model.value||"";return ia(x(),T)}function Y(){let m=i?i.get():null;return!m||typeof m.revision!="number"?null:{revision:m.revision,presets:Array.isArray(m.presets)?m.presets:[]}}function ne(m){return m?.compatible===!1}function ce(m){i&&m&&typeof m.revision=="number"&&Array.isArray(m.presets)&&i.set({revision:m.revision,presets:m.presets})}async function he(){let m=Y(),O=m?.presets.find(T=>T.id===h);if(!(!s||!u||!m||!O||ne(O)||R)){R=!0,A=[],v();try{let T=await Promise.resolve(s("apply-impl-preset",ac(u,O.id,m.revision)));if(T&&T.conflict){ce(T),ie("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let ee=T&&Array.isArray(T.issue)?T.issue[0]:T?.issue;if(T&&T.applied&&ee&&typeof ee=="object"){p=ee,A=Array.isArray(T.skipped_orchestration_keys)?T.skipped_orchestration_keys.filter(qe=>typeof qe=="string"):[];for(let qe of cc)delete f[qe];ie(A.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}T&&T.error==="bd_readback_failed"?ie("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ie("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(T){T&&typeof T=="object"&&T.code==="bd_readback_failed"?ie("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ie("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{R=!1,v()}}}let we=null;r&&r.subscribe&&(we=r.subscribe(()=>ze()));let Pe=null;a&&typeof a.subscribe=="function"&&(Pe=a.subscribe(()=>{u&&v()}));let Oe=null;i&&typeof i.subscribe=="function"&&(Oe=i.subscribe(()=>{u&&v()}));function ke(m){m.key==="Escape"&&u&&(m.preventDefault(),n())}document.addEventListener("keydown",ke);function ze(){if(u){if(r&&typeof r.snapshotFor=="function"){let m=r.snapshotFor("detail:"+u)||[];p=m.find(T=>T&&T.id===u)||m[0]||p}it(),v()}}function j(m){Xt(m).then(O=>{O?ie("\uBCF5\uC0AC\uB428","success",1200):ie("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function Q(m){m.preventDefault(),m.stopPropagation(),u&&j(u)}function w(m,O){m.preventDefault(),m.stopPropagation(),j(O)}function C(m,O,T){m.preventDefault(),m.stopPropagation(),Ae.open(O,{missing_state:T})}function P(m,O){f[m]=O,v(),!(!s||!u)&&Promise.resolve(s("update-exec-settings",oc(u,m,O.length===0?null:O))).catch(()=>{ie("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function Z(m,O){let T=p||{},ee=T.metadata&&typeof T.metadata=="object"?T.metadata:{},qe={};for(let Me of["impl_runtime","impl_model","impl_effort"])qe[Me]=Object.hasOwn(f,Me)?f[Me]:typeof ee[Me]=="string"?ee[Me]:"";qe[m]=O;let Ge=pc(qe,x(),G()),Xe={};for(let Me of["impl_runtime","impl_model","impl_effort"])Xe[Me]=f[Me],f[Me]=Ge[Me]||"";v(),!(!s||!u)&&Promise.resolve(s("update-impl-target",{id:u,...Ge,orchestration_runtime:G()})).then(Me=>{let mt=Array.isArray(Me)?Me[0]:Me;if(!mt||typeof mt!="object"||!mt.id)throw new Error("implementation target readback failed");p=mt;for(let sr of["impl_runtime","impl_model","impl_effort"])delete f[sr];v()}).catch(()=>{for(let Me of["impl_runtime","impl_model","impl_effort"])Xe[Me]===void 0?delete f[Me]:f[Me]=Xe[Me];v(),ie("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function pe(m,O,T){if(!s||!u)return!1;try{let ee=await Promise.resolve(s(m,O)),qe=Array.isArray(ee)?ee[0]:ee;return qe&&typeof qe=="object"&&qe.id?(p=qe,!0):(ie(T,"error"),!1)}catch{return ie(T,"error"),!1}}function $e(m){setTimeout(()=>{try{let O=e.querySelector(m);O&&typeof O.focus=="function"&&O.focus()}catch{}},0)}function X(){V=!0,W=p&&p.title||"",v(),$e('.detail-edit__input[data-edit="title"]')}function nt(m){W=m.target.value}function Ee(){V=!1,W="",v()}function ft(){pe("edit-text",{id:u,field:"title",value:W},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(O=>{O&&(V=!1,W=""),v()})}function He(){K=!0,I=p&&p.description||"",v(),$e('.detail-edit__textarea[data-edit="description"]')}function At(m){I=m.target.value}function Ft(){K=!1,I="",v()}function dr(){pe("edit-text",{id:u,field:"description",value:I},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(O=>{O&&(K=!1,I=""),v()})}function yt(m,O,T,ee){if(m.key==="Escape"){m.stopPropagation(),T();return}m.key==="Enter"&&(!ee||m.ctrlKey||m.metaKey)&&(m.preventDefault(),O())}function Et(m){let O=m.target.value;pe("update-status",{id:u,status:O},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>v())}function ur(m){let O=Number(m.target.value);pe("update-priority",{id:u,priority:O},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>v())}function wr(m){S=m.target.value}function jt(){let m=S.trim();m.length!==0&&pe("label-add",{id:u,label:m},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(O=>{O&&(S=""),v()})}function Ht(m){if(m.key==="Escape"){m.stopPropagation(),S="",v();return}m.key==="Enter"&&(m.preventDefault(),jt())}function vt(m){pe("label-remove",{id:u,label:m},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>v())}let nr={onCopyPath:w,onOpenDoc:C};function et(m){return typeof m=="string"?m:m&&typeof m=="object"?String(m.id||m.to||m.issue_id||m.depends_on||""):""}function Ot(m){switch(m&&typeof m=="object"?String(m.dependency_type||m.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function kr(m){let T=(Array.isArray(m.dependencies)?m.dependencies:[]).map(ee=>({id:et(ee),icon:Ot(ee)})).filter(ee=>ee.id.length>0);return d`
      <div class="detail-section-label">의존성</div>
      ${T.length===0?d`<div class="detail-empty">의존성 없음</div>`:d`<div class="detail-deps">
            ${T.map(ee=>o?d`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(ee.id)}
                  >
                    ${ee.icon?`${ee.icon} `:""}${ee.id}
                  </button>`:d`<span class="detail-dep"
                    >${ee.icon?`${ee.icon} `:""}${ee.id}</span
                  >`)}
          </div>`}
    `}function Gt(m){let O=m.metadata||{},T=m.workflow||{},ee=T.stages||{},qe=ee.spec&&ee.spec.stale,Ge=ee.impl&&ee.impl.stale,Xe=ee.plan||null,Me=T.route_source==="derived",mt=T.route||O.route||"\u2014";return d`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${Me?" detail-kv__v--derived":""}"
          title=${Me?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${Me?"unset":mt}</span
        >
      </div>
      ${T.route!=="quick_fix"||Object.hasOwn(O,"spec_review")?d`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${O.spec_review||"\uC5C6\uC74C"}${qe?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${T.route==="full_plan"?d`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Xe?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Xe?.approval_receipt||"\uC5C6\uC74C"}${Xe?.approval_state==="stale"?" \xB7 stale":Xe?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${T.route!=="quick_fix"||Object.hasOwn(O,"impl_review")?d`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${O.impl_review||"\uC5C6\uC74C"}${Ge?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${T.planned_execution?d`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${T.planned_execution.kind}</span>
            </div>
            ${T.planned_execution.kind==="main"?d`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${T.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${T.exec_receipt?d`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${`${T.exec_receipt.kind}:${T.exec_receipt.actor}@${T.exec_receipt.sha}`}</span
            >
          </div>`:""}
      ${T.impl_entry?d`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${T.impl_entry.actor}@${T.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${O.pr_url?d`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${O.pr_url}</span>
          </div>`:""}
    `}let me={route:["quick_fix","spec_backed","full_plan"]};async function l(m,O){let T=O.target.value;if(m==="route"&&p&&p.metadata&&p.metadata.route==="full_plan"&&T!=="full_plan"&&!window.confirm(`full_plan \u2192 ${T||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){v();return}await pe("update-workflow-meta",{id:u,key:m,value:T},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),v()}function _(m){let O=m.metadata||{};return d` ${((ee,qe)=>{let Ge=me[ee],Xe=typeof O[ee]=="string"?O[ee]:"";return d`<div class="detail-kv">
        <span class="detail-kv__k">${ee}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${ee}
          data-edit=${`wfmeta-${ee}`}
          @change=${Me=>l(ee,Me)}
        >
          <option value="" ?selected=${!Ge.includes(Xe)}>
            ${qe}
          </option>
          ${Ge.map(Me=>d`<option value=${Me} ?selected=${Xe===Me}>${Me}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function E(m,O){return V?d`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${W}
            @input=${nt}
            @keydown=${T=>yt(T,ft,Ee,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${ft}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${Ee}
            >
              취소
            </button>
          </div>
        </div>
      `:d`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${m}</h2>
        ${$t(O).map(T=>d`<span class="detail-usage-total" title=${T.tooltip}
              >${T.label}</span
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
    `}function U(m){let O=wt(m.created_at),T=wt(m.updated_at);return!O&&!T?d``:d`
      ${O?d`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${O}</span>
          </div>`:""}
      ${T?d`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${T}</span>
          </div>`:""}
    `}function ae(m,O){return d`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${Et}
        >
          ${$_.map(T=>d`<option value=${T} ?selected=${T===m}>${T}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${ur}
        >
          ${x_.map(T=>d`<option value=${String(T)} ?selected=${T===O}>
                P${T}
              </option>`)}
        </select>
      </div>
    `}function ge(m){return d`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${K?"":d`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${He}
            >
              ✎
            </button>`}
      </div>
      ${K?d`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${I}
              @input=${At}
              @keydown=${O=>yt(O,dr,Ft,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${dr}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${Ft}
              >
                취소
              </button>
            </div>
          </div>`:d`<div class="detail-overlay__desc">
            ${m||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function fe(m){let O=typeof m.notes=="string"?m.notes:"";return O.trim().length===0?d``:d`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${O}</div>
    `}function Ze(m){let O=Array.isArray(m.labels)?m.labels:[];return d`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${O.map(T=>d`<span class="detail-label-chip"
              >${T}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${T}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+T}
                @click=${()=>vt(T)}
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
            @input=${wr}
            @keydown=${Ht}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${jt}
          >
            추가
          </button>
        </span>
      </div>
    `}function y(){if(!u)return d``;let m=p||{},O=String(m.id||u),T=m.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",ee=lt(),qe=m.status||"open",Ge=typeof m.priority=="number"?Math.max(0,Math.min(4,m.priority)):"",Xe=m.description||"",Me={...m,metadata:{...m.metadata||{},...f}};return d`
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
            @click=${Q}
          >
            ${O}
          </button>
          ${E(T,ee)}
          ${lc(Me)}
          ${ic({metadata:Me.metadata,workspace_values:g(),catalog:x(),execution_defaults:M(),expanded:L,presets:Y()?.presets||[],preset_id:h,preset_busy:R,skipped_orchestration_keys:A},{onToggle:mt=>{L=mt,v()},onEdit:(mt,sr)=>{if(mt==="impl_runtime"||mt==="impl_model"||mt==="impl_effort"){Z(mt,sr??"");return}P(mt,sr??"")},onPresetSelect:mt=>{h=mt,A=[],v()},onPresetApply:()=>{he()}})}
          ${ae(qe,Ge)} ${U(m)}
          ${ge(Xe)}
          ${Yl(k,_e,{expanded:rt,draft:te,sending:re,error:de})}
          ${fe(m)} ${Ze(m)} ${kr(m)}
          ${Gt(m)} ${_(m)}
          ${Gl(m,nr)}
          ${bc({expanded:Fe,loading:Ke,error:xe,data:tt},{onToggle:We})}
          ${gc(Se(),ue,{total:ee,expanded:Ye})}
        </div>
      </div>
    `}function v(){Qe(y(),e)}return{load(m){m!==u&&(f={},h="",A=[],L=!1,D(),De(),Te()),u=m,p=null,ze(),$()},clear(){u=null,p=null,f={},h="",R=!1,A=[],L=!1,D(),De(),Te(),Ae.close(),ve.close(),Qe(d``,e)},destroy(){we&&(we(),we=null),Pe&&(Pe(),Pe=null),Oe&&(Oe(),Oe=null),document.removeEventListener("keydown",ke),Ae.destroy(),ye.parentNode&&ye.parentNode.removeChild(ye),ve.destroy(),Ne.parentNode&&Ne.parentNode.removeChild(Ne),u=null,p=null,h="",R=!1,A=[],De(),Te(),Qe(d``,e)}}}function yc(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let r=t.querySelector("#fatal-error-title"),n=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),i=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},c=(u,p,f="")=>{r&&(r.textContent=u||"Unexpected Error"),n&&(n.textContent=p||"An unrecoverable error occurred.");let h=typeof f=="string"?f.trim():"";if(s&&(h.length>0?(s.textContent=h,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>i()),t.addEventListener("cancel",u=>{u.preventDefault(),i()}),{open:c,close:i,getElement(){return t}}}function Ys(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function Zs(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let r=Math.floor(t/60);if(r<60)return`${r}\uBD84 ${Math.round(t-r*60)}\uCD08`;let n=Math.floor(r/60),s=r%60;return`${n}\uC2DC\uAC04 ${s}\uBD84`}function vc(e,t){if(typeof e!="object"||e===null)return null;let r=0,n=!1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t)continue;let a=o.started_at,i=o.finished_at;typeof a!="number"||typeof i!="number"||!Number.isFinite(a)||!Number.isFinite(i)||i<a||(r+=i-a,n=!0)}return n?r:null}function Xs(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function A_(e,t){let r=Array.isArray(e)?e:[],n=Array.isArray(t)?t:[];if(r.length===0&&n.length===0)return null;let s=null;for(let i of r)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!s||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=i);let o=r.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+n.length,a=r.some(i=>i.state==="repairing");return{deploy:s?{sha:Ys(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function wc(e,t){let r=A_(e,t);return r?d`<button
    type="button"
    class="worker-repo-strip"
    data-seam="repo-ops-strip"
    aria-label="저장소 작업 타임라인 열기"
  >
    <span class="worker-repo-strip__cue" aria-hidden="true">▸</span>
    <span class="worker-repo-strip__name">저장소 작업</span>
    ${r.deploy?d`<span class="worker-repo-strip__fact">
          배포
          <code class="worker-repo-strip__sha">${r.deploy.sha}</code>
          <span class="worker-repo-strip__ok">✓ 최신</span>
          <span
            class="worker-repo-strip__ago"
            title=${r.deploy.at?wt(r.deploy.at):""}
            >${Xs(r.deploy.at)}${r.deploy.elapsed_ms!==null?` \xB7 ${Zs(r.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${r.badge.tone}"
      >${r.badge.label}</span
    >
  </button>`:""}function dn(e){let t=Dt(e.created_at),r=Dt(e.updated_at);return!t&&!r?"":d`<div class="worker-mini__meta">
    ${t?d`<span title=${`\uC0DD\uC131 ${wt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&r?d`<span>·</span>`:""}${r?d`<span title=${`\uC218\uC815 ${wt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </div>`}function S_(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function Fn(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function Qs(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function cr(e,t,r={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(f=>f&&f.bead_id===t&&f.phase!=="done").sort((f,h)=>(f.requested_at||0)-(h.requested_at||0)).at(-1),o=typeof r.attempt_id=="string"&&r.attempt_id.length>0?r.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=r.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":r.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":r.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,i=typeof s?.last_error=="string"?s.last_error:null,c=s?S_(s.phase):null,u=s?.kind==="stale_work_backup_fresh",p=r.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!r.external&&!r.done,enabled:!a&&(!s||!!i),label:u?i?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":i?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(i?u?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${i} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${i} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${c||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:p==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:c,error:i,confirmation:p}}function vr(e){let t=e.discard;if(!t||!t.operation)return"";let r=t.operation,n=r.kind==="stale_work_backup_fresh"&&!t.error?null:r.backup?.path,s=r.original_pr,o=r.revert_pr;return d`<div
    class="worker-discard-receipt"
    role=${t.error?"alert":"status"}
  >
    <span>${t.progress}</span>
    ${t.error?d`<span>폐기 실패: ${t.error}</span>`:""}
    <code>작업: ${r.operation_id}</code>
    ${n?d`<code>백업: ${n}</code>`:t.error?d`<span>아직 아무것도 삭제하지 않음</span>`:""}
    ${s?.url?d`<a href=${s.url} target="_blank" rel="noreferrer noopener"
          >원본 PR #${s.number||"?"}</a
        >`:""}
    ${o?.url?d`<a href=${o.url} target="_blank" rel="noreferrer noopener"
          >revert PR #${o.number||"?"} ·
          ${o.state||"\uC0C1\uD0DC \uBBF8\uD655\uC778"}</a
        >`:""}
  </div>`}var E_={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function kc(e,t=!1){if(!e||typeof e!="object")return null;let r=e;if(r.reason!=="worktree_stale_work"||!r.stale_work||typeof r.stale_work!="object")return null;let n=r.stale_work,s=n.residue==="branch"?"branch":"worktree",o=n.state==="unique"?"unique":"unknown",a=n.summary&&typeof n.summary=="object"?n.summary:{};function i(u){return Number.isInteger(a[u])?Number(a[u]):0}let c=typeof n.cause=="string"?n.cause:"observe_failed";return{residue:s,state:o,title:s==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":o==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:E_[c]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:s==="branch"?`\uACE0\uC720 commit ${i("branch_ahead")}`:[`staged ${i("staged_count")}`,`unstaged ${i("unstaged_count")}`,`untracked ${i("untracked_count")}`,`branch ahead ${i("branch_ahead")}`,`HEAD ahead ${i("head_ahead")}`].join(" \xB7 "),action_id:typeof n.action_id=="string"?n.action_id:"",can_resume:n.can_resume===!0,can_continue:n.can_continue===!0,can_backup_fresh:n.can_backup_fresh===!0,can_recheck:n.can_recheck===!0,locked:t}}function da(e){let t=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],n=$t(e.usage),s=Qt(e.usage),o=e.merge_step||null,a=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,i=e.lane==="done"&&!a,c=i?Dt(e.done_at):"",u=t?d`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",p=typeof e.seq=="number"?d`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",f=e.worker_serial===!0?d`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",h=e.workspace_name?d`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",R=d`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,A=d`<span class="worker-mini__title">${e.title}</span>`,L=e.pr_url&&e.pr_number?d`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",N=e.completion_repair_pr_url&&e.completion_repair_pr_number?d`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",V=r.map(De=>De===e.live_badge?d`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${De}</span
        >`:d`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${De===e.completion_badge&&e.completion_title||""}
          >${De}</span
        >`),K=e.reason?d`<span class="worker-mini__reason">${e.reason}</span>`:"",W=n.length>0?n.map(De=>d`<span class="worker-usage" title=${De.tooltip}
              >${De.label}</span
            >`):s?d`<span class="worker-usage" title=${on(e.usage)}
            >${s}</span
          >`:"",I=o?d`<span
        class="merge-step${o.failed?" merge-step--failed":""}"
        style=${`--progress: ${o.percent}%`}
        >${o.label}${o.index>0?d`<span class="merge-step__n"
              >${o.index}/${o.total}</span
            >`:""}</span
      >`:"",S=e.merge_action?d`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",D=e.cancel_action?d`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",k=e.timeline_action?d`<button
        type="button"
        class="worker-mini__timeline"
        data-bead-id=${e.id}
        title="저장소 작업이 끝나지 않아 머지 액션이 잠겼습니다 — 타임라인에서 원인과 해결 버튼을 볼 수 있습니다"
      >
        저장소 작업 보기
      </button>`:"",B=e.discard,oe=B?.action||e.discard_action?d`<button
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
        </button>`:"",de=e.stale_work||null,te=de?d`${de.can_resume||de.can_continue?d`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${de.action_id}
            ?disabled=${de.locked}
          >
            기존 작업 이어가기
          </button>`:""}${de.can_backup_fresh?d`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${de.action_id}
            ?disabled=${de.locked}
          >
            백업 후 새로 시작
          </button>`:""}${de.can_recheck?d`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${de.action_id}
            ?disabled=${de.locked}
          >
            다시 확인
          </button>`:""}`:"",re=de?d`<div class="worker-mini__stale">
        <strong>${de.title}</strong>
        <span>${de.summary}</span>
        <span>${de.cause}</span>
        ${de.can_backup_fresh?d`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",Ie=e.revise_action?d`<button
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
        </button>`:"",rt=!!(s||o||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||B?.operation||e.revise_action||de);return d`<div
    class="worker-mini${a?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${o?" worker-mini--merging":""}${o?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${i?d`<div class="worker-mini__row1">${h}${R}${A}</div>
          <div class="worker-mini__row2">
            ${W}${c?d`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${wt(e.done_at)}`}
                  >완료 ${c}</span
                >`:""}${typeof e.work_ms=="number"?d`<span
                  class="worker-mini__work"
                  title="attempt 실행 시간 합산 (재개 세션 포함)"
                  >작업 ${Zs(e.work_ms)}</span
                >`:""}${V}${I}
            <span class="worker-mini__actions"
              >${S}${D}${k}${oe}</span
            >
            ${dn(e)}
          </div>`:a?d`<div class="worker-mini__head">
              ${u}${p}${h}${R}${L}${N}${V}${f}${K}
            </div>
            <div class="worker-mini__body">${A}${re}</div>
            ${rt?d`<div class="worker-mini__foot">
                  ${W}${I}
                  <span class="worker-mini__actions"
                    >${S}${D}${k}${oe}${Ie}${te}</span
                  >
                  ${vr(e)}
                </div>`:""}
            ${dn(e)}`:d`<div class="worker-mini__line">
              ${u}${p}${h}${R}${A}${L}${N}${V}${f}${K}${W}${I}${S}${D}${k}${oe}
            </div>
            ${vr(e)} ${dn(e)}`}
  </div>`}function T_(e,t=null){let r=e.draggable&&!e.done,n=r&&t&&t.bead_id===e.id,s=e.workflow,o=s&&s.chips||{},a=o.route||s&&s.route,i=o.route_source==="derived"||!!(s&&s.route_source==="derived"),c=typeof e.reason=="string"&&e.reason.split(" \xB7 ").includes("missing_description"),u=typeof e.reason=="string"&&e.reason.startsWith("\u26D4");return d`<div
    class="worker-card${r?"":" worker-card--static"}"
    draggable=${r?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${r?d`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      ${e.workspace_name?d`<span class="worker-card__repo" title=${e.root_dir||""}
            >${e.workspace_name}</span
          >`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span>
      ${s&&a?d`<span
            class="ctl-chip ctl-chip--route${i?" is-derived":""}"
            title=${i?"route \uBBF8\uD540 (metadata unset)":"route"}
            >${i?"unset":a}</span
          >`:""}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${s?hs(s,e.status):""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${n?d`<div class="worker-card__place-menu">
            ${t.lanes.map(p=>d`<button
                  type="button"
                  class="worker-card__place-lane"
                  data-bead-id=${e.id}
                  data-lane=${p.id}
                  title="${p.label} 대기 맨 뒤에 추가"
                >
                  <span>${p.label}</span>
                  <span class="worker-card__place-count">${p.count}</span>
                </button>`)}
            <button
              type="button"
              class="worker-card__place-cancel"
              data-bead-id=${e.id}
              title="레인 선택 취소"
              aria-label="레인 선택 취소"
            >
              ✕
            </button>
          </div>`:d`${e.reason?d`<span
                  class="worker-card__reason${u?" worker-card__reason--danger":""}"
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
              ?disabled=${!r}
              title=${r?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":c?"description\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"spec\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
            >
              대기로 ↴
            </button>`}
    </div>
    ${dn(e)}
  </div>`}function rr(e){let t=!!e.collapsible&&!!e.collapsed,r=d`<span
      class="worker-pane__dot worker-pane__dot--${e.lane}"
      aria-hidden="true"
    ></span>
    <span class="worker-pane__title">${e.title}</span>
    ${t&&e.preview?d`<span class="worker-pane__preview">${e.preview}</span>`:""}
    <span class="worker-pane__count">${e.items.length}</span>`;return d`<section
    class="worker-pane worker-pane--lane-${e.lane}${e.src?" worker-pane--src":""}${e.live?" worker-pane--live":""}${e.collapsible?" worker-pane--collapsible":""}${t?" worker-pane--collapsed":""}"
    id=${e.id}
    data-lane=${e.lane}
  >
    ${e.collapsible?d`<button
          type="button"
          class="worker-pane__hd worker-pane__hd--toggle"
          data-lane=${e.lane}
          aria-expanded=${t?"false":"true"}
        >
          ${r}
          <span class="worker-pane__caret" aria-hidden="true"
            >${t?"\u25B8":"\u25BE"}</span
          >
        </button>`:d`<header class="worker-pane__hd">
          ${r}${e.header_control?e.header_control:""}
        </header>`}
    ${t?"":d`${e.controls?e.controls:""}
          <div class="worker-pane__body">
            ${e.body?e.body:e.items.length===0?d`<div class="worker-pane__empty">
                    ${e.empty||""}
                  </div>`:e.items.map(n=>e.lane==="candidate"?T_(n,e.place_menu):da(n))}
          </div>`}
  </section>`}function ua(e,t){return`${e}\0${t}`}function pa(e){let t=new Map;for(let r of Array.isArray(e?.running)?e.running:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"running",state:"running"});for(let r of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let r of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let n=Array.isArray(r.sublanes?.parallel)?r.sublanes.parallel:Array.isArray(r.items)?r.items:[];for(let s of n)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:"parallel",position:s.queue_position});for(let s of Array.isArray(r.sublanes?.serial)?r.sublanes.serial:[])for(let o of s.items)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:s.id,position:o.queue_position})}for(let r of Array.isArray(e?.runnable)?e.runnable:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"runnable",state:"runnable"});for(let r of Array.isArray(e?.done)?e.done:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"done",state:"done"});return t}function C_(e,t){let r=Array.isArray(t)?t:[],n=e.indexOf("-"),s=n>0?e.slice(0,n):e;return r.some(o=>typeof o?.issue_prefix=="string"&&o.issue_prefix===s)?"internal":r.length>0&&r.every(o=>typeof o?.issue_prefix=="string")?"external":"unknown"}function R_(e,t){return e==="internal"&&t===void 0}function $c(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function xc(e,t,r,n){let s=r.get(e);if(!!(s&&t&&s.root_dir===t.root_dir&&s.lane===t.lane&&typeof s.position=="number"&&typeof t.position=="number"&&s.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,scope:null,same_lane_ahead:!0,missing_internal:!1};if(s)return{id:e,label:`\u{1F512} ${e} (${$c(s)})`,scope:null,same_lane_ahead:!1,missing_internal:!1};let a=C_(e,n);return{id:e,label:`\u{1F512} ${e} (${a==="internal"?"\uBBF8\uC801\uC7AC":a==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"})`,scope:a,same_lane_ahead:!1,missing_internal:R_(a,s)}}function Ac(e){let t=Array.isArray(e)?e:[],r=new Map,n=new Map,s=new Map;for(let i of t)for(let c of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let u=ua(i.root_dir,c.id);r.set(u,{root_dir:i.root_dir,workspace_name:i.name,lane:c.id}),s.set(u,[]);for(let p of Array.isArray(c.items)?c.items:[])n.set(p.id,u)}for(let i of t)for(let c of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let u=ua(i.root_dir,c.id),p=Array.isArray(c.items)?c.items[0]:null,h=!!p&&p.queue_index===0&&(!Array.isArray(c.occupied_by)||c.occupied_by.length===0)&&Array.isArray(p.blocked_by)?p.blocked_by:[],R=s.get(u);if(R)for(let A of h){let L=n.get(A);L&&L!==u&&!R.includes(L)&&R.push(L)}}let o=(i,c)=>{let u=new Set,p=[i];for(;p.length>0;){let f=p.pop();if(f===c)return!0;!f||u.has(f)||(u.add(f),p.push(...s.get(f)||[]))}return!1},a=new Map;for(let[i,c]of s){let u=[];for(let p of c){let f=r.get(p);o(p,i)&&f&&u.push(f)}u.length>0&&a.set(i,u)}return a}function Sc(e){let t=pa(e),r=new Map;for(let n of[...Array.isArray(e?.runnable)?e.runnable:[],...Array.isArray(e?.queue)?e.queue:[],...Array.isArray(e?.running)?e.running:[],...Array.isArray(e?.pr_wait)?e.pr_wait:[]])r.has(n.id)||r.set(n.id,n);return Array.from(r.values()).map(n=>({id:n.id,title:n.title,root_dir:n.root_dir,workspace_name:n.workspace_name,location:t.has(n.id)?(()=>{let s=t.get(n.id),o=$c(s);return s.state?`${s.workspace_name} \xB7 ${o}`:o})():""}))}function Ec(e,t){return ua(e,t)}var Tc=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],jn=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function Js(e,t){let r=Tc.find(s=>s.step===e);if(!r)return null;let n=Tc.length;return{step:r.step,label:t,index:r.index,total:n,percent:Math.round(r.index/n*100)}}function Cc(e){let t=jn.findIndex(r=>r.step===e);return jn.map((r,n)=>({step:r.step,label:r.label,state:t<0?"todo":n<t?"done":n===t?"stall":"todo"}))}function zr(e){let t=jn.find(r=>r.step===e);return t?t.label:typeof e=="string"?e:""}function I_(e){let t=jn.findIndex(r=>r.step===e);return t<0?null:{index:t+1,total:jn.length}}function eo(e){let t=I_(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var _a=new Set(["queued","running","retry_pending","repairing"]),Rc=new Set(["failed","succeeded"]),L_={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",repairing:"\uC790\uB3D9 \uD574\uACB0 \uC911",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},Bn={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},O_={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:Bn.base_containment,child_sweep:Bn.child_sweep,branch_cleanup:Bn.branch_cleanup,parent_close:Bn.parent_close};function M_(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function P_(e,t,r){return!["verify","deploy"].includes(e.kind)||![..._a,...Rc].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(n=>n&&typeof n=="object"&&n.bead_id===t&&n.merged_sha===r)}function D_(e,t){let r=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(r!==0)return r;let n=u=>u.state==="succeeded"?1:2,s=n(t)-n(e);if(s!==0)return s;let o=typeof e.requested_at=="number"?e.requested_at:0,a=typeof t.requested_at=="number"?t.requested_at:0;if(o!==a)return a-o;let i=typeof e.operation_id=="string"?e.operation_id:"",c=typeof t.operation_id=="string"?t.operation_id:"";return i.localeCompare(c)}function fa(e,t=!1){let r=e.kind,n=r==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",s=t?"failed":e.state,o=L_[s];if(!o)return null;let a=Js(r,`${n} ${o}`);return a?{...a,active:_a.has(s),failed:s==="failed"}:null}function N_(e){return!e||typeof e!="object"?null:O_[e.step]||null}function Un(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,r=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},n=N_(r),s=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,o=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),a=!o&&(e.cleanup_cursor==="repo_operations"||r.step==="repo_operations"),i=M_(e.merge_sha)?e.merge_sha:null,c=!o&&i&&Array.isArray(e.repo_operations)?e.repo_operations.filter(A=>A&&typeof A=="object"&&P_(A,t,i)).sort(D_):[],u=a?c:[],p=u.find(A=>_a.has(A.state));if(p)return fa(p);if(s)return s.step==="repo_operations"&&c[0]?fa(c[0],!0):null;let f=u.find(A=>Rc.has(A.state)?A.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(f)return fa(f);if(n){let A=Js(n.step,n.label);return A?{...A,active:!0,failed:!1}:null}let h=typeof e.cleanup_cursor=="string"?Bn[e.cleanup_cursor]:null;if(!h)return null;let R=Js(h.step,h.label);return R?{...R,active:!0,failed:!1}:null}function to(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var Ic={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},Lc={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."};function Oc(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function ma(e){for(let t of Oc(e))if(Object.hasOwn(Ic,t))return Ic[t];return null}function ga(e){let t=null;for(let r of Oc(e))Object.hasOwn(Lc,r)&&(t=Lc[r]);return t}function ro(e){let t=ma(e),r=ga(e);return t&&r?`${t} \u2014 ${r}`:t||r?t||r:typeof e=="string"?e:""}function Mc(e,t){let r=ma(e)??ma(t),n=ga(t)??ga(e);return r&&n?`${r} \u2014 ${n}`:r||n?r||n:typeof t=="string"?t:""}var Pc=160;function q_(e){return e.length>Pc?`${e.slice(0,Pc)}\u2026`:e}function F_(e){return!e||!e.reason?"":d`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?d` · <code>${q_(e.command)}</code>`:""}
  </div>`}function j_(e){return e?d`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function ba(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),r=Math.floor(t/60),n=t%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function Dc(e){let t=e.failure?ro(e.failure.reason):"";return d`<div class="worker-banners">
    ${e.failure?d`<div class="worker-banner worker-banner--failure" role="alert">
          ⛔ ${e.failure.repo||"repo"} 세션 실패 —
          ${t}${t&&!t.endsWith(".")?".":""}
          자동 진행을 껐습니다, 수동 ▶ 필요.
          ${e.failure.resume_attempt_id?d`<button
                type="button"
                class="worker-banner__resume"
                data-attempt-id=${e.failure.resume_attempt_id}
                ?disabled=${!e.failure.resume_eligible}
                title=${e.failure.resume_eligible?"\uCD5C\uADFC \uC2E4\uD328 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":e.failure.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}
              >
                ↻ 이어하기
              </button>`:""}
          ${e.failure.discard?.action?d`<button
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
          ${e.failure.resume_attempt_id?d`<button
                type="button"
                class="worker-banner__dismiss"
                data-attempt-id=${e.failure.resume_attempt_id}
                title="실패 알림 닫기 — 레인에는 남습니다"
                aria-label="배너 닫기"
              >
                ✕
              </button>`:""}
          ${F_(e.failure.cause_detail)}
          ${j_(e.failure.reason)}
          ${vr({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function B_(e,t,r=null){let n=e.failed===!0,s=!!e.paused,o=n?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):s?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?ba(t-e.started_at):"\u2014",a=ar(e),i=Sr(e),c=$t(e.usage),u=Qt(e.usage),p=e.conflict_resolution?s?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,f=e.base_exception||null,h=e.landing,R=e.attempt_id&&e.attempt_id===r,A=e.discard?.action?d`<button
        type="button"
        class="rtile__discard"
        data-operation-id=${e.discard.operation?.operation_id||""}
        ?disabled=${!e.discard.enabled}
        title=${e.discard.title}
        aria-label=${e.discard.label}
      >
        ${e.discard.label}
      </button>`:"";return d`<div
    class="rtile${R?" rtile--sel":""}${s?" rtile--paused":""}${n?" rtile--failed":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span class="rtile__dot" aria-hidden="true"></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${i?d`<span class="rtile__resumed" title=${i}>↻</span>`:""}
      <span class="rtile__elapsed">${o}</span>
      ${n?d`<button
              type="button"
              class="rtile__resume"
              ?disabled=${e.resume_eligible===!1}
              title=${e.resume_eligible===!1?e.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589"}
              aria-label="이어하기"
            >
              ↻ 이어하기
            </button>
            ${A}
            <button
              type="button"
              class="rtile__dismiss"
              title="실패 알림 닫기 — 레인에는 남습니다"
              aria-label="실패 기록 닫기"
            >
              ✕
            </button>`:d`<button
              type="button"
              class="rtile__session"
              title="라이브 세션 열기"
              aria-label="라이브 세션 열기"
            >
              ▤ 세션
            </button>
            ${s?d`<button
                  type="button"
                  class="rtile__resume"
                  title="같은 세션으로 이어서 재개"
                  aria-label="재개"
                >
                  ▶
                </button>`:d`<button
                  type="button"
                  class="rtile__pause"
                  ?disabled=${e.can_pause===!1}
                  title=${e.can_pause===!1?"\uC138\uC158 ID \uAE30\uB85D \uC804 \u2014 \uC77C\uC2DC\uC815\uC9C0 \uBD88\uAC00":"\uC77C\uC2DC\uC815\uC9C0 (\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC7AC\uAC1C \uAC00\uB2A5)"}
                  aria-label="일시정지"
                >
                  ⏸
                </button>`}
            ${A}`}
    </div>
    <div class="rtile__title">${e.title}</div>
    ${e.current_child?d`<div class="rtile__child" title="현재 진행중 child">
          └ ${e.current_child}
        </div>`:""}
    ${h?d`<div class="rtile__landing">
          <span
            class="merge-step${h.failed?" merge-step--failed":""}"
            style=${`--progress: ${h.percent}%`}
            >${h.label}${h.index>0?d`<span class="merge-step__n"
                  >${h.index}/${h.total}</span
                >`:""}</span
          >
        </div>`:""}
    ${a||c.length>0||u||p||f?d`<div class="rtile__meta">
          ${p?d`<span class="worker-mini__badge">${p}</span>`:""}
          ${f?d`<span
                class="worker-mini__badge"
                title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                >${f}</span
              >`:""}
          ${a?d`<span class="rtile__runner">${a}</span>`:""}
          ${c.length>0?c.map(L=>d`<span class="worker-usage" title=${L.tooltip}
                    >${L.label}</span
                  >`):u?d`<span
                  class="worker-usage"
                  title=${on(e.usage)}
                  >${u}</span
                >`:""}
        </div>`:""}
    ${dn(e)} ${vr(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${n||s?"":d`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function ha(e,t=Date.now(),r=null){let n=Array.isArray(e)?e:[];return d`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?d`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>B_(s,t,r))}
  </div>`}function Hr(e){return d`<svg
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
  </svg>`}function ya(){return Hr($r`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function va(){return Hr($r`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function Nc(){return Hr($r`<rect x="4.3" y="4.3" width="7.4" height="7.4" rx="1.2" />`)}function qc(){return Hr($r`<path d="M4.4 4.4 11.6 11.6M11.6 4.4 4.4 11.6" />`)}function Fc(){return Hr($r`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function jc(){return Hr($r`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function Bc(){return Hr($r`<path d="M3 3.6 8.2 8 3 12.4z" />
    <path d="M8.8 3.6 14 8l-5.2 4.4z" />`)}var Wn=1,U_=6e4,W_={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"},z_=new Set(["auto_merge","merged","merge","done"]),Uc={running:3,paused:2,failed:1};function H_(e,t){let r=null,n=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=n&&(n=o,r=s)}return r}function G_(e,t){let r=Object.values(e||{}),n=new Set,s=new Map;for(let a of r)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&n.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of r){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let i=null;if(a.status==="running")i="running";else if(a.status==="paused"&&!n.has(a.attempt_id))i="paused";else if(a.status==="failed"||a.status==="orphaned"){let f=t.get(a.bead_id),h=typeof f=="number"&&f>0&&typeof a.finished_at=="number"&&f>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!h&&typeof a.dismissed_at!="number"&&(i="failed")}if(!i)continue;let c=typeof a.started_at=="number"?a.started_at:null,u=o.get(a.bead_id);if(u){let f=Uc[u.run_state],h=Uc[i];if(f>h||f===h&&(u.started_at??0)>(c??0))continue}let p=typeof a.session_id=="string"&&a.session_id.length>0;o.set(a.bead_id,{attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",run_state:i,started_at:c,last_event_at:typeof a.last_event_at=="number"?a.last_event_at:null,runner:typeof a.runner=="string"?a.runner:null,model:typeof a.model=="string"?a.model:null,effort:typeof a.effort=="string"?a.effort:null,speed:typeof a.speed=="string"?a.speed:null,resumed_from:typeof a.resumed_from=="string"?a.resumed_from:null,continuation_mode:a.continuation_mode==="session"||a.continuation_mode==="fresh"?a.continuation_mode:null,usage:Wt(e,a.bead_id),can_pause:i==="running"&&p,can_resume:i!=="running"&&p&&!n.has(a.attempt_id)})}return o}function Wc(e,t){let r=e[t];if(!r)return"";if(r.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let n=typeof r.reason=="string"?r.reason:"",s=n.indexOf(":");return s>0&&s<n.length-1?`\u26D4 ${n.slice(0,s)} (${n.slice(s+1)})`:`\u26D4 ${n}`}function xt(e){return e&&typeof e=="object"?e:{}}function wa(e,t,r){let n=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=r&&typeof r.done_since=="number"?r.done_since:void 0,a=new Map;for(let k of s)k&&typeof k.root_dir=="string"&&a.set(k.root_dir,k);let i=[],c=[],u=[],p=[],f=[],h=[],R=new Map,A=new Map,L=new Map;for(let k of n){if(!k||typeof k.root_dir!="string")continue;let B=k.root_dir,oe=k.name||B,de=a.get(B),te=de&&typeof de.revision=="number"?de.revision:typeof k.revision=="number"?k.revision:0,re=xt(k.attempts),Ie=xt(k.bead_titles),rt=xt(k.pr_observations),De=xt(k.admission),ot=xt(k.revise_parked),it=xt(k.merge_queue_state),Ve=xt(k.cleanup_failed),be=xt(k.discard_operations),Le=xt(k.bead_blocked_by),_e=xt(k.pr_activity),ye=Array.isArray(k.repo_operations)?k.repo_operations:[],Ae=Array.isArray(k.merge_queue)?k.merge_queue:[],Ne=new Set(Ae.filter(z=>z&&typeof z.bead_id=="string").map(z=>z.bead_id)),ve=new Map(Ae.filter(z=>z&&typeof z.bead_id=="string").map(z=>[z.bead_id,z])),Fe=Array.isArray(k.queue)?k.queue:[],Ke=(Array.isArray(k.serial_lanes)?k.serial_lanes:[]).filter(z=>z&&/^s[1-5]$/.test(z.id)&&Array.isArray(z.entries)),xe=xt(k.lane_states),tt=typeof k.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(k.serial_lane_count))):Math.min(5,Ke.length);L.set(B,tt);let H=new Map(Ke.map(z=>[z.id,z])),F=new Map;for(let z of Ke)for(let J of z.entries)J&&typeof J.bead_id=="string"&&F.set(J.bead_id,z.id);let se=Array.isArray(k.done)?k.done:[];for(let z of se)z&&typeof z.bead_id=="string"&&h.push({id:z.bead_id,root_dir:B,workspace_name:oe});let Te=new Map;for(let z of se)z&&typeof z.bead_id=="string"&&typeof z.added_at=="number"&&Te.set(z.bead_id,z.added_at);let je=z=>({id:z,title:Ie[z]||z,root_dir:B,workspace_name:oe,expected_revision:te,draggable:!1}),We=new Set;for(let[z,J]of G_(re,Te))We.add(z),c.push({...je(z),lane:"running",...F.has(z)?{serial_lane_id:F.get(z)}:{},attempt_id:J.attempt_id,run_state:J.run_state,can_pause:J.can_pause,can_resume:J.can_resume,started_at:J.started_at,last_event_at:J.last_event_at,runner:J.runner,model:J.model,effort:J.effort,speed:J.speed,resumed_from:J.resumed_from,continuation_mode:J.continuation_mode,usage:J.usage,discard:cr(be,z,{attempt_id:J.attempt_id}),badges:J.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:J.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:J.run_state==="failed"});for(let z of Array.isArray(k.pr_wait)?k.pr_wait:[]){let J=z&&z.bead_id;if(typeof J!="string"||We.has(J))continue;We.add(J);let Ce=xt(rt[J]),Be=xt(Ce.pr),ue=Ce.gate?xt(Ce.gate):null,g=Ne.has(J),$=ve.get(J)?.continuation_action||null,x=!!$&&$.continuation===null,M=it.active===J,G=z.external===!0,Y=Ve[J]||null,ne=xt(_e[J]),ce=Un({bead_id:J,merge_sha:z.merge_sha,cleanup_cursor:z.cleanup_cursor,merge_progress:ne.merge_progress||null,cleanup_failed:Y,repo_operations:ye}),he=to(ce),we=!!ue&&ue.base_badge==="\uCDA9\uB3CC",Pe=!!Y&&["child_sweep","branch_cleanup","parent_close"].includes(Y.step)&&!!ue&&ue.tier==="merged",Oe=G&&!!Y&&!!ue&&ue.tier==="merged",ke=!!ue&&["closed_unmerged","review","undecidable"].includes(ue.tier),ze=cr(be,J,{external:G,merge_active:M||ce?.step==="merge",merge_queued:g,cleanup_active:he,merged:!!Y||ue?.tier==="merged"}),j=!!ze.operation;u.push({...je(J),lane:"pr_wait",pr_number:typeof Be.number=="number"?Be.number:null,pr_url:typeof Be.url=="string"?Be.url:void 0,external:G,usage:Wt(re,J),merge_step:ce,badges:x?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:ce?[ue?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:Y?[zr(Y.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${zr(Y.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof ue?.gate_badge=="string"&&ue.gate_badge.length>0?[ue.gate_badge]:[],alert:ce?ce.failed===!0:!!Y||ke,reason:Y&&ce?.active!==!0?eo(Y.step):"PR \uB300\uAE30",merge_action:ue?.tier==="merged"&&!Pe&&!Oe?!1:!g||x,merge_enabled:!j&&(x||ue?.enabled===!0||we||Pe||Oe),merge_label:x?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Oe||Pe?"\uC815\uB9AC \uC7AC\uAC1C":we&&!Pe?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:x?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":j?ze.error?`\uD3D0\uAE30 \uC2E4\uD328: ${ze.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${ze.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Oe?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Pe?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":we?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":ue?.enabled===!0?`\uBA38\uC9C0 (${ue.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${ue?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:g&&!x,cancel_enabled:!M,continuation_mismatch:$?.mismatch||null,discard:ze,discard_action:ze.action,discard_enabled:ze.enabled,discard_title:ze.title})}let Se=(z,J,Ce,Be)=>{let ue=z&&z.bead_id;if(typeof ue!="string"||We.has(ue))return null;We.add(ue);let g=ot[ue],$=cr(be,ue),x=$.operation?$:null,M={...je(ue),lane:J,draggable:!x,discard:x||void 0,reason:Wc(De,ue),queue_position:Ce+1,queue_index:Ce,queue_length:Be,badges:g?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!g,revise_action:!!g,revise_enabled:!!g&&!x,revise_title:g?g.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${g.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};return Object.hasOwn(Le,ue)&&(M.blocked_by=Array.isArray(Le[ue])?Le[ue].filter(G=>typeof G=="string"&&G.length>0):[]),M};for(let z=0;z<Fe.length;z++){let J=Se(Fe[z],"queue",z,Fe.length);if(!J)continue;p.push(J);let Ce=R.get(B);Ce?Ce.push(J):R.set(B,[J])}let lt=[];for(let z=0;z<Ke.length;z++){let J=Ke[z],Ce=[];for(let ue=0;ue<J.entries.length;ue++){let g=Se(J.entries[ue],J.id,ue,J.entries.length);g&&(Ce.push(g),p.push(g))}if(Ce.length===0)continue;let Be=xt(xe[J.id]);lt.push({id:J.id,index:z,items:Ce,occupied_by:Array.isArray(Be.occupied_by)?Be.occupied_by.filter(ue=>typeof ue=="string"):[],corrections:Array.isArray(Be.corrections)?Be.corrections.length:0,cycle:Be.cycle===!0})}A.set(B,lt);let Ye=Array.from({length:tt},(z,J)=>{let Ce=`s${J+1}`,Be=H.get(Ce),ue=Be&&Array.isArray(Be.entries)?Be.entries:[],g=xt(xe[Ce]);return{id:Ce,index:ue.length,length:ue.length,occupied_by:Array.isArray(g.occupied_by)?g.occupied_by.filter($=>typeof $=="string"):[]}});for(let z of Array.isArray(k.runnable)?k.runnable:[]){let J=z&&z.bead_id;typeof J!="string"||We.has(J)||(We.add(J),i.push({...je(J),title:z.title||Ie[J]||J,lane:"runnable",draggable:!0,reason:Wc(De,J),created_at:z.created_at??void 0,updated_at:z.updated_at??void 0,labels:Array.isArray(z.labels)?z.labels:[],spec_reviewer:typeof z.spec_reviewer=="string"?z.spec_reviewer:void 0,plan_state:z.plan_state==="approved"||z.plan_state==="authored"?z.plan_state:"none",workflow:z.route?{route:z.route,chips:{route:z.route}}:null,blocked:z.blocked===!0,...Array.isArray(z.blocked_by)?{blocked_by:z.blocked_by.filter(Ce=>typeof Ce=="string"&&Ce.length>0)}:{},place_index:Fe.length,place_lanes:Ye}))}for(let z of se){let J=z&&z.bead_id;if(typeof J!="string"||We.has(J)||(We.add(J),o!==void 0&&typeof z.added_at=="number"&&z.added_at<o))continue;let Ce=H_(re,J);f.push({...je(J),lane:"done",done:!0,usage:Wt(re,J),done_at:typeof z.added_at=="number"?z.added_at:void 0,done_kind:Ce&&typeof Ce.done_kind=="string"?Ce.done_kind:null})}}let N=new Map;s.forEach((k,B)=>{k&&typeof k.root_dir=="string"&&N.set(k.root_dir,B)});let V=r&&r.running_sort==="repo"?"repo":"started";c.sort((k,B)=>{if(V==="repo"){let te=N.get(k.root_dir)??Number.MAX_SAFE_INTEGER,re=N.get(B.root_dir)??Number.MAX_SAFE_INTEGER;if(te!==re)return te-re}let oe=typeof k.started_at=="number"&&Number.isFinite(k.started_at)?k.started_at:null,de=typeof B.started_at=="number"&&Number.isFinite(B.started_at)?B.started_at:null;return oe!==null&&de!==null&&oe!==de?oe-de:oe===null&&de!==null?1:oe!==null&&de===null?-1:k.id.localeCompare(B.id)}),f.sort((k,B)=>(B.done_at??0)-(k.done_at??0));let K=s.length>0?s:n.map(k=>({root_dir:k&&k.root_dir,name:k&&k.name,auto_advance:k&&k.auto_advance,auto_merge:k&&k.auto_merge,slots:k&&k.slots,revision:k&&k.revision,runner_catalog:k&&k.runner_catalog})),W=[];for(let k of K){if(!k||typeof k.root_dir!="string")continue;let B=R.get(k.root_dir)||[],oe=A.get(k.root_dir)||[];W.push({root_dir:k.root_dir,name:k.name||k.root_dir,auto_advance:k.auto_advance===!0,auto_merge:k.auto_merge===!0,slots:typeof k.slots=="number"&&k.slots>=Wn?k.slots:Wn,revision:typeof k.revision=="number"?k.revision:0,runner_catalog:xt(k.runner_catalog),items:B,sublanes:{parallel:B,serial:oe},serial_lane_count:L.get(k.root_dir)||0})}let I={runnable:i,queue:p,queue_groups:W,running:c,pr_wait:u,done:f,automation:{total:W.length,both_on:W.filter(k=>k.auto_advance&&k.auto_merge).length}},S=pa(I);for(let k of h)S.has(k.id)||S.set(k.id,{root_dir:k.root_dir,workspace_name:k.workspace_name,lane:"done",state:"done"});for(let k of[...I.queue,...I.runnable]){if(!Object.hasOwn(k,"blocked_by"))continue;let B=S.get(k.id);k.blockers=(k.blocked_by||[]).map(oe=>xc(oe,B,S,s)),k.blocker_warnings=k.blockers.filter(oe=>oe.missing_internal).map(oe=>`\u26A0 \uC120\uD589 ${oe.id}\uAC00 \uC5B4\uB290 \uB808\uC778\uC5D0\uB3C4 \uC5C6\uACE0 \uC2E4\uD589 \uC911\uB3C4 \uC544\uB2D8 \u2014 \uC218\uB3D9 \uAC1C\uC785 \uC804\uAE4C\uC9C0 \uC774 \uC790\uB9AC\uC5D0\uC11C \uC815\uC9C0`),k.blocker_warnings.length>0&&(k.alert=!0)}let D=Ac(I.queue_groups);for(let k of I.queue_groups)for(let B of k.sublanes.serial){let oe=D.get(Ec(k.root_dir,B.id));oe&&(B.cross_wait_peers=oe)}return I}function V_(e,t){if(typeof e!="number"||!Number.isFinite(e))return"";let n=t-e<U_;return d`<span
    class="mon-beat${n?" mon-beat--live":""}"
    title=${`\uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${wt(e)}`}
    ><span class="mon-beat__dot" aria-hidden="true"></span>${n?"":d`<span class="mon-beat__age"
          >${Dt(e,t)}</span
        >`}</span
  >`}function zn(e){return d`<div class="mon-c__title">${e.title}</div>`}function Hn(e){return d`<span class="mon-c__id" title="클릭하면 상세로 이동"
    >${e.id}</span
  >`}function no(e){return e.workspace_name?d`<span class="mon-c__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:""}function ka(e){let t=$t(e.usage),r=Qt(e.usage);return t.length>0?t.map(n=>d`<span class="mon-c__usage" title=${n.tooltip}
          >${n.label}</span
        >`):r?d`<span class="mon-c__usage" title=${on(e.usage)}
        >${r}</span
      >`:""}function $a(e){return(Array.isArray(e.badges)?e.badges:[]).map(r=>d`<span class="mon-c__badge${e.alert?" mon-c__badge--alert":""}"
        >${r}</span
      >`)}function K_(e){return d`<span class="mon-c__ops">
    ${e.run_state==="running"?d`<button
          type="button"
          class="mon-op mon-op--pause"
          ?disabled=${e.can_pause===!1}
          aria-label="일시정지"
          title="일시정지 — 세션을 끊고 이어하기 가능 상태로 둡니다"
        >
          ${va()}
        </button>`:d`<button
          type="button"
          class="mon-op mon-op--resume"
          ?disabled=${e.can_resume===!1}
          aria-label="이어하기"
          title="이어하기"
        >
          ${ya()}
        </button>`}
    ${e.discard?.action?d`<button
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
    ${e.run_state==="failed"?d`<button
          type="button"
          class="mon-op mon-op--dismiss"
          aria-label="실패 기록 닫기"
          title="실패 기록 닫기"
        >
          ${qc()}
        </button>`:""}
  </span>`}function zc(e){if(!Object.hasOwn(e,"blocked_by"))return"";let t=Array.isArray(e.blockers)?e.blockers:[];return t.length===0?e.blocked?d`<span class="mon-blocker">🔒 blocked</span>`:"":t.map(r=>d`<span
        class="mon-blocker${r.same_lane_ahead?" mon-blocker--normal":""}"
      >
        <span>${r.label}</span>
        <button
          type="button"
          class="mon-blocker__remove"
          data-blocker-id=${r.id}
          aria-label=${`\uC120\uD589 ${r.id} \uC5F0\uACB0 \uD574\uC81C`}
          title="직렬 연결 해제"
        >
          ✕
        </button>
      </span>`)}function Hc(e){let t=Array.isArray(e.blocker_warnings)?e.blocker_warnings:[];return t.length>0?d`<div class="mon-blocker-warnings">
        ${t.map(r=>d`<div class="mon-blocker-warning">${r}</div>`)}
      </div>`:""}function Gc(){return d`<span class="mon-link mon-popover-owner">
    <button
      type="button"
      class="mon-link__trigger"
      aria-haspopup="dialog"
      aria-expanded="false"
      title="직렬로 연결"
    >
      🔗
    </button>
    <span class="mon-link__popover mon-card-popover" role="dialog" hidden>
      <input
        type="search"
        class="mon-link__search"
        placeholder="id·제목·위치 검색"
        aria-label="직렬로 연결할 버드 검색"
        autocomplete="off"
      />
      <span class="mon-link__list"></span>
      <button type="button" class="mon-link__direct" hidden></button>
      <span class="mon-link__empty" hidden>검색 결과 없음</span>
      <span class="mon-link__error" role="alert" hidden></span>
    </span>
  </span>`}function Y_(e,t){let r=typeof e.started_at=="number"?ba(t-e.started_at):"";return d`${zn(e)}
    <div class="mon-c__meta">
      ${$a(e)}${V_(e.last_event_at,t)}${Hn(e)}${no(e)}
      ${ar(e)?d`<span class="mon-c__model">${ar(e)}</span>`:""}
      ${Sr(e)?d`<span
            class="rtile__resumed"
            title=${Sr(e)}
            >↻</span
          >`:""}
      ${e.serial_lane_id?d`<span class="mon-c__lane">${e.serial_lane_id}</span>`:""}
      ${r?d`<span class="mon-live__elapsed">${r}</span>`:""}
      ${ka(e)}${K_(e)}${vr(e)}
    </div>`}function Z_(e){let t=e.workflow,n=(t&&t.chips||{}).route||t&&t.route,s=typeof e.spec_reviewer=="string"?e.spec_reviewer:"",o=e.plan_state==="approved"?"plan \u2713":e.plan_state==="authored"?"plan \u270E":"plan \u2013",a=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),i=Dt(e.updated_at);return d`${zn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>${Hn(e)}
      ${n?d`<span class="ctl-chip ctl-chip--route">${n}</span>`:""}
      ${s?d`<span
            class="ctl-chip mon-c__review${s==="skipped"?" mon-c__review--dim":""}"
            >spec:${s}</span
          >`:""}
      ${n==="full_plan"?d`<span
            class="ctl-chip mon-c__plan${e.plan_state==="none"?" mon-c__review--dim":""}"
            >${o}</span
          >`:""}
      ${bs(e.labels,null).map(c=>d`<span class="ctl-chip ctl-chip--label">${c}</span>`)}
      ${no(e)}
      ${i?d`<span title=${`\uC218\uC815 ${wt(e.updated_at)}`}
            >수정 ${i}</span
          >`:""}
      ${e.reason?d`<span
            class="mon-c__reason${a?" mon-c__reason--danger":""}"
            >${e.reason}</span
          >`:""}
      ${zc(e)}
      <span class="mon-c__ops">
        ${Gc()}
        <span class="mon-place mon-popover-owner">
          <button
            type="button"
            class="worker-card__place"
            data-bead-id=${e.id}
            aria-haspopup="menu"
            aria-expanded="false"
            title="적재할 대기 레인 선택"
          >
            대기로 ↴
          </button>
          <span class="mon-place__popover mon-card-popover" role="menu" hidden>
            <button
              type="button"
              class="mon-place__choice"
              data-lane="parallel"
              data-place-index=${String(e.place_index??0)}
              role="menuitem"
              aria-label=${`\uBCD1\uB82C \xB7 \uB300\uAE30 ${e.place_index??0}`}
            >
              <strong>병렬</strong><span>대기 ${e.place_index??0}</span>
            </button>
            ${(e.place_lanes||[]).map(c=>d`<button
                  type="button"
                  class="mon-place__choice"
                  data-lane=${c.id}
                  data-place-index=${String(c.index)}
                  role="menuitem"
                  aria-label=${`${c.id} \xB7 ${c.occupied_by.length>0?`\uC810\uC720 ${c.occupied_by.join(", ")}`:"\uBBF8\uC810\uC720"} \xB7 \uB300\uAE30 ${c.length}`}
                >
                  <strong>${c.id}</strong
                  ><span
                    >${c.occupied_by.length>0?`\uC810\uC720 ${c.occupied_by.join(", ")}`:"\uBBF8\uC810\uC720"}
                    · 대기 ${c.length}</span
                  >
                </button>`)}
          </span>
        </span>
      </span>
    </div>
    ${Hc(e)}`}function X_(e){let t=!!e.discard?.operation;return d`${zn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>
      <span class="mon-live__pos">#${e.queue_position}</span>${Hn(e)}
      ${$a(e)}
      ${e.reason?d`<span class="mon-c__reason">${e.reason}</span>`:""}
      ${zc(e)}
      <span class="mon-c__ops">
        ${Gc()}
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
        ${t?d`<button
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
    ${Hc(e)} ${vr(e)}
    ${e.revise_action?d`<div class="mon-c__tail">
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
        </div>`:""}`}function Q_(e){let t=e.merge_step||null,r=!!(Qt(e.usage)||t||e.merge_action||e.cancel_action||e.discard_action);return d`${zn(e)}
    <div class="mon-c__meta">
      ${Hn(e)}${no(e)}
      ${e.pr_url&&e.pr_number?d`<a
            class="mon-c__pr"
            href=${e.pr_url}
            target="_blank"
            rel="noreferrer noopener"
            title="PR 열기"
            >#${e.pr_number} ↗</a
          >`:""}
      ${$a(e)}
      ${e.reason?d`<span class="mon-c__reason">${e.reason}</span>`:""}
    </div>
    ${r?d`<div class="mon-c__tail">
          ${ka(e)}${t?d`<span
                class="merge-step${t.failed?" merge-step--failed":""}"
                style=${`--progress: ${t.percent}%`}
                >${t.label}${t.index>0?d`<span class="merge-step__n"
                      >${t.index}/${t.total}</span
                    >`:""}</span
              >`:""}
          ${e.merge_action?d`<button
                type="button"
                class="worker-mini__merge"
                data-bead-id=${e.id}
                ?disabled=${e.merge_enabled===!1}
                title=${e.merge_title||""}
              >
                ${e.merge_label||"\uBA38\uC9C0"}
              </button>`:""}
          ${e.cancel_action?d`<button
                type="button"
                class="worker-mini__merge-cancel"
                data-bead-id=${e.id}
                ?disabled=${e.cancel_enabled===!1}
                title=${e.cancel_title||""}
              >
                취소
              </button>`:""}
          ${e.discard_action?d`<button
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
          ${vr(e)}
        </div>`:""}`}function J_(e,t){let r=e.done_kind||"",n=r?W_[r]||r:"",s=Dt(e.done_at,t);return d`${zn(e)}
    <div class="mon-c__meta">
      ${Hn(e)}${no(e)}
      ${n?d`<span
            class="mon-live__kind${z_.has(r)?" mon-live__kind--ok":" mon-live__kind--warn"}"
            >${n}</span
          >`:""}
      ${ka(e)}
      ${s?d`<span title=${`\uC644\uB8CC ${wt(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
    </div>`}function Vc(e,t){return e.lane==="running"?Y_(e,t):e.lane==="runnable"?Z_(e):e.lane==="queue"||/^s[1-5]$/.test(e.lane)?X_(e):e.lane==="pr_wait"?Q_(e):J_(e,t)}function Kc(e){let t=String(e.revision),r=e.sublanes?e.sublanes.parallel.length+e.sublanes.serial.reduce((n,s)=>n+s.items.length,0):e.items.length;return d`<header
    class="mon-group__hd${r===0?" is-empty":""}"
    data-root-dir=${e.root_dir}
    data-revision=${t}
  >
    <span class="mon-group__name" title=${e.root_dir}>${e.name}</span>
    <span class="mon-group__count">${r}</span>
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
        ${e.auto_advance?va():ya()}
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
        ${Fc()}
        <span class="mon-ctl__label">머지</span>
      </button>
      <label class="mon-ctl mon-ctl--slots" title="동시에 실행할 세션 수">
        ${jc()}
        <span class="mon-ctl__label">슬롯</span>
        <input
          type="number"
          class="mon-slots__input"
          min=${Wn}
          step="1"
          data-root-dir=${e.root_dir}
          data-revision=${t}
          aria-label=${`${e.name} \uB3D9\uC2DC \uC2E4\uD589 \uC2AC\uB86F`}
          .value=${String(e.slots)}
        />
      </label>
    </span>
  </header>`}function Yc(e){let{total:t,both_on:r}=e.automation,n=t>0&&r===t,s=e.running_sort==="repo"?"repo":"started",o=or.find(i=>i.value===e.done_range)?.label||"",a=Array.isArray(e.token_total)?e.token_total:e.token_total?[{label:e.token_total,tooltip:e.token_tooltip}]:[];return d`<div class="mon-top">
    <button
      type="button"
      class="mon-auto-all${n?" is-active":""}"
      data-on=${n?"false":"true"}
      aria-pressed=${n?"true":"false"}
      ?disabled=${t===0}
      title=${n?"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4 (\uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4)":"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
    >
      ${n?Nc():Bc()}
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
        ${or.map(i=>d`<option
              value=${i.value}
              ?selected=${e.done_range===i.value}
            >
              ${i.label}
            </option>`)}
      </select>
      ${a.map(i=>d`<span
            class="mon-kpi__chip mon-kpi__chip--tokens"
            title=${i.tooltip}
            >${o} 완료 · 누적 ${i.label}</span
          >`)}
    </div>
  </div>`}function Zc(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function Xc(e){let t=(Array.isArray(e)?e:[]).map(i=>i&&i.usage).filter(i=>i&&typeof i=="object"&&"providers"in i);if(t.length>0)return $t(xs(t));let r={};for(let i of _r)r[i]=0;let n=!1,s=0,o=0,a=0;for(let i of Array.isArray(e)?e:[]){let c=i&&i.usage;if(c&&typeof c=="object"){let u=!1;for(let p of _r){let f=c[p];typeof f=="number"&&Number.isFinite(f)&&(r[p]+=f,n=!0,u=!0)}if(u){o+=1;let p=c.total_cost_usd;typeof p=="number"&&Number.isFinite(p)&&(s+=p,a+=1)}}}return o>0&&a===o&&(r.total_cost_usd=s),n?Qt(r):null}var Qc="bdui.monitor.done-range",Jc="bdui.monitor.running_sort",ed="beads-ui.monitor.candidate-filter",xa={show_blocked:!1};function em(){try{let e=window.localStorage.getItem(ed);if(!e)return{...xa};let t=JSON.parse(e);return!t||typeof t!="object"?{...xa}:{show_blocked:t.show_blocked===!0}}catch{return{...xa}}}function tm(e){try{window.localStorage.setItem(ed,JSON.stringify({show_blocked:e.show_blocked}))}catch{}}function rm(e,t){if(t.show_blocked)return{visible:e,hidden_blocked:0};let r=e.filter(n=>n.blocked!==!0);return{visible:r,hidden_blocked:e.length-r.length}}function nm(){try{let e=window.localStorage.getItem(Qc);return Ut(e)?e:Pt}catch{return Pt}}function sm(e){try{window.localStorage.setItem(Qc,e)}catch{}}function om(){try{return window.localStorage.getItem(Jc)==="repo"?"repo":"started"}catch{return"started"}}function am(e){try{window.localStorage.setItem(Jc,e)}catch{}}var td="tab:monitor:pipeline",im=1e3,lm=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}];function so(e,t){let r=(e.lane==="runnable"||e.lane==="queue")&&e.draggable!==!1;return d`<div
    class="mon-card mon-card--${e.lane}${e.alert?" mon-card--alert":""}${e.blocked?" mon-card--blocked":""}"
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
    ${Vc(e,t)}
  </div>`}function cm(e,t){let r=e.serial_lane_count>0||e.sublanes.serial.length>0,n=r?d`<section class="mon-sublane mon-sublane--parallel">
        <header class="mon-sublane__hd">
          <span class="mon-sublane__name">병렬</span>
          <span class="mon-sublane__count"
            >대기 ${e.sublanes.parallel.length}</span
          >
        </header>
        <div class="mon-group__list">
          ${e.sublanes.parallel.map(s=>so(s,t))}
        </div>
      </section>`:d`<div class="mon-group__list">
        ${e.items.map(s=>so(s,t))}
      </div>`;return d`<div class="mon-group" data-root-dir=${e.root_dir}>
    ${Kc(e)} ${n}
    ${r?e.sublanes.serial.map(s=>d`<section
              class="mon-sublane mon-sublane--serial"
              data-serial-lane=${s.id}
            >
              <header class="mon-sublane__hd">
                <span class="mon-sublane__name">${s.id}</span>
                <span class="mon-sublane__count"
                  >대기 ${s.items.length}</span
                >
                ${s.occupied_by.length>0?d`<span class="mon-sublane__held"
                      >${`\u25CF \uC810\uC720 \uC911 \xB7 ${s.occupied_by.join(", ")} (\uBA38\uC9C0\uAE4C\uC9C0 \uC720\uC9C0)`}</span
                    >`:""}
                ${s.corrections>0?d`<span class="mon-sublane__corrections"
                      >순서 자동 교정 ${s.corrections}건</span
                    >`:""}
                ${s.cross_wait_peers?.map(o=>d`<span class="mon-sublane__cross-wait"
                      >⚠ 상호 정지 — ${o.workspace_name}·${o.lane}과 교차
                      대기</span
                    >`)}
              </header>
              ${s.cycle?d`<div class="mon-sublane__cycle">
                    ⛔ 의존 사이클 — 자동 교정 불가
                  </div>`:""}
              <div class="mon-group__list">
                ${s.items.map(o=>so(o,t))}
              </div>
            </section>`):""}
  </div>`}function rd(e,t){let r=_t("views:monitor"),n=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,i=t.switchWorkspace,c=t.now||(()=>Date.now()),u=t.confirm||(g=>typeof globalThis.confirm!="function"||globalThis.confirm(g)),p=nm(),f=om(),h=em();function R(){let g=or.find($=>$.value===p);return g?g.label:""}let A=document.createElement("div");A.className="mon",e.appendChild(A);let L=wa(null,null),N=new Map,V=null,K=null;async function W(g,$,x,M,G=!0){if(!o||!x)return null;let Y=await o(g,{...$,root_dir:x,expected_revision:M});if(Y&&Y.conflict&&G){Y.queue&&N.set(x,Y.queue);let ne=Y.queue&&typeof Y.queue.revision=="number"?Y.queue.revision:M;Y=await o(g,{...$,root_dir:x,expected_revision:ne})}return Y&&Y.queue&&x&&N.set(x,Y.queue),Y}function I(g,$){let x=N.get(g),M=s&&s.get?s.get():null,G=(Array.isArray(M)?M:[]).find(ne=>ne?.root_dir===g);return(x||G)?.merge_queue?.find(ne=>ne.bead_id===$)?.continuation_action}async function S(g,$,x,M){let G=await W(g,$,x,M),Y=N.get(x)?.revision??G?.queue?.revision??M;return fr(G,(ne,ce)=>W(g,{...$,continuation:ne,decision_token:ce},x,Y,!1),{refresh:ne=>W(g,$,x,ne?.queue?.revision??N.get(x)?.revision??Y,!1)})}async function D(g,$,x,M){let G=await fr({continuation_mismatch:M},(ne,ce)=>W("worker-merge-queue-add",{bead_id:$,continuation:ne,decision_token:ce},g,x,!1)),Y=G?.queue?.merge_queue?.find(ne=>ne.bead_id===$)?.continuation_action;G?.applied!==!0&&Y?.continuation===null&&Y.mismatch&&await D(g,$,G.queue.revision,Y.mismatch)}async function k(g,$,x){let M=await W("worker-discard",g,$,x);if(M&&M.discarded===!0){ie(Qs(M),"success",5e3);return}if(M&&M.reason){ie(`\uD3D0\uAE30 \uC2E4\uD328: ${M.reason}`,"error");return}if(M&&M.accepted&&M.pending==="merged_revert"){ie("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(M&&M.accepted){ie(`\uD3D0\uAE30 \uC9C4\uD589: ${M.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}M&&!M.conflict&&ie("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function B(g,$,x){return!o||!x?null:await o(g,{...$,root_dir:x})}async function oe(g){if(!o||!g&&!u("\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB055\uB2C8\uB2E4. \uAC01 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uD568\uAED8 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?"))return;let $=await o("monitor-auto-toggle",{on:g}),x=$&&Array.isArray($.failed)?$.failed:[];x.length>0&&ie(`\uC790\uB3D9\uD654 ${g?"\uCF1C\uAE30":"\uB044\uAE30"} \uC77C\uBD80 \uC2E4\uD328: ${x.map(M=>M.root_dir).join(", ")}`,"error",3200)}async function de(){let g=new Map;for(let $ of L.pr_wait)g.has($.root_dir)||g.set($.root_dir,$.expected_revision);for(let[$,x]of g)await W("worker-merge-queue-add-all",{},$,x)}let te=null,re=!1,Ie=null;function rt(){Ie!==null&&clearTimeout(Ie),Ie=setTimeout(()=>{Ie=null,re=!1},0)}function De(g){let $=g.target;return typeof $?.closest=="function"?$.closest(".mon-group"):null}function ot(g){let $=De(g);return!$||!te?null:($.getAttribute("data-root-dir")||"")===te.root_dir?$:null}function it(){for(let g of Array.from(A.querySelectorAll(".mon-group--drag-over")))g.classList.remove("mon-group--drag-over")}function Ve(g){let $=g.target,x=typeof $?.closest=="function"?$.closest('.mon-card[draggable="true"]'):null;if(x){te={bead_id:x.getAttribute("data-issue-id")||"",lane:x.getAttribute("data-lane")||"",root_dir:x.getAttribute("data-root-dir")||"",revision:Number(x.getAttribute("data-revision")||0)||0,queue_index:Number(x.getAttribute("data-queue-index")),queue_length:Number(x.getAttribute("data-queue-length")),place_index:Number(x.getAttribute("data-place-index"))},re=!0;try{g.dataTransfer?.setData("text/plain",te.bead_id),g.dataTransfer&&(g.dataTransfer.effectAllowed="move")}catch{}}}function be(g){let $=ot(g);$&&(g.preventDefault(),g.dataTransfer&&(g.dataTransfer.dropEffect="move"),$.classList.add("mon-group--drag-over"))}function Le(g){De(g)?.classList.remove("mon-group--drag-over")}function _e(){te=null,it(),rt()}function ye(g){let $=ot(g),x=te;if(te=null,it(),!$||!x||!x.bead_id)return;g.preventDefault();let M=g.target,G=typeof M?.closest=="function"?M.closest('.mon-card[data-lane="queue"]'):null,Y=G&&$.contains(G)?Number(G.getAttribute("data-queue-index")):NaN;if(x.lane==="runnable"){let he=Number.isFinite(Y)?Y:x.place_index;if(!Number.isFinite(he))return;W("worker-queue-place",{bead_id:x.bead_id,index:he},x.root_dir,x.revision);return}if(x.lane!=="queue"||G&&G.getAttribute("data-issue-id")===x.bead_id)return;let ne=x.queue_index,ce=Number.isFinite(Y)?ne>Y?Y:Y-1:x.queue_length-1;!Number.isFinite(ce)||ce<0||ce===ne||W("worker-queue-reorder",{bead_id:x.bead_id,to_index:ce},x.root_dir,x.revision)}function Ae(g){let $=rm(L.runnable,h),x={runnable:$.visible,queue:L.queue,running:L.running,pr_wait:L.pr_wait,done:L.done};return d`${Yc({automation:L.automation,counts:{running:L.running.length,queue:L.queue.length,pr_wait:L.pr_wait.length},running_sort:f,done_range:p,token_total:Xc(L.done),token_tooltip:Zc(R())})}
      <div class="worker-lanes mon-lanes">
        ${lm.map(M=>{let G=x[M.lane],Y=M.lane==="queue"?L.queue_groups.length>0?d`${L.queue_groups.map(ne=>cm(ne,g))}`:void 0:G.length>0?d`${G.map(ne=>so(ne,g))}`:void 0;return rr({id:`monitor-${M.lane}`,lane:M.pane,title:M.lane==="done"?`\uC644\uB8CC\xB7${R()}`:M.title,items:G,empty:M.empty,body:Y,live:M.lane==="running"&&G.length>0,header_control:M.lane==="runnable"?d`<span class="mon-candidate-filter">
                    <label
                      class="worker-filter__tgl"
                      title="blocked 이슈 표시 (기본 숨김)"
                    >
                      <input
                        type="checkbox"
                        class="mon-filter__blocked"
                        .checked=${h.show_blocked}
                      />
                      🔒 blocked
                    </label>
                    ${$.hidden_blocked>0?d`<span class="worker-filter__hidden"
                          >숨김 ${$.hidden_blocked}건</span
                        >`:""}
                  </span>`:M.lane==="pr_wait"&&G.length>0?d`<button
                      type="button"
                      class="mon-lane-op mon-merge-all"
                      title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
                    >
                      일괄 머지
                    </button>`:""})})}
      </div>`}function Ne(){let g=s&&s.get?s.get():null,$=s&&s.getWorkspacesState?s.getWorkspacesState():[],x=c();L=wa(g,$,{done_since:Nr(p,x),running_sort:f}),Qe(Ae(x),A)}function ve(g,$){let x=a?a():void 0;if(!$||!x||$===x||!i){n(g);return}i($).then(()=>{n(g)}).catch(M=>{r("workspace switch for %s failed: %o",$,M)})}function Fe(g){return{root_dir:g.getAttribute("data-root-dir")||"",revision:Number(g.getAttribute("data-revision")||0)||0}}function Ke(g){if(typeof g=="string"&&g.length>0)return g;if(g&&typeof g=="object"){let $=g;if(typeof $.message=="string"&&$.message.length>0)return $.message;if(typeof $.error=="string"&&$.error.length>0)return $.error;if($.error&&typeof $.error=="object"&&typeof $.error.message=="string")return $.error.message}return"\uC5F0\uACB0\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}function xe(g,$){let x=g.querySelector(".mon-link__trigger"),M=g.querySelector(".mon-link__popover"),G=g.querySelector(".mon-link__error");!x||!M||!G||(Te(),M.hidden=!1,x.setAttribute("aria-expanded","true"),G.textContent=$,G.hidden=!1)}async function tt(g,$,x){let M=$.getAttribute("data-root-dir")||"",G=$.getAttribute("data-issue-id")||"";if(!(!G||!x||x===G))try{await B(g,{a:G,b:x},M),Te()}catch(Y){xe($,Ke(Y))}}function H(g,$){let{root_dir:x,revision:M}=Fe(g),G=g.getAttribute("data-issue-id")||"",Y=$.dataset.attemptId||g.getAttribute("data-attempt-id")||"",ne=$.classList;if(ne.contains("mon-link__trigger")){We($);return}if(ne.contains("mon-link__candidate")||ne.contains("mon-link__direct")){let ce=$.dataset.targetId||"";tt("dep-add",g,ce);return}if(ne.contains("mon-blocker__remove")){let ce=$.dataset.blockerId||"";tt("dep-remove",g,ce);return}if(ne.contains("mon-place__choice")){let ce=$.dataset.lane||"parallel",he=Number($.dataset.placeIndex||0)||0;Te(),W("worker-queue-place",{bead_id:G,...ce==="parallel"?{}:{lane:ce},index:he},x,M);return}if(ne.contains("worker-card__place")){je($);return}if(ne.contains("mon-op--up")||ne.contains("mon-op--down")){let ce=Number(g.getAttribute("data-queue-index")||0)||0,he=ne.contains("mon-op--up")?ce-1:ce+1;if(he<0)return;W("worker-queue-reorder",{bead_id:G,.../^s[1-5]$/.test(g.dataset.lane||"")?{lane:g.dataset.lane}:{},to_index:he},x,M);return}if(ne.contains("mon-op--remove")){W("worker-queue-remove",{bead_id:G},x,M);return}if(ne.contains("mon-op--pause")){B("worker-attempt-pause",{attempt_id:Y},x);return}if(ne.contains("mon-op--discard")){if(!u(Fn(G,"unmerged")))return;k({bead_id:G,...Y?{attempt_id:Y}:{},...$.dataset.operationId?{operation_id:$.dataset.operationId}:{}},x,M);return}if(ne.contains("mon-op--resume")){nn().then(ce=>{if(ce!==null)return S("worker-attempt-resume",{attempt_id:Y,...ce!==""?{instructions:ce}:{}},x,M)});return}if(ne.contains("mon-op--dismiss")){W("worker-attempt-dismiss",{attempt_id:Y},x,M);return}if(ne.contains("worker-mini__merge")){let ce=I(x,G);ce?.mismatch&&ce.continuation===null?D(x,G,M,ce.mismatch):W("worker-merge-queue-add",{bead_id:G},x,M);return}if(ne.contains("worker-mini__merge-cancel")){W("worker-merge-queue-remove",{bead_id:G},x,M);return}if(ne.contains("worker-mini__discard")){let ce=$.dataset.discardMode==="merged"?"merged":"unmerged";if(!u(Fn(G,ce)))return;k({bead_id:G,...Y?{attempt_id:Y}:{},...$.dataset.operationId?{operation_id:$.dataset.operationId}:{}},x,M);return}if(ne.contains("worker-mini__revise-fix")){S("worker-revise-fix",{bead_id:G},x,M);return}ne.contains("worker-mini__revise-approve")&&W("worker-revise-approve",{bead_id:G},x,M)}function F(g){g.querySelector(".mon-link__list")?.replaceChildren();let x=g.querySelector(".mon-link__search");x&&(x.value="");let M=g.querySelector(".mon-link__direct");M&&(M.hidden=!0,M.dataset.targetId="",M.textContent="");let G=g.querySelector(".mon-link__empty");G&&(G.hidden=!0);let Y=g.querySelector(".mon-link__error");Y&&(Y.hidden=!0,Y.textContent="")}function se(g,$){let x=g.querySelector(".mon-link__list");if(!x)return;let M=document.createDocumentFragment(),G=Sc(L).filter(Y=>Y.id!==$);for(let Y of G){let ne=document.createElement("button");ne.type="button",ne.className="mon-link__candidate",ne.dataset.targetId=Y.id,ne.dataset.search=`${Y.id} ${Y.title} ${Y.location}`.toLocaleLowerCase();let ce=document.createElement("strong");ce.textContent=Y.id;let he=document.createElement("span");he.textContent=Y.title;let we=document.createElement("small");we.textContent=Y.location,ne.append(ce,he,we),M.append(ne)}x.replaceChildren(M)}function Te(){for(let g of Array.from(A.querySelectorAll(".mon-card-popover"))){let $=g;$.hidden=!0,$.classList.contains("mon-link__popover")&&F($)}for(let g of Array.from(A.querySelectorAll('[aria-expanded="true"]')))g.setAttribute("aria-expanded","false")}function je(g){let x=g.closest(".mon-place")?.querySelector(".mon-place__popover")||null;if(!x)return;let M=x.hidden;Te(),M&&(x.hidden=!1,g.setAttribute("aria-expanded","true"))}function We(g){let x=g.closest(".mon-link")?.querySelector(".mon-link__popover")||null;if(!x)return;let M=x.hidden;if(Te(),M){let G=g.closest(".mon-card");se(x,G?.getAttribute("data-issue-id")||""),x.hidden=!1,g.setAttribute("aria-expanded","true");let Y=x.querySelector(".mon-link__search");Y&&(Se(Y),Y.focus())}}function Se(g){let $=g.closest(".mon-link__popover"),x=g.closest(".mon-card");if(!$||!x)return;let M=g.value.trim(),G=M.toLocaleLowerCase(),Y=0,ne=!1;for(let Oe of Array.from($.querySelectorAll(".mon-link__candidate"))){let ke=Oe,ze=ke.dataset.targetId||"",j=G.length===0||(ke.dataset.search||"").includes(G);ke.hidden=!j,j&&(Y+=1),ze.toLocaleLowerCase()===G&&(ne=!0)}let ce=$.querySelector(".mon-link__direct"),he=x.getAttribute("data-issue-id")||"";if(ce){let Oe=M.length>0&&!ne&&G!==he.toLocaleLowerCase();ce.hidden=!Oe,ce.dataset.targetId=Oe?M:"",ce.textContent=Oe?`\uC9C1\uC811 \uC785\uB825 \xB7 ${M}`:"",Oe&&(Y+=1)}let we=$.querySelector(".mon-link__empty");we&&(we.hidden=Y>0);let Pe=$.querySelector(".mon-link__error");Pe&&(Pe.hidden=!0,Pe.textContent="")}function lt(g){let $=g.target;$&&A.contains($)&&typeof $.closest=="function"&&$.closest(".mon-popover-owner")||Te()}function Ye(g){if(g.key!=="Escape")return;let $=A.querySelector('[aria-expanded="true"]');Te(),$?.focus()}function z(g){let $=re;re=!1;let x=g.target;if(!x||typeof x.closest!="function"||x.closest("dialog")||x.closest("a"))return;let M=x.closest(".mon-running-sort");if(M){g.preventDefault(),f=M.getAttribute("data-sort")==="repo"?"repo":"started",am(f),Ne();return}let G=x.closest(".mon-auto-all");if(G){g.preventDefault(),oe(G.getAttribute("data-on")==="true");return}if(x.closest(".mon-merge-all")){g.preventDefault(),de();return}let ne=x.closest(".mon-ctl--advance");if(ne){g.preventDefault();let{root_dir:Oe,revision:ke}=Fe(ne);W("worker-automation-toggle",{on:ne.getAttribute("data-on")==="true"},Oe,ke);return}let ce=x.closest(".mon-ctl--merge-auto");if(ce){g.preventDefault();let{root_dir:Oe,revision:ke}=Fe(ce);W("worker-merge-auto-toggle",{on:ce.getAttribute("data-on")==="true"},Oe,ke);return}let he=x.closest(".mon-card");if(!he)return;let we=x.closest("button");if(we){g.preventDefault(),H(he,we);return}let Pe=he.getAttribute("data-issue-id");Pe&&!$&&(g.preventDefault(),ve(Pe,he.getAttribute("data-root-dir")||""))}function J(g){let $=g.target;if(!$||typeof $.closest!="function")return;let x=$.closest(".mon-filter__blocked");if(x){h={show_blocked:x.checked},tm(h),Ne();return}let M=$.closest(".mon-done-range");if(M){p=Ut(M.value)?M.value:Pt,sm(p),Ne();return}let G=$.closest(".mon-slots__input");if(!G)return;let{root_dir:Y,revision:ne}=Fe(G),ce=Number(G.value);if(!Number.isFinite(ce))return;let he=Math.max(Wn,Math.floor(ce));W("worker-queue-set-slots",{slots:he},Y,ne)}function Ce(g){let $=g.target;$?.classList.contains("mon-link__search")&&Se($)}e.addEventListener("click",z),e.addEventListener("change",J),e.addEventListener("input",Ce),e.addEventListener("dragstart",Ve),e.addEventListener("dragover",be),e.addEventListener("dragleave",Le),e.addEventListener("drop",ye),e.addEventListener("dragend",_e),document.addEventListener("click",lt),document.addEventListener("keydown",Ye),s&&typeof s.subscribe=="function"&&(V=s.subscribe(()=>{try{N.clear(),Ne()}catch{}}));function Be(){K!==null&&(clearInterval(K),K=null)}function ue(){Ie!==null&&(clearTimeout(Ie),Ie=null)}return{load(){r("load"),Ne(),K===null&&(K=setInterval(()=>{try{if(A.querySelector(".mon-card-popover:not([hidden])"))return;Ne()}catch{}},im))},pause(){Be()},clear(){Be(),ue(),V&&(V(),V=null),e.removeEventListener("click",z),e.removeEventListener("change",J),e.removeEventListener("input",Ce),e.removeEventListener("dragstart",Ve),e.removeEventListener("dragover",be),e.removeEventListener("dragleave",Le),e.removeEventListener("drop",ye),e.removeEventListener("dragend",_e),document.removeEventListener("click",lt),document.removeEventListener("keydown",Ye),e.replaceChildren()}}}function nd(e,t,r){let n=_t("views:nav"),s=null;function o(c){return u=>{u.preventDefault(),n("click tab %s",c),r.gotoView(c)}}function a(){let c=t.getState(),u=c.view==="worker"||c.view==="monitor"?c.view:"board";return d`
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
    `}function i(){Qe(a(),e)}return i(),s=t.subscribe(()=>i()),{destroy(){s&&(s(),s=null),Qe(d``,e)}}}var sd=["bug","feature","task","epic","chore"];function od(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var ad=["Critical","High","Medium","Low","Backlog"];function id(e,t){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,e.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),a=r.querySelector("#new-priority"),i=r.querySelector("#new-labels"),c=r.querySelector("#new-description"),u=r.querySelector("#new-issue-error"),p=r.querySelector("#btn-cancel"),f=r.querySelector("#btn-create"),h=r.querySelector(".new-issue__close");function R(){o.replaceChildren();let S=document.createElement("option");S.value="",S.textContent="\u2014 Select \u2014",o.appendChild(S);for(let D of sd){let k=document.createElement("option");k.value=D,k.textContent=od(D),o.appendChild(k)}a.replaceChildren();for(let D=0;D<=4;D+=1){let k=document.createElement("option");k.value=String(D);let B=ad[D]||"Medium";k.textContent=`${D} \u2013 ${B}`,a.appendChild(k)}}R();function A(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function L(S){s.disabled=S,o.disabled=S,a.disabled=S,i.disabled=S,c.disabled=S,p.disabled=S,f.disabled=S,f.textContent=S?"Creating\u2026":"Create"}function N(){u.textContent=""}function V(S){u.textContent=S}function K(){try{let S=window.localStorage.getItem("beads-ui.new.type");S?o.value=S:o.value="";let D=window.localStorage.getItem("beads-ui.new.priority");D&&/^\d$/.test(D)?a.value=D:a.value="2"}catch{o.value="",a.value="2"}}function W(){let S=o.value||"",D=a.value||"";S.length>0&&window.localStorage.setItem("beads-ui.new.type",S),D.length>0&&window.localStorage.setItem("beads-ui.new.priority",D)}async function I(){N();let S=String(s.value||"").trim();if(S.length===0){V("Title is required"),s.focus();return}let D=Number(a.value||"2");if(!(D>=0&&D<=4)){V("Priority must be 0..4"),a.focus();return}let k=String(o.value||""),B=String(c.value||""),oe={title:S};k.length>0&&(oe.type=k),String(D).length>0&&(oe.priority=D),B.length>0&&(oe.description=B),L(!0);try{await t("create-issue",oe)}catch{L(!1),V("Failed to create issue");return}W(),L(!1),A()}return r.addEventListener("cancel",S=>{S.preventDefault(),A()}),h.addEventListener("click",()=>A()),p.addEventListener("click",()=>A()),r.addEventListener("keydown",S=>{S.key==="Enter"&&(S.ctrlKey||S.metaKey)&&(S.preventDefault(),I())}),n.addEventListener("submit",S=>{S.preventDefault(),I()}),{open(){n.reset(),N(),K();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){A()}}}var dm=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function um(e,t){return To(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function ld(e,t,r){return d`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?d`<div class="settings-dialog__empty">라벨 없음</div>`:d`<div class="settings-dialog__pills">
            ${t.map(n=>{let s=um(n,e);return d`<button
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
  `}function cd(e,t,r){return d`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">숨김 prefix</div>
      <div class="settings-dialog__prefixes">
        ${e.hidden_prefixes.map(n=>d`<span class="settings-dialog__prefix">
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
  `}function dd(e,t){return d`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${dm.map(([r,n])=>d`<label class="settings-dialog__toggle">
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
  `}var pm=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}],Nt="";function qt(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function ud(e,t){let{transport:r,policyStore:n,labelOptions:s}=t,o=t.notify||(g=>ie(g,"error",4e3)),a=document.createElement("dialog");a.id="settings-dialog",a.className="settings-dialog",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","\uC124\uC815"),e.appendChild(a);let i="execution",c=!1,u="",p={},f={},h=[],R=!1,A=null,L={},N="",V="",K=!1,W=!1,I=!1,S=null;function D(){let g=t.queueStore?.get();return qt(g)?g.runner_catalog:null}function k(){let g=t.queueStore?.get();return qt(g)&&qt(g.execution_defaults)?g.execution_defaults:null}function B(){let g=t.implPresetStore?.get();return qt(g)&&Array.isArray(g.presets)?g:null}async function oe(){R=!0,Se();try{let g=await r("get-session-defaults",{});p=qt(g?.values)?{...g.values}:{},f={...p},h=Array.isArray(g?.warnings)?g.warnings:[]}catch(g){h=["kv_read_failed"],o(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${g instanceof Error?g.message:String(g)}`)}finally{R=!1,Se()}}async function de(){let g=tc(p,f);if(Object.keys(g).length!==0){try{let $=await r("set-session-defaults",{values:g});p=qt($?.values)?{...$.values}:{},f={...p},h=Array.isArray($?.warnings)?$.warnings:[]}catch($){o(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${$ instanceof Error?$.message:String($)}`)}Se()}}function te(g,$){$===Nt?delete f[g]:f[g]=$,Se(),de()}async function re(){let g=t.queueStore?.get();if(!qt(g))return;let $={orchestration_model:g.orchestration_model??null,orchestration_effort:g.orchestration_effort??null,orchestration_speed:g.orchestration_speed??null},x=rc($,{...$,...L});if(Object.keys(x).length!==0){try{let M=await r("worker-queue-set-orchestration-defaults",{expected_revision:g.revision,values:x});if(M&&M.applied===!1){o("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}L={}}catch(M){o(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${M instanceof Error?M.message:String(M)}`)}Se()}}function Ie(g,$){L[g]=$===Nt?null:$,Se(),re()}async function rt(g){let $=t.queueStore?.get();if(!(!qt($)||g<1)){try{await r("worker-queue-set-slots",{expected_revision:$.revision,slots:g})}catch(x){o(`slots \uC800\uC7A5 \uC2E4\uD328: ${x instanceof Error?x.message:String(x)}`)}Se()}}function De(){let g={},$=Fe();for(let x of Ql){let M=Cr.includes(x)?$[x]:f[x];typeof M=="string"&&M.length>0&&(g[x]=M)}return g}async function ot(){let g=B();if(!g)return;let $=De();if(Object.keys($).length===0){o("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let x=(g.presets||[]).find(G=>G.id===N),M=V.trim()||(x?x.name:"");if(!M){o("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let G=x?await r("impl-preset-update",{expected_revision:g.revision,id:x.id,name:M,settings:$}):await r("impl-preset-create",{expected_revision:g.revision,name:M,settings:$});if(G&&G.applied){if(V="",!x&&Array.isArray(G.presets)){let Y=G.presets.find(ne=>ne.name===M);N=Y?Y.id:N}Se()}else o("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Se()}catch(G){o(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${G instanceof Error?G.message:String(G)}`)}}async function it(){let g=B();if(!(!g||N.length===0))try{let $=await r("impl-preset-delete",{expected_revision:g.revision,id:N});$&&$.applied?(N="",Se()):(o("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Se())}catch($){o(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${$ instanceof Error?$.message:String($)}`)}}async function Ve(){let g=B(),$=t.queueStore?.get();if(!(!g||!qt($)||N.length===0)){try{let x=await r("apply-impl-preset-global",{preset_id:N,expected_revision:g.revision,expected_queue_revision:$.revision});x&&x.applied?(p=qt(x.values)?{...x.values}:{},f={...p},h=Array.isArray(x.warnings)?x.warnings:[],qt(x.queue)&&(t.queueStore?.set?.(x.queue),L={}),x.queue_applied===!1&&o("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694")):x&&x.conflict&&o("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(x){o(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${x instanceof Error?x.message:String(x)}`)}Se()}}async function be(){W=!0,I=!1,Se();try{let g=await r("get-worker-system-prompt",{});!g||typeof g!="object"||Array.isArray(g)?I=!0:S=g}catch{I=!0}finally{W=!1,Se()}}function Le(){if(K=!K,K&&!S){be();return}Se()}function _e(){let g=ln({loading:W,error:I});if(g)return g;if(!S)return"";let $=Array.isArray(S.variants)?S.variants:[];return d`<div class="settings-dialog__sp-body">
      ${S.target_base_placeholder?d`<div class="prompt-block__meta">
            \`${S.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${$.map(x=>d`<div class="settings-dialog__sp-variant" data-variant=${x.key}>
            <div class="settings-dialog__sp-cond">${x.condition}</div>
            ${hr(x.label,x.system_prompt)}
          </div>`)}
    </div>`}function ye(){return d`<section
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
        aria-expanded=${K?"true":"false"}
        @click=${Le}
      >
        ${K?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${K?_e():""}
    </section>`}function Ae(g,$,x,M,G,Y){let ne=G[g]??Nt,ce=na(g,x,G,k(),D()),he=ce.options.find(Pe=>Pe.value===ne),we=ne===Nt?ce.full_value:he?.full_value;return d`<select
        class=${ne===Nt?"settings-dialog__unset":""}
        data-key=${g}
        aria-label=${$}
        title=${we||""}
        ?disabled=${Y===!0||ce.disabled}
        .value=${Wr(String(ne))}
        @change=${Pe=>M(g,String(Pe.target.value))}
      >
        <option value=${Nt} ?selected=${ne===Nt}>
          ${ce.unset_label}
        </option>
        ${ce.options.map(Pe=>d`<option
              value=${Pe.value}
              title=${Pe.full_value||""}
              ?selected=${Pe.value===ne}
            >
              ${Pe.label}
            </option>`)}
      </select>
      ${ne===Nt?d`<span class="settings-dialog__source-badge">기본</span>`:""}`}function Ne(g,$,x,M,G,Y=!1){return d`<div
      class=${`settings-dialog__row${Y?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${$}</span>
      <span class="settings-dialog__controls">
        ${Ae(g,$,x,M,G,Y)}
      </span>
    </div>`}function ve(g,$,x,M,G){return d`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${$}-on)`}
        ></i>
        ${g}
      </span>
      <span class="settings-dialog__controls">
        ${Ae(x,`${g} \uBAA8\uB378`,M,te,f,!1)}
        ${Ae(G,`${g} effort`,zs,te,f,!1)}
      </span>
    </div>`}function Fe(){let g=t.queueStore?.get(),$={};for(let x of Cr)$[x]=Object.prototype.hasOwnProperty.call(L,x)?L[x]:qt(g)&&typeof g[x]=="string"?g[x]:null;return $}function Ke(){let g=D(),$=ec(f),x=f.impl_runtime,M=f.impl_model,G=B(),Y=t.queueStore?.get(),ne=Fe(),ce=Gs(g,A),he=cn(g,A||void 0,ne.orchestration_model||lr).filter(ke=>ke!==lr),we=qt(Y)&&typeof Y.slots=="number"?Y.slots:2,Pe=k()?.supported===!0,Oe=na("workflow_mode",Dn,f,k(),g);return d`
      <section
        class=${`settings-dialog__pane${i==="execution"?" settings-dialog__pane--active":""}`}
        role="tabpanel"
        id="settings-pane-execution"
        aria-label="실행 설정"
      >
        <header class="settings-dialog__pane-head"><h2>실행 설정</h2></header>
        <p class="settings-dialog__pane-sub">
          세션 기본값과 Worker 오케스트레이션을 한곳에서 편집합니다. 저장소와
          저장 경로는 설정 그룹별로 유지됩니다.
        </p>
        ${h.length>0?d`<div class="settings-dialog__banner" role="alert">
              워크스페이스 기본값을 일부 읽지 못했습니다 —
              ${h.join(", ")}
            </div>`:""}
        ${Pe?"":d`<div
              class="settings-dialog__banner settings-dialog__banner--projection"
              data-execution-defaults-warning
              role="alert"
            >
              실행 기본값 projection을 확인할 수 없습니다 — 기본값 확인 불가
            </div>`}
        ${R?d`<div class="settings-dialog__empty">불러오는 중…</div>`:d`
              <div class="settings-dialog__preset-bar">
                <select
                  aria-label="실행 프리셋"
                  .value=${Wr(N)}
                  @change=${ke=>{N=String(ke.target.value),Se()}}
                >
                  <option value="" ?selected=${N===""}>
                    실행 프리셋…
                  </option>
                  ${(G?.presets||[]).map(ke=>d`<option
                        value=${ke.id}
                        ?selected=${ke.id===N}
                      >
                        ${ke.name}
                      </option>`)}
                </select>
                <button
                  type="button"
                  class="settings-dialog__btn settings-dialog__btn--primary"
                  data-preset-apply-global
                  ?disabled=${N.length===0}
                  @click=${Ve}
                >
                  전역 기본값으로 적용
                </button>
                <input
                  type="text"
                  class="settings-dialog__preset-name"
                  placeholder=${N?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                  aria-label="프리셋 이름"
                  .value=${Wr(V)}
                  @input=${ke=>{V=String(ke.target.value)}}
                />
                <button
                  type="button"
                  class="settings-dialog__btn"
                  data-preset-save
                  @click=${ot}
                >
                  ${N?"\uAC31\uC2E0":"\uC800\uC7A5"}
                </button>
                <button
                  type="button"
                  class="settings-dialog__btn"
                  data-preset-delete
                  ?disabled=${N.length===0}
                  @click=${it}
                >
                  삭제
                </button>
              </div>

              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">오케스트레이션</div>
                <div class="settings-dialog__row">
                  <span class="settings-dialog__row-label">런타임</span>
                  <span class="settings-dialog__controls">
                    <select
                      aria-label="런타임"
                      data-key="orchestration_runtime_filter"
                      .value=${Wr(A||Nt)}
                      @change=${ke=>{let ze=String(ke.target.value);A=ze===Nt?null:ze,Se()}}
                    >
                      <option
                        value=${Nt}
                        ?selected=${!A}
                      >
                        전체
                      </option>
                      <option
                        value="claude"
                        ?selected=${A==="claude"}
                      >
                        claude
                      </option>
                      <option
                        value="codex"
                        ?selected=${A==="codex"}
                      >
                        codex
                      </option>
                    </select>
                    <span class="settings-dialog__hint"
                      >모델 목록을 좁힙니다</span
                    >
                  </span>
                </div>
                ${Ne("orchestration_model","\uBAA8\uB378",ce,Ie,ne)}
                ${Ne("orchestration_effort","effort",he,Ie,ne)}
                ${Ne("orchestration_speed","\uC18D\uB3C4",Pn,Ie,ne)}
              </div>

              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">워크플로우</div>
                <div class="settings-dialog__row">
                  <span class="settings-dialog__row-label">모드</span>
                  <span class="settings-dialog__controls">
                    <span class="settings-dialog__seg" role="group">
                      <button
                        type="button"
                        data-mode=${Nt}
                        aria-pressed=${String(!f.workflow_mode)}
                        @click=${()=>te("workflow_mode",Nt)}
                      >
                        ${Oe.unset_label}
                      </button>
                      ${f.workflow_mode?"":d`<span class="settings-dialog__source-badge"
                            >기본</span
                          >`}
                      ${Dn.map(ke=>d`<button
                            type="button"
                            data-mode=${ke}
                            aria-pressed=${String(f.workflow_mode===ke)}
                            @click=${()=>te("workflow_mode",ke)}
                          >
                            ${ke}
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
                ${ve("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",Nn,"spec_review_effort")}
                ${ve("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",Ws,"plan_review_effort")}
                ${ve("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",Nn,"impl_review_effort")}
              </div>

              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">
                  구현
                  <span class="settings-dialog__hint"
                    >이슈 핀이 있으면 핀이 우선합니다</span
                  >
                </div>
                ${Ne("impl_dispatch","\uC2E4\uD589 \uBC29\uC2DD",Bs,te,f)}
                ${Ne("impl_runtime","\uC704\uC784 \uB300\uC0C1",Us,te,f,$)}
                ${Ne("impl_model","\uBAA8\uB378",Hs(g,x),te,f,$)}
                ${Ne("impl_effort","effort",cn(g,x,M),te,f,$)}
                ${Ne("impl_speed","\uC18D\uB3C4",Pn,te,f,$)}
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
                        @click=${()=>rt(we-1)}
                      >
                        −
                      </button>
                      <span class="settings-dialog__stepper-value"
                        >${we}</span
                      >
                      <button
                        type="button"
                        aria-label="slots 증가"
                        @click=${()=>rt(we+1)}
                      >
                        +
                      </button>
                    </span>
                  </span>
                </div>
              </div>
              ${ye()}
            `}
      </section>
    `}function xe(){let g=n.get();return d`
      <section
        class=${`settings-dialog__pane${i==="display"?" settings-dialog__pane--active":""}`}
        role="tabpanel"
        id="settings-pane-display"
        aria-label="표시 설정"
      >
        <header class="settings-dialog__pane-head"><h2>표시 설정</h2></header>
        <p class="settings-dialog__pane-sub">
          이 워크스페이스의 라벨·칩 표시 정책입니다.
        </p>
        ${g?d`
              ${ld(g,s(),se)}
              ${cd(g,u,{onDraft:$=>{u=$},onAdd:Te,onRemove:je})}
              ${dd(g,We)}
            `:d`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function tt(g){let $=n.get();if($)try{let x=await r("display-policy-set",{expected_revision:$.revision,policy:g($)});H(x),x&&x.conflict&&x.policy&&(x=await r("display-policy-set",{expected_revision:x.policy.revision,policy:g(x.policy)}),H(x)),x&&x.conflict&&o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function H(g){g&&g.policy&&typeof g.policy=="object"&&n.set(g.policy)}function F(g){tt(g)}function se(g){let $=n.get();if(!$)return;let x=!fm(g,$);F(M=>_m(g,M,x))}function Te(){let g=u.trim();g.length!==0&&(u="",F($=>$.hidden_prefixes.includes(g)?{hidden_prefixes:$.hidden_prefixes}:{hidden_prefixes:[...$.hidden_prefixes,g]}),Se())}function je(g){F($=>({hidden_prefixes:$.hidden_prefixes.filter(x=>x!==g)}))}function We(g){let $=n.get();if(!$)return;let x=$.chips[g]===!1;F(()=>({chips:{[g]:x}}))}function Se(){Qe(d`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${pm.map(g=>d`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${g.id}
                  aria-selected=${String(i===g.id)}
                  aria-controls=${`settings-pane-${g.id}`}
                  @click=${()=>lt(g.id)}
                >
                  <span class="settings-dialog__glyph">${g.glyph}</span>
                  ${g.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${ue}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${Ke()} ${xe()}
          </div>
        </div>
      `,a)}function lt(g){i=g,Se()}let Ye=()=>{c=!1,t.onOpenChange?.(!1)};a.addEventListener("close",Ye),a.addEventListener("cancel",Ye);let z=g=>{g.target===a&&ue()};a.addEventListener("click",z);let J=null;n.subscribe&&(J=n.subscribe(()=>{c&&Se()}));let Ce=null;t.implPresetStore?.subscribe&&(Ce=t.implPresetStore.subscribe(()=>{c&&Se()}));function Be(g="execution"){c||(c=!0,t.onOpenChange?.(!0),i=g,u="",L={},Se(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),oe())}function ue(){c&&(c=!1,t.onOpenChange?.(!1),typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:Be,close:ue,sessionDraft:()=>({...f}),destroy(){c=!1,a.removeEventListener("close",Ye),a.removeEventListener("cancel",Ye),a.removeEventListener("click",z),J&&(J(),J=null),Ce&&(Ce(),Ce=null),a.remove()}}}function fm(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(r=>r.length>0&&e.startsWith(r))}function _m(e,t,r){if(!r)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let n=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:n,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:n}}var mm=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function pd(e){return String(e).padStart(2,"0")}function gm(e,t){let r=Math.max(0,Math.ceil((e-t)/6e4)),n=Math.floor(r/1440),s=Math.floor(r%1440/60),o=r%60;return n>0?`${n}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function bm(e,t=Date.now()){let r=Date.parse(e);if(!Number.isFinite(r))return"";let n=new Date(r),s=new Date(t),o=`${pd(n.getHours())}:${pd(n.getMinutes())}`,i=n.getFullYear()===s.getFullYear()&&n.getMonth()===s.getMonth()&&n.getDate()===s.getDate()?o:`${mm[n.getMonth()]} ${n.getDate()} ${o}`;return`${gm(r,t)} \xB7 ${i}`}function hm(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}var fd=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage"}];function _d(e){let t=!1,r=null,n=new Map;function s(){Qe(d``,e),e.hidden=!0}function o(){let c=fd.filter(p=>n.has(p.key));if(c.length===0){s();return}let u=Date.now();Qe(d`<div class="usage-meter" aria-label="Usage">
        ${c.map(p=>{let f=n.get(p.key),h=typeof f.ageSeconds=="number"&&f.ageSeconds>600,R=h?`${Math.floor(f.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"";return d`<span
            class="usage-meter__group${h?" usage-meter__group--stale":""}"
            aria-label=${`${p.label} usage`}
          >
            <span class="usage-meter__provider">${p.label}</span>
            ${f.windows.map(A=>{let L=typeof A.pct=="number"&&Number.isFinite(A.pct)?A.pct:0,N=Math.min(100,Math.max(0,L)),K=`resets ${bm(A.resetsAt,u)}${h?` \xB7 ${R}`:""}`;return d`<span
                class="usage-meter__window ${hm(N)}"
                style=${`--progress: ${N}%`}
                title=${K}
              >
                <span class="usage-meter__label">${A.key}</span>
                <span class="usage-meter__track" aria-hidden="true">
                  <span class="usage-meter__fill"></span>
                </span>
                <span class="usage-meter__pct">${N}%</span>
              </span>`})}
          </span>`})}
      </div>`,e),e.hidden=!1}async function a(c){try{let u=await fetch(c.endpoint);if(!u.ok)return null;let p=await u.json();return!p||p.available!==!0||!Array.isArray(p.windows)?null:p}catch{return null}}async function i(){let c=await Promise.all(fd.map(async u=>({provider:u,payload:await a(u)})));if(!t){for(let u of c)u.payload?n.set(u.provider.key,u.payload):n.delete(u.provider.key);o()}}return s(),i(),r=setInterval(()=>{i()},6e4),{destroy(){t=!0,r!==null&&(clearInterval(r),r=null),s()}}}function md(e){let t=e.attempts?Object.values(e.attempts):[],r=new Map;for(let s of t)s&&r.set(s.bead_id,s.attempt_id);let n=new Map;for(let s of e.done||[])s&&typeof s.bead_id=="string"&&typeof s.added_at=="number"&&n.set(s.bead_id,s.added_at);return s=>{let o=r.get(s.bead_id)!==s.attempt_id,a=n.get(s.bead_id),i=typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at;return!o&&!i&&typeof s.dismissed_at!="number"}}var ym="worker-ineligible";function Aa(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Sa(e){return Aa(e).includes(ym)}var vm="worker-serial";function Ea(e){return Aa(e).includes(vm)}function Ta(e,t,r){if(typeof t!="string"||typeof r!="string")return[];let n=e?.runners;if(!n||!Object.hasOwn(n,t))return[];let s=n[t],o=s?.models;if(!o||!Object.hasOwn(o,r))return[];let a=o[r]?.efforts;return Array.isArray(a)?a.slice():Array.isArray(s.efforts)?s.efforts.slice():[]}var wm=new Set(["done","failed","orphaned","stopped","discarded"]),km={spec_missing:"\uC2A4\uD399 \uC5C6\uC74C",route:"route \uBBF8\uB2EC",spec_review:"\uC2A4\uD399 \uB9AC\uBDF0 \uC5C6\uC74C",spec_conflict:"\uC2A4\uD399 \uCDA9\uB3CC",phase_child:"phase child",worker_ineligible:"worker \uC81C\uC678"},$m={running:"\uC2E4\uD589 \uC911",success:"\uC131\uACF5",failure:"\uC2E4\uD328",cancelled:"\uCDE8\uC18C",interrupted:"\uC911\uB2E8"},xm={running:"running",success:"done",failure:"failed",cancelled:"stopped",interrupted:"orphaned"};function Ca(e){return{runner:e.runner||void 0,model:e.model||void 0,effort:e.effort||void 0,status:xm[e.outcome]||(typeof e.job_id=="string"?"running":void 0),session_id:e.session_id||void 0}}function gd(e,t){let{queueStore:r,analysisStore:n,transport:s,getWorkspacePath:o,onOpenTranscript:a}=t,i=document.createElement("dialog");i.id="worker-parallel-analysis-dialog",i.className="pa",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),e.appendChild(i);let c=new Map,u=new Map,p=!1,f=null,h=null,R=null,A=new Set,L=!1,N=0,V=null,K=new Set;function W(){return r&&r.get()||{revision:0,queue:[],serial_lanes:[],serial_lane_count:0,attempts:{},pr_wait:[]}}function I(){return n&&n.get()||{settings:{revision:0,runner:null,model:null,effort:null},job:null,runs:[],last_good:null}}function S(){return o&&o()||""}async function D(){if(!s)return;let w=++N;L=!0,R=null,A.clear(),he();try{let C=await s("worker-parallel-analysis-targets",{root_dir:S()});if(w!==N||!we)return;let P=Array.isArray(C?.qualified)?C.qualified:[],Z=Array.isArray(C?.excluded)?C.excluded:[];R={qualified:P,excluded:Z};for(let pe of P)pe&&typeof pe.id=="string"&&A.add(pe.id)}catch{w===N&&we&&(R={qualified:[],excluded:[]},ie("\uBD84\uC11D \uB300\uC0C1\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800))}finally{w===N&&(L=!1,we&&he())}}function k(w){return Array.isArray(w.runs)?w.runs:[]}function B(){let w=W(),C=new Set;for(let P of Object.values(w.attempts||{})){let Z=P;Z&&typeof Z.bead_id=="string"&&!wm.has(Z.status)&&C.add(Z.bead_id)}for(let P of Array.isArray(w.pr_wait)?w.pr_wait:[])P&&typeof P.bead_id=="string"&&C.add(P.bead_id);for(let P of Object.values(w.discard_operations||{})){let Z=P;Z&&Z.phase!=="done"&&typeof Z.bead_id=="string"&&C.add(Z.bead_id)}return C}function oe(w){return w.filter(C=>de(C)===null)}function de(w){let C=W();for(let P of Array.isArray(C.serial_lanes)?C.serial_lanes:[])if(Array.isArray(P?.entries)&&P.entries.some(Z=>Z.bead_id===w))return P.id;return(Array.isArray(C.queue)?C.queue:[]).some(P=>P.bead_id===w)?"parallel":null}function te(w,C){let P=c.get(w);return P||[...C.order]}function re(w){if(w.length<2)return!1;let C=de(w[0]);if(!C||C==="parallel")return!1;let P=W(),Z=(Array.isArray(P.serial_lanes)?P.serial_lanes:[]).find($e=>$e.id===C)?.entries.map($e=>$e.bead_id);if(!Array.isArray(Z))return!1;let pe=w.map($e=>Z.indexOf($e));return pe.every($e=>$e>=0)&&pe.every(($e,X)=>X===0||$e>pe[X-1])}function Ie(){let w=W(),C=Array.isArray(w.serial_lanes)?w.serial_lanes:[],P=C.find(Z=>Array.isArray(Z.entries)&&Z.entries.length===0);return P?P.id:C[0]?.id||"s1"}function rt(w){let C=W().bead_titles||{};return typeof C[w]=="string"?C[w]:w}async function De(w,C){if(!s||p)return null;p=!0,he();try{return await s(w,C)}finally{p=!1,he()}}async function ot(w){n?.setPending?.(!0);try{let C=await De("worker-parallel-analysis-start",{force:w,target_ids:Array.from(A)});C&&C.applied===!1&&C.reason&&(C.reason==="target_not_qualified"&&Array.isArray(C.detail)?ie(`\uBD84\uC11D \uB300\uC0C1 \uC790\uACA9 \uBCC0\uACBD: ${C.detail.join(", ")}`,"error",3200):ie(`\uBD84\uC11D \uC2E4\uD328: ${C.reason}`,"error",2800))}finally{n?.setPending?.(!1)}}async function it(){let w=I().job;!s||!w||await s("worker-parallel-analysis-cancel",{job_id:w.job_id})}async function Ve(w){if(!(!s||K.has(w))){K.add(w),he();try{let C=await s("worker-parallel-analysis-prompt",{root_dir:S(),run_id:w});if(!we)return;if(C?.ok===!0&&typeof C.prompt=="string"){V={run_id:w,prompt:C.prompt};return}ie(C?.reason==="not_found"?"\uC800\uC7A5\uB41C \uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800)}finally{K.delete(w),he()}}}function be(){V=null,he()}async function Le(){if(!V)return;let w=await Xt(V.prompt);ie(w?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",w?"success":"error",1400)}function _e(w,C){a&&a(w,Ca(C))}function ye(){return W().runner_catalog}function Ae(w){return Object.keys(ye()?.runners?.[w]?.models||{})}function Ne(w){let C=Ae(w),P=ye()?.runners?.[w]?.default_model;return typeof P=="string"&&C.includes(P)?P:C[0]||""}function ve(){let w=I().settings,C=f||w.runner||"claude",P=Ae(C),Z=f?Ne(C):w.model||P[0]||"",pe=Ta(ye(),C,Z),$e=w.effort||"",X=pe.includes($e)?$e:pe[0]||"";return{runner:C,model:Z,effort:X,models:P,efforts:pe}}async function Fe(w){let C=I().settings,P=await De("worker-parallel-analysis-settings-update",{expected_revision:C.revision,runner:w.runner,model:w.model,effort:w.effort});(!P||P.applied!==!0)&&(f=null,he(),P&&P.reason&&ie(`\uBD84\uC11D \uC124\uC815 \uAC70\uBD80: ${P.reason}`,"error",2800))}function Ke(w){f=w,he();let C=ve();Fe({runner:w,model:C.model,effort:C.effort})}function xe(w){let C=ve(),P=Ta(ye(),C.runner,w);Fe({runner:C.runner,model:w,effort:P.includes(C.effort)?C.effort:P[0]||""})}function tt(w){let C=ve();Fe({runner:C.runner,model:C.model,effort:w})}async function H(w,C){if(!s||p)return;let P=te(w,C),Z=I();if(P.length<2||!Z.last_good){ie("\uC81C\uCD9C\uD558\uB824\uBA74 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4","warning");return}let pe=u.get(w)||Ie(),$e=()=>({snapshot_digest:Z.last_good.identity_digest,group_index:w,lane:pe,ordered_bead_ids:P,expected_revision:W().revision});p=!0,he();try{let X=await s("worker-parallel-analysis-submit",$e());X&&X.queue&&r&&r.set(X.queue),X&&X.applied!==!0&&X.conflict===!0&&(X=await s("worker-parallel-analysis-submit",$e()),X&&X.queue&&r&&r.set(X.queue)),X&&X.applied===!0?(c.delete(w),ie(`\uC9C1\uB82C \uB808\uC778 ${pe}\uC5D0 ${P.length}\uAC1C \uBC30\uCE58`,"success")):ie(`\uC81C\uCD9C \uAC70\uBD80: ${X?.reason||"conflict"} (\uD050 \uBB34\uBCC0\uACBD)`,"error",2800)}finally{p=!1,he()}}function F(w,C,P){c.set(w,te(w,C).filter(Z=>Z!==P)),he()}function se(w){c.delete(w),he()}function Te(w,C,P,Z){let pe=[...te(w,C)],$e=pe.indexOf(P),X=$e+Z;$e<0||X<0||X>=pe.length||(pe.splice(X,0,...pe.splice($e,1)),c.set(w,pe),he())}function je(){let w=I().settings,C=Object.keys(ye()?.runners||{}),P=ve();return d`<div class="pa-settings">
      <label class="pa-settings__field"
        >러너
        <select
          class="pa-settings__runner"
          aria-label="분석 러너"
          @change=${Z=>Ke(Z.target.value)}
        >
          ${C.map(Z=>d`<option
                value=${Z}
                ?selected=${P.runner===Z}
              >
                ${Z}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >분석 모델
        <select
          class="pa-settings__model"
          aria-label="분석 모델"
          @change=${Z=>xe(Z.target.value)}
        >
          ${P.models.map(Z=>d`<option
                value=${Z}
                ?selected=${P.model===Z}
              >
                ${Z}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >effort
        <select
          class="pa-settings__effort-select"
          aria-label="분석 effort"
          @change=${Z=>tt(Z.target.value)}
        >
          ${P.efforts.map(Z=>d`<option
                value=${Z}
                ?selected=${P.effort===Z}
              >
                ${Z}
              </option>`)}
        </select>
      </label>
      ${We(w)}
    </div>`}function We(w){return!lt(w)||Se(w)?d`<span class="pa-settings__unset">분석 모델 설정 필요</span>`:w.compatible===!1?d`<span class="pa-settings__incompatible"
        >설정 비호환 — 저장된 ${w.runner}/${w.model} · effort
        ${w.effort} 을(를) 카탈로그가 더는 제공하지 않습니다</span
      >`:w.is_default===!0?d`<span class="pa-settings__default">기본값</span>`:""}function Se(w){return w.is_default===!0&&w.compatible===!1}function lt(w){return!!(w.runner&&w.model&&w.effort)}function Ye(w){return lt(w)&&w.compatible!==!1}function z(w){let C=Math.max(0,Math.floor(w/1e3)),P=Math.floor(C/60),Z=C%60;return`${P}:${String(Z).padStart(2,"0")}`}function J(w){let C=w.job;if(C){let P=typeof C.started_at=="number"?C.started_at:0,Z=`${C.runner||"?"}/${C.model||"?"}`,pe=P?` \xB7 \uACBD\uACFC ${z(Date.now()-P)}`:"",$e=typeof C.session_id=="string"?C.session_id:"",X=k(w).find(nt=>nt.run_id===C.job_id);return d`<span class="pa-meta__progress">
        <span
          >분석 중 — ${Z} · effort ${C.effort||"?"}${pe}</span
        >
        ${$e?d`<code class="pa-session-id" title=${$e}
              >${$e.slice(0,8)}</code
            >`:""}
        <button
          type="button"
          class="pa-monitor"
          @click=${()=>_e(C.job_id,X||C)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-prompt-open"
          ?disabled=${X?.prompt_saved!==!0||K.has(C.job_id)}
          @click=${()=>{Ve(C.job_id)}}
        >
          프롬프트
        </button>
      </span>`}return Ce()?d`<span class="pa-meta__progress"
          >준비 중 — 대상과 아티팩트 수집 중</span
        >`:""}function Ce(){return n?.isPending?.()===!0}function Be(w){let C=!!w.job,P=Ye(w.settings),Z=R!==null&&A.size===0,pe=C||p||Ce()||L;return d`<div class="pa-meta">
      ${w.last_good?d`<span class="pa-meta__at"
            >분석 ${new Date(w.last_good.at||0).toLocaleString()}</span
          >`:d`<span class="pa-meta__at">분석 결과 없음</span>`}
      ${J(w)}
      <button
        type="button"
        class="pa-run"
        ?disabled=${!P||pe||Z}
        @click=${()=>{ot(!1)}}
      >
        ✳ 분석
      </button>
      <button
        type="button"
        class="pa-rerun"
        ?disabled=${!P||pe||Z}
        @click=${()=>{ot(!0)}}
      >
        재분석
      </button>
      <button
        type="button"
        class="pa-cancel"
        ?disabled=${!C}
        @click=${()=>{it()}}
      >
        취소
      </button>
    </div>`}function ue(w){return typeof w=="string"&&w.length>0?w:"\uBBF8\uBC30\uCE58"}function g(w,C){C?A.add(w):A.delete(w),he()}function $(){let w=R?.qualified||[],C=R?.excluded||[];return d`<section class="pa-targets">
      <header class="pa-targets__header">
        <strong>분석 대상</strong>
        <span class="pa-targets__summary"
          >${L?"\uC870\uD68C \uC911\u2026":`\uC790\uACA9 ${w.length} \xB7 \uC81C\uC678 ${C.length}`}</span
        >
      </header>
      ${R&&w.length>0?d`<ul class="pa-targets__list">
            ${w.map(P=>d`<li class="pa-target">
                  <label class="pa-target__label">
                    <input
                      type="checkbox"
                      class="pa-target__check"
                      data-target-id=${P.id}
                      .checked=${A.has(P.id)}
                      @change=${Z=>g(P.id,Z.target.checked)}
                    />
                    <span class="pa-target__title">${P.title}</span>
                  </label>
                  <span class="pa-target__route">${P.route}</span>
                  <span class="pa-target__lane">${ue(P.lane)}</span>
                </li>`)}
          </ul>`:R&&w.length===0?d`<p class="pa-empty">자격 있는 분석 대상이 없습니다</p>`:""}
      ${R&&C.length>0?d`<details class="pa-targets__excluded">
            <summary>제외 대상 ${C.length}</summary>
            <ul class="pa-targets__list">
              ${C.map(P=>d`<li class="pa-target pa-target--excluded">
                    <label class="pa-target__label">
                      <input type="checkbox" disabled />
                      <span class="pa-target__title">${P.title}</span>
                    </label>
                    <span class="pa-target__reason"
                      >${km[P.reason]||P.reason}</span
                    >
                    <span class="pa-target__lane"
                      >${ue(P.lane)}</span
                    >
                  </li>`)}
            </ul>
          </details>`:""}
    </section>`}function x(w){let C=typeof w.session_id=="string"&&w.session_id.length>0,P=C?w.session_id:"";return d`<li class="pa-run-row">
      <span class="pa-run-row__status pa-run-row__status--${w.outcome}"
        >${$m[w.outcome]||w.outcome}</span
      >
      <time class="pa-run-row__time"
        >${new Date(w.started_at||0).toLocaleString()}</time
      >
      <span class="pa-run-row__identity"
        >${w.runner||"?"} / ${w.model||"?"} / ${w.effort||"?"}</span
      >
      ${C?d`<code class="pa-session-id" title=${P}
            >${P.slice(0,8)}</code
          >`:d`<span class="pa-run-row__no-session">세션 없음</span>`}
      ${w.outcome==="failure"&&w.reason?d`<span class="pa-run-row__reason">${w.reason}</span>`:""}
      <span class="pa-run-row__actions">
        <button
          type="button"
          class="pa-run-row__monitor"
          @click=${()=>_e(w.run_id,w)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-run-row__prompt"
          ?disabled=${w.prompt_saved!==!0||K.has(w.run_id)}
          @click=${()=>{Ve(w.run_id)}}
        >
          프롬프트
        </button>
      </span>
    </li>`}function M(w){return d`<section class="pa-runs">
      <header class="pa-runs__header"><strong>최근 실행</strong></header>
      ${w.length>0?d`<ul class="pa-runs__list">
            ${w.map(C=>x(C))}
          </ul>`:d`<p class="pa-empty">실행 이력 없음</p>`}
    </section>`}function G(){return V?d`<div
      class="pa-prompt-popup"
      role="dialog"
      aria-modal="true"
      aria-label="분석 프롬프트"
    >
      <div class="pa-prompt-popup__backdrop" @click=${be}></div>
      <section class="pa-prompt-popup__panel">
        <header class="pa-prompt-popup__header">
          <div class="pa-prompt-popup__identity">
            <strong>분석 프롬프트</strong>
            <code>${V.run_id}</code>
          </div>
          <div class="pa-prompt-popup__actions">
            <button type="button" @click=${()=>{Le()}}>
              복사
            </button>
            <button
              type="button"
              class="pa-prompt-popup__close"
              aria-label="분석 프롬프트 팝업 닫기"
              @click=${be}
            >
              ✕
            </button>
          </div>
        </header>
        <pre class="pa-prompt-popup__content" tabindex="0">
${V.prompt}</pre
        >
      </section>
    </div>`:""}function Y(w,C){let P=te(w,C),Z=B(),pe=P.filter(He=>Z.has(He)),$e=oe(P),X=re(P),nt=Array.isArray(W().serial_lanes)?W().serial_lanes:[],Ee=u.get(w)||Ie(),ft=C.eligible!==!0||P.length<2||pe.length>0||$e.length>0||X||p;return d`<section class="pa-group" data-group-index=${String(w)}>
      <header class="pa-group__head">
        <span class="pa-group__confidence">${C.confidence}</span>
        ${C.categories.map(He=>d`<span class="pa-group__category">${He}</span>`)}
        ${X?d`<span class="pa-group__applied">✓ 이미 반영됨</span>`:""}
        ${C.eligible===!0?"":d`<span class="pa-group__weak">근거 부족 — 제출 불가</span>`}
        ${$e.length>0?d`<span class="pa-group__stale"
              >stale — ${$e.join(", ")} 대기 영역 이탈</span
            >`:""}
      </header>
      <p class="pa-group__reason">${C.reason}</p>
      <ol class="pa-group__members">
        ${P.map((He,At)=>d`<li class="pa-member" data-bead-id=${He}>
              <span class="pa-member__seq">${At+1}</span>
              <span class="pa-member__title">${rt(He)}</span>
              ${Z.has(He)?d`<span class="pa-member__active">실행 중</span>`:""}
              <button
                type="button"
                class="pa-member__up"
                data-bead-id=${He}
                ?disabled=${At===0}
                aria-label=${`${He} \uC704\uB85C`}
                @click=${()=>Te(w,C,He,-1)}
              >
                ↑
              </button>
              <button
                type="button"
                class="pa-member__down"
                data-bead-id=${He}
                ?disabled=${At===P.length-1}
                aria-label=${`${He} \uC544\uB798\uB85C`}
                @click=${()=>Te(w,C,He,1)}
              >
                ↓
              </button>
              <button
                type="button"
                class="pa-member__exclude"
                data-bead-id=${He}
                aria-label=${`${He} \uC81C\uC678`}
                @click=${()=>F(w,C,He)}
              >
                ✕
              </button>
            </li>`)}
      </ol>
      <ul class="pa-group__evidence">
        ${C.evidence.map(He=>d`<li class="pa-evidence">
              <code>${He.path}</code>
              <span class="pa-evidence__locator">${He.locator}</span>
            </li>`)}
      </ul>
      <footer class="pa-group__foot">
        <button
          type="button"
          class="pa-group__restore"
          @click=${()=>se(w)}
        >
          제안으로 되돌리기
        </button>
        <label class="pa-group__lane-field"
          >제출
          <select
            class="pa-group__lane"
            aria-label="제출 대상 레인"
            @change=${He=>{u.set(w,He.target.value),he()}}
          >
            ${nt.map((He,At)=>d`<option
                  value=${He.id}
                  ?selected=${Ee===He.id}
                >
                  직렬 ${At+1}
                </option>`)}
          </select>
        </label>
        <button
          type="button"
          class="pa-group__submit"
          ?disabled=${ft}
          @click=${()=>{H(w,C)}}
        >
          제출
        </button>
      </footer>
    </section>`}function ne(w){let C=Array.isArray(w.issues)?w.issues:[],P=C.filter(pe=>pe.verdict==="parallel_ok").length,Z=C.filter(pe=>pe.verdict==="uncertain").length;return d`<div class="pa-summary">
      <span>parallel_ok ${P}</span>
      <span>uncertain ${Z}</span>
    </div>`}function ce(){let w=we&&!!I().job;if(w&&h===null){h=setInterval(()=>he(),1e3);return}!w&&h!==null&&(clearInterval(h),h=null)}function he(){let w=I();f&&w.settings.runner===f&&(f=null);let C=w.last_good?.result;ce(),Qe(d`
        <div class="pa__container">
          <header class="pa__header">
            <div class="pa__title">병렬성 분석</div>
            <button
              type="button"
              class="pa__close"
              aria-label="닫기"
              @click=${Q}
            >
              ×
            </button>
          </header>
          <div class="pa__body">
            ${je()} ${Be(w)} ${$()}
            ${C?d`${C.groups.map((P,Z)=>Y(Z,P))}
                ${C.groups.length===0?d`<p class="pa-empty">직렬 권장 그룹 없음</p>`:""}
                ${ne(C)}`:d`<p class="pa-empty">
                  아직 분석 결과가 없습니다 — [✳ 분석]을 눌러 시작하세요
                </p>`}
            ${M(k(w))}
          </div>
        </div>
        ${G()}
      `,i)}let we=!1,Pe=()=>{we=!1,V=null,N+=1,ce()},Oe=w=>{w.target===w.currentTarget&&Q()};i.addEventListener("close",Pe),i.addEventListener("cancel",Pe),i.addEventListener("click",Oe);let ke=null;r&&r.subscribe&&(ke=r.subscribe(()=>{we&&he()}));let ze=null;n&&n.subscribe&&(ze=n.subscribe(()=>{we&&he()}));function j(){we||(we=!0,he(),D(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""))}function Q(){we&&(we=!1,V=null,N+=1,ce(),typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:j,close:Q,destroy(){we=!1,h!==null&&(clearInterval(h),h=null),i.removeEventListener("close",Pe),i.removeEventListener("cancel",Pe),i.removeEventListener("click",Oe),ke&&(ke(),ke=null),ze&&(ze(),ze=null),i.remove()}}}var bd=new Set(["sh","bash","zsh","dash","ksh"]),hd=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function yd(e){let t=e.split("/");return t[t.length-1]||""}function Am(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let r=t.slice(2).trim().split(/\s+/).filter(Boolean);if(r.length===0)return!1;let n=yd(r[0]);if(n!=="env")return bd.has(n);let s=r.slice(1).find(o=>!o.startsWith("-")&&!o.includes("="));return s!==void 0&&bd.has(yd(s))}function Sm(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function Em(e){let t=[],r=0;hd.lastIndex=0;for(let n of e.matchAll(hd)){let s=n.index;s>r&&t.push({text:e.slice(r,s),kind:"plain"}),t.push({text:n[0],kind:Sm(n[0])}),r=s+n[0].length}return r<e.length&&t.push({text:e.slice(r),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function Tm(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function vd(e){let t=e.getWorkspacePath,r=e.fetchImpl||globalThis.fetch?.bind(globalThis),n=document.createElement("div");n.className="repo-ops-script-viewer-root",document.body.appendChild(n);let s=null,o="loading",a="",i="",c=0,u=null,p=!1;function f(S,D){return D?Em(S).map(k=>k.kind==="plain"?k.text:d`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${k.kind}"
            >${k.text}</span
          >`):S}function h(){if(!s)return d``;let S=o==="ready"&&Am(a),D=o==="ready"?a.split(`
`):[];return d`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${s.path}`}
    >
      <div
        class="repo-ops-script-viewer__backdrop"
        @click=${()=>W()}
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
              @click=${()=>{A()}}
            >
              복사
            </button>
            <button
              type="button"
              class="repo-ops-script-viewer__close"
              aria-label="스크립트 팝업 닫기"
              @click=${()=>W()}
            >
              ✕
            </button>
          </div>
        </header>
        <div class="repo-ops-script-viewer__body" aria-live="polite">
          ${o==="loading"?d`<div class="repo-ops-script-viewer__status">
                스크립트 불러오는 중…
              </div>`:o==="error"?d`<div
                  class="repo-ops-script-viewer__status repo-ops-script-viewer__status--error"
                >
                  ${i}
                </div>`:d`<div class="repo-ops-script-viewer__code" tabindex="0">
                  ${D.map((k,B)=>d`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${B+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${f(k,S)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function R(){Qe(h(),n)}async function A(){if(o!=="ready")return;let S=await Xt(a);ie(S?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",S?"success":"error")}function L(S){S.key==="Escape"&&s&&(S.preventDefault(),W())}function N(){p||(document.addEventListener("keydown",L),p=!0)}function V(){p&&(document.removeEventListener("keydown",L),p=!1)}async function K(S,D=null){let k=++c;N(),s={...S},u=D||(document.activeElement instanceof HTMLElement?document.activeElement:null),o="loading",a="",i="",R(),n.querySelector(".repo-ops-script-viewer__close")?.focus();let oe=t?t():"";if(!oe){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",R();return}if(!r){o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",R();return}let de="/api/repo-ops-script?workspace="+encodeURIComponent(oe)+"&lane="+encodeURIComponent(S.lane)+"&base_sha="+encodeURIComponent(S.base_sha);try{let te=await r(de),re=await te.json().catch(()=>({}));if(k!==c)return;if((t?t():"")!==oe){W();return}if(!te.ok||!re||re.ok!==!0){o="error",i=Tm(re&&typeof re.error=="string"?re.error:""),R();return}s={lane:re.lane,base_sha:re.base_sha,path:re.path,base_ref:re.base_ref},a=String(re.content),o="ready",R()}catch{if(k!==c)return;o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",R()}}function W(){c+=1,V(),s=null,a="",R();let S=u;u=null,S?.isConnected&&S.focus()}function I(){W(),n.remove()}return{open:K,close:W,destroy:I}}function wd(e){let t=e.queueStore,r=e.transport,n=e.onChanged||(()=>{}),s=e.onOpenScript;function o(){return t&&t.get()||{}}function a(){let I=o();return typeof I.revision=="number"?I.revision:0}function i(I){t&&I&&I.queue&&typeof I.queue=="object"&&t.set(I.queue)}function c(){let I=o().workspace_info;return I&&typeof I=="object"?I:{}}function u(I,S){return d`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${I}"
      >${S}</span
    >`}function p(I){if(typeof I!="number"||!Number.isFinite(I))return"";let S=I/6e4;return Number.isInteger(S)?`timeout ${S}\uBD84`:`timeout ${Math.round(I/1e3)}\uCD08`}function f(I){let S=p(I);return S?u("config",S):""}function h(I,S,D){return d`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${D.script}
      @click=${k=>{s&&s({lane:I,base_sha:S.base_sha,path:D.script,base_ref:S.base_ref},k.currentTarget)}}
    ></button>`}function R(I){let S=typeof I.base_sha=="string"?I.base_sha:"",D=`${I.source_path||"repo-ops/config.toml"} @ ${I.base_ref||"?"}${S?`@${S.slice(0,7)}`:""}`;return d`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${D}</span>
      </p>
      <div class="worker-repo-ops__lane" data-lane="verify">
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${I.verify?d`${h("verify",I,I.verify)}
              ${f(I.verify.timeout_ms)}`:d`선언 없음${u("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${I.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
      </div>
      <div class="worker-repo-ops__lane" data-lane="deploy">
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${I.deploy?d`${h("deploy",I,I.deploy)}
              ${f(I.deploy.timeout_ms)}`:d`선언 없음${u("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${I.deploy?d`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
      </div>
    </section>`}function A(I){let S=I.repo_ops&&typeof I.repo_ops=="object"?I.repo_ops:null;return S&&(S.status==="resolved"||S.status==="absent")?R(S):S&&(S.status==="pending"||S.status==="error")?d`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${S.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":d`선언 읽기
              실패${S.error_code?d` — <code>${S.error_code}</code>`:""}`}
        </div>
      </section>`:d`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function L(I){if(!r)return;let S=await r("worker-auto-repair-toggle",{on:I,expected_revision:a()});if(i(S),S&&S.conflict){let D=await r("worker-auto-repair-toggle",{on:I,expected_revision:a()});i(D)}n()}let N={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function V(I,S,D){return d`<div class="worker-repo-ops__policy-group" data-policy=${D}>
      <div class="worker-repo-ops__policy-label">${I}</div>
      <ul class="worker-repo-ops__policy-list">
        ${S.map(k=>d`<li data-token=${k}>
              ${N[k]||k}
            </li>`)}
      </ul>
    </div>`}function K(I){return d`<div
      class="worker-repo-ops__policy-group"
      data-policy="resolution-ladder"
    >
      <div class="worker-repo-ops__policy-label">해결 사다리</div>
      <ol class="worker-repo-ops__policy-list">
        ${I.map(S=>{let D=[N[S.trigger]||S.trigger];return Number.isInteger(S.attempts_per_operation_attempt)?D.push(`operation\uB2F9 ${S.attempts_per_operation_attempt}\uD68C`):Number.isInteger(S.attempts)?D.push(`${N[S.budget]||S.budget} ${S.attempts}\uD68C`):Number.isInteger(S.sessions_per_user_action)&&D.push(`${S.sessions_per_user_action}\uD68C`,N[S.user_actions]||S.user_actions),S.applies_when&&D.push(N[S.applies_when]||S.applies_when),d`<li data-token=${S.id}>
            <strong>${N[S.id]||S.id}</strong>
            <span>${D.filter(Boolean).join(" \xB7 ")}</span>
          </li>`})}
      </ol>
    </div>`}function W(){let I=o(),S=I.auto_repair!==!1,D=I.repo_operation_policy&&typeof I.repo_operation_policy=="object"?I.repo_operation_policy:null,k=Array.isArray(I.repo_operations)?I.repo_operations:[],B=k.find(re=>re.state==="repairing"),oe=k.filter(re=>re.state==="failed"||re.state==="repairing"),de=oe.length?Math.min(...oe.map(re=>typeof re.repair?.remaining=="number"?re.repair.remaining:0)):D?.auto_repair?.resolution_ladder?.find(re=>re.id==="auto_repair_session")?.attempts??1,te=Array.isArray(D?.auto_repair?.resolution_ladder)?D.auto_repair.resolution_ladder:[];return d`<section
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
          .checked=${S}
          @change=${re=>{L(re.target.checked)}}
        />
        검증·배포 실패를 자동으로 해결 시도
      </label>
      <div class="worker-repo-ops__repair-state">
        <span
          class="worker-repo-ops__repair-value"
          data-seam="auto-repair-value"
          >${S?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}</span
        >
        <span
          class="worker-repo-ops__repair-budget"
          data-seam="auto-repair-budget"
          >남은 자동 해결 ${de}회</span
        >
        <span
          class="worker-repo-ops__repair-session"
          data-seam="auto-repair-session"
          >${B?`\uD574\uACB0 \uC138\uC158 \uC2E4\uD589 \uC911 \xB7 ${B.repair?.owner_bead||B.operation_id}`:"\uC2E4\uD589 \uC911\uC778 \uD574\uACB0 \uC138\uC158 \uC5C6\uC74C"}</span
        >
      </div>
      ${D?d`<details
            class="worker-repo-ops__policy"
            data-seam="policy-lists"
          >
            <summary>
              Worker 자동 처리 기준
              <span class="worker-repo-ops__policy-count"
                >자동 ${(D.worker_automatic||[]).length} · 해결 사다리
                ${te.length} · 금지
                ${(D.never_automatic||[]).length}</span
              >
            </summary>
            ${V("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",D.worker_automatic||[],"worker-automatic")}
            ${D.supported===!1||D.schema_version!==2?d`<div
                  class="worker-repo-ops__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uD574\uACB0\uC774 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${D.schema_version})`}
                </div>`:K(te)}
            ${V("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",D.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}return{template(){return d`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언 · 자동 해결
        </summary>
        ${A(c())} ${W()}
      </details>`}}}var Cm=20,kd={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"},$d={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8"};function Rm(e,t,r=Cm){let n=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||n.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||n.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return n.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),n.slice(0,Math.max(0,r))}function xd(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function Im(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"repairing":return"\uC790\uB3D9 \uD574\uACB0 \uC911";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function Ad(e){let t=e.filter(r=>r.value);return t.length===0?"":d`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(r=>d`<div>
            <dt>${r.term}</dt>
            <dd>${r.value}</dd>
          </div>`)}
    </dl>
  </details>`}function Sd(e,t="",r=!1){return!e&&!t?"":d`<p
    class="worker-ev__explain${r?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?d`<br />${t}`:""}
  </p>`}function Lm(e){if(e.state!=="failed"||e.superseded_by)return"";let t=e.repair||{},r=typeof t.remaining=="number"?t.remaining:0,n=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"",s=r<=0;return d`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
      data-operation-id=${e.operation_id}
      data-failure-kind=${e.failure_kind||""}
      title="해결 세션을 엽니다"
    >
      ${Object.hasOwn($d,n)?$d[n]:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC2DC\uC791"}
    </button>
    <span class="worker-ev__btn-sub"
      >${s?"\uC790\uB3D9 \uD574\uACB0\uC744 \uB2E4 \uC37C\uC2B5\uB2C8\uB2E4 \xB7 \uB20C\uB7EC\uC11C \uD574\uACB0 \uC138\uC158\uC744 \uC5FD\uB2C8\uB2E4":`\uC790\uB3D9 \uD574\uACB0 ${r}\uD68C\uAC00 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4`}</span
    >
    ${t.attempt_id?d`<button
          type="button"
          class="worker-ev__btn worker-repo-op__session"
          data-attempt-id=${t.attempt_id}
        >
          해결 세션 보기
        </button>`:""}
    ${e.dismissed?"":d`<button
          type="button"
          class="worker-ev__btn worker-repo-op__dismiss"
          data-operation-id=${e.operation_id}
          title="사람이 확인한 실패로 접수합니다 — 기록은 그대로 남고 해결 필요 집계에서만 빠집니다"
        >
          기록 닫기
        </button>`}
  </div>`}function Om(e){let t=e.operation,r=t.state==="failed",n=t.failure?t.failure.code:"";return d`<li
    class="worker-ev"
    data-operation-id=${t.operation_id}
    data-state=${t.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?wt(e.at):""}
      >${Xs(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${xd(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(kd,t.kind)?kd[t.kind]:t.kind}</span
        >
        <span class="worker-ev__meta"
          >${t.target_base}@${Ys(t.target_sha)}${typeof t.elapsed_ms=="number"?` \xB7 ${Zs(t.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${xd(e)}"
          >${Im(e)}</span
        >
        ${t.dismissed?d`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${t.superseded_by?d`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
      </div>
      ${r?Sd(Mc(t.failure_kind,n)):""}
      ${Lm(t)}
      ${Ad([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?n:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${Ys(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function Mm(e){let t=e.cleanup,r=zr(t.step);return d`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?wt(e.at):""}
      >${Xs(e.at)||"\u2014"}</span
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
        ${Cc(t.step).map(n=>d`<li
              class="worker-step worker-step--${n.state}"
              data-step=${n.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${n.label}</span>
            </li>`)}
      </ol>
      ${Sd(ro(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
      <div class="worker-ev__acts">
        <button
          type="button"
          class="worker-ev__btn worker-ev__btn--warn worker-cleanup__resume"
          data-bead-id=${t.bead_id}
        >
          정리 재개${r?` \u2014 ${r} \uB2E8\uACC4\uBD80\uD130`:""}
        </button>
        ${t.repair_eligible?d`<button
              type="button"
              class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
              data-operation-id=${`cleanup:${t.bead_id}`}
              data-failure-kind=${t.failure_code||t.reason||""}
            >
              실패 해결 세션 시작
            </button>`:""}
      </div>
      ${Ad([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function Pm(e){return d`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
    ${e.events.length===0?d`<div class="worker-repo-drawer__empty">기록 없음</div>`:d`<ul class="worker-rail">
          ${e.events.map(t=>t.type==="cleanup"?Mm(t):Om(t))}
        </ul>`}
  </section>`}function Ed(e,t={}){let r=null;function n(){Qe(r?Pm(r):d``,e)}e.addEventListener("click",a=>{a.target?.closest?.('[data-seam="repo-ops-close"]')&&o()});function s(a){r={events:Rm(a.operations,a.cleanup_failures),repo:a.repo||""},n()}function o(){r!==null&&(r=null,n(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>r!==null,refresh(a){r&&s(a)}}}var Dm="tab:worker:ready",Nm="tab:worker:blocked",qm="tab:worker:in-progress",Fm="tab:worker:closed",oo=1,Td=5;function Cd(e){return Mn(e).path.length>0}var Ld="beads-ui.worker.candidate-filter",Ra={show_blocked:!1,spec:"all"};function jm(){try{let e=window.localStorage.getItem(Ld);if(!e)return{...Ra};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Ra};let r=t.spec;return{show_blocked:t.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...Ra}}}function Bm(e){try{window.localStorage.setItem(Ld,JSON.stringify(e))}catch{}}function Um(e,t){let r=i=>t.show_blocked||!i.blocked,n=i=>t.spec==="all"||(t.spec==="with"?i.has_spec:!i.has_spec),s=[],o=0,a=0;for(let i of e){let c=r(i),u=n(i);c&&u?s.push(i):!c&&u?o+=1:c&&!u&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var Wm=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Od="bdui.worker.candidate_sort",zm=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],ao="spec";function Hm(){try{let e=window.localStorage.getItem(Od);return e==="board"||e==="created"||e==="spec"?e:ao}catch{return ao}}function Gm(e){try{window.localStorage.setItem(Od,e)}catch{}}var Md="bdui.worker.done-range";function Vm(){try{let e=window.localStorage.getItem(Md);return Ut(e)?e:Pt}catch{return Pt}}function Km(e){try{window.localStorage.setItem(Md,e)}catch{}}var Ym="(max-width: 640px)",Pd="beads-ui.worker.lane-collapsed",Gn={queue:!0,done:!0};function Zm(){try{let e=window.localStorage.getItem(Pd);if(!e)return{...Gn};let t=JSON.parse(e);return!t||typeof t!="object"?{...Gn}:{queue:typeof t.queue=="boolean"?t.queue:Gn.queue,done:typeof t.done=="boolean"?t.done:Gn.done}}catch{return{...Gn}}}function Xm(e){try{window.localStorage.setItem(Pd,JSON.stringify(e))}catch{}}function Rd(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let r=typeof t.title=="string"?t.title:t.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function Qm(e,t,r){let n=Array.isArray(e)?e.slice():[];return t==="created"?n.sort(Fr):(n.sort(us(r)),t==="board"?n:[...n.filter(Cd),...n.filter(s=>!Cd(s))])}function Jm(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function eg(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function tg(e){let t=e?.blocked_info;if(t&&typeof t=="object"){let s=Array.isArray(t.blockers)?t.blockers.filter(o=>typeof o=="string"&&o.length>0):[];return s.length>0?`\u{1F512} ${s.join(", ")}`:"\u{1F512} blocked"}let n=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(s=>{if(typeof s=="string")return s;if(!s||typeof s!="object")return"";let o=s.type??s.dependency_type;return o!==void 0&&o!=="blocks"?"":s.depends_on_id||s.id||""}).filter(Boolean);return n.length>0?`\u{1F512} ${n.join(", ")}`:"\u{1F512} blocked"}function Id(e){switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function rg(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function ng(e,t=null){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let r=e.slice(19);if(r.length===0)return null;switch(r){case"gating":{let n=t?.repair_sessions_used;return typeof n=="number"&&n>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911"}case"repairing":return"\uC790\uB3D9 \uC218\uC815 \uC911";case"waiting_repair_pr":return"\uC218\uC815 PR \uB300\uAE30 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function sg(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function og(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"implementation review \uB300\uAE30",live:!1,alert:!1};case"reviewing":return{badge:"implementation review \uC911",live:!0,alert:!1};case"revising":return{badge:"review \uC218\uC815 \uC911 \xB7 1\uD68C",live:!0,alert:!1};case"failed":{let r=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:r.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${r.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",live:!1,alert:!0}}default:return null}}function Ia(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function ag(e){if(!e||typeof e!="object")return null;let t=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,n=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,s=n&&typeof n.pr_number=="number"?n.pr_number:null,o="";switch(e.phase){case"gating":o=t>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"repairing":o="\uC790\uB3D9 \uC218\uC815 \uC911";break;case"waiting_repair_pr":o=s?`\uC218\uC815 PR #${s} \uB300\uAE30 \uC911`:"\uC218\uC815 PR \uB300\uAE30 \uC911";break;case"merging":o=e.subject_role==="repair"?s?`\uC218\uC815 PR #${s} \uBA38\uC9C0 \uC911`:"\uC218\uC815 PR \uBA38\uC9C0 \uC911":"\uBA38\uC9C0 \uC911";break;case"cleaning":o="\uB9C8\uBB34\uB9AC \uC911";break;case"paused":o="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":o="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let a=[o,`\uC790\uB3D9 \uC218\uC815 \uD69F\uC218 ${t}/${r}`];return e.head_sha&&a.push(`head ${e.head_sha}`),e.base_sha&&a.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&a.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`),e.active_attempt_id&&a.push(`attempt ${e.active_attempt_id}`),n&&typeof n.bead_id=="string"&&a.push(`repair ${n.bead_id}`),e.evidence&&a.push(e.evidence),e.log_path&&a.push(e.log_path),{badge:o,title:a.join(`
`),alert:e.phase==="needs_human",lock_actions:e.phase!=="paused"&&e.phase!=="needs_human",repair_pr_url:n&&typeof n.pr_url=="string"?n.pr_url:"",repair_pr_number:s}}function ig(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",r=(n,s={})=>{let o=[s.title||"",t].filter(Boolean);return{label:n,title:o.join(`
`),live:s.live===!0,alert:s.alert===!0}};return e.continuation_required?r("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0}):e.merge_step?e.gate?.tier==="merged"?r("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):r("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0}):e.conflict_badge?r(e.conflict_badge,{live:e.conflict_live===!0}):e.head_review&&e.head_review.state!=="failed"?r("\uB9AC\uBDF0 \uC9C4\uD589 \uC911",{title:e.head_review.badge,live:e.head_review.live===!0}):e.recovery?.lock_actions?r(e.recovery.badge,{title:e.recovery.title,live:!0}):e.cleanup_failed?r(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0}):e.base_exception?r("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0}):e.conflicting?r("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0}):e.gate?.reason==="base_behind"?r("base \uAC31\uC2E0 \uD544\uC694",{alert:!0}):e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale"?r("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2C8\uAC70\uB098 \uC870\uC0C1 \uD655\uC778\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uB85C, \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB9AC\uBDF0\uD574\uC57C \uBA38\uC9C0\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",alert:!0}):e.gate?.reason==="spec_id_missing"?r("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0}):e.gate?.reason==="review_receipt_invalid"?r("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0}):e.head_review?.state==="failed"?r("\uB9AC\uBDF0 \uC2E4\uD328",{title:e.head_review.failure_reason||"",alert:!0}):e.recovery?r(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?r("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?r(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${Id(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?r(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${Id(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?r(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?r("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?r("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?r("\uB2EB\uD798",{alert:!0}):e.activity?r("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?r("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?r("\uD655\uC778 \uC911"):e.gate?.gate_badge?r(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function lg(e,t,r,n,s=null,o=null,a=null,i=!1,c=null,u=!0,p=null,f=null,h=null,R={},A=!1,L=!1,N={}){let V=!!c&&c.position>0,K=!!c?.continuation_action&&c.continuation_action.continuation===null,W=!!c&&c.active===!0,I=c&&c.failure||null,S=ng(c?c.waiting:null,h),D=r[e]||null,k=D&&D.gate?D.gate:null,B=D&&D.pr?D.pr:null,oe=ag(h),de=sg(c?c.resolution:null),te=og(c?c.head_review:null),re=c&&c.head_review||null,Ie=c&&c.authority||null,rt=!!re&&["pending","reviewing","revising"].includes(re.state),De=V&&!W&&(re?.state==="failed"||!Ie||Ie.source==="automatic"&&!L),ot=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":de?de.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":S,it=!!k&&k.base_badge==="\uCDA9\uB3CC",Ve=!!k&&k.enabled===!0,be=Un({bead_id:e,merge_sha:N.merge_sha,cleanup_cursor:N.cleanup_cursor,merge_progress:o&&o.merge_progress?o.merge_progress:null,cleanup_failed:n,repo_operations:N.repo_operations}),Le=to(be),_e=!!n&&["child_sweep","branch_cleanup","parent_close"].includes(n.step)&&!!k&&k.tier==="merged",ye=i&&!!n&&!!k&&k.tier==="merged",Ae=De&&(Ve||it||k?.reason==="base_behind"||k?.reason==="review_receipt_missing"||k?.reason==="review_receipt_stale"||_e||ye),Ne=i&&it&&u===!1,ve=cr(R,e,{external:i,merge_active:W||be?.step==="merge",merge_queued:V,conflict_active:!!a,cleanup_active:Le,merged:!!n||k?.tier==="merged"}),Fe=!!ve.operation,Ke=!_e&&!!n&&n.step==="repo_operations",xe=ig({continuation_required:K,merge_step:be,conflict_badge:ot,conflict_live:de?.live===!0||a==="running",head_review:re&&te?{...te,state:re.state,failure_reason:re.failure_reason}:null,recovery:oe,cleanup_failed:n,cleanup_label:n?zr(n.step):null,base_exception:f,conflicting:it,gate:k,queue_failure:I,auto_skip:p,queued:V,queue_active:W,queue_position:c?c.position:0,activity:ot?null:o&&o.activity||null}),tt=xe?.live===!0&&xe.title?d`<span title=${xe.title}>${xe.label}</span>`:xe?.label||null;return{id:e,title:i?d`${t}<span class="muted"> · 세션</span>`:t,reason:n&&be?.active!==!0?eo(n.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:A,external:i,pr_number:B&&typeof B.number=="number"?B.number:null,pr_url:B&&typeof B.url=="string"?B.url:"",completion_badge:xe?.live!==!0&&xe?.title?xe.label:null,completion_title:xe?.title||"",completion_repair_pr_url:oe?oe.repair_pr_url:"",completion_repair_pr_number:oe?oe.repair_pr_number:null,badges:tt?[tt]:[],live_badge:xe?.live===!0?tt:null,usage:s,alert:xe?.alert===!0,merge_action:k?.tier==="merged"&&!_e&&!ye||Ke?!1:!V||K||De,timeline_action:Ke,cancel_action:V&&!K,cancel_enabled:(!W||rt)&&!(oe&&oe.lock_actions),cancel_title:oe&&oe.lock_actions?`${oe.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:W&&!rt?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":rt?"review \uC9C4\uD589\uC744 \uCDE8\uC18C\uD558\uACE0 \uBA38\uC9C0 \uAD8C\uD55C\uC744 \uD3D0\uAE30\uD569\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:ve,discard_action:ve.action,merge_step:be,discard_enabled:ve.enabled,discard_title:ve.title,merge_enabled:!be&&!a&&!Fe&&!f&&!(oe&&oe.lock_actions)&&!Ne&&!Ke&&(Ve||it||k?.reason==="base_behind"||k?.reason==="review_receipt_missing"||k?.reason==="review_receipt_stale"||_e||ye||Ae),merge_label:K?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":_e||ye?"\uC815\uB9AC \uC7AC\uAC1C":it&&!be&&!_e?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":k?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":k?.reason==="review_receipt_missing"||k?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":De?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:Fe?ve.error?`\uD3D0\uAE30 \uC2E4\uD328: ${ve.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${ve.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:K?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":be?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${be.label}`:ye?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Ne?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":_e?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":it?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":k?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":k?.reason==="review_receipt_missing"||k?.reason==="review_receipt_stale"?"\uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":k?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":Ve?`\uBA38\uC9C0 (${k.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:k&&k.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${k&&k.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function La(e,t={}){let{transport:r,issueStores:n,queueStore:s,analysisStore:o,sessionLogStore:a,uiOrderStore:i,gotoIssue:c,getWorkspacePath:u,doneRange:p,onDoneRangeChange:f}=t,h=n?fs(n,i):null,R=ms({transport:r,uiOrderStore:i}),A=null,L=[],N=jm(),V=null,K=Hm(),W=Ut(p)?p:Vm(),I=new Map;function S(){let l=or.find(_=>_.value===W);return l?l.label:"\uC624\uB298"}let D=Zm(),k=!1,B=new Set,oe=new Set,de=new Set,te=new Set,re=[],Ie=document.createElement("div");Ie.className="worker-console";let rt=document.createElement("div");rt.className="worker-top";let De=document.createElement("div");De.className="worker-drawer-overlay",De.hidden=!0;let ot=document.createElement("div");ot.className="worker-drawer-overlay__backdrop";let it=document.createElement("div");it.className="worker-drawer-host";let Ve=document.createElement("div");Ve.className="worker-drawer-host",Ve.hidden=!0,De.append(ot,it,Ve);let be=document.createElement("div");be.className="worker-lanes-host",Ie.append(rt,De,be),e.appendChild(Ie);let Le=null,_e=null,ye=qs(it,{transport:r,sessionLogStore:a,onClose:()=>{Le=null,_e=null,De.hidden=!0,X()}}),Ae=Ed(Ve,{onClose:()=>{Ve.hidden=!0,De.hidden=!0,X()}}),Ne=vd({getWorkspacePath:u||(()=>"")}),ve=u&&u()||"",Fe=wd({queueStore:s,transport:r,onChanged:()=>X(),onOpenScript:(l,_)=>{Ne.open(l,_)}}),Ke=o?gd(Ie,{queueStore:s,analysisStore:o,transport:r,getWorkspacePath:u,onOpenTranscript:(l,_)=>kr(l,_)}):null;function xe(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:oo,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function tt(){let l=xe(),_=typeof l.serial_lane_count=="number"&&Number.isInteger(l.serial_lane_count)&&l.serial_lane_count>0?Math.min(l.serial_lane_count,5):0,E=Array.isArray(l.serial_lanes)?l.serial_lanes:[],U=[];for(let ge of E){if(U.length>=_)break;!ge||typeof ge.id!="string"||!/^s[1-5]$/.test(ge.id)||!Array.isArray(ge.entries)||U.push({id:ge.id,label:`\uC9C1\uB82C ${ge.id.slice(1)}`,count:ge.entries.length})}return U.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(l.queue)?l.queue:[]).length},...U]}function H(l){if(!V||!l.some(E=>E.id===V))return null;let _=tt();return _?{bead_id:V,lanes:_}:null}function F(){let l=xe();return typeof l.revision=="number"?l.revision:0}function se(l){l&&l.queue&&s&&s.set(l.queue)}function Te(){let l=xe().queue;return Array.isArray(l)?l.length:0}async function je(l,_,E){if(!r)return;let U=()=>({bead_id:l,..._==="parallel"?{}:{lane:_},...E===void 0?{}:{index:E},expected_revision:F()}),ae=await r("worker-queue-place",U());se(ae),ae&&ae.conflict&&await r("worker-queue-place",U()).then(se)}async function We(l,_,E){if(!r)return;let U=()=>({bead_id:l,..._==="parallel"?{}:{lane:_},to_index:E,expected_revision:F()}),ae=await r("worker-queue-reorder",U());se(ae),ae&&ae.conflict&&await r("worker-queue-reorder",U()).then(se)}async function Se(l){if(!r)return;let _=await r("worker-queue-remove",{bead_id:l,expected_revision:F()});se(_),_&&_.conflict&&await r("worker-queue-remove",{bead_id:l,expected_revision:F()}).then(se)}async function lt(l){if(!r||!l)return;let _=await r("worker-attempt-pause",{attempt_id:l});_&&_.paused===!1&&_.reason&&ie(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${_.reason}`,"error",2400)}async function Ye(l){if(!r||!l)return;let _=await nn();if(_===null)return;let E=async(ae={})=>await r("worker-attempt-resume",{attempt_id:l,expected_revision:F(),..._!==""?{instructions:_}:{},...ae}),U=await E();se(U),U&&U.conflict&&(U=await E(),se(U)),U=await fr(U,(ae,ge)=>E({continuation:ae,decision_token:ge}),{onResult:se,refresh:()=>E()}),U&&U.resumed===!1&&!U.conflict&&U.reason&&ie(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${U.reason}`,"error",2400)}async function z(l){if(!r||!l)return;let _=await r("worker-attempt-dismiss",{attempt_id:l,expected_revision:F()});se(_),_&&_.conflict&&(_=await r("worker-attempt-dismiss",{attempt_id:l,expected_revision:F()}),se(_)),_&&_.dismissed===!1&&!_.conflict&&_.reason&&ie(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${_.reason}`,"error",2400)}async function J(l,_,E=!0){if(!r)return null;let U=r,ae=await U(l,{..._,expected_revision:F()});return se(ae),ae&&ae.conflict&&E&&(ae=await U(l,{..._,expected_revision:F()}),se(ae)),ae}async function Ce(l){if(!r||!l)return;let _=xe().merge_queue?.find(U=>U.bead_id===l)?.continuation_action;if(_?.mismatch&&_.continuation===null){await ue(l,_.mismatch);return}B.add(l),X();let E;try{E=await J("worker-merge-queue-add",{bead_id:l})}finally{B.delete(l),X()}!E||E.conflict||E.applied||ie(rg(E.reason),"error",2400)}async function Be(l){if(!(!r||!l||oe.has(l))){oe.add(l),X();try{let _=await r("worker-cleanup-retry",{bead_id:l,expected_revision:F()});se(_),_&&!_.retried&&!_.conflict&&_.reason&&ie(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${_.reason}`,"error",2400)}finally{oe.delete(l),X()}}}async function ue(l,_){let E=await fr({continuation_mismatch:_},(ae,ge)=>J("worker-merge-queue-add",{bead_id:l,continuation:ae,decision_token:ge},!1)),U=E?.queue?.merge_queue?.find(ae=>ae.bead_id===l)?.continuation_action;if(E?.applied!==!0&&U?.continuation===null&&U.mismatch){await ue(l,U.mismatch);return}E&&E.applied===!1&&!E.conflict&&ie("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function g(l){if(!r)return;let _=await J("worker-merge-auto-toggle",{on:l});!_||_.conflict||ie(l?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",l?"success":"info",2400)}async function $(l){if(!r||!l)return;let _=await J("worker-merge-queue-remove",{bead_id:l});_&&!_.conflict&&!_.applied&&_.reason==="merge_active"&&ie("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function x(){await J("worker-merge-queue-remove",{all:!0})}async function M(l,_=null,E="unmerged",U=null){if(!r||!l)return;let ae=Fn(l,E);if(!(!!U||typeof globalThis.confirm!="function"||globalThis.confirm(ae)))return;let fe=await r("worker-discard",{bead_id:l,..._?{attempt_id:_}:{},...U?{operation_id:U}:{},expected_revision:F()});if(se(fe),fe&&fe.conflict&&(fe=await r("worker-discard",{bead_id:l,..._?{attempt_id:_}:{},...U?{operation_id:U}:{},expected_revision:F()}),se(fe)),fe&&fe.discarded===!0){ie(Qs(fe),"success",5e3);return}if(fe&&fe.reason){ie(`\uD3D0\uAE30 \uC2E4\uD328: ${fe.reason}`,"error",2800);return}if(fe&&fe.accepted&&fe.pending==="merged_revert"){ie("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(fe&&fe.accepted&&!fe.discarded){ie(`\uD3D0\uAE30 \uC9C4\uD589: ${fe.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}fe&&!fe.conflict&&ie("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function G(l,_,E){if(!(!r||!_||!E||te.has(_))){te.add(_),X();try{let U=await r(l,{bead_id:_,action_id:E,expected_revision:F()});se(U),U?.conflict?ie("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!U?.ok&&U?.reason&&ie(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(U.reason)}`,"error",2800)}finally{te.delete(_),X()}}}async function Y(l,_){if(!r||!_||de.has(_))return;de.add(_),X();let E;try{let U=async(ae={})=>await r(l,{bead_id:_,expected_revision:F(),...ae});E=await U(),se(E),E&&E.conflict&&(E=await r(l,{bead_id:_,expected_revision:F()}),se(E)),l==="worker-revise-fix"&&(E=await fr(E,(ae,ge)=>U({continuation:ae,decision_token:ge}),{onResult:se,refresh:()=>U()}))}finally{de.delete(_),X()}if(!(!E||E.conflict)){if(E.ok){ie(l==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}ie(`\uCC98\uBD84 \uAC70\uBD80: ${E.reason||""}`,"error",3e3)}}async function ne(l){if(!r)return;let _=await r("worker-automation-toggle",{on:l,expected_revision:F()});se(_),_&&_.conflict&&await r("worker-automation-toggle",{on:l,expected_revision:F()}).then(se)}async function ce(l){if(!r||!l)return;let _=await r("worker-repo-operation-repair",{operation_id:l});if(se(_),_&&_.ok===!1){ie(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${_.reason||""}`,"error",3e3);return}_&&_.ok===!0&&ie("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function he(l){if(!r||!l)return;let _=await r("worker-repo-operation-dismiss",{operation_id:l});se(_),_&&_.ok===!1&&ie(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${_.reason||""}`,"error",3e3)}async function we(l){if(!r||!Number.isFinite(l))return;let _=Math.max(oo,Math.floor(l)),E=await r("worker-queue-set-slots",{slots:_,expected_revision:F()});se(E),E&&E.conflict&&await r("worker-queue-set-slots",{slots:_,expected_revision:F()}).then(se)}async function Pe(l){if(!r||!Number.isInteger(l)||l<1||l>Td)return;let _=xe(),E=(Array.isArray(_.serial_lanes)?_.serial_lanes:[]).slice(l).reduce((ge,fe)=>ge+(Array.isArray(fe?.entries)?fe.entries.length:0),0),U=()=>({count:l,expected_revision:F()}),ae=await r("worker-queue-set-serial-lane-count",U());se(ae),ae&&ae.conflict&&(ae=await r("worker-queue-set-serial-lane-count",U()),se(ae)),ae&&ae.applied&&E>0&&ie(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${E}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}function Oe(){let l=xe(),_=h?h.selectBoardColumn(Dm,"ready"):[],E=h?h.selectBoardColumn(Nm,"blocked"):[],U=h?h.selectBoardColumn(Fm,"closed"):[],ae=h?h.selectBoardColumn(qm,"in_progress"):[],ge=new Map;for(let b of ae){let q=eg(b);if(!q)continue;let le=ge.get(q);le?le.push(b):ge.set(q,[b])}let fe=b=>{let q=_s(ge.get(b)||[]);return q?q.title||q.id:null},Ze=l.bead_titles||{},y=new Map;for(let[b,q]of Object.entries(Ze))typeof q=="string"&&q.length>0&&y.set(b,q);for(let b of[..._,...E])y.set(b.id,b.title||b.id);let v=l.bead_times&&typeof l.bead_times=="object"&&!Array.isArray(l.bead_times)?l.bead_times:{},m=l.bead_labels&&typeof l.bead_labels=="object"&&!Array.isArray(l.bead_labels)?l.bead_labels:{},O=new Map;for(let[b,q]of Object.entries(m))Array.isArray(q)&&O.set(b,Ea(q));for(let b of[..._,...E]){let q=b.labels;Array.isArray(q)&&!O.has(b.id)&&O.set(b.id,Ea(q))}let T=new Map,ee=o?.get()?.last_good?.result?.groups;for(let b of Array.isArray(ee)?ee:[]){if(b?.eligible!==!0||!Array.isArray(b.members))continue;let q=b.members.map(Ue=>{let pt=(Array.isArray(l.serial_lanes)?l.serial_lanes:[]).find(Kt=>Kt.entries.some(Tt=>Tt.bead_id===Ue));return pt?pt.id:null});if(!(q.every(Ue=>Ue!==null)&&new Set(q).size===1))for(let Ue of b.members)T.set(Ue,b.members.filter(pt=>pt!==Ue))}let qe=l.bead_blocked_by&&typeof l.bead_blocked_by=="object"&&!Array.isArray(l.bead_blocked_by)?l.bead_blocked_by:{},Ge=new Map;for(let[b,q]of Object.entries(v))q&&typeof q=="object"&&Ge.set(b,q);for(let b of[..._,...E])Ge.set(b.id,{created_at:b.created_at,updated_at:b.updated_at});let Xe=b=>Ge.get(b)||{},Me=l.pr_wait||[],mt=l.pr_observations||{},sr=l.pr_activity||{},Gr=l.cleanup_failed||{},Vn=Object.entries(Gr).map(([b,q])=>({bead_id:b,step:q&&q.step?q.step:"",reason:q&&q.reason?q.reason:"",at:q&&typeof q.at=="number"?q.at:null,detail:q&&typeof q.detail=="string"?q.detail:null,output_tail:q&&typeof q.output_tail=="string"&&q.output_tail?q.output_tail:void 0,log_path:q&&typeof q.log_path=="string"&&q.log_path?q.log_path:void 0,retry_count:q&&typeof q.retry_count=="number"&&Number.isInteger(q.retry_count)&&q.retry_count>0?q.retry_count:0,failure_code:q&&typeof q.failure_code=="string"?q.failure_code:void 0,subject_id:q&&typeof q.subject_id=="string"?q.subject_id:void 0,repair_eligible:!!(q&&q.repair_eligible),repair:q&&q.repair?q.repair:void 0})),un=l.queue||[],pn=new Set([...un.map(b=>b.bead_id),...(Array.isArray(l.serial_lanes)?l.serial_lanes:[]).flatMap(b=>(Array.isArray(b?.entries)?b.entries:[]).map(q=>q.bead_id)),...Me.map(b=>b.bead_id),...l.done.map(b=>b.bead_id)]),Kn=new Set(E.map(b=>b.id)),Re=i?i.get()?.order||{}:{},ut=new Set,Vr=[];for(let b of[..._,...E])pn.has(b.id)||ut.has(b.id)||Jm(b)||Object.hasOwn(b,"labels")&&Sa(b.labels)||(ut.add(b.id),Vr.push(b));L=Qm(Vr,K,Re);let Kd=l.admission||{},Da=b=>{let q=Kd[b];if(!q)return"";if(q.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let le=typeof q.reason=="string"?q.reason:"",Ue=le.indexOf(":");return Ue>0&&Ue<le.length-1?`\u26D4 ${le.slice(0,Ue)} (${le.slice(Ue+1)})`:`\u26D4 ${le}`},Yd=L.map(b=>{let q=Mn(b),le=q.path.length>0,Ue=b.workflow?.route==="quick_fix"||b.metadata&&b.metadata.route==="quick_fix",pt=!Object.hasOwn(b,"description")||typeof b.description=="string"&&b.description.trim().length>0,Tt=!(Object.hasOwn(b,"labels")&&Sa(b.labels))&&(Ue?pt:le&&!q.conflict),dt=Kn.has(b.id),Yt=[];dt&&Yt.push(tg(b)),Ue&&!pt?Yt.push("missing_description"):!Ue&&q.conflict?Yt.push("spec_id_conflict"):!Ue&&!le&&Yt.push("spec \uC5C6\uC74C");let rs=Da(b.id);return rs&&Yt.push(rs),{id:b.id,title:b.title||b.id,reason:Yt.join(" \xB7 "),draggable:Tt,lane:"candidate",created_at:b.created_at,updated_at:b.updated_at,workflow:b.workflow,is_quick_fix:Ue,status:b.status,blocked:dt,has_spec:le}}),io=Um(Yd,N),Zd=io.visible,Xd=l.revise_parked||{},Yn=l.discard_operations&&typeof l.discard_operations=="object"&&!Array.isArray(l.discard_operations)?l.discard_operations:{},lo=(b,q)=>b.map((le,Ue)=>{let pt=q!=="done",Kt=q!=="done"&&q!=="queue",Tt=pt?Xd[le.bead_id]:null,dt=pt?cr(Yn,le.bead_id):null,Yt=dt?.operation?dt:null,rs=pt&&O.get(le.bead_id)===!0,ai=qe[le.bead_id]||[],_o=l.admission&&typeof l.admission=="object"?l.admission[le.bead_id]:null,mo=pt?kc(_o,!!Yt||te.has(le.bead_id)):null,du=pt&&!mo?Da(le.bead_id):null,uu=pt?[du]:[],ii=pt&&ai.length>0&&typeof _o?.reason=="string"&&_o.reason.startsWith("not_ready")?[`\u23F8 ${ai.join(", ")} \uC644\uB8CC \uB300\uAE30 (blocks)`]:[],go=pt?T.get(le.bead_id):void 0;return go&&go.length>0&&ii.push(`\u2733 serial \uAD8C\uC7A5 \xB7 ${go.join(", ")}\uC640`),{id:le.bead_id,title:y.get(le.bead_id)||le.bead_id,reason:uu.filter(Boolean).join(" \xB7 "),draggable:pt&&!Yt&&!mo,done:q==="done",lane:q,seq:Kt?Ue+1:void 0,worker_serial:rs,discard:Yt,stale_work:mo,badges:[...ii,...Tt?["\u23F8 REVISE \uD30C\uD0B9"]:[]],alert:!!Tt,revise_action:!!Tt,revise_enabled:!!Tt&&!Yt&&!de.has(le.bead_id),revise_title:Tt?Tt.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Tt.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:q==="done"?Wt(l.attempts||{},le.bead_id):null,work_ms:q==="done"?vc(l.attempts||{},le.bead_id):null,done_at:q==="done"&&typeof le.added_at=="number"?le.added_at:void 0,...Xe(le.bead_id)}}),Kr=l.attempts?Object.values(l.attempts):[],co=new Set;for(let b of Kr)b&&typeof b.resumed_from=="string"&&b.resumed_from.length>0&&co.add(b.resumed_from);let Na=new Map;for(let b of Kr)Na.set(b.bead_id,b.attempt_id);let Zn=new Map;for(let b of Kr)Zn.set(b.attempt_id,b);function uo(b){let q=new Set,le=b;for(;le&&!q.has(le.attempt_id);){if(le.conflict_resolution===!0)return!0;q.add(le.attempt_id),le=typeof le.resumed_from=="string"&&le.resumed_from.length>0&&Zn.get(le.resumed_from)||null}return!1}let Xn=typeof l.declared_base=="string"?l.declared_base:null;function Qd(b){let q=null;for(let le of Kr)!le||le.bead_id!==b||uo(le)||(q===null||(typeof le.started_at=="number"?le.started_at:0)>=(typeof q.started_at=="number"?q.started_at:0))&&(q=le);return q&&typeof q.target_base=="string"?q.target_base:null}let qa=[],Fa=[],Jd=md(l),ja=b=>{let q=typeof b.session_id=="string"&&b.session_id.length>0,le=co.has(b.attempt_id);return{eligible:q&&!le,reason:q?le?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},Vt=null;for(let b of Kr){let q=b.status==="paused"&&!co.has(b.attempt_id);if(b.status==="running"||q)Fa.push({bead_id:b.bead_id,attempt_id:b.attempt_id,title:y.get(b.bead_id)||b.bead_id,runner:b.runner||null,model:b.model||null,effort:b.effort||null,speed:b.speed||null,continuation_mode:b.continuation_mode||null,started_at:typeof b.started_at=="number"?b.started_at:null,resumed_from:b.resumed_from||null,paused:q,conflict_resolution:uo(b),base_exception:Ia(Xn,b.target_base),can_pause:typeof b.session_id=="string"&&b.session_id.length>0,discard:cr(Yn,b.bead_id,{attempt_id:b.attempt_id}),usage:Wt(l.attempts||{},b.bead_id),current_child:fe(b.bead_id),...Xe(b.bead_id)});else if((b.status==="failed"||b.status==="orphaned")&&Jd(b)){let le=ja(b);qa.push({bead_id:b.bead_id,attempt_id:b.attempt_id,title:y.get(b.bead_id)||b.bead_id,runner:b.runner||null,model:b.model||null,effort:b.effort||null,speed:b.speed||null,continuation_mode:b.continuation_mode||null,started_at:typeof b.started_at=="number"?b.started_at:null,resumed_from:b.resumed_from||null,failed:!0,status:b.status,status_label:b.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:cr(Yn,b.bead_id,{attempt_id:b.attempt_id}),resume_eligible:le.eligible,resume_reason:le.reason,conflict_resolution:uo(b),base_exception:Ia(Xn,b.target_base),usage:Wt(l.attempts||{},b.bead_id),current_child:fe(b.bead_id),...Xe(b.bead_id)}),Vt=b}}let Qn=[...qa,...Fa].map(b=>{let q=Zn.get(b.attempt_id),le=q?.quickfix_landing;if(q?.quickfix_lane!==!0||!le||typeof le!="object")return b;let Ue=typeof le.reason=="string"&&le.reason.length>0?le.reason:null,pt=Un({bead_id:q.bead_id,merge_sha:le.head_sha,cleanup_cursor:le.cursor,cleanup_failed:Ue?{step:le.cursor,reason:Ue}:null,repo_operations:Array.isArray(l.repo_operations)?l.repo_operations:[]});return pt?{...b,landing:pt}:b}),Ba=null;if(Vt){let b=ja(Vt),q=Vt.cause_detail;Ba={bead_id:Vt.bead_id,repo:Vt.repo||"",reason:Vt.cause||Vt.status,cause_detail:q&&typeof q.reason=="string"?{reason:q.reason,command:typeof q.command=="string"?q.command:null}:null,resume_attempt_id:Vt.attempt_id,resume_eligible:b.eligible,resume_reason:b.reason,discard:cr(Yn,Vt.bead_id,{attempt_id:Vt.attempt_id})}}let Ua=new Set(Qn.map(b=>b.bead_id)),po=Array.isArray(l.merge_queue)?l.merge_queue:[],Wa=new Map,za=new Map,Ha=new Map,Ga=new Map,Va=new Map;po.forEach((b,q)=>{b&&typeof b.bead_id=="string"&&(Wa.set(b.bead_id,q+1),za.set(b.bead_id,b.resolution),Ha.set(b.bead_id,b.continuation_action||null),Ga.set(b.bead_id,b.head_review||null),Va.set(b.bead_id,b.authority||null))});let Yr=l.merge_queue_state||{active:null,failures:{}},eu=Yr.failures||{},Ka=Yr.waiting&&typeof Yr.waiting.bead_id=="string"&&typeof Yr.waiting.reason=="string"?Yr.waiting:null,tu=l.auto_merge_skips||{},Ya=b=>{let q=tu[b];if(!q)return null;let le=mt[b],Ue=le&&le.pr?le.pr.head_sha:null;return Ue&&Ue===q.head_sha?q.reason||"":null},Jn=new Map;for(let b of Qn)b.failed!==!0&&b.conflict_resolution&&(b.paused?Jn.has(b.bead_id)||Jn.set(b.bead_id,"paused"):Jn.set(b.bead_id,"running"));let Za=Qn.filter(b=>!b.paused&&b.failed!==!0).length,Xa=(l.workspace_info||{}).slots,Qa=typeof Xa=="number"?Xa:typeof l.slots=="number"?l.slots:oo,ru=Za>Qa,es=Nr(W),nu=(Array.isArray(l.done)?l.done.slice():[]).filter(b=>es===void 0||typeof b.added_at!="number"||b.added_at>=es).sort((b,q)=>(q.added_at||0)-(b.added_at||0)),fn=lo(nu,"done"),su=new Set((Array.isArray(l.done)?l.done:[]).map(b=>b?.bead_id).filter(b=>typeof b=="string")),Ja=[],ou=u?.()||"";for(let b of U){let q=jr(b.closed_at);if(typeof b.id!="string"||su.has(b.id)||q===null||es!==void 0&&q<es||typeof b.comment_count!="number"||b.comment_count<=0)continue;let le=`${ou}\0${b.id}\0${String(b.updated_at)}\0${b.comment_count}`,Ue=I.get(le);Ue===void 0&&r&&(I.set(le,"pending"),Promise.resolve(r("get-comments",{id:b.id})).then(pt=>{let Kt=Array.isArray(pt)&&pt.some(Tt=>Fs(typeof Tt?.text=="string"?Tt.text:"")?.lane==="session");I.set(le,Kt?"session":"not-session"),X()}).catch(()=>{I.set(le,"failed"),X()})),Ue==="session"&&Ja.push({id:b.id,title:b.title||b.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:null,done_at:q,created_at:b.created_at,updated_at:b.updated_at})}fn.push(...Ja),fn.sort((b,q)=>(q.done_at||0)-(b.done_at||0));let ts={};for(let b of _r)ts[b]=0;let ei=!1,ti=0,fo=0,ri=0;for(let b of fn){let q=b.usage;if(q&&typeof q=="object"){let le=!1;for(let Ue of _r)Number.isFinite(q[Ue])&&(ts[Ue]+=q[Ue],ei=!0,le=!0);le&&(fo+=1,Number.isFinite(q.total_cost_usd)&&(ti+=q.total_cost_usd,ri+=1))}}fo>0&&ri===fo&&(ts.total_cost_usd=ti);let ni=fn.map(b=>b.usage).filter(b=>b&&typeof b=="object"&&b.providers),au=ni.length>0?$t(xs(ni)):ei?Qt(ts):null,iu=l.lane_states&&typeof l.lane_states=="object"&&!Array.isArray(l.lane_states)?l.lane_states:{},lu=Array.isArray(l.serial_lanes)?l.serial_lanes:[],si=b=>{if(Me.some(Ue=>Ue.bead_id===b))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let q=Kr.filter(Ue=>Ue&&Ue.bead_id===b),le=q.length>0?q[q.length-1].status:null;return le==="failed"||le==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":le==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},oi=lu.filter(b=>b&&typeof b.id=="string"&&Array.isArray(b.entries)).map((b,q)=>{let le=iu[b.id]||{},Ue=new Map((Array.isArray(le.corrections)?le.corrections:[]).filter(dt=>dt&&typeof dt.bead_id=="string"&&typeof dt.after=="string").map(dt=>[dt.bead_id,dt.after])),pt=lo(b.entries.filter(dt=>!Ua.has(dt.bead_id)),b.id).map(dt=>Ue.has(dt.id)?{...dt,badges:[`\u{1F517} ${Ue.get(dt.id)} \uB4A4 (blocks \uC790\uB3D9)`,...dt.badges]}:dt),Kt=Array.isArray(le.occupied_by)?le.occupied_by.filter(dt=>typeof dt=="string"):[],Tt=Kt.map(dt=>({id:dt,title:y.get(dt)||dt,draggable:!1,lane:b.id,ghost:!0,badges:[si(dt)]}));return{id:b.id,index:q+1,rows:[...Tt,...pt],occupied:Kt.length>0,badge:Kt.length>0?si(Kt[0]):"\uB300\uAE30",cycle:le.cycle===!0}}),cu=typeof l.serial_lane_count=="number"?l.serial_lane_count:oi.length;return{queue:l,idToTitle:y,candidates:Zd,candidate_hidden:{blocked:io.hidden_blocked,spec:io.hidden_spec},running:Qn,live_count:Za,slots:Qa,over_cap:ru,failure:Ba,waiting:lo(un.filter(b=>!Ua.has(b.bead_id)),"queue"),serial_lanes:oi,serial_lane_count:cu,pr_wait:Me.map(b=>lg(b.bead_id,y.get(b.bead_id)||b.bead_id,mt,Gr[b.bead_id]||null,Wt(l.attempts||{},b.bead_id),sr[b.bead_id]||(B.has(b.bead_id)||oe.has(b.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),Jn.get(b.bead_id)||null,b.external===!0,{position:Wa.get(b.bead_id)||0,active:Yr.active===b.bead_id,failure:eu[b.bead_id]||null,waiting:Ka?.bead_id===b.bead_id?Ka.reason:null,resolution:za.get(b.bead_id),continuation_action:Ha.get(b.bead_id),head_review:Ga.get(b.bead_id)||null,authority:Va.get(b.bead_id)||null},b.wt_present!==!1,l.auto_merge===!0?Ya(b.bead_id):null,Ia(Xn,Qd(b.bead_id)),l.completion_status&&typeof l.completion_status=="object"&&!Array.isArray(l.completion_status)&&l.completion_status[b.bead_id]||null,l.discard_operations&&typeof l.discard_operations=="object"&&!Array.isArray(l.discard_operations)?l.discard_operations:{},Zn.get(Na.get(b.bead_id)||"")?.worker_serial===!0,l.auto_merge===!0,{merge_sha:b.merge_sha,cleanup_cursor:b.cleanup_cursor,repo_operations:Array.isArray(l.repo_operations)?l.repo_operations:[]})).map(b=>({...b,...Xe(b.id)})),merge_queue_length:po.length,merge_queue_running:po.length>0,auto_excluded:Me.map(b=>b.bead_id).filter(b=>Ya(b)!==null),declared_base:Xn,done:fn,token_total:au,cleanup_failures:Vn,repo_operations:Array.isArray(l.repo_operations)?l.repo_operations:[]}}function ke(){let _=!!o?.get()?.job,E=!_&&o?.isPending?.()===!0,U=_?"\uBD84\uC11D \uC911":E?"\uC900\uBE44 \uC911":"";return d`<button
      type="button"
      class=${U?"worker-analysis-btn worker-analysis-btn--running":"worker-analysis-btn"}
      aria-busy=${U?"true":"false"}
      title="대기 이슈의 병렬 실행 가능성을 분석해 직렬 그룹을 제안합니다 (클릭할 때만 실행)"
    >
      ✳ 병렬성
      분석${U?d`<span class="worker-analysis-btn__badge">${U}</span>`:""}
    </button>`}function ze(l){let _=l.waiting.length>0?l.waiting[0].id:"\u2014",E=d`<button
      type="button"
      class="worker-play${l.queue.auto_advance?" is-active":""}"
    >
      ${l.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,U=Z(l),ae=l.over_cap?d`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",ge=d`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${l.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${l.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${S()} 완료 <b>${l.done.length}</b></span
      >`,fe=d`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${l.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${l.declared_base||"?"}</span
    >`,Ze=d`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${oo}
          step="1"
          .value=${String(l.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:Td},(m,O)=>O+1).map(m=>d`<option
                value=${String(m)}
                ?selected=${l.serial_lane_count===m}
              >
                ${m}
              </option>`)}
        </select>
      </label>
      ${o?ke():""} `,y=Dc({failure:l.failure}),v=wc(l.repo_operations,l.cleanup_failures);return k?d`<div class="worker-ribbon">
          ${E} ${U}
          <div class="worker-kpi worker-kpi--ribbon">${ae}${ge}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${Ze}</div>
          <div class="worker-kpi">${fe}</div>
        </div>
        ${v}${Fe.template()}${y}`:d`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${E}${U}${Ze}</div>
        <div class="worker-kpi">
          ${ae}${ge}${fe}
          ${(Array.isArray(l.token_total)?l.token_total:l.token_total?[{label:l.token_total,tooltip:`${S()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(m=>d`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${m.tooltip}
                >${S()} 완료 · 누적 ${m.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${_}</b></span
          >
        </div>
      </div>
      ${v}${Fe.template()}${y}`}function j(l){if(l.running.length===0&&l.pr_wait.length===0)return"";let _=l.running.some(E=>!E.paused&&E.failed!==!0);return d`<section
      class="worker-now${_?" worker-pane--live":""}"
      id="worker-now"
    >
      <header class="worker-now__hd">
        <span
          class="worker-pane__dot worker-pane__dot--running"
          aria-hidden="true"
        ></span>
        <span class="worker-now__title">지금</span>
        <span class="worker-now__count"
          >${l.running.length+l.pr_wait.length}</span
        >
      </header>
      ${l.running.length>0?ha(l.running,Date.now(),Le):""}
      ${l.pr_wait.map(E=>da(E))}
    </section>`}function Q(l){let _=l.candidate_hidden;return d`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${N.show_blocked}
        />
        🔒 blocked${_.blocked>0?` ${_.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Wm.map(E=>d`<button
              type="button"
              class="worker-filter__chip${N.spec===E.value?" is-active":""}"
              data-spec=${E.value}
              aria-pressed=${N.spec===E.value?"true":"false"}
            >
              ${E.label}
            </button>`)}
        ${_.spec>0?d`<span class="worker-filter__hidden">숨김 ${_.spec}</span>`:""}
      </div>
    </div>`}function w(){return d`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${K}
    >
      ${zm.map(l=>d`<option value=${l.value} ?selected=${K===l.value}>
            ${l.label}
          </option>`)}
    </select>`}function C(){return d`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${W}
      >
        ${or.map(l=>d`<option value=${l.value} ?selected=${W===l.value}>
              ${l.label}
            </option>`)}
      </select>
    </div>`}function P(l){let _=d`<span
      class="worker-lane__badge${l.occupied?" worker-lane__badge--held":""}"
      >${l.badge}</span
    >`,E=l.cycle?d`<div class="worker-lane__cycle">
          ⚠ blocks 순환 감지 — 자동 정렬을 생략했습니다
        </div>`:"";return rr({id:`worker-pane-lane-${l.id}`,lane:l.id,title:`\uC9C1\uB82C ${l.index}`,items:l.rows,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:_,controls:E})}function Z(l){let _=l.queue.auto_merge===!0;if(l.merge_queue_running)return d`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${_?" is-active":""}"
        title=${_?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${_?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${l.merge_queue_length}
      </button>`;if(_)return d`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let E=new Set(l.auto_excluded),U=l.pr_wait.filter(ae=>ae.merge_action&&ae.merge_enabled&&!E.has(ae.id)).length;return d`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${U>0?` ${U}`:""}
    </button>`}function pe(l){let _=rr({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:l.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:w(),controls:Q(l),place_menu:H(l.candidates)});return k?d`<div class="worker-lanes worker-lanes--mobile">
        ${j(l)}
        ${rr({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:l.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:D.queue,preview:Rd(l.waiting)})}
        ${l.serial_lanes.map(E=>P(E))}
        ${_}
        ${rr({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:l.done,empty:`${S()} \uC644\uB8CC \uC5C6\uC74C`,controls:C(),collapsible:!0,collapsed:D.done,preview:Array.isArray(l.token_total)?l.token_total.map(E=>E.label).join(" \xB7 "):l.token_total||Rd(l.done)})}
      </div>`:d`<div class="worker-lanes">
      ${_}
      <div class="worker-wait">
        ${rr({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:l.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
        ${l.serial_lanes.map(E=>P(E))}
      </div>
      ${rr({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${l.slots}`,items:l.running,live:l.running.some(E=>!E.paused&&E.failed!==!0),body:ha(l.running,Date.now(),Le)})}
      ${rr({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:l.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${rr({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${S()} ${l.done.length}`,items:l.done,empty:`${S()} \uC644\uB8CC \uC5C6\uC74C`,controls:C()})}
    </div>`}function $e(l){D={...D,[l]:!D[l]},Xm(D),X()}function X(){let l=Oe();Qe(ze(l),rt),Qe(pe(l),be)}function nt(){let l=document.querySelector(".app-header");if(!l)return;let _=()=>{let E=Math.round(l.getBoundingClientRect().height);Ie.style.setProperty("--worker-ribbon-top",`${E}px`)};if(_(),typeof ResizeObserver=="function"){let E=new ResizeObserver(_);E.observe(l),re.push(()=>E.disconnect())}else window.addEventListener("resize",_),re.push(()=>window.removeEventListener("resize",_))}function Ee(){if(typeof window.matchMedia!="function")return;let l=window.matchMedia(Ym);k=!!l.matches;let _=E=>{let U=!!(E&&typeof E.matches=="boolean"?E.matches:l.matches);U!==k&&(k=U,X())};typeof l.addEventListener=="function"?(l.addEventListener("change",_),re.push(()=>l.removeEventListener("change",_))):typeof l.addListener=="function"&&(l.addListener(_),re.push(()=>l.removeListener(_)))}let ft=null;function He(l){ft=l.target instanceof Element?l.target:null}function At(l){let E=l.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!E)return;if(ft&&E.contains(ft)&&ft.closest("input, button, a")){l.preventDefault();return}let U=E.dataset.beadId||"",ae=E.dataset.lane||"";A={bead_id:U,from_lane:ae};try{l.dataTransfer?.setData("text/plain",U),l.dataTransfer&&(l.dataTransfer.effectAllowed="move")}catch{}}function Ft(l){let _=l.target?.closest?.(".worker-pane");if(!_)return;let E=_.dataset.lane||"";E!=="candidate"&&E!=="queue"&&!/^s[1-5]$/.test(E)||(l.preventDefault(),l.dataTransfer&&(l.dataTransfer.dropEffect="move"),_.classList.add("worker-pane--drag-over"))}function dr(l){l.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function yt(l,_){let E=L.find(fe=>fe.id===l);if(!E)return;let U=L.filter(fe=>fe.id!==l),ae=U.length;if(_){let fe=_.dataset.beadId;if(fe===l)return;let Ze=U.findIndex(y=>y.id===fe);Ze>=0&&(ae=Ze)}let ge=U.slice();ge.splice(ae,0,E),R.applyReorder(l,ge,ae)}function Et(l){let _=l.target?.closest?.(".worker-pane");if(!_)return;l.preventDefault(),_.classList.remove("worker-pane--drag-over");let E=_.dataset.lane||"",U=A?.bead_id||l.dataTransfer?.getData("text/plain")||"",ae=A?.from_lane||"";if(A=null,!U)return;let ge=l.target?.closest?.(".worker-mini, .worker-card"),fe=Array.from(_.querySelectorAll(".worker-mini, .worker-card")),Ze=fe.length;if(ge){let y=fe.indexOf(ge);y>=0&&(Ze=y)}if(Ze=Math.max(0,Ze-_.querySelectorAll(".worker-mini--ghost").length),_.classList.contains("worker-pane--collapsed")&&(Ze=Te()),E==="candidate"){if(ae==="candidate"){yt(U,ge);return}(ae==="queue"||/^s[1-5]$/.test(ae))&&Se(U);return}if(E==="queue"||/^s[1-5]$/.test(E)){let y=E==="queue"?"parallel":E;ae===E?We(U,y,Ze):je(U,y,Ze)}}function ur(l){N=l,Bm(l),X()}function wr(l){K=l==="board"||l==="created"||l==="spec"?l:ao,Gm(K),X()}function jt(l){W=Ut(l)?l:Pt,Km(W),f?.(W),X()}function Ht(l){let _=l.target?.closest?.(".worker-serial-lane-count");if(_){let Ze=Number.parseInt(_.value,10);Number.isFinite(Ze)&&Pe(Ze).then(X);return}let E=l.target?.closest?.(".worker-filter__blocked");if(E){ur({...N,show_blocked:E.checked});return}let U=l.target?.closest?.(".worker-done-range");if(U){jt(U.value);return}let ae=l.target?.closest?.(".worker-sort");if(ae){wr(ae.value||ao);return}let ge=l.target?.closest?.(".worker-slots__input");if(!ge)return;let fe=Number.parseInt(ge.value,10);if(!Number.isFinite(fe)){X();return}we(fe).then(X)}function vt(l){return l?{runner:l.runner||void 0,model:l.model||void 0,effort:l.effort||void 0,worktree:l.worktree||void 0,status:l.status||void 0,session_id:l.session_id||void 0}:{}}function nr(){let l=Oe();return{operations:l.repo_operations,cleanup_failures:l.cleanup_failures,repo:u&&u()||""}}function et(){Le&&ye.close(),Ve.hidden=!1,De.hidden=!1,Ae.open(nr()),X()}function Ot(l){let _=xe(),E=_.attempts?_.attempts[l]:null;Le=l,_e=null,Ae.close(),Ve.hidden=!0,De.hidden=!1,ye.open({attempt_id:l,meta:vt(E)}),X()}function kr(l,_){Le=null,_e=l,Ae.close(),Ve.hidden=!0,De.hidden=!1,ye.open({attempt_id:l,meta:_,hide_prompt:!0}),X()}function Gt(){if(Ae.isOpen()&&Ae.refresh(nr()),_e){let E=(o?.get()?.runs||[]).find(U=>U.run_id===_e);E?ye.updateMeta(Ca(E)):ye.close();return}if(!Le)return;let l=xe(),_=l.attempts?l.attempts[Le]:null;if(_){ye.updateMeta(vt(_));return}ye.close()}function me(l){let _=l.target;if(_?.closest?.(".worker-mini__serial, .worker-mini__grip")||_?.closest?.("#worker-parallel-analysis-dialog"))return;if(_?.closest?.(".worker-analysis-btn")){Ke?.open();return}if(_?.closest?.(".worker-repo-strip")||_?.closest?.(".worker-mini__timeline")){et();return}let E=_?.closest?.(".worker-repo-op__session");if(E){let Re=E.dataset.attemptId;Re&&Ot(Re);return}let U=_?.closest?.(".worker-repo-op__resolve");if(U){ce(U.dataset.operationId||"");return}let ae=_?.closest?.(".worker-repo-op__dismiss");if(ae){he(ae.dataset.operationId||"");return}let ge=_?.closest?.(".worker-cleanup__resume");if(ge){let Re=ge.dataset.beadId;Re&&Be(Re);return}let fe=_?.closest?.(".worker-banner__resume");if(fe){let Re=fe.dataset.attemptId;Re&&Ye(Re);return}let Ze=_?.closest?.(".worker-banner__discard");if(Ze){let Re=Ze.dataset.confirmation==="merged"?"merged":"unmerged";M(Ze.dataset.beadId||"",Ze.dataset.attemptId||null,Re,Ze.dataset.operationId||null);return}let y=_?.closest?.(".worker-banner__dismiss");if(y){let Re=y.dataset.attemptId;Re&&z(Re);return}if(_?.closest?.(".worker-play")){ne(!xe().auto_advance);return}let v=_?.closest?.(".worker-merge-all");if(v){v.classList.contains("worker-merge-all--stop")?xe().auto_merge===!0?g(!1):x():g(!0);return}let m=_?.closest?.(".worker-pane__hd--toggle");if(m){let Re=m.dataset.lane;(Re==="queue"||Re==="done")&&$e(Re);return}let O=_?.closest?.(".worker-card__place-lane");if(O){let Re=O.dataset.beadId,ut=O.dataset.lane;Re&&(ut==="parallel"||/^s[1-5]$/.test(ut||""))&&(V=null,X(),je(Re,ut));return}if(_?.closest?.(".worker-card__place-cancel")){V=null,X();return}let ee=_?.closest?.(".worker-card__place");if(ee){let Re=ee.dataset.beadId;Re&&!ee.disabled&&(tt()?(V=Re,X()):je(Re,"parallel"));return}let qe=_?.closest?.(".worker-filter__chip");if(qe){let Re=qe.dataset.spec;(Re==="all"||Re==="with"||Re==="without")&&ur({...N,spec:Re});return}let Ge=_?.closest?.(".worker-mini__merge");if(Ge){let Re=Ge.dataset.beadId||"";xe().cleanup_failed?.[Re]?Be(Re):Ce(Re);return}let Xe=_?.closest?.(".worker-mini__merge-cancel");if(Xe){$(Xe.dataset.beadId||"");return}let Me=_?.closest?.(".worker-mini__discard");if(Me){M(Me.dataset.beadId||"",Me.dataset.attemptId||null,Me.dataset.discardMode==="merged"?"merged":"unmerged",Me.dataset.operationId||null);return}let mt=_?.closest?.(".worker-mini__stale-continue");if(mt){G("worker-stale-work-continue",mt.dataset.beadId||"",mt.dataset.actionId||"");return}let sr=_?.closest?.(".worker-mini__stale-backup");if(sr){G("worker-stale-work-backup-fresh",sr.dataset.beadId||"",sr.dataset.actionId||"");return}let Gr=_?.closest?.(".worker-mini__stale-recheck");if(Gr){G("worker-stale-work-recheck",Gr.dataset.beadId||"",Gr.dataset.actionId||"");return}let Vn=_?.closest?.(".worker-mini__revise-fix");if(Vn){Y("worker-revise-fix",Vn.dataset.beadId||"");return}let un=_?.closest?.(".worker-mini__revise-approve");if(un){Y("worker-revise-approve",un.dataset.beadId||"");return}if(_?.closest?.(".worker-mini__pr"))return;if(_?.closest?.(".rtile__discard")){let Re=_?.closest?.(".rtile"),ut=Re?.dataset?.beadId,Vr=Re?.dataset?.attemptId;ut&&M(ut,Vr||null,"unmerged",_?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(_?.closest?.(".rtile__dismiss")){let ut=_?.closest?.(".rtile")?.dataset?.attemptId;ut&&z(ut);return}if(_?.closest?.(".rtile__pause")){let ut=_?.closest?.(".rtile")?.dataset?.attemptId;ut&&lt(ut);return}if(_?.closest?.(".rtile__resume")){let ut=_?.closest?.(".rtile")?.dataset?.attemptId;ut&&Ye(ut);return}if(_?.closest?.(".rtile__session")){let ut=_?.closest?.(".rtile")?.dataset?.attemptId;ut&&Ot(ut);return}if(_?.closest?.(".worker-drawer-overlay__backdrop")){Ae.close(),ye.close();return}if(_?.closest?.(".worker-drawer-host"))return;let pn=_?.closest?.(".rtile");if(pn){if(_?.closest?.(".rtile__id")){let ut=pn.dataset.beadId;ut&&Xt(ut).then(Vr=>{Vr?ie("\uBCF5\uC0AC\uB428","success",1200):ie("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Re=pn.dataset.beadId;Re&&c&&c(Re);return}let Kn=_?.closest?.(".worker-mini, .worker-card");if(Kn){let Re=Kn.dataset.beadId;if(_?.closest?.(".worker-mini__id, .worker-card__id")){Re&&Xt(Re).then(ut=>{ut?ie("\uBCF5\uC0AC\uB428","success",1200):ie("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}Re&&c&&c(Re)}}return e.addEventListener("pointerdown",He),e.addEventListener("dragstart",At),e.addEventListener("dragover",Ft),e.addEventListener("dragleave",dr),e.addEventListener("drop",Et),e.addEventListener("click",me),e.addEventListener("change",Ht),Ee(),nt(),h&&re.push(h.subscribe(()=>{for(let[l,_]of I)_==="failed"&&I.delete(l);X()})),s&&re.push(s.subscribe(()=>{let l=u&&u()||"";l!==ve&&(ve=l,Ne.close()),X(),Gt()})),o&&typeof o.subscribe=="function"&&re.push(o.subscribe(()=>{Gt(),X()})),X(),{load(){X()},destroy(){for(let l of re.splice(0))try{l()}catch{}e.removeEventListener("pointerdown",He),e.removeEventListener("dragstart",At),e.removeEventListener("dragover",Ft),e.removeEventListener("dragleave",dr),e.removeEventListener("drop",Et),e.removeEventListener("click",me),e.removeEventListener("change",Ht);try{ye.destroy()}catch{}De.hidden=!0;try{Ke?.destroy()}catch{}try{Ne.destroy()}catch{}Qe(d``,e)}}}function Oa(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function Dd(e,t,r,n=async()=>{},s=async()=>{}){let o=_t("views:workspace-picker"),a=null,i=!1,c=!1,u=!1;async function p(D){let B=D.target.value,de=t.getState().workspace?.current?.path||"";if(B&&B!==de){o("switching workspace to %s",B),i=!0,S();try{await r(B)}catch(te){o("workspace switch failed: %o",te)}finally{i=!1,S()}}}async function f(){let D=t.getState(),k=D.workspace?.current?.path||D.workspace?.available?.[0]?.path||"";if(!(!k||c)){o("git-pulling workspace %s",k),c=!0,S();try{await n(k)}catch(B){o("workspace git pull failed: %o",B)}finally{c=!1,S()}}}function h(D){let k=D.target;k&&e.contains(k)||L()}function R(D){D.key==="Escape"&&L()}function A(){u||(u=!0,document.addEventListener("mousedown",h),document.addEventListener("keydown",R),S())}function L(){u&&(u=!1,document.removeEventListener("mousedown",h),document.removeEventListener("keydown",R),S())}function N(){u?L():A()}async function V(D){let k=D.target,B=k.value,oe=k.checked;o("toggling visibility %s \u2192 %s",B,String(oe));try{await s(B,oe)}catch(de){o("workspace visibility toggle failed: %o",de)}}function K(D){return D?d`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${f}
        ?disabled=${i||c}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:d``}function W(D,k){return d`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${N}
          aria-haspopup="true"
          aria-expanded=${u?"true":"false"}
          aria-label="프로젝트 관리"
        >
          프로젝트 관리
        </button>
        ${u?d`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${D.map(B=>d`
                    <label
                      class="workspace-picker__manage-row"
                      title="${B.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${B.path}"
                        .checked=${!k.has(B.path)}
                        @change=${V}
                      />
                      <span class="workspace-picker__manage-name"
                        >${Oa(B.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function I(){let D=t.getState(),k=D.workspace?.current,B=D.workspace?.available||[],oe=new Set(D.workspace?.hidden||[]),de=k?.path||B[0]?.path||"";if(B.length===0)return d``;let te=B.filter(re=>!oe.has(re.path)||re.path===de);if(te.length<=1){let re=te[0]||B[0],Ie=Oa(re.path);return d`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${re.path}"
            >${Ie}</span
          >
          ${W(B,oe)}
          ${K(de)}
          ${c?d`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return d`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${p}
          ?disabled=${i||c}
          aria-label="Select project workspace"
        >
          ${te.map(re=>d`
              <option
                value="${re.path}"
                ?selected=${re.path===de}
                title="${re.path}"
              >
                ${Oa(re.path)}
              </option>
            `)}
        </select>
        ${W(B,oe)}
        ${K(de)}
        ${i||c?d`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function S(){Qe(I(),e)}return S(),a=t.subscribe(()=>S()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",h),document.removeEventListener("keydown",R),Qe(d``,e)}}}var Nd=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-serial-lane-count","subscribe-worker-parallel-analysis","unsubscribe-worker-parallel-analysis","worker-parallel-analysis-snapshot","worker-parallel-analysis-targets","worker-parallel-analysis-prompt","worker-parallel-analysis-start","worker-parallel-analysis-cancel","worker-parallel-analysis-settings-update","worker-parallel-analysis-submit","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle"];function Ma(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function qd(e,t,r=Ma()){return{id:r,type:e,payload:t}}function Fd(e={}){let t=_t("ws"),r={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},n=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,i=null,c=!0,u=new Map,p=[],f=new Map,h=new Set;function R(I){for(let S of Array.from(h))try{S(I)}catch{}}function A(){if(!c||i)return;o="reconnecting",t("ws reconnecting\u2026"),R(o);let I=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,a)),S=(r.jitterRatio||0)*I,D=Math.max(0,Math.round(I+(Math.random()*2-1)*S));t("ws retry in %d ms (attempt %d)",D,a+1),i=setTimeout(()=>{i=null,W()},D)}function L(I){try{s?.send(JSON.stringify(I))}catch(S){t("ws send failed",S)}}function N(){for(o="open",t("ws open"),R(o),a=0;p.length;){let I=p.shift();I&&L(I)}}function V(I){let S;try{S=JSON.parse(String(I.data))}catch{t("ws received non-JSON message");return}if(!S||typeof S.id!="string"||typeof S.type!="string"){t("ws received invalid envelope");return}if(u.has(S.id)){let k=u.get(S.id);u.delete(S.id),S.ok?k?.resolve(S.payload):k?.reject(S.error||new Error("ws error"));return}let D=f.get(S.type);if(D&&D.size>0)for(let k of Array.from(D))try{k(S.payload)}catch(B){t("ws event handler error",B)}else t("ws received unhandled message type: %s",S.type)}function K(){o="closed",t("ws closed"),R(o);for(let[I,S]of u.entries())S.reject(new Error("ws disconnected")),u.delete(I);a+=1,A()}function W(){if(!c)return;let I=n();try{s=new WebSocket(I),t("ws connecting %s",I),o="connecting",R(o),s.addEventListener("open",N),s.addEventListener("message",V),s.addEventListener("error",()=>{}),s.addEventListener("close",K)}catch(S){t("ws connect failed %o",S),A()}}return W(),{send(I,S){if(!Nd.includes(I))return Promise.reject(new Error(`unknown message type: ${I}`));let D=Ma(),k=qd(I,S,D);return t("send %s id=%s",I,D),new Promise((B,oe)=>{u.set(D,{resolve:B,reject:oe,type:I}),s&&s.readyState===s.OPEN?L(k):(t("queue %s id=%s (state=%s)",I,D,o),p.push(k))})},on(I,S){f.has(I)||f.set(I,new Set);let D=f.get(I);return D?.add(S),()=>{D?.delete(S)}},onConnection(I){return h.add(I),()=>{h.delete(I)}},reconnect(){c=!0,i&&(clearTimeout(i),i=null),a=0,W()},close(){c=!1,i&&(clearTimeout(i),i=null);try{s?.close()}catch{}},getState(){return o}}}function cg(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function dg(e,t){try{let n=await(await fetch("/api/config")).json();e.setState({config:n})}catch(r){t("config refresh failed",r)}}var Pa=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],jd=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:closed","closed-issues"]],Rr="tab:worker:closed",ug="bdui.worker.done-range",Bd=td,Ud="worker:queue",Wd="worker:parallel-analysis",zd="ui:order",Hd="ui:display-policy",Gd="exec:presets",Ir="tab:board:closed",Vd="beads-ui.board.closed-range";function pg(e){let t=_t("main");t("bootstrap start");let r=d`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Qe(r,e);let n=document.getElementById("top-nav"),s=document.getElementById("usage-meter"),o=document.getElementById("board-root"),a=document.getElementById("worker-root"),i=document.getElementById("monitor-root"),c=document.getElementById("detail-panel");if(s&&_d(s),o&&a&&i&&c){let Ve=function(y,v){let m="Request failed",O="";if(y&&typeof y=="object"){let ee=y;if(typeof ee.message=="string"&&ee.message.length>0&&(m=ee.message),typeof ee.details=="string")O=ee.details;else if(ee.details&&typeof ee.details=="object")try{O=JSON.stringify(ee.details,null,2)}catch{O=""}}else typeof y=="string"&&y.length>0&&(m=y);let T=v&&v.length>0?`Failed to load ${v}`:"Request failed";it.open(T,m,O)},Ye=function(y){return`${et.getState().workspace.current?.path||""}\0${y}`},z=function(){H&&(H().catch(()=>{}),H=null),F=null,se=null},Ce=function(y){Te=y;let v=()=>{Te!==y||et.getState().selected_id!==y||(Te=null,J(y))};if(!Se){We.then(v);return}v()},$=function(y,v,m,O,T){return m!==g[v]?(T().catch(()=>{}),!1):(y.set(O,T),!0)},M=function(){let y=et.getState();he(y.view==="board"),j(y.view==="worker"),Z(y.view==="monitor"),w(y.view==="board"||y.view==="worker"||x||!!y.selected_id)},ne=function(){let y=Nr(G);return y===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:y}}},ce=function(){let y=Nr(Y);return y===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:y}}},he=function(y){if(y)for(let[v,m]of Pa){if(Be.has(v)||ue.has(v))continue;let O=v===Ir?ne():{type:m};try{ye.register(v,O)}catch(qe){t("register %s store failed: %o",v,qe)}ue.add(v);let T=g.board,ee=!1;_e.subscribeList(v,O).then(qe=>{ee=!$(Be,"board",T,v,qe)}).catch(qe=>{t("subscribe %s failed: %o",v,qe),Ve(qe,"board")}).finally(()=>{ue.delete(v),ee&&M()})}else Oe()},Oe=function(){g.board+=1;for(let[y]of Pa){let v=Be.get(y);v&&(v().catch(()=>{}),Be.delete(y));try{ye.unregister(y)}catch(m){t("unregister %s failed: %o",y,m)}}},j=function(y){if(!y){Q();return}for(let[v,m]of jd){if(ke.has(v)||ue.has(v))continue;let O=v===Rr?ce():{type:m};try{ye.register(v,O)}catch(qe){t("register %s store failed: %o",v,qe)}ue.add(v);let T=g.worker,ee=!1;_e.subscribeList(v,O).then(qe=>{ee=!$(ke,"worker",T,v,qe)}).catch(qe=>{t("subscribe %s failed: %o",v,qe),Ve(qe,"worker")}).finally(()=>{ue.delete(v),ee&&M()})}},Q=function(){g.worker+=1;for(let[y]of jd){let v=ke.get(y);v&&(v().catch(()=>{}),ke.delete(y));try{ye.unregister(y)}catch(m){t("unregister %s failed: %o",y,m)}}},w=function(y){if(!y){C();return}ze||(Le("subscribe-worker-queue",{id:Ud}).catch(v=>{t("subscribe-worker-queue failed: %o",v)}),Le("subscribe-worker-parallel-analysis",{id:Wd}).catch(v=>{t("subscribe-worker-parallel-analysis failed: %o",v)}),ze=()=>(Le("unsubscribe-worker-parallel-analysis",{id:Wd}),Le("unsubscribe-worker-queue",{id:Ud})))},C=function(){ze&&(ze().catch(()=>{}),ze=null),Ne.clear()},Z=function(y){if(!y){pe();return}P||(Le("subscribe-monitor-pipeline",{id:Bd}).catch(v=>{t("subscribe-monitor-pipeline failed: %o",v)}),P=()=>Le("unsubscribe-monitor-pipeline",{id:Bd}))},pe=function(){P&&(P().catch(()=>{}),P=null)},X=function(){$e||(Le("subscribe-ui-order",{id:zd}).catch(y=>{t("subscribe-ui-order failed: %o",y)}),$e=()=>Le("unsubscribe-ui-order",{id:zd}))},nt=function(){$e&&($e().catch(()=>{}),$e=null),Fe.clear()},ft=function(){Ee||(Le("subscribe-display-policy",{id:Hd}).catch(y=>{t("subscribe-display-policy failed: %o",y)}),Ee=()=>Le("unsubscribe-display-policy",{id:Hd}))},He=function(){Ee&&(Ee().catch(()=>{}),Ee=null),Ke.clear()},Ft=function(){At||(Le("subscribe-impl-presets",{id:Gd}).catch(y=>{t("subscribe-impl-presets failed: %o",y)}),At=()=>Le("unsubscribe-impl-presets",{id:Gd}))},jt=function(y){if(!y)return"Unknown";let v=y.split("/").filter(Boolean);return v.length>0?v[v.length-1]:"Unknown"};var u=Ve,p=Ye,f=z,h=Ce,R=$,A=M,L=ne,N=ce,V=he,K=Oe,W=j,I=Q,S=w,D=C,k=Z,B=pe,oe=X,de=nt,te=ft,re=He,Ie=Ft,rt=jt;let De=document.getElementById("header-loading"),ot=zi(De),it=yc(e),be=Fd(),Le=ot.wrapSend((y,v)=>be.send(y,v)),_e=Di(Le),ye=Ni(),Ae=ji(),Ne=Fi(),ve=wi(),Fe=qi(),Ke=yi(),xe=vi(),tt=ki();be.on("impl-presets-snapshot",y=>{let v=y;v&&typeof v.revision=="number"&&Array.isArray(v.presets)&&xe.set({revision:v.revision,presets:v.presets})}),be.on("monitor-pipeline-snapshot",y=>{let v=y;if(!(!v||!Array.isArray(v.workspaces)))try{ve.set(v.workspaces,v.workspaces_state)}catch{}}),be.on("ui-order-snapshot",y=>{let v=y;if(v&&typeof v.revision=="number")try{Fe.set({revision:v.revision,order:v.order&&typeof v.order=="object"?v.order:{}})}catch{}}),be.on("display-policy-snapshot",y=>{let v=y;if(v&&v.policy&&typeof v.policy=="object")try{Ke.set(v.policy)}catch{}}),be.on("session-log-snapshot",y=>{let v=y;if(v&&typeof v.id=="string")try{tt.set(v.id,Array.isArray(v.lines)?v.lines:[],typeof v.last_event_at=="number"?v.last_event_at:null)}catch{}}),be.on("session-log-append",y=>{let v=y;if(v&&typeof v.id=="string")try{tt.append(v.id,v.event)}catch{}}),be.on("snapshot",y=>{let v=y,m=v&&typeof v.id=="string"?v.id:"",O=m?ye.getStore(m):null;if(O&&v&&v.type==="snapshot")try{O.applyPush(v)}catch{}}),be.on("upsert",y=>{let v=y,m=v&&typeof v.id=="string"?v.id:"",O=m?ye.getStore(m):null;if(O&&v&&v.type==="upsert")try{O.applyPush(v)}catch{}}),be.on("delete",y=>{let v=y,m=v&&typeof v.id=="string"?v.id:"",O=m?ye.getStore(m):null;if(O&&v&&v.type==="delete")try{O.applyPush(v)}catch{}});let H=null,F=null,se=null,Te=null,je=()=>{},We=new Promise(y=>{je=()=>y(void 0)}),Se=!1,lt=!1;async function J(y){let v=Ye(y);if(v===F||v===se)return;se=v;let m=`detail:${y}`,O={type:"issue-detail",params:{id:y}};try{ye.register(m,O)}catch(T){t("register detail store failed: %o",T)}try{let T=await _e.subscribeList(m,O);if(et.getState().selected_id!==y||Ye(y)!==v){await T().catch(()=>{});return}H&&await H().catch(()=>{}),H=T,F=v}catch(T){t("detail subscribe failed: %o",T),Ve(T,"issue details")}finally{se===v&&(se=null)}}let Be=new Map,ue=new Set,g={board:0,worker:0},x=!1,G=Pt;try{let y=window.localStorage.getItem(Vd);Ut(y)&&(G=y)}catch{}let Y=Pt;try{let y=window.localStorage.getItem(ug);Ut(y)&&(Y=y)}catch{}async function we(y){if(!Ut(y)||y===G)return;G=y;try{window.localStorage.setItem(Vd,y)}catch{}let v=Be.get(Ir);if(!v)return;Be.delete(Ir),await v().catch(()=>{});let m=ne();try{ye.register(Ir,m)}catch(O){t("register %s store failed: %o",Ir,O)}try{let O=await _e.subscribeList(Ir,m);Be.set(Ir,O)}catch(O){t("re-subscribe %s failed: %o",Ir,O),Ve(O,"board")}}async function Pe(y){if(!Ut(y)||y===Y)return;Y=y;let v=ke.get(Rr);if(!v)return;ke.delete(Rr),await v().catch(()=>{});let m=ce();try{ye.register(Rr,m)}catch(O){t("register %s store failed: %o",Rr,O)}try{let O=await _e.subscribeList(Rr,m);ke.set(Rr,O)}catch(O){t("re-subscribe %s failed: %o",Rr,O),Ve(O,"worker")}}let ke=new Map,ze=null,P=null,$e=null,Ee=null,At=null;async function dr(){Ee=null,Ke.clear(),At=null,xe.clear(),ze=null,P=null,Be.clear(),ke.clear(),g.board+=1,g.worker+=1,Ft();let y=et.getState().workspace.current?.path;if(y)try{await be.send("set-workspace",{path:y})}catch(m){t("workspace restore after reconnect failed: %o",m);return}ft();let v=et.getState();he(v.view==="board"),j(v.view==="worker"),Z(v.view==="monitor"),w(v.view==="board"||v.view==="worker"||!!v.selected_id)}async function yt(){t("clearing all subscriptions for workspace switch"),Oe(),Q(),C(),Ae.clear(),nt(),X(),He(),ft(),z();let y=et.getState();if(y.selected_id)try{ye.unregister(`detail:${y.selected_id}`)}catch{}let v=et.getState();he(v.view==="board"),j(v.view==="worker"),Z(v.view==="monitor"),w(v.view==="board"||v.view==="worker"||!!v.selected_id),v.selected_id&&Ce(v.selected_id)}async function Et(y){t("requesting workspace switch to %s",y),lt=!0;try{let v=await be.send("set-workspace",{path:y});t("workspace switch result: %o",v),v&&v.workspace&&(et.setState({workspace:{current:{path:v.workspace.root_dir,database:v.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",y),v.changed&&(await yt(),ie("Switched to "+jt(y),"success",2e3)))}catch(v){throw t("workspace switch failed: %o",v),ie("Failed to switch workspace","error",3e3),v}finally{lt=!1}}async function ur(y){t("requesting workspace git pull for %s",y);try{let v=await be.send("git-pull-workspace",{});t("workspace git pull result: %o",v);let m=v?.status;if(m==="up_to_date"){ie("Already up to date","success",2e3);return}if(m==="stash_pop_conflict"){ie("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}ie("Git pulled "+jt(y),"success",2e3)}catch(v){t("workspace git pull failed: %o",v);let m=v?.code,O=v?.message;if(m==="rebase_conflict"){ie("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(m==="rebase_conflict_abort_failed"){ie("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(m==="busy"){ie("Git pull skipped: another operation is running","warning",3e3);return}let T=O?`: ${O}`:"";throw ie(`Git pull failed${T}`,"error",3e3),v}}async function wr(y,v){t("setting workspace visibility %s \u2192 %s",y,String(v));try{await be.send("set-workspace-visibility",{path:y,visible:v}),await Ht()}catch(m){t("workspace visibility update failed: %o",m),ie("Failed to update project visibility","error",3e3)}}async function Ht(){try{let y=await be.send("list-workspaces",{});if(t("workspaces loaded: %o",y),y&&Array.isArray(y.workspaces)){let v=y.workspaces.map(ee=>({path:ee.path,database:ee.database,pid:ee.pid,version:ee.version})),m=y.current?{path:y.current.root_dir,database:y.current.db_path}:null,O=Array.isArray(y.hidden)?y.hidden.filter(ee=>typeof ee=="string"):[];et.setState({workspace:{current:m,available:v,hidden:O}});let T=window.localStorage.getItem("beads-ui.workspace");T&&(!v.some(qe=>qe.path===T)||O.includes(T)?window.localStorage.removeItem("beads-ui.workspace"):m&&T!==m.path&&(t("restoring saved workspace preference: %s",T),await Et(T)))}}catch(y){t("failed to load workspaces: %o",y)}}be.on("workspace-changed",y=>{t("workspace-changed event: %o",y),y&&y.root_dir&&(et.setState({workspace:{current:{path:y.root_dir,database:y.db_path}}}),Ht(),yt())});let vt=!1;if(typeof be.onConnection=="function"){let y=v=>{t("ws state %s",v),v==="reconnecting"||v==="closed"?(vt=!0,ie("Connection lost. Reconnecting\u2026","error",4e3)):v==="open"&&vt&&(vt=!1,ie("Reconnected","success",2200),dg(et,(m,O)=>{t(`${m}: %o`,O)}),dr())};be.onConnection(y)}let nr="board";try{let y=window.localStorage.getItem("beads-ui.view");(y==="board"||y==="worker"||y==="monitor")&&(nr=y)}catch(y){t("view parse error: %o",y)}let et=Wi({config:cg(),view:nr});be.on("worker-queue-snapshot",y=>{let v=y;if(!v||!v.queue)return;let m=et.getState().workspace.current?.path;if(typeof m=="string"&&m.length>0&&v.root_dir!==m){t("dropping worker-queue snapshot for %s",String(v.root_dir));return}try{Ae.set(v.queue)}catch{}}),be.on("worker-parallel-analysis-snapshot",y=>{let v=y;if(!v)return;let m=et.getState().workspace.current?.path;if(!(typeof m=="string"&&m.length>0&&typeof v.root_dir=="string"&&v.root_dir!==m))try{Ne.set({settings:v.settings,job:v.job??null,runs:Array.isArray(v.runs)?v.runs:[],last_good:v.last_good??null})}catch{}});let Ot=Bi(et);Ot.start();let kr=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults"]),Gt=async(y,v)=>{try{return await Le(y,v)}catch(m){if(kr.has(y))throw m;return[]}};n&&nd(n,et,Ot);let me=document.getElementById("workspace-picker");me&&Dd(me,et,Et,ur,wr);let l=id(e,(y,v)=>Le(y,v));try{let y=document.getElementById("new-issue-btn");y&&y.addEventListener("click",()=>l.open())}catch{}let _=ud(e,{policyStore:Ke,queueStore:Ae,implPresetStore:xe,transport:(y,v)=>Le(y,v),onOpenChange:y=>{x=y,M()},labelOptions:()=>{let y=new Set;for(let[v]of Pa)for(let m of ye.snapshotFor(v)||[]){let O=m.labels;if(Array.isArray(O))for(let T of O)typeof T=="string"&&T.length>0&&y.add(T)}return Array.from(y).sort()}});try{let y=document.getElementById("display-settings-btn");y&&(y.setAttribute("aria-label","\uC124\uC815"),y.setAttribute("title","\uC124\uC815"),y.addEventListener("click",()=>_.open()))}catch{}let E=el(o,{gotoIssue:y=>Ot.gotoIssue(y),issueStores:ye,transport:Gt,workerQueueStore:Ae,uiOrderStore:Fe,displayPolicyStore:Ke,closedRange:G,onClosedRangeChange:y=>{we(y)},onNewIssue:()=>l.open()}),U=La(a,{transport:Gt,issueStores:ye,queueStore:Ae,analysisStore:Ne,sessionLogStore:tt,uiOrderStore:Fe,gotoIssue:y=>et.setState({selected_id:y}),getWorkspacePath:()=>et.getState().workspace.current?.path,doneRange:Y,onDoneRangeChange:y=>{Pe(y)}}),ae=rd(i,{transport:Gt,pipelineStore:ve,execPresetStore:xe,gotoIssue:y=>Ot.gotoIssue(y),getWorkspacePath:()=>et.getState().workspace.current?.path,switchWorkspace:y=>Et(y)}),ge=hc(c,{issueStores:ye,transport:Gt,queueStore:Ae,execPresetStore:xe,sessionLogStore:tt,getWorkspacePath:()=>et.getState().workspace.current?.path,onNavigate:y=>{et.getState().view==="worker"?et.setState({selected_id:y}):Ot.gotoIssue(y)},onClose:()=>{let y=et.getState();et.setState({selected_id:null});try{Ot.gotoView(y.view==="worker"||y.view==="monitor"?y.view:"board")}catch{}},onOpenExecPresets:()=>{_.open("execution")}}),fe=et.getState().selected_id;fe&&(c.hidden=!1,ge.load(fe),Ce(fe)),et.subscribe(y=>{let v=y.selected_id;v?(c.hidden=!1,ge.load(v),lt||Ce(v)):(ge.clear(),c.hidden=!0,z())});let Ze=y=>{o.hidden=y.view!=="board",a.hidden=y.view!=="worker",i.hidden=y.view!=="monitor",he(y.view==="board"),j(y.view==="worker"),Z(y.view==="monitor"),w(y.view==="board"||y.view==="worker"||x||!!y.selected_id),!y.selected_id&&y.view==="board"&&E.load(),y.view==="worker"&&U.load(),y.view==="monitor"?ae.load():ae.pause(),window.localStorage.setItem("beads-ui.view",y.view)};et.subscribe(Ze),Ze(et.getState()),X(),ft(),Ft(),Ht().finally(()=>{Se=!0,je()}),window.addEventListener("keydown",y=>{let v=y.ctrlKey||y.metaKey,m=String(y.key||"").toLowerCase(),O=y.target,T=O&&O.tagName?String(O.tagName).toLowerCase():"",ee=T==="input"||T==="textarea"||T==="select"||O&&typeof O.isContentEditable=="boolean"&&O.isContentEditable;v&&m==="n"&&(ee||(y.preventDefault(),l.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let r=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let t=document.getElementById("app");t&&pg(t)});export{pg as bootstrap,cg as readBootstrapConfig,dg as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
