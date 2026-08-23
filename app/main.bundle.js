var kd=Object.create;var bo=Object.defineProperty;var $d=Object.getOwnPropertyDescriptor;var xd=Object.getOwnPropertyNames;var Ad=Object.getPrototypeOf,Sd=Object.prototype.hasOwnProperty;var Ed=(e,t,r)=>t in e?bo(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var ho=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Td=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of xd(t))!Sd.call(e,s)&&s!==r&&bo(e,s,{get:()=>t[s],enumerable:!(n=$d(t,s))||n.enumerable});return e};var Cd=(e,t,r)=>(r=e!=null?kd(Ad(e)):{},Td(t||!e||!e.__esModule?bo(r,"default",{value:e,enumerable:!0}):r,e));var lt=(e,t,r)=>Ed(e,typeof t!="symbol"?t+"":t,r);var xi=ho((Ug,$i)=>{var Qr=1e3,Jr=Qr*60,en=Jr*60,qr=en*24,Ld=qr*7,Od=qr*365.25;$i.exports=function(e,t){t=t||{};var r=typeof e;if(r==="string"&&e.length>0)return Md(e);if(r==="number"&&isFinite(e))return t.long?Dd(e):Pd(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function Md(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*Od;case"weeks":case"week":case"w":return r*Ld;case"days":case"day":case"d":return r*qr;case"hours":case"hour":case"hrs":case"hr":case"h":return r*en;case"minutes":case"minute":case"mins":case"min":case"m":return r*Jr;case"seconds":case"second":case"secs":case"sec":case"s":return r*Qr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function Pd(e){var t=Math.abs(e);return t>=qr?Math.round(e/qr)+"d":t>=en?Math.round(e/en)+"h":t>=Jr?Math.round(e/Jr)+"m":t>=Qr?Math.round(e/Qr)+"s":e+"ms"}function Dd(e){var t=Math.abs(e);return t>=qr?cs(e,t,qr,"day"):t>=en?cs(e,t,en,"hour"):t>=Jr?cs(e,t,Jr,"minute"):t>=Qr?cs(e,t,Qr,"second"):e+" ms"}function cs(e,t,r,n){var s=t>=r*1.5;return Math.round(e/r)+" "+n+(s?"s":"")}});var Si=ho((Wg,Ai)=>{function Nd(e){r.debug=r,r.default=r,r.coerce=u,r.disable=a,r.enable=s,r.enabled=i,r.humanize=xi(),r.destroy=d,Object.keys(e).forEach(f=>{r[f]=e[f]}),r.names=[],r.skips=[],r.formatters={};function t(f){let _=0;for(let y=0;y<f.length;y++)_=(_<<5)-_+f.charCodeAt(y),_|=0;return r.colors[Math.abs(_)%r.colors.length]}r.selectColor=t;function r(f){let _,y=null,T,A;function R(...N){if(!R.enabled)return;let Y=R,Z=Number(new Date),B=Z-(_||Z);Y.diff=B,Y.prev=_,Y.curr=Z,_=Z,N[0]=r.coerce(N[0]),typeof N[0]!="string"&&N.unshift("%O");let U=0;N[0]=N[0].replace(/%([a-zA-Z%])/g,(W,b)=>{if(W==="%%")return"%";U++;let C=r.formatters[b];if(typeof C=="function"){let z=N[U];W=C.call(Y,z),N.splice(U,1),U--}return W}),r.formatArgs.call(Y,N),(Y.log||r.log).apply(Y,N)}return R.namespace=f,R.useColors=r.useColors(),R.color=r.selectColor(f),R.extend=n,R.destroy=r.destroy,Object.defineProperty(R,"enabled",{enumerable:!0,configurable:!1,get:()=>y!==null?y:(T!==r.namespaces&&(T=r.namespaces,A=r.enabled(f)),A),set:N=>{y=N}}),typeof r.init=="function"&&r.init(R),R}function n(f,_){let y=r(this.namespace+(typeof _>"u"?":":_)+f);return y.log=this.log,y}function s(f){r.save(f),r.namespaces=f,r.names=[],r.skips=[];let _=(typeof f=="string"?f:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let y of _)y[0]==="-"?r.skips.push(y.slice(1)):r.names.push(y)}function o(f,_){let y=0,T=0,A=-1,R=0;for(;y<f.length;)if(T<_.length&&(_[T]===f[y]||_[T]==="*"))_[T]==="*"?(A=T,R=y,T++):(y++,T++);else if(A!==-1)T=A+1,R++,y=R;else return!1;for(;T<_.length&&_[T]==="*";)T++;return T===_.length}function a(){let f=[...r.names,...r.skips.map(_=>"-"+_)].join(",");return r.enable(""),f}function i(f){for(let _ of r.skips)if(o(f,_))return!1;for(let _ of r.names)if(o(f,_))return!0;return!1}function u(f){return f instanceof Error?f.stack||f.message:f}function d(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}Ai.exports=Nd});var Ei=ho((Mt,us)=>{Mt.formatArgs=Fd;Mt.save=jd;Mt.load=Bd;Mt.useColors=qd;Mt.storage=Ud();Mt.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();Mt.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function qd(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Fd(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+us.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let r=0,n=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),e.splice(n,0,t)}Mt.log=console.debug||console.log||(()=>{});function jd(e){try{e?Mt.storage.setItem("debug",e):Mt.storage.removeItem("debug")}catch{}}function Bd(){let e;try{e=Mt.storage.getItem("debug")||Mt.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function Ud(){try{return localStorage}catch{}}us.exports=Si()(Mt);var{formatters:Wd}=us.exports;Wd.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var gn=globalThis,ns=gn.trustedTypes,li=ns?ns.createPolicy("lit-html",{createHTML:e=>e}):void 0,vo="$lit$",_r=`lit$${Math.random().toFixed(9).slice(2)}$`,wo="?"+_r,Rd=`<${wo}>`,Mr=document,bn=()=>Mr.createComment(""),hn=e=>e===null||typeof e!="object"&&typeof e!="function",ko=Array.isArray,_i=e=>ko(e)||typeof e?.[Symbol.iterator]=="function",yo=`[ 	
\f\r]`,mn=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ci=/-->/g,ui=/>/g,Lr=RegExp(`>|${yo}(?:([^\\s"'>=/]+)(${yo}*=${yo}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),di=/'/g,pi=/"/g,mi=/^(?:script|style|textarea|title)$/i,$o=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),l=$o(1),$r=$o(2),Pg=$o(3),Bt=Symbol.for("lit-noChange"),mt=Symbol.for("lit-nothing"),fi=new WeakMap,Or=Mr.createTreeWalker(Mr,129);function gi(e,t){if(!ko(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return li!==void 0?li.createHTML(t):t}var bi=(e,t)=>{let r=e.length-1,n=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=mn;for(let i=0;i<r;i++){let u=e[i],d,f,_=-1,y=0;for(;y<u.length&&(a.lastIndex=y,f=a.exec(u),f!==null);)y=a.lastIndex,a===mn?f[1]==="!--"?a=ci:f[1]!==void 0?a=ui:f[2]!==void 0?(mi.test(f[2])&&(s=RegExp("</"+f[2],"g")),a=Lr):f[3]!==void 0&&(a=Lr):a===Lr?f[0]===">"?(a=s??mn,_=-1):f[1]===void 0?_=-2:(_=a.lastIndex-f[2].length,d=f[1],a=f[3]===void 0?Lr:f[3]==='"'?pi:di):a===pi||a===di?a=Lr:a===ci||a===ui?a=mn:(a=Lr,s=void 0);let T=a===Lr&&e[i+1].startsWith("/>")?" ":"";o+=a===mn?u+Rd:_>=0?(n.push(d),u.slice(0,_)+vo+u.slice(_)+_r+T):u+_r+(_===-2?i:T)}return[gi(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},yn=class e{constructor({strings:t,_$litType$:r},n){let s;this.parts=[];let o=0,a=0,i=t.length-1,u=this.parts,[d,f]=bi(t,r);if(this.el=e.createElement(d,n),Or.currentNode=this.el.content,r===2||r===3){let _=this.el.content.firstChild;_.replaceWith(..._.childNodes)}for(;(s=Or.nextNode())!==null&&u.length<i;){if(s.nodeType===1){if(s.hasAttributes())for(let _ of s.getAttributeNames())if(_.endsWith(vo)){let y=f[a++],T=s.getAttribute(_).split(_r),A=/([.?@])?(.*)/.exec(y);u.push({type:1,index:o,name:A[2],strings:T,ctor:A[1]==="."?os:A[1]==="?"?as:A[1]==="@"?is:Dr}),s.removeAttribute(_)}else _.startsWith(_r)&&(u.push({type:6,index:o}),s.removeAttribute(_));if(mi.test(s.tagName)){let _=s.textContent.split(_r),y=_.length-1;if(y>0){s.textContent=ns?ns.emptyScript:"";for(let T=0;T<y;T++)s.append(_[T],bn()),Or.nextNode(),u.push({type:2,index:++o});s.append(_[y],bn())}}}else if(s.nodeType===8)if(s.data===wo)u.push({type:2,index:o});else{let _=-1;for(;(_=s.data.indexOf(_r,_+1))!==-1;)u.push({type:7,index:o}),_+=_r.length-1}o++}}static createElement(t,r){let n=Mr.createElement("template");return n.innerHTML=t,n}};function Pr(e,t,r=e,n){if(t===Bt)return t;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=hn(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(t=Pr(e,s._$AS(e,t.values),s,n)),t}var ss=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:n}=this._$AD,s=(t?.creationScope??Mr).importNode(r,!0);Or.currentNode=s;let o=Or.nextNode(),a=0,i=0,u=n[0];for(;u!==void 0;){if(a===u.index){let d;u.type===2?d=new Xr(o,o.nextSibling,this,t):u.type===1?d=new u.ctor(o,u.name,u.strings,this,t):u.type===6&&(d=new ls(o,this,t)),this._$AV.push(d),u=n[++i]}a!==u?.index&&(o=Or.nextNode(),a++)}return Or.currentNode=Mr,s}p(t){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}},Xr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,n,s){this.type=2,this._$AH=mt,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=Pr(this,t,r),hn(t)?t===mt||t==null||t===""?(this._$AH!==mt&&this._$AR(),this._$AH=mt):t!==this._$AH&&t!==Bt&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):_i(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==mt&&hn(this._$AH)?this._$AA.nextSibling.data=t:this.T(Mr.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=yn.createElement(gi(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new ss(s,this),a=o.u(this.options);o.p(r),this.T(a),this._$AH=o}}_$AC(t){let r=fi.get(t.strings);return r===void 0&&fi.set(t.strings,r=new yn(t)),r}k(t){ko(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of t)s===r.length?r.push(n=new e(this.O(bn()),this.O(bn()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Dr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,n,s,o){this.type=1,this._$AH=mt,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=mt}_$AI(t,r=this,n,s){let o=this.strings,a=!1;if(o===void 0)t=Pr(this,t,r,0),a=!hn(t)||t!==this._$AH&&t!==Bt,a&&(this._$AH=t);else{let i=t,u,d;for(t=o[0],u=0;u<o.length-1;u++)d=Pr(this,i[n+u],r,u),d===Bt&&(d=this._$AH[u]),a||(a=!hn(d)||d!==this._$AH[u]),d===mt?t=mt:t!==mt&&(t+=(d??"")+o[u+1]),this._$AH[u]=d}a&&!s&&this.j(t)}j(t){t===mt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},os=class extends Dr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===mt?void 0:t}},as=class extends Dr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==mt)}},is=class extends Dr{constructor(t,r,n,s,o){super(t,r,n,s,o),this.type=5}_$AI(t,r=this){if((t=Pr(this,t,r,0)??mt)===Bt)return;let n=this._$AH,s=t===mt&&n!==mt||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==mt&&(n===mt||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},ls=class{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){Pr(this,t)}},hi={M:vo,P:_r,A:wo,C:1,L:bi,R:ss,D:_i,V:Pr,I:Xr,H:Dr,N:as,U:is,B:os,F:ls},Id=gn.litHtmlPolyfillSupport;Id?.(yn,Xr),(gn.litHtmlVersions??(gn.litHtmlVersions=[])).push("3.3.1");var He=(e,t,r)=>{let n=r?.renderBefore??t,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new Xr(t.insertBefore(bn(),o),o,void 0,r??{})}return s._$AI(e),s};var Nt="today",lr=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Ut(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function Nr(e,t=Date.now()){switch(e){case"today":{let r=new Date(t);return r.setHours(0,0,0,0),r.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function yi(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function vi(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function wi(){let e=null,t=[],r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],n()},clear(){e=null,t=[],n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function ki(){let e=new Map,t=new Set;function r(s){return s.startsWith("session-log:")?s:`session-log:${s}`}function n(){for(let s of Array.from(t))try{s()}catch{}}return{set(s,o,a=null){e.set(r(s),{lines:Array.isArray(o)?[...o]:[],last_event_at:typeof a=="number"?a:null}),n()},append(s,o){let a=r(s),i=e.get(a)||{lines:[],last_event_at:null};i.lines=[...i.lines,o],i.last_event_at=Date.now(),e.set(a,i),n()},get(s){return e.get(r(s))||null},clear(s){typeof s=="string"?e.delete(r(s)):e.clear(),n()},subscribe(s){return t.add(s),()=>t.delete(s)}}}var Ti=Cd(Ei(),1);function ft(e){return(0,Ti.default)(`beads-ui:${e}`)}function Yt(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Fr(e,t){let r=Yt(e.created_at),n=Yt(t.created_at);if(r!==n)return r<n?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Ii(e,t){let r=Yt(e.created_at),n=Yt(t.created_at);if(r!==n)return r<n?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Li(e,t){let r=Yt(e.updated_at),n=Yt(t.updated_at);if(r!==n)return r<n?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function Oi(e,t){let r=e.priority??2,n=t.priority??2;if(r!==n)return r-n;let s=Yt(e.created_at),o=Yt(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Mi(e,t){let r=e.closed_at??0,n=t.closed_at??0;if(r!==n)return r<n?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var zd=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Ci(e){let t=e&&e.metadata,r=t?t.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Ri(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let r=zd.exec(t);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Pi(e,t){let r=Ci(e),n=Ci(t);if(r!==n)return r<n?-1:1;let s=Ri(e),o=Ri(t);if(s!==o)return s<o?-1:1;let a=Yt(e&&e.created_at),i=Yt(t&&t.created_at);if(a!==i)return a<i?-1:1;let u=e&&e.id,d=t&&t.id;return u===d?0:String(u)<String(d)?-1:1}var xo=2**20;function tn(e,t){let r=e&&e.id;return t&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(t,r)&&typeof t[r]=="number"&&Number.isFinite(t[r])?t[r]:-Yt(e&&e.created_at)}function ds(e){return(t,r)=>{let n=tn(t,e),s=tn(r,e);if(n!==s)return n<s?-1:1;let o=t?.id,a=r?.id;return o<a?-1:o>a?1:0}}function Ao(e,t,r){let n=Array.isArray(e)?e:[],s=n.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?n[o-1]:null,i=o+1<s?n[o+1]:null;if(!a&&!i)return{rank:0};if(!a)return{rank:tn(i,r)-xo};if(!i)return{rank:tn(a,r)+xo};let u=tn(a,r),d=tn(i,r),f=(u+d)/2;return u<f&&f<d?{rank:f}:{renormalize:n.map((_,y)=>({bead_id:_.id,rank:y*xo}))}}function So(e,t={}){let r=ft(`issue-store:${e}`),n=new Map,s=[],o=0,a=new Set,i=!1,u=t.sort||Fr;function d(){for(let y of Array.from(a))try{y()}catch{}}function f(){s=Array.from(n.values()).sort(u)}function _(y){if(i||!y||y.id!==e)return;let T=Number(y.revision)||0;if(r("apply %s rev=%d",y.type,T),!(T<=o&&y.type!=="snapshot")){if(y.type==="snapshot"){if(T<=o)return;n.clear();let A=Array.isArray(y.issues)?y.issues:[];for(let R of A)R&&typeof R.id=="string"&&R.id.length>0&&n.set(R.id,R);f(),o=T,d();return}if(y.type==="upsert"){let A=y.issue;if(A&&typeof A.id=="string"&&A.id.length>0){let R=n.get(A.id);if(!R)n.set(A.id,A);else{let N=Number.isFinite(R.updated_at)?R.updated_at:0,Y=Number.isFinite(A.updated_at)?A.updated_at:0;if(N<=Y){for(let Z of Object.keys(R))Z in A||delete R[Z];for(let[Z,B]of Object.entries(A))R[Z]=B}}f()}o=T,d()}else if(y.type==="delete"){let A=String(y.issue_id||"");A&&(n.delete(A),f()),o=T,d()}}}return{id:e,subscribe(y){return a.add(y),()=>{a.delete(y)}},applyPush:_,snapshot(){return s},size(){return n.size},getById(y){return n.get(y)},dispose(){i=!0,n.clear(),s=[],a.clear(),o=0}}}function ps(e){let t=String(e.type||"").trim(),r={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];r[o]=String(a)}}let n=new URLSearchParams(r).toString();return n.length>0?`${t}?${n}`:t}function Di(e){let t=ft("subs"),r=new Map,n=new Map;function s(i,u){t("applyDelta %s +%d ~%d -%d",i,(u.added||[]).length,(u.updated||[]).length,(u.removed||[]).length);let d=n.get(i);if(!d||d.size===0)return;let f=Array.isArray(u.added)?u.added:[],_=Array.isArray(u.updated)?u.updated:[],y=Array.isArray(u.removed)?u.removed:[];for(let T of Array.from(d)){let A=r.get(T);if(!A)continue;let R=A.itemsById;for(let N of f)typeof N=="string"&&N.length>0&&R.set(N,!0);for(let N of _)typeof N=="string"&&N.length>0&&R.set(N,!0);for(let N of y)typeof N=="string"&&N.length>0&&R.delete(N)}}async function o(i,u){let d=ps(u);if(t("subscribe %s key=%s",i,d),!r.has(i))r.set(i,{key:d,itemsById:new Map});else{let _=r.get(i);if(_&&_.key!==d){let y=n.get(_.key);y&&(y.delete(i),y.size===0&&n.delete(_.key)),r.set(i,{key:d,itemsById:new Map})}}n.has(d)||n.set(d,new Set);let f=n.get(d);f&&f.add(i);try{await e("subscribe-list",{id:i,type:u.type,params:u.params})}catch(_){let y=r.get(i)||null;if(y){let T=n.get(y.key);T&&(T.delete(i),T.size===0&&n.delete(y.key))}throw r.delete(i),_}return async()=>{t("unsubscribe %s key=%s",i,d);try{await e("unsubscribe-list",{id:i})}catch{}let _=r.get(i)||null;if(_){let y=n.get(_.key);y&&(y.delete(i),y.size===0&&n.delete(_.key))}r.delete(i)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:ps,selectors:{getIds(i){let u=r.get(i);return u?Array.from(u.itemsById.keys()):[]},has(i,u){let d=r.get(i);return d?d.itemsById.has(u):!1},count(i){let u=r.get(i);return u?u.itemsById.size:0},getItemsById(i){let u=r.get(i),d={};if(!u)return d;for(let f of u.itemsById.keys())d[f]=!0;return d}}}}function Ni(){let e=ft("issue-stores"),t=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let u of Array.from(n))try{u()}catch{}}function a(u,d,f){let _=d?ps(d):"",y=r.get(u)||"",T=t.has(u);if(e("register %s key=%s (prev=%s)",u,_,y),T&&y&&_&&y!==_){let A=t.get(u);if(A)try{A.dispose()}catch{}let R=s.get(u);if(R){try{R()}catch{}s.delete(u)}let N=So(u,f);t.set(u,N);let Y=N.subscribe(()=>o());s.set(u,Y)}else if(!T){let A=So(u,f);t.set(u,A);let R=A.subscribe(()=>o());s.set(u,R)}return r.set(u,_),()=>i(u)}function i(u){e("unregister %s",u),r.delete(u);let d=t.get(u);d&&(d.dispose(),t.delete(u));let f=s.get(u);if(f){try{f()}catch{}s.delete(u)}}return{register:a,unregister:i,getStore(u){return t.get(u)||null},snapshotFor(u){let d=t.get(u);return d?d.snapshot().slice():[]},subscribe(u){return n.add(u),()=>n.delete(u)}}}function qi(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Fi(){let e=null,t=!1,r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},set(s){e=s,n()},isPending(){return t},setPending(s){let o=s===!0;o!==t&&(t=o,n())},clear(){e=null,t=!1,n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function ji(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Eo(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function Hd(e){let t=String(e||""),r=t.startsWith("#")?t.slice(1):t,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let i=new URLSearchParams(s).get("issue");if(i)return decodeURIComponent(i)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function Gd(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function Bi(e){let t=ft("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):Hd(n),a=Gd(n);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let u=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==u&&(window.location.hash=u)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=Eo(o,n);t("goto issue %s (view=%s)",n,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?Eo(n,o):`#/${n}`;t("goto view %s (id=%s)",n,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var Vd=Object.freeze({workspace_config:{default_workspace:null}});function Ui(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:Vd.workspace_config.default_workspace}}}function Wi(e={}){let t=ft("state"),r={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:Ui(e.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let a={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?Ui(o.config):r.config},i=a.workspace.current?.path!==r.workspace.current?.path||a.workspace.available.length!==r.workspace.available.length||a.workspace.hidden.length!==r.workspace.hidden.length||a.workspace.hidden.some((d,f)=>d!==r.workspace.hidden[f]),u=a.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;a.selected_id===r.selected_id&&a.view===r.view&&a.filters.status===r.filters.status&&a.filters.search===r.filters.search&&a.filters.type===r.filters.type&&a.board.closed_filter===r.board.closed_filter&&a.worker.selected_parent_id===r.worker.selected_parent_id&&a.worker.show_closed_children.length===r.worker.show_closed_children.length&&a.worker.show_closed_children.every((d,f)=>d===r.worker.show_closed_children[f])&&!i&&!u||(r=a,t("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function zi(e){let t=ft("activity"),r=0,n=new Map,s=1;function o(){if(!e)return;let d=r>0;e.toggleAttribute("hidden",!d),e.setAttribute("aria-busy",d?"true":"false")}function a(){r+=1,t("start count=%d",r),o()}function i(){let d=r;r=Math.max(0,r-1),d<=0?t("done called but count was already %d",d):t("done count=%d\u2192%d",d,r),o()}function u(d){return async(_,y)=>{let T=s++,A=Date.now();n.set(T,{type:_,start_ts:A}),t("request start id=%d type=%s count=%d",T,_,r+1),a();let R=!1,N=()=>{R||(R=!0,n.delete(T),i())},Y=setTimeout(()=>{R||(t("request TIMEOUT id=%d type=%s elapsed=%dms",T,_,Date.now()-A),N())},3e4);try{let Z=await d(_,y),B=Date.now()-A;return t("request done id=%d type=%s elapsed=%dms",T,_,B),Z}catch(Z){let B=Date.now()-A;throw t("request error id=%d type=%s elapsed=%dms err=%o",T,_,B,Z),Z}finally{clearTimeout(Y),N()}}}return o(),{wrapSend:u,start:a,done:i,getCount:()=>r,getActiveRequests:()=>{let d=Date.now();return Array.from(n.entries()).map(([f,_])=>({id:f,type:_.type,elapsed_ms:d-_.start_ts}))}}}function oe(e,t="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=e,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",t==="success"?n.style.background="#156d36":t==="warning"?n.style.background="#a36a00":t==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function fs(e=void 0,t=void 0){function r(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function n(o,a,i){let u=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return u.sort(Mi),u;switch(i){case"created_desc":return u.sort(Fr),u;case"created_asc":return u.sort(Ii),u;case"updated_desc":return u.sort(Li),u;case"priority":return u.sort(Oi),u;case"manual":default:{let d=r();return d?u.sort(ds(d)):u.sort(Fr),u}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let i of a)try{i()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function jr(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function kt(e){let t=jr(e);if(t===null)return"";let r=new Date(t),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function qt(e,t){let r=jr(e);if(r===null)return"";let s=(typeof t=="number"?t:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let i=Math.floor(s/864e5);if(i<7)return`${i}\uC77C \uC804`;let u=Math.floor(i/7);if(i<30)return`${u}\uC8FC \uC804`;let d=Math.floor(i/30);return d<12?`${d}\uAC1C\uC6D4 \uC804`:`${Math.floor(i/365)}\uB144 \uC804`}function _s(e){if(!Array.isArray(e))return null;let t=null,r=-1;for(let n of e){if(!n||n.status!=="in_progress")continue;let s=jr(n.updated_at)??0;if(t===null||s>r){t=n,r=s;continue}s===r&&String(n.id)<String(t.id)&&(t=n)}return t}function ms(e){let t=e.transport,r=e.uiOrderStore;function n(a,i){return"renormalize"in a?a.renormalize:[{bead_id:i,rank:a.rank}]}function s(a,i){let u={...a.order};for(let d of i)u[d.bead_id]=d.rank;r&&r.set({revision:a.revision,order:u})}async function o(a,i,u){if(!t||!r)return;let d=r.get()||{revision:0,order:{}},f=n(Ao(i,u,d.order),a);s(d,f);let _=await t("ui-order-set",{expected_revision:d.revision,entries:f});if(_&&_.conflict){let y={revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}};r.set(y);let T=n(Ao(i,u,y.order),a);s(y,T);let A=await t("ui-order-set",{expected_revision:y.revision,entries:T});A&&A.applied&&r.set({revision:typeof A.revision=="number"?A.revision:0,order:A.order||{}})}else _&&_.applied&&r.set({revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}})}return{applyReorder:o}}function gs(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function To(e,t){return!t||typeof e!="string"||e.length===0||gs(t.visible_labels).includes(e)?!0:gs(t.hidden_labels).includes(e)?!1:!gs(t.hidden_prefixes).some(r=>r.length>0&&e.startsWith(r))}function bs(e,t){return gs(e).filter(r=>To(r,t))}function xr(e,t){let r=e&&e.chips?e.chips[t]:void 0;return typeof r=="boolean"?r:!0}var Kd={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},Gi={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},Hi={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},Yd={review:"\u2713",skip:"\u2298"},Ar={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function Zd(e,t,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function Vi(e){let t=e&&e.fill||"none";return t==="none"?Ar.none:e&&e.stale===!0?Ar.stale:t==="dim"?Ar.dim:e&&e.glyph==="review"?Ar.review:e&&e.glyph==="skip"?Ar.skip:Ar.done}function Xd(e){if(!e||e.fill==="none"||!e.approval_state)return Vi(e);let t=[];return e.glyph==="review"?t.push(Ar.review):e.glyph==="skip"&&t.push(Ar.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function Qd(e,t,r){let n=Kd[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,a=Yd[t&&t.glyph||""]||"",i="bar";s==="dim"?i+=` b-${n} dim`:s==="full"&&(i+=` b-${n} full`),o&&(i+=" stale"),r&&(i+=" cur");let u=s==="none"?"lbl":`lbl l-${n} on`,d=r?`color: var(--stage-${n}-on)`:"";return l`
    <div class="seg">
      <div class=${i} style=${d}>${a}</div>
      <div class=${u}>
        ${Gi[e]||e}
      </div>
    </div>
  `}function hs(e,t){if(!e||!e.stages)return"";let r=Hi[e.route]||Hi.spec_backed,n=e.stages,s=Zd(r,n,String(t||"open")),o=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${r.map(a=>`${Gi[a]||a} ${a==="plan"?Xd(n[a]||{}):Vi(n[a]||{})}`).join(" \xB7 ")}`;return l`
    <div class="stp" role="img" aria-label=${o}>
      ${r.map(a=>Qd(a,n[a]||{},a===s))}
    </div>
  `}function Jd(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Ki=2;function ep(e){if(!e)return[];let t=[];if(e.external){let n=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(l`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(e.blockers)?e.blockers:[];if(r.length>0){let n=r.slice(0,Ki).join(", "),s=r.length-Ki,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;t.push(l`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function Co(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function Yi(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function Br(e){return`${e.kind}:${Yi(e)}@${e.sha}`}function ys(e,t){if(!e)return null;let r=Co(e.kind),n=e.reason,s=e.kind==="delegated"?n===null:typeof n=="string"&&n.trim().length>0&&!/[\r\n]/.test(n);if(!r||!s)return null;let o=Co(t?.kind),a=o!==null&&t?.kind!==e.kind,i=`\uACC4\uD68D \xB7 ${r}${a?` \u2192 ${o}`:""}`,u=`planned_execution ${e.kind}${typeof n=="string"?`:${n}`:""}`,d=t?` \xB7 exec_receipt ${Br(t)}`:"";return{kind:e.kind,label:i,title:`${u}${d}`}}function Zi(e,t){let r=ys(e,t);return r?l`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${r.kind}
        title=${r.title}
        >${r.label}</span
      >`:null}function tp(e){if(!e)return null;let t=Co(e.kind);return t?l`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${Br(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function rp(e,t){let r=t.policy||null,n=e.workflow&&e.workflow.chips||{},s=[];if(n.route&&xr(r,"route")){let i=n.route_source==="derived";s.push(l`<span
        class="ctl-chip ctl-chip--route${i?" is-derived":""}"
        title=${i?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${i?"unset":n.route}</span
      >`)}if(n.fast_track&&xr(r,"fast_track")&&s.push(l`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&xr(r,"pr")){let i=n.pr.number;s.push(l`<span class="ctl-chip ctl-chip--pr"
        >${`PR${i!=null?` #${i}`:""}`}</span
      >`)}let o=Zi(n.planned_execution,n.exec_receipt);if(o&&s.push(o),n.exec_receipt){let i=n.exec_receipt;s.push(l`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Br(i)}`}
        >${`exec ${i.kind==="delegated"?Yi(i):`main:${i.actor}`} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}if(n.impl_entry){let i=n.impl_entry;s.push(l`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${i.actor}@${i.sha}`}
        >${`impl ${i.actor} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}for(let i of bs(e.labels,r))s.push(l`<span class="ctl-chip ctl-chip--label">${i}</span>`);return e.from_id&&xr(r,"from")&&s.push(l`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${i=>{i.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(i,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),xr(r,"blocked")&&s.push(...ep(e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&xr(r,"blocked")&&s.push(l`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":l`<div class="board-card__chips">${s}</div>`}function np(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function sp(e){let t=qt(e.created_at),r=qt(e.updated_at);return!t&&!r?"":l`<span class="board-card__times">
    ${t?l`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${kt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&r?l`<span class="board-card__time-sep">·</span>`:""}
    ${r?l`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${kt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function op(e,t){let r=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=t.isExpanded?t.isExpanded(e.id):!0,o=n>0?r.children.slice().sort(Pi):r.children;return l`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?l`<button
              type="button"
              class="board-card__roll-toggle"
              aria-expanded=${s?"true":"false"}
              @click=${a=>t.onRollupToggle&&t.onRollupToggle(a,e.id)}
            >
              children ${r.count}/${n} ${s?"\u25B4":"\u25BE"}
            </button>`:l`<span class="board-card__roll-none">children 없음</span>`}
        ${sp(e)}
      </div>
      ${n>0&&r.current?l`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${r.current.title||r.current.id}</span
            >
          </div>`:""}
      ${s&&n>0?l`<div class="board-card__roll-list">
            ${o.map((a,i)=>l`<button
                  type="button"
                  class="board-card__roll-child"
                  @click=${u=>t.onChildClick&&t.onChildClick(u,a.id)}
                >
                  <span class=${np(a.status)}>●</span>
                  <span class="board-card__roll-child-ord">${i+1}</span>
                  <span class="board-card__roll-child-title"
                    >${a.title||a.id}</span
                  >
                  ${ys(a.workflow?.chips?.planned_execution,a.workflow?.chips?.exec_receipt)?l`<span class="board-card__roll-child-chips">
                        ${Zi(a.workflow?.chips?.planned_execution,a.workflow?.chips?.exec_receipt)}
                        ${tp(a.workflow?.chips?.exec_receipt)}
                      </span>`:""}
                </button>`)}
          </div>`:""}
    </div>
  `}function vs(e,t){let r=Jd(e.priority);return l`
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
        ${r?l`<span class="board-card__pri">${r}</span>`:""}
      </div>
      <div class="board-card__title">${e.title||"(\uC81C\uBAA9 \uC5C6\uC74C)"}</div>
      ${rp(e,t)}
      ${e.workflow&&xr(t.policy||null,"stepper")?hs(e.workflow,e.status):""}
      ${op(e,t)}
    </article>
  `}function rn(e,t){let r=Array.isArray(e.items)?e.items.length:0,n=e.is_closed===!0;return l`
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
        ${n?l`<select
              class="board-column__closed-range"
              aria-label="Closed period"
              @change=${t.onClosedRangeChange}
            >
              ${lr.map(o=>l`<option
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
  `}function Xi(e,t,r){return l`
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
          ${e.items.length===0?l`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(n=>vs(n,t))}
        </div>
      </div>
    </dialog>
  `}var ap=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],ip=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],lp=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function cp(e,t,r){let n=e.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return l`
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
      ${r.label_menu_open?l`<div class="board-filter__label-menu" role="group">
            ${r.label_options.length===0?l`<div class="board-filter__label-empty">라벨 없음</div>`:r.label_options.map(o=>l`<label class="board-filter__label-row">
                      <input
                        type="checkbox"
                        .checked=${e.labels.includes(o)}
                        @change=${()=>t.onLabelToggle(o)}
                      />
                      <span>${o}</span>
                    </label>`)}
            ${n>0?l`<button
                  type="button"
                  class="board-filter__label-clear"
                  @click=${t.onLabelClear}
                >
                  선택 해제
                </button>`:""}
          </div>`:""}
    </div>
  `}function Qi(e,t,r){return l`
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
        ${ap.map(n=>l`<option
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
        ${ip.map(n=>l`<option
              value=${n.value}
              ?selected=${e.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${cp(e,t,r)}
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
        ${lp.map(n=>l`<option
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
  `}var up=200,dp={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},pp=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Ji="beads-ui.board.sort",el=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function fp(){try{let e=window.localStorage.getItem(Ji);if(e&&el.has(e))return e}catch{}return"created_desc"}function tl(e,t){let r=ft("views:board"),n=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,i=t.displayPolicyStore,u=t.workerQueueStore,d=t.onClosedRangeChange,f=t.onNewIssue,_=t.closedRange||Nt,y=s?fs(s,a):null,T=ms({transport:o,uiOrderStore:a}),A=[],R=[],N=[],Y=[],Z=[],B=[],U=!1,I=0,W=fp(),b=new Map,C=new Map,z=new Map,re=new Set,L={search:"",priority:"",type:"",labels:[]},M=!1,ue=null;function fe(F){return String(F.status||"open")==="open"}function de(F){let ee=String(F.status||"open");return ee==="open"||ee==="blocked"}function Be(F){let ee=L.search.trim().toLowerCase(),_e=L.priority,w=L.type,E=L.labels;return F.filter(P=>{if(ee){let Q=String(P.id||"").toLowerCase(),ke=String(P.title||"").toLowerCase();if(!Q.includes(ee)&&!ke.includes(ee))return!1}if(_e!==""&&String(P.priority)!==_e||w!==""&&String(P.issue_type||"")!==w)return!1;if(E.length>0){let Q=Array.isArray(P.labels)?P.labels:[];if(!E.some(ke=>Q.includes(ke)))return!1}return!0})}function Qe(){let F=new Set;for(let ee of[A,R,N,Y,Z,B])for(let _e of ee){let w=Array.isArray(_e.labels)?_e.labels:[];for(let E of w)typeof E=="string"&&E.length>0&&F.add(E)}return Array.from(F).sort()}function Ve(){return L.search.trim()!==""||L.priority!==""||L.type!==""||L.labels.length>0}function Me(){try{if(y){let F=y.selectBoardColumn("tab:board:in-progress","in_progress",W),ee=y.selectBoardColumn("tab:board:blocked","blocked",W).filter(de),_e=new Set(F.map(Le=>Le.id)),w=y.selectBoardColumn("tab:board:ready","ready",W).filter(Le=>fe(Le)&&!_e.has(Le.id)),E=y.selectBoardColumn("tab:board:resolved","resolved",W),P=y.selectBoardColumn("tab:board:deferred","deferred",W),Q=y.selectBoardColumn("tab:board:closed","closed").slice(0,up),ke=[...ee,...w,...F,...E,...Q];Ue(ke);let J=new Set;for(let Le of ke)Le&&Le.id&&!Ro(Le)&&J.add(Le.id);let xe=!Ve();A=xe?vn(ee,J):ee,R=xe?vn(w,J):w,N=xe?vn(F,J):F,Y=xe?vn(E,J):E,Z=P,I=P.length,B=xe?vn(Q,J):Q,b=new Map;for(let Le of A)b.set(Le.id,"open");for(let Le of R)b.set(Le.id,"open");for(let Le of N)b.set(Le.id,"in_progress");for(let Le of Y)b.set(Le.id,"resolved");for(let Le of Z)b.set(Le.id,"deferred");for(let Le of B)b.set(Le.id,"closed");C=new Map;for(let Le of A)C.set(Le.id,"blocked-col");for(let Le of R)C.set(Le.id,"ready-col");for(let Le of N)C.set(Le.id,"in-progress-col");for(let Le of Y)C.set(Le.id,"resolved-col");for(let Le of B)C.set(Le.id,"closed-col")}O()}catch{A=[],R=[],N=[],Y=[],Z=[],B=[],z=new Map,O()}}function Ue(F){let ee=new Map;for(let w of F)w&&w.id&&!ee.has(w.id)&&ee.set(w.id,w);let _e=new Map;for(let w of ee.values()){let E=Ro(w);if(!E)continue;let P=_e.get(E);P||(P=[],_e.set(E,P)),P.push({id:w.id,title:w.title,status:w.status,metadata:w.metadata,workflow:w.workflow,created_at:w.created_at,updated_at:w.updated_at})}z=_e}function le(F){let ee=z.get(F)||[],_e=0;for(let E of ee)(E.status==="resolved"||E.status==="closed")&&(_e+=1);let w=_s(ee);return{total:ee.length,count:_e,current:w,children:ee}}function Ae(F){return!re.has(F)}function Ie(F,ee){F.preventDefault(),F.stopPropagation(),re.has(ee)?re.delete(ee):re.add(ee),O()}function Ee(F,ee){F.preventDefault(),F.stopPropagation(),n(ee)}function he(F,ee){F.preventDefault(),F.stopPropagation(),n(ee)}function We(F,ee){ue||n(ee)}function et(F,ee){F.preventDefault(),F.stopPropagation(),_p(ee).then(_e=>{_e&&oe("\uBCF5\uC0AC\uB428","success",1200)})}function Te(F,ee){ue=ee,F.dataTransfer&&(F.dataTransfer.setData("text/plain",ee),F.dataTransfer.effectAllowed="move"),F.target.classList.add("board-card--dragging")}function tt(F){F.target.classList.remove("board-card--dragging"),je(),setTimeout(()=>{ue=null},0)}function K(F){let ee=String(F.target.value||"");!ee||ee===_||(_=ee,d&&d(ee),O())}function q(){return i?i.get():null}function ne(F){let ee=u?u.get():null,_e=ee?ee.cleanup_failed:null;if(!_e||typeof _e!="object"||Array.isArray(_e))return null;let w=_e[F];return!w||typeof w!="object"||Array.isArray(w)?null:w}let Oe={onCardClick:We,onCopyId:et,onDragStart:Te,onDragEnd:tt,onClosedRangeChange:K,rollupFor:le,isExpanded:Ae,onRollupToggle:Ie,onChildClick:Ee,onFromChipClick:he,cleanupFailureFor:ne,get policy(){return q()}};function Fe(F,ee){ue||(pe(),n(ee))}function ze(F,ee){F.preventDefault(),F.stopPropagation(),pe(),n(ee)}let Ce={...Oe,onCardClick:Fe,onChildClick:ze,onFromChipClick:ze,get policy(){return q()}};function ct(F){let ee=F.target,_e=e.querySelector(".board-filter__labels");ee&&_e&&_e.contains(ee)||te()}function Ye(F){F.key==="Escape"&&te()}function G(){M||(M=!0,document.addEventListener("mousedown",ct),document.addEventListener("keydown",Ye),O())}function te(){M&&(M=!1,document.removeEventListener("mousedown",ct),document.removeEventListener("keydown",Ye),O())}function De(F){F.key==="Escape"&&pe()}function rt(){U||(U=!0,document.addEventListener("keydown",De),O())}function pe(){U&&(U=!1,document.removeEventListener("keydown",De),O())}let h={onClose:pe,onOverlayClick(F){F.target===F.currentTarget&&pe()}},$={onSearchInput(F){L.search=String(F.target.value||""),Me()},onPriorityChange(F){L.priority=String(F.target.value||""),Me()},onTypeChange(F){L.type=String(F.target.value||""),Me()},onSortChange(F){let ee=String(F.target.value||"");if(!(!el.has(ee)||ee===W)){W=ee;try{window.localStorage.setItem(Ji,ee)}catch{}Me()}},onDeferredToggle(){U?pe():rt()},onLabelMenuToggle(){M?te():G()},onLabelToggle(F){let ee=L.labels.indexOf(F);ee===-1?L.labels.push(F):L.labels.splice(ee,1),Me()},onLabelClear(){L.labels.length!==0&&(L.labels=[],Me())},onNewIssue(){f&&f()}};function k(){return l`
      <div class="board-view">
        ${Qi(L,$,{sort_mode:W,deferred_popup_open:U,deferred_count:I,label_options:Qe(),label_menu_open:M})}
        <div class="board-root">
          ${rn({title:"Blocked",id:"blocked-col",items:Be(A)},Oe)}
          ${rn({title:"Ready",id:"ready-col",items:Be(R)},Oe)}
          ${rn({title:"In progress",id:"in-progress-col",items:Be(N)},Oe)}
          ${rn({title:"Resolved",id:"resolved-col",items:Be(Y)},Oe)}
          ${rn({title:"Closed",id:"closed-col",items:Be(B),is_closed:!0,closed_range:_},Oe)}
        </div>
        ${U?Xi({items:Be(Z),count:I},Ce,h):""}
      </div>
    `}function O(){He(k(),e),V()}function V(){try{let F=e.querySelector("#deferred-popup");F&&!F.open&&(typeof F.showModal=="function"?F.showModal():F.setAttribute("open",""));let ee=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let _e of ee)Array.from(_e.querySelectorAll(".board-card")).forEach((E,P)=>{E.tabIndex=P===0?0:-1})}catch{}}async function X(F,ee){if(!o){oe("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:F,status:ee}),oe("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(_e){r("update-status failed: %o",_e),oe("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function se(F){switch(F){case"blocked-col":return A;case"ready-col":return R;case"in-progress-col":return N;case"resolved-col":return Y;default:return[]}}function ce(F,ee,_e){if(!o||!a)return;let w=se(F),E=w.find(xe=>xe.id===ee);if(!E)return;let P=w.filter(xe=>xe.id!==ee),Q=_e.closest?_e.closest(".board-card"):null,ke=P.length;if(Q){let xe=Q.getAttribute("data-issue-id");if(xe===ee)return;let Le=P.findIndex(gt=>gt.id===xe);Le>=0&&(ke=Le)}let J=P.slice();J.splice(ke,0,E),T.applyReorder(ee,J,ke)}function je(){for(let F of Array.from(e.querySelectorAll(".board-column--drag-over")))F.classList.remove("board-column--drag-over")}let be=null;e.addEventListener("dragover",F=>{F.preventDefault(),F.dataTransfer&&(F.dataTransfer.dropEffect="move");let _e=F.target.closest(".board-column");_e&&_e!==be&&(be&&be.classList.remove("board-column--drag-over"),_e.classList.add("board-column--drag-over"),be=_e)}),e.addEventListener("dragleave",F=>{let ee=F.relatedTarget;(!ee||!e.contains(ee))&&be&&(be.classList.remove("board-column--drag-over"),be=null)}),e.addEventListener("drop",F=>{F.preventDefault(),be&&(be.classList.remove("board-column--drag-over"),be=null);let ee=F.target,_e=ee.closest(".board-column");if(!_e)return;let w=F.dataTransfer?.getData("text/plain")||"";if(!w)return;let E=_e.id,P=C.get(w);if(P&&P===E){if(pp.has(E)){if(W!=="manual"){oe("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}ce(E,w,ee)}return}let Q=dp[E];if(!Q){oe("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}b.get(w)!==Q&&X(w,Q)}),e.addEventListener("keydown",F=>{let ee=F.target;if(!(ee instanceof HTMLElement))return;let _e=String(ee.tagName||"").toLowerCase();if(_e==="input"||_e==="textarea"||_e==="select"||_e==="button"||_e==="a"||ee.isContentEditable===!0)return;let w=ee.closest(".board-card");if(!w)return;let E=String(F.key||"");if(E==="Enter"||E===" "){F.preventDefault();let J=w.getAttribute("data-issue-id");J&&n(J);return}if(E!=="ArrowUp"&&E!=="ArrowDown"&&E!=="ArrowLeft"&&E!=="ArrowRight")return;F.preventDefault();let P=w.closest(".board-column");if(!P)return;let Q=Array.from(P.querySelectorAll(".board-card")),ke=Q.indexOf(w);if(E==="ArrowDown"&&ke<Q.length-1){Se(w,Q[ke+1]);return}if(E==="ArrowUp"&&ke>0){Se(w,Q[ke-1]);return}if(E==="ArrowLeft"||E==="ArrowRight"){let J=Array.from(e.querySelectorAll(".board-column")),xe=J.indexOf(P),Le=E==="ArrowRight"?1:-1,gt=xe+Le;for(;gt>=0&&gt<J.length;){let ht=J[gt].querySelector(".board-card");if(ht){Se(w,ht);return}gt+=Le}}});function Se(F,ee){try{F.tabIndex=-1,ee.tabIndex=0,ee.focus()}catch{}}let ye=null;y&&y.subscribe&&(ye=y.subscribe(()=>{try{Me()}catch{}}));let st=null;i&&i.subscribe&&(st=i.subscribe(()=>{try{Me()}catch{}}));let ot=null;return u&&u.subscribe&&(ot=u.subscribe(()=>{O()})),{async load(){r("load"),Me()},clear(){te(),pe(),ye&&(ye(),ye=null),st&&(st(),st=null),ot&&(ot(),ot=null),e.replaceChildren(),A=[],R=[],N=[],Y=[],Z=[],B=[],b=new Map,C=new Map}}}function Ro(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function vn(e,t){return e.filter(r=>{let n=Ro(r);return!(n&&t.has(n))})}async function _p(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let r=!1;try{r=document.execCommand("copy")}finally{t.remove()}return r}catch{return!1}}async function Zt(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}function cr(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function Sr(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function mp(e,t=document){let r=t.createElement("dialog");r.className="continuation-dialog";let n=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),i=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",i.textContent=`${cr(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${cr(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,n.type="button",n.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",n.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",r.append(a,i,n,s,o),t.body.append(r),new Promise(u=>{let d=f=>{typeof r.close=="function"&&r.close(),r.remove(),u(f)};n.addEventListener("click",()=>d("prior_session")),s.addEventListener("click",()=>d("fresh_current")),o.addEventListener("click",()=>d(null)),r.addEventListener("cancel",f=>{f.preventDefault(),d(null)}),typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")})}async function mr(e,t,r={}){let n=e;for(r.onResult?.(n);n?.continuation_mismatch;){let s=n.continuation_mismatch,o=await mp(s);if(o===null)return n;n=await t(o,s.decision_token),r.onResult?.(n),n?.conflict&&r.refresh&&(n=await r.refresh(n),r.onResult?.(n))}return n}var gp=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","orchestration_model","orchestration_effort","orchestration_speed"],rl={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},bp=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function Et(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function yt(e){return typeof e=="string"&&e.length>0?e:null}function ws(e){return e.startsWith("gpt-")?e.slice(4):e}function bt(e,t,r,n,s){return{value:e,source:t,display:r,full_value:n,resolution:s}}function al(e,t,r){let n=yt(t[e]);if(n!==null)return{value:n,source:"pin"};let s=yt(r[e]);return s===null?null:{value:s,source:"global"}}function wn(e,t,r,n){return al(e,t,r)||{value:n,source:"base"}}function nl(e,t,r,n){let s=r?.implementation?.model_catalog;if(t&&Et(s?.[t])){let a=yt(s[t][e]);if(a!==null)return a}if(t&&Array.isArray(s?.[t])&&s[t].includes(e))return e;if(!t&&Et(s)){for(let a of Object.values(s))if(Et(a)){let i=yt(a[e]);if(i!==null)return i}else if(Array.isArray(a)&&a.includes(e))return e}let o=n?.model_index?.[e];return yt(n?.runners?.[o]?.models?.[e]?.id)||e}function hp(e,t){return yt(t?.review?.reviewers?.[e]?.model)||e}function kn(e,t,r=!1){if(e==="default")return bt(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let n=r?ws(e):e;return bt(e,t,n,e,"explicit")}function yp(e,t,r){let n=t?.implementation?.model_catalog?.[e],s=[];Et(n)?s.push(...Object.keys(n)):Array.isArray(n)&&s.push(...n.filter(a=>typeof a=="string"));let o=r?.runners?.[e]?.models;if(Et(o))for(let a of Object.keys(o))s.includes(a)||s.push(a);return s}function sl(e){return bt(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function ol(e,t,r){let n=al(e,t,r);return n?kn(n.value,n.source):bt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function nn(e){let t=Et(e.pin)?e.pin:{},r=Et(e.global)?e.global:{},n=Et(e.execution_defaults)?e.execution_defaults:null,s=n?.supported===!0&&Et(n.session)?n.session:null,o=n?.supported===!0&&Et(n.orchestration)?n.orchestration:null,a=Et(e.runner_catalog)?e.runner_catalog:null,i={};if(s){let u=wn("workflow_mode",t,r,yt(s.workflow_mode_default));i.workflow_mode=u.source==="base"?bt(u.value,"base",u.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",u.value,"default"):kn(u.value,u.source);for(let A of["spec_review","plan_review","impl_review"]){let R=`${A}_model`,N=yt(A==="plan_review"?u.value==="fast_track"?s.plan_review?.fast_track_default:s.plan_review?.standard_recommended:s.review?.default),Y=wn(R,t,r,N);if(Y.value===null)i[R]=bt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(Y.value!=="self"&&Y.value!=="skip"&&!Et(s.review?.reviewers?.[Y.value]))i[R]=sl(bt(Y.value,Y.source,"",null,"explicit"));else{let Z=hp(Y.value,s);i[R]=bt(Y.value,Y.source,ws(Z),Z,Y.source==="base"?"default":"explicit")}}for(let[A,R]of Object.entries(rl)){let N=i[R].value;if(N==="self"||N==="skip"){i[A]=bt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let Y=yt(s.review?.reviewers?.[N||""]?.effort),Z=wn(A,t,r,Y);i[A]=Z.value===null?bt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):bt(Z.value,Z.source,Z.value,Z.value,Z.source==="base"?"default":"explicit")}let d=Et(s.implementation?.default)?s.implementation.default:{},f=yt(e.route),_=f!==null&&["quick_fix","spec_backed","full_plan"].includes(f),y=Et(s.implementation?.route_defaults)?s.implementation.route_defaults:{},T=_&&Et(y[f])?y[f]:{};for(let A of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let R=wn(A,t,r,A==="impl_dispatch"?yt(T.dispatch)||yt(d.dispatch):yt(d[A.replace("impl_","")]));i[A]=R.value===null?bt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):bt(R.value,R.source,R.value,R.value,R.source==="base"?"default":"explicit")}if(i.impl_dispatch.value==="main"){i.impl_dispatch.display="\uBA54\uC778";for(let A of["impl_runtime","impl_model","impl_effort","impl_speed"])i[A]=bt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(i.impl_dispatch.value==="delegated"&&(i.impl_dispatch.display="\uC704\uC784"),i.impl_runtime.value==="inherit"&&(i.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",i.impl_runtime.resolution="dynamic"),i.impl_model.value!==null){let A=i.impl_runtime.value==="inherit"?yt(e.controller_runtime):i.impl_runtime.value,R=A?yp(A,s,a):[];if(i.impl_model.value!=="auto"&&R.length>0&&!R.includes(i.impl_model.value))i.impl_model=sl(i.impl_model);else{let N=nl(i.impl_model.value,A,s,a);i.impl_model.display=ws(N),i.impl_model.full_value=N}}if(i.impl_effort.value==="auto"){let A=yt(e.transport)||(i.impl_runtime.value==="codex"?"codex-native-spawn":i.impl_runtime.value==="claude"?"implement-claude":null),R=A?yt(s.implementation?.effort_by_transport?.[A]?.auto):null;R&&!bp.has(R)?(i.impl_effort.display=`${R} (\uBE44\uD638\uD658)`,i.impl_effort.full_value=R,i.impl_effort.resolution="incompatible"):(i.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",i.impl_effort.resolution="dynamic")}i.impl_speed.value==="default"&&(i.impl_speed=i.impl_speed.source==="base"?bt("default","base","default (\uC77C\uBC18)","default","default"):kn("default",i.impl_speed.source))}}else for(let u of gp.filter(d=>!d.startsWith("orchestration_")))i[u]=ol(u,t,r);if(!s){for(let[u,d]of Object.entries(rl))(i[d].value==="self"||i[d].value==="skip")&&(i[u]=bt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(i.impl_dispatch.value==="main"){i.impl_dispatch.display="\uBA54\uC778";for(let u of["impl_runtime","impl_model","impl_effort","impl_speed"])i[u]=bt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else i.impl_dispatch.value==="delegated"&&(i.impl_dispatch.display="\uC704\uC784"),i.impl_runtime.value==="inherit"&&(i.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",i.impl_runtime.resolution="dynamic"),i.impl_effort.value==="auto"&&(i.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",i.impl_effort.resolution="dynamic")}for(let u of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!o){i[u]=ol(u,t,r);continue}let d=u.replace("orchestration_",""),f=yt(o[d]),_=wn(u,t,r,f);if(u==="orchestration_effort"&&_.source==="base"){i[u]=bt(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(_.value===null){i[u]=bt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(u==="orchestration_model"){let y=_.source==="base"?yt(o.model_id)||_.value:nl(_.value,null,s,a);i[u]=bt(_.value,_.source,ws(y),y,_.source==="base"?"default":"explicit");continue}if(_.value==="default"){i[u]=_.source==="base"?bt("default","base","default (\uC77C\uBC18)","default","default"):kn("default",_.source);continue}i[u]=kn(_.value,_.source)}return i}function vp(e,t){let r=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let n=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${r} (${n})`}function ks(e){let t=Et(e.pin)?e.pin:{},r=Et(e.global)?e.global:{},n=f=>nn({pin:e.layer==="pin"?f:t,global:e.layer==="pin"?r:f,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,controller_runtime:e.controller_runtime}),s=e.layer==="pin"?t:r,o={...s};delete o[e.key];let a=n(o)[e.key],i=n(s)[e.key],u=yt(s[e.key]),d=[...e.choices];return u!==null&&!d.includes(u)&&d.unshift(u),{unset_label:vp(a,e.layer==="pin"),full_value:a.full_value,unavailable:a.resolution==="unavailable",disabled:i?.resolution==="not_applicable",options:d.map(f=>{let _=n({...s,[e.key]:f})[e.key];return{value:f,label:_.display,full_value:_.full_value}})}}function sn(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let r=e.createElement("h2"),n=e.createElement("textarea"),s=e.createElement("div"),o=e.createElement("button"),a=e.createElement("button");return r.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",n.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",n.maxLength=4e3,s.className="resume-instructions-dialog__actions",o.type="button",o.textContent="\uC774\uC5B4\uD558\uAE30",a.type="button",a.textContent="\uCDE8\uC18C",s.append(o,a),t.append(r,n,s),e.body.append(t),new Promise(i=>{let u=!1,d=_=>{u||(u=!0,typeof t.close=="function"&&t.close(),t.remove(),i(_))},f=()=>d(n.value.trim());o.addEventListener("click",f),a.addEventListener("click",()=>d(null)),n.addEventListener("keydown",_=>{_.key==="Enter"&&(_.ctrlKey||_.metaKey)&&(_.preventDefault(),f())}),t.addEventListener("cancel",_=>{_.preventDefault(),d(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),n.focus()})}var dl="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function $t(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var gr=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],$n=[...gr,"reasoning_output_tokens"],wp=["implementation","review-consult"];function Io(e){let t=0;for(let r of gr)t+=$t(e?.[r]);return t}function kp(e){return!e||typeof e!="object"?!1:gr.some(t=>Number.isFinite(e[t]))}function il(e){return!e||typeof e!="object"?!1:$n.some(t=>Number.isFinite(e[t]))}function $p(e){let t={};for(let r of $n)e&&Number.isFinite(e[r])&&(t[r]=e[r]);return t}function ll(e){let t={};for(let r of $n)Number.isFinite(e[r])&&(t[r]=e[r]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function cl(e,t){return e==="codex"?$t(t.input_tokens)+$t(t.output_tokens):Io(t)}function xp(e){return e==="claude"?"Claude":"Codex"}function Ap(e){return`\u03C4 ${pl(e)}`}function Sp(e,t){let r=t.breakdown||{},n=[`\uC785\uB825 ${$t(r.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${$t(r.output_tokens).toLocaleString("en-US")}`];e==="claude"?n.push(`\uCE90\uC2DC\uC77D\uAE30 ${$t(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${$t(r.cache_creation_input_tokens).toLocaleString("en-US")}`):(n.push(`\uCE90\uC2DC\uC77D\uAE30 ${$t(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${$t(r.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(r.reasoning_output_tokens)&&n.push(`\uCD94\uB860\uCD9C\uB825 ${$t(r.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,n.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(dl),o.join(`
`)}function xt(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let r of["claude","codex"]){let n=e.providers[r];n&&t.push({provider:r,label:`${xp(r)} ${Ap(n.subtotal)}${typeof n.total_cost_usd=="number"&&Number.isFinite(n.total_cost_usd)?` \xB7 $${n.total_cost_usd.toFixed(2)}`:""}`,tooltip:Sp(r,n)})}return t}function xs(e){let t={},r={claude:!0,codex:!1},n={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let i=t[o];i||(i={subtotal:0,breakdown:{}},t[o]=i),i.subtotal+=a.subtotal;for(let u of $n)Number.isFinite(a.breakdown[u])&&(i.breakdown[u]=$t(i.breakdown[u])+$t(a.breakdown[u]));a.replayed&&(i.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?n.claude+=a.total_cost_usd:r.claude=!1)}return t.claude&&r.claude&&(t.claude.total_cost_usd=n.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function Lo(e){return!e||typeof e!="object"?null:Wt({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function Ep(e){return e==="codex"?"codex":"claude"}function Er(){return{subtotal:0,breakdown:$p(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function $s(e,t,r){e.subtotal+=t.subtotal;for(let n of $n)Number.isFinite(t.usage[n])&&(e.breakdown[n]=$t(e.breakdown[n])+$t(t.usage[n]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),r&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function ul(e,t){let r={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(r.legs=e.legs),e.replayed&&(r.replayed=!0),r}function pl(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function on(e){return kp(e)?`\u03C4 ${pl(Io(e))}`:null}function Xt(e){let t=on(e);if(!t)return null;let r=e?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${t} \xB7 $${r.toFixed(2)}`:t}function an(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${$t(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${$t(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${$t(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${$t(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${Io(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&r.push(dl),r.join(`
`)}function Wt(e,t){let r={claude:Er(),codex:Er()},n={orchestrator:{claude:Er(),codex:Er()},implementation:{claude:Er(),codex:Er()},"review-consult":{claude:Er(),codex:Er()}},s=new Set;for(let i of Object.values(e||{})){if(!i||i.bead_id!==t)continue;let u=i.usage;if(il(u)){let f=Ep(i.runner),_=ll(u),y={provider:f,role:"orchestrator",attempt_id:String(i.attempt_id||""),usage:_,subtotal:cl(f,_)};_.replayed===!0&&(y.replayed=!0),typeof i.model=="string"&&(y.model=i.model),typeof i.session_id=="string"&&(y.session_id=i.session_id),$s(r[f],y,!0),$s(n.orchestrator[f],y,!0)}let d=Array.isArray(i.usage_legs)?i.usage_legs:[];for(let f of d){if(!f||f.provider!=="codex"||!wp.includes(f.role)||!il(f.usage))continue;let _=typeof f.receipt_id=="string"&&f.receipt_id.length>0?f.receipt_id:null;if(!_||s.has(_))continue;s.add(_);let y=ll(f.usage),T={provider:"codex",role:f.role,attempt_id:String(i.attempt_id||""),usage:y,subtotal:cl("codex",y)};T.receipt_id=_,typeof f.model=="string"&&(T.model=f.model),typeof f.effort=="string"&&f.effort.trim().length>0&&(T.effort=f.effort),typeof f.session_id=="string"?T.session_id=f.session_id:typeof f.thread_id=="string"&&(T.session_id=f.thread_id),typeof f.turn_id=="string"&&(T.turn_id=f.turn_id),typeof f.completed_at=="string"&&(T.completed_at=f.completed_at),y.replayed===!0&&(T.replayed=!0),$s(r.codex,T,!1),$s(n[T.role].codex,T,!1)}}let o={};for(let i of["claude","codex"]){let u=r[i];if(u.legs.length===0)continue;let d=ul(u,!1);i==="claude"&&u.outer_count>0&&u.outer_cost_count===u.outer_count&&(d.total_cost_usd=u.outer_cost),o[i]=d}if(Object.keys(o).length===0)return null;let a={};for(let i of["orchestrator","implementation","review-consult"]){let u={};for(let d of["claude","codex"]){let f=n[i][d];f.legs.length>0&&(u[d]={...ul(f,!0),legs:f.legs})}Object.keys(u).length>0&&(a[i]=u)}return{providers:o,roles:a}}var{entries:wl,setPrototypeOf:fl,isFrozen:Tp,getPrototypeOf:Cp,getOwnPropertyDescriptor:Rp}=Object,{freeze:Rt,seal:zt,create:Fo}=Object,{apply:jo,construct:Bo}=typeof Reflect<"u"&&Reflect;Rt||(Rt=function(t){return t});zt||(zt=function(t){return t});jo||(jo=function(t,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return t.apply(r,s)});Bo||(Bo=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new t(...n)});var As=It(Array.prototype.forEach),Ip=It(Array.prototype.lastIndexOf),_l=It(Array.prototype.pop),xn=It(Array.prototype.push),Lp=It(Array.prototype.splice),Es=It(String.prototype.toLowerCase),Oo=It(String.prototype.toString),Mo=It(String.prototype.match),An=It(String.prototype.replace),Op=It(String.prototype.indexOf),Mp=It(String.prototype.trim),Qt=It(Object.prototype.hasOwnProperty),Ct=It(RegExp.prototype.test),Sn=Pp(TypeError);function It(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return jo(e,t,n)}}function Pp(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return Bo(e,r)}}function Xe(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Es;fl&&fl(e,null);let n=t.length;for(;n--;){let s=t[n];if(typeof s=="string"){let o=r(s);o!==s&&(Tp(t)||(t[n]=o),s=o)}e[s]=!0}return e}function Dp(e){for(let t=0;t<e.length;t++)Qt(e,t)||(e[t]=null);return e}function br(e){let t=Fo(null);for(let[r,n]of wl(e))Qt(e,r)&&(Array.isArray(n)?t[r]=Dp(n):n&&typeof n=="object"&&n.constructor===Object?t[r]=br(n):t[r]=n);return t}function En(e,t){for(;e!==null;){let n=Rp(e,t);if(n){if(n.get)return It(n.get);if(typeof n.value=="function")return It(n.value)}e=Cp(e)}function r(){return null}return r}var ml=Rt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Po=Rt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Do=Rt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Np=Rt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),No=Rt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),qp=Rt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),gl=Rt(["#text"]),bl=Rt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),qo=Rt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),hl=Rt(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Ss=Rt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Fp=zt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),jp=zt(/<%[\w\W]*|[\w\W]*%>/gm),Bp=zt(/\$\{[\w\W]*/gm),Up=zt(/^data-[\-\w.\u00B7-\uFFFF]+$/),Wp=zt(/^aria-[\-\w]+$/),kl=zt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),zp=zt(/^(?:\w+script|data):/i),Hp=zt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),$l=zt(/^html$/i),Gp=zt(/^[a-z][.\w]*(-[.\w]+)+$/i),yl=Object.freeze({__proto__:null,ARIA_ATTR:Wp,ATTR_WHITESPACE:Hp,CUSTOM_ELEMENT:Gp,DATA_ATTR:Up,DOCTYPE_NAME:$l,ERB_EXPR:jp,IS_ALLOWED_URI:kl,IS_SCRIPT_OR_DATA:zp,MUSTACHE_EXPR:Fp,TMPLIT_EXPR:Bp}),Tn={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Vp=function(){return typeof window>"u"?null:window},Kp=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},vl=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function xl(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Vp(),t=ve=>xl(ve);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==Tn.document||!e.Element)return t.isSupported=!1,t;let{document:r}=e,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:i,Element:u,NodeFilter:d,NamedNodeMap:f=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:_,DOMParser:y,trustedTypes:T}=e,A=u.prototype,R=En(A,"cloneNode"),N=En(A,"remove"),Y=En(A,"nextSibling"),Z=En(A,"childNodes"),B=En(A,"parentNode");if(typeof a=="function"){let ve=r.createElement("template");ve.content&&ve.content.ownerDocument&&(r=ve.content.ownerDocument)}let U,I="",{implementation:W,createNodeIterator:b,createDocumentFragment:C,getElementsByTagName:z}=r,{importNode:re}=n,L=vl();t.isSupported=typeof wl=="function"&&typeof B=="function"&&W&&W.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:M,ERB_EXPR:ue,TMPLIT_EXPR:fe,DATA_ATTR:de,ARIA_ATTR:Be,IS_SCRIPT_OR_DATA:Qe,ATTR_WHITESPACE:Ve,CUSTOM_ELEMENT:Me}=yl,{IS_ALLOWED_URI:Ue}=yl,le=null,Ae=Xe({},[...ml,...Po,...Do,...No,...gl]),Ie=null,Ee=Xe({},[...bl,...qo,...hl,...Ss]),he=Object.seal(Fo(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),We=null,et=null,Te=Object.seal(Fo(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),tt=!0,K=!0,q=!1,ne=!0,Oe=!1,Fe=!0,ze=!1,Ce=!1,ct=!1,Ye=!1,G=!1,te=!1,De=!0,rt=!1,pe="user-content-",h=!0,$=!1,k={},O=null,V=Xe({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),X=null,se=Xe({},["audio","video","img","source","image","track"]),ce=null,je=Xe({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),be="http://www.w3.org/1998/Math/MathML",Se="http://www.w3.org/2000/svg",ye="http://www.w3.org/1999/xhtml",st=ye,ot=!1,F=null,ee=Xe({},[be,Se,ye],Oo),_e=Xe({},["mi","mo","mn","ms","mtext"]),w=Xe({},["annotation-xml"]),E=Xe({},["title","style","font","a","script"]),P=null,Q=["application/xhtml+xml","text/html"],ke="text/html",J=null,xe=null,Le=r.createElement("form"),gt=function(c){return c instanceof RegExp||c instanceof Function},ht=function(){let c=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(xe&&xe===c)){if((!c||typeof c!="object")&&(c={}),c=br(c),P=Q.indexOf(c.PARSER_MEDIA_TYPE)===-1?ke:c.PARSER_MEDIA_TYPE,J=P==="application/xhtml+xml"?Oo:Es,le=Qt(c,"ALLOWED_TAGS")?Xe({},c.ALLOWED_TAGS,J):Ae,Ie=Qt(c,"ALLOWED_ATTR")?Xe({},c.ALLOWED_ATTR,J):Ee,F=Qt(c,"ALLOWED_NAMESPACES")?Xe({},c.ALLOWED_NAMESPACES,Oo):ee,ce=Qt(c,"ADD_URI_SAFE_ATTR")?Xe(br(je),c.ADD_URI_SAFE_ATTR,J):je,X=Qt(c,"ADD_DATA_URI_TAGS")?Xe(br(se),c.ADD_DATA_URI_TAGS,J):se,O=Qt(c,"FORBID_CONTENTS")?Xe({},c.FORBID_CONTENTS,J):V,We=Qt(c,"FORBID_TAGS")?Xe({},c.FORBID_TAGS,J):br({}),et=Qt(c,"FORBID_ATTR")?Xe({},c.FORBID_ATTR,J):br({}),k=Qt(c,"USE_PROFILES")?c.USE_PROFILES:!1,tt=c.ALLOW_ARIA_ATTR!==!1,K=c.ALLOW_DATA_ATTR!==!1,q=c.ALLOW_UNKNOWN_PROTOCOLS||!1,ne=c.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Oe=c.SAFE_FOR_TEMPLATES||!1,Fe=c.SAFE_FOR_XML!==!1,ze=c.WHOLE_DOCUMENT||!1,Ye=c.RETURN_DOM||!1,G=c.RETURN_DOM_FRAGMENT||!1,te=c.RETURN_TRUSTED_TYPE||!1,ct=c.FORCE_BODY||!1,De=c.SANITIZE_DOM!==!1,rt=c.SANITIZE_NAMED_PROPS||!1,h=c.KEEP_CONTENT!==!1,$=c.IN_PLACE||!1,Ue=c.ALLOWED_URI_REGEXP||kl,st=c.NAMESPACE||ye,_e=c.MATHML_TEXT_INTEGRATION_POINTS||_e,w=c.HTML_INTEGRATION_POINTS||w,he=c.CUSTOM_ELEMENT_HANDLING||{},c.CUSTOM_ELEMENT_HANDLING&&gt(c.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(he.tagNameCheck=c.CUSTOM_ELEMENT_HANDLING.tagNameCheck),c.CUSTOM_ELEMENT_HANDLING&&gt(c.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(he.attributeNameCheck=c.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),c.CUSTOM_ELEMENT_HANDLING&&typeof c.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(he.allowCustomizedBuiltInElements=c.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Oe&&(K=!1),G&&(Ye=!0),k&&(le=Xe({},gl),Ie=[],k.html===!0&&(Xe(le,ml),Xe(Ie,bl)),k.svg===!0&&(Xe(le,Po),Xe(Ie,qo),Xe(Ie,Ss)),k.svgFilters===!0&&(Xe(le,Do),Xe(Ie,qo),Xe(Ie,Ss)),k.mathMl===!0&&(Xe(le,No),Xe(Ie,hl),Xe(Ie,Ss))),c.ADD_TAGS&&(typeof c.ADD_TAGS=="function"?Te.tagCheck=c.ADD_TAGS:(le===Ae&&(le=br(le)),Xe(le,c.ADD_TAGS,J))),c.ADD_ATTR&&(typeof c.ADD_ATTR=="function"?Te.attributeCheck=c.ADD_ATTR:(Ie===Ee&&(Ie=br(Ie)),Xe(Ie,c.ADD_ATTR,J))),c.ADD_URI_SAFE_ATTR&&Xe(ce,c.ADD_URI_SAFE_ATTR,J),c.FORBID_CONTENTS&&(O===V&&(O=br(O)),Xe(O,c.FORBID_CONTENTS,J)),h&&(le["#text"]=!0),ze&&Xe(le,["html","head","body"]),le.table&&(Xe(le,["tbody"]),delete We.tbody),c.TRUSTED_TYPES_POLICY){if(typeof c.TRUSTED_TYPES_POLICY.createHTML!="function")throw Sn('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof c.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Sn('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');U=c.TRUSTED_TYPES_POLICY,I=U.createHTML("")}else U===void 0&&(U=Kp(T,s)),U!==null&&typeof I=="string"&&(I=U.createHTML(""));Rt&&Rt(c),xe=c}},Ze=Xe({},[...Po,...Do,...Np]),St=Xe({},[...No,...qp]),Ht=function(c){let m=B(c);(!m||!m.tagName)&&(m={namespaceURI:st,tagName:"template"});let S=Es(c.tagName),H=Es(m.tagName);return F[c.namespaceURI]?c.namespaceURI===Se?m.namespaceURI===ye?S==="svg":m.namespaceURI===be?S==="svg"&&(H==="annotation-xml"||_e[H]):!!Ze[S]:c.namespaceURI===be?m.namespaceURI===ye?S==="math":m.namespaceURI===Se?S==="math"&&w[H]:!!St[S]:c.namespaceURI===ye?m.namespaceURI===Se&&!w[H]||m.namespaceURI===be&&!_e[H]?!1:!St[S]&&(E[S]||!Ze[S]):!!(P==="application/xhtml+xml"&&F[c.namespaceURI]):!1},vt=function(c){xn(t.removed,{element:c});try{B(c).removeChild(c)}catch{N(c)}},Ot=function(c,m){try{xn(t.removed,{attribute:m.getAttributeNode(c),from:m})}catch{xn(t.removed,{attribute:null,from:m})}if(m.removeAttribute(c),c==="is")if(Ye||G)try{vt(m)}catch{}else try{m.setAttribute(c,"")}catch{}},rr=function(c){let m=null,S=null;if(ct)c="<remove></remove>"+c;else{let $e=Mo(c,/^[\r\n\t ]+/);S=$e&&$e[0]}P==="application/xhtml+xml"&&st===ye&&(c='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+c+"</body></html>");let H=U?U.createHTML(c):c;if(st===ye)try{m=new y().parseFromString(H,P)}catch{}if(!m||!m.documentElement){m=W.createDocument(st,"template",null);try{m.documentElement.innerHTML=ot?I:H}catch{}}let ae=m.body||m.documentElement;return c&&S&&ae.insertBefore(r.createTextNode(S),ae.childNodes[0]||null),st===ye?z.call(m,ze?"html":"body")[0]:ze?m.documentElement:ae},nr=function(c){return b.call(c.ownerDocument||c,c,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},sr=function(c){return c instanceof _&&(typeof c.nodeName!="string"||typeof c.textContent!="string"||typeof c.removeChild!="function"||!(c.attributes instanceof f)||typeof c.removeAttribute!="function"||typeof c.setAttribute!="function"||typeof c.namespaceURI!="string"||typeof c.insertBefore!="function"||typeof c.hasChildNodes!="function")},fr=function(c){return typeof i=="function"&&c instanceof i};function wt(ve,c,m){As(ve,S=>{S.call(t,c,m,xe)})}let Gt=function(c){let m=null;if(wt(L.beforeSanitizeElements,c,null),sr(c))return vt(c),!0;let S=J(c.nodeName);if(wt(L.uponSanitizeElement,c,{tagName:S,allowedTags:le}),Fe&&c.hasChildNodes()&&!fr(c.firstElementChild)&&Ct(/<[/\w!]/g,c.innerHTML)&&Ct(/<[/\w!]/g,c.textContent)||c.nodeType===Tn.progressingInstruction||Fe&&c.nodeType===Tn.comment&&Ct(/<[/\w]/g,c.data))return vt(c),!0;if(!(Te.tagCheck instanceof Function&&Te.tagCheck(S))&&(!le[S]||We[S])){if(!We[S]&&ar(S)&&(he.tagNameCheck instanceof RegExp&&Ct(he.tagNameCheck,S)||he.tagNameCheck instanceof Function&&he.tagNameCheck(S)))return!1;if(h&&!O[S]){let H=B(c)||c.parentNode,ae=Z(c)||c.childNodes;if(ae&&H){let $e=ae.length;for(let me=$e-1;me>=0;--me){let Ke=R(ae[me],!0);Ke.__removalCount=(c.__removalCount||0)+1,H.insertBefore(Ke,Y(c))}}}return vt(c),!0}return c instanceof u&&!Ht(c)||(S==="noscript"||S==="noembed"||S==="noframes")&&Ct(/<\/no(script|embed|frames)/i,c.innerHTML)?(vt(c),!0):(Oe&&c.nodeType===Tn.text&&(m=c.textContent,As([M,ue,fe],H=>{m=An(m,H," ")}),c.textContent!==m&&(xn(t.removed,{element:c.cloneNode()}),c.textContent=m)),wt(L.afterSanitizeElements,c,null),!1)},or=function(c,m,S){if(De&&(m==="id"||m==="name")&&(S in r||S in Le))return!1;if(!(K&&!et[m]&&Ct(de,m))){if(!(tt&&Ct(Be,m))){if(!(Te.attributeCheck instanceof Function&&Te.attributeCheck(m,c))){if(!Ie[m]||et[m]){if(!(ar(c)&&(he.tagNameCheck instanceof RegExp&&Ct(he.tagNameCheck,c)||he.tagNameCheck instanceof Function&&he.tagNameCheck(c))&&(he.attributeNameCheck instanceof RegExp&&Ct(he.attributeNameCheck,m)||he.attributeNameCheck instanceof Function&&he.attributeNameCheck(m,c))||m==="is"&&he.allowCustomizedBuiltInElements&&(he.tagNameCheck instanceof RegExp&&Ct(he.tagNameCheck,S)||he.tagNameCheck instanceof Function&&he.tagNameCheck(S))))return!1}else if(!ce[m]){if(!Ct(Ue,An(S,Ve,""))){if(!((m==="src"||m==="xlink:href"||m==="href")&&c!=="script"&&Op(S,"data:")===0&&X[c])){if(!(q&&!Ct(Qe,An(S,Ve,"")))){if(S)return!1}}}}}}}return!0},ar=function(c){return c!=="annotation-xml"&&Mo(c,Me)},Je=function(c){wt(L.beforeSanitizeAttributes,c,null);let{attributes:m}=c;if(!m||sr(c))return;let S={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:Ie,forceKeepAttr:void 0},H=m.length;for(;H--;){let ae=m[H],{name:$e,namespaceURI:me,value:Ke}=ae,nt=J($e),Ne=Ke,p=$e==="value"?Ne:Mp(Ne);if(S.attrName=nt,S.attrValue=p,S.keepAttr=!0,S.forceKeepAttr=void 0,wt(L.uponSanitizeAttribute,c,S),p=S.attrValue,rt&&(nt==="id"||nt==="name")&&(Ot($e,c),p=pe+p),Fe&&Ct(/((--!?|])>)|<\/(style|title|textarea)/i,p)){Ot($e,c);continue}if(nt==="attributename"&&Mo(p,"href")){Ot($e,c);continue}if(S.forceKeepAttr)continue;if(!S.keepAttr){Ot($e,c);continue}if(!ne&&Ct(/\/>/i,p)){Ot($e,c);continue}Oe&&As([M,ue,fe],x=>{p=An(p,x," ")});let g=J(c.nodeName);if(!or(g,nt,p)){Ot($e,c);continue}if(U&&typeof T=="object"&&typeof T.getAttributeType=="function"&&!me)switch(T.getAttributeType(g,nt)){case"TrustedHTML":{p=U.createHTML(p);break}case"TrustedScriptURL":{p=U.createScriptURL(p);break}}if(p!==Ne)try{me?c.setAttributeNS(me,$e,p):c.setAttribute($e,p),sr(c)?vt(c):_l(t.removed)}catch{Ot($e,c)}}wt(L.afterSanitizeAttributes,c,null)},Pt=function ve(c){let m=null,S=nr(c);for(wt(L.beforeSanitizeShadowDOM,c,null);m=S.nextNode();)wt(L.uponSanitizeShadowNode,m,null),Gt(m),Je(m),m.content instanceof o&&ve(m.content);wt(L.afterSanitizeShadowDOM,c,null)};return t.sanitize=function(ve){let c=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},m=null,S=null,H=null,ae=null;if(ot=!ve,ot&&(ve="<!-->"),typeof ve!="string"&&!fr(ve))if(typeof ve.toString=="function"){if(ve=ve.toString(),typeof ve!="string")throw Sn("dirty is not a string, aborting")}else throw Sn("toString is not a function");if(!t.isSupported)return ve;if(Ce||ht(c),t.removed=[],typeof ve=="string"&&($=!1),$){if(ve.nodeName){let Ke=J(ve.nodeName);if(!le[Ke]||We[Ke])throw Sn("root node is forbidden and cannot be sanitized in-place")}}else if(ve instanceof i)m=rr("<!---->"),S=m.ownerDocument.importNode(ve,!0),S.nodeType===Tn.element&&S.nodeName==="BODY"||S.nodeName==="HTML"?m=S:m.appendChild(S);else{if(!Ye&&!Oe&&!ze&&ve.indexOf("<")===-1)return U&&te?U.createHTML(ve):ve;if(m=rr(ve),!m)return Ye?null:te?I:""}m&&ct&&vt(m.firstChild);let $e=nr($?ve:m);for(;H=$e.nextNode();)Gt(H),Je(H),H.content instanceof o&&Pt(H.content);if($)return ve;if(Ye){if(G)for(ae=C.call(m.ownerDocument);m.firstChild;)ae.appendChild(m.firstChild);else ae=m;return(Ie.shadowroot||Ie.shadowrootmode)&&(ae=re.call(n,ae,!0)),ae}let me=ze?m.outerHTML:m.innerHTML;return ze&&le["!doctype"]&&m.ownerDocument&&m.ownerDocument.doctype&&m.ownerDocument.doctype.name&&Ct($l,m.ownerDocument.doctype.name)&&(me="<!DOCTYPE "+m.ownerDocument.doctype.name+`>
`+me),Oe&&As([M,ue,fe],Ke=>{me=An(me,Ke," ")}),U&&te?U.createHTML(me):me},t.setConfig=function(){let ve=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};ht(ve),Ce=!0},t.clearConfig=function(){xe=null,Ce=!1},t.isValidAttribute=function(ve,c,m){xe||ht({});let S=J(ve),H=J(c);return or(S,H,m)},t.addHook=function(ve,c){typeof c=="function"&&xn(L[ve],c)},t.removeHook=function(ve,c){if(c!==void 0){let m=Ip(L[ve],c);return m===-1?void 0:Lp(L[ve],m,1)[0]}return _l(L[ve])},t.removeHooks=function(ve){L[ve]=[]},t.removeAllHooks=function(){L=vl()},t}var Al=xl();var hr={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Ts=e=>(...t)=>({_$litDirective$:e,values:t}),ln=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,n){this._$Ct=t,this._$AM=r,this._$Ci=n}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var Cn=class extends ln{constructor(t){if(super(t),this.it=mt,t.type!==hr.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===mt||t==null)return this._t=void 0,this.it=t;if(t===Bt)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};Cn.directiveName="unsafeHTML",Cn.resultType=1;var Sl=Ts(Cn);function Ho(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Wr=Ho();function Ol(e){Wr=e}var On={exec:()=>null};function at(e,t=""){let r=typeof e=="string"?e:e.source,n={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(Lt.caret,"$1"),r=r.replace(s,a),n},getRegex:()=>new RegExp(r,t)};return n}var Yp=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Lt={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Zp=/^(?:[ \t]*(?:\n|$))+/,Xp=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Qp=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Mn=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Jp=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Go=/(?:[*+-]|\d{1,9}[.)])/,Ml=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Pl=at(Ml).replace(/bull/g,Go).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),ef=at(Ml).replace(/bull/g,Go).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Vo=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,tf=/^[^\n]+/,Ko=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,rf=at(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Ko).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),nf=at(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Go).getRegex(),Ms="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Yo=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,sf=at("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Yo).replace("tag",Ms).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Dl=at(Vo).replace("hr",Mn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ms).getRegex(),of=at(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Dl).getRegex(),Zo={blockquote:of,code:Xp,def:rf,fences:Qp,heading:Jp,hr:Mn,html:sf,lheading:Pl,list:nf,newline:Zp,paragraph:Dl,table:On,text:tf},El=at("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Mn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ms).getRegex(),af={...Zo,lheading:ef,table:El,paragraph:at(Vo).replace("hr",Mn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",El).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ms).getRegex()},lf={...Zo,html:at(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Yo).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:On,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:at(Vo).replace("hr",Mn).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Pl).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},cf=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,uf=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Nl=/^( {2,}|\\)\n(?!\s*$)/,df=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Ps=/[\p{P}\p{S}]/u,Xo=/[\s\p{P}\p{S}]/u,ql=/[^\s\p{P}\p{S}]/u,pf=at(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Xo).getRegex(),Fl=/(?!~)[\p{P}\p{S}]/u,ff=/(?!~)[\s\p{P}\p{S}]/u,_f=/(?:[^\s\p{P}\p{S}]|~)/u,mf=at(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Yp?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),jl=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,gf=at(jl,"u").replace(/punct/g,Ps).getRegex(),bf=at(jl,"u").replace(/punct/g,Fl).getRegex(),Bl="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",hf=at(Bl,"gu").replace(/notPunctSpace/g,ql).replace(/punctSpace/g,Xo).replace(/punct/g,Ps).getRegex(),yf=at(Bl,"gu").replace(/notPunctSpace/g,_f).replace(/punctSpace/g,ff).replace(/punct/g,Fl).getRegex(),vf=at("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,ql).replace(/punctSpace/g,Xo).replace(/punct/g,Ps).getRegex(),wf=at(/\\(punct)/,"gu").replace(/punct/g,Ps).getRegex(),kf=at(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),$f=at(Yo).replace("(?:-->|$)","-->").getRegex(),xf=at("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",$f).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Is=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Af=at(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Is).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Ul=at(/^!?\[(label)\]\[(ref)\]/).replace("label",Is).replace("ref",Ko).getRegex(),Wl=at(/^!?\[(ref)\](?:\[\])?/).replace("ref",Ko).getRegex(),Sf=at("reflink|nolink(?!\\()","g").replace("reflink",Ul).replace("nolink",Wl).getRegex(),Tl=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Qo={_backpedal:On,anyPunctuation:wf,autolink:kf,blockSkip:mf,br:Nl,code:uf,del:On,emStrongLDelim:gf,emStrongRDelimAst:hf,emStrongRDelimUnd:vf,escape:cf,link:Af,nolink:Wl,punctuation:pf,reflink:Ul,reflinkSearch:Sf,tag:xf,text:df,url:On},Ef={...Qo,link:at(/^!?\[(label)\]\((.*?)\)/).replace("label",Is).getRegex(),reflink:at(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Is).getRegex()},Uo={...Qo,emStrongRDelimAst:yf,emStrongLDelim:bf,url:at(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Tl).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:at(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Tl).getRegex()},Tf={...Uo,br:at(Nl).replace("{2,}","*").getRegex(),text:at(Uo.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Cs={normal:Zo,gfm:af,pedantic:lf},Rn={normal:Qo,gfm:Uo,breaks:Tf,pedantic:Ef},Cf={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Cl=e=>Cf[e];function yr(e,t){if(t){if(Lt.escapeTest.test(e))return e.replace(Lt.escapeReplace,Cl)}else if(Lt.escapeTestNoEncode.test(e))return e.replace(Lt.escapeReplaceNoEncode,Cl);return e}function Rl(e){try{e=encodeURI(e).replace(Lt.percentDecode,"%")}catch{return null}return e}function Il(e,t){let r=e.replace(Lt.findPipe,(o,a,i)=>{let u=!1,d=a;for(;--d>=0&&i[d]==="\\";)u=!u;return u?"|":" |"}),n=r.split(Lt.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(Lt.slashPipe,"|");return n}function In(e,t,r){let n=e.length;if(n===0)return"";let s=0;for(;s<n;){let o=e.charAt(n-s-1);if(o===t&&!r)s++;else if(o!==t&&r)s++;else break}return e.slice(0,n-s)}function Rf(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return r>0?-2:-1}function Ll(e,t,r,n,s){let o=t.href,a=t.title||null,i=e[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let u={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:a,text:i,tokens:n.inlineTokens(i)};return n.state.inLink=!1,u}function If(e,t,r){let n=e.match(r.other.indentCodeCompensation);if(n===null)return t;let s=n[1];return t.split(`
`).map(o=>{let a=o.match(r.other.beginningSpace);if(a===null)return o;let[i]=a;return i.length>=s.length?o.slice(s.length):o}).join(`
`)}var Ls=class{constructor(e){lt(this,"options");lt(this,"rules");lt(this,"lexer");this.options=e||Wr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:In(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],n=If(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let n=In(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:In(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=In(t[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let a=!1,i=[],u;for(u=0;u<r.length;u++)if(this.rules.other.blockquoteStart.test(r[u]))i.push(r[u]),a=!0;else if(!a)i.push(r[u]);else break;r=r.slice(u);let d=i.join(`
`),f=d.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${d}`:d,s=s?`${s}
${f}`:f;let _=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(f,o,!0),this.lexer.state.top=_,r.length===0)break;let y=o.at(-1);if(y?.type==="code")break;if(y?.type==="blockquote"){let T=y,A=T.raw+`
`+r.join(`
`),R=this.blockquote(A);o[o.length-1]=R,n=n.substring(0,n.length-T.raw.length)+R.raw,s=s.substring(0,s.length-T.text.length)+R.text;break}else if(y?.type==="list"){let T=y,A=T.raw+`
`+r.join(`
`),R=this.list(A);o[o.length-1]=R,n=n.substring(0,n.length-y.raw.length)+R.raw,s=s.substring(0,s.length-T.raw.length)+R.raw,r=A.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),a=!1;for(;e;){let u=!1,d="",f="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;d=t[0],e=e.substring(d.length);let _=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,R=>" ".repeat(3*R.length)),y=e.split(`
`,1)[0],T=!_.trim(),A=0;if(this.options.pedantic?(A=2,f=_.trimStart()):T?A=t[1].length+1:(A=t[2].search(this.rules.other.nonSpaceChar),A=A>4?1:A,f=_.slice(A),A+=t[1].length),T&&this.rules.other.blankLine.test(y)&&(d+=y+`
`,e=e.substring(y.length+1),u=!0),!u){let R=this.rules.other.nextBulletRegex(A),N=this.rules.other.hrRegex(A),Y=this.rules.other.fencesBeginRegex(A),Z=this.rules.other.headingBeginRegex(A),B=this.rules.other.htmlBeginRegex(A);for(;e;){let U=e.split(`
`,1)[0],I;if(y=U,this.options.pedantic?(y=y.replace(this.rules.other.listReplaceNesting,"  "),I=y):I=y.replace(this.rules.other.tabCharGlobal,"    "),Y.test(y)||Z.test(y)||B.test(y)||R.test(y)||N.test(y))break;if(I.search(this.rules.other.nonSpaceChar)>=A||!y.trim())f+=`
`+I.slice(A);else{if(T||_.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||Y.test(_)||Z.test(_)||N.test(_))break;f+=`
`+y}!T&&!y.trim()&&(T=!0),d+=U+`
`,e=e.substring(U.length+1),_=I.slice(A)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(d)&&(a=!0)),s.items.push({type:"list_item",raw:d,task:!!this.options.gfm&&this.rules.other.listIsTask.test(f),loose:!1,text:f,tokens:[]}),s.raw+=d}let i=s.items.at(-1);if(i)i.raw=i.raw.trimEnd(),i.text=i.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let u of s.items){if(this.lexer.state.top=!1,u.tokens=this.lexer.blockTokens(u.text,[]),u.task){if(u.text=u.text.replace(this.rules.other.listReplaceTask,""),u.tokens[0]?.type==="text"||u.tokens[0]?.type==="paragraph"){u.tokens[0].raw=u.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),u.tokens[0].text=u.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let f=this.lexer.inlineQueue.length-1;f>=0;f--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[f].src)){this.lexer.inlineQueue[f].src=this.lexer.inlineQueue[f].src.replace(this.rules.other.listReplaceTask,"");break}}let d=this.rules.other.listTaskCheckbox.exec(u.raw);if(d){let f={type:"checkbox",raw:d[0]+" ",checked:d[0]!=="[ ]"};u.checked=f.checked,s.loose?u.tokens[0]&&["paragraph","text"].includes(u.tokens[0].type)&&"tokens"in u.tokens[0]&&u.tokens[0].tokens?(u.tokens[0].raw=f.raw+u.tokens[0].raw,u.tokens[0].text=f.raw+u.tokens[0].text,u.tokens[0].tokens.unshift(f)):u.tokens.unshift({type:"paragraph",raw:f.raw,text:f.raw,tokens:[f]}):u.tokens.unshift(f)}}if(!s.loose){let d=u.tokens.filter(_=>_.type==="space"),f=d.length>0&&d.some(_=>this.rules.other.anyLine.test(_.raw));s.loose=f}}if(s.loose)for(let u of s.items){u.loose=!0;for(let d of u.tokens)d.type==="text"&&(d.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:n,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=Il(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let a of n)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<r.length;a++)o.header.push({text:r[a],tokens:this.lexer.inline(r[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(Il(a,o.header.length).map((i,u)=>({text:i,tokens:this.lexer.inline(i),header:!1,align:o.align[u]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=In(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=Rf(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let n=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),Ll(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return Ll(r,s,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,a,i=s,u=0,d=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+s);(n=d.exec(t))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(a=[...o].length,n[3]||n[4]){i+=a;continue}else if((n[5]||n[6])&&s%3&&!((s+a)%3)){u+=a;continue}if(i-=a,i>0)continue;a=Math.min(a,a+i+u);let f=[...n[0]][0].length,_=e.slice(0,s+n.index+f+a);if(Math.min(s,a)%2){let T=_.slice(1,-1);return{type:"em",raw:_,text:T,tokens:this.lexer.inlineTokens(T)}}let y=_.slice(2,-2);return{type:"strong",raw:_,text:y,tokens:this.lexer.inlineTokens(y)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,n;return t[2]==="@"?(r=t[1],n="mailto:"+r):(r=t[1],n=r),{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,n;if(t[2]==="@")r=t[0],n="mailto:"+r;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);r=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},Jt=class Wo{constructor(t){lt(this,"tokens");lt(this,"options");lt(this,"state");lt(this,"inlineQueue");lt(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Wr,this.options.tokenizer=this.options.tokenizer||new Ls,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:Lt,block:Cs.normal,inline:Rn.normal};this.options.pedantic?(r.block=Cs.pedantic,r.inline=Rn.pedantic):this.options.gfm&&(r.block=Cs.gfm,this.options.breaks?r.inline=Rn.breaks:r.inline=Rn.gfm),this.tokenizer.rules=r}static get rules(){return{block:Cs,inline:Rn}}static lex(t,r){return new Wo(r).lex(t)}static lexInline(t,r){return new Wo(r).inlineTokens(t)}lex(t){t=t.replace(Lt.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,r=[],n=!1){for(this.options.pedantic&&(t=t.replace(Lt.tabCharGlobal,"    ").replace(Lt.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,r))?(t=t.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=r.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
`:r.push(s);continue}if(s=this.tokenizer.code(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(s=this.tokenizer.fences(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.heading(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.hr(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.blockquote(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.list(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.html(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.def(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.raw,this.inlineQueue.at(-1).src=a.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},r.push(s));continue}if(s=this.tokenizer.table(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.lheading(t)){t=t.substring(s.raw.length),r.push(s);continue}let o=t;if(this.options.extensions?.startBlock){let a=1/0,i=t.slice(1),u;this.options.extensions.startBlock.forEach(d=>{u=d.call({lexer:this},i),typeof u=="number"&&u>=0&&(a=Math.min(a,u))}),a<1/0&&a>=0&&(o=t.substring(0,a+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let a=r.at(-1);n&&a?.type==="paragraph"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s),n=o.length!==t.length,t=t.substring(s.raw.length);continue}if(s=this.tokenizer.text(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,r}inline(t,r=[]){return this.inlineQueue.push({src:t,tokens:r}),r}inlineTokens(t,r=[]){let n=t,s=null;if(this.tokens.links){let u=Object.keys(this.tokens.links);if(u.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)u.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let a=!1,i="";for(;t;){a||(i=""),a=!1;let u;if(this.options.extensions?.inline?.some(f=>(u=f.call({lexer:this},t,r))?(t=t.substring(u.raw.length),r.push(u),!0):!1))continue;if(u=this.tokenizer.escape(t)){t=t.substring(u.raw.length),r.push(u);continue}if(u=this.tokenizer.tag(t)){t=t.substring(u.raw.length),r.push(u);continue}if(u=this.tokenizer.link(t)){t=t.substring(u.raw.length),r.push(u);continue}if(u=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(u.raw.length);let f=r.at(-1);u.type==="text"&&f?.type==="text"?(f.raw+=u.raw,f.text+=u.text):r.push(u);continue}if(u=this.tokenizer.emStrong(t,n,i)){t=t.substring(u.raw.length),r.push(u);continue}if(u=this.tokenizer.codespan(t)){t=t.substring(u.raw.length),r.push(u);continue}if(u=this.tokenizer.br(t)){t=t.substring(u.raw.length),r.push(u);continue}if(u=this.tokenizer.del(t)){t=t.substring(u.raw.length),r.push(u);continue}if(u=this.tokenizer.autolink(t)){t=t.substring(u.raw.length),r.push(u);continue}if(!this.state.inLink&&(u=this.tokenizer.url(t))){t=t.substring(u.raw.length),r.push(u);continue}let d=t;if(this.options.extensions?.startInline){let f=1/0,_=t.slice(1),y;this.options.extensions.startInline.forEach(T=>{y=T.call({lexer:this},_),typeof y=="number"&&y>=0&&(f=Math.min(f,y))}),f<1/0&&f>=0&&(d=t.substring(0,f+1))}if(u=this.tokenizer.inlineText(d)){t=t.substring(u.raw.length),u.raw.slice(-1)!=="_"&&(i=u.raw.slice(-1)),a=!0;let f=r.at(-1);f?.type==="text"?(f.raw+=u.raw,f.text+=u.text):r.push(u);continue}if(t){let f="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(f);break}else throw new Error(f)}}return r}},Os=class{constructor(e){lt(this,"options");lt(this,"parser");this.options=e||Wr}space(e){return""}code({text:e,lang:t,escaped:r}){let n=(t||"").match(Lt.notSpaceStart)?.[0],s=e.replace(Lt.endingNewline,"")+`
`;return n?'<pre><code class="language-'+yr(n)+'">'+(r?s:yr(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:yr(s,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${yr(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let n=this.parser.parseInline(r),s=Rl(e);if(s===null)return n;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+yr(t)+'"'),o+=">"+n+"</a>",o}image({href:e,title:t,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=Rl(e);if(s===null)return yr(r);e=s;let o=`<img src="${e}" alt="${r}"`;return t&&(o+=` title="${yr(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:yr(e.text)}},Jo=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},er=class zo{constructor(t){lt(this,"options");lt(this,"renderer");lt(this,"textRenderer");this.options=t||Wr,this.options.renderer=this.options.renderer||new Os,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Jo}static parse(t,r){return new zo(r).parse(t)}static parseInline(t,r){return new zo(r).parseInline(t)}parse(t){let r="";for(let n=0;n<t.length;n++){let s=t[n];if(this.options.extensions?.renderers?.[s.type]){let a=s,i=this.options.extensions.renderers[a.type].call({parser:this},a);if(i!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){r+=i||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}parseInline(t,r=this.renderer){let n="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let i=this.options.extensions.renderers[o.type].call({parser:this},o);if(i!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=i||"";continue}}let a=o;switch(a.type){case"escape":{n+=r.text(a);break}case"html":{n+=r.html(a);break}case"link":{n+=r.link(a);break}case"image":{n+=r.image(a);break}case"checkbox":{n+=r.checkbox(a);break}case"strong":{n+=r.strong(a);break}case"em":{n+=r.em(a);break}case"codespan":{n+=r.codespan(a);break}case"br":{n+=r.br(a);break}case"del":{n+=r.del(a);break}case"text":{n+=r.text(a);break}default:{let i='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return n}},Rs,Ln=(Rs=class{constructor(e){lt(this,"options");lt(this,"block");this.options=e||Wr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Jt.lex:Jt.lexInline}provideParser(){return this.block?er.parse:er.parseInline}},lt(Rs,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),lt(Rs,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Rs),Lf=class{constructor(...e){lt(this,"defaults",Ho());lt(this,"options",this.setOptions);lt(this,"parse",this.parseMarkdown(!0));lt(this,"parseInline",this.parseMarkdown(!1));lt(this,"Parser",er);lt(this,"Renderer",Os);lt(this,"TextRenderer",Jo);lt(this,"Lexer",Jt);lt(this,"Tokenizer",Ls);lt(this,"Hooks",Ln);this.use(...e)}walkTokens(e,t){let r=[];for(let n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)r=r.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,t));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);r=r.concat(this.walkTokens(a,t))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let i=s.renderer.apply(this,a);return i===!1&&(i=o.apply(this,a)),i}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),n.extensions=t),r.renderer){let s=this.defaults.renderer||new Os(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,i=r.renderer[a],u=s[a];s[a]=(...d)=>{let f=i.apply(s,d);return f===!1&&(f=u.apply(s,d)),f||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new Ls(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,i=r.tokenizer[a],u=s[a];s[a]=(...d)=>{let f=i.apply(s,d);return f===!1&&(f=u.apply(s,d)),f}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new Ln;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,i=r.hooks[a],u=s[a];Ln.passThroughHooks.has(o)?s[a]=d=>{if(this.defaults.async&&Ln.passThroughHooksRespectAsync.has(o))return(async()=>{let _=await i.call(s,d);return u.call(s,_)})();let f=i.call(s,d);return u.call(s,f)}:s[a]=(...d)=>{if(this.defaults.async)return(async()=>{let _=await i.apply(s,d);return _===!1&&(_=await u.apply(s,d)),_})();let f=i.apply(s,d);return f===!1&&(f=u.apply(s,d)),f}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(a){let i=[];return i.push(o.call(this,a)),s&&(i=i.concat(s.call(this,a))),i}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Jt.lex(e,t??this.defaults)}parser(e,t){return er.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,i=await(s.hooks?await s.hooks.provideLexer():e?Jt.lex:Jt.lexInline)(a,s),u=s.hooks?await s.hooks.processAllTokens(i):i;s.walkTokens&&await Promise.all(this.walkTokens(u,s.walkTokens));let d=await(s.hooks?await s.hooks.provideParser():e?er.parse:er.parseInline)(u,s);return s.hooks?await s.hooks.postprocess(d):d})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?Jt.lex:Jt.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let i=(s.hooks?s.hooks.provideParser():e?er.parse:er.parseInline)(a,s);return s.hooks&&(i=s.hooks.postprocess(i)),i}catch(a){return o(a)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+yr(r.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(r);throw r}}},Ur=new Lf;function it(e,t){return Ur.parse(e,t)}it.options=it.setOptions=function(e){return Ur.setOptions(e),it.defaults=Ur.defaults,Ol(it.defaults),it};it.getDefaults=Ho;it.defaults=Wr;it.use=function(...e){return Ur.use(...e),it.defaults=Ur.defaults,Ol(it.defaults),it};it.walkTokens=function(e,t){return Ur.walkTokens(e,t)};it.parseInline=Ur.parseInline;it.Parser=er;it.parser=er.parse;it.Renderer=Os;it.TextRenderer=Jo;it.Lexer=Jt;it.lexer=Jt.lex;it.Tokenizer=Ls;it.Hooks=Ln;it.parse=it;var ih=it.options,lh=it.setOptions,ch=it.use,uh=it.walkTokens,dh=it.parseInline;var ph=er.parse,fh=Jt.lex;function Tr(e){let t=it.parse(e),r=Al.sanitize(t);return Sl(r)}function vr(e,t){return l`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function cn(e){return e.loading?l`<div class="prompt-block__status">불러오는 중…</div>`:e.error?l`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Ds(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())} ${r(t.getHours())}:${r(t.getMinutes())}`}var Of={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Mf={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},Pf=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Df=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function ur(e){return!!e&&typeof e=="object"}function ea(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function zl(e,t){let r=ea(e),n=ea(t),s=new Map;for(let i of r)s.set(i,(s.get(i)||0)+1);let o=0;for(let i of n){let u=s.get(i)||0;u>0?s.set(i,u-1):o+=1}let a=0;for(let i of s.values())a+=i;return{added:o,removed:a}}function Nf(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>ur(s)&&typeof s.text=="string"?s.text:"").join(""):ur(e)&&typeof e.text=="string"&&(t=e.text);let n=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function qf(e){let t=String(e.name||""),r=e.input||{},n={kind:"tool",tool:t,icon:Of[t]||"\u{1F527}",input:r,expandable:!0};if((t==="Read"||t==="Write")&&(n.path=String(r.file_path||r.path||"")),t==="Write"&&(n.added=ea(r.content).length),t==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=zl(r.old_string,r.new_string);n.added=s,n.removed=o}if(t==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,a=Array.isArray(r.edits)?r.edits:[];for(let i of a){let u=zl(ur(i)?i.old_string:"",ur(i)?i.new_string:"");s+=u.added,o+=u.removed}n.added=s,n.removed=o}return t==="Bash"&&(n.command=String(r.command||"")),(t==="Grep"||t==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function ta(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function ra(e){let t=e.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=Pf.exec(t);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:t.trim()}:Df.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Ff(e,t){if(e.type==="assistant"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(ur(o)){if(o.type==="text"&&typeof o.text=="string")s.push(ra(o.text));else if(o.type==="thinking"){let a=ta(o.thinking);a&&s.push(a)}else if(o.type==="tool_use"){let a=qf(o);typeof o.id=="string"&&t.set(o.id,a),s.push(a)}}return s}if(e.type==="user"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(ur(s)&&s.type==="tool_result"){let o=t.get(String(s.tool_use_id));if(o){let a=Nf(s.content);o.result=a,o.output=typeof s.content=="string"?s.content:a}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success";return[{kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""}]}return[]}function jf(e){if(e.type==="item.completed"&&ur(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[ra(t.text)];if(t.type==="reasoning"){let r=ta(t.text);return r?[r]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Bf(e){if(e.schema!=="codex-delegation-monitor-v1"||!ur(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&ur(t.item)){let r=t.item;if(typeof r.id!="string"||r.id.length===0)return[];if(t.type==="item.completed"&&r.kind==="agent_message"&&typeof r.text=="string"&&r.text.trim().length>0)return[ra(r.text)];if(t.type==="item.completed"&&r.kind==="reasoning"){let i=ta(r.text);return i?[i]:[]}if(r.kind!=="activity"||typeof r.activity!="string")return[];let n=Mf[r.activity];if(!n)return[];let s="\uC2DC\uC791",o="\u2026",a={kind:"tool",tool:"",icon:o,expandable:!1};if(t.type==="item.completed"){if(r.status==="completed")s="\uC644\uB8CC",o="\u2713";else if(r.status==="failed")s="\uC2E4\uD328",o="\u2717";else return[];a.result=""}return a.tool=`${n} \xB7 ${s}`,a.icon=o,[a]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function Uf(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Hl(e){let t=[],r=new Map,n=Array.isArray(e)?e:[];for(let s of n){let o=s;if(typeof s=="string"){let i=s.trim();if(i.length===0)continue;try{o=JSON.parse(i)}catch{continue}}if(!ur(o))continue;let a=o.schema==="codex-delegation-monitor-v1"?Bf(o):Uf(o)?jf(o):Ff(o,r);for(let i of a)t.push(i)}return t}var Wf=5,zf=10,Hf=/Task\s+#(\d+)/,Gf=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Vf=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function Ns(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Kf(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function Yf(e){for(let t=e.length-1;t>=0;t-=1){let r=e[t];if(r.kind==="phase"||r.kind==="gate")return r.text||null}return null}function Zf(e){let t=new Map,r=0;for(let s of e){if(s.kind!=="tool")continue;r+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let u=Hf.exec(s.output||s.result||""),d=String(o.activeForm||o.subject||"").trim();if(!u||d.length===0)continue;t.set(u[1],{label:d,active:o.status==="in_progress"?r:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let i=o.activeForm||o.subject;typeof i=="string"&&i.trim().length>0&&(a.label=i.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?r:0)}let n=null;for(let s of t.values())s.active>0&&(!n||s.active>n.active)&&(n=s);return n?n.label:null}function Xf(e){if(e.tool==="Bash"){let t=e.command||"";return Gf.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Vf.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function Qf(e){let t=e.filter(s=>s.kind==="tool").slice(-zf),r=new Map;t.forEach((s,o)=>{let a=Xf(s);if(!a)return;let i=r.get(a)||{count:0,last:-1};i.count+=1,i.last=o,r.set(a,i)});let n=null;for(let[s,o]of r)(!n||o.count>n.count||o.count===n.count&&o.last>n.last)&&(n={label:s,count:o.count,last:o.last});return n?n.label:null}function Jf(e){let t=Yf(e);if(t)return{text:t,guess:!1};let r=Zf(e);if(r)return{text:r,guess:!1};let n=Qf(e);return n?{text:n,guess:!0}:null}function e_(e,t){if(typeof e!="number")return"";let r=Math.max(0,Math.floor((t-e)/1e3));return r<60?`${r}\uCD08 \uC804`:qt(e,t)}function qs(e,t={}){let{transport:r,sessionLogStore:n,onClose:s}=t,o=null,a=null,i=null,u=!1,d={},f=!0,_=new Set,y=new Set,T=null,A=null,R=!1,N=!1,Y=!1,Z=null,B=null;function U(){R=!1,N=!1,Y=!1,Z=null,B=null}async function I(K){if(r){N=!0,Y=!1,le();try{let q=await Promise.resolve(r("get-attempt-prompt",{attempt_id:K}));if(o!==K)return;!q||typeof q!="object"||Array.isArray(q)?Y=!0:(Z=q,B=K)}catch{o===K&&(Y=!0)}finally{o===K&&(N=!1,le())}}}function W(){if(R=!R,R&&o&&B!==o){I(o);return}le()}function b(){if(!R)return"";let K=cn({loading:N,error:Y});if(K)return l`<div class="sv__prompt" data-seam="attempt-prompt">
        ${K}
      </div>`;if(!Z)return"";if(Z.missing)return l`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let q=Ds(Z.recorded_at);return l`<div class="sv__prompt" data-seam="attempt-prompt">
      ${q?l`<div class="prompt-block__meta">${q} 발송</div>`:""}
      ${typeof Z.task_prompt=="string"?vr("\uACFC\uC5C5 (user)",Z.task_prompt):""}
      ${typeof Z.system_prompt=="string"?vr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",Z.system_prompt):""}
    </div>`}function C(){if(!i||!n)return[];let K=n.get(i);return Hl(K?K.lines:[])}function z(){if(!i||!n)return null;let K=n.get(i),q=K?K.last_event_at:null;return typeof q=="number"?q:null}function re(){return d.status==="running"}function L(){if(re()&&o){A||(A=setInterval(()=>le(),1e3));return}M()}function M(){A&&(clearInterval(A),A=null)}function ue(K){let q=[],ne=0;for(;ne<K.length;){let Oe=K[ne];if(Oe.kind==="tool"){let Fe=ne;for(;Fe<K.length&&K[Fe].kind==="tool"&&K[Fe].tool===Oe.tool;)Fe+=1;if(Fe-ne>=Wf&&!y.has(ne)){q.push({kind:"group",idx:ne,tool:Oe.tool||"",lines:K.slice(ne,Fe).map((ze,Ce)=>({idx:ne+Ce,line:ze}))}),ne=Fe;continue}}q.push({kind:"line",idx:ne,line:Oe}),ne+=1}return q}function fe(K){for(let q=K.length-1;q>=0;q-=1){let ne=K[q];if(ne.kind==="result"||ne.kind==="error")return null;if(ne.kind==="tool"&&!Object.hasOwn(ne,"result"))return ne}return null}function de(K){for(let q=K.length-1;q>=0;q-=1)if(K[q].kind==="thinking")return K[q];return null}function Be(K,q){if(q.kind==="gate")return l`<div class="sv__gate">${q.text}</div>`;if(q.kind==="phase")return l`<div class="sv__phase">${q.text}</div>`;if(q.kind==="result")return l`<div
        class="sv__result${q.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${q.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${Tr(q.text||(q.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(q.kind==="thinking"){let ne=_.has(K);return l`<div
        class="sv__think${ne?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Ie(K)}
      >
        <span class="sv__think-line">💭 ${Ns(q.text)}</span>
        ${ne?l`<pre class="sv__think-expand">${q.text}</pre>`:""}
      </div>`}if(q.kind==="error")return l`<div class="sv__error">⛔ ${q.text}</div>`;if(q.kind==="blocker")return l`<div class="sv__error">⛔ ${q.text}</div>`;if(q.kind==="tool"){let ne=_.has(K),Oe=q.tool==="Bash"?Kf(q.command):0,Fe=q.tool==="Bash"?Oe>1?Ns(q.command):q.command:q.path||q.command||"";return l`<div
        class="sv__tool${ne?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>Ie(K)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${q.icon}</span>
          <span class="sv__tool-name">${q.tool}</span>
          ${Fe?l`<span class="sv__tool-detail">${Fe}</span>`:""}
          ${Oe>1?l`<span class="sv__tool-more">⋯ ${Oe}줄</span>`:""}
          ${typeof q.added=="number"?l`<span class="sv__diff-add">+${q.added}</span>`:""}
          ${typeof q.removed=="number"?l`<span class="sv__diff-del">−${q.removed}</span>`:""}
          ${q.result?l`<span class="sv__tool-ok">→ ${q.result}</span>`:""}
        </span>
        ${ne?l`<pre class="sv__tool-expand">${Qe(q)}</pre>`:""}
      </div>`}return l`<div class="sv__as">${Tr(q.text||"")}</div>`}function Qe(K){let q=[];if(K.tool==="Bash"&&typeof K.command=="string"&&K.command.length>0)q.push(K.command);else if(K.input!==void 0)try{q.push(`input: ${JSON.stringify(K.input,null,2)}`)}catch{}return typeof K.output=="string"&&K.output.length>0&&q.push(`output:
${K.output}`),q.join(`

`)}function Ve(){if(!o)return l``;let K=C(),q=(a?[d.model,d.effort]:[d.runner,d.model,d.effort]).filter(Boolean).join(" \xB7 "),ne=d.session_id||"",Oe=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${f?"ON":"OFF"}`,Fe=re(),ze=Fe?e_(z(),Date.now()):"",Ce=Fe?fe(K):null,ct=Fe?de(K):null,Ye=Jf(K);return l`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${a?d.role||"":o}</span>
        ${Ye?l`<span
              class="sv__stage${Ye.guess?" sv__stage--guess":""}"
              title=${Ye.text}
              >${Ye.text}</span
            >`:""}
        ${Fe?l`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${ze?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${ze}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${ze?l`<span class="sv__live-ago">${ze}</span>`:""}</span
            >`:""}
        ${ne?l`<button
              type="button"
              class="sv__session"
              title=${ne}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${ne}`}
              @click=${()=>he(ne)}
            >
              ⧉ ${ne.slice(0,8)}
            </button>`:""}
        ${q?l`<span class="sv__meta">${q}</span>`:""}
        ${d.worktree?l`<span class="sv__wt" title=${d.worktree}
              >${d.worktree}</span
            >`:""}
        ${a||u?"":l`<button
              type="button"
              class="sv__prompt-toggle${R?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${R?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${W}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${f?" sv__follow--on":""}"
          aria-pressed=${f?"true":"false"}
          aria-label=${Oe}
          @click=${Ee}
        >
          <span class="sv__follow-full">⇣ ${Oe}</span>
          <span class="sv__follow-short">⇣ ${f?"ON":"OFF"}</span>
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
      ${a||u?"":b()}
      <div class="sv__body">
        ${K.length===0?l`<div class="sv__empty">세션 로그 없음</div>`:ue(K).map(G=>G.kind==="group"?Me(G):Be(G.idx,G.line))}
      </div>
      ${Ce||ct?l`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${Ce?l`<span class="sv__now-icon">${Ce.icon}</span>
                  <span class="sv__now-name">${Ce.tool}</span>
                  <span class="sv__now-detail"
                    >${Ce.tool==="Bash"?Ns(Ce.command):Ce.path||Ce.command||""}</span
                  >`:""}
            ${ct?l`<span class="sv__now-think"
                  >💭 ${Ns(ct.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function Me(K){return l`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>Ue(K.idx)}
    >
      <span class="sv__group-icon">${K.lines[0].line.icon}</span>
      <span class="sv__group-name">${K.tool}</span>
      <span class="sv__group-count">${K.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function Ue(K){y.add(K),le()}function le(){He(Ve(),e),L(),f&&Ae()}function Ae(){let K=e.querySelector(".sv__body");K&&(K.scrollTop=K.scrollHeight)}function Ie(K){_.has(K)?_.delete(K):_.add(K),le()}function Ee(){f=!f,le()}function he(K){Zt(K).then(q=>{q?oe("\uBCF5\uC0AC\uB428","success",1200):oe("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function We(K){!o||!K||(d={...d,...K},le())}function et(K){let q=K.target;if(!q||!q.classList||!q.classList.contains("sv__body"))return;!(q.scrollHeight-q.scrollTop-q.clientHeight<=4)&&f&&(f=!1,le())}e.addEventListener("scroll",et,!0);function Te(K){let q=K&&K.attempt_id;if(!q)return;let ne=i;o=q,a=typeof K.launch_id=="string"&&K.launch_id.length>0?K.launch_id:null,i=a?`session-log:${o}:${a}`:`session-log:${o}`,r&&ne&&ne!==i&&Promise.resolve(r("unsubscribe-session-log",{id:ne})).catch(()=>{}),d=K.meta||{},u=K.hide_prompt===!0,f=!0,_.clear(),y.clear(),U(),!T&&n&&(T=n.subscribe(le)),r&&Promise.resolve(r("subscribe-session-log",{id:i,attempt_id:o,...a?{launch_id:a}:{}})).catch(()=>{}),le()}function tt(){let K=i;o=null,a=null,i=null,u=!1,_.clear(),y.clear(),U(),M(),r&&K&&Promise.resolve(r("unsubscribe-session-log",{id:K})).catch(()=>{}),He(l``,e),s&&s()}return{open:Te,updateMeta:We,close:tt,isOpen(){return o!==null},destroy(){M(),T&&(T(),T=null),e.removeEventListener("scroll",et,!0),o=null,a=null,i=null,u=!1,He(l``,e)}}}function Fs(e){let t=e&&typeof e=="object"?e:{},r=t.metadata&&typeof t.metadata=="object"?t.metadata:{},n=na(t.spec_id),s=na(r.spec_id);return n?{path:n,source:"native",conflict:s.length>0&&s!==n}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function na(e){return typeof e=="string"?e.trim():""}function Gl(e){let t=Fs(e);if(t.path)return t;let r=na(t_(e).spec_path);return r?{path:r,source:"draft",conflict:!1}:t}function t_(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}function r_(e){return["plan_review","plan_approval","plan_check"].some(t=>{let r=e[t];return typeof r=="string"&&r.trim().length>0})}function n_(e){let t=e&&e.metadata||{},r=Gl(e),n=[];return r.path&&n.push({kind:"spec",path:r.path,missing_state:r.source==="draft"?"spec_draft":null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&n.push({kind:"plan",path:t.plan_path.trim(),missing_state:r_(t)?null:"plan_pending"}),n}function Vl(e,t){let r=n_(e);return l`
    <div class="detail-section-label">Artifacts</div>
    ${r.length===0?l`<div class="detail-empty">산출물 없음</div>`:l`
          ${r.map(n=>l`<div class="detail-art">
                <span class="detail-art__ic" aria-hidden="true">▤</span>
                <button
                  type="button"
                  class="detail-art__path"
                  title=${`${n.path} \xB7 \uD074\uB9AD\uD558\uBA74 \uBCF5\uC0AC`}
                  @click=${s=>t.onCopyPath(s,n.path)}
                >
                  ${n.path}
                </button>
                ${n.missing_state==="spec_draft"?l`<span class="detail-art__badge">draft</span>`:null}
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
  `}var s_="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",o_=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,a_=/^\*\*결론\*\* — (.+)$/;function js(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==s_)return null;let r=o_.exec(t[1]||"");if(!r)return null;let n=r[1].split(" ")[0],s=r[2],o=r[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let i=a<t.length?a_.exec(t[a]):null,u=i?i[1].replace(/\s+/g," ").trim():"",d=i?a+1:a;return{lane:n,identifier:s,timestamp:o,conclusion:u,body:t.slice(d).join(`
`).trim()}}var Kl=20;function Yl(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let r=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${r}-${n} ${s}:${o}`}function i_(e){return e.length>Kl?`${e.slice(0,Kl)}\u2026`:e}function l_(e,t,r,n){let s=`${t.lane} ${i_(t.identifier)}`;return l`<div class="detail-report">
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
        <span class="detail-report__time">${Yl(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${n&&t.body.length>0?l`<div class="detail-report__body">
          ${Tr(t.body)}
        </div>`:""}
  </div>`}function c_(e){return l`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${Yl(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${Tr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function Zl(e,t={},r={}){let n=Array.isArray(e)?e.filter(Boolean):[],s=r.expanded||new Set,o=typeof r.draft=="string"?r.draft:"",a=r.sending===!0,i=n.slice().sort((u,d)=>String(d.created_at||"").localeCompare(String(u.created_at||"")));return l`
    <div class="detail-section-label">댓글 (${n.length})</div>
    ${r.error?l`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:i.length===0?l`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:l`<div class="detail-comments" data-seam="comments">
            ${i.map(u=>{let d=js(typeof u.text=="string"?u.text:"");return d?l_(u,d,t,s.has(u.id)):c_(u)})}
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
  `}var{I:Gh}=hi;var Xl=e=>e.strings===void 0;var u_={},Ql=(e,t=u_)=>e._$AH=t;var zr=Ts(class extends ln{constructor(e){if(super(e),e.type!==hr.PROPERTY&&e.type!==hr.ATTRIBUTE&&e.type!==hr.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Xl(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===Bt||t===mt)return t;let r=e.element,n=e.name;if(e.type===hr.PROPERTY){if(t===r[n])return Bt}else if(e.type===hr.BOOLEAN_ATTRIBUTE){if(!!t===r.hasAttribute(n))return Bt}else if(e.type===hr.ATTRIBUTE&&r.getAttribute(n)===t+"")return Bt;return Ql(e),t}});var Bs=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],d_=Bs.filter(e=>e!=="impl_dispatch"),Cr=["orchestration_model","orchestration_effort","orchestration_speed"],Jl=[...Bs,...Cr],ec=["delegated","main"],Us=["inherit","claude","codex"],Pn=["default","fast"],Dn=["standard","fast_track"],Nn=["codex","opus","fable","self","skip"],Ws=["codex","fable","skip"],zs=["low","medium","high","xhigh"],dr="auto";function wr(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function tc(e){if(!wr(e)||!wr(e.runners))return[];let t=[];for(let[r,n]of Object.entries(e.runners))wr(n)&&wr(n.models)&&t.push([r,Object.keys(n.models)]);return t}function Hs(e,t){let r=tc(e),n=t&&t!=="inherit"?r.filter(([s])=>s===t):r;return[dr,...n.flatMap(([,s])=>s)]}function un(e,t,r){if(!wr(e)||!wr(e.runners))return[dr];let n=[];for(let[s,o]of Object.entries(e.runners))if(!(!wr(o)||!wr(o.models))&&!(t&&t!=="inherit"&&s!==t))for(let[a,i]of Object.entries(o.models)){if(r&&r!==dr&&a!==r)continue;let u=wr(i)?i.efforts:null;if(Array.isArray(u))for(let d of u)typeof d=="string"&&!n.includes(d)&&n.push(d)}return[dr,...n]}function Gs(e,t){let r=tc(e);return(t?r.filter(([s])=>s===t):r).flatMap(([,s])=>s)}function sa(e,t,r,n,s){return ks({key:e,choices:t,layer:"global",global:r,execution_defaults:n,runner_catalog:s})}function rc(e,t){let r={};for(let n of d_){let s=e?.[n],o=t?.[n];s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}function nc(e,t){let r={};for(let n of Cr){let s=e?.[n]??null,o=t?.[n]??null;s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}var oa=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Cr]}],aa={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},sc={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function ia(e,t,r,n,s,o=null){let a=nn({pin:t,global:r,execution_defaults:n,runner_catalog:s,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:o});return e.map(i=>({key:i,...a[i]}))}function oc(e,t,r,n,s,o=null){let a={pin:0,global:0,base:0};for(let i of ia(e,t,r,n,s,o))a[i.source]+=1;return a}function ac(e,t,r){return{id:e,key:t,value:typeof r=="string"?r:""}}function ic(e,t,r){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:r}}var ny=[...Bs,...Cr];var p_=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review"},{id:"impl",label:"\uAD6C\uD604",receipt:null},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review"},{id:"pr",label:"PR",receipt:null}],f_={pin:"pin",global:"global",base:"base"};function __(e){return l`<span
    class=${`detail-layer-rail detail-layer-rail--${f_[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function m_(e,t,r){switch(e){case"workflow_mode":return Dn;case"spec_review_model":case"impl_review_model":return Nn;case"plan_review_model":return Ws;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return zs;case"impl_dispatch":return ec;case"impl_runtime":return Us;case"impl_model":return Hs(r,t.impl_runtime);case"impl_effort":return un(r,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return Pn;case"orchestration_model":return Gs(r,null);case"orchestration_effort":return un(r,void 0,t.orchestration_model||dr).filter(n=>n!==dr);default:return[]}}function g_(e,t){return l`<div class="detail-effective__row" data-key=${e.key}>
    ${__(e.source)}
    <span class="detail-effective__k"
      >${aa[e.key]||e.key}</span
    >
    <span
      class=${`detail-effective__v${e.source==="base"?" detail-effective__v--dim":""}`}
      title=${e.full_value||""}
      >${e.display}</span
    >
    <span
      class=${`detail-effective__badge detail-effective__badge--${e.source}`}
      >${sc[e.source]}</span
    >
    ${t.expanded?l`<select
          class="detail-effective__edit"
          data-edit-key=${e.key}
          aria-label=${`${aa[e.key]||e.key} \uD3B8\uC9D1`}
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
          ${t.options.map(r=>l`<option
                value=${r.value}
                title=${r.full_value||""}
                ?selected=${e.source==="pin"&&e.value===r.value}
              >
                ${r.label}
              </option>`)}
        </select>`:""}
  </div>`}function lc(e,t){let r=oa.flatMap(u=>u.keys),n=ia(r,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=oc(r,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Object.fromEntries(n.map(u=>[u.key,u])),a=Object.fromEntries(n.filter(u=>u.value!==null).map(u=>[u.key,u.value])),i=n.filter(u=>u.full_value&&u.display!==u.full_value).map(u=>u.full_value).join(" \xB7 ");return l`<details
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
      <span class="detail-effective__summary" title=${i}
        >${b_(o)}</span
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
    ${e.expanded?l`<div class="detail-effective__body">
          ${oa.map(u=>l`
              <div class="detail-effective__subhead">${u.label}</div>
              ${n.filter(d=>u.keys.includes(d.key)).map(d=>{let f=ks({key:d.key,choices:m_(d.key,a,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,controller_runtime:e.controller_runtime||null});return g_(d,{expanded:e.expanded,options:f.options,default_label:f.unset_label,default_full_value:f.full_value,onEdit:t.onEdit})})}
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
              ${e.presets.map(u=>l`<option
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
            ${(e.skipped_orchestration_keys||[]).length>0?l`<span
                  class="detail-effective__hint"
                  data-preset-skip-notice
                  >오케스트레이션 3키는 Bead에 핀할 수 없어 건너뜀</span
                >`:""}
          </div>
        </div>`:""}
  </details>`}function b_(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let r=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${r}`)}for(let r of["impl_model","impl_effort","impl_speed"])e[r]?.resolution!=="not_applicable"&&t.push(e[r]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function h_(e){if(!e||typeof e!="object")return null;let{kind:t,actor:r,effort:n,sha:s}=e;return typeof t!="string"||typeof r!="string"||typeof s!="string"?null:{kind:t,actor:r,effort:typeof n=="string"?n:null,sha:s}}function cc(e){let t=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},n=r.stages||{},s=r.route||t.route||null,o=typeof t.pr_url=="string"?t.pr_url:"",a=typeof t.exec_receipt=="string"?t.exec_receipt:"",i=h_(r.exec_receipt),u=i?Br(i):a,d=i?`${i.kind}:${i.actor}`:a.split("@")[0],f=ys(r.planned_execution,r.exec_receipt);return l`<section class="detail-summary" data-seam="detail-summary">
    <div class="detail-summary__chips">
      <span class="detail-summary__chip detail-summary__chip--status"
        >${e?.status||"\u2014"}</span
      >
      ${s?l`<span class="detail-summary__chip detail-summary__chip--route"
            >${s}</span
          >`:""}
      ${t.workflow_mode==="fast_track"?l`<span class="detail-summary__chip detail-summary__chip--mode"
            >fast_track</span
          >`:""}
      ${o?l`<a
            class="detail-summary__chip detail-summary__chip--pr"
            href=${o}
            target="_blank"
            rel="noreferrer"
            >PR</a
          >`:""}
      ${f?l`<span
            class="detail-summary__chip detail-summary__chip--planned ctl-chip--planned"
            data-kind=${f.kind}
            title=${f.title}
            >${f.label}</span
          >`:""}
      ${u?l`<span
            class="detail-summary__chip detail-summary__chip--receipt"
            title=${u}
            >${d}${i?.effort?l`${" "}<span
                    class="detail-summary__chip-effort"
                    data-seam="exec-receipt-effort"
                    >${i.effort}</span
                  >`:""}</span
          >`:""}
    </div>
    <div class="detail-summary__gates">
      ${p_.map(_=>{let y=_.receipt&&typeof t[_.receipt]=="string"?String(t[_.receipt]):"",T=n[_.id],A=y.length>0||T?.fill==="full",R=!A&&T?.fill==="dim",N=T?.stale===!0;return l`<span
          class=${`detail-summary__gate${A?" detail-summary__gate--on":""}${R?" detail-summary__gate--current":""}${N?" detail-summary__gate--stale":""}`}
          data-gate=${_.id}
        >
          <span class="detail-summary__gate-pill">${_.label}</span>
          ${y?l`<span class="detail-summary__gate-sha"
                >${y.split("@")[1]?.slice(0,7)||""}</span
              >`:""}
        </span>`})}
    </div>
  </section>`}var uc=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function qn(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Vs(e){if(!qn(e)||!qn(e.runners))return null;let t=Object.entries(e.runners).filter(([,r])=>qn(r)&&qn(r.models));return t.length>0?t:null}function la(e,t){let r=Vs(e);if(!r||!t)return null;for(let[n,s]of r)if(Object.hasOwn(s.models,t))return n;return null}function dc(e,t){return qn(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function pc(e,t){let r=Vs(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return dc(n,n.models[t]);return[]}function y_(e){let t=Vs(e);if(!t)return[];let r=[];for(let[,n]of t)for(let s of Object.values(n.models))for(let o of dc(n,s))r.includes(o)||r.push(o);return r}function v_(e,t){if(!t)return y_(e);let n=Vs(e)?.find(([o])=>o===t)?.[1];if(!n)return[];let s=[];for(let o of Object.keys(n.models))for(let a of pc(e,o))s.includes(a)||s.push(a);return s}function fc(e,t,r){let n={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=n.impl_runtime==="inherit"?r:n.impl_runtime==="claude"||n.impl_runtime==="codex"?n.impl_runtime:null;if(n.impl_runtime==="inherit"&&!s)return n.impl_model="",n.impl_effort="",n;let o=la(t,n.impl_model);if(n.impl_model&&(!s||o!==s))return n.impl_model="",n.impl_effort="",n;let a=n.impl_model?pc(t,n.impl_model):v_(t,s);return n.impl_effort&&a.length>0&&!a.includes(n.impl_effort)&&(n.impl_effort=""),n}function w_(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function _c(e,t){let r=t.getWorkspacePath,n=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",i="";function u(A){A.key==="Escape"&&s&&(A.preventDefault(),y())}document.addEventListener("keydown",u);function d(){return s?l`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>y()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${w_(s)}</span
            >
            <button
              type="button"
              class="mv__close"
              aria-label="닫기"
              @click=${()=>y()}
            >
              ✕
            </button>
          </div>
          <div class="mv__body">
            ${o==="loading"?l`<div class="mv__status">불러오는 중…</div>`:o==="pending"?l`<div class="mv__status">${i}</div>`:o==="error"?l`<div class="mv__status mv__status--error">
                      ${i||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:Tr(a)}
          </div>
        </div>
      </div>
    `:l``}function f(){He(d(),e)}async function _(A,R={}){s=A,o="loading",a="",i="",f();let N=r?r():"";if(!N){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",f();return}if(!n){o="error",i="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",f();return}let Y="/api/doc?workspace="+encodeURIComponent(N)+"&path="+encodeURIComponent(A);try{let Z=await n(Y),B=await Z.json().catch(()=>({}));if(!Z.ok||!B||B.ok!==!0){if(B?.error==="not_found"&&R.missing_state==="plan_pending"){o="pending",i="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",f();return}o="error",i="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(B&&B.error||Z.status)+")",f();return}a=String(B.content||""),o="ready",f()}catch{o="error",i="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",f()}}function y(){s=null,He(l``,e)}function T(){document.removeEventListener("keydown",u),y()}return{open:_,close:y,destroy:T}}var k_=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],gc="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Ks=["implementation","review-consult"],$_=["running","done","failed","interrupted"],x_={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function A_(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function S_(e){let t=xt(e);if(t.length>0)return t.map(s=>l`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let r=on(e);if(!r||!e)return"";let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return l`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${r.replace(/^τ /,"\u03C4 \uCD1D ")}${n}</span
    >${e.replayed?l`<span class="detail-usage-partial" title=${gc}
          >부분 집계</span
        >`:""}`}function mc(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function ca(e){if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?ua(t):""}function E_(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e;return typeof t.launch_id!="string"||t.launch_id.length===0||t.provider!=="codex"||!Ks.includes(t.role)||typeof t.model!="string"||t.model.length===0||!(!("effort"in t)||t.effort===null||typeof t.effort=="string"&&t.effort.trim().length>0)||typeof t.session_id!="string"||t.session_id.length===0||!$_.includes(t.status)||typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))||!(t.turn_id===null||typeof t.turn_id=="string")?null:t}function T_(e,t){let n=xt({providers:{codex:{subtotal:t.subtotal,breakdown:t.usage,...t.replayed?{replayed:!0}:{}}},roles:{}})[0];return l`<div class="detail-session__leg detail-session__usage-detail">
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${[t.provider,t.model,t.effort].filter(Boolean).join(" \xB7 ")}</span
    >
    ${t.session_id?l`<span
          class="detail-session__leg-sid detail-session__sid"
          title=${t.session_id}
          >${t.session_id.slice(0,8)}</span
        >`:""}
    ${ca(t.completed_at)?l`<span class="detail-session__leg-time detail-session__time"
          >${ca(t.completed_at)}</span
        >`:""}
    ${n?l`<span class="detail-session__usage" title=${n.tooltip}
          >${n.label}</span
        >`:""}
  </div>`}function C_(e,t,r,n){let s=e.status==="running"?null:t,a=(s?xt({providers:{codex:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],i=e.status==="running"?ua(e.last_event_at):s?ca(s.completed_at):"";return l`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>n.onOpenDelegation&&n.onOpenDelegation(r,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${x_[e.status]}</span
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
    ${i?l`<span class="detail-session__leg-time detail-session__time"
          >${i}</span
        >`:""}
    ${a?l`<span class="detail-session__usage" title=${a.tooltip}
          >${a.label}</span
        >`:""}
  </button>`}function R_(e,t){return e.role===t.role&&e.model===t.model&&e.session_id===t.session_id}function I_(e,t,r){let n=[],s=new Set,o=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let f of o){let _=E_(f);!_||s.has(_.launch_id)||(s.add(_.launch_id),n.push(_))}n.sort((f,_)=>f.started_at-_.started_at);let a={implementation:[],"review-consult":[]};if(t)for(let f of Ks){let _=t.roles[f]?.codex;a[f]=_?[..._.legs]:[]}let i=Ks.flatMap(f=>a[f]),u=new Set,d=[];for(let f of Ks){for(let _ of n.filter(y=>y.role===f)){let y=i.find(T=>T.receipt_id===_.launch_id)||null;y&&!R_(_,y)||(y&&u.add(y.receipt_id),d.push(C_(_,y,e.attempt_id,r)))}for(let _ of a[f])u.has(_.receipt_id)||d.push(T_(f,_))}return d}function L_(e,t){let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,n=[...k_,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return l`<div class="detail-session__usage-detail">
    ${n.map(s=>l`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${A_(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${r===null?"":l`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${r.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?l`<span class="detail-session__usage-note">${gc}</span>`:""}
  </div>`}var O_={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function ua(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=String(t.getHours()).padStart(2,"0"),n=String(t.getMinutes()).padStart(2,"0");return`${r}:${n}`}function M_(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,n])=>typeof n=="string"&&n.length>0).map(([n,s])=>`${n}=${s}`).join(" \xB7 "):"",r=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return l`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${r}</span>
    ${t?l`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function bc(e,t={},r={}){let n=Array.isArray(e)?e:[],s=r.expanded||new Set;if(n.length===0)return l`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let d of n)d&&typeof d.resumed_from=="string"&&d.resumed_from.length>0&&o.add(d.resumed_from);let a=d=>{if(!(d.status==="failed"||d.status==="orphaned"))return"";let _=typeof d.session_id=="string"&&d.session_id.length>0,y=o.has(d.attempt_id),T=_&&!y,A=_?y?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return l`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${d.attempt_id}
      ?disabled=${!T}
      title=${A}
      @click=${R=>{R.stopPropagation(),T&&t.onResume&&t.onResume(d.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},i=d=>{if(!(d.status==="failed"||d.status==="orphaned")||typeof d.cause!="string"||d.cause==="")return"";let _=d.cause_detail,y=_&&typeof _.reason=="string"&&_.reason.length>0?typeof _.command=="string"&&_.command.length>0?`${_.reason} \xB7 ${_.command}`:_.reason:d.cause;return l`<div class="detail-session__cause" title=${y}>
      ${d.cause}
    </div>`},u=d=>{let f=mc(Lo(d));if(xt(f).length===0&&!on(d.usage))return"";let _=s.has(d.attempt_id);return l`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${d.attempt_id}
      aria-expanded=${_?"true":"false"}
      title=${_?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${y=>{y.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(d.attempt_id)}}
    >
      τ 자세히
    </button>`};return l`
    <div class="detail-section-label">
      세션 이력${S_(r.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${n.map(d=>{let f=Lo(d),_=mc(f),y=xt(_);return l`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${d.status||"unknown"}"
            data-attempt-id=${d.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(d.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${O_[d.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${d.attempt_id}</span>
            ${Sr(d)?l`<span
                  class="detail-session__resumed"
                  title=${Sr(d)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${cr(d)}</span>
            ${y.length>0?l`<span class="detail-session__role">orchestrator</span>`:""}
            ${d.session_id?l`<span class="detail-session__sid" title=${d.session_id}
                  >${String(d.session_id).slice(0,8)}</span
                >`:""}
            ${y.length>0?y.map(T=>l`<span
                      class="detail-session__usage"
                      title=${T.tooltip}
                      >${T.label}</span
                    >`):on(d.usage)?l`<span class="detail-session__usage"
                    >${on(d.usage)}</span
                  >`:""}
            <span class="detail-session__time">${ua(d.started_at)}</span>
          </button>
          ${u(d)} ${a(d)} ${i(d)} ${M_(d)}
          ${s.has(d.attempt_id)&&d.usage?L_(d.usage,d.runner==="codex"?"codex":"claude"):""}
          ${I_(d,f,t)}
        </div>`})}
    </div>
  `}function hc(e,t={}){return l`
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
    ${e.expanded?l`<div class="detail-prompt" data-seam="task-prompt">
          ${P_(e)}
        </div>`:""}
  `}function P_(e){let t=cn(e);if(t)return t;let r=e.data;if(!r)return"";if(r.missing)return l`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof r.default_task_prompt=="string"?vr("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",r.default_task_prompt):""}`;let n=Ds(r.recorded_at);return l`<div class="detail-prompt__meta">
      ${r.attempt_id}${n?` \xB7 ${n}`:""}
    </div>
    ${typeof r.task_prompt=="string"?vr("\uACFC\uC5C5 (user)",r.task_prompt):""}
    ${typeof r.system_prompt=="string"?vr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",r.system_prompt):""}`}var D_=["open","in_progress","deferred","resolved","closed"],N_=[0,1,2,3,4];function yc(e,t){let r=t.issueStores,n=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,i=t.execPresetStore,u=t.sessionLogStore,d=null,f=null,_={},y="",T=!1,A=[],R=!1,N={},Y=!1,Z=!1,B="",U="",I="";function W(){Y=!1,Z=!1,B="",U="",I=""}let b=[],C=null,z=null,re=!1,L="",M=!1,ue=0,fe=new Set;function de(){b=[],C=null,z=null,re=!1,L="",M=!1,ue+=1,fe.clear()}async function Be(p){if(!s)return;let g=++ue;try{let x=await Promise.resolve(s("get-comments",{id:p}));if(g!==ue||p!==d)return;b=Array.isArray(x)?x:[],re=!1}catch{if(g!==ue||p!==d)return;re=!0}Ne()}function Qe(){if(!s||!d)return;let p=f&&typeof f.comment_count=="number"?f.comment_count:null;if(C!==d){C=d,z=p,Be(d);return}p!==null&&p!==z&&(z=p,Be(d))}function Ve(p){fe.has(p)?fe.delete(p):fe.add(p),Ne()}function Me(p){let g=L.trim().length===0;L=p,g!==(p.trim().length===0)&&Ne()}async function Ue(){let p=L.trim();if(!s||!d||p.length===0||M)return;let g=d;M=!0,Ne();let x=!1;try{let j=await Promise.resolve(s("add-comment",{id:g,text:p}));Array.isArray(j)&&j.length>0&&(x=!0,g===d&&(b=j,re=!1,L="",z=j.length))}catch{x=!1}x||oe("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),g===d&&(M=!1),Ne()}let le={onToggle:Ve,onDraftInput:Me,onSubmit:Ue},Ae=document.createElement("div");Ae.className="md-viewer-root",document.body.appendChild(Ae);let Ie=_c(Ae,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),Ee=document.createElement("div");Ee.className="session-log-root",document.body.appendChild(Ee);let he=qs(Ee,{transport:s?(p,g)=>Promise.resolve(s(p,g)):void 0,sessionLogStore:u}),We=!1,et=!1,Te=!1,tt=null,K=null,q=0;function ne(p){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${p}`}function Oe(){We=!1,et=!1,Te=!1,tt=null,K=null,q+=1}async function Fe(p){if(!s)return;let g=++q;et=!0,Te=!1,Ne();try{let x=await Promise.resolve(s("get-bead-prompt",{bead_id:p}));if(g!==q)return;!x||typeof x!="object"||Array.isArray(x)?Te=!0:(tt=x,K=ne(p))}catch{g===q&&(Te=!0)}finally{g===q&&(et=!1,Ne())}}function ze(){if(We=!We,We&&d&&K!==ne(d)){tt=null,Fe(d);return}Ne()}function Ce(){if(!a||!d)return[];let p=a.get();return(p&&p.attempts?Object.values(p.attempts):[]).filter(x=>x&&x.bead_id===d).sort((x,j)=>(j.started_at||0)-(x.started_at||0)).map(x=>({attempt_id:x.attempt_id,bead_id:x.bead_id,status:x.status,started_at:typeof x.started_at=="number"?x.started_at:null,runner:x.runner||null,model:x.model||null,effort:x.effort||x.observed_effort||null,speed:x.speed||null,session_id:x.session_id||null,resumed_from:x.resumed_from||null,continuation_mode:x.continuation_mode||null,dismissed_at:typeof x.dismissed_at=="number"?x.dismissed_at:null,cause:typeof x.cause=="string"?x.cause:null,cause_detail:x.cause_detail||null,exec_default_preset_id:typeof x.exec_default_preset_id=="string"?x.exec_default_preset_id:null,exec_default_preset_revision:typeof x.exec_default_preset_revision=="number"?x.exec_default_preset_revision:null,exec_values:x.exec_values&&typeof x.exec_values=="object"?x.exec_values:null,usage:x.usage||null,usage_legs:Array.isArray(x.usage_legs)?x.usage_legs:[],delegation_sessions:Array.isArray(x.delegation_sessions)?x.delegation_sessions:[]}))}function ct(){if(!a||!d)return null;let p=a.get();return Wt(p&&p.attempts||{},d)}let Ye=new Set;function G(p){Ye.has(p)?Ye.delete(p):Ye.add(p),Ne()}function te(p){let g=a?a.get():null,x=g&&g.attempts?g.attempts[p]:null;he.open({attempt_id:p,meta:x?{runner:x.runner||void 0,model:x.model||void 0,effort:x.effort||void 0,status:x.status||void 0,session_id:x.session_id||void 0}:{}})}function De(p,g){let x=a?a.get():null,j=x&&x.attempts?x.attempts[p]:null,ge=(j&&Array.isArray(j.delegation_sessions)?j.delegation_sessions:[]).find(Re=>Re&&typeof Re=="object"&&Re.launch_id===g);ge&&he.open({attempt_id:p,launch_id:g,meta:{runner:"codex",role:ge.role,model:ge.model,effort:ge.effort,session_id:ge.session_id,status:ge.status}})}async function rt(p){if(!s||!p)return;let g=await sn();if(g===null)return;let x=()=>{let Re=a?a.get():null;return Re&&typeof Re.revision=="number"?Re.revision:0},j=async(Re={},qe=x())=>await s("worker-attempt-resume",{attempt_id:p,expected_revision:qe,...g!==""?{instructions:g}:{},...Re}),we=Re=>{Re?.queue&&a?.set&&a.set(Re.queue)},ge=await j();if(we(ge),ge&&ge.conflict){let Re=ge.queue&&typeof ge.queue.revision=="number"?ge.queue.revision:x();ge=await j({},Re),we(ge)}ge=await mr(ge,(Re,qe)=>j({continuation:Re,decision_token:qe}),{onResult:we,refresh:()=>j()}),ge&&ge.resumed===!1&&!ge.conflict&&ge.reason&&oe(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${ge.reason}`,"error",2400)}let pe={onOpen:te,onOpenDelegation:De,onResume:rt,onToggleUsage:G};function h(){let p=a?a.get():null,g={...N};for(let x of["orchestration_model","orchestration_effort","orchestration_speed"]){let j=p&&p[x];typeof j=="string"&&(g[x]=j)}return g}async function $(){if(s){try{let p=await Promise.resolve(s("get-session-defaults",{}));N=p&&p.values&&typeof p.values=="object"?p.values:{}}catch{N={}}Ne()}}function k(){let p=a?a.get():null;return p&&p.runner_catalog||null}function O(){let p=a?a.get():null;return p&&typeof p.execution_defaults=="object"?p.execution_defaults:null}function V(){let p=f?.metadata&&typeof f.metadata=="object"?f.metadata:{},x=nn({pin:{...p,..._},global:h(),execution_defaults:O(),runner_catalog:k(),route:typeof p.route=="string"?p.route:null}).orchestration_model.value||"";return la(k(),x)}function X(){let p=i?i.get():null;return!p||typeof p.revision!="number"?null:{revision:p.revision,presets:Array.isArray(p.presets)?p.presets:[]}}function se(p){return p?.compatible===!1}function ce(p){i&&p&&typeof p.revision=="number"&&Array.isArray(p.presets)&&i.set({revision:p.revision,presets:p.presets})}async function je(){let p=X(),g=p?.presets.find(x=>x.id===y);if(!(!s||!d||!p||!g||se(g)||T)){T=!0,A=[],Ne();try{let x=await Promise.resolve(s("apply-impl-preset",ic(d,g.id,p.revision)));if(x&&x.conflict){ce(x),oe("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let j=x&&Array.isArray(x.issue)?x.issue[0]:x?.issue;if(x&&x.applied&&j&&typeof j=="object"){f=j,A=Array.isArray(x.skipped_orchestration_keys)?x.skipped_orchestration_keys.filter(we=>typeof we=="string"):[];for(let we of uc)delete _[we];oe(A.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}x&&x.error==="bd_readback_failed"?oe("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):oe("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(x){x&&typeof x=="object"&&x.code==="bd_readback_failed"?oe("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):oe("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{T=!1,Ne()}}}let be=null;r&&r.subscribe&&(be=r.subscribe(()=>ot()));let Se=null;a&&typeof a.subscribe=="function"&&(Se=a.subscribe(()=>{d&&Ne()}));let ye=null;i&&typeof i.subscribe=="function"&&(ye=i.subscribe(()=>{d&&Ne()}));function st(p){p.key==="Escape"&&d&&(p.preventDefault(),n())}document.addEventListener("keydown",st);function ot(){if(d){if(r&&typeof r.snapshotFor=="function"){let p=r.snapshotFor("detail:"+d)||[];f=p.find(x=>x&&x.id===d)||p[0]||f}Qe(),Ne()}}function F(p){Zt(p).then(g=>{g?oe("\uBCF5\uC0AC\uB428","success",1200):oe("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function ee(p){p.preventDefault(),p.stopPropagation(),d&&F(d)}function _e(p,g){p.preventDefault(),p.stopPropagation(),F(g)}function w(p,g,x){p.preventDefault(),p.stopPropagation(),Ie.open(g,{missing_state:x})}function E(p,g){_[p]=g,Ne(),!(!s||!d)&&Promise.resolve(s("update-exec-settings",ac(d,p,g.length===0?null:g))).catch(()=>{oe("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function P(p,g){let x=f||{},j=x.metadata&&typeof x.metadata=="object"?x.metadata:{},we={};for(let qe of["impl_runtime","impl_model","impl_effort"])we[qe]=Object.hasOwn(_,qe)?_[qe]:typeof j[qe]=="string"?j[qe]:"";we[p]=g;let ge=fc(we,k(),V()),Re={};for(let qe of["impl_runtime","impl_model","impl_effort"])Re[qe]=_[qe],_[qe]=ge[qe]||"";Ne(),!(!s||!d)&&Promise.resolve(s("update-impl-target",{id:d,...ge,orchestration_runtime:V()})).then(qe=>{let _t=Array.isArray(qe)?qe[0]:qe;if(!_t||typeof _t!="object"||!_t.id)throw new Error("implementation target readback failed");f=_t;for(let ir of["impl_runtime","impl_model","impl_effort"])delete _[ir];Ne()}).catch(()=>{for(let qe of["impl_runtime","impl_model","impl_effort"])Re[qe]===void 0?delete _[qe]:_[qe]=Re[qe];Ne(),oe("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function Q(p,g,x){if(!s||!d)return!1;try{let j=await Promise.resolve(s(p,g)),we=Array.isArray(j)?j[0]:j;return we&&typeof we=="object"&&we.id?(f=we,!0):(oe(x,"error"),!1)}catch{return oe(x,"error"),!1}}function ke(p){setTimeout(()=>{try{let g=e.querySelector(p);g&&typeof g.focus=="function"&&g.focus()}catch{}},0)}function J(){Y=!0,B=f&&f.title||"",Ne(),ke('.detail-edit__input[data-edit="title"]')}function xe(p){B=p.target.value}function Le(){Y=!1,B="",Ne()}function gt(){Q("edit-text",{id:d,field:"title",value:B},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(g=>{g&&(Y=!1,B=""),Ne()})}function ht(){Z=!0,U=f&&f.description||"",Ne(),ke('.detail-edit__textarea[data-edit="description"]')}function Ze(p){U=p.target.value}function St(){Z=!1,U="",Ne()}function Ht(){Q("edit-text",{id:d,field:"description",value:U},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(g=>{g&&(Z=!1,U=""),Ne()})}function vt(p,g,x,j){if(p.key==="Escape"){p.stopPropagation(),x();return}p.key==="Enter"&&(!j||p.ctrlKey||p.metaKey)&&(p.preventDefault(),g())}function Ot(p){let g=p.target.value;Q("update-status",{id:d,status:g},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>Ne())}function rr(p){let g=Number(p.target.value);Q("update-priority",{id:d,priority:g},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>Ne())}function nr(p){I=p.target.value}function sr(){let p=I.trim();p.length!==0&&Q("label-add",{id:d,label:p},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(g=>{g&&(I=""),Ne()})}function fr(p){if(p.key==="Escape"){p.stopPropagation(),I="",Ne();return}p.key==="Enter"&&(p.preventDefault(),sr())}function wt(p){Q("label-remove",{id:d,label:p},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>Ne())}let Gt={onCopyPath:_e,onOpenDoc:w};function or(p){return typeof p=="string"?p:p&&typeof p=="object"?String(p.id||p.to||p.issue_id||p.depends_on||""):""}function ar(p){switch(p&&typeof p=="object"?String(p.dependency_type||p.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function Je(p){let x=(Array.isArray(p.dependencies)?p.dependencies:[]).map(j=>({id:or(j),icon:ar(j)})).filter(j=>j.id.length>0);return l`
      <div class="detail-section-label">의존성</div>
      ${x.length===0?l`<div class="detail-empty">의존성 없음</div>`:l`<div class="detail-deps">
            ${x.map(j=>o?l`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(j.id)}
                  >
                    ${j.icon?`${j.icon} `:""}${j.id}
                  </button>`:l`<span class="detail-dep"
                    >${j.icon?`${j.icon} `:""}${j.id}</span
                  >`)}
          </div>`}
    `}function Pt(p){let g=p.metadata||{},x=p.workflow||{},j=x.stages||{},we=j.spec&&j.spec.stale,ge=j.impl&&j.impl.stale,Re=j.plan||null,qe=x.route_source==="derived",_t=x.route||g.route||"\u2014";return l`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${qe?" detail-kv__v--derived":""}"
          title=${qe?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${qe?"unset":_t}</span
        >
      </div>
      ${x.route!=="quick_fix"||Object.hasOwn(g,"spec_review")?l`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${g.spec_review||"\uC5C6\uC74C"}${we?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${x.route==="full_plan"?l`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Re?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Re?.approval_receipt||"\uC5C6\uC74C"}${Re?.approval_state==="stale"?" \xB7 stale":Re?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${x.route!=="quick_fix"||Object.hasOwn(g,"impl_review")?l`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${g.impl_review||"\uC5C6\uC74C"}${ge?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${x.planned_execution?l`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${x.planned_execution.kind}</span>
            </div>
            ${x.planned_execution.kind==="main"?l`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${x.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${x.exec_receipt?l`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${Br(x.exec_receipt)}</span
            >
          </div>`:""}
      ${x.impl_entry?l`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${x.impl_entry.actor}@${x.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${g.pr_url?l`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${g.pr_url}</span>
          </div>`:""}
    `}let ve={route:["quick_fix","spec_backed","full_plan"]};async function c(p,g){let x=g.target.value;if(p==="route"&&f&&f.metadata&&f.metadata.route==="full_plan"&&x!=="full_plan"&&!window.confirm(`full_plan \u2192 ${x||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){Ne();return}await Q("update-workflow-meta",{id:d,key:p,value:x},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),Ne()}function m(p){let g=p.metadata||{};return l` ${((j,we)=>{let ge=ve[j],Re=typeof g[j]=="string"?g[j]:"";return l`<div class="detail-kv">
        <span class="detail-kv__k">${j}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${j}
          data-edit=${`wfmeta-${j}`}
          @change=${qe=>c(j,qe)}
        >
          <option value="" ?selected=${!ge.includes(Re)}>
            ${we}
          </option>
          ${ge.map(qe=>l`<option value=${qe} ?selected=${Re===qe}>${qe}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function S(p,g){return Y?l`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${B}
            @input=${xe}
            @keydown=${x=>vt(x,gt,Le,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${gt}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${Le}
            >
              취소
            </button>
          </div>
        </div>
      `:l`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${p}</h2>
        ${xt(g).map(x=>l`<span class="detail-usage-total" title=${x.tooltip}
              >${x.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${J}
        >
          ✎
        </button>
      </div>
    `}function H(p){let g=kt(p.created_at),x=kt(p.updated_at);return!g&&!x?l``:l`
      ${g?l`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${g}</span>
          </div>`:""}
      ${x?l`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${x}</span>
          </div>`:""}
    `}function ae(p,g){return l`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${Ot}
        >
          ${D_.map(x=>l`<option value=${x} ?selected=${x===p}>${x}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${rr}
        >
          ${N_.map(x=>l`<option value=${String(x)} ?selected=${x===g}>
                P${x}
              </option>`)}
        </select>
      </div>
    `}function $e(p){return l`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${Z?"":l`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${ht}
            >
              ✎
            </button>`}
      </div>
      ${Z?l`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${U}
              @input=${Ze}
              @keydown=${g=>vt(g,Ht,St,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${Ht}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${St}
              >
                취소
              </button>
            </div>
          </div>`:l`<div class="detail-overlay__desc">
            ${p||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function me(p){let g=typeof p.notes=="string"?p.notes:"";return g.trim().length===0?l``:l`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${g}</div>
    `}function Ke(p){let g=Array.isArray(p.labels)?p.labels:[];return l`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${g.map(x=>l`<span class="detail-label-chip"
              >${x}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${x}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+x}
                @click=${()=>wt(x)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${I}
            @input=${nr}
            @keydown=${fr}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${sr}
          >
            추가
          </button>
        </span>
      </div>
    `}function nt(){if(!d)return l``;let p=f||{},g=String(p.id||d),x=p.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",j=ct(),we=p.status||"open",ge=typeof p.priority=="number"?Math.max(0,Math.min(4,p.priority)):"",Re=p.description||"",qe={...p,metadata:{...p.metadata||{},..._}};return l`
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
            @click=${ee}
          >
            ${g}
          </button>
          ${S(x,j)}
          ${cc(qe)}
          ${lc({metadata:qe.metadata,workspace_values:h(),catalog:k(),execution_defaults:O(),expanded:R,presets:X()?.presets||[],preset_id:y,preset_busy:T,skipped_orchestration_keys:A},{onToggle:_t=>{R=_t,Ne()},onEdit:(_t,ir)=>{if(_t==="impl_runtime"||_t==="impl_model"||_t==="impl_effort"){P(_t,ir??"");return}E(_t,ir??"")},onPresetSelect:_t=>{y=_t,A=[],Ne()},onPresetApply:()=>{je()}})}
          ${ae(we,ge)} ${H(p)}
          ${$e(Re)}
          ${Zl(b,le,{expanded:fe,draft:L,sending:M,error:re})}
          ${me(p)} ${Ke(p)} ${Je(p)}
          ${Pt(p)} ${m(p)}
          ${Vl(p,Gt)}
          ${hc({expanded:We,loading:et,error:Te,data:tt},{onToggle:ze})}
          ${bc(Ce(),pe,{total:j,expanded:Ye})}
        </div>
      </div>
    `}function Ne(){He(nt(),e)}return{load(p){p!==d&&(_={},y="",A=[],R=!1,W(),de(),Oe()),d=p,f=null,ot(),$()},clear(){d=null,f=null,_={},y="",T=!1,A=[],R=!1,W(),de(),Oe(),Ie.close(),he.close(),He(l``,e)},destroy(){be&&(be(),be=null),Se&&(Se(),Se=null),ye&&(ye(),ye=null),document.removeEventListener("keydown",st),Ie.destroy(),Ae.parentNode&&Ae.parentNode.removeChild(Ae),he.destroy(),Ee.parentNode&&Ee.parentNode.removeChild(Ee),d=null,f=null,y="",T=!1,A=[],de(),Oe(),He(l``,e)}}}function vc(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let r=t.querySelector("#fatal-error-title"),n=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),i=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},u=(d,f,_="")=>{r&&(r.textContent=d||"Unexpected Error"),n&&(n.textContent=f||"An unrecoverable error occurred.");let y=typeof _=="string"?_.trim():"";if(s&&(y.length>0?(s.textContent=y,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>i()),t.addEventListener("cancel",d=>{d.preventDefault(),i()}),{open:u,close:i,getElement(){return t}}}function Ys(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function Zs(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let r=Math.floor(t/60);if(r<60)return`${r}\uBD84 ${Math.round(t-r*60)}\uCD08`;let n=Math.floor(r/60),s=r%60;return`${n}\uC2DC\uAC04 ${s}\uBD84`}function wc(e,t){if(typeof e!="object"||e===null)return null;let r=0,n=!1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t)continue;let a=o.started_at,i=o.finished_at;typeof a!="number"||typeof i!="number"||!Number.isFinite(a)||!Number.isFinite(i)||i<a||(r+=i-a,n=!0)}return n?r:null}function Xs(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function q_(e,t){let r=Array.isArray(e)?e:[],n=Array.isArray(t)?t:[];if(r.length===0&&n.length===0)return null;let s=null;for(let i of r)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!s||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=i);let o=r.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+n.length,a=r.some(i=>i.state==="repairing");return{deploy:s?{sha:Ys(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function kc(e,t){let r=q_(e,t);return r?l`<button
    type="button"
    class="worker-repo-strip"
    data-seam="repo-ops-strip"
    aria-label="저장소 작업 타임라인 열기"
  >
    <span class="worker-repo-strip__cue" aria-hidden="true">▸</span>
    <span class="worker-repo-strip__name">저장소 작업</span>
    ${r.deploy?l`<span class="worker-repo-strip__fact">
          배포
          <code class="worker-repo-strip__sha">${r.deploy.sha}</code>
          <span class="worker-repo-strip__ok">✓ 최신</span>
          <span
            class="worker-repo-strip__ago"
            title=${r.deploy.at?kt(r.deploy.at):""}
            >${Xs(r.deploy.at)}${r.deploy.elapsed_ms!==null?` \xB7 ${Zs(r.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${r.badge.tone}"
      >${r.badge.label}</span
    >
  </button>`:""}function dn(e){let t=qt(e.created_at),r=qt(e.updated_at);return!t&&!r?"":l`<div class="worker-mini__meta">
    ${t?l`<span title=${`\uC0DD\uC131 ${kt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&r?l`<span>·</span>`:""}${r?l`<span title=${`\uC218\uC815 ${kt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </div>`}function F_(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function Fn(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function Qs(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function pr(e,t,r={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(_=>_&&_.bead_id===t&&_.phase!=="done").sort((_,y)=>(_.requested_at||0)-(y.requested_at||0)).at(-1),o=typeof r.attempt_id=="string"&&r.attempt_id.length>0?r.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=r.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":r.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":r.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,i=typeof s?.last_error=="string"?s.last_error:null,u=s?F_(s.phase):null,d=s?.kind==="stale_work_backup_fresh",f=r.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!r.external&&!r.done,enabled:!a&&(!s||!!i),label:d?i?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":i?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(i?d?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${i} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${i} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${u||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:f==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:u,error:i,confirmation:f}}function kr(e){let t=e.discard;if(!t||!t.operation)return"";let r=t.operation,n=r.kind==="stale_work_backup_fresh"&&!t.error?null:r.backup?.path,s=r.original_pr,o=r.revert_pr;return l`<div
    class="worker-discard-receipt"
    role=${t.error?"alert":"status"}
  >
    <span>${t.progress}</span>
    ${t.error?l`<span>폐기 실패: ${t.error}</span>`:""}
    <code>작업: ${r.operation_id}</code>
    ${n?l`<code>백업: ${n}</code>`:t.error?l`<span>아직 아무것도 삭제하지 않음</span>`:""}
    ${s?.url?l`<a href=${s.url} target="_blank" rel="noreferrer noopener"
          >원본 PR #${s.number||"?"}</a
        >`:""}
    ${o?.url?l`<a href=${o.url} target="_blank" rel="noreferrer noopener"
          >revert PR #${o.number||"?"} ·
          ${o.state||"\uC0C1\uD0DC \uBBF8\uD655\uC778"}</a
        >`:""}
  </div>`}var j_={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function $c(e,t=!1){if(!e||typeof e!="object")return null;let r=e;if(r.reason!=="worktree_stale_work"||!r.stale_work||typeof r.stale_work!="object")return null;let n=r.stale_work,s=n.residue==="branch"?"branch":"worktree",o=n.state==="unique"?"unique":"unknown",a=n.summary&&typeof n.summary=="object"?n.summary:{};function i(d){return Number.isInteger(a[d])?Number(a[d]):0}let u=typeof n.cause=="string"?n.cause:"observe_failed";return{residue:s,state:o,title:s==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":o==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:j_[u]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:s==="branch"?`\uACE0\uC720 commit ${i("branch_ahead")}`:[`staged ${i("staged_count")}`,`unstaged ${i("unstaged_count")}`,`untracked ${i("untracked_count")}`,`branch ahead ${i("branch_ahead")}`,`HEAD ahead ${i("head_ahead")}`].join(" \xB7 "),action_id:typeof n.action_id=="string"?n.action_id:"",can_resume:n.can_resume===!0,can_continue:n.can_continue===!0,can_backup_fresh:n.can_backup_fresh===!0,can_recheck:n.can_recheck===!0,locked:t}}function da(e){let t=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],n=xt(e.usage),s=Xt(e.usage),o=e.merge_step||null,a=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,i=e.lane==="done"&&!a,u=i?qt(e.done_at):"",d=t?l`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",f=typeof e.seq=="number"?l`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",_=e.worker_serial===!0?l`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",y=e.workspace_name?l`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",T=l`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,A=l`<span class="worker-mini__title">${e.title}</span>`,R=e.pr_url&&e.pr_number?l`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",N=e.completion_repair_pr_url&&e.completion_repair_pr_number?l`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",Y=r.map(de=>de===e.live_badge?l`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${de}</span
        >`:l`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${de===e.completion_badge&&e.completion_title||""}
          >${de}</span
        >`),Z=e.reason?l`<span class="worker-mini__reason">${e.reason}</span>`:"",B=n.length>0?n.map(de=>l`<span class="worker-usage" title=${de.tooltip}
              >${de.label}</span
            >`):s?l`<span class="worker-usage" title=${an(e.usage)}
            >${s}</span
          >`:"",U=o?l`<span
        class="merge-step${o.failed?" merge-step--failed":""}"
        style=${`--progress: ${o.percent}%`}
        >${o.label}${o.index>0?l`<span class="merge-step__n"
              >${o.index}/${o.total}</span
            >`:""}</span
      >`:"",I=e.merge_action?l`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",W=e.cancel_action?l`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",b=e.timeline_action?l`<button
        type="button"
        class="worker-mini__timeline"
        data-bead-id=${e.id}
        title="저장소 작업이 끝나지 않아 머지 액션이 잠겼습니다 — 타임라인에서 원인과 해결 버튼을 볼 수 있습니다"
      >
        저장소 작업 보기
      </button>`:"",C=e.discard,z=C?.action||e.discard_action?l`<button
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
        </button>`:"",re=e.stale_work||null,L=re?l`${re.can_resume||re.can_continue?l`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${re.action_id}
            ?disabled=${re.locked}
          >
            기존 작업 이어가기
          </button>`:""}${re.can_backup_fresh?l`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${re.action_id}
            ?disabled=${re.locked}
          >
            백업 후 새로 시작
          </button>`:""}${re.can_recheck?l`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${re.action_id}
            ?disabled=${re.locked}
          >
            다시 확인
          </button>`:""}`:"",M=re?l`<div class="worker-mini__stale">
        <strong>${re.title}</strong>
        <span>${re.summary}</span>
        <span>${re.cause}</span>
        ${re.can_backup_fresh?l`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",ue=e.revise_action?l`<button
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
        </button>`:"",fe=!!(s||o||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||C?.operation||e.revise_action||re);return l`<div
    class="worker-mini${a?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${o?" worker-mini--merging":""}${o?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${i?l`<div class="worker-mini__row1">${y}${T}${A}</div>
          <div class="worker-mini__row2">
            ${B}${u?l`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${kt(e.done_at)}`}
                  >완료 ${u}</span
                >`:""}${typeof e.work_ms=="number"?l`<span
                  class="worker-mini__work"
                  title="attempt 실행 시간 합산 (재개 세션 포함)"
                  >작업 ${Zs(e.work_ms)}</span
                >`:""}${Y}${U}
            <span class="worker-mini__actions"
              >${I}${W}${b}${z}</span
            >
            ${dn(e)}
          </div>`:a?l`<div class="worker-mini__head">
              ${d}${f}${y}${T}${R}${N}${Y}${_}${Z}
            </div>
            <div class="worker-mini__body">${A}${M}</div>
            ${fe?l`<div class="worker-mini__foot">
                  ${B}${U}
                  <span class="worker-mini__actions"
                    >${I}${W}${b}${z}${ue}${L}</span
                  >
                  ${kr(e)}
                </div>`:""}
            ${dn(e)}`:l`<div class="worker-mini__line">
              ${d}${f}${y}${T}${A}${R}${N}${Y}${_}${Z}${B}${U}${I}${W}${b}${z}
            </div>
            ${kr(e)} ${dn(e)}`}
  </div>`}function B_(e,t=null){let r=e.worker_ineligible===!0,n=e.draggable&&!e.done&&!r,s=n&&t&&t.bead_id===e.id,o=e.workflow,a=o&&o.chips||{},i=a.route||o&&o.route,u=a.route_source==="derived"||!!(o&&o.route_source==="derived"),d=typeof e.reason=="string"&&e.reason.split(" \xB7 ").includes("missing_description"),f=typeof e.reason=="string"&&e.reason.startsWith("\u26D4");return l`<div
    class="worker-card${n?"":" worker-card--static"}${r?" worker-card--ineligible":""}"
    draggable=${n?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${n?l`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      ${e.workspace_name?l`<span class="worker-card__repo" title=${e.root_dir||""}
            >${e.workspace_name}</span
          >`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span>
      ${r?l`<span
            class="ctl-chip worker-card__ineligible"
            title="worker-ineligible label이 붙어 워커 실행 대상이 아닙니다"
            >⛔ worker-ineligible</span
          >`:""}
      ${o&&i?l`<span
            class="ctl-chip ctl-chip--route${u?" is-derived":""}"
            title=${u?"route \uBBF8\uD540 (metadata unset)":"route"}
            >${u?"unset":i}</span
          >`:""}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${o?hs(o,e.status):""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${s?l`<div class="worker-card__place-menu">
            ${t.lanes.map(_=>l`<button
                  type="button"
                  class="worker-card__place-lane"
                  data-bead-id=${e.id}
                  data-lane=${_.id}
                  title="${_.label} 대기 맨 뒤에 추가"
                >
                  <span>${_.label}</span>
                  <span class="worker-card__place-count">${_.count}</span>
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
          </div>`:l`${e.reason?l`<span
                  class="worker-card__reason${f?" worker-card__reason--danger":""}"
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
    ${dn(e)}
  </div>`}function tr(e){let t=!!e.collapsible&&!!e.collapsed,r=l`<span
      class="worker-pane__dot worker-pane__dot--${e.lane}"
      aria-hidden="true"
    ></span>
    <span class="worker-pane__title">${e.title}</span>
    ${t&&e.preview?l`<span class="worker-pane__preview">${e.preview}</span>`:""}
    <span class="worker-pane__count">${e.items.length}</span>`;return l`<section
    class="worker-pane worker-pane--lane-${e.lane}${e.src?" worker-pane--src":""}${e.live?" worker-pane--live":""}${e.collapsible?" worker-pane--collapsible":""}${t?" worker-pane--collapsed":""}"
    id=${e.id}
    data-lane=${e.lane}
  >
    ${e.collapsible?l`<button
          type="button"
          class="worker-pane__hd worker-pane__hd--toggle"
          data-lane=${e.lane}
          aria-expanded=${t?"false":"true"}
        >
          ${r}
          <span class="worker-pane__caret" aria-hidden="true"
            >${t?"\u25B8":"\u25BE"}</span
          >
        </button>`:l`<header class="worker-pane__hd">
          ${r}${e.header_control?e.header_control:""}
        </header>`}
    ${t?"":l`${e.controls?e.controls:""}
          <div class="worker-pane__body">
            ${e.body?e.body:e.items.length===0?l`<div class="worker-pane__empty">
                    ${e.empty||""}
                  </div>`:e.items.map(n=>e.lane==="candidate"?B_(n,e.place_menu):da(n))}
          </div>`}
  </section>`}function pa(e,t){return`${e}\0${t}`}function fa(e){let t=new Map;for(let r of Array.isArray(e?.running)?e.running:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"running",state:"running"});for(let r of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let r of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let n=Array.isArray(r.sublanes?.parallel)?r.sublanes.parallel:Array.isArray(r.items)?r.items:[];for(let s of n)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:"parallel",position:s.queue_position});for(let s of Array.isArray(r.sublanes?.serial)?r.sublanes.serial:[])for(let o of s.items)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:s.id,position:o.queue_position})}for(let r of Array.isArray(e?.runnable)?e.runnable:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"runnable",state:"runnable"});for(let r of Array.isArray(e?.done)?e.done:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"done",state:"done"});return t}function U_(e,t){let r=Array.isArray(t)?t:[],n=e.indexOf("-"),s=n>0?e.slice(0,n):e;return r.some(o=>typeof o?.issue_prefix=="string"&&o.issue_prefix===s)?"internal":r.length>0&&r.every(o=>typeof o?.issue_prefix=="string")?"external":"unknown"}function W_(e,t){return e==="internal"&&t===void 0}function xc(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function Ac(e,t,r,n){let s=r.get(e);if(!!(s&&t&&s.root_dir===t.root_dir&&s.lane===t.lane&&typeof s.position=="number"&&typeof t.position=="number"&&s.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,scope:null,same_lane_ahead:!0,missing_internal:!1};if(s)return{id:e,label:`\u{1F512} ${e} (${xc(s)})`,scope:null,same_lane_ahead:!1,missing_internal:!1};let a=U_(e,n);return{id:e,label:`\u{1F512} ${e} (${a==="internal"?"\uBBF8\uC801\uC7AC":a==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"})`,scope:a,same_lane_ahead:!1,missing_internal:W_(a,s)}}function Sc(e){let t=Array.isArray(e)?e:[],r=new Map,n=new Map,s=new Map;for(let i of t)for(let u of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let d=pa(i.root_dir,u.id);r.set(d,{root_dir:i.root_dir,workspace_name:i.name,lane:u.id}),s.set(d,[]);for(let f of Array.isArray(u.items)?u.items:[])n.set(f.id,d)}for(let i of t)for(let u of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let d=pa(i.root_dir,u.id),f=Array.isArray(u.items)?u.items[0]:null,y=!!f&&f.queue_index===0&&(!Array.isArray(u.occupied_by)||u.occupied_by.length===0)&&Array.isArray(f.blocked_by)?f.blocked_by:[],T=s.get(d);if(T)for(let A of y){let R=n.get(A);R&&R!==d&&!T.includes(R)&&T.push(R)}}let o=(i,u)=>{let d=new Set,f=[i];for(;f.length>0;){let _=f.pop();if(_===u)return!0;!_||d.has(_)||(d.add(_),f.push(...s.get(_)||[]))}return!1},a=new Map;for(let[i,u]of s){let d=[];for(let f of u){let _=r.get(f);o(f,i)&&_&&d.push(_)}d.length>0&&a.set(i,d)}return a}function Ec(e){let t=fa(e),r=new Map;for(let n of[...Array.isArray(e?.runnable)?e.runnable:[],...Array.isArray(e?.queue)?e.queue:[],...Array.isArray(e?.running)?e.running:[],...Array.isArray(e?.pr_wait)?e.pr_wait:[]])r.has(n.id)||r.set(n.id,n);return Array.from(r.values()).map(n=>({id:n.id,title:n.title,root_dir:n.root_dir,workspace_name:n.workspace_name,location:t.has(n.id)?(()=>{let s=t.get(n.id),o=xc(s);return s.state?`${s.workspace_name} \xB7 ${o}`:o})():""}))}function Tc(e,t){return pa(e,t)}var Cc=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],jn=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function Js(e,t){let r=Cc.find(s=>s.step===e);if(!r)return null;let n=Cc.length;return{step:r.step,label:t,index:r.index,total:n,percent:Math.round(r.index/n*100)}}function Rc(e){let t=jn.findIndex(r=>r.step===e);return jn.map((r,n)=>({step:r.step,label:r.label,state:t<0?"todo":n<t?"done":n===t?"stall":"todo"}))}function Hr(e){let t=jn.find(r=>r.step===e);return t?t.label:typeof e=="string"?e:""}function z_(e){let t=jn.findIndex(r=>r.step===e);return t<0?null:{index:t+1,total:jn.length}}function eo(e){let t=z_(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var ma=new Set(["queued","running","retry_pending","repairing"]),Ic=new Set(["failed","succeeded"]),H_={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",repairing:"\uC790\uB3D9 \uD574\uACB0 \uC911",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},Bn={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},G_={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:Bn.base_containment,child_sweep:Bn.child_sweep,branch_cleanup:Bn.branch_cleanup,parent_close:Bn.parent_close};function V_(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function K_(e,t,r){return!["verify","deploy"].includes(e.kind)||![...ma,...Ic].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(n=>n&&typeof n=="object"&&n.bead_id===t&&n.merged_sha===r)}function Y_(e,t){let r=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(r!==0)return r;let n=d=>d.state==="succeeded"?1:2,s=n(t)-n(e);if(s!==0)return s;let o=typeof e.requested_at=="number"?e.requested_at:0,a=typeof t.requested_at=="number"?t.requested_at:0;if(o!==a)return a-o;let i=typeof e.operation_id=="string"?e.operation_id:"",u=typeof t.operation_id=="string"?t.operation_id:"";return i.localeCompare(u)}function _a(e,t=!1){let r=e.kind,n=r==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",s=t?"failed":e.state,o=H_[s];if(!o)return null;let a=Js(r,`${n} ${o}`);return a?{...a,active:ma.has(s),failed:s==="failed"}:null}function Z_(e){return!e||typeof e!="object"?null:G_[e.step]||null}function Un(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,r=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},n=Z_(r),s=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,o=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),a=!o&&(e.cleanup_cursor==="repo_operations"||r.step==="repo_operations"),i=V_(e.merge_sha)?e.merge_sha:null,u=!o&&i&&Array.isArray(e.repo_operations)?e.repo_operations.filter(A=>A&&typeof A=="object"&&K_(A,t,i)).sort(Y_):[],d=a?u:[],f=d.find(A=>ma.has(A.state));if(f)return _a(f);if(s)return s.step==="repo_operations"&&u[0]?_a(u[0],!0):null;let _=d.find(A=>Ic.has(A.state)?A.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(_)return _a(_);if(n){let A=Js(n.step,n.label);return A?{...A,active:!0,failed:!1}:null}let y=typeof e.cleanup_cursor=="string"?Bn[e.cleanup_cursor]:null;if(!y)return null;let T=Js(y.step,y.label);return T?{...T,active:!0,failed:!1}:null}function to(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var Lc={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},Oc={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."};function Mc(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function ga(e){for(let t of Mc(e))if(Object.hasOwn(Lc,t))return Lc[t];return null}function ba(e){let t=null;for(let r of Mc(e))Object.hasOwn(Oc,r)&&(t=Oc[r]);return t}function ro(e){let t=ga(e),r=ba(e);return t&&r?`${t} \u2014 ${r}`:t||r?t||r:typeof e=="string"?e:""}function Pc(e,t){let r=ga(e)??ga(t),n=ba(t)??ba(e);return r&&n?`${r} \u2014 ${n}`:r||n?r||n:typeof t=="string"?t:""}var Dc=160;function X_(e){return e.length>Dc?`${e.slice(0,Dc)}\u2026`:e}function Q_(e){return!e||!e.reason?"":l`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?l` · <code>${X_(e.command)}</code>`:""}
  </div>`}function J_(e){return e?l`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function ha(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),r=Math.floor(t/60),n=t%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function Nc(e){let t=e.failure?ro(e.failure.reason):"";return l`<div class="worker-banners">
    ${e.failure?l`<div class="worker-banner worker-banner--failure" role="alert">
          ⛔ ${e.failure.repo||"repo"} 세션 실패 —
          ${t}${t&&!t.endsWith(".")?".":""}
          자동 진행을 껐습니다, 수동 ▶ 필요.
          ${e.failure.resume_attempt_id?l`<button
                type="button"
                class="worker-banner__resume"
                data-attempt-id=${e.failure.resume_attempt_id}
                ?disabled=${!e.failure.resume_eligible}
                title=${e.failure.resume_eligible?"\uCD5C\uADFC \uC2E4\uD328 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":e.failure.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}
              >
                ↻ 이어하기
              </button>`:""}
          ${e.failure.discard?.action?l`<button
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
          ${e.failure.resume_attempt_id?l`<button
                type="button"
                class="worker-banner__dismiss"
                data-attempt-id=${e.failure.resume_attempt_id}
                title="실패 알림 닫기 — 레인에는 남습니다"
                aria-label="배너 닫기"
              >
                ✕
              </button>`:""}
          ${Q_(e.failure.cause_detail)}
          ${J_(e.failure.reason)}
          ${kr({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function em(e,t,r=null){let n=e.failed===!0,s=!!e.paused,o=n?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):s?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?ha(t-e.started_at):"\u2014",a=cr(e),i=Sr(e),u=xt(e.usage),d=Xt(e.usage),f=e.conflict_resolution?s?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,_=e.base_exception||null,y=e.landing,T=e.attempt_id&&e.attempt_id===r,A=e.discard?.action?l`<button
        type="button"
        class="rtile__discard"
        data-operation-id=${e.discard.operation?.operation_id||""}
        ?disabled=${!e.discard.enabled}
        title=${e.discard.title}
        aria-label=${e.discard.label}
      >
        ${e.discard.label}
      </button>`:"";return l`<div
    class="rtile${T?" rtile--sel":""}${s?" rtile--paused":""}${n?" rtile--failed":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span class="rtile__dot" aria-hidden="true"></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${i?l`<span class="rtile__resumed" title=${i}>↻</span>`:""}
      <span class="rtile__elapsed">${o}</span>
      ${n?l`<button
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
            </button>`:l`<button
              type="button"
              class="rtile__session"
              title="라이브 세션 열기"
              aria-label="라이브 세션 열기"
            >
              ▤ 세션
            </button>
            ${s?l`<button
                  type="button"
                  class="rtile__resume"
                  title="같은 세션으로 이어서 재개"
                  aria-label="재개"
                >
                  ▶
                </button>`:l`<button
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
    ${e.current_child?l`<div class="rtile__child" title="현재 진행중 child">
          └ ${e.current_child}
        </div>`:""}
    ${y?l`<div class="rtile__landing">
          <span
            class="merge-step${y.failed?" merge-step--failed":""}"
            style=${`--progress: ${y.percent}%`}
            >${y.label}${y.index>0?l`<span class="merge-step__n"
                  >${y.index}/${y.total}</span
                >`:""}</span
          >
        </div>`:""}
    ${a||u.length>0||d||f||_?l`<div class="rtile__meta">
          ${f?l`<span class="worker-mini__badge">${f}</span>`:""}
          ${_?l`<span
                class="worker-mini__badge"
                title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                >${_}</span
              >`:""}
          ${a?l`<span class="rtile__runner">${a}</span>`:""}
          ${u.length>0?u.map(R=>l`<span class="worker-usage" title=${R.tooltip}
                    >${R.label}</span
                  >`):d?l`<span
                  class="worker-usage"
                  title=${an(e.usage)}
                  >${d}</span
                >`:""}
        </div>`:""}
    ${dn(e)} ${kr(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${n||s?"":l`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function ya(e,t=Date.now(),r=null){let n=Array.isArray(e)?e:[];return l`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?l`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>em(s,t,r))}
  </div>`}function Gr(e){return l`<svg
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
  </svg>`}function va(){return Gr($r`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function wa(){return Gr($r`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function qc(){return Gr($r`<rect x="4.3" y="4.3" width="7.4" height="7.4" rx="1.2" />`)}function Fc(){return Gr($r`<path d="M4.4 4.4 11.6 11.6M11.6 4.4 4.4 11.6" />`)}function jc(){return Gr($r`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function Bc(){return Gr($r`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function Uc(){return Gr($r`<path d="M3 3.6 8.2 8 3 12.4z" />
    <path d="M8.8 3.6 14 8l-5.2 4.4z" />`)}var Wn=1,tm=6e4,rm={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"},nm=new Set(["auto_merge","merged","merge","done"]),Wc={running:3,paused:2,failed:1};function sm(e,t){let r=null,n=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=n&&(n=o,r=s)}return r}function om(e,t){let r=Object.values(e||{}),n=new Set,s=new Map;for(let a of r)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&n.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of r){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let i=null;if(a.status==="running")i="running";else if(a.status==="paused"&&!n.has(a.attempt_id))i="paused";else if(a.status==="failed"||a.status==="orphaned"){let _=t.get(a.bead_id),y=typeof _=="number"&&_>0&&typeof a.finished_at=="number"&&_>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!y&&typeof a.dismissed_at!="number"&&(i="failed")}if(!i)continue;let u=typeof a.started_at=="number"?a.started_at:null,d=o.get(a.bead_id);if(d){let _=Wc[d.run_state],y=Wc[i];if(_>y||_===y&&(d.started_at??0)>(u??0))continue}let f=typeof a.session_id=="string"&&a.session_id.length>0;o.set(a.bead_id,{attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",run_state:i,started_at:u,last_event_at:typeof a.last_event_at=="number"?a.last_event_at:null,runner:typeof a.runner=="string"?a.runner:null,model:typeof a.model=="string"?a.model:null,effort:typeof a.effort=="string"?a.effort:null,speed:typeof a.speed=="string"?a.speed:null,resumed_from:typeof a.resumed_from=="string"?a.resumed_from:null,continuation_mode:a.continuation_mode==="session"||a.continuation_mode==="fresh"?a.continuation_mode:null,usage:Wt(e,a.bead_id),can_pause:i==="running"&&f,can_resume:i!=="running"&&f&&!n.has(a.attempt_id)})}return o}function zc(e,t){let r=e[t];if(!r)return"";if(r.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let n=typeof r.reason=="string"?r.reason:"",s=n.indexOf(":");return s>0&&s<n.length-1?`\u26D4 ${n.slice(0,s)} (${n.slice(s+1)})`:`\u26D4 ${n}`}function At(e){return e&&typeof e=="object"?e:{}}function ka(e,t,r){let n=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=r&&typeof r.done_since=="number"?r.done_since:void 0,a=new Map;for(let b of s)b&&typeof b.root_dir=="string"&&a.set(b.root_dir,b);let i=[],u=[],d=[],f=[],_=[],y=[],T=new Map,A=new Map,R=new Map;for(let b of n){if(!b||typeof b.root_dir!="string")continue;let C=b.root_dir,z=b.name||C,re=a.get(C),L=re&&typeof re.revision=="number"?re.revision:typeof b.revision=="number"?b.revision:0,M=At(b.attempts),ue=At(b.bead_titles),fe=At(b.pr_observations),de=At(b.admission),Be=At(b.revise_parked),Qe=At(b.merge_queue_state),Ve=At(b.cleanup_failed),Me=At(b.discard_operations),Ue=At(b.bead_blocked_by),le=At(b.pr_activity),Ae=Array.isArray(b.repo_operations)?b.repo_operations:[],Ie=Array.isArray(b.merge_queue)?b.merge_queue:[],Ee=new Set(Ie.filter(G=>G&&typeof G.bead_id=="string").map(G=>G.bead_id)),he=new Map(Ie.filter(G=>G&&typeof G.bead_id=="string").map(G=>[G.bead_id,G])),We=Array.isArray(b.queue)?b.queue:[],et=(Array.isArray(b.serial_lanes)?b.serial_lanes:[]).filter(G=>G&&/^s[1-5]$/.test(G.id)&&Array.isArray(G.entries)),Te=At(b.lane_states),tt=typeof b.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(b.serial_lane_count))):Math.min(5,et.length);R.set(C,tt);let K=new Map(et.map(G=>[G.id,G])),q=new Map;for(let G of et)for(let te of G.entries)te&&typeof te.bead_id=="string"&&q.set(te.bead_id,G.id);let ne=Array.isArray(b.done)?b.done:[];for(let G of ne)G&&typeof G.bead_id=="string"&&y.push({id:G.bead_id,root_dir:C,workspace_name:z});let Oe=new Map;for(let G of ne)G&&typeof G.bead_id=="string"&&typeof G.added_at=="number"&&Oe.set(G.bead_id,G.added_at);let Fe=G=>({id:G,title:ue[G]||G,root_dir:C,workspace_name:z,expected_revision:L,draggable:!1}),ze=new Set;for(let[G,te]of om(M,Oe))ze.add(G),u.push({...Fe(G),lane:"running",...q.has(G)?{serial_lane_id:q.get(G)}:{},attempt_id:te.attempt_id,run_state:te.run_state,can_pause:te.can_pause,can_resume:te.can_resume,started_at:te.started_at,last_event_at:te.last_event_at,runner:te.runner,model:te.model,effort:te.effort,speed:te.speed,resumed_from:te.resumed_from,continuation_mode:te.continuation_mode,usage:te.usage,discard:pr(Me,G,{attempt_id:te.attempt_id}),badges:te.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:te.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:te.run_state==="failed"});for(let G of Array.isArray(b.pr_wait)?b.pr_wait:[]){let te=G&&G.bead_id;if(typeof te!="string"||ze.has(te))continue;ze.add(te);let De=At(fe[te]),rt=At(De.pr),pe=De.gate?At(De.gate):null,h=Ee.has(te),$=he.get(te)?.continuation_action||null,k=!!$&&$.continuation===null,O=Qe.active===te,V=G.external===!0,X=Ve[te]||null,se=At(le[te]),ce=Un({bead_id:te,merge_sha:G.merge_sha,cleanup_cursor:G.cleanup_cursor,merge_progress:se.merge_progress||null,cleanup_failed:X,repo_operations:Ae}),je=to(ce),be=!!pe&&pe.base_badge==="\uCDA9\uB3CC",Se=!!X&&["child_sweep","branch_cleanup","parent_close"].includes(X.step)&&!!pe&&pe.tier==="merged",ye=V&&!!X&&!!pe&&pe.tier==="merged",st=!!pe&&["closed_unmerged","review","undecidable"].includes(pe.tier),ot=pr(Me,te,{external:V,merge_active:O||ce?.step==="merge",merge_queued:h,cleanup_active:je,merged:!!X||pe?.tier==="merged"}),F=!!ot.operation;d.push({...Fe(te),lane:"pr_wait",pr_number:typeof rt.number=="number"?rt.number:null,pr_url:typeof rt.url=="string"?rt.url:void 0,external:V,usage:Wt(M,te),merge_step:ce,badges:k?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:ce?[pe?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:X?[Hr(X.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Hr(X.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof pe?.gate_badge=="string"&&pe.gate_badge.length>0?[pe.gate_badge]:[],alert:ce?ce.failed===!0:!!X||st,reason:X&&ce?.active!==!0?eo(X.step):"PR \uB300\uAE30",merge_action:pe?.tier==="merged"&&!Se&&!ye?!1:!h||k,merge_enabled:!F&&(k||pe?.enabled===!0||be||Se||ye),merge_label:k?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":ye||Se?"\uC815\uB9AC \uC7AC\uAC1C":be&&!Se?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:k?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":F?ot.error?`\uD3D0\uAE30 \uC2E4\uD328: ${ot.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${ot.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:ye?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Se?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":be?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":pe?.enabled===!0?`\uBA38\uC9C0 (${pe.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${pe?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:h&&!k,cancel_enabled:!O,continuation_mismatch:$?.mismatch||null,discard:ot,discard_action:ot.action,discard_enabled:ot.enabled,discard_title:ot.title})}let Ce=(G,te,De,rt)=>{let pe=G&&G.bead_id;if(typeof pe!="string"||ze.has(pe))return null;ze.add(pe);let h=Be[pe],$=pr(Me,pe),k=$.operation?$:null,O={...Fe(pe),lane:te,draggable:!k,discard:k||void 0,reason:zc(de,pe),queue_position:De+1,queue_index:De,queue_length:rt,badges:h?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!h,revise_action:!!h,revise_enabled:!!h&&!k,revise_title:h?h.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${h.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};return Object.hasOwn(Ue,pe)&&(O.blocked_by=Array.isArray(Ue[pe])?Ue[pe].filter(V=>typeof V=="string"&&V.length>0):[]),O};for(let G=0;G<We.length;G++){let te=Ce(We[G],"queue",G,We.length);if(!te)continue;f.push(te);let De=T.get(C);De?De.push(te):T.set(C,[te])}let ct=[];for(let G=0;G<et.length;G++){let te=et[G],De=[];for(let pe=0;pe<te.entries.length;pe++){let h=Ce(te.entries[pe],te.id,pe,te.entries.length);h&&(De.push(h),f.push(h))}if(De.length===0)continue;let rt=At(Te[te.id]);ct.push({id:te.id,index:G,items:De,occupied_by:Array.isArray(rt.occupied_by)?rt.occupied_by.filter(pe=>typeof pe=="string"):[],corrections:Array.isArray(rt.corrections)?rt.corrections.length:0,cycle:rt.cycle===!0})}A.set(C,ct);let Ye=Array.from({length:tt},(G,te)=>{let De=`s${te+1}`,rt=K.get(De),pe=rt&&Array.isArray(rt.entries)?rt.entries:[],h=At(Te[De]);return{id:De,index:pe.length,length:pe.length,occupied_by:Array.isArray(h.occupied_by)?h.occupied_by.filter($=>typeof $=="string"):[]}});for(let G of Array.isArray(b.runnable)?b.runnable:[]){let te=G&&G.bead_id;typeof te!="string"||ze.has(te)||(ze.add(te),i.push({...Fe(te),title:G.title||ue[te]||te,lane:"runnable",draggable:!0,reason:zc(de,te),created_at:G.created_at??void 0,updated_at:G.updated_at??void 0,labels:Array.isArray(G.labels)?G.labels:[],spec_reviewer:typeof G.spec_reviewer=="string"?G.spec_reviewer:void 0,plan_state:G.plan_state==="approved"||G.plan_state==="authored"?G.plan_state:"none",workflow:G.route?{route:G.route,chips:{route:G.route}}:null,blocked:G.blocked===!0,...Array.isArray(G.blocked_by)?{blocked_by:G.blocked_by.filter(De=>typeof De=="string"&&De.length>0)}:{},place_index:We.length,place_lanes:Ye}))}for(let G of ne){let te=G&&G.bead_id;if(typeof te!="string"||ze.has(te)||(ze.add(te),o!==void 0&&typeof G.added_at=="number"&&G.added_at<o))continue;let De=sm(M,te);_.push({...Fe(te),lane:"done",done:!0,usage:Wt(M,te),done_at:typeof G.added_at=="number"?G.added_at:void 0,done_kind:De&&typeof De.done_kind=="string"?De.done_kind:null})}}let N=new Map;s.forEach((b,C)=>{b&&typeof b.root_dir=="string"&&N.set(b.root_dir,C)});let Y=r&&r.running_sort==="repo"?"repo":"started";u.sort((b,C)=>{if(Y==="repo"){let L=N.get(b.root_dir)??Number.MAX_SAFE_INTEGER,M=N.get(C.root_dir)??Number.MAX_SAFE_INTEGER;if(L!==M)return L-M}let z=typeof b.started_at=="number"&&Number.isFinite(b.started_at)?b.started_at:null,re=typeof C.started_at=="number"&&Number.isFinite(C.started_at)?C.started_at:null;return z!==null&&re!==null&&z!==re?z-re:z===null&&re!==null?1:z!==null&&re===null?-1:b.id.localeCompare(C.id)}),_.sort((b,C)=>(C.done_at??0)-(b.done_at??0));let Z=s.length>0?s:n.map(b=>({root_dir:b&&b.root_dir,name:b&&b.name,auto_advance:b&&b.auto_advance,auto_merge:b&&b.auto_merge,slots:b&&b.slots,revision:b&&b.revision,runner_catalog:b&&b.runner_catalog})),B=[];for(let b of Z){if(!b||typeof b.root_dir!="string")continue;let C=T.get(b.root_dir)||[],z=A.get(b.root_dir)||[];B.push({root_dir:b.root_dir,name:b.name||b.root_dir,auto_advance:b.auto_advance===!0,auto_merge:b.auto_merge===!0,slots:typeof b.slots=="number"&&b.slots>=Wn?b.slots:Wn,revision:typeof b.revision=="number"?b.revision:0,runner_catalog:At(b.runner_catalog),items:C,sublanes:{parallel:C,serial:z},serial_lane_count:R.get(b.root_dir)||0})}let U={runnable:i,queue:f,queue_groups:B,running:u,pr_wait:d,done:_,automation:{total:B.length,both_on:B.filter(b=>b.auto_advance&&b.auto_merge).length}},I=fa(U);for(let b of y)I.has(b.id)||I.set(b.id,{root_dir:b.root_dir,workspace_name:b.workspace_name,lane:"done",state:"done"});for(let b of[...U.queue,...U.runnable]){if(!Object.hasOwn(b,"blocked_by"))continue;let C=I.get(b.id);b.blockers=(b.blocked_by||[]).map(z=>Ac(z,C,I,s)),b.blocker_warnings=b.blockers.filter(z=>z.missing_internal).map(z=>`\u26A0 \uC120\uD589 ${z.id}\uAC00 \uC5B4\uB290 \uB808\uC778\uC5D0\uB3C4 \uC5C6\uACE0 \uC2E4\uD589 \uC911\uB3C4 \uC544\uB2D8 \u2014 \uC218\uB3D9 \uAC1C\uC785 \uC804\uAE4C\uC9C0 \uC774 \uC790\uB9AC\uC5D0\uC11C \uC815\uC9C0`),b.blocker_warnings.length>0&&(b.alert=!0)}let W=Sc(U.queue_groups);for(let b of U.queue_groups)for(let C of b.sublanes.serial){let z=W.get(Tc(b.root_dir,C.id));z&&(C.cross_wait_peers=z)}return U}function am(e,t){if(typeof e!="number"||!Number.isFinite(e))return"";let n=t-e<tm;return l`<span
    class="mon-beat${n?" mon-beat--live":""}"
    title=${`\uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${kt(e)}`}
    ><span class="mon-beat__dot" aria-hidden="true"></span>${n?"":l`<span class="mon-beat__age"
          >${qt(e,t)}</span
        >`}</span
  >`}function zn(e){return l`<div class="mon-c__title">${e.title}</div>`}function Hn(e){return l`<span class="mon-c__id" title="클릭하면 상세로 이동"
    >${e.id}</span
  >`}function no(e){return e.workspace_name?l`<span class="mon-c__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:""}function $a(e){let t=xt(e.usage),r=Xt(e.usage);return t.length>0?t.map(n=>l`<span class="mon-c__usage" title=${n.tooltip}
          >${n.label}</span
        >`):r?l`<span class="mon-c__usage" title=${an(e.usage)}
        >${r}</span
      >`:""}function xa(e){return(Array.isArray(e.badges)?e.badges:[]).map(r=>l`<span class="mon-c__badge${e.alert?" mon-c__badge--alert":""}"
        >${r}</span
      >`)}function im(e){return l`<span class="mon-c__ops">
    ${e.run_state==="running"?l`<button
          type="button"
          class="mon-op mon-op--pause"
          ?disabled=${e.can_pause===!1}
          aria-label="일시정지"
          title="일시정지 — 세션을 끊고 이어하기 가능 상태로 둡니다"
        >
          ${wa()}
        </button>`:l`<button
          type="button"
          class="mon-op mon-op--resume"
          ?disabled=${e.can_resume===!1}
          aria-label="이어하기"
          title="이어하기"
        >
          ${va()}
        </button>`}
    ${e.discard?.action?l`<button
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
    ${e.run_state==="failed"?l`<button
          type="button"
          class="mon-op mon-op--dismiss"
          aria-label="실패 기록 닫기"
          title="실패 기록 닫기"
        >
          ${Fc()}
        </button>`:""}
  </span>`}function Hc(e){if(!Object.hasOwn(e,"blocked_by"))return"";let t=Array.isArray(e.blockers)?e.blockers:[];return t.length===0?e.blocked?l`<span class="mon-blocker">🔒 blocked</span>`:"":t.map(r=>l`<span
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
      </span>`)}function Gc(e){let t=Array.isArray(e.blocker_warnings)?e.blocker_warnings:[];return t.length>0?l`<div class="mon-blocker-warnings">
        ${t.map(r=>l`<div class="mon-blocker-warning">${r}</div>`)}
      </div>`:""}function Vc(){return l`<span class="mon-link mon-popover-owner">
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
  </span>`}function lm(e,t){let r=typeof e.started_at=="number"?ha(t-e.started_at):"";return l`${zn(e)}
    <div class="mon-c__meta">
      ${xa(e)}${am(e.last_event_at,t)}${Hn(e)}${no(e)}
      ${cr(e)?l`<span class="mon-c__model">${cr(e)}</span>`:""}
      ${Sr(e)?l`<span
            class="rtile__resumed"
            title=${Sr(e)}
            >↻</span
          >`:""}
      ${e.serial_lane_id?l`<span class="mon-c__lane">${e.serial_lane_id}</span>`:""}
      ${r?l`<span class="mon-live__elapsed">${r}</span>`:""}
      ${$a(e)}${im(e)}${kr(e)}
    </div>`}function cm(e){let t=e.workflow,n=(t&&t.chips||{}).route||t&&t.route,s=typeof e.spec_reviewer=="string"?e.spec_reviewer:"",o=e.plan_state==="approved"?"plan \u2713":e.plan_state==="authored"?"plan \u270E":"plan \u2013",a=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),i=qt(e.updated_at);return l`${zn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>${Hn(e)}
      ${n?l`<span class="ctl-chip ctl-chip--route">${n}</span>`:""}
      ${s?l`<span
            class="ctl-chip mon-c__review${s==="skipped"?" mon-c__review--dim":""}"
            >spec:${s}</span
          >`:""}
      ${n==="full_plan"?l`<span
            class="ctl-chip mon-c__plan${e.plan_state==="none"?" mon-c__review--dim":""}"
            >${o}</span
          >`:""}
      ${bs(e.labels,null).map(u=>l`<span class="ctl-chip ctl-chip--label">${u}</span>`)}
      ${no(e)}
      ${i?l`<span title=${`\uC218\uC815 ${kt(e.updated_at)}`}
            >수정 ${i}</span
          >`:""}
      ${e.reason?l`<span
            class="mon-c__reason${a?" mon-c__reason--danger":""}"
            >${e.reason}</span
          >`:""}
      ${Hc(e)}
      <span class="mon-c__ops">
        ${Vc()}
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
            ${(e.place_lanes||[]).map(u=>l`<button
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
    ${Gc(e)}`}function um(e){let t=!!e.discard?.operation;return l`${zn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>
      <span class="mon-live__pos">#${e.queue_position}</span>${Hn(e)}
      ${xa(e)}
      ${e.reason?l`<span class="mon-c__reason">${e.reason}</span>`:""}
      ${Hc(e)}
      <span class="mon-c__ops">
        ${Vc()}
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
        ${t?l`<button
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
    ${Gc(e)} ${kr(e)}
    ${e.revise_action?l`<div class="mon-c__tail">
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
        </div>`:""}`}function dm(e){let t=e.merge_step||null,r=!!(Xt(e.usage)||t||e.merge_action||e.cancel_action||e.discard_action);return l`${zn(e)}
    <div class="mon-c__meta">
      ${Hn(e)}${no(e)}
      ${e.pr_url&&e.pr_number?l`<a
            class="mon-c__pr"
            href=${e.pr_url}
            target="_blank"
            rel="noreferrer noopener"
            title="PR 열기"
            >#${e.pr_number} ↗</a
          >`:""}
      ${xa(e)}
      ${e.reason?l`<span class="mon-c__reason">${e.reason}</span>`:""}
    </div>
    ${r?l`<div class="mon-c__tail">
          ${$a(e)}${t?l`<span
                class="merge-step${t.failed?" merge-step--failed":""}"
                style=${`--progress: ${t.percent}%`}
                >${t.label}${t.index>0?l`<span class="merge-step__n"
                      >${t.index}/${t.total}</span
                    >`:""}</span
              >`:""}
          ${e.merge_action?l`<button
                type="button"
                class="worker-mini__merge"
                data-bead-id=${e.id}
                ?disabled=${e.merge_enabled===!1}
                title=${e.merge_title||""}
              >
                ${e.merge_label||"\uBA38\uC9C0"}
              </button>`:""}
          ${e.cancel_action?l`<button
                type="button"
                class="worker-mini__merge-cancel"
                data-bead-id=${e.id}
                ?disabled=${e.cancel_enabled===!1}
                title=${e.cancel_title||""}
              >
                취소
              </button>`:""}
          ${e.discard_action?l`<button
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
          ${kr(e)}
        </div>`:""}`}function pm(e,t){let r=e.done_kind||"",n=r?rm[r]||r:"",s=qt(e.done_at,t);return l`${zn(e)}
    <div class="mon-c__meta">
      ${Hn(e)}${no(e)}
      ${n?l`<span
            class="mon-live__kind${nm.has(r)?" mon-live__kind--ok":" mon-live__kind--warn"}"
            >${n}</span
          >`:""}
      ${$a(e)}
      ${s?l`<span title=${`\uC644\uB8CC ${kt(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
    </div>`}function Kc(e,t){return e.lane==="running"?lm(e,t):e.lane==="runnable"?cm(e):e.lane==="queue"||/^s[1-5]$/.test(e.lane)?um(e):e.lane==="pr_wait"?dm(e):pm(e,t)}function Yc(e){let t=String(e.revision),r=e.sublanes?e.sublanes.parallel.length+e.sublanes.serial.reduce((n,s)=>n+s.items.length,0):e.items.length;return l`<header
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
        ${e.auto_advance?wa():va()}
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
        ${jc()}
        <span class="mon-ctl__label">머지</span>
      </button>
      <label class="mon-ctl mon-ctl--slots" title="동시에 실행할 세션 수">
        ${Bc()}
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
  </header>`}function Zc(e){let{total:t,both_on:r}=e.automation,n=t>0&&r===t,s=e.running_sort==="repo"?"repo":"started",o=lr.find(i=>i.value===e.done_range)?.label||"",a=Array.isArray(e.token_total)?e.token_total:e.token_total?[{label:e.token_total,tooltip:e.token_tooltip}]:[];return l`<div class="mon-top">
    <button
      type="button"
      class="mon-auto-all${n?" is-active":""}"
      data-on=${n?"false":"true"}
      aria-pressed=${n?"true":"false"}
      ?disabled=${t===0}
      title=${n?"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4 (\uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4)":"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
    >
      ${n?qc():Uc()}
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
        ${lr.map(i=>l`<option
              value=${i.value}
              ?selected=${e.done_range===i.value}
            >
              ${i.label}
            </option>`)}
      </select>
      ${a.map(i=>l`<span
            class="mon-kpi__chip mon-kpi__chip--tokens"
            title=${i.tooltip}
            >${o} 완료 · 누적 ${i.label}</span
          >`)}
    </div>
  </div>`}function Xc(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function Qc(e){let t=(Array.isArray(e)?e:[]).map(i=>i&&i.usage).filter(i=>i&&typeof i=="object"&&"providers"in i);if(t.length>0)return xt(xs(t));let r={};for(let i of gr)r[i]=0;let n=!1,s=0,o=0,a=0;for(let i of Array.isArray(e)?e:[]){let u=i&&i.usage;if(u&&typeof u=="object"){let d=!1;for(let f of gr){let _=u[f];typeof _=="number"&&Number.isFinite(_)&&(r[f]+=_,n=!0,d=!0)}if(d){o+=1;let f=u.total_cost_usd;typeof f=="number"&&Number.isFinite(f)&&(s+=f,a+=1)}}}return o>0&&a===o&&(r.total_cost_usd=s),n?Xt(r):null}var Jc="bdui.monitor.done-range",eu="bdui.monitor.running_sort",tu="beads-ui.monitor.candidate-filter",Aa={show_blocked:!1};function fm(){try{let e=window.localStorage.getItem(tu);if(!e)return{...Aa};let t=JSON.parse(e);return!t||typeof t!="object"?{...Aa}:{show_blocked:t.show_blocked===!0}}catch{return{...Aa}}}function _m(e){try{window.localStorage.setItem(tu,JSON.stringify({show_blocked:e.show_blocked}))}catch{}}function mm(e,t){if(t.show_blocked)return{visible:e,hidden_blocked:0};let r=e.filter(n=>n.blocked!==!0);return{visible:r,hidden_blocked:e.length-r.length}}function gm(){try{let e=window.localStorage.getItem(Jc);return Ut(e)?e:Nt}catch{return Nt}}function bm(e){try{window.localStorage.setItem(Jc,e)}catch{}}function hm(){try{return window.localStorage.getItem(eu)==="repo"?"repo":"started"}catch{return"started"}}function ym(e){try{window.localStorage.setItem(eu,e)}catch{}}var ru="tab:monitor:pipeline",vm=1e3,wm=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}];function so(e,t){let r=(e.lane==="runnable"||e.lane==="queue")&&e.draggable!==!1;return l`<div
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
    ${Kc(e,t)}
  </div>`}function km(e,t){let r=e.serial_lane_count>0||e.sublanes.serial.length>0,n=r?l`<section class="mon-sublane mon-sublane--parallel">
        <header class="mon-sublane__hd">
          <span class="mon-sublane__name">병렬</span>
          <span class="mon-sublane__count"
            >대기 ${e.sublanes.parallel.length}</span
          >
        </header>
        <div class="mon-group__list">
          ${e.sublanes.parallel.map(s=>so(s,t))}
        </div>
      </section>`:l`<div class="mon-group__list">
        ${e.items.map(s=>so(s,t))}
      </div>`;return l`<div class="mon-group" data-root-dir=${e.root_dir}>
    ${Yc(e)} ${n}
    ${r?e.sublanes.serial.map(s=>l`<section
              class="mon-sublane mon-sublane--serial"
              data-serial-lane=${s.id}
            >
              <header class="mon-sublane__hd">
                <span class="mon-sublane__name">${s.id}</span>
                <span class="mon-sublane__count"
                  >대기 ${s.items.length}</span
                >
                ${s.occupied_by.length>0?l`<span class="mon-sublane__held"
                      >${`\u25CF \uC810\uC720 \uC911 \xB7 ${s.occupied_by.join(", ")} (\uBA38\uC9C0\uAE4C\uC9C0 \uC720\uC9C0)`}</span
                    >`:""}
                ${s.corrections>0?l`<span class="mon-sublane__corrections"
                      >순서 자동 교정 ${s.corrections}건</span
                    >`:""}
                ${s.cross_wait_peers?.map(o=>l`<span class="mon-sublane__cross-wait"
                      >⚠ 상호 정지 — ${o.workspace_name}·${o.lane}과 교차
                      대기</span
                    >`)}
              </header>
              ${s.cycle?l`<div class="mon-sublane__cycle">
                    ⛔ 의존 사이클 — 자동 교정 불가
                  </div>`:""}
              <div class="mon-group__list">
                ${s.items.map(o=>so(o,t))}
              </div>
            </section>`):""}
  </div>`}function nu(e,t){let r=ft("views:monitor"),n=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,i=t.switchWorkspace,u=t.now||(()=>Date.now()),d=t.confirm||(h=>typeof globalThis.confirm!="function"||globalThis.confirm(h)),f=gm(),_=hm(),y=fm();function T(){let h=lr.find($=>$.value===f);return h?h.label:""}let A=document.createElement("div");A.className="mon",e.appendChild(A);let R=ka(null,null),N=new Map,Y=null,Z=null;async function B(h,$,k,O,V=!0){if(!o||!k)return null;let X=await o(h,{...$,root_dir:k,expected_revision:O});if(X&&X.conflict&&V){X.queue&&N.set(k,X.queue);let se=X.queue&&typeof X.queue.revision=="number"?X.queue.revision:O;X=await o(h,{...$,root_dir:k,expected_revision:se})}return X&&X.queue&&k&&N.set(k,X.queue),X}function U(h,$){let k=N.get(h),O=s&&s.get?s.get():null,V=(Array.isArray(O)?O:[]).find(se=>se?.root_dir===h);return(k||V)?.merge_queue?.find(se=>se.bead_id===$)?.continuation_action}async function I(h,$,k,O){let V=await B(h,$,k,O),X=N.get(k)?.revision??V?.queue?.revision??O;return mr(V,(se,ce)=>B(h,{...$,continuation:se,decision_token:ce},k,X,!1),{refresh:se=>B(h,$,k,se?.queue?.revision??N.get(k)?.revision??X,!1)})}async function W(h,$,k,O){let V=await mr({continuation_mismatch:O},(se,ce)=>B("worker-merge-queue-add",{bead_id:$,continuation:se,decision_token:ce},h,k,!1)),X=V?.queue?.merge_queue?.find(se=>se.bead_id===$)?.continuation_action;V?.applied!==!0&&X?.continuation===null&&X.mismatch&&await W(h,$,V.queue.revision,X.mismatch)}async function b(h,$,k){let O=await B("worker-discard",h,$,k);if(O&&O.discarded===!0){oe(Qs(O),"success",5e3);return}if(O&&O.reason){oe(`\uD3D0\uAE30 \uC2E4\uD328: ${O.reason}`,"error");return}if(O&&O.accepted&&O.pending==="merged_revert"){oe("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(O&&O.accepted){oe(`\uD3D0\uAE30 \uC9C4\uD589: ${O.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}O&&!O.conflict&&oe("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function C(h,$,k){return!o||!k?null:await o(h,{...$,root_dir:k})}async function z(h){if(!o||!h&&!d("\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB055\uB2C8\uB2E4. \uAC01 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uD568\uAED8 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?"))return;let $=await o("monitor-auto-toggle",{on:h}),k=$&&Array.isArray($.failed)?$.failed:[];k.length>0&&oe(`\uC790\uB3D9\uD654 ${h?"\uCF1C\uAE30":"\uB044\uAE30"} \uC77C\uBD80 \uC2E4\uD328: ${k.map(O=>O.root_dir).join(", ")}`,"error",3200)}async function re(){let h=new Map;for(let $ of R.pr_wait)h.has($.root_dir)||h.set($.root_dir,$.expected_revision);for(let[$,k]of h)await B("worker-merge-queue-add-all",{},$,k)}let L=null,M=!1,ue=null;function fe(){ue!==null&&clearTimeout(ue),ue=setTimeout(()=>{ue=null,M=!1},0)}function de(h){let $=h.target;return typeof $?.closest=="function"?$.closest(".mon-group"):null}function Be(h){let $=de(h);return!$||!L?null:($.getAttribute("data-root-dir")||"")===L.root_dir?$:null}function Qe(){for(let h of Array.from(A.querySelectorAll(".mon-group--drag-over")))h.classList.remove("mon-group--drag-over")}function Ve(h){let $=h.target,k=typeof $?.closest=="function"?$.closest('.mon-card[draggable="true"]'):null;if(k){L={bead_id:k.getAttribute("data-issue-id")||"",lane:k.getAttribute("data-lane")||"",root_dir:k.getAttribute("data-root-dir")||"",revision:Number(k.getAttribute("data-revision")||0)||0,queue_index:Number(k.getAttribute("data-queue-index")),queue_length:Number(k.getAttribute("data-queue-length")),place_index:Number(k.getAttribute("data-place-index"))},M=!0;try{h.dataTransfer?.setData("text/plain",L.bead_id),h.dataTransfer&&(h.dataTransfer.effectAllowed="move")}catch{}}}function Me(h){let $=Be(h);$&&(h.preventDefault(),h.dataTransfer&&(h.dataTransfer.dropEffect="move"),$.classList.add("mon-group--drag-over"))}function Ue(h){de(h)?.classList.remove("mon-group--drag-over")}function le(){L=null,Qe(),fe()}function Ae(h){let $=Be(h),k=L;if(L=null,Qe(),!$||!k||!k.bead_id)return;h.preventDefault();let O=h.target,V=typeof O?.closest=="function"?O.closest('.mon-card[data-lane="queue"]'):null,X=V&&$.contains(V)?Number(V.getAttribute("data-queue-index")):NaN;if(k.lane==="runnable"){let je=Number.isFinite(X)?X:k.place_index;if(!Number.isFinite(je))return;B("worker-queue-place",{bead_id:k.bead_id,index:je},k.root_dir,k.revision);return}if(k.lane!=="queue"||V&&V.getAttribute("data-issue-id")===k.bead_id)return;let se=k.queue_index,ce=Number.isFinite(X)?se>X?X:X-1:k.queue_length-1;!Number.isFinite(ce)||ce<0||ce===se||B("worker-queue-reorder",{bead_id:k.bead_id,to_index:ce},k.root_dir,k.revision)}function Ie(h){let $=mm(R.runnable,y),k={runnable:$.visible,queue:R.queue,running:R.running,pr_wait:R.pr_wait,done:R.done};return l`${Zc({automation:R.automation,counts:{running:R.running.length,queue:R.queue.length,pr_wait:R.pr_wait.length},running_sort:_,done_range:f,token_total:Qc(R.done),token_tooltip:Xc(T())})}
      <div class="worker-lanes mon-lanes">
        ${wm.map(O=>{let V=k[O.lane],X=O.lane==="queue"?R.queue_groups.length>0?l`${R.queue_groups.map(se=>km(se,h))}`:void 0:V.length>0?l`${V.map(se=>so(se,h))}`:void 0;return tr({id:`monitor-${O.lane}`,lane:O.pane,title:O.lane==="done"?`\uC644\uB8CC\xB7${T()}`:O.title,items:V,empty:O.empty,body:X,live:O.lane==="running"&&V.length>0,header_control:O.lane==="runnable"?l`<span class="mon-candidate-filter">
                    <label
                      class="worker-filter__tgl"
                      title="blocked 이슈 표시 (기본 숨김)"
                    >
                      <input
                        type="checkbox"
                        class="mon-filter__blocked"
                        .checked=${y.show_blocked}
                      />
                      🔒 blocked
                    </label>
                    ${$.hidden_blocked>0?l`<span class="worker-filter__hidden"
                          >숨김 ${$.hidden_blocked}건</span
                        >`:""}
                  </span>`:O.lane==="pr_wait"&&V.length>0?l`<button
                      type="button"
                      class="mon-lane-op mon-merge-all"
                      title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
                    >
                      일괄 머지
                    </button>`:""})})}
      </div>`}function Ee(){let h=s&&s.get?s.get():null,$=s&&s.getWorkspacesState?s.getWorkspacesState():[],k=u();R=ka(h,$,{done_since:Nr(f,k),running_sort:_}),He(Ie(k),A)}function he(h,$){let k=a?a():void 0;if(!$||!k||$===k||!i){n(h);return}i($).then(()=>{n(h)}).catch(O=>{r("workspace switch for %s failed: %o",$,O)})}function We(h){return{root_dir:h.getAttribute("data-root-dir")||"",revision:Number(h.getAttribute("data-revision")||0)||0}}function et(h){if(typeof h=="string"&&h.length>0)return h;if(h&&typeof h=="object"){let $=h;if(typeof $.message=="string"&&$.message.length>0)return $.message;if(typeof $.error=="string"&&$.error.length>0)return $.error;if($.error&&typeof $.error=="object"&&typeof $.error.message=="string")return $.error.message}return"\uC5F0\uACB0\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}function Te(h,$){let k=h.querySelector(".mon-link__trigger"),O=h.querySelector(".mon-link__popover"),V=h.querySelector(".mon-link__error");!k||!O||!V||(Oe(),O.hidden=!1,k.setAttribute("aria-expanded","true"),V.textContent=$,V.hidden=!1)}async function tt(h,$,k){let O=$.getAttribute("data-root-dir")||"",V=$.getAttribute("data-issue-id")||"";if(!(!V||!k||k===V))try{await C(h,{a:V,b:k},O),Oe()}catch(X){Te($,et(X))}}function K(h,$){let{root_dir:k,revision:O}=We(h),V=h.getAttribute("data-issue-id")||"",X=$.dataset.attemptId||h.getAttribute("data-attempt-id")||"",se=$.classList;if(se.contains("mon-link__trigger")){ze($);return}if(se.contains("mon-link__candidate")||se.contains("mon-link__direct")){let ce=$.dataset.targetId||"";tt("dep-add",h,ce);return}if(se.contains("mon-blocker__remove")){let ce=$.dataset.blockerId||"";tt("dep-remove",h,ce);return}if(se.contains("mon-place__choice")){let ce=$.dataset.lane||"parallel",je=Number($.dataset.placeIndex||0)||0;Oe(),B("worker-queue-place",{bead_id:V,...ce==="parallel"?{}:{lane:ce},index:je},k,O);return}if(se.contains("worker-card__place")){Fe($);return}if(se.contains("mon-op--up")||se.contains("mon-op--down")){let ce=Number(h.getAttribute("data-queue-index")||0)||0,je=se.contains("mon-op--up")?ce-1:ce+1;if(je<0)return;B("worker-queue-reorder",{bead_id:V,.../^s[1-5]$/.test(h.dataset.lane||"")?{lane:h.dataset.lane}:{},to_index:je},k,O);return}if(se.contains("mon-op--remove")){B("worker-queue-remove",{bead_id:V},k,O);return}if(se.contains("mon-op--pause")){C("worker-attempt-pause",{attempt_id:X},k);return}if(se.contains("mon-op--discard")){if(!d(Fn(V,"unmerged")))return;b({bead_id:V,...X?{attempt_id:X}:{},...$.dataset.operationId?{operation_id:$.dataset.operationId}:{}},k,O);return}if(se.contains("mon-op--resume")){sn().then(ce=>{if(ce!==null)return I("worker-attempt-resume",{attempt_id:X,...ce!==""?{instructions:ce}:{}},k,O)});return}if(se.contains("mon-op--dismiss")){B("worker-attempt-dismiss",{attempt_id:X},k,O);return}if(se.contains("worker-mini__merge")){let ce=U(k,V);ce?.mismatch&&ce.continuation===null?W(k,V,O,ce.mismatch):B("worker-merge-queue-add",{bead_id:V},k,O);return}if(se.contains("worker-mini__merge-cancel")){B("worker-merge-queue-remove",{bead_id:V},k,O);return}if(se.contains("worker-mini__discard")){let ce=$.dataset.discardMode==="merged"?"merged":"unmerged";if(!d(Fn(V,ce)))return;b({bead_id:V,...X?{attempt_id:X}:{},...$.dataset.operationId?{operation_id:$.dataset.operationId}:{}},k,O);return}if(se.contains("worker-mini__revise-fix")){I("worker-revise-fix",{bead_id:V},k,O);return}se.contains("worker-mini__revise-approve")&&B("worker-revise-approve",{bead_id:V},k,O)}function q(h){h.querySelector(".mon-link__list")?.replaceChildren();let k=h.querySelector(".mon-link__search");k&&(k.value="");let O=h.querySelector(".mon-link__direct");O&&(O.hidden=!0,O.dataset.targetId="",O.textContent="");let V=h.querySelector(".mon-link__empty");V&&(V.hidden=!0);let X=h.querySelector(".mon-link__error");X&&(X.hidden=!0,X.textContent="")}function ne(h,$){let k=h.querySelector(".mon-link__list");if(!k)return;let O=document.createDocumentFragment(),V=Ec(R).filter(X=>X.id!==$);for(let X of V){let se=document.createElement("button");se.type="button",se.className="mon-link__candidate",se.dataset.targetId=X.id,se.dataset.search=`${X.id} ${X.title} ${X.location}`.toLocaleLowerCase();let ce=document.createElement("strong");ce.textContent=X.id;let je=document.createElement("span");je.textContent=X.title;let be=document.createElement("small");be.textContent=X.location,se.append(ce,je,be),O.append(se)}k.replaceChildren(O)}function Oe(){for(let h of Array.from(A.querySelectorAll(".mon-card-popover"))){let $=h;$.hidden=!0,$.classList.contains("mon-link__popover")&&q($)}for(let h of Array.from(A.querySelectorAll('[aria-expanded="true"]')))h.setAttribute("aria-expanded","false")}function Fe(h){let k=h.closest(".mon-place")?.querySelector(".mon-place__popover")||null;if(!k)return;let O=k.hidden;Oe(),O&&(k.hidden=!1,h.setAttribute("aria-expanded","true"))}function ze(h){let k=h.closest(".mon-link")?.querySelector(".mon-link__popover")||null;if(!k)return;let O=k.hidden;if(Oe(),O){let V=h.closest(".mon-card");ne(k,V?.getAttribute("data-issue-id")||""),k.hidden=!1,h.setAttribute("aria-expanded","true");let X=k.querySelector(".mon-link__search");X&&(Ce(X),X.focus())}}function Ce(h){let $=h.closest(".mon-link__popover"),k=h.closest(".mon-card");if(!$||!k)return;let O=h.value.trim(),V=O.toLocaleLowerCase(),X=0,se=!1;for(let ye of Array.from($.querySelectorAll(".mon-link__candidate"))){let st=ye,ot=st.dataset.targetId||"",F=V.length===0||(st.dataset.search||"").includes(V);st.hidden=!F,F&&(X+=1),ot.toLocaleLowerCase()===V&&(se=!0)}let ce=$.querySelector(".mon-link__direct"),je=k.getAttribute("data-issue-id")||"";if(ce){let ye=O.length>0&&!se&&V!==je.toLocaleLowerCase();ce.hidden=!ye,ce.dataset.targetId=ye?O:"",ce.textContent=ye?`\uC9C1\uC811 \uC785\uB825 \xB7 ${O}`:"",ye&&(X+=1)}let be=$.querySelector(".mon-link__empty");be&&(be.hidden=X>0);let Se=$.querySelector(".mon-link__error");Se&&(Se.hidden=!0,Se.textContent="")}function ct(h){let $=h.target;$&&A.contains($)&&typeof $.closest=="function"&&$.closest(".mon-popover-owner")||Oe()}function Ye(h){if(h.key!=="Escape")return;let $=A.querySelector('[aria-expanded="true"]');Oe(),$?.focus()}function G(h){let $=M;M=!1;let k=h.target;if(!k||typeof k.closest!="function"||k.closest("dialog")||k.closest("a"))return;let O=k.closest(".mon-running-sort");if(O){h.preventDefault(),_=O.getAttribute("data-sort")==="repo"?"repo":"started",ym(_),Ee();return}let V=k.closest(".mon-auto-all");if(V){h.preventDefault(),z(V.getAttribute("data-on")==="true");return}if(k.closest(".mon-merge-all")){h.preventDefault(),re();return}let se=k.closest(".mon-ctl--advance");if(se){h.preventDefault();let{root_dir:ye,revision:st}=We(se);B("worker-automation-toggle",{on:se.getAttribute("data-on")==="true"},ye,st);return}let ce=k.closest(".mon-ctl--merge-auto");if(ce){h.preventDefault();let{root_dir:ye,revision:st}=We(ce);B("worker-merge-auto-toggle",{on:ce.getAttribute("data-on")==="true"},ye,st);return}let je=k.closest(".mon-card");if(!je)return;let be=k.closest("button");if(be){h.preventDefault(),K(je,be);return}let Se=je.getAttribute("data-issue-id");Se&&!$&&(h.preventDefault(),he(Se,je.getAttribute("data-root-dir")||""))}function te(h){let $=h.target;if(!$||typeof $.closest!="function")return;let k=$.closest(".mon-filter__blocked");if(k){y={show_blocked:k.checked},_m(y),Ee();return}let O=$.closest(".mon-done-range");if(O){f=Ut(O.value)?O.value:Nt,bm(f),Ee();return}let V=$.closest(".mon-slots__input");if(!V)return;let{root_dir:X,revision:se}=We(V),ce=Number(V.value);if(!Number.isFinite(ce))return;let je=Math.max(Wn,Math.floor(ce));B("worker-queue-set-slots",{slots:je},X,se)}function De(h){let $=h.target;$?.classList.contains("mon-link__search")&&Ce($)}e.addEventListener("click",G),e.addEventListener("change",te),e.addEventListener("input",De),e.addEventListener("dragstart",Ve),e.addEventListener("dragover",Me),e.addEventListener("dragleave",Ue),e.addEventListener("drop",Ae),e.addEventListener("dragend",le),document.addEventListener("click",ct),document.addEventListener("keydown",Ye),s&&typeof s.subscribe=="function"&&(Y=s.subscribe(()=>{try{N.clear(),Ee()}catch{}}));function rt(){Z!==null&&(clearInterval(Z),Z=null)}function pe(){ue!==null&&(clearTimeout(ue),ue=null)}return{load(){r("load"),Ee(),Z===null&&(Z=setInterval(()=>{try{if(A.querySelector(".mon-card-popover:not([hidden])"))return;Ee()}catch{}},vm))},pause(){rt()},clear(){rt(),pe(),Y&&(Y(),Y=null),e.removeEventListener("click",G),e.removeEventListener("change",te),e.removeEventListener("input",De),e.removeEventListener("dragstart",Ve),e.removeEventListener("dragover",Me),e.removeEventListener("dragleave",Ue),e.removeEventListener("drop",Ae),e.removeEventListener("dragend",le),document.removeEventListener("click",ct),document.removeEventListener("keydown",Ye),e.replaceChildren()}}}function su(e,t,r){let n=ft("views:nav"),{global_element:s,repo_element:o}=e,a=null;function i(y){return T=>{T.preventDefault(),n("click tab %s",y),r.gotoView(y)}}function u(){let y=t.getState();return y.view==="worker"||y.view==="monitor"?y.view:"board"}function d(){let y=u();return l`
      <a
        href="#/monitor"
        class="ctl-tab ctl-tab--monitor ${y==="monitor"?"is-active":""}"
        @click=${i("monitor")}
      >
        <span class="ctl-tab__dots" aria-hidden="true"
          ><i></i><i></i><i></i><i></i
        ></span>
        Monitor
      </a>
    `}function f(){let y=u();return l`
      <div class="ctl-tabs">
        <a
          href="#/board"
          class="ctl-tab ${y==="board"?"is-active":""}"
          @click=${i("board")}
          >Board</a
        >
        <a
          href="#/worker"
          class="ctl-tab ${y==="worker"?"is-active":""}"
          @click=${i("worker")}
          >Worker</a
        >
      </div>
    `}function _(){s&&He(d(),s),o&&He(f(),o)}return _(),a=t.subscribe(()=>_()),{destroy(){a&&(a(),a=null),s&&He(l``,s),o&&He(l``,o)}}}var ou=["bug","feature","task","epic","chore"];function au(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var iu=["Critical","High","Medium","Low","Backlog"];function lu(e,t){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,e.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),a=r.querySelector("#new-priority"),i=r.querySelector("#new-labels"),u=r.querySelector("#new-description"),d=r.querySelector("#new-issue-error"),f=r.querySelector("#btn-cancel"),_=r.querySelector("#btn-create"),y=r.querySelector(".new-issue__close");function T(){o.replaceChildren();let I=document.createElement("option");I.value="",I.textContent="\u2014 Select \u2014",o.appendChild(I);for(let W of ou){let b=document.createElement("option");b.value=W,b.textContent=au(W),o.appendChild(b)}a.replaceChildren();for(let W=0;W<=4;W+=1){let b=document.createElement("option");b.value=String(W);let C=iu[W]||"Medium";b.textContent=`${W} \u2013 ${C}`,a.appendChild(b)}}T();function A(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function R(I){s.disabled=I,o.disabled=I,a.disabled=I,i.disabled=I,u.disabled=I,f.disabled=I,_.disabled=I,_.textContent=I?"Creating\u2026":"Create"}function N(){d.textContent=""}function Y(I){d.textContent=I}function Z(){try{let I=window.localStorage.getItem("beads-ui.new.type");I?o.value=I:o.value="";let W=window.localStorage.getItem("beads-ui.new.priority");W&&/^\d$/.test(W)?a.value=W:a.value="2"}catch{o.value="",a.value="2"}}function B(){let I=o.value||"",W=a.value||"";I.length>0&&window.localStorage.setItem("beads-ui.new.type",I),W.length>0&&window.localStorage.setItem("beads-ui.new.priority",W)}async function U(){N();let I=String(s.value||"").trim();if(I.length===0){Y("Title is required"),s.focus();return}let W=Number(a.value||"2");if(!(W>=0&&W<=4)){Y("Priority must be 0..4"),a.focus();return}let b=String(o.value||""),C=String(u.value||""),z={title:I};b.length>0&&(z.type=b),String(W).length>0&&(z.priority=W),C.length>0&&(z.description=C),R(!0);try{await t("create-issue",z)}catch{R(!1),Y("Failed to create issue");return}B(),R(!1),A()}return r.addEventListener("cancel",I=>{I.preventDefault(),A()}),y.addEventListener("click",()=>A()),f.addEventListener("click",()=>A()),r.addEventListener("keydown",I=>{I.key==="Enter"&&(I.ctrlKey||I.metaKey)&&(I.preventDefault(),U())}),n.addEventListener("submit",I=>{I.preventDefault(),U()}),{open(){n.reset(),N(),Z();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){A()}}}var $m=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function xm(e,t){return To(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function cu(e,t,r){return l`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?l`<div class="settings-dialog__empty">라벨 없음</div>`:l`<div class="settings-dialog__pills">
            ${t.map(n=>{let s=xm(n,e);return l`<button
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
  `}function uu(e,t,r){return l`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">숨김 prefix</div>
      <div class="settings-dialog__prefixes">
        ${e.hidden_prefixes.map(n=>l`<span class="settings-dialog__prefix">
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
  `}function du(e,t){return l`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${$m.map(([r,n])=>l`<label class="settings-dialog__toggle">
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
  `}var Am=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}],Ft="";function jt(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function pu(e,t){let{transport:r,policyStore:n,labelOptions:s}=t,o=t.notify||(h=>oe(h,"error",4e3)),a=document.createElement("dialog");a.id="settings-dialog",a.className="settings-dialog",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","\uC124\uC815"),e.appendChild(a);let i="execution",u=!1,d="",f={},_={},y=[],T=!1,A=null,R={},N="",Y="",Z=!1,B=!1,U=!1,I=null;function W(){let h=t.queueStore?.get();return jt(h)?h.runner_catalog:null}function b(){let h=t.queueStore?.get();return jt(h)&&jt(h.execution_defaults)?h.execution_defaults:null}function C(){let h=t.implPresetStore?.get();return jt(h)&&Array.isArray(h.presets)?h:null}async function z(){T=!0,Ce();try{let h=await r("get-session-defaults",{});f=jt(h?.values)?{...h.values}:{},_={...f},y=Array.isArray(h?.warnings)?h.warnings:[]}catch(h){y=["kv_read_failed"],o(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${h instanceof Error?h.message:String(h)}`)}finally{T=!1,Ce()}}async function re(){let h=rc(f,_);if(Object.keys(h).length!==0){try{let $=await r("set-session-defaults",{values:h});f=jt($?.values)?{...$.values}:{},_={...f},y=Array.isArray($?.warnings)?$.warnings:[]}catch($){o(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${$ instanceof Error?$.message:String($)}`)}Ce()}}function L(h,$){$===Ft?delete _[h]:_[h]=$,Ce(),re()}async function M(){let h=t.queueStore?.get();if(!jt(h))return;let $={orchestration_model:h.orchestration_model??null,orchestration_effort:h.orchestration_effort??null,orchestration_speed:h.orchestration_speed??null},k=nc($,{...$,...R});if(Object.keys(k).length!==0){try{let O=await r("worker-queue-set-orchestration-defaults",{expected_revision:h.revision,values:k});if(O&&O.applied===!1){o("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}R={}}catch(O){o(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${O instanceof Error?O.message:String(O)}`)}Ce()}}function ue(h,$){R[h]=$===Ft?null:$,Ce(),M()}async function fe(h){let $=t.queueStore?.get();if(!(!jt($)||h<1)){try{await r("worker-queue-set-slots",{expected_revision:$.revision,slots:h})}catch(k){o(`slots \uC800\uC7A5 \uC2E4\uD328: ${k instanceof Error?k.message:String(k)}`)}Ce()}}function de(){let h={},$=We();for(let k of Jl){let O=Cr.includes(k)?$[k]:_[k];typeof O=="string"&&O.length>0&&(h[k]=O)}return h}async function Be(){let h=C();if(!h)return;let $=de();if(Object.keys($).length===0){o("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let k=(h.presets||[]).find(V=>V.id===N),O=Y.trim()||(k?k.name:"");if(!O){o("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let V=k?await r("impl-preset-update",{expected_revision:h.revision,id:k.id,name:O,settings:$}):await r("impl-preset-create",{expected_revision:h.revision,name:O,settings:$});if(V&&V.applied){if(Y="",!k&&Array.isArray(V.presets)){let X=V.presets.find(se=>se.name===O);N=X?X.id:N}Ce()}else o("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Ce()}catch(V){o(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${V instanceof Error?V.message:String(V)}`)}}async function Qe(){let h=C();if(!(!h||N.length===0))try{let $=await r("impl-preset-delete",{expected_revision:h.revision,id:N});$&&$.applied?(N="",Ce()):(o("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Ce())}catch($){o(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${$ instanceof Error?$.message:String($)}`)}}async function Ve(){let h=C(),$=t.queueStore?.get();if(!(!h||!jt($)||N.length===0)){try{let k=await r("apply-impl-preset-global",{preset_id:N,expected_revision:h.revision,expected_queue_revision:$.revision});k&&k.applied?(f=jt(k.values)?{...k.values}:{},_={...f},y=Array.isArray(k.warnings)?k.warnings:[],jt(k.queue)&&(t.queueStore?.set?.(k.queue),R={}),k.queue_applied===!1&&o("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694")):k&&k.conflict&&o("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(k){o(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${k instanceof Error?k.message:String(k)}`)}Ce()}}async function Me(){B=!0,U=!1,Ce();try{let h=await r("get-worker-system-prompt",{});!h||typeof h!="object"||Array.isArray(h)?U=!0:I=h}catch{U=!0}finally{B=!1,Ce()}}function Ue(){if(Z=!Z,Z&&!I){Me();return}Ce()}function le(){let h=cn({loading:B,error:U});if(h)return h;if(!I)return"";let $=Array.isArray(I.variants)?I.variants:[];return l`<div class="settings-dialog__sp-body">
      ${I.target_base_placeholder?l`<div class="prompt-block__meta">
            \`${I.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${$.map(k=>l`<div class="settings-dialog__sp-variant" data-variant=${k.key}>
            <div class="settings-dialog__sp-cond">${k.condition}</div>
            ${vr(k.label,k.system_prompt)}
          </div>`)}
    </div>`}function Ae(){return l`<section
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
        aria-expanded=${Z?"true":"false"}
        @click=${Ue}
      >
        ${Z?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${Z?le():""}
    </section>`}function Ie(h,$,k,O,V,X){let se=V[h]??Ft,ce=sa(h,k,V,b(),W()),je=ce.options.find(Se=>Se.value===se),be=se===Ft?ce.full_value:je?.full_value;return l`<select
        class=${se===Ft?"settings-dialog__unset":""}
        data-key=${h}
        aria-label=${$}
        title=${be||""}
        ?disabled=${X===!0||ce.disabled}
        .value=${zr(String(se))}
        @change=${Se=>O(h,String(Se.target.value))}
      >
        <option value=${Ft} ?selected=${se===Ft}>
          ${ce.unset_label}
        </option>
        ${ce.options.map(Se=>l`<option
              value=${Se.value}
              title=${Se.full_value||""}
              ?selected=${Se.value===se}
            >
              ${Se.label}
            </option>`)}
      </select>
      ${se===Ft?l`<span class="settings-dialog__source-badge">기본</span>`:""}`}function Ee(h,$,k,O,V,X=!1){return l`<div
      class=${`settings-dialog__row${X?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${$}</span>
      <span class="settings-dialog__controls">
        ${Ie(h,$,k,O,V,X)}
      </span>
    </div>`}function he(h,$,k,O,V){return l`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${$}-on)`}
        ></i>
        ${h}
      </span>
      <span class="settings-dialog__controls">
        ${Ie(k,`${h} \uBAA8\uB378`,O,L,_,!1)}
        ${Ie(V,`${h} effort`,zs,L,_,!1)}
      </span>
    </div>`}function We(){let h=t.queueStore?.get(),$={};for(let k of Cr)$[k]=Object.prototype.hasOwnProperty.call(R,k)?R[k]:jt(h)&&typeof h[k]=="string"?h[k]:null;return $}function et(){let h=W(),$=_.impl_runtime,k=_.impl_model,O=C(),V=t.queueStore?.get(),X=We(),se=Gs(h,A),ce=un(h,A||void 0,X.orchestration_model||dr).filter(ye=>ye!==dr),je=jt(V)&&typeof V.slots=="number"?V.slots:2,be=b()?.supported===!0,Se=sa("workflow_mode",Dn,_,b(),h);return l`
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
        ${y.length>0?l`<div class="settings-dialog__banner" role="alert">
              워크스페이스 기본값을 일부 읽지 못했습니다 —
              ${y.join(", ")}
            </div>`:""}
        ${be?"":l`<div
              class="settings-dialog__banner settings-dialog__banner--projection"
              data-execution-defaults-warning
              role="alert"
            >
              실행 기본값 projection을 확인할 수 없습니다 — 기본값 확인 불가
            </div>`}
        ${T?l`<div class="settings-dialog__empty">불러오는 중…</div>`:l`
              <div class="settings-dialog__preset-bar">
                <select
                  aria-label="실행 프리셋"
                  .value=${zr(N)}
                  @change=${ye=>{N=String(ye.target.value),Ce()}}
                >
                  <option value="" ?selected=${N===""}>
                    실행 프리셋…
                  </option>
                  ${(O?.presets||[]).map(ye=>l`<option
                        value=${ye.id}
                        ?selected=${ye.id===N}
                      >
                        ${ye.name}
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
                  .value=${zr(Y)}
                  @input=${ye=>{Y=String(ye.target.value)}}
                />
                <button
                  type="button"
                  class="settings-dialog__btn"
                  data-preset-save
                  @click=${Be}
                >
                  ${N?"\uAC31\uC2E0":"\uC800\uC7A5"}
                </button>
                <button
                  type="button"
                  class="settings-dialog__btn"
                  data-preset-delete
                  ?disabled=${N.length===0}
                  @click=${Qe}
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
                      .value=${zr(A||Ft)}
                      @change=${ye=>{let st=String(ye.target.value);A=st===Ft?null:st,Ce()}}
                    >
                      <option
                        value=${Ft}
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
                ${Ee("orchestration_model","\uBAA8\uB378",se,ue,X)}
                ${Ee("orchestration_effort","effort",ce,ue,X)}
                ${Ee("orchestration_speed","\uC18D\uB3C4",Pn,ue,X)}
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
                        aria-pressed=${String(!_.workflow_mode)}
                        @click=${()=>L("workflow_mode",Ft)}
                      >
                        ${Se.unset_label}
                      </button>
                      ${_.workflow_mode?"":l`<span class="settings-dialog__source-badge"
                            >기본</span
                          >`}
                      ${Dn.map(ye=>l`<button
                            type="button"
                            data-mode=${ye}
                            aria-pressed=${String(_.workflow_mode===ye)}
                            @click=${()=>L("workflow_mode",ye)}
                          >
                            ${ye}
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
                ${he("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",Nn,"spec_review_effort")}
                ${he("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",Ws,"plan_review_effort")}
                ${he("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",Nn,"impl_review_effort")}
              </div>

              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">
                  구현
                  <span class="settings-dialog__hint"
                    >이슈 핀이 있으면 핀이 우선합니다</span
                  >
                </div>
                ${Ee("impl_runtime","\uC704\uC784 \uB300\uC0C1",Us,L,_)}
                ${Ee("impl_model","\uBAA8\uB378",Hs(h,$),L,_)}
                ${Ee("impl_effort","effort",un(h,$,k),L,_)}
                ${Ee("impl_speed","\uC18D\uB3C4",Pn,L,_)}
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
                        @click=${()=>fe(je-1)}
                      >
                        −
                      </button>
                      <span class="settings-dialog__stepper-value"
                        >${je}</span
                      >
                      <button
                        type="button"
                        aria-label="slots 증가"
                        @click=${()=>fe(je+1)}
                      >
                        +
                      </button>
                    </span>
                  </span>
                </div>
              </div>
              ${Ae()}
            `}
      </section>
    `}function Te(){let h=n.get();return l`
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
        ${h?l`
              ${cu(h,s(),ne)}
              ${uu(h,d,{onDraft:$=>{d=$},onAdd:Oe,onRemove:Fe})}
              ${du(h,ze)}
            `:l`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function tt(h){let $=n.get();if($)try{let k=await r("display-policy-set",{expected_revision:$.revision,policy:h($)});K(k),k&&k.conflict&&k.policy&&(k=await r("display-policy-set",{expected_revision:k.policy.revision,policy:h(k.policy)}),K(k)),k&&k.conflict&&o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function K(h){h&&h.policy&&typeof h.policy=="object"&&n.set(h.policy)}function q(h){tt(h)}function ne(h){let $=n.get();if(!$)return;let k=!Sm(h,$);q(O=>Em(h,O,k))}function Oe(){let h=d.trim();h.length!==0&&(d="",q($=>$.hidden_prefixes.includes(h)?{hidden_prefixes:$.hidden_prefixes}:{hidden_prefixes:[...$.hidden_prefixes,h]}),Ce())}function Fe(h){q($=>({hidden_prefixes:$.hidden_prefixes.filter(k=>k!==h)}))}function ze(h){let $=n.get();if(!$)return;let k=$.chips[h]===!1;q(()=>({chips:{[h]:k}}))}function Ce(){He(l`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${Am.map(h=>l`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${h.id}
                  aria-selected=${String(i===h.id)}
                  aria-controls=${`settings-pane-${h.id}`}
                  @click=${()=>ct(h.id)}
                >
                  <span class="settings-dialog__glyph">${h.glyph}</span>
                  ${h.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${pe}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${et()} ${Te()}
          </div>
        </div>
      `,a)}function ct(h){i=h,Ce()}let Ye=()=>{u=!1,t.onOpenChange?.(!1)};a.addEventListener("close",Ye),a.addEventListener("cancel",Ye);let G=h=>{h.target===a&&pe()};a.addEventListener("click",G);let te=null;n.subscribe&&(te=n.subscribe(()=>{u&&Ce()}));let De=null;t.implPresetStore?.subscribe&&(De=t.implPresetStore.subscribe(()=>{u&&Ce()}));function rt(h="execution"){u||(u=!0,t.onOpenChange?.(!0),i=h,d="",R={},Ce(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),z())}function pe(){u&&(u=!1,t.onOpenChange?.(!1),typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:rt,close:pe,sessionDraft:()=>({..._}),destroy(){u=!1,a.removeEventListener("close",Ye),a.removeEventListener("cancel",Ye),a.removeEventListener("click",G),te&&(te(),te=null),De&&(De(),De=null),a.remove()}}}function Sm(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(r=>r.length>0&&e.startsWith(r))}function Em(e,t,r){if(!r)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let n=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:n,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:n}}var Tm=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],fu="usage-meter-card",_u=600,Cm=["token_expired","relogin_required"];function mu(e){return String(e).padStart(2,"0")}function Rm(e,t){let r=Math.max(0,Math.ceil((e-t)/6e4)),n=Math.floor(r/1440),s=Math.floor(r%1440/60),o=r%60;return n>0?`${n}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function Im(e,t=Date.now()){let r=Date.parse(e);if(!Number.isFinite(r))return"";let n=new Date(r),s=new Date(t),o=`${mu(n.getHours())}:${mu(n.getMinutes())}`,i=n.getFullYear()===s.getFullYear()&&n.getMonth()===s.getMonth()&&n.getDate()===s.getDate()?o:`${Tm[n.getMonth()]} ${n.getDate()} ${o}`;return`${Rm(r,t)} \xB7 ${i}`}function Lm(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function gu(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function bu(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var hu=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function vu(e){let t=[];for(let r of e){if(!r||typeof r!="object")continue;let n=r;typeof n.key!="string"||n.key.length===0||typeof n.pct!="number"||!Number.isFinite(n.pct)||t.push({key:n.key,pct:n.pct,resetsAt:typeof n.resetsAt=="string"?n.resetsAt:""})}return t}function Om(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:vu(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function Mm(e){if(!e||typeof e!="object")return null;let t=e,r=[];if(Array.isArray(t.accounts))for(let s of t.accounts){let o=Om(s);o&&r.push(o)}let n=t.available===!0&&Array.isArray(t.windows);return!n&&r.length===0?null:{available:n,windows:n?vu(t.windows):[],ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null,accounts:r}}function yu(e,t){return`${e}:${t}`}function wu(e){let t=!1,r=null,n=new Map,s=null,o=new Map,a=new Map,i=0;function u(){He(l``,e),e.hidden=!0}function d(L){r!==L&&(r===null&&(document.addEventListener("mousedown",_),document.addEventListener("keydown",y)),r=L)}function f(){r!==null&&(r=null,document.removeEventListener("mousedown",_),document.removeEventListener("keydown",y))}function _(L){let M=L.target;M&&e.contains(M)||(f(),C())}function y(L){L.key==="Escape"&&(f(),C())}function T(L){r===L?f():d(L),C()}function A(){f(),C()}async function R(L,M){if(n.has(L.key))return;let ue=yu(L.key,M);n.set(L.key,M),a.delete(ue),C();let fe=null;try{fe=await(await fetch(L.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:M})})).json()}catch{fe=null}if(t)return;if(n.delete(L.key),!fe||fe.ok!==!0){let Be=fe&&typeof fe.error=="string"&&fe.error.length>0?fe.error:"network_error";a.set(ue,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${Be}`}),C();return}let de=Array.isArray(fe.warnings)?fe.warnings.filter(Be=>typeof Be=="string"&&Be.length>0):[];de.length>0&&a.set(ue,{kind:"warn",text:de.join(" \xB7 ")}),C(),await re()}function N(L,M,ue,fe){let de=bu(L.pct),Qe=`resets ${Im(L.resetsAt,fe)}${M?` \xB7 ${ue}`:""}`;return l`<span
      class="usage-meter__window ${gu(de)}"
      style=${`--progress: ${de}%`}
      title=${Qe}
    >
      <span class="usage-meter__label">${L.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${de}%</span>
    </span>`}function Y(L,M,ue){let fe=M.available&&typeof M.ageSeconds=="number"&&M.ageSeconds>_u,de=fe&&typeof M.ageSeconds=="number"?`${Math.floor(M.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"",Be=M.accounts.filter(Ue=>!Ue.active).length,Qe=`usage-meter__group${fe?" usage-meter__group--stale":""}`,Ve=l`<span class="usage-meter__provider"
        >${L.label}</span
      >
      ${M.available?M.windows.map(Ue=>N(Ue,fe,de,ue)):l`<span class="usage-meter__empty">사용량 없음</span>`}
      ${Be>0?l`<span class="usage-meter__badge">+${Be}</span>`:""}`;if(M.accounts.length===0)return l`<span
        class=${Qe}
        aria-label=${`${L.label} usage`}
        >${Ve}</span
      >`;let Me=r===L.key;return l`<button
      type="button"
      class=${`usage-meter__toggle ${Qe}`}
      aria-label=${`${L.label} usage`}
      aria-expanded=${Me?"true":"false"}
      aria-controls=${fu}
      @click=${()=>T(L.key)}
    >
      ${Ve}
    </button>`}function Z(L,M){return l`<span class="usage-meter" aria-label="Usage">
      ${L.map(ue=>Y(ue.provider,ue.snapshot,M))}
    </span>`}function B(L){let M=bu(L.pct);return l`<span
      class="usage-meter__account-window ${gu(M)}"
      style=${`--progress: ${M}%`}
    >
      <span class="usage-meter__account-key">${L.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${M}%</span>
    </span>`}function U(L,M){return Cm.includes(M)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${L.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function I(L,M){let ue=M.status==="ok",fe=typeof M.ageSeconds=="number"&&M.ageSeconds>_u,de=a.get(yu(L.key,M.number)),Be=n.get(L.key),Qe=Be!==void 0,Ve=Be===M.number,Me=["usage-meter__account"];return M.active&&Me.push("usage-meter__account--active"),ue||Me.push("usage-meter__account--unavailable"),fe&&Me.push("usage-meter__account--stale"),l`<div class=${Me.join(" ")}>
      <div class="usage-meter__account-head">
        <span class="usage-meter__account-label" title=${M.email}
          >${M.alias===null?M.email:M.alias}</span
        >
        ${M.plan===null?"":l`<span class="usage-meter__account-tag">${M.plan}</span>`}
        ${M.active?l`<span
              class="usage-meter__account-tag usage-meter__account-tag--active"
              >active</span
            >`:""}
        ${M.ageSeconds===null?"":l`<span class="usage-meter__account-age"
              >${Lm(M.ageSeconds)}</span
            >`}
        ${M.active?"":l`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${Qe}
              @click=${()=>{R(L,M.number)}}
            >
              ${Ve?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${ue?l`<div class="usage-meter__account-windows">
            ${M.windows.map(Ue=>B(Ue))}
          </div>`:l`<div class="usage-meter__account-status">
            ${U(L,M.status)}
          </div>`}
      ${de===void 0?"":l`<div
            class="usage-meter__account-message usage-meter__account-message--${de.kind}"
          >
            ${de.text}
          </div>`}
    </div>`}function W(L,M){let ue=M.accounts.filter(fe=>fe.active).length;return l`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${L.label} · 활성 ${ue} / 전체
        ${M.accounts.length}
      </h2>
      ${M.accounts.map(fe=>I(L,fe))}
    </section>`}function b(L){return l`<div
      class="usage-meter__card"
      id=${fu}
      role="dialog"
      aria-label=${`${L.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${W(L.provider,L.snapshot)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function C(){let L=[];for(let fe of hu){let de=o.get(fe.key);de&&L.push({provider:fe,snapshot:de})}if(L.length===0){f(),u();return}let M=L.find(fe=>fe.provider.key===r&&fe.snapshot.accounts.length>0);M||f();let ue=Date.now();He(l`${Z(L,ue)}
      ${M?l`<div
              class="usage-meter__scrim"
              aria-hidden="true"
              @mousedown=${A}
            ></div>
            ${b(M)}`:""}`,e),e.hidden=!1}async function z(L){try{let M=await fetch(L.endpoint);return M.ok?Mm(await M.json()):null}catch{return null}}async function re(){i+=1;let L=i,M=await Promise.all(hu.map(async ue=>({provider:ue,snapshot:await z(ue)})));if(!(t||L!==i)){for(let ue of M)ue.snapshot?o.set(ue.provider.key,ue.snapshot):o.delete(ue.provider.key);C()}}return u(),re(),s=setInterval(()=>{re()},6e4),{destroy(){t=!0,s!==null&&(clearInterval(s),s=null),f(),u()}}}function ku(e){let t=e.attempts?Object.values(e.attempts):[],r=new Map;for(let s of t)s&&r.set(s.bead_id,s.attempt_id);let n=new Map;for(let s of e.done||[])s&&typeof s.bead_id=="string"&&typeof s.added_at=="number"&&n.set(s.bead_id,s.added_at);return s=>{let o=r.get(s.bead_id)!==s.attempt_id,a=n.get(s.bead_id),i=typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at;return!o&&!i&&typeof s.dismissed_at!="number"}}var Pm="worker-ineligible";function Sa(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function $u(e){return Sa(e).includes(Pm)}var Dm="worker-serial";function Ea(e){return Sa(e).includes(Dm)}function Ta(e,t,r){if(typeof t!="string"||typeof r!="string")return[];let n=e?.runners;if(!n||!Object.hasOwn(n,t))return[];let s=n[t],o=s?.models;if(!o||!Object.hasOwn(o,r))return[];let a=o[r]?.efforts;return Array.isArray(a)?a.slice():Array.isArray(s.efforts)?s.efforts.slice():[]}var Nm=new Set(["done","failed","orphaned","stopped","discarded"]),qm={spec_missing:"\uC2A4\uD399 \uC5C6\uC74C",route:"route \uBBF8\uB2EC",spec_review:"\uC2A4\uD399 \uB9AC\uBDF0 \uC5C6\uC74C",spec_conflict:"\uC2A4\uD399 \uCDA9\uB3CC",phase_child:"phase child",worker_ineligible:"worker \uC81C\uC678"},Fm={running:"\uC2E4\uD589 \uC911",success:"\uC131\uACF5",failure:"\uC2E4\uD328",cancelled:"\uCDE8\uC18C",interrupted:"\uC911\uB2E8"},jm={running:"running",success:"done",failure:"failed",cancelled:"stopped",interrupted:"orphaned"};function Ca(e){return{runner:e.runner||void 0,model:e.model||void 0,effort:e.effort||void 0,status:jm[e.outcome]||(typeof e.job_id=="string"?"running":void 0),session_id:e.session_id||void 0}}function xu(e,t){let{queueStore:r,analysisStore:n,transport:s,getWorkspacePath:o,onOpenTranscript:a}=t,i=document.createElement("dialog");i.id="worker-parallel-analysis-dialog",i.className="pa",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),e.appendChild(i);let u=new Map,d=new Map,f=!1,_=null,y=null,T=null,A=new Set,R=!1,N=0,Y=null,Z=new Set;function B(){return r&&r.get()||{revision:0,queue:[],serial_lanes:[],serial_lane_count:0,attempts:{},pr_wait:[]}}function U(){return n&&n.get()||{settings:{revision:0,runner:null,model:null,effort:null},job:null,runs:[],last_good:null}}function I(){return o&&o()||""}async function W(){if(!s)return;let w=++N;R=!0,T=null,A.clear(),be();try{let E=await s("worker-parallel-analysis-targets",{root_dir:I()});if(w!==N||!Se)return;let P=Array.isArray(E?.qualified)?E.qualified:[],Q=Array.isArray(E?.excluded)?E.excluded:[];T={qualified:P,excluded:Q};for(let ke of P)ke&&typeof ke.id=="string"&&A.add(ke.id)}catch{w===N&&Se&&(T={qualified:[],excluded:[]},oe("\uBD84\uC11D \uB300\uC0C1\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800))}finally{w===N&&(R=!1,Se&&be())}}function b(w){return Array.isArray(w.runs)?w.runs:[]}function C(){let w=B(),E=new Set;for(let P of Object.values(w.attempts||{})){let Q=P;Q&&typeof Q.bead_id=="string"&&!Nm.has(Q.status)&&E.add(Q.bead_id)}for(let P of Array.isArray(w.pr_wait)?w.pr_wait:[])P&&typeof P.bead_id=="string"&&E.add(P.bead_id);for(let P of Object.values(w.discard_operations||{})){let Q=P;Q&&Q.phase!=="done"&&typeof Q.bead_id=="string"&&E.add(Q.bead_id)}return E}function z(w){return w.filter(E=>re(E)===null)}function re(w){let E=B();for(let P of Array.isArray(E.serial_lanes)?E.serial_lanes:[])if(Array.isArray(P?.entries)&&P.entries.some(Q=>Q.bead_id===w))return P.id;return(Array.isArray(E.queue)?E.queue:[]).some(P=>P.bead_id===w)?"parallel":null}function L(w,E){let P=u.get(w);return P||[...E.order]}function M(w){if(w.length<2)return!1;let E=re(w[0]);if(!E||E==="parallel")return!1;let P=B(),Q=(Array.isArray(P.serial_lanes)?P.serial_lanes:[]).find(J=>J.id===E)?.entries.map(J=>J.bead_id);if(!Array.isArray(Q))return!1;let ke=w.map(J=>Q.indexOf(J));return ke.every(J=>J>=0)&&ke.every((J,xe)=>xe===0||J>ke[xe-1])}function ue(){let w=B(),E=Array.isArray(w.serial_lanes)?w.serial_lanes:[],P=E.find(Q=>Array.isArray(Q.entries)&&Q.entries.length===0);return P?P.id:E[0]?.id||"s1"}function fe(w){let E=B().bead_titles||{};return typeof E[w]=="string"?E[w]:w}async function de(w,E){if(!s||f)return null;f=!0,be();try{return await s(w,E)}finally{f=!1,be()}}async function Be(w){n?.setPending?.(!0);try{let E=await de("worker-parallel-analysis-start",{force:w,target_ids:Array.from(A)});E&&E.applied===!1&&E.reason&&(E.reason==="target_not_qualified"&&Array.isArray(E.detail)?oe(`\uBD84\uC11D \uB300\uC0C1 \uC790\uACA9 \uBCC0\uACBD: ${E.detail.join(", ")}`,"error",3200):oe(`\uBD84\uC11D \uC2E4\uD328: ${E.reason}`,"error",2800))}finally{n?.setPending?.(!1)}}async function Qe(){let w=U().job;!s||!w||await s("worker-parallel-analysis-cancel",{job_id:w.job_id})}async function Ve(w){if(!(!s||Z.has(w))){Z.add(w),be();try{let E=await s("worker-parallel-analysis-prompt",{root_dir:I(),run_id:w});if(!Se)return;if(E?.ok===!0&&typeof E.prompt=="string"){Y={run_id:w,prompt:E.prompt};return}oe(E?.reason==="not_found"?"\uC800\uC7A5\uB41C \uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800)}finally{Z.delete(w),be()}}}function Me(){Y=null,be()}async function Ue(){if(!Y)return;let w=await Zt(Y.prompt);oe(w?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",w?"success":"error",1400)}function le(w,E){a&&a(w,Ca(E))}function Ae(){return B().runner_catalog}function Ie(w){return Object.keys(Ae()?.runners?.[w]?.models||{})}function Ee(w){let E=Ie(w),P=Ae()?.runners?.[w]?.default_model;return typeof P=="string"&&E.includes(P)?P:E[0]||""}function he(){let w=U().settings,E=_||w.runner||"claude",P=Ie(E),Q=_?Ee(E):w.model||P[0]||"",ke=Ta(Ae(),E,Q),J=w.effort||"",xe=ke.includes(J)?J:ke[0]||"";return{runner:E,model:Q,effort:xe,models:P,efforts:ke}}async function We(w){let E=U().settings,P=await de("worker-parallel-analysis-settings-update",{expected_revision:E.revision,runner:w.runner,model:w.model,effort:w.effort});(!P||P.applied!==!0)&&(_=null,be(),P&&P.reason&&oe(`\uBD84\uC11D \uC124\uC815 \uAC70\uBD80: ${P.reason}`,"error",2800))}function et(w){_=w,be();let E=he();We({runner:w,model:E.model,effort:E.effort})}function Te(w){let E=he(),P=Ta(Ae(),E.runner,w);We({runner:E.runner,model:w,effort:P.includes(E.effort)?E.effort:P[0]||""})}function tt(w){let E=he();We({runner:E.runner,model:E.model,effort:w})}async function K(w,E){if(!s||f)return;let P=L(w,E),Q=U();if(P.length<2||!Q.last_good){oe("\uC81C\uCD9C\uD558\uB824\uBA74 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4","warning");return}let ke=d.get(w)||ue(),J=()=>({snapshot_digest:Q.last_good.identity_digest,group_index:w,lane:ke,ordered_bead_ids:P,expected_revision:B().revision});f=!0,be();try{let xe=await s("worker-parallel-analysis-submit",J());xe&&xe.queue&&r&&r.set(xe.queue),xe&&xe.applied!==!0&&xe.conflict===!0&&(xe=await s("worker-parallel-analysis-submit",J()),xe&&xe.queue&&r&&r.set(xe.queue)),xe&&xe.applied===!0?(u.delete(w),oe(`\uC9C1\uB82C \uB808\uC778 ${ke}\uC5D0 ${P.length}\uAC1C \uBC30\uCE58`,"success")):oe(`\uC81C\uCD9C \uAC70\uBD80: ${xe?.reason||"conflict"} (\uD050 \uBB34\uBCC0\uACBD)`,"error",2800)}finally{f=!1,be()}}function q(w,E,P){u.set(w,L(w,E).filter(Q=>Q!==P)),be()}function ne(w){u.delete(w),be()}function Oe(w,E,P,Q){let ke=[...L(w,E)],J=ke.indexOf(P),xe=J+Q;J<0||xe<0||xe>=ke.length||(ke.splice(xe,0,...ke.splice(J,1)),u.set(w,ke),be())}function Fe(){let w=U().settings,E=Object.keys(Ae()?.runners||{}),P=he();return l`<div class="pa-settings">
      <label class="pa-settings__field"
        >러너
        <select
          class="pa-settings__runner"
          aria-label="분석 러너"
          @change=${Q=>et(Q.target.value)}
        >
          ${E.map(Q=>l`<option
                value=${Q}
                ?selected=${P.runner===Q}
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
          @change=${Q=>Te(Q.target.value)}
        >
          ${P.models.map(Q=>l`<option
                value=${Q}
                ?selected=${P.model===Q}
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
          @change=${Q=>tt(Q.target.value)}
        >
          ${P.efforts.map(Q=>l`<option
                value=${Q}
                ?selected=${P.effort===Q}
              >
                ${Q}
              </option>`)}
        </select>
      </label>
      ${ze(w)}
    </div>`}function ze(w){return!ct(w)||Ce(w)?l`<span class="pa-settings__unset">분석 모델 설정 필요</span>`:w.compatible===!1?l`<span class="pa-settings__incompatible"
        >설정 비호환 — 저장된 ${w.runner}/${w.model} · effort
        ${w.effort} 을(를) 카탈로그가 더는 제공하지 않습니다</span
      >`:w.is_default===!0?l`<span class="pa-settings__default">기본값</span>`:""}function Ce(w){return w.is_default===!0&&w.compatible===!1}function ct(w){return!!(w.runner&&w.model&&w.effort)}function Ye(w){return ct(w)&&w.compatible!==!1}function G(w){let E=Math.max(0,Math.floor(w/1e3)),P=Math.floor(E/60),Q=E%60;return`${P}:${String(Q).padStart(2,"0")}`}function te(w){let E=w.job;if(E){let P=typeof E.started_at=="number"?E.started_at:0,Q=`${E.runner||"?"}/${E.model||"?"}`,ke=P?` \xB7 \uACBD\uACFC ${G(Date.now()-P)}`:"",J=typeof E.session_id=="string"?E.session_id:"",xe=b(w).find(Le=>Le.run_id===E.job_id);return l`<span class="pa-meta__progress">
        <span
          >분석 중 — ${Q} · effort ${E.effort||"?"}${ke}</span
        >
        ${J?l`<code class="pa-session-id" title=${J}
              >${J.slice(0,8)}</code
            >`:""}
        <button
          type="button"
          class="pa-monitor"
          @click=${()=>le(E.job_id,xe||E)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-prompt-open"
          ?disabled=${xe?.prompt_saved!==!0||Z.has(E.job_id)}
          @click=${()=>{Ve(E.job_id)}}
        >
          프롬프트
        </button>
      </span>`}return De()?l`<span class="pa-meta__progress"
          >준비 중 — 대상과 아티팩트 수집 중</span
        >`:""}function De(){return n?.isPending?.()===!0}function rt(w){let E=!!w.job,P=Ye(w.settings),Q=T!==null&&A.size===0,ke=E||f||De()||R;return l`<div class="pa-meta">
      ${w.last_good?l`<span class="pa-meta__at"
            >분석 ${new Date(w.last_good.at||0).toLocaleString()}</span
          >`:l`<span class="pa-meta__at">분석 결과 없음</span>`}
      ${te(w)}
      <button
        type="button"
        class="pa-run"
        ?disabled=${!P||ke||Q}
        @click=${()=>{Be(!1)}}
      >
        ✳ 분석
      </button>
      <button
        type="button"
        class="pa-rerun"
        ?disabled=${!P||ke||Q}
        @click=${()=>{Be(!0)}}
      >
        재분석
      </button>
      <button
        type="button"
        class="pa-cancel"
        ?disabled=${!E}
        @click=${()=>{Qe()}}
      >
        취소
      </button>
    </div>`}function pe(w){return typeof w=="string"&&w.length>0?w:"\uBBF8\uBC30\uCE58"}function h(w,E){E?A.add(w):A.delete(w),be()}function $(w){let E=Array.isArray(w.scope)?w.scope:[],P=Array.isArray(w.overlaps)?w.overlaps:[];return E.length===0&&P.length===0?l``:l`<span class="pa-target__signals">
      ${E.length>0?l`<details class="pa-target__scope" title=${E.join(`
`)}>
            <summary>scope ${E.length}</summary>
            <ul>
              ${E.map(Q=>l`<li><code>${Q}</code></li>`)}
            </ul>
          </details>`:""}
      ${P.length>0?l`<span
            class="pa-target__overlaps"
            title=${`\uACB9\uCE68: ${P.join(", ")}`}
            >겹침 ${P.join(", ")}</span
          >`:""}
    </span>`}function k(){let w=T?.qualified||[],E=T?.excluded||[];return l`<section class="pa-targets">
      <header class="pa-targets__header">
        <strong>분석 대상</strong>
        <span class="pa-targets__summary"
          >${R?"\uC870\uD68C \uC911\u2026":`\uC790\uACA9 ${w.length} \xB7 \uC81C\uC678 ${E.length}`}</span
        >
      </header>
      ${T&&w.length>0?l`<ul class="pa-targets__list">
            ${w.map(P=>l`<li class="pa-target">
                  <label class="pa-target__label">
                    <input
                      type="checkbox"
                      class="pa-target__check"
                      data-target-id=${P.id}
                      .checked=${A.has(P.id)}
                      @change=${Q=>h(P.id,Q.target.checked)}
                    />
                    <span class="pa-target__title">${P.title}</span>
                  </label>
                  <span class="pa-target__meta">
                    ${$(P)}
                    <span class="pa-target__route">${P.route}</span>
                    <span class="pa-target__lane"
                      >${pe(P.lane)}</span
                    >
                  </span>
                </li>`)}
          </ul>`:T&&w.length===0?l`<p class="pa-empty">자격 있는 분석 대상이 없습니다</p>`:""}
      ${T&&E.length>0?l`<details class="pa-targets__excluded">
            <summary>제외 대상 ${E.length}</summary>
            <ul class="pa-targets__list">
              ${E.map(P=>l`<li class="pa-target pa-target--excluded">
                    <label class="pa-target__label">
                      <input type="checkbox" disabled />
                      <span class="pa-target__title">${P.title}</span>
                    </label>
                    <span class="pa-target__meta">
                      <span class="pa-target__reason"
                        >${qm[P.reason]||P.reason}</span
                      >
                      <span class="pa-target__lane"
                        >${pe(P.lane)}</span
                      >
                    </span>
                  </li>`)}
            </ul>
          </details>`:""}
    </section>`}function O(w){let E=typeof w.session_id=="string"&&w.session_id.length>0,P=E?w.session_id:"";return l`<li class="pa-run-row">
      <span class="pa-run-row__status pa-run-row__status--${w.outcome}"
        >${Fm[w.outcome]||w.outcome}</span
      >
      <time class="pa-run-row__time"
        >${new Date(w.started_at||0).toLocaleString()}</time
      >
      <span class="pa-run-row__identity"
        >${w.runner||"?"} / ${w.model||"?"} / ${w.effort||"?"}</span
      >
      ${E?l`<code class="pa-session-id" title=${P}
            >${P.slice(0,8)}</code
          >`:l`<span class="pa-run-row__no-session">세션 없음</span>`}
      ${w.outcome==="failure"&&w.reason?l`<span class="pa-run-row__reason">${w.reason}</span>`:""}
      <span class="pa-run-row__actions">
        <button
          type="button"
          class="pa-run-row__monitor"
          @click=${()=>le(w.run_id,w)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-run-row__prompt"
          ?disabled=${w.prompt_saved!==!0||Z.has(w.run_id)}
          @click=${()=>{Ve(w.run_id)}}
        >
          프롬프트
        </button>
      </span>
    </li>`}function V(w){return l`<section class="pa-runs">
      <header class="pa-runs__header"><strong>최근 실행</strong></header>
      ${w.length>0?l`<ul class="pa-runs__list">
            ${w.map(E=>O(E))}
          </ul>`:l`<p class="pa-empty">실행 이력 없음</p>`}
    </section>`}function X(){return Y?l`<div
      class="pa-prompt-popup"
      role="dialog"
      aria-modal="true"
      aria-label="분석 프롬프트"
    >
      <div class="pa-prompt-popup__backdrop" @click=${Me}></div>
      <section class="pa-prompt-popup__panel">
        <header class="pa-prompt-popup__header">
          <div class="pa-prompt-popup__identity">
            <strong>분석 프롬프트</strong>
            <code>${Y.run_id}</code>
          </div>
          <div class="pa-prompt-popup__actions">
            <button type="button" @click=${()=>{Ue()}}>
              복사
            </button>
            <button
              type="button"
              class="pa-prompt-popup__close"
              aria-label="분석 프롬프트 팝업 닫기"
              @click=${Me}
            >
              ✕
            </button>
          </div>
        </header>
        <pre class="pa-prompt-popup__content" tabindex="0">
${Y.prompt}</pre
        >
      </section>
    </div>`:""}function se(w,E){let P=L(w,E),Q=C(),ke=P.filter(Ze=>Q.has(Ze)),J=z(P),xe=M(P),Le=Array.isArray(B().serial_lanes)?B().serial_lanes:[],gt=d.get(w)||ue(),ht=E.eligible!==!0||P.length<2||ke.length>0||J.length>0||xe||f;return l`<section class="pa-group" data-group-index=${String(w)}>
      <header class="pa-group__head">
        <span class="pa-group__confidence">${E.confidence}</span>
        ${E.categories.map(Ze=>l`<span class="pa-group__category">${Ze}</span>`)}
        ${xe?l`<span class="pa-group__applied">✓ 이미 반영됨</span>`:""}
        ${E.eligible===!0?"":l`<span class="pa-group__weak">근거 부족 — 제출 불가</span>`}
        ${J.length>0?l`<span class="pa-group__stale"
              >stale — ${J.join(", ")} 대기 영역 이탈</span
            >`:""}
      </header>
      <p class="pa-group__reason">${E.reason}</p>
      <ol class="pa-group__members">
        ${P.map((Ze,St)=>l`<li class="pa-member" data-bead-id=${Ze}>
              <span class="pa-member__seq">${St+1}</span>
              <span class="pa-member__title">${fe(Ze)}</span>
              ${Q.has(Ze)?l`<span class="pa-member__active">실행 중</span>`:""}
              <button
                type="button"
                class="pa-member__up"
                data-bead-id=${Ze}
                ?disabled=${St===0}
                aria-label=${`${Ze} \uC704\uB85C`}
                @click=${()=>Oe(w,E,Ze,-1)}
              >
                ↑
              </button>
              <button
                type="button"
                class="pa-member__down"
                data-bead-id=${Ze}
                ?disabled=${St===P.length-1}
                aria-label=${`${Ze} \uC544\uB798\uB85C`}
                @click=${()=>Oe(w,E,Ze,1)}
              >
                ↓
              </button>
              <button
                type="button"
                class="pa-member__exclude"
                data-bead-id=${Ze}
                aria-label=${`${Ze} \uC81C\uC678`}
                @click=${()=>q(w,E,Ze)}
              >
                ✕
              </button>
            </li>`)}
      </ol>
      <ul class="pa-group__evidence">
        ${E.evidence.map(Ze=>l`<li class="pa-evidence">
              <code>${Ze.path}</code>
              <span class="pa-evidence__locator">${Ze.locator}</span>
            </li>`)}
      </ul>
      <footer class="pa-group__foot">
        <button
          type="button"
          class="pa-group__restore"
          @click=${()=>ne(w)}
        >
          제안으로 되돌리기
        </button>
        <label class="pa-group__lane-field"
          >제출
          <select
            class="pa-group__lane"
            aria-label="제출 대상 레인"
            @change=${Ze=>{d.set(w,Ze.target.value),be()}}
          >
            ${Le.map((Ze,St)=>l`<option
                  value=${Ze.id}
                  ?selected=${gt===Ze.id}
                >
                  직렬 ${St+1}
                </option>`)}
          </select>
        </label>
        <button
          type="button"
          class="pa-group__submit"
          ?disabled=${ht}
          @click=${()=>{K(w,E)}}
        >
          제출
        </button>
      </footer>
    </section>`}function ce(w){let E=Array.isArray(w.issues)?w.issues:[],P=E.filter(ke=>ke.verdict==="parallel_ok").length,Q=E.filter(ke=>ke.verdict==="uncertain").length;return l`<div class="pa-summary">
      <span>parallel_ok ${P}</span>
      <span>uncertain ${Q}</span>
    </div>`}function je(){let w=Se&&!!U().job;if(w&&y===null){y=setInterval(()=>be(),1e3);return}!w&&y!==null&&(clearInterval(y),y=null)}function be(){let w=U();_&&w.settings.runner===_&&(_=null);let E=w.last_good?.result;je(),He(l`
        <div class="pa__container">
          <header class="pa__header">
            <div class="pa__title">병렬성 분석</div>
            <button
              type="button"
              class="pa__close"
              aria-label="닫기"
              @click=${_e}
            >
              ×
            </button>
          </header>
          <div class="pa__body">
            ${Fe()} ${rt(w)} ${k()}
            ${E?l`${E.groups.map((P,Q)=>se(Q,P))}
                ${E.groups.length===0?l`<p class="pa-empty">직렬 권장 그룹 없음</p>`:""}
                ${ce(E)}`:l`<p class="pa-empty">
                  아직 분석 결과가 없습니다 — [✳ 분석]을 눌러 시작하세요
                </p>`}
            ${V(b(w))}
          </div>
        </div>
        ${X()}
      `,i)}let Se=!1,ye=()=>{Se=!1,Y=null,N+=1,je()},st=w=>{w.target===w.currentTarget&&_e()};i.addEventListener("close",ye),i.addEventListener("cancel",ye),i.addEventListener("click",st);let ot=null;r&&r.subscribe&&(ot=r.subscribe(()=>{Se&&be()}));let F=null;n&&n.subscribe&&(F=n.subscribe(()=>{Se&&be()}));function ee(){Se||(Se=!0,be(),W(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""))}function _e(){Se&&(Se=!1,Y=null,N+=1,je(),typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:ee,close:_e,destroy(){Se=!1,y!==null&&(clearInterval(y),y=null),i.removeEventListener("close",ye),i.removeEventListener("cancel",ye),i.removeEventListener("click",st),ot&&(ot(),ot=null),F&&(F(),F=null),i.remove()}}}var Au=new Set(["sh","bash","zsh","dash","ksh"]),Su=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function Eu(e){let t=e.split("/");return t[t.length-1]||""}function Bm(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let r=t.slice(2).trim().split(/\s+/).filter(Boolean);if(r.length===0)return!1;let n=Eu(r[0]);if(n!=="env")return Au.has(n);let s=r.slice(1).find(o=>!o.startsWith("-")&&!o.includes("="));return s!==void 0&&Au.has(Eu(s))}function Um(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function Wm(e){let t=[],r=0;Su.lastIndex=0;for(let n of e.matchAll(Su)){let s=n.index;s>r&&t.push({text:e.slice(r,s),kind:"plain"}),t.push({text:n[0],kind:Um(n[0])}),r=s+n[0].length}return r<e.length&&t.push({text:e.slice(r),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function zm(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function Tu(e){let t=e.getWorkspacePath,r=e.fetchImpl||globalThis.fetch?.bind(globalThis),n=document.createElement("div");n.className="repo-ops-script-viewer-root",document.body.appendChild(n);let s=null,o="loading",a="",i="",u=0,d=null,f=!1;function _(I,W){return W?Wm(I).map(b=>b.kind==="plain"?b.text:l`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${b.kind}"
            >${b.text}</span
          >`):I}function y(){if(!s)return l``;let I=o==="ready"&&Bm(a),W=o==="ready"?a.split(`
`):[];return l`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${s.path}`}
    >
      <div
        class="repo-ops-script-viewer__backdrop"
        @click=${()=>B()}
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
              @click=${()=>B()}
            >
              ✕
            </button>
          </div>
        </header>
        <div class="repo-ops-script-viewer__body" aria-live="polite">
          ${o==="loading"?l`<div class="repo-ops-script-viewer__status">
                스크립트 불러오는 중…
              </div>`:o==="error"?l`<div
                  class="repo-ops-script-viewer__status repo-ops-script-viewer__status--error"
                >
                  ${i}
                </div>`:l`<div class="repo-ops-script-viewer__code" tabindex="0">
                  ${W.map((b,C)=>l`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${C+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${_(b,I)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function T(){He(y(),n)}async function A(){if(o!=="ready")return;let I=await Zt(a);oe(I?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",I?"success":"error")}function R(I){I.key==="Escape"&&s&&(I.preventDefault(),B())}function N(){f||(document.addEventListener("keydown",R),f=!0)}function Y(){f&&(document.removeEventListener("keydown",R),f=!1)}async function Z(I,W=null){let b=++u;N(),s={...I},d=W||(document.activeElement instanceof HTMLElement?document.activeElement:null),o="loading",a="",i="",T(),n.querySelector(".repo-ops-script-viewer__close")?.focus();let z=t?t():"";if(!z){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",T();return}if(!r){o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",T();return}let re="/api/repo-ops-script?workspace="+encodeURIComponent(z)+"&lane="+encodeURIComponent(I.lane)+"&base_sha="+encodeURIComponent(I.base_sha);try{let L=await r(re),M=await L.json().catch(()=>({}));if(b!==u)return;if((t?t():"")!==z){B();return}if(!L.ok||!M||M.ok!==!0){o="error",i=zm(M&&typeof M.error=="string"?M.error:""),T();return}s={lane:M.lane,base_sha:M.base_sha,path:M.path,base_ref:M.base_ref},a=String(M.content),o="ready",T()}catch{if(b!==u)return;o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",T()}}function B(){u+=1,Y(),s=null,a="",T();let I=d;d=null,I?.isConnected&&I.focus()}function U(){B(),n.remove()}return{open:Z,close:B,destroy:U}}function Cu(e){let t=e.queueStore,r=e.transport,n=e.onChanged||(()=>{}),s=e.onOpenScript;function o(){return t&&t.get()||{}}function a(){let b=o();return typeof b.revision=="number"?b.revision:0}function i(b){t&&b&&b.queue&&typeof b.queue=="object"&&t.set(b.queue)}function u(){let b=o().workspace_info;return b&&typeof b=="object"?b:{}}function d(b,C){return l`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${b}"
      >${C}</span
    >`}function f(b){if(typeof b!="number"||!Number.isFinite(b))return"";let C=b/6e4;return Number.isInteger(C)?`timeout ${C}\uBD84`:`timeout ${Math.round(b/1e3)}\uCD08`}function _(b){let C=f(b);return C?d("config",C):""}function y(b,C,z){return l`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${z.script}
      @click=${re=>{s&&s({lane:b,base_sha:C.base_sha,path:z.script,base_ref:C.base_ref},re.currentTarget)}}
    ></button>`}function T(){let b=o().repo_ops_opt_out;return{verify:b?.verify===!0,deploy:b?.deploy===!0}}function A(b,C){return l`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!C}
        @change=${z=>{Z(b,!z.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function R(b){let C=typeof b.base_sha=="string"?b.base_sha:"",z=`${b.source_path||"repo-ops/config.toml"} @ ${b.base_ref||"?"}${C?`@${C.slice(0,7)}`:""}`,re=T(),L=!!b.verify&&re.verify,M=!!b.deploy&&re.deploy;return l`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${z}</span>
      </p>
      <div
        class="worker-repo-ops__lane${L?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${b.verify?l`${y("verify",b,b.verify)}
              ${_(b.verify.timeout_ms)}
              ${L?d("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:l`선언 없음${d("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${L?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":b.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${b.verify?A("verify",re.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${M?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${b.deploy?l`${y("deploy",b,b.deploy)}
              ${_(b.deploy.timeout_ms)}
              ${M?d("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:l`선언 없음${d("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${M?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":b.deploy?l`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${b.deploy?A("deploy",re.deploy):""}
      </div>
    </section>`}function N(b){let C=b.repo_ops&&typeof b.repo_ops=="object"?b.repo_ops:null;return C&&(C.status==="resolved"||C.status==="absent")?R(C):C&&(C.status==="pending"||C.status==="error")?l`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${C.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":l`선언 읽기
              실패${C.error_code?l` — <code>${C.error_code}</code>`:""}`}
        </div>
      </section>`:l`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function Y(b){if(!r)return;let C=await r("worker-auto-repair-toggle",{on:b,expected_revision:a()});if(i(C),C&&C.conflict){let z=await r("worker-auto-repair-toggle",{on:b,expected_revision:a()});i(z)}n()}async function Z(b,C){if(!r)return;let z=await r("worker-repo-ops-opt-out-toggle",{kind:b,opted_out:C,expected_revision:a()});if(i(z),z&&z.conflict){let re=await r("worker-repo-ops-opt-out-toggle",{kind:b,opted_out:C,expected_revision:a()});i(re)}n()}let B={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function U(b,C,z){return l`<div class="worker-repo-ops__policy-group" data-policy=${z}>
      <div class="worker-repo-ops__policy-label">${b}</div>
      <ul class="worker-repo-ops__policy-list">
        ${C.map(re=>l`<li data-token=${re}>
              ${B[re]||re}
            </li>`)}
      </ul>
    </div>`}function I(b){return l`<div
      class="worker-repo-ops__policy-group"
      data-policy="resolution-ladder"
    >
      <div class="worker-repo-ops__policy-label">해결 사다리</div>
      <ol class="worker-repo-ops__policy-list">
        ${b.map(C=>{let z=[B[C.trigger]||C.trigger];return Number.isInteger(C.attempts_per_operation_attempt)?z.push(`operation\uB2F9 ${C.attempts_per_operation_attempt}\uD68C`):Number.isInteger(C.attempts)?z.push(`${B[C.budget]||C.budget} ${C.attempts}\uD68C`):Number.isInteger(C.sessions_per_user_action)&&z.push(`${C.sessions_per_user_action}\uD68C`,B[C.user_actions]||C.user_actions),C.applies_when&&z.push(B[C.applies_when]||C.applies_when),l`<li data-token=${C.id}>
            <strong>${B[C.id]||C.id}</strong>
            <span>${z.filter(Boolean).join(" \xB7 ")}</span>
          </li>`})}
      </ol>
    </div>`}function W(){let b=o(),C=b.auto_repair!==!1,z=b.repo_operation_policy&&typeof b.repo_operation_policy=="object"?b.repo_operation_policy:null,re=Array.isArray(b.repo_operations)?b.repo_operations:[],L=re.find(de=>de.state==="repairing"),M=re.filter(de=>de.state==="failed"||de.state==="repairing"),ue=M.length?Math.min(...M.map(de=>typeof de.repair?.remaining=="number"?de.repair.remaining:0)):z?.auto_repair?.resolution_ladder?.find(de=>de.id==="auto_repair_session")?.attempts??1,fe=Array.isArray(z?.auto_repair?.resolution_ladder)?z.auto_repair.resolution_ladder:[];return l`<section
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
          .checked=${C}
          @change=${de=>{Y(de.target.checked)}}
        />
        검증·배포 실패를 자동으로 해결 시도
      </label>
      <div class="worker-repo-ops__repair-state">
        <span
          class="worker-repo-ops__repair-value"
          data-seam="auto-repair-value"
          >${C?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}</span
        >
        <span
          class="worker-repo-ops__repair-budget"
          data-seam="auto-repair-budget"
          >남은 자동 해결 ${ue}회</span
        >
        <span
          class="worker-repo-ops__repair-session"
          data-seam="auto-repair-session"
          >${L?`\uD574\uACB0 \uC138\uC158 \uC2E4\uD589 \uC911 \xB7 ${L.repair?.owner_bead||L.operation_id}`:"\uC2E4\uD589 \uC911\uC778 \uD574\uACB0 \uC138\uC158 \uC5C6\uC74C"}</span
        >
      </div>
      ${z?l`<details
            class="worker-repo-ops__policy"
            data-seam="policy-lists"
          >
            <summary>
              Worker 자동 처리 기준
              <span class="worker-repo-ops__policy-count"
                >자동 ${(z.worker_automatic||[]).length} · 해결 사다리
                ${fe.length} · 금지
                ${(z.never_automatic||[]).length}</span
              >
            </summary>
            ${U("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",z.worker_automatic||[],"worker-automatic")}
            ${z.supported===!1||z.schema_version!==2?l`<div
                  class="worker-repo-ops__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uD574\uACB0\uC774 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${z.schema_version})`}
                </div>`:I(fe)}
            ${U("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",z.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}return{template(){return l`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언 · 자동 해결
        </summary>
        ${N(u())} ${W()}
      </details>`}}}var Ou=20,Hm=5,Gm=new Set(["failed","repairing","running","queued","retry_pending"]),Ru={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"},Iu={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8"};function Vm(e,t,r=Ou){let n=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||n.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||n.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return n.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),n.slice(0,Math.max(0,r))}function Km(e){if(e.type==="cleanup")return!0;let t=e.operation;return Gm.has(t.state)&&!t.dismissed&&!t.superseded_by}function Ym(e,t,r={}){let n=Vm(e,t,1/0),s=r.expanded===!0?Ou:Hm,o=new Set(n.slice(0,s)),a=n.filter(i=>o.has(i)||Km(i));return{visible:a,hidden:n.length-a.length}}function Lu(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function Zm(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"repairing":return"\uC790\uB3D9 \uD574\uACB0 \uC911";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function Mu(e){let t=e.filter(r=>r.value);return t.length===0?"":l`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(r=>l`<div>
            <dt>${r.term}</dt>
            <dd>${r.value}</dd>
          </div>`)}
    </dl>
  </details>`}function Pu(e,t="",r=!1){return!e&&!t?"":l`<p
    class="worker-ev__explain${r?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?l`<br />${t}`:""}
  </p>`}function Xm(e){if(e.state!=="failed"||e.superseded_by)return"";let t=e.repair||{},r=typeof t.remaining=="number"?t.remaining:0,n=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"",s=r<=0;return l`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
      data-operation-id=${e.operation_id}
      data-failure-kind=${e.failure_kind||""}
      title="해결 세션을 엽니다"
    >
      ${Object.hasOwn(Iu,n)?Iu[n]:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC2DC\uC791"}
    </button>
    <span class="worker-ev__btn-sub"
      >${s?"\uC790\uB3D9 \uD574\uACB0\uC744 \uB2E4 \uC37C\uC2B5\uB2C8\uB2E4 \xB7 \uB20C\uB7EC\uC11C \uD574\uACB0 \uC138\uC158\uC744 \uC5FD\uB2C8\uB2E4":`\uC790\uB3D9 \uD574\uACB0 ${r}\uD68C\uAC00 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4`}</span
    >
    ${t.attempt_id?l`<button
          type="button"
          class="worker-ev__btn worker-repo-op__session"
          data-attempt-id=${t.attempt_id}
        >
          해결 세션 보기
        </button>`:""}
    ${e.dismissed?"":l`<button
          type="button"
          class="worker-ev__btn worker-repo-op__dismiss"
          data-operation-id=${e.operation_id}
          title="사람이 확인한 실패로 접수합니다 — 기록은 그대로 남고 해결 필요 집계에서만 빠집니다"
        >
          기록 닫기
        </button>`}
  </div>`}function Qm(e){let t=e.operation,r=t.state==="failed",n=t.failure?t.failure.code:"";return l`<li
    class="worker-ev"
    data-operation-id=${t.operation_id}
    data-state=${t.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?kt(e.at):""}
      >${Xs(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${Lu(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(Ru,t.kind)?Ru[t.kind]:t.kind}</span
        >
        <span class="worker-ev__meta"
          >${t.target_base}@${Ys(t.target_sha)}${typeof t.elapsed_ms=="number"?` \xB7 ${Zs(t.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${Lu(e)}"
          >${Zm(e)}</span
        >
        ${t.dismissed?l`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${t.superseded_by?l`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
      </div>
      ${r?Pu(Pc(t.failure_kind,n)):""}
      ${Xm(t)}
      ${Mu([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?n:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${Ys(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function Jm(e){let t=e.cleanup,r=Hr(t.step);return l`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?kt(e.at):""}
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
        ${Rc(t.step).map(n=>l`<li
              class="worker-step worker-step--${n.state}"
              data-step=${n.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${n.label}</span>
            </li>`)}
      </ol>
      ${Pu(ro(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
      <div class="worker-ev__acts">
        <button
          type="button"
          class="worker-ev__btn worker-ev__btn--warn worker-cleanup__resume"
          data-bead-id=${t.bead_id}
        >
          정리 재개${r?` \u2014 ${r} \uB2E8\uACC4\uBD80\uD130`:""}
        </button>
        ${t.repair_eligible?l`<button
              type="button"
              class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
              data-operation-id=${`cleanup:${t.bead_id}`}
              data-failure-kind=${t.failure_code||t.reason||""}
            >
              실패 해결 세션 시작
            </button>`:""}
      </div>
      ${Mu([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function eg(e){let t=typeof e.hidden=="number"?e.hidden:0,r=e.expanded===!0;return l`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
    ${e.events.length===0?l`<div class="worker-repo-drawer__empty">기록 없음</div>`:l`<ul class="worker-rail">
          ${e.events.map(n=>n.type==="cleanup"?Jm(n):Qm(n))}
        </ul>`}
    ${t>0||r?l`<div class="worker-repo-drawer__more">
          <button
            type="button"
            class="worker-ev__btn"
            data-seam="repo-ops-more"
          >
            ${r?"\uC811\uAE30":`\uC774\uC804 ${t}\uAC1C \uB354 \uBCF4\uAE30`}
          </button>
        </div>`:""}
  </section>`}function Du(e,t={}){let r=null;function n(){if(r===null){He(l``,e);return}let a=Ym(r.operations,r.cleanup_failures,{expanded:r.expanded});He(eg({events:a.visible,hidden:a.hidden,expanded:r.expanded,repo:r.repo}),e)}e.addEventListener("click",a=>{let i=a.target;if(i?.closest?.('[data-seam="repo-ops-close"]')){o();return}i?.closest?.('[data-seam="repo-ops-more"]')&&r&&(r.expanded=!r.expanded,n())});function s(a){r={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:!1},n()}function o(){r!==null&&(r=null,n(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>r!==null,refresh(a){r&&(r={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:r.expanded},n())}}}var tg="tab:worker:ready",rg="tab:worker:blocked",ng="tab:worker:in-progress",sg="tab:worker:closed",oo=1,Nu=5;function qu(e){return Fs(e).path.length>0}var Uu="beads-ui.worker.candidate-filter",Ra={show_blocked:!1,spec:"all"};function og(){try{let e=window.localStorage.getItem(Uu);if(!e)return{...Ra};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Ra};let r=t.spec;return{show_blocked:t.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...Ra}}}function ag(e){try{window.localStorage.setItem(Uu,JSON.stringify(e))}catch{}}function ig(e,t){let r=i=>t.show_blocked||!i.blocked,n=i=>t.spec==="all"||(t.spec==="with"?i.has_spec:!i.has_spec),s=[],o=0,a=0;for(let i of e){let u=r(i),d=n(i);u&&d?s.push(i):!u&&d?o+=1:u&&!d&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var lg=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Wu="bdui.worker.candidate_sort",cg=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],ao="spec";function ug(){try{let e=window.localStorage.getItem(Wu);return e==="board"||e==="created"||e==="spec"?e:ao}catch{return ao}}function dg(e){try{window.localStorage.setItem(Wu,e)}catch{}}var zu="bdui.worker.done-range";function pg(){try{let e=window.localStorage.getItem(zu);return Ut(e)?e:Nt}catch{return Nt}}function fg(e){try{window.localStorage.setItem(zu,e)}catch{}}var _g="(max-width: 640px)",Hu="beads-ui.worker.lane-collapsed",Gn={queue:!0,done:!0};function mg(){try{let e=window.localStorage.getItem(Hu);if(!e)return{...Gn};let t=JSON.parse(e);return!t||typeof t!="object"?{...Gn}:{queue:typeof t.queue=="boolean"?t.queue:Gn.queue,done:typeof t.done=="boolean"?t.done:Gn.done}}catch{return{...Gn}}}function gg(e){try{window.localStorage.setItem(Hu,JSON.stringify(e))}catch{}}function Fu(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let r=typeof t.title=="string"?t.title:t.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function bg(e,t,r){let n=Array.isArray(e)?e.slice():[];return t==="created"?n.sort(Fr):(n.sort(ds(r)),t==="board"?n:[...n.filter(qu),...n.filter(s=>!qu(s))])}function hg(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function yg(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function vg(e){let t=e?.blocked_info;if(t&&typeof t=="object"){let s=Array.isArray(t.blockers)?t.blockers.filter(o=>typeof o=="string"&&o.length>0):[];return s.length>0?`\u{1F512} ${s.join(", ")}`:"\u{1F512} blocked"}let n=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(s=>{if(typeof s=="string")return s;if(!s||typeof s!="object")return"";let o=s.type??s.dependency_type;return o!==void 0&&o!=="blocks"?"":s.depends_on_id||s.id||""}).filter(Boolean);return n.length>0?`\u{1F512} ${n.join(", ")}`:"\u{1F512} blocked"}function ju(e){switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function wg(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function kg(e,t=null){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let r=e.slice(19);if(r.length===0)return null;switch(r){case"gating":{let n=t?.repair_sessions_used;return typeof n=="number"&&n>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911"}case"repairing":return"\uC790\uB3D9 \uC218\uC815 \uC911";case"waiting_repair_pr":return"\uC218\uC815 PR \uB300\uAE30 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function $g(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function xg(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"implementation review \uB300\uAE30",live:!1,alert:!1};case"reviewing":return{badge:"implementation review \uC911",live:!0,alert:!1};case"revising":return{badge:"review \uC218\uC815 \uC911 \xB7 1\uD68C",live:!0,alert:!1};case"failed":{let r=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:r.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${r.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",live:!1,alert:!0}}default:return null}}function Ia(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function Ag(e){if(!e||typeof e!="object")return null;let t=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,n=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,s=n&&typeof n.pr_number=="number"?n.pr_number:null,o="";switch(e.phase){case"gating":o=t>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"repairing":o="\uC790\uB3D9 \uC218\uC815 \uC911";break;case"waiting_repair_pr":o=s?`\uC218\uC815 PR #${s} \uB300\uAE30 \uC911`:"\uC218\uC815 PR \uB300\uAE30 \uC911";break;case"merging":o=e.subject_role==="repair"?s?`\uC218\uC815 PR #${s} \uBA38\uC9C0 \uC911`:"\uC218\uC815 PR \uBA38\uC9C0 \uC911":"\uBA38\uC9C0 \uC911";break;case"cleaning":o="\uB9C8\uBB34\uB9AC \uC911";break;case"paused":o="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":o="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let a=[o,`\uC790\uB3D9 \uC218\uC815 \uD69F\uC218 ${t}/${r}`];return e.head_sha&&a.push(`head ${e.head_sha}`),e.base_sha&&a.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&a.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`),e.active_attempt_id&&a.push(`attempt ${e.active_attempt_id}`),n&&typeof n.bead_id=="string"&&a.push(`repair ${n.bead_id}`),e.evidence&&a.push(e.evidence),e.log_path&&a.push(e.log_path),{badge:o,title:a.join(`
`),alert:e.phase==="needs_human",lock_actions:e.phase!=="paused"&&e.phase!=="needs_human",repair_pr_url:n&&typeof n.pr_url=="string"?n.pr_url:"",repair_pr_number:s}}function Bu(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(r=>typeof r=="string"&&r.length>0):[]}function Sg(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",r=(n,s={})=>{let o=[s.title||"",t].filter(Boolean);return{label:n,title:o.join(`
`),live:s.live===!0,alert:s.alert===!0}};return e.continuation_required?r("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0}):e.merge_step?e.gate?.tier==="merged"?r("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):r("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0}):e.conflict_badge?r(e.conflict_badge,{live:e.conflict_live===!0}):e.head_review&&e.head_review.state!=="failed"?r("\uB9AC\uBDF0 \uC9C4\uD589 \uC911",{title:e.head_review.badge,live:e.head_review.live===!0}):e.recovery?.lock_actions?r(e.recovery.badge,{title:e.recovery.title,live:!0}):e.cleanup_failed?r(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0}):e.base_exception?r("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0}):e.conflicting?r("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0}):e.gate?.reason==="base_behind"?r("base \uAC31\uC2E0 \uD544\uC694",{alert:!0}):e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale"?r("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2C8\uAC70\uB098 \uC870\uC0C1 \uD655\uC778\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uB85C, \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB9AC\uBDF0\uD574\uC57C \uBA38\uC9C0\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",alert:!0}):e.gate?.reason==="spec_id_missing"?r("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0}):e.gate?.reason==="review_receipt_invalid"?r("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0}):Bu(e.receipt_check).length>0?r("\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694",{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${Bu(e.receipt_check).join(", ")}`,alert:!0}):e.head_review?.state==="failed"?r("\uB9AC\uBDF0 \uC2E4\uD328",{title:e.head_review.failure_reason||"",alert:!0}):e.recovery?r(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?r("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?r(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${ju(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?r(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${ju(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?r(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?r("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?r("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?r("\uB2EB\uD798",{alert:!0}):e.activity?r("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?r("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?r("\uD655\uC778 \uC911"):e.gate?.gate_badge?r(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function Eg(e,t,r,n,s=null,o=null,a=null,i=!1,u=null,d=!0,f=null,_=null,y=null,T={},A=!1,R=!1,N={}){let Y=!!u&&u.position>0,Z=!!u?.continuation_action&&u.continuation_action.continuation===null,B=!!u&&u.active===!0,U=u&&u.failure||null,I=kg(u?u.waiting:null,y),W=r[e]||null,b=W&&W.gate?W.gate:null,C=W&&W.pr?W.pr:null,z=Ag(y),re=$g(u?u.resolution:null),L=xg(u?u.head_review:null),M=u&&u.head_review||null,ue=u&&u.authority||null,fe=!!M&&["pending","reviewing","revising"].includes(M.state),de=Y&&!B&&(M?.state==="failed"||!ue||ue.source==="automatic"&&!R),Be=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":re?re.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":I,Qe=!!b&&b.base_badge==="\uCDA9\uB3CC",Ve=!!b&&b.enabled===!0,Me=Un({bead_id:e,merge_sha:N.merge_sha,cleanup_cursor:N.cleanup_cursor,merge_progress:o&&o.merge_progress?o.merge_progress:null,cleanup_failed:n,repo_operations:N.repo_operations}),Ue=to(Me),le=!!n&&["child_sweep","branch_cleanup","parent_close"].includes(n.step)&&!!b&&b.tier==="merged",Ae=i&&!!n&&!!b&&b.tier==="merged",Ie=de&&(Ve||Qe||b?.reason==="base_behind"||b?.reason==="review_receipt_missing"||b?.reason==="review_receipt_stale"||le||Ae),Ee=i&&Qe&&d===!1,he=pr(T,e,{external:i,merge_active:B||Me?.step==="merge",merge_queued:Y,conflict_active:!!a,cleanup_active:Ue,merged:!!n||b?.tier==="merged"}),We=!!he.operation,et=!le&&!!n&&n.step==="repo_operations",Te=Sg({continuation_required:Z,merge_step:Me,conflict_badge:Be,conflict_live:re?.live===!0||a==="running",head_review:M&&L?{...L,state:M.state,failure_reason:M.failure_reason}:null,recovery:z,cleanup_failed:n,cleanup_label:n?Hr(n.step):null,base_exception:_,conflicting:Qe,gate:b,receipt_check:W&&W.receipt_check?W.receipt_check:null,queue_failure:U,auto_skip:f,queued:Y,queue_active:B,queue_position:u?u.position:0,activity:Be?null:o&&o.activity||null}),tt=Te?.live===!0&&Te.title?l`<span title=${Te.title}>${Te.label}</span>`:Te?.label||null;return{id:e,title:i?l`${t}<span class="muted"> · 세션</span>`:t,reason:n&&Me?.active!==!0?eo(n.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:A,external:i,pr_number:C&&typeof C.number=="number"?C.number:null,pr_url:C&&typeof C.url=="string"?C.url:"",completion_badge:Te?.live!==!0&&Te?.title?Te.label:null,completion_title:Te?.title||"",completion_repair_pr_url:z?z.repair_pr_url:"",completion_repair_pr_number:z?z.repair_pr_number:null,badges:tt?[tt]:[],live_badge:Te?.live===!0?tt:null,usage:s,alert:Te?.alert===!0,merge_action:b?.tier==="merged"&&!le&&!Ae||et?!1:!Y||Z||de,timeline_action:et,cancel_action:Y&&!Z,cancel_enabled:(!B||fe)&&!(z&&z.lock_actions),cancel_title:z&&z.lock_actions?`${z.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:B&&!fe?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":fe?"review \uC9C4\uD589\uC744 \uCDE8\uC18C\uD558\uACE0 \uBA38\uC9C0 \uAD8C\uD55C\uC744 \uD3D0\uAE30\uD569\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:he,discard_action:he.action,merge_step:Me,discard_enabled:he.enabled,discard_title:he.title,merge_enabled:!Me&&!a&&!We&&!_&&!(z&&z.lock_actions)&&!Ee&&!et&&(Ve||Qe||b?.reason==="base_behind"||b?.reason==="review_receipt_missing"||b?.reason==="review_receipt_stale"||le||Ae||Ie),merge_label:Z?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":le||Ae?"\uC815\uB9AC \uC7AC\uAC1C":Qe&&!Me&&!le?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":b?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":b?.reason==="review_receipt_missing"||b?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":de?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:We?he.error?`\uD3D0\uAE30 \uC2E4\uD328: ${he.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${he.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Z?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Me?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${Me.label}`:Ae?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Ee?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":le?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Qe?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":b?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":b?.reason==="review_receipt_missing"||b?.reason==="review_receipt_stale"?"\uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":b?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":Ve?`\uBA38\uC9C0 (${b.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:b&&b.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${b&&b.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function La(e,t={}){let{transport:r,issueStores:n,queueStore:s,analysisStore:o,sessionLogStore:a,uiOrderStore:i,gotoIssue:u,getWorkspacePath:d,doneRange:f,onDoneRangeChange:_}=t,y=n?fs(n,i):null,T=ms({transport:r,uiOrderStore:i}),A=null,R=[],N=og(),Y=null,Z=ug(),B=Ut(f)?f:pg(),U=new Map;function I(){let c=lr.find(m=>m.value===B);return c?c.label:"\uC624\uB298"}let W=mg(),b=!1,C=new Set,z=new Set,re=new Set,L=new Set,M=[],ue=document.createElement("div");ue.className="worker-console";let fe=document.createElement("div");fe.className="worker-top";let de=document.createElement("div");de.className="worker-drawer-overlay",de.hidden=!0;let Be=document.createElement("div");Be.className="worker-drawer-overlay__backdrop";let Qe=document.createElement("div");Qe.className="worker-drawer-host";let Ve=document.createElement("div");Ve.className="worker-drawer-host",Ve.hidden=!0,de.append(Be,Qe,Ve);let Me=document.createElement("div");Me.className="worker-lanes-host",ue.append(fe,de,Me),e.appendChild(ue);let Ue=null,le=null,Ae=qs(Qe,{transport:r,sessionLogStore:a,onClose:()=>{Ue=null,le=null,de.hidden=!0,J()}}),Ie=Du(Ve,{onClose:()=>{Ve.hidden=!0,de.hidden=!0,J()}}),Ee=Tu({getWorkspacePath:d||(()=>"")}),he=d&&d()||"",We=Cu({queueStore:s,transport:r,onChanged:()=>J(),onOpenScript:(c,m)=>{Ee.open(c,m)}}),et=o?xu(ue,{queueStore:s,analysisStore:o,transport:r,getWorkspacePath:d,onOpenTranscript:(c,m)=>Je(c,m)}):null;function Te(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:oo,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function tt(){let c=Te(),m=typeof c.serial_lane_count=="number"&&Number.isInteger(c.serial_lane_count)&&c.serial_lane_count>0?Math.min(c.serial_lane_count,5):0,S=Array.isArray(c.serial_lanes)?c.serial_lanes:[],H=[];for(let $e of S){if(H.length>=m)break;!$e||typeof $e.id!="string"||!/^s[1-5]$/.test($e.id)||!Array.isArray($e.entries)||H.push({id:$e.id,label:`\uC9C1\uB82C ${$e.id.slice(1)}`,count:$e.entries.length})}return H.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(c.queue)?c.queue:[]).length},...H]}function K(c){if(!Y||!c.some(S=>S.id===Y))return null;let m=tt();return m?{bead_id:Y,lanes:m}:null}function q(){let c=Te();return typeof c.revision=="number"?c.revision:0}function ne(c){c&&c.queue&&s&&s.set(c.queue)}function Oe(){let c=Te().queue;return Array.isArray(c)?c.length:0}async function Fe(c,m,S){if(!r)return;let H=()=>({bead_id:c,...m==="parallel"?{}:{lane:m},...S===void 0?{}:{index:S},expected_revision:q()}),ae=await r("worker-queue-place",H());ne(ae),ae&&ae.conflict&&await r("worker-queue-place",H()).then(ne)}async function ze(c,m,S){if(!r)return;let H=()=>({bead_id:c,...m==="parallel"?{}:{lane:m},to_index:S,expected_revision:q()}),ae=await r("worker-queue-reorder",H());ne(ae),ae&&ae.conflict&&await r("worker-queue-reorder",H()).then(ne)}async function Ce(c){if(!r)return;let m=await r("worker-queue-remove",{bead_id:c,expected_revision:q()});ne(m),m&&m.conflict&&await r("worker-queue-remove",{bead_id:c,expected_revision:q()}).then(ne)}async function ct(c){if(!r||!c)return;let m=await r("worker-attempt-pause",{attempt_id:c});m&&m.paused===!1&&m.reason&&oe(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${m.reason}`,"error",2400)}async function Ye(c){if(!r||!c)return;let m=await sn();if(m===null)return;let S=async(ae={})=>await r("worker-attempt-resume",{attempt_id:c,expected_revision:q(),...m!==""?{instructions:m}:{},...ae}),H=await S();ne(H),H&&H.conflict&&(H=await S(),ne(H)),H=await mr(H,(ae,$e)=>S({continuation:ae,decision_token:$e}),{onResult:ne,refresh:()=>S()}),H&&H.resumed===!1&&!H.conflict&&H.reason&&oe(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${H.reason}`,"error",2400)}async function G(c){if(!r||!c)return;let m=await r("worker-attempt-dismiss",{attempt_id:c,expected_revision:q()});ne(m),m&&m.conflict&&(m=await r("worker-attempt-dismiss",{attempt_id:c,expected_revision:q()}),ne(m)),m&&m.dismissed===!1&&!m.conflict&&m.reason&&oe(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${m.reason}`,"error",2400)}async function te(c,m,S=!0){if(!r)return null;let H=r,ae=await H(c,{...m,expected_revision:q()});return ne(ae),ae&&ae.conflict&&S&&(ae=await H(c,{...m,expected_revision:q()}),ne(ae)),ae}async function De(c){if(!r||!c)return;let m=Te().merge_queue?.find(H=>H.bead_id===c)?.continuation_action;if(m?.mismatch&&m.continuation===null){await pe(c,m.mismatch);return}C.add(c),J();let S;try{S=await te("worker-merge-queue-add",{bead_id:c})}finally{C.delete(c),J()}!S||S.conflict||S.applied||oe(wg(S.reason),"error",2400)}async function rt(c){if(!(!r||!c||z.has(c))){z.add(c),J();try{let m=await r("worker-cleanup-retry",{bead_id:c,expected_revision:q()});ne(m),m&&!m.retried&&!m.conflict&&m.reason&&oe(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${m.reason}`,"error",2400)}finally{z.delete(c),J()}}}async function pe(c,m){let S=await mr({continuation_mismatch:m},(ae,$e)=>te("worker-merge-queue-add",{bead_id:c,continuation:ae,decision_token:$e},!1)),H=S?.queue?.merge_queue?.find(ae=>ae.bead_id===c)?.continuation_action;if(S?.applied!==!0&&H?.continuation===null&&H.mismatch){await pe(c,H.mismatch);return}S&&S.applied===!1&&!S.conflict&&oe("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function h(c){if(!r)return;let m=await te("worker-merge-auto-toggle",{on:c});!m||m.conflict||oe(c?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",c?"success":"info",2400)}async function $(c){if(!r||!c)return;let m=await te("worker-merge-queue-remove",{bead_id:c});m&&!m.conflict&&!m.applied&&m.reason==="merge_active"&&oe("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function k(){await te("worker-merge-queue-remove",{all:!0})}async function O(c,m=null,S="unmerged",H=null){if(!r||!c)return;let ae=Fn(c,S);if(!(!!H||typeof globalThis.confirm!="function"||globalThis.confirm(ae)))return;let me=await r("worker-discard",{bead_id:c,...m?{attempt_id:m}:{},...H?{operation_id:H}:{},expected_revision:q()});if(ne(me),me&&me.conflict&&(me=await r("worker-discard",{bead_id:c,...m?{attempt_id:m}:{},...H?{operation_id:H}:{},expected_revision:q()}),ne(me)),me&&me.discarded===!0){oe(Qs(me),"success",5e3);return}if(me&&me.reason){oe(`\uD3D0\uAE30 \uC2E4\uD328: ${me.reason}`,"error",2800);return}if(me&&me.accepted&&me.pending==="merged_revert"){oe("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(me&&me.accepted&&!me.discarded){oe(`\uD3D0\uAE30 \uC9C4\uD589: ${me.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}me&&!me.conflict&&oe("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function V(c,m,S){if(!(!r||!m||!S||L.has(m))){L.add(m),J();try{let H=await r(c,{bead_id:m,action_id:S,expected_revision:q()});ne(H),H?.conflict?oe("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!H?.ok&&H?.reason&&oe(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(H.reason)}`,"error",2800)}finally{L.delete(m),J()}}}async function X(c,m){if(!r||!m||re.has(m))return;re.add(m),J();let S;try{let H=async(ae={})=>await r(c,{bead_id:m,expected_revision:q(),...ae});S=await H(),ne(S),S&&S.conflict&&(S=await r(c,{bead_id:m,expected_revision:q()}),ne(S)),c==="worker-revise-fix"&&(S=await mr(S,(ae,$e)=>H({continuation:ae,decision_token:$e}),{onResult:ne,refresh:()=>H()}))}finally{re.delete(m),J()}if(!(!S||S.conflict)){if(S.ok){oe(c==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}oe(`\uCC98\uBD84 \uAC70\uBD80: ${S.reason||""}`,"error",3e3)}}async function se(c){if(!r)return;let m=await r("worker-automation-toggle",{on:c,expected_revision:q()});ne(m),m&&m.conflict&&await r("worker-automation-toggle",{on:c,expected_revision:q()}).then(ne)}async function ce(c){if(!r||!c)return;let m=await r("worker-repo-operation-repair",{operation_id:c});if(ne(m),m&&m.ok===!1){oe(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${m.reason||""}`,"error",3e3);return}m&&m.ok===!0&&oe("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function je(c){if(!r||!c)return;let m=await r("worker-repo-operation-dismiss",{operation_id:c});ne(m),m&&m.ok===!1&&oe(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${m.reason||""}`,"error",3e3)}async function be(c){if(!r||!Number.isFinite(c))return;let m=Math.max(oo,Math.floor(c)),S=await r("worker-queue-set-slots",{slots:m,expected_revision:q()});ne(S),S&&S.conflict&&await r("worker-queue-set-slots",{slots:m,expected_revision:q()}).then(ne)}async function Se(c){if(!r||!Number.isInteger(c)||c<1||c>Nu)return;let m=Te(),S=(Array.isArray(m.serial_lanes)?m.serial_lanes:[]).slice(c).reduce(($e,me)=>$e+(Array.isArray(me?.entries)?me.entries.length:0),0),H=()=>({count:c,expected_revision:q()}),ae=await r("worker-queue-set-serial-lane-count",H());ne(ae),ae&&ae.conflict&&(ae=await r("worker-queue-set-serial-lane-count",H()),ne(ae)),ae&&ae.applied&&S>0&&oe(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${S}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}function ye(){let c=Te(),m=y?y.selectBoardColumn(tg,"ready"):[],S=y?y.selectBoardColumn(rg,"blocked"):[],H=y?y.selectBoardColumn(sg,"closed"):[],ae=y?y.selectBoardColumn(ng,"in_progress"):[],$e=new Map;for(let v of ae){let D=yg(v);if(!D)continue;let ie=$e.get(D);ie?ie.push(v):$e.set(D,[v])}let me=v=>{let D=_s($e.get(v)||[]);return D?D.title||D.id:null},Ke=c.bead_titles||{},nt=new Map;for(let[v,D]of Object.entries(Ke))typeof D=="string"&&D.length>0&&nt.set(v,D);for(let v of[...m,...S])nt.set(v.id,v.title||v.id);let Ne=c.bead_times&&typeof c.bead_times=="object"&&!Array.isArray(c.bead_times)?c.bead_times:{},p=c.bead_labels&&typeof c.bead_labels=="object"&&!Array.isArray(c.bead_labels)?c.bead_labels:{},g=new Map;for(let[v,D]of Object.entries(p))Array.isArray(D)&&g.set(v,Ea(D));for(let v of[...m,...S]){let D=v.labels;Array.isArray(D)&&!g.has(v.id)&&g.set(v.id,Ea(D))}let x=new Map,j=o?.get()?.last_good?.result?.groups;for(let v of Array.isArray(j)?j:[]){if(v?.eligible!==!0||!Array.isArray(v.members))continue;let D=v.members.map(Ge=>{let pt=(Array.isArray(c.serial_lanes)?c.serial_lanes:[]).find(Dt=>Dt.entries.some(Tt=>Tt.bead_id===Ge));return pt?pt.id:null});if(!(D.every(Ge=>Ge!==null)&&new Set(D).size===1))for(let Ge of v.members)x.set(Ge,v.members.filter(pt=>pt!==Ge))}let we=c.bead_blocked_by&&typeof c.bead_blocked_by=="object"&&!Array.isArray(c.bead_blocked_by)?c.bead_blocked_by:{},ge=new Map;for(let[v,D]of Object.entries(Ne))D&&typeof D=="object"&&ge.set(v,D);for(let v of[...m,...S])ge.set(v.id,{created_at:v.created_at,updated_at:v.updated_at});let Re=v=>ge.get(v)||{},qe=c.pr_wait||[],_t=c.pr_observations||{},ir=c.pr_activity||{},Vr=c.cleanup_failed||{},Vn=Object.entries(Vr).map(([v,D])=>({bead_id:v,step:D&&D.step?D.step:"",reason:D&&D.reason?D.reason:"",at:D&&typeof D.at=="number"?D.at:null,detail:D&&typeof D.detail=="string"?D.detail:null,output_tail:D&&typeof D.output_tail=="string"&&D.output_tail?D.output_tail:void 0,log_path:D&&typeof D.log_path=="string"&&D.log_path?D.log_path:void 0,retry_count:D&&typeof D.retry_count=="number"&&Number.isInteger(D.retry_count)&&D.retry_count>0?D.retry_count:0,failure_code:D&&typeof D.failure_code=="string"?D.failure_code:void 0,subject_id:D&&typeof D.subject_id=="string"?D.subject_id:void 0,repair_eligible:!!(D&&D.repair_eligible),repair:D&&D.repair?D.repair:void 0})),pn=c.queue||[],fn=new Set([...pn.map(v=>v.bead_id),...(Array.isArray(c.serial_lanes)?c.serial_lanes:[]).flatMap(v=>(Array.isArray(v?.entries)?v.entries:[]).map(D=>D.bead_id)),...qe.map(v=>v.bead_id),...c.done.map(v=>v.bead_id)]),Kn=new Set(S.map(v=>v.id)),Pe=i?i.get()?.order||{}:{},dt=new Set,Kr=[];for(let v of[...m,...S])fn.has(v.id)||dt.has(v.id)||hg(v)||(dt.add(v.id),Kr.push(v));R=bg(Kr,Z,Pe);let sd=c.admission||{},Da=v=>{let D=sd[v];if(!D)return"";if(D.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let ie=typeof D.reason=="string"?D.reason:"",Ge=ie.indexOf(":");return Ge>0&&Ge<ie.length-1?`\u26D4 ${ie.slice(0,Ge)} (${ie.slice(Ge+1)})`:`\u26D4 ${ie}`},od=R.map(v=>{let D=Fs(v),ie=D.path.length>0,Ge=v.workflow?.route==="quick_fix"||v.metadata&&v.metadata.route==="quick_fix",pt=!Object.hasOwn(v,"description")||typeof v.description=="string"&&v.description.trim().length>0,Dt=Object.hasOwn(v,"labels")&&$u(v.labels),Tt=!Dt&&(Ge?pt:ie&&!D.conflict),ut=Kn.has(v.id),Kt=[];ut&&Kt.push(vg(v)),Ge&&!pt?Kt.push("missing_description"):!Ge&&D.conflict?Kt.push("spec_id_conflict"):!Ge&&!ie&&Kt.push("spec \uC5C6\uC74C");let rs=Da(v.id);return rs&&Kt.push(rs),{id:v.id,title:v.title||v.id,reason:Kt.join(" \xB7 "),draggable:Tt,lane:"candidate",created_at:v.created_at,updated_at:v.updated_at,workflow:v.workflow,is_quick_fix:Ge,status:v.status,worker_ineligible:Dt,blocked:ut,has_spec:ie}}),io=ig(od,N),ad=io.visible,id=c.revise_parked||{},Yn=c.discard_operations&&typeof c.discard_operations=="object"&&!Array.isArray(c.discard_operations)?c.discard_operations:{},lo=(v,D)=>v.map((ie,Ge)=>{let pt=D!=="done",Dt=D!=="done"&&D!=="queue",Tt=pt?id[ie.bead_id]:null,ut=pt?pr(Yn,ie.bead_id):null,Kt=ut?.operation?ut:null,rs=pt&&g.get(ie.bead_id)===!0,ai=we[ie.bead_id]||[],_o=c.admission&&typeof c.admission=="object"?c.admission[ie.bead_id]:null,mo=pt?$c(_o,!!Kt||L.has(ie.bead_id)):null,vd=pt&&!mo?Da(ie.bead_id):null,wd=pt?[vd]:[],ii=pt&&ai.length>0&&typeof _o?.reason=="string"&&_o.reason.startsWith("not_ready")?[`\u23F8 ${ai.join(", ")} \uC644\uB8CC \uB300\uAE30 (blocks)`]:[],go=pt?x.get(ie.bead_id):void 0;return go&&go.length>0&&ii.push(`\u2733 serial \uAD8C\uC7A5 \xB7 ${go.join(", ")}\uC640`),{id:ie.bead_id,title:nt.get(ie.bead_id)||ie.bead_id,reason:wd.filter(Boolean).join(" \xB7 "),draggable:pt&&!Kt&&!mo,done:D==="done",lane:D,seq:Dt?Ge+1:void 0,worker_serial:rs,discard:Kt,stale_work:mo,badges:[...ii,...Tt?["\u23F8 REVISE \uD30C\uD0B9"]:[]],alert:!!Tt,revise_action:!!Tt,revise_enabled:!!Tt&&!Kt&&!re.has(ie.bead_id),revise_title:Tt?Tt.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Tt.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:D==="done"?Wt(c.attempts||{},ie.bead_id):null,work_ms:D==="done"?wc(c.attempts||{},ie.bead_id):null,done_at:D==="done"&&typeof ie.added_at=="number"?ie.added_at:void 0,...Re(ie.bead_id)}}),Yr=c.attempts?Object.values(c.attempts):[],co=new Set;for(let v of Yr)v&&typeof v.resumed_from=="string"&&v.resumed_from.length>0&&co.add(v.resumed_from);let Na=new Map;for(let v of Yr)Na.set(v.bead_id,v.attempt_id);let Zn=new Map;for(let v of Yr)Zn.set(v.attempt_id,v);function uo(v){let D=new Set,ie=v;for(;ie&&!D.has(ie.attempt_id);){if(ie.conflict_resolution===!0)return!0;D.add(ie.attempt_id),ie=typeof ie.resumed_from=="string"&&ie.resumed_from.length>0&&Zn.get(ie.resumed_from)||null}return!1}let Xn=typeof c.declared_base=="string"?c.declared_base:null;function ld(v){let D=null;for(let ie of Yr)!ie||ie.bead_id!==v||uo(ie)||(D===null||(typeof ie.started_at=="number"?ie.started_at:0)>=(typeof D.started_at=="number"?D.started_at:0))&&(D=ie);return D&&typeof D.target_base=="string"?D.target_base:null}let qa=[],Fa=[],cd=ku(c),ja=v=>{let D=typeof v.session_id=="string"&&v.session_id.length>0,ie=co.has(v.attempt_id);return{eligible:D&&!ie,reason:D?ie?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},Vt=null;for(let v of Yr){let D=v.status==="paused"&&!co.has(v.attempt_id);if(v.status==="running"||D)Fa.push({bead_id:v.bead_id,attempt_id:v.attempt_id,title:nt.get(v.bead_id)||v.bead_id,runner:v.runner||null,model:v.model||null,effort:v.effort||null,speed:v.speed||null,continuation_mode:v.continuation_mode||null,started_at:typeof v.started_at=="number"?v.started_at:null,resumed_from:v.resumed_from||null,paused:D,conflict_resolution:uo(v),base_exception:Ia(Xn,v.target_base),can_pause:typeof v.session_id=="string"&&v.session_id.length>0,discard:pr(Yn,v.bead_id,{attempt_id:v.attempt_id}),usage:Wt(c.attempts||{},v.bead_id),current_child:me(v.bead_id),...Re(v.bead_id)});else if((v.status==="failed"||v.status==="orphaned")&&cd(v)){let ie=ja(v);qa.push({bead_id:v.bead_id,attempt_id:v.attempt_id,title:nt.get(v.bead_id)||v.bead_id,runner:v.runner||null,model:v.model||null,effort:v.effort||null,speed:v.speed||null,continuation_mode:v.continuation_mode||null,started_at:typeof v.started_at=="number"?v.started_at:null,resumed_from:v.resumed_from||null,failed:!0,status:v.status,status_label:v.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:pr(Yn,v.bead_id,{attempt_id:v.attempt_id}),resume_eligible:ie.eligible,resume_reason:ie.reason,conflict_resolution:uo(v),base_exception:Ia(Xn,v.target_base),usage:Wt(c.attempts||{},v.bead_id),current_child:me(v.bead_id),...Re(v.bead_id)}),Vt=v}}let Qn=[...qa,...Fa].map(v=>{let D=Zn.get(v.attempt_id),ie=D?.quickfix_landing;if(D?.quickfix_lane!==!0||!ie||typeof ie!="object")return v;let Ge=typeof ie.reason=="string"&&ie.reason.length>0?ie.reason:null,pt=Un({bead_id:D.bead_id,merge_sha:ie.head_sha,cleanup_cursor:ie.cursor,cleanup_failed:Ge?{step:ie.cursor,reason:Ge}:null,repo_operations:Array.isArray(c.repo_operations)?c.repo_operations:[]});return pt?{...v,landing:pt}:v}),Ba=null;if(Vt){let v=ja(Vt),D=Vt.cause_detail;Ba={bead_id:Vt.bead_id,repo:Vt.repo||"",reason:Vt.cause||Vt.status,cause_detail:D&&typeof D.reason=="string"?{reason:D.reason,command:typeof D.command=="string"?D.command:null}:null,resume_attempt_id:Vt.attempt_id,resume_eligible:v.eligible,resume_reason:v.reason,discard:pr(Yn,Vt.bead_id,{attempt_id:Vt.attempt_id})}}let Ua=new Set(Qn.map(v=>v.bead_id)),po=Array.isArray(c.merge_queue)?c.merge_queue:[],Wa=new Map,za=new Map,Ha=new Map,Ga=new Map,Va=new Map;po.forEach((v,D)=>{v&&typeof v.bead_id=="string"&&(Wa.set(v.bead_id,D+1),za.set(v.bead_id,v.resolution),Ha.set(v.bead_id,v.continuation_action||null),Ga.set(v.bead_id,v.head_review||null),Va.set(v.bead_id,v.authority||null))});let Zr=c.merge_queue_state||{active:null,failures:{}},ud=Zr.failures||{},Ka=Zr.waiting&&typeof Zr.waiting.bead_id=="string"&&typeof Zr.waiting.reason=="string"?Zr.waiting:null,dd=c.auto_merge_skips||{},Ya=v=>{let D=dd[v];if(!D)return null;let ie=_t[v],Ge=ie&&ie.pr?ie.pr.head_sha:null;return Ge&&Ge===D.head_sha?D.reason||"":null},Jn=new Map;for(let v of Qn)v.failed!==!0&&v.conflict_resolution&&(v.paused?Jn.has(v.bead_id)||Jn.set(v.bead_id,"paused"):Jn.set(v.bead_id,"running"));let Za=Qn.filter(v=>!v.paused&&v.failed!==!0).length,Xa=(c.workspace_info||{}).slots,Qa=typeof Xa=="number"?Xa:typeof c.slots=="number"?c.slots:oo,pd=Za>Qa,es=Nr(B),fd=(Array.isArray(c.done)?c.done.slice():[]).filter(v=>es===void 0||typeof v.added_at!="number"||v.added_at>=es).sort((v,D)=>(D.added_at||0)-(v.added_at||0)),_n=lo(fd,"done"),_d=new Set((Array.isArray(c.done)?c.done:[]).map(v=>v?.bead_id).filter(v=>typeof v=="string")),Ja=[],md=d?.()||"";for(let v of H){let D=jr(v.closed_at);if(typeof v.id!="string"||_d.has(v.id)||D===null||es!==void 0&&D<es||typeof v.comment_count!="number"||v.comment_count<=0)continue;let ie=`${md}\0${v.id}\0${String(v.updated_at)}\0${v.comment_count}`,Ge=U.get(ie);Ge===void 0&&r&&(U.set(ie,"pending"),Promise.resolve(r("get-comments",{id:v.id})).then(pt=>{let Dt=Array.isArray(pt)&&pt.some(Tt=>js(typeof Tt?.text=="string"?Tt.text:"")?.lane==="session");U.set(ie,Dt?"session":"not-session"),J()}).catch(()=>{U.set(ie,"failed"),J()})),Ge==="session"&&Ja.push({id:v.id,title:v.title||v.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:null,done_at:D,created_at:v.created_at,updated_at:v.updated_at})}_n.push(...Ja),_n.sort((v,D)=>(D.done_at||0)-(v.done_at||0));let ts={};for(let v of gr)ts[v]=0;let ei=!1,ti=0,fo=0,ri=0;for(let v of _n){let D=v.usage;if(D&&typeof D=="object"){let ie=!1;for(let Ge of gr)Number.isFinite(D[Ge])&&(ts[Ge]+=D[Ge],ei=!0,ie=!0);ie&&(fo+=1,Number.isFinite(D.total_cost_usd)&&(ti+=D.total_cost_usd,ri+=1))}}fo>0&&ri===fo&&(ts.total_cost_usd=ti);let ni=_n.map(v=>v.usage).filter(v=>v&&typeof v=="object"&&v.providers),gd=ni.length>0?xt(xs(ni)):ei?Xt(ts):null,bd=c.lane_states&&typeof c.lane_states=="object"&&!Array.isArray(c.lane_states)?c.lane_states:{},hd=Array.isArray(c.serial_lanes)?c.serial_lanes:[],si=v=>{if(qe.some(Ge=>Ge.bead_id===v))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let D=Yr.filter(Ge=>Ge&&Ge.bead_id===v),ie=D.length>0?D[D.length-1].status:null;return ie==="failed"||ie==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":ie==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},oi=hd.filter(v=>v&&typeof v.id=="string"&&Array.isArray(v.entries)).map((v,D)=>{let ie=bd[v.id]||{},Ge=new Map((Array.isArray(ie.corrections)?ie.corrections:[]).filter(ut=>ut&&typeof ut.bead_id=="string"&&typeof ut.after=="string").map(ut=>[ut.bead_id,ut.after])),pt=lo(v.entries.filter(ut=>!Ua.has(ut.bead_id)),v.id).map(ut=>Ge.has(ut.id)?{...ut,badges:[`\u{1F517} ${Ge.get(ut.id)} \uB4A4 (blocks \uC790\uB3D9)`,...ut.badges]}:ut),Dt=Array.isArray(ie.occupied_by)?ie.occupied_by.filter(ut=>typeof ut=="string"):[],Tt=Dt.map(ut=>({id:ut,title:nt.get(ut)||ut,draggable:!1,lane:v.id,ghost:!0,badges:[si(ut)]}));return{id:v.id,index:D+1,rows:[...Tt,...pt],occupied:Dt.length>0,badge:Dt.length>0?si(Dt[0]):"\uB300\uAE30",cycle:ie.cycle===!0}}),yd=typeof c.serial_lane_count=="number"?c.serial_lane_count:oi.length;return{queue:c,idToTitle:nt,candidates:ad,candidate_hidden:{blocked:io.hidden_blocked,spec:io.hidden_spec},running:Qn,live_count:Za,slots:Qa,over_cap:pd,failure:Ba,waiting:lo(pn.filter(v=>!Ua.has(v.bead_id)),"queue"),serial_lanes:oi,serial_lane_count:yd,pr_wait:qe.map(v=>Eg(v.bead_id,nt.get(v.bead_id)||v.bead_id,_t,Vr[v.bead_id]||null,Wt(c.attempts||{},v.bead_id),ir[v.bead_id]||(C.has(v.bead_id)||z.has(v.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),Jn.get(v.bead_id)||null,v.external===!0,{position:Wa.get(v.bead_id)||0,active:Zr.active===v.bead_id,failure:ud[v.bead_id]||null,waiting:Ka?.bead_id===v.bead_id?Ka.reason:null,resolution:za.get(v.bead_id),continuation_action:Ha.get(v.bead_id),head_review:Ga.get(v.bead_id)||null,authority:Va.get(v.bead_id)||null},v.wt_present!==!1,c.auto_merge===!0?Ya(v.bead_id):null,Ia(Xn,ld(v.bead_id)),c.completion_status&&typeof c.completion_status=="object"&&!Array.isArray(c.completion_status)&&c.completion_status[v.bead_id]||null,c.discard_operations&&typeof c.discard_operations=="object"&&!Array.isArray(c.discard_operations)?c.discard_operations:{},Zn.get(Na.get(v.bead_id)||"")?.worker_serial===!0,c.auto_merge===!0,{merge_sha:v.merge_sha,cleanup_cursor:v.cleanup_cursor,repo_operations:Array.isArray(c.repo_operations)?c.repo_operations:[]})).map(v=>({...v,...Re(v.id)})),merge_queue_length:po.length,merge_queue_running:po.length>0,auto_excluded:qe.map(v=>v.bead_id).filter(v=>Ya(v)!==null),declared_base:Xn,done:_n,token_total:gd,cleanup_failures:Vn,repo_operations:Array.isArray(c.repo_operations)?c.repo_operations:[]}}function st(){let m=!!o?.get()?.job,S=!m&&o?.isPending?.()===!0,H=m?"\uBD84\uC11D \uC911":S?"\uC900\uBE44 \uC911":"";return l`<button
      type="button"
      class=${H?"worker-analysis-btn worker-analysis-btn--running":"worker-analysis-btn"}
      aria-busy=${H?"true":"false"}
      title="대기 이슈의 병렬 실행 가능성을 분석해 직렬 그룹을 제안합니다 (클릭할 때만 실행)"
    >
      ✳ 병렬성
      분석${H?l`<span class="worker-analysis-btn__badge">${H}</span>`:""}
    </button>`}function ot(c){let m=c.waiting.length>0?c.waiting[0].id:"\u2014",S=l`<button
      type="button"
      class="worker-play${c.queue.auto_advance?" is-active":""}"
    >
      ${c.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,H=P(c),ae=c.over_cap?l`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",$e=l`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${c.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${c.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${I()} 완료 <b>${c.done.length}</b></span
      >`,me=l`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${c.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${c.declared_base||"?"}</span
    >`,Ke=l`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${oo}
          step="1"
          .value=${String(c.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:Nu},(p,g)=>g+1).map(p=>l`<option
                value=${String(p)}
                ?selected=${c.serial_lane_count===p}
              >
                ${p}
              </option>`)}
        </select>
      </label>
      ${o?st():""} `,nt=Nc({failure:c.failure}),Ne=kc(c.repo_operations,c.cleanup_failures);return b?l`<div class="worker-ribbon">
          ${S} ${H}
          <div class="worker-kpi worker-kpi--ribbon">${ae}${$e}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${Ke}</div>
          <div class="worker-kpi">${me}</div>
        </div>
        ${Ne}${We.template()}${nt}`:l`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${S}${H}${Ke}</div>
        <div class="worker-kpi">
          ${ae}${$e}${me}
          ${(Array.isArray(c.token_total)?c.token_total:c.token_total?[{label:c.token_total,tooltip:`${I()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(p=>l`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${p.tooltip}
                >${I()} 완료 · 누적 ${p.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${m}</b></span
          >
        </div>
      </div>
      ${Ne}${We.template()}${nt}`}function F(c){if(c.running.length===0&&c.pr_wait.length===0)return"";let m=c.running.some(S=>!S.paused&&S.failed!==!0);return l`<section
      class="worker-now${m?" worker-pane--live":""}"
      id="worker-now"
    >
      <header class="worker-now__hd">
        <span
          class="worker-pane__dot worker-pane__dot--running"
          aria-hidden="true"
        ></span>
        <span class="worker-now__title">지금</span>
        <span class="worker-now__count"
          >${c.running.length+c.pr_wait.length}</span
        >
      </header>
      ${c.running.length>0?ya(c.running,Date.now(),Ue):""}
      ${c.pr_wait.map(S=>da(S))}
    </section>`}function ee(c){let m=c.candidate_hidden;return l`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${N.show_blocked}
        />
        🔒 blocked${m.blocked>0?` ${m.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${lg.map(S=>l`<button
              type="button"
              class="worker-filter__chip${N.spec===S.value?" is-active":""}"
              data-spec=${S.value}
              aria-pressed=${N.spec===S.value?"true":"false"}
            >
              ${S.label}
            </button>`)}
        ${m.spec>0?l`<span class="worker-filter__hidden">숨김 ${m.spec}</span>`:""}
      </div>
    </div>`}function _e(){return l`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${Z}
    >
      ${cg.map(c=>l`<option value=${c.value} ?selected=${Z===c.value}>
            ${c.label}
          </option>`)}
    </select>`}function w(){return l`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${B}
      >
        ${lr.map(c=>l`<option value=${c.value} ?selected=${B===c.value}>
              ${c.label}
            </option>`)}
      </select>
    </div>`}function E(c){let m=l`<span
      class="worker-lane__badge${c.occupied?" worker-lane__badge--held":""}"
      >${c.badge}</span
    >`,S=c.cycle?l`<div class="worker-lane__cycle">
          ⚠ blocks 순환 감지 — 자동 정렬을 생략했습니다
        </div>`:"";return tr({id:`worker-pane-lane-${c.id}`,lane:c.id,title:`\uC9C1\uB82C ${c.index}`,items:c.rows,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:m,controls:S})}function P(c){let m=c.queue.auto_merge===!0;if(c.merge_queue_running)return l`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${m?" is-active":""}"
        title=${m?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${m?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${c.merge_queue_length}
      </button>`;if(m)return l`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let S=new Set(c.auto_excluded),H=c.pr_wait.filter(ae=>ae.merge_action&&ae.merge_enabled&&!S.has(ae.id)).length;return l`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${H>0?` ${H}`:""}
    </button>`}function Q(c){let m=tr({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:c.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:_e(),controls:ee(c),place_menu:K(c.candidates)});return b?l`<div class="worker-lanes worker-lanes--mobile">
        ${F(c)}
        ${tr({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:c.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:W.queue,preview:Fu(c.waiting)})}
        ${c.serial_lanes.map(S=>E(S))}
        ${m}
        ${tr({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:c.done,empty:`${I()} \uC644\uB8CC \uC5C6\uC74C`,controls:w(),collapsible:!0,collapsed:W.done,preview:Array.isArray(c.token_total)?c.token_total.map(S=>S.label).join(" \xB7 "):c.token_total||Fu(c.done)})}
      </div>`:l`<div class="worker-lanes">
      ${m}
      <div class="worker-wait">
        ${tr({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:c.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
        ${c.serial_lanes.map(S=>E(S))}
      </div>
      ${tr({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${c.slots}`,items:c.running,live:c.running.some(S=>!S.paused&&S.failed!==!0),body:ya(c.running,Date.now(),Ue)})}
      ${tr({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:c.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${tr({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${I()} ${c.done.length}`,items:c.done,empty:`${I()} \uC644\uB8CC \uC5C6\uC74C`,controls:w()})}
    </div>`}function ke(c){W={...W,[c]:!W[c]},gg(W),J()}function J(){let c=ye();He(ot(c),fe),He(Q(c),Me)}function xe(){let c=document.querySelector(".app-header");if(!c)return;let m=()=>{let S=Math.round(c.getBoundingClientRect().height);ue.style.setProperty("--worker-ribbon-top",`${S}px`)};if(m(),typeof ResizeObserver=="function"){let S=new ResizeObserver(m);S.observe(c),M.push(()=>S.disconnect())}else window.addEventListener("resize",m),M.push(()=>window.removeEventListener("resize",m))}function Le(){if(typeof window.matchMedia!="function")return;let c=window.matchMedia(_g);b=!!c.matches;let m=S=>{let H=!!(S&&typeof S.matches=="boolean"?S.matches:c.matches);H!==b&&(b=H,J())};typeof c.addEventListener=="function"?(c.addEventListener("change",m),M.push(()=>c.removeEventListener("change",m))):typeof c.addListener=="function"&&(c.addListener(m),M.push(()=>c.removeListener(m)))}let gt=null;function ht(c){gt=c.target instanceof Element?c.target:null}function Ze(c){let S=c.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!S)return;if(gt&&S.contains(gt)&&gt.closest("input, button, a")){c.preventDefault();return}let H=S.dataset.beadId||"",ae=S.dataset.lane||"";A={bead_id:H,from_lane:ae};try{c.dataTransfer?.setData("text/plain",H),c.dataTransfer&&(c.dataTransfer.effectAllowed="move")}catch{}}function St(c){let m=c.target?.closest?.(".worker-pane");if(!m)return;let S=m.dataset.lane||"";S!=="candidate"&&S!=="queue"&&!/^s[1-5]$/.test(S)||(c.preventDefault(),c.dataTransfer&&(c.dataTransfer.dropEffect="move"),m.classList.add("worker-pane--drag-over"))}function Ht(c){c.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function vt(c,m){let S=R.find(me=>me.id===c);if(!S)return;let H=R.filter(me=>me.id!==c),ae=H.length;if(m){let me=m.dataset.beadId;if(me===c)return;let Ke=H.findIndex(nt=>nt.id===me);Ke>=0&&(ae=Ke)}let $e=H.slice();$e.splice(ae,0,S),T.applyReorder(c,$e,ae)}function Ot(c){let m=c.target?.closest?.(".worker-pane");if(!m)return;c.preventDefault(),m.classList.remove("worker-pane--drag-over");let S=m.dataset.lane||"",H=A?.bead_id||c.dataTransfer?.getData("text/plain")||"",ae=A?.from_lane||"";if(A=null,!H)return;let $e=c.target?.closest?.(".worker-mini, .worker-card"),me=Array.from(m.querySelectorAll(".worker-mini, .worker-card")),Ke=me.length;if($e){let nt=me.indexOf($e);nt>=0&&(Ke=nt)}if(Ke=Math.max(0,Ke-m.querySelectorAll(".worker-mini--ghost").length),m.classList.contains("worker-pane--collapsed")&&(Ke=Oe()),S==="candidate"){if(ae==="candidate"){vt(H,$e);return}(ae==="queue"||/^s[1-5]$/.test(ae))&&Ce(H);return}if(S==="queue"||/^s[1-5]$/.test(S)){let nt=S==="queue"?"parallel":S;ae===S?ze(H,nt,Ke):Fe(H,nt)}}function rr(c){N=c,ag(c),J()}function nr(c){Z=c==="board"||c==="created"||c==="spec"?c:ao,dg(Z),J()}function sr(c){B=Ut(c)?c:Nt,fg(B),_?.(B),J()}function fr(c){let m=c.target?.closest?.(".worker-serial-lane-count");if(m){let Ke=Number.parseInt(m.value,10);Number.isFinite(Ke)&&Se(Ke).then(J);return}let S=c.target?.closest?.(".worker-filter__blocked");if(S){rr({...N,show_blocked:S.checked});return}let H=c.target?.closest?.(".worker-done-range");if(H){sr(H.value);return}let ae=c.target?.closest?.(".worker-sort");if(ae){nr(ae.value||ao);return}let $e=c.target?.closest?.(".worker-slots__input");if(!$e)return;let me=Number.parseInt($e.value,10);if(!Number.isFinite(me)){J();return}be(me).then(J)}function wt(c){return c?{runner:c.runner||void 0,model:c.model||void 0,effort:c.effort||void 0,worktree:c.worktree||void 0,status:c.status||void 0,session_id:c.session_id||void 0}:{}}function Gt(){let c=ye();return{operations:c.repo_operations,cleanup_failures:c.cleanup_failures,repo:d&&d()||""}}function or(){Ue&&Ae.close(),Ve.hidden=!1,de.hidden=!1,Ie.open(Gt()),J()}function ar(c){let m=Te(),S=m.attempts?m.attempts[c]:null;Ue=c,le=null,Ie.close(),Ve.hidden=!0,de.hidden=!1,Ae.open({attempt_id:c,meta:wt(S)}),J()}function Je(c,m){Ue=null,le=c,Ie.close(),Ve.hidden=!0,de.hidden=!1,Ae.open({attempt_id:c,meta:m,hide_prompt:!0}),J()}function Pt(){if(Ie.isOpen()&&Ie.refresh(Gt()),le){let S=(o?.get()?.runs||[]).find(H=>H.run_id===le);S?Ae.updateMeta(Ca(S)):Ae.close();return}if(!Ue)return;let c=Te(),m=c.attempts?c.attempts[Ue]:null;if(m){Ae.updateMeta(wt(m));return}Ae.close()}function ve(c){let m=c.target;if(m?.closest?.(".worker-mini__serial, .worker-mini__grip")||m?.closest?.("#worker-parallel-analysis-dialog"))return;if(m?.closest?.(".worker-analysis-btn")){et?.open();return}if(m?.closest?.(".worker-repo-strip")||m?.closest?.(".worker-mini__timeline")){or();return}let S=m?.closest?.(".worker-repo-op__session");if(S){let Pe=S.dataset.attemptId;Pe&&ar(Pe);return}let H=m?.closest?.(".worker-repo-op__resolve");if(H){ce(H.dataset.operationId||"");return}let ae=m?.closest?.(".worker-repo-op__dismiss");if(ae){je(ae.dataset.operationId||"");return}let $e=m?.closest?.(".worker-cleanup__resume");if($e){let Pe=$e.dataset.beadId;Pe&&rt(Pe);return}let me=m?.closest?.(".worker-banner__resume");if(me){let Pe=me.dataset.attemptId;Pe&&Ye(Pe);return}let Ke=m?.closest?.(".worker-banner__discard");if(Ke){let Pe=Ke.dataset.confirmation==="merged"?"merged":"unmerged";O(Ke.dataset.beadId||"",Ke.dataset.attemptId||null,Pe,Ke.dataset.operationId||null);return}let nt=m?.closest?.(".worker-banner__dismiss");if(nt){let Pe=nt.dataset.attemptId;Pe&&G(Pe);return}if(m?.closest?.(".worker-play")){se(!Te().auto_advance);return}let Ne=m?.closest?.(".worker-merge-all");if(Ne){Ne.classList.contains("worker-merge-all--stop")?Te().auto_merge===!0?h(!1):k():h(!0);return}let p=m?.closest?.(".worker-pane__hd--toggle");if(p){let Pe=p.dataset.lane;(Pe==="queue"||Pe==="done")&&ke(Pe);return}let g=m?.closest?.(".worker-card__place-lane");if(g){let Pe=g.dataset.beadId,dt=g.dataset.lane;Pe&&(dt==="parallel"||/^s[1-5]$/.test(dt||""))&&(Y=null,J(),Fe(Pe,dt));return}if(m?.closest?.(".worker-card__place-cancel")){Y=null,J();return}let j=m?.closest?.(".worker-card__place");if(j){let Pe=j.dataset.beadId;Pe&&!j.disabled&&(tt()?(Y=Pe,J()):Fe(Pe,"parallel"));return}let we=m?.closest?.(".worker-filter__chip");if(we){let Pe=we.dataset.spec;(Pe==="all"||Pe==="with"||Pe==="without")&&rr({...N,spec:Pe});return}let ge=m?.closest?.(".worker-mini__merge");if(ge){let Pe=ge.dataset.beadId||"";Te().cleanup_failed?.[Pe]?rt(Pe):De(Pe);return}let Re=m?.closest?.(".worker-mini__merge-cancel");if(Re){$(Re.dataset.beadId||"");return}let qe=m?.closest?.(".worker-mini__discard");if(qe){O(qe.dataset.beadId||"",qe.dataset.attemptId||null,qe.dataset.discardMode==="merged"?"merged":"unmerged",qe.dataset.operationId||null);return}let _t=m?.closest?.(".worker-mini__stale-continue");if(_t){V("worker-stale-work-continue",_t.dataset.beadId||"",_t.dataset.actionId||"");return}let ir=m?.closest?.(".worker-mini__stale-backup");if(ir){V("worker-stale-work-backup-fresh",ir.dataset.beadId||"",ir.dataset.actionId||"");return}let Vr=m?.closest?.(".worker-mini__stale-recheck");if(Vr){V("worker-stale-work-recheck",Vr.dataset.beadId||"",Vr.dataset.actionId||"");return}let Vn=m?.closest?.(".worker-mini__revise-fix");if(Vn){X("worker-revise-fix",Vn.dataset.beadId||"");return}let pn=m?.closest?.(".worker-mini__revise-approve");if(pn){X("worker-revise-approve",pn.dataset.beadId||"");return}if(m?.closest?.(".worker-mini__pr"))return;if(m?.closest?.(".rtile__discard")){let Pe=m?.closest?.(".rtile"),dt=Pe?.dataset?.beadId,Kr=Pe?.dataset?.attemptId;dt&&O(dt,Kr||null,"unmerged",m?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(m?.closest?.(".rtile__dismiss")){let dt=m?.closest?.(".rtile")?.dataset?.attemptId;dt&&G(dt);return}if(m?.closest?.(".rtile__pause")){let dt=m?.closest?.(".rtile")?.dataset?.attemptId;dt&&ct(dt);return}if(m?.closest?.(".rtile__resume")){let dt=m?.closest?.(".rtile")?.dataset?.attemptId;dt&&Ye(dt);return}if(m?.closest?.(".rtile__session")){let dt=m?.closest?.(".rtile")?.dataset?.attemptId;dt&&ar(dt);return}if(m?.closest?.(".worker-drawer-overlay__backdrop")){Ie.close(),Ae.close();return}if(m?.closest?.(".worker-drawer-host"))return;let fn=m?.closest?.(".rtile");if(fn){if(m?.closest?.(".rtile__id")){let dt=fn.dataset.beadId;dt&&Zt(dt).then(Kr=>{Kr?oe("\uBCF5\uC0AC\uB428","success",1200):oe("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Pe=fn.dataset.beadId;Pe&&u&&u(Pe);return}let Kn=m?.closest?.(".worker-mini, .worker-card");if(Kn){let Pe=Kn.dataset.beadId;if(m?.closest?.(".worker-mini__id, .worker-card__id")){Pe&&Zt(Pe).then(dt=>{dt?oe("\uBCF5\uC0AC\uB428","success",1200):oe("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}Pe&&u&&u(Pe)}}return e.addEventListener("pointerdown",ht),e.addEventListener("dragstart",Ze),e.addEventListener("dragover",St),e.addEventListener("dragleave",Ht),e.addEventListener("drop",Ot),e.addEventListener("click",ve),e.addEventListener("change",fr),Le(),xe(),y&&M.push(y.subscribe(()=>{for(let[c,m]of U)m==="failed"&&U.delete(c);J()})),s&&M.push(s.subscribe(()=>{let c=d&&d()||"";c!==he&&(he=c,Ee.close()),J(),Pt()})),o&&typeof o.subscribe=="function"&&M.push(o.subscribe(()=>{Pt(),J()})),J(),{load(){J()},destroy(){for(let c of M.splice(0))try{c()}catch{}e.removeEventListener("pointerdown",ht),e.removeEventListener("dragstart",Ze),e.removeEventListener("dragover",St),e.removeEventListener("dragleave",Ht),e.removeEventListener("drop",Ot),e.removeEventListener("click",ve),e.removeEventListener("change",fr);try{Ae.destroy()}catch{}de.hidden=!0;try{et?.destroy()}catch{}try{Ee.destroy()}catch{}He(l``,e)}}}function Oa(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function Gu(e,t,r,n=async()=>{},s=async()=>{}){let o=ft("views:workspace-picker"),a=null,i=!1,u=!1,d=!1;async function f(W){let C=W.target.value,re=t.getState().workspace?.current?.path||"";if(C&&C!==re){o("switching workspace to %s",C),i=!0,I();try{await r(C)}catch(L){o("workspace switch failed: %o",L)}finally{i=!1,I()}}}async function _(){let W=t.getState(),b=W.workspace?.current?.path||W.workspace?.available?.[0]?.path||"";if(!(!b||u)){o("git-pulling workspace %s",b),u=!0,I();try{await n(b)}catch(C){o("workspace git pull failed: %o",C)}finally{u=!1,I()}}}function y(W){let b=W.target;b&&e.contains(b)||R()}function T(W){W.key==="Escape"&&R()}function A(){d||(d=!0,document.addEventListener("mousedown",y),document.addEventListener("keydown",T),I())}function R(){d&&(d=!1,document.removeEventListener("mousedown",y),document.removeEventListener("keydown",T),I())}function N(){d?R():A()}async function Y(W){let b=W.target,C=b.value,z=b.checked;o("toggling visibility %s \u2192 %s",C,String(z));try{await s(C,z)}catch(re){o("workspace visibility toggle failed: %o",re)}}function Z(W){return W?l`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${_}
        ?disabled=${i||u}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:l``}function B(W,b){return l`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${N}
          aria-haspopup="true"
          aria-expanded=${d?"true":"false"}
          aria-label="프로젝트 관리"
        >
          프로젝트 관리
        </button>
        ${d?l`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${W.map(C=>l`
                    <label
                      class="workspace-picker__manage-row"
                      title="${C.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${C.path}"
                        .checked=${!b.has(C.path)}
                        @change=${Y}
                      />
                      <span class="workspace-picker__manage-name"
                        >${Oa(C.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function U(){let W=t.getState(),b=W.workspace?.current,C=W.workspace?.available||[],z=new Set(W.workspace?.hidden||[]),re=b?.path||C[0]?.path||"";if(C.length===0)return l``;let L=C.filter(M=>!z.has(M.path)||M.path===re);if(L.length<=1){let M=L[0]||C[0],ue=Oa(M.path);return l`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${M.path}"
            >${ue}</span
          >
          ${B(C,z)}
          ${Z(re)}
          ${u?l`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return l`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${f}
          ?disabled=${i||u}
          aria-label="Select project workspace"
        >
          ${L.map(M=>l`
              <option
                value="${M.path}"
                ?selected=${M.path===re}
                title="${M.path}"
              >
                ${Oa(M.path)}
              </option>
            `)}
        </select>
        ${B(C,z)}
        ${Z(re)}
        ${i||u?l`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function I(){He(U(),e)}return I(),a=t.subscribe(()=>I()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",y),document.removeEventListener("keydown",T),He(l``,e)}}}var Vu=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-serial-lane-count","subscribe-worker-parallel-analysis","unsubscribe-worker-parallel-analysis","worker-parallel-analysis-snapshot","worker-parallel-analysis-targets","worker-parallel-analysis-prompt","worker-parallel-analysis-start","worker-parallel-analysis-cancel","worker-parallel-analysis-settings-update","worker-parallel-analysis-submit","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle"];function Ma(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function Ku(e,t,r=Ma()){return{id:r,type:e,payload:t}}function Yu(e={}){let t=ft("ws"),r={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},n=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,i=null,u=!0,d=new Map,f=[],_=new Map,y=new Set;function T(U){for(let I of Array.from(y))try{I(U)}catch{}}function A(){if(!u||i)return;o="reconnecting",t("ws reconnecting\u2026"),T(o);let U=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,a)),I=(r.jitterRatio||0)*U,W=Math.max(0,Math.round(U+(Math.random()*2-1)*I));t("ws retry in %d ms (attempt %d)",W,a+1),i=setTimeout(()=>{i=null,B()},W)}function R(U){try{s?.send(JSON.stringify(U))}catch(I){t("ws send failed",I)}}function N(){for(o="open",t("ws open"),T(o),a=0;f.length;){let U=f.shift();U&&R(U)}}function Y(U){let I;try{I=JSON.parse(String(U.data))}catch{t("ws received non-JSON message");return}if(!I||typeof I.id!="string"||typeof I.type!="string"){t("ws received invalid envelope");return}if(d.has(I.id)){let b=d.get(I.id);d.delete(I.id),I.ok?b?.resolve(I.payload):b?.reject(I.error||new Error("ws error"));return}let W=_.get(I.type);if(W&&W.size>0)for(let b of Array.from(W))try{b(I.payload)}catch(C){t("ws event handler error",C)}else t("ws received unhandled message type: %s",I.type)}function Z(){o="closed",t("ws closed"),T(o);for(let[U,I]of d.entries())I.reject(new Error("ws disconnected")),d.delete(U);a+=1,A()}function B(){if(!u)return;let U=n();try{s=new WebSocket(U),t("ws connecting %s",U),o="connecting",T(o),s.addEventListener("open",N),s.addEventListener("message",Y),s.addEventListener("error",()=>{}),s.addEventListener("close",Z)}catch(I){t("ws connect failed %o",I),A()}}return B(),{send(U,I){if(!Vu.includes(U))return Promise.reject(new Error(`unknown message type: ${U}`));let W=Ma(),b=Ku(U,I,W);return t("send %s id=%s",U,W),new Promise((C,z)=>{d.set(W,{resolve:C,reject:z,type:U}),s&&s.readyState===s.OPEN?R(b):(t("queue %s id=%s (state=%s)",U,W,o),f.push(b))})},on(U,I){_.has(U)||_.set(U,new Set);let W=_.get(U);return W?.add(I),()=>{W?.delete(I)}},onConnection(U){return y.add(U),()=>{y.delete(U)}},reconnect(){u=!0,i&&(clearTimeout(i),i=null),a=0,B()},close(){u=!1,i&&(clearTimeout(i),i=null);try{s?.close()}catch{}},getState(){return o}}}function Tg(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function Cg(e,t){try{let n=await(await fetch("/api/config")).json();e.setState({config:n})}catch(r){t("config refresh failed",r)}}var Pa=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Zu=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:closed","closed-issues"]],Rr="tab:worker:closed",Rg="bdui.worker.done-range",Xu=ru,Qu="worker:queue",Ju="worker:parallel-analysis",ed="ui:order",td="ui:display-policy",rd="exec:presets",Ir="tab:board:closed",nd="beads-ui.board.closed-range";function Ig(e){let t=ft("main");t("bootstrap start");let r=l`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;He(r,e);let n=document.getElementById("global-nav"),s=document.getElementById("top-nav"),o=document.getElementById("repo-scope"),a=document.getElementById("usage-meter"),i=document.getElementById("board-root"),u=document.getElementById("worker-root"),d=document.getElementById("monitor-root"),f=document.getElementById("detail-panel");if(a&&wu(a),i&&u&&d&&f){let Ue=function(p,g){let x="Request failed",j="";if(p&&typeof p=="object"){let ge=p;if(typeof ge.message=="string"&&ge.message.length>0&&(x=ge.message),typeof ge.details=="string")j=ge.details;else if(ge.details&&typeof ge.details=="object")try{j=JSON.stringify(ge.details,null,2)}catch{j=""}}else typeof p=="string"&&p.length>0&&(x=p);let we=g&&g.length>0?`Failed to load ${g}`:"Request failed";Me.open(we,x,j)},te=function(p){return`${Je.getState().workspace.current?.path||""}\0${p}`},De=function(){ne&&(ne().catch(()=>{}),ne=null),Oe=null,Fe=null},pe=function(p){ze=p;let g=()=>{ze!==p||Je.getState().selected_id!==p||(ze=null,rt(p))};if(!Ye){ct.then(g);return}g()},O=function(p,g,x,j,we){return x!==k[g]?(we().catch(()=>{}),!1):(p.set(j,we),!0)},X=function(){let p=Je.getState();Se(p.view==="board"),_e(p.view==="worker"),ke(p.view==="monitor"),E(p.view==="board"||p.view==="worker"||V||!!p.selected_id)},je=function(){let p=Nr(se);return p===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:p}}},be=function(){let p=Nr(ce);return p===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:p}}},Se=function(p){if(p)for(let[g,x]of Pa){if(h.has(g)||$.has(g))continue;let j=g===Ir?je():{type:x};try{Ee.register(g,j)}catch(Re){t("register %s store failed: %o",g,Re)}$.add(g);let we=k.board,ge=!1;Ie.subscribeList(g,j).then(Re=>{ge=!O(h,"board",we,g,Re)}).catch(Re=>{t("subscribe %s failed: %o",g,Re),Ue(Re,"board")}).finally(()=>{$.delete(g),ge&&X()})}else ot()},ot=function(){k.board+=1;for(let[p]of Pa){let g=h.get(p);g&&(g().catch(()=>{}),h.delete(p));try{Ee.unregister(p)}catch(x){t("unregister %s failed: %o",p,x)}}},_e=function(p){if(!p){w();return}for(let[g,x]of Zu){if(F.has(g)||$.has(g))continue;let j=g===Rr?be():{type:x};try{Ee.register(g,j)}catch(Re){t("register %s store failed: %o",g,Re)}$.add(g);let we=k.worker,ge=!1;Ie.subscribeList(g,j).then(Re=>{ge=!O(F,"worker",we,g,Re)}).catch(Re=>{t("subscribe %s failed: %o",g,Re),Ue(Re,"worker")}).finally(()=>{$.delete(g),ge&&X()})}},w=function(){k.worker+=1;for(let[p]of Zu){let g=F.get(p);g&&(g().catch(()=>{}),F.delete(p));try{Ee.unregister(p)}catch(x){t("unregister %s failed: %o",p,x)}}},E=function(p){if(!p){P();return}ee||(Ae("subscribe-worker-queue",{id:Qu}).catch(g=>{t("subscribe-worker-queue failed: %o",g)}),Ae("subscribe-worker-parallel-analysis",{id:Ju}).catch(g=>{t("subscribe-worker-parallel-analysis failed: %o",g)}),ee=()=>(Ae("unsubscribe-worker-parallel-analysis",{id:Ju}),Ae("unsubscribe-worker-queue",{id:Qu})))},P=function(){ee&&(ee().catch(()=>{}),ee=null),We.clear()},ke=function(p){if(!p){J();return}Q||(Ae("subscribe-monitor-pipeline",{id:Xu}).catch(g=>{t("subscribe-monitor-pipeline failed: %o",g)}),Q=()=>Ae("unsubscribe-monitor-pipeline",{id:Xu}))},J=function(){Q&&(Q().catch(()=>{}),Q=null)},Le=function(){xe||(Ae("subscribe-ui-order",{id:ed}).catch(p=>{t("subscribe-ui-order failed: %o",p)}),xe=()=>Ae("unsubscribe-ui-order",{id:ed}))},gt=function(){xe&&(xe().catch(()=>{}),xe=null),Te.clear()},Ze=function(){ht||(Ae("subscribe-display-policy",{id:td}).catch(p=>{t("subscribe-display-policy failed: %o",p)}),ht=()=>Ae("unsubscribe-display-policy",{id:td}))},St=function(){ht&&(ht().catch(()=>{}),ht=null),tt.clear()},vt=function(){Ht||(Ae("subscribe-impl-presets",{id:rd}).catch(p=>{t("subscribe-impl-presets failed: %o",p)}),Ht=()=>Ae("unsubscribe-impl-presets",{id:rd}))},wt=function(p){if(!p)return"Unknown";let g=p.split("/").filter(Boolean);return g.length>0?g[g.length-1]:"Unknown"};var _=Ue,y=te,T=De,A=pe,R=O,N=X,Y=je,Z=be,B=Se,U=ot,I=_e,W=w,b=E,C=P,z=ke,re=J,L=Le,M=gt,ue=Ze,fe=St,de=vt,Be=wt;let Qe=document.getElementById("header-loading"),Ve=zi(Qe),Me=vc(e),le=Yu(),Ae=Ve.wrapSend((p,g)=>le.send(p,g)),Ie=Di(Ae),Ee=Ni(),he=ji(),We=Fi(),et=wi(),Te=qi(),tt=yi(),K=vi(),q=ki();le.on("impl-presets-snapshot",p=>{let g=p;g&&typeof g.revision=="number"&&Array.isArray(g.presets)&&K.set({revision:g.revision,presets:g.presets})}),le.on("monitor-pipeline-snapshot",p=>{let g=p;if(!(!g||!Array.isArray(g.workspaces)))try{et.set(g.workspaces,g.workspaces_state)}catch{}}),le.on("ui-order-snapshot",p=>{let g=p;if(g&&typeof g.revision=="number")try{Te.set({revision:g.revision,order:g.order&&typeof g.order=="object"?g.order:{}})}catch{}}),le.on("display-policy-snapshot",p=>{let g=p;if(g&&g.policy&&typeof g.policy=="object")try{tt.set(g.policy)}catch{}}),le.on("session-log-snapshot",p=>{let g=p;if(g&&typeof g.id=="string")try{q.set(g.id,Array.isArray(g.lines)?g.lines:[],typeof g.last_event_at=="number"?g.last_event_at:null)}catch{}}),le.on("session-log-append",p=>{let g=p;if(g&&typeof g.id=="string")try{q.append(g.id,g.event)}catch{}}),le.on("snapshot",p=>{let g=p,x=g&&typeof g.id=="string"?g.id:"",j=x?Ee.getStore(x):null;if(j&&g&&g.type==="snapshot")try{j.applyPush(g)}catch{}}),le.on("upsert",p=>{let g=p,x=g&&typeof g.id=="string"?g.id:"",j=x?Ee.getStore(x):null;if(j&&g&&g.type==="upsert")try{j.applyPush(g)}catch{}}),le.on("delete",p=>{let g=p,x=g&&typeof g.id=="string"?g.id:"",j=x?Ee.getStore(x):null;if(j&&g&&g.type==="delete")try{j.applyPush(g)}catch{}});let ne=null,Oe=null,Fe=null,ze=null,Ce=()=>{},ct=new Promise(p=>{Ce=()=>p(void 0)}),Ye=!1,G=!1;async function rt(p){let g=te(p);if(g===Oe||g===Fe)return;Fe=g;let x=`detail:${p}`,j={type:"issue-detail",params:{id:p}};try{Ee.register(x,j)}catch(we){t("register detail store failed: %o",we)}try{let we=await Ie.subscribeList(x,j);if(Je.getState().selected_id!==p||te(p)!==g){await we().catch(()=>{});return}ne&&await ne().catch(()=>{}),ne=we,Oe=g}catch(we){t("detail subscribe failed: %o",we),Ue(we,"issue details")}finally{Fe===g&&(Fe=null)}}let h=new Map,$=new Set,k={board:0,worker:0},V=!1,se=Nt;try{let p=window.localStorage.getItem(nd);Ut(p)&&(se=p)}catch{}let ce=Nt;try{let p=window.localStorage.getItem(Rg);Ut(p)&&(ce=p)}catch{}async function ye(p){if(!Ut(p)||p===se)return;se=p;try{window.localStorage.setItem(nd,p)}catch{}let g=h.get(Ir);if(!g)return;h.delete(Ir),await g().catch(()=>{});let x=je();try{Ee.register(Ir,x)}catch(j){t("register %s store failed: %o",Ir,j)}try{let j=await Ie.subscribeList(Ir,x);h.set(Ir,j)}catch(j){t("re-subscribe %s failed: %o",Ir,j),Ue(j,"board")}}async function st(p){if(!Ut(p)||p===ce)return;ce=p;let g=F.get(Rr);if(!g)return;F.delete(Rr),await g().catch(()=>{});let x=be();try{Ee.register(Rr,x)}catch(j){t("register %s store failed: %o",Rr,j)}try{let j=await Ie.subscribeList(Rr,x);F.set(Rr,j)}catch(j){t("re-subscribe %s failed: %o",Rr,j),Ue(j,"worker")}}let F=new Map,ee=null,Q=null,xe=null,ht=null,Ht=null;async function Ot(){ht=null,tt.clear(),Ht=null,K.clear(),ee=null,Q=null,h.clear(),F.clear(),k.board+=1,k.worker+=1,vt();let p=Je.getState().workspace.current?.path;if(p)try{await le.send("set-workspace",{path:p})}catch(x){t("workspace restore after reconnect failed: %o",x);return}Ze();let g=Je.getState();Se(g.view==="board"),_e(g.view==="worker"),ke(g.view==="monitor"),E(g.view==="board"||g.view==="worker"||!!g.selected_id)}async function rr(){t("clearing all subscriptions for workspace switch"),ot(),w(),P(),he.clear(),gt(),Le(),St(),Ze(),De();let p=Je.getState();if(p.selected_id)try{Ee.unregister(`detail:${p.selected_id}`)}catch{}let g=Je.getState();Se(g.view==="board"),_e(g.view==="worker"),ke(g.view==="monitor"),E(g.view==="board"||g.view==="worker"||!!g.selected_id),g.selected_id&&pe(g.selected_id)}async function nr(p){t("requesting workspace switch to %s",p),G=!0;try{let g=await le.send("set-workspace",{path:p});t("workspace switch result: %o",g),g&&g.workspace&&(Je.setState({workspace:{current:{path:g.workspace.root_dir,database:g.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",p),g.changed&&(await rr(),oe("Switched to "+wt(p),"success",2e3)))}catch(g){throw t("workspace switch failed: %o",g),oe("Failed to switch workspace","error",3e3),g}finally{G=!1}}async function sr(p){t("requesting workspace git pull for %s",p);try{let g=await le.send("git-pull-workspace",{});t("workspace git pull result: %o",g);let x=g?.status;if(x==="up_to_date"){oe("Already up to date","success",2e3);return}if(x==="stash_pop_conflict"){oe("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}oe("Git pulled "+wt(p),"success",2e3)}catch(g){t("workspace git pull failed: %o",g);let x=g?.code,j=g?.message;if(x==="rebase_conflict"){oe("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(x==="rebase_conflict_abort_failed"){oe("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(x==="busy"){oe("Git pull skipped: another operation is running","warning",3e3);return}let we=j?`: ${j}`:"";throw oe(`Git pull failed${we}`,"error",3e3),g}}async function fr(p,g){t("setting workspace visibility %s \u2192 %s",p,String(g));try{await le.send("set-workspace-visibility",{path:p,visible:g}),await Gt()}catch(x){t("workspace visibility update failed: %o",x),oe("Failed to update project visibility","error",3e3)}}async function Gt(){try{let p=await le.send("list-workspaces",{});if(t("workspaces loaded: %o",p),p&&Array.isArray(p.workspaces)){let g=p.workspaces.map(ge=>({path:ge.path,database:ge.database,pid:ge.pid,version:ge.version})),x=p.current?{path:p.current.root_dir,database:p.current.db_path}:null,j=Array.isArray(p.hidden)?p.hidden.filter(ge=>typeof ge=="string"):[];Je.setState({workspace:{current:x,available:g,hidden:j}});let we=window.localStorage.getItem("beads-ui.workspace");we&&(!g.some(Re=>Re.path===we)||j.includes(we)?window.localStorage.removeItem("beads-ui.workspace"):x&&we!==x.path&&(t("restoring saved workspace preference: %s",we),await nr(we)))}}catch(p){t("failed to load workspaces: %o",p)}}le.on("workspace-changed",p=>{t("workspace-changed event: %o",p),p&&p.root_dir&&(Je.setState({workspace:{current:{path:p.root_dir,database:p.db_path}}}),Gt(),rr())});let or=!1;if(typeof le.onConnection=="function"){let p=g=>{t("ws state %s",g),g==="reconnecting"||g==="closed"?(or=!0,oe("Connection lost. Reconnecting\u2026","error",4e3)):g==="open"&&or&&(or=!1,oe("Reconnected","success",2200),Cg(Je,(x,j)=>{t(`${x}: %o`,j)}),Ot())};le.onConnection(p)}let ar="board";try{let p=window.localStorage.getItem("beads-ui.view");(p==="board"||p==="worker"||p==="monitor")&&(ar=p)}catch(p){t("view parse error: %o",p)}let Je=Wi({config:Tg(),view:ar});le.on("worker-queue-snapshot",p=>{let g=p;if(!g||!g.queue)return;let x=Je.getState().workspace.current?.path;if(typeof x=="string"&&x.length>0&&g.root_dir!==x){t("dropping worker-queue snapshot for %s",String(g.root_dir));return}try{he.set(g.queue)}catch{}}),le.on("worker-parallel-analysis-snapshot",p=>{let g=p;if(!g)return;let x=Je.getState().workspace.current?.path;if(!(typeof x=="string"&&x.length>0&&typeof g.root_dir=="string"&&g.root_dir!==x))try{We.set({settings:g.settings,job:g.job??null,runs:Array.isArray(g.runs)?g.runs:[],last_good:g.last_good??null})}catch{}});let Pt=Bi(Je);Pt.start();let ve=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults"]),c=async(p,g)=>{try{return await Ae(p,g)}catch(x){if(ve.has(p))throw x;return[]}};su({global_element:n,repo_element:s},Je,Pt);let m=document.getElementById("workspace-picker");m&&Gu(m,Je,nr,sr,fr);let S=lu(e,(p,g)=>Ae(p,g));try{let p=document.getElementById("new-issue-btn");p&&p.addEventListener("click",()=>S.open())}catch{}let H=pu(e,{policyStore:tt,queueStore:he,implPresetStore:K,transport:(p,g)=>Ae(p,g),onOpenChange:p=>{V=p,X()},labelOptions:()=>{let p=new Set;for(let[g]of Pa)for(let x of Ee.snapshotFor(g)||[]){let j=x.labels;if(Array.isArray(j))for(let we of j)typeof we=="string"&&we.length>0&&p.add(we)}return Array.from(p).sort()}});try{let p=document.getElementById("display-settings-btn");p&&(p.setAttribute("aria-label","\uC124\uC815"),p.setAttribute("title","\uC124\uC815"),p.addEventListener("click",()=>H.open()))}catch{}let ae=tl(i,{gotoIssue:p=>Pt.gotoIssue(p),issueStores:Ee,transport:c,workerQueueStore:he,uiOrderStore:Te,displayPolicyStore:tt,closedRange:se,onClosedRangeChange:p=>{ye(p)},onNewIssue:()=>S.open()}),$e=La(u,{transport:c,issueStores:Ee,queueStore:he,analysisStore:We,sessionLogStore:q,uiOrderStore:Te,gotoIssue:p=>Je.setState({selected_id:p}),getWorkspacePath:()=>Je.getState().workspace.current?.path,doneRange:ce,onDoneRangeChange:p=>{st(p)}}),me=nu(d,{transport:c,pipelineStore:et,execPresetStore:K,gotoIssue:p=>Pt.gotoIssue(p),getWorkspacePath:()=>Je.getState().workspace.current?.path,switchWorkspace:p=>nr(p)}),Ke=yc(f,{issueStores:Ee,transport:c,queueStore:he,execPresetStore:K,sessionLogStore:q,getWorkspacePath:()=>Je.getState().workspace.current?.path,onNavigate:p=>{Je.getState().view==="worker"?Je.setState({selected_id:p}):Pt.gotoIssue(p)},onClose:()=>{let p=Je.getState();Je.setState({selected_id:null});try{Pt.gotoView(p.view==="worker"||p.view==="monitor"?p.view:"board")}catch{}},onOpenExecPresets:()=>{H.open("execution")}}),nt=Je.getState().selected_id;nt&&(f.hidden=!1,Ke.load(nt),pe(nt)),Je.subscribe(p=>{let g=p.selected_id;g?(f.hidden=!1,Ke.load(g),G||pe(g)):(Ke.clear(),f.hidden=!0,De())});let Ne=p=>{i.hidden=p.view!=="board",u.hidden=p.view!=="worker",d.hidden=p.view!=="monitor",o&&o.classList.toggle("is-quiet",p.view==="monitor"),Se(p.view==="board"),_e(p.view==="worker"),ke(p.view==="monitor"),E(p.view==="board"||p.view==="worker"||V||!!p.selected_id),!p.selected_id&&p.view==="board"&&ae.load(),p.view==="worker"&&$e.load(),p.view==="monitor"?me.load():me.pause(),window.localStorage.setItem("beads-ui.view",p.view)};Je.subscribe(Ne),Ne(Je.getState()),Le(),Ze(),vt(),Gt().finally(()=>{Ye=!0,Ce()}),window.addEventListener("keydown",p=>{let g=p.ctrlKey||p.metaKey,x=String(p.key||"").toLowerCase(),j=p.target,we=j&&j.tagName?String(j.tagName).toLowerCase():"",ge=we==="input"||we==="textarea"||we==="select"||j&&typeof j.isContentEditable=="boolean"&&j.isContentEditable;g&&x==="n"&&(ge||(p.preventDefault(),S.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let r=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let t=document.getElementById("app");t&&Ig(t)});export{Ig as bootstrap,Tg as readBootstrapConfig,Cg as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
