var Gl=Object.create;var cs=Object.defineProperty;var Yl=Object.getOwnPropertyDescriptor;var Vl=Object.getOwnPropertyNames;var Kl=Object.getPrototypeOf,Zl=Object.prototype.hasOwnProperty;var Xl=(e,t,r)=>t in e?cs(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var ds=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Ql=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Vl(t))!Zl.call(e,s)&&s!==r&&cs(e,s,{get:()=>t[s],enumerable:!(n=Yl(t,s))||n.enumerable});return e};var Jl=(e,t,r)=>(r=e!=null?Gl(Kl(e)):{},Ql(t||!e||!e.__esModule?cs(r,"default",{value:e,enumerable:!0}):r,e));var Xe=(e,t,r)=>Xl(e,typeof t!="symbol"?t+"":t,r);var Qo=ds((mf,Xo)=>{var Ir=1e3,Lr=Ir*60,Or=Lr*60,wr=Or*24,sc=wr*7,oc=wr*365.25;Xo.exports=function(e,t){t=t||{};var r=typeof e;if(r==="string"&&e.length>0)return ac(e);if(r==="number"&&isFinite(e))return t.long?lc(e):ic(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function ac(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*oc;case"weeks":case"week":case"w":return r*sc;case"days":case"day":case"d":return r*wr;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Or;case"minutes":case"minute":case"mins":case"min":case"m":return r*Lr;case"seconds":case"second":case"secs":case"sec":case"s":return r*Ir;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function ic(e){var t=Math.abs(e);return t>=wr?Math.round(e/wr)+"d":t>=Or?Math.round(e/Or)+"h":t>=Lr?Math.round(e/Lr)+"m":t>=Ir?Math.round(e/Ir)+"s":e+"ms"}function lc(e){var t=Math.abs(e);return t>=wr?$n(e,t,wr,"day"):t>=Or?$n(e,t,Or,"hour"):t>=Lr?$n(e,t,Lr,"minute"):t>=Ir?$n(e,t,Ir,"second"):e+" ms"}function $n(e,t,r,n){var s=t>=r*1.5;return Math.round(e/r)+" "+n+(s?"s":"")}});var ea=ds((gf,Jo)=>{function cc(e){r.debug=r,r.default=r,r.coerce=l,r.disable=a,r.enable=s,r.enabled=i,r.humanize=Qo(),r.destroy=d,Object.keys(e).forEach(u=>{r[u]=e[u]}),r.names=[],r.skips=[],r.formatters={};function t(u){let f=0;for(let v=0;v<u.length;v++)f=(f<<5)-f+u.charCodeAt(v),f|=0;return r.colors[Math.abs(f)%r.colors.length]}r.selectColor=t;function r(u){let f,v=null,E,S;function C(...q){if(!C.enabled)return;let $=C,Y=Number(new Date),J=Y-(f||Y);$.diff=J,$.prev=f,$.curr=Y,f=Y,q[0]=r.coerce(q[0]),typeof q[0]!="string"&&q.unshift("%O");let L=0;q[0]=q[0].replace(/%([a-zA-Z%])/g,(x,B)=>{if(x==="%%")return"%";L++;let R=r.formatters[B];if(typeof R=="function"){let pe=q[L];x=R.call($,pe),q.splice(L,1),L--}return x}),r.formatArgs.call($,q),($.log||r.log).apply($,q)}return C.namespace=u,C.useColors=r.useColors(),C.color=r.selectColor(u),C.extend=n,C.destroy=r.destroy,Object.defineProperty(C,"enabled",{enumerable:!0,configurable:!1,get:()=>v!==null?v:(E!==r.namespaces&&(E=r.namespaces,S=r.enabled(u)),S),set:q=>{v=q}}),typeof r.init=="function"&&r.init(C),C}function n(u,f){let v=r(this.namespace+(typeof f>"u"?":":f)+u);return v.log=this.log,v}function s(u){r.save(u),r.namespaces=u,r.names=[],r.skips=[];let f=(typeof u=="string"?u:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let v of f)v[0]==="-"?r.skips.push(v.slice(1)):r.names.push(v)}function o(u,f){let v=0,E=0,S=-1,C=0;for(;v<u.length;)if(E<f.length&&(f[E]===u[v]||f[E]==="*"))f[E]==="*"?(S=E,C=v,E++):(v++,E++);else if(S!==-1)E=S+1,C++,v=C;else return!1;for(;E<f.length&&f[E]==="*";)E++;return E===f.length}function a(){let u=[...r.names,...r.skips.map(f=>"-"+f)].join(",");return r.enable(""),u}function i(u){for(let f of r.skips)if(o(u,f))return!1;for(let f of r.names)if(o(u,f))return!0;return!1}function l(u){return u instanceof Error?u.stack||u.message:u}function d(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}Jo.exports=cc});var ta=ds((Et,xn)=>{Et.formatArgs=uc;Et.save=pc;Et.load=fc;Et.useColors=dc;Et.storage=_c();Et.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();Et.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function dc(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function uc(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+xn.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let r=0,n=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),e.splice(n,0,t)}Et.log=console.debug||console.log||(()=>{});function pc(e){try{e?Et.storage.setItem("debug",e):Et.storage.removeItem("debug")}catch{}}function fc(){let e;try{e=Et.storage.getItem("debug")||Et.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function _c(){try{return localStorage}catch{}}xn.exports=ea()(Et);var{formatters:mc}=xn.exports;mc.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var Hr=globalThis,kn=Hr.trustedTypes,No=kn?kn.createPolicy("lit-html",{createHTML:e=>e}):void 0,zo="$lit$",sr=`lit$${Math.random().toFixed(9).slice(2)}$`,Ho="?"+sr,ec=`<${Ho}>`,vr=document,Wr=()=>vr.createComment(""),Gr=e=>e===null||typeof e!="object"&&typeof e!="function",hs=Array.isArray,tc=e=>hs(e)||typeof e?.[Symbol.iterator]=="function",us=`[ 	
\f\r]`,zr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,qo=/-->/g,Fo=/>/g,hr=RegExp(`>|${us}(?:([^\\s"'>=/]+)(${us}*=${us}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Bo=/'/g,Uo=/"/g,Wo=/^(?:script|style|textarea|title)$/i,bs=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),c=bs(1),Kt=bs(2),lf=bs(3),yr=Symbol.for("lit-noChange"),dt=Symbol.for("lit-nothing"),jo=new WeakMap,br=vr.createTreeWalker(vr,129);function Go(e,t){if(!hs(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return No!==void 0?No.createHTML(t):t}var rc=(e,t)=>{let r=e.length-1,n=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=zr;for(let i=0;i<r;i++){let l=e[i],d,u,f=-1,v=0;for(;v<l.length&&(a.lastIndex=v,u=a.exec(l),u!==null);)v=a.lastIndex,a===zr?u[1]==="!--"?a=qo:u[1]!==void 0?a=Fo:u[2]!==void 0?(Wo.test(u[2])&&(s=RegExp("</"+u[2],"g")),a=hr):u[3]!==void 0&&(a=hr):a===hr?u[0]===">"?(a=s??zr,f=-1):u[1]===void 0?f=-2:(f=a.lastIndex-u[2].length,d=u[1],a=u[3]===void 0?hr:u[3]==='"'?Uo:Bo):a===Uo||a===Bo?a=hr:a===qo||a===Fo?a=zr:(a=hr,s=void 0);let E=a===hr&&e[i+1].startsWith("/>")?" ":"";o+=a===zr?l+ec:f>=0?(n.push(d),l.slice(0,f)+zo+l.slice(f)+sr+E):l+sr+(f===-2?i:E)}return[Go(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},Yr=class e{constructor({strings:t,_$litType$:r},n){let s;this.parts=[];let o=0,a=0,i=t.length-1,l=this.parts,[d,u]=rc(t,r);if(this.el=e.createElement(d,n),br.currentNode=this.el.content,r===2||r===3){let f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}for(;(s=br.nextNode())!==null&&l.length<i;){if(s.nodeType===1){if(s.hasAttributes())for(let f of s.getAttributeNames())if(f.endsWith(zo)){let v=u[a++],E=s.getAttribute(f).split(sr),S=/([.?@])?(.*)/.exec(v);l.push({type:1,index:o,name:S[2],strings:E,ctor:S[1]==="."?fs:S[1]==="?"?_s:S[1]==="@"?ms:Cr}),s.removeAttribute(f)}else f.startsWith(sr)&&(l.push({type:6,index:o}),s.removeAttribute(f));if(Wo.test(s.tagName)){let f=s.textContent.split(sr),v=f.length-1;if(v>0){s.textContent=kn?kn.emptyScript:"";for(let E=0;E<v;E++)s.append(f[E],Wr()),br.nextNode(),l.push({type:2,index:++o});s.append(f[v],Wr())}}}else if(s.nodeType===8)if(s.data===Ho)l.push({type:2,index:o});else{let f=-1;for(;(f=s.data.indexOf(sr,f+1))!==-1;)l.push({type:7,index:o}),f+=sr.length-1}o++}}static createElement(t,r){let n=vr.createElement("template");return n.innerHTML=t,n}};function Er(e,t,r=e,n){if(t===yr)return t;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=Gr(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(t=Er(e,s._$AS(e,t.values),s,n)),t}var ps=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:n}=this._$AD,s=(t?.creationScope??vr).importNode(r,!0);br.currentNode=s;let o=br.nextNode(),a=0,i=0,l=n[0];for(;l!==void 0;){if(a===l.index){let d;l.type===2?d=new Vr(o,o.nextSibling,this,t):l.type===1?d=new l.ctor(o,l.name,l.strings,this,t):l.type===6&&(d=new gs(o,this,t)),this._$AV.push(d),l=n[++i]}a!==l?.index&&(o=br.nextNode(),a++)}return br.currentNode=vr,s}p(t){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}},Vr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,n,s){this.type=2,this._$AH=dt,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=Er(this,t,r),Gr(t)?t===dt||t==null||t===""?(this._$AH!==dt&&this._$AR(),this._$AH=dt):t!==this._$AH&&t!==yr&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):tc(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==dt&&Gr(this._$AH)?this._$AA.nextSibling.data=t:this.T(vr.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=Yr.createElement(Go(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new ps(s,this),a=o.u(this.options);o.p(r),this.T(a),this._$AH=o}}_$AC(t){let r=jo.get(t.strings);return r===void 0&&jo.set(t.strings,r=new Yr(t)),r}k(t){hs(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of t)s===r.length?r.push(n=new e(this.O(Wr()),this.O(Wr()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Cr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,n,s,o){this.type=1,this._$AH=dt,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=dt}_$AI(t,r=this,n,s){let o=this.strings,a=!1;if(o===void 0)t=Er(this,t,r,0),a=!Gr(t)||t!==this._$AH&&t!==yr,a&&(this._$AH=t);else{let i=t,l,d;for(t=o[0],l=0;l<o.length-1;l++)d=Er(this,i[n+l],r,l),d===yr&&(d=this._$AH[l]),a||(a=!Gr(d)||d!==this._$AH[l]),d===dt?t=dt:t!==dt&&(t+=(d??"")+o[l+1]),this._$AH[l]=d}a&&!s&&this.j(t)}j(t){t===dt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},fs=class extends Cr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===dt?void 0:t}},_s=class extends Cr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==dt)}},ms=class extends Cr{constructor(t,r,n,s,o){super(t,r,n,s,o),this.type=5}_$AI(t,r=this){if((t=Er(this,t,r,0)??dt)===yr)return;let n=this._$AH,s=t===dt&&n!==dt||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==dt&&(n===dt||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},gs=class{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){Er(this,t)}};var nc=Hr.litHtmlPolyfillSupport;nc?.(Yr,Vr),(Hr.litHtmlVersions??(Hr.litHtmlVersions=[])).push("3.3.1");var Be=(e,t,r)=>{let n=r?.renderBefore??t,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new Vr(t.insertBefore(Wr(),o),o,void 0,r??{})}return s._$AI(e),s};var Lt="today",jt=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Zt(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function Rr(e,t=Date.now()){switch(e){case"today":{let r=new Date(t);return r.setHours(0,0,0,0),r.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function Yo(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Vo(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Ko(){let e=null,t=[],r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],n()},clear(){e=null,t=[],n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function Zo(){let e=new Map,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{set(n,s,o=null){e.set(n,{lines:Array.isArray(s)?[...s]:[],last_event_at:typeof o=="number"?o:null}),r()},append(n,s){let o=e.get(n)||{lines:[],last_event_at:null};o.lines=[...o.lines,s],o.last_event_at=Date.now(),e.set(n,o),r()},get(n){return e.get(n)||null},clear(n){typeof n=="string"?e.delete(n):e.clear(),r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}var ra=Jl(ta(),1);function rt(e){return(0,ra.default)(`beads-ui:${e}`)}function Nt(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function kr(e,t){let r=Nt(e.created_at),n=Nt(t.created_at);if(r!==n)return r<n?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function oa(e,t){let r=Nt(e.created_at),n=Nt(t.created_at);if(r!==n)return r<n?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function aa(e,t){let r=Nt(e.updated_at),n=Nt(t.updated_at);if(r!==n)return r<n?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function ia(e,t){let r=e.priority??2,n=t.priority??2;if(r!==n)return r-n;let s=Nt(e.created_at),o=Nt(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function la(e,t){let r=e.closed_at??0,n=t.closed_at??0;if(r!==n)return r<n?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var gc=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function na(e){let t=e&&e.metadata,r=t?t.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function sa(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let r=gc.exec(t);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function ca(e,t){let r=na(e),n=na(t);if(r!==n)return r<n?-1:1;let s=sa(e),o=sa(t);if(s!==o)return s<o?-1:1;let a=Nt(e&&e.created_at),i=Nt(t&&t.created_at);if(a!==i)return a<i?-1:1;let l=e&&e.id,d=t&&t.id;return l===d?0:String(l)<String(d)?-1:1}var vs=2**20;function Dr(e,t){let r=e&&e.id;return t&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(t,r)&&typeof t[r]=="number"&&Number.isFinite(t[r])?t[r]:-Nt(e&&e.created_at)}function Sn(e){return(t,r)=>{let n=Dr(t,e),s=Dr(r,e);if(n!==s)return n<s?-1:1;let o=t?.id,a=r?.id;return o<a?-1:o>a?1:0}}function ys(e,t,r){let n=Array.isArray(e)?e:[],s=n.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?n[o-1]:null,i=o+1<s?n[o+1]:null;if(!a&&!i)return{rank:0};if(!a)return{rank:Dr(i,r)-vs};if(!i)return{rank:Dr(a,r)+vs};let l=Dr(a,r),d=Dr(i,r),u=(l+d)/2;return l<u&&u<d?{rank:u}:{renormalize:n.map((f,v)=>({bead_id:f.id,rank:v*vs}))}}function ws(e,t={}){let r=rt(`issue-store:${e}`),n=new Map,s=[],o=0,a=new Set,i=!1,l=t.sort||kr;function d(){for(let v of Array.from(a))try{v()}catch{}}function u(){s=Array.from(n.values()).sort(l)}function f(v){if(i||!v||v.id!==e)return;let E=Number(v.revision)||0;if(r("apply %s rev=%d",v.type,E),!(E<=o&&v.type!=="snapshot")){if(v.type==="snapshot"){if(E<=o)return;n.clear();let S=Array.isArray(v.issues)?v.issues:[];for(let C of S)C&&typeof C.id=="string"&&C.id.length>0&&n.set(C.id,C);u(),o=E,d();return}if(v.type==="upsert"){let S=v.issue;if(S&&typeof S.id=="string"&&S.id.length>0){let C=n.get(S.id);if(!C)n.set(S.id,S);else{let q=Number.isFinite(C.updated_at)?C.updated_at:0,$=Number.isFinite(S.updated_at)?S.updated_at:0;if(q<=$){for(let Y of Object.keys(C))Y in S||delete C[Y];for(let[Y,J]of Object.entries(S))C[Y]=J}}u()}o=E,d()}else if(v.type==="delete"){let S=String(v.issue_id||"");S&&(n.delete(S),u()),o=E,d()}}}return{id:e,subscribe(v){return a.add(v),()=>{a.delete(v)}},applyPush:f,snapshot(){return s},size(){return n.size},getById(v){return n.get(v)},dispose(){i=!0,n.clear(),s=[],a.clear(),o=0}}}function An(e){let t=String(e.type||"").trim(),r={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];r[o]=String(a)}}let n=new URLSearchParams(r).toString();return n.length>0?`${t}?${n}`:t}function da(e){let t=rt("subs"),r=new Map,n=new Map;function s(i,l){t("applyDelta %s +%d ~%d -%d",i,(l.added||[]).length,(l.updated||[]).length,(l.removed||[]).length);let d=n.get(i);if(!d||d.size===0)return;let u=Array.isArray(l.added)?l.added:[],f=Array.isArray(l.updated)?l.updated:[],v=Array.isArray(l.removed)?l.removed:[];for(let E of Array.from(d)){let S=r.get(E);if(!S)continue;let C=S.itemsById;for(let q of u)typeof q=="string"&&q.length>0&&C.set(q,!0);for(let q of f)typeof q=="string"&&q.length>0&&C.set(q,!0);for(let q of v)typeof q=="string"&&q.length>0&&C.delete(q)}}async function o(i,l){let d=An(l);if(t("subscribe %s key=%s",i,d),!r.has(i))r.set(i,{key:d,itemsById:new Map});else{let f=r.get(i);if(f&&f.key!==d){let v=n.get(f.key);v&&(v.delete(i),v.size===0&&n.delete(f.key)),r.set(i,{key:d,itemsById:new Map})}}n.has(d)||n.set(d,new Set);let u=n.get(d);u&&u.add(i);try{await e("subscribe-list",{id:i,type:l.type,params:l.params})}catch(f){let v=r.get(i)||null;if(v){let E=n.get(v.key);E&&(E.delete(i),E.size===0&&n.delete(v.key))}throw r.delete(i),f}return async()=>{t("unsubscribe %s key=%s",i,d);try{await e("unsubscribe-list",{id:i})}catch{}let f=r.get(i)||null;if(f){let v=n.get(f.key);v&&(v.delete(i),v.size===0&&n.delete(f.key))}r.delete(i)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:An,selectors:{getIds(i){let l=r.get(i);return l?Array.from(l.itemsById.keys()):[]},has(i,l){let d=r.get(i);return d?d.itemsById.has(l):!1},count(i){let l=r.get(i);return l?l.itemsById.size:0},getItemsById(i){let l=r.get(i),d={};if(!l)return d;for(let u of l.itemsById.keys())d[u]=!0;return d}}}}function ua(){let e=rt("issue-stores"),t=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let l of Array.from(n))try{l()}catch{}}function a(l,d,u){let f=d?An(d):"",v=r.get(l)||"",E=t.has(l);if(e("register %s key=%s (prev=%s)",l,f,v),E&&v&&f&&v!==f){let S=t.get(l);if(S)try{S.dispose()}catch{}let C=s.get(l);if(C){try{C()}catch{}s.delete(l)}let q=ws(l,u);t.set(l,q);let $=q.subscribe(()=>o());s.set(l,$)}else if(!E){let S=ws(l,u);t.set(l,S);let C=S.subscribe(()=>o());s.set(l,C)}return r.set(l,f),()=>i(l)}function i(l){e("unregister %s",l),r.delete(l);let d=t.get(l);d&&(d.dispose(),t.delete(l));let u=s.get(l);if(u){try{u()}catch{}s.delete(l)}}return{register:a,unregister:i,getStore(l){return t.get(l)||null},snapshotFor(l){let d=t.get(l);return d?d.snapshot().slice():[]},subscribe(l){return n.add(l),()=>n.delete(l)}}}function pa(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function fa(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function ks(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function hc(e){let t=String(e||""),r=t.startsWith("#")?t.slice(1):t,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let i=new URLSearchParams(s).get("issue");if(i)return decodeURIComponent(i)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function bc(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function _a(e){let t=rt("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):hc(n),a=bc(n);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let l=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==l&&(window.location.hash=l)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=ks(o,n);t("goto issue %s (view=%s)",n,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?ks(n,o):`#/${n}`;t("goto view %s (id=%s)",n,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var vc=Object.freeze({workspace_config:{default_workspace:null}});function ma(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:vc.workspace_config.default_workspace}}}function ga(e={}){let t=rt("state"),r={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:ma(e.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let a={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?ma(o.config):r.config},i=a.workspace.current?.path!==r.workspace.current?.path||a.workspace.available.length!==r.workspace.available.length||a.workspace.hidden.length!==r.workspace.hidden.length||a.workspace.hidden.some((d,u)=>d!==r.workspace.hidden[u]),l=a.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;a.selected_id===r.selected_id&&a.view===r.view&&a.filters.status===r.filters.status&&a.filters.search===r.filters.search&&a.filters.type===r.filters.type&&a.board.closed_filter===r.board.closed_filter&&a.worker.selected_parent_id===r.worker.selected_parent_id&&a.worker.show_closed_children.length===r.worker.show_closed_children.length&&a.worker.show_closed_children.every((d,u)=>d===r.worker.show_closed_children[u])&&!i&&!l||(r=a,t("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function ha(e){let t=rt("activity"),r=0,n=new Map,s=1;function o(){if(!e)return;let d=r>0;e.toggleAttribute("hidden",!d),e.setAttribute("aria-busy",d?"true":"false")}function a(){r+=1,t("start count=%d",r),o()}function i(){let d=r;r=Math.max(0,r-1),d<=0?t("done called but count was already %d",d):t("done count=%d\u2192%d",d,r),o()}function l(d){return async(f,v)=>{let E=s++,S=Date.now();n.set(E,{type:f,start_ts:S}),t("request start id=%d type=%s count=%d",E,f,r+1),a();let C=!1,q=()=>{C||(C=!0,n.delete(E),i())},$=setTimeout(()=>{C||(t("request TIMEOUT id=%d type=%s elapsed=%dms",E,f,Date.now()-S),q())},3e4);try{let Y=await d(f,v),J=Date.now()-S;return t("request done id=%d type=%s elapsed=%dms",E,f,J),Y}catch(Y){let J=Date.now()-S;throw t("request error id=%d type=%s elapsed=%dms err=%o",E,f,J,Y),Y}finally{clearTimeout($),q()}}}return o(),{wrapSend:l,start:a,done:i,getCount:()=>r,getActiveRequests:()=>{let d=Date.now();return Array.from(n.entries()).map(([u,f])=>({id:u,type:f.type,elapsed_ms:d-f.start_ts}))}}}function Q(e,t="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=e,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",t==="success"?n.style.background="#156d36":t==="warning"?n.style.background="#a36a00":t==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function Tn(e=void 0,t=void 0){function r(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function n(o,a,i){let l=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return l.sort(la),l;switch(i){case"created_desc":return l.sort(kr),l;case"created_asc":return l.sort(oa),l;case"updated_desc":return l.sort(aa),l;case"priority":return l.sort(ia),l;case"manual":default:{let d=r();return d?l.sort(Sn(d)):l.sort(kr),l}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let i of a)try{i()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function or(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function vt(e){let t=or(e);if(t===null)return"";let r=new Date(t),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function Ct(e,t){let r=or(e);if(r===null)return"";let s=(typeof t=="number"?t:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let i=Math.floor(s/864e5);if(i<7)return`${i}\uC77C \uC804`;let l=Math.floor(i/7);if(i<30)return`${l}\uC8FC \uC804`;let d=Math.floor(i/30);return d<12?`${d}\uAC1C\uC6D4 \uC804`:`${Math.floor(i/365)}\uB144 \uC804`}function En(e){if(!Array.isArray(e))return null;let t=null,r=-1;for(let n of e){if(!n||n.status!=="in_progress")continue;let s=or(n.updated_at)??0;if(t===null||s>r){t=n,r=s;continue}s===r&&String(n.id)<String(t.id)&&(t=n)}return t}function Cn(e){let t=e.transport,r=e.uiOrderStore;function n(a,i){return"renormalize"in a?a.renormalize:[{bead_id:i,rank:a.rank}]}function s(a,i){let l={...a.order};for(let d of i)l[d.bead_id]=d.rank;r&&r.set({revision:a.revision,order:l})}async function o(a,i,l){if(!t||!r)return;let d=r.get()||{revision:0,order:{}},u=n(ys(i,l,d.order),a);s(d,u);let f=await t("ui-order-set",{expected_revision:d.revision,entries:u});if(f&&f.conflict){let v={revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}};r.set(v);let E=n(ys(i,l,v.order),a);s(v,E);let S=await t("ui-order-set",{expected_revision:v.revision,entries:E});S&&S.applied&&r.set({revision:typeof S.revision=="number"?S.revision:0,order:S.order||{}})}else f&&f.applied&&r.set({revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}})}return{applyReorder:o}}function Rn(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function $s(e,t){return!t||typeof e!="string"||e.length===0||Rn(t.visible_labels).includes(e)?!0:Rn(t.hidden_labels).includes(e)?!1:!Rn(t.hidden_prefixes).some(r=>r.length>0&&e.startsWith(r))}function In(e,t){return Rn(e).filter(r=>$s(r,t))}function ar(e,t){let r=e&&e.chips?e.chips[t]:void 0;return typeof r=="boolean"?r:!0}var yc={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},va={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},ba={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},wc={review:"\u2713",skip:"\u2298"},ir={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function kc(e,t,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function ya(e){let t=e&&e.fill||"none";return t==="none"?ir.none:e&&e.stale===!0?ir.stale:t==="dim"?ir.dim:e&&e.glyph==="review"?ir.review:e&&e.glyph==="skip"?ir.skip:ir.done}function $c(e){if(!e||e.fill==="none"||!e.approval_state)return ya(e);let t=[];return e.glyph==="review"?t.push(ir.review):e.glyph==="skip"&&t.push(ir.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function xc(e,t,r){let n=yc[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,a=wc[t&&t.glyph||""]||"",i="bar";s==="dim"?i+=` b-${n} dim`:s==="full"&&(i+=` b-${n} full`),o&&(i+=" stale"),r&&(i+=" cur");let l=s==="none"?"lbl":`lbl l-${n} on`,d=r?`color: var(--stage-${n}-on)`:"";return c`
    <div class="seg">
      <div class=${i} style=${d}>${a}</div>
      <div class=${l}>
        ${va[e]||e}
      </div>
    </div>
  `}function Ln(e,t){if(!e||!e.stages)return"";let r=ba[e.route]||ba.spec_backed,n=e.stages,s=kc(r,n,String(t||"open")),o=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${r.map(a=>`${va[a]||a} ${a==="plan"?$c(n[a]||{}):ya(n[a]||{})}`).join(" \xB7 ")}`;return c`
    <div class="stp" role="img" aria-label=${o}>
      ${r.map(a=>xc(a,n[a]||{},a===s))}
    </div>
  `}function Sc(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var wa=2;function Ac(e){if(!e)return[];let t=[];if(e.external){let n=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(c`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(e.blockers)?e.blockers:[];if(r.length>0){let n=r.slice(0,wa).join(", "),s=r.length-wa,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;t.push(c`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function Tc(e,t){let r=t.policy||null,n=e.workflow&&e.workflow.chips||{},s=[];if(n.route&&ar(r,"route")){let a=n.route_source==="derived";s.push(c`<span
        class="ctl-chip ctl-chip--route${a?" is-derived":""}"
        title=${a?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${a?"unset":n.route}</span
      >`)}if(n.fast_track&&ar(r,"fast_track")&&s.push(c`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&ar(r,"pr")){let a=n.pr.number;s.push(c`<span class="ctl-chip ctl-chip--pr"
        >${`PR${a!=null?` #${a}`:""}`}</span
      >`)}for(let a of In(e.labels,r))s.push(c`<span class="ctl-chip ctl-chip--label">${a}</span>`);return e.from_id&&ar(r,"from")&&s.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${a=>{a.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(a,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),ar(r,"blocked")&&s.push(...Ac(e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&ar(r,"blocked")&&s.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 실패</span>`),s.length===0?"":c`<div class="board-card__chips">${s}</div>`}function Ec(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function Cc(e){let t=Ct(e.created_at),r=Ct(e.updated_at);return!t&&!r?"":c`<span class="board-card__times">
    ${t?c`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${vt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&r?c`<span class="board-card__time-sep">·</span>`:""}
    ${r?c`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${vt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function Rc(e,t){let r=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=t.isExpanded?t.isExpanded(e.id):!0,o=n>0?r.children.slice().sort(ca):r.children;return c`
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
        ${Cc(e)}
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
                  <span class=${Ec(a.status)}>●</span>
                  <span class="board-card__roll-child-ord">${i+1}</span>
                  <span class="board-card__roll-child-title"
                    >${a.title||a.id}</span
                  >
                </button>`)}
          </div>`:""}
    </div>
  `}function On(e,t){let r=Sc(e.priority);return c`
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
      ${Tc(e,t)}
      ${e.workflow&&ar(t.policy||null,"stepper")?Ln(e.workflow,e.status):""}
      ${Rc(e,t)}
    </article>
  `}function Mr(e,t){let r=Array.isArray(e.items)?e.items.length:0,n=e.is_closed===!0;return c`
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
              ${jt.map(o=>c`<option
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
        ${e.items.map(o=>On(o,t))}
      </div>
    </section>
  `}function ka(e,t,r){return c`
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
          ${e.items.length===0?c`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(n=>On(n,t))}
        </div>
      </div>
    </dialog>
  `}var Ic=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],Lc=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],Oc=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function Dc(e,t,r){let n=e.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return c`
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
  `}function $a(e,t,r){return c`
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
        ${Ic.map(n=>c`<option
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
        ${Lc.map(n=>c`<option
              value=${n.value}
              ?selected=${e.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${Dc(e,t,r)}
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
        ${Oc.map(n=>c`<option
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
  `}var Mc=200,Pc={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},Nc=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),xa="beads-ui.board.sort",Sa=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function qc(){try{let e=window.localStorage.getItem(xa);if(e&&Sa.has(e))return e}catch{}return"created_desc"}function Aa(e,t){let r=rt("views:board"),n=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,i=t.displayPolicyStore,l=t.workerQueueStore,d=t.onClosedRangeChange,u=t.onNewIssue,f=t.closedRange||Lt,v=s?Tn(s,a):null,E=Cn({transport:o,uiOrderStore:a}),S=[],C=[],q=[],$=[],Y=[],J=[],L=!1,O=0,x=qc(),B=new Map,R=new Map,pe=new Map,$e=new Set,ae={search:"",priority:"",type:"",labels:[]},ye=!1,De=null;function Qe(F){return String(F.status||"open")==="open"}function tt(F){let W=String(F.status||"open");return W==="open"||W==="blocked"}function Ne(F){let W=ae.search.trim().toLowerCase(),ce=ae.priority,_e=ae.type,be=ae.labels;return F.filter(Re=>{if(W){let He=String(Re.id||"").toLowerCase(),Ke=String(Re.title||"").toLowerCase();if(!He.includes(W)&&!Ke.includes(W))return!1}if(ce!==""&&String(Re.priority)!==ce||_e!==""&&String(Re.issue_type||"")!==_e)return!1;if(be.length>0){let He=Array.isArray(Re.labels)?Re.labels:[];if(!be.some(Ke=>He.includes(Ke)))return!1}return!0})}function Oe(){let F=new Set;for(let W of[S,C,q,$,Y,J])for(let ce of W){let _e=Array.isArray(ce.labels)?ce.labels:[];for(let be of _e)typeof be=="string"&&be.length>0&&F.add(be)}return Array.from(F).sort()}function fe(){return ae.search.trim()!==""||ae.priority!==""||ae.type!==""||ae.labels.length>0}function xe(){try{if(v){let F=v.selectBoardColumn("tab:board:in-progress","in_progress",x),W=v.selectBoardColumn("tab:board:blocked","blocked",x).filter(tt),ce=new Set(F.map(we=>we.id)),_e=v.selectBoardColumn("tab:board:ready","ready",x).filter(we=>Qe(we)&&!ce.has(we.id)),be=v.selectBoardColumn("tab:board:resolved","resolved",x),Re=v.selectBoardColumn("tab:board:deferred","deferred",x),He=v.selectBoardColumn("tab:board:closed","closed").slice(0,Mc),Ke=[...W,..._e,...F,...be,...He];Le(Ke);let Ce=new Set;for(let we of Ke)we&&we.id&&!xs(we)&&Ce.add(we.id);let et=!fe();S=et?Kr(W,Ce):W,C=et?Kr(_e,Ce):_e,q=et?Kr(F,Ce):F,$=et?Kr(be,Ce):be,Y=Re,O=Re.length,J=et?Kr(He,Ce):He,B=new Map;for(let we of S)B.set(we.id,"open");for(let we of C)B.set(we.id,"open");for(let we of q)B.set(we.id,"in_progress");for(let we of $)B.set(we.id,"resolved");for(let we of Y)B.set(we.id,"deferred");for(let we of J)B.set(we.id,"closed");R=new Map;for(let we of S)R.set(we.id,"blocked-col");for(let we of C)R.set(we.id,"ready-col");for(let we of q)R.set(we.id,"in-progress-col");for(let we of $)R.set(we.id,"resolved-col");for(let we of J)R.set(we.id,"closed-col")}ze()}catch{S=[],C=[],q=[],$=[],Y=[],J=[],pe=new Map,ze()}}function Le(F){let W=new Map;for(let _e of F)_e&&_e.id&&!W.has(_e.id)&&W.set(_e.id,_e);let ce=new Map;for(let _e of W.values()){let be=xs(_e);if(!be)continue;let Re=ce.get(be);Re||(Re=[],ce.set(be,Re)),Re.push({id:_e.id,title:_e.title,status:_e.status,metadata:_e.metadata,created_at:_e.created_at,updated_at:_e.updated_at})}pe=ce}function Z(F){let W=pe.get(F)||[],ce=0;for(let be of W)(be.status==="resolved"||be.status==="closed")&&(ce+=1);let _e=En(W);return{total:W.length,count:ce,current:_e,children:W}}function he(F){return!$e.has(F)}function j(F,W){F.preventDefault(),F.stopPropagation(),$e.has(W)?$e.delete(W):$e.add(W),ze()}function te(F,W){F.preventDefault(),F.stopPropagation(),n(W)}function me(F,W){F.preventDefault(),F.stopPropagation(),n(W)}function Ie(F,W){De||n(W)}function P(F,W){F.preventDefault(),F.stopPropagation(),Fc(W).then(ce=>{ce&&Q("\uBCF5\uC0AC\uB428","success",1200)})}function N(F,W){De=W,F.dataTransfer&&(F.dataTransfer.setData("text/plain",W),F.dataTransfer.effectAllowed="move"),F.target.classList.add("board-card--dragging")}function re(F){F.target.classList.remove("board-card--dragging"),yt(),setTimeout(()=>{De=null},0)}function ve(F){let W=String(F.target.value||"");!W||W===f||(f=W,d&&d(W),ze())}function Se(){return i?i.get():null}function Je(F){let W=l?l.get():null,ce=W?W.cleanup_failed:null;if(!ce||typeof ce!="object"||Array.isArray(ce))return null;let _e=ce[F];return!_e||typeof _e!="object"||Array.isArray(_e)?null:_e}let Ae={onCardClick:Ie,onCopyId:P,onDragStart:N,onDragEnd:re,onClosedRangeChange:ve,rollupFor:Z,isExpanded:he,onRollupToggle:j,onChildClick:te,onFromChipClick:me,cleanupFailureFor:Je,get policy(){return Se()}};function Ge(F,W){De||(ne(),n(W))}function qe(F,W){F.preventDefault(),F.stopPropagation(),ne(),n(W)}let Ye={...Ae,onCardClick:Ge,onChildClick:qe,onFromChipClick:qe,get policy(){return Se()}};function m(F){let W=F.target,ce=e.querySelector(".board-filter__labels");W&&ce&&ce.contains(W)||I()}function A(F){F.key==="Escape"&&I()}function w(){ye||(ye=!0,document.addEventListener("mousedown",m),document.addEventListener("keydown",A),ze())}function I(){ye&&(ye=!1,document.removeEventListener("mousedown",m),document.removeEventListener("keydown",A),ze())}function G(F){F.key==="Escape"&&ne()}function X(){L||(L=!0,document.addEventListener("keydown",G),ze())}function ne(){L&&(L=!1,document.removeEventListener("keydown",G),ze())}let Ee={onClose:ne,onOverlayClick(F){F.target===F.currentTarget&&ne()}},Ve={onSearchInput(F){ae.search=String(F.target.value||""),xe()},onPriorityChange(F){ae.priority=String(F.target.value||""),xe()},onTypeChange(F){ae.type=String(F.target.value||""),xe()},onSortChange(F){let W=String(F.target.value||"");if(!(!Sa.has(W)||W===x)){x=W;try{window.localStorage.setItem(xa,W)}catch{}xe()}},onDeferredToggle(){L?ne():X()},onLabelMenuToggle(){ye?I():w()},onLabelToggle(F){let W=ae.labels.indexOf(F);W===-1?ae.labels.push(F):ae.labels.splice(W,1),xe()},onLabelClear(){ae.labels.length!==0&&(ae.labels=[],xe())},onNewIssue(){u&&u()}};function it(){return c`
      <div class="board-view">
        ${$a(ae,Ve,{sort_mode:x,deferred_popup_open:L,deferred_count:O,label_options:Oe(),label_menu_open:ye})}
        <div class="board-root">
          ${Mr({title:"Blocked",id:"blocked-col",items:Ne(S)},Ae)}
          ${Mr({title:"Ready",id:"ready-col",items:Ne(C)},Ae)}
          ${Mr({title:"In progress",id:"in-progress-col",items:Ne(q)},Ae)}
          ${Mr({title:"Resolved",id:"resolved-col",items:Ne($)},Ae)}
          ${Mr({title:"Closed",id:"closed-col",items:Ne(J),is_closed:!0,closed_range:f},Ae)}
        </div>
        ${L?ka({items:Ne(Y),count:O},Ye,Ee):""}
      </div>
    `}function ze(){Be(it(),e),At()}function At(){try{let F=e.querySelector("#deferred-popup");F&&!F.open&&(typeof F.showModal=="function"?F.showModal():F.setAttribute("open",""));let W=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let ce of W)Array.from(ce.querySelectorAll(".board-card")).forEach((be,Re)=>{be.tabIndex=Re===0?0:-1})}catch{}}async function ut(F,W){if(!o){Q("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:F,status:W}),Q("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(ce){r("update-status failed: %o",ce),Q("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function lt(F){switch(F){case"blocked-col":return S;case"ready-col":return C;case"in-progress-col":return q;case"resolved-col":return $;default:return[]}}function pt(F,W,ce){if(!o||!a)return;let _e=lt(F),be=_e.find(et=>et.id===W);if(!be)return;let Re=_e.filter(et=>et.id!==W),He=ce.closest?ce.closest(".board-card"):null,Ke=Re.length;if(He){let et=He.getAttribute("data-issue-id");if(et===W)return;let we=Re.findIndex(p=>p.id===et);we>=0&&(Ke=we)}let Ce=Re.slice();Ce.splice(Ke,0,be),E.applyReorder(W,Ce,Ke)}function yt(){for(let F of Array.from(e.querySelectorAll(".board-column--drag-over")))F.classList.remove("board-column--drag-over")}let Te=null;e.addEventListener("dragover",F=>{F.preventDefault(),F.dataTransfer&&(F.dataTransfer.dropEffect="move");let ce=F.target.closest(".board-column");ce&&ce!==Te&&(Te&&Te.classList.remove("board-column--drag-over"),ce.classList.add("board-column--drag-over"),Te=ce)}),e.addEventListener("dragleave",F=>{let W=F.relatedTarget;(!W||!e.contains(W))&&Te&&(Te.classList.remove("board-column--drag-over"),Te=null)}),e.addEventListener("drop",F=>{F.preventDefault(),Te&&(Te.classList.remove("board-column--drag-over"),Te=null);let W=F.target,ce=W.closest(".board-column");if(!ce)return;let _e=F.dataTransfer?.getData("text/plain")||"";if(!_e)return;let be=ce.id,Re=R.get(_e);if(Re&&Re===be){if(Nc.has(be)){if(x!=="manual"){Q("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}pt(be,_e,W)}return}let He=Pc[be];if(!He){Q("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}B.get(_e)!==He&&ut(_e,He)}),e.addEventListener("keydown",F=>{let W=F.target;if(!(W instanceof HTMLElement))return;let ce=String(W.tagName||"").toLowerCase();if(ce==="input"||ce==="textarea"||ce==="select"||ce==="button"||ce==="a"||W.isContentEditable===!0)return;let _e=W.closest(".board-card");if(!_e)return;let be=String(F.key||"");if(be==="Enter"||be===" "){F.preventDefault();let Ce=_e.getAttribute("data-issue-id");Ce&&n(Ce);return}if(be!=="ArrowUp"&&be!=="ArrowDown"&&be!=="ArrowLeft"&&be!=="ArrowRight")return;F.preventDefault();let Re=_e.closest(".board-column");if(!Re)return;let He=Array.from(Re.querySelectorAll(".board-card")),Ke=He.indexOf(_e);if(be==="ArrowDown"&&Ke<He.length-1){ft(_e,He[Ke+1]);return}if(be==="ArrowUp"&&Ke>0){ft(_e,He[Ke-1]);return}if(be==="ArrowLeft"||be==="ArrowRight"){let Ce=Array.from(e.querySelectorAll(".board-column")),et=Ce.indexOf(Re),we=be==="ArrowRight"?1:-1,p=et+we;for(;p>=0&&p<Ce.length;){let k=Ce[p].querySelector(".board-card");if(k){ft(_e,k);return}p+=we}}});function ft(F,W){try{F.tabIndex=-1,W.tabIndex=0,W.focus()}catch{}}let st=null;v&&v.subscribe&&(st=v.subscribe(()=>{try{xe()}catch{}}));let nt=null;i&&i.subscribe&&(nt=i.subscribe(()=>{try{xe()}catch{}}));let _t=null;return l&&l.subscribe&&(_t=l.subscribe(()=>{ze()})),{async load(){r("load"),xe()},clear(){I(),ne(),st&&(st(),st=null),nt&&(nt(),nt=null),_t&&(_t(),_t=null),e.replaceChildren(),S=[],C=[],q=[],$=[],Y=[],J=[],B=new Map,R=new Map}}}function xs(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Kr(e,t){return e.filter(r=>{let n=xs(r);return!(n&&t.has(n))})}async function Fc(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let r=!1;try{r=document.execCommand("copy")}finally{t.remove()}return r}catch{return!1}}async function $r(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}function zt(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function lr(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function Bc(e,t=document){let r=t.createElement("dialog");r.className="continuation-dialog";let n=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),i=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",i.textContent=`${zt(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${zt(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,n.type="button",n.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",n.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",r.append(a,i,n,s,o),t.body.append(r),new Promise(l=>{let d=u=>{typeof r.close=="function"&&r.close(),r.remove(),l(u)};n.addEventListener("click",()=>d("prior_session")),s.addEventListener("click",()=>d("fresh_current")),o.addEventListener("click",()=>d(null)),r.addEventListener("cancel",u=>{u.preventDefault(),d(null)}),typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")})}async function Xt(e,t,r={}){let n=e;for(r.onResult?.(n);n?.continuation_mismatch;){let s=n.continuation_mismatch,o=await Bc(s);if(o===null)return n;n=await t(o,s.decision_token),r.onResult?.(n),n?.conflict&&r.refresh&&(n=await r.refresh(n),r.onResult?.(n))}return n}var Ia="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function gt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Qt=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],Zr=[...Qt,"reasoning_output_tokens"],Uc=["implementation","review-consult"];function Ss(e){let t=0;for(let r of Qt)t+=gt(e?.[r]);return t}function jc(e){return!e||typeof e!="object"?!1:Qt.some(t=>Number.isFinite(e[t]))}function Ta(e){return!e||typeof e!="object"?!1:Zr.some(t=>Number.isFinite(e[t]))}function zc(e){let t={};for(let r of Zr)e&&Number.isFinite(e[r])&&(t[r]=e[r]);return t}function Ea(e){let t={};for(let r of Zr)Number.isFinite(e[r])&&(t[r]=e[r]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function Ca(e,t){return e==="codex"?gt(t.input_tokens)+gt(t.output_tokens):Ss(t)}function Hc(e){return e==="claude"?"Claude":"Codex"}function Wc(e){return`\u03C4 ${La(e)}`}function Gc(e,t){let r=t.breakdown||{},n=[`\uC785\uB825 ${gt(r.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${gt(r.output_tokens).toLocaleString("en-US")}`];e==="claude"?n.push(`\uCE90\uC2DC\uC77D\uAE30 ${gt(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${gt(r.cache_creation_input_tokens).toLocaleString("en-US")}`):(n.push(`\uCE90\uC2DC\uC77D\uAE30 ${gt(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${gt(r.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(r.reasoning_output_tokens)&&n.push(`\uCD94\uB860\uCD9C\uB825 ${gt(r.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,n.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(Ia),o.join(`
`)}function ht(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let r of["claude","codex"]){let n=e.providers[r];n&&t.push({provider:r,label:`${Hc(r)} ${Wc(n.subtotal)}${typeof n.total_cost_usd=="number"&&Number.isFinite(n.total_cost_usd)?` \xB7 $${n.total_cost_usd.toFixed(2)}`:""}`,tooltip:Gc(r,n)})}return t}function Mn(e){let t={},r={claude:!0,codex:!1},n={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let i=t[o];i||(i={subtotal:0,breakdown:{}},t[o]=i),i.subtotal+=a.subtotal;for(let l of Zr)Number.isFinite(a.breakdown[l])&&(i.breakdown[l]=gt(i.breakdown[l])+gt(a.breakdown[l]));a.replayed&&(i.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?n.claude+=a.total_cost_usd:r.claude=!1)}return t.claude&&r.claude&&(t.claude.total_cost_usd=n.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function As(e){return!e||typeof e!="object"?null:Ot({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function Yc(e){return e==="codex"?"codex":"claude"}function cr(){return{subtotal:0,breakdown:zc(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function Dn(e,t,r){e.subtotal+=t.subtotal;for(let n of Zr)Number.isFinite(t.usage[n])&&(e.breakdown[n]=gt(e.breakdown[n])+gt(t.usage[n]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),r&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function Ra(e,t){let r={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(r.legs=e.legs),e.replayed&&(r.replayed=!0),r}function La(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Pr(e){return jc(e)?`\u03C4 ${La(Ss(e))}`:null}function qt(e){let t=Pr(e);if(!t)return null;let r=e?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${t} \xB7 $${r.toFixed(2)}`:t}function Nr(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${gt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${gt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${gt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${gt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${Ss(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&r.push(Ia),r.join(`
`)}function Ot(e,t){let r={claude:cr(),codex:cr()},n={orchestrator:{claude:cr(),codex:cr()},implementation:{claude:cr(),codex:cr()},"review-consult":{claude:cr(),codex:cr()}},s=new Set;for(let i of Object.values(e||{})){if(!i||i.bead_id!==t)continue;let l=i.usage;if(Ta(l)){let u=Yc(i.runner),f=Ea(l),v={provider:u,role:"orchestrator",attempt_id:String(i.attempt_id||""),usage:f,subtotal:Ca(u,f)};f.replayed===!0&&(v.replayed=!0),typeof i.model=="string"&&(v.model=i.model),typeof i.session_id=="string"&&(v.session_id=i.session_id),Dn(r[u],v,!0),Dn(n.orchestrator[u],v,!0)}let d=Array.isArray(i.usage_legs)?i.usage_legs:[];for(let u of d){if(!u||u.provider!=="codex"||!Uc.includes(u.role)||!Ta(u.usage))continue;let f=typeof u.receipt_id=="string"&&u.receipt_id.length>0?u.receipt_id:null;if(!f||s.has(f))continue;s.add(f);let v=Ea(u.usage),E={provider:"codex",role:u.role,attempt_id:String(i.attempt_id||""),usage:v,subtotal:Ca("codex",v)};E.receipt_id=f,typeof u.model=="string"&&(E.model=u.model),typeof u.session_id=="string"?E.session_id=u.session_id:typeof u.thread_id=="string"&&(E.session_id=u.thread_id),typeof u.turn_id=="string"&&(E.turn_id=u.turn_id),typeof u.completed_at=="string"&&(E.completed_at=u.completed_at),v.replayed===!0&&(E.replayed=!0),Dn(r.codex,E,!1),Dn(n[E.role].codex,E,!1)}}let o={};for(let i of["claude","codex"]){let l=r[i];if(l.legs.length===0)continue;let d=Ra(l,!1);i==="claude"&&l.outer_count>0&&l.outer_cost_count===l.outer_count&&(d.total_cost_usd=l.outer_cost),o[i]=d}if(Object.keys(o).length===0)return null;let a={};for(let i of["orchestrator","implementation","review-consult"]){let l={};for(let d of["claude","codex"]){let u=n[i][d];u.legs.length>0&&(l[d]={...Ra(u,!0),legs:u.legs})}Object.keys(l).length>0&&(a[i]=l)}return{providers:o,roles:a}}var{entries:Ua,setPrototypeOf:Oa,isFrozen:Vc,getPrototypeOf:Kc,getOwnPropertyDescriptor:Zc}=Object,{freeze:kt,seal:Dt,create:Os}=Object,{apply:Ds,construct:Ms}=typeof Reflect<"u"&&Reflect;kt||(kt=function(t){return t});Dt||(Dt=function(t){return t});Ds||(Ds=function(t,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return t.apply(r,s)});Ms||(Ms=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new t(...n)});var Pn=$t(Array.prototype.forEach),Xc=$t(Array.prototype.lastIndexOf),Da=$t(Array.prototype.pop),Xr=$t(Array.prototype.push),Qc=$t(Array.prototype.splice),qn=$t(String.prototype.toLowerCase),Ts=$t(String.prototype.toString),Es=$t(String.prototype.match),Qr=$t(String.prototype.replace),Jc=$t(String.prototype.indexOf),ed=$t(String.prototype.trim),Ft=$t(Object.prototype.hasOwnProperty),wt=$t(RegExp.prototype.test),Jr=td(TypeError);function $t(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return Ds(e,t,n)}}function td(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return Ms(e,r)}}function Pe(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:qn;Oa&&Oa(e,null);let n=t.length;for(;n--;){let s=t[n];if(typeof s=="string"){let o=r(s);o!==s&&(Vc(t)||(t[n]=o),s=o)}e[s]=!0}return e}function rd(e){for(let t=0;t<e.length;t++)Ft(e,t)||(e[t]=null);return e}function Jt(e){let t=Os(null);for(let[r,n]of Ua(e))Ft(e,r)&&(Array.isArray(n)?t[r]=rd(n):n&&typeof n=="object"&&n.constructor===Object?t[r]=Jt(n):t[r]=n);return t}function en(e,t){for(;e!==null;){let n=Zc(e,t);if(n){if(n.get)return $t(n.get);if(typeof n.value=="function")return $t(n.value)}e=Kc(e)}function r(){return null}return r}var Ma=kt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Cs=kt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Rs=kt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),nd=kt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Is=kt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),sd=kt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Pa=kt(["#text"]),Na=kt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Ls=kt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),qa=kt(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Nn=kt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),od=Dt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),ad=Dt(/<%[\w\W]*|[\w\W]*%>/gm),id=Dt(/\$\{[\w\W]*/gm),ld=Dt(/^data-[\-\w.\u00B7-\uFFFF]+$/),cd=Dt(/^aria-[\-\w]+$/),ja=Dt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),dd=Dt(/^(?:\w+script|data):/i),ud=Dt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),za=Dt(/^html$/i),pd=Dt(/^[a-z][.\w]*(-[.\w]+)+$/i),Fa=Object.freeze({__proto__:null,ARIA_ATTR:cd,ATTR_WHITESPACE:ud,CUSTOM_ELEMENT:pd,DATA_ATTR:ld,DOCTYPE_NAME:za,ERB_EXPR:ad,IS_ALLOWED_URI:ja,IS_SCRIPT_OR_DATA:dd,MUSTACHE_EXPR:od,TMPLIT_EXPR:id}),tn={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},fd=function(){return typeof window>"u"?null:window},_d=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Ba=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Ha(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:fd(),t=H=>Ha(H);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==tn.document||!e.Element)return t.isSupported=!1,t;let{document:r}=e,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:i,Element:l,NodeFilter:d,NamedNodeMap:u=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:f,DOMParser:v,trustedTypes:E}=e,S=l.prototype,C=en(S,"cloneNode"),q=en(S,"remove"),$=en(S,"nextSibling"),Y=en(S,"childNodes"),J=en(S,"parentNode");if(typeof a=="function"){let H=r.createElement("template");H.content&&H.content.ownerDocument&&(r=H.content.ownerDocument)}let L,O="",{implementation:x,createNodeIterator:B,createDocumentFragment:R,getElementsByTagName:pe}=r,{importNode:$e}=n,ae=Ba();t.isSupported=typeof Ua=="function"&&typeof J=="function"&&x&&x.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:ye,ERB_EXPR:De,TMPLIT_EXPR:Qe,DATA_ATTR:tt,ARIA_ATTR:Ne,IS_SCRIPT_OR_DATA:Oe,ATTR_WHITESPACE:fe,CUSTOM_ELEMENT:xe}=Fa,{IS_ALLOWED_URI:Le}=Fa,Z=null,he=Pe({},[...Ma,...Cs,...Rs,...Is,...Pa]),j=null,te=Pe({},[...Na,...Ls,...qa,...Nn]),me=Object.seal(Os(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Ie=null,P=null,N=Object.seal(Os(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),re=!0,ve=!0,Se=!1,Je=!0,Ae=!1,Ge=!0,qe=!1,Ye=!1,m=!1,A=!1,w=!1,I=!1,G=!0,X=!1,ne="user-content-",Ee=!0,Ve=!1,it={},ze=null,At=Pe({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),ut=null,lt=Pe({},["audio","video","img","source","image","track"]),pt=null,yt=Pe({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Te="http://www.w3.org/1998/Math/MathML",ft="http://www.w3.org/2000/svg",st="http://www.w3.org/1999/xhtml",nt=st,_t=!1,F=null,W=Pe({},[Te,ft,st],Ts),ce=Pe({},["mi","mo","mn","ms","mtext"]),_e=Pe({},["annotation-xml"]),be=Pe({},["title","style","font","a","script"]),Re=null,He=["application/xhtml+xml","text/html"],Ke="text/html",Ce=null,et=null,we=r.createElement("form"),p=function(h){return h instanceof RegExp||h instanceof Function},k=function(){let h=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(et&&et===h)){if((!h||typeof h!="object")&&(h={}),h=Jt(h),Re=He.indexOf(h.PARSER_MEDIA_TYPE)===-1?Ke:h.PARSER_MEDIA_TYPE,Ce=Re==="application/xhtml+xml"?Ts:qn,Z=Ft(h,"ALLOWED_TAGS")?Pe({},h.ALLOWED_TAGS,Ce):he,j=Ft(h,"ALLOWED_ATTR")?Pe({},h.ALLOWED_ATTR,Ce):te,F=Ft(h,"ALLOWED_NAMESPACES")?Pe({},h.ALLOWED_NAMESPACES,Ts):W,pt=Ft(h,"ADD_URI_SAFE_ATTR")?Pe(Jt(yt),h.ADD_URI_SAFE_ATTR,Ce):yt,ut=Ft(h,"ADD_DATA_URI_TAGS")?Pe(Jt(lt),h.ADD_DATA_URI_TAGS,Ce):lt,ze=Ft(h,"FORBID_CONTENTS")?Pe({},h.FORBID_CONTENTS,Ce):At,Ie=Ft(h,"FORBID_TAGS")?Pe({},h.FORBID_TAGS,Ce):Jt({}),P=Ft(h,"FORBID_ATTR")?Pe({},h.FORBID_ATTR,Ce):Jt({}),it=Ft(h,"USE_PROFILES")?h.USE_PROFILES:!1,re=h.ALLOW_ARIA_ATTR!==!1,ve=h.ALLOW_DATA_ATTR!==!1,Se=h.ALLOW_UNKNOWN_PROTOCOLS||!1,Je=h.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Ae=h.SAFE_FOR_TEMPLATES||!1,Ge=h.SAFE_FOR_XML!==!1,qe=h.WHOLE_DOCUMENT||!1,A=h.RETURN_DOM||!1,w=h.RETURN_DOM_FRAGMENT||!1,I=h.RETURN_TRUSTED_TYPE||!1,m=h.FORCE_BODY||!1,G=h.SANITIZE_DOM!==!1,X=h.SANITIZE_NAMED_PROPS||!1,Ee=h.KEEP_CONTENT!==!1,Ve=h.IN_PLACE||!1,Le=h.ALLOWED_URI_REGEXP||ja,nt=h.NAMESPACE||st,ce=h.MATHML_TEXT_INTEGRATION_POINTS||ce,_e=h.HTML_INTEGRATION_POINTS||_e,me=h.CUSTOM_ELEMENT_HANDLING||{},h.CUSTOM_ELEMENT_HANDLING&&p(h.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(me.tagNameCheck=h.CUSTOM_ELEMENT_HANDLING.tagNameCheck),h.CUSTOM_ELEMENT_HANDLING&&p(h.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(me.attributeNameCheck=h.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),h.CUSTOM_ELEMENT_HANDLING&&typeof h.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(me.allowCustomizedBuiltInElements=h.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Ae&&(ve=!1),w&&(A=!0),it&&(Z=Pe({},Pa),j=[],it.html===!0&&(Pe(Z,Ma),Pe(j,Na)),it.svg===!0&&(Pe(Z,Cs),Pe(j,Ls),Pe(j,Nn)),it.svgFilters===!0&&(Pe(Z,Rs),Pe(j,Ls),Pe(j,Nn)),it.mathMl===!0&&(Pe(Z,Is),Pe(j,qa),Pe(j,Nn))),h.ADD_TAGS&&(typeof h.ADD_TAGS=="function"?N.tagCheck=h.ADD_TAGS:(Z===he&&(Z=Jt(Z)),Pe(Z,h.ADD_TAGS,Ce))),h.ADD_ATTR&&(typeof h.ADD_ATTR=="function"?N.attributeCheck=h.ADD_ATTR:(j===te&&(j=Jt(j)),Pe(j,h.ADD_ATTR,Ce))),h.ADD_URI_SAFE_ATTR&&Pe(pt,h.ADD_URI_SAFE_ATTR,Ce),h.FORBID_CONTENTS&&(ze===At&&(ze=Jt(ze)),Pe(ze,h.FORBID_CONTENTS,Ce)),Ee&&(Z["#text"]=!0),qe&&Pe(Z,["html","head","body"]),Z.table&&(Pe(Z,["tbody"]),delete Ie.tbody),h.TRUSTED_TYPES_POLICY){if(typeof h.TRUSTED_TYPES_POLICY.createHTML!="function")throw Jr('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof h.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Jr('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');L=h.TRUSTED_TYPES_POLICY,O=L.createHTML("")}else L===void 0&&(L=_d(E,s)),L!==null&&typeof O=="string"&&(O=L.createHTML(""));kt&&kt(h),et=h}},D=Pe({},[...Cs,...Rs,...nd]),oe=Pe({},[...Is,...sd]),de=function(h){let z=J(h);(!z||!z.tagName)&&(z={namespaceURI:nt,tagName:"template"});let _=qn(h.tagName),y=qn(z.tagName);return F[h.namespaceURI]?h.namespaceURI===ft?z.namespaceURI===st?_==="svg":z.namespaceURI===Te?_==="svg"&&(y==="annotation-xml"||ce[y]):!!D[_]:h.namespaceURI===Te?z.namespaceURI===st?_==="math":z.namespaceURI===ft?_==="math"&&_e[y]:!!oe[_]:h.namespaceURI===st?z.namespaceURI===ft&&!_e[y]||z.namespaceURI===Te&&!ce[y]?!1:!oe[_]&&(be[_]||!D[_]):!!(Re==="application/xhtml+xml"&&F[h.namespaceURI]):!1},ge=function(h){Xr(t.removed,{element:h});try{J(h).removeChild(h)}catch{q(h)}},ie=function(h,z){try{Xr(t.removed,{attribute:z.getAttributeNode(h),from:z})}catch{Xr(t.removed,{attribute:null,from:z})}if(z.removeAttribute(h),h==="is")if(A||w)try{ge(z)}catch{}else try{z.setAttribute(h,"")}catch{}},ue=function(h){let z=null,_=null;if(m)h="<remove></remove>"+h;else{let se=Es(h,/^[\r\n\t ]+/);_=se&&se[0]}Re==="application/xhtml+xml"&&nt===st&&(h='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+h+"</body></html>");let y=L?L.createHTML(h):h;if(nt===st)try{z=new v().parseFromString(y,Re)}catch{}if(!z||!z.documentElement){z=x.createDocument(nt,"template",null);try{z.documentElement.innerHTML=_t?O:y}catch{}}let ee=z.body||z.documentElement;return h&&_&&ee.insertBefore(r.createTextNode(_),ee.childNodes[0]||null),nt===st?pe.call(z,qe?"html":"body")[0]:qe?z.documentElement:ee},Me=function(h){return B.call(h.ownerDocument||h,h,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},ot=function(h){return h instanceof f&&(typeof h.nodeName!="string"||typeof h.textContent!="string"||typeof h.removeChild!="function"||!(h.attributes instanceof u)||typeof h.removeAttribute!="function"||typeof h.setAttribute!="function"||typeof h.namespaceURI!="string"||typeof h.insertBefore!="function"||typeof h.hasChildNodes!="function")},bt=function(h){return typeof i=="function"&&h instanceof i};function at(H,h,z){Pn(H,_=>{_.call(t,h,z,et)})}let mt=function(h){let z=null;if(at(ae.beforeSanitizeElements,h,null),ot(h))return ge(h),!0;let _=Ce(h.nodeName);if(at(ae.uponSanitizeElement,h,{tagName:_,allowedTags:Z}),Ge&&h.hasChildNodes()&&!bt(h.firstElementChild)&&wt(/<[/\w!]/g,h.innerHTML)&&wt(/<[/\w!]/g,h.textContent)||h.nodeType===tn.progressingInstruction||Ge&&h.nodeType===tn.comment&&wt(/<[/\w]/g,h.data))return ge(h),!0;if(!(N.tagCheck instanceof Function&&N.tagCheck(_))&&(!Z[_]||Ie[_])){if(!Ie[_]&&Mt(_)&&(me.tagNameCheck instanceof RegExp&&wt(me.tagNameCheck,_)||me.tagNameCheck instanceof Function&&me.tagNameCheck(_)))return!1;if(Ee&&!ze[_]){let y=J(h)||h.parentNode,ee=Y(h)||h.childNodes;if(ee&&y){let se=ee.length;for(let K=se-1;K>=0;--K){let g=C(ee[K],!0);g.__removalCount=(h.__removalCount||0)+1,y.insertBefore(g,$(h))}}}return ge(h),!0}return h instanceof l&&!de(h)||(_==="noscript"||_==="noembed"||_==="noframes")&&wt(/<\/no(script|embed|frames)/i,h.innerHTML)?(ge(h),!0):(Ae&&h.nodeType===tn.text&&(z=h.textContent,Pn([ye,De,Qe],y=>{z=Qr(z,y," ")}),h.textContent!==z&&(Xr(t.removed,{element:h.cloneNode()}),h.textContent=z)),at(ae.afterSanitizeElements,h,null),!1)},Rt=function(h,z,_){if(G&&(z==="id"||z==="name")&&(_ in r||_ in we))return!1;if(!(ve&&!P[z]&&wt(tt,z))){if(!(re&&wt(Ne,z))){if(!(N.attributeCheck instanceof Function&&N.attributeCheck(z,h))){if(!j[z]||P[z]){if(!(Mt(h)&&(me.tagNameCheck instanceof RegExp&&wt(me.tagNameCheck,h)||me.tagNameCheck instanceof Function&&me.tagNameCheck(h))&&(me.attributeNameCheck instanceof RegExp&&wt(me.attributeNameCheck,z)||me.attributeNameCheck instanceof Function&&me.attributeNameCheck(z,h))||z==="is"&&me.allowCustomizedBuiltInElements&&(me.tagNameCheck instanceof RegExp&&wt(me.tagNameCheck,_)||me.tagNameCheck instanceof Function&&me.tagNameCheck(_))))return!1}else if(!pt[z]){if(!wt(Le,Qr(_,fe,""))){if(!((z==="src"||z==="xlink:href"||z==="href")&&h!=="script"&&Jc(_,"data:")===0&&ut[h])){if(!(Se&&!wt(Oe,Qr(_,fe,"")))){if(_)return!1}}}}}}}return!0},Mt=function(h){return h!=="annotation-xml"&&Es(h,xe)},Tt=function(h){at(ae.beforeSanitizeAttributes,h,null);let{attributes:z}=h;if(!z||ot(h))return;let _={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:j,forceKeepAttr:void 0},y=z.length;for(;y--;){let ee=z[y],{name:se,namespaceURI:K,value:g}=ee,M=Ce(se),T=g,V=se==="value"?T:ed(T);if(_.attrName=M,_.attrValue=V,_.keepAttr=!0,_.forceKeepAttr=void 0,at(ae.uponSanitizeAttribute,h,_),V=_.attrValue,X&&(M==="id"||M==="name")&&(ie(se,h),V=ne+V),Ge&&wt(/((--!?|])>)|<\/(style|title|textarea)/i,V)){ie(se,h);continue}if(M==="attributename"&&Es(V,"href")){ie(se,h);continue}if(_.forceKeepAttr)continue;if(!_.keepAttr){ie(se,h);continue}if(!Je&&wt(/\/>/i,V)){ie(se,h);continue}Ae&&Pn([ye,De,Qe],Ue=>{V=Qr(V,Ue," ")});let ke=Ce(h.nodeName);if(!Rt(ke,M,V)){ie(se,h);continue}if(L&&typeof E=="object"&&typeof E.getAttributeType=="function"&&!K)switch(E.getAttributeType(ke,M)){case"TrustedHTML":{V=L.createHTML(V);break}case"TrustedScriptURL":{V=L.createScriptURL(V);break}}if(V!==T)try{K?h.setAttributeNS(K,se,V):h.setAttribute(se,V),ot(h)?ge(h):Da(t.removed)}catch{ie(se,h)}}at(ae.afterSanitizeAttributes,h,null)},It=function H(h){let z=null,_=Me(h);for(at(ae.beforeSanitizeShadowDOM,h,null);z=_.nextNode();)at(ae.uponSanitizeShadowNode,z,null),mt(z),Tt(z),z.content instanceof o&&H(z.content);at(ae.afterSanitizeShadowDOM,h,null)};return t.sanitize=function(H){let h=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},z=null,_=null,y=null,ee=null;if(_t=!H,_t&&(H="<!-->"),typeof H!="string"&&!bt(H))if(typeof H.toString=="function"){if(H=H.toString(),typeof H!="string")throw Jr("dirty is not a string, aborting")}else throw Jr("toString is not a function");if(!t.isSupported)return H;if(Ye||k(h),t.removed=[],typeof H=="string"&&(Ve=!1),Ve){if(H.nodeName){let g=Ce(H.nodeName);if(!Z[g]||Ie[g])throw Jr("root node is forbidden and cannot be sanitized in-place")}}else if(H instanceof i)z=ue("<!---->"),_=z.ownerDocument.importNode(H,!0),_.nodeType===tn.element&&_.nodeName==="BODY"||_.nodeName==="HTML"?z=_:z.appendChild(_);else{if(!A&&!Ae&&!qe&&H.indexOf("<")===-1)return L&&I?L.createHTML(H):H;if(z=ue(H),!z)return A?null:I?O:""}z&&m&&ge(z.firstChild);let se=Me(Ve?H:z);for(;y=se.nextNode();)mt(y),Tt(y),y.content instanceof o&&It(y.content);if(Ve)return H;if(A){if(w)for(ee=R.call(z.ownerDocument);z.firstChild;)ee.appendChild(z.firstChild);else ee=z;return(j.shadowroot||j.shadowrootmode)&&(ee=$e.call(n,ee,!0)),ee}let K=qe?z.outerHTML:z.innerHTML;return qe&&Z["!doctype"]&&z.ownerDocument&&z.ownerDocument.doctype&&z.ownerDocument.doctype.name&&wt(za,z.ownerDocument.doctype.name)&&(K="<!DOCTYPE "+z.ownerDocument.doctype.name+`>
`+K),Ae&&Pn([ye,De,Qe],g=>{K=Qr(K,g," ")}),L&&I?L.createHTML(K):K},t.setConfig=function(){let H=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};k(H),Ye=!0},t.clearConfig=function(){et=null,Ye=!1},t.isValidAttribute=function(H,h,z){et||k({});let _=Ce(H),y=Ce(h);return Rt(_,y,z)},t.addHook=function(H,h){typeof h=="function"&&Xr(ae[H],h)},t.removeHook=function(H,h){if(h!==void 0){let z=Xc(ae[H],h);return z===-1?void 0:Qc(ae[H],z,1)[0]}return Da(ae[H])},t.removeHooks=function(H){ae[H]=[]},t.removeAllHooks=function(){ae=Ba()},t}var Wa=Ha();var Ga={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Ya=e=>(...t)=>({_$litDirective$:e,values:t}),Fn=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,n){this._$Ct=t,this._$AM=r,this._$Ci=n}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var rn=class extends Fn{constructor(t){if(super(t),this.it=dt,t.type!==Ga.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===dt||t==null)return this._t=void 0,this.it=t;if(t===yr)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};rn.directiveName="unsafeHTML",rn.resultType=1;var Va=Ya(rn);function Fs(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Sr=Fs();function ti(e){Sr=e}var an={exec:()=>null};function je(e,t=""){let r=typeof e=="string"?e:e.source,n={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(xt.caret,"$1"),r=r.replace(s,a),n},getRegex:()=>new RegExp(r,t)};return n}var md=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),xt={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},gd=/^(?:[ \t]*(?:\n|$))+/,hd=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,bd=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,ln=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,vd=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Bs=/(?:[*+-]|\d{1,9}[.)])/,ri=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,ni=je(ri).replace(/bull/g,Bs).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),yd=je(ri).replace(/bull/g,Bs).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Us=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,wd=/^[^\n]+/,js=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,kd=je(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",js).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),$d=je(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Bs).getRegex(),Wn="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",zs=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,xd=je("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",zs).replace("tag",Wn).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),si=je(Us).replace("hr",ln).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Wn).getRegex(),Sd=je(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",si).getRegex(),Hs={blockquote:Sd,code:hd,def:kd,fences:bd,heading:vd,hr:ln,html:xd,lheading:ni,list:$d,newline:gd,paragraph:si,table:an,text:wd},Ka=je("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",ln).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Wn).getRegex(),Ad={...Hs,lheading:yd,table:Ka,paragraph:je(Us).replace("hr",ln).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Ka).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Wn).getRegex()},Td={...Hs,html:je(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",zs).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:an,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:je(Us).replace("hr",ln).replace("heading",` *#{1,6} *[^
]`).replace("lheading",ni).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Ed=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Cd=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,oi=/^( {2,}|\\)\n(?!\s*$)/,Rd=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Gn=/[\p{P}\p{S}]/u,Ws=/[\s\p{P}\p{S}]/u,ai=/[^\s\p{P}\p{S}]/u,Id=je(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Ws).getRegex(),ii=/(?!~)[\p{P}\p{S}]/u,Ld=/(?!~)[\s\p{P}\p{S}]/u,Od=/(?:[^\s\p{P}\p{S}]|~)/u,Dd=je(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",md?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),li=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Md=je(li,"u").replace(/punct/g,Gn).getRegex(),Pd=je(li,"u").replace(/punct/g,ii).getRegex(),ci="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Nd=je(ci,"gu").replace(/notPunctSpace/g,ai).replace(/punctSpace/g,Ws).replace(/punct/g,Gn).getRegex(),qd=je(ci,"gu").replace(/notPunctSpace/g,Od).replace(/punctSpace/g,Ld).replace(/punct/g,ii).getRegex(),Fd=je("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,ai).replace(/punctSpace/g,Ws).replace(/punct/g,Gn).getRegex(),Bd=je(/\\(punct)/,"gu").replace(/punct/g,Gn).getRegex(),Ud=je(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),jd=je(zs).replace("(?:-->|$)","-->").getRegex(),zd=je("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",jd).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),jn=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Hd=je(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",jn).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),di=je(/^!?\[(label)\]\[(ref)\]/).replace("label",jn).replace("ref",js).getRegex(),ui=je(/^!?\[(ref)\](?:\[\])?/).replace("ref",js).getRegex(),Wd=je("reflink|nolink(?!\\()","g").replace("reflink",di).replace("nolink",ui).getRegex(),Za=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Gs={_backpedal:an,anyPunctuation:Bd,autolink:Ud,blockSkip:Dd,br:oi,code:Cd,del:an,emStrongLDelim:Md,emStrongRDelimAst:Nd,emStrongRDelimUnd:Fd,escape:Ed,link:Hd,nolink:ui,punctuation:Id,reflink:di,reflinkSearch:Wd,tag:zd,text:Rd,url:an},Gd={...Gs,link:je(/^!?\[(label)\]\((.*?)\)/).replace("label",jn).getRegex(),reflink:je(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",jn).getRegex()},Ps={...Gs,emStrongRDelimAst:qd,emStrongLDelim:Pd,url:je(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Za).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:je(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Za).getRegex()},Yd={...Ps,br:je(oi).replace("{2,}","*").getRegex(),text:je(Ps.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Bn={normal:Hs,gfm:Ad,pedantic:Td},nn={normal:Gs,gfm:Ps,breaks:Yd,pedantic:Gd},Vd={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Xa=e=>Vd[e];function er(e,t){if(t){if(xt.escapeTest.test(e))return e.replace(xt.escapeReplace,Xa)}else if(xt.escapeTestNoEncode.test(e))return e.replace(xt.escapeReplaceNoEncode,Xa);return e}function Qa(e){try{e=encodeURI(e).replace(xt.percentDecode,"%")}catch{return null}return e}function Ja(e,t){let r=e.replace(xt.findPipe,(o,a,i)=>{let l=!1,d=a;for(;--d>=0&&i[d]==="\\";)l=!l;return l?"|":" |"}),n=r.split(xt.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(xt.slashPipe,"|");return n}function sn(e,t,r){let n=e.length;if(n===0)return"";let s=0;for(;s<n;){let o=e.charAt(n-s-1);if(o===t&&!r)s++;else if(o!==t&&r)s++;else break}return e.slice(0,n-s)}function Kd(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return r>0?-2:-1}function ei(e,t,r,n,s){let o=t.href,a=t.title||null,i=e[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let l={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:a,text:i,tokens:n.inlineTokens(i)};return n.state.inLink=!1,l}function Zd(e,t,r){let n=e.match(r.other.indentCodeCompensation);if(n===null)return t;let s=n[1];return t.split(`
`).map(o=>{let a=o.match(r.other.beginningSpace);if(a===null)return o;let[i]=a;return i.length>=s.length?o.slice(s.length):o}).join(`
`)}var zn=class{constructor(e){Xe(this,"options");Xe(this,"rules");Xe(this,"lexer");this.options=e||Sr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:sn(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],n=Zd(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let n=sn(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:sn(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=sn(t[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let a=!1,i=[],l;for(l=0;l<r.length;l++)if(this.rules.other.blockquoteStart.test(r[l]))i.push(r[l]),a=!0;else if(!a)i.push(r[l]);else break;r=r.slice(l);let d=i.join(`
`),u=d.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${d}`:d,s=s?`${s}
${u}`:u;let f=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(u,o,!0),this.lexer.state.top=f,r.length===0)break;let v=o.at(-1);if(v?.type==="code")break;if(v?.type==="blockquote"){let E=v,S=E.raw+`
`+r.join(`
`),C=this.blockquote(S);o[o.length-1]=C,n=n.substring(0,n.length-E.raw.length)+C.raw,s=s.substring(0,s.length-E.text.length)+C.text;break}else if(v?.type==="list"){let E=v,S=E.raw+`
`+r.join(`
`),C=this.list(S);o[o.length-1]=C,n=n.substring(0,n.length-v.raw.length)+C.raw,s=s.substring(0,s.length-E.raw.length)+C.raw,r=S.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),a=!1;for(;e;){let l=!1,d="",u="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;d=t[0],e=e.substring(d.length);let f=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,C=>" ".repeat(3*C.length)),v=e.split(`
`,1)[0],E=!f.trim(),S=0;if(this.options.pedantic?(S=2,u=f.trimStart()):E?S=t[1].length+1:(S=t[2].search(this.rules.other.nonSpaceChar),S=S>4?1:S,u=f.slice(S),S+=t[1].length),E&&this.rules.other.blankLine.test(v)&&(d+=v+`
`,e=e.substring(v.length+1),l=!0),!l){let C=this.rules.other.nextBulletRegex(S),q=this.rules.other.hrRegex(S),$=this.rules.other.fencesBeginRegex(S),Y=this.rules.other.headingBeginRegex(S),J=this.rules.other.htmlBeginRegex(S);for(;e;){let L=e.split(`
`,1)[0],O;if(v=L,this.options.pedantic?(v=v.replace(this.rules.other.listReplaceNesting,"  "),O=v):O=v.replace(this.rules.other.tabCharGlobal,"    "),$.test(v)||Y.test(v)||J.test(v)||C.test(v)||q.test(v))break;if(O.search(this.rules.other.nonSpaceChar)>=S||!v.trim())u+=`
`+O.slice(S);else{if(E||f.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||$.test(f)||Y.test(f)||q.test(f))break;u+=`
`+v}!E&&!v.trim()&&(E=!0),d+=L+`
`,e=e.substring(L.length+1),f=O.slice(S)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(d)&&(a=!0)),s.items.push({type:"list_item",raw:d,task:!!this.options.gfm&&this.rules.other.listIsTask.test(u),loose:!1,text:u,tokens:[]}),s.raw+=d}let i=s.items.at(-1);if(i)i.raw=i.raw.trimEnd(),i.text=i.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let l of s.items){if(this.lexer.state.top=!1,l.tokens=this.lexer.blockTokens(l.text,[]),l.task){if(l.text=l.text.replace(this.rules.other.listReplaceTask,""),l.tokens[0]?.type==="text"||l.tokens[0]?.type==="paragraph"){l.tokens[0].raw=l.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),l.tokens[0].text=l.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let u=this.lexer.inlineQueue.length-1;u>=0;u--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[u].src)){this.lexer.inlineQueue[u].src=this.lexer.inlineQueue[u].src.replace(this.rules.other.listReplaceTask,"");break}}let d=this.rules.other.listTaskCheckbox.exec(l.raw);if(d){let u={type:"checkbox",raw:d[0]+" ",checked:d[0]!=="[ ]"};l.checked=u.checked,s.loose?l.tokens[0]&&["paragraph","text"].includes(l.tokens[0].type)&&"tokens"in l.tokens[0]&&l.tokens[0].tokens?(l.tokens[0].raw=u.raw+l.tokens[0].raw,l.tokens[0].text=u.raw+l.tokens[0].text,l.tokens[0].tokens.unshift(u)):l.tokens.unshift({type:"paragraph",raw:u.raw,text:u.raw,tokens:[u]}):l.tokens.unshift(u)}}if(!s.loose){let d=l.tokens.filter(f=>f.type==="space"),u=d.length>0&&d.some(f=>this.rules.other.anyLine.test(f.raw));s.loose=u}}if(s.loose)for(let l of s.items){l.loose=!0;for(let d of l.tokens)d.type==="text"&&(d.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:n,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=Ja(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let a of n)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<r.length;a++)o.header.push({text:r[a],tokens:this.lexer.inline(r[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(Ja(a,o.header.length).map((i,l)=>({text:i,tokens:this.lexer.inline(i),header:!1,align:o.align[l]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=sn(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=Kd(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let n=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),ei(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return ei(r,s,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,a,i=s,l=0,d=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+s);(n=d.exec(t))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(a=[...o].length,n[3]||n[4]){i+=a;continue}else if((n[5]||n[6])&&s%3&&!((s+a)%3)){l+=a;continue}if(i-=a,i>0)continue;a=Math.min(a,a+i+l);let u=[...n[0]][0].length,f=e.slice(0,s+n.index+u+a);if(Math.min(s,a)%2){let E=f.slice(1,-1);return{type:"em",raw:f,text:E,tokens:this.lexer.inlineTokens(E)}}let v=f.slice(2,-2);return{type:"strong",raw:f,text:v,tokens:this.lexer.inlineTokens(v)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,n;return t[2]==="@"?(r=t[1],n="mailto:"+r):(r=t[1],n=r),{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,n;if(t[2]==="@")r=t[0],n="mailto:"+r;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);r=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},Bt=class Ns{constructor(t){Xe(this,"tokens");Xe(this,"options");Xe(this,"state");Xe(this,"inlineQueue");Xe(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Sr,this.options.tokenizer=this.options.tokenizer||new zn,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:xt,block:Bn.normal,inline:nn.normal};this.options.pedantic?(r.block=Bn.pedantic,r.inline=nn.pedantic):this.options.gfm&&(r.block=Bn.gfm,this.options.breaks?r.inline=nn.breaks:r.inline=nn.gfm),this.tokenizer.rules=r}static get rules(){return{block:Bn,inline:nn}}static lex(t,r){return new Ns(r).lex(t)}static lexInline(t,r){return new Ns(r).inlineTokens(t)}lex(t){t=t.replace(xt.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,r=[],n=!1){for(this.options.pedantic&&(t=t.replace(xt.tabCharGlobal,"    ").replace(xt.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,r))?(t=t.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=r.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
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
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,r}inline(t,r=[]){return this.inlineQueue.push({src:t,tokens:r}),r}inlineTokens(t,r=[]){let n=t,s=null;if(this.tokens.links){let l=Object.keys(this.tokens.links);if(l.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)l.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let a=!1,i="";for(;t;){a||(i=""),a=!1;let l;if(this.options.extensions?.inline?.some(u=>(l=u.call({lexer:this},t,r))?(t=t.substring(l.raw.length),r.push(l),!0):!1))continue;if(l=this.tokenizer.escape(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.tag(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.link(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(l.raw.length);let u=r.at(-1);l.type==="text"&&u?.type==="text"?(u.raw+=l.raw,u.text+=l.text):r.push(l);continue}if(l=this.tokenizer.emStrong(t,n,i)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.codespan(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.br(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.del(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.autolink(t)){t=t.substring(l.raw.length),r.push(l);continue}if(!this.state.inLink&&(l=this.tokenizer.url(t))){t=t.substring(l.raw.length),r.push(l);continue}let d=t;if(this.options.extensions?.startInline){let u=1/0,f=t.slice(1),v;this.options.extensions.startInline.forEach(E=>{v=E.call({lexer:this},f),typeof v=="number"&&v>=0&&(u=Math.min(u,v))}),u<1/0&&u>=0&&(d=t.substring(0,u+1))}if(l=this.tokenizer.inlineText(d)){t=t.substring(l.raw.length),l.raw.slice(-1)!=="_"&&(i=l.raw.slice(-1)),a=!0;let u=r.at(-1);u?.type==="text"?(u.raw+=l.raw,u.text+=l.text):r.push(l);continue}if(t){let u="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(u);break}else throw new Error(u)}}return r}},Hn=class{constructor(e){Xe(this,"options");Xe(this,"parser");this.options=e||Sr}space(e){return""}code({text:e,lang:t,escaped:r}){let n=(t||"").match(xt.notSpaceStart)?.[0],s=e.replace(xt.endingNewline,"")+`
`;return n?'<pre><code class="language-'+er(n)+'">'+(r?s:er(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:er(s,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${er(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let n=this.parser.parseInline(r),s=Qa(e);if(s===null)return n;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+er(t)+'"'),o+=">"+n+"</a>",o}image({href:e,title:t,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=Qa(e);if(s===null)return er(r);e=s;let o=`<img src="${e}" alt="${r}"`;return t&&(o+=` title="${er(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:er(e.text)}},Ys=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},Ut=class qs{constructor(t){Xe(this,"options");Xe(this,"renderer");Xe(this,"textRenderer");this.options=t||Sr,this.options.renderer=this.options.renderer||new Hn,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Ys}static parse(t,r){return new qs(r).parse(t)}static parseInline(t,r){return new qs(r).parseInline(t)}parse(t){let r="";for(let n=0;n<t.length;n++){let s=t[n];if(this.options.extensions?.renderers?.[s.type]){let a=s,i=this.options.extensions.renderers[a.type].call({parser:this},a);if(i!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){r+=i||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}parseInline(t,r=this.renderer){let n="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let i=this.options.extensions.renderers[o.type].call({parser:this},o);if(i!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=i||"";continue}}let a=o;switch(a.type){case"escape":{n+=r.text(a);break}case"html":{n+=r.html(a);break}case"link":{n+=r.link(a);break}case"image":{n+=r.image(a);break}case"checkbox":{n+=r.checkbox(a);break}case"strong":{n+=r.strong(a);break}case"em":{n+=r.em(a);break}case"codespan":{n+=r.codespan(a);break}case"br":{n+=r.br(a);break}case"del":{n+=r.del(a);break}case"text":{n+=r.text(a);break}default:{let i='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return n}},Un,on=(Un=class{constructor(e){Xe(this,"options");Xe(this,"block");this.options=e||Sr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Bt.lex:Bt.lexInline}provideParser(){return this.block?Ut.parse:Ut.parseInline}},Xe(Un,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),Xe(Un,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Un),Xd=class{constructor(...e){Xe(this,"defaults",Fs());Xe(this,"options",this.setOptions);Xe(this,"parse",this.parseMarkdown(!0));Xe(this,"parseInline",this.parseMarkdown(!1));Xe(this,"Parser",Ut);Xe(this,"Renderer",Hn);Xe(this,"TextRenderer",Ys);Xe(this,"Lexer",Bt);Xe(this,"Tokenizer",zn);Xe(this,"Hooks",on);this.use(...e)}walkTokens(e,t){let r=[];for(let n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)r=r.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,t));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);r=r.concat(this.walkTokens(a,t))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let i=s.renderer.apply(this,a);return i===!1&&(i=o.apply(this,a)),i}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),n.extensions=t),r.renderer){let s=this.defaults.renderer||new Hn(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,i=r.renderer[a],l=s[a];s[a]=(...d)=>{let u=i.apply(s,d);return u===!1&&(u=l.apply(s,d)),u||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new zn(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,i=r.tokenizer[a],l=s[a];s[a]=(...d)=>{let u=i.apply(s,d);return u===!1&&(u=l.apply(s,d)),u}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new on;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,i=r.hooks[a],l=s[a];on.passThroughHooks.has(o)?s[a]=d=>{if(this.defaults.async&&on.passThroughHooksRespectAsync.has(o))return(async()=>{let f=await i.call(s,d);return l.call(s,f)})();let u=i.call(s,d);return l.call(s,u)}:s[a]=(...d)=>{if(this.defaults.async)return(async()=>{let f=await i.apply(s,d);return f===!1&&(f=await l.apply(s,d)),f})();let u=i.apply(s,d);return u===!1&&(u=l.apply(s,d)),u}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(a){let i=[];return i.push(o.call(this,a)),s&&(i=i.concat(s.call(this,a))),i}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Bt.lex(e,t??this.defaults)}parser(e,t){return Ut.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,i=await(s.hooks?await s.hooks.provideLexer():e?Bt.lex:Bt.lexInline)(a,s),l=s.hooks?await s.hooks.processAllTokens(i):i;s.walkTokens&&await Promise.all(this.walkTokens(l,s.walkTokens));let d=await(s.hooks?await s.hooks.provideParser():e?Ut.parse:Ut.parseInline)(l,s);return s.hooks?await s.hooks.postprocess(d):d})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?Bt.lex:Bt.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let i=(s.hooks?s.hooks.provideParser():e?Ut.parse:Ut.parseInline)(a,s);return s.hooks&&(i=s.hooks.postprocess(i)),i}catch(a){return o(a)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+er(r.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(r);throw r}}},xr=new Xd;function We(e,t){return xr.parse(e,t)}We.options=We.setOptions=function(e){return xr.setOptions(e),We.defaults=xr.defaults,ti(We.defaults),We};We.getDefaults=Fs;We.defaults=Sr;We.use=function(...e){return xr.use(...e),We.defaults=xr.defaults,ti(We.defaults),We};We.walkTokens=function(e,t){return xr.walkTokens(e,t)};We.parseInline=xr.parseInline;We.Parser=Ut;We.parser=Ut.parse;We.Renderer=Hn;We.TextRenderer=Ys;We.Lexer=Bt;We.lexer=Bt.lex;We.Tokenizer=zn;We.Hooks=on;We.parse=We;var I_=We.options,L_=We.setOptions,O_=We.use,D_=We.walkTokens,M_=We.parseInline;var P_=Ut.parse,N_=Bt.lex;function dr(e){let t=We.parse(e),r=Wa.sanitize(t);return Va(r)}function tr(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function qr(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Yn(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())} ${r(t.getHours())}:${r(t.getMinutes())}`}var Qd={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Jd=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,eu=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function ur(e){return!!e&&typeof e=="object"}function Vs(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function pi(e,t){let r=Vs(e),n=Vs(t),s=new Map;for(let i of r)s.set(i,(s.get(i)||0)+1);let o=0;for(let i of n){let l=s.get(i)||0;l>0?s.set(i,l-1):o+=1}let a=0;for(let i of s.values())a+=i;return{added:o,removed:a}}function tu(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>ur(s)&&typeof s.text=="string"?s.text:"").join(""):ur(e)&&typeof e.text=="string"&&(t=e.text);let n=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function ru(e){let t=String(e.name||""),r=e.input||{},n={kind:"tool",tool:t,icon:Qd[t]||"\u{1F527}",input:r,expandable:!0};if((t==="Read"||t==="Write")&&(n.path=String(r.file_path||r.path||"")),t==="Write"&&(n.added=Vs(r.content).length),t==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=pi(r.old_string,r.new_string);n.added=s,n.removed=o}if(t==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,a=Array.isArray(r.edits)?r.edits:[];for(let i of a){let l=pi(ur(i)?i.old_string:"",ur(i)?i.new_string:"");s+=l.added,o+=l.removed}n.added=s,n.removed=o}return t==="Bash"&&(n.command=String(r.command||"")),(t==="Grep"||t==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function fi(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function _i(e){let t=e.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=Jd.exec(t);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:t.trim()}:eu.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function nu(e,t){if(e.type==="assistant"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(ur(o)){if(o.type==="text"&&typeof o.text=="string")s.push(_i(o.text));else if(o.type==="thinking"){let a=fi(o.thinking);a&&s.push(a)}else if(o.type==="tool_use"){let a=ru(o);typeof o.id=="string"&&t.set(o.id,a),s.push(a)}}return s}if(e.type==="user"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(ur(s)&&s.type==="tool_result"){let o=t.get(String(s.tool_use_id));if(o){let a=tu(s.content);o.result=a,o.output=typeof s.content=="string"?s.content:a}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success";return[{kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""}]}return[]}function su(e){if(e.type==="item.completed"&&ur(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[_i(t.text)];if(t.type==="reasoning"){let r=fi(t.text);return r?[r]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function ou(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function mi(e){let t=[],r=new Map,n=Array.isArray(e)?e:[];for(let s of n){let o=s;if(typeof s=="string"){let i=s.trim();if(i.length===0)continue;try{o=JSON.parse(i)}catch{continue}}if(!ur(o))continue;let a=ou(o)?su(o):nu(o,r);for(let i of a)t.push(i)}return t}var au=5,iu=10,lu=/Task\s+#(\d+)/,cu=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,du=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function Vn(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function uu(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function pu(e){for(let t=e.length-1;t>=0;t-=1){let r=e[t];if(r.kind==="phase"||r.kind==="gate")return r.text||null}return null}function fu(e){let t=new Map,r=0;for(let s of e){if(s.kind!=="tool")continue;r+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let l=lu.exec(s.output||s.result||""),d=String(o.activeForm||o.subject||"").trim();if(!l||d.length===0)continue;t.set(l[1],{label:d,active:o.status==="in_progress"?r:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let i=o.activeForm||o.subject;typeof i=="string"&&i.trim().length>0&&(a.label=i.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?r:0)}let n=null;for(let s of t.values())s.active>0&&(!n||s.active>n.active)&&(n=s);return n?n.label:null}function _u(e){if(e.tool==="Bash"){let t=e.command||"";return cu.test(t)?"~ PR/\uAC8C\uC2DC \uC911":du.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function mu(e){let t=e.filter(s=>s.kind==="tool").slice(-iu),r=new Map;t.forEach((s,o)=>{let a=_u(s);if(!a)return;let i=r.get(a)||{count:0,last:-1};i.count+=1,i.last=o,r.set(a,i)});let n=null;for(let[s,o]of r)(!n||o.count>n.count||o.count===n.count&&o.last>n.last)&&(n={label:s,count:o.count,last:o.last});return n?n.label:null}function gu(e){let t=pu(e);if(t)return{text:t,guess:!1};let r=fu(e);if(r)return{text:r,guess:!1};let n=mu(e);return n?{text:n,guess:!0}:null}function hu(e,t){if(typeof e!="number")return"";let r=Math.max(0,Math.floor((t-e)/1e3));return r<60?`${r}\uCD08 \uC804`:Ct(e,t)}function Kn(e,t={}){let{transport:r,sessionLogStore:n,onClose:s}=t,o=null,a={},i=!0,l=new Set,d=new Set,u=null,f=null,v=!1,E=!1,S=!1,C=null,q=null;function $(){v=!1,E=!1,S=!1,C=null,q=null}async function Y(P){if(r){E=!0,S=!1,fe();try{let N=await Promise.resolve(r("get-attempt-prompt",{attempt_id:P}));if(o!==P)return;!N||typeof N!="object"||Array.isArray(N)?S=!0:(C=N,q=P)}catch{o===P&&(S=!0)}finally{o===P&&(E=!1,fe())}}}function J(){if(v=!v,v&&o&&q!==o){Y(o);return}fe()}function L(){if(!v)return"";let P=qr({loading:E,error:S});if(P)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${P}
      </div>`;if(!C)return"";if(C.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let N=Yn(C.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${N?c`<div class="prompt-block__meta">${N} 발송</div>`:""}
      ${typeof C.task_prompt=="string"?tr("\uACFC\uC5C5 (user)",C.task_prompt):""}
      ${typeof C.system_prompt=="string"?tr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",C.system_prompt):""}
    </div>`}function O(){if(!o||!n)return[];let P=n.get(o);return mi(P?P.lines:[])}function x(){if(!o||!n)return null;let P=n.get(o),N=P?P.last_event_at:null;return typeof N=="number"?N:null}function B(){return a.status==="running"}function R(){if(B()&&o){f||(f=setInterval(()=>fe(),1e3));return}pe()}function pe(){f&&(clearInterval(f),f=null)}function $e(P){let N=[],re=0;for(;re<P.length;){let ve=P[re];if(ve.kind==="tool"){let Se=re;for(;Se<P.length&&P[Se].kind==="tool"&&P[Se].tool===ve.tool;)Se+=1;if(Se-re>=au&&!d.has(re)){N.push({kind:"group",idx:re,tool:ve.tool||"",lines:P.slice(re,Se).map((Je,Ae)=>({idx:re+Ae,line:Je}))}),re=Se;continue}}N.push({kind:"line",idx:re,line:ve}),re+=1}return N}function ae(P){for(let N=P.length-1;N>=0;N-=1){let re=P[N];if(re.kind==="result"||re.kind==="error")return null;if(re.kind==="tool"&&!Object.hasOwn(re,"result"))return re}return null}function ye(P){for(let N=P.length-1;N>=0;N-=1)if(P[N].kind==="thinking")return P[N];return null}function De(P,N){if(N.kind==="gate")return c`<div class="sv__gate">${N.text}</div>`;if(N.kind==="phase")return c`<div class="sv__phase">${N.text}</div>`;if(N.kind==="result")return c`<div
        class="sv__result${N.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${N.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${dr(N.text||(N.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(N.kind==="thinking"){let re=l.has(P);return c`<div
        class="sv__think${re?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Le(P)}
      >
        <span class="sv__think-line">💭 ${Vn(N.text)}</span>
        ${re?c`<pre class="sv__think-expand">${N.text}</pre>`:""}
      </div>`}if(N.kind==="error")return c`<div class="sv__error">⛔ ${N.text}</div>`;if(N.kind==="blocker")return c`<div class="sv__error">⛔ ${N.text}</div>`;if(N.kind==="tool"){let re=l.has(P),ve=N.tool==="Bash"?uu(N.command):0,Se=N.tool==="Bash"?ve>1?Vn(N.command):N.command:N.path||N.command||"";return c`<div
        class="sv__tool${re?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>Le(P)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${N.icon}</span>
          <span class="sv__tool-name">${N.tool}</span>
          ${Se?c`<span class="sv__tool-detail">${Se}</span>`:""}
          ${ve>1?c`<span class="sv__tool-more">⋯ ${ve}줄</span>`:""}
          ${typeof N.added=="number"?c`<span class="sv__diff-add">+${N.added}</span>`:""}
          ${typeof N.removed=="number"?c`<span class="sv__diff-del">−${N.removed}</span>`:""}
          ${N.result?c`<span class="sv__tool-ok">→ ${N.result}</span>`:""}
        </span>
        ${re?c`<pre class="sv__tool-expand">${Qe(N)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${dr(N.text||"")}</div>`}function Qe(P){let N=[];if(P.tool==="Bash"&&typeof P.command=="string"&&P.command.length>0)N.push(P.command);else if(P.input!==void 0)try{N.push(`input: ${JSON.stringify(P.input,null,2)}`)}catch{}return typeof P.output=="string"&&P.output.length>0&&N.push(`output:
${P.output}`),N.join(`

`)}function tt(){if(!o)return c``;let P=O(),N=[a.runner,a.model,a.effort].filter(Boolean).join(" \xB7 "),re=a.session_id||"",ve=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${i?"ON":"OFF"}`,Se=B(),Je=Se?hu(x(),Date.now()):"",Ae=Se?ae(P):null,Ge=Se?ye(P):null,qe=gu(P);return c`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${qe?c`<span
              class="sv__stage${qe.guess?" sv__stage--guess":""}"
              title=${qe.text}
              >${qe.text}</span
            >`:""}
        ${Se?c`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${Je?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${Je}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${Je?c`<span class="sv__live-ago">${Je}</span>`:""}</span
            >`:""}
        ${re?c`<button
              type="button"
              class="sv__session"
              title=${re}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${re}`}
              @click=${()=>he(re)}
            >
              ⧉ ${re.slice(0,8)}
            </button>`:""}
        ${N?c`<span class="sv__meta">${N}</span>`:""}
        ${a.worktree?c`<span class="sv__wt" title=${a.worktree}
              >${a.worktree}</span
            >`:""}
        <button
          type="button"
          class="sv__prompt-toggle${v?" sv__prompt-toggle--on":""}"
          data-seam="attempt-prompt-toggle"
          aria-pressed=${v?"true":"false"}
          aria-label="발송 프롬프트 보기"
          title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
          @click=${J}
        >
          ✉ 프롬프트
        </button>
        <button
          type="button"
          class="sv__follow${i?" sv__follow--on":""}"
          aria-pressed=${i?"true":"false"}
          aria-label=${ve}
          @click=${Z}
        >
          <span class="sv__follow-full">⇣ ${ve}</span>
          <span class="sv__follow-short">⇣ ${i?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>Ie()}
        >
          ✕
        </button>
      </div>
      ${L()}
      <div class="sv__body">
        ${P.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:$e(P).map(Ye=>Ye.kind==="group"?Ne(Ye):De(Ye.idx,Ye.line))}
      </div>
      ${Ae||Ge?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${Ae?c`<span class="sv__now-icon">${Ae.icon}</span>
                  <span class="sv__now-name">${Ae.tool}</span>
                  <span class="sv__now-detail"
                    >${Ae.tool==="Bash"?Vn(Ae.command):Ae.path||Ae.command||""}</span
                  >`:""}
            ${Ge?c`<span class="sv__now-think"
                  >💭 ${Vn(Ge.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function Ne(P){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>Oe(P.idx)}
    >
      <span class="sv__group-icon">${P.lines[0].line.icon}</span>
      <span class="sv__group-name">${P.tool}</span>
      <span class="sv__group-count">${P.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function Oe(P){d.add(P),fe()}function fe(){Be(tt(),e),R(),i&&xe()}function xe(){let P=e.querySelector(".sv__body");P&&(P.scrollTop=P.scrollHeight)}function Le(P){l.has(P)?l.delete(P):l.add(P),fe()}function Z(){i=!i,fe()}function he(P){$r(P).then(N=>{N?Q("\uBCF5\uC0AC\uB428","success",1200):Q("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function j(P){!o||!P||(a={...a,...P},fe())}function te(P){let N=P.target;if(!N||!N.classList||!N.classList.contains("sv__body"))return;!(N.scrollHeight-N.scrollTop-N.clientHeight<=4)&&i&&(i=!1,fe())}e.addEventListener("scroll",te,!0);function me(P){let N=P&&P.attempt_id;N&&(o=N,a=P.meta||{},i=!0,l.clear(),d.clear(),$(),!u&&n&&(u=n.subscribe(fe)),r&&Promise.resolve(r("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),fe())}function Ie(){let P=o;o=null,l.clear(),d.clear(),$(),pe(),r&&P&&Promise.resolve(r("unsubscribe-session-log",{id:`session-log:${P}`})).catch(()=>{}),Be(c``,e),s&&s()}return{open:me,updateMeta:j,close:Ie,isOpen(){return o!==null},destroy(){pe(),u&&(u(),u=null),e.removeEventListener("scroll",te,!0),o=null,Be(c``,e)}}}function cn(e){let t=e&&typeof e=="object"?e:{},r=t.metadata&&typeof t.metadata=="object"?t.metadata:{},n=gi(t.spec_id),s=gi(r.spec_id);return n?{path:n,source:"native",conflict:s.length>0&&s!==n}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function gi(e){return typeof e=="string"?e.trim():""}function bu(e){return["plan_review","plan_approval","plan_check"].some(t=>{let r=e[t];return typeof r=="string"&&r.trim().length>0})}function vu(e){let t=e&&e.metadata||{},r=cn(e),n=[];return r.path&&n.push({kind:"spec",path:r.path,missing_state:null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&n.push({kind:"plan",path:t.plan_path.trim(),missing_state:bu(t)?null:"plan_pending"}),n}function hi(e,t){let r=vu(e);return c`
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
  `}var yu="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",wu=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,ku=/^\*\*결론\*\* — (.+)$/;function bi(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==yu)return null;let r=wu.exec(t[1]||"");if(!r)return null;let n=r[1].split(" ")[0],s=r[2],o=r[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let i=a<t.length?ku.exec(t[a]):null,l=i?i[1].replace(/\s+/g," ").trim():"",d=i?a+1:a;return{lane:n,identifier:s,timestamp:o,conclusion:l,body:t.slice(d).join(`
`).trim()}}var vi=20;function yi(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let r=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${r}-${n} ${s}:${o}`}function $u(e){return e.length>vi?`${e.slice(0,vi)}\u2026`:e}function xu(e,t,r,n){let s=`${t.lane} ${$u(t.identifier)}`;return c`<div class="detail-report">
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
        <span class="detail-report__time">${yi(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${n&&t.body.length>0?c`<div class="detail-report__body">
          ${dr(t.body)}
        </div>`:""}
  </div>`}function Su(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${yi(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${dr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function wi(e,t={},r={}){let n=Array.isArray(e)?e.filter(Boolean):[],s=r.expanded||new Set,o=typeof r.draft=="string"?r.draft:"",a=r.sending===!0,i=n.slice().sort((l,d)=>String(d.created_at||"").localeCompare(String(l.created_at||"")));return c`
    <div class="detail-section-label">댓글 (${n.length})</div>
    ${r.error?c`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:i.length===0?c`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:c`<div class="detail-comments" data-seam="comments">
            ${i.map(l=>{let d=bi(typeof l.text=="string"?l.text:"");return d?xu(l,d,t,s.has(l.id)):Su(l)})}
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
  `}var Au=["codex","opus","fable","self","skip"],Tu=["codex","fable","skip"],Eu=["low","medium","high","xhigh"],Cu=["standard","fast_track"],Br=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"],Zs={orchestration_model:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uBAA8\uB378"},orchestration_effort:{title:"\uC6CC\uCEE4 reasoning effort"},orchestration_speed:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uC18D\uB3C4",help:"Fast\uB294 \uC9C0\uC6D0 \uBAA8\uB378\uC744 \uB354 \uBE60\uB974\uAC8C \uC2E4\uD589\uD558\uBA70 \uC0AC\uC6A9\uB7C9 \uBE44\uC6A9\uC774 \uC99D\uAC00\uD569\uB2C8\uB2E4."},spec_review_model:{title:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4"},spec_review_effort:{title:"\uC2A4\uD399 \uB9AC\uBDF0 reasoning effort"},plan_review_model:{title:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4"},plan_review_effort:{title:"\uACC4\uD68D \uB9AC\uBDF0 reasoning effort"},impl_review_model:{title:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4"},impl_review_effort:{title:"\uAD6C\uD604 \uB9AC\uBDF0 reasoning effort"},impl_runtime:{title:"\uAD6C\uD604 runtime"},impl_model:{title:"\uAD6C\uD604 \uBAA8\uB378",help:"\uC6CC\uD06C\uD50C\uB85C\uAC00 \uBCF5\uC7A1 \uAD6C\uD604\uC778\uC9C0, \uBC94\uC704\uAC00 \uD55C\uC815\uB41C \uAD6C\uD604\uC778\uC9C0 \uD310\uB2E8\uD574 \uD604\uC7AC runtime\uC758 \uAD6C\uD604\uC6A9 \uBAA8\uB378\uC744 \uC120\uD0DD\uD569\uB2C8\uB2E4."},impl_effort:{title:"\uAD6C\uD604 reasoning effort",help:"\uC790\uB3D9 \uC120\uD0DD\uC774\uBA74 workflow tier\uC5D0 \uC120\uC5B8\uB41C effort\uB97C, \uBAA8\uB378\uB9CC \uC9C1\uC811 \uC9C0\uC815\uD588\uC73C\uBA74 \uD574\uB2F9 \uD558\uC704 \uC5D0\uC774\uC804\uD2B8 \uD638\uCD9C\uC758 \uAE30\uBCF8 effort\uB97C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."},workflow_mode:{title:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC"}},ki={spec_review_effort:"spec_review_model",impl_review_effort:"impl_review_model",plan_review_effort:"plan_review_model"},Ru=["self","skip"],Iu="opus",Xs={orchestration_model:"(\uAE30\uBCF8: opus)",orchestration_effort:"(\uAE30\uBCF8: CLI \uAE30\uBCF8)",orchestration_speed:"(\uAE30\uBCF8: Standard)",spec_review_model:"(\uAE30\uBCF8: codex)",spec_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_review_model:"(\uAE30\uBCF8: codex)",impl_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_runtime:"(\uAE30\uBCF8: orchestration runtime \uC0C1\uC18D)",plan_review_model:"(\uAE30\uBCF8: codex)",plan_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_model:"(\uAE30\uBCF8: \uC791\uC5C5 \uC131\uACA9\uC5D0 \uB530\uB77C \uAD6C\uD604 \uBAA8\uB378 \uC790\uB3D9 \uC120\uD0DD)",impl_effort:"(\uAE30\uBCF8: \uC120\uD0DD\uB41C \uAD6C\uD604 \uC5D0\uC774\uC804\uD2B8\uC758 reasoning effort \uC0AC\uC6A9)"};function Qs(e){let t=Zs[e]||{title:e};return c`<span data-exec-setting-label>
    <span data-exec-setting-title>${t.title}</span>
    <code data-exec-setting-key>${e}</code>
    ${t.help?c`<small data-exec-setting-help=${e}>${t.help}</small>`:""}
  </span>`}function Lu(e,t,r=""){let n=t&&t[e];return typeof n=="string"&&n.length>0?`(\uAE30\uBCF8: ${e==="orchestration_speed"?n==="default"?"Standard":n==="fast"?"Fast":n:n} \u2014 ${r||"\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uD504\uB9AC\uC14B"})`:Xs[e]||"(\uAE30\uBCF8)"}function Fr(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Ar(e){if(!Fr(e)||!Fr(e.runners))return null;let t=Object.entries(e.runners).filter(([,r])=>Fr(r)&&Fr(r.models));return t.length>0?t:null}function Ks(e){return{value:e,label:e}}function Js(e){return{label:null,options:[{value:e,label:`${e} (\uBE44\uD638\uD658)`}]}}function $i(e,t,r=null){let n=Ar(e);if(!n)return t?[{label:null,options:[Ks(t)]}]:[];let s=n.filter(([a])=>r===null||a===r).map(([a,i])=>({label:a,options:Object.keys(i.models).map(Ks)})),o=s.some(a=>a.options.some(i=>i.value===t));return t&&!o?[Js(t),...s]:s}function pr(e,t){let r={label:null,options:e.map(Ks)};return t&&!e.includes(t)?[Js(t),r]:[r]}function rr(e,t){let r=Ar(e);if(!r||!t)return null;for(let[n,s]of r)if(Object.hasOwn(s.models,t))return n;return null}function eo(e,t){return Fr(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function Ou(e,t){return Fr(t)&&Array.isArray(t.orchestration_efforts)?t.orchestration_efforts.slice():eo(e,t)}function Du(e,t){let r=Ar(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return Ou(n,n.models[t]);return[]}function Mu(e,t){let r=Ar(e);if(!r||!t)return[];for(let[,n]of r){if(!Object.hasOwn(n.models,t))continue;let s=n.models[t];return Array.isArray(s.speed_tiers)?s.speed_tiers.slice():["default"]}return[]}function to(e,t){let r=Ar(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return eo(n,n.models[t]);return[]}function Ai(e){let t=Ar(e);if(!t)return[];let r=[];for(let[,n]of t)for(let s of Object.values(n.models))for(let o of eo(n,s))r.includes(o)||r.push(o);return r}function Ti(e,t){if(!t)return Ai(e);let n=Ar(e)?.find(([o])=>o===t)?.[1];if(!n)return[];let s=[];for(let o of Object.keys(n.models))for(let a of to(e,o))s.includes(a)||s.push(a);return s}function Xn(e,t,r){let n={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=n.impl_runtime==="inherit"?r:n.impl_runtime==="claude"||n.impl_runtime==="codex"?n.impl_runtime:null;if(n.impl_runtime==="inherit"&&!s)return n.impl_model="",n.impl_effort="",n;let o=rr(t,n.impl_model);if(n.impl_model&&(!s||o!==s))return n.impl_model="",n.impl_effort="",n;let a=n.impl_model?to(t,n.impl_model):Ti(t,s);return n.impl_effort&&a.length>0&&!a.includes(n.impl_effort)&&(n.impl_effort=""),n}function Ur(e){let{selectedOf:t,effectiveOf:r,runner_catalog:n,controller_runtime:s}=e,o=r("orchestration_model")||Iu,a=r("impl_model"),i=r("impl_runtime"),l=i==="claude"||i==="codex"?i:i==="inherit"?s===void 0?rr(n,o):s:null;return Br.map(d=>{let u=t(d),f,v=!1;return d==="orchestration_model"?f=$i(n,u):d==="impl_runtime"?f=pr(["inherit","claude","codex"],u):d==="impl_model"?(f=l?$i(n,u,l):u?[Js(u)]:[],v=i==="inherit"&&l===null):d==="orchestration_effort"?f=pr(Du(n,o),u):d==="orchestration_speed"?f=Pu(Mu(n,o),u):d==="impl_effort"?(f=pr(a?to(n,a):l?Ti(n,l):Ai(n),u),v=i==="inherit"&&l===null):d==="plan_review_model"?f=pr(Tu,u):Object.hasOwn(ki,d)?(f=pr(Eu,u),v=Ru.includes(r(ki[d]))):f=pr(Au,u),{key:d,groups:f,selected:u,disabled:v,runner:d==="orchestration_model"?rr(n,o):null}})}function Zn(e,t,r){return c`
    ${typeof r=="string"?c`<option value="" ?selected=${!t}>${r}</option>`:""}
    ${e.map(n=>n.label===null?n.options.map(s=>xi(s,t)):c`<optgroup label=${n.label}>
            ${n.options.map(s=>xi(s,t))}
          </optgroup>`)}
  `}function Pu(e,t){return pr(e,t).map(r=>({...r,options:r.options.map(n=>{let s=n.label.endsWith("(\uBE44\uD638\uD658)"),o=n.value==="default"?"Standard":n.value==="fast"?"Fast":null;return{...n,label:s?o?`${o} (\uBE44\uD638\uD658)`:n.label:o||n.label}})}))}function xi(e,t){return c`<option value=${e.value} ?selected=${e.value===t}>
    ${e.label}
  </option>`}function Si(e,t,r,n,s,o,a){return c`
    <div class="detail-kv">
      <span class="detail-kv__k">${Qs(e)}</span>
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
  `}function Ei(e,t,r,n,s=""){let o=e&&e.metadata||{},a=r&&typeof r=="object"?r:{},i=f=>typeof o[f]=="string"?o[f]:"",d=Ur({selectedOf:i,effectiveOf:f=>{let v=i(f);return v||(typeof a[f]=="string"?a[f]:"")},runner_catalog:n}),u=o.workflow_mode==="fast_track"?"fast_track":"standard";return c`
    <div class="detail-section-label">실행 설정 (수정 가능)</div>
    ${d.map(f=>Si(f.key,Zn(f.groups,f.selected,Lu(f.key,a,s)),f.selected,!1,f.disabled,f.runner,t))}
    ${Si("workflow_mode",Zn(pr(Cu,u),u),u,o.workflow_mode==="fast_track",!1,null,t)}
  `}function Nu(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function Ci(e,t){let r=t.getWorkspacePath,n=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",i="";function l(S){S.key==="Escape"&&s&&(S.preventDefault(),v())}document.addEventListener("keydown",l);function d(){return s?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>v()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${Nu(s)}</span
            >
            <button
              type="button"
              class="mv__close"
              aria-label="닫기"
              @click=${()=>v()}
            >
              ✕
            </button>
          </div>
          <div class="mv__body">
            ${o==="loading"?c`<div class="mv__status">불러오는 중…</div>`:o==="pending"?c`<div class="mv__status">${i}</div>`:o==="error"?c`<div class="mv__status mv__status--error">
                      ${i||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:dr(a)}
          </div>
        </div>
      </div>
    `:c``}function u(){Be(d(),e)}async function f(S,C={}){s=S,o="loading",a="",i="",u();let q=r?r():"";if(!q){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",u();return}if(!n){o="error",i="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",u();return}let $="/api/doc?workspace="+encodeURIComponent(q)+"&path="+encodeURIComponent(S);try{let Y=await n($),J=await Y.json().catch(()=>({}));if(!Y.ok||!J||J.ok!==!0){if(J?.error==="not_found"&&C.missing_state==="plan_pending"){o="pending",i="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",u();return}o="error",i="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(J&&J.error||Y.status)+")",u();return}a=String(J.content||""),o="ready",u()}catch{o="error",i="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",u()}}function v(){s=null,Be(c``,e)}function E(){document.removeEventListener("keydown",l),v()}return{open:f,close:v,destroy:E}}var qu=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],Li="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function Fu(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function Bu(e){let t=ht(e);if(t.length>0)return t.map(s=>c`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let r=Pr(e);if(!r||!e)return"";let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${r.replace(/^τ /,"\u03C4 \uCD1D ")}${n}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${Li}
          >부분 집계</span
        >`:""}`}function Ri(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function Ii(e){if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?Oi(t):""}function Uu(e){return e?["implementation","review-consult"].flatMap(r=>{let n=e.roles[r]?.codex;return n?n.legs.map(s=>{let a=ht({providers:{codex:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}})[0];return c`<div class="detail-session__leg detail-session__usage-detail">
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
        ${Ii(s.completed_at)?c`<span class="detail-session__leg-time detail-session__time"
              >${Ii(s.completed_at)}</span
            >`:""}
        ${a?c`<span class="detail-session__usage" title=${a.tooltip}
              >${a.label}</span
            >`:""}
      </div>`}):[]}):""}function ju(e,t){let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,n=[...qu,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return c`<div class="detail-session__usage-detail">
    ${n.map(s=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${Fu(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${r===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${r.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${Li}</span>`:""}
  </div>`}var zu={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Oi(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=String(t.getHours()).padStart(2,"0"),n=String(t.getMinutes()).padStart(2,"0");return`${r}:${n}`}function Hu(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,n])=>typeof n=="string"&&n.length>0).map(([n,s])=>`${n}=${s}`).join(" \xB7 "):"",r=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${r}</span>
    ${t?c`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function Di(e,t={},r={}){let n=Array.isArray(e)?e:[],s=r.expanded||new Set;if(n.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let d of n)d&&typeof d.resumed_from=="string"&&d.resumed_from.length>0&&o.add(d.resumed_from);let a=d=>{if(!(d.status==="failed"||d.status==="orphaned"))return"";let f=typeof d.session_id=="string"&&d.session_id.length>0,v=o.has(d.attempt_id),E=f&&!v,S=f?v?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${d.attempt_id}
      ?disabled=${!E}
      title=${S}
      @click=${C=>{C.stopPropagation(),E&&t.onResume&&t.onResume(d.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},i=d=>{if(!(d.status==="failed"||d.status==="orphaned")||typeof d.cause!="string"||d.cause==="")return"";let f=d.cause_detail,v=f&&typeof f.reason=="string"&&f.reason.length>0?typeof f.command=="string"&&f.command.length>0?`${f.reason} \xB7 ${f.command}`:f.reason:d.cause;return c`<div class="detail-session__cause" title=${v}>
      ${d.cause}
    </div>`},l=d=>{let u=Ri(As(d));if(ht(u).length===0&&!Pr(d.usage))return"";let f=s.has(d.attempt_id);return c`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${d.attempt_id}
      aria-expanded=${f?"true":"false"}
      title=${f?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${v=>{v.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(d.attempt_id)}}
    >
      τ 자세히
    </button>`};return c`
    <div class="detail-section-label">
      세션 이력${Bu(r.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${n.map(d=>{let u=As(d),f=Ri(u),v=ht(f);return c`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${d.status||"unknown"}"
            data-attempt-id=${d.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(d.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${zu[d.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${d.attempt_id}</span>
            ${lr(d)?c`<span
                  class="detail-session__resumed"
                  title=${lr(d)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${zt(d)}</span>
            ${v.length>0?c`<span class="detail-session__role">orchestrator</span>`:""}
            ${d.session_id?c`<span class="detail-session__sid" title=${d.session_id}
                  >${String(d.session_id).slice(0,8)}</span
                >`:""}
            ${v.length>0?v.map(E=>c`<span
                      class="detail-session__usage"
                      title=${E.tooltip}
                      >${E.label}</span
                    >`):Pr(d.usage)?c`<span class="detail-session__usage"
                    >${Pr(d.usage)}</span
                  >`:""}
            <span class="detail-session__time">${Oi(d.started_at)}</span>
          </button>
          ${l(d)} ${a(d)} ${i(d)} ${Hu(d)}
          ${s.has(d.attempt_id)&&d.usage?ju(d.usage,d.runner==="codex"?"codex":"claude"):""}
          ${Uu(u)}
        </div>`})}
    </div>
  `}function Mi(e,t={}){return c`
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
          ${Wu(e)}
        </div>`:""}
  `}function Wu(e){let t=qr(e);if(t)return t;let r=e.data;if(!r)return"";if(r.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof r.default_task_prompt=="string"?tr("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",r.default_task_prompt):""}`;let n=Yn(r.recorded_at);return c`<div class="detail-prompt__meta">
      ${r.attempt_id}${n?` \xB7 ${n}`:""}
    </div>
    ${typeof r.task_prompt=="string"?tr("\uACFC\uC5C5 (user)",r.task_prompt):""}
    ${typeof r.system_prompt=="string"?tr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",r.system_prompt):""}`}var Gu=["open","in_progress","deferred","resolved","closed"],Yu=[0,1,2,3,4];function Pi(e,t){let r=t.issueStores,n=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,i=t.execPresetStore,l=t.sessionLogStore,d=null,u=null,f={},v="",E=!1,S=!1,C=!1,q="",$="",Y="";function J(){S=!1,C=!1,q="",$="",Y=""}let L=[],O=null,x=null,B=!1,R="",pe=!1,$e=0,ae=new Set;function ye(){L=[],O=null,x=null,B=!1,R="",pe=!1,$e+=1,ae.clear()}async function De(g){if(!s)return;let M=++$e;try{let T=await Promise.resolve(s("get-comments",{id:g}));if(M!==$e||g!==d)return;L=Array.isArray(T)?T:[],B=!1}catch{if(M!==$e||g!==d)return;B=!0}K()}function Qe(){if(!s||!d)return;let g=u&&typeof u.comment_count=="number"?u.comment_count:null;if(O!==d){O=d,x=g,De(d);return}g!==null&&g!==x&&(x=g,De(d))}function tt(g){ae.has(g)?ae.delete(g):ae.add(g),K()}function Ne(g){let M=R.trim().length===0;R=g,M!==(g.trim().length===0)&&K()}async function Oe(){let g=R.trim();if(!s||!d||g.length===0||pe)return;let M=d;pe=!0,K();let T=!1;try{let V=await Promise.resolve(s("add-comment",{id:M,text:g}));Array.isArray(V)&&V.length>0&&(T=!0,M===d&&(L=V,B=!1,R="",x=V.length))}catch{T=!1}T||Q("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),M===d&&(pe=!1),K()}let fe={onToggle:tt,onDraftInput:Ne,onSubmit:Oe},xe=document.createElement("div");xe.className="md-viewer-root",document.body.appendChild(xe);let Le=Ci(xe,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),Z=document.createElement("div");Z.className="session-log-root",document.body.appendChild(Z);let he=Kn(Z,{transport:s?(g,M)=>Promise.resolve(s(g,M)):void 0,sessionLogStore:l}),j=!1,te=!1,me=!1,Ie=null,P=null,N=0;function re(g){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${g}`}function ve(){j=!1,te=!1,me=!1,Ie=null,P=null,N+=1}async function Se(g){if(!s)return;let M=++N;te=!0,me=!1,K();try{let T=await Promise.resolve(s("get-bead-prompt",{bead_id:g}));if(M!==N)return;!T||typeof T!="object"||Array.isArray(T)?me=!0:(Ie=T,P=re(g))}catch{M===N&&(me=!0)}finally{M===N&&(te=!1,K())}}function Je(){if(j=!j,j&&d&&P!==re(d)){Ie=null,Se(d);return}K()}function Ae(){if(!a||!d)return[];let g=a.get();return(g&&g.attempts?Object.values(g.attempts):[]).filter(T=>T&&T.bead_id===d).sort((T,V)=>(V.started_at||0)-(T.started_at||0)).map(T=>({attempt_id:T.attempt_id,bead_id:T.bead_id,status:T.status,started_at:typeof T.started_at=="number"?T.started_at:null,runner:T.runner||null,model:T.model||null,effort:T.effort||null,speed:T.speed||null,session_id:T.session_id||null,resumed_from:T.resumed_from||null,continuation_mode:T.continuation_mode||null,dismissed_at:typeof T.dismissed_at=="number"?T.dismissed_at:null,cause:typeof T.cause=="string"?T.cause:null,cause_detail:T.cause_detail||null,exec_default_preset_id:typeof T.exec_default_preset_id=="string"?T.exec_default_preset_id:null,exec_default_preset_revision:typeof T.exec_default_preset_revision=="number"?T.exec_default_preset_revision:null,exec_values:T.exec_values&&typeof T.exec_values=="object"?T.exec_values:null,usage:T.usage||null,usage_legs:Array.isArray(T.usage_legs)?T.usage_legs:[]}))}function Ge(){if(!a||!d)return null;let g=a.get();return Ot(g&&g.attempts||{},d)}let qe=new Set;function Ye(g){qe.has(g)?qe.delete(g):qe.add(g),K()}function m(g){let M=a?a.get():null,T=M&&M.attempts?M.attempts[g]:null;he.open({attempt_id:g,meta:T?{runner:T.runner||void 0,model:T.model||void 0,effort:T.effort||void 0,status:T.status||void 0,session_id:T.session_id||void 0}:{}})}async function A(g){if(!s||!g)return;let M=()=>{let Ue=a?a.get():null;return Ue&&typeof Ue.revision=="number"?Ue.revision:0},T=async(Ue={})=>await s("worker-attempt-resume",{attempt_id:g,expected_revision:M(),...Ue}),V=Ue=>{Ue?.queue&&a?.set&&a.set(Ue.queue)},ke=await T();if(V(ke),ke&&ke.conflict){let Ue=ke.queue&&typeof ke.queue.revision=="number"?ke.queue.revision:M();ke=await s("worker-attempt-resume",{attempt_id:g,expected_revision:Ue}),V(ke)}ke=await Xt(ke,(Ue,ct)=>T({continuation:Ue,decision_token:ct}),{onResult:V,refresh:()=>T()}),ke&&ke.resumed===!1&&!ke.conflict&&ke.reason&&Q(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${ke.reason}`,"error",2400)}let w={onOpen:m,onResume:A,onToggleUsage:Ye};function I(){let g=a?a.get():null,M=g&&g.default_exec_preset_id,T=typeof M=="string"?Ee()?.presets.find(V=>V.id===M):null;return T&&T.compatible!==!1&&T.settings?T.settings:{}}function G(){let g=a?a.get():null,M=g&&g.default_exec_preset_id,T=typeof M=="string"?Ee()?.presets.find(V=>V.id===M):null;return T&&T.compatible!==!1&&typeof T.name=="string"?T.name:""}function X(){let g=a?a.get():null;return g&&g.runner_catalog||null}function ne(){let g=u?.metadata&&typeof u.metadata=="object"?u.metadata:{},T=(Object.hasOwn(f,"orchestration_model")?f.orchestration_model:void 0)||(typeof g.orchestration_model=="string"?g.orchestration_model:"")||(typeof I().orchestration_model=="string"?I().orchestration_model:"")||"opus";return rr(X(),T)}function Ee(){let g=i?i.get():null;return!g||typeof g.revision!="number"?null:{revision:g.revision,presets:Array.isArray(g.presets)?g.presets:[]}}function Ve(g){let M=g&&g.settings&&typeof g.settings=="object"?g.settings:{},T=V=>typeof M[V]=="string"?M[V]:V==="impl_runtime"&&typeof M.impl_model=="string"&&rr(X(),M.impl_model)||"";return Ur({selectedOf:T,effectiveOf:T,runner_catalog:X()}).some(V=>V.groups.some(ke=>ke.options.some(Ue=>Ue.value===V.selected&&Ue.label.endsWith("(\uBE44\uD638\uD658)"))))}function it(g){i&&g&&typeof g.revision=="number"&&Array.isArray(g.presets)&&i.set({revision:g.revision,presets:g.presets})}async function ze(){let g=Ee(),M=g?.presets.find(T=>T.id===v);if(!(!s||!d||!g||!M||Ve(M)||E)){E=!0,K();try{let T=await Promise.resolve(s("apply-exec-preset",{id:d,preset_id:M.id,expected_revision:g.revision}));if(T&&T.conflict){it(T),Q("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let V=T&&Array.isArray(T.issue)?T.issue[0]:T?.issue;if(T&&T.applied&&V&&typeof V=="object"){u=V;for(let ke of Br)delete f[ke];Q("\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",2400);return}T&&T.error==="bd_readback_failed"?Q("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):Q("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(T){T&&typeof T=="object"&&T.code==="bd_readback_failed"?Q("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):Q("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{E=!1,K()}}}function At(){let g=Ee();if(g&&g.presets.length===0)return c`<section class="detail-exec-presets">
        <div class="detail-section-label">실행 프리셋</div>
        <p>전역 실행 설정에서 프리셋을 추가하세요.</p>
        <button
          type="button"
          data-open-exec-presets
          @click=${()=>t.onOpenExecPresets?.()}
        >
          전역 실행 설정 열기
        </button>
      </section>`;let M=g?g.presets:[],T=M.find(ke=>ke.id===v),V=T?Ve(T):!1;return c`<section class="detail-exec-presets">
      <div class="detail-section-label">실행 프리셋</div>
      <div class="detail-exec-presets__controls">
        <select
          data-exec-preset-select
          aria-label="실행 프리셋"
          ?disabled=${g===null||E}
          @change=${ke=>{v=ke.target.value,K()}}
        >
          <option value="" ?selected=${v===""}>
            ${g===null?"\uBD88\uB7EC\uC624\uB294 \uC911\u2026":"\uD504\uB9AC\uC14B \uC120\uD0DD"}
          </option>
          ${M.map(ke=>{let Ue=Ve(ke);return c`<option
              value=${ke.id}
              ?selected=${ke.id===v}
            >
              ${ke.name}${Ue?" (\uBE44\uD638\uD658)":""}
            </option>`})}
        </select>
        <button
          type="button"
          data-apply-exec-preset
          ?disabled=${g===null||!T||V||E}
          @click=${()=>{ze()}}
        >
          12개 설정 적용
        </button>
      </div>
      <p>적용하면 현재 이슈 실행 설정 전체를 교체합니다.</p>
    </section>`}let ut=null;r&&r.subscribe&&(ut=r.subscribe(()=>Te()));let lt=null;a&&typeof a.subscribe=="function"&&(lt=a.subscribe(()=>{d&&K()}));let pt=null;i&&typeof i.subscribe=="function"&&(pt=i.subscribe(()=>{d&&K()}));function yt(g){g.key==="Escape"&&d&&(g.preventDefault(),n())}document.addEventListener("keydown",yt);function Te(){if(d){if(r&&typeof r.snapshotFor=="function"){let g=r.snapshotFor("detail:"+d)||[];u=g.find(T=>T&&T.id===d)||g[0]||u}Qe(),K()}}function ft(g){$r(g).then(M=>{M?Q("\uBCF5\uC0AC\uB428","success",1200):Q("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function st(g){g.preventDefault(),g.stopPropagation(),d&&ft(d)}function nt(g,M){g.preventDefault(),g.stopPropagation(),ft(M)}function _t(g,M,T){g.preventDefault(),g.stopPropagation(),Le.open(M,{missing_state:T})}function F(g,M){f[g]=M,K(),!(!s||!d)&&Promise.resolve(s("update-exec-settings",{id:d,key:g,value:M})).catch(()=>{Q("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function W(g,M){let T=u||{},V=T.metadata&&typeof T.metadata=="object"?T.metadata:{},ke={};for(let Fe of["impl_runtime","impl_model","impl_effort"])ke[Fe]=Object.hasOwn(f,Fe)?f[Fe]:typeof V[Fe]=="string"?V[Fe]:"";ke[g]=M;let Ue=Xn(ke,X(),ne()),ct={};for(let Fe of["impl_runtime","impl_model","impl_effort"])ct[Fe]=f[Fe],f[Fe]=Ue[Fe]||"";K(),!(!s||!d)&&Promise.resolve(s("update-impl-target",{id:d,...Ue,orchestration_runtime:ne()})).then(Fe=>{let Gt=Array.isArray(Fe)?Fe[0]:Fe;if(!Gt||typeof Gt!="object"||!Gt.id)throw new Error("implementation target readback failed");u=Gt;for(let mr of["impl_runtime","impl_model","impl_effort"])delete f[mr];K()}).catch(()=>{for(let Fe of["impl_runtime","impl_model","impl_effort"])ct[Fe]===void 0?delete f[Fe]:f[Fe]=ct[Fe];K(),Q("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function ce(g,M,T){if(!s||!d)return!1;try{let V=await Promise.resolve(s(g,M)),ke=Array.isArray(V)?V[0]:V;return ke&&typeof ke=="object"&&ke.id?(u=ke,!0):(Q(T,"error"),!1)}catch{return Q(T,"error"),!1}}function _e(g){setTimeout(()=>{try{let M=e.querySelector(g);M&&typeof M.focus=="function"&&M.focus()}catch{}},0)}function be(){S=!0,q=u&&u.title||"",K(),_e('.detail-edit__input[data-edit="title"]')}function Re(g){q=g.target.value}function He(){S=!1,q="",K()}function Ke(){ce("edit-text",{id:d,field:"title",value:q},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(M=>{M&&(S=!1,q=""),K()})}function Ce(){C=!0,$=u&&u.description||"",K(),_e('.detail-edit__textarea[data-edit="description"]')}function et(g){$=g.target.value}function we(){C=!1,$="",K()}function p(){ce("edit-text",{id:d,field:"description",value:$},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(M=>{M&&(C=!1,$=""),K()})}function k(g,M,T,V){if(g.key==="Escape"){g.stopPropagation(),T();return}g.key==="Enter"&&(!V||g.ctrlKey||g.metaKey)&&(g.preventDefault(),M())}function D(g){let M=g.target.value;ce("update-status",{id:d,status:M},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>K())}function oe(g){let M=Number(g.target.value);ce("update-priority",{id:d,priority:M},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>K())}function de(g){Y=g.target.value}function ge(){let g=Y.trim();g.length!==0&&ce("label-add",{id:d,label:g},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(M=>{M&&(Y=""),K()})}function ie(g){if(g.key==="Escape"){g.stopPropagation(),Y="",K();return}g.key==="Enter"&&(g.preventDefault(),ge())}function ue(g){ce("label-remove",{id:d,label:g},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>K())}let Me={onCopyPath:nt,onOpenDoc:_t},ot={onChange:F,onImplTargetChange:W};function bt(g){return typeof g=="string"?g:g&&typeof g=="object"?String(g.id||g.to||g.issue_id||g.depends_on||""):""}function at(g){switch(g&&typeof g=="object"?String(g.dependency_type||g.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function mt(g){let T=(Array.isArray(g.dependencies)?g.dependencies:[]).map(V=>({id:bt(V),icon:at(V)})).filter(V=>V.id.length>0);return c`
      <div class="detail-section-label">의존성</div>
      ${T.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${T.map(V=>o?c`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(V.id)}
                  >
                    ${V.icon?`${V.icon} `:""}${V.id}
                  </button>`:c`<span class="detail-dep"
                    >${V.icon?`${V.icon} `:""}${V.id}</span
                  >`)}
          </div>`}
    `}function Rt(g){let M=g.metadata||{},T=g.workflow||{},V=T.stages||{},ke=V.spec&&V.spec.stale,Ue=V.impl&&V.impl.stale,ct=V.plan||null,Fe=T.route_source==="derived",Gt=T.route||M.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${Fe?" detail-kv__v--derived":""}"
          title=${Fe?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${Fe?"unset":Gt}</span
        >
      </div>
      ${T.route!=="quick_fix"||Object.hasOwn(M,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${M.spec_review||"\uC5C6\uC74C"}${ke?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${T.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${ct?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${ct?.approval_receipt||"\uC5C6\uC74C"}${ct?.approval_state==="stale"?" \xB7 stale":ct?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${T.route!=="quick_fix"||Object.hasOwn(M,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${M.impl_review||"\uC5C6\uC74C"}${Ue?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${M.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${M.pr_url}</span>
          </div>`:""}
    `}let Mt={route:["quick_fix","spec_backed","full_plan"]};async function Tt(g,M){let T=M.target.value;if(g==="route"&&u&&u.metadata&&u.metadata.route==="full_plan"&&T!=="full_plan"&&!window.confirm(`full_plan \u2192 ${T||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){K();return}await ce("update-workflow-meta",{id:d,key:g,value:T},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),K()}function It(g){let M=g.metadata||{};return c` ${((V,ke)=>{let Ue=Mt[V],ct=typeof M[V]=="string"?M[V]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${V}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${V}
          data-edit=${`wfmeta-${V}`}
          @change=${Fe=>Tt(V,Fe)}
        >
          <option value="" ?selected=${!Ue.includes(ct)}>
            ${ke}
          </option>
          ${Ue.map(Fe=>c`<option value=${Fe} ?selected=${ct===Fe}>${Fe}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function H(g,M){return S?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${q}
            @input=${Re}
            @keydown=${T=>k(T,Ke,He,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${Ke}
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
        <h2 class="detail-overlay__title">${g}</h2>
        ${ht(M).map(T=>c`<span class="detail-usage-total" title=${T.tooltip}
              >${T.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${be}
        >
          ✎
        </button>
      </div>
    `}function h(g){let M=vt(g.created_at),T=vt(g.updated_at);return!M&&!T?c``:c`
      ${M?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${M}</span>
          </div>`:""}
      ${T?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${T}</span>
          </div>`:""}
    `}function z(g,M){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${D}
        >
          ${Gu.map(T=>c`<option value=${T} ?selected=${T===g}>${T}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${oe}
        >
          ${Yu.map(T=>c`<option value=${String(T)} ?selected=${T===M}>
                P${T}
              </option>`)}
        </select>
      </div>
    `}function _(g){return c`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${C?"":c`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${Ce}
            >
              ✎
            </button>`}
      </div>
      ${C?c`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${$}
              @input=${et}
              @keydown=${M=>k(M,p,we,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${p}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${we}
              >
                취소
              </button>
            </div>
          </div>`:c`<div class="detail-overlay__desc">
            ${g||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function y(g){let M=typeof g.notes=="string"?g.notes:"";return M.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${M}</div>
    `}function ee(g){let M=Array.isArray(g.labels)?g.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${M.map(T=>c`<span class="detail-label-chip"
              >${T}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${T}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+T}
                @click=${()=>ue(T)}
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
            @input=${de}
            @keydown=${ie}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${ge}
          >
            추가
          </button>
        </span>
      </div>
    `}function se(){if(!d)return c``;let g=u||{},M=String(g.id||d),T=g.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",V=Ge(),ke=g.status||"open",Ue=typeof g.priority=="number"?Math.max(0,Math.min(4,g.priority)):"",ct=g.description||"",Fe={...g,metadata:{...g.metadata||{},...f}};return c`
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
            @click=${st}
          >
            ${M}
          </button>
          ${H(T,V)}
          ${z(ke,Ue)} ${h(g)}
          ${_(ct)}
          ${wi(L,fe,{expanded:ae,draft:R,sending:pe,error:B})}
          ${y(g)} ${ee(g)} ${mt(g)}
          ${Rt(g)} ${It(g)}
          ${hi(g,Me)}
          ${At()}
          ${Ei(Fe,ot,I(),X(),G())}
          ${Mi({expanded:j,loading:te,error:me,data:Ie},{onToggle:Je})}
          ${Di(Ae(),w,{total:V,expanded:qe})}
        </div>
      </div>
    `}function K(){Be(se(),e)}return{load(g){g!==d&&(f={},v="",J(),ye(),ve()),d=g,u=null,Te()},clear(){d=null,u=null,f={},v="",E=!1,J(),ye(),ve(),Le.close(),he.close(),Be(c``,e)},destroy(){ut&&(ut(),ut=null),lt&&(lt(),lt=null),pt&&(pt(),pt=null),document.removeEventListener("keydown",yt),Le.destroy(),xe.parentNode&&xe.parentNode.removeChild(xe),he.destroy(),Z.parentNode&&Z.parentNode.removeChild(Z),d=null,u=null,v="",E=!1,ye(),ve(),Be(c``,e)}}}var Vu=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function Ni(e,t){return $s(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function Ku(e,t,r){if(!r)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let n=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:n,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:n}}function qi(e,t){let{policyStore:r,transport:n,labelOptions:s}=t,o=document.createElement("dialog");o.id="display-settings-dialog",o.className="display-settings",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),e.appendChild(o);let a="";async function i(x){let B=r.get();if(B)try{let R=await n("display-policy-set",{expected_revision:B.revision,policy:x(B)});l(R),R&&R.conflict&&R.policy&&(R=await n("display-policy-set",{expected_revision:R.policy.revision,policy:x(R.policy)}),l(R)),R&&R.conflict&&Q("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{Q("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function l(x){x&&x.policy&&typeof x.policy=="object"&&r.set(x.policy)}function d(x){let B=r.get();if(!B)return;let R=Ni(x,B)!=="shown";i(pe=>Ku(x,pe,R))}function u(){let x=a.trim();x.length!==0&&(a="",i(B=>B.hidden_prefixes.includes(x)?{hidden_prefixes:B.hidden_prefixes}:{hidden_prefixes:[...B.hidden_prefixes,x]}),q())}function f(x){i(B=>({hidden_prefixes:B.hidden_prefixes.filter(R=>R!==x)}))}function v(x){let B=r.get();if(!B)return;let R=B.chips[x]===!1;i(()=>({chips:{[x]:R}}))}function E(x){let B=s();return c`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">라벨 표시</h3>
        <p class="display-settings__hint">
          라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을
          누르면 그 라벨만 예외로 다시 표시됩니다.
        </p>
        ${B.length===0?c`<div class="display-settings__empty">라벨 없음</div>`:c`<div class="display-settings__pills">
              ${B.map(R=>{let pe=Ni(R,x);return c`<button
                  type="button"
                  class=${`display-settings__pill display-settings__pill--${pe}`}
                  data-label=${R}
                  data-state=${pe}
                  @click=${()=>d(R)}
                >
                  ${R}
                </button>`})}
            </div>`}
      </section>
    `}function S(x){return c`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">숨김 prefix</h3>
        <div class="display-settings__prefixes">
          ${x.hidden_prefixes.map(B=>c`<span class="display-settings__prefix">
                ${B}
                <button
                  type="button"
                  class="display-settings__prefix-remove"
                  aria-label=${`${B} \uADDC\uCE59 \uC81C\uAC70`}
                  @click=${()=>f(B)}
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
            @input=${B=>{a=String(B.target.value||"")}}
          />
          <button type="button" @click=${u}>추가</button>
        </div>
      </section>
    `}function C(x){return c`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">카드 표시 요소</h3>
        <div class="display-settings__toggles">
          ${Vu.map(([B,R])=>c`<label class="display-settings__toggle">
                <input
                  type="checkbox"
                  data-chip=${B}
                  .checked=${x.chips[B]!==!1}
                  @change=${()=>v(B)}
                />
                <span>${R}</span>
              </label>`)}
        </div>
      </section>
    `}function q(){let x=r.get();Be(c`
        <div class="display-settings__container">
          <header class="display-settings__header">
            <div class="display-settings__title">표시 설정</div>
            <button
              type="button"
              class="display-settings__close"
              aria-label="닫기"
              @click=${O}
            >
              ×
            </button>
          </header>
          <div class="display-settings__body">
            ${x?c`${E(x)} ${S(x)}
                ${C(x)}`:c`<div class="display-settings__empty">
                  표시 정책을 불러오는 중…
                </div>`}
          </div>
        </div>
      `,o)}let $=!1,Y=()=>{$=!1};o.addEventListener("close",Y),o.addEventListener("cancel",Y);let J=null;r.subscribe&&(J=r.subscribe(()=>{$&&q()}));function L(){$||(a="",$=!0,q(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function O(){$&&($=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:L,close:O,destroy(){$=!1,o.removeEventListener("close",Y),o.removeEventListener("cancel",Y),J&&(J(),J=null),o.remove()}}}function Fi(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let r=t.querySelector("#fatal-error-title"),n=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),i=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},l=(d,u,f="")=>{r&&(r.textContent=d||"Unexpected Error"),n&&(n.textContent=u||"An unrecoverable error occurred.");let v=typeof f=="string"?f.trim():"";if(s&&(v.length>0?(s.textContent=v,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>i()),t.addEventListener("cancel",d=>{d.preventDefault(),i()}),{open:l,close:i,getElement(){return t}}}function Bi(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";if(e<6e4)return`${Math.round(e/1e3)}\uCD08`;let t=e/6e4;return`${Number.isInteger(t)?t:Math.round(t*10)/10}\uBD84`}function Ui(e){return Array.isArray(e)?e.filter(t=>typeof t=="string").join(" "):""}var Zu={deployed:{modifier:"ok",label:"\uC131\uACF5"},launched:{modifier:"launched",label:"\uBC1C\uC0AC\uB428 \xB7 \uACB0\uACFC \uBBF8\uAD00\uCE21"},failed:{modifier:"fail",label:"\uC2E4\uD328"}},ji=160;function Xu(e){return e.length>ji?`${e.slice(0,ji)}\u2026`:e}function Qn(e,t){let{queueStore:r,presetStore:n,transport:s,getWorkspacePath:o}=t,a=document.createElement("dialog");a.id="worker-exec-defaults-dialog",a.className="exec-defaults",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),e.appendChild(a);let i=null,l=!1;function d(){return r&&r.get()||{revision:0,exec_defaults:{}}}function u(){let m=d();return typeof m.revision=="number"?m.revision:0}function f(){let m=n?n.get():null;return!m||typeof m.revision!="number"?null:{revision:m.revision,presets:Array.isArray(m.presets)?m.presets:[]}}function v(m){n&&m&&typeof m.revision=="number"&&Array.isArray(m.presets)&&n.set({revision:m.revision,presets:m.presets})}function E(m){m&&m.queue&&r&&r.set(m.queue)}function S(){return d().runner_catalog??null}let C=null;function q(){if(C!==null)return C;let m=d().default_exec_preset_id;return typeof m=="string"&&m.length>0?m:null}async function $(m){if(!s)return;let A=f();if(!A)return;C=m||"";let w=O(m);if(re(),!w.viable){Q(w.missing?"\uC120\uD0DD\uD55C \uD504\uB9AC\uC14B\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC5B4 \uC800\uC7A5\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.":"\uBE44\uD638\uD658 \uD504\uB9AC\uC14B\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8\uAC12\uC73C\uB85C \uC800\uC7A5\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.","error",4e3);return}try{let I=await s("worker-queue-set-default-exec-preset",{preset_id:m||null,expected_queue_revision:u(),expected_preset_revision:A.revision});if(E(I),I&&I.presets&&n&&n.set(I.presets),I&&I.conflict){Q("\uAE30\uBCF8 \uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uC120\uD0DD\uC744 \uAC80\uD1A0\uD55C \uB4A4 \uB2E4\uC2DC \uC800\uC7A5\uD558\uC138\uC694.","error",4e3);return}if(I&&I.applied){C=null,re();return}Q("\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8 \uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}catch{Q("\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8 \uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function Y(m){i={id:m.id,name:m.name,settings:{...m.settings||{}}},B(),l=!1,re()}function J(){i={id:null,name:"",settings:{}},l=!1,re()}function L(m){let A=m&&m.settings&&typeof m.settings=="object"?m.settings:{},w=I=>typeof A[I]=="string"?A[I]:I==="impl_runtime"&&typeof A.impl_model=="string"&&rr(S(),A.impl_model)||"";return Ur({selectedOf:w,effectiveOf:w,runner_catalog:S()}).some(I=>I.groups.some(G=>G.options.some(X=>X.value===I.selected&&X.label.endsWith("(\uBE44\uD638\uD658)"))))}function O(m){if(!m)return{viable:!0,missing:!1,incompatible:!1,preset:null};let w=f()?.presets.find(G=>G.id===m);if(!w||w.migration_pending===!0)return{viable:!1,missing:!0,incompatible:!1,preset:null};let I=w.compatible===!1||L(w);return{viable:!I,missing:!1,incompatible:I,preset:w}}function x(){let m=i?.settings.orchestration_model;return typeof m!="string"?null:rr(S(),m)}function B(){if(!i)return;let m=Xn({impl_runtime:i.settings.impl_runtime||"",impl_model:i.settings.impl_model||"",impl_effort:i.settings.impl_effort||""},S(),x());for(let A of["impl_runtime","impl_model","impl_effort"])m[A]?i.settings[A]=m[A]:delete i.settings[A]}function R(m){let A=m&&m.settings&&typeof m.settings=="object"?m.settings:{},w=Br.filter(G=>typeof A[G]=="string").length,I=Br.filter(G=>typeof A[G]=="string").map(G=>`${Zs[G]?.title||G}: ${A[G]}`);return{count:`${w}/12 \uC9C0\uC815`,choices:I.length>0?I.join(" \xB7 "):"\uBAA8\uB4E0 \uD56D\uBAA9 \uAE30\uBCF8\uAC12"}}async function pe(m){if(!s||!window.confirm(`\u201C${m.name}\u201D \uD504\uB9AC\uC14B\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694? \uC774\uBBF8 \uC801\uC6A9\uB41C \uC774\uC288\uB294 \uBCC0\uACBD\uB418\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.`))return;let A=f();if(A)try{let w=await s("exec-preset-delete",{expected_revision:A.revision,id:m.id});v(w),w&&w.conflict&&Q("\uD504\uB9AC\uC14B\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694.","error",4e3)}catch{Q("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328","error",4e3)}}async function $e(m=!1){if(!s||!i)return;let A=f();if(!A)return;let w=m||i.id===null,I={expected_revision:A.revision,...w?{}:{id:i.id},name:i.name,settings:{...i.settings}};try{let G=await s(w?"exec-preset-create":"exec-preset-update",I);if(v(G),G&&G.conflict){l=!0,re();return}if(G&&G.applied){i=null,l=!1,re();return}Q("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}catch{Q("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function ae(m){return c`<div class="exec-defaults__row exec-preset-editor__row">
      <span class="exec-defaults__k">${Qs(m.key)}</span>
      <select
        class="exec-defaults__sel"
        data-preset-key=${m.key}
        ?disabled=${m.disabled}
        @change=${A=>{if(!i)return;let w=A.target.value;w?i.settings[m.key]=w:delete i.settings[m.key],(m.key==="impl_runtime"||m.key==="impl_model"||m.key==="impl_effort"||m.key==="orchestration_model")&&B(),l=!1,re()}}
      >
        ${Zn(m.groups,m.selected,Xs[m.key]||"(\uAE30\uBCF8)")}
      </select>
    </div>`}function ye(){if(!i)return"";let m=G=>typeof i?.settings[G]=="string"?i.settings[G]:"",A=Ur({selectedOf:m,effectiveOf:m,runner_catalog:S(),controller_runtime:x()}),w=f(),I=i.id!==null&&w!==null&&!w.presets.some(G=>G.id===i?.id);return c`<div class="exec-preset-editor" data-preset-editor>
      <label class="exec-preset-editor__name">
        프리셋 이름
        <input
          type="text"
          value=${i.name}
          data-preset-name
          @input=${G=>{i&&(i.name=G.target.value,l=!1)}}
        />
      </label>
      ${l?c`<p class="exec-preset-editor__conflict" data-preset-conflict>
            다른 곳에서 변경됨 — 최신 목록을 확인한 뒤 다시 저장하세요.
          </p>`:""}
      ${I?c`<p class="exec-preset-editor__conflict">
            편집하던 프리셋이 다른 곳에서 삭제됐습니다.
          </p>`:""}
      ${A.map(ae)}
      <div class="exec-preset-editor__actions">
        ${I?c`<button
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
          @click=${()=>{i=null,l=!1,re()}}
        >
          취소
        </button>
      </div>
    </div>`}function De(){let m=f(),A=m?m.presets.filter(w=>w?.migration_pending!==!0):[];return c`<section class="exec-presets" data-exec-presets>
      <div class="exec-presets__heading">
        <h3>공용 실행 프리셋</h3>
        <button type="button" data-preset-new @click=${J}>
          + 새 프리셋
        </button>
      </div>
      <p class="exec-defaults__hint">
        모든 워크스페이스에서 공유하며, 이슈에 적용하면 값이 복사됩니다.
      </p>
      ${m===null?c`<p class="exec-presets__empty">프리셋을 불러오는 중…</p>`:A.length===0?c`<p class="exec-presets__empty">
              아직 공용 프리셋이 없습니다.
            </p>`:A.map(w=>{let I=R(w),G=typeof w.reference_count=="number",X=G?w.reference_count:null,ne=Array.isArray(w.reference_summary)?w.reference_summary.map(Ee=>Ee?.display_name||Ee?.workspace_key).filter(Boolean).join(", "):"";return c`<article
                class="exec-preset-card"
                data-preset-id=${w.id}
              >
                <div class="exec-preset-card__main">
                  <strong>${w.name}</strong>
                  <span>${I.count}</span>
                  <span data-preset-references=${w.id}
                    >${G?`\uCC38\uC870 ${X}\uAC1C`:"\uCC38\uC870 \uD655\uC778 \uBD88\uAC00"}</span
                  >
                  ${L(w)?c`<span data-preset-incompatible>비호환</span>`:""}
                  <small>${I.choices}</small>
                  ${ne?c`<small data-preset-impact=${w.id}
                        >업데이트 영향: ${ne}</small
                      >`:""}
                </div>
                <div class="exec-preset-card__actions">
                  <button
                    type="button"
                    data-preset-edit=${w.id}
                    @click=${()=>Y(w)}
                  >
                    편집
                  </button>
                  <button
                    type="button"
                    data-preset-delete=${w.id}
                    ?disabled=${X===null||X>0||w.reference_scan_complete===!1}
                    title=${X===null?"\uCC38\uC870 \uC218\uB97C \uD655\uC778\uD560 \uC218 \uC5C6\uC5B4 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":X>0?"\uCC38\uC870 \uC911\uC778 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC788\uC5B4 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":w.reference_scan_complete===!1?"\uCC38\uC870 \uC2A4\uCE94\uC774 \uC644\uB8CC\uB418\uC9C0 \uC54A\uC544 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":""}
                    @click=${()=>{pe(w)}}
                  >
                    삭제
                  </button>
                </div>
              </article>`})}
      ${ye()}
    </section>`}function Qe(){let m=f(),A=m?m.presets.filter(ne=>ne?.migration_pending!==!0):[],w=q()||"",I=O(w),G=I.preset,X=G?R(G):null;return c`<section class="exec-defaults__workspace" data-workspace-preset>
      <h3>현재 워크스페이스 기본 프리셋</h3>
      <p class="exec-defaults__hint">
        이 워크스페이스는 프리셋 하나를 참조합니다. 없음은 harness 기본값을
        사용합니다.
      </p>
      <select
        class="exec-defaults__sel"
        data-workspace-preset-select
        aria-label="워크스페이스 기본 프리셋"
        .value=${w}
        ?disabled=${m===null}
        @change=${ne=>{$(ne.target.value)}}
      >
        <option value="" ?selected=${w===""}>
          없음 — harness 기본값
        </option>
        ${w&&I.missing?c`<option value=${w} ?selected=${!0}>
              ${w} (선택한 프리셋 없음)
            </option>`:""}
        ${A.map(ne=>c`<option
              value=${ne.id}
              ?selected=${ne.id===w}
              ?disabled=${ne.compatible===!1}
            >
              ${ne.name}${ne.compatible===!1?" (\uBE44\uD638\uD658)":""}
            </option>`)}
      </select>
      ${G?c`<p data-workspace-preset-summary>
            ${X?.count} · ${X?.choices}
            ${I.incompatible?" \xB7 \uBE44\uD638\uD658":""}
          </p>`:""}
      ${I.missing?c`<p data-workspace-preset-missing>
            선택한 프리셋을 찾을 수 없습니다. 실행이 차단됩니다.
          </p>`:I.incompatible?c`<p data-workspace-preset-incompatible>
              선택한 프리셋이 비호환입니다. 실행이 차단됩니다.
            </p>`:""}
    </section>`}function tt(){let m=d().workspace_info;return m&&typeof m=="object"?m:{}}function Ne(m,A){return c`<span
      class="exec-defaults__vd-badge exec-defaults__vd-badge--${m}"
      >${A}</span
    >`}function Oe(m){let A=m?Ui(m.cmd):"",w=m?Bi(m.timeout_ms):"",I=o&&o()||"<workspace \uACBD\uB85C>";return c`<div class="exec-defaults__vd-group" data-vd="verify">
      <div class="exec-defaults__vd-label">머지 전 검증 (verify)</div>
      ${A?c`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${A}</span>
            ${Ne("config","config")}
            ${w?c`<span class="exec-defaults__vd-meta"
                  >timeout ${w}</span
                >`:""}
          </div>`:c`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            검증 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.verify."${I}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function fe(m){let A=m?Ui(m.cmd):"",w=m?Bi(m.timeout_ms):"",I=w?`timeout ${w} \xB7 verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589`:"verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589",G=o&&o()||"<workspace \uACBD\uB85C>";return c`<div class="exec-defaults__vd-group" data-vd="deploy">
      <div class="exec-defaults__vd-label">머지 후 배포 (deploy)</div>
      ${A?c`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${A}</span>
            ${Ne("config","config")}
            ${m.detached===!0?Ne("detached","detached"):""}
            <span class="exec-defaults__vd-meta">${I}</span>
          </div>`:c`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            배포 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.deploy."${G}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function xe(m){if(!m||typeof m!="object")return"";let A=Zu[String(m.outcome)];if(!A)return"";let w=m.outcome==="failed"&&m.reason?`${A.label} \xB7 ${m.reason}`:A.label,I=[vt(m.at),typeof m.bead_id=="string"?m.bead_id:"",typeof m.base_sha=="string"?m.base_sha.slice(0,7):""].filter(ne=>ne.length>0).join(" \xB7 "),G=typeof m.detail=="string"&&m.detail.length>0?Xu(m.detail):"",X=typeof m.log_path=="string"&&m.log_path.length>0?m.log_path:"";return c`<div class="exec-defaults__vd-group" data-vd="last-deploy">
      <div class="exec-defaults__vd-label">마지막 배포</div>
      <div class="exec-defaults__vd-line">
        ${Ne(A.modifier,w)}
        ${I?c`<span class="exec-defaults__vd-meta">${I}</span>`:""}
      </div>
      ${G?c`<div class="exec-defaults__vd-line" data-vd-part="detail">
            <code class="exec-defaults__vd-cmd">${G}</code>
          </div>`:""}
      ${X?c`<div class="exec-defaults__vd-line" data-vd-part="log-path">
            전체 로그:
            <code class="exec-defaults__vd-cmd">${X}</code>
          </div>`:""}
    </div>`}let Le=!1,Z=!1,he=!1,j=null;async function te(){if(s){Z=!0,he=!1,re();try{let m=await Promise.resolve(s("get-worker-system-prompt",{}));!m||typeof m!="object"||Array.isArray(m)?he=!0:j=m}catch{he=!0}finally{Z=!1,re()}}}function me(){if(Le=!Le,Le&&!j){te();return}re()}function Ie(){return c`<section class="exec-defaults__sp" data-seam="system-prompt">
      <p class="exec-defaults__vd-title">
        워커 시스템 프롬프트
        <span class="exec-defaults__vd-ro">읽기 전용 — 서버가 조립</span>
        <button
          type="button"
          class="exec-defaults__sp-toggle"
          data-seam="system-prompt-toggle"
          aria-expanded=${Le?"true":"false"}
          @click=${me}
        >
          ${Le?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
        </button>
      </p>
      ${Le?P():""}
    </section>`}function P(){let m=qr({loading:Z,error:he});if(m)return m;if(!j)return"";let A=Array.isArray(j.variants)?j.variants:[];return c`<div class="exec-defaults__sp-body">
      ${j.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${j.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${A.map(w=>c`<div class="exec-defaults__sp-variant" data-variant=${w.key}>
            <div class="exec-defaults__sp-cond">${w.condition}</div>
            ${tr(w.label,w.system_prompt)}
          </div>`)}
    </div>`}function N(m){return c`<section class="exec-defaults__vd">
      <p class="exec-defaults__vd-title">
        검증·배포 설정
        <span class="exec-defaults__vd-ro"
          >읽기 전용 — config.toml에서 정의</span
        >
      </p>
      ${Oe(m.verify_cmd)} ${fe(m.deploy_cmd)}
      ${xe(m.last_deploy)}
    </section>`}function re(){if(Be(c`
        <div class="exec-defaults__container">
          <header class="exec-defaults__header">
            <div class="exec-defaults__title">전역 실행 설정</div>
            <button
              type="button"
              class="exec-defaults__close"
              aria-label="닫기"
              @click=${Ye}
            >
              ×
            </button>
          </header>
          <div class="exec-defaults__body">
            ${De()} ${Qe()}
            ${N(tt())}
            ${Ie()}
          </div>
        </div>
      `,a),C!==null){let m=a.querySelector("[data-workspace-preset-select]");m&&(m.value=C)}}let ve=!1,Se=()=>{ve=!1},Je=m=>{m.target===m.currentTarget&&Ye()};a.addEventListener("close",Se),a.addEventListener("cancel",Se),a.addEventListener("click",Je);let Ae=null;r&&r.subscribe&&(Ae=r.subscribe(()=>{ve&&re()}));let Ge=null;n&&n.subscribe&&(Ge=n.subscribe(()=>{ve&&re()}));function qe(){ve||(ve=!0,re(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""))}function Ye(){ve&&(ve=!1,typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:qe,close:Ye,destroy(){ve=!1,a.removeEventListener("close",Se),a.removeEventListener("cancel",Se),a.removeEventListener("click",Je),Ae&&(Ae(),Ae=null),Ge&&(Ge(),Ge=null),a.remove()}}}function jr(e){let t=Ct(e.created_at),r=Ct(e.updated_at);return!t&&!r?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${vt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&r?c`<span>·</span>`:""}${r?c`<span title=${`\uC218\uC815 ${vt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </div>`}function Qu(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function dn(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function Jn(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function Ht(e,t,r={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(u=>u&&u.bead_id===t&&u.phase!=="done").sort((u,f)=>(u.requested_at||0)-(f.requested_at||0)).at(-1),o=typeof r.attempt_id=="string"&&r.attempt_id.length>0?r.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=r.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":r.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":r.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,i=typeof s?.last_error=="string"?s.last_error:null,l=s?Qu(s.phase):null,d=r.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!r.external&&!r.done,enabled:!a&&(!s||!!i),label:i?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(i?`\uD3D0\uAE30 \uC2E4\uD328: ${i} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${l||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:d==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:l,error:i,confirmation:d}}function nr(e){let t=e.discard;if(!t||!t.operation)return"";let r=t.operation,n=r.backup?.path,s=r.original_pr,o=r.revert_pr;return c`<div
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
  </div>`}function ro(e){let t=e.draggable&&!e.done,r=t&&e.lane==="queue",n=Array.isArray(e.badges)?e.badges:[],s=ht(e.usage),o=qt(e.usage),a=e.merge_step||null,i=e.lane==="pr_wait"||!!e.revise_action,l=e.lane==="done"&&!i,d=l?Ct(e.done_at):"",u=e.selectable?c`<input
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
      </button>`:t?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",v=e.worker_serial===!0?c`<span class="worker-mini__serial">머지까지 단독</span>`:e.worker_serial===null?c`<span class="worker-mini__serial worker-mini__serial--unknown"
            >실행 방식 확인 중</span
          >`:"",E=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",S=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,C=c`<span class="worker-mini__title">${e.title}</span>`,q=e.pr_url&&e.pr_number?c`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",$=e.completion_repair_pr_url&&e.completion_repair_pr_number?c`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",Y=n.map(ye=>ye===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${ye}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${ye===e.completion_badge&&e.completion_title||""}
          >${ye}</span
        >`),J=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",L=s.length>0?s.map(ye=>c`<span class="worker-usage" title=${ye.tooltip}
              >${ye.label}</span
            >`):o?c`<span class="worker-usage" title=${Nr(e.usage)}
            >${o}</span
          >`:"",O=a?c`<span class="merge-step"
        >${a.label}<span class="merge-step__n"
          >${a.index}/${a.total}</span
        ></span
      >`:"",x=e.merge_action?c`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",B=e.cancel_action?c`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",R=e.discard,pe=R?.action||e.discard_action?c`<button
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
        </button>`:"",ae=!!(o||a||e.merge_action||e.cancel_action||e.discard_action||R?.operation||e.revise_action);return c`<div
    class="worker-mini${i?" worker-mini--card":""}${e.selected?" worker-mini--selected":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${a?" worker-mini--merging":""}${e.external?" worker-mini--external":""}"
    style=${a?`--progress: ${a.percent}%`:""}
    draggable=${t&&!r?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${l?c`<div class="worker-mini__row1">${E}${S}${C}</div>
          <div class="worker-mini__row2">
            ${L}${d?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${vt(e.done_at)}`}
                  >완료 ${d}</span
                >`:""}${Y}${O}
            <span class="worker-mini__actions"
              >${x}${B}${pe}</span
            >
            ${jr(e)}
          </div>`:i?c`<div class="worker-mini__head">
              ${u}${f}${E}${S}${q}${$}${Y}${v}${J}
            </div>
            <div class="worker-mini__body">${C}</div>
            ${ae?c`<div class="worker-mini__foot">
                  ${L}${O}
                  <span class="worker-mini__actions"
                    >${x}${B}${pe}${$e}</span
                  >
                  ${nr(e)}
                </div>`:""}
            ${jr(e)}`:c`<div class="worker-mini__line">
              ${u}${f}${E}${S}${C}${q}${$}${Y}${v}${J}${L}${O}${x}${B}${pe}
            </div>
            ${nr(e)} ${jr(e)}`}
  </div>`}function Ju(e){let t=e.draggable&&!e.done,r=e.workflow,n=r&&r.chips||{},s=n.route||r&&r.route,o=n.route_source==="derived"||!!(r&&r.route_source==="derived"),a=e.is_quick_fix===!0||!!r&&r.route==="quick_fix",i=typeof e.reason=="string"&&e.reason.startsWith("\u26D4");return c`<div
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
    ${r?Ln(r,e.status):""}
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
    ${jr(e)}
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
                  </div>`:e.items.map(n=>e.lane==="candidate"?Ju(n):ro(n))}
          </div>`}
  </section>`}var zi=160;function Hi(e){return e.length>zi?`${e.slice(0,zi)}\u2026`:e}function ep(e){return!e||!e.reason?"":c`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?c` · <code>${Hi(e.command)}</code>`:""}
  </div>`}function tp(e){return e?c`<details class="worker-banner__tail">
    <summary>출력 tail</summary>
    <pre>${e}</pre>
  </details>`:""}function rp(e){return e?c`<div class="worker-banner__log-path">
    전체 로그: <code>${e}</code>
  </div>`:""}function no(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),r=Math.floor(t/60),n=t%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function Wi(e){let t=Array.isArray(e.cleanupFailures)?e.cleanupFailures:[];return c`<div class="worker-banners">
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
          ${ep(e.failure.cause_detail)}
          ${nr({discard:e.failure.discard})}
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
                <code>${Hi(r.detail)}</code>
              </div>`:""}
          ${rp(r.log_path)} ${tp(r.output_tail)}
        </div>`)}
  </div>`}function np(e,t,r=null){let n=e.failed===!0,s=!!e.paused,o=n?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):s?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?no(t-e.started_at):"\u2014",a=zt(e),i=lr(e),l=ht(e.usage),d=qt(e.usage),u=e.conflict_resolution?s?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,f=e.base_exception||null,v=e.attempt_id&&e.attempt_id===r,E=e.discard?.action?c`<button
        type="button"
        class="rtile__discard"
        data-operation-id=${e.discard.operation?.operation_id||""}
        ?disabled=${!e.discard.enabled}
        title=${e.discard.title}
        aria-label=${e.discard.label}
      >
        ${e.discard.label}
      </button>`:"";return c`<div
    class="rtile${v?" rtile--sel":""}${s?" rtile--paused":""}${n?" rtile--failed":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span class="rtile__dot" aria-hidden="true"></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${i?c`<span class="rtile__resumed" title=${i}>↻</span>`:""}
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
            ${E}
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
            ${E}`}
    </div>
    <div class="rtile__title">${e.title}</div>
    ${e.current_child?c`<div class="rtile__child" title="현재 진행중 child">
          └ ${e.current_child}
        </div>`:""}
    ${a||l.length>0||d||u||f?c`<div class="rtile__meta">
          ${u?c`<span class="worker-mini__badge">${u}</span>`:""}
          ${f?c`<span
                class="worker-mini__badge"
                title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                >${f}</span
              >`:""}
          ${a?c`<span class="rtile__runner">${a}</span>`:""}
          ${l.length>0?l.map(S=>c`<span class="worker-usage" title=${S.tooltip}
                    >${S.label}</span
                  >`):d?c`<span
                  class="worker-usage"
                  title=${Nr(e.usage)}
                  >${d}</span
                >`:""}
        </div>`:""}
    ${jr(e)} ${nr(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일): 큐
         스냅샷에는 페이즈명도 진행률도 없으므로 진행 바는 만들지 않는다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${n||s?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function so(e,t=Date.now(),r=null){let n=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>np(s,t,r))}
  </div>`}function fr(e){return c`<svg
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
  </svg>`}function oo(){return fr(Kt`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function ao(){return fr(Kt`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function Gi(){return fr(Kt`<rect x="4.3" y="4.3" width="7.4" height="7.4" rx="1.2" />`)}function Yi(){return fr(Kt`<path d="M4.4 4.4 11.6 11.6M11.6 4.4 4.4 11.6" />`)}function Vi(){return fr(Kt`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function Ki(){return fr(Kt`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function Zi(){return fr(Kt`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function Xi(){return fr(Kt`<path d="M3 3.6 8.2 8 3 12.4z" />
    <path d="M8.8 3.6 14 8l-5.2 4.4z" />`)}var un=1,sp=6e4,op={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"},ap=new Set(["auto_merge","merged","merge","done"]),Qi={running:3,paused:2,failed:1};function ip(e,t){let r=null,n=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=n&&(n=o,r=s)}return r}function lp(e,t){let r=Object.values(e||{}),n=new Set,s=new Map;for(let a of r)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&n.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of r){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let i=null;if(a.status==="running")i="running";else if(a.status==="paused"&&!n.has(a.attempt_id))i="paused";else if(a.status==="failed"||a.status==="orphaned"){let f=t.get(a.bead_id),v=typeof f=="number"&&f>0&&typeof a.finished_at=="number"&&f>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!v&&typeof a.dismissed_at!="number"&&(i="failed")}if(!i)continue;let l=typeof a.started_at=="number"?a.started_at:null,d=o.get(a.bead_id);if(d){let f=Qi[d.run_state],v=Qi[i];if(f>v||f===v&&(d.started_at??0)>(l??0))continue}let u=typeof a.session_id=="string"&&a.session_id.length>0;o.set(a.bead_id,{attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",run_state:i,started_at:l,last_event_at:typeof a.last_event_at=="number"?a.last_event_at:null,runner:typeof a.runner=="string"?a.runner:null,model:typeof a.model=="string"?a.model:null,effort:typeof a.effort=="string"?a.effort:null,speed:typeof a.speed=="string"?a.speed:null,resumed_from:typeof a.resumed_from=="string"?a.resumed_from:null,continuation_mode:a.continuation_mode==="session"||a.continuation_mode==="fresh"?a.continuation_mode:null,usage:Ot(e,a.bead_id),can_pause:i==="running"&&u,can_resume:i!=="running"&&u&&!n.has(a.attempt_id)})}return o}function Ji(e,t){let r=e[t];if(!r)return"";if(r.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let n=typeof r.reason=="string"?r.reason:"",s=n.indexOf(":");return s>0&&s<n.length-1?`\u26D4 ${n.slice(0,s)} (${n.slice(s+1)})`:`\u26D4 ${n}`}function St(e){return e&&typeof e=="object"?e:{}}function io(e,t,r){let n=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=r&&typeof r.done_since=="number"?r.done_since:void 0,a=new Map;for(let $ of s)$&&typeof $.root_dir=="string"&&a.set($.root_dir,$);let i=[],l=[],d=[],u=[],f=[],v=new Map;for(let $ of n){if(!$||typeof $.root_dir!="string")continue;let Y=$.root_dir,J=$.name||Y,L=a.get(Y),O=L&&typeof L.revision=="number"?L.revision:typeof $.revision=="number"?$.revision:0,x=St($.attempts),B=St($.bead_titles),R=St($.pr_observations),pe=St($.admission),$e=St($.revise_parked),ae=St($.merge_queue_state),ye=St($.cleanup_failed),De=St($.deployment_reconcile||$.reconcile),Qe=St($.discard_operations),tt=Array.isArray($.merge_queue)?$.merge_queue:[],Ne=new Set(tt.filter(j=>j&&typeof j.bead_id=="string").map(j=>j.bead_id)),Oe=new Map(tt.filter(j=>j&&typeof j.bead_id=="string").map(j=>[j.bead_id,j])),fe=Array.isArray($.queue)?$.queue:[],xe=Array.isArray($.done)?$.done:[],Le=new Map;for(let j of xe)j&&typeof j.bead_id=="string"&&typeof j.added_at=="number"&&Le.set(j.bead_id,j.added_at);let Z=j=>({id:j,title:B[j]||j,root_dir:Y,workspace_name:J,expected_revision:O,draggable:!1}),he=new Set;for(let[j,te]of lp(x,Le))he.add(j),l.push({...Z(j),lane:"running",attempt_id:te.attempt_id,run_state:te.run_state,can_pause:te.can_pause,can_resume:te.can_resume,started_at:te.started_at,last_event_at:te.last_event_at,runner:te.runner,model:te.model,effort:te.effort,speed:te.speed,resumed_from:te.resumed_from,continuation_mode:te.continuation_mode,usage:te.usage,discard:Ht(Qe,j,{attempt_id:te.attempt_id}),badges:te.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:te.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:te.run_state==="failed"});for(let j of Array.isArray($.pr_wait)?$.pr_wait:[]){let te=j&&j.bead_id;if(typeof te!="string"||he.has(te))continue;he.add(te);let me=St(R[te]),Ie=St(me.pr),P=me.gate?St(me.gate):null,N=Ne.has(te),re=Oe.get(te)?.continuation_action||null,ve=!!re&&re.continuation===null,Se=ae.active===te,Je=j.external===!0,Ae=ye[te]||null,Ge=St(De[te]),qe=!Ae&&Ge.adapter==="managed"&&Ge.stage==="restarting",Ye=!!P&&P.base_badge==="\uCDA9\uB3CC",m=!!Ae&&!!P&&P.tier==="merged",A=Je&&!!P&&P.tier==="merged",w=Ht(Qe,te,{external:Je,merge_active:Se,merge_queued:N,merged:!!Ae||P?.tier==="merged"}),I=!!w.operation;d.push({...Z(te),lane:"pr_wait",pr_number:typeof Ie.number=="number"?Ie.number:null,pr_url:typeof Ie.url=="string"?Ie.url:void 0,external:Je,usage:Ot(x,te),badges:ve?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:Ae?["\uC815\uB9AC \uC2E4\uD328"]:qe?["\uC815\uB9AC \uC911 \xB7 \uC7AC\uC2DC\uC791"]:[],alert:!!Ae,reason:Ae?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":qe?"\uC815\uB9AC \uC911 \xB7 \uC7AC\uC2DC\uC791":"PR \uB300\uAE30",merge_action:!N||ve,merge_enabled:!I&&(ve||P?.enabled===!0||Ye||m||A),merge_label:ve?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":A||m?"\uC815\uB9AC":Ye&&!m?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:ve?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":I?w.error?`\uD3D0\uAE30 \uC2E4\uD328: ${w.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${w.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:A?"\uBA38\uC9C0\uB428 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uB97C \uC218\uD589\uD569\uB2C8\uB2E4":m?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uC218\uD589\uD569\uB2C8\uB2E4":Ye?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":P?.enabled===!0?`\uBA38\uC9C0 (${P.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${P?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:N&&!ve,cancel_enabled:!Se,continuation_mismatch:re?.mismatch||null,discard:w,discard_action:w.action,discard_enabled:w.enabled,discard_title:w.title})}for(let j=0;j<fe.length;j++){let te=fe[j],me=te&&te.bead_id;if(typeof me!="string"||he.has(me))continue;he.add(me);let Ie=$e[me],P=Ht(Qe,me),N=P.operation?P:null,re={...Z(me),lane:"queue",draggable:!N,discard:N||void 0,reason:Ji(pe,me),queue_position:j+1,queue_index:j,queue_length:fe.length,badges:Ie?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!Ie,revise_action:!!Ie,revise_enabled:!!Ie&&!N,revise_title:Ie?Ie.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Ie.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};u.push(re);let ve=v.get(Y);ve?ve.push(re):v.set(Y,[re])}for(let j of Array.isArray($.runnable)?$.runnable:[]){let te=j&&j.bead_id;typeof te!="string"||he.has(te)||(he.add(te),i.push({...Z(te),title:j.title||B[te]||te,lane:"runnable",draggable:!0,reason:Ji(pe,te),created_at:j.created_at??void 0,updated_at:j.updated_at??void 0,labels:Array.isArray(j.labels)?j.labels:[],spec_reviewer:typeof j.spec_reviewer=="string"?j.spec_reviewer:void 0,plan_state:j.plan_state==="approved"||j.plan_state==="authored"?j.plan_state:"none",workflow:j.route?{route:j.route,chips:{route:j.route}}:null,place_index:fe.length}))}for(let j of xe){let te=j&&j.bead_id;if(typeof te!="string"||he.has(te)||(he.add(te),o!==void 0&&typeof j.added_at=="number"&&j.added_at<o))continue;let me=ip(x,te);f.push({...Z(te),lane:"done",done:!0,usage:Ot(x,te),done_at:typeof j.added_at=="number"?j.added_at:void 0,done_kind:me&&typeof me.done_kind=="string"?me.done_kind:null})}}let E=new Map;s.forEach(($,Y)=>{$&&typeof $.root_dir=="string"&&E.set($.root_dir,Y)});let S=r&&r.running_sort==="repo"?"repo":"started";l.sort(($,Y)=>{if(S==="repo"){let O=E.get($.root_dir)??Number.MAX_SAFE_INTEGER,x=E.get(Y.root_dir)??Number.MAX_SAFE_INTEGER;if(O!==x)return O-x}let J=typeof $.started_at=="number"&&Number.isFinite($.started_at)?$.started_at:null,L=typeof Y.started_at=="number"&&Number.isFinite(Y.started_at)?Y.started_at:null;return J!==null&&L!==null&&J!==L?J-L:J===null&&L!==null?1:J!==null&&L===null?-1:$.id.localeCompare(Y.id)}),f.sort(($,Y)=>(Y.done_at??0)-($.done_at??0));let C=s.length>0?s:n.map($=>({root_dir:$&&$.root_dir,name:$&&$.name,auto_advance:$&&$.auto_advance,auto_merge:$&&$.auto_merge,slots:$&&$.slots,revision:$&&$.revision,exec_defaults:$&&$.exec_defaults,default_exec_preset_id:$&&$.default_exec_preset_id,runner_catalog:$&&$.runner_catalog})),q=[];for(let $ of C)!$||typeof $.root_dir!="string"||q.push({root_dir:$.root_dir,name:$.name||$.root_dir,auto_advance:$.auto_advance===!0,auto_merge:$.auto_merge===!0,slots:typeof $.slots=="number"&&$.slots>=un?$.slots:un,revision:typeof $.revision=="number"?$.revision:0,exec_defaults:St($.exec_defaults),default_exec_preset_id:typeof $.default_exec_preset_id=="string"?$.default_exec_preset_id:null,runner_catalog:St($.runner_catalog),items:v.get($.root_dir)||[]});return{runnable:i,queue:u,queue_groups:q,running:l,pr_wait:d,done:f,automation:{total:q.length,both_on:q.filter($=>$.auto_advance&&$.auto_merge).length}}}function cp(e,t){if(typeof e!="number"||!Number.isFinite(e))return"";let n=t-e<sp;return c`<span
    class="mon-beat${n?" mon-beat--live":""}"
    title=${`\uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${vt(e)}`}
    ><span class="mon-beat__dot" aria-hidden="true"></span>${n?"":c`<span class="mon-beat__age"
          >${Ct(e,t)}</span
        >`}</span
  >`}function pn(e){return c`<div class="mon-c__title">${e.title}</div>`}function fn(e){return c`<span class="mon-c__id" title="클릭하면 상세로 이동"
    >${e.id}</span
  >`}function es(e){return e.workspace_name?c`<span class="mon-c__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:""}function lo(e){let t=ht(e.usage),r=qt(e.usage);return t.length>0?t.map(n=>c`<span class="mon-c__usage" title=${n.tooltip}
          >${n.label}</span
        >`):r?c`<span class="mon-c__usage" title=${Nr(e.usage)}
        >${r}</span
      >`:""}function co(e){return(Array.isArray(e.badges)?e.badges:[]).map(r=>c`<span class="mon-c__badge${e.alert?" mon-c__badge--alert":""}"
        >${r}</span
      >`)}function dp(e){return c`<span class="mon-c__ops">
    ${e.run_state==="running"?c`<button
          type="button"
          class="mon-op mon-op--pause"
          ?disabled=${e.can_pause===!1}
          aria-label="일시정지"
          title="일시정지 — 세션을 끊고 이어하기 가능 상태로 둡니다"
        >
          ${ao()}
        </button>`:c`<button
          type="button"
          class="mon-op mon-op--resume"
          ?disabled=${e.can_resume===!1}
          aria-label="이어하기"
          title="이어하기"
        >
          ${oo()}
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
          ${Yi()}
        </button>`:""}
  </span>`}function up(e,t){let r=typeof e.started_at=="number"?no(t-e.started_at):"";return c`${pn(e)}
    <div class="mon-c__meta">
      ${co(e)}${cp(e.last_event_at,t)}${fn(e)}${es(e)}
      ${zt(e)?c`<span class="mon-c__model">${zt(e)}</span>`:""}
      ${lr(e)?c`<span
            class="rtile__resumed"
            title=${lr(e)}
            >↻</span
          >`:""}
      ${r?c`<span class="mon-live__elapsed">${r}</span>`:""}
      ${lo(e)}${dp(e)}${nr(e)}
    </div>`}function pp(e){let t=e.workflow,n=(t&&t.chips||{}).route||t&&t.route,s=typeof e.spec_reviewer=="string"?e.spec_reviewer:"",o=e.plan_state==="approved"?"plan \u2713":e.plan_state==="authored"?"plan \u270E":"plan \u2013",a=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),i=Ct(e.updated_at);return c`${pn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>${fn(e)}
      ${n?c`<span class="ctl-chip ctl-chip--route">${n}</span>`:""}
      ${s?c`<span
            class="ctl-chip mon-c__review${s==="skipped"?" mon-c__review--dim":""}"
            >spec:${s}</span
          >`:""}
      ${n==="full_plan"?c`<span
            class="ctl-chip mon-c__plan${e.plan_state==="none"?" mon-c__review--dim":""}"
            >${o}</span
          >`:""}
      ${In(e.labels,null).map(l=>c`<span class="ctl-chip ctl-chip--label">${l}</span>`)}
      ${es(e)}
      ${i?c`<span title=${`\uC218\uC815 ${vt(e.updated_at)}`}
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
    </div>`}function fp(e){let t=!!e.discard?.operation;return c`${pn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>
      <span class="mon-live__pos">#${e.queue_position}</span>${fn(e)}
      ${co(e)}
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
    ${nr(e)}
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
        </div>`:""}`}function _p(e){let t=!!(qt(e.usage)||e.merge_action||e.cancel_action||e.discard_action);return c`${pn(e)}
    <div class="mon-c__meta">
      ${fn(e)}${es(e)}
      ${e.pr_url&&e.pr_number?c`<a
            class="mon-c__pr"
            href=${e.pr_url}
            target="_blank"
            rel="noreferrer noopener"
            title="PR 열기"
            >#${e.pr_number} ↗</a
          >`:""}
      ${co(e)}
      ${e.reason?c`<span class="mon-c__reason">${e.reason}</span>`:""}
    </div>
    ${t?c`<div class="mon-c__tail">
          ${lo(e)}
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
          ${nr(e)}
        </div>`:""}`}function mp(e,t){let r=e.done_kind||"",n=r?op[r]||r:"",s=Ct(e.done_at,t);return c`${pn(e)}
    <div class="mon-c__meta">
      ${fn(e)}${es(e)}
      ${n?c`<span
            class="mon-live__kind${ap.has(r)?" mon-live__kind--ok":" mon-live__kind--warn"}"
            >${n}</span
          >`:""}
      ${lo(e)}
      ${s?c`<span title=${`\uC644\uB8CC ${vt(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
    </div>`}function el(e,t){return e.lane==="running"?up(e,t):e.lane==="runnable"?pp(e):e.lane==="queue"?fp(e):e.lane==="pr_wait"?_p(e):mp(e,t)}function tl(e){let t=String(e.revision);return c`<header
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
        ${e.auto_advance?ao():oo()}
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
        ${Vi()}
        <span class="mon-ctl__label">머지</span>
      </button>
      <label class="mon-ctl mon-ctl--slots" title="동시에 실행할 세션 수">
        ${Ki()}
        <span class="mon-ctl__label">슬롯</span>
        <input
          type="number"
          class="mon-slots__input"
          min=${un}
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
        ${Zi()}
        <span class="mon-ctl__label">설정</span>
      </button>
    </span>
  </header>`}function rl(e){let{total:t,both_on:r}=e.automation,n=t>0&&r===t,s=e.running_sort==="repo"?"repo":"started",o=jt.find(i=>i.value===e.done_range)?.label||"",a=Array.isArray(e.token_total)?e.token_total:e.token_total?[{label:e.token_total,tooltip:e.token_tooltip}]:[];return c`<div class="mon-top">
    <button
      type="button"
      class="mon-auto-all${n?" is-active":""}"
      data-on=${n?"false":"true"}
      aria-pressed=${n?"true":"false"}
      ?disabled=${t===0}
      title=${n?"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4 (\uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4)":"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
    >
      ${n?Gi():Xi()}
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
        ${jt.map(i=>c`<option
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
  </div>`}function nl(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function sl(e){let t=(Array.isArray(e)?e:[]).map(i=>i&&i.usage).filter(i=>i&&typeof i=="object"&&"providers"in i);if(t.length>0)return ht(Mn(t));let r={};for(let i of Qt)r[i]=0;let n=!1,s=0,o=0,a=0;for(let i of Array.isArray(e)?e:[]){let l=i&&i.usage;if(l&&typeof l=="object"){let d=!1;for(let u of Qt){let f=l[u];typeof f=="number"&&Number.isFinite(f)&&(r[u]+=f,n=!0,d=!0)}if(d){o+=1;let u=l.total_cost_usd;typeof u=="number"&&Number.isFinite(u)&&(s+=u,a+=1)}}}return o>0&&a===o&&(r.total_cost_usd=s),n?qt(r):null}var al="bdui.monitor.done-range",il="bdui.monitor.running_sort";function gp(){try{let e=window.localStorage.getItem(al);return Zt(e)?e:Lt}catch{return Lt}}function hp(e){try{window.localStorage.setItem(al,e)}catch{}}function bp(){try{return window.localStorage.getItem(il)==="repo"?"repo":"started"}catch{return"started"}}function vp(e){try{window.localStorage.setItem(il,e)}catch{}}var ll="tab:monitor:pipeline",yp=1e3,wp=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}];function ol(e,t){let r=(e.lane==="runnable"||e.lane==="queue")&&e.draggable!==!1;return c`<div
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
    ${el(e,t)}
  </div>`}function cl(e,t){let r=rt("views:monitor"),n=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.execPresetStore,i=t.getWorkspacePath,l=t.switchWorkspace,d=t.now||(()=>Date.now()),u=t.confirm||(m=>typeof globalThis.confirm!="function"||globalThis.confirm(m)),f=gp(),v=bp();function E(){let m=jt.find(A=>A.value===f);return m?m.label:""}let S=document.createElement("div");S.className="mon",e.appendChild(S);let C=io(null,null),q=null,$=new Map,Y=new Set;function J(m){return C.queue_groups.find(A=>A.root_dir===m)||null}let O=Qn(e,{queueStore:{get(){if(!q)return{revision:0,exec_defaults:{},default_exec_preset_id:null};let m=$.get(q);if(m)return m;let A=J(q),w=s&&s.get?s.get():null,I=(Array.isArray(w)?w:[]).find(G=>G&&G.root_dir===q);return{revision:A?A.revision:0,exec_defaults:A?A.exec_defaults:{},default_exec_preset_id:A?A.default_exec_preset_id:null,runner_catalog:A?A.runner_catalog:null,workspace_info:I?I.workspace_info:void 0}},set(m){q&&$.set(q,m);for(let A of Array.from(Y))A()},subscribe(m){return Y.add(m),()=>Y.delete(m)}},presetStore:a,transport:o?(m,A)=>o(m,m==="worker-queue-set-default-exec-preset"||m==="get-worker-system-prompt"?{...A||{},root_dir:q}:A):void 0,getWorkspacePath:()=>q||void 0}),x=null,B=null;async function R(m,A,w,I,G=!0){if(!o||!w)return null;let X=await o(m,{...A,root_dir:w,expected_revision:I});if(X&&X.conflict&&G){X.queue&&$.set(w,X.queue);let ne=X.queue&&typeof X.queue.revision=="number"?X.queue.revision:I;X=await o(m,{...A,root_dir:w,expected_revision:ne})}return X&&X.queue&&w&&$.set(w,X.queue),X}function pe(m,A){let w=$.get(m),I=s&&s.get?s.get():null,G=(Array.isArray(I)?I:[]).find(ne=>ne?.root_dir===m);return(w||G)?.merge_queue?.find(ne=>ne.bead_id===A)?.continuation_action}async function $e(m,A,w,I){let G=await R(m,A,w,I),X=$.get(w)?.revision??G?.queue?.revision??I;return Xt(G,(ne,Ee)=>R(m,{...A,continuation:ne,decision_token:Ee},w,X,!1),{refresh:ne=>R(m,A,w,ne?.queue?.revision??$.get(w)?.revision??X,!1)})}async function ae(m,A,w,I){let G=await Xt({continuation_mismatch:I},(ne,Ee)=>R("worker-merge-queue-add",{bead_id:A,continuation:ne,decision_token:Ee},m,w,!1)),X=G?.queue?.merge_queue?.find(ne=>ne.bead_id===A)?.continuation_action;G?.applied!==!0&&X?.continuation===null&&X.mismatch&&await ae(m,A,G.queue.revision,X.mismatch)}async function ye(m,A,w){let I=await R("worker-discard",m,A,w);if(I&&I.discarded===!0){Q(Jn(I),"success",5e3);return}if(I&&I.reason){Q(`\uD3D0\uAE30 \uC2E4\uD328: ${I.reason}`,"error");return}if(I&&I.accepted&&I.pending==="merged_revert"){Q("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(I&&I.accepted){Q(`\uD3D0\uAE30 \uC9C4\uD589: ${I.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}I&&!I.conflict&&Q("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function De(m,A,w){return!o||!w?null:await o(m,{...A,root_dir:w})}async function Qe(m){if(!o||!m&&!u("\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB055\uB2C8\uB2E4. \uAC01 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uD568\uAED8 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?"))return;let A=await o("monitor-auto-toggle",{on:m}),w=A&&Array.isArray(A.failed)?A.failed:[];w.length>0&&Q(`\uC790\uB3D9\uD654 ${m?"\uCF1C\uAE30":"\uB044\uAE30"} \uC77C\uBD80 \uC2E4\uD328: ${w.map(I=>I.root_dir).join(", ")}`,"error",3200)}async function tt(){let m=new Map;for(let A of C.pr_wait)m.has(A.root_dir)||m.set(A.root_dir,A.expected_revision);for(let[A,w]of m)await R("worker-merge-queue-add-all",{},A,w)}let Ne=null,Oe=!1,fe=null;function xe(){fe!==null&&clearTimeout(fe),fe=setTimeout(()=>{fe=null,Oe=!1},0)}function Le(m){let A=m.target;return typeof A?.closest=="function"?A.closest(".mon-group"):null}function Z(m){let A=Le(m);return!A||!Ne?null:(A.getAttribute("data-root-dir")||"")===Ne.root_dir?A:null}function he(){for(let m of Array.from(S.querySelectorAll(".mon-group--drag-over")))m.classList.remove("mon-group--drag-over")}function j(m){let A=m.target,w=typeof A?.closest=="function"?A.closest('.mon-card[draggable="true"]'):null;if(w){Ne={bead_id:w.getAttribute("data-issue-id")||"",lane:w.getAttribute("data-lane")||"",root_dir:w.getAttribute("data-root-dir")||"",revision:Number(w.getAttribute("data-revision")||0)||0,queue_index:Number(w.getAttribute("data-queue-index")),queue_length:Number(w.getAttribute("data-queue-length")),place_index:Number(w.getAttribute("data-place-index"))},Oe=!0;try{m.dataTransfer?.setData("text/plain",Ne.bead_id),m.dataTransfer&&(m.dataTransfer.effectAllowed="move")}catch{}}}function te(m){let A=Z(m);A&&(m.preventDefault(),m.dataTransfer&&(m.dataTransfer.dropEffect="move"),A.classList.add("mon-group--drag-over"))}function me(m){Le(m)?.classList.remove("mon-group--drag-over")}function Ie(){Ne=null,he(),xe()}function P(m){let A=Z(m),w=Ne;if(Ne=null,he(),!A||!w||!w.bead_id)return;m.preventDefault();let I=m.target,G=typeof I?.closest=="function"?I.closest('.mon-card[data-lane="queue"]'):null,X=G&&A.contains(G)?Number(G.getAttribute("data-queue-index")):NaN;if(w.lane==="runnable"){let Ve=Number.isFinite(X)?X:w.place_index;if(!Number.isFinite(Ve))return;R("worker-queue-place",{bead_id:w.bead_id,index:Ve},w.root_dir,w.revision);return}if(w.lane!=="queue"||G&&G.getAttribute("data-issue-id")===w.bead_id)return;let ne=w.queue_index,Ee=Number.isFinite(X)?ne>X?X:X-1:w.queue_length-1;!Number.isFinite(Ee)||Ee<0||Ee===ne||R("worker-queue-reorder",{bead_id:w.bead_id,to_index:Ee},w.root_dir,w.revision)}function N(m){let A={runnable:C.runnable,queue:C.queue,running:C.running,pr_wait:C.pr_wait,done:C.done};return c`${rl({automation:C.automation,counts:{running:C.running.length,queue:C.queue.length,pr_wait:C.pr_wait.length},running_sort:v,done_range:f,token_total:sl(C.done),token_tooltip:nl(E())})}
      <div class="worker-lanes mon-lanes">
        ${wp.map(w=>{let I=A[w.lane],G=w.lane==="queue"?C.queue_groups.length>0?c`${C.queue_groups.map(X=>c`<div
                        class="mon-group"
                        data-root-dir=${X.root_dir}
                      >
                        ${tl(X)}
                        <div class="mon-group__list">
                          ${X.items.map(ne=>ol(ne,m))}
                        </div>
                      </div>`)}`:void 0:I.length>0?c`${I.map(X=>ol(X,m))}`:void 0;return Wt({id:`monitor-${w.lane}`,lane:w.pane,title:w.lane==="done"?`\uC644\uB8CC\xB7${E()}`:w.title,items:I,empty:w.empty,body:G,live:w.lane==="running"&&I.length>0,header_control:w.lane==="pr_wait"&&I.length>0?c`<button
                    type="button"
                    class="mon-lane-op mon-merge-all"
                    title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
                  >
                    일괄 머지
                  </button>`:""})})}
      </div>`}function re(){let m=s&&s.get?s.get():null,A=s&&s.getWorkspacesState?s.getWorkspacesState():[],w=d();C=io(m,A,{done_since:Rr(f,w),running_sort:v}),Be(N(w),S)}function ve(m,A){let w=i?i():void 0;if(!A||!w||A===w||!l){n(m);return}l(A).then(()=>{n(m)}).catch(I=>{r("workspace switch for %s failed: %o",A,I)})}function Se(m){return{root_dir:m.getAttribute("data-root-dir")||"",revision:Number(m.getAttribute("data-revision")||0)||0}}function Je(m,A){let{root_dir:w,revision:I}=Se(m),G=m.getAttribute("data-issue-id")||"",X=A.dataset.attemptId||m.getAttribute("data-attempt-id")||"",ne=A.classList;if(ne.contains("worker-card__place")){R("worker-queue-place",{bead_id:G,index:Number(m.getAttribute("data-place-index")||0)||0},w,I);return}if(ne.contains("mon-op--up")||ne.contains("mon-op--down")){let Ee=Number(m.getAttribute("data-queue-index")||0)||0,Ve=ne.contains("mon-op--up")?Ee-1:Ee+1;if(Ve<0)return;R("worker-queue-reorder",{bead_id:G,to_index:Ve},w,I);return}if(ne.contains("mon-op--remove")){R("worker-queue-remove",{bead_id:G},w,I);return}if(ne.contains("mon-op--pause")){De("worker-attempt-pause",{attempt_id:X},w);return}if(ne.contains("mon-op--discard")){if(!u(dn(G,"unmerged")))return;ye({bead_id:G,...X?{attempt_id:X}:{},...A.dataset.operationId?{operation_id:A.dataset.operationId}:{}},w,I);return}if(ne.contains("mon-op--resume")){$e("worker-attempt-resume",{attempt_id:X},w,I);return}if(ne.contains("mon-op--dismiss")){R("worker-attempt-dismiss",{attempt_id:X},w,I);return}if(ne.contains("worker-mini__merge")){let Ee=pe(w,G);Ee?.mismatch&&Ee.continuation===null?ae(w,G,I,Ee.mismatch):R("worker-merge-queue-add",{bead_id:G},w,I);return}if(ne.contains("worker-mini__merge-cancel")){R("worker-merge-queue-remove",{bead_id:G},w,I);return}if(ne.contains("worker-mini__discard")){let Ee=A.dataset.discardMode==="merged"?"merged":"unmerged";if(!u(dn(G,Ee)))return;ye({bead_id:G,...X?{attempt_id:X}:{},...A.dataset.operationId?{operation_id:A.dataset.operationId}:{}},w,I);return}if(ne.contains("worker-mini__revise-fix")){$e("worker-revise-fix",{bead_id:G},w,I);return}ne.contains("worker-mini__revise-approve")&&R("worker-revise-approve",{bead_id:G},w,I)}function Ae(m){let A=Oe;Oe=!1;let w=m.target;if(!w||typeof w.closest!="function"||w.closest("dialog")||w.closest("a"))return;let I=w.closest(".mon-running-sort");if(I){m.preventDefault(),v=I.getAttribute("data-sort")==="repo"?"repo":"started",vp(v),re();return}let G=w.closest(".mon-auto-all");if(G){m.preventDefault(),Qe(G.getAttribute("data-on")==="true");return}if(w.closest(".mon-merge-all")){m.preventDefault(),tt();return}let ne=w.closest(".mon-ctl--advance");if(ne){m.preventDefault();let{root_dir:ut,revision:lt}=Se(ne);R("worker-queue-toggle",{on:ne.getAttribute("data-on")==="true"},ut,lt);return}let Ee=w.closest(".mon-ctl--merge-auto");if(Ee){m.preventDefault();let{root_dir:ut,revision:lt}=Se(Ee);R("worker-merge-auto-toggle",{on:Ee.getAttribute("data-on")==="true"},ut,lt);return}let Ve=w.closest(".mon-ctl--exec");if(Ve){m.preventDefault(),q=Ve.getAttribute("data-root-dir")||null,$.delete(q||""),O.open();return}let it=w.closest(".mon-card");if(!it)return;let ze=w.closest("button");if(ze){m.preventDefault(),Je(it,ze);return}let At=it.getAttribute("data-issue-id");At&&!A&&(m.preventDefault(),ve(At,it.getAttribute("data-root-dir")||""))}function Ge(m){let A=m.target;if(!A||typeof A.closest!="function")return;let w=A.closest(".mon-done-range");if(w){f=Zt(w.value)?w.value:Lt,hp(f),re();return}let I=A.closest(".mon-slots__input");if(!I)return;let{root_dir:G,revision:X}=Se(I),ne=Number(I.value);if(!Number.isFinite(ne))return;let Ee=Math.max(un,Math.floor(ne));R("worker-queue-set-slots",{slots:Ee},G,X)}e.addEventListener("click",Ae),e.addEventListener("change",Ge),e.addEventListener("dragstart",j),e.addEventListener("dragover",te),e.addEventListener("dragleave",me),e.addEventListener("drop",P),e.addEventListener("dragend",Ie),s&&typeof s.subscribe=="function"&&(x=s.subscribe(()=>{try{$.clear(),re();for(let m of Array.from(Y))m()}catch{}}));function qe(){B!==null&&(clearInterval(B),B=null)}function Ye(){fe!==null&&(clearTimeout(fe),fe=null)}return{load(){r("load"),re(),B===null&&(B=setInterval(()=>{try{re()}catch{}},yp))},pause(){qe()},clear(){qe(),Ye(),x&&(x(),x=null),e.removeEventListener("click",Ae),e.removeEventListener("change",Ge),e.removeEventListener("dragstart",j),e.removeEventListener("dragover",te),e.removeEventListener("dragleave",me),e.removeEventListener("drop",P),e.removeEventListener("dragend",Ie),O.destroy(),Y.clear(),e.replaceChildren()}}}function dl(e,t,r){let n=rt("views:nav"),s=null;function o(l){return d=>{d.preventDefault(),n("click tab %s",l),r.gotoView(l)}}function a(){let l=t.getState(),d=l.view==="worker"||l.view==="monitor"?l.view:"board";return c`
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
    `}function i(){Be(a(),e)}return i(),s=t.subscribe(()=>i()),{destroy(){s&&(s(),s=null),Be(c``,e)}}}var ul=["bug","feature","task","epic","chore"];function pl(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var fl=["Critical","High","Medium","Low","Backlog"];function _l(e,t){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,e.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),a=r.querySelector("#new-priority"),i=r.querySelector("#new-labels"),l=r.querySelector("#new-description"),d=r.querySelector("#new-issue-error"),u=r.querySelector("#btn-cancel"),f=r.querySelector("#btn-create"),v=r.querySelector(".new-issue__close");function E(){o.replaceChildren();let O=document.createElement("option");O.value="",O.textContent="\u2014 Select \u2014",o.appendChild(O);for(let x of ul){let B=document.createElement("option");B.value=x,B.textContent=pl(x),o.appendChild(B)}a.replaceChildren();for(let x=0;x<=4;x+=1){let B=document.createElement("option");B.value=String(x);let R=fl[x]||"Medium";B.textContent=`${x} \u2013 ${R}`,a.appendChild(B)}}E();function S(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function C(O){s.disabled=O,o.disabled=O,a.disabled=O,i.disabled=O,l.disabled=O,u.disabled=O,f.disabled=O,f.textContent=O?"Creating\u2026":"Create"}function q(){d.textContent=""}function $(O){d.textContent=O}function Y(){try{let O=window.localStorage.getItem("beads-ui.new.type");O?o.value=O:o.value="";let x=window.localStorage.getItem("beads-ui.new.priority");x&&/^\d$/.test(x)?a.value=x:a.value="2"}catch{o.value="",a.value="2"}}function J(){let O=o.value||"",x=a.value||"";O.length>0&&window.localStorage.setItem("beads-ui.new.type",O),x.length>0&&window.localStorage.setItem("beads-ui.new.priority",x)}async function L(){q();let O=String(s.value||"").trim();if(O.length===0){$("Title is required"),s.focus();return}let x=Number(a.value||"2");if(!(x>=0&&x<=4)){$("Priority must be 0..4"),a.focus();return}let B=String(o.value||""),R=String(l.value||""),pe={title:O};B.length>0&&(pe.type=B),String(x).length>0&&(pe.priority=x),R.length>0&&(pe.description=R),C(!0);try{await t("create-issue",pe)}catch{C(!1),$("Failed to create issue");return}J(),C(!1),S()}return r.addEventListener("cancel",O=>{O.preventDefault(),S()}),v.addEventListener("click",()=>S()),u.addEventListener("click",()=>S()),r.addEventListener("keydown",O=>{O.key==="Enter"&&(O.ctrlKey||O.metaKey)&&(O.preventDefault(),L())}),n.addEventListener("submit",O=>{O.preventDefault(),L()}),{open(){n.reset(),q(),Y();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){S()}}}var kp=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function ml(e){return String(e).padStart(2,"0")}function $p(e,t){let r=Math.max(0,Math.ceil((e-t)/6e4)),n=Math.floor(r/1440),s=Math.floor(r%1440/60),o=r%60;return n>0?`${n}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function xp(e,t=Date.now()){let r=Date.parse(e);if(!Number.isFinite(r))return"";let n=new Date(r),s=new Date(t),o=`${ml(n.getHours())}:${ml(n.getMinutes())}`,i=n.getFullYear()===s.getFullYear()&&n.getMonth()===s.getMonth()&&n.getDate()===s.getDate()?o:`${kp[n.getMonth()]} ${n.getDate()} ${o}`;return`${$p(r,t)} \xB7 ${i}`}function Sp(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}var gl=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage"}];function hl(e){let t=!1,r=null,n=new Map;function s(){Be(c``,e),e.hidden=!0}function o(){let l=gl.filter(u=>n.has(u.key));if(l.length===0){s();return}let d=Date.now();Be(c`<div class="usage-meter" aria-label="Usage">
        ${l.map(u=>{let f=n.get(u.key),v=typeof f.ageSeconds=="number"&&f.ageSeconds>600,E=v?`${Math.floor(f.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"";return c`<span
            class="usage-meter__group${v?" usage-meter__group--stale":""}"
            aria-label=${`${u.label} usage`}
          >
            <span class="usage-meter__provider">${u.label}</span>
            ${f.windows.map(S=>{let C=typeof S.pct=="number"&&Number.isFinite(S.pct)?S.pct:0,q=Math.min(100,Math.max(0,C)),Y=`resets ${xp(S.resetsAt,d)}${v?` \xB7 ${E}`:""}`;return c`<span
                class="usage-meter__window ${Sp(q)}"
                style=${`--progress: ${q}%`}
                title=${Y}
              >
                <span class="usage-meter__label">${S.key}</span>
                <span class="usage-meter__track" aria-hidden="true">
                  <span class="usage-meter__fill"></span>
                </span>
                <span class="usage-meter__pct">${q}%</span>
              </span>`})}
          </span>`})}
      </div>`,e),e.hidden=!1}async function a(l){try{let d=await fetch(l.endpoint);if(!d.ok)return null;let u=await d.json();return!u||u.available!==!0||!Array.isArray(u.windows)?null:u}catch{return null}}async function i(){let l=await Promise.all(gl.map(async d=>({provider:d,payload:await a(d)})));if(!t){for(let d of l)d.payload?n.set(d.provider.key,d.payload):n.delete(d.provider.key);o()}}return s(),i(),r=setInterval(()=>{i()},6e4),{destroy(){t=!0,r!==null&&(clearInterval(r),r=null),s()}}}var Ap="worker-ineligible";function uo(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function bl(e){return uo(e).includes(Ap)}var po="worker-serial";function _n(e){return uo(e).includes(po)}var Tp="tab:worker:ready",Ep="tab:worker:blocked",Cp="tab:worker:in-progress",mn=1,Rp=new Set(["done","failed","orphaned","stopped","discarded"]);function vl(e){return cn(e).path.length>0}var kl="beads-ui.worker.candidate-filter",fo={show_blocked:!1,spec:"all"};function Ip(){try{let e=window.localStorage.getItem(kl);if(!e)return{...fo};let t=JSON.parse(e);if(!t||typeof t!="object")return{...fo};let r=t.spec;return{show_blocked:t.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...fo}}}function Lp(e){try{window.localStorage.setItem(kl,JSON.stringify(e))}catch{}}function Op(e,t){let r=i=>t.show_blocked||!i.blocked,n=i=>t.spec==="all"||(t.spec==="with"?i.has_spec:!i.has_spec),s=[],o=0,a=0;for(let i of e){let l=r(i),d=n(i);l&&d?s.push(i):!l&&d?o+=1:l&&!d&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var Dp=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],$l="bdui.worker.candidate_sort",Mp=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],ts="spec";function Pp(){try{let e=window.localStorage.getItem($l);return e==="board"||e==="created"||e==="spec"?e:ts}catch{return ts}}function Np(e){try{window.localStorage.setItem($l,e)}catch{}}var xl="bdui.worker.done-range";function qp(){try{let e=window.localStorage.getItem(xl);return Zt(e)?e:Lt}catch{return Lt}}function Fp(e){try{window.localStorage.setItem(xl,e)}catch{}}var Bp="(max-width: 640px)",Sl="beads-ui.worker.lane-collapsed",gn={queue:!0,done:!0};function Up(){try{let e=window.localStorage.getItem(Sl);if(!e)return{...gn};let t=JSON.parse(e);return!t||typeof t!="object"?{...gn}:{queue:typeof t.queue=="boolean"?t.queue:gn.queue,done:typeof t.done=="boolean"?t.done:gn.done}}catch{return{...gn}}}function jp(e){try{window.localStorage.setItem(Sl,JSON.stringify(e))}catch{}}function yl(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let r=typeof t.title=="string"?t.title:t.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function zp(e,t,r){let n=Array.isArray(e)?e.slice():[];return t==="created"?n.sort(kr):(n.sort(Sn(r)),t==="board"?n:[...n.filter(vl),...n.filter(s=>!vl(s))])}function Hp(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function Wp(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Gp(e){let r=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(n=>typeof n=="string"?n:n&&n.id).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}var Yp=["closed_unmerged","undecidable"],Vp=[{from:"\uAD00\uCE21 \uB300\uAE30",activity:"checking",to:"\uD655\uC778\uC911"},{from:"\uB85C\uCEEC\uAC80\uC99D \uB300\uAE30",activity:"verifying",to:"\uB85C\uCEEC\uAC80\uC99D \uC2E4\uD589 \uC911"}];function Kp(e,t){for(let r of Vp)if(e===r.from&&t===r.activity)return{label:r.to,live:!0};return{label:e,live:!1}}var Zp=[{step:"merging",label:"\uBA38\uC9C0 \uC911",index:1},{step:"base_sync",label:"base \uB3D9\uAE30\uD654",index:2},{step:"reconcile_queued",label:"\uC815\uB9AC \uC900\uBE44",index:2},{step:"candidate_pinned",label:"\uBC30\uD3EC \uD6C4\uBCF4 \uACE0\uC815",index:3},{step:"post_merge_verify",label:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D",index:4},{step:"reconcile_verify",label:"\uC815\uB9AC \uC911 \xB7 \uAC80\uC99D",index:4},{step:"deploy",label:"\uBC30\uD3EC",index:5},{step:"reconcile_deploy",label:"\uC815\uB9AC \uC911 \xB7 \uBC30\uD3EC",index:5},{step:"reconcile_restart",label:"\uC815\uB9AC \uC911 \xB7 \uC7AC\uC2DC\uC791",index:6},{step:"reconcile_readback",label:"\uC815\uB9AC \uC911 \xB7 readback",index:6},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC",index:7},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC",index:8},{step:"parent_close",label:"\uBD80\uBAA8 close",index:9}];function Xp(e){if(typeof e!="string"||e.length===0)return null;let t=9,r=Zp.find(n=>n.step===e);return r?{label:r.label,index:r.index,total:t,percent:Math.round(r.index/t*100)}:{label:e,index:0,total:t,percent:0}}function Qp(e){if(!e||e.adapter!=="managed"&&e.stage!=="queued")return null;let t=e.stage==="queued"?"reconcile_queued":e.stage==="pinned"?"candidate_pinned":e.stage==="verifying"?"reconcile_verify":e.stage==="deploying"?"reconcile_deploy":e.stage==="restarting"?"reconcile_restart":e.stage==="readback"?"reconcile_readback":null;return t?{activity:null,merge_progress:{step:t,started_at:typeof e.updated_at=="number"?e.updated_at:0}}:null}function wl(e){switch(e){case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";default:return e}}function Jp(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function _o(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function ef(e){if(!e||typeof e!="object")return null;let t=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,n=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,s=n&&typeof n.pr_number=="number"?n.pr_number:null,o="";switch(e.phase){case"gating":o="root \uC7AC\uAC80\uC99D \uC911";break;case"repairing":o=e.subject_role==="root"?`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 \uC6D0 PR \uC218\uC815 \uC911`:`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 repair PR \uC900\uBE44 \uC911`;break;case"waiting_repair_pr":o=s?`repair PR #${s} \uB300\uAE30`:"repair PR \uB300\uAE30";break;case"merging":o=e.subject_role==="repair"?s?`repair PR #${s} \uBA38\uC9C0 \uC911`:"repair PR \uBA38\uC9C0 \uC911":"root \uBA38\uC9C0 \uC911";break;case"cleaning":o="\uC815\uB9AC \uBCF5\uAD6C \uC911";break;case"paused":o="\uC790\uB3D9\uBCF5\uAD6C \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":o=`\uC0AC\uB78C \uD655\uC778 \uD544\uC694 \xB7 ${e.terminal_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`;break;case"completed":return null;default:return null}let a=[`\uBCF5\uAD6C \uC138\uC158 ${t}/${r}`];return e.head_sha&&a.push(`head ${e.head_sha}`),e.base_sha&&a.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&a.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`),e.active_attempt_id&&a.push(`attempt ${e.active_attempt_id}`),n&&typeof n.bead_id=="string"&&a.push(`repair ${n.bead_id}`),e.evidence&&a.push(e.evidence),e.log_path&&a.push(e.log_path),{badge:o,title:a.join(`
`),alert:e.phase==="needs_human",lock_actions:e.phase!=="paused"&&e.phase!=="needs_human",repair_pr_url:n&&typeof n.pr_url=="string"?n.pr_url:"",repair_pr_number:s}}function tf(e,t,r,n,s=null,o=null,a=null,i=!1,l=null,d=!0,u=null,f=null,v=null,E={},S=!1){let C=!!l&&l.position>0,q=!!l?.continuation_action&&l.continuation_action.continuation===null,$=!!l&&l.active===!0,Y=l&&l.failure||null,J=r[e]||null,L=J&&J.gate?J.gate:null,O=J&&J.pr?J.pr:null,x=ef(v),B=Jp(l?l.resolution:null),R=[];i&&R.push("\uC138\uC158");let pe=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":B?B.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":null,$e=Kp(i&&L&&L.tier==="closed_unmerged"?"\uB2EB\uD798":L&&L.gate_badge||"",pe?null:o&&o.activity||null);pe&&R.push(pe),$e.label&&R.push($e.label),L&&L.base_badge&&L.base_badge!==L.gate_badge&&R.push(L.base_badge),f&&R.push(f),n&&R.push("\uC815\uB9AC \uC2E4\uD328"),x&&R.push(x.badge),C&&!$&&R.push(`\uBA38\uC9C0 \uB300\uAE30 #${l.position}`),Y&&R.push(`\uC77C\uAD04 \uBA38\uC9C0 \uC2E4\uD328: ${wl(Y)}`),q&&R.push("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"),u&&R.push(`\uC790\uB3D9 \uC81C\uC678: ${wl(u)}`);let ae=!!L&&L.base_badge==="\uCDA9\uB3CC",ye=!!L&&L.enabled===!0,De=Xp(o&&o.merge_progress?o.merge_progress.step:null),Qe=!!n&&!!L&&L.tier==="merged",tt=i&&!!L&&L.tier==="merged",Ne=i&&ae&&d===!1,Oe=Ht(E,e,{external:i,merge_active:$||!!De,merge_queued:C,conflict_active:!!a,cleanup_active:!1,merged:!!n||L?.tier==="merged"}),fe=!!Oe.operation;return{id:e,title:t,reason:n?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:S,external:i,pr_number:O&&typeof O.number=="number"?O.number:null,pr_url:O&&typeof O.url=="string"?O.url:"",completion_badge:x?x.badge:null,completion_title:x?x.title:"",completion_repair_pr_url:x?x.repair_pr_url:"",completion_repair_pr_number:x?x.repair_pr_number:null,badges:R,live_badge:a==="paused"?null:B?.live||a==="running"?pe:$e.live?$e.label:null,usage:s,alert:!!L&&Yp.includes(L.tier)||!!n||!!Y||!!(x&&x.alert),merge_action:!C||q,cancel_action:C&&!q,cancel_enabled:!$&&!(x&&x.lock_actions),cancel_title:x&&x.lock_actions?"\uC790\uB3D9\uBCF5\uAD6C \uC911 \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694":$?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:Oe,discard_action:Oe.action,merge_step:De,discard_enabled:Oe.enabled,discard_title:Oe.title,merge_enabled:!De&&!a&&!fe&&!(x&&x.lock_actions)&&!Ne&&(ye||ae||Qe||tt),merge_label:q?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Qe||tt?"\uC815\uB9AC":ae&&!De&&!Qe?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:fe?Oe.error?`\uD3D0\uAE30 \uC2E4\uD328: ${Oe.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${Oe.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:q?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":De?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${De.label}`:tt?"\uBA38\uC9C0\uB428 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uB97C \uC218\uD589\uD569\uB2C8\uB2E4":Ne?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":Qe?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uC218\uD589\uD569\uB2C8\uB2E4":ae?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":ye?`\uBA38\uC9C0 (${L.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:L&&L.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${L&&L.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function mo(e,t={}){let{transport:r,issueStores:n,queueStore:s,execPresetStore:o,sessionLogStore:a,uiOrderStore:i,gotoIssue:l,getWorkspacePath:d}=t,u=n?Tn(n,i):null,f=Cn({transport:r,uiOrderStore:i}),v=null,E=[],S=Ip(),C=Pp(),q=qp();function $(){let p=jt.find(k=>k.value===q);return p?p.label:"\uC624\uB298"}let Y=Up(),J=!1,L=new Set,O=new Set,x=new Set,B="ordinary",R=!1,pe=new Map,$e=[],ae=document.createElement("div");ae.className="worker-console";let ye=document.createElement("div");ye.className="worker-top";let De=document.createElement("div");De.className="worker-drawer-overlay",De.hidden=!0;let Qe=document.createElement("div");Qe.className="worker-drawer-overlay__backdrop";let tt=document.createElement("div");tt.className="worker-drawer-host",De.append(Qe,tt);let Ne=document.createElement("div");Ne.className="worker-lanes-host",ae.append(ye,De,Ne),e.appendChild(ae);let Oe=null,fe=Kn(tt,{transport:r,sessionLogStore:a,onClose:()=>{Oe=null,De.hidden=!0,Te()}}),xe=Qn(ae,{queueStore:s,presetStore:o,transport:r,getWorkspacePath:d});function Le(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,pr_wait_holds_slot:!1,slots:mn,queue:[],pr_wait:[],done:[]}}function Z(){let p=Le();return typeof p.revision=="number"?p.revision:0}function he(p){p&&p.queue&&s&&s.set(p.queue)}function j(){let p=Le().queue;return Array.isArray(p)?p.length:0}async function te(p,k){if(!r)return;let D=await r("worker-queue-place",{bead_id:p,index:k,expected_revision:Z()});he(D),D&&D.conflict&&await r("worker-queue-place",{bead_id:p,index:k,expected_revision:Z()}).then(he)}async function me(p,k){if(!r)return;let D=await r("worker-queue-reorder",{bead_id:p,to_index:k,expected_revision:Z()});he(D),D&&D.conflict&&await r("worker-queue-reorder",{bead_id:p,to_index:k,expected_revision:Z()}).then(he)}async function Ie(p){if(!r)return;let k=await r("worker-queue-remove",{bead_id:p,expected_revision:Z()});he(k),k&&k.conflict&&await r("worker-queue-remove",{bead_id:p,expected_revision:Z()}).then(he)}async function P(){if(!r||R)return;let k=(Array.isArray(Le().queue)?Le().queue:[]).map(ie=>ie.bead_id).filter(ie=>x.has(ie));if(k.length===0)return;if(k.some(ie=>{let ue=pe.get(ie);return ue!==!0&&ue!==!1})){Q("\uC2E4\uD589 \uBC29\uC2DD \uD655\uC778 \uC911","warning");return}let D=B==="serial",oe=k.filter(ie=>pe.get(ie)!==D);if(oe.length===0){x.clear(),Te(),Q("\uC774\uBBF8 \uAC19\uC740 \uC2E4\uD589 \uBC29\uC2DD\uC785\uB2C8\uB2E4","info");return}R=!0,Te();let de=[],ge=0;try{for(let ie of oe){let ue=await Promise.resolve(r(D?"label-add":"label-remove",{id:ie,label:po})).catch(()=>[]),Me=Array.isArray(ue)?ue[0]:ue,ot=Me&&typeof Me=="object"?Me.labels:null;Me&&typeof Me=="object"&&Me.id===ie&&Array.isArray(ot)&&_n(ot)===D?ge+=1:de.push(ie)}if(de.length===0){x.clear(),Q(`${ge}\uAC1C \uC2E4\uD589 \uBC29\uC2DD \uBCC0\uACBD`,"success");return}x.clear();for(let ie of de)x.add(ie);Q(`${oe.length}\uAC1C \uC911 ${ge}\uAC1C \uBCC0\uACBD \xB7 ${de.length}\uAC1C \uC2E4\uD328 (${de.join(", ")})`,"error")}finally{R=!1,Te()}}async function N(p){if(!r||!p)return;let k=await r("worker-attempt-pause",{attempt_id:p});k&&k.paused===!1&&k.reason&&Q(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${k.reason}`,"error",2400)}async function re(p){if(!r||!p)return;let k=async(oe={})=>await r("worker-attempt-resume",{attempt_id:p,expected_revision:Z(),...oe}),D=await k();he(D),D&&D.conflict&&(D=await r("worker-attempt-resume",{attempt_id:p,expected_revision:Z()}),he(D)),D=await Xt(D,(oe,de)=>k({continuation:oe,decision_token:de}),{onResult:he,refresh:()=>k()}),D&&D.resumed===!1&&!D.conflict&&D.reason&&Q(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${D.reason}`,"error",2400)}async function ve(p){if(!r||!p)return;let k=await r("worker-attempt-dismiss",{attempt_id:p,expected_revision:Z()});he(k),k&&k.conflict&&(k=await r("worker-attempt-dismiss",{attempt_id:p,expected_revision:Z()}),he(k)),k&&k.dismissed===!1&&!k.conflict&&k.reason&&Q(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${k.reason}`,"error",2400)}async function Se(p,k,D=!0){if(!r)return null;let oe=r,de=await oe(p,{...k,expected_revision:Z()});return he(de),de&&de.conflict&&D&&(de=await oe(p,{...k,expected_revision:Z()}),he(de)),de}async function Je(p){if(!r||!p)return;let k=Le().merge_queue?.find(oe=>oe.bead_id===p)?.continuation_action;if(k?.mismatch&&k.continuation===null){await Ae(p,k.mismatch);return}L.add(p),Te();let D;try{D=await Se("worker-merge-queue-add",{bead_id:p})}finally{L.delete(p),Te()}!D||D.conflict||D.applied||Q("\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)","error",2400)}async function Ae(p,k){let D=await Xt({continuation_mismatch:k},(de,ge)=>Se("worker-merge-queue-add",{bead_id:p,continuation:de,decision_token:ge},!1)),oe=D?.queue?.merge_queue?.find(de=>de.bead_id===p)?.continuation_action;if(D?.applied!==!0&&oe?.continuation===null&&oe.mismatch){await Ae(p,oe.mismatch);return}D&&D.applied===!1&&!D.conflict&&Q("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function Ge(p){if(!r)return;let k=await Se("worker-merge-auto-toggle",{on:p});!k||k.conflict||Q(p?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",p?"success":"info",2400)}async function qe(p){if(!r||!p)return;let k=await Se("worker-merge-queue-remove",{bead_id:p});k&&!k.conflict&&!k.applied&&k.reason==="merge_active"&&Q("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function Ye(){await Se("worker-merge-queue-remove",{all:!0})}async function m(p,k=null,D="unmerged",oe=null){if(!r||!p)return;let de=dn(p,D);if(!(typeof globalThis.confirm!="function"||globalThis.confirm(de)))return;let ie=await r("worker-discard",{bead_id:p,...k?{attempt_id:k}:{},...oe?{operation_id:oe}:{},expected_revision:Z()});if(he(ie),ie&&ie.conflict&&(ie=await r("worker-discard",{bead_id:p,...k?{attempt_id:k}:{},...oe?{operation_id:oe}:{},expected_revision:Z()}),he(ie)),ie&&ie.discarded===!0){Q(Jn(ie),"success",5e3);return}if(ie&&ie.reason){Q(`\uD3D0\uAE30 \uC2E4\uD328: ${ie.reason}`,"error",2800);return}if(ie&&ie.accepted&&ie.pending==="merged_revert"){Q("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(ie&&ie.accepted&&!ie.discarded){Q(`\uD3D0\uAE30 \uC9C4\uD589: ${ie.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}ie&&!ie.conflict&&Q("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function A(p,k){if(!r||!k||O.has(k))return;O.add(k),Te();let D;try{let oe=async(de={})=>await r(p,{bead_id:k,expected_revision:Z(),...de});D=await oe(),he(D),D&&D.conflict&&(D=await r(p,{bead_id:k,expected_revision:Z()}),he(D)),p==="worker-revise-fix"&&(D=await Xt(D,(de,ge)=>oe({continuation:de,decision_token:ge}),{onResult:he,refresh:()=>oe()}))}finally{O.delete(k),Te()}if(!(!D||D.conflict)){if(D.ok){Q(p==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}Q(`\uCC98\uBD84 \uAC70\uBD80: ${D.reason||""}`,"error",3e3)}}async function w(p){if(!r)return;let k=await r("worker-queue-toggle",{on:p,expected_revision:Z()});he(k),k&&k.conflict&&await r("worker-queue-toggle",{on:p,expected_revision:Z()}).then(he)}async function I(p){if(!r||!Number.isFinite(p))return;let k=Math.max(mn,Math.floor(p)),D=await r("worker-queue-set-slots",{slots:k,expected_revision:Z()});he(D),D&&D.conflict&&await r("worker-queue-set-slots",{slots:k,expected_revision:Z()}).then(he)}async function G(p){if(!r)return;let k=await r("worker-queue-set-pr-wait-hold",{on:p,expected_revision:Z()});he(k),k&&k.conflict&&await r("worker-queue-set-pr-wait-hold",{on:p,expected_revision:Z()}).then(he)}function X(){let p=Le(),k=u?u.selectBoardColumn(Tp,"ready"):[],D=u?u.selectBoardColumn(Ep,"blocked"):[],oe=u?u.selectBoardColumn(Cp,"in_progress"):[],de=new Map;for(let b of oe){let U=Wp(b);if(!U)continue;let le=de.get(U);le?le.push(b):de.set(U,[b])}let ge=b=>{let U=En(de.get(b)||[]);return U?U.title||U.id:null},ie=p.bead_titles||{},ue=new Map;for(let[b,U]of Object.entries(ie))typeof U=="string"&&U.length>0&&ue.set(b,U);for(let b of[...k,...D])ue.set(b.id,b.title||b.id);pe.clear();let Me=p.bead_times&&typeof p.bead_times=="object"&&!Array.isArray(p.bead_times)?p.bead_times:{},ot=p.bead_labels&&typeof p.bead_labels=="object"&&!Array.isArray(p.bead_labels)?p.bead_labels:{};for(let[b,U]of Object.entries(ot))Array.isArray(U)&&pe.set(b,_n(U));for(let b of[...k,...D]){let U=b.labels;if(!Array.isArray(U))continue;if(!pe.has(b.id)){pe.set(b.id,_n(U));continue}let le=Me[b.id],Ze=or(le&&typeof le=="object"?le.updated_at:null),gr=or(b.updated_at);gr!==null&&Ze!==null&&gr>Ze&&pe.set(b.id,_n(U))}let bt=new Map;for(let[b,U]of Object.entries(Me))U&&typeof U=="object"&&bt.set(b,U);for(let b of[...k,...D])bt.set(b.id,{created_at:b.created_at,updated_at:b.updated_at});let at=b=>bt.get(b)||{},mt=p.pr_wait||[],Rt=p.pr_observations||{},Mt=p.pr_activity||{},Tt=p.deployment_reconcile||p.reconcile||{},It=p.cleanup_failed||{},H=Object.entries(It).map(([b,U])=>({bead_id:b,step:U&&U.step?U.step:"",reason:U&&U.reason?U.reason:"",detail:Tt[b]?.adapter==="managed"&&(U?.detail==="checkout_dirty"||U?.detail==="checkout_not_on_base"||U?.detail==="head_not_base_sha")?null:U&&typeof U.detail=="string"?U.detail:null,output_tail:U&&typeof U.output_tail=="string"&&U.output_tail?U.output_tail:void 0,log_path:U&&typeof U.log_path=="string"&&U.log_path?U.log_path:void 0,retry_count:U&&typeof U.retry_count=="number"&&Number.isInteger(U.retry_count)&&U.retry_count>0?U.retry_count:0})),h=p.queue||[],z=new Set(h.map(b=>b.bead_id));for(let b of x)z.has(b)||x.delete(b);let _=new Set([...h.map(b=>b.bead_id),...mt.map(b=>b.bead_id),...p.done.map(b=>b.bead_id)]),y=new Set(D.map(b=>b.id)),ee=i?i.get()?.order||{}:{},se=new Set,K=[];for(let b of[...k,...D])_.has(b.id)||se.has(b.id)||Hp(b)||bl(b.labels)||(se.add(b.id),K.push(b));E=zp(K,C,ee);let g=p.admission||{},M=b=>{let U=g[b];if(!U)return"";if(U.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let le=typeof U.reason=="string"?U.reason:"",Ze=le.indexOf(":");return Ze>0&&Ze<le.length-1?`\u26D4 ${le.slice(0,Ze)} (${le.slice(Ze+1)})`:`\u26D4 ${le}`},T=E.map(b=>{let U=cn(b),le=U.path.length>0,Ze=b.workflow?.route==="quick_fix"||b.metadata&&b.metadata.route==="quick_fix",gr=!Ze&&le&&!U.conflict,Tr=y.has(b.id),Yt=[];Tr&&Yt.push(Gp(b)),Ze?Yt.push("quick_fix \xB7 \uC6CC\uCEE4 \uBE44\uB300\uC0C1"):U.conflict?Yt.push("spec_id_conflict"):le||Yt.push("spec \uC5C6\uC74C");let wn=M(b.id);return wn&&Yt.push(wn),{id:b.id,title:b.title||b.id,reason:Yt.join(" \xB7 "),draggable:gr,lane:"candidate",created_at:b.created_at,updated_at:b.updated_at,workflow:b.workflow,is_quick_fix:Ze,status:b.status,blocked:Tr,has_spec:le}}),V=Op(T,S),ke=V.visible,Ue=p.revise_parked||{},ct=p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},Fe=(b,U)=>b.map(le=>{let Ze=U==="queue"?Ue[le.bead_id]:null,gr=U==="queue"?Ht(ct,le.bead_id):null,Tr=gr?.operation?gr:null,Yt=U==="queue"?pe.has(le.bead_id)?pe.get(le.bead_id)||!1:null:!1,wn=Yt===!0&&(Object.values(p.attempts||{}).some(Vt=>Vt&&Vt.bead_id!==le.bead_id&&!Rp.has(Vt.status))||mt.some(Vt=>Vt.bead_id!==le.bead_id)||Object.values(ct).some(Vt=>Vt&&Vt.bead_id!==le.bead_id&&Vt.phase!=="done")),Po=U==="done"?[]:[M(le.bead_id)];return wn&&Po.unshift("\uB2E4\uB978 \uC791\uC5C5 \uC885\uB8CC \uB300\uAE30 \xB7 \uBA38\uC9C0\uAE4C\uC9C0 \uB2E8\uB3C5"),{id:le.bead_id,title:ue.get(le.bead_id)||le.bead_id,reason:Po.filter(Boolean).join(" \xB7 "),draggable:U!=="done"&&!Tr,done:U==="done",lane:U,selectable:U==="queue",selected:U==="queue"&&x.has(le.bead_id),worker_serial:Yt,discard:Tr,badges:Ze?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!Ze,revise_action:!!Ze,revise_enabled:!!Ze&&!Tr&&!O.has(le.bead_id),revise_title:Ze?Ze.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Ze.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:U==="done"?Ot(p.attempts||{},le.bead_id):null,done_at:U==="done"&&typeof le.added_at=="number"?le.added_at:void 0,...at(le.bead_id)}}),Gt=new Map;for(let b of p.done)b&&typeof b.bead_id=="string"&&typeof b.added_at=="number"&&Gt.set(b.bead_id,b.added_at);let mr=p.attempts?Object.values(p.attempts):[],rs=new Set;for(let b of mr)b&&typeof b.resumed_from=="string"&&b.resumed_from.length>0&&rs.add(b.resumed_from);let ns=new Map;for(let b of mr)ns.set(b.bead_id,b.attempt_id);let ss=new Map;for(let b of mr)ss.set(b.attempt_id,b);function os(b){let U=new Set,le=b;for(;le&&!U.has(le.attempt_id);){if(le.conflict_resolution===!0)return!0;U.add(le.attempt_id),le=typeof le.resumed_from=="string"&&le.resumed_from.length>0&&ss.get(le.resumed_from)||null}return!1}let hn=typeof p.declared_base=="string"?p.declared_base:null;function Nl(b){let U=null;for(let le of mr)!le||le.bead_id!==b||os(le)||(U===null||(typeof le.started_at=="number"?le.started_at:0)>=(typeof U.started_at=="number"?U.started_at:0))&&(U=le);return U&&typeof U.target_base=="string"?U.target_base:null}let vo=[],yo=[],ql=b=>{let U=ns.get(b.bead_id)!==b.attempt_id,le=Gt.get(b.bead_id),Ze=typeof le=="number"&&le>0&&typeof b.finished_at=="number"&&le>=b.finished_at;return!U&&!Ze&&typeof b.dismissed_at!="number"},wo=b=>{let U=typeof b.session_id=="string"&&b.session_id.length>0,le=rs.has(b.attempt_id);return{eligible:U&&!le,reason:U?le?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},Pt=null;for(let b of mr){let U=b.status==="paused"&&!rs.has(b.attempt_id);if(b.status==="running"||U)yo.push({bead_id:b.bead_id,attempt_id:b.attempt_id,title:ue.get(b.bead_id)||b.bead_id,runner:b.runner||null,model:b.model||null,effort:b.effort||null,speed:b.speed||null,continuation_mode:b.continuation_mode||null,started_at:typeof b.started_at=="number"?b.started_at:null,resumed_from:b.resumed_from||null,paused:U,conflict_resolution:os(b),base_exception:_o(hn,b.target_base),can_pause:typeof b.session_id=="string"&&b.session_id.length>0,discard:Ht(ct,b.bead_id,{attempt_id:b.attempt_id}),usage:Ot(p.attempts||{},b.bead_id),current_child:ge(b.bead_id),...at(b.bead_id)});else if((b.status==="failed"||b.status==="orphaned")&&ql(b)){let le=wo(b);vo.push({bead_id:b.bead_id,attempt_id:b.attempt_id,title:ue.get(b.bead_id)||b.bead_id,runner:b.runner||null,model:b.model||null,effort:b.effort||null,speed:b.speed||null,continuation_mode:b.continuation_mode||null,started_at:typeof b.started_at=="number"?b.started_at:null,resumed_from:b.resumed_from||null,failed:!0,status:b.status,status_label:b.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:Ht(ct,b.bead_id,{attempt_id:b.attempt_id}),resume_eligible:le.eligible,resume_reason:le.reason,conflict_resolution:os(b),base_exception:_o(hn,b.target_base),usage:Ot(p.attempts||{},b.bead_id),current_child:ge(b.bead_id),...at(b.bead_id)}),Pt=b}}let bn=[...vo,...yo],ko=null;if(Pt){let b=wo(Pt),U=Pt.cause_detail;ko={bead_id:Pt.bead_id,repo:Pt.repo||"",reason:Pt.cause||Pt.status,cause_detail:U&&typeof U.reason=="string"?{reason:U.reason,command:typeof U.command=="string"?U.command:null}:null,resume_attempt_id:Pt.attempt_id,resume_eligible:b.eligible,resume_reason:b.reason,discard:Ht(ct,Pt.bead_id,{attempt_id:Pt.attempt_id})}}let Fl=new Set(bn.map(b=>b.bead_id)),as=Array.isArray(p.merge_queue)?p.merge_queue:[],$o=new Map,xo=new Map,So=new Map;as.forEach((b,U)=>{b&&typeof b.bead_id=="string"&&($o.set(b.bead_id,U+1),xo.set(b.bead_id,b.resolution),So.set(b.bead_id,b.continuation_action||null))});let Ao=p.merge_queue_state||{active:null,failures:{}},Bl=Ao.failures||{},Ul=p.auto_merge_skips||{},To=b=>{let U=Ul[b];if(!U)return null;let le=Rt[b],Ze=le&&le.pr?le.pr.head_sha:null;return Ze&&Ze===U.head_sha?U.reason||"":null},vn=new Map;for(let b of bn)b.failed!==!0&&b.conflict_resolution&&(b.paused?vn.has(b.bead_id)||vn.set(b.bead_id,"paused"):vn.set(b.bead_id,"running"));let Eo=bn.filter(b=>!b.paused&&b.failed!==!0).length,Co=(p.workspace_info||{}).slots,jl=typeof Co=="number"?Co:typeof p.slots=="number"?p.slots:mn,Ro=p.pr_wait_holds_slot===!0?mn:jl,zl=Eo>Ro,Io=Rr(q),Hl=(Array.isArray(p.done)?p.done.slice():[]).filter(b=>Io===void 0||typeof b.added_at!="number"||b.added_at>=Io).sort((b,U)=>(U.added_at||0)-(b.added_at||0)),is=Fe(Hl,"done"),yn={};for(let b of Qt)yn[b]=0;let Lo=!1,Oo=0,ls=0,Do=0;for(let b of is){let U=b.usage;if(U&&typeof U=="object"){let le=!1;for(let Ze of Qt)Number.isFinite(U[Ze])&&(yn[Ze]+=U[Ze],Lo=!0,le=!0);le&&(ls+=1,Number.isFinite(U.total_cost_usd)&&(Oo+=U.total_cost_usd,Do+=1))}}ls>0&&Do===ls&&(yn.total_cost_usd=Oo);let Mo=is.map(b=>b.usage).filter(b=>b&&typeof b=="object"&&b.providers),Wl=Mo.length>0?ht(Mn(Mo)):Lo?qt(yn):null;return{queue:p,idToTitle:ue,candidates:ke,candidate_hidden:{blocked:V.hidden_blocked,spec:V.hidden_spec},running:bn,live_count:Eo,slots:Ro,over_cap:zl,failure:ko,waiting:Fe(h.filter(b=>!Fl.has(b.bead_id)),"queue"),pr_wait:mt.map(b=>tf(b.bead_id,ue.get(b.bead_id)||b.bead_id,Rt,It[b.bead_id]||null,Ot(p.attempts||{},b.bead_id),Qp(Tt[b.bead_id])||Mt[b.bead_id]||(L.has(b.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),vn.get(b.bead_id)||null,b.external===!0,{position:$o.get(b.bead_id)||0,active:Ao.active===b.bead_id,failure:Bl[b.bead_id]||null,resolution:xo.get(b.bead_id),continuation_action:So.get(b.bead_id)},b.wt_present!==!1,p.auto_merge===!0?To(b.bead_id):null,_o(hn,Nl(b.bead_id)),p.completion_status&&typeof p.completion_status=="object"&&!Array.isArray(p.completion_status)&&p.completion_status[b.bead_id]||null,p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},ss.get(ns.get(b.bead_id)||"")?.worker_serial===!0)).map(b=>({...b,...at(b.id)})),merge_queue_length:as.length,merge_queue_running:as.length>0,auto_excluded:mt.map(b=>b.bead_id).filter(b=>To(b)!==null),verify_cmd_present:!!(p.workspace_info||{}).verify_cmd,declared_base:hn,done:is,token_total:Wl,cleanup_failures:H}}function ne(p){let k=p.waiting.length>0?p.waiting[0].id:"\u2014",D=c`<button
      type="button"
      class="worker-play${p.queue.auto_advance?" is-active":""}"
    >
      ${p.queue.auto_advance?"\u23F8 \uC77C\uC2DC\uC815\uC9C0":"\u25B6 \uC790\uB3D9 \uC9C4\uD589"}
    </button>`,oe=lt(p),de=p.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",ge=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${p.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${p.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${$()} 완료 <b>${p.done.length}</b></span
      >`,ie=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${p.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${p.declared_base||"?"}</span
    >`,ue=c`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${mn}
          step="1"
          .value=${String(p.slots)}
          ?disabled=${p.queue.pr_wait_holds_slot===!0}
          title=${p.queue.pr_wait_holds_slot===!0?"\uBA38\uC9C0\uAE4C\uC9C0 \uC21C\uCC28 \uC2E4\uD589 \uC911 \u2014 \uD574\uC81C\uD558\uBA74 \uC800\uC7A5\uB41C \uB3D9\uC2DC \uC2E4\uD589 \uC218\uB85C \uB3CC\uC544\uAC11\uB2C8\uB2E4":"\uB3D9\uC2DC\uC5D0 \uC2E4\uD589\uD560 \uC138\uC158 \uC218 (\uCD5C\uC18C 1 = \uC21C\uCC28 \uC2E4\uD589)"}
      /></label>
      <label
        class="worker-tgl"
        title="각 이슈가 PR 머지·정리를 마칠 때까지 다음 이슈를 시작하지 않습니다"
      >
        <input
          type="checkbox"
          class="worker-pr-wait-hold"
          .checked=${p.queue.pr_wait_holds_slot===!0}
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
      </button>`,Me=Wi({failure:p.failure,cleanupFailures:p.cleanup_failures});return J?c`<div class="worker-ribbon">
          ${D} ${oe}
          <div class="worker-kpi worker-kpi--ribbon">${de}${ge}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${ue}</div>
          <div class="worker-kpi">${ie}</div>
        </div>
        ${Me}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${D}${oe}${ue}</div>
        <div class="worker-kpi">
          ${de}${ge}${ie}
          ${(Array.isArray(p.token_total)?p.token_total:p.token_total?[{label:p.token_total,tooltip:`${$()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(ot=>c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${ot.tooltip}
                >${$()} 완료 · 누적 ${ot.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${k}</b></span
          >
        </div>
      </div>
      ${Me}`}function Ee(p){if(p.running.length===0&&p.pr_wait.length===0)return"";let k=p.running.some(D=>!D.paused&&D.failed!==!0);return c`<section
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
          >${p.running.length+p.pr_wait.length}</span
        >
      </header>
      ${p.running.length>0?so(p.running,Date.now(),Oe):""}
      ${p.pr_wait.map(D=>ro(D))}
    </section>`}function Ve(p){let k=p.candidate_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${S.show_blocked}
        />
        🔒 blocked${k.blocked>0?` ${k.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Dp.map(D=>c`<button
              type="button"
              class="worker-filter__chip${S.spec===D.value?" is-active":""}"
              data-spec=${D.value}
              aria-pressed=${S.spec===D.value?"true":"false"}
            >
              ${D.label}
            </button>`)}
        ${k.spec>0?c`<span class="worker-filter__hidden">숨김 ${k.spec}</span>`:""}
      </div>
    </div>`}function it(){return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${C}
    >
      ${Mp.map(p=>c`<option value=${p.value} ?selected=${C===p.value}>
            ${p.label}
          </option>`)}
    </select>`}function ze(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${q}
      >
        ${jt.map(p=>c`<option value=${p.value} ?selected=${q===p.value}>
              ${p.label}
            </option>`)}
      </select>
    </div>`}function At(){if(x.size===0)return"";let p=Array.from(x),k=p.some(D=>{let oe=pe.get(D);return oe!==!0&&oe!==!1});return c`<div
      class="worker-bulk"
      role="group"
      aria-label="실행 방식 일괄 변경"
    >
      <span class="worker-bulk__count">${p.length}개 선택</span>
      <select
        class="worker-bulk__mode"
        aria-label="실행 방식"
        .value=${B}
        ?disabled=${R}
      >
        <option value="ordinary">일반 병렬</option>
        <option value="serial">🔒 머지까지 단독</option>
      </select>
      <button
        type="button"
        class="worker-bulk__apply"
        ?disabled=${k||R}
        title=${k?"\uC120\uD0DD\uD55C \uC791\uC5C5\uC758 \uC2E4\uD589 \uBC29\uC2DD\uC744 \uD655\uC778\uD558\uB294 \uC911\uC785\uB2C8\uB2E4":R?"\uC2E4\uD589 \uBC29\uC2DD \uBCC0\uACBD \uC911\uC785\uB2C8\uB2E4":"\uC120\uD0DD\uD55C \uC791\uC5C5\uC5D0 \uC801\uC6A9"}
      >
        적용
      </button>
      <span class="worker-bulk__hint">선택한 대기 작업에만 적용됩니다</span>
    </div>`}function ut(p){let k=(p.queue.pr_wait||[]).filter(ge=>ge&&ge.external!==!0&&typeof ge.bead_id=="string"),D=new Set(p.running.filter(ge=>!ge.paused&&ge.failed!==!0).map(ge=>ge.bead_id));for(let ge of k)D.add(ge.bead_id);let oe=!(p.queue.pr_wait_holds_slot!==!0||p.queue.auto_advance!==!0||p.queue.auto_merge===!0||k.length===0||p.waiting.length===0||D.size<p.slots),de=p.pr_wait.some(ge=>ge.worker_serial===!0);if(!(!oe&&!(de&&p.queue.auto_merge!==!0)))return c`${oe?c`<div class="worker-stat worker-pr-wait-hint">
          PR 머지 대기 중 — 다음 이슈는 머지·정리 완료 후 시작됩니다 (자동 머지
          꺼짐)
        </div>`:""}${de&&p.queue.auto_merge!==!0?c`<div
          class="worker-stat worker-pr-wait-hint worker-pr-wait-hint--serial"
        >
          단독 실행 작업의 PR 머지·정리가 끝날 때까지 다음 작업이 시작되지
          않습니다 (자동 머지 꺼짐)
        </div>`:""}`}function lt(p){let k=p.queue.auto_merge===!0;if(p.merge_queue_running)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${k?" is-active":""}"
        title=${k?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${k?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${p.merge_queue_length}
      </button>`;if(k)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let D=new Set(p.auto_excluded),oe=p.pr_wait.filter(de=>de.merge_action&&de.merge_enabled&&!D.has(de.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title=${p.verify_cmd_present?"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4 \u2014 \uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uB294 \uAC80\uC99D \uC2E0\uD638\uAC00 \uC5C6\uC5B4 CI\xB7\uB85C\uCEEC\uAC80\uC99D \uC5C6\uC774 \uBA38\uC9C0\uB429\uB2C8\uB2E4"}
    >
      ▶ 자동 머지${oe>0?` ${oe}`:""}
    </button>`}function pt(p){let k=Wt({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:p.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:it(),controls:Ve(p)});return J?c`<div class="worker-lanes worker-lanes--mobile">
        ${Ee(p)}
        ${Wt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:p.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",controls:c`${At()}${ut(p)}`,collapsible:!0,collapsed:Y.queue,preview:yl(p.waiting)})}
        ${k}
        ${Wt({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:p.done,empty:`${$()} \uC644\uB8CC \uC5C6\uC74C`,controls:ze(),collapsible:!0,collapsed:Y.done,preview:Array.isArray(p.token_total)?p.token_total.map(D=>D.label).join(" \xB7 "):p.token_total||yl(p.done)})}
      </div>`:c`<div class="worker-lanes">
      ${k}
      ${Wt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:p.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58",controls:c`${At()}${ut(p)}`})}
      ${Wt({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${p.slots}`,items:p.running,live:p.running.some(D=>!D.paused&&D.failed!==!0),body:so(p.running,Date.now(),Oe)})}
      ${Wt({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:p.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${Wt({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${$()} ${p.done.length}`,items:p.done,empty:`${$()} \uC644\uB8CC \uC5C6\uC74C`,controls:ze()})}
    </div>`}function yt(p){Y={...Y,[p]:!Y[p]},jp(Y),Te()}function Te(){let p=X();Be(ne(p),ye),Be(pt(p),Ne)}function ft(){let p=document.querySelector(".app-header");if(!p)return;let k=()=>{let D=Math.round(p.getBoundingClientRect().height);ae.style.setProperty("--worker-ribbon-top",`${D}px`)};if(k(),typeof ResizeObserver=="function"){let D=new ResizeObserver(k);D.observe(p),$e.push(()=>D.disconnect())}else window.addEventListener("resize",k),$e.push(()=>window.removeEventListener("resize",k))}function st(){if(typeof window.matchMedia!="function")return;let p=window.matchMedia(Bp);J=!!p.matches;let k=D=>{let oe=!!(D&&typeof D.matches=="boolean"?D.matches:p.matches);oe!==J&&(J=oe,Te())};typeof p.addEventListener=="function"?(p.addEventListener("change",k),$e.push(()=>p.removeEventListener("change",k))):typeof p.addListener=="function"&&(p.addListener(k),$e.push(()=>p.removeListener(k)))}function nt(p){let k=p.target,D=k?.closest?.(".worker-mini__grip"),oe=D?D.closest('.worker-mini[data-lane="queue"]'):k?.closest?.('.worker-card[draggable="true"]');if(!oe)return;let de=oe.dataset.beadId||"",ge=oe.dataset.lane||"";v={bead_id:de,from_lane:ge};try{p.dataTransfer?.setData("text/plain",de),p.dataTransfer&&(p.dataTransfer.effectAllowed="move")}catch{}}function _t(p){let k=p.target?.closest?.(".worker-pane");if(!k)return;let D=k.dataset.lane||"";D!=="candidate"&&D!=="queue"||(p.preventDefault(),p.dataTransfer&&(p.dataTransfer.dropEffect="move"),k.classList.add("worker-pane--drag-over"))}function F(p){p.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function W(p,k){let D=E.find(ie=>ie.id===p);if(!D)return;let oe=E.filter(ie=>ie.id!==p),de=oe.length;if(k){let ie=k.dataset.beadId;if(ie===p)return;let ue=oe.findIndex(Me=>Me.id===ie);ue>=0&&(de=ue)}let ge=oe.slice();ge.splice(de,0,D),f.applyReorder(p,ge,de)}function ce(p){let k=p.target?.closest?.(".worker-pane");if(!k)return;p.preventDefault(),k.classList.remove("worker-pane--drag-over");let D=k.dataset.lane||"",oe=v?.bead_id||p.dataTransfer?.getData("text/plain")||"",de=v?.from_lane||"";if(v=null,!oe)return;let ge=p.target?.closest?.(".worker-mini, .worker-card"),ie=Array.from(k.querySelectorAll(".worker-mini, .worker-card")),ue=ie.length;if(ge){let Me=ie.indexOf(ge);Me>=0&&(ue=Me)}if(k.classList.contains("worker-pane--collapsed")&&(ue=j()),D==="candidate"){if(de==="candidate"){W(oe,ge);return}de==="queue"&&Ie(oe);return}D==="queue"&&(de==="queue"?me(oe,ue):te(oe,ue))}function _e(p){S=p,Lp(p),Te()}function be(p){C=p==="board"||p==="created"||p==="spec"?p:ts,Np(C),Te()}function Re(p){q=Zt(p)?p:Lt,Fp(q),Te()}function He(p){let k=p.target?.closest?.(".worker-mini__select");if(k){let ot=k.dataset.beadId||"";ot&&(k.checked?x.add(ot):x.delete(ot),Te());return}let D=p.target?.closest?.(".worker-bulk__mode");if(D){B=D.value==="serial"?"serial":"ordinary";return}let oe=p.target?.closest?.(".worker-filter__blocked");if(oe){_e({...S,show_blocked:oe.checked});return}let de=p.target?.closest?.(".worker-done-range");if(de){Re(de.value);return}let ge=p.target?.closest?.(".worker-sort");if(ge){be(ge.value||ts);return}let ie=p.target?.closest?.(".worker-pr-wait-hold");if(ie){G(ie.checked);return}let ue=p.target?.closest?.(".worker-slots__input");if(!ue)return;let Me=Number.parseInt(ue.value,10);if(!Number.isFinite(Me)){Te();return}I(Me).then(Te)}function Ke(p){return p?{runner:p.runner||void 0,model:p.model||void 0,effort:p.effort||void 0,worktree:p.worktree||void 0,status:p.status||void 0,session_id:p.session_id||void 0}:{}}function Ce(p){let k=Le(),D=k.attempts?k.attempts[p]:null;Oe=p,De.hidden=!1,fe.open({attempt_id:p,meta:Ke(D)}),Te()}function et(){if(!Oe)return;let p=Le(),k=p.attempts?p.attempts[Oe]:null;if(k){fe.updateMeta(Ke(k));return}fe.close()}function we(p){let k=p.target,D=k?.closest?.(".worker-bulk__apply");if(D){D.disabled||P();return}if(k?.closest?.(".worker-mini__select, .worker-mini__serial, .worker-mini__grip")||k?.closest?.("#worker-exec-defaults-dialog"))return;if(k?.closest?.(".worker-exec-defaults-btn")){xe.open();return}let oe=k?.closest?.(".worker-banner__resume");if(oe){let H=oe.dataset.attemptId;H&&re(H);return}let de=k?.closest?.(".worker-banner__discard");if(de){let H=de.dataset.confirmation==="merged"?"merged":"unmerged";m(de.dataset.beadId||"",de.dataset.attemptId||null,H,de.dataset.operationId||null);return}let ge=k?.closest?.(".worker-banner__dismiss");if(ge){let H=ge.dataset.attemptId;H&&ve(H);return}if(k?.closest?.(".worker-play")){w(!Le().auto_advance);return}let ie=k?.closest?.(".worker-merge-all");if(ie){ie.classList.contains("worker-merge-all--stop")?Le().auto_merge===!0?Ge(!1):Ye():Ge(!0);return}let ue=k?.closest?.(".worker-pane__hd--toggle");if(ue){let H=ue.dataset.lane;(H==="queue"||H==="done")&&yt(H);return}let Me=k?.closest?.(".worker-card__place");if(Me){let H=Me.dataset.beadId;H&&!Me.disabled&&te(H,j());return}let ot=k?.closest?.(".worker-filter__chip");if(ot){let H=ot.dataset.spec;(H==="all"||H==="with"||H==="without")&&_e({...S,spec:H});return}let bt=k?.closest?.(".worker-mini__merge");if(bt){Je(bt.dataset.beadId||"");return}let at=k?.closest?.(".worker-mini__merge-cancel");if(at){qe(at.dataset.beadId||"");return}let mt=k?.closest?.(".worker-mini__discard");if(mt){m(mt.dataset.beadId||"",mt.dataset.attemptId||null,mt.dataset.discardMode==="merged"?"merged":"unmerged",mt.dataset.operationId||null);return}let Rt=k?.closest?.(".worker-mini__revise-fix");if(Rt){A("worker-revise-fix",Rt.dataset.beadId||"");return}let Mt=k?.closest?.(".worker-mini__revise-approve");if(Mt){A("worker-revise-approve",Mt.dataset.beadId||"");return}if(k?.closest?.(".worker-mini__pr"))return;if(k?.closest?.(".rtile__discard")){let H=k?.closest?.(".rtile"),h=H?.dataset?.beadId,z=H?.dataset?.attemptId;h&&m(h,z||null,"unmerged",k?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(k?.closest?.(".rtile__dismiss")){let h=k?.closest?.(".rtile")?.dataset?.attemptId;h&&ve(h);return}if(k?.closest?.(".rtile__pause")){let h=k?.closest?.(".rtile")?.dataset?.attemptId;h&&N(h);return}if(k?.closest?.(".rtile__resume")){let h=k?.closest?.(".rtile")?.dataset?.attemptId;h&&re(h);return}if(k?.closest?.(".rtile__session")){let h=k?.closest?.(".rtile")?.dataset?.attemptId;h&&Ce(h);return}if(k?.closest?.(".worker-drawer-overlay__backdrop")){fe.close();return}if(k?.closest?.(".worker-drawer-host"))return;let Tt=k?.closest?.(".rtile");if(Tt){if(k?.closest?.(".rtile__id")){let h=Tt.dataset.beadId;h&&$r(h).then(z=>{z?Q("\uBCF5\uC0AC\uB428","success",1200):Q("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let H=Tt.dataset.beadId;H&&l&&l(H);return}let It=k?.closest?.(".worker-mini, .worker-card");if(It){let H=It.dataset.beadId;if(k?.closest?.(".worker-mini__id, .worker-card__id")){H&&$r(H).then(h=>{h?Q("\uBCF5\uC0AC\uB428","success",1200):Q("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}H&&l&&l(H)}}return e.addEventListener("dragstart",nt),e.addEventListener("dragover",_t),e.addEventListener("dragleave",F),e.addEventListener("drop",ce),e.addEventListener("click",we),e.addEventListener("change",He),st(),ft(),u&&$e.push(u.subscribe(Te)),s&&$e.push(s.subscribe(()=>{Te(),et()})),Te(),{load(){Te()},openExecDefaults(){xe.open()},destroy(){for(let p of $e.splice(0))try{p()}catch{}e.removeEventListener("dragstart",nt),e.removeEventListener("dragover",_t),e.removeEventListener("dragleave",F),e.removeEventListener("drop",ce),e.removeEventListener("click",we),e.removeEventListener("change",He);try{fe.destroy()}catch{}De.hidden=!0;try{xe.destroy()}catch{}Be(c``,e)}}}function go(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function Al(e,t,r,n=async()=>{},s=async()=>{}){let o=rt("views:workspace-picker"),a=null,i=!1,l=!1,d=!1;async function u(x){let R=x.target.value,$e=t.getState().workspace?.current?.path||"";if(R&&R!==$e){o("switching workspace to %s",R),i=!0,O();try{await r(R)}catch(ae){o("workspace switch failed: %o",ae)}finally{i=!1,O()}}}async function f(){let x=t.getState(),B=x.workspace?.current?.path||x.workspace?.available?.[0]?.path||"";if(!(!B||l)){o("git-pulling workspace %s",B),l=!0,O();try{await n(B)}catch(R){o("workspace git pull failed: %o",R)}finally{l=!1,O()}}}function v(x){let B=x.target;B&&e.contains(B)||C()}function E(x){x.key==="Escape"&&C()}function S(){d||(d=!0,document.addEventListener("mousedown",v),document.addEventListener("keydown",E),O())}function C(){d&&(d=!1,document.removeEventListener("mousedown",v),document.removeEventListener("keydown",E),O())}function q(){d?C():S()}async function $(x){let B=x.target,R=B.value,pe=B.checked;o("toggling visibility %s \u2192 %s",R,String(pe));try{await s(R,pe)}catch($e){o("workspace visibility toggle failed: %o",$e)}}function Y(x){return x?c`
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
    `:c``}function J(x,B){return c`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${q}
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
                ${x.map(R=>c`
                    <label
                      class="workspace-picker__manage-row"
                      title="${R.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${R.path}"
                        .checked=${!B.has(R.path)}
                        @change=${$}
                      />
                      <span class="workspace-picker__manage-name"
                        >${go(R.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function L(){let x=t.getState(),B=x.workspace?.current,R=x.workspace?.available||[],pe=new Set(x.workspace?.hidden||[]),$e=B?.path||R[0]?.path||"";if(R.length===0)return c``;let ae=R.filter(ye=>!pe.has(ye.path)||ye.path===$e);if(ae.length<=1){let ye=ae[0]||R[0],De=go(ye.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${ye.path}"
            >${De}</span
          >
          ${J(R,pe)}
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
          @change=${u}
          ?disabled=${i||l}
          aria-label="Select project workspace"
        >
          ${ae.map(ye=>c`
              <option
                value="${ye.path}"
                ?selected=${ye.path===$e}
                title="${ye.path}"
              >
                ${go(ye.path)}
              </option>
            `)}
        </select>
        ${J(R,pe)}
        ${Y($e)}
        ${i||l?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function O(){Be(L(),e)}return O(),a=t.subscribe(()=>O()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",v),document.removeEventListener("keydown",E),Be(c``,e)}}}var Tl=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-queue-set-slots","worker-queue-set-pr-wait-hold","worker-queue-set-default-exec-preset","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-exec-presets","unsubscribe-exec-presets","exec-presets-snapshot","exec-preset-create","exec-preset-update","exec-preset-delete","apply-exec-preset","monitor-auto-toggle"];function ho(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function El(e,t,r=ho()){return{id:r,type:e,payload:t}}function Cl(e={}){let t=rt("ws"),r={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},n=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,i=null,l=!0,d=new Map,u=[],f=new Map,v=new Set;function E(L){for(let O of Array.from(v))try{O(L)}catch{}}function S(){if(!l||i)return;o="reconnecting",t("ws reconnecting\u2026"),E(o);let L=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,a)),O=(r.jitterRatio||0)*L,x=Math.max(0,Math.round(L+(Math.random()*2-1)*O));t("ws retry in %d ms (attempt %d)",x,a+1),i=setTimeout(()=>{i=null,J()},x)}function C(L){try{s?.send(JSON.stringify(L))}catch(O){t("ws send failed",O)}}function q(){for(o="open",t("ws open"),E(o),a=0;u.length;){let L=u.shift();L&&C(L)}}function $(L){let O;try{O=JSON.parse(String(L.data))}catch{t("ws received non-JSON message");return}if(!O||typeof O.id!="string"||typeof O.type!="string"){t("ws received invalid envelope");return}if(d.has(O.id)){let B=d.get(O.id);d.delete(O.id),O.ok?B?.resolve(O.payload):B?.reject(O.error||new Error("ws error"));return}let x=f.get(O.type);if(x&&x.size>0)for(let B of Array.from(x))try{B(O.payload)}catch(R){t("ws event handler error",R)}else t("ws received unhandled message type: %s",O.type)}function Y(){o="closed",t("ws closed"),E(o);for(let[L,O]of d.entries())O.reject(new Error("ws disconnected")),d.delete(L);a+=1,S()}function J(){if(!l)return;let L=n();try{s=new WebSocket(L),t("ws connecting %s",L),o="connecting",E(o),s.addEventListener("open",q),s.addEventListener("message",$),s.addEventListener("error",()=>{}),s.addEventListener("close",Y)}catch(O){t("ws connect failed %o",O),S()}}return J(),{send(L,O){if(!Tl.includes(L))return Promise.reject(new Error(`unknown message type: ${L}`));let x=ho(),B=El(L,O,x);return t("send %s id=%s",L,x),new Promise((R,pe)=>{d.set(x,{resolve:R,reject:pe,type:L}),s&&s.readyState===s.OPEN?C(B):(t("queue %s id=%s (state=%s)",L,x,o),u.push(B))})},on(L,O){f.has(L)||f.set(L,new Set);let x=f.get(L);return x?.add(O),()=>{x?.delete(O)}},onConnection(L){return v.add(L),()=>{v.delete(L)}},reconnect(){l=!0,i&&(clearTimeout(i),i=null),a=0,J()},close(){l=!1,i&&(clearTimeout(i),i=null);try{s?.close()}catch{}},getState(){return o}}}function rf(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function nf(e,t){try{let n=await(await fetch("/api/config")).json();e.setState({config:n})}catch(r){t("config refresh failed",r)}}var bo=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Rl=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"]],Il=ll,Ll="worker:queue",Ol="ui:order",Dl="ui:display-policy",Ml="exec:presets",_r="tab:board:closed",Pl="beads-ui.board.closed-range";function sf(e){let t=rt("main");t("bootstrap start");let r=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Be(r,e);let n=document.getElementById("top-nav"),s=document.getElementById("usage-meter"),o=document.getElementById("board-root"),a=document.getElementById("worker-root"),i=document.getElementById("monitor-root"),l=document.getElementById("detail-panel");if(s&&hl(s),o&&a&&i&&l){let Oe=function(_,y){let ee="Request failed",se="";if(_&&typeof _=="object"){let g=_;if(typeof g.message=="string"&&g.message.length>0&&(ee=g.message),typeof g.details=="string")se=g.details;else if(g.details&&typeof g.details=="object")try{se=JSON.stringify(g.details,null,2)}catch{se=""}}else typeof _=="string"&&_.length>0&&(ee=_);let K=y&&y.length>0?`Failed to load ${y}`:"Request failed";Ne.open(K,ee,se)},Ye=function(_){return`${ue.getState().workspace.current?.path||""}\0${_}`},m=function(){N&&(N().catch(()=>{}),N=null),re=null,ve=null},w=function(_){Se=_;let y=()=>{Se!==_||ue.getState().selected_id!==_||(Se=null,A(_))};if(!Ge){Ae.then(y);return}y()},ne=function(_,y,ee,se,K){return ee!==X[y]?(K().catch(()=>{}),!1):(_.set(se,K),!0)},Ee=function(){let _=ue.getState();ze(_.view==="board"),yt(_.view==="worker"),_t(_.view==="monitor"),ft(_.view==="board"||_.view==="worker"||!!_.selected_id)},it=function(){let _=Rr(Ve);return _===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:_}}},ze=function(_){if(_)for(let[y,ee]of bo){if(I.has(y)||G.has(y))continue;let se=y===_r?it():{type:ee};try{Z.register(y,se)}catch(M){t("register %s store failed: %o",y,M)}G.add(y);let K=X.board,g=!1;Le.subscribeList(y,se).then(M=>{g=!ne(I,"board",K,y,M)}).catch(M=>{t("subscribe %s failed: %o",y,M),Oe(M,"board")}).finally(()=>{G.delete(y),g&&Ee()})}else ut()},ut=function(){X.board+=1;for(let[_]of bo){let y=I.get(_);y&&(y().catch(()=>{}),I.delete(_));try{Z.unregister(_)}catch(ee){t("unregister %s failed: %o",_,ee)}}},yt=function(_){if(!_){Te();return}for(let[y,ee]of Rl){if(lt.has(y)||G.has(y))continue;try{Z.register(y,{type:ee})}catch(g){t("register %s store failed: %o",y,g)}G.add(y);let se=X.worker,K=!1;Le.subscribeList(y,{type:ee}).then(g=>{K=!ne(lt,"worker",se,y,g)}).catch(g=>{t("subscribe %s failed: %o",y,g),Oe(g,"worker")}).finally(()=>{G.delete(y),K&&Ee()})}},Te=function(){X.worker+=1;for(let[_]of Rl){let y=lt.get(_);y&&(y().catch(()=>{}),lt.delete(_));try{Z.unregister(_)}catch(ee){t("unregister %s failed: %o",_,ee)}}},ft=function(_){if(!_){st();return}pt||(xe("subscribe-worker-queue",{id:Ll}).catch(y=>{t("subscribe-worker-queue failed: %o",y)}),pt=()=>xe("unsubscribe-worker-queue",{id:Ll}))},st=function(){pt&&(pt().catch(()=>{}),pt=null)},_t=function(_){if(!_){F();return}nt||(xe("subscribe-monitor-pipeline",{id:Il}).catch(y=>{t("subscribe-monitor-pipeline failed: %o",y)}),nt=()=>xe("unsubscribe-monitor-pipeline",{id:Il}))},F=function(){nt&&(nt().catch(()=>{}),nt=null)},ce=function(){W||(xe("subscribe-ui-order",{id:Ol}).catch(_=>{t("subscribe-ui-order failed: %o",_)}),W=()=>xe("unsubscribe-ui-order",{id:Ol}))},_e=function(){W&&(W().catch(()=>{}),W=null),te.clear()},Re=function(){be||(xe("subscribe-display-policy",{id:Dl}).catch(_=>{t("subscribe-display-policy failed: %o",_)}),be=()=>xe("unsubscribe-display-policy",{id:Dl}))},He=function(){be&&(be().catch(()=>{}),be=null),me.clear()},Ce=function(){Ke||(xe("subscribe-exec-presets",{id:Ml}).catch(_=>{t("subscribe-exec-presets failed: %o",_)}),Ke=()=>xe("unsubscribe-exec-presets",{id:Ml}))},oe=function(_){if(!_)return"Unknown";let y=_.split("/").filter(Boolean);return y.length>0?y[y.length-1]:"Unknown"};var d=Oe,u=Ye,f=m,v=w,E=ne,S=Ee,C=it,q=ze,$=ut,Y=yt,J=Te,L=ft,O=st,x=_t,B=F,R=ce,pe=_e,$e=Re,ae=He,ye=Ce,De=oe;let Qe=document.getElementById("header-loading"),tt=ha(Qe),Ne=Fi(e),fe=Cl(),xe=tt.wrapSend((_,y)=>fe.send(_,y)),Le=da(xe),Z=ua(),he=fa(),j=Ko(),te=pa(),me=Yo(),Ie=Vo(),P=Zo();fe.on("exec-presets-snapshot",_=>{let y=_;y&&typeof y.revision=="number"&&Array.isArray(y.presets)&&Ie.set({revision:y.revision,presets:y.presets})}),fe.on("monitor-pipeline-snapshot",_=>{let y=_;if(!(!y||!Array.isArray(y.workspaces)))try{j.set(y.workspaces,y.workspaces_state)}catch{}}),fe.on("ui-order-snapshot",_=>{let y=_;if(y&&typeof y.revision=="number")try{te.set({revision:y.revision,order:y.order&&typeof y.order=="object"?y.order:{}})}catch{}}),fe.on("display-policy-snapshot",_=>{let y=_;if(y&&y.policy&&typeof y.policy=="object")try{me.set(y.policy)}catch{}}),fe.on("session-log-snapshot",_=>{let y=_;if(y&&typeof y.attempt_id=="string")try{P.set(y.attempt_id,Array.isArray(y.lines)?y.lines:[],typeof y.last_event_at=="number"?y.last_event_at:null)}catch{}}),fe.on("session-log-append",_=>{let y=_;if(y&&typeof y.attempt_id=="string")try{P.append(y.attempt_id,y.event)}catch{}}),fe.on("snapshot",_=>{let y=_,ee=y&&typeof y.id=="string"?y.id:"",se=ee?Z.getStore(ee):null;if(se&&y&&y.type==="snapshot")try{se.applyPush(y)}catch{}}),fe.on("upsert",_=>{let y=_,ee=y&&typeof y.id=="string"?y.id:"",se=ee?Z.getStore(ee):null;if(se&&y&&y.type==="upsert")try{se.applyPush(y)}catch{}}),fe.on("delete",_=>{let y=_,ee=y&&typeof y.id=="string"?y.id:"",se=ee?Z.getStore(ee):null;if(se&&y&&y.type==="delete")try{se.applyPush(y)}catch{}});let N=null,re=null,ve=null,Se=null,Je=()=>{},Ae=new Promise(_=>{Je=()=>_(void 0)}),Ge=!1,qe=!1;async function A(_){let y=Ye(_);if(y===re||y===ve)return;ve=y;let ee=`detail:${_}`,se={type:"issue-detail",params:{id:_}};try{Z.register(ee,se)}catch(K){t("register detail store failed: %o",K)}try{let K=await Le.subscribeList(ee,se);if(ue.getState().selected_id!==_||Ye(_)!==y){await K().catch(()=>{});return}N&&await N().catch(()=>{}),N=K,re=y}catch(K){t("detail subscribe failed: %o",K),Oe(K,"issue details")}finally{ve===y&&(ve=null)}}let I=new Map,G=new Set,X={board:0,worker:0},Ve=Lt;try{let _=window.localStorage.getItem(Pl);Zt(_)&&(Ve=_)}catch{}async function At(_){if(!Zt(_)||_===Ve)return;Ve=_;try{window.localStorage.setItem(Pl,_)}catch{}let y=I.get(_r);if(!y)return;I.delete(_r),await y().catch(()=>{});let ee=it();try{Z.register(_r,ee)}catch(se){t("register %s store failed: %o",_r,se)}try{let se=await Le.subscribeList(_r,ee);I.set(_r,se)}catch(se){t("re-subscribe %s failed: %o",_r,se),Oe(se,"board")}}let lt=new Map,pt=null,nt=null,W=null,be=null,Ke=null;async function et(){be=null,me.clear(),Ke=null,Ie.clear(),pt=null,nt=null,I.clear(),lt.clear(),X.board+=1,X.worker+=1,Ce();let _=ue.getState().workspace.current?.path;if(_)try{await fe.send("set-workspace",{path:_})}catch(ee){t("workspace restore after reconnect failed: %o",ee);return}Re();let y=ue.getState();ze(y.view==="board"),yt(y.view==="worker"),_t(y.view==="monitor"),ft(y.view==="board"||y.view==="worker"||!!y.selected_id)}async function we(){t("clearing all subscriptions for workspace switch"),ut(),Te(),st(),he.clear(),_e(),ce(),He(),Re(),m();let _=ue.getState();if(_.selected_id)try{Z.unregister(`detail:${_.selected_id}`)}catch{}let y=ue.getState();ze(y.view==="board"),yt(y.view==="worker"),_t(y.view==="monitor"),ft(y.view==="board"||y.view==="worker"||!!y.selected_id),y.selected_id&&w(y.selected_id)}async function p(_){t("requesting workspace switch to %s",_),qe=!0;try{let y=await fe.send("set-workspace",{path:_});t("workspace switch result: %o",y),y&&y.workspace&&(ue.setState({workspace:{current:{path:y.workspace.root_dir,database:y.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",_),y.changed&&(await we(),Q("Switched to "+oe(_),"success",2e3)))}catch(y){throw t("workspace switch failed: %o",y),Q("Failed to switch workspace","error",3e3),y}finally{qe=!1}}async function k(_){t("requesting workspace git pull for %s",_);try{let y=await fe.send("git-pull-workspace",{});t("workspace git pull result: %o",y);let ee=y?.status;if(ee==="up_to_date"){Q("Already up to date","success",2e3);return}if(ee==="stash_pop_conflict"){Q("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}Q("Git pulled "+oe(_),"success",2e3)}catch(y){t("workspace git pull failed: %o",y);let ee=y?.code,se=y?.message;if(ee==="rebase_conflict"){Q("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(ee==="rebase_conflict_abort_failed"){Q("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(ee==="busy"){Q("Git pull skipped: another operation is running","warning",3e3);return}let K=se?`: ${se}`:"";throw Q(`Git pull failed${K}`,"error",3e3),y}}async function D(_,y){t("setting workspace visibility %s \u2192 %s",_,String(y));try{await fe.send("set-workspace-visibility",{path:_,visible:y}),await de()}catch(ee){t("workspace visibility update failed: %o",ee),Q("Failed to update project visibility","error",3e3)}}async function de(){try{let _=await fe.send("list-workspaces",{});if(t("workspaces loaded: %o",_),_&&Array.isArray(_.workspaces)){let y=_.workspaces.map(g=>({path:g.path,database:g.database,pid:g.pid,version:g.version})),ee=_.current?{path:_.current.root_dir,database:_.current.db_path}:null,se=Array.isArray(_.hidden)?_.hidden.filter(g=>typeof g=="string"):[];ue.setState({workspace:{current:ee,available:y,hidden:se}});let K=window.localStorage.getItem("beads-ui.workspace");K&&(!y.some(M=>M.path===K)||se.includes(K)?window.localStorage.removeItem("beads-ui.workspace"):ee&&K!==ee.path&&(t("restoring saved workspace preference: %s",K),await p(K)))}}catch(_){t("failed to load workspaces: %o",_)}}fe.on("workspace-changed",_=>{t("workspace-changed event: %o",_),_&&_.root_dir&&(ue.setState({workspace:{current:{path:_.root_dir,database:_.db_path}}}),de(),we())});let ge=!1;if(typeof fe.onConnection=="function"){let _=y=>{t("ws state %s",y),y==="reconnecting"||y==="closed"?(ge=!0,Q("Connection lost. Reconnecting\u2026","error",4e3)):y==="open"&&ge&&(ge=!1,Q("Reconnected","success",2200),nf(ue,(ee,se)=>{t(`${ee}: %o`,se)}),et())};fe.onConnection(_)}let ie="board";try{let _=window.localStorage.getItem("beads-ui.view");(_==="board"||_==="worker"||_==="monitor")&&(ie=_)}catch(_){t("view parse error: %o",_)}let ue=ga({config:rf(),view:ie});fe.on("worker-queue-snapshot",_=>{let y=_;if(!y||!y.queue)return;let ee=ue.getState().workspace.current?.path;if(typeof ee=="string"&&ee.length>0&&y.root_dir!==ee){t("dropping worker-queue snapshot for %s",String(y.root_dir));return}try{he.set(y.queue)}catch{}});let Me=_a(ue);Me.start();let ot=new Set(["get-comments","exec-preset-create","exec-preset-update","exec-preset-delete","apply-exec-preset"]),bt=async(_,y)=>{try{return await xe(_,y)}catch(ee){if(ot.has(_))throw ee;return[]}};n&&dl(n,ue,Me);let at=document.getElementById("workspace-picker");at&&Al(at,ue,p,k,D);let mt=_l(e,(_,y)=>xe(_,y));try{let _=document.getElementById("new-issue-btn");_&&_.addEventListener("click",()=>mt.open())}catch{}let Rt=qi(e,{policyStore:me,transport:(_,y)=>xe(_,y),labelOptions:()=>{let _=new Set;for(let[y]of bo)for(let ee of Z.snapshotFor(y)||[]){let se=ee.labels;if(Array.isArray(se))for(let K of se)typeof K=="string"&&K.length>0&&_.add(K)}return Array.from(_).sort()}});try{let _=document.getElementById("display-settings-btn");_&&_.addEventListener("click",()=>Rt.open())}catch{}let Mt=Aa(o,{gotoIssue:_=>Me.gotoIssue(_),issueStores:Z,transport:bt,workerQueueStore:he,uiOrderStore:te,displayPolicyStore:me,closedRange:Ve,onClosedRangeChange:_=>{At(_)},onNewIssue:()=>mt.open()}),Tt=mo(a,{transport:bt,issueStores:Z,queueStore:he,execPresetStore:Ie,sessionLogStore:P,uiOrderStore:te,gotoIssue:_=>ue.setState({selected_id:_}),getWorkspacePath:()=>ue.getState().workspace.current?.path}),It=cl(i,{transport:bt,pipelineStore:j,execPresetStore:Ie,gotoIssue:_=>Me.gotoIssue(_),getWorkspacePath:()=>ue.getState().workspace.current?.path,switchWorkspace:_=>p(_)}),H=Pi(l,{issueStores:Z,transport:bt,queueStore:he,execPresetStore:Ie,sessionLogStore:P,getWorkspacePath:()=>ue.getState().workspace.current?.path,onNavigate:_=>{ue.getState().view==="worker"?ue.setState({selected_id:_}):Me.gotoIssue(_)},onClose:()=>{let _=ue.getState();ue.setState({selected_id:null});try{Me.gotoView(_.view==="worker"||_.view==="monitor"?_.view:"board")}catch{}},onOpenExecPresets:()=>{ue.setState({selected_id:null}),Me.gotoView("worker"),Tt.openExecDefaults()}}),h=ue.getState().selected_id;h&&(l.hidden=!1,H.load(h),w(h)),ue.subscribe(_=>{let y=_.selected_id;y?(l.hidden=!1,H.load(y),qe||w(y)):(H.clear(),l.hidden=!0,m())});let z=_=>{o.hidden=_.view!=="board",a.hidden=_.view!=="worker",i.hidden=_.view!=="monitor",ze(_.view==="board"),yt(_.view==="worker"),_t(_.view==="monitor"),ft(_.view==="board"||_.view==="worker"||!!_.selected_id),!_.selected_id&&_.view==="board"&&Mt.load(),_.view==="worker"&&Tt.load(),_.view==="monitor"?It.load():It.pause(),window.localStorage.setItem("beads-ui.view",_.view)};ue.subscribe(z),z(ue.getState()),ce(),Re(),Ce(),de().finally(()=>{Ge=!0,Je()}),window.addEventListener("keydown",_=>{let y=_.ctrlKey||_.metaKey,ee=String(_.key||"").toLowerCase(),se=_.target,K=se&&se.tagName?String(se.tagName).toLowerCase():"",g=K==="input"||K==="textarea"||K==="select"||se&&typeof se.isContentEditable=="boolean"&&se.isContentEditable;y&&ee==="n"&&(g||(_.preventDefault(),mt.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let r=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let t=document.getElementById("app");t&&sf(t)});export{sf as bootstrap,rf as readBootstrapConfig,nf as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
