var $d=Object.create;var bo=Object.defineProperty;var xd=Object.getOwnPropertyDescriptor;var Ad=Object.getOwnPropertyNames;var Sd=Object.getPrototypeOf,Ed=Object.prototype.hasOwnProperty;var Td=(e,t,r)=>t in e?bo(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var ho=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Cd=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Ad(t))!Ed.call(e,s)&&s!==r&&bo(e,s,{get:()=>t[s],enumerable:!(n=xd(t,s))||n.enumerable});return e};var Rd=(e,t,r)=>(r=e!=null?$d(Sd(e)):{},Cd(t||!e||!e.__esModule?bo(r,"default",{value:e,enumerable:!0}):r,e));var lt=(e,t,r)=>Td(e,typeof t!="symbol"?t+"":t,r);var Si=ho((zg,Ai)=>{var Qr=1e3,Jr=Qr*60,en=Jr*60,qr=en*24,Od=qr*7,Md=qr*365.25;Ai.exports=function(e,t){t=t||{};var r=typeof e;if(r==="string"&&e.length>0)return Pd(e);if(r==="number"&&isFinite(e))return t.long?Nd(e):Dd(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function Pd(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*Md;case"weeks":case"week":case"w":return r*Od;case"days":case"day":case"d":return r*qr;case"hours":case"hour":case"hrs":case"hr":case"h":return r*en;case"minutes":case"minute":case"mins":case"min":case"m":return r*Jr;case"seconds":case"second":case"secs":case"sec":case"s":return r*Qr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function Dd(e){var t=Math.abs(e);return t>=qr?Math.round(e/qr)+"d":t>=en?Math.round(e/en)+"h":t>=Jr?Math.round(e/Jr)+"m":t>=Qr?Math.round(e/Qr)+"s":e+"ms"}function Nd(e){var t=Math.abs(e);return t>=qr?ds(e,t,qr,"day"):t>=en?ds(e,t,en,"hour"):t>=Jr?ds(e,t,Jr,"minute"):t>=Qr?ds(e,t,Qr,"second"):e+" ms"}function ds(e,t,r,n){var s=t>=r*1.5;return Math.round(e/r)+" "+n+(s?"s":"")}});var Ti=ho((Hg,Ei)=>{function qd(e){r.debug=r,r.default=r,r.coerce=u,r.disable=a,r.enable=s,r.enabled=c,r.humanize=Si(),r.destroy=d,Object.keys(e).forEach(f=>{r[f]=e[f]}),r.names=[],r.skips=[],r.formatters={};function t(f){let _=0;for(let y=0;y<f.length;y++)_=(_<<5)-_+f.charCodeAt(y),_|=0;return r.colors[Math.abs(_)%r.colors.length]}r.selectColor=t;function r(f){let _,y=null,A,E;function I(...j){if(!I.enabled)return;let te=I,Q=Number(new Date),O=Q-(_||Q);te.diff=O,te.prev=_,te.curr=Q,_=Q,j[0]=r.coerce(j[0]),typeof j[0]!="string"&&j.unshift("%O");let M=0;j[0]=j[0].replace(/%([a-zA-Z%])/g,(F,b)=>{if(F==="%%")return"%";M++;let C=r.formatters[b];if(typeof C=="function"){let z=j[M];F=C.call(te,z),j.splice(M,1),M--}return F}),r.formatArgs.call(te,j),(te.log||r.log).apply(te,j)}return I.namespace=f,I.useColors=r.useColors(),I.color=r.selectColor(f),I.extend=n,I.destroy=r.destroy,Object.defineProperty(I,"enabled",{enumerable:!0,configurable:!1,get:()=>y!==null?y:(A!==r.namespaces&&(A=r.namespaces,E=r.enabled(f)),E),set:j=>{y=j}}),typeof r.init=="function"&&r.init(I),I}function n(f,_){let y=r(this.namespace+(typeof _>"u"?":":_)+f);return y.log=this.log,y}function s(f){r.save(f),r.namespaces=f,r.names=[],r.skips=[];let _=(typeof f=="string"?f:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let y of _)y[0]==="-"?r.skips.push(y.slice(1)):r.names.push(y)}function o(f,_){let y=0,A=0,E=-1,I=0;for(;y<f.length;)if(A<_.length&&(_[A]===f[y]||_[A]==="*"))_[A]==="*"?(E=A,I=y,A++):(y++,A++);else if(E!==-1)A=E+1,I++,y=I;else return!1;for(;A<_.length&&_[A]==="*";)A++;return A===_.length}function a(){let f=[...r.names,...r.skips.map(_=>"-"+_)].join(",");return r.enable(""),f}function c(f){for(let _ of r.skips)if(o(f,_))return!1;for(let _ of r.names)if(o(f,_))return!0;return!1}function u(f){return f instanceof Error?f.stack||f.message:f}function d(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}Ei.exports=qd});var Ci=ho((Mt,ps)=>{Mt.formatArgs=jd;Mt.save=Bd;Mt.load=Ud;Mt.useColors=Fd;Mt.storage=Wd();Mt.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();Mt.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Fd(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function jd(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+ps.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let r=0,n=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),e.splice(n,0,t)}Mt.log=console.debug||console.log||(()=>{});function Bd(e){try{e?Mt.storage.setItem("debug",e):Mt.storage.removeItem("debug")}catch{}}function Ud(){let e;try{e=Mt.storage.getItem("debug")||Mt.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function Wd(){try{return localStorage}catch{}}ps.exports=Ti()(Mt);var{formatters:zd}=ps.exports;zd.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var hn=globalThis,os=hn.trustedTypes,ui=os?os.createPolicy("lit-html",{createHTML:e=>e}):void 0,vo="$lit$",_r=`lit$${Math.random().toFixed(9).slice(2)}$`,wo="?"+_r,Id=`<${wo}>`,Mr=document,yn=()=>Mr.createComment(""),vn=e=>e===null||typeof e!="object"&&typeof e!="function",ko=Array.isArray,gi=e=>ko(e)||typeof e?.[Symbol.iterator]=="function",yo=`[ 	
\f\r]`,bn=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,di=/-->/g,pi=/>/g,Lr=RegExp(`>|${yo}(?:([^\\s"'>=/]+)(${yo}*=${yo}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),fi=/'/g,_i=/"/g,bi=/^(?:script|style|textarea|title)$/i,$o=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),i=$o(1),$r=$o(2),Ng=$o(3),Bt=Symbol.for("lit-noChange"),bt=Symbol.for("lit-nothing"),mi=new WeakMap,Or=Mr.createTreeWalker(Mr,129);function hi(e,t){if(!ko(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return ui!==void 0?ui.createHTML(t):t}var yi=(e,t)=>{let r=e.length-1,n=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=bn;for(let c=0;c<r;c++){let u=e[c],d,f,_=-1,y=0;for(;y<u.length&&(a.lastIndex=y,f=a.exec(u),f!==null);)y=a.lastIndex,a===bn?f[1]==="!--"?a=di:f[1]!==void 0?a=pi:f[2]!==void 0?(bi.test(f[2])&&(s=RegExp("</"+f[2],"g")),a=Lr):f[3]!==void 0&&(a=Lr):a===Lr?f[0]===">"?(a=s??bn,_=-1):f[1]===void 0?_=-2:(_=a.lastIndex-f[2].length,d=f[1],a=f[3]===void 0?Lr:f[3]==='"'?_i:fi):a===_i||a===fi?a=Lr:a===di||a===pi?a=bn:(a=Lr,s=void 0);let A=a===Lr&&e[c+1].startsWith("/>")?" ":"";o+=a===bn?u+Id:_>=0?(n.push(d),u.slice(0,_)+vo+u.slice(_)+_r+A):u+_r+(_===-2?c:A)}return[hi(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},wn=class e{constructor({strings:t,_$litType$:r},n){let s;this.parts=[];let o=0,a=0,c=t.length-1,u=this.parts,[d,f]=yi(t,r);if(this.el=e.createElement(d,n),Or.currentNode=this.el.content,r===2||r===3){let _=this.el.content.firstChild;_.replaceWith(..._.childNodes)}for(;(s=Or.nextNode())!==null&&u.length<c;){if(s.nodeType===1){if(s.hasAttributes())for(let _ of s.getAttributeNames())if(_.endsWith(vo)){let y=f[a++],A=s.getAttribute(_).split(_r),E=/([.?@])?(.*)/.exec(y);u.push({type:1,index:o,name:E[2],strings:A,ctor:E[1]==="."?is:E[1]==="?"?ls:E[1]==="@"?cs:Dr}),s.removeAttribute(_)}else _.startsWith(_r)&&(u.push({type:6,index:o}),s.removeAttribute(_));if(bi.test(s.tagName)){let _=s.textContent.split(_r),y=_.length-1;if(y>0){s.textContent=os?os.emptyScript:"";for(let A=0;A<y;A++)s.append(_[A],yn()),Or.nextNode(),u.push({type:2,index:++o});s.append(_[y],yn())}}}else if(s.nodeType===8)if(s.data===wo)u.push({type:2,index:o});else{let _=-1;for(;(_=s.data.indexOf(_r,_+1))!==-1;)u.push({type:7,index:o}),_+=_r.length-1}o++}}static createElement(t,r){let n=Mr.createElement("template");return n.innerHTML=t,n}};function Pr(e,t,r=e,n){if(t===Bt)return t;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=vn(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(t=Pr(e,s._$AS(e,t.values),s,n)),t}var as=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:n}=this._$AD,s=(t?.creationScope??Mr).importNode(r,!0);Or.currentNode=s;let o=Or.nextNode(),a=0,c=0,u=n[0];for(;u!==void 0;){if(a===u.index){let d;u.type===2?d=new Xr(o,o.nextSibling,this,t):u.type===1?d=new u.ctor(o,u.name,u.strings,this,t):u.type===6&&(d=new us(o,this,t)),this._$AV.push(d),u=n[++c]}a!==u?.index&&(o=Or.nextNode(),a++)}return Or.currentNode=Mr,s}p(t){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}},Xr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,n,s){this.type=2,this._$AH=bt,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=Pr(this,t,r),vn(t)?t===bt||t==null||t===""?(this._$AH!==bt&&this._$AR(),this._$AH=bt):t!==this._$AH&&t!==Bt&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):gi(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==bt&&vn(this._$AH)?this._$AA.nextSibling.data=t:this.T(Mr.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=wn.createElement(hi(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new as(s,this),a=o.u(this.options);o.p(r),this.T(a),this._$AH=o}}_$AC(t){let r=mi.get(t.strings);return r===void 0&&mi.set(t.strings,r=new wn(t)),r}k(t){ko(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of t)s===r.length?r.push(n=new e(this.O(yn()),this.O(yn()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Dr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,n,s,o){this.type=1,this._$AH=bt,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=bt}_$AI(t,r=this,n,s){let o=this.strings,a=!1;if(o===void 0)t=Pr(this,t,r,0),a=!vn(t)||t!==this._$AH&&t!==Bt,a&&(this._$AH=t);else{let c=t,u,d;for(t=o[0],u=0;u<o.length-1;u++)d=Pr(this,c[n+u],r,u),d===Bt&&(d=this._$AH[u]),a||(a=!vn(d)||d!==this._$AH[u]),d===bt?t=bt:t!==bt&&(t+=(d??"")+o[u+1]),this._$AH[u]=d}a&&!s&&this.j(t)}j(t){t===bt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},is=class extends Dr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===bt?void 0:t}},ls=class extends Dr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==bt)}},cs=class extends Dr{constructor(t,r,n,s,o){super(t,r,n,s,o),this.type=5}_$AI(t,r=this){if((t=Pr(this,t,r,0)??bt)===Bt)return;let n=this._$AH,s=t===bt&&n!==bt||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==bt&&(n===bt||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},us=class{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){Pr(this,t)}},vi={M:vo,P:_r,A:wo,C:1,L:yi,R:as,D:gi,V:Pr,I:Xr,H:Dr,N:ls,U:cs,B:is,F:us},Ld=hn.litHtmlPolyfillSupport;Ld?.(wn,Xr),(hn.litHtmlVersions??(hn.litHtmlVersions=[])).push("3.3.1");var Ge=(e,t,r)=>{let n=r?.renderBefore??t,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new Xr(t.insertBefore(yn(),o),o,void 0,r??{})}return s._$AI(e),s};var Nt="today",cr=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Ut(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function Nr(e,t=Date.now()){switch(e){case"today":{let r=new Date(t);return r.setHours(0,0,0,0),r.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function wi(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function ki(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function $i(){let e=null,t=[],r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],n()},clear(){e=null,t=[],n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function xi(){let e=new Map,t=new Set;function r(s){return s.startsWith("session-log:")?s:`session-log:${s}`}function n(){for(let s of Array.from(t))try{s()}catch{}}return{set(s,o,a=null){e.set(r(s),{lines:Array.isArray(o)?[...o]:[],last_event_at:typeof a=="number"?a:null}),n()},append(s,o){let a=r(s),c=e.get(a)||{lines:[],last_event_at:null};c.lines=[...c.lines,o],c.last_event_at=Date.now(),e.set(a,c),n()},get(s){return e.get(r(s))||null},clear(s){typeof s=="string"?e.delete(r(s)):e.clear(),n()},subscribe(s){return t.add(s),()=>t.delete(s)}}}var Ri=Rd(Ci(),1);function mt(e){return(0,Ri.default)(`beads-ui:${e}`)}function Yt(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Fr(e,t){let r=Yt(e.created_at),n=Yt(t.created_at);if(r!==n)return r<n?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,c=t.id;return a<c?-1:a>c?1:0}function Oi(e,t){let r=Yt(e.created_at),n=Yt(t.created_at);if(r!==n)return r<n?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,c=t.id;return a<c?-1:a>c?1:0}function Mi(e,t){let r=Yt(e.updated_at),n=Yt(t.updated_at);if(r!==n)return r<n?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function Pi(e,t){let r=e.priority??2,n=t.priority??2;if(r!==n)return r-n;let s=Yt(e.created_at),o=Yt(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,c=t.id;return a<c?-1:a>c?1:0}function Di(e,t){let r=e.closed_at??0,n=t.closed_at??0;if(r!==n)return r<n?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var Hd=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Ii(e){let t=e&&e.metadata,r=t?t.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Li(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let r=Hd.exec(t);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Ni(e,t){let r=Ii(e),n=Ii(t);if(r!==n)return r<n?-1:1;let s=Li(e),o=Li(t);if(s!==o)return s<o?-1:1;let a=Yt(e&&e.created_at),c=Yt(t&&t.created_at);if(a!==c)return a<c?-1:1;let u=e&&e.id,d=t&&t.id;return u===d?0:String(u)<String(d)?-1:1}var xo=2**20;function tn(e,t){let r=e&&e.id;return t&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(t,r)&&typeof t[r]=="number"&&Number.isFinite(t[r])?t[r]:-Yt(e&&e.created_at)}function fs(e){return(t,r)=>{let n=tn(t,e),s=tn(r,e);if(n!==s)return n<s?-1:1;let o=t?.id,a=r?.id;return o<a?-1:o>a?1:0}}function Ao(e,t,r){let n=Array.isArray(e)?e:[],s=n.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?n[o-1]:null,c=o+1<s?n[o+1]:null;if(!a&&!c)return{rank:0};if(!a)return{rank:tn(c,r)-xo};if(!c)return{rank:tn(a,r)+xo};let u=tn(a,r),d=tn(c,r),f=(u+d)/2;return u<f&&f<d?{rank:f}:{renormalize:n.map((_,y)=>({bead_id:_.id,rank:y*xo}))}}function So(e,t={}){let r=mt(`issue-store:${e}`),n=new Map,s=[],o=0,a=new Set,c=!1,u=t.sort||Fr;function d(){for(let y of Array.from(a))try{y()}catch{}}function f(){s=Array.from(n.values()).sort(u)}function _(y){if(c||!y||y.id!==e)return;let A=Number(y.revision)||0;if(r("apply %s rev=%d",y.type,A),!(A<=o&&y.type!=="snapshot")){if(y.type==="snapshot"){if(A<=o)return;n.clear();let E=Array.isArray(y.issues)?y.issues:[];for(let I of E)I&&typeof I.id=="string"&&I.id.length>0&&n.set(I.id,I);f(),o=A,d();return}if(y.type==="upsert"){let E=y.issue;if(E&&typeof E.id=="string"&&E.id.length>0){let I=n.get(E.id);if(!I)n.set(E.id,E);else{let j=Number.isFinite(I.updated_at)?I.updated_at:0,te=Number.isFinite(E.updated_at)?E.updated_at:0;if(j<=te){for(let Q of Object.keys(I))Q in E||delete I[Q];for(let[Q,O]of Object.entries(E))I[Q]=O}}f()}o=A,d()}else if(y.type==="delete"){let E=String(y.issue_id||"");E&&(n.delete(E),f()),o=A,d()}}}return{id:e,subscribe(y){return a.add(y),()=>{a.delete(y)}},applyPush:_,snapshot(){return s},size(){return n.size},getById(y){return n.get(y)},dispose(){c=!0,n.clear(),s=[],a.clear(),o=0}}}function _s(e){let t=String(e.type||"").trim(),r={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];r[o]=String(a)}}let n=new URLSearchParams(r).toString();return n.length>0?`${t}?${n}`:t}function qi(e){let t=mt("subs"),r=new Map,n=new Map;function s(c,u){t("applyDelta %s +%d ~%d -%d",c,(u.added||[]).length,(u.updated||[]).length,(u.removed||[]).length);let d=n.get(c);if(!d||d.size===0)return;let f=Array.isArray(u.added)?u.added:[],_=Array.isArray(u.updated)?u.updated:[],y=Array.isArray(u.removed)?u.removed:[];for(let A of Array.from(d)){let E=r.get(A);if(!E)continue;let I=E.itemsById;for(let j of f)typeof j=="string"&&j.length>0&&I.set(j,!0);for(let j of _)typeof j=="string"&&j.length>0&&I.set(j,!0);for(let j of y)typeof j=="string"&&j.length>0&&I.delete(j)}}async function o(c,u){let d=_s(u);if(t("subscribe %s key=%s",c,d),!r.has(c))r.set(c,{key:d,itemsById:new Map});else{let _=r.get(c);if(_&&_.key!==d){let y=n.get(_.key);y&&(y.delete(c),y.size===0&&n.delete(_.key)),r.set(c,{key:d,itemsById:new Map})}}n.has(d)||n.set(d,new Set);let f=n.get(d);f&&f.add(c);try{await e("subscribe-list",{id:c,type:u.type,params:u.params})}catch(_){let y=r.get(c)||null;if(y){let A=n.get(y.key);A&&(A.delete(c),A.size===0&&n.delete(y.key))}throw r.delete(c),_}return async()=>{t("unsubscribe %s key=%s",c,d);try{await e("unsubscribe-list",{id:c})}catch{}let _=r.get(c)||null;if(_){let y=n.get(_.key);y&&(y.delete(c),y.size===0&&n.delete(_.key))}r.delete(c)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:_s,selectors:{getIds(c){let u=r.get(c);return u?Array.from(u.itemsById.keys()):[]},has(c,u){let d=r.get(c);return d?d.itemsById.has(u):!1},count(c){let u=r.get(c);return u?u.itemsById.size:0},getItemsById(c){let u=r.get(c),d={};if(!u)return d;for(let f of u.itemsById.keys())d[f]=!0;return d}}}}function Fi(){let e=mt("issue-stores"),t=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let u of Array.from(n))try{u()}catch{}}function a(u,d,f){let _=d?_s(d):"",y=r.get(u)||"",A=t.has(u);if(e("register %s key=%s (prev=%s)",u,_,y),A&&y&&_&&y!==_){let E=t.get(u);if(E)try{E.dispose()}catch{}let I=s.get(u);if(I){try{I()}catch{}s.delete(u)}let j=So(u,f);t.set(u,j);let te=j.subscribe(()=>o());s.set(u,te)}else if(!A){let E=So(u,f);t.set(u,E);let I=E.subscribe(()=>o());s.set(u,I)}return r.set(u,_),()=>c(u)}function c(u){e("unregister %s",u),r.delete(u);let d=t.get(u);d&&(d.dispose(),t.delete(u));let f=s.get(u);if(f){try{f()}catch{}s.delete(u)}}return{register:a,unregister:c,getStore(u){return t.get(u)||null},snapshotFor(u){let d=t.get(u);return d?d.snapshot().slice():[]},subscribe(u){return n.add(u),()=>n.delete(u)}}}function ji(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Bi(){let e=null,t=!1,r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},set(s){e=s,n()},isPending(){return t},setPending(s){let o=s===!0;o!==t&&(t=o,n())},clear(){e=null,t=!1,n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function Ui(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Eo(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function Gd(e){let t=String(e||""),r=t.startsWith("#")?t.slice(1):t,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let c=new URLSearchParams(s).get("issue");if(c)return decodeURIComponent(c)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function Vd(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function Wi(e){let t=mt("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):Gd(n),a=Vd(n);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let u=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==u&&(window.location.hash=u)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=Eo(o,n);t("goto issue %s (view=%s)",n,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?Eo(n,o):`#/${n}`;t("goto view %s (id=%s)",n,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var Kd=Object.freeze({workspace_config:{default_workspace:null}});function zi(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:Kd.workspace_config.default_workspace}}}function Hi(e={}){let t=mt("state"),r={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:zi(e.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let a={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?zi(o.config):r.config},c=a.workspace.current?.path!==r.workspace.current?.path||a.workspace.available.length!==r.workspace.available.length||a.workspace.hidden.length!==r.workspace.hidden.length||a.workspace.hidden.some((d,f)=>d!==r.workspace.hidden[f]),u=a.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;a.selected_id===r.selected_id&&a.view===r.view&&a.filters.status===r.filters.status&&a.filters.search===r.filters.search&&a.filters.type===r.filters.type&&a.board.closed_filter===r.board.closed_filter&&a.worker.selected_parent_id===r.worker.selected_parent_id&&a.worker.show_closed_children.length===r.worker.show_closed_children.length&&a.worker.show_closed_children.every((d,f)=>d===r.worker.show_closed_children[f])&&!c&&!u||(r=a,t("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function Gi(e){let t=mt("activity"),r=0,n=new Map,s=1;function o(){if(!e)return;let d=r>0;e.toggleAttribute("hidden",!d),e.setAttribute("aria-busy",d?"true":"false")}function a(){r+=1,t("start count=%d",r),o()}function c(){let d=r;r=Math.max(0,r-1),d<=0?t("done called but count was already %d",d):t("done count=%d\u2192%d",d,r),o()}function u(d){return async(_,y)=>{let A=s++,E=Date.now();n.set(A,{type:_,start_ts:E}),t("request start id=%d type=%s count=%d",A,_,r+1),a();let I=!1,j=()=>{I||(I=!0,n.delete(A),c())},te=setTimeout(()=>{I||(t("request TIMEOUT id=%d type=%s elapsed=%dms",A,_,Date.now()-E),j())},3e4);try{let Q=await d(_,y),O=Date.now()-E;return t("request done id=%d type=%s elapsed=%dms",A,_,O),Q}catch(Q){let O=Date.now()-E;throw t("request error id=%d type=%s elapsed=%dms err=%o",A,_,O,Q),Q}finally{clearTimeout(te),j()}}}return o(),{wrapSend:u,start:a,done:c,getCount:()=>r,getActiveRequests:()=>{let d=Date.now();return Array.from(n.entries()).map(([f,_])=>({id:f,type:_.type,elapsed_ms:d-_.start_ts}))}}}function se(e,t="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=e,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",t==="success"?n.style.background="#156d36":t==="warning"?n.style.background="#a36a00":t==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function ms(e=void 0,t=void 0){function r(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function n(o,a,c){let u=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return u.sort(Di),u;switch(c){case"created_desc":return u.sort(Fr),u;case"created_asc":return u.sort(Oi),u;case"updated_desc":return u.sort(Mi),u;case"priority":return u.sort(Pi),u;case"manual":default:{let d=r();return d?u.sort(fs(d)):u.sort(Fr),u}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let c of a)try{c()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function jr(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function $t(e){let t=jr(e);if(t===null)return"";let r=new Date(t),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function qt(e,t){let r=jr(e);if(r===null)return"";let s=(typeof t=="number"?t:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let c=Math.floor(s/864e5);if(c<7)return`${c}\uC77C \uC804`;let u=Math.floor(c/7);if(c<30)return`${u}\uC8FC \uC804`;let d=Math.floor(c/30);return d<12?`${d}\uAC1C\uC6D4 \uC804`:`${Math.floor(c/365)}\uB144 \uC804`}function gs(e){if(!Array.isArray(e))return null;let t=null,r=-1;for(let n of e){if(!n||n.status!=="in_progress")continue;let s=jr(n.updated_at)??0;if(t===null||s>r){t=n,r=s;continue}s===r&&String(n.id)<String(t.id)&&(t=n)}return t}function bs(e){let t=e.transport,r=e.uiOrderStore;function n(a,c){return"renormalize"in a?a.renormalize:[{bead_id:c,rank:a.rank}]}function s(a,c){let u={...a.order};for(let d of c)u[d.bead_id]=d.rank;r&&r.set({revision:a.revision,order:u})}async function o(a,c,u){if(!t||!r)return;let d=r.get()||{revision:0,order:{}},f=n(Ao(c,u,d.order),a);s(d,f);let _=await t("ui-order-set",{expected_revision:d.revision,entries:f});if(_&&_.conflict){let y={revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}};r.set(y);let A=n(Ao(c,u,y.order),a);s(y,A);let E=await t("ui-order-set",{expected_revision:y.revision,entries:A});E&&E.applied&&r.set({revision:typeof E.revision=="number"?E.revision:0,order:E.order||{}})}else _&&_.applied&&r.set({revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}})}return{applyReorder:o}}function hs(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function To(e,t){return!t||typeof e!="string"||e.length===0||hs(t.visible_labels).includes(e)?!0:hs(t.hidden_labels).includes(e)?!1:!hs(t.hidden_prefixes).some(r=>r.length>0&&e.startsWith(r))}function ys(e,t){return hs(e).filter(r=>To(r,t))}function xr(e,t){let r=e&&e.chips?e.chips[t]:void 0;return typeof r=="boolean"?r:!0}var Yd={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},Ki={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},Vi={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},Zd={review:"\u2713",skip:"\u2298"},Ar={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function Xd(e,t,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function Yi(e){let t=e&&e.fill||"none";return t==="none"?Ar.none:e&&e.stale===!0?Ar.stale:t==="dim"?Ar.dim:e&&e.glyph==="review"?Ar.review:e&&e.glyph==="skip"?Ar.skip:Ar.done}function Qd(e){if(!e||e.fill==="none"||!e.approval_state)return Yi(e);let t=[];return e.glyph==="review"?t.push(Ar.review):e.glyph==="skip"&&t.push(Ar.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function Jd(e,t,r){let n=Yd[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,a=Zd[t&&t.glyph||""]||"",c="bar";s==="dim"?c+=` b-${n} dim`:s==="full"&&(c+=` b-${n} full`),o&&(c+=" stale"),r&&(c+=" cur");let u=s==="none"?"lbl":`lbl l-${n} on`,d=r?`color: var(--stage-${n}-on)`:"";return i`
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
              ${cr.map(o=>i`<option
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
  `}var dp=200,pp={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},fp=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),tl="beads-ui.board.sort",rl=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function _p(){try{let e=window.localStorage.getItem(tl);if(e&&rl.has(e))return e}catch{}return"created_desc"}function nl(e,t){let r=mt("views:board"),n=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,c=t.displayPolicyStore,u=t.workerQueueStore,d=t.onClosedRangeChange,f=t.onNewIssue,_=t.closedRange||Nt,y=s?ms(s,a):null,A=bs({transport:o,uiOrderStore:a}),E=[],I=[],j=[],te=[],Q=[],O=[],M=!1,R=0,F=_p(),b=new Map,C=new Map,z=new Map,re=new Set,L={search:"",priority:"",type:"",labels:[]},D=!1,ue=null;function _e(U){return String(U.status||"open")==="open"}function de(U){let J=String(U.status||"open");return J==="open"||J==="blocked"}function Ue(U){let J=L.search.trim().toLowerCase(),me=L.priority,w=L.type,T=L.labels;return U.filter(N=>{if(J){let Z=String(N.id||"").toLowerCase(),we=String(N.title||"").toLowerCase();if(!Z.includes(J)&&!we.includes(J))return!1}if(me!==""&&String(N.priority)!==me||w!==""&&String(N.issue_type||"")!==w)return!1;if(T.length>0){let Z=Array.isArray(N.labels)?N.labels:[];if(!T.some(we=>Z.includes(we)))return!1}return!0})}function Je(){let U=new Set;for(let J of[E,I,j,te,Q,O])for(let me of J){let w=Array.isArray(me.labels)?me.labels:[];for(let T of w)typeof T=="string"&&T.length>0&&U.add(T)}return Array.from(U).sort()}function Ke(){return L.search.trim()!==""||L.priority!==""||L.type!==""||L.labels.length>0}function Me(){try{if(y){let U=y.selectBoardColumn("tab:board:in-progress","in_progress",F),J=y.selectBoardColumn("tab:board:blocked","blocked",F).filter(de),me=new Set(U.map(Le=>Le.id)),w=y.selectBoardColumn("tab:board:ready","ready",F).filter(Le=>_e(Le)&&!me.has(Le.id)),T=y.selectBoardColumn("tab:board:resolved","resolved",F),N=y.selectBoardColumn("tab:board:deferred","deferred",F),Z=y.selectBoardColumn("tab:board:closed","closed").slice(0,dp),we=[...J,...w,...U,...T,...Z];We(we);let X=new Set;for(let Le of we)Le&&Le.id&&!Ro(Le)&&X.add(Le.id);let $e=!Ke();E=$e?kn(J,X):J,I=$e?kn(w,X):w,j=$e?kn(U,X):U,te=$e?kn(T,X):T,Q=N,R=N.length,O=$e?kn(Z,X):Z,b=new Map;for(let Le of E)b.set(Le.id,"open");for(let Le of I)b.set(Le.id,"open");for(let Le of j)b.set(Le.id,"in_progress");for(let Le of te)b.set(Le.id,"resolved");for(let Le of Q)b.set(Le.id,"deferred");for(let Le of O)b.set(Le.id,"closed");C=new Map;for(let Le of E)C.set(Le.id,"blocked-col");for(let Le of I)C.set(Le.id,"ready-col");for(let Le of j)C.set(Le.id,"in-progress-col");for(let Le of te)C.set(Le.id,"resolved-col");for(let Le of O)C.set(Le.id,"closed-col")}P()}catch{E=[],I=[],j=[],te=[],Q=[],O=[],z=new Map,P()}}function We(U){let J=new Map;for(let w of U)w&&w.id&&!J.has(w.id)&&J.set(w.id,w);let me=new Map;for(let w of J.values()){let T=Ro(w);if(!T)continue;let N=me.get(T);N||(N=[],me.set(T,N)),N.push({id:w.id,title:w.title,status:w.status,metadata:w.metadata,workflow:w.workflow,created_at:w.created_at,updated_at:w.updated_at})}z=me}function le(U){let J=z.get(U)||[],me=0;for(let T of J)(T.status==="resolved"||T.status==="closed")&&(me+=1);let w=gs(J);return{total:J.length,count:me,current:w,children:J}}function xe(U){return!re.has(U)}function Re(U,J){U.preventDefault(),U.stopPropagation(),re.has(J)?re.delete(J):re.add(J),P()}function Ae(U,J){U.preventDefault(),U.stopPropagation(),n(J)}function he(U,J){U.preventDefault(),U.stopPropagation(),n(J)}function ze(U,J){ue||n(J)}function rt(U,J){U.preventDefault(),U.stopPropagation(),mp(J).then(me=>{me&&se("\uBCF5\uC0AC\uB428","success",1200)})}function Ee(U,J){ue=J,U.dataTransfer&&(U.dataTransfer.setData("text/plain",J),U.dataTransfer.effectAllowed="move"),U.target.classList.add("board-card--dragging")}function nt(U){U.target.classList.remove("board-card--dragging"),Be(),setTimeout(()=>{ue=null},0)}function K(U){let J=String(U.target.value||"");!J||J===_||(_=J,d&&d(J),P())}function B(){return c?c.get():null}function ne(U){let J=u?u.get():null,me=J?J.cleanup_failed:null;if(!me||typeof me!="object"||Array.isArray(me))return null;let w=me[U];return!w||typeof w!="object"||Array.isArray(w)?null:w}let Oe={onCardClick:ze,onCopyId:rt,onDragStart:Ee,onDragEnd:nt,onClosedRangeChange:K,rollupFor:le,isExpanded:xe,onRollupToggle:Re,onChildClick:Ae,onFromChipClick:he,cleanupFailureFor:ne,get policy(){return B()}};function je(U,J){ue||(pe(),n(J))}function He(U,J){U.preventDefault(),U.stopPropagation(),pe(),n(J)}let Te={...Oe,onCardClick:je,onChildClick:He,onFromChipClick:He,get policy(){return B()}};function ct(U){let J=U.target,me=e.querySelector(".board-filter__labels");J&&me&&me.contains(J)||ee()}function Ze(U){U.key==="Escape"&&ee()}function G(){D||(D=!0,document.addEventListener("mousedown",ct),document.addEventListener("keydown",Ze),P())}function ee(){D&&(D=!1,document.removeEventListener("mousedown",ct),document.removeEventListener("keydown",Ze),P())}function Ne(U){U.key==="Escape"&&pe()}function st(){M||(M=!0,document.addEventListener("keydown",Ne),P())}function pe(){M&&(M=!1,document.removeEventListener("keydown",Ne),P())}let h={onClose:pe,onOverlayClick(U){U.target===U.currentTarget&&pe()}},$={onSearchInput(U){L.search=String(U.target.value||""),Me()},onPriorityChange(U){L.priority=String(U.target.value||""),Me()},onTypeChange(U){L.type=String(U.target.value||""),Me()},onSortChange(U){let J=String(U.target.value||"");if(!(!rl.has(J)||J===F)){F=J;try{window.localStorage.setItem(tl,J)}catch{}Me()}},onDeferredToggle(){M?pe():st()},onLabelMenuToggle(){D?ee():G()},onLabelToggle(U){let J=L.labels.indexOf(U);J===-1?L.labels.push(U):L.labels.splice(J,1),Me()},onLabelClear(){L.labels.length!==0&&(L.labels=[],Me())},onNewIssue(){f&&f()}};function k(){return i`
      <div class="board-view">
        ${el(L,$,{sort_mode:F,deferred_popup_open:M,deferred_count:R,label_options:Je(),label_menu_open:D})}
        <div class="board-root">
          ${rn({title:"Blocked",id:"blocked-col",items:Ue(E)},Oe)}
          ${rn({title:"Ready",id:"ready-col",items:Ue(I)},Oe)}
          ${rn({title:"In progress",id:"in-progress-col",items:Ue(j)},Oe)}
          ${rn({title:"Resolved",id:"resolved-col",items:Ue(te)},Oe)}
          ${rn({title:"Closed",id:"closed-col",items:Ue(O),is_closed:!0,closed_range:_},Oe)}
        </div>
        ${M?Ji({items:Ue(Q),count:R},Te,h):""}
      </div>
    `}function P(){Ge(k(),e),V()}function V(){try{let U=e.querySelector("#deferred-popup");U&&!U.open&&(typeof U.showModal=="function"?U.showModal():U.setAttribute("open",""));let J=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let me of J)Array.from(me.querySelectorAll(".board-card")).forEach((T,N)=>{T.tabIndex=N===0?0:-1})}catch{}}async function Y(U,J){if(!o){se("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:U,status:J}),se("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(me){r("update-status failed: %o",me),se("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function ie(U){switch(U){case"blocked-col":return E;case"ready-col":return I;case"in-progress-col":return j;case"resolved-col":return te;default:return[]}}function ce(U,J,me){if(!o||!a)return;let w=ie(U),T=w.find($e=>$e.id===J);if(!T)return;let N=w.filter($e=>$e.id!==J),Z=me.closest?me.closest(".board-card"):null,we=N.length;if(Z){let $e=Z.getAttribute("data-issue-id");if($e===J)return;let Le=N.findIndex(ht=>ht.id===$e);Le>=0&&(we=Le)}let X=N.slice();X.splice(we,0,T),A.applyReorder(J,X,we)}function Be(){for(let U of Array.from(e.querySelectorAll(".board-column--drag-over")))U.classList.remove("board-column--drag-over")}let fe=null;e.addEventListener("dragover",U=>{U.preventDefault(),U.dataTransfer&&(U.dataTransfer.dropEffect="move");let me=U.target.closest(".board-column");me&&me!==fe&&(fe&&fe.classList.remove("board-column--drag-over"),me.classList.add("board-column--drag-over"),fe=me)}),e.addEventListener("dragleave",U=>{let J=U.relatedTarget;(!J||!e.contains(J))&&fe&&(fe.classList.remove("board-column--drag-over"),fe=null)}),e.addEventListener("drop",U=>{U.preventDefault(),fe&&(fe.classList.remove("board-column--drag-over"),fe=null);let J=U.target,me=J.closest(".board-column");if(!me)return;let w=U.dataTransfer?.getData("text/plain")||"";if(!w)return;let T=me.id,N=C.get(w);if(N&&N===T){if(fp.has(T)){if(F!=="manual"){se("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}ce(T,w,J)}return}let Z=pp[T];if(!Z){se("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}b.get(w)!==Z&&Y(w,Z)}),e.addEventListener("keydown",U=>{let J=U.target;if(!(J instanceof HTMLElement))return;let me=String(J.tagName||"").toLowerCase();if(me==="input"||me==="textarea"||me==="select"||me==="button"||me==="a"||J.isContentEditable===!0)return;let w=J.closest(".board-card");if(!w)return;let T=String(U.key||"");if(T==="Enter"||T===" "){U.preventDefault();let X=w.getAttribute("data-issue-id");X&&n(X);return}if(T!=="ArrowUp"&&T!=="ArrowDown"&&T!=="ArrowLeft"&&T!=="ArrowRight")return;U.preventDefault();let N=w.closest(".board-column");if(!N)return;let Z=Array.from(N.querySelectorAll(".board-card")),we=Z.indexOf(w);if(T==="ArrowDown"&&we<Z.length-1){Ie(w,Z[we+1]);return}if(T==="ArrowUp"&&we>0){Ie(w,Z[we-1]);return}if(T==="ArrowLeft"||T==="ArrowRight"){let X=Array.from(e.querySelectorAll(".board-column")),$e=X.indexOf(N),Le=T==="ArrowRight"?1:-1,ht=$e+Le;for(;ht>=0&&ht<X.length;){let yt=X[ht].querySelector(".board-card");if(yt){Ie(w,yt);return}ht+=Le}}});function Ie(U,J){try{U.tabIndex=-1,J.tabIndex=0,J.focus()}catch{}}let Se=null;y&&y.subscribe&&(Se=y.subscribe(()=>{try{Me()}catch{}}));let Pe=null;c&&c.subscribe&&(Pe=c.subscribe(()=>{try{Me()}catch{}}));let et=null;return u&&u.subscribe&&(et=u.subscribe(()=>{P()})),{async load(){r("load"),Me()},clear(){ee(),pe(),Se&&(Se(),Se=null),Pe&&(Pe(),Pe=null),et&&(et(),et=null),e.replaceChildren(),E=[],I=[],j=[],te=[],Q=[],O=[],b=new Map,C=new Map}}}function Ro(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function kn(e,t){return e.filter(r=>{let n=Ro(r);return!(n&&t.has(n))})}async function mp(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let r=!1;try{r=document.execCommand("copy")}finally{t.remove()}return r}catch{return!1}}async function Zt(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}function ur(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function Sr(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function gp(e,t=document){let r=t.createElement("dialog");r.className="continuation-dialog";let n=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),c=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",c.textContent=`${ur(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${ur(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,n.type="button",n.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",n.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",r.append(a,c,n,s,o),t.body.append(r),new Promise(u=>{let d=f=>{typeof r.close=="function"&&r.close(),r.remove(),u(f)};n.addEventListener("click",()=>d("prior_session")),s.addEventListener("click",()=>d("fresh_current")),o.addEventListener("click",()=>d(null)),r.addEventListener("cancel",f=>{f.preventDefault(),d(null)}),typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")})}async function mr(e,t,r={}){let n=e;for(r.onResult?.(n);n?.continuation_mismatch;){let s=n.continuation_mismatch,o=await gp(s);if(o===null)return n;n=await t(o,s.decision_token),r.onResult?.(n),n?.conflict&&r.refresh&&(n=await r.refresh(n),r.onResult?.(n))}return n}var bp=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_model","orchestration_model","orchestration_effort","orchestration_speed"],sl={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},hp=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function vt(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function _t(e){return typeof e=="string"&&e.length>0?e:null}function nn(e){return e.startsWith("gpt-")?e.slice(4):e}function dt(e,t,r,n,s){return{value:e,source:t,display:r,full_value:n,resolution:s}}function al(e,t,r){let n=_t(t[e]);if(n!==null)return{value:n,source:"pin"};let s=_t(r[e]);return s===null?null:{value:s,source:"global"}}function $n(e,t,r,n){return al(e,t,r)||{value:n,source:"base"}}function Io(e,t,r,n){let s=r?.implementation?.model_catalog;if(t&&vt(s?.[t])){let a=_t(s[t][e]);if(a!==null)return a}if(t&&Array.isArray(s?.[t])&&s[t].includes(e))return e;if(!t&&vt(s)){for(let a of Object.values(s))if(vt(a)){let c=_t(a[e]);if(c!==null)return c}else if(Array.isArray(a)&&a.includes(e))return e}let o=n?.model_index?.[e];return _t(n?.runners?.[o]?.models?.[e]?.id)||e}function yp(e,t){return _t(t?.review?.reviewers?.[e]?.model)||e}function sn(e,t,r=!1){if(e==="default")return dt(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let n=r?nn(e):e;return dt(e,t,n,e,"explicit")}function il(e,t,r){let n=t?.implementation?.model_catalog?.[e],s=[];vt(n)?s.push(...Object.keys(n)):Array.isArray(n)&&s.push(...n.filter(a=>typeof a=="string"));let o=r?.runners?.[e]?.models;if(vt(o))for(let a of Object.keys(o))s.includes(a)||s.push(a);return s}function vp(e,t){let r=[],n=e?.implementation?.model_catalog;vt(n)&&r.push(...Object.keys(n));let s=t?.runners;if(vt(s))for(let o of Object.keys(s))r.includes(o)||r.push(o);return r}function wp(e,t,r){if(e===null)return{runtime:null,offered:!1};let n=!1;for(let s of vp(t,r)){let o=il(s,t,r);if(o.length>0&&(n=!0),o.includes(e))return{runtime:s,offered:!0}}return{runtime:null,offered:n}}function Lo(e){return dt(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function ol(e,t,r){let n=al(e,t,r);return n?sn(n.value,n.source):dt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function on(e){let t=vt(e.pin)?e.pin:{},r=vt(e.global)?e.global:{},n=vt(e.execution_defaults)?e.execution_defaults:null,s=n?.supported===!0&&vt(n.session)?n.session:null,o=n?.supported===!0&&vt(n.orchestration)?n.orchestration:null,a=vt(e.runner_catalog)?e.runner_catalog:null,c=_t(r.quick_fix_impl_model),u=wp(c,s,a),d={};if(s){let f=$n("workflow_mode",t,r,_t(s.workflow_mode_default));d.workflow_mode=f.source==="base"?dt(f.value,"base",f.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",f.value,"default"):sn(f.value,f.source);for(let O of["spec_review","plan_review","impl_review"]){let M=`${O}_model`,R=_t(O==="plan_review"?f.value==="fast_track"?s.plan_review?.fast_track_default:s.plan_review?.standard_recommended:s.review?.default),F=$n(M,t,r,R);if(F.value===null)d[M]=dt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(F.value!=="self"&&F.value!=="skip"&&!vt(s.review?.reviewers?.[F.value]))d[M]=Lo(dt(F.value,F.source,"",null,"explicit"));else{let b=yp(F.value,s);d[M]=dt(F.value,F.source,nn(b),b,F.source==="base"?"default":"explicit")}}for(let[O,M]of Object.entries(sl)){let R=d[M].value;if(R==="self"||R==="skip"){d[O]=dt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let F=_t(s.review?.reviewers?.[R||""]?.effort),b=$n(O,t,r,F);d[O]=b.value===null?dt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):dt(b.value,b.source,b.value,b.value,b.source==="base"?"default":"explicit")}let _=vt(s.implementation?.default)?s.implementation.default:{},y=_t(e.route),A=y!==null&&["quick_fix","spec_backed","full_plan"].includes(y),E=vt(s.implementation?.route_defaults)?s.implementation.route_defaults:{},I=A&&vt(E[y])?E[y]:{};for(let O of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let M=$n(O,t,r,O==="impl_dispatch"?_t(I.dispatch)||_t(_.dispatch):_t(_[O.replace("impl_","")]));d[O]=M.value===null?dt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):dt(M.value,M.source,M.value,M.value,M.source==="base"?"default":"explicit")}let j=_t(t.impl_runtime),te=j==="inherit"?_t(e.controller_runtime):j,Q=y==="quick_fix"&&_t(t.impl_dispatch)===null&&u.runtime!==null&&(j===null||te===u.runtime);if(Q){let O=u.runtime,M=c;d.impl_dispatch=dt("delegated","global","\uC704\uC784 (\uC804\uC5ED quick_fix)","delegated","explicit"),j===null&&(d.impl_runtime=dt(O,"global",`${O} (\uC720\uB3C4)`,O,"explicit")),_t(t.impl_model)===null&&(d.impl_model=dt(M,"global",M,M,"explicit"))}if(d.impl_dispatch.value==="main"){d.impl_dispatch.display="\uBA54\uC778";for(let O of["impl_runtime","impl_model","impl_effort","impl_speed"])d[O]=dt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(d.impl_dispatch.value==="delegated"&&!Q&&(d.impl_dispatch.display="\uC704\uC784"),d.impl_runtime.value==="inherit"&&(d.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",d.impl_runtime.resolution="dynamic"),d.impl_model.value!==null){let O=d.impl_runtime.value==="inherit"?_t(e.controller_runtime):d.impl_runtime.value,M=O?il(O,s,a):[];if(d.impl_model.value!=="auto"&&M.length>0&&!M.includes(d.impl_model.value))d.impl_model=Lo(d.impl_model);else{let R=Io(d.impl_model.value,O,s,a);d.impl_model.display=nn(R),d.impl_model.full_value=R}}if(d.impl_effort.value==="auto"){let O=_t(e.transport)||(d.impl_runtime.value==="codex"?"codex-native-spawn":d.impl_runtime.value==="claude"?"implement-claude":null),M=O?_t(s.implementation?.effort_by_transport?.[O]?.auto):null;M&&!hp.has(M)?(d.impl_effort.display=`${M} (\uBE44\uD638\uD658)`,d.impl_effort.full_value=M,d.impl_effort.resolution="incompatible"):(d.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",d.impl_effort.resolution="dynamic")}d.impl_speed.value==="default"&&(d.impl_speed=d.impl_speed.source==="base"?dt("default","base","default (\uC77C\uBC18)","default","default"):sn("default",d.impl_speed.source))}}else for(let f of bp.filter(_=>!_.startsWith("orchestration_")))d[f]=ol(f,t,r);if(!s){for(let[f,_]of Object.entries(sl))(d[_].value==="self"||d[_].value==="skip")&&(d[f]=dt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(d.impl_dispatch.value==="main"){d.impl_dispatch.display="\uBA54\uC778";for(let f of["impl_runtime","impl_model","impl_effort","impl_speed"])d[f]=dt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else d.impl_dispatch.value==="delegated"&&(d.impl_dispatch.display="\uC704\uC784"),d.impl_runtime.value==="inherit"&&(d.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",d.impl_runtime.resolution="dynamic"),d.impl_effort.value==="auto"&&(d.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",d.impl_effort.resolution="dynamic")}for(let f of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!o){d[f]=ol(f,t,r);continue}let _=f.replace("orchestration_",""),y=_t(o[_]),A=$n(f,t,r,y);if(f==="orchestration_effort"&&A.source==="base"){d[f]=dt(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(A.value===null){d[f]=dt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(f==="orchestration_model"){let E=A.source==="base"?_t(o.model_id)||A.value:Io(A.value,null,s,a);d[f]=dt(A.value,A.source,nn(E),E,A.source==="base"?"default":"explicit");continue}if(A.value==="default"){d[f]=A.source==="base"?dt("default","base","default (\uC77C\uBC18)","default","default"):sn("default",A.source);continue}d[f]=sn(A.value,A.source)}if(s)if(c===null){let f=d.orchestration_model.full_value;d.quick_fix_impl_model=dt(null,"base",f===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${nn(f)})`,null,"default")}else if(u.runtime!==null){let f=Io(c,u.runtime,s,a);d.quick_fix_impl_model=dt(c,"global",nn(f),f,"explicit")}else u.offered?d.quick_fix_impl_model=Lo(dt(c,"global","",null,"explicit")):d.quick_fix_impl_model=sn(c,"global");return d}function kp(e,t){let r=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let n=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${r} (${n})`}function $s(e){let t=vt(e.pin)?e.pin:{},r=vt(e.global)?e.global:{},n=vt(e.resolution_global)?{...e.resolution_global}:{};delete n[e.key];let s=_=>{let y={...n,..._};return on({pin:e.layer==="pin"?y:t,global:e.layer==="pin"?r:y,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},o=e.layer==="pin"?t:r,a={...o};delete a[e.key];let c=s(a)[e.key],u=s(o)[e.key],d=_t(o[e.key]),f=[...e.choices];return d!==null&&!f.includes(d)&&f.unshift(d),{unset_label:kp(c,e.layer==="pin"),full_value:c.full_value,unavailable:c.resolution==="unavailable",disabled:u?.resolution==="not_applicable",options:f.map(_=>{let y=s({...o,[e.key]:_})[e.key];return{value:_,label:y.display,full_value:y.full_value}})}}function an(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let r=e.createElement("h2"),n=e.createElement("textarea"),s=e.createElement("div"),o=e.createElement("button"),a=e.createElement("button");return r.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",n.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",n.maxLength=4e3,s.className="resume-instructions-dialog__actions",o.type="button",o.textContent="\uC774\uC5B4\uD558\uAE30",a.type="button",a.textContent="\uCDE8\uC18C",s.append(o,a),t.append(r,n,s),e.body.append(t),new Promise(c=>{let u=!1,d=_=>{u||(u=!0,typeof t.close=="function"&&t.close(),t.remove(),c(_))},f=()=>d(n.value.trim());o.addEventListener("click",f),a.addEventListener("click",()=>d(null)),n.addEventListener("keydown",_=>{_.key==="Enter"&&(_.ctrlKey||_.metaKey)&&(_.preventDefault(),f())}),t.addEventListener("cancel",_=>{_.preventDefault(),d(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),n.focus()})}var pl="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function xt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var gr=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],xn=[...gr,"reasoning_output_tokens"],$p=["implementation","review-consult"];function Oo(e){let t=0;for(let r of gr)t+=xt(e?.[r]);return t}function xp(e){return!e||typeof e!="object"?!1:gr.some(t=>Number.isFinite(e[t]))}function ll(e){return!e||typeof e!="object"?!1:xn.some(t=>Number.isFinite(e[t]))}function Ap(e){let t={};for(let r of xn)e&&Number.isFinite(e[r])&&(t[r]=e[r]);return t}function cl(e){let t={};for(let r of xn)Number.isFinite(e[r])&&(t[r]=e[r]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function ul(e,t){return e==="codex"?xt(t.input_tokens)+xt(t.output_tokens):Oo(t)}function Sp(e){return e==="claude"?"Claude":"Codex"}function Ep(e){return`\u03C4 ${fl(e)}`}function Tp(e,t){let r=t.breakdown||{},n=[`\uC785\uB825 ${xt(r.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${xt(r.output_tokens).toLocaleString("en-US")}`];e==="claude"?n.push(`\uCE90\uC2DC\uC77D\uAE30 ${xt(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${xt(r.cache_creation_input_tokens).toLocaleString("en-US")}`):(n.push(`\uCE90\uC2DC\uC77D\uAE30 ${xt(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${xt(r.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(r.reasoning_output_tokens)&&n.push(`\uCD94\uB860\uCD9C\uB825 ${xt(r.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,n.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(pl),o.join(`
`)}function At(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let r of["claude","codex"]){let n=e.providers[r];n&&t.push({provider:r,label:`${Sp(r)} ${Ep(n.subtotal)}${typeof n.total_cost_usd=="number"&&Number.isFinite(n.total_cost_usd)?` \xB7 $${n.total_cost_usd.toFixed(2)}`:""}`,tooltip:Tp(r,n)})}return t}function As(e){let t={},r={claude:!0,codex:!1},n={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let c=t[o];c||(c={subtotal:0,breakdown:{}},t[o]=c),c.subtotal+=a.subtotal;for(let u of xn)Number.isFinite(a.breakdown[u])&&(c.breakdown[u]=xt(c.breakdown[u])+xt(a.breakdown[u]));a.replayed&&(c.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?n.claude+=a.total_cost_usd:r.claude=!1)}return t.claude&&r.claude&&(t.claude.total_cost_usd=n.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function Mo(e){return!e||typeof e!="object"?null:Wt({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function Cp(e){return e==="codex"?"codex":"claude"}function Er(){return{subtotal:0,breakdown:Ap(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function xs(e,t,r){e.subtotal+=t.subtotal;for(let n of xn)Number.isFinite(t.usage[n])&&(e.breakdown[n]=xt(e.breakdown[n])+xt(t.usage[n]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),r&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function dl(e,t){let r={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(r.legs=e.legs),e.replayed&&(r.replayed=!0),r}function fl(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function ln(e){return xp(e)?`\u03C4 ${fl(Oo(e))}`:null}function Xt(e){let t=ln(e);if(!t)return null;let r=e?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${t} \xB7 $${r.toFixed(2)}`:t}function cn(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${xt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${xt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${xt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${xt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${Oo(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&r.push(pl),r.join(`
`)}function Wt(e,t){let r={claude:Er(),codex:Er()},n={orchestrator:{claude:Er(),codex:Er()},implementation:{claude:Er(),codex:Er()},"review-consult":{claude:Er(),codex:Er()}},s=new Set;for(let c of Object.values(e||{})){if(!c||c.bead_id!==t)continue;let u=c.usage;if(ll(u)){let f=Cp(c.runner),_=cl(u),y={provider:f,role:"orchestrator",attempt_id:String(c.attempt_id||""),usage:_,subtotal:ul(f,_)};_.replayed===!0&&(y.replayed=!0),typeof c.model=="string"&&(y.model=c.model),typeof c.session_id=="string"&&(y.session_id=c.session_id),xs(r[f],y,!0),xs(n.orchestrator[f],y,!0)}let d=Array.isArray(c.usage_legs)?c.usage_legs:[];for(let f of d){if(!f||f.provider!=="codex"||!$p.includes(f.role)||!ll(f.usage))continue;let _=typeof f.receipt_id=="string"&&f.receipt_id.length>0?f.receipt_id:null;if(!_||s.has(_))continue;s.add(_);let y=cl(f.usage),A={provider:"codex",role:f.role,attempt_id:String(c.attempt_id||""),usage:y,subtotal:ul("codex",y)};A.receipt_id=_,typeof f.model=="string"&&(A.model=f.model),typeof f.effort=="string"&&f.effort.trim().length>0&&(A.effort=f.effort),typeof f.session_id=="string"?A.session_id=f.session_id:typeof f.thread_id=="string"&&(A.session_id=f.thread_id),typeof f.turn_id=="string"&&(A.turn_id=f.turn_id),typeof f.completed_at=="string"&&(A.completed_at=f.completed_at),y.replayed===!0&&(A.replayed=!0),xs(r.codex,A,!1),xs(n[A.role].codex,A,!1)}}let o={};for(let c of["claude","codex"]){let u=r[c];if(u.legs.length===0)continue;let d=dl(u,!1);c==="claude"&&u.outer_count>0&&u.outer_cost_count===u.outer_count&&(d.total_cost_usd=u.outer_cost),o[c]=d}if(Object.keys(o).length===0)return null;let a={};for(let c of["orchestrator","implementation","review-consult"]){let u={};for(let d of["claude","codex"]){let f=n[c][d];f.legs.length>0&&(u[d]={...dl(f,!0),legs:f.legs})}Object.keys(u).length>0&&(a[c]=u)}return{providers:o,roles:a}}var{entries:kl,setPrototypeOf:_l,isFrozen:Rp,getPrototypeOf:Ip,getOwnPropertyDescriptor:Lp}=Object,{freeze:Rt,seal:zt,create:Bo}=Object,{apply:Uo,construct:Wo}=typeof Reflect<"u"&&Reflect;Rt||(Rt=function(t){return t});zt||(zt=function(t){return t});Uo||(Uo=function(t,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return t.apply(r,s)});Wo||(Wo=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new t(...n)});var Ss=It(Array.prototype.forEach),Op=It(Array.prototype.lastIndexOf),ml=It(Array.prototype.pop),An=It(Array.prototype.push),Mp=It(Array.prototype.splice),Ts=It(String.prototype.toLowerCase),Po=It(String.prototype.toString),Do=It(String.prototype.match),Sn=It(String.prototype.replace),Pp=It(String.prototype.indexOf),Dp=It(String.prototype.trim),Qt=It(Object.prototype.hasOwnProperty),Ct=It(RegExp.prototype.test),En=Np(TypeError);function It(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return Uo(e,t,n)}}function Np(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return Wo(e,r)}}function Qe(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Ts;_l&&_l(e,null);let n=t.length;for(;n--;){let s=t[n];if(typeof s=="string"){let o=r(s);o!==s&&(Rp(t)||(t[n]=o),s=o)}e[s]=!0}return e}function qp(e){for(let t=0;t<e.length;t++)Qt(e,t)||(e[t]=null);return e}function br(e){let t=Bo(null);for(let[r,n]of kl(e))Qt(e,r)&&(Array.isArray(n)?t[r]=qp(n):n&&typeof n=="object"&&n.constructor===Object?t[r]=br(n):t[r]=n);return t}function Tn(e,t){for(;e!==null;){let n=Lp(e,t);if(n){if(n.get)return It(n.get);if(typeof n.value=="function")return It(n.value)}e=Ip(e)}function r(){return null}return r}var gl=Rt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),No=Rt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),qo=Rt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Fp=Rt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Fo=Rt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),jp=Rt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),bl=Rt(["#text"]),hl=Rt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),jo=Rt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),yl=Rt(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Es=Rt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Bp=zt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Up=zt(/<%[\w\W]*|[\w\W]*%>/gm),Wp=zt(/\$\{[\w\W]*/gm),zp=zt(/^data-[\-\w.\u00B7-\uFFFF]+$/),Hp=zt(/^aria-[\-\w]+$/),$l=zt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Gp=zt(/^(?:\w+script|data):/i),Vp=zt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),xl=zt(/^html$/i),Kp=zt(/^[a-z][.\w]*(-[.\w]+)+$/i),vl=Object.freeze({__proto__:null,ARIA_ATTR:Hp,ATTR_WHITESPACE:Vp,CUSTOM_ELEMENT:Kp,DATA_ATTR:zp,DOCTYPE_NAME:xl,ERB_EXPR:Up,IS_ALLOWED_URI:$l,IS_SCRIPT_OR_DATA:Gp,MUSTACHE_EXPR:Bp,TMPLIT_EXPR:Wp}),Cn={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Yp=function(){return typeof window>"u"?null:window},Zp=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},wl=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Al(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Yp(),t=ye=>Al(ye);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==Cn.document||!e.Element)return t.isSupported=!1,t;let{document:r}=e,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:c,Element:u,NodeFilter:d,NamedNodeMap:f=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:_,DOMParser:y,trustedTypes:A}=e,E=u.prototype,I=Tn(E,"cloneNode"),j=Tn(E,"remove"),te=Tn(E,"nextSibling"),Q=Tn(E,"childNodes"),O=Tn(E,"parentNode");if(typeof a=="function"){let ye=r.createElement("template");ye.content&&ye.content.ownerDocument&&(r=ye.content.ownerDocument)}let M,R="",{implementation:F,createNodeIterator:b,createDocumentFragment:C,getElementsByTagName:z}=r,{importNode:re}=n,L=wl();t.isSupported=typeof kl=="function"&&typeof O=="function"&&F&&F.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:D,ERB_EXPR:ue,TMPLIT_EXPR:_e,DATA_ATTR:de,ARIA_ATTR:Ue,IS_SCRIPT_OR_DATA:Je,ATTR_WHITESPACE:Ke,CUSTOM_ELEMENT:Me}=vl,{IS_ALLOWED_URI:We}=vl,le=null,xe=Qe({},[...gl,...No,...qo,...Fo,...bl]),Re=null,Ae=Qe({},[...hl,...jo,...yl,...Es]),he=Object.seal(Bo(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),ze=null,rt=null,Ee=Object.seal(Bo(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),nt=!0,K=!0,B=!1,ne=!0,Oe=!1,je=!0,He=!1,Te=!1,ct=!1,Ze=!1,G=!1,ee=!1,Ne=!0,st=!1,pe="user-content-",h=!0,$=!1,k={},P=null,V=Qe({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Y=null,ie=Qe({},["audio","video","img","source","image","track"]),ce=null,Be=Qe({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),fe="http://www.w3.org/1998/Math/MathML",Ie="http://www.w3.org/2000/svg",Se="http://www.w3.org/1999/xhtml",Pe=Se,et=!1,U=null,J=Qe({},[fe,Ie,Se],Po),me=Qe({},["mi","mo","mn","ms","mtext"]),w=Qe({},["annotation-xml"]),T=Qe({},["title","style","font","a","script"]),N=null,Z=["application/xhtml+xml","text/html"],we="text/html",X=null,$e=null,Le=r.createElement("form"),ht=function(l){return l instanceof RegExp||l instanceof Function},yt=function(){let l=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!($e&&$e===l)){if((!l||typeof l!="object")&&(l={}),l=br(l),N=Z.indexOf(l.PARSER_MEDIA_TYPE)===-1?we:l.PARSER_MEDIA_TYPE,X=N==="application/xhtml+xml"?Po:Ts,le=Qt(l,"ALLOWED_TAGS")?Qe({},l.ALLOWED_TAGS,X):xe,Re=Qt(l,"ALLOWED_ATTR")?Qe({},l.ALLOWED_ATTR,X):Ae,U=Qt(l,"ALLOWED_NAMESPACES")?Qe({},l.ALLOWED_NAMESPACES,Po):J,ce=Qt(l,"ADD_URI_SAFE_ATTR")?Qe(br(Be),l.ADD_URI_SAFE_ATTR,X):Be,Y=Qt(l,"ADD_DATA_URI_TAGS")?Qe(br(ie),l.ADD_DATA_URI_TAGS,X):ie,P=Qt(l,"FORBID_CONTENTS")?Qe({},l.FORBID_CONTENTS,X):V,ze=Qt(l,"FORBID_TAGS")?Qe({},l.FORBID_TAGS,X):br({}),rt=Qt(l,"FORBID_ATTR")?Qe({},l.FORBID_ATTR,X):br({}),k=Qt(l,"USE_PROFILES")?l.USE_PROFILES:!1,nt=l.ALLOW_ARIA_ATTR!==!1,K=l.ALLOW_DATA_ATTR!==!1,B=l.ALLOW_UNKNOWN_PROTOCOLS||!1,ne=l.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Oe=l.SAFE_FOR_TEMPLATES||!1,je=l.SAFE_FOR_XML!==!1,He=l.WHOLE_DOCUMENT||!1,Ze=l.RETURN_DOM||!1,G=l.RETURN_DOM_FRAGMENT||!1,ee=l.RETURN_TRUSTED_TYPE||!1,ct=l.FORCE_BODY||!1,Ne=l.SANITIZE_DOM!==!1,st=l.SANITIZE_NAMED_PROPS||!1,h=l.KEEP_CONTENT!==!1,$=l.IN_PLACE||!1,We=l.ALLOWED_URI_REGEXP||$l,Pe=l.NAMESPACE||Se,me=l.MATHML_TEXT_INTEGRATION_POINTS||me,w=l.HTML_INTEGRATION_POINTS||w,he=l.CUSTOM_ELEMENT_HANDLING||{},l.CUSTOM_ELEMENT_HANDLING&&ht(l.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(he.tagNameCheck=l.CUSTOM_ELEMENT_HANDLING.tagNameCheck),l.CUSTOM_ELEMENT_HANDLING&&ht(l.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(he.attributeNameCheck=l.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),l.CUSTOM_ELEMENT_HANDLING&&typeof l.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(he.allowCustomizedBuiltInElements=l.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Oe&&(K=!1),G&&(Ze=!0),k&&(le=Qe({},bl),Re=[],k.html===!0&&(Qe(le,gl),Qe(Re,hl)),k.svg===!0&&(Qe(le,No),Qe(Re,jo),Qe(Re,Es)),k.svgFilters===!0&&(Qe(le,qo),Qe(Re,jo),Qe(Re,Es)),k.mathMl===!0&&(Qe(le,Fo),Qe(Re,yl),Qe(Re,Es))),l.ADD_TAGS&&(typeof l.ADD_TAGS=="function"?Ee.tagCheck=l.ADD_TAGS:(le===xe&&(le=br(le)),Qe(le,l.ADD_TAGS,X))),l.ADD_ATTR&&(typeof l.ADD_ATTR=="function"?Ee.attributeCheck=l.ADD_ATTR:(Re===Ae&&(Re=br(Re)),Qe(Re,l.ADD_ATTR,X))),l.ADD_URI_SAFE_ATTR&&Qe(ce,l.ADD_URI_SAFE_ATTR,X),l.FORBID_CONTENTS&&(P===V&&(P=br(P)),Qe(P,l.FORBID_CONTENTS,X)),h&&(le["#text"]=!0),He&&Qe(le,["html","head","body"]),le.table&&(Qe(le,["tbody"]),delete ze.tbody),l.TRUSTED_TYPES_POLICY){if(typeof l.TRUSTED_TYPES_POLICY.createHTML!="function")throw En('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof l.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw En('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');M=l.TRUSTED_TYPES_POLICY,R=M.createHTML("")}else M===void 0&&(M=Zp(A,s)),M!==null&&typeof R=="string"&&(R=M.createHTML(""));Rt&&Rt(l),$e=l}},Xe=Qe({},[...No,...qo,...Fp]),Et=Qe({},[...Fo,...jp]),Ht=function(l){let m=O(l);(!m||!m.tagName)&&(m={namespaceURI:Pe,tagName:"template"});let S=Ts(l.tagName),H=Ts(m.tagName);return U[l.namespaceURI]?l.namespaceURI===Ie?m.namespaceURI===Se?S==="svg":m.namespaceURI===fe?S==="svg"&&(H==="annotation-xml"||me[H]):!!Xe[S]:l.namespaceURI===fe?m.namespaceURI===Se?S==="math":m.namespaceURI===Ie?S==="math"&&w[H]:!!Et[S]:l.namespaceURI===Se?m.namespaceURI===Ie&&!w[H]||m.namespaceURI===fe&&!me[H]?!1:!Et[S]&&(T[S]||!Xe[S]):!!(N==="application/xhtml+xml"&&U[l.namespaceURI]):!1},wt=function(l){An(t.removed,{element:l});try{O(l).removeChild(l)}catch{j(l)}},Ot=function(l,m){try{An(t.removed,{attribute:m.getAttributeNode(l),from:m})}catch{An(t.removed,{attribute:null,from:m})}if(m.removeAttribute(l),l==="is")if(Ze||G)try{wt(m)}catch{}else try{m.setAttribute(l,"")}catch{}},nr=function(l){let m=null,S=null;if(ct)l="<remove></remove>"+l;else{let ke=Do(l,/^[\r\n\t ]+/);S=ke&&ke[0]}N==="application/xhtml+xml"&&Pe===Se&&(l='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+l+"</body></html>");let H=M?M.createHTML(l):l;if(Pe===Se)try{m=new y().parseFromString(H,N)}catch{}if(!m||!m.documentElement){m=F.createDocument(Pe,"template",null);try{m.documentElement.innerHTML=et?R:H}catch{}}let oe=m.body||m.documentElement;return l&&S&&oe.insertBefore(r.createTextNode(S),oe.childNodes[0]||null),Pe===Se?z.call(m,He?"html":"body")[0]:He?m.documentElement:oe},sr=function(l){return b.call(l.ownerDocument||l,l,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},or=function(l){return l instanceof _&&(typeof l.nodeName!="string"||typeof l.textContent!="string"||typeof l.removeChild!="function"||!(l.attributes instanceof f)||typeof l.removeAttribute!="function"||typeof l.setAttribute!="function"||typeof l.namespaceURI!="string"||typeof l.insertBefore!="function"||typeof l.hasChildNodes!="function")},fr=function(l){return typeof c=="function"&&l instanceof c};function kt(ye,l,m){Ss(ye,S=>{S.call(t,l,m,$e)})}let Gt=function(l){let m=null;if(kt(L.beforeSanitizeElements,l,null),or(l))return wt(l),!0;let S=X(l.nodeName);if(kt(L.uponSanitizeElement,l,{tagName:S,allowedTags:le}),je&&l.hasChildNodes()&&!fr(l.firstElementChild)&&Ct(/<[/\w!]/g,l.innerHTML)&&Ct(/<[/\w!]/g,l.textContent)||l.nodeType===Cn.progressingInstruction||je&&l.nodeType===Cn.comment&&Ct(/<[/\w]/g,l.data))return wt(l),!0;if(!(Ee.tagCheck instanceof Function&&Ee.tagCheck(S))&&(!le[S]||ze[S])){if(!ze[S]&&ir(S)&&(he.tagNameCheck instanceof RegExp&&Ct(he.tagNameCheck,S)||he.tagNameCheck instanceof Function&&he.tagNameCheck(S)))return!1;if(h&&!P[S]){let H=O(l)||l.parentNode,oe=Q(l)||l.childNodes;if(oe&&H){let ke=oe.length;for(let ge=ke-1;ge>=0;--ge){let Ye=I(oe[ge],!0);Ye.__removalCount=(l.__removalCount||0)+1,H.insertBefore(Ye,te(l))}}}return wt(l),!0}return l instanceof u&&!Ht(l)||(S==="noscript"||S==="noembed"||S==="noframes")&&Ct(/<\/no(script|embed|frames)/i,l.innerHTML)?(wt(l),!0):(Oe&&l.nodeType===Cn.text&&(m=l.textContent,Ss([D,ue,_e],H=>{m=Sn(m,H," ")}),l.textContent!==m&&(An(t.removed,{element:l.cloneNode()}),l.textContent=m)),kt(L.afterSanitizeElements,l,null),!1)},ar=function(l,m,S){if(Ne&&(m==="id"||m==="name")&&(S in r||S in Le))return!1;if(!(K&&!rt[m]&&Ct(de,m))){if(!(nt&&Ct(Ue,m))){if(!(Ee.attributeCheck instanceof Function&&Ee.attributeCheck(m,l))){if(!Re[m]||rt[m]){if(!(ir(l)&&(he.tagNameCheck instanceof RegExp&&Ct(he.tagNameCheck,l)||he.tagNameCheck instanceof Function&&he.tagNameCheck(l))&&(he.attributeNameCheck instanceof RegExp&&Ct(he.attributeNameCheck,m)||he.attributeNameCheck instanceof Function&&he.attributeNameCheck(m,l))||m==="is"&&he.allowCustomizedBuiltInElements&&(he.tagNameCheck instanceof RegExp&&Ct(he.tagNameCheck,S)||he.tagNameCheck instanceof Function&&he.tagNameCheck(S))))return!1}else if(!ce[m]){if(!Ct(We,Sn(S,Ke,""))){if(!((m==="src"||m==="xlink:href"||m==="href")&&l!=="script"&&Pp(S,"data:")===0&&Y[l])){if(!(B&&!Ct(Je,Sn(S,Ke,"")))){if(S)return!1}}}}}}}return!0},ir=function(l){return l!=="annotation-xml"&&Do(l,Me)},tt=function(l){kt(L.beforeSanitizeAttributes,l,null);let{attributes:m}=l;if(!m||or(l))return;let S={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:Re,forceKeepAttr:void 0},H=m.length;for(;H--;){let oe=m[H],{name:ke,namespaceURI:ge,value:Ye}=oe,ot=X(ke),qe=Ye,p=ke==="value"?qe:Dp(qe);if(S.attrName=ot,S.attrValue=p,S.keepAttr=!0,S.forceKeepAttr=void 0,kt(L.uponSanitizeAttribute,l,S),p=S.attrValue,st&&(ot==="id"||ot==="name")&&(Ot(ke,l),p=pe+p),je&&Ct(/((--!?|])>)|<\/(style|title|textarea)/i,p)){Ot(ke,l);continue}if(ot==="attributename"&&Do(p,"href")){Ot(ke,l);continue}if(S.forceKeepAttr)continue;if(!S.keepAttr){Ot(ke,l);continue}if(!ne&&Ct(/\/>/i,p)){Ot(ke,l);continue}Oe&&Ss([D,ue,_e],x=>{p=Sn(p,x," ")});let g=X(l.nodeName);if(!ar(g,ot,p)){Ot(ke,l);continue}if(M&&typeof A=="object"&&typeof A.getAttributeType=="function"&&!ge)switch(A.getAttributeType(g,ot)){case"TrustedHTML":{p=M.createHTML(p);break}case"TrustedScriptURL":{p=M.createScriptURL(p);break}}if(p!==qe)try{ge?l.setAttributeNS(ge,ke,p):l.setAttribute(ke,p),or(l)?wt(l):ml(t.removed)}catch{Ot(ke,l)}}kt(L.afterSanitizeAttributes,l,null)},Pt=function ye(l){let m=null,S=sr(l);for(kt(L.beforeSanitizeShadowDOM,l,null);m=S.nextNode();)kt(L.uponSanitizeShadowNode,m,null),Gt(m),tt(m),m.content instanceof o&&ye(m.content);kt(L.afterSanitizeShadowDOM,l,null)};return t.sanitize=function(ye){let l=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},m=null,S=null,H=null,oe=null;if(et=!ye,et&&(ye="<!-->"),typeof ye!="string"&&!fr(ye))if(typeof ye.toString=="function"){if(ye=ye.toString(),typeof ye!="string")throw En("dirty is not a string, aborting")}else throw En("toString is not a function");if(!t.isSupported)return ye;if(Te||yt(l),t.removed=[],typeof ye=="string"&&($=!1),$){if(ye.nodeName){let Ye=X(ye.nodeName);if(!le[Ye]||ze[Ye])throw En("root node is forbidden and cannot be sanitized in-place")}}else if(ye instanceof c)m=nr("<!---->"),S=m.ownerDocument.importNode(ye,!0),S.nodeType===Cn.element&&S.nodeName==="BODY"||S.nodeName==="HTML"?m=S:m.appendChild(S);else{if(!Ze&&!Oe&&!He&&ye.indexOf("<")===-1)return M&&ee?M.createHTML(ye):ye;if(m=nr(ye),!m)return Ze?null:ee?R:""}m&&ct&&wt(m.firstChild);let ke=sr($?ye:m);for(;H=ke.nextNode();)Gt(H),tt(H),H.content instanceof o&&Pt(H.content);if($)return ye;if(Ze){if(G)for(oe=C.call(m.ownerDocument);m.firstChild;)oe.appendChild(m.firstChild);else oe=m;return(Re.shadowroot||Re.shadowrootmode)&&(oe=re.call(n,oe,!0)),oe}let ge=He?m.outerHTML:m.innerHTML;return He&&le["!doctype"]&&m.ownerDocument&&m.ownerDocument.doctype&&m.ownerDocument.doctype.name&&Ct(xl,m.ownerDocument.doctype.name)&&(ge="<!DOCTYPE "+m.ownerDocument.doctype.name+`>
`+ge),Oe&&Ss([D,ue,_e],Ye=>{ge=Sn(ge,Ye," ")}),M&&ee?M.createHTML(ge):ge},t.setConfig=function(){let ye=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};yt(ye),Te=!0},t.clearConfig=function(){$e=null,Te=!1},t.isValidAttribute=function(ye,l,m){$e||yt({});let S=X(ye),H=X(l);return ar(S,H,m)},t.addHook=function(ye,l){typeof l=="function"&&An(L[ye],l)},t.removeHook=function(ye,l){if(l!==void 0){let m=Op(L[ye],l);return m===-1?void 0:Mp(L[ye],m,1)[0]}return ml(L[ye])},t.removeHooks=function(ye){L[ye]=[]},t.removeAllHooks=function(){L=wl()},t}var Sl=Al();var hr={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Cs=e=>(...t)=>({_$litDirective$:e,values:t}),un=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,n){this._$Ct=t,this._$AM=r,this._$Ci=n}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var Rn=class extends un{constructor(t){if(super(t),this.it=bt,t.type!==hr.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===bt||t==null)return this._t=void 0,this.it=t;if(t===Bt)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};Rn.directiveName="unsafeHTML",Rn.resultType=1;var El=Cs(Rn);function Vo(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Wr=Vo();function Ml(e){Wr=e}var Mn={exec:()=>null};function at(e,t=""){let r=typeof e=="string"?e:e.source,n={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(Lt.caret,"$1"),r=r.replace(s,a),n},getRegex:()=>new RegExp(r,t)};return n}var Xp=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Lt={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Qp=/^(?:[ \t]*(?:\n|$))+/,Jp=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,ef=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Pn=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,tf=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Ko=/(?:[*+-]|\d{1,9}[.)])/,Pl=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Dl=at(Pl).replace(/bull/g,Ko).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),rf=at(Pl).replace(/bull/g,Ko).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Yo=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,nf=/^[^\n]+/,Zo=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,sf=at(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Zo).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),of=at(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Ko).getRegex(),Ps="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Xo=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,af=at("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Xo).replace("tag",Ps).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Nl=at(Yo).replace("hr",Pn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ps).getRegex(),lf=at(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Nl).getRegex(),Qo={blockquote:lf,code:Jp,def:sf,fences:ef,heading:tf,hr:Pn,html:af,lheading:Dl,list:of,newline:Qp,paragraph:Nl,table:Mn,text:nf},Tl=at("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Pn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ps).getRegex(),cf={...Qo,lheading:rf,table:Tl,paragraph:at(Yo).replace("hr",Pn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Tl).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ps).getRegex()},uf={...Qo,html:at(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Xo).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Mn,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:at(Yo).replace("hr",Pn).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Dl).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},df=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,pf=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,ql=/^( {2,}|\\)\n(?!\s*$)/,ff=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Ds=/[\p{P}\p{S}]/u,Jo=/[\s\p{P}\p{S}]/u,Fl=/[^\s\p{P}\p{S}]/u,_f=at(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Jo).getRegex(),jl=/(?!~)[\p{P}\p{S}]/u,mf=/(?!~)[\s\p{P}\p{S}]/u,gf=/(?:[^\s\p{P}\p{S}]|~)/u,bf=at(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Xp?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Bl=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,hf=at(Bl,"u").replace(/punct/g,Ds).getRegex(),yf=at(Bl,"u").replace(/punct/g,jl).getRegex(),Ul="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",vf=at(Ul,"gu").replace(/notPunctSpace/g,Fl).replace(/punctSpace/g,Jo).replace(/punct/g,Ds).getRegex(),wf=at(Ul,"gu").replace(/notPunctSpace/g,gf).replace(/punctSpace/g,mf).replace(/punct/g,jl).getRegex(),kf=at("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Fl).replace(/punctSpace/g,Jo).replace(/punct/g,Ds).getRegex(),$f=at(/\\(punct)/,"gu").replace(/punct/g,Ds).getRegex(),xf=at(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Af=at(Xo).replace("(?:-->|$)","-->").getRegex(),Sf=at("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Af).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Ls=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Ef=at(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Ls).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Wl=at(/^!?\[(label)\]\[(ref)\]/).replace("label",Ls).replace("ref",Zo).getRegex(),zl=at(/^!?\[(ref)\](?:\[\])?/).replace("ref",Zo).getRegex(),Tf=at("reflink|nolink(?!\\()","g").replace("reflink",Wl).replace("nolink",zl).getRegex(),Cl=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,ea={_backpedal:Mn,anyPunctuation:$f,autolink:xf,blockSkip:bf,br:ql,code:pf,del:Mn,emStrongLDelim:hf,emStrongRDelimAst:vf,emStrongRDelimUnd:kf,escape:df,link:Ef,nolink:zl,punctuation:_f,reflink:Wl,reflinkSearch:Tf,tag:Sf,text:ff,url:Mn},Cf={...ea,link:at(/^!?\[(label)\]\((.*?)\)/).replace("label",Ls).getRegex(),reflink:at(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Ls).getRegex()},zo={...ea,emStrongRDelimAst:wf,emStrongLDelim:yf,url:at(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Cl).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:at(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Cl).getRegex()},Rf={...zo,br:at(ql).replace("{2,}","*").getRegex(),text:at(zo.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Rs={normal:Qo,gfm:cf,pedantic:uf},In={normal:ea,gfm:zo,breaks:Rf,pedantic:Cf},If={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Rl=e=>If[e];function yr(e,t){if(t){if(Lt.escapeTest.test(e))return e.replace(Lt.escapeReplace,Rl)}else if(Lt.escapeTestNoEncode.test(e))return e.replace(Lt.escapeReplaceNoEncode,Rl);return e}function Il(e){try{e=encodeURI(e).replace(Lt.percentDecode,"%")}catch{return null}return e}function Ll(e,t){let r=e.replace(Lt.findPipe,(o,a,c)=>{let u=!1,d=a;for(;--d>=0&&c[d]==="\\";)u=!u;return u?"|":" |"}),n=r.split(Lt.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(Lt.slashPipe,"|");return n}function Ln(e,t,r){let n=e.length;if(n===0)return"";let s=0;for(;s<n;){let o=e.charAt(n-s-1);if(o===t&&!r)s++;else if(o!==t&&r)s++;else break}return e.slice(0,n-s)}function Lf(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return r>0?-2:-1}function Ol(e,t,r,n,s){let o=t.href,a=t.title||null,c=e[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let u={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:a,text:c,tokens:n.inlineTokens(c)};return n.state.inLink=!1,u}function Of(e,t,r){let n=e.match(r.other.indentCodeCompensation);if(n===null)return t;let s=n[1];return t.split(`
`).map(o=>{let a=o.match(r.other.beginningSpace);if(a===null)return o;let[c]=a;return c.length>=s.length?o.slice(s.length):o}).join(`
`)}var Os=class{constructor(e){lt(this,"options");lt(this,"rules");lt(this,"lexer");this.options=e||Wr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:Ln(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],n=Of(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let n=Ln(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Ln(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=Ln(t[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let a=!1,c=[],u;for(u=0;u<r.length;u++)if(this.rules.other.blockquoteStart.test(r[u]))c.push(r[u]),a=!0;else if(!a)c.push(r[u]);else break;r=r.slice(u);let d=c.join(`
`),f=d.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${d}`:d,s=s?`${s}
${f}`:f;let _=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(f,o,!0),this.lexer.state.top=_,r.length===0)break;let y=o.at(-1);if(y?.type==="code")break;if(y?.type==="blockquote"){let A=y,E=A.raw+`
`+r.join(`
`),I=this.blockquote(E);o[o.length-1]=I,n=n.substring(0,n.length-A.raw.length)+I.raw,s=s.substring(0,s.length-A.text.length)+I.text;break}else if(y?.type==="list"){let A=y,E=A.raw+`
`+r.join(`
`),I=this.list(E);o[o.length-1]=I,n=n.substring(0,n.length-y.raw.length)+I.raw,s=s.substring(0,s.length-A.raw.length)+I.raw,r=E.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),a=!1;for(;e;){let u=!1,d="",f="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;d=t[0],e=e.substring(d.length);let _=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,I=>" ".repeat(3*I.length)),y=e.split(`
`,1)[0],A=!_.trim(),E=0;if(this.options.pedantic?(E=2,f=_.trimStart()):A?E=t[1].length+1:(E=t[2].search(this.rules.other.nonSpaceChar),E=E>4?1:E,f=_.slice(E),E+=t[1].length),A&&this.rules.other.blankLine.test(y)&&(d+=y+`
`,e=e.substring(y.length+1),u=!0),!u){let I=this.rules.other.nextBulletRegex(E),j=this.rules.other.hrRegex(E),te=this.rules.other.fencesBeginRegex(E),Q=this.rules.other.headingBeginRegex(E),O=this.rules.other.htmlBeginRegex(E);for(;e;){let M=e.split(`
`,1)[0],R;if(y=M,this.options.pedantic?(y=y.replace(this.rules.other.listReplaceNesting,"  "),R=y):R=y.replace(this.rules.other.tabCharGlobal,"    "),te.test(y)||Q.test(y)||O.test(y)||I.test(y)||j.test(y))break;if(R.search(this.rules.other.nonSpaceChar)>=E||!y.trim())f+=`
`+R.slice(E);else{if(A||_.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||te.test(_)||Q.test(_)||j.test(_))break;f+=`
`+y}!A&&!y.trim()&&(A=!0),d+=M+`
`,e=e.substring(M.length+1),_=R.slice(E)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(d)&&(a=!0)),s.items.push({type:"list_item",raw:d,task:!!this.options.gfm&&this.rules.other.listIsTask.test(f),loose:!1,text:f,tokens:[]}),s.raw+=d}let c=s.items.at(-1);if(c)c.raw=c.raw.trimEnd(),c.text=c.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let u of s.items){if(this.lexer.state.top=!1,u.tokens=this.lexer.blockTokens(u.text,[]),u.task){if(u.text=u.text.replace(this.rules.other.listReplaceTask,""),u.tokens[0]?.type==="text"||u.tokens[0]?.type==="paragraph"){u.tokens[0].raw=u.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),u.tokens[0].text=u.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let f=this.lexer.inlineQueue.length-1;f>=0;f--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[f].src)){this.lexer.inlineQueue[f].src=this.lexer.inlineQueue[f].src.replace(this.rules.other.listReplaceTask,"");break}}let d=this.rules.other.listTaskCheckbox.exec(u.raw);if(d){let f={type:"checkbox",raw:d[0]+" ",checked:d[0]!=="[ ]"};u.checked=f.checked,s.loose?u.tokens[0]&&["paragraph","text"].includes(u.tokens[0].type)&&"tokens"in u.tokens[0]&&u.tokens[0].tokens?(u.tokens[0].raw=f.raw+u.tokens[0].raw,u.tokens[0].text=f.raw+u.tokens[0].text,u.tokens[0].tokens.unshift(f)):u.tokens.unshift({type:"paragraph",raw:f.raw,text:f.raw,tokens:[f]}):u.tokens.unshift(f)}}if(!s.loose){let d=u.tokens.filter(_=>_.type==="space"),f=d.length>0&&d.some(_=>this.rules.other.anyLine.test(_.raw));s.loose=f}}if(s.loose)for(let u of s.items){u.loose=!0;for(let d of u.tokens)d.type==="text"&&(d.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:n,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=Ll(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let a of n)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<r.length;a++)o.header.push({text:r[a],tokens:this.lexer.inline(r[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(Ll(a,o.header.length).map((c,u)=>({text:c,tokens:this.lexer.inline(c),header:!1,align:o.align[u]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=Ln(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=Lf(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let n=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),Ol(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return Ol(r,s,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,a,c=s,u=0,d=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+s);(n=d.exec(t))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(a=[...o].length,n[3]||n[4]){c+=a;continue}else if((n[5]||n[6])&&s%3&&!((s+a)%3)){u+=a;continue}if(c-=a,c>0)continue;a=Math.min(a,a+c+u);let f=[...n[0]][0].length,_=e.slice(0,s+n.index+f+a);if(Math.min(s,a)%2){let A=_.slice(1,-1);return{type:"em",raw:_,text:A,tokens:this.lexer.inlineTokens(A)}}let y=_.slice(2,-2);return{type:"strong",raw:_,text:y,tokens:this.lexer.inlineTokens(y)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,n;return t[2]==="@"?(r=t[1],n="mailto:"+r):(r=t[1],n=r),{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,n;if(t[2]==="@")r=t[0],n="mailto:"+r;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);r=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},Jt=class Ho{constructor(t){lt(this,"tokens");lt(this,"options");lt(this,"state");lt(this,"inlineQueue");lt(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Wr,this.options.tokenizer=this.options.tokenizer||new Os,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:Lt,block:Rs.normal,inline:In.normal};this.options.pedantic?(r.block=Rs.pedantic,r.inline=In.pedantic):this.options.gfm&&(r.block=Rs.gfm,this.options.breaks?r.inline=In.breaks:r.inline=In.gfm),this.tokenizer.rules=r}static get rules(){return{block:Rs,inline:In}}static lex(t,r){return new Ho(r).lex(t)}static lexInline(t,r){return new Ho(r).inlineTokens(t)}lex(t){t=t.replace(Lt.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,r=[],n=!1){for(this.options.pedantic&&(t=t.replace(Lt.tabCharGlobal,"    ").replace(Lt.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,r))?(t=t.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=r.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
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
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,r}inline(t,r=[]){return this.inlineQueue.push({src:t,tokens:r}),r}inlineTokens(t,r=[]){let n=t,s=null;if(this.tokens.links){let u=Object.keys(this.tokens.links);if(u.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)u.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let a=!1,c="";for(;t;){a||(c=""),a=!1;let u;if(this.options.extensions?.inline?.some(f=>(u=f.call({lexer:this},t,r))?(t=t.substring(u.raw.length),r.push(u),!0):!1))continue;if(u=this.tokenizer.escape(t)){t=t.substring(u.raw.length),r.push(u);continue}if(u=this.tokenizer.tag(t)){t=t.substring(u.raw.length),r.push(u);continue}if(u=this.tokenizer.link(t)){t=t.substring(u.raw.length),r.push(u);continue}if(u=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(u.raw.length);let f=r.at(-1);u.type==="text"&&f?.type==="text"?(f.raw+=u.raw,f.text+=u.text):r.push(u);continue}if(u=this.tokenizer.emStrong(t,n,c)){t=t.substring(u.raw.length),r.push(u);continue}if(u=this.tokenizer.codespan(t)){t=t.substring(u.raw.length),r.push(u);continue}if(u=this.tokenizer.br(t)){t=t.substring(u.raw.length),r.push(u);continue}if(u=this.tokenizer.del(t)){t=t.substring(u.raw.length),r.push(u);continue}if(u=this.tokenizer.autolink(t)){t=t.substring(u.raw.length),r.push(u);continue}if(!this.state.inLink&&(u=this.tokenizer.url(t))){t=t.substring(u.raw.length),r.push(u);continue}let d=t;if(this.options.extensions?.startInline){let f=1/0,_=t.slice(1),y;this.options.extensions.startInline.forEach(A=>{y=A.call({lexer:this},_),typeof y=="number"&&y>=0&&(f=Math.min(f,y))}),f<1/0&&f>=0&&(d=t.substring(0,f+1))}if(u=this.tokenizer.inlineText(d)){t=t.substring(u.raw.length),u.raw.slice(-1)!=="_"&&(c=u.raw.slice(-1)),a=!0;let f=r.at(-1);f?.type==="text"?(f.raw+=u.raw,f.text+=u.text):r.push(u);continue}if(t){let f="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(f);break}else throw new Error(f)}}return r}},Ms=class{constructor(e){lt(this,"options");lt(this,"parser");this.options=e||Wr}space(e){return""}code({text:e,lang:t,escaped:r}){let n=(t||"").match(Lt.notSpaceStart)?.[0],s=e.replace(Lt.endingNewline,"")+`
`;return n?'<pre><code class="language-'+yr(n)+'">'+(r?s:yr(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:yr(s,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${yr(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let n=this.parser.parseInline(r),s=Il(e);if(s===null)return n;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+yr(t)+'"'),o+=">"+n+"</a>",o}image({href:e,title:t,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=Il(e);if(s===null)return yr(r);e=s;let o=`<img src="${e}" alt="${r}"`;return t&&(o+=` title="${yr(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:yr(e.text)}},ta=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},er=class Go{constructor(t){lt(this,"options");lt(this,"renderer");lt(this,"textRenderer");this.options=t||Wr,this.options.renderer=this.options.renderer||new Ms,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new ta}static parse(t,r){return new Go(r).parse(t)}static parseInline(t,r){return new Go(r).parseInline(t)}parse(t){let r="";for(let n=0;n<t.length;n++){let s=t[n];if(this.options.extensions?.renderers?.[s.type]){let a=s,c=this.options.extensions.renderers[a.type].call({parser:this},a);if(c!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){r+=c||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}parseInline(t,r=this.renderer){let n="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let c=this.options.extensions.renderers[o.type].call({parser:this},o);if(c!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=c||"";continue}}let a=o;switch(a.type){case"escape":{n+=r.text(a);break}case"html":{n+=r.html(a);break}case"link":{n+=r.link(a);break}case"image":{n+=r.image(a);break}case"checkbox":{n+=r.checkbox(a);break}case"strong":{n+=r.strong(a);break}case"em":{n+=r.em(a);break}case"codespan":{n+=r.codespan(a);break}case"br":{n+=r.br(a);break}case"del":{n+=r.del(a);break}case"text":{n+=r.text(a);break}default:{let c='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return n}},Is,On=(Is=class{constructor(e){lt(this,"options");lt(this,"block");this.options=e||Wr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Jt.lex:Jt.lexInline}provideParser(){return this.block?er.parse:er.parseInline}},lt(Is,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),lt(Is,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Is),Mf=class{constructor(...e){lt(this,"defaults",Vo());lt(this,"options",this.setOptions);lt(this,"parse",this.parseMarkdown(!0));lt(this,"parseInline",this.parseMarkdown(!1));lt(this,"Parser",er);lt(this,"Renderer",Ms);lt(this,"TextRenderer",ta);lt(this,"Lexer",Jt);lt(this,"Tokenizer",Os);lt(this,"Hooks",On);this.use(...e)}walkTokens(e,t){let r=[];for(let n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)r=r.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,t));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);r=r.concat(this.walkTokens(a,t))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let c=s.renderer.apply(this,a);return c===!1&&(c=o.apply(this,a)),c}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),n.extensions=t),r.renderer){let s=this.defaults.renderer||new Ms(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,c=r.renderer[a],u=s[a];s[a]=(...d)=>{let f=c.apply(s,d);return f===!1&&(f=u.apply(s,d)),f||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new Os(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,c=r.tokenizer[a],u=s[a];s[a]=(...d)=>{let f=c.apply(s,d);return f===!1&&(f=u.apply(s,d)),f}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new On;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,c=r.hooks[a],u=s[a];On.passThroughHooks.has(o)?s[a]=d=>{if(this.defaults.async&&On.passThroughHooksRespectAsync.has(o))return(async()=>{let _=await c.call(s,d);return u.call(s,_)})();let f=c.call(s,d);return u.call(s,f)}:s[a]=(...d)=>{if(this.defaults.async)return(async()=>{let _=await c.apply(s,d);return _===!1&&(_=await u.apply(s,d)),_})();let f=c.apply(s,d);return f===!1&&(f=u.apply(s,d)),f}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(a){let c=[];return c.push(o.call(this,a)),s&&(c=c.concat(s.call(this,a))),c}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Jt.lex(e,t??this.defaults)}parser(e,t){return er.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,c=await(s.hooks?await s.hooks.provideLexer():e?Jt.lex:Jt.lexInline)(a,s),u=s.hooks?await s.hooks.processAllTokens(c):c;s.walkTokens&&await Promise.all(this.walkTokens(u,s.walkTokens));let d=await(s.hooks?await s.hooks.provideParser():e?er.parse:er.parseInline)(u,s);return s.hooks?await s.hooks.postprocess(d):d})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?Jt.lex:Jt.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let c=(s.hooks?s.hooks.provideParser():e?er.parse:er.parseInline)(a,s);return s.hooks&&(c=s.hooks.postprocess(c)),c}catch(a){return o(a)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+yr(r.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(r);throw r}}},Ur=new Mf;function it(e,t){return Ur.parse(e,t)}it.options=it.setOptions=function(e){return Ur.setOptions(e),it.defaults=Ur.defaults,Ml(it.defaults),it};it.getDefaults=Vo;it.defaults=Wr;it.use=function(...e){return Ur.use(...e),it.defaults=Ur.defaults,Ml(it.defaults),it};it.walkTokens=function(e,t){return Ur.walkTokens(e,t)};it.parseInline=Ur.parseInline;it.Parser=er;it.parser=er.parse;it.Renderer=Ms;it.TextRenderer=ta;it.Lexer=Jt;it.lexer=Jt.lex;it.Tokenizer=Os;it.Hooks=On;it.parse=it;var ch=it.options,uh=it.setOptions,dh=it.use,ph=it.walkTokens,fh=it.parseInline;var _h=er.parse,mh=Jt.lex;function Tr(e){let t=it.parse(e),r=Sl.sanitize(t);return El(r)}function vr(e,t){return i`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function dn(e){return e.loading?i`<div class="prompt-block__status">불러오는 중…</div>`:e.error?i`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Ns(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())} ${r(t.getHours())}:${r(t.getMinutes())}`}var Pf={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Df={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},Nf=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,qf=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function dr(e){return!!e&&typeof e=="object"}function ra(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function Hl(e,t){let r=ra(e),n=ra(t),s=new Map;for(let c of r)s.set(c,(s.get(c)||0)+1);let o=0;for(let c of n){let u=s.get(c)||0;u>0?s.set(c,u-1):o+=1}let a=0;for(let c of s.values())a+=c;return{added:o,removed:a}}function Ff(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>dr(s)&&typeof s.text=="string"?s.text:"").join(""):dr(e)&&typeof e.text=="string"&&(t=e.text);let n=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function jf(e){let t=String(e.name||""),r=e.input||{},n={kind:"tool",tool:t,icon:Pf[t]||"\u{1F527}",input:r,expandable:!0};if((t==="Read"||t==="Write")&&(n.path=String(r.file_path||r.path||"")),t==="Write"&&(n.added=ra(r.content).length),t==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=Hl(r.old_string,r.new_string);n.added=s,n.removed=o}if(t==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,a=Array.isArray(r.edits)?r.edits:[];for(let c of a){let u=Hl(dr(c)?c.old_string:"",dr(c)?c.new_string:"");s+=u.added,o+=u.removed}n.added=s,n.removed=o}return t==="Bash"&&(n.command=String(r.command||"")),(t==="Grep"||t==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function na(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function sa(e){let t=e.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=Nf.exec(t);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:t.trim()}:qf.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Bf(e,t){if(e.type==="assistant"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(dr(o)){if(o.type==="text"&&typeof o.text=="string")s.push(sa(o.text));else if(o.type==="thinking"){let a=na(o.thinking);a&&s.push(a)}else if(o.type==="tool_use"){let a=jf(o);typeof o.id=="string"&&t.set(o.id,a),s.push(a)}}return s}if(e.type==="user"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(dr(s)&&s.type==="tool_result"){let o=t.get(String(s.tool_use_id));if(o){let a=Ff(s.content);o.result=a,o.output=typeof s.content=="string"?s.content:a}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success";return[{kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""}]}return[]}function Uf(e){if(e.type==="item.completed"&&dr(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[sa(t.text)];if(t.type==="reasoning"){let r=na(t.text);return r?[r]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Wf(e){if(e.schema!=="codex-delegation-monitor-v1"||!dr(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&dr(t.item)){let r=t.item;if(typeof r.id!="string"||r.id.length===0)return[];if(t.type==="item.completed"&&r.kind==="agent_message"&&typeof r.text=="string"&&r.text.trim().length>0)return[sa(r.text)];if(t.type==="item.completed"&&r.kind==="reasoning"){let c=na(r.text);return c?[c]:[]}if(r.kind!=="activity"||typeof r.activity!="string")return[];let n=Df[r.activity];if(!n)return[];let s="\uC2DC\uC791",o="\u2026",a={kind:"tool",tool:"",icon:o,expandable:!1};if(t.type==="item.completed"){if(r.status==="completed")s="\uC644\uB8CC",o="\u2713";else if(r.status==="failed")s="\uC2E4\uD328",o="\u2717";else return[];a.result=""}return a.tool=`${n} \xB7 ${s}`,a.icon=o,[a]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function zf(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Gl(e){let t=[],r=new Map,n=Array.isArray(e)?e:[];for(let s of n){let o=s;if(typeof s=="string"){let c=s.trim();if(c.length===0)continue;try{o=JSON.parse(c)}catch{continue}}if(!dr(o))continue;let a=o.schema==="codex-delegation-monitor-v1"?Wf(o):zf(o)?Uf(o):Bf(o,r);for(let c of a)t.push(c)}return t}var Hf=5,Gf=10,Vf=/Task\s+#(\d+)/,Kf=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Yf=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function qs(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Zf(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function Xf(e){for(let t=e.length-1;t>=0;t-=1){let r=e[t];if(r.kind==="phase"||r.kind==="gate")return r.text||null}return null}function Qf(e){let t=new Map,r=0;for(let s of e){if(s.kind!=="tool")continue;r+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let u=Vf.exec(s.output||s.result||""),d=String(o.activeForm||o.subject||"").trim();if(!u||d.length===0)continue;t.set(u[1],{label:d,active:o.status==="in_progress"?r:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let c=o.activeForm||o.subject;typeof c=="string"&&c.trim().length>0&&(a.label=c.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?r:0)}let n=null;for(let s of t.values())s.active>0&&(!n||s.active>n.active)&&(n=s);return n?n.label:null}function Jf(e){if(e.tool==="Bash"){let t=e.command||"";return Kf.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Yf.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function e_(e){let t=e.filter(s=>s.kind==="tool").slice(-Gf),r=new Map;t.forEach((s,o)=>{let a=Jf(s);if(!a)return;let c=r.get(a)||{count:0,last:-1};c.count+=1,c.last=o,r.set(a,c)});let n=null;for(let[s,o]of r)(!n||o.count>n.count||o.count===n.count&&o.last>n.last)&&(n={label:s,count:o.count,last:o.last});return n?n.label:null}function t_(e){let t=Xf(e);if(t)return{text:t,guess:!1};let r=Qf(e);if(r)return{text:r,guess:!1};let n=e_(e);return n?{text:n,guess:!0}:null}function r_(e,t){if(typeof e!="number")return"";let r=Math.max(0,Math.floor((t-e)/1e3));return r<60?`${r}\uCD08 \uC804`:qt(e,t)}function Fs(e,t={}){let{transport:r,sessionLogStore:n,onClose:s}=t,o=null,a=null,c=null,u=!1,d={},f=!0,_=new Set,y=new Set,A=null,E=null,I=!1,j=!1,te=!1,Q=null,O=null;function M(){I=!1,j=!1,te=!1,Q=null,O=null}async function R(K){if(r){j=!0,te=!1,le();try{let B=await Promise.resolve(r("get-attempt-prompt",{attempt_id:K}));if(o!==K)return;!B||typeof B!="object"||Array.isArray(B)?te=!0:(Q=B,O=K)}catch{o===K&&(te=!0)}finally{o===K&&(j=!1,le())}}}function F(){if(I=!I,I&&o&&O!==o){R(o);return}le()}function b(){if(!I)return"";let K=dn({loading:j,error:te});if(K)return i`<div class="sv__prompt" data-seam="attempt-prompt">
        ${K}
      </div>`;if(!Q)return"";if(Q.missing)return i`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let B=Ns(Q.recorded_at);return i`<div class="sv__prompt" data-seam="attempt-prompt">
      ${B?i`<div class="prompt-block__meta">${B} 발송</div>`:""}
      ${typeof Q.task_prompt=="string"?vr("\uACFC\uC5C5 (user)",Q.task_prompt):""}
      ${typeof Q.system_prompt=="string"?vr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",Q.system_prompt):""}
    </div>`}function C(){if(!c||!n)return[];let K=n.get(c);return Gl(K?K.lines:[])}function z(){if(!c||!n)return null;let K=n.get(c),B=K?K.last_event_at:null;return typeof B=="number"?B:null}function re(){return d.status==="running"}function L(){if(re()&&o){E||(E=setInterval(()=>le(),1e3));return}D()}function D(){E&&(clearInterval(E),E=null)}function ue(K){let B=[],ne=0;for(;ne<K.length;){let Oe=K[ne];if(Oe.kind==="tool"){let je=ne;for(;je<K.length&&K[je].kind==="tool"&&K[je].tool===Oe.tool;)je+=1;if(je-ne>=Hf&&!y.has(ne)){B.push({kind:"group",idx:ne,tool:Oe.tool||"",lines:K.slice(ne,je).map((He,Te)=>({idx:ne+Te,line:He}))}),ne=je;continue}}B.push({kind:"line",idx:ne,line:Oe}),ne+=1}return B}function _e(K){for(let B=K.length-1;B>=0;B-=1){let ne=K[B];if(ne.kind==="result"||ne.kind==="error")return null;if(ne.kind==="tool"&&!Object.hasOwn(ne,"result"))return ne}return null}function de(K){for(let B=K.length-1;B>=0;B-=1)if(K[B].kind==="thinking")return K[B];return null}function Ue(K,B){if(B.kind==="gate")return i`<div class="sv__gate">${B.text}</div>`;if(B.kind==="phase")return i`<div class="sv__phase">${B.text}</div>`;if(B.kind==="result")return i`<div
        class="sv__result${B.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${B.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${Tr(B.text||(B.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(B.kind==="thinking"){let ne=_.has(K);return i`<div
        class="sv__think${ne?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Re(K)}
      >
        <span class="sv__think-line">💭 ${qs(B.text)}</span>
        ${ne?i`<pre class="sv__think-expand">${B.text}</pre>`:""}
      </div>`}if(B.kind==="error")return i`<div class="sv__error">⛔ ${B.text}</div>`;if(B.kind==="blocker")return i`<div class="sv__error">⛔ ${B.text}</div>`;if(B.kind==="tool"){let ne=_.has(K),Oe=B.tool==="Bash"?Zf(B.command):0,je=B.tool==="Bash"?Oe>1?qs(B.command):B.command:B.path||B.command||"";return i`<div
        class="sv__tool${ne?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>Re(K)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${B.icon}</span>
          <span class="sv__tool-name">${B.tool}</span>
          ${je?i`<span class="sv__tool-detail">${je}</span>`:""}
          ${Oe>1?i`<span class="sv__tool-more">⋯ ${Oe}줄</span>`:""}
          ${typeof B.added=="number"?i`<span class="sv__diff-add">+${B.added}</span>`:""}
          ${typeof B.removed=="number"?i`<span class="sv__diff-del">−${B.removed}</span>`:""}
          ${B.result?i`<span class="sv__tool-ok">→ ${B.result}</span>`:""}
        </span>
        ${ne?i`<pre class="sv__tool-expand">${Je(B)}</pre>`:""}
      </div>`}return i`<div class="sv__as">${Tr(B.text||"")}</div>`}function Je(K){let B=[];if(K.tool==="Bash"&&typeof K.command=="string"&&K.command.length>0)B.push(K.command);else if(K.input!==void 0)try{B.push(`input: ${JSON.stringify(K.input,null,2)}`)}catch{}return typeof K.output=="string"&&K.output.length>0&&B.push(`output:
${K.output}`),B.join(`

`)}function Ke(){if(!o)return i``;let K=C(),B=(a?[d.model,d.effort]:[d.runner,d.model,d.effort]).filter(Boolean).join(" \xB7 "),ne=d.session_id||"",Oe=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${f?"ON":"OFF"}`,je=re(),He=je?r_(z(),Date.now()):"",Te=je?_e(K):null,ct=je?de(K):null,Ze=t_(K);return i`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${a?d.role||"":o}</span>
        ${Ze?i`<span
              class="sv__stage${Ze.guess?" sv__stage--guess":""}"
              title=${Ze.text}
              >${Ze.text}</span
            >`:""}
        ${je?i`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${He?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${He}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${He?i`<span class="sv__live-ago">${He}</span>`:""}</span
            >`:""}
        ${ne?i`<button
              type="button"
              class="sv__session"
              title=${ne}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${ne}`}
              @click=${()=>he(ne)}
            >
              ⧉ ${ne.slice(0,8)}
            </button>`:""}
        ${B?i`<span class="sv__meta">${B}</span>`:""}
        ${d.worktree?i`<span class="sv__wt" title=${d.worktree}
              >${d.worktree}</span
            >`:""}
        ${a||u?"":i`<button
              type="button"
              class="sv__prompt-toggle${I?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${I?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${F}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${f?" sv__follow--on":""}"
          aria-pressed=${f?"true":"false"}
          aria-label=${Oe}
          @click=${Ae}
        >
          <span class="sv__follow-full">⇣ ${Oe}</span>
          <span class="sv__follow-short">⇣ ${f?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>nt()}
        >
          ✕
        </button>
      </div>
      ${a||u?"":b()}
      <div class="sv__body">
        ${K.length===0?i`<div class="sv__empty">세션 로그 없음</div>`:ue(K).map(G=>G.kind==="group"?Me(G):Ue(G.idx,G.line))}
      </div>
      ${Te||ct?i`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${Te?i`<span class="sv__now-icon">${Te.icon}</span>
                  <span class="sv__now-name">${Te.tool}</span>
                  <span class="sv__now-detail"
                    >${Te.tool==="Bash"?qs(Te.command):Te.path||Te.command||""}</span
                  >`:""}
            ${ct?i`<span class="sv__now-think"
                  >💭 ${qs(ct.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function Me(K){return i`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>We(K.idx)}
    >
      <span class="sv__group-icon">${K.lines[0].line.icon}</span>
      <span class="sv__group-name">${K.tool}</span>
      <span class="sv__group-count">${K.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function We(K){y.add(K),le()}function le(){Ge(Ke(),e),L(),f&&xe()}function xe(){let K=e.querySelector(".sv__body");K&&(K.scrollTop=K.scrollHeight)}function Re(K){_.has(K)?_.delete(K):_.add(K),le()}function Ae(){f=!f,le()}function he(K){Zt(K).then(B=>{B?se("\uBCF5\uC0AC\uB428","success",1200):se("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function ze(K){!o||!K||(d={...d,...K},le())}function rt(K){let B=K.target;if(!B||!B.classList||!B.classList.contains("sv__body"))return;!(B.scrollHeight-B.scrollTop-B.clientHeight<=4)&&f&&(f=!1,le())}e.addEventListener("scroll",rt,!0);function Ee(K){let B=K&&K.attempt_id;if(!B)return;let ne=c;o=B,a=typeof K.launch_id=="string"&&K.launch_id.length>0?K.launch_id:null,c=a?`session-log:${o}:${a}`:`session-log:${o}`,r&&ne&&ne!==c&&Promise.resolve(r("unsubscribe-session-log",{id:ne})).catch(()=>{}),d=K.meta||{},u=K.hide_prompt===!0,f=!0,_.clear(),y.clear(),M(),!A&&n&&(A=n.subscribe(le)),r&&Promise.resolve(r("subscribe-session-log",{id:c,attempt_id:o,...a?{launch_id:a}:{}})).catch(()=>{}),le()}function nt(){let K=c;o=null,a=null,c=null,u=!1,_.clear(),y.clear(),M(),D(),r&&K&&Promise.resolve(r("unsubscribe-session-log",{id:K})).catch(()=>{}),Ge(i``,e),s&&s()}return{open:Ee,updateMeta:ze,close:nt,isOpen(){return o!==null},destroy(){D(),A&&(A(),A=null),e.removeEventListener("scroll",rt,!0),o=null,a=null,c=null,u=!1,Ge(i``,e)}}}function js(e){let t=e&&typeof e=="object"?e:{},r=t.metadata&&typeof t.metadata=="object"?t.metadata:{},n=oa(t.spec_id),s=oa(r.spec_id);return n?{path:n,source:"native",conflict:s.length>0&&s!==n}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function oa(e){return typeof e=="string"?e.trim():""}function Vl(e){let t=js(e);if(t.path)return t;let r=oa(n_(e).spec_path);return r?{path:r,source:"draft",conflict:!1}:t}function n_(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}function s_(e){return["plan_review","plan_approval","plan_check"].some(t=>{let r=e[t];return typeof r=="string"&&r.trim().length>0})}function o_(e){let t=e&&e.metadata||{},r=Vl(e),n=[];return r.path&&n.push({kind:"spec",path:r.path,missing_state:r.source==="draft"?"spec_draft":null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&n.push({kind:"plan",path:t.plan_path.trim(),missing_state:s_(t)?null:"plan_pending"}),n}function Kl(e,t){let r=o_(e);return i`
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
  `}var{I:Kh}=vi;var Ql=e=>e.strings===void 0;var p_={},Jl=(e,t=p_)=>e._$AH=t;var zr=Cs(class extends un{constructor(e){if(super(e),e.type!==hr.PROPERTY&&e.type!==hr.ATTRIBUTE&&e.type!==hr.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Ql(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===Bt||t===bt)return t;let r=e.element,n=e.name;if(e.type===hr.PROPERTY){if(t===r[n])return Bt}else if(e.type===hr.BOOLEAN_ATTRIBUTE){if(!!t===r.hasAttribute(n))return Bt}else if(e.type===hr.ATTRIBUTE&&r.getAttribute(n)===t+"")return Bt;return Jl(e),t}});var Us=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],f_=[...Us.filter(e=>e!=="impl_dispatch"),"quick_fix_impl_model"],Cr=["orchestration_model","orchestration_effort","orchestration_speed"],ec=[...Us,...Cr],tc=["delegated","main"],Ws=["inherit","claude","codex"],Dn=["default","fast"],Nn=["standard","fast_track"],qn=["codex","opus","fable","self","skip"],zs=["codex","fable","skip"],Hs=["low","medium","high","xhigh"],tr="auto";function wr(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function rc(e){if(!wr(e)||!wr(e.runners))return[];let t=[];for(let[r,n]of Object.entries(e.runners))wr(n)&&wr(n.models)&&t.push([r,Object.keys(n.models)]);return t}function Fn(e,t){let r=rc(e),n=t&&t!=="inherit"?r.filter(([s])=>s===t):r;return[tr,...n.flatMap(([,s])=>s)]}function pn(e,t,r){if(!wr(e)||!wr(e.runners))return[tr];let n=[];for(let[s,o]of Object.entries(e.runners))if(!(!wr(o)||!wr(o.models))&&!(t&&t!=="inherit"&&s!==t))for(let[a,c]of Object.entries(o.models)){if(r&&r!==tr&&a!==r)continue;let u=wr(c)?c.efforts:null;if(Array.isArray(u))for(let d of u)typeof d=="string"&&!n.includes(d)&&n.push(d)}return[tr,...n]}function Gs(e,t){let r=rc(e);return(t?r.filter(([s])=>s===t):r).flatMap(([,s])=>s)}function aa(e,t,r,n,s,o){return $s({key:e,choices:t,layer:"global",global:r,resolution_global:o,execution_defaults:n,runner_catalog:s})}function nc(e,t){let r={};for(let n of f_){let s=e?.[n],o=t?.[n];s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}function sc(e,t){let r={};for(let n of Cr){let s=e?.[n]??null,o=t?.[n]??null;s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}var ia=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Cr]}],la={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},oc={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function ca(e,t,r,n,s,o=null){let a=on({pin:t,global:r,execution_defaults:n,runner_catalog:s,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:o});return e.map(c=>({key:c,...a[c]}))}function ac(e,t,r,n,s,o=null){let a={pin:0,global:0,base:0};for(let c of ca(e,t,r,n,s,o))a[c.source]+=1;return a}function ic(e,t,r){return{id:e,key:t,value:typeof r=="string"?r:""}}function lc(e,t,r){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:r}}var oy=[...Us,...Cr];var __=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review"},{id:"impl",label:"\uAD6C\uD604",receipt:null},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review"},{id:"pr",label:"PR",receipt:null}],m_={pin:"pin",global:"global",base:"base"};function g_(e){return i`<span
    class=${`detail-layer-rail detail-layer-rail--${m_[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function b_(e,t,r){switch(e){case"workflow_mode":return Nn;case"spec_review_model":case"impl_review_model":return qn;case"plan_review_model":return zs;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return Hs;case"impl_dispatch":return tc;case"impl_runtime":return Ws;case"impl_model":return Fn(r,t.impl_runtime);case"impl_effort":return pn(r,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return Dn;case"orchestration_model":return Gs(r,null);case"orchestration_effort":return pn(r,void 0,t.orchestration_model||tr).filter(n=>n!==tr);default:return[]}}function h_(e,t){return i`<div class="detail-effective__row" data-key=${e.key}>
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
              ${n.filter(d=>u.keys.includes(d.key)).map(d=>{let f=$s({key:d.key,choices:b_(d.key,a,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return h_(d,{expanded:e.expanded,options:f.options,default_label:f.unset_label,default_full_value:f.full_value,onEdit:t.onEdit})})}
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
  </details>`}function y_(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let r=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${r}`)}for(let r of["impl_model","impl_effort","impl_speed"])e[r]?.resolution!=="not_applicable"&&t.push(e[r]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function v_(e){if(!e||typeof e!="object")return null;let{kind:t,actor:r,effort:n,sha:s}=e;return typeof t!="string"||typeof r!="string"||typeof s!="string"?null:{kind:t,actor:r,effort:typeof n=="string"?n:null,sha:s}}function uc(e){let t=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},n=r.stages||{},s=r.route||t.route||null,o=typeof t.pr_url=="string"?t.pr_url:"",a=typeof t.exec_receipt=="string"?t.exec_receipt:"",c=v_(r.exec_receipt),u=c?Br(c):a,d=c?`${c.kind}:${c.actor}`:a.split("@")[0],f=ws(r.planned_execution,r.exec_receipt);return i`<section class="detail-summary" data-seam="detail-summary">
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
      ${f?i`<span
            class="detail-summary__chip detail-summary__chip--planned ctl-chip--planned"
            data-kind=${f.kind}
            title=${f.title}
            >${f.label}</span
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
      ${__.map(_=>{let y=_.receipt&&typeof t[_.receipt]=="string"?String(t[_.receipt]):"",A=n[_.id],E=y.length>0||A?.fill==="full",I=!E&&A?.fill==="dim",j=A?.stale===!0;return i`<span
          class=${`detail-summary__gate${E?" detail-summary__gate--on":""}${I?" detail-summary__gate--current":""}${j?" detail-summary__gate--stale":""}`}
          data-gate=${_.id}
        >
          <span class="detail-summary__gate-pill">${_.label}</span>
          ${y?i`<span class="detail-summary__gate-sha"
                >${y.split("@")[1]?.slice(0,7)||""}</span
              >`:""}
        </span>`})}
    </div>
  </section>`}var dc=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function jn(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Vs(e){if(!jn(e)||!jn(e.runners))return null;let t=Object.entries(e.runners).filter(([,r])=>jn(r)&&jn(r.models));return t.length>0?t:null}function ua(e,t){let r=Vs(e);if(!r||!t)return null;for(let[n,s]of r)if(Object.hasOwn(s.models,t))return n;return null}function pc(e,t){return jn(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function fc(e,t){let r=Vs(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return pc(n,n.models[t]);return[]}function w_(e){let t=Vs(e);if(!t)return[];let r=[];for(let[,n]of t)for(let s of Object.values(n.models))for(let o of pc(n,s))r.includes(o)||r.push(o);return r}function k_(e,t){if(!t)return w_(e);let n=Vs(e)?.find(([o])=>o===t)?.[1];if(!n)return[];let s=[];for(let o of Object.keys(n.models))for(let a of fc(e,o))s.includes(a)||s.push(a);return s}function _c(e,t,r){let n={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=n.impl_runtime==="inherit"?r:n.impl_runtime==="claude"||n.impl_runtime==="codex"?n.impl_runtime:null;if(n.impl_runtime==="inherit"&&!s)return n.impl_model="",n.impl_effort="",n;let o=ua(t,n.impl_model);if(n.impl_model&&(!s||o!==s))return n.impl_model="",n.impl_effort="",n;let a=n.impl_model?fc(t,n.impl_model):k_(t,s);return n.impl_effort&&a.length>0&&!a.includes(n.impl_effort)&&(n.impl_effort=""),n}function $_(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function mc(e,t){let r=t.getWorkspacePath,n=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",c="";function u(E){E.key==="Escape"&&s&&(E.preventDefault(),y())}document.addEventListener("keydown",u);function d(){return s?i`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>y()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${$_(s)}</span
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
            ${o==="loading"?i`<div class="mv__status">불러오는 중…</div>`:o==="pending"?i`<div class="mv__status">${c}</div>`:o==="error"?i`<div class="mv__status mv__status--error">
                      ${c||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:Tr(a)}
          </div>
        </div>
      </div>
    `:i``}function f(){Ge(d(),e)}async function _(E,I={}){s=E,o="loading",a="",c="",f();let j=r?r():"";if(!j){o="error",c="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",f();return}if(!n){o="error",c="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",f();return}let te="/api/doc?workspace="+encodeURIComponent(j)+"&path="+encodeURIComponent(E);try{let Q=await n(te),O=await Q.json().catch(()=>({}));if(!Q.ok||!O||O.ok!==!0){if(O?.error==="not_found"&&I.missing_state==="plan_pending"){o="pending",c="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",f();return}o="error",c="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(O&&O.error||Q.status)+")",f();return}a=String(O.content||""),o="ready",f()}catch{o="error",c="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",f()}}function y(){s=null,Ge(i``,e)}function A(){document.removeEventListener("keydown",u),y()}return{open:_,close:y,destroy:A}}var x_=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],bc="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Ks=["implementation","review-consult"],A_=["running","done","failed","interrupted"],S_={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function E_(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function T_(e){let t=At(e);if(t.length>0)return t.map(s=>i`<span class="detail-usage-total" title=${s.tooltip}
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
  </button>`}function L_(e,t){return e.role===t.role&&e.model===t.model&&e.session_id===t.session_id}function O_(e,t,r){let n=[],s=new Set,o=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let f of o){let _=C_(f);!_||s.has(_.launch_id)||(s.add(_.launch_id),n.push(_))}n.sort((f,_)=>f.started_at-_.started_at);let a={implementation:[],"review-consult":[]};if(t)for(let f of Ks){let _=t.roles[f]?.codex;a[f]=_?[..._.legs]:[]}let c=Ks.flatMap(f=>a[f]),u=new Set,d=[];for(let f of Ks){for(let _ of n.filter(y=>y.role===f)){let y=c.find(A=>A.receipt_id===_.launch_id)||null;y&&!L_(_,y)||(y&&u.add(y.receipt_id),d.push(I_(_,y,e.attempt_id,r)))}for(let _ of a[f])u.has(_.receipt_id)||d.push(R_(f,_))}return d}function M_(e,t){let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,n=[...x_,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return i`<div class="detail-session__usage-detail">
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
    `;let o=new Set;for(let d of n)d&&typeof d.resumed_from=="string"&&d.resumed_from.length>0&&o.add(d.resumed_from);let a=d=>{if(!(d.status==="failed"||d.status==="orphaned"))return"";let _=typeof d.session_id=="string"&&d.session_id.length>0,y=o.has(d.attempt_id),A=_&&!y,E=_?y?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return i`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${d.attempt_id}
      ?disabled=${!A}
      title=${E}
      @click=${I=>{I.stopPropagation(),A&&t.onResume&&t.onResume(d.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},c=d=>{if(!(d.status==="failed"||d.status==="orphaned")||typeof d.cause!="string"||d.cause==="")return"";let _=d.cause_detail,y=_&&typeof _.reason=="string"&&_.reason.length>0?typeof _.command=="string"&&_.command.length>0?`${_.reason} \xB7 ${_.command}`:_.reason:d.cause;return i`<div class="detail-session__cause" title=${y}>
      ${d.cause}
    </div>`},u=d=>{let f=gc(Mo(d));if(At(f).length===0&&!ln(d.usage))return"";let _=s.has(d.attempt_id);return i`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${d.attempt_id}
      aria-expanded=${_?"true":"false"}
      title=${_?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${y=>{y.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(d.attempt_id)}}
    >
      τ 자세히
    </button>`};return i`
    <div class="detail-section-label">
      세션 이력${T_(r.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${n.map(d=>{let f=Mo(d),_=gc(f),y=At(_);return i`<div class="detail-session-row">
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
            <span class="detail-session__meta">${ur(d)}</span>
            ${y.length>0?i`<span class="detail-session__role">orchestrator</span>`:""}
            ${d.session_id?i`<span class="detail-session__sid" title=${d.session_id}
                  >${String(d.session_id).slice(0,8)}</span
                >`:""}
            ${y.length>0?y.map(A=>i`<span
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
          ${O_(d,f,t)}
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
      ${typeof r.default_task_prompt=="string"?vr("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",r.default_task_prompt):""}`;let n=Ns(r.recorded_at);return i`<div class="detail-prompt__meta">
      ${r.attempt_id}${n?` \xB7 ${n}`:""}
    </div>
    ${typeof r.task_prompt=="string"?vr("\uACFC\uC5C5 (user)",r.task_prompt):""}
    ${typeof r.system_prompt=="string"?vr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",r.system_prompt):""}`}var q_=["open","in_progress","deferred","resolved","closed"],F_=[0,1,2,3,4];function vc(e,t){let r=t.issueStores,n=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,c=t.execPresetStore,u=t.sessionLogStore,d=null,f=null,_={},y="",A=!1,E=[],I=!1,j={},te=!1,Q=!1,O="",M="",R="";function F(){te=!1,Q=!1,O="",M="",R=""}let b=[],C=null,z=null,re=!1,L="",D=!1,ue=0,_e=new Set;function de(){b=[],C=null,z=null,re=!1,L="",D=!1,ue+=1,_e.clear()}async function Ue(p){if(!s)return;let g=++ue;try{let x=await Promise.resolve(s("get-comments",{id:p}));if(g!==ue||p!==d)return;b=Array.isArray(x)?x:[],re=!1}catch{if(g!==ue||p!==d)return;re=!0}qe()}function Je(){if(!s||!d)return;let p=f&&typeof f.comment_count=="number"?f.comment_count:null;if(C!==d){C=d,z=p,Ue(d);return}p!==null&&p!==z&&(z=p,Ue(d))}function Ke(p){_e.has(p)?_e.delete(p):_e.add(p),qe()}function Me(p){let g=L.trim().length===0;L=p,g!==(p.trim().length===0)&&qe()}async function We(){let p=L.trim();if(!s||!d||p.length===0||D)return;let g=d;D=!0,qe();let x=!1;try{let W=await Promise.resolve(s("add-comment",{id:g,text:p}));Array.isArray(W)&&W.length>0&&(x=!0,g===d&&(b=W,re=!1,L="",z=W.length))}catch{x=!1}x||se("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),g===d&&(D=!1),qe()}let le={onToggle:Ke,onDraftInput:Me,onSubmit:We},xe=document.createElement("div");xe.className="md-viewer-root",document.body.appendChild(xe);let Re=mc(xe,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),Ae=document.createElement("div");Ae.className="session-log-root",document.body.appendChild(Ae);let he=Fs(Ae,{transport:s?(p,g)=>Promise.resolve(s(p,g)):void 0,sessionLogStore:u}),ze=!1,rt=!1,Ee=!1,nt=null,K=null,B=0;function ne(p){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${p}`}function Oe(){ze=!1,rt=!1,Ee=!1,nt=null,K=null,B+=1}async function je(p){if(!s)return;let g=++B;rt=!0,Ee=!1,qe();try{let x=await Promise.resolve(s("get-bead-prompt",{bead_id:p}));if(g!==B)return;!x||typeof x!="object"||Array.isArray(x)?Ee=!0:(nt=x,K=ne(p))}catch{g===B&&(Ee=!0)}finally{g===B&&(rt=!1,qe())}}function He(){if(ze=!ze,ze&&d&&K!==ne(d)){nt=null,je(d);return}qe()}function Te(){if(!a||!d)return[];let p=a.get();return(p&&p.attempts?Object.values(p.attempts):[]).filter(x=>x&&x.bead_id===d).sort((x,W)=>(W.started_at||0)-(x.started_at||0)).map(x=>({attempt_id:x.attempt_id,bead_id:x.bead_id,status:x.status,started_at:typeof x.started_at=="number"?x.started_at:null,runner:x.runner||null,model:x.model||null,effort:x.effort||x.observed_effort||null,speed:x.speed||null,session_id:x.session_id||null,resumed_from:x.resumed_from||null,continuation_mode:x.continuation_mode||null,dismissed_at:typeof x.dismissed_at=="number"?x.dismissed_at:null,cause:typeof x.cause=="string"?x.cause:null,cause_detail:x.cause_detail||null,exec_default_preset_id:typeof x.exec_default_preset_id=="string"?x.exec_default_preset_id:null,exec_default_preset_revision:typeof x.exec_default_preset_revision=="number"?x.exec_default_preset_revision:null,exec_values:x.exec_values&&typeof x.exec_values=="object"?x.exec_values:null,usage:x.usage||null,usage_legs:Array.isArray(x.usage_legs)?x.usage_legs:[],delegation_sessions:Array.isArray(x.delegation_sessions)?x.delegation_sessions:[]}))}function ct(){if(!a||!d)return null;let p=a.get();return Wt(p&&p.attempts||{},d)}let Ze=new Set;function G(p){Ze.has(p)?Ze.delete(p):Ze.add(p),qe()}function ee(p){let g=a?a.get():null,x=g&&g.attempts?g.attempts[p]:null;he.open({attempt_id:p,meta:x?{runner:x.runner||void 0,model:x.model||void 0,effort:x.effort||void 0,status:x.status||void 0,session_id:x.session_id||void 0}:{}})}function Ne(p,g){let x=a?a.get():null,W=x&&x.attempts?x.attempts[p]:null,be=(W&&Array.isArray(W.delegation_sessions)?W.delegation_sessions:[]).find(Ce=>Ce&&typeof Ce=="object"&&Ce.launch_id===g);be&&he.open({attempt_id:p,launch_id:g,meta:{runner:"codex",role:be.role,model:be.model,effort:be.effort,session_id:be.session_id,status:be.status}})}async function st(p){if(!s||!p)return;let g=await an();if(g===null)return;let x=()=>{let Ce=a?a.get():null;return Ce&&typeof Ce.revision=="number"?Ce.revision:0},W=async(Ce={},Fe=x())=>await s("worker-attempt-resume",{attempt_id:p,expected_revision:Fe,...g!==""?{instructions:g}:{},...Ce}),ve=Ce=>{Ce?.queue&&a?.set&&a.set(Ce.queue)},be=await W();if(ve(be),be&&be.conflict){let Ce=be.queue&&typeof be.queue.revision=="number"?be.queue.revision:x();be=await W({},Ce),ve(be)}be=await mr(be,(Ce,Fe)=>W({continuation:Ce,decision_token:Fe}),{onResult:ve,refresh:()=>W()}),be&&be.resumed===!1&&!be.conflict&&be.reason&&se(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${be.reason}`,"error",2400)}let pe={onOpen:ee,onOpenDelegation:Ne,onResume:st,onToggleUsage:G};function h(){let p=a?a.get():null,g={...j};for(let x of["orchestration_model","orchestration_effort","orchestration_speed"]){let W=p&&p[x];typeof W=="string"&&(g[x]=W)}return g}async function $(){if(s){try{let p=await Promise.resolve(s("get-session-defaults",{}));j=p&&p.values&&typeof p.values=="object"?p.values:{}}catch{j={}}qe()}}function k(){let p=a?a.get():null;return p&&p.runner_catalog||null}function P(){let p=a?a.get():null;return p&&typeof p.execution_defaults=="object"?p.execution_defaults:null}function V(){let p=f?.metadata&&typeof f.metadata=="object"?f.metadata:{},x=on({pin:{...p,..._},global:h(),execution_defaults:P(),runner_catalog:k(),route:typeof p.route=="string"?p.route:null}).orchestration_model.value||"";return ua(k(),x)}function Y(){let p=c?c.get():null;return!p||typeof p.revision!="number"?null:{revision:p.revision,presets:Array.isArray(p.presets)?p.presets:[]}}function ie(p){return p?.compatible===!1}function ce(p){c&&p&&typeof p.revision=="number"&&Array.isArray(p.presets)&&c.set({revision:p.revision,presets:p.presets})}async function Be(){let p=Y(),g=p?.presets.find(x=>x.id===y);if(!(!s||!d||!p||!g||ie(g)||A)){A=!0,E=[],qe();try{let x=await Promise.resolve(s("apply-impl-preset",lc(d,g.id,p.revision)));if(x&&x.conflict){ce(x),se("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let W=x&&Array.isArray(x.issue)?x.issue[0]:x?.issue;if(x&&x.applied&&W&&typeof W=="object"){f=W,E=Array.isArray(x.skipped_orchestration_keys)?x.skipped_orchestration_keys.filter(ve=>typeof ve=="string"):[];for(let ve of dc)delete _[ve];se(E.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}x&&x.error==="bd_readback_failed"?se("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):se("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(x){x&&typeof x=="object"&&x.code==="bd_readback_failed"?se("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):se("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{A=!1,qe()}}}let fe=null;r&&r.subscribe&&(fe=r.subscribe(()=>et()));let Ie=null;a&&typeof a.subscribe=="function"&&(Ie=a.subscribe(()=>{d&&qe()}));let Se=null;c&&typeof c.subscribe=="function"&&(Se=c.subscribe(()=>{d&&qe()}));function Pe(p){p.key==="Escape"&&d&&(p.preventDefault(),n())}document.addEventListener("keydown",Pe);function et(){if(d){if(r&&typeof r.snapshotFor=="function"){let p=r.snapshotFor("detail:"+d)||[];f=p.find(x=>x&&x.id===d)||p[0]||f}Je(),qe()}}function U(p){Zt(p).then(g=>{g?se("\uBCF5\uC0AC\uB428","success",1200):se("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function J(p){p.preventDefault(),p.stopPropagation(),d&&U(d)}function me(p,g){p.preventDefault(),p.stopPropagation(),U(g)}function w(p,g,x){p.preventDefault(),p.stopPropagation(),Re.open(g,{missing_state:x})}function T(p,g){_[p]=g,qe(),!(!s||!d)&&Promise.resolve(s("update-exec-settings",ic(d,p,g.length===0?null:g))).catch(()=>{se("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function N(p,g){let x=f||{},W=x.metadata&&typeof x.metadata=="object"?x.metadata:{},ve={};for(let Fe of["impl_runtime","impl_model","impl_effort"])ve[Fe]=Object.hasOwn(_,Fe)?_[Fe]:typeof W[Fe]=="string"?W[Fe]:"";ve[p]=g;let be=_c(ve,k(),V()),Ce={};for(let Fe of["impl_runtime","impl_model","impl_effort"])Ce[Fe]=_[Fe],_[Fe]=be[Fe]||"";qe(),!(!s||!d)&&Promise.resolve(s("update-impl-target",{id:d,...be,orchestration_runtime:V()})).then(Fe=>{let gt=Array.isArray(Fe)?Fe[0]:Fe;if(!gt||typeof gt!="object"||!gt.id)throw new Error("implementation target readback failed");f=gt;for(let lr of["impl_runtime","impl_model","impl_effort"])delete _[lr];qe()}).catch(()=>{for(let Fe of["impl_runtime","impl_model","impl_effort"])Ce[Fe]===void 0?delete _[Fe]:_[Fe]=Ce[Fe];qe(),se("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function Z(p,g,x){if(!s||!d)return!1;try{let W=await Promise.resolve(s(p,g)),ve=Array.isArray(W)?W[0]:W;return ve&&typeof ve=="object"&&ve.id?(f=ve,!0):(se(x,"error"),!1)}catch{return se(x,"error"),!1}}function we(p){setTimeout(()=>{try{let g=e.querySelector(p);g&&typeof g.focus=="function"&&g.focus()}catch{}},0)}function X(){te=!0,O=f&&f.title||"",qe(),we('.detail-edit__input[data-edit="title"]')}function $e(p){O=p.target.value}function Le(){te=!1,O="",qe()}function ht(){Z("edit-text",{id:d,field:"title",value:O},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(g=>{g&&(te=!1,O=""),qe()})}function yt(){Q=!0,M=f&&f.description||"",qe(),we('.detail-edit__textarea[data-edit="description"]')}function Xe(p){M=p.target.value}function Et(){Q=!1,M="",qe()}function Ht(){Z("edit-text",{id:d,field:"description",value:M},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(g=>{g&&(Q=!1,M=""),qe()})}function wt(p,g,x,W){if(p.key==="Escape"){p.stopPropagation(),x();return}p.key==="Enter"&&(!W||p.ctrlKey||p.metaKey)&&(p.preventDefault(),g())}function Ot(p){let g=p.target.value;Z("update-status",{id:d,status:g},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>qe())}function nr(p){let g=Number(p.target.value);Z("update-priority",{id:d,priority:g},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>qe())}function sr(p){R=p.target.value}function or(){let p=R.trim();p.length!==0&&Z("label-add",{id:d,label:p},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(g=>{g&&(R=""),qe()})}function fr(p){if(p.key==="Escape"){p.stopPropagation(),R="",qe();return}p.key==="Enter"&&(p.preventDefault(),or())}function kt(p){Z("label-remove",{id:d,label:p},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>qe())}let Gt={onCopyPath:me,onOpenDoc:w};function ar(p){return typeof p=="string"?p:p&&typeof p=="object"?String(p.id||p.to||p.issue_id||p.depends_on||""):""}function ir(p){switch(p&&typeof p=="object"?String(p.dependency_type||p.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function tt(p){let x=(Array.isArray(p.dependencies)?p.dependencies:[]).map(W=>({id:ar(W),icon:ir(W)})).filter(W=>W.id.length>0);return i`
      <div class="detail-section-label">의존성</div>
      ${x.length===0?i`<div class="detail-empty">의존성 없음</div>`:i`<div class="detail-deps">
            ${x.map(W=>o?i`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(W.id)}
                  >
                    ${W.icon?`${W.icon} `:""}${W.id}
                  </button>`:i`<span class="detail-dep"
                    >${W.icon?`${W.icon} `:""}${W.id}</span
                  >`)}
          </div>`}
    `}function Pt(p){let g=p.metadata||{},x=p.workflow||{},W=x.stages||{},ve=W.spec&&W.spec.stale,be=W.impl&&W.impl.stale,Ce=W.plan||null,Fe=x.route_source==="derived",gt=x.route||g.route||"\u2014";return i`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${Fe?" detail-kv__v--derived":""}"
          title=${Fe?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${Fe?"unset":gt}</span
        >
      </div>
      ${x.route!=="quick_fix"||Object.hasOwn(g,"spec_review")?i`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${g.spec_review||"\uC5C6\uC74C"}${ve?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${x.route==="full_plan"?i`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Ce?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Ce?.approval_receipt||"\uC5C6\uC74C"}${Ce?.approval_state==="stale"?" \xB7 stale":Ce?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${x.route!=="quick_fix"||Object.hasOwn(g,"impl_review")?i`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${g.impl_review||"\uC5C6\uC74C"}${be?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${x.planned_execution?i`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${x.planned_execution.kind}</span>
            </div>
            ${x.planned_execution.kind==="main"?i`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${x.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${x.exec_receipt?i`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${Br(x.exec_receipt)}</span
            >
          </div>`:""}
      ${x.impl_entry?i`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${x.impl_entry.actor}@${x.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${g.pr_url?i`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${g.pr_url}</span>
          </div>`:""}
    `}let ye={route:["quick_fix","spec_backed","full_plan"]};async function l(p,g){let x=g.target.value;if(p==="route"&&f&&f.metadata&&f.metadata.route==="full_plan"&&x!=="full_plan"&&!window.confirm(`full_plan \u2192 ${x||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){qe();return}await Z("update-workflow-meta",{id:d,key:p,value:x},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),qe()}function m(p){let g=p.metadata||{};return i` ${((W,ve)=>{let be=ye[W],Ce=typeof g[W]=="string"?g[W]:"";return i`<div class="detail-kv">
        <span class="detail-kv__k">${W}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${W}
          data-edit=${`wfmeta-${W}`}
          @change=${Fe=>l(W,Fe)}
        >
          <option value="" ?selected=${!be.includes(Ce)}>
            ${ve}
          </option>
          ${be.map(Fe=>i`<option value=${Fe} ?selected=${Ce===Fe}>${Fe}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function S(p,g){return te?i`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${O}
            @input=${$e}
            @keydown=${x=>wt(x,ht,Le,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${ht}
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
      `:i`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${p}</h2>
        ${At(g).map(x=>i`<span class="detail-usage-total" title=${x.tooltip}
              >${x.label}</span
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
    `}function H(p){let g=$t(p.created_at),x=$t(p.updated_at);return!g&&!x?i``:i`
      ${g?i`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${g}</span>
          </div>`:""}
      ${x?i`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${x}</span>
          </div>`:""}
    `}function oe(p,g){return i`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${Ot}
        >
          ${q_.map(x=>i`<option value=${x} ?selected=${x===p}>${x}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${nr}
        >
          ${F_.map(x=>i`<option value=${String(x)} ?selected=${x===g}>
                P${x}
              </option>`)}
        </select>
      </div>
    `}function ke(p){return i`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${Q?"":i`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${yt}
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
              .value=${M}
              @input=${Xe}
              @keydown=${g=>wt(g,Ht,Et,!0)}
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
                @click=${Et}
              >
                취소
              </button>
            </div>
          </div>`:i`<div class="detail-overlay__desc">
            ${p||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function ge(p){let g=typeof p.notes=="string"?p.notes:"";return g.trim().length===0?i``:i`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${g}</div>
    `}function Ye(p){let g=Array.isArray(p.labels)?p.labels:[];return i`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${g.map(x=>i`<span class="detail-label-chip"
              >${x}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${x}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+x}
                @click=${()=>kt(x)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${R}
            @input=${sr}
            @keydown=${fr}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${or}
          >
            추가
          </button>
        </span>
      </div>
    `}function ot(){if(!d)return i``;let p=f||{},g=String(p.id||d),x=p.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",W=ct(),ve=p.status||"open",be=typeof p.priority=="number"?Math.max(0,Math.min(4,p.priority)):"",Ce=p.description||"",Fe={...p,metadata:{...p.metadata||{},..._}};return i`
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
            @click=${J}
          >
            ${g}
          </button>
          ${S(x,W)}
          ${uc(Fe)}
          ${cc({metadata:Fe.metadata,workspace_values:h(),catalog:k(),execution_defaults:P(),expanded:I,presets:Y()?.presets||[],preset_id:y,preset_busy:A,skipped_orchestration_keys:E},{onToggle:gt=>{I=gt,qe()},onEdit:(gt,lr)=>{if(gt==="impl_runtime"||gt==="impl_model"||gt==="impl_effort"){N(gt,lr??"");return}T(gt,lr??"")},onPresetSelect:gt=>{y=gt,E=[],qe()},onPresetApply:()=>{Be()}})}
          ${oe(ve,be)} ${H(p)}
          ${ke(Ce)}
          ${Xl(b,le,{expanded:_e,draft:L,sending:D,error:re})}
          ${ge(p)} ${Ye(p)} ${tt(p)}
          ${Pt(p)} ${m(p)}
          ${Kl(p,Gt)}
          ${yc({expanded:ze,loading:rt,error:Ee,data:nt},{onToggle:He})}
          ${hc(Te(),pe,{total:W,expanded:Ze})}
        </div>
      </div>
    `}function qe(){Ge(ot(),e)}return{load(p){p!==d&&(_={},y="",E=[],I=!1,F(),de(),Oe()),d=p,f=null,et(),$()},clear(){d=null,f=null,_={},y="",A=!1,E=[],I=!1,F(),de(),Oe(),Re.close(),he.close(),Ge(i``,e)},destroy(){fe&&(fe(),fe=null),Ie&&(Ie(),Ie=null),Se&&(Se(),Se=null),document.removeEventListener("keydown",Pe),Re.destroy(),xe.parentNode&&xe.parentNode.removeChild(xe),he.destroy(),Ae.parentNode&&Ae.parentNode.removeChild(Ae),d=null,f=null,y="",A=!1,E=[],de(),Oe(),Ge(i``,e)}}}function wc(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let r=t.querySelector("#fatal-error-title"),n=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),c=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},u=(d,f,_="")=>{r&&(r.textContent=d||"Unexpected Error"),n&&(n.textContent=f||"An unrecoverable error occurred.");let y=typeof _=="string"?_.trim():"";if(s&&(y.length>0?(s.textContent=y,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>c()),t.addEventListener("cancel",d=>{d.preventDefault(),c()}),{open:u,close:c,getElement(){return t}}}function Ys(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function Zs(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let r=Math.floor(t/60);if(r<60)return`${r}\uBD84 ${Math.round(t-r*60)}\uCD08`;let n=Math.floor(r/60),s=r%60;return`${n}\uC2DC\uAC04 ${s}\uBD84`}function kc(e,t){if(typeof e!="object"||e===null)return null;let r=0,n=!1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t)continue;let a=o.started_at,c=o.finished_at;typeof a!="number"||typeof c!="number"||!Number.isFinite(a)||!Number.isFinite(c)||c<a||(r+=c-a,n=!0)}return n?r:null}function Xs(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function j_(e,t){let r=Array.isArray(e)?e:[],n=Array.isArray(t)?t:[];if(r.length===0&&n.length===0)return null;let s=null;for(let c of r)c.kind!=="deploy"||c.state!=="succeeded"||typeof c.target_sha!="string"||(!s||(typeof c.finished_at=="number"?c.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=c);let o=r.filter(c=>c.state==="failed"&&!c.dismissed&&!c.superseded_by).length+n.length,a=r.some(c=>c.state==="repairing");return{deploy:s?{sha:Ys(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function $c(e,t){let r=j_(e,t);return r?i`<button
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
  </div>`}function B_(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function Bn(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function Qs(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function pr(e,t,r={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(_=>_&&_.bead_id===t&&_.phase!=="done").sort((_,y)=>(_.requested_at||0)-(y.requested_at||0)).at(-1),o=typeof r.attempt_id=="string"&&r.attempt_id.length>0?r.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=r.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":r.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":r.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,c=typeof s?.last_error=="string"?s.last_error:null,u=s?B_(s.phase):null,d=s?.kind==="stale_work_backup_fresh",f=r.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!r.external&&!r.done,enabled:!a&&(!s||!!c),label:d?c?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":c?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(c?d?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${c} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${c} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${u||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:f==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:u,error:c,confirmation:f}}function kr(e){let t=e.discard;if(!t||!t.operation)return"";let r=t.operation,n=r.kind==="stale_work_backup_fresh"&&!t.error?null:r.backup?.path,s=r.original_pr,o=r.revert_pr;return i`<div
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
  </div>`}var U_={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function xc(e,t=!1){if(!e||typeof e!="object")return null;let r=e;if(r.reason!=="worktree_stale_work"||!r.stale_work||typeof r.stale_work!="object")return null;let n=r.stale_work,s=n.residue==="branch"?"branch":"worktree",o=n.state==="unique"?"unique":"unknown",a=n.summary&&typeof n.summary=="object"?n.summary:{};function c(d){return Number.isInteger(a[d])?Number(a[d]):0}let u=typeof n.cause=="string"?n.cause:"observe_failed";return{residue:s,state:o,title:s==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":o==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:U_[u]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:s==="branch"?`\uACE0\uC720 commit ${c("branch_ahead")}`:[`staged ${c("staged_count")}`,`unstaged ${c("unstaged_count")}`,`untracked ${c("untracked_count")}`,`branch ahead ${c("branch_ahead")}`,`HEAD ahead ${c("head_ahead")}`].join(" \xB7 "),action_id:typeof n.action_id=="string"?n.action_id:"",can_resume:n.can_resume===!0,can_continue:n.can_continue===!0,can_backup_fresh:n.can_backup_fresh===!0,can_recheck:n.can_recheck===!0,locked:t}}function fa(e){let t=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],n=At(e.usage),s=Xt(e.usage),o=e.merge_step||null,a=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,c=e.lane==="done"&&!a,u=c?qt(e.done_at):"",d=t?i`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",f=typeof e.seq=="number"?i`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",_=e.worker_serial===!0?i`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",y=e.workspace_name?i`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",A=i`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,E=i`<span class="worker-mini__title">${e.title}</span>`,I=e.pr_url&&e.pr_number?i`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",j=e.completion_repair_pr_url&&e.completion_repair_pr_number?i`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",te=r.map(de=>de===e.live_badge?i`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${de}</span
        >`:i`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${de===e.completion_badge&&e.completion_title||""}
          >${de}</span
        >`),Q=e.reason?i`<span class="worker-mini__reason">${e.reason}</span>`:"",O=n.length>0?n.map(de=>i`<span class="worker-usage" title=${de.tooltip}
              >${de.label}</span
            >`):s?i`<span class="worker-usage" title=${cn(e.usage)}
            >${s}</span
          >`:"",M=o?i`<span
        class="merge-step${o.failed?" merge-step--failed":""}"
        style=${`--progress: ${o.percent}%`}
        >${o.label}${o.index>0?i`<span class="merge-step__n"
              >${o.index}/${o.total}</span
            >`:""}</span
      >`:"",R=e.merge_action?i`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",F=e.cancel_action?i`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",b=e.timeline_action?i`<button
        type="button"
        class="worker-mini__timeline"
        data-bead-id=${e.id}
        title="저장소 작업이 끝나지 않아 머지 액션이 잠겼습니다 — 타임라인에서 원인과 해결 버튼을 볼 수 있습니다"
      >
        저장소 작업 보기
      </button>`:"",C=e.discard,z=C?.action||e.discard_action?i`<button
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
        </button>`:"",re=e.stale_work||null,L=re?i`${re.can_resume||re.can_continue?i`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${re.action_id}
            ?disabled=${re.locked}
          >
            기존 작업 이어가기
          </button>`:""}${re.can_backup_fresh?i`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${re.action_id}
            ?disabled=${re.locked}
          >
            백업 후 새로 시작
          </button>`:""}${re.can_recheck?i`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${re.action_id}
            ?disabled=${re.locked}
          >
            다시 확인
          </button>`:""}`:"",D=re?i`<div class="worker-mini__stale">
        <strong>${re.title}</strong>
        <span>${re.summary}</span>
        <span>${re.cause}</span>
        ${re.can_backup_fresh?i`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",ue=e.revise_action?i`<button
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
        </button>`:"",_e=!!(s||o||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||C?.operation||e.revise_action||re);return i`<div
    class="worker-mini${a?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${o?" worker-mini--merging":""}${o?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${c?i`<div class="worker-mini__row1">${y}${A}${E}</div>
          <div class="worker-mini__row2">
            ${O}${u?i`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${$t(e.done_at)}`}
                  >완료 ${u}</span
                >`:""}${typeof e.work_ms=="number"?i`<span
                  class="worker-mini__work"
                  title="attempt 실행 시간 합산 (재개 세션 포함)"
                  >작업 ${Zs(e.work_ms)}</span
                >`:""}${te}${M}
            <span class="worker-mini__actions"
              >${R}${F}${b}${z}</span
            >
            ${fn(e)}
          </div>`:a?i`<div class="worker-mini__head">
              ${d}${f}${y}${A}${I}${j}${te}${_}${Q}
            </div>
            <div class="worker-mini__body">${E}${D}</div>
            ${_e?i`<div class="worker-mini__foot">
                  ${O}${M}
                  <span class="worker-mini__actions"
                    >${R}${F}${b}${z}${ue}${L}</span
                  >
                  ${kr(e)}
                </div>`:""}
            ${fn(e)}`:i`<div class="worker-mini__line">
              ${d}${f}${y}${A}${E}${I}${j}${te}${_}${Q}${O}${M}${R}${F}${b}${z}
            </div>
            ${kr(e)} ${fn(e)}`}
  </div>`}function W_(e,t=null){let r=e.worker_ineligible===!0,n=e.draggable&&!e.done&&!r,s=n&&t&&t.bead_id===e.id,o=e.workflow,a=o&&o.chips||{},c=a.route||o&&o.route,u=a.route_source==="derived"||!!(o&&o.route_source==="derived"),d=typeof e.reason=="string"&&e.reason.split(" \xB7 ").includes("missing_description"),f=typeof e.reason=="string"&&e.reason.startsWith("\u26D4");return i`<div
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
            ${t.lanes.map(_=>i`<button
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
          </div>`:i`${e.reason?i`<span
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
    ${fn(e)}
  </div>`}function rr(e){let t=!!e.collapsible&&!!e.collapsed,r=i`<span
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
  </section>`}function _a(e,t){return`${e}\0${t}`}function ma(e){let t=new Map;for(let r of Array.isArray(e?.running)?e.running:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"running",state:"running"});for(let r of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let r of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let n=Array.isArray(r.sublanes?.parallel)?r.sublanes.parallel:Array.isArray(r.items)?r.items:[];for(let s of n)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:"parallel",position:s.queue_position});for(let s of Array.isArray(r.sublanes?.serial)?r.sublanes.serial:[])for(let o of s.items)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:s.id,position:o.queue_position})}for(let r of Array.isArray(e?.runnable)?e.runnable:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"runnable",state:"runnable"});for(let r of Array.isArray(e?.done)?e.done:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"done",state:"done"});return t}function z_(e,t){let r=Array.isArray(t)?t:[],n=e.indexOf("-"),s=n>0?e.slice(0,n):e;return r.some(o=>typeof o?.issue_prefix=="string"&&o.issue_prefix===s)?"internal":r.length>0&&r.every(o=>typeof o?.issue_prefix=="string")?"external":"unknown"}function H_(e,t){return e==="internal"&&t===void 0}function Ac(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function Sc(e,t,r,n){let s=r.get(e);if(!!(s&&t&&s.root_dir===t.root_dir&&s.lane===t.lane&&typeof s.position=="number"&&typeof t.position=="number"&&s.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,scope:null,same_lane_ahead:!0,missing_internal:!1};if(s)return{id:e,label:`\u{1F512} ${e} (${Ac(s)})`,scope:null,same_lane_ahead:!1,missing_internal:!1};let a=z_(e,n);return{id:e,label:`\u{1F512} ${e} (${a==="internal"?"\uBBF8\uC801\uC7AC":a==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"})`,scope:a,same_lane_ahead:!1,missing_internal:H_(a,s)}}function Ec(e){let t=Array.isArray(e)?e:[],r=new Map,n=new Map,s=new Map;for(let c of t)for(let u of Array.isArray(c.sublanes?.serial)?c.sublanes.serial:[]){let d=_a(c.root_dir,u.id);r.set(d,{root_dir:c.root_dir,workspace_name:c.name,lane:u.id}),s.set(d,[]);for(let f of Array.isArray(u.items)?u.items:[])n.set(f.id,d)}for(let c of t)for(let u of Array.isArray(c.sublanes?.serial)?c.sublanes.serial:[]){let d=_a(c.root_dir,u.id),f=Array.isArray(u.items)?u.items[0]:null,y=!!f&&f.queue_index===0&&(!Array.isArray(u.occupied_by)||u.occupied_by.length===0)&&Array.isArray(f.blocked_by)?f.blocked_by:[],A=s.get(d);if(A)for(let E of y){let I=n.get(E);I&&I!==d&&!A.includes(I)&&A.push(I)}}let o=(c,u)=>{let d=new Set,f=[c];for(;f.length>0;){let _=f.pop();if(_===u)return!0;!_||d.has(_)||(d.add(_),f.push(...s.get(_)||[]))}return!1},a=new Map;for(let[c,u]of s){let d=[];for(let f of u){let _=r.get(f);o(f,c)&&_&&d.push(_)}d.length>0&&a.set(c,d)}return a}function Tc(e){let t=ma(e),r=new Map;for(let n of[...Array.isArray(e?.runnable)?e.runnable:[],...Array.isArray(e?.queue)?e.queue:[],...Array.isArray(e?.running)?e.running:[],...Array.isArray(e?.pr_wait)?e.pr_wait:[]])r.has(n.id)||r.set(n.id,n);return Array.from(r.values()).map(n=>({id:n.id,title:n.title,root_dir:n.root_dir,workspace_name:n.workspace_name,location:t.has(n.id)?(()=>{let s=t.get(n.id),o=Ac(s);return s.state?`${s.workspace_name} \xB7 ${o}`:o})():""}))}function Cc(e,t){return _a(e,t)}var Rc=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],Un=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function Js(e,t){let r=Rc.find(s=>s.step===e);if(!r)return null;let n=Rc.length;return{step:r.step,label:t,index:r.index,total:n,percent:Math.round(r.index/n*100)}}function Ic(e){let t=Un.findIndex(r=>r.step===e);return Un.map((r,n)=>({step:r.step,label:r.label,state:t<0?"todo":n<t?"done":n===t?"stall":"todo"}))}function Hr(e){let t=Un.find(r=>r.step===e);return t?t.label:typeof e=="string"?e:""}function G_(e){let t=Un.findIndex(r=>r.step===e);return t<0?null:{index:t+1,total:Un.length}}function eo(e){let t=G_(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var ba=new Set(["queued","running","retry_pending","repairing"]),Lc=new Set(["failed","succeeded"]),V_={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",repairing:"\uC790\uB3D9 \uD574\uACB0 \uC911",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},Wn={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},K_={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:Wn.base_containment,child_sweep:Wn.child_sweep,branch_cleanup:Wn.branch_cleanup,parent_close:Wn.parent_close};function Y_(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function Z_(e,t,r){return!["verify","deploy"].includes(e.kind)||![...ba,...Lc].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(n=>n&&typeof n=="object"&&n.bead_id===t&&n.merged_sha===r)}function X_(e,t){let r=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(r!==0)return r;let n=d=>d.state==="succeeded"?1:2,s=n(t)-n(e);if(s!==0)return s;let o=typeof e.requested_at=="number"?e.requested_at:0,a=typeof t.requested_at=="number"?t.requested_at:0;if(o!==a)return a-o;let c=typeof e.operation_id=="string"?e.operation_id:"",u=typeof t.operation_id=="string"?t.operation_id:"";return c.localeCompare(u)}function ga(e,t=!1){let r=e.kind,n=r==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",s=t?"failed":e.state,o=V_[s];if(!o)return null;let a=Js(r,`${n} ${o}`);return a?{...a,active:ba.has(s),failed:s==="failed"}:null}function Q_(e){return!e||typeof e!="object"?null:K_[e.step]||null}function zn(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,r=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},n=Q_(r),s=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,o=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),a=!o&&(e.cleanup_cursor==="repo_operations"||r.step==="repo_operations"),c=Y_(e.merge_sha)?e.merge_sha:null,u=!o&&c&&Array.isArray(e.repo_operations)?e.repo_operations.filter(E=>E&&typeof E=="object"&&Z_(E,t,c)).sort(X_):[],d=a?u:[],f=d.find(E=>ba.has(E.state));if(f)return ga(f);if(s)return s.step==="repo_operations"&&u[0]?ga(u[0],!0):null;let _=d.find(E=>Lc.has(E.state)?E.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(_)return ga(_);if(n){let E=Js(n.step,n.label);return E?{...E,active:!0,failed:!1}:null}let y=typeof e.cleanup_cursor=="string"?Wn[e.cleanup_cursor]:null;if(!y)return null;let A=Js(y.step,y.label);return A?{...A,active:!0,failed:!1}:null}function to(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var Oc={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},Mc={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."};function Pc(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function ha(e){for(let t of Pc(e))if(Object.hasOwn(Oc,t))return Oc[t];return null}function ya(e){let t=null;for(let r of Pc(e))Object.hasOwn(Mc,r)&&(t=Mc[r]);return t}function ro(e){let t=ha(e),r=ya(e);return t&&r?`${t} \u2014 ${r}`:t||r?t||r:typeof e=="string"?e:""}function Dc(e,t){let r=ha(e)??ha(t),n=ya(t)??ya(e);return r&&n?`${r} \u2014 ${n}`:r||n?r||n:typeof t=="string"?t:""}var Nc=160;function J_(e){return e.length>Nc?`${e.slice(0,Nc)}\u2026`:e}function em(e){return!e||!e.reason?"":i`<div class="worker-banner__detail">
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
          ${kr({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function rm(e,t,r=null){let n=e.failed===!0,s=!!e.paused,o=n?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):s?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?va(t-e.started_at):"\u2014",a=ur(e),c=Sr(e),u=At(e.usage),d=Xt(e.usage),f=e.conflict_resolution?s?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,_=e.base_exception||null,y=e.landing,A=e.attempt_id&&e.attempt_id===r,E=e.discard?.action?i`<button
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
            ${E}
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
            ${E}`}
    </div>
    <div class="rtile__title">${e.title}</div>
    ${e.current_child?i`<div class="rtile__child" title="현재 진행중 child">
          └ ${e.current_child}
        </div>`:""}
    ${y?i`<div class="rtile__landing">
          <span
            class="merge-step${y.failed?" merge-step--failed":""}"
            style=${`--progress: ${y.percent}%`}
            >${y.label}${y.index>0?i`<span class="merge-step__n"
                  >${y.index}/${y.total}</span
                >`:""}</span
          >
        </div>`:""}
    ${a||u.length>0||d||f||_?i`<div class="rtile__meta">
          ${f?i`<span class="worker-mini__badge">${f}</span>`:""}
          ${_?i`<span
                class="worker-mini__badge"
                title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                >${_}</span
              >`:""}
          ${a?i`<span class="rtile__runner">${a}</span>`:""}
          ${u.length>0?u.map(I=>i`<span class="worker-usage" title=${I.tooltip}
                    >${I.label}</span
                  >`):d?i`<span
                  class="worker-usage"
                  title=${cn(e.usage)}
                  >${d}</span
                >`:""}
        </div>`:""}
    ${fn(e)} ${kr(e)}
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
    <path d="M8.8 3.6 14 8l-5.2 4.4z" />`)}var Hn=1,nm=6e4,sm={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"},om=new Set(["auto_merge","merged","merge","done"]),zc={running:3,paused:2,failed:1};function am(e,t){let r=null,n=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=n&&(n=o,r=s)}return r}function im(e,t){let r=Object.values(e||{}),n=new Set,s=new Map;for(let a of r)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&n.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of r){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let c=null;if(a.status==="running")c="running";else if(a.status==="paused"&&!n.has(a.attempt_id))c="paused";else if(a.status==="failed"||a.status==="orphaned"){let _=t.get(a.bead_id),y=typeof _=="number"&&_>0&&typeof a.finished_at=="number"&&_>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!y&&typeof a.dismissed_at!="number"&&(c="failed")}if(!c)continue;let u=typeof a.started_at=="number"?a.started_at:null,d=o.get(a.bead_id);if(d){let _=zc[d.run_state],y=zc[c];if(_>y||_===y&&(d.started_at??0)>(u??0))continue}let f=typeof a.session_id=="string"&&a.session_id.length>0;o.set(a.bead_id,{attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",run_state:c,started_at:u,last_event_at:typeof a.last_event_at=="number"?a.last_event_at:null,runner:typeof a.runner=="string"?a.runner:null,model:typeof a.model=="string"?a.model:null,effort:typeof a.effort=="string"?a.effort:null,speed:typeof a.speed=="string"?a.speed:null,resumed_from:typeof a.resumed_from=="string"?a.resumed_from:null,continuation_mode:a.continuation_mode==="session"||a.continuation_mode==="fresh"?a.continuation_mode:null,usage:Wt(e,a.bead_id),can_pause:c==="running"&&f,can_resume:c!=="running"&&f&&!n.has(a.attempt_id)})}return o}function Hc(e,t){let r=e[t];if(!r)return"";if(r.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let n=typeof r.reason=="string"?r.reason:"",s=n.indexOf(":");return s>0&&s<n.length-1?`\u26D4 ${n.slice(0,s)} (${n.slice(s+1)})`:`\u26D4 ${n}`}function St(e){return e&&typeof e=="object"?e:{}}function xa(e,t,r){let n=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=r&&typeof r.done_since=="number"?r.done_since:void 0,a=new Map;for(let b of s)b&&typeof b.root_dir=="string"&&a.set(b.root_dir,b);let c=[],u=[],d=[],f=[],_=[],y=[],A=new Map,E=new Map,I=new Map;for(let b of n){if(!b||typeof b.root_dir!="string")continue;let C=b.root_dir,z=b.name||C,re=a.get(C),L=re&&typeof re.revision=="number"?re.revision:typeof b.revision=="number"?b.revision:0,D=St(b.attempts),ue=St(b.bead_titles),_e=St(b.pr_observations),de=St(b.admission),Ue=St(b.revise_parked),Je=St(b.merge_queue_state),Ke=St(b.cleanup_failed),Me=St(b.discard_operations),We=St(b.bead_blocked_by),le=St(b.pr_activity),xe=Array.isArray(b.repo_operations)?b.repo_operations:[],Re=Array.isArray(b.merge_queue)?b.merge_queue:[],Ae=new Set(Re.filter(G=>G&&typeof G.bead_id=="string").map(G=>G.bead_id)),he=new Map(Re.filter(G=>G&&typeof G.bead_id=="string").map(G=>[G.bead_id,G])),ze=Array.isArray(b.queue)?b.queue:[],rt=(Array.isArray(b.serial_lanes)?b.serial_lanes:[]).filter(G=>G&&/^s[1-5]$/.test(G.id)&&Array.isArray(G.entries)),Ee=St(b.lane_states),nt=typeof b.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(b.serial_lane_count))):Math.min(5,rt.length);I.set(C,nt);let K=new Map(rt.map(G=>[G.id,G])),B=new Map;for(let G of rt)for(let ee of G.entries)ee&&typeof ee.bead_id=="string"&&B.set(ee.bead_id,G.id);let ne=Array.isArray(b.done)?b.done:[];for(let G of ne)G&&typeof G.bead_id=="string"&&y.push({id:G.bead_id,root_dir:C,workspace_name:z});let Oe=new Map;for(let G of ne)G&&typeof G.bead_id=="string"&&typeof G.added_at=="number"&&Oe.set(G.bead_id,G.added_at);let je=G=>({id:G,title:ue[G]||G,root_dir:C,workspace_name:z,expected_revision:L,draggable:!1}),He=new Set;for(let[G,ee]of im(D,Oe))He.add(G),u.push({...je(G),lane:"running",...B.has(G)?{serial_lane_id:B.get(G)}:{},attempt_id:ee.attempt_id,run_state:ee.run_state,can_pause:ee.can_pause,can_resume:ee.can_resume,started_at:ee.started_at,last_event_at:ee.last_event_at,runner:ee.runner,model:ee.model,effort:ee.effort,speed:ee.speed,resumed_from:ee.resumed_from,continuation_mode:ee.continuation_mode,usage:ee.usage,discard:pr(Me,G,{attempt_id:ee.attempt_id}),badges:ee.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:ee.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:ee.run_state==="failed"});for(let G of Array.isArray(b.pr_wait)?b.pr_wait:[]){let ee=G&&G.bead_id;if(typeof ee!="string"||He.has(ee))continue;He.add(ee);let Ne=St(_e[ee]),st=St(Ne.pr),pe=Ne.gate?St(Ne.gate):null,h=Ae.has(ee),$=he.get(ee)?.continuation_action||null,k=!!$&&$.continuation===null,P=Je.active===ee,V=G.external===!0,Y=Ke[ee]||null,ie=St(le[ee]),ce=zn({bead_id:ee,merge_sha:G.merge_sha,cleanup_cursor:G.cleanup_cursor,merge_progress:ie.merge_progress||null,cleanup_failed:Y,repo_operations:xe}),Be=to(ce),fe=!!pe&&pe.base_badge==="\uCDA9\uB3CC",Ie=!!Y&&["child_sweep","branch_cleanup","parent_close"].includes(Y.step)&&!!pe&&pe.tier==="merged",Se=V&&!!Y&&!!pe&&pe.tier==="merged",Pe=!!pe&&["closed_unmerged","review","undecidable"].includes(pe.tier),et=pr(Me,ee,{external:V,merge_active:P||ce?.step==="merge",merge_queued:h,cleanup_active:Be,merged:!!Y||pe?.tier==="merged"}),U=!!et.operation;d.push({...je(ee),lane:"pr_wait",pr_number:typeof st.number=="number"?st.number:null,pr_url:typeof st.url=="string"?st.url:void 0,external:V,usage:Wt(D,ee),merge_step:ce,badges:k?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:ce?[pe?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:Y?[Hr(Y.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Hr(Y.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof pe?.gate_badge=="string"&&pe.gate_badge.length>0?[pe.gate_badge]:[],alert:ce?ce.failed===!0:!!Y||Pe,reason:Y&&ce?.active!==!0?eo(Y.step):"PR \uB300\uAE30",merge_action:pe?.tier==="merged"&&!Ie&&!Se?!1:!h||k,merge_enabled:!U&&(k||pe?.enabled===!0||fe||Ie||Se),merge_label:k?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Se||Ie?"\uC815\uB9AC \uC7AC\uAC1C":fe&&!Ie?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:k?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":U?et.error?`\uD3D0\uAE30 \uC2E4\uD328: ${et.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${et.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Se?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Ie?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":fe?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":pe?.enabled===!0?`\uBA38\uC9C0 (${pe.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${pe?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:h&&!k,cancel_enabled:!P,continuation_mismatch:$?.mismatch||null,discard:et,discard_action:et.action,discard_enabled:et.enabled,discard_title:et.title})}let Te=(G,ee,Ne,st)=>{let pe=G&&G.bead_id;if(typeof pe!="string"||He.has(pe))return null;He.add(pe);let h=Ue[pe],$=pr(Me,pe),k=$.operation?$:null,P={...je(pe),lane:ee,draggable:!k,discard:k||void 0,reason:Hc(de,pe),queue_position:Ne+1,queue_index:Ne,queue_length:st,badges:h?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!h,revise_action:!!h,revise_enabled:!!h&&!k,revise_title:h?h.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${h.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};return Object.hasOwn(We,pe)&&(P.blocked_by=Array.isArray(We[pe])?We[pe].filter(V=>typeof V=="string"&&V.length>0):[]),P};for(let G=0;G<ze.length;G++){let ee=Te(ze[G],"queue",G,ze.length);if(!ee)continue;f.push(ee);let Ne=A.get(C);Ne?Ne.push(ee):A.set(C,[ee])}let ct=[];for(let G=0;G<rt.length;G++){let ee=rt[G],Ne=[];for(let pe=0;pe<ee.entries.length;pe++){let h=Te(ee.entries[pe],ee.id,pe,ee.entries.length);h&&(Ne.push(h),f.push(h))}if(Ne.length===0)continue;let st=St(Ee[ee.id]);ct.push({id:ee.id,index:G,items:Ne,occupied_by:Array.isArray(st.occupied_by)?st.occupied_by.filter(pe=>typeof pe=="string"):[],corrections:Array.isArray(st.corrections)?st.corrections.length:0,cycle:st.cycle===!0})}E.set(C,ct);let Ze=Array.from({length:nt},(G,ee)=>{let Ne=`s${ee+1}`,st=K.get(Ne),pe=st&&Array.isArray(st.entries)?st.entries:[],h=St(Ee[Ne]);return{id:Ne,index:pe.length,length:pe.length,occupied_by:Array.isArray(h.occupied_by)?h.occupied_by.filter($=>typeof $=="string"):[]}});for(let G of Array.isArray(b.runnable)?b.runnable:[]){let ee=G&&G.bead_id;typeof ee!="string"||He.has(ee)||(He.add(ee),c.push({...je(ee),title:G.title||ue[ee]||ee,lane:"runnable",draggable:!0,reason:Hc(de,ee),created_at:G.created_at??void 0,updated_at:G.updated_at??void 0,labels:Array.isArray(G.labels)?G.labels:[],spec_reviewer:typeof G.spec_reviewer=="string"?G.spec_reviewer:void 0,plan_state:G.plan_state==="approved"||G.plan_state==="authored"?G.plan_state:"none",workflow:G.route?{route:G.route,chips:{route:G.route}}:null,blocked:G.blocked===!0,...Array.isArray(G.blocked_by)?{blocked_by:G.blocked_by.filter(Ne=>typeof Ne=="string"&&Ne.length>0)}:{},place_index:ze.length,place_lanes:Ze}))}for(let G of ne){let ee=G&&G.bead_id;if(typeof ee!="string"||He.has(ee)||(He.add(ee),o!==void 0&&typeof G.added_at=="number"&&G.added_at<o))continue;let Ne=am(D,ee);_.push({...je(ee),lane:"done",done:!0,usage:Wt(D,ee),done_at:typeof G.added_at=="number"?G.added_at:void 0,done_kind:Ne&&typeof Ne.done_kind=="string"?Ne.done_kind:null})}}let j=new Map;s.forEach((b,C)=>{b&&typeof b.root_dir=="string"&&j.set(b.root_dir,C)});let te=r&&r.running_sort==="repo"?"repo":"started";u.sort((b,C)=>{if(te==="repo"){let L=j.get(b.root_dir)??Number.MAX_SAFE_INTEGER,D=j.get(C.root_dir)??Number.MAX_SAFE_INTEGER;if(L!==D)return L-D}let z=typeof b.started_at=="number"&&Number.isFinite(b.started_at)?b.started_at:null,re=typeof C.started_at=="number"&&Number.isFinite(C.started_at)?C.started_at:null;return z!==null&&re!==null&&z!==re?z-re:z===null&&re!==null?1:z!==null&&re===null?-1:b.id.localeCompare(C.id)}),_.sort((b,C)=>(C.done_at??0)-(b.done_at??0));let Q=s.length>0?s:n.map(b=>({root_dir:b&&b.root_dir,name:b&&b.name,auto_advance:b&&b.auto_advance,auto_merge:b&&b.auto_merge,slots:b&&b.slots,revision:b&&b.revision,runner_catalog:b&&b.runner_catalog})),O=[];for(let b of Q){if(!b||typeof b.root_dir!="string")continue;let C=A.get(b.root_dir)||[],z=E.get(b.root_dir)||[];O.push({root_dir:b.root_dir,name:b.name||b.root_dir,auto_advance:b.auto_advance===!0,auto_merge:b.auto_merge===!0,slots:typeof b.slots=="number"&&b.slots>=Hn?b.slots:Hn,revision:typeof b.revision=="number"?b.revision:0,runner_catalog:St(b.runner_catalog),items:C,sublanes:{parallel:C,serial:z},serial_lane_count:I.get(b.root_dir)||0})}let M={runnable:c,queue:f,queue_groups:O,running:u,pr_wait:d,done:_,automation:{total:O.length,both_on:O.filter(b=>b.auto_advance&&b.auto_merge).length}},R=ma(M);for(let b of y)R.has(b.id)||R.set(b.id,{root_dir:b.root_dir,workspace_name:b.workspace_name,lane:"done",state:"done"});for(let b of[...M.queue,...M.runnable]){if(!Object.hasOwn(b,"blocked_by"))continue;let C=R.get(b.id);b.blockers=(b.blocked_by||[]).map(z=>Sc(z,C,R,s)),b.blocker_warnings=b.blockers.filter(z=>z.missing_internal).map(z=>`\u26A0 \uC120\uD589 ${z.id}\uAC00 \uC5B4\uB290 \uB808\uC778\uC5D0\uB3C4 \uC5C6\uACE0 \uC2E4\uD589 \uC911\uB3C4 \uC544\uB2D8 \u2014 \uC218\uB3D9 \uAC1C\uC785 \uC804\uAE4C\uC9C0 \uC774 \uC790\uB9AC\uC5D0\uC11C \uC815\uC9C0`),b.blocker_warnings.length>0&&(b.alert=!0)}let F=Ec(M.queue_groups);for(let b of M.queue_groups)for(let C of b.sublanes.serial){let z=F.get(Cc(b.root_dir,C.id));z&&(C.cross_wait_peers=z)}return M}function lm(e,t){if(typeof e!="number"||!Number.isFinite(e))return"";let n=t-e<nm;return i`<span
    class="mon-beat${n?" mon-beat--live":""}"
    title=${`\uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${$t(e)}`}
    ><span class="mon-beat__dot" aria-hidden="true"></span>${n?"":i`<span class="mon-beat__age"
          >${qt(e,t)}</span
        >`}</span
  >`}function Gn(e){return i`<div class="mon-c__title">${e.title}</div>`}function Vn(e){return i`<span class="mon-c__id" title="클릭하면 상세로 이동"
    >${e.id}</span
  >`}function no(e){return e.workspace_name?i`<span class="mon-c__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:""}function Aa(e){let t=At(e.usage),r=Xt(e.usage);return t.length>0?t.map(n=>i`<span class="mon-c__usage" title=${n.tooltip}
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
      ${ur(e)?i`<span class="mon-c__model">${ur(e)}</span>`:""}
      ${Sr(e)?i`<span
            class="rtile__resumed"
            title=${Sr(e)}
            >↻</span
          >`:""}
      ${e.serial_lane_id?i`<span class="mon-c__lane">${e.serial_lane_id}</span>`:""}
      ${r?i`<span class="mon-live__elapsed">${r}</span>`:""}
      ${Aa(e)}${cm(e)}${kr(e)}
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
    ${Vc(e)} ${kr(e)}
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
        </div>`:""}`}function fm(e){let t=e.merge_step||null,r=!!(Xt(e.usage)||t||e.merge_action||e.cancel_action||e.discard_action);return i`${Gn(e)}
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
          ${kr(e)}
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
  </header>`}function Xc(e){let{total:t,both_on:r}=e.automation,n=t>0&&r===t,s=e.running_sort==="repo"?"repo":"started",o=cr.find(c=>c.value===e.done_range)?.label||"",a=Array.isArray(e.token_total)?e.token_total:e.token_total?[{label:e.token_total,tooltip:e.token_tooltip}]:[];return i`<div class="mon-top">
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
        ${cr.map(c=>i`<option
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
  </div>`}function Qc(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function Jc(e){let t=(Array.isArray(e)?e:[]).map(c=>c&&c.usage).filter(c=>c&&typeof c=="object"&&"providers"in c);if(t.length>0)return At(As(t));let r={};for(let c of gr)r[c]=0;let n=!1,s=0,o=0,a=0;for(let c of Array.isArray(e)?e:[]){let u=c&&c.usage;if(u&&typeof u=="object"){let d=!1;for(let f of gr){let _=u[f];typeof _=="number"&&Number.isFinite(_)&&(r[f]+=_,n=!0,d=!0)}if(d){o+=1;let f=u.total_cost_usd;typeof f=="number"&&Number.isFinite(f)&&(s+=f,a+=1)}}}return o>0&&a===o&&(r.total_cost_usd=s),n?Xt(r):null}var eu="bdui.monitor.done-range",tu="bdui.monitor.running_sort",ru="beads-ui.monitor.candidate-filter",Ea={show_blocked:!1};function mm(){try{let e=window.localStorage.getItem(ru);if(!e)return{...Ea};let t=JSON.parse(e);return!t||typeof t!="object"?{...Ea}:{show_blocked:t.show_blocked===!0}}catch{return{...Ea}}}function gm(e){try{window.localStorage.setItem(ru,JSON.stringify({show_blocked:e.show_blocked}))}catch{}}function bm(e,t){if(t.show_blocked)return{visible:e,hidden_blocked:0};let r=e.filter(n=>n.blocked!==!0);return{visible:r,hidden_blocked:e.length-r.length}}function hm(){try{let e=window.localStorage.getItem(eu);return Ut(e)?e:Nt}catch{return Nt}}function ym(e){try{window.localStorage.setItem(eu,e)}catch{}}function vm(){try{return window.localStorage.getItem(tu)==="repo"?"repo":"started"}catch{return"started"}}function wm(e){try{window.localStorage.setItem(tu,e)}catch{}}var nu="tab:monitor:pipeline",km=1e3,$m=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}];function so(e,t){let r=(e.lane==="runnable"||e.lane==="queue")&&e.draggable!==!1;return i`<div
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
  </div>`}function su(e,t){let r=mt("views:monitor"),n=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,c=t.switchWorkspace,u=t.now||(()=>Date.now()),d=t.confirm||(h=>typeof globalThis.confirm!="function"||globalThis.confirm(h)),f=hm(),_=vm(),y=mm();function A(){let h=cr.find($=>$.value===f);return h?h.label:""}let E=document.createElement("div");E.className="mon",e.appendChild(E);let I=xa(null,null),j=new Map,te=null,Q=null;async function O(h,$,k,P,V=!0){if(!o||!k)return null;let Y=await o(h,{...$,root_dir:k,expected_revision:P});if(Y&&Y.conflict&&V){Y.queue&&j.set(k,Y.queue);let ie=Y.queue&&typeof Y.queue.revision=="number"?Y.queue.revision:P;Y=await o(h,{...$,root_dir:k,expected_revision:ie})}return Y&&Y.queue&&k&&j.set(k,Y.queue),Y}function M(h,$){let k=j.get(h),P=s&&s.get?s.get():null,V=(Array.isArray(P)?P:[]).find(ie=>ie?.root_dir===h);return(k||V)?.merge_queue?.find(ie=>ie.bead_id===$)?.continuation_action}async function R(h,$,k,P){let V=await O(h,$,k,P),Y=j.get(k)?.revision??V?.queue?.revision??P;return mr(V,(ie,ce)=>O(h,{...$,continuation:ie,decision_token:ce},k,Y,!1),{refresh:ie=>O(h,$,k,ie?.queue?.revision??j.get(k)?.revision??Y,!1)})}async function F(h,$,k,P){let V=await mr({continuation_mismatch:P},(ie,ce)=>O("worker-merge-queue-add",{bead_id:$,continuation:ie,decision_token:ce},h,k,!1)),Y=V?.queue?.merge_queue?.find(ie=>ie.bead_id===$)?.continuation_action;V?.applied!==!0&&Y?.continuation===null&&Y.mismatch&&await F(h,$,V.queue.revision,Y.mismatch)}async function b(h,$,k){let P=await O("worker-discard",h,$,k);if(P&&P.discarded===!0){se(Qs(P),"success",5e3);return}if(P&&P.reason){se(`\uD3D0\uAE30 \uC2E4\uD328: ${P.reason}`,"error");return}if(P&&P.accepted&&P.pending==="merged_revert"){se("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(P&&P.accepted){se(`\uD3D0\uAE30 \uC9C4\uD589: ${P.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}P&&!P.conflict&&se("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function C(h,$,k){return!o||!k?null:await o(h,{...$,root_dir:k})}async function z(h){if(!o||!h&&!d("\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB055\uB2C8\uB2E4. \uAC01 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uD568\uAED8 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?"))return;let $=await o("monitor-auto-toggle",{on:h}),k=$&&Array.isArray($.failed)?$.failed:[];k.length>0&&se(`\uC790\uB3D9\uD654 ${h?"\uCF1C\uAE30":"\uB044\uAE30"} \uC77C\uBD80 \uC2E4\uD328: ${k.map(P=>P.root_dir).join(", ")}`,"error",3200)}async function re(){let h=new Map;for(let $ of I.pr_wait)h.has($.root_dir)||h.set($.root_dir,$.expected_revision);for(let[$,k]of h)await O("worker-merge-queue-add-all",{},$,k)}let L=null,D=!1,ue=null;function _e(){ue!==null&&clearTimeout(ue),ue=setTimeout(()=>{ue=null,D=!1},0)}function de(h){let $=h.target;return typeof $?.closest=="function"?$.closest(".mon-group"):null}function Ue(h){let $=de(h);return!$||!L?null:($.getAttribute("data-root-dir")||"")===L.root_dir?$:null}function Je(){for(let h of Array.from(E.querySelectorAll(".mon-group--drag-over")))h.classList.remove("mon-group--drag-over")}function Ke(h){let $=h.target,k=typeof $?.closest=="function"?$.closest('.mon-card[draggable="true"]'):null;if(k){L={bead_id:k.getAttribute("data-issue-id")||"",lane:k.getAttribute("data-lane")||"",root_dir:k.getAttribute("data-root-dir")||"",revision:Number(k.getAttribute("data-revision")||0)||0,queue_index:Number(k.getAttribute("data-queue-index")),queue_length:Number(k.getAttribute("data-queue-length")),place_index:Number(k.getAttribute("data-place-index"))},D=!0;try{h.dataTransfer?.setData("text/plain",L.bead_id),h.dataTransfer&&(h.dataTransfer.effectAllowed="move")}catch{}}}function Me(h){let $=Ue(h);$&&(h.preventDefault(),h.dataTransfer&&(h.dataTransfer.dropEffect="move"),$.classList.add("mon-group--drag-over"))}function We(h){de(h)?.classList.remove("mon-group--drag-over")}function le(){L=null,Je(),_e()}function xe(h){let $=Ue(h),k=L;if(L=null,Je(),!$||!k||!k.bead_id)return;h.preventDefault();let P=h.target,V=typeof P?.closest=="function"?P.closest('.mon-card[data-lane="queue"]'):null,Y=V&&$.contains(V)?Number(V.getAttribute("data-queue-index")):NaN;if(k.lane==="runnable"){let Be=Number.isFinite(Y)?Y:k.place_index;if(!Number.isFinite(Be))return;O("worker-queue-place",{bead_id:k.bead_id,index:Be},k.root_dir,k.revision);return}if(k.lane!=="queue"||V&&V.getAttribute("data-issue-id")===k.bead_id)return;let ie=k.queue_index,ce=Number.isFinite(Y)?ie>Y?Y:Y-1:k.queue_length-1;!Number.isFinite(ce)||ce<0||ce===ie||O("worker-queue-reorder",{bead_id:k.bead_id,to_index:ce},k.root_dir,k.revision)}function Re(h){let $=bm(I.runnable,y),k={runnable:$.visible,queue:I.queue,running:I.running,pr_wait:I.pr_wait,done:I.done};return i`${Xc({automation:I.automation,counts:{running:I.running.length,queue:I.queue.length,pr_wait:I.pr_wait.length},running_sort:_,done_range:f,token_total:Jc(I.done),token_tooltip:Qc(A())})}
      <div class="worker-lanes mon-lanes">
        ${$m.map(P=>{let V=k[P.lane],Y=P.lane==="queue"?I.queue_groups.length>0?i`${I.queue_groups.map(ie=>xm(ie,h))}`:void 0:V.length>0?i`${V.map(ie=>so(ie,h))}`:void 0;return rr({id:`monitor-${P.lane}`,lane:P.pane,title:P.lane==="done"?`\uC644\uB8CC\xB7${A()}`:P.title,items:V,empty:P.empty,body:Y,live:P.lane==="running"&&V.length>0,header_control:P.lane==="runnable"?i`<span class="mon-candidate-filter">
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
                    ${$.hidden_blocked>0?i`<span class="worker-filter__hidden"
                          >숨김 ${$.hidden_blocked}건</span
                        >`:""}
                  </span>`:P.lane==="pr_wait"&&V.length>0?i`<button
                      type="button"
                      class="mon-lane-op mon-merge-all"
                      title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
                    >
                      일괄 머지
                    </button>`:""})})}
      </div>`}function Ae(){let h=s&&s.get?s.get():null,$=s&&s.getWorkspacesState?s.getWorkspacesState():[],k=u();I=xa(h,$,{done_since:Nr(f,k),running_sort:_}),Ge(Re(k),E)}function he(h,$){let k=a?a():void 0;if(!$||!k||$===k||!c){n(h);return}c($).then(()=>{n(h)}).catch(P=>{r("workspace switch for %s failed: %o",$,P)})}function ze(h){return{root_dir:h.getAttribute("data-root-dir")||"",revision:Number(h.getAttribute("data-revision")||0)||0}}function rt(h){if(typeof h=="string"&&h.length>0)return h;if(h&&typeof h=="object"){let $=h;if(typeof $.message=="string"&&$.message.length>0)return $.message;if(typeof $.error=="string"&&$.error.length>0)return $.error;if($.error&&typeof $.error=="object"&&typeof $.error.message=="string")return $.error.message}return"\uC5F0\uACB0\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}function Ee(h,$){let k=h.querySelector(".mon-link__trigger"),P=h.querySelector(".mon-link__popover"),V=h.querySelector(".mon-link__error");!k||!P||!V||(Oe(),P.hidden=!1,k.setAttribute("aria-expanded","true"),V.textContent=$,V.hidden=!1)}async function nt(h,$,k){let P=$.getAttribute("data-root-dir")||"",V=$.getAttribute("data-issue-id")||"";if(!(!V||!k||k===V))try{await C(h,{a:V,b:k},P),Oe()}catch(Y){Ee($,rt(Y))}}function K(h,$){let{root_dir:k,revision:P}=ze(h),V=h.getAttribute("data-issue-id")||"",Y=$.dataset.attemptId||h.getAttribute("data-attempt-id")||"",ie=$.classList;if(ie.contains("mon-link__trigger")){He($);return}if(ie.contains("mon-link__candidate")||ie.contains("mon-link__direct")){let ce=$.dataset.targetId||"";nt("dep-add",h,ce);return}if(ie.contains("mon-blocker__remove")){let ce=$.dataset.blockerId||"";nt("dep-remove",h,ce);return}if(ie.contains("mon-place__choice")){let ce=$.dataset.lane||"parallel",Be=Number($.dataset.placeIndex||0)||0;Oe(),O("worker-queue-place",{bead_id:V,...ce==="parallel"?{}:{lane:ce},index:Be},k,P);return}if(ie.contains("worker-card__place")){je($);return}if(ie.contains("mon-op--up")||ie.contains("mon-op--down")){let ce=Number(h.getAttribute("data-queue-index")||0)||0,Be=ie.contains("mon-op--up")?ce-1:ce+1;if(Be<0)return;O("worker-queue-reorder",{bead_id:V,.../^s[1-5]$/.test(h.dataset.lane||"")?{lane:h.dataset.lane}:{},to_index:Be},k,P);return}if(ie.contains("mon-op--remove")){O("worker-queue-remove",{bead_id:V},k,P);return}if(ie.contains("mon-op--pause")){C("worker-attempt-pause",{attempt_id:Y},k);return}if(ie.contains("mon-op--discard")){if(!d(Bn(V,"unmerged")))return;b({bead_id:V,...Y?{attempt_id:Y}:{},...$.dataset.operationId?{operation_id:$.dataset.operationId}:{}},k,P);return}if(ie.contains("mon-op--resume")){an().then(ce=>{if(ce!==null)return R("worker-attempt-resume",{attempt_id:Y,...ce!==""?{instructions:ce}:{}},k,P)});return}if(ie.contains("mon-op--dismiss")){O("worker-attempt-dismiss",{attempt_id:Y},k,P);return}if(ie.contains("worker-mini__merge")){let ce=M(k,V);ce?.mismatch&&ce.continuation===null?F(k,V,P,ce.mismatch):O("worker-merge-queue-add",{bead_id:V},k,P);return}if(ie.contains("worker-mini__merge-cancel")){O("worker-merge-queue-remove",{bead_id:V},k,P);return}if(ie.contains("worker-mini__discard")){let ce=$.dataset.discardMode==="merged"?"merged":"unmerged";if(!d(Bn(V,ce)))return;b({bead_id:V,...Y?{attempt_id:Y}:{},...$.dataset.operationId?{operation_id:$.dataset.operationId}:{}},k,P);return}if(ie.contains("worker-mini__revise-fix")){R("worker-revise-fix",{bead_id:V},k,P);return}ie.contains("worker-mini__revise-approve")&&O("worker-revise-approve",{bead_id:V},k,P)}function B(h){h.querySelector(".mon-link__list")?.replaceChildren();let k=h.querySelector(".mon-link__search");k&&(k.value="");let P=h.querySelector(".mon-link__direct");P&&(P.hidden=!0,P.dataset.targetId="",P.textContent="");let V=h.querySelector(".mon-link__empty");V&&(V.hidden=!0);let Y=h.querySelector(".mon-link__error");Y&&(Y.hidden=!0,Y.textContent="")}function ne(h,$){let k=h.querySelector(".mon-link__list");if(!k)return;let P=document.createDocumentFragment(),V=Tc(I).filter(Y=>Y.id!==$);for(let Y of V){let ie=document.createElement("button");ie.type="button",ie.className="mon-link__candidate",ie.dataset.targetId=Y.id,ie.dataset.search=`${Y.id} ${Y.title} ${Y.location}`.toLocaleLowerCase();let ce=document.createElement("strong");ce.textContent=Y.id;let Be=document.createElement("span");Be.textContent=Y.title;let fe=document.createElement("small");fe.textContent=Y.location,ie.append(ce,Be,fe),P.append(ie)}k.replaceChildren(P)}function Oe(){for(let h of Array.from(E.querySelectorAll(".mon-card-popover"))){let $=h;$.hidden=!0,$.classList.contains("mon-link__popover")&&B($)}for(let h of Array.from(E.querySelectorAll('[aria-expanded="true"]')))h.setAttribute("aria-expanded","false")}function je(h){let k=h.closest(".mon-place")?.querySelector(".mon-place__popover")||null;if(!k)return;let P=k.hidden;Oe(),P&&(k.hidden=!1,h.setAttribute("aria-expanded","true"))}function He(h){let k=h.closest(".mon-link")?.querySelector(".mon-link__popover")||null;if(!k)return;let P=k.hidden;if(Oe(),P){let V=h.closest(".mon-card");ne(k,V?.getAttribute("data-issue-id")||""),k.hidden=!1,h.setAttribute("aria-expanded","true");let Y=k.querySelector(".mon-link__search");Y&&(Te(Y),Y.focus())}}function Te(h){let $=h.closest(".mon-link__popover"),k=h.closest(".mon-card");if(!$||!k)return;let P=h.value.trim(),V=P.toLocaleLowerCase(),Y=0,ie=!1;for(let Se of Array.from($.querySelectorAll(".mon-link__candidate"))){let Pe=Se,et=Pe.dataset.targetId||"",U=V.length===0||(Pe.dataset.search||"").includes(V);Pe.hidden=!U,U&&(Y+=1),et.toLocaleLowerCase()===V&&(ie=!0)}let ce=$.querySelector(".mon-link__direct"),Be=k.getAttribute("data-issue-id")||"";if(ce){let Se=P.length>0&&!ie&&V!==Be.toLocaleLowerCase();ce.hidden=!Se,ce.dataset.targetId=Se?P:"",ce.textContent=Se?`\uC9C1\uC811 \uC785\uB825 \xB7 ${P}`:"",Se&&(Y+=1)}let fe=$.querySelector(".mon-link__empty");fe&&(fe.hidden=Y>0);let Ie=$.querySelector(".mon-link__error");Ie&&(Ie.hidden=!0,Ie.textContent="")}function ct(h){let $=h.target;$&&E.contains($)&&typeof $.closest=="function"&&$.closest(".mon-popover-owner")||Oe()}function Ze(h){if(h.key!=="Escape")return;let $=E.querySelector('[aria-expanded="true"]');Oe(),$?.focus()}function G(h){let $=D;D=!1;let k=h.target;if(!k||typeof k.closest!="function"||k.closest("dialog")||k.closest("a"))return;let P=k.closest(".mon-running-sort");if(P){h.preventDefault(),_=P.getAttribute("data-sort")==="repo"?"repo":"started",wm(_),Ae();return}let V=k.closest(".mon-auto-all");if(V){h.preventDefault(),z(V.getAttribute("data-on")==="true");return}if(k.closest(".mon-merge-all")){h.preventDefault(),re();return}let ie=k.closest(".mon-ctl--advance");if(ie){h.preventDefault();let{root_dir:Se,revision:Pe}=ze(ie);O("worker-automation-toggle",{on:ie.getAttribute("data-on")==="true"},Se,Pe);return}let ce=k.closest(".mon-ctl--merge-auto");if(ce){h.preventDefault();let{root_dir:Se,revision:Pe}=ze(ce);O("worker-merge-auto-toggle",{on:ce.getAttribute("data-on")==="true"},Se,Pe);return}let Be=k.closest(".mon-card");if(!Be)return;let fe=k.closest("button");if(fe){h.preventDefault(),K(Be,fe);return}let Ie=Be.getAttribute("data-issue-id");Ie&&!$&&(h.preventDefault(),he(Ie,Be.getAttribute("data-root-dir")||""))}function ee(h){let $=h.target;if(!$||typeof $.closest!="function")return;let k=$.closest(".mon-filter__blocked");if(k){y={show_blocked:k.checked},gm(y),Ae();return}let P=$.closest(".mon-done-range");if(P){f=Ut(P.value)?P.value:Nt,ym(f),Ae();return}let V=$.closest(".mon-slots__input");if(!V)return;let{root_dir:Y,revision:ie}=ze(V),ce=Number(V.value);if(!Number.isFinite(ce))return;let Be=Math.max(Hn,Math.floor(ce));O("worker-queue-set-slots",{slots:Be},Y,ie)}function Ne(h){let $=h.target;$?.classList.contains("mon-link__search")&&Te($)}e.addEventListener("click",G),e.addEventListener("change",ee),e.addEventListener("input",Ne),e.addEventListener("dragstart",Ke),e.addEventListener("dragover",Me),e.addEventListener("dragleave",We),e.addEventListener("drop",xe),e.addEventListener("dragend",le),document.addEventListener("click",ct),document.addEventListener("keydown",Ze),s&&typeof s.subscribe=="function"&&(te=s.subscribe(()=>{try{j.clear(),Ae()}catch{}}));function st(){Q!==null&&(clearInterval(Q),Q=null)}function pe(){ue!==null&&(clearTimeout(ue),ue=null)}return{load(){r("load"),Ae(),Q===null&&(Q=setInterval(()=>{try{if(E.querySelector(".mon-card-popover:not([hidden])"))return;Ae()}catch{}},km))},pause(){st()},clear(){st(),pe(),te&&(te(),te=null),e.removeEventListener("click",G),e.removeEventListener("change",ee),e.removeEventListener("input",Ne),e.removeEventListener("dragstart",Ke),e.removeEventListener("dragover",Me),e.removeEventListener("dragleave",We),e.removeEventListener("drop",xe),e.removeEventListener("dragend",le),document.removeEventListener("click",ct),document.removeEventListener("keydown",Ze),e.replaceChildren()}}}function ou(e,t,r){let n=mt("views:nav"),{global_element:s,repo_element:o}=e,a=null;function c(y){return A=>{A.preventDefault(),n("click tab %s",y),r.gotoView(y)}}function u(){let y=t.getState();return y.view==="worker"||y.view==="monitor"?y.view:"board"}function d(){let y=u();return i`
      <a
        href="#/monitor"
        class="ctl-tab ctl-tab--monitor ${y==="monitor"?"is-active":""}"
        @click=${c("monitor")}
      >
        <span class="ctl-tab__dots" aria-hidden="true"
          ><i></i><i></i><i></i><i></i
        ></span>
        Monitor
      </a>
    `}function f(){let y=u();return i`
      <div class="ctl-tabs">
        <a
          href="#/board"
          class="ctl-tab ${y==="board"?"is-active":""}"
          @click=${c("board")}
          >Board</a
        >
        <a
          href="#/worker"
          class="ctl-tab ${y==="worker"?"is-active":""}"
          @click=${c("worker")}
          >Worker</a
        >
      </div>
    `}function _(){s&&Ge(d(),s),o&&Ge(f(),o)}return _(),a=t.subscribe(()=>_()),{destroy(){a&&(a(),a=null),s&&Ge(i``,s),o&&Ge(i``,o)}}}var au=["bug","feature","task","epic","chore"];function iu(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var lu=["Critical","High","Medium","Low","Backlog"];function cu(e,t){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,e.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),a=r.querySelector("#new-priority"),c=r.querySelector("#new-labels"),u=r.querySelector("#new-description"),d=r.querySelector("#new-issue-error"),f=r.querySelector("#btn-cancel"),_=r.querySelector("#btn-create"),y=r.querySelector(".new-issue__close");function A(){o.replaceChildren();let R=document.createElement("option");R.value="",R.textContent="\u2014 Select \u2014",o.appendChild(R);for(let F of au){let b=document.createElement("option");b.value=F,b.textContent=iu(F),o.appendChild(b)}a.replaceChildren();for(let F=0;F<=4;F+=1){let b=document.createElement("option");b.value=String(F);let C=lu[F]||"Medium";b.textContent=`${F} \u2013 ${C}`,a.appendChild(b)}}A();function E(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function I(R){s.disabled=R,o.disabled=R,a.disabled=R,c.disabled=R,u.disabled=R,f.disabled=R,_.disabled=R,_.textContent=R?"Creating\u2026":"Create"}function j(){d.textContent=""}function te(R){d.textContent=R}function Q(){try{let R=window.localStorage.getItem("beads-ui.new.type");R?o.value=R:o.value="";let F=window.localStorage.getItem("beads-ui.new.priority");F&&/^\d$/.test(F)?a.value=F:a.value="2"}catch{o.value="",a.value="2"}}function O(){let R=o.value||"",F=a.value||"";R.length>0&&window.localStorage.setItem("beads-ui.new.type",R),F.length>0&&window.localStorage.setItem("beads-ui.new.priority",F)}async function M(){j();let R=String(s.value||"").trim();if(R.length===0){te("Title is required"),s.focus();return}let F=Number(a.value||"2");if(!(F>=0&&F<=4)){te("Priority must be 0..4"),a.focus();return}let b=String(o.value||""),C=String(u.value||""),z={title:R};b.length>0&&(z.type=b),String(F).length>0&&(z.priority=F),C.length>0&&(z.description=C),I(!0);try{await t("create-issue",z)}catch{I(!1),te("Failed to create issue");return}O(),I(!1),E()}return r.addEventListener("cancel",R=>{R.preventDefault(),E()}),y.addEventListener("click",()=>E()),f.addEventListener("click",()=>E()),r.addEventListener("keydown",R=>{R.key==="Enter"&&(R.ctrlKey||R.metaKey)&&(R.preventDefault(),M())}),n.addEventListener("submit",R=>{R.preventDefault(),M()}),{open(){n.reset(),j(),Q();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){E()}}}var Am=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function Sm(e,t){return To(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function uu(e,t,r){return i`
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
  `}var Em=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}],Ft="";function jt(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function fu(e,t){let{transport:r,policyStore:n,labelOptions:s}=t,o=t.notify||(h=>se(h,"error",4e3)),a=document.createElement("dialog");a.id="settings-dialog",a.className="settings-dialog",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","\uC124\uC815"),e.appendChild(a);let c="execution",u=!1,d="",f={},_={},y=[],A=!1,E=null,I={},j="",te="",Q=!1,O=!1,M=!1,R=null;function F(){let h=t.queueStore?.get();return jt(h)?h.runner_catalog:null}function b(){let h=t.queueStore?.get();return jt(h)&&jt(h.execution_defaults)?h.execution_defaults:null}function C(){let h=t.implPresetStore?.get();return jt(h)&&Array.isArray(h.presets)?h:null}async function z(){A=!0,Te();try{let h=await r("get-session-defaults",{});f=jt(h?.values)?{...h.values}:{},_={...f},y=Array.isArray(h?.warnings)?h.warnings:[]}catch(h){y=["kv_read_failed"],o(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${h instanceof Error?h.message:String(h)}`)}finally{A=!1,Te()}}async function re(){let h=nc(f,_);if(Object.keys(h).length!==0){try{let $=await r("set-session-defaults",{values:h});f=jt($?.values)?{...$.values}:{},_={...f},y=Array.isArray($?.warnings)?$.warnings:[]}catch($){o(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${$ instanceof Error?$.message:String($)}`)}Te()}}function L(h,$){$===Ft?delete _[h]:_[h]=$,Te(),re()}async function D(){let h=t.queueStore?.get();if(!jt(h))return;let $={orchestration_model:h.orchestration_model??null,orchestration_effort:h.orchestration_effort??null,orchestration_speed:h.orchestration_speed??null},k=sc($,{...$,...I});if(Object.keys(k).length!==0){try{let P=await r("worker-queue-set-orchestration-defaults",{expected_revision:h.revision,values:k});if(P&&P.applied===!1){o("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}I={}}catch(P){o(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${P instanceof Error?P.message:String(P)}`)}Te()}}function ue(h,$){I[h]=$===Ft?null:$,Te(),D()}async function _e(h){let $=t.queueStore?.get();if(!(!jt($)||h<1)){try{await r("worker-queue-set-slots",{expected_revision:$.revision,slots:h})}catch(k){o(`slots \uC800\uC7A5 \uC2E4\uD328: ${k instanceof Error?k.message:String(k)}`)}Te()}}function de(){let h={},$=ze();for(let k of ec){let P=Cr.includes(k)?$[k]:_[k];typeof P=="string"&&P.length>0&&(h[k]=P)}return h}async function Ue(){let h=C();if(!h)return;let $=de();if(Object.keys($).length===0){o("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let k=(h.presets||[]).find(V=>V.id===j),P=te.trim()||(k?k.name:"");if(!P){o("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let V=k?await r("impl-preset-update",{expected_revision:h.revision,id:k.id,name:P,settings:$}):await r("impl-preset-create",{expected_revision:h.revision,name:P,settings:$});if(V&&V.applied){if(te="",!k&&Array.isArray(V.presets)){let Y=V.presets.find(ie=>ie.name===P);j=Y?Y.id:j}Te()}else o("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Te()}catch(V){o(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${V instanceof Error?V.message:String(V)}`)}}async function Je(){let h=C();if(!(!h||j.length===0))try{let $=await r("impl-preset-delete",{expected_revision:h.revision,id:j});$&&$.applied?(j="",Te()):(o("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Te())}catch($){o(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${$ instanceof Error?$.message:String($)}`)}}async function Ke(){let h=C(),$=t.queueStore?.get();if(!(!h||!jt($)||j.length===0)){try{let k=await r("apply-impl-preset-global",{preset_id:j,expected_revision:h.revision,expected_queue_revision:$.revision});k&&k.applied?(f=jt(k.values)?{...k.values}:{},_={...f},y=Array.isArray(k.warnings)?k.warnings:[],jt(k.queue)&&(t.queueStore?.set?.(k.queue),I={}),k.queue_applied===!1&&o("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694")):k&&k.conflict&&o("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(k){o(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${k instanceof Error?k.message:String(k)}`)}Te()}}async function Me(){O=!0,M=!1,Te();try{let h=await r("get-worker-system-prompt",{});!h||typeof h!="object"||Array.isArray(h)?M=!0:R=h}catch{M=!0}finally{O=!1,Te()}}function We(){if(Q=!Q,Q&&!R){Me();return}Te()}function le(){let h=dn({loading:O,error:M});if(h)return h;if(!R)return"";let $=Array.isArray(R.variants)?R.variants:[];return i`<div class="settings-dialog__sp-body">
      ${R.target_base_placeholder?i`<div class="prompt-block__meta">
            \`${R.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${$.map(k=>i`<div class="settings-dialog__sp-variant" data-variant=${k.key}>
            <div class="settings-dialog__sp-cond">${k.condition}</div>
            ${vr(k.label,k.system_prompt)}
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
        aria-expanded=${Q?"true":"false"}
        @click=${We}
      >
        ${Q?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${Q?le():""}
    </section>`}function Re(h,$,k,P,V,Y,ie){let ce=V[h]??Ft,Be=aa(h,k,V,b(),F(),ie),fe=Be.options.find(Se=>Se.value===ce),Ie=ce===Ft?Be.full_value:fe?.full_value;return i`<select
        class=${ce===Ft?"settings-dialog__unset":""}
        data-key=${h}
        aria-label=${$}
        title=${Ie||""}
        ?disabled=${Y===!0||Be.disabled}
        .value=${zr(String(ce))}
        @change=${Se=>P(h,String(Se.target.value))}
      >
        <option value=${Ft} ?selected=${ce===Ft}>
          ${Be.unset_label}
        </option>
        ${Be.options.map(Se=>i`<option
              value=${Se.value}
              title=${Se.full_value||""}
              ?selected=${Se.value===ce}
            >
              ${Se.label}
            </option>`)}
      </select>
      ${ce===Ft?i`<span class="settings-dialog__source-badge">기본</span>`:""}`}function Ae(h,$,k,P,V,Y=!1,ie){return i`<div
      class=${`settings-dialog__row${Y?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${$}</span>
      <span class="settings-dialog__controls">
        ${Re(h,$,k,P,V,Y,ie)}
      </span>
    </div>`}function he(h,$,k,P,V){return i`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${$}-on)`}
        ></i>
        ${h}
      </span>
      <span class="settings-dialog__controls">
        ${Re(k,`${h} \uBAA8\uB378`,P,L,_,!1)}
        ${Re(V,`${h} effort`,Hs,L,_,!1)}
      </span>
    </div>`}function ze(){let h=t.queueStore?.get(),$={};for(let k of Cr)$[k]=Object.prototype.hasOwnProperty.call(I,k)?I[k]:jt(h)&&typeof h[k]=="string"?h[k]:null;return $}function rt(){let h=F(),$=_.impl_runtime,k=_.impl_model,P=C(),V=t.queueStore?.get(),Y=ze(),ie=Gs(h,E),ce=Fn(h,void 0).filter(Pe=>Pe!==tr),Be=pn(h,E||void 0,Y.orchestration_model||tr).filter(Pe=>Pe!==tr),fe=jt(V)&&typeof V.slots=="number"?V.slots:2,Ie=b()?.supported===!0,Se=aa("workflow_mode",Nn,_,b(),h);return i`
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
        ${y.length>0?i`<div class="settings-dialog__banner" role="alert">
              워크스페이스 기본값을 일부 읽지 못했습니다 —
              ${y.join(", ")}
            </div>`:""}
        ${Ie?"":i`<div
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
                  .value=${zr(j)}
                  @change=${Pe=>{j=String(Pe.target.value),Te()}}
                >
                  <option value="" ?selected=${j===""}>
                    실행 프리셋…
                  </option>
                  ${(P?.presets||[]).map(Pe=>i`<option
                        value=${Pe.id}
                        ?selected=${Pe.id===j}
                      >
                        ${Pe.name}
                      </option>`)}
                </select>
                <button
                  type="button"
                  class="settings-dialog__btn settings-dialog__btn--primary"
                  data-preset-apply-global
                  ?disabled=${j.length===0}
                  @click=${Ke}
                >
                  전역 기본값으로 적용
                </button>
                <input
                  type="text"
                  class="settings-dialog__preset-name"
                  placeholder=${j?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                  aria-label="프리셋 이름"
                  .value=${zr(te)}
                  @input=${Pe=>{te=String(Pe.target.value)}}
                />
                <button
                  type="button"
                  class="settings-dialog__btn"
                  data-preset-save
                  @click=${Ue}
                >
                  ${j?"\uAC31\uC2E0":"\uC800\uC7A5"}
                </button>
                <button
                  type="button"
                  class="settings-dialog__btn"
                  data-preset-delete
                  ?disabled=${j.length===0}
                  @click=${Je}
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
                      .value=${zr(E||Ft)}
                      @change=${Pe=>{let et=String(Pe.target.value);E=et===Ft?null:et,Te()}}
                    >
                      <option
                        value=${Ft}
                        ?selected=${!E}
                      >
                        전체
                      </option>
                      <option
                        value="claude"
                        ?selected=${E==="claude"}
                      >
                        claude
                      </option>
                      <option
                        value="codex"
                        ?selected=${E==="codex"}
                      >
                        codex
                      </option>
                    </select>
                    <span class="settings-dialog__hint"
                      >모델 목록을 좁힙니다</span
                    >
                  </span>
                </div>
                ${Ae("orchestration_model","\uBAA8\uB378",ie,ue,Y)}
                ${Ae("orchestration_effort","effort",Be,ue,Y)}
                ${Ae("orchestration_speed","\uC18D\uB3C4",Dn,ue,Y)}
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
                      ${_.workflow_mode?"":i`<span class="settings-dialog__source-badge"
                            >기본</span
                          >`}
                      ${Nn.map(Pe=>i`<button
                            type="button"
                            data-mode=${Pe}
                            aria-pressed=${String(_.workflow_mode===Pe)}
                            @click=${()=>L("workflow_mode",Pe)}
                          >
                            ${Pe}
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
                ${he("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",qn,"spec_review_effort")}
                ${he("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",zs,"plan_review_effort")}
                ${he("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",qn,"impl_review_effort")}
              </div>

              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">
                  구현
                  <span class="settings-dialog__hint"
                    >이슈 핀이 있으면 핀이 우선합니다</span
                  >
                </div>
                ${Ae("impl_runtime","\uC704\uC784 \uB300\uC0C1",Ws,L,_)}
                ${Ae("impl_model","\uBAA8\uB378",Fn(h,$),L,_)}
                ${Ae("impl_effort","effort",pn(h,$,k),L,_)}
                ${Ae("impl_speed","\uC18D\uB3C4",Dn,L,_)}
                ${Ae("quick_fix_impl_model","quick_fix \uAD6C\uD604 \uBAA8\uB378",ce,L,_,!1,{..._,...Y})}
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
                        @click=${()=>_e(fe-1)}
                      >
                        −
                      </button>
                      <span class="settings-dialog__stepper-value"
                        >${fe}</span
                      >
                      <button
                        type="button"
                        aria-label="slots 증가"
                        @click=${()=>_e(fe+1)}
                      >
                        +
                      </button>
                    </span>
                  </span>
                </div>
              </div>
              ${xe()}
            `}
      </section>
    `}function Ee(){let h=n.get();return i`
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
        ${h?i`
              ${uu(h,s(),ne)}
              ${du(h,d,{onDraft:$=>{d=$},onAdd:Oe,onRemove:je})}
              ${pu(h,He)}
            `:i`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function nt(h){let $=n.get();if($)try{let k=await r("display-policy-set",{expected_revision:$.revision,policy:h($)});K(k),k&&k.conflict&&k.policy&&(k=await r("display-policy-set",{expected_revision:k.policy.revision,policy:h(k.policy)}),K(k)),k&&k.conflict&&o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function K(h){h&&h.policy&&typeof h.policy=="object"&&n.set(h.policy)}function B(h){nt(h)}function ne(h){let $=n.get();if(!$)return;let k=!Tm(h,$);B(P=>Cm(h,P,k))}function Oe(){let h=d.trim();h.length!==0&&(d="",B($=>$.hidden_prefixes.includes(h)?{hidden_prefixes:$.hidden_prefixes}:{hidden_prefixes:[...$.hidden_prefixes,h]}),Te())}function je(h){B($=>({hidden_prefixes:$.hidden_prefixes.filter(k=>k!==h)}))}function He(h){let $=n.get();if(!$)return;let k=$.chips[h]===!1;B(()=>({chips:{[h]:k}}))}function Te(){Ge(i`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${Em.map(h=>i`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${h.id}
                  aria-selected=${String(c===h.id)}
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
            ${rt()} ${Ee()}
          </div>
        </div>
      `,a)}function ct(h){c=h,Te()}let Ze=()=>{u=!1,t.onOpenChange?.(!1)};a.addEventListener("close",Ze),a.addEventListener("cancel",Ze);let G=h=>{h.target===a&&pe()};a.addEventListener("click",G);let ee=null;n.subscribe&&(ee=n.subscribe(()=>{u&&Te()}));let Ne=null;t.implPresetStore?.subscribe&&(Ne=t.implPresetStore.subscribe(()=>{u&&Te()}));function st(h="execution"){u||(u=!0,t.onOpenChange?.(!0),c=h,d="",I={},Te(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),z())}function pe(){u&&(u=!1,t.onOpenChange?.(!1),typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:st,close:pe,sessionDraft:()=>({..._}),destroy(){u=!1,a.removeEventListener("close",Ze),a.removeEventListener("cancel",Ze),a.removeEventListener("click",G),ee&&(ee(),ee=null),Ne&&(Ne(),Ne=null),a.remove()}}}function Tm(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(r=>r.length>0&&e.startsWith(r))}function Cm(e,t,r){if(!r)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let n=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:n,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:n}}var Rm=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],_u="usage-meter-card",mu=600,Im=["token_expired","relogin_required"];function gu(e){return String(e).padStart(2,"0")}function Lm(e,t){let r=Math.max(0,Math.ceil((e-t)/6e4)),n=Math.floor(r/1440),s=Math.floor(r%1440/60),o=r%60;return n>0?`${n}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function Om(e,t=Date.now()){let r=Date.parse(e);if(!Number.isFinite(r))return"";let n=new Date(r),s=new Date(t),o=`${gu(n.getHours())}:${gu(n.getMinutes())}`,c=n.getFullYear()===s.getFullYear()&&n.getMonth()===s.getMonth()&&n.getDate()===s.getDate()?o:`${Rm[n.getMonth()]} ${n.getDate()} ${o}`;return`${Lm(r,t)} \xB7 ${c}`}function Mm(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function bu(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function hu(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var yu=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function wu(e){let t=[];for(let r of e){if(!r||typeof r!="object")continue;let n=r;typeof n.key!="string"||n.key.length===0||typeof n.pct!="number"||!Number.isFinite(n.pct)||t.push({key:n.key,pct:n.pct,resetsAt:typeof n.resetsAt=="string"?n.resetsAt:""})}return t}function Pm(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:wu(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function Dm(e){if(!e||typeof e!="object")return null;let t=e,r=[];if(Array.isArray(t.accounts))for(let s of t.accounts){let o=Pm(s);o&&r.push(o)}let n=t.available===!0&&Array.isArray(t.windows);return!n&&r.length===0?null:{available:n,windows:n?wu(t.windows):[],ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null,accounts:r}}function vu(e,t){return`${e}:${t}`}function ku(e){let t=!1,r=null,n=new Map,s=null,o=new Map,a=new Map,c=0;function u(){Ge(i``,e),e.hidden=!0}function d(L){r!==L&&(r===null&&(document.addEventListener("mousedown",_),document.addEventListener("keydown",y)),r=L)}function f(){r!==null&&(r=null,document.removeEventListener("mousedown",_),document.removeEventListener("keydown",y))}function _(L){let D=L.target;D&&e.contains(D)||(f(),C())}function y(L){L.key==="Escape"&&(f(),C())}function A(L){r===L?f():d(L),C()}function E(){f(),C()}async function I(L,D){if(n.has(L.key))return;let ue=vu(L.key,D);n.set(L.key,D),a.delete(ue),C();let _e=null;try{_e=await(await fetch(L.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:D})})).json()}catch{_e=null}if(t)return;if(n.delete(L.key),!_e||_e.ok!==!0){let Ue=_e&&typeof _e.error=="string"&&_e.error.length>0?_e.error:"network_error";a.set(ue,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${Ue}`}),C();return}let de=Array.isArray(_e.warnings)?_e.warnings.filter(Ue=>typeof Ue=="string"&&Ue.length>0):[];de.length>0&&a.set(ue,{kind:"warn",text:de.join(" \xB7 ")}),C(),await re()}function j(L,D,ue,_e){let de=hu(L.pct),Je=`resets ${Om(L.resetsAt,_e)}${D?` \xB7 ${ue}`:""}`;return i`<span
      class="usage-meter__window ${bu(de)}"
      style=${`--progress: ${de}%`}
      title=${Je}
    >
      <span class="usage-meter__label">${L.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${de}%</span>
    </span>`}function te(L,D,ue){let _e=D.available&&typeof D.ageSeconds=="number"&&D.ageSeconds>mu,de=_e&&typeof D.ageSeconds=="number"?`${Math.floor(D.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"",Ue=D.accounts.filter(We=>!We.active).length,Je=`usage-meter__group${_e?" usage-meter__group--stale":""}`,Ke=i`<span class="usage-meter__provider"
        >${L.label}</span
      >
      ${D.available?D.windows.map(We=>j(We,_e,de,ue)):i`<span class="usage-meter__empty">사용량 없음</span>`}
      ${Ue>0?i`<span class="usage-meter__badge">+${Ue}</span>`:""}`;if(D.accounts.length===0)return i`<span
        class=${Je}
        aria-label=${`${L.label} usage`}
        >${Ke}</span
      >`;let Me=r===L.key;return i`<button
      type="button"
      class=${`usage-meter__toggle ${Je}`}
      aria-label=${`${L.label} usage`}
      aria-expanded=${Me?"true":"false"}
      aria-controls=${_u}
      @click=${()=>A(L.key)}
    >
      ${Ke}
    </button>`}function Q(L,D){return i`<span class="usage-meter" aria-label="Usage">
      ${L.map(ue=>te(ue.provider,ue.snapshot,D))}
    </span>`}function O(L){let D=hu(L.pct);return i`<span
      class="usage-meter__account-window ${bu(D)}"
      style=${`--progress: ${D}%`}
    >
      <span class="usage-meter__account-key">${L.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${D}%</span>
    </span>`}function M(L,D){return Im.includes(D)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${L.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function R(L,D){let ue=D.status==="ok",_e=typeof D.ageSeconds=="number"&&D.ageSeconds>mu,de=a.get(vu(L.key,D.number)),Ue=n.get(L.key),Je=Ue!==void 0,Ke=Ue===D.number,Me=["usage-meter__account"];return D.active&&Me.push("usage-meter__account--active"),ue||Me.push("usage-meter__account--unavailable"),_e&&Me.push("usage-meter__account--stale"),i`<div class=${Me.join(" ")}>
      <div class="usage-meter__account-head">
        <span class="usage-meter__account-label" title=${D.email}
          >${D.alias===null?D.email:D.alias}</span
        >
        ${D.plan===null?"":i`<span class="usage-meter__account-tag">${D.plan}</span>`}
        ${D.active?i`<span
              class="usage-meter__account-tag usage-meter__account-tag--active"
              >active</span
            >`:""}
        ${D.ageSeconds===null?"":i`<span class="usage-meter__account-age"
              >${Mm(D.ageSeconds)}</span
            >`}
        ${D.active?"":i`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${Je}
              @click=${()=>{I(L,D.number)}}
            >
              ${Ke?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${ue?i`<div class="usage-meter__account-windows">
            ${D.windows.map(We=>O(We))}
          </div>`:i`<div class="usage-meter__account-status">
            ${M(L,D.status)}
          </div>`}
      ${de===void 0?"":i`<div
            class="usage-meter__account-message usage-meter__account-message--${de.kind}"
          >
            ${de.text}
          </div>`}
    </div>`}function F(L,D){let ue=D.accounts.filter(_e=>_e.active).length;return i`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${L.label} · 활성 ${ue} / 전체
        ${D.accounts.length}
      </h2>
      ${D.accounts.map(_e=>R(L,_e))}
    </section>`}function b(L){return i`<div
      class="usage-meter__card"
      id=${_u}
      role="dialog"
      aria-label=${`${L.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${F(L.provider,L.snapshot)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function C(){let L=[];for(let _e of yu){let de=o.get(_e.key);de&&L.push({provider:_e,snapshot:de})}if(L.length===0){f(),u();return}let D=L.find(_e=>_e.provider.key===r&&_e.snapshot.accounts.length>0);D||f();let ue=Date.now();Ge(i`${Q(L,ue)}
      ${D?i`<div
              class="usage-meter__scrim"
              aria-hidden="true"
              @mousedown=${E}
            ></div>
            ${b(D)}`:""}`,e),e.hidden=!1}async function z(L){try{let D=await fetch(L.endpoint);return D.ok?Dm(await D.json()):null}catch{return null}}async function re(){c+=1;let L=c,D=await Promise.all(yu.map(async ue=>({provider:ue,snapshot:await z(ue)})));if(!(t||L!==c)){for(let ue of D)ue.snapshot?o.set(ue.provider.key,ue.snapshot):o.delete(ue.provider.key);C()}}return u(),re(),s=setInterval(()=>{re()},6e4),{destroy(){t=!0,s!==null&&(clearInterval(s),s=null),f(),u()}}}function $u(e){let t=e.attempts?Object.values(e.attempts):[],r=new Map;for(let s of t)s&&r.set(s.bead_id,s.attempt_id);let n=new Map;for(let s of e.done||[])s&&typeof s.bead_id=="string"&&typeof s.added_at=="number"&&n.set(s.bead_id,s.added_at);return s=>{let o=r.get(s.bead_id)!==s.attempt_id,a=n.get(s.bead_id),c=typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at;return!o&&!c&&typeof s.dismissed_at!="number"}}var Nm="worker-ineligible";function Ta(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function xu(e){return Ta(e).includes(Nm)}var qm="worker-serial";function Ca(e){return Ta(e).includes(qm)}function Ra(e,t,r){if(typeof t!="string"||typeof r!="string")return[];let n=e?.runners;if(!n||!Object.hasOwn(n,t))return[];let s=n[t],o=s?.models;if(!o||!Object.hasOwn(o,r))return[];let a=o[r]?.efforts;return Array.isArray(a)?a.slice():Array.isArray(s.efforts)?s.efforts.slice():[]}var Fm=new Set(["done","failed","orphaned","stopped","discarded"]),jm={spec_missing:"\uC2A4\uD399 \uC5C6\uC74C",route:"route \uBBF8\uB2EC",spec_review:"\uC2A4\uD399 \uB9AC\uBDF0 \uC5C6\uC74C",spec_conflict:"\uC2A4\uD399 \uCDA9\uB3CC",phase_child:"phase child",worker_ineligible:"worker \uC81C\uC678"},Bm={running:"\uC2E4\uD589 \uC911",success:"\uC131\uACF5",failure:"\uC2E4\uD328",cancelled:"\uCDE8\uC18C",interrupted:"\uC911\uB2E8"},Um={running:"running",success:"done",failure:"failed",cancelled:"stopped",interrupted:"orphaned"};function Ia(e){return{runner:e.runner||void 0,model:e.model||void 0,effort:e.effort||void 0,status:Um[e.outcome]||(typeof e.job_id=="string"?"running":void 0),session_id:e.session_id||void 0}}function Au(e,t){let{queueStore:r,analysisStore:n,transport:s,getWorkspacePath:o,onOpenTranscript:a}=t,c=document.createElement("dialog");c.id="worker-parallel-analysis-dialog",c.className="pa",c.setAttribute("role","dialog"),c.setAttribute("aria-modal","true"),e.appendChild(c);let u=new Map,d=new Map,f=!1,_=null,y=null,A=null,E=new Set,I=!1,j=0,te=null,Q=new Set;function O(){return r&&r.get()||{revision:0,queue:[],serial_lanes:[],serial_lane_count:0,attempts:{},pr_wait:[]}}function M(){return n&&n.get()||{settings:{revision:0,runner:null,model:null,effort:null},job:null,runs:[],last_good:null}}function R(){return o&&o()||""}async function F(){if(!s)return;let w=++j;I=!0,A=null,E.clear(),fe();try{let T=await s("worker-parallel-analysis-targets",{root_dir:R()});if(w!==j||!Ie)return;let N=Array.isArray(T?.qualified)?T.qualified:[],Z=Array.isArray(T?.excluded)?T.excluded:[];A={qualified:N,excluded:Z};for(let we of N)we&&typeof we.id=="string"&&E.add(we.id)}catch{w===j&&Ie&&(A={qualified:[],excluded:[]},se("\uBD84\uC11D \uB300\uC0C1\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800))}finally{w===j&&(I=!1,Ie&&fe())}}function b(w){return Array.isArray(w.runs)?w.runs:[]}function C(){let w=O(),T=new Set;for(let N of Object.values(w.attempts||{})){let Z=N;Z&&typeof Z.bead_id=="string"&&!Fm.has(Z.status)&&T.add(Z.bead_id)}for(let N of Array.isArray(w.pr_wait)?w.pr_wait:[])N&&typeof N.bead_id=="string"&&T.add(N.bead_id);for(let N of Object.values(w.discard_operations||{})){let Z=N;Z&&Z.phase!=="done"&&typeof Z.bead_id=="string"&&T.add(Z.bead_id)}return T}function z(w){return w.filter(T=>re(T)===null)}function re(w){let T=O();for(let N of Array.isArray(T.serial_lanes)?T.serial_lanes:[])if(Array.isArray(N?.entries)&&N.entries.some(Z=>Z.bead_id===w))return N.id;return(Array.isArray(T.queue)?T.queue:[]).some(N=>N.bead_id===w)?"parallel":null}function L(w,T){let N=u.get(w);return N||[...T.order]}function D(w){if(w.length<2)return!1;let T=re(w[0]);if(!T||T==="parallel")return!1;let N=O(),Z=(Array.isArray(N.serial_lanes)?N.serial_lanes:[]).find(X=>X.id===T)?.entries.map(X=>X.bead_id);if(!Array.isArray(Z))return!1;let we=w.map(X=>Z.indexOf(X));return we.every(X=>X>=0)&&we.every((X,$e)=>$e===0||X>we[$e-1])}function ue(){let w=O(),T=Array.isArray(w.serial_lanes)?w.serial_lanes:[],N=T.find(Z=>Array.isArray(Z.entries)&&Z.entries.length===0);return N?N.id:T[0]?.id||"s1"}function _e(w){let T=O().bead_titles||{};return typeof T[w]=="string"?T[w]:w}async function de(w,T){if(!s||f)return null;f=!0,fe();try{return await s(w,T)}finally{f=!1,fe()}}async function Ue(w){n?.setPending?.(!0);try{let T=await de("worker-parallel-analysis-start",{force:w,target_ids:Array.from(E)});T&&T.applied===!1&&T.reason&&(T.reason==="target_not_qualified"&&Array.isArray(T.detail)?se(`\uBD84\uC11D \uB300\uC0C1 \uC790\uACA9 \uBCC0\uACBD: ${T.detail.join(", ")}`,"error",3200):se(`\uBD84\uC11D \uC2E4\uD328: ${T.reason}`,"error",2800))}finally{n?.setPending?.(!1)}}async function Je(){let w=M().job;!s||!w||await s("worker-parallel-analysis-cancel",{job_id:w.job_id})}async function Ke(w){if(!(!s||Q.has(w))){Q.add(w),fe();try{let T=await s("worker-parallel-analysis-prompt",{root_dir:R(),run_id:w});if(!Ie)return;if(T?.ok===!0&&typeof T.prompt=="string"){te={run_id:w,prompt:T.prompt};return}se(T?.reason==="not_found"?"\uC800\uC7A5\uB41C \uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800)}finally{Q.delete(w),fe()}}}function Me(){te=null,fe()}async function We(){if(!te)return;let w=await Zt(te.prompt);se(w?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",w?"success":"error",1400)}function le(w,T){a&&a(w,Ia(T))}function xe(){return O().runner_catalog}function Re(w){return Object.keys(xe()?.runners?.[w]?.models||{})}function Ae(w){let T=Re(w),N=xe()?.runners?.[w]?.default_model;return typeof N=="string"&&T.includes(N)?N:T[0]||""}function he(){let w=M().settings,T=_||w.runner||"claude",N=Re(T),Z=_?Ae(T):w.model||N[0]||"",we=Ra(xe(),T,Z),X=w.effort||"",$e=we.includes(X)?X:we[0]||"";return{runner:T,model:Z,effort:$e,models:N,efforts:we}}async function ze(w){let T=M().settings,N=await de("worker-parallel-analysis-settings-update",{expected_revision:T.revision,runner:w.runner,model:w.model,effort:w.effort});(!N||N.applied!==!0)&&(_=null,fe(),N&&N.reason&&se(`\uBD84\uC11D \uC124\uC815 \uAC70\uBD80: ${N.reason}`,"error",2800))}function rt(w){_=w,fe();let T=he();ze({runner:w,model:T.model,effort:T.effort})}function Ee(w){let T=he(),N=Ra(xe(),T.runner,w);ze({runner:T.runner,model:w,effort:N.includes(T.effort)?T.effort:N[0]||""})}function nt(w){let T=he();ze({runner:T.runner,model:T.model,effort:w})}async function K(w,T){if(!s||f)return;let N=L(w,T),Z=M();if(N.length<2||!Z.last_good){se("\uC81C\uCD9C\uD558\uB824\uBA74 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4","warning");return}let we=d.get(w)||ue(),X=()=>({snapshot_digest:Z.last_good.identity_digest,group_index:w,lane:we,ordered_bead_ids:N,expected_revision:O().revision});f=!0,fe();try{let $e=await s("worker-parallel-analysis-submit",X());$e&&$e.queue&&r&&r.set($e.queue),$e&&$e.applied!==!0&&$e.conflict===!0&&($e=await s("worker-parallel-analysis-submit",X()),$e&&$e.queue&&r&&r.set($e.queue)),$e&&$e.applied===!0?(u.delete(w),se(`\uC9C1\uB82C \uB808\uC778 ${we}\uC5D0 ${N.length}\uAC1C \uBC30\uCE58`,"success")):se(`\uC81C\uCD9C \uAC70\uBD80: ${$e?.reason||"conflict"} (\uD050 \uBB34\uBCC0\uACBD)`,"error",2800)}finally{f=!1,fe()}}function B(w,T,N){u.set(w,L(w,T).filter(Z=>Z!==N)),fe()}function ne(w){u.delete(w),fe()}function Oe(w,T,N,Z){let we=[...L(w,T)],X=we.indexOf(N),$e=X+Z;X<0||$e<0||$e>=we.length||(we.splice($e,0,...we.splice(X,1)),u.set(w,we),fe())}function je(){let w=M().settings,T=Object.keys(xe()?.runners||{}),N=he();return i`<div class="pa-settings">
      <label class="pa-settings__field"
        >러너
        <select
          class="pa-settings__runner"
          aria-label="분석 러너"
          @change=${Z=>rt(Z.target.value)}
        >
          ${T.map(Z=>i`<option
                value=${Z}
                ?selected=${N.runner===Z}
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
          @change=${Z=>Ee(Z.target.value)}
        >
          ${N.models.map(Z=>i`<option
                value=${Z}
                ?selected=${N.model===Z}
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
          @change=${Z=>nt(Z.target.value)}
        >
          ${N.efforts.map(Z=>i`<option
                value=${Z}
                ?selected=${N.effort===Z}
              >
                ${Z}
              </option>`)}
        </select>
      </label>
      ${He(w)}
    </div>`}function He(w){return!ct(w)||Te(w)?i`<span class="pa-settings__unset">분석 모델 설정 필요</span>`:w.compatible===!1?i`<span class="pa-settings__incompatible"
        >설정 비호환 — 저장된 ${w.runner}/${w.model} · effort
        ${w.effort} 을(를) 카탈로그가 더는 제공하지 않습니다</span
      >`:w.is_default===!0?i`<span class="pa-settings__default">기본값</span>`:""}function Te(w){return w.is_default===!0&&w.compatible===!1}function ct(w){return!!(w.runner&&w.model&&w.effort)}function Ze(w){return ct(w)&&w.compatible!==!1}function G(w){let T=Math.max(0,Math.floor(w/1e3)),N=Math.floor(T/60),Z=T%60;return`${N}:${String(Z).padStart(2,"0")}`}function ee(w){let T=w.job;if(T){let N=typeof T.started_at=="number"?T.started_at:0,Z=`${T.runner||"?"}/${T.model||"?"}`,we=N?` \xB7 \uACBD\uACFC ${G(Date.now()-N)}`:"",X=typeof T.session_id=="string"?T.session_id:"",$e=b(w).find(Le=>Le.run_id===T.job_id);return i`<span class="pa-meta__progress">
        <span
          >분석 중 — ${Z} · effort ${T.effort||"?"}${we}</span
        >
        ${X?i`<code class="pa-session-id" title=${X}
              >${X.slice(0,8)}</code
            >`:""}
        <button
          type="button"
          class="pa-monitor"
          @click=${()=>le(T.job_id,$e||T)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-prompt-open"
          ?disabled=${$e?.prompt_saved!==!0||Q.has(T.job_id)}
          @click=${()=>{Ke(T.job_id)}}
        >
          프롬프트
        </button>
      </span>`}return Ne()?i`<span class="pa-meta__progress"
          >준비 중 — 대상과 아티팩트 수집 중</span
        >`:""}function Ne(){return n?.isPending?.()===!0}function st(w){let T=!!w.job,N=Ze(w.settings),Z=A!==null&&E.size===0,we=T||f||Ne()||I;return i`<div class="pa-meta">
      ${w.last_good?i`<span class="pa-meta__at"
            >분석 ${new Date(w.last_good.at||0).toLocaleString()}</span
          >`:i`<span class="pa-meta__at">분석 결과 없음</span>`}
      ${ee(w)}
      <button
        type="button"
        class="pa-run"
        ?disabled=${!N||we||Z}
        @click=${()=>{Ue(!1)}}
      >
        ✳ 분석
      </button>
      <button
        type="button"
        class="pa-rerun"
        ?disabled=${!N||we||Z}
        @click=${()=>{Ue(!0)}}
      >
        재분석
      </button>
      <button
        type="button"
        class="pa-cancel"
        ?disabled=${!T}
        @click=${()=>{Je()}}
      >
        취소
      </button>
    </div>`}function pe(w){return typeof w=="string"&&w.length>0?w:"\uBBF8\uBC30\uCE58"}function h(w,T){T?E.add(w):E.delete(w),fe()}function $(w){let T=Array.isArray(w.scope)?w.scope:[],N=Array.isArray(w.overlaps)?w.overlaps:[];return T.length===0&&N.length===0?i``:i`<span class="pa-target__signals">
      ${T.length>0?i`<details class="pa-target__scope" title=${T.join(`
`)}>
            <summary>scope ${T.length}</summary>
            <ul>
              ${T.map(Z=>i`<li><code>${Z}</code></li>`)}
            </ul>
          </details>`:""}
      ${N.length>0?i`<span
            class="pa-target__overlaps"
            title=${`\uACB9\uCE68: ${N.join(", ")}`}
            >겹침 ${N.join(", ")}</span
          >`:""}
    </span>`}function k(){let w=A?.qualified||[],T=A?.excluded||[];return i`<section class="pa-targets">
      <header class="pa-targets__header">
        <strong>분석 대상</strong>
        <span class="pa-targets__summary"
          >${I?"\uC870\uD68C \uC911\u2026":`\uC790\uACA9 ${w.length} \xB7 \uC81C\uC678 ${T.length}`}</span
        >
      </header>
      ${A&&w.length>0?i`<ul class="pa-targets__list">
            ${w.map(N=>i`<li class="pa-target">
                  <label class="pa-target__label">
                    <input
                      type="checkbox"
                      class="pa-target__check"
                      data-target-id=${N.id}
                      .checked=${E.has(N.id)}
                      @change=${Z=>h(N.id,Z.target.checked)}
                    />
                    <span class="pa-target__title">${N.title}</span>
                  </label>
                  <span class="pa-target__meta">
                    ${$(N)}
                    <span class="pa-target__route">${N.route}</span>
                    <span class="pa-target__lane"
                      >${pe(N.lane)}</span
                    >
                  </span>
                </li>`)}
          </ul>`:A&&w.length===0?i`<p class="pa-empty">자격 있는 분석 대상이 없습니다</p>`:""}
      ${A&&T.length>0?i`<details class="pa-targets__excluded">
            <summary>제외 대상 ${T.length}</summary>
            <ul class="pa-targets__list">
              ${T.map(N=>i`<li class="pa-target pa-target--excluded">
                    <label class="pa-target__label">
                      <input type="checkbox" disabled />
                      <span class="pa-target__title">${N.title}</span>
                    </label>
                    <span class="pa-target__meta">
                      <span class="pa-target__reason"
                        >${jm[N.reason]||N.reason}</span
                      >
                      <span class="pa-target__lane"
                        >${pe(N.lane)}</span
                      >
                    </span>
                  </li>`)}
            </ul>
          </details>`:""}
    </section>`}function P(w){let T=typeof w.session_id=="string"&&w.session_id.length>0,N=T?w.session_id:"";return i`<li class="pa-run-row">
      <span class="pa-run-row__status pa-run-row__status--${w.outcome}"
        >${Bm[w.outcome]||w.outcome}</span
      >
      <time class="pa-run-row__time"
        >${new Date(w.started_at||0).toLocaleString()}</time
      >
      <span class="pa-run-row__identity"
        >${w.runner||"?"} / ${w.model||"?"} / ${w.effort||"?"}</span
      >
      ${T?i`<code class="pa-session-id" title=${N}
            >${N.slice(0,8)}</code
          >`:i`<span class="pa-run-row__no-session">세션 없음</span>`}
      ${w.outcome==="failure"&&w.reason?i`<span class="pa-run-row__reason">${w.reason}</span>`:""}
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
          ?disabled=${w.prompt_saved!==!0||Q.has(w.run_id)}
          @click=${()=>{Ke(w.run_id)}}
        >
          프롬프트
        </button>
      </span>
    </li>`}function V(w){return i`<section class="pa-runs">
      <header class="pa-runs__header"><strong>최근 실행</strong></header>
      ${w.length>0?i`<ul class="pa-runs__list">
            ${w.map(T=>P(T))}
          </ul>`:i`<p class="pa-empty">실행 이력 없음</p>`}
    </section>`}function Y(){return te?i`<div
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
            <code>${te.run_id}</code>
          </div>
          <div class="pa-prompt-popup__actions">
            <button type="button" @click=${()=>{We()}}>
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
${te.prompt}</pre
        >
      </section>
    </div>`:""}function ie(w,T){let N=L(w,T),Z=C(),we=N.filter(Xe=>Z.has(Xe)),X=z(N),$e=D(N),Le=Array.isArray(O().serial_lanes)?O().serial_lanes:[],ht=d.get(w)||ue(),yt=T.eligible!==!0||N.length<2||we.length>0||X.length>0||$e||f;return i`<section class="pa-group" data-group-index=${String(w)}>
      <header class="pa-group__head">
        <span class="pa-group__confidence">${T.confidence}</span>
        ${T.categories.map(Xe=>i`<span class="pa-group__category">${Xe}</span>`)}
        ${$e?i`<span class="pa-group__applied">✓ 이미 반영됨</span>`:""}
        ${T.eligible===!0?"":i`<span class="pa-group__weak">근거 부족 — 제출 불가</span>`}
        ${X.length>0?i`<span class="pa-group__stale"
              >stale — ${X.join(", ")} 대기 영역 이탈</span
            >`:""}
      </header>
      <p class="pa-group__reason">${T.reason}</p>
      <ol class="pa-group__members">
        ${N.map((Xe,Et)=>i`<li class="pa-member" data-bead-id=${Xe}>
              <span class="pa-member__seq">${Et+1}</span>
              <span class="pa-member__title">${_e(Xe)}</span>
              ${Z.has(Xe)?i`<span class="pa-member__active">실행 중</span>`:""}
              <button
                type="button"
                class="pa-member__up"
                data-bead-id=${Xe}
                ?disabled=${Et===0}
                aria-label=${`${Xe} \uC704\uB85C`}
                @click=${()=>Oe(w,T,Xe,-1)}
              >
                ↑
              </button>
              <button
                type="button"
                class="pa-member__down"
                data-bead-id=${Xe}
                ?disabled=${Et===N.length-1}
                aria-label=${`${Xe} \uC544\uB798\uB85C`}
                @click=${()=>Oe(w,T,Xe,1)}
              >
                ↓
              </button>
              <button
                type="button"
                class="pa-member__exclude"
                data-bead-id=${Xe}
                aria-label=${`${Xe} \uC81C\uC678`}
                @click=${()=>B(w,T,Xe)}
              >
                ✕
              </button>
            </li>`)}
      </ol>
      <ul class="pa-group__evidence">
        ${T.evidence.map(Xe=>i`<li class="pa-evidence">
              <code>${Xe.path}</code>
              <span class="pa-evidence__locator">${Xe.locator}</span>
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
            @change=${Xe=>{d.set(w,Xe.target.value),fe()}}
          >
            ${Le.map((Xe,Et)=>i`<option
                  value=${Xe.id}
                  ?selected=${ht===Xe.id}
                >
                  직렬 ${Et+1}
                </option>`)}
          </select>
        </label>
        <button
          type="button"
          class="pa-group__submit"
          ?disabled=${yt}
          @click=${()=>{K(w,T)}}
        >
          제출
        </button>
      </footer>
    </section>`}function ce(w){let T=Array.isArray(w.issues)?w.issues:[],N=T.filter(we=>we.verdict==="parallel_ok").length,Z=T.filter(we=>we.verdict==="uncertain").length;return i`<div class="pa-summary">
      <span>parallel_ok ${N}</span>
      <span>uncertain ${Z}</span>
    </div>`}function Be(){let w=Ie&&!!M().job;if(w&&y===null){y=setInterval(()=>fe(),1e3);return}!w&&y!==null&&(clearInterval(y),y=null)}function fe(){let w=M();_&&w.settings.runner===_&&(_=null);let T=w.last_good?.result;Be(),Ge(i`
        <div class="pa__container">
          <header class="pa__header">
            <div class="pa__title">병렬성 분석</div>
            <button
              type="button"
              class="pa__close"
              aria-label="닫기"
              @click=${me}
            >
              ×
            </button>
          </header>
          <div class="pa__body">
            ${je()} ${st(w)} ${k()}
            ${T?i`${T.groups.map((N,Z)=>ie(Z,N))}
                ${T.groups.length===0?i`<p class="pa-empty">직렬 권장 그룹 없음</p>`:""}
                ${ce(T)}`:i`<p class="pa-empty">
                  아직 분석 결과가 없습니다 — [✳ 분석]을 눌러 시작하세요
                </p>`}
            ${V(b(w))}
          </div>
        </div>
        ${Y()}
      `,c)}let Ie=!1,Se=()=>{Ie=!1,te=null,j+=1,Be()},Pe=w=>{w.target===w.currentTarget&&me()};c.addEventListener("close",Se),c.addEventListener("cancel",Se),c.addEventListener("click",Pe);let et=null;r&&r.subscribe&&(et=r.subscribe(()=>{Ie&&fe()}));let U=null;n&&n.subscribe&&(U=n.subscribe(()=>{Ie&&fe()}));function J(){Ie||(Ie=!0,fe(),F(),typeof c.showModal=="function"?c.showModal():c.setAttribute("open",""))}function me(){Ie&&(Ie=!1,te=null,j+=1,Be(),typeof c.close=="function"?c.close():c.removeAttribute("open"))}return{open:J,close:me,destroy(){Ie=!1,y!==null&&(clearInterval(y),y=null),c.removeEventListener("close",Se),c.removeEventListener("cancel",Se),c.removeEventListener("click",Pe),et&&(et(),et=null),U&&(U(),U=null),c.remove()}}}var Su=new Set(["sh","bash","zsh","dash","ksh"]),Eu=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function Tu(e){let t=e.split("/");return t[t.length-1]||""}function Wm(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let r=t.slice(2).trim().split(/\s+/).filter(Boolean);if(r.length===0)return!1;let n=Tu(r[0]);if(n!=="env")return Su.has(n);let s=r.slice(1).find(o=>!o.startsWith("-")&&!o.includes("="));return s!==void 0&&Su.has(Tu(s))}function zm(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function Hm(e){let t=[],r=0;Eu.lastIndex=0;for(let n of e.matchAll(Eu)){let s=n.index;s>r&&t.push({text:e.slice(r,s),kind:"plain"}),t.push({text:n[0],kind:zm(n[0])}),r=s+n[0].length}return r<e.length&&t.push({text:e.slice(r),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function Gm(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function Cu(e){let t=e.getWorkspacePath,r=e.fetchImpl||globalThis.fetch?.bind(globalThis),n=document.createElement("div");n.className="repo-ops-script-viewer-root",document.body.appendChild(n);let s=null,o="loading",a="",c="",u=0,d=null,f=!1;function _(R,F){return F?Hm(R).map(b=>b.kind==="plain"?b.text:i`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${b.kind}"
            >${b.text}</span
          >`):R}function y(){if(!s)return i``;let R=o==="ready"&&Wm(a),F=o==="ready"?a.split(`
`):[];return i`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${s.path}`}
    >
      <div
        class="repo-ops-script-viewer__backdrop"
        @click=${()=>O()}
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
              @click=${()=>{E()}}
            >
              복사
            </button>
            <button
              type="button"
              class="repo-ops-script-viewer__close"
              aria-label="스크립트 팝업 닫기"
              @click=${()=>O()}
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
                  ${F.map((b,C)=>i`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${C+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${_(b,R)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function A(){Ge(y(),n)}async function E(){if(o!=="ready")return;let R=await Zt(a);se(R?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",R?"success":"error")}function I(R){R.key==="Escape"&&s&&(R.preventDefault(),O())}function j(){f||(document.addEventListener("keydown",I),f=!0)}function te(){f&&(document.removeEventListener("keydown",I),f=!1)}async function Q(R,F=null){let b=++u;j(),s={...R},d=F||(document.activeElement instanceof HTMLElement?document.activeElement:null),o="loading",a="",c="",A(),n.querySelector(".repo-ops-script-viewer__close")?.focus();let z=t?t():"";if(!z){o="error",c="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",A();return}if(!r){o="error",c="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",A();return}let re="/api/repo-ops-script?workspace="+encodeURIComponent(z)+"&lane="+encodeURIComponent(R.lane)+"&base_sha="+encodeURIComponent(R.base_sha);try{let L=await r(re),D=await L.json().catch(()=>({}));if(b!==u)return;if((t?t():"")!==z){O();return}if(!L.ok||!D||D.ok!==!0){o="error",c=Gm(D&&typeof D.error=="string"?D.error:""),A();return}s={lane:D.lane,base_sha:D.base_sha,path:D.path,base_ref:D.base_ref},a=String(D.content),o="ready",A()}catch{if(b!==u)return;o="error",c="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",A()}}function O(){u+=1,te(),s=null,a="",A();let R=d;d=null,R?.isConnected&&R.focus()}function M(){O(),n.remove()}return{open:Q,close:O,destroy:M}}function Ru(e){let t=e.queueStore,r=e.transport,n=e.onChanged||(()=>{}),s=e.onOpenScript;function o(){return t&&t.get()||{}}function a(){let b=o();return typeof b.revision=="number"?b.revision:0}function c(b){t&&b&&b.queue&&typeof b.queue=="object"&&t.set(b.queue)}function u(){let b=o().workspace_info;return b&&typeof b=="object"?b:{}}function d(b,C){return i`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${b}"
      >${C}</span
    >`}function f(b){if(typeof b!="number"||!Number.isFinite(b))return"";let C=b/6e4;return Number.isInteger(C)?`timeout ${C}\uBD84`:`timeout ${Math.round(b/1e3)}\uCD08`}function _(b){let C=f(b);return C?d("config",C):""}function y(b,C,z){return i`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${z.script}
      @click=${re=>{s&&s({lane:b,base_sha:C.base_sha,path:z.script,base_ref:C.base_ref},re.currentTarget)}}
    ></button>`}function A(){let b=o().repo_ops_opt_out;return{verify:b?.verify===!0,deploy:b?.deploy===!0}}function E(b,C){return i`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!C}
        @change=${z=>{Q(b,!z.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function I(b){let C=typeof b.base_sha=="string"?b.base_sha:"",z=`${b.source_path||"repo-ops/config.toml"} @ ${b.base_ref||"?"}${C?`@${C.slice(0,7)}`:""}`,re=A(),L=!!b.verify&&re.verify,D=!!b.deploy&&re.deploy;return i`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          >${b.verify?i`${y("verify",b,b.verify)}
              ${_(b.verify.timeout_ms)}
              ${L?d("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:i`선언 없음${d("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${L?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":b.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${b.verify?E("verify",re.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${D?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${b.deploy?i`${y("deploy",b,b.deploy)}
              ${_(b.deploy.timeout_ms)}
              ${D?d("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:i`선언 없음${d("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${D?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":b.deploy?i`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${b.deploy?E("deploy",re.deploy):""}
      </div>
    </section>`}function j(b){let C=b.repo_ops&&typeof b.repo_ops=="object"?b.repo_ops:null;return C&&(C.status==="resolved"||C.status==="absent")?I(C):C&&(C.status==="pending"||C.status==="error")?i`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${C.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":i`선언 읽기
              실패${C.error_code?i` — <code>${C.error_code}</code>`:""}`}
        </div>
      </section>`:i`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function te(b){if(!r)return;let C=await r("worker-auto-repair-toggle",{on:b,expected_revision:a()});if(c(C),C&&C.conflict){let z=await r("worker-auto-repair-toggle",{on:b,expected_revision:a()});c(z)}n()}async function Q(b,C){if(!r)return;let z=await r("worker-repo-ops-opt-out-toggle",{kind:b,opted_out:C,expected_revision:a()});if(c(z),z&&z.conflict){let re=await r("worker-repo-ops-opt-out-toggle",{kind:b,opted_out:C,expected_revision:a()});c(re)}n()}let O={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function M(b,C,z){return i`<div class="worker-repo-ops__policy-group" data-policy=${z}>
      <div class="worker-repo-ops__policy-label">${b}</div>
      <ul class="worker-repo-ops__policy-list">
        ${C.map(re=>i`<li data-token=${re}>
              ${O[re]||re}
            </li>`)}
      </ul>
    </div>`}function R(b){return i`<div
      class="worker-repo-ops__policy-group"
      data-policy="resolution-ladder"
    >
      <div class="worker-repo-ops__policy-label">해결 사다리</div>
      <ol class="worker-repo-ops__policy-list">
        ${b.map(C=>{let z=[O[C.trigger]||C.trigger];return Number.isInteger(C.attempts_per_operation_attempt)?z.push(`operation\uB2F9 ${C.attempts_per_operation_attempt}\uD68C`):Number.isInteger(C.attempts)?z.push(`${O[C.budget]||C.budget} ${C.attempts}\uD68C`):Number.isInteger(C.sessions_per_user_action)&&z.push(`${C.sessions_per_user_action}\uD68C`,O[C.user_actions]||C.user_actions),C.applies_when&&z.push(O[C.applies_when]||C.applies_when),i`<li data-token=${C.id}>
            <strong>${O[C.id]||C.id}</strong>
            <span>${z.filter(Boolean).join(" \xB7 ")}</span>
          </li>`})}
      </ol>
    </div>`}function F(){let b=o(),C=b.auto_repair!==!1,z=b.repo_operation_policy&&typeof b.repo_operation_policy=="object"?b.repo_operation_policy:null,re=Array.isArray(b.repo_operations)?b.repo_operations:[],L=re.find(de=>de.state==="repairing"),D=re.filter(de=>de.state==="failed"||de.state==="repairing"),ue=D.length?Math.min(...D.map(de=>typeof de.repair?.remaining=="number"?de.repair.remaining:0)):z?.auto_repair?.resolution_ladder?.find(de=>de.id==="auto_repair_session")?.attempts??1,_e=Array.isArray(z?.auto_repair?.resolution_ladder)?z.auto_repair.resolution_ladder:[];return i`<section
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
          @change=${de=>{te(de.target.checked)}}
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
      ${z?i`<details
            class="worker-repo-ops__policy"
            data-seam="policy-lists"
          >
            <summary>
              Worker 자동 처리 기준
              <span class="worker-repo-ops__policy-count"
                >자동 ${(z.worker_automatic||[]).length} · 해결 사다리
                ${_e.length} · 금지
                ${(z.never_automatic||[]).length}</span
              >
            </summary>
            ${M("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",z.worker_automatic||[],"worker-automatic")}
            ${z.supported===!1||z.schema_version!==2?i`<div
                  class="worker-repo-ops__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uD574\uACB0\uC774 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${z.schema_version})`}
                </div>`:R(_e)}
            ${M("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",z.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}return{template(){return i`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언 · 자동 해결
        </summary>
        ${j(u())} ${F()}
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
  </section>`}function Nu(e,t={}){let r=null;function n(){if(r===null){Ge(i``,e);return}let a=Xm(r.operations,r.cleanup_failures,{expanded:r.expanded});Ge(rg({events:a.visible,hidden:a.hidden,expanded:r.expanded,repo:r.repo}),e)}e.addEventListener("click",a=>{let c=a.target;if(c?.closest?.('[data-seam="repo-ops-close"]')){o();return}c?.closest?.('[data-seam="repo-ops-more"]')&&r&&(r.expanded=!r.expanded,n())});function s(a){r={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:!1},n()}function o(){r!==null&&(r=null,n(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>r!==null,refresh(a){r&&(r={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:r.expanded},n())}}}var ng="tab:worker:ready",sg="tab:worker:blocked",og="tab:worker:in-progress",ag="tab:worker:closed",oo=1,qu=5;function Fu(e){return js(e).path.length>0}var Wu="beads-ui.worker.candidate-filter",La={show_blocked:!1,spec:"all"};function ig(){try{let e=window.localStorage.getItem(Wu);if(!e)return{...La};let t=JSON.parse(e);if(!t||typeof t!="object")return{...La};let r=t.spec;return{show_blocked:t.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...La}}}function lg(e){try{window.localStorage.setItem(Wu,JSON.stringify(e))}catch{}}function cg(e,t){let r=c=>t.show_blocked||!c.blocked,n=c=>t.spec==="all"||(t.spec==="with"?c.has_spec:!c.has_spec),s=[],o=0,a=0;for(let c of e){let u=r(c),d=n(c);u&&d?s.push(c):!u&&d?o+=1:u&&!d&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var ug=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],zu="bdui.worker.candidate_sort",dg=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],ao="spec";function pg(){try{let e=window.localStorage.getItem(zu);return e==="board"||e==="created"||e==="spec"?e:ao}catch{return ao}}function fg(e){try{window.localStorage.setItem(zu,e)}catch{}}var Hu="bdui.worker.done-range";function _g(){try{let e=window.localStorage.getItem(Hu);return Ut(e)?e:Nt}catch{return Nt}}function mg(e){try{window.localStorage.setItem(Hu,e)}catch{}}var gg="(max-width: 640px)",Gu="beads-ui.worker.lane-collapsed",Kn={queue:!0,done:!0};function bg(){try{let e=window.localStorage.getItem(Gu);if(!e)return{...Kn};let t=JSON.parse(e);return!t||typeof t!="object"?{...Kn}:{queue:typeof t.queue=="boolean"?t.queue:Kn.queue,done:typeof t.done=="boolean"?t.done:Kn.done}}catch{return{...Kn}}}function hg(e){try{window.localStorage.setItem(Gu,JSON.stringify(e))}catch{}}function ju(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let r=typeof t.title=="string"?t.title:t.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function yg(e,t,r){let n=Array.isArray(e)?e.slice():[];return t==="created"?n.sort(Fr):(n.sort(fs(r)),t==="board"?n:[...n.filter(Fu),...n.filter(s=>!Fu(s))])}function vg(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function wg(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function kg(e){let t=e?.blocked_info;if(t&&typeof t=="object"){let s=Array.isArray(t.blockers)?t.blockers.filter(o=>typeof o=="string"&&o.length>0):[];return s.length>0?`\u{1F512} ${s.join(", ")}`:"\u{1F512} blocked"}let n=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(s=>{if(typeof s=="string")return s;if(!s||typeof s!="object")return"";let o=s.type??s.dependency_type;return o!==void 0&&o!=="blocks"?"":s.depends_on_id||s.id||""}).filter(Boolean);return n.length>0?`\u{1F512} ${n.join(", ")}`:"\u{1F512} blocked"}function Bu(e){switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function $g(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function xg(e,t=null){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let r=e.slice(19);if(r.length===0)return null;switch(r){case"gating":{let n=t?.repair_sessions_used;return typeof n=="number"&&n>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911"}case"repairing":return"\uC790\uB3D9 \uC218\uC815 \uC911";case"waiting_repair_pr":return"\uC218\uC815 PR \uB300\uAE30 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function Ag(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function Sg(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"implementation review \uB300\uAE30",live:!1,alert:!1};case"reviewing":return{badge:"implementation review \uC911",live:!0,alert:!1};case"revising":return{badge:"review \uC218\uC815 \uC911 \xB7 1\uD68C",live:!0,alert:!1};case"failed":{let r=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:r.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${r.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",live:!1,alert:!0}}default:return null}}function Oa(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function Eg(e){if(!e||typeof e!="object")return null;let t=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,n=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,s=n&&typeof n.pr_number=="number"?n.pr_number:null,o="";switch(e.phase){case"gating":o=t>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"repairing":o="\uC790\uB3D9 \uC218\uC815 \uC911";break;case"waiting_repair_pr":o=s?`\uC218\uC815 PR #${s} \uB300\uAE30 \uC911`:"\uC218\uC815 PR \uB300\uAE30 \uC911";break;case"merging":o=e.subject_role==="repair"?s?`\uC218\uC815 PR #${s} \uBA38\uC9C0 \uC911`:"\uC218\uC815 PR \uBA38\uC9C0 \uC911":"\uBA38\uC9C0 \uC911";break;case"cleaning":o="\uB9C8\uBB34\uB9AC \uC911";break;case"paused":o="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":o="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let a=[o,`\uC790\uB3D9 \uC218\uC815 \uD69F\uC218 ${t}/${r}`];return e.head_sha&&a.push(`head ${e.head_sha}`),e.base_sha&&a.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&a.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`),e.active_attempt_id&&a.push(`attempt ${e.active_attempt_id}`),n&&typeof n.bead_id=="string"&&a.push(`repair ${n.bead_id}`),e.evidence&&a.push(e.evidence),e.log_path&&a.push(e.log_path),{badge:o,title:a.join(`
`),alert:e.phase==="needs_human",lock_actions:e.phase!=="paused"&&e.phase!=="needs_human",repair_pr_url:n&&typeof n.pr_url=="string"?n.pr_url:"",repair_pr_number:s}}function Uu(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(r=>typeof r=="string"&&r.length>0):[]}function Tg(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",r=(n,s={})=>{let o=[s.title||"",t].filter(Boolean);return{label:n,title:o.join(`
`),live:s.live===!0,alert:s.alert===!0}};return e.continuation_required?r("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0}):e.merge_step?e.gate?.tier==="merged"?r("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):r("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0}):e.conflict_badge?r(e.conflict_badge,{live:e.conflict_live===!0}):e.head_review&&e.head_review.state!=="failed"?r("\uB9AC\uBDF0 \uC9C4\uD589 \uC911",{title:e.head_review.badge,live:e.head_review.live===!0}):e.recovery?.lock_actions?r(e.recovery.badge,{title:e.recovery.title,live:!0}):e.cleanup_failed?r(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0}):e.base_exception?r("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0}):e.conflicting?r("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0}):e.gate?.reason==="base_behind"?r("base \uAC31\uC2E0 \uD544\uC694",{alert:!0}):e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale"?r("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2C8\uAC70\uB098 \uC870\uC0C1 \uD655\uC778\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uB85C, \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB9AC\uBDF0\uD574\uC57C \uBA38\uC9C0\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",alert:!0}):e.gate?.reason==="spec_id_missing"?r("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0}):e.gate?.reason==="review_receipt_invalid"?r("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0}):Uu(e.receipt_check).length>0?r("\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694",{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${Uu(e.receipt_check).join(", ")}`,alert:!0}):e.head_review?.state==="failed"?r("\uB9AC\uBDF0 \uC2E4\uD328",{title:e.head_review.failure_reason||"",alert:!0}):e.recovery?r(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?r("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?r(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${Bu(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?r(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${Bu(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?r(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?r("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?r("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?r("\uB2EB\uD798",{alert:!0}):e.activity?r("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?r("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?r("\uD655\uC778 \uC911"):e.gate?.gate_badge?r(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function Cg(e,t,r,n,s=null,o=null,a=null,c=!1,u=null,d=!0,f=null,_=null,y=null,A={},E=!1,I=!1,j={}){let te=!!u&&u.position>0,Q=!!u?.continuation_action&&u.continuation_action.continuation===null,O=!!u&&u.active===!0,M=u&&u.failure||null,R=xg(u?u.waiting:null,y),F=r[e]||null,b=F&&F.gate?F.gate:null,C=F&&F.pr?F.pr:null,z=Eg(y),re=Ag(u?u.resolution:null),L=Sg(u?u.head_review:null),D=u&&u.head_review||null,ue=u&&u.authority||null,_e=!!D&&["pending","reviewing","revising"].includes(D.state),de=te&&!O&&(D?.state==="failed"||!ue||ue.source==="automatic"&&!I),Ue=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":re?re.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":R,Je=!!b&&b.base_badge==="\uCDA9\uB3CC",Ke=!!b&&b.enabled===!0,Me=zn({bead_id:e,merge_sha:j.merge_sha,cleanup_cursor:j.cleanup_cursor,merge_progress:o&&o.merge_progress?o.merge_progress:null,cleanup_failed:n,repo_operations:j.repo_operations}),We=to(Me),le=!!n&&["child_sweep","branch_cleanup","parent_close"].includes(n.step)&&!!b&&b.tier==="merged",xe=c&&!!n&&!!b&&b.tier==="merged",Re=de&&(Ke||Je||b?.reason==="base_behind"||b?.reason==="review_receipt_missing"||b?.reason==="review_receipt_stale"||le||xe),Ae=c&&Je&&d===!1,he=pr(A,e,{external:c,merge_active:O||Me?.step==="merge",merge_queued:te,conflict_active:!!a,cleanup_active:We,merged:!!n||b?.tier==="merged"}),ze=!!he.operation,rt=!le&&!!n&&n.step==="repo_operations",Ee=Tg({continuation_required:Q,merge_step:Me,conflict_badge:Ue,conflict_live:re?.live===!0||a==="running",head_review:D&&L?{...L,state:D.state,failure_reason:D.failure_reason}:null,recovery:z,cleanup_failed:n,cleanup_label:n?Hr(n.step):null,base_exception:_,conflicting:Je,gate:b,receipt_check:F&&F.receipt_check?F.receipt_check:null,queue_failure:M,auto_skip:f,queued:te,queue_active:O,queue_position:u?u.position:0,activity:Ue?null:o&&o.activity||null}),nt=Ee?.live===!0&&Ee.title?i`<span title=${Ee.title}>${Ee.label}</span>`:Ee?.label||null;return{id:e,title:c?i`${t}<span class="muted"> · 세션</span>`:t,reason:n&&Me?.active!==!0?eo(n.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:E,external:c,pr_number:C&&typeof C.number=="number"?C.number:null,pr_url:C&&typeof C.url=="string"?C.url:"",completion_badge:Ee?.live!==!0&&Ee?.title?Ee.label:null,completion_title:Ee?.title||"",completion_repair_pr_url:z?z.repair_pr_url:"",completion_repair_pr_number:z?z.repair_pr_number:null,badges:nt?[nt]:[],live_badge:Ee?.live===!0?nt:null,usage:s,alert:Ee?.alert===!0,merge_action:b?.tier==="merged"&&!le&&!xe||rt?!1:!te||Q||de,timeline_action:rt,cancel_action:te&&!Q,cancel_enabled:(!O||_e)&&!(z&&z.lock_actions),cancel_title:z&&z.lock_actions?`${z.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:O&&!_e?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":_e?"review \uC9C4\uD589\uC744 \uCDE8\uC18C\uD558\uACE0 \uBA38\uC9C0 \uAD8C\uD55C\uC744 \uD3D0\uAE30\uD569\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:he,discard_action:he.action,merge_step:Me,discard_enabled:he.enabled,discard_title:he.title,merge_enabled:!Me&&!a&&!ze&&!_&&!(z&&z.lock_actions)&&!Ae&&!rt&&(Ke||Je||b?.reason==="base_behind"||b?.reason==="review_receipt_missing"||b?.reason==="review_receipt_stale"||le||xe||Re),merge_label:Q?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":le||xe?"\uC815\uB9AC \uC7AC\uAC1C":Je&&!Me&&!le?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":b?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":b?.reason==="review_receipt_missing"||b?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":de?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:ze?he.error?`\uD3D0\uAE30 \uC2E4\uD328: ${he.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${he.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Q?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Me?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${Me.label}`:xe?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Ae?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":le?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Je?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":b?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":b?.reason==="review_receipt_missing"||b?.reason==="review_receipt_stale"?"\uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":b?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":Ke?`\uBA38\uC9C0 (${b.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:b&&b.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${b&&b.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Ma(e,t={}){let{transport:r,issueStores:n,queueStore:s,analysisStore:o,sessionLogStore:a,uiOrderStore:c,gotoIssue:u,getWorkspacePath:d,doneRange:f,onDoneRangeChange:_}=t,y=n?ms(n,c):null,A=bs({transport:r,uiOrderStore:c}),E=null,I=[],j=ig(),te=null,Q=pg(),O=Ut(f)?f:_g(),M=new Map;function R(){let l=cr.find(m=>m.value===O);return l?l.label:"\uC624\uB298"}let F=bg(),b=!1,C=new Set,z=new Set,re=new Set,L=new Set,D=[],ue=document.createElement("div");ue.className="worker-console";let _e=document.createElement("div");_e.className="worker-top";let de=document.createElement("div");de.className="worker-drawer-overlay",de.hidden=!0;let Ue=document.createElement("div");Ue.className="worker-drawer-overlay__backdrop";let Je=document.createElement("div");Je.className="worker-drawer-host";let Ke=document.createElement("div");Ke.className="worker-drawer-host",Ke.hidden=!0,de.append(Ue,Je,Ke);let Me=document.createElement("div");Me.className="worker-lanes-host",ue.append(_e,de,Me),e.appendChild(ue);let We=null,le=null,xe=Fs(Je,{transport:r,sessionLogStore:a,onClose:()=>{We=null,le=null,de.hidden=!0,X()}}),Re=Nu(Ke,{onClose:()=>{Ke.hidden=!0,de.hidden=!0,X()}}),Ae=Cu({getWorkspacePath:d||(()=>"")}),he=d&&d()||"",ze=Ru({queueStore:s,transport:r,onChanged:()=>X(),onOpenScript:(l,m)=>{Ae.open(l,m)}}),rt=o?Au(ue,{queueStore:s,analysisStore:o,transport:r,getWorkspacePath:d,onOpenTranscript:(l,m)=>tt(l,m)}):null;function Ee(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:oo,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function nt(){let l=Ee(),m=typeof l.serial_lane_count=="number"&&Number.isInteger(l.serial_lane_count)&&l.serial_lane_count>0?Math.min(l.serial_lane_count,5):0,S=Array.isArray(l.serial_lanes)?l.serial_lanes:[],H=[];for(let ke of S){if(H.length>=m)break;!ke||typeof ke.id!="string"||!/^s[1-5]$/.test(ke.id)||!Array.isArray(ke.entries)||H.push({id:ke.id,label:`\uC9C1\uB82C ${ke.id.slice(1)}`,count:ke.entries.length})}return H.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(l.queue)?l.queue:[]).length},...H]}function K(l){if(!te||!l.some(S=>S.id===te))return null;let m=nt();return m?{bead_id:te,lanes:m}:null}function B(){let l=Ee();return typeof l.revision=="number"?l.revision:0}function ne(l){l&&l.queue&&s&&s.set(l.queue)}function Oe(){let l=Ee().queue;return Array.isArray(l)?l.length:0}async function je(l,m,S){if(!r)return;let H=()=>({bead_id:l,...m==="parallel"?{}:{lane:m},...S===void 0?{}:{index:S},expected_revision:B()}),oe=await r("worker-queue-place",H());ne(oe),oe&&oe.conflict&&await r("worker-queue-place",H()).then(ne)}async function He(l,m,S){if(!r)return;let H=()=>({bead_id:l,...m==="parallel"?{}:{lane:m},to_index:S,expected_revision:B()}),oe=await r("worker-queue-reorder",H());ne(oe),oe&&oe.conflict&&await r("worker-queue-reorder",H()).then(ne)}async function Te(l){if(!r)return;let m=await r("worker-queue-remove",{bead_id:l,expected_revision:B()});ne(m),m&&m.conflict&&await r("worker-queue-remove",{bead_id:l,expected_revision:B()}).then(ne)}async function ct(l){if(!r||!l)return;let m=await r("worker-attempt-pause",{attempt_id:l});m&&m.paused===!1&&m.reason&&se(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${m.reason}`,"error",2400)}async function Ze(l){if(!r||!l)return;let m=await an();if(m===null)return;let S=async(oe={})=>await r("worker-attempt-resume",{attempt_id:l,expected_revision:B(),...m!==""?{instructions:m}:{},...oe}),H=await S();ne(H),H&&H.conflict&&(H=await S(),ne(H)),H=await mr(H,(oe,ke)=>S({continuation:oe,decision_token:ke}),{onResult:ne,refresh:()=>S()}),H&&H.resumed===!1&&!H.conflict&&H.reason&&se(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${H.reason}`,"error",2400)}async function G(l){if(!r||!l)return;let m=await r("worker-attempt-dismiss",{attempt_id:l,expected_revision:B()});ne(m),m&&m.conflict&&(m=await r("worker-attempt-dismiss",{attempt_id:l,expected_revision:B()}),ne(m)),m&&m.dismissed===!1&&!m.conflict&&m.reason&&se(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${m.reason}`,"error",2400)}async function ee(l,m,S=!0){if(!r)return null;let H=r,oe=await H(l,{...m,expected_revision:B()});return ne(oe),oe&&oe.conflict&&S&&(oe=await H(l,{...m,expected_revision:B()}),ne(oe)),oe}async function Ne(l){if(!r||!l)return;let m=Ee().merge_queue?.find(H=>H.bead_id===l)?.continuation_action;if(m?.mismatch&&m.continuation===null){await pe(l,m.mismatch);return}C.add(l),X();let S;try{S=await ee("worker-merge-queue-add",{bead_id:l})}finally{C.delete(l),X()}!S||S.conflict||S.applied||se($g(S.reason),"error",2400)}async function st(l){if(!(!r||!l||z.has(l))){z.add(l),X();try{let m=await r("worker-cleanup-retry",{bead_id:l,expected_revision:B()});ne(m),m&&!m.retried&&!m.conflict&&m.reason&&se(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${m.reason}`,"error",2400)}finally{z.delete(l),X()}}}async function pe(l,m){let S=await mr({continuation_mismatch:m},(oe,ke)=>ee("worker-merge-queue-add",{bead_id:l,continuation:oe,decision_token:ke},!1)),H=S?.queue?.merge_queue?.find(oe=>oe.bead_id===l)?.continuation_action;if(S?.applied!==!0&&H?.continuation===null&&H.mismatch){await pe(l,H.mismatch);return}S&&S.applied===!1&&!S.conflict&&se("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function h(l){if(!r)return;let m=await ee("worker-merge-auto-toggle",{on:l});!m||m.conflict||se(l?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",l?"success":"info",2400)}async function $(l){if(!r||!l)return;let m=await ee("worker-merge-queue-remove",{bead_id:l});m&&!m.conflict&&!m.applied&&m.reason==="merge_active"&&se("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function k(){await ee("worker-merge-queue-remove",{all:!0})}async function P(l,m=null,S="unmerged",H=null){if(!r||!l)return;let oe=Bn(l,S);if(!(!!H||typeof globalThis.confirm!="function"||globalThis.confirm(oe)))return;let ge=await r("worker-discard",{bead_id:l,...m?{attempt_id:m}:{},...H?{operation_id:H}:{},expected_revision:B()});if(ne(ge),ge&&ge.conflict&&(ge=await r("worker-discard",{bead_id:l,...m?{attempt_id:m}:{},...H?{operation_id:H}:{},expected_revision:B()}),ne(ge)),ge&&ge.discarded===!0){se(Qs(ge),"success",5e3);return}if(ge&&ge.reason){se(`\uD3D0\uAE30 \uC2E4\uD328: ${ge.reason}`,"error",2800);return}if(ge&&ge.accepted&&ge.pending==="merged_revert"){se("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(ge&&ge.accepted&&!ge.discarded){se(`\uD3D0\uAE30 \uC9C4\uD589: ${ge.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}ge&&!ge.conflict&&se("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function V(l,m,S){if(!(!r||!m||!S||L.has(m))){L.add(m),X();try{let H=await r(l,{bead_id:m,action_id:S,expected_revision:B()});ne(H),H?.conflict?se("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!H?.ok&&H?.reason&&se(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(H.reason)}`,"error",2800)}finally{L.delete(m),X()}}}async function Y(l,m){if(!r||!m||re.has(m))return;re.add(m),X();let S;try{let H=async(oe={})=>await r(l,{bead_id:m,expected_revision:B(),...oe});S=await H(),ne(S),S&&S.conflict&&(S=await r(l,{bead_id:m,expected_revision:B()}),ne(S)),l==="worker-revise-fix"&&(S=await mr(S,(oe,ke)=>H({continuation:oe,decision_token:ke}),{onResult:ne,refresh:()=>H()}))}finally{re.delete(m),X()}if(!(!S||S.conflict)){if(S.ok){se(l==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}se(`\uCC98\uBD84 \uAC70\uBD80: ${S.reason||""}`,"error",3e3)}}async function ie(l){if(!r)return;let m=await r("worker-automation-toggle",{on:l,expected_revision:B()});ne(m),m&&m.conflict&&await r("worker-automation-toggle",{on:l,expected_revision:B()}).then(ne)}async function ce(l){if(!r||!l)return;let m=await r("worker-repo-operation-repair",{operation_id:l});if(ne(m),m&&m.ok===!1){se(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${m.reason||""}`,"error",3e3);return}m&&m.ok===!0&&se("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function Be(l){if(!r||!l)return;let m=await r("worker-repo-operation-dismiss",{operation_id:l});ne(m),m&&m.ok===!1&&se(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${m.reason||""}`,"error",3e3)}async function fe(l){if(!r||!Number.isFinite(l))return;let m=Math.max(oo,Math.floor(l)),S=await r("worker-queue-set-slots",{slots:m,expected_revision:B()});ne(S),S&&S.conflict&&await r("worker-queue-set-slots",{slots:m,expected_revision:B()}).then(ne)}async function Ie(l){if(!r||!Number.isInteger(l)||l<1||l>qu)return;let m=Ee(),S=(Array.isArray(m.serial_lanes)?m.serial_lanes:[]).slice(l).reduce((ke,ge)=>ke+(Array.isArray(ge?.entries)?ge.entries.length:0),0),H=()=>({count:l,expected_revision:B()}),oe=await r("worker-queue-set-serial-lane-count",H());ne(oe),oe&&oe.conflict&&(oe=await r("worker-queue-set-serial-lane-count",H()),ne(oe)),oe&&oe.applied&&S>0&&se(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${S}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}function Se(){let l=Ee(),m=y?y.selectBoardColumn(ng,"ready"):[],S=y?y.selectBoardColumn(sg,"blocked"):[],H=y?y.selectBoardColumn(ag,"closed"):[],oe=y?y.selectBoardColumn(og,"in_progress"):[],ke=new Map;for(let v of oe){let q=wg(v);if(!q)continue;let ae=ke.get(q);ae?ae.push(v):ke.set(q,[v])}let ge=v=>{let q=gs(ke.get(v)||[]);return q?q.title||q.id:null},Ye=l.bead_titles||{},ot=new Map;for(let[v,q]of Object.entries(Ye))typeof q=="string"&&q.length>0&&ot.set(v,q);for(let v of[...m,...S])ot.set(v.id,v.title||v.id);let qe=l.bead_times&&typeof l.bead_times=="object"&&!Array.isArray(l.bead_times)?l.bead_times:{},p=l.bead_labels&&typeof l.bead_labels=="object"&&!Array.isArray(l.bead_labels)?l.bead_labels:{},g=new Map;for(let[v,q]of Object.entries(p))Array.isArray(q)&&g.set(v,Ca(q));for(let v of[...m,...S]){let q=v.labels;Array.isArray(q)&&!g.has(v.id)&&g.set(v.id,Ca(q))}let x=new Map,W=o?.get()?.last_good?.result?.groups;for(let v of Array.isArray(W)?W:[]){if(v?.eligible!==!0||!Array.isArray(v.members))continue;let q=v.members.map(Ve=>{let ft=(Array.isArray(l.serial_lanes)?l.serial_lanes:[]).find(Dt=>Dt.entries.some(Tt=>Tt.bead_id===Ve));return ft?ft.id:null});if(!(q.every(Ve=>Ve!==null)&&new Set(q).size===1))for(let Ve of v.members)x.set(Ve,v.members.filter(ft=>ft!==Ve))}let ve=l.bead_blocked_by&&typeof l.bead_blocked_by=="object"&&!Array.isArray(l.bead_blocked_by)?l.bead_blocked_by:{},be=new Map;for(let[v,q]of Object.entries(qe))q&&typeof q=="object"&&be.set(v,q);for(let v of[...m,...S])be.set(v.id,{created_at:v.created_at,updated_at:v.updated_at});let Ce=v=>be.get(v)||{},Fe=l.pr_wait||[],gt=l.pr_observations||{},lr=l.pr_activity||{},Vr=l.cleanup_failed||{},Yn=Object.entries(Vr).map(([v,q])=>({bead_id:v,step:q&&q.step?q.step:"",reason:q&&q.reason?q.reason:"",at:q&&typeof q.at=="number"?q.at:null,detail:q&&typeof q.detail=="string"?q.detail:null,output_tail:q&&typeof q.output_tail=="string"&&q.output_tail?q.output_tail:void 0,log_path:q&&typeof q.log_path=="string"&&q.log_path?q.log_path:void 0,retry_count:q&&typeof q.retry_count=="number"&&Number.isInteger(q.retry_count)&&q.retry_count>0?q.retry_count:0,failure_code:q&&typeof q.failure_code=="string"?q.failure_code:void 0,subject_id:q&&typeof q.subject_id=="string"?q.subject_id:void 0,repair_eligible:!!(q&&q.repair_eligible),repair:q&&q.repair?q.repair:void 0})),_n=l.queue||[],mn=new Set([..._n.map(v=>v.bead_id),...(Array.isArray(l.serial_lanes)?l.serial_lanes:[]).flatMap(v=>(Array.isArray(v?.entries)?v.entries:[]).map(q=>q.bead_id)),...Fe.map(v=>v.bead_id),...l.done.map(v=>v.bead_id)]),Zn=new Set(S.map(v=>v.id)),De=c?c.get()?.order||{}:{},pt=new Set,Kr=[];for(let v of[...m,...S])mn.has(v.id)||pt.has(v.id)||vg(v)||(pt.add(v.id),Kr.push(v));I=yg(Kr,Q,De);let od=l.admission||{},qa=v=>{let q=od[v];if(!q)return"";if(q.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let ae=typeof q.reason=="string"?q.reason:"",Ve=ae.indexOf(":");return Ve>0&&Ve<ae.length-1?`\u26D4 ${ae.slice(0,Ve)} (${ae.slice(Ve+1)})`:`\u26D4 ${ae}`},ad=I.map(v=>{let q=js(v),ae=q.path.length>0,Ve=v.workflow?.route==="quick_fix"||v.metadata&&v.metadata.route==="quick_fix",ft=!Object.hasOwn(v,"description")||typeof v.description=="string"&&v.description.trim().length>0,Dt=Object.hasOwn(v,"labels")&&xu(v.labels),Tt=!Dt&&(Ve?ft:ae&&!q.conflict),ut=Zn.has(v.id),Kt=[];ut&&Kt.push(kg(v)),Ve&&!ft?Kt.push("missing_description"):!Ve&&q.conflict?Kt.push("spec_id_conflict"):!Ve&&!ae&&Kt.push("spec \uC5C6\uC74C");let ss=qa(v.id);return ss&&Kt.push(ss),{id:v.id,title:v.title||v.id,reason:Kt.join(" \xB7 "),draggable:Tt,lane:"candidate",created_at:v.created_at,updated_at:v.updated_at,workflow:v.workflow,is_quick_fix:Ve,status:v.status,worker_ineligible:Dt,blocked:ut,has_spec:ae}}),io=cg(ad,j),id=io.visible,ld=l.revise_parked||{},Xn=l.discard_operations&&typeof l.discard_operations=="object"&&!Array.isArray(l.discard_operations)?l.discard_operations:{},lo=(v,q)=>v.map((ae,Ve)=>{let ft=q!=="done",Dt=q!=="done"&&q!=="queue",Tt=ft?ld[ae.bead_id]:null,ut=ft?pr(Xn,ae.bead_id):null,Kt=ut?.operation?ut:null,ss=ft&&g.get(ae.bead_id)===!0,li=ve[ae.bead_id]||[],_o=l.admission&&typeof l.admission=="object"?l.admission[ae.bead_id]:null,mo=ft?xc(_o,!!Kt||L.has(ae.bead_id)):null,wd=ft&&!mo?qa(ae.bead_id):null,kd=ft?[wd]:[],ci=ft&&li.length>0&&typeof _o?.reason=="string"&&_o.reason.startsWith("not_ready")?[`\u23F8 ${li.join(", ")} \uC644\uB8CC \uB300\uAE30 (blocks)`]:[],go=ft?x.get(ae.bead_id):void 0;return go&&go.length>0&&ci.push(`\u2733 serial \uAD8C\uC7A5 \xB7 ${go.join(", ")}\uC640`),{id:ae.bead_id,title:ot.get(ae.bead_id)||ae.bead_id,reason:kd.filter(Boolean).join(" \xB7 "),draggable:ft&&!Kt&&!mo,done:q==="done",lane:q,seq:Dt?Ve+1:void 0,worker_serial:ss,discard:Kt,stale_work:mo,badges:[...ci,...Tt?["\u23F8 REVISE \uD30C\uD0B9"]:[]],alert:!!Tt,revise_action:!!Tt,revise_enabled:!!Tt&&!Kt&&!re.has(ae.bead_id),revise_title:Tt?Tt.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Tt.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:q==="done"?Wt(l.attempts||{},ae.bead_id):null,work_ms:q==="done"?kc(l.attempts||{},ae.bead_id):null,done_at:q==="done"&&typeof ae.added_at=="number"?ae.added_at:void 0,...Ce(ae.bead_id)}}),Yr=l.attempts?Object.values(l.attempts):[],co=new Set;for(let v of Yr)v&&typeof v.resumed_from=="string"&&v.resumed_from.length>0&&co.add(v.resumed_from);let Fa=new Map;for(let v of Yr)Fa.set(v.bead_id,v.attempt_id);let Qn=new Map;for(let v of Yr)Qn.set(v.attempt_id,v);function uo(v){let q=new Set,ae=v;for(;ae&&!q.has(ae.attempt_id);){if(ae.conflict_resolution===!0)return!0;q.add(ae.attempt_id),ae=typeof ae.resumed_from=="string"&&ae.resumed_from.length>0&&Qn.get(ae.resumed_from)||null}return!1}let Jn=typeof l.declared_base=="string"?l.declared_base:null;function cd(v){let q=null;for(let ae of Yr)!ae||ae.bead_id!==v||uo(ae)||(q===null||(typeof ae.started_at=="number"?ae.started_at:0)>=(typeof q.started_at=="number"?q.started_at:0))&&(q=ae);return q&&typeof q.target_base=="string"?q.target_base:null}let ja=[],Ba=[],ud=$u(l),Ua=v=>{let q=typeof v.session_id=="string"&&v.session_id.length>0,ae=co.has(v.attempt_id);return{eligible:q&&!ae,reason:q?ae?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},Vt=null;for(let v of Yr){let q=v.status==="paused"&&!co.has(v.attempt_id);if(v.status==="running"||q)Ba.push({bead_id:v.bead_id,attempt_id:v.attempt_id,title:ot.get(v.bead_id)||v.bead_id,runner:v.runner||null,model:v.model||null,effort:v.effort||null,speed:v.speed||null,continuation_mode:v.continuation_mode||null,started_at:typeof v.started_at=="number"?v.started_at:null,resumed_from:v.resumed_from||null,paused:q,conflict_resolution:uo(v),base_exception:Oa(Jn,v.target_base),can_pause:typeof v.session_id=="string"&&v.session_id.length>0,discard:pr(Xn,v.bead_id,{attempt_id:v.attempt_id}),usage:Wt(l.attempts||{},v.bead_id),current_child:ge(v.bead_id),...Ce(v.bead_id)});else if((v.status==="failed"||v.status==="orphaned")&&ud(v)){let ae=Ua(v);ja.push({bead_id:v.bead_id,attempt_id:v.attempt_id,title:ot.get(v.bead_id)||v.bead_id,runner:v.runner||null,model:v.model||null,effort:v.effort||null,speed:v.speed||null,continuation_mode:v.continuation_mode||null,started_at:typeof v.started_at=="number"?v.started_at:null,resumed_from:v.resumed_from||null,failed:!0,status:v.status,status_label:v.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:pr(Xn,v.bead_id,{attempt_id:v.attempt_id}),resume_eligible:ae.eligible,resume_reason:ae.reason,conflict_resolution:uo(v),base_exception:Oa(Jn,v.target_base),usage:Wt(l.attempts||{},v.bead_id),current_child:ge(v.bead_id),...Ce(v.bead_id)}),Vt=v}}let es=[...ja,...Ba].map(v=>{let q=Qn.get(v.attempt_id),ae=q?.quickfix_landing;if(q?.quickfix_lane!==!0||!ae||typeof ae!="object")return v;let Ve=typeof ae.reason=="string"&&ae.reason.length>0?ae.reason:null,ft=zn({bead_id:q.bead_id,merge_sha:ae.head_sha,cleanup_cursor:ae.cursor,cleanup_failed:Ve?{step:ae.cursor,reason:Ve}:null,repo_operations:Array.isArray(l.repo_operations)?l.repo_operations:[]});return ft?{...v,landing:ft}:v}),Wa=null;if(Vt){let v=Ua(Vt),q=Vt.cause_detail;Wa={bead_id:Vt.bead_id,repo:Vt.repo||"",reason:Vt.cause||Vt.status,cause_detail:q&&typeof q.reason=="string"?{reason:q.reason,command:typeof q.command=="string"?q.command:null}:null,resume_attempt_id:Vt.attempt_id,resume_eligible:v.eligible,resume_reason:v.reason,discard:pr(Xn,Vt.bead_id,{attempt_id:Vt.attempt_id})}}let za=new Set(es.map(v=>v.bead_id)),po=Array.isArray(l.merge_queue)?l.merge_queue:[],Ha=new Map,Ga=new Map,Va=new Map,Ka=new Map,Ya=new Map;po.forEach((v,q)=>{v&&typeof v.bead_id=="string"&&(Ha.set(v.bead_id,q+1),Ga.set(v.bead_id,v.resolution),Va.set(v.bead_id,v.continuation_action||null),Ka.set(v.bead_id,v.head_review||null),Ya.set(v.bead_id,v.authority||null))});let Zr=l.merge_queue_state||{active:null,failures:{}},dd=Zr.failures||{},Za=Zr.waiting&&typeof Zr.waiting.bead_id=="string"&&typeof Zr.waiting.reason=="string"?Zr.waiting:null,pd=l.auto_merge_skips||{},Xa=v=>{let q=pd[v];if(!q)return null;let ae=gt[v],Ve=ae&&ae.pr?ae.pr.head_sha:null;return Ve&&Ve===q.head_sha?q.reason||"":null},ts=new Map;for(let v of es)v.failed!==!0&&v.conflict_resolution&&(v.paused?ts.has(v.bead_id)||ts.set(v.bead_id,"paused"):ts.set(v.bead_id,"running"));let Qa=es.filter(v=>!v.paused&&v.failed!==!0).length,Ja=(l.workspace_info||{}).slots,ei=typeof Ja=="number"?Ja:typeof l.slots=="number"?l.slots:oo,fd=Qa>ei,rs=Nr(O),_d=(Array.isArray(l.done)?l.done.slice():[]).filter(v=>rs===void 0||typeof v.added_at!="number"||v.added_at>=rs).sort((v,q)=>(q.added_at||0)-(v.added_at||0)),gn=lo(_d,"done"),md=new Set((Array.isArray(l.done)?l.done:[]).map(v=>v?.bead_id).filter(v=>typeof v=="string")),ti=[],gd=d?.()||"";for(let v of H){let q=jr(v.closed_at);if(typeof v.id!="string"||md.has(v.id)||q===null||rs!==void 0&&q<rs||typeof v.comment_count!="number"||v.comment_count<=0)continue;let ae=`${gd}\0${v.id}\0${String(v.updated_at)}\0${v.comment_count}`,Ve=M.get(ae);Ve===void 0&&r&&(M.set(ae,"pending"),Promise.resolve(r("get-comments",{id:v.id})).then(ft=>{let Dt=Array.isArray(ft)&&ft.some(Tt=>Bs(typeof Tt?.text=="string"?Tt.text:"")?.lane==="session");M.set(ae,Dt?"session":"not-session"),X()}).catch(()=>{M.set(ae,"failed"),X()})),Ve==="session"&&ti.push({id:v.id,title:v.title||v.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:null,done_at:q,created_at:v.created_at,updated_at:v.updated_at})}gn.push(...ti),gn.sort((v,q)=>(q.done_at||0)-(v.done_at||0));let ns={};for(let v of gr)ns[v]=0;let ri=!1,ni=0,fo=0,si=0;for(let v of gn){let q=v.usage;if(q&&typeof q=="object"){let ae=!1;for(let Ve of gr)Number.isFinite(q[Ve])&&(ns[Ve]+=q[Ve],ri=!0,ae=!0);ae&&(fo+=1,Number.isFinite(q.total_cost_usd)&&(ni+=q.total_cost_usd,si+=1))}}fo>0&&si===fo&&(ns.total_cost_usd=ni);let oi=gn.map(v=>v.usage).filter(v=>v&&typeof v=="object"&&v.providers),bd=oi.length>0?At(As(oi)):ri?Xt(ns):null,hd=l.lane_states&&typeof l.lane_states=="object"&&!Array.isArray(l.lane_states)?l.lane_states:{},yd=Array.isArray(l.serial_lanes)?l.serial_lanes:[],ai=v=>{if(Fe.some(Ve=>Ve.bead_id===v))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let q=Yr.filter(Ve=>Ve&&Ve.bead_id===v),ae=q.length>0?q[q.length-1].status:null;return ae==="failed"||ae==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":ae==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},ii=yd.filter(v=>v&&typeof v.id=="string"&&Array.isArray(v.entries)).map((v,q)=>{let ae=hd[v.id]||{},Ve=new Map((Array.isArray(ae.corrections)?ae.corrections:[]).filter(ut=>ut&&typeof ut.bead_id=="string"&&typeof ut.after=="string").map(ut=>[ut.bead_id,ut.after])),ft=lo(v.entries.filter(ut=>!za.has(ut.bead_id)),v.id).map(ut=>Ve.has(ut.id)?{...ut,badges:[`\u{1F517} ${Ve.get(ut.id)} \uB4A4 (blocks \uC790\uB3D9)`,...ut.badges]}:ut),Dt=Array.isArray(ae.occupied_by)?ae.occupied_by.filter(ut=>typeof ut=="string"):[],Tt=Dt.map(ut=>({id:ut,title:ot.get(ut)||ut,draggable:!1,lane:v.id,ghost:!0,badges:[ai(ut)]}));return{id:v.id,index:q+1,rows:[...Tt,...ft],occupied:Dt.length>0,badge:Dt.length>0?ai(Dt[0]):"\uB300\uAE30",cycle:ae.cycle===!0}}),vd=typeof l.serial_lane_count=="number"?l.serial_lane_count:ii.length;return{queue:l,idToTitle:ot,candidates:id,candidate_hidden:{blocked:io.hidden_blocked,spec:io.hidden_spec},running:es,live_count:Qa,slots:ei,over_cap:fd,failure:Wa,waiting:lo(_n.filter(v=>!za.has(v.bead_id)),"queue"),serial_lanes:ii,serial_lane_count:vd,pr_wait:Fe.map(v=>Cg(v.bead_id,ot.get(v.bead_id)||v.bead_id,gt,Vr[v.bead_id]||null,Wt(l.attempts||{},v.bead_id),lr[v.bead_id]||(C.has(v.bead_id)||z.has(v.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),ts.get(v.bead_id)||null,v.external===!0,{position:Ha.get(v.bead_id)||0,active:Zr.active===v.bead_id,failure:dd[v.bead_id]||null,waiting:Za?.bead_id===v.bead_id?Za.reason:null,resolution:Ga.get(v.bead_id),continuation_action:Va.get(v.bead_id),head_review:Ka.get(v.bead_id)||null,authority:Ya.get(v.bead_id)||null},v.wt_present!==!1,l.auto_merge===!0?Xa(v.bead_id):null,Oa(Jn,cd(v.bead_id)),l.completion_status&&typeof l.completion_status=="object"&&!Array.isArray(l.completion_status)&&l.completion_status[v.bead_id]||null,l.discard_operations&&typeof l.discard_operations=="object"&&!Array.isArray(l.discard_operations)?l.discard_operations:{},Qn.get(Fa.get(v.bead_id)||"")?.worker_serial===!0,l.auto_merge===!0,{merge_sha:v.merge_sha,cleanup_cursor:v.cleanup_cursor,repo_operations:Array.isArray(l.repo_operations)?l.repo_operations:[]})).map(v=>({...v,...Ce(v.id)})),merge_queue_length:po.length,merge_queue_running:po.length>0,auto_excluded:Fe.map(v=>v.bead_id).filter(v=>Xa(v)!==null),declared_base:Jn,done:gn,token_total:bd,cleanup_failures:Yn,repo_operations:Array.isArray(l.repo_operations)?l.repo_operations:[]}}function Pe(){let m=!!o?.get()?.job,S=!m&&o?.isPending?.()===!0,H=m?"\uBD84\uC11D \uC911":S?"\uC900\uBE44 \uC911":"";return i`<button
      type="button"
      class=${H?"worker-analysis-btn worker-analysis-btn--running":"worker-analysis-btn"}
      aria-busy=${H?"true":"false"}
      title="대기 이슈의 병렬 실행 가능성을 분석해 직렬 그룹을 제안합니다 (클릭할 때만 실행)"
    >
      ✳ 병렬성
      분석${H?i`<span class="worker-analysis-btn__badge">${H}</span>`:""}
    </button>`}function et(l){let m=l.waiting.length>0?l.waiting[0].id:"\u2014",S=i`<button
      type="button"
      class="worker-play${l.queue.auto_advance?" is-active":""}"
    >
      ${l.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,H=N(l),oe=l.over_cap?i`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",ke=i`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${l.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${l.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${R()} 완료 <b>${l.done.length}</b></span
      >`,ge=i`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${l.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${l.declared_base||"?"}</span
    >`,Ye=i`<label class="worker-tgl worker-slots"
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
          ${Array.from({length:qu},(p,g)=>g+1).map(p=>i`<option
                value=${String(p)}
                ?selected=${l.serial_lane_count===p}
              >
                ${p}
              </option>`)}
        </select>
      </label>
      ${o?Pe():""} `,ot=qc({failure:l.failure}),qe=$c(l.repo_operations,l.cleanup_failures);return b?i`<div class="worker-ribbon">
          ${S} ${H}
          <div class="worker-kpi worker-kpi--ribbon">${oe}${ke}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${Ye}</div>
          <div class="worker-kpi">${ge}</div>
        </div>
        ${qe}${ze.template()}${ot}`:i`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${S}${H}${Ye}</div>
        <div class="worker-kpi">
          ${oe}${ke}${ge}
          ${(Array.isArray(l.token_total)?l.token_total:l.token_total?[{label:l.token_total,tooltip:`${R()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(p=>i`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${p.tooltip}
                >${R()} 완료 · 누적 ${p.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${m}</b></span
          >
        </div>
      </div>
      ${qe}${ze.template()}${ot}`}function U(l){if(l.running.length===0&&l.pr_wait.length===0)return"";let m=l.running.some(S=>!S.paused&&S.failed!==!0);return i`<section
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
          >${l.running.length+l.pr_wait.length}</span
        >
      </header>
      ${l.running.length>0?wa(l.running,Date.now(),We):""}
      ${l.pr_wait.map(S=>fa(S))}
    </section>`}function J(l){let m=l.candidate_hidden;return i`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${j.show_blocked}
        />
        🔒 blocked${m.blocked>0?` ${m.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${ug.map(S=>i`<button
              type="button"
              class="worker-filter__chip${j.spec===S.value?" is-active":""}"
              data-spec=${S.value}
              aria-pressed=${j.spec===S.value?"true":"false"}
            >
              ${S.label}
            </button>`)}
        ${m.spec>0?i`<span class="worker-filter__hidden">숨김 ${m.spec}</span>`:""}
      </div>
    </div>`}function me(){return i`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${Q}
    >
      ${dg.map(l=>i`<option value=${l.value} ?selected=${Q===l.value}>
            ${l.label}
          </option>`)}
    </select>`}function w(){return i`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${O}
      >
        ${cr.map(l=>i`<option value=${l.value} ?selected=${O===l.value}>
              ${l.label}
            </option>`)}
      </select>
    </div>`}function T(l){let m=i`<span
      class="worker-lane__badge${l.occupied?" worker-lane__badge--held":""}"
      >${l.badge}</span
    >`,S=l.cycle?i`<div class="worker-lane__cycle">
          ⚠ blocks 순환 감지 — 자동 정렬을 생략했습니다
        </div>`:"";return rr({id:`worker-pane-lane-${l.id}`,lane:l.id,title:`\uC9C1\uB82C ${l.index}`,items:l.rows,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:m,controls:S})}function N(l){let m=l.queue.auto_merge===!0;if(l.merge_queue_running)return i`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${m?" is-active":""}"
        title=${m?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${m?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${l.merge_queue_length}
      </button>`;if(m)return i`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let S=new Set(l.auto_excluded),H=l.pr_wait.filter(oe=>oe.merge_action&&oe.merge_enabled&&!S.has(oe.id)).length;return i`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${H>0?` ${H}`:""}
    </button>`}function Z(l){let m=rr({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:l.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:me(),controls:J(l),place_menu:K(l.candidates)});return b?i`<div class="worker-lanes worker-lanes--mobile">
        ${U(l)}
        ${rr({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:l.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:F.queue,preview:ju(l.waiting)})}
        ${l.serial_lanes.map(S=>T(S))}
        ${m}
        ${rr({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:l.done,empty:`${R()} \uC644\uB8CC \uC5C6\uC74C`,controls:w(),collapsible:!0,collapsed:F.done,preview:Array.isArray(l.token_total)?l.token_total.map(S=>S.label).join(" \xB7 "):l.token_total||ju(l.done)})}
      </div>`:i`<div class="worker-lanes">
      ${m}
      <div class="worker-wait">
        ${rr({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:l.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
        ${l.serial_lanes.map(S=>T(S))}
      </div>
      ${rr({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${l.slots}`,items:l.running,live:l.running.some(S=>!S.paused&&S.failed!==!0),body:wa(l.running,Date.now(),We)})}
      ${rr({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:l.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${rr({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${R()} ${l.done.length}`,items:l.done,empty:`${R()} \uC644\uB8CC \uC5C6\uC74C`,controls:w()})}
    </div>`}function we(l){F={...F,[l]:!F[l]},hg(F),X()}function X(){let l=Se();Ge(et(l),_e),Ge(Z(l),Me)}function $e(){let l=document.querySelector(".app-header");if(!l)return;let m=()=>{let S=Math.round(l.getBoundingClientRect().height);ue.style.setProperty("--worker-ribbon-top",`${S}px`)};if(m(),typeof ResizeObserver=="function"){let S=new ResizeObserver(m);S.observe(l),D.push(()=>S.disconnect())}else window.addEventListener("resize",m),D.push(()=>window.removeEventListener("resize",m))}function Le(){if(typeof window.matchMedia!="function")return;let l=window.matchMedia(gg);b=!!l.matches;let m=S=>{let H=!!(S&&typeof S.matches=="boolean"?S.matches:l.matches);H!==b&&(b=H,X())};typeof l.addEventListener=="function"?(l.addEventListener("change",m),D.push(()=>l.removeEventListener("change",m))):typeof l.addListener=="function"&&(l.addListener(m),D.push(()=>l.removeListener(m)))}let ht=null;function yt(l){ht=l.target instanceof Element?l.target:null}function Xe(l){let S=l.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!S)return;if(ht&&S.contains(ht)&&ht.closest("input, button, a")){l.preventDefault();return}let H=S.dataset.beadId||"",oe=S.dataset.lane||"";E={bead_id:H,from_lane:oe};try{l.dataTransfer?.setData("text/plain",H),l.dataTransfer&&(l.dataTransfer.effectAllowed="move")}catch{}}function Et(l){let m=l.target?.closest?.(".worker-pane");if(!m)return;let S=m.dataset.lane||"";S!=="candidate"&&S!=="queue"&&!/^s[1-5]$/.test(S)||(l.preventDefault(),l.dataTransfer&&(l.dataTransfer.dropEffect="move"),m.classList.add("worker-pane--drag-over"))}function Ht(l){l.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function wt(l,m){let S=I.find(ge=>ge.id===l);if(!S)return;let H=I.filter(ge=>ge.id!==l),oe=H.length;if(m){let ge=m.dataset.beadId;if(ge===l)return;let Ye=H.findIndex(ot=>ot.id===ge);Ye>=0&&(oe=Ye)}let ke=H.slice();ke.splice(oe,0,S),A.applyReorder(l,ke,oe)}function Ot(l){let m=l.target?.closest?.(".worker-pane");if(!m)return;l.preventDefault(),m.classList.remove("worker-pane--drag-over");let S=m.dataset.lane||"",H=E?.bead_id||l.dataTransfer?.getData("text/plain")||"",oe=E?.from_lane||"";if(E=null,!H)return;let ke=l.target?.closest?.(".worker-mini, .worker-card"),ge=Array.from(m.querySelectorAll(".worker-mini, .worker-card")),Ye=ge.length;if(ke){let ot=ge.indexOf(ke);ot>=0&&(Ye=ot)}if(Ye=Math.max(0,Ye-m.querySelectorAll(".worker-mini--ghost").length),m.classList.contains("worker-pane--collapsed")&&(Ye=Oe()),S==="candidate"){if(oe==="candidate"){wt(H,ke);return}(oe==="queue"||/^s[1-5]$/.test(oe))&&Te(H);return}if(S==="queue"||/^s[1-5]$/.test(S)){let ot=S==="queue"?"parallel":S;oe===S?He(H,ot,Ye):je(H,ot)}}function nr(l){j=l,lg(l),X()}function sr(l){Q=l==="board"||l==="created"||l==="spec"?l:ao,fg(Q),X()}function or(l){O=Ut(l)?l:Nt,mg(O),_?.(O),X()}function fr(l){let m=l.target?.closest?.(".worker-serial-lane-count");if(m){let Ye=Number.parseInt(m.value,10);Number.isFinite(Ye)&&Ie(Ye).then(X);return}let S=l.target?.closest?.(".worker-filter__blocked");if(S){nr({...j,show_blocked:S.checked});return}let H=l.target?.closest?.(".worker-done-range");if(H){or(H.value);return}let oe=l.target?.closest?.(".worker-sort");if(oe){sr(oe.value||ao);return}let ke=l.target?.closest?.(".worker-slots__input");if(!ke)return;let ge=Number.parseInt(ke.value,10);if(!Number.isFinite(ge)){X();return}fe(ge).then(X)}function kt(l){return l?{runner:l.runner||void 0,model:l.model||void 0,effort:l.effort||void 0,worktree:l.worktree||void 0,status:l.status||void 0,session_id:l.session_id||void 0}:{}}function Gt(){let l=Se();return{operations:l.repo_operations,cleanup_failures:l.cleanup_failures,repo:d&&d()||""}}function ar(){We&&xe.close(),Ke.hidden=!1,de.hidden=!1,Re.open(Gt()),X()}function ir(l){let m=Ee(),S=m.attempts?m.attempts[l]:null;We=l,le=null,Re.close(),Ke.hidden=!0,de.hidden=!1,xe.open({attempt_id:l,meta:kt(S)}),X()}function tt(l,m){We=null,le=l,Re.close(),Ke.hidden=!0,de.hidden=!1,xe.open({attempt_id:l,meta:m,hide_prompt:!0}),X()}function Pt(){if(Re.isOpen()&&Re.refresh(Gt()),le){let S=(o?.get()?.runs||[]).find(H=>H.run_id===le);S?xe.updateMeta(Ia(S)):xe.close();return}if(!We)return;let l=Ee(),m=l.attempts?l.attempts[We]:null;if(m){xe.updateMeta(kt(m));return}xe.close()}function ye(l){let m=l.target;if(m?.closest?.(".worker-mini__serial, .worker-mini__grip")||m?.closest?.("#worker-parallel-analysis-dialog"))return;if(m?.closest?.(".worker-analysis-btn")){rt?.open();return}if(m?.closest?.(".worker-repo-strip")||m?.closest?.(".worker-mini__timeline")){ar();return}let S=m?.closest?.(".worker-repo-op__session");if(S){let De=S.dataset.attemptId;De&&ir(De);return}let H=m?.closest?.(".worker-repo-op__resolve");if(H){ce(H.dataset.operationId||"");return}let oe=m?.closest?.(".worker-repo-op__dismiss");if(oe){Be(oe.dataset.operationId||"");return}let ke=m?.closest?.(".worker-cleanup__resume");if(ke){let De=ke.dataset.beadId;De&&st(De);return}let ge=m?.closest?.(".worker-banner__resume");if(ge){let De=ge.dataset.attemptId;De&&Ze(De);return}let Ye=m?.closest?.(".worker-banner__discard");if(Ye){let De=Ye.dataset.confirmation==="merged"?"merged":"unmerged";P(Ye.dataset.beadId||"",Ye.dataset.attemptId||null,De,Ye.dataset.operationId||null);return}let ot=m?.closest?.(".worker-banner__dismiss");if(ot){let De=ot.dataset.attemptId;De&&G(De);return}if(m?.closest?.(".worker-play")){ie(!Ee().auto_advance);return}let qe=m?.closest?.(".worker-merge-all");if(qe){qe.classList.contains("worker-merge-all--stop")?Ee().auto_merge===!0?h(!1):k():h(!0);return}let p=m?.closest?.(".worker-pane__hd--toggle");if(p){let De=p.dataset.lane;(De==="queue"||De==="done")&&we(De);return}let g=m?.closest?.(".worker-card__place-lane");if(g){let De=g.dataset.beadId,pt=g.dataset.lane;De&&(pt==="parallel"||/^s[1-5]$/.test(pt||""))&&(te=null,X(),je(De,pt));return}if(m?.closest?.(".worker-card__place-cancel")){te=null,X();return}let W=m?.closest?.(".worker-card__place");if(W){let De=W.dataset.beadId;De&&!W.disabled&&(nt()?(te=De,X()):je(De,"parallel"));return}let ve=m?.closest?.(".worker-filter__chip");if(ve){let De=ve.dataset.spec;(De==="all"||De==="with"||De==="without")&&nr({...j,spec:De});return}let be=m?.closest?.(".worker-mini__merge");if(be){let De=be.dataset.beadId||"";Ee().cleanup_failed?.[De]?st(De):Ne(De);return}let Ce=m?.closest?.(".worker-mini__merge-cancel");if(Ce){$(Ce.dataset.beadId||"");return}let Fe=m?.closest?.(".worker-mini__discard");if(Fe){P(Fe.dataset.beadId||"",Fe.dataset.attemptId||null,Fe.dataset.discardMode==="merged"?"merged":"unmerged",Fe.dataset.operationId||null);return}let gt=m?.closest?.(".worker-mini__stale-continue");if(gt){V("worker-stale-work-continue",gt.dataset.beadId||"",gt.dataset.actionId||"");return}let lr=m?.closest?.(".worker-mini__stale-backup");if(lr){V("worker-stale-work-backup-fresh",lr.dataset.beadId||"",lr.dataset.actionId||"");return}let Vr=m?.closest?.(".worker-mini__stale-recheck");if(Vr){V("worker-stale-work-recheck",Vr.dataset.beadId||"",Vr.dataset.actionId||"");return}let Yn=m?.closest?.(".worker-mini__revise-fix");if(Yn){Y("worker-revise-fix",Yn.dataset.beadId||"");return}let _n=m?.closest?.(".worker-mini__revise-approve");if(_n){Y("worker-revise-approve",_n.dataset.beadId||"");return}if(m?.closest?.(".worker-mini__pr"))return;if(m?.closest?.(".rtile__discard")){let De=m?.closest?.(".rtile"),pt=De?.dataset?.beadId,Kr=De?.dataset?.attemptId;pt&&P(pt,Kr||null,"unmerged",m?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(m?.closest?.(".rtile__dismiss")){let pt=m?.closest?.(".rtile")?.dataset?.attemptId;pt&&G(pt);return}if(m?.closest?.(".rtile__pause")){let pt=m?.closest?.(".rtile")?.dataset?.attemptId;pt&&ct(pt);return}if(m?.closest?.(".rtile__resume")){let pt=m?.closest?.(".rtile")?.dataset?.attemptId;pt&&Ze(pt);return}if(m?.closest?.(".rtile__session")){let pt=m?.closest?.(".rtile")?.dataset?.attemptId;pt&&ir(pt);return}if(m?.closest?.(".worker-drawer-overlay__backdrop")){Re.close(),xe.close();return}if(m?.closest?.(".worker-drawer-host"))return;let mn=m?.closest?.(".rtile");if(mn){if(m?.closest?.(".rtile__id")){let pt=mn.dataset.beadId;pt&&Zt(pt).then(Kr=>{Kr?se("\uBCF5\uC0AC\uB428","success",1200):se("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let De=mn.dataset.beadId;De&&u&&u(De);return}let Zn=m?.closest?.(".worker-mini, .worker-card");if(Zn){let De=Zn.dataset.beadId;if(m?.closest?.(".worker-mini__id, .worker-card__id")){De&&Zt(De).then(pt=>{pt?se("\uBCF5\uC0AC\uB428","success",1200):se("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}De&&u&&u(De)}}return e.addEventListener("pointerdown",yt),e.addEventListener("dragstart",Xe),e.addEventListener("dragover",Et),e.addEventListener("dragleave",Ht),e.addEventListener("drop",Ot),e.addEventListener("click",ye),e.addEventListener("change",fr),Le(),$e(),y&&D.push(y.subscribe(()=>{for(let[l,m]of M)m==="failed"&&M.delete(l);X()})),s&&D.push(s.subscribe(()=>{let l=d&&d()||"";l!==he&&(he=l,Ae.close()),X(),Pt()})),o&&typeof o.subscribe=="function"&&D.push(o.subscribe(()=>{Pt(),X()})),X(),{load(){X()},destroy(){for(let l of D.splice(0))try{l()}catch{}e.removeEventListener("pointerdown",yt),e.removeEventListener("dragstart",Xe),e.removeEventListener("dragover",Et),e.removeEventListener("dragleave",Ht),e.removeEventListener("drop",Ot),e.removeEventListener("click",ye),e.removeEventListener("change",fr);try{xe.destroy()}catch{}de.hidden=!0;try{rt?.destroy()}catch{}try{Ae.destroy()}catch{}Ge(i``,e)}}}function Pa(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function Vu(e,t,r,n=async()=>{},s=async()=>{}){let o=mt("views:workspace-picker"),a=null,c=!1,u=!1,d=!1;async function f(F){let C=F.target.value,re=t.getState().workspace?.current?.path||"";if(C&&C!==re){o("switching workspace to %s",C),c=!0,R();try{await r(C)}catch(L){o("workspace switch failed: %o",L)}finally{c=!1,R()}}}async function _(){let F=t.getState(),b=F.workspace?.current?.path||F.workspace?.available?.[0]?.path||"";if(!(!b||u)){o("git-pulling workspace %s",b),u=!0,R();try{await n(b)}catch(C){o("workspace git pull failed: %o",C)}finally{u=!1,R()}}}function y(F){let b=F.target;b&&e.contains(b)||I()}function A(F){F.key==="Escape"&&I()}function E(){d||(d=!0,document.addEventListener("mousedown",y),document.addEventListener("keydown",A),R())}function I(){d&&(d=!1,document.removeEventListener("mousedown",y),document.removeEventListener("keydown",A),R())}function j(){d?I():E()}async function te(F){let b=F.target,C=b.value,z=b.checked;o("toggling visibility %s \u2192 %s",C,String(z));try{await s(C,z)}catch(re){o("workspace visibility toggle failed: %o",re)}}function Q(F){return F?i`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${_}
        ?disabled=${c||u}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:i``}function O(F,b){return i`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${j}
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
                ${F.map(C=>i`
                    <label
                      class="workspace-picker__manage-row"
                      title="${C.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${C.path}"
                        .checked=${!b.has(C.path)}
                        @change=${te}
                      />
                      <span class="workspace-picker__manage-name"
                        >${Pa(C.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function M(){let F=t.getState(),b=F.workspace?.current,C=F.workspace?.available||[],z=new Set(F.workspace?.hidden||[]),re=b?.path||C[0]?.path||"";if(C.length===0)return i``;let L=C.filter(D=>!z.has(D.path)||D.path===re);if(L.length<=1){let D=L[0]||C[0],ue=Pa(D.path);return i`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${D.path}"
            >${ue}</span
          >
          ${O(C,z)}
          ${Q(re)}
          ${u?i`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return i`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${f}
          ?disabled=${c||u}
          aria-label="Select project workspace"
        >
          ${L.map(D=>i`
              <option
                value="${D.path}"
                ?selected=${D.path===re}
                title="${D.path}"
              >
                ${Pa(D.path)}
              </option>
            `)}
        </select>
        ${O(C,z)}
        ${Q(re)}
        ${c||u?i`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function R(){Ge(M(),e)}return R(),a=t.subscribe(()=>R()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",y),document.removeEventListener("keydown",A),Ge(i``,e)}}}var Ku=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-serial-lane-count","subscribe-worker-parallel-analysis","unsubscribe-worker-parallel-analysis","worker-parallel-analysis-snapshot","worker-parallel-analysis-targets","worker-parallel-analysis-prompt","worker-parallel-analysis-start","worker-parallel-analysis-cancel","worker-parallel-analysis-settings-update","worker-parallel-analysis-submit","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle"];function Da(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function Yu(e,t,r=Da()){return{id:r,type:e,payload:t}}function Zu(e={}){let t=mt("ws"),r={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},n=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,c=null,u=!0,d=new Map,f=[],_=new Map,y=new Set;function A(M){for(let R of Array.from(y))try{R(M)}catch{}}function E(){if(!u||c)return;o="reconnecting",t("ws reconnecting\u2026"),A(o);let M=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,a)),R=(r.jitterRatio||0)*M,F=Math.max(0,Math.round(M+(Math.random()*2-1)*R));t("ws retry in %d ms (attempt %d)",F,a+1),c=setTimeout(()=>{c=null,O()},F)}function I(M){try{s?.send(JSON.stringify(M))}catch(R){t("ws send failed",R)}}function j(){for(o="open",t("ws open"),A(o),a=0;f.length;){let M=f.shift();M&&I(M)}}function te(M){let R;try{R=JSON.parse(String(M.data))}catch{t("ws received non-JSON message");return}if(!R||typeof R.id!="string"||typeof R.type!="string"){t("ws received invalid envelope");return}if(d.has(R.id)){let b=d.get(R.id);d.delete(R.id),R.ok?b?.resolve(R.payload):b?.reject(R.error||new Error("ws error"));return}let F=_.get(R.type);if(F&&F.size>0)for(let b of Array.from(F))try{b(R.payload)}catch(C){t("ws event handler error",C)}else t("ws received unhandled message type: %s",R.type)}function Q(){o="closed",t("ws closed"),A(o);for(let[M,R]of d.entries())R.reject(new Error("ws disconnected")),d.delete(M);a+=1,E()}function O(){if(!u)return;let M=n();try{s=new WebSocket(M),t("ws connecting %s",M),o="connecting",A(o),s.addEventListener("open",j),s.addEventListener("message",te),s.addEventListener("error",()=>{}),s.addEventListener("close",Q)}catch(R){t("ws connect failed %o",R),E()}}return O(),{send(M,R){if(!Ku.includes(M))return Promise.reject(new Error(`unknown message type: ${M}`));let F=Da(),b=Yu(M,R,F);return t("send %s id=%s",M,F),new Promise((C,z)=>{d.set(F,{resolve:C,reject:z,type:M}),s&&s.readyState===s.OPEN?I(b):(t("queue %s id=%s (state=%s)",M,F,o),f.push(b))})},on(M,R){_.has(M)||_.set(M,new Set);let F=_.get(M);return F?.add(R),()=>{F?.delete(R)}},onConnection(M){return y.add(M),()=>{y.delete(M)}},reconnect(){u=!0,c&&(clearTimeout(c),c=null),a=0,O()},close(){u=!1,c&&(clearTimeout(c),c=null);try{s?.close()}catch{}},getState(){return o}}}function Rg(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function Ig(e,t){try{let n=await(await fetch("/api/config")).json();e.setState({config:n})}catch(r){t("config refresh failed",r)}}var Na=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Xu=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:closed","closed-issues"]],Rr="tab:worker:closed",Lg="bdui.worker.done-range",Qu=nu,Ju="worker:queue",ed="worker:parallel-analysis",td="ui:order",rd="ui:display-policy",nd="exec:presets",Ir="tab:board:closed",sd="beads-ui.board.closed-range";function Og(e){let t=mt("main");t("bootstrap start");let r=i`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Ge(r,e);let n=document.getElementById("global-nav"),s=document.getElementById("top-nav"),o=document.getElementById("repo-scope"),a=document.getElementById("usage-meter"),c=document.getElementById("board-root"),u=document.getElementById("worker-root"),d=document.getElementById("monitor-root"),f=document.getElementById("detail-panel");if(a&&ku(a),c&&u&&d&&f){let We=function(p,g){let x="Request failed",W="";if(p&&typeof p=="object"){let be=p;if(typeof be.message=="string"&&be.message.length>0&&(x=be.message),typeof be.details=="string")W=be.details;else if(be.details&&typeof be.details=="object")try{W=JSON.stringify(be.details,null,2)}catch{W=""}}else typeof p=="string"&&p.length>0&&(x=p);let ve=g&&g.length>0?`Failed to load ${g}`:"Request failed";Me.open(ve,x,W)},ee=function(p){return`${tt.getState().workspace.current?.path||""}\0${p}`},Ne=function(){ne&&(ne().catch(()=>{}),ne=null),Oe=null,je=null},pe=function(p){He=p;let g=()=>{He!==p||tt.getState().selected_id!==p||(He=null,st(p))};if(!Ze){ct.then(g);return}g()},P=function(p,g,x,W,ve){return x!==k[g]?(ve().catch(()=>{}),!1):(p.set(W,ve),!0)},Y=function(){let p=tt.getState();Ie(p.view==="board"),me(p.view==="worker"),we(p.view==="monitor"),T(p.view==="board"||p.view==="worker"||V||!!p.selected_id)},Be=function(){let p=Nr(ie);return p===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:p}}},fe=function(){let p=Nr(ce);return p===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:p}}},Ie=function(p){if(p)for(let[g,x]of Na){if(h.has(g)||$.has(g))continue;let W=g===Ir?Be():{type:x};try{Ae.register(g,W)}catch(Ce){t("register %s store failed: %o",g,Ce)}$.add(g);let ve=k.board,be=!1;Re.subscribeList(g,W).then(Ce=>{be=!P(h,"board",ve,g,Ce)}).catch(Ce=>{t("subscribe %s failed: %o",g,Ce),We(Ce,"board")}).finally(()=>{$.delete(g),be&&Y()})}else et()},et=function(){k.board+=1;for(let[p]of Na){let g=h.get(p);g&&(g().catch(()=>{}),h.delete(p));try{Ae.unregister(p)}catch(x){t("unregister %s failed: %o",p,x)}}},me=function(p){if(!p){w();return}for(let[g,x]of Xu){if(U.has(g)||$.has(g))continue;let W=g===Rr?fe():{type:x};try{Ae.register(g,W)}catch(Ce){t("register %s store failed: %o",g,Ce)}$.add(g);let ve=k.worker,be=!1;Re.subscribeList(g,W).then(Ce=>{be=!P(U,"worker",ve,g,Ce)}).catch(Ce=>{t("subscribe %s failed: %o",g,Ce),We(Ce,"worker")}).finally(()=>{$.delete(g),be&&Y()})}},w=function(){k.worker+=1;for(let[p]of Xu){let g=U.get(p);g&&(g().catch(()=>{}),U.delete(p));try{Ae.unregister(p)}catch(x){t("unregister %s failed: %o",p,x)}}},T=function(p){if(!p){N();return}J||(xe("subscribe-worker-queue",{id:Ju}).catch(g=>{t("subscribe-worker-queue failed: %o",g)}),xe("subscribe-worker-parallel-analysis",{id:ed}).catch(g=>{t("subscribe-worker-parallel-analysis failed: %o",g)}),J=()=>(xe("unsubscribe-worker-parallel-analysis",{id:ed}),xe("unsubscribe-worker-queue",{id:Ju})))},N=function(){J&&(J().catch(()=>{}),J=null),ze.clear()},we=function(p){if(!p){X();return}Z||(xe("subscribe-monitor-pipeline",{id:Qu}).catch(g=>{t("subscribe-monitor-pipeline failed: %o",g)}),Z=()=>xe("unsubscribe-monitor-pipeline",{id:Qu}))},X=function(){Z&&(Z().catch(()=>{}),Z=null)},Le=function(){$e||(xe("subscribe-ui-order",{id:td}).catch(p=>{t("subscribe-ui-order failed: %o",p)}),$e=()=>xe("unsubscribe-ui-order",{id:td}))},ht=function(){$e&&($e().catch(()=>{}),$e=null),Ee.clear()},Xe=function(){yt||(xe("subscribe-display-policy",{id:rd}).catch(p=>{t("subscribe-display-policy failed: %o",p)}),yt=()=>xe("unsubscribe-display-policy",{id:rd}))},Et=function(){yt&&(yt().catch(()=>{}),yt=null),nt.clear()},wt=function(){Ht||(xe("subscribe-impl-presets",{id:nd}).catch(p=>{t("subscribe-impl-presets failed: %o",p)}),Ht=()=>xe("unsubscribe-impl-presets",{id:nd}))},kt=function(p){if(!p)return"Unknown";let g=p.split("/").filter(Boolean);return g.length>0?g[g.length-1]:"Unknown"};var _=We,y=ee,A=Ne,E=pe,I=P,j=Y,te=Be,Q=fe,O=Ie,M=et,R=me,F=w,b=T,C=N,z=we,re=X,L=Le,D=ht,ue=Xe,_e=Et,de=wt,Ue=kt;let Je=document.getElementById("header-loading"),Ke=Gi(Je),Me=wc(e),le=Zu(),xe=Ke.wrapSend((p,g)=>le.send(p,g)),Re=qi(xe),Ae=Fi(),he=Ui(),ze=Bi(),rt=$i(),Ee=ji(),nt=wi(),K=ki(),B=xi();le.on("impl-presets-snapshot",p=>{let g=p;g&&typeof g.revision=="number"&&Array.isArray(g.presets)&&K.set({revision:g.revision,presets:g.presets})}),le.on("monitor-pipeline-snapshot",p=>{let g=p;if(!(!g||!Array.isArray(g.workspaces)))try{rt.set(g.workspaces,g.workspaces_state)}catch{}}),le.on("ui-order-snapshot",p=>{let g=p;if(g&&typeof g.revision=="number")try{Ee.set({revision:g.revision,order:g.order&&typeof g.order=="object"?g.order:{}})}catch{}}),le.on("display-policy-snapshot",p=>{let g=p;if(g&&g.policy&&typeof g.policy=="object")try{nt.set(g.policy)}catch{}}),le.on("session-log-snapshot",p=>{let g=p;if(g&&typeof g.id=="string")try{B.set(g.id,Array.isArray(g.lines)?g.lines:[],typeof g.last_event_at=="number"?g.last_event_at:null)}catch{}}),le.on("session-log-append",p=>{let g=p;if(g&&typeof g.id=="string")try{B.append(g.id,g.event)}catch{}}),le.on("snapshot",p=>{let g=p,x=g&&typeof g.id=="string"?g.id:"",W=x?Ae.getStore(x):null;if(W&&g&&g.type==="snapshot")try{W.applyPush(g)}catch{}}),le.on("upsert",p=>{let g=p,x=g&&typeof g.id=="string"?g.id:"",W=x?Ae.getStore(x):null;if(W&&g&&g.type==="upsert")try{W.applyPush(g)}catch{}}),le.on("delete",p=>{let g=p,x=g&&typeof g.id=="string"?g.id:"",W=x?Ae.getStore(x):null;if(W&&g&&g.type==="delete")try{W.applyPush(g)}catch{}});let ne=null,Oe=null,je=null,He=null,Te=()=>{},ct=new Promise(p=>{Te=()=>p(void 0)}),Ze=!1,G=!1;async function st(p){let g=ee(p);if(g===Oe||g===je)return;je=g;let x=`detail:${p}`,W={type:"issue-detail",params:{id:p}};try{Ae.register(x,W)}catch(ve){t("register detail store failed: %o",ve)}try{let ve=await Re.subscribeList(x,W);if(tt.getState().selected_id!==p||ee(p)!==g){await ve().catch(()=>{});return}ne&&await ne().catch(()=>{}),ne=ve,Oe=g}catch(ve){t("detail subscribe failed: %o",ve),We(ve,"issue details")}finally{je===g&&(je=null)}}let h=new Map,$=new Set,k={board:0,worker:0},V=!1,ie=Nt;try{let p=window.localStorage.getItem(sd);Ut(p)&&(ie=p)}catch{}let ce=Nt;try{let p=window.localStorage.getItem(Lg);Ut(p)&&(ce=p)}catch{}async function Se(p){if(!Ut(p)||p===ie)return;ie=p;try{window.localStorage.setItem(sd,p)}catch{}let g=h.get(Ir);if(!g)return;h.delete(Ir),await g().catch(()=>{});let x=Be();try{Ae.register(Ir,x)}catch(W){t("register %s store failed: %o",Ir,W)}try{let W=await Re.subscribeList(Ir,x);h.set(Ir,W)}catch(W){t("re-subscribe %s failed: %o",Ir,W),We(W,"board")}}async function Pe(p){if(!Ut(p)||p===ce)return;ce=p;let g=U.get(Rr);if(!g)return;U.delete(Rr),await g().catch(()=>{});let x=fe();try{Ae.register(Rr,x)}catch(W){t("register %s store failed: %o",Rr,W)}try{let W=await Re.subscribeList(Rr,x);U.set(Rr,W)}catch(W){t("re-subscribe %s failed: %o",Rr,W),We(W,"worker")}}let U=new Map,J=null,Z=null,$e=null,yt=null,Ht=null;async function Ot(){yt=null,nt.clear(),Ht=null,K.clear(),J=null,Z=null,h.clear(),U.clear(),k.board+=1,k.worker+=1,wt();let p=tt.getState().workspace.current?.path;if(p)try{await le.send("set-workspace",{path:p})}catch(x){t("workspace restore after reconnect failed: %o",x);return}Xe();let g=tt.getState();Ie(g.view==="board"),me(g.view==="worker"),we(g.view==="monitor"),T(g.view==="board"||g.view==="worker"||!!g.selected_id)}async function nr(){t("clearing all subscriptions for workspace switch"),et(),w(),N(),he.clear(),ht(),Le(),Et(),Xe(),Ne();let p=tt.getState();if(p.selected_id)try{Ae.unregister(`detail:${p.selected_id}`)}catch{}let g=tt.getState();Ie(g.view==="board"),me(g.view==="worker"),we(g.view==="monitor"),T(g.view==="board"||g.view==="worker"||!!g.selected_id),g.selected_id&&pe(g.selected_id)}async function sr(p){t("requesting workspace switch to %s",p),G=!0;try{let g=await le.send("set-workspace",{path:p});t("workspace switch result: %o",g),g&&g.workspace&&(tt.setState({workspace:{current:{path:g.workspace.root_dir,database:g.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",p),g.changed&&(await nr(),se("Switched to "+kt(p),"success",2e3)))}catch(g){throw t("workspace switch failed: %o",g),se("Failed to switch workspace","error",3e3),g}finally{G=!1}}async function or(p){t("requesting workspace git pull for %s",p);try{let g=await le.send("git-pull-workspace",{});t("workspace git pull result: %o",g);let x=g?.status;if(x==="up_to_date"){se("Already up to date","success",2e3);return}if(x==="stash_pop_conflict"){se("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}se("Git pulled "+kt(p),"success",2e3)}catch(g){t("workspace git pull failed: %o",g);let x=g?.code,W=g?.message;if(x==="rebase_conflict"){se("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(x==="rebase_conflict_abort_failed"){se("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(x==="busy"){se("Git pull skipped: another operation is running","warning",3e3);return}let ve=W?`: ${W}`:"";throw se(`Git pull failed${ve}`,"error",3e3),g}}async function fr(p,g){t("setting workspace visibility %s \u2192 %s",p,String(g));try{await le.send("set-workspace-visibility",{path:p,visible:g}),await Gt()}catch(x){t("workspace visibility update failed: %o",x),se("Failed to update project visibility","error",3e3)}}async function Gt(){try{let p=await le.send("list-workspaces",{});if(t("workspaces loaded: %o",p),p&&Array.isArray(p.workspaces)){let g=p.workspaces.map(be=>({path:be.path,database:be.database,pid:be.pid,version:be.version})),x=p.current?{path:p.current.root_dir,database:p.current.db_path}:null,W=Array.isArray(p.hidden)?p.hidden.filter(be=>typeof be=="string"):[];tt.setState({workspace:{current:x,available:g,hidden:W}});let ve=window.localStorage.getItem("beads-ui.workspace");ve&&(!g.some(Ce=>Ce.path===ve)||W.includes(ve)?window.localStorage.removeItem("beads-ui.workspace"):x&&ve!==x.path&&(t("restoring saved workspace preference: %s",ve),await sr(ve)))}}catch(p){t("failed to load workspaces: %o",p)}}le.on("workspace-changed",p=>{t("workspace-changed event: %o",p),p&&p.root_dir&&(tt.setState({workspace:{current:{path:p.root_dir,database:p.db_path}}}),Gt(),nr())});let ar=!1;if(typeof le.onConnection=="function"){let p=g=>{t("ws state %s",g),g==="reconnecting"||g==="closed"?(ar=!0,se("Connection lost. Reconnecting\u2026","error",4e3)):g==="open"&&ar&&(ar=!1,se("Reconnected","success",2200),Ig(tt,(x,W)=>{t(`${x}: %o`,W)}),Ot())};le.onConnection(p)}let ir="board";try{let p=window.localStorage.getItem("beads-ui.view");(p==="board"||p==="worker"||p==="monitor")&&(ir=p)}catch(p){t("view parse error: %o",p)}let tt=Hi({config:Rg(),view:ir});le.on("worker-queue-snapshot",p=>{let g=p;if(!g||!g.queue)return;let x=tt.getState().workspace.current?.path;if(typeof x=="string"&&x.length>0&&g.root_dir!==x){t("dropping worker-queue snapshot for %s",String(g.root_dir));return}try{he.set(g.queue)}catch{}}),le.on("worker-parallel-analysis-snapshot",p=>{let g=p;if(!g)return;let x=tt.getState().workspace.current?.path;if(!(typeof x=="string"&&x.length>0&&typeof g.root_dir=="string"&&g.root_dir!==x))try{ze.set({settings:g.settings,job:g.job??null,runs:Array.isArray(g.runs)?g.runs:[],last_good:g.last_good??null})}catch{}});let Pt=Wi(tt);Pt.start();let ye=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults"]),l=async(p,g)=>{try{return await xe(p,g)}catch(x){if(ye.has(p))throw x;return[]}};ou({global_element:n,repo_element:s},tt,Pt);let m=document.getElementById("workspace-picker");m&&Vu(m,tt,sr,or,fr);let S=cu(e,(p,g)=>xe(p,g));try{let p=document.getElementById("new-issue-btn");p&&p.addEventListener("click",()=>S.open())}catch{}let H=fu(e,{policyStore:nt,queueStore:he,implPresetStore:K,transport:(p,g)=>xe(p,g),onOpenChange:p=>{V=p,Y()},labelOptions:()=>{let p=new Set;for(let[g]of Na)for(let x of Ae.snapshotFor(g)||[]){let W=x.labels;if(Array.isArray(W))for(let ve of W)typeof ve=="string"&&ve.length>0&&p.add(ve)}return Array.from(p).sort()}});try{let p=document.getElementById("display-settings-btn");p&&(p.setAttribute("aria-label","\uC124\uC815"),p.setAttribute("title","\uC124\uC815"),p.addEventListener("click",()=>H.open()))}catch{}let oe=nl(c,{gotoIssue:p=>Pt.gotoIssue(p),issueStores:Ae,transport:l,workerQueueStore:he,uiOrderStore:Ee,displayPolicyStore:nt,closedRange:ie,onClosedRangeChange:p=>{Se(p)},onNewIssue:()=>S.open()}),ke=Ma(u,{transport:l,issueStores:Ae,queueStore:he,analysisStore:ze,sessionLogStore:B,uiOrderStore:Ee,gotoIssue:p=>tt.setState({selected_id:p}),getWorkspacePath:()=>tt.getState().workspace.current?.path,doneRange:ce,onDoneRangeChange:p=>{Pe(p)}}),ge=su(d,{transport:l,pipelineStore:rt,execPresetStore:K,gotoIssue:p=>Pt.gotoIssue(p),getWorkspacePath:()=>tt.getState().workspace.current?.path,switchWorkspace:p=>sr(p)}),Ye=vc(f,{issueStores:Ae,transport:l,queueStore:he,execPresetStore:K,sessionLogStore:B,getWorkspacePath:()=>tt.getState().workspace.current?.path,onNavigate:p=>{tt.getState().view==="worker"?tt.setState({selected_id:p}):Pt.gotoIssue(p)},onClose:()=>{let p=tt.getState();tt.setState({selected_id:null});try{Pt.gotoView(p.view==="worker"||p.view==="monitor"?p.view:"board")}catch{}},onOpenExecPresets:()=>{H.open("execution")}}),ot=tt.getState().selected_id;ot&&(f.hidden=!1,Ye.load(ot),pe(ot)),tt.subscribe(p=>{let g=p.selected_id;g?(f.hidden=!1,Ye.load(g),G||pe(g)):(Ye.clear(),f.hidden=!0,Ne())});let qe=p=>{c.hidden=p.view!=="board",u.hidden=p.view!=="worker",d.hidden=p.view!=="monitor",o&&o.classList.toggle("is-quiet",p.view==="monitor"),Ie(p.view==="board"),me(p.view==="worker"),we(p.view==="monitor"),T(p.view==="board"||p.view==="worker"||V||!!p.selected_id),!p.selected_id&&p.view==="board"&&oe.load(),p.view==="worker"&&ke.load(),p.view==="monitor"?ge.load():ge.pause(),window.localStorage.setItem("beads-ui.view",p.view)};tt.subscribe(qe),qe(tt.getState()),Le(),Xe(),wt(),Gt().finally(()=>{Ze=!0,Te()}),window.addEventListener("keydown",p=>{let g=p.ctrlKey||p.metaKey,x=String(p.key||"").toLowerCase(),W=p.target,ve=W&&W.tagName?String(W.tagName).toLowerCase():"",be=ve==="input"||ve==="textarea"||ve==="select"||W&&typeof W.isContentEditable=="boolean"&&W.isContentEditable;g&&x==="n"&&(be||(p.preventDefault(),S.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let r=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let t=document.getElementById("app");t&&Og(t)});export{Og as bootstrap,Rg as readBootstrapConfig,Ig as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
