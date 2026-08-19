var Gd=Object.create;var io=Object.defineProperty;var Vd=Object.getOwnPropertyDescriptor;var Yd=Object.getOwnPropertyNames;var Kd=Object.getPrototypeOf,Zd=Object.prototype.hasOwnProperty;var Xd=(e,t,r)=>t in e?io(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var lo=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Qd=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Yd(t))!Zd.call(e,s)&&s!==r&&io(e,s,{get:()=>t[s],enumerable:!(n=Vd(t,s))||n.enumerable});return e};var Jd=(e,t,r)=>(r=e!=null?Gd(Kd(e)):{},Qd(t||!e||!e.__esModule?io(r,"default",{value:e,enumerable:!0}):r,e));var nt=(e,t,r)=>Xd(e,typeof t!="symbol"?t+"":t,r);var fi=lo((Gm,pi)=>{var Vr=1e3,Yr=Vr*60,Kr=Yr*60,Mr=Kr*24,ru=Mr*7,nu=Mr*365.25;pi.exports=function(e,t){t=t||{};var r=typeof e;if(r==="string"&&e.length>0)return su(e);if(r==="number"&&isFinite(e))return t.long?au(e):ou(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function su(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*nu;case"weeks":case"week":case"w":return r*ru;case"days":case"day":case"d":return r*Mr;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Kr;case"minutes":case"minute":case"mins":case"min":case"m":return r*Yr;case"seconds":case"second":case"secs":case"sec":case"s":return r*Vr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function ou(e){var t=Math.abs(e);return t>=Mr?Math.round(e/Mr)+"d":t>=Kr?Math.round(e/Kr)+"h":t>=Yr?Math.round(e/Yr)+"m":t>=Vr?Math.round(e/Vr)+"s":e+"ms"}function au(e){var t=Math.abs(e);return t>=Mr?ts(e,t,Mr,"day"):t>=Kr?ts(e,t,Kr,"hour"):t>=Yr?ts(e,t,Yr,"minute"):t>=Vr?ts(e,t,Vr,"second"):e+" ms"}function ts(e,t,r,n){var s=t>=r*1.5;return Math.round(e/r)+" "+n+(s?"s":"")}});var mi=lo((Vm,_i)=>{function iu(e){r.debug=r,r.default=r,r.coerce=l,r.disable=a,r.enable=s,r.enabled=i,r.humanize=fi(),r.destroy=d,Object.keys(e).forEach(f=>{r[f]=e[f]}),r.names=[],r.skips=[],r.formatters={};function t(f){let _=0;for(let g=0;g<f.length;g++)_=(_<<5)-_+f.charCodeAt(g),_|=0;return r.colors[Math.abs(_)%r.colors.length]}r.selectColor=t;function r(f){let _,g=null,S,k;function M(...D){if(!M.enabled)return;let E=M,B=Number(new Date),ee=B-(_||B);E.diff=ee,E.prev=_,E.curr=B,_=B,D[0]=r.coerce(D[0]),typeof D[0]!="string"&&D.unshift("%O");let A=0;D[0]=D[0].replace(/%([a-zA-Z%])/g,(R,N)=>{if(R==="%%")return"%";A++;let Z=r.formatters[N];if(typeof Z=="function"){let fe=D[A];R=Z.call(E,fe),D.splice(A,1),A--}return R}),r.formatArgs.call(E,D),(E.log||r.log).apply(E,D)}return M.namespace=f,M.useColors=r.useColors(),M.color=r.selectColor(f),M.extend=n,M.destroy=r.destroy,Object.defineProperty(M,"enabled",{enumerable:!0,configurable:!1,get:()=>g!==null?g:(S!==r.namespaces&&(S=r.namespaces,k=r.enabled(f)),k),set:D=>{g=D}}),typeof r.init=="function"&&r.init(M),M}function n(f,_){let g=r(this.namespace+(typeof _>"u"?":":_)+f);return g.log=this.log,g}function s(f){r.save(f),r.namespaces=f,r.names=[],r.skips=[];let _=(typeof f=="string"?f:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let g of _)g[0]==="-"?r.skips.push(g.slice(1)):r.names.push(g)}function o(f,_){let g=0,S=0,k=-1,M=0;for(;g<f.length;)if(S<_.length&&(_[S]===f[g]||_[S]==="*"))_[S]==="*"?(k=S,M=g,S++):(g++,S++);else if(k!==-1)S=k+1,M++,g=M;else return!1;for(;S<_.length&&_[S]==="*";)S++;return S===_.length}function a(){let f=[...r.names,...r.skips.map(_=>"-"+_)].join(",");return r.enable(""),f}function i(f){for(let _ of r.skips)if(o(f,_))return!1;for(let _ of r.names)if(o(f,_))return!0;return!1}function l(f){return f instanceof Error?f.stack||f.message:f}function d(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}_i.exports=iu});var gi=lo((It,rs)=>{It.formatArgs=cu;It.save=du;It.load=uu;It.useColors=lu;It.storage=pu();It.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();It.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function lu(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function cu(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+rs.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let r=0,n=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),e.splice(n,0,t)}It.log=console.debug||console.log||(()=>{});function du(e){try{e?It.storage.setItem("debug",e):It.storage.removeItem("debug")}catch{}}function uu(){let e;try{e=It.storage.getItem("debug")||It.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function pu(){try{return localStorage}catch{}}rs.exports=mi()(It);var{formatters:fu}=rs.exports;fu.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var cn=globalThis,Kn=cn.trustedTypes,Xa=Kn?Kn.createPolicy("lit-html",{createHTML:e=>e}):void 0,uo="$lit$",dr=`lit$${Math.random().toFixed(9).slice(2)}$`,po="?"+dr,eu=`<${po}>`,Lr=document,dn=()=>Lr.createComment(""),un=e=>e===null||typeof e!="object"&&typeof e!="function",fo=Array.isArray,ni=e=>fo(e)||typeof e?.[Symbol.iterator]=="function",co=`[ 	
\f\r]`,ln=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Qa=/-->/g,Ja=/>/g,Rr=RegExp(`>|${co}(?:([^\\s"'>=/]+)(${co}*=${co}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ei=/'/g,ti=/"/g,si=/^(?:script|style|textarea|title)$/i,_o=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),c=_o(1),kr=_o(2),Fm=_o(3),jt=Symbol.for("lit-noChange"),ut=Symbol.for("lit-nothing"),ri=new WeakMap,Ir=Lr.createTreeWalker(Lr,129);function oi(e,t){if(!fo(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Xa!==void 0?Xa.createHTML(t):t}var ai=(e,t)=>{let r=e.length-1,n=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=ln;for(let i=0;i<r;i++){let l=e[i],d,f,_=-1,g=0;for(;g<l.length&&(a.lastIndex=g,f=a.exec(l),f!==null);)g=a.lastIndex,a===ln?f[1]==="!--"?a=Qa:f[1]!==void 0?a=Ja:f[2]!==void 0?(si.test(f[2])&&(s=RegExp("</"+f[2],"g")),a=Rr):f[3]!==void 0&&(a=Rr):a===Rr?f[0]===">"?(a=s??ln,_=-1):f[1]===void 0?_=-2:(_=a.lastIndex-f[2].length,d=f[1],a=f[3]===void 0?Rr:f[3]==='"'?ti:ei):a===ti||a===ei?a=Rr:a===Qa||a===Ja?a=ln:(a=Rr,s=void 0);let S=a===Rr&&e[i+1].startsWith("/>")?" ":"";o+=a===ln?l+eu:_>=0?(n.push(d),l.slice(0,_)+uo+l.slice(_)+dr+S):l+dr+(_===-2?i:S)}return[oi(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},pn=class e{constructor({strings:t,_$litType$:r},n){let s;this.parts=[];let o=0,a=0,i=t.length-1,l=this.parts,[d,f]=ai(t,r);if(this.el=e.createElement(d,n),Ir.currentNode=this.el.content,r===2||r===3){let _=this.el.content.firstChild;_.replaceWith(..._.childNodes)}for(;(s=Ir.nextNode())!==null&&l.length<i;){if(s.nodeType===1){if(s.hasAttributes())for(let _ of s.getAttributeNames())if(_.endsWith(uo)){let g=f[a++],S=s.getAttribute(_).split(dr),k=/([.?@])?(.*)/.exec(g);l.push({type:1,index:o,name:k[2],strings:S,ctor:k[1]==="."?Xn:k[1]==="?"?Qn:k[1]==="@"?Jn:Pr}),s.removeAttribute(_)}else _.startsWith(dr)&&(l.push({type:6,index:o}),s.removeAttribute(_));if(si.test(s.tagName)){let _=s.textContent.split(dr),g=_.length-1;if(g>0){s.textContent=Kn?Kn.emptyScript:"";for(let S=0;S<g;S++)s.append(_[S],dn()),Ir.nextNode(),l.push({type:2,index:++o});s.append(_[g],dn())}}}else if(s.nodeType===8)if(s.data===po)l.push({type:2,index:o});else{let _=-1;for(;(_=s.data.indexOf(dr,_+1))!==-1;)l.push({type:7,index:o}),_+=dr.length-1}o++}}static createElement(t,r){let n=Lr.createElement("template");return n.innerHTML=t,n}};function Or(e,t,r=e,n){if(t===jt)return t;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=un(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(t=Or(e,s._$AS(e,t.values),s,n)),t}var Zn=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:n}=this._$AD,s=(t?.creationScope??Lr).importNode(r,!0);Ir.currentNode=s;let o=Ir.nextNode(),a=0,i=0,l=n[0];for(;l!==void 0;){if(a===l.index){let d;l.type===2?d=new Gr(o,o.nextSibling,this,t):l.type===1?d=new l.ctor(o,l.name,l.strings,this,t):l.type===6&&(d=new es(o,this,t)),this._$AV.push(d),l=n[++i]}a!==l?.index&&(o=Ir.nextNode(),a++)}return Ir.currentNode=Lr,s}p(t){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}},Gr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,n,s){this.type=2,this._$AH=ut,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=Or(this,t,r),un(t)?t===ut||t==null||t===""?(this._$AH!==ut&&this._$AR(),this._$AH=ut):t!==this._$AH&&t!==jt&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):ni(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==ut&&un(this._$AH)?this._$AA.nextSibling.data=t:this.T(Lr.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=pn.createElement(oi(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new Zn(s,this),a=o.u(this.options);o.p(r),this.T(a),this._$AH=o}}_$AC(t){let r=ri.get(t.strings);return r===void 0&&ri.set(t.strings,r=new pn(t)),r}k(t){fo(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of t)s===r.length?r.push(n=new e(this.O(dn()),this.O(dn()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Pr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,n,s,o){this.type=1,this._$AH=ut,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=ut}_$AI(t,r=this,n,s){let o=this.strings,a=!1;if(o===void 0)t=Or(this,t,r,0),a=!un(t)||t!==this._$AH&&t!==jt,a&&(this._$AH=t);else{let i=t,l,d;for(t=o[0],l=0;l<o.length-1;l++)d=Or(this,i[n+l],r,l),d===jt&&(d=this._$AH[l]),a||(a=!un(d)||d!==this._$AH[l]),d===ut?t=ut:t!==ut&&(t+=(d??"")+o[l+1]),this._$AH[l]=d}a&&!s&&this.j(t)}j(t){t===ut?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Xn=class extends Pr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===ut?void 0:t}},Qn=class extends Pr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==ut)}},Jn=class extends Pr{constructor(t,r,n,s,o){super(t,r,n,s,o),this.type=5}_$AI(t,r=this){if((t=Or(this,t,r,0)??ut)===jt)return;let n=this._$AH,s=t===ut&&n!==ut||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==ut&&(n===ut||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},es=class{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){Or(this,t)}},ii={M:uo,P:dr,A:po,C:1,L:ai,R:Zn,D:ni,V:Or,I:Gr,H:Pr,N:Qn,U:Jn,B:Xn,F:es},tu=cn.litHtmlPolyfillSupport;tu?.(pn,Gr),(cn.litHtmlVersions??(cn.litHtmlVersions=[])).push("3.3.1");var Be=(e,t,r)=>{let n=r?.renderBefore??t,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new Gr(t.insertBefore(dn(),o),o,void 0,r??{})}return s._$AI(e),s};var Pt="today",sr=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Bt(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function Dr(e,t=Date.now()){switch(e){case"today":{let r=new Date(t);return r.setHours(0,0,0,0),r.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function li(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function ci(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function di(){let e=null,t=[],r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],n()},clear(){e=null,t=[],n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function ui(){let e=new Map,t=new Set;function r(s){return s.startsWith("session-log:")?s:`session-log:${s}`}function n(){for(let s of Array.from(t))try{s()}catch{}}return{set(s,o,a=null){e.set(r(s),{lines:Array.isArray(o)?[...o]:[],last_event_at:typeof a=="number"?a:null}),n()},append(s,o){let a=r(s),i=e.get(a)||{lines:[],last_event_at:null};i.lines=[...i.lines,o],i.last_event_at=Date.now(),e.set(a,i),n()},get(s){return e.get(r(s))||null},clear(s){typeof s=="string"?e.delete(r(s)):e.clear(),n()},subscribe(s){return t.add(s),()=>t.delete(s)}}}var bi=Jd(gi(),1);function ct(e){return(0,bi.default)(`beads-ui:${e}`)}function Kt(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Nr(e,t){let r=Kt(e.created_at),n=Kt(t.created_at);if(r!==n)return r<n?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function yi(e,t){let r=Kt(e.created_at),n=Kt(t.created_at);if(r!==n)return r<n?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function wi(e,t){let r=Kt(e.updated_at),n=Kt(t.updated_at);if(r!==n)return r<n?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function ki(e,t){let r=e.priority??2,n=t.priority??2;if(r!==n)return r-n;let s=Kt(e.created_at),o=Kt(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function $i(e,t){let r=e.closed_at??0,n=t.closed_at??0;if(r!==n)return r<n?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var _u=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function hi(e){let t=e&&e.metadata,r=t?t.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function vi(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let r=_u.exec(t);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function xi(e,t){let r=hi(e),n=hi(t);if(r!==n)return r<n?-1:1;let s=vi(e),o=vi(t);if(s!==o)return s<o?-1:1;let a=Kt(e&&e.created_at),i=Kt(t&&t.created_at);if(a!==i)return a<i?-1:1;let l=e&&e.id,d=t&&t.id;return l===d?0:String(l)<String(d)?-1:1}var mo=2**20;function Zr(e,t){let r=e&&e.id;return t&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(t,r)&&typeof t[r]=="number"&&Number.isFinite(t[r])?t[r]:-Kt(e&&e.created_at)}function ns(e){return(t,r)=>{let n=Zr(t,e),s=Zr(r,e);if(n!==s)return n<s?-1:1;let o=t?.id,a=r?.id;return o<a?-1:o>a?1:0}}function go(e,t,r){let n=Array.isArray(e)?e:[],s=n.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?n[o-1]:null,i=o+1<s?n[o+1]:null;if(!a&&!i)return{rank:0};if(!a)return{rank:Zr(i,r)-mo};if(!i)return{rank:Zr(a,r)+mo};let l=Zr(a,r),d=Zr(i,r),f=(l+d)/2;return l<f&&f<d?{rank:f}:{renormalize:n.map((_,g)=>({bead_id:_.id,rank:g*mo}))}}function bo(e,t={}){let r=ct(`issue-store:${e}`),n=new Map,s=[],o=0,a=new Set,i=!1,l=t.sort||Nr;function d(){for(let g of Array.from(a))try{g()}catch{}}function f(){s=Array.from(n.values()).sort(l)}function _(g){if(i||!g||g.id!==e)return;let S=Number(g.revision)||0;if(r("apply %s rev=%d",g.type,S),!(S<=o&&g.type!=="snapshot")){if(g.type==="snapshot"){if(S<=o)return;n.clear();let k=Array.isArray(g.issues)?g.issues:[];for(let M of k)M&&typeof M.id=="string"&&M.id.length>0&&n.set(M.id,M);f(),o=S,d();return}if(g.type==="upsert"){let k=g.issue;if(k&&typeof k.id=="string"&&k.id.length>0){let M=n.get(k.id);if(!M)n.set(k.id,k);else{let D=Number.isFinite(M.updated_at)?M.updated_at:0,E=Number.isFinite(k.updated_at)?k.updated_at:0;if(D<=E){for(let B of Object.keys(M))B in k||delete M[B];for(let[B,ee]of Object.entries(k))M[B]=ee}}f()}o=S,d()}else if(g.type==="delete"){let k=String(g.issue_id||"");k&&(n.delete(k),f()),o=S,d()}}}return{id:e,subscribe(g){return a.add(g),()=>{a.delete(g)}},applyPush:_,snapshot(){return s},size(){return n.size},getById(g){return n.get(g)},dispose(){i=!0,n.clear(),s=[],a.clear(),o=0}}}function ss(e){let t=String(e.type||"").trim(),r={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];r[o]=String(a)}}let n=new URLSearchParams(r).toString();return n.length>0?`${t}?${n}`:t}function Si(e){let t=ct("subs"),r=new Map,n=new Map;function s(i,l){t("applyDelta %s +%d ~%d -%d",i,(l.added||[]).length,(l.updated||[]).length,(l.removed||[]).length);let d=n.get(i);if(!d||d.size===0)return;let f=Array.isArray(l.added)?l.added:[],_=Array.isArray(l.updated)?l.updated:[],g=Array.isArray(l.removed)?l.removed:[];for(let S of Array.from(d)){let k=r.get(S);if(!k)continue;let M=k.itemsById;for(let D of f)typeof D=="string"&&D.length>0&&M.set(D,!0);for(let D of _)typeof D=="string"&&D.length>0&&M.set(D,!0);for(let D of g)typeof D=="string"&&D.length>0&&M.delete(D)}}async function o(i,l){let d=ss(l);if(t("subscribe %s key=%s",i,d),!r.has(i))r.set(i,{key:d,itemsById:new Map});else{let _=r.get(i);if(_&&_.key!==d){let g=n.get(_.key);g&&(g.delete(i),g.size===0&&n.delete(_.key)),r.set(i,{key:d,itemsById:new Map})}}n.has(d)||n.set(d,new Set);let f=n.get(d);f&&f.add(i);try{await e("subscribe-list",{id:i,type:l.type,params:l.params})}catch(_){let g=r.get(i)||null;if(g){let S=n.get(g.key);S&&(S.delete(i),S.size===0&&n.delete(g.key))}throw r.delete(i),_}return async()=>{t("unsubscribe %s key=%s",i,d);try{await e("unsubscribe-list",{id:i})}catch{}let _=r.get(i)||null;if(_){let g=n.get(_.key);g&&(g.delete(i),g.size===0&&n.delete(_.key))}r.delete(i)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:ss,selectors:{getIds(i){let l=r.get(i);return l?Array.from(l.itemsById.keys()):[]},has(i,l){let d=r.get(i);return d?d.itemsById.has(l):!1},count(i){let l=r.get(i);return l?l.itemsById.size:0},getItemsById(i){let l=r.get(i),d={};if(!l)return d;for(let f of l.itemsById.keys())d[f]=!0;return d}}}}function Ai(){let e=ct("issue-stores"),t=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let l of Array.from(n))try{l()}catch{}}function a(l,d,f){let _=d?ss(d):"",g=r.get(l)||"",S=t.has(l);if(e("register %s key=%s (prev=%s)",l,_,g),S&&g&&_&&g!==_){let k=t.get(l);if(k)try{k.dispose()}catch{}let M=s.get(l);if(M){try{M()}catch{}s.delete(l)}let D=bo(l,f);t.set(l,D);let E=D.subscribe(()=>o());s.set(l,E)}else if(!S){let k=bo(l,f);t.set(l,k);let M=k.subscribe(()=>o());s.set(l,M)}return r.set(l,_),()=>i(l)}function i(l){e("unregister %s",l),r.delete(l);let d=t.get(l);d&&(d.dispose(),t.delete(l));let f=s.get(l);if(f){try{f()}catch{}s.delete(l)}}return{register:a,unregister:i,getStore(l){return t.get(l)||null},snapshotFor(l){let d=t.get(l);return d?d.snapshot().slice():[]},subscribe(l){return n.add(l),()=>n.delete(l)}}}function Ei(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Ti(){let e=null,t=!1,r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},set(s){e=s,n()},isPending(){return t},setPending(s){let o=s===!0;o!==t&&(t=o,n())},clear(){e=null,t=!1,n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function Ci(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function ho(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function mu(e){let t=String(e||""),r=t.startsWith("#")?t.slice(1):t,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let i=new URLSearchParams(s).get("issue");if(i)return decodeURIComponent(i)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function gu(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function Ri(e){let t=ct("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):mu(n),a=gu(n);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let l=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==l&&(window.location.hash=l)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=ho(o,n);t("goto issue %s (view=%s)",n,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?ho(n,o):`#/${n}`;t("goto view %s (id=%s)",n,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var bu=Object.freeze({workspace_config:{default_workspace:null}});function Ii(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:bu.workspace_config.default_workspace}}}function Li(e={}){let t=ct("state"),r={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:Ii(e.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let a={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?Ii(o.config):r.config},i=a.workspace.current?.path!==r.workspace.current?.path||a.workspace.available.length!==r.workspace.available.length||a.workspace.hidden.length!==r.workspace.hidden.length||a.workspace.hidden.some((d,f)=>d!==r.workspace.hidden[f]),l=a.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;a.selected_id===r.selected_id&&a.view===r.view&&a.filters.status===r.filters.status&&a.filters.search===r.filters.search&&a.filters.type===r.filters.type&&a.board.closed_filter===r.board.closed_filter&&a.worker.selected_parent_id===r.worker.selected_parent_id&&a.worker.show_closed_children.length===r.worker.show_closed_children.length&&a.worker.show_closed_children.every((d,f)=>d===r.worker.show_closed_children[f])&&!i&&!l||(r=a,t("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function Oi(e){let t=ct("activity"),r=0,n=new Map,s=1;function o(){if(!e)return;let d=r>0;e.toggleAttribute("hidden",!d),e.setAttribute("aria-busy",d?"true":"false")}function a(){r+=1,t("start count=%d",r),o()}function i(){let d=r;r=Math.max(0,r-1),d<=0?t("done called but count was already %d",d):t("done count=%d\u2192%d",d,r),o()}function l(d){return async(_,g)=>{let S=s++,k=Date.now();n.set(S,{type:_,start_ts:k}),t("request start id=%d type=%s count=%d",S,_,r+1),a();let M=!1,D=()=>{M||(M=!0,n.delete(S),i())},E=setTimeout(()=>{M||(t("request TIMEOUT id=%d type=%s elapsed=%dms",S,_,Date.now()-k),D())},3e4);try{let B=await d(_,g),ee=Date.now()-k;return t("request done id=%d type=%s elapsed=%dms",S,_,ee),B}catch(B){let ee=Date.now()-k;throw t("request error id=%d type=%s elapsed=%dms err=%o",S,_,ee,B),B}finally{clearTimeout(E),D()}}}return o(),{wrapSend:l,start:a,done:i,getCount:()=>r,getActiveRequests:()=>{let d=Date.now();return Array.from(n.entries()).map(([f,_])=>({id:f,type:_.type,elapsed_ms:d-_.start_ts}))}}}function le(e,t="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=e,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",t==="success"?n.style.background="#156d36":t==="warning"?n.style.background="#a36a00":t==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function os(e=void 0,t=void 0){function r(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function n(o,a,i){let l=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return l.sort($i),l;switch(i){case"created_desc":return l.sort(Nr),l;case"created_asc":return l.sort(yi),l;case"updated_desc":return l.sort(wi),l;case"priority":return l.sort(ki),l;case"manual":default:{let d=r();return d?l.sort(ns(d)):l.sort(Nr),l}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let i of a)try{i()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function qr(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function vt(e){let t=qr(e);if(t===null)return"";let r=new Date(t),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function Dt(e,t){let r=qr(e);if(r===null)return"";let s=(typeof t=="number"?t:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let i=Math.floor(s/864e5);if(i<7)return`${i}\uC77C \uC804`;let l=Math.floor(i/7);if(i<30)return`${l}\uC8FC \uC804`;let d=Math.floor(i/30);return d<12?`${d}\uAC1C\uC6D4 \uC804`:`${Math.floor(i/365)}\uB144 \uC804`}function as(e){if(!Array.isArray(e))return null;let t=null,r=-1;for(let n of e){if(!n||n.status!=="in_progress")continue;let s=qr(n.updated_at)??0;if(t===null||s>r){t=n,r=s;continue}s===r&&String(n.id)<String(t.id)&&(t=n)}return t}function is(e){let t=e.transport,r=e.uiOrderStore;function n(a,i){return"renormalize"in a?a.renormalize:[{bead_id:i,rank:a.rank}]}function s(a,i){let l={...a.order};for(let d of i)l[d.bead_id]=d.rank;r&&r.set({revision:a.revision,order:l})}async function o(a,i,l){if(!t||!r)return;let d=r.get()||{revision:0,order:{}},f=n(go(i,l,d.order),a);s(d,f);let _=await t("ui-order-set",{expected_revision:d.revision,entries:f});if(_&&_.conflict){let g={revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}};r.set(g);let S=n(go(i,l,g.order),a);s(g,S);let k=await t("ui-order-set",{expected_revision:g.revision,entries:S});k&&k.applied&&r.set({revision:typeof k.revision=="number"?k.revision:0,order:k.order||{}})}else _&&_.applied&&r.set({revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}})}return{applyReorder:o}}function ls(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function vo(e,t){return!t||typeof e!="string"||e.length===0||ls(t.visible_labels).includes(e)?!0:ls(t.hidden_labels).includes(e)?!1:!ls(t.hidden_prefixes).some(r=>r.length>0&&e.startsWith(r))}function cs(e,t){return ls(e).filter(r=>vo(r,t))}function $r(e,t){let r=e&&e.chips?e.chips[t]:void 0;return typeof r=="boolean"?r:!0}var hu={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},Di={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},Pi={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},vu={review:"\u2713",skip:"\u2298"},xr={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function yu(e,t,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function Mi(e){let t=e&&e.fill||"none";return t==="none"?xr.none:e&&e.stale===!0?xr.stale:t==="dim"?xr.dim:e&&e.glyph==="review"?xr.review:e&&e.glyph==="skip"?xr.skip:xr.done}function wu(e){if(!e||e.fill==="none"||!e.approval_state)return Mi(e);let t=[];return e.glyph==="review"?t.push(xr.review):e.glyph==="skip"&&t.push(xr.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function ku(e,t,r){let n=hu[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,a=vu[t&&t.glyph||""]||"",i="bar";s==="dim"?i+=` b-${n} dim`:s==="full"&&(i+=` b-${n} full`),o&&(i+=" stale"),r&&(i+=" cur");let l=s==="none"?"lbl":`lbl l-${n} on`,d=r?`color: var(--stage-${n}-on)`:"";return c`
    <div class="seg">
      <div class=${i} style=${d}>${a}</div>
      <div class=${l}>
        ${Di[e]||e}
      </div>
    </div>
  `}function ds(e,t){if(!e||!e.stages)return"";let r=Pi[e.route]||Pi.spec_backed,n=e.stages,s=yu(r,n,String(t||"open")),o=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${r.map(a=>`${Di[a]||a} ${a==="plan"?wu(n[a]||{}):Mi(n[a]||{})}`).join(" \xB7 ")}`;return c`
    <div class="stp" role="img" aria-label=${o}>
      ${r.map(a=>ku(a,n[a]||{},a===s))}
    </div>
  `}function $u(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Ni=2;function xu(e){if(!e)return[];let t=[];if(e.external){let n=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(c`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(e.blockers)?e.blockers:[];if(r.length>0){let n=r.slice(0,Ni).join(", "),s=r.length-Ni,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;t.push(c`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function yo(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function us(e,t){if(!e)return null;let r=yo(e.kind),n=e.reason,s=e.kind==="delegated"?n===null:typeof n=="string"&&n.trim().length>0&&!/[\r\n]/.test(n);if(!r||!s)return null;let o=yo(t?.kind),a=o!==null&&t?.kind!==e.kind,i=`\uACC4\uD68D \xB7 ${r}${a?` \u2192 ${o}`:""}`,l=`planned_execution ${e.kind}${typeof n=="string"?`:${n}`:""}`,d=t?` \xB7 exec_receipt ${t.kind}:${t.actor}@${t.sha}`:"";return{kind:e.kind,label:i,title:`${l}${d}`}}function qi(e,t){let r=us(e,t);return r?c`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${r.kind}
        title=${r.title}
        >${r.label}</span
      >`:null}function Su(e){if(!e)return null;let t=yo(e.kind);return t?c`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${e.kind}:${e.actor}@${e.sha}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function Au(e,t){let r=t.policy||null,n=e.workflow&&e.workflow.chips||{},s=[];if(n.route&&$r(r,"route")){let i=n.route_source==="derived";s.push(c`<span
        class="ctl-chip ctl-chip--route${i?" is-derived":""}"
        title=${i?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${i?"unset":n.route}</span
      >`)}if(n.fast_track&&$r(r,"fast_track")&&s.push(c`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&$r(r,"pr")){let i=n.pr.number;s.push(c`<span class="ctl-chip ctl-chip--pr"
        >${`PR${i!=null?` #${i}`:""}`}</span
      >`)}let o=qi(n.planned_execution,n.exec_receipt);if(o&&s.push(o),n.exec_receipt){let i=n.exec_receipt;s.push(c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${i.kind}:${i.actor}@${i.sha}`}
        >${`exec ${i.kind==="delegated"?i.actor:`main:${i.actor}`} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}if(n.impl_entry){let i=n.impl_entry;s.push(c`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${i.actor}@${i.sha}`}
        >${`impl ${i.actor} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}for(let i of cs(e.labels,r))s.push(c`<span class="ctl-chip ctl-chip--label">${i}</span>`);return e.from_id&&$r(r,"from")&&s.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${i=>{i.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(i,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),$r(r,"blocked")&&s.push(...xu(e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&$r(r,"blocked")&&s.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":c`<div class="board-card__chips">${s}</div>`}function Eu(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function Tu(e){let t=Dt(e.created_at),r=Dt(e.updated_at);return!t&&!r?"":c`<span class="board-card__times">
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
  </span>`}function Cu(e,t){let r=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=t.isExpanded?t.isExpanded(e.id):!0,o=n>0?r.children.slice().sort(xi):r.children;return c`
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
        ${Tu(e)}
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
                  <span class=${Eu(a.status)}>●</span>
                  <span class="board-card__roll-child-ord">${i+1}</span>
                  <span class="board-card__roll-child-title"
                    >${a.title||a.id}</span
                  >
                  ${us(a.workflow?.chips?.planned_execution,a.workflow?.chips?.exec_receipt)?c`<span class="board-card__roll-child-chips">
                        ${qi(a.workflow?.chips?.planned_execution,a.workflow?.chips?.exec_receipt)}
                        ${Su(a.workflow?.chips?.exec_receipt)}
                      </span>`:""}
                </button>`)}
          </div>`:""}
    </div>
  `}function ps(e,t){let r=$u(e.priority);return c`
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
      ${Au(e,t)}
      ${e.workflow&&$r(t.policy||null,"stepper")?ds(e.workflow,e.status):""}
      ${Cu(e,t)}
    </article>
  `}function Xr(e,t){let r=Array.isArray(e.items)?e.items.length:0,n=e.is_closed===!0;return c`
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
              ${sr.map(o=>c`<option
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
        ${e.items.map(o=>ps(o,t))}
      </div>
    </section>
  `}function Fi(e,t,r){return c`
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
          ${e.items.length===0?c`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(n=>ps(n,t))}
        </div>
      </div>
    </dialog>
  `}var Ru=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],Iu=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],Lu=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function Ou(e,t,r){let n=e.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return c`
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
  `}function ji(e,t,r){return c`
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
        ${Ru.map(n=>c`<option
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
        ${Iu.map(n=>c`<option
              value=${n.value}
              ?selected=${e.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${Ou(e,t,r)}
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
        ${Lu.map(n=>c`<option
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
  `}var Pu=200,Du={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},Mu=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Bi="beads-ui.board.sort",Ui=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function Nu(){try{let e=window.localStorage.getItem(Bi);if(e&&Ui.has(e))return e}catch{}return"created_desc"}function Wi(e,t){let r=ct("views:board"),n=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,i=t.displayPolicyStore,l=t.workerQueueStore,d=t.onClosedRangeChange,f=t.onNewIssue,_=t.closedRange||Pt,g=s?os(s,a):null,S=is({transport:o,uiOrderStore:a}),k=[],M=[],D=[],E=[],B=[],ee=[],A=!1,w=0,R=Nu(),N=new Map,Z=new Map,fe=new Map,pe=new Set,ne={search:"",priority:"",type:"",labels:[]},ie=!1,Me=null;function je(z){return String(z.status||"open")==="open"}function He(z){let J=String(z.status||"open");return J==="open"||J==="blocked"}function Ze(z){let J=ne.search.trim().toLowerCase(),ye=ne.priority,we=ne.type,ce=ne.labels;return z.filter(Oe=>{if(J){let tt=String(Oe.id||"").toLowerCase(),Xe=String(Oe.title||"").toLowerCase();if(!tt.includes(J)&&!Xe.includes(J))return!1}if(ye!==""&&String(Oe.priority)!==ye||we!==""&&String(Oe.issue_type||"")!==we)return!1;if(ce.length>0){let tt=Array.isArray(Oe.labels)?Oe.labels:[];if(!ce.some(Xe=>tt.includes(Xe)))return!1}return!0})}function Ve(){let z=new Set;for(let J of[k,M,D,E,B,ee])for(let ye of J){let we=Array.isArray(ye.labels)?ye.labels:[];for(let ce of we)typeof ce=="string"&&ce.length>0&&z.add(ce)}return Array.from(z).sort()}function Ye(){return ne.search.trim()!==""||ne.priority!==""||ne.type!==""||ne.labels.length>0}function me(){try{if(g){let z=g.selectBoardColumn("tab:board:in-progress","in_progress",R),J=g.selectBoardColumn("tab:board:blocked","blocked",R).filter(He),ye=new Set(z.map(Te=>Te.id)),we=g.selectBoardColumn("tab:board:ready","ready",R).filter(Te=>je(Te)&&!ye.has(Te.id)),ce=g.selectBoardColumn("tab:board:resolved","resolved",R),Oe=g.selectBoardColumn("tab:board:deferred","deferred",R),tt=g.selectBoardColumn("tab:board:closed","closed").slice(0,Pu),Xe=[...J,...we,...z,...ce,...tt];xe(Xe);let Pe=new Set;for(let Te of Xe)Te&&Te.id&&!wo(Te)&&Pe.add(Te.id);let Je=!Ye();k=Je?fn(J,Pe):J,M=Je?fn(we,Pe):we,D=Je?fn(z,Pe):z,E=Je?fn(ce,Pe):ce,B=Oe,w=Oe.length,ee=Je?fn(tt,Pe):tt,N=new Map;for(let Te of k)N.set(Te.id,"open");for(let Te of M)N.set(Te.id,"open");for(let Te of D)N.set(Te.id,"in_progress");for(let Te of E)N.set(Te.id,"resolved");for(let Te of B)N.set(Te.id,"deferred");for(let Te of ee)N.set(Te.id,"closed");Z=new Map;for(let Te of k)Z.set(Te.id,"blocked-col");for(let Te of M)Z.set(Te.id,"ready-col");for(let Te of D)Z.set(Te.id,"in-progress-col");for(let Te of E)Z.set(Te.id,"resolved-col");for(let Te of ee)Z.set(Te.id,"closed-col")}Ee()}catch{k=[],M=[],D=[],E=[],B=[],ee=[],fe=new Map,Ee()}}function xe(z){let J=new Map;for(let we of z)we&&we.id&&!J.has(we.id)&&J.set(we.id,we);let ye=new Map;for(let we of J.values()){let ce=wo(we);if(!ce)continue;let Oe=ye.get(ce);Oe||(Oe=[],ye.set(ce,Oe)),Oe.push({id:we.id,title:we.title,status:we.status,metadata:we.metadata,workflow:we.workflow,created_at:we.created_at,updated_at:we.updated_at})}fe=ye}function ke(z){let J=fe.get(z)||[],ye=0;for(let ce of J)(ce.status==="resolved"||ce.status==="closed")&&(ye+=1);let we=as(J);return{total:J.length,count:ye,current:we,children:J}}function Le(z){return!pe.has(z)}function he(z,J){z.preventDefault(),z.stopPropagation(),pe.has(J)?pe.delete(J):pe.add(J),Ee()}function Q(z,J){z.preventDefault(),z.stopPropagation(),n(J)}function V(z,J){z.preventDefault(),z.stopPropagation(),n(J)}function $e(z,J){Me||n(J)}function ge(z,J){z.preventDefault(),z.stopPropagation(),qu(J).then(ye=>{ye&&le("\uBCF5\uC0AC\uB428","success",1200)})}function te(z,J){Me=J,z.dataTransfer&&(z.dataTransfer.setData("text/plain",J),z.dataTransfer.effectAllowed="move"),z.target.classList.add("board-card--dragging")}function U(z){z.target.classList.remove("board-card--dragging"),gt(),setTimeout(()=>{Me=null},0)}function W(z){let J=String(z.target.value||"");!J||J===_||(_=J,d&&d(J),Ee())}function T(){return i?i.get():null}function H(z){let J=l?l.get():null,ye=J?J.cleanup_failed:null;if(!ye||typeof ye!="object"||Array.isArray(ye))return null;let we=ye[z];return!we||typeof we!="object"||Array.isArray(we)?null:we}let I={onCardClick:$e,onCopyId:ge,onDragStart:te,onDragEnd:U,onClosedRangeChange:W,rollupFor:ke,isExpanded:Le,onRollupToggle:he,onChildClick:Q,onFromChipClick:V,cleanupFailureFor:H,get policy(){return T()}};function K(z,J){Me||(ve(),n(J))}function de(z,J){z.preventDefault(),z.stopPropagation(),ve(),n(J)}let Y={...I,onCardClick:K,onChildClick:de,onFromChipClick:de,get policy(){return T()}};function _e(z){let J=z.target,ye=e.querySelector(".board-filter__labels");J&&ye&&ye.contains(J)||q()}function be(z){z.key==="Escape"&&q()}function C(){ie||(ie=!0,document.addEventListener("mousedown",_e),document.addEventListener("keydown",be),Ee())}function q(){ie&&(ie=!1,document.removeEventListener("mousedown",_e),document.removeEventListener("keydown",be),Ee())}function X(z){z.key==="Escape"&&ve()}function re(){A||(A=!0,document.addEventListener("keydown",X),Ee())}function ve(){A&&(A=!1,document.removeEventListener("keydown",X),Ee())}let x={onClose:ve,onOverlayClick(z){z.target===z.currentTarget&&ve()}},P={onSearchInput(z){ne.search=String(z.target.value||""),me()},onPriorityChange(z){ne.priority=String(z.target.value||""),me()},onTypeChange(z){ne.type=String(z.target.value||""),me()},onSortChange(z){let J=String(z.target.value||"");if(!(!Ui.has(J)||J===R)){R=J;try{window.localStorage.setItem(Bi,J)}catch{}me()}},onDeferredToggle(){A?ve():re()},onLabelMenuToggle(){ie?q():C()},onLabelToggle(z){let J=ne.labels.indexOf(z);J===-1?ne.labels.push(z):ne.labels.splice(J,1),me()},onLabelClear(){ne.labels.length!==0&&(ne.labels=[],me())},onNewIssue(){f&&f()}};function ue(){return c`
      <div class="board-view">
        ${ji(ne,P,{sort_mode:R,deferred_popup_open:A,deferred_count:w,label_options:Ve(),label_menu_open:ie})}
        <div class="board-root">
          ${Xr({title:"Blocked",id:"blocked-col",items:Ze(k)},I)}
          ${Xr({title:"Ready",id:"ready-col",items:Ze(M)},I)}
          ${Xr({title:"In progress",id:"in-progress-col",items:Ze(D)},I)}
          ${Xr({title:"Resolved",id:"resolved-col",items:Ze(E)},I)}
          ${Xr({title:"Closed",id:"closed-col",items:Ze(ee),is_closed:!0,closed_range:_},I)}
        </div>
        ${A?Fi({items:Ze(B),count:w},Y,x):""}
      </div>
    `}function Ee(){Be(ue(),e),qe()}function qe(){try{let z=e.querySelector("#deferred-popup");z&&!z.open&&(typeof z.showModal=="function"?z.showModal():z.setAttribute("open",""));let J=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let ye of J)Array.from(ye.querySelectorAll(".board-card")).forEach((ce,Oe)=>{ce.tabIndex=Oe===0?0:-1})}catch{}}async function Ae(z,J){if(!o){le("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:z,status:J}),le("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(ye){r("update-status failed: %o",ye),le("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function Ge(z){switch(z){case"blocked-col":return k;case"ready-col":return M;case"in-progress-col":return D;case"resolved-col":return E;default:return[]}}function We(z,J,ye){if(!o||!a)return;let we=Ge(z),ce=we.find(Je=>Je.id===J);if(!ce)return;let Oe=we.filter(Je=>Je.id!==J),tt=ye.closest?ye.closest(".board-card"):null,Xe=Oe.length;if(tt){let Je=tt.getAttribute("data-issue-id");if(Je===J)return;let Te=Oe.findIndex(bt=>bt.id===Je);Te>=0&&(Xe=Te)}let Pe=Oe.slice();Pe.splice(Xe,0,ce),S.applyReorder(J,Pe,Xe)}function gt(){for(let z of Array.from(e.querySelectorAll(".board-column--drag-over")))z.classList.remove("board-column--drag-over")}let ot=null;e.addEventListener("dragover",z=>{z.preventDefault(),z.dataTransfer&&(z.dataTransfer.dropEffect="move");let ye=z.target.closest(".board-column");ye&&ye!==ot&&(ot&&ot.classList.remove("board-column--drag-over"),ye.classList.add("board-column--drag-over"),ot=ye)}),e.addEventListener("dragleave",z=>{let J=z.relatedTarget;(!J||!e.contains(J))&&ot&&(ot.classList.remove("board-column--drag-over"),ot=null)}),e.addEventListener("drop",z=>{z.preventDefault(),ot&&(ot.classList.remove("board-column--drag-over"),ot=null);let J=z.target,ye=J.closest(".board-column");if(!ye)return;let we=z.dataTransfer?.getData("text/plain")||"";if(!we)return;let ce=ye.id,Oe=Z.get(we);if(Oe&&Oe===ce){if(Mu.has(ce)){if(R!=="manual"){le("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}We(ce,we,J)}return}let tt=Du[ce];if(!tt){le("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}N.get(we)!==tt&&Ae(we,tt)}),e.addEventListener("keydown",z=>{let J=z.target;if(!(J instanceof HTMLElement))return;let ye=String(J.tagName||"").toLowerCase();if(ye==="input"||ye==="textarea"||ye==="select"||ye==="button"||ye==="a"||J.isContentEditable===!0)return;let we=J.closest(".board-card");if(!we)return;let ce=String(z.key||"");if(ce==="Enter"||ce===" "){z.preventDefault();let Pe=we.getAttribute("data-issue-id");Pe&&n(Pe);return}if(ce!=="ArrowUp"&&ce!=="ArrowDown"&&ce!=="ArrowLeft"&&ce!=="ArrowRight")return;z.preventDefault();let Oe=we.closest(".board-column");if(!Oe)return;let tt=Array.from(Oe.querySelectorAll(".board-card")),Xe=tt.indexOf(we);if(ce==="ArrowDown"&&Xe<tt.length-1){at(we,tt[Xe+1]);return}if(ce==="ArrowUp"&&Xe>0){at(we,tt[Xe-1]);return}if(ce==="ArrowLeft"||ce==="ArrowRight"){let Pe=Array.from(e.querySelectorAll(".board-column")),Je=Pe.indexOf(Oe),Te=ce==="ArrowRight"?1:-1,bt=Je+Te;for(;bt>=0&&bt<Pe.length;){let Ot=Pe[bt].querySelector(".board-card");if(Ot){at(we,Ot);return}bt+=Te}}});function at(z,J){try{z.tabIndex=-1,J.tabIndex=0,J.focus()}catch{}}let dt=null;g&&g.subscribe&&(dt=g.subscribe(()=>{try{me()}catch{}}));let it=null;i&&i.subscribe&&(it=i.subscribe(()=>{try{me()}catch{}}));let ft=null;return l&&l.subscribe&&(ft=l.subscribe(()=>{Ee()})),{async load(){r("load"),me()},clear(){q(),ve(),dt&&(dt(),dt=null),it&&(it(),it=null),ft&&(ft(),ft=null),e.replaceChildren(),k=[],M=[],D=[],E=[],B=[],ee=[],N=new Map,Z=new Map}}}function wo(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function fn(e,t){return e.filter(r=>{let n=wo(r);return!(n&&t.has(n))})}async function qu(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let r=!1;try{r=document.execCommand("copy")}finally{t.remove()}return r}catch{return!1}}async function ur(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}function or(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function Sr(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function Fu(e,t=document){let r=t.createElement("dialog");r.className="continuation-dialog";let n=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),i=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",i.textContent=`${or(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${or(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,n.type="button",n.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",n.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",r.append(a,i,n,s,o),t.body.append(r),new Promise(l=>{let d=f=>{typeof r.close=="function"&&r.close(),r.remove(),l(f)};n.addEventListener("click",()=>d("prior_session")),s.addEventListener("click",()=>d("fresh_current")),o.addEventListener("click",()=>d(null)),r.addEventListener("cancel",f=>{f.preventDefault(),d(null)}),typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")})}async function pr(e,t,r={}){let n=e;for(r.onResult?.(n);n?.continuation_mismatch;){let s=n.continuation_mismatch,o=await Fu(s);if(o===null)return n;n=await t(o,s.decision_token),r.onResult?.(n),n?.conflict&&r.refresh&&(n=await r.refresh(n),r.onResult?.(n))}return n}var ju=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","orchestration_model","orchestration_effort","orchestration_speed"],zi={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},Bu=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function ar(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function At(e){return typeof e=="string"&&e.length>0?e:null}function fs(e){return e.startsWith("gpt-")?e.slice(4):e}function ht(e,t,r,n,s){return{value:e,source:t,display:r,full_value:n,resolution:s}}function Vi(e,t,r){let n=At(t[e]);if(n!==null)return{value:n,source:"pin"};let s=At(r[e]);return s===null?null:{value:s,source:"global"}}function _n(e,t,r,n){return Vi(e,t,r)||{value:n,source:"base"}}function Hi(e,t,r,n){let s=r?.implementation?.model_catalog;if(t&&ar(s?.[t])){let a=At(s[t][e]);if(a!==null)return a}if(t&&Array.isArray(s?.[t])&&s[t].includes(e))return e;if(!t&&ar(s)){for(let a of Object.values(s))if(ar(a)){let i=At(a[e]);if(i!==null)return i}else if(Array.isArray(a)&&a.includes(e))return e}let o=n?.model_index?.[e];return At(n?.runners?.[o]?.models?.[e]?.id)||e}function Uu(e,t){return At(t?.review?.reviewers?.[e]?.model)||e}function mn(e,t,r=!1){if(e==="default")return ht(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let n=r?fs(e):e;return ht(e,t,n,e,"explicit")}function Gi(e,t,r){let n=Vi(e,t,r);return n?mn(n.value,n.source):ht(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function fr(e){let t=ar(e.pin)?e.pin:{},r=ar(e.global)?e.global:{},n=ar(e.execution_defaults)?e.execution_defaults:null,s=n?.supported===!0&&ar(n.session)?n.session:null,o=n?.supported===!0&&ar(n.orchestration)?n.orchestration:null,a=ar(e.runner_catalog)?e.runner_catalog:null,i={};if(s){let l=_n("workflow_mode",t,r,At(s.workflow_mode_default));i.workflow_mode=l.source==="base"?ht(l.value,"base",l.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",l.value,"default"):mn(l.value,l.source);for(let f of["spec_review","plan_review","impl_review"]){let _=`${f}_model`,g=At(f==="plan_review"?l.value==="fast_track"?s.plan_review?.fast_track_default:s.plan_review?.standard_recommended:s.review?.default),S=_n(_,t,r,g);if(S.value===null)i[_]=ht(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else{let k=Uu(S.value,s);i[_]=ht(S.value,S.source,fs(k),k,S.source==="base"?"default":"explicit")}}for(let[f,_]of Object.entries(zi)){let g=i[_].value;if(g==="self"||g==="skip"){i[f]=ht(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let S=At(s.review?.reviewers?.[g||""]?.effort),k=_n(f,t,r,S);i[f]=k.value===null?ht(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):ht(k.value,k.source,k.value,k.value,k.source==="base"?"default":"explicit")}let d=ar(s.implementation?.default)?s.implementation.default:{};for(let f of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let _=_n(f,t,r,At(d[f.replace("impl_","")]));i[f]=_.value===null?ht(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):ht(_.value,_.source,_.value,_.value,_.source==="base"?"default":"explicit")}if(i.impl_dispatch.value==="main"){i.impl_dispatch.display="\uBA54\uC778";for(let f of["impl_runtime","impl_model","impl_effort","impl_speed"])i[f]=ht(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(i.impl_dispatch.value==="delegated"&&(i.impl_dispatch.display="\uC704\uC784"),i.impl_runtime.value==="inherit"&&(i.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",i.impl_runtime.resolution="dynamic"),i.impl_model.value!==null){let f=i.impl_runtime.value==="inherit"?At(e.controller_runtime):i.impl_runtime.value,_=Hi(i.impl_model.value,f,s,a);i.impl_model.display=fs(_),i.impl_model.full_value=_}if(i.impl_effort.value==="auto"){let f=At(e.transport)||(i.impl_runtime.value==="codex"?"codex-native-spawn":i.impl_runtime.value==="claude"?"implement-claude":null),_=f?At(s.implementation?.effort_by_transport?.[f]?.auto):null;_&&!Bu.has(_)?(i.impl_effort.display=`${_} (\uBE44\uD638\uD658)`,i.impl_effort.full_value=_,i.impl_effort.resolution="incompatible"):(i.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",i.impl_effort.resolution="dynamic")}i.impl_speed.value==="default"&&(i.impl_speed=i.impl_speed.source==="base"?ht("default","base","default (\uC77C\uBC18)","default","default"):mn("default",i.impl_speed.source))}}else for(let l of ju.filter(d=>!d.startsWith("orchestration_")))i[l]=Gi(l,t,r);if(!s){for(let[l,d]of Object.entries(zi))(i[d].value==="self"||i[d].value==="skip")&&(i[l]=ht(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(i.impl_dispatch.value==="main"){i.impl_dispatch.display="\uBA54\uC778";for(let l of["impl_runtime","impl_model","impl_effort","impl_speed"])i[l]=ht(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else i.impl_dispatch.value==="delegated"&&(i.impl_dispatch.display="\uC704\uC784"),i.impl_runtime.value==="inherit"&&(i.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",i.impl_runtime.resolution="dynamic"),i.impl_effort.value==="auto"&&(i.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",i.impl_effort.resolution="dynamic")}for(let l of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!o){i[l]=Gi(l,t,r);continue}let d=l.replace("orchestration_",""),f=At(o[d]),_=_n(l,t,r,f);if(l==="orchestration_effort"&&_.source==="base"){i[l]=ht(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(_.value===null){i[l]=ht(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(l==="orchestration_model"){let g=_.source==="base"?At(o.model_id)||_.value:Hi(_.value,null,s,a);i[l]=ht(_.value,_.source,fs(g),g,_.source==="base"?"default":"explicit");continue}if(_.value==="default"){i[l]=_.source==="base"?ht("default","base","default (\uC77C\uBC18)","default","default"):mn("default",_.source);continue}i[l]=mn(_.value,_.source)}return i}function Qr(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let r=e.createElement("h2"),n=e.createElement("textarea"),s=e.createElement("div"),o=e.createElement("button"),a=e.createElement("button");return r.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",n.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",n.maxLength=4e3,s.className="resume-instructions-dialog__actions",o.type="button",o.textContent="\uC774\uC5B4\uD558\uAE30",a.type="button",a.textContent="\uCDE8\uC18C",s.append(o,a),t.append(r,n,s),e.body.append(t),new Promise(i=>{let l=!1,d=_=>{l||(l=!0,typeof t.close=="function"&&t.close(),t.remove(),i(_))},f=()=>d(n.value.trim());o.addEventListener("click",f),a.addEventListener("click",()=>d(null)),n.addEventListener("keydown",_=>{_.key==="Enter"&&(_.ctrlKey||_.metaKey)&&(_.preventDefault(),f())}),t.addEventListener("cancel",_=>{_.preventDefault(),d(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),n.focus()})}var Qi="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function yt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var _r=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],gn=[..._r,"reasoning_output_tokens"],Wu=["implementation","review-consult"];function ko(e){let t=0;for(let r of _r)t+=yt(e?.[r]);return t}function zu(e){return!e||typeof e!="object"?!1:_r.some(t=>Number.isFinite(e[t]))}function Yi(e){return!e||typeof e!="object"?!1:gn.some(t=>Number.isFinite(e[t]))}function Hu(e){let t={};for(let r of gn)e&&Number.isFinite(e[r])&&(t[r]=e[r]);return t}function Ki(e){let t={};for(let r of gn)Number.isFinite(e[r])&&(t[r]=e[r]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function Zi(e,t){return e==="codex"?yt(t.input_tokens)+yt(t.output_tokens):ko(t)}function Gu(e){return e==="claude"?"Claude":"Codex"}function Vu(e){return`\u03C4 ${Ji(e)}`}function Yu(e,t){let r=t.breakdown||{},n=[`\uC785\uB825 ${yt(r.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${yt(r.output_tokens).toLocaleString("en-US")}`];e==="claude"?n.push(`\uCE90\uC2DC\uC77D\uAE30 ${yt(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${yt(r.cache_creation_input_tokens).toLocaleString("en-US")}`):(n.push(`\uCE90\uC2DC\uC77D\uAE30 ${yt(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${yt(r.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(r.reasoning_output_tokens)&&n.push(`\uCD94\uB860\uCD9C\uB825 ${yt(r.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,n.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(Qi),o.join(`
`)}function wt(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let r of["claude","codex"]){let n=e.providers[r];n&&t.push({provider:r,label:`${Gu(r)} ${Vu(n.subtotal)}${typeof n.total_cost_usd=="number"&&Number.isFinite(n.total_cost_usd)?` \xB7 $${n.total_cost_usd.toFixed(2)}`:""}`,tooltip:Yu(r,n)})}return t}function ms(e){let t={},r={claude:!0,codex:!1},n={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let i=t[o];i||(i={subtotal:0,breakdown:{}},t[o]=i),i.subtotal+=a.subtotal;for(let l of gn)Number.isFinite(a.breakdown[l])&&(i.breakdown[l]=yt(i.breakdown[l])+yt(a.breakdown[l]));a.replayed&&(i.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?n.claude+=a.total_cost_usd:r.claude=!1)}return t.claude&&r.claude&&(t.claude.total_cost_usd=n.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function $o(e){return!e||typeof e!="object"?null:Ut({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function Ku(e){return e==="codex"?"codex":"claude"}function Ar(){return{subtotal:0,breakdown:Hu(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function _s(e,t,r){e.subtotal+=t.subtotal;for(let n of gn)Number.isFinite(t.usage[n])&&(e.breakdown[n]=yt(e.breakdown[n])+yt(t.usage[n]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),r&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function Xi(e,t){let r={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(r.legs=e.legs),e.replayed&&(r.replayed=!0),r}function Ji(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Jr(e){return zu(e)?`\u03C4 ${Ji(ko(e))}`:null}function Zt(e){let t=Jr(e);if(!t)return null;let r=e?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${t} \xB7 $${r.toFixed(2)}`:t}function en(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${yt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${yt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${yt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${yt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${ko(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&r.push(Qi),r.join(`
`)}function Ut(e,t){let r={claude:Ar(),codex:Ar()},n={orchestrator:{claude:Ar(),codex:Ar()},implementation:{claude:Ar(),codex:Ar()},"review-consult":{claude:Ar(),codex:Ar()}},s=new Set;for(let i of Object.values(e||{})){if(!i||i.bead_id!==t)continue;let l=i.usage;if(Yi(l)){let f=Ku(i.runner),_=Ki(l),g={provider:f,role:"orchestrator",attempt_id:String(i.attempt_id||""),usage:_,subtotal:Zi(f,_)};_.replayed===!0&&(g.replayed=!0),typeof i.model=="string"&&(g.model=i.model),typeof i.session_id=="string"&&(g.session_id=i.session_id),_s(r[f],g,!0),_s(n.orchestrator[f],g,!0)}let d=Array.isArray(i.usage_legs)?i.usage_legs:[];for(let f of d){if(!f||f.provider!=="codex"||!Wu.includes(f.role)||!Yi(f.usage))continue;let _=typeof f.receipt_id=="string"&&f.receipt_id.length>0?f.receipt_id:null;if(!_||s.has(_))continue;s.add(_);let g=Ki(f.usage),S={provider:"codex",role:f.role,attempt_id:String(i.attempt_id||""),usage:g,subtotal:Zi("codex",g)};S.receipt_id=_,typeof f.model=="string"&&(S.model=f.model),typeof f.session_id=="string"?S.session_id=f.session_id:typeof f.thread_id=="string"&&(S.session_id=f.thread_id),typeof f.turn_id=="string"&&(S.turn_id=f.turn_id),typeof f.completed_at=="string"&&(S.completed_at=f.completed_at),g.replayed===!0&&(S.replayed=!0),_s(r.codex,S,!1),_s(n[S.role].codex,S,!1)}}let o={};for(let i of["claude","codex"]){let l=r[i];if(l.legs.length===0)continue;let d=Xi(l,!1);i==="claude"&&l.outer_count>0&&l.outer_cost_count===l.outer_count&&(d.total_cost_usd=l.outer_cost),o[i]=d}if(Object.keys(o).length===0)return null;let a={};for(let i of["orchestrator","implementation","review-consult"]){let l={};for(let d of["claude","codex"]){let f=n[i][d];f.legs.length>0&&(l[d]={...Xi(f,!0),legs:f.legs})}Object.keys(l).length>0&&(a[i]=l)}return{providers:o,roles:a}}var{entries:ll,setPrototypeOf:el,isFrozen:Zu,getPrototypeOf:Xu,getOwnPropertyDescriptor:Qu}=Object,{freeze:Tt,seal:Wt,create:Ro}=Object,{apply:Io,construct:Lo}=typeof Reflect<"u"&&Reflect;Tt||(Tt=function(t){return t});Wt||(Wt=function(t){return t});Io||(Io=function(t,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return t.apply(r,s)});Lo||(Lo=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new t(...n)});var gs=Ct(Array.prototype.forEach),Ju=Ct(Array.prototype.lastIndexOf),tl=Ct(Array.prototype.pop),bn=Ct(Array.prototype.push),ep=Ct(Array.prototype.splice),hs=Ct(String.prototype.toLowerCase),xo=Ct(String.prototype.toString),So=Ct(String.prototype.match),hn=Ct(String.prototype.replace),tp=Ct(String.prototype.indexOf),rp=Ct(String.prototype.trim),Xt=Ct(Object.prototype.hasOwnProperty),Et=Ct(RegExp.prototype.test),vn=np(TypeError);function Ct(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return Io(e,t,n)}}function np(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return Lo(e,r)}}function Ue(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:hs;el&&el(e,null);let n=t.length;for(;n--;){let s=t[n];if(typeof s=="string"){let o=r(s);o!==s&&(Zu(t)||(t[n]=o),s=o)}e[s]=!0}return e}function sp(e){for(let t=0;t<e.length;t++)Xt(e,t)||(e[t]=null);return e}function mr(e){let t=Ro(null);for(let[r,n]of ll(e))Xt(e,r)&&(Array.isArray(n)?t[r]=sp(n):n&&typeof n=="object"&&n.constructor===Object?t[r]=mr(n):t[r]=n);return t}function yn(e,t){for(;e!==null;){let n=Qu(e,t);if(n){if(n.get)return Ct(n.get);if(typeof n.value=="function")return Ct(n.value)}e=Xu(e)}function r(){return null}return r}var rl=Tt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Ao=Tt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Eo=Tt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),op=Tt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),To=Tt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),ap=Tt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),nl=Tt(["#text"]),sl=Tt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Co=Tt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),ol=Tt(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),bs=Tt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),ip=Wt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),lp=Wt(/<%[\w\W]*|[\w\W]*%>/gm),cp=Wt(/\$\{[\w\W]*/gm),dp=Wt(/^data-[\-\w.\u00B7-\uFFFF]+$/),up=Wt(/^aria-[\-\w]+$/),cl=Wt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),pp=Wt(/^(?:\w+script|data):/i),fp=Wt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),dl=Wt(/^html$/i),_p=Wt(/^[a-z][.\w]*(-[.\w]+)+$/i),al=Object.freeze({__proto__:null,ARIA_ATTR:up,ATTR_WHITESPACE:fp,CUSTOM_ELEMENT:_p,DATA_ATTR:dp,DOCTYPE_NAME:dl,ERB_EXPR:lp,IS_ALLOWED_URI:cl,IS_SCRIPT_OR_DATA:pp,MUSTACHE_EXPR:ip,TMPLIT_EXPR:cp}),wn={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},mp=function(){return typeof window>"u"?null:window},gp=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},il=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function ul(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:mp(),t=j=>ul(j);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==wn.document||!e.Element)return t.isSupported=!1,t;let{document:r}=e,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:i,Element:l,NodeFilter:d,NamedNodeMap:f=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:_,DOMParser:g,trustedTypes:S}=e,k=l.prototype,M=yn(k,"cloneNode"),D=yn(k,"remove"),E=yn(k,"nextSibling"),B=yn(k,"childNodes"),ee=yn(k,"parentNode");if(typeof a=="function"){let j=r.createElement("template");j.content&&j.content.ownerDocument&&(r=j.content.ownerDocument)}let A,w="",{implementation:R,createNodeIterator:N,createDocumentFragment:Z,getElementsByTagName:fe}=r,{importNode:pe}=n,ne=il();t.isSupported=typeof ll=="function"&&typeof ee=="function"&&R&&R.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:ie,ERB_EXPR:Me,TMPLIT_EXPR:je,DATA_ATTR:He,ARIA_ATTR:Ze,IS_SCRIPT_OR_DATA:Ve,ATTR_WHITESPACE:Ye,CUSTOM_ELEMENT:me}=al,{IS_ALLOWED_URI:xe}=al,ke=null,Le=Ue({},[...rl,...Ao,...Eo,...To,...nl]),he=null,Q=Ue({},[...sl,...Co,...ol,...bs]),V=Object.seal(Ro(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),$e=null,ge=null,te=Object.seal(Ro(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),U=!0,W=!0,T=!1,H=!0,I=!1,K=!0,de=!1,Y=!1,_e=!1,be=!1,C=!1,q=!1,X=!0,re=!1,ve="user-content-",x=!0,P=!1,ue={},Ee=null,qe=Ue({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Ae=null,Ge=Ue({},["audio","video","img","source","image","track"]),We=null,gt=Ue({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),ot="http://www.w3.org/1998/Math/MathML",at="http://www.w3.org/2000/svg",dt="http://www.w3.org/1999/xhtml",it=dt,ft=!1,z=null,J=Ue({},[ot,at,dt],xo),ye=Ue({},["mi","mo","mn","ms","mtext"]),we=Ue({},["annotation-xml"]),ce=Ue({},["title","style","font","a","script"]),Oe=null,tt=["application/xhtml+xml","text/html"],Xe="text/html",Pe=null,Je=null,Te=r.createElement("form"),bt=function(h){return h instanceof RegExp||h instanceof Function},Ot=function(){let h=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Je&&Je===h)){if((!h||typeof h!="object")&&(h={}),h=mr(h),Oe=tt.indexOf(h.PARSER_MEDIA_TYPE)===-1?Xe:h.PARSER_MEDIA_TYPE,Pe=Oe==="application/xhtml+xml"?xo:hs,ke=Xt(h,"ALLOWED_TAGS")?Ue({},h.ALLOWED_TAGS,Pe):Le,he=Xt(h,"ALLOWED_ATTR")?Ue({},h.ALLOWED_ATTR,Pe):Q,z=Xt(h,"ALLOWED_NAMESPACES")?Ue({},h.ALLOWED_NAMESPACES,xo):J,We=Xt(h,"ADD_URI_SAFE_ATTR")?Ue(mr(gt),h.ADD_URI_SAFE_ATTR,Pe):gt,Ae=Xt(h,"ADD_DATA_URI_TAGS")?Ue(mr(Ge),h.ADD_DATA_URI_TAGS,Pe):Ge,Ee=Xt(h,"FORBID_CONTENTS")?Ue({},h.FORBID_CONTENTS,Pe):qe,$e=Xt(h,"FORBID_TAGS")?Ue({},h.FORBID_TAGS,Pe):mr({}),ge=Xt(h,"FORBID_ATTR")?Ue({},h.FORBID_ATTR,Pe):mr({}),ue=Xt(h,"USE_PROFILES")?h.USE_PROFILES:!1,U=h.ALLOW_ARIA_ATTR!==!1,W=h.ALLOW_DATA_ATTR!==!1,T=h.ALLOW_UNKNOWN_PROTOCOLS||!1,H=h.ALLOW_SELF_CLOSE_IN_ATTR!==!1,I=h.SAFE_FOR_TEMPLATES||!1,K=h.SAFE_FOR_XML!==!1,de=h.WHOLE_DOCUMENT||!1,be=h.RETURN_DOM||!1,C=h.RETURN_DOM_FRAGMENT||!1,q=h.RETURN_TRUSTED_TYPE||!1,_e=h.FORCE_BODY||!1,X=h.SANITIZE_DOM!==!1,re=h.SANITIZE_NAMED_PROPS||!1,x=h.KEEP_CONTENT!==!1,P=h.IN_PLACE||!1,xe=h.ALLOWED_URI_REGEXP||cl,it=h.NAMESPACE||dt,ye=h.MATHML_TEXT_INTEGRATION_POINTS||ye,we=h.HTML_INTEGRATION_POINTS||we,V=h.CUSTOM_ELEMENT_HANDLING||{},h.CUSTOM_ELEMENT_HANDLING&&bt(h.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(V.tagNameCheck=h.CUSTOM_ELEMENT_HANDLING.tagNameCheck),h.CUSTOM_ELEMENT_HANDLING&&bt(h.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(V.attributeNameCheck=h.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),h.CUSTOM_ELEMENT_HANDLING&&typeof h.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(V.allowCustomizedBuiltInElements=h.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),I&&(W=!1),C&&(be=!0),ue&&(ke=Ue({},nl),he=[],ue.html===!0&&(Ue(ke,rl),Ue(he,sl)),ue.svg===!0&&(Ue(ke,Ao),Ue(he,Co),Ue(he,bs)),ue.svgFilters===!0&&(Ue(ke,Eo),Ue(he,Co),Ue(he,bs)),ue.mathMl===!0&&(Ue(ke,To),Ue(he,ol),Ue(he,bs))),h.ADD_TAGS&&(typeof h.ADD_TAGS=="function"?te.tagCheck=h.ADD_TAGS:(ke===Le&&(ke=mr(ke)),Ue(ke,h.ADD_TAGS,Pe))),h.ADD_ATTR&&(typeof h.ADD_ATTR=="function"?te.attributeCheck=h.ADD_ATTR:(he===Q&&(he=mr(he)),Ue(he,h.ADD_ATTR,Pe))),h.ADD_URI_SAFE_ATTR&&Ue(We,h.ADD_URI_SAFE_ATTR,Pe),h.FORBID_CONTENTS&&(Ee===qe&&(Ee=mr(Ee)),Ue(Ee,h.FORBID_CONTENTS,Pe)),x&&(ke["#text"]=!0),de&&Ue(ke,["html","head","body"]),ke.table&&(Ue(ke,["tbody"]),delete $e.tbody),h.TRUSTED_TYPES_POLICY){if(typeof h.TRUSTED_TYPES_POLICY.createHTML!="function")throw vn('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof h.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw vn('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');A=h.TRUSTED_TYPES_POLICY,w=A.createHTML("")}else A===void 0&&(A=gp(S,s)),A!==null&&typeof w=="string"&&(w=A.createHTML(""));Tt&&Tt(h),Je=h}},qt=Ue({},[...Ao,...Eo,...op]),Ft=Ue({},[...To,...ap]),wr=function(h){let L=ee(h);(!L||!L.tagName)&&(L={namespaceURI:it,tagName:"template"});let oe=hs(h.tagName),Re=hs(L.tagName);return z[h.namespaceURI]?h.namespaceURI===at?L.namespaceURI===dt?oe==="svg":L.namespaceURI===ot?oe==="svg"&&(Re==="annotation-xml"||ye[Re]):!!qt[oe]:h.namespaceURI===ot?L.namespaceURI===dt?oe==="math":L.namespaceURI===at?oe==="math"&&we[Re]:!!Ft[oe]:h.namespaceURI===dt?L.namespaceURI===at&&!we[Re]||L.namespaceURI===ot&&!ye[Re]?!1:!Ft[oe]&&(ce[oe]||!qt[oe]):!!(Oe==="application/xhtml+xml"&&z[h.namespaceURI]):!1},kt=function(h){bn(t.removed,{element:h});try{ee(h).removeChild(h)}catch{D(h)}},xt=function(h,L){try{bn(t.removed,{attribute:L.getAttributeNode(h),from:L})}catch{bn(t.removed,{attribute:null,from:L})}if(L.removeAttribute(h),h==="is")if(be||C)try{kt(L)}catch{}else try{L.setAttribute(h,"")}catch{}},cr=function(h){let L=null,oe=null;if(_e)h="<remove></remove>"+h;else{let Fe=So(h,/^[\r\n\t ]+/);oe=Fe&&Fe[0]}Oe==="application/xhtml+xml"&&it===dt&&(h='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+h+"</body></html>");let Re=A?A.createHTML(h):h;if(it===dt)try{L=new g().parseFromString(Re,Oe)}catch{}if(!L||!L.documentElement){L=R.createDocument(it,"template",null);try{L.documentElement.innerHTML=ft?w:Re}catch{}}let rt=L.body||L.documentElement;return h&&oe&&rt.insertBefore(r.createTextNode(oe),rt.childNodes[0]||null),it===dt?fe.call(L,de?"html":"body")[0]:de?L.documentElement:rt},rr=function(h){return N.call(h.ownerDocument||h,h,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},zt=function(h){return h instanceof _&&(typeof h.nodeName!="string"||typeof h.textContent!="string"||typeof h.removeChild!="function"||!(h.attributes instanceof f)||typeof h.removeAttribute!="function"||typeof h.setAttribute!="function"||typeof h.namespaceURI!="string"||typeof h.insertBefore!="function"||typeof h.hasChildNodes!="function")},Ht=function(h){return typeof i=="function"&&h instanceof i};function $t(j,h,L){gs(j,oe=>{oe.call(t,h,L,Je)})}let nr=function(h){let L=null;if($t(ne.beforeSanitizeElements,h,null),zt(h))return kt(h),!0;let oe=Pe(h.nodeName);if($t(ne.uponSanitizeElement,h,{tagName:oe,allowedTags:ke}),K&&h.hasChildNodes()&&!Ht(h.firstElementChild)&&Et(/<[/\w!]/g,h.innerHTML)&&Et(/<[/\w!]/g,h.textContent)||h.nodeType===wn.progressingInstruction||K&&h.nodeType===wn.comment&&Et(/<[/\w]/g,h.data))return kt(h),!0;if(!(te.tagCheck instanceof Function&&te.tagCheck(oe))&&(!ke[oe]||$e[oe])){if(!$e[oe]&&v(oe)&&(V.tagNameCheck instanceof RegExp&&Et(V.tagNameCheck,oe)||V.tagNameCheck instanceof Function&&V.tagNameCheck(oe)))return!1;if(x&&!Ee[oe]){let Re=ee(h)||h.parentNode,rt=B(h)||h.childNodes;if(rt&&Re){let Fe=rt.length;for(let Qe=Fe-1;Qe>=0;--Qe){let mt=M(rt[Qe],!0);mt.__removalCount=(h.__removalCount||0)+1,Re.insertBefore(mt,E(h))}}}return kt(h),!0}return h instanceof l&&!wr(h)||(oe==="noscript"||oe==="noembed"||oe==="noframes")&&Et(/<\/no(script|embed|frames)/i,h.innerHTML)?(kt(h),!0):(I&&h.nodeType===wn.text&&(L=h.textContent,gs([ie,Me,je],Re=>{L=hn(L,Re," ")}),h.textContent!==L&&(bn(t.removed,{element:h.cloneNode()}),h.textContent=L)),$t(ne.afterSanitizeElements,h,null),!1)},p=function(h,L,oe){if(X&&(L==="id"||L==="name")&&(oe in r||oe in Te))return!1;if(!(W&&!ge[L]&&Et(He,L))){if(!(U&&Et(Ze,L))){if(!(te.attributeCheck instanceof Function&&te.attributeCheck(L,h))){if(!he[L]||ge[L]){if(!(v(h)&&(V.tagNameCheck instanceof RegExp&&Et(V.tagNameCheck,h)||V.tagNameCheck instanceof Function&&V.tagNameCheck(h))&&(V.attributeNameCheck instanceof RegExp&&Et(V.attributeNameCheck,L)||V.attributeNameCheck instanceof Function&&V.attributeNameCheck(L,h))||L==="is"&&V.allowCustomizedBuiltInElements&&(V.tagNameCheck instanceof RegExp&&Et(V.tagNameCheck,oe)||V.tagNameCheck instanceof Function&&V.tagNameCheck(oe))))return!1}else if(!We[L]){if(!Et(xe,hn(oe,Ye,""))){if(!((L==="src"||L==="xlink:href"||L==="href")&&h!=="script"&&tp(oe,"data:")===0&&Ae[h])){if(!(T&&!Et(Ve,hn(oe,Ye,"")))){if(oe)return!1}}}}}}}return!0},v=function(h){return h!=="annotation-xml"&&So(h,me)},F=function(h){$t(ne.beforeSanitizeAttributes,h,null);let{attributes:L}=h;if(!L||zt(h))return;let oe={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:he,forceKeepAttr:void 0},Re=L.length;for(;Re--;){let rt=L[Re],{name:Fe,namespaceURI:Qe,value:mt}=rt,b=Pe(Fe),u=mt,$=Fe==="value"?u:rp(u);if(oe.attrName=b,oe.attrValue=$,oe.keepAttr=!0,oe.forceKeepAttr=void 0,$t(ne.uponSanitizeAttribute,h,oe),$=oe.attrValue,re&&(b==="id"||b==="name")&&(xt(Fe,h),$=ve+$),K&&Et(/((--!?|])>)|<\/(style|title|textarea)/i,$)){xt(Fe,h);continue}if(b==="attributename"&&So($,"href")){xt(Fe,h);continue}if(oe.forceKeepAttr)continue;if(!oe.keepAttr){xt(Fe,h);continue}if(!H&&Et(/\/>/i,$)){xt(Fe,h);continue}I&&gs([ie,Me,je],G=>{$=hn($,G," ")});let y=Pe(h.nodeName);if(!p(y,b,$)){xt(Fe,h);continue}if(A&&typeof S=="object"&&typeof S.getAttributeType=="function"&&!Qe)switch(S.getAttributeType(y,b)){case"TrustedHTML":{$=A.createHTML($);break}case"TrustedScriptURL":{$=A.createScriptURL($);break}}if($!==u)try{Qe?h.setAttributeNS(Qe,Fe,$):h.setAttribute(Fe,$),zt(h)?kt(h):tl(t.removed)}catch{xt(Fe,h)}}$t(ne.afterSanitizeAttributes,h,null)},se=function j(h){let L=null,oe=rr(h);for($t(ne.beforeSanitizeShadowDOM,h,null);L=oe.nextNode();)$t(ne.uponSanitizeShadowNode,L,null),nr(L),F(L),L.content instanceof o&&j(L.content);$t(ne.afterSanitizeShadowDOM,h,null)};return t.sanitize=function(j){let h=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},L=null,oe=null,Re=null,rt=null;if(ft=!j,ft&&(j="<!-->"),typeof j!="string"&&!Ht(j))if(typeof j.toString=="function"){if(j=j.toString(),typeof j!="string")throw vn("dirty is not a string, aborting")}else throw vn("toString is not a function");if(!t.isSupported)return j;if(Y||Ot(h),t.removed=[],typeof j=="string"&&(P=!1),P){if(j.nodeName){let mt=Pe(j.nodeName);if(!ke[mt]||$e[mt])throw vn("root node is forbidden and cannot be sanitized in-place")}}else if(j instanceof i)L=cr("<!---->"),oe=L.ownerDocument.importNode(j,!0),oe.nodeType===wn.element&&oe.nodeName==="BODY"||oe.nodeName==="HTML"?L=oe:L.appendChild(oe);else{if(!be&&!I&&!de&&j.indexOf("<")===-1)return A&&q?A.createHTML(j):j;if(L=cr(j),!L)return be?null:q?w:""}L&&_e&&kt(L.firstChild);let Fe=rr(P?j:L);for(;Re=Fe.nextNode();)nr(Re),F(Re),Re.content instanceof o&&se(Re.content);if(P)return j;if(be){if(C)for(rt=Z.call(L.ownerDocument);L.firstChild;)rt.appendChild(L.firstChild);else rt=L;return(he.shadowroot||he.shadowrootmode)&&(rt=pe.call(n,rt,!0)),rt}let Qe=de?L.outerHTML:L.innerHTML;return de&&ke["!doctype"]&&L.ownerDocument&&L.ownerDocument.doctype&&L.ownerDocument.doctype.name&&Et(dl,L.ownerDocument.doctype.name)&&(Qe="<!DOCTYPE "+L.ownerDocument.doctype.name+`>
`+Qe),I&&gs([ie,Me,je],mt=>{Qe=hn(Qe,mt," ")}),A&&q?A.createHTML(Qe):Qe},t.setConfig=function(){let j=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Ot(j),Y=!0},t.clearConfig=function(){Je=null,Y=!1},t.isValidAttribute=function(j,h,L){Je||Ot({});let oe=Pe(j),Re=Pe(h);return p(oe,Re,L)},t.addHook=function(j,h){typeof h=="function"&&bn(ne[j],h)},t.removeHook=function(j,h){if(h!==void 0){let L=Ju(ne[j],h);return L===-1?void 0:ep(ne[j],L,1)[0]}return tl(ne[j])},t.removeHooks=function(j){ne[j]=[]},t.removeAllHooks=function(){ne=il()},t}var pl=ul();var gr={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},vs=e=>(...t)=>({_$litDirective$:e,values:t}),tn=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,n){this._$Ct=t,this._$AM=r,this._$Ci=n}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var kn=class extends tn{constructor(t){if(super(t),this.it=ut,t.type!==gr.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===ut||t==null)return this._t=void 0,this.it=t;if(t===jt)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};kn.directiveName="unsafeHTML",kn.resultType=1;var fl=vs(kn);function Mo(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var jr=Mo();function yl(e){jr=e}var An={exec:()=>null};function Ke(e,t=""){let r=typeof e=="string"?e:e.source,n={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(Rt.caret,"$1"),r=r.replace(s,a),n},getRegex:()=>new RegExp(r,t)};return n}var bp=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Rt={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},hp=/^(?:[ \t]*(?:\n|$))+/,vp=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,yp=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,En=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,wp=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,No=/(?:[*+-]|\d{1,9}[.)])/,wl=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,kl=Ke(wl).replace(/bull/g,No).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),kp=Ke(wl).replace(/bull/g,No).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),qo=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,$p=/^[^\n]+/,Fo=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,xp=Ke(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Fo).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Sp=Ke(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,No).getRegex(),Ss="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",jo=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Ap=Ke("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",jo).replace("tag",Ss).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),$l=Ke(qo).replace("hr",En).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ss).getRegex(),Ep=Ke(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",$l).getRegex(),Bo={blockquote:Ep,code:vp,def:xp,fences:yp,heading:wp,hr:En,html:Ap,lheading:kl,list:Sp,newline:hp,paragraph:$l,table:An,text:$p},_l=Ke("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",En).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ss).getRegex(),Tp={...Bo,lheading:kp,table:_l,paragraph:Ke(qo).replace("hr",En).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",_l).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ss).getRegex()},Cp={...Bo,html:Ke(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",jo).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:An,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Ke(qo).replace("hr",En).replace("heading",` *#{1,6} *[^
]`).replace("lheading",kl).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Rp=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Ip=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,xl=/^( {2,}|\\)\n(?!\s*$)/,Lp=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,As=/[\p{P}\p{S}]/u,Uo=/[\s\p{P}\p{S}]/u,Sl=/[^\s\p{P}\p{S}]/u,Op=Ke(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Uo).getRegex(),Al=/(?!~)[\p{P}\p{S}]/u,Pp=/(?!~)[\s\p{P}\p{S}]/u,Dp=/(?:[^\s\p{P}\p{S}]|~)/u,Mp=Ke(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",bp?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),El=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Np=Ke(El,"u").replace(/punct/g,As).getRegex(),qp=Ke(El,"u").replace(/punct/g,Al).getRegex(),Tl="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Fp=Ke(Tl,"gu").replace(/notPunctSpace/g,Sl).replace(/punctSpace/g,Uo).replace(/punct/g,As).getRegex(),jp=Ke(Tl,"gu").replace(/notPunctSpace/g,Dp).replace(/punctSpace/g,Pp).replace(/punct/g,Al).getRegex(),Bp=Ke("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Sl).replace(/punctSpace/g,Uo).replace(/punct/g,As).getRegex(),Up=Ke(/\\(punct)/,"gu").replace(/punct/g,As).getRegex(),Wp=Ke(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),zp=Ke(jo).replace("(?:-->|$)","-->").getRegex(),Hp=Ke("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",zp).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),ks=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Gp=Ke(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",ks).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Cl=Ke(/^!?\[(label)\]\[(ref)\]/).replace("label",ks).replace("ref",Fo).getRegex(),Rl=Ke(/^!?\[(ref)\](?:\[\])?/).replace("ref",Fo).getRegex(),Vp=Ke("reflink|nolink(?!\\()","g").replace("reflink",Cl).replace("nolink",Rl).getRegex(),ml=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Wo={_backpedal:An,anyPunctuation:Up,autolink:Wp,blockSkip:Mp,br:xl,code:Ip,del:An,emStrongLDelim:Np,emStrongRDelimAst:Fp,emStrongRDelimUnd:Bp,escape:Rp,link:Gp,nolink:Rl,punctuation:Op,reflink:Cl,reflinkSearch:Vp,tag:Hp,text:Lp,url:An},Yp={...Wo,link:Ke(/^!?\[(label)\]\((.*?)\)/).replace("label",ks).getRegex(),reflink:Ke(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",ks).getRegex()},Oo={...Wo,emStrongRDelimAst:jp,emStrongLDelim:qp,url:Ke(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",ml).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:Ke(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",ml).getRegex()},Kp={...Oo,br:Ke(xl).replace("{2,}","*").getRegex(),text:Ke(Oo.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},ys={normal:Bo,gfm:Tp,pedantic:Cp},$n={normal:Wo,gfm:Oo,breaks:Kp,pedantic:Yp},Zp={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},gl=e=>Zp[e];function br(e,t){if(t){if(Rt.escapeTest.test(e))return e.replace(Rt.escapeReplace,gl)}else if(Rt.escapeTestNoEncode.test(e))return e.replace(Rt.escapeReplaceNoEncode,gl);return e}function bl(e){try{e=encodeURI(e).replace(Rt.percentDecode,"%")}catch{return null}return e}function hl(e,t){let r=e.replace(Rt.findPipe,(o,a,i)=>{let l=!1,d=a;for(;--d>=0&&i[d]==="\\";)l=!l;return l?"|":" |"}),n=r.split(Rt.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(Rt.slashPipe,"|");return n}function xn(e,t,r){let n=e.length;if(n===0)return"";let s=0;for(;s<n;){let o=e.charAt(n-s-1);if(o===t&&!r)s++;else if(o!==t&&r)s++;else break}return e.slice(0,n-s)}function Xp(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return r>0?-2:-1}function vl(e,t,r,n,s){let o=t.href,a=t.title||null,i=e[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let l={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:a,text:i,tokens:n.inlineTokens(i)};return n.state.inLink=!1,l}function Qp(e,t,r){let n=e.match(r.other.indentCodeCompensation);if(n===null)return t;let s=n[1];return t.split(`
`).map(o=>{let a=o.match(r.other.beginningSpace);if(a===null)return o;let[i]=a;return i.length>=s.length?o.slice(s.length):o}).join(`
`)}var $s=class{constructor(e){nt(this,"options");nt(this,"rules");nt(this,"lexer");this.options=e||jr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:xn(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],n=Qp(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let n=xn(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:xn(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=xn(t[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let a=!1,i=[],l;for(l=0;l<r.length;l++)if(this.rules.other.blockquoteStart.test(r[l]))i.push(r[l]),a=!0;else if(!a)i.push(r[l]);else break;r=r.slice(l);let d=i.join(`
`),f=d.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${d}`:d,s=s?`${s}
${f}`:f;let _=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(f,o,!0),this.lexer.state.top=_,r.length===0)break;let g=o.at(-1);if(g?.type==="code")break;if(g?.type==="blockquote"){let S=g,k=S.raw+`
`+r.join(`
`),M=this.blockquote(k);o[o.length-1]=M,n=n.substring(0,n.length-S.raw.length)+M.raw,s=s.substring(0,s.length-S.text.length)+M.text;break}else if(g?.type==="list"){let S=g,k=S.raw+`
`+r.join(`
`),M=this.list(k);o[o.length-1]=M,n=n.substring(0,n.length-g.raw.length)+M.raw,s=s.substring(0,s.length-S.raw.length)+M.raw,r=k.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),a=!1;for(;e;){let l=!1,d="",f="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;d=t[0],e=e.substring(d.length);let _=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,M=>" ".repeat(3*M.length)),g=e.split(`
`,1)[0],S=!_.trim(),k=0;if(this.options.pedantic?(k=2,f=_.trimStart()):S?k=t[1].length+1:(k=t[2].search(this.rules.other.nonSpaceChar),k=k>4?1:k,f=_.slice(k),k+=t[1].length),S&&this.rules.other.blankLine.test(g)&&(d+=g+`
`,e=e.substring(g.length+1),l=!0),!l){let M=this.rules.other.nextBulletRegex(k),D=this.rules.other.hrRegex(k),E=this.rules.other.fencesBeginRegex(k),B=this.rules.other.headingBeginRegex(k),ee=this.rules.other.htmlBeginRegex(k);for(;e;){let A=e.split(`
`,1)[0],w;if(g=A,this.options.pedantic?(g=g.replace(this.rules.other.listReplaceNesting,"  "),w=g):w=g.replace(this.rules.other.tabCharGlobal,"    "),E.test(g)||B.test(g)||ee.test(g)||M.test(g)||D.test(g))break;if(w.search(this.rules.other.nonSpaceChar)>=k||!g.trim())f+=`
`+w.slice(k);else{if(S||_.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||E.test(_)||B.test(_)||D.test(_))break;f+=`
`+g}!S&&!g.trim()&&(S=!0),d+=A+`
`,e=e.substring(A.length+1),_=w.slice(k)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(d)&&(a=!0)),s.items.push({type:"list_item",raw:d,task:!!this.options.gfm&&this.rules.other.listIsTask.test(f),loose:!1,text:f,tokens:[]}),s.raw+=d}let i=s.items.at(-1);if(i)i.raw=i.raw.trimEnd(),i.text=i.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let l of s.items){if(this.lexer.state.top=!1,l.tokens=this.lexer.blockTokens(l.text,[]),l.task){if(l.text=l.text.replace(this.rules.other.listReplaceTask,""),l.tokens[0]?.type==="text"||l.tokens[0]?.type==="paragraph"){l.tokens[0].raw=l.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),l.tokens[0].text=l.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let f=this.lexer.inlineQueue.length-1;f>=0;f--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[f].src)){this.lexer.inlineQueue[f].src=this.lexer.inlineQueue[f].src.replace(this.rules.other.listReplaceTask,"");break}}let d=this.rules.other.listTaskCheckbox.exec(l.raw);if(d){let f={type:"checkbox",raw:d[0]+" ",checked:d[0]!=="[ ]"};l.checked=f.checked,s.loose?l.tokens[0]&&["paragraph","text"].includes(l.tokens[0].type)&&"tokens"in l.tokens[0]&&l.tokens[0].tokens?(l.tokens[0].raw=f.raw+l.tokens[0].raw,l.tokens[0].text=f.raw+l.tokens[0].text,l.tokens[0].tokens.unshift(f)):l.tokens.unshift({type:"paragraph",raw:f.raw,text:f.raw,tokens:[f]}):l.tokens.unshift(f)}}if(!s.loose){let d=l.tokens.filter(_=>_.type==="space"),f=d.length>0&&d.some(_=>this.rules.other.anyLine.test(_.raw));s.loose=f}}if(s.loose)for(let l of s.items){l.loose=!0;for(let d of l.tokens)d.type==="text"&&(d.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:n,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=hl(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let a of n)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<r.length;a++)o.header.push({text:r[a],tokens:this.lexer.inline(r[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(hl(a,o.header.length).map((i,l)=>({text:i,tokens:this.lexer.inline(i),header:!1,align:o.align[l]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=xn(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=Xp(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let n=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),vl(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return vl(r,s,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,a,i=s,l=0,d=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+s);(n=d.exec(t))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(a=[...o].length,n[3]||n[4]){i+=a;continue}else if((n[5]||n[6])&&s%3&&!((s+a)%3)){l+=a;continue}if(i-=a,i>0)continue;a=Math.min(a,a+i+l);let f=[...n[0]][0].length,_=e.slice(0,s+n.index+f+a);if(Math.min(s,a)%2){let S=_.slice(1,-1);return{type:"em",raw:_,text:S,tokens:this.lexer.inlineTokens(S)}}let g=_.slice(2,-2);return{type:"strong",raw:_,text:g,tokens:this.lexer.inlineTokens(g)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,n;return t[2]==="@"?(r=t[1],n="mailto:"+r):(r=t[1],n=r),{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,n;if(t[2]==="@")r=t[0],n="mailto:"+r;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);r=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},Qt=class Po{constructor(t){nt(this,"tokens");nt(this,"options");nt(this,"state");nt(this,"inlineQueue");nt(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||jr,this.options.tokenizer=this.options.tokenizer||new $s,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:Rt,block:ys.normal,inline:$n.normal};this.options.pedantic?(r.block=ys.pedantic,r.inline=$n.pedantic):this.options.gfm&&(r.block=ys.gfm,this.options.breaks?r.inline=$n.breaks:r.inline=$n.gfm),this.tokenizer.rules=r}static get rules(){return{block:ys,inline:$n}}static lex(t,r){return new Po(r).lex(t)}static lexInline(t,r){return new Po(r).inlineTokens(t)}lex(t){t=t.replace(Rt.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,r=[],n=!1){for(this.options.pedantic&&(t=t.replace(Rt.tabCharGlobal,"    ").replace(Rt.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,r))?(t=t.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=r.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
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
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,r}inline(t,r=[]){return this.inlineQueue.push({src:t,tokens:r}),r}inlineTokens(t,r=[]){let n=t,s=null;if(this.tokens.links){let l=Object.keys(this.tokens.links);if(l.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)l.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let a=!1,i="";for(;t;){a||(i=""),a=!1;let l;if(this.options.extensions?.inline?.some(f=>(l=f.call({lexer:this},t,r))?(t=t.substring(l.raw.length),r.push(l),!0):!1))continue;if(l=this.tokenizer.escape(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.tag(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.link(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(l.raw.length);let f=r.at(-1);l.type==="text"&&f?.type==="text"?(f.raw+=l.raw,f.text+=l.text):r.push(l);continue}if(l=this.tokenizer.emStrong(t,n,i)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.codespan(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.br(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.del(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.autolink(t)){t=t.substring(l.raw.length),r.push(l);continue}if(!this.state.inLink&&(l=this.tokenizer.url(t))){t=t.substring(l.raw.length),r.push(l);continue}let d=t;if(this.options.extensions?.startInline){let f=1/0,_=t.slice(1),g;this.options.extensions.startInline.forEach(S=>{g=S.call({lexer:this},_),typeof g=="number"&&g>=0&&(f=Math.min(f,g))}),f<1/0&&f>=0&&(d=t.substring(0,f+1))}if(l=this.tokenizer.inlineText(d)){t=t.substring(l.raw.length),l.raw.slice(-1)!=="_"&&(i=l.raw.slice(-1)),a=!0;let f=r.at(-1);f?.type==="text"?(f.raw+=l.raw,f.text+=l.text):r.push(l);continue}if(t){let f="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(f);break}else throw new Error(f)}}return r}},xs=class{constructor(e){nt(this,"options");nt(this,"parser");this.options=e||jr}space(e){return""}code({text:e,lang:t,escaped:r}){let n=(t||"").match(Rt.notSpaceStart)?.[0],s=e.replace(Rt.endingNewline,"")+`
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${br(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let n=this.parser.parseInline(r),s=bl(e);if(s===null)return n;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+br(t)+'"'),o+=">"+n+"</a>",o}image({href:e,title:t,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=bl(e);if(s===null)return br(r);e=s;let o=`<img src="${e}" alt="${r}"`;return t&&(o+=` title="${br(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:br(e.text)}},zo=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},Jt=class Do{constructor(t){nt(this,"options");nt(this,"renderer");nt(this,"textRenderer");this.options=t||jr,this.options.renderer=this.options.renderer||new xs,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new zo}static parse(t,r){return new Do(r).parse(t)}static parseInline(t,r){return new Do(r).parseInline(t)}parse(t){let r="";for(let n=0;n<t.length;n++){let s=t[n];if(this.options.extensions?.renderers?.[s.type]){let a=s,i=this.options.extensions.renderers[a.type].call({parser:this},a);if(i!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){r+=i||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}parseInline(t,r=this.renderer){let n="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let i=this.options.extensions.renderers[o.type].call({parser:this},o);if(i!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=i||"";continue}}let a=o;switch(a.type){case"escape":{n+=r.text(a);break}case"html":{n+=r.html(a);break}case"link":{n+=r.link(a);break}case"image":{n+=r.image(a);break}case"checkbox":{n+=r.checkbox(a);break}case"strong":{n+=r.strong(a);break}case"em":{n+=r.em(a);break}case"codespan":{n+=r.codespan(a);break}case"br":{n+=r.br(a);break}case"del":{n+=r.del(a);break}case"text":{n+=r.text(a);break}default:{let i='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return n}},ws,Sn=(ws=class{constructor(e){nt(this,"options");nt(this,"block");this.options=e||jr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Qt.lex:Qt.lexInline}provideParser(){return this.block?Jt.parse:Jt.parseInline}},nt(ws,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),nt(ws,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),ws),Jp=class{constructor(...e){nt(this,"defaults",Mo());nt(this,"options",this.setOptions);nt(this,"parse",this.parseMarkdown(!0));nt(this,"parseInline",this.parseMarkdown(!1));nt(this,"Parser",Jt);nt(this,"Renderer",xs);nt(this,"TextRenderer",zo);nt(this,"Lexer",Qt);nt(this,"Tokenizer",$s);nt(this,"Hooks",Sn);this.use(...e)}walkTokens(e,t){let r=[];for(let n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)r=r.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,t));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);r=r.concat(this.walkTokens(a,t))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let i=s.renderer.apply(this,a);return i===!1&&(i=o.apply(this,a)),i}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),n.extensions=t),r.renderer){let s=this.defaults.renderer||new xs(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,i=r.renderer[a],l=s[a];s[a]=(...d)=>{let f=i.apply(s,d);return f===!1&&(f=l.apply(s,d)),f||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new $s(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,i=r.tokenizer[a],l=s[a];s[a]=(...d)=>{let f=i.apply(s,d);return f===!1&&(f=l.apply(s,d)),f}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new Sn;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,i=r.hooks[a],l=s[a];Sn.passThroughHooks.has(o)?s[a]=d=>{if(this.defaults.async&&Sn.passThroughHooksRespectAsync.has(o))return(async()=>{let _=await i.call(s,d);return l.call(s,_)})();let f=i.call(s,d);return l.call(s,f)}:s[a]=(...d)=>{if(this.defaults.async)return(async()=>{let _=await i.apply(s,d);return _===!1&&(_=await l.apply(s,d)),_})();let f=i.apply(s,d);return f===!1&&(f=l.apply(s,d)),f}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(a){let i=[];return i.push(o.call(this,a)),s&&(i=i.concat(s.call(this,a))),i}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Qt.lex(e,t??this.defaults)}parser(e,t){return Jt.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,i=await(s.hooks?await s.hooks.provideLexer():e?Qt.lex:Qt.lexInline)(a,s),l=s.hooks?await s.hooks.processAllTokens(i):i;s.walkTokens&&await Promise.all(this.walkTokens(l,s.walkTokens));let d=await(s.hooks?await s.hooks.provideParser():e?Jt.parse:Jt.parseInline)(l,s);return s.hooks?await s.hooks.postprocess(d):d})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?Qt.lex:Qt.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let i=(s.hooks?s.hooks.provideParser():e?Jt.parse:Jt.parseInline)(a,s);return s.hooks&&(i=s.hooks.postprocess(i)),i}catch(a){return o(a)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+br(r.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(r);throw r}}},Fr=new Jp;function et(e,t){return Fr.parse(e,t)}et.options=et.setOptions=function(e){return Fr.setOptions(e),et.defaults=Fr.defaults,yl(et.defaults),et};et.getDefaults=Mo;et.defaults=jr;et.use=function(...e){return Fr.use(...e),et.defaults=Fr.defaults,yl(et.defaults),et};et.walkTokens=function(e,t){return Fr.walkTokens(e,t)};et.parseInline=Fr.parseInline;et.Parser=Jt;et.parser=Jt.parse;et.Renderer=xs;et.TextRenderer=zo;et.Lexer=Qt;et.lexer=Qt.lex;et.Tokenizer=$s;et.Hooks=Sn;et.parse=et;var ub=et.options,pb=et.setOptions,fb=et.use,_b=et.walkTokens,mb=et.parseInline;var gb=Jt.parse,bb=Qt.lex;function Er(e){let t=et.parse(e),r=pl.sanitize(t);return fl(r)}function hr(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function rn(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Es(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())} ${r(t.getHours())}:${r(t.getMinutes())}`}var ef={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},tf={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},rf=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,nf=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function ir(e){return!!e&&typeof e=="object"}function Ho(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function Il(e,t){let r=Ho(e),n=Ho(t),s=new Map;for(let i of r)s.set(i,(s.get(i)||0)+1);let o=0;for(let i of n){let l=s.get(i)||0;l>0?s.set(i,l-1):o+=1}let a=0;for(let i of s.values())a+=i;return{added:o,removed:a}}function sf(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>ir(s)&&typeof s.text=="string"?s.text:"").join(""):ir(e)&&typeof e.text=="string"&&(t=e.text);let n=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function of(e){let t=String(e.name||""),r=e.input||{},n={kind:"tool",tool:t,icon:ef[t]||"\u{1F527}",input:r,expandable:!0};if((t==="Read"||t==="Write")&&(n.path=String(r.file_path||r.path||"")),t==="Write"&&(n.added=Ho(r.content).length),t==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=Il(r.old_string,r.new_string);n.added=s,n.removed=o}if(t==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,a=Array.isArray(r.edits)?r.edits:[];for(let i of a){let l=Il(ir(i)?i.old_string:"",ir(i)?i.new_string:"");s+=l.added,o+=l.removed}n.added=s,n.removed=o}return t==="Bash"&&(n.command=String(r.command||"")),(t==="Grep"||t==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function Go(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function Vo(e){let t=e.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=rf.exec(t);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:t.trim()}:nf.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function af(e,t){if(e.type==="assistant"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(ir(o)){if(o.type==="text"&&typeof o.text=="string")s.push(Vo(o.text));else if(o.type==="thinking"){let a=Go(o.thinking);a&&s.push(a)}else if(o.type==="tool_use"){let a=of(o);typeof o.id=="string"&&t.set(o.id,a),s.push(a)}}return s}if(e.type==="user"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(ir(s)&&s.type==="tool_result"){let o=t.get(String(s.tool_use_id));if(o){let a=sf(s.content);o.result=a,o.output=typeof s.content=="string"?s.content:a}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success";return[{kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""}]}return[]}function lf(e){if(e.type==="item.completed"&&ir(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[Vo(t.text)];if(t.type==="reasoning"){let r=Go(t.text);return r?[r]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function cf(e){if(e.schema!=="codex-delegation-monitor-v1"||!ir(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&ir(t.item)){let r=t.item;if(typeof r.id!="string"||r.id.length===0)return[];if(t.type==="item.completed"&&r.kind==="agent_message"&&typeof r.text=="string"&&r.text.trim().length>0)return[Vo(r.text)];if(t.type==="item.completed"&&r.kind==="reasoning"){let i=Go(r.text);return i?[i]:[]}if(r.kind!=="activity"||typeof r.activity!="string")return[];let n=tf[r.activity];if(!n)return[];let s="\uC2DC\uC791",o="\u2026",a={kind:"tool",tool:"",icon:o,expandable:!1};if(t.type==="item.completed"){if(r.status==="completed")s="\uC644\uB8CC",o="\u2713";else if(r.status==="failed")s="\uC2E4\uD328",o="\u2717";else return[];a.result=""}return a.tool=`${n} \xB7 ${s}`,a.icon=o,[a]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function df(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Ll(e){let t=[],r=new Map,n=Array.isArray(e)?e:[];for(let s of n){let o=s;if(typeof s=="string"){let i=s.trim();if(i.length===0)continue;try{o=JSON.parse(i)}catch{continue}}if(!ir(o))continue;let a=o.schema==="codex-delegation-monitor-v1"?cf(o):df(o)?lf(o):af(o,r);for(let i of a)t.push(i)}return t}var uf=5,pf=10,ff=/Task\s+#(\d+)/,_f=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,mf=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function Ts(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function gf(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function bf(e){for(let t=e.length-1;t>=0;t-=1){let r=e[t];if(r.kind==="phase"||r.kind==="gate")return r.text||null}return null}function hf(e){let t=new Map,r=0;for(let s of e){if(s.kind!=="tool")continue;r+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let l=ff.exec(s.output||s.result||""),d=String(o.activeForm||o.subject||"").trim();if(!l||d.length===0)continue;t.set(l[1],{label:d,active:o.status==="in_progress"?r:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let i=o.activeForm||o.subject;typeof i=="string"&&i.trim().length>0&&(a.label=i.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?r:0)}let n=null;for(let s of t.values())s.active>0&&(!n||s.active>n.active)&&(n=s);return n?n.label:null}function vf(e){if(e.tool==="Bash"){let t=e.command||"";return _f.test(t)?"~ PR/\uAC8C\uC2DC \uC911":mf.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function yf(e){let t=e.filter(s=>s.kind==="tool").slice(-pf),r=new Map;t.forEach((s,o)=>{let a=vf(s);if(!a)return;let i=r.get(a)||{count:0,last:-1};i.count+=1,i.last=o,r.set(a,i)});let n=null;for(let[s,o]of r)(!n||o.count>n.count||o.count===n.count&&o.last>n.last)&&(n={label:s,count:o.count,last:o.last});return n?n.label:null}function wf(e){let t=bf(e);if(t)return{text:t,guess:!1};let r=hf(e);if(r)return{text:r,guess:!1};let n=yf(e);return n?{text:n,guess:!0}:null}function kf(e,t){if(typeof e!="number")return"";let r=Math.max(0,Math.floor((t-e)/1e3));return r<60?`${r}\uCD08 \uC804`:Dt(e,t)}function Cs(e,t={}){let{transport:r,sessionLogStore:n,onClose:s}=t,o=null,a=null,i=null,l={},d=!0,f=new Set,_=new Set,g=null,S=null,k=!1,M=!1,D=!1,E=null,B=null;function ee(){k=!1,M=!1,D=!1,E=null,B=null}async function A(U){if(r){M=!0,D=!1,xe();try{let W=await Promise.resolve(r("get-attempt-prompt",{attempt_id:U}));if(o!==U)return;!W||typeof W!="object"||Array.isArray(W)?D=!0:(E=W,B=U)}catch{o===U&&(D=!0)}finally{o===U&&(M=!1,xe())}}}function w(){if(k=!k,k&&o&&B!==o){A(o);return}xe()}function R(){if(!k)return"";let U=rn({loading:M,error:D});if(U)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${U}
      </div>`;if(!E)return"";if(E.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let W=Es(E.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${W?c`<div class="prompt-block__meta">${W} 발송</div>`:""}
      ${typeof E.task_prompt=="string"?hr("\uACFC\uC5C5 (user)",E.task_prompt):""}
      ${typeof E.system_prompt=="string"?hr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",E.system_prompt):""}
    </div>`}function N(){if(!i||!n)return[];let U=n.get(i);return Ll(U?U.lines:[])}function Z(){if(!i||!n)return null;let U=n.get(i),W=U?U.last_event_at:null;return typeof W=="number"?W:null}function fe(){return l.status==="running"}function pe(){if(fe()&&o){S||(S=setInterval(()=>xe(),1e3));return}ne()}function ne(){S&&(clearInterval(S),S=null)}function ie(U){let W=[],T=0;for(;T<U.length;){let H=U[T];if(H.kind==="tool"){let I=T;for(;I<U.length&&U[I].kind==="tool"&&U[I].tool===H.tool;)I+=1;if(I-T>=uf&&!_.has(T)){W.push({kind:"group",idx:T,tool:H.tool||"",lines:U.slice(T,I).map((K,de)=>({idx:T+de,line:K}))}),T=I;continue}}W.push({kind:"line",idx:T,line:H}),T+=1}return W}function Me(U){for(let W=U.length-1;W>=0;W-=1){let T=U[W];if(T.kind==="result"||T.kind==="error")return null;if(T.kind==="tool"&&!Object.hasOwn(T,"result"))return T}return null}function je(U){for(let W=U.length-1;W>=0;W-=1)if(U[W].kind==="thinking")return U[W];return null}function He(U,W){if(W.kind==="gate")return c`<div class="sv__gate">${W.text}</div>`;if(W.kind==="phase")return c`<div class="sv__phase">${W.text}</div>`;if(W.kind==="result")return c`<div
        class="sv__result${W.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${W.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${Er(W.text||(W.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(W.kind==="thinking"){let T=f.has(U);return c`<div
        class="sv__think${T?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Le(U)}
      >
        <span class="sv__think-line">💭 ${Ts(W.text)}</span>
        ${T?c`<pre class="sv__think-expand">${W.text}</pre>`:""}
      </div>`}if(W.kind==="error")return c`<div class="sv__error">⛔ ${W.text}</div>`;if(W.kind==="blocker")return c`<div class="sv__error">⛔ ${W.text}</div>`;if(W.kind==="tool"){let T=f.has(U),H=W.tool==="Bash"?gf(W.command):0,I=W.tool==="Bash"?H>1?Ts(W.command):W.command:W.path||W.command||"";return c`<div
        class="sv__tool${T?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>Le(U)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${W.icon}</span>
          <span class="sv__tool-name">${W.tool}</span>
          ${I?c`<span class="sv__tool-detail">${I}</span>`:""}
          ${H>1?c`<span class="sv__tool-more">⋯ ${H}줄</span>`:""}
          ${typeof W.added=="number"?c`<span class="sv__diff-add">+${W.added}</span>`:""}
          ${typeof W.removed=="number"?c`<span class="sv__diff-del">−${W.removed}</span>`:""}
          ${W.result?c`<span class="sv__tool-ok">→ ${W.result}</span>`:""}
        </span>
        ${T?c`<pre class="sv__tool-expand">${Ze(W)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${Er(W.text||"")}</div>`}function Ze(U){let W=[];if(U.tool==="Bash"&&typeof U.command=="string"&&U.command.length>0)W.push(U.command);else if(U.input!==void 0)try{W.push(`input: ${JSON.stringify(U.input,null,2)}`)}catch{}return typeof U.output=="string"&&U.output.length>0&&W.push(`output:
${U.output}`),W.join(`

`)}function Ve(){if(!o)return c``;let U=N(),W=(a?[l.model]:[l.runner,l.model,l.effort]).filter(Boolean).join(" \xB7 "),T=l.session_id||"",H=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${d?"ON":"OFF"}`,I=fe(),K=I?kf(Z(),Date.now()):"",de=I?Me(U):null,Y=I?je(U):null,_e=wf(U);return c`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${a?l.role||"":o}</span>
        ${_e?c`<span
              class="sv__stage${_e.guess?" sv__stage--guess":""}"
              title=${_e.text}
              >${_e.text}</span
            >`:""}
        ${I?c`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${K?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${K}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${K?c`<span class="sv__live-ago">${K}</span>`:""}</span
            >`:""}
        ${T?c`<button
              type="button"
              class="sv__session"
              title=${T}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${T}`}
              @click=${()=>Q(T)}
            >
              ⧉ ${T.slice(0,8)}
            </button>`:""}
        ${W?c`<span class="sv__meta">${W}</span>`:""}
        ${l.worktree?c`<span class="sv__wt" title=${l.worktree}
              >${l.worktree}</span
            >`:""}
        ${a?"":c`<button
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
          class="sv__follow${d?" sv__follow--on":""}"
          aria-pressed=${d?"true":"false"}
          aria-label=${H}
          @click=${he}
        >
          <span class="sv__follow-full">⇣ ${H}</span>
          <span class="sv__follow-short">⇣ ${d?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>te()}
        >
          ✕
        </button>
      </div>
      ${a?"":R()}
      <div class="sv__body">
        ${U.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:ie(U).map(be=>be.kind==="group"?Ye(be):He(be.idx,be.line))}
      </div>
      ${de||Y?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${de?c`<span class="sv__now-icon">${de.icon}</span>
                  <span class="sv__now-name">${de.tool}</span>
                  <span class="sv__now-detail"
                    >${de.tool==="Bash"?Ts(de.command):de.path||de.command||""}</span
                  >`:""}
            ${Y?c`<span class="sv__now-think"
                  >💭 ${Ts(Y.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function Ye(U){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>me(U.idx)}
    >
      <span class="sv__group-icon">${U.lines[0].line.icon}</span>
      <span class="sv__group-name">${U.tool}</span>
      <span class="sv__group-count">${U.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function me(U){_.add(U),xe()}function xe(){Be(Ve(),e),pe(),d&&ke()}function ke(){let U=e.querySelector(".sv__body");U&&(U.scrollTop=U.scrollHeight)}function Le(U){f.has(U)?f.delete(U):f.add(U),xe()}function he(){d=!d,xe()}function Q(U){ur(U).then(W=>{W?le("\uBCF5\uC0AC\uB428","success",1200):le("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function V(U){!o||!U||(l={...l,...U},xe())}function $e(U){let W=U.target;if(!W||!W.classList||!W.classList.contains("sv__body"))return;!(W.scrollHeight-W.scrollTop-W.clientHeight<=4)&&d&&(d=!1,xe())}e.addEventListener("scroll",$e,!0);function ge(U){let W=U&&U.attempt_id;if(!W)return;let T=i;o=W,a=typeof U.launch_id=="string"&&U.launch_id.length>0?U.launch_id:null,i=a?`session-log:${o}:${a}`:`session-log:${o}`,r&&T&&T!==i&&Promise.resolve(r("unsubscribe-session-log",{id:T})).catch(()=>{}),l=U.meta||{},d=!0,f.clear(),_.clear(),ee(),!g&&n&&(g=n.subscribe(xe)),r&&Promise.resolve(r("subscribe-session-log",{id:i,attempt_id:o,...a?{launch_id:a}:{}})).catch(()=>{}),xe()}function te(){let U=i;o=null,a=null,i=null,f.clear(),_.clear(),ee(),ne(),r&&U&&Promise.resolve(r("unsubscribe-session-log",{id:U})).catch(()=>{}),Be(c``,e),s&&s()}return{open:ge,updateMeta:V,close:te,isOpen(){return o!==null},destroy(){ne(),g&&(g(),g=null),e.removeEventListener("scroll",$e,!0),o=null,a=null,i=null,Be(c``,e)}}}function Tn(e){let t=e&&typeof e=="object"?e:{},r=t.metadata&&typeof t.metadata=="object"?t.metadata:{},n=Ol(t.spec_id),s=Ol(r.spec_id);return n?{path:n,source:"native",conflict:s.length>0&&s!==n}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function Ol(e){return typeof e=="string"?e.trim():""}function $f(e){return["plan_review","plan_approval","plan_check"].some(t=>{let r=e[t];return typeof r=="string"&&r.trim().length>0})}function xf(e){let t=e&&e.metadata||{},r=Tn(e),n=[];return r.path&&n.push({kind:"spec",path:r.path,missing_state:null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&n.push({kind:"plan",path:t.plan_path.trim(),missing_state:$f(t)?null:"plan_pending"}),n}function Pl(e,t){let r=xf(e);return c`
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
  `}var Sf="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",Af=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,Ef=/^\*\*결론\*\* — (.+)$/;function Rs(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==Sf)return null;let r=Af.exec(t[1]||"");if(!r)return null;let n=r[1].split(" ")[0],s=r[2],o=r[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let i=a<t.length?Ef.exec(t[a]):null,l=i?i[1].replace(/\s+/g," ").trim():"",d=i?a+1:a;return{lane:n,identifier:s,timestamp:o,conclusion:l,body:t.slice(d).join(`
`).trim()}}var Dl=20;function Ml(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let r=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${r}-${n} ${s}:${o}`}function Tf(e){return e.length>Dl?`${e.slice(0,Dl)}\u2026`:e}function Cf(e,t,r,n){let s=`${t.lane} ${Tf(t.identifier)}`;return c`<div class="detail-report">
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
        <span class="detail-report__time">${Ml(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${n&&t.body.length>0?c`<div class="detail-report__body">
          ${Er(t.body)}
        </div>`:""}
  </div>`}function Rf(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${Ml(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${Er(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function Nl(e,t={},r={}){let n=Array.isArray(e)?e.filter(Boolean):[],s=r.expanded||new Set,o=typeof r.draft=="string"?r.draft:"",a=r.sending===!0,i=n.slice().sort((l,d)=>String(d.created_at||"").localeCompare(String(l.created_at||"")));return c`
    <div class="detail-section-label">댓글 (${n.length})</div>
    ${r.error?c`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:i.length===0?c`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:c`<div class="detail-comments" data-seam="comments">
            ${i.map(l=>{let d=Rs(typeof l.text=="string"?l.text:"");return d?Cf(l,d,t,s.has(l.id)):Rf(l)})}
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
  `}var{I:Zb}=ii;var ql=e=>e.strings===void 0;var If={},Fl=(e,t=If)=>e._$AH=t;var Br=vs(class extends tn{constructor(e){if(super(e),e.type!==gr.PROPERTY&&e.type!==gr.ATTRIBUTE&&e.type!==gr.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!ql(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===jt||t===ut)return t;let r=e.element,n=e.name;if(e.type===gr.PROPERTY){if(t===r[n])return jt}else if(e.type===gr.BOOLEAN_ATTRIBUTE){if(!!t===r.hasAttribute(n))return jt}else if(e.type===gr.ATTRIBUTE&&r.getAttribute(n)===t+"")return jt;return Fl(e),t}});var Yo=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],Is=["orchestration_model","orchestration_effort","orchestration_speed"],jl=["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],Ls=["delegated","main"],Os=["inherit","claude","codex"],Cn=["default","fast"],Rn=["standard","fast_track"],In=["codex","opus","fable","self","skip"],Ps=["codex","fable","skip"],Ds=["low","medium","high","xhigh"],er="auto";function vr(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Bl(e){if(!vr(e)||!vr(e.runners))return[];let t=[];for(let[r,n]of Object.entries(e.runners))vr(n)&&vr(n.models)&&t.push([r,Object.keys(n.models)]);return t}function Ul(e){return e?.impl_dispatch==="main"}function Ms(e,t){let r=Bl(e),n=t&&t!=="inherit"?r.filter(([s])=>s===t):r;return[er,...n.flatMap(([,s])=>s)]}function nn(e,t,r){if(!vr(e)||!vr(e.runners))return[er];let n=[];for(let[s,o]of Object.entries(e.runners))if(!(!vr(o)||!vr(o.models))&&!(t&&t!=="inherit"&&s!==t))for(let[a,i]of Object.entries(o.models)){if(r&&r!==er&&a!==r)continue;let l=vr(i)?i.efforts:null;if(Array.isArray(l))for(let d of l)typeof d=="string"&&!n.includes(d)&&n.push(d)}return[er,...n]}function Ns(e,t){let r=Bl(e);return(t?r.filter(([s])=>s===t):r).flatMap(([,s])=>s)}function Ko(e,t,r,n,s){let o={...r};delete o[e];let a=fr({global:o,execution_defaults:n,runner_catalog:s}),i=fr({global:r,execution_defaults:n,runner_catalog:s}),l=a[e];return{unset_label:`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${l.display}`,full_value:l.full_value,unavailable:l.resolution==="unavailable",disabled:i[e]?.resolution==="not_applicable",options:t.map(d=>{let f=fr({global:{...r,[e]:d},execution_defaults:n,runner_catalog:s});return{value:d,label:f[e].display,full_value:f[e].full_value}})}}function Wl(e,t){let r={};for(let n of Yo){let s=e?.[n],o=t?.[n];s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}function zl(e,t){let r={};for(let n of Is){let s=e?.[n]??null,o=t?.[n]??null;s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}var Zo=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Is]}],Xo={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},Hl={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function qs(e,t,r,n,s,o=null){let a=fr({pin:t,global:r,execution_defaults:n,runner_catalog:s,controller_runtime:o});return e.map(i=>({key:i,...a[i]}))}function Gl(e,t,r,n,s,o=null){let a={pin:0,global:0,base:0};for(let i of qs(e,t,r,n,s,o))a[i.source]+=1;return a}function Vl(e,t,r){return{id:e,key:t,value:typeof r=="string"?r:""}}function Yl(e,t,r){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:r}}var ih=[...Yo,...Is];var Lf=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review"},{id:"impl",label:"\uAD6C\uD604",receipt:null},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review"},{id:"pr",label:"PR",receipt:null}],Of={pin:"pin",global:"global",base:"base"};function Pf(e){return c`<span
    class=${`detail-layer-rail detail-layer-rail--${Of[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function Df(e,t,r){switch(e){case"workflow_mode":return Rn;case"spec_review_model":case"impl_review_model":return In;case"plan_review_model":return Ps;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return Ds;case"impl_dispatch":return Ls;case"impl_runtime":return Os;case"impl_model":return Ms(r,t.impl_runtime);case"impl_effort":return nn(r,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return Cn;case"orchestration_model":return Ns(r,null);case"orchestration_effort":return nn(r,void 0,t.orchestration_model||er).filter(n=>n!==er);default:return[]}}function Mf(e,t){return c`<div class="detail-effective__row" data-key=${e.key}>
    ${Pf(e.source)}
    <span class="detail-effective__k"
      >${Xo[e.key]||e.key}</span
    >
    <span
      class=${`detail-effective__v${e.source==="base"?" detail-effective__v--dim":""}`}
      title=${e.full_value||""}
      >${e.display}</span
    >
    <span
      class=${`detail-effective__badge detail-effective__badge--${e.source}`}
      >${Hl[e.source]}</span
    >
    ${t.expanded?c`<select
          class="detail-effective__edit"
          data-edit-key=${e.key}
          aria-label=${`${Xo[e.key]||e.key} \uD3B8\uC9D1`}
          ?disabled=${e.resolution==="not_applicable"}
          @change=${r=>{let n=String(r.target.value);t.onEdit(e.key,n.length===0?null:n)}}
        >
          <option value="" ?selected=${e.source!=="pin"}>
            ${t.default_label}
          </option>
          ${t.options.map(r=>c`<option
                value=${r}
                ?selected=${e.source==="pin"&&e.value===r}
              >
                ${r===er?"\uC790\uB3D9":r}
              </option>`)}
        </select>`:""}
  </div>`}function Kl(e,t){let r=Zo.flatMap(l=>l.keys),n=qs(r,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=Gl(r,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Object.fromEntries(n.map(l=>[l.key,l])),a=Object.fromEntries(n.filter(l=>l.value!==null).map(l=>[l.key,l.value])),i=n.filter(l=>l.full_value&&l.display!==l.full_value).map(l=>l.full_value).join(" \xB7 ");return c`<details
    class=${`detail-effective${e.expanded?" detail-effective--open":""}`}
    data-seam="effective-settings"
    ?open=${e.expanded}
    @toggle=${l=>t.onToggle(l.currentTarget.open)}
  >
    <summary
      class="detail-effective__head"
      data-seam="effective-settings-toggle"
      @click=${l=>{l.preventDefault();let d=l.currentTarget.parentElement;t.onToggle(!d.open)}}
    >
      <span class="detail-effective__t">유효 실행 설정</span>
      <span class="detail-effective__summary" title=${i}
        >${Nf(o)}</span
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
    ${e.expanded?c`<div class="detail-effective__body">
          ${Zo.map(l=>c`
              <div class="detail-effective__subhead">${l.label}</div>
              ${n.filter(d=>l.keys.includes(d.key)).map(d=>{let f={...e.metadata};delete f[d.key];let _=qs([d.key],f,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null)[0];return Mf(d,{expanded:e.expanded,options:Df(d.key,a,e.catalog),default_label:`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${_.display}`,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="구현 프리셋"
              .value=${Br(e.preset_id)}
              ?disabled=${e.preset_busy}
              @change=${l=>t.onPresetSelect(String(l.target.value))}
            >
              <option value="" ?selected=${e.preset_id===""}>
                구현 프리셋…
              </option>
              ${e.presets.map(l=>c`<option
                    value=${l.id}
                    ?selected=${l.id===e.preset_id}
                  >
                    ${l.name}${l.compatible===!1?" (\uBE44\uD638\uD658)":""}
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
              >구현 키 5개를 핀으로 기록</span
            >
          </div>
        </div>`:""}
  </details>`}function Nf(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let r=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${r}`)}for(let r of["impl_model","impl_effort","impl_speed"])e[r]?.resolution!=="not_applicable"&&t.push(e[r]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function Zl(e){let t=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},n=r.stages||{},s=r.route||t.route||null,o=typeof t.pr_url=="string"?t.pr_url:"",a=typeof t.exec_receipt=="string"?t.exec_receipt:"",i=us(r.planned_execution,r.exec_receipt);return c`<section class="detail-summary" data-seam="detail-summary">
    <div class="detail-summary__chips">
      <span class="detail-summary__chip detail-summary__chip--status"
        >${e?.status||"\u2014"}</span
      >
      ${s?c`<span class="detail-summary__chip detail-summary__chip--route"
            >${s}</span
          >`:""}
      ${t.workflow_mode==="fast_track"?c`<span class="detail-summary__chip detail-summary__chip--mode"
            >fast_track</span
          >`:""}
      ${o?c`<a
            class="detail-summary__chip detail-summary__chip--pr"
            href=${o}
            target="_blank"
            rel="noreferrer"
            >PR</a
          >`:""}
      ${i?c`<span
            class="detail-summary__chip detail-summary__chip--planned ctl-chip--planned"
            data-kind=${i.kind}
            title=${i.title}
            >${i.label}</span
          >`:""}
      ${a?c`<span
            class="detail-summary__chip detail-summary__chip--receipt"
            title=${a}
            >${a.split("@")[0]}</span
          >`:""}
    </div>
    <div class="detail-summary__gates">
      ${Lf.map(l=>{let d=l.receipt&&typeof t[l.receipt]=="string"?String(t[l.receipt]):"",f=n[l.id],_=d.length>0||f?.fill==="full",g=!_&&f?.fill==="dim",S=f?.stale===!0;return c`<span
          class=${`detail-summary__gate${_?" detail-summary__gate--on":""}${g?" detail-summary__gate--current":""}${S?" detail-summary__gate--stale":""}`}
          data-gate=${l.id}
        >
          <span class="detail-summary__gate-pill">${l.label}</span>
          ${d?c`<span class="detail-summary__gate-sha"
                >${d.split("@")[1]?.slice(0,7)||""}</span
              >`:""}
        </span>`})}
    </div>
  </section>`}var Xl=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function Ln(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Fs(e){if(!Ln(e)||!Ln(e.runners))return null;let t=Object.entries(e.runners).filter(([,r])=>Ln(r)&&Ln(r.models));return t.length>0?t:null}function Qo(e,t){let r=Fs(e);if(!r||!t)return null;for(let[n,s]of r)if(Object.hasOwn(s.models,t))return n;return null}function Ql(e,t){return Ln(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function Jl(e,t){let r=Fs(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return Ql(n,n.models[t]);return[]}function qf(e){let t=Fs(e);if(!t)return[];let r=[];for(let[,n]of t)for(let s of Object.values(n.models))for(let o of Ql(n,s))r.includes(o)||r.push(o);return r}function Ff(e,t){if(!t)return qf(e);let n=Fs(e)?.find(([o])=>o===t)?.[1];if(!n)return[];let s=[];for(let o of Object.keys(n.models))for(let a of Jl(e,o))s.includes(a)||s.push(a);return s}function ec(e,t,r){let n={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=n.impl_runtime==="inherit"?r:n.impl_runtime==="claude"||n.impl_runtime==="codex"?n.impl_runtime:null;if(n.impl_runtime==="inherit"&&!s)return n.impl_model="",n.impl_effort="",n;let o=Qo(t,n.impl_model);if(n.impl_model&&(!s||o!==s))return n.impl_model="",n.impl_effort="",n;let a=n.impl_model?Jl(t,n.impl_model):Ff(t,s);return n.impl_effort&&a.length>0&&!a.includes(n.impl_effort)&&(n.impl_effort=""),n}function jf(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function tc(e,t){let r=t.getWorkspacePath,n=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",i="";function l(k){k.key==="Escape"&&s&&(k.preventDefault(),g())}document.addEventListener("keydown",l);function d(){return s?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>g()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${jf(s)}</span
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
                    </div>`:Er(a)}
          </div>
        </div>
      </div>
    `:c``}function f(){Be(d(),e)}async function _(k,M={}){s=k,o="loading",a="",i="",f();let D=r?r():"";if(!D){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",f();return}if(!n){o="error",i="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",f();return}let E="/api/doc?workspace="+encodeURIComponent(D)+"&path="+encodeURIComponent(k);try{let B=await n(E),ee=await B.json().catch(()=>({}));if(!B.ok||!ee||ee.ok!==!0){if(ee?.error==="not_found"&&M.missing_state==="plan_pending"){o="pending",i="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",f();return}o="error",i="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(ee&&ee.error||B.status)+")",f();return}a=String(ee.content||""),o="ready",f()}catch{o="error",i="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",f()}}function g(){s=null,Be(c``,e)}function S(){document.removeEventListener("keydown",l),g()}return{open:_,close:g,destroy:S}}var Bf=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],nc="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",js=["implementation","review-consult"],Uf=["running","done","failed","interrupted"],Wf={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function zf(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function Hf(e){let t=wt(e);if(t.length>0)return t.map(s=>c`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let r=Jr(e);if(!r||!e)return"";let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${r.replace(/^τ /,"\u03C4 \uCD1D ")}${n}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${nc}
          >부분 집계</span
        >`:""}`}function rc(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function Jo(e){if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?ea(t):""}function Gf(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e;return typeof t.launch_id!="string"||t.launch_id.length===0||t.provider!=="codex"||!js.includes(t.role)||typeof t.model!="string"||t.model.length===0||typeof t.session_id!="string"||t.session_id.length===0||!Uf.includes(t.status)||typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))||!(t.turn_id===null||typeof t.turn_id=="string")?null:t}function Vf(e,t){let n=wt({providers:{codex:{subtotal:t.subtotal,breakdown:t.usage,...t.replayed?{replayed:!0}:{}}},roles:{}})[0];return c`<div class="detail-session__leg detail-session__usage-detail">
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${[t.provider,t.model].filter(Boolean).join(" \xB7 ")}</span
    >
    ${t.session_id?c`<span
          class="detail-session__leg-sid detail-session__sid"
          title=${t.session_id}
          >${t.session_id.slice(0,8)}</span
        >`:""}
    ${Jo(t.completed_at)?c`<span class="detail-session__leg-time detail-session__time"
          >${Jo(t.completed_at)}</span
        >`:""}
    ${n?c`<span class="detail-session__usage" title=${n.tooltip}
          >${n.label}</span
        >`:""}
  </div>`}function Yf(e,t,r,n){let s=e.status==="running"?null:t,a=(s?wt({providers:{codex:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],i=e.status==="running"?ea(e.last_event_at):s?Jo(s.completed_at):"";return c`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>n.onOpenDelegation&&n.onOpenDelegation(r,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${Wf[e.status]}</span
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
    ${i?c`<span class="detail-session__leg-time detail-session__time"
          >${i}</span
        >`:""}
    ${a?c`<span class="detail-session__usage" title=${a.tooltip}
          >${a.label}</span
        >`:""}
  </button>`}function Kf(e,t){return e.role===t.role&&e.model===t.model&&e.session_id===t.session_id}function Zf(e,t,r){let n=[],s=new Set,o=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let f of o){let _=Gf(f);!_||s.has(_.launch_id)||(s.add(_.launch_id),n.push(_))}n.sort((f,_)=>f.started_at-_.started_at);let a={implementation:[],"review-consult":[]};if(t)for(let f of js){let _=t.roles[f]?.codex;a[f]=_?[..._.legs]:[]}let i=js.flatMap(f=>a[f]),l=new Set,d=[];for(let f of js){for(let _ of n.filter(g=>g.role===f)){let g=i.find(S=>S.receipt_id===_.launch_id)||null;g&&!Kf(_,g)||(g&&l.add(g.receipt_id),d.push(Yf(_,g,e.attempt_id,r)))}for(let _ of a[f])l.has(_.receipt_id)||d.push(Vf(f,_))}return d}function Xf(e,t){let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,n=[...Bf,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return c`<div class="detail-session__usage-detail">
    ${n.map(s=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${zf(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${r===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${r.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${nc}</span>`:""}
  </div>`}var Qf={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function ea(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=String(t.getHours()).padStart(2,"0"),n=String(t.getMinutes()).padStart(2,"0");return`${r}:${n}`}function Jf(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,n])=>typeof n=="string"&&n.length>0).map(([n,s])=>`${n}=${s}`).join(" \xB7 "):"",r=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${r}</span>
    ${t?c`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function sc(e,t={},r={}){let n=Array.isArray(e)?e:[],s=r.expanded||new Set;if(n.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let d of n)d&&typeof d.resumed_from=="string"&&d.resumed_from.length>0&&o.add(d.resumed_from);let a=d=>{if(!(d.status==="failed"||d.status==="orphaned"))return"";let _=typeof d.session_id=="string"&&d.session_id.length>0,g=o.has(d.attempt_id),S=_&&!g,k=_?g?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${d.attempt_id}
      ?disabled=${!S}
      title=${k}
      @click=${M=>{M.stopPropagation(),S&&t.onResume&&t.onResume(d.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},i=d=>{if(!(d.status==="failed"||d.status==="orphaned")||typeof d.cause!="string"||d.cause==="")return"";let _=d.cause_detail,g=_&&typeof _.reason=="string"&&_.reason.length>0?typeof _.command=="string"&&_.command.length>0?`${_.reason} \xB7 ${_.command}`:_.reason:d.cause;return c`<div class="detail-session__cause" title=${g}>
      ${d.cause}
    </div>`},l=d=>{let f=rc($o(d));if(wt(f).length===0&&!Jr(d.usage))return"";let _=s.has(d.attempt_id);return c`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${d.attempt_id}
      aria-expanded=${_?"true":"false"}
      title=${_?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${g=>{g.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(d.attempt_id)}}
    >
      τ 자세히
    </button>`};return c`
    <div class="detail-section-label">
      세션 이력${Hf(r.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${n.map(d=>{let f=$o(d),_=rc(f),g=wt(_);return c`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${d.status||"unknown"}"
            data-attempt-id=${d.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(d.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${Qf[d.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${d.attempt_id}</span>
            ${Sr(d)?c`<span
                  class="detail-session__resumed"
                  title=${Sr(d)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${or(d)}</span>
            ${g.length>0?c`<span class="detail-session__role">orchestrator</span>`:""}
            ${d.session_id?c`<span class="detail-session__sid" title=${d.session_id}
                  >${String(d.session_id).slice(0,8)}</span
                >`:""}
            ${g.length>0?g.map(S=>c`<span
                      class="detail-session__usage"
                      title=${S.tooltip}
                      >${S.label}</span
                    >`):Jr(d.usage)?c`<span class="detail-session__usage"
                    >${Jr(d.usage)}</span
                  >`:""}
            <span class="detail-session__time">${ea(d.started_at)}</span>
          </button>
          ${l(d)} ${a(d)} ${i(d)} ${Jf(d)}
          ${s.has(d.attempt_id)&&d.usage?Xf(d.usage,d.runner==="codex"?"codex":"claude"):""}
          ${Zf(d,f,t)}
        </div>`})}
    </div>
  `}function oc(e,t={}){return c`
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
          ${e_(e)}
        </div>`:""}
  `}function e_(e){let t=rn(e);if(t)return t;let r=e.data;if(!r)return"";if(r.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof r.default_task_prompt=="string"?hr("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",r.default_task_prompt):""}`;let n=Es(r.recorded_at);return c`<div class="detail-prompt__meta">
      ${r.attempt_id}${n?` \xB7 ${n}`:""}
    </div>
    ${typeof r.task_prompt=="string"?hr("\uACFC\uC5C5 (user)",r.task_prompt):""}
    ${typeof r.system_prompt=="string"?hr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",r.system_prompt):""}`}var t_=["open","in_progress","deferred","resolved","closed"],r_=[0,1,2,3,4];function ac(e,t){let r=t.issueStores,n=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,i=t.execPresetStore,l=t.sessionLogStore,d=null,f=null,_={},g="",S=!1,k=!1,M={},D=!1,E=!1,B="",ee="",A="";function w(){D=!1,E=!1,B="",ee="",A=""}let R=[],N=null,Z=null,fe=!1,pe="",ne=!1,ie=0,Me=new Set;function je(){R=[],N=null,Z=null,fe=!1,pe="",ne=!1,ie+=1,Me.clear()}async function He(u){if(!s)return;let $=++ie;try{let y=await Promise.resolve(s("get-comments",{id:u}));if($!==ie||u!==d)return;R=Array.isArray(y)?y:[],fe=!1}catch{if($!==ie||u!==d)return;fe=!0}b()}function Ze(){if(!s||!d)return;let u=f&&typeof f.comment_count=="number"?f.comment_count:null;if(N!==d){N=d,Z=u,He(d);return}u!==null&&u!==Z&&(Z=u,He(d))}function Ve(u){Me.has(u)?Me.delete(u):Me.add(u),b()}function Ye(u){let $=pe.trim().length===0;pe=u,$!==(u.trim().length===0)&&b()}async function me(){let u=pe.trim();if(!s||!d||u.length===0||ne)return;let $=d;ne=!0,b();let y=!1;try{let G=await Promise.resolve(s("add-comment",{id:$,text:u}));Array.isArray(G)&&G.length>0&&(y=!0,$===d&&(R=G,fe=!1,pe="",Z=G.length))}catch{y=!1}y||le("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),$===d&&(ne=!1),b()}let xe={onToggle:Ve,onDraftInput:Ye,onSubmit:me},ke=document.createElement("div");ke.className="md-viewer-root",document.body.appendChild(ke);let Le=tc(ke,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),he=document.createElement("div");he.className="session-log-root",document.body.appendChild(he);let Q=Cs(he,{transport:s?(u,$)=>Promise.resolve(s(u,$)):void 0,sessionLogStore:l}),V=!1,$e=!1,ge=!1,te=null,U=null,W=0;function T(u){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${u}`}function H(){V=!1,$e=!1,ge=!1,te=null,U=null,W+=1}async function I(u){if(!s)return;let $=++W;$e=!0,ge=!1,b();try{let y=await Promise.resolve(s("get-bead-prompt",{bead_id:u}));if($!==W)return;!y||typeof y!="object"||Array.isArray(y)?ge=!0:(te=y,U=T(u))}catch{$===W&&(ge=!0)}finally{$===W&&($e=!1,b())}}function K(){if(V=!V,V&&d&&U!==T(d)){te=null,I(d);return}b()}function de(){if(!a||!d)return[];let u=a.get();return(u&&u.attempts?Object.values(u.attempts):[]).filter(y=>y&&y.bead_id===d).sort((y,G)=>(G.started_at||0)-(y.started_at||0)).map(y=>({attempt_id:y.attempt_id,bead_id:y.bead_id,status:y.status,started_at:typeof y.started_at=="number"?y.started_at:null,runner:y.runner||null,model:y.model||null,effort:y.effort||null,speed:y.speed||null,session_id:y.session_id||null,resumed_from:y.resumed_from||null,continuation_mode:y.continuation_mode||null,dismissed_at:typeof y.dismissed_at=="number"?y.dismissed_at:null,cause:typeof y.cause=="string"?y.cause:null,cause_detail:y.cause_detail||null,exec_default_preset_id:typeof y.exec_default_preset_id=="string"?y.exec_default_preset_id:null,exec_default_preset_revision:typeof y.exec_default_preset_revision=="number"?y.exec_default_preset_revision:null,exec_values:y.exec_values&&typeof y.exec_values=="object"?y.exec_values:null,usage:y.usage||null,usage_legs:Array.isArray(y.usage_legs)?y.usage_legs:[],delegation_sessions:Array.isArray(y.delegation_sessions)?y.delegation_sessions:[]}))}function Y(){if(!a||!d)return null;let u=a.get();return Ut(u&&u.attempts||{},d)}let _e=new Set;function be(u){_e.has(u)?_e.delete(u):_e.add(u),b()}function C(u){let $=a?a.get():null,y=$&&$.attempts?$.attempts[u]:null;Q.open({attempt_id:u,meta:y?{runner:y.runner||void 0,model:y.model||void 0,effort:y.effort||void 0,status:y.status||void 0,session_id:y.session_id||void 0}:{}})}function q(u,$){let y=a?a.get():null,G=y&&y.attempts?y.attempts[u]:null,Ce=(G&&Array.isArray(G.delegation_sessions)?G.delegation_sessions:[]).find(ze=>ze&&typeof ze=="object"&&ze.launch_id===$);Ce&&Q.open({attempt_id:u,launch_id:$,meta:{runner:"codex",role:Ce.role,model:Ce.model,session_id:Ce.session_id,status:Ce.status}})}async function X(u){if(!s||!u)return;let $=await Qr();if($===null)return;let y=()=>{let ze=a?a.get():null;return ze&&typeof ze.revision=="number"?ze.revision:0},G=async(ze={},De=y())=>await s("worker-attempt-resume",{attempt_id:u,expected_revision:De,...$!==""?{instructions:$}:{},...ze}),Se=ze=>{ze?.queue&&a?.set&&a.set(ze.queue)},Ce=await G();if(Se(Ce),Ce&&Ce.conflict){let ze=Ce.queue&&typeof Ce.queue.revision=="number"?Ce.queue.revision:y();Ce=await G({},ze),Se(Ce)}Ce=await pr(Ce,(ze,De)=>G({continuation:ze,decision_token:De}),{onResult:Se,refresh:()=>G()}),Ce&&Ce.resumed===!1&&!Ce.conflict&&Ce.reason&&le(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${Ce.reason}`,"error",2400)}let re={onOpen:C,onOpenDelegation:q,onResume:X,onToggleUsage:be};function ve(){let u=a?a.get():null,$={...M};for(let y of["orchestration_model","orchestration_effort","orchestration_speed"]){let G=u&&u[y];typeof G=="string"&&($[y]=G)}return $}async function x(){if(s){try{let u=await Promise.resolve(s("get-session-defaults",{}));M=u&&u.values&&typeof u.values=="object"?u.values:{}}catch{M={}}b()}}function P(){let u=a?a.get():null;return u&&u.runner_catalog||null}function ue(){let u=a?a.get():null;return u&&typeof u.execution_defaults=="object"?u.execution_defaults:null}function Ee(){let u=f?.metadata&&typeof f.metadata=="object"?f.metadata:{},y=fr({pin:{...u,..._},global:ve(),execution_defaults:ue(),runner_catalog:P()}).orchestration_model.value||"";return Qo(P(),y)}function qe(){let u=i?i.get():null;return!u||typeof u.revision!="number"?null:{revision:u.revision,presets:Array.isArray(u.presets)?u.presets:[]}}function Ae(u){return u?.compatible===!1}function Ge(u){i&&u&&typeof u.revision=="number"&&Array.isArray(u.presets)&&i.set({revision:u.revision,presets:u.presets})}async function We(){let u=qe(),$=u?.presets.find(y=>y.id===g);if(!(!s||!d||!u||!$||Ae($)||S)){S=!0,b();try{let y=await Promise.resolve(s("apply-impl-preset",Yl(d,$.id,u.revision)));if(y&&y.conflict){Ge(y),le("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let G=y&&Array.isArray(y.issue)?y.issue[0]:y?.issue;if(y&&y.applied&&G&&typeof G=="object"){f=G;for(let Se of Xl)delete _[Se];le("\uAD6C\uD604 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",2400);return}y&&y.error==="bd_readback_failed"?le("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):le("\uAD6C\uD604 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(y){y&&typeof y=="object"&&y.code==="bd_readback_failed"?le("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):le("\uAD6C\uD604 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{S=!1,b()}}}let gt=null;r&&r.subscribe&&(gt=r.subscribe(()=>it()));let ot=null;a&&typeof a.subscribe=="function"&&(ot=a.subscribe(()=>{d&&b()}));let at=null;i&&typeof i.subscribe=="function"&&(at=i.subscribe(()=>{d&&b()}));function dt(u){u.key==="Escape"&&d&&(u.preventDefault(),n())}document.addEventListener("keydown",dt);function it(){if(d){if(r&&typeof r.snapshotFor=="function"){let u=r.snapshotFor("detail:"+d)||[];f=u.find(y=>y&&y.id===d)||u[0]||f}Ze(),b()}}function ft(u){ur(u).then($=>{$?le("\uBCF5\uC0AC\uB428","success",1200):le("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function z(u){u.preventDefault(),u.stopPropagation(),d&&ft(d)}function J(u,$){u.preventDefault(),u.stopPropagation(),ft($)}function ye(u,$,y){u.preventDefault(),u.stopPropagation(),Le.open($,{missing_state:y})}function we(u,$){_[u]=$,b(),!(!s||!d)&&Promise.resolve(s("update-exec-settings",Vl(d,u,$.length===0?null:$))).catch(()=>{le("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function ce(u,$){let y=f||{},G=y.metadata&&typeof y.metadata=="object"?y.metadata:{},Se={};for(let De of["impl_runtime","impl_model","impl_effort"])Se[De]=Object.hasOwn(_,De)?_[De]:typeof G[De]=="string"?G[De]:"";Se[u]=$;let Ce=ec(Se,P(),Ee()),ze={};for(let De of["impl_runtime","impl_model","impl_effort"])ze[De]=_[De],_[De]=Ce[De]||"";b(),!(!s||!d)&&Promise.resolve(s("update-impl-target",{id:d,...Ce,orchestration_runtime:Ee()})).then(De=>{let pt=Array.isArray(De)?De[0]:De;if(!pt||typeof pt!="object"||!pt.id)throw new Error("implementation target readback failed");f=pt;for(let Ie of["impl_runtime","impl_model","impl_effort"])delete _[Ie];b()}).catch(()=>{for(let De of["impl_runtime","impl_model","impl_effort"])ze[De]===void 0?delete _[De]:_[De]=ze[De];b(),le("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function Oe(u,$,y){if(!s||!d)return!1;try{let G=await Promise.resolve(s(u,$)),Se=Array.isArray(G)?G[0]:G;return Se&&typeof Se=="object"&&Se.id?(f=Se,!0):(le(y,"error"),!1)}catch{return le(y,"error"),!1}}function tt(u){setTimeout(()=>{try{let $=e.querySelector(u);$&&typeof $.focus=="function"&&$.focus()}catch{}},0)}function Xe(){D=!0,B=f&&f.title||"",b(),tt('.detail-edit__input[data-edit="title"]')}function Pe(u){B=u.target.value}function Je(){D=!1,B="",b()}function Te(){Oe("edit-text",{id:d,field:"title",value:B},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then($=>{$&&(D=!1,B=""),b()})}function bt(){E=!0,ee=f&&f.description||"",b(),tt('.detail-edit__textarea[data-edit="description"]')}function Ot(u){ee=u.target.value}function qt(){E=!1,ee="",b()}function Ft(){Oe("edit-text",{id:d,field:"description",value:ee},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then($=>{$&&(E=!1,ee=""),b()})}function wr(u,$,y,G){if(u.key==="Escape"){u.stopPropagation(),y();return}u.key==="Enter"&&(!G||u.ctrlKey||u.metaKey)&&(u.preventDefault(),$())}function kt(u){let $=u.target.value;Oe("update-status",{id:d,status:$},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>b())}function xt(u){let $=Number(u.target.value);Oe("update-priority",{id:d,priority:$},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>b())}function cr(u){A=u.target.value}function rr(){let u=A.trim();u.length!==0&&Oe("label-add",{id:d,label:u},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then($=>{$&&(A=""),b()})}function zt(u){if(u.key==="Escape"){u.stopPropagation(),A="",b();return}u.key==="Enter"&&(u.preventDefault(),rr())}function Ht(u){Oe("label-remove",{id:d,label:u},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>b())}let $t={onCopyPath:J,onOpenDoc:ye};function nr(u){return typeof u=="string"?u:u&&typeof u=="object"?String(u.id||u.to||u.issue_id||u.depends_on||""):""}function p(u){switch(u&&typeof u=="object"?String(u.dependency_type||u.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function v(u){let y=(Array.isArray(u.dependencies)?u.dependencies:[]).map(G=>({id:nr(G),icon:p(G)})).filter(G=>G.id.length>0);return c`
      <div class="detail-section-label">의존성</div>
      ${y.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${y.map(G=>o?c`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(G.id)}
                  >
                    ${G.icon?`${G.icon} `:""}${G.id}
                  </button>`:c`<span class="detail-dep"
                    >${G.icon?`${G.icon} `:""}${G.id}</span
                  >`)}
          </div>`}
    `}function F(u){let $=u.metadata||{},y=u.workflow||{},G=y.stages||{},Se=G.spec&&G.spec.stale,Ce=G.impl&&G.impl.stale,ze=G.plan||null,De=y.route_source==="derived",pt=y.route||$.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${De?" detail-kv__v--derived":""}"
          title=${De?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${De?"unset":pt}</span
        >
      </div>
      ${y.route!=="quick_fix"||Object.hasOwn($,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${$.spec_review||"\uC5C6\uC74C"}${Se?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${y.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${ze?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${ze?.approval_receipt||"\uC5C6\uC74C"}${ze?.approval_state==="stale"?" \xB7 stale":ze?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${y.route!=="quick_fix"||Object.hasOwn($,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${$.impl_review||"\uC5C6\uC74C"}${Ce?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${y.planned_execution?c`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${y.planned_execution.kind}</span>
            </div>
            ${y.planned_execution.kind==="main"?c`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${y.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${y.exec_receipt?c`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${`${y.exec_receipt.kind}:${y.exec_receipt.actor}@${y.exec_receipt.sha}`}</span
            >
          </div>`:""}
      ${y.impl_entry?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${y.impl_entry.actor}@${y.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${$.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${$.pr_url}</span>
          </div>`:""}
    `}let se={route:["quick_fix","spec_backed","full_plan"]};async function j(u,$){let y=$.target.value;if(u==="route"&&f&&f.metadata&&f.metadata.route==="full_plan"&&y!=="full_plan"&&!window.confirm(`full_plan \u2192 ${y||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){b();return}await Oe("update-workflow-meta",{id:d,key:u,value:y},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),b()}function h(u){let $=u.metadata||{};return c` ${((G,Se)=>{let Ce=se[G],ze=typeof $[G]=="string"?$[G]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${G}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${G}
          data-edit=${`wfmeta-${G}`}
          @change=${De=>j(G,De)}
        >
          <option value="" ?selected=${!Ce.includes(ze)}>
            ${Se}
          </option>
          ${Ce.map(De=>c`<option value=${De} ?selected=${ze===De}>${De}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function L(u,$){return D?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${B}
            @input=${Pe}
            @keydown=${y=>wr(y,Te,Je,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${Te}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${Je}
            >
              취소
            </button>
          </div>
        </div>
      `:c`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${u}</h2>
        ${wt($).map(y=>c`<span class="detail-usage-total" title=${y.tooltip}
              >${y.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${Xe}
        >
          ✎
        </button>
      </div>
    `}function oe(u){let $=vt(u.created_at),y=vt(u.updated_at);return!$&&!y?c``:c`
      ${$?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${$}</span>
          </div>`:""}
      ${y?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${y}</span>
          </div>`:""}
    `}function Re(u,$){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${kt}
        >
          ${t_.map(y=>c`<option value=${y} ?selected=${y===u}>${y}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${xt}
        >
          ${r_.map(y=>c`<option value=${String(y)} ?selected=${y===$}>
                P${y}
              </option>`)}
        </select>
      </div>
    `}function rt(u){return c`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${E?"":c`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${bt}
            >
              ✎
            </button>`}
      </div>
      ${E?c`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${ee}
              @input=${Ot}
              @keydown=${$=>wr($,Ft,qt,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${Ft}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${qt}
              >
                취소
              </button>
            </div>
          </div>`:c`<div class="detail-overlay__desc">
            ${u||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function Fe(u){let $=typeof u.notes=="string"?u.notes:"";return $.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${$}</div>
    `}function Qe(u){let $=Array.isArray(u.labels)?u.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${$.map(y=>c`<span class="detail-label-chip"
              >${y}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${y}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+y}
                @click=${()=>Ht(y)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${A}
            @input=${cr}
            @keydown=${zt}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${rr}
          >
            추가
          </button>
        </span>
      </div>
    `}function mt(){if(!d)return c``;let u=f||{},$=String(u.id||d),y=u.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",G=Y(),Se=u.status||"open",Ce=typeof u.priority=="number"?Math.max(0,Math.min(4,u.priority)):"",ze=u.description||"",De={...u,metadata:{...u.metadata||{},..._}};return c`
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
            @click=${z}
          >
            ${$}
          </button>
          ${L(y,G)}
          ${Zl(De)}
          ${Kl({metadata:De.metadata,workspace_values:ve(),catalog:P(),execution_defaults:ue(),expanded:k,presets:qe()?.presets||[],preset_id:g,preset_busy:S},{onToggle:pt=>{k=pt,b()},onEdit:(pt,Ie)=>{if(pt==="impl_runtime"||pt==="impl_model"||pt==="impl_effort"){ce(pt,Ie??"");return}we(pt,Ie??"")},onPresetSelect:pt=>{g=pt,b()},onPresetApply:()=>{We()}})}
          ${Re(Se,Ce)} ${oe(u)}
          ${rt(ze)}
          ${Nl(R,xe,{expanded:Me,draft:pe,sending:ne,error:fe})}
          ${Fe(u)} ${Qe(u)} ${v(u)}
          ${F(u)} ${h(u)}
          ${Pl(u,$t)}
          ${oc({expanded:V,loading:$e,error:ge,data:te},{onToggle:K})}
          ${sc(de(),re,{total:G,expanded:_e})}
        </div>
      </div>
    `}function b(){Be(mt(),e)}return{load(u){u!==d&&(_={},g="",k=!1,w(),je(),H()),d=u,f=null,it(),x()},clear(){d=null,f=null,_={},g="",S=!1,k=!1,w(),je(),H(),Le.close(),Q.close(),Be(c``,e)},destroy(){gt&&(gt(),gt=null),ot&&(ot(),ot=null),at&&(at(),at=null),document.removeEventListener("keydown",dt),Le.destroy(),ke.parentNode&&ke.parentNode.removeChild(ke),Q.destroy(),he.parentNode&&he.parentNode.removeChild(he),d=null,f=null,g="",S=!1,je(),H(),Be(c``,e)}}}function ic(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let r=t.querySelector("#fatal-error-title"),n=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),i=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},l=(d,f,_="")=>{r&&(r.textContent=d||"Unexpected Error"),n&&(n.textContent=f||"An unrecoverable error occurred.");let g=typeof _=="string"?_.trim():"";if(s&&(g.length>0?(s.textContent=g,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>i()),t.addEventListener("cancel",d=>{d.preventDefault(),i()}),{open:l,close:i,getElement(){return t}}}function Bs(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function Us(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let r=Math.floor(t/60);if(r<60)return`${r}\uBD84 ${Math.round(t-r*60)}\uCD08`;let n=Math.floor(r/60),s=r%60;return`${n}\uC2DC\uAC04 ${s}\uBD84`}function lc(e,t){if(typeof e!="object"||e===null)return null;let r=0,n=!1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t)continue;let a=o.started_at,i=o.finished_at;typeof a!="number"||typeof i!="number"||!Number.isFinite(a)||!Number.isFinite(i)||i<a||(r+=i-a,n=!0)}return n?r:null}function Ws(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function n_(e,t){let r=Array.isArray(e)?e:[],n=Array.isArray(t)?t:[];if(r.length===0&&n.length===0)return null;let s=null;for(let i of r)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!s||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=i);let o=r.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+n.length,a=r.some(i=>i.state==="repairing");return{deploy:s?{sha:Bs(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function cc(e,t){let r=n_(e,t);return r?c`<button
    type="button"
    class="worker-repo-strip"
    data-seam="repo-ops-strip"
    aria-label="저장소 작업 타임라인 열기"
  >
    <span class="worker-repo-strip__cue" aria-hidden="true">▸</span>
    <span class="worker-repo-strip__name">저장소 작업</span>
    ${r.deploy?c`<span class="worker-repo-strip__fact">
          배포
          <code class="worker-repo-strip__sha">${r.deploy.sha}</code>
          <span class="worker-repo-strip__ok">✓ 최신</span>
          <span
            class="worker-repo-strip__ago"
            title=${r.deploy.at?vt(r.deploy.at):""}
            >${Ws(r.deploy.at)}${r.deploy.elapsed_ms!==null?` \xB7 ${Us(r.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${r.badge.tone}"
      >${r.badge.label}</span
    >
  </button>`:""}function sn(e){let t=Dt(e.created_at),r=Dt(e.updated_at);return!t&&!r?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${vt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&r?c`<span>·</span>`:""}${r?c`<span title=${`\uC218\uC815 ${vt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </div>`}function s_(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function On(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function zs(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function lr(e,t,r={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(_=>_&&_.bead_id===t&&_.phase!=="done").sort((_,g)=>(_.requested_at||0)-(g.requested_at||0)).at(-1),o=typeof r.attempt_id=="string"&&r.attempt_id.length>0?r.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=r.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":r.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":r.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,i=typeof s?.last_error=="string"?s.last_error:null,l=s?s_(s.phase):null,d=s?.kind==="stale_work_backup_fresh",f=r.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!r.external&&!r.done,enabled:!a&&(!s||!!i),label:d?i?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":i?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(i?d?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${i} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${i} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${l||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:f==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:l,error:i,confirmation:f}}function yr(e){let t=e.discard;if(!t||!t.operation)return"";let r=t.operation,n=r.kind==="stale_work_backup_fresh"&&!t.error?null:r.backup?.path,s=r.original_pr,o=r.revert_pr;return c`<div
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
  </div>`}var o_={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function dc(e,t=!1){if(!e||typeof e!="object")return null;let r=e;if(r.reason!=="worktree_stale_work"||!r.stale_work||typeof r.stale_work!="object")return null;let n=r.stale_work,s=n.residue==="branch"?"branch":"worktree",o=n.state==="unique"?"unique":"unknown",a=n.summary&&typeof n.summary=="object"?n.summary:{};function i(d){return Number.isInteger(a[d])?Number(a[d]):0}let l=typeof n.cause=="string"?n.cause:"observe_failed";return{residue:s,state:o,title:s==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":o==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:o_[l]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:s==="branch"?`\uACE0\uC720 commit ${i("branch_ahead")}`:[`staged ${i("staged_count")}`,`unstaged ${i("unstaged_count")}`,`untracked ${i("untracked_count")}`,`branch ahead ${i("branch_ahead")}`,`HEAD ahead ${i("head_ahead")}`].join(" \xB7 "),action_id:typeof n.action_id=="string"?n.action_id:"",can_resume:n.can_resume===!0,can_continue:n.can_continue===!0,can_backup_fresh:n.can_backup_fresh===!0,can_recheck:n.can_recheck===!0,locked:t}}function ta(e){let t=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],n=wt(e.usage),s=Zt(e.usage),o=e.merge_step||null,a=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,i=e.lane==="done"&&!a,l=i?Dt(e.done_at):"",d=t?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",f=typeof e.seq=="number"?c`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",_=e.worker_serial===!0?c`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",g=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",S=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,k=c`<span class="worker-mini__title">${e.title}</span>`,M=e.pr_url&&e.pr_number?c`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",D=e.completion_repair_pr_url&&e.completion_repair_pr_number?c`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",E=r.map(He=>He===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${He}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${He===e.completion_badge&&e.completion_title||""}
          >${He}</span
        >`),B=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",ee=n.length>0?n.map(He=>c`<span class="worker-usage" title=${He.tooltip}
              >${He.label}</span
            >`):s?c`<span class="worker-usage" title=${en(e.usage)}
            >${s}</span
          >`:"",A=o?c`<span
        class="merge-step${o.failed?" merge-step--failed":""}"
        style=${`--progress: ${o.percent}%`}
        >${o.label}${o.index>0?c`<span class="merge-step__n"
              >${o.index}/${o.total}</span
            >`:""}</span
      >`:"",w=e.merge_action?c`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",R=e.cancel_action?c`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",N=e.timeline_action?c`<button
        type="button"
        class="worker-mini__timeline"
        data-bead-id=${e.id}
        title="저장소 작업이 끝나지 않아 머지 액션이 잠겼습니다 — 타임라인에서 원인과 해결 버튼을 볼 수 있습니다"
      >
        저장소 작업 보기
      </button>`:"",Z=e.discard,fe=Z?.action||e.discard_action?c`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${Z?.attempt_id||""}
          data-operation-id=${Z?.operation?.operation_id||""}
          data-discard-mode=${Z?.confirmation||"unmerged"}
          ?disabled=${Z?!Z.enabled:e.discard_enabled===!1}
          title=${Z?Z.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${Z?.label||"\uD3D0\uAE30"}
        </button>`:"",pe=e.stale_work||null,ne=pe?c`${pe.can_resume||pe.can_continue?c`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${pe.action_id}
            ?disabled=${pe.locked}
          >
            기존 작업 이어가기
          </button>`:""}${pe.can_backup_fresh?c`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${pe.action_id}
            ?disabled=${pe.locked}
          >
            백업 후 새로 시작
          </button>`:""}${pe.can_recheck?c`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${pe.action_id}
            ?disabled=${pe.locked}
          >
            다시 확인
          </button>`:""}`:"",ie=pe?c`<div class="worker-mini__stale">
        <strong>${pe.title}</strong>
        <span>${pe.summary}</span>
        <span>${pe.cause}</span>
        ${pe.can_backup_fresh?c`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",Me=e.revise_action?c`<button
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
        </button>`:"",je=!!(s||o||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||Z?.operation||e.revise_action||pe);return c`<div
    class="worker-mini${a?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${o?" worker-mini--merging":""}${o?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${i?c`<div class="worker-mini__row1">${g}${S}${k}</div>
          <div class="worker-mini__row2">
            ${ee}${l?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${vt(e.done_at)}`}
                  >완료 ${l}</span
                >`:""}${typeof e.work_ms=="number"?c`<span
                  class="worker-mini__work"
                  title="attempt 실행 시간 합산 (재개 세션 포함)"
                  >작업 ${Us(e.work_ms)}</span
                >`:""}${E}${A}
            <span class="worker-mini__actions"
              >${w}${R}${N}${fe}</span
            >
            ${sn(e)}
          </div>`:a?c`<div class="worker-mini__head">
              ${d}${f}${g}${S}${M}${D}${E}${_}${B}
            </div>
            <div class="worker-mini__body">${k}${ie}</div>
            ${je?c`<div class="worker-mini__foot">
                  ${ee}${A}
                  <span class="worker-mini__actions"
                    >${w}${R}${N}${fe}${Me}${ne}</span
                  >
                  ${yr(e)}
                </div>`:""}
            ${sn(e)}`:c`<div class="worker-mini__line">
              ${d}${f}${g}${S}${k}${M}${D}${E}${_}${B}${ee}${A}${w}${R}${N}${fe}
            </div>
            ${yr(e)} ${sn(e)}`}
  </div>`}function a_(e){let t=e.draggable&&!e.done,r=e.workflow,n=r&&r.chips||{},s=n.route||r&&r.route,o=n.route_source==="derived"||!!(r&&r.route_source==="derived"),a=typeof e.reason=="string"&&e.reason.split(" \xB7 ").includes("missing_description"),i=typeof e.reason=="string"&&e.reason.startsWith("\u26D4");return c`<div
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
    ${r?ds(r,e.status):""}
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
        title=${t?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":a?"description\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"spec\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
      >
        대기로 ↴
      </button>
    </div>
    ${sn(e)}
  </div>`}function tr(e){let t=!!e.collapsible&&!!e.collapsed,r=c`<span
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
                  </div>`:e.items.map(n=>e.lane==="candidate"?a_(n):ta(n))}
          </div>`}
  </section>`}var uc=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],Pn=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function Hs(e,t){let r=uc.find(s=>s.step===e);if(!r)return null;let n=uc.length;return{step:r.step,label:t,index:r.index,total:n,percent:Math.round(r.index/n*100)}}function pc(e){let t=Pn.findIndex(r=>r.step===e);return Pn.map((r,n)=>({step:r.step,label:r.label,state:t<0?"todo":n<t?"done":n===t?"stall":"todo"}))}function Ur(e){let t=Pn.find(r=>r.step===e);return t?t.label:typeof e=="string"?e:""}function i_(e){let t=Pn.findIndex(r=>r.step===e);return t<0?null:{index:t+1,total:Pn.length}}function Gs(e){let t=i_(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var na=new Set(["queued","running","retry_pending","repairing"]),fc=new Set(["failed","succeeded"]),l_={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",repairing:"\uC790\uB3D9 \uD574\uACB0 \uC911",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},Dn={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},c_={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:Dn.base_containment,child_sweep:Dn.child_sweep,branch_cleanup:Dn.branch_cleanup,parent_close:Dn.parent_close};function d_(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function u_(e,t,r){return!["verify","deploy"].includes(e.kind)||![...na,...fc].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(n=>n&&typeof n=="object"&&n.bead_id===t&&n.merged_sha===r)}function p_(e,t){let r=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(r!==0)return r;let n=d=>d.state==="succeeded"?1:2,s=n(t)-n(e);if(s!==0)return s;let o=typeof e.requested_at=="number"?e.requested_at:0,a=typeof t.requested_at=="number"?t.requested_at:0;if(o!==a)return a-o;let i=typeof e.operation_id=="string"?e.operation_id:"",l=typeof t.operation_id=="string"?t.operation_id:"";return i.localeCompare(l)}function ra(e,t=!1){let r=e.kind,n=r==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",s=t?"failed":e.state,o=l_[s];if(!o)return null;let a=Hs(r,`${n} ${o}`);return a?{...a,active:na.has(s),failed:s==="failed"}:null}function f_(e){return!e||typeof e!="object"?null:c_[e.step]||null}function Mn(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,r=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},n=f_(r),s=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,o=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),a=!o&&(e.cleanup_cursor==="repo_operations"||r.step==="repo_operations"),i=d_(e.merge_sha)?e.merge_sha:null,l=!o&&i&&Array.isArray(e.repo_operations)?e.repo_operations.filter(k=>k&&typeof k=="object"&&u_(k,t,i)).sort(p_):[],d=a?l:[],f=d.find(k=>na.has(k.state));if(f)return ra(f);if(s)return s.step==="repo_operations"&&l[0]?ra(l[0],!0):null;let _=d.find(k=>fc.has(k.state)?k.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(_)return ra(_);if(n){let k=Hs(n.step,n.label);return k?{...k,active:!0,failed:!1}:null}let g=typeof e.cleanup_cursor=="string"?Dn[e.cleanup_cursor]:null;if(!g)return null;let S=Hs(g.step,g.label);return S?{...S,active:!0,failed:!1}:null}function Vs(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var _c={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},mc={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."};function gc(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function sa(e){for(let t of gc(e))if(Object.hasOwn(_c,t))return _c[t];return null}function oa(e){let t=null;for(let r of gc(e))Object.hasOwn(mc,r)&&(t=mc[r]);return t}function Ys(e){let t=sa(e),r=oa(e);return t&&r?`${t} \u2014 ${r}`:t||r?t||r:typeof e=="string"?e:""}function bc(e,t){let r=sa(e)??sa(t),n=oa(t)??oa(e);return r&&n?`${r} \u2014 ${n}`:r||n?r||n:typeof t=="string"?t:""}var hc=160;function __(e){return e.length>hc?`${e.slice(0,hc)}\u2026`:e}function m_(e){return!e||!e.reason?"":c`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?c` · <code>${__(e.command)}</code>`:""}
  </div>`}function g_(e){return e?c`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function aa(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),r=Math.floor(t/60),n=t%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function vc(e){let t=e.failure?Ys(e.failure.reason):"";return c`<div class="worker-banners">
    ${e.failure?c`<div class="worker-banner worker-banner--failure" role="alert">
          ⛔ ${e.failure.repo||"repo"} 세션 실패 —
          ${t}${t&&!t.endsWith(".")?".":""}
          자동 진행을 껐습니다, 수동 ▶ 필요.
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
                title="실패 알림 닫기 — 레인에는 남습니다"
                aria-label="배너 닫기"
              >
                ✕
              </button>`:""}
          ${m_(e.failure.cause_detail)}
          ${g_(e.failure.reason)}
          ${yr({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function b_(e,t,r=null){let n=e.failed===!0,s=!!e.paused,o=n?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):s?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?aa(t-e.started_at):"\u2014",a=or(e),i=Sr(e),l=wt(e.usage),d=Zt(e.usage),f=e.conflict_resolution?s?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,_=e.base_exception||null,g=e.landing,S=e.attempt_id&&e.attempt_id===r,k=e.discard?.action?c`<button
        type="button"
        class="rtile__discard"
        data-operation-id=${e.discard.operation?.operation_id||""}
        ?disabled=${!e.discard.enabled}
        title=${e.discard.title}
        aria-label=${e.discard.label}
      >
        ${e.discard.label}
      </button>`:"";return c`<div
    class="rtile${S?" rtile--sel":""}${s?" rtile--paused":""}${n?" rtile--failed":""}"
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
            ${k}
            <button
              type="button"
              class="rtile__dismiss"
              title="실패 알림 닫기 — 레인에는 남습니다"
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
            ${k}`}
    </div>
    <div class="rtile__title">${e.title}</div>
    ${e.current_child?c`<div class="rtile__child" title="현재 진행중 child">
          └ ${e.current_child}
        </div>`:""}
    ${g?c`<div class="rtile__landing">
          <span
            class="merge-step${g.failed?" merge-step--failed":""}"
            style=${`--progress: ${g.percent}%`}
            >${g.label}${g.index>0?c`<span class="merge-step__n"
                  >${g.index}/${g.total}</span
                >`:""}</span
          >
        </div>`:""}
    ${a||l.length>0||d||f||_?c`<div class="rtile__meta">
          ${f?c`<span class="worker-mini__badge">${f}</span>`:""}
          ${_?c`<span
                class="worker-mini__badge"
                title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                >${_}</span
              >`:""}
          ${a?c`<span class="rtile__runner">${a}</span>`:""}
          ${l.length>0?l.map(M=>c`<span class="worker-usage" title=${M.tooltip}
                    >${M.label}</span
                  >`):d?c`<span
                  class="worker-usage"
                  title=${en(e.usage)}
                  >${d}</span
                >`:""}
        </div>`:""}
    ${sn(e)} ${yr(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${n||s?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function ia(e,t=Date.now(),r=null){let n=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>b_(s,t,r))}
  </div>`}function Wr(e){return c`<svg
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
  </svg>`}function la(){return Wr(kr`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function ca(){return Wr(kr`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function yc(){return Wr(kr`<rect x="4.3" y="4.3" width="7.4" height="7.4" rx="1.2" />`)}function wc(){return Wr(kr`<path d="M4.4 4.4 11.6 11.6M11.6 4.4 4.4 11.6" />`)}function kc(){return Wr(kr`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function $c(){return Wr(kr`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function xc(){return Wr(kr`<path d="M3 3.6 8.2 8 3 12.4z" />
    <path d="M8.8 3.6 14 8l-5.2 4.4z" />`)}var Nn=1,h_=6e4,v_={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"},y_=new Set(["auto_merge","merged","merge","done"]),Sc={running:3,paused:2,failed:1};function w_(e,t){let r=null,n=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=n&&(n=o,r=s)}return r}function k_(e,t){let r=Object.values(e||{}),n=new Set,s=new Map;for(let a of r)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&n.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of r){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let i=null;if(a.status==="running")i="running";else if(a.status==="paused"&&!n.has(a.attempt_id))i="paused";else if(a.status==="failed"||a.status==="orphaned"){let _=t.get(a.bead_id),g=typeof _=="number"&&_>0&&typeof a.finished_at=="number"&&_>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!g&&typeof a.dismissed_at!="number"&&(i="failed")}if(!i)continue;let l=typeof a.started_at=="number"?a.started_at:null,d=o.get(a.bead_id);if(d){let _=Sc[d.run_state],g=Sc[i];if(_>g||_===g&&(d.started_at??0)>(l??0))continue}let f=typeof a.session_id=="string"&&a.session_id.length>0;o.set(a.bead_id,{attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",run_state:i,started_at:l,last_event_at:typeof a.last_event_at=="number"?a.last_event_at:null,runner:typeof a.runner=="string"?a.runner:null,model:typeof a.model=="string"?a.model:null,effort:typeof a.effort=="string"?a.effort:null,speed:typeof a.speed=="string"?a.speed:null,resumed_from:typeof a.resumed_from=="string"?a.resumed_from:null,continuation_mode:a.continuation_mode==="session"||a.continuation_mode==="fresh"?a.continuation_mode:null,usage:Ut(e,a.bead_id),can_pause:i==="running"&&f,can_resume:i!=="running"&&f&&!n.has(a.attempt_id)})}return o}function Ac(e,t){let r=e[t];if(!r)return"";if(r.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let n=typeof r.reason=="string"?r.reason:"",s=n.indexOf(":");return s>0&&s<n.length-1?`\u26D4 ${n.slice(0,s)} (${n.slice(s+1)})`:`\u26D4 ${n}`}function Lt(e){return e&&typeof e=="object"?e:{}}function da(e,t,r){let n=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=r&&typeof r.done_since=="number"?r.done_since:void 0,a=new Map;for(let E of s)E&&typeof E.root_dir=="string"&&a.set(E.root_dir,E);let i=[],l=[],d=[],f=[],_=[],g=new Map;for(let E of n){if(!E||typeof E.root_dir!="string")continue;let B=E.root_dir,ee=E.name||B,A=a.get(B),w=A&&typeof A.revision=="number"?A.revision:typeof E.revision=="number"?E.revision:0,R=Lt(E.attempts),N=Lt(E.bead_titles),Z=Lt(E.pr_observations),fe=Lt(E.admission),pe=Lt(E.revise_parked),ne=Lt(E.merge_queue_state),ie=Lt(E.cleanup_failed),Me=Lt(E.discard_operations),je=Lt(E.pr_activity),He=Array.isArray(E.repo_operations)?E.repo_operations:[],Ze=Array.isArray(E.merge_queue)?E.merge_queue:[],Ve=new Set(Ze.filter(Q=>Q&&typeof Q.bead_id=="string").map(Q=>Q.bead_id)),Ye=new Map(Ze.filter(Q=>Q&&typeof Q.bead_id=="string").map(Q=>[Q.bead_id,Q])),me=Array.isArray(E.queue)?E.queue:[],xe=Array.isArray(E.done)?E.done:[],ke=new Map;for(let Q of xe)Q&&typeof Q.bead_id=="string"&&typeof Q.added_at=="number"&&ke.set(Q.bead_id,Q.added_at);let Le=Q=>({id:Q,title:N[Q]||Q,root_dir:B,workspace_name:ee,expected_revision:w,draggable:!1}),he=new Set;for(let[Q,V]of k_(R,ke))he.add(Q),l.push({...Le(Q),lane:"running",attempt_id:V.attempt_id,run_state:V.run_state,can_pause:V.can_pause,can_resume:V.can_resume,started_at:V.started_at,last_event_at:V.last_event_at,runner:V.runner,model:V.model,effort:V.effort,speed:V.speed,resumed_from:V.resumed_from,continuation_mode:V.continuation_mode,usage:V.usage,discard:lr(Me,Q,{attempt_id:V.attempt_id}),badges:V.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:V.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:V.run_state==="failed"});for(let Q of Array.isArray(E.pr_wait)?E.pr_wait:[]){let V=Q&&Q.bead_id;if(typeof V!="string"||he.has(V))continue;he.add(V);let $e=Lt(Z[V]),ge=Lt($e.pr),te=$e.gate?Lt($e.gate):null,U=Ve.has(V),W=Ye.get(V)?.continuation_action||null,T=!!W&&W.continuation===null,H=ne.active===V,I=Q.external===!0,K=ie[V]||null,de=Lt(je[V]),Y=Mn({bead_id:V,merge_sha:Q.merge_sha,cleanup_cursor:Q.cleanup_cursor,merge_progress:de.merge_progress||null,cleanup_failed:K,repo_operations:He}),_e=Vs(Y),be=!!te&&te.base_badge==="\uCDA9\uB3CC",C=!!K&&["child_sweep","branch_cleanup","parent_close"].includes(K.step)&&!!te&&te.tier==="merged",q=I&&!!K&&!!te&&te.tier==="merged",X=!!te&&["closed_unmerged","review","undecidable"].includes(te.tier),re=lr(Me,V,{external:I,merge_active:H||Y?.step==="merge",merge_queued:U,cleanup_active:_e,merged:!!K||te?.tier==="merged"}),ve=!!re.operation;d.push({...Le(V),lane:"pr_wait",pr_number:typeof ge.number=="number"?ge.number:null,pr_url:typeof ge.url=="string"?ge.url:void 0,external:I,usage:Ut(R,V),merge_step:Y,badges:T?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:Y?[te?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:K?[Ur(K.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Ur(K.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof te?.gate_badge=="string"&&te.gate_badge.length>0?[te.gate_badge]:[],alert:Y?Y.failed===!0:!!K||X,reason:K&&Y?.active!==!0?Gs(K.step):"PR \uB300\uAE30",merge_action:te?.tier==="merged"&&!C&&!q?!1:!U||T,merge_enabled:!ve&&(T||te?.enabled===!0||be||C||q),merge_label:T?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":q||C?"\uC815\uB9AC \uC7AC\uAC1C":be&&!C?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:T?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":ve?re.error?`\uD3D0\uAE30 \uC2E4\uD328: ${re.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${re.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:q?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":C?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":be?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":te?.enabled===!0?`\uBA38\uC9C0 (${te.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${te?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:U&&!T,cancel_enabled:!H,continuation_mismatch:W?.mismatch||null,discard:re,discard_action:re.action,discard_enabled:re.enabled,discard_title:re.title})}for(let Q=0;Q<me.length;Q++){let V=me[Q],$e=V&&V.bead_id;if(typeof $e!="string"||he.has($e))continue;he.add($e);let ge=pe[$e],te=lr(Me,$e),U=te.operation?te:null,W={...Le($e),lane:"queue",draggable:!U,discard:U||void 0,reason:Ac(fe,$e),queue_position:Q+1,queue_index:Q,queue_length:me.length,badges:ge?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!ge,revise_action:!!ge,revise_enabled:!!ge&&!U,revise_title:ge?ge.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${ge.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};f.push(W);let T=g.get(B);T?T.push(W):g.set(B,[W])}for(let Q of Array.isArray(E.runnable)?E.runnable:[]){let V=Q&&Q.bead_id;typeof V!="string"||he.has(V)||(he.add(V),i.push({...Le(V),title:Q.title||N[V]||V,lane:"runnable",draggable:!0,reason:Ac(fe,V),created_at:Q.created_at??void 0,updated_at:Q.updated_at??void 0,labels:Array.isArray(Q.labels)?Q.labels:[],spec_reviewer:typeof Q.spec_reviewer=="string"?Q.spec_reviewer:void 0,plan_state:Q.plan_state==="approved"||Q.plan_state==="authored"?Q.plan_state:"none",workflow:Q.route?{route:Q.route,chips:{route:Q.route}}:null,place_index:me.length}))}for(let Q of xe){let V=Q&&Q.bead_id;if(typeof V!="string"||he.has(V)||(he.add(V),o!==void 0&&typeof Q.added_at=="number"&&Q.added_at<o))continue;let $e=w_(R,V);_.push({...Le(V),lane:"done",done:!0,usage:Ut(R,V),done_at:typeof Q.added_at=="number"?Q.added_at:void 0,done_kind:$e&&typeof $e.done_kind=="string"?$e.done_kind:null})}}let S=new Map;s.forEach((E,B)=>{E&&typeof E.root_dir=="string"&&S.set(E.root_dir,B)});let k=r&&r.running_sort==="repo"?"repo":"started";l.sort((E,B)=>{if(k==="repo"){let w=S.get(E.root_dir)??Number.MAX_SAFE_INTEGER,R=S.get(B.root_dir)??Number.MAX_SAFE_INTEGER;if(w!==R)return w-R}let ee=typeof E.started_at=="number"&&Number.isFinite(E.started_at)?E.started_at:null,A=typeof B.started_at=="number"&&Number.isFinite(B.started_at)?B.started_at:null;return ee!==null&&A!==null&&ee!==A?ee-A:ee===null&&A!==null?1:ee!==null&&A===null?-1:E.id.localeCompare(B.id)}),_.sort((E,B)=>(B.done_at??0)-(E.done_at??0));let M=s.length>0?s:n.map(E=>({root_dir:E&&E.root_dir,name:E&&E.name,auto_advance:E&&E.auto_advance,auto_merge:E&&E.auto_merge,slots:E&&E.slots,revision:E&&E.revision,runner_catalog:E&&E.runner_catalog})),D=[];for(let E of M)!E||typeof E.root_dir!="string"||D.push({root_dir:E.root_dir,name:E.name||E.root_dir,auto_advance:E.auto_advance===!0,auto_merge:E.auto_merge===!0,slots:typeof E.slots=="number"&&E.slots>=Nn?E.slots:Nn,revision:typeof E.revision=="number"?E.revision:0,runner_catalog:Lt(E.runner_catalog),items:g.get(E.root_dir)||[]});return{runnable:i,queue:f,queue_groups:D,running:l,pr_wait:d,done:_,automation:{total:D.length,both_on:D.filter(E=>E.auto_advance&&E.auto_merge).length}}}function $_(e,t){if(typeof e!="number"||!Number.isFinite(e))return"";let n=t-e<h_;return c`<span
    class="mon-beat${n?" mon-beat--live":""}"
    title=${`\uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${vt(e)}`}
    ><span class="mon-beat__dot" aria-hidden="true"></span>${n?"":c`<span class="mon-beat__age"
          >${Dt(e,t)}</span
        >`}</span
  >`}function qn(e){return c`<div class="mon-c__title">${e.title}</div>`}function Fn(e){return c`<span class="mon-c__id" title="클릭하면 상세로 이동"
    >${e.id}</span
  >`}function Ks(e){return e.workspace_name?c`<span class="mon-c__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:""}function ua(e){let t=wt(e.usage),r=Zt(e.usage);return t.length>0?t.map(n=>c`<span class="mon-c__usage" title=${n.tooltip}
          >${n.label}</span
        >`):r?c`<span class="mon-c__usage" title=${en(e.usage)}
        >${r}</span
      >`:""}function pa(e){return(Array.isArray(e.badges)?e.badges:[]).map(r=>c`<span class="mon-c__badge${e.alert?" mon-c__badge--alert":""}"
        >${r}</span
      >`)}function x_(e){return c`<span class="mon-c__ops">
    ${e.run_state==="running"?c`<button
          type="button"
          class="mon-op mon-op--pause"
          ?disabled=${e.can_pause===!1}
          aria-label="일시정지"
          title="일시정지 — 세션을 끊고 이어하기 가능 상태로 둡니다"
        >
          ${ca()}
        </button>`:c`<button
          type="button"
          class="mon-op mon-op--resume"
          ?disabled=${e.can_resume===!1}
          aria-label="이어하기"
          title="이어하기"
        >
          ${la()}
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
          ${wc()}
        </button>`:""}
  </span>`}function S_(e,t){let r=typeof e.started_at=="number"?aa(t-e.started_at):"";return c`${qn(e)}
    <div class="mon-c__meta">
      ${pa(e)}${$_(e.last_event_at,t)}${Fn(e)}${Ks(e)}
      ${or(e)?c`<span class="mon-c__model">${or(e)}</span>`:""}
      ${Sr(e)?c`<span
            class="rtile__resumed"
            title=${Sr(e)}
            >↻</span
          >`:""}
      ${r?c`<span class="mon-live__elapsed">${r}</span>`:""}
      ${ua(e)}${x_(e)}${yr(e)}
    </div>`}function A_(e){let t=e.workflow,n=(t&&t.chips||{}).route||t&&t.route,s=typeof e.spec_reviewer=="string"?e.spec_reviewer:"",o=e.plan_state==="approved"?"plan \u2713":e.plan_state==="authored"?"plan \u270E":"plan \u2013",a=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),i=Dt(e.updated_at);return c`${qn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>${Fn(e)}
      ${n?c`<span class="ctl-chip ctl-chip--route">${n}</span>`:""}
      ${s?c`<span
            class="ctl-chip mon-c__review${s==="skipped"?" mon-c__review--dim":""}"
            >spec:${s}</span
          >`:""}
      ${n==="full_plan"?c`<span
            class="ctl-chip mon-c__plan${e.plan_state==="none"?" mon-c__review--dim":""}"
            >${o}</span
          >`:""}
      ${cs(e.labels,null).map(l=>c`<span class="ctl-chip ctl-chip--label">${l}</span>`)}
      ${Ks(e)}
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
    </div>`}function E_(e){let t=!!e.discard?.operation;return c`${qn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>
      <span class="mon-live__pos">#${e.queue_position}</span>${Fn(e)}
      ${pa(e)}
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
    ${yr(e)}
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
        </div>`:""}`}function T_(e){let t=e.merge_step||null,r=!!(Zt(e.usage)||t||e.merge_action||e.cancel_action||e.discard_action);return c`${qn(e)}
    <div class="mon-c__meta">
      ${Fn(e)}${Ks(e)}
      ${e.pr_url&&e.pr_number?c`<a
            class="mon-c__pr"
            href=${e.pr_url}
            target="_blank"
            rel="noreferrer noopener"
            title="PR 열기"
            >#${e.pr_number} ↗</a
          >`:""}
      ${pa(e)}
      ${e.reason?c`<span class="mon-c__reason">${e.reason}</span>`:""}
    </div>
    ${r?c`<div class="mon-c__tail">
          ${ua(e)}${t?c`<span
                class="merge-step${t.failed?" merge-step--failed":""}"
                style=${`--progress: ${t.percent}%`}
                >${t.label}${t.index>0?c`<span class="merge-step__n"
                      >${t.index}/${t.total}</span
                    >`:""}</span
              >`:""}
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
          ${yr(e)}
        </div>`:""}`}function C_(e,t){let r=e.done_kind||"",n=r?v_[r]||r:"",s=Dt(e.done_at,t);return c`${qn(e)}
    <div class="mon-c__meta">
      ${Fn(e)}${Ks(e)}
      ${n?c`<span
            class="mon-live__kind${y_.has(r)?" mon-live__kind--ok":" mon-live__kind--warn"}"
            >${n}</span
          >`:""}
      ${ua(e)}
      ${s?c`<span title=${`\uC644\uB8CC ${vt(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
    </div>`}function Ec(e,t){return e.lane==="running"?S_(e,t):e.lane==="runnable"?A_(e):e.lane==="queue"?E_(e):e.lane==="pr_wait"?T_(e):C_(e,t)}function Tc(e){let t=String(e.revision);return c`<header
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
        ${e.auto_advance?ca():la()}
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
        ${kc()}
        <span class="mon-ctl__label">머지</span>
      </button>
      <label class="mon-ctl mon-ctl--slots" title="동시에 실행할 세션 수">
        ${$c()}
        <span class="mon-ctl__label">슬롯</span>
        <input
          type="number"
          class="mon-slots__input"
          min=${Nn}
          step="1"
          data-root-dir=${e.root_dir}
          data-revision=${t}
          aria-label=${`${e.name} \uB3D9\uC2DC \uC2E4\uD589 \uC2AC\uB86F`}
          .value=${String(e.slots)}
        />
      </label>
    </span>
  </header>`}function Cc(e){let{total:t,both_on:r}=e.automation,n=t>0&&r===t,s=e.running_sort==="repo"?"repo":"started",o=sr.find(i=>i.value===e.done_range)?.label||"",a=Array.isArray(e.token_total)?e.token_total:e.token_total?[{label:e.token_total,tooltip:e.token_tooltip}]:[];return c`<div class="mon-top">
    <button
      type="button"
      class="mon-auto-all${n?" is-active":""}"
      data-on=${n?"false":"true"}
      aria-pressed=${n?"true":"false"}
      ?disabled=${t===0}
      title=${n?"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4 (\uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4)":"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
    >
      ${n?yc():xc()}
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
        ${sr.map(i=>c`<option
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
  </div>`}function Rc(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function Ic(e){let t=(Array.isArray(e)?e:[]).map(i=>i&&i.usage).filter(i=>i&&typeof i=="object"&&"providers"in i);if(t.length>0)return wt(ms(t));let r={};for(let i of _r)r[i]=0;let n=!1,s=0,o=0,a=0;for(let i of Array.isArray(e)?e:[]){let l=i&&i.usage;if(l&&typeof l=="object"){let d=!1;for(let f of _r){let _=l[f];typeof _=="number"&&Number.isFinite(_)&&(r[f]+=_,n=!0,d=!0)}if(d){o+=1;let f=l.total_cost_usd;typeof f=="number"&&Number.isFinite(f)&&(s+=f,a+=1)}}}return o>0&&a===o&&(r.total_cost_usd=s),n?Zt(r):null}var Oc="bdui.monitor.done-range",Pc="bdui.monitor.running_sort";function R_(){try{let e=window.localStorage.getItem(Oc);return Bt(e)?e:Pt}catch{return Pt}}function I_(e){try{window.localStorage.setItem(Oc,e)}catch{}}function L_(){try{return window.localStorage.getItem(Pc)==="repo"?"repo":"started"}catch{return"started"}}function O_(e){try{window.localStorage.setItem(Pc,e)}catch{}}var Dc="tab:monitor:pipeline",P_=1e3,D_=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}];function Lc(e,t){let r=(e.lane==="runnable"||e.lane==="queue")&&e.draggable!==!1;return c`<div
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
    ${Ec(e,t)}
  </div>`}function Mc(e,t){let r=ct("views:monitor"),n=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,i=t.switchWorkspace,l=t.now||(()=>Date.now()),d=t.confirm||(T=>typeof globalThis.confirm!="function"||globalThis.confirm(T)),f=R_(),_=L_();function g(){let T=sr.find(H=>H.value===f);return T?T.label:""}let S=document.createElement("div");S.className="mon",e.appendChild(S);let k=da(null,null),M=new Map,D=null,E=null;async function B(T,H,I,K,de=!0){if(!o||!I)return null;let Y=await o(T,{...H,root_dir:I,expected_revision:K});if(Y&&Y.conflict&&de){Y.queue&&M.set(I,Y.queue);let _e=Y.queue&&typeof Y.queue.revision=="number"?Y.queue.revision:K;Y=await o(T,{...H,root_dir:I,expected_revision:_e})}return Y&&Y.queue&&I&&M.set(I,Y.queue),Y}function ee(T,H){let I=M.get(T),K=s&&s.get?s.get():null,de=(Array.isArray(K)?K:[]).find(_e=>_e?.root_dir===T);return(I||de)?.merge_queue?.find(_e=>_e.bead_id===H)?.continuation_action}async function A(T,H,I,K){let de=await B(T,H,I,K),Y=M.get(I)?.revision??de?.queue?.revision??K;return pr(de,(_e,be)=>B(T,{...H,continuation:_e,decision_token:be},I,Y,!1),{refresh:_e=>B(T,H,I,_e?.queue?.revision??M.get(I)?.revision??Y,!1)})}async function w(T,H,I,K){let de=await pr({continuation_mismatch:K},(_e,be)=>B("worker-merge-queue-add",{bead_id:H,continuation:_e,decision_token:be},T,I,!1)),Y=de?.queue?.merge_queue?.find(_e=>_e.bead_id===H)?.continuation_action;de?.applied!==!0&&Y?.continuation===null&&Y.mismatch&&await w(T,H,de.queue.revision,Y.mismatch)}async function R(T,H,I){let K=await B("worker-discard",T,H,I);if(K&&K.discarded===!0){le(zs(K),"success",5e3);return}if(K&&K.reason){le(`\uD3D0\uAE30 \uC2E4\uD328: ${K.reason}`,"error");return}if(K&&K.accepted&&K.pending==="merged_revert"){le("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(K&&K.accepted){le(`\uD3D0\uAE30 \uC9C4\uD589: ${K.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}K&&!K.conflict&&le("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function N(T,H,I){return!o||!I?null:await o(T,{...H,root_dir:I})}async function Z(T){if(!o||!T&&!d("\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB055\uB2C8\uB2E4. \uAC01 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uD568\uAED8 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?"))return;let H=await o("monitor-auto-toggle",{on:T}),I=H&&Array.isArray(H.failed)?H.failed:[];I.length>0&&le(`\uC790\uB3D9\uD654 ${T?"\uCF1C\uAE30":"\uB044\uAE30"} \uC77C\uBD80 \uC2E4\uD328: ${I.map(K=>K.root_dir).join(", ")}`,"error",3200)}async function fe(){let T=new Map;for(let H of k.pr_wait)T.has(H.root_dir)||T.set(H.root_dir,H.expected_revision);for(let[H,I]of T)await B("worker-merge-queue-add-all",{},H,I)}let pe=null,ne=!1,ie=null;function Me(){ie!==null&&clearTimeout(ie),ie=setTimeout(()=>{ie=null,ne=!1},0)}function je(T){let H=T.target;return typeof H?.closest=="function"?H.closest(".mon-group"):null}function He(T){let H=je(T);return!H||!pe?null:(H.getAttribute("data-root-dir")||"")===pe.root_dir?H:null}function Ze(){for(let T of Array.from(S.querySelectorAll(".mon-group--drag-over")))T.classList.remove("mon-group--drag-over")}function Ve(T){let H=T.target,I=typeof H?.closest=="function"?H.closest('.mon-card[draggable="true"]'):null;if(I){pe={bead_id:I.getAttribute("data-issue-id")||"",lane:I.getAttribute("data-lane")||"",root_dir:I.getAttribute("data-root-dir")||"",revision:Number(I.getAttribute("data-revision")||0)||0,queue_index:Number(I.getAttribute("data-queue-index")),queue_length:Number(I.getAttribute("data-queue-length")),place_index:Number(I.getAttribute("data-place-index"))},ne=!0;try{T.dataTransfer?.setData("text/plain",pe.bead_id),T.dataTransfer&&(T.dataTransfer.effectAllowed="move")}catch{}}}function Ye(T){let H=He(T);H&&(T.preventDefault(),T.dataTransfer&&(T.dataTransfer.dropEffect="move"),H.classList.add("mon-group--drag-over"))}function me(T){je(T)?.classList.remove("mon-group--drag-over")}function xe(){pe=null,Ze(),Me()}function ke(T){let H=He(T),I=pe;if(pe=null,Ze(),!H||!I||!I.bead_id)return;T.preventDefault();let K=T.target,de=typeof K?.closest=="function"?K.closest('.mon-card[data-lane="queue"]'):null,Y=de&&H.contains(de)?Number(de.getAttribute("data-queue-index")):NaN;if(I.lane==="runnable"){let C=Number.isFinite(Y)?Y:I.place_index;if(!Number.isFinite(C))return;B("worker-queue-place",{bead_id:I.bead_id,index:C},I.root_dir,I.revision);return}if(I.lane!=="queue"||de&&de.getAttribute("data-issue-id")===I.bead_id)return;let _e=I.queue_index,be=Number.isFinite(Y)?_e>Y?Y:Y-1:I.queue_length-1;!Number.isFinite(be)||be<0||be===_e||B("worker-queue-reorder",{bead_id:I.bead_id,to_index:be},I.root_dir,I.revision)}function Le(T){let H={runnable:k.runnable,queue:k.queue,running:k.running,pr_wait:k.pr_wait,done:k.done};return c`${Cc({automation:k.automation,counts:{running:k.running.length,queue:k.queue.length,pr_wait:k.pr_wait.length},running_sort:_,done_range:f,token_total:Ic(k.done),token_tooltip:Rc(g())})}
      <div class="worker-lanes mon-lanes">
        ${D_.map(I=>{let K=H[I.lane],de=I.lane==="queue"?k.queue_groups.length>0?c`${k.queue_groups.map(Y=>c`<div
                        class="mon-group"
                        data-root-dir=${Y.root_dir}
                      >
                        ${Tc(Y)}
                        <div class="mon-group__list">
                          ${Y.items.map(_e=>Lc(_e,T))}
                        </div>
                      </div>`)}`:void 0:K.length>0?c`${K.map(Y=>Lc(Y,T))}`:void 0;return tr({id:`monitor-${I.lane}`,lane:I.pane,title:I.lane==="done"?`\uC644\uB8CC\xB7${g()}`:I.title,items:K,empty:I.empty,body:de,live:I.lane==="running"&&K.length>0,header_control:I.lane==="pr_wait"&&K.length>0?c`<button
                    type="button"
                    class="mon-lane-op mon-merge-all"
                    title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
                  >
                    일괄 머지
                  </button>`:""})})}
      </div>`}function he(){let T=s&&s.get?s.get():null,H=s&&s.getWorkspacesState?s.getWorkspacesState():[],I=l();k=da(T,H,{done_since:Dr(f,I),running_sort:_}),Be(Le(I),S)}function Q(T,H){let I=a?a():void 0;if(!H||!I||H===I||!i){n(T);return}i(H).then(()=>{n(T)}).catch(K=>{r("workspace switch for %s failed: %o",H,K)})}function V(T){return{root_dir:T.getAttribute("data-root-dir")||"",revision:Number(T.getAttribute("data-revision")||0)||0}}function $e(T,H){let{root_dir:I,revision:K}=V(T),de=T.getAttribute("data-issue-id")||"",Y=H.dataset.attemptId||T.getAttribute("data-attempt-id")||"",_e=H.classList;if(_e.contains("worker-card__place")){B("worker-queue-place",{bead_id:de,index:Number(T.getAttribute("data-place-index")||0)||0},I,K);return}if(_e.contains("mon-op--up")||_e.contains("mon-op--down")){let be=Number(T.getAttribute("data-queue-index")||0)||0,C=_e.contains("mon-op--up")?be-1:be+1;if(C<0)return;B("worker-queue-reorder",{bead_id:de,to_index:C},I,K);return}if(_e.contains("mon-op--remove")){B("worker-queue-remove",{bead_id:de},I,K);return}if(_e.contains("mon-op--pause")){N("worker-attempt-pause",{attempt_id:Y},I);return}if(_e.contains("mon-op--discard")){if(!d(On(de,"unmerged")))return;R({bead_id:de,...Y?{attempt_id:Y}:{},...H.dataset.operationId?{operation_id:H.dataset.operationId}:{}},I,K);return}if(_e.contains("mon-op--resume")){Qr().then(be=>{if(be!==null)return A("worker-attempt-resume",{attempt_id:Y,...be!==""?{instructions:be}:{}},I,K)});return}if(_e.contains("mon-op--dismiss")){B("worker-attempt-dismiss",{attempt_id:Y},I,K);return}if(_e.contains("worker-mini__merge")){let be=ee(I,de);be?.mismatch&&be.continuation===null?w(I,de,K,be.mismatch):B("worker-merge-queue-add",{bead_id:de},I,K);return}if(_e.contains("worker-mini__merge-cancel")){B("worker-merge-queue-remove",{bead_id:de},I,K);return}if(_e.contains("worker-mini__discard")){let be=H.dataset.discardMode==="merged"?"merged":"unmerged";if(!d(On(de,be)))return;R({bead_id:de,...Y?{attempt_id:Y}:{},...H.dataset.operationId?{operation_id:H.dataset.operationId}:{}},I,K);return}if(_e.contains("worker-mini__revise-fix")){A("worker-revise-fix",{bead_id:de},I,K);return}_e.contains("worker-mini__revise-approve")&&B("worker-revise-approve",{bead_id:de},I,K)}function ge(T){let H=ne;ne=!1;let I=T.target;if(!I||typeof I.closest!="function"||I.closest("dialog")||I.closest("a"))return;let K=I.closest(".mon-running-sort");if(K){T.preventDefault(),_=K.getAttribute("data-sort")==="repo"?"repo":"started",O_(_),he();return}let de=I.closest(".mon-auto-all");if(de){T.preventDefault(),Z(de.getAttribute("data-on")==="true");return}if(I.closest(".mon-merge-all")){T.preventDefault(),fe();return}let _e=I.closest(".mon-ctl--advance");if(_e){T.preventDefault();let{root_dir:re,revision:ve}=V(_e);B("worker-automation-toggle",{on:_e.getAttribute("data-on")==="true"},re,ve);return}let be=I.closest(".mon-ctl--merge-auto");if(be){T.preventDefault();let{root_dir:re,revision:ve}=V(be);B("worker-merge-auto-toggle",{on:be.getAttribute("data-on")==="true"},re,ve);return}let C=I.closest(".mon-card");if(!C)return;let q=I.closest("button");if(q){T.preventDefault(),$e(C,q);return}let X=C.getAttribute("data-issue-id");X&&!H&&(T.preventDefault(),Q(X,C.getAttribute("data-root-dir")||""))}function te(T){let H=T.target;if(!H||typeof H.closest!="function")return;let I=H.closest(".mon-done-range");if(I){f=Bt(I.value)?I.value:Pt,I_(f),he();return}let K=H.closest(".mon-slots__input");if(!K)return;let{root_dir:de,revision:Y}=V(K),_e=Number(K.value);if(!Number.isFinite(_e))return;let be=Math.max(Nn,Math.floor(_e));B("worker-queue-set-slots",{slots:be},de,Y)}e.addEventListener("click",ge),e.addEventListener("change",te),e.addEventListener("dragstart",Ve),e.addEventListener("dragover",Ye),e.addEventListener("dragleave",me),e.addEventListener("drop",ke),e.addEventListener("dragend",xe),s&&typeof s.subscribe=="function"&&(D=s.subscribe(()=>{try{M.clear(),he()}catch{}}));function U(){E!==null&&(clearInterval(E),E=null)}function W(){ie!==null&&(clearTimeout(ie),ie=null)}return{load(){r("load"),he(),E===null&&(E=setInterval(()=>{try{he()}catch{}},P_))},pause(){U()},clear(){U(),W(),D&&(D(),D=null),e.removeEventListener("click",ge),e.removeEventListener("change",te),e.removeEventListener("dragstart",Ve),e.removeEventListener("dragover",Ye),e.removeEventListener("dragleave",me),e.removeEventListener("drop",ke),e.removeEventListener("dragend",xe),e.replaceChildren()}}}function Nc(e,t,r){let n=ct("views:nav"),s=null;function o(l){return d=>{d.preventDefault(),n("click tab %s",l),r.gotoView(l)}}function a(){let l=t.getState(),d=l.view==="worker"||l.view==="monitor"?l.view:"board";return c`
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
    `}function i(){Be(a(),e)}return i(),s=t.subscribe(()=>i()),{destroy(){s&&(s(),s=null),Be(c``,e)}}}var qc=["bug","feature","task","epic","chore"];function Fc(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var jc=["Critical","High","Medium","Low","Backlog"];function Bc(e,t){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,e.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),a=r.querySelector("#new-priority"),i=r.querySelector("#new-labels"),l=r.querySelector("#new-description"),d=r.querySelector("#new-issue-error"),f=r.querySelector("#btn-cancel"),_=r.querySelector("#btn-create"),g=r.querySelector(".new-issue__close");function S(){o.replaceChildren();let w=document.createElement("option");w.value="",w.textContent="\u2014 Select \u2014",o.appendChild(w);for(let R of qc){let N=document.createElement("option");N.value=R,N.textContent=Fc(R),o.appendChild(N)}a.replaceChildren();for(let R=0;R<=4;R+=1){let N=document.createElement("option");N.value=String(R);let Z=jc[R]||"Medium";N.textContent=`${R} \u2013 ${Z}`,a.appendChild(N)}}S();function k(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function M(w){s.disabled=w,o.disabled=w,a.disabled=w,i.disabled=w,l.disabled=w,f.disabled=w,_.disabled=w,_.textContent=w?"Creating\u2026":"Create"}function D(){d.textContent=""}function E(w){d.textContent=w}function B(){try{let w=window.localStorage.getItem("beads-ui.new.type");w?o.value=w:o.value="";let R=window.localStorage.getItem("beads-ui.new.priority");R&&/^\d$/.test(R)?a.value=R:a.value="2"}catch{o.value="",a.value="2"}}function ee(){let w=o.value||"",R=a.value||"";w.length>0&&window.localStorage.setItem("beads-ui.new.type",w),R.length>0&&window.localStorage.setItem("beads-ui.new.priority",R)}async function A(){D();let w=String(s.value||"").trim();if(w.length===0){E("Title is required"),s.focus();return}let R=Number(a.value||"2");if(!(R>=0&&R<=4)){E("Priority must be 0..4"),a.focus();return}let N=String(o.value||""),Z=String(l.value||""),fe={title:w};N.length>0&&(fe.type=N),String(R).length>0&&(fe.priority=R),Z.length>0&&(fe.description=Z),M(!0);try{await t("create-issue",fe)}catch{M(!1),E("Failed to create issue");return}ee(),M(!1),k()}return r.addEventListener("cancel",w=>{w.preventDefault(),k()}),g.addEventListener("click",()=>k()),f.addEventListener("click",()=>k()),r.addEventListener("keydown",w=>{w.key==="Enter"&&(w.ctrlKey||w.metaKey)&&(w.preventDefault(),A())}),n.addEventListener("submit",w=>{w.preventDefault(),A()}),{open(){n.reset(),D(),B();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){k()}}}var M_=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function N_(e,t){return vo(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function Uc(e,t,r){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?c`<div class="settings-dialog__empty">라벨 없음</div>`:c`<div class="settings-dialog__pills">
            ${t.map(n=>{let s=N_(n,e);return c`<button
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
  `}function Wc(e,t,r){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">숨김 prefix</div>
      <div class="settings-dialog__prefixes">
        ${e.hidden_prefixes.map(n=>c`<span class="settings-dialog__prefix">
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
  `}function zc(e,t){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${M_.map(([r,n])=>c`<label class="settings-dialog__toggle">
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
  `}var q_=[{id:"session",label:"\uC138\uC158",glyph:"\u25C6"},{id:"worker",label:"Worker",glyph:"\u25A4"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}],Mt="";function Nt(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Hc(e,t){let{transport:r,policyStore:n,labelOptions:s}=t,o=t.notify||(x=>le(x,"error",4e3)),a=document.createElement("dialog");a.id="settings-dialog",a.className="settings-dialog",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","\uC124\uC815"),e.appendChild(a);let i="session",l=!1,d="",f={},_={},g=[],S=!1,k=null,M={},D="",E="",B=!1,ee=!1,A=!1,w=null;function R(){let x=t.queueStore?.get();return Nt(x)?x.runner_catalog:null}function N(){let x=t.queueStore?.get();return Nt(x)&&Nt(x.execution_defaults)?x.execution_defaults:null}function Z(){let x=t.implPresetStore?.get();return Nt(x)&&Array.isArray(x.presets)?x:null}async function fe(){S=!0,Y();try{let x=await r("get-session-defaults",{});f=Nt(x?.values)?{...x.values}:{},_={...f},g=Array.isArray(x?.warnings)?x.warnings:[]}catch(x){g=["kv_read_failed"],o(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${x instanceof Error?x.message:String(x)}`)}finally{S=!1,Y()}}async function pe(){let x=Wl(f,_);if(Object.keys(x).length!==0){try{let P=await r("set-session-defaults",{values:x});f=Nt(P?.values)?{...P.values}:{},_={...f},g=Array.isArray(P?.warnings)?P.warnings:[]}catch(P){o(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${P instanceof Error?P.message:String(P)}`)}Y()}}function ne(x,P){P===Mt?delete _[x]:_[x]=P,Y(),pe()}async function ie(){let x=t.queueStore?.get();if(!Nt(x))return;let P={orchestration_model:x.orchestration_model??null,orchestration_effort:x.orchestration_effort??null,orchestration_speed:x.orchestration_speed??null},ue=zl(P,{...P,...M});if(Object.keys(ue).length!==0){try{let Ee=await r("worker-queue-set-orchestration-defaults",{expected_revision:x.revision,values:ue});if(Ee&&Ee.applied===!1){o("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}M={}}catch(Ee){o(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${Ee instanceof Error?Ee.message:String(Ee)}`)}Y()}}function Me(x,P){M[x]=P===Mt?null:P,Y(),ie()}async function je(x){let P=t.queueStore?.get();if(!(!Nt(P)||x<1)){try{await r("worker-queue-set-slots",{expected_revision:P.revision,slots:x})}catch(ue){o(`slots \uC800\uC7A5 \uC2E4\uD328: ${ue instanceof Error?ue.message:String(ue)}`)}Y()}}function He(){let x={};for(let P of jl){let ue=_[P];typeof ue=="string"&&ue.length>0&&(x[P]=ue)}return x}async function Ze(){let x=Z();if(!x)return;let P=He();if(Object.keys(P).length===0){o("\uC800\uC7A5\uD560 \uAD6C\uD604 \uAC12\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uAD6C\uD604 \uADF8\uB8F9\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let ue=(x.presets||[]).find(qe=>qe.id===D),Ee=E.trim()||(ue?ue.name:"");if(!Ee){o("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let qe=ue?await r("impl-preset-update",{expected_revision:x.revision,id:ue.id,name:Ee,settings:P}):await r("impl-preset-create",{expected_revision:x.revision,name:Ee,settings:P});if(qe&&qe.applied){if(E="",!ue&&Array.isArray(qe.presets)){let Ae=qe.presets.find(Ge=>Ge.name===Ee);D=Ae?Ae.id:D}Y()}else o("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Y()}catch(qe){o(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${qe instanceof Error?qe.message:String(qe)}`)}}async function Ve(){let x=Z();if(!(!x||D.length===0))try{let P=await r("impl-preset-delete",{expected_revision:x.revision,id:D});P&&P.applied?(D="",Y()):(o("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Y())}catch(P){o(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${P instanceof Error?P.message:String(P)}`)}}async function Ye(){let x=Z();if(!(!x||D.length===0)){try{let P=await r("apply-impl-preset-global",{preset_id:D,expected_revision:x.revision});P&&P.applied?(f=Nt(P.values)?{...P.values}:{},_={...f},g=Array.isArray(P.warnings)?P.warnings:[]):P&&P.conflict&&o("\uAD6C\uD604 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(P){o(`\uAD6C\uD604 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${P instanceof Error?P.message:String(P)}`)}Y()}}async function me(){ee=!0,A=!1,Y();try{let x=await r("get-worker-system-prompt",{});!x||typeof x!="object"||Array.isArray(x)?A=!0:w=x}catch{A=!0}finally{ee=!1,Y()}}function xe(){if(B=!B,B&&!w){me();return}Y()}function ke(){let x=rn({loading:ee,error:A});if(x)return x;if(!w)return"";let P=Array.isArray(w.variants)?w.variants:[];return c`<div class="settings-dialog__sp-body">
      ${w.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${w.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${P.map(ue=>c`<div class="settings-dialog__sp-variant" data-variant=${ue.key}>
            <div class="settings-dialog__sp-cond">${ue.condition}</div>
            ${hr(ue.label,ue.system_prompt)}
          </div>`)}
    </div>`}function Le(){return c`<section
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
        aria-expanded=${B?"true":"false"}
        @click=${xe}
      >
        ${B?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${B?ke():""}
    </section>`}function he(x,P,ue,Ee,qe,Ae){let Ge=qe[x]??Mt,We=Ko(x,ue,qe,N(),R()),gt=We.options.find(at=>at.value===Ge),ot=Ge===Mt?We.full_value:gt?.full_value;return c`<select
        class=${Ge===Mt?"settings-dialog__unset":""}
        data-key=${x}
        aria-label=${P}
        title=${ot||""}
        ?disabled=${Ae===!0||We.disabled}
        .value=${Br(String(Ge))}
        @change=${at=>Ee(x,String(at.target.value))}
      >
        <option value=${Mt} ?selected=${Ge===Mt}>
          ${We.unset_label}
        </option>
        ${We.options.map(at=>c`<option
              value=${at.value}
              title=${at.full_value||""}
              ?selected=${at.value===Ge}
            >
              ${at.label}
            </option>`)}
      </select>
      ${Ge===Mt?c`<span class="settings-dialog__source-badge">기본</span>`:""}`}function Q(x,P,ue,Ee,qe,Ae=!1){return c`<div
      class=${`settings-dialog__row${Ae?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${P}</span>
      <span class="settings-dialog__controls">
        ${he(x,P,ue,Ee,qe,Ae)}
      </span>
    </div>`}function V(x,P,ue,Ee,qe){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${P}-on)`}
        ></i>
        ${x}
      </span>
      <span class="settings-dialog__controls">
        ${he(ue,`${x} \uBAA8\uB378`,Ee,ne,_,!1)}
        ${he(qe,`${x} effort`,Ds,ne,_,!1)}
      </span>
    </div>`}function $e(){let x=R(),P=Ul(_),ue=_.impl_runtime,Ee=_.impl_model,qe=Z(),Ae=N()?.supported===!0,Ge=Ko("workflow_mode",Rn,_,N(),x);return c`
      <section
        class=${`settings-dialog__pane${i==="session"?" settings-dialog__pane--active":""}`}
        role="tabpanel"
        id="settings-pane-session"
        aria-label="세션 기본값"
      >
        <header class="settings-dialog__pane-head"><h2>세션 기본값</h2></header>
        <p class="settings-dialog__pane-sub">
          모든 세션(터미널 대화형 포함)이 따르는 전역 기본값입니다. 이슈에 핀이
          있으면 핀이 우선합니다.
        </p>
        ${g.length>0?c`<div class="settings-dialog__banner" role="alert">
              워크스페이스 기본값을 일부 읽지 못했습니다 —
              ${g.join(", ")}
            </div>`:""}
        ${Ae?"":c`<div
              class="settings-dialog__banner settings-dialog__banner--projection"
              data-execution-defaults-warning
              role="alert"
            >
              실행 기본값 projection을 확인할 수 없습니다 — 기본값 확인 불가
            </div>`}
        ${S?c`<div class="settings-dialog__empty">불러오는 중…</div>`:c`
              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">워크플로우</div>
                <div class="settings-dialog__row">
                  <span class="settings-dialog__row-label">모드</span>
                  <span class="settings-dialog__controls">
                    <span class="settings-dialog__seg" role="group">
                      <button
                        type="button"
                        data-mode=${Mt}
                        aria-pressed=${String(!_.workflow_mode)}
                        @click=${()=>ne("workflow_mode",Mt)}
                      >
                        ${Ge.unset_label}
                      </button>
                      ${_.workflow_mode?"":c`<span class="settings-dialog__source-badge"
                            >기본</span
                          >`}
                      ${Rn.map(We=>c`<button
                            type="button"
                            data-mode=${We}
                            aria-pressed=${String(_.workflow_mode===We)}
                            @click=${()=>ne("workflow_mode",We)}
                          >
                            ${We}
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
                ${V("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",In,"spec_review_effort")}
                ${V("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",Ps,"plan_review_effort")}
                ${V("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",In,"impl_review_effort")}
              </div>

              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">
                  구현
                  <span class="settings-dialog__hint"
                    >이슈 핀이 있으면 핀이 우선합니다</span
                  >
                </div>
                ${Q("impl_dispatch","\uC2E4\uD589 \uBC29\uC2DD",Ls,ne,_)}
                ${Q("impl_runtime","\uC704\uC784 \uB300\uC0C1",Os,ne,_,P)}
                ${Q("impl_model","\uBAA8\uB378",Ms(x,ue),ne,_,P)}
                ${Q("impl_effort","effort",nn(x,ue,Ee),ne,_,P)}
                ${Q("impl_speed","\uC18D\uB3C4",Cn,ne,_,P)}
              </div>

              <div class="settings-dialog__preset-bar">
                <select
                  aria-label="구현 프리셋"
                  .value=${Br(D)}
                  @change=${We=>{D=String(We.target.value),Y()}}
                >
                  <option value="" ?selected=${D===""}>
                    구현 프리셋…
                  </option>
                  ${(qe?.presets||[]).map(We=>c`<option
                        value=${We.id}
                        ?selected=${We.id===D}
                      >
                        ${We.name}
                      </option>`)}
                </select>
                <button
                  type="button"
                  class="settings-dialog__btn settings-dialog__btn--primary"
                  ?disabled=${D.length===0}
                  @click=${Ye}
                >
                  전역 기본값으로 적용
                </button>
                <input
                  type="text"
                  class="settings-dialog__preset-name"
                  placeholder=${D?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                  aria-label="프리셋 이름"
                  .value=${Br(E)}
                  @input=${We=>{E=String(We.target.value)}}
                />
                <button
                  type="button"
                  class="settings-dialog__btn"
                  data-preset-save
                  @click=${Ze}
                >
                  ${D?"\uAC31\uC2E0":"\uC800\uC7A5"}
                </button>
                <button
                  type="button"
                  class="settings-dialog__btn"
                  data-preset-delete
                  ?disabled=${D.length===0}
                  @click=${Ve}
                >
                  삭제
                </button>
              </div>
            `}
      </section>
    `}function ge(){let x=t.queueStore?.get(),P=R(),ue={orchestration_model:M.orchestration_model??(Nt(x)?x.orchestration_model:null),orchestration_effort:M.orchestration_effort??(Nt(x)?x.orchestration_effort:null),orchestration_speed:M.orchestration_speed??(Nt(x)?x.orchestration_speed:null)},Ee=Ns(P,k),qe=nn(P,k||void 0,ue.orchestration_model||er).filter(Ge=>Ge!==er),Ae=Nt(x)&&typeof x.slots=="number"?x.slots:2;return c`
      <section
        class=${`settings-dialog__pane${i==="worker"?" settings-dialog__pane--active":""}`}
        role="tabpanel"
        id="settings-pane-worker"
        aria-label="Worker 설정"
      >
        <header class="settings-dialog__pane-head"><h2>Worker 설정</h2></header>
        <p class="settings-dialog__pane-sub">
          Worker가 세션을 띄울 때 쓰는 오케스트레이션 설정과 동시 실행 수입니다.
        </p>
        ${N()?.supported!==!0?c`<div
              class="settings-dialog__banner settings-dialog__banner--projection"
              data-execution-defaults-warning
              role="alert"
            >
              실행 기본값 projection을 확인할 수 없습니다 — 기본값 확인 불가
            </div>`:""}
        <div class="settings-dialog__group">
          <div class="settings-dialog__group-title">오케스트레이션</div>
          <div class="settings-dialog__row">
            <span class="settings-dialog__row-label">런타임</span>
            <span class="settings-dialog__controls">
              <select
                aria-label="런타임"
                data-key="orchestration_runtime_filter"
                .value=${Br(k||Mt)}
                @change=${Ge=>{let We=String(Ge.target.value);k=We===Mt?null:We,Y()}}
              >
                <option value=${Mt} ?selected=${!k}>
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
          ${Q("orchestration_model","\uBAA8\uB378",Ee,Me,ue)}
          ${Q("orchestration_effort","effort",qe,Me,ue)}
          ${Q("orchestration_speed","\uC18D\uB3C4",Cn,Me,ue)}
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
                  @click=${()=>je(Ae-1)}
                >
                  −
                </button>
                <span class="settings-dialog__stepper-value">${Ae}</span>
                <button
                  type="button"
                  aria-label="slots 증가"
                  @click=${()=>je(Ae+1)}
                >
                  +
                </button>
              </span>
            </span>
          </div>
        </div>
        ${Le()}
      </section>
    `}function te(){let x=n.get();return c`
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
        ${x?c`
              ${Uc(x,s(),H)}
              ${Wc(x,d,{onDraft:P=>{d=P},onAdd:I,onRemove:K})}
              ${zc(x,de)}
            `:c`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function U(x){let P=n.get();if(P)try{let ue=await r("display-policy-set",{expected_revision:P.revision,policy:x(P)});W(ue),ue&&ue.conflict&&ue.policy&&(ue=await r("display-policy-set",{expected_revision:ue.policy.revision,policy:x(ue.policy)}),W(ue)),ue&&ue.conflict&&o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function W(x){x&&x.policy&&typeof x.policy=="object"&&n.set(x.policy)}function T(x){U(x)}function H(x){let P=n.get();if(!P)return;let ue=!F_(x,P);T(Ee=>j_(x,Ee,ue))}function I(){let x=d.trim();x.length!==0&&(d="",T(P=>P.hidden_prefixes.includes(x)?{hidden_prefixes:P.hidden_prefixes}:{hidden_prefixes:[...P.hidden_prefixes,x]}),Y())}function K(x){T(P=>({hidden_prefixes:P.hidden_prefixes.filter(ue=>ue!==x)}))}function de(x){let P=n.get();if(!P)return;let ue=P.chips[x]===!1;T(()=>({chips:{[x]:ue}}))}function Y(){Be(c`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${q_.map(x=>c`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${x.id}
                  aria-selected=${String(i===x.id)}
                  aria-controls=${`settings-pane-${x.id}`}
                  @click=${()=>_e(x.id)}
                >
                  <span class="settings-dialog__glyph">${x.glyph}</span>
                  ${x.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${ve}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${$e()} ${ge()} ${te()}
          </div>
        </div>
      `,a)}function _e(x){i=x,Y()}let be=()=>{l=!1,t.onOpenChange?.(!1)};a.addEventListener("close",be),a.addEventListener("cancel",be);let C=x=>{x.target===a&&ve()};a.addEventListener("click",C);let q=null;n.subscribe&&(q=n.subscribe(()=>{l&&Y()}));let X=null;t.implPresetStore?.subscribe&&(X=t.implPresetStore.subscribe(()=>{l&&Y()}));function re(x="session"){l||(l=!0,t.onOpenChange?.(!0),i=x,d="",M={},Y(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),fe())}function ve(){l&&(l=!1,t.onOpenChange?.(!1),typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:re,close:ve,sessionDraft:()=>({..._}),destroy(){l=!1,a.removeEventListener("close",be),a.removeEventListener("cancel",be),a.removeEventListener("click",C),q&&(q(),q=null),X&&(X(),X=null),a.remove()}}}function F_(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(r=>r.length>0&&e.startsWith(r))}function j_(e,t,r){if(!r)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let n=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:n,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:n}}var B_=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function Gc(e){return String(e).padStart(2,"0")}function U_(e,t){let r=Math.max(0,Math.ceil((e-t)/6e4)),n=Math.floor(r/1440),s=Math.floor(r%1440/60),o=r%60;return n>0?`${n}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function W_(e,t=Date.now()){let r=Date.parse(e);if(!Number.isFinite(r))return"";let n=new Date(r),s=new Date(t),o=`${Gc(n.getHours())}:${Gc(n.getMinutes())}`,i=n.getFullYear()===s.getFullYear()&&n.getMonth()===s.getMonth()&&n.getDate()===s.getDate()?o:`${B_[n.getMonth()]} ${n.getDate()} ${o}`;return`${U_(r,t)} \xB7 ${i}`}function z_(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}var Vc=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage"}];function Yc(e){let t=!1,r=null,n=new Map;function s(){Be(c``,e),e.hidden=!0}function o(){let l=Vc.filter(f=>n.has(f.key));if(l.length===0){s();return}let d=Date.now();Be(c`<div class="usage-meter" aria-label="Usage">
        ${l.map(f=>{let _=n.get(f.key),g=typeof _.ageSeconds=="number"&&_.ageSeconds>600,S=g?`${Math.floor(_.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"";return c`<span
            class="usage-meter__group${g?" usage-meter__group--stale":""}"
            aria-label=${`${f.label} usage`}
          >
            <span class="usage-meter__provider">${f.label}</span>
            ${_.windows.map(k=>{let M=typeof k.pct=="number"&&Number.isFinite(k.pct)?k.pct:0,D=Math.min(100,Math.max(0,M)),B=`resets ${W_(k.resetsAt,d)}${g?` \xB7 ${S}`:""}`;return c`<span
                class="usage-meter__window ${z_(D)}"
                style=${`--progress: ${D}%`}
                title=${B}
              >
                <span class="usage-meter__label">${k.key}</span>
                <span class="usage-meter__track" aria-hidden="true">
                  <span class="usage-meter__fill"></span>
                </span>
                <span class="usage-meter__pct">${D}%</span>
              </span>`})}
          </span>`})}
      </div>`,e),e.hidden=!1}async function a(l){try{let d=await fetch(l.endpoint);if(!d.ok)return null;let f=await d.json();return!f||f.available!==!0||!Array.isArray(f.windows)?null:f}catch{return null}}async function i(){let l=await Promise.all(Vc.map(async d=>({provider:d,payload:await a(d)})));if(!t){for(let d of l)d.payload?n.set(d.provider.key,d.payload):n.delete(d.provider.key);o()}}return s(),i(),r=setInterval(()=>{i()},6e4),{destroy(){t=!0,r!==null&&(clearInterval(r),r=null),s()}}}function Kc(e){let t=e.attempts?Object.values(e.attempts):[],r=new Map;for(let s of t)s&&r.set(s.bead_id,s.attempt_id);let n=new Map;for(let s of e.done||[])s&&typeof s.bead_id=="string"&&typeof s.added_at=="number"&&n.set(s.bead_id,s.added_at);return s=>{let o=r.get(s.bead_id)!==s.attempt_id,a=n.get(s.bead_id),i=typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at;return!o&&!i&&typeof s.dismissed_at!="number"}}var H_="worker-ineligible";function fa(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function _a(e){return fa(e).includes(H_)}var G_="worker-serial";function ma(e){return fa(e).includes(G_)}function ga(e,t,r){if(typeof t!="string"||typeof r!="string")return[];let n=e?.runners;if(!n||!Object.hasOwn(n,t))return[];let s=n[t],o=s?.models;if(!o||!Object.hasOwn(o,r))return[];let a=o[r]?.efforts;return Array.isArray(a)?a.slice():Array.isArray(s.efforts)?s.efforts.slice():[]}var V_=new Set(["done","failed","orphaned","stopped","discarded"]);function Zc(e,t){let{queueStore:r,analysisStore:n,transport:s}=t,o=document.createElement("dialog");o.id="worker-parallel-analysis-dialog",o.className="pa",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),e.appendChild(o);let a=new Map,i=new Map,l=!1,d=null,f=null;function _(){return r&&r.get()||{revision:0,queue:[],serial_lanes:[],serial_lane_count:0,attempts:{},pr_wait:[]}}function g(){return n&&n.get()||{settings:{revision:0,runner:null,model:null,effort:null},job:null,last_good:null}}function S(){let C=_(),q=new Set;for(let X of Object.values(C.attempts||{})){let re=X;re&&typeof re.bead_id=="string"&&!V_.has(re.status)&&q.add(re.bead_id)}for(let X of Array.isArray(C.pr_wait)?C.pr_wait:[])X&&typeof X.bead_id=="string"&&q.add(X.bead_id);for(let X of Object.values(C.discard_operations||{})){let re=X;re&&re.phase!=="done"&&typeof re.bead_id=="string"&&q.add(re.bead_id)}return q}function k(C){return C.filter(q=>M(q)===null)}function M(C){let q=_();for(let X of Array.isArray(q.serial_lanes)?q.serial_lanes:[])if(Array.isArray(X?.entries)&&X.entries.some(re=>re.bead_id===C))return X.id;return(Array.isArray(q.queue)?q.queue:[]).some(X=>X.bead_id===C)?"parallel":null}function D(C,q){let X=a.get(C);return X||[...q.order]}function E(C){if(C.length<2)return!1;let q=M(C[0]);if(!q||q==="parallel")return!1;let X=_(),re=(Array.isArray(X.serial_lanes)?X.serial_lanes:[]).find(x=>x.id===q)?.entries.map(x=>x.bead_id);if(!Array.isArray(re))return!1;let ve=C.map(x=>re.indexOf(x));return ve.every(x=>x>=0)&&ve.every((x,P)=>P===0||x>ve[P-1])}function B(){let C=_(),q=Array.isArray(C.serial_lanes)?C.serial_lanes:[],X=q.find(re=>Array.isArray(re.entries)&&re.entries.length===0);return X?X.id:q[0]?.id||"s1"}function ee(C){let q=_().bead_titles||{};return typeof q[C]=="string"?q[C]:C}async function A(C,q){if(!s||l)return null;l=!0,T();try{return await s(C,q)}finally{l=!1,T()}}async function w(C){n?.setPending?.(!0);try{let q=await A("worker-parallel-analysis-start",{force:C});q&&q.applied===!1&&q.reason&&le(`\uBD84\uC11D \uC2E4\uD328: ${q.reason}`,"error",2800)}finally{n?.setPending?.(!1)}}async function R(){let C=g().job;!s||!C||await s("worker-parallel-analysis-cancel",{job_id:C.job_id})}function N(){return _().runner_catalog}function Z(C){return Object.keys(N()?.runners?.[C]?.models||{})}function fe(C){let q=Z(C),X=N()?.runners?.[C]?.default_model;return typeof X=="string"&&q.includes(X)?X:q[0]||""}function pe(){let C=g().settings,q=d||C.runner||"claude",X=Z(q),re=d?fe(q):C.model||X[0]||"",ve=ga(N(),q,re),x=C.effort||"",P=ve.includes(x)?x:ve[0]||"";return{runner:q,model:re,effort:P,models:X,efforts:ve}}async function ne(C){let q=g().settings,X=await A("worker-parallel-analysis-settings-update",{expected_revision:q.revision,runner:C.runner,model:C.model,effort:C.effort});(!X||X.applied!==!0)&&(d=null,T(),X&&X.reason&&le(`\uBD84\uC11D \uC124\uC815 \uAC70\uBD80: ${X.reason}`,"error",2800))}function ie(C){d=C,T();let q=pe();ne({runner:C,model:q.model,effort:q.effort})}function Me(C){let q=pe(),X=ga(N(),q.runner,C);ne({runner:q.runner,model:C,effort:X.includes(q.effort)?q.effort:X[0]||""})}function je(C){let q=pe();ne({runner:q.runner,model:q.model,effort:C})}async function He(C,q){if(!s||l)return;let X=D(C,q),re=g();if(X.length<2||!re.last_good){le("\uC81C\uCD9C\uD558\uB824\uBA74 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4","warning");return}let ve=i.get(C)||B(),x=()=>({snapshot_digest:re.last_good.identity_digest,group_index:C,lane:ve,ordered_bead_ids:X,expected_revision:_().revision});l=!0,T();try{let P=await s("worker-parallel-analysis-submit",x());P&&P.queue&&r&&r.set(P.queue),P&&P.applied!==!0&&P.conflict===!0&&(P=await s("worker-parallel-analysis-submit",x()),P&&P.queue&&r&&r.set(P.queue)),P&&P.applied===!0?(a.delete(C),le(`\uC9C1\uB82C \uB808\uC778 ${ve}\uC5D0 ${X.length}\uAC1C \uBC30\uCE58`,"success")):le(`\uC81C\uCD9C \uAC70\uBD80: ${P?.reason||"conflict"} (\uD050 \uBB34\uBCC0\uACBD)`,"error",2800)}finally{l=!1,T()}}function Ze(C,q,X){a.set(C,D(C,q).filter(re=>re!==X)),T()}function Ve(C){a.delete(C),T()}function Ye(C,q,X,re){let ve=[...D(C,q)],x=ve.indexOf(X),P=x+re;x<0||P<0||P>=ve.length||(ve.splice(P,0,...ve.splice(x,1)),a.set(C,ve),T())}function me(){let C=g().settings,q=Object.keys(N()?.runners||{}),X=pe();return c`<div class="pa-settings">
      <label class="pa-settings__field"
        >러너
        <select
          class="pa-settings__runner"
          aria-label="분석 러너"
          @change=${re=>ie(re.target.value)}
        >
          ${q.map(re=>c`<option
                value=${re}
                ?selected=${X.runner===re}
              >
                ${re}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >분석 모델
        <select
          class="pa-settings__model"
          aria-label="분석 모델"
          @change=${re=>Me(re.target.value)}
        >
          ${X.models.map(re=>c`<option
                value=${re}
                ?selected=${X.model===re}
              >
                ${re}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >effort
        <select
          class="pa-settings__effort-select"
          aria-label="분석 effort"
          @change=${re=>je(re.target.value)}
        >
          ${X.efforts.map(re=>c`<option
                value=${re}
                ?selected=${X.effort===re}
              >
                ${re}
              </option>`)}
        </select>
      </label>
      ${xe(C)}
    </div>`}function xe(C){return!Le(C)||ke(C)?c`<span class="pa-settings__unset">분석 모델 설정 필요</span>`:C.compatible===!1?c`<span class="pa-settings__incompatible"
        >설정 비호환 — 저장된 ${C.runner}/${C.model} · effort
        ${C.effort} 을(를) 카탈로그가 더는 제공하지 않습니다</span
      >`:C.is_default===!0?c`<span class="pa-settings__default">기본값</span>`:""}function ke(C){return C.is_default===!0&&C.compatible===!1}function Le(C){return!!(C.runner&&C.model&&C.effort)}function he(C){return Le(C)&&C.compatible!==!1}function Q(C){let q=Math.max(0,Math.floor(C/1e3)),X=Math.floor(q/60),re=q%60;return`${X}:${String(re).padStart(2,"0")}`}function V(C){let q=C.job;if(q){let X=typeof q.started_at=="number"?q.started_at:0,re=`${q.runner||"?"}/${q.model||"?"}`,ve=X?` \xB7 \uACBD\uACFC ${Q(Date.now()-X)}`:"";return c`<span class="pa-meta__progress"
        >분석 중 — ${re} · effort ${q.effort||"?"}${ve}</span
      >`}return $e()?c`<span class="pa-meta__progress"
          >준비 중 — 대상과 아티팩트 수집 중</span
        >`:""}function $e(){return n?.isPending?.()===!0}function ge(C){let q=_(),X=(Array.isArray(q.queue)?q.queue.length:0)+(Array.isArray(q.serial_lanes)?q.serial_lanes:[]).reduce((P,ue)=>P+(Array.isArray(ue.entries)?ue.entries.length:0),0),re=!!C.job,ve=he(C.settings),x=re||l||$e();return c`<div class="pa-meta">
      <span class="pa-meta__targets">대상 ${X}</span>
      ${C.last_good?c`<span class="pa-meta__at"
            >분석 ${new Date(C.last_good.at||0).toLocaleString()}</span
          >`:c`<span class="pa-meta__at">분석 결과 없음</span>`}
      ${V(C)}
      <button
        type="button"
        class="pa-run"
        ?disabled=${!ve||x}
        @click=${()=>{w(!1)}}
      >
        ✳ 분석
      </button>
      <button
        type="button"
        class="pa-rerun"
        ?disabled=${!ve||x}
        @click=${()=>{w(!0)}}
      >
        재분석
      </button>
      <button
        type="button"
        class="pa-cancel"
        ?disabled=${!re}
        @click=${()=>{R()}}
      >
        취소
      </button>
    </div>`}function te(C,q){let X=D(C,q),re=S(),ve=X.filter(Ae=>re.has(Ae)),x=k(X),P=E(X),ue=Array.isArray(_().serial_lanes)?_().serial_lanes:[],Ee=i.get(C)||B(),qe=q.eligible!==!0||X.length<2||ve.length>0||x.length>0||P||l;return c`<section class="pa-group" data-group-index=${String(C)}>
      <header class="pa-group__head">
        <span class="pa-group__confidence">${q.confidence}</span>
        ${q.categories.map(Ae=>c`<span class="pa-group__category">${Ae}</span>`)}
        ${P?c`<span class="pa-group__applied">✓ 이미 반영됨</span>`:""}
        ${q.eligible===!0?"":c`<span class="pa-group__weak">근거 부족 — 제출 불가</span>`}
        ${x.length>0?c`<span class="pa-group__stale"
              >stale — ${x.join(", ")} 대기 영역 이탈</span
            >`:""}
      </header>
      <p class="pa-group__reason">${q.reason}</p>
      <ol class="pa-group__members">
        ${X.map((Ae,Ge)=>c`<li class="pa-member" data-bead-id=${Ae}>
              <span class="pa-member__seq">${Ge+1}</span>
              <span class="pa-member__title">${ee(Ae)}</span>
              ${re.has(Ae)?c`<span class="pa-member__active">실행 중</span>`:""}
              <button
                type="button"
                class="pa-member__up"
                data-bead-id=${Ae}
                ?disabled=${Ge===0}
                aria-label=${`${Ae} \uC704\uB85C`}
                @click=${()=>Ye(C,q,Ae,-1)}
              >
                ↑
              </button>
              <button
                type="button"
                class="pa-member__down"
                data-bead-id=${Ae}
                ?disabled=${Ge===X.length-1}
                aria-label=${`${Ae} \uC544\uB798\uB85C`}
                @click=${()=>Ye(C,q,Ae,1)}
              >
                ↓
              </button>
              <button
                type="button"
                class="pa-member__exclude"
                data-bead-id=${Ae}
                aria-label=${`${Ae} \uC81C\uC678`}
                @click=${()=>Ze(C,q,Ae)}
              >
                ✕
              </button>
            </li>`)}
      </ol>
      <ul class="pa-group__evidence">
        ${q.evidence.map(Ae=>c`<li class="pa-evidence">
              <code>${Ae.path}</code>
              <span class="pa-evidence__locator">${Ae.locator}</span>
            </li>`)}
      </ul>
      <footer class="pa-group__foot">
        <button
          type="button"
          class="pa-group__restore"
          @click=${()=>Ve(C)}
        >
          제안으로 되돌리기
        </button>
        <label class="pa-group__lane-field"
          >제출
          <select
            class="pa-group__lane"
            aria-label="제출 대상 레인"
            @change=${Ae=>{i.set(C,Ae.target.value),T()}}
          >
            ${ue.map((Ae,Ge)=>c`<option
                  value=${Ae.id}
                  ?selected=${Ee===Ae.id}
                >
                  직렬 ${Ge+1}
                </option>`)}
          </select>
        </label>
        <button
          type="button"
          class="pa-group__submit"
          ?disabled=${qe}
          @click=${()=>{He(C,q)}}
        >
          제출
        </button>
      </footer>
    </section>`}function U(C){let q=Array.isArray(C.issues)?C.issues:[],X=q.filter(ve=>ve.verdict==="parallel_ok").length,re=q.filter(ve=>ve.verdict==="uncertain").length;return c`<div class="pa-summary">
      <span>parallel_ok ${X}</span>
      <span>uncertain ${re}</span>
    </div>`}function W(){let C=H&&!!g().job;if(C&&f===null){f=setInterval(()=>T(),1e3);return}!C&&f!==null&&(clearInterval(f),f=null)}function T(){let C=g();d&&C.settings.runner===d&&(d=null);let q=C.last_good?.result;W(),Be(c`
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
            ${me()} ${ge(C)}
            ${q?c`${q.groups.map((X,re)=>te(re,X))}
                ${q.groups.length===0?c`<p class="pa-empty">직렬 권장 그룹 없음</p>`:""}
                ${U(q)}`:c`<p class="pa-empty">
                  아직 분석 결과가 없습니다 — [✳ 분석]을 눌러 시작하세요
                </p>`}
          </div>
        </div>
      `,o)}let H=!1,I=()=>{H=!1,W()},K=C=>{C.target===C.currentTarget&&be()};o.addEventListener("close",I),o.addEventListener("cancel",I),o.addEventListener("click",K);let de=null;r&&r.subscribe&&(de=r.subscribe(()=>{H&&T()}));let Y=null;n&&n.subscribe&&(Y=n.subscribe(()=>{H&&T()}));function _e(){H||(H=!0,T(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function be(){H&&(H=!1,W(),typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:_e,close:be,destroy(){H=!1,f!==null&&(clearInterval(f),f=null),o.removeEventListener("close",I),o.removeEventListener("cancel",I),o.removeEventListener("click",K),de&&(de(),de=null),Y&&(Y(),Y=null),o.remove()}}}var Xc=new Set(["sh","bash","zsh","dash","ksh"]),Qc=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function Jc(e){let t=e.split("/");return t[t.length-1]||""}function Y_(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let r=t.slice(2).trim().split(/\s+/).filter(Boolean);if(r.length===0)return!1;let n=Jc(r[0]);if(n!=="env")return Xc.has(n);let s=r.slice(1).find(o=>!o.startsWith("-")&&!o.includes("="));return s!==void 0&&Xc.has(Jc(s))}function K_(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function Z_(e){let t=[],r=0;Qc.lastIndex=0;for(let n of e.matchAll(Qc)){let s=n.index;s>r&&t.push({text:e.slice(r,s),kind:"plain"}),t.push({text:n[0],kind:K_(n[0])}),r=s+n[0].length}return r<e.length&&t.push({text:e.slice(r),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function X_(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function ed(e){let t=e.getWorkspacePath,r=e.fetchImpl||globalThis.fetch?.bind(globalThis),n=document.createElement("div");n.className="repo-ops-script-viewer-root",document.body.appendChild(n);let s=null,o="loading",a="",i="",l=0,d=null,f=!1;function _(w,R){return R?Z_(w).map(N=>N.kind==="plain"?N.text:c`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${N.kind}"
            >${N.text}</span
          >`):w}function g(){if(!s)return c``;let w=o==="ready"&&Y_(a),R=o==="ready"?a.split(`
`):[];return c`<div
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
          ${o==="loading"?c`<div class="repo-ops-script-viewer__status">
                스크립트 불러오는 중…
              </div>`:o==="error"?c`<div
                  class="repo-ops-script-viewer__status repo-ops-script-viewer__status--error"
                >
                  ${i}
                </div>`:c`<div class="repo-ops-script-viewer__code" tabindex="0">
                  ${R.map((N,Z)=>c`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${Z+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${_(N,w)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function S(){Be(g(),n)}async function k(){if(o!=="ready")return;let w=await ur(a);le(w?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",w?"success":"error")}function M(w){w.key==="Escape"&&s&&(w.preventDefault(),ee())}function D(){f||(document.addEventListener("keydown",M),f=!0)}function E(){f&&(document.removeEventListener("keydown",M),f=!1)}async function B(w,R=null){let N=++l;D(),s={...w},d=R||(document.activeElement instanceof HTMLElement?document.activeElement:null),o="loading",a="",i="",S(),n.querySelector(".repo-ops-script-viewer__close")?.focus();let fe=t?t():"";if(!fe){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",S();return}if(!r){o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",S();return}let pe="/api/repo-ops-script?workspace="+encodeURIComponent(fe)+"&lane="+encodeURIComponent(w.lane)+"&base_sha="+encodeURIComponent(w.base_sha);try{let ne=await r(pe),ie=await ne.json().catch(()=>({}));if(N!==l)return;if((t?t():"")!==fe){ee();return}if(!ne.ok||!ie||ie.ok!==!0){o="error",i=X_(ie&&typeof ie.error=="string"?ie.error:""),S();return}s={lane:ie.lane,base_sha:ie.base_sha,path:ie.path,base_ref:ie.base_ref},a=String(ie.content),o="ready",S()}catch{if(N!==l)return;o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",S()}}function ee(){l+=1,E(),s=null,a="",S();let w=d;d=null,w?.isConnected&&w.focus()}function A(){ee(),n.remove()}return{open:B,close:ee,destroy:A}}function td(e){let t=e.queueStore,r=e.transport,n=e.onChanged||(()=>{}),s=e.onOpenScript;function o(){return t&&t.get()||{}}function a(){let A=o();return typeof A.revision=="number"?A.revision:0}function i(A){t&&A&&A.queue&&typeof A.queue=="object"&&t.set(A.queue)}function l(){let A=o().workspace_info;return A&&typeof A=="object"?A:{}}function d(A,w){return c`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${A}"
      >${w}</span
    >`}function f(A){if(typeof A!="number"||!Number.isFinite(A))return"";let w=A/6e4;return Number.isInteger(w)?`timeout ${w}\uBD84`:`timeout ${Math.round(A/1e3)}\uCD08`}function _(A){let w=f(A);return w?d("config",w):""}function g(A,w,R){return c`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${R.script}
      @click=${N=>{s&&s({lane:A,base_sha:w.base_sha,path:R.script,base_ref:w.base_ref},N.currentTarget)}}
    ></button>`}function S(A){let w=typeof A.base_sha=="string"?A.base_sha:"",R=`${A.source_path||"repo-ops/config.toml"} @ ${A.base_ref||"?"}${w?`@${w.slice(0,7)}`:""}`;return c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${R}</span>
      </p>
      <div class="worker-repo-ops__lane" data-lane="verify">
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${A.verify?c`${g("verify",A,A.verify)}
              ${_(A.verify.timeout_ms)}`:c`선언 없음${d("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${A.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
      </div>
      <div class="worker-repo-ops__lane" data-lane="deploy">
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${A.deploy?c`${g("deploy",A,A.deploy)}
              ${_(A.deploy.timeout_ms)}`:c`선언 없음${d("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${A.deploy?c`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
      </div>
    </section>`}function k(A){let w=A.repo_ops&&typeof A.repo_ops=="object"?A.repo_ops:null;return w&&(w.status==="resolved"||w.status==="absent")?S(w):w&&(w.status==="pending"||w.status==="error")?c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${w.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":c`선언 읽기
              실패${w.error_code?c` — <code>${w.error_code}</code>`:""}`}
        </div>
      </section>`:c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function M(A){if(!r)return;let w=await r("worker-auto-repair-toggle",{on:A,expected_revision:a()});if(i(w),w&&w.conflict){let R=await r("worker-auto-repair-toggle",{on:A,expected_revision:a()});i(R)}n()}let D={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function E(A,w,R){return c`<div class="worker-repo-ops__policy-group" data-policy=${R}>
      <div class="worker-repo-ops__policy-label">${A}</div>
      <ul class="worker-repo-ops__policy-list">
        ${w.map(N=>c`<li data-token=${N}>
              ${D[N]||N}
            </li>`)}
      </ul>
    </div>`}function B(A){return c`<div
      class="worker-repo-ops__policy-group"
      data-policy="resolution-ladder"
    >
      <div class="worker-repo-ops__policy-label">해결 사다리</div>
      <ol class="worker-repo-ops__policy-list">
        ${A.map(w=>{let R=[D[w.trigger]||w.trigger];return Number.isInteger(w.attempts_per_operation_attempt)?R.push(`operation\uB2F9 ${w.attempts_per_operation_attempt}\uD68C`):Number.isInteger(w.attempts)?R.push(`${D[w.budget]||w.budget} ${w.attempts}\uD68C`):Number.isInteger(w.sessions_per_user_action)&&R.push(`${w.sessions_per_user_action}\uD68C`,D[w.user_actions]||w.user_actions),w.applies_when&&R.push(D[w.applies_when]||w.applies_when),c`<li data-token=${w.id}>
            <strong>${D[w.id]||w.id}</strong>
            <span>${R.filter(Boolean).join(" \xB7 ")}</span>
          </li>`})}
      </ol>
    </div>`}function ee(){let A=o(),w=A.auto_repair!==!1,R=A.repo_operation_policy&&typeof A.repo_operation_policy=="object"?A.repo_operation_policy:null,N=Array.isArray(A.repo_operations)?A.repo_operations:[],Z=N.find(ie=>ie.state==="repairing"),fe=N.filter(ie=>ie.state==="failed"||ie.state==="repairing"),pe=fe.length?Math.min(...fe.map(ie=>typeof ie.repair?.remaining=="number"?ie.repair.remaining:0)):R?.auto_repair?.resolution_ladder?.find(ie=>ie.id==="auto_repair_session")?.attempts??1,ne=Array.isArray(R?.auto_repair?.resolution_ladder)?R.auto_repair.resolution_ladder:[];return c`<section
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
          @change=${ie=>{M(ie.target.checked)}}
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
          >남은 자동 해결 ${pe}회</span
        >
        <span
          class="worker-repo-ops__repair-session"
          data-seam="auto-repair-session"
          >${Z?`\uD574\uACB0 \uC138\uC158 \uC2E4\uD589 \uC911 \xB7 ${Z.repair?.owner_bead||Z.operation_id}`:"\uC2E4\uD589 \uC911\uC778 \uD574\uACB0 \uC138\uC158 \uC5C6\uC74C"}</span
        >
      </div>
      ${R?c`<details
            class="worker-repo-ops__policy"
            data-seam="policy-lists"
          >
            <summary>
              Worker 자동 처리 기준
              <span class="worker-repo-ops__policy-count"
                >자동 ${(R.worker_automatic||[]).length} · 해결 사다리
                ${ne.length} · 금지
                ${(R.never_automatic||[]).length}</span
              >
            </summary>
            ${E("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",R.worker_automatic||[],"worker-automatic")}
            ${R.supported===!1||R.schema_version!==2?c`<div
                  class="worker-repo-ops__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uD574\uACB0\uC774 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${R.schema_version})`}
                </div>`:B(ne)}
            ${E("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",R.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}return{template(){return c`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언 · 자동 해결
        </summary>
        ${k(l())} ${ee()}
      </details>`}}}var Q_=20,rd={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"},nd={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8"};function J_(e,t,r=Q_){let n=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||n.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||n.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return n.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),n.slice(0,Math.max(0,r))}function sd(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function em(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"repairing":return"\uC790\uB3D9 \uD574\uACB0 \uC911";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function od(e){let t=e.filter(r=>r.value);return t.length===0?"":c`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(r=>c`<div>
            <dt>${r.term}</dt>
            <dd>${r.value}</dd>
          </div>`)}
    </dl>
  </details>`}function ad(e,t="",r=!1){return!e&&!t?"":c`<p
    class="worker-ev__explain${r?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?c`<br />${t}`:""}
  </p>`}function tm(e){if(e.state!=="failed"||e.superseded_by)return"";let t=e.repair||{},r=typeof t.remaining=="number"?t.remaining:0,n=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"",s=r<=0;return c`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
      data-operation-id=${e.operation_id}
      data-failure-kind=${e.failure_kind||""}
      title="해결 세션을 엽니다"
    >
      ${Object.hasOwn(nd,n)?nd[n]:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC2DC\uC791"}
    </button>
    <span class="worker-ev__btn-sub"
      >${s?"\uC790\uB3D9 \uD574\uACB0\uC744 \uB2E4 \uC37C\uC2B5\uB2C8\uB2E4 \xB7 \uB20C\uB7EC\uC11C \uD574\uACB0 \uC138\uC158\uC744 \uC5FD\uB2C8\uB2E4":`\uC790\uB3D9 \uD574\uACB0 ${r}\uD68C\uAC00 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4`}</span
    >
    ${t.attempt_id?c`<button
          type="button"
          class="worker-ev__btn worker-repo-op__session"
          data-attempt-id=${t.attempt_id}
        >
          해결 세션 보기
        </button>`:""}
    ${e.dismissed?"":c`<button
          type="button"
          class="worker-ev__btn worker-repo-op__dismiss"
          data-operation-id=${e.operation_id}
          title="사람이 확인한 실패로 접수합니다 — 기록은 그대로 남고 해결 필요 집계에서만 빠집니다"
        >
          기록 닫기
        </button>`}
  </div>`}function rm(e){let t=e.operation,r=t.state==="failed",n=t.failure?t.failure.code:"";return c`<li
    class="worker-ev"
    data-operation-id=${t.operation_id}
    data-state=${t.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?vt(e.at):""}
      >${Ws(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${sd(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(rd,t.kind)?rd[t.kind]:t.kind}</span
        >
        <span class="worker-ev__meta"
          >${t.target_base}@${Bs(t.target_sha)}${typeof t.elapsed_ms=="number"?` \xB7 ${Us(t.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${sd(e)}"
          >${em(e)}</span
        >
        ${t.dismissed?c`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${t.superseded_by?c`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
      </div>
      ${r?ad(bc(t.failure_kind,n)):""}
      ${tm(t)}
      ${od([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?n:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${Bs(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function nm(e){let t=e.cleanup,r=Ur(t.step);return c`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?vt(e.at):""}
      >${Ws(e.at)||"\u2014"}</span
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
        ${pc(t.step).map(n=>c`<li
              class="worker-step worker-step--${n.state}"
              data-step=${n.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${n.label}</span>
            </li>`)}
      </ol>
      ${ad(Ys(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
      <div class="worker-ev__acts">
        <button
          type="button"
          class="worker-ev__btn worker-ev__btn--warn worker-cleanup__resume"
          data-bead-id=${t.bead_id}
        >
          정리 재개${r?` \u2014 ${r} \uB2E8\uACC4\uBD80\uD130`:""}
        </button>
        ${t.repair_eligible?c`<button
              type="button"
              class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
              data-operation-id=${`cleanup:${t.bead_id}`}
              data-failure-kind=${t.failure_code||t.reason||""}
            >
              실패 해결 세션 시작
            </button>`:""}
      </div>
      ${od([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function sm(e){return c`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(t=>t.type==="cleanup"?nm(t):rm(t))}
        </ul>`}
  </section>`}function id(e,t={}){let r=null;function n(){Be(r?sm(r):c``,e)}e.addEventListener("click",a=>{a.target?.closest?.('[data-seam="repo-ops-close"]')&&o()});function s(a){r={events:J_(a.operations,a.cleanup_failures),repo:a.repo||""},n()}function o(){r!==null&&(r=null,n(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>r!==null,refresh(a){r&&s(a)}}}var om="tab:worker:ready",am="tab:worker:blocked",im="tab:worker:in-progress",lm="tab:worker:closed",Zs=1,ld=5;function cd(e){return Tn(e).path.length>0}var pd="beads-ui.worker.candidate-filter",ba={show_blocked:!1,spec:"all"};function cm(){try{let e=window.localStorage.getItem(pd);if(!e)return{...ba};let t=JSON.parse(e);if(!t||typeof t!="object")return{...ba};let r=t.spec;return{show_blocked:t.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...ba}}}function dm(e){try{window.localStorage.setItem(pd,JSON.stringify(e))}catch{}}function um(e,t){let r=i=>t.show_blocked||!i.blocked,n=i=>t.spec==="all"||(t.spec==="with"?i.has_spec:!i.has_spec),s=[],o=0,a=0;for(let i of e){let l=r(i),d=n(i);l&&d?s.push(i):!l&&d?o+=1:l&&!d&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var pm=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],fd="bdui.worker.candidate_sort",fm=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],Xs="spec";function _m(){try{let e=window.localStorage.getItem(fd);return e==="board"||e==="created"||e==="spec"?e:Xs}catch{return Xs}}function mm(e){try{window.localStorage.setItem(fd,e)}catch{}}var _d="bdui.worker.done-range";function gm(){try{let e=window.localStorage.getItem(_d);return Bt(e)?e:Pt}catch{return Pt}}function bm(e){try{window.localStorage.setItem(_d,e)}catch{}}var hm="(max-width: 640px)",md="beads-ui.worker.lane-collapsed",jn={queue:!0,done:!0};function vm(){try{let e=window.localStorage.getItem(md);if(!e)return{...jn};let t=JSON.parse(e);return!t||typeof t!="object"?{...jn}:{queue:typeof t.queue=="boolean"?t.queue:jn.queue,done:typeof t.done=="boolean"?t.done:jn.done}}catch{return{...jn}}}function ym(e){try{window.localStorage.setItem(md,JSON.stringify(e))}catch{}}function dd(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let r=typeof t.title=="string"?t.title:t.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function wm(e,t,r){let n=Array.isArray(e)?e.slice():[];return t==="created"?n.sort(Nr):(n.sort(ns(r)),t==="board"?n:[...n.filter(cd),...n.filter(s=>!cd(s))])}function km(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function $m(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function xm(e){let t=e?.blocked_info;if(t&&typeof t=="object"){let s=Array.isArray(t.blockers)?t.blockers.filter(o=>typeof o=="string"&&o.length>0):[];return s.length>0?`\u{1F512} ${s.join(", ")}`:"\u{1F512} blocked"}let n=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(s=>{if(typeof s=="string")return s;if(!s||typeof s!="object")return"";let o=s.type??s.dependency_type;return o!==void 0&&o!=="blocks"?"":s.depends_on_id||s.id||""}).filter(Boolean);return n.length>0?`\u{1F512} ${n.join(", ")}`:"\u{1F512} blocked"}function ud(e){switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function Sm(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function Am(e){return e==="worker_sessions_busy"?"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911":null}function Em(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function Tm(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"implementation review \uB300\uAE30",live:!1,alert:!1};case"reviewing":return{badge:"implementation review \uC911",live:!0,alert:!1};case"revising":return{badge:"review \uC218\uC815 \uC911 \xB7 1\uD68C",live:!0,alert:!1};case"failed":{let r=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:r.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${r.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",live:!1,alert:!0}}default:return null}}function ha(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function Cm(e){if(!e||typeof e!="object")return null;let t=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,n=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,s=n&&typeof n.pr_number=="number"?n.pr_number:null,o="";switch(e.phase){case"gating":o="root \uC7AC\uAC80\uC99D \uC911";break;case"repairing":o=e.subject_role==="root"?`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 \uC6D0 PR \uC218\uC815 \uC911`:`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 repair PR \uC900\uBE44 \uC911`;break;case"waiting_repair_pr":o=s?`repair PR #${s} \uB300\uAE30`:"repair PR \uB300\uAE30";break;case"merging":o=e.subject_role==="repair"?s?`repair PR #${s} \uBA38\uC9C0 \uC911`:"repair PR \uBA38\uC9C0 \uC911":"root \uBA38\uC9C0 \uC911";break;case"cleaning":o="\uC815\uB9AC \uBCF5\uAD6C \uC911";break;case"paused":o="\uC790\uB3D9\uBCF5\uAD6C \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":o=`\uC0AC\uB78C \uD655\uC778 \uD544\uC694 \xB7 ${e.terminal_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`;break;case"completed":return null;default:return null}let a=[o,`\uBCF5\uAD6C \uC138\uC158 ${t}/${r}`];return e.head_sha&&a.push(`head ${e.head_sha}`),e.base_sha&&a.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&a.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`),e.active_attempt_id&&a.push(`attempt ${e.active_attempt_id}`),n&&typeof n.bead_id=="string"&&a.push(`repair ${n.bead_id}`),e.evidence&&a.push(e.evidence),e.log_path&&a.push(e.log_path),{badge:o,title:a.join(`
`),alert:e.phase==="needs_human",lock_actions:e.phase!=="paused"&&e.phase!=="needs_human",repair_pr_url:n&&typeof n.pr_url=="string"?n.pr_url:"",repair_pr_number:s}}function Rm(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",r=(n,s={})=>{let o=[s.title||"",t].filter(Boolean);return{label:n,title:o.join(`
`),live:s.live===!0,alert:s.alert===!0}};return e.continuation_required?r("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0}):e.merge_step?e.gate?.tier==="merged"?r("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):r("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0}):e.conflict_badge?r(e.conflict_badge,{live:e.conflict_live===!0}):e.head_review&&e.head_review.state!=="failed"?r("\uB9AC\uBDF0 \uC9C4\uD589 \uC911",{title:e.head_review.badge,live:e.head_review.live===!0}):e.recovery?.lock_actions?r("\uC790\uB3D9\uBCF5\uAD6C \uC911",{title:e.recovery.title,live:!0}):e.cleanup_failed?r(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0}):e.base_exception?r("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0}):e.conflicting?r("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0}):e.gate?.reason==="base_behind"?r("base \uAC31\uC2E0 \uD544\uC694",{alert:!0}):e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale"?r("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2C8\uAC70\uB098 \uC870\uC0C1 \uD655\uC778\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uB85C, \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB9AC\uBDF0\uD574\uC57C \uBA38\uC9C0\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",alert:!0}):e.gate?.reason==="spec_id_missing"?r("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0}):e.gate?.reason==="review_receipt_invalid"?r("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0}):e.head_review?.state==="failed"?r("\uB9AC\uBDF0 \uC2E4\uD328",{title:e.head_review.failure_reason||"",alert:!0}):e.recovery?r(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?r("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?r(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${ud(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?r(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${ud(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?r(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?r("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?r("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?r("\uB2EB\uD798",{alert:!0}):e.activity?r("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?r("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?r("\uD655\uC778 \uC911"):e.gate?.gate_badge?r(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function Im(e,t,r,n,s=null,o=null,a=null,i=!1,l=null,d=!0,f=null,_=null,g=null,S={},k=!1,M=!1,D={}){let E=!!l&&l.position>0,B=!!l?.continuation_action&&l.continuation_action.continuation===null,ee=!!l&&l.active===!0,A=l&&l.failure||null,w=Am(l?l.waiting:null),R=r[e]||null,N=R&&R.gate?R.gate:null,Z=R&&R.pr?R.pr:null,fe=Cm(g),pe=Em(l?l.resolution:null),ne=Tm(l?l.head_review:null),ie=l&&l.head_review||null,Me=l&&l.authority||null,je=!!ie&&["pending","reviewing","revising"].includes(ie.state),He=E&&!ee&&(ie?.state==="failed"||!Me||Me.source==="automatic"&&!M),Ze=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":pe?pe.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":w,Ve=!!N&&N.base_badge==="\uCDA9\uB3CC",Ye=!!N&&N.enabled===!0,me=Mn({bead_id:e,merge_sha:D.merge_sha,cleanup_cursor:D.cleanup_cursor,merge_progress:o&&o.merge_progress?o.merge_progress:null,cleanup_failed:n,repo_operations:D.repo_operations}),xe=Vs(me),ke=!!n&&["child_sweep","branch_cleanup","parent_close"].includes(n.step)&&!!N&&N.tier==="merged",Le=i&&!!n&&!!N&&N.tier==="merged",he=He&&(Ye||Ve||N?.reason==="base_behind"||N?.reason==="review_receipt_missing"||N?.reason==="review_receipt_stale"||ke||Le),Q=i&&Ve&&d===!1,V=lr(S,e,{external:i,merge_active:ee||me?.step==="merge",merge_queued:E,conflict_active:!!a,cleanup_active:xe,merged:!!n||N?.tier==="merged"}),$e=!!V.operation,ge=!ke&&!!n&&n.step==="repo_operations",te=Rm({continuation_required:B,merge_step:me,conflict_badge:Ze,conflict_live:pe?.live===!0||a==="running",head_review:ie&&ne?{...ne,state:ie.state,failure_reason:ie.failure_reason}:null,recovery:fe,cleanup_failed:n,cleanup_label:n?Ur(n.step):null,base_exception:_,conflicting:Ve,gate:N,queue_failure:A,auto_skip:f,queued:E,queue_active:ee,queue_position:l?l.position:0,activity:Ze?null:o&&o.activity||null}),U=te?.live===!0&&te.title?c`<span title=${te.title}>${te.label}</span>`:te?.label||null;return{id:e,title:i?c`${t}<span class="muted"> · 세션</span>`:t,reason:n&&me?.active!==!0?Gs(n.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:k,external:i,pr_number:Z&&typeof Z.number=="number"?Z.number:null,pr_url:Z&&typeof Z.url=="string"?Z.url:"",completion_badge:te?.live!==!0&&te?.title?te.label:null,completion_title:te?.title||"",completion_repair_pr_url:fe?fe.repair_pr_url:"",completion_repair_pr_number:fe?fe.repair_pr_number:null,badges:U?[U]:[],live_badge:te?.live===!0?U:null,usage:s,alert:te?.alert===!0,merge_action:N?.tier==="merged"&&!ke&&!Le||ge?!1:!E||B||He,timeline_action:ge,cancel_action:E&&!B,cancel_enabled:(!ee||je)&&!(fe&&fe.lock_actions),cancel_title:fe&&fe.lock_actions?"\uC790\uB3D9\uBCF5\uAD6C \uC911 \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694":ee&&!je?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":je?"review \uC9C4\uD589\uC744 \uCDE8\uC18C\uD558\uACE0 \uBA38\uC9C0 \uAD8C\uD55C\uC744 \uD3D0\uAE30\uD569\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:V,discard_action:V.action,merge_step:me,discard_enabled:V.enabled,discard_title:V.title,merge_enabled:!me&&!a&&!$e&&!_&&!(fe&&fe.lock_actions)&&!Q&&!ge&&(Ye||Ve||N?.reason==="base_behind"||N?.reason==="review_receipt_missing"||N?.reason==="review_receipt_stale"||ke||Le||he),merge_label:B?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":ke||Le?"\uC815\uB9AC \uC7AC\uAC1C":Ve&&!me&&!ke?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":N?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":N?.reason==="review_receipt_missing"||N?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":He?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:$e?V.error?`\uD3D0\uAE30 \uC2E4\uD328: ${V.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${V.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:B?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":me?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${me.label}`:Le?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Q?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":ke?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Ve?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":N?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":N?.reason==="review_receipt_missing"||N?.reason==="review_receipt_stale"?"\uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":N?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":Ye?`\uBA38\uC9C0 (${N.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:N&&N.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${N&&N.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function va(e,t={}){let{transport:r,issueStores:n,queueStore:s,analysisStore:o,sessionLogStore:a,uiOrderStore:i,gotoIssue:l,getWorkspacePath:d,doneRange:f,onDoneRangeChange:_}=t,g=n?os(n,i):null,S=is({transport:r,uiOrderStore:i}),k=null,M=[],D=cm(),E=_m(),B=Bt(f)?f:gm(),ee=new Map;function A(){let p=sr.find(v=>v.value===B);return p?p.label:"\uC624\uB298"}let w=vm(),R=!1,N=new Set,Z=new Set,fe=new Set,pe=new Set,ne=[],ie=document.createElement("div");ie.className="worker-console";let Me=document.createElement("div");Me.className="worker-top";let je=document.createElement("div");je.className="worker-drawer-overlay",je.hidden=!0;let He=document.createElement("div");He.className="worker-drawer-overlay__backdrop";let Ze=document.createElement("div");Ze.className="worker-drawer-host";let Ve=document.createElement("div");Ve.className="worker-drawer-host",Ve.hidden=!0,je.append(He,Ze,Ve);let Ye=document.createElement("div");Ye.className="worker-lanes-host",ie.append(Me,je,Ye),e.appendChild(ie);let me=null,xe=Cs(Ze,{transport:r,sessionLogStore:a,onClose:()=>{me=null,je.hidden=!0,ce()}}),ke=id(Ve,{onClose:()=>{Ve.hidden=!0,je.hidden=!0,ce()}}),Le=ed({getWorkspacePath:d||(()=>"")}),he=d&&d()||"",Q=td({queueStore:s,transport:r,onChanged:()=>ce(),onOpenScript:(p,v)=>{Le.open(p,v)}}),V=o?Zc(ie,{queueStore:s,analysisStore:o,transport:r}):null;function $e(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:Zs,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function ge(){let p=$e();return typeof p.revision=="number"?p.revision:0}function te(p){p&&p.queue&&s&&s.set(p.queue)}function U(){let p=$e().queue;return Array.isArray(p)?p.length:0}async function W(p,v,F){if(!r)return;let se=()=>({bead_id:p,...v==="parallel"?{}:{lane:v},index:F,expected_revision:ge()}),j=await r("worker-queue-place",se());te(j),j&&j.conflict&&await r("worker-queue-place",se()).then(te)}async function T(p,v,F){if(!r)return;let se=()=>({bead_id:p,...v==="parallel"?{}:{lane:v},to_index:F,expected_revision:ge()}),j=await r("worker-queue-reorder",se());te(j),j&&j.conflict&&await r("worker-queue-reorder",se()).then(te)}async function H(p){if(!r)return;let v=await r("worker-queue-remove",{bead_id:p,expected_revision:ge()});te(v),v&&v.conflict&&await r("worker-queue-remove",{bead_id:p,expected_revision:ge()}).then(te)}async function I(p){if(!r||!p)return;let v=await r("worker-attempt-pause",{attempt_id:p});v&&v.paused===!1&&v.reason&&le(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${v.reason}`,"error",2400)}async function K(p){if(!r||!p)return;let v=await Qr();if(v===null)return;let F=async(j={})=>await r("worker-attempt-resume",{attempt_id:p,expected_revision:ge(),...v!==""?{instructions:v}:{},...j}),se=await F();te(se),se&&se.conflict&&(se=await F(),te(se)),se=await pr(se,(j,h)=>F({continuation:j,decision_token:h}),{onResult:te,refresh:()=>F()}),se&&se.resumed===!1&&!se.conflict&&se.reason&&le(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${se.reason}`,"error",2400)}async function de(p){if(!r||!p)return;let v=await r("worker-attempt-dismiss",{attempt_id:p,expected_revision:ge()});te(v),v&&v.conflict&&(v=await r("worker-attempt-dismiss",{attempt_id:p,expected_revision:ge()}),te(v)),v&&v.dismissed===!1&&!v.conflict&&v.reason&&le(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${v.reason}`,"error",2400)}async function Y(p,v,F=!0){if(!r)return null;let se=r,j=await se(p,{...v,expected_revision:ge()});return te(j),j&&j.conflict&&F&&(j=await se(p,{...v,expected_revision:ge()}),te(j)),j}async function _e(p){if(!r||!p)return;let v=$e().merge_queue?.find(se=>se.bead_id===p)?.continuation_action;if(v?.mismatch&&v.continuation===null){await C(p,v.mismatch);return}N.add(p),ce();let F;try{F=await Y("worker-merge-queue-add",{bead_id:p})}finally{N.delete(p),ce()}!F||F.conflict||F.applied||le(Sm(F.reason),"error",2400)}async function be(p){if(!(!r||!p||Z.has(p))){Z.add(p),ce();try{let v=await r("worker-cleanup-retry",{bead_id:p,expected_revision:ge()});te(v),v&&!v.retried&&!v.conflict&&v.reason&&le(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${v.reason}`,"error",2400)}finally{Z.delete(p),ce()}}}async function C(p,v){let F=await pr({continuation_mismatch:v},(j,h)=>Y("worker-merge-queue-add",{bead_id:p,continuation:j,decision_token:h},!1)),se=F?.queue?.merge_queue?.find(j=>j.bead_id===p)?.continuation_action;if(F?.applied!==!0&&se?.continuation===null&&se.mismatch){await C(p,se.mismatch);return}F&&F.applied===!1&&!F.conflict&&le("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function q(p){if(!r)return;let v=await Y("worker-merge-auto-toggle",{on:p});!v||v.conflict||le(p?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",p?"success":"info",2400)}async function X(p){if(!r||!p)return;let v=await Y("worker-merge-queue-remove",{bead_id:p});v&&!v.conflict&&!v.applied&&v.reason==="merge_active"&&le("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function re(){await Y("worker-merge-queue-remove",{all:!0})}async function ve(p,v=null,F="unmerged",se=null){if(!r||!p)return;let j=On(p,F);if(!(!!se||typeof globalThis.confirm!="function"||globalThis.confirm(j)))return;let L=await r("worker-discard",{bead_id:p,...v?{attempt_id:v}:{},...se?{operation_id:se}:{},expected_revision:ge()});if(te(L),L&&L.conflict&&(L=await r("worker-discard",{bead_id:p,...v?{attempt_id:v}:{},...se?{operation_id:se}:{},expected_revision:ge()}),te(L)),L&&L.discarded===!0){le(zs(L),"success",5e3);return}if(L&&L.reason){le(`\uD3D0\uAE30 \uC2E4\uD328: ${L.reason}`,"error",2800);return}if(L&&L.accepted&&L.pending==="merged_revert"){le("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(L&&L.accepted&&!L.discarded){le(`\uD3D0\uAE30 \uC9C4\uD589: ${L.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}L&&!L.conflict&&le("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function x(p,v,F){if(!(!r||!v||!F||pe.has(v))){pe.add(v),ce();try{let se=await r(p,{bead_id:v,action_id:F,expected_revision:ge()});te(se),se?.conflict?le("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!se?.ok&&se?.reason&&le(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(se.reason)}`,"error",2800)}finally{pe.delete(v),ce()}}}async function P(p,v){if(!r||!v||fe.has(v))return;fe.add(v),ce();let F;try{let se=async(j={})=>await r(p,{bead_id:v,expected_revision:ge(),...j});F=await se(),te(F),F&&F.conflict&&(F=await r(p,{bead_id:v,expected_revision:ge()}),te(F)),p==="worker-revise-fix"&&(F=await pr(F,(j,h)=>se({continuation:j,decision_token:h}),{onResult:te,refresh:()=>se()}))}finally{fe.delete(v),ce()}if(!(!F||F.conflict)){if(F.ok){le(p==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}le(`\uCC98\uBD84 \uAC70\uBD80: ${F.reason||""}`,"error",3e3)}}async function ue(p){if(!r)return;let v=await r("worker-automation-toggle",{on:p,expected_revision:ge()});te(v),v&&v.conflict&&await r("worker-automation-toggle",{on:p,expected_revision:ge()}).then(te)}async function Ee(p){if(!r||!p)return;let v=await r("worker-repo-operation-repair",{operation_id:p});if(te(v),v&&v.ok===!1){le(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${v.reason||""}`,"error",3e3);return}v&&v.ok===!0&&le("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function qe(p){if(!r||!p)return;let v=await r("worker-repo-operation-dismiss",{operation_id:p});te(v),v&&v.ok===!1&&le(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${v.reason||""}`,"error",3e3)}async function Ae(p){if(!r||!Number.isFinite(p))return;let v=Math.max(Zs,Math.floor(p)),F=await r("worker-queue-set-slots",{slots:v,expected_revision:ge()});te(F),F&&F.conflict&&await r("worker-queue-set-slots",{slots:v,expected_revision:ge()}).then(te)}async function Ge(p){if(!r||!Number.isInteger(p)||p<1||p>ld)return;let v=$e(),F=(Array.isArray(v.serial_lanes)?v.serial_lanes:[]).slice(p).reduce((h,L)=>h+(Array.isArray(L?.entries)?L.entries.length:0),0),se=()=>({count:p,expected_revision:ge()}),j=await r("worker-queue-set-serial-lane-count",se());te(j),j&&j.conflict&&(j=await r("worker-queue-set-serial-lane-count",se()),te(j)),j&&j.applied&&F>0&&le(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${F}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}function We(){let p=$e(),v=g?g.selectBoardColumn(om,"ready"):[],F=g?g.selectBoardColumn(am,"blocked"):[],se=g?g.selectBoardColumn(lm,"closed"):[],j=g?g.selectBoardColumn(im,"in_progress"):[],h=new Map;for(let m of j){let O=$m(m);if(!O)continue;let ae=h.get(O);ae?ae.push(m):h.set(O,[m])}let L=m=>{let O=as(h.get(m)||[]);return O?O.title||O.id:null},oe=p.bead_titles||{},Re=new Map;for(let[m,O]of Object.entries(oe))typeof O=="string"&&O.length>0&&Re.set(m,O);for(let m of[...v,...F])Re.set(m.id,m.title||m.id);let rt=p.bead_times&&typeof p.bead_times=="object"&&!Array.isArray(p.bead_times)?p.bead_times:{},Fe=p.bead_labels&&typeof p.bead_labels=="object"&&!Array.isArray(p.bead_labels)?p.bead_labels:{},Qe=new Map;for(let[m,O]of Object.entries(Fe))Array.isArray(O)&&Qe.set(m,ma(O));for(let m of[...v,...F]){let O=m.labels;Array.isArray(O)&&!Qe.has(m.id)&&Qe.set(m.id,ma(O))}let mt=new Map,b=o?.get()?.last_good?.result?.groups;for(let m of Array.isArray(b)?b:[]){if(m?.eligible!==!0||!Array.isArray(m.members))continue;let O=m.members.map(Ne=>{let lt=(Array.isArray(p.serial_lanes)?p.serial_lanes:[]).find(Vt=>Vt.entries.some(St=>St.bead_id===Ne));return lt?lt.id:null});if(!(O.every(Ne=>Ne!==null)&&new Set(O).size===1))for(let Ne of m.members)mt.set(Ne,m.members.filter(lt=>lt!==Ne))}let u=p.bead_blocked_by&&typeof p.bead_blocked_by=="object"&&!Array.isArray(p.bead_blocked_by)?p.bead_blocked_by:{},$=new Map;for(let[m,O]of Object.entries(rt))O&&typeof O=="object"&&$.set(m,O);for(let m of[...v,...F])$.set(m.id,{created_at:m.created_at,updated_at:m.updated_at});let y=m=>$.get(m)||{},G=p.pr_wait||[],Se=p.pr_observations||{},Ce=p.pr_activity||{},ze=p.cleanup_failed||{},De=Object.entries(ze).map(([m,O])=>({bead_id:m,step:O&&O.step?O.step:"",reason:O&&O.reason?O.reason:"",at:O&&typeof O.at=="number"?O.at:null,detail:O&&typeof O.detail=="string"?O.detail:null,output_tail:O&&typeof O.output_tail=="string"&&O.output_tail?O.output_tail:void 0,log_path:O&&typeof O.log_path=="string"&&O.log_path?O.log_path:void 0,retry_count:O&&typeof O.retry_count=="number"&&Number.isInteger(O.retry_count)&&O.retry_count>0?O.retry_count:0,failure_code:O&&typeof O.failure_code=="string"?O.failure_code:void 0,subject_id:O&&typeof O.subject_id=="string"?O.subject_id:void 0,repair_eligible:!!(O&&O.repair_eligible),repair:O&&O.repair?O.repair:void 0})),pt=p.queue||[],Ie=new Set([...pt.map(m=>m.bead_id),...(Array.isArray(p.serial_lanes)?p.serial_lanes:[]).flatMap(m=>(Array.isArray(m?.entries)?m.entries:[]).map(O=>O.bead_id)),...G.map(m=>m.bead_id),...p.done.map(m=>m.bead_id)]),_t=new Set(F.map(m=>m.id)),on=i?i.get()?.order||{}:{},$a=new Set,xa=[];for(let m of[...v,...F])Ie.has(m.id)||$a.has(m.id)||km(m)||Object.hasOwn(m,"labels")&&_a(m.labels)||($a.add(m.id),xa.push(m));M=wm(xa,E,on);let Td=p.admission||{},Sa=m=>{let O=Td[m];if(!O)return"";if(O.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let ae=typeof O.reason=="string"?O.reason:"",Ne=ae.indexOf(":");return Ne>0&&Ne<ae.length-1?`\u26D4 ${ae.slice(0,Ne)} (${ae.slice(Ne+1)})`:`\u26D4 ${ae}`},Cd=M.map(m=>{let O=Tn(m),ae=O.path.length>0,Ne=m.workflow?.route==="quick_fix"||m.metadata&&m.metadata.route==="quick_fix",lt=!Object.hasOwn(m,"description")||typeof m.description=="string"&&m.description.trim().length>0,St=!(Object.hasOwn(m,"labels")&&_a(m.labels))&&(Ne?lt:ae&&!O.conflict),st=_t.has(m.id),Yt=[];st&&Yt.push(xm(m)),Ne&&!lt?Yt.push("missing_description"):!Ne&&O.conflict?Yt.push("spec_id_conflict"):!Ne&&!ae&&Yt.push("spec \uC5C6\uC74C");let Yn=Sa(m.id);return Yn&&Yt.push(Yn),{id:m.id,title:m.title||m.id,reason:Yt.join(" \xB7 "),draggable:St,lane:"candidate",created_at:m.created_at,updated_at:m.updated_at,workflow:m.workflow,is_quick_fix:Ne,status:m.status,blocked:st,has_spec:ae}}),Qs=um(Cd,D),Rd=Qs.visible,Id=p.revise_parked||{},Bn=p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},Js=(m,O)=>m.map((ae,Ne)=>{let lt=O!=="done",Vt=O!=="done"&&O!=="queue",St=lt?Id[ae.bead_id]:null,st=lt?lr(Bn,ae.bead_id):null,Yt=st?.operation?st:null,Yn=lt&&Qe.get(ae.bead_id)===!0,Ka=u[ae.bead_id]||[],so=p.admission&&typeof p.admission=="object"?p.admission[ae.bead_id]:null,oo=lt?dc(so,!!Yt||pe.has(ae.bead_id)):null,zd=lt&&!oo?Sa(ae.bead_id):null,Hd=lt?[zd]:[],Za=lt&&Ka.length>0&&typeof so?.reason=="string"&&so.reason.startsWith("not_ready")?[`\u23F8 ${Ka.join(", ")} \uC644\uB8CC \uB300\uAE30 (blocks)`]:[],ao=lt?mt.get(ae.bead_id):void 0;return ao&&ao.length>0&&Za.push(`\u2733 serial \uAD8C\uC7A5 \xB7 ${ao.join(", ")}\uC640`),{id:ae.bead_id,title:Re.get(ae.bead_id)||ae.bead_id,reason:Hd.filter(Boolean).join(" \xB7 "),draggable:lt&&!Yt&&!oo,done:O==="done",lane:O,seq:Vt?Ne+1:void 0,worker_serial:Yn,discard:Yt,stale_work:oo,badges:[...Za,...St?["\u23F8 REVISE \uD30C\uD0B9"]:[]],alert:!!St,revise_action:!!St,revise_enabled:!!St&&!Yt&&!fe.has(ae.bead_id),revise_title:St?St.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${St.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:O==="done"?Ut(p.attempts||{},ae.bead_id):null,work_ms:O==="done"?lc(p.attempts||{},ae.bead_id):null,done_at:O==="done"&&typeof ae.added_at=="number"?ae.added_at:void 0,...y(ae.bead_id)}}),zr=p.attempts?Object.values(p.attempts):[],eo=new Set;for(let m of zr)m&&typeof m.resumed_from=="string"&&m.resumed_from.length>0&&eo.add(m.resumed_from);let Aa=new Map;for(let m of zr)Aa.set(m.bead_id,m.attempt_id);let Un=new Map;for(let m of zr)Un.set(m.attempt_id,m);function to(m){let O=new Set,ae=m;for(;ae&&!O.has(ae.attempt_id);){if(ae.conflict_resolution===!0)return!0;O.add(ae.attempt_id),ae=typeof ae.resumed_from=="string"&&ae.resumed_from.length>0&&Un.get(ae.resumed_from)||null}return!1}let Wn=typeof p.declared_base=="string"?p.declared_base:null;function Ld(m){let O=null;for(let ae of zr)!ae||ae.bead_id!==m||to(ae)||(O===null||(typeof ae.started_at=="number"?ae.started_at:0)>=(typeof O.started_at=="number"?O.started_at:0))&&(O=ae);return O&&typeof O.target_base=="string"?O.target_base:null}let Ea=[],Ta=[],Od=Kc(p),Ca=m=>{let O=typeof m.session_id=="string"&&m.session_id.length>0,ae=eo.has(m.attempt_id);return{eligible:O&&!ae,reason:O?ae?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},Gt=null;for(let m of zr){let O=m.status==="paused"&&!eo.has(m.attempt_id);if(m.status==="running"||O)Ta.push({bead_id:m.bead_id,attempt_id:m.attempt_id,title:Re.get(m.bead_id)||m.bead_id,runner:m.runner||null,model:m.model||null,effort:m.effort||null,speed:m.speed||null,continuation_mode:m.continuation_mode||null,started_at:typeof m.started_at=="number"?m.started_at:null,resumed_from:m.resumed_from||null,paused:O,conflict_resolution:to(m),base_exception:ha(Wn,m.target_base),can_pause:typeof m.session_id=="string"&&m.session_id.length>0,discard:lr(Bn,m.bead_id,{attempt_id:m.attempt_id}),usage:Ut(p.attempts||{},m.bead_id),current_child:L(m.bead_id),...y(m.bead_id)});else if((m.status==="failed"||m.status==="orphaned")&&Od(m)){let ae=Ca(m);Ea.push({bead_id:m.bead_id,attempt_id:m.attempt_id,title:Re.get(m.bead_id)||m.bead_id,runner:m.runner||null,model:m.model||null,effort:m.effort||null,speed:m.speed||null,continuation_mode:m.continuation_mode||null,started_at:typeof m.started_at=="number"?m.started_at:null,resumed_from:m.resumed_from||null,failed:!0,status:m.status,status_label:m.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:lr(Bn,m.bead_id,{attempt_id:m.attempt_id}),resume_eligible:ae.eligible,resume_reason:ae.reason,conflict_resolution:to(m),base_exception:ha(Wn,m.target_base),usage:Ut(p.attempts||{},m.bead_id),current_child:L(m.bead_id),...y(m.bead_id)}),Gt=m}}let zn=[...Ea,...Ta].map(m=>{let O=Un.get(m.attempt_id),ae=O?.quickfix_landing;if(O?.quickfix_lane!==!0||!ae||typeof ae!="object")return m;let Ne=typeof ae.reason=="string"&&ae.reason.length>0?ae.reason:null,lt=Mn({bead_id:O.bead_id,merge_sha:ae.head_sha,cleanup_cursor:ae.cursor,cleanup_failed:Ne?{step:ae.cursor,reason:Ne}:null,repo_operations:Array.isArray(p.repo_operations)?p.repo_operations:[]});return lt?{...m,landing:lt}:m}),Ra=null;if(Gt){let m=Ca(Gt),O=Gt.cause_detail;Ra={bead_id:Gt.bead_id,repo:Gt.repo||"",reason:Gt.cause||Gt.status,cause_detail:O&&typeof O.reason=="string"?{reason:O.reason,command:typeof O.command=="string"?O.command:null}:null,resume_attempt_id:Gt.attempt_id,resume_eligible:m.eligible,resume_reason:m.reason,discard:lr(Bn,Gt.bead_id,{attempt_id:Gt.attempt_id})}}let Ia=new Set(zn.map(m=>m.bead_id)),ro=Array.isArray(p.merge_queue)?p.merge_queue:[],La=new Map,Oa=new Map,Pa=new Map,Da=new Map,Ma=new Map;ro.forEach((m,O)=>{m&&typeof m.bead_id=="string"&&(La.set(m.bead_id,O+1),Oa.set(m.bead_id,m.resolution),Pa.set(m.bead_id,m.continuation_action||null),Da.set(m.bead_id,m.head_review||null),Ma.set(m.bead_id,m.authority||null))});let Hr=p.merge_queue_state||{active:null,failures:{}},Pd=Hr.failures||{},Na=Hr.waiting&&typeof Hr.waiting.bead_id=="string"&&typeof Hr.waiting.reason=="string"?Hr.waiting:null,Dd=p.auto_merge_skips||{},qa=m=>{let O=Dd[m];if(!O)return null;let ae=Se[m],Ne=ae&&ae.pr?ae.pr.head_sha:null;return Ne&&Ne===O.head_sha?O.reason||"":null},Hn=new Map;for(let m of zn)m.failed!==!0&&m.conflict_resolution&&(m.paused?Hn.has(m.bead_id)||Hn.set(m.bead_id,"paused"):Hn.set(m.bead_id,"running"));let Fa=zn.filter(m=>!m.paused&&m.failed!==!0).length,ja=(p.workspace_info||{}).slots,Ba=typeof ja=="number"?ja:typeof p.slots=="number"?p.slots:Zs,Md=Fa>Ba,Gn=Dr(B),Nd=(Array.isArray(p.done)?p.done.slice():[]).filter(m=>Gn===void 0||typeof m.added_at!="number"||m.added_at>=Gn).sort((m,O)=>(O.added_at||0)-(m.added_at||0)),an=Js(Nd,"done"),qd=new Set((Array.isArray(p.done)?p.done:[]).map(m=>m?.bead_id).filter(m=>typeof m=="string")),Ua=[],Fd=d?.()||"";for(let m of se){let O=qr(m.closed_at);if(typeof m.id!="string"||qd.has(m.id)||O===null||Gn!==void 0&&O<Gn||typeof m.comment_count!="number"||m.comment_count<=0)continue;let ae=`${Fd}\0${m.id}\0${String(m.updated_at)}\0${m.comment_count}`,Ne=ee.get(ae);Ne===void 0&&r&&(ee.set(ae,"pending"),Promise.resolve(r("get-comments",{id:m.id})).then(lt=>{let Vt=Array.isArray(lt)&&lt.some(St=>Rs(typeof St?.text=="string"?St.text:"")?.lane==="session");ee.set(ae,Vt?"session":"not-session"),ce()}).catch(()=>{ee.set(ae,"failed"),ce()})),Ne==="session"&&Ua.push({id:m.id,title:m.title||m.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:null,done_at:O,created_at:m.created_at,updated_at:m.updated_at})}an.push(...Ua),an.sort((m,O)=>(O.done_at||0)-(m.done_at||0));let Vn={};for(let m of _r)Vn[m]=0;let Wa=!1,za=0,no=0,Ha=0;for(let m of an){let O=m.usage;if(O&&typeof O=="object"){let ae=!1;for(let Ne of _r)Number.isFinite(O[Ne])&&(Vn[Ne]+=O[Ne],Wa=!0,ae=!0);ae&&(no+=1,Number.isFinite(O.total_cost_usd)&&(za+=O.total_cost_usd,Ha+=1))}}no>0&&Ha===no&&(Vn.total_cost_usd=za);let Ga=an.map(m=>m.usage).filter(m=>m&&typeof m=="object"&&m.providers),jd=Ga.length>0?wt(ms(Ga)):Wa?Zt(Vn):null,Bd=p.lane_states&&typeof p.lane_states=="object"&&!Array.isArray(p.lane_states)?p.lane_states:{},Ud=Array.isArray(p.serial_lanes)?p.serial_lanes:[],Va=m=>{if(G.some(Ne=>Ne.bead_id===m))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let O=zr.filter(Ne=>Ne&&Ne.bead_id===m),ae=O.length>0?O[O.length-1].status:null;return ae==="failed"||ae==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":ae==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},Ya=Ud.filter(m=>m&&typeof m.id=="string"&&Array.isArray(m.entries)).map((m,O)=>{let ae=Bd[m.id]||{},Ne=new Map((Array.isArray(ae.corrections)?ae.corrections:[]).filter(st=>st&&typeof st.bead_id=="string"&&typeof st.after=="string").map(st=>[st.bead_id,st.after])),lt=Js(m.entries.filter(st=>!Ia.has(st.bead_id)),m.id).map(st=>Ne.has(st.id)?{...st,badges:[`\u{1F517} ${Ne.get(st.id)} \uB4A4 (blocks \uC790\uB3D9)`,...st.badges]}:st),Vt=Array.isArray(ae.occupied_by)?ae.occupied_by.filter(st=>typeof st=="string"):[],St=Vt.map(st=>({id:st,title:Re.get(st)||st,draggable:!1,lane:m.id,ghost:!0,badges:[Va(st)]}));return{id:m.id,index:O+1,rows:[...St,...lt],occupied:Vt.length>0,badge:Vt.length>0?Va(Vt[0]):"\uB300\uAE30",cycle:ae.cycle===!0}}),Wd=typeof p.serial_lane_count=="number"?p.serial_lane_count:Ya.length;return{queue:p,idToTitle:Re,candidates:Rd,candidate_hidden:{blocked:Qs.hidden_blocked,spec:Qs.hidden_spec},running:zn,live_count:Fa,slots:Ba,over_cap:Md,failure:Ra,waiting:Js(pt.filter(m=>!Ia.has(m.bead_id)),"queue"),serial_lanes:Ya,serial_lane_count:Wd,pr_wait:G.map(m=>Im(m.bead_id,Re.get(m.bead_id)||m.bead_id,Se,ze[m.bead_id]||null,Ut(p.attempts||{},m.bead_id),Ce[m.bead_id]||(N.has(m.bead_id)||Z.has(m.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),Hn.get(m.bead_id)||null,m.external===!0,{position:La.get(m.bead_id)||0,active:Hr.active===m.bead_id,failure:Pd[m.bead_id]||null,waiting:Na?.bead_id===m.bead_id?Na.reason:null,resolution:Oa.get(m.bead_id),continuation_action:Pa.get(m.bead_id),head_review:Da.get(m.bead_id)||null,authority:Ma.get(m.bead_id)||null},m.wt_present!==!1,p.auto_merge===!0?qa(m.bead_id):null,ha(Wn,Ld(m.bead_id)),p.completion_status&&typeof p.completion_status=="object"&&!Array.isArray(p.completion_status)&&p.completion_status[m.bead_id]||null,p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},Un.get(Aa.get(m.bead_id)||"")?.worker_serial===!0,p.auto_merge===!0,{merge_sha:m.merge_sha,cleanup_cursor:m.cleanup_cursor,repo_operations:Array.isArray(p.repo_operations)?p.repo_operations:[]})).map(m=>({...m,...y(m.id)})),merge_queue_length:ro.length,merge_queue_running:ro.length>0,auto_excluded:G.map(m=>m.bead_id).filter(m=>qa(m)!==null),declared_base:Wn,done:an,token_total:jd,cleanup_failures:De,repo_operations:Array.isArray(p.repo_operations)?p.repo_operations:[]}}function gt(){let v=!!o?.get()?.job,F=!v&&o?.isPending?.()===!0,se=v?"\uBD84\uC11D \uC911":F?"\uC900\uBE44 \uC911":"";return c`<button
      type="button"
      class=${se?"worker-analysis-btn worker-analysis-btn--running":"worker-analysis-btn"}
      aria-busy=${se?"true":"false"}
      title="대기 이슈의 병렬 실행 가능성을 분석해 직렬 그룹을 제안합니다 (클릭할 때만 실행)"
    >
      ✳ 병렬성
      분석${se?c`<span class="worker-analysis-btn__badge">${se}</span>`:""}
    </button>`}function ot(p){let v=p.waiting.length>0?p.waiting[0].id:"\u2014",F=c`<button
      type="button"
      class="worker-play${p.queue.auto_advance?" is-active":""}"
    >
      ${p.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,se=J(p),j=p.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",h=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${p.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${p.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${A()} 완료 <b>${p.done.length}</b></span
      >`,L=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${p.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${p.declared_base||"?"}</span
    >`,oe=c`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${Zs}
          step="1"
          .value=${String(p.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:ld},(Fe,Qe)=>Qe+1).map(Fe=>c`<option
                value=${String(Fe)}
                ?selected=${p.serial_lane_count===Fe}
              >
                ${Fe}
              </option>`)}
        </select>
      </label>
      ${o?gt():""} `,Re=vc({failure:p.failure}),rt=cc(p.repo_operations,p.cleanup_failures);return R?c`<div class="worker-ribbon">
          ${F} ${se}
          <div class="worker-kpi worker-kpi--ribbon">${j}${h}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${oe}</div>
          <div class="worker-kpi">${L}</div>
        </div>
        ${rt}${Q.template()}${Re}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${F}${se}${oe}</div>
        <div class="worker-kpi">
          ${j}${h}${L}
          ${(Array.isArray(p.token_total)?p.token_total:p.token_total?[{label:p.token_total,tooltip:`${A()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(Fe=>c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${Fe.tooltip}
                >${A()} 완료 · 누적 ${Fe.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${v}</b></span
          >
        </div>
      </div>
      ${rt}${Q.template()}${Re}`}function at(p){if(p.running.length===0&&p.pr_wait.length===0)return"";let v=p.running.some(F=>!F.paused&&F.failed!==!0);return c`<section
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
      ${p.running.length>0?ia(p.running,Date.now(),me):""}
      ${p.pr_wait.map(F=>ta(F))}
    </section>`}function dt(p){let v=p.candidate_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${D.show_blocked}
        />
        🔒 blocked${v.blocked>0?` ${v.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${pm.map(F=>c`<button
              type="button"
              class="worker-filter__chip${D.spec===F.value?" is-active":""}"
              data-spec=${F.value}
              aria-pressed=${D.spec===F.value?"true":"false"}
            >
              ${F.label}
            </button>`)}
        ${v.spec>0?c`<span class="worker-filter__hidden">숨김 ${v.spec}</span>`:""}
      </div>
    </div>`}function it(){return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${E}
    >
      ${fm.map(p=>c`<option value=${p.value} ?selected=${E===p.value}>
            ${p.label}
          </option>`)}
    </select>`}function ft(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${B}
      >
        ${sr.map(p=>c`<option value=${p.value} ?selected=${B===p.value}>
              ${p.label}
            </option>`)}
      </select>
    </div>`}function z(p){let v=c`<span
      class="worker-lane__badge${p.occupied?" worker-lane__badge--held":""}"
      >${p.badge}</span
    >`,F=p.cycle?c`<div class="worker-lane__cycle">
          ⚠ blocks 순환 감지 — 자동 정렬을 생략했습니다
        </div>`:"";return tr({id:`worker-pane-lane-${p.id}`,lane:p.id,title:`\uC9C1\uB82C ${p.index}`,items:p.rows,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:v,controls:F})}function J(p){let v=p.queue.auto_merge===!0;if(p.merge_queue_running)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${v?" is-active":""}"
        title=${v?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${v?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${p.merge_queue_length}
      </button>`;if(v)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let F=new Set(p.auto_excluded),se=p.pr_wait.filter(j=>j.merge_action&&j.merge_enabled&&!F.has(j.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${se>0?` ${se}`:""}
    </button>`}function ye(p){let v=tr({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:p.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:it(),controls:dt(p)});return R?c`<div class="worker-lanes worker-lanes--mobile">
        ${at(p)}
        ${tr({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:p.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:w.queue,preview:dd(p.waiting)})}
        ${p.serial_lanes.map(F=>z(F))}
        ${v}
        ${tr({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:p.done,empty:`${A()} \uC644\uB8CC \uC5C6\uC74C`,controls:ft(),collapsible:!0,collapsed:w.done,preview:Array.isArray(p.token_total)?p.token_total.map(F=>F.label).join(" \xB7 "):p.token_total||dd(p.done)})}
      </div>`:c`<div class="worker-lanes">
      ${v}
      <div class="worker-wait">
        ${tr({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:p.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
        ${p.serial_lanes.map(F=>z(F))}
      </div>
      ${tr({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${p.slots}`,items:p.running,live:p.running.some(F=>!F.paused&&F.failed!==!0),body:ia(p.running,Date.now(),me)})}
      ${tr({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:p.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${tr({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${A()} ${p.done.length}`,items:p.done,empty:`${A()} \uC644\uB8CC \uC5C6\uC74C`,controls:ft()})}
    </div>`}function we(p){w={...w,[p]:!w[p]},ym(w),ce()}function ce(){let p=We();Be(ot(p),Me),Be(ye(p),Ye)}function Oe(){let p=document.querySelector(".app-header");if(!p)return;let v=()=>{let F=Math.round(p.getBoundingClientRect().height);ie.style.setProperty("--worker-ribbon-top",`${F}px`)};if(v(),typeof ResizeObserver=="function"){let F=new ResizeObserver(v);F.observe(p),ne.push(()=>F.disconnect())}else window.addEventListener("resize",v),ne.push(()=>window.removeEventListener("resize",v))}function tt(){if(typeof window.matchMedia!="function")return;let p=window.matchMedia(hm);R=!!p.matches;let v=F=>{let se=!!(F&&typeof F.matches=="boolean"?F.matches:p.matches);se!==R&&(R=se,ce())};typeof p.addEventListener=="function"?(p.addEventListener("change",v),ne.push(()=>p.removeEventListener("change",v))):typeof p.addListener=="function"&&(p.addListener(v),ne.push(()=>p.removeListener(v)))}let Xe=null;function Pe(p){Xe=p.target instanceof Element?p.target:null}function Je(p){let F=p.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!F)return;if(Xe&&F.contains(Xe)&&Xe.closest("input, button, a")){p.preventDefault();return}let se=F.dataset.beadId||"",j=F.dataset.lane||"";k={bead_id:se,from_lane:j};try{p.dataTransfer?.setData("text/plain",se),p.dataTransfer&&(p.dataTransfer.effectAllowed="move")}catch{}}function Te(p){let v=p.target?.closest?.(".worker-pane");if(!v)return;let F=v.dataset.lane||"";F!=="candidate"&&F!=="queue"&&!/^s[1-5]$/.test(F)||(p.preventDefault(),p.dataTransfer&&(p.dataTransfer.dropEffect="move"),v.classList.add("worker-pane--drag-over"))}function bt(p){p.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function Ot(p,v){let F=M.find(L=>L.id===p);if(!F)return;let se=M.filter(L=>L.id!==p),j=se.length;if(v){let L=v.dataset.beadId;if(L===p)return;let oe=se.findIndex(Re=>Re.id===L);oe>=0&&(j=oe)}let h=se.slice();h.splice(j,0,F),S.applyReorder(p,h,j)}function qt(p){let v=p.target?.closest?.(".worker-pane");if(!v)return;p.preventDefault(),v.classList.remove("worker-pane--drag-over");let F=v.dataset.lane||"",se=k?.bead_id||p.dataTransfer?.getData("text/plain")||"",j=k?.from_lane||"";if(k=null,!se)return;let h=p.target?.closest?.(".worker-mini, .worker-card"),L=Array.from(v.querySelectorAll(".worker-mini, .worker-card")),oe=L.length;if(h){let Re=L.indexOf(h);Re>=0&&(oe=Re)}if(oe=Math.max(0,oe-v.querySelectorAll(".worker-mini--ghost").length),v.classList.contains("worker-pane--collapsed")&&(oe=U()),F==="candidate"){if(j==="candidate"){Ot(se,h);return}(j==="queue"||/^s[1-5]$/.test(j))&&H(se);return}if(F==="queue"||/^s[1-5]$/.test(F)){let Re=F==="queue"?"parallel":F;j===F?T(se,Re,oe):W(se,Re,oe)}}function Ft(p){D=p,dm(p),ce()}function wr(p){E=p==="board"||p==="created"||p==="spec"?p:Xs,mm(E),ce()}function kt(p){B=Bt(p)?p:Pt,bm(B),_?.(B),ce()}function xt(p){let v=p.target?.closest?.(".worker-serial-lane-count");if(v){let oe=Number.parseInt(v.value,10);Number.isFinite(oe)&&Ge(oe).then(ce);return}let F=p.target?.closest?.(".worker-filter__blocked");if(F){Ft({...D,show_blocked:F.checked});return}let se=p.target?.closest?.(".worker-done-range");if(se){kt(se.value);return}let j=p.target?.closest?.(".worker-sort");if(j){wr(j.value||Xs);return}let h=p.target?.closest?.(".worker-slots__input");if(!h)return;let L=Number.parseInt(h.value,10);if(!Number.isFinite(L)){ce();return}Ae(L).then(ce)}function cr(p){return p?{runner:p.runner||void 0,model:p.model||void 0,effort:p.effort||void 0,worktree:p.worktree||void 0,status:p.status||void 0,session_id:p.session_id||void 0}:{}}function rr(){let p=We();return{operations:p.repo_operations,cleanup_failures:p.cleanup_failures,repo:d&&d()||""}}function zt(){me&&xe.close(),Ve.hidden=!1,je.hidden=!1,ke.open(rr()),ce()}function Ht(p){let v=$e(),F=v.attempts?v.attempts[p]:null;me=p,ke.close(),Ve.hidden=!0,je.hidden=!1,xe.open({attempt_id:p,meta:cr(F)}),ce()}function $t(){if(ke.isOpen()&&ke.refresh(rr()),!me)return;let p=$e(),v=p.attempts?p.attempts[me]:null;if(v){xe.updateMeta(cr(v));return}xe.close()}function nr(p){let v=p.target;if(v?.closest?.(".worker-mini__serial, .worker-mini__grip")||v?.closest?.("#worker-parallel-analysis-dialog"))return;if(v?.closest?.(".worker-analysis-btn")){V?.open();return}if(v?.closest?.(".worker-repo-strip")||v?.closest?.(".worker-mini__timeline")){zt();return}let F=v?.closest?.(".worker-repo-op__session");if(F){let Ie=F.dataset.attemptId;Ie&&Ht(Ie);return}let se=v?.closest?.(".worker-repo-op__resolve");if(se){Ee(se.dataset.operationId||"");return}let j=v?.closest?.(".worker-repo-op__dismiss");if(j){qe(j.dataset.operationId||"");return}let h=v?.closest?.(".worker-cleanup__resume");if(h){let Ie=h.dataset.beadId;Ie&&be(Ie);return}let L=v?.closest?.(".worker-banner__resume");if(L){let Ie=L.dataset.attemptId;Ie&&K(Ie);return}let oe=v?.closest?.(".worker-banner__discard");if(oe){let Ie=oe.dataset.confirmation==="merged"?"merged":"unmerged";ve(oe.dataset.beadId||"",oe.dataset.attemptId||null,Ie,oe.dataset.operationId||null);return}let Re=v?.closest?.(".worker-banner__dismiss");if(Re){let Ie=Re.dataset.attemptId;Ie&&de(Ie);return}if(v?.closest?.(".worker-play")){ue(!$e().auto_advance);return}let rt=v?.closest?.(".worker-merge-all");if(rt){rt.classList.contains("worker-merge-all--stop")?$e().auto_merge===!0?q(!1):re():q(!0);return}let Fe=v?.closest?.(".worker-pane__hd--toggle");if(Fe){let Ie=Fe.dataset.lane;(Ie==="queue"||Ie==="done")&&we(Ie);return}let Qe=v?.closest?.(".worker-card__place");if(Qe){let Ie=Qe.dataset.beadId;Ie&&!Qe.disabled&&W(Ie,"parallel",U());return}let mt=v?.closest?.(".worker-filter__chip");if(mt){let Ie=mt.dataset.spec;(Ie==="all"||Ie==="with"||Ie==="without")&&Ft({...D,spec:Ie});return}let b=v?.closest?.(".worker-mini__merge");if(b){let Ie=b.dataset.beadId||"";$e().cleanup_failed?.[Ie]?be(Ie):_e(Ie);return}let u=v?.closest?.(".worker-mini__merge-cancel");if(u){X(u.dataset.beadId||"");return}let $=v?.closest?.(".worker-mini__discard");if($){ve($.dataset.beadId||"",$.dataset.attemptId||null,$.dataset.discardMode==="merged"?"merged":"unmerged",$.dataset.operationId||null);return}let y=v?.closest?.(".worker-mini__stale-continue");if(y){x("worker-stale-work-continue",y.dataset.beadId||"",y.dataset.actionId||"");return}let G=v?.closest?.(".worker-mini__stale-backup");if(G){x("worker-stale-work-backup-fresh",G.dataset.beadId||"",G.dataset.actionId||"");return}let Se=v?.closest?.(".worker-mini__stale-recheck");if(Se){x("worker-stale-work-recheck",Se.dataset.beadId||"",Se.dataset.actionId||"");return}let Ce=v?.closest?.(".worker-mini__revise-fix");if(Ce){P("worker-revise-fix",Ce.dataset.beadId||"");return}let ze=v?.closest?.(".worker-mini__revise-approve");if(ze){P("worker-revise-approve",ze.dataset.beadId||"");return}if(v?.closest?.(".worker-mini__pr"))return;if(v?.closest?.(".rtile__discard")){let Ie=v?.closest?.(".rtile"),_t=Ie?.dataset?.beadId,on=Ie?.dataset?.attemptId;_t&&ve(_t,on||null,"unmerged",v?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(v?.closest?.(".rtile__dismiss")){let _t=v?.closest?.(".rtile")?.dataset?.attemptId;_t&&de(_t);return}if(v?.closest?.(".rtile__pause")){let _t=v?.closest?.(".rtile")?.dataset?.attemptId;_t&&I(_t);return}if(v?.closest?.(".rtile__resume")){let _t=v?.closest?.(".rtile")?.dataset?.attemptId;_t&&K(_t);return}if(v?.closest?.(".rtile__session")){let _t=v?.closest?.(".rtile")?.dataset?.attemptId;_t&&Ht(_t);return}if(v?.closest?.(".worker-drawer-overlay__backdrop")){ke.close(),xe.close();return}if(v?.closest?.(".worker-drawer-host"))return;let De=v?.closest?.(".rtile");if(De){if(v?.closest?.(".rtile__id")){let _t=De.dataset.beadId;_t&&ur(_t).then(on=>{on?le("\uBCF5\uC0AC\uB428","success",1200):le("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Ie=De.dataset.beadId;Ie&&l&&l(Ie);return}let pt=v?.closest?.(".worker-mini, .worker-card");if(pt){let Ie=pt.dataset.beadId;if(v?.closest?.(".worker-mini__id, .worker-card__id")){Ie&&ur(Ie).then(_t=>{_t?le("\uBCF5\uC0AC\uB428","success",1200):le("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}Ie&&l&&l(Ie)}}return e.addEventListener("pointerdown",Pe),e.addEventListener("dragstart",Je),e.addEventListener("dragover",Te),e.addEventListener("dragleave",bt),e.addEventListener("drop",qt),e.addEventListener("click",nr),e.addEventListener("change",xt),tt(),Oe(),g&&ne.push(g.subscribe(()=>{for(let[p,v]of ee)v==="failed"&&ee.delete(p);ce()})),s&&ne.push(s.subscribe(()=>{let p=d&&d()||"";p!==he&&(he=p,Le.close()),ce(),$t()})),o&&typeof o.subscribe=="function"&&ne.push(o.subscribe(()=>ce())),ce(),{load(){ce()},destroy(){for(let p of ne.splice(0))try{p()}catch{}e.removeEventListener("pointerdown",Pe),e.removeEventListener("dragstart",Je),e.removeEventListener("dragover",Te),e.removeEventListener("dragleave",bt),e.removeEventListener("drop",qt),e.removeEventListener("click",nr),e.removeEventListener("change",xt);try{xe.destroy()}catch{}je.hidden=!0;try{V?.destroy()}catch{}try{Le.destroy()}catch{}Be(c``,e)}}}function ya(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function gd(e,t,r,n=async()=>{},s=async()=>{}){let o=ct("views:workspace-picker"),a=null,i=!1,l=!1,d=!1;async function f(R){let Z=R.target.value,pe=t.getState().workspace?.current?.path||"";if(Z&&Z!==pe){o("switching workspace to %s",Z),i=!0,w();try{await r(Z)}catch(ne){o("workspace switch failed: %o",ne)}finally{i=!1,w()}}}async function _(){let R=t.getState(),N=R.workspace?.current?.path||R.workspace?.available?.[0]?.path||"";if(!(!N||l)){o("git-pulling workspace %s",N),l=!0,w();try{await n(N)}catch(Z){o("workspace git pull failed: %o",Z)}finally{l=!1,w()}}}function g(R){let N=R.target;N&&e.contains(N)||M()}function S(R){R.key==="Escape"&&M()}function k(){d||(d=!0,document.addEventListener("mousedown",g),document.addEventListener("keydown",S),w())}function M(){d&&(d=!1,document.removeEventListener("mousedown",g),document.removeEventListener("keydown",S),w())}function D(){d?M():k()}async function E(R){let N=R.target,Z=N.value,fe=N.checked;o("toggling visibility %s \u2192 %s",Z,String(fe));try{await s(Z,fe)}catch(pe){o("workspace visibility toggle failed: %o",pe)}}function B(R){return R?c`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${_}
        ?disabled=${i||l}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:c``}function ee(R,N){return c`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${D}
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
                ${R.map(Z=>c`
                    <label
                      class="workspace-picker__manage-row"
                      title="${Z.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${Z.path}"
                        .checked=${!N.has(Z.path)}
                        @change=${E}
                      />
                      <span class="workspace-picker__manage-name"
                        >${ya(Z.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function A(){let R=t.getState(),N=R.workspace?.current,Z=R.workspace?.available||[],fe=new Set(R.workspace?.hidden||[]),pe=N?.path||Z[0]?.path||"";if(Z.length===0)return c``;let ne=Z.filter(ie=>!fe.has(ie.path)||ie.path===pe);if(ne.length<=1){let ie=ne[0]||Z[0],Me=ya(ie.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${ie.path}"
            >${Me}</span
          >
          ${ee(Z,fe)}
          ${B(pe)}
          ${l?c`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return c`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${f}
          ?disabled=${i||l}
          aria-label="Select project workspace"
        >
          ${ne.map(ie=>c`
              <option
                value="${ie.path}"
                ?selected=${ie.path===pe}
                title="${ie.path}"
              >
                ${ya(ie.path)}
              </option>
            `)}
        </select>
        ${ee(Z,fe)}
        ${B(pe)}
        ${i||l?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function w(){Be(A(),e)}return w(),a=t.subscribe(()=>w()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",g),document.removeEventListener("keydown",S),Be(c``,e)}}}var bd=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-serial-lane-count","subscribe-worker-parallel-analysis","unsubscribe-worker-parallel-analysis","worker-parallel-analysis-snapshot","worker-parallel-analysis-start","worker-parallel-analysis-cancel","worker-parallel-analysis-settings-update","worker-parallel-analysis-submit","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle"];function wa(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function hd(e,t,r=wa()){return{id:r,type:e,payload:t}}function vd(e={}){let t=ct("ws"),r={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},n=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,i=null,l=!0,d=new Map,f=[],_=new Map,g=new Set;function S(A){for(let w of Array.from(g))try{w(A)}catch{}}function k(){if(!l||i)return;o="reconnecting",t("ws reconnecting\u2026"),S(o);let A=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,a)),w=(r.jitterRatio||0)*A,R=Math.max(0,Math.round(A+(Math.random()*2-1)*w));t("ws retry in %d ms (attempt %d)",R,a+1),i=setTimeout(()=>{i=null,ee()},R)}function M(A){try{s?.send(JSON.stringify(A))}catch(w){t("ws send failed",w)}}function D(){for(o="open",t("ws open"),S(o),a=0;f.length;){let A=f.shift();A&&M(A)}}function E(A){let w;try{w=JSON.parse(String(A.data))}catch{t("ws received non-JSON message");return}if(!w||typeof w.id!="string"||typeof w.type!="string"){t("ws received invalid envelope");return}if(d.has(w.id)){let N=d.get(w.id);d.delete(w.id),w.ok?N?.resolve(w.payload):N?.reject(w.error||new Error("ws error"));return}let R=_.get(w.type);if(R&&R.size>0)for(let N of Array.from(R))try{N(w.payload)}catch(Z){t("ws event handler error",Z)}else t("ws received unhandled message type: %s",w.type)}function B(){o="closed",t("ws closed"),S(o);for(let[A,w]of d.entries())w.reject(new Error("ws disconnected")),d.delete(A);a+=1,k()}function ee(){if(!l)return;let A=n();try{s=new WebSocket(A),t("ws connecting %s",A),o="connecting",S(o),s.addEventListener("open",D),s.addEventListener("message",E),s.addEventListener("error",()=>{}),s.addEventListener("close",B)}catch(w){t("ws connect failed %o",w),k()}}return ee(),{send(A,w){if(!bd.includes(A))return Promise.reject(new Error(`unknown message type: ${A}`));let R=wa(),N=hd(A,w,R);return t("send %s id=%s",A,R),new Promise((Z,fe)=>{d.set(R,{resolve:Z,reject:fe,type:A}),s&&s.readyState===s.OPEN?M(N):(t("queue %s id=%s (state=%s)",A,R,o),f.push(N))})},on(A,w){_.has(A)||_.set(A,new Set);let R=_.get(A);return R?.add(w),()=>{R?.delete(w)}},onConnection(A){return g.add(A),()=>{g.delete(A)}},reconnect(){l=!0,i&&(clearTimeout(i),i=null),a=0,ee()},close(){l=!1,i&&(clearTimeout(i),i=null);try{s?.close()}catch{}},getState(){return o}}}function Lm(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function Om(e,t){try{let n=await(await fetch("/api/config")).json();e.setState({config:n})}catch(r){t("config refresh failed",r)}}var ka=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],yd=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:closed","closed-issues"]],Tr="tab:worker:closed",Pm="bdui.worker.done-range",wd=Dc,kd="worker:queue",$d="worker:parallel-analysis",xd="ui:order",Sd="ui:display-policy",Ad="exec:presets",Cr="tab:board:closed",Ed="beads-ui.board.closed-range";function Dm(e){let t=ct("main");t("bootstrap start");let r=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Be(r,e);let n=document.getElementById("top-nav"),s=document.getElementById("usage-meter"),o=document.getElementById("board-root"),a=document.getElementById("worker-root"),i=document.getElementById("monitor-root"),l=document.getElementById("detail-panel");if(s&&Yc(s),o&&a&&i&&l){let Ye=function(b,u){let $="Request failed",y="";if(b&&typeof b=="object"){let Se=b;if(typeof Se.message=="string"&&Se.message.length>0&&($=Se.message),typeof Se.details=="string")y=Se.details;else if(Se.details&&typeof Se.details=="object")try{y=JSON.stringify(Se.details,null,2)}catch{y=""}}else typeof b=="string"&&b.length>0&&($=b);let G=u&&u.length>0?`Failed to load ${u}`:"Request failed";Ve.open(G,$,y)},be=function(b){return`${p.getState().workspace.current?.path||""}\0${b}`},C=function(){W&&(W().catch(()=>{}),W=null),T=null,H=null},X=function(b){I=b;let u=()=>{I!==b||p.getState().selected_id!==b||(I=null,q(b))};if(!Y){de.then(u);return}u()},P=function(b,u,$,y,G){return $!==x[u]?(G().catch(()=>{}),!1):(b.set(y,G),!0)},Ee=function(){let b=p.getState();gt(b.view==="board"),z(b.view==="worker"),Oe(b.view==="monitor"),ye(b.view==="board"||b.view==="worker"||ue||!!b.selected_id)},Ge=function(){let b=Dr(qe);return b===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:b}}},We=function(){let b=Dr(Ae);return b===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:b}}},gt=function(b){if(b)for(let[u,$]of ka){if(re.has(u)||ve.has(u))continue;let y=u===Cr?Ge():{type:$};try{Le.register(u,y)}catch(Ce){t("register %s store failed: %o",u,Ce)}ve.add(u);let G=x.board,Se=!1;ke.subscribeList(u,y).then(Ce=>{Se=!P(re,"board",G,u,Ce)}).catch(Ce=>{t("subscribe %s failed: %o",u,Ce),Ye(Ce,"board")}).finally(()=>{ve.delete(u),Se&&Ee()})}else dt()},dt=function(){x.board+=1;for(let[b]of ka){let u=re.get(b);u&&(u().catch(()=>{}),re.delete(b));try{Le.unregister(b)}catch($){t("unregister %s failed: %o",b,$)}}},z=function(b){if(!b){J();return}for(let[u,$]of yd){if(it.has(u)||ve.has(u))continue;let y=u===Tr?We():{type:$};try{Le.register(u,y)}catch(Ce){t("register %s store failed: %o",u,Ce)}ve.add(u);let G=x.worker,Se=!1;ke.subscribeList(u,y).then(Ce=>{Se=!P(it,"worker",G,u,Ce)}).catch(Ce=>{t("subscribe %s failed: %o",u,Ce),Ye(Ce,"worker")}).finally(()=>{ve.delete(u),Se&&Ee()})}},J=function(){x.worker+=1;for(let[b]of yd){let u=it.get(b);u&&(u().catch(()=>{}),it.delete(b));try{Le.unregister(b)}catch($){t("unregister %s failed: %o",b,$)}}},ye=function(b){if(!b){we();return}ft||(xe("subscribe-worker-queue",{id:kd}).catch(u=>{t("subscribe-worker-queue failed: %o",u)}),xe("subscribe-worker-parallel-analysis",{id:$d}).catch(u=>{t("subscribe-worker-parallel-analysis failed: %o",u)}),ft=()=>(xe("unsubscribe-worker-parallel-analysis",{id:$d}),xe("unsubscribe-worker-queue",{id:kd})))},we=function(){ft&&(ft().catch(()=>{}),ft=null),Q.clear()},Oe=function(b){if(!b){tt();return}ce||(xe("subscribe-monitor-pipeline",{id:wd}).catch(u=>{t("subscribe-monitor-pipeline failed: %o",u)}),ce=()=>xe("unsubscribe-monitor-pipeline",{id:wd}))},tt=function(){ce&&(ce().catch(()=>{}),ce=null)},Pe=function(){Xe||(xe("subscribe-ui-order",{id:xd}).catch(b=>{t("subscribe-ui-order failed: %o",b)}),Xe=()=>xe("unsubscribe-ui-order",{id:xd}))},Je=function(){Xe&&(Xe().catch(()=>{}),Xe=null),$e.clear()},bt=function(){Te||(xe("subscribe-display-policy",{id:Sd}).catch(b=>{t("subscribe-display-policy failed: %o",b)}),Te=()=>xe("unsubscribe-display-policy",{id:Sd}))},Ot=function(){Te&&(Te().catch(()=>{}),Te=null),ge.clear()},Ft=function(){qt||(xe("subscribe-impl-presets",{id:Ad}).catch(b=>{t("subscribe-impl-presets failed: %o",b)}),qt=()=>xe("unsubscribe-impl-presets",{id:Ad}))},zt=function(b){if(!b)return"Unknown";let u=b.split("/").filter(Boolean);return u.length>0?u[u.length-1]:"Unknown"};var d=Ye,f=be,_=C,g=X,S=P,k=Ee,M=Ge,D=We,E=gt,B=dt,ee=z,A=J,w=ye,R=we,N=Oe,Z=tt,fe=Pe,pe=Je,ne=bt,ie=Ot,Me=Ft,je=zt;let He=document.getElementById("header-loading"),Ze=Oi(He),Ve=ic(e),me=vd(),xe=Ze.wrapSend((b,u)=>me.send(b,u)),ke=Si(xe),Le=Ai(),he=Ci(),Q=Ti(),V=di(),$e=Ei(),ge=li(),te=ci(),U=ui();me.on("impl-presets-snapshot",b=>{let u=b;u&&typeof u.revision=="number"&&Array.isArray(u.presets)&&te.set({revision:u.revision,presets:u.presets})}),me.on("monitor-pipeline-snapshot",b=>{let u=b;if(!(!u||!Array.isArray(u.workspaces)))try{V.set(u.workspaces,u.workspaces_state)}catch{}}),me.on("ui-order-snapshot",b=>{let u=b;if(u&&typeof u.revision=="number")try{$e.set({revision:u.revision,order:u.order&&typeof u.order=="object"?u.order:{}})}catch{}}),me.on("display-policy-snapshot",b=>{let u=b;if(u&&u.policy&&typeof u.policy=="object")try{ge.set(u.policy)}catch{}}),me.on("session-log-snapshot",b=>{let u=b;if(u&&typeof u.id=="string")try{U.set(u.id,Array.isArray(u.lines)?u.lines:[],typeof u.last_event_at=="number"?u.last_event_at:null)}catch{}}),me.on("session-log-append",b=>{let u=b;if(u&&typeof u.id=="string")try{U.append(u.id,u.event)}catch{}}),me.on("snapshot",b=>{let u=b,$=u&&typeof u.id=="string"?u.id:"",y=$?Le.getStore($):null;if(y&&u&&u.type==="snapshot")try{y.applyPush(u)}catch{}}),me.on("upsert",b=>{let u=b,$=u&&typeof u.id=="string"?u.id:"",y=$?Le.getStore($):null;if(y&&u&&u.type==="upsert")try{y.applyPush(u)}catch{}}),me.on("delete",b=>{let u=b,$=u&&typeof u.id=="string"?u.id:"",y=$?Le.getStore($):null;if(y&&u&&u.type==="delete")try{y.applyPush(u)}catch{}});let W=null,T=null,H=null,I=null,K=()=>{},de=new Promise(b=>{K=()=>b(void 0)}),Y=!1,_e=!1;async function q(b){let u=be(b);if(u===T||u===H)return;H=u;let $=`detail:${b}`,y={type:"issue-detail",params:{id:b}};try{Le.register($,y)}catch(G){t("register detail store failed: %o",G)}try{let G=await ke.subscribeList($,y);if(p.getState().selected_id!==b||be(b)!==u){await G().catch(()=>{});return}W&&await W().catch(()=>{}),W=G,T=u}catch(G){t("detail subscribe failed: %o",G),Ye(G,"issue details")}finally{H===u&&(H=null)}}let re=new Map,ve=new Set,x={board:0,worker:0},ue=!1,qe=Pt;try{let b=window.localStorage.getItem(Ed);Bt(b)&&(qe=b)}catch{}let Ae=Pt;try{let b=window.localStorage.getItem(Pm);Bt(b)&&(Ae=b)}catch{}async function ot(b){if(!Bt(b)||b===qe)return;qe=b;try{window.localStorage.setItem(Ed,b)}catch{}let u=re.get(Cr);if(!u)return;re.delete(Cr),await u().catch(()=>{});let $=Ge();try{Le.register(Cr,$)}catch(y){t("register %s store failed: %o",Cr,y)}try{let y=await ke.subscribeList(Cr,$);re.set(Cr,y)}catch(y){t("re-subscribe %s failed: %o",Cr,y),Ye(y,"board")}}async function at(b){if(!Bt(b)||b===Ae)return;Ae=b;let u=it.get(Tr);if(!u)return;it.delete(Tr),await u().catch(()=>{});let $=We();try{Le.register(Tr,$)}catch(y){t("register %s store failed: %o",Tr,y)}try{let y=await ke.subscribeList(Tr,$);it.set(Tr,y)}catch(y){t("re-subscribe %s failed: %o",Tr,y),Ye(y,"worker")}}let it=new Map,ft=null,ce=null,Xe=null,Te=null,qt=null;async function wr(){Te=null,ge.clear(),qt=null,te.clear(),ft=null,ce=null,re.clear(),it.clear(),x.board+=1,x.worker+=1,Ft();let b=p.getState().workspace.current?.path;if(b)try{await me.send("set-workspace",{path:b})}catch($){t("workspace restore after reconnect failed: %o",$);return}bt();let u=p.getState();gt(u.view==="board"),z(u.view==="worker"),Oe(u.view==="monitor"),ye(u.view==="board"||u.view==="worker"||!!u.selected_id)}async function kt(){t("clearing all subscriptions for workspace switch"),dt(),J(),we(),he.clear(),Je(),Pe(),Ot(),bt(),C();let b=p.getState();if(b.selected_id)try{Le.unregister(`detail:${b.selected_id}`)}catch{}let u=p.getState();gt(u.view==="board"),z(u.view==="worker"),Oe(u.view==="monitor"),ye(u.view==="board"||u.view==="worker"||!!u.selected_id),u.selected_id&&X(u.selected_id)}async function xt(b){t("requesting workspace switch to %s",b),_e=!0;try{let u=await me.send("set-workspace",{path:b});t("workspace switch result: %o",u),u&&u.workspace&&(p.setState({workspace:{current:{path:u.workspace.root_dir,database:u.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",b),u.changed&&(await kt(),le("Switched to "+zt(b),"success",2e3)))}catch(u){throw t("workspace switch failed: %o",u),le("Failed to switch workspace","error",3e3),u}finally{_e=!1}}async function cr(b){t("requesting workspace git pull for %s",b);try{let u=await me.send("git-pull-workspace",{});t("workspace git pull result: %o",u);let $=u?.status;if($==="up_to_date"){le("Already up to date","success",2e3);return}if($==="stash_pop_conflict"){le("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}le("Git pulled "+zt(b),"success",2e3)}catch(u){t("workspace git pull failed: %o",u);let $=u?.code,y=u?.message;if($==="rebase_conflict"){le("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if($==="rebase_conflict_abort_failed"){le("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if($==="busy"){le("Git pull skipped: another operation is running","warning",3e3);return}let G=y?`: ${y}`:"";throw le(`Git pull failed${G}`,"error",3e3),u}}async function rr(b,u){t("setting workspace visibility %s \u2192 %s",b,String(u));try{await me.send("set-workspace-visibility",{path:b,visible:u}),await Ht()}catch($){t("workspace visibility update failed: %o",$),le("Failed to update project visibility","error",3e3)}}async function Ht(){try{let b=await me.send("list-workspaces",{});if(t("workspaces loaded: %o",b),b&&Array.isArray(b.workspaces)){let u=b.workspaces.map(Se=>({path:Se.path,database:Se.database,pid:Se.pid,version:Se.version})),$=b.current?{path:b.current.root_dir,database:b.current.db_path}:null,y=Array.isArray(b.hidden)?b.hidden.filter(Se=>typeof Se=="string"):[];p.setState({workspace:{current:$,available:u,hidden:y}});let G=window.localStorage.getItem("beads-ui.workspace");G&&(!u.some(Ce=>Ce.path===G)||y.includes(G)?window.localStorage.removeItem("beads-ui.workspace"):$&&G!==$.path&&(t("restoring saved workspace preference: %s",G),await xt(G)))}}catch(b){t("failed to load workspaces: %o",b)}}me.on("workspace-changed",b=>{t("workspace-changed event: %o",b),b&&b.root_dir&&(p.setState({workspace:{current:{path:b.root_dir,database:b.db_path}}}),Ht(),kt())});let $t=!1;if(typeof me.onConnection=="function"){let b=u=>{t("ws state %s",u),u==="reconnecting"||u==="closed"?($t=!0,le("Connection lost. Reconnecting\u2026","error",4e3)):u==="open"&&$t&&($t=!1,le("Reconnected","success",2200),Om(p,($,y)=>{t(`${$}: %o`,y)}),wr())};me.onConnection(b)}let nr="board";try{let b=window.localStorage.getItem("beads-ui.view");(b==="board"||b==="worker"||b==="monitor")&&(nr=b)}catch(b){t("view parse error: %o",b)}let p=Li({config:Lm(),view:nr});me.on("worker-queue-snapshot",b=>{let u=b;if(!u||!u.queue)return;let $=p.getState().workspace.current?.path;if(typeof $=="string"&&$.length>0&&u.root_dir!==$){t("dropping worker-queue snapshot for %s",String(u.root_dir));return}try{he.set(u.queue)}catch{}}),me.on("worker-parallel-analysis-snapshot",b=>{let u=b;if(!u)return;let $=p.getState().workspace.current?.path;if(!(typeof $=="string"&&$.length>0&&typeof u.root_dir=="string"&&u.root_dir!==$))try{Q.set({settings:u.settings,job:u.job??null,last_good:u.last_good??null})}catch{}});let v=Ri(p);v.start();let F=new Set(["get-comments","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults"]),se=async(b,u)=>{try{return await xe(b,u)}catch($){if(F.has(b))throw $;return[]}};n&&Nc(n,p,v);let j=document.getElementById("workspace-picker");j&&gd(j,p,xt,cr,rr);let h=Bc(e,(b,u)=>xe(b,u));try{let b=document.getElementById("new-issue-btn");b&&b.addEventListener("click",()=>h.open())}catch{}let L=Hc(e,{policyStore:ge,queueStore:he,implPresetStore:te,transport:(b,u)=>xe(b,u),onOpenChange:b=>{ue=b,Ee()},labelOptions:()=>{let b=new Set;for(let[u]of ka)for(let $ of Le.snapshotFor(u)||[]){let y=$.labels;if(Array.isArray(y))for(let G of y)typeof G=="string"&&G.length>0&&b.add(G)}return Array.from(b).sort()}});try{let b=document.getElementById("display-settings-btn");b&&(b.setAttribute("aria-label","\uC124\uC815"),b.setAttribute("title","\uC124\uC815"),b.addEventListener("click",()=>L.open()))}catch{}let oe=Wi(o,{gotoIssue:b=>v.gotoIssue(b),issueStores:Le,transport:se,workerQueueStore:he,uiOrderStore:$e,displayPolicyStore:ge,closedRange:qe,onClosedRangeChange:b=>{ot(b)},onNewIssue:()=>h.open()}),Re=va(a,{transport:se,issueStores:Le,queueStore:he,analysisStore:Q,sessionLogStore:U,uiOrderStore:$e,gotoIssue:b=>p.setState({selected_id:b}),getWorkspacePath:()=>p.getState().workspace.current?.path,doneRange:Ae,onDoneRangeChange:b=>{at(b)}}),rt=Mc(i,{transport:se,pipelineStore:V,execPresetStore:te,gotoIssue:b=>v.gotoIssue(b),getWorkspacePath:()=>p.getState().workspace.current?.path,switchWorkspace:b=>xt(b)}),Fe=ac(l,{issueStores:Le,transport:se,queueStore:he,execPresetStore:te,sessionLogStore:U,getWorkspacePath:()=>p.getState().workspace.current?.path,onNavigate:b=>{p.getState().view==="worker"?p.setState({selected_id:b}):v.gotoIssue(b)},onClose:()=>{let b=p.getState();p.setState({selected_id:null});try{v.gotoView(b.view==="worker"||b.view==="monitor"?b.view:"board")}catch{}},onOpenExecPresets:()=>{L.open("session")}}),Qe=p.getState().selected_id;Qe&&(l.hidden=!1,Fe.load(Qe),X(Qe)),p.subscribe(b=>{let u=b.selected_id;u?(l.hidden=!1,Fe.load(u),_e||X(u)):(Fe.clear(),l.hidden=!0,C())});let mt=b=>{o.hidden=b.view!=="board",a.hidden=b.view!=="worker",i.hidden=b.view!=="monitor",gt(b.view==="board"),z(b.view==="worker"),Oe(b.view==="monitor"),ye(b.view==="board"||b.view==="worker"||ue||!!b.selected_id),!b.selected_id&&b.view==="board"&&oe.load(),b.view==="worker"&&Re.load(),b.view==="monitor"?rt.load():rt.pause(),window.localStorage.setItem("beads-ui.view",b.view)};p.subscribe(mt),mt(p.getState()),Pe(),bt(),Ft(),Ht().finally(()=>{Y=!0,K()}),window.addEventListener("keydown",b=>{let u=b.ctrlKey||b.metaKey,$=String(b.key||"").toLowerCase(),y=b.target,G=y&&y.tagName?String(y.tagName).toLowerCase():"",Se=G==="input"||G==="textarea"||G==="select"||y&&typeof y.isContentEditable=="boolean"&&y.isContentEditable;u&&$==="n"&&(Se||(b.preventDefault(),h.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let r=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let t=document.getElementById("app");t&&Dm(t)});export{Dm as bootstrap,Lm as readBootstrapConfig,Om as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
