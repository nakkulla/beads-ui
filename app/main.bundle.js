var Yd=Object.create;var io=Object.defineProperty;var Kd=Object.getOwnPropertyDescriptor;var Zd=Object.getOwnPropertyNames;var Xd=Object.getPrototypeOf,Qd=Object.prototype.hasOwnProperty;var Jd=(e,t,r)=>t in e?io(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var lo=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var eu=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Zd(t))!Qd.call(e,s)&&s!==r&&io(e,s,{get:()=>t[s],enumerable:!(n=Kd(t,s))||n.enumerable});return e};var tu=(e,t,r)=>(r=e!=null?Yd(Xd(e)):{},eu(t||!e||!e.__esModule?io(r,"default",{value:e,enumerable:!0}):r,e));var nt=(e,t,r)=>Jd(e,typeof t!="symbol"?t+"":t,r);var _i=lo((Zm,fi)=>{var Gr=1e3,Vr=Gr*60,Yr=Vr*60,Dr=Yr*24,su=Dr*7,ou=Dr*365.25;fi.exports=function(e,t){t=t||{};var r=typeof e;if(r==="string"&&e.length>0)return au(e);if(r==="number"&&isFinite(e))return t.long?lu(e):iu(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function au(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*ou;case"weeks":case"week":case"w":return r*su;case"days":case"day":case"d":return r*Dr;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Yr;case"minutes":case"minute":case"mins":case"min":case"m":return r*Vr;case"seconds":case"second":case"secs":case"sec":case"s":return r*Gr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function iu(e){var t=Math.abs(e);return t>=Dr?Math.round(e/Dr)+"d":t>=Yr?Math.round(e/Yr)+"h":t>=Vr?Math.round(e/Vr)+"m":t>=Gr?Math.round(e/Gr)+"s":e+"ms"}function lu(e){var t=Math.abs(e);return t>=Dr?ts(e,t,Dr,"day"):t>=Yr?ts(e,t,Yr,"hour"):t>=Vr?ts(e,t,Vr,"minute"):t>=Gr?ts(e,t,Gr,"second"):e+" ms"}function ts(e,t,r,n){var s=t>=r*1.5;return Math.round(e/r)+" "+n+(s?"s":"")}});var gi=lo((Xm,mi)=>{function cu(e){r.debug=r,r.default=r,r.coerce=l,r.disable=a,r.enable=s,r.enabled=i,r.humanize=_i(),r.destroy=d,Object.keys(e).forEach(f=>{r[f]=e[f]}),r.names=[],r.skips=[],r.formatters={};function t(f){let _=0;for(let m=0;m<f.length;m++)_=(_<<5)-_+f.charCodeAt(m),_|=0;return r.colors[Math.abs(_)%r.colors.length]}r.selectColor=t;function r(f){let _,m=null,x,k;function M(...D){if(!M.enabled)return;let E=M,B=Number(new Date),ee=B-(_||B);E.diff=ee,E.prev=_,E.curr=B,_=B,D[0]=r.coerce(D[0]),typeof D[0]!="string"&&D.unshift("%O");let A=0;D[0]=D[0].replace(/%([a-zA-Z%])/g,(R,N)=>{if(R==="%%")return"%";A++;let Z=r.formatters[N];if(typeof Z=="function"){let fe=D[A];R=Z.call(E,fe),D.splice(A,1),A--}return R}),r.formatArgs.call(E,D),(E.log||r.log).apply(E,D)}return M.namespace=f,M.useColors=r.useColors(),M.color=r.selectColor(f),M.extend=n,M.destroy=r.destroy,Object.defineProperty(M,"enabled",{enumerable:!0,configurable:!1,get:()=>m!==null?m:(x!==r.namespaces&&(x=r.namespaces,k=r.enabled(f)),k),set:D=>{m=D}}),typeof r.init=="function"&&r.init(M),M}function n(f,_){let m=r(this.namespace+(typeof _>"u"?":":_)+f);return m.log=this.log,m}function s(f){r.save(f),r.namespaces=f,r.names=[],r.skips=[];let _=(typeof f=="string"?f:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let m of _)m[0]==="-"?r.skips.push(m.slice(1)):r.names.push(m)}function o(f,_){let m=0,x=0,k=-1,M=0;for(;m<f.length;)if(x<_.length&&(_[x]===f[m]||_[x]==="*"))_[x]==="*"?(k=x,M=m,x++):(m++,x++);else if(k!==-1)x=k+1,M++,m=M;else return!1;for(;x<_.length&&_[x]==="*";)x++;return x===_.length}function a(){let f=[...r.names,...r.skips.map(_=>"-"+_)].join(",");return r.enable(""),f}function i(f){for(let _ of r.skips)if(o(f,_))return!1;for(let _ of r.names)if(o(f,_))return!0;return!1}function l(f){return f instanceof Error?f.stack||f.message:f}function d(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}mi.exports=cu});var bi=lo((Lt,rs)=>{Lt.formatArgs=uu;Lt.save=pu;Lt.load=fu;Lt.useColors=du;Lt.storage=_u();Lt.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();Lt.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function du(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function uu(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+rs.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let r=0,n=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),e.splice(n,0,t)}Lt.log=console.debug||console.log||(()=>{});function pu(e){try{e?Lt.storage.setItem("debug",e):Lt.storage.removeItem("debug")}catch{}}function fu(){let e;try{e=Lt.storage.getItem("debug")||Lt.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function _u(){try{return localStorage}catch{}}rs.exports=gi()(Lt);var{formatters:mu}=rs.exports;mu.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var cn=globalThis,Kn=cn.trustedTypes,Qa=Kn?Kn.createPolicy("lit-html",{createHTML:e=>e}):void 0,uo="$lit$",dr=`lit$${Math.random().toFixed(9).slice(2)}$`,po="?"+dr,ru=`<${po}>`,Ir=document,dn=()=>Ir.createComment(""),un=e=>e===null||typeof e!="object"&&typeof e!="function",fo=Array.isArray,si=e=>fo(e)||typeof e?.[Symbol.iterator]=="function",co=`[ 	
\f\r]`,ln=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ja=/-->/g,ei=/>/g,Cr=RegExp(`>|${co}(?:([^\\s"'>=/]+)(${co}*=${co}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ti=/'/g,ri=/"/g,oi=/^(?:script|style|textarea|title)$/i,_o=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),c=_o(1),wr=_o(2),Wm=_o(3),Bt=Symbol.for("lit-noChange"),ut=Symbol.for("lit-nothing"),ni=new WeakMap,Rr=Ir.createTreeWalker(Ir,129);function ai(e,t){if(!fo(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Qa!==void 0?Qa.createHTML(t):t}var ii=(e,t)=>{let r=e.length-1,n=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=ln;for(let i=0;i<r;i++){let l=e[i],d,f,_=-1,m=0;for(;m<l.length&&(a.lastIndex=m,f=a.exec(l),f!==null);)m=a.lastIndex,a===ln?f[1]==="!--"?a=Ja:f[1]!==void 0?a=ei:f[2]!==void 0?(oi.test(f[2])&&(s=RegExp("</"+f[2],"g")),a=Cr):f[3]!==void 0&&(a=Cr):a===Cr?f[0]===">"?(a=s??ln,_=-1):f[1]===void 0?_=-2:(_=a.lastIndex-f[2].length,d=f[1],a=f[3]===void 0?Cr:f[3]==='"'?ri:ti):a===ri||a===ti?a=Cr:a===Ja||a===ei?a=ln:(a=Cr,s=void 0);let x=a===Cr&&e[i+1].startsWith("/>")?" ":"";o+=a===ln?l+ru:_>=0?(n.push(d),l.slice(0,_)+uo+l.slice(_)+dr+x):l+dr+(_===-2?i:x)}return[ai(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},pn=class e{constructor({strings:t,_$litType$:r},n){let s;this.parts=[];let o=0,a=0,i=t.length-1,l=this.parts,[d,f]=ii(t,r);if(this.el=e.createElement(d,n),Rr.currentNode=this.el.content,r===2||r===3){let _=this.el.content.firstChild;_.replaceWith(..._.childNodes)}for(;(s=Rr.nextNode())!==null&&l.length<i;){if(s.nodeType===1){if(s.hasAttributes())for(let _ of s.getAttributeNames())if(_.endsWith(uo)){let m=f[a++],x=s.getAttribute(_).split(dr),k=/([.?@])?(.*)/.exec(m);l.push({type:1,index:o,name:k[2],strings:x,ctor:k[1]==="."?Xn:k[1]==="?"?Qn:k[1]==="@"?Jn:Or}),s.removeAttribute(_)}else _.startsWith(dr)&&(l.push({type:6,index:o}),s.removeAttribute(_));if(oi.test(s.tagName)){let _=s.textContent.split(dr),m=_.length-1;if(m>0){s.textContent=Kn?Kn.emptyScript:"";for(let x=0;x<m;x++)s.append(_[x],dn()),Rr.nextNode(),l.push({type:2,index:++o});s.append(_[m],dn())}}}else if(s.nodeType===8)if(s.data===po)l.push({type:2,index:o});else{let _=-1;for(;(_=s.data.indexOf(dr,_+1))!==-1;)l.push({type:7,index:o}),_+=dr.length-1}o++}}static createElement(t,r){let n=Ir.createElement("template");return n.innerHTML=t,n}};function Lr(e,t,r=e,n){if(t===Bt)return t;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=un(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(t=Lr(e,s._$AS(e,t.values),s,n)),t}var Zn=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:n}=this._$AD,s=(t?.creationScope??Ir).importNode(r,!0);Rr.currentNode=s;let o=Rr.nextNode(),a=0,i=0,l=n[0];for(;l!==void 0;){if(a===l.index){let d;l.type===2?d=new Hr(o,o.nextSibling,this,t):l.type===1?d=new l.ctor(o,l.name,l.strings,this,t):l.type===6&&(d=new es(o,this,t)),this._$AV.push(d),l=n[++i]}a!==l?.index&&(o=Rr.nextNode(),a++)}return Rr.currentNode=Ir,s}p(t){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}},Hr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,n,s){this.type=2,this._$AH=ut,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=Lr(this,t,r),un(t)?t===ut||t==null||t===""?(this._$AH!==ut&&this._$AR(),this._$AH=ut):t!==this._$AH&&t!==Bt&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):si(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==ut&&un(this._$AH)?this._$AA.nextSibling.data=t:this.T(Ir.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=pn.createElement(ai(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new Zn(s,this),a=o.u(this.options);o.p(r),this.T(a),this._$AH=o}}_$AC(t){let r=ni.get(t.strings);return r===void 0&&ni.set(t.strings,r=new pn(t)),r}k(t){fo(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of t)s===r.length?r.push(n=new e(this.O(dn()),this.O(dn()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Or=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,n,s,o){this.type=1,this._$AH=ut,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=ut}_$AI(t,r=this,n,s){let o=this.strings,a=!1;if(o===void 0)t=Lr(this,t,r,0),a=!un(t)||t!==this._$AH&&t!==Bt,a&&(this._$AH=t);else{let i=t,l,d;for(t=o[0],l=0;l<o.length-1;l++)d=Lr(this,i[n+l],r,l),d===Bt&&(d=this._$AH[l]),a||(a=!un(d)||d!==this._$AH[l]),d===ut?t=ut:t!==ut&&(t+=(d??"")+o[l+1]),this._$AH[l]=d}a&&!s&&this.j(t)}j(t){t===ut?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Xn=class extends Or{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===ut?void 0:t}},Qn=class extends Or{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==ut)}},Jn=class extends Or{constructor(t,r,n,s,o){super(t,r,n,s,o),this.type=5}_$AI(t,r=this){if((t=Lr(this,t,r,0)??ut)===Bt)return;let n=this._$AH,s=t===ut&&n!==ut||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==ut&&(n===ut||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},es=class{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){Lr(this,t)}},li={M:uo,P:dr,A:po,C:1,L:ii,R:Zn,D:si,V:Lr,I:Hr,H:Or,N:Qn,U:Jn,B:Xn,F:es},nu=cn.litHtmlPolyfillSupport;nu?.(pn,Hr),(cn.litHtmlVersions??(cn.litHtmlVersions=[])).push("3.3.1");var Be=(e,t,r)=>{let n=r?.renderBefore??t,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new Hr(t.insertBefore(dn(),o),o,void 0,r??{})}return s._$AI(e),s};var Dt="today",sr=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Ut(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function Pr(e,t=Date.now()){switch(e){case"today":{let r=new Date(t);return r.setHours(0,0,0,0),r.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function ci(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function di(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function ui(){let e=null,t=[],r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],n()},clear(){e=null,t=[],n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function pi(){let e=new Map,t=new Set;function r(s){return s.startsWith("session-log:")?s:`session-log:${s}`}function n(){for(let s of Array.from(t))try{s()}catch{}}return{set(s,o,a=null){e.set(r(s),{lines:Array.isArray(o)?[...o]:[],last_event_at:typeof a=="number"?a:null}),n()},append(s,o){let a=r(s),i=e.get(a)||{lines:[],last_event_at:null};i.lines=[...i.lines,o],i.last_event_at=Date.now(),e.set(a,i),n()},get(s){return e.get(r(s))||null},clear(s){typeof s=="string"?e.delete(r(s)):e.clear(),n()},subscribe(s){return t.add(s),()=>t.delete(s)}}}var hi=tu(bi(),1);function ct(e){return(0,hi.default)(`beads-ui:${e}`)}function Zt(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Mr(e,t){let r=Zt(e.created_at),n=Zt(t.created_at);if(r!==n)return r<n?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function wi(e,t){let r=Zt(e.created_at),n=Zt(t.created_at);if(r!==n)return r<n?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function ki(e,t){let r=Zt(e.updated_at),n=Zt(t.updated_at);if(r!==n)return r<n?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function $i(e,t){let r=e.priority??2,n=t.priority??2;if(r!==n)return r-n;let s=Zt(e.created_at),o=Zt(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function xi(e,t){let r=e.closed_at??0,n=t.closed_at??0;if(r!==n)return r<n?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var gu=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function vi(e){let t=e&&e.metadata,r=t?t.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function yi(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let r=gu.exec(t);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Si(e,t){let r=vi(e),n=vi(t);if(r!==n)return r<n?-1:1;let s=yi(e),o=yi(t);if(s!==o)return s<o?-1:1;let a=Zt(e&&e.created_at),i=Zt(t&&t.created_at);if(a!==i)return a<i?-1:1;let l=e&&e.id,d=t&&t.id;return l===d?0:String(l)<String(d)?-1:1}var mo=2**20;function Kr(e,t){let r=e&&e.id;return t&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(t,r)&&typeof t[r]=="number"&&Number.isFinite(t[r])?t[r]:-Zt(e&&e.created_at)}function ns(e){return(t,r)=>{let n=Kr(t,e),s=Kr(r,e);if(n!==s)return n<s?-1:1;let o=t?.id,a=r?.id;return o<a?-1:o>a?1:0}}function go(e,t,r){let n=Array.isArray(e)?e:[],s=n.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?n[o-1]:null,i=o+1<s?n[o+1]:null;if(!a&&!i)return{rank:0};if(!a)return{rank:Kr(i,r)-mo};if(!i)return{rank:Kr(a,r)+mo};let l=Kr(a,r),d=Kr(i,r),f=(l+d)/2;return l<f&&f<d?{rank:f}:{renormalize:n.map((_,m)=>({bead_id:_.id,rank:m*mo}))}}function bo(e,t={}){let r=ct(`issue-store:${e}`),n=new Map,s=[],o=0,a=new Set,i=!1,l=t.sort||Mr;function d(){for(let m of Array.from(a))try{m()}catch{}}function f(){s=Array.from(n.values()).sort(l)}function _(m){if(i||!m||m.id!==e)return;let x=Number(m.revision)||0;if(r("apply %s rev=%d",m.type,x),!(x<=o&&m.type!=="snapshot")){if(m.type==="snapshot"){if(x<=o)return;n.clear();let k=Array.isArray(m.issues)?m.issues:[];for(let M of k)M&&typeof M.id=="string"&&M.id.length>0&&n.set(M.id,M);f(),o=x,d();return}if(m.type==="upsert"){let k=m.issue;if(k&&typeof k.id=="string"&&k.id.length>0){let M=n.get(k.id);if(!M)n.set(k.id,k);else{let D=Number.isFinite(M.updated_at)?M.updated_at:0,E=Number.isFinite(k.updated_at)?k.updated_at:0;if(D<=E){for(let B of Object.keys(M))B in k||delete M[B];for(let[B,ee]of Object.entries(k))M[B]=ee}}f()}o=x,d()}else if(m.type==="delete"){let k=String(m.issue_id||"");k&&(n.delete(k),f()),o=x,d()}}}return{id:e,subscribe(m){return a.add(m),()=>{a.delete(m)}},applyPush:_,snapshot(){return s},size(){return n.size},getById(m){return n.get(m)},dispose(){i=!0,n.clear(),s=[],a.clear(),o=0}}}function ss(e){let t=String(e.type||"").trim(),r={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];r[o]=String(a)}}let n=new URLSearchParams(r).toString();return n.length>0?`${t}?${n}`:t}function Ai(e){let t=ct("subs"),r=new Map,n=new Map;function s(i,l){t("applyDelta %s +%d ~%d -%d",i,(l.added||[]).length,(l.updated||[]).length,(l.removed||[]).length);let d=n.get(i);if(!d||d.size===0)return;let f=Array.isArray(l.added)?l.added:[],_=Array.isArray(l.updated)?l.updated:[],m=Array.isArray(l.removed)?l.removed:[];for(let x of Array.from(d)){let k=r.get(x);if(!k)continue;let M=k.itemsById;for(let D of f)typeof D=="string"&&D.length>0&&M.set(D,!0);for(let D of _)typeof D=="string"&&D.length>0&&M.set(D,!0);for(let D of m)typeof D=="string"&&D.length>0&&M.delete(D)}}async function o(i,l){let d=ss(l);if(t("subscribe %s key=%s",i,d),!r.has(i))r.set(i,{key:d,itemsById:new Map});else{let _=r.get(i);if(_&&_.key!==d){let m=n.get(_.key);m&&(m.delete(i),m.size===0&&n.delete(_.key)),r.set(i,{key:d,itemsById:new Map})}}n.has(d)||n.set(d,new Set);let f=n.get(d);f&&f.add(i);try{await e("subscribe-list",{id:i,type:l.type,params:l.params})}catch(_){let m=r.get(i)||null;if(m){let x=n.get(m.key);x&&(x.delete(i),x.size===0&&n.delete(m.key))}throw r.delete(i),_}return async()=>{t("unsubscribe %s key=%s",i,d);try{await e("unsubscribe-list",{id:i})}catch{}let _=r.get(i)||null;if(_){let m=n.get(_.key);m&&(m.delete(i),m.size===0&&n.delete(_.key))}r.delete(i)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:ss,selectors:{getIds(i){let l=r.get(i);return l?Array.from(l.itemsById.keys()):[]},has(i,l){let d=r.get(i);return d?d.itemsById.has(l):!1},count(i){let l=r.get(i);return l?l.itemsById.size:0},getItemsById(i){let l=r.get(i),d={};if(!l)return d;for(let f of l.itemsById.keys())d[f]=!0;return d}}}}function Ei(){let e=ct("issue-stores"),t=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let l of Array.from(n))try{l()}catch{}}function a(l,d,f){let _=d?ss(d):"",m=r.get(l)||"",x=t.has(l);if(e("register %s key=%s (prev=%s)",l,_,m),x&&m&&_&&m!==_){let k=t.get(l);if(k)try{k.dispose()}catch{}let M=s.get(l);if(M){try{M()}catch{}s.delete(l)}let D=bo(l,f);t.set(l,D);let E=D.subscribe(()=>o());s.set(l,E)}else if(!x){let k=bo(l,f);t.set(l,k);let M=k.subscribe(()=>o());s.set(l,M)}return r.set(l,_),()=>i(l)}function i(l){e("unregister %s",l),r.delete(l);let d=t.get(l);d&&(d.dispose(),t.delete(l));let f=s.get(l);if(f){try{f()}catch{}s.delete(l)}}return{register:a,unregister:i,getStore(l){return t.get(l)||null},snapshotFor(l){let d=t.get(l);return d?d.snapshot().slice():[]},subscribe(l){return n.add(l),()=>n.delete(l)}}}function Ti(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Ci(){let e=null,t=!1,r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},set(s){e=s,n()},isPending(){return t},setPending(s){let o=s===!0;o!==t&&(t=o,n())},clear(){e=null,t=!1,n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function Ri(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function ho(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function bu(e){let t=String(e||""),r=t.startsWith("#")?t.slice(1):t,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let i=new URLSearchParams(s).get("issue");if(i)return decodeURIComponent(i)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function hu(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function Ii(e){let t=ct("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):bu(n),a=hu(n);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let l=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==l&&(window.location.hash=l)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=ho(o,n);t("goto issue %s (view=%s)",n,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?ho(n,o):`#/${n}`;t("goto view %s (id=%s)",n,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var vu=Object.freeze({workspace_config:{default_workspace:null}});function Li(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:vu.workspace_config.default_workspace}}}function Oi(e={}){let t=ct("state"),r={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:Li(e.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let a={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?Li(o.config):r.config},i=a.workspace.current?.path!==r.workspace.current?.path||a.workspace.available.length!==r.workspace.available.length||a.workspace.hidden.length!==r.workspace.hidden.length||a.workspace.hidden.some((d,f)=>d!==r.workspace.hidden[f]),l=a.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;a.selected_id===r.selected_id&&a.view===r.view&&a.filters.status===r.filters.status&&a.filters.search===r.filters.search&&a.filters.type===r.filters.type&&a.board.closed_filter===r.board.closed_filter&&a.worker.selected_parent_id===r.worker.selected_parent_id&&a.worker.show_closed_children.length===r.worker.show_closed_children.length&&a.worker.show_closed_children.every((d,f)=>d===r.worker.show_closed_children[f])&&!i&&!l||(r=a,t("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function Pi(e){let t=ct("activity"),r=0,n=new Map,s=1;function o(){if(!e)return;let d=r>0;e.toggleAttribute("hidden",!d),e.setAttribute("aria-busy",d?"true":"false")}function a(){r+=1,t("start count=%d",r),o()}function i(){let d=r;r=Math.max(0,r-1),d<=0?t("done called but count was already %d",d):t("done count=%d\u2192%d",d,r),o()}function l(d){return async(_,m)=>{let x=s++,k=Date.now();n.set(x,{type:_,start_ts:k}),t("request start id=%d type=%s count=%d",x,_,r+1),a();let M=!1,D=()=>{M||(M=!0,n.delete(x),i())},E=setTimeout(()=>{M||(t("request TIMEOUT id=%d type=%s elapsed=%dms",x,_,Date.now()-k),D())},3e4);try{let B=await d(_,m),ee=Date.now()-k;return t("request done id=%d type=%s elapsed=%dms",x,_,ee),B}catch(B){let ee=Date.now()-k;throw t("request error id=%d type=%s elapsed=%dms err=%o",x,_,ee,B),B}finally{clearTimeout(E),D()}}}return o(),{wrapSend:l,start:a,done:i,getCount:()=>r,getActiveRequests:()=>{let d=Date.now();return Array.from(n.entries()).map(([f,_])=>({id:f,type:_.type,elapsed_ms:d-_.start_ts}))}}}function le(e,t="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=e,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",t==="success"?n.style.background="#156d36":t==="warning"?n.style.background="#a36a00":t==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function os(e=void 0,t=void 0){function r(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function n(o,a,i){let l=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return l.sort(xi),l;switch(i){case"created_desc":return l.sort(Mr),l;case"created_asc":return l.sort(wi),l;case"updated_desc":return l.sort(ki),l;case"priority":return l.sort($i),l;case"manual":default:{let d=r();return d?l.sort(ns(d)):l.sort(Mr),l}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let i of a)try{i()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function Nr(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function vt(e){let t=Nr(e);if(t===null)return"";let r=new Date(t),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function Mt(e,t){let r=Nr(e);if(r===null)return"";let s=(typeof t=="number"?t:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let i=Math.floor(s/864e5);if(i<7)return`${i}\uC77C \uC804`;let l=Math.floor(i/7);if(i<30)return`${l}\uC8FC \uC804`;let d=Math.floor(i/30);return d<12?`${d}\uAC1C\uC6D4 \uC804`:`${Math.floor(i/365)}\uB144 \uC804`}function as(e){if(!Array.isArray(e))return null;let t=null,r=-1;for(let n of e){if(!n||n.status!=="in_progress")continue;let s=Nr(n.updated_at)??0;if(t===null||s>r){t=n,r=s;continue}s===r&&String(n.id)<String(t.id)&&(t=n)}return t}function is(e){let t=e.transport,r=e.uiOrderStore;function n(a,i){return"renormalize"in a?a.renormalize:[{bead_id:i,rank:a.rank}]}function s(a,i){let l={...a.order};for(let d of i)l[d.bead_id]=d.rank;r&&r.set({revision:a.revision,order:l})}async function o(a,i,l){if(!t||!r)return;let d=r.get()||{revision:0,order:{}},f=n(go(i,l,d.order),a);s(d,f);let _=await t("ui-order-set",{expected_revision:d.revision,entries:f});if(_&&_.conflict){let m={revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}};r.set(m);let x=n(go(i,l,m.order),a);s(m,x);let k=await t("ui-order-set",{expected_revision:m.revision,entries:x});k&&k.applied&&r.set({revision:typeof k.revision=="number"?k.revision:0,order:k.order||{}})}else _&&_.applied&&r.set({revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}})}return{applyReorder:o}}function ls(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function vo(e,t){return!t||typeof e!="string"||e.length===0||ls(t.visible_labels).includes(e)?!0:ls(t.hidden_labels).includes(e)?!1:!ls(t.hidden_prefixes).some(r=>r.length>0&&e.startsWith(r))}function cs(e,t){return ls(e).filter(r=>vo(r,t))}function kr(e,t){let r=e&&e.chips?e.chips[t]:void 0;return typeof r=="boolean"?r:!0}var yu={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},Mi={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},Di={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},wu={review:"\u2713",skip:"\u2298"},$r={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function ku(e,t,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function Ni(e){let t=e&&e.fill||"none";return t==="none"?$r.none:e&&e.stale===!0?$r.stale:t==="dim"?$r.dim:e&&e.glyph==="review"?$r.review:e&&e.glyph==="skip"?$r.skip:$r.done}function $u(e){if(!e||e.fill==="none"||!e.approval_state)return Ni(e);let t=[];return e.glyph==="review"?t.push($r.review):e.glyph==="skip"&&t.push($r.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function xu(e,t,r){let n=yu[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,a=wu[t&&t.glyph||""]||"",i="bar";s==="dim"?i+=` b-${n} dim`:s==="full"&&(i+=` b-${n} full`),o&&(i+=" stale"),r&&(i+=" cur");let l=s==="none"?"lbl":`lbl l-${n} on`,d=r?`color: var(--stage-${n}-on)`:"";return c`
    <div class="seg">
      <div class=${i} style=${d}>${a}</div>
      <div class=${l}>
        ${Mi[e]||e}
      </div>
    </div>
  `}function ds(e,t){if(!e||!e.stages)return"";let r=Di[e.route]||Di.spec_backed,n=e.stages,s=ku(r,n,String(t||"open")),o=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${r.map(a=>`${Mi[a]||a} ${a==="plan"?$u(n[a]||{}):Ni(n[a]||{})}`).join(" \xB7 ")}`;return c`
    <div class="stp" role="img" aria-label=${o}>
      ${r.map(a=>xu(a,n[a]||{},a===s))}
    </div>
  `}function Su(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var qi=2;function Au(e){if(!e)return[];let t=[];if(e.external){let n=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(c`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(e.blockers)?e.blockers:[];if(r.length>0){let n=r.slice(0,qi).join(", "),s=r.length-qi,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;t.push(c`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function yo(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function us(e,t){if(!e)return null;let r=yo(e.kind),n=e.reason,s=e.kind==="delegated"?n===null:typeof n=="string"&&n.trim().length>0&&!/[\r\n]/.test(n);if(!r||!s)return null;let o=yo(t?.kind),a=o!==null&&t?.kind!==e.kind,i=`\uACC4\uD68D \xB7 ${r}${a?` \u2192 ${o}`:""}`,l=`planned_execution ${e.kind}${typeof n=="string"?`:${n}`:""}`,d=t?` \xB7 exec_receipt ${t.kind}:${t.actor}@${t.sha}`:"";return{kind:e.kind,label:i,title:`${l}${d}`}}function Fi(e,t){let r=us(e,t);return r?c`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${r.kind}
        title=${r.title}
        >${r.label}</span
      >`:null}function Eu(e){if(!e)return null;let t=yo(e.kind);return t?c`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${e.kind}:${e.actor}@${e.sha}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function Tu(e,t){let r=t.policy||null,n=e.workflow&&e.workflow.chips||{},s=[];if(n.route&&kr(r,"route")){let i=n.route_source==="derived";s.push(c`<span
        class="ctl-chip ctl-chip--route${i?" is-derived":""}"
        title=${i?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${i?"unset":n.route}</span
      >`)}if(n.fast_track&&kr(r,"fast_track")&&s.push(c`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&kr(r,"pr")){let i=n.pr.number;s.push(c`<span class="ctl-chip ctl-chip--pr"
        >${`PR${i!=null?` #${i}`:""}`}</span
      >`)}let o=Fi(n.planned_execution,n.exec_receipt);if(o&&s.push(o),n.exec_receipt){let i=n.exec_receipt;s.push(c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${i.kind}:${i.actor}@${i.sha}`}
        >${`exec ${i.kind==="delegated"?i.actor:`main:${i.actor}`} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}if(n.impl_entry){let i=n.impl_entry;s.push(c`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${i.actor}@${i.sha}`}
        >${`impl ${i.actor} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}for(let i of cs(e.labels,r))s.push(c`<span class="ctl-chip ctl-chip--label">${i}</span>`);return e.from_id&&kr(r,"from")&&s.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${i=>{i.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(i,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),kr(r,"blocked")&&s.push(...Au(e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&kr(r,"blocked")&&s.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":c`<div class="board-card__chips">${s}</div>`}function Cu(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function Ru(e){let t=Mt(e.created_at),r=Mt(e.updated_at);return!t&&!r?"":c`<span class="board-card__times">
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
  </span>`}function Iu(e,t){let r=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=t.isExpanded?t.isExpanded(e.id):!0,o=n>0?r.children.slice().sort(Si):r.children;return c`
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
        ${Ru(e)}
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
                  <span class=${Cu(a.status)}>●</span>
                  <span class="board-card__roll-child-ord">${i+1}</span>
                  <span class="board-card__roll-child-title"
                    >${a.title||a.id}</span
                  >
                  ${us(a.workflow?.chips?.planned_execution,a.workflow?.chips?.exec_receipt)?c`<span class="board-card__roll-child-chips">
                        ${Fi(a.workflow?.chips?.planned_execution,a.workflow?.chips?.exec_receipt)}
                        ${Eu(a.workflow?.chips?.exec_receipt)}
                      </span>`:""}
                </button>`)}
          </div>`:""}
    </div>
  `}function ps(e,t){let r=Su(e.priority);return c`
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
      ${Tu(e,t)}
      ${e.workflow&&kr(t.policy||null,"stepper")?ds(e.workflow,e.status):""}
      ${Iu(e,t)}
    </article>
  `}function Zr(e,t){let r=Array.isArray(e.items)?e.items.length:0,n=e.is_closed===!0;return c`
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
  `}function ji(e,t,r){return c`
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
  `}var Lu=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],Ou=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],Pu=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function Du(e,t,r){let n=e.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return c`
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
  `}function Bi(e,t,r){return c`
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
        ${Lu.map(n=>c`<option
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
        ${Ou.map(n=>c`<option
              value=${n.value}
              ?selected=${e.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${Du(e,t,r)}
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
        ${Pu.map(n=>c`<option
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
  `}var Mu=200,Nu={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},qu=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Ui="beads-ui.board.sort",Wi=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function Fu(){try{let e=window.localStorage.getItem(Ui);if(e&&Wi.has(e))return e}catch{}return"created_desc"}function zi(e,t){let r=ct("views:board"),n=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,i=t.displayPolicyStore,l=t.workerQueueStore,d=t.onClosedRangeChange,f=t.onNewIssue,_=t.closedRange||Dt,m=s?os(s,a):null,x=is({transport:o,uiOrderStore:a}),k=[],M=[],D=[],E=[],B=[],ee=[],A=!1,w=0,R=Fu(),N=new Map,Z=new Map,fe=new Map,pe=new Set,ne={search:"",priority:"",type:"",labels:[]},ie=!1,Me=null;function je(z){return String(z.status||"open")==="open"}function He(z){let J=String(z.status||"open");return J==="open"||J==="blocked"}function Ze(z){let J=ne.search.trim().toLowerCase(),ye=ne.priority,we=ne.type,ce=ne.labels;return z.filter(Oe=>{if(J){let tt=String(Oe.id||"").toLowerCase(),Xe=String(Oe.title||"").toLowerCase();if(!tt.includes(J)&&!Xe.includes(J))return!1}if(ye!==""&&String(Oe.priority)!==ye||we!==""&&String(Oe.issue_type||"")!==we)return!1;if(ce.length>0){let tt=Array.isArray(Oe.labels)?Oe.labels:[];if(!ce.some(Xe=>tt.includes(Xe)))return!1}return!0})}function Ve(){let z=new Set;for(let J of[k,M,D,E,B,ee])for(let ye of J){let we=Array.isArray(ye.labels)?ye.labels:[];for(let ce of we)typeof ce=="string"&&ce.length>0&&z.add(ce)}return Array.from(z).sort()}function Ye(){return ne.search.trim()!==""||ne.priority!==""||ne.type!==""||ne.labels.length>0}function me(){try{if(m){let z=m.selectBoardColumn("tab:board:in-progress","in_progress",R),J=m.selectBoardColumn("tab:board:blocked","blocked",R).filter(He),ye=new Set(z.map(Te=>Te.id)),we=m.selectBoardColumn("tab:board:ready","ready",R).filter(Te=>je(Te)&&!ye.has(Te.id)),ce=m.selectBoardColumn("tab:board:resolved","resolved",R),Oe=m.selectBoardColumn("tab:board:deferred","deferred",R),tt=m.selectBoardColumn("tab:board:closed","closed").slice(0,Mu),Xe=[...J,...we,...z,...ce,...tt];xe(Xe);let Pe=new Set;for(let Te of Xe)Te&&Te.id&&!wo(Te)&&Pe.add(Te.id);let Je=!Ye();k=Je?fn(J,Pe):J,M=Je?fn(we,Pe):we,D=Je?fn(z,Pe):z,E=Je?fn(ce,Pe):ce,B=Oe,w=Oe.length,ee=Je?fn(tt,Pe):tt,N=new Map;for(let Te of k)N.set(Te.id,"open");for(let Te of M)N.set(Te.id,"open");for(let Te of D)N.set(Te.id,"in_progress");for(let Te of E)N.set(Te.id,"resolved");for(let Te of B)N.set(Te.id,"deferred");for(let Te of ee)N.set(Te.id,"closed");Z=new Map;for(let Te of k)Z.set(Te.id,"blocked-col");for(let Te of M)Z.set(Te.id,"ready-col");for(let Te of D)Z.set(Te.id,"in-progress-col");for(let Te of E)Z.set(Te.id,"resolved-col");for(let Te of ee)Z.set(Te.id,"closed-col")}Ee()}catch{k=[],M=[],D=[],E=[],B=[],ee=[],fe=new Map,Ee()}}function xe(z){let J=new Map;for(let we of z)we&&we.id&&!J.has(we.id)&&J.set(we.id,we);let ye=new Map;for(let we of J.values()){let ce=wo(we);if(!ce)continue;let Oe=ye.get(ce);Oe||(Oe=[],ye.set(ce,Oe)),Oe.push({id:we.id,title:we.title,status:we.status,metadata:we.metadata,workflow:we.workflow,created_at:we.created_at,updated_at:we.updated_at})}fe=ye}function ke(z){let J=fe.get(z)||[],ye=0;for(let ce of J)(ce.status==="resolved"||ce.status==="closed")&&(ye+=1);let we=as(J);return{total:J.length,count:ye,current:we,children:J}}function Le(z){return!pe.has(z)}function he(z,J){z.preventDefault(),z.stopPropagation(),pe.has(J)?pe.delete(J):pe.add(J),Ee()}function Q(z,J){z.preventDefault(),z.stopPropagation(),n(J)}function V(z,J){z.preventDefault(),z.stopPropagation(),n(J)}function $e(z,J){Me||n(J)}function ge(z,J){z.preventDefault(),z.stopPropagation(),ju(J).then(ye=>{ye&&le("\uBCF5\uC0AC\uB428","success",1200)})}function te(z,J){Me=J,z.dataTransfer&&(z.dataTransfer.setData("text/plain",J),z.dataTransfer.effectAllowed="move"),z.target.classList.add("board-card--dragging")}function U(z){z.target.classList.remove("board-card--dragging"),bt(),setTimeout(()=>{Me=null},0)}function W(z){let J=String(z.target.value||"");!J||J===_||(_=J,d&&d(J),Ee())}function T(){return i?i.get():null}function H(z){let J=l?l.get():null,ye=J?J.cleanup_failed:null;if(!ye||typeof ye!="object"||Array.isArray(ye))return null;let we=ye[z];return!we||typeof we!="object"||Array.isArray(we)?null:we}let I={onCardClick:$e,onCopyId:ge,onDragStart:te,onDragEnd:U,onClosedRangeChange:W,rollupFor:ke,isExpanded:Le,onRollupToggle:he,onChildClick:Q,onFromChipClick:V,cleanupFailureFor:H,get policy(){return T()}};function K(z,J){Me||(ve(),n(J))}function de(z,J){z.preventDefault(),z.stopPropagation(),ve(),n(J)}let Y={...I,onCardClick:K,onChildClick:de,onFromChipClick:de,get policy(){return T()}};function _e(z){let J=z.target,ye=e.querySelector(".board-filter__labels");J&&ye&&ye.contains(J)||q()}function be(z){z.key==="Escape"&&q()}function C(){ie||(ie=!0,document.addEventListener("mousedown",_e),document.addEventListener("keydown",be),Ee())}function q(){ie&&(ie=!1,document.removeEventListener("mousedown",_e),document.removeEventListener("keydown",be),Ee())}function X(z){z.key==="Escape"&&ve()}function re(){A||(A=!0,document.addEventListener("keydown",X),Ee())}function ve(){A&&(A=!1,document.removeEventListener("keydown",X),Ee())}let S={onClose:ve,onOverlayClick(z){z.target===z.currentTarget&&ve()}},P={onSearchInput(z){ne.search=String(z.target.value||""),me()},onPriorityChange(z){ne.priority=String(z.target.value||""),me()},onTypeChange(z){ne.type=String(z.target.value||""),me()},onSortChange(z){let J=String(z.target.value||"");if(!(!Wi.has(J)||J===R)){R=J;try{window.localStorage.setItem(Ui,J)}catch{}me()}},onDeferredToggle(){A?ve():re()},onLabelMenuToggle(){ie?q():C()},onLabelToggle(z){let J=ne.labels.indexOf(z);J===-1?ne.labels.push(z):ne.labels.splice(J,1),me()},onLabelClear(){ne.labels.length!==0&&(ne.labels=[],me())},onNewIssue(){f&&f()}};function ue(){return c`
      <div class="board-view">
        ${Bi(ne,P,{sort_mode:R,deferred_popup_open:A,deferred_count:w,label_options:Ve(),label_menu_open:ie})}
        <div class="board-root">
          ${Zr({title:"Blocked",id:"blocked-col",items:Ze(k)},I)}
          ${Zr({title:"Ready",id:"ready-col",items:Ze(M)},I)}
          ${Zr({title:"In progress",id:"in-progress-col",items:Ze(D)},I)}
          ${Zr({title:"Resolved",id:"resolved-col",items:Ze(E)},I)}
          ${Zr({title:"Closed",id:"closed-col",items:Ze(ee),is_closed:!0,closed_range:_},I)}
        </div>
        ${A?ji({items:Ze(B),count:w},Y,S):""}
      </div>
    `}function Ee(){Be(ue(),e),qe()}function qe(){try{let z=e.querySelector("#deferred-popup");z&&!z.open&&(typeof z.showModal=="function"?z.showModal():z.setAttribute("open",""));let J=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let ye of J)Array.from(ye.querySelectorAll(".board-card")).forEach((ce,Oe)=>{ce.tabIndex=Oe===0?0:-1})}catch{}}async function Ae(z,J){if(!o){le("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:z,status:J}),le("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(ye){r("update-status failed: %o",ye),le("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function Ge(z){switch(z){case"blocked-col":return k;case"ready-col":return M;case"in-progress-col":return D;case"resolved-col":return E;default:return[]}}function We(z,J,ye){if(!o||!a)return;let we=Ge(z),ce=we.find(Je=>Je.id===J);if(!ce)return;let Oe=we.filter(Je=>Je.id!==J),tt=ye.closest?ye.closest(".board-card"):null,Xe=Oe.length;if(tt){let Je=tt.getAttribute("data-issue-id");if(Je===J)return;let Te=Oe.findIndex(ht=>ht.id===Je);Te>=0&&(Xe=Te)}let Pe=Oe.slice();Pe.splice(Xe,0,ce),x.applyReorder(J,Pe,Xe)}function bt(){for(let z of Array.from(e.querySelectorAll(".board-column--drag-over")))z.classList.remove("board-column--drag-over")}let ot=null;e.addEventListener("dragover",z=>{z.preventDefault(),z.dataTransfer&&(z.dataTransfer.dropEffect="move");let ye=z.target.closest(".board-column");ye&&ye!==ot&&(ot&&ot.classList.remove("board-column--drag-over"),ye.classList.add("board-column--drag-over"),ot=ye)}),e.addEventListener("dragleave",z=>{let J=z.relatedTarget;(!J||!e.contains(J))&&ot&&(ot.classList.remove("board-column--drag-over"),ot=null)}),e.addEventListener("drop",z=>{z.preventDefault(),ot&&(ot.classList.remove("board-column--drag-over"),ot=null);let J=z.target,ye=J.closest(".board-column");if(!ye)return;let we=z.dataTransfer?.getData("text/plain")||"";if(!we)return;let ce=ye.id,Oe=Z.get(we);if(Oe&&Oe===ce){if(qu.has(ce)){if(R!=="manual"){le("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}We(ce,we,J)}return}let tt=Nu[ce];if(!tt){le("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}N.get(we)!==tt&&Ae(we,tt)}),e.addEventListener("keydown",z=>{let J=z.target;if(!(J instanceof HTMLElement))return;let ye=String(J.tagName||"").toLowerCase();if(ye==="input"||ye==="textarea"||ye==="select"||ye==="button"||ye==="a"||J.isContentEditable===!0)return;let we=J.closest(".board-card");if(!we)return;let ce=String(z.key||"");if(ce==="Enter"||ce===" "){z.preventDefault();let Pe=we.getAttribute("data-issue-id");Pe&&n(Pe);return}if(ce!=="ArrowUp"&&ce!=="ArrowDown"&&ce!=="ArrowLeft"&&ce!=="ArrowRight")return;z.preventDefault();let Oe=we.closest(".board-column");if(!Oe)return;let tt=Array.from(Oe.querySelectorAll(".board-card")),Xe=tt.indexOf(we);if(ce==="ArrowDown"&&Xe<tt.length-1){at(we,tt[Xe+1]);return}if(ce==="ArrowUp"&&Xe>0){at(we,tt[Xe-1]);return}if(ce==="ArrowLeft"||ce==="ArrowRight"){let Pe=Array.from(e.querySelectorAll(".board-column")),Je=Pe.indexOf(Oe),Te=ce==="ArrowRight"?1:-1,ht=Je+Te;for(;ht>=0&&ht<Pe.length;){let Pt=Pe[ht].querySelector(".board-card");if(Pt){at(we,Pt);return}ht+=Te}}});function at(z,J){try{z.tabIndex=-1,J.tabIndex=0,J.focus()}catch{}}let dt=null;m&&m.subscribe&&(dt=m.subscribe(()=>{try{me()}catch{}}));let it=null;i&&i.subscribe&&(it=i.subscribe(()=>{try{me()}catch{}}));let ft=null;return l&&l.subscribe&&(ft=l.subscribe(()=>{Ee()})),{async load(){r("load"),me()},clear(){q(),ve(),dt&&(dt(),dt=null),it&&(it(),it=null),ft&&(ft(),ft=null),e.replaceChildren(),k=[],M=[],D=[],E=[],B=[],ee=[],N=new Map,Z=new Map}}}function wo(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function fn(e,t){return e.filter(r=>{let n=wo(r);return!(n&&t.has(n))})}async function ju(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let r=!1;try{r=document.execCommand("copy")}finally{t.remove()}return r}catch{return!1}}async function ur(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}function or(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function xr(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function Bu(e,t=document){let r=t.createElement("dialog");r.className="continuation-dialog";let n=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),i=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",i.textContent=`${or(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${or(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,n.type="button",n.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",n.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",r.append(a,i,n,s,o),t.body.append(r),new Promise(l=>{let d=f=>{typeof r.close=="function"&&r.close(),r.remove(),l(f)};n.addEventListener("click",()=>d("prior_session")),s.addEventListener("click",()=>d("fresh_current")),o.addEventListener("click",()=>d(null)),r.addEventListener("cancel",f=>{f.preventDefault(),d(null)}),typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")})}async function pr(e,t,r={}){let n=e;for(r.onResult?.(n);n?.continuation_mismatch;){let s=n.continuation_mismatch,o=await Bu(s);if(o===null)return n;n=await t(o,s.decision_token),r.onResult?.(n),n?.conflict&&r.refresh&&(n=await r.refresh(n),r.onResult?.(n))}return n}var Uu=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","orchestration_model","orchestration_effort","orchestration_speed"],Hi={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},Wu=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function Et(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function xt(e){return typeof e=="string"&&e.length>0?e:null}function fs(e){return e.startsWith("gpt-")?e.slice(4):e}function mt(e,t,r,n,s){return{value:e,source:t,display:r,full_value:n,resolution:s}}function Ki(e,t,r){let n=xt(t[e]);if(n!==null)return{value:n,source:"pin"};let s=xt(r[e]);return s===null?null:{value:s,source:"global"}}function _n(e,t,r,n){return Ki(e,t,r)||{value:n,source:"base"}}function Gi(e,t,r,n){let s=r?.implementation?.model_catalog;if(t&&Et(s?.[t])){let a=xt(s[t][e]);if(a!==null)return a}if(t&&Array.isArray(s?.[t])&&s[t].includes(e))return e;if(!t&&Et(s)){for(let a of Object.values(s))if(Et(a)){let i=xt(a[e]);if(i!==null)return i}else if(Array.isArray(a)&&a.includes(e))return e}let o=n?.model_index?.[e];return xt(n?.runners?.[o]?.models?.[e]?.id)||e}function zu(e,t){return xt(t?.review?.reviewers?.[e]?.model)||e}function mn(e,t,r=!1){if(e==="default")return mt(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let n=r?fs(e):e;return mt(e,t,n,e,"explicit")}function Hu(e,t,r){let n=t?.implementation?.model_catalog?.[e],s=[];Et(n)?s.push(...Object.keys(n)):Array.isArray(n)&&s.push(...n.filter(a=>typeof a=="string"));let o=r?.runners?.[e]?.models;if(Et(o))for(let a of Object.keys(o))s.includes(a)||s.push(a);return s}function Vi(e){return mt(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function Yi(e,t,r){let n=Ki(e,t,r);return n?mn(n.value,n.source):mt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function Xr(e){let t=Et(e.pin)?e.pin:{},r=Et(e.global)?e.global:{},n=Et(e.execution_defaults)?e.execution_defaults:null,s=n?.supported===!0&&Et(n.session)?n.session:null,o=n?.supported===!0&&Et(n.orchestration)?n.orchestration:null,a=Et(e.runner_catalog)?e.runner_catalog:null,i={};if(s){let l=_n("workflow_mode",t,r,xt(s.workflow_mode_default));i.workflow_mode=l.source==="base"?mt(l.value,"base",l.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",l.value,"default"):mn(l.value,l.source);for(let f of["spec_review","plan_review","impl_review"]){let _=`${f}_model`,m=xt(f==="plan_review"?l.value==="fast_track"?s.plan_review?.fast_track_default:s.plan_review?.standard_recommended:s.review?.default),x=_n(_,t,r,m);if(x.value===null)i[_]=mt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(x.value!=="self"&&x.value!=="skip"&&!Et(s.review?.reviewers?.[x.value]))i[_]=Vi(mt(x.value,x.source,"",null,"explicit"));else{let k=zu(x.value,s);i[_]=mt(x.value,x.source,fs(k),k,x.source==="base"?"default":"explicit")}}for(let[f,_]of Object.entries(Hi)){let m=i[_].value;if(m==="self"||m==="skip"){i[f]=mt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let x=xt(s.review?.reviewers?.[m||""]?.effort),k=_n(f,t,r,x);i[f]=k.value===null?mt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):mt(k.value,k.source,k.value,k.value,k.source==="base"?"default":"explicit")}let d=Et(s.implementation?.default)?s.implementation.default:{};for(let f of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let _=_n(f,t,r,xt(d[f.replace("impl_","")]));i[f]=_.value===null?mt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):mt(_.value,_.source,_.value,_.value,_.source==="base"?"default":"explicit")}if(i.impl_dispatch.value==="main"){i.impl_dispatch.display="\uBA54\uC778";for(let f of["impl_runtime","impl_model","impl_effort","impl_speed"])i[f]=mt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(i.impl_dispatch.value==="delegated"&&(i.impl_dispatch.display="\uC704\uC784"),i.impl_runtime.value==="inherit"&&(i.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",i.impl_runtime.resolution="dynamic"),i.impl_model.value!==null){let f=i.impl_runtime.value==="inherit"?xt(e.controller_runtime):i.impl_runtime.value,_=f?Hu(f,s,a):[];if(i.impl_model.value!=="auto"&&_.length>0&&!_.includes(i.impl_model.value))i.impl_model=Vi(i.impl_model);else{let m=Gi(i.impl_model.value,f,s,a);i.impl_model.display=fs(m),i.impl_model.full_value=m}}if(i.impl_effort.value==="auto"){let f=xt(e.transport)||(i.impl_runtime.value==="codex"?"codex-native-spawn":i.impl_runtime.value==="claude"?"implement-claude":null),_=f?xt(s.implementation?.effort_by_transport?.[f]?.auto):null;_&&!Wu.has(_)?(i.impl_effort.display=`${_} (\uBE44\uD638\uD658)`,i.impl_effort.full_value=_,i.impl_effort.resolution="incompatible"):(i.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",i.impl_effort.resolution="dynamic")}i.impl_speed.value==="default"&&(i.impl_speed=i.impl_speed.source==="base"?mt("default","base","default (\uC77C\uBC18)","default","default"):mn("default",i.impl_speed.source))}}else for(let l of Uu.filter(d=>!d.startsWith("orchestration_")))i[l]=Yi(l,t,r);if(!s){for(let[l,d]of Object.entries(Hi))(i[d].value==="self"||i[d].value==="skip")&&(i[l]=mt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(i.impl_dispatch.value==="main"){i.impl_dispatch.display="\uBA54\uC778";for(let l of["impl_runtime","impl_model","impl_effort","impl_speed"])i[l]=mt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else i.impl_dispatch.value==="delegated"&&(i.impl_dispatch.display="\uC704\uC784"),i.impl_runtime.value==="inherit"&&(i.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",i.impl_runtime.resolution="dynamic"),i.impl_effort.value==="auto"&&(i.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",i.impl_effort.resolution="dynamic")}for(let l of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!o){i[l]=Yi(l,t,r);continue}let d=l.replace("orchestration_",""),f=xt(o[d]),_=_n(l,t,r,f);if(l==="orchestration_effort"&&_.source==="base"){i[l]=mt(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(_.value===null){i[l]=mt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(l==="orchestration_model"){let m=_.source==="base"?xt(o.model_id)||_.value:Gi(_.value,null,s,a);i[l]=mt(_.value,_.source,fs(m),m,_.source==="base"?"default":"explicit");continue}if(_.value==="default"){i[l]=_.source==="base"?mt("default","base","default (\uC77C\uBC18)","default","default"):mn("default",_.source);continue}i[l]=mn(_.value,_.source)}return i}function Gu(e,t){let r=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let n=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${r} (${n})`}function _s(e){let t=Et(e.pin)?e.pin:{},r=Et(e.global)?e.global:{},n=f=>Xr({pin:e.layer==="pin"?f:t,global:e.layer==="pin"?r:f,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,controller_runtime:e.controller_runtime}),s=e.layer==="pin"?t:r,o={...s};delete o[e.key];let a=n(o)[e.key],i=n(s)[e.key],l=xt(s[e.key]),d=[...e.choices];return l!==null&&!d.includes(l)&&d.unshift(l),{unset_label:Gu(a,e.layer==="pin"),full_value:a.full_value,unavailable:a.resolution==="unavailable",disabled:i?.resolution==="not_applicable",options:d.map(f=>{let _=n({...s,[e.key]:f})[e.key];return{value:f,label:_.display,full_value:_.full_value}})}}function Qr(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let r=e.createElement("h2"),n=e.createElement("textarea"),s=e.createElement("div"),o=e.createElement("button"),a=e.createElement("button");return r.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",n.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",n.maxLength=4e3,s.className="resume-instructions-dialog__actions",o.type="button",o.textContent="\uC774\uC5B4\uD558\uAE30",a.type="button",a.textContent="\uCDE8\uC18C",s.append(o,a),t.append(r,n,s),e.body.append(t),new Promise(i=>{let l=!1,d=_=>{l||(l=!0,typeof t.close=="function"&&t.close(),t.remove(),i(_))},f=()=>d(n.value.trim());o.addEventListener("click",f),a.addEventListener("click",()=>d(null)),n.addEventListener("keydown",_=>{_.key==="Enter"&&(_.ctrlKey||_.metaKey)&&(_.preventDefault(),f())}),t.addEventListener("cancel",_=>{_.preventDefault(),d(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),n.focus()})}var el="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function yt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var fr=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],gn=[...fr,"reasoning_output_tokens"],Vu=["implementation","review-consult"];function ko(e){let t=0;for(let r of fr)t+=yt(e?.[r]);return t}function Yu(e){return!e||typeof e!="object"?!1:fr.some(t=>Number.isFinite(e[t]))}function Zi(e){return!e||typeof e!="object"?!1:gn.some(t=>Number.isFinite(e[t]))}function Ku(e){let t={};for(let r of gn)e&&Number.isFinite(e[r])&&(t[r]=e[r]);return t}function Xi(e){let t={};for(let r of gn)Number.isFinite(e[r])&&(t[r]=e[r]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function Qi(e,t){return e==="codex"?yt(t.input_tokens)+yt(t.output_tokens):ko(t)}function Zu(e){return e==="claude"?"Claude":"Codex"}function Xu(e){return`\u03C4 ${tl(e)}`}function Qu(e,t){let r=t.breakdown||{},n=[`\uC785\uB825 ${yt(r.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${yt(r.output_tokens).toLocaleString("en-US")}`];e==="claude"?n.push(`\uCE90\uC2DC\uC77D\uAE30 ${yt(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${yt(r.cache_creation_input_tokens).toLocaleString("en-US")}`):(n.push(`\uCE90\uC2DC\uC77D\uAE30 ${yt(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${yt(r.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(r.reasoning_output_tokens)&&n.push(`\uCD94\uB860\uCD9C\uB825 ${yt(r.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,n.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(el),o.join(`
`)}function wt(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let r of["claude","codex"]){let n=e.providers[r];n&&t.push({provider:r,label:`${Zu(r)} ${Xu(n.subtotal)}${typeof n.total_cost_usd=="number"&&Number.isFinite(n.total_cost_usd)?` \xB7 $${n.total_cost_usd.toFixed(2)}`:""}`,tooltip:Qu(r,n)})}return t}function gs(e){let t={},r={claude:!0,codex:!1},n={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let i=t[o];i||(i={subtotal:0,breakdown:{}},t[o]=i),i.subtotal+=a.subtotal;for(let l of gn)Number.isFinite(a.breakdown[l])&&(i.breakdown[l]=yt(i.breakdown[l])+yt(a.breakdown[l]));a.replayed&&(i.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?n.claude+=a.total_cost_usd:r.claude=!1)}return t.claude&&r.claude&&(t.claude.total_cost_usd=n.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function $o(e){return!e||typeof e!="object"?null:Wt({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function Ju(e){return e==="codex"?"codex":"claude"}function Sr(){return{subtotal:0,breakdown:Ku(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function ms(e,t,r){e.subtotal+=t.subtotal;for(let n of gn)Number.isFinite(t.usage[n])&&(e.breakdown[n]=yt(e.breakdown[n])+yt(t.usage[n]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),r&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function Ji(e,t){let r={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(r.legs=e.legs),e.replayed&&(r.replayed=!0),r}function tl(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Jr(e){return Yu(e)?`\u03C4 ${tl(ko(e))}`:null}function Xt(e){let t=Jr(e);if(!t)return null;let r=e?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${t} \xB7 $${r.toFixed(2)}`:t}function en(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${yt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${yt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${yt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${yt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${ko(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&r.push(el),r.join(`
`)}function Wt(e,t){let r={claude:Sr(),codex:Sr()},n={orchestrator:{claude:Sr(),codex:Sr()},implementation:{claude:Sr(),codex:Sr()},"review-consult":{claude:Sr(),codex:Sr()}},s=new Set;for(let i of Object.values(e||{})){if(!i||i.bead_id!==t)continue;let l=i.usage;if(Zi(l)){let f=Ju(i.runner),_=Xi(l),m={provider:f,role:"orchestrator",attempt_id:String(i.attempt_id||""),usage:_,subtotal:Qi(f,_)};_.replayed===!0&&(m.replayed=!0),typeof i.model=="string"&&(m.model=i.model),typeof i.session_id=="string"&&(m.session_id=i.session_id),ms(r[f],m,!0),ms(n.orchestrator[f],m,!0)}let d=Array.isArray(i.usage_legs)?i.usage_legs:[];for(let f of d){if(!f||f.provider!=="codex"||!Vu.includes(f.role)||!Zi(f.usage))continue;let _=typeof f.receipt_id=="string"&&f.receipt_id.length>0?f.receipt_id:null;if(!_||s.has(_))continue;s.add(_);let m=Xi(f.usage),x={provider:"codex",role:f.role,attempt_id:String(i.attempt_id||""),usage:m,subtotal:Qi("codex",m)};x.receipt_id=_,typeof f.model=="string"&&(x.model=f.model),typeof f.session_id=="string"?x.session_id=f.session_id:typeof f.thread_id=="string"&&(x.session_id=f.thread_id),typeof f.turn_id=="string"&&(x.turn_id=f.turn_id),typeof f.completed_at=="string"&&(x.completed_at=f.completed_at),m.replayed===!0&&(x.replayed=!0),ms(r.codex,x,!1),ms(n[x.role].codex,x,!1)}}let o={};for(let i of["claude","codex"]){let l=r[i];if(l.legs.length===0)continue;let d=Ji(l,!1);i==="claude"&&l.outer_count>0&&l.outer_cost_count===l.outer_count&&(d.total_cost_usd=l.outer_cost),o[i]=d}if(Object.keys(o).length===0)return null;let a={};for(let i of["orchestrator","implementation","review-consult"]){let l={};for(let d of["claude","codex"]){let f=n[i][d];f.legs.length>0&&(l[d]={...Ji(f,!0),legs:f.legs})}Object.keys(l).length>0&&(a[i]=l)}return{providers:o,roles:a}}var{entries:dl,setPrototypeOf:rl,isFrozen:ep,getPrototypeOf:tp,getOwnPropertyDescriptor:rp}=Object,{freeze:Ct,seal:zt,create:Ro}=Object,{apply:Io,construct:Lo}=typeof Reflect<"u"&&Reflect;Ct||(Ct=function(t){return t});zt||(zt=function(t){return t});Io||(Io=function(t,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return t.apply(r,s)});Lo||(Lo=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new t(...n)});var bs=Rt(Array.prototype.forEach),np=Rt(Array.prototype.lastIndexOf),nl=Rt(Array.prototype.pop),bn=Rt(Array.prototype.push),sp=Rt(Array.prototype.splice),vs=Rt(String.prototype.toLowerCase),xo=Rt(String.prototype.toString),So=Rt(String.prototype.match),hn=Rt(String.prototype.replace),op=Rt(String.prototype.indexOf),ap=Rt(String.prototype.trim),Qt=Rt(Object.prototype.hasOwnProperty),Tt=Rt(RegExp.prototype.test),vn=ip(TypeError);function Rt(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return Io(e,t,n)}}function ip(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return Lo(e,r)}}function Ue(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:vs;rl&&rl(e,null);let n=t.length;for(;n--;){let s=t[n];if(typeof s=="string"){let o=r(s);o!==s&&(ep(t)||(t[n]=o),s=o)}e[s]=!0}return e}function lp(e){for(let t=0;t<e.length;t++)Qt(e,t)||(e[t]=null);return e}function _r(e){let t=Ro(null);for(let[r,n]of dl(e))Qt(e,r)&&(Array.isArray(n)?t[r]=lp(n):n&&typeof n=="object"&&n.constructor===Object?t[r]=_r(n):t[r]=n);return t}function yn(e,t){for(;e!==null;){let n=rp(e,t);if(n){if(n.get)return Rt(n.get);if(typeof n.value=="function")return Rt(n.value)}e=tp(e)}function r(){return null}return r}var sl=Ct(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Ao=Ct(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Eo=Ct(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),cp=Ct(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),To=Ct(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),dp=Ct(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),ol=Ct(["#text"]),al=Ct(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Co=Ct(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),il=Ct(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),hs=Ct(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),up=zt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),pp=zt(/<%[\w\W]*|[\w\W]*%>/gm),fp=zt(/\$\{[\w\W]*/gm),_p=zt(/^data-[\-\w.\u00B7-\uFFFF]+$/),mp=zt(/^aria-[\-\w]+$/),ul=zt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),gp=zt(/^(?:\w+script|data):/i),bp=zt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),pl=zt(/^html$/i),hp=zt(/^[a-z][.\w]*(-[.\w]+)+$/i),ll=Object.freeze({__proto__:null,ARIA_ATTR:mp,ATTR_WHITESPACE:bp,CUSTOM_ELEMENT:hp,DATA_ATTR:_p,DOCTYPE_NAME:pl,ERB_EXPR:pp,IS_ALLOWED_URI:ul,IS_SCRIPT_OR_DATA:gp,MUSTACHE_EXPR:up,TMPLIT_EXPR:fp}),wn={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},vp=function(){return typeof window>"u"?null:window},yp=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},cl=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function fl(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:vp(),t=j=>fl(j);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==wn.document||!e.Element)return t.isSupported=!1,t;let{document:r}=e,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:i,Element:l,NodeFilter:d,NamedNodeMap:f=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:_,DOMParser:m,trustedTypes:x}=e,k=l.prototype,M=yn(k,"cloneNode"),D=yn(k,"remove"),E=yn(k,"nextSibling"),B=yn(k,"childNodes"),ee=yn(k,"parentNode");if(typeof a=="function"){let j=r.createElement("template");j.content&&j.content.ownerDocument&&(r=j.content.ownerDocument)}let A,w="",{implementation:R,createNodeIterator:N,createDocumentFragment:Z,getElementsByTagName:fe}=r,{importNode:pe}=n,ne=cl();t.isSupported=typeof dl=="function"&&typeof ee=="function"&&R&&R.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:ie,ERB_EXPR:Me,TMPLIT_EXPR:je,DATA_ATTR:He,ARIA_ATTR:Ze,IS_SCRIPT_OR_DATA:Ve,ATTR_WHITESPACE:Ye,CUSTOM_ELEMENT:me}=ll,{IS_ALLOWED_URI:xe}=ll,ke=null,Le=Ue({},[...sl,...Ao,...Eo,...To,...ol]),he=null,Q=Ue({},[...al,...Co,...il,...hs]),V=Object.seal(Ro(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),$e=null,ge=null,te=Object.seal(Ro(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),U=!0,W=!0,T=!1,H=!0,I=!1,K=!0,de=!1,Y=!1,_e=!1,be=!1,C=!1,q=!1,X=!0,re=!1,ve="user-content-",S=!0,P=!1,ue={},Ee=null,qe=Ue({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Ae=null,Ge=Ue({},["audio","video","img","source","image","track"]),We=null,bt=Ue({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),ot="http://www.w3.org/1998/Math/MathML",at="http://www.w3.org/2000/svg",dt="http://www.w3.org/1999/xhtml",it=dt,ft=!1,z=null,J=Ue({},[ot,at,dt],xo),ye=Ue({},["mi","mo","mn","ms","mtext"]),we=Ue({},["annotation-xml"]),ce=Ue({},["title","style","font","a","script"]),Oe=null,tt=["application/xhtml+xml","text/html"],Xe="text/html",Pe=null,Je=null,Te=r.createElement("form"),ht=function(h){return h instanceof RegExp||h instanceof Function},Pt=function(){let h=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Je&&Je===h)){if((!h||typeof h!="object")&&(h={}),h=_r(h),Oe=tt.indexOf(h.PARSER_MEDIA_TYPE)===-1?Xe:h.PARSER_MEDIA_TYPE,Pe=Oe==="application/xhtml+xml"?xo:vs,ke=Qt(h,"ALLOWED_TAGS")?Ue({},h.ALLOWED_TAGS,Pe):Le,he=Qt(h,"ALLOWED_ATTR")?Ue({},h.ALLOWED_ATTR,Pe):Q,z=Qt(h,"ALLOWED_NAMESPACES")?Ue({},h.ALLOWED_NAMESPACES,xo):J,We=Qt(h,"ADD_URI_SAFE_ATTR")?Ue(_r(bt),h.ADD_URI_SAFE_ATTR,Pe):bt,Ae=Qt(h,"ADD_DATA_URI_TAGS")?Ue(_r(Ge),h.ADD_DATA_URI_TAGS,Pe):Ge,Ee=Qt(h,"FORBID_CONTENTS")?Ue({},h.FORBID_CONTENTS,Pe):qe,$e=Qt(h,"FORBID_TAGS")?Ue({},h.FORBID_TAGS,Pe):_r({}),ge=Qt(h,"FORBID_ATTR")?Ue({},h.FORBID_ATTR,Pe):_r({}),ue=Qt(h,"USE_PROFILES")?h.USE_PROFILES:!1,U=h.ALLOW_ARIA_ATTR!==!1,W=h.ALLOW_DATA_ATTR!==!1,T=h.ALLOW_UNKNOWN_PROTOCOLS||!1,H=h.ALLOW_SELF_CLOSE_IN_ATTR!==!1,I=h.SAFE_FOR_TEMPLATES||!1,K=h.SAFE_FOR_XML!==!1,de=h.WHOLE_DOCUMENT||!1,be=h.RETURN_DOM||!1,C=h.RETURN_DOM_FRAGMENT||!1,q=h.RETURN_TRUSTED_TYPE||!1,_e=h.FORCE_BODY||!1,X=h.SANITIZE_DOM!==!1,re=h.SANITIZE_NAMED_PROPS||!1,S=h.KEEP_CONTENT!==!1,P=h.IN_PLACE||!1,xe=h.ALLOWED_URI_REGEXP||ul,it=h.NAMESPACE||dt,ye=h.MATHML_TEXT_INTEGRATION_POINTS||ye,we=h.HTML_INTEGRATION_POINTS||we,V=h.CUSTOM_ELEMENT_HANDLING||{},h.CUSTOM_ELEMENT_HANDLING&&ht(h.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(V.tagNameCheck=h.CUSTOM_ELEMENT_HANDLING.tagNameCheck),h.CUSTOM_ELEMENT_HANDLING&&ht(h.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(V.attributeNameCheck=h.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),h.CUSTOM_ELEMENT_HANDLING&&typeof h.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(V.allowCustomizedBuiltInElements=h.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),I&&(W=!1),C&&(be=!0),ue&&(ke=Ue({},ol),he=[],ue.html===!0&&(Ue(ke,sl),Ue(he,al)),ue.svg===!0&&(Ue(ke,Ao),Ue(he,Co),Ue(he,hs)),ue.svgFilters===!0&&(Ue(ke,Eo),Ue(he,Co),Ue(he,hs)),ue.mathMl===!0&&(Ue(ke,To),Ue(he,il),Ue(he,hs))),h.ADD_TAGS&&(typeof h.ADD_TAGS=="function"?te.tagCheck=h.ADD_TAGS:(ke===Le&&(ke=_r(ke)),Ue(ke,h.ADD_TAGS,Pe))),h.ADD_ATTR&&(typeof h.ADD_ATTR=="function"?te.attributeCheck=h.ADD_ATTR:(he===Q&&(he=_r(he)),Ue(he,h.ADD_ATTR,Pe))),h.ADD_URI_SAFE_ATTR&&Ue(We,h.ADD_URI_SAFE_ATTR,Pe),h.FORBID_CONTENTS&&(Ee===qe&&(Ee=_r(Ee)),Ue(Ee,h.FORBID_CONTENTS,Pe)),S&&(ke["#text"]=!0),de&&Ue(ke,["html","head","body"]),ke.table&&(Ue(ke,["tbody"]),delete $e.tbody),h.TRUSTED_TYPES_POLICY){if(typeof h.TRUSTED_TYPES_POLICY.createHTML!="function")throw vn('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof h.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw vn('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');A=h.TRUSTED_TYPES_POLICY,w=A.createHTML("")}else A===void 0&&(A=yp(x,s)),A!==null&&typeof w=="string"&&(w=A.createHTML(""));Ct&&Ct(h),Je=h}},Ft=Ue({},[...Ao,...Eo,...cp]),jt=Ue({},[...To,...dp]),yr=function(h){let L=ee(h);(!L||!L.tagName)&&(L={namespaceURI:it,tagName:"template"});let oe=vs(h.tagName),Re=vs(L.tagName);return z[h.namespaceURI]?h.namespaceURI===at?L.namespaceURI===dt?oe==="svg":L.namespaceURI===ot?oe==="svg"&&(Re==="annotation-xml"||ye[Re]):!!Ft[oe]:h.namespaceURI===ot?L.namespaceURI===dt?oe==="math":L.namespaceURI===at?oe==="math"&&we[Re]:!!jt[oe]:h.namespaceURI===dt?L.namespaceURI===at&&!we[Re]||L.namespaceURI===ot&&!ye[Re]?!1:!jt[oe]&&(ce[oe]||!Ft[oe]):!!(Oe==="application/xhtml+xml"&&z[h.namespaceURI]):!1},kt=function(h){bn(t.removed,{element:h});try{ee(h).removeChild(h)}catch{D(h)}},St=function(h,L){try{bn(t.removed,{attribute:L.getAttributeNode(h),from:L})}catch{bn(t.removed,{attribute:null,from:L})}if(L.removeAttribute(h),h==="is")if(be||C)try{kt(L)}catch{}else try{L.setAttribute(h,"")}catch{}},cr=function(h){let L=null,oe=null;if(_e)h="<remove></remove>"+h;else{let Fe=So(h,/^[\r\n\t ]+/);oe=Fe&&Fe[0]}Oe==="application/xhtml+xml"&&it===dt&&(h='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+h+"</body></html>");let Re=A?A.createHTML(h):h;if(it===dt)try{L=new m().parseFromString(Re,Oe)}catch{}if(!L||!L.documentElement){L=R.createDocument(it,"template",null);try{L.documentElement.innerHTML=ft?w:Re}catch{}}let rt=L.body||L.documentElement;return h&&oe&&rt.insertBefore(r.createTextNode(oe),rt.childNodes[0]||null),it===dt?fe.call(L,de?"html":"body")[0]:de?L.documentElement:rt},rr=function(h){return N.call(h.ownerDocument||h,h,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},Ht=function(h){return h instanceof _&&(typeof h.nodeName!="string"||typeof h.textContent!="string"||typeof h.removeChild!="function"||!(h.attributes instanceof f)||typeof h.removeAttribute!="function"||typeof h.setAttribute!="function"||typeof h.namespaceURI!="string"||typeof h.insertBefore!="function"||typeof h.hasChildNodes!="function")},Gt=function(h){return typeof i=="function"&&h instanceof i};function $t(j,h,L){bs(j,oe=>{oe.call(t,h,L,Je)})}let nr=function(h){let L=null;if($t(ne.beforeSanitizeElements,h,null),Ht(h))return kt(h),!0;let oe=Pe(h.nodeName);if($t(ne.uponSanitizeElement,h,{tagName:oe,allowedTags:ke}),K&&h.hasChildNodes()&&!Gt(h.firstElementChild)&&Tt(/<[/\w!]/g,h.innerHTML)&&Tt(/<[/\w!]/g,h.textContent)||h.nodeType===wn.progressingInstruction||K&&h.nodeType===wn.comment&&Tt(/<[/\w]/g,h.data))return kt(h),!0;if(!(te.tagCheck instanceof Function&&te.tagCheck(oe))&&(!ke[oe]||$e[oe])){if(!$e[oe]&&v(oe)&&(V.tagNameCheck instanceof RegExp&&Tt(V.tagNameCheck,oe)||V.tagNameCheck instanceof Function&&V.tagNameCheck(oe)))return!1;if(S&&!Ee[oe]){let Re=ee(h)||h.parentNode,rt=B(h)||h.childNodes;if(rt&&Re){let Fe=rt.length;for(let Qe=Fe-1;Qe>=0;--Qe){let gt=M(rt[Qe],!0);gt.__removalCount=(h.__removalCount||0)+1,Re.insertBefore(gt,E(h))}}}return kt(h),!0}return h instanceof l&&!yr(h)||(oe==="noscript"||oe==="noembed"||oe==="noframes")&&Tt(/<\/no(script|embed|frames)/i,h.innerHTML)?(kt(h),!0):(I&&h.nodeType===wn.text&&(L=h.textContent,bs([ie,Me,je],Re=>{L=hn(L,Re," ")}),h.textContent!==L&&(bn(t.removed,{element:h.cloneNode()}),h.textContent=L)),$t(ne.afterSanitizeElements,h,null),!1)},p=function(h,L,oe){if(X&&(L==="id"||L==="name")&&(oe in r||oe in Te))return!1;if(!(W&&!ge[L]&&Tt(He,L))){if(!(U&&Tt(Ze,L))){if(!(te.attributeCheck instanceof Function&&te.attributeCheck(L,h))){if(!he[L]||ge[L]){if(!(v(h)&&(V.tagNameCheck instanceof RegExp&&Tt(V.tagNameCheck,h)||V.tagNameCheck instanceof Function&&V.tagNameCheck(h))&&(V.attributeNameCheck instanceof RegExp&&Tt(V.attributeNameCheck,L)||V.attributeNameCheck instanceof Function&&V.attributeNameCheck(L,h))||L==="is"&&V.allowCustomizedBuiltInElements&&(V.tagNameCheck instanceof RegExp&&Tt(V.tagNameCheck,oe)||V.tagNameCheck instanceof Function&&V.tagNameCheck(oe))))return!1}else if(!We[L]){if(!Tt(xe,hn(oe,Ye,""))){if(!((L==="src"||L==="xlink:href"||L==="href")&&h!=="script"&&op(oe,"data:")===0&&Ae[h])){if(!(T&&!Tt(Ve,hn(oe,Ye,"")))){if(oe)return!1}}}}}}}return!0},v=function(h){return h!=="annotation-xml"&&So(h,me)},F=function(h){$t(ne.beforeSanitizeAttributes,h,null);let{attributes:L}=h;if(!L||Ht(h))return;let oe={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:he,forceKeepAttr:void 0},Re=L.length;for(;Re--;){let rt=L[Re],{name:Fe,namespaceURI:Qe,value:gt}=rt,b=Pe(Fe),u=gt,$=Fe==="value"?u:ap(u);if(oe.attrName=b,oe.attrValue=$,oe.keepAttr=!0,oe.forceKeepAttr=void 0,$t(ne.uponSanitizeAttribute,h,oe),$=oe.attrValue,re&&(b==="id"||b==="name")&&(St(Fe,h),$=ve+$),K&&Tt(/((--!?|])>)|<\/(style|title|textarea)/i,$)){St(Fe,h);continue}if(b==="attributename"&&So($,"href")){St(Fe,h);continue}if(oe.forceKeepAttr)continue;if(!oe.keepAttr){St(Fe,h);continue}if(!H&&Tt(/\/>/i,$)){St(Fe,h);continue}I&&bs([ie,Me,je],G=>{$=hn($,G," ")});let y=Pe(h.nodeName);if(!p(y,b,$)){St(Fe,h);continue}if(A&&typeof x=="object"&&typeof x.getAttributeType=="function"&&!Qe)switch(x.getAttributeType(y,b)){case"TrustedHTML":{$=A.createHTML($);break}case"TrustedScriptURL":{$=A.createScriptURL($);break}}if($!==u)try{Qe?h.setAttributeNS(Qe,Fe,$):h.setAttribute(Fe,$),Ht(h)?kt(h):nl(t.removed)}catch{St(Fe,h)}}$t(ne.afterSanitizeAttributes,h,null)},se=function j(h){let L=null,oe=rr(h);for($t(ne.beforeSanitizeShadowDOM,h,null);L=oe.nextNode();)$t(ne.uponSanitizeShadowNode,L,null),nr(L),F(L),L.content instanceof o&&j(L.content);$t(ne.afterSanitizeShadowDOM,h,null)};return t.sanitize=function(j){let h=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},L=null,oe=null,Re=null,rt=null;if(ft=!j,ft&&(j="<!-->"),typeof j!="string"&&!Gt(j))if(typeof j.toString=="function"){if(j=j.toString(),typeof j!="string")throw vn("dirty is not a string, aborting")}else throw vn("toString is not a function");if(!t.isSupported)return j;if(Y||Pt(h),t.removed=[],typeof j=="string"&&(P=!1),P){if(j.nodeName){let gt=Pe(j.nodeName);if(!ke[gt]||$e[gt])throw vn("root node is forbidden and cannot be sanitized in-place")}}else if(j instanceof i)L=cr("<!---->"),oe=L.ownerDocument.importNode(j,!0),oe.nodeType===wn.element&&oe.nodeName==="BODY"||oe.nodeName==="HTML"?L=oe:L.appendChild(oe);else{if(!be&&!I&&!de&&j.indexOf("<")===-1)return A&&q?A.createHTML(j):j;if(L=cr(j),!L)return be?null:q?w:""}L&&_e&&kt(L.firstChild);let Fe=rr(P?j:L);for(;Re=Fe.nextNode();)nr(Re),F(Re),Re.content instanceof o&&se(Re.content);if(P)return j;if(be){if(C)for(rt=Z.call(L.ownerDocument);L.firstChild;)rt.appendChild(L.firstChild);else rt=L;return(he.shadowroot||he.shadowrootmode)&&(rt=pe.call(n,rt,!0)),rt}let Qe=de?L.outerHTML:L.innerHTML;return de&&ke["!doctype"]&&L.ownerDocument&&L.ownerDocument.doctype&&L.ownerDocument.doctype.name&&Tt(pl,L.ownerDocument.doctype.name)&&(Qe="<!DOCTYPE "+L.ownerDocument.doctype.name+`>
`+Qe),I&&bs([ie,Me,je],gt=>{Qe=hn(Qe,gt," ")}),A&&q?A.createHTML(Qe):Qe},t.setConfig=function(){let j=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Pt(j),Y=!0},t.clearConfig=function(){Je=null,Y=!1},t.isValidAttribute=function(j,h,L){Je||Pt({});let oe=Pe(j),Re=Pe(h);return p(oe,Re,L)},t.addHook=function(j,h){typeof h=="function"&&bn(ne[j],h)},t.removeHook=function(j,h){if(h!==void 0){let L=np(ne[j],h);return L===-1?void 0:sp(ne[j],L,1)[0]}return nl(ne[j])},t.removeHooks=function(j){ne[j]=[]},t.removeAllHooks=function(){ne=cl()},t}var _l=fl();var mr={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},ys=e=>(...t)=>({_$litDirective$:e,values:t}),tn=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,n){this._$Ct=t,this._$AM=r,this._$Ci=n}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var kn=class extends tn{constructor(t){if(super(t),this.it=ut,t.type!==mr.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===ut||t==null)return this._t=void 0,this.it=t;if(t===Bt)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};kn.directiveName="unsafeHTML",kn.resultType=1;var ml=ys(kn);function Mo(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Fr=Mo();function kl(e){Fr=e}var An={exec:()=>null};function Ke(e,t=""){let r=typeof e=="string"?e:e.source,n={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(It.caret,"$1"),r=r.replace(s,a),n},getRegex:()=>new RegExp(r,t)};return n}var wp=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),It={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},kp=/^(?:[ \t]*(?:\n|$))+/,$p=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,xp=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,En=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Sp=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,No=/(?:[*+-]|\d{1,9}[.)])/,$l=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,xl=Ke($l).replace(/bull/g,No).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Ap=Ke($l).replace(/bull/g,No).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),qo=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Ep=/^[^\n]+/,Fo=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Tp=Ke(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Fo).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Cp=Ke(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,No).getRegex(),As="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",jo=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Rp=Ke("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",jo).replace("tag",As).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Sl=Ke(qo).replace("hr",En).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",As).getRegex(),Ip=Ke(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Sl).getRegex(),Bo={blockquote:Ip,code:$p,def:Tp,fences:xp,heading:Sp,hr:En,html:Rp,lheading:xl,list:Cp,newline:kp,paragraph:Sl,table:An,text:Ep},gl=Ke("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",En).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",As).getRegex(),Lp={...Bo,lheading:Ap,table:gl,paragraph:Ke(qo).replace("hr",En).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",gl).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",As).getRegex()},Op={...Bo,html:Ke(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",jo).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:An,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Ke(qo).replace("hr",En).replace("heading",` *#{1,6} *[^
]`).replace("lheading",xl).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Pp=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Dp=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Al=/^( {2,}|\\)\n(?!\s*$)/,Mp=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Es=/[\p{P}\p{S}]/u,Uo=/[\s\p{P}\p{S}]/u,El=/[^\s\p{P}\p{S}]/u,Np=Ke(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Uo).getRegex(),Tl=/(?!~)[\p{P}\p{S}]/u,qp=/(?!~)[\s\p{P}\p{S}]/u,Fp=/(?:[^\s\p{P}\p{S}]|~)/u,jp=Ke(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",wp?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Cl=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Bp=Ke(Cl,"u").replace(/punct/g,Es).getRegex(),Up=Ke(Cl,"u").replace(/punct/g,Tl).getRegex(),Rl="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Wp=Ke(Rl,"gu").replace(/notPunctSpace/g,El).replace(/punctSpace/g,Uo).replace(/punct/g,Es).getRegex(),zp=Ke(Rl,"gu").replace(/notPunctSpace/g,Fp).replace(/punctSpace/g,qp).replace(/punct/g,Tl).getRegex(),Hp=Ke("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,El).replace(/punctSpace/g,Uo).replace(/punct/g,Es).getRegex(),Gp=Ke(/\\(punct)/,"gu").replace(/punct/g,Es).getRegex(),Vp=Ke(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Yp=Ke(jo).replace("(?:-->|$)","-->").getRegex(),Kp=Ke("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Yp).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),$s=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Zp=Ke(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",$s).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Il=Ke(/^!?\[(label)\]\[(ref)\]/).replace("label",$s).replace("ref",Fo).getRegex(),Ll=Ke(/^!?\[(ref)\](?:\[\])?/).replace("ref",Fo).getRegex(),Xp=Ke("reflink|nolink(?!\\()","g").replace("reflink",Il).replace("nolink",Ll).getRegex(),bl=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Wo={_backpedal:An,anyPunctuation:Gp,autolink:Vp,blockSkip:jp,br:Al,code:Dp,del:An,emStrongLDelim:Bp,emStrongRDelimAst:Wp,emStrongRDelimUnd:Hp,escape:Pp,link:Zp,nolink:Ll,punctuation:Np,reflink:Il,reflinkSearch:Xp,tag:Kp,text:Mp,url:An},Qp={...Wo,link:Ke(/^!?\[(label)\]\((.*?)\)/).replace("label",$s).getRegex(),reflink:Ke(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",$s).getRegex()},Oo={...Wo,emStrongRDelimAst:zp,emStrongLDelim:Up,url:Ke(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",bl).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:Ke(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",bl).getRegex()},Jp={...Oo,br:Ke(Al).replace("{2,}","*").getRegex(),text:Ke(Oo.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},ws={normal:Bo,gfm:Lp,pedantic:Op},$n={normal:Wo,gfm:Oo,breaks:Jp,pedantic:Qp},ef={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},hl=e=>ef[e];function gr(e,t){if(t){if(It.escapeTest.test(e))return e.replace(It.escapeReplace,hl)}else if(It.escapeTestNoEncode.test(e))return e.replace(It.escapeReplaceNoEncode,hl);return e}function vl(e){try{e=encodeURI(e).replace(It.percentDecode,"%")}catch{return null}return e}function yl(e,t){let r=e.replace(It.findPipe,(o,a,i)=>{let l=!1,d=a;for(;--d>=0&&i[d]==="\\";)l=!l;return l?"|":" |"}),n=r.split(It.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(It.slashPipe,"|");return n}function xn(e,t,r){let n=e.length;if(n===0)return"";let s=0;for(;s<n;){let o=e.charAt(n-s-1);if(o===t&&!r)s++;else if(o!==t&&r)s++;else break}return e.slice(0,n-s)}function tf(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return r>0?-2:-1}function wl(e,t,r,n,s){let o=t.href,a=t.title||null,i=e[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let l={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:a,text:i,tokens:n.inlineTokens(i)};return n.state.inLink=!1,l}function rf(e,t,r){let n=e.match(r.other.indentCodeCompensation);if(n===null)return t;let s=n[1];return t.split(`
`).map(o=>{let a=o.match(r.other.beginningSpace);if(a===null)return o;let[i]=a;return i.length>=s.length?o.slice(s.length):o}).join(`
`)}var xs=class{constructor(e){nt(this,"options");nt(this,"rules");nt(this,"lexer");this.options=e||Fr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:xn(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],n=rf(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let n=xn(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:xn(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=xn(t[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let a=!1,i=[],l;for(l=0;l<r.length;l++)if(this.rules.other.blockquoteStart.test(r[l]))i.push(r[l]),a=!0;else if(!a)i.push(r[l]);else break;r=r.slice(l);let d=i.join(`
`),f=d.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${d}`:d,s=s?`${s}
${f}`:f;let _=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(f,o,!0),this.lexer.state.top=_,r.length===0)break;let m=o.at(-1);if(m?.type==="code")break;if(m?.type==="blockquote"){let x=m,k=x.raw+`
`+r.join(`
`),M=this.blockquote(k);o[o.length-1]=M,n=n.substring(0,n.length-x.raw.length)+M.raw,s=s.substring(0,s.length-x.text.length)+M.text;break}else if(m?.type==="list"){let x=m,k=x.raw+`
`+r.join(`
`),M=this.list(k);o[o.length-1]=M,n=n.substring(0,n.length-m.raw.length)+M.raw,s=s.substring(0,s.length-x.raw.length)+M.raw,r=k.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),a=!1;for(;e;){let l=!1,d="",f="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;d=t[0],e=e.substring(d.length);let _=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,M=>" ".repeat(3*M.length)),m=e.split(`
`,1)[0],x=!_.trim(),k=0;if(this.options.pedantic?(k=2,f=_.trimStart()):x?k=t[1].length+1:(k=t[2].search(this.rules.other.nonSpaceChar),k=k>4?1:k,f=_.slice(k),k+=t[1].length),x&&this.rules.other.blankLine.test(m)&&(d+=m+`
`,e=e.substring(m.length+1),l=!0),!l){let M=this.rules.other.nextBulletRegex(k),D=this.rules.other.hrRegex(k),E=this.rules.other.fencesBeginRegex(k),B=this.rules.other.headingBeginRegex(k),ee=this.rules.other.htmlBeginRegex(k);for(;e;){let A=e.split(`
`,1)[0],w;if(m=A,this.options.pedantic?(m=m.replace(this.rules.other.listReplaceNesting,"  "),w=m):w=m.replace(this.rules.other.tabCharGlobal,"    "),E.test(m)||B.test(m)||ee.test(m)||M.test(m)||D.test(m))break;if(w.search(this.rules.other.nonSpaceChar)>=k||!m.trim())f+=`
`+w.slice(k);else{if(x||_.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||E.test(_)||B.test(_)||D.test(_))break;f+=`
`+m}!x&&!m.trim()&&(x=!0),d+=A+`
`,e=e.substring(A.length+1),_=w.slice(k)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(d)&&(a=!0)),s.items.push({type:"list_item",raw:d,task:!!this.options.gfm&&this.rules.other.listIsTask.test(f),loose:!1,text:f,tokens:[]}),s.raw+=d}let i=s.items.at(-1);if(i)i.raw=i.raw.trimEnd(),i.text=i.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let l of s.items){if(this.lexer.state.top=!1,l.tokens=this.lexer.blockTokens(l.text,[]),l.task){if(l.text=l.text.replace(this.rules.other.listReplaceTask,""),l.tokens[0]?.type==="text"||l.tokens[0]?.type==="paragraph"){l.tokens[0].raw=l.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),l.tokens[0].text=l.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let f=this.lexer.inlineQueue.length-1;f>=0;f--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[f].src)){this.lexer.inlineQueue[f].src=this.lexer.inlineQueue[f].src.replace(this.rules.other.listReplaceTask,"");break}}let d=this.rules.other.listTaskCheckbox.exec(l.raw);if(d){let f={type:"checkbox",raw:d[0]+" ",checked:d[0]!=="[ ]"};l.checked=f.checked,s.loose?l.tokens[0]&&["paragraph","text"].includes(l.tokens[0].type)&&"tokens"in l.tokens[0]&&l.tokens[0].tokens?(l.tokens[0].raw=f.raw+l.tokens[0].raw,l.tokens[0].text=f.raw+l.tokens[0].text,l.tokens[0].tokens.unshift(f)):l.tokens.unshift({type:"paragraph",raw:f.raw,text:f.raw,tokens:[f]}):l.tokens.unshift(f)}}if(!s.loose){let d=l.tokens.filter(_=>_.type==="space"),f=d.length>0&&d.some(_=>this.rules.other.anyLine.test(_.raw));s.loose=f}}if(s.loose)for(let l of s.items){l.loose=!0;for(let d of l.tokens)d.type==="text"&&(d.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:n,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=yl(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let a of n)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<r.length;a++)o.header.push({text:r[a],tokens:this.lexer.inline(r[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(yl(a,o.header.length).map((i,l)=>({text:i,tokens:this.lexer.inline(i),header:!1,align:o.align[l]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=xn(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=tf(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let n=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),wl(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return wl(r,s,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,a,i=s,l=0,d=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+s);(n=d.exec(t))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(a=[...o].length,n[3]||n[4]){i+=a;continue}else if((n[5]||n[6])&&s%3&&!((s+a)%3)){l+=a;continue}if(i-=a,i>0)continue;a=Math.min(a,a+i+l);let f=[...n[0]][0].length,_=e.slice(0,s+n.index+f+a);if(Math.min(s,a)%2){let x=_.slice(1,-1);return{type:"em",raw:_,text:x,tokens:this.lexer.inlineTokens(x)}}let m=_.slice(2,-2);return{type:"strong",raw:_,text:m,tokens:this.lexer.inlineTokens(m)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,n;return t[2]==="@"?(r=t[1],n="mailto:"+r):(r=t[1],n=r),{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,n;if(t[2]==="@")r=t[0],n="mailto:"+r;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);r=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},Jt=class Po{constructor(t){nt(this,"tokens");nt(this,"options");nt(this,"state");nt(this,"inlineQueue");nt(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Fr,this.options.tokenizer=this.options.tokenizer||new xs,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:It,block:ws.normal,inline:$n.normal};this.options.pedantic?(r.block=ws.pedantic,r.inline=$n.pedantic):this.options.gfm&&(r.block=ws.gfm,this.options.breaks?r.inline=$n.breaks:r.inline=$n.gfm),this.tokenizer.rules=r}static get rules(){return{block:ws,inline:$n}}static lex(t,r){return new Po(r).lex(t)}static lexInline(t,r){return new Po(r).inlineTokens(t)}lex(t){t=t.replace(It.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,r=[],n=!1){for(this.options.pedantic&&(t=t.replace(It.tabCharGlobal,"    ").replace(It.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,r))?(t=t.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=r.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
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
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,r}inline(t,r=[]){return this.inlineQueue.push({src:t,tokens:r}),r}inlineTokens(t,r=[]){let n=t,s=null;if(this.tokens.links){let l=Object.keys(this.tokens.links);if(l.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)l.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let a=!1,i="";for(;t;){a||(i=""),a=!1;let l;if(this.options.extensions?.inline?.some(f=>(l=f.call({lexer:this},t,r))?(t=t.substring(l.raw.length),r.push(l),!0):!1))continue;if(l=this.tokenizer.escape(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.tag(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.link(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(l.raw.length);let f=r.at(-1);l.type==="text"&&f?.type==="text"?(f.raw+=l.raw,f.text+=l.text):r.push(l);continue}if(l=this.tokenizer.emStrong(t,n,i)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.codespan(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.br(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.del(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.autolink(t)){t=t.substring(l.raw.length),r.push(l);continue}if(!this.state.inLink&&(l=this.tokenizer.url(t))){t=t.substring(l.raw.length),r.push(l);continue}let d=t;if(this.options.extensions?.startInline){let f=1/0,_=t.slice(1),m;this.options.extensions.startInline.forEach(x=>{m=x.call({lexer:this},_),typeof m=="number"&&m>=0&&(f=Math.min(f,m))}),f<1/0&&f>=0&&(d=t.substring(0,f+1))}if(l=this.tokenizer.inlineText(d)){t=t.substring(l.raw.length),l.raw.slice(-1)!=="_"&&(i=l.raw.slice(-1)),a=!0;let f=r.at(-1);f?.type==="text"?(f.raw+=l.raw,f.text+=l.text):r.push(l);continue}if(t){let f="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(f);break}else throw new Error(f)}}return r}},Ss=class{constructor(e){nt(this,"options");nt(this,"parser");this.options=e||Fr}space(e){return""}code({text:e,lang:t,escaped:r}){let n=(t||"").match(It.notSpaceStart)?.[0],s=e.replace(It.endingNewline,"")+`
`;return n?'<pre><code class="language-'+gr(n)+'">'+(r?s:gr(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:gr(s,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${gr(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let n=this.parser.parseInline(r),s=vl(e);if(s===null)return n;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+gr(t)+'"'),o+=">"+n+"</a>",o}image({href:e,title:t,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=vl(e);if(s===null)return gr(r);e=s;let o=`<img src="${e}" alt="${r}"`;return t&&(o+=` title="${gr(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:gr(e.text)}},zo=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},er=class Do{constructor(t){nt(this,"options");nt(this,"renderer");nt(this,"textRenderer");this.options=t||Fr,this.options.renderer=this.options.renderer||new Ss,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new zo}static parse(t,r){return new Do(r).parse(t)}static parseInline(t,r){return new Do(r).parseInline(t)}parse(t){let r="";for(let n=0;n<t.length;n++){let s=t[n];if(this.options.extensions?.renderers?.[s.type]){let a=s,i=this.options.extensions.renderers[a.type].call({parser:this},a);if(i!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){r+=i||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}parseInline(t,r=this.renderer){let n="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let i=this.options.extensions.renderers[o.type].call({parser:this},o);if(i!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=i||"";continue}}let a=o;switch(a.type){case"escape":{n+=r.text(a);break}case"html":{n+=r.html(a);break}case"link":{n+=r.link(a);break}case"image":{n+=r.image(a);break}case"checkbox":{n+=r.checkbox(a);break}case"strong":{n+=r.strong(a);break}case"em":{n+=r.em(a);break}case"codespan":{n+=r.codespan(a);break}case"br":{n+=r.br(a);break}case"del":{n+=r.del(a);break}case"text":{n+=r.text(a);break}default:{let i='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return n}},ks,Sn=(ks=class{constructor(e){nt(this,"options");nt(this,"block");this.options=e||Fr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Jt.lex:Jt.lexInline}provideParser(){return this.block?er.parse:er.parseInline}},nt(ks,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),nt(ks,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),ks),nf=class{constructor(...e){nt(this,"defaults",Mo());nt(this,"options",this.setOptions);nt(this,"parse",this.parseMarkdown(!0));nt(this,"parseInline",this.parseMarkdown(!1));nt(this,"Parser",er);nt(this,"Renderer",Ss);nt(this,"TextRenderer",zo);nt(this,"Lexer",Jt);nt(this,"Tokenizer",xs);nt(this,"Hooks",Sn);this.use(...e)}walkTokens(e,t){let r=[];for(let n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)r=r.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,t));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);r=r.concat(this.walkTokens(a,t))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let i=s.renderer.apply(this,a);return i===!1&&(i=o.apply(this,a)),i}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),n.extensions=t),r.renderer){let s=this.defaults.renderer||new Ss(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,i=r.renderer[a],l=s[a];s[a]=(...d)=>{let f=i.apply(s,d);return f===!1&&(f=l.apply(s,d)),f||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new xs(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,i=r.tokenizer[a],l=s[a];s[a]=(...d)=>{let f=i.apply(s,d);return f===!1&&(f=l.apply(s,d)),f}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new Sn;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,i=r.hooks[a],l=s[a];Sn.passThroughHooks.has(o)?s[a]=d=>{if(this.defaults.async&&Sn.passThroughHooksRespectAsync.has(o))return(async()=>{let _=await i.call(s,d);return l.call(s,_)})();let f=i.call(s,d);return l.call(s,f)}:s[a]=(...d)=>{if(this.defaults.async)return(async()=>{let _=await i.apply(s,d);return _===!1&&(_=await l.apply(s,d)),_})();let f=i.apply(s,d);return f===!1&&(f=l.apply(s,d)),f}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(a){let i=[];return i.push(o.call(this,a)),s&&(i=i.concat(s.call(this,a))),i}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Jt.lex(e,t??this.defaults)}parser(e,t){return er.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,i=await(s.hooks?await s.hooks.provideLexer():e?Jt.lex:Jt.lexInline)(a,s),l=s.hooks?await s.hooks.processAllTokens(i):i;s.walkTokens&&await Promise.all(this.walkTokens(l,s.walkTokens));let d=await(s.hooks?await s.hooks.provideParser():e?er.parse:er.parseInline)(l,s);return s.hooks?await s.hooks.postprocess(d):d})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?Jt.lex:Jt.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let i=(s.hooks?s.hooks.provideParser():e?er.parse:er.parseInline)(a,s);return s.hooks&&(i=s.hooks.postprocess(i)),i}catch(a){return o(a)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+gr(r.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(r);throw r}}},qr=new nf;function et(e,t){return qr.parse(e,t)}et.options=et.setOptions=function(e){return qr.setOptions(e),et.defaults=qr.defaults,kl(et.defaults),et};et.getDefaults=Mo;et.defaults=Fr;et.use=function(...e){return qr.use(...e),et.defaults=qr.defaults,kl(et.defaults),et};et.walkTokens=function(e,t){return qr.walkTokens(e,t)};et.parseInline=qr.parseInline;et.Parser=er;et.parser=er.parse;et.Renderer=Ss;et.TextRenderer=zo;et.Lexer=Jt;et.lexer=Jt.lex;et.Tokenizer=xs;et.Hooks=Sn;et.parse=et;var mb=et.options,gb=et.setOptions,bb=et.use,hb=et.walkTokens,vb=et.parseInline;var yb=er.parse,wb=Jt.lex;function Ar(e){let t=et.parse(e),r=_l.sanitize(t);return ml(r)}function br(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function rn(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Ts(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())} ${r(t.getHours())}:${r(t.getMinutes())}`}var sf={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},of={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},af=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,lf=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function ar(e){return!!e&&typeof e=="object"}function Ho(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function Ol(e,t){let r=Ho(e),n=Ho(t),s=new Map;for(let i of r)s.set(i,(s.get(i)||0)+1);let o=0;for(let i of n){let l=s.get(i)||0;l>0?s.set(i,l-1):o+=1}let a=0;for(let i of s.values())a+=i;return{added:o,removed:a}}function cf(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>ar(s)&&typeof s.text=="string"?s.text:"").join(""):ar(e)&&typeof e.text=="string"&&(t=e.text);let n=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function df(e){let t=String(e.name||""),r=e.input||{},n={kind:"tool",tool:t,icon:sf[t]||"\u{1F527}",input:r,expandable:!0};if((t==="Read"||t==="Write")&&(n.path=String(r.file_path||r.path||"")),t==="Write"&&(n.added=Ho(r.content).length),t==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=Ol(r.old_string,r.new_string);n.added=s,n.removed=o}if(t==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,a=Array.isArray(r.edits)?r.edits:[];for(let i of a){let l=Ol(ar(i)?i.old_string:"",ar(i)?i.new_string:"");s+=l.added,o+=l.removed}n.added=s,n.removed=o}return t==="Bash"&&(n.command=String(r.command||"")),(t==="Grep"||t==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function Go(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function Vo(e){let t=e.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=af.exec(t);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:t.trim()}:lf.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function uf(e,t){if(e.type==="assistant"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(ar(o)){if(o.type==="text"&&typeof o.text=="string")s.push(Vo(o.text));else if(o.type==="thinking"){let a=Go(o.thinking);a&&s.push(a)}else if(o.type==="tool_use"){let a=df(o);typeof o.id=="string"&&t.set(o.id,a),s.push(a)}}return s}if(e.type==="user"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(ar(s)&&s.type==="tool_result"){let o=t.get(String(s.tool_use_id));if(o){let a=cf(s.content);o.result=a,o.output=typeof s.content=="string"?s.content:a}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success";return[{kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""}]}return[]}function pf(e){if(e.type==="item.completed"&&ar(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[Vo(t.text)];if(t.type==="reasoning"){let r=Go(t.text);return r?[r]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function ff(e){if(e.schema!=="codex-delegation-monitor-v1"||!ar(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&ar(t.item)){let r=t.item;if(typeof r.id!="string"||r.id.length===0)return[];if(t.type==="item.completed"&&r.kind==="agent_message"&&typeof r.text=="string"&&r.text.trim().length>0)return[Vo(r.text)];if(t.type==="item.completed"&&r.kind==="reasoning"){let i=Go(r.text);return i?[i]:[]}if(r.kind!=="activity"||typeof r.activity!="string")return[];let n=of[r.activity];if(!n)return[];let s="\uC2DC\uC791",o="\u2026",a={kind:"tool",tool:"",icon:o,expandable:!1};if(t.type==="item.completed"){if(r.status==="completed")s="\uC644\uB8CC",o="\u2713";else if(r.status==="failed")s="\uC2E4\uD328",o="\u2717";else return[];a.result=""}return a.tool=`${n} \xB7 ${s}`,a.icon=o,[a]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function _f(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Pl(e){let t=[],r=new Map,n=Array.isArray(e)?e:[];for(let s of n){let o=s;if(typeof s=="string"){let i=s.trim();if(i.length===0)continue;try{o=JSON.parse(i)}catch{continue}}if(!ar(o))continue;let a=o.schema==="codex-delegation-monitor-v1"?ff(o):_f(o)?pf(o):uf(o,r);for(let i of a)t.push(i)}return t}var mf=5,gf=10,bf=/Task\s+#(\d+)/,hf=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,vf=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function Cs(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function yf(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function wf(e){for(let t=e.length-1;t>=0;t-=1){let r=e[t];if(r.kind==="phase"||r.kind==="gate")return r.text||null}return null}function kf(e){let t=new Map,r=0;for(let s of e){if(s.kind!=="tool")continue;r+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let l=bf.exec(s.output||s.result||""),d=String(o.activeForm||o.subject||"").trim();if(!l||d.length===0)continue;t.set(l[1],{label:d,active:o.status==="in_progress"?r:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let i=o.activeForm||o.subject;typeof i=="string"&&i.trim().length>0&&(a.label=i.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?r:0)}let n=null;for(let s of t.values())s.active>0&&(!n||s.active>n.active)&&(n=s);return n?n.label:null}function $f(e){if(e.tool==="Bash"){let t=e.command||"";return hf.test(t)?"~ PR/\uAC8C\uC2DC \uC911":vf.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function xf(e){let t=e.filter(s=>s.kind==="tool").slice(-gf),r=new Map;t.forEach((s,o)=>{let a=$f(s);if(!a)return;let i=r.get(a)||{count:0,last:-1};i.count+=1,i.last=o,r.set(a,i)});let n=null;for(let[s,o]of r)(!n||o.count>n.count||o.count===n.count&&o.last>n.last)&&(n={label:s,count:o.count,last:o.last});return n?n.label:null}function Sf(e){let t=wf(e);if(t)return{text:t,guess:!1};let r=kf(e);if(r)return{text:r,guess:!1};let n=xf(e);return n?{text:n,guess:!0}:null}function Af(e,t){if(typeof e!="number")return"";let r=Math.max(0,Math.floor((t-e)/1e3));return r<60?`${r}\uCD08 \uC804`:Mt(e,t)}function Rs(e,t={}){let{transport:r,sessionLogStore:n,onClose:s}=t,o=null,a=null,i=null,l={},d=!0,f=new Set,_=new Set,m=null,x=null,k=!1,M=!1,D=!1,E=null,B=null;function ee(){k=!1,M=!1,D=!1,E=null,B=null}async function A(U){if(r){M=!0,D=!1,xe();try{let W=await Promise.resolve(r("get-attempt-prompt",{attempt_id:U}));if(o!==U)return;!W||typeof W!="object"||Array.isArray(W)?D=!0:(E=W,B=U)}catch{o===U&&(D=!0)}finally{o===U&&(M=!1,xe())}}}function w(){if(k=!k,k&&o&&B!==o){A(o);return}xe()}function R(){if(!k)return"";let U=rn({loading:M,error:D});if(U)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${U}
      </div>`;if(!E)return"";if(E.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let W=Ts(E.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${W?c`<div class="prompt-block__meta">${W} 발송</div>`:""}
      ${typeof E.task_prompt=="string"?br("\uACFC\uC5C5 (user)",E.task_prompt):""}
      ${typeof E.system_prompt=="string"?br("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",E.system_prompt):""}
    </div>`}function N(){if(!i||!n)return[];let U=n.get(i);return Pl(U?U.lines:[])}function Z(){if(!i||!n)return null;let U=n.get(i),W=U?U.last_event_at:null;return typeof W=="number"?W:null}function fe(){return l.status==="running"}function pe(){if(fe()&&o){x||(x=setInterval(()=>xe(),1e3));return}ne()}function ne(){x&&(clearInterval(x),x=null)}function ie(U){let W=[],T=0;for(;T<U.length;){let H=U[T];if(H.kind==="tool"){let I=T;for(;I<U.length&&U[I].kind==="tool"&&U[I].tool===H.tool;)I+=1;if(I-T>=mf&&!_.has(T)){W.push({kind:"group",idx:T,tool:H.tool||"",lines:U.slice(T,I).map((K,de)=>({idx:T+de,line:K}))}),T=I;continue}}W.push({kind:"line",idx:T,line:H}),T+=1}return W}function Me(U){for(let W=U.length-1;W>=0;W-=1){let T=U[W];if(T.kind==="result"||T.kind==="error")return null;if(T.kind==="tool"&&!Object.hasOwn(T,"result"))return T}return null}function je(U){for(let W=U.length-1;W>=0;W-=1)if(U[W].kind==="thinking")return U[W];return null}function He(U,W){if(W.kind==="gate")return c`<div class="sv__gate">${W.text}</div>`;if(W.kind==="phase")return c`<div class="sv__phase">${W.text}</div>`;if(W.kind==="result")return c`<div
        class="sv__result${W.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${W.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${Ar(W.text||(W.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(W.kind==="thinking"){let T=f.has(U);return c`<div
        class="sv__think${T?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Le(U)}
      >
        <span class="sv__think-line">💭 ${Cs(W.text)}</span>
        ${T?c`<pre class="sv__think-expand">${W.text}</pre>`:""}
      </div>`}if(W.kind==="error")return c`<div class="sv__error">⛔ ${W.text}</div>`;if(W.kind==="blocker")return c`<div class="sv__error">⛔ ${W.text}</div>`;if(W.kind==="tool"){let T=f.has(U),H=W.tool==="Bash"?yf(W.command):0,I=W.tool==="Bash"?H>1?Cs(W.command):W.command:W.path||W.command||"";return c`<div
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
      </div>`}return c`<div class="sv__as">${Ar(W.text||"")}</div>`}function Ze(U){let W=[];if(U.tool==="Bash"&&typeof U.command=="string"&&U.command.length>0)W.push(U.command);else if(U.input!==void 0)try{W.push(`input: ${JSON.stringify(U.input,null,2)}`)}catch{}return typeof U.output=="string"&&U.output.length>0&&W.push(`output:
${U.output}`),W.join(`

`)}function Ve(){if(!o)return c``;let U=N(),W=(a?[l.model]:[l.runner,l.model,l.effort]).filter(Boolean).join(" \xB7 "),T=l.session_id||"",H=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${d?"ON":"OFF"}`,I=fe(),K=I?Af(Z(),Date.now()):"",de=I?Me(U):null,Y=I?je(U):null,_e=Sf(U);return c`<div class="sv" data-attempt-id=${o}>
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
                    >${de.tool==="Bash"?Cs(de.command):de.path||de.command||""}</span
                  >`:""}
            ${Y?c`<span class="sv__now-think"
                  >💭 ${Cs(Y.text)}</span
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
    </div>`}function me(U){_.add(U),xe()}function xe(){Be(Ve(),e),pe(),d&&ke()}function ke(){let U=e.querySelector(".sv__body");U&&(U.scrollTop=U.scrollHeight)}function Le(U){f.has(U)?f.delete(U):f.add(U),xe()}function he(){d=!d,xe()}function Q(U){ur(U).then(W=>{W?le("\uBCF5\uC0AC\uB428","success",1200):le("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function V(U){!o||!U||(l={...l,...U},xe())}function $e(U){let W=U.target;if(!W||!W.classList||!W.classList.contains("sv__body"))return;!(W.scrollHeight-W.scrollTop-W.clientHeight<=4)&&d&&(d=!1,xe())}e.addEventListener("scroll",$e,!0);function ge(U){let W=U&&U.attempt_id;if(!W)return;let T=i;o=W,a=typeof U.launch_id=="string"&&U.launch_id.length>0?U.launch_id:null,i=a?`session-log:${o}:${a}`:`session-log:${o}`,r&&T&&T!==i&&Promise.resolve(r("unsubscribe-session-log",{id:T})).catch(()=>{}),l=U.meta||{},d=!0,f.clear(),_.clear(),ee(),!m&&n&&(m=n.subscribe(xe)),r&&Promise.resolve(r("subscribe-session-log",{id:i,attempt_id:o,...a?{launch_id:a}:{}})).catch(()=>{}),xe()}function te(){let U=i;o=null,a=null,i=null,f.clear(),_.clear(),ee(),ne(),r&&U&&Promise.resolve(r("unsubscribe-session-log",{id:U})).catch(()=>{}),Be(c``,e),s&&s()}return{open:ge,updateMeta:V,close:te,isOpen(){return o!==null},destroy(){ne(),m&&(m(),m=null),e.removeEventListener("scroll",$e,!0),o=null,a=null,i=null,Be(c``,e)}}}function Tn(e){let t=e&&typeof e=="object"?e:{},r=t.metadata&&typeof t.metadata=="object"?t.metadata:{},n=Dl(t.spec_id),s=Dl(r.spec_id);return n?{path:n,source:"native",conflict:s.length>0&&s!==n}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function Dl(e){return typeof e=="string"?e.trim():""}function Ef(e){return["plan_review","plan_approval","plan_check"].some(t=>{let r=e[t];return typeof r=="string"&&r.trim().length>0})}function Tf(e){let t=e&&e.metadata||{},r=Tn(e),n=[];return r.path&&n.push({kind:"spec",path:r.path,missing_state:null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&n.push({kind:"plan",path:t.plan_path.trim(),missing_state:Ef(t)?null:"plan_pending"}),n}function Ml(e,t){let r=Tf(e);return c`
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
  `}var Cf="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",Rf=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,If=/^\*\*결론\*\* — (.+)$/;function Is(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==Cf)return null;let r=Rf.exec(t[1]||"");if(!r)return null;let n=r[1].split(" ")[0],s=r[2],o=r[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let i=a<t.length?If.exec(t[a]):null,l=i?i[1].replace(/\s+/g," ").trim():"",d=i?a+1:a;return{lane:n,identifier:s,timestamp:o,conclusion:l,body:t.slice(d).join(`
`).trim()}}var Nl=20;function ql(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let r=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${r}-${n} ${s}:${o}`}function Lf(e){return e.length>Nl?`${e.slice(0,Nl)}\u2026`:e}function Of(e,t,r,n){let s=`${t.lane} ${Lf(t.identifier)}`;return c`<div class="detail-report">
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
        <span class="detail-report__time">${ql(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${n&&t.body.length>0?c`<div class="detail-report__body">
          ${Ar(t.body)}
        </div>`:""}
  </div>`}function Pf(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${ql(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${Ar(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function Fl(e,t={},r={}){let n=Array.isArray(e)?e.filter(Boolean):[],s=r.expanded||new Set,o=typeof r.draft=="string"?r.draft:"",a=r.sending===!0,i=n.slice().sort((l,d)=>String(d.created_at||"").localeCompare(String(l.created_at||"")));return c`
    <div class="detail-section-label">댓글 (${n.length})</div>
    ${r.error?c`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:i.length===0?c`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:c`<div class="detail-comments" data-seam="comments">
            ${i.map(l=>{let d=Is(typeof l.text=="string"?l.text:"");return d?Of(l,d,t,s.has(l.id)):Pf(l)})}
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
  `}var{I:eh}=li;var jl=e=>e.strings===void 0;var Df={},Bl=(e,t=Df)=>e._$AH=t;var jr=ys(class extends tn{constructor(e){if(super(e),e.type!==mr.PROPERTY&&e.type!==mr.ATTRIBUTE&&e.type!==mr.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!jl(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===Bt||t===ut)return t;let r=e.element,n=e.name;if(e.type===mr.PROPERTY){if(t===r[n])return Bt}else if(e.type===mr.BOOLEAN_ATTRIBUTE){if(!!t===r.hasAttribute(n))return Bt}else if(e.type===mr.ATTRIBUTE&&r.getAttribute(n)===t+"")return Bt;return Bl(e),t}});var Yo=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],Ls=["orchestration_model","orchestration_effort","orchestration_speed"],Ul=["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],Os=["delegated","main"],Ps=["inherit","claude","codex"],Cn=["default","fast"],Rn=["standard","fast_track"],In=["codex","opus","fable","self","skip"],Ds=["codex","fable","skip"],Ms=["low","medium","high","xhigh"],ir="auto";function hr(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Wl(e){if(!hr(e)||!hr(e.runners))return[];let t=[];for(let[r,n]of Object.entries(e.runners))hr(n)&&hr(n.models)&&t.push([r,Object.keys(n.models)]);return t}function zl(e){return e?.impl_dispatch==="main"}function Ns(e,t){let r=Wl(e),n=t&&t!=="inherit"?r.filter(([s])=>s===t):r;return[ir,...n.flatMap(([,s])=>s)]}function nn(e,t,r){if(!hr(e)||!hr(e.runners))return[ir];let n=[];for(let[s,o]of Object.entries(e.runners))if(!(!hr(o)||!hr(o.models))&&!(t&&t!=="inherit"&&s!==t))for(let[a,i]of Object.entries(o.models)){if(r&&r!==ir&&a!==r)continue;let l=hr(i)?i.efforts:null;if(Array.isArray(l))for(let d of l)typeof d=="string"&&!n.includes(d)&&n.push(d)}return[ir,...n]}function qs(e,t){let r=Wl(e);return(t?r.filter(([s])=>s===t):r).flatMap(([,s])=>s)}function Ko(e,t,r,n,s){return _s({key:e,choices:t,layer:"global",global:r,execution_defaults:n,runner_catalog:s})}function Hl(e,t){let r={};for(let n of Yo){let s=e?.[n],o=t?.[n];s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}function Gl(e,t){let r={};for(let n of Ls){let s=e?.[n]??null,o=t?.[n]??null;s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}var Zo=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Ls]}],Xo={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},Vl={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function Qo(e,t,r,n,s,o=null){let a=Xr({pin:t,global:r,execution_defaults:n,runner_catalog:s,controller_runtime:o});return e.map(i=>({key:i,...a[i]}))}function Yl(e,t,r,n,s,o=null){let a={pin:0,global:0,base:0};for(let i of Qo(e,t,r,n,s,o))a[i.source]+=1;return a}function Kl(e,t,r){return{id:e,key:t,value:typeof r=="string"?r:""}}function Zl(e,t,r){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:r}}var uh=[...Yo,...Ls];var Mf=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review"},{id:"impl",label:"\uAD6C\uD604",receipt:null},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review"},{id:"pr",label:"PR",receipt:null}],Nf={pin:"pin",global:"global",base:"base"};function qf(e){return c`<span
    class=${`detail-layer-rail detail-layer-rail--${Nf[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function Ff(e,t,r){switch(e){case"workflow_mode":return Rn;case"spec_review_model":case"impl_review_model":return In;case"plan_review_model":return Ds;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return Ms;case"impl_dispatch":return Os;case"impl_runtime":return Ps;case"impl_model":return Ns(r,t.impl_runtime);case"impl_effort":return nn(r,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return Cn;case"orchestration_model":return qs(r,null);case"orchestration_effort":return nn(r,void 0,t.orchestration_model||ir).filter(n=>n!==ir);default:return[]}}function jf(e,t){return c`<div class="detail-effective__row" data-key=${e.key}>
    ${qf(e.source)}
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
      >${Vl[e.source]}</span
    >
    ${t.expanded?c`<select
          class="detail-effective__edit"
          data-edit-key=${e.key}
          aria-label=${`${Xo[e.key]||e.key} \uD3B8\uC9D1`}
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
          ${t.options.map(r=>c`<option
                value=${r.value}
                title=${r.full_value||""}
                ?selected=${e.source==="pin"&&e.value===r.value}
              >
                ${r.label}
              </option>`)}
        </select>`:""}
  </div>`}function Xl(e,t){let r=Zo.flatMap(l=>l.keys),n=Qo(r,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=Yl(r,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Object.fromEntries(n.map(l=>[l.key,l])),a=Object.fromEntries(n.filter(l=>l.value!==null).map(l=>[l.key,l.value])),i=n.filter(l=>l.full_value&&l.display!==l.full_value).map(l=>l.full_value).join(" \xB7 ");return c`<details
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
        >${Bf(o)}</span
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
              ${n.filter(d=>l.keys.includes(d.key)).map(d=>{let f=_s({key:d.key,choices:Ff(d.key,a,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,controller_runtime:e.controller_runtime||null});return jf(d,{expanded:e.expanded,options:f.options,default_label:f.unset_label,default_full_value:f.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="구현 프리셋"
              .value=${jr(e.preset_id)}
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
  </details>`}function Bf(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let r=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${r}`)}for(let r of["impl_model","impl_effort","impl_speed"])e[r]?.resolution!=="not_applicable"&&t.push(e[r]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function Ql(e){let t=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},n=r.stages||{},s=r.route||t.route||null,o=typeof t.pr_url=="string"?t.pr_url:"",a=typeof t.exec_receipt=="string"?t.exec_receipt:"",i=us(r.planned_execution,r.exec_receipt);return c`<section class="detail-summary" data-seam="detail-summary">
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
      ${Mf.map(l=>{let d=l.receipt&&typeof t[l.receipt]=="string"?String(t[l.receipt]):"",f=n[l.id],_=d.length>0||f?.fill==="full",m=!_&&f?.fill==="dim",x=f?.stale===!0;return c`<span
          class=${`detail-summary__gate${_?" detail-summary__gate--on":""}${m?" detail-summary__gate--current":""}${x?" detail-summary__gate--stale":""}`}
          data-gate=${l.id}
        >
          <span class="detail-summary__gate-pill">${l.label}</span>
          ${d?c`<span class="detail-summary__gate-sha"
                >${d.split("@")[1]?.slice(0,7)||""}</span
              >`:""}
        </span>`})}
    </div>
  </section>`}var Jl=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function Ln(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Fs(e){if(!Ln(e)||!Ln(e.runners))return null;let t=Object.entries(e.runners).filter(([,r])=>Ln(r)&&Ln(r.models));return t.length>0?t:null}function Jo(e,t){let r=Fs(e);if(!r||!t)return null;for(let[n,s]of r)if(Object.hasOwn(s.models,t))return n;return null}function ec(e,t){return Ln(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function tc(e,t){let r=Fs(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return ec(n,n.models[t]);return[]}function Uf(e){let t=Fs(e);if(!t)return[];let r=[];for(let[,n]of t)for(let s of Object.values(n.models))for(let o of ec(n,s))r.includes(o)||r.push(o);return r}function Wf(e,t){if(!t)return Uf(e);let n=Fs(e)?.find(([o])=>o===t)?.[1];if(!n)return[];let s=[];for(let o of Object.keys(n.models))for(let a of tc(e,o))s.includes(a)||s.push(a);return s}function rc(e,t,r){let n={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=n.impl_runtime==="inherit"?r:n.impl_runtime==="claude"||n.impl_runtime==="codex"?n.impl_runtime:null;if(n.impl_runtime==="inherit"&&!s)return n.impl_model="",n.impl_effort="",n;let o=Jo(t,n.impl_model);if(n.impl_model&&(!s||o!==s))return n.impl_model="",n.impl_effort="",n;let a=n.impl_model?tc(t,n.impl_model):Wf(t,s);return n.impl_effort&&a.length>0&&!a.includes(n.impl_effort)&&(n.impl_effort=""),n}function zf(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function nc(e,t){let r=t.getWorkspacePath,n=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",i="";function l(k){k.key==="Escape"&&s&&(k.preventDefault(),m())}document.addEventListener("keydown",l);function d(){return s?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>m()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${zf(s)}</span
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
            ${o==="loading"?c`<div class="mv__status">불러오는 중…</div>`:o==="pending"?c`<div class="mv__status">${i}</div>`:o==="error"?c`<div class="mv__status mv__status--error">
                      ${i||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:Ar(a)}
          </div>
        </div>
      </div>
    `:c``}function f(){Be(d(),e)}async function _(k,M={}){s=k,o="loading",a="",i="",f();let D=r?r():"";if(!D){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",f();return}if(!n){o="error",i="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",f();return}let E="/api/doc?workspace="+encodeURIComponent(D)+"&path="+encodeURIComponent(k);try{let B=await n(E),ee=await B.json().catch(()=>({}));if(!B.ok||!ee||ee.ok!==!0){if(ee?.error==="not_found"&&M.missing_state==="plan_pending"){o="pending",i="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",f();return}o="error",i="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(ee&&ee.error||B.status)+")",f();return}a=String(ee.content||""),o="ready",f()}catch{o="error",i="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",f()}}function m(){s=null,Be(c``,e)}function x(){document.removeEventListener("keydown",l),m()}return{open:_,close:m,destroy:x}}var Hf=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],oc="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",js=["implementation","review-consult"],Gf=["running","done","failed","interrupted"],Vf={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function Yf(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function Kf(e){let t=wt(e);if(t.length>0)return t.map(s=>c`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let r=Jr(e);if(!r||!e)return"";let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${r.replace(/^τ /,"\u03C4 \uCD1D ")}${n}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${oc}
          >부분 집계</span
        >`:""}`}function sc(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function ea(e){if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?ta(t):""}function Zf(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e;return typeof t.launch_id!="string"||t.launch_id.length===0||t.provider!=="codex"||!js.includes(t.role)||typeof t.model!="string"||t.model.length===0||typeof t.session_id!="string"||t.session_id.length===0||!Gf.includes(t.status)||typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))||!(t.turn_id===null||typeof t.turn_id=="string")?null:t}function Xf(e,t){let n=wt({providers:{codex:{subtotal:t.subtotal,breakdown:t.usage,...t.replayed?{replayed:!0}:{}}},roles:{}})[0];return c`<div class="detail-session__leg detail-session__usage-detail">
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
    ${ea(t.completed_at)?c`<span class="detail-session__leg-time detail-session__time"
          >${ea(t.completed_at)}</span
        >`:""}
    ${n?c`<span class="detail-session__usage" title=${n.tooltip}
          >${n.label}</span
        >`:""}
  </div>`}function Qf(e,t,r,n){let s=e.status==="running"?null:t,a=(s?wt({providers:{codex:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],i=e.status==="running"?ta(e.last_event_at):s?ea(s.completed_at):"";return c`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>n.onOpenDelegation&&n.onOpenDelegation(r,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${Vf[e.status]}</span
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
  </button>`}function Jf(e,t){return e.role===t.role&&e.model===t.model&&e.session_id===t.session_id}function e_(e,t,r){let n=[],s=new Set,o=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let f of o){let _=Zf(f);!_||s.has(_.launch_id)||(s.add(_.launch_id),n.push(_))}n.sort((f,_)=>f.started_at-_.started_at);let a={implementation:[],"review-consult":[]};if(t)for(let f of js){let _=t.roles[f]?.codex;a[f]=_?[..._.legs]:[]}let i=js.flatMap(f=>a[f]),l=new Set,d=[];for(let f of js){for(let _ of n.filter(m=>m.role===f)){let m=i.find(x=>x.receipt_id===_.launch_id)||null;m&&!Jf(_,m)||(m&&l.add(m.receipt_id),d.push(Qf(_,m,e.attempt_id,r)))}for(let _ of a[f])l.has(_.receipt_id)||d.push(Xf(f,_))}return d}function t_(e,t){let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,n=[...Hf,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return c`<div class="detail-session__usage-detail">
    ${n.map(s=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${Yf(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${r===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${r.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${oc}</span>`:""}
  </div>`}var r_={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function ta(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=String(t.getHours()).padStart(2,"0"),n=String(t.getMinutes()).padStart(2,"0");return`${r}:${n}`}function n_(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,n])=>typeof n=="string"&&n.length>0).map(([n,s])=>`${n}=${s}`).join(" \xB7 "):"",r=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${r}</span>
    ${t?c`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function ac(e,t={},r={}){let n=Array.isArray(e)?e:[],s=r.expanded||new Set;if(n.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let d of n)d&&typeof d.resumed_from=="string"&&d.resumed_from.length>0&&o.add(d.resumed_from);let a=d=>{if(!(d.status==="failed"||d.status==="orphaned"))return"";let _=typeof d.session_id=="string"&&d.session_id.length>0,m=o.has(d.attempt_id),x=_&&!m,k=_?m?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${d.attempt_id}
      ?disabled=${!x}
      title=${k}
      @click=${M=>{M.stopPropagation(),x&&t.onResume&&t.onResume(d.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},i=d=>{if(!(d.status==="failed"||d.status==="orphaned")||typeof d.cause!="string"||d.cause==="")return"";let _=d.cause_detail,m=_&&typeof _.reason=="string"&&_.reason.length>0?typeof _.command=="string"&&_.command.length>0?`${_.reason} \xB7 ${_.command}`:_.reason:d.cause;return c`<div class="detail-session__cause" title=${m}>
      ${d.cause}
    </div>`},l=d=>{let f=sc($o(d));if(wt(f).length===0&&!Jr(d.usage))return"";let _=s.has(d.attempt_id);return c`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${d.attempt_id}
      aria-expanded=${_?"true":"false"}
      title=${_?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${m=>{m.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(d.attempt_id)}}
    >
      τ 자세히
    </button>`};return c`
    <div class="detail-section-label">
      세션 이력${Kf(r.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${n.map(d=>{let f=$o(d),_=sc(f),m=wt(_);return c`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${d.status||"unknown"}"
            data-attempt-id=${d.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(d.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${r_[d.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${d.attempt_id}</span>
            ${xr(d)?c`<span
                  class="detail-session__resumed"
                  title=${xr(d)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${or(d)}</span>
            ${m.length>0?c`<span class="detail-session__role">orchestrator</span>`:""}
            ${d.session_id?c`<span class="detail-session__sid" title=${d.session_id}
                  >${String(d.session_id).slice(0,8)}</span
                >`:""}
            ${m.length>0?m.map(x=>c`<span
                      class="detail-session__usage"
                      title=${x.tooltip}
                      >${x.label}</span
                    >`):Jr(d.usage)?c`<span class="detail-session__usage"
                    >${Jr(d.usage)}</span
                  >`:""}
            <span class="detail-session__time">${ta(d.started_at)}</span>
          </button>
          ${l(d)} ${a(d)} ${i(d)} ${n_(d)}
          ${s.has(d.attempt_id)&&d.usage?t_(d.usage,d.runner==="codex"?"codex":"claude"):""}
          ${e_(d,f,t)}
        </div>`})}
    </div>
  `}function ic(e,t={}){return c`
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
          ${s_(e)}
        </div>`:""}
  `}function s_(e){let t=rn(e);if(t)return t;let r=e.data;if(!r)return"";if(r.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof r.default_task_prompt=="string"?br("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",r.default_task_prompt):""}`;let n=Ts(r.recorded_at);return c`<div class="detail-prompt__meta">
      ${r.attempt_id}${n?` \xB7 ${n}`:""}
    </div>
    ${typeof r.task_prompt=="string"?br("\uACFC\uC5C5 (user)",r.task_prompt):""}
    ${typeof r.system_prompt=="string"?br("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",r.system_prompt):""}`}var o_=["open","in_progress","deferred","resolved","closed"],a_=[0,1,2,3,4];function lc(e,t){let r=t.issueStores,n=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,i=t.execPresetStore,l=t.sessionLogStore,d=null,f=null,_={},m="",x=!1,k=!1,M={},D=!1,E=!1,B="",ee="",A="";function w(){D=!1,E=!1,B="",ee="",A=""}let R=[],N=null,Z=null,fe=!1,pe="",ne=!1,ie=0,Me=new Set;function je(){R=[],N=null,Z=null,fe=!1,pe="",ne=!1,ie+=1,Me.clear()}async function He(u){if(!s)return;let $=++ie;try{let y=await Promise.resolve(s("get-comments",{id:u}));if($!==ie||u!==d)return;R=Array.isArray(y)?y:[],fe=!1}catch{if($!==ie||u!==d)return;fe=!0}b()}function Ze(){if(!s||!d)return;let u=f&&typeof f.comment_count=="number"?f.comment_count:null;if(N!==d){N=d,Z=u,He(d);return}u!==null&&u!==Z&&(Z=u,He(d))}function Ve(u){Me.has(u)?Me.delete(u):Me.add(u),b()}function Ye(u){let $=pe.trim().length===0;pe=u,$!==(u.trim().length===0)&&b()}async function me(){let u=pe.trim();if(!s||!d||u.length===0||ne)return;let $=d;ne=!0,b();let y=!1;try{let G=await Promise.resolve(s("add-comment",{id:$,text:u}));Array.isArray(G)&&G.length>0&&(y=!0,$===d&&(R=G,fe=!1,pe="",Z=G.length))}catch{y=!1}y||le("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),$===d&&(ne=!1),b()}let xe={onToggle:Ve,onDraftInput:Ye,onSubmit:me},ke=document.createElement("div");ke.className="md-viewer-root",document.body.appendChild(ke);let Le=nc(ke,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),he=document.createElement("div");he.className="session-log-root",document.body.appendChild(he);let Q=Rs(he,{transport:s?(u,$)=>Promise.resolve(s(u,$)):void 0,sessionLogStore:l}),V=!1,$e=!1,ge=!1,te=null,U=null,W=0;function T(u){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${u}`}function H(){V=!1,$e=!1,ge=!1,te=null,U=null,W+=1}async function I(u){if(!s)return;let $=++W;$e=!0,ge=!1,b();try{let y=await Promise.resolve(s("get-bead-prompt",{bead_id:u}));if($!==W)return;!y||typeof y!="object"||Array.isArray(y)?ge=!0:(te=y,U=T(u))}catch{$===W&&(ge=!0)}finally{$===W&&($e=!1,b())}}function K(){if(V=!V,V&&d&&U!==T(d)){te=null,I(d);return}b()}function de(){if(!a||!d)return[];let u=a.get();return(u&&u.attempts?Object.values(u.attempts):[]).filter(y=>y&&y.bead_id===d).sort((y,G)=>(G.started_at||0)-(y.started_at||0)).map(y=>({attempt_id:y.attempt_id,bead_id:y.bead_id,status:y.status,started_at:typeof y.started_at=="number"?y.started_at:null,runner:y.runner||null,model:y.model||null,effort:y.effort||null,speed:y.speed||null,session_id:y.session_id||null,resumed_from:y.resumed_from||null,continuation_mode:y.continuation_mode||null,dismissed_at:typeof y.dismissed_at=="number"?y.dismissed_at:null,cause:typeof y.cause=="string"?y.cause:null,cause_detail:y.cause_detail||null,exec_default_preset_id:typeof y.exec_default_preset_id=="string"?y.exec_default_preset_id:null,exec_default_preset_revision:typeof y.exec_default_preset_revision=="number"?y.exec_default_preset_revision:null,exec_values:y.exec_values&&typeof y.exec_values=="object"?y.exec_values:null,usage:y.usage||null,usage_legs:Array.isArray(y.usage_legs)?y.usage_legs:[],delegation_sessions:Array.isArray(y.delegation_sessions)?y.delegation_sessions:[]}))}function Y(){if(!a||!d)return null;let u=a.get();return Wt(u&&u.attempts||{},d)}let _e=new Set;function be(u){_e.has(u)?_e.delete(u):_e.add(u),b()}function C(u){let $=a?a.get():null,y=$&&$.attempts?$.attempts[u]:null;Q.open({attempt_id:u,meta:y?{runner:y.runner||void 0,model:y.model||void 0,effort:y.effort||void 0,status:y.status||void 0,session_id:y.session_id||void 0}:{}})}function q(u,$){let y=a?a.get():null,G=y&&y.attempts?y.attempts[u]:null,Ce=(G&&Array.isArray(G.delegation_sessions)?G.delegation_sessions:[]).find(ze=>ze&&typeof ze=="object"&&ze.launch_id===$);Ce&&Q.open({attempt_id:u,launch_id:$,meta:{runner:"codex",role:Ce.role,model:Ce.model,session_id:Ce.session_id,status:Ce.status}})}async function X(u){if(!s||!u)return;let $=await Qr();if($===null)return;let y=()=>{let ze=a?a.get():null;return ze&&typeof ze.revision=="number"?ze.revision:0},G=async(ze={},De=y())=>await s("worker-attempt-resume",{attempt_id:u,expected_revision:De,...$!==""?{instructions:$}:{},...ze}),Se=ze=>{ze?.queue&&a?.set&&a.set(ze.queue)},Ce=await G();if(Se(Ce),Ce&&Ce.conflict){let ze=Ce.queue&&typeof Ce.queue.revision=="number"?Ce.queue.revision:y();Ce=await G({},ze),Se(Ce)}Ce=await pr(Ce,(ze,De)=>G({continuation:ze,decision_token:De}),{onResult:Se,refresh:()=>G()}),Ce&&Ce.resumed===!1&&!Ce.conflict&&Ce.reason&&le(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${Ce.reason}`,"error",2400)}let re={onOpen:C,onOpenDelegation:q,onResume:X,onToggleUsage:be};function ve(){let u=a?a.get():null,$={...M};for(let y of["orchestration_model","orchestration_effort","orchestration_speed"]){let G=u&&u[y];typeof G=="string"&&($[y]=G)}return $}async function S(){if(s){try{let u=await Promise.resolve(s("get-session-defaults",{}));M=u&&u.values&&typeof u.values=="object"?u.values:{}}catch{M={}}b()}}function P(){let u=a?a.get():null;return u&&u.runner_catalog||null}function ue(){let u=a?a.get():null;return u&&typeof u.execution_defaults=="object"?u.execution_defaults:null}function Ee(){let u=f?.metadata&&typeof f.metadata=="object"?f.metadata:{},y=Xr({pin:{...u,..._},global:ve(),execution_defaults:ue(),runner_catalog:P()}).orchestration_model.value||"";return Jo(P(),y)}function qe(){let u=i?i.get():null;return!u||typeof u.revision!="number"?null:{revision:u.revision,presets:Array.isArray(u.presets)?u.presets:[]}}function Ae(u){return u?.compatible===!1}function Ge(u){i&&u&&typeof u.revision=="number"&&Array.isArray(u.presets)&&i.set({revision:u.revision,presets:u.presets})}async function We(){let u=qe(),$=u?.presets.find(y=>y.id===m);if(!(!s||!d||!u||!$||Ae($)||x)){x=!0,b();try{let y=await Promise.resolve(s("apply-impl-preset",Zl(d,$.id,u.revision)));if(y&&y.conflict){Ge(y),le("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let G=y&&Array.isArray(y.issue)?y.issue[0]:y?.issue;if(y&&y.applied&&G&&typeof G=="object"){f=G;for(let Se of Jl)delete _[Se];le("\uAD6C\uD604 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",2400);return}y&&y.error==="bd_readback_failed"?le("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):le("\uAD6C\uD604 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(y){y&&typeof y=="object"&&y.code==="bd_readback_failed"?le("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):le("\uAD6C\uD604 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{x=!1,b()}}}let bt=null;r&&r.subscribe&&(bt=r.subscribe(()=>it()));let ot=null;a&&typeof a.subscribe=="function"&&(ot=a.subscribe(()=>{d&&b()}));let at=null;i&&typeof i.subscribe=="function"&&(at=i.subscribe(()=>{d&&b()}));function dt(u){u.key==="Escape"&&d&&(u.preventDefault(),n())}document.addEventListener("keydown",dt);function it(){if(d){if(r&&typeof r.snapshotFor=="function"){let u=r.snapshotFor("detail:"+d)||[];f=u.find(y=>y&&y.id===d)||u[0]||f}Ze(),b()}}function ft(u){ur(u).then($=>{$?le("\uBCF5\uC0AC\uB428","success",1200):le("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function z(u){u.preventDefault(),u.stopPropagation(),d&&ft(d)}function J(u,$){u.preventDefault(),u.stopPropagation(),ft($)}function ye(u,$,y){u.preventDefault(),u.stopPropagation(),Le.open($,{missing_state:y})}function we(u,$){_[u]=$,b(),!(!s||!d)&&Promise.resolve(s("update-exec-settings",Kl(d,u,$.length===0?null:$))).catch(()=>{le("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function ce(u,$){let y=f||{},G=y.metadata&&typeof y.metadata=="object"?y.metadata:{},Se={};for(let De of["impl_runtime","impl_model","impl_effort"])Se[De]=Object.hasOwn(_,De)?_[De]:typeof G[De]=="string"?G[De]:"";Se[u]=$;let Ce=rc(Se,P(),Ee()),ze={};for(let De of["impl_runtime","impl_model","impl_effort"])ze[De]=_[De],_[De]=Ce[De]||"";b(),!(!s||!d)&&Promise.resolve(s("update-impl-target",{id:d,...Ce,orchestration_runtime:Ee()})).then(De=>{let pt=Array.isArray(De)?De[0]:De;if(!pt||typeof pt!="object"||!pt.id)throw new Error("implementation target readback failed");f=pt;for(let Ie of["impl_runtime","impl_model","impl_effort"])delete _[Ie];b()}).catch(()=>{for(let De of["impl_runtime","impl_model","impl_effort"])ze[De]===void 0?delete _[De]:_[De]=ze[De];b(),le("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function Oe(u,$,y){if(!s||!d)return!1;try{let G=await Promise.resolve(s(u,$)),Se=Array.isArray(G)?G[0]:G;return Se&&typeof Se=="object"&&Se.id?(f=Se,!0):(le(y,"error"),!1)}catch{return le(y,"error"),!1}}function tt(u){setTimeout(()=>{try{let $=e.querySelector(u);$&&typeof $.focus=="function"&&$.focus()}catch{}},0)}function Xe(){D=!0,B=f&&f.title||"",b(),tt('.detail-edit__input[data-edit="title"]')}function Pe(u){B=u.target.value}function Je(){D=!1,B="",b()}function Te(){Oe("edit-text",{id:d,field:"title",value:B},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then($=>{$&&(D=!1,B=""),b()})}function ht(){E=!0,ee=f&&f.description||"",b(),tt('.detail-edit__textarea[data-edit="description"]')}function Pt(u){ee=u.target.value}function Ft(){E=!1,ee="",b()}function jt(){Oe("edit-text",{id:d,field:"description",value:ee},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then($=>{$&&(E=!1,ee=""),b()})}function yr(u,$,y,G){if(u.key==="Escape"){u.stopPropagation(),y();return}u.key==="Enter"&&(!G||u.ctrlKey||u.metaKey)&&(u.preventDefault(),$())}function kt(u){let $=u.target.value;Oe("update-status",{id:d,status:$},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>b())}function St(u){let $=Number(u.target.value);Oe("update-priority",{id:d,priority:$},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>b())}function cr(u){A=u.target.value}function rr(){let u=A.trim();u.length!==0&&Oe("label-add",{id:d,label:u},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then($=>{$&&(A=""),b()})}function Ht(u){if(u.key==="Escape"){u.stopPropagation(),A="",b();return}u.key==="Enter"&&(u.preventDefault(),rr())}function Gt(u){Oe("label-remove",{id:d,label:u},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>b())}let $t={onCopyPath:J,onOpenDoc:ye};function nr(u){return typeof u=="string"?u:u&&typeof u=="object"?String(u.id||u.to||u.issue_id||u.depends_on||""):""}function p(u){switch(u&&typeof u=="object"?String(u.dependency_type||u.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function v(u){let y=(Array.isArray(u.dependencies)?u.dependencies:[]).map(G=>({id:nr(G),icon:p(G)})).filter(G=>G.id.length>0);return c`
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
            @keydown=${y=>yr(y,Te,Je,!1)}
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
          ${o_.map(y=>c`<option value=${y} ?selected=${y===u}>${y}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${St}
        >
          ${a_.map(y=>c`<option value=${String(y)} ?selected=${y===$}>
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
              @click=${ht}
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
              @input=${Pt}
              @keydown=${$=>yr($,jt,Ft,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${jt}
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
                @click=${()=>Gt(y)}
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
            @keydown=${Ht}
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
    `}function gt(){if(!d)return c``;let u=f||{},$=String(u.id||d),y=u.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",G=Y(),Se=u.status||"open",Ce=typeof u.priority=="number"?Math.max(0,Math.min(4,u.priority)):"",ze=u.description||"",De={...u,metadata:{...u.metadata||{},..._}};return c`
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
          ${Ql(De)}
          ${Xl({metadata:De.metadata,workspace_values:ve(),catalog:P(),execution_defaults:ue(),expanded:k,presets:qe()?.presets||[],preset_id:m,preset_busy:x},{onToggle:pt=>{k=pt,b()},onEdit:(pt,Ie)=>{if(pt==="impl_runtime"||pt==="impl_model"||pt==="impl_effort"){ce(pt,Ie??"");return}we(pt,Ie??"")},onPresetSelect:pt=>{m=pt,b()},onPresetApply:()=>{We()}})}
          ${Re(Se,Ce)} ${oe(u)}
          ${rt(ze)}
          ${Fl(R,xe,{expanded:Me,draft:pe,sending:ne,error:fe})}
          ${Fe(u)} ${Qe(u)} ${v(u)}
          ${F(u)} ${h(u)}
          ${Ml(u,$t)}
          ${ic({expanded:V,loading:$e,error:ge,data:te},{onToggle:K})}
          ${ac(de(),re,{total:G,expanded:_e})}
        </div>
      </div>
    `}function b(){Be(gt(),e)}return{load(u){u!==d&&(_={},m="",k=!1,w(),je(),H()),d=u,f=null,it(),S()},clear(){d=null,f=null,_={},m="",x=!1,k=!1,w(),je(),H(),Le.close(),Q.close(),Be(c``,e)},destroy(){bt&&(bt(),bt=null),ot&&(ot(),ot=null),at&&(at(),at=null),document.removeEventListener("keydown",dt),Le.destroy(),ke.parentNode&&ke.parentNode.removeChild(ke),Q.destroy(),he.parentNode&&he.parentNode.removeChild(he),d=null,f=null,m="",x=!1,je(),H(),Be(c``,e)}}}function cc(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let r=t.querySelector("#fatal-error-title"),n=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),i=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},l=(d,f,_="")=>{r&&(r.textContent=d||"Unexpected Error"),n&&(n.textContent=f||"An unrecoverable error occurred.");let m=typeof _=="string"?_.trim():"";if(s&&(m.length>0?(s.textContent=m,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>i()),t.addEventListener("cancel",d=>{d.preventDefault(),i()}),{open:l,close:i,getElement(){return t}}}function Bs(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function Us(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let r=Math.floor(t/60);if(r<60)return`${r}\uBD84 ${Math.round(t-r*60)}\uCD08`;let n=Math.floor(r/60),s=r%60;return`${n}\uC2DC\uAC04 ${s}\uBD84`}function dc(e,t){if(typeof e!="object"||e===null)return null;let r=0,n=!1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t)continue;let a=o.started_at,i=o.finished_at;typeof a!="number"||typeof i!="number"||!Number.isFinite(a)||!Number.isFinite(i)||i<a||(r+=i-a,n=!0)}return n?r:null}function Ws(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function i_(e,t){let r=Array.isArray(e)?e:[],n=Array.isArray(t)?t:[];if(r.length===0&&n.length===0)return null;let s=null;for(let i of r)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!s||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=i);let o=r.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+n.length,a=r.some(i=>i.state==="repairing");return{deploy:s?{sha:Bs(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function uc(e,t){let r=i_(e,t);return r?c`<button
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
  </button>`:""}function sn(e){let t=Mt(e.created_at),r=Mt(e.updated_at);return!t&&!r?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${vt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&r?c`<span>·</span>`:""}${r?c`<span title=${`\uC218\uC815 ${vt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </div>`}function l_(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function On(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function zs(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function lr(e,t,r={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(_=>_&&_.bead_id===t&&_.phase!=="done").sort((_,m)=>(_.requested_at||0)-(m.requested_at||0)).at(-1),o=typeof r.attempt_id=="string"&&r.attempt_id.length>0?r.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=r.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":r.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":r.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,i=typeof s?.last_error=="string"?s.last_error:null,l=s?l_(s.phase):null,d=s?.kind==="stale_work_backup_fresh",f=r.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!r.external&&!r.done,enabled:!a&&(!s||!!i),label:d?i?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":i?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(i?d?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${i} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${i} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${l||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:f==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:l,error:i,confirmation:f}}function vr(e){let t=e.discard;if(!t||!t.operation)return"";let r=t.operation,n=r.kind==="stale_work_backup_fresh"&&!t.error?null:r.backup?.path,s=r.original_pr,o=r.revert_pr;return c`<div
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
  </div>`}var c_={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function pc(e,t=!1){if(!e||typeof e!="object")return null;let r=e;if(r.reason!=="worktree_stale_work"||!r.stale_work||typeof r.stale_work!="object")return null;let n=r.stale_work,s=n.residue==="branch"?"branch":"worktree",o=n.state==="unique"?"unique":"unknown",a=n.summary&&typeof n.summary=="object"?n.summary:{};function i(d){return Number.isInteger(a[d])?Number(a[d]):0}let l=typeof n.cause=="string"?n.cause:"observe_failed";return{residue:s,state:o,title:s==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":o==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:c_[l]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:s==="branch"?`\uACE0\uC720 commit ${i("branch_ahead")}`:[`staged ${i("staged_count")}`,`unstaged ${i("unstaged_count")}`,`untracked ${i("untracked_count")}`,`branch ahead ${i("branch_ahead")}`,`HEAD ahead ${i("head_ahead")}`].join(" \xB7 "),action_id:typeof n.action_id=="string"?n.action_id:"",can_resume:n.can_resume===!0,can_continue:n.can_continue===!0,can_backup_fresh:n.can_backup_fresh===!0,can_recheck:n.can_recheck===!0,locked:t}}function ra(e){let t=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],n=wt(e.usage),s=Xt(e.usage),o=e.merge_step||null,a=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,i=e.lane==="done"&&!a,l=i?Mt(e.done_at):"",d=t?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",f=typeof e.seq=="number"?c`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",_=e.worker_serial===!0?c`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",m=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",x=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
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
    ${i?c`<div class="worker-mini__row1">${m}${x}${k}</div>
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
              ${d}${f}${m}${x}${M}${D}${E}${_}${B}
            </div>
            <div class="worker-mini__body">${k}${ie}</div>
            ${je?c`<div class="worker-mini__foot">
                  ${ee}${A}
                  <span class="worker-mini__actions"
                    >${w}${R}${N}${fe}${Me}${ne}</span
                  >
                  ${vr(e)}
                </div>`:""}
            ${sn(e)}`:c`<div class="worker-mini__line">
              ${d}${f}${m}${x}${k}${M}${D}${E}${_}${B}${ee}${A}${w}${R}${N}${fe}
            </div>
            ${vr(e)} ${sn(e)}`}
  </div>`}function d_(e){let t=e.draggable&&!e.done,r=e.workflow,n=r&&r.chips||{},s=n.route||r&&r.route,o=n.route_source==="derived"||!!(r&&r.route_source==="derived"),a=typeof e.reason=="string"&&e.reason.split(" \xB7 ").includes("missing_description"),i=typeof e.reason=="string"&&e.reason.startsWith("\u26D4");return c`<div
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
                  </div>`:e.items.map(n=>e.lane==="candidate"?d_(n):ra(n))}
          </div>`}
  </section>`}var fc=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],Pn=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function Hs(e,t){let r=fc.find(s=>s.step===e);if(!r)return null;let n=fc.length;return{step:r.step,label:t,index:r.index,total:n,percent:Math.round(r.index/n*100)}}function _c(e){let t=Pn.findIndex(r=>r.step===e);return Pn.map((r,n)=>({step:r.step,label:r.label,state:t<0?"todo":n<t?"done":n===t?"stall":"todo"}))}function Br(e){let t=Pn.find(r=>r.step===e);return t?t.label:typeof e=="string"?e:""}function u_(e){let t=Pn.findIndex(r=>r.step===e);return t<0?null:{index:t+1,total:Pn.length}}function Gs(e){let t=u_(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var sa=new Set(["queued","running","retry_pending","repairing"]),mc=new Set(["failed","succeeded"]),p_={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",repairing:"\uC790\uB3D9 \uD574\uACB0 \uC911",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},Dn={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},f_={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:Dn.base_containment,child_sweep:Dn.child_sweep,branch_cleanup:Dn.branch_cleanup,parent_close:Dn.parent_close};function __(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function m_(e,t,r){return!["verify","deploy"].includes(e.kind)||![...sa,...mc].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(n=>n&&typeof n=="object"&&n.bead_id===t&&n.merged_sha===r)}function g_(e,t){let r=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(r!==0)return r;let n=d=>d.state==="succeeded"?1:2,s=n(t)-n(e);if(s!==0)return s;let o=typeof e.requested_at=="number"?e.requested_at:0,a=typeof t.requested_at=="number"?t.requested_at:0;if(o!==a)return a-o;let i=typeof e.operation_id=="string"?e.operation_id:"",l=typeof t.operation_id=="string"?t.operation_id:"";return i.localeCompare(l)}function na(e,t=!1){let r=e.kind,n=r==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",s=t?"failed":e.state,o=p_[s];if(!o)return null;let a=Hs(r,`${n} ${o}`);return a?{...a,active:sa.has(s),failed:s==="failed"}:null}function b_(e){return!e||typeof e!="object"?null:f_[e.step]||null}function Mn(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,r=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},n=b_(r),s=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,o=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),a=!o&&(e.cleanup_cursor==="repo_operations"||r.step==="repo_operations"),i=__(e.merge_sha)?e.merge_sha:null,l=!o&&i&&Array.isArray(e.repo_operations)?e.repo_operations.filter(k=>k&&typeof k=="object"&&m_(k,t,i)).sort(g_):[],d=a?l:[],f=d.find(k=>sa.has(k.state));if(f)return na(f);if(s)return s.step==="repo_operations"&&l[0]?na(l[0],!0):null;let _=d.find(k=>mc.has(k.state)?k.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(_)return na(_);if(n){let k=Hs(n.step,n.label);return k?{...k,active:!0,failed:!1}:null}let m=typeof e.cleanup_cursor=="string"?Dn[e.cleanup_cursor]:null;if(!m)return null;let x=Hs(m.step,m.label);return x?{...x,active:!0,failed:!1}:null}function Vs(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var gc={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},bc={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."};function hc(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function oa(e){for(let t of hc(e))if(Object.hasOwn(gc,t))return gc[t];return null}function aa(e){let t=null;for(let r of hc(e))Object.hasOwn(bc,r)&&(t=bc[r]);return t}function Ys(e){let t=oa(e),r=aa(e);return t&&r?`${t} \u2014 ${r}`:t||r?t||r:typeof e=="string"?e:""}function vc(e,t){let r=oa(e)??oa(t),n=aa(t)??aa(e);return r&&n?`${r} \u2014 ${n}`:r||n?r||n:typeof t=="string"?t:""}var yc=160;function h_(e){return e.length>yc?`${e.slice(0,yc)}\u2026`:e}function v_(e){return!e||!e.reason?"":c`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?c` · <code>${h_(e.command)}</code>`:""}
  </div>`}function y_(e){return e?c`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function ia(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),r=Math.floor(t/60),n=t%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function wc(e){let t=e.failure?Ys(e.failure.reason):"";return c`<div class="worker-banners">
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
          ${v_(e.failure.cause_detail)}
          ${y_(e.failure.reason)}
          ${vr({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function w_(e,t,r=null){let n=e.failed===!0,s=!!e.paused,o=n?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):s?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?ia(t-e.started_at):"\u2014",a=or(e),i=xr(e),l=wt(e.usage),d=Xt(e.usage),f=e.conflict_resolution?s?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,_=e.base_exception||null,m=e.landing,x=e.attempt_id&&e.attempt_id===r,k=e.discard?.action?c`<button
        type="button"
        class="rtile__discard"
        data-operation-id=${e.discard.operation?.operation_id||""}
        ?disabled=${!e.discard.enabled}
        title=${e.discard.title}
        aria-label=${e.discard.label}
      >
        ${e.discard.label}
      </button>`:"";return c`<div
    class="rtile${x?" rtile--sel":""}${s?" rtile--paused":""}${n?" rtile--failed":""}"
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
    ${m?c`<div class="rtile__landing">
          <span
            class="merge-step${m.failed?" merge-step--failed":""}"
            style=${`--progress: ${m.percent}%`}
            >${m.label}${m.index>0?c`<span class="merge-step__n"
                  >${m.index}/${m.total}</span
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
    ${sn(e)} ${vr(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${n||s?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function la(e,t=Date.now(),r=null){let n=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>w_(s,t,r))}
  </div>`}function Ur(e){return c`<svg
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
  </svg>`}function ca(){return Ur(wr`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function da(){return Ur(wr`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function kc(){return Ur(wr`<rect x="4.3" y="4.3" width="7.4" height="7.4" rx="1.2" />`)}function $c(){return Ur(wr`<path d="M4.4 4.4 11.6 11.6M11.6 4.4 4.4 11.6" />`)}function xc(){return Ur(wr`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function Sc(){return Ur(wr`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function Ac(){return Ur(wr`<path d="M3 3.6 8.2 8 3 12.4z" />
    <path d="M8.8 3.6 14 8l-5.2 4.4z" />`)}var Nn=1,k_=6e4,$_={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"},x_=new Set(["auto_merge","merged","merge","done"]),Ec={running:3,paused:2,failed:1};function S_(e,t){let r=null,n=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=n&&(n=o,r=s)}return r}function A_(e,t){let r=Object.values(e||{}),n=new Set,s=new Map;for(let a of r)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&n.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of r){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let i=null;if(a.status==="running")i="running";else if(a.status==="paused"&&!n.has(a.attempt_id))i="paused";else if(a.status==="failed"||a.status==="orphaned"){let _=t.get(a.bead_id),m=typeof _=="number"&&_>0&&typeof a.finished_at=="number"&&_>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!m&&typeof a.dismissed_at!="number"&&(i="failed")}if(!i)continue;let l=typeof a.started_at=="number"?a.started_at:null,d=o.get(a.bead_id);if(d){let _=Ec[d.run_state],m=Ec[i];if(_>m||_===m&&(d.started_at??0)>(l??0))continue}let f=typeof a.session_id=="string"&&a.session_id.length>0;o.set(a.bead_id,{attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",run_state:i,started_at:l,last_event_at:typeof a.last_event_at=="number"?a.last_event_at:null,runner:typeof a.runner=="string"?a.runner:null,model:typeof a.model=="string"?a.model:null,effort:typeof a.effort=="string"?a.effort:null,speed:typeof a.speed=="string"?a.speed:null,resumed_from:typeof a.resumed_from=="string"?a.resumed_from:null,continuation_mode:a.continuation_mode==="session"||a.continuation_mode==="fresh"?a.continuation_mode:null,usage:Wt(e,a.bead_id),can_pause:i==="running"&&f,can_resume:i!=="running"&&f&&!n.has(a.attempt_id)})}return o}function Tc(e,t){let r=e[t];if(!r)return"";if(r.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let n=typeof r.reason=="string"?r.reason:"",s=n.indexOf(":");return s>0&&s<n.length-1?`\u26D4 ${n.slice(0,s)} (${n.slice(s+1)})`:`\u26D4 ${n}`}function Ot(e){return e&&typeof e=="object"?e:{}}function ua(e,t,r){let n=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=r&&typeof r.done_since=="number"?r.done_since:void 0,a=new Map;for(let E of s)E&&typeof E.root_dir=="string"&&a.set(E.root_dir,E);let i=[],l=[],d=[],f=[],_=[],m=new Map;for(let E of n){if(!E||typeof E.root_dir!="string")continue;let B=E.root_dir,ee=E.name||B,A=a.get(B),w=A&&typeof A.revision=="number"?A.revision:typeof E.revision=="number"?E.revision:0,R=Ot(E.attempts),N=Ot(E.bead_titles),Z=Ot(E.pr_observations),fe=Ot(E.admission),pe=Ot(E.revise_parked),ne=Ot(E.merge_queue_state),ie=Ot(E.cleanup_failed),Me=Ot(E.discard_operations),je=Ot(E.pr_activity),He=Array.isArray(E.repo_operations)?E.repo_operations:[],Ze=Array.isArray(E.merge_queue)?E.merge_queue:[],Ve=new Set(Ze.filter(Q=>Q&&typeof Q.bead_id=="string").map(Q=>Q.bead_id)),Ye=new Map(Ze.filter(Q=>Q&&typeof Q.bead_id=="string").map(Q=>[Q.bead_id,Q])),me=Array.isArray(E.queue)?E.queue:[],xe=Array.isArray(E.done)?E.done:[],ke=new Map;for(let Q of xe)Q&&typeof Q.bead_id=="string"&&typeof Q.added_at=="number"&&ke.set(Q.bead_id,Q.added_at);let Le=Q=>({id:Q,title:N[Q]||Q,root_dir:B,workspace_name:ee,expected_revision:w,draggable:!1}),he=new Set;for(let[Q,V]of A_(R,ke))he.add(Q),l.push({...Le(Q),lane:"running",attempt_id:V.attempt_id,run_state:V.run_state,can_pause:V.can_pause,can_resume:V.can_resume,started_at:V.started_at,last_event_at:V.last_event_at,runner:V.runner,model:V.model,effort:V.effort,speed:V.speed,resumed_from:V.resumed_from,continuation_mode:V.continuation_mode,usage:V.usage,discard:lr(Me,Q,{attempt_id:V.attempt_id}),badges:V.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:V.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:V.run_state==="failed"});for(let Q of Array.isArray(E.pr_wait)?E.pr_wait:[]){let V=Q&&Q.bead_id;if(typeof V!="string"||he.has(V))continue;he.add(V);let $e=Ot(Z[V]),ge=Ot($e.pr),te=$e.gate?Ot($e.gate):null,U=Ve.has(V),W=Ye.get(V)?.continuation_action||null,T=!!W&&W.continuation===null,H=ne.active===V,I=Q.external===!0,K=ie[V]||null,de=Ot(je[V]),Y=Mn({bead_id:V,merge_sha:Q.merge_sha,cleanup_cursor:Q.cleanup_cursor,merge_progress:de.merge_progress||null,cleanup_failed:K,repo_operations:He}),_e=Vs(Y),be=!!te&&te.base_badge==="\uCDA9\uB3CC",C=!!K&&["child_sweep","branch_cleanup","parent_close"].includes(K.step)&&!!te&&te.tier==="merged",q=I&&!!K&&!!te&&te.tier==="merged",X=!!te&&["closed_unmerged","review","undecidable"].includes(te.tier),re=lr(Me,V,{external:I,merge_active:H||Y?.step==="merge",merge_queued:U,cleanup_active:_e,merged:!!K||te?.tier==="merged"}),ve=!!re.operation;d.push({...Le(V),lane:"pr_wait",pr_number:typeof ge.number=="number"?ge.number:null,pr_url:typeof ge.url=="string"?ge.url:void 0,external:I,usage:Wt(R,V),merge_step:Y,badges:T?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:Y?[te?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:K?[Br(K.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Br(K.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof te?.gate_badge=="string"&&te.gate_badge.length>0?[te.gate_badge]:[],alert:Y?Y.failed===!0:!!K||X,reason:K&&Y?.active!==!0?Gs(K.step):"PR \uB300\uAE30",merge_action:te?.tier==="merged"&&!C&&!q?!1:!U||T,merge_enabled:!ve&&(T||te?.enabled===!0||be||C||q),merge_label:T?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":q||C?"\uC815\uB9AC \uC7AC\uAC1C":be&&!C?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:T?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":ve?re.error?`\uD3D0\uAE30 \uC2E4\uD328: ${re.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${re.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:q?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":C?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":be?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":te?.enabled===!0?`\uBA38\uC9C0 (${te.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${te?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:U&&!T,cancel_enabled:!H,continuation_mismatch:W?.mismatch||null,discard:re,discard_action:re.action,discard_enabled:re.enabled,discard_title:re.title})}for(let Q=0;Q<me.length;Q++){let V=me[Q],$e=V&&V.bead_id;if(typeof $e!="string"||he.has($e))continue;he.add($e);let ge=pe[$e],te=lr(Me,$e),U=te.operation?te:null,W={...Le($e),lane:"queue",draggable:!U,discard:U||void 0,reason:Tc(fe,$e),queue_position:Q+1,queue_index:Q,queue_length:me.length,badges:ge?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!ge,revise_action:!!ge,revise_enabled:!!ge&&!U,revise_title:ge?ge.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${ge.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};f.push(W);let T=m.get(B);T?T.push(W):m.set(B,[W])}for(let Q of Array.isArray(E.runnable)?E.runnable:[]){let V=Q&&Q.bead_id;typeof V!="string"||he.has(V)||(he.add(V),i.push({...Le(V),title:Q.title||N[V]||V,lane:"runnable",draggable:!0,reason:Tc(fe,V),created_at:Q.created_at??void 0,updated_at:Q.updated_at??void 0,labels:Array.isArray(Q.labels)?Q.labels:[],spec_reviewer:typeof Q.spec_reviewer=="string"?Q.spec_reviewer:void 0,plan_state:Q.plan_state==="approved"||Q.plan_state==="authored"?Q.plan_state:"none",workflow:Q.route?{route:Q.route,chips:{route:Q.route}}:null,place_index:me.length}))}for(let Q of xe){let V=Q&&Q.bead_id;if(typeof V!="string"||he.has(V)||(he.add(V),o!==void 0&&typeof Q.added_at=="number"&&Q.added_at<o))continue;let $e=S_(R,V);_.push({...Le(V),lane:"done",done:!0,usage:Wt(R,V),done_at:typeof Q.added_at=="number"?Q.added_at:void 0,done_kind:$e&&typeof $e.done_kind=="string"?$e.done_kind:null})}}let x=new Map;s.forEach((E,B)=>{E&&typeof E.root_dir=="string"&&x.set(E.root_dir,B)});let k=r&&r.running_sort==="repo"?"repo":"started";l.sort((E,B)=>{if(k==="repo"){let w=x.get(E.root_dir)??Number.MAX_SAFE_INTEGER,R=x.get(B.root_dir)??Number.MAX_SAFE_INTEGER;if(w!==R)return w-R}let ee=typeof E.started_at=="number"&&Number.isFinite(E.started_at)?E.started_at:null,A=typeof B.started_at=="number"&&Number.isFinite(B.started_at)?B.started_at:null;return ee!==null&&A!==null&&ee!==A?ee-A:ee===null&&A!==null?1:ee!==null&&A===null?-1:E.id.localeCompare(B.id)}),_.sort((E,B)=>(B.done_at??0)-(E.done_at??0));let M=s.length>0?s:n.map(E=>({root_dir:E&&E.root_dir,name:E&&E.name,auto_advance:E&&E.auto_advance,auto_merge:E&&E.auto_merge,slots:E&&E.slots,revision:E&&E.revision,runner_catalog:E&&E.runner_catalog})),D=[];for(let E of M)!E||typeof E.root_dir!="string"||D.push({root_dir:E.root_dir,name:E.name||E.root_dir,auto_advance:E.auto_advance===!0,auto_merge:E.auto_merge===!0,slots:typeof E.slots=="number"&&E.slots>=Nn?E.slots:Nn,revision:typeof E.revision=="number"?E.revision:0,runner_catalog:Ot(E.runner_catalog),items:m.get(E.root_dir)||[]});return{runnable:i,queue:f,queue_groups:D,running:l,pr_wait:d,done:_,automation:{total:D.length,both_on:D.filter(E=>E.auto_advance&&E.auto_merge).length}}}function E_(e,t){if(typeof e!="number"||!Number.isFinite(e))return"";let n=t-e<k_;return c`<span
    class="mon-beat${n?" mon-beat--live":""}"
    title=${`\uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${vt(e)}`}
    ><span class="mon-beat__dot" aria-hidden="true"></span>${n?"":c`<span class="mon-beat__age"
          >${Mt(e,t)}</span
        >`}</span
  >`}function qn(e){return c`<div class="mon-c__title">${e.title}</div>`}function Fn(e){return c`<span class="mon-c__id" title="클릭하면 상세로 이동"
    >${e.id}</span
  >`}function Ks(e){return e.workspace_name?c`<span class="mon-c__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:""}function pa(e){let t=wt(e.usage),r=Xt(e.usage);return t.length>0?t.map(n=>c`<span class="mon-c__usage" title=${n.tooltip}
          >${n.label}</span
        >`):r?c`<span class="mon-c__usage" title=${en(e.usage)}
        >${r}</span
      >`:""}function fa(e){return(Array.isArray(e.badges)?e.badges:[]).map(r=>c`<span class="mon-c__badge${e.alert?" mon-c__badge--alert":""}"
        >${r}</span
      >`)}function T_(e){return c`<span class="mon-c__ops">
    ${e.run_state==="running"?c`<button
          type="button"
          class="mon-op mon-op--pause"
          ?disabled=${e.can_pause===!1}
          aria-label="일시정지"
          title="일시정지 — 세션을 끊고 이어하기 가능 상태로 둡니다"
        >
          ${da()}
        </button>`:c`<button
          type="button"
          class="mon-op mon-op--resume"
          ?disabled=${e.can_resume===!1}
          aria-label="이어하기"
          title="이어하기"
        >
          ${ca()}
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
          ${$c()}
        </button>`:""}
  </span>`}function C_(e,t){let r=typeof e.started_at=="number"?ia(t-e.started_at):"";return c`${qn(e)}
    <div class="mon-c__meta">
      ${fa(e)}${E_(e.last_event_at,t)}${Fn(e)}${Ks(e)}
      ${or(e)?c`<span class="mon-c__model">${or(e)}</span>`:""}
      ${xr(e)?c`<span
            class="rtile__resumed"
            title=${xr(e)}
            >↻</span
          >`:""}
      ${r?c`<span class="mon-live__elapsed">${r}</span>`:""}
      ${pa(e)}${T_(e)}${vr(e)}
    </div>`}function R_(e){let t=e.workflow,n=(t&&t.chips||{}).route||t&&t.route,s=typeof e.spec_reviewer=="string"?e.spec_reviewer:"",o=e.plan_state==="approved"?"plan \u2713":e.plan_state==="authored"?"plan \u270E":"plan \u2013",a=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),i=Mt(e.updated_at);return c`${qn(e)}
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
    </div>`}function I_(e){let t=!!e.discard?.operation;return c`${qn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>
      <span class="mon-live__pos">#${e.queue_position}</span>${Fn(e)}
      ${fa(e)}
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
    ${vr(e)}
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
        </div>`:""}`}function L_(e){let t=e.merge_step||null,r=!!(Xt(e.usage)||t||e.merge_action||e.cancel_action||e.discard_action);return c`${qn(e)}
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
      ${fa(e)}
      ${e.reason?c`<span class="mon-c__reason">${e.reason}</span>`:""}
    </div>
    ${r?c`<div class="mon-c__tail">
          ${pa(e)}${t?c`<span
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
          ${vr(e)}
        </div>`:""}`}function O_(e,t){let r=e.done_kind||"",n=r?$_[r]||r:"",s=Mt(e.done_at,t);return c`${qn(e)}
    <div class="mon-c__meta">
      ${Fn(e)}${Ks(e)}
      ${n?c`<span
            class="mon-live__kind${x_.has(r)?" mon-live__kind--ok":" mon-live__kind--warn"}"
            >${n}</span
          >`:""}
      ${pa(e)}
      ${s?c`<span title=${`\uC644\uB8CC ${vt(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
    </div>`}function Cc(e,t){return e.lane==="running"?C_(e,t):e.lane==="runnable"?R_(e):e.lane==="queue"?I_(e):e.lane==="pr_wait"?L_(e):O_(e,t)}function Rc(e){let t=String(e.revision);return c`<header
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
        ${e.auto_advance?da():ca()}
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
        ${xc()}
        <span class="mon-ctl__label">머지</span>
      </button>
      <label class="mon-ctl mon-ctl--slots" title="동시에 실행할 세션 수">
        ${Sc()}
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
  </header>`}function Ic(e){let{total:t,both_on:r}=e.automation,n=t>0&&r===t,s=e.running_sort==="repo"?"repo":"started",o=sr.find(i=>i.value===e.done_range)?.label||"",a=Array.isArray(e.token_total)?e.token_total:e.token_total?[{label:e.token_total,tooltip:e.token_tooltip}]:[];return c`<div class="mon-top">
    <button
      type="button"
      class="mon-auto-all${n?" is-active":""}"
      data-on=${n?"false":"true"}
      aria-pressed=${n?"true":"false"}
      ?disabled=${t===0}
      title=${n?"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4 (\uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4)":"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
    >
      ${n?kc():Ac()}
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
  </div>`}function Lc(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function Oc(e){let t=(Array.isArray(e)?e:[]).map(i=>i&&i.usage).filter(i=>i&&typeof i=="object"&&"providers"in i);if(t.length>0)return wt(gs(t));let r={};for(let i of fr)r[i]=0;let n=!1,s=0,o=0,a=0;for(let i of Array.isArray(e)?e:[]){let l=i&&i.usage;if(l&&typeof l=="object"){let d=!1;for(let f of fr){let _=l[f];typeof _=="number"&&Number.isFinite(_)&&(r[f]+=_,n=!0,d=!0)}if(d){o+=1;let f=l.total_cost_usd;typeof f=="number"&&Number.isFinite(f)&&(s+=f,a+=1)}}}return o>0&&a===o&&(r.total_cost_usd=s),n?Xt(r):null}var Dc="bdui.monitor.done-range",Mc="bdui.monitor.running_sort";function P_(){try{let e=window.localStorage.getItem(Dc);return Ut(e)?e:Dt}catch{return Dt}}function D_(e){try{window.localStorage.setItem(Dc,e)}catch{}}function M_(){try{return window.localStorage.getItem(Mc)==="repo"?"repo":"started"}catch{return"started"}}function N_(e){try{window.localStorage.setItem(Mc,e)}catch{}}var Nc="tab:monitor:pipeline",q_=1e3,F_=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}];function Pc(e,t){let r=(e.lane==="runnable"||e.lane==="queue")&&e.draggable!==!1;return c`<div
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
    ${Cc(e,t)}
  </div>`}function qc(e,t){let r=ct("views:monitor"),n=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,i=t.switchWorkspace,l=t.now||(()=>Date.now()),d=t.confirm||(T=>typeof globalThis.confirm!="function"||globalThis.confirm(T)),f=P_(),_=M_();function m(){let T=sr.find(H=>H.value===f);return T?T.label:""}let x=document.createElement("div");x.className="mon",e.appendChild(x);let k=ua(null,null),M=new Map,D=null,E=null;async function B(T,H,I,K,de=!0){if(!o||!I)return null;let Y=await o(T,{...H,root_dir:I,expected_revision:K});if(Y&&Y.conflict&&de){Y.queue&&M.set(I,Y.queue);let _e=Y.queue&&typeof Y.queue.revision=="number"?Y.queue.revision:K;Y=await o(T,{...H,root_dir:I,expected_revision:_e})}return Y&&Y.queue&&I&&M.set(I,Y.queue),Y}function ee(T,H){let I=M.get(T),K=s&&s.get?s.get():null,de=(Array.isArray(K)?K:[]).find(_e=>_e?.root_dir===T);return(I||de)?.merge_queue?.find(_e=>_e.bead_id===H)?.continuation_action}async function A(T,H,I,K){let de=await B(T,H,I,K),Y=M.get(I)?.revision??de?.queue?.revision??K;return pr(de,(_e,be)=>B(T,{...H,continuation:_e,decision_token:be},I,Y,!1),{refresh:_e=>B(T,H,I,_e?.queue?.revision??M.get(I)?.revision??Y,!1)})}async function w(T,H,I,K){let de=await pr({continuation_mismatch:K},(_e,be)=>B("worker-merge-queue-add",{bead_id:H,continuation:_e,decision_token:be},T,I,!1)),Y=de?.queue?.merge_queue?.find(_e=>_e.bead_id===H)?.continuation_action;de?.applied!==!0&&Y?.continuation===null&&Y.mismatch&&await w(T,H,de.queue.revision,Y.mismatch)}async function R(T,H,I){let K=await B("worker-discard",T,H,I);if(K&&K.discarded===!0){le(zs(K),"success",5e3);return}if(K&&K.reason){le(`\uD3D0\uAE30 \uC2E4\uD328: ${K.reason}`,"error");return}if(K&&K.accepted&&K.pending==="merged_revert"){le("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(K&&K.accepted){le(`\uD3D0\uAE30 \uC9C4\uD589: ${K.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}K&&!K.conflict&&le("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function N(T,H,I){return!o||!I?null:await o(T,{...H,root_dir:I})}async function Z(T){if(!o||!T&&!d("\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB055\uB2C8\uB2E4. \uAC01 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uD568\uAED8 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?"))return;let H=await o("monitor-auto-toggle",{on:T}),I=H&&Array.isArray(H.failed)?H.failed:[];I.length>0&&le(`\uC790\uB3D9\uD654 ${T?"\uCF1C\uAE30":"\uB044\uAE30"} \uC77C\uBD80 \uC2E4\uD328: ${I.map(K=>K.root_dir).join(", ")}`,"error",3200)}async function fe(){let T=new Map;for(let H of k.pr_wait)T.has(H.root_dir)||T.set(H.root_dir,H.expected_revision);for(let[H,I]of T)await B("worker-merge-queue-add-all",{},H,I)}let pe=null,ne=!1,ie=null;function Me(){ie!==null&&clearTimeout(ie),ie=setTimeout(()=>{ie=null,ne=!1},0)}function je(T){let H=T.target;return typeof H?.closest=="function"?H.closest(".mon-group"):null}function He(T){let H=je(T);return!H||!pe?null:(H.getAttribute("data-root-dir")||"")===pe.root_dir?H:null}function Ze(){for(let T of Array.from(x.querySelectorAll(".mon-group--drag-over")))T.classList.remove("mon-group--drag-over")}function Ve(T){let H=T.target,I=typeof H?.closest=="function"?H.closest('.mon-card[draggable="true"]'):null;if(I){pe={bead_id:I.getAttribute("data-issue-id")||"",lane:I.getAttribute("data-lane")||"",root_dir:I.getAttribute("data-root-dir")||"",revision:Number(I.getAttribute("data-revision")||0)||0,queue_index:Number(I.getAttribute("data-queue-index")),queue_length:Number(I.getAttribute("data-queue-length")),place_index:Number(I.getAttribute("data-place-index"))},ne=!0;try{T.dataTransfer?.setData("text/plain",pe.bead_id),T.dataTransfer&&(T.dataTransfer.effectAllowed="move")}catch{}}}function Ye(T){let H=He(T);H&&(T.preventDefault(),T.dataTransfer&&(T.dataTransfer.dropEffect="move"),H.classList.add("mon-group--drag-over"))}function me(T){je(T)?.classList.remove("mon-group--drag-over")}function xe(){pe=null,Ze(),Me()}function ke(T){let H=He(T),I=pe;if(pe=null,Ze(),!H||!I||!I.bead_id)return;T.preventDefault();let K=T.target,de=typeof K?.closest=="function"?K.closest('.mon-card[data-lane="queue"]'):null,Y=de&&H.contains(de)?Number(de.getAttribute("data-queue-index")):NaN;if(I.lane==="runnable"){let C=Number.isFinite(Y)?Y:I.place_index;if(!Number.isFinite(C))return;B("worker-queue-place",{bead_id:I.bead_id,index:C},I.root_dir,I.revision);return}if(I.lane!=="queue"||de&&de.getAttribute("data-issue-id")===I.bead_id)return;let _e=I.queue_index,be=Number.isFinite(Y)?_e>Y?Y:Y-1:I.queue_length-1;!Number.isFinite(be)||be<0||be===_e||B("worker-queue-reorder",{bead_id:I.bead_id,to_index:be},I.root_dir,I.revision)}function Le(T){let H={runnable:k.runnable,queue:k.queue,running:k.running,pr_wait:k.pr_wait,done:k.done};return c`${Ic({automation:k.automation,counts:{running:k.running.length,queue:k.queue.length,pr_wait:k.pr_wait.length},running_sort:_,done_range:f,token_total:Oc(k.done),token_tooltip:Lc(m())})}
      <div class="worker-lanes mon-lanes">
        ${F_.map(I=>{let K=H[I.lane],de=I.lane==="queue"?k.queue_groups.length>0?c`${k.queue_groups.map(Y=>c`<div
                        class="mon-group"
                        data-root-dir=${Y.root_dir}
                      >
                        ${Rc(Y)}
                        <div class="mon-group__list">
                          ${Y.items.map(_e=>Pc(_e,T))}
                        </div>
                      </div>`)}`:void 0:K.length>0?c`${K.map(Y=>Pc(Y,T))}`:void 0;return tr({id:`monitor-${I.lane}`,lane:I.pane,title:I.lane==="done"?`\uC644\uB8CC\xB7${m()}`:I.title,items:K,empty:I.empty,body:de,live:I.lane==="running"&&K.length>0,header_control:I.lane==="pr_wait"&&K.length>0?c`<button
                    type="button"
                    class="mon-lane-op mon-merge-all"
                    title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
                  >
                    일괄 머지
                  </button>`:""})})}
      </div>`}function he(){let T=s&&s.get?s.get():null,H=s&&s.getWorkspacesState?s.getWorkspacesState():[],I=l();k=ua(T,H,{done_since:Pr(f,I),running_sort:_}),Be(Le(I),x)}function Q(T,H){let I=a?a():void 0;if(!H||!I||H===I||!i){n(T);return}i(H).then(()=>{n(T)}).catch(K=>{r("workspace switch for %s failed: %o",H,K)})}function V(T){return{root_dir:T.getAttribute("data-root-dir")||"",revision:Number(T.getAttribute("data-revision")||0)||0}}function $e(T,H){let{root_dir:I,revision:K}=V(T),de=T.getAttribute("data-issue-id")||"",Y=H.dataset.attemptId||T.getAttribute("data-attempt-id")||"",_e=H.classList;if(_e.contains("worker-card__place")){B("worker-queue-place",{bead_id:de,index:Number(T.getAttribute("data-place-index")||0)||0},I,K);return}if(_e.contains("mon-op--up")||_e.contains("mon-op--down")){let be=Number(T.getAttribute("data-queue-index")||0)||0,C=_e.contains("mon-op--up")?be-1:be+1;if(C<0)return;B("worker-queue-reorder",{bead_id:de,to_index:C},I,K);return}if(_e.contains("mon-op--remove")){B("worker-queue-remove",{bead_id:de},I,K);return}if(_e.contains("mon-op--pause")){N("worker-attempt-pause",{attempt_id:Y},I);return}if(_e.contains("mon-op--discard")){if(!d(On(de,"unmerged")))return;R({bead_id:de,...Y?{attempt_id:Y}:{},...H.dataset.operationId?{operation_id:H.dataset.operationId}:{}},I,K);return}if(_e.contains("mon-op--resume")){Qr().then(be=>{if(be!==null)return A("worker-attempt-resume",{attempt_id:Y,...be!==""?{instructions:be}:{}},I,K)});return}if(_e.contains("mon-op--dismiss")){B("worker-attempt-dismiss",{attempt_id:Y},I,K);return}if(_e.contains("worker-mini__merge")){let be=ee(I,de);be?.mismatch&&be.continuation===null?w(I,de,K,be.mismatch):B("worker-merge-queue-add",{bead_id:de},I,K);return}if(_e.contains("worker-mini__merge-cancel")){B("worker-merge-queue-remove",{bead_id:de},I,K);return}if(_e.contains("worker-mini__discard")){let be=H.dataset.discardMode==="merged"?"merged":"unmerged";if(!d(On(de,be)))return;R({bead_id:de,...Y?{attempt_id:Y}:{},...H.dataset.operationId?{operation_id:H.dataset.operationId}:{}},I,K);return}if(_e.contains("worker-mini__revise-fix")){A("worker-revise-fix",{bead_id:de},I,K);return}_e.contains("worker-mini__revise-approve")&&B("worker-revise-approve",{bead_id:de},I,K)}function ge(T){let H=ne;ne=!1;let I=T.target;if(!I||typeof I.closest!="function"||I.closest("dialog")||I.closest("a"))return;let K=I.closest(".mon-running-sort");if(K){T.preventDefault(),_=K.getAttribute("data-sort")==="repo"?"repo":"started",N_(_),he();return}let de=I.closest(".mon-auto-all");if(de){T.preventDefault(),Z(de.getAttribute("data-on")==="true");return}if(I.closest(".mon-merge-all")){T.preventDefault(),fe();return}let _e=I.closest(".mon-ctl--advance");if(_e){T.preventDefault();let{root_dir:re,revision:ve}=V(_e);B("worker-automation-toggle",{on:_e.getAttribute("data-on")==="true"},re,ve);return}let be=I.closest(".mon-ctl--merge-auto");if(be){T.preventDefault();let{root_dir:re,revision:ve}=V(be);B("worker-merge-auto-toggle",{on:be.getAttribute("data-on")==="true"},re,ve);return}let C=I.closest(".mon-card");if(!C)return;let q=I.closest("button");if(q){T.preventDefault(),$e(C,q);return}let X=C.getAttribute("data-issue-id");X&&!H&&(T.preventDefault(),Q(X,C.getAttribute("data-root-dir")||""))}function te(T){let H=T.target;if(!H||typeof H.closest!="function")return;let I=H.closest(".mon-done-range");if(I){f=Ut(I.value)?I.value:Dt,D_(f),he();return}let K=H.closest(".mon-slots__input");if(!K)return;let{root_dir:de,revision:Y}=V(K),_e=Number(K.value);if(!Number.isFinite(_e))return;let be=Math.max(Nn,Math.floor(_e));B("worker-queue-set-slots",{slots:be},de,Y)}e.addEventListener("click",ge),e.addEventListener("change",te),e.addEventListener("dragstart",Ve),e.addEventListener("dragover",Ye),e.addEventListener("dragleave",me),e.addEventListener("drop",ke),e.addEventListener("dragend",xe),s&&typeof s.subscribe=="function"&&(D=s.subscribe(()=>{try{M.clear(),he()}catch{}}));function U(){E!==null&&(clearInterval(E),E=null)}function W(){ie!==null&&(clearTimeout(ie),ie=null)}return{load(){r("load"),he(),E===null&&(E=setInterval(()=>{try{he()}catch{}},q_))},pause(){U()},clear(){U(),W(),D&&(D(),D=null),e.removeEventListener("click",ge),e.removeEventListener("change",te),e.removeEventListener("dragstart",Ve),e.removeEventListener("dragover",Ye),e.removeEventListener("dragleave",me),e.removeEventListener("drop",ke),e.removeEventListener("dragend",xe),e.replaceChildren()}}}function Fc(e,t,r){let n=ct("views:nav"),s=null;function o(l){return d=>{d.preventDefault(),n("click tab %s",l),r.gotoView(l)}}function a(){let l=t.getState(),d=l.view==="worker"||l.view==="monitor"?l.view:"board";return c`
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
    `}function i(){Be(a(),e)}return i(),s=t.subscribe(()=>i()),{destroy(){s&&(s(),s=null),Be(c``,e)}}}var jc=["bug","feature","task","epic","chore"];function Bc(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var Uc=["Critical","High","Medium","Low","Backlog"];function Wc(e,t){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,e.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),a=r.querySelector("#new-priority"),i=r.querySelector("#new-labels"),l=r.querySelector("#new-description"),d=r.querySelector("#new-issue-error"),f=r.querySelector("#btn-cancel"),_=r.querySelector("#btn-create"),m=r.querySelector(".new-issue__close");function x(){o.replaceChildren();let w=document.createElement("option");w.value="",w.textContent="\u2014 Select \u2014",o.appendChild(w);for(let R of jc){let N=document.createElement("option");N.value=R,N.textContent=Bc(R),o.appendChild(N)}a.replaceChildren();for(let R=0;R<=4;R+=1){let N=document.createElement("option");N.value=String(R);let Z=Uc[R]||"Medium";N.textContent=`${R} \u2013 ${Z}`,a.appendChild(N)}}x();function k(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function M(w){s.disabled=w,o.disabled=w,a.disabled=w,i.disabled=w,l.disabled=w,f.disabled=w,_.disabled=w,_.textContent=w?"Creating\u2026":"Create"}function D(){d.textContent=""}function E(w){d.textContent=w}function B(){try{let w=window.localStorage.getItem("beads-ui.new.type");w?o.value=w:o.value="";let R=window.localStorage.getItem("beads-ui.new.priority");R&&/^\d$/.test(R)?a.value=R:a.value="2"}catch{o.value="",a.value="2"}}function ee(){let w=o.value||"",R=a.value||"";w.length>0&&window.localStorage.setItem("beads-ui.new.type",w),R.length>0&&window.localStorage.setItem("beads-ui.new.priority",R)}async function A(){D();let w=String(s.value||"").trim();if(w.length===0){E("Title is required"),s.focus();return}let R=Number(a.value||"2");if(!(R>=0&&R<=4)){E("Priority must be 0..4"),a.focus();return}let N=String(o.value||""),Z=String(l.value||""),fe={title:w};N.length>0&&(fe.type=N),String(R).length>0&&(fe.priority=R),Z.length>0&&(fe.description=Z),M(!0);try{await t("create-issue",fe)}catch{M(!1),E("Failed to create issue");return}ee(),M(!1),k()}return r.addEventListener("cancel",w=>{w.preventDefault(),k()}),m.addEventListener("click",()=>k()),f.addEventListener("click",()=>k()),r.addEventListener("keydown",w=>{w.key==="Enter"&&(w.ctrlKey||w.metaKey)&&(w.preventDefault(),A())}),n.addEventListener("submit",w=>{w.preventDefault(),A()}),{open(){n.reset(),D(),B();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){k()}}}var j_=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function B_(e,t){return vo(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function zc(e,t,r){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?c`<div class="settings-dialog__empty">라벨 없음</div>`:c`<div class="settings-dialog__pills">
            ${t.map(n=>{let s=B_(n,e);return c`<button
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
  `}function Hc(e,t,r){return c`
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
  `}function Gc(e,t){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${j_.map(([r,n])=>c`<label class="settings-dialog__toggle">
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
  `}var U_=[{id:"session",label:"\uC138\uC158",glyph:"\u25C6"},{id:"worker",label:"Worker",glyph:"\u25A4"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}],Nt="";function qt(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Vc(e,t){let{transport:r,policyStore:n,labelOptions:s}=t,o=t.notify||(S=>le(S,"error",4e3)),a=document.createElement("dialog");a.id="settings-dialog",a.className="settings-dialog",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","\uC124\uC815"),e.appendChild(a);let i="session",l=!1,d="",f={},_={},m=[],x=!1,k=null,M={},D="",E="",B=!1,ee=!1,A=!1,w=null;function R(){let S=t.queueStore?.get();return qt(S)?S.runner_catalog:null}function N(){let S=t.queueStore?.get();return qt(S)&&qt(S.execution_defaults)?S.execution_defaults:null}function Z(){let S=t.implPresetStore?.get();return qt(S)&&Array.isArray(S.presets)?S:null}async function fe(){x=!0,Y();try{let S=await r("get-session-defaults",{});f=qt(S?.values)?{...S.values}:{},_={...f},m=Array.isArray(S?.warnings)?S.warnings:[]}catch(S){m=["kv_read_failed"],o(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${S instanceof Error?S.message:String(S)}`)}finally{x=!1,Y()}}async function pe(){let S=Hl(f,_);if(Object.keys(S).length!==0){try{let P=await r("set-session-defaults",{values:S});f=qt(P?.values)?{...P.values}:{},_={...f},m=Array.isArray(P?.warnings)?P.warnings:[]}catch(P){o(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${P instanceof Error?P.message:String(P)}`)}Y()}}function ne(S,P){P===Nt?delete _[S]:_[S]=P,Y(),pe()}async function ie(){let S=t.queueStore?.get();if(!qt(S))return;let P={orchestration_model:S.orchestration_model??null,orchestration_effort:S.orchestration_effort??null,orchestration_speed:S.orchestration_speed??null},ue=Gl(P,{...P,...M});if(Object.keys(ue).length!==0){try{let Ee=await r("worker-queue-set-orchestration-defaults",{expected_revision:S.revision,values:ue});if(Ee&&Ee.applied===!1){o("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}M={}}catch(Ee){o(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${Ee instanceof Error?Ee.message:String(Ee)}`)}Y()}}function Me(S,P){M[S]=P===Nt?null:P,Y(),ie()}async function je(S){let P=t.queueStore?.get();if(!(!qt(P)||S<1)){try{await r("worker-queue-set-slots",{expected_revision:P.revision,slots:S})}catch(ue){o(`slots \uC800\uC7A5 \uC2E4\uD328: ${ue instanceof Error?ue.message:String(ue)}`)}Y()}}function He(){let S={};for(let P of Ul){let ue=_[P];typeof ue=="string"&&ue.length>0&&(S[P]=ue)}return S}async function Ze(){let S=Z();if(!S)return;let P=He();if(Object.keys(P).length===0){o("\uC800\uC7A5\uD560 \uAD6C\uD604 \uAC12\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uAD6C\uD604 \uADF8\uB8F9\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let ue=(S.presets||[]).find(qe=>qe.id===D),Ee=E.trim()||(ue?ue.name:"");if(!Ee){o("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let qe=ue?await r("impl-preset-update",{expected_revision:S.revision,id:ue.id,name:Ee,settings:P}):await r("impl-preset-create",{expected_revision:S.revision,name:Ee,settings:P});if(qe&&qe.applied){if(E="",!ue&&Array.isArray(qe.presets)){let Ae=qe.presets.find(Ge=>Ge.name===Ee);D=Ae?Ae.id:D}Y()}else o("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Y()}catch(qe){o(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${qe instanceof Error?qe.message:String(qe)}`)}}async function Ve(){let S=Z();if(!(!S||D.length===0))try{let P=await r("impl-preset-delete",{expected_revision:S.revision,id:D});P&&P.applied?(D="",Y()):(o("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Y())}catch(P){o(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${P instanceof Error?P.message:String(P)}`)}}async function Ye(){let S=Z();if(!(!S||D.length===0)){try{let P=await r("apply-impl-preset-global",{preset_id:D,expected_revision:S.revision});P&&P.applied?(f=qt(P.values)?{...P.values}:{},_={...f},m=Array.isArray(P.warnings)?P.warnings:[]):P&&P.conflict&&o("\uAD6C\uD604 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(P){o(`\uAD6C\uD604 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${P instanceof Error?P.message:String(P)}`)}Y()}}async function me(){ee=!0,A=!1,Y();try{let S=await r("get-worker-system-prompt",{});!S||typeof S!="object"||Array.isArray(S)?A=!0:w=S}catch{A=!0}finally{ee=!1,Y()}}function xe(){if(B=!B,B&&!w){me();return}Y()}function ke(){let S=rn({loading:ee,error:A});if(S)return S;if(!w)return"";let P=Array.isArray(w.variants)?w.variants:[];return c`<div class="settings-dialog__sp-body">
      ${w.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${w.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${P.map(ue=>c`<div class="settings-dialog__sp-variant" data-variant=${ue.key}>
            <div class="settings-dialog__sp-cond">${ue.condition}</div>
            ${br(ue.label,ue.system_prompt)}
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
    </section>`}function he(S,P,ue,Ee,qe,Ae){let Ge=qe[S]??Nt,We=Ko(S,ue,qe,N(),R()),bt=We.options.find(at=>at.value===Ge),ot=Ge===Nt?We.full_value:bt?.full_value;return c`<select
        class=${Ge===Nt?"settings-dialog__unset":""}
        data-key=${S}
        aria-label=${P}
        title=${ot||""}
        ?disabled=${Ae===!0||We.disabled}
        .value=${jr(String(Ge))}
        @change=${at=>Ee(S,String(at.target.value))}
      >
        <option value=${Nt} ?selected=${Ge===Nt}>
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
      ${Ge===Nt?c`<span class="settings-dialog__source-badge">기본</span>`:""}`}function Q(S,P,ue,Ee,qe,Ae=!1){return c`<div
      class=${`settings-dialog__row${Ae?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${P}</span>
      <span class="settings-dialog__controls">
        ${he(S,P,ue,Ee,qe,Ae)}
      </span>
    </div>`}function V(S,P,ue,Ee,qe){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${P}-on)`}
        ></i>
        ${S}
      </span>
      <span class="settings-dialog__controls">
        ${he(ue,`${S} \uBAA8\uB378`,Ee,ne,_,!1)}
        ${he(qe,`${S} effort`,Ms,ne,_,!1)}
      </span>
    </div>`}function $e(){let S=R(),P=zl(_),ue=_.impl_runtime,Ee=_.impl_model,qe=Z(),Ae=N()?.supported===!0,Ge=Ko("workflow_mode",Rn,_,N(),S);return c`
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
        ${m.length>0?c`<div class="settings-dialog__banner" role="alert">
              워크스페이스 기본값을 일부 읽지 못했습니다 —
              ${m.join(", ")}
            </div>`:""}
        ${Ae?"":c`<div
              class="settings-dialog__banner settings-dialog__banner--projection"
              data-execution-defaults-warning
              role="alert"
            >
              실행 기본값 projection을 확인할 수 없습니다 — 기본값 확인 불가
            </div>`}
        ${x?c`<div class="settings-dialog__empty">불러오는 중…</div>`:c`
              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">워크플로우</div>
                <div class="settings-dialog__row">
                  <span class="settings-dialog__row-label">모드</span>
                  <span class="settings-dialog__controls">
                    <span class="settings-dialog__seg" role="group">
                      <button
                        type="button"
                        data-mode=${Nt}
                        aria-pressed=${String(!_.workflow_mode)}
                        @click=${()=>ne("workflow_mode",Nt)}
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
                ${V("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",Ds,"plan_review_effort")}
                ${V("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",In,"impl_review_effort")}
              </div>

              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">
                  구현
                  <span class="settings-dialog__hint"
                    >이슈 핀이 있으면 핀이 우선합니다</span
                  >
                </div>
                ${Q("impl_dispatch","\uC2E4\uD589 \uBC29\uC2DD",Os,ne,_)}
                ${Q("impl_runtime","\uC704\uC784 \uB300\uC0C1",Ps,ne,_,P)}
                ${Q("impl_model","\uBAA8\uB378",Ns(S,ue),ne,_,P)}
                ${Q("impl_effort","effort",nn(S,ue,Ee),ne,_,P)}
                ${Q("impl_speed","\uC18D\uB3C4",Cn,ne,_,P)}
              </div>

              <div class="settings-dialog__preset-bar">
                <select
                  aria-label="구현 프리셋"
                  .value=${jr(D)}
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
                  .value=${jr(E)}
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
    `}function ge(){let S=t.queueStore?.get(),P=R(),ue={orchestration_model:M.orchestration_model??(qt(S)?S.orchestration_model:null),orchestration_effort:M.orchestration_effort??(qt(S)?S.orchestration_effort:null),orchestration_speed:M.orchestration_speed??(qt(S)?S.orchestration_speed:null)},Ee=qs(P,k),qe=nn(P,k||void 0,ue.orchestration_model||ir).filter(Ge=>Ge!==ir),Ae=qt(S)&&typeof S.slots=="number"?S.slots:2;return c`
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
                .value=${jr(k||Nt)}
                @change=${Ge=>{let We=String(Ge.target.value);k=We===Nt?null:We,Y()}}
              >
                <option value=${Nt} ?selected=${!k}>
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
    `}function te(){let S=n.get();return c`
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
        ${S?c`
              ${zc(S,s(),H)}
              ${Hc(S,d,{onDraft:P=>{d=P},onAdd:I,onRemove:K})}
              ${Gc(S,de)}
            `:c`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function U(S){let P=n.get();if(P)try{let ue=await r("display-policy-set",{expected_revision:P.revision,policy:S(P)});W(ue),ue&&ue.conflict&&ue.policy&&(ue=await r("display-policy-set",{expected_revision:ue.policy.revision,policy:S(ue.policy)}),W(ue)),ue&&ue.conflict&&o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function W(S){S&&S.policy&&typeof S.policy=="object"&&n.set(S.policy)}function T(S){U(S)}function H(S){let P=n.get();if(!P)return;let ue=!W_(S,P);T(Ee=>z_(S,Ee,ue))}function I(){let S=d.trim();S.length!==0&&(d="",T(P=>P.hidden_prefixes.includes(S)?{hidden_prefixes:P.hidden_prefixes}:{hidden_prefixes:[...P.hidden_prefixes,S]}),Y())}function K(S){T(P=>({hidden_prefixes:P.hidden_prefixes.filter(ue=>ue!==S)}))}function de(S){let P=n.get();if(!P)return;let ue=P.chips[S]===!1;T(()=>({chips:{[S]:ue}}))}function Y(){Be(c`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${U_.map(S=>c`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${S.id}
                  aria-selected=${String(i===S.id)}
                  aria-controls=${`settings-pane-${S.id}`}
                  @click=${()=>_e(S.id)}
                >
                  <span class="settings-dialog__glyph">${S.glyph}</span>
                  ${S.label}
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
      `,a)}function _e(S){i=S,Y()}let be=()=>{l=!1,t.onOpenChange?.(!1)};a.addEventListener("close",be),a.addEventListener("cancel",be);let C=S=>{S.target===a&&ve()};a.addEventListener("click",C);let q=null;n.subscribe&&(q=n.subscribe(()=>{l&&Y()}));let X=null;t.implPresetStore?.subscribe&&(X=t.implPresetStore.subscribe(()=>{l&&Y()}));function re(S="session"){l||(l=!0,t.onOpenChange?.(!0),i=S,d="",M={},Y(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),fe())}function ve(){l&&(l=!1,t.onOpenChange?.(!1),typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:re,close:ve,sessionDraft:()=>({..._}),destroy(){l=!1,a.removeEventListener("close",be),a.removeEventListener("cancel",be),a.removeEventListener("click",C),q&&(q(),q=null),X&&(X(),X=null),a.remove()}}}function W_(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(r=>r.length>0&&e.startsWith(r))}function z_(e,t,r){if(!r)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let n=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:n,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:n}}var H_=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function Yc(e){return String(e).padStart(2,"0")}function G_(e,t){let r=Math.max(0,Math.ceil((e-t)/6e4)),n=Math.floor(r/1440),s=Math.floor(r%1440/60),o=r%60;return n>0?`${n}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function V_(e,t=Date.now()){let r=Date.parse(e);if(!Number.isFinite(r))return"";let n=new Date(r),s=new Date(t),o=`${Yc(n.getHours())}:${Yc(n.getMinutes())}`,i=n.getFullYear()===s.getFullYear()&&n.getMonth()===s.getMonth()&&n.getDate()===s.getDate()?o:`${H_[n.getMonth()]} ${n.getDate()} ${o}`;return`${G_(r,t)} \xB7 ${i}`}function Y_(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}var Kc=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage"}];function Zc(e){let t=!1,r=null,n=new Map;function s(){Be(c``,e),e.hidden=!0}function o(){let l=Kc.filter(f=>n.has(f.key));if(l.length===0){s();return}let d=Date.now();Be(c`<div class="usage-meter" aria-label="Usage">
        ${l.map(f=>{let _=n.get(f.key),m=typeof _.ageSeconds=="number"&&_.ageSeconds>600,x=m?`${Math.floor(_.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"";return c`<span
            class="usage-meter__group${m?" usage-meter__group--stale":""}"
            aria-label=${`${f.label} usage`}
          >
            <span class="usage-meter__provider">${f.label}</span>
            ${_.windows.map(k=>{let M=typeof k.pct=="number"&&Number.isFinite(k.pct)?k.pct:0,D=Math.min(100,Math.max(0,M)),B=`resets ${V_(k.resetsAt,d)}${m?` \xB7 ${x}`:""}`;return c`<span
                class="usage-meter__window ${Y_(D)}"
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
      </div>`,e),e.hidden=!1}async function a(l){try{let d=await fetch(l.endpoint);if(!d.ok)return null;let f=await d.json();return!f||f.available!==!0||!Array.isArray(f.windows)?null:f}catch{return null}}async function i(){let l=await Promise.all(Kc.map(async d=>({provider:d,payload:await a(d)})));if(!t){for(let d of l)d.payload?n.set(d.provider.key,d.payload):n.delete(d.provider.key);o()}}return s(),i(),r=setInterval(()=>{i()},6e4),{destroy(){t=!0,r!==null&&(clearInterval(r),r=null),s()}}}function Xc(e){let t=e.attempts?Object.values(e.attempts):[],r=new Map;for(let s of t)s&&r.set(s.bead_id,s.attempt_id);let n=new Map;for(let s of e.done||[])s&&typeof s.bead_id=="string"&&typeof s.added_at=="number"&&n.set(s.bead_id,s.added_at);return s=>{let o=r.get(s.bead_id)!==s.attempt_id,a=n.get(s.bead_id),i=typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at;return!o&&!i&&typeof s.dismissed_at!="number"}}var K_="worker-ineligible";function _a(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function ma(e){return _a(e).includes(K_)}var Z_="worker-serial";function ga(e){return _a(e).includes(Z_)}function ba(e,t,r){if(typeof t!="string"||typeof r!="string")return[];let n=e?.runners;if(!n||!Object.hasOwn(n,t))return[];let s=n[t],o=s?.models;if(!o||!Object.hasOwn(o,r))return[];let a=o[r]?.efforts;return Array.isArray(a)?a.slice():Array.isArray(s.efforts)?s.efforts.slice():[]}var X_=new Set(["done","failed","orphaned","stopped","discarded"]);function Qc(e,t){let{queueStore:r,analysisStore:n,transport:s}=t,o=document.createElement("dialog");o.id="worker-parallel-analysis-dialog",o.className="pa",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),e.appendChild(o);let a=new Map,i=new Map,l=!1,d=null,f=null;function _(){return r&&r.get()||{revision:0,queue:[],serial_lanes:[],serial_lane_count:0,attempts:{},pr_wait:[]}}function m(){return n&&n.get()||{settings:{revision:0,runner:null,model:null,effort:null},job:null,last_good:null}}function x(){let C=_(),q=new Set;for(let X of Object.values(C.attempts||{})){let re=X;re&&typeof re.bead_id=="string"&&!X_.has(re.status)&&q.add(re.bead_id)}for(let X of Array.isArray(C.pr_wait)?C.pr_wait:[])X&&typeof X.bead_id=="string"&&q.add(X.bead_id);for(let X of Object.values(C.discard_operations||{})){let re=X;re&&re.phase!=="done"&&typeof re.bead_id=="string"&&q.add(re.bead_id)}return q}function k(C){return C.filter(q=>M(q)===null)}function M(C){let q=_();for(let X of Array.isArray(q.serial_lanes)?q.serial_lanes:[])if(Array.isArray(X?.entries)&&X.entries.some(re=>re.bead_id===C))return X.id;return(Array.isArray(q.queue)?q.queue:[]).some(X=>X.bead_id===C)?"parallel":null}function D(C,q){let X=a.get(C);return X||[...q.order]}function E(C){if(C.length<2)return!1;let q=M(C[0]);if(!q||q==="parallel")return!1;let X=_(),re=(Array.isArray(X.serial_lanes)?X.serial_lanes:[]).find(S=>S.id===q)?.entries.map(S=>S.bead_id);if(!Array.isArray(re))return!1;let ve=C.map(S=>re.indexOf(S));return ve.every(S=>S>=0)&&ve.every((S,P)=>P===0||S>ve[P-1])}function B(){let C=_(),q=Array.isArray(C.serial_lanes)?C.serial_lanes:[],X=q.find(re=>Array.isArray(re.entries)&&re.entries.length===0);return X?X.id:q[0]?.id||"s1"}function ee(C){let q=_().bead_titles||{};return typeof q[C]=="string"?q[C]:C}async function A(C,q){if(!s||l)return null;l=!0,T();try{return await s(C,q)}finally{l=!1,T()}}async function w(C){n?.setPending?.(!0);try{let q=await A("worker-parallel-analysis-start",{force:C});q&&q.applied===!1&&q.reason&&le(`\uBD84\uC11D \uC2E4\uD328: ${q.reason}`,"error",2800)}finally{n?.setPending?.(!1)}}async function R(){let C=m().job;!s||!C||await s("worker-parallel-analysis-cancel",{job_id:C.job_id})}function N(){return _().runner_catalog}function Z(C){return Object.keys(N()?.runners?.[C]?.models||{})}function fe(C){let q=Z(C),X=N()?.runners?.[C]?.default_model;return typeof X=="string"&&q.includes(X)?X:q[0]||""}function pe(){let C=m().settings,q=d||C.runner||"claude",X=Z(q),re=d?fe(q):C.model||X[0]||"",ve=ba(N(),q,re),S=C.effort||"",P=ve.includes(S)?S:ve[0]||"";return{runner:q,model:re,effort:P,models:X,efforts:ve}}async function ne(C){let q=m().settings,X=await A("worker-parallel-analysis-settings-update",{expected_revision:q.revision,runner:C.runner,model:C.model,effort:C.effort});(!X||X.applied!==!0)&&(d=null,T(),X&&X.reason&&le(`\uBD84\uC11D \uC124\uC815 \uAC70\uBD80: ${X.reason}`,"error",2800))}function ie(C){d=C,T();let q=pe();ne({runner:C,model:q.model,effort:q.effort})}function Me(C){let q=pe(),X=ba(N(),q.runner,C);ne({runner:q.runner,model:C,effort:X.includes(q.effort)?q.effort:X[0]||""})}function je(C){let q=pe();ne({runner:q.runner,model:q.model,effort:C})}async function He(C,q){if(!s||l)return;let X=D(C,q),re=m();if(X.length<2||!re.last_good){le("\uC81C\uCD9C\uD558\uB824\uBA74 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4","warning");return}let ve=i.get(C)||B(),S=()=>({snapshot_digest:re.last_good.identity_digest,group_index:C,lane:ve,ordered_bead_ids:X,expected_revision:_().revision});l=!0,T();try{let P=await s("worker-parallel-analysis-submit",S());P&&P.queue&&r&&r.set(P.queue),P&&P.applied!==!0&&P.conflict===!0&&(P=await s("worker-parallel-analysis-submit",S()),P&&P.queue&&r&&r.set(P.queue)),P&&P.applied===!0?(a.delete(C),le(`\uC9C1\uB82C \uB808\uC778 ${ve}\uC5D0 ${X.length}\uAC1C \uBC30\uCE58`,"success")):le(`\uC81C\uCD9C \uAC70\uBD80: ${P?.reason||"conflict"} (\uD050 \uBB34\uBCC0\uACBD)`,"error",2800)}finally{l=!1,T()}}function Ze(C,q,X){a.set(C,D(C,q).filter(re=>re!==X)),T()}function Ve(C){a.delete(C),T()}function Ye(C,q,X,re){let ve=[...D(C,q)],S=ve.indexOf(X),P=S+re;S<0||P<0||P>=ve.length||(ve.splice(P,0,...ve.splice(S,1)),a.set(C,ve),T())}function me(){let C=m().settings,q=Object.keys(N()?.runners||{}),X=pe();return c`<div class="pa-settings">
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
        >`:""}function $e(){return n?.isPending?.()===!0}function ge(C){let q=_(),X=(Array.isArray(q.queue)?q.queue.length:0)+(Array.isArray(q.serial_lanes)?q.serial_lanes:[]).reduce((P,ue)=>P+(Array.isArray(ue.entries)?ue.entries.length:0),0),re=!!C.job,ve=he(C.settings),S=re||l||$e();return c`<div class="pa-meta">
      <span class="pa-meta__targets">대상 ${X}</span>
      ${C.last_good?c`<span class="pa-meta__at"
            >분석 ${new Date(C.last_good.at||0).toLocaleString()}</span
          >`:c`<span class="pa-meta__at">분석 결과 없음</span>`}
      ${V(C)}
      <button
        type="button"
        class="pa-run"
        ?disabled=${!ve||S}
        @click=${()=>{w(!1)}}
      >
        ✳ 분석
      </button>
      <button
        type="button"
        class="pa-rerun"
        ?disabled=${!ve||S}
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
    </div>`}function te(C,q){let X=D(C,q),re=x(),ve=X.filter(Ae=>re.has(Ae)),S=k(X),P=E(X),ue=Array.isArray(_().serial_lanes)?_().serial_lanes:[],Ee=i.get(C)||B(),qe=q.eligible!==!0||X.length<2||ve.length>0||S.length>0||P||l;return c`<section class="pa-group" data-group-index=${String(C)}>
      <header class="pa-group__head">
        <span class="pa-group__confidence">${q.confidence}</span>
        ${q.categories.map(Ae=>c`<span class="pa-group__category">${Ae}</span>`)}
        ${P?c`<span class="pa-group__applied">✓ 이미 반영됨</span>`:""}
        ${q.eligible===!0?"":c`<span class="pa-group__weak">근거 부족 — 제출 불가</span>`}
        ${S.length>0?c`<span class="pa-group__stale"
              >stale — ${S.join(", ")} 대기 영역 이탈</span
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
    </div>`}function W(){let C=H&&!!m().job;if(C&&f===null){f=setInterval(()=>T(),1e3);return}!C&&f!==null&&(clearInterval(f),f=null)}function T(){let C=m();d&&C.settings.runner===d&&(d=null);let q=C.last_good?.result;W(),Be(c`
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
      `,o)}let H=!1,I=()=>{H=!1,W()},K=C=>{C.target===C.currentTarget&&be()};o.addEventListener("close",I),o.addEventListener("cancel",I),o.addEventListener("click",K);let de=null;r&&r.subscribe&&(de=r.subscribe(()=>{H&&T()}));let Y=null;n&&n.subscribe&&(Y=n.subscribe(()=>{H&&T()}));function _e(){H||(H=!0,T(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function be(){H&&(H=!1,W(),typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:_e,close:be,destroy(){H=!1,f!==null&&(clearInterval(f),f=null),o.removeEventListener("close",I),o.removeEventListener("cancel",I),o.removeEventListener("click",K),de&&(de(),de=null),Y&&(Y(),Y=null),o.remove()}}}var Jc=new Set(["sh","bash","zsh","dash","ksh"]),ed=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function td(e){let t=e.split("/");return t[t.length-1]||""}function Q_(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let r=t.slice(2).trim().split(/\s+/).filter(Boolean);if(r.length===0)return!1;let n=td(r[0]);if(n!=="env")return Jc.has(n);let s=r.slice(1).find(o=>!o.startsWith("-")&&!o.includes("="));return s!==void 0&&Jc.has(td(s))}function J_(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function em(e){let t=[],r=0;ed.lastIndex=0;for(let n of e.matchAll(ed)){let s=n.index;s>r&&t.push({text:e.slice(r,s),kind:"plain"}),t.push({text:n[0],kind:J_(n[0])}),r=s+n[0].length}return r<e.length&&t.push({text:e.slice(r),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function tm(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function rd(e){let t=e.getWorkspacePath,r=e.fetchImpl||globalThis.fetch?.bind(globalThis),n=document.createElement("div");n.className="repo-ops-script-viewer-root",document.body.appendChild(n);let s=null,o="loading",a="",i="",l=0,d=null,f=!1;function _(w,R){return R?em(w).map(N=>N.kind==="plain"?N.text:c`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${N.kind}"
            >${N.text}</span
          >`):w}function m(){if(!s)return c``;let w=o==="ready"&&Q_(a),R=o==="ready"?a.split(`
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
    </div>`}function x(){Be(m(),n)}async function k(){if(o!=="ready")return;let w=await ur(a);le(w?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",w?"success":"error")}function M(w){w.key==="Escape"&&s&&(w.preventDefault(),ee())}function D(){f||(document.addEventListener("keydown",M),f=!0)}function E(){f&&(document.removeEventListener("keydown",M),f=!1)}async function B(w,R=null){let N=++l;D(),s={...w},d=R||(document.activeElement instanceof HTMLElement?document.activeElement:null),o="loading",a="",i="",x(),n.querySelector(".repo-ops-script-viewer__close")?.focus();let fe=t?t():"";if(!fe){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",x();return}if(!r){o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",x();return}let pe="/api/repo-ops-script?workspace="+encodeURIComponent(fe)+"&lane="+encodeURIComponent(w.lane)+"&base_sha="+encodeURIComponent(w.base_sha);try{let ne=await r(pe),ie=await ne.json().catch(()=>({}));if(N!==l)return;if((t?t():"")!==fe){ee();return}if(!ne.ok||!ie||ie.ok!==!0){o="error",i=tm(ie&&typeof ie.error=="string"?ie.error:""),x();return}s={lane:ie.lane,base_sha:ie.base_sha,path:ie.path,base_ref:ie.base_ref},a=String(ie.content),o="ready",x()}catch{if(N!==l)return;o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",x()}}function ee(){l+=1,E(),s=null,a="",x();let w=d;d=null,w?.isConnected&&w.focus()}function A(){ee(),n.remove()}return{open:B,close:ee,destroy:A}}function nd(e){let t=e.queueStore,r=e.transport,n=e.onChanged||(()=>{}),s=e.onOpenScript;function o(){return t&&t.get()||{}}function a(){let A=o();return typeof A.revision=="number"?A.revision:0}function i(A){t&&A&&A.queue&&typeof A.queue=="object"&&t.set(A.queue)}function l(){let A=o().workspace_info;return A&&typeof A=="object"?A:{}}function d(A,w){return c`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${A}"
      >${w}</span
    >`}function f(A){if(typeof A!="number"||!Number.isFinite(A))return"";let w=A/6e4;return Number.isInteger(w)?`timeout ${w}\uBD84`:`timeout ${Math.round(A/1e3)}\uCD08`}function _(A){let w=f(A);return w?d("config",w):""}function m(A,w,R){return c`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${R.script}
      @click=${N=>{s&&s({lane:A,base_sha:w.base_sha,path:R.script,base_ref:w.base_ref},N.currentTarget)}}
    ></button>`}function x(A){let w=typeof A.base_sha=="string"?A.base_sha:"",R=`${A.source_path||"repo-ops/config.toml"} @ ${A.base_ref||"?"}${w?`@${w.slice(0,7)}`:""}`;return c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${R}</span>
      </p>
      <div class="worker-repo-ops__lane" data-lane="verify">
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${A.verify?c`${m("verify",A,A.verify)}
              ${_(A.verify.timeout_ms)}`:c`선언 없음${d("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${A.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
      </div>
      <div class="worker-repo-ops__lane" data-lane="deploy">
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${A.deploy?c`${m("deploy",A,A.deploy)}
              ${_(A.deploy.timeout_ms)}`:c`선언 없음${d("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${A.deploy?c`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
      </div>
    </section>`}function k(A){let w=A.repo_ops&&typeof A.repo_ops=="object"?A.repo_ops:null;return w&&(w.status==="resolved"||w.status==="absent")?x(w):w&&(w.status==="pending"||w.status==="error")?c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
      </details>`}}}var rm=20,sd={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"},od={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8"};function nm(e,t,r=rm){let n=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||n.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||n.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return n.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),n.slice(0,Math.max(0,r))}function ad(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function sm(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"repairing":return"\uC790\uB3D9 \uD574\uACB0 \uC911";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function id(e){let t=e.filter(r=>r.value);return t.length===0?"":c`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(r=>c`<div>
            <dt>${r.term}</dt>
            <dd>${r.value}</dd>
          </div>`)}
    </dl>
  </details>`}function ld(e,t="",r=!1){return!e&&!t?"":c`<p
    class="worker-ev__explain${r?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?c`<br />${t}`:""}
  </p>`}function om(e){if(e.state!=="failed"||e.superseded_by)return"";let t=e.repair||{},r=typeof t.remaining=="number"?t.remaining:0,n=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"",s=r<=0;return c`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
      data-operation-id=${e.operation_id}
      data-failure-kind=${e.failure_kind||""}
      title="해결 세션을 엽니다"
    >
      ${Object.hasOwn(od,n)?od[n]:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC2DC\uC791"}
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
  </div>`}function am(e){let t=e.operation,r=t.state==="failed",n=t.failure?t.failure.code:"";return c`<li
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
      ><span class="worker-ev__dot worker-ev__dot--${ad(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(sd,t.kind)?sd[t.kind]:t.kind}</span
        >
        <span class="worker-ev__meta"
          >${t.target_base}@${Bs(t.target_sha)}${typeof t.elapsed_ms=="number"?` \xB7 ${Us(t.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${ad(e)}"
          >${sm(e)}</span
        >
        ${t.dismissed?c`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${t.superseded_by?c`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
      </div>
      ${r?ld(vc(t.failure_kind,n)):""}
      ${om(t)}
      ${id([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?n:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${Bs(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function im(e){let t=e.cleanup,r=Br(t.step);return c`<li
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
        ${_c(t.step).map(n=>c`<li
              class="worker-step worker-step--${n.state}"
              data-step=${n.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${n.label}</span>
            </li>`)}
      </ol>
      ${ld(Ys(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
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
      ${id([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function lm(e){return c`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(t=>t.type==="cleanup"?im(t):am(t))}
        </ul>`}
  </section>`}function cd(e,t={}){let r=null;function n(){Be(r?lm(r):c``,e)}e.addEventListener("click",a=>{a.target?.closest?.('[data-seam="repo-ops-close"]')&&o()});function s(a){r={events:nm(a.operations,a.cleanup_failures),repo:a.repo||""},n()}function o(){r!==null&&(r=null,n(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>r!==null,refresh(a){r&&s(a)}}}var cm="tab:worker:ready",dm="tab:worker:blocked",um="tab:worker:in-progress",pm="tab:worker:closed",Zs=1,dd=5;function ud(e){return Tn(e).path.length>0}var _d="beads-ui.worker.candidate-filter",ha={show_blocked:!1,spec:"all"};function fm(){try{let e=window.localStorage.getItem(_d);if(!e)return{...ha};let t=JSON.parse(e);if(!t||typeof t!="object")return{...ha};let r=t.spec;return{show_blocked:t.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...ha}}}function _m(e){try{window.localStorage.setItem(_d,JSON.stringify(e))}catch{}}function mm(e,t){let r=i=>t.show_blocked||!i.blocked,n=i=>t.spec==="all"||(t.spec==="with"?i.has_spec:!i.has_spec),s=[],o=0,a=0;for(let i of e){let l=r(i),d=n(i);l&&d?s.push(i):!l&&d?o+=1:l&&!d&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var gm=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],md="bdui.worker.candidate_sort",bm=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],Xs="spec";function hm(){try{let e=window.localStorage.getItem(md);return e==="board"||e==="created"||e==="spec"?e:Xs}catch{return Xs}}function vm(e){try{window.localStorage.setItem(md,e)}catch{}}var gd="bdui.worker.done-range";function ym(){try{let e=window.localStorage.getItem(gd);return Ut(e)?e:Dt}catch{return Dt}}function wm(e){try{window.localStorage.setItem(gd,e)}catch{}}var km="(max-width: 640px)",bd="beads-ui.worker.lane-collapsed",jn={queue:!0,done:!0};function $m(){try{let e=window.localStorage.getItem(bd);if(!e)return{...jn};let t=JSON.parse(e);return!t||typeof t!="object"?{...jn}:{queue:typeof t.queue=="boolean"?t.queue:jn.queue,done:typeof t.done=="boolean"?t.done:jn.done}}catch{return{...jn}}}function xm(e){try{window.localStorage.setItem(bd,JSON.stringify(e))}catch{}}function pd(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let r=typeof t.title=="string"?t.title:t.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function Sm(e,t,r){let n=Array.isArray(e)?e.slice():[];return t==="created"?n.sort(Mr):(n.sort(ns(r)),t==="board"?n:[...n.filter(ud),...n.filter(s=>!ud(s))])}function Am(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function Em(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Tm(e){let t=e?.blocked_info;if(t&&typeof t=="object"){let s=Array.isArray(t.blockers)?t.blockers.filter(o=>typeof o=="string"&&o.length>0):[];return s.length>0?`\u{1F512} ${s.join(", ")}`:"\u{1F512} blocked"}let n=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(s=>{if(typeof s=="string")return s;if(!s||typeof s!="object")return"";let o=s.type??s.dependency_type;return o!==void 0&&o!=="blocks"?"":s.depends_on_id||s.id||""}).filter(Boolean);return n.length>0?`\u{1F512} ${n.join(", ")}`:"\u{1F512} blocked"}function fd(e){switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function Cm(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function Rm(e){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let t=e.slice(19);return t.length===0?null:t==="needs_human"?"\uC644\uB8CC \uC758\uB3C4 \uB300\uAE30 \u2014 \uC0AC\uB78C \uD655\uC778 \uD544\uC694":`\uC644\uB8CC \uC758\uB3C4 \uB300\uAE30 \u2014 ${t}`}function Im(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function Lm(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"implementation review \uB300\uAE30",live:!1,alert:!1};case"reviewing":return{badge:"implementation review \uC911",live:!0,alert:!1};case"revising":return{badge:"review \uC218\uC815 \uC911 \xB7 1\uD68C",live:!0,alert:!1};case"failed":{let r=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:r.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${r.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",live:!1,alert:!0}}default:return null}}function va(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function Om(e){if(!e||typeof e!="object")return null;let t=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,n=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,s=n&&typeof n.pr_number=="number"?n.pr_number:null,o="";switch(e.phase){case"gating":o="root \uC7AC\uAC80\uC99D \uC911";break;case"repairing":o=e.subject_role==="root"?`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 \uC6D0 PR \uC218\uC815 \uC911`:`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 repair PR \uC900\uBE44 \uC911`;break;case"waiting_repair_pr":o=s?`repair PR #${s} \uB300\uAE30`:"repair PR \uB300\uAE30";break;case"merging":o=e.subject_role==="repair"?s?`repair PR #${s} \uBA38\uC9C0 \uC911`:"repair PR \uBA38\uC9C0 \uC911":"root \uBA38\uC9C0 \uC911";break;case"cleaning":o="\uC815\uB9AC \uBCF5\uAD6C \uC911";break;case"paused":o="\uC790\uB3D9\uBCF5\uAD6C \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":o=`\uC0AC\uB78C \uD655\uC778 \uD544\uC694 \xB7 ${e.terminal_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`;break;case"completed":return null;default:return null}let a=[o,`\uBCF5\uAD6C \uC138\uC158 ${t}/${r}`];return e.head_sha&&a.push(`head ${e.head_sha}`),e.base_sha&&a.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&a.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`),e.active_attempt_id&&a.push(`attempt ${e.active_attempt_id}`),n&&typeof n.bead_id=="string"&&a.push(`repair ${n.bead_id}`),e.evidence&&a.push(e.evidence),e.log_path&&a.push(e.log_path),{badge:o,title:a.join(`
`),alert:e.phase==="needs_human",lock_actions:e.phase!=="paused"&&e.phase!=="needs_human",repair_pr_url:n&&typeof n.pr_url=="string"?n.pr_url:"",repair_pr_number:s}}function Pm(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",r=(n,s={})=>{let o=[s.title||"",t].filter(Boolean);return{label:n,title:o.join(`
`),live:s.live===!0,alert:s.alert===!0}};return e.continuation_required?r("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0}):e.merge_step?e.gate?.tier==="merged"?r("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):r("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0}):e.conflict_badge?r(e.conflict_badge,{live:e.conflict_live===!0}):e.head_review&&e.head_review.state!=="failed"?r("\uB9AC\uBDF0 \uC9C4\uD589 \uC911",{title:e.head_review.badge,live:e.head_review.live===!0}):e.recovery?.lock_actions?r("\uC790\uB3D9\uBCF5\uAD6C \uC911",{title:e.recovery.title,live:!0}):e.cleanup_failed?r(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0}):e.base_exception?r("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0}):e.conflicting?r("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0}):e.gate?.reason==="base_behind"?r("base \uAC31\uC2E0 \uD544\uC694",{alert:!0}):e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale"?r("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2C8\uAC70\uB098 \uC870\uC0C1 \uD655\uC778\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uB85C, \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB9AC\uBDF0\uD574\uC57C \uBA38\uC9C0\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",alert:!0}):e.gate?.reason==="spec_id_missing"?r("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0}):e.gate?.reason==="review_receipt_invalid"?r("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0}):e.head_review?.state==="failed"?r("\uB9AC\uBDF0 \uC2E4\uD328",{title:e.head_review.failure_reason||"",alert:!0}):e.recovery?r(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?r("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?r(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${fd(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?r(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${fd(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?r(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?r("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?r("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?r("\uB2EB\uD798",{alert:!0}):e.activity?r("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?r("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?r("\uD655\uC778 \uC911"):e.gate?.gate_badge?r(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function Dm(e,t,r,n,s=null,o=null,a=null,i=!1,l=null,d=!0,f=null,_=null,m=null,x={},k=!1,M=!1,D={}){let E=!!l&&l.position>0,B=!!l?.continuation_action&&l.continuation_action.continuation===null,ee=!!l&&l.active===!0,A=l&&l.failure||null,w=Rm(l?l.waiting:null),R=r[e]||null,N=R&&R.gate?R.gate:null,Z=R&&R.pr?R.pr:null,fe=Om(m),pe=Im(l?l.resolution:null),ne=Lm(l?l.head_review:null),ie=l&&l.head_review||null,Me=l&&l.authority||null,je=!!ie&&["pending","reviewing","revising"].includes(ie.state),He=E&&!ee&&(ie?.state==="failed"||!Me||Me.source==="automatic"&&!M),Ze=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":pe?pe.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":w,Ve=!!N&&N.base_badge==="\uCDA9\uB3CC",Ye=!!N&&N.enabled===!0,me=Mn({bead_id:e,merge_sha:D.merge_sha,cleanup_cursor:D.cleanup_cursor,merge_progress:o&&o.merge_progress?o.merge_progress:null,cleanup_failed:n,repo_operations:D.repo_operations}),xe=Vs(me),ke=!!n&&["child_sweep","branch_cleanup","parent_close"].includes(n.step)&&!!N&&N.tier==="merged",Le=i&&!!n&&!!N&&N.tier==="merged",he=He&&(Ye||Ve||N?.reason==="base_behind"||N?.reason==="review_receipt_missing"||N?.reason==="review_receipt_stale"||ke||Le),Q=i&&Ve&&d===!1,V=lr(x,e,{external:i,merge_active:ee||me?.step==="merge",merge_queued:E,conflict_active:!!a,cleanup_active:xe,merged:!!n||N?.tier==="merged"}),$e=!!V.operation,ge=!ke&&!!n&&n.step==="repo_operations",te=Pm({continuation_required:B,merge_step:me,conflict_badge:Ze,conflict_live:pe?.live===!0||a==="running",head_review:ie&&ne?{...ne,state:ie.state,failure_reason:ie.failure_reason}:null,recovery:fe,cleanup_failed:n,cleanup_label:n?Br(n.step):null,base_exception:_,conflicting:Ve,gate:N,queue_failure:A,auto_skip:f,queued:E,queue_active:ee,queue_position:l?l.position:0,activity:Ze?null:o&&o.activity||null}),U=te?.live===!0&&te.title?c`<span title=${te.title}>${te.label}</span>`:te?.label||null;return{id:e,title:i?c`${t}<span class="muted"> · 세션</span>`:t,reason:n&&me?.active!==!0?Gs(n.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:k,external:i,pr_number:Z&&typeof Z.number=="number"?Z.number:null,pr_url:Z&&typeof Z.url=="string"?Z.url:"",completion_badge:te?.live!==!0&&te?.title?te.label:null,completion_title:te?.title||"",completion_repair_pr_url:fe?fe.repair_pr_url:"",completion_repair_pr_number:fe?fe.repair_pr_number:null,badges:U?[U]:[],live_badge:te?.live===!0?U:null,usage:s,alert:te?.alert===!0,merge_action:N?.tier==="merged"&&!ke&&!Le||ge?!1:!E||B||He,timeline_action:ge,cancel_action:E&&!B,cancel_enabled:(!ee||je)&&!(fe&&fe.lock_actions),cancel_title:fe&&fe.lock_actions?"\uC790\uB3D9\uBCF5\uAD6C \uC911 \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694":ee&&!je?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":je?"review \uC9C4\uD589\uC744 \uCDE8\uC18C\uD558\uACE0 \uBA38\uC9C0 \uAD8C\uD55C\uC744 \uD3D0\uAE30\uD569\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:V,discard_action:V.action,merge_step:me,discard_enabled:V.enabled,discard_title:V.title,merge_enabled:!me&&!a&&!$e&&!_&&!(fe&&fe.lock_actions)&&!Q&&!ge&&(Ye||Ve||N?.reason==="base_behind"||N?.reason==="review_receipt_missing"||N?.reason==="review_receipt_stale"||ke||Le||he),merge_label:B?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":ke||Le?"\uC815\uB9AC \uC7AC\uAC1C":Ve&&!me&&!ke?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":N?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":N?.reason==="review_receipt_missing"||N?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":He?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:$e?V.error?`\uD3D0\uAE30 \uC2E4\uD328: ${V.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${V.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:B?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":me?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${me.label}`:Le?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Q?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":ke?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Ve?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":N?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":N?.reason==="review_receipt_missing"||N?.reason==="review_receipt_stale"?"\uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":N?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":Ye?`\uBA38\uC9C0 (${N.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:N&&N.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${N&&N.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function ya(e,t={}){let{transport:r,issueStores:n,queueStore:s,analysisStore:o,sessionLogStore:a,uiOrderStore:i,gotoIssue:l,getWorkspacePath:d,doneRange:f,onDoneRangeChange:_}=t,m=n?os(n,i):null,x=is({transport:r,uiOrderStore:i}),k=null,M=[],D=fm(),E=hm(),B=Ut(f)?f:ym(),ee=new Map;function A(){let p=sr.find(v=>v.value===B);return p?p.label:"\uC624\uB298"}let w=$m(),R=!1,N=new Set,Z=new Set,fe=new Set,pe=new Set,ne=[],ie=document.createElement("div");ie.className="worker-console";let Me=document.createElement("div");Me.className="worker-top";let je=document.createElement("div");je.className="worker-drawer-overlay",je.hidden=!0;let He=document.createElement("div");He.className="worker-drawer-overlay__backdrop";let Ze=document.createElement("div");Ze.className="worker-drawer-host";let Ve=document.createElement("div");Ve.className="worker-drawer-host",Ve.hidden=!0,je.append(He,Ze,Ve);let Ye=document.createElement("div");Ye.className="worker-lanes-host",ie.append(Me,je,Ye),e.appendChild(ie);let me=null,xe=Rs(Ze,{transport:r,sessionLogStore:a,onClose:()=>{me=null,je.hidden=!0,ce()}}),ke=cd(Ve,{onClose:()=>{Ve.hidden=!0,je.hidden=!0,ce()}}),Le=rd({getWorkspacePath:d||(()=>"")}),he=d&&d()||"",Q=nd({queueStore:s,transport:r,onChanged:()=>ce(),onOpenScript:(p,v)=>{Le.open(p,v)}}),V=o?Qc(ie,{queueStore:s,analysisStore:o,transport:r}):null;function $e(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:Zs,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function ge(){let p=$e();return typeof p.revision=="number"?p.revision:0}function te(p){p&&p.queue&&s&&s.set(p.queue)}function U(){let p=$e().queue;return Array.isArray(p)?p.length:0}async function W(p,v,F){if(!r)return;let se=()=>({bead_id:p,...v==="parallel"?{}:{lane:v},index:F,expected_revision:ge()}),j=await r("worker-queue-place",se());te(j),j&&j.conflict&&await r("worker-queue-place",se()).then(te)}async function T(p,v,F){if(!r)return;let se=()=>({bead_id:p,...v==="parallel"?{}:{lane:v},to_index:F,expected_revision:ge()}),j=await r("worker-queue-reorder",se());te(j),j&&j.conflict&&await r("worker-queue-reorder",se()).then(te)}async function H(p){if(!r)return;let v=await r("worker-queue-remove",{bead_id:p,expected_revision:ge()});te(v),v&&v.conflict&&await r("worker-queue-remove",{bead_id:p,expected_revision:ge()}).then(te)}async function I(p){if(!r||!p)return;let v=await r("worker-attempt-pause",{attempt_id:p});v&&v.paused===!1&&v.reason&&le(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${v.reason}`,"error",2400)}async function K(p){if(!r||!p)return;let v=await Qr();if(v===null)return;let F=async(j={})=>await r("worker-attempt-resume",{attempt_id:p,expected_revision:ge(),...v!==""?{instructions:v}:{},...j}),se=await F();te(se),se&&se.conflict&&(se=await F(),te(se)),se=await pr(se,(j,h)=>F({continuation:j,decision_token:h}),{onResult:te,refresh:()=>F()}),se&&se.resumed===!1&&!se.conflict&&se.reason&&le(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${se.reason}`,"error",2400)}async function de(p){if(!r||!p)return;let v=await r("worker-attempt-dismiss",{attempt_id:p,expected_revision:ge()});te(v),v&&v.conflict&&(v=await r("worker-attempt-dismiss",{attempt_id:p,expected_revision:ge()}),te(v)),v&&v.dismissed===!1&&!v.conflict&&v.reason&&le(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${v.reason}`,"error",2400)}async function Y(p,v,F=!0){if(!r)return null;let se=r,j=await se(p,{...v,expected_revision:ge()});return te(j),j&&j.conflict&&F&&(j=await se(p,{...v,expected_revision:ge()}),te(j)),j}async function _e(p){if(!r||!p)return;let v=$e().merge_queue?.find(se=>se.bead_id===p)?.continuation_action;if(v?.mismatch&&v.continuation===null){await C(p,v.mismatch);return}N.add(p),ce();let F;try{F=await Y("worker-merge-queue-add",{bead_id:p})}finally{N.delete(p),ce()}!F||F.conflict||F.applied||le(Cm(F.reason),"error",2400)}async function be(p){if(!(!r||!p||Z.has(p))){Z.add(p),ce();try{let v=await r("worker-cleanup-retry",{bead_id:p,expected_revision:ge()});te(v),v&&!v.retried&&!v.conflict&&v.reason&&le(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${v.reason}`,"error",2400)}finally{Z.delete(p),ce()}}}async function C(p,v){let F=await pr({continuation_mismatch:v},(j,h)=>Y("worker-merge-queue-add",{bead_id:p,continuation:j,decision_token:h},!1)),se=F?.queue?.merge_queue?.find(j=>j.bead_id===p)?.continuation_action;if(F?.applied!==!0&&se?.continuation===null&&se.mismatch){await C(p,se.mismatch);return}F&&F.applied===!1&&!F.conflict&&le("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function q(p){if(!r)return;let v=await Y("worker-merge-auto-toggle",{on:p});!v||v.conflict||le(p?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",p?"success":"info",2400)}async function X(p){if(!r||!p)return;let v=await Y("worker-merge-queue-remove",{bead_id:p});v&&!v.conflict&&!v.applied&&v.reason==="merge_active"&&le("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function re(){await Y("worker-merge-queue-remove",{all:!0})}async function ve(p,v=null,F="unmerged",se=null){if(!r||!p)return;let j=On(p,F);if(!(!!se||typeof globalThis.confirm!="function"||globalThis.confirm(j)))return;let L=await r("worker-discard",{bead_id:p,...v?{attempt_id:v}:{},...se?{operation_id:se}:{},expected_revision:ge()});if(te(L),L&&L.conflict&&(L=await r("worker-discard",{bead_id:p,...v?{attempt_id:v}:{},...se?{operation_id:se}:{},expected_revision:ge()}),te(L)),L&&L.discarded===!0){le(zs(L),"success",5e3);return}if(L&&L.reason){le(`\uD3D0\uAE30 \uC2E4\uD328: ${L.reason}`,"error",2800);return}if(L&&L.accepted&&L.pending==="merged_revert"){le("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(L&&L.accepted&&!L.discarded){le(`\uD3D0\uAE30 \uC9C4\uD589: ${L.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}L&&!L.conflict&&le("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function S(p,v,F){if(!(!r||!v||!F||pe.has(v))){pe.add(v),ce();try{let se=await r(p,{bead_id:v,action_id:F,expected_revision:ge()});te(se),se?.conflict?le("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!se?.ok&&se?.reason&&le(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(se.reason)}`,"error",2800)}finally{pe.delete(v),ce()}}}async function P(p,v){if(!r||!v||fe.has(v))return;fe.add(v),ce();let F;try{let se=async(j={})=>await r(p,{bead_id:v,expected_revision:ge(),...j});F=await se(),te(F),F&&F.conflict&&(F=await r(p,{bead_id:v,expected_revision:ge()}),te(F)),p==="worker-revise-fix"&&(F=await pr(F,(j,h)=>se({continuation:j,decision_token:h}),{onResult:te,refresh:()=>se()}))}finally{fe.delete(v),ce()}if(!(!F||F.conflict)){if(F.ok){le(p==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}le(`\uCC98\uBD84 \uAC70\uBD80: ${F.reason||""}`,"error",3e3)}}async function ue(p){if(!r)return;let v=await r("worker-automation-toggle",{on:p,expected_revision:ge()});te(v),v&&v.conflict&&await r("worker-automation-toggle",{on:p,expected_revision:ge()}).then(te)}async function Ee(p){if(!r||!p)return;let v=await r("worker-repo-operation-repair",{operation_id:p});if(te(v),v&&v.ok===!1){le(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${v.reason||""}`,"error",3e3);return}v&&v.ok===!0&&le("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function qe(p){if(!r||!p)return;let v=await r("worker-repo-operation-dismiss",{operation_id:p});te(v),v&&v.ok===!1&&le(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${v.reason||""}`,"error",3e3)}async function Ae(p){if(!r||!Number.isFinite(p))return;let v=Math.max(Zs,Math.floor(p)),F=await r("worker-queue-set-slots",{slots:v,expected_revision:ge()});te(F),F&&F.conflict&&await r("worker-queue-set-slots",{slots:v,expected_revision:ge()}).then(te)}async function Ge(p){if(!r||!Number.isInteger(p)||p<1||p>dd)return;let v=$e(),F=(Array.isArray(v.serial_lanes)?v.serial_lanes:[]).slice(p).reduce((h,L)=>h+(Array.isArray(L?.entries)?L.entries.length:0),0),se=()=>({count:p,expected_revision:ge()}),j=await r("worker-queue-set-serial-lane-count",se());te(j),j&&j.conflict&&(j=await r("worker-queue-set-serial-lane-count",se()),te(j)),j&&j.applied&&F>0&&le(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${F}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}function We(){let p=$e(),v=m?m.selectBoardColumn(cm,"ready"):[],F=m?m.selectBoardColumn(dm,"blocked"):[],se=m?m.selectBoardColumn(pm,"closed"):[],j=m?m.selectBoardColumn(um,"in_progress"):[],h=new Map;for(let g of j){let O=Em(g);if(!O)continue;let ae=h.get(O);ae?ae.push(g):h.set(O,[g])}let L=g=>{let O=as(h.get(g)||[]);return O?O.title||O.id:null},oe=p.bead_titles||{},Re=new Map;for(let[g,O]of Object.entries(oe))typeof O=="string"&&O.length>0&&Re.set(g,O);for(let g of[...v,...F])Re.set(g.id,g.title||g.id);let rt=p.bead_times&&typeof p.bead_times=="object"&&!Array.isArray(p.bead_times)?p.bead_times:{},Fe=p.bead_labels&&typeof p.bead_labels=="object"&&!Array.isArray(p.bead_labels)?p.bead_labels:{},Qe=new Map;for(let[g,O]of Object.entries(Fe))Array.isArray(O)&&Qe.set(g,ga(O));for(let g of[...v,...F]){let O=g.labels;Array.isArray(O)&&!Qe.has(g.id)&&Qe.set(g.id,ga(O))}let gt=new Map,b=o?.get()?.last_good?.result?.groups;for(let g of Array.isArray(b)?b:[]){if(g?.eligible!==!0||!Array.isArray(g.members))continue;let O=g.members.map(Ne=>{let lt=(Array.isArray(p.serial_lanes)?p.serial_lanes:[]).find(Yt=>Yt.entries.some(At=>At.bead_id===Ne));return lt?lt.id:null});if(!(O.every(Ne=>Ne!==null)&&new Set(O).size===1))for(let Ne of g.members)gt.set(Ne,g.members.filter(lt=>lt!==Ne))}let u=p.bead_blocked_by&&typeof p.bead_blocked_by=="object"&&!Array.isArray(p.bead_blocked_by)?p.bead_blocked_by:{},$=new Map;for(let[g,O]of Object.entries(rt))O&&typeof O=="object"&&$.set(g,O);for(let g of[...v,...F])$.set(g.id,{created_at:g.created_at,updated_at:g.updated_at});let y=g=>$.get(g)||{},G=p.pr_wait||[],Se=p.pr_observations||{},Ce=p.pr_activity||{},ze=p.cleanup_failed||{},De=Object.entries(ze).map(([g,O])=>({bead_id:g,step:O&&O.step?O.step:"",reason:O&&O.reason?O.reason:"",at:O&&typeof O.at=="number"?O.at:null,detail:O&&typeof O.detail=="string"?O.detail:null,output_tail:O&&typeof O.output_tail=="string"&&O.output_tail?O.output_tail:void 0,log_path:O&&typeof O.log_path=="string"&&O.log_path?O.log_path:void 0,retry_count:O&&typeof O.retry_count=="number"&&Number.isInteger(O.retry_count)&&O.retry_count>0?O.retry_count:0,failure_code:O&&typeof O.failure_code=="string"?O.failure_code:void 0,subject_id:O&&typeof O.subject_id=="string"?O.subject_id:void 0,repair_eligible:!!(O&&O.repair_eligible),repair:O&&O.repair?O.repair:void 0})),pt=p.queue||[],Ie=new Set([...pt.map(g=>g.bead_id),...(Array.isArray(p.serial_lanes)?p.serial_lanes:[]).flatMap(g=>(Array.isArray(g?.entries)?g.entries:[]).map(O=>O.bead_id)),...G.map(g=>g.bead_id),...p.done.map(g=>g.bead_id)]),_t=new Set(F.map(g=>g.id)),on=i?i.get()?.order||{}:{},xa=new Set,Sa=[];for(let g of[...v,...F])Ie.has(g.id)||xa.has(g.id)||Am(g)||Object.hasOwn(g,"labels")&&ma(g.labels)||(xa.add(g.id),Sa.push(g));M=Sm(Sa,E,on);let Rd=p.admission||{},Aa=g=>{let O=Rd[g];if(!O)return"";if(O.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let ae=typeof O.reason=="string"?O.reason:"",Ne=ae.indexOf(":");return Ne>0&&Ne<ae.length-1?`\u26D4 ${ae.slice(0,Ne)} (${ae.slice(Ne+1)})`:`\u26D4 ${ae}`},Id=M.map(g=>{let O=Tn(g),ae=O.path.length>0,Ne=g.workflow?.route==="quick_fix"||g.metadata&&g.metadata.route==="quick_fix",lt=!Object.hasOwn(g,"description")||typeof g.description=="string"&&g.description.trim().length>0,At=!(Object.hasOwn(g,"labels")&&ma(g.labels))&&(Ne?lt:ae&&!O.conflict),st=_t.has(g.id),Kt=[];st&&Kt.push(Tm(g)),Ne&&!lt?Kt.push("missing_description"):!Ne&&O.conflict?Kt.push("spec_id_conflict"):!Ne&&!ae&&Kt.push("spec \uC5C6\uC74C");let Yn=Aa(g.id);return Yn&&Kt.push(Yn),{id:g.id,title:g.title||g.id,reason:Kt.join(" \xB7 "),draggable:At,lane:"candidate",created_at:g.created_at,updated_at:g.updated_at,workflow:g.workflow,is_quick_fix:Ne,status:g.status,blocked:st,has_spec:ae}}),Qs=mm(Id,D),Ld=Qs.visible,Od=p.revise_parked||{},Bn=p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},Js=(g,O)=>g.map((ae,Ne)=>{let lt=O!=="done",Yt=O!=="done"&&O!=="queue",At=lt?Od[ae.bead_id]:null,st=lt?lr(Bn,ae.bead_id):null,Kt=st?.operation?st:null,Yn=lt&&Qe.get(ae.bead_id)===!0,Za=u[ae.bead_id]||[],so=p.admission&&typeof p.admission=="object"?p.admission[ae.bead_id]:null,oo=lt?pc(so,!!Kt||pe.has(ae.bead_id)):null,Gd=lt&&!oo?Aa(ae.bead_id):null,Vd=lt?[Gd]:[],Xa=lt&&Za.length>0&&typeof so?.reason=="string"&&so.reason.startsWith("not_ready")?[`\u23F8 ${Za.join(", ")} \uC644\uB8CC \uB300\uAE30 (blocks)`]:[],ao=lt?gt.get(ae.bead_id):void 0;return ao&&ao.length>0&&Xa.push(`\u2733 serial \uAD8C\uC7A5 \xB7 ${ao.join(", ")}\uC640`),{id:ae.bead_id,title:Re.get(ae.bead_id)||ae.bead_id,reason:Vd.filter(Boolean).join(" \xB7 "),draggable:lt&&!Kt&&!oo,done:O==="done",lane:O,seq:Yt?Ne+1:void 0,worker_serial:Yn,discard:Kt,stale_work:oo,badges:[...Xa,...At?["\u23F8 REVISE \uD30C\uD0B9"]:[]],alert:!!At,revise_action:!!At,revise_enabled:!!At&&!Kt&&!fe.has(ae.bead_id),revise_title:At?At.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${At.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:O==="done"?Wt(p.attempts||{},ae.bead_id):null,work_ms:O==="done"?dc(p.attempts||{},ae.bead_id):null,done_at:O==="done"&&typeof ae.added_at=="number"?ae.added_at:void 0,...y(ae.bead_id)}}),Wr=p.attempts?Object.values(p.attempts):[],eo=new Set;for(let g of Wr)g&&typeof g.resumed_from=="string"&&g.resumed_from.length>0&&eo.add(g.resumed_from);let Ea=new Map;for(let g of Wr)Ea.set(g.bead_id,g.attempt_id);let Un=new Map;for(let g of Wr)Un.set(g.attempt_id,g);function to(g){let O=new Set,ae=g;for(;ae&&!O.has(ae.attempt_id);){if(ae.conflict_resolution===!0)return!0;O.add(ae.attempt_id),ae=typeof ae.resumed_from=="string"&&ae.resumed_from.length>0&&Un.get(ae.resumed_from)||null}return!1}let Wn=typeof p.declared_base=="string"?p.declared_base:null;function Pd(g){let O=null;for(let ae of Wr)!ae||ae.bead_id!==g||to(ae)||(O===null||(typeof ae.started_at=="number"?ae.started_at:0)>=(typeof O.started_at=="number"?O.started_at:0))&&(O=ae);return O&&typeof O.target_base=="string"?O.target_base:null}let Ta=[],Ca=[],Dd=Xc(p),Ra=g=>{let O=typeof g.session_id=="string"&&g.session_id.length>0,ae=eo.has(g.attempt_id);return{eligible:O&&!ae,reason:O?ae?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},Vt=null;for(let g of Wr){let O=g.status==="paused"&&!eo.has(g.attempt_id);if(g.status==="running"||O)Ca.push({bead_id:g.bead_id,attempt_id:g.attempt_id,title:Re.get(g.bead_id)||g.bead_id,runner:g.runner||null,model:g.model||null,effort:g.effort||null,speed:g.speed||null,continuation_mode:g.continuation_mode||null,started_at:typeof g.started_at=="number"?g.started_at:null,resumed_from:g.resumed_from||null,paused:O,conflict_resolution:to(g),base_exception:va(Wn,g.target_base),can_pause:typeof g.session_id=="string"&&g.session_id.length>0,discard:lr(Bn,g.bead_id,{attempt_id:g.attempt_id}),usage:Wt(p.attempts||{},g.bead_id),current_child:L(g.bead_id),...y(g.bead_id)});else if((g.status==="failed"||g.status==="orphaned")&&Dd(g)){let ae=Ra(g);Ta.push({bead_id:g.bead_id,attempt_id:g.attempt_id,title:Re.get(g.bead_id)||g.bead_id,runner:g.runner||null,model:g.model||null,effort:g.effort||null,speed:g.speed||null,continuation_mode:g.continuation_mode||null,started_at:typeof g.started_at=="number"?g.started_at:null,resumed_from:g.resumed_from||null,failed:!0,status:g.status,status_label:g.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:lr(Bn,g.bead_id,{attempt_id:g.attempt_id}),resume_eligible:ae.eligible,resume_reason:ae.reason,conflict_resolution:to(g),base_exception:va(Wn,g.target_base),usage:Wt(p.attempts||{},g.bead_id),current_child:L(g.bead_id),...y(g.bead_id)}),Vt=g}}let zn=[...Ta,...Ca].map(g=>{let O=Un.get(g.attempt_id),ae=O?.quickfix_landing;if(O?.quickfix_lane!==!0||!ae||typeof ae!="object")return g;let Ne=typeof ae.reason=="string"&&ae.reason.length>0?ae.reason:null,lt=Mn({bead_id:O.bead_id,merge_sha:ae.head_sha,cleanup_cursor:ae.cursor,cleanup_failed:Ne?{step:ae.cursor,reason:Ne}:null,repo_operations:Array.isArray(p.repo_operations)?p.repo_operations:[]});return lt?{...g,landing:lt}:g}),Ia=null;if(Vt){let g=Ra(Vt),O=Vt.cause_detail;Ia={bead_id:Vt.bead_id,repo:Vt.repo||"",reason:Vt.cause||Vt.status,cause_detail:O&&typeof O.reason=="string"?{reason:O.reason,command:typeof O.command=="string"?O.command:null}:null,resume_attempt_id:Vt.attempt_id,resume_eligible:g.eligible,resume_reason:g.reason,discard:lr(Bn,Vt.bead_id,{attempt_id:Vt.attempt_id})}}let La=new Set(zn.map(g=>g.bead_id)),ro=Array.isArray(p.merge_queue)?p.merge_queue:[],Oa=new Map,Pa=new Map,Da=new Map,Ma=new Map,Na=new Map;ro.forEach((g,O)=>{g&&typeof g.bead_id=="string"&&(Oa.set(g.bead_id,O+1),Pa.set(g.bead_id,g.resolution),Da.set(g.bead_id,g.continuation_action||null),Ma.set(g.bead_id,g.head_review||null),Na.set(g.bead_id,g.authority||null))});let zr=p.merge_queue_state||{active:null,failures:{}},Md=zr.failures||{},qa=zr.waiting&&typeof zr.waiting.bead_id=="string"&&typeof zr.waiting.reason=="string"?zr.waiting:null,Nd=p.auto_merge_skips||{},Fa=g=>{let O=Nd[g];if(!O)return null;let ae=Se[g],Ne=ae&&ae.pr?ae.pr.head_sha:null;return Ne&&Ne===O.head_sha?O.reason||"":null},Hn=new Map;for(let g of zn)g.failed!==!0&&g.conflict_resolution&&(g.paused?Hn.has(g.bead_id)||Hn.set(g.bead_id,"paused"):Hn.set(g.bead_id,"running"));let ja=zn.filter(g=>!g.paused&&g.failed!==!0).length,Ba=(p.workspace_info||{}).slots,Ua=typeof Ba=="number"?Ba:typeof p.slots=="number"?p.slots:Zs,qd=ja>Ua,Gn=Pr(B),Fd=(Array.isArray(p.done)?p.done.slice():[]).filter(g=>Gn===void 0||typeof g.added_at!="number"||g.added_at>=Gn).sort((g,O)=>(O.added_at||0)-(g.added_at||0)),an=Js(Fd,"done"),jd=new Set((Array.isArray(p.done)?p.done:[]).map(g=>g?.bead_id).filter(g=>typeof g=="string")),Wa=[],Bd=d?.()||"";for(let g of se){let O=Nr(g.closed_at);if(typeof g.id!="string"||jd.has(g.id)||O===null||Gn!==void 0&&O<Gn||typeof g.comment_count!="number"||g.comment_count<=0)continue;let ae=`${Bd}\0${g.id}\0${String(g.updated_at)}\0${g.comment_count}`,Ne=ee.get(ae);Ne===void 0&&r&&(ee.set(ae,"pending"),Promise.resolve(r("get-comments",{id:g.id})).then(lt=>{let Yt=Array.isArray(lt)&&lt.some(At=>Is(typeof At?.text=="string"?At.text:"")?.lane==="session");ee.set(ae,Yt?"session":"not-session"),ce()}).catch(()=>{ee.set(ae,"failed"),ce()})),Ne==="session"&&Wa.push({id:g.id,title:g.title||g.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:null,done_at:O,created_at:g.created_at,updated_at:g.updated_at})}an.push(...Wa),an.sort((g,O)=>(O.done_at||0)-(g.done_at||0));let Vn={};for(let g of fr)Vn[g]=0;let za=!1,Ha=0,no=0,Ga=0;for(let g of an){let O=g.usage;if(O&&typeof O=="object"){let ae=!1;for(let Ne of fr)Number.isFinite(O[Ne])&&(Vn[Ne]+=O[Ne],za=!0,ae=!0);ae&&(no+=1,Number.isFinite(O.total_cost_usd)&&(Ha+=O.total_cost_usd,Ga+=1))}}no>0&&Ga===no&&(Vn.total_cost_usd=Ha);let Va=an.map(g=>g.usage).filter(g=>g&&typeof g=="object"&&g.providers),Ud=Va.length>0?wt(gs(Va)):za?Xt(Vn):null,Wd=p.lane_states&&typeof p.lane_states=="object"&&!Array.isArray(p.lane_states)?p.lane_states:{},zd=Array.isArray(p.serial_lanes)?p.serial_lanes:[],Ya=g=>{if(G.some(Ne=>Ne.bead_id===g))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let O=Wr.filter(Ne=>Ne&&Ne.bead_id===g),ae=O.length>0?O[O.length-1].status:null;return ae==="failed"||ae==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":ae==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},Ka=zd.filter(g=>g&&typeof g.id=="string"&&Array.isArray(g.entries)).map((g,O)=>{let ae=Wd[g.id]||{},Ne=new Map((Array.isArray(ae.corrections)?ae.corrections:[]).filter(st=>st&&typeof st.bead_id=="string"&&typeof st.after=="string").map(st=>[st.bead_id,st.after])),lt=Js(g.entries.filter(st=>!La.has(st.bead_id)),g.id).map(st=>Ne.has(st.id)?{...st,badges:[`\u{1F517} ${Ne.get(st.id)} \uB4A4 (blocks \uC790\uB3D9)`,...st.badges]}:st),Yt=Array.isArray(ae.occupied_by)?ae.occupied_by.filter(st=>typeof st=="string"):[],At=Yt.map(st=>({id:st,title:Re.get(st)||st,draggable:!1,lane:g.id,ghost:!0,badges:[Ya(st)]}));return{id:g.id,index:O+1,rows:[...At,...lt],occupied:Yt.length>0,badge:Yt.length>0?Ya(Yt[0]):"\uB300\uAE30",cycle:ae.cycle===!0}}),Hd=typeof p.serial_lane_count=="number"?p.serial_lane_count:Ka.length;return{queue:p,idToTitle:Re,candidates:Ld,candidate_hidden:{blocked:Qs.hidden_blocked,spec:Qs.hidden_spec},running:zn,live_count:ja,slots:Ua,over_cap:qd,failure:Ia,waiting:Js(pt.filter(g=>!La.has(g.bead_id)),"queue"),serial_lanes:Ka,serial_lane_count:Hd,pr_wait:G.map(g=>Dm(g.bead_id,Re.get(g.bead_id)||g.bead_id,Se,ze[g.bead_id]||null,Wt(p.attempts||{},g.bead_id),Ce[g.bead_id]||(N.has(g.bead_id)||Z.has(g.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),Hn.get(g.bead_id)||null,g.external===!0,{position:Oa.get(g.bead_id)||0,active:zr.active===g.bead_id,failure:Md[g.bead_id]||null,waiting:qa?.bead_id===g.bead_id?qa.reason:null,resolution:Pa.get(g.bead_id),continuation_action:Da.get(g.bead_id),head_review:Ma.get(g.bead_id)||null,authority:Na.get(g.bead_id)||null},g.wt_present!==!1,p.auto_merge===!0?Fa(g.bead_id):null,va(Wn,Pd(g.bead_id)),p.completion_status&&typeof p.completion_status=="object"&&!Array.isArray(p.completion_status)&&p.completion_status[g.bead_id]||null,p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},Un.get(Ea.get(g.bead_id)||"")?.worker_serial===!0,p.auto_merge===!0,{merge_sha:g.merge_sha,cleanup_cursor:g.cleanup_cursor,repo_operations:Array.isArray(p.repo_operations)?p.repo_operations:[]})).map(g=>({...g,...y(g.id)})),merge_queue_length:ro.length,merge_queue_running:ro.length>0,auto_excluded:G.map(g=>g.bead_id).filter(g=>Fa(g)!==null),declared_base:Wn,done:an,token_total:Ud,cleanup_failures:De,repo_operations:Array.isArray(p.repo_operations)?p.repo_operations:[]}}function bt(){let v=!!o?.get()?.job,F=!v&&o?.isPending?.()===!0,se=v?"\uBD84\uC11D \uC911":F?"\uC900\uBE44 \uC911":"";return c`<button
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
          ${Array.from({length:dd},(Fe,Qe)=>Qe+1).map(Fe=>c`<option
                value=${String(Fe)}
                ?selected=${p.serial_lane_count===Fe}
              >
                ${Fe}
              </option>`)}
        </select>
      </label>
      ${o?bt():""} `,Re=wc({failure:p.failure}),rt=uc(p.repo_operations,p.cleanup_failures);return R?c`<div class="worker-ribbon">
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
      ${p.running.length>0?la(p.running,Date.now(),me):""}
      ${p.pr_wait.map(F=>ra(F))}
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
        ${gm.map(F=>c`<button
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
      ${bm.map(p=>c`<option value=${p.value} ?selected=${E===p.value}>
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
        ${tr({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:p.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:w.queue,preview:pd(p.waiting)})}
        ${p.serial_lanes.map(F=>z(F))}
        ${v}
        ${tr({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:p.done,empty:`${A()} \uC644\uB8CC \uC5C6\uC74C`,controls:ft(),collapsible:!0,collapsed:w.done,preview:Array.isArray(p.token_total)?p.token_total.map(F=>F.label).join(" \xB7 "):p.token_total||pd(p.done)})}
      </div>`:c`<div class="worker-lanes">
      ${v}
      <div class="worker-wait">
        ${tr({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:p.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
        ${p.serial_lanes.map(F=>z(F))}
      </div>
      ${tr({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${p.slots}`,items:p.running,live:p.running.some(F=>!F.paused&&F.failed!==!0),body:la(p.running,Date.now(),me)})}
      ${tr({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:p.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${tr({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${A()} ${p.done.length}`,items:p.done,empty:`${A()} \uC644\uB8CC \uC5C6\uC74C`,controls:ft()})}
    </div>`}function we(p){w={...w,[p]:!w[p]},xm(w),ce()}function ce(){let p=We();Be(ot(p),Me),Be(ye(p),Ye)}function Oe(){let p=document.querySelector(".app-header");if(!p)return;let v=()=>{let F=Math.round(p.getBoundingClientRect().height);ie.style.setProperty("--worker-ribbon-top",`${F}px`)};if(v(),typeof ResizeObserver=="function"){let F=new ResizeObserver(v);F.observe(p),ne.push(()=>F.disconnect())}else window.addEventListener("resize",v),ne.push(()=>window.removeEventListener("resize",v))}function tt(){if(typeof window.matchMedia!="function")return;let p=window.matchMedia(km);R=!!p.matches;let v=F=>{let se=!!(F&&typeof F.matches=="boolean"?F.matches:p.matches);se!==R&&(R=se,ce())};typeof p.addEventListener=="function"?(p.addEventListener("change",v),ne.push(()=>p.removeEventListener("change",v))):typeof p.addListener=="function"&&(p.addListener(v),ne.push(()=>p.removeListener(v)))}let Xe=null;function Pe(p){Xe=p.target instanceof Element?p.target:null}function Je(p){let F=p.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!F)return;if(Xe&&F.contains(Xe)&&Xe.closest("input, button, a")){p.preventDefault();return}let se=F.dataset.beadId||"",j=F.dataset.lane||"";k={bead_id:se,from_lane:j};try{p.dataTransfer?.setData("text/plain",se),p.dataTransfer&&(p.dataTransfer.effectAllowed="move")}catch{}}function Te(p){let v=p.target?.closest?.(".worker-pane");if(!v)return;let F=v.dataset.lane||"";F!=="candidate"&&F!=="queue"&&!/^s[1-5]$/.test(F)||(p.preventDefault(),p.dataTransfer&&(p.dataTransfer.dropEffect="move"),v.classList.add("worker-pane--drag-over"))}function ht(p){p.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function Pt(p,v){let F=M.find(L=>L.id===p);if(!F)return;let se=M.filter(L=>L.id!==p),j=se.length;if(v){let L=v.dataset.beadId;if(L===p)return;let oe=se.findIndex(Re=>Re.id===L);oe>=0&&(j=oe)}let h=se.slice();h.splice(j,0,F),x.applyReorder(p,h,j)}function Ft(p){let v=p.target?.closest?.(".worker-pane");if(!v)return;p.preventDefault(),v.classList.remove("worker-pane--drag-over");let F=v.dataset.lane||"",se=k?.bead_id||p.dataTransfer?.getData("text/plain")||"",j=k?.from_lane||"";if(k=null,!se)return;let h=p.target?.closest?.(".worker-mini, .worker-card"),L=Array.from(v.querySelectorAll(".worker-mini, .worker-card")),oe=L.length;if(h){let Re=L.indexOf(h);Re>=0&&(oe=Re)}if(oe=Math.max(0,oe-v.querySelectorAll(".worker-mini--ghost").length),v.classList.contains("worker-pane--collapsed")&&(oe=U()),F==="candidate"){if(j==="candidate"){Pt(se,h);return}(j==="queue"||/^s[1-5]$/.test(j))&&H(se);return}if(F==="queue"||/^s[1-5]$/.test(F)){let Re=F==="queue"?"parallel":F;j===F?T(se,Re,oe):W(se,Re,oe)}}function jt(p){D=p,_m(p),ce()}function yr(p){E=p==="board"||p==="created"||p==="spec"?p:Xs,vm(E),ce()}function kt(p){B=Ut(p)?p:Dt,wm(B),_?.(B),ce()}function St(p){let v=p.target?.closest?.(".worker-serial-lane-count");if(v){let oe=Number.parseInt(v.value,10);Number.isFinite(oe)&&Ge(oe).then(ce);return}let F=p.target?.closest?.(".worker-filter__blocked");if(F){jt({...D,show_blocked:F.checked});return}let se=p.target?.closest?.(".worker-done-range");if(se){kt(se.value);return}let j=p.target?.closest?.(".worker-sort");if(j){yr(j.value||Xs);return}let h=p.target?.closest?.(".worker-slots__input");if(!h)return;let L=Number.parseInt(h.value,10);if(!Number.isFinite(L)){ce();return}Ae(L).then(ce)}function cr(p){return p?{runner:p.runner||void 0,model:p.model||void 0,effort:p.effort||void 0,worktree:p.worktree||void 0,status:p.status||void 0,session_id:p.session_id||void 0}:{}}function rr(){let p=We();return{operations:p.repo_operations,cleanup_failures:p.cleanup_failures,repo:d&&d()||""}}function Ht(){me&&xe.close(),Ve.hidden=!1,je.hidden=!1,ke.open(rr()),ce()}function Gt(p){let v=$e(),F=v.attempts?v.attempts[p]:null;me=p,ke.close(),Ve.hidden=!0,je.hidden=!1,xe.open({attempt_id:p,meta:cr(F)}),ce()}function $t(){if(ke.isOpen()&&ke.refresh(rr()),!me)return;let p=$e(),v=p.attempts?p.attempts[me]:null;if(v){xe.updateMeta(cr(v));return}xe.close()}function nr(p){let v=p.target;if(v?.closest?.(".worker-mini__serial, .worker-mini__grip")||v?.closest?.("#worker-parallel-analysis-dialog"))return;if(v?.closest?.(".worker-analysis-btn")){V?.open();return}if(v?.closest?.(".worker-repo-strip")||v?.closest?.(".worker-mini__timeline")){Ht();return}let F=v?.closest?.(".worker-repo-op__session");if(F){let Ie=F.dataset.attemptId;Ie&&Gt(Ie);return}let se=v?.closest?.(".worker-repo-op__resolve");if(se){Ee(se.dataset.operationId||"");return}let j=v?.closest?.(".worker-repo-op__dismiss");if(j){qe(j.dataset.operationId||"");return}let h=v?.closest?.(".worker-cleanup__resume");if(h){let Ie=h.dataset.beadId;Ie&&be(Ie);return}let L=v?.closest?.(".worker-banner__resume");if(L){let Ie=L.dataset.attemptId;Ie&&K(Ie);return}let oe=v?.closest?.(".worker-banner__discard");if(oe){let Ie=oe.dataset.confirmation==="merged"?"merged":"unmerged";ve(oe.dataset.beadId||"",oe.dataset.attemptId||null,Ie,oe.dataset.operationId||null);return}let Re=v?.closest?.(".worker-banner__dismiss");if(Re){let Ie=Re.dataset.attemptId;Ie&&de(Ie);return}if(v?.closest?.(".worker-play")){ue(!$e().auto_advance);return}let rt=v?.closest?.(".worker-merge-all");if(rt){rt.classList.contains("worker-merge-all--stop")?$e().auto_merge===!0?q(!1):re():q(!0);return}let Fe=v?.closest?.(".worker-pane__hd--toggle");if(Fe){let Ie=Fe.dataset.lane;(Ie==="queue"||Ie==="done")&&we(Ie);return}let Qe=v?.closest?.(".worker-card__place");if(Qe){let Ie=Qe.dataset.beadId;Ie&&!Qe.disabled&&W(Ie,"parallel",U());return}let gt=v?.closest?.(".worker-filter__chip");if(gt){let Ie=gt.dataset.spec;(Ie==="all"||Ie==="with"||Ie==="without")&&jt({...D,spec:Ie});return}let b=v?.closest?.(".worker-mini__merge");if(b){let Ie=b.dataset.beadId||"";$e().cleanup_failed?.[Ie]?be(Ie):_e(Ie);return}let u=v?.closest?.(".worker-mini__merge-cancel");if(u){X(u.dataset.beadId||"");return}let $=v?.closest?.(".worker-mini__discard");if($){ve($.dataset.beadId||"",$.dataset.attemptId||null,$.dataset.discardMode==="merged"?"merged":"unmerged",$.dataset.operationId||null);return}let y=v?.closest?.(".worker-mini__stale-continue");if(y){S("worker-stale-work-continue",y.dataset.beadId||"",y.dataset.actionId||"");return}let G=v?.closest?.(".worker-mini__stale-backup");if(G){S("worker-stale-work-backup-fresh",G.dataset.beadId||"",G.dataset.actionId||"");return}let Se=v?.closest?.(".worker-mini__stale-recheck");if(Se){S("worker-stale-work-recheck",Se.dataset.beadId||"",Se.dataset.actionId||"");return}let Ce=v?.closest?.(".worker-mini__revise-fix");if(Ce){P("worker-revise-fix",Ce.dataset.beadId||"");return}let ze=v?.closest?.(".worker-mini__revise-approve");if(ze){P("worker-revise-approve",ze.dataset.beadId||"");return}if(v?.closest?.(".worker-mini__pr"))return;if(v?.closest?.(".rtile__discard")){let Ie=v?.closest?.(".rtile"),_t=Ie?.dataset?.beadId,on=Ie?.dataset?.attemptId;_t&&ve(_t,on||null,"unmerged",v?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(v?.closest?.(".rtile__dismiss")){let _t=v?.closest?.(".rtile")?.dataset?.attemptId;_t&&de(_t);return}if(v?.closest?.(".rtile__pause")){let _t=v?.closest?.(".rtile")?.dataset?.attemptId;_t&&I(_t);return}if(v?.closest?.(".rtile__resume")){let _t=v?.closest?.(".rtile")?.dataset?.attemptId;_t&&K(_t);return}if(v?.closest?.(".rtile__session")){let _t=v?.closest?.(".rtile")?.dataset?.attemptId;_t&&Gt(_t);return}if(v?.closest?.(".worker-drawer-overlay__backdrop")){ke.close(),xe.close();return}if(v?.closest?.(".worker-drawer-host"))return;let De=v?.closest?.(".rtile");if(De){if(v?.closest?.(".rtile__id")){let _t=De.dataset.beadId;_t&&ur(_t).then(on=>{on?le("\uBCF5\uC0AC\uB428","success",1200):le("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Ie=De.dataset.beadId;Ie&&l&&l(Ie);return}let pt=v?.closest?.(".worker-mini, .worker-card");if(pt){let Ie=pt.dataset.beadId;if(v?.closest?.(".worker-mini__id, .worker-card__id")){Ie&&ur(Ie).then(_t=>{_t?le("\uBCF5\uC0AC\uB428","success",1200):le("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}Ie&&l&&l(Ie)}}return e.addEventListener("pointerdown",Pe),e.addEventListener("dragstart",Je),e.addEventListener("dragover",Te),e.addEventListener("dragleave",ht),e.addEventListener("drop",Ft),e.addEventListener("click",nr),e.addEventListener("change",St),tt(),Oe(),m&&ne.push(m.subscribe(()=>{for(let[p,v]of ee)v==="failed"&&ee.delete(p);ce()})),s&&ne.push(s.subscribe(()=>{let p=d&&d()||"";p!==he&&(he=p,Le.close()),ce(),$t()})),o&&typeof o.subscribe=="function"&&ne.push(o.subscribe(()=>ce())),ce(),{load(){ce()},destroy(){for(let p of ne.splice(0))try{p()}catch{}e.removeEventListener("pointerdown",Pe),e.removeEventListener("dragstart",Je),e.removeEventListener("dragover",Te),e.removeEventListener("dragleave",ht),e.removeEventListener("drop",Ft),e.removeEventListener("click",nr),e.removeEventListener("change",St);try{xe.destroy()}catch{}je.hidden=!0;try{V?.destroy()}catch{}try{Le.destroy()}catch{}Be(c``,e)}}}function wa(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function hd(e,t,r,n=async()=>{},s=async()=>{}){let o=ct("views:workspace-picker"),a=null,i=!1,l=!1,d=!1;async function f(R){let Z=R.target.value,pe=t.getState().workspace?.current?.path||"";if(Z&&Z!==pe){o("switching workspace to %s",Z),i=!0,w();try{await r(Z)}catch(ne){o("workspace switch failed: %o",ne)}finally{i=!1,w()}}}async function _(){let R=t.getState(),N=R.workspace?.current?.path||R.workspace?.available?.[0]?.path||"";if(!(!N||l)){o("git-pulling workspace %s",N),l=!0,w();try{await n(N)}catch(Z){o("workspace git pull failed: %o",Z)}finally{l=!1,w()}}}function m(R){let N=R.target;N&&e.contains(N)||M()}function x(R){R.key==="Escape"&&M()}function k(){d||(d=!0,document.addEventListener("mousedown",m),document.addEventListener("keydown",x),w())}function M(){d&&(d=!1,document.removeEventListener("mousedown",m),document.removeEventListener("keydown",x),w())}function D(){d?M():k()}async function E(R){let N=R.target,Z=N.value,fe=N.checked;o("toggling visibility %s \u2192 %s",Z,String(fe));try{await s(Z,fe)}catch(pe){o("workspace visibility toggle failed: %o",pe)}}function B(R){return R?c`
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
                        >${wa(Z.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function A(){let R=t.getState(),N=R.workspace?.current,Z=R.workspace?.available||[],fe=new Set(R.workspace?.hidden||[]),pe=N?.path||Z[0]?.path||"";if(Z.length===0)return c``;let ne=Z.filter(ie=>!fe.has(ie.path)||ie.path===pe);if(ne.length<=1){let ie=ne[0]||Z[0],Me=wa(ie.path);return c`
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
                ${wa(ie.path)}
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
    `}function w(){Be(A(),e)}return w(),a=t.subscribe(()=>w()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",m),document.removeEventListener("keydown",x),Be(c``,e)}}}var vd=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-serial-lane-count","subscribe-worker-parallel-analysis","unsubscribe-worker-parallel-analysis","worker-parallel-analysis-snapshot","worker-parallel-analysis-start","worker-parallel-analysis-cancel","worker-parallel-analysis-settings-update","worker-parallel-analysis-submit","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle"];function ka(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function yd(e,t,r=ka()){return{id:r,type:e,payload:t}}function wd(e={}){let t=ct("ws"),r={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},n=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,i=null,l=!0,d=new Map,f=[],_=new Map,m=new Set;function x(A){for(let w of Array.from(m))try{w(A)}catch{}}function k(){if(!l||i)return;o="reconnecting",t("ws reconnecting\u2026"),x(o);let A=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,a)),w=(r.jitterRatio||0)*A,R=Math.max(0,Math.round(A+(Math.random()*2-1)*w));t("ws retry in %d ms (attempt %d)",R,a+1),i=setTimeout(()=>{i=null,ee()},R)}function M(A){try{s?.send(JSON.stringify(A))}catch(w){t("ws send failed",w)}}function D(){for(o="open",t("ws open"),x(o),a=0;f.length;){let A=f.shift();A&&M(A)}}function E(A){let w;try{w=JSON.parse(String(A.data))}catch{t("ws received non-JSON message");return}if(!w||typeof w.id!="string"||typeof w.type!="string"){t("ws received invalid envelope");return}if(d.has(w.id)){let N=d.get(w.id);d.delete(w.id),w.ok?N?.resolve(w.payload):N?.reject(w.error||new Error("ws error"));return}let R=_.get(w.type);if(R&&R.size>0)for(let N of Array.from(R))try{N(w.payload)}catch(Z){t("ws event handler error",Z)}else t("ws received unhandled message type: %s",w.type)}function B(){o="closed",t("ws closed"),x(o);for(let[A,w]of d.entries())w.reject(new Error("ws disconnected")),d.delete(A);a+=1,k()}function ee(){if(!l)return;let A=n();try{s=new WebSocket(A),t("ws connecting %s",A),o="connecting",x(o),s.addEventListener("open",D),s.addEventListener("message",E),s.addEventListener("error",()=>{}),s.addEventListener("close",B)}catch(w){t("ws connect failed %o",w),k()}}return ee(),{send(A,w){if(!vd.includes(A))return Promise.reject(new Error(`unknown message type: ${A}`));let R=ka(),N=yd(A,w,R);return t("send %s id=%s",A,R),new Promise((Z,fe)=>{d.set(R,{resolve:Z,reject:fe,type:A}),s&&s.readyState===s.OPEN?M(N):(t("queue %s id=%s (state=%s)",A,R,o),f.push(N))})},on(A,w){_.has(A)||_.set(A,new Set);let R=_.get(A);return R?.add(w),()=>{R?.delete(w)}},onConnection(A){return m.add(A),()=>{m.delete(A)}},reconnect(){l=!0,i&&(clearTimeout(i),i=null),a=0,ee()},close(){l=!1,i&&(clearTimeout(i),i=null);try{s?.close()}catch{}},getState(){return o}}}function Mm(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function Nm(e,t){try{let n=await(await fetch("/api/config")).json();e.setState({config:n})}catch(r){t("config refresh failed",r)}}var $a=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],kd=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:closed","closed-issues"]],Er="tab:worker:closed",qm="bdui.worker.done-range",$d=Nc,xd="worker:queue",Sd="worker:parallel-analysis",Ad="ui:order",Ed="ui:display-policy",Td="exec:presets",Tr="tab:board:closed",Cd="beads-ui.board.closed-range";function Fm(e){let t=ct("main");t("bootstrap start");let r=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Be(r,e);let n=document.getElementById("top-nav"),s=document.getElementById("usage-meter"),o=document.getElementById("board-root"),a=document.getElementById("worker-root"),i=document.getElementById("monitor-root"),l=document.getElementById("detail-panel");if(s&&Zc(s),o&&a&&i&&l){let Ye=function(b,u){let $="Request failed",y="";if(b&&typeof b=="object"){let Se=b;if(typeof Se.message=="string"&&Se.message.length>0&&($=Se.message),typeof Se.details=="string")y=Se.details;else if(Se.details&&typeof Se.details=="object")try{y=JSON.stringify(Se.details,null,2)}catch{y=""}}else typeof b=="string"&&b.length>0&&($=b);let G=u&&u.length>0?`Failed to load ${u}`:"Request failed";Ve.open(G,$,y)},be=function(b){return`${p.getState().workspace.current?.path||""}\0${b}`},C=function(){W&&(W().catch(()=>{}),W=null),T=null,H=null},X=function(b){I=b;let u=()=>{I!==b||p.getState().selected_id!==b||(I=null,q(b))};if(!Y){de.then(u);return}u()},P=function(b,u,$,y,G){return $!==S[u]?(G().catch(()=>{}),!1):(b.set(y,G),!0)},Ee=function(){let b=p.getState();bt(b.view==="board"),z(b.view==="worker"),Oe(b.view==="monitor"),ye(b.view==="board"||b.view==="worker"||ue||!!b.selected_id)},Ge=function(){let b=Pr(qe);return b===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:b}}},We=function(){let b=Pr(Ae);return b===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:b}}},bt=function(b){if(b)for(let[u,$]of $a){if(re.has(u)||ve.has(u))continue;let y=u===Tr?Ge():{type:$};try{Le.register(u,y)}catch(Ce){t("register %s store failed: %o",u,Ce)}ve.add(u);let G=S.board,Se=!1;ke.subscribeList(u,y).then(Ce=>{Se=!P(re,"board",G,u,Ce)}).catch(Ce=>{t("subscribe %s failed: %o",u,Ce),Ye(Ce,"board")}).finally(()=>{ve.delete(u),Se&&Ee()})}else dt()},dt=function(){S.board+=1;for(let[b]of $a){let u=re.get(b);u&&(u().catch(()=>{}),re.delete(b));try{Le.unregister(b)}catch($){t("unregister %s failed: %o",b,$)}}},z=function(b){if(!b){J();return}for(let[u,$]of kd){if(it.has(u)||ve.has(u))continue;let y=u===Er?We():{type:$};try{Le.register(u,y)}catch(Ce){t("register %s store failed: %o",u,Ce)}ve.add(u);let G=S.worker,Se=!1;ke.subscribeList(u,y).then(Ce=>{Se=!P(it,"worker",G,u,Ce)}).catch(Ce=>{t("subscribe %s failed: %o",u,Ce),Ye(Ce,"worker")}).finally(()=>{ve.delete(u),Se&&Ee()})}},J=function(){S.worker+=1;for(let[b]of kd){let u=it.get(b);u&&(u().catch(()=>{}),it.delete(b));try{Le.unregister(b)}catch($){t("unregister %s failed: %o",b,$)}}},ye=function(b){if(!b){we();return}ft||(xe("subscribe-worker-queue",{id:xd}).catch(u=>{t("subscribe-worker-queue failed: %o",u)}),xe("subscribe-worker-parallel-analysis",{id:Sd}).catch(u=>{t("subscribe-worker-parallel-analysis failed: %o",u)}),ft=()=>(xe("unsubscribe-worker-parallel-analysis",{id:Sd}),xe("unsubscribe-worker-queue",{id:xd})))},we=function(){ft&&(ft().catch(()=>{}),ft=null),Q.clear()},Oe=function(b){if(!b){tt();return}ce||(xe("subscribe-monitor-pipeline",{id:$d}).catch(u=>{t("subscribe-monitor-pipeline failed: %o",u)}),ce=()=>xe("unsubscribe-monitor-pipeline",{id:$d}))},tt=function(){ce&&(ce().catch(()=>{}),ce=null)},Pe=function(){Xe||(xe("subscribe-ui-order",{id:Ad}).catch(b=>{t("subscribe-ui-order failed: %o",b)}),Xe=()=>xe("unsubscribe-ui-order",{id:Ad}))},Je=function(){Xe&&(Xe().catch(()=>{}),Xe=null),$e.clear()},ht=function(){Te||(xe("subscribe-display-policy",{id:Ed}).catch(b=>{t("subscribe-display-policy failed: %o",b)}),Te=()=>xe("unsubscribe-display-policy",{id:Ed}))},Pt=function(){Te&&(Te().catch(()=>{}),Te=null),ge.clear()},jt=function(){Ft||(xe("subscribe-impl-presets",{id:Td}).catch(b=>{t("subscribe-impl-presets failed: %o",b)}),Ft=()=>xe("unsubscribe-impl-presets",{id:Td}))},Ht=function(b){if(!b)return"Unknown";let u=b.split("/").filter(Boolean);return u.length>0?u[u.length-1]:"Unknown"};var d=Ye,f=be,_=C,m=X,x=P,k=Ee,M=Ge,D=We,E=bt,B=dt,ee=z,A=J,w=ye,R=we,N=Oe,Z=tt,fe=Pe,pe=Je,ne=ht,ie=Pt,Me=jt,je=Ht;let He=document.getElementById("header-loading"),Ze=Pi(He),Ve=cc(e),me=wd(),xe=Ze.wrapSend((b,u)=>me.send(b,u)),ke=Ai(xe),Le=Ei(),he=Ri(),Q=Ci(),V=ui(),$e=Ti(),ge=ci(),te=di(),U=pi();me.on("impl-presets-snapshot",b=>{let u=b;u&&typeof u.revision=="number"&&Array.isArray(u.presets)&&te.set({revision:u.revision,presets:u.presets})}),me.on("monitor-pipeline-snapshot",b=>{let u=b;if(!(!u||!Array.isArray(u.workspaces)))try{V.set(u.workspaces,u.workspaces_state)}catch{}}),me.on("ui-order-snapshot",b=>{let u=b;if(u&&typeof u.revision=="number")try{$e.set({revision:u.revision,order:u.order&&typeof u.order=="object"?u.order:{}})}catch{}}),me.on("display-policy-snapshot",b=>{let u=b;if(u&&u.policy&&typeof u.policy=="object")try{ge.set(u.policy)}catch{}}),me.on("session-log-snapshot",b=>{let u=b;if(u&&typeof u.id=="string")try{U.set(u.id,Array.isArray(u.lines)?u.lines:[],typeof u.last_event_at=="number"?u.last_event_at:null)}catch{}}),me.on("session-log-append",b=>{let u=b;if(u&&typeof u.id=="string")try{U.append(u.id,u.event)}catch{}}),me.on("snapshot",b=>{let u=b,$=u&&typeof u.id=="string"?u.id:"",y=$?Le.getStore($):null;if(y&&u&&u.type==="snapshot")try{y.applyPush(u)}catch{}}),me.on("upsert",b=>{let u=b,$=u&&typeof u.id=="string"?u.id:"",y=$?Le.getStore($):null;if(y&&u&&u.type==="upsert")try{y.applyPush(u)}catch{}}),me.on("delete",b=>{let u=b,$=u&&typeof u.id=="string"?u.id:"",y=$?Le.getStore($):null;if(y&&u&&u.type==="delete")try{y.applyPush(u)}catch{}});let W=null,T=null,H=null,I=null,K=()=>{},de=new Promise(b=>{K=()=>b(void 0)}),Y=!1,_e=!1;async function q(b){let u=be(b);if(u===T||u===H)return;H=u;let $=`detail:${b}`,y={type:"issue-detail",params:{id:b}};try{Le.register($,y)}catch(G){t("register detail store failed: %o",G)}try{let G=await ke.subscribeList($,y);if(p.getState().selected_id!==b||be(b)!==u){await G().catch(()=>{});return}W&&await W().catch(()=>{}),W=G,T=u}catch(G){t("detail subscribe failed: %o",G),Ye(G,"issue details")}finally{H===u&&(H=null)}}let re=new Map,ve=new Set,S={board:0,worker:0},ue=!1,qe=Dt;try{let b=window.localStorage.getItem(Cd);Ut(b)&&(qe=b)}catch{}let Ae=Dt;try{let b=window.localStorage.getItem(qm);Ut(b)&&(Ae=b)}catch{}async function ot(b){if(!Ut(b)||b===qe)return;qe=b;try{window.localStorage.setItem(Cd,b)}catch{}let u=re.get(Tr);if(!u)return;re.delete(Tr),await u().catch(()=>{});let $=Ge();try{Le.register(Tr,$)}catch(y){t("register %s store failed: %o",Tr,y)}try{let y=await ke.subscribeList(Tr,$);re.set(Tr,y)}catch(y){t("re-subscribe %s failed: %o",Tr,y),Ye(y,"board")}}async function at(b){if(!Ut(b)||b===Ae)return;Ae=b;let u=it.get(Er);if(!u)return;it.delete(Er),await u().catch(()=>{});let $=We();try{Le.register(Er,$)}catch(y){t("register %s store failed: %o",Er,y)}try{let y=await ke.subscribeList(Er,$);it.set(Er,y)}catch(y){t("re-subscribe %s failed: %o",Er,y),Ye(y,"worker")}}let it=new Map,ft=null,ce=null,Xe=null,Te=null,Ft=null;async function yr(){Te=null,ge.clear(),Ft=null,te.clear(),ft=null,ce=null,re.clear(),it.clear(),S.board+=1,S.worker+=1,jt();let b=p.getState().workspace.current?.path;if(b)try{await me.send("set-workspace",{path:b})}catch($){t("workspace restore after reconnect failed: %o",$);return}ht();let u=p.getState();bt(u.view==="board"),z(u.view==="worker"),Oe(u.view==="monitor"),ye(u.view==="board"||u.view==="worker"||!!u.selected_id)}async function kt(){t("clearing all subscriptions for workspace switch"),dt(),J(),we(),he.clear(),Je(),Pe(),Pt(),ht(),C();let b=p.getState();if(b.selected_id)try{Le.unregister(`detail:${b.selected_id}`)}catch{}let u=p.getState();bt(u.view==="board"),z(u.view==="worker"),Oe(u.view==="monitor"),ye(u.view==="board"||u.view==="worker"||!!u.selected_id),u.selected_id&&X(u.selected_id)}async function St(b){t("requesting workspace switch to %s",b),_e=!0;try{let u=await me.send("set-workspace",{path:b});t("workspace switch result: %o",u),u&&u.workspace&&(p.setState({workspace:{current:{path:u.workspace.root_dir,database:u.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",b),u.changed&&(await kt(),le("Switched to "+Ht(b),"success",2e3)))}catch(u){throw t("workspace switch failed: %o",u),le("Failed to switch workspace","error",3e3),u}finally{_e=!1}}async function cr(b){t("requesting workspace git pull for %s",b);try{let u=await me.send("git-pull-workspace",{});t("workspace git pull result: %o",u);let $=u?.status;if($==="up_to_date"){le("Already up to date","success",2e3);return}if($==="stash_pop_conflict"){le("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}le("Git pulled "+Ht(b),"success",2e3)}catch(u){t("workspace git pull failed: %o",u);let $=u?.code,y=u?.message;if($==="rebase_conflict"){le("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if($==="rebase_conflict_abort_failed"){le("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if($==="busy"){le("Git pull skipped: another operation is running","warning",3e3);return}let G=y?`: ${y}`:"";throw le(`Git pull failed${G}`,"error",3e3),u}}async function rr(b,u){t("setting workspace visibility %s \u2192 %s",b,String(u));try{await me.send("set-workspace-visibility",{path:b,visible:u}),await Gt()}catch($){t("workspace visibility update failed: %o",$),le("Failed to update project visibility","error",3e3)}}async function Gt(){try{let b=await me.send("list-workspaces",{});if(t("workspaces loaded: %o",b),b&&Array.isArray(b.workspaces)){let u=b.workspaces.map(Se=>({path:Se.path,database:Se.database,pid:Se.pid,version:Se.version})),$=b.current?{path:b.current.root_dir,database:b.current.db_path}:null,y=Array.isArray(b.hidden)?b.hidden.filter(Se=>typeof Se=="string"):[];p.setState({workspace:{current:$,available:u,hidden:y}});let G=window.localStorage.getItem("beads-ui.workspace");G&&(!u.some(Ce=>Ce.path===G)||y.includes(G)?window.localStorage.removeItem("beads-ui.workspace"):$&&G!==$.path&&(t("restoring saved workspace preference: %s",G),await St(G)))}}catch(b){t("failed to load workspaces: %o",b)}}me.on("workspace-changed",b=>{t("workspace-changed event: %o",b),b&&b.root_dir&&(p.setState({workspace:{current:{path:b.root_dir,database:b.db_path}}}),Gt(),kt())});let $t=!1;if(typeof me.onConnection=="function"){let b=u=>{t("ws state %s",u),u==="reconnecting"||u==="closed"?($t=!0,le("Connection lost. Reconnecting\u2026","error",4e3)):u==="open"&&$t&&($t=!1,le("Reconnected","success",2200),Nm(p,($,y)=>{t(`${$}: %o`,y)}),yr())};me.onConnection(b)}let nr="board";try{let b=window.localStorage.getItem("beads-ui.view");(b==="board"||b==="worker"||b==="monitor")&&(nr=b)}catch(b){t("view parse error: %o",b)}let p=Oi({config:Mm(),view:nr});me.on("worker-queue-snapshot",b=>{let u=b;if(!u||!u.queue)return;let $=p.getState().workspace.current?.path;if(typeof $=="string"&&$.length>0&&u.root_dir!==$){t("dropping worker-queue snapshot for %s",String(u.root_dir));return}try{he.set(u.queue)}catch{}}),me.on("worker-parallel-analysis-snapshot",b=>{let u=b;if(!u)return;let $=p.getState().workspace.current?.path;if(!(typeof $=="string"&&$.length>0&&typeof u.root_dir=="string"&&u.root_dir!==$))try{Q.set({settings:u.settings,job:u.job??null,last_good:u.last_good??null})}catch{}});let v=Ii(p);v.start();let F=new Set(["get-comments","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults"]),se=async(b,u)=>{try{return await xe(b,u)}catch($){if(F.has(b))throw $;return[]}};n&&Fc(n,p,v);let j=document.getElementById("workspace-picker");j&&hd(j,p,St,cr,rr);let h=Wc(e,(b,u)=>xe(b,u));try{let b=document.getElementById("new-issue-btn");b&&b.addEventListener("click",()=>h.open())}catch{}let L=Vc(e,{policyStore:ge,queueStore:he,implPresetStore:te,transport:(b,u)=>xe(b,u),onOpenChange:b=>{ue=b,Ee()},labelOptions:()=>{let b=new Set;for(let[u]of $a)for(let $ of Le.snapshotFor(u)||[]){let y=$.labels;if(Array.isArray(y))for(let G of y)typeof G=="string"&&G.length>0&&b.add(G)}return Array.from(b).sort()}});try{let b=document.getElementById("display-settings-btn");b&&(b.setAttribute("aria-label","\uC124\uC815"),b.setAttribute("title","\uC124\uC815"),b.addEventListener("click",()=>L.open()))}catch{}let oe=zi(o,{gotoIssue:b=>v.gotoIssue(b),issueStores:Le,transport:se,workerQueueStore:he,uiOrderStore:$e,displayPolicyStore:ge,closedRange:qe,onClosedRangeChange:b=>{ot(b)},onNewIssue:()=>h.open()}),Re=ya(a,{transport:se,issueStores:Le,queueStore:he,analysisStore:Q,sessionLogStore:U,uiOrderStore:$e,gotoIssue:b=>p.setState({selected_id:b}),getWorkspacePath:()=>p.getState().workspace.current?.path,doneRange:Ae,onDoneRangeChange:b=>{at(b)}}),rt=qc(i,{transport:se,pipelineStore:V,execPresetStore:te,gotoIssue:b=>v.gotoIssue(b),getWorkspacePath:()=>p.getState().workspace.current?.path,switchWorkspace:b=>St(b)}),Fe=lc(l,{issueStores:Le,transport:se,queueStore:he,execPresetStore:te,sessionLogStore:U,getWorkspacePath:()=>p.getState().workspace.current?.path,onNavigate:b=>{p.getState().view==="worker"?p.setState({selected_id:b}):v.gotoIssue(b)},onClose:()=>{let b=p.getState();p.setState({selected_id:null});try{v.gotoView(b.view==="worker"||b.view==="monitor"?b.view:"board")}catch{}},onOpenExecPresets:()=>{L.open("session")}}),Qe=p.getState().selected_id;Qe&&(l.hidden=!1,Fe.load(Qe),X(Qe)),p.subscribe(b=>{let u=b.selected_id;u?(l.hidden=!1,Fe.load(u),_e||X(u)):(Fe.clear(),l.hidden=!0,C())});let gt=b=>{o.hidden=b.view!=="board",a.hidden=b.view!=="worker",i.hidden=b.view!=="monitor",bt(b.view==="board"),z(b.view==="worker"),Oe(b.view==="monitor"),ye(b.view==="board"||b.view==="worker"||ue||!!b.selected_id),!b.selected_id&&b.view==="board"&&oe.load(),b.view==="worker"&&Re.load(),b.view==="monitor"?rt.load():rt.pause(),window.localStorage.setItem("beads-ui.view",b.view)};p.subscribe(gt),gt(p.getState()),Pe(),ht(),jt(),Gt().finally(()=>{Y=!0,K()}),window.addEventListener("keydown",b=>{let u=b.ctrlKey||b.metaKey,$=String(b.key||"").toLowerCase(),y=b.target,G=y&&y.tagName?String(y.tagName).toLowerCase():"",Se=G==="input"||G==="textarea"||G==="select"||y&&typeof y.isContentEditable=="boolean"&&y.isContentEditable;u&&$==="n"&&(Se||(b.preventDefault(),h.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let r=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let t=document.getElementById("app");t&&Fm(t)});export{Fm as bootstrap,Mm as readBootstrapConfig,Nm as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
