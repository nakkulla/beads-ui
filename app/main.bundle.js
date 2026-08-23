var $d=Object.create;var bo=Object.defineProperty;var xd=Object.getOwnPropertyDescriptor;var Ad=Object.getOwnPropertyNames;var Sd=Object.getPrototypeOf,Ed=Object.prototype.hasOwnProperty;var Td=(e,t,r)=>t in e?bo(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var ho=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Cd=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Ad(t))!Ed.call(e,s)&&s!==r&&bo(e,s,{get:()=>t[s],enumerable:!(n=xd(t,s))||n.enumerable});return e};var Rd=(e,t,r)=>(r=e!=null?$d(Sd(e)):{},Cd(t||!e||!e.__esModule?bo(r,"default",{value:e,enumerable:!0}):r,e));var ct=(e,t,r)=>Td(e,typeof t!="symbol"?t+"":t,r);var Si=ho((zg,Ai)=>{var Qr=1e3,Jr=Qr*60,en=Jr*60,qr=en*24,Od=qr*7,Md=qr*365.25;Ai.exports=function(e,t){t=t||{};var r=typeof e;if(r==="string"&&e.length>0)return Pd(e);if(r==="number"&&isFinite(e))return t.long?Nd(e):Dd(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function Pd(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*Md;case"weeks":case"week":case"w":return r*Od;case"days":case"day":case"d":return r*qr;case"hours":case"hour":case"hrs":case"hr":case"h":return r*en;case"minutes":case"minute":case"mins":case"min":case"m":return r*Jr;case"seconds":case"second":case"secs":case"sec":case"s":return r*Qr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function Dd(e){var t=Math.abs(e);return t>=qr?Math.round(e/qr)+"d":t>=en?Math.round(e/en)+"h":t>=Jr?Math.round(e/Jr)+"m":t>=Qr?Math.round(e/Qr)+"s":e+"ms"}function Nd(e){var t=Math.abs(e);return t>=qr?ds(e,t,qr,"day"):t>=en?ds(e,t,en,"hour"):t>=Jr?ds(e,t,Jr,"minute"):t>=Qr?ds(e,t,Qr,"second"):e+" ms"}function ds(e,t,r,n){var s=t>=r*1.5;return Math.round(e/r)+" "+n+(s?"s":"")}});var Ti=ho((Hg,Ei)=>{function qd(e){r.debug=r,r.default=r,r.coerce=u,r.disable=a,r.enable=s,r.enabled=c,r.humanize=Si(),r.destroy=d,Object.keys(e).forEach(p=>{r[p]=e[p]}),r.names=[],r.skips=[],r.formatters={};function t(p){let f=0;for(let h=0;h<p.length;h++)f=(f<<5)-f+p.charCodeAt(h),f|=0;return r.colors[Math.abs(f)%r.colors.length]}r.selectColor=t;function r(p){let f,h=null,A,S;function O(...U){if(!O.enabled)return;let ee=O,Q=Number(new Date),P=Q-(f||Q);ee.diff=P,ee.prev=f,ee.curr=Q,f=Q,U[0]=r.coerce(U[0]),typeof U[0]!="string"&&U.unshift("%O");let D=0;U[0]=U[0].replace(/%([a-zA-Z%])/g,(B,m)=>{if(B==="%%")return"%";D++;let R=r.formatters[m];if(typeof R=="function"){let H=U[D];B=R.call(ee,H),U.splice(D,1),D--}return B}),r.formatArgs.call(ee,U),(ee.log||r.log).apply(ee,U)}return O.namespace=p,O.useColors=r.useColors(),O.color=r.selectColor(p),O.extend=n,O.destroy=r.destroy,Object.defineProperty(O,"enabled",{enumerable:!0,configurable:!1,get:()=>h!==null?h:(A!==r.namespaces&&(A=r.namespaces,S=r.enabled(p)),S),set:U=>{h=U}}),typeof r.init=="function"&&r.init(O),O}function n(p,f){let h=r(this.namespace+(typeof f>"u"?":":f)+p);return h.log=this.log,h}function s(p){r.save(p),r.namespaces=p,r.names=[],r.skips=[];let f=(typeof p=="string"?p:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let h of f)h[0]==="-"?r.skips.push(h.slice(1)):r.names.push(h)}function o(p,f){let h=0,A=0,S=-1,O=0;for(;h<p.length;)if(A<f.length&&(f[A]===p[h]||f[A]==="*"))f[A]==="*"?(S=A,O=h,A++):(h++,A++);else if(S!==-1)A=S+1,O++,h=O;else return!1;for(;A<f.length&&f[A]==="*";)A++;return A===f.length}function a(){let p=[...r.names,...r.skips.map(f=>"-"+f)].join(",");return r.enable(""),p}function c(p){for(let f of r.skips)if(o(p,f))return!1;for(let f of r.names)if(o(p,f))return!0;return!1}function u(p){return p instanceof Error?p.stack||p.message:p}function d(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}Ei.exports=qd});var Ci=ho((Pt,ps)=>{Pt.formatArgs=jd;Pt.save=Bd;Pt.load=Ud;Pt.useColors=Fd;Pt.storage=Wd();Pt.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();Pt.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Fd(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function jd(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+ps.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let r=0,n=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),e.splice(n,0,t)}Pt.log=console.debug||console.log||(()=>{});function Bd(e){try{e?Pt.storage.setItem("debug",e):Pt.storage.removeItem("debug")}catch{}}function Ud(){let e;try{e=Pt.storage.getItem("debug")||Pt.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function Wd(){try{return localStorage}catch{}}ps.exports=Ti()(Pt);var{formatters:zd}=ps.exports;zd.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var hn=globalThis,os=hn.trustedTypes,ui=os?os.createPolicy("lit-html",{createHTML:e=>e}):void 0,vo="$lit$",pr=`lit$${Math.random().toFixed(9).slice(2)}$`,wo="?"+pr,Id=`<${wo}>`,Mr=document,yn=()=>Mr.createComment(""),vn=e=>e===null||typeof e!="object"&&typeof e!="function",ko=Array.isArray,gi=e=>ko(e)||typeof e?.[Symbol.iterator]=="function",yo=`[ 	
\f\r]`,bn=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,di=/-->/g,pi=/>/g,Lr=RegExp(`>|${yo}(?:([^\\s"'>=/]+)(${yo}*=${yo}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),fi=/'/g,_i=/"/g,bi=/^(?:script|style|textarea|title)$/i,$o=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),i=$o(1),$r=$o(2),Ng=$o(3),Ut=Symbol.for("lit-noChange"),ht=Symbol.for("lit-nothing"),mi=new WeakMap,Or=Mr.createTreeWalker(Mr,129);function hi(e,t){if(!ko(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return ui!==void 0?ui.createHTML(t):t}var yi=(e,t)=>{let r=e.length-1,n=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=bn;for(let c=0;c<r;c++){let u=e[c],d,p,f=-1,h=0;for(;h<u.length&&(a.lastIndex=h,p=a.exec(u),p!==null);)h=a.lastIndex,a===bn?p[1]==="!--"?a=di:p[1]!==void 0?a=pi:p[2]!==void 0?(bi.test(p[2])&&(s=RegExp("</"+p[2],"g")),a=Lr):p[3]!==void 0&&(a=Lr):a===Lr?p[0]===">"?(a=s??bn,f=-1):p[1]===void 0?f=-2:(f=a.lastIndex-p[2].length,d=p[1],a=p[3]===void 0?Lr:p[3]==='"'?_i:fi):a===_i||a===fi?a=Lr:a===di||a===pi?a=bn:(a=Lr,s=void 0);let A=a===Lr&&e[c+1].startsWith("/>")?" ":"";o+=a===bn?u+Id:f>=0?(n.push(d),u.slice(0,f)+vo+u.slice(f)+pr+A):u+pr+(f===-2?c:A)}return[hi(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},wn=class e{constructor({strings:t,_$litType$:r},n){let s;this.parts=[];let o=0,a=0,c=t.length-1,u=this.parts,[d,p]=yi(t,r);if(this.el=e.createElement(d,n),Or.currentNode=this.el.content,r===2||r===3){let f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}for(;(s=Or.nextNode())!==null&&u.length<c;){if(s.nodeType===1){if(s.hasAttributes())for(let f of s.getAttributeNames())if(f.endsWith(vo)){let h=p[a++],A=s.getAttribute(f).split(pr),S=/([.?@])?(.*)/.exec(h);u.push({type:1,index:o,name:S[2],strings:A,ctor:S[1]==="."?is:S[1]==="?"?ls:S[1]==="@"?cs:Dr}),s.removeAttribute(f)}else f.startsWith(pr)&&(u.push({type:6,index:o}),s.removeAttribute(f));if(bi.test(s.tagName)){let f=s.textContent.split(pr),h=f.length-1;if(h>0){s.textContent=os?os.emptyScript:"";for(let A=0;A<h;A++)s.append(f[A],yn()),Or.nextNode(),u.push({type:2,index:++o});s.append(f[h],yn())}}}else if(s.nodeType===8)if(s.data===wo)u.push({type:2,index:o});else{let f=-1;for(;(f=s.data.indexOf(pr,f+1))!==-1;)u.push({type:7,index:o}),f+=pr.length-1}o++}}static createElement(t,r){let n=Mr.createElement("template");return n.innerHTML=t,n}};function Pr(e,t,r=e,n){if(t===Ut)return t;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=vn(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(t=Pr(e,s._$AS(e,t.values),s,n)),t}var as=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:n}=this._$AD,s=(t?.creationScope??Mr).importNode(r,!0);Or.currentNode=s;let o=Or.nextNode(),a=0,c=0,u=n[0];for(;u!==void 0;){if(a===u.index){let d;u.type===2?d=new Xr(o,o.nextSibling,this,t):u.type===1?d=new u.ctor(o,u.name,u.strings,this,t):u.type===6&&(d=new us(o,this,t)),this._$AV.push(d),u=n[++c]}a!==u?.index&&(o=Or.nextNode(),a++)}return Or.currentNode=Mr,s}p(t){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}},Xr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,n,s){this.type=2,this._$AH=ht,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=Pr(this,t,r),vn(t)?t===ht||t==null||t===""?(this._$AH!==ht&&this._$AR(),this._$AH=ht):t!==this._$AH&&t!==Ut&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):gi(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==ht&&vn(this._$AH)?this._$AA.nextSibling.data=t:this.T(Mr.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=wn.createElement(hi(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new as(s,this),a=o.u(this.options);o.p(r),this.T(a),this._$AH=o}}_$AC(t){let r=mi.get(t.strings);return r===void 0&&mi.set(t.strings,r=new wn(t)),r}k(t){ko(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of t)s===r.length?r.push(n=new e(this.O(yn()),this.O(yn()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Dr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,n,s,o){this.type=1,this._$AH=ht,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=ht}_$AI(t,r=this,n,s){let o=this.strings,a=!1;if(o===void 0)t=Pr(this,t,r,0),a=!vn(t)||t!==this._$AH&&t!==Ut,a&&(this._$AH=t);else{let c=t,u,d;for(t=o[0],u=0;u<o.length-1;u++)d=Pr(this,c[n+u],r,u),d===Ut&&(d=this._$AH[u]),a||(a=!vn(d)||d!==this._$AH[u]),d===ht?t=ht:t!==ht&&(t+=(d??"")+o[u+1]),this._$AH[u]=d}a&&!s&&this.j(t)}j(t){t===ht?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},is=class extends Dr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===ht?void 0:t}},ls=class extends Dr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==ht)}},cs=class extends Dr{constructor(t,r,n,s,o){super(t,r,n,s,o),this.type=5}_$AI(t,r=this){if((t=Pr(this,t,r,0)??ht)===Ut)return;let n=this._$AH,s=t===ht&&n!==ht||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==ht&&(n===ht||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},us=class{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){Pr(this,t)}},vi={M:vo,P:pr,A:wo,C:1,L:yi,R:as,D:gi,V:Pr,I:Xr,H:Dr,N:ls,U:cs,B:is,F:us},Ld=hn.litHtmlPolyfillSupport;Ld?.(wn,Xr),(hn.litHtmlVersions??(hn.litHtmlVersions=[])).push("3.3.1");var Ze=(e,t,r)=>{let n=r?.renderBefore??t,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new Xr(t.insertBefore(yn(),o),o,void 0,r??{})}return s._$AI(e),s};var Nt="today",ar=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Wt(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function Nr(e,t=Date.now()){switch(e){case"today":{let r=new Date(t);return r.setHours(0,0,0,0),r.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function wi(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function ki(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function $i(){let e=null,t=[],r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],n()},clear(){e=null,t=[],n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function xi(){let e=new Map,t=new Set;function r(s){return s.startsWith("session-log:")?s:`session-log:${s}`}function n(){for(let s of Array.from(t))try{s()}catch{}}return{set(s,o,a=null){e.set(r(s),{lines:Array.isArray(o)?[...o]:[],last_event_at:typeof a=="number"?a:null}),n()},append(s,o){let a=r(s),c=e.get(a)||{lines:[],last_event_at:null};c.lines=[...c.lines,o],c.last_event_at=Date.now(),e.set(a,c),n()},get(s){return e.get(r(s))||null},clear(s){typeof s=="string"?e.delete(r(s)):e.clear(),n()},subscribe(s){return t.add(s),()=>t.delete(s)}}}var Ri=Rd(Ci(),1);function gt(e){return(0,Ri.default)(`beads-ui:${e}`)}function Zt(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Fr(e,t){let r=Zt(e.created_at),n=Zt(t.created_at);if(r!==n)return r<n?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,c=t.id;return a<c?-1:a>c?1:0}function Oi(e,t){let r=Zt(e.created_at),n=Zt(t.created_at);if(r!==n)return r<n?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,c=t.id;return a<c?-1:a>c?1:0}function Mi(e,t){let r=Zt(e.updated_at),n=Zt(t.updated_at);if(r!==n)return r<n?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function Pi(e,t){let r=e.priority??2,n=t.priority??2;if(r!==n)return r-n;let s=Zt(e.created_at),o=Zt(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,c=t.id;return a<c?-1:a>c?1:0}function Di(e,t){let r=e.closed_at??0,n=t.closed_at??0;if(r!==n)return r<n?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var Hd=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Ii(e){let t=e&&e.metadata,r=t?t.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Li(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let r=Hd.exec(t);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Ni(e,t){let r=Ii(e),n=Ii(t);if(r!==n)return r<n?-1:1;let s=Li(e),o=Li(t);if(s!==o)return s<o?-1:1;let a=Zt(e&&e.created_at),c=Zt(t&&t.created_at);if(a!==c)return a<c?-1:1;let u=e&&e.id,d=t&&t.id;return u===d?0:String(u)<String(d)?-1:1}var xo=2**20;function tn(e,t){let r=e&&e.id;return t&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(t,r)&&typeof t[r]=="number"&&Number.isFinite(t[r])?t[r]:-Zt(e&&e.created_at)}function fs(e){return(t,r)=>{let n=tn(t,e),s=tn(r,e);if(n!==s)return n<s?-1:1;let o=t?.id,a=r?.id;return o<a?-1:o>a?1:0}}function Ao(e,t,r){let n=Array.isArray(e)?e:[],s=n.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?n[o-1]:null,c=o+1<s?n[o+1]:null;if(!a&&!c)return{rank:0};if(!a)return{rank:tn(c,r)-xo};if(!c)return{rank:tn(a,r)+xo};let u=tn(a,r),d=tn(c,r),p=(u+d)/2;return u<p&&p<d?{rank:p}:{renormalize:n.map((f,h)=>({bead_id:f.id,rank:h*xo}))}}function So(e,t={}){let r=gt(`issue-store:${e}`),n=new Map,s=[],o=0,a=new Set,c=!1,u=t.sort||Fr;function d(){for(let h of Array.from(a))try{h()}catch{}}function p(){s=Array.from(n.values()).sort(u)}function f(h){if(c||!h||h.id!==e)return;let A=Number(h.revision)||0;if(r("apply %s rev=%d",h.type,A),!(A<=o&&h.type!=="snapshot")){if(h.type==="snapshot"){if(A<=o)return;n.clear();let S=Array.isArray(h.issues)?h.issues:[];for(let O of S)O&&typeof O.id=="string"&&O.id.length>0&&n.set(O.id,O);p(),o=A,d();return}if(h.type==="upsert"){let S=h.issue;if(S&&typeof S.id=="string"&&S.id.length>0){let O=n.get(S.id);if(!O)n.set(S.id,S);else{let U=Number.isFinite(O.updated_at)?O.updated_at:0,ee=Number.isFinite(S.updated_at)?S.updated_at:0;if(U<=ee){for(let Q of Object.keys(O))Q in S||delete O[Q];for(let[Q,P]of Object.entries(S))O[Q]=P}}p()}o=A,d()}else if(h.type==="delete"){let S=String(h.issue_id||"");S&&(n.delete(S),p()),o=A,d()}}}return{id:e,subscribe(h){return a.add(h),()=>{a.delete(h)}},applyPush:f,snapshot(){return s},size(){return n.size},getById(h){return n.get(h)},dispose(){c=!0,n.clear(),s=[],a.clear(),o=0}}}function _s(e){let t=String(e.type||"").trim(),r={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];r[o]=String(a)}}let n=new URLSearchParams(r).toString();return n.length>0?`${t}?${n}`:t}function qi(e){let t=gt("subs"),r=new Map,n=new Map;function s(c,u){t("applyDelta %s +%d ~%d -%d",c,(u.added||[]).length,(u.updated||[]).length,(u.removed||[]).length);let d=n.get(c);if(!d||d.size===0)return;let p=Array.isArray(u.added)?u.added:[],f=Array.isArray(u.updated)?u.updated:[],h=Array.isArray(u.removed)?u.removed:[];for(let A of Array.from(d)){let S=r.get(A);if(!S)continue;let O=S.itemsById;for(let U of p)typeof U=="string"&&U.length>0&&O.set(U,!0);for(let U of f)typeof U=="string"&&U.length>0&&O.set(U,!0);for(let U of h)typeof U=="string"&&U.length>0&&O.delete(U)}}async function o(c,u){let d=_s(u);if(t("subscribe %s key=%s",c,d),!r.has(c))r.set(c,{key:d,itemsById:new Map});else{let f=r.get(c);if(f&&f.key!==d){let h=n.get(f.key);h&&(h.delete(c),h.size===0&&n.delete(f.key)),r.set(c,{key:d,itemsById:new Map})}}n.has(d)||n.set(d,new Set);let p=n.get(d);p&&p.add(c);try{await e("subscribe-list",{id:c,type:u.type,params:u.params})}catch(f){let h=r.get(c)||null;if(h){let A=n.get(h.key);A&&(A.delete(c),A.size===0&&n.delete(h.key))}throw r.delete(c),f}return async()=>{t("unsubscribe %s key=%s",c,d);try{await e("unsubscribe-list",{id:c})}catch{}let f=r.get(c)||null;if(f){let h=n.get(f.key);h&&(h.delete(c),h.size===0&&n.delete(f.key))}r.delete(c)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:_s,selectors:{getIds(c){let u=r.get(c);return u?Array.from(u.itemsById.keys()):[]},has(c,u){let d=r.get(c);return d?d.itemsById.has(u):!1},count(c){let u=r.get(c);return u?u.itemsById.size:0},getItemsById(c){let u=r.get(c),d={};if(!u)return d;for(let p of u.itemsById.keys())d[p]=!0;return d}}}}function Fi(){let e=gt("issue-stores"),t=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let u of Array.from(n))try{u()}catch{}}function a(u,d,p){let f=d?_s(d):"",h=r.get(u)||"",A=t.has(u);if(e("register %s key=%s (prev=%s)",u,f,h),A&&h&&f&&h!==f){let S=t.get(u);if(S)try{S.dispose()}catch{}let O=s.get(u);if(O){try{O()}catch{}s.delete(u)}let U=So(u,p);t.set(u,U);let ee=U.subscribe(()=>o());s.set(u,ee)}else if(!A){let S=So(u,p);t.set(u,S);let O=S.subscribe(()=>o());s.set(u,O)}return r.set(u,f),()=>c(u)}function c(u){e("unregister %s",u),r.delete(u);let d=t.get(u);d&&(d.dispose(),t.delete(u));let p=s.get(u);if(p){try{p()}catch{}s.delete(u)}}return{register:a,unregister:c,getStore(u){return t.get(u)||null},snapshotFor(u){let d=t.get(u);return d?d.snapshot().slice():[]},subscribe(u){return n.add(u),()=>n.delete(u)}}}function ji(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Bi(){let e=null,t=!1,r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},set(s){e=s,n()},isPending(){return t},setPending(s){let o=s===!0;o!==t&&(t=o,n())},clear(){e=null,t=!1,n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function Ui(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Eo(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function Gd(e){let t=String(e||""),r=t.startsWith("#")?t.slice(1):t,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let c=new URLSearchParams(s).get("issue");if(c)return decodeURIComponent(c)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function Vd(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function Wi(e){let t=gt("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):Gd(n),a=Vd(n);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let u=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==u&&(window.location.hash=u)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=Eo(o,n);t("goto issue %s (view=%s)",n,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?Eo(n,o):`#/${n}`;t("goto view %s (id=%s)",n,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var Kd=Object.freeze({workspace_config:{default_workspace:null}});function zi(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:Kd.workspace_config.default_workspace}}}function Hi(e={}){let t=gt("state"),r={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:zi(e.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let a={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?zi(o.config):r.config},c=a.workspace.current?.path!==r.workspace.current?.path||a.workspace.available.length!==r.workspace.available.length||a.workspace.hidden.length!==r.workspace.hidden.length||a.workspace.hidden.some((d,p)=>d!==r.workspace.hidden[p]),u=a.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;a.selected_id===r.selected_id&&a.view===r.view&&a.filters.status===r.filters.status&&a.filters.search===r.filters.search&&a.filters.type===r.filters.type&&a.board.closed_filter===r.board.closed_filter&&a.worker.selected_parent_id===r.worker.selected_parent_id&&a.worker.show_closed_children.length===r.worker.show_closed_children.length&&a.worker.show_closed_children.every((d,p)=>d===r.worker.show_closed_children[p])&&!c&&!u||(r=a,t("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function Gi(e){let t=gt("activity"),r=0,n=new Map,s=1;function o(){if(!e)return;let d=r>0;e.toggleAttribute("hidden",!d),e.setAttribute("aria-busy",d?"true":"false")}function a(){r+=1,t("start count=%d",r),o()}function c(){let d=r;r=Math.max(0,r-1),d<=0?t("done called but count was already %d",d):t("done count=%d\u2192%d",d,r),o()}function u(d){return async(f,h)=>{let A=s++,S=Date.now();n.set(A,{type:f,start_ts:S}),t("request start id=%d type=%s count=%d",A,f,r+1),a();let O=!1,U=()=>{O||(O=!0,n.delete(A),c())},ee=setTimeout(()=>{O||(t("request TIMEOUT id=%d type=%s elapsed=%dms",A,f,Date.now()-S),U())},3e4);try{let Q=await d(f,h),P=Date.now()-S;return t("request done id=%d type=%s elapsed=%dms",A,f,P),Q}catch(Q){let P=Date.now()-S;throw t("request error id=%d type=%s elapsed=%dms err=%o",A,f,P,Q),Q}finally{clearTimeout(ee),U()}}}return o(),{wrapSend:u,start:a,done:c,getCount:()=>r,getActiveRequests:()=>{let d=Date.now();return Array.from(n.entries()).map(([p,f])=>({id:p,type:f.type,elapsed_ms:d-f.start_ts}))}}}function ie(e,t="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=e,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",t==="success"?n.style.background="#156d36":t==="warning"?n.style.background="#a36a00":t==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function ms(e=void 0,t=void 0){function r(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function n(o,a,c){let u=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return u.sort(Di),u;switch(c){case"created_desc":return u.sort(Fr),u;case"created_asc":return u.sort(Oi),u;case"updated_desc":return u.sort(Mi),u;case"priority":return u.sort(Pi),u;case"manual":default:{let d=r();return d?u.sort(fs(d)):u.sort(Fr),u}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let c of a)try{c()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function jr(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function $t(e){let t=jr(e);if(t===null)return"";let r=new Date(t),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function qt(e,t){let r=jr(e);if(r===null)return"";let s=(typeof t=="number"?t:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let c=Math.floor(s/864e5);if(c<7)return`${c}\uC77C \uC804`;let u=Math.floor(c/7);if(c<30)return`${u}\uC8FC \uC804`;let d=Math.floor(c/30);return d<12?`${d}\uAC1C\uC6D4 \uC804`:`${Math.floor(c/365)}\uB144 \uC804`}function gs(e){if(!Array.isArray(e))return null;let t=null,r=-1;for(let n of e){if(!n||n.status!=="in_progress")continue;let s=jr(n.updated_at)??0;if(t===null||s>r){t=n,r=s;continue}s===r&&String(n.id)<String(t.id)&&(t=n)}return t}function bs(e){let t=e.transport,r=e.uiOrderStore;function n(a,c){return"renormalize"in a?a.renormalize:[{bead_id:c,rank:a.rank}]}function s(a,c){let u={...a.order};for(let d of c)u[d.bead_id]=d.rank;r&&r.set({revision:a.revision,order:u})}async function o(a,c,u){if(!t||!r)return;let d=r.get()||{revision:0,order:{}},p=n(Ao(c,u,d.order),a);s(d,p);let f=await t("ui-order-set",{expected_revision:d.revision,entries:p});if(f&&f.conflict){let h={revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}};r.set(h);let A=n(Ao(c,u,h.order),a);s(h,A);let S=await t("ui-order-set",{expected_revision:h.revision,entries:A});S&&S.applied&&r.set({revision:typeof S.revision=="number"?S.revision:0,order:S.order||{}})}else f&&f.applied&&r.set({revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}})}return{applyReorder:o}}function hs(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function To(e,t){return!t||typeof e!="string"||e.length===0||hs(t.visible_labels).includes(e)?!0:hs(t.hidden_labels).includes(e)?!1:!hs(t.hidden_prefixes).some(r=>r.length>0&&e.startsWith(r))}function ys(e,t){return hs(e).filter(r=>To(r,t))}function xr(e,t){let r=e&&e.chips?e.chips[t]:void 0;return typeof r=="boolean"?r:!0}var Yd={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},Ki={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},Vi={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},Zd={review:"\u2713",skip:"\u2298"},Ar={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function Xd(e,t,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function Yi(e){let t=e&&e.fill||"none";return t==="none"?Ar.none:e&&e.stale===!0?Ar.stale:t==="dim"?Ar.dim:e&&e.glyph==="review"?Ar.review:e&&e.glyph==="skip"?Ar.skip:Ar.done}function Qd(e){if(!e||e.fill==="none"||!e.approval_state)return Yi(e);let t=[];return e.glyph==="review"?t.push(Ar.review):e.glyph==="skip"&&t.push(Ar.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function Jd(e,t,r){let n=Yd[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,a=Zd[t&&t.glyph||""]||"",c="bar";s==="dim"?c+=` b-${n} dim`:s==="full"&&(c+=` b-${n} full`),o&&(c+=" stale"),r&&(c+=" cur");let u=s==="none"?"lbl":`lbl l-${n} on`,d=r?`color: var(--stage-${n}-on)`:"";return i`
    <div class="seg">
      <div class=${c} style=${d}>${a}</div>
      <div class=${u}>
        ${Ki[e]||e}
      </div>
    </div>
  `}function vs(e,t){if(!e||!e.stages)return"";let r=Vi[e.route]||Vi.spec_backed,n=e.stages,s=Xd(r,n,String(t||"open")),o=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${r.map(a=>`${Ki[a]||a} ${a==="plan"?Qd(n[a]||{}):Yi(n[a]||{})}`).join(" \xB7 ")}`;return i`
    <div class="stp" role="img" aria-label=${o}>
      ${r.map(a=>Jd(a,n[a]||{},a===s))}
    </div>
  `}function ep(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Zi=2;function tp(e){if(!e)return[];let t=[];if(e.external){let n=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(i`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(e.blockers)?e.blockers:[];if(r.length>0){let n=r.slice(0,Zi).join(", "),s=r.length-Zi,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;t.push(i`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function Co(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function Xi(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function Br(e){return`${e.kind}:${Xi(e)}@${e.sha}`}function ws(e,t){if(!e)return null;let r=Co(e.kind),n=e.reason,s=e.kind==="delegated"?n===null:typeof n=="string"&&n.trim().length>0&&!/[\r\n]/.test(n);if(!r||!s)return null;let o=Co(t?.kind),a=o!==null&&t?.kind!==e.kind,c=`\uACC4\uD68D \xB7 ${r}${a?` \u2192 ${o}`:""}`,u=`planned_execution ${e.kind}${typeof n=="string"?`:${n}`:""}`,d=t?` \xB7 exec_receipt ${Br(t)}`:"";return{kind:e.kind,label:c,title:`${u}${d}`}}function Qi(e,t){let r=ws(e,t);return r?i`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${r.kind}
        title=${r.title}
        >${r.label}</span
      >`:null}function rp(e){if(!e)return null;let t=Co(e.kind);return t?i`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${Br(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function np(e,t){let r=t.policy||null,n=e.workflow&&e.workflow.chips||{},s=[];if(n.route&&xr(r,"route")){let c=n.route_source==="derived";s.push(i`<span
        class="ctl-chip ctl-chip--route${c?" is-derived":""}"
        title=${c?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${c?"unset":n.route}</span
      >`)}if(n.fast_track&&xr(r,"fast_track")&&s.push(i`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&xr(r,"pr")){let c=n.pr.number;s.push(i`<span class="ctl-chip ctl-chip--pr"
        >${`PR${c!=null?` #${c}`:""}`}</span
      >`)}let o=Qi(n.planned_execution,n.exec_receipt);if(o&&s.push(o),n.exec_receipt){let c=n.exec_receipt;s.push(i`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Br(c)}`}
        >${`exec ${c.kind==="delegated"?Xi(c):`main:${c.actor}`} \xB7 ${c.sha.slice(0,7)}`}</span
      >`)}if(n.impl_entry){let c=n.impl_entry;s.push(i`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${c.actor}@${c.sha}`}
        >${`impl ${c.actor} \xB7 ${c.sha.slice(0,7)}`}</span
      >`)}for(let c of ys(e.labels,r))s.push(i`<span class="ctl-chip ctl-chip--label">${c}</span>`);return e.from_id&&xr(r,"from")&&s.push(i`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${c=>{c.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(c,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),xr(r,"blocked")&&s.push(...tp(e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&xr(r,"blocked")&&s.push(i`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":i`<div class="board-card__chips">${s}</div>`}function sp(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function op(e){let t=qt(e.created_at),r=qt(e.updated_at);return!t&&!r?"":i`<span class="board-card__times">
    ${t?i`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${$t(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&r?i`<span class="board-card__time-sep">·</span>`:""}
    ${r?i`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${$t(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function ap(e,t){let r=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=t.isExpanded?t.isExpanded(e.id):!0,o=n>0?r.children.slice().sort(Ni):r.children;return i`
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
        ${op(e)}
      </div>
      ${n>0&&r.current?i`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${r.current.title||r.current.id}</span
            >
          </div>`:""}
      ${s&&n>0?i`<div class="board-card__roll-list">
            ${o.map((a,c)=>i`<button
                  type="button"
                  class="board-card__roll-child"
                  @click=${u=>t.onChildClick&&t.onChildClick(u,a.id)}
                >
                  <span class=${sp(a.status)}>●</span>
                  <span class="board-card__roll-child-ord">${c+1}</span>
                  <span class="board-card__roll-child-title"
                    >${a.title||a.id}</span
                  >
                  ${ws(a.workflow?.chips?.planned_execution,a.workflow?.chips?.exec_receipt)?i`<span class="board-card__roll-child-chips">
                        ${Qi(a.workflow?.chips?.planned_execution,a.workflow?.chips?.exec_receipt)}
                        ${rp(a.workflow?.chips?.exec_receipt)}
                      </span>`:""}
                </button>`)}
          </div>`:""}
    </div>
  `}function ks(e,t){let r=ep(e.priority);return i`
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
      ${np(e,t)}
      ${e.workflow&&xr(t.policy||null,"stepper")?vs(e.workflow,e.status):""}
      ${ap(e,t)}
    </article>
  `}function rn(e,t){let r=Array.isArray(e.items)?e.items.length:0,n=e.is_closed===!0;return i`
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
              ${ar.map(o=>i`<option
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
        ${e.items.map(o=>ks(o,t))}
      </div>
    </section>
  `}function Ji(e,t,r){return i`
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
          ${e.items.length===0?i`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(n=>ks(n,t))}
        </div>
      </div>
    </dialog>
  `}var ip=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],lp=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],cp=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function up(e,t,r){let n=e.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return i`
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
  `}function el(e,t,r){return i`
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
        ${ip.map(n=>i`<option
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
        ${lp.map(n=>i`<option
              value=${n.value}
              ?selected=${e.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${up(e,t,r)}
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
        ${cp.map(n=>i`<option
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
  `}var dp=200,pp={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},fp=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),tl="beads-ui.board.sort",rl=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function _p(){try{let e=window.localStorage.getItem(tl);if(e&&rl.has(e))return e}catch{}return"created_desc"}function nl(e,t){let r=gt("views:board"),n=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,c=t.displayPolicyStore,u=t.workerQueueStore,d=t.onClosedRangeChange,p=t.onNewIssue,f=t.closedRange||Nt,h=s?ms(s,a):null,A=bs({transport:o,uiOrderStore:a}),S=[],O=[],U=[],ee=[],Q=[],P=[],D=!1,L=0,B=_p(),m=new Map,R=new Map,H=new Map,se=new Set,M={search:"",priority:"",type:"",labels:[]},q=!1,de=null;function ge(z){return String(z.status||"open")==="open"}function pe(z){let re=String(z.status||"open");return re==="open"||re==="blocked"}function Fe(z){let re=M.search.trim().toLowerCase(),be=M.priority,k=M.type,C=M.labels;return z.filter(F=>{if(re){let J=String(F.id||"").toLowerCase(),ke=String(F.title||"").toLowerCase();if(!J.includes(re)&&!ke.includes(re))return!1}if(be!==""&&String(F.priority)!==be||k!==""&&String(F.issue_type||"")!==k)return!1;if(C.length>0){let J=Array.isArray(F.labels)?F.labels:[];if(!C.some(ke=>J.includes(ke)))return!1}return!0})}function rt(){let z=new Set;for(let re of[S,O,U,ee,Q,P])for(let be of re){let k=Array.isArray(be.labels)?be.labels:[];for(let C of k)typeof C=="string"&&C.length>0&&z.add(C)}return Array.from(z).sort()}function Ue(){return M.search.trim()!==""||M.priority!==""||M.type!==""||M.labels.length>0}function _e(){try{if(h){let z=h.selectBoardColumn("tab:board:in-progress","in_progress",B),re=h.selectBoardColumn("tab:board:blocked","blocked",B).filter(pe),be=new Set(z.map(Ce=>Ce.id)),k=h.selectBoardColumn("tab:board:ready","ready",B).filter(Ce=>ge(Ce)&&!be.has(Ce.id)),C=h.selectBoardColumn("tab:board:resolved","resolved",B),F=h.selectBoardColumn("tab:board:deferred","deferred",B),J=h.selectBoardColumn("tab:board:closed","closed").slice(0,dp),ke=[...re,...k,...z,...C,...J];Le(ke);let X=new Set;for(let Ce of ke)Ce&&Ce.id&&!Ro(Ce)&&X.add(Ce.id);let Ee=!Ue();S=Ee?kn(re,X):re,O=Ee?kn(k,X):k,U=Ee?kn(z,X):z,ee=Ee?kn(C,X):C,Q=F,L=F.length,P=Ee?kn(J,X):J,m=new Map;for(let Ce of S)m.set(Ce.id,"open");for(let Ce of O)m.set(Ce.id,"open");for(let Ce of U)m.set(Ce.id,"in_progress");for(let Ce of ee)m.set(Ce.id,"resolved");for(let Ce of Q)m.set(Ce.id,"deferred");for(let Ce of P)m.set(Ce.id,"closed");R=new Map;for(let Ce of S)R.set(Ce.id,"blocked-col");for(let Ce of O)R.set(Ce.id,"ready-col");for(let Ce of U)R.set(Ce.id,"in-progress-col");for(let Ce of ee)R.set(Ce.id,"resolved-col");for(let Ce of P)R.set(Ce.id,"closed-col")}N()}catch{S=[],O=[],U=[],ee=[],Q=[],P=[],H=new Map,N()}}function Le(z){let re=new Map;for(let k of z)k&&k.id&&!re.has(k.id)&&re.set(k.id,k);let be=new Map;for(let k of re.values()){let C=Ro(k);if(!C)continue;let F=be.get(C);F||(F=[],be.set(C,F)),F.push({id:k.id,title:k.title,status:k.status,metadata:k.metadata,workflow:k.workflow,created_at:k.created_at,updated_at:k.updated_at})}H=be}function he(z){let re=H.get(z)||[],be=0;for(let C of re)(C.status==="resolved"||C.status==="closed")&&(be+=1);let k=gs(re);return{total:re.length,count:be,current:k,children:re}}function $e(z){return!se.has(z)}function Re(z,re){z.preventDefault(),z.stopPropagation(),se.has(re)?se.delete(re):se.add(re),N()}function je(z,re){z.preventDefault(),z.stopPropagation(),n(re)}function xe(z,re){z.preventDefault(),z.stopPropagation(),n(re)}function We(z,re){de||n(re)}function Xe(z,re){z.preventDefault(),z.stopPropagation(),mp(re).then(be=>{be&&ie("\uBCF5\uC0AC\uB428","success",1200)})}function Te(z,re){de=re,z.dataTransfer&&(z.dataTransfer.setData("text/plain",re),z.dataTransfer.effectAllowed="move"),z.target.classList.add("board-card--dragging")}function ot(z){z.target.classList.remove("board-card--dragging"),De(),setTimeout(()=>{de=null},0)}function Y(z){let re=String(z.target.value||"");!re||re===f||(f=re,d&&d(re),N())}function W(){return c?c.get():null}function oe(z){let re=u?u.get():null,be=re?re.cleanup_failed:null;if(!be||typeof be!="object"||Array.isArray(be))return null;let k=be[z];return!k||typeof k!="object"||Array.isArray(k)?null:k}let Oe={onCardClick:We,onCopyId:Xe,onDragStart:Te,onDragEnd:ot,onClosedRangeChange:Y,rollupFor:he,isExpanded:$e,onRollupToggle:Re,onChildClick:je,onFromChipClick:xe,cleanupFailureFor:oe,get policy(){return W()}};function ze(z,re){de||(fe(),n(re))}function Ve(z,re){z.preventDefault(),z.stopPropagation(),fe(),n(re)}let Ie={...Oe,onCardClick:ze,onChildClick:Ve,onFromChipClick:Ve,get policy(){return W()}};function lt(z){let re=z.target,be=e.querySelector(".board-filter__labels");re&&be&&be.contains(re)||te()}function Qe(z){z.key==="Escape"&&te()}function V(){q||(q=!0,document.addEventListener("mousedown",lt),document.addEventListener("keydown",Qe),N())}function te(){q&&(q=!1,document.removeEventListener("mousedown",lt),document.removeEventListener("keydown",Qe),N())}function Me(z){z.key==="Escape"&&fe()}function He(){D||(D=!0,document.addEventListener("keydown",Me),N())}function fe(){D&&(D=!1,document.removeEventListener("keydown",Me),N())}let b={onClose:fe,onOverlayClick(z){z.target===z.currentTarget&&fe()}},x={onSearchInput(z){M.search=String(z.target.value||""),_e()},onPriorityChange(z){M.priority=String(z.target.value||""),_e()},onTypeChange(z){M.type=String(z.target.value||""),_e()},onSortChange(z){let re=String(z.target.value||"");if(!(!rl.has(re)||re===B)){B=re;try{window.localStorage.setItem(tl,re)}catch{}_e()}},onDeferredToggle(){D?fe():He()},onLabelMenuToggle(){q?te():V()},onLabelToggle(z){let re=M.labels.indexOf(z);re===-1?M.labels.push(z):M.labels.splice(re,1),_e()},onLabelClear(){M.labels.length!==0&&(M.labels=[],_e())},onNewIssue(){p&&p()}};function $(){return i`
      <div class="board-view">
        ${el(M,x,{sort_mode:B,deferred_popup_open:D,deferred_count:L,label_options:rt(),label_menu_open:q})}
        <div class="board-root">
          ${rn({title:"Blocked",id:"blocked-col",items:Fe(S)},Oe)}
          ${rn({title:"Ready",id:"ready-col",items:Fe(O)},Oe)}
          ${rn({title:"In progress",id:"in-progress-col",items:Fe(U)},Oe)}
          ${rn({title:"Resolved",id:"resolved-col",items:Fe(ee)},Oe)}
          ${rn({title:"Closed",id:"closed-col",items:Fe(P),is_closed:!0,closed_range:f},Oe)}
        </div>
        ${D?Ji({items:Fe(Q),count:L},Ie,b):""}
      </div>
    `}function N(){Ze($(),e),K()}function K(){try{let z=e.querySelector("#deferred-popup");z&&!z.open&&(typeof z.showModal=="function"?z.showModal():z.setAttribute("open",""));let re=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let be of re)Array.from(be.querySelectorAll(".board-card")).forEach((C,F)=>{C.tabIndex=F===0?0:-1})}catch{}}async function Z(z,re){if(!o){ie("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:z,status:re}),ie("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(be){r("update-status failed: %o",be),ie("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function ce(z){switch(z){case"blocked-col":return S;case"ready-col":return O;case"in-progress-col":return U;case"resolved-col":return ee;default:return[]}}function ue(z,re,be){if(!o||!a)return;let k=ce(z),C=k.find(Ee=>Ee.id===re);if(!C)return;let F=k.filter(Ee=>Ee.id!==re),J=be.closest?be.closest(".board-card"):null,ke=F.length;if(J){let Ee=J.getAttribute("data-issue-id");if(Ee===re)return;let Ce=F.findIndex(mt=>mt.id===Ee);Ce>=0&&(ke=Ce)}let X=F.slice();X.splice(ke,0,C),A.applyReorder(re,X,ke)}function De(){for(let z of Array.from(e.querySelectorAll(".board-column--drag-over")))z.classList.remove("board-column--drag-over")}let ye=null;e.addEventListener("dragover",z=>{z.preventDefault(),z.dataTransfer&&(z.dataTransfer.dropEffect="move");let be=z.target.closest(".board-column");be&&be!==ye&&(ye&&ye.classList.remove("board-column--drag-over"),be.classList.add("board-column--drag-over"),ye=be)}),e.addEventListener("dragleave",z=>{let re=z.relatedTarget;(!re||!e.contains(re))&&ye&&(ye.classList.remove("board-column--drag-over"),ye=null)}),e.addEventListener("drop",z=>{z.preventDefault(),ye&&(ye.classList.remove("board-column--drag-over"),ye=null);let re=z.target,be=re.closest(".board-column");if(!be)return;let k=z.dataTransfer?.getData("text/plain")||"";if(!k)return;let C=be.id,F=R.get(k);if(F&&F===C){if(fp.has(C)){if(B!=="manual"){ie("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}ue(C,k,re)}return}let J=pp[C];if(!J){ie("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}m.get(k)!==J&&Z(k,J)}),e.addEventListener("keydown",z=>{let re=z.target;if(!(re instanceof HTMLElement))return;let be=String(re.tagName||"").toLowerCase();if(be==="input"||be==="textarea"||be==="select"||be==="button"||be==="a"||re.isContentEditable===!0)return;let k=re.closest(".board-card");if(!k)return;let C=String(z.key||"");if(C==="Enter"||C===" "){z.preventDefault();let X=k.getAttribute("data-issue-id");X&&n(X);return}if(C!=="ArrowUp"&&C!=="ArrowDown"&&C!=="ArrowLeft"&&C!=="ArrowRight")return;z.preventDefault();let F=k.closest(".board-column");if(!F)return;let J=Array.from(F.querySelectorAll(".board-card")),ke=J.indexOf(k);if(C==="ArrowDown"&&ke<J.length-1){Ne(k,J[ke+1]);return}if(C==="ArrowUp"&&ke>0){Ne(k,J[ke-1]);return}if(C==="ArrowLeft"||C==="ArrowRight"){let X=Array.from(e.querySelectorAll(".board-column")),Ee=X.indexOf(F),Ce=C==="ArrowRight"?1:-1,mt=Ee+Ce;for(;mt>=0&&mt<X.length;){let Et=X[mt].querySelector(".board-card");if(Et){Ne(k,Et);return}mt+=Ce}}});function Ne(z,re){try{z.tabIndex=-1,re.tabIndex=0,re.focus()}catch{}}let Ae=null;h&&h.subscribe&&(Ae=h.subscribe(()=>{try{_e()}catch{}}));let Se=null;c&&c.subscribe&&(Se=c.subscribe(()=>{try{_e()}catch{}}));let Ke=null;return u&&u.subscribe&&(Ke=u.subscribe(()=>{N()})),{async load(){r("load"),_e()},clear(){te(),fe(),Ae&&(Ae(),Ae=null),Se&&(Se(),Se=null),Ke&&(Ke(),Ke=null),e.replaceChildren(),S=[],O=[],U=[],ee=[],Q=[],P=[],m=new Map,R=new Map}}}function Ro(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function kn(e,t){return e.filter(r=>{let n=Ro(r);return!(n&&t.has(n))})}async function mp(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let r=!1;try{r=document.execCommand("copy")}finally{t.remove()}return r}catch{return!1}}async function Xt(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}function ir(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function Sr(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function gp(e,t=document){let r=t.createElement("dialog");r.className="continuation-dialog";let n=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),c=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",c.textContent=`${ir(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${ir(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,n.type="button",n.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",n.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",r.append(a,c,n,s,o),t.body.append(r),new Promise(u=>{let d=p=>{typeof r.close=="function"&&r.close(),r.remove(),u(p)};n.addEventListener("click",()=>d("prior_session")),s.addEventListener("click",()=>d("fresh_current")),o.addEventListener("click",()=>d(null)),r.addEventListener("cancel",p=>{p.preventDefault(),d(null)}),typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")})}async function fr(e,t,r={}){let n=e;for(r.onResult?.(n);n?.continuation_mismatch;){let s=n.continuation_mismatch,o=await gp(s);if(o===null)return n;n=await t(o,s.decision_token),r.onResult?.(n),n?.conflict&&r.refresh&&(n=await r.refresh(n),r.onResult?.(n))}return n}var bp=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_model","orchestration_model","orchestration_effort","orchestration_speed"],sl={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},hp=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function yt(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function _t(e){return typeof e=="string"&&e.length>0?e:null}function nn(e){return e.startsWith("gpt-")?e.slice(4):e}function dt(e,t,r,n,s){return{value:e,source:t,display:r,full_value:n,resolution:s}}function al(e,t,r){let n=_t(t[e]);if(n!==null)return{value:n,source:"pin"};let s=_t(r[e]);return s===null?null:{value:s,source:"global"}}function $n(e,t,r,n){return al(e,t,r)||{value:n,source:"base"}}function Io(e,t,r,n){let s=r?.implementation?.model_catalog;if(t&&yt(s?.[t])){let a=_t(s[t][e]);if(a!==null)return a}if(t&&Array.isArray(s?.[t])&&s[t].includes(e))return e;if(!t&&yt(s)){for(let a of Object.values(s))if(yt(a)){let c=_t(a[e]);if(c!==null)return c}else if(Array.isArray(a)&&a.includes(e))return e}let o=n?.model_index?.[e];return _t(n?.runners?.[o]?.models?.[e]?.id)||e}function yp(e,t){return _t(t?.review?.reviewers?.[e]?.model)||e}function sn(e,t,r=!1){if(e==="default")return dt(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let n=r?nn(e):e;return dt(e,t,n,e,"explicit")}function il(e,t,r){let n=t?.implementation?.model_catalog?.[e],s=[];yt(n)?s.push(...Object.keys(n)):Array.isArray(n)&&s.push(...n.filter(a=>typeof a=="string"));let o=r?.runners?.[e]?.models;if(yt(o))for(let a of Object.keys(o))s.includes(a)||s.push(a);return s}function vp(e,t){let r=[],n=e?.implementation?.model_catalog;yt(n)&&r.push(...Object.keys(n));let s=t?.runners;if(yt(s))for(let o of Object.keys(s))r.includes(o)||r.push(o);return r}function wp(e,t,r){if(e===null)return{runtime:null,offered:!1};let n=!1;for(let s of vp(t,r)){let o=il(s,t,r);if(o.length>0&&(n=!0),o.includes(e))return{runtime:s,offered:!0}}return{runtime:null,offered:n}}function Lo(e){return dt(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function ol(e,t,r){let n=al(e,t,r);return n?sn(n.value,n.source):dt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function on(e){let t=yt(e.pin)?e.pin:{},r=yt(e.global)?e.global:{},n=yt(e.execution_defaults)?e.execution_defaults:null,s=n?.supported===!0&&yt(n.session)?n.session:null,o=n?.supported===!0&&yt(n.orchestration)?n.orchestration:null,a=yt(e.runner_catalog)?e.runner_catalog:null,c=_t(r.quick_fix_impl_model),u=wp(c,s,a),d={};if(s){let p=$n("workflow_mode",t,r,_t(s.workflow_mode_default));d.workflow_mode=p.source==="base"?dt(p.value,"base",p.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",p.value,"default"):sn(p.value,p.source);for(let P of["spec_review","plan_review","impl_review"]){let D=`${P}_model`,L=_t(P==="plan_review"?p.value==="fast_track"?s.plan_review?.fast_track_default:s.plan_review?.standard_recommended:s.review?.default),B=$n(D,t,r,L);if(B.value===null)d[D]=dt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(B.value!=="self"&&B.value!=="skip"&&!yt(s.review?.reviewers?.[B.value]))d[D]=Lo(dt(B.value,B.source,"",null,"explicit"));else{let m=yp(B.value,s);d[D]=dt(B.value,B.source,nn(m),m,B.source==="base"?"default":"explicit")}}for(let[P,D]of Object.entries(sl)){let L=d[D].value;if(L==="self"||L==="skip"){d[P]=dt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let B=_t(s.review?.reviewers?.[L||""]?.effort),m=$n(P,t,r,B);d[P]=m.value===null?dt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):dt(m.value,m.source,m.value,m.value,m.source==="base"?"default":"explicit")}let f=yt(s.implementation?.default)?s.implementation.default:{},h=_t(e.route),A=h!==null&&["quick_fix","spec_backed","full_plan"].includes(h),S=yt(s.implementation?.route_defaults)?s.implementation.route_defaults:{},O=A&&yt(S[h])?S[h]:{};for(let P of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let D=$n(P,t,r,P==="impl_dispatch"?_t(O.dispatch)||_t(f.dispatch):_t(f[P.replace("impl_","")]));d[P]=D.value===null?dt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):dt(D.value,D.source,D.value,D.value,D.source==="base"?"default":"explicit")}let U=_t(t.impl_runtime),ee=U==="inherit"?_t(e.controller_runtime):U,Q=h==="quick_fix"&&_t(t.impl_dispatch)===null&&u.runtime!==null&&(U===null||ee===u.runtime);if(Q){let P=u.runtime,D=c;d.impl_dispatch=dt("delegated","global","\uC704\uC784 (\uC804\uC5ED quick_fix)","delegated","explicit"),U===null&&(d.impl_runtime=dt(P,"global",`${P} (\uC720\uB3C4)`,P,"explicit")),_t(t.impl_model)===null&&(d.impl_model=dt(D,"global",D,D,"explicit"))}if(d.impl_dispatch.value==="main"){d.impl_dispatch.display="\uBA54\uC778";for(let P of["impl_runtime","impl_model","impl_effort","impl_speed"])d[P]=dt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(d.impl_dispatch.value==="delegated"&&!Q&&(d.impl_dispatch.display="\uC704\uC784"),d.impl_runtime.value==="inherit"&&(d.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",d.impl_runtime.resolution="dynamic"),d.impl_model.value!==null){let P=d.impl_runtime.value==="inherit"?_t(e.controller_runtime):d.impl_runtime.value,D=P?il(P,s,a):[];if(d.impl_model.value!=="auto"&&D.length>0&&!D.includes(d.impl_model.value))d.impl_model=Lo(d.impl_model);else{let L=Io(d.impl_model.value,P,s,a);d.impl_model.display=nn(L),d.impl_model.full_value=L}}if(d.impl_effort.value==="auto"){let P=_t(e.transport)||(d.impl_runtime.value==="codex"?"codex-native-spawn":d.impl_runtime.value==="claude"?"implement-claude":null),D=P?_t(s.implementation?.effort_by_transport?.[P]?.auto):null;D&&!hp.has(D)?(d.impl_effort.display=`${D} (\uBE44\uD638\uD658)`,d.impl_effort.full_value=D,d.impl_effort.resolution="incompatible"):(d.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",d.impl_effort.resolution="dynamic")}d.impl_speed.value==="default"&&(d.impl_speed=d.impl_speed.source==="base"?dt("default","base","default (\uC77C\uBC18)","default","default"):sn("default",d.impl_speed.source))}}else for(let p of bp.filter(f=>!f.startsWith("orchestration_")))d[p]=ol(p,t,r);if(!s){for(let[p,f]of Object.entries(sl))(d[f].value==="self"||d[f].value==="skip")&&(d[p]=dt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(d.impl_dispatch.value==="main"){d.impl_dispatch.display="\uBA54\uC778";for(let p of["impl_runtime","impl_model","impl_effort","impl_speed"])d[p]=dt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else d.impl_dispatch.value==="delegated"&&(d.impl_dispatch.display="\uC704\uC784"),d.impl_runtime.value==="inherit"&&(d.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",d.impl_runtime.resolution="dynamic"),d.impl_effort.value==="auto"&&(d.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",d.impl_effort.resolution="dynamic")}for(let p of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!o){d[p]=ol(p,t,r);continue}let f=p.replace("orchestration_",""),h=_t(o[f]),A=$n(p,t,r,h);if(p==="orchestration_effort"&&A.source==="base"){d[p]=dt(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(A.value===null){d[p]=dt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(p==="orchestration_model"){let S=A.source==="base"?_t(o.model_id)||A.value:Io(A.value,null,s,a);d[p]=dt(A.value,A.source,nn(S),S,A.source==="base"?"default":"explicit");continue}if(A.value==="default"){d[p]=A.source==="base"?dt("default","base","default (\uC77C\uBC18)","default","default"):sn("default",A.source);continue}d[p]=sn(A.value,A.source)}if(s)if(c===null){let p=d.orchestration_model.full_value;d.quick_fix_impl_model=dt(null,"base",p===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${nn(p)})`,null,"default")}else if(u.runtime!==null){let p=Io(c,u.runtime,s,a);d.quick_fix_impl_model=dt(c,"global",nn(p),p,"explicit")}else u.offered?d.quick_fix_impl_model=Lo(dt(c,"global","",null,"explicit")):d.quick_fix_impl_model=sn(c,"global");return d}function kp(e,t){let r=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let n=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${r} (${n})`}function $s(e){let t=yt(e.pin)?e.pin:{},r=yt(e.global)?e.global:{},n=yt(e.resolution_global)?{...e.resolution_global}:{};delete n[e.key];let s=f=>{let h={...n,...f};return on({pin:e.layer==="pin"?h:t,global:e.layer==="pin"?r:h,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},o=e.layer==="pin"?t:r,a={...o};delete a[e.key];let c=s(a)[e.key],u=s(o)[e.key],d=_t(o[e.key]),p=[...e.choices];return d!==null&&!p.includes(d)&&p.unshift(d),{unset_label:kp(c,e.layer==="pin"),full_value:c.full_value,unavailable:c.resolution==="unavailable",disabled:u?.resolution==="not_applicable",options:p.map(f=>{let h=s({...o,[e.key]:f})[e.key];return{value:f,label:h.display,full_value:h.full_value}})}}function an(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let r=e.createElement("h2"),n=e.createElement("textarea"),s=e.createElement("div"),o=e.createElement("button"),a=e.createElement("button");return r.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",n.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",n.maxLength=4e3,s.className="resume-instructions-dialog__actions",o.type="button",o.textContent="\uC774\uC5B4\uD558\uAE30",a.type="button",a.textContent="\uCDE8\uC18C",s.append(o,a),t.append(r,n,s),e.body.append(t),new Promise(c=>{let u=!1,d=f=>{u||(u=!0,typeof t.close=="function"&&t.close(),t.remove(),c(f))},p=()=>d(n.value.trim());o.addEventListener("click",p),a.addEventListener("click",()=>d(null)),n.addEventListener("keydown",f=>{f.key==="Enter"&&(f.ctrlKey||f.metaKey)&&(f.preventDefault(),p())}),t.addEventListener("cancel",f=>{f.preventDefault(),d(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),n.focus()})}var pl="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function xt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var _r=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],xn=[..._r,"reasoning_output_tokens"],$p=["implementation","review-consult"];function Oo(e){let t=0;for(let r of _r)t+=xt(e?.[r]);return t}function xp(e){return!e||typeof e!="object"?!1:_r.some(t=>Number.isFinite(e[t]))}function ll(e){return!e||typeof e!="object"?!1:xn.some(t=>Number.isFinite(e[t]))}function Ap(e){let t={};for(let r of xn)e&&Number.isFinite(e[r])&&(t[r]=e[r]);return t}function cl(e){let t={};for(let r of xn)Number.isFinite(e[r])&&(t[r]=e[r]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function ul(e,t){return e==="codex"?xt(t.input_tokens)+xt(t.output_tokens):Oo(t)}function Sp(e){return e==="claude"?"Claude":"Codex"}function Ep(e){return`\u03C4 ${fl(e)}`}function Tp(e,t){let r=t.breakdown||{},n=[`\uC785\uB825 ${xt(r.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${xt(r.output_tokens).toLocaleString("en-US")}`];e==="claude"?n.push(`\uCE90\uC2DC\uC77D\uAE30 ${xt(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${xt(r.cache_creation_input_tokens).toLocaleString("en-US")}`):(n.push(`\uCE90\uC2DC\uC77D\uAE30 ${xt(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${xt(r.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(r.reasoning_output_tokens)&&n.push(`\uCD94\uB860\uCD9C\uB825 ${xt(r.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,n.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(pl),o.join(`
`)}function At(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let r of["claude","codex"]){let n=e.providers[r];n&&t.push({provider:r,label:`${Sp(r)} ${Ep(n.subtotal)}${typeof n.total_cost_usd=="number"&&Number.isFinite(n.total_cost_usd)?` \xB7 $${n.total_cost_usd.toFixed(2)}`:""}`,tooltip:Tp(r,n)})}return t}function As(e){let t={},r={claude:!0,codex:!1},n={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let c=t[o];c||(c={subtotal:0,breakdown:{}},t[o]=c),c.subtotal+=a.subtotal;for(let u of xn)Number.isFinite(a.breakdown[u])&&(c.breakdown[u]=xt(c.breakdown[u])+xt(a.breakdown[u]));a.replayed&&(c.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?n.claude+=a.total_cost_usd:r.claude=!1)}return t.claude&&r.claude&&(t.claude.total_cost_usd=n.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function Mo(e){return!e||typeof e!="object"?null:zt({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function Cp(e){return e==="codex"?"codex":"claude"}function Er(){return{subtotal:0,breakdown:Ap(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function xs(e,t,r){e.subtotal+=t.subtotal;for(let n of xn)Number.isFinite(t.usage[n])&&(e.breakdown[n]=xt(e.breakdown[n])+xt(t.usage[n]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),r&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function dl(e,t){let r={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(r.legs=e.legs),e.replayed&&(r.replayed=!0),r}function fl(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function ln(e){return xp(e)?`\u03C4 ${fl(Oo(e))}`:null}function Qt(e){let t=ln(e);if(!t)return null;let r=e?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${t} \xB7 $${r.toFixed(2)}`:t}function cn(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${xt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${xt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${xt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${xt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${Oo(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&r.push(pl),r.join(`
`)}function zt(e,t){let r={claude:Er(),codex:Er()},n={orchestrator:{claude:Er(),codex:Er()},implementation:{claude:Er(),codex:Er()},"review-consult":{claude:Er(),codex:Er()}},s=new Set;for(let c of Object.values(e||{})){if(!c||c.bead_id!==t)continue;let u=c.usage;if(ll(u)){let p=Cp(c.runner),f=cl(u),h={provider:p,role:"orchestrator",attempt_id:String(c.attempt_id||""),usage:f,subtotal:ul(p,f)};f.replayed===!0&&(h.replayed=!0),typeof c.model=="string"&&(h.model=c.model),typeof c.session_id=="string"&&(h.session_id=c.session_id),xs(r[p],h,!0),xs(n.orchestrator[p],h,!0)}let d=Array.isArray(c.usage_legs)?c.usage_legs:[];for(let p of d){if(!p||p.provider!=="codex"||!$p.includes(p.role)||!ll(p.usage))continue;let f=typeof p.receipt_id=="string"&&p.receipt_id.length>0?p.receipt_id:null;if(!f||s.has(f))continue;s.add(f);let h=cl(p.usage),A={provider:"codex",role:p.role,attempt_id:String(c.attempt_id||""),usage:h,subtotal:ul("codex",h)};A.receipt_id=f,typeof p.model=="string"&&(A.model=p.model),typeof p.effort=="string"&&p.effort.trim().length>0&&(A.effort=p.effort),typeof p.session_id=="string"?A.session_id=p.session_id:typeof p.thread_id=="string"&&(A.session_id=p.thread_id),typeof p.turn_id=="string"&&(A.turn_id=p.turn_id),typeof p.completed_at=="string"&&(A.completed_at=p.completed_at),h.replayed===!0&&(A.replayed=!0),xs(r.codex,A,!1),xs(n[A.role].codex,A,!1)}}let o={};for(let c of["claude","codex"]){let u=r[c];if(u.legs.length===0)continue;let d=dl(u,!1);c==="claude"&&u.outer_count>0&&u.outer_cost_count===u.outer_count&&(d.total_cost_usd=u.outer_cost),o[c]=d}if(Object.keys(o).length===0)return null;let a={};for(let c of["orchestrator","implementation","review-consult"]){let u={};for(let d of["claude","codex"]){let p=n[c][d];p.legs.length>0&&(u[d]={...dl(p,!0),legs:p.legs})}Object.keys(u).length>0&&(a[c]=u)}return{providers:o,roles:a}}var{entries:kl,setPrototypeOf:_l,isFrozen:Rp,getPrototypeOf:Ip,getOwnPropertyDescriptor:Lp}=Object,{freeze:It,seal:Ht,create:Bo}=Object,{apply:Uo,construct:Wo}=typeof Reflect<"u"&&Reflect;It||(It=function(t){return t});Ht||(Ht=function(t){return t});Uo||(Uo=function(t,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return t.apply(r,s)});Wo||(Wo=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new t(...n)});var Ss=Lt(Array.prototype.forEach),Op=Lt(Array.prototype.lastIndexOf),ml=Lt(Array.prototype.pop),An=Lt(Array.prototype.push),Mp=Lt(Array.prototype.splice),Ts=Lt(String.prototype.toLowerCase),Po=Lt(String.prototype.toString),Do=Lt(String.prototype.match),Sn=Lt(String.prototype.replace),Pp=Lt(String.prototype.indexOf),Dp=Lt(String.prototype.trim),Jt=Lt(Object.prototype.hasOwnProperty),Rt=Lt(RegExp.prototype.test),En=Np(TypeError);function Lt(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return Uo(e,t,n)}}function Np(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return Wo(e,r)}}function tt(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Ts;_l&&_l(e,null);let n=t.length;for(;n--;){let s=t[n];if(typeof s=="string"){let o=r(s);o!==s&&(Rp(t)||(t[n]=o),s=o)}e[s]=!0}return e}function qp(e){for(let t=0;t<e.length;t++)Jt(e,t)||(e[t]=null);return e}function mr(e){let t=Bo(null);for(let[r,n]of kl(e))Jt(e,r)&&(Array.isArray(n)?t[r]=qp(n):n&&typeof n=="object"&&n.constructor===Object?t[r]=mr(n):t[r]=n);return t}function Tn(e,t){for(;e!==null;){let n=Lp(e,t);if(n){if(n.get)return Lt(n.get);if(typeof n.value=="function")return Lt(n.value)}e=Ip(e)}function r(){return null}return r}var gl=It(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),No=It(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),qo=It(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Fp=It(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Fo=It(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),jp=It(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),bl=It(["#text"]),hl=It(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),jo=It(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),yl=It(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Es=It(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Bp=Ht(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Up=Ht(/<%[\w\W]*|[\w\W]*%>/gm),Wp=Ht(/\$\{[\w\W]*/gm),zp=Ht(/^data-[\-\w.\u00B7-\uFFFF]+$/),Hp=Ht(/^aria-[\-\w]+$/),$l=Ht(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Gp=Ht(/^(?:\w+script|data):/i),Vp=Ht(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),xl=Ht(/^html$/i),Kp=Ht(/^[a-z][.\w]*(-[.\w]+)+$/i),vl=Object.freeze({__proto__:null,ARIA_ATTR:Hp,ATTR_WHITESPACE:Vp,CUSTOM_ELEMENT:Kp,DATA_ATTR:zp,DOCTYPE_NAME:xl,ERB_EXPR:Up,IS_ALLOWED_URI:$l,IS_SCRIPT_OR_DATA:Gp,MUSTACHE_EXPR:Bp,TMPLIT_EXPR:Wp}),Cn={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Yp=function(){return typeof window>"u"?null:window},Zp=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},wl=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Al(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Yp(),t=ve=>Al(ve);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==Cn.document||!e.Element)return t.isSupported=!1,t;let{document:r}=e,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:c,Element:u,NodeFilter:d,NamedNodeMap:p=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:f,DOMParser:h,trustedTypes:A}=e,S=u.prototype,O=Tn(S,"cloneNode"),U=Tn(S,"remove"),ee=Tn(S,"nextSibling"),Q=Tn(S,"childNodes"),P=Tn(S,"parentNode");if(typeof a=="function"){let ve=r.createElement("template");ve.content&&ve.content.ownerDocument&&(r=ve.content.ownerDocument)}let D,L="",{implementation:B,createNodeIterator:m,createDocumentFragment:R,getElementsByTagName:H}=r,{importNode:se}=n,M=wl();t.isSupported=typeof kl=="function"&&typeof P=="function"&&B&&B.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:q,ERB_EXPR:de,TMPLIT_EXPR:ge,DATA_ATTR:pe,ARIA_ATTR:Fe,IS_SCRIPT_OR_DATA:rt,ATTR_WHITESPACE:Ue,CUSTOM_ELEMENT:_e}=vl,{IS_ALLOWED_URI:Le}=vl,he=null,$e=tt({},[...gl,...No,...qo,...Fo,...bl]),Re=null,je=tt({},[...hl,...jo,...yl,...Es]),xe=Object.seal(Bo(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),We=null,Xe=null,Te=Object.seal(Bo(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),ot=!0,Y=!0,W=!1,oe=!0,Oe=!1,ze=!0,Ve=!1,Ie=!1,lt=!1,Qe=!1,V=!1,te=!1,Me=!0,He=!1,fe="user-content-",b=!0,x=!1,$={},N=null,K=tt({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Z=null,ce=tt({},["audio","video","img","source","image","track"]),ue=null,De=tt({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),ye="http://www.w3.org/1998/Math/MathML",Ne="http://www.w3.org/2000/svg",Ae="http://www.w3.org/1999/xhtml",Se=Ae,Ke=!1,z=null,re=tt({},[ye,Ne,Ae],Po),be=tt({},["mi","mo","mn","ms","mtext"]),k=tt({},["annotation-xml"]),C=tt({},["title","style","font","a","script"]),F=null,J=["application/xhtml+xml","text/html"],ke="text/html",X=null,Ee=null,Ce=r.createElement("form"),mt=function(l){return l instanceof RegExp||l instanceof Function},Et=function(){let l=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Ee&&Ee===l)){if((!l||typeof l!="object")&&(l={}),l=mr(l),F=J.indexOf(l.PARSER_MEDIA_TYPE)===-1?ke:l.PARSER_MEDIA_TYPE,X=F==="application/xhtml+xml"?Po:Ts,he=Jt(l,"ALLOWED_TAGS")?tt({},l.ALLOWED_TAGS,X):$e,Re=Jt(l,"ALLOWED_ATTR")?tt({},l.ALLOWED_ATTR,X):je,z=Jt(l,"ALLOWED_NAMESPACES")?tt({},l.ALLOWED_NAMESPACES,Po):re,ue=Jt(l,"ADD_URI_SAFE_ATTR")?tt(mr(De),l.ADD_URI_SAFE_ATTR,X):De,Z=Jt(l,"ADD_DATA_URI_TAGS")?tt(mr(ce),l.ADD_DATA_URI_TAGS,X):ce,N=Jt(l,"FORBID_CONTENTS")?tt({},l.FORBID_CONTENTS,X):K,We=Jt(l,"FORBID_TAGS")?tt({},l.FORBID_TAGS,X):mr({}),Xe=Jt(l,"FORBID_ATTR")?tt({},l.FORBID_ATTR,X):mr({}),$=Jt(l,"USE_PROFILES")?l.USE_PROFILES:!1,ot=l.ALLOW_ARIA_ATTR!==!1,Y=l.ALLOW_DATA_ATTR!==!1,W=l.ALLOW_UNKNOWN_PROTOCOLS||!1,oe=l.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Oe=l.SAFE_FOR_TEMPLATES||!1,ze=l.SAFE_FOR_XML!==!1,Ve=l.WHOLE_DOCUMENT||!1,Qe=l.RETURN_DOM||!1,V=l.RETURN_DOM_FRAGMENT||!1,te=l.RETURN_TRUSTED_TYPE||!1,lt=l.FORCE_BODY||!1,Me=l.SANITIZE_DOM!==!1,He=l.SANITIZE_NAMED_PROPS||!1,b=l.KEEP_CONTENT!==!1,x=l.IN_PLACE||!1,Le=l.ALLOWED_URI_REGEXP||$l,Se=l.NAMESPACE||Ae,be=l.MATHML_TEXT_INTEGRATION_POINTS||be,k=l.HTML_INTEGRATION_POINTS||k,xe=l.CUSTOM_ELEMENT_HANDLING||{},l.CUSTOM_ELEMENT_HANDLING&&mt(l.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(xe.tagNameCheck=l.CUSTOM_ELEMENT_HANDLING.tagNameCheck),l.CUSTOM_ELEMENT_HANDLING&&mt(l.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(xe.attributeNameCheck=l.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),l.CUSTOM_ELEMENT_HANDLING&&typeof l.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(xe.allowCustomizedBuiltInElements=l.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Oe&&(Y=!1),V&&(Qe=!0),$&&(he=tt({},bl),Re=[],$.html===!0&&(tt(he,gl),tt(Re,hl)),$.svg===!0&&(tt(he,No),tt(Re,jo),tt(Re,Es)),$.svgFilters===!0&&(tt(he,qo),tt(Re,jo),tt(Re,Es)),$.mathMl===!0&&(tt(he,Fo),tt(Re,yl),tt(Re,Es))),l.ADD_TAGS&&(typeof l.ADD_TAGS=="function"?Te.tagCheck=l.ADD_TAGS:(he===$e&&(he=mr(he)),tt(he,l.ADD_TAGS,X))),l.ADD_ATTR&&(typeof l.ADD_ATTR=="function"?Te.attributeCheck=l.ADD_ATTR:(Re===je&&(Re=mr(Re)),tt(Re,l.ADD_ATTR,X))),l.ADD_URI_SAFE_ATTR&&tt(ue,l.ADD_URI_SAFE_ATTR,X),l.FORBID_CONTENTS&&(N===K&&(N=mr(N)),tt(N,l.FORBID_CONTENTS,X)),b&&(he["#text"]=!0),Ve&&tt(he,["html","head","body"]),he.table&&(tt(he,["tbody"]),delete We.tbody),l.TRUSTED_TYPES_POLICY){if(typeof l.TRUSTED_TYPES_POLICY.createHTML!="function")throw En('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof l.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw En('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');D=l.TRUSTED_TYPES_POLICY,L=D.createHTML("")}else D===void 0&&(D=Zp(A,s)),D!==null&&typeof L=="string"&&(L=D.createHTML(""));It&&It(l),Ee=l}},nt=tt({},[...No,...qo,...Fp]),vt=tt({},[...Fo,...jp]),ur=function(l){let _=P(l);(!_||!_.tagName)&&(_={namespaceURI:Se,tagName:"template"});let E=Ts(l.tagName),G=Ts(_.tagName);return z[l.namespaceURI]?l.namespaceURI===Ne?_.namespaceURI===Ae?E==="svg":_.namespaceURI===ye?E==="svg"&&(G==="annotation-xml"||be[G]):!!nt[E]:l.namespaceURI===ye?_.namespaceURI===Ae?E==="math":_.namespaceURI===Ne?E==="math"&&k[G]:!!vt[E]:l.namespaceURI===Ae?_.namespaceURI===Ne&&!k[G]||_.namespaceURI===ye&&!be[G]?!1:!vt[E]&&(C[E]||!nt[E]):!!(F==="application/xhtml+xml"&&z[l.namespaceURI]):!1},wt=function(l){An(t.removed,{element:l});try{P(l).removeChild(l)}catch{U(l)}},Tt=function(l,_){try{An(t.removed,{attribute:_.getAttributeNode(l),from:_})}catch{An(t.removed,{attribute:null,from:_})}if(_.removeAttribute(l),l==="is")if(Qe||V)try{wt(_)}catch{}else try{_.setAttribute(l,"")}catch{}},dr=function(l){let _=null,E=null;if(lt)l="<remove></remove>"+l;else{let we=Do(l,/^[\r\n\t ]+/);E=we&&we[0]}F==="application/xhtml+xml"&&Se===Ae&&(l='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+l+"</body></html>");let G=D?D.createHTML(l):l;if(Se===Ae)try{_=new h().parseFromString(G,F)}catch{}if(!_||!_.documentElement){_=B.createDocument(Se,"template",null);try{_.documentElement.innerHTML=Ke?L:G}catch{}}let ae=_.body||_.documentElement;return l&&E&&ae.insertBefore(r.createTextNode(E),ae.childNodes[0]||null),Se===Ae?H.call(_,Ve?"html":"body")[0]:Ve?_.documentElement:ae},wr=function(l){return m.call(l.ownerDocument||l,l,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},Bt=function(l){return l instanceof f&&(typeof l.nodeName!="string"||typeof l.textContent!="string"||typeof l.removeChild!="function"||!(l.attributes instanceof p)||typeof l.removeAttribute!="function"||typeof l.setAttribute!="function"||typeof l.namespaceURI!="string"||typeof l.insertBefore!="function"||typeof l.hasChildNodes!="function")},Gt=function(l){return typeof c=="function"&&l instanceof c};function kt(ve,l,_){Ss(ve,E=>{E.call(t,l,_,Ee)})}let sr=function(l){let _=null;if(kt(M.beforeSanitizeElements,l,null),Bt(l))return wt(l),!0;let E=X(l.nodeName);if(kt(M.uponSanitizeElement,l,{tagName:E,allowedTags:he}),ze&&l.hasChildNodes()&&!Gt(l.firstElementChild)&&Rt(/<[/\w!]/g,l.innerHTML)&&Rt(/<[/\w!]/g,l.textContent)||l.nodeType===Cn.progressingInstruction||ze&&l.nodeType===Cn.comment&&Rt(/<[/\w]/g,l.data))return wt(l),!0;if(!(Te.tagCheck instanceof Function&&Te.tagCheck(E))&&(!he[E]||We[E])){if(!We[E]&&Mt(E)&&(xe.tagNameCheck instanceof RegExp&&Rt(xe.tagNameCheck,E)||xe.tagNameCheck instanceof Function&&xe.tagNameCheck(E)))return!1;if(b&&!N[E]){let G=P(l)||l.parentNode,ae=Q(l)||l.childNodes;if(ae&&G){let we=ae.length;for(let me=we-1;me>=0;--me){let et=O(ae[me],!0);et.__removalCount=(l.__removalCount||0)+1,G.insertBefore(et,ee(l))}}}return wt(l),!0}return l instanceof u&&!ur(l)||(E==="noscript"||E==="noembed"||E==="noframes")&&Rt(/<\/no(script|embed|frames)/i,l.innerHTML)?(wt(l),!0):(Oe&&l.nodeType===Cn.text&&(_=l.textContent,Ss([q,de,ge],G=>{_=Sn(_,G," ")}),l.textContent!==_&&(An(t.removed,{element:l.cloneNode()}),l.textContent=_)),kt(M.afterSanitizeElements,l,null),!1)},st=function(l,_,E){if(Me&&(_==="id"||_==="name")&&(E in r||E in Ce))return!1;if(!(Y&&!Xe[_]&&Rt(pe,_))){if(!(ot&&Rt(Fe,_))){if(!(Te.attributeCheck instanceof Function&&Te.attributeCheck(_,l))){if(!Re[_]||Xe[_]){if(!(Mt(l)&&(xe.tagNameCheck instanceof RegExp&&Rt(xe.tagNameCheck,l)||xe.tagNameCheck instanceof Function&&xe.tagNameCheck(l))&&(xe.attributeNameCheck instanceof RegExp&&Rt(xe.attributeNameCheck,_)||xe.attributeNameCheck instanceof Function&&xe.attributeNameCheck(_,l))||_==="is"&&xe.allowCustomizedBuiltInElements&&(xe.tagNameCheck instanceof RegExp&&Rt(xe.tagNameCheck,E)||xe.tagNameCheck instanceof Function&&xe.tagNameCheck(E))))return!1}else if(!ue[_]){if(!Rt(Le,Sn(E,Ue,""))){if(!((_==="src"||_==="xlink:href"||_==="href")&&l!=="script"&&Pp(E,"data:")===0&&Z[l])){if(!(W&&!Rt(rt,Sn(E,Ue,"")))){if(E)return!1}}}}}}}return!0},Mt=function(l){return l!=="annotation-xml"&&Do(l,_e)},kr=function(l){kt(M.beforeSanitizeAttributes,l,null);let{attributes:_}=l;if(!_||Bt(l))return;let E={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:Re,forceKeepAttr:void 0},G=_.length;for(;G--;){let ae=_[G],{name:we,namespaceURI:me,value:et}=ae,v=X(we),w=et,g=we==="value"?w:Dp(w);if(E.attrName=v,E.attrValue=g,E.keepAttr=!0,E.forceKeepAttr=void 0,kt(M.uponSanitizeAttribute,l,E),g=E.attrValue,He&&(v==="id"||v==="name")&&(Tt(we,l),g=fe+g),ze&&Rt(/((--!?|])>)|<\/(style|title|textarea)/i,g)){Tt(we,l);continue}if(v==="attributename"&&Do(g,"href")){Tt(we,l);continue}if(E.forceKeepAttr)continue;if(!E.keepAttr){Tt(we,l);continue}if(!oe&&Rt(/\/>/i,g)){Tt(we,l);continue}Oe&&Ss([q,de,ge],T=>{g=Sn(g,T," ")});let I=X(l.nodeName);if(!st(I,v,g)){Tt(we,l);continue}if(D&&typeof A=="object"&&typeof A.getAttributeType=="function"&&!me)switch(A.getAttributeType(I,v)){case"TrustedHTML":{g=D.createHTML(g);break}case"TrustedScriptURL":{g=D.createScriptURL(g);break}}if(g!==w)try{me?l.setAttributeNS(me,we,g):l.setAttribute(we,g),Bt(l)?wt(l):ml(t.removed)}catch{Tt(we,l)}}kt(M.afterSanitizeAttributes,l,null)},Vt=function ve(l){let _=null,E=wr(l);for(kt(M.beforeSanitizeShadowDOM,l,null);_=E.nextNode();)kt(M.uponSanitizeShadowNode,_,null),sr(_),kr(_),_.content instanceof o&&ve(_.content);kt(M.afterSanitizeShadowDOM,l,null)};return t.sanitize=function(ve){let l=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},_=null,E=null,G=null,ae=null;if(Ke=!ve,Ke&&(ve="<!-->"),typeof ve!="string"&&!Gt(ve))if(typeof ve.toString=="function"){if(ve=ve.toString(),typeof ve!="string")throw En("dirty is not a string, aborting")}else throw En("toString is not a function");if(!t.isSupported)return ve;if(Ie||Et(l),t.removed=[],typeof ve=="string"&&(x=!1),x){if(ve.nodeName){let et=X(ve.nodeName);if(!he[et]||We[et])throw En("root node is forbidden and cannot be sanitized in-place")}}else if(ve instanceof c)_=dr("<!---->"),E=_.ownerDocument.importNode(ve,!0),E.nodeType===Cn.element&&E.nodeName==="BODY"||E.nodeName==="HTML"?_=E:_.appendChild(E);else{if(!Qe&&!Oe&&!Ve&&ve.indexOf("<")===-1)return D&&te?D.createHTML(ve):ve;if(_=dr(ve),!_)return Qe?null:te?L:""}_&&lt&&wt(_.firstChild);let we=wr(x?ve:_);for(;G=we.nextNode();)sr(G),kr(G),G.content instanceof o&&Vt(G.content);if(x)return ve;if(Qe){if(V)for(ae=R.call(_.ownerDocument);_.firstChild;)ae.appendChild(_.firstChild);else ae=_;return(Re.shadowroot||Re.shadowrootmode)&&(ae=se.call(n,ae,!0)),ae}let me=Ve?_.outerHTML:_.innerHTML;return Ve&&he["!doctype"]&&_.ownerDocument&&_.ownerDocument.doctype&&_.ownerDocument.doctype.name&&Rt(xl,_.ownerDocument.doctype.name)&&(me="<!DOCTYPE "+_.ownerDocument.doctype.name+`>
`+me),Oe&&Ss([q,de,ge],et=>{me=Sn(me,et," ")}),D&&te?D.createHTML(me):me},t.setConfig=function(){let ve=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Et(ve),Ie=!0},t.clearConfig=function(){Ee=null,Ie=!1},t.isValidAttribute=function(ve,l,_){Ee||Et({});let E=X(ve),G=X(l);return st(E,G,_)},t.addHook=function(ve,l){typeof l=="function"&&An(M[ve],l)},t.removeHook=function(ve,l){if(l!==void 0){let _=Op(M[ve],l);return _===-1?void 0:Mp(M[ve],_,1)[0]}return ml(M[ve])},t.removeHooks=function(ve){M[ve]=[]},t.removeAllHooks=function(){M=wl()},t}var Sl=Al();var gr={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Cs=e=>(...t)=>({_$litDirective$:e,values:t}),un=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,n){this._$Ct=t,this._$AM=r,this._$Ci=n}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var Rn=class extends un{constructor(t){if(super(t),this.it=ht,t.type!==gr.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===ht||t==null)return this._t=void 0,this.it=t;if(t===Ut)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};Rn.directiveName="unsafeHTML",Rn.resultType=1;var El=Cs(Rn);function Vo(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Wr=Vo();function Ml(e){Wr=e}var Mn={exec:()=>null};function at(e,t=""){let r=typeof e=="string"?e:e.source,n={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(Ot.caret,"$1"),r=r.replace(s,a),n},getRegex:()=>new RegExp(r,t)};return n}var Xp=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Ot={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Qp=/^(?:[ \t]*(?:\n|$))+/,Jp=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,ef=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Pn=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,tf=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Ko=/(?:[*+-]|\d{1,9}[.)])/,Pl=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Dl=at(Pl).replace(/bull/g,Ko).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),rf=at(Pl).replace(/bull/g,Ko).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Yo=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,nf=/^[^\n]+/,Zo=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,sf=at(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Zo).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),of=at(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Ko).getRegex(),Ps="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Xo=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,af=at("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Xo).replace("tag",Ps).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Nl=at(Yo).replace("hr",Pn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ps).getRegex(),lf=at(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Nl).getRegex(),Qo={blockquote:lf,code:Jp,def:sf,fences:ef,heading:tf,hr:Pn,html:af,lheading:Dl,list:of,newline:Qp,paragraph:Nl,table:Mn,text:nf},Tl=at("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Pn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ps).getRegex(),cf={...Qo,lheading:rf,table:Tl,paragraph:at(Yo).replace("hr",Pn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Tl).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ps).getRegex()},uf={...Qo,html:at(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Xo).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Mn,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:at(Yo).replace("hr",Pn).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Dl).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},df=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,pf=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,ql=/^( {2,}|\\)\n(?!\s*$)/,ff=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Ds=/[\p{P}\p{S}]/u,Jo=/[\s\p{P}\p{S}]/u,Fl=/[^\s\p{P}\p{S}]/u,_f=at(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Jo).getRegex(),jl=/(?!~)[\p{P}\p{S}]/u,mf=/(?!~)[\s\p{P}\p{S}]/u,gf=/(?:[^\s\p{P}\p{S}]|~)/u,bf=at(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Xp?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Bl=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,hf=at(Bl,"u").replace(/punct/g,Ds).getRegex(),yf=at(Bl,"u").replace(/punct/g,jl).getRegex(),Ul="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",vf=at(Ul,"gu").replace(/notPunctSpace/g,Fl).replace(/punctSpace/g,Jo).replace(/punct/g,Ds).getRegex(),wf=at(Ul,"gu").replace(/notPunctSpace/g,gf).replace(/punctSpace/g,mf).replace(/punct/g,jl).getRegex(),kf=at("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Fl).replace(/punctSpace/g,Jo).replace(/punct/g,Ds).getRegex(),$f=at(/\\(punct)/,"gu").replace(/punct/g,Ds).getRegex(),xf=at(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Af=at(Xo).replace("(?:-->|$)","-->").getRegex(),Sf=at("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Af).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Ls=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Ef=at(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Ls).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Wl=at(/^!?\[(label)\]\[(ref)\]/).replace("label",Ls).replace("ref",Zo).getRegex(),zl=at(/^!?\[(ref)\](?:\[\])?/).replace("ref",Zo).getRegex(),Tf=at("reflink|nolink(?!\\()","g").replace("reflink",Wl).replace("nolink",zl).getRegex(),Cl=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,ea={_backpedal:Mn,anyPunctuation:$f,autolink:xf,blockSkip:bf,br:ql,code:pf,del:Mn,emStrongLDelim:hf,emStrongRDelimAst:vf,emStrongRDelimUnd:kf,escape:df,link:Ef,nolink:zl,punctuation:_f,reflink:Wl,reflinkSearch:Tf,tag:Sf,text:ff,url:Mn},Cf={...ea,link:at(/^!?\[(label)\]\((.*?)\)/).replace("label",Ls).getRegex(),reflink:at(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Ls).getRegex()},zo={...ea,emStrongRDelimAst:wf,emStrongLDelim:yf,url:at(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Cl).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:at(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Cl).getRegex()},Rf={...zo,br:at(ql).replace("{2,}","*").getRegex(),text:at(zo.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Rs={normal:Qo,gfm:cf,pedantic:uf},In={normal:ea,gfm:zo,breaks:Rf,pedantic:Cf},If={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Rl=e=>If[e];function br(e,t){if(t){if(Ot.escapeTest.test(e))return e.replace(Ot.escapeReplace,Rl)}else if(Ot.escapeTestNoEncode.test(e))return e.replace(Ot.escapeReplaceNoEncode,Rl);return e}function Il(e){try{e=encodeURI(e).replace(Ot.percentDecode,"%")}catch{return null}return e}function Ll(e,t){let r=e.replace(Ot.findPipe,(o,a,c)=>{let u=!1,d=a;for(;--d>=0&&c[d]==="\\";)u=!u;return u?"|":" |"}),n=r.split(Ot.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(Ot.slashPipe,"|");return n}function Ln(e,t,r){let n=e.length;if(n===0)return"";let s=0;for(;s<n;){let o=e.charAt(n-s-1);if(o===t&&!r)s++;else if(o!==t&&r)s++;else break}return e.slice(0,n-s)}function Lf(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return r>0?-2:-1}function Ol(e,t,r,n,s){let o=t.href,a=t.title||null,c=e[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let u={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:a,text:c,tokens:n.inlineTokens(c)};return n.state.inLink=!1,u}function Of(e,t,r){let n=e.match(r.other.indentCodeCompensation);if(n===null)return t;let s=n[1];return t.split(`
`).map(o=>{let a=o.match(r.other.beginningSpace);if(a===null)return o;let[c]=a;return c.length>=s.length?o.slice(s.length):o}).join(`
`)}var Os=class{constructor(e){ct(this,"options");ct(this,"rules");ct(this,"lexer");this.options=e||Wr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:Ln(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],n=Of(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let n=Ln(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Ln(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=Ln(t[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let a=!1,c=[],u;for(u=0;u<r.length;u++)if(this.rules.other.blockquoteStart.test(r[u]))c.push(r[u]),a=!0;else if(!a)c.push(r[u]);else break;r=r.slice(u);let d=c.join(`
`),p=d.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${d}`:d,s=s?`${s}
${p}`:p;let f=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(p,o,!0),this.lexer.state.top=f,r.length===0)break;let h=o.at(-1);if(h?.type==="code")break;if(h?.type==="blockquote"){let A=h,S=A.raw+`
`+r.join(`
`),O=this.blockquote(S);o[o.length-1]=O,n=n.substring(0,n.length-A.raw.length)+O.raw,s=s.substring(0,s.length-A.text.length)+O.text;break}else if(h?.type==="list"){let A=h,S=A.raw+`
`+r.join(`
`),O=this.list(S);o[o.length-1]=O,n=n.substring(0,n.length-h.raw.length)+O.raw,s=s.substring(0,s.length-A.raw.length)+O.raw,r=S.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),a=!1;for(;e;){let u=!1,d="",p="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;d=t[0],e=e.substring(d.length);let f=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,O=>" ".repeat(3*O.length)),h=e.split(`
`,1)[0],A=!f.trim(),S=0;if(this.options.pedantic?(S=2,p=f.trimStart()):A?S=t[1].length+1:(S=t[2].search(this.rules.other.nonSpaceChar),S=S>4?1:S,p=f.slice(S),S+=t[1].length),A&&this.rules.other.blankLine.test(h)&&(d+=h+`
`,e=e.substring(h.length+1),u=!0),!u){let O=this.rules.other.nextBulletRegex(S),U=this.rules.other.hrRegex(S),ee=this.rules.other.fencesBeginRegex(S),Q=this.rules.other.headingBeginRegex(S),P=this.rules.other.htmlBeginRegex(S);for(;e;){let D=e.split(`
`,1)[0],L;if(h=D,this.options.pedantic?(h=h.replace(this.rules.other.listReplaceNesting,"  "),L=h):L=h.replace(this.rules.other.tabCharGlobal,"    "),ee.test(h)||Q.test(h)||P.test(h)||O.test(h)||U.test(h))break;if(L.search(this.rules.other.nonSpaceChar)>=S||!h.trim())p+=`
`+L.slice(S);else{if(A||f.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||ee.test(f)||Q.test(f)||U.test(f))break;p+=`
`+h}!A&&!h.trim()&&(A=!0),d+=D+`
`,e=e.substring(D.length+1),f=L.slice(S)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(d)&&(a=!0)),s.items.push({type:"list_item",raw:d,task:!!this.options.gfm&&this.rules.other.listIsTask.test(p),loose:!1,text:p,tokens:[]}),s.raw+=d}let c=s.items.at(-1);if(c)c.raw=c.raw.trimEnd(),c.text=c.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let u of s.items){if(this.lexer.state.top=!1,u.tokens=this.lexer.blockTokens(u.text,[]),u.task){if(u.text=u.text.replace(this.rules.other.listReplaceTask,""),u.tokens[0]?.type==="text"||u.tokens[0]?.type==="paragraph"){u.tokens[0].raw=u.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),u.tokens[0].text=u.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let p=this.lexer.inlineQueue.length-1;p>=0;p--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[p].src)){this.lexer.inlineQueue[p].src=this.lexer.inlineQueue[p].src.replace(this.rules.other.listReplaceTask,"");break}}let d=this.rules.other.listTaskCheckbox.exec(u.raw);if(d){let p={type:"checkbox",raw:d[0]+" ",checked:d[0]!=="[ ]"};u.checked=p.checked,s.loose?u.tokens[0]&&["paragraph","text"].includes(u.tokens[0].type)&&"tokens"in u.tokens[0]&&u.tokens[0].tokens?(u.tokens[0].raw=p.raw+u.tokens[0].raw,u.tokens[0].text=p.raw+u.tokens[0].text,u.tokens[0].tokens.unshift(p)):u.tokens.unshift({type:"paragraph",raw:p.raw,text:p.raw,tokens:[p]}):u.tokens.unshift(p)}}if(!s.loose){let d=u.tokens.filter(f=>f.type==="space"),p=d.length>0&&d.some(f=>this.rules.other.anyLine.test(f.raw));s.loose=p}}if(s.loose)for(let u of s.items){u.loose=!0;for(let d of u.tokens)d.type==="text"&&(d.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:n,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=Ll(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let a of n)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<r.length;a++)o.header.push({text:r[a],tokens:this.lexer.inline(r[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(Ll(a,o.header.length).map((c,u)=>({text:c,tokens:this.lexer.inline(c),header:!1,align:o.align[u]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=Ln(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=Lf(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let n=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),Ol(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return Ol(r,s,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,a,c=s,u=0,d=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+s);(n=d.exec(t))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(a=[...o].length,n[3]||n[4]){c+=a;continue}else if((n[5]||n[6])&&s%3&&!((s+a)%3)){u+=a;continue}if(c-=a,c>0)continue;a=Math.min(a,a+c+u);let p=[...n[0]][0].length,f=e.slice(0,s+n.index+p+a);if(Math.min(s,a)%2){let A=f.slice(1,-1);return{type:"em",raw:f,text:A,tokens:this.lexer.inlineTokens(A)}}let h=f.slice(2,-2);return{type:"strong",raw:f,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,n;return t[2]==="@"?(r=t[1],n="mailto:"+r):(r=t[1],n=r),{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,n;if(t[2]==="@")r=t[0],n="mailto:"+r;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);r=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},er=class Ho{constructor(t){ct(this,"tokens");ct(this,"options");ct(this,"state");ct(this,"inlineQueue");ct(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Wr,this.options.tokenizer=this.options.tokenizer||new Os,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:Ot,block:Rs.normal,inline:In.normal};this.options.pedantic?(r.block=Rs.pedantic,r.inline=In.pedantic):this.options.gfm&&(r.block=Rs.gfm,this.options.breaks?r.inline=In.breaks:r.inline=In.gfm),this.tokenizer.rules=r}static get rules(){return{block:Rs,inline:In}}static lex(t,r){return new Ho(r).lex(t)}static lexInline(t,r){return new Ho(r).inlineTokens(t)}lex(t){t=t.replace(Ot.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,r=[],n=!1){for(this.options.pedantic&&(t=t.replace(Ot.tabCharGlobal,"    ").replace(Ot.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,r))?(t=t.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=r.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
`:r.push(s);continue}if(s=this.tokenizer.code(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(s=this.tokenizer.fences(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.heading(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.hr(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.blockquote(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.list(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.html(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.def(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.raw,this.inlineQueue.at(-1).src=a.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},r.push(s));continue}if(s=this.tokenizer.table(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.lheading(t)){t=t.substring(s.raw.length),r.push(s);continue}let o=t;if(this.options.extensions?.startBlock){let a=1/0,c=t.slice(1),u;this.options.extensions.startBlock.forEach(d=>{u=d.call({lexer:this},c),typeof u=="number"&&u>=0&&(a=Math.min(a,u))}),a<1/0&&a>=0&&(o=t.substring(0,a+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let a=r.at(-1);n&&a?.type==="paragraph"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s),n=o.length!==t.length,t=t.substring(s.raw.length);continue}if(s=this.tokenizer.text(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,r}inline(t,r=[]){return this.inlineQueue.push({src:t,tokens:r}),r}inlineTokens(t,r=[]){let n=t,s=null;if(this.tokens.links){let u=Object.keys(this.tokens.links);if(u.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)u.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let a=!1,c="";for(;t;){a||(c=""),a=!1;let u;if(this.options.extensions?.inline?.some(p=>(u=p.call({lexer:this},t,r))?(t=t.substring(u.raw.length),r.push(u),!0):!1))continue;if(u=this.tokenizer.escape(t)){t=t.substring(u.raw.length),r.push(u);continue}if(u=this.tokenizer.tag(t)){t=t.substring(u.raw.length),r.push(u);continue}if(u=this.tokenizer.link(t)){t=t.substring(u.raw.length),r.push(u);continue}if(u=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(u.raw.length);let p=r.at(-1);u.type==="text"&&p?.type==="text"?(p.raw+=u.raw,p.text+=u.text):r.push(u);continue}if(u=this.tokenizer.emStrong(t,n,c)){t=t.substring(u.raw.length),r.push(u);continue}if(u=this.tokenizer.codespan(t)){t=t.substring(u.raw.length),r.push(u);continue}if(u=this.tokenizer.br(t)){t=t.substring(u.raw.length),r.push(u);continue}if(u=this.tokenizer.del(t)){t=t.substring(u.raw.length),r.push(u);continue}if(u=this.tokenizer.autolink(t)){t=t.substring(u.raw.length),r.push(u);continue}if(!this.state.inLink&&(u=this.tokenizer.url(t))){t=t.substring(u.raw.length),r.push(u);continue}let d=t;if(this.options.extensions?.startInline){let p=1/0,f=t.slice(1),h;this.options.extensions.startInline.forEach(A=>{h=A.call({lexer:this},f),typeof h=="number"&&h>=0&&(p=Math.min(p,h))}),p<1/0&&p>=0&&(d=t.substring(0,p+1))}if(u=this.tokenizer.inlineText(d)){t=t.substring(u.raw.length),u.raw.slice(-1)!=="_"&&(c=u.raw.slice(-1)),a=!0;let p=r.at(-1);p?.type==="text"?(p.raw+=u.raw,p.text+=u.text):r.push(u);continue}if(t){let p="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(p);break}else throw new Error(p)}}return r}},Ms=class{constructor(e){ct(this,"options");ct(this,"parser");this.options=e||Wr}space(e){return""}code({text:e,lang:t,escaped:r}){let n=(t||"").match(Ot.notSpaceStart)?.[0],s=e.replace(Ot.endingNewline,"")+`
`;return n?'<pre><code class="language-'+br(n)+'">'+(r?s:br(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:br(s,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,r=e.start,n="";for(let a=0;a<e.items.length;a++){let c=e.items[a];n+=this.listitem(c)}let s=t?"ol":"ul",o=t&&r!==1?' start="'+r+'"':"";return"<"+s+o+`>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${br(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let n=this.parser.parseInline(r),s=Il(e);if(s===null)return n;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+br(t)+'"'),o+=">"+n+"</a>",o}image({href:e,title:t,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=Il(e);if(s===null)return br(r);e=s;let o=`<img src="${e}" alt="${r}"`;return t&&(o+=` title="${br(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:br(e.text)}},ta=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},tr=class Go{constructor(t){ct(this,"options");ct(this,"renderer");ct(this,"textRenderer");this.options=t||Wr,this.options.renderer=this.options.renderer||new Ms,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new ta}static parse(t,r){return new Go(r).parse(t)}static parseInline(t,r){return new Go(r).parseInline(t)}parse(t){let r="";for(let n=0;n<t.length;n++){let s=t[n];if(this.options.extensions?.renderers?.[s.type]){let a=s,c=this.options.extensions.renderers[a.type].call({parser:this},a);if(c!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){r+=c||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}parseInline(t,r=this.renderer){let n="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let c=this.options.extensions.renderers[o.type].call({parser:this},o);if(c!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=c||"";continue}}let a=o;switch(a.type){case"escape":{n+=r.text(a);break}case"html":{n+=r.html(a);break}case"link":{n+=r.link(a);break}case"image":{n+=r.image(a);break}case"checkbox":{n+=r.checkbox(a);break}case"strong":{n+=r.strong(a);break}case"em":{n+=r.em(a);break}case"codespan":{n+=r.codespan(a);break}case"br":{n+=r.br(a);break}case"del":{n+=r.del(a);break}case"text":{n+=r.text(a);break}default:{let c='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return n}},Is,On=(Is=class{constructor(e){ct(this,"options");ct(this,"block");this.options=e||Wr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?er.lex:er.lexInline}provideParser(){return this.block?tr.parse:tr.parseInline}},ct(Is,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),ct(Is,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Is),Mf=class{constructor(...e){ct(this,"defaults",Vo());ct(this,"options",this.setOptions);ct(this,"parse",this.parseMarkdown(!0));ct(this,"parseInline",this.parseMarkdown(!1));ct(this,"Parser",tr);ct(this,"Renderer",Ms);ct(this,"TextRenderer",ta);ct(this,"Lexer",er);ct(this,"Tokenizer",Os);ct(this,"Hooks",On);this.use(...e)}walkTokens(e,t){let r=[];for(let n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)r=r.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,t));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);r=r.concat(this.walkTokens(a,t))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let c=s.renderer.apply(this,a);return c===!1&&(c=o.apply(this,a)),c}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),n.extensions=t),r.renderer){let s=this.defaults.renderer||new Ms(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,c=r.renderer[a],u=s[a];s[a]=(...d)=>{let p=c.apply(s,d);return p===!1&&(p=u.apply(s,d)),p||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new Os(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,c=r.tokenizer[a],u=s[a];s[a]=(...d)=>{let p=c.apply(s,d);return p===!1&&(p=u.apply(s,d)),p}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new On;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,c=r.hooks[a],u=s[a];On.passThroughHooks.has(o)?s[a]=d=>{if(this.defaults.async&&On.passThroughHooksRespectAsync.has(o))return(async()=>{let f=await c.call(s,d);return u.call(s,f)})();let p=c.call(s,d);return u.call(s,p)}:s[a]=(...d)=>{if(this.defaults.async)return(async()=>{let f=await c.apply(s,d);return f===!1&&(f=await u.apply(s,d)),f})();let p=c.apply(s,d);return p===!1&&(p=u.apply(s,d)),p}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(a){let c=[];return c.push(o.call(this,a)),s&&(c=c.concat(s.call(this,a))),c}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return er.lex(e,t??this.defaults)}parser(e,t){return tr.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,c=await(s.hooks?await s.hooks.provideLexer():e?er.lex:er.lexInline)(a,s),u=s.hooks?await s.hooks.processAllTokens(c):c;s.walkTokens&&await Promise.all(this.walkTokens(u,s.walkTokens));let d=await(s.hooks?await s.hooks.provideParser():e?tr.parse:tr.parseInline)(u,s);return s.hooks?await s.hooks.postprocess(d):d})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?er.lex:er.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let c=(s.hooks?s.hooks.provideParser():e?tr.parse:tr.parseInline)(a,s);return s.hooks&&(c=s.hooks.postprocess(c)),c}catch(a){return o(a)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+br(r.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(r);throw r}}},Ur=new Mf;function it(e,t){return Ur.parse(e,t)}it.options=it.setOptions=function(e){return Ur.setOptions(e),it.defaults=Ur.defaults,Ml(it.defaults),it};it.getDefaults=Vo;it.defaults=Wr;it.use=function(...e){return Ur.use(...e),it.defaults=Ur.defaults,Ml(it.defaults),it};it.walkTokens=function(e,t){return Ur.walkTokens(e,t)};it.parseInline=Ur.parseInline;it.Parser=tr;it.parser=tr.parse;it.Renderer=Ms;it.TextRenderer=ta;it.Lexer=er;it.lexer=er.lex;it.Tokenizer=Os;it.Hooks=On;it.parse=it;var ch=it.options,uh=it.setOptions,dh=it.use,ph=it.walkTokens,fh=it.parseInline;var _h=tr.parse,mh=er.lex;function Tr(e){let t=it.parse(e),r=Sl.sanitize(t);return El(r)}function hr(e,t){return i`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function dn(e){return e.loading?i`<div class="prompt-block__status">불러오는 중…</div>`:e.error?i`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Ns(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())} ${r(t.getHours())}:${r(t.getMinutes())}`}var Pf={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Df={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},Nf=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,qf=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function lr(e){return!!e&&typeof e=="object"}function ra(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function Hl(e,t){let r=ra(e),n=ra(t),s=new Map;for(let c of r)s.set(c,(s.get(c)||0)+1);let o=0;for(let c of n){let u=s.get(c)||0;u>0?s.set(c,u-1):o+=1}let a=0;for(let c of s.values())a+=c;return{added:o,removed:a}}function Ff(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>lr(s)&&typeof s.text=="string"?s.text:"").join(""):lr(e)&&typeof e.text=="string"&&(t=e.text);let n=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function jf(e){let t=String(e.name||""),r=e.input||{},n={kind:"tool",tool:t,icon:Pf[t]||"\u{1F527}",input:r,expandable:!0};if((t==="Read"||t==="Write")&&(n.path=String(r.file_path||r.path||"")),t==="Write"&&(n.added=ra(r.content).length),t==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=Hl(r.old_string,r.new_string);n.added=s,n.removed=o}if(t==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,a=Array.isArray(r.edits)?r.edits:[];for(let c of a){let u=Hl(lr(c)?c.old_string:"",lr(c)?c.new_string:"");s+=u.added,o+=u.removed}n.added=s,n.removed=o}return t==="Bash"&&(n.command=String(r.command||"")),(t==="Grep"||t==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function na(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function sa(e){let t=e.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=Nf.exec(t);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:t.trim()}:qf.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Bf(e,t){if(e.type==="assistant"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(lr(o)){if(o.type==="text"&&typeof o.text=="string")s.push(sa(o.text));else if(o.type==="thinking"){let a=na(o.thinking);a&&s.push(a)}else if(o.type==="tool_use"){let a=jf(o);typeof o.id=="string"&&t.set(o.id,a),s.push(a)}}return s}if(e.type==="user"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(lr(s)&&s.type==="tool_result"){let o=t.get(String(s.tool_use_id));if(o){let a=Ff(s.content);o.result=a,o.output=typeof s.content=="string"?s.content:a}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success";return[{kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""}]}return[]}function Uf(e){if(e.type==="item.completed"&&lr(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[sa(t.text)];if(t.type==="reasoning"){let r=na(t.text);return r?[r]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Wf(e){if(e.schema!=="codex-delegation-monitor-v1"||!lr(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&lr(t.item)){let r=t.item;if(typeof r.id!="string"||r.id.length===0)return[];if(t.type==="item.completed"&&r.kind==="agent_message"&&typeof r.text=="string"&&r.text.trim().length>0)return[sa(r.text)];if(t.type==="item.completed"&&r.kind==="reasoning"){let c=na(r.text);return c?[c]:[]}if(r.kind!=="activity"||typeof r.activity!="string")return[];let n=Df[r.activity];if(!n)return[];let s="\uC2DC\uC791",o="\u2026",a={kind:"tool",tool:"",icon:o,expandable:!1};if(t.type==="item.completed"){if(r.status==="completed")s="\uC644\uB8CC",o="\u2713";else if(r.status==="failed")s="\uC2E4\uD328",o="\u2717";else return[];a.result=""}return a.tool=`${n} \xB7 ${s}`,a.icon=o,[a]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function zf(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Gl(e){let t=[],r=new Map,n=Array.isArray(e)?e:[];for(let s of n){let o=s;if(typeof s=="string"){let c=s.trim();if(c.length===0)continue;try{o=JSON.parse(c)}catch{continue}}if(!lr(o))continue;let a=o.schema==="codex-delegation-monitor-v1"?Wf(o):zf(o)?Uf(o):Bf(o,r);for(let c of a)t.push(c)}return t}var Hf=5,Gf=10,Vf=/Task\s+#(\d+)/,Kf=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Yf=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function qs(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Zf(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function Xf(e){for(let t=e.length-1;t>=0;t-=1){let r=e[t];if(r.kind==="phase"||r.kind==="gate")return r.text||null}return null}function Qf(e){let t=new Map,r=0;for(let s of e){if(s.kind!=="tool")continue;r+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let u=Vf.exec(s.output||s.result||""),d=String(o.activeForm||o.subject||"").trim();if(!u||d.length===0)continue;t.set(u[1],{label:d,active:o.status==="in_progress"?r:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let c=o.activeForm||o.subject;typeof c=="string"&&c.trim().length>0&&(a.label=c.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?r:0)}let n=null;for(let s of t.values())s.active>0&&(!n||s.active>n.active)&&(n=s);return n?n.label:null}function Jf(e){if(e.tool==="Bash"){let t=e.command||"";return Kf.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Yf.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function e_(e){let t=e.filter(s=>s.kind==="tool").slice(-Gf),r=new Map;t.forEach((s,o)=>{let a=Jf(s);if(!a)return;let c=r.get(a)||{count:0,last:-1};c.count+=1,c.last=o,r.set(a,c)});let n=null;for(let[s,o]of r)(!n||o.count>n.count||o.count===n.count&&o.last>n.last)&&(n={label:s,count:o.count,last:o.last});return n?n.label:null}function t_(e){let t=Xf(e);if(t)return{text:t,guess:!1};let r=Qf(e);if(r)return{text:r,guess:!1};let n=e_(e);return n?{text:n,guess:!0}:null}function r_(e,t){if(typeof e!="number")return"";let r=Math.max(0,Math.floor((t-e)/1e3));return r<60?`${r}\uCD08 \uC804`:qt(e,t)}function Fs(e,t={}){let{transport:r,sessionLogStore:n,onClose:s}=t,o=null,a=null,c=null,u=!1,d={},p=!0,f=new Set,h=new Set,A=null,S=null,O=!1,U=!1,ee=!1,Q=null,P=null;function D(){O=!1,U=!1,ee=!1,Q=null,P=null}async function L(Y){if(r){U=!0,ee=!1,he();try{let W=await Promise.resolve(r("get-attempt-prompt",{attempt_id:Y}));if(o!==Y)return;!W||typeof W!="object"||Array.isArray(W)?ee=!0:(Q=W,P=Y)}catch{o===Y&&(ee=!0)}finally{o===Y&&(U=!1,he())}}}function B(){if(O=!O,O&&o&&P!==o){L(o);return}he()}function m(){if(!O)return"";let Y=dn({loading:U,error:ee});if(Y)return i`<div class="sv__prompt" data-seam="attempt-prompt">
        ${Y}
      </div>`;if(!Q)return"";if(Q.missing)return i`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let W=Ns(Q.recorded_at);return i`<div class="sv__prompt" data-seam="attempt-prompt">
      ${W?i`<div class="prompt-block__meta">${W} 발송</div>`:""}
      ${typeof Q.task_prompt=="string"?hr("\uACFC\uC5C5 (user)",Q.task_prompt):""}
      ${typeof Q.system_prompt=="string"?hr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",Q.system_prompt):""}
    </div>`}function R(){if(!c||!n)return[];let Y=n.get(c);return Gl(Y?Y.lines:[])}function H(){if(!c||!n)return null;let Y=n.get(c),W=Y?Y.last_event_at:null;return typeof W=="number"?W:null}function se(){return d.status==="running"}function M(){if(se()&&o){S||(S=setInterval(()=>he(),1e3));return}q()}function q(){S&&(clearInterval(S),S=null)}function de(Y){let W=[],oe=0;for(;oe<Y.length;){let Oe=Y[oe];if(Oe.kind==="tool"){let ze=oe;for(;ze<Y.length&&Y[ze].kind==="tool"&&Y[ze].tool===Oe.tool;)ze+=1;if(ze-oe>=Hf&&!h.has(oe)){W.push({kind:"group",idx:oe,tool:Oe.tool||"",lines:Y.slice(oe,ze).map((Ve,Ie)=>({idx:oe+Ie,line:Ve}))}),oe=ze;continue}}W.push({kind:"line",idx:oe,line:Oe}),oe+=1}return W}function ge(Y){for(let W=Y.length-1;W>=0;W-=1){let oe=Y[W];if(oe.kind==="result"||oe.kind==="error")return null;if(oe.kind==="tool"&&!Object.hasOwn(oe,"result"))return oe}return null}function pe(Y){for(let W=Y.length-1;W>=0;W-=1)if(Y[W].kind==="thinking")return Y[W];return null}function Fe(Y,W){if(W.kind==="gate")return i`<div class="sv__gate">${W.text}</div>`;if(W.kind==="phase")return i`<div class="sv__phase">${W.text}</div>`;if(W.kind==="result")return i`<div
        class="sv__result${W.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${W.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${Tr(W.text||(W.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(W.kind==="thinking"){let oe=f.has(Y);return i`<div
        class="sv__think${oe?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Re(Y)}
      >
        <span class="sv__think-line">💭 ${qs(W.text)}</span>
        ${oe?i`<pre class="sv__think-expand">${W.text}</pre>`:""}
      </div>`}if(W.kind==="error")return i`<div class="sv__error">⛔ ${W.text}</div>`;if(W.kind==="blocker")return i`<div class="sv__error">⛔ ${W.text}</div>`;if(W.kind==="tool"){let oe=f.has(Y),Oe=W.tool==="Bash"?Zf(W.command):0,ze=W.tool==="Bash"?Oe>1?qs(W.command):W.command:W.path||W.command||"";return i`<div
        class="sv__tool${oe?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>Re(Y)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${W.icon}</span>
          <span class="sv__tool-name">${W.tool}</span>
          ${ze?i`<span class="sv__tool-detail">${ze}</span>`:""}
          ${Oe>1?i`<span class="sv__tool-more">⋯ ${Oe}줄</span>`:""}
          ${typeof W.added=="number"?i`<span class="sv__diff-add">+${W.added}</span>`:""}
          ${typeof W.removed=="number"?i`<span class="sv__diff-del">−${W.removed}</span>`:""}
          ${W.result?i`<span class="sv__tool-ok">→ ${W.result}</span>`:""}
        </span>
        ${oe?i`<pre class="sv__tool-expand">${rt(W)}</pre>`:""}
      </div>`}return i`<div class="sv__as">${Tr(W.text||"")}</div>`}function rt(Y){let W=[];if(Y.tool==="Bash"&&typeof Y.command=="string"&&Y.command.length>0)W.push(Y.command);else if(Y.input!==void 0)try{W.push(`input: ${JSON.stringify(Y.input,null,2)}`)}catch{}return typeof Y.output=="string"&&Y.output.length>0&&W.push(`output:
${Y.output}`),W.join(`

`)}function Ue(){if(!o)return i``;let Y=R(),W=(a?[d.model,d.effort]:[d.runner,d.model,d.effort]).filter(Boolean).join(" \xB7 "),oe=d.session_id||"",Oe=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${p?"ON":"OFF"}`,ze=se(),Ve=ze?r_(H(),Date.now()):"",Ie=ze?ge(Y):null,lt=ze?pe(Y):null,Qe=t_(Y);return i`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${a?d.role||"":o}</span>
        ${Qe?i`<span
              class="sv__stage${Qe.guess?" sv__stage--guess":""}"
              title=${Qe.text}
              >${Qe.text}</span
            >`:""}
        ${ze?i`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${Ve?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${Ve}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${Ve?i`<span class="sv__live-ago">${Ve}</span>`:""}</span
            >`:""}
        ${oe?i`<button
              type="button"
              class="sv__session"
              title=${oe}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${oe}`}
              @click=${()=>xe(oe)}
            >
              ⧉ ${oe.slice(0,8)}
            </button>`:""}
        ${W?i`<span class="sv__meta">${W}</span>`:""}
        ${d.worktree?i`<span class="sv__wt" title=${d.worktree}
              >${d.worktree}</span
            >`:""}
        ${a||u?"":i`<button
              type="button"
              class="sv__prompt-toggle${O?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${O?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${B}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${p?" sv__follow--on":""}"
          aria-pressed=${p?"true":"false"}
          aria-label=${Oe}
          @click=${je}
        >
          <span class="sv__follow-full">⇣ ${Oe}</span>
          <span class="sv__follow-short">⇣ ${p?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>ot()}
        >
          ✕
        </button>
      </div>
      ${a||u?"":m()}
      <div class="sv__body">
        ${Y.length===0?i`<div class="sv__empty">세션 로그 없음</div>`:de(Y).map(V=>V.kind==="group"?_e(V):Fe(V.idx,V.line))}
      </div>
      ${Ie||lt?i`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${Ie?i`<span class="sv__now-icon">${Ie.icon}</span>
                  <span class="sv__now-name">${Ie.tool}</span>
                  <span class="sv__now-detail"
                    >${Ie.tool==="Bash"?qs(Ie.command):Ie.path||Ie.command||""}</span
                  >`:""}
            ${lt?i`<span class="sv__now-think"
                  >💭 ${qs(lt.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function _e(Y){return i`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>Le(Y.idx)}
    >
      <span class="sv__group-icon">${Y.lines[0].line.icon}</span>
      <span class="sv__group-name">${Y.tool}</span>
      <span class="sv__group-count">${Y.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function Le(Y){h.add(Y),he()}function he(){Ze(Ue(),e),M(),p&&$e()}function $e(){let Y=e.querySelector(".sv__body");Y&&(Y.scrollTop=Y.scrollHeight)}function Re(Y){f.has(Y)?f.delete(Y):f.add(Y),he()}function je(){p=!p,he()}function xe(Y){Xt(Y).then(W=>{W?ie("\uBCF5\uC0AC\uB428","success",1200):ie("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function We(Y){!o||!Y||(d={...d,...Y},he())}function Xe(Y){let W=Y.target;if(!W||!W.classList||!W.classList.contains("sv__body"))return;!(W.scrollHeight-W.scrollTop-W.clientHeight<=4)&&p&&(p=!1,he())}e.addEventListener("scroll",Xe,!0);function Te(Y){let W=Y&&Y.attempt_id;if(!W)return;let oe=c;o=W,a=typeof Y.launch_id=="string"&&Y.launch_id.length>0?Y.launch_id:null,c=a?`session-log:${o}:${a}`:`session-log:${o}`,r&&oe&&oe!==c&&Promise.resolve(r("unsubscribe-session-log",{id:oe})).catch(()=>{}),d=Y.meta||{},u=Y.hide_prompt===!0,p=!0,f.clear(),h.clear(),D(),!A&&n&&(A=n.subscribe(he)),r&&Promise.resolve(r("subscribe-session-log",{id:c,attempt_id:o,...a?{launch_id:a}:{}})).catch(()=>{}),he()}function ot(){let Y=c;o=null,a=null,c=null,u=!1,f.clear(),h.clear(),D(),q(),r&&Y&&Promise.resolve(r("unsubscribe-session-log",{id:Y})).catch(()=>{}),Ze(i``,e),s&&s()}return{open:Te,updateMeta:We,close:ot,isOpen(){return o!==null},destroy(){q(),A&&(A(),A=null),e.removeEventListener("scroll",Xe,!0),o=null,a=null,c=null,u=!1,Ze(i``,e)}}}function js(e){let t=e&&typeof e=="object"?e:{},r=t.metadata&&typeof t.metadata=="object"?t.metadata:{},n=oa(t.spec_id),s=oa(r.spec_id);return n?{path:n,source:"native",conflict:s.length>0&&s!==n}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function oa(e){return typeof e=="string"?e.trim():""}function Vl(e){let t=js(e);if(t.path)return t;let r=oa(n_(e).spec_path);return r?{path:r,source:"draft",conflict:!1}:t}function n_(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}function s_(e){return["plan_review","plan_approval","plan_check"].some(t=>{let r=e[t];return typeof r=="string"&&r.trim().length>0})}function o_(e){let t=e&&e.metadata||{},r=Vl(e),n=[];return r.path&&n.push({kind:"spec",path:r.path,missing_state:r.source==="draft"?"spec_draft":null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&n.push({kind:"plan",path:t.plan_path.trim(),missing_state:s_(t)?null:"plan_pending"}),n}function Kl(e,t){let r=o_(e);return i`
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
                ${n.missing_state==="spec_draft"?i`<span class="detail-art__badge">draft</span>`:null}
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
  `}var a_="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",i_=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,l_=/^\*\*결론\*\* — (.+)$/;function Bs(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==a_)return null;let r=i_.exec(t[1]||"");if(!r)return null;let n=r[1].split(" ")[0],s=r[2],o=r[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let c=a<t.length?l_.exec(t[a]):null,u=c?c[1].replace(/\s+/g," ").trim():"",d=c?a+1:a;return{lane:n,identifier:s,timestamp:o,conclusion:u,body:t.slice(d).join(`
`).trim()}}var Yl=20;function Zl(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let r=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${r}-${n} ${s}:${o}`}function c_(e){return e.length>Yl?`${e.slice(0,Yl)}\u2026`:e}function u_(e,t,r,n){let s=`${t.lane} ${c_(t.identifier)}`;return i`<div class="detail-report">
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
        <span class="detail-report__time">${Zl(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${n&&t.body.length>0?i`<div class="detail-report__body">
          ${Tr(t.body)}
        </div>`:""}
  </div>`}function d_(e){return i`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${Zl(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${Tr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function Xl(e,t={},r={}){let n=Array.isArray(e)?e.filter(Boolean):[],s=r.expanded||new Set,o=typeof r.draft=="string"?r.draft:"",a=r.sending===!0,c=n.slice().sort((u,d)=>String(d.created_at||"").localeCompare(String(u.created_at||"")));return i`
    <div class="detail-section-label">댓글 (${n.length})</div>
    ${r.error?i`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:c.length===0?i`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:i`<div class="detail-comments" data-seam="comments">
            ${c.map(u=>{let d=Bs(typeof u.text=="string"?u.text:"");return d?u_(u,d,t,s.has(u.id)):d_(u)})}
          </div>`}
    <div class="detail-comment-compose">
      <textarea
        class="detail-comment-compose__input"
        aria-label="댓글 추가"
        placeholder="댓글 추가"
        rows="3"
        ?disabled=${a}
        .value=${o}
        @input=${u=>t.onDraftInput&&t.onDraftInput(u.target.value)}
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
  `}var{I:Kh}=vi;var Ql=e=>e.strings===void 0;var p_={},Jl=(e,t=p_)=>e._$AH=t;var zr=Cs(class extends un{constructor(e){if(super(e),e.type!==gr.PROPERTY&&e.type!==gr.ATTRIBUTE&&e.type!==gr.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Ql(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===Ut||t===ht)return t;let r=e.element,n=e.name;if(e.type===gr.PROPERTY){if(t===r[n])return Ut}else if(e.type===gr.BOOLEAN_ATTRIBUTE){if(!!t===r.hasAttribute(n))return Ut}else if(e.type===gr.ATTRIBUTE&&r.getAttribute(n)===t+"")return Ut;return Jl(e),t}});var Us=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],f_=[...Us.filter(e=>e!=="impl_dispatch"),"quick_fix_impl_model"],Cr=["orchestration_model","orchestration_effort","orchestration_speed"],ec=[...Us,...Cr],tc=["delegated","main"],Ws=["inherit","claude","codex"],Dn=["default","fast"],Nn=["standard","fast_track"],qn=["codex","opus","fable","self","skip"],zs=["codex","fable","skip"],Hs=["low","medium","high","xhigh"],rr="auto";function yr(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function rc(e){if(!yr(e)||!yr(e.runners))return[];let t=[];for(let[r,n]of Object.entries(e.runners))yr(n)&&yr(n.models)&&t.push([r,Object.keys(n.models)]);return t}function Fn(e,t){let r=rc(e),n=t&&t!=="inherit"?r.filter(([s])=>s===t):r;return[rr,...n.flatMap(([,s])=>s)]}function pn(e,t,r){if(!yr(e)||!yr(e.runners))return[rr];let n=[];for(let[s,o]of Object.entries(e.runners))if(!(!yr(o)||!yr(o.models))&&!(t&&t!=="inherit"&&s!==t))for(let[a,c]of Object.entries(o.models)){if(r&&r!==rr&&a!==r)continue;let u=yr(c)?c.efforts:null;if(Array.isArray(u))for(let d of u)typeof d=="string"&&!n.includes(d)&&n.push(d)}return[rr,...n]}function Gs(e,t){let r=rc(e);return(t?r.filter(([s])=>s===t):r).flatMap(([,s])=>s)}function aa(e,t,r,n,s,o){return $s({key:e,choices:t,layer:"global",global:r,resolution_global:o,execution_defaults:n,runner_catalog:s})}function nc(e,t){let r={};for(let n of f_){let s=e?.[n],o=t?.[n];s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}function sc(e,t){let r={};for(let n of Cr){let s=e?.[n]??null,o=t?.[n]??null;s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}var ia=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Cr]}],la={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},oc={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function ca(e,t,r,n,s,o=null){let a=on({pin:t,global:r,execution_defaults:n,runner_catalog:s,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:o});return e.map(c=>({key:c,...a[c]}))}function ac(e,t,r,n,s,o=null){let a={pin:0,global:0,base:0};for(let c of ca(e,t,r,n,s,o))a[c.source]+=1;return a}function ic(e,t,r){return{id:e,key:t,value:typeof r=="string"?r:""}}function lc(e,t,r){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:r}}var oy=[...Us,...Cr];var __=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review"},{id:"impl",label:"\uAD6C\uD604",receipt:null},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review"},{id:"pr",label:"PR",receipt:null}],m_={pin:"pin",global:"global",base:"base"};function g_(e){return i`<span
    class=${`detail-layer-rail detail-layer-rail--${m_[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function b_(e,t,r){switch(e){case"workflow_mode":return Nn;case"spec_review_model":case"impl_review_model":return qn;case"plan_review_model":return zs;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return Hs;case"impl_dispatch":return tc;case"impl_runtime":return Ws;case"impl_model":return Fn(r,t.impl_runtime);case"impl_effort":return pn(r,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return Dn;case"orchestration_model":return Gs(r,null);case"orchestration_effort":return pn(r,void 0,t.orchestration_model||rr).filter(n=>n!==rr);default:return[]}}function h_(e,t){return i`<div class="detail-effective__row" data-key=${e.key}>
    ${g_(e.source)}
    <span class="detail-effective__k"
      >${la[e.key]||e.key}</span
    >
    <span
      class=${`detail-effective__v${e.source==="base"?" detail-effective__v--dim":""}`}
      title=${e.full_value||""}
      >${e.display}</span
    >
    <span
      class=${`detail-effective__badge detail-effective__badge--${e.source}`}
      >${oc[e.source]}</span
    >
    ${t.expanded?i`<select
          class="detail-effective__edit"
          data-edit-key=${e.key}
          aria-label=${`${la[e.key]||e.key} \uD3B8\uC9D1`}
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
          ${t.options.map(r=>i`<option
                value=${r.value}
                title=${r.full_value||""}
                ?selected=${e.source==="pin"&&e.value===r.value}
              >
                ${r.label}
              </option>`)}
        </select>`:""}
  </div>`}function cc(e,t){let r=ia.flatMap(u=>u.keys),n=ca(r,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=ac(r,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Object.fromEntries(n.map(u=>[u.key,u])),a=Object.fromEntries(n.filter(u=>u.value!==null).map(u=>[u.key,u.value])),c=n.filter(u=>u.full_value&&u.display!==u.full_value).map(u=>u.full_value).join(" \xB7 ");return i`<details
    class=${`detail-effective${e.expanded?" detail-effective--open":""}`}
    data-seam="effective-settings"
    ?open=${e.expanded}
    @toggle=${u=>t.onToggle(u.currentTarget.open)}
  >
    <summary
      class="detail-effective__head"
      data-seam="effective-settings-toggle"
      @click=${u=>{u.preventDefault();let d=u.currentTarget.parentElement;t.onToggle(!d.open)}}
    >
      <span class="detail-effective__t">유효 실행 설정</span>
      <span class="detail-effective__summary" title=${c}
        >${y_(o)}</span
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
    ${e.expanded?i`<div class="detail-effective__body">
          ${ia.map(u=>i`
              <div class="detail-effective__subhead">${u.label}</div>
              ${n.filter(d=>u.keys.includes(d.key)).map(d=>{let p=$s({key:d.key,choices:b_(d.key,a,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return h_(d,{expanded:e.expanded,options:p.options,default_label:p.unset_label,default_full_value:p.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="실행 프리셋"
              .value=${zr(e.preset_id)}
              ?disabled=${e.preset_busy}
              @change=${u=>t.onPresetSelect(String(u.target.value))}
            >
              <option value="" ?selected=${e.preset_id===""}>
                실행 프리셋…
              </option>
              ${e.presets.map(u=>i`<option
                    value=${u.id}
                    ?selected=${u.id===e.preset_id}
                  >
                    ${u.name}${u.compatible===!1?" (\uBE44\uD638\uD658)":""}
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
            ${(e.skipped_orchestration_keys||[]).length>0?i`<span
                  class="detail-effective__hint"
                  data-preset-skip-notice
                  >오케스트레이션 3키는 Bead에 핀할 수 없어 건너뜀</span
                >`:""}
          </div>
        </div>`:""}
  </details>`}function y_(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let r=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${r}`)}for(let r of["impl_model","impl_effort","impl_speed"])e[r]?.resolution!=="not_applicable"&&t.push(e[r]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function v_(e){if(!e||typeof e!="object")return null;let{kind:t,actor:r,effort:n,sha:s}=e;return typeof t!="string"||typeof r!="string"||typeof s!="string"?null:{kind:t,actor:r,effort:typeof n=="string"?n:null,sha:s}}function uc(e){let t=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},n=r.stages||{},s=r.route||t.route||null,o=typeof t.pr_url=="string"?t.pr_url:"",a=typeof t.exec_receipt=="string"?t.exec_receipt:"",c=v_(r.exec_receipt),u=c?Br(c):a,d=c?`${c.kind}:${c.actor}`:a.split("@")[0],p=ws(r.planned_execution,r.exec_receipt);return i`<section class="detail-summary" data-seam="detail-summary">
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
      ${p?i`<span
            class="detail-summary__chip detail-summary__chip--planned ctl-chip--planned"
            data-kind=${p.kind}
            title=${p.title}
            >${p.label}</span
          >`:""}
      ${u?i`<span
            class="detail-summary__chip detail-summary__chip--receipt"
            title=${u}
            >${d}${c?.effort?i`${" "}<span
                    class="detail-summary__chip-effort"
                    data-seam="exec-receipt-effort"
                    >${c.effort}</span
                  >`:""}</span
          >`:""}
    </div>
    <div class="detail-summary__gates">
      ${__.map(f=>{let h=f.receipt&&typeof t[f.receipt]=="string"?String(t[f.receipt]):"",A=n[f.id],S=h.length>0||A?.fill==="full",O=!S&&A?.fill==="dim",U=A?.stale===!0;return i`<span
          class=${`detail-summary__gate${S?" detail-summary__gate--on":""}${O?" detail-summary__gate--current":""}${U?" detail-summary__gate--stale":""}`}
          data-gate=${f.id}
        >
          <span class="detail-summary__gate-pill">${f.label}</span>
          ${h?i`<span class="detail-summary__gate-sha"
                >${h.split("@")[1]?.slice(0,7)||""}</span
              >`:""}
        </span>`})}
    </div>
  </section>`}var dc=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function jn(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Vs(e){if(!jn(e)||!jn(e.runners))return null;let t=Object.entries(e.runners).filter(([,r])=>jn(r)&&jn(r.models));return t.length>0?t:null}function ua(e,t){let r=Vs(e);if(!r||!t)return null;for(let[n,s]of r)if(Object.hasOwn(s.models,t))return n;return null}function pc(e,t){return jn(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function fc(e,t){let r=Vs(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return pc(n,n.models[t]);return[]}function w_(e){let t=Vs(e);if(!t)return[];let r=[];for(let[,n]of t)for(let s of Object.values(n.models))for(let o of pc(n,s))r.includes(o)||r.push(o);return r}function k_(e,t){if(!t)return w_(e);let n=Vs(e)?.find(([o])=>o===t)?.[1];if(!n)return[];let s=[];for(let o of Object.keys(n.models))for(let a of fc(e,o))s.includes(a)||s.push(a);return s}function _c(e,t,r){let n={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=n.impl_runtime==="inherit"?r:n.impl_runtime==="claude"||n.impl_runtime==="codex"?n.impl_runtime:null;if(n.impl_runtime==="inherit"&&!s)return n.impl_model="",n.impl_effort="",n;let o=ua(t,n.impl_model);if(n.impl_model&&(!s||o!==s))return n.impl_model="",n.impl_effort="",n;let a=n.impl_model?fc(t,n.impl_model):k_(t,s);return n.impl_effort&&a.length>0&&!a.includes(n.impl_effort)&&(n.impl_effort=""),n}function $_(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function mc(e,t){let r=t.getWorkspacePath,n=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",c="";function u(S){S.key==="Escape"&&s&&(S.preventDefault(),h())}document.addEventListener("keydown",u);function d(){return s?i`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>h()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${$_(s)}</span
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
            ${o==="loading"?i`<div class="mv__status">불러오는 중…</div>`:o==="pending"?i`<div class="mv__status">${c}</div>`:o==="error"?i`<div class="mv__status mv__status--error">
                      ${c||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:Tr(a)}
          </div>
        </div>
      </div>
    `:i``}function p(){Ze(d(),e)}async function f(S,O={}){s=S,o="loading",a="",c="",p();let U=r?r():"";if(!U){o="error",c="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",p();return}if(!n){o="error",c="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",p();return}let ee="/api/doc?workspace="+encodeURIComponent(U)+"&path="+encodeURIComponent(S);try{let Q=await n(ee),P=await Q.json().catch(()=>({}));if(!Q.ok||!P||P.ok!==!0){if(P?.error==="not_found"&&O.missing_state==="plan_pending"){o="pending",c="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",p();return}o="error",c="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(P&&P.error||Q.status)+")",p();return}a=String(P.content||""),o="ready",p()}catch{o="error",c="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",p()}}function h(){s=null,Ze(i``,e)}function A(){document.removeEventListener("keydown",u),h()}return{open:f,close:h,destroy:A}}var x_=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],bc="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Ks=["implementation","review-consult"],A_=["running","done","failed","interrupted"],S_={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function E_(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function T_(e){let t=At(e);if(t.length>0)return t.map(s=>i`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let r=ln(e);if(!r||!e)return"";let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return i`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${r.replace(/^τ /,"\u03C4 \uCD1D ")}${n}</span
    >${e.replayed?i`<span class="detail-usage-partial" title=${bc}
          >부분 집계</span
        >`:""}`}function gc(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function da(e){if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?pa(t):""}function C_(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e;return typeof t.launch_id!="string"||t.launch_id.length===0||t.provider!=="codex"||!Ks.includes(t.role)||typeof t.model!="string"||t.model.length===0||!(!("effort"in t)||t.effort===null||typeof t.effort=="string"&&t.effort.trim().length>0)||typeof t.session_id!="string"||t.session_id.length===0||!A_.includes(t.status)||typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))||!(t.turn_id===null||typeof t.turn_id=="string")?null:t}function R_(e,t){let n=At({providers:{codex:{subtotal:t.subtotal,breakdown:t.usage,...t.replayed?{replayed:!0}:{}}},roles:{}})[0];return i`<div class="detail-session__leg detail-session__usage-detail">
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${[t.provider,t.model,t.effort].filter(Boolean).join(" \xB7 ")}</span
    >
    ${t.session_id?i`<span
          class="detail-session__leg-sid detail-session__sid"
          title=${t.session_id}
          >${t.session_id.slice(0,8)}</span
        >`:""}
    ${da(t.completed_at)?i`<span class="detail-session__leg-time detail-session__time"
          >${da(t.completed_at)}</span
        >`:""}
    ${n?i`<span class="detail-session__usage" title=${n.tooltip}
          >${n.label}</span
        >`:""}
  </div>`}function I_(e,t,r,n){let s=e.status==="running"?null:t,a=(s?At({providers:{codex:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],c=e.status==="running"?pa(e.last_event_at):s?da(s.completed_at):"";return i`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>n.onOpenDelegation&&n.onOpenDelegation(r,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${S_[e.status]}</span
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
    ${c?i`<span class="detail-session__leg-time detail-session__time"
          >${c}</span
        >`:""}
    ${a?i`<span class="detail-session__usage" title=${a.tooltip}
          >${a.label}</span
        >`:""}
  </button>`}function L_(e,t){return e.role===t.role&&e.model===t.model&&e.session_id===t.session_id}function O_(e,t,r){let n=[],s=new Set,o=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let p of o){let f=C_(p);!f||s.has(f.launch_id)||(s.add(f.launch_id),n.push(f))}n.sort((p,f)=>p.started_at-f.started_at);let a={implementation:[],"review-consult":[]};if(t)for(let p of Ks){let f=t.roles[p]?.codex;a[p]=f?[...f.legs]:[]}let c=Ks.flatMap(p=>a[p]),u=new Set,d=[];for(let p of Ks){for(let f of n.filter(h=>h.role===p)){let h=c.find(A=>A.receipt_id===f.launch_id)||null;h&&!L_(f,h)||(h&&u.add(h.receipt_id),d.push(I_(f,h,e.attempt_id,r)))}for(let f of a[p])u.has(f.receipt_id)||d.push(R_(p,f))}return d}function M_(e,t){let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,n=[...x_,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return i`<div class="detail-session__usage-detail">
    ${n.map(s=>i`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${E_(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${r===null?"":i`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${r.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?i`<span class="detail-session__usage-note">${bc}</span>`:""}
  </div>`}var P_={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function pa(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=String(t.getHours()).padStart(2,"0"),n=String(t.getMinutes()).padStart(2,"0");return`${r}:${n}`}function D_(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,n])=>typeof n=="string"&&n.length>0).map(([n,s])=>`${n}=${s}`).join(" \xB7 "):"",r=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return i`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${r}</span>
    ${t?i`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function hc(e,t={},r={}){let n=Array.isArray(e)?e:[],s=r.expanded||new Set;if(n.length===0)return i`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let d of n)d&&typeof d.resumed_from=="string"&&d.resumed_from.length>0&&o.add(d.resumed_from);let a=d=>{if(!(d.status==="failed"||d.status==="orphaned"))return"";let f=typeof d.session_id=="string"&&d.session_id.length>0,h=o.has(d.attempt_id),A=f&&!h,S=f?h?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return i`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${d.attempt_id}
      ?disabled=${!A}
      title=${S}
      @click=${O=>{O.stopPropagation(),A&&t.onResume&&t.onResume(d.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},c=d=>{if(!(d.status==="failed"||d.status==="orphaned")||typeof d.cause!="string"||d.cause==="")return"";let f=d.cause_detail,h=f&&typeof f.reason=="string"&&f.reason.length>0?typeof f.command=="string"&&f.command.length>0?`${f.reason} \xB7 ${f.command}`:f.reason:d.cause;return i`<div class="detail-session__cause" title=${h}>
      ${d.cause}
    </div>`},u=d=>{let p=gc(Mo(d));if(At(p).length===0&&!ln(d.usage))return"";let f=s.has(d.attempt_id);return i`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${d.attempt_id}
      aria-expanded=${f?"true":"false"}
      title=${f?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${h=>{h.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(d.attempt_id)}}
    >
      τ 자세히
    </button>`};return i`
    <div class="detail-section-label">
      세션 이력${T_(r.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${n.map(d=>{let p=Mo(d),f=gc(p),h=At(f);return i`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${d.status||"unknown"}"
            data-attempt-id=${d.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(d.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${P_[d.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${d.attempt_id}</span>
            ${Sr(d)?i`<span
                  class="detail-session__resumed"
                  title=${Sr(d)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${ir(d)}</span>
            ${h.length>0?i`<span class="detail-session__role">orchestrator</span>`:""}
            ${d.session_id?i`<span class="detail-session__sid" title=${d.session_id}
                  >${String(d.session_id).slice(0,8)}</span
                >`:""}
            ${h.length>0?h.map(A=>i`<span
                      class="detail-session__usage"
                      title=${A.tooltip}
                      >${A.label}</span
                    >`):ln(d.usage)?i`<span class="detail-session__usage"
                    >${ln(d.usage)}</span
                  >`:""}
            <span class="detail-session__time">${pa(d.started_at)}</span>
          </button>
          ${u(d)} ${a(d)} ${c(d)} ${D_(d)}
          ${s.has(d.attempt_id)&&d.usage?M_(d.usage,d.runner==="codex"?"codex":"claude"):""}
          ${O_(d,p,t)}
        </div>`})}
    </div>
  `}function yc(e,t={}){return i`
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
          ${N_(e)}
        </div>`:""}
  `}function N_(e){let t=dn(e);if(t)return t;let r=e.data;if(!r)return"";if(r.missing)return i`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof r.default_task_prompt=="string"?hr("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",r.default_task_prompt):""}`;let n=Ns(r.recorded_at);return i`<div class="detail-prompt__meta">
      ${r.attempt_id}${n?` \xB7 ${n}`:""}
    </div>
    ${typeof r.task_prompt=="string"?hr("\uACFC\uC5C5 (user)",r.task_prompt):""}
    ${typeof r.system_prompt=="string"?hr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",r.system_prompt):""}`}var q_=["open","in_progress","deferred","resolved","closed"],F_=[0,1,2,3,4];function vc(e,t){let r=t.issueStores,n=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,c=t.execPresetStore,u=t.sessionLogStore,d=null,p=null,f={},h="",A=!1,S=[],O=!1,U={},ee=!1,Q=!1,P="",D="",L="";function B(){ee=!1,Q=!1,P="",D="",L=""}let m=[],R=null,H=null,se=!1,M="",q=!1,de=0,ge=new Set;function pe(){m=[],R=null,H=null,se=!1,M="",q=!1,de+=1,ge.clear()}async function Fe(g){if(!s)return;let I=++de;try{let T=await Promise.resolve(s("get-comments",{id:g}));if(I!==de||g!==d)return;m=Array.isArray(T)?T:[],se=!1}catch{if(I!==de||g!==d)return;se=!0}w()}function rt(){if(!s||!d)return;let g=p&&typeof p.comment_count=="number"?p.comment_count:null;if(R!==d){R=d,H=g,Fe(d);return}g!==null&&g!==H&&(H=g,Fe(d))}function Ue(g){ge.has(g)?ge.delete(g):ge.add(g),w()}function _e(g){let I=M.trim().length===0;M=g,I!==(g.trim().length===0)&&w()}async function Le(){let g=M.trim();if(!s||!d||g.length===0||q)return;let I=d;q=!0,w();let T=!1;try{let ne=await Promise.resolve(s("add-comment",{id:I,text:g}));Array.isArray(ne)&&ne.length>0&&(T=!0,I===d&&(m=ne,se=!1,M="",H=ne.length))}catch{T=!1}T||ie("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),I===d&&(q=!1),w()}let he={onToggle:Ue,onDraftInput:_e,onSubmit:Le},$e=document.createElement("div");$e.className="md-viewer-root",document.body.appendChild($e);let Re=mc($e,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),je=document.createElement("div");je.className="session-log-root",document.body.appendChild(je);let xe=Fs(je,{transport:s?(g,I)=>Promise.resolve(s(g,I)):void 0,sessionLogStore:u}),We=!1,Xe=!1,Te=!1,ot=null,Y=null,W=0;function oe(g){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${g}`}function Oe(){We=!1,Xe=!1,Te=!1,ot=null,Y=null,W+=1}async function ze(g){if(!s)return;let I=++W;Xe=!0,Te=!1,w();try{let T=await Promise.resolve(s("get-bead-prompt",{bead_id:g}));if(I!==W)return;!T||typeof T!="object"||Array.isArray(T)?Te=!0:(ot=T,Y=oe(g))}catch{I===W&&(Te=!0)}finally{I===W&&(Xe=!1,w())}}function Ve(){if(We=!We,We&&d&&Y!==oe(d)){ot=null,ze(d);return}w()}function Ie(){if(!a||!d)return[];let g=a.get();return(g&&g.attempts?Object.values(g.attempts):[]).filter(T=>T&&T.bead_id===d).sort((T,ne)=>(ne.started_at||0)-(T.started_at||0)).map(T=>({attempt_id:T.attempt_id,bead_id:T.bead_id,status:T.status,started_at:typeof T.started_at=="number"?T.started_at:null,runner:T.runner||null,model:T.model||null,effort:T.effort||T.observed_effort||null,speed:T.speed||null,session_id:T.session_id||null,resumed_from:T.resumed_from||null,continuation_mode:T.continuation_mode||null,dismissed_at:typeof T.dismissed_at=="number"?T.dismissed_at:null,cause:typeof T.cause=="string"?T.cause:null,cause_detail:T.cause_detail||null,exec_default_preset_id:typeof T.exec_default_preset_id=="string"?T.exec_default_preset_id:null,exec_default_preset_revision:typeof T.exec_default_preset_revision=="number"?T.exec_default_preset_revision:null,exec_values:T.exec_values&&typeof T.exec_values=="object"?T.exec_values:null,usage:T.usage||null,usage_legs:Array.isArray(T.usage_legs)?T.usage_legs:[],delegation_sessions:Array.isArray(T.delegation_sessions)?T.delegation_sessions:[]}))}function lt(){if(!a||!d)return null;let g=a.get();return zt(g&&g.attempts||{},d)}let Qe=new Set;function V(g){Qe.has(g)?Qe.delete(g):Qe.add(g),w()}function te(g){let I=a?a.get():null,T=I&&I.attempts?I.attempts[g]:null;xe.open({attempt_id:g,meta:T?{runner:T.runner||void 0,model:T.model||void 0,effort:T.effort||void 0,status:T.status||void 0,session_id:T.session_id||void 0}:{}})}function Me(g,I){let T=a?a.get():null,ne=T&&T.attempts?T.attempts[g]:null,Ye=(ne&&Array.isArray(ne.delegation_sessions)?ne.delegation_sessions:[]).find(Je=>Je&&typeof Je=="object"&&Je.launch_id===I);Ye&&xe.open({attempt_id:g,launch_id:I,meta:{runner:"codex",role:Ye.role,model:Ye.model,effort:Ye.effort,session_id:Ye.session_id,status:Ye.status}})}async function He(g){if(!s||!g)return;let I=await an();if(I===null)return;let T=()=>{let Je=a?a.get():null;return Je&&typeof Je.revision=="number"?Je.revision:0},ne=async(Je={},qe=T())=>await s("worker-attempt-resume",{attempt_id:g,expected_revision:qe,...I!==""?{instructions:I}:{},...Je}),Be=Je=>{Je?.queue&&a?.set&&a.set(Je.queue)},Ye=await ne();if(Be(Ye),Ye&&Ye.conflict){let Je=Ye.queue&&typeof Ye.queue.revision=="number"?Ye.queue.revision:T();Ye=await ne({},Je),Be(Ye)}Ye=await fr(Ye,(Je,qe)=>ne({continuation:Je,decision_token:qe}),{onResult:Be,refresh:()=>ne()}),Ye&&Ye.resumed===!1&&!Ye.conflict&&Ye.reason&&ie(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${Ye.reason}`,"error",2400)}let fe={onOpen:te,onOpenDelegation:Me,onResume:He,onToggleUsage:V};function b(){let g=a?a.get():null,I={...U};for(let T of["orchestration_model","orchestration_effort","orchestration_speed"]){let ne=g&&g[T];typeof ne=="string"&&(I[T]=ne)}return I}async function x(){if(s){try{let g=await Promise.resolve(s("get-session-defaults",{}));U=g&&g.values&&typeof g.values=="object"?g.values:{}}catch{U={}}w()}}function $(){let g=a?a.get():null;return g&&g.runner_catalog||null}function N(){let g=a?a.get():null;return g&&typeof g.execution_defaults=="object"?g.execution_defaults:null}function K(){let g=p?.metadata&&typeof p.metadata=="object"?p.metadata:{},T=on({pin:{...g,...f},global:b(),execution_defaults:N(),runner_catalog:$(),route:typeof g.route=="string"?g.route:null}).orchestration_model.value||"";return ua($(),T)}function Z(){let g=c?c.get():null;return!g||typeof g.revision!="number"?null:{revision:g.revision,presets:Array.isArray(g.presets)?g.presets:[]}}function ce(g){return g?.compatible===!1}function ue(g){c&&g&&typeof g.revision=="number"&&Array.isArray(g.presets)&&c.set({revision:g.revision,presets:g.presets})}async function De(){let g=Z(),I=g?.presets.find(T=>T.id===h);if(!(!s||!d||!g||!I||ce(I)||A)){A=!0,S=[],w();try{let T=await Promise.resolve(s("apply-impl-preset",lc(d,I.id,g.revision)));if(T&&T.conflict){ue(T),ie("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let ne=T&&Array.isArray(T.issue)?T.issue[0]:T?.issue;if(T&&T.applied&&ne&&typeof ne=="object"){p=ne,S=Array.isArray(T.skipped_orchestration_keys)?T.skipped_orchestration_keys.filter(Be=>typeof Be=="string"):[];for(let Be of dc)delete f[Be];ie(S.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}T&&T.error==="bd_readback_failed"?ie("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ie("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(T){T&&typeof T=="object"&&T.code==="bd_readback_failed"?ie("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ie("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{A=!1,w()}}}let ye=null;r&&r.subscribe&&(ye=r.subscribe(()=>Ke()));let Ne=null;a&&typeof a.subscribe=="function"&&(Ne=a.subscribe(()=>{d&&w()}));let Ae=null;c&&typeof c.subscribe=="function"&&(Ae=c.subscribe(()=>{d&&w()}));function Se(g){g.key==="Escape"&&d&&(g.preventDefault(),n())}document.addEventListener("keydown",Se);function Ke(){if(d){if(r&&typeof r.snapshotFor=="function"){let g=r.snapshotFor("detail:"+d)||[];p=g.find(T=>T&&T.id===d)||g[0]||p}rt(),w()}}function z(g){Xt(g).then(I=>{I?ie("\uBCF5\uC0AC\uB428","success",1200):ie("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function re(g){g.preventDefault(),g.stopPropagation(),d&&z(d)}function be(g,I){g.preventDefault(),g.stopPropagation(),z(I)}function k(g,I,T){g.preventDefault(),g.stopPropagation(),Re.open(I,{missing_state:T})}function C(g,I){f[g]=I,w(),!(!s||!d)&&Promise.resolve(s("update-exec-settings",ic(d,g,I.length===0?null:I))).catch(()=>{ie("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function F(g,I){let T=p||{},ne=T.metadata&&typeof T.metadata=="object"?T.metadata:{},Be={};for(let qe of["impl_runtime","impl_model","impl_effort"])Be[qe]=Object.hasOwn(f,qe)?f[qe]:typeof ne[qe]=="string"?ne[qe]:"";Be[g]=I;let Ye=_c(Be,$(),K()),Je={};for(let qe of["impl_runtime","impl_model","impl_effort"])Je[qe]=f[qe],f[qe]=Ye[qe]||"";w(),!(!s||!d)&&Promise.resolve(s("update-impl-target",{id:d,...Ye,orchestration_runtime:K()})).then(qe=>{let bt=Array.isArray(qe)?qe[0]:qe;if(!bt||typeof bt!="object"||!bt.id)throw new Error("implementation target readback failed");p=bt;for(let or of["impl_runtime","impl_model","impl_effort"])delete f[or];w()}).catch(()=>{for(let qe of["impl_runtime","impl_model","impl_effort"])Je[qe]===void 0?delete f[qe]:f[qe]=Je[qe];w(),ie("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function J(g,I,T){if(!s||!d)return!1;try{let ne=await Promise.resolve(s(g,I)),Be=Array.isArray(ne)?ne[0]:ne;return Be&&typeof Be=="object"&&Be.id?(p=Be,!0):(ie(T,"error"),!1)}catch{return ie(T,"error"),!1}}function ke(g){setTimeout(()=>{try{let I=e.querySelector(g);I&&typeof I.focus=="function"&&I.focus()}catch{}},0)}function X(){ee=!0,P=p&&p.title||"",w(),ke('.detail-edit__input[data-edit="title"]')}function Ee(g){P=g.target.value}function Ce(){ee=!1,P="",w()}function mt(){J("edit-text",{id:d,field:"title",value:P},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(I=>{I&&(ee=!1,P=""),w()})}function Et(){Q=!0,D=p&&p.description||"",w(),ke('.detail-edit__textarea[data-edit="description"]')}function nt(g){D=g.target.value}function vt(){Q=!1,D="",w()}function ur(){J("edit-text",{id:d,field:"description",value:D},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(I=>{I&&(Q=!1,D=""),w()})}function wt(g,I,T,ne){if(g.key==="Escape"){g.stopPropagation(),T();return}g.key==="Enter"&&(!ne||g.ctrlKey||g.metaKey)&&(g.preventDefault(),I())}function Tt(g){let I=g.target.value;J("update-status",{id:d,status:I},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>w())}function dr(g){let I=Number(g.target.value);J("update-priority",{id:d,priority:I},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>w())}function wr(g){L=g.target.value}function Bt(){let g=L.trim();g.length!==0&&J("label-add",{id:d,label:g},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(I=>{I&&(L=""),w()})}function Gt(g){if(g.key==="Escape"){g.stopPropagation(),L="",w();return}g.key==="Enter"&&(g.preventDefault(),Bt())}function kt(g){J("label-remove",{id:d,label:g},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>w())}let sr={onCopyPath:be,onOpenDoc:k};function st(g){return typeof g=="string"?g:g&&typeof g=="object"?String(g.id||g.to||g.issue_id||g.depends_on||""):""}function Mt(g){switch(g&&typeof g=="object"?String(g.dependency_type||g.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function kr(g){let T=(Array.isArray(g.dependencies)?g.dependencies:[]).map(ne=>({id:st(ne),icon:Mt(ne)})).filter(ne=>ne.id.length>0);return i`
      <div class="detail-section-label">의존성</div>
      ${T.length===0?i`<div class="detail-empty">의존성 없음</div>`:i`<div class="detail-deps">
            ${T.map(ne=>o?i`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(ne.id)}
                  >
                    ${ne.icon?`${ne.icon} `:""}${ne.id}
                  </button>`:i`<span class="detail-dep"
                    >${ne.icon?`${ne.icon} `:""}${ne.id}</span
                  >`)}
          </div>`}
    `}function Vt(g){let I=g.metadata||{},T=g.workflow||{},ne=T.stages||{},Be=ne.spec&&ne.spec.stale,Ye=ne.impl&&ne.impl.stale,Je=ne.plan||null,qe=T.route_source==="derived",bt=T.route||I.route||"\u2014";return i`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${qe?" detail-kv__v--derived":""}"
          title=${qe?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${qe?"unset":bt}</span
        >
      </div>
      ${T.route!=="quick_fix"||Object.hasOwn(I,"spec_review")?i`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${I.spec_review||"\uC5C6\uC74C"}${Be?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${T.route==="full_plan"?i`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Je?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Je?.approval_receipt||"\uC5C6\uC74C"}${Je?.approval_state==="stale"?" \xB7 stale":Je?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${T.route!=="quick_fix"||Object.hasOwn(I,"impl_review")?i`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${I.impl_review||"\uC5C6\uC74C"}${Ye?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${T.planned_execution?i`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${T.planned_execution.kind}</span>
            </div>
            ${T.planned_execution.kind==="main"?i`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${T.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${T.exec_receipt?i`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${Br(T.exec_receipt)}</span
            >
          </div>`:""}
      ${T.impl_entry?i`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${T.impl_entry.actor}@${T.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${I.pr_url?i`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${I.pr_url}</span>
          </div>`:""}
    `}let ve={route:["quick_fix","spec_backed","full_plan"]};async function l(g,I){let T=I.target.value;if(g==="route"&&p&&p.metadata&&p.metadata.route==="full_plan"&&T!=="full_plan"&&!window.confirm(`full_plan \u2192 ${T||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){w();return}await J("update-workflow-meta",{id:d,key:g,value:T},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),w()}function _(g){let I=g.metadata||{};return i` ${((ne,Be)=>{let Ye=ve[ne],Je=typeof I[ne]=="string"?I[ne]:"";return i`<div class="detail-kv">
        <span class="detail-kv__k">${ne}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${ne}
          data-edit=${`wfmeta-${ne}`}
          @change=${qe=>l(ne,qe)}
        >
          <option value="" ?selected=${!Ye.includes(Je)}>
            ${Be}
          </option>
          ${Ye.map(qe=>i`<option value=${qe} ?selected=${Je===qe}>${qe}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function E(g,I){return ee?i`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${P}
            @input=${Ee}
            @keydown=${T=>wt(T,mt,Ce,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${mt}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${Ce}
            >
              취소
            </button>
          </div>
        </div>
      `:i`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${g}</h2>
        ${At(I).map(T=>i`<span class="detail-usage-total" title=${T.tooltip}
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
    `}function G(g){let I=$t(g.created_at),T=$t(g.updated_at);return!I&&!T?i``:i`
      ${I?i`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${I}</span>
          </div>`:""}
      ${T?i`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${T}</span>
          </div>`:""}
    `}function ae(g,I){return i`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${Tt}
        >
          ${q_.map(T=>i`<option value=${T} ?selected=${T===g}>${T}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${dr}
        >
          ${F_.map(T=>i`<option value=${String(T)} ?selected=${T===I}>
                P${T}
              </option>`)}
        </select>
      </div>
    `}function we(g){return i`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${Q?"":i`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${Et}
            >
              ✎
            </button>`}
      </div>
      ${Q?i`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${D}
              @input=${nt}
              @keydown=${I=>wt(I,ur,vt,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${ur}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${vt}
              >
                취소
              </button>
            </div>
          </div>`:i`<div class="detail-overlay__desc">
            ${g||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function me(g){let I=typeof g.notes=="string"?g.notes:"";return I.trim().length===0?i``:i`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${I}</div>
    `}function et(g){let I=Array.isArray(g.labels)?g.labels:[];return i`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${I.map(T=>i`<span class="detail-label-chip"
              >${T}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${T}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+T}
                @click=${()=>kt(T)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${L}
            @input=${wr}
            @keydown=${Gt}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${Bt}
          >
            추가
          </button>
        </span>
      </div>
    `}function v(){if(!d)return i``;let g=p||{},I=String(g.id||d),T=g.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",ne=lt(),Be=g.status||"open",Ye=typeof g.priority=="number"?Math.max(0,Math.min(4,g.priority)):"",Je=g.description||"",qe={...g,metadata:{...g.metadata||{},...f}};return i`
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
            @click=${re}
          >
            ${I}
          </button>
          ${E(T,ne)}
          ${uc(qe)}
          ${cc({metadata:qe.metadata,workspace_values:b(),catalog:$(),execution_defaults:N(),expanded:O,presets:Z()?.presets||[],preset_id:h,preset_busy:A,skipped_orchestration_keys:S},{onToggle:bt=>{O=bt,w()},onEdit:(bt,or)=>{if(bt==="impl_runtime"||bt==="impl_model"||bt==="impl_effort"){F(bt,or??"");return}C(bt,or??"")},onPresetSelect:bt=>{h=bt,S=[],w()},onPresetApply:()=>{De()}})}
          ${ae(Be,Ye)} ${G(g)}
          ${we(Je)}
          ${Xl(m,he,{expanded:ge,draft:M,sending:q,error:se})}
          ${me(g)} ${et(g)} ${kr(g)}
          ${Vt(g)} ${_(g)}
          ${Kl(g,sr)}
          ${yc({expanded:We,loading:Xe,error:Te,data:ot},{onToggle:Ve})}
          ${hc(Ie(),fe,{total:ne,expanded:Qe})}
        </div>
      </div>
    `}function w(){Ze(v(),e)}return{load(g){g!==d&&(f={},h="",S=[],O=!1,B(),pe(),Oe()),d=g,p=null,Ke(),x()},clear(){d=null,p=null,f={},h="",A=!1,S=[],O=!1,B(),pe(),Oe(),Re.close(),xe.close(),Ze(i``,e)},destroy(){ye&&(ye(),ye=null),Ne&&(Ne(),Ne=null),Ae&&(Ae(),Ae=null),document.removeEventListener("keydown",Se),Re.destroy(),$e.parentNode&&$e.parentNode.removeChild($e),xe.destroy(),je.parentNode&&je.parentNode.removeChild(je),d=null,p=null,h="",A=!1,S=[],pe(),Oe(),Ze(i``,e)}}}function wc(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let r=t.querySelector("#fatal-error-title"),n=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),c=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},u=(d,p,f="")=>{r&&(r.textContent=d||"Unexpected Error"),n&&(n.textContent=p||"An unrecoverable error occurred.");let h=typeof f=="string"?f.trim():"";if(s&&(h.length>0?(s.textContent=h,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>c()),t.addEventListener("cancel",d=>{d.preventDefault(),c()}),{open:u,close:c,getElement(){return t}}}function Ys(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function Zs(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let r=Math.floor(t/60);if(r<60)return`${r}\uBD84 ${Math.round(t-r*60)}\uCD08`;let n=Math.floor(r/60),s=r%60;return`${n}\uC2DC\uAC04 ${s}\uBD84`}function kc(e,t){if(typeof e!="object"||e===null)return null;let r=0,n=!1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t)continue;let a=o.started_at,c=o.finished_at;typeof a!="number"||typeof c!="number"||!Number.isFinite(a)||!Number.isFinite(c)||c<a||(r+=c-a,n=!0)}return n?r:null}function Xs(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function j_(e,t){let r=Array.isArray(e)?e:[],n=Array.isArray(t)?t:[];if(r.length===0&&n.length===0)return null;let s=null;for(let c of r)c.kind!=="deploy"||c.state!=="succeeded"||typeof c.target_sha!="string"||(!s||(typeof c.finished_at=="number"?c.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=c);let o=r.filter(c=>c.state==="failed"&&!c.dismissed&&!c.superseded_by).length+n.length,a=r.some(c=>c.state==="repairing");return{deploy:s?{sha:Ys(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function $c(e,t){let r=j_(e,t);return r?i`<button
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
            title=${r.deploy.at?$t(r.deploy.at):""}
            >${Xs(r.deploy.at)}${r.deploy.elapsed_ms!==null?` \xB7 ${Zs(r.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${r.badge.tone}"
      >${r.badge.label}</span
    >
  </button>`:""}function fn(e){let t=qt(e.created_at),r=qt(e.updated_at);return!t&&!r?"":i`<div class="worker-mini__meta">
    ${t?i`<span title=${`\uC0DD\uC131 ${$t(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&r?i`<span>·</span>`:""}${r?i`<span title=${`\uC218\uC815 ${$t(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </div>`}function B_(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function Bn(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function Qs(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function cr(e,t,r={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(f=>f&&f.bead_id===t&&f.phase!=="done").sort((f,h)=>(f.requested_at||0)-(h.requested_at||0)).at(-1),o=typeof r.attempt_id=="string"&&r.attempt_id.length>0?r.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=r.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":r.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":r.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,c=typeof s?.last_error=="string"?s.last_error:null,u=s?B_(s.phase):null,d=s?.kind==="stale_work_backup_fresh",p=r.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!r.external&&!r.done,enabled:!a&&(!s||!!c),label:d?c?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":c?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(c?d?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${c} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${c} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${u||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:p==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:u,error:c,confirmation:p}}function vr(e){let t=e.discard;if(!t||!t.operation)return"";let r=t.operation,n=r.kind==="stale_work_backup_fresh"&&!t.error?null:r.backup?.path,s=r.original_pr,o=r.revert_pr;return i`<div
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
  </div>`}var U_={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function xc(e,t=!1){if(!e||typeof e!="object")return null;let r=e;if(r.reason!=="worktree_stale_work"||!r.stale_work||typeof r.stale_work!="object")return null;let n=r.stale_work,s=n.residue==="branch"?"branch":"worktree",o=n.state==="unique"?"unique":"unknown",a=n.summary&&typeof n.summary=="object"?n.summary:{};function c(d){return Number.isInteger(a[d])?Number(a[d]):0}let u=typeof n.cause=="string"?n.cause:"observe_failed";return{residue:s,state:o,title:s==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":o==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:U_[u]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:s==="branch"?`\uACE0\uC720 commit ${c("branch_ahead")}`:[`staged ${c("staged_count")}`,`unstaged ${c("unstaged_count")}`,`untracked ${c("untracked_count")}`,`branch ahead ${c("branch_ahead")}`,`HEAD ahead ${c("head_ahead")}`].join(" \xB7 "),action_id:typeof n.action_id=="string"?n.action_id:"",can_resume:n.can_resume===!0,can_continue:n.can_continue===!0,can_backup_fresh:n.can_backup_fresh===!0,can_recheck:n.can_recheck===!0,locked:t}}function fa(e){let t=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],n=At(e.usage),s=Qt(e.usage),o=e.merge_step||null,a=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,c=e.lane==="done"&&!a,u=c?qt(e.done_at):"",d=t?i`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",p=typeof e.seq=="number"?i`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",f=e.worker_serial===!0?i`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",h=e.workspace_name?i`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",A=i`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,S=i`<span class="worker-mini__title">${e.title}</span>`,O=e.pr_url&&e.pr_number?i`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",U=e.completion_repair_pr_url&&e.completion_repair_pr_number?i`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",ee=r.map(pe=>pe===e.live_badge?i`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${pe}</span
        >`:i`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${pe===e.completion_badge&&e.completion_title||""}
          >${pe}</span
        >`),Q=e.reason?i`<span class="worker-mini__reason">${e.reason}</span>`:"",P=n.length>0?n.map(pe=>i`<span class="worker-usage" title=${pe.tooltip}
              >${pe.label}</span
            >`):s?i`<span class="worker-usage" title=${cn(e.usage)}
            >${s}</span
          >`:"",D=o?i`<span
        class="merge-step${o.failed?" merge-step--failed":""}"
        style=${`--progress: ${o.percent}%`}
        >${o.label}${o.index>0?i`<span class="merge-step__n"
              >${o.index}/${o.total}</span
            >`:""}</span
      >`:"",L=e.merge_action?i`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",B=e.cancel_action?i`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",m=e.timeline_action?i`<button
        type="button"
        class="worker-mini__timeline"
        data-bead-id=${e.id}
        title="저장소 작업이 끝나지 않아 머지 액션이 잠겼습니다 — 타임라인에서 원인과 해결 버튼을 볼 수 있습니다"
      >
        저장소 작업 보기
      </button>`:"",R=e.discard,H=R?.action||e.discard_action?i`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${R?.attempt_id||""}
          data-operation-id=${R?.operation?.operation_id||""}
          data-discard-mode=${R?.confirmation||"unmerged"}
          ?disabled=${R?!R.enabled:e.discard_enabled===!1}
          title=${R?R.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${R?.label||"\uD3D0\uAE30"}
        </button>`:"",se=e.stale_work||null,M=se?i`${se.can_resume||se.can_continue?i`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${se.action_id}
            ?disabled=${se.locked}
          >
            기존 작업 이어가기
          </button>`:""}${se.can_backup_fresh?i`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${se.action_id}
            ?disabled=${se.locked}
          >
            백업 후 새로 시작
          </button>`:""}${se.can_recheck?i`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${se.action_id}
            ?disabled=${se.locked}
          >
            다시 확인
          </button>`:""}`:"",q=se?i`<div class="worker-mini__stale">
        <strong>${se.title}</strong>
        <span>${se.summary}</span>
        <span>${se.cause}</span>
        ${se.can_backup_fresh?i`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",de=e.revise_action?i`<button
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
        </button>`:"",ge=!!(s||o||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||R?.operation||e.revise_action||se);return i`<div
    class="worker-mini${a?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${o?" worker-mini--merging":""}${o?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${c?i`<div class="worker-mini__row1">${h}${A}${S}</div>
          <div class="worker-mini__row2">
            ${P}${u?i`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${$t(e.done_at)}`}
                  >완료 ${u}</span
                >`:""}${typeof e.work_ms=="number"?i`<span
                  class="worker-mini__work"
                  title="attempt 실행 시간 합산 (재개 세션 포함)"
                  >작업 ${Zs(e.work_ms)}</span
                >`:""}${ee}${D}
            <span class="worker-mini__actions"
              >${L}${B}${m}${H}</span
            >
            ${fn(e)}
          </div>`:a?i`<div class="worker-mini__head">
              ${d}${p}${h}${A}${O}${U}${ee}${f}${Q}
            </div>
            <div class="worker-mini__body">${S}${q}</div>
            ${ge?i`<div class="worker-mini__foot">
                  ${P}${D}
                  <span class="worker-mini__actions"
                    >${L}${B}${m}${H}${de}${M}</span
                  >
                  ${vr(e)}
                </div>`:""}
            ${fn(e)}`:i`<div class="worker-mini__line">
              ${d}${p}${h}${A}${S}${O}${U}${ee}${f}${Q}${P}${D}${L}${B}${m}${H}
            </div>
            ${vr(e)} ${fn(e)}`}
  </div>`}function W_(e,t=null){let r=e.worker_ineligible===!0,n=e.draggable&&!e.done&&!r,s=n&&t&&t.bead_id===e.id,o=e.workflow,a=o&&o.chips||{},c=a.route||o&&o.route,u=a.route_source==="derived"||!!(o&&o.route_source==="derived"),d=typeof e.reason=="string"&&e.reason.split(" \xB7 ").includes("missing_description"),p=typeof e.reason=="string"&&e.reason.startsWith("\u26D4");return i`<div
    class="worker-card${n?"":" worker-card--static"}${r?" worker-card--ineligible":""}"
    draggable=${n?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${n?i`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      ${e.workspace_name?i`<span class="worker-card__repo" title=${e.root_dir||""}
            >${e.workspace_name}</span
          >`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span>
      ${r?i`<span
            class="ctl-chip worker-card__ineligible"
            title="worker-ineligible label이 붙어 워커 실행 대상이 아닙니다"
            >⛔ worker-ineligible</span
          >`:""}
      ${o&&c?i`<span
            class="ctl-chip ctl-chip--route${u?" is-derived":""}"
            title=${u?"route \uBBF8\uD540 (metadata unset)":"route"}
            >${u?"unset":c}</span
          >`:""}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${o?vs(o,e.status):""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${s?i`<div class="worker-card__place-menu">
            ${t.lanes.map(f=>i`<button
                  type="button"
                  class="worker-card__place-lane"
                  data-bead-id=${e.id}
                  data-lane=${f.id}
                  title="${f.label} 대기 맨 뒤에 추가"
                >
                  <span>${f.label}</span>
                  <span class="worker-card__place-count">${f.count}</span>
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
          </div>`:i`${e.reason?i`<span
                  class="worker-card__reason${p?" worker-card__reason--danger":""}"
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
              ?disabled=${!n}
              title=${n?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":r?"worker-ineligible label\uB85C \uC6CC\uCEE4\uC5D0\uC11C \uC2E4\uD589\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":d?"description\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"spec\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
            >
              대기로 ↴
            </button>`}
    </div>
    ${fn(e)}
  </div>`}function nr(e){let t=!!e.collapsible&&!!e.collapsed,r=i`<span
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
                  </div>`:e.items.map(n=>e.lane==="candidate"?W_(n,e.place_menu):fa(n))}
          </div>`}
  </section>`}function _a(e,t){return`${e}\0${t}`}function ma(e){let t=new Map;for(let r of Array.isArray(e?.running)?e.running:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"running",state:"running"});for(let r of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let r of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let n=Array.isArray(r.sublanes?.parallel)?r.sublanes.parallel:Array.isArray(r.items)?r.items:[];for(let s of n)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:"parallel",position:s.queue_position});for(let s of Array.isArray(r.sublanes?.serial)?r.sublanes.serial:[])for(let o of s.items)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:s.id,position:o.queue_position})}for(let r of Array.isArray(e?.runnable)?e.runnable:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"runnable",state:"runnable"});for(let r of Array.isArray(e?.done)?e.done:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"done",state:"done"});return t}function z_(e,t){let r=Array.isArray(t)?t:[],n=e.indexOf("-"),s=n>0?e.slice(0,n):e;return r.some(o=>typeof o?.issue_prefix=="string"&&o.issue_prefix===s)?"internal":r.length>0&&r.every(o=>typeof o?.issue_prefix=="string")?"external":"unknown"}function H_(e,t){return e==="internal"&&t===void 0}function Ac(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function Sc(e,t,r,n){let s=r.get(e);if(!!(s&&t&&s.root_dir===t.root_dir&&s.lane===t.lane&&typeof s.position=="number"&&typeof t.position=="number"&&s.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,scope:null,same_lane_ahead:!0,missing_internal:!1};if(s)return{id:e,label:`\u{1F512} ${e} (${Ac(s)})`,scope:null,same_lane_ahead:!1,missing_internal:!1};let a=z_(e,n);return{id:e,label:`\u{1F512} ${e} (${a==="internal"?"\uBBF8\uC801\uC7AC":a==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"})`,scope:a,same_lane_ahead:!1,missing_internal:H_(a,s)}}function Ec(e){let t=Array.isArray(e)?e:[],r=new Map,n=new Map,s=new Map;for(let c of t)for(let u of Array.isArray(c.sublanes?.serial)?c.sublanes.serial:[]){let d=_a(c.root_dir,u.id);r.set(d,{root_dir:c.root_dir,workspace_name:c.name,lane:u.id}),s.set(d,[]);for(let p of Array.isArray(u.items)?u.items:[])n.set(p.id,d)}for(let c of t)for(let u of Array.isArray(c.sublanes?.serial)?c.sublanes.serial:[]){let d=_a(c.root_dir,u.id),p=Array.isArray(u.items)?u.items[0]:null,h=!!p&&p.queue_index===0&&(!Array.isArray(u.occupied_by)||u.occupied_by.length===0)&&Array.isArray(p.blocked_by)?p.blocked_by:[],A=s.get(d);if(A)for(let S of h){let O=n.get(S);O&&O!==d&&!A.includes(O)&&A.push(O)}}let o=(c,u)=>{let d=new Set,p=[c];for(;p.length>0;){let f=p.pop();if(f===u)return!0;!f||d.has(f)||(d.add(f),p.push(...s.get(f)||[]))}return!1},a=new Map;for(let[c,u]of s){let d=[];for(let p of u){let f=r.get(p);o(p,c)&&f&&d.push(f)}d.length>0&&a.set(c,d)}return a}function Tc(e){let t=ma(e),r=new Map;for(let n of[...Array.isArray(e?.runnable)?e.runnable:[],...Array.isArray(e?.queue)?e.queue:[],...Array.isArray(e?.running)?e.running:[],...Array.isArray(e?.pr_wait)?e.pr_wait:[]])r.has(n.id)||r.set(n.id,n);return Array.from(r.values()).map(n=>({id:n.id,title:n.title,root_dir:n.root_dir,workspace_name:n.workspace_name,location:t.has(n.id)?(()=>{let s=t.get(n.id),o=Ac(s);return s.state?`${s.workspace_name} \xB7 ${o}`:o})():""}))}function Cc(e,t){return _a(e,t)}var Rc=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],Un=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function Js(e,t){let r=Rc.find(s=>s.step===e);if(!r)return null;let n=Rc.length;return{step:r.step,label:t,index:r.index,total:n,percent:Math.round(r.index/n*100)}}function Ic(e){let t=Un.findIndex(r=>r.step===e);return Un.map((r,n)=>({step:r.step,label:r.label,state:t<0?"todo":n<t?"done":n===t?"stall":"todo"}))}function Hr(e){let t=Un.find(r=>r.step===e);return t?t.label:typeof e=="string"?e:""}function G_(e){let t=Un.findIndex(r=>r.step===e);return t<0?null:{index:t+1,total:Un.length}}function eo(e){let t=G_(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var ba=new Set(["queued","running","retry_pending","repairing"]),Lc=new Set(["failed","succeeded"]),V_={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",repairing:"\uC790\uB3D9 \uD574\uACB0 \uC911",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},Wn={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},K_={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:Wn.base_containment,child_sweep:Wn.child_sweep,branch_cleanup:Wn.branch_cleanup,parent_close:Wn.parent_close};function Y_(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function Z_(e,t,r){return!["verify","deploy"].includes(e.kind)||![...ba,...Lc].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(n=>n&&typeof n=="object"&&n.bead_id===t&&n.merged_sha===r)}function X_(e,t){let r=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(r!==0)return r;let n=d=>d.state==="succeeded"?1:2,s=n(t)-n(e);if(s!==0)return s;let o=typeof e.requested_at=="number"?e.requested_at:0,a=typeof t.requested_at=="number"?t.requested_at:0;if(o!==a)return a-o;let c=typeof e.operation_id=="string"?e.operation_id:"",u=typeof t.operation_id=="string"?t.operation_id:"";return c.localeCompare(u)}function ga(e,t=!1){let r=e.kind,n=r==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",s=t?"failed":e.state,o=V_[s];if(!o)return null;let a=Js(r,`${n} ${o}`);return a?{...a,active:ba.has(s),failed:s==="failed"}:null}function Q_(e){return!e||typeof e!="object"?null:K_[e.step]||null}function zn(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,r=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},n=Q_(r),s=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,o=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),a=!o&&(e.cleanup_cursor==="repo_operations"||r.step==="repo_operations"),c=Y_(e.merge_sha)?e.merge_sha:null,u=!o&&c&&Array.isArray(e.repo_operations)?e.repo_operations.filter(S=>S&&typeof S=="object"&&Z_(S,t,c)).sort(X_):[],d=a?u:[],p=d.find(S=>ba.has(S.state));if(p)return ga(p);if(s)return s.step==="repo_operations"&&u[0]?ga(u[0],!0):null;let f=d.find(S=>Lc.has(S.state)?S.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(f)return ga(f);if(n){let S=Js(n.step,n.label);return S?{...S,active:!0,failed:!1}:null}let h=typeof e.cleanup_cursor=="string"?Wn[e.cleanup_cursor]:null;if(!h)return null;let A=Js(h.step,h.label);return A?{...A,active:!0,failed:!1}:null}function to(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var Oc={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},Mc={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."};function Pc(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function ha(e){for(let t of Pc(e))if(Object.hasOwn(Oc,t))return Oc[t];return null}function ya(e){let t=null;for(let r of Pc(e))Object.hasOwn(Mc,r)&&(t=Mc[r]);return t}function ro(e){let t=ha(e),r=ya(e);return t&&r?`${t} \u2014 ${r}`:t||r?t||r:typeof e=="string"?e:""}function Dc(e,t){let r=ha(e)??ha(t),n=ya(t)??ya(e);return r&&n?`${r} \u2014 ${n}`:r||n?r||n:typeof t=="string"?t:""}var Nc=160;function J_(e){return e.length>Nc?`${e.slice(0,Nc)}\u2026`:e}function em(e){return!e||!e.reason?"":i`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?i` · <code>${J_(e.command)}</code>`:""}
  </div>`}function tm(e){return e?i`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function va(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),r=Math.floor(t/60),n=t%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function qc(e){let t=e.failure?ro(e.failure.reason):"";return i`<div class="worker-banners">
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
                title="실패 알림 닫기 — 레인에는 남습니다"
                aria-label="배너 닫기"
              >
                ✕
              </button>`:""}
          ${em(e.failure.cause_detail)}
          ${tm(e.failure.reason)}
          ${vr({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function rm(e,t,r=null){let n=e.failed===!0,s=!!e.paused,o=n?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):s?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?va(t-e.started_at):"\u2014",a=ir(e),c=Sr(e),u=At(e.usage),d=Qt(e.usage),p=e.conflict_resolution?s?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,f=e.base_exception||null,h=e.landing,A=e.attempt_id&&e.attempt_id===r,S=e.discard?.action?i`<button
        type="button"
        class="rtile__discard"
        data-operation-id=${e.discard.operation?.operation_id||""}
        ?disabled=${!e.discard.enabled}
        title=${e.discard.title}
        aria-label=${e.discard.label}
      >
        ${e.discard.label}
      </button>`:"";return i`<div
    class="rtile${A?" rtile--sel":""}${s?" rtile--paused":""}${n?" rtile--failed":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span class="rtile__dot" aria-hidden="true"></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${c?i`<span class="rtile__resumed" title=${c}>↻</span>`:""}
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
            ${S}
            <button
              type="button"
              class="rtile__dismiss"
              title="실패 알림 닫기 — 레인에는 남습니다"
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
            ${S}`}
    </div>
    <div class="rtile__title">${e.title}</div>
    ${e.current_child?i`<div class="rtile__child" title="현재 진행중 child">
          └ ${e.current_child}
        </div>`:""}
    ${h?i`<div class="rtile__landing">
          <span
            class="merge-step${h.failed?" merge-step--failed":""}"
            style=${`--progress: ${h.percent}%`}
            >${h.label}${h.index>0?i`<span class="merge-step__n"
                  >${h.index}/${h.total}</span
                >`:""}</span
          >
        </div>`:""}
    ${a||u.length>0||d||p||f?i`<div class="rtile__meta">
          ${p?i`<span class="worker-mini__badge">${p}</span>`:""}
          ${f?i`<span
                class="worker-mini__badge"
                title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                >${f}</span
              >`:""}
          ${a?i`<span class="rtile__runner">${a}</span>`:""}
          ${u.length>0?u.map(O=>i`<span class="worker-usage" title=${O.tooltip}
                    >${O.label}</span
                  >`):d?i`<span
                  class="worker-usage"
                  title=${cn(e.usage)}
                  >${d}</span
                >`:""}
        </div>`:""}
    ${fn(e)} ${vr(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${n||s?"":i`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function wa(e,t=Date.now(),r=null){let n=Array.isArray(e)?e:[];return i`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?i`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>rm(s,t,r))}
  </div>`}function Gr(e){return i`<svg
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
  </svg>`}function ka(){return Gr($r`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function $a(){return Gr($r`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function Fc(){return Gr($r`<rect x="4.3" y="4.3" width="7.4" height="7.4" rx="1.2" />`)}function jc(){return Gr($r`<path d="M4.4 4.4 11.6 11.6M11.6 4.4 4.4 11.6" />`)}function Bc(){return Gr($r`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function Uc(){return Gr($r`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function Wc(){return Gr($r`<path d="M3 3.6 8.2 8 3 12.4z" />
    <path d="M8.8 3.6 14 8l-5.2 4.4z" />`)}var Hn=1,nm=6e4,sm={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"},om=new Set(["auto_merge","merged","merge","done"]),zc={running:3,paused:2,failed:1};function am(e,t){let r=null,n=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=n&&(n=o,r=s)}return r}function im(e,t){let r=Object.values(e||{}),n=new Set,s=new Map;for(let a of r)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&n.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of r){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let c=null;if(a.status==="running")c="running";else if(a.status==="paused"&&!n.has(a.attempt_id))c="paused";else if(a.status==="failed"||a.status==="orphaned"){let f=t.get(a.bead_id),h=typeof f=="number"&&f>0&&typeof a.finished_at=="number"&&f>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!h&&typeof a.dismissed_at!="number"&&(c="failed")}if(!c)continue;let u=typeof a.started_at=="number"?a.started_at:null,d=o.get(a.bead_id);if(d){let f=zc[d.run_state],h=zc[c];if(f>h||f===h&&(d.started_at??0)>(u??0))continue}let p=typeof a.session_id=="string"&&a.session_id.length>0;o.set(a.bead_id,{attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",run_state:c,started_at:u,last_event_at:typeof a.last_event_at=="number"?a.last_event_at:null,runner:typeof a.runner=="string"?a.runner:null,model:typeof a.model=="string"?a.model:null,effort:typeof a.effort=="string"?a.effort:null,speed:typeof a.speed=="string"?a.speed:null,resumed_from:typeof a.resumed_from=="string"?a.resumed_from:null,continuation_mode:a.continuation_mode==="session"||a.continuation_mode==="fresh"?a.continuation_mode:null,usage:zt(e,a.bead_id),can_pause:c==="running"&&p,can_resume:c!=="running"&&p&&!n.has(a.attempt_id)})}return o}function Hc(e,t){let r=e[t];if(!r)return"";if(r.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let n=typeof r.reason=="string"?r.reason:"",s=n.indexOf(":");return s>0&&s<n.length-1?`\u26D4 ${n.slice(0,s)} (${n.slice(s+1)})`:`\u26D4 ${n}`}function St(e){return e&&typeof e=="object"?e:{}}function xa(e,t,r){let n=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=r&&typeof r.done_since=="number"?r.done_since:void 0,a=new Map;for(let m of s)m&&typeof m.root_dir=="string"&&a.set(m.root_dir,m);let c=[],u=[],d=[],p=[],f=[],h=[],A=new Map,S=new Map,O=new Map;for(let m of n){if(!m||typeof m.root_dir!="string")continue;let R=m.root_dir,H=m.name||R,se=a.get(R),M=se&&typeof se.revision=="number"?se.revision:typeof m.revision=="number"?m.revision:0,q=St(m.attempts),de=St(m.bead_titles),ge=St(m.pr_observations),pe=St(m.admission),Fe=St(m.revise_parked),rt=St(m.merge_queue_state),Ue=St(m.cleanup_failed),_e=St(m.discard_operations),Le=St(m.bead_blocked_by),he=St(m.pr_activity),$e=Array.isArray(m.repo_operations)?m.repo_operations:[],Re=Array.isArray(m.merge_queue)?m.merge_queue:[],je=new Set(Re.filter(V=>V&&typeof V.bead_id=="string").map(V=>V.bead_id)),xe=new Map(Re.filter(V=>V&&typeof V.bead_id=="string").map(V=>[V.bead_id,V])),We=Array.isArray(m.queue)?m.queue:[],Xe=(Array.isArray(m.serial_lanes)?m.serial_lanes:[]).filter(V=>V&&/^s[1-5]$/.test(V.id)&&Array.isArray(V.entries)),Te=St(m.lane_states),ot=typeof m.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(m.serial_lane_count))):Math.min(5,Xe.length);O.set(R,ot);let Y=new Map(Xe.map(V=>[V.id,V])),W=new Map;for(let V of Xe)for(let te of V.entries)te&&typeof te.bead_id=="string"&&W.set(te.bead_id,V.id);let oe=Array.isArray(m.done)?m.done:[];for(let V of oe)V&&typeof V.bead_id=="string"&&h.push({id:V.bead_id,root_dir:R,workspace_name:H});let Oe=new Map;for(let V of oe)V&&typeof V.bead_id=="string"&&typeof V.added_at=="number"&&Oe.set(V.bead_id,V.added_at);let ze=V=>({id:V,title:de[V]||V,root_dir:R,workspace_name:H,expected_revision:M,draggable:!1}),Ve=new Set;for(let[V,te]of im(q,Oe))Ve.add(V),u.push({...ze(V),lane:"running",...W.has(V)?{serial_lane_id:W.get(V)}:{},attempt_id:te.attempt_id,run_state:te.run_state,can_pause:te.can_pause,can_resume:te.can_resume,started_at:te.started_at,last_event_at:te.last_event_at,runner:te.runner,model:te.model,effort:te.effort,speed:te.speed,resumed_from:te.resumed_from,continuation_mode:te.continuation_mode,usage:te.usage,discard:cr(_e,V,{attempt_id:te.attempt_id}),badges:te.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:te.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:te.run_state==="failed"});for(let V of Array.isArray(m.pr_wait)?m.pr_wait:[]){let te=V&&V.bead_id;if(typeof te!="string"||Ve.has(te))continue;Ve.add(te);let Me=St(ge[te]),He=St(Me.pr),fe=Me.gate?St(Me.gate):null,b=je.has(te),x=xe.get(te)?.continuation_action||null,$=!!x&&x.continuation===null,N=rt.active===te,K=V.external===!0,Z=Ue[te]||null,ce=St(he[te]),ue=zn({bead_id:te,merge_sha:V.merge_sha,cleanup_cursor:V.cleanup_cursor,merge_progress:ce.merge_progress||null,cleanup_failed:Z,repo_operations:$e}),De=to(ue),ye=!!fe&&fe.base_badge==="\uCDA9\uB3CC",Ne=!!Z&&["child_sweep","branch_cleanup","parent_close"].includes(Z.step)&&!!fe&&fe.tier==="merged",Ae=K&&!!Z&&!!fe&&fe.tier==="merged",Se=!!fe&&["closed_unmerged","review","undecidable"].includes(fe.tier),Ke=cr(_e,te,{external:K,merge_active:N||ue?.step==="merge",merge_queued:b,cleanup_active:De,merged:!!Z||fe?.tier==="merged"}),z=!!Ke.operation;d.push({...ze(te),lane:"pr_wait",pr_number:typeof He.number=="number"?He.number:null,pr_url:typeof He.url=="string"?He.url:void 0,external:K,usage:zt(q,te),merge_step:ue,badges:$?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:ue?[fe?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:Z?[Hr(Z.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Hr(Z.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof fe?.gate_badge=="string"&&fe.gate_badge.length>0?[fe.gate_badge]:[],alert:ue?ue.failed===!0:!!Z||Se,reason:Z&&ue?.active!==!0?eo(Z.step):"PR \uB300\uAE30",merge_action:fe?.tier==="merged"&&!Ne&&!Ae?!1:!b||$,merge_enabled:!z&&($||fe?.enabled===!0||ye||Ne||Ae),merge_label:$?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Ae||Ne?"\uC815\uB9AC \uC7AC\uAC1C":ye&&!Ne?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:$?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":z?Ke.error?`\uD3D0\uAE30 \uC2E4\uD328: ${Ke.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${Ke.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Ae?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Ne?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":ye?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":fe?.enabled===!0?`\uBA38\uC9C0 (${fe.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${fe?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:b&&!$,cancel_enabled:!N,continuation_mismatch:x?.mismatch||null,discard:Ke,discard_action:Ke.action,discard_enabled:Ke.enabled,discard_title:Ke.title})}let Ie=(V,te,Me,He)=>{let fe=V&&V.bead_id;if(typeof fe!="string"||Ve.has(fe))return null;Ve.add(fe);let b=Fe[fe],x=cr(_e,fe),$=x.operation?x:null,N={...ze(fe),lane:te,draggable:!$,discard:$||void 0,reason:Hc(pe,fe),queue_position:Me+1,queue_index:Me,queue_length:He,badges:b?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!b,revise_action:!!b,revise_enabled:!!b&&!$,revise_title:b?b.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${b.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};return Object.hasOwn(Le,fe)&&(N.blocked_by=Array.isArray(Le[fe])?Le[fe].filter(K=>typeof K=="string"&&K.length>0):[]),N};for(let V=0;V<We.length;V++){let te=Ie(We[V],"queue",V,We.length);if(!te)continue;p.push(te);let Me=A.get(R);Me?Me.push(te):A.set(R,[te])}let lt=[];for(let V=0;V<Xe.length;V++){let te=Xe[V],Me=[];for(let fe=0;fe<te.entries.length;fe++){let b=Ie(te.entries[fe],te.id,fe,te.entries.length);b&&(Me.push(b),p.push(b))}if(Me.length===0)continue;let He=St(Te[te.id]);lt.push({id:te.id,index:V,items:Me,occupied_by:Array.isArray(He.occupied_by)?He.occupied_by.filter(fe=>typeof fe=="string"):[],corrections:Array.isArray(He.corrections)?He.corrections.length:0,cycle:He.cycle===!0})}S.set(R,lt);let Qe=Array.from({length:ot},(V,te)=>{let Me=`s${te+1}`,He=Y.get(Me),fe=He&&Array.isArray(He.entries)?He.entries:[],b=St(Te[Me]);return{id:Me,index:fe.length,length:fe.length,occupied_by:Array.isArray(b.occupied_by)?b.occupied_by.filter(x=>typeof x=="string"):[]}});for(let V of Array.isArray(m.runnable)?m.runnable:[]){let te=V&&V.bead_id;typeof te!="string"||Ve.has(te)||(Ve.add(te),c.push({...ze(te),title:V.title||de[te]||te,lane:"runnable",draggable:!0,reason:Hc(pe,te),created_at:V.created_at??void 0,updated_at:V.updated_at??void 0,labels:Array.isArray(V.labels)?V.labels:[],spec_reviewer:typeof V.spec_reviewer=="string"?V.spec_reviewer:void 0,plan_state:V.plan_state==="approved"||V.plan_state==="authored"?V.plan_state:"none",workflow:V.route?{route:V.route,chips:{route:V.route}}:null,blocked:V.blocked===!0,...Array.isArray(V.blocked_by)?{blocked_by:V.blocked_by.filter(Me=>typeof Me=="string"&&Me.length>0)}:{},place_index:We.length,place_lanes:Qe}))}for(let V of oe){let te=V&&V.bead_id;if(typeof te!="string"||Ve.has(te)||(Ve.add(te),o!==void 0&&typeof V.added_at=="number"&&V.added_at<o))continue;let Me=am(q,te);f.push({...ze(te),lane:"done",done:!0,usage:zt(q,te),done_at:typeof V.added_at=="number"?V.added_at:void 0,done_kind:Me&&typeof Me.done_kind=="string"?Me.done_kind:null})}}let U=new Map;s.forEach((m,R)=>{m&&typeof m.root_dir=="string"&&U.set(m.root_dir,R)});let ee=r&&r.running_sort==="repo"?"repo":"started";u.sort((m,R)=>{if(ee==="repo"){let M=U.get(m.root_dir)??Number.MAX_SAFE_INTEGER,q=U.get(R.root_dir)??Number.MAX_SAFE_INTEGER;if(M!==q)return M-q}let H=typeof m.started_at=="number"&&Number.isFinite(m.started_at)?m.started_at:null,se=typeof R.started_at=="number"&&Number.isFinite(R.started_at)?R.started_at:null;return H!==null&&se!==null&&H!==se?H-se:H===null&&se!==null?1:H!==null&&se===null?-1:m.id.localeCompare(R.id)}),f.sort((m,R)=>(R.done_at??0)-(m.done_at??0));let Q=s.length>0?s:n.map(m=>({root_dir:m&&m.root_dir,name:m&&m.name,auto_advance:m&&m.auto_advance,auto_merge:m&&m.auto_merge,slots:m&&m.slots,revision:m&&m.revision,runner_catalog:m&&m.runner_catalog})),P=[];for(let m of Q){if(!m||typeof m.root_dir!="string")continue;let R=A.get(m.root_dir)||[],H=S.get(m.root_dir)||[];P.push({root_dir:m.root_dir,name:m.name||m.root_dir,auto_advance:m.auto_advance===!0,auto_merge:m.auto_merge===!0,slots:typeof m.slots=="number"&&m.slots>=Hn?m.slots:Hn,revision:typeof m.revision=="number"?m.revision:0,runner_catalog:St(m.runner_catalog),items:R,sublanes:{parallel:R,serial:H},serial_lane_count:O.get(m.root_dir)||0})}let D={runnable:c,queue:p,queue_groups:P,running:u,pr_wait:d,done:f,automation:{total:P.length,both_on:P.filter(m=>m.auto_advance&&m.auto_merge).length}},L=ma(D);for(let m of h)L.has(m.id)||L.set(m.id,{root_dir:m.root_dir,workspace_name:m.workspace_name,lane:"done",state:"done"});for(let m of[...D.queue,...D.runnable]){if(!Object.hasOwn(m,"blocked_by"))continue;let R=L.get(m.id);m.blockers=(m.blocked_by||[]).map(H=>Sc(H,R,L,s)),m.blocker_warnings=m.blockers.filter(H=>H.missing_internal).map(H=>`\u26A0 \uC120\uD589 ${H.id}\uAC00 \uC5B4\uB290 \uB808\uC778\uC5D0\uB3C4 \uC5C6\uACE0 \uC2E4\uD589 \uC911\uB3C4 \uC544\uB2D8 \u2014 \uC218\uB3D9 \uAC1C\uC785 \uC804\uAE4C\uC9C0 \uC774 \uC790\uB9AC\uC5D0\uC11C \uC815\uC9C0`),m.blocker_warnings.length>0&&(m.alert=!0)}let B=Ec(D.queue_groups);for(let m of D.queue_groups)for(let R of m.sublanes.serial){let H=B.get(Cc(m.root_dir,R.id));H&&(R.cross_wait_peers=H)}return D}function lm(e,t){if(typeof e!="number"||!Number.isFinite(e))return"";let n=t-e<nm;return i`<span
    class="mon-beat${n?" mon-beat--live":""}"
    title=${`\uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${$t(e)}`}
    ><span class="mon-beat__dot" aria-hidden="true"></span>${n?"":i`<span class="mon-beat__age"
          >${qt(e,t)}</span
        >`}</span
  >`}function Gn(e){return i`<div class="mon-c__title">${e.title}</div>`}function Vn(e){return i`<span class="mon-c__id" title="클릭하면 상세로 이동"
    >${e.id}</span
  >`}function no(e){return e.workspace_name?i`<span class="mon-c__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:""}function Aa(e){let t=At(e.usage),r=Qt(e.usage);return t.length>0?t.map(n=>i`<span class="mon-c__usage" title=${n.tooltip}
          >${n.label}</span
        >`):r?i`<span class="mon-c__usage" title=${cn(e.usage)}
        >${r}</span
      >`:""}function Sa(e){return(Array.isArray(e.badges)?e.badges:[]).map(r=>i`<span class="mon-c__badge${e.alert?" mon-c__badge--alert":""}"
        >${r}</span
      >`)}function cm(e){return i`<span class="mon-c__ops">
    ${e.run_state==="running"?i`<button
          type="button"
          class="mon-op mon-op--pause"
          ?disabled=${e.can_pause===!1}
          aria-label="일시정지"
          title="일시정지 — 세션을 끊고 이어하기 가능 상태로 둡니다"
        >
          ${$a()}
        </button>`:i`<button
          type="button"
          class="mon-op mon-op--resume"
          ?disabled=${e.can_resume===!1}
          aria-label="이어하기"
          title="이어하기"
        >
          ${ka()}
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
          ${jc()}
        </button>`:""}
  </span>`}function Gc(e){if(!Object.hasOwn(e,"blocked_by"))return"";let t=Array.isArray(e.blockers)?e.blockers:[];return t.length===0?e.blocked?i`<span class="mon-blocker">🔒 blocked</span>`:"":t.map(r=>i`<span
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
      </span>`)}function Vc(e){let t=Array.isArray(e.blocker_warnings)?e.blocker_warnings:[];return t.length>0?i`<div class="mon-blocker-warnings">
        ${t.map(r=>i`<div class="mon-blocker-warning">${r}</div>`)}
      </div>`:""}function Kc(){return i`<span class="mon-link mon-popover-owner">
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
  </span>`}function um(e,t){let r=typeof e.started_at=="number"?va(t-e.started_at):"";return i`${Gn(e)}
    <div class="mon-c__meta">
      ${Sa(e)}${lm(e.last_event_at,t)}${Vn(e)}${no(e)}
      ${ir(e)?i`<span class="mon-c__model">${ir(e)}</span>`:""}
      ${Sr(e)?i`<span
            class="rtile__resumed"
            title=${Sr(e)}
            >↻</span
          >`:""}
      ${e.serial_lane_id?i`<span class="mon-c__lane">${e.serial_lane_id}</span>`:""}
      ${r?i`<span class="mon-live__elapsed">${r}</span>`:""}
      ${Aa(e)}${cm(e)}${vr(e)}
    </div>`}function dm(e){let t=e.workflow,n=(t&&t.chips||{}).route||t&&t.route,s=typeof e.spec_reviewer=="string"?e.spec_reviewer:"",o=e.plan_state==="approved"?"plan \u2713":e.plan_state==="authored"?"plan \u270E":"plan \u2013",a=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),c=qt(e.updated_at);return i`${Gn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>${Vn(e)}
      ${n?i`<span class="ctl-chip ctl-chip--route">${n}</span>`:""}
      ${s?i`<span
            class="ctl-chip mon-c__review${s==="skipped"?" mon-c__review--dim":""}"
            >spec:${s}</span
          >`:""}
      ${n==="full_plan"?i`<span
            class="ctl-chip mon-c__plan${e.plan_state==="none"?" mon-c__review--dim":""}"
            >${o}</span
          >`:""}
      ${ys(e.labels,null).map(u=>i`<span class="ctl-chip ctl-chip--label">${u}</span>`)}
      ${no(e)}
      ${c?i`<span title=${`\uC218\uC815 ${$t(e.updated_at)}`}
            >수정 ${c}</span
          >`:""}
      ${e.reason?i`<span
            class="mon-c__reason${a?" mon-c__reason--danger":""}"
            >${e.reason}</span
          >`:""}
      ${Gc(e)}
      <span class="mon-c__ops">
        ${Kc()}
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
            ${(e.place_lanes||[]).map(u=>i`<button
                  type="button"
                  class="mon-place__choice"
                  data-lane=${u.id}
                  data-place-index=${String(u.index)}
                  role="menuitem"
                  aria-label=${`${u.id} \xB7 ${u.occupied_by.length>0?`\uC810\uC720 ${u.occupied_by.join(", ")}`:"\uBBF8\uC810\uC720"} \xB7 \uB300\uAE30 ${u.length}`}
                >
                  <strong>${u.id}</strong
                  ><span
                    >${u.occupied_by.length>0?`\uC810\uC720 ${u.occupied_by.join(", ")}`:"\uBBF8\uC810\uC720"}
                    · 대기 ${u.length}</span
                  >
                </button>`)}
          </span>
        </span>
      </span>
    </div>
    ${Vc(e)}`}function pm(e){let t=!!e.discard?.operation;return i`${Gn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>
      <span class="mon-live__pos">#${e.queue_position}</span>${Vn(e)}
      ${Sa(e)}
      ${e.reason?i`<span class="mon-c__reason">${e.reason}</span>`:""}
      ${Gc(e)}
      <span class="mon-c__ops">
        ${Kc()}
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
    ${Vc(e)} ${vr(e)}
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
        </div>`:""}`}function fm(e){let t=e.merge_step||null,r=!!(Qt(e.usage)||t||e.merge_action||e.cancel_action||e.discard_action);return i`${Gn(e)}
    <div class="mon-c__meta">
      ${Vn(e)}${no(e)}
      ${e.pr_url&&e.pr_number?i`<a
            class="mon-c__pr"
            href=${e.pr_url}
            target="_blank"
            rel="noreferrer noopener"
            title="PR 열기"
            >#${e.pr_number} ↗</a
          >`:""}
      ${Sa(e)}
      ${e.reason?i`<span class="mon-c__reason">${e.reason}</span>`:""}
    </div>
    ${r?i`<div class="mon-c__tail">
          ${Aa(e)}${t?i`<span
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
          ${vr(e)}
        </div>`:""}`}function _m(e,t){let r=e.done_kind||"",n=r?sm[r]||r:"",s=qt(e.done_at,t);return i`${Gn(e)}
    <div class="mon-c__meta">
      ${Vn(e)}${no(e)}
      ${n?i`<span
            class="mon-live__kind${om.has(r)?" mon-live__kind--ok":" mon-live__kind--warn"}"
            >${n}</span
          >`:""}
      ${Aa(e)}
      ${s?i`<span title=${`\uC644\uB8CC ${$t(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
    </div>`}function Yc(e,t){return e.lane==="running"?um(e,t):e.lane==="runnable"?dm(e):e.lane==="queue"||/^s[1-5]$/.test(e.lane)?pm(e):e.lane==="pr_wait"?fm(e):_m(e,t)}function Zc(e){let t=String(e.revision),r=e.sublanes?e.sublanes.parallel.length+e.sublanes.serial.reduce((n,s)=>n+s.items.length,0):e.items.length;return i`<header
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
        ${e.auto_advance?$a():ka()}
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
        ${Bc()}
        <span class="mon-ctl__label">머지</span>
      </button>
      <label class="mon-ctl mon-ctl--slots" title="동시에 실행할 세션 수">
        ${Uc()}
        <span class="mon-ctl__label">슬롯</span>
        <input
          type="number"
          class="mon-slots__input"
          min=${Hn}
          step="1"
          data-root-dir=${e.root_dir}
          data-revision=${t}
          aria-label=${`${e.name} \uB3D9\uC2DC \uC2E4\uD589 \uC2AC\uB86F`}
          .value=${String(e.slots)}
        />
      </label>
    </span>
  </header>`}function Xc(e){let{total:t,both_on:r}=e.automation,n=t>0&&r===t,s=e.running_sort==="repo"?"repo":"started",o=ar.find(c=>c.value===e.done_range)?.label||"",a=Array.isArray(e.token_total)?e.token_total:e.token_total?[{label:e.token_total,tooltip:e.token_tooltip}]:[];return i`<div class="mon-top">
    <button
      type="button"
      class="mon-auto-all${n?" is-active":""}"
      data-on=${n?"false":"true"}
      aria-pressed=${n?"true":"false"}
      ?disabled=${t===0}
      title=${n?"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4 (\uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4)":"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
    >
      ${n?Fc():Wc()}
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
        ${ar.map(c=>i`<option
              value=${c.value}
              ?selected=${e.done_range===c.value}
            >
              ${c.label}
            </option>`)}
      </select>
      ${a.map(c=>i`<span
            class="mon-kpi__chip mon-kpi__chip--tokens"
            title=${c.tooltip}
            >${o} 완료 · 누적 ${c.label}</span
          >`)}
    </div>
  </div>`}function Qc(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function Jc(e){let t=(Array.isArray(e)?e:[]).map(c=>c&&c.usage).filter(c=>c&&typeof c=="object"&&"providers"in c);if(t.length>0)return At(As(t));let r={};for(let c of _r)r[c]=0;let n=!1,s=0,o=0,a=0;for(let c of Array.isArray(e)?e:[]){let u=c&&c.usage;if(u&&typeof u=="object"){let d=!1;for(let p of _r){let f=u[p];typeof f=="number"&&Number.isFinite(f)&&(r[p]+=f,n=!0,d=!0)}if(d){o+=1;let p=u.total_cost_usd;typeof p=="number"&&Number.isFinite(p)&&(s+=p,a+=1)}}}return o>0&&a===o&&(r.total_cost_usd=s),n?Qt(r):null}var eu="bdui.monitor.done-range",tu="bdui.monitor.running_sort",ru="beads-ui.monitor.candidate-filter",Ea={show_blocked:!1};function mm(){try{let e=window.localStorage.getItem(ru);if(!e)return{...Ea};let t=JSON.parse(e);return!t||typeof t!="object"?{...Ea}:{show_blocked:t.show_blocked===!0}}catch{return{...Ea}}}function gm(e){try{window.localStorage.setItem(ru,JSON.stringify({show_blocked:e.show_blocked}))}catch{}}function bm(e,t){if(t.show_blocked)return{visible:e,hidden_blocked:0};let r=e.filter(n=>n.blocked!==!0);return{visible:r,hidden_blocked:e.length-r.length}}function hm(){try{let e=window.localStorage.getItem(eu);return Wt(e)?e:Nt}catch{return Nt}}function ym(e){try{window.localStorage.setItem(eu,e)}catch{}}function vm(){try{return window.localStorage.getItem(tu)==="repo"?"repo":"started"}catch{return"started"}}function wm(e){try{window.localStorage.setItem(tu,e)}catch{}}var nu="tab:monitor:pipeline",km=1e3,$m=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}];function so(e,t){let r=(e.lane==="runnable"||e.lane==="queue")&&e.draggable!==!1;return i`<div
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
    ${Yc(e,t)}
  </div>`}function xm(e,t){let r=e.serial_lane_count>0||e.sublanes.serial.length>0,n=r?i`<section class="mon-sublane mon-sublane--parallel">
        <header class="mon-sublane__hd">
          <span class="mon-sublane__name">병렬</span>
          <span class="mon-sublane__count"
            >대기 ${e.sublanes.parallel.length}</span
          >
        </header>
        <div class="mon-group__list">
          ${e.sublanes.parallel.map(s=>so(s,t))}
        </div>
      </section>`:i`<div class="mon-group__list">
        ${e.items.map(s=>so(s,t))}
      </div>`;return i`<div class="mon-group" data-root-dir=${e.root_dir}>
    ${Zc(e)} ${n}
    ${r?e.sublanes.serial.map(s=>i`<section
              class="mon-sublane mon-sublane--serial"
              data-serial-lane=${s.id}
            >
              <header class="mon-sublane__hd">
                <span class="mon-sublane__name">${s.id}</span>
                <span class="mon-sublane__count"
                  >대기 ${s.items.length}</span
                >
                ${s.occupied_by.length>0?i`<span class="mon-sublane__held"
                      >${`\u25CF \uC810\uC720 \uC911 \xB7 ${s.occupied_by.join(", ")} (\uBA38\uC9C0\uAE4C\uC9C0 \uC720\uC9C0)`}</span
                    >`:""}
                ${s.corrections>0?i`<span class="mon-sublane__corrections"
                      >순서 자동 교정 ${s.corrections}건</span
                    >`:""}
                ${s.cross_wait_peers?.map(o=>i`<span class="mon-sublane__cross-wait"
                      >⚠ 상호 정지 — ${o.workspace_name}·${o.lane}과 교차
                      대기</span
                    >`)}
              </header>
              ${s.cycle?i`<div class="mon-sublane__cycle">
                    ⛔ 의존 사이클 — 자동 교정 불가
                  </div>`:""}
              <div class="mon-group__list">
                ${s.items.map(o=>so(o,t))}
              </div>
            </section>`):""}
  </div>`}function su(e,t){let r=gt("views:monitor"),n=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,c=t.switchWorkspace,u=t.now||(()=>Date.now()),d=t.confirm||(b=>typeof globalThis.confirm!="function"||globalThis.confirm(b)),p=hm(),f=vm(),h=mm();function A(){let b=ar.find(x=>x.value===p);return b?b.label:""}let S=document.createElement("div");S.className="mon",e.appendChild(S);let O=xa(null,null),U=new Map,ee=null,Q=null;async function P(b,x,$,N,K=!0){if(!o||!$)return null;let Z=await o(b,{...x,root_dir:$,expected_revision:N});if(Z&&Z.conflict&&K){Z.queue&&U.set($,Z.queue);let ce=Z.queue&&typeof Z.queue.revision=="number"?Z.queue.revision:N;Z=await o(b,{...x,root_dir:$,expected_revision:ce})}return Z&&Z.queue&&$&&U.set($,Z.queue),Z}function D(b,x){let $=U.get(b),N=s&&s.get?s.get():null,K=(Array.isArray(N)?N:[]).find(ce=>ce?.root_dir===b);return($||K)?.merge_queue?.find(ce=>ce.bead_id===x)?.continuation_action}async function L(b,x,$,N){let K=await P(b,x,$,N),Z=U.get($)?.revision??K?.queue?.revision??N;return fr(K,(ce,ue)=>P(b,{...x,continuation:ce,decision_token:ue},$,Z,!1),{refresh:ce=>P(b,x,$,ce?.queue?.revision??U.get($)?.revision??Z,!1)})}async function B(b,x,$,N){let K=await fr({continuation_mismatch:N},(ce,ue)=>P("worker-merge-queue-add",{bead_id:x,continuation:ce,decision_token:ue},b,$,!1)),Z=K?.queue?.merge_queue?.find(ce=>ce.bead_id===x)?.continuation_action;K?.applied!==!0&&Z?.continuation===null&&Z.mismatch&&await B(b,x,K.queue.revision,Z.mismatch)}async function m(b,x,$){let N=await P("worker-discard",b,x,$);if(N&&N.discarded===!0){ie(Qs(N),"success",5e3);return}if(N&&N.reason){ie(`\uD3D0\uAE30 \uC2E4\uD328: ${N.reason}`,"error");return}if(N&&N.accepted&&N.pending==="merged_revert"){ie("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(N&&N.accepted){ie(`\uD3D0\uAE30 \uC9C4\uD589: ${N.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}N&&!N.conflict&&ie("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function R(b,x,$){return!o||!$?null:await o(b,{...x,root_dir:$})}async function H(b){if(!o||!b&&!d("\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB055\uB2C8\uB2E4. \uAC01 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uD568\uAED8 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?"))return;let x=await o("monitor-auto-toggle",{on:b}),$=x&&Array.isArray(x.failed)?x.failed:[];$.length>0&&ie(`\uC790\uB3D9\uD654 ${b?"\uCF1C\uAE30":"\uB044\uAE30"} \uC77C\uBD80 \uC2E4\uD328: ${$.map(N=>N.root_dir).join(", ")}`,"error",3200)}async function se(){let b=new Map;for(let x of O.pr_wait)b.has(x.root_dir)||b.set(x.root_dir,x.expected_revision);for(let[x,$]of b)await P("worker-merge-queue-add-all",{},x,$)}let M=null,q=!1,de=null;function ge(){de!==null&&clearTimeout(de),de=setTimeout(()=>{de=null,q=!1},0)}function pe(b){let x=b.target;return typeof x?.closest=="function"?x.closest(".mon-group"):null}function Fe(b){let x=pe(b);return!x||!M?null:(x.getAttribute("data-root-dir")||"")===M.root_dir?x:null}function rt(){for(let b of Array.from(S.querySelectorAll(".mon-group--drag-over")))b.classList.remove("mon-group--drag-over")}function Ue(b){let x=b.target,$=typeof x?.closest=="function"?x.closest('.mon-card[draggable="true"]'):null;if($){M={bead_id:$.getAttribute("data-issue-id")||"",lane:$.getAttribute("data-lane")||"",root_dir:$.getAttribute("data-root-dir")||"",revision:Number($.getAttribute("data-revision")||0)||0,queue_index:Number($.getAttribute("data-queue-index")),queue_length:Number($.getAttribute("data-queue-length")),place_index:Number($.getAttribute("data-place-index"))},q=!0;try{b.dataTransfer?.setData("text/plain",M.bead_id),b.dataTransfer&&(b.dataTransfer.effectAllowed="move")}catch{}}}function _e(b){let x=Fe(b);x&&(b.preventDefault(),b.dataTransfer&&(b.dataTransfer.dropEffect="move"),x.classList.add("mon-group--drag-over"))}function Le(b){pe(b)?.classList.remove("mon-group--drag-over")}function he(){M=null,rt(),ge()}function $e(b){let x=Fe(b),$=M;if(M=null,rt(),!x||!$||!$.bead_id)return;b.preventDefault();let N=b.target,K=typeof N?.closest=="function"?N.closest('.mon-card[data-lane="queue"]'):null,Z=K&&x.contains(K)?Number(K.getAttribute("data-queue-index")):NaN;if($.lane==="runnable"){let De=Number.isFinite(Z)?Z:$.place_index;if(!Number.isFinite(De))return;P("worker-queue-place",{bead_id:$.bead_id,index:De},$.root_dir,$.revision);return}if($.lane!=="queue"||K&&K.getAttribute("data-issue-id")===$.bead_id)return;let ce=$.queue_index,ue=Number.isFinite(Z)?ce>Z?Z:Z-1:$.queue_length-1;!Number.isFinite(ue)||ue<0||ue===ce||P("worker-queue-reorder",{bead_id:$.bead_id,to_index:ue},$.root_dir,$.revision)}function Re(b){let x=bm(O.runnable,h),$={runnable:x.visible,queue:O.queue,running:O.running,pr_wait:O.pr_wait,done:O.done};return i`${Xc({automation:O.automation,counts:{running:O.running.length,queue:O.queue.length,pr_wait:O.pr_wait.length},running_sort:f,done_range:p,token_total:Jc(O.done),token_tooltip:Qc(A())})}
      <div class="worker-lanes mon-lanes">
        ${$m.map(N=>{let K=$[N.lane],Z=N.lane==="queue"?O.queue_groups.length>0?i`${O.queue_groups.map(ce=>xm(ce,b))}`:void 0:K.length>0?i`${K.map(ce=>so(ce,b))}`:void 0;return nr({id:`monitor-${N.lane}`,lane:N.pane,title:N.lane==="done"?`\uC644\uB8CC\xB7${A()}`:N.title,items:K,empty:N.empty,body:Z,live:N.lane==="running"&&K.length>0,header_control:N.lane==="runnable"?i`<span class="mon-candidate-filter">
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
                    ${x.hidden_blocked>0?i`<span class="worker-filter__hidden"
                          >숨김 ${x.hidden_blocked}건</span
                        >`:""}
                  </span>`:N.lane==="pr_wait"&&K.length>0?i`<button
                      type="button"
                      class="mon-lane-op mon-merge-all"
                      title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
                    >
                      일괄 머지
                    </button>`:""})})}
      </div>`}function je(){let b=s&&s.get?s.get():null,x=s&&s.getWorkspacesState?s.getWorkspacesState():[],$=u();O=xa(b,x,{done_since:Nr(p,$),running_sort:f}),Ze(Re($),S)}function xe(b,x){let $=a?a():void 0;if(!x||!$||x===$||!c){n(b);return}c(x).then(()=>{n(b)}).catch(N=>{r("workspace switch for %s failed: %o",x,N)})}function We(b){return{root_dir:b.getAttribute("data-root-dir")||"",revision:Number(b.getAttribute("data-revision")||0)||0}}function Xe(b){if(typeof b=="string"&&b.length>0)return b;if(b&&typeof b=="object"){let x=b;if(typeof x.message=="string"&&x.message.length>0)return x.message;if(typeof x.error=="string"&&x.error.length>0)return x.error;if(x.error&&typeof x.error=="object"&&typeof x.error.message=="string")return x.error.message}return"\uC5F0\uACB0\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}function Te(b,x){let $=b.querySelector(".mon-link__trigger"),N=b.querySelector(".mon-link__popover"),K=b.querySelector(".mon-link__error");!$||!N||!K||(Oe(),N.hidden=!1,$.setAttribute("aria-expanded","true"),K.textContent=x,K.hidden=!1)}async function ot(b,x,$){let N=x.getAttribute("data-root-dir")||"",K=x.getAttribute("data-issue-id")||"";if(!(!K||!$||$===K))try{await R(b,{a:K,b:$},N),Oe()}catch(Z){Te(x,Xe(Z))}}function Y(b,x){let{root_dir:$,revision:N}=We(b),K=b.getAttribute("data-issue-id")||"",Z=x.dataset.attemptId||b.getAttribute("data-attempt-id")||"",ce=x.classList;if(ce.contains("mon-link__trigger")){Ve(x);return}if(ce.contains("mon-link__candidate")||ce.contains("mon-link__direct")){let ue=x.dataset.targetId||"";ot("dep-add",b,ue);return}if(ce.contains("mon-blocker__remove")){let ue=x.dataset.blockerId||"";ot("dep-remove",b,ue);return}if(ce.contains("mon-place__choice")){let ue=x.dataset.lane||"parallel",De=Number(x.dataset.placeIndex||0)||0;Oe(),P("worker-queue-place",{bead_id:K,...ue==="parallel"?{}:{lane:ue},index:De},$,N);return}if(ce.contains("worker-card__place")){ze(x);return}if(ce.contains("mon-op--up")||ce.contains("mon-op--down")){let ue=Number(b.getAttribute("data-queue-index")||0)||0,De=ce.contains("mon-op--up")?ue-1:ue+1;if(De<0)return;P("worker-queue-reorder",{bead_id:K,.../^s[1-5]$/.test(b.dataset.lane||"")?{lane:b.dataset.lane}:{},to_index:De},$,N);return}if(ce.contains("mon-op--remove")){P("worker-queue-remove",{bead_id:K},$,N);return}if(ce.contains("mon-op--pause")){R("worker-attempt-pause",{attempt_id:Z},$);return}if(ce.contains("mon-op--discard")){if(!d(Bn(K,"unmerged")))return;m({bead_id:K,...Z?{attempt_id:Z}:{},...x.dataset.operationId?{operation_id:x.dataset.operationId}:{}},$,N);return}if(ce.contains("mon-op--resume")){an().then(ue=>{if(ue!==null)return L("worker-attempt-resume",{attempt_id:Z,...ue!==""?{instructions:ue}:{}},$,N)});return}if(ce.contains("mon-op--dismiss")){P("worker-attempt-dismiss",{attempt_id:Z},$,N);return}if(ce.contains("worker-mini__merge")){let ue=D($,K);ue?.mismatch&&ue.continuation===null?B($,K,N,ue.mismatch):P("worker-merge-queue-add",{bead_id:K},$,N);return}if(ce.contains("worker-mini__merge-cancel")){P("worker-merge-queue-remove",{bead_id:K},$,N);return}if(ce.contains("worker-mini__discard")){let ue=x.dataset.discardMode==="merged"?"merged":"unmerged";if(!d(Bn(K,ue)))return;m({bead_id:K,...Z?{attempt_id:Z}:{},...x.dataset.operationId?{operation_id:x.dataset.operationId}:{}},$,N);return}if(ce.contains("worker-mini__revise-fix")){L("worker-revise-fix",{bead_id:K},$,N);return}ce.contains("worker-mini__revise-approve")&&P("worker-revise-approve",{bead_id:K},$,N)}function W(b){b.querySelector(".mon-link__list")?.replaceChildren();let $=b.querySelector(".mon-link__search");$&&($.value="");let N=b.querySelector(".mon-link__direct");N&&(N.hidden=!0,N.dataset.targetId="",N.textContent="");let K=b.querySelector(".mon-link__empty");K&&(K.hidden=!0);let Z=b.querySelector(".mon-link__error");Z&&(Z.hidden=!0,Z.textContent="")}function oe(b,x){let $=b.querySelector(".mon-link__list");if(!$)return;let N=document.createDocumentFragment(),K=Tc(O).filter(Z=>Z.id!==x);for(let Z of K){let ce=document.createElement("button");ce.type="button",ce.className="mon-link__candidate",ce.dataset.targetId=Z.id,ce.dataset.search=`${Z.id} ${Z.title} ${Z.location}`.toLocaleLowerCase();let ue=document.createElement("strong");ue.textContent=Z.id;let De=document.createElement("span");De.textContent=Z.title;let ye=document.createElement("small");ye.textContent=Z.location,ce.append(ue,De,ye),N.append(ce)}$.replaceChildren(N)}function Oe(){for(let b of Array.from(S.querySelectorAll(".mon-card-popover"))){let x=b;x.hidden=!0,x.classList.contains("mon-link__popover")&&W(x)}for(let b of Array.from(S.querySelectorAll('[aria-expanded="true"]')))b.setAttribute("aria-expanded","false")}function ze(b){let $=b.closest(".mon-place")?.querySelector(".mon-place__popover")||null;if(!$)return;let N=$.hidden;Oe(),N&&($.hidden=!1,b.setAttribute("aria-expanded","true"))}function Ve(b){let $=b.closest(".mon-link")?.querySelector(".mon-link__popover")||null;if(!$)return;let N=$.hidden;if(Oe(),N){let K=b.closest(".mon-card");oe($,K?.getAttribute("data-issue-id")||""),$.hidden=!1,b.setAttribute("aria-expanded","true");let Z=$.querySelector(".mon-link__search");Z&&(Ie(Z),Z.focus())}}function Ie(b){let x=b.closest(".mon-link__popover"),$=b.closest(".mon-card");if(!x||!$)return;let N=b.value.trim(),K=N.toLocaleLowerCase(),Z=0,ce=!1;for(let Ae of Array.from(x.querySelectorAll(".mon-link__candidate"))){let Se=Ae,Ke=Se.dataset.targetId||"",z=K.length===0||(Se.dataset.search||"").includes(K);Se.hidden=!z,z&&(Z+=1),Ke.toLocaleLowerCase()===K&&(ce=!0)}let ue=x.querySelector(".mon-link__direct"),De=$.getAttribute("data-issue-id")||"";if(ue){let Ae=N.length>0&&!ce&&K!==De.toLocaleLowerCase();ue.hidden=!Ae,ue.dataset.targetId=Ae?N:"",ue.textContent=Ae?`\uC9C1\uC811 \uC785\uB825 \xB7 ${N}`:"",Ae&&(Z+=1)}let ye=x.querySelector(".mon-link__empty");ye&&(ye.hidden=Z>0);let Ne=x.querySelector(".mon-link__error");Ne&&(Ne.hidden=!0,Ne.textContent="")}function lt(b){let x=b.target;x&&S.contains(x)&&typeof x.closest=="function"&&x.closest(".mon-popover-owner")||Oe()}function Qe(b){if(b.key!=="Escape")return;let x=S.querySelector('[aria-expanded="true"]');Oe(),x?.focus()}function V(b){let x=q;q=!1;let $=b.target;if(!$||typeof $.closest!="function"||$.closest("dialog")||$.closest("a"))return;let N=$.closest(".mon-running-sort");if(N){b.preventDefault(),f=N.getAttribute("data-sort")==="repo"?"repo":"started",wm(f),je();return}let K=$.closest(".mon-auto-all");if(K){b.preventDefault(),H(K.getAttribute("data-on")==="true");return}if($.closest(".mon-merge-all")){b.preventDefault(),se();return}let ce=$.closest(".mon-ctl--advance");if(ce){b.preventDefault();let{root_dir:Ae,revision:Se}=We(ce);P("worker-automation-toggle",{on:ce.getAttribute("data-on")==="true"},Ae,Se);return}let ue=$.closest(".mon-ctl--merge-auto");if(ue){b.preventDefault();let{root_dir:Ae,revision:Se}=We(ue);P("worker-merge-auto-toggle",{on:ue.getAttribute("data-on")==="true"},Ae,Se);return}let De=$.closest(".mon-card");if(!De)return;let ye=$.closest("button");if(ye){b.preventDefault(),Y(De,ye);return}let Ne=De.getAttribute("data-issue-id");Ne&&!x&&(b.preventDefault(),xe(Ne,De.getAttribute("data-root-dir")||""))}function te(b){let x=b.target;if(!x||typeof x.closest!="function")return;let $=x.closest(".mon-filter__blocked");if($){h={show_blocked:$.checked},gm(h),je();return}let N=x.closest(".mon-done-range");if(N){p=Wt(N.value)?N.value:Nt,ym(p),je();return}let K=x.closest(".mon-slots__input");if(!K)return;let{root_dir:Z,revision:ce}=We(K),ue=Number(K.value);if(!Number.isFinite(ue))return;let De=Math.max(Hn,Math.floor(ue));P("worker-queue-set-slots",{slots:De},Z,ce)}function Me(b){let x=b.target;x?.classList.contains("mon-link__search")&&Ie(x)}e.addEventListener("click",V),e.addEventListener("change",te),e.addEventListener("input",Me),e.addEventListener("dragstart",Ue),e.addEventListener("dragover",_e),e.addEventListener("dragleave",Le),e.addEventListener("drop",$e),e.addEventListener("dragend",he),document.addEventListener("click",lt),document.addEventListener("keydown",Qe),s&&typeof s.subscribe=="function"&&(ee=s.subscribe(()=>{try{U.clear(),je()}catch{}}));function He(){Q!==null&&(clearInterval(Q),Q=null)}function fe(){de!==null&&(clearTimeout(de),de=null)}return{load(){r("load"),je(),Q===null&&(Q=setInterval(()=>{try{if(S.querySelector(".mon-card-popover:not([hidden])"))return;je()}catch{}},km))},pause(){He()},clear(){He(),fe(),ee&&(ee(),ee=null),e.removeEventListener("click",V),e.removeEventListener("change",te),e.removeEventListener("input",Me),e.removeEventListener("dragstart",Ue),e.removeEventListener("dragover",_e),e.removeEventListener("dragleave",Le),e.removeEventListener("drop",$e),e.removeEventListener("dragend",he),document.removeEventListener("click",lt),document.removeEventListener("keydown",Qe),e.replaceChildren()}}}function ou(e,t,r){let n=gt("views:nav"),s=null;function o(u){return d=>{d.preventDefault(),n("click tab %s",u),r.gotoView(u)}}function a(){let u=t.getState(),d=u.view==="worker"||u.view==="monitor"?u.view:"board";return i`
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
    `}function c(){Ze(a(),e)}return c(),s=t.subscribe(()=>c()),{destroy(){s&&(s(),s=null),Ze(i``,e)}}}var au=["bug","feature","task","epic","chore"];function iu(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var lu=["Critical","High","Medium","Low","Backlog"];function cu(e,t){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,e.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),a=r.querySelector("#new-priority"),c=r.querySelector("#new-labels"),u=r.querySelector("#new-description"),d=r.querySelector("#new-issue-error"),p=r.querySelector("#btn-cancel"),f=r.querySelector("#btn-create"),h=r.querySelector(".new-issue__close");function A(){o.replaceChildren();let L=document.createElement("option");L.value="",L.textContent="\u2014 Select \u2014",o.appendChild(L);for(let B of au){let m=document.createElement("option");m.value=B,m.textContent=iu(B),o.appendChild(m)}a.replaceChildren();for(let B=0;B<=4;B+=1){let m=document.createElement("option");m.value=String(B);let R=lu[B]||"Medium";m.textContent=`${B} \u2013 ${R}`,a.appendChild(m)}}A();function S(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function O(L){s.disabled=L,o.disabled=L,a.disabled=L,c.disabled=L,u.disabled=L,p.disabled=L,f.disabled=L,f.textContent=L?"Creating\u2026":"Create"}function U(){d.textContent=""}function ee(L){d.textContent=L}function Q(){try{let L=window.localStorage.getItem("beads-ui.new.type");L?o.value=L:o.value="";let B=window.localStorage.getItem("beads-ui.new.priority");B&&/^\d$/.test(B)?a.value=B:a.value="2"}catch{o.value="",a.value="2"}}function P(){let L=o.value||"",B=a.value||"";L.length>0&&window.localStorage.setItem("beads-ui.new.type",L),B.length>0&&window.localStorage.setItem("beads-ui.new.priority",B)}async function D(){U();let L=String(s.value||"").trim();if(L.length===0){ee("Title is required"),s.focus();return}let B=Number(a.value||"2");if(!(B>=0&&B<=4)){ee("Priority must be 0..4"),a.focus();return}let m=String(o.value||""),R=String(u.value||""),H={title:L};m.length>0&&(H.type=m),String(B).length>0&&(H.priority=B),R.length>0&&(H.description=R),O(!0);try{await t("create-issue",H)}catch{O(!1),ee("Failed to create issue");return}P(),O(!1),S()}return r.addEventListener("cancel",L=>{L.preventDefault(),S()}),h.addEventListener("click",()=>S()),p.addEventListener("click",()=>S()),r.addEventListener("keydown",L=>{L.key==="Enter"&&(L.ctrlKey||L.metaKey)&&(L.preventDefault(),D())}),n.addEventListener("submit",L=>{L.preventDefault(),D()}),{open(){n.reset(),U(),Q();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){S()}}}var Am=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function Sm(e,t){return To(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function uu(e,t,r){return i`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?i`<div class="settings-dialog__empty">라벨 없음</div>`:i`<div class="settings-dialog__pills">
            ${t.map(n=>{let s=Sm(n,e);return i`<button
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
  `}function du(e,t,r){return i`
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
  `}function pu(e,t){return i`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${Am.map(([r,n])=>i`<label class="settings-dialog__toggle">
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
  `}var Em=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}],Ft="";function jt(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function fu(e,t){let{transport:r,policyStore:n,labelOptions:s}=t,o=t.notify||(b=>ie(b,"error",4e3)),a=document.createElement("dialog");a.id="settings-dialog",a.className="settings-dialog",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","\uC124\uC815"),e.appendChild(a);let c="execution",u=!1,d="",p={},f={},h=[],A=!1,S=null,O={},U="",ee="",Q=!1,P=!1,D=!1,L=null;function B(){let b=t.queueStore?.get();return jt(b)?b.runner_catalog:null}function m(){let b=t.queueStore?.get();return jt(b)&&jt(b.execution_defaults)?b.execution_defaults:null}function R(){let b=t.implPresetStore?.get();return jt(b)&&Array.isArray(b.presets)?b:null}async function H(){A=!0,Ie();try{let b=await r("get-session-defaults",{});p=jt(b?.values)?{...b.values}:{},f={...p},h=Array.isArray(b?.warnings)?b.warnings:[]}catch(b){h=["kv_read_failed"],o(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${b instanceof Error?b.message:String(b)}`)}finally{A=!1,Ie()}}async function se(){let b=nc(p,f);if(Object.keys(b).length!==0){try{let x=await r("set-session-defaults",{values:b});p=jt(x?.values)?{...x.values}:{},f={...p},h=Array.isArray(x?.warnings)?x.warnings:[]}catch(x){o(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${x instanceof Error?x.message:String(x)}`)}Ie()}}function M(b,x){x===Ft?delete f[b]:f[b]=x,Ie(),se()}async function q(){let b=t.queueStore?.get();if(!jt(b))return;let x={orchestration_model:b.orchestration_model??null,orchestration_effort:b.orchestration_effort??null,orchestration_speed:b.orchestration_speed??null},$=sc(x,{...x,...O});if(Object.keys($).length!==0){try{let N=await r("worker-queue-set-orchestration-defaults",{expected_revision:b.revision,values:$});if(N&&N.applied===!1){o("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}O={}}catch(N){o(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${N instanceof Error?N.message:String(N)}`)}Ie()}}function de(b,x){O[b]=x===Ft?null:x,Ie(),q()}async function ge(b){let x=t.queueStore?.get();if(!(!jt(x)||b<1)){try{await r("worker-queue-set-slots",{expected_revision:x.revision,slots:b})}catch($){o(`slots \uC800\uC7A5 \uC2E4\uD328: ${$ instanceof Error?$.message:String($)}`)}Ie()}}function pe(){let b={},x=We();for(let $ of ec){let N=Cr.includes($)?x[$]:f[$];typeof N=="string"&&N.length>0&&(b[$]=N)}return b}async function Fe(){let b=R();if(!b)return;let x=pe();if(Object.keys(x).length===0){o("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let $=(b.presets||[]).find(K=>K.id===U),N=ee.trim()||($?$.name:"");if(!N){o("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let K=$?await r("impl-preset-update",{expected_revision:b.revision,id:$.id,name:N,settings:x}):await r("impl-preset-create",{expected_revision:b.revision,name:N,settings:x});if(K&&K.applied){if(ee="",!$&&Array.isArray(K.presets)){let Z=K.presets.find(ce=>ce.name===N);U=Z?Z.id:U}Ie()}else o("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Ie()}catch(K){o(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${K instanceof Error?K.message:String(K)}`)}}async function rt(){let b=R();if(!(!b||U.length===0))try{let x=await r("impl-preset-delete",{expected_revision:b.revision,id:U});x&&x.applied?(U="",Ie()):(o("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Ie())}catch(x){o(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${x instanceof Error?x.message:String(x)}`)}}async function Ue(){let b=R(),x=t.queueStore?.get();if(!(!b||!jt(x)||U.length===0)){try{let $=await r("apply-impl-preset-global",{preset_id:U,expected_revision:b.revision,expected_queue_revision:x.revision});$&&$.applied?(p=jt($.values)?{...$.values}:{},f={...p},h=Array.isArray($.warnings)?$.warnings:[],jt($.queue)&&(t.queueStore?.set?.($.queue),O={}),$.queue_applied===!1&&o("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694")):$&&$.conflict&&o("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch($){o(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${$ instanceof Error?$.message:String($)}`)}Ie()}}async function _e(){P=!0,D=!1,Ie();try{let b=await r("get-worker-system-prompt",{});!b||typeof b!="object"||Array.isArray(b)?D=!0:L=b}catch{D=!0}finally{P=!1,Ie()}}function Le(){if(Q=!Q,Q&&!L){_e();return}Ie()}function he(){let b=dn({loading:P,error:D});if(b)return b;if(!L)return"";let x=Array.isArray(L.variants)?L.variants:[];return i`<div class="settings-dialog__sp-body">
      ${L.target_base_placeholder?i`<div class="prompt-block__meta">
            \`${L.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${x.map($=>i`<div class="settings-dialog__sp-variant" data-variant=${$.key}>
            <div class="settings-dialog__sp-cond">${$.condition}</div>
            ${hr($.label,$.system_prompt)}
          </div>`)}
    </div>`}function $e(){return i`<section
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
        aria-expanded=${Q?"true":"false"}
        @click=${Le}
      >
        ${Q?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${Q?he():""}
    </section>`}function Re(b,x,$,N,K,Z,ce){let ue=K[b]??Ft,De=aa(b,$,K,m(),B(),ce),ye=De.options.find(Ae=>Ae.value===ue),Ne=ue===Ft?De.full_value:ye?.full_value;return i`<select
        class=${ue===Ft?"settings-dialog__unset":""}
        data-key=${b}
        aria-label=${x}
        title=${Ne||""}
        ?disabled=${Z===!0||De.disabled}
        .value=${zr(String(ue))}
        @change=${Ae=>N(b,String(Ae.target.value))}
      >
        <option value=${Ft} ?selected=${ue===Ft}>
          ${De.unset_label}
        </option>
        ${De.options.map(Ae=>i`<option
              value=${Ae.value}
              title=${Ae.full_value||""}
              ?selected=${Ae.value===ue}
            >
              ${Ae.label}
            </option>`)}
      </select>
      ${ue===Ft?i`<span class="settings-dialog__source-badge">기본</span>`:""}`}function je(b,x,$,N,K,Z=!1,ce){return i`<div
      class=${`settings-dialog__row${Z?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${x}</span>
      <span class="settings-dialog__controls">
        ${Re(b,x,$,N,K,Z,ce)}
      </span>
    </div>`}function xe(b,x,$,N,K){return i`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${x}-on)`}
        ></i>
        ${b}
      </span>
      <span class="settings-dialog__controls">
        ${Re($,`${b} \uBAA8\uB378`,N,M,f,!1)}
        ${Re(K,`${b} effort`,Hs,M,f,!1)}
      </span>
    </div>`}function We(){let b=t.queueStore?.get(),x={};for(let $ of Cr)x[$]=Object.prototype.hasOwnProperty.call(O,$)?O[$]:jt(b)&&typeof b[$]=="string"?b[$]:null;return x}function Xe(){let b=B(),x=f.impl_runtime,$=f.impl_model,N=R(),K=t.queueStore?.get(),Z=We(),ce=Gs(b,S),ue=Fn(b,void 0).filter(Se=>Se!==rr),De=pn(b,S||void 0,Z.orchestration_model||rr).filter(Se=>Se!==rr),ye=jt(K)&&typeof K.slots=="number"?K.slots:2,Ne=m()?.supported===!0,Ae=aa("workflow_mode",Nn,f,m(),b);return i`
      <section
        class=${`settings-dialog__pane${c==="execution"?" settings-dialog__pane--active":""}`}
        role="tabpanel"
        id="settings-pane-execution"
        aria-label="실행 설정"
      >
        <header class="settings-dialog__pane-head"><h2>실행 설정</h2></header>
        <p class="settings-dialog__pane-sub">
          세션 기본값과 Worker 오케스트레이션을 한곳에서 편집합니다. 저장소와
          저장 경로는 설정 그룹별로 유지됩니다.
        </p>
        ${h.length>0?i`<div class="settings-dialog__banner" role="alert">
              워크스페이스 기본값을 일부 읽지 못했습니다 —
              ${h.join(", ")}
            </div>`:""}
        ${Ne?"":i`<div
              class="settings-dialog__banner settings-dialog__banner--projection"
              data-execution-defaults-warning
              role="alert"
            >
              실행 기본값 projection을 확인할 수 없습니다 — 기본값 확인 불가
            </div>`}
        ${A?i`<div class="settings-dialog__empty">불러오는 중…</div>`:i`
              <div class="settings-dialog__preset-bar">
                <select
                  aria-label="실행 프리셋"
                  .value=${zr(U)}
                  @change=${Se=>{U=String(Se.target.value),Ie()}}
                >
                  <option value="" ?selected=${U===""}>
                    실행 프리셋…
                  </option>
                  ${(N?.presets||[]).map(Se=>i`<option
                        value=${Se.id}
                        ?selected=${Se.id===U}
                      >
                        ${Se.name}
                      </option>`)}
                </select>
                <button
                  type="button"
                  class="settings-dialog__btn settings-dialog__btn--primary"
                  data-preset-apply-global
                  ?disabled=${U.length===0}
                  @click=${Ue}
                >
                  전역 기본값으로 적용
                </button>
                <input
                  type="text"
                  class="settings-dialog__preset-name"
                  placeholder=${U?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                  aria-label="프리셋 이름"
                  .value=${zr(ee)}
                  @input=${Se=>{ee=String(Se.target.value)}}
                />
                <button
                  type="button"
                  class="settings-dialog__btn"
                  data-preset-save
                  @click=${Fe}
                >
                  ${U?"\uAC31\uC2E0":"\uC800\uC7A5"}
                </button>
                <button
                  type="button"
                  class="settings-dialog__btn"
                  data-preset-delete
                  ?disabled=${U.length===0}
                  @click=${rt}
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
                      .value=${zr(S||Ft)}
                      @change=${Se=>{let Ke=String(Se.target.value);S=Ke===Ft?null:Ke,Ie()}}
                    >
                      <option
                        value=${Ft}
                        ?selected=${!S}
                      >
                        전체
                      </option>
                      <option
                        value="claude"
                        ?selected=${S==="claude"}
                      >
                        claude
                      </option>
                      <option
                        value="codex"
                        ?selected=${S==="codex"}
                      >
                        codex
                      </option>
                    </select>
                    <span class="settings-dialog__hint"
                      >모델 목록을 좁힙니다</span
                    >
                  </span>
                </div>
                ${je("orchestration_model","\uBAA8\uB378",ce,de,Z)}
                ${je("orchestration_effort","effort",De,de,Z)}
                ${je("orchestration_speed","\uC18D\uB3C4",Dn,de,Z)}
              </div>

              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">워크플로우</div>
                <div class="settings-dialog__row">
                  <span class="settings-dialog__row-label">모드</span>
                  <span class="settings-dialog__controls">
                    <span class="settings-dialog__seg" role="group">
                      <button
                        type="button"
                        data-mode=${Ft}
                        aria-pressed=${String(!f.workflow_mode)}
                        @click=${()=>M("workflow_mode",Ft)}
                      >
                        ${Ae.unset_label}
                      </button>
                      ${f.workflow_mode?"":i`<span class="settings-dialog__source-badge"
                            >기본</span
                          >`}
                      ${Nn.map(Se=>i`<button
                            type="button"
                            data-mode=${Se}
                            aria-pressed=${String(f.workflow_mode===Se)}
                            @click=${()=>M("workflow_mode",Se)}
                          >
                            ${Se}
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
                ${xe("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",qn,"spec_review_effort")}
                ${xe("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",zs,"plan_review_effort")}
                ${xe("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",qn,"impl_review_effort")}
              </div>

              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">
                  구현
                  <span class="settings-dialog__hint"
                    >이슈 핀이 있으면 핀이 우선합니다</span
                  >
                </div>
                ${je("impl_runtime","\uC704\uC784 \uB300\uC0C1",Ws,M,f)}
                ${je("impl_model","\uBAA8\uB378",Fn(b,x),M,f)}
                ${je("impl_effort","effort",pn(b,x,$),M,f)}
                ${je("impl_speed","\uC18D\uB3C4",Dn,M,f)}
                ${je("quick_fix_impl_model","quick_fix \uAD6C\uD604 \uBAA8\uB378",ue,M,f,!1,{...f,...Z})}
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
                        @click=${()=>ge(ye-1)}
                      >
                        −
                      </button>
                      <span class="settings-dialog__stepper-value"
                        >${ye}</span
                      >
                      <button
                        type="button"
                        aria-label="slots 증가"
                        @click=${()=>ge(ye+1)}
                      >
                        +
                      </button>
                    </span>
                  </span>
                </div>
              </div>
              ${$e()}
            `}
      </section>
    `}function Te(){let b=n.get();return i`
      <section
        class=${`settings-dialog__pane${c==="display"?" settings-dialog__pane--active":""}`}
        role="tabpanel"
        id="settings-pane-display"
        aria-label="표시 설정"
      >
        <header class="settings-dialog__pane-head"><h2>표시 설정</h2></header>
        <p class="settings-dialog__pane-sub">
          이 워크스페이스의 라벨·칩 표시 정책입니다.
        </p>
        ${b?i`
              ${uu(b,s(),oe)}
              ${du(b,d,{onDraft:x=>{d=x},onAdd:Oe,onRemove:ze})}
              ${pu(b,Ve)}
            `:i`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function ot(b){let x=n.get();if(x)try{let $=await r("display-policy-set",{expected_revision:x.revision,policy:b(x)});Y($),$&&$.conflict&&$.policy&&($=await r("display-policy-set",{expected_revision:$.policy.revision,policy:b($.policy)}),Y($)),$&&$.conflict&&o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function Y(b){b&&b.policy&&typeof b.policy=="object"&&n.set(b.policy)}function W(b){ot(b)}function oe(b){let x=n.get();if(!x)return;let $=!Tm(b,x);W(N=>Cm(b,N,$))}function Oe(){let b=d.trim();b.length!==0&&(d="",W(x=>x.hidden_prefixes.includes(b)?{hidden_prefixes:x.hidden_prefixes}:{hidden_prefixes:[...x.hidden_prefixes,b]}),Ie())}function ze(b){W(x=>({hidden_prefixes:x.hidden_prefixes.filter($=>$!==b)}))}function Ve(b){let x=n.get();if(!x)return;let $=x.chips[b]===!1;W(()=>({chips:{[b]:$}}))}function Ie(){Ze(i`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${Em.map(b=>i`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${b.id}
                  aria-selected=${String(c===b.id)}
                  aria-controls=${`settings-pane-${b.id}`}
                  @click=${()=>lt(b.id)}
                >
                  <span class="settings-dialog__glyph">${b.glyph}</span>
                  ${b.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${fe}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${Xe()} ${Te()}
          </div>
        </div>
      `,a)}function lt(b){c=b,Ie()}let Qe=()=>{u=!1,t.onOpenChange?.(!1)};a.addEventListener("close",Qe),a.addEventListener("cancel",Qe);let V=b=>{b.target===a&&fe()};a.addEventListener("click",V);let te=null;n.subscribe&&(te=n.subscribe(()=>{u&&Ie()}));let Me=null;t.implPresetStore?.subscribe&&(Me=t.implPresetStore.subscribe(()=>{u&&Ie()}));function He(b="execution"){u||(u=!0,t.onOpenChange?.(!0),c=b,d="",O={},Ie(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),H())}function fe(){u&&(u=!1,t.onOpenChange?.(!1),typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:He,close:fe,sessionDraft:()=>({...f}),destroy(){u=!1,a.removeEventListener("close",Qe),a.removeEventListener("cancel",Qe),a.removeEventListener("click",V),te&&(te(),te=null),Me&&(Me(),Me=null),a.remove()}}}function Tm(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(r=>r.length>0&&e.startsWith(r))}function Cm(e,t,r){if(!r)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let n=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:n,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:n}}var Rm=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],_u="usage-meter-card",mu=600,Im=["token_expired","relogin_required"];function gu(e){return String(e).padStart(2,"0")}function Lm(e,t){let r=Math.max(0,Math.ceil((e-t)/6e4)),n=Math.floor(r/1440),s=Math.floor(r%1440/60),o=r%60;return n>0?`${n}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function Om(e,t=Date.now()){let r=Date.parse(e);if(!Number.isFinite(r))return"";let n=new Date(r),s=new Date(t),o=`${gu(n.getHours())}:${gu(n.getMinutes())}`,c=n.getFullYear()===s.getFullYear()&&n.getMonth()===s.getMonth()&&n.getDate()===s.getDate()?o:`${Rm[n.getMonth()]} ${n.getDate()} ${o}`;return`${Lm(r,t)} \xB7 ${c}`}function Mm(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function bu(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function hu(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var yu=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function wu(e){let t=[];for(let r of e){if(!r||typeof r!="object")continue;let n=r;typeof n.key!="string"||n.key.length===0||typeof n.pct!="number"||!Number.isFinite(n.pct)||t.push({key:n.key,pct:n.pct,resetsAt:typeof n.resetsAt=="string"?n.resetsAt:""})}return t}function Pm(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:wu(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function Dm(e){if(!e||typeof e!="object")return null;let t=e,r=[];if(Array.isArray(t.accounts))for(let s of t.accounts){let o=Pm(s);o&&r.push(o)}let n=t.available===!0&&Array.isArray(t.windows);return!n&&r.length===0?null:{available:n,windows:n?wu(t.windows):[],ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null,accounts:r}}function vu(e,t){return`${e}:${t}`}function ku(e){let t=!1,r=null,n=new Map,s=null,o=new Map,a=new Map,c=0;function u(){Ze(i``,e),e.hidden=!0}function d(M){r!==M&&(r===null&&(document.addEventListener("mousedown",f),document.addEventListener("keydown",h)),r=M)}function p(){r!==null&&(r=null,document.removeEventListener("mousedown",f),document.removeEventListener("keydown",h))}function f(M){let q=M.target;q&&e.contains(q)||(p(),R())}function h(M){M.key==="Escape"&&(p(),R())}function A(M){r===M?p():d(M),R()}function S(){p(),R()}async function O(M,q){if(n.has(M.key))return;let de=vu(M.key,q);n.set(M.key,q),a.delete(de),R();let ge=null;try{ge=await(await fetch(M.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:q})})).json()}catch{ge=null}if(t)return;if(n.delete(M.key),!ge||ge.ok!==!0){let Fe=ge&&typeof ge.error=="string"&&ge.error.length>0?ge.error:"network_error";a.set(de,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${Fe}`}),R();return}let pe=Array.isArray(ge.warnings)?ge.warnings.filter(Fe=>typeof Fe=="string"&&Fe.length>0):[];pe.length>0&&a.set(de,{kind:"warn",text:pe.join(" \xB7 ")}),R(),await se()}function U(M,q,de,ge){let pe=hu(M.pct),rt=`resets ${Om(M.resetsAt,ge)}${q?` \xB7 ${de}`:""}`;return i`<span
      class="usage-meter__window ${bu(pe)}"
      style=${`--progress: ${pe}%`}
      title=${rt}
    >
      <span class="usage-meter__label">${M.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${pe}%</span>
    </span>`}function ee(M,q,de){let ge=q.available&&typeof q.ageSeconds=="number"&&q.ageSeconds>mu,pe=ge&&typeof q.ageSeconds=="number"?`${Math.floor(q.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"",Fe=q.accounts.filter(Le=>!Le.active).length,rt=`usage-meter__group${ge?" usage-meter__group--stale":""}`,Ue=i`<span class="usage-meter__provider"
        >${M.label}</span
      >
      ${q.available?q.windows.map(Le=>U(Le,ge,pe,de)):i`<span class="usage-meter__empty">사용량 없음</span>`}
      ${Fe>0?i`<span class="usage-meter__badge">+${Fe}</span>`:""}`;if(q.accounts.length===0)return i`<span
        class=${rt}
        aria-label=${`${M.label} usage`}
        >${Ue}</span
      >`;let _e=r===M.key;return i`<button
      type="button"
      class=${`usage-meter__toggle ${rt}`}
      aria-label=${`${M.label} usage`}
      aria-expanded=${_e?"true":"false"}
      aria-controls=${_u}
      @click=${()=>A(M.key)}
    >
      ${Ue}
    </button>`}function Q(M,q){return i`<span class="usage-meter" aria-label="Usage">
      ${M.map(de=>ee(de.provider,de.snapshot,q))}
    </span>`}function P(M){let q=hu(M.pct);return i`<span
      class="usage-meter__account-window ${bu(q)}"
      style=${`--progress: ${q}%`}
    >
      <span class="usage-meter__account-key">${M.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${q}%</span>
    </span>`}function D(M,q){return Im.includes(q)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${M.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function L(M,q){let de=q.status==="ok",ge=typeof q.ageSeconds=="number"&&q.ageSeconds>mu,pe=a.get(vu(M.key,q.number)),Fe=n.get(M.key),rt=Fe!==void 0,Ue=Fe===q.number,_e=["usage-meter__account"];return q.active&&_e.push("usage-meter__account--active"),de||_e.push("usage-meter__account--unavailable"),ge&&_e.push("usage-meter__account--stale"),i`<div class=${_e.join(" ")}>
      <div class="usage-meter__account-head">
        <span class="usage-meter__account-label" title=${q.email}
          >${q.alias===null?q.email:q.alias}</span
        >
        ${q.plan===null?"":i`<span class="usage-meter__account-tag">${q.plan}</span>`}
        ${q.active?i`<span
              class="usage-meter__account-tag usage-meter__account-tag--active"
              >active</span
            >`:""}
        ${q.ageSeconds===null?"":i`<span class="usage-meter__account-age"
              >${Mm(q.ageSeconds)}</span
            >`}
        ${q.active?"":i`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${rt}
              @click=${()=>{O(M,q.number)}}
            >
              ${Ue?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${de?i`<div class="usage-meter__account-windows">
            ${q.windows.map(Le=>P(Le))}
          </div>`:i`<div class="usage-meter__account-status">
            ${D(M,q.status)}
          </div>`}
      ${pe===void 0?"":i`<div
            class="usage-meter__account-message usage-meter__account-message--${pe.kind}"
          >
            ${pe.text}
          </div>`}
    </div>`}function B(M,q){let de=q.accounts.filter(ge=>ge.active).length;return i`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${M.label} · 활성 ${de} / 전체
        ${q.accounts.length}
      </h2>
      ${q.accounts.map(ge=>L(M,ge))}
    </section>`}function m(M){return i`<div
      class="usage-meter__card"
      id=${_u}
      role="dialog"
      aria-label=${`${M.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${B(M.provider,M.snapshot)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function R(){let M=[];for(let ge of yu){let pe=o.get(ge.key);pe&&M.push({provider:ge,snapshot:pe})}if(M.length===0){p(),u();return}let q=M.find(ge=>ge.provider.key===r&&ge.snapshot.accounts.length>0);q||p();let de=Date.now();Ze(i`${Q(M,de)}
      ${q?i`<div
              class="usage-meter__scrim"
              aria-hidden="true"
              @mousedown=${S}
            ></div>
            ${m(q)}`:""}`,e),e.hidden=!1}async function H(M){try{let q=await fetch(M.endpoint);return q.ok?Dm(await q.json()):null}catch{return null}}async function se(){c+=1;let M=c,q=await Promise.all(yu.map(async de=>({provider:de,snapshot:await H(de)})));if(!(t||M!==c)){for(let de of q)de.snapshot?o.set(de.provider.key,de.snapshot):o.delete(de.provider.key);R()}}return u(),se(),s=setInterval(()=>{se()},6e4),{destroy(){t=!0,s!==null&&(clearInterval(s),s=null),p(),u()}}}function $u(e){let t=e.attempts?Object.values(e.attempts):[],r=new Map;for(let s of t)s&&r.set(s.bead_id,s.attempt_id);let n=new Map;for(let s of e.done||[])s&&typeof s.bead_id=="string"&&typeof s.added_at=="number"&&n.set(s.bead_id,s.added_at);return s=>{let o=r.get(s.bead_id)!==s.attempt_id,a=n.get(s.bead_id),c=typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at;return!o&&!c&&typeof s.dismissed_at!="number"}}var Nm="worker-ineligible";function Ta(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function xu(e){return Ta(e).includes(Nm)}var qm="worker-serial";function Ca(e){return Ta(e).includes(qm)}function Ra(e,t,r){if(typeof t!="string"||typeof r!="string")return[];let n=e?.runners;if(!n||!Object.hasOwn(n,t))return[];let s=n[t],o=s?.models;if(!o||!Object.hasOwn(o,r))return[];let a=o[r]?.efforts;return Array.isArray(a)?a.slice():Array.isArray(s.efforts)?s.efforts.slice():[]}var Fm=new Set(["done","failed","orphaned","stopped","discarded"]),jm={spec_missing:"\uC2A4\uD399 \uC5C6\uC74C",route:"route \uBBF8\uB2EC",spec_review:"\uC2A4\uD399 \uB9AC\uBDF0 \uC5C6\uC74C",spec_conflict:"\uC2A4\uD399 \uCDA9\uB3CC",phase_child:"phase child",worker_ineligible:"worker \uC81C\uC678"},Bm={running:"\uC2E4\uD589 \uC911",success:"\uC131\uACF5",failure:"\uC2E4\uD328",cancelled:"\uCDE8\uC18C",interrupted:"\uC911\uB2E8"},Um={running:"running",success:"done",failure:"failed",cancelled:"stopped",interrupted:"orphaned"};function Ia(e){return{runner:e.runner||void 0,model:e.model||void 0,effort:e.effort||void 0,status:Um[e.outcome]||(typeof e.job_id=="string"?"running":void 0),session_id:e.session_id||void 0}}function Au(e,t){let{queueStore:r,analysisStore:n,transport:s,getWorkspacePath:o,onOpenTranscript:a}=t,c=document.createElement("dialog");c.id="worker-parallel-analysis-dialog",c.className="pa",c.setAttribute("role","dialog"),c.setAttribute("aria-modal","true"),e.appendChild(c);let u=new Map,d=new Map,p=!1,f=null,h=null,A=null,S=new Set,O=!1,U=0,ee=null,Q=new Set;function P(){return r&&r.get()||{revision:0,queue:[],serial_lanes:[],serial_lane_count:0,attempts:{},pr_wait:[]}}function D(){return n&&n.get()||{settings:{revision:0,runner:null,model:null,effort:null},job:null,runs:[],last_good:null}}function L(){return o&&o()||""}async function B(){if(!s)return;let k=++U;O=!0,A=null,S.clear(),ye();try{let C=await s("worker-parallel-analysis-targets",{root_dir:L()});if(k!==U||!Ne)return;let F=Array.isArray(C?.qualified)?C.qualified:[],J=Array.isArray(C?.excluded)?C.excluded:[];A={qualified:F,excluded:J};for(let ke of F)ke&&typeof ke.id=="string"&&S.add(ke.id)}catch{k===U&&Ne&&(A={qualified:[],excluded:[]},ie("\uBD84\uC11D \uB300\uC0C1\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800))}finally{k===U&&(O=!1,Ne&&ye())}}function m(k){return Array.isArray(k.runs)?k.runs:[]}function R(){let k=P(),C=new Set;for(let F of Object.values(k.attempts||{})){let J=F;J&&typeof J.bead_id=="string"&&!Fm.has(J.status)&&C.add(J.bead_id)}for(let F of Array.isArray(k.pr_wait)?k.pr_wait:[])F&&typeof F.bead_id=="string"&&C.add(F.bead_id);for(let F of Object.values(k.discard_operations||{})){let J=F;J&&J.phase!=="done"&&typeof J.bead_id=="string"&&C.add(J.bead_id)}return C}function H(k){return k.filter(C=>se(C)===null)}function se(k){let C=P();for(let F of Array.isArray(C.serial_lanes)?C.serial_lanes:[])if(Array.isArray(F?.entries)&&F.entries.some(J=>J.bead_id===k))return F.id;return(Array.isArray(C.queue)?C.queue:[]).some(F=>F.bead_id===k)?"parallel":null}function M(k,C){let F=u.get(k);return F||[...C.order]}function q(k){if(k.length<2)return!1;let C=se(k[0]);if(!C||C==="parallel")return!1;let F=P(),J=(Array.isArray(F.serial_lanes)?F.serial_lanes:[]).find(X=>X.id===C)?.entries.map(X=>X.bead_id);if(!Array.isArray(J))return!1;let ke=k.map(X=>J.indexOf(X));return ke.every(X=>X>=0)&&ke.every((X,Ee)=>Ee===0||X>ke[Ee-1])}function de(){let k=P(),C=Array.isArray(k.serial_lanes)?k.serial_lanes:[],F=C.find(J=>Array.isArray(J.entries)&&J.entries.length===0);return F?F.id:C[0]?.id||"s1"}function ge(k){let C=P().bead_titles||{};return typeof C[k]=="string"?C[k]:k}async function pe(k,C){if(!s||p)return null;p=!0,ye();try{return await s(k,C)}finally{p=!1,ye()}}async function Fe(k){n?.setPending?.(!0);try{let C=await pe("worker-parallel-analysis-start",{force:k,target_ids:Array.from(S)});C&&C.applied===!1&&C.reason&&(C.reason==="target_not_qualified"&&Array.isArray(C.detail)?ie(`\uBD84\uC11D \uB300\uC0C1 \uC790\uACA9 \uBCC0\uACBD: ${C.detail.join(", ")}`,"error",3200):ie(`\uBD84\uC11D \uC2E4\uD328: ${C.reason}`,"error",2800))}finally{n?.setPending?.(!1)}}async function rt(){let k=D().job;!s||!k||await s("worker-parallel-analysis-cancel",{job_id:k.job_id})}async function Ue(k){if(!(!s||Q.has(k))){Q.add(k),ye();try{let C=await s("worker-parallel-analysis-prompt",{root_dir:L(),run_id:k});if(!Ne)return;if(C?.ok===!0&&typeof C.prompt=="string"){ee={run_id:k,prompt:C.prompt};return}ie(C?.reason==="not_found"?"\uC800\uC7A5\uB41C \uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800)}finally{Q.delete(k),ye()}}}function _e(){ee=null,ye()}async function Le(){if(!ee)return;let k=await Xt(ee.prompt);ie(k?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",k?"success":"error",1400)}function he(k,C){a&&a(k,Ia(C))}function $e(){return P().runner_catalog}function Re(k){return Object.keys($e()?.runners?.[k]?.models||{})}function je(k){let C=Re(k),F=$e()?.runners?.[k]?.default_model;return typeof F=="string"&&C.includes(F)?F:C[0]||""}function xe(){let k=D().settings,C=f||k.runner||"claude",F=Re(C),J=f?je(C):k.model||F[0]||"",ke=Ra($e(),C,J),X=k.effort||"",Ee=ke.includes(X)?X:ke[0]||"";return{runner:C,model:J,effort:Ee,models:F,efforts:ke}}async function We(k){let C=D().settings,F=await pe("worker-parallel-analysis-settings-update",{expected_revision:C.revision,runner:k.runner,model:k.model,effort:k.effort});(!F||F.applied!==!0)&&(f=null,ye(),F&&F.reason&&ie(`\uBD84\uC11D \uC124\uC815 \uAC70\uBD80: ${F.reason}`,"error",2800))}function Xe(k){f=k,ye();let C=xe();We({runner:k,model:C.model,effort:C.effort})}function Te(k){let C=xe(),F=Ra($e(),C.runner,k);We({runner:C.runner,model:k,effort:F.includes(C.effort)?C.effort:F[0]||""})}function ot(k){let C=xe();We({runner:C.runner,model:C.model,effort:k})}async function Y(k,C){if(!s||p)return;let F=M(k,C),J=D();if(F.length<2||!J.last_good){ie("\uC81C\uCD9C\uD558\uB824\uBA74 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4","warning");return}let ke=d.get(k)||de(),X=()=>({snapshot_digest:J.last_good.identity_digest,group_index:k,lane:ke,ordered_bead_ids:F,expected_revision:P().revision});p=!0,ye();try{let Ee=await s("worker-parallel-analysis-submit",X());Ee&&Ee.queue&&r&&r.set(Ee.queue),Ee&&Ee.applied!==!0&&Ee.conflict===!0&&(Ee=await s("worker-parallel-analysis-submit",X()),Ee&&Ee.queue&&r&&r.set(Ee.queue)),Ee&&Ee.applied===!0?(u.delete(k),ie(`\uC9C1\uB82C \uB808\uC778 ${ke}\uC5D0 ${F.length}\uAC1C \uBC30\uCE58`,"success")):ie(`\uC81C\uCD9C \uAC70\uBD80: ${Ee?.reason||"conflict"} (\uD050 \uBB34\uBCC0\uACBD)`,"error",2800)}finally{p=!1,ye()}}function W(k,C,F){u.set(k,M(k,C).filter(J=>J!==F)),ye()}function oe(k){u.delete(k),ye()}function Oe(k,C,F,J){let ke=[...M(k,C)],X=ke.indexOf(F),Ee=X+J;X<0||Ee<0||Ee>=ke.length||(ke.splice(Ee,0,...ke.splice(X,1)),u.set(k,ke),ye())}function ze(){let k=D().settings,C=Object.keys($e()?.runners||{}),F=xe();return i`<div class="pa-settings">
      <label class="pa-settings__field"
        >러너
        <select
          class="pa-settings__runner"
          aria-label="분석 러너"
          @change=${J=>Xe(J.target.value)}
        >
          ${C.map(J=>i`<option
                value=${J}
                ?selected=${F.runner===J}
              >
                ${J}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >분석 모델
        <select
          class="pa-settings__model"
          aria-label="분석 모델"
          @change=${J=>Te(J.target.value)}
        >
          ${F.models.map(J=>i`<option
                value=${J}
                ?selected=${F.model===J}
              >
                ${J}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >effort
        <select
          class="pa-settings__effort-select"
          aria-label="분석 effort"
          @change=${J=>ot(J.target.value)}
        >
          ${F.efforts.map(J=>i`<option
                value=${J}
                ?selected=${F.effort===J}
              >
                ${J}
              </option>`)}
        </select>
      </label>
      ${Ve(k)}
    </div>`}function Ve(k){return!lt(k)||Ie(k)?i`<span class="pa-settings__unset">분석 모델 설정 필요</span>`:k.compatible===!1?i`<span class="pa-settings__incompatible"
        >설정 비호환 — 저장된 ${k.runner}/${k.model} · effort
        ${k.effort} 을(를) 카탈로그가 더는 제공하지 않습니다</span
      >`:k.is_default===!0?i`<span class="pa-settings__default">기본값</span>`:""}function Ie(k){return k.is_default===!0&&k.compatible===!1}function lt(k){return!!(k.runner&&k.model&&k.effort)}function Qe(k){return lt(k)&&k.compatible!==!1}function V(k){let C=Math.max(0,Math.floor(k/1e3)),F=Math.floor(C/60),J=C%60;return`${F}:${String(J).padStart(2,"0")}`}function te(k){let C=k.job;if(C){let F=typeof C.started_at=="number"?C.started_at:0,J=`${C.runner||"?"}/${C.model||"?"}`,ke=F?` \xB7 \uACBD\uACFC ${V(Date.now()-F)}`:"",X=typeof C.session_id=="string"?C.session_id:"",Ee=m(k).find(Ce=>Ce.run_id===C.job_id);return i`<span class="pa-meta__progress">
        <span
          >분석 중 — ${J} · effort ${C.effort||"?"}${ke}</span
        >
        ${X?i`<code class="pa-session-id" title=${X}
              >${X.slice(0,8)}</code
            >`:""}
        <button
          type="button"
          class="pa-monitor"
          @click=${()=>he(C.job_id,Ee||C)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-prompt-open"
          ?disabled=${Ee?.prompt_saved!==!0||Q.has(C.job_id)}
          @click=${()=>{Ue(C.job_id)}}
        >
          프롬프트
        </button>
      </span>`}return Me()?i`<span class="pa-meta__progress"
          >준비 중 — 대상과 아티팩트 수집 중</span
        >`:""}function Me(){return n?.isPending?.()===!0}function He(k){let C=!!k.job,F=Qe(k.settings),J=A!==null&&S.size===0,ke=C||p||Me()||O;return i`<div class="pa-meta">
      ${k.last_good?i`<span class="pa-meta__at"
            >분석 ${new Date(k.last_good.at||0).toLocaleString()}</span
          >`:i`<span class="pa-meta__at">분석 결과 없음</span>`}
      ${te(k)}
      <button
        type="button"
        class="pa-run"
        ?disabled=${!F||ke||J}
        @click=${()=>{Fe(!1)}}
      >
        ✳ 분석
      </button>
      <button
        type="button"
        class="pa-rerun"
        ?disabled=${!F||ke||J}
        @click=${()=>{Fe(!0)}}
      >
        재분석
      </button>
      <button
        type="button"
        class="pa-cancel"
        ?disabled=${!C}
        @click=${()=>{rt()}}
      >
        취소
      </button>
    </div>`}function fe(k){return typeof k=="string"&&k.length>0?k:"\uBBF8\uBC30\uCE58"}function b(k,C){C?S.add(k):S.delete(k),ye()}function x(k){let C=Array.isArray(k.scope)?k.scope:[],F=Array.isArray(k.overlaps)?k.overlaps:[];return C.length===0&&F.length===0?i``:i`<span class="pa-target__signals">
      ${C.length>0?i`<details class="pa-target__scope" title=${C.join(`
`)}>
            <summary>scope ${C.length}</summary>
            <ul>
              ${C.map(J=>i`<li><code>${J}</code></li>`)}
            </ul>
          </details>`:""}
      ${F.length>0?i`<span
            class="pa-target__overlaps"
            title=${`\uACB9\uCE68: ${F.join(", ")}`}
            >겹침 ${F.join(", ")}</span
          >`:""}
    </span>`}function $(){let k=A?.qualified||[],C=A?.excluded||[];return i`<section class="pa-targets">
      <header class="pa-targets__header">
        <strong>분석 대상</strong>
        <span class="pa-targets__summary"
          >${O?"\uC870\uD68C \uC911\u2026":`\uC790\uACA9 ${k.length} \xB7 \uC81C\uC678 ${C.length}`}</span
        >
      </header>
      ${A&&k.length>0?i`<ul class="pa-targets__list">
            ${k.map(F=>i`<li class="pa-target">
                  <label class="pa-target__label">
                    <input
                      type="checkbox"
                      class="pa-target__check"
                      data-target-id=${F.id}
                      .checked=${S.has(F.id)}
                      @change=${J=>b(F.id,J.target.checked)}
                    />
                    <span class="pa-target__title">${F.title}</span>
                  </label>
                  <span class="pa-target__meta">
                    ${x(F)}
                    <span class="pa-target__route">${F.route}</span>
                    <span class="pa-target__lane"
                      >${fe(F.lane)}</span
                    >
                  </span>
                </li>`)}
          </ul>`:A&&k.length===0?i`<p class="pa-empty">자격 있는 분석 대상이 없습니다</p>`:""}
      ${A&&C.length>0?i`<details class="pa-targets__excluded">
            <summary>제외 대상 ${C.length}</summary>
            <ul class="pa-targets__list">
              ${C.map(F=>i`<li class="pa-target pa-target--excluded">
                    <label class="pa-target__label">
                      <input type="checkbox" disabled />
                      <span class="pa-target__title">${F.title}</span>
                    </label>
                    <span class="pa-target__meta">
                      <span class="pa-target__reason"
                        >${jm[F.reason]||F.reason}</span
                      >
                      <span class="pa-target__lane"
                        >${fe(F.lane)}</span
                      >
                    </span>
                  </li>`)}
            </ul>
          </details>`:""}
    </section>`}function N(k){let C=typeof k.session_id=="string"&&k.session_id.length>0,F=C?k.session_id:"";return i`<li class="pa-run-row">
      <span class="pa-run-row__status pa-run-row__status--${k.outcome}"
        >${Bm[k.outcome]||k.outcome}</span
      >
      <time class="pa-run-row__time"
        >${new Date(k.started_at||0).toLocaleString()}</time
      >
      <span class="pa-run-row__identity"
        >${k.runner||"?"} / ${k.model||"?"} / ${k.effort||"?"}</span
      >
      ${C?i`<code class="pa-session-id" title=${F}
            >${F.slice(0,8)}</code
          >`:i`<span class="pa-run-row__no-session">세션 없음</span>`}
      ${k.outcome==="failure"&&k.reason?i`<span class="pa-run-row__reason">${k.reason}</span>`:""}
      <span class="pa-run-row__actions">
        <button
          type="button"
          class="pa-run-row__monitor"
          @click=${()=>he(k.run_id,k)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-run-row__prompt"
          ?disabled=${k.prompt_saved!==!0||Q.has(k.run_id)}
          @click=${()=>{Ue(k.run_id)}}
        >
          프롬프트
        </button>
      </span>
    </li>`}function K(k){return i`<section class="pa-runs">
      <header class="pa-runs__header"><strong>최근 실행</strong></header>
      ${k.length>0?i`<ul class="pa-runs__list">
            ${k.map(C=>N(C))}
          </ul>`:i`<p class="pa-empty">실행 이력 없음</p>`}
    </section>`}function Z(){return ee?i`<div
      class="pa-prompt-popup"
      role="dialog"
      aria-modal="true"
      aria-label="분석 프롬프트"
    >
      <div class="pa-prompt-popup__backdrop" @click=${_e}></div>
      <section class="pa-prompt-popup__panel">
        <header class="pa-prompt-popup__header">
          <div class="pa-prompt-popup__identity">
            <strong>분석 프롬프트</strong>
            <code>${ee.run_id}</code>
          </div>
          <div class="pa-prompt-popup__actions">
            <button type="button" @click=${()=>{Le()}}>
              복사
            </button>
            <button
              type="button"
              class="pa-prompt-popup__close"
              aria-label="분석 프롬프트 팝업 닫기"
              @click=${_e}
            >
              ✕
            </button>
          </div>
        </header>
        <pre class="pa-prompt-popup__content" tabindex="0">
${ee.prompt}</pre
        >
      </section>
    </div>`:""}function ce(k,C){let F=M(k,C),J=R(),ke=F.filter(nt=>J.has(nt)),X=H(F),Ee=q(F),Ce=Array.isArray(P().serial_lanes)?P().serial_lanes:[],mt=d.get(k)||de(),Et=C.eligible!==!0||F.length<2||ke.length>0||X.length>0||Ee||p;return i`<section class="pa-group" data-group-index=${String(k)}>
      <header class="pa-group__head">
        <span class="pa-group__confidence">${C.confidence}</span>
        ${C.categories.map(nt=>i`<span class="pa-group__category">${nt}</span>`)}
        ${Ee?i`<span class="pa-group__applied">✓ 이미 반영됨</span>`:""}
        ${C.eligible===!0?"":i`<span class="pa-group__weak">근거 부족 — 제출 불가</span>`}
        ${X.length>0?i`<span class="pa-group__stale"
              >stale — ${X.join(", ")} 대기 영역 이탈</span
            >`:""}
      </header>
      <p class="pa-group__reason">${C.reason}</p>
      <ol class="pa-group__members">
        ${F.map((nt,vt)=>i`<li class="pa-member" data-bead-id=${nt}>
              <span class="pa-member__seq">${vt+1}</span>
              <span class="pa-member__title">${ge(nt)}</span>
              ${J.has(nt)?i`<span class="pa-member__active">실행 중</span>`:""}
              <button
                type="button"
                class="pa-member__up"
                data-bead-id=${nt}
                ?disabled=${vt===0}
                aria-label=${`${nt} \uC704\uB85C`}
                @click=${()=>Oe(k,C,nt,-1)}
              >
                ↑
              </button>
              <button
                type="button"
                class="pa-member__down"
                data-bead-id=${nt}
                ?disabled=${vt===F.length-1}
                aria-label=${`${nt} \uC544\uB798\uB85C`}
                @click=${()=>Oe(k,C,nt,1)}
              >
                ↓
              </button>
              <button
                type="button"
                class="pa-member__exclude"
                data-bead-id=${nt}
                aria-label=${`${nt} \uC81C\uC678`}
                @click=${()=>W(k,C,nt)}
              >
                ✕
              </button>
            </li>`)}
      </ol>
      <ul class="pa-group__evidence">
        ${C.evidence.map(nt=>i`<li class="pa-evidence">
              <code>${nt.path}</code>
              <span class="pa-evidence__locator">${nt.locator}</span>
            </li>`)}
      </ul>
      <footer class="pa-group__foot">
        <button
          type="button"
          class="pa-group__restore"
          @click=${()=>oe(k)}
        >
          제안으로 되돌리기
        </button>
        <label class="pa-group__lane-field"
          >제출
          <select
            class="pa-group__lane"
            aria-label="제출 대상 레인"
            @change=${nt=>{d.set(k,nt.target.value),ye()}}
          >
            ${Ce.map((nt,vt)=>i`<option
                  value=${nt.id}
                  ?selected=${mt===nt.id}
                >
                  직렬 ${vt+1}
                </option>`)}
          </select>
        </label>
        <button
          type="button"
          class="pa-group__submit"
          ?disabled=${Et}
          @click=${()=>{Y(k,C)}}
        >
          제출
        </button>
      </footer>
    </section>`}function ue(k){let C=Array.isArray(k.issues)?k.issues:[],F=C.filter(ke=>ke.verdict==="parallel_ok").length,J=C.filter(ke=>ke.verdict==="uncertain").length;return i`<div class="pa-summary">
      <span>parallel_ok ${F}</span>
      <span>uncertain ${J}</span>
    </div>`}function De(){let k=Ne&&!!D().job;if(k&&h===null){h=setInterval(()=>ye(),1e3);return}!k&&h!==null&&(clearInterval(h),h=null)}function ye(){let k=D();f&&k.settings.runner===f&&(f=null);let C=k.last_good?.result;De(),Ze(i`
        <div class="pa__container">
          <header class="pa__header">
            <div class="pa__title">병렬성 분석</div>
            <button
              type="button"
              class="pa__close"
              aria-label="닫기"
              @click=${be}
            >
              ×
            </button>
          </header>
          <div class="pa__body">
            ${ze()} ${He(k)} ${$()}
            ${C?i`${C.groups.map((F,J)=>ce(J,F))}
                ${C.groups.length===0?i`<p class="pa-empty">직렬 권장 그룹 없음</p>`:""}
                ${ue(C)}`:i`<p class="pa-empty">
                  아직 분석 결과가 없습니다 — [✳ 분석]을 눌러 시작하세요
                </p>`}
            ${K(m(k))}
          </div>
        </div>
        ${Z()}
      `,c)}let Ne=!1,Ae=()=>{Ne=!1,ee=null,U+=1,De()},Se=k=>{k.target===k.currentTarget&&be()};c.addEventListener("close",Ae),c.addEventListener("cancel",Ae),c.addEventListener("click",Se);let Ke=null;r&&r.subscribe&&(Ke=r.subscribe(()=>{Ne&&ye()}));let z=null;n&&n.subscribe&&(z=n.subscribe(()=>{Ne&&ye()}));function re(){Ne||(Ne=!0,ye(),B(),typeof c.showModal=="function"?c.showModal():c.setAttribute("open",""))}function be(){Ne&&(Ne=!1,ee=null,U+=1,De(),typeof c.close=="function"?c.close():c.removeAttribute("open"))}return{open:re,close:be,destroy(){Ne=!1,h!==null&&(clearInterval(h),h=null),c.removeEventListener("close",Ae),c.removeEventListener("cancel",Ae),c.removeEventListener("click",Se),Ke&&(Ke(),Ke=null),z&&(z(),z=null),c.remove()}}}var Su=new Set(["sh","bash","zsh","dash","ksh"]),Eu=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function Tu(e){let t=e.split("/");return t[t.length-1]||""}function Wm(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let r=t.slice(2).trim().split(/\s+/).filter(Boolean);if(r.length===0)return!1;let n=Tu(r[0]);if(n!=="env")return Su.has(n);let s=r.slice(1).find(o=>!o.startsWith("-")&&!o.includes("="));return s!==void 0&&Su.has(Tu(s))}function zm(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function Hm(e){let t=[],r=0;Eu.lastIndex=0;for(let n of e.matchAll(Eu)){let s=n.index;s>r&&t.push({text:e.slice(r,s),kind:"plain"}),t.push({text:n[0],kind:zm(n[0])}),r=s+n[0].length}return r<e.length&&t.push({text:e.slice(r),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function Gm(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function Cu(e){let t=e.getWorkspacePath,r=e.fetchImpl||globalThis.fetch?.bind(globalThis),n=document.createElement("div");n.className="repo-ops-script-viewer-root",document.body.appendChild(n);let s=null,o="loading",a="",c="",u=0,d=null,p=!1;function f(L,B){return B?Hm(L).map(m=>m.kind==="plain"?m.text:i`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${m.kind}"
            >${m.text}</span
          >`):L}function h(){if(!s)return i``;let L=o==="ready"&&Wm(a),B=o==="ready"?a.split(`
`):[];return i`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${s.path}`}
    >
      <div
        class="repo-ops-script-viewer__backdrop"
        @click=${()=>P()}
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
              @click=${()=>{S()}}
            >
              복사
            </button>
            <button
              type="button"
              class="repo-ops-script-viewer__close"
              aria-label="스크립트 팝업 닫기"
              @click=${()=>P()}
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
                  ${c}
                </div>`:i`<div class="repo-ops-script-viewer__code" tabindex="0">
                  ${B.map((m,R)=>i`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${R+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${f(m,L)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function A(){Ze(h(),n)}async function S(){if(o!=="ready")return;let L=await Xt(a);ie(L?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",L?"success":"error")}function O(L){L.key==="Escape"&&s&&(L.preventDefault(),P())}function U(){p||(document.addEventListener("keydown",O),p=!0)}function ee(){p&&(document.removeEventListener("keydown",O),p=!1)}async function Q(L,B=null){let m=++u;U(),s={...L},d=B||(document.activeElement instanceof HTMLElement?document.activeElement:null),o="loading",a="",c="",A(),n.querySelector(".repo-ops-script-viewer__close")?.focus();let H=t?t():"";if(!H){o="error",c="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",A();return}if(!r){o="error",c="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",A();return}let se="/api/repo-ops-script?workspace="+encodeURIComponent(H)+"&lane="+encodeURIComponent(L.lane)+"&base_sha="+encodeURIComponent(L.base_sha);try{let M=await r(se),q=await M.json().catch(()=>({}));if(m!==u)return;if((t?t():"")!==H){P();return}if(!M.ok||!q||q.ok!==!0){o="error",c=Gm(q&&typeof q.error=="string"?q.error:""),A();return}s={lane:q.lane,base_sha:q.base_sha,path:q.path,base_ref:q.base_ref},a=String(q.content),o="ready",A()}catch{if(m!==u)return;o="error",c="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",A()}}function P(){u+=1,ee(),s=null,a="",A();let L=d;d=null,L?.isConnected&&L.focus()}function D(){P(),n.remove()}return{open:Q,close:P,destroy:D}}function Ru(e){let t=e.queueStore,r=e.transport,n=e.onChanged||(()=>{}),s=e.onOpenScript;function o(){return t&&t.get()||{}}function a(){let m=o();return typeof m.revision=="number"?m.revision:0}function c(m){t&&m&&m.queue&&typeof m.queue=="object"&&t.set(m.queue)}function u(){let m=o().workspace_info;return m&&typeof m=="object"?m:{}}function d(m,R){return i`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${m}"
      >${R}</span
    >`}function p(m){if(typeof m!="number"||!Number.isFinite(m))return"";let R=m/6e4;return Number.isInteger(R)?`timeout ${R}\uBD84`:`timeout ${Math.round(m/1e3)}\uCD08`}function f(m){let R=p(m);return R?d("config",R):""}function h(m,R,H){return i`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${H.script}
      @click=${se=>{s&&s({lane:m,base_sha:R.base_sha,path:H.script,base_ref:R.base_ref},se.currentTarget)}}
    ></button>`}function A(){let m=o().repo_ops_opt_out;return{verify:m?.verify===!0,deploy:m?.deploy===!0}}function S(m,R){return i`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!R}
        @change=${H=>{Q(m,!H.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function O(m){let R=typeof m.base_sha=="string"?m.base_sha:"",H=`${m.source_path||"repo-ops/config.toml"} @ ${m.base_ref||"?"}${R?`@${R.slice(0,7)}`:""}`,se=A(),M=!!m.verify&&se.verify,q=!!m.deploy&&se.deploy;return i`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${H}</span>
      </p>
      <div
        class="worker-repo-ops__lane${M?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${m.verify?i`${h("verify",m,m.verify)}
              ${f(m.verify.timeout_ms)}
              ${M?d("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:i`선언 없음${d("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${M?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":m.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${m.verify?S("verify",se.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${q?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${m.deploy?i`${h("deploy",m,m.deploy)}
              ${f(m.deploy.timeout_ms)}
              ${q?d("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:i`선언 없음${d("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${q?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":m.deploy?i`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${m.deploy?S("deploy",se.deploy):""}
      </div>
    </section>`}function U(m){let R=m.repo_ops&&typeof m.repo_ops=="object"?m.repo_ops:null;return R&&(R.status==="resolved"||R.status==="absent")?O(R):R&&(R.status==="pending"||R.status==="error")?i`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${R.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":i`선언 읽기
              실패${R.error_code?i` — <code>${R.error_code}</code>`:""}`}
        </div>
      </section>`:i`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function ee(m){if(!r)return;let R=await r("worker-auto-repair-toggle",{on:m,expected_revision:a()});if(c(R),R&&R.conflict){let H=await r("worker-auto-repair-toggle",{on:m,expected_revision:a()});c(H)}n()}async function Q(m,R){if(!r)return;let H=await r("worker-repo-ops-opt-out-toggle",{kind:m,opted_out:R,expected_revision:a()});if(c(H),H&&H.conflict){let se=await r("worker-repo-ops-opt-out-toggle",{kind:m,opted_out:R,expected_revision:a()});c(se)}n()}let P={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function D(m,R,H){return i`<div class="worker-repo-ops__policy-group" data-policy=${H}>
      <div class="worker-repo-ops__policy-label">${m}</div>
      <ul class="worker-repo-ops__policy-list">
        ${R.map(se=>i`<li data-token=${se}>
              ${P[se]||se}
            </li>`)}
      </ul>
    </div>`}function L(m){return i`<div
      class="worker-repo-ops__policy-group"
      data-policy="resolution-ladder"
    >
      <div class="worker-repo-ops__policy-label">해결 사다리</div>
      <ol class="worker-repo-ops__policy-list">
        ${m.map(R=>{let H=[P[R.trigger]||R.trigger];return Number.isInteger(R.attempts_per_operation_attempt)?H.push(`operation\uB2F9 ${R.attempts_per_operation_attempt}\uD68C`):Number.isInteger(R.attempts)?H.push(`${P[R.budget]||R.budget} ${R.attempts}\uD68C`):Number.isInteger(R.sessions_per_user_action)&&H.push(`${R.sessions_per_user_action}\uD68C`,P[R.user_actions]||R.user_actions),R.applies_when&&H.push(P[R.applies_when]||R.applies_when),i`<li data-token=${R.id}>
            <strong>${P[R.id]||R.id}</strong>
            <span>${H.filter(Boolean).join(" \xB7 ")}</span>
          </li>`})}
      </ol>
    </div>`}function B(){let m=o(),R=m.auto_repair!==!1,H=m.repo_operation_policy&&typeof m.repo_operation_policy=="object"?m.repo_operation_policy:null,se=Array.isArray(m.repo_operations)?m.repo_operations:[],M=se.find(pe=>pe.state==="repairing"),q=se.filter(pe=>pe.state==="failed"||pe.state==="repairing"),de=q.length?Math.min(...q.map(pe=>typeof pe.repair?.remaining=="number"?pe.repair.remaining:0)):H?.auto_repair?.resolution_ladder?.find(pe=>pe.id==="auto_repair_session")?.attempts??1,ge=Array.isArray(H?.auto_repair?.resolution_ladder)?H.auto_repair.resolution_ladder:[];return i`<section
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
          .checked=${R}
          @change=${pe=>{ee(pe.target.checked)}}
        />
        검증·배포 실패를 자동으로 해결 시도
      </label>
      <div class="worker-repo-ops__repair-state">
        <span
          class="worker-repo-ops__repair-value"
          data-seam="auto-repair-value"
          >${R?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}</span
        >
        <span
          class="worker-repo-ops__repair-budget"
          data-seam="auto-repair-budget"
          >남은 자동 해결 ${de}회</span
        >
        <span
          class="worker-repo-ops__repair-session"
          data-seam="auto-repair-session"
          >${M?`\uD574\uACB0 \uC138\uC158 \uC2E4\uD589 \uC911 \xB7 ${M.repair?.owner_bead||M.operation_id}`:"\uC2E4\uD589 \uC911\uC778 \uD574\uACB0 \uC138\uC158 \uC5C6\uC74C"}</span
        >
      </div>
      ${H?i`<details
            class="worker-repo-ops__policy"
            data-seam="policy-lists"
          >
            <summary>
              Worker 자동 처리 기준
              <span class="worker-repo-ops__policy-count"
                >자동 ${(H.worker_automatic||[]).length} · 해결 사다리
                ${ge.length} · 금지
                ${(H.never_automatic||[]).length}</span
              >
            </summary>
            ${D("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",H.worker_automatic||[],"worker-automatic")}
            ${H.supported===!1||H.schema_version!==2?i`<div
                  class="worker-repo-ops__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uD574\uACB0\uC774 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${H.schema_version})`}
                </div>`:L(ge)}
            ${D("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",H.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}return{template(){return i`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언 · 자동 해결
        </summary>
        ${U(u())} ${B()}
      </details>`}}}var Mu=20,Vm=5,Km=new Set(["failed","repairing","running","queued","retry_pending"]),Iu={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"},Lu={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8"};function Ym(e,t,r=Mu){let n=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||n.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||n.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return n.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),n.slice(0,Math.max(0,r))}function Zm(e){if(e.type==="cleanup")return!0;let t=e.operation;return Km.has(t.state)&&!t.dismissed&&!t.superseded_by}function Xm(e,t,r={}){let n=Ym(e,t,1/0),s=r.expanded===!0?Mu:Vm,o=new Set(n.slice(0,s)),a=n.filter(c=>o.has(c)||Zm(c));return{visible:a,hidden:n.length-a.length}}function Ou(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function Qm(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"repairing":return"\uC790\uB3D9 \uD574\uACB0 \uC911";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function Pu(e){let t=e.filter(r=>r.value);return t.length===0?"":i`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(r=>i`<div>
            <dt>${r.term}</dt>
            <dd>${r.value}</dd>
          </div>`)}
    </dl>
  </details>`}function Du(e,t="",r=!1){return!e&&!t?"":i`<p
    class="worker-ev__explain${r?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?i`<br />${t}`:""}
  </p>`}function Jm(e){if(e.state!=="failed"||e.superseded_by)return"";let t=e.repair||{},r=typeof t.remaining=="number"?t.remaining:0,n=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"",s=r<=0;return i`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
      data-operation-id=${e.operation_id}
      data-failure-kind=${e.failure_kind||""}
      title="해결 세션을 엽니다"
    >
      ${Object.hasOwn(Lu,n)?Lu[n]:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC2DC\uC791"}
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
  </div>`}function eg(e){let t=e.operation,r=t.state==="failed",n=t.failure?t.failure.code:"";return i`<li
    class="worker-ev"
    data-operation-id=${t.operation_id}
    data-state=${t.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?$t(e.at):""}
      >${Xs(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${Ou(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(Iu,t.kind)?Iu[t.kind]:t.kind}</span
        >
        <span class="worker-ev__meta"
          >${t.target_base}@${Ys(t.target_sha)}${typeof t.elapsed_ms=="number"?` \xB7 ${Zs(t.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${Ou(e)}"
          >${Qm(e)}</span
        >
        ${t.dismissed?i`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${t.superseded_by?i`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
      </div>
      ${r?Du(Dc(t.failure_kind,n)):""}
      ${Jm(t)}
      ${Pu([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?n:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${Ys(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function tg(e){let t=e.cleanup,r=Hr(t.step);return i`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?$t(e.at):""}
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
        ${Ic(t.step).map(n=>i`<li
              class="worker-step worker-step--${n.state}"
              data-step=${n.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${n.label}</span>
            </li>`)}
      </ol>
      ${Du(ro(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
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
      ${Pu([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function rg(e){let t=typeof e.hidden=="number"?e.hidden:0,r=e.expanded===!0;return i`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(n=>n.type==="cleanup"?tg(n):eg(n))}
        </ul>`}
    ${t>0||r?i`<div class="worker-repo-drawer__more">
          <button
            type="button"
            class="worker-ev__btn"
            data-seam="repo-ops-more"
          >
            ${r?"\uC811\uAE30":`\uC774\uC804 ${t}\uAC1C \uB354 \uBCF4\uAE30`}
          </button>
        </div>`:""}
  </section>`}function Nu(e,t={}){let r=null;function n(){if(r===null){Ze(i``,e);return}let a=Xm(r.operations,r.cleanup_failures,{expanded:r.expanded});Ze(rg({events:a.visible,hidden:a.hidden,expanded:r.expanded,repo:r.repo}),e)}e.addEventListener("click",a=>{let c=a.target;if(c?.closest?.('[data-seam="repo-ops-close"]')){o();return}c?.closest?.('[data-seam="repo-ops-more"]')&&r&&(r.expanded=!r.expanded,n())});function s(a){r={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:!1},n()}function o(){r!==null&&(r=null,n(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>r!==null,refresh(a){r&&(r={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:r.expanded},n())}}}var ng="tab:worker:ready",sg="tab:worker:blocked",og="tab:worker:in-progress",ag="tab:worker:closed",oo=1,qu=5;function Fu(e){return js(e).path.length>0}var Wu="beads-ui.worker.candidate-filter",La={show_blocked:!1,spec:"all"};function ig(){try{let e=window.localStorage.getItem(Wu);if(!e)return{...La};let t=JSON.parse(e);if(!t||typeof t!="object")return{...La};let r=t.spec;return{show_blocked:t.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...La}}}function lg(e){try{window.localStorage.setItem(Wu,JSON.stringify(e))}catch{}}function cg(e,t){let r=c=>t.show_blocked||!c.blocked,n=c=>t.spec==="all"||(t.spec==="with"?c.has_spec:!c.has_spec),s=[],o=0,a=0;for(let c of e){let u=r(c),d=n(c);u&&d?s.push(c):!u&&d?o+=1:u&&!d&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var ug=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],zu="bdui.worker.candidate_sort",dg=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],ao="spec";function pg(){try{let e=window.localStorage.getItem(zu);return e==="board"||e==="created"||e==="spec"?e:ao}catch{return ao}}function fg(e){try{window.localStorage.setItem(zu,e)}catch{}}var Hu="bdui.worker.done-range";function _g(){try{let e=window.localStorage.getItem(Hu);return Wt(e)?e:Nt}catch{return Nt}}function mg(e){try{window.localStorage.setItem(Hu,e)}catch{}}var gg="(max-width: 640px)",Gu="beads-ui.worker.lane-collapsed",Kn={queue:!0,done:!0};function bg(){try{let e=window.localStorage.getItem(Gu);if(!e)return{...Kn};let t=JSON.parse(e);return!t||typeof t!="object"?{...Kn}:{queue:typeof t.queue=="boolean"?t.queue:Kn.queue,done:typeof t.done=="boolean"?t.done:Kn.done}}catch{return{...Kn}}}function hg(e){try{window.localStorage.setItem(Gu,JSON.stringify(e))}catch{}}function ju(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let r=typeof t.title=="string"?t.title:t.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function yg(e,t,r){let n=Array.isArray(e)?e.slice():[];return t==="created"?n.sort(Fr):(n.sort(fs(r)),t==="board"?n:[...n.filter(Fu),...n.filter(s=>!Fu(s))])}function vg(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function wg(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function kg(e){let t=e?.blocked_info;if(t&&typeof t=="object"){let s=Array.isArray(t.blockers)?t.blockers.filter(o=>typeof o=="string"&&o.length>0):[];return s.length>0?`\u{1F512} ${s.join(", ")}`:"\u{1F512} blocked"}let n=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(s=>{if(typeof s=="string")return s;if(!s||typeof s!="object")return"";let o=s.type??s.dependency_type;return o!==void 0&&o!=="blocks"?"":s.depends_on_id||s.id||""}).filter(Boolean);return n.length>0?`\u{1F512} ${n.join(", ")}`:"\u{1F512} blocked"}function Bu(e){switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function $g(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function xg(e,t=null){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let r=e.slice(19);if(r.length===0)return null;switch(r){case"gating":{let n=t?.repair_sessions_used;return typeof n=="number"&&n>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911"}case"repairing":return"\uC790\uB3D9 \uC218\uC815 \uC911";case"waiting_repair_pr":return"\uC218\uC815 PR \uB300\uAE30 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function Ag(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function Sg(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"implementation review \uB300\uAE30",live:!1,alert:!1};case"reviewing":return{badge:"implementation review \uC911",live:!0,alert:!1};case"revising":return{badge:"review \uC218\uC815 \uC911 \xB7 1\uD68C",live:!0,alert:!1};case"failed":{let r=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:r.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${r.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",live:!1,alert:!0}}default:return null}}function Oa(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function Eg(e){if(!e||typeof e!="object")return null;let t=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,n=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,s=n&&typeof n.pr_number=="number"?n.pr_number:null,o="";switch(e.phase){case"gating":o=t>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"repairing":o="\uC790\uB3D9 \uC218\uC815 \uC911";break;case"waiting_repair_pr":o=s?`\uC218\uC815 PR #${s} \uB300\uAE30 \uC911`:"\uC218\uC815 PR \uB300\uAE30 \uC911";break;case"merging":o=e.subject_role==="repair"?s?`\uC218\uC815 PR #${s} \uBA38\uC9C0 \uC911`:"\uC218\uC815 PR \uBA38\uC9C0 \uC911":"\uBA38\uC9C0 \uC911";break;case"cleaning":o="\uB9C8\uBB34\uB9AC \uC911";break;case"paused":o="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":o="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let a=[o,`\uC790\uB3D9 \uC218\uC815 \uD69F\uC218 ${t}/${r}`];return e.head_sha&&a.push(`head ${e.head_sha}`),e.base_sha&&a.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&a.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`),e.active_attempt_id&&a.push(`attempt ${e.active_attempt_id}`),n&&typeof n.bead_id=="string"&&a.push(`repair ${n.bead_id}`),e.evidence&&a.push(e.evidence),e.log_path&&a.push(e.log_path),{badge:o,title:a.join(`
`),alert:e.phase==="needs_human",lock_actions:e.phase!=="paused"&&e.phase!=="needs_human",repair_pr_url:n&&typeof n.pr_url=="string"?n.pr_url:"",repair_pr_number:s}}function Uu(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(r=>typeof r=="string"&&r.length>0):[]}function Tg(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",r=(n,s={})=>{let o=[s.title||"",t].filter(Boolean);return{label:n,title:o.join(`
`),live:s.live===!0,alert:s.alert===!0}};return e.continuation_required?r("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0}):e.merge_step?e.gate?.tier==="merged"?r("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):r("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0}):e.conflict_badge?r(e.conflict_badge,{live:e.conflict_live===!0}):e.head_review&&e.head_review.state!=="failed"?r("\uB9AC\uBDF0 \uC9C4\uD589 \uC911",{title:e.head_review.badge,live:e.head_review.live===!0}):e.recovery?.lock_actions?r(e.recovery.badge,{title:e.recovery.title,live:!0}):e.cleanup_failed?r(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0}):e.base_exception?r("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0}):e.conflicting?r("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0}):e.gate?.reason==="base_behind"?r("base \uAC31\uC2E0 \uD544\uC694",{alert:!0}):e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale"?r("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2C8\uAC70\uB098 \uC870\uC0C1 \uD655\uC778\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uB85C, \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB9AC\uBDF0\uD574\uC57C \uBA38\uC9C0\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",alert:!0}):e.gate?.reason==="spec_id_missing"?r("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0}):e.gate?.reason==="review_receipt_invalid"?r("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0}):Uu(e.receipt_check).length>0?r("\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694",{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${Uu(e.receipt_check).join(", ")}`,alert:!0}):e.head_review?.state==="failed"?r("\uB9AC\uBDF0 \uC2E4\uD328",{title:e.head_review.failure_reason||"",alert:!0}):e.recovery?r(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?r("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?r(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${Bu(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?r(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${Bu(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?r(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?r("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?r("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?r("\uB2EB\uD798",{alert:!0}):e.activity?r("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?r("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?r("\uD655\uC778 \uC911"):e.gate?.gate_badge?r(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function Cg(e,t,r,n,s=null,o=null,a=null,c=!1,u=null,d=!0,p=null,f=null,h=null,A={},S=!1,O=!1,U={}){let ee=!!u&&u.position>0,Q=!!u?.continuation_action&&u.continuation_action.continuation===null,P=!!u&&u.active===!0,D=u&&u.failure||null,L=xg(u?u.waiting:null,h),B=r[e]||null,m=B&&B.gate?B.gate:null,R=B&&B.pr?B.pr:null,H=Eg(h),se=Ag(u?u.resolution:null),M=Sg(u?u.head_review:null),q=u&&u.head_review||null,de=u&&u.authority||null,ge=!!q&&["pending","reviewing","revising"].includes(q.state),pe=ee&&!P&&(q?.state==="failed"||!de||de.source==="automatic"&&!O),Fe=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":se?se.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":L,rt=!!m&&m.base_badge==="\uCDA9\uB3CC",Ue=!!m&&m.enabled===!0,_e=zn({bead_id:e,merge_sha:U.merge_sha,cleanup_cursor:U.cleanup_cursor,merge_progress:o&&o.merge_progress?o.merge_progress:null,cleanup_failed:n,repo_operations:U.repo_operations}),Le=to(_e),he=!!n&&["child_sweep","branch_cleanup","parent_close"].includes(n.step)&&!!m&&m.tier==="merged",$e=c&&!!n&&!!m&&m.tier==="merged",Re=pe&&(Ue||rt||m?.reason==="base_behind"||m?.reason==="review_receipt_missing"||m?.reason==="review_receipt_stale"||he||$e),je=c&&rt&&d===!1,xe=cr(A,e,{external:c,merge_active:P||_e?.step==="merge",merge_queued:ee,conflict_active:!!a,cleanup_active:Le,merged:!!n||m?.tier==="merged"}),We=!!xe.operation,Xe=!he&&!!n&&n.step==="repo_operations",Te=Tg({continuation_required:Q,merge_step:_e,conflict_badge:Fe,conflict_live:se?.live===!0||a==="running",head_review:q&&M?{...M,state:q.state,failure_reason:q.failure_reason}:null,recovery:H,cleanup_failed:n,cleanup_label:n?Hr(n.step):null,base_exception:f,conflicting:rt,gate:m,receipt_check:B&&B.receipt_check?B.receipt_check:null,queue_failure:D,auto_skip:p,queued:ee,queue_active:P,queue_position:u?u.position:0,activity:Fe?null:o&&o.activity||null}),ot=Te?.live===!0&&Te.title?i`<span title=${Te.title}>${Te.label}</span>`:Te?.label||null;return{id:e,title:c?i`${t}<span class="muted"> · 세션</span>`:t,reason:n&&_e?.active!==!0?eo(n.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:S,external:c,pr_number:R&&typeof R.number=="number"?R.number:null,pr_url:R&&typeof R.url=="string"?R.url:"",completion_badge:Te?.live!==!0&&Te?.title?Te.label:null,completion_title:Te?.title||"",completion_repair_pr_url:H?H.repair_pr_url:"",completion_repair_pr_number:H?H.repair_pr_number:null,badges:ot?[ot]:[],live_badge:Te?.live===!0?ot:null,usage:s,alert:Te?.alert===!0,merge_action:m?.tier==="merged"&&!he&&!$e||Xe?!1:!ee||Q||pe,timeline_action:Xe,cancel_action:ee&&!Q,cancel_enabled:(!P||ge)&&!(H&&H.lock_actions),cancel_title:H&&H.lock_actions?`${H.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:P&&!ge?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":ge?"review \uC9C4\uD589\uC744 \uCDE8\uC18C\uD558\uACE0 \uBA38\uC9C0 \uAD8C\uD55C\uC744 \uD3D0\uAE30\uD569\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:xe,discard_action:xe.action,merge_step:_e,discard_enabled:xe.enabled,discard_title:xe.title,merge_enabled:!_e&&!a&&!We&&!f&&!(H&&H.lock_actions)&&!je&&!Xe&&(Ue||rt||m?.reason==="base_behind"||m?.reason==="review_receipt_missing"||m?.reason==="review_receipt_stale"||he||$e||Re),merge_label:Q?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":he||$e?"\uC815\uB9AC \uC7AC\uAC1C":rt&&!_e&&!he?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":m?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":m?.reason==="review_receipt_missing"||m?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":pe?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:We?xe.error?`\uD3D0\uAE30 \uC2E4\uD328: ${xe.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${xe.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Q?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":_e?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${_e.label}`:$e?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":je?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":he?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":rt?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":m?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":m?.reason==="review_receipt_missing"||m?.reason==="review_receipt_stale"?"\uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":m?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":Ue?`\uBA38\uC9C0 (${m.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:m&&m.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${m&&m.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Ma(e,t={}){let{transport:r,issueStores:n,queueStore:s,analysisStore:o,sessionLogStore:a,uiOrderStore:c,gotoIssue:u,getWorkspacePath:d,doneRange:p,onDoneRangeChange:f}=t,h=n?ms(n,c):null,A=bs({transport:r,uiOrderStore:c}),S=null,O=[],U=ig(),ee=null,Q=pg(),P=Wt(p)?p:_g(),D=new Map;function L(){let l=ar.find(_=>_.value===P);return l?l.label:"\uC624\uB298"}let B=bg(),m=!1,R=new Set,H=new Set,se=new Set,M=new Set,q=[],de=document.createElement("div");de.className="worker-console";let ge=document.createElement("div");ge.className="worker-top";let pe=document.createElement("div");pe.className="worker-drawer-overlay",pe.hidden=!0;let Fe=document.createElement("div");Fe.className="worker-drawer-overlay__backdrop";let rt=document.createElement("div");rt.className="worker-drawer-host";let Ue=document.createElement("div");Ue.className="worker-drawer-host",Ue.hidden=!0,pe.append(Fe,rt,Ue);let _e=document.createElement("div");_e.className="worker-lanes-host",de.append(ge,pe,_e),e.appendChild(de);let Le=null,he=null,$e=Fs(rt,{transport:r,sessionLogStore:a,onClose:()=>{Le=null,he=null,pe.hidden=!0,X()}}),Re=Nu(Ue,{onClose:()=>{Ue.hidden=!0,pe.hidden=!0,X()}}),je=Cu({getWorkspacePath:d||(()=>"")}),xe=d&&d()||"",We=Ru({queueStore:s,transport:r,onChanged:()=>X(),onOpenScript:(l,_)=>{je.open(l,_)}}),Xe=o?Au(de,{queueStore:s,analysisStore:o,transport:r,getWorkspacePath:d,onOpenTranscript:(l,_)=>kr(l,_)}):null;function Te(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:oo,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function ot(){let l=Te(),_=typeof l.serial_lane_count=="number"&&Number.isInteger(l.serial_lane_count)&&l.serial_lane_count>0?Math.min(l.serial_lane_count,5):0,E=Array.isArray(l.serial_lanes)?l.serial_lanes:[],G=[];for(let we of E){if(G.length>=_)break;!we||typeof we.id!="string"||!/^s[1-5]$/.test(we.id)||!Array.isArray(we.entries)||G.push({id:we.id,label:`\uC9C1\uB82C ${we.id.slice(1)}`,count:we.entries.length})}return G.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(l.queue)?l.queue:[]).length},...G]}function Y(l){if(!ee||!l.some(E=>E.id===ee))return null;let _=ot();return _?{bead_id:ee,lanes:_}:null}function W(){let l=Te();return typeof l.revision=="number"?l.revision:0}function oe(l){l&&l.queue&&s&&s.set(l.queue)}function Oe(){let l=Te().queue;return Array.isArray(l)?l.length:0}async function ze(l,_,E){if(!r)return;let G=()=>({bead_id:l,..._==="parallel"?{}:{lane:_},...E===void 0?{}:{index:E},expected_revision:W()}),ae=await r("worker-queue-place",G());oe(ae),ae&&ae.conflict&&await r("worker-queue-place",G()).then(oe)}async function Ve(l,_,E){if(!r)return;let G=()=>({bead_id:l,..._==="parallel"?{}:{lane:_},to_index:E,expected_revision:W()}),ae=await r("worker-queue-reorder",G());oe(ae),ae&&ae.conflict&&await r("worker-queue-reorder",G()).then(oe)}async function Ie(l){if(!r)return;let _=await r("worker-queue-remove",{bead_id:l,expected_revision:W()});oe(_),_&&_.conflict&&await r("worker-queue-remove",{bead_id:l,expected_revision:W()}).then(oe)}async function lt(l){if(!r||!l)return;let _=await r("worker-attempt-pause",{attempt_id:l});_&&_.paused===!1&&_.reason&&ie(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${_.reason}`,"error",2400)}async function Qe(l){if(!r||!l)return;let _=await an();if(_===null)return;let E=async(ae={})=>await r("worker-attempt-resume",{attempt_id:l,expected_revision:W(),..._!==""?{instructions:_}:{},...ae}),G=await E();oe(G),G&&G.conflict&&(G=await E(),oe(G)),G=await fr(G,(ae,we)=>E({continuation:ae,decision_token:we}),{onResult:oe,refresh:()=>E()}),G&&G.resumed===!1&&!G.conflict&&G.reason&&ie(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${G.reason}`,"error",2400)}async function V(l){if(!r||!l)return;let _=await r("worker-attempt-dismiss",{attempt_id:l,expected_revision:W()});oe(_),_&&_.conflict&&(_=await r("worker-attempt-dismiss",{attempt_id:l,expected_revision:W()}),oe(_)),_&&_.dismissed===!1&&!_.conflict&&_.reason&&ie(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${_.reason}`,"error",2400)}async function te(l,_,E=!0){if(!r)return null;let G=r,ae=await G(l,{..._,expected_revision:W()});return oe(ae),ae&&ae.conflict&&E&&(ae=await G(l,{..._,expected_revision:W()}),oe(ae)),ae}async function Me(l){if(!r||!l)return;let _=Te().merge_queue?.find(G=>G.bead_id===l)?.continuation_action;if(_?.mismatch&&_.continuation===null){await fe(l,_.mismatch);return}R.add(l),X();let E;try{E=await te("worker-merge-queue-add",{bead_id:l})}finally{R.delete(l),X()}!E||E.conflict||E.applied||ie($g(E.reason),"error",2400)}async function He(l){if(!(!r||!l||H.has(l))){H.add(l),X();try{let _=await r("worker-cleanup-retry",{bead_id:l,expected_revision:W()});oe(_),_&&!_.retried&&!_.conflict&&_.reason&&ie(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${_.reason}`,"error",2400)}finally{H.delete(l),X()}}}async function fe(l,_){let E=await fr({continuation_mismatch:_},(ae,we)=>te("worker-merge-queue-add",{bead_id:l,continuation:ae,decision_token:we},!1)),G=E?.queue?.merge_queue?.find(ae=>ae.bead_id===l)?.continuation_action;if(E?.applied!==!0&&G?.continuation===null&&G.mismatch){await fe(l,G.mismatch);return}E&&E.applied===!1&&!E.conflict&&ie("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function b(l){if(!r)return;let _=await te("worker-merge-auto-toggle",{on:l});!_||_.conflict||ie(l?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",l?"success":"info",2400)}async function x(l){if(!r||!l)return;let _=await te("worker-merge-queue-remove",{bead_id:l});_&&!_.conflict&&!_.applied&&_.reason==="merge_active"&&ie("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function $(){await te("worker-merge-queue-remove",{all:!0})}async function N(l,_=null,E="unmerged",G=null){if(!r||!l)return;let ae=Bn(l,E);if(!(!!G||typeof globalThis.confirm!="function"||globalThis.confirm(ae)))return;let me=await r("worker-discard",{bead_id:l,..._?{attempt_id:_}:{},...G?{operation_id:G}:{},expected_revision:W()});if(oe(me),me&&me.conflict&&(me=await r("worker-discard",{bead_id:l,..._?{attempt_id:_}:{},...G?{operation_id:G}:{},expected_revision:W()}),oe(me)),me&&me.discarded===!0){ie(Qs(me),"success",5e3);return}if(me&&me.reason){ie(`\uD3D0\uAE30 \uC2E4\uD328: ${me.reason}`,"error",2800);return}if(me&&me.accepted&&me.pending==="merged_revert"){ie("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(me&&me.accepted&&!me.discarded){ie(`\uD3D0\uAE30 \uC9C4\uD589: ${me.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}me&&!me.conflict&&ie("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function K(l,_,E){if(!(!r||!_||!E||M.has(_))){M.add(_),X();try{let G=await r(l,{bead_id:_,action_id:E,expected_revision:W()});oe(G),G?.conflict?ie("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!G?.ok&&G?.reason&&ie(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(G.reason)}`,"error",2800)}finally{M.delete(_),X()}}}async function Z(l,_){if(!r||!_||se.has(_))return;se.add(_),X();let E;try{let G=async(ae={})=>await r(l,{bead_id:_,expected_revision:W(),...ae});E=await G(),oe(E),E&&E.conflict&&(E=await r(l,{bead_id:_,expected_revision:W()}),oe(E)),l==="worker-revise-fix"&&(E=await fr(E,(ae,we)=>G({continuation:ae,decision_token:we}),{onResult:oe,refresh:()=>G()}))}finally{se.delete(_),X()}if(!(!E||E.conflict)){if(E.ok){ie(l==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}ie(`\uCC98\uBD84 \uAC70\uBD80: ${E.reason||""}`,"error",3e3)}}async function ce(l){if(!r)return;let _=await r("worker-automation-toggle",{on:l,expected_revision:W()});oe(_),_&&_.conflict&&await r("worker-automation-toggle",{on:l,expected_revision:W()}).then(oe)}async function ue(l){if(!r||!l)return;let _=await r("worker-repo-operation-repair",{operation_id:l});if(oe(_),_&&_.ok===!1){ie(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${_.reason||""}`,"error",3e3);return}_&&_.ok===!0&&ie("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function De(l){if(!r||!l)return;let _=await r("worker-repo-operation-dismiss",{operation_id:l});oe(_),_&&_.ok===!1&&ie(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${_.reason||""}`,"error",3e3)}async function ye(l){if(!r||!Number.isFinite(l))return;let _=Math.max(oo,Math.floor(l)),E=await r("worker-queue-set-slots",{slots:_,expected_revision:W()});oe(E),E&&E.conflict&&await r("worker-queue-set-slots",{slots:_,expected_revision:W()}).then(oe)}async function Ne(l){if(!r||!Number.isInteger(l)||l<1||l>qu)return;let _=Te(),E=(Array.isArray(_.serial_lanes)?_.serial_lanes:[]).slice(l).reduce((we,me)=>we+(Array.isArray(me?.entries)?me.entries.length:0),0),G=()=>({count:l,expected_revision:W()}),ae=await r("worker-queue-set-serial-lane-count",G());oe(ae),ae&&ae.conflict&&(ae=await r("worker-queue-set-serial-lane-count",G()),oe(ae)),ae&&ae.applied&&E>0&&ie(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${E}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}function Ae(){let l=Te(),_=h?h.selectBoardColumn(ng,"ready"):[],E=h?h.selectBoardColumn(sg,"blocked"):[],G=h?h.selectBoardColumn(ag,"closed"):[],ae=h?h.selectBoardColumn(og,"in_progress"):[],we=new Map;for(let y of ae){let j=wg(y);if(!j)continue;let le=we.get(j);le?le.push(y):we.set(j,[y])}let me=y=>{let j=gs(we.get(y)||[]);return j?j.title||j.id:null},et=l.bead_titles||{},v=new Map;for(let[y,j]of Object.entries(et))typeof j=="string"&&j.length>0&&v.set(y,j);for(let y of[..._,...E])v.set(y.id,y.title||y.id);let w=l.bead_times&&typeof l.bead_times=="object"&&!Array.isArray(l.bead_times)?l.bead_times:{},g=l.bead_labels&&typeof l.bead_labels=="object"&&!Array.isArray(l.bead_labels)?l.bead_labels:{},I=new Map;for(let[y,j]of Object.entries(g))Array.isArray(j)&&I.set(y,Ca(j));for(let y of[..._,...E]){let j=y.labels;Array.isArray(j)&&!I.has(y.id)&&I.set(y.id,Ca(j))}let T=new Map,ne=o?.get()?.last_good?.result?.groups;for(let y of Array.isArray(ne)?ne:[]){if(y?.eligible!==!0||!Array.isArray(y.members))continue;let j=y.members.map(Ge=>{let ft=(Array.isArray(l.serial_lanes)?l.serial_lanes:[]).find(Dt=>Dt.entries.some(Ct=>Ct.bead_id===Ge));return ft?ft.id:null});if(!(j.every(Ge=>Ge!==null)&&new Set(j).size===1))for(let Ge of y.members)T.set(Ge,y.members.filter(ft=>ft!==Ge))}let Be=l.bead_blocked_by&&typeof l.bead_blocked_by=="object"&&!Array.isArray(l.bead_blocked_by)?l.bead_blocked_by:{},Ye=new Map;for(let[y,j]of Object.entries(w))j&&typeof j=="object"&&Ye.set(y,j);for(let y of[..._,...E])Ye.set(y.id,{created_at:y.created_at,updated_at:y.updated_at});let Je=y=>Ye.get(y)||{},qe=l.pr_wait||[],bt=l.pr_observations||{},or=l.pr_activity||{},Vr=l.cleanup_failed||{},Yn=Object.entries(Vr).map(([y,j])=>({bead_id:y,step:j&&j.step?j.step:"",reason:j&&j.reason?j.reason:"",at:j&&typeof j.at=="number"?j.at:null,detail:j&&typeof j.detail=="string"?j.detail:null,output_tail:j&&typeof j.output_tail=="string"&&j.output_tail?j.output_tail:void 0,log_path:j&&typeof j.log_path=="string"&&j.log_path?j.log_path:void 0,retry_count:j&&typeof j.retry_count=="number"&&Number.isInteger(j.retry_count)&&j.retry_count>0?j.retry_count:0,failure_code:j&&typeof j.failure_code=="string"?j.failure_code:void 0,subject_id:j&&typeof j.subject_id=="string"?j.subject_id:void 0,repair_eligible:!!(j&&j.repair_eligible),repair:j&&j.repair?j.repair:void 0})),_n=l.queue||[],mn=new Set([..._n.map(y=>y.bead_id),...(Array.isArray(l.serial_lanes)?l.serial_lanes:[]).flatMap(y=>(Array.isArray(y?.entries)?y.entries:[]).map(j=>j.bead_id)),...qe.map(y=>y.bead_id),...l.done.map(y=>y.bead_id)]),Zn=new Set(E.map(y=>y.id)),Pe=c?c.get()?.order||{}:{},pt=new Set,Kr=[];for(let y of[..._,...E])mn.has(y.id)||pt.has(y.id)||vg(y)||(pt.add(y.id),Kr.push(y));O=yg(Kr,Q,Pe);let od=l.admission||{},qa=y=>{let j=od[y];if(!j)return"";if(j.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let le=typeof j.reason=="string"?j.reason:"",Ge=le.indexOf(":");return Ge>0&&Ge<le.length-1?`\u26D4 ${le.slice(0,Ge)} (${le.slice(Ge+1)})`:`\u26D4 ${le}`},ad=O.map(y=>{let j=js(y),le=j.path.length>0,Ge=y.workflow?.route==="quick_fix"||y.metadata&&y.metadata.route==="quick_fix",ft=!Object.hasOwn(y,"description")||typeof y.description=="string"&&y.description.trim().length>0,Dt=Object.hasOwn(y,"labels")&&xu(y.labels),Ct=!Dt&&(Ge?ft:le&&!j.conflict),ut=Zn.has(y.id),Yt=[];ut&&Yt.push(kg(y)),Ge&&!ft?Yt.push("missing_description"):!Ge&&j.conflict?Yt.push("spec_id_conflict"):!Ge&&!le&&Yt.push("spec \uC5C6\uC74C");let ss=qa(y.id);return ss&&Yt.push(ss),{id:y.id,title:y.title||y.id,reason:Yt.join(" \xB7 "),draggable:Ct,lane:"candidate",created_at:y.created_at,updated_at:y.updated_at,workflow:y.workflow,is_quick_fix:Ge,status:y.status,worker_ineligible:Dt,blocked:ut,has_spec:le}}),io=cg(ad,U),id=io.visible,ld=l.revise_parked||{},Xn=l.discard_operations&&typeof l.discard_operations=="object"&&!Array.isArray(l.discard_operations)?l.discard_operations:{},lo=(y,j)=>y.map((le,Ge)=>{let ft=j!=="done",Dt=j!=="done"&&j!=="queue",Ct=ft?ld[le.bead_id]:null,ut=ft?cr(Xn,le.bead_id):null,Yt=ut?.operation?ut:null,ss=ft&&I.get(le.bead_id)===!0,li=Be[le.bead_id]||[],_o=l.admission&&typeof l.admission=="object"?l.admission[le.bead_id]:null,mo=ft?xc(_o,!!Yt||M.has(le.bead_id)):null,wd=ft&&!mo?qa(le.bead_id):null,kd=ft?[wd]:[],ci=ft&&li.length>0&&typeof _o?.reason=="string"&&_o.reason.startsWith("not_ready")?[`\u23F8 ${li.join(", ")} \uC644\uB8CC \uB300\uAE30 (blocks)`]:[],go=ft?T.get(le.bead_id):void 0;return go&&go.length>0&&ci.push(`\u2733 serial \uAD8C\uC7A5 \xB7 ${go.join(", ")}\uC640`),{id:le.bead_id,title:v.get(le.bead_id)||le.bead_id,reason:kd.filter(Boolean).join(" \xB7 "),draggable:ft&&!Yt&&!mo,done:j==="done",lane:j,seq:Dt?Ge+1:void 0,worker_serial:ss,discard:Yt,stale_work:mo,badges:[...ci,...Ct?["\u23F8 REVISE \uD30C\uD0B9"]:[]],alert:!!Ct,revise_action:!!Ct,revise_enabled:!!Ct&&!Yt&&!se.has(le.bead_id),revise_title:Ct?Ct.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Ct.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:j==="done"?zt(l.attempts||{},le.bead_id):null,work_ms:j==="done"?kc(l.attempts||{},le.bead_id):null,done_at:j==="done"&&typeof le.added_at=="number"?le.added_at:void 0,...Je(le.bead_id)}}),Yr=l.attempts?Object.values(l.attempts):[],co=new Set;for(let y of Yr)y&&typeof y.resumed_from=="string"&&y.resumed_from.length>0&&co.add(y.resumed_from);let Fa=new Map;for(let y of Yr)Fa.set(y.bead_id,y.attempt_id);let Qn=new Map;for(let y of Yr)Qn.set(y.attempt_id,y);function uo(y){let j=new Set,le=y;for(;le&&!j.has(le.attempt_id);){if(le.conflict_resolution===!0)return!0;j.add(le.attempt_id),le=typeof le.resumed_from=="string"&&le.resumed_from.length>0&&Qn.get(le.resumed_from)||null}return!1}let Jn=typeof l.declared_base=="string"?l.declared_base:null;function cd(y){let j=null;for(let le of Yr)!le||le.bead_id!==y||uo(le)||(j===null||(typeof le.started_at=="number"?le.started_at:0)>=(typeof j.started_at=="number"?j.started_at:0))&&(j=le);return j&&typeof j.target_base=="string"?j.target_base:null}let ja=[],Ba=[],ud=$u(l),Ua=y=>{let j=typeof y.session_id=="string"&&y.session_id.length>0,le=co.has(y.attempt_id);return{eligible:j&&!le,reason:j?le?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},Kt=null;for(let y of Yr){let j=y.status==="paused"&&!co.has(y.attempt_id);if(y.status==="running"||j)Ba.push({bead_id:y.bead_id,attempt_id:y.attempt_id,title:v.get(y.bead_id)||y.bead_id,runner:y.runner||null,model:y.model||null,effort:y.effort||null,speed:y.speed||null,continuation_mode:y.continuation_mode||null,started_at:typeof y.started_at=="number"?y.started_at:null,resumed_from:y.resumed_from||null,paused:j,conflict_resolution:uo(y),base_exception:Oa(Jn,y.target_base),can_pause:typeof y.session_id=="string"&&y.session_id.length>0,discard:cr(Xn,y.bead_id,{attempt_id:y.attempt_id}),usage:zt(l.attempts||{},y.bead_id),current_child:me(y.bead_id),...Je(y.bead_id)});else if((y.status==="failed"||y.status==="orphaned")&&ud(y)){let le=Ua(y);ja.push({bead_id:y.bead_id,attempt_id:y.attempt_id,title:v.get(y.bead_id)||y.bead_id,runner:y.runner||null,model:y.model||null,effort:y.effort||null,speed:y.speed||null,continuation_mode:y.continuation_mode||null,started_at:typeof y.started_at=="number"?y.started_at:null,resumed_from:y.resumed_from||null,failed:!0,status:y.status,status_label:y.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:cr(Xn,y.bead_id,{attempt_id:y.attempt_id}),resume_eligible:le.eligible,resume_reason:le.reason,conflict_resolution:uo(y),base_exception:Oa(Jn,y.target_base),usage:zt(l.attempts||{},y.bead_id),current_child:me(y.bead_id),...Je(y.bead_id)}),Kt=y}}let es=[...ja,...Ba].map(y=>{let j=Qn.get(y.attempt_id),le=j?.quickfix_landing;if(j?.quickfix_lane!==!0||!le||typeof le!="object")return y;let Ge=typeof le.reason=="string"&&le.reason.length>0?le.reason:null,ft=zn({bead_id:j.bead_id,merge_sha:le.head_sha,cleanup_cursor:le.cursor,cleanup_failed:Ge?{step:le.cursor,reason:Ge}:null,repo_operations:Array.isArray(l.repo_operations)?l.repo_operations:[]});return ft?{...y,landing:ft}:y}),Wa=null;if(Kt){let y=Ua(Kt),j=Kt.cause_detail;Wa={bead_id:Kt.bead_id,repo:Kt.repo||"",reason:Kt.cause||Kt.status,cause_detail:j&&typeof j.reason=="string"?{reason:j.reason,command:typeof j.command=="string"?j.command:null}:null,resume_attempt_id:Kt.attempt_id,resume_eligible:y.eligible,resume_reason:y.reason,discard:cr(Xn,Kt.bead_id,{attempt_id:Kt.attempt_id})}}let za=new Set(es.map(y=>y.bead_id)),po=Array.isArray(l.merge_queue)?l.merge_queue:[],Ha=new Map,Ga=new Map,Va=new Map,Ka=new Map,Ya=new Map;po.forEach((y,j)=>{y&&typeof y.bead_id=="string"&&(Ha.set(y.bead_id,j+1),Ga.set(y.bead_id,y.resolution),Va.set(y.bead_id,y.continuation_action||null),Ka.set(y.bead_id,y.head_review||null),Ya.set(y.bead_id,y.authority||null))});let Zr=l.merge_queue_state||{active:null,failures:{}},dd=Zr.failures||{},Za=Zr.waiting&&typeof Zr.waiting.bead_id=="string"&&typeof Zr.waiting.reason=="string"?Zr.waiting:null,pd=l.auto_merge_skips||{},Xa=y=>{let j=pd[y];if(!j)return null;let le=bt[y],Ge=le&&le.pr?le.pr.head_sha:null;return Ge&&Ge===j.head_sha?j.reason||"":null},ts=new Map;for(let y of es)y.failed!==!0&&y.conflict_resolution&&(y.paused?ts.has(y.bead_id)||ts.set(y.bead_id,"paused"):ts.set(y.bead_id,"running"));let Qa=es.filter(y=>!y.paused&&y.failed!==!0).length,Ja=(l.workspace_info||{}).slots,ei=typeof Ja=="number"?Ja:typeof l.slots=="number"?l.slots:oo,fd=Qa>ei,rs=Nr(P),_d=(Array.isArray(l.done)?l.done.slice():[]).filter(y=>rs===void 0||typeof y.added_at!="number"||y.added_at>=rs).sort((y,j)=>(j.added_at||0)-(y.added_at||0)),gn=lo(_d,"done"),md=new Set((Array.isArray(l.done)?l.done:[]).map(y=>y?.bead_id).filter(y=>typeof y=="string")),ti=[],gd=d?.()||"";for(let y of G){let j=jr(y.closed_at);if(typeof y.id!="string"||md.has(y.id)||j===null||rs!==void 0&&j<rs||typeof y.comment_count!="number"||y.comment_count<=0)continue;let le=`${gd}\0${y.id}\0${String(y.updated_at)}\0${y.comment_count}`,Ge=D.get(le);Ge===void 0&&r&&(D.set(le,"pending"),Promise.resolve(r("get-comments",{id:y.id})).then(ft=>{let Dt=Array.isArray(ft)&&ft.some(Ct=>Bs(typeof Ct?.text=="string"?Ct.text:"")?.lane==="session");D.set(le,Dt?"session":"not-session"),X()}).catch(()=>{D.set(le,"failed"),X()})),Ge==="session"&&ti.push({id:y.id,title:y.title||y.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:null,done_at:j,created_at:y.created_at,updated_at:y.updated_at})}gn.push(...ti),gn.sort((y,j)=>(j.done_at||0)-(y.done_at||0));let ns={};for(let y of _r)ns[y]=0;let ri=!1,ni=0,fo=0,si=0;for(let y of gn){let j=y.usage;if(j&&typeof j=="object"){let le=!1;for(let Ge of _r)Number.isFinite(j[Ge])&&(ns[Ge]+=j[Ge],ri=!0,le=!0);le&&(fo+=1,Number.isFinite(j.total_cost_usd)&&(ni+=j.total_cost_usd,si+=1))}}fo>0&&si===fo&&(ns.total_cost_usd=ni);let oi=gn.map(y=>y.usage).filter(y=>y&&typeof y=="object"&&y.providers),bd=oi.length>0?At(As(oi)):ri?Qt(ns):null,hd=l.lane_states&&typeof l.lane_states=="object"&&!Array.isArray(l.lane_states)?l.lane_states:{},yd=Array.isArray(l.serial_lanes)?l.serial_lanes:[],ai=y=>{if(qe.some(Ge=>Ge.bead_id===y))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let j=Yr.filter(Ge=>Ge&&Ge.bead_id===y),le=j.length>0?j[j.length-1].status:null;return le==="failed"||le==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":le==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},ii=yd.filter(y=>y&&typeof y.id=="string"&&Array.isArray(y.entries)).map((y,j)=>{let le=hd[y.id]||{},Ge=new Map((Array.isArray(le.corrections)?le.corrections:[]).filter(ut=>ut&&typeof ut.bead_id=="string"&&typeof ut.after=="string").map(ut=>[ut.bead_id,ut.after])),ft=lo(y.entries.filter(ut=>!za.has(ut.bead_id)),y.id).map(ut=>Ge.has(ut.id)?{...ut,badges:[`\u{1F517} ${Ge.get(ut.id)} \uB4A4 (blocks \uC790\uB3D9)`,...ut.badges]}:ut),Dt=Array.isArray(le.occupied_by)?le.occupied_by.filter(ut=>typeof ut=="string"):[],Ct=Dt.map(ut=>({id:ut,title:v.get(ut)||ut,draggable:!1,lane:y.id,ghost:!0,badges:[ai(ut)]}));return{id:y.id,index:j+1,rows:[...Ct,...ft],occupied:Dt.length>0,badge:Dt.length>0?ai(Dt[0]):"\uB300\uAE30",cycle:le.cycle===!0}}),vd=typeof l.serial_lane_count=="number"?l.serial_lane_count:ii.length;return{queue:l,idToTitle:v,candidates:id,candidate_hidden:{blocked:io.hidden_blocked,spec:io.hidden_spec},running:es,live_count:Qa,slots:ei,over_cap:fd,failure:Wa,waiting:lo(_n.filter(y=>!za.has(y.bead_id)),"queue"),serial_lanes:ii,serial_lane_count:vd,pr_wait:qe.map(y=>Cg(y.bead_id,v.get(y.bead_id)||y.bead_id,bt,Vr[y.bead_id]||null,zt(l.attempts||{},y.bead_id),or[y.bead_id]||(R.has(y.bead_id)||H.has(y.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),ts.get(y.bead_id)||null,y.external===!0,{position:Ha.get(y.bead_id)||0,active:Zr.active===y.bead_id,failure:dd[y.bead_id]||null,waiting:Za?.bead_id===y.bead_id?Za.reason:null,resolution:Ga.get(y.bead_id),continuation_action:Va.get(y.bead_id),head_review:Ka.get(y.bead_id)||null,authority:Ya.get(y.bead_id)||null},y.wt_present!==!1,l.auto_merge===!0?Xa(y.bead_id):null,Oa(Jn,cd(y.bead_id)),l.completion_status&&typeof l.completion_status=="object"&&!Array.isArray(l.completion_status)&&l.completion_status[y.bead_id]||null,l.discard_operations&&typeof l.discard_operations=="object"&&!Array.isArray(l.discard_operations)?l.discard_operations:{},Qn.get(Fa.get(y.bead_id)||"")?.worker_serial===!0,l.auto_merge===!0,{merge_sha:y.merge_sha,cleanup_cursor:y.cleanup_cursor,repo_operations:Array.isArray(l.repo_operations)?l.repo_operations:[]})).map(y=>({...y,...Je(y.id)})),merge_queue_length:po.length,merge_queue_running:po.length>0,auto_excluded:qe.map(y=>y.bead_id).filter(y=>Xa(y)!==null),declared_base:Jn,done:gn,token_total:bd,cleanup_failures:Yn,repo_operations:Array.isArray(l.repo_operations)?l.repo_operations:[]}}function Se(){let _=!!o?.get()?.job,E=!_&&o?.isPending?.()===!0,G=_?"\uBD84\uC11D \uC911":E?"\uC900\uBE44 \uC911":"";return i`<button
      type="button"
      class=${G?"worker-analysis-btn worker-analysis-btn--running":"worker-analysis-btn"}
      aria-busy=${G?"true":"false"}
      title="대기 이슈의 병렬 실행 가능성을 분석해 직렬 그룹을 제안합니다 (클릭할 때만 실행)"
    >
      ✳ 병렬성
      분석${G?i`<span class="worker-analysis-btn__badge">${G}</span>`:""}
    </button>`}function Ke(l){let _=l.waiting.length>0?l.waiting[0].id:"\u2014",E=i`<button
      type="button"
      class="worker-play${l.queue.auto_advance?" is-active":""}"
    >
      ${l.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,G=F(l),ae=l.over_cap?i`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",we=i`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${l.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${l.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${L()} 완료 <b>${l.done.length}</b></span
      >`,me=i`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${l.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${l.declared_base||"?"}</span
    >`,et=i`<label class="worker-tgl worker-slots"
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
          ${Array.from({length:qu},(g,I)=>I+1).map(g=>i`<option
                value=${String(g)}
                ?selected=${l.serial_lane_count===g}
              >
                ${g}
              </option>`)}
        </select>
      </label>
      ${o?Se():""} `,v=qc({failure:l.failure}),w=$c(l.repo_operations,l.cleanup_failures);return m?i`<div class="worker-ribbon">
          ${E} ${G}
          <div class="worker-kpi worker-kpi--ribbon">${ae}${we}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${et}</div>
          <div class="worker-kpi">${me}</div>
        </div>
        ${w}${We.template()}${v}`:i`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${E}${G}${et}</div>
        <div class="worker-kpi">
          ${ae}${we}${me}
          ${(Array.isArray(l.token_total)?l.token_total:l.token_total?[{label:l.token_total,tooltip:`${L()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(g=>i`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${g.tooltip}
                >${L()} 완료 · 누적 ${g.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${_}</b></span
          >
        </div>
      </div>
      ${w}${We.template()}${v}`}function z(l){if(l.running.length===0&&l.pr_wait.length===0)return"";let _=l.running.some(E=>!E.paused&&E.failed!==!0);return i`<section
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
      ${l.running.length>0?wa(l.running,Date.now(),Le):""}
      ${l.pr_wait.map(E=>fa(E))}
    </section>`}function re(l){let _=l.candidate_hidden;return i`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${U.show_blocked}
        />
        🔒 blocked${_.blocked>0?` ${_.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${ug.map(E=>i`<button
              type="button"
              class="worker-filter__chip${U.spec===E.value?" is-active":""}"
              data-spec=${E.value}
              aria-pressed=${U.spec===E.value?"true":"false"}
            >
              ${E.label}
            </button>`)}
        ${_.spec>0?i`<span class="worker-filter__hidden">숨김 ${_.spec}</span>`:""}
      </div>
    </div>`}function be(){return i`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${Q}
    >
      ${dg.map(l=>i`<option value=${l.value} ?selected=${Q===l.value}>
            ${l.label}
          </option>`)}
    </select>`}function k(){return i`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${P}
      >
        ${ar.map(l=>i`<option value=${l.value} ?selected=${P===l.value}>
              ${l.label}
            </option>`)}
      </select>
    </div>`}function C(l){let _=i`<span
      class="worker-lane__badge${l.occupied?" worker-lane__badge--held":""}"
      >${l.badge}</span
    >`,E=l.cycle?i`<div class="worker-lane__cycle">
          ⚠ blocks 순환 감지 — 자동 정렬을 생략했습니다
        </div>`:"";return nr({id:`worker-pane-lane-${l.id}`,lane:l.id,title:`\uC9C1\uB82C ${l.index}`,items:l.rows,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:_,controls:E})}function F(l){let _=l.queue.auto_merge===!0;if(l.merge_queue_running)return i`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${_?" is-active":""}"
        title=${_?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${_?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${l.merge_queue_length}
      </button>`;if(_)return i`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let E=new Set(l.auto_excluded),G=l.pr_wait.filter(ae=>ae.merge_action&&ae.merge_enabled&&!E.has(ae.id)).length;return i`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${G>0?` ${G}`:""}
    </button>`}function J(l){let _=nr({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:l.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:be(),controls:re(l),place_menu:Y(l.candidates)});return m?i`<div class="worker-lanes worker-lanes--mobile">
        ${z(l)}
        ${nr({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:l.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:B.queue,preview:ju(l.waiting)})}
        ${l.serial_lanes.map(E=>C(E))}
        ${_}
        ${nr({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:l.done,empty:`${L()} \uC644\uB8CC \uC5C6\uC74C`,controls:k(),collapsible:!0,collapsed:B.done,preview:Array.isArray(l.token_total)?l.token_total.map(E=>E.label).join(" \xB7 "):l.token_total||ju(l.done)})}
      </div>`:i`<div class="worker-lanes">
      ${_}
      <div class="worker-wait">
        ${nr({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:l.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
        ${l.serial_lanes.map(E=>C(E))}
      </div>
      ${nr({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${l.slots}`,items:l.running,live:l.running.some(E=>!E.paused&&E.failed!==!0),body:wa(l.running,Date.now(),Le)})}
      ${nr({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:l.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${nr({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${L()} ${l.done.length}`,items:l.done,empty:`${L()} \uC644\uB8CC \uC5C6\uC74C`,controls:k()})}
    </div>`}function ke(l){B={...B,[l]:!B[l]},hg(B),X()}function X(){let l=Ae();Ze(Ke(l),ge),Ze(J(l),_e)}function Ee(){let l=document.querySelector(".app-header");if(!l)return;let _=()=>{let E=Math.round(l.getBoundingClientRect().height);de.style.setProperty("--worker-ribbon-top",`${E}px`)};if(_(),typeof ResizeObserver=="function"){let E=new ResizeObserver(_);E.observe(l),q.push(()=>E.disconnect())}else window.addEventListener("resize",_),q.push(()=>window.removeEventListener("resize",_))}function Ce(){if(typeof window.matchMedia!="function")return;let l=window.matchMedia(gg);m=!!l.matches;let _=E=>{let G=!!(E&&typeof E.matches=="boolean"?E.matches:l.matches);G!==m&&(m=G,X())};typeof l.addEventListener=="function"?(l.addEventListener("change",_),q.push(()=>l.removeEventListener("change",_))):typeof l.addListener=="function"&&(l.addListener(_),q.push(()=>l.removeListener(_)))}let mt=null;function Et(l){mt=l.target instanceof Element?l.target:null}function nt(l){let E=l.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!E)return;if(mt&&E.contains(mt)&&mt.closest("input, button, a")){l.preventDefault();return}let G=E.dataset.beadId||"",ae=E.dataset.lane||"";S={bead_id:G,from_lane:ae};try{l.dataTransfer?.setData("text/plain",G),l.dataTransfer&&(l.dataTransfer.effectAllowed="move")}catch{}}function vt(l){let _=l.target?.closest?.(".worker-pane");if(!_)return;let E=_.dataset.lane||"";E!=="candidate"&&E!=="queue"&&!/^s[1-5]$/.test(E)||(l.preventDefault(),l.dataTransfer&&(l.dataTransfer.dropEffect="move"),_.classList.add("worker-pane--drag-over"))}function ur(l){l.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function wt(l,_){let E=O.find(me=>me.id===l);if(!E)return;let G=O.filter(me=>me.id!==l),ae=G.length;if(_){let me=_.dataset.beadId;if(me===l)return;let et=G.findIndex(v=>v.id===me);et>=0&&(ae=et)}let we=G.slice();we.splice(ae,0,E),A.applyReorder(l,we,ae)}function Tt(l){let _=l.target?.closest?.(".worker-pane");if(!_)return;l.preventDefault(),_.classList.remove("worker-pane--drag-over");let E=_.dataset.lane||"",G=S?.bead_id||l.dataTransfer?.getData("text/plain")||"",ae=S?.from_lane||"";if(S=null,!G)return;let we=l.target?.closest?.(".worker-mini, .worker-card"),me=Array.from(_.querySelectorAll(".worker-mini, .worker-card")),et=me.length;if(we){let v=me.indexOf(we);v>=0&&(et=v)}if(et=Math.max(0,et-_.querySelectorAll(".worker-mini--ghost").length),_.classList.contains("worker-pane--collapsed")&&(et=Oe()),E==="candidate"){if(ae==="candidate"){wt(G,we);return}(ae==="queue"||/^s[1-5]$/.test(ae))&&Ie(G);return}if(E==="queue"||/^s[1-5]$/.test(E)){let v=E==="queue"?"parallel":E;ae===E?Ve(G,v,et):ze(G,v)}}function dr(l){U=l,lg(l),X()}function wr(l){Q=l==="board"||l==="created"||l==="spec"?l:ao,fg(Q),X()}function Bt(l){P=Wt(l)?l:Nt,mg(P),f?.(P),X()}function Gt(l){let _=l.target?.closest?.(".worker-serial-lane-count");if(_){let et=Number.parseInt(_.value,10);Number.isFinite(et)&&Ne(et).then(X);return}let E=l.target?.closest?.(".worker-filter__blocked");if(E){dr({...U,show_blocked:E.checked});return}let G=l.target?.closest?.(".worker-done-range");if(G){Bt(G.value);return}let ae=l.target?.closest?.(".worker-sort");if(ae){wr(ae.value||ao);return}let we=l.target?.closest?.(".worker-slots__input");if(!we)return;let me=Number.parseInt(we.value,10);if(!Number.isFinite(me)){X();return}ye(me).then(X)}function kt(l){return l?{runner:l.runner||void 0,model:l.model||void 0,effort:l.effort||void 0,worktree:l.worktree||void 0,status:l.status||void 0,session_id:l.session_id||void 0}:{}}function sr(){let l=Ae();return{operations:l.repo_operations,cleanup_failures:l.cleanup_failures,repo:d&&d()||""}}function st(){Le&&$e.close(),Ue.hidden=!1,pe.hidden=!1,Re.open(sr()),X()}function Mt(l){let _=Te(),E=_.attempts?_.attempts[l]:null;Le=l,he=null,Re.close(),Ue.hidden=!0,pe.hidden=!1,$e.open({attempt_id:l,meta:kt(E)}),X()}function kr(l,_){Le=null,he=l,Re.close(),Ue.hidden=!0,pe.hidden=!1,$e.open({attempt_id:l,meta:_,hide_prompt:!0}),X()}function Vt(){if(Re.isOpen()&&Re.refresh(sr()),he){let E=(o?.get()?.runs||[]).find(G=>G.run_id===he);E?$e.updateMeta(Ia(E)):$e.close();return}if(!Le)return;let l=Te(),_=l.attempts?l.attempts[Le]:null;if(_){$e.updateMeta(kt(_));return}$e.close()}function ve(l){let _=l.target;if(_?.closest?.(".worker-mini__serial, .worker-mini__grip")||_?.closest?.("#worker-parallel-analysis-dialog"))return;if(_?.closest?.(".worker-analysis-btn")){Xe?.open();return}if(_?.closest?.(".worker-repo-strip")||_?.closest?.(".worker-mini__timeline")){st();return}let E=_?.closest?.(".worker-repo-op__session");if(E){let Pe=E.dataset.attemptId;Pe&&Mt(Pe);return}let G=_?.closest?.(".worker-repo-op__resolve");if(G){ue(G.dataset.operationId||"");return}let ae=_?.closest?.(".worker-repo-op__dismiss");if(ae){De(ae.dataset.operationId||"");return}let we=_?.closest?.(".worker-cleanup__resume");if(we){let Pe=we.dataset.beadId;Pe&&He(Pe);return}let me=_?.closest?.(".worker-banner__resume");if(me){let Pe=me.dataset.attemptId;Pe&&Qe(Pe);return}let et=_?.closest?.(".worker-banner__discard");if(et){let Pe=et.dataset.confirmation==="merged"?"merged":"unmerged";N(et.dataset.beadId||"",et.dataset.attemptId||null,Pe,et.dataset.operationId||null);return}let v=_?.closest?.(".worker-banner__dismiss");if(v){let Pe=v.dataset.attemptId;Pe&&V(Pe);return}if(_?.closest?.(".worker-play")){ce(!Te().auto_advance);return}let w=_?.closest?.(".worker-merge-all");if(w){w.classList.contains("worker-merge-all--stop")?Te().auto_merge===!0?b(!1):$():b(!0);return}let g=_?.closest?.(".worker-pane__hd--toggle");if(g){let Pe=g.dataset.lane;(Pe==="queue"||Pe==="done")&&ke(Pe);return}let I=_?.closest?.(".worker-card__place-lane");if(I){let Pe=I.dataset.beadId,pt=I.dataset.lane;Pe&&(pt==="parallel"||/^s[1-5]$/.test(pt||""))&&(ee=null,X(),ze(Pe,pt));return}if(_?.closest?.(".worker-card__place-cancel")){ee=null,X();return}let ne=_?.closest?.(".worker-card__place");if(ne){let Pe=ne.dataset.beadId;Pe&&!ne.disabled&&(ot()?(ee=Pe,X()):ze(Pe,"parallel"));return}let Be=_?.closest?.(".worker-filter__chip");if(Be){let Pe=Be.dataset.spec;(Pe==="all"||Pe==="with"||Pe==="without")&&dr({...U,spec:Pe});return}let Ye=_?.closest?.(".worker-mini__merge");if(Ye){let Pe=Ye.dataset.beadId||"";Te().cleanup_failed?.[Pe]?He(Pe):Me(Pe);return}let Je=_?.closest?.(".worker-mini__merge-cancel");if(Je){x(Je.dataset.beadId||"");return}let qe=_?.closest?.(".worker-mini__discard");if(qe){N(qe.dataset.beadId||"",qe.dataset.attemptId||null,qe.dataset.discardMode==="merged"?"merged":"unmerged",qe.dataset.operationId||null);return}let bt=_?.closest?.(".worker-mini__stale-continue");if(bt){K("worker-stale-work-continue",bt.dataset.beadId||"",bt.dataset.actionId||"");return}let or=_?.closest?.(".worker-mini__stale-backup");if(or){K("worker-stale-work-backup-fresh",or.dataset.beadId||"",or.dataset.actionId||"");return}let Vr=_?.closest?.(".worker-mini__stale-recheck");if(Vr){K("worker-stale-work-recheck",Vr.dataset.beadId||"",Vr.dataset.actionId||"");return}let Yn=_?.closest?.(".worker-mini__revise-fix");if(Yn){Z("worker-revise-fix",Yn.dataset.beadId||"");return}let _n=_?.closest?.(".worker-mini__revise-approve");if(_n){Z("worker-revise-approve",_n.dataset.beadId||"");return}if(_?.closest?.(".worker-mini__pr"))return;if(_?.closest?.(".rtile__discard")){let Pe=_?.closest?.(".rtile"),pt=Pe?.dataset?.beadId,Kr=Pe?.dataset?.attemptId;pt&&N(pt,Kr||null,"unmerged",_?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(_?.closest?.(".rtile__dismiss")){let pt=_?.closest?.(".rtile")?.dataset?.attemptId;pt&&V(pt);return}if(_?.closest?.(".rtile__pause")){let pt=_?.closest?.(".rtile")?.dataset?.attemptId;pt&&lt(pt);return}if(_?.closest?.(".rtile__resume")){let pt=_?.closest?.(".rtile")?.dataset?.attemptId;pt&&Qe(pt);return}if(_?.closest?.(".rtile__session")){let pt=_?.closest?.(".rtile")?.dataset?.attemptId;pt&&Mt(pt);return}if(_?.closest?.(".worker-drawer-overlay__backdrop")){Re.close(),$e.close();return}if(_?.closest?.(".worker-drawer-host"))return;let mn=_?.closest?.(".rtile");if(mn){if(_?.closest?.(".rtile__id")){let pt=mn.dataset.beadId;pt&&Xt(pt).then(Kr=>{Kr?ie("\uBCF5\uC0AC\uB428","success",1200):ie("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Pe=mn.dataset.beadId;Pe&&u&&u(Pe);return}let Zn=_?.closest?.(".worker-mini, .worker-card");if(Zn){let Pe=Zn.dataset.beadId;if(_?.closest?.(".worker-mini__id, .worker-card__id")){Pe&&Xt(Pe).then(pt=>{pt?ie("\uBCF5\uC0AC\uB428","success",1200):ie("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}Pe&&u&&u(Pe)}}return e.addEventListener("pointerdown",Et),e.addEventListener("dragstart",nt),e.addEventListener("dragover",vt),e.addEventListener("dragleave",ur),e.addEventListener("drop",Tt),e.addEventListener("click",ve),e.addEventListener("change",Gt),Ce(),Ee(),h&&q.push(h.subscribe(()=>{for(let[l,_]of D)_==="failed"&&D.delete(l);X()})),s&&q.push(s.subscribe(()=>{let l=d&&d()||"";l!==xe&&(xe=l,je.close()),X(),Vt()})),o&&typeof o.subscribe=="function"&&q.push(o.subscribe(()=>{Vt(),X()})),X(),{load(){X()},destroy(){for(let l of q.splice(0))try{l()}catch{}e.removeEventListener("pointerdown",Et),e.removeEventListener("dragstart",nt),e.removeEventListener("dragover",vt),e.removeEventListener("dragleave",ur),e.removeEventListener("drop",Tt),e.removeEventListener("click",ve),e.removeEventListener("change",Gt);try{$e.destroy()}catch{}pe.hidden=!0;try{Xe?.destroy()}catch{}try{je.destroy()}catch{}Ze(i``,e)}}}function Pa(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function Vu(e,t,r,n=async()=>{},s=async()=>{}){let o=gt("views:workspace-picker"),a=null,c=!1,u=!1,d=!1;async function p(B){let R=B.target.value,se=t.getState().workspace?.current?.path||"";if(R&&R!==se){o("switching workspace to %s",R),c=!0,L();try{await r(R)}catch(M){o("workspace switch failed: %o",M)}finally{c=!1,L()}}}async function f(){let B=t.getState(),m=B.workspace?.current?.path||B.workspace?.available?.[0]?.path||"";if(!(!m||u)){o("git-pulling workspace %s",m),u=!0,L();try{await n(m)}catch(R){o("workspace git pull failed: %o",R)}finally{u=!1,L()}}}function h(B){let m=B.target;m&&e.contains(m)||O()}function A(B){B.key==="Escape"&&O()}function S(){d||(d=!0,document.addEventListener("mousedown",h),document.addEventListener("keydown",A),L())}function O(){d&&(d=!1,document.removeEventListener("mousedown",h),document.removeEventListener("keydown",A),L())}function U(){d?O():S()}async function ee(B){let m=B.target,R=m.value,H=m.checked;o("toggling visibility %s \u2192 %s",R,String(H));try{await s(R,H)}catch(se){o("workspace visibility toggle failed: %o",se)}}function Q(B){return B?i`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${f}
        ?disabled=${c||u}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:i``}function P(B,m){return i`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${U}
          aria-haspopup="true"
          aria-expanded=${d?"true":"false"}
          aria-label="프로젝트 관리"
        >
          프로젝트 관리
        </button>
        ${d?i`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${B.map(R=>i`
                    <label
                      class="workspace-picker__manage-row"
                      title="${R.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${R.path}"
                        .checked=${!m.has(R.path)}
                        @change=${ee}
                      />
                      <span class="workspace-picker__manage-name"
                        >${Pa(R.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function D(){let B=t.getState(),m=B.workspace?.current,R=B.workspace?.available||[],H=new Set(B.workspace?.hidden||[]),se=m?.path||R[0]?.path||"";if(R.length===0)return i``;let M=R.filter(q=>!H.has(q.path)||q.path===se);if(M.length<=1){let q=M[0]||R[0],de=Pa(q.path);return i`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${q.path}"
            >${de}</span
          >
          ${P(R,H)}
          ${Q(se)}
          ${u?i`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return i`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${p}
          ?disabled=${c||u}
          aria-label="Select project workspace"
        >
          ${M.map(q=>i`
              <option
                value="${q.path}"
                ?selected=${q.path===se}
                title="${q.path}"
              >
                ${Pa(q.path)}
              </option>
            `)}
        </select>
        ${P(R,H)}
        ${Q(se)}
        ${c||u?i`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function L(){Ze(D(),e)}return L(),a=t.subscribe(()=>L()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",h),document.removeEventListener("keydown",A),Ze(i``,e)}}}var Ku=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-serial-lane-count","subscribe-worker-parallel-analysis","unsubscribe-worker-parallel-analysis","worker-parallel-analysis-snapshot","worker-parallel-analysis-targets","worker-parallel-analysis-prompt","worker-parallel-analysis-start","worker-parallel-analysis-cancel","worker-parallel-analysis-settings-update","worker-parallel-analysis-submit","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle"];function Da(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function Yu(e,t,r=Da()){return{id:r,type:e,payload:t}}function Zu(e={}){let t=gt("ws"),r={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},n=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,c=null,u=!0,d=new Map,p=[],f=new Map,h=new Set;function A(D){for(let L of Array.from(h))try{L(D)}catch{}}function S(){if(!u||c)return;o="reconnecting",t("ws reconnecting\u2026"),A(o);let D=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,a)),L=(r.jitterRatio||0)*D,B=Math.max(0,Math.round(D+(Math.random()*2-1)*L));t("ws retry in %d ms (attempt %d)",B,a+1),c=setTimeout(()=>{c=null,P()},B)}function O(D){try{s?.send(JSON.stringify(D))}catch(L){t("ws send failed",L)}}function U(){for(o="open",t("ws open"),A(o),a=0;p.length;){let D=p.shift();D&&O(D)}}function ee(D){let L;try{L=JSON.parse(String(D.data))}catch{t("ws received non-JSON message");return}if(!L||typeof L.id!="string"||typeof L.type!="string"){t("ws received invalid envelope");return}if(d.has(L.id)){let m=d.get(L.id);d.delete(L.id),L.ok?m?.resolve(L.payload):m?.reject(L.error||new Error("ws error"));return}let B=f.get(L.type);if(B&&B.size>0)for(let m of Array.from(B))try{m(L.payload)}catch(R){t("ws event handler error",R)}else t("ws received unhandled message type: %s",L.type)}function Q(){o="closed",t("ws closed"),A(o);for(let[D,L]of d.entries())L.reject(new Error("ws disconnected")),d.delete(D);a+=1,S()}function P(){if(!u)return;let D=n();try{s=new WebSocket(D),t("ws connecting %s",D),o="connecting",A(o),s.addEventListener("open",U),s.addEventListener("message",ee),s.addEventListener("error",()=>{}),s.addEventListener("close",Q)}catch(L){t("ws connect failed %o",L),S()}}return P(),{send(D,L){if(!Ku.includes(D))return Promise.reject(new Error(`unknown message type: ${D}`));let B=Da(),m=Yu(D,L,B);return t("send %s id=%s",D,B),new Promise((R,H)=>{d.set(B,{resolve:R,reject:H,type:D}),s&&s.readyState===s.OPEN?O(m):(t("queue %s id=%s (state=%s)",D,B,o),p.push(m))})},on(D,L){f.has(D)||f.set(D,new Set);let B=f.get(D);return B?.add(L),()=>{B?.delete(L)}},onConnection(D){return h.add(D),()=>{h.delete(D)}},reconnect(){u=!0,c&&(clearTimeout(c),c=null),a=0,P()},close(){u=!1,c&&(clearTimeout(c),c=null);try{s?.close()}catch{}},getState(){return o}}}function Rg(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function Ig(e,t){try{let n=await(await fetch("/api/config")).json();e.setState({config:n})}catch(r){t("config refresh failed",r)}}var Na=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Xu=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:closed","closed-issues"]],Rr="tab:worker:closed",Lg="bdui.worker.done-range",Qu=nu,Ju="worker:queue",ed="worker:parallel-analysis",td="ui:order",rd="ui:display-policy",nd="exec:presets",Ir="tab:board:closed",sd="beads-ui.board.closed-range";function Og(e){let t=gt("main");t("bootstrap start");let r=i`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Ze(r,e);let n=document.getElementById("top-nav"),s=document.getElementById("usage-meter"),o=document.getElementById("board-root"),a=document.getElementById("worker-root"),c=document.getElementById("monitor-root"),u=document.getElementById("detail-panel");if(s&&ku(s),o&&a&&c&&u){let Ue=function(v,w){let g="Request failed",I="";if(v&&typeof v=="object"){let ne=v;if(typeof ne.message=="string"&&ne.message.length>0&&(g=ne.message),typeof ne.details=="string")I=ne.details;else if(ne.details&&typeof ne.details=="object")try{I=JSON.stringify(ne.details,null,2)}catch{I=""}}else typeof v=="string"&&v.length>0&&(g=v);let T=w&&w.length>0?`Failed to load ${w}`:"Request failed";rt.open(T,g,I)},Qe=function(v){return`${st.getState().workspace.current?.path||""}\0${v}`},V=function(){Y&&(Y().catch(()=>{}),Y=null),W=null,oe=null},Me=function(v){Oe=v;let w=()=>{Oe!==v||st.getState().selected_id!==v||(Oe=null,te(v))};if(!Ie){Ve.then(w);return}w()},x=function(v,w,g,I,T){return g!==b[w]?(T().catch(()=>{}),!1):(v.set(I,T),!0)},N=function(){let v=st.getState();De(v.view==="board"),z(v.view==="worker"),F(v.view==="monitor"),be(v.view==="board"||v.view==="worker"||$||!!v.selected_id)},ce=function(){let v=Nr(K);return v===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:v}}},ue=function(){let v=Nr(Z);return v===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:v}}},De=function(v){if(v)for(let[w,g]of Na){if(He.has(w)||fe.has(w))continue;let I=w===Ir?ce():{type:g};try{$e.register(w,I)}catch(Be){t("register %s store failed: %o",w,Be)}fe.add(w);let T=b.board,ne=!1;he.subscribeList(w,I).then(Be=>{ne=!x(He,"board",T,w,Be)}).catch(Be=>{t("subscribe %s failed: %o",w,Be),Ue(Be,"board")}).finally(()=>{fe.delete(w),ne&&N()})}else Ae()},Ae=function(){b.board+=1;for(let[v]of Na){let w=He.get(v);w&&(w().catch(()=>{}),He.delete(v));try{$e.unregister(v)}catch(g){t("unregister %s failed: %o",v,g)}}},z=function(v){if(!v){re();return}for(let[w,g]of Xu){if(Se.has(w)||fe.has(w))continue;let I=w===Rr?ue():{type:g};try{$e.register(w,I)}catch(Be){t("register %s store failed: %o",w,Be)}fe.add(w);let T=b.worker,ne=!1;he.subscribeList(w,I).then(Be=>{ne=!x(Se,"worker",T,w,Be)}).catch(Be=>{t("subscribe %s failed: %o",w,Be),Ue(Be,"worker")}).finally(()=>{fe.delete(w),ne&&N()})}},re=function(){b.worker+=1;for(let[v]of Xu){let w=Se.get(v);w&&(w().catch(()=>{}),Se.delete(v));try{$e.unregister(v)}catch(g){t("unregister %s failed: %o",v,g)}}},be=function(v){if(!v){k();return}Ke||(Le("subscribe-worker-queue",{id:Ju}).catch(w=>{t("subscribe-worker-queue failed: %o",w)}),Le("subscribe-worker-parallel-analysis",{id:ed}).catch(w=>{t("subscribe-worker-parallel-analysis failed: %o",w)}),Ke=()=>(Le("unsubscribe-worker-parallel-analysis",{id:ed}),Le("unsubscribe-worker-queue",{id:Ju})))},k=function(){Ke&&(Ke().catch(()=>{}),Ke=null),je.clear()},F=function(v){if(!v){J();return}C||(Le("subscribe-monitor-pipeline",{id:Qu}).catch(w=>{t("subscribe-monitor-pipeline failed: %o",w)}),C=()=>Le("unsubscribe-monitor-pipeline",{id:Qu}))},J=function(){C&&(C().catch(()=>{}),C=null)},X=function(){ke||(Le("subscribe-ui-order",{id:td}).catch(v=>{t("subscribe-ui-order failed: %o",v)}),ke=()=>Le("unsubscribe-ui-order",{id:td}))},Ee=function(){ke&&(ke().catch(()=>{}),ke=null),We.clear()},mt=function(){Ce||(Le("subscribe-display-policy",{id:rd}).catch(v=>{t("subscribe-display-policy failed: %o",v)}),Ce=()=>Le("unsubscribe-display-policy",{id:rd}))},Et=function(){Ce&&(Ce().catch(()=>{}),Ce=null),Xe.clear()},vt=function(){nt||(Le("subscribe-impl-presets",{id:nd}).catch(v=>{t("subscribe-impl-presets failed: %o",v)}),nt=()=>Le("unsubscribe-impl-presets",{id:nd}))},Bt=function(v){if(!v)return"Unknown";let w=v.split("/").filter(Boolean);return w.length>0?w[w.length-1]:"Unknown"};var d=Ue,p=Qe,f=V,h=Me,A=x,S=N,O=ce,U=ue,ee=De,Q=Ae,P=z,D=re,L=be,B=k,m=F,R=J,H=X,se=Ee,M=mt,q=Et,de=vt,ge=Bt;let pe=document.getElementById("header-loading"),Fe=Gi(pe),rt=wc(e),_e=Zu(),Le=Fe.wrapSend((v,w)=>_e.send(v,w)),he=qi(Le),$e=Fi(),Re=Ui(),je=Bi(),xe=$i(),We=ji(),Xe=wi(),Te=ki(),ot=xi();_e.on("impl-presets-snapshot",v=>{let w=v;w&&typeof w.revision=="number"&&Array.isArray(w.presets)&&Te.set({revision:w.revision,presets:w.presets})}),_e.on("monitor-pipeline-snapshot",v=>{let w=v;if(!(!w||!Array.isArray(w.workspaces)))try{xe.set(w.workspaces,w.workspaces_state)}catch{}}),_e.on("ui-order-snapshot",v=>{let w=v;if(w&&typeof w.revision=="number")try{We.set({revision:w.revision,order:w.order&&typeof w.order=="object"?w.order:{}})}catch{}}),_e.on("display-policy-snapshot",v=>{let w=v;if(w&&w.policy&&typeof w.policy=="object")try{Xe.set(w.policy)}catch{}}),_e.on("session-log-snapshot",v=>{let w=v;if(w&&typeof w.id=="string")try{ot.set(w.id,Array.isArray(w.lines)?w.lines:[],typeof w.last_event_at=="number"?w.last_event_at:null)}catch{}}),_e.on("session-log-append",v=>{let w=v;if(w&&typeof w.id=="string")try{ot.append(w.id,w.event)}catch{}}),_e.on("snapshot",v=>{let w=v,g=w&&typeof w.id=="string"?w.id:"",I=g?$e.getStore(g):null;if(I&&w&&w.type==="snapshot")try{I.applyPush(w)}catch{}}),_e.on("upsert",v=>{let w=v,g=w&&typeof w.id=="string"?w.id:"",I=g?$e.getStore(g):null;if(I&&w&&w.type==="upsert")try{I.applyPush(w)}catch{}}),_e.on("delete",v=>{let w=v,g=w&&typeof w.id=="string"?w.id:"",I=g?$e.getStore(g):null;if(I&&w&&w.type==="delete")try{I.applyPush(w)}catch{}});let Y=null,W=null,oe=null,Oe=null,ze=()=>{},Ve=new Promise(v=>{ze=()=>v(void 0)}),Ie=!1,lt=!1;async function te(v){let w=Qe(v);if(w===W||w===oe)return;oe=w;let g=`detail:${v}`,I={type:"issue-detail",params:{id:v}};try{$e.register(g,I)}catch(T){t("register detail store failed: %o",T)}try{let T=await he.subscribeList(g,I);if(st.getState().selected_id!==v||Qe(v)!==w){await T().catch(()=>{});return}Y&&await Y().catch(()=>{}),Y=T,W=w}catch(T){t("detail subscribe failed: %o",T),Ue(T,"issue details")}finally{oe===w&&(oe=null)}}let He=new Map,fe=new Set,b={board:0,worker:0},$=!1,K=Nt;try{let v=window.localStorage.getItem(sd);Wt(v)&&(K=v)}catch{}let Z=Nt;try{let v=window.localStorage.getItem(Lg);Wt(v)&&(Z=v)}catch{}async function ye(v){if(!Wt(v)||v===K)return;K=v;try{window.localStorage.setItem(sd,v)}catch{}let w=He.get(Ir);if(!w)return;He.delete(Ir),await w().catch(()=>{});let g=ce();try{$e.register(Ir,g)}catch(I){t("register %s store failed: %o",Ir,I)}try{let I=await he.subscribeList(Ir,g);He.set(Ir,I)}catch(I){t("re-subscribe %s failed: %o",Ir,I),Ue(I,"board")}}async function Ne(v){if(!Wt(v)||v===Z)return;Z=v;let w=Se.get(Rr);if(!w)return;Se.delete(Rr),await w().catch(()=>{});let g=ue();try{$e.register(Rr,g)}catch(I){t("register %s store failed: %o",Rr,I)}try{let I=await he.subscribeList(Rr,g);Se.set(Rr,I)}catch(I){t("re-subscribe %s failed: %o",Rr,I),Ue(I,"worker")}}let Se=new Map,Ke=null,C=null,ke=null,Ce=null,nt=null;async function ur(){Ce=null,Xe.clear(),nt=null,Te.clear(),Ke=null,C=null,He.clear(),Se.clear(),b.board+=1,b.worker+=1,vt();let v=st.getState().workspace.current?.path;if(v)try{await _e.send("set-workspace",{path:v})}catch(g){t("workspace restore after reconnect failed: %o",g);return}mt();let w=st.getState();De(w.view==="board"),z(w.view==="worker"),F(w.view==="monitor"),be(w.view==="board"||w.view==="worker"||!!w.selected_id)}async function wt(){t("clearing all subscriptions for workspace switch"),Ae(),re(),k(),Re.clear(),Ee(),X(),Et(),mt(),V();let v=st.getState();if(v.selected_id)try{$e.unregister(`detail:${v.selected_id}`)}catch{}let w=st.getState();De(w.view==="board"),z(w.view==="worker"),F(w.view==="monitor"),be(w.view==="board"||w.view==="worker"||!!w.selected_id),w.selected_id&&Me(w.selected_id)}async function Tt(v){t("requesting workspace switch to %s",v),lt=!0;try{let w=await _e.send("set-workspace",{path:v});t("workspace switch result: %o",w),w&&w.workspace&&(st.setState({workspace:{current:{path:w.workspace.root_dir,database:w.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",v),w.changed&&(await wt(),ie("Switched to "+Bt(v),"success",2e3)))}catch(w){throw t("workspace switch failed: %o",w),ie("Failed to switch workspace","error",3e3),w}finally{lt=!1}}async function dr(v){t("requesting workspace git pull for %s",v);try{let w=await _e.send("git-pull-workspace",{});t("workspace git pull result: %o",w);let g=w?.status;if(g==="up_to_date"){ie("Already up to date","success",2e3);return}if(g==="stash_pop_conflict"){ie("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}ie("Git pulled "+Bt(v),"success",2e3)}catch(w){t("workspace git pull failed: %o",w);let g=w?.code,I=w?.message;if(g==="rebase_conflict"){ie("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(g==="rebase_conflict_abort_failed"){ie("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(g==="busy"){ie("Git pull skipped: another operation is running","warning",3e3);return}let T=I?`: ${I}`:"";throw ie(`Git pull failed${T}`,"error",3e3),w}}async function wr(v,w){t("setting workspace visibility %s \u2192 %s",v,String(w));try{await _e.send("set-workspace-visibility",{path:v,visible:w}),await Gt()}catch(g){t("workspace visibility update failed: %o",g),ie("Failed to update project visibility","error",3e3)}}async function Gt(){try{let v=await _e.send("list-workspaces",{});if(t("workspaces loaded: %o",v),v&&Array.isArray(v.workspaces)){let w=v.workspaces.map(ne=>({path:ne.path,database:ne.database,pid:ne.pid,version:ne.version})),g=v.current?{path:v.current.root_dir,database:v.current.db_path}:null,I=Array.isArray(v.hidden)?v.hidden.filter(ne=>typeof ne=="string"):[];st.setState({workspace:{current:g,available:w,hidden:I}});let T=window.localStorage.getItem("beads-ui.workspace");T&&(!w.some(Be=>Be.path===T)||I.includes(T)?window.localStorage.removeItem("beads-ui.workspace"):g&&T!==g.path&&(t("restoring saved workspace preference: %s",T),await Tt(T)))}}catch(v){t("failed to load workspaces: %o",v)}}_e.on("workspace-changed",v=>{t("workspace-changed event: %o",v),v&&v.root_dir&&(st.setState({workspace:{current:{path:v.root_dir,database:v.db_path}}}),Gt(),wt())});let kt=!1;if(typeof _e.onConnection=="function"){let v=w=>{t("ws state %s",w),w==="reconnecting"||w==="closed"?(kt=!0,ie("Connection lost. Reconnecting\u2026","error",4e3)):w==="open"&&kt&&(kt=!1,ie("Reconnected","success",2200),Ig(st,(g,I)=>{t(`${g}: %o`,I)}),ur())};_e.onConnection(v)}let sr="board";try{let v=window.localStorage.getItem("beads-ui.view");(v==="board"||v==="worker"||v==="monitor")&&(sr=v)}catch(v){t("view parse error: %o",v)}let st=Hi({config:Rg(),view:sr});_e.on("worker-queue-snapshot",v=>{let w=v;if(!w||!w.queue)return;let g=st.getState().workspace.current?.path;if(typeof g=="string"&&g.length>0&&w.root_dir!==g){t("dropping worker-queue snapshot for %s",String(w.root_dir));return}try{Re.set(w.queue)}catch{}}),_e.on("worker-parallel-analysis-snapshot",v=>{let w=v;if(!w)return;let g=st.getState().workspace.current?.path;if(!(typeof g=="string"&&g.length>0&&typeof w.root_dir=="string"&&w.root_dir!==g))try{je.set({settings:w.settings,job:w.job??null,runs:Array.isArray(w.runs)?w.runs:[],last_good:w.last_good??null})}catch{}});let Mt=Wi(st);Mt.start();let kr=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults"]),Vt=async(v,w)=>{try{return await Le(v,w)}catch(g){if(kr.has(v))throw g;return[]}};n&&ou(n,st,Mt);let ve=document.getElementById("workspace-picker");ve&&Vu(ve,st,Tt,dr,wr);let l=cu(e,(v,w)=>Le(v,w));try{let v=document.getElementById("new-issue-btn");v&&v.addEventListener("click",()=>l.open())}catch{}let _=fu(e,{policyStore:Xe,queueStore:Re,implPresetStore:Te,transport:(v,w)=>Le(v,w),onOpenChange:v=>{$=v,N()},labelOptions:()=>{let v=new Set;for(let[w]of Na)for(let g of $e.snapshotFor(w)||[]){let I=g.labels;if(Array.isArray(I))for(let T of I)typeof T=="string"&&T.length>0&&v.add(T)}return Array.from(v).sort()}});try{let v=document.getElementById("display-settings-btn");v&&(v.setAttribute("aria-label","\uC124\uC815"),v.setAttribute("title","\uC124\uC815"),v.addEventListener("click",()=>_.open()))}catch{}let E=nl(o,{gotoIssue:v=>Mt.gotoIssue(v),issueStores:$e,transport:Vt,workerQueueStore:Re,uiOrderStore:We,displayPolicyStore:Xe,closedRange:K,onClosedRangeChange:v=>{ye(v)},onNewIssue:()=>l.open()}),G=Ma(a,{transport:Vt,issueStores:$e,queueStore:Re,analysisStore:je,sessionLogStore:ot,uiOrderStore:We,gotoIssue:v=>st.setState({selected_id:v}),getWorkspacePath:()=>st.getState().workspace.current?.path,doneRange:Z,onDoneRangeChange:v=>{Ne(v)}}),ae=su(c,{transport:Vt,pipelineStore:xe,execPresetStore:Te,gotoIssue:v=>Mt.gotoIssue(v),getWorkspacePath:()=>st.getState().workspace.current?.path,switchWorkspace:v=>Tt(v)}),we=vc(u,{issueStores:$e,transport:Vt,queueStore:Re,execPresetStore:Te,sessionLogStore:ot,getWorkspacePath:()=>st.getState().workspace.current?.path,onNavigate:v=>{st.getState().view==="worker"?st.setState({selected_id:v}):Mt.gotoIssue(v)},onClose:()=>{let v=st.getState();st.setState({selected_id:null});try{Mt.gotoView(v.view==="worker"||v.view==="monitor"?v.view:"board")}catch{}},onOpenExecPresets:()=>{_.open("execution")}}),me=st.getState().selected_id;me&&(u.hidden=!1,we.load(me),Me(me)),st.subscribe(v=>{let w=v.selected_id;w?(u.hidden=!1,we.load(w),lt||Me(w)):(we.clear(),u.hidden=!0,V())});let et=v=>{o.hidden=v.view!=="board",a.hidden=v.view!=="worker",c.hidden=v.view!=="monitor",De(v.view==="board"),z(v.view==="worker"),F(v.view==="monitor"),be(v.view==="board"||v.view==="worker"||$||!!v.selected_id),!v.selected_id&&v.view==="board"&&E.load(),v.view==="worker"&&G.load(),v.view==="monitor"?ae.load():ae.pause(),window.localStorage.setItem("beads-ui.view",v.view)};st.subscribe(et),et(st.getState()),X(),mt(),vt(),Gt().finally(()=>{Ie=!0,ze()}),window.addEventListener("keydown",v=>{let w=v.ctrlKey||v.metaKey,g=String(v.key||"").toLowerCase(),I=v.target,T=I&&I.tagName?String(I.tagName).toLowerCase():"",ne=T==="input"||T==="textarea"||T==="select"||I&&typeof I.isContentEditable=="boolean"&&I.isContentEditable;w&&g==="n"&&(ne||(v.preventDefault(),l.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let r=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let t=document.getElementById("app");t&&Og(t)});export{Og as bootstrap,Rg as readBootstrapConfig,Ig as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
