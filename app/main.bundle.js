var Cd=Object.create;var yo=Object.defineProperty;var Rd=Object.getOwnPropertyDescriptor;var Id=Object.getOwnPropertyNames;var Ld=Object.getPrototypeOf,Od=Object.prototype.hasOwnProperty;var Md=(e,t,r)=>t in e?yo(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var vo=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Pd=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Id(t))!Od.call(e,s)&&s!==r&&yo(e,s,{get:()=>t[s],enumerable:!(n=Rd(t,s))||n.enumerable});return e};var Dd=(e,t,r)=>(r=e!=null?Cd(Ld(e)):{},Pd(t||!e||!e.__esModule?yo(r,"default",{value:e,enumerable:!0}):r,e));var lt=(e,t,r)=>Md(e,typeof t!="symbol"?t+"":t,r);var Ri=vo((Jg,Ci)=>{var Jr=1e3,en=Jr*60,tn=en*60,Fr=tn*24,Fd=Fr*7,jd=Fr*365.25;Ci.exports=function(e,t){t=t||{};var r=typeof e;if(r==="string"&&e.length>0)return Bd(e);if(r==="number"&&isFinite(e))return t.long?Wd(e):Ud(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function Bd(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*jd;case"weeks":case"week":case"w":return r*Fd;case"days":case"day":case"d":return r*Fr;case"hours":case"hour":case"hrs":case"hr":case"h":return r*tn;case"minutes":case"minute":case"mins":case"min":case"m":return r*en;case"seconds":case"second":case"secs":case"sec":case"s":return r*Jr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function Ud(e){var t=Math.abs(e);return t>=Fr?Math.round(e/Fr)+"d":t>=tn?Math.round(e/tn)+"h":t>=en?Math.round(e/en)+"m":t>=Jr?Math.round(e/Jr)+"s":e+"ms"}function Wd(e){var t=Math.abs(e);return t>=Fr?fs(e,t,Fr,"day"):t>=tn?fs(e,t,tn,"hour"):t>=en?fs(e,t,en,"minute"):t>=Jr?fs(e,t,Jr,"second"):e+" ms"}function fs(e,t,r,n){var s=t>=r*1.5;return Math.round(e/r)+" "+n+(s?"s":"")}});var Li=vo((eb,Ii)=>{function zd(e){r.debug=r,r.default=r,r.coerce=u,r.disable=a,r.enable=s,r.enabled=c,r.humanize=Ri(),r.destroy=d,Object.keys(e).forEach(f=>{r[f]=e[f]}),r.names=[],r.skips=[],r.formatters={};function t(f){let _=0;for(let h=0;h<f.length;h++)_=(_<<5)-_+f.charCodeAt(h),_|=0;return r.colors[Math.abs(_)%r.colors.length]}r.selectColor=t;function r(f){let _,h=null,$,A;function O(...W){if(!O.enabled)return;let te=O,ee=Number(new Date),D=ee-(_||ee);te.diff=D,te.prev=_,te.curr=ee,_=ee,W[0]=r.coerce(W[0]),typeof W[0]!="string"&&W.unshift("%O");let N=0;W[0]=W[0].replace(/%([a-zA-Z%])/g,(j,b)=>{if(j==="%%")return"%";N++;let E=r.formatters[b];if(typeof E=="function"){let V=W[N];j=E.call(te,V),W.splice(N,1),N--}return j}),r.formatArgs.call(te,W),(te.log||r.log).apply(te,W)}return O.namespace=f,O.useColors=r.useColors(),O.color=r.selectColor(f),O.extend=n,O.destroy=r.destroy,Object.defineProperty(O,"enabled",{enumerable:!0,configurable:!1,get:()=>h!==null?h:($!==r.namespaces&&($=r.namespaces,A=r.enabled(f)),A),set:W=>{h=W}}),typeof r.init=="function"&&r.init(O),O}function n(f,_){let h=r(this.namespace+(typeof _>"u"?":":_)+f);return h.log=this.log,h}function s(f){r.save(f),r.namespaces=f,r.names=[],r.skips=[];let _=(typeof f=="string"?f:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let h of _)h[0]==="-"?r.skips.push(h.slice(1)):r.names.push(h)}function o(f,_){let h=0,$=0,A=-1,O=0;for(;h<f.length;)if($<_.length&&(_[$]===f[h]||_[$]==="*"))_[$]==="*"?(A=$,O=h,$++):(h++,$++);else if(A!==-1)$=A+1,O++,h=O;else return!1;for(;$<_.length&&_[$]==="*";)$++;return $===_.length}function a(){let f=[...r.names,...r.skips.map(_=>"-"+_)].join(",");return r.enable(""),f}function c(f){for(let _ of r.skips)if(o(f,_))return!1;for(let _ of r.names)if(o(f,_))return!0;return!1}function u(f){return f instanceof Error?f.stack||f.message:f}function d(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}Ii.exports=zd});var Oi=vo((Mt,_s)=>{Mt.formatArgs=Gd;Mt.save=Vd;Mt.load=Kd;Mt.useColors=Hd;Mt.storage=Yd();Mt.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();Mt.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Hd(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Gd(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+_s.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let r=0,n=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),e.splice(n,0,t)}Mt.log=console.debug||console.log||(()=>{});function Vd(e){try{e?Mt.storage.setItem("debug",e):Mt.storage.removeItem("debug")}catch{}}function Kd(){let e;try{e=Mt.storage.getItem("debug")||Mt.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function Yd(){try{return localStorage}catch{}}_s.exports=Li()(Mt);var{formatters:Zd}=_s.exports;Zd.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var yn=globalThis,is=yn.trustedTypes,_i=is?is.createPolicy("lit-html",{createHTML:e=>e}):void 0,ko="$lit$",mr=`lit$${Math.random().toFixed(9).slice(2)}$`,$o="?"+mr,Nd=`<${$o}>`,Pr=document,vn=()=>Pr.createComment(""),wn=e=>e===null||typeof e!="object"&&typeof e!="function",xo=Array.isArray,vi=e=>xo(e)||typeof e?.[Symbol.iterator]=="function",wo=`[ 	
\f\r]`,hn=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,mi=/-->/g,gi=/>/g,Or=RegExp(`>|${wo}(?:([^\\s"'>=/]+)(${wo}*=${wo}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),bi=/'/g,hi=/"/g,wi=/^(?:script|style|textarea|title)$/i,Ao=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),i=Ao(1),xr=Ao(2),Gg=Ao(3),Wt=Symbol.for("lit-noChange"),bt=Symbol.for("lit-nothing"),yi=new WeakMap,Mr=Pr.createTreeWalker(Pr,129);function ki(e,t){if(!xo(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return _i!==void 0?_i.createHTML(t):t}var $i=(e,t)=>{let r=e.length-1,n=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=hn;for(let c=0;c<r;c++){let u=e[c],d,f,_=-1,h=0;for(;h<u.length&&(a.lastIndex=h,f=a.exec(u),f!==null);)h=a.lastIndex,a===hn?f[1]==="!--"?a=mi:f[1]!==void 0?a=gi:f[2]!==void 0?(wi.test(f[2])&&(s=RegExp("</"+f[2],"g")),a=Or):f[3]!==void 0&&(a=Or):a===Or?f[0]===">"?(a=s??hn,_=-1):f[1]===void 0?_=-2:(_=a.lastIndex-f[2].length,d=f[1],a=f[3]===void 0?Or:f[3]==='"'?hi:bi):a===hi||a===bi?a=Or:a===mi||a===gi?a=hn:(a=Or,s=void 0);let $=a===Or&&e[c+1].startsWith("/>")?" ":"";o+=a===hn?u+Nd:_>=0?(n.push(d),u.slice(0,_)+ko+u.slice(_)+mr+$):u+mr+(_===-2?c:$)}return[ki(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},kn=class e{constructor({strings:t,_$litType$:r},n){let s;this.parts=[];let o=0,a=0,c=t.length-1,u=this.parts,[d,f]=$i(t,r);if(this.el=e.createElement(d,n),Mr.currentNode=this.el.content,r===2||r===3){let _=this.el.content.firstChild;_.replaceWith(..._.childNodes)}for(;(s=Mr.nextNode())!==null&&u.length<c;){if(s.nodeType===1){if(s.hasAttributes())for(let _ of s.getAttributeNames())if(_.endsWith(ko)){let h=f[a++],$=s.getAttribute(_).split(mr),A=/([.?@])?(.*)/.exec(h);u.push({type:1,index:o,name:A[2],strings:$,ctor:A[1]==="."?cs:A[1]==="?"?us:A[1]==="@"?ds:Nr}),s.removeAttribute(_)}else _.startsWith(mr)&&(u.push({type:6,index:o}),s.removeAttribute(_));if(wi.test(s.tagName)){let _=s.textContent.split(mr),h=_.length-1;if(h>0){s.textContent=is?is.emptyScript:"";for(let $=0;$<h;$++)s.append(_[$],vn()),Mr.nextNode(),u.push({type:2,index:++o});s.append(_[h],vn())}}}else if(s.nodeType===8)if(s.data===$o)u.push({type:2,index:o});else{let _=-1;for(;(_=s.data.indexOf(mr,_+1))!==-1;)u.push({type:7,index:o}),_+=mr.length-1}o++}}static createElement(t,r){let n=Pr.createElement("template");return n.innerHTML=t,n}};function Dr(e,t,r=e,n){if(t===Wt)return t;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=wn(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(t=Dr(e,s._$AS(e,t.values),s,n)),t}var ls=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:n}=this._$AD,s=(t?.creationScope??Pr).importNode(r,!0);Mr.currentNode=s;let o=Mr.nextNode(),a=0,c=0,u=n[0];for(;u!==void 0;){if(a===u.index){let d;u.type===2?d=new Qr(o,o.nextSibling,this,t):u.type===1?d=new u.ctor(o,u.name,u.strings,this,t):u.type===6&&(d=new ps(o,this,t)),this._$AV.push(d),u=n[++c]}a!==u?.index&&(o=Mr.nextNode(),a++)}return Mr.currentNode=Pr,s}p(t){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}},Qr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,n,s){this.type=2,this._$AH=bt,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=Dr(this,t,r),wn(t)?t===bt||t==null||t===""?(this._$AH!==bt&&this._$AR(),this._$AH=bt):t!==this._$AH&&t!==Wt&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):vi(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==bt&&wn(this._$AH)?this._$AA.nextSibling.data=t:this.T(Pr.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=kn.createElement(ki(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new ls(s,this),a=o.u(this.options);o.p(r),this.T(a),this._$AH=o}}_$AC(t){let r=yi.get(t.strings);return r===void 0&&yi.set(t.strings,r=new kn(t)),r}k(t){xo(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of t)s===r.length?r.push(n=new e(this.O(vn()),this.O(vn()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Nr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,n,s,o){this.type=1,this._$AH=bt,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=bt}_$AI(t,r=this,n,s){let o=this.strings,a=!1;if(o===void 0)t=Dr(this,t,r,0),a=!wn(t)||t!==this._$AH&&t!==Wt,a&&(this._$AH=t);else{let c=t,u,d;for(t=o[0],u=0;u<o.length-1;u++)d=Dr(this,c[n+u],r,u),d===Wt&&(d=this._$AH[u]),a||(a=!wn(d)||d!==this._$AH[u]),d===bt?t=bt:t!==bt&&(t+=(d??"")+o[u+1]),this._$AH[u]=d}a&&!s&&this.j(t)}j(t){t===bt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},cs=class extends Nr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===bt?void 0:t}},us=class extends Nr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==bt)}},ds=class extends Nr{constructor(t,r,n,s,o){super(t,r,n,s,o),this.type=5}_$AI(t,r=this){if((t=Dr(this,t,r,0)??bt)===Wt)return;let n=this._$AH,s=t===bt&&n!==bt||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==bt&&(n===bt||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},ps=class{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){Dr(this,t)}},xi={M:ko,P:mr,A:$o,C:1,L:$i,R:ls,D:vi,V:Dr,I:Qr,H:Nr,N:us,U:ds,B:cs,F:ps},qd=yn.litHtmlPolyfillSupport;qd?.(kn,Qr),(yn.litHtmlVersions??(yn.litHtmlVersions=[])).push("3.3.1");var Ge=(e,t,r)=>{let n=r?.renderBefore??t,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new Qr(t.insertBefore(vn(),o),o,void 0,r??{})}return s._$AI(e),s};var Ft="today",ur=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function zt(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function qr(e,t=Date.now()){switch(e){case"today":{let r=new Date(t);return r.setHours(0,0,0,0),r.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function Ai(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Si(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Ei(){let e=null,t=[],r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],n()},clear(){e=null,t=[],n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function Ti(){let e=new Map,t=new Set;function r(s){return s.startsWith("session-log:")?s:`session-log:${s}`}function n(){for(let s of Array.from(t))try{s()}catch{}}return{set(s,o,a=null){e.set(r(s),{lines:Array.isArray(o)?[...o]:[],last_event_at:typeof a=="number"?a:null}),n()},append(s,o){let a=r(s),c=e.get(a)||{lines:[],last_event_at:null};c.lines=[...c.lines,o],c.last_event_at=Date.now(),e.set(a,c),n()},get(s){return e.get(r(s))||null},clear(s){typeof s=="string"?e.delete(r(s)):e.clear(),n()},subscribe(s){return t.add(s),()=>t.delete(s)}}}var Mi=Dd(Oi(),1);function mt(e){return(0,Mi.default)(`beads-ui:${e}`)}function Xt(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function jr(e,t){let r=Xt(e.created_at),n=Xt(t.created_at);if(r!==n)return r<n?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,c=t.id;return a<c?-1:a>c?1:0}function Ni(e,t){let r=Xt(e.created_at),n=Xt(t.created_at);if(r!==n)return r<n?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,c=t.id;return a<c?-1:a>c?1:0}function qi(e,t){let r=Xt(e.updated_at),n=Xt(t.updated_at);if(r!==n)return r<n?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function Fi(e,t){let r=e.priority??2,n=t.priority??2;if(r!==n)return r-n;let s=Xt(e.created_at),o=Xt(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,c=t.id;return a<c?-1:a>c?1:0}function ji(e,t){let r=e.closed_at??0,n=t.closed_at??0;if(r!==n)return r<n?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var Xd=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Pi(e){let t=e&&e.metadata,r=t?t.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Di(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let r=Xd.exec(t);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Bi(e,t){let r=Pi(e),n=Pi(t);if(r!==n)return r<n?-1:1;let s=Di(e),o=Di(t);if(s!==o)return s<o?-1:1;let a=Xt(e&&e.created_at),c=Xt(t&&t.created_at);if(a!==c)return a<c?-1:1;let u=e&&e.id,d=t&&t.id;return u===d?0:String(u)<String(d)?-1:1}var So=2**20;function rn(e,t){let r=e&&e.id;return t&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(t,r)&&typeof t[r]=="number"&&Number.isFinite(t[r])?t[r]:-Xt(e&&e.created_at)}function ms(e){return(t,r)=>{let n=rn(t,e),s=rn(r,e);if(n!==s)return n<s?-1:1;let o=t?.id,a=r?.id;return o<a?-1:o>a?1:0}}function Eo(e,t,r){let n=Array.isArray(e)?e:[],s=n.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?n[o-1]:null,c=o+1<s?n[o+1]:null;if(!a&&!c)return{rank:0};if(!a)return{rank:rn(c,r)-So};if(!c)return{rank:rn(a,r)+So};let u=rn(a,r),d=rn(c,r),f=(u+d)/2;return u<f&&f<d?{rank:f}:{renormalize:n.map((_,h)=>({bead_id:_.id,rank:h*So}))}}function To(e,t={}){let r=mt(`issue-store:${e}`),n=new Map,s=[],o=0,a=new Set,c=!1,u=t.sort||jr;function d(){for(let h of Array.from(a))try{h()}catch{}}function f(){s=Array.from(n.values()).sort(u)}function _(h){if(c||!h||h.id!==e)return;let $=Number(h.revision)||0;if(r("apply %s rev=%d",h.type,$),!($<=o&&h.type!=="snapshot")){if(h.type==="snapshot"){if($<=o)return;n.clear();let A=Array.isArray(h.issues)?h.issues:[];for(let O of A)O&&typeof O.id=="string"&&O.id.length>0&&n.set(O.id,O);f(),o=$,d();return}if(h.type==="upsert"){let A=h.issue;if(A&&typeof A.id=="string"&&A.id.length>0){let O=n.get(A.id);if(!O)n.set(A.id,A);else{let W=Number.isFinite(O.updated_at)?O.updated_at:0,te=Number.isFinite(A.updated_at)?A.updated_at:0;if(W<=te){for(let ee of Object.keys(O))ee in A||delete O[ee];for(let[ee,D]of Object.entries(A))O[ee]=D}}f()}o=$,d()}else if(h.type==="delete"){let A=String(h.issue_id||"");A&&(n.delete(A),f()),o=$,d()}}}return{id:e,subscribe(h){return a.add(h),()=>{a.delete(h)}},applyPush:_,snapshot(){return s},size(){return n.size},getById(h){return n.get(h)},dispose(){c=!0,n.clear(),s=[],a.clear(),o=0}}}function gs(e){let t=String(e.type||"").trim(),r={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];r[o]=String(a)}}let n=new URLSearchParams(r).toString();return n.length>0?`${t}?${n}`:t}function Ui(e){let t=mt("subs"),r=new Map,n=new Map;function s(c,u){t("applyDelta %s +%d ~%d -%d",c,(u.added||[]).length,(u.updated||[]).length,(u.removed||[]).length);let d=n.get(c);if(!d||d.size===0)return;let f=Array.isArray(u.added)?u.added:[],_=Array.isArray(u.updated)?u.updated:[],h=Array.isArray(u.removed)?u.removed:[];for(let $ of Array.from(d)){let A=r.get($);if(!A)continue;let O=A.itemsById;for(let W of f)typeof W=="string"&&W.length>0&&O.set(W,!0);for(let W of _)typeof W=="string"&&W.length>0&&O.set(W,!0);for(let W of h)typeof W=="string"&&W.length>0&&O.delete(W)}}async function o(c,u){let d=gs(u);if(t("subscribe %s key=%s",c,d),!r.has(c))r.set(c,{key:d,itemsById:new Map});else{let _=r.get(c);if(_&&_.key!==d){let h=n.get(_.key);h&&(h.delete(c),h.size===0&&n.delete(_.key)),r.set(c,{key:d,itemsById:new Map})}}n.has(d)||n.set(d,new Set);let f=n.get(d);f&&f.add(c);try{await e("subscribe-list",{id:c,type:u.type,params:u.params})}catch(_){let h=r.get(c)||null;if(h){let $=n.get(h.key);$&&($.delete(c),$.size===0&&n.delete(h.key))}throw r.delete(c),_}return async()=>{t("unsubscribe %s key=%s",c,d);try{await e("unsubscribe-list",{id:c})}catch{}let _=r.get(c)||null;if(_){let h=n.get(_.key);h&&(h.delete(c),h.size===0&&n.delete(_.key))}r.delete(c)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:gs,selectors:{getIds(c){let u=r.get(c);return u?Array.from(u.itemsById.keys()):[]},has(c,u){let d=r.get(c);return d?d.itemsById.has(u):!1},count(c){let u=r.get(c);return u?u.itemsById.size:0},getItemsById(c){let u=r.get(c),d={};if(!u)return d;for(let f of u.itemsById.keys())d[f]=!0;return d}}}}function Wi(){let e=mt("issue-stores"),t=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let u of Array.from(n))try{u()}catch{}}function a(u,d,f){let _=d?gs(d):"",h=r.get(u)||"",$=t.has(u);if(e("register %s key=%s (prev=%s)",u,_,h),$&&h&&_&&h!==_){let A=t.get(u);if(A)try{A.dispose()}catch{}let O=s.get(u);if(O){try{O()}catch{}s.delete(u)}let W=To(u,f);t.set(u,W);let te=W.subscribe(()=>o());s.set(u,te)}else if(!$){let A=To(u,f);t.set(u,A);let O=A.subscribe(()=>o());s.set(u,O)}return r.set(u,_),()=>c(u)}function c(u){e("unregister %s",u),r.delete(u);let d=t.get(u);d&&(d.dispose(),t.delete(u));let f=s.get(u);if(f){try{f()}catch{}s.delete(u)}}return{register:a,unregister:c,getStore(u){return t.get(u)||null},snapshotFor(u){let d=t.get(u);return d?d.snapshot().slice():[]},subscribe(u){return n.add(u),()=>n.delete(u)}}}function zi(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Hi(){let e=null,t=!1,r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},set(s){e=s,n()},isPending(){return t},setPending(s){let o=s===!0;o!==t&&(t=o,n())},clear(){e=null,t=!1,n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function Gi(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Co(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function Qd(e){let t=String(e||""),r=t.startsWith("#")?t.slice(1):t,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let c=new URLSearchParams(s).get("issue");if(c)return decodeURIComponent(c)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function Jd(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function Vi(e){let t=mt("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):Qd(n),a=Jd(n);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let u=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==u&&(window.location.hash=u)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=Co(o,n);t("goto issue %s (view=%s)",n,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?Co(n,o):`#/${n}`;t("goto view %s (id=%s)",n,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var ep=Object.freeze({workspace_config:{default_workspace:null}});function Ki(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:ep.workspace_config.default_workspace}}}function Yi(e={}){let t=mt("state"),r={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:Ki(e.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let a={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?Ki(o.config):r.config},c=a.workspace.current?.path!==r.workspace.current?.path||a.workspace.available.length!==r.workspace.available.length||a.workspace.hidden.length!==r.workspace.hidden.length||a.workspace.hidden.some((d,f)=>d!==r.workspace.hidden[f]),u=a.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;a.selected_id===r.selected_id&&a.view===r.view&&a.filters.status===r.filters.status&&a.filters.search===r.filters.search&&a.filters.type===r.filters.type&&a.board.closed_filter===r.board.closed_filter&&a.worker.selected_parent_id===r.worker.selected_parent_id&&a.worker.show_closed_children.length===r.worker.show_closed_children.length&&a.worker.show_closed_children.every((d,f)=>d===r.worker.show_closed_children[f])&&!c&&!u||(r=a,t("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function Zi(e){let t=mt("activity"),r=0,n=new Map,s=1;function o(){if(!e)return;let d=r>0;e.toggleAttribute("hidden",!d),e.setAttribute("aria-busy",d?"true":"false")}function a(){r+=1,t("start count=%d",r),o()}function c(){let d=r;r=Math.max(0,r-1),d<=0?t("done called but count was already %d",d):t("done count=%d\u2192%d",d,r),o()}function u(d){return async(_,h)=>{let $=s++,A=Date.now();n.set($,{type:_,start_ts:A}),t("request start id=%d type=%s count=%d",$,_,r+1),a();let O=!1,W=()=>{O||(O=!0,n.delete($),c())},te=setTimeout(()=>{O||(t("request TIMEOUT id=%d type=%s elapsed=%dms",$,_,Date.now()-A),W())},3e4);try{let ee=await d(_,h),D=Date.now()-A;return t("request done id=%d type=%s elapsed=%dms",$,_,D),ee}catch(ee){let D=Date.now()-A;throw t("request error id=%d type=%s elapsed=%dms err=%o",$,_,D,ee),ee}finally{clearTimeout(te),W()}}}return o(),{wrapSend:u,start:a,done:c,getCount:()=>r,getActiveRequests:()=>{let d=Date.now();return Array.from(n.entries()).map(([f,_])=>({id:f,type:_.type,elapsed_ms:d-_.start_ts}))}}}function ie(e,t="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=e,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",t==="success"?n.style.background="#156d36":t==="warning"?n.style.background="#a36a00":t==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function bs(e=void 0,t=void 0){function r(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function n(o,a,c){let u=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return u.sort(ji),u;switch(c){case"created_desc":return u.sort(jr),u;case"created_asc":return u.sort(Ni),u;case"updated_desc":return u.sort(qi),u;case"priority":return u.sort(Fi),u;case"manual":default:{let d=r();return d?u.sort(ms(d)):u.sort(jr),u}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let c of a)try{c()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function Br(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function $t(e){let t=Br(e);if(t===null)return"";let r=new Date(t),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function jt(e,t){let r=Br(e);if(r===null)return"";let s=(typeof t=="number"?t:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let c=Math.floor(s/864e5);if(c<7)return`${c}\uC77C \uC804`;let u=Math.floor(c/7);if(c<30)return`${u}\uC8FC \uC804`;let d=Math.floor(c/30);return d<12?`${d}\uAC1C\uC6D4 \uC804`:`${Math.floor(c/365)}\uB144 \uC804`}function hs(e){if(!Array.isArray(e))return null;let t=null,r=-1;for(let n of e){if(!n||n.status!=="in_progress")continue;let s=Br(n.updated_at)??0;if(t===null||s>r){t=n,r=s;continue}s===r&&String(n.id)<String(t.id)&&(t=n)}return t}function ys(e){let t=e.transport,r=e.uiOrderStore;function n(a,c){return"renormalize"in a?a.renormalize:[{bead_id:c,rank:a.rank}]}function s(a,c){let u={...a.order};for(let d of c)u[d.bead_id]=d.rank;r&&r.set({revision:a.revision,order:u})}async function o(a,c,u){if(!t||!r)return;let d=r.get()||{revision:0,order:{}},f=n(Eo(c,u,d.order),a);s(d,f);let _=await t("ui-order-set",{expected_revision:d.revision,entries:f});if(_&&_.conflict){let h={revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}};r.set(h);let $=n(Eo(c,u,h.order),a);s(h,$);let A=await t("ui-order-set",{expected_revision:h.revision,entries:$});A&&A.applied&&r.set({revision:typeof A.revision=="number"?A.revision:0,order:A.order||{}})}else _&&_.applied&&r.set({revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}})}return{applyReorder:o}}function vs(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Ro(e,t){return!t||typeof e!="string"||e.length===0||vs(t.visible_labels).includes(e)?!0:vs(t.hidden_labels).includes(e)?!1:!vs(t.hidden_prefixes).some(r=>r.length>0&&e.startsWith(r))}function ws(e,t){return vs(e).filter(r=>Ro(r,t))}function Ar(e,t){let r=e&&e.chips?e.chips[t]:void 0;return typeof r=="boolean"?r:!0}var tp={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},Qi={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},Xi={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},rp={review:"\u2713",skip:"\u2298"},Sr={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function np(e,t,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function Ji(e){let t=e&&e.fill||"none";return t==="none"?Sr.none:e&&e.stale===!0?Sr.stale:t==="dim"?Sr.dim:e&&e.glyph==="review"?Sr.review:e&&e.glyph==="skip"?Sr.skip:Sr.done}function sp(e){if(!e||e.fill==="none"||!e.approval_state)return Ji(e);let t=[];return e.glyph==="review"?t.push(Sr.review):e.glyph==="skip"&&t.push(Sr.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function op(e,t,r){let n=tp[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,a=rp[t&&t.glyph||""]||"",c="bar";s==="dim"?c+=` b-${n} dim`:s==="full"&&(c+=` b-${n} full`),o&&(c+=" stale"),r&&(c+=" cur");let u=s==="none"?"lbl":`lbl l-${n} on`,d=r?`color: var(--stage-${n}-on)`:"";return i`
    <div class="seg">
      <div class=${c} style=${d}>${a}</div>
      <div class=${u}>
        ${Qi[e]||e}
      </div>
    </div>
  `}function ks(e,t){if(!e||!e.stages)return"";let r=Xi[e.route]||Xi.spec_backed,n=e.stages,s=np(r,n,String(t||"open")),o=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${r.map(a=>`${Qi[a]||a} ${a==="plan"?sp(n[a]||{}):Ji(n[a]||{})}`).join(" \xB7 ")}`;return i`
    <div class="stp" role="img" aria-label=${o}>
      ${r.map(a=>op(a,n[a]||{},a===s))}
    </div>
  `}function ap(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var el=2;function ip(e){if(!e)return[];let t=[];if(e.external){let n=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(i`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(e.blockers)?e.blockers:[];if(r.length>0){let n=r.slice(0,el).join(", "),s=r.length-el,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;t.push(i`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function Io(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function tl(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function Ur(e){return`${e.kind}:${tl(e)}@${e.sha}`}function $s(e,t){if(!e)return null;let r=Io(e.kind),n=e.reason,s=e.kind==="delegated"?n===null:typeof n=="string"&&n.trim().length>0&&!/[\r\n]/.test(n);if(!r||!s)return null;let o=Io(t?.kind),a=o!==null&&t?.kind!==e.kind,c=`\uACC4\uD68D \xB7 ${r}${a?` \u2192 ${o}`:""}`,u=`planned_execution ${e.kind}${typeof n=="string"?`:${n}`:""}`,d=t?` \xB7 exec_receipt ${Ur(t)}`:"";return{kind:e.kind,label:c,title:`${u}${d}`}}function rl(e,t){let r=$s(e,t);return r?i`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${r.kind}
        title=${r.title}
        >${r.label}</span
      >`:null}function lp(e){if(!e)return null;let t=Io(e.kind);return t?i`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${Ur(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function cp(e,t){let r=t.policy||null,n=e.workflow&&e.workflow.chips||{},s=[];if(n.route&&Ar(r,"route")){let c=n.route_source==="derived";s.push(i`<span
        class="ctl-chip ctl-chip--route${c?" is-derived":""}"
        title=${c?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${c?"unset":n.route}</span
      >`)}if(n.fast_track&&Ar(r,"fast_track")&&s.push(i`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&Ar(r,"pr")){let c=n.pr.number;s.push(i`<span class="ctl-chip ctl-chip--pr"
        >${`PR${c!=null?` #${c}`:""}`}</span
      >`)}let o=rl(n.planned_execution,n.exec_receipt);if(o&&s.push(o),n.exec_receipt){let c=n.exec_receipt;s.push(i`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Ur(c)}`}
        >${`exec ${c.kind==="delegated"?tl(c):`main:${c.actor}`} \xB7 ${c.sha.slice(0,7)}`}</span
      >`)}if(n.impl_entry){let c=n.impl_entry;s.push(i`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${c.actor}@${c.sha}`}
        >${`impl ${c.actor} \xB7 ${c.sha.slice(0,7)}`}</span
      >`)}for(let c of ws(e.labels,r))s.push(i`<span class="ctl-chip ctl-chip--label">${c}</span>`);return e.from_id&&Ar(r,"from")&&s.push(i`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${c=>{c.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(c,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),Ar(r,"blocked")&&s.push(...ip(e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&Ar(r,"blocked")&&s.push(i`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":i`<div class="board-card__chips">${s}</div>`}function up(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function dp(e){let t=jt(e.created_at),r=jt(e.updated_at);return!t&&!r?"":i`<span class="board-card__times">
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
  </span>`}function pp(e,t){let r=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=t.isExpanded?t.isExpanded(e.id):!0,o=n>0?r.children.slice().sort(Bi):r.children;return i`
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
        ${dp(e)}
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
                  <span class=${up(a.status)}>●</span>
                  <span class="board-card__roll-child-ord">${c+1}</span>
                  <span class="board-card__roll-child-title"
                    >${a.title||a.id}</span
                  >
                  ${$s(a.workflow?.chips?.planned_execution,a.workflow?.chips?.exec_receipt)?i`<span class="board-card__roll-child-chips">
                        ${rl(a.workflow?.chips?.planned_execution,a.workflow?.chips?.exec_receipt)}
                        ${lp(a.workflow?.chips?.exec_receipt)}
                      </span>`:""}
                </button>`)}
          </div>`:""}
    </div>
  `}function xs(e,t){let r=ap(e.priority);return i`
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
      ${cp(e,t)}
      ${e.workflow&&Ar(t.policy||null,"stepper")?ks(e.workflow,e.status):""}
      ${pp(e,t)}
    </article>
  `}function nn(e,t){let r=Array.isArray(e.items)?e.items.length:0,n=e.is_closed===!0;return i`
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
              ${ur.map(o=>i`<option
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
        ${e.items.map(o=>xs(o,t))}
      </div>
    </section>
  `}function nl(e,t,r){return i`
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
          ${e.items.length===0?i`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(n=>xs(n,t))}
        </div>
      </div>
    </dialog>
  `}var fp=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],_p=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],mp=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function gp(e,t,r){let n=e.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return i`
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
  `}function sl(e,t,r){return i`
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
        ${fp.map(n=>i`<option
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
        ${_p.map(n=>i`<option
              value=${n.value}
              ?selected=${e.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${gp(e,t,r)}
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
        ${mp.map(n=>i`<option
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
  `}var bp=200,hp={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},yp=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),ol="beads-ui.board.sort",al=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function vp(){try{let e=window.localStorage.getItem(ol);if(e&&al.has(e))return e}catch{}return"created_desc"}function il(e,t){let r=mt("views:board"),n=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,c=t.displayPolicyStore,u=t.workerQueueStore,d=t.onClosedRangeChange,f=t.onNewIssue,_=t.closedRange||Ft,h=s?bs(s,a):null,$=ys({transport:o,uiOrderStore:a}),A=[],O=[],W=[],te=[],ee=[],D=[],N=!1,R=0,j=vp(),b=new Map,E=new Map,V=new Map,ne=new Set,P={search:"",priority:"",type:"",labels:[]},F=!1,pe=null;function ye(U){return String(U.status||"open")==="open"}function _e(U){let Q=String(U.status||"open");return Q==="open"||Q==="blocked"}function je(U){let Q=P.search.trim().toLowerCase(),de=P.priority,v=P.type,S=P.labels;return U.filter(I=>{if(Q){let X=String(I.id||"").toLowerCase(),xe=String(I.title||"").toLowerCase();if(!X.includes(Q)&&!xe.includes(Q))return!1}if(de!==""&&String(I.priority)!==de||v!==""&&String(I.issue_type||"")!==v)return!1;if(S.length>0){let X=Array.isArray(I.labels)?I.labels:[];if(!S.some(xe=>X.includes(xe)))return!1}return!0})}function et(){let U=new Set;for(let Q of[A,O,W,te,ee,D])for(let de of Q){let v=Array.isArray(de.labels)?de.labels:[];for(let S of v)typeof S=="string"&&S.length>0&&U.add(S)}return Array.from(U).sort()}function Ke(){return P.search.trim()!==""||P.priority!==""||P.type!==""||P.labels.length>0}function Le(){try{if(h){let U=h.selectBoardColumn("tab:board:in-progress","in_progress",j),Q=h.selectBoardColumn("tab:board:blocked","blocked",j).filter(_e),de=new Set(U.map(Ie=>Ie.id)),v=h.selectBoardColumn("tab:board:ready","ready",j).filter(Ie=>ye(Ie)&&!de.has(Ie.id)),S=h.selectBoardColumn("tab:board:resolved","resolved",j),I=h.selectBoardColumn("tab:board:deferred","deferred",j),X=h.selectBoardColumn("tab:board:closed","closed").slice(0,bp),xe=[...Q,...v,...U,...S,...X];Be(xe);let J=new Set;for(let Ie of xe)Ie&&Ie.id&&!Lo(Ie)&&J.add(Ie.id);let Ee=!Ke();A=Ee?$n(Q,J):Q,O=Ee?$n(v,J):v,W=Ee?$n(U,J):U,te=Ee?$n(S,J):S,ee=I,R=I.length,D=Ee?$n(X,J):X,b=new Map;for(let Ie of A)b.set(Ie.id,"open");for(let Ie of O)b.set(Ie.id,"open");for(let Ie of W)b.set(Ie.id,"in_progress");for(let Ie of te)b.set(Ie.id,"resolved");for(let Ie of ee)b.set(Ie.id,"deferred");for(let Ie of D)b.set(Ie.id,"closed");E=new Map;for(let Ie of A)E.set(Ie.id,"blocked-col");for(let Ie of O)E.set(Ie.id,"ready-col");for(let Ie of W)E.set(Ie.id,"in-progress-col");for(let Ie of te)E.set(Ie.id,"resolved-col");for(let Ie of D)E.set(Ie.id,"closed-col")}G()}catch{A=[],O=[],W=[],te=[],ee=[],D=[],V=new Map,G()}}function Be(U){let Q=new Map;for(let v of U)v&&v.id&&!Q.has(v.id)&&Q.set(v.id,v);let de=new Map;for(let v of Q.values()){let S=Lo(v);if(!S)continue;let I=de.get(S);I||(I=[],de.set(S,I)),I.push({id:v.id,title:v.title,status:v.status,metadata:v.metadata,workflow:v.workflow,created_at:v.created_at,updated_at:v.updated_at})}V=de}function ue(U){let Q=V.get(U)||[],de=0;for(let S of Q)(S.status==="resolved"||S.status==="closed")&&(de+=1);let v=hs(Q);return{total:Q.length,count:de,current:v,children:Q}}function Te(U){return!ne.has(U)}function Oe(U,Q){U.preventDefault(),U.stopPropagation(),ne.has(Q)?ne.delete(Q):ne.add(Q),G()}function De(U,Q){U.preventDefault(),U.stopPropagation(),n(Q)}function Se(U,Q){U.preventDefault(),U.stopPropagation(),n(Q)}function We(U,Q){pe||n(Q)}function Ze(U,Q){U.preventDefault(),U.stopPropagation(),wp(Q).then(de=>{de&&ie("\uBCF5\uC0AC\uB428","success",1200)})}function $e(U,Q){pe=Q,U.dataTransfer&&(U.dataTransfer.setData("text/plain",Q),U.dataTransfer.effectAllowed="move"),U.target.classList.add("board-card--dragging")}function Xe(U){U.target.classList.remove("board-card--dragging"),fe(),setTimeout(()=>{pe=null},0)}function Z(U){let Q=String(U.target.value||"");!Q||Q===_||(_=Q,d&&d(Q),G())}function z(){return c?c.get():null}function oe(U){let Q=u?u.get():null,de=Q?Q.cleanup_failed:null;if(!de||typeof de!="object"||Array.isArray(de))return null;let v=de[U];return!v||typeof v!="object"||Array.isArray(v)?null:v}let Me={onCardClick:We,onCopyId:Ze,onDragStart:$e,onDragEnd:Xe,onClosedRangeChange:Z,rollupFor:ue,isExpanded:Te,onRollupToggle:Oe,onChildClick:De,onFromChipClick:Se,cleanupFailureFor:oe,get policy(){return z()}};function Fe(U,Q){pe||(ge(),n(Q))}function Ue(U,Q){U.preventDefault(),U.stopPropagation(),ge(),n(Q)}let tt={...Me,onCardClick:Fe,onChildClick:Ue,onFromChipClick:Ue,get policy(){return z()}};function ct(U){let Q=U.target,de=e.querySelector(".board-filter__labels");Q&&de&&de.contains(Q)||re()}function ot(U){U.key==="Escape"&&re()}function Y(){F||(F=!0,document.addEventListener("mousedown",ct),document.addEventListener("keydown",ot),G())}function re(){F&&(F=!1,document.removeEventListener("mousedown",ct),document.removeEventListener("keydown",ot),G())}function me(U){U.key==="Escape"&&ge()}function nt(){N||(N=!0,document.addEventListener("keydown",me),G())}function ge(){N&&(N=!1,document.removeEventListener("keydown",me),G())}let T={onClose:ge,onOverlayClick(U){U.target===U.currentTarget&&ge()}},M={onSearchInput(U){P.search=String(U.target.value||""),Le()},onPriorityChange(U){P.priority=String(U.target.value||""),Le()},onTypeChange(U){P.type=String(U.target.value||""),Le()},onSortChange(U){let Q=String(U.target.value||"");if(!(!al.has(Q)||Q===j)){j=Q;try{window.localStorage.setItem(ol,Q)}catch{}Le()}},onDeferredToggle(){N?ge():nt()},onLabelMenuToggle(){F?re():Y()},onLabelToggle(U){let Q=P.labels.indexOf(U);Q===-1?P.labels.push(U):P.labels.splice(Q,1),Le()},onLabelClear(){P.labels.length!==0&&(P.labels=[],Le())},onNewIssue(){f&&f()}};function L(){return i`
      <div class="board-view">
        ${sl(P,M,{sort_mode:j,deferred_popup_open:N,deferred_count:R,label_options:et(),label_menu_open:F})}
        <div class="board-root">
          ${nn({title:"Blocked",id:"blocked-col",items:je(A)},Me)}
          ${nn({title:"Ready",id:"ready-col",items:je(O)},Me)}
          ${nn({title:"In progress",id:"in-progress-col",items:je(W)},Me)}
          ${nn({title:"Resolved",id:"resolved-col",items:je(te)},Me)}
          ${nn({title:"Closed",id:"closed-col",items:je(D),is_closed:!0,closed_range:_},Me)}
        </div>
        ${N?nl({items:je(ee),count:R},tt,T):""}
      </div>
    `}function G(){Ge(L(),e),se()}function se(){try{let U=e.querySelector("#deferred-popup");U&&!U.open&&(typeof U.showModal=="function"?U.showModal():U.setAttribute("open",""));let Q=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let de of Q)Array.from(de.querySelectorAll(".board-card")).forEach((S,I)=>{S.tabIndex=I===0?0:-1})}catch{}}async function w(U,Q){if(!o){ie("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:U,status:Q}),ie("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(de){r("update-status failed: %o",de),ie("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function C(U){switch(U){case"blocked-col":return A;case"ready-col":return O;case"in-progress-col":return W;case"resolved-col":return te;default:return[]}}function q(U,Q,de){if(!o||!a)return;let v=C(U),S=v.find(Ee=>Ee.id===Q);if(!S)return;let I=v.filter(Ee=>Ee.id!==Q),X=de.closest?de.closest(".board-card"):null,xe=I.length;if(X){let Ee=X.getAttribute("data-issue-id");if(Ee===Q)return;let Ie=I.findIndex(ht=>ht.id===Ee);Ie>=0&&(xe=Ie)}let J=I.slice();J.splice(xe,0,S),$.applyReorder(Q,J,xe)}function fe(){for(let U of Array.from(e.querySelectorAll(".board-column--drag-over")))U.classList.remove("board-column--drag-over")}let ae=null;e.addEventListener("dragover",U=>{U.preventDefault(),U.dataTransfer&&(U.dataTransfer.dropEffect="move");let de=U.target.closest(".board-column");de&&de!==ae&&(ae&&ae.classList.remove("board-column--drag-over"),de.classList.add("board-column--drag-over"),ae=de)}),e.addEventListener("dragleave",U=>{let Q=U.relatedTarget;(!Q||!e.contains(Q))&&ae&&(ae.classList.remove("board-column--drag-over"),ae=null)}),e.addEventListener("drop",U=>{U.preventDefault(),ae&&(ae.classList.remove("board-column--drag-over"),ae=null);let Q=U.target,de=Q.closest(".board-column");if(!de)return;let v=U.dataTransfer?.getData("text/plain")||"";if(!v)return;let S=de.id,I=E.get(v);if(I&&I===S){if(yp.has(S)){if(j!=="manual"){ie("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}q(S,v,Q)}return}let X=hp[S];if(!X){ie("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}b.get(v)!==X&&w(v,X)}),e.addEventListener("keydown",U=>{let Q=U.target;if(!(Q instanceof HTMLElement))return;let de=String(Q.tagName||"").toLowerCase();if(de==="input"||de==="textarea"||de==="select"||de==="button"||de==="a"||Q.isContentEditable===!0)return;let v=Q.closest(".board-card");if(!v)return;let S=String(U.key||"");if(S==="Enter"||S===" "){U.preventDefault();let J=v.getAttribute("data-issue-id");J&&n(J);return}if(S!=="ArrowUp"&&S!=="ArrowDown"&&S!=="ArrowLeft"&&S!=="ArrowRight")return;U.preventDefault();let I=v.closest(".board-column");if(!I)return;let X=Array.from(I.querySelectorAll(".board-card")),xe=X.indexOf(v);if(S==="ArrowDown"&&xe<X.length-1){ve(v,X[xe+1]);return}if(S==="ArrowUp"&&xe>0){ve(v,X[xe-1]);return}if(S==="ArrowLeft"||S==="ArrowRight"){let J=Array.from(e.querySelectorAll(".board-column")),Ee=J.indexOf(I),Ie=S==="ArrowRight"?1:-1,ht=Ee+Ie;for(;ht>=0&&ht<J.length;){let yt=J[ht].querySelector(".board-card");if(yt){ve(v,yt);return}ht+=Ie}}});function ve(U,Q){try{U.tabIndex=-1,Q.tabIndex=0,Q.focus()}catch{}}let Re=null;h&&h.subscribe&&(Re=h.subscribe(()=>{try{Le()}catch{}}));let ze=null;c&&c.subscribe&&(ze=c.subscribe(()=>{try{Le()}catch{}}));let He=null;return u&&u.subscribe&&(He=u.subscribe(()=>{G()})),{async load(){r("load"),Le()},clear(){re(),ge(),Re&&(Re(),Re=null),ze&&(ze(),ze=null),He&&(He(),He=null),e.replaceChildren(),A=[],O=[],W=[],te=[],ee=[],D=[],b=new Map,E=new Map}}}function Lo(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function $n(e,t){return e.filter(r=>{let n=Lo(r);return!(n&&t.has(n))})}async function wp(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let r=!1;try{r=document.execCommand("copy")}finally{t.remove()}return r}catch{return!1}}async function Qt(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}function dr(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function Er(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function kp(e,t=document){let r=t.createElement("dialog");r.className="continuation-dialog";let n=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),c=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",c.textContent=`${dr(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${dr(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,n.type="button",n.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",n.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",r.append(a,c,n,s,o),t.body.append(r),new Promise(u=>{let d=f=>{typeof r.close=="function"&&r.close(),r.remove(),u(f)};n.addEventListener("click",()=>d("prior_session")),s.addEventListener("click",()=>d("fresh_current")),o.addEventListener("click",()=>d(null)),r.addEventListener("cancel",f=>{f.preventDefault(),d(null)}),typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")})}async function gr(e,t,r={}){let n=e;for(r.onResult?.(n);n?.continuation_mismatch;){let s=n.continuation_mismatch,o=await kp(s);if(o===null)return n;n=await t(o,s.decision_token),r.onResult?.(n),n?.conflict&&r.refresh&&(n=await r.refresh(n),r.onResult?.(n))}return n}var $p=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_model","orchestration_model","orchestration_effort","orchestration_speed"],ll={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},xp=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function vt(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function _t(e){return typeof e=="string"&&e.length>0?e:null}function sn(e){return e.startsWith("gpt-")?e.slice(4):e}function dt(e,t,r,n,s){return{value:e,source:t,display:r,full_value:n,resolution:s}}function ul(e,t,r){let n=_t(t[e]);if(n!==null)return{value:n,source:"pin"};let s=_t(r[e]);return s===null?null:{value:s,source:"global"}}function xn(e,t,r,n){return ul(e,t,r)||{value:n,source:"base"}}function Oo(e,t,r,n){let s=r?.implementation?.model_catalog;if(t&&vt(s?.[t])){let a=_t(s[t][e]);if(a!==null)return a}if(t&&Array.isArray(s?.[t])&&s[t].includes(e))return e;if(!t&&vt(s)){for(let a of Object.values(s))if(vt(a)){let c=_t(a[e]);if(c!==null)return c}else if(Array.isArray(a)&&a.includes(e))return e}let o=n?.model_index?.[e];return _t(n?.runners?.[o]?.models?.[e]?.id)||e}function Ap(e,t){return _t(t?.review?.reviewers?.[e]?.model)||e}function on(e,t,r=!1){if(e==="default")return dt(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let n=r?sn(e):e;return dt(e,t,n,e,"explicit")}function dl(e,t,r){let n=t?.implementation?.model_catalog?.[e],s=[];vt(n)?s.push(...Object.keys(n)):Array.isArray(n)&&s.push(...n.filter(a=>typeof a=="string"));let o=r?.runners?.[e]?.models;if(vt(o))for(let a of Object.keys(o))s.includes(a)||s.push(a);return s}function Sp(e,t){let r=[],n=e?.implementation?.model_catalog;vt(n)&&r.push(...Object.keys(n));let s=t?.runners;if(vt(s))for(let o of Object.keys(s))r.includes(o)||r.push(o);return r}function Ep(e,t,r){if(e===null)return{runtime:null,offered:!1};let n=!1;for(let s of Sp(t,r)){let o=dl(s,t,r);if(o.length>0&&(n=!0),o.includes(e))return{runtime:s,offered:!0}}return{runtime:null,offered:n}}function Mo(e){return dt(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function cl(e,t,r){let n=ul(e,t,r);return n?on(n.value,n.source):dt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function Tr(e){let t=vt(e.pin)?e.pin:{},r=vt(e.global)?e.global:{},n=vt(e.execution_defaults)?e.execution_defaults:null,s=n?.supported===!0&&vt(n.session)?n.session:null,o=n?.supported===!0&&vt(n.orchestration)?n.orchestration:null,a=vt(e.runner_catalog)?e.runner_catalog:null,c=_t(r.quick_fix_impl_model),u=Ep(c,s,a),d={};if(s){let f=xn("workflow_mode",t,r,_t(s.workflow_mode_default));d.workflow_mode=f.source==="base"?dt(f.value,"base",f.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",f.value,"default"):on(f.value,f.source);for(let D of["spec_review","plan_review","impl_review"]){let N=`${D}_model`,R=_t(D==="plan_review"?f.value==="fast_track"?s.plan_review?.fast_track_default:s.plan_review?.standard_recommended:s.review?.default),j=xn(N,t,r,R);if(j.value===null)d[N]=dt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(j.value!=="self"&&j.value!=="skip"&&!vt(s.review?.reviewers?.[j.value]))d[N]=Mo(dt(j.value,j.source,"",null,"explicit"));else{let b=Ap(j.value,s);d[N]=dt(j.value,j.source,sn(b),b,j.source==="base"?"default":"explicit")}}for(let[D,N]of Object.entries(ll)){let R=d[N].value;if(R==="self"||R==="skip"){d[D]=dt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let j=_t(s.review?.reviewers?.[R||""]?.effort),b=xn(D,t,r,j);d[D]=b.value===null?dt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):dt(b.value,b.source,b.value,b.value,b.source==="base"?"default":"explicit")}let _=vt(s.implementation?.default)?s.implementation.default:{},h=_t(e.route),$=h!==null&&["quick_fix","spec_backed","full_plan"].includes(h),A=vt(s.implementation?.route_defaults)?s.implementation.route_defaults:{},O=$&&vt(A[h])?A[h]:{};for(let D of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let N=xn(D,t,r,D==="impl_dispatch"?_t(O.dispatch)||_t(_.dispatch):_t(_[D.replace("impl_","")]));d[D]=N.value===null?dt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):dt(N.value,N.source,N.value,N.value,N.source==="base"?"default":"explicit")}let W=_t(t.impl_runtime),te=W==="inherit"?_t(e.controller_runtime):W,ee=h==="quick_fix"&&_t(t.impl_dispatch)===null&&u.runtime!==null&&(W===null||te===u.runtime);if(ee){let D=u.runtime,N=c;d.impl_dispatch=dt("delegated","global","\uC704\uC784 (\uC804\uC5ED quick_fix)","delegated","explicit"),W===null&&(d.impl_runtime=dt(D,"global",`${D} (\uC720\uB3C4)`,D,"explicit")),_t(t.impl_model)===null&&(d.impl_model=dt(N,"global",N,N,"explicit"))}if(d.impl_dispatch.value==="main"){d.impl_dispatch.display="\uBA54\uC778";for(let D of["impl_runtime","impl_model","impl_effort","impl_speed"])d[D]=dt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(d.impl_dispatch.value==="delegated"&&!ee&&(d.impl_dispatch.display="\uC704\uC784"),d.impl_runtime.value==="inherit"&&(d.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",d.impl_runtime.resolution="dynamic"),d.impl_model.value!==null){let D=d.impl_runtime.value==="inherit"?_t(e.controller_runtime):d.impl_runtime.value,N=D?dl(D,s,a):[];if(d.impl_model.value!=="auto"&&N.length>0&&!N.includes(d.impl_model.value))d.impl_model=Mo(d.impl_model);else{let R=Oo(d.impl_model.value,D,s,a);d.impl_model.display=sn(R),d.impl_model.full_value=R}}if(d.impl_effort.value==="auto"){let D=_t(e.transport)||(d.impl_runtime.value==="codex"?"codex-native-spawn":d.impl_runtime.value==="claude"?"implement-claude":null),N=D?_t(s.implementation?.effort_by_transport?.[D]?.auto):null;N&&!xp.has(N)?(d.impl_effort.display=`${N} (\uBE44\uD638\uD658)`,d.impl_effort.full_value=N,d.impl_effort.resolution="incompatible"):(d.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",d.impl_effort.resolution="dynamic")}d.impl_speed.value==="default"&&(d.impl_speed=d.impl_speed.source==="base"?dt("default","base","default (\uC77C\uBC18)","default","default"):on("default",d.impl_speed.source))}}else for(let f of $p.filter(_=>!_.startsWith("orchestration_")))d[f]=cl(f,t,r);if(!s){for(let[f,_]of Object.entries(ll))(d[_].value==="self"||d[_].value==="skip")&&(d[f]=dt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(d.impl_dispatch.value==="main"){d.impl_dispatch.display="\uBA54\uC778";for(let f of["impl_runtime","impl_model","impl_effort","impl_speed"])d[f]=dt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else d.impl_dispatch.value==="delegated"&&(d.impl_dispatch.display="\uC704\uC784"),d.impl_runtime.value==="inherit"&&(d.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",d.impl_runtime.resolution="dynamic"),d.impl_effort.value==="auto"&&(d.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",d.impl_effort.resolution="dynamic")}for(let f of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!o){d[f]=cl(f,t,r);continue}let _=f.replace("orchestration_",""),h=_t(o[_]),$=xn(f,t,r,h);if(f==="orchestration_effort"&&$.source==="base"){d[f]=dt(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if($.value===null){d[f]=dt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(f==="orchestration_model"){let A=$.source==="base"?_t(o.model_id)||$.value:Oo($.value,null,s,a);d[f]=dt($.value,$.source,sn(A),A,$.source==="base"?"default":"explicit");continue}if($.value==="default"){d[f]=$.source==="base"?dt("default","base","default (\uC77C\uBC18)","default","default"):on("default",$.source);continue}d[f]=on($.value,$.source)}if(s)if(c===null){let f=d.orchestration_model.full_value;d.quick_fix_impl_model=dt(null,"base",f===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${sn(f)})`,null,"default")}else if(u.runtime!==null){let f=Oo(c,u.runtime,s,a);d.quick_fix_impl_model=dt(c,"global",sn(f),f,"explicit")}else u.offered?d.quick_fix_impl_model=Mo(dt(c,"global","",null,"explicit")):d.quick_fix_impl_model=on(c,"global");return d}function Tp(e,t){let r=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let n=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${r} (${n})`}function As(e){let t=vt(e.pin)?e.pin:{},r=vt(e.global)?e.global:{},n=vt(e.resolution_global)?{...e.resolution_global}:{};delete n[e.key];let s=_=>{let h={...n,..._};return Tr({pin:e.layer==="pin"?h:t,global:e.layer==="pin"?r:h,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},o=e.layer==="pin"?t:r,a={...o};delete a[e.key];let c=s(a)[e.key],u=s(o)[e.key],d=_t(o[e.key]),f=[...e.choices];return d!==null&&!f.includes(d)&&f.unshift(d),{unset_label:Tp(c,e.layer==="pin"),full_value:c.full_value,unavailable:c.resolution==="unavailable",disabled:u?.resolution==="not_applicable",options:f.map(_=>{let h=s({...o,[e.key]:_})[e.key];return{value:_,label:h.display,full_value:h.full_value}})}}function an(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let r=e.createElement("h2"),n=e.createElement("textarea"),s=e.createElement("div"),o=e.createElement("button"),a=e.createElement("button");return r.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",n.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",n.maxLength=4e3,s.className="resume-instructions-dialog__actions",o.type="button",o.textContent="\uC774\uC5B4\uD558\uAE30",a.type="button",a.textContent="\uCDE8\uC18C",s.append(o,a),t.append(r,n,s),e.body.append(t),new Promise(c=>{let u=!1,d=_=>{u||(u=!0,typeof t.close=="function"&&t.close(),t.remove(),c(_))},f=()=>d(n.value.trim());o.addEventListener("click",f),a.addEventListener("click",()=>d(null)),n.addEventListener("keydown",_=>{_.key==="Enter"&&(_.ctrlKey||_.metaKey)&&(_.preventDefault(),f())}),t.addEventListener("cancel",_=>{_.preventDefault(),d(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),n.focus()})}var gl="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function xt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var br=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],An=[...br,"reasoning_output_tokens"],Cp=["implementation","review-consult"];function Po(e){let t=0;for(let r of br)t+=xt(e?.[r]);return t}function Rp(e){return!e||typeof e!="object"?!1:br.some(t=>Number.isFinite(e[t]))}function pl(e){return!e||typeof e!="object"?!1:An.some(t=>Number.isFinite(e[t]))}function Ip(e){let t={};for(let r of An)e&&Number.isFinite(e[r])&&(t[r]=e[r]);return t}function fl(e){let t={};for(let r of An)Number.isFinite(e[r])&&(t[r]=e[r]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function _l(e,t){return e==="codex"?xt(t.input_tokens)+xt(t.output_tokens):Po(t)}function Lp(e){return e==="claude"?"Claude":"Codex"}function Op(e){return`\u03C4 ${bl(e)}`}function Mp(e,t){let r=t.breakdown||{},n=[`\uC785\uB825 ${xt(r.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${xt(r.output_tokens).toLocaleString("en-US")}`];e==="claude"?n.push(`\uCE90\uC2DC\uC77D\uAE30 ${xt(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${xt(r.cache_creation_input_tokens).toLocaleString("en-US")}`):(n.push(`\uCE90\uC2DC\uC77D\uAE30 ${xt(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${xt(r.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(r.reasoning_output_tokens)&&n.push(`\uCD94\uB860\uCD9C\uB825 ${xt(r.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,n.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(gl),o.join(`
`)}function At(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let r of["claude","codex"]){let n=e.providers[r];n&&t.push({provider:r,label:`${Lp(r)} ${Op(n.subtotal)}${typeof n.total_cost_usd=="number"&&Number.isFinite(n.total_cost_usd)?` \xB7 $${n.total_cost_usd.toFixed(2)}`:""}`,tooltip:Mp(r,n)})}return t}function Es(e){let t={},r={claude:!0,codex:!1},n={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let c=t[o];c||(c={subtotal:0,breakdown:{}},t[o]=c),c.subtotal+=a.subtotal;for(let u of An)Number.isFinite(a.breakdown[u])&&(c.breakdown[u]=xt(c.breakdown[u])+xt(a.breakdown[u]));a.replayed&&(c.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?n.claude+=a.total_cost_usd:r.claude=!1)}return t.claude&&r.claude&&(t.claude.total_cost_usd=n.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function Do(e){return!e||typeof e!="object"?null:Ht({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function Pp(e){return e==="codex"?"codex":"claude"}function Cr(){return{subtotal:0,breakdown:Ip(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function Ss(e,t,r){e.subtotal+=t.subtotal;for(let n of An)Number.isFinite(t.usage[n])&&(e.breakdown[n]=xt(e.breakdown[n])+xt(t.usage[n]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),r&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function ml(e,t){let r={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(r.legs=e.legs),e.replayed&&(r.replayed=!0),r}function bl(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function ln(e){return Rp(e)?`\u03C4 ${bl(Po(e))}`:null}function Jt(e){let t=ln(e);if(!t)return null;let r=e?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${t} \xB7 $${r.toFixed(2)}`:t}function cn(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${xt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${xt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${xt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${xt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${Po(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&r.push(gl),r.join(`
`)}function Ht(e,t){let r={claude:Cr(),codex:Cr()},n={orchestrator:{claude:Cr(),codex:Cr()},implementation:{claude:Cr(),codex:Cr()},"review-consult":{claude:Cr(),codex:Cr()}},s=new Set;for(let c of Object.values(e||{})){if(!c||c.bead_id!==t)continue;let u=c.usage;if(pl(u)){let f=Pp(c.runner),_=fl(u),h={provider:f,role:"orchestrator",attempt_id:String(c.attempt_id||""),usage:_,subtotal:_l(f,_)};_.replayed===!0&&(h.replayed=!0),typeof c.model=="string"&&(h.model=c.model),typeof c.session_id=="string"&&(h.session_id=c.session_id),Ss(r[f],h,!0),Ss(n.orchestrator[f],h,!0)}let d=Array.isArray(c.usage_legs)?c.usage_legs:[];for(let f of d){if(!f||f.provider!=="codex"||!Cp.includes(f.role)||!pl(f.usage))continue;let _=typeof f.receipt_id=="string"&&f.receipt_id.length>0?f.receipt_id:null;if(!_||s.has(_))continue;s.add(_);let h=fl(f.usage),$={provider:"codex",role:f.role,attempt_id:String(c.attempt_id||""),usage:h,subtotal:_l("codex",h)};$.receipt_id=_,typeof f.model=="string"&&($.model=f.model),typeof f.effort=="string"&&f.effort.trim().length>0&&($.effort=f.effort),typeof f.session_id=="string"?$.session_id=f.session_id:typeof f.thread_id=="string"&&($.session_id=f.thread_id),typeof f.turn_id=="string"&&($.turn_id=f.turn_id),typeof f.completed_at=="string"&&($.completed_at=f.completed_at),h.replayed===!0&&($.replayed=!0),Ss(r.codex,$,!1),Ss(n[$.role].codex,$,!1)}}let o={};for(let c of["claude","codex"]){let u=r[c];if(u.legs.length===0)continue;let d=ml(u,!1);c==="claude"&&u.outer_count>0&&u.outer_cost_count===u.outer_count&&(d.total_cost_usd=u.outer_cost),o[c]=d}if(Object.keys(o).length===0)return null;let a={};for(let c of["orchestrator","implementation","review-consult"]){let u={};for(let d of["claude","codex"]){let f=n[c][d];f.legs.length>0&&(u[d]={...ml(f,!0),legs:f.legs})}Object.keys(u).length>0&&(a[c]=u)}return{providers:o,roles:a}}var{entries:Sl,setPrototypeOf:hl,isFrozen:Dp,getPrototypeOf:Np,getOwnPropertyDescriptor:qp}=Object,{freeze:Rt,seal:Gt,create:Wo}=Object,{apply:zo,construct:Ho}=typeof Reflect<"u"&&Reflect;Rt||(Rt=function(t){return t});Gt||(Gt=function(t){return t});zo||(zo=function(t,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return t.apply(r,s)});Ho||(Ho=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new t(...n)});var Ts=It(Array.prototype.forEach),Fp=It(Array.prototype.lastIndexOf),yl=It(Array.prototype.pop),Sn=It(Array.prototype.push),jp=It(Array.prototype.splice),Rs=It(String.prototype.toLowerCase),No=It(String.prototype.toString),qo=It(String.prototype.match),En=It(String.prototype.replace),Bp=It(String.prototype.indexOf),Up=It(String.prototype.trim),er=It(Object.prototype.hasOwnProperty),Ct=It(RegExp.prototype.test),Tn=Wp(TypeError);function It(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return zo(e,t,n)}}function Wp(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return Ho(e,r)}}function Je(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Rs;hl&&hl(e,null);let n=t.length;for(;n--;){let s=t[n];if(typeof s=="string"){let o=r(s);o!==s&&(Dp(t)||(t[n]=o),s=o)}e[s]=!0}return e}function zp(e){for(let t=0;t<e.length;t++)er(e,t)||(e[t]=null);return e}function hr(e){let t=Wo(null);for(let[r,n]of Sl(e))er(e,r)&&(Array.isArray(n)?t[r]=zp(n):n&&typeof n=="object"&&n.constructor===Object?t[r]=hr(n):t[r]=n);return t}function Cn(e,t){for(;e!==null;){let n=qp(e,t);if(n){if(n.get)return It(n.get);if(typeof n.value=="function")return It(n.value)}e=Np(e)}function r(){return null}return r}var vl=Rt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Fo=Rt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),jo=Rt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Hp=Rt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Bo=Rt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Gp=Rt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),wl=Rt(["#text"]),kl=Rt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Uo=Rt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),$l=Rt(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Cs=Rt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Vp=Gt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Kp=Gt(/<%[\w\W]*|[\w\W]*%>/gm),Yp=Gt(/\$\{[\w\W]*/gm),Zp=Gt(/^data-[\-\w.\u00B7-\uFFFF]+$/),Xp=Gt(/^aria-[\-\w]+$/),El=Gt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Qp=Gt(/^(?:\w+script|data):/i),Jp=Gt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Tl=Gt(/^html$/i),ef=Gt(/^[a-z][.\w]*(-[.\w]+)+$/i),xl=Object.freeze({__proto__:null,ARIA_ATTR:Xp,ATTR_WHITESPACE:Jp,CUSTOM_ELEMENT:ef,DATA_ATTR:Zp,DOCTYPE_NAME:Tl,ERB_EXPR:Kp,IS_ALLOWED_URI:El,IS_SCRIPT_OR_DATA:Qp,MUSTACHE_EXPR:Vp,TMPLIT_EXPR:Yp}),Rn={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},tf=function(){return typeof window>"u"?null:window},rf=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Al=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Cl(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:tf(),t=we=>Cl(we);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==Rn.document||!e.Element)return t.isSupported=!1,t;let{document:r}=e,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:c,Element:u,NodeFilter:d,NamedNodeMap:f=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:_,DOMParser:h,trustedTypes:$}=e,A=u.prototype,O=Cn(A,"cloneNode"),W=Cn(A,"remove"),te=Cn(A,"nextSibling"),ee=Cn(A,"childNodes"),D=Cn(A,"parentNode");if(typeof a=="function"){let we=r.createElement("template");we.content&&we.content.ownerDocument&&(r=we.content.ownerDocument)}let N,R="",{implementation:j,createNodeIterator:b,createDocumentFragment:E,getElementsByTagName:V}=r,{importNode:ne}=n,P=Al();t.isSupported=typeof Sl=="function"&&typeof D=="function"&&j&&j.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:F,ERB_EXPR:pe,TMPLIT_EXPR:ye,DATA_ATTR:_e,ARIA_ATTR:je,IS_SCRIPT_OR_DATA:et,ATTR_WHITESPACE:Ke,CUSTOM_ELEMENT:Le}=xl,{IS_ALLOWED_URI:Be}=xl,ue=null,Te=Je({},[...vl,...Fo,...jo,...Bo,...wl]),Oe=null,De=Je({},[...kl,...Uo,...$l,...Cs]),Se=Object.seal(Wo(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),We=null,Ze=null,$e=Object.seal(Wo(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),Xe=!0,Z=!0,z=!1,oe=!0,Me=!1,Fe=!0,Ue=!1,tt=!1,ct=!1,ot=!1,Y=!1,re=!1,me=!0,nt=!1,ge="user-content-",T=!0,M=!1,L={},G=null,se=Je({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),w=null,C=Je({},["audio","video","img","source","image","track"]),q=null,fe=Je({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),ae="http://www.w3.org/1998/Math/MathML",ve="http://www.w3.org/2000/svg",Re="http://www.w3.org/1999/xhtml",ze=Re,He=!1,U=null,Q=Je({},[ae,ve,Re],No),de=Je({},["mi","mo","mn","ms","mtext"]),v=Je({},["annotation-xml"]),S=Je({},["title","style","font","a","script"]),I=null,X=["application/xhtml+xml","text/html"],xe="text/html",J=null,Ee=null,Ie=r.createElement("form"),ht=function(l){return l instanceof RegExp||l instanceof Function},yt=function(){let l=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Ee&&Ee===l)){if((!l||typeof l!="object")&&(l={}),l=hr(l),I=X.indexOf(l.PARSER_MEDIA_TYPE)===-1?xe:l.PARSER_MEDIA_TYPE,J=I==="application/xhtml+xml"?No:Rs,ue=er(l,"ALLOWED_TAGS")?Je({},l.ALLOWED_TAGS,J):Te,Oe=er(l,"ALLOWED_ATTR")?Je({},l.ALLOWED_ATTR,J):De,U=er(l,"ALLOWED_NAMESPACES")?Je({},l.ALLOWED_NAMESPACES,No):Q,q=er(l,"ADD_URI_SAFE_ATTR")?Je(hr(fe),l.ADD_URI_SAFE_ATTR,J):fe,w=er(l,"ADD_DATA_URI_TAGS")?Je(hr(C),l.ADD_DATA_URI_TAGS,J):C,G=er(l,"FORBID_CONTENTS")?Je({},l.FORBID_CONTENTS,J):se,We=er(l,"FORBID_TAGS")?Je({},l.FORBID_TAGS,J):hr({}),Ze=er(l,"FORBID_ATTR")?Je({},l.FORBID_ATTR,J):hr({}),L=er(l,"USE_PROFILES")?l.USE_PROFILES:!1,Xe=l.ALLOW_ARIA_ATTR!==!1,Z=l.ALLOW_DATA_ATTR!==!1,z=l.ALLOW_UNKNOWN_PROTOCOLS||!1,oe=l.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Me=l.SAFE_FOR_TEMPLATES||!1,Fe=l.SAFE_FOR_XML!==!1,Ue=l.WHOLE_DOCUMENT||!1,ot=l.RETURN_DOM||!1,Y=l.RETURN_DOM_FRAGMENT||!1,re=l.RETURN_TRUSTED_TYPE||!1,ct=l.FORCE_BODY||!1,me=l.SANITIZE_DOM!==!1,nt=l.SANITIZE_NAMED_PROPS||!1,T=l.KEEP_CONTENT!==!1,M=l.IN_PLACE||!1,Be=l.ALLOWED_URI_REGEXP||El,ze=l.NAMESPACE||Re,de=l.MATHML_TEXT_INTEGRATION_POINTS||de,v=l.HTML_INTEGRATION_POINTS||v,Se=l.CUSTOM_ELEMENT_HANDLING||{},l.CUSTOM_ELEMENT_HANDLING&&ht(l.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(Se.tagNameCheck=l.CUSTOM_ELEMENT_HANDLING.tagNameCheck),l.CUSTOM_ELEMENT_HANDLING&&ht(l.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(Se.attributeNameCheck=l.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),l.CUSTOM_ELEMENT_HANDLING&&typeof l.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(Se.allowCustomizedBuiltInElements=l.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Me&&(Z=!1),Y&&(ot=!0),L&&(ue=Je({},wl),Oe=[],L.html===!0&&(Je(ue,vl),Je(Oe,kl)),L.svg===!0&&(Je(ue,Fo),Je(Oe,Uo),Je(Oe,Cs)),L.svgFilters===!0&&(Je(ue,jo),Je(Oe,Uo),Je(Oe,Cs)),L.mathMl===!0&&(Je(ue,Bo),Je(Oe,$l),Je(Oe,Cs))),l.ADD_TAGS&&(typeof l.ADD_TAGS=="function"?$e.tagCheck=l.ADD_TAGS:(ue===Te&&(ue=hr(ue)),Je(ue,l.ADD_TAGS,J))),l.ADD_ATTR&&(typeof l.ADD_ATTR=="function"?$e.attributeCheck=l.ADD_ATTR:(Oe===De&&(Oe=hr(Oe)),Je(Oe,l.ADD_ATTR,J))),l.ADD_URI_SAFE_ATTR&&Je(q,l.ADD_URI_SAFE_ATTR,J),l.FORBID_CONTENTS&&(G===se&&(G=hr(G)),Je(G,l.FORBID_CONTENTS,J)),T&&(ue["#text"]=!0),Ue&&Je(ue,["html","head","body"]),ue.table&&(Je(ue,["tbody"]),delete We.tbody),l.TRUSTED_TYPES_POLICY){if(typeof l.TRUSTED_TYPES_POLICY.createHTML!="function")throw Tn('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof l.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Tn('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');N=l.TRUSTED_TYPES_POLICY,R=N.createHTML("")}else N===void 0&&(N=rf($,s)),N!==null&&typeof R=="string"&&(R=N.createHTML(""));Rt&&Rt(l),Ee=l}},Qe=Je({},[...Fo,...jo,...Hp]),Et=Je({},[...Bo,...Gp]),Vt=function(l){let m=D(l);(!m||!m.tagName)&&(m={namespaceURI:ze,tagName:"template"});let x=Rs(l.tagName),K=Rs(m.tagName);return U[l.namespaceURI]?l.namespaceURI===ve?m.namespaceURI===Re?x==="svg":m.namespaceURI===ae?x==="svg"&&(K==="annotation-xml"||de[K]):!!Qe[x]:l.namespaceURI===ae?m.namespaceURI===Re?x==="math":m.namespaceURI===ve?x==="math"&&v[K]:!!Et[x]:l.namespaceURI===Re?m.namespaceURI===ve&&!v[K]||m.namespaceURI===ae&&!de[K]?!1:!Et[x]&&(S[x]||!Qe[x]):!!(I==="application/xhtml+xml"&&U[l.namespaceURI]):!1},wt=function(l){Sn(t.removed,{element:l});try{D(l).removeChild(l)}catch{W(l)}},Ot=function(l,m){try{Sn(t.removed,{attribute:m.getAttributeNode(l),from:m})}catch{Sn(t.removed,{attribute:null,from:m})}if(m.removeAttribute(l),l==="is")if(ot||Y)try{wt(m)}catch{}else try{m.setAttribute(l,"")}catch{}},sr=function(l){let m=null,x=null;if(ct)l="<remove></remove>"+l;else{let Ae=qo(l,/^[\r\n\t ]+/);x=Ae&&Ae[0]}I==="application/xhtml+xml"&&ze===Re&&(l='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+l+"</body></html>");let K=N?N.createHTML(l):l;if(ze===Re)try{m=new h().parseFromString(K,I)}catch{}if(!m||!m.documentElement){m=j.createDocument(ze,"template",null);try{m.documentElement.innerHTML=He?R:K}catch{}}let le=m.body||m.documentElement;return l&&x&&le.insertBefore(r.createTextNode(x),le.childNodes[0]||null),ze===Re?V.call(m,Ue?"html":"body")[0]:Ue?m.documentElement:le},or=function(l){return b.call(l.ownerDocument||l,l,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},ar=function(l){return l instanceof _&&(typeof l.nodeName!="string"||typeof l.textContent!="string"||typeof l.removeChild!="function"||!(l.attributes instanceof f)||typeof l.removeAttribute!="function"||typeof l.setAttribute!="function"||typeof l.namespaceURI!="string"||typeof l.insertBefore!="function"||typeof l.hasChildNodes!="function")},_r=function(l){return typeof c=="function"&&l instanceof c};function kt(we,l,m){Ts(we,x=>{x.call(t,l,m,Ee)})}let Kt=function(l){let m=null;if(kt(P.beforeSanitizeElements,l,null),ar(l))return wt(l),!0;let x=J(l.nodeName);if(kt(P.uponSanitizeElement,l,{tagName:x,allowedTags:ue}),Fe&&l.hasChildNodes()&&!_r(l.firstElementChild)&&Ct(/<[/\w!]/g,l.innerHTML)&&Ct(/<[/\w!]/g,l.textContent)||l.nodeType===Rn.progressingInstruction||Fe&&l.nodeType===Rn.comment&&Ct(/<[/\w]/g,l.data))return wt(l),!0;if(!($e.tagCheck instanceof Function&&$e.tagCheck(x))&&(!ue[x]||We[x])){if(!We[x]&&lr(x)&&(Se.tagNameCheck instanceof RegExp&&Ct(Se.tagNameCheck,x)||Se.tagNameCheck instanceof Function&&Se.tagNameCheck(x)))return!1;if(T&&!G[x]){let K=D(l)||l.parentNode,le=ee(l)||l.childNodes;if(le&&K){let Ae=le.length;for(let be=Ae-1;be>=0;--be){let Ye=O(le[be],!0);Ye.__removalCount=(l.__removalCount||0)+1,K.insertBefore(Ye,te(l))}}}return wt(l),!0}return l instanceof u&&!Vt(l)||(x==="noscript"||x==="noembed"||x==="noframes")&&Ct(/<\/no(script|embed|frames)/i,l.innerHTML)?(wt(l),!0):(Me&&l.nodeType===Rn.text&&(m=l.textContent,Ts([F,pe,ye],K=>{m=En(m,K," ")}),l.textContent!==m&&(Sn(t.removed,{element:l.cloneNode()}),l.textContent=m)),kt(P.afterSanitizeElements,l,null),!1)},ir=function(l,m,x){if(me&&(m==="id"||m==="name")&&(x in r||x in Ie))return!1;if(!(Z&&!Ze[m]&&Ct(_e,m))){if(!(Xe&&Ct(je,m))){if(!($e.attributeCheck instanceof Function&&$e.attributeCheck(m,l))){if(!Oe[m]||Ze[m]){if(!(lr(l)&&(Se.tagNameCheck instanceof RegExp&&Ct(Se.tagNameCheck,l)||Se.tagNameCheck instanceof Function&&Se.tagNameCheck(l))&&(Se.attributeNameCheck instanceof RegExp&&Ct(Se.attributeNameCheck,m)||Se.attributeNameCheck instanceof Function&&Se.attributeNameCheck(m,l))||m==="is"&&Se.allowCustomizedBuiltInElements&&(Se.tagNameCheck instanceof RegExp&&Ct(Se.tagNameCheck,x)||Se.tagNameCheck instanceof Function&&Se.tagNameCheck(x))))return!1}else if(!q[m]){if(!Ct(Be,En(x,Ke,""))){if(!((m==="src"||m==="xlink:href"||m==="href")&&l!=="script"&&Bp(x,"data:")===0&&w[l])){if(!(z&&!Ct(et,En(x,Ke,"")))){if(x)return!1}}}}}}}return!0},lr=function(l){return l!=="annotation-xml"&&qo(l,Le)},rt=function(l){kt(P.beforeSanitizeAttributes,l,null);let{attributes:m}=l;if(!m||ar(l))return;let x={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:Oe,forceKeepAttr:void 0},K=m.length;for(;K--;){let le=m[K],{name:Ae,namespaceURI:be,value:Ye}=le,st=J(Ae),Ne=Ye,p=Ae==="value"?Ne:Up(Ne);if(x.attrName=st,x.attrValue=p,x.keepAttr=!0,x.forceKeepAttr=void 0,kt(P.uponSanitizeAttribute,l,x),p=x.attrValue,nt&&(st==="id"||st==="name")&&(Ot(Ae,l),p=ge+p),Fe&&Ct(/((--!?|])>)|<\/(style|title|textarea)/i,p)){Ot(Ae,l);continue}if(st==="attributename"&&qo(p,"href")){Ot(Ae,l);continue}if(x.forceKeepAttr)continue;if(!x.keepAttr){Ot(Ae,l);continue}if(!oe&&Ct(/\/>/i,p)){Ot(Ae,l);continue}Me&&Ts([F,pe,ye],k=>{p=En(p,k," ")});let g=J(l.nodeName);if(!ir(g,st,p)){Ot(Ae,l);continue}if(N&&typeof $=="object"&&typeof $.getAttributeType=="function"&&!be)switch($.getAttributeType(g,st)){case"TrustedHTML":{p=N.createHTML(p);break}case"TrustedScriptURL":{p=N.createScriptURL(p);break}}if(p!==Ne)try{be?l.setAttributeNS(be,Ae,p):l.setAttribute(Ae,p),ar(l)?wt(l):yl(t.removed)}catch{Ot(Ae,l)}}kt(P.afterSanitizeAttributes,l,null)},Nt=function we(l){let m=null,x=or(l);for(kt(P.beforeSanitizeShadowDOM,l,null);m=x.nextNode();)kt(P.uponSanitizeShadowNode,m,null),Kt(m),rt(m),m.content instanceof o&&we(m.content);kt(P.afterSanitizeShadowDOM,l,null)};return t.sanitize=function(we){let l=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},m=null,x=null,K=null,le=null;if(He=!we,He&&(we="<!-->"),typeof we!="string"&&!_r(we))if(typeof we.toString=="function"){if(we=we.toString(),typeof we!="string")throw Tn("dirty is not a string, aborting")}else throw Tn("toString is not a function");if(!t.isSupported)return we;if(tt||yt(l),t.removed=[],typeof we=="string"&&(M=!1),M){if(we.nodeName){let Ye=J(we.nodeName);if(!ue[Ye]||We[Ye])throw Tn("root node is forbidden and cannot be sanitized in-place")}}else if(we instanceof c)m=sr("<!---->"),x=m.ownerDocument.importNode(we,!0),x.nodeType===Rn.element&&x.nodeName==="BODY"||x.nodeName==="HTML"?m=x:m.appendChild(x);else{if(!ot&&!Me&&!Ue&&we.indexOf("<")===-1)return N&&re?N.createHTML(we):we;if(m=sr(we),!m)return ot?null:re?R:""}m&&ct&&wt(m.firstChild);let Ae=or(M?we:m);for(;K=Ae.nextNode();)Kt(K),rt(K),K.content instanceof o&&Nt(K.content);if(M)return we;if(ot){if(Y)for(le=E.call(m.ownerDocument);m.firstChild;)le.appendChild(m.firstChild);else le=m;return(Oe.shadowroot||Oe.shadowrootmode)&&(le=ne.call(n,le,!0)),le}let be=Ue?m.outerHTML:m.innerHTML;return Ue&&ue["!doctype"]&&m.ownerDocument&&m.ownerDocument.doctype&&m.ownerDocument.doctype.name&&Ct(Tl,m.ownerDocument.doctype.name)&&(be="<!DOCTYPE "+m.ownerDocument.doctype.name+`>
`+be),Me&&Ts([F,pe,ye],Ye=>{be=En(be,Ye," ")}),N&&re?N.createHTML(be):be},t.setConfig=function(){let we=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};yt(we),tt=!0},t.clearConfig=function(){Ee=null,tt=!1},t.isValidAttribute=function(we,l,m){Ee||yt({});let x=J(we),K=J(l);return ir(x,K,m)},t.addHook=function(we,l){typeof l=="function"&&Sn(P[we],l)},t.removeHook=function(we,l){if(l!==void 0){let m=Fp(P[we],l);return m===-1?void 0:jp(P[we],m,1)[0]}return yl(P[we])},t.removeHooks=function(we){P[we]=[]},t.removeAllHooks=function(){P=Al()},t}var Rl=Cl();var yr={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Is=e=>(...t)=>({_$litDirective$:e,values:t}),un=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,n){this._$Ct=t,this._$AM=r,this._$Ci=n}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var In=class extends un{constructor(t){if(super(t),this.it=bt,t.type!==yr.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===bt||t==null)return this._t=void 0,this.it=t;if(t===Wt)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};In.directiveName="unsafeHTML",In.resultType=1;var Il=Is(In);function Yo(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var zr=Yo();function ql(e){zr=e}var Pn={exec:()=>null};function at(e,t=""){let r=typeof e=="string"?e:e.source,n={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(Lt.caret,"$1"),r=r.replace(s,a),n},getRegex:()=>new RegExp(r,t)};return n}var nf=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Lt={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},sf=/^(?:[ \t]*(?:\n|$))+/,of=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,af=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Dn=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,lf=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Zo=/(?:[*+-]|\d{1,9}[.)])/,Fl=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,jl=at(Fl).replace(/bull/g,Zo).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),cf=at(Fl).replace(/bull/g,Zo).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Xo=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,uf=/^[^\n]+/,Qo=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,df=at(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Qo).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),pf=at(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Zo).getRegex(),Ns="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Jo=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,ff=at("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Jo).replace("tag",Ns).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Bl=at(Xo).replace("hr",Dn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ns).getRegex(),_f=at(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Bl).getRegex(),ea={blockquote:_f,code:of,def:df,fences:af,heading:lf,hr:Dn,html:ff,lheading:jl,list:pf,newline:sf,paragraph:Bl,table:Pn,text:uf},Ll=at("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Dn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ns).getRegex(),mf={...ea,lheading:cf,table:Ll,paragraph:at(Xo).replace("hr",Dn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Ll).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ns).getRegex()},gf={...ea,html:at(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Jo).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Pn,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:at(Xo).replace("hr",Dn).replace("heading",` *#{1,6} *[^
]`).replace("lheading",jl).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},bf=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,hf=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Ul=/^( {2,}|\\)\n(?!\s*$)/,yf=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,qs=/[\p{P}\p{S}]/u,ta=/[\s\p{P}\p{S}]/u,Wl=/[^\s\p{P}\p{S}]/u,vf=at(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,ta).getRegex(),zl=/(?!~)[\p{P}\p{S}]/u,wf=/(?!~)[\s\p{P}\p{S}]/u,kf=/(?:[^\s\p{P}\p{S}]|~)/u,$f=at(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",nf?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Hl=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,xf=at(Hl,"u").replace(/punct/g,qs).getRegex(),Af=at(Hl,"u").replace(/punct/g,zl).getRegex(),Gl="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Sf=at(Gl,"gu").replace(/notPunctSpace/g,Wl).replace(/punctSpace/g,ta).replace(/punct/g,qs).getRegex(),Ef=at(Gl,"gu").replace(/notPunctSpace/g,kf).replace(/punctSpace/g,wf).replace(/punct/g,zl).getRegex(),Tf=at("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Wl).replace(/punctSpace/g,ta).replace(/punct/g,qs).getRegex(),Cf=at(/\\(punct)/,"gu").replace(/punct/g,qs).getRegex(),Rf=at(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),If=at(Jo).replace("(?:-->|$)","-->").getRegex(),Lf=at("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",If).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Ms=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Of=at(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Ms).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Vl=at(/^!?\[(label)\]\[(ref)\]/).replace("label",Ms).replace("ref",Qo).getRegex(),Kl=at(/^!?\[(ref)\](?:\[\])?/).replace("ref",Qo).getRegex(),Mf=at("reflink|nolink(?!\\()","g").replace("reflink",Vl).replace("nolink",Kl).getRegex(),Ol=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,ra={_backpedal:Pn,anyPunctuation:Cf,autolink:Rf,blockSkip:$f,br:Ul,code:hf,del:Pn,emStrongLDelim:xf,emStrongRDelimAst:Sf,emStrongRDelimUnd:Tf,escape:bf,link:Of,nolink:Kl,punctuation:vf,reflink:Vl,reflinkSearch:Mf,tag:Lf,text:yf,url:Pn},Pf={...ra,link:at(/^!?\[(label)\]\((.*?)\)/).replace("label",Ms).getRegex(),reflink:at(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Ms).getRegex()},Go={...ra,emStrongRDelimAst:Ef,emStrongLDelim:Af,url:at(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Ol).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:at(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Ol).getRegex()},Df={...Go,br:at(Ul).replace("{2,}","*").getRegex(),text:at(Go.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Ls={normal:ea,gfm:mf,pedantic:gf},Ln={normal:ra,gfm:Go,breaks:Df,pedantic:Pf},Nf={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Ml=e=>Nf[e];function vr(e,t){if(t){if(Lt.escapeTest.test(e))return e.replace(Lt.escapeReplace,Ml)}else if(Lt.escapeTestNoEncode.test(e))return e.replace(Lt.escapeReplaceNoEncode,Ml);return e}function Pl(e){try{e=encodeURI(e).replace(Lt.percentDecode,"%")}catch{return null}return e}function Dl(e,t){let r=e.replace(Lt.findPipe,(o,a,c)=>{let u=!1,d=a;for(;--d>=0&&c[d]==="\\";)u=!u;return u?"|":" |"}),n=r.split(Lt.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(Lt.slashPipe,"|");return n}function On(e,t,r){let n=e.length;if(n===0)return"";let s=0;for(;s<n;){let o=e.charAt(n-s-1);if(o===t&&!r)s++;else if(o!==t&&r)s++;else break}return e.slice(0,n-s)}function qf(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return r>0?-2:-1}function Nl(e,t,r,n,s){let o=t.href,a=t.title||null,c=e[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let u={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:a,text:c,tokens:n.inlineTokens(c)};return n.state.inLink=!1,u}function Ff(e,t,r){let n=e.match(r.other.indentCodeCompensation);if(n===null)return t;let s=n[1];return t.split(`
`).map(o=>{let a=o.match(r.other.beginningSpace);if(a===null)return o;let[c]=a;return c.length>=s.length?o.slice(s.length):o}).join(`
`)}var Ps=class{constructor(e){lt(this,"options");lt(this,"rules");lt(this,"lexer");this.options=e||zr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:On(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],n=Ff(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let n=On(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:On(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=On(t[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let a=!1,c=[],u;for(u=0;u<r.length;u++)if(this.rules.other.blockquoteStart.test(r[u]))c.push(r[u]),a=!0;else if(!a)c.push(r[u]);else break;r=r.slice(u);let d=c.join(`
`),f=d.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${d}`:d,s=s?`${s}
${f}`:f;let _=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(f,o,!0),this.lexer.state.top=_,r.length===0)break;let h=o.at(-1);if(h?.type==="code")break;if(h?.type==="blockquote"){let $=h,A=$.raw+`
`+r.join(`
`),O=this.blockquote(A);o[o.length-1]=O,n=n.substring(0,n.length-$.raw.length)+O.raw,s=s.substring(0,s.length-$.text.length)+O.text;break}else if(h?.type==="list"){let $=h,A=$.raw+`
`+r.join(`
`),O=this.list(A);o[o.length-1]=O,n=n.substring(0,n.length-h.raw.length)+O.raw,s=s.substring(0,s.length-$.raw.length)+O.raw,r=A.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),a=!1;for(;e;){let u=!1,d="",f="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;d=t[0],e=e.substring(d.length);let _=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,O=>" ".repeat(3*O.length)),h=e.split(`
`,1)[0],$=!_.trim(),A=0;if(this.options.pedantic?(A=2,f=_.trimStart()):$?A=t[1].length+1:(A=t[2].search(this.rules.other.nonSpaceChar),A=A>4?1:A,f=_.slice(A),A+=t[1].length),$&&this.rules.other.blankLine.test(h)&&(d+=h+`
`,e=e.substring(h.length+1),u=!0),!u){let O=this.rules.other.nextBulletRegex(A),W=this.rules.other.hrRegex(A),te=this.rules.other.fencesBeginRegex(A),ee=this.rules.other.headingBeginRegex(A),D=this.rules.other.htmlBeginRegex(A);for(;e;){let N=e.split(`
`,1)[0],R;if(h=N,this.options.pedantic?(h=h.replace(this.rules.other.listReplaceNesting,"  "),R=h):R=h.replace(this.rules.other.tabCharGlobal,"    "),te.test(h)||ee.test(h)||D.test(h)||O.test(h)||W.test(h))break;if(R.search(this.rules.other.nonSpaceChar)>=A||!h.trim())f+=`
`+R.slice(A);else{if($||_.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||te.test(_)||ee.test(_)||W.test(_))break;f+=`
`+h}!$&&!h.trim()&&($=!0),d+=N+`
`,e=e.substring(N.length+1),_=R.slice(A)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(d)&&(a=!0)),s.items.push({type:"list_item",raw:d,task:!!this.options.gfm&&this.rules.other.listIsTask.test(f),loose:!1,text:f,tokens:[]}),s.raw+=d}let c=s.items.at(-1);if(c)c.raw=c.raw.trimEnd(),c.text=c.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let u of s.items){if(this.lexer.state.top=!1,u.tokens=this.lexer.blockTokens(u.text,[]),u.task){if(u.text=u.text.replace(this.rules.other.listReplaceTask,""),u.tokens[0]?.type==="text"||u.tokens[0]?.type==="paragraph"){u.tokens[0].raw=u.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),u.tokens[0].text=u.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let f=this.lexer.inlineQueue.length-1;f>=0;f--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[f].src)){this.lexer.inlineQueue[f].src=this.lexer.inlineQueue[f].src.replace(this.rules.other.listReplaceTask,"");break}}let d=this.rules.other.listTaskCheckbox.exec(u.raw);if(d){let f={type:"checkbox",raw:d[0]+" ",checked:d[0]!=="[ ]"};u.checked=f.checked,s.loose?u.tokens[0]&&["paragraph","text"].includes(u.tokens[0].type)&&"tokens"in u.tokens[0]&&u.tokens[0].tokens?(u.tokens[0].raw=f.raw+u.tokens[0].raw,u.tokens[0].text=f.raw+u.tokens[0].text,u.tokens[0].tokens.unshift(f)):u.tokens.unshift({type:"paragraph",raw:f.raw,text:f.raw,tokens:[f]}):u.tokens.unshift(f)}}if(!s.loose){let d=u.tokens.filter(_=>_.type==="space"),f=d.length>0&&d.some(_=>this.rules.other.anyLine.test(_.raw));s.loose=f}}if(s.loose)for(let u of s.items){u.loose=!0;for(let d of u.tokens)d.type==="text"&&(d.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:n,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=Dl(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let a of n)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<r.length;a++)o.header.push({text:r[a],tokens:this.lexer.inline(r[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(Dl(a,o.header.length).map((c,u)=>({text:c,tokens:this.lexer.inline(c),header:!1,align:o.align[u]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=On(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=qf(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let n=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),Nl(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return Nl(r,s,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,a,c=s,u=0,d=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+s);(n=d.exec(t))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(a=[...o].length,n[3]||n[4]){c+=a;continue}else if((n[5]||n[6])&&s%3&&!((s+a)%3)){u+=a;continue}if(c-=a,c>0)continue;a=Math.min(a,a+c+u);let f=[...n[0]][0].length,_=e.slice(0,s+n.index+f+a);if(Math.min(s,a)%2){let $=_.slice(1,-1);return{type:"em",raw:_,text:$,tokens:this.lexer.inlineTokens($)}}let h=_.slice(2,-2);return{type:"strong",raw:_,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,n;return t[2]==="@"?(r=t[1],n="mailto:"+r):(r=t[1],n=r),{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,n;if(t[2]==="@")r=t[0],n="mailto:"+r;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);r=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},tr=class Vo{constructor(t){lt(this,"tokens");lt(this,"options");lt(this,"state");lt(this,"inlineQueue");lt(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||zr,this.options.tokenizer=this.options.tokenizer||new Ps,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:Lt,block:Ls.normal,inline:Ln.normal};this.options.pedantic?(r.block=Ls.pedantic,r.inline=Ln.pedantic):this.options.gfm&&(r.block=Ls.gfm,this.options.breaks?r.inline=Ln.breaks:r.inline=Ln.gfm),this.tokenizer.rules=r}static get rules(){return{block:Ls,inline:Ln}}static lex(t,r){return new Vo(r).lex(t)}static lexInline(t,r){return new Vo(r).inlineTokens(t)}lex(t){t=t.replace(Lt.carriageReturn,`
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
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,r}inline(t,r=[]){return this.inlineQueue.push({src:t,tokens:r}),r}inlineTokens(t,r=[]){let n=t,s=null;if(this.tokens.links){let u=Object.keys(this.tokens.links);if(u.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)u.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let a=!1,c="";for(;t;){a||(c=""),a=!1;let u;if(this.options.extensions?.inline?.some(f=>(u=f.call({lexer:this},t,r))?(t=t.substring(u.raw.length),r.push(u),!0):!1))continue;if(u=this.tokenizer.escape(t)){t=t.substring(u.raw.length),r.push(u);continue}if(u=this.tokenizer.tag(t)){t=t.substring(u.raw.length),r.push(u);continue}if(u=this.tokenizer.link(t)){t=t.substring(u.raw.length),r.push(u);continue}if(u=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(u.raw.length);let f=r.at(-1);u.type==="text"&&f?.type==="text"?(f.raw+=u.raw,f.text+=u.text):r.push(u);continue}if(u=this.tokenizer.emStrong(t,n,c)){t=t.substring(u.raw.length),r.push(u);continue}if(u=this.tokenizer.codespan(t)){t=t.substring(u.raw.length),r.push(u);continue}if(u=this.tokenizer.br(t)){t=t.substring(u.raw.length),r.push(u);continue}if(u=this.tokenizer.del(t)){t=t.substring(u.raw.length),r.push(u);continue}if(u=this.tokenizer.autolink(t)){t=t.substring(u.raw.length),r.push(u);continue}if(!this.state.inLink&&(u=this.tokenizer.url(t))){t=t.substring(u.raw.length),r.push(u);continue}let d=t;if(this.options.extensions?.startInline){let f=1/0,_=t.slice(1),h;this.options.extensions.startInline.forEach($=>{h=$.call({lexer:this},_),typeof h=="number"&&h>=0&&(f=Math.min(f,h))}),f<1/0&&f>=0&&(d=t.substring(0,f+1))}if(u=this.tokenizer.inlineText(d)){t=t.substring(u.raw.length),u.raw.slice(-1)!=="_"&&(c=u.raw.slice(-1)),a=!0;let f=r.at(-1);f?.type==="text"?(f.raw+=u.raw,f.text+=u.text):r.push(u);continue}if(t){let f="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(f);break}else throw new Error(f)}}return r}},Ds=class{constructor(e){lt(this,"options");lt(this,"parser");this.options=e||zr}space(e){return""}code({text:e,lang:t,escaped:r}){let n=(t||"").match(Lt.notSpaceStart)?.[0],s=e.replace(Lt.endingNewline,"")+`
`;return n?'<pre><code class="language-'+vr(n)+'">'+(r?s:vr(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:vr(s,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${vr(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let n=this.parser.parseInline(r),s=Pl(e);if(s===null)return n;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+vr(t)+'"'),o+=">"+n+"</a>",o}image({href:e,title:t,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=Pl(e);if(s===null)return vr(r);e=s;let o=`<img src="${e}" alt="${r}"`;return t&&(o+=` title="${vr(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:vr(e.text)}},na=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},rr=class Ko{constructor(t){lt(this,"options");lt(this,"renderer");lt(this,"textRenderer");this.options=t||zr,this.options.renderer=this.options.renderer||new Ds,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new na}static parse(t,r){return new Ko(r).parse(t)}static parseInline(t,r){return new Ko(r).parseInline(t)}parse(t){let r="";for(let n=0;n<t.length;n++){let s=t[n];if(this.options.extensions?.renderers?.[s.type]){let a=s,c=this.options.extensions.renderers[a.type].call({parser:this},a);if(c!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){r+=c||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}parseInline(t,r=this.renderer){let n="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let c=this.options.extensions.renderers[o.type].call({parser:this},o);if(c!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=c||"";continue}}let a=o;switch(a.type){case"escape":{n+=r.text(a);break}case"html":{n+=r.html(a);break}case"link":{n+=r.link(a);break}case"image":{n+=r.image(a);break}case"checkbox":{n+=r.checkbox(a);break}case"strong":{n+=r.strong(a);break}case"em":{n+=r.em(a);break}case"codespan":{n+=r.codespan(a);break}case"br":{n+=r.br(a);break}case"del":{n+=r.del(a);break}case"text":{n+=r.text(a);break}default:{let c='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return n}},Os,Mn=(Os=class{constructor(e){lt(this,"options");lt(this,"block");this.options=e||zr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?tr.lex:tr.lexInline}provideParser(){return this.block?rr.parse:rr.parseInline}},lt(Os,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),lt(Os,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Os),jf=class{constructor(...e){lt(this,"defaults",Yo());lt(this,"options",this.setOptions);lt(this,"parse",this.parseMarkdown(!0));lt(this,"parseInline",this.parseMarkdown(!1));lt(this,"Parser",rr);lt(this,"Renderer",Ds);lt(this,"TextRenderer",na);lt(this,"Lexer",tr);lt(this,"Tokenizer",Ps);lt(this,"Hooks",Mn);this.use(...e)}walkTokens(e,t){let r=[];for(let n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)r=r.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,t));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);r=r.concat(this.walkTokens(a,t))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let c=s.renderer.apply(this,a);return c===!1&&(c=o.apply(this,a)),c}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),n.extensions=t),r.renderer){let s=this.defaults.renderer||new Ds(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,c=r.renderer[a],u=s[a];s[a]=(...d)=>{let f=c.apply(s,d);return f===!1&&(f=u.apply(s,d)),f||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new Ps(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,c=r.tokenizer[a],u=s[a];s[a]=(...d)=>{let f=c.apply(s,d);return f===!1&&(f=u.apply(s,d)),f}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new Mn;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,c=r.hooks[a],u=s[a];Mn.passThroughHooks.has(o)?s[a]=d=>{if(this.defaults.async&&Mn.passThroughHooksRespectAsync.has(o))return(async()=>{let _=await c.call(s,d);return u.call(s,_)})();let f=c.call(s,d);return u.call(s,f)}:s[a]=(...d)=>{if(this.defaults.async)return(async()=>{let _=await c.apply(s,d);return _===!1&&(_=await u.apply(s,d)),_})();let f=c.apply(s,d);return f===!1&&(f=u.apply(s,d)),f}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(a){let c=[];return c.push(o.call(this,a)),s&&(c=c.concat(s.call(this,a))),c}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return tr.lex(e,t??this.defaults)}parser(e,t){return rr.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,c=await(s.hooks?await s.hooks.provideLexer():e?tr.lex:tr.lexInline)(a,s),u=s.hooks?await s.hooks.processAllTokens(c):c;s.walkTokens&&await Promise.all(this.walkTokens(u,s.walkTokens));let d=await(s.hooks?await s.hooks.provideParser():e?rr.parse:rr.parseInline)(u,s);return s.hooks?await s.hooks.postprocess(d):d})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?tr.lex:tr.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let c=(s.hooks?s.hooks.provideParser():e?rr.parse:rr.parseInline)(a,s);return s.hooks&&(c=s.hooks.postprocess(c)),c}catch(a){return o(a)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+vr(r.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(r);throw r}}},Wr=new jf;function it(e,t){return Wr.parse(e,t)}it.options=it.setOptions=function(e){return Wr.setOptions(e),it.defaults=Wr.defaults,ql(it.defaults),it};it.getDefaults=Yo;it.defaults=zr;it.use=function(...e){return Wr.use(...e),it.defaults=Wr.defaults,ql(it.defaults),it};it.walkTokens=function(e,t){return Wr.walkTokens(e,t)};it.parseInline=Wr.parseInline;it.Parser=rr;it.parser=rr.parse;it.Renderer=Ds;it.TextRenderer=na;it.Lexer=tr;it.lexer=tr.lex;it.Tokenizer=Ps;it.Hooks=Mn;it.parse=it;var hh=it.options,yh=it.setOptions,vh=it.use,wh=it.walkTokens,kh=it.parseInline;var $h=rr.parse,xh=tr.lex;function Rr(e){let t=it.parse(e),r=Rl.sanitize(t);return Il(r)}function wr(e,t){return i`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function dn(e){return e.loading?i`<div class="prompt-block__status">불러오는 중…</div>`:e.error?i`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Fs(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())} ${r(t.getHours())}:${r(t.getMinutes())}`}var Bf={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Uf={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},Wf=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,zf=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function pr(e){return!!e&&typeof e=="object"}function sa(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function Yl(e,t){let r=sa(e),n=sa(t),s=new Map;for(let c of r)s.set(c,(s.get(c)||0)+1);let o=0;for(let c of n){let u=s.get(c)||0;u>0?s.set(c,u-1):o+=1}let a=0;for(let c of s.values())a+=c;return{added:o,removed:a}}function Hf(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>pr(s)&&typeof s.text=="string"?s.text:"").join(""):pr(e)&&typeof e.text=="string"&&(t=e.text);let n=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function Gf(e){let t=String(e.name||""),r=e.input||{},n={kind:"tool",tool:t,icon:Bf[t]||"\u{1F527}",input:r,expandable:!0};if((t==="Read"||t==="Write")&&(n.path=String(r.file_path||r.path||"")),t==="Write"&&(n.added=sa(r.content).length),t==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=Yl(r.old_string,r.new_string);n.added=s,n.removed=o}if(t==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,a=Array.isArray(r.edits)?r.edits:[];for(let c of a){let u=Yl(pr(c)?c.old_string:"",pr(c)?c.new_string:"");s+=u.added,o+=u.removed}n.added=s,n.removed=o}return t==="Bash"&&(n.command=String(r.command||"")),(t==="Grep"||t==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function oa(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function aa(e){let t=e.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=Wf.exec(t);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:t.trim()}:zf.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Vf(e,t){if(e.type==="assistant"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(pr(o)){if(o.type==="text"&&typeof o.text=="string")s.push(aa(o.text));else if(o.type==="thinking"){let a=oa(o.thinking);a&&s.push(a)}else if(o.type==="tool_use"){let a=Gf(o);typeof o.id=="string"&&t.set(o.id,a),s.push(a)}}return s}if(e.type==="user"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(pr(s)&&s.type==="tool_result"){let o=t.get(String(s.tool_use_id));if(o){let a=Hf(s.content);o.result=a,o.output=typeof s.content=="string"?s.content:a}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success";return[{kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""}]}return[]}function Kf(e){if(e.type==="item.completed"&&pr(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[aa(t.text)];if(t.type==="reasoning"){let r=oa(t.text);return r?[r]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Yf(e){if(e.schema!=="codex-delegation-monitor-v1"||!pr(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&pr(t.item)){let r=t.item;if(typeof r.id!="string"||r.id.length===0)return[];if(t.type==="item.completed"&&r.kind==="agent_message"&&typeof r.text=="string"&&r.text.trim().length>0)return[aa(r.text)];if(t.type==="item.completed"&&r.kind==="reasoning"){let c=oa(r.text);return c?[c]:[]}if(r.kind!=="activity"||typeof r.activity!="string")return[];let n=Uf[r.activity];if(!n)return[];let s="\uC2DC\uC791",o="\u2026",a={kind:"tool",tool:"",icon:o,expandable:!1};if(t.type==="item.completed"){if(r.status==="completed")s="\uC644\uB8CC",o="\u2713";else if(r.status==="failed")s="\uC2E4\uD328",o="\u2717";else return[];a.result=""}return a.tool=`${n} \xB7 ${s}`,a.icon=o,[a]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function Zf(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Zl(e){let t=[],r=new Map,n=Array.isArray(e)?e:[];for(let s of n){let o=s;if(typeof s=="string"){let c=s.trim();if(c.length===0)continue;try{o=JSON.parse(c)}catch{continue}}if(!pr(o))continue;let a=o.schema==="codex-delegation-monitor-v1"?Yf(o):Zf(o)?Kf(o):Vf(o,r);for(let c of a)t.push(c)}return t}var Xf=5,Qf=10,Jf=/Task\s+#(\d+)/,e_=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,t_=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function js(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function r_(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function n_(e){for(let t=e.length-1;t>=0;t-=1){let r=e[t];if(r.kind==="phase"||r.kind==="gate")return r.text||null}return null}function s_(e){let t=new Map,r=0;for(let s of e){if(s.kind!=="tool")continue;r+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let u=Jf.exec(s.output||s.result||""),d=String(o.activeForm||o.subject||"").trim();if(!u||d.length===0)continue;t.set(u[1],{label:d,active:o.status==="in_progress"?r:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let c=o.activeForm||o.subject;typeof c=="string"&&c.trim().length>0&&(a.label=c.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?r:0)}let n=null;for(let s of t.values())s.active>0&&(!n||s.active>n.active)&&(n=s);return n?n.label:null}function o_(e){if(e.tool==="Bash"){let t=e.command||"";return e_.test(t)?"~ PR/\uAC8C\uC2DC \uC911":t_.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function a_(e){let t=e.filter(s=>s.kind==="tool").slice(-Qf),r=new Map;t.forEach((s,o)=>{let a=o_(s);if(!a)return;let c=r.get(a)||{count:0,last:-1};c.count+=1,c.last=o,r.set(a,c)});let n=null;for(let[s,o]of r)(!n||o.count>n.count||o.count===n.count&&o.last>n.last)&&(n={label:s,count:o.count,last:o.last});return n?n.label:null}function i_(e){let t=n_(e);if(t)return{text:t,guess:!1};let r=s_(e);if(r)return{text:r,guess:!1};let n=a_(e);return n?{text:n,guess:!0}:null}function l_(e,t){if(typeof e!="number")return"";let r=Math.max(0,Math.floor((t-e)/1e3));return r<60?`${r}\uCD08 \uC804`:jt(e,t)}function Bs(e,t={}){let{transport:r,sessionLogStore:n,onClose:s}=t,o=null,a=null,c=null,u=!1,d={},f=!0,_=new Set,h=new Set,$=null,A=null,O=!1,W=!1,te=!1,ee=null,D=null;function N(){O=!1,W=!1,te=!1,ee=null,D=null}async function R(Z){if(r){W=!0,te=!1,ue();try{let z=await Promise.resolve(r("get-attempt-prompt",{attempt_id:Z}));if(o!==Z)return;!z||typeof z!="object"||Array.isArray(z)?te=!0:(ee=z,D=Z)}catch{o===Z&&(te=!0)}finally{o===Z&&(W=!1,ue())}}}function j(){if(O=!O,O&&o&&D!==o){R(o);return}ue()}function b(){if(!O)return"";let Z=dn({loading:W,error:te});if(Z)return i`<div class="sv__prompt" data-seam="attempt-prompt">
        ${Z}
      </div>`;if(!ee)return"";if(ee.missing)return i`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let z=Fs(ee.recorded_at);return i`<div class="sv__prompt" data-seam="attempt-prompt">
      ${z?i`<div class="prompt-block__meta">${z} 발송</div>`:""}
      ${typeof ee.task_prompt=="string"?wr("\uACFC\uC5C5 (user)",ee.task_prompt):""}
      ${typeof ee.system_prompt=="string"?wr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",ee.system_prompt):""}
    </div>`}function E(){if(!c||!n)return[];let Z=n.get(c);return Zl(Z?Z.lines:[])}function V(){if(!c||!n)return null;let Z=n.get(c),z=Z?Z.last_event_at:null;return typeof z=="number"?z:null}function ne(){return d.status==="running"}function P(){if(ne()&&o){A||(A=setInterval(()=>ue(),1e3));return}F()}function F(){A&&(clearInterval(A),A=null)}function pe(Z){let z=[],oe=0;for(;oe<Z.length;){let Me=Z[oe];if(Me.kind==="tool"){let Fe=oe;for(;Fe<Z.length&&Z[Fe].kind==="tool"&&Z[Fe].tool===Me.tool;)Fe+=1;if(Fe-oe>=Xf&&!h.has(oe)){z.push({kind:"group",idx:oe,tool:Me.tool||"",lines:Z.slice(oe,Fe).map((Ue,tt)=>({idx:oe+tt,line:Ue}))}),oe=Fe;continue}}z.push({kind:"line",idx:oe,line:Me}),oe+=1}return z}function ye(Z){for(let z=Z.length-1;z>=0;z-=1){let oe=Z[z];if(oe.kind==="result"||oe.kind==="error")return null;if(oe.kind==="tool"&&!Object.hasOwn(oe,"result"))return oe}return null}function _e(Z){for(let z=Z.length-1;z>=0;z-=1)if(Z[z].kind==="thinking")return Z[z];return null}function je(Z,z){if(z.kind==="gate")return i`<div class="sv__gate">${z.text}</div>`;if(z.kind==="phase")return i`<div class="sv__phase">${z.text}</div>`;if(z.kind==="result")return i`<div
        class="sv__result${z.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${z.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${Rr(z.text||(z.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(z.kind==="thinking"){let oe=_.has(Z);return i`<div
        class="sv__think${oe?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Oe(Z)}
      >
        <span class="sv__think-line">💭 ${js(z.text)}</span>
        ${oe?i`<pre class="sv__think-expand">${z.text}</pre>`:""}
      </div>`}if(z.kind==="error")return i`<div class="sv__error">⛔ ${z.text}</div>`;if(z.kind==="blocker")return i`<div class="sv__error">⛔ ${z.text}</div>`;if(z.kind==="tool"){let oe=_.has(Z),Me=z.tool==="Bash"?r_(z.command):0,Fe=z.tool==="Bash"?Me>1?js(z.command):z.command:z.path||z.command||"";return i`<div
        class="sv__tool${oe?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>Oe(Z)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${z.icon}</span>
          <span class="sv__tool-name">${z.tool}</span>
          ${Fe?i`<span class="sv__tool-detail">${Fe}</span>`:""}
          ${Me>1?i`<span class="sv__tool-more">⋯ ${Me}줄</span>`:""}
          ${typeof z.added=="number"?i`<span class="sv__diff-add">+${z.added}</span>`:""}
          ${typeof z.removed=="number"?i`<span class="sv__diff-del">−${z.removed}</span>`:""}
          ${z.result?i`<span class="sv__tool-ok">→ ${z.result}</span>`:""}
        </span>
        ${oe?i`<pre class="sv__tool-expand">${et(z)}</pre>`:""}
      </div>`}return i`<div class="sv__as">${Rr(z.text||"")}</div>`}function et(Z){let z=[];if(Z.tool==="Bash"&&typeof Z.command=="string"&&Z.command.length>0)z.push(Z.command);else if(Z.input!==void 0)try{z.push(`input: ${JSON.stringify(Z.input,null,2)}`)}catch{}return typeof Z.output=="string"&&Z.output.length>0&&z.push(`output:
${Z.output}`),z.join(`

`)}function Ke(){if(!o)return i``;let Z=E(),z=(a?[d.model,d.effort]:[d.runner,d.model,d.effort]).filter(Boolean).join(" \xB7 "),oe=d.session_id||"",Me=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${f?"ON":"OFF"}`,Fe=ne(),Ue=Fe?l_(V(),Date.now()):"",tt=Fe?ye(Z):null,ct=Fe?_e(Z):null,ot=i_(Z);return i`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${a?d.role||"":o}</span>
        ${ot?i`<span
              class="sv__stage${ot.guess?" sv__stage--guess":""}"
              title=${ot.text}
              >${ot.text}</span
            >`:""}
        ${Fe?i`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${Ue?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${Ue}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${Ue?i`<span class="sv__live-ago">${Ue}</span>`:""}</span
            >`:""}
        ${oe?i`<button
              type="button"
              class="sv__session"
              title=${oe}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${oe}`}
              @click=${()=>Se(oe)}
            >
              ⧉ ${oe.slice(0,8)}
            </button>`:""}
        ${z?i`<span class="sv__meta">${z}</span>`:""}
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
              @click=${j}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${f?" sv__follow--on":""}"
          aria-pressed=${f?"true":"false"}
          aria-label=${Me}
          @click=${De}
        >
          <span class="sv__follow-full">⇣ ${Me}</span>
          <span class="sv__follow-short">⇣ ${f?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>Xe()}
        >
          ✕
        </button>
      </div>
      ${a||u?"":b()}
      <div class="sv__body">
        ${Z.length===0?i`<div class="sv__empty">세션 로그 없음</div>`:pe(Z).map(Y=>Y.kind==="group"?Le(Y):je(Y.idx,Y.line))}
      </div>
      ${tt||ct?i`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${tt?i`<span class="sv__now-icon">${tt.icon}</span>
                  <span class="sv__now-name">${tt.tool}</span>
                  <span class="sv__now-detail"
                    >${tt.tool==="Bash"?js(tt.command):tt.path||tt.command||""}</span
                  >`:""}
            ${ct?i`<span class="sv__now-think"
                  >💭 ${js(ct.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function Le(Z){return i`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>Be(Z.idx)}
    >
      <span class="sv__group-icon">${Z.lines[0].line.icon}</span>
      <span class="sv__group-name">${Z.tool}</span>
      <span class="sv__group-count">${Z.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function Be(Z){h.add(Z),ue()}function ue(){Ge(Ke(),e),P(),f&&Te()}function Te(){let Z=e.querySelector(".sv__body");Z&&(Z.scrollTop=Z.scrollHeight)}function Oe(Z){_.has(Z)?_.delete(Z):_.add(Z),ue()}function De(){f=!f,ue()}function Se(Z){Qt(Z).then(z=>{z?ie("\uBCF5\uC0AC\uB428","success",1200):ie("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function We(Z){!o||!Z||(d={...d,...Z},ue())}function Ze(Z){let z=Z.target;if(!z||!z.classList||!z.classList.contains("sv__body"))return;!(z.scrollHeight-z.scrollTop-z.clientHeight<=4)&&f&&(f=!1,ue())}e.addEventListener("scroll",Ze,!0);function $e(Z){let z=Z&&Z.attempt_id;if(!z)return;let oe=c;o=z,a=typeof Z.launch_id=="string"&&Z.launch_id.length>0?Z.launch_id:null,c=a?`session-log:${o}:${a}`:`session-log:${o}`,r&&oe&&oe!==c&&Promise.resolve(r("unsubscribe-session-log",{id:oe})).catch(()=>{}),d=Z.meta||{},u=Z.hide_prompt===!0,f=!0,_.clear(),h.clear(),N(),!$&&n&&($=n.subscribe(ue)),r&&Promise.resolve(r("subscribe-session-log",{id:c,attempt_id:o,...a?{launch_id:a}:{}})).catch(()=>{}),ue()}function Xe(){let Z=c;o=null,a=null,c=null,u=!1,_.clear(),h.clear(),N(),F(),r&&Z&&Promise.resolve(r("unsubscribe-session-log",{id:Z})).catch(()=>{}),Ge(i``,e),s&&s()}return{open:$e,updateMeta:We,close:Xe,isOpen(){return o!==null},destroy(){F(),$&&($(),$=null),e.removeEventListener("scroll",Ze,!0),o=null,a=null,c=null,u=!1,Ge(i``,e)}}}function Us(e){let t=e&&typeof e=="object"?e:{},r=t.metadata&&typeof t.metadata=="object"?t.metadata:{},n=ia(t.spec_id),s=ia(r.spec_id);return n?{path:n,source:"native",conflict:s.length>0&&s!==n}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function ia(e){return typeof e=="string"?e.trim():""}function Xl(e){let t=Us(e);if(t.path)return t;let r=ia(c_(e).spec_path);return r?{path:r,source:"draft",conflict:!1}:t}function c_(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}function u_(e){return["plan_review","plan_approval","plan_check"].some(t=>{let r=e[t];return typeof r=="string"&&r.trim().length>0})}function d_(e){let t=e&&e.metadata||{},r=Xl(e),n=[];return r.path&&n.push({kind:"spec",path:r.path,missing_state:r.source==="draft"?"spec_draft":null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&n.push({kind:"plan",path:t.plan_path.trim(),missing_state:u_(t)?null:"plan_pending"}),n}function Ql(e,t){let r=d_(e);return i`
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
  `}var p_="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",f_=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,__=/^\*\*결론\*\* — (.+)$/;function Ws(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==p_)return null;let r=f_.exec(t[1]||"");if(!r)return null;let n=r[1].split(" ")[0],s=r[2],o=r[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let c=a<t.length?__.exec(t[a]):null,u=c?c[1].replace(/\s+/g," ").trim():"",d=c?a+1:a;return{lane:n,identifier:s,timestamp:o,conclusion:u,body:t.slice(d).join(`
`).trim()}}var Jl=20;function ec(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let r=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${r}-${n} ${s}:${o}`}function m_(e){return e.length>Jl?`${e.slice(0,Jl)}\u2026`:e}function g_(e,t,r,n){let s=`${t.lane} ${m_(t.identifier)}`;return i`<div class="detail-report">
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
        <span class="detail-report__time">${ec(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${n&&t.body.length>0?i`<div class="detail-report__body">
          ${Rr(t.body)}
        </div>`:""}
  </div>`}function b_(e){return i`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${ec(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${Rr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function tc(e,t={},r={}){let n=Array.isArray(e)?e.filter(Boolean):[],s=r.expanded||new Set,o=typeof r.draft=="string"?r.draft:"",a=r.sending===!0,c=n.slice().sort((u,d)=>String(d.created_at||"").localeCompare(String(u.created_at||"")));return i`
    <div class="detail-section-label">댓글 (${n.length})</div>
    ${r.error?i`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:c.length===0?i`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:i`<div class="detail-comments" data-seam="comments">
            ${c.map(u=>{let d=Ws(typeof u.text=="string"?u.text:"");return d?g_(u,d,t,s.has(u.id)):b_(u)})}
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
  `}var{I:ny}=xi;var rc=e=>e.strings===void 0;var h_={},nc=(e,t=h_)=>e._$AH=t;var Hr=Is(class extends un{constructor(e){if(super(e),e.type!==yr.PROPERTY&&e.type!==yr.ATTRIBUTE&&e.type!==yr.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!rc(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===Wt||t===bt)return t;let r=e.element,n=e.name;if(e.type===yr.PROPERTY){if(t===r[n])return Wt}else if(e.type===yr.BOOLEAN_ATTRIBUTE){if(!!t===r.hasAttribute(n))return Wt}else if(e.type===yr.ATTRIBUTE&&r.getAttribute(n)===t+"")return Wt;return nc(e),t}});var zs=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],ca=[...zs.filter(e=>e!=="impl_dispatch"),"quick_fix_impl_model"],kr=["orchestration_model","orchestration_effort","orchestration_speed"],Hs=[...zs,...kr],y_=ca.filter(e=>Hs.includes(e)),sc=["delegated","main"],Gs=["inherit","claude","codex"],Nn=["default","fast"],qn=["standard","fast_track"],Fn=["codex","opus","fable","self","skip"],Vs=["codex","fable","skip"],Ks=["low","medium","high","xhigh"],Ut="auto";function Bt(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function oc(e){if(!Bt(e)||!Bt(e.runners))return[];let t=[];for(let[r,n]of Object.entries(e.runners))Bt(n)&&Bt(n.models)&&t.push([r,Object.keys(n.models)]);return t}function pn(e,t){let r=oc(e),n=t&&t!=="inherit"?r.filter(([s])=>s===t):r;return[Ut,...n.flatMap(([,s])=>s)]}function ac(e,t,r,n){if(!Bt(e)||!Bt(e.runners))return[Ut];let s=[];for(let[o,a]of Object.entries(e.runners))if(!(!Bt(a)||!Bt(a.models))&&!(t&&t!=="inherit"&&o!==t))for(let[c,u]of Object.entries(a.models)){if(r&&r!==Ut&&c!==r)continue;let d=n(a,u);if(Array.isArray(d))for(let f of d)typeof f=="string"&&!s.includes(f)&&s.push(f)}return[Ut,...s]}function fn(e,t,r){return ac(e,t,r,(n,s)=>Bt(s)&&Array.isArray(s.efforts)?s.efforts:n.efforts)}function ua(e,t,r){return ac(e,t,r,(n,s)=>Bt(s)&&Array.isArray(s.orchestration_efforts)?s.orchestration_efforts:Bt(s)&&Array.isArray(s.efforts)?s.efforts:n.efforts)}function jn(e,t){let r=oc(e);return(t?r.filter(([s])=>s===t):r).flatMap(([,s])=>s)}function ic(e,t,r){let n={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},s=n.impl_runtime==="claude"||n.impl_runtime==="codex"?n.impl_runtime:n.impl_runtime==="inherit"?r:null;return s&&(n.impl_model&&!pn(t,s).includes(n.impl_model)&&(n.impl_model=void 0),n.impl_effort&&!fn(t,s,n.impl_model||Ut).includes(n.impl_effort)&&(n.impl_effort=void 0)),n}var v_={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},la=[...y_,...kr],w_=[...Hs,...ca].filter((e,t,r)=>r.indexOf(e)===t&&!la.includes(e));function lc(e,t){let r=Bt(e)?e:{},n=Bt(t)?t:{},s=[];for(let a of la){let c=r[a]??null,u=n[a]??null;c!==u&&s.push({key:a,label:v_[a]||a,before:c,after:u,kind:c===null?"added":u===null?"removed":"changed"})}let o=[];for(let a of[...w_,...Object.keys(n)])!la.includes(a)&&!o.includes(a)&&Object.hasOwn(n,a)&&o.push(a);return{rows:s,ignored_keys:o}}function da(e,t,r,n,s,o){return As({key:e,choices:t,layer:"global",global:r,resolution_global:o,execution_defaults:n,runner_catalog:s})}function cc(e,t){let r={};for(let n of ca){let s=e?.[n],o=t?.[n];s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}function uc(e,t){let r={};for(let n of kr){let s=e?.[n]??null,o=t?.[n]??null;s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}var pa=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...kr]}],fa={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},dc={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function _a(e,t,r,n,s,o=null){let a=Tr({pin:t,global:r,execution_defaults:n,runner_catalog:s,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:o});return e.map(c=>({key:c,...a[c]}))}function pc(e,t,r,n,s,o=null){let a={pin:0,global:0,base:0};for(let c of _a(e,t,r,n,s,o))a[c.source]+=1;return a}function fc(e,t,r){return{id:e,key:t,value:typeof r=="string"?r:""}}function _c(e,t,r){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:r}}var _y=[...zs,...kr];var k_=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review"},{id:"impl",label:"\uAD6C\uD604",receipt:null},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review"},{id:"pr",label:"PR",receipt:null}],$_={pin:"pin",global:"global",base:"base"};function x_(e){return i`<span
    class=${`detail-layer-rail detail-layer-rail--${$_[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function A_(e,t,r){switch(e){case"workflow_mode":return qn;case"spec_review_model":case"impl_review_model":return Fn;case"plan_review_model":return Vs;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return Ks;case"impl_dispatch":return sc;case"impl_runtime":return Gs;case"impl_model":return pn(r,t.impl_runtime);case"impl_effort":return fn(r,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return Nn;case"orchestration_model":return jn(r,null);case"orchestration_effort":return fn(r,void 0,t.orchestration_model||Ut).filter(n=>n!==Ut);default:return[]}}function S_(e,t){return i`<div class="detail-effective__row" data-key=${e.key}>
    ${x_(e.source)}
    <span class="detail-effective__k"
      >${fa[e.key]||e.key}</span
    >
    <span
      class=${`detail-effective__v${e.source==="base"?" detail-effective__v--dim":""}`}
      title=${e.full_value||""}
      >${e.display}</span
    >
    <span
      class=${`detail-effective__badge detail-effective__badge--${e.source}`}
      >${dc[e.source]}</span
    >
    ${t.expanded?i`<select
          class="detail-effective__edit"
          data-edit-key=${e.key}
          aria-label=${`${fa[e.key]||e.key} \uD3B8\uC9D1`}
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
  </div>`}function mc(e,t){let r=pa.flatMap(u=>u.keys),n=_a(r,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=pc(r,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Object.fromEntries(n.map(u=>[u.key,u])),a=Object.fromEntries(n.filter(u=>u.value!==null).map(u=>[u.key,u.value])),c=n.filter(u=>u.full_value&&u.display!==u.full_value).map(u=>u.full_value).join(" \xB7 ");return i`<details
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
        >${E_(o)}</span
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
          ${pa.map(u=>i`
              <div class="detail-effective__subhead">${u.label}</div>
              ${n.filter(d=>u.keys.includes(d.key)).map(d=>{let f=As({key:d.key,choices:A_(d.key,a,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return S_(d,{expanded:e.expanded,options:f.options,default_label:f.unset_label,default_full_value:f.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="실행 프리셋"
              .value=${Hr(e.preset_id)}
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
  </details>`}function E_(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let r=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${r}`)}for(let r of["impl_model","impl_effort","impl_speed"])e[r]?.resolution!=="not_applicable"&&t.push(e[r]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function T_(e){if(!e||typeof e!="object")return null;let{kind:t,actor:r,effort:n,sha:s}=e;return typeof t!="string"||typeof r!="string"||typeof s!="string"?null:{kind:t,actor:r,effort:typeof n=="string"?n:null,sha:s}}function gc(e){let t=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},n=r.stages||{},s=r.route||t.route||null,o=typeof t.pr_url=="string"?t.pr_url:"",a=typeof t.exec_receipt=="string"?t.exec_receipt:"",c=T_(r.exec_receipt),u=c?Ur(c):a,d=c?`${c.kind}:${c.actor}`:a.split("@")[0],f=$s(r.planned_execution,r.exec_receipt);return i`<section class="detail-summary" data-seam="detail-summary">
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
      ${k_.map(_=>{let h=_.receipt&&typeof t[_.receipt]=="string"?String(t[_.receipt]):"",$=n[_.id],A=h.length>0||$?.fill==="full",O=!A&&$?.fill==="dim",W=$?.stale===!0;return i`<span
          class=${`detail-summary__gate${A?" detail-summary__gate--on":""}${O?" detail-summary__gate--current":""}${W?" detail-summary__gate--stale":""}`}
          data-gate=${_.id}
        >
          <span class="detail-summary__gate-pill">${_.label}</span>
          ${h?i`<span class="detail-summary__gate-sha"
                >${h.split("@")[1]?.slice(0,7)||""}</span
              >`:""}
        </span>`})}
    </div>
  </section>`}var bc=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function Bn(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Ys(e){if(!Bn(e)||!Bn(e.runners))return null;let t=Object.entries(e.runners).filter(([,r])=>Bn(r)&&Bn(r.models));return t.length>0?t:null}function Un(e,t){let r=Ys(e);if(!r||!t)return null;for(let[n,s]of r)if(Object.hasOwn(s.models,t))return n;return null}function hc(e,t){return Bn(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function yc(e,t){let r=Ys(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return hc(n,n.models[t]);return[]}function C_(e){let t=Ys(e);if(!t)return[];let r=[];for(let[,n]of t)for(let s of Object.values(n.models))for(let o of hc(n,s))r.includes(o)||r.push(o);return r}function R_(e,t){if(!t)return C_(e);let n=Ys(e)?.find(([o])=>o===t)?.[1];if(!n)return[];let s=[];for(let o of Object.keys(n.models))for(let a of yc(e,o))s.includes(a)||s.push(a);return s}function vc(e,t,r){let n={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=n.impl_runtime==="inherit"?r:n.impl_runtime==="claude"||n.impl_runtime==="codex"?n.impl_runtime:null;if(n.impl_runtime==="inherit"&&!s)return n.impl_model="",n.impl_effort="",n;let o=Un(t,n.impl_model);if(n.impl_model&&(!s||o!==s))return n.impl_model="",n.impl_effort="",n;let a=n.impl_model?yc(t,n.impl_model):R_(t,s);return n.impl_effort&&a.length>0&&!a.includes(n.impl_effort)&&(n.impl_effort=""),n}function I_(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function wc(e,t){let r=t.getWorkspacePath,n=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",c="";function u(A){A.key==="Escape"&&s&&(A.preventDefault(),h())}document.addEventListener("keydown",u);function d(){return s?i`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>h()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${I_(s)}</span
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
                    </div>`:Rr(a)}
          </div>
        </div>
      </div>
    `:i``}function f(){Ge(d(),e)}async function _(A,O={}){s=A,o="loading",a="",c="",f();let W=r?r():"";if(!W){o="error",c="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",f();return}if(!n){o="error",c="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",f();return}let te="/api/doc?workspace="+encodeURIComponent(W)+"&path="+encodeURIComponent(A);try{let ee=await n(te),D=await ee.json().catch(()=>({}));if(!ee.ok||!D||D.ok!==!0){if(D?.error==="not_found"&&O.missing_state==="plan_pending"){o="pending",c="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",f();return}o="error",c="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(D&&D.error||ee.status)+")",f();return}a=String(D.content||""),o="ready",f()}catch{o="error",c="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",f()}}function h(){s=null,Ge(i``,e)}function $(){document.removeEventListener("keydown",u),h()}return{open:_,close:h,destroy:$}}var L_=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],$c="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Zs=["implementation","review-consult"],O_=["running","done","failed","interrupted"],M_={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function P_(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function D_(e){let t=At(e);if(t.length>0)return t.map(s=>i`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let r=ln(e);if(!r||!e)return"";let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return i`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${r.replace(/^τ /,"\u03C4 \uCD1D ")}${n}</span
    >${e.replayed?i`<span class="detail-usage-partial" title=${$c}
          >부분 집계</span
        >`:""}`}function kc(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function ma(e){if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?ga(t):""}function N_(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e;return typeof t.launch_id!="string"||t.launch_id.length===0||t.provider!=="codex"||!Zs.includes(t.role)||typeof t.model!="string"||t.model.length===0||!(!("effort"in t)||t.effort===null||typeof t.effort=="string"&&t.effort.trim().length>0)||typeof t.session_id!="string"||t.session_id.length===0||!O_.includes(t.status)||typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))||!(t.turn_id===null||typeof t.turn_id=="string")?null:t}function q_(e,t){let n=At({providers:{codex:{subtotal:t.subtotal,breakdown:t.usage,...t.replayed?{replayed:!0}:{}}},roles:{}})[0];return i`<div class="detail-session__leg detail-session__usage-detail">
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
    ${ma(t.completed_at)?i`<span class="detail-session__leg-time detail-session__time"
          >${ma(t.completed_at)}</span
        >`:""}
    ${n?i`<span class="detail-session__usage" title=${n.tooltip}
          >${n.label}</span
        >`:""}
  </div>`}function F_(e,t,r,n){let s=e.status==="running"?null:t,a=(s?At({providers:{codex:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],c=e.status==="running"?ga(e.last_event_at):s?ma(s.completed_at):"";return i`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>n.onOpenDelegation&&n.onOpenDelegation(r,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${M_[e.status]}</span
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
  </button>`}function j_(e,t){return e.role===t.role&&e.model===t.model&&e.session_id===t.session_id}function B_(e,t,r){let n=[],s=new Set,o=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let f of o){let _=N_(f);!_||s.has(_.launch_id)||(s.add(_.launch_id),n.push(_))}n.sort((f,_)=>f.started_at-_.started_at);let a={implementation:[],"review-consult":[]};if(t)for(let f of Zs){let _=t.roles[f]?.codex;a[f]=_?[..._.legs]:[]}let c=Zs.flatMap(f=>a[f]),u=new Set,d=[];for(let f of Zs){for(let _ of n.filter(h=>h.role===f)){let h=c.find($=>$.receipt_id===_.launch_id)||null;h&&!j_(_,h)||(h&&u.add(h.receipt_id),d.push(F_(_,h,e.attempt_id,r)))}for(let _ of a[f])u.has(_.receipt_id)||d.push(q_(f,_))}return d}function U_(e,t){let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,n=[...L_,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return i`<div class="detail-session__usage-detail">
    ${n.map(s=>i`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${P_(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${r===null?"":i`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${r.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?i`<span class="detail-session__usage-note">${$c}</span>`:""}
  </div>`}var W_={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function ga(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=String(t.getHours()).padStart(2,"0"),n=String(t.getMinutes()).padStart(2,"0");return`${r}:${n}`}function z_(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,n])=>typeof n=="string"&&n.length>0).map(([n,s])=>`${n}=${s}`).join(" \xB7 "):"",r=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return i`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${r}</span>
    ${t?i`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function xc(e,t={},r={}){let n=Array.isArray(e)?e:[],s=r.expanded||new Set;if(n.length===0)return i`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let d of n)d&&typeof d.resumed_from=="string"&&d.resumed_from.length>0&&o.add(d.resumed_from);let a=d=>{if(!(d.status==="failed"||d.status==="orphaned"))return"";let _=typeof d.session_id=="string"&&d.session_id.length>0,h=o.has(d.attempt_id),$=_&&!h,A=_?h?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return i`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${d.attempt_id}
      ?disabled=${!$}
      title=${A}
      @click=${O=>{O.stopPropagation(),$&&t.onResume&&t.onResume(d.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},c=d=>{if(!(d.status==="failed"||d.status==="orphaned")||typeof d.cause!="string"||d.cause==="")return"";let _=d.cause_detail,h=_&&typeof _.reason=="string"&&_.reason.length>0?typeof _.command=="string"&&_.command.length>0?`${_.reason} \xB7 ${_.command}`:_.reason:d.cause;return i`<div class="detail-session__cause" title=${h}>
      ${d.cause}
    </div>`},u=d=>{let f=kc(Do(d));if(At(f).length===0&&!ln(d.usage))return"";let _=s.has(d.attempt_id);return i`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${d.attempt_id}
      aria-expanded=${_?"true":"false"}
      title=${_?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${h=>{h.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(d.attempt_id)}}
    >
      τ 자세히
    </button>`};return i`
    <div class="detail-section-label">
      세션 이력${D_(r.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${n.map(d=>{let f=Do(d),_=kc(f),h=At(_);return i`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${d.status||"unknown"}"
            data-attempt-id=${d.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(d.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${W_[d.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${d.attempt_id}</span>
            ${Er(d)?i`<span
                  class="detail-session__resumed"
                  title=${Er(d)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${dr(d)}</span>
            ${h.length>0?i`<span class="detail-session__role">orchestrator</span>`:""}
            ${d.session_id?i`<span class="detail-session__sid" title=${d.session_id}
                  >${String(d.session_id).slice(0,8)}</span
                >`:""}
            ${h.length>0?h.map($=>i`<span
                      class="detail-session__usage"
                      title=${$.tooltip}
                      >${$.label}</span
                    >`):ln(d.usage)?i`<span class="detail-session__usage"
                    >${ln(d.usage)}</span
                  >`:""}
            <span class="detail-session__time">${ga(d.started_at)}</span>
          </button>
          ${u(d)} ${a(d)} ${c(d)} ${z_(d)}
          ${s.has(d.attempt_id)&&d.usage?U_(d.usage,d.runner==="codex"?"codex":"claude"):""}
          ${B_(d,f,t)}
        </div>`})}
    </div>
  `}function Ac(e,t={}){return i`
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
          ${H_(e)}
        </div>`:""}
  `}function H_(e){let t=dn(e);if(t)return t;let r=e.data;if(!r)return"";if(r.missing)return i`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof r.default_task_prompt=="string"?wr("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",r.default_task_prompt):""}`;let n=Fs(r.recorded_at);return i`<div class="detail-prompt__meta">
      ${r.attempt_id}${n?` \xB7 ${n}`:""}
    </div>
    ${typeof r.task_prompt=="string"?wr("\uACFC\uC5C5 (user)",r.task_prompt):""}
    ${typeof r.system_prompt=="string"?wr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",r.system_prompt):""}`}var G_=["open","in_progress","deferred","resolved","closed"],V_=[0,1,2,3,4];function Sc(e,t){let r=t.issueStores,n=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,c=t.execPresetStore,u=t.sessionLogStore,d=null,f=null,_={},h="",$=!1,A=[],O=!1,W={},te=!1,ee=!1,D="",N="",R="";function j(){te=!1,ee=!1,D="",N="",R=""}let b=[],E=null,V=null,ne=!1,P="",F=!1,pe=0,ye=new Set;function _e(){b=[],E=null,V=null,ne=!1,P="",F=!1,pe+=1,ye.clear()}async function je(p){if(!s)return;let g=++pe;try{let k=await Promise.resolve(s("get-comments",{id:p}));if(g!==pe||p!==d)return;b=Array.isArray(k)?k:[],ne=!1}catch{if(g!==pe||p!==d)return;ne=!0}Ne()}function et(){if(!s||!d)return;let p=f&&typeof f.comment_count=="number"?f.comment_count:null;if(E!==d){E=d,V=p,je(d);return}p!==null&&p!==V&&(V=p,je(d))}function Ke(p){ye.has(p)?ye.delete(p):ye.add(p),Ne()}function Le(p){let g=P.trim().length===0;P=p,g!==(p.trim().length===0)&&Ne()}async function Be(){let p=P.trim();if(!s||!d||p.length===0||F)return;let g=d;F=!0,Ne();let k=!1;try{let H=await Promise.resolve(s("add-comment",{id:g,text:p}));Array.isArray(H)&&H.length>0&&(k=!0,g===d&&(b=H,ne=!1,P="",V=H.length))}catch{k=!1}k||ie("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),g===d&&(F=!1),Ne()}let ue={onToggle:Ke,onDraftInput:Le,onSubmit:Be},Te=document.createElement("div");Te.className="md-viewer-root",document.body.appendChild(Te);let Oe=wc(Te,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),De=document.createElement("div");De.className="session-log-root",document.body.appendChild(De);let Se=Bs(De,{transport:s?(p,g)=>Promise.resolve(s(p,g)):void 0,sessionLogStore:u}),We=!1,Ze=!1,$e=!1,Xe=null,Z=null,z=0;function oe(p){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${p}`}function Me(){We=!1,Ze=!1,$e=!1,Xe=null,Z=null,z+=1}async function Fe(p){if(!s)return;let g=++z;Ze=!0,$e=!1,Ne();try{let k=await Promise.resolve(s("get-bead-prompt",{bead_id:p}));if(g!==z)return;!k||typeof k!="object"||Array.isArray(k)?$e=!0:(Xe=k,Z=oe(p))}catch{g===z&&($e=!0)}finally{g===z&&(Ze=!1,Ne())}}function Ue(){if(We=!We,We&&d&&Z!==oe(d)){Xe=null,Fe(d);return}Ne()}function tt(){if(!a||!d)return[];let p=a.get();return(p&&p.attempts?Object.values(p.attempts):[]).filter(k=>k&&k.bead_id===d).sort((k,H)=>(H.started_at||0)-(k.started_at||0)).map(k=>({attempt_id:k.attempt_id,bead_id:k.bead_id,status:k.status,started_at:typeof k.started_at=="number"?k.started_at:null,runner:k.runner||null,model:k.model||null,effort:k.effort||k.observed_effort||null,speed:k.speed||null,session_id:k.session_id||null,resumed_from:k.resumed_from||null,continuation_mode:k.continuation_mode||null,dismissed_at:typeof k.dismissed_at=="number"?k.dismissed_at:null,cause:typeof k.cause=="string"?k.cause:null,cause_detail:k.cause_detail||null,exec_default_preset_id:typeof k.exec_default_preset_id=="string"?k.exec_default_preset_id:null,exec_default_preset_revision:typeof k.exec_default_preset_revision=="number"?k.exec_default_preset_revision:null,exec_values:k.exec_values&&typeof k.exec_values=="object"?k.exec_values:null,usage:k.usage||null,usage_legs:Array.isArray(k.usage_legs)?k.usage_legs:[],delegation_sessions:Array.isArray(k.delegation_sessions)?k.delegation_sessions:[]}))}function ct(){if(!a||!d)return null;let p=a.get();return Ht(p&&p.attempts||{},d)}let ot=new Set;function Y(p){ot.has(p)?ot.delete(p):ot.add(p),Ne()}function re(p){let g=a?a.get():null,k=g&&g.attempts?g.attempts[p]:null;Se.open({attempt_id:p,meta:k?{runner:k.runner||void 0,model:k.model||void 0,effort:k.effort||void 0,status:k.status||void 0,session_id:k.session_id||void 0}:{}})}function me(p,g){let k=a?a.get():null,H=k&&k.attempts?k.attempts[p]:null,he=(H&&Array.isArray(H.delegation_sessions)?H.delegation_sessions:[]).find(Ce=>Ce&&typeof Ce=="object"&&Ce.launch_id===g);he&&Se.open({attempt_id:p,launch_id:g,meta:{runner:"codex",role:he.role,model:he.model,effort:he.effort,session_id:he.session_id,status:he.status}})}async function nt(p){if(!s||!p)return;let g=await an();if(g===null)return;let k=()=>{let Ce=a?a.get():null;return Ce&&typeof Ce.revision=="number"?Ce.revision:0},H=async(Ce={},qe=k())=>await s("worker-attempt-resume",{attempt_id:p,expected_revision:qe,...g!==""?{instructions:g}:{},...Ce}),ke=Ce=>{Ce?.queue&&a?.set&&a.set(Ce.queue)},he=await H();if(ke(he),he&&he.conflict){let Ce=he.queue&&typeof he.queue.revision=="number"?he.queue.revision:k();he=await H({},Ce),ke(he)}he=await gr(he,(Ce,qe)=>H({continuation:Ce,decision_token:qe}),{onResult:ke,refresh:()=>H()}),he&&he.resumed===!1&&!he.conflict&&he.reason&&ie(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${he.reason}`,"error",2400)}let ge={onOpen:re,onOpenDelegation:me,onResume:nt,onToggleUsage:Y};function T(){let p=a?a.get():null,g={...W};for(let k of["orchestration_model","orchestration_effort","orchestration_speed"]){let H=p&&p[k];typeof H=="string"&&(g[k]=H)}return g}async function M(){if(s){try{let p=await Promise.resolve(s("get-session-defaults",{}));W=p&&p.values&&typeof p.values=="object"?p.values:{}}catch{W={}}Ne()}}function L(){let p=a?a.get():null;return p&&p.runner_catalog||null}function G(){let p=a?a.get():null;return p&&typeof p.execution_defaults=="object"?p.execution_defaults:null}function se(){let p=f?.metadata&&typeof f.metadata=="object"?f.metadata:{},k=Tr({pin:{...p,..._},global:T(),execution_defaults:G(),runner_catalog:L(),route:typeof p.route=="string"?p.route:null}).orchestration_model.value||"";return Un(L(),k)}function w(){let p=c?c.get():null;return!p||typeof p.revision!="number"?null:{revision:p.revision,presets:Array.isArray(p.presets)?p.presets:[]}}function C(p){return p?.compatible===!1}function q(p){c&&p&&typeof p.revision=="number"&&Array.isArray(p.presets)&&c.set({revision:p.revision,presets:p.presets})}async function fe(){let p=w(),g=p?.presets.find(k=>k.id===h);if(!(!s||!d||!p||!g||C(g)||$)){$=!0,A=[],Ne();try{let k=await Promise.resolve(s("apply-impl-preset",_c(d,g.id,p.revision)));if(k&&k.conflict){q(k),ie("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let H=k&&Array.isArray(k.issue)?k.issue[0]:k?.issue;if(k&&k.applied&&H&&typeof H=="object"){f=H,A=Array.isArray(k.skipped_orchestration_keys)?k.skipped_orchestration_keys.filter(ke=>typeof ke=="string"):[];for(let ke of bc)delete _[ke];ie(A.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}k&&k.error==="bd_readback_failed"?ie("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ie("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(k){k&&typeof k=="object"&&k.code==="bd_readback_failed"?ie("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ie("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{$=!1,Ne()}}}let ae=null;r&&r.subscribe&&(ae=r.subscribe(()=>He()));let ve=null;a&&typeof a.subscribe=="function"&&(ve=a.subscribe(()=>{d&&Ne()}));let Re=null;c&&typeof c.subscribe=="function"&&(Re=c.subscribe(()=>{d&&Ne()}));function ze(p){p.key==="Escape"&&d&&(p.preventDefault(),n())}document.addEventListener("keydown",ze);function He(){if(d){if(r&&typeof r.snapshotFor=="function"){let p=r.snapshotFor("detail:"+d)||[];f=p.find(k=>k&&k.id===d)||p[0]||f}et(),Ne()}}function U(p){Qt(p).then(g=>{g?ie("\uBCF5\uC0AC\uB428","success",1200):ie("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function Q(p){p.preventDefault(),p.stopPropagation(),d&&U(d)}function de(p,g){p.preventDefault(),p.stopPropagation(),U(g)}function v(p,g,k){p.preventDefault(),p.stopPropagation(),Oe.open(g,{missing_state:k})}function S(p,g){_[p]=g,Ne(),!(!s||!d)&&Promise.resolve(s("update-exec-settings",fc(d,p,g.length===0?null:g))).catch(()=>{ie("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function I(p,g){let k=f||{},H=k.metadata&&typeof k.metadata=="object"?k.metadata:{},ke={};for(let qe of["impl_runtime","impl_model","impl_effort"])ke[qe]=Object.hasOwn(_,qe)?_[qe]:typeof H[qe]=="string"?H[qe]:"";ke[p]=g;let he=vc(ke,L(),se()),Ce={};for(let qe of["impl_runtime","impl_model","impl_effort"])Ce[qe]=_[qe],_[qe]=he[qe]||"";Ne(),!(!s||!d)&&Promise.resolve(s("update-impl-target",{id:d,...he,orchestration_runtime:se()})).then(qe=>{let gt=Array.isArray(qe)?qe[0]:qe;if(!gt||typeof gt!="object"||!gt.id)throw new Error("implementation target readback failed");f=gt;for(let cr of["impl_runtime","impl_model","impl_effort"])delete _[cr];Ne()}).catch(()=>{for(let qe of["impl_runtime","impl_model","impl_effort"])Ce[qe]===void 0?delete _[qe]:_[qe]=Ce[qe];Ne(),ie("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function X(p,g,k){if(!s||!d)return!1;try{let H=await Promise.resolve(s(p,g)),ke=Array.isArray(H)?H[0]:H;return ke&&typeof ke=="object"&&ke.id?(f=ke,!0):(ie(k,"error"),!1)}catch{return ie(k,"error"),!1}}function xe(p){setTimeout(()=>{try{let g=e.querySelector(p);g&&typeof g.focus=="function"&&g.focus()}catch{}},0)}function J(){te=!0,D=f&&f.title||"",Ne(),xe('.detail-edit__input[data-edit="title"]')}function Ee(p){D=p.target.value}function Ie(){te=!1,D="",Ne()}function ht(){X("edit-text",{id:d,field:"title",value:D},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(g=>{g&&(te=!1,D=""),Ne()})}function yt(){ee=!0,N=f&&f.description||"",Ne(),xe('.detail-edit__textarea[data-edit="description"]')}function Qe(p){N=p.target.value}function Et(){ee=!1,N="",Ne()}function Vt(){X("edit-text",{id:d,field:"description",value:N},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(g=>{g&&(ee=!1,N=""),Ne()})}function wt(p,g,k,H){if(p.key==="Escape"){p.stopPropagation(),k();return}p.key==="Enter"&&(!H||p.ctrlKey||p.metaKey)&&(p.preventDefault(),g())}function Ot(p){let g=p.target.value;X("update-status",{id:d,status:g},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>Ne())}function sr(p){let g=Number(p.target.value);X("update-priority",{id:d,priority:g},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>Ne())}function or(p){R=p.target.value}function ar(){let p=R.trim();p.length!==0&&X("label-add",{id:d,label:p},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(g=>{g&&(R=""),Ne()})}function _r(p){if(p.key==="Escape"){p.stopPropagation(),R="",Ne();return}p.key==="Enter"&&(p.preventDefault(),ar())}function kt(p){X("label-remove",{id:d,label:p},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>Ne())}let Kt={onCopyPath:de,onOpenDoc:v};function ir(p){return typeof p=="string"?p:p&&typeof p=="object"?String(p.id||p.to||p.issue_id||p.depends_on||""):""}function lr(p){switch(p&&typeof p=="object"?String(p.dependency_type||p.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function rt(p){let k=(Array.isArray(p.dependencies)?p.dependencies:[]).map(H=>({id:ir(H),icon:lr(H)})).filter(H=>H.id.length>0);return i`
      <div class="detail-section-label">의존성</div>
      ${k.length===0?i`<div class="detail-empty">의존성 없음</div>`:i`<div class="detail-deps">
            ${k.map(H=>o?i`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(H.id)}
                  >
                    ${H.icon?`${H.icon} `:""}${H.id}
                  </button>`:i`<span class="detail-dep"
                    >${H.icon?`${H.icon} `:""}${H.id}</span
                  >`)}
          </div>`}
    `}function Nt(p){let g=p.metadata||{},k=p.workflow||{},H=k.stages||{},ke=H.spec&&H.spec.stale,he=H.impl&&H.impl.stale,Ce=H.plan||null,qe=k.route_source==="derived",gt=k.route||g.route||"\u2014";return i`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${qe?" detail-kv__v--derived":""}"
          title=${qe?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${qe?"unset":gt}</span
        >
      </div>
      ${k.route!=="quick_fix"||Object.hasOwn(g,"spec_review")?i`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${g.spec_review||"\uC5C6\uC74C"}${ke?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${k.route==="full_plan"?i`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Ce?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Ce?.approval_receipt||"\uC5C6\uC74C"}${Ce?.approval_state==="stale"?" \xB7 stale":Ce?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${k.route!=="quick_fix"||Object.hasOwn(g,"impl_review")?i`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${g.impl_review||"\uC5C6\uC74C"}${he?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${k.planned_execution?i`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${k.planned_execution.kind}</span>
            </div>
            ${k.planned_execution.kind==="main"?i`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${k.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${k.exec_receipt?i`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${Ur(k.exec_receipt)}</span
            >
          </div>`:""}
      ${k.impl_entry?i`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${k.impl_entry.actor}@${k.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${g.pr_url?i`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${g.pr_url}</span>
          </div>`:""}
    `}let we={route:["quick_fix","spec_backed","full_plan"]};async function l(p,g){let k=g.target.value;if(p==="route"&&f&&f.metadata&&f.metadata.route==="full_plan"&&k!=="full_plan"&&!window.confirm(`full_plan \u2192 ${k||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){Ne();return}await X("update-workflow-meta",{id:d,key:p,value:k},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),Ne()}function m(p){let g=p.metadata||{};return i` ${((H,ke)=>{let he=we[H],Ce=typeof g[H]=="string"?g[H]:"";return i`<div class="detail-kv">
        <span class="detail-kv__k">${H}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${H}
          data-edit=${`wfmeta-${H}`}
          @change=${qe=>l(H,qe)}
        >
          <option value="" ?selected=${!he.includes(Ce)}>
            ${ke}
          </option>
          ${he.map(qe=>i`<option value=${qe} ?selected=${Ce===qe}>${qe}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function x(p,g){return te?i`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${D}
            @input=${Ee}
            @keydown=${k=>wt(k,ht,Ie,!1)}
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
              @click=${Ie}
            >
              취소
            </button>
          </div>
        </div>
      `:i`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${p}</h2>
        ${At(g).map(k=>i`<span class="detail-usage-total" title=${k.tooltip}
              >${k.label}</span
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
    `}function K(p){let g=$t(p.created_at),k=$t(p.updated_at);return!g&&!k?i``:i`
      ${g?i`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${g}</span>
          </div>`:""}
      ${k?i`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${k}</span>
          </div>`:""}
    `}function le(p,g){return i`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${Ot}
        >
          ${G_.map(k=>i`<option value=${k} ?selected=${k===p}>${k}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${sr}
        >
          ${V_.map(k=>i`<option value=${String(k)} ?selected=${k===g}>
                P${k}
              </option>`)}
        </select>
      </div>
    `}function Ae(p){return i`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${ee?"":i`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${yt}
            >
              ✎
            </button>`}
      </div>
      ${ee?i`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${N}
              @input=${Qe}
              @keydown=${g=>wt(g,Vt,Et,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${Vt}
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
    `}function be(p){let g=typeof p.notes=="string"?p.notes:"";return g.trim().length===0?i``:i`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${g}</div>
    `}function Ye(p){let g=Array.isArray(p.labels)?p.labels:[];return i`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${g.map(k=>i`<span class="detail-label-chip"
              >${k}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${k}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+k}
                @click=${()=>kt(k)}
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
            @input=${or}
            @keydown=${_r}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${ar}
          >
            추가
          </button>
        </span>
      </div>
    `}function st(){if(!d)return i``;let p=f||{},g=String(p.id||d),k=p.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",H=ct(),ke=p.status||"open",he=typeof p.priority=="number"?Math.max(0,Math.min(4,p.priority)):"",Ce=p.description||"",qe={...p,metadata:{...p.metadata||{},..._}};return i`
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
            ${g}
          </button>
          ${x(k,H)}
          ${gc(qe)}
          ${mc({metadata:qe.metadata,workspace_values:T(),catalog:L(),execution_defaults:G(),expanded:O,presets:w()?.presets||[],preset_id:h,preset_busy:$,skipped_orchestration_keys:A},{onToggle:gt=>{O=gt,Ne()},onEdit:(gt,cr)=>{if(gt==="impl_runtime"||gt==="impl_model"||gt==="impl_effort"){I(gt,cr??"");return}S(gt,cr??"")},onPresetSelect:gt=>{h=gt,A=[],Ne()},onPresetApply:()=>{fe()}})}
          ${le(ke,he)} ${K(p)}
          ${Ae(Ce)}
          ${tc(b,ue,{expanded:ye,draft:P,sending:F,error:ne})}
          ${be(p)} ${Ye(p)} ${rt(p)}
          ${Nt(p)} ${m(p)}
          ${Ql(p,Kt)}
          ${Ac({expanded:We,loading:Ze,error:$e,data:Xe},{onToggle:Ue})}
          ${xc(tt(),ge,{total:H,expanded:ot})}
        </div>
      </div>
    `}function Ne(){Ge(st(),e)}return{load(p){p!==d&&(_={},h="",A=[],O=!1,j(),_e(),Me()),d=p,f=null,He(),M()},clear(){d=null,f=null,_={},h="",$=!1,A=[],O=!1,j(),_e(),Me(),Oe.close(),Se.close(),Ge(i``,e)},destroy(){ae&&(ae(),ae=null),ve&&(ve(),ve=null),Re&&(Re(),Re=null),document.removeEventListener("keydown",ze),Oe.destroy(),Te.parentNode&&Te.parentNode.removeChild(Te),Se.destroy(),De.parentNode&&De.parentNode.removeChild(De),d=null,f=null,h="",$=!1,A=[],_e(),Me(),Ge(i``,e)}}}function Ec(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let r=t.querySelector("#fatal-error-title"),n=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),c=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},u=(d,f,_="")=>{r&&(r.textContent=d||"Unexpected Error"),n&&(n.textContent=f||"An unrecoverable error occurred.");let h=typeof _=="string"?_.trim():"";if(s&&(h.length>0?(s.textContent=h,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>c()),t.addEventListener("cancel",d=>{d.preventDefault(),c()}),{open:u,close:c,getElement(){return t}}}function Xs(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function Qs(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let r=Math.floor(t/60);if(r<60)return`${r}\uBD84 ${Math.round(t-r*60)}\uCD08`;let n=Math.floor(r/60),s=r%60;return`${n}\uC2DC\uAC04 ${s}\uBD84`}function Tc(e,t){if(typeof e!="object"||e===null)return null;let r=0,n=!1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t)continue;let a=o.started_at,c=o.finished_at;typeof a!="number"||typeof c!="number"||!Number.isFinite(a)||!Number.isFinite(c)||c<a||(r+=c-a,n=!0)}return n?r:null}function Js(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function K_(e,t){let r=Array.isArray(e)?e:[],n=Array.isArray(t)?t:[];if(r.length===0&&n.length===0)return null;let s=null;for(let c of r)c.kind!=="deploy"||c.state!=="succeeded"||typeof c.target_sha!="string"||(!s||(typeof c.finished_at=="number"?c.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=c);let o=r.filter(c=>c.state==="failed"&&!c.dismissed&&!c.superseded_by).length+n.length,a=r.some(c=>c.state==="repairing");return{deploy:s?{sha:Xs(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function Cc(e,t){let r=K_(e,t);return r?i`<button
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
            >${Js(r.deploy.at)}${r.deploy.elapsed_ms!==null?` \xB7 ${Qs(r.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${r.badge.tone}"
      >${r.badge.label}</span
    >
  </button>`:""}function _n(e){let t=jt(e.created_at),r=jt(e.updated_at);return!t&&!r?"":i`<div class="worker-mini__meta">
    ${t?i`<span title=${`\uC0DD\uC131 ${$t(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&r?i`<span>·</span>`:""}${r?i`<span title=${`\uC218\uC815 ${$t(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </div>`}function Y_(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function Wn(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function eo(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function fr(e,t,r={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(_=>_&&_.bead_id===t&&_.phase!=="done").sort((_,h)=>(_.requested_at||0)-(h.requested_at||0)).at(-1),o=typeof r.attempt_id=="string"&&r.attempt_id.length>0?r.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=r.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":r.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":r.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,c=typeof s?.last_error=="string"?s.last_error:null,u=s?Y_(s.phase):null,d=s?.kind==="stale_work_backup_fresh",f=r.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!r.external&&!r.done,enabled:!a&&(!s||!!c),label:d?c?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":c?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(c?d?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${c} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${c} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${u||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:f==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:u,error:c,confirmation:f}}function $r(e){let t=e.discard;if(!t||!t.operation)return"";let r=t.operation,n=r.kind==="stale_work_backup_fresh"&&!t.error?null:r.backup?.path,s=r.original_pr,o=r.revert_pr;return i`<div
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
  </div>`}var Z_={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function Rc(e,t=!1){if(!e||typeof e!="object")return null;let r=e;if(r.reason!=="worktree_stale_work"||!r.stale_work||typeof r.stale_work!="object")return null;let n=r.stale_work,s=n.residue==="branch"?"branch":"worktree",o=n.state==="unique"?"unique":"unknown",a=n.summary&&typeof n.summary=="object"?n.summary:{};function c(d){return Number.isInteger(a[d])?Number(a[d]):0}let u=typeof n.cause=="string"?n.cause:"observe_failed";return{residue:s,state:o,title:s==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":o==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:Z_[u]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:s==="branch"?`\uACE0\uC720 commit ${c("branch_ahead")}`:[`staged ${c("staged_count")}`,`unstaged ${c("unstaged_count")}`,`untracked ${c("untracked_count")}`,`branch ahead ${c("branch_ahead")}`,`HEAD ahead ${c("head_ahead")}`].join(" \xB7 "),action_id:typeof n.action_id=="string"?n.action_id:"",can_resume:n.can_resume===!0,can_continue:n.can_continue===!0,can_backup_fresh:n.can_backup_fresh===!0,can_recheck:n.can_recheck===!0,locked:t}}function ba(e){let t=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],n=At(e.usage),s=Jt(e.usage),o=e.merge_step||null,a=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,c=e.lane==="done"&&!a,u=c?jt(e.done_at):"",d=t?i`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",f=typeof e.seq=="number"?i`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",_=e.worker_serial===!0?i`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",h=e.workspace_name?i`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",$=i`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,A=i`<span class="worker-mini__title">${e.title}</span>`,O=e.pr_url&&e.pr_number?i`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",W=e.completion_repair_pr_url&&e.completion_repair_pr_number?i`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",te=r.map(_e=>_e===e.live_badge?i`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${_e}</span
        >`:i`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${_e===e.completion_badge&&e.completion_title||""}
          >${_e}</span
        >`),ee=e.reason?i`<span class="worker-mini__reason">${e.reason}</span>`:"",D=n.length>0?n.map(_e=>i`<span class="worker-usage" title=${_e.tooltip}
              >${_e.label}</span
            >`):s?i`<span class="worker-usage" title=${cn(e.usage)}
            >${s}</span
          >`:"",N=o?i`<span
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
      </button>`:"",j=e.cancel_action?i`<button
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
      </button>`:"",E=e.discard,V=E?.action||e.discard_action?i`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${E?.attempt_id||""}
          data-operation-id=${E?.operation?.operation_id||""}
          data-discard-mode=${E?.confirmation||"unmerged"}
          ?disabled=${E?!E.enabled:e.discard_enabled===!1}
          title=${E?E.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${E?.label||"\uD3D0\uAE30"}
        </button>`:"",ne=e.stale_work||null,P=ne?i`${ne.can_resume||ne.can_continue?i`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${ne.action_id}
            ?disabled=${ne.locked}
          >
            기존 작업 이어가기
          </button>`:""}${ne.can_backup_fresh?i`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${ne.action_id}
            ?disabled=${ne.locked}
          >
            백업 후 새로 시작
          </button>`:""}${ne.can_recheck?i`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${ne.action_id}
            ?disabled=${ne.locked}
          >
            다시 확인
          </button>`:""}`:"",F=ne?i`<div class="worker-mini__stale">
        <strong>${ne.title}</strong>
        <span>${ne.summary}</span>
        <span>${ne.cause}</span>
        ${ne.can_backup_fresh?i`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",pe=e.revise_action?i`<button
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
        </button>`:"",ye=!!(s||o||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||E?.operation||e.revise_action||ne);return i`<div
    class="worker-mini${a?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${o?" worker-mini--merging":""}${o?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${c?i`<div class="worker-mini__row1">${h}${$}${A}</div>
          <div class="worker-mini__row2">
            ${D}${u?i`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${$t(e.done_at)}`}
                  >완료 ${u}</span
                >`:""}${typeof e.work_ms=="number"?i`<span
                  class="worker-mini__work"
                  title="attempt 실행 시간 합산 (재개 세션 포함)"
                  >작업 ${Qs(e.work_ms)}</span
                >`:""}${te}${N}
            <span class="worker-mini__actions"
              >${R}${j}${b}${V}</span
            >
            ${_n(e)}
          </div>`:a?i`<div class="worker-mini__head">
              ${d}${f}${h}${$}${O}${W}${te}${_}${ee}
            </div>
            <div class="worker-mini__body">${A}${F}</div>
            ${ye?i`<div class="worker-mini__foot">
                  ${D}${N}
                  <span class="worker-mini__actions"
                    >${R}${j}${b}${V}${pe}${P}</span
                  >
                  ${$r(e)}
                </div>`:""}
            ${_n(e)}`:i`<div class="worker-mini__line">
              ${d}${f}${h}${$}${A}${O}${W}${te}${_}${ee}${D}${N}${R}${j}${b}${V}
            </div>
            ${$r(e)} ${_n(e)}`}
  </div>`}function X_(e,t=null){let r=e.worker_ineligible===!0,n=e.draggable&&!e.done&&!r,s=n&&t&&t.bead_id===e.id,o=e.workflow,a=o&&o.chips||{},c=a.route||o&&o.route,u=a.route_source==="derived"||!!(o&&o.route_source==="derived"),d=typeof e.reason=="string"&&e.reason.split(" \xB7 ").includes("missing_description"),f=typeof e.reason=="string"&&e.reason.startsWith("\u26D4");return i`<div
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
    ${o?ks(o,e.status):""}
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
    ${_n(e)}
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
                  </div>`:e.items.map(n=>e.lane==="candidate"?X_(n,e.place_menu):ba(n))}
          </div>`}
  </section>`}function ha(e,t){return`${e}\0${t}`}function ya(e){let t=new Map;for(let r of Array.isArray(e?.running)?e.running:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"running",state:"running"});for(let r of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let r of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let n=Array.isArray(r.sublanes?.parallel)?r.sublanes.parallel:Array.isArray(r.items)?r.items:[];for(let s of n)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:"parallel",position:s.queue_position});for(let s of Array.isArray(r.sublanes?.serial)?r.sublanes.serial:[])for(let o of s.items)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:s.id,position:o.queue_position})}for(let r of Array.isArray(e?.runnable)?e.runnable:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"runnable",state:"runnable"});for(let r of Array.isArray(e?.done)?e.done:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"done",state:"done"});return t}function Q_(e,t){let r=Array.isArray(t)?t:[],n=e.indexOf("-"),s=n>0?e.slice(0,n):e;return r.some(o=>typeof o?.issue_prefix=="string"&&o.issue_prefix===s)?"internal":r.length>0&&r.every(o=>typeof o?.issue_prefix=="string")?"external":"unknown"}function J_(e,t){return e==="internal"&&t===void 0}function Ic(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function Lc(e,t,r,n){let s=r.get(e);if(!!(s&&t&&s.root_dir===t.root_dir&&s.lane===t.lane&&typeof s.position=="number"&&typeof t.position=="number"&&s.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,scope:null,same_lane_ahead:!0,missing_internal:!1};if(s)return{id:e,label:`\u{1F512} ${e} (${Ic(s)})`,scope:null,same_lane_ahead:!1,missing_internal:!1};let a=Q_(e,n);return{id:e,label:`\u{1F512} ${e} (${a==="internal"?"\uBBF8\uC801\uC7AC":a==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"})`,scope:a,same_lane_ahead:!1,missing_internal:J_(a,s)}}function Oc(e){let t=Array.isArray(e)?e:[],r=new Map,n=new Map,s=new Map;for(let c of t)for(let u of Array.isArray(c.sublanes?.serial)?c.sublanes.serial:[]){let d=ha(c.root_dir,u.id);r.set(d,{root_dir:c.root_dir,workspace_name:c.name,lane:u.id}),s.set(d,[]);for(let f of Array.isArray(u.items)?u.items:[])n.set(f.id,d)}for(let c of t)for(let u of Array.isArray(c.sublanes?.serial)?c.sublanes.serial:[]){let d=ha(c.root_dir,u.id),f=Array.isArray(u.items)?u.items[0]:null,h=!!f&&f.queue_index===0&&(!Array.isArray(u.occupied_by)||u.occupied_by.length===0)&&Array.isArray(f.blocked_by)?f.blocked_by:[],$=s.get(d);if($)for(let A of h){let O=n.get(A);O&&O!==d&&!$.includes(O)&&$.push(O)}}let o=(c,u)=>{let d=new Set,f=[c];for(;f.length>0;){let _=f.pop();if(_===u)return!0;!_||d.has(_)||(d.add(_),f.push(...s.get(_)||[]))}return!1},a=new Map;for(let[c,u]of s){let d=[];for(let f of u){let _=r.get(f);o(f,c)&&_&&d.push(_)}d.length>0&&a.set(c,d)}return a}function Mc(e){let t=ya(e),r=new Map;for(let n of[...Array.isArray(e?.runnable)?e.runnable:[],...Array.isArray(e?.queue)?e.queue:[],...Array.isArray(e?.running)?e.running:[],...Array.isArray(e?.pr_wait)?e.pr_wait:[]])r.has(n.id)||r.set(n.id,n);return Array.from(r.values()).map(n=>({id:n.id,title:n.title,root_dir:n.root_dir,workspace_name:n.workspace_name,location:t.has(n.id)?(()=>{let s=t.get(n.id),o=Ic(s);return s.state?`${s.workspace_name} \xB7 ${o}`:o})():""}))}function Pc(e,t){return ha(e,t)}var Dc=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],zn=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function to(e,t){let r=Dc.find(s=>s.step===e);if(!r)return null;let n=Dc.length;return{step:r.step,label:t,index:r.index,total:n,percent:Math.round(r.index/n*100)}}function Nc(e){let t=zn.findIndex(r=>r.step===e);return zn.map((r,n)=>({step:r.step,label:r.label,state:t<0?"todo":n<t?"done":n===t?"stall":"todo"}))}function Gr(e){let t=zn.find(r=>r.step===e);return t?t.label:typeof e=="string"?e:""}function em(e){let t=zn.findIndex(r=>r.step===e);return t<0?null:{index:t+1,total:zn.length}}function ro(e){let t=em(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var wa=new Set(["queued","running","retry_pending","repairing"]),qc=new Set(["failed","succeeded"]),tm={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",repairing:"\uC790\uB3D9 \uD574\uACB0 \uC911",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},Hn={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},rm={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:Hn.base_containment,child_sweep:Hn.child_sweep,branch_cleanup:Hn.branch_cleanup,parent_close:Hn.parent_close};function nm(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function sm(e,t,r){return!["verify","deploy"].includes(e.kind)||![...wa,...qc].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(n=>n&&typeof n=="object"&&n.bead_id===t&&n.merged_sha===r)}function om(e,t){let r=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(r!==0)return r;let n=d=>d.state==="succeeded"?1:2,s=n(t)-n(e);if(s!==0)return s;let o=typeof e.requested_at=="number"?e.requested_at:0,a=typeof t.requested_at=="number"?t.requested_at:0;if(o!==a)return a-o;let c=typeof e.operation_id=="string"?e.operation_id:"",u=typeof t.operation_id=="string"?t.operation_id:"";return c.localeCompare(u)}function va(e,t=!1){let r=e.kind,n=r==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",s=t?"failed":e.state,o=tm[s];if(!o)return null;let a=to(r,`${n} ${o}`);return a?{...a,active:wa.has(s),failed:s==="failed"}:null}function am(e){return!e||typeof e!="object"?null:rm[e.step]||null}function Gn(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,r=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},n=am(r),s=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,o=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),a=!o&&(e.cleanup_cursor==="repo_operations"||r.step==="repo_operations"),c=nm(e.merge_sha)?e.merge_sha:null,u=!o&&c&&Array.isArray(e.repo_operations)?e.repo_operations.filter(A=>A&&typeof A=="object"&&sm(A,t,c)).sort(om):[],d=a?u:[],f=d.find(A=>wa.has(A.state));if(f)return va(f);if(s)return s.step==="repo_operations"&&u[0]?va(u[0],!0):null;let _=d.find(A=>qc.has(A.state)?A.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(_)return va(_);if(n){let A=to(n.step,n.label);return A?{...A,active:!0,failed:!1}:null}let h=typeof e.cleanup_cursor=="string"?Hn[e.cleanup_cursor]:null;if(!h)return null;let $=to(h.step,h.label);return $?{...$,active:!0,failed:!1}:null}function no(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var Fc={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},jc={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."};function Bc(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function ka(e){for(let t of Bc(e))if(Object.hasOwn(Fc,t))return Fc[t];return null}function $a(e){let t=null;for(let r of Bc(e))Object.hasOwn(jc,r)&&(t=jc[r]);return t}function so(e){let t=ka(e),r=$a(e);return t&&r?`${t} \u2014 ${r}`:t||r?t||r:typeof e=="string"?e:""}function Uc(e,t){let r=ka(e)??ka(t),n=$a(t)??$a(e);return r&&n?`${r} \u2014 ${n}`:r||n?r||n:typeof t=="string"?t:""}var Wc=160;function im(e){return e.length>Wc?`${e.slice(0,Wc)}\u2026`:e}function lm(e){return!e||!e.reason?"":i`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?i` · <code>${im(e.command)}</code>`:""}
  </div>`}function cm(e){return e?i`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function xa(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),r=Math.floor(t/60),n=t%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function zc(e){let t=e.failure?so(e.failure.reason):"";return i`<div class="worker-banners">
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
          ${lm(e.failure.cause_detail)}
          ${cm(e.failure.reason)}
          ${$r({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function um(e,t,r=null){let n=e.failed===!0,s=!!e.paused,o=n?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):s?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?xa(t-e.started_at):"\u2014",a=dr(e),c=Er(e),u=At(e.usage),d=Jt(e.usage),f=e.conflict_resolution?s?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,_=e.base_exception||null,h=e.landing,$=e.attempt_id&&e.attempt_id===r,A=e.discard?.action?i`<button
        type="button"
        class="rtile__discard"
        data-operation-id=${e.discard.operation?.operation_id||""}
        ?disabled=${!e.discard.enabled}
        title=${e.discard.title}
        aria-label=${e.discard.label}
      >
        ${e.discard.label}
      </button>`:"";return i`<div
    class="rtile${$?" rtile--sel":""}${s?" rtile--paused":""}${n?" rtile--failed":""}"
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
            ${A}
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
            ${A}`}
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
    ${a||u.length>0||d||f||_?i`<div class="rtile__meta">
          ${f?i`<span class="worker-mini__badge">${f}</span>`:""}
          ${_?i`<span
                class="worker-mini__badge"
                title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                >${_}</span
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
    ${_n(e)} ${$r(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${n||s?"":i`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function Aa(e,t=Date.now(),r=null){let n=Array.isArray(e)?e:[];return i`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?i`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>um(s,t,r))}
  </div>`}function Vr(e){return i`<svg
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
  </svg>`}function Sa(){return Vr(xr`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function Ea(){return Vr(xr`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function Hc(){return Vr(xr`<rect x="4.3" y="4.3" width="7.4" height="7.4" rx="1.2" />`)}function Gc(){return Vr(xr`<path d="M4.4 4.4 11.6 11.6M11.6 4.4 4.4 11.6" />`)}function Vc(){return Vr(xr`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function Kc(){return Vr(xr`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function Yc(){return Vr(xr`<path d="M3 3.6 8.2 8 3 12.4z" />
    <path d="M8.8 3.6 14 8l-5.2 4.4z" />`)}var Vn=1,dm=6e4,pm={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"},fm=new Set(["auto_merge","merged","merge","done"]),Zc={running:3,paused:2,failed:1};function _m(e,t){let r=null,n=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=n&&(n=o,r=s)}return r}function mm(e,t){let r=Object.values(e||{}),n=new Set,s=new Map;for(let a of r)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&n.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of r){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let c=null;if(a.status==="running")c="running";else if(a.status==="paused"&&!n.has(a.attempt_id))c="paused";else if(a.status==="failed"||a.status==="orphaned"){let _=t.get(a.bead_id),h=typeof _=="number"&&_>0&&typeof a.finished_at=="number"&&_>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!h&&typeof a.dismissed_at!="number"&&(c="failed")}if(!c)continue;let u=typeof a.started_at=="number"?a.started_at:null,d=o.get(a.bead_id);if(d){let _=Zc[d.run_state],h=Zc[c];if(_>h||_===h&&(d.started_at??0)>(u??0))continue}let f=typeof a.session_id=="string"&&a.session_id.length>0;o.set(a.bead_id,{attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",run_state:c,started_at:u,last_event_at:typeof a.last_event_at=="number"?a.last_event_at:null,runner:typeof a.runner=="string"?a.runner:null,model:typeof a.model=="string"?a.model:null,effort:typeof a.effort=="string"?a.effort:null,speed:typeof a.speed=="string"?a.speed:null,resumed_from:typeof a.resumed_from=="string"?a.resumed_from:null,continuation_mode:a.continuation_mode==="session"||a.continuation_mode==="fresh"?a.continuation_mode:null,usage:Ht(e,a.bead_id),can_pause:c==="running"&&f,can_resume:c!=="running"&&f&&!n.has(a.attempt_id)})}return o}function Xc(e,t){let r=e[t];if(!r)return"";if(r.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let n=typeof r.reason=="string"?r.reason:"",s=n.indexOf(":");return s>0&&s<n.length-1?`\u26D4 ${n.slice(0,s)} (${n.slice(s+1)})`:`\u26D4 ${n}`}function St(e){return e&&typeof e=="object"?e:{}}function Ta(e,t,r){let n=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=r&&typeof r.done_since=="number"?r.done_since:void 0,a=new Map;for(let b of s)b&&typeof b.root_dir=="string"&&a.set(b.root_dir,b);let c=[],u=[],d=[],f=[],_=[],h=[],$=new Map,A=new Map,O=new Map;for(let b of n){if(!b||typeof b.root_dir!="string")continue;let E=b.root_dir,V=b.name||E,ne=a.get(E),P=ne&&typeof ne.revision=="number"?ne.revision:typeof b.revision=="number"?b.revision:0,F=St(b.attempts),pe=St(b.bead_titles),ye=St(b.pr_observations),_e=St(b.admission),je=St(b.revise_parked),et=St(b.merge_queue_state),Ke=St(b.cleanup_failed),Le=St(b.discard_operations),Be=St(b.bead_blocked_by),ue=St(b.pr_activity),Te=Array.isArray(b.repo_operations)?b.repo_operations:[],Oe=Array.isArray(b.merge_queue)?b.merge_queue:[],De=new Set(Oe.filter(Y=>Y&&typeof Y.bead_id=="string").map(Y=>Y.bead_id)),Se=new Map(Oe.filter(Y=>Y&&typeof Y.bead_id=="string").map(Y=>[Y.bead_id,Y])),We=Array.isArray(b.queue)?b.queue:[],Ze=(Array.isArray(b.serial_lanes)?b.serial_lanes:[]).filter(Y=>Y&&/^s[1-5]$/.test(Y.id)&&Array.isArray(Y.entries)),$e=St(b.lane_states),Xe=typeof b.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(b.serial_lane_count))):Math.min(5,Ze.length);O.set(E,Xe);let Z=new Map(Ze.map(Y=>[Y.id,Y])),z=new Map;for(let Y of Ze)for(let re of Y.entries)re&&typeof re.bead_id=="string"&&z.set(re.bead_id,Y.id);let oe=Array.isArray(b.done)?b.done:[];for(let Y of oe)Y&&typeof Y.bead_id=="string"&&h.push({id:Y.bead_id,root_dir:E,workspace_name:V});let Me=new Map;for(let Y of oe)Y&&typeof Y.bead_id=="string"&&typeof Y.added_at=="number"&&Me.set(Y.bead_id,Y.added_at);let Fe=Y=>({id:Y,title:pe[Y]||Y,root_dir:E,workspace_name:V,expected_revision:P,draggable:!1}),Ue=new Set;for(let[Y,re]of mm(F,Me))Ue.add(Y),u.push({...Fe(Y),lane:"running",...z.has(Y)?{serial_lane_id:z.get(Y)}:{},attempt_id:re.attempt_id,run_state:re.run_state,can_pause:re.can_pause,can_resume:re.can_resume,started_at:re.started_at,last_event_at:re.last_event_at,runner:re.runner,model:re.model,effort:re.effort,speed:re.speed,resumed_from:re.resumed_from,continuation_mode:re.continuation_mode,usage:re.usage,discard:fr(Le,Y,{attempt_id:re.attempt_id}),badges:re.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:re.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:re.run_state==="failed"});for(let Y of Array.isArray(b.pr_wait)?b.pr_wait:[]){let re=Y&&Y.bead_id;if(typeof re!="string"||Ue.has(re))continue;Ue.add(re);let me=St(ye[re]),nt=St(me.pr),ge=me.gate?St(me.gate):null,T=De.has(re),M=Se.get(re)?.continuation_action||null,L=!!M&&M.continuation===null,G=et.active===re,se=Y.external===!0,w=Ke[re]||null,C=St(ue[re]),q=Gn({bead_id:re,merge_sha:Y.merge_sha,cleanup_cursor:Y.cleanup_cursor,merge_progress:C.merge_progress||null,cleanup_failed:w,repo_operations:Te}),fe=no(q),ae=!!ge&&ge.base_badge==="\uCDA9\uB3CC",ve=!!w&&["child_sweep","branch_cleanup","parent_close"].includes(w.step)&&!!ge&&ge.tier==="merged",Re=se&&!!w&&!!ge&&ge.tier==="merged",ze=!!ge&&["closed_unmerged","review","undecidable"].includes(ge.tier),He=fr(Le,re,{external:se,merge_active:G||q?.step==="merge",merge_queued:T,cleanup_active:fe,merged:!!w||ge?.tier==="merged"}),U=!!He.operation;d.push({...Fe(re),lane:"pr_wait",pr_number:typeof nt.number=="number"?nt.number:null,pr_url:typeof nt.url=="string"?nt.url:void 0,external:se,usage:Ht(F,re),merge_step:q,badges:L?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:q?[ge?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:w?[Gr(w.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Gr(w.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof ge?.gate_badge=="string"&&ge.gate_badge.length>0?[ge.gate_badge]:[],alert:q?q.failed===!0:!!w||ze,reason:w&&q?.active!==!0?ro(w.step):"PR \uB300\uAE30",merge_action:ge?.tier==="merged"&&!ve&&!Re?!1:!T||L,merge_enabled:!U&&(L||ge?.enabled===!0||ae||ve||Re),merge_label:L?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Re||ve?"\uC815\uB9AC \uC7AC\uAC1C":ae&&!ve?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:L?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":U?He.error?`\uD3D0\uAE30 \uC2E4\uD328: ${He.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${He.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Re?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":ve?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":ae?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":ge?.enabled===!0?`\uBA38\uC9C0 (${ge.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${ge?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:T&&!L,cancel_enabled:!G,continuation_mismatch:M?.mismatch||null,discard:He,discard_action:He.action,discard_enabled:He.enabled,discard_title:He.title})}let tt=(Y,re,me,nt)=>{let ge=Y&&Y.bead_id;if(typeof ge!="string"||Ue.has(ge))return null;Ue.add(ge);let T=je[ge],M=fr(Le,ge),L=M.operation?M:null,G={...Fe(ge),lane:re,draggable:!L,discard:L||void 0,reason:Xc(_e,ge),queue_position:me+1,queue_index:me,queue_length:nt,badges:T?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!T,revise_action:!!T,revise_enabled:!!T&&!L,revise_title:T?T.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${T.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};return Object.hasOwn(Be,ge)&&(G.blocked_by=Array.isArray(Be[ge])?Be[ge].filter(se=>typeof se=="string"&&se.length>0):[]),G};for(let Y=0;Y<We.length;Y++){let re=tt(We[Y],"queue",Y,We.length);if(!re)continue;f.push(re);let me=$.get(E);me?me.push(re):$.set(E,[re])}let ct=[];for(let Y=0;Y<Ze.length;Y++){let re=Ze[Y],me=[];for(let ge=0;ge<re.entries.length;ge++){let T=tt(re.entries[ge],re.id,ge,re.entries.length);T&&(me.push(T),f.push(T))}if(me.length===0)continue;let nt=St($e[re.id]);ct.push({id:re.id,index:Y,items:me,occupied_by:Array.isArray(nt.occupied_by)?nt.occupied_by.filter(ge=>typeof ge=="string"):[],corrections:Array.isArray(nt.corrections)?nt.corrections.length:0,cycle:nt.cycle===!0})}A.set(E,ct);let ot=Array.from({length:Xe},(Y,re)=>{let me=`s${re+1}`,nt=Z.get(me),ge=nt&&Array.isArray(nt.entries)?nt.entries:[],T=St($e[me]);return{id:me,index:ge.length,length:ge.length,occupied_by:Array.isArray(T.occupied_by)?T.occupied_by.filter(M=>typeof M=="string"):[]}});for(let Y of Array.isArray(b.runnable)?b.runnable:[]){let re=Y&&Y.bead_id;typeof re!="string"||Ue.has(re)||(Ue.add(re),c.push({...Fe(re),title:Y.title||pe[re]||re,lane:"runnable",draggable:!0,reason:Xc(_e,re),created_at:Y.created_at??void 0,updated_at:Y.updated_at??void 0,labels:Array.isArray(Y.labels)?Y.labels:[],spec_reviewer:typeof Y.spec_reviewer=="string"?Y.spec_reviewer:void 0,plan_state:Y.plan_state==="approved"||Y.plan_state==="authored"?Y.plan_state:"none",workflow:Y.route?{route:Y.route,chips:{route:Y.route}}:null,blocked:Y.blocked===!0,...Array.isArray(Y.blocked_by)?{blocked_by:Y.blocked_by.filter(me=>typeof me=="string"&&me.length>0)}:{},place_index:We.length,place_lanes:ot}))}for(let Y of oe){let re=Y&&Y.bead_id;if(typeof re!="string"||Ue.has(re)||(Ue.add(re),o!==void 0&&typeof Y.added_at=="number"&&Y.added_at<o))continue;let me=_m(F,re);_.push({...Fe(re),lane:"done",done:!0,usage:Ht(F,re),done_at:typeof Y.added_at=="number"?Y.added_at:void 0,done_kind:me&&typeof me.done_kind=="string"?me.done_kind:null})}}let W=new Map;s.forEach((b,E)=>{b&&typeof b.root_dir=="string"&&W.set(b.root_dir,E)});let te=r&&r.running_sort==="repo"?"repo":"started";u.sort((b,E)=>{if(te==="repo"){let P=W.get(b.root_dir)??Number.MAX_SAFE_INTEGER,F=W.get(E.root_dir)??Number.MAX_SAFE_INTEGER;if(P!==F)return P-F}let V=typeof b.started_at=="number"&&Number.isFinite(b.started_at)?b.started_at:null,ne=typeof E.started_at=="number"&&Number.isFinite(E.started_at)?E.started_at:null;return V!==null&&ne!==null&&V!==ne?V-ne:V===null&&ne!==null?1:V!==null&&ne===null?-1:b.id.localeCompare(E.id)}),_.sort((b,E)=>(E.done_at??0)-(b.done_at??0));let ee=s.length>0?s:n.map(b=>({root_dir:b&&b.root_dir,name:b&&b.name,auto_advance:b&&b.auto_advance,auto_merge:b&&b.auto_merge,slots:b&&b.slots,revision:b&&b.revision,runner_catalog:b&&b.runner_catalog})),D=[];for(let b of ee){if(!b||typeof b.root_dir!="string")continue;let E=$.get(b.root_dir)||[],V=A.get(b.root_dir)||[];D.push({root_dir:b.root_dir,name:b.name||b.root_dir,auto_advance:b.auto_advance===!0,auto_merge:b.auto_merge===!0,slots:typeof b.slots=="number"&&b.slots>=Vn?b.slots:Vn,revision:typeof b.revision=="number"?b.revision:0,runner_catalog:St(b.runner_catalog),items:E,sublanes:{parallel:E,serial:V},serial_lane_count:O.get(b.root_dir)||0})}let N={runnable:c,queue:f,queue_groups:D,running:u,pr_wait:d,done:_,automation:{total:D.length,both_on:D.filter(b=>b.auto_advance&&b.auto_merge).length}},R=ya(N);for(let b of h)R.has(b.id)||R.set(b.id,{root_dir:b.root_dir,workspace_name:b.workspace_name,lane:"done",state:"done"});for(let b of[...N.queue,...N.runnable]){if(!Object.hasOwn(b,"blocked_by"))continue;let E=R.get(b.id);b.blockers=(b.blocked_by||[]).map(V=>Lc(V,E,R,s)),b.blocker_warnings=b.blockers.filter(V=>V.missing_internal).map(V=>`\u26A0 \uC120\uD589 ${V.id}\uAC00 \uC5B4\uB290 \uB808\uC778\uC5D0\uB3C4 \uC5C6\uACE0 \uC2E4\uD589 \uC911\uB3C4 \uC544\uB2D8 \u2014 \uC218\uB3D9 \uAC1C\uC785 \uC804\uAE4C\uC9C0 \uC774 \uC790\uB9AC\uC5D0\uC11C \uC815\uC9C0`),b.blocker_warnings.length>0&&(b.alert=!0)}let j=Oc(N.queue_groups);for(let b of N.queue_groups)for(let E of b.sublanes.serial){let V=j.get(Pc(b.root_dir,E.id));V&&(E.cross_wait_peers=V)}return N}function gm(e,t){if(typeof e!="number"||!Number.isFinite(e))return"";let n=t-e<dm;return i`<span
    class="mon-beat${n?" mon-beat--live":""}"
    title=${`\uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${$t(e)}`}
    ><span class="mon-beat__dot" aria-hidden="true"></span>${n?"":i`<span class="mon-beat__age"
          >${jt(e,t)}</span
        >`}</span
  >`}function Kn(e){return i`<div class="mon-c__title">${e.title}</div>`}function Yn(e){return i`<span class="mon-c__id" title="클릭하면 상세로 이동"
    >${e.id}</span
  >`}function oo(e){return e.workspace_name?i`<span class="mon-c__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:""}function Ca(e){let t=At(e.usage),r=Jt(e.usage);return t.length>0?t.map(n=>i`<span class="mon-c__usage" title=${n.tooltip}
          >${n.label}</span
        >`):r?i`<span class="mon-c__usage" title=${cn(e.usage)}
        >${r}</span
      >`:""}function Ra(e){return(Array.isArray(e.badges)?e.badges:[]).map(r=>i`<span class="mon-c__badge${e.alert?" mon-c__badge--alert":""}"
        >${r}</span
      >`)}function bm(e){return i`<span class="mon-c__ops">
    ${e.run_state==="running"?i`<button
          type="button"
          class="mon-op mon-op--pause"
          ?disabled=${e.can_pause===!1}
          aria-label="일시정지"
          title="일시정지 — 세션을 끊고 이어하기 가능 상태로 둡니다"
        >
          ${Ea()}
        </button>`:i`<button
          type="button"
          class="mon-op mon-op--resume"
          ?disabled=${e.can_resume===!1}
          aria-label="이어하기"
          title="이어하기"
        >
          ${Sa()}
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
          ${Gc()}
        </button>`:""}
  </span>`}function Qc(e){if(!Object.hasOwn(e,"blocked_by"))return"";let t=Array.isArray(e.blockers)?e.blockers:[];return t.length===0?e.blocked?i`<span class="mon-blocker">🔒 blocked</span>`:"":t.map(r=>i`<span
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
      </span>`)}function Jc(e){let t=Array.isArray(e.blocker_warnings)?e.blocker_warnings:[];return t.length>0?i`<div class="mon-blocker-warnings">
        ${t.map(r=>i`<div class="mon-blocker-warning">${r}</div>`)}
      </div>`:""}function eu(){return i`<span class="mon-link mon-popover-owner">
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
  </span>`}function hm(e,t){let r=typeof e.started_at=="number"?xa(t-e.started_at):"";return i`${Kn(e)}
    <div class="mon-c__meta">
      ${Ra(e)}${gm(e.last_event_at,t)}${Yn(e)}${oo(e)}
      ${dr(e)?i`<span class="mon-c__model">${dr(e)}</span>`:""}
      ${Er(e)?i`<span
            class="rtile__resumed"
            title=${Er(e)}
            >↻</span
          >`:""}
      ${e.serial_lane_id?i`<span class="mon-c__lane">${e.serial_lane_id}</span>`:""}
      ${r?i`<span class="mon-live__elapsed">${r}</span>`:""}
      ${Ca(e)}${bm(e)}${$r(e)}
    </div>`}function ym(e){let t=e.workflow,n=(t&&t.chips||{}).route||t&&t.route,s=typeof e.spec_reviewer=="string"?e.spec_reviewer:"",o=e.plan_state==="approved"?"plan \u2713":e.plan_state==="authored"?"plan \u270E":"plan \u2013",a=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),c=jt(e.updated_at);return i`${Kn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>${Yn(e)}
      ${n?i`<span class="ctl-chip ctl-chip--route">${n}</span>`:""}
      ${s?i`<span
            class="ctl-chip mon-c__review${s==="skipped"?" mon-c__review--dim":""}"
            >spec:${s}</span
          >`:""}
      ${n==="full_plan"?i`<span
            class="ctl-chip mon-c__plan${e.plan_state==="none"?" mon-c__review--dim":""}"
            >${o}</span
          >`:""}
      ${ws(e.labels,null).map(u=>i`<span class="ctl-chip ctl-chip--label">${u}</span>`)}
      ${oo(e)}
      ${c?i`<span title=${`\uC218\uC815 ${$t(e.updated_at)}`}
            >수정 ${c}</span
          >`:""}
      ${e.reason?i`<span
            class="mon-c__reason${a?" mon-c__reason--danger":""}"
            >${e.reason}</span
          >`:""}
      ${Qc(e)}
      <span class="mon-c__ops">
        ${eu()}
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
    ${Jc(e)}`}function vm(e){let t=!!e.discard?.operation;return i`${Kn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>
      <span class="mon-live__pos">#${e.queue_position}</span>${Yn(e)}
      ${Ra(e)}
      ${e.reason?i`<span class="mon-c__reason">${e.reason}</span>`:""}
      ${Qc(e)}
      <span class="mon-c__ops">
        ${eu()}
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
    ${Jc(e)} ${$r(e)}
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
        </div>`:""}`}function wm(e){let t=e.merge_step||null,r=!!(Jt(e.usage)||t||e.merge_action||e.cancel_action||e.discard_action);return i`${Kn(e)}
    <div class="mon-c__meta">
      ${Yn(e)}${oo(e)}
      ${e.pr_url&&e.pr_number?i`<a
            class="mon-c__pr"
            href=${e.pr_url}
            target="_blank"
            rel="noreferrer noopener"
            title="PR 열기"
            >#${e.pr_number} ↗</a
          >`:""}
      ${Ra(e)}
      ${e.reason?i`<span class="mon-c__reason">${e.reason}</span>`:""}
    </div>
    ${r?i`<div class="mon-c__tail">
          ${Ca(e)}${t?i`<span
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
          ${$r(e)}
        </div>`:""}`}function km(e,t){let r=e.done_kind||"",n=r?pm[r]||r:"",s=jt(e.done_at,t);return i`${Kn(e)}
    <div class="mon-c__meta">
      ${Yn(e)}${oo(e)}
      ${n?i`<span
            class="mon-live__kind${fm.has(r)?" mon-live__kind--ok":" mon-live__kind--warn"}"
            >${n}</span
          >`:""}
      ${Ca(e)}
      ${s?i`<span title=${`\uC644\uB8CC ${$t(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
    </div>`}function tu(e,t){return e.lane==="running"?hm(e,t):e.lane==="runnable"?ym(e):e.lane==="queue"||/^s[1-5]$/.test(e.lane)?vm(e):e.lane==="pr_wait"?wm(e):km(e,t)}function ru(e){let t=String(e.revision),r=e.sublanes?e.sublanes.parallel.length+e.sublanes.serial.reduce((n,s)=>n+s.items.length,0):e.items.length;return i`<header
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
        ${e.auto_advance?Ea():Sa()}
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
        ${Vc()}
        <span class="mon-ctl__label">머지</span>
      </button>
      <label class="mon-ctl mon-ctl--slots" title="동시에 실행할 세션 수">
        ${Kc()}
        <span class="mon-ctl__label">슬롯</span>
        <input
          type="number"
          class="mon-slots__input"
          min=${Vn}
          step="1"
          data-root-dir=${e.root_dir}
          data-revision=${t}
          aria-label=${`${e.name} \uB3D9\uC2DC \uC2E4\uD589 \uC2AC\uB86F`}
          .value=${String(e.slots)}
        />
      </label>
    </span>
  </header>`}function nu(e){let{total:t,both_on:r}=e.automation,n=t>0&&r===t,s=e.running_sort==="repo"?"repo":"started",o=ur.find(c=>c.value===e.done_range)?.label||"",a=Array.isArray(e.token_total)?e.token_total:e.token_total?[{label:e.token_total,tooltip:e.token_tooltip}]:[];return i`<div class="mon-top">
    <button
      type="button"
      class="mon-auto-all${n?" is-active":""}"
      data-on=${n?"false":"true"}
      aria-pressed=${n?"true":"false"}
      ?disabled=${t===0}
      title=${n?"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4 (\uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4)":"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
    >
      ${n?Hc():Yc()}
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
        ${ur.map(c=>i`<option
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
  </div>`}function su(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function ou(e){let t=(Array.isArray(e)?e:[]).map(c=>c&&c.usage).filter(c=>c&&typeof c=="object"&&"providers"in c);if(t.length>0)return At(Es(t));let r={};for(let c of br)r[c]=0;let n=!1,s=0,o=0,a=0;for(let c of Array.isArray(e)?e:[]){let u=c&&c.usage;if(u&&typeof u=="object"){let d=!1;for(let f of br){let _=u[f];typeof _=="number"&&Number.isFinite(_)&&(r[f]+=_,n=!0,d=!0)}if(d){o+=1;let f=u.total_cost_usd;typeof f=="number"&&Number.isFinite(f)&&(s+=f,a+=1)}}}return o>0&&a===o&&(r.total_cost_usd=s),n?Jt(r):null}var au="bdui.monitor.done-range",iu="bdui.monitor.running_sort",lu="beads-ui.monitor.candidate-filter",Ia={show_blocked:!1};function $m(){try{let e=window.localStorage.getItem(lu);if(!e)return{...Ia};let t=JSON.parse(e);return!t||typeof t!="object"?{...Ia}:{show_blocked:t.show_blocked===!0}}catch{return{...Ia}}}function xm(e){try{window.localStorage.setItem(lu,JSON.stringify({show_blocked:e.show_blocked}))}catch{}}function Am(e,t){if(t.show_blocked)return{visible:e,hidden_blocked:0};let r=e.filter(n=>n.blocked!==!0);return{visible:r,hidden_blocked:e.length-r.length}}function Sm(){try{let e=window.localStorage.getItem(au);return zt(e)?e:Ft}catch{return Ft}}function Em(e){try{window.localStorage.setItem(au,e)}catch{}}function Tm(){try{return window.localStorage.getItem(iu)==="repo"?"repo":"started"}catch{return"started"}}function Cm(e){try{window.localStorage.setItem(iu,e)}catch{}}var cu="tab:monitor:pipeline",Rm=1e3,Im=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}];function ao(e,t){let r=(e.lane==="runnable"||e.lane==="queue")&&e.draggable!==!1;return i`<div
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
    ${tu(e,t)}
  </div>`}function Lm(e,t){let r=e.serial_lane_count>0||e.sublanes.serial.length>0,n=r?i`<section class="mon-sublane mon-sublane--parallel">
        <header class="mon-sublane__hd">
          <span class="mon-sublane__name">병렬</span>
          <span class="mon-sublane__count"
            >대기 ${e.sublanes.parallel.length}</span
          >
        </header>
        <div class="mon-group__list">
          ${e.sublanes.parallel.map(s=>ao(s,t))}
        </div>
      </section>`:i`<div class="mon-group__list">
        ${e.items.map(s=>ao(s,t))}
      </div>`;return i`<div class="mon-group" data-root-dir=${e.root_dir}>
    ${ru(e)} ${n}
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
                ${s.items.map(o=>ao(o,t))}
              </div>
            </section>`):""}
  </div>`}function uu(e,t){let r=mt("views:monitor"),n=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,c=t.switchWorkspace,u=t.now||(()=>Date.now()),d=t.confirm||(T=>typeof globalThis.confirm!="function"||globalThis.confirm(T)),f=Sm(),_=Tm(),h=$m();function $(){let T=ur.find(M=>M.value===f);return T?T.label:""}let A=document.createElement("div");A.className="mon",e.appendChild(A);let O=Ta(null,null),W=new Map,te=null,ee=null;async function D(T,M,L,G,se=!0){if(!o||!L)return null;let w=await o(T,{...M,root_dir:L,expected_revision:G});if(w&&w.conflict&&se){w.queue&&W.set(L,w.queue);let C=w.queue&&typeof w.queue.revision=="number"?w.queue.revision:G;w=await o(T,{...M,root_dir:L,expected_revision:C})}return w&&w.queue&&L&&W.set(L,w.queue),w}function N(T,M){let L=W.get(T),G=s&&s.get?s.get():null,se=(Array.isArray(G)?G:[]).find(C=>C?.root_dir===T);return(L||se)?.merge_queue?.find(C=>C.bead_id===M)?.continuation_action}async function R(T,M,L,G){let se=await D(T,M,L,G),w=W.get(L)?.revision??se?.queue?.revision??G;return gr(se,(C,q)=>D(T,{...M,continuation:C,decision_token:q},L,w,!1),{refresh:C=>D(T,M,L,C?.queue?.revision??W.get(L)?.revision??w,!1)})}async function j(T,M,L,G){let se=await gr({continuation_mismatch:G},(C,q)=>D("worker-merge-queue-add",{bead_id:M,continuation:C,decision_token:q},T,L,!1)),w=se?.queue?.merge_queue?.find(C=>C.bead_id===M)?.continuation_action;se?.applied!==!0&&w?.continuation===null&&w.mismatch&&await j(T,M,se.queue.revision,w.mismatch)}async function b(T,M,L){let G=await D("worker-discard",T,M,L);if(G&&G.discarded===!0){ie(eo(G),"success",5e3);return}if(G&&G.reason){ie(`\uD3D0\uAE30 \uC2E4\uD328: ${G.reason}`,"error");return}if(G&&G.accepted&&G.pending==="merged_revert"){ie("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(G&&G.accepted){ie(`\uD3D0\uAE30 \uC9C4\uD589: ${G.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}G&&!G.conflict&&ie("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function E(T,M,L){return!o||!L?null:await o(T,{...M,root_dir:L})}async function V(T){if(!o||!T&&!d("\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB055\uB2C8\uB2E4. \uAC01 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uD568\uAED8 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?"))return;let M=await o("monitor-auto-toggle",{on:T}),L=M&&Array.isArray(M.failed)?M.failed:[];L.length>0&&ie(`\uC790\uB3D9\uD654 ${T?"\uCF1C\uAE30":"\uB044\uAE30"} \uC77C\uBD80 \uC2E4\uD328: ${L.map(G=>G.root_dir).join(", ")}`,"error",3200)}async function ne(){let T=new Map;for(let M of O.pr_wait)T.has(M.root_dir)||T.set(M.root_dir,M.expected_revision);for(let[M,L]of T)await D("worker-merge-queue-add-all",{},M,L)}let P=null,F=!1,pe=null;function ye(){pe!==null&&clearTimeout(pe),pe=setTimeout(()=>{pe=null,F=!1},0)}function _e(T){let M=T.target;return typeof M?.closest=="function"?M.closest(".mon-group"):null}function je(T){let M=_e(T);return!M||!P?null:(M.getAttribute("data-root-dir")||"")===P.root_dir?M:null}function et(){for(let T of Array.from(A.querySelectorAll(".mon-group--drag-over")))T.classList.remove("mon-group--drag-over")}function Ke(T){let M=T.target,L=typeof M?.closest=="function"?M.closest('.mon-card[draggable="true"]'):null;if(L){P={bead_id:L.getAttribute("data-issue-id")||"",lane:L.getAttribute("data-lane")||"",root_dir:L.getAttribute("data-root-dir")||"",revision:Number(L.getAttribute("data-revision")||0)||0,queue_index:Number(L.getAttribute("data-queue-index")),queue_length:Number(L.getAttribute("data-queue-length")),place_index:Number(L.getAttribute("data-place-index"))},F=!0;try{T.dataTransfer?.setData("text/plain",P.bead_id),T.dataTransfer&&(T.dataTransfer.effectAllowed="move")}catch{}}}function Le(T){let M=je(T);M&&(T.preventDefault(),T.dataTransfer&&(T.dataTransfer.dropEffect="move"),M.classList.add("mon-group--drag-over"))}function Be(T){_e(T)?.classList.remove("mon-group--drag-over")}function ue(){P=null,et(),ye()}function Te(T){let M=je(T),L=P;if(P=null,et(),!M||!L||!L.bead_id)return;T.preventDefault();let G=T.target,se=typeof G?.closest=="function"?G.closest('.mon-card[data-lane="queue"]'):null,w=se&&M.contains(se)?Number(se.getAttribute("data-queue-index")):NaN;if(L.lane==="runnable"){let fe=Number.isFinite(w)?w:L.place_index;if(!Number.isFinite(fe))return;D("worker-queue-place",{bead_id:L.bead_id,index:fe},L.root_dir,L.revision);return}if(L.lane!=="queue"||se&&se.getAttribute("data-issue-id")===L.bead_id)return;let C=L.queue_index,q=Number.isFinite(w)?C>w?w:w-1:L.queue_length-1;!Number.isFinite(q)||q<0||q===C||D("worker-queue-reorder",{bead_id:L.bead_id,to_index:q},L.root_dir,L.revision)}function Oe(T){let M=Am(O.runnable,h),L={runnable:M.visible,queue:O.queue,running:O.running,pr_wait:O.pr_wait,done:O.done};return i`${nu({automation:O.automation,counts:{running:O.running.length,queue:O.queue.length,pr_wait:O.pr_wait.length},running_sort:_,done_range:f,token_total:ou(O.done),token_tooltip:su($())})}
      <div class="worker-lanes mon-lanes">
        ${Im.map(G=>{let se=L[G.lane],w=G.lane==="queue"?O.queue_groups.length>0?i`${O.queue_groups.map(C=>Lm(C,T))}`:void 0:se.length>0?i`${se.map(C=>ao(C,T))}`:void 0;return nr({id:`monitor-${G.lane}`,lane:G.pane,title:G.lane==="done"?`\uC644\uB8CC\xB7${$()}`:G.title,items:se,empty:G.empty,body:w,live:G.lane==="running"&&se.length>0,header_control:G.lane==="runnable"?i`<span class="mon-candidate-filter">
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
                    ${M.hidden_blocked>0?i`<span class="worker-filter__hidden"
                          >숨김 ${M.hidden_blocked}건</span
                        >`:""}
                  </span>`:G.lane==="pr_wait"&&se.length>0?i`<button
                      type="button"
                      class="mon-lane-op mon-merge-all"
                      title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
                    >
                      일괄 머지
                    </button>`:""})})}
      </div>`}function De(){let T=s&&s.get?s.get():null,M=s&&s.getWorkspacesState?s.getWorkspacesState():[],L=u();O=Ta(T,M,{done_since:qr(f,L),running_sort:_}),Ge(Oe(L),A)}function Se(T,M){let L=a?a():void 0;if(!M||!L||M===L||!c){n(T);return}c(M).then(()=>{n(T)}).catch(G=>{r("workspace switch for %s failed: %o",M,G)})}function We(T){return{root_dir:T.getAttribute("data-root-dir")||"",revision:Number(T.getAttribute("data-revision")||0)||0}}function Ze(T){if(typeof T=="string"&&T.length>0)return T;if(T&&typeof T=="object"){let M=T;if(typeof M.message=="string"&&M.message.length>0)return M.message;if(typeof M.error=="string"&&M.error.length>0)return M.error;if(M.error&&typeof M.error=="object"&&typeof M.error.message=="string")return M.error.message}return"\uC5F0\uACB0\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}function $e(T,M){let L=T.querySelector(".mon-link__trigger"),G=T.querySelector(".mon-link__popover"),se=T.querySelector(".mon-link__error");!L||!G||!se||(Me(),G.hidden=!1,L.setAttribute("aria-expanded","true"),se.textContent=M,se.hidden=!1)}async function Xe(T,M,L){let G=M.getAttribute("data-root-dir")||"",se=M.getAttribute("data-issue-id")||"";if(!(!se||!L||L===se))try{await E(T,{a:se,b:L},G),Me()}catch(w){$e(M,Ze(w))}}function Z(T,M){let{root_dir:L,revision:G}=We(T),se=T.getAttribute("data-issue-id")||"",w=M.dataset.attemptId||T.getAttribute("data-attempt-id")||"",C=M.classList;if(C.contains("mon-link__trigger")){Ue(M);return}if(C.contains("mon-link__candidate")||C.contains("mon-link__direct")){let q=M.dataset.targetId||"";Xe("dep-add",T,q);return}if(C.contains("mon-blocker__remove")){let q=M.dataset.blockerId||"";Xe("dep-remove",T,q);return}if(C.contains("mon-place__choice")){let q=M.dataset.lane||"parallel",fe=Number(M.dataset.placeIndex||0)||0;Me(),D("worker-queue-place",{bead_id:se,...q==="parallel"?{}:{lane:q},index:fe},L,G);return}if(C.contains("worker-card__place")){Fe(M);return}if(C.contains("mon-op--up")||C.contains("mon-op--down")){let q=Number(T.getAttribute("data-queue-index")||0)||0,fe=C.contains("mon-op--up")?q-1:q+1;if(fe<0)return;D("worker-queue-reorder",{bead_id:se,.../^s[1-5]$/.test(T.dataset.lane||"")?{lane:T.dataset.lane}:{},to_index:fe},L,G);return}if(C.contains("mon-op--remove")){D("worker-queue-remove",{bead_id:se},L,G);return}if(C.contains("mon-op--pause")){E("worker-attempt-pause",{attempt_id:w},L);return}if(C.contains("mon-op--discard")){if(!d(Wn(se,"unmerged")))return;b({bead_id:se,...w?{attempt_id:w}:{},...M.dataset.operationId?{operation_id:M.dataset.operationId}:{}},L,G);return}if(C.contains("mon-op--resume")){an().then(q=>{if(q!==null)return R("worker-attempt-resume",{attempt_id:w,...q!==""?{instructions:q}:{}},L,G)});return}if(C.contains("mon-op--dismiss")){D("worker-attempt-dismiss",{attempt_id:w},L,G);return}if(C.contains("worker-mini__merge")){let q=N(L,se);q?.mismatch&&q.continuation===null?j(L,se,G,q.mismatch):D("worker-merge-queue-add",{bead_id:se},L,G);return}if(C.contains("worker-mini__merge-cancel")){D("worker-merge-queue-remove",{bead_id:se},L,G);return}if(C.contains("worker-mini__discard")){let q=M.dataset.discardMode==="merged"?"merged":"unmerged";if(!d(Wn(se,q)))return;b({bead_id:se,...w?{attempt_id:w}:{},...M.dataset.operationId?{operation_id:M.dataset.operationId}:{}},L,G);return}if(C.contains("worker-mini__revise-fix")){R("worker-revise-fix",{bead_id:se},L,G);return}C.contains("worker-mini__revise-approve")&&D("worker-revise-approve",{bead_id:se},L,G)}function z(T){T.querySelector(".mon-link__list")?.replaceChildren();let L=T.querySelector(".mon-link__search");L&&(L.value="");let G=T.querySelector(".mon-link__direct");G&&(G.hidden=!0,G.dataset.targetId="",G.textContent="");let se=T.querySelector(".mon-link__empty");se&&(se.hidden=!0);let w=T.querySelector(".mon-link__error");w&&(w.hidden=!0,w.textContent="")}function oe(T,M){let L=T.querySelector(".mon-link__list");if(!L)return;let G=document.createDocumentFragment(),se=Mc(O).filter(w=>w.id!==M);for(let w of se){let C=document.createElement("button");C.type="button",C.className="mon-link__candidate",C.dataset.targetId=w.id,C.dataset.search=`${w.id} ${w.title} ${w.location}`.toLocaleLowerCase();let q=document.createElement("strong");q.textContent=w.id;let fe=document.createElement("span");fe.textContent=w.title;let ae=document.createElement("small");ae.textContent=w.location,C.append(q,fe,ae),G.append(C)}L.replaceChildren(G)}function Me(){for(let T of Array.from(A.querySelectorAll(".mon-card-popover"))){let M=T;M.hidden=!0,M.classList.contains("mon-link__popover")&&z(M)}for(let T of Array.from(A.querySelectorAll('[aria-expanded="true"]')))T.setAttribute("aria-expanded","false")}function Fe(T){let L=T.closest(".mon-place")?.querySelector(".mon-place__popover")||null;if(!L)return;let G=L.hidden;Me(),G&&(L.hidden=!1,T.setAttribute("aria-expanded","true"))}function Ue(T){let L=T.closest(".mon-link")?.querySelector(".mon-link__popover")||null;if(!L)return;let G=L.hidden;if(Me(),G){let se=T.closest(".mon-card");oe(L,se?.getAttribute("data-issue-id")||""),L.hidden=!1,T.setAttribute("aria-expanded","true");let w=L.querySelector(".mon-link__search");w&&(tt(w),w.focus())}}function tt(T){let M=T.closest(".mon-link__popover"),L=T.closest(".mon-card");if(!M||!L)return;let G=T.value.trim(),se=G.toLocaleLowerCase(),w=0,C=!1;for(let Re of Array.from(M.querySelectorAll(".mon-link__candidate"))){let ze=Re,He=ze.dataset.targetId||"",U=se.length===0||(ze.dataset.search||"").includes(se);ze.hidden=!U,U&&(w+=1),He.toLocaleLowerCase()===se&&(C=!0)}let q=M.querySelector(".mon-link__direct"),fe=L.getAttribute("data-issue-id")||"";if(q){let Re=G.length>0&&!C&&se!==fe.toLocaleLowerCase();q.hidden=!Re,q.dataset.targetId=Re?G:"",q.textContent=Re?`\uC9C1\uC811 \uC785\uB825 \xB7 ${G}`:"",Re&&(w+=1)}let ae=M.querySelector(".mon-link__empty");ae&&(ae.hidden=w>0);let ve=M.querySelector(".mon-link__error");ve&&(ve.hidden=!0,ve.textContent="")}function ct(T){let M=T.target;M&&A.contains(M)&&typeof M.closest=="function"&&M.closest(".mon-popover-owner")||Me()}function ot(T){if(T.key!=="Escape")return;let M=A.querySelector('[aria-expanded="true"]');Me(),M?.focus()}function Y(T){let M=F;F=!1;let L=T.target;if(!L||typeof L.closest!="function"||L.closest("dialog")||L.closest("a"))return;let G=L.closest(".mon-running-sort");if(G){T.preventDefault(),_=G.getAttribute("data-sort")==="repo"?"repo":"started",Cm(_),De();return}let se=L.closest(".mon-auto-all");if(se){T.preventDefault(),V(se.getAttribute("data-on")==="true");return}if(L.closest(".mon-merge-all")){T.preventDefault(),ne();return}let C=L.closest(".mon-ctl--advance");if(C){T.preventDefault();let{root_dir:Re,revision:ze}=We(C);D("worker-automation-toggle",{on:C.getAttribute("data-on")==="true"},Re,ze);return}let q=L.closest(".mon-ctl--merge-auto");if(q){T.preventDefault();let{root_dir:Re,revision:ze}=We(q);D("worker-merge-auto-toggle",{on:q.getAttribute("data-on")==="true"},Re,ze);return}let fe=L.closest(".mon-card");if(!fe)return;let ae=L.closest("button");if(ae){T.preventDefault(),Z(fe,ae);return}let ve=fe.getAttribute("data-issue-id");ve&&!M&&(T.preventDefault(),Se(ve,fe.getAttribute("data-root-dir")||""))}function re(T){let M=T.target;if(!M||typeof M.closest!="function")return;let L=M.closest(".mon-filter__blocked");if(L){h={show_blocked:L.checked},xm(h),De();return}let G=M.closest(".mon-done-range");if(G){f=zt(G.value)?G.value:Ft,Em(f),De();return}let se=M.closest(".mon-slots__input");if(!se)return;let{root_dir:w,revision:C}=We(se),q=Number(se.value);if(!Number.isFinite(q))return;let fe=Math.max(Vn,Math.floor(q));D("worker-queue-set-slots",{slots:fe},w,C)}function me(T){let M=T.target;M?.classList.contains("mon-link__search")&&tt(M)}e.addEventListener("click",Y),e.addEventListener("change",re),e.addEventListener("input",me),e.addEventListener("dragstart",Ke),e.addEventListener("dragover",Le),e.addEventListener("dragleave",Be),e.addEventListener("drop",Te),e.addEventListener("dragend",ue),document.addEventListener("click",ct),document.addEventListener("keydown",ot),s&&typeof s.subscribe=="function"&&(te=s.subscribe(()=>{try{W.clear(),De()}catch{}}));function nt(){ee!==null&&(clearInterval(ee),ee=null)}function ge(){pe!==null&&(clearTimeout(pe),pe=null)}return{load(){r("load"),De(),ee===null&&(ee=setInterval(()=>{try{if(A.querySelector(".mon-card-popover:not([hidden])"))return;De()}catch{}},Rm))},pause(){nt()},clear(){nt(),ge(),te&&(te(),te=null),e.removeEventListener("click",Y),e.removeEventListener("change",re),e.removeEventListener("input",me),e.removeEventListener("dragstart",Ke),e.removeEventListener("dragover",Le),e.removeEventListener("dragleave",Be),e.removeEventListener("drop",Te),e.removeEventListener("dragend",ue),document.removeEventListener("click",ct),document.removeEventListener("keydown",ot),e.replaceChildren()}}}function du(e,t,r){let n=mt("views:nav"),{global_element:s,repo_element:o}=e,a=null;function c(h){return $=>{$.preventDefault(),n("click tab %s",h),r.gotoView(h)}}function u(){let h=t.getState();return h.view==="worker"||h.view==="monitor"?h.view:"board"}function d(){let h=u();return i`
      <a
        href="#/monitor"
        class="ctl-tab ctl-tab--monitor ${h==="monitor"?"is-active":""}"
        @click=${c("monitor")}
      >
        <span class="ctl-tab__dots" aria-hidden="true"
          ><i></i><i></i><i></i><i></i
        ></span>
        Monitor
      </a>
    `}function f(){let h=u();return i`
      <div class="ctl-tabs">
        <a
          href="#/board"
          class="ctl-tab ${h==="board"?"is-active":""}"
          @click=${c("board")}
          >Board</a
        >
        <a
          href="#/worker"
          class="ctl-tab ${h==="worker"?"is-active":""}"
          @click=${c("worker")}
          >Worker</a
        >
      </div>
    `}function _(){s&&Ge(d(),s),o&&Ge(f(),o)}return _(),a=t.subscribe(()=>_()),{destroy(){a&&(a(),a=null),s&&Ge(i``,s),o&&Ge(i``,o)}}}var pu=["bug","feature","task","epic","chore"];function fu(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var _u=["Critical","High","Medium","Low","Backlog"];function mu(e,t){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,e.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),a=r.querySelector("#new-priority"),c=r.querySelector("#new-labels"),u=r.querySelector("#new-description"),d=r.querySelector("#new-issue-error"),f=r.querySelector("#btn-cancel"),_=r.querySelector("#btn-create"),h=r.querySelector(".new-issue__close");function $(){o.replaceChildren();let R=document.createElement("option");R.value="",R.textContent="\u2014 Select \u2014",o.appendChild(R);for(let j of pu){let b=document.createElement("option");b.value=j,b.textContent=fu(j),o.appendChild(b)}a.replaceChildren();for(let j=0;j<=4;j+=1){let b=document.createElement("option");b.value=String(j);let E=_u[j]||"Medium";b.textContent=`${j} \u2013 ${E}`,a.appendChild(b)}}$();function A(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function O(R){s.disabled=R,o.disabled=R,a.disabled=R,c.disabled=R,u.disabled=R,f.disabled=R,_.disabled=R,_.textContent=R?"Creating\u2026":"Create"}function W(){d.textContent=""}function te(R){d.textContent=R}function ee(){try{let R=window.localStorage.getItem("beads-ui.new.type");R?o.value=R:o.value="";let j=window.localStorage.getItem("beads-ui.new.priority");j&&/^\d$/.test(j)?a.value=j:a.value="2"}catch{o.value="",a.value="2"}}function D(){let R=o.value||"",j=a.value||"";R.length>0&&window.localStorage.setItem("beads-ui.new.type",R),j.length>0&&window.localStorage.setItem("beads-ui.new.priority",j)}async function N(){W();let R=String(s.value||"").trim();if(R.length===0){te("Title is required"),s.focus();return}let j=Number(a.value||"2");if(!(j>=0&&j<=4)){te("Priority must be 0..4"),a.focus();return}let b=String(o.value||""),E=String(u.value||""),V={title:R};b.length>0&&(V.type=b),String(j).length>0&&(V.priority=j),E.length>0&&(V.description=E),O(!0);try{await t("create-issue",V)}catch{O(!1),te("Failed to create issue");return}D(),O(!1),A()}return r.addEventListener("cancel",R=>{R.preventDefault(),A()}),h.addEventListener("click",()=>A()),f.addEventListener("click",()=>A()),r.addEventListener("keydown",R=>{R.key==="Enter"&&(R.ctrlKey||R.metaKey)&&(R.preventDefault(),N())}),n.addEventListener("submit",R=>{R.preventDefault(),N()}),{open(){n.reset(),W(),ee();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){A()}}}var Om=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function Mm(e,t){return Ro(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function gu(e,t,r){return i`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?i`<div class="settings-dialog__empty">라벨 없음</div>`:i`<div class="settings-dialog__pills">
            ${t.map(n=>{let s=Mm(n,e);return i`<button
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
  `}function bu(e,t,r){return i`
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
  `}function hu(e,t){return i`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${Om.map(([r,n])=>i`<label class="settings-dialog__toggle">
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
  `}var Pm=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}],Pt="",Dm=["impl_runtime","impl_model","impl_effort"];function Dt(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function yu(e,t){let{transport:r,policyStore:n,labelOptions:s}=t,o=t.notify||(w=>ie(w,"error",4e3)),a=document.createElement("dialog");a.id="settings-dialog",a.className="settings-dialog",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","\uC124\uC815"),e.appendChild(a);let c="execution",u=!1,d="",f={},_={},h=[],$=!1,A=null,O={},W="",te="",ee=!1,D=!1,N=!1,R=null;function j(){let w=t.queueStore?.get();return Dt(w)?w.runner_catalog:null}function b(){let w=t.queueStore?.get();return Dt(w)&&Dt(w.execution_defaults)?w.execution_defaults:null}function E(){let w=t.implPresetStore?.get();return Dt(w)&&Array.isArray(w.presets)?w:null}async function V(){$=!0,me();try{let w=await r("get-session-defaults",{});f=Dt(w?.values)?{...w.values}:{},_={...f},h=Array.isArray(w?.warnings)?w.warnings:[]}catch(w){h=["kv_read_failed"],o(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${w instanceof Error?w.message:String(w)}`)}finally{$=!1,me()}}async function ne(){let w=cc(f,_);if(Object.keys(w).length!==0){try{let C=await r("set-session-defaults",{values:w});f=Dt(C?.values)?{...C.values}:{},_={...f},h=Array.isArray(C?.warnings)?C.warnings:[]}catch(C){o(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${C instanceof Error?C.message:String(C)}`)}me()}}function P(w,C){if(Dm.includes(w)){ye(w,C);return}C===Pt?delete _[w]:_[w]=C,me(),ne()}function F(){let w=z().orchestration_model,C=Tr({global:{orchestration_model:w??void 0},execution_defaults:b(),runner_catalog:j()}).orchestration_model.value;return C?Un(j(),C):null}function pe(w,C){typeof C=="string"&&C.length>0?_[w]=C:delete _[w]}function ye(w,C){let q=C===Pt?void 0:C,fe=ic({impl_runtime:w==="impl_runtime"?q:_.impl_runtime,impl_model:w==="impl_model"?q:_.impl_model,impl_effort:w==="impl_effort"?q:_.impl_effort},j(),F());pe("impl_runtime",fe.impl_runtime),pe("impl_model",fe.impl_model),pe("impl_effort",fe.impl_effort),me(),ne()}async function _e(){let w=t.queueStore?.get();if(!Dt(w))return;let C={orchestration_model:w.orchestration_model??null,orchestration_effort:w.orchestration_effort??null,orchestration_speed:w.orchestration_speed??null},q=uc(C,{...C,...O});if(Object.keys(q).length!==0){try{let fe=await r("worker-queue-set-orchestration-defaults",{expected_revision:w.revision,values:q});if(fe&&fe.applied===!1){o("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}O={}}catch(fe){o(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${fe instanceof Error?fe.message:String(fe)}`)}me()}}function je(w,C){O[w]=C===Pt?null:C,me(),_e()}function et(w){if(A=w,!w){me();return}let C=j(),q=z(),fe=q.orchestration_model;fe&&!jn(C,w).includes(fe)&&(O.orchestration_model=null,fe=null);let ae=q.orchestration_effort;ae&&!ua(C,w,fe||Ut).includes(ae)&&(O.orchestration_effort=null),me(),_e()}async function Ke(w){let C=t.queueStore?.get();if(!(!Dt(C)||w<1)){try{await r("worker-queue-set-slots",{expected_revision:C.revision,slots:w})}catch(q){o(`slots \uC800\uC7A5 \uC2E4\uD328: ${q instanceof Error?q.message:String(q)}`)}me()}}function Le(){let w={},C=z();for(let q of Hs){let fe=kr.includes(q)?C[q]:_[q];typeof fe=="string"&&fe.length>0&&(w[q]=fe)}return w}async function Be(){let w=E();if(!w)return;let C=Le();if(Object.keys(C).length===0){o("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let q=(w.presets||[]).find(ae=>ae.id===W),fe=te.trim()||(q?q.name:"");if(!fe){o("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let ae=q?await r("impl-preset-update",{expected_revision:w.revision,id:q.id,name:fe,settings:C}):await r("impl-preset-create",{expected_revision:w.revision,name:fe,settings:C});if(ae&&ae.applied){if(te="",!q&&Array.isArray(ae.presets)){let ve=ae.presets.find(Re=>Re.name===fe);W=ve?ve.id:W}me()}else o("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),me()}catch(ae){o(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${ae instanceof Error?ae.message:String(ae)}`)}}async function ue(){let w=E();if(!(!w||W.length===0))try{let C=await r("impl-preset-delete",{expected_revision:w.revision,id:W});C&&C.applied?(W="",me()):(o("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),me())}catch(C){o(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${C instanceof Error?C.message:String(C)}`)}}async function Te(){let w=E(),C=t.queueStore?.get();if(!(!w||!Dt(C)||W.length===0)){try{let q=await r("apply-impl-preset-global",{preset_id:W,expected_revision:w.revision,expected_queue_revision:C.revision});q&&q.applied?(f=Dt(q.values)?{...q.values}:{},_={...f},h=Array.isArray(q.warnings)?q.warnings:[],Dt(q.queue)&&(t.queueStore?.set?.(q.queue),O={}),q.queue_applied===!1&&o("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694")):q&&q.conflict&&o("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(q){o(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${q instanceof Error?q.message:String(q)}`)}me()}}async function Oe(){D=!0,N=!1,me();try{let w=await r("get-worker-system-prompt",{});!w||typeof w!="object"||Array.isArray(w)?N=!0:R=w}catch{N=!0}finally{D=!1,me()}}function De(){if(ee=!ee,ee&&!R){Oe();return}me()}function Se(){let w=dn({loading:D,error:N});if(w)return w;if(!R)return"";let C=Array.isArray(R.variants)?R.variants:[];return i`<div class="settings-dialog__sp-body">
      ${R.target_base_placeholder?i`<div class="prompt-block__meta">
            \`${R.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${C.map(q=>i`<div class="settings-dialog__sp-variant" data-variant=${q.key}>
            <div class="settings-dialog__sp-cond">${q.condition}</div>
            ${wr(q.label,q.system_prompt)}
          </div>`)}
    </div>`}function We(){return i`<section
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
        aria-expanded=${ee?"true":"false"}
        @click=${De}
      >
        ${ee?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${ee?Se():""}
    </section>`}function Ze(w,C,q,fe,ae,ve,Re){let ze=ae[w]??Pt,He=da(w,q,ae,b(),j(),Re),U=He.options.find(de=>de.value===ze),Q=ze===Pt?He.full_value:U?.full_value;return i`<select
        class=${ze===Pt?"settings-dialog__unset":""}
        data-key=${w}
        aria-label=${C}
        title=${Q||""}
        ?disabled=${ve===!0||He.disabled}
        .value=${Hr(String(ze))}
        @change=${de=>fe(w,String(de.target.value))}
      >
        <option value=${Pt} ?selected=${ze===Pt}>
          ${He.unset_label}
        </option>
        ${He.options.map(de=>i`<option
              value=${de.value}
              title=${de.full_value||""}
              ?selected=${de.value===ze}
            >
              ${de.label}
            </option>`)}
      </select>
      ${ze===Pt?i`<span class="settings-dialog__source-badge">기본</span>`:""}`}function $e(w,C,q,fe,ae,ve=!1,Re){return i`<div
      class=${`settings-dialog__row${ve?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${C}</span>
      <span class="settings-dialog__controls">
        ${Ze(w,C,q,fe,ae,ve,Re)}
      </span>
    </div>`}function Xe(w,C,q,fe,ae){return i`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${C}-on)`}
        ></i>
        ${w}
      </span>
      <span class="settings-dialog__controls">
        ${Ze(q,`${w} \uBAA8\uB378`,fe,P,_,!1)}
        ${Ze(ae,`${w} effort`,Ks,P,_,!1)}
      </span>
    </div>`}function Z(w){return i`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${w.rows.length>0?`\uBCC0\uACBD ${w.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${w.rows.map(C=>i`<div
            class="settings-dialog__preset-diff-row"
            data-diff-kind=${C.kind}
          >
            <span class="settings-dialog__preset-diff-label">${C.label}</span>
            <span class="settings-dialog__preset-diff-value"
              >${C.before??"\uAE30\uBCF8"}</span
            >
            <span class="settings-dialog__preset-diff-arrow">→</span>
            <span
              class="settings-dialog__preset-diff-value settings-dialog__preset-diff-after"
              >${C.after??"\uAE30\uBCF8(\uD574\uC81C)"}</span
            >
          </div>`)}
      ${w.ignored_keys.length>0?i`<div class="settings-dialog__preset-diff-note">
            ${w.ignored_keys.join(", ")}은(는) 전역 적용이 쓰지 않는 키라
            무시됩니다
          </div>`:""}
    </div>`}function z(){let w=t.queueStore?.get(),C={};for(let q of kr)C[q]=Object.prototype.hasOwnProperty.call(O,q)?O[q]:Dt(w)&&typeof w[q]=="string"?w[q]:null;return C}function oe(){let w=j(),C=_.impl_runtime,q=_.impl_model,fe=E(),ae=t.queueStore?.get(),ve=z(),Re=jn(w,A),ze=pn(w,void 0).filter(I=>I!==Ut),He=ua(w,A,ve.orchestration_model||Ut).filter(I=>I!==Ut),U=W?(fe?.presets||[]).find(I=>I.id===W):null,Q=U?lc(Le(),Dt(U.settings)?U.settings:{}):null,de=Dt(ae)&&typeof ae.slots=="number"?ae.slots:2,v=b()?.supported===!0,S=da("workflow_mode",qn,_,b(),w);return i`
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
        ${v?"":i`<div
              class="settings-dialog__banner settings-dialog__banner--projection"
              data-execution-defaults-warning
              role="alert"
            >
              실행 기본값 projection을 확인할 수 없습니다 — 기본값 확인 불가
            </div>`}
        ${$?i`<div class="settings-dialog__empty">불러오는 중…</div>`:i`
              <div class="settings-dialog__preset-bar">
                <select
                  aria-label="실행 프리셋"
                  .value=${Hr(W)}
                  @change=${I=>{W=String(I.target.value),me()}}
                >
                  <option value="" ?selected=${W===""}>
                    실행 프리셋…
                  </option>
                  ${(fe?.presets||[]).map(I=>i`<option
                        value=${I.id}
                        ?selected=${I.id===W}
                      >
                        ${I.name}
                      </option>`)}
                </select>
                <button
                  type="button"
                  class="settings-dialog__btn settings-dialog__btn--primary"
                  data-preset-apply-global
                  ?disabled=${!Q||Q.rows.length===0}
                  @click=${Te}
                >
                  적용
                </button>
                <input
                  type="text"
                  class="settings-dialog__preset-name"
                  placeholder=${W?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                  aria-label="프리셋 이름"
                  .value=${Hr(te)}
                  @input=${I=>{te=String(I.target.value)}}
                />
                <button
                  type="button"
                  class="settings-dialog__btn"
                  data-preset-save
                  title=${W?"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC774 \uD504\uB9AC\uC14B\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4 (\uD504\uB9AC\uC14B \u2192 \uC124\uC815 \uBC29\uD5A5\uC774 \uC544\uB2D8)":"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC0C8 \uD504\uB9AC\uC14B\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4"}
                  @click=${Be}
                >
                  ${W?"\uD604\uC7AC \uC124\uC815\uC73C\uB85C \uB36E\uC5B4\uC4F0\uAE30":"\uC0C8 \uD504\uB9AC\uC14B \uC800\uC7A5"}
                </button>
                <button
                  type="button"
                  class="settings-dialog__btn"
                  data-preset-delete
                  ?disabled=${W.length===0}
                  @click=${ue}
                >
                  삭제
                </button>
              </div>
              ${Q?Z(Q):""}

              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">오케스트레이션</div>
                <div class="settings-dialog__row">
                  <span class="settings-dialog__row-label">런타임</span>
                  <span class="settings-dialog__controls">
                    <select
                      aria-label="런타임"
                      data-key="orchestration_runtime_filter"
                      .value=${Hr(A||Pt)}
                      @change=${I=>{let X=String(I.target.value);et(X===Pt?null:X)}}
                    >
                      <option
                        value=${Pt}
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
                ${$e("orchestration_model","\uBAA8\uB378",Re,je,ve)}
                ${$e("orchestration_effort","effort",He,je,ve)}
                ${$e("orchestration_speed","\uC18D\uB3C4",Nn,je,ve)}
              </div>

              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">워크플로우</div>
                <div class="settings-dialog__row">
                  <span class="settings-dialog__row-label">모드</span>
                  <span class="settings-dialog__controls">
                    <span class="settings-dialog__seg" role="group">
                      <button
                        type="button"
                        data-mode=${Pt}
                        aria-pressed=${String(!_.workflow_mode)}
                        @click=${()=>P("workflow_mode",Pt)}
                      >
                        ${S.unset_label}
                      </button>
                      ${_.workflow_mode?"":i`<span class="settings-dialog__source-badge"
                            >기본</span
                          >`}
                      ${qn.map(I=>i`<button
                            type="button"
                            data-mode=${I}
                            aria-pressed=${String(_.workflow_mode===I)}
                            @click=${()=>P("workflow_mode",I)}
                          >
                            ${I}
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
                ${Xe("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",Fn,"spec_review_effort")}
                ${Xe("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",Vs,"plan_review_effort")}
                ${Xe("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",Fn,"impl_review_effort")}
              </div>

              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">
                  구현
                  <span class="settings-dialog__hint"
                    >이슈 핀이 있으면 핀이 우선합니다</span
                  >
                </div>
                ${$e("impl_runtime","\uC704\uC784 \uB300\uC0C1",Gs,P,_)}
                ${$e("impl_model","\uBAA8\uB378",pn(w,C),P,_)}
                ${$e("impl_effort","effort",fn(w,C,q),P,_)}
                ${$e("impl_speed","\uC18D\uB3C4",Nn,P,_)}
                ${$e("quick_fix_impl_model","quick_fix \uAD6C\uD604 \uBAA8\uB378",ze,P,_,!1,{..._,...ve})}
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
                        @click=${()=>Ke(de-1)}
                      >
                        −
                      </button>
                      <span class="settings-dialog__stepper-value"
                        >${de}</span
                      >
                      <button
                        type="button"
                        aria-label="slots 증가"
                        @click=${()=>Ke(de+1)}
                      >
                        +
                      </button>
                    </span>
                  </span>
                </div>
              </div>
              ${We()}
            `}
      </section>
    `}function Me(){let w=n.get();return i`
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
        ${w?i`
              ${gu(w,s(),ct)}
              ${bu(w,d,{onDraft:C=>{d=C},onAdd:ot,onRemove:Y})}
              ${hu(w,re)}
            `:i`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function Fe(w){let C=n.get();if(C)try{let q=await r("display-policy-set",{expected_revision:C.revision,policy:w(C)});Ue(q),q&&q.conflict&&q.policy&&(q=await r("display-policy-set",{expected_revision:q.policy.revision,policy:w(q.policy)}),Ue(q)),q&&q.conflict&&o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function Ue(w){w&&w.policy&&typeof w.policy=="object"&&n.set(w.policy)}function tt(w){Fe(w)}function ct(w){let C=n.get();if(!C)return;let q=!Nm(w,C);tt(fe=>qm(w,fe,q))}function ot(){let w=d.trim();w.length!==0&&(d="",tt(C=>C.hidden_prefixes.includes(w)?{hidden_prefixes:C.hidden_prefixes}:{hidden_prefixes:[...C.hidden_prefixes,w]}),me())}function Y(w){tt(C=>({hidden_prefixes:C.hidden_prefixes.filter(q=>q!==w)}))}function re(w){let C=n.get();if(!C)return;let q=C.chips[w]===!1;tt(()=>({chips:{[w]:q}}))}function me(){Ge(i`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${Pm.map(w=>i`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${w.id}
                  aria-selected=${String(c===w.id)}
                  aria-controls=${`settings-pane-${w.id}`}
                  @click=${()=>nt(w.id)}
                >
                  <span class="settings-dialog__glyph">${w.glyph}</span>
                  ${w.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${se}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${oe()} ${Me()}
          </div>
        </div>
      `,a)}function nt(w){c=w,me()}let ge=()=>{u=!1,t.onOpenChange?.(!1)};a.addEventListener("close",ge),a.addEventListener("cancel",ge);let T=w=>{w.target===a&&se()};a.addEventListener("click",T);let M=null;n.subscribe&&(M=n.subscribe(()=>{u&&me()}));let L=null;t.implPresetStore?.subscribe&&(L=t.implPresetStore.subscribe(()=>{u&&me()}));function G(w="execution"){u||(u=!0,t.onOpenChange?.(!0),c=w,d="",O={},me(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),V())}function se(){u&&(u=!1,t.onOpenChange?.(!1),typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:G,close:se,sessionDraft:()=>({..._}),destroy(){u=!1,a.removeEventListener("close",ge),a.removeEventListener("cancel",ge),a.removeEventListener("click",T),M&&(M(),M=null),L&&(L(),L=null),a.remove()}}}function Nm(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(r=>r.length>0&&e.startsWith(r))}function qm(e,t,r){if(!r)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let n=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:n,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:n}}var Fm=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],vu="usage-meter-card",wu=600,jm=["token_expired","relogin_required"];function ku(e){return String(e).padStart(2,"0")}function Bm(e,t){let r=Math.max(0,Math.ceil((e-t)/6e4)),n=Math.floor(r/1440),s=Math.floor(r%1440/60),o=r%60;return n>0?`${n}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function Um(e,t=Date.now()){let r=Date.parse(e);if(!Number.isFinite(r))return"";let n=new Date(r),s=new Date(t),o=`${ku(n.getHours())}:${ku(n.getMinutes())}`,c=n.getFullYear()===s.getFullYear()&&n.getMonth()===s.getMonth()&&n.getDate()===s.getDate()?o:`${Fm[n.getMonth()]} ${n.getDate()} ${o}`;return`${Bm(r,t)} \xB7 ${c}`}function Wm(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function $u(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function xu(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var Au=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function Eu(e){let t=[];for(let r of e){if(!r||typeof r!="object")continue;let n=r;typeof n.key!="string"||n.key.length===0||typeof n.pct!="number"||!Number.isFinite(n.pct)||t.push({key:n.key,pct:n.pct,resetsAt:typeof n.resetsAt=="string"?n.resetsAt:""})}return t}function zm(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:Eu(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function Hm(e){if(!e||typeof e!="object")return null;let t=e,r=[];if(Array.isArray(t.accounts))for(let s of t.accounts){let o=zm(s);o&&r.push(o)}let n=t.available===!0&&Array.isArray(t.windows);return!n&&r.length===0?null:{available:n,windows:n?Eu(t.windows):[],ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null,accounts:r}}function Su(e,t){return`${e}:${t}`}function Tu(e){let t=!1,r=null,n=new Map,s=null,o=new Map,a=new Map,c=0;function u(){Ge(i``,e),e.hidden=!0}function d(P){r!==P&&(r===null&&(document.addEventListener("mousedown",_),document.addEventListener("keydown",h)),r=P)}function f(){r!==null&&(r=null,document.removeEventListener("mousedown",_),document.removeEventListener("keydown",h))}function _(P){let F=P.target;F&&e.contains(F)||(f(),E())}function h(P){P.key==="Escape"&&(f(),E())}function $(P){r===P?f():d(P),E()}function A(){f(),E()}async function O(P,F){if(n.has(P.key))return;let pe=Su(P.key,F);n.set(P.key,F),a.delete(pe),E();let ye=null;try{ye=await(await fetch(P.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:F})})).json()}catch{ye=null}if(t)return;if(n.delete(P.key),!ye||ye.ok!==!0){let je=ye&&typeof ye.error=="string"&&ye.error.length>0?ye.error:"network_error";a.set(pe,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${je}`}),E();return}let _e=Array.isArray(ye.warnings)?ye.warnings.filter(je=>typeof je=="string"&&je.length>0):[];_e.length>0&&a.set(pe,{kind:"warn",text:_e.join(" \xB7 ")}),E(),await ne()}function W(P,F,pe,ye){let _e=xu(P.pct),et=`resets ${Um(P.resetsAt,ye)}${F?` \xB7 ${pe}`:""}`;return i`<span
      class="usage-meter__window ${$u(_e)}"
      style=${`--progress: ${_e}%`}
      title=${et}
    >
      <span class="usage-meter__label">${P.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${_e}%</span>
    </span>`}function te(P,F,pe){let ye=F.available&&typeof F.ageSeconds=="number"&&F.ageSeconds>wu,_e=ye&&typeof F.ageSeconds=="number"?`${Math.floor(F.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"",je=F.accounts.filter(Be=>!Be.active).length,et=`usage-meter__group${ye?" usage-meter__group--stale":""}`,Ke=i`<span class="usage-meter__provider"
        >${P.label}</span
      >
      ${F.available?F.windows.map(Be=>W(Be,ye,_e,pe)):i`<span class="usage-meter__empty">사용량 없음</span>`}
      ${je>0?i`<span class="usage-meter__badge">+${je}</span>`:""}`;if(F.accounts.length===0)return i`<span
        class=${et}
        aria-label=${`${P.label} usage`}
        >${Ke}</span
      >`;let Le=r===P.key;return i`<button
      type="button"
      class=${`usage-meter__toggle ${et}`}
      aria-label=${`${P.label} usage`}
      aria-expanded=${Le?"true":"false"}
      aria-controls=${vu}
      @click=${()=>$(P.key)}
    >
      ${Ke}
    </button>`}function ee(P,F){return i`<span class="usage-meter" aria-label="Usage">
      ${P.map(pe=>te(pe.provider,pe.snapshot,F))}
    </span>`}function D(P){let F=xu(P.pct);return i`<span
      class="usage-meter__account-window ${$u(F)}"
      style=${`--progress: ${F}%`}
    >
      <span class="usage-meter__account-key">${P.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${F}%</span>
    </span>`}function N(P,F){return jm.includes(F)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${P.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function R(P,F){let pe=F.status==="ok",ye=typeof F.ageSeconds=="number"&&F.ageSeconds>wu,_e=a.get(Su(P.key,F.number)),je=n.get(P.key),et=je!==void 0,Ke=je===F.number,Le=["usage-meter__account"];return F.active&&Le.push("usage-meter__account--active"),pe||Le.push("usage-meter__account--unavailable"),ye&&Le.push("usage-meter__account--stale"),i`<div class=${Le.join(" ")}>
      <div class="usage-meter__account-head">
        <span class="usage-meter__account-label" title=${F.email}
          >${F.alias===null?F.email:F.alias}</span
        >
        ${F.plan===null?"":i`<span class="usage-meter__account-tag">${F.plan}</span>`}
        ${F.active?i`<span
              class="usage-meter__account-tag usage-meter__account-tag--active"
              >active</span
            >`:""}
        ${F.ageSeconds===null?"":i`<span class="usage-meter__account-age"
              >${Wm(F.ageSeconds)}</span
            >`}
        ${F.active?"":i`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${et}
              @click=${()=>{O(P,F.number)}}
            >
              ${Ke?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${pe?i`<div class="usage-meter__account-windows">
            ${F.windows.map(Be=>D(Be))}
          </div>`:i`<div class="usage-meter__account-status">
            ${N(P,F.status)}
          </div>`}
      ${_e===void 0?"":i`<div
            class="usage-meter__account-message usage-meter__account-message--${_e.kind}"
          >
            ${_e.text}
          </div>`}
    </div>`}function j(P,F){let pe=F.accounts.filter(ye=>ye.active).length;return i`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${P.label} · 활성 ${pe} / 전체
        ${F.accounts.length}
      </h2>
      ${F.accounts.map(ye=>R(P,ye))}
    </section>`}function b(P){return i`<div
      class="usage-meter__card"
      id=${vu}
      role="dialog"
      aria-label=${`${P.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${j(P.provider,P.snapshot)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function E(){let P=[];for(let ye of Au){let _e=o.get(ye.key);_e&&P.push({provider:ye,snapshot:_e})}if(P.length===0){f(),u();return}let F=P.find(ye=>ye.provider.key===r&&ye.snapshot.accounts.length>0);F||f();let pe=Date.now();Ge(i`${ee(P,pe)}
      ${F?i`<div
              class="usage-meter__scrim"
              aria-hidden="true"
              @mousedown=${A}
            ></div>
            ${b(F)}`:""}`,e),e.hidden=!1}async function V(P){try{let F=await fetch(P.endpoint);return F.ok?Hm(await F.json()):null}catch{return null}}async function ne(){c+=1;let P=c,F=await Promise.all(Au.map(async pe=>({provider:pe,snapshot:await V(pe)})));if(!(t||P!==c)){for(let pe of F)pe.snapshot?o.set(pe.provider.key,pe.snapshot):o.delete(pe.provider.key);E()}}return u(),ne(),s=setInterval(()=>{ne()},6e4),{destroy(){t=!0,s!==null&&(clearInterval(s),s=null),f(),u()}}}function Cu(e){let t=e.attempts?Object.values(e.attempts):[],r=new Map;for(let s of t)s&&r.set(s.bead_id,s.attempt_id);let n=new Map;for(let s of e.done||[])s&&typeof s.bead_id=="string"&&typeof s.added_at=="number"&&n.set(s.bead_id,s.added_at);return s=>{let o=r.get(s.bead_id)!==s.attempt_id,a=n.get(s.bead_id),c=typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at;return!o&&!c&&typeof s.dismissed_at!="number"}}var Gm="worker-ineligible";function La(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Ru(e){return La(e).includes(Gm)}var Vm="worker-serial";function Oa(e){return La(e).includes(Vm)}function Ma(e,t,r){if(typeof t!="string"||typeof r!="string")return[];let n=e?.runners;if(!n||!Object.hasOwn(n,t))return[];let s=n[t],o=s?.models;if(!o||!Object.hasOwn(o,r))return[];let a=o[r]?.efforts;return Array.isArray(a)?a.slice():Array.isArray(s.efforts)?s.efforts.slice():[]}var Km=new Set(["done","failed","orphaned","stopped","discarded"]),Ym={spec_missing:"\uC2A4\uD399 \uC5C6\uC74C",route:"route \uBBF8\uB2EC",spec_review:"\uC2A4\uD399 \uB9AC\uBDF0 \uC5C6\uC74C",spec_conflict:"\uC2A4\uD399 \uCDA9\uB3CC",phase_child:"phase child",worker_ineligible:"worker \uC81C\uC678"},Zm={running:"\uC2E4\uD589 \uC911",success:"\uC131\uACF5",failure:"\uC2E4\uD328",cancelled:"\uCDE8\uC18C",interrupted:"\uC911\uB2E8"},Xm={running:"running",success:"done",failure:"failed",cancelled:"stopped",interrupted:"orphaned"};function Pa(e){return{runner:e.runner||void 0,model:e.model||void 0,effort:e.effort||void 0,status:Xm[e.outcome]||(typeof e.job_id=="string"?"running":void 0),session_id:e.session_id||void 0}}function Iu(e,t){let{queueStore:r,analysisStore:n,transport:s,getWorkspacePath:o,onOpenTranscript:a}=t,c=document.createElement("dialog");c.id="worker-parallel-analysis-dialog",c.className="pa",c.setAttribute("role","dialog"),c.setAttribute("aria-modal","true"),e.appendChild(c);let u=new Map,d=new Map,f=!1,_=null,h=null,$=null,A=new Set,O=!1,W=0,te=null,ee=new Set;function D(){return r&&r.get()||{revision:0,queue:[],serial_lanes:[],serial_lane_count:0,attempts:{},pr_wait:[]}}function N(){return n&&n.get()||{settings:{revision:0,runner:null,model:null,effort:null},job:null,runs:[],last_good:null}}function R(){return o&&o()||""}async function j(){if(!s)return;let v=++W;O=!0,$=null,A.clear(),ae();try{let S=await s("worker-parallel-analysis-targets",{root_dir:R()});if(v!==W||!ve)return;let I=Array.isArray(S?.qualified)?S.qualified:[],X=Array.isArray(S?.excluded)?S.excluded:[];$={qualified:I,excluded:X};for(let xe of I)xe&&typeof xe.id=="string"&&A.add(xe.id)}catch{v===W&&ve&&($={qualified:[],excluded:[]},ie("\uBD84\uC11D \uB300\uC0C1\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800))}finally{v===W&&(O=!1,ve&&ae())}}function b(v){return Array.isArray(v.runs)?v.runs:[]}function E(){let v=D(),S=new Set;for(let I of Object.values(v.attempts||{})){let X=I;X&&typeof X.bead_id=="string"&&!Km.has(X.status)&&S.add(X.bead_id)}for(let I of Array.isArray(v.pr_wait)?v.pr_wait:[])I&&typeof I.bead_id=="string"&&S.add(I.bead_id);for(let I of Object.values(v.discard_operations||{})){let X=I;X&&X.phase!=="done"&&typeof X.bead_id=="string"&&S.add(X.bead_id)}return S}function V(v){return v.filter(S=>ne(S)===null)}function ne(v){let S=D();for(let I of Array.isArray(S.serial_lanes)?S.serial_lanes:[])if(Array.isArray(I?.entries)&&I.entries.some(X=>X.bead_id===v))return I.id;return(Array.isArray(S.queue)?S.queue:[]).some(I=>I.bead_id===v)?"parallel":null}function P(v,S){let I=u.get(v);return I||[...S.order]}function F(v){if(v.length<2)return!1;let S=ne(v[0]);if(!S||S==="parallel")return!1;let I=D(),X=(Array.isArray(I.serial_lanes)?I.serial_lanes:[]).find(J=>J.id===S)?.entries.map(J=>J.bead_id);if(!Array.isArray(X))return!1;let xe=v.map(J=>X.indexOf(J));return xe.every(J=>J>=0)&&xe.every((J,Ee)=>Ee===0||J>xe[Ee-1])}function pe(){let v=D(),S=Array.isArray(v.serial_lanes)?v.serial_lanes:[],I=S.find(X=>Array.isArray(X.entries)&&X.entries.length===0);return I?I.id:S[0]?.id||"s1"}function ye(v){let S=D().bead_titles||{};return typeof S[v]=="string"?S[v]:v}async function _e(v,S){if(!s||f)return null;f=!0,ae();try{return await s(v,S)}finally{f=!1,ae()}}async function je(v){n?.setPending?.(!0);try{let S=await _e("worker-parallel-analysis-start",{force:v,target_ids:Array.from(A)});S&&S.applied===!1&&S.reason&&(S.reason==="target_not_qualified"&&Array.isArray(S.detail)?ie(`\uBD84\uC11D \uB300\uC0C1 \uC790\uACA9 \uBCC0\uACBD: ${S.detail.join(", ")}`,"error",3200):ie(`\uBD84\uC11D \uC2E4\uD328: ${S.reason}`,"error",2800))}finally{n?.setPending?.(!1)}}async function et(){let v=N().job;!s||!v||await s("worker-parallel-analysis-cancel",{job_id:v.job_id})}async function Ke(v){if(!(!s||ee.has(v))){ee.add(v),ae();try{let S=await s("worker-parallel-analysis-prompt",{root_dir:R(),run_id:v});if(!ve)return;if(S?.ok===!0&&typeof S.prompt=="string"){te={run_id:v,prompt:S.prompt};return}ie(S?.reason==="not_found"?"\uC800\uC7A5\uB41C \uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800)}finally{ee.delete(v),ae()}}}function Le(){te=null,ae()}async function Be(){if(!te)return;let v=await Qt(te.prompt);ie(v?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",v?"success":"error",1400)}function ue(v,S){a&&a(v,Pa(S))}function Te(){return D().runner_catalog}function Oe(v){return Object.keys(Te()?.runners?.[v]?.models||{})}function De(v){let S=Oe(v),I=Te()?.runners?.[v]?.default_model;return typeof I=="string"&&S.includes(I)?I:S[0]||""}function Se(){let v=N().settings,S=_||v.runner||"claude",I=Oe(S),X=_?De(S):v.model||I[0]||"",xe=Ma(Te(),S,X),J=v.effort||"",Ee=xe.includes(J)?J:xe[0]||"";return{runner:S,model:X,effort:Ee,models:I,efforts:xe}}async function We(v){let S=N().settings,I=await _e("worker-parallel-analysis-settings-update",{expected_revision:S.revision,runner:v.runner,model:v.model,effort:v.effort});(!I||I.applied!==!0)&&(_=null,ae(),I&&I.reason&&ie(`\uBD84\uC11D \uC124\uC815 \uAC70\uBD80: ${I.reason}`,"error",2800))}function Ze(v){_=v,ae();let S=Se();We({runner:v,model:S.model,effort:S.effort})}function $e(v){let S=Se(),I=Ma(Te(),S.runner,v);We({runner:S.runner,model:v,effort:I.includes(S.effort)?S.effort:I[0]||""})}function Xe(v){let S=Se();We({runner:S.runner,model:S.model,effort:v})}async function Z(v,S){if(!s||f)return;let I=P(v,S),X=N();if(I.length<2||!X.last_good){ie("\uC81C\uCD9C\uD558\uB824\uBA74 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4","warning");return}let xe=d.get(v)||pe(),J=()=>({snapshot_digest:X.last_good.identity_digest,group_index:v,lane:xe,ordered_bead_ids:I,expected_revision:D().revision});f=!0,ae();try{let Ee=await s("worker-parallel-analysis-submit",J());Ee&&Ee.queue&&r&&r.set(Ee.queue),Ee&&Ee.applied!==!0&&Ee.conflict===!0&&(Ee=await s("worker-parallel-analysis-submit",J()),Ee&&Ee.queue&&r&&r.set(Ee.queue)),Ee&&Ee.applied===!0?(u.delete(v),ie(`\uC9C1\uB82C \uB808\uC778 ${xe}\uC5D0 ${I.length}\uAC1C \uBC30\uCE58`,"success")):ie(`\uC81C\uCD9C \uAC70\uBD80: ${Ee?.reason||"conflict"} (\uD050 \uBB34\uBCC0\uACBD)`,"error",2800)}finally{f=!1,ae()}}function z(v,S,I){u.set(v,P(v,S).filter(X=>X!==I)),ae()}function oe(v){u.delete(v),ae()}function Me(v,S,I,X){let xe=[...P(v,S)],J=xe.indexOf(I),Ee=J+X;J<0||Ee<0||Ee>=xe.length||(xe.splice(Ee,0,...xe.splice(J,1)),u.set(v,xe),ae())}function Fe(){let v=N().settings,S=Object.keys(Te()?.runners||{}),I=Se();return i`<div class="pa-settings">
      <label class="pa-settings__field"
        >러너
        <select
          class="pa-settings__runner"
          aria-label="분석 러너"
          @change=${X=>Ze(X.target.value)}
        >
          ${S.map(X=>i`<option
                value=${X}
                ?selected=${I.runner===X}
              >
                ${X}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >분석 모델
        <select
          class="pa-settings__model"
          aria-label="분석 모델"
          @change=${X=>$e(X.target.value)}
        >
          ${I.models.map(X=>i`<option
                value=${X}
                ?selected=${I.model===X}
              >
                ${X}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >effort
        <select
          class="pa-settings__effort-select"
          aria-label="분석 effort"
          @change=${X=>Xe(X.target.value)}
        >
          ${I.efforts.map(X=>i`<option
                value=${X}
                ?selected=${I.effort===X}
              >
                ${X}
              </option>`)}
        </select>
      </label>
      ${Ue(v)}
    </div>`}function Ue(v){return!ct(v)||tt(v)?i`<span class="pa-settings__unset">분석 모델 설정 필요</span>`:v.compatible===!1?i`<span class="pa-settings__incompatible"
        >설정 비호환 — 저장된 ${v.runner}/${v.model} · effort
        ${v.effort} 을(를) 카탈로그가 더는 제공하지 않습니다</span
      >`:v.is_default===!0?i`<span class="pa-settings__default">기본값</span>`:""}function tt(v){return v.is_default===!0&&v.compatible===!1}function ct(v){return!!(v.runner&&v.model&&v.effort)}function ot(v){return ct(v)&&v.compatible!==!1}function Y(v){let S=Math.max(0,Math.floor(v/1e3)),I=Math.floor(S/60),X=S%60;return`${I}:${String(X).padStart(2,"0")}`}function re(v){let S=v.job;if(S){let I=typeof S.started_at=="number"?S.started_at:0,X=`${S.runner||"?"}/${S.model||"?"}`,xe=I?` \xB7 \uACBD\uACFC ${Y(Date.now()-I)}`:"",J=typeof S.session_id=="string"?S.session_id:"",Ee=b(v).find(Ie=>Ie.run_id===S.job_id);return i`<span class="pa-meta__progress">
        <span
          >분석 중 — ${X} · effort ${S.effort||"?"}${xe}</span
        >
        ${J?i`<code class="pa-session-id" title=${J}
              >${J.slice(0,8)}</code
            >`:""}
        <button
          type="button"
          class="pa-monitor"
          @click=${()=>ue(S.job_id,Ee||S)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-prompt-open"
          ?disabled=${Ee?.prompt_saved!==!0||ee.has(S.job_id)}
          @click=${()=>{Ke(S.job_id)}}
        >
          프롬프트
        </button>
      </span>`}return me()?i`<span class="pa-meta__progress"
          >준비 중 — 대상과 아티팩트 수집 중</span
        >`:""}function me(){return n?.isPending?.()===!0}function nt(v){let S=!!v.job,I=ot(v.settings),X=$!==null&&A.size===0,xe=S||f||me()||O;return i`<div class="pa-meta">
      ${v.last_good?i`<span class="pa-meta__at"
            >분석 ${new Date(v.last_good.at||0).toLocaleString()}</span
          >`:i`<span class="pa-meta__at">분석 결과 없음</span>`}
      ${re(v)}
      <button
        type="button"
        class="pa-run"
        ?disabled=${!I||xe||X}
        @click=${()=>{je(!1)}}
      >
        ✳ 분석
      </button>
      <button
        type="button"
        class="pa-rerun"
        ?disabled=${!I||xe||X}
        @click=${()=>{je(!0)}}
      >
        재분석
      </button>
      <button
        type="button"
        class="pa-cancel"
        ?disabled=${!S}
        @click=${()=>{et()}}
      >
        취소
      </button>
    </div>`}function ge(v){return typeof v=="string"&&v.length>0?v:"\uBBF8\uBC30\uCE58"}function T(v,S){S?A.add(v):A.delete(v),ae()}function M(v){let S=Array.isArray(v.scope)?v.scope:[],I=Array.isArray(v.overlaps)?v.overlaps:[];return S.length===0&&I.length===0?i``:i`<span class="pa-target__signals">
      ${S.length>0?i`<details class="pa-target__scope" title=${S.join(`
`)}>
            <summary>scope ${S.length}</summary>
            <ul>
              ${S.map(X=>i`<li><code>${X}</code></li>`)}
            </ul>
          </details>`:""}
      ${I.length>0?i`<span
            class="pa-target__overlaps"
            title=${`\uACB9\uCE68: ${I.join(", ")}`}
            >겹침 ${I.join(", ")}</span
          >`:""}
    </span>`}function L(){let v=$?.qualified||[],S=$?.excluded||[];return i`<section class="pa-targets">
      <header class="pa-targets__header">
        <strong>분석 대상</strong>
        <span class="pa-targets__summary"
          >${O?"\uC870\uD68C \uC911\u2026":`\uC790\uACA9 ${v.length} \xB7 \uC81C\uC678 ${S.length}`}</span
        >
      </header>
      ${$&&v.length>0?i`<ul class="pa-targets__list">
            ${v.map(I=>i`<li class="pa-target">
                  <label class="pa-target__label">
                    <input
                      type="checkbox"
                      class="pa-target__check"
                      data-target-id=${I.id}
                      .checked=${A.has(I.id)}
                      @change=${X=>T(I.id,X.target.checked)}
                    />
                    <span class="pa-target__title">${I.title}</span>
                  </label>
                  <span class="pa-target__meta">
                    ${M(I)}
                    <span class="pa-target__route">${I.route}</span>
                    <span class="pa-target__lane"
                      >${ge(I.lane)}</span
                    >
                  </span>
                </li>`)}
          </ul>`:$&&v.length===0?i`<p class="pa-empty">자격 있는 분석 대상이 없습니다</p>`:""}
      ${$&&S.length>0?i`<details class="pa-targets__excluded">
            <summary>제외 대상 ${S.length}</summary>
            <ul class="pa-targets__list">
              ${S.map(I=>i`<li class="pa-target pa-target--excluded">
                    <label class="pa-target__label">
                      <input type="checkbox" disabled />
                      <span class="pa-target__title">${I.title}</span>
                    </label>
                    <span class="pa-target__meta">
                      <span class="pa-target__reason"
                        >${Ym[I.reason]||I.reason}</span
                      >
                      <span class="pa-target__lane"
                        >${ge(I.lane)}</span
                      >
                    </span>
                  </li>`)}
            </ul>
          </details>`:""}
    </section>`}function G(v){let S=typeof v.session_id=="string"&&v.session_id.length>0,I=S?v.session_id:"";return i`<li class="pa-run-row">
      <span class="pa-run-row__status pa-run-row__status--${v.outcome}"
        >${Zm[v.outcome]||v.outcome}</span
      >
      <time class="pa-run-row__time"
        >${new Date(v.started_at||0).toLocaleString()}</time
      >
      <span class="pa-run-row__identity"
        >${v.runner||"?"} / ${v.model||"?"} / ${v.effort||"?"}</span
      >
      ${S?i`<code class="pa-session-id" title=${I}
            >${I.slice(0,8)}</code
          >`:i`<span class="pa-run-row__no-session">세션 없음</span>`}
      ${v.outcome==="failure"&&v.reason?i`<span class="pa-run-row__reason">${v.reason}</span>`:""}
      <span class="pa-run-row__actions">
        <button
          type="button"
          class="pa-run-row__monitor"
          @click=${()=>ue(v.run_id,v)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-run-row__prompt"
          ?disabled=${v.prompt_saved!==!0||ee.has(v.run_id)}
          @click=${()=>{Ke(v.run_id)}}
        >
          프롬프트
        </button>
      </span>
    </li>`}function se(v){return i`<section class="pa-runs">
      <header class="pa-runs__header"><strong>최근 실행</strong></header>
      ${v.length>0?i`<ul class="pa-runs__list">
            ${v.map(S=>G(S))}
          </ul>`:i`<p class="pa-empty">실행 이력 없음</p>`}
    </section>`}function w(){return te?i`<div
      class="pa-prompt-popup"
      role="dialog"
      aria-modal="true"
      aria-label="분석 프롬프트"
    >
      <div class="pa-prompt-popup__backdrop" @click=${Le}></div>
      <section class="pa-prompt-popup__panel">
        <header class="pa-prompt-popup__header">
          <div class="pa-prompt-popup__identity">
            <strong>분석 프롬프트</strong>
            <code>${te.run_id}</code>
          </div>
          <div class="pa-prompt-popup__actions">
            <button type="button" @click=${()=>{Be()}}>
              복사
            </button>
            <button
              type="button"
              class="pa-prompt-popup__close"
              aria-label="분석 프롬프트 팝업 닫기"
              @click=${Le}
            >
              ✕
            </button>
          </div>
        </header>
        <pre class="pa-prompt-popup__content" tabindex="0">
${te.prompt}</pre
        >
      </section>
    </div>`:""}function C(v,S){let I=P(v,S),X=E(),xe=I.filter(Qe=>X.has(Qe)),J=V(I),Ee=F(I),Ie=Array.isArray(D().serial_lanes)?D().serial_lanes:[],ht=d.get(v)||pe(),yt=S.eligible!==!0||I.length<2||xe.length>0||J.length>0||Ee||f;return i`<section class="pa-group" data-group-index=${String(v)}>
      <header class="pa-group__head">
        <span class="pa-group__confidence">${S.confidence}</span>
        ${S.categories.map(Qe=>i`<span class="pa-group__category">${Qe}</span>`)}
        ${Ee?i`<span class="pa-group__applied">✓ 이미 반영됨</span>`:""}
        ${S.eligible===!0?"":i`<span class="pa-group__weak">근거 부족 — 제출 불가</span>`}
        ${J.length>0?i`<span class="pa-group__stale"
              >stale — ${J.join(", ")} 대기 영역 이탈</span
            >`:""}
      </header>
      <p class="pa-group__reason">${S.reason}</p>
      <ol class="pa-group__members">
        ${I.map((Qe,Et)=>i`<li class="pa-member" data-bead-id=${Qe}>
              <span class="pa-member__seq">${Et+1}</span>
              <span class="pa-member__title">${ye(Qe)}</span>
              ${X.has(Qe)?i`<span class="pa-member__active">실행 중</span>`:""}
              <button
                type="button"
                class="pa-member__up"
                data-bead-id=${Qe}
                ?disabled=${Et===0}
                aria-label=${`${Qe} \uC704\uB85C`}
                @click=${()=>Me(v,S,Qe,-1)}
              >
                ↑
              </button>
              <button
                type="button"
                class="pa-member__down"
                data-bead-id=${Qe}
                ?disabled=${Et===I.length-1}
                aria-label=${`${Qe} \uC544\uB798\uB85C`}
                @click=${()=>Me(v,S,Qe,1)}
              >
                ↓
              </button>
              <button
                type="button"
                class="pa-member__exclude"
                data-bead-id=${Qe}
                aria-label=${`${Qe} \uC81C\uC678`}
                @click=${()=>z(v,S,Qe)}
              >
                ✕
              </button>
            </li>`)}
      </ol>
      <ul class="pa-group__evidence">
        ${S.evidence.map(Qe=>i`<li class="pa-evidence">
              <code>${Qe.path}</code>
              <span class="pa-evidence__locator">${Qe.locator}</span>
            </li>`)}
      </ul>
      <footer class="pa-group__foot">
        <button
          type="button"
          class="pa-group__restore"
          @click=${()=>oe(v)}
        >
          제안으로 되돌리기
        </button>
        <label class="pa-group__lane-field"
          >제출
          <select
            class="pa-group__lane"
            aria-label="제출 대상 레인"
            @change=${Qe=>{d.set(v,Qe.target.value),ae()}}
          >
            ${Ie.map((Qe,Et)=>i`<option
                  value=${Qe.id}
                  ?selected=${ht===Qe.id}
                >
                  직렬 ${Et+1}
                </option>`)}
          </select>
        </label>
        <button
          type="button"
          class="pa-group__submit"
          ?disabled=${yt}
          @click=${()=>{Z(v,S)}}
        >
          제출
        </button>
      </footer>
    </section>`}function q(v){let S=Array.isArray(v.issues)?v.issues:[],I=S.filter(xe=>xe.verdict==="parallel_ok").length,X=S.filter(xe=>xe.verdict==="uncertain").length;return i`<div class="pa-summary">
      <span>parallel_ok ${I}</span>
      <span>uncertain ${X}</span>
    </div>`}function fe(){let v=ve&&!!N().job;if(v&&h===null){h=setInterval(()=>ae(),1e3);return}!v&&h!==null&&(clearInterval(h),h=null)}function ae(){let v=N();_&&v.settings.runner===_&&(_=null);let S=v.last_good?.result;fe(),Ge(i`
        <div class="pa__container">
          <header class="pa__header">
            <div class="pa__title">병렬성 분석</div>
            <button
              type="button"
              class="pa__close"
              aria-label="닫기"
              @click=${de}
            >
              ×
            </button>
          </header>
          <div class="pa__body">
            ${Fe()} ${nt(v)} ${L()}
            ${S?i`${S.groups.map((I,X)=>C(X,I))}
                ${S.groups.length===0?i`<p class="pa-empty">직렬 권장 그룹 없음</p>`:""}
                ${q(S)}`:i`<p class="pa-empty">
                  아직 분석 결과가 없습니다 — [✳ 분석]을 눌러 시작하세요
                </p>`}
            ${se(b(v))}
          </div>
        </div>
        ${w()}
      `,c)}let ve=!1,Re=()=>{ve=!1,te=null,W+=1,fe()},ze=v=>{v.target===v.currentTarget&&de()};c.addEventListener("close",Re),c.addEventListener("cancel",Re),c.addEventListener("click",ze);let He=null;r&&r.subscribe&&(He=r.subscribe(()=>{ve&&ae()}));let U=null;n&&n.subscribe&&(U=n.subscribe(()=>{ve&&ae()}));function Q(){ve||(ve=!0,ae(),j(),typeof c.showModal=="function"?c.showModal():c.setAttribute("open",""))}function de(){ve&&(ve=!1,te=null,W+=1,fe(),typeof c.close=="function"?c.close():c.removeAttribute("open"))}return{open:Q,close:de,destroy(){ve=!1,h!==null&&(clearInterval(h),h=null),c.removeEventListener("close",Re),c.removeEventListener("cancel",Re),c.removeEventListener("click",ze),He&&(He(),He=null),U&&(U(),U=null),c.remove()}}}var Lu=new Set(["sh","bash","zsh","dash","ksh"]),Ou=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function Mu(e){let t=e.split("/");return t[t.length-1]||""}function Qm(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let r=t.slice(2).trim().split(/\s+/).filter(Boolean);if(r.length===0)return!1;let n=Mu(r[0]);if(n!=="env")return Lu.has(n);let s=r.slice(1).find(o=>!o.startsWith("-")&&!o.includes("="));return s!==void 0&&Lu.has(Mu(s))}function Jm(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function eg(e){let t=[],r=0;Ou.lastIndex=0;for(let n of e.matchAll(Ou)){let s=n.index;s>r&&t.push({text:e.slice(r,s),kind:"plain"}),t.push({text:n[0],kind:Jm(n[0])}),r=s+n[0].length}return r<e.length&&t.push({text:e.slice(r),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function tg(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function Pu(e){let t=e.getWorkspacePath,r=e.fetchImpl||globalThis.fetch?.bind(globalThis),n=document.createElement("div");n.className="repo-ops-script-viewer-root",document.body.appendChild(n);let s=null,o="loading",a="",c="",u=0,d=null,f=!1;function _(R,j){return j?eg(R).map(b=>b.kind==="plain"?b.text:i`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${b.kind}"
            >${b.text}</span
          >`):R}function h(){if(!s)return i``;let R=o==="ready"&&Qm(a),j=o==="ready"?a.split(`
`):[];return i`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${s.path}`}
    >
      <div
        class="repo-ops-script-viewer__backdrop"
        @click=${()=>D()}
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
              @click=${()=>D()}
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
                  ${j.map((b,E)=>i`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${E+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${_(b,R)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function $(){Ge(h(),n)}async function A(){if(o!=="ready")return;let R=await Qt(a);ie(R?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",R?"success":"error")}function O(R){R.key==="Escape"&&s&&(R.preventDefault(),D())}function W(){f||(document.addEventListener("keydown",O),f=!0)}function te(){f&&(document.removeEventListener("keydown",O),f=!1)}async function ee(R,j=null){let b=++u;W(),s={...R},d=j||(document.activeElement instanceof HTMLElement?document.activeElement:null),o="loading",a="",c="",$(),n.querySelector(".repo-ops-script-viewer__close")?.focus();let V=t?t():"";if(!V){o="error",c="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",$();return}if(!r){o="error",c="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",$();return}let ne="/api/repo-ops-script?workspace="+encodeURIComponent(V)+"&lane="+encodeURIComponent(R.lane)+"&base_sha="+encodeURIComponent(R.base_sha);try{let P=await r(ne),F=await P.json().catch(()=>({}));if(b!==u)return;if((t?t():"")!==V){D();return}if(!P.ok||!F||F.ok!==!0){o="error",c=tg(F&&typeof F.error=="string"?F.error:""),$();return}s={lane:F.lane,base_sha:F.base_sha,path:F.path,base_ref:F.base_ref},a=String(F.content),o="ready",$()}catch{if(b!==u)return;o="error",c="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",$()}}function D(){u+=1,te(),s=null,a="",$();let R=d;d=null,R?.isConnected&&R.focus()}function N(){D(),n.remove()}return{open:ee,close:D,destroy:N}}function Du(e){let t=e.queueStore,r=e.transport,n=e.onChanged||(()=>{}),s=e.onOpenScript;function o(){return t&&t.get()||{}}function a(){let b=o();return typeof b.revision=="number"?b.revision:0}function c(b){t&&b&&b.queue&&typeof b.queue=="object"&&t.set(b.queue)}function u(){let b=o().workspace_info;return b&&typeof b=="object"?b:{}}function d(b,E){return i`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${b}"
      >${E}</span
    >`}function f(b){if(typeof b!="number"||!Number.isFinite(b))return"";let E=b/6e4;return Number.isInteger(E)?`timeout ${E}\uBD84`:`timeout ${Math.round(b/1e3)}\uCD08`}function _(b){let E=f(b);return E?d("config",E):""}function h(b,E,V){return i`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${V.script}
      @click=${ne=>{s&&s({lane:b,base_sha:E.base_sha,path:V.script,base_ref:E.base_ref},ne.currentTarget)}}
    ></button>`}function $(){let b=o().repo_ops_opt_out;return{verify:b?.verify===!0,deploy:b?.deploy===!0}}function A(b,E){return i`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!E}
        @change=${V=>{ee(b,!V.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function O(b){let E=typeof b.base_sha=="string"?b.base_sha:"",V=`${b.source_path||"repo-ops/config.toml"} @ ${b.base_ref||"?"}${E?`@${E.slice(0,7)}`:""}`,ne=$(),P=!!b.verify&&ne.verify,F=!!b.deploy&&ne.deploy;return i`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${V}</span>
      </p>
      <div
        class="worker-repo-ops__lane${P?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${b.verify?i`${h("verify",b,b.verify)}
              ${_(b.verify.timeout_ms)}
              ${P?d("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:i`선언 없음${d("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${P?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":b.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${b.verify?A("verify",ne.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${F?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${b.deploy?i`${h("deploy",b,b.deploy)}
              ${_(b.deploy.timeout_ms)}
              ${F?d("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:i`선언 없음${d("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${F?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":b.deploy?i`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${b.deploy?A("deploy",ne.deploy):""}
      </div>
    </section>`}function W(b){let E=b.repo_ops&&typeof b.repo_ops=="object"?b.repo_ops:null;return E&&(E.status==="resolved"||E.status==="absent")?O(E):E&&(E.status==="pending"||E.status==="error")?i`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${E.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":i`선언 읽기
              실패${E.error_code?i` — <code>${E.error_code}</code>`:""}`}
        </div>
      </section>`:i`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function te(b){if(!r)return;let E=await r("worker-auto-repair-toggle",{on:b,expected_revision:a()});if(c(E),E&&E.conflict){let V=await r("worker-auto-repair-toggle",{on:b,expected_revision:a()});c(V)}n()}async function ee(b,E){if(!r)return;let V=await r("worker-repo-ops-opt-out-toggle",{kind:b,opted_out:E,expected_revision:a()});if(c(V),V&&V.conflict){let ne=await r("worker-repo-ops-opt-out-toggle",{kind:b,opted_out:E,expected_revision:a()});c(ne)}n()}let D={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function N(b,E,V){return i`<div class="worker-repo-ops__policy-group" data-policy=${V}>
      <div class="worker-repo-ops__policy-label">${b}</div>
      <ul class="worker-repo-ops__policy-list">
        ${E.map(ne=>i`<li data-token=${ne}>
              ${D[ne]||ne}
            </li>`)}
      </ul>
    </div>`}function R(b){return i`<div
      class="worker-repo-ops__policy-group"
      data-policy="resolution-ladder"
    >
      <div class="worker-repo-ops__policy-label">해결 사다리</div>
      <ol class="worker-repo-ops__policy-list">
        ${b.map(E=>{let V=[D[E.trigger]||E.trigger];return Number.isInteger(E.attempts_per_operation_attempt)?V.push(`operation\uB2F9 ${E.attempts_per_operation_attempt}\uD68C`):Number.isInteger(E.attempts)?V.push(`${D[E.budget]||E.budget} ${E.attempts}\uD68C`):Number.isInteger(E.sessions_per_user_action)&&V.push(`${E.sessions_per_user_action}\uD68C`,D[E.user_actions]||E.user_actions),E.applies_when&&V.push(D[E.applies_when]||E.applies_when),i`<li data-token=${E.id}>
            <strong>${D[E.id]||E.id}</strong>
            <span>${V.filter(Boolean).join(" \xB7 ")}</span>
          </li>`})}
      </ol>
    </div>`}function j(){let b=o(),E=b.auto_repair!==!1,V=b.repo_operation_policy&&typeof b.repo_operation_policy=="object"?b.repo_operation_policy:null,ne=Array.isArray(b.repo_operations)?b.repo_operations:[],P=ne.find(_e=>_e.state==="repairing"),F=ne.filter(_e=>_e.state==="failed"||_e.state==="repairing"),pe=F.length?Math.min(...F.map(_e=>typeof _e.repair?.remaining=="number"?_e.repair.remaining:0)):V?.auto_repair?.resolution_ladder?.find(_e=>_e.id==="auto_repair_session")?.attempts??1,ye=Array.isArray(V?.auto_repair?.resolution_ladder)?V.auto_repair.resolution_ladder:[];return i`<section
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
          .checked=${E}
          @change=${_e=>{te(_e.target.checked)}}
        />
        검증·배포 실패를 자동으로 해결 시도
      </label>
      <div class="worker-repo-ops__repair-state">
        <span
          class="worker-repo-ops__repair-value"
          data-seam="auto-repair-value"
          >${E?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}</span
        >
        <span
          class="worker-repo-ops__repair-budget"
          data-seam="auto-repair-budget"
          >남은 자동 해결 ${pe}회</span
        >
        <span
          class="worker-repo-ops__repair-session"
          data-seam="auto-repair-session"
          >${P?`\uD574\uACB0 \uC138\uC158 \uC2E4\uD589 \uC911 \xB7 ${P.repair?.owner_bead||P.operation_id}`:"\uC2E4\uD589 \uC911\uC778 \uD574\uACB0 \uC138\uC158 \uC5C6\uC74C"}</span
        >
      </div>
      ${V?i`<details
            class="worker-repo-ops__policy"
            data-seam="policy-lists"
          >
            <summary>
              Worker 자동 처리 기준
              <span class="worker-repo-ops__policy-count"
                >자동 ${(V.worker_automatic||[]).length} · 해결 사다리
                ${ye.length} · 금지
                ${(V.never_automatic||[]).length}</span
              >
            </summary>
            ${N("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",V.worker_automatic||[],"worker-automatic")}
            ${V.supported===!1||V.schema_version!==2?i`<div
                  class="worker-repo-ops__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uD574\uACB0\uC774 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${V.schema_version})`}
                </div>`:R(ye)}
            ${N("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",V.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}return{template(){return i`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언 · 자동 해결
        </summary>
        ${W(u())} ${j()}
      </details>`}}}var ju=20,rg=5,ng=new Set(["failed","repairing","running","queued","retry_pending"]),Nu={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"},qu={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8"};function sg(e,t,r=ju){let n=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||n.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||n.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return n.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),n.slice(0,Math.max(0,r))}function og(e){if(e.type==="cleanup")return!0;let t=e.operation;return ng.has(t.state)&&!t.dismissed&&!t.superseded_by}function ag(e,t,r={}){let n=sg(e,t,1/0),s=r.expanded===!0?ju:rg,o=new Set(n.slice(0,s)),a=n.filter(c=>o.has(c)||og(c));return{visible:a,hidden:n.length-a.length}}function Fu(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function ig(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"repairing":return"\uC790\uB3D9 \uD574\uACB0 \uC911";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function Bu(e){let t=e.filter(r=>r.value);return t.length===0?"":i`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(r=>i`<div>
            <dt>${r.term}</dt>
            <dd>${r.value}</dd>
          </div>`)}
    </dl>
  </details>`}function Uu(e,t="",r=!1){return!e&&!t?"":i`<p
    class="worker-ev__explain${r?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?i`<br />${t}`:""}
  </p>`}function lg(e){if(e.state!=="failed"||e.superseded_by)return"";let t=e.repair||{},r=typeof t.remaining=="number"?t.remaining:0,n=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"",s=r<=0;return i`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
      data-operation-id=${e.operation_id}
      data-failure-kind=${e.failure_kind||""}
      title="해결 세션을 엽니다"
    >
      ${Object.hasOwn(qu,n)?qu[n]:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC2DC\uC791"}
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
  </div>`}function cg(e){let t=e.operation,r=t.state==="failed",n=t.failure?t.failure.code:"";return i`<li
    class="worker-ev"
    data-operation-id=${t.operation_id}
    data-state=${t.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?$t(e.at):""}
      >${Js(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${Fu(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(Nu,t.kind)?Nu[t.kind]:t.kind}</span
        >
        <span class="worker-ev__meta"
          >${t.target_base}@${Xs(t.target_sha)}${typeof t.elapsed_ms=="number"?` \xB7 ${Qs(t.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${Fu(e)}"
          >${ig(e)}</span
        >
        ${t.dismissed?i`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${t.superseded_by?i`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
      </div>
      ${r?Uu(Uc(t.failure_kind,n)):""}
      ${lg(t)}
      ${Bu([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?n:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${Xs(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function ug(e){let t=e.cleanup,r=Gr(t.step);return i`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?$t(e.at):""}
      >${Js(e.at)||"\u2014"}</span
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
        ${Nc(t.step).map(n=>i`<li
              class="worker-step worker-step--${n.state}"
              data-step=${n.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${n.label}</span>
            </li>`)}
      </ol>
      ${Uu(so(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
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
      ${Bu([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function dg(e){let t=typeof e.hidden=="number"?e.hidden:0,r=e.expanded===!0;return i`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(n=>n.type==="cleanup"?ug(n):cg(n))}
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
  </section>`}function Wu(e,t={}){let r=null;function n(){if(r===null){Ge(i``,e);return}let a=ag(r.operations,r.cleanup_failures,{expanded:r.expanded});Ge(dg({events:a.visible,hidden:a.hidden,expanded:r.expanded,repo:r.repo}),e)}e.addEventListener("click",a=>{let c=a.target;if(c?.closest?.('[data-seam="repo-ops-close"]')){o();return}c?.closest?.('[data-seam="repo-ops-more"]')&&r&&(r.expanded=!r.expanded,n())});function s(a){r={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:!1},n()}function o(){r!==null&&(r=null,n(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>r!==null,refresh(a){r&&(r={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:r.expanded},n())}}}var pg="tab:worker:ready",fg="tab:worker:blocked",_g="tab:worker:in-progress",mg="tab:worker:closed",io=1,zu=5;function Hu(e){return Us(e).path.length>0}var Yu="beads-ui.worker.candidate-filter",Da={show_blocked:!1,spec:"all"};function gg(){try{let e=window.localStorage.getItem(Yu);if(!e)return{...Da};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Da};let r=t.spec;return{show_blocked:t.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...Da}}}function bg(e){try{window.localStorage.setItem(Yu,JSON.stringify(e))}catch{}}function hg(e,t){let r=c=>t.show_blocked||!c.blocked,n=c=>t.spec==="all"||(t.spec==="with"?c.has_spec:!c.has_spec),s=[],o=0,a=0;for(let c of e){let u=r(c),d=n(c);u&&d?s.push(c):!u&&d?o+=1:u&&!d&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var yg=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Zu="bdui.worker.candidate_sort",vg=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],lo="spec";function wg(){try{let e=window.localStorage.getItem(Zu);return e==="board"||e==="created"||e==="spec"?e:lo}catch{return lo}}function kg(e){try{window.localStorage.setItem(Zu,e)}catch{}}var Xu="bdui.worker.done-range";function $g(){try{let e=window.localStorage.getItem(Xu);return zt(e)?e:Ft}catch{return Ft}}function xg(e){try{window.localStorage.setItem(Xu,e)}catch{}}var Ag="(max-width: 640px)",Qu="beads-ui.worker.lane-collapsed",Zn={queue:!0,done:!0};function Sg(){try{let e=window.localStorage.getItem(Qu);if(!e)return{...Zn};let t=JSON.parse(e);return!t||typeof t!="object"?{...Zn}:{queue:typeof t.queue=="boolean"?t.queue:Zn.queue,done:typeof t.done=="boolean"?t.done:Zn.done}}catch{return{...Zn}}}function Eg(e){try{window.localStorage.setItem(Qu,JSON.stringify(e))}catch{}}function Gu(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let r=typeof t.title=="string"?t.title:t.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function Tg(e,t,r){let n=Array.isArray(e)?e.slice():[];return t==="created"?n.sort(jr):(n.sort(ms(r)),t==="board"?n:[...n.filter(Hu),...n.filter(s=>!Hu(s))])}function Cg(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function Rg(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Ig(e){let t=e?.blocked_info;if(t&&typeof t=="object"){let s=Array.isArray(t.blockers)?t.blockers.filter(o=>typeof o=="string"&&o.length>0):[];return s.length>0?`\u{1F512} ${s.join(", ")}`:"\u{1F512} blocked"}let n=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(s=>{if(typeof s=="string")return s;if(!s||typeof s!="object")return"";let o=s.type??s.dependency_type;return o!==void 0&&o!=="blocks"?"":s.depends_on_id||s.id||""}).filter(Boolean);return n.length>0?`\u{1F512} ${n.join(", ")}`:"\u{1F512} blocked"}function Vu(e){switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function Lg(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function Og(e,t=null){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let r=e.slice(19);if(r.length===0)return null;switch(r){case"gating":{let n=t?.repair_sessions_used;return typeof n=="number"&&n>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911"}case"repairing":return"\uC790\uB3D9 \uC218\uC815 \uC911";case"waiting_repair_pr":return"\uC218\uC815 PR \uB300\uAE30 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function Mg(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function Pg(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"implementation review \uB300\uAE30",live:!1,alert:!1};case"reviewing":return{badge:"implementation review \uC911",live:!0,alert:!1};case"revising":return{badge:"review \uC218\uC815 \uC911 \xB7 1\uD68C",live:!0,alert:!1};case"failed":{let r=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:r.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${r.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",live:!1,alert:!0}}default:return null}}function Na(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function Dg(e){if(!e||typeof e!="object")return null;let t=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,n=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,s=n&&typeof n.pr_number=="number"?n.pr_number:null,o="";switch(e.phase){case"gating":o=t>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"repairing":o="\uC790\uB3D9 \uC218\uC815 \uC911";break;case"waiting_repair_pr":o=s?`\uC218\uC815 PR #${s} \uB300\uAE30 \uC911`:"\uC218\uC815 PR \uB300\uAE30 \uC911";break;case"merging":o=e.subject_role==="repair"?s?`\uC218\uC815 PR #${s} \uBA38\uC9C0 \uC911`:"\uC218\uC815 PR \uBA38\uC9C0 \uC911":"\uBA38\uC9C0 \uC911";break;case"cleaning":o="\uB9C8\uBB34\uB9AC \uC911";break;case"paused":o="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":o="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let a=[o,`\uC790\uB3D9 \uC218\uC815 \uD69F\uC218 ${t}/${r}`];return e.head_sha&&a.push(`head ${e.head_sha}`),e.base_sha&&a.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&a.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`),e.active_attempt_id&&a.push(`attempt ${e.active_attempt_id}`),n&&typeof n.bead_id=="string"&&a.push(`repair ${n.bead_id}`),e.evidence&&a.push(e.evidence),e.log_path&&a.push(e.log_path),{badge:o,title:a.join(`
`),alert:e.phase==="needs_human",lock_actions:e.phase!=="paused"&&e.phase!=="needs_human",repair_pr_url:n&&typeof n.pr_url=="string"?n.pr_url:"",repair_pr_number:s}}function Ku(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(r=>typeof r=="string"&&r.length>0):[]}function Ng(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",r=(n,s={})=>{let o=[s.title||"",t].filter(Boolean);return{label:n,title:o.join(`
`),live:s.live===!0,alert:s.alert===!0}};return e.continuation_required?r("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0}):e.merge_step?e.gate?.tier==="merged"?r("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):r("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0}):e.conflict_badge?r(e.conflict_badge,{live:e.conflict_live===!0}):e.head_review&&e.head_review.state!=="failed"?r("\uB9AC\uBDF0 \uC9C4\uD589 \uC911",{title:e.head_review.badge,live:e.head_review.live===!0}):e.recovery?.lock_actions?r(e.recovery.badge,{title:e.recovery.title,live:!0}):e.cleanup_failed?r(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0}):e.base_exception?r("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0}):e.conflicting?r("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0}):e.gate?.reason==="base_behind"?r("base \uAC31\uC2E0 \uD544\uC694",{alert:!0}):e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale"?r("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2C8\uAC70\uB098 \uC870\uC0C1 \uD655\uC778\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uB85C, \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB9AC\uBDF0\uD574\uC57C \uBA38\uC9C0\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",alert:!0}):e.gate?.reason==="spec_id_missing"?r("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0}):e.gate?.reason==="review_receipt_invalid"?r("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0}):Ku(e.receipt_check).length>0?r("\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694",{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${Ku(e.receipt_check).join(", ")}`,alert:!0}):e.head_review?.state==="failed"?r("\uB9AC\uBDF0 \uC2E4\uD328",{title:e.head_review.failure_reason||"",alert:!0}):e.recovery?r(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?r("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?r(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${Vu(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?r(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${Vu(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?r(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?r("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?r("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?r("\uB2EB\uD798",{alert:!0}):e.activity?r("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?r("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?r("\uD655\uC778 \uC911"):e.gate?.gate_badge?r(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function qg(e,t,r,n,s=null,o=null,a=null,c=!1,u=null,d=!0,f=null,_=null,h=null,$={},A=!1,O=!1,W={}){let te=!!u&&u.position>0,ee=!!u?.continuation_action&&u.continuation_action.continuation===null,D=!!u&&u.active===!0,N=u&&u.failure||null,R=Og(u?u.waiting:null,h),j=r[e]||null,b=j&&j.gate?j.gate:null,E=j&&j.pr?j.pr:null,V=Dg(h),ne=Mg(u?u.resolution:null),P=Pg(u?u.head_review:null),F=u&&u.head_review||null,pe=u&&u.authority||null,ye=!!F&&["pending","reviewing","revising"].includes(F.state),_e=te&&!D&&(F?.state==="failed"||!pe||pe.source==="automatic"&&!O),je=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":ne?ne.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":R,et=!!b&&b.base_badge==="\uCDA9\uB3CC",Ke=!!b&&b.enabled===!0,Le=Gn({bead_id:e,merge_sha:W.merge_sha,cleanup_cursor:W.cleanup_cursor,merge_progress:o&&o.merge_progress?o.merge_progress:null,cleanup_failed:n,repo_operations:W.repo_operations}),Be=no(Le),ue=!!n&&["child_sweep","branch_cleanup","parent_close"].includes(n.step)&&!!b&&b.tier==="merged",Te=c&&!!n&&!!b&&b.tier==="merged",Oe=_e&&(Ke||et||b?.reason==="base_behind"||b?.reason==="review_receipt_missing"||b?.reason==="review_receipt_stale"||ue||Te),De=c&&et&&d===!1,Se=fr($,e,{external:c,merge_active:D||Le?.step==="merge",merge_queued:te,conflict_active:!!a,cleanup_active:Be,merged:!!n||b?.tier==="merged"}),We=!!Se.operation,Ze=!ue&&!!n&&n.step==="repo_operations",$e=Ng({continuation_required:ee,merge_step:Le,conflict_badge:je,conflict_live:ne?.live===!0||a==="running",head_review:F&&P?{...P,state:F.state,failure_reason:F.failure_reason}:null,recovery:V,cleanup_failed:n,cleanup_label:n?Gr(n.step):null,base_exception:_,conflicting:et,gate:b,receipt_check:j&&j.receipt_check?j.receipt_check:null,queue_failure:N,auto_skip:f,queued:te,queue_active:D,queue_position:u?u.position:0,activity:je?null:o&&o.activity||null}),Xe=$e?.live===!0&&$e.title?i`<span title=${$e.title}>${$e.label}</span>`:$e?.label||null;return{id:e,title:c?i`${t}<span class="muted"> · 세션</span>`:t,reason:n&&Le?.active!==!0?ro(n.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:A,external:c,pr_number:E&&typeof E.number=="number"?E.number:null,pr_url:E&&typeof E.url=="string"?E.url:"",completion_badge:$e?.live!==!0&&$e?.title?$e.label:null,completion_title:$e?.title||"",completion_repair_pr_url:V?V.repair_pr_url:"",completion_repair_pr_number:V?V.repair_pr_number:null,badges:Xe?[Xe]:[],live_badge:$e?.live===!0?Xe:null,usage:s,alert:$e?.alert===!0,merge_action:b?.tier==="merged"&&!ue&&!Te||Ze?!1:!te||ee||_e,timeline_action:Ze,cancel_action:te&&!ee,cancel_enabled:(!D||ye)&&!(V&&V.lock_actions),cancel_title:V&&V.lock_actions?`${V.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:D&&!ye?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":ye?"review \uC9C4\uD589\uC744 \uCDE8\uC18C\uD558\uACE0 \uBA38\uC9C0 \uAD8C\uD55C\uC744 \uD3D0\uAE30\uD569\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:Se,discard_action:Se.action,merge_step:Le,discard_enabled:Se.enabled,discard_title:Se.title,merge_enabled:!Le&&!a&&!We&&!_&&!(V&&V.lock_actions)&&!De&&!Ze&&(Ke||et||b?.reason==="base_behind"||b?.reason==="review_receipt_missing"||b?.reason==="review_receipt_stale"||ue||Te||Oe),merge_label:ee?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":ue||Te?"\uC815\uB9AC \uC7AC\uAC1C":et&&!Le&&!ue?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":b?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":b?.reason==="review_receipt_missing"||b?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":_e?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:We?Se.error?`\uD3D0\uAE30 \uC2E4\uD328: ${Se.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${Se.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:ee?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Le?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${Le.label}`:Te?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":De?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":ue?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":et?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":b?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":b?.reason==="review_receipt_missing"||b?.reason==="review_receipt_stale"?"\uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":b?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":Ke?`\uBA38\uC9C0 (${b.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:b&&b.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${b&&b.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function qa(e,t={}){let{transport:r,issueStores:n,queueStore:s,analysisStore:o,sessionLogStore:a,uiOrderStore:c,gotoIssue:u,getWorkspacePath:d,doneRange:f,onDoneRangeChange:_}=t,h=n?bs(n,c):null,$=ys({transport:r,uiOrderStore:c}),A=null,O=[],W=gg(),te=null,ee=wg(),D=zt(f)?f:$g(),N=new Map;function R(){let l=ur.find(m=>m.value===D);return l?l.label:"\uC624\uB298"}let j=Sg(),b=!1,E=new Set,V=new Set,ne=new Set,P=new Set,F=[],pe=document.createElement("div");pe.className="worker-console";let ye=document.createElement("div");ye.className="worker-top";let _e=document.createElement("div");_e.className="worker-drawer-overlay",_e.hidden=!0;let je=document.createElement("div");je.className="worker-drawer-overlay__backdrop";let et=document.createElement("div");et.className="worker-drawer-host";let Ke=document.createElement("div");Ke.className="worker-drawer-host",Ke.hidden=!0,_e.append(je,et,Ke);let Le=document.createElement("div");Le.className="worker-lanes-host",pe.append(ye,_e,Le),e.appendChild(pe);let Be=null,ue=null,Te=Bs(et,{transport:r,sessionLogStore:a,onClose:()=>{Be=null,ue=null,_e.hidden=!0,J()}}),Oe=Wu(Ke,{onClose:()=>{Ke.hidden=!0,_e.hidden=!0,J()}}),De=Pu({getWorkspacePath:d||(()=>"")}),Se=d&&d()||"",We=Du({queueStore:s,transport:r,onChanged:()=>J(),onOpenScript:(l,m)=>{De.open(l,m)}}),Ze=o?Iu(pe,{queueStore:s,analysisStore:o,transport:r,getWorkspacePath:d,onOpenTranscript:(l,m)=>rt(l,m)}):null;function $e(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:io,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function Xe(){let l=$e(),m=typeof l.serial_lane_count=="number"&&Number.isInteger(l.serial_lane_count)&&l.serial_lane_count>0?Math.min(l.serial_lane_count,5):0,x=Array.isArray(l.serial_lanes)?l.serial_lanes:[],K=[];for(let Ae of x){if(K.length>=m)break;!Ae||typeof Ae.id!="string"||!/^s[1-5]$/.test(Ae.id)||!Array.isArray(Ae.entries)||K.push({id:Ae.id,label:`\uC9C1\uB82C ${Ae.id.slice(1)}`,count:Ae.entries.length})}return K.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(l.queue)?l.queue:[]).length},...K]}function Z(l){if(!te||!l.some(x=>x.id===te))return null;let m=Xe();return m?{bead_id:te,lanes:m}:null}function z(){let l=$e();return typeof l.revision=="number"?l.revision:0}function oe(l){l&&l.queue&&s&&s.set(l.queue)}function Me(){let l=$e().queue;return Array.isArray(l)?l.length:0}async function Fe(l,m,x){if(!r)return;let K=()=>({bead_id:l,...m==="parallel"?{}:{lane:m},...x===void 0?{}:{index:x},expected_revision:z()}),le=await r("worker-queue-place",K());oe(le),le&&le.conflict&&await r("worker-queue-place",K()).then(oe)}async function Ue(l,m,x){if(!r)return;let K=()=>({bead_id:l,...m==="parallel"?{}:{lane:m},to_index:x,expected_revision:z()}),le=await r("worker-queue-reorder",K());oe(le),le&&le.conflict&&await r("worker-queue-reorder",K()).then(oe)}async function tt(l){if(!r)return;let m=await r("worker-queue-remove",{bead_id:l,expected_revision:z()});oe(m),m&&m.conflict&&await r("worker-queue-remove",{bead_id:l,expected_revision:z()}).then(oe)}async function ct(l){if(!r||!l)return;let m=await r("worker-attempt-pause",{attempt_id:l});m&&m.paused===!1&&m.reason&&ie(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${m.reason}`,"error",2400)}async function ot(l){if(!r||!l)return;let m=await an();if(m===null)return;let x=async(le={})=>await r("worker-attempt-resume",{attempt_id:l,expected_revision:z(),...m!==""?{instructions:m}:{},...le}),K=await x();oe(K),K&&K.conflict&&(K=await x(),oe(K)),K=await gr(K,(le,Ae)=>x({continuation:le,decision_token:Ae}),{onResult:oe,refresh:()=>x()}),K&&K.resumed===!1&&!K.conflict&&K.reason&&ie(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${K.reason}`,"error",2400)}async function Y(l){if(!r||!l)return;let m=await r("worker-attempt-dismiss",{attempt_id:l,expected_revision:z()});oe(m),m&&m.conflict&&(m=await r("worker-attempt-dismiss",{attempt_id:l,expected_revision:z()}),oe(m)),m&&m.dismissed===!1&&!m.conflict&&m.reason&&ie(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${m.reason}`,"error",2400)}async function re(l,m,x=!0){if(!r)return null;let K=r,le=await K(l,{...m,expected_revision:z()});return oe(le),le&&le.conflict&&x&&(le=await K(l,{...m,expected_revision:z()}),oe(le)),le}async function me(l){if(!r||!l)return;let m=$e().merge_queue?.find(K=>K.bead_id===l)?.continuation_action;if(m?.mismatch&&m.continuation===null){await ge(l,m.mismatch);return}E.add(l),J();let x;try{x=await re("worker-merge-queue-add",{bead_id:l})}finally{E.delete(l),J()}!x||x.conflict||x.applied||ie(Lg(x.reason),"error",2400)}async function nt(l){if(!(!r||!l||V.has(l))){V.add(l),J();try{let m=await r("worker-cleanup-retry",{bead_id:l,expected_revision:z()});oe(m),m&&!m.retried&&!m.conflict&&m.reason&&ie(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${m.reason}`,"error",2400)}finally{V.delete(l),J()}}}async function ge(l,m){let x=await gr({continuation_mismatch:m},(le,Ae)=>re("worker-merge-queue-add",{bead_id:l,continuation:le,decision_token:Ae},!1)),K=x?.queue?.merge_queue?.find(le=>le.bead_id===l)?.continuation_action;if(x?.applied!==!0&&K?.continuation===null&&K.mismatch){await ge(l,K.mismatch);return}x&&x.applied===!1&&!x.conflict&&ie("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function T(l){if(!r)return;let m=await re("worker-merge-auto-toggle",{on:l});!m||m.conflict||ie(l?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",l?"success":"info",2400)}async function M(l){if(!r||!l)return;let m=await re("worker-merge-queue-remove",{bead_id:l});m&&!m.conflict&&!m.applied&&m.reason==="merge_active"&&ie("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function L(){await re("worker-merge-queue-remove",{all:!0})}async function G(l,m=null,x="unmerged",K=null){if(!r||!l)return;let le=Wn(l,x);if(!(!!K||typeof globalThis.confirm!="function"||globalThis.confirm(le)))return;let be=await r("worker-discard",{bead_id:l,...m?{attempt_id:m}:{},...K?{operation_id:K}:{},expected_revision:z()});if(oe(be),be&&be.conflict&&(be=await r("worker-discard",{bead_id:l,...m?{attempt_id:m}:{},...K?{operation_id:K}:{},expected_revision:z()}),oe(be)),be&&be.discarded===!0){ie(eo(be),"success",5e3);return}if(be&&be.reason){ie(`\uD3D0\uAE30 \uC2E4\uD328: ${be.reason}`,"error",2800);return}if(be&&be.accepted&&be.pending==="merged_revert"){ie("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(be&&be.accepted&&!be.discarded){ie(`\uD3D0\uAE30 \uC9C4\uD589: ${be.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}be&&!be.conflict&&ie("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function se(l,m,x){if(!(!r||!m||!x||P.has(m))){P.add(m),J();try{let K=await r(l,{bead_id:m,action_id:x,expected_revision:z()});oe(K),K?.conflict?ie("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!K?.ok&&K?.reason&&ie(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(K.reason)}`,"error",2800)}finally{P.delete(m),J()}}}async function w(l,m){if(!r||!m||ne.has(m))return;ne.add(m),J();let x;try{let K=async(le={})=>await r(l,{bead_id:m,expected_revision:z(),...le});x=await K(),oe(x),x&&x.conflict&&(x=await r(l,{bead_id:m,expected_revision:z()}),oe(x)),l==="worker-revise-fix"&&(x=await gr(x,(le,Ae)=>K({continuation:le,decision_token:Ae}),{onResult:oe,refresh:()=>K()}))}finally{ne.delete(m),J()}if(!(!x||x.conflict)){if(x.ok){ie(l==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}ie(`\uCC98\uBD84 \uAC70\uBD80: ${x.reason||""}`,"error",3e3)}}async function C(l){if(!r)return;let m=await r("worker-automation-toggle",{on:l,expected_revision:z()});oe(m),m&&m.conflict&&await r("worker-automation-toggle",{on:l,expected_revision:z()}).then(oe)}async function q(l){if(!r||!l)return;let m=await r("worker-repo-operation-repair",{operation_id:l});if(oe(m),m&&m.ok===!1){ie(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${m.reason||""}`,"error",3e3);return}m&&m.ok===!0&&ie("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function fe(l){if(!r||!l)return;let m=await r("worker-repo-operation-dismiss",{operation_id:l});oe(m),m&&m.ok===!1&&ie(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${m.reason||""}`,"error",3e3)}async function ae(l){if(!r||!Number.isFinite(l))return;let m=Math.max(io,Math.floor(l)),x=await r("worker-queue-set-slots",{slots:m,expected_revision:z()});oe(x),x&&x.conflict&&await r("worker-queue-set-slots",{slots:m,expected_revision:z()}).then(oe)}async function ve(l){if(!r||!Number.isInteger(l)||l<1||l>zu)return;let m=$e(),x=(Array.isArray(m.serial_lanes)?m.serial_lanes:[]).slice(l).reduce((Ae,be)=>Ae+(Array.isArray(be?.entries)?be.entries.length:0),0),K=()=>({count:l,expected_revision:z()}),le=await r("worker-queue-set-serial-lane-count",K());oe(le),le&&le.conflict&&(le=await r("worker-queue-set-serial-lane-count",K()),oe(le)),le&&le.applied&&x>0&&ie(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${x}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}function Re(){let l=$e(),m=h?h.selectBoardColumn(pg,"ready"):[],x=h?h.selectBoardColumn(fg,"blocked"):[],K=h?h.selectBoardColumn(mg,"closed"):[],le=h?h.selectBoardColumn(_g,"in_progress"):[],Ae=new Map;for(let y of le){let B=Rg(y);if(!B)continue;let ce=Ae.get(B);ce?ce.push(y):Ae.set(B,[y])}let be=y=>{let B=hs(Ae.get(y)||[]);return B?B.title||B.id:null},Ye=l.bead_titles||{},st=new Map;for(let[y,B]of Object.entries(Ye))typeof B=="string"&&B.length>0&&st.set(y,B);for(let y of[...m,...x])st.set(y.id,y.title||y.id);let Ne=l.bead_times&&typeof l.bead_times=="object"&&!Array.isArray(l.bead_times)?l.bead_times:{},p=l.bead_labels&&typeof l.bead_labels=="object"&&!Array.isArray(l.bead_labels)?l.bead_labels:{},g=new Map;for(let[y,B]of Object.entries(p))Array.isArray(B)&&g.set(y,Oa(B));for(let y of[...m,...x]){let B=y.labels;Array.isArray(B)&&!g.has(y.id)&&g.set(y.id,Oa(B))}let k=new Map,H=o?.get()?.last_good?.result?.groups;for(let y of Array.isArray(H)?H:[]){if(y?.eligible!==!0||!Array.isArray(y.members))continue;let B=y.members.map(Ve=>{let ft=(Array.isArray(l.serial_lanes)?l.serial_lanes:[]).find(qt=>qt.entries.some(Tt=>Tt.bead_id===Ve));return ft?ft.id:null});if(!(B.every(Ve=>Ve!==null)&&new Set(B).size===1))for(let Ve of y.members)k.set(Ve,y.members.filter(ft=>ft!==Ve))}let ke=l.bead_blocked_by&&typeof l.bead_blocked_by=="object"&&!Array.isArray(l.bead_blocked_by)?l.bead_blocked_by:{},he=new Map;for(let[y,B]of Object.entries(Ne))B&&typeof B=="object"&&he.set(y,B);for(let y of[...m,...x])he.set(y.id,{created_at:y.created_at,updated_at:y.updated_at});let Ce=y=>he.get(y)||{},qe=l.pr_wait||[],gt=l.pr_observations||{},cr=l.pr_activity||{},Kr=l.cleanup_failed||{},Xn=Object.entries(Kr).map(([y,B])=>({bead_id:y,step:B&&B.step?B.step:"",reason:B&&B.reason?B.reason:"",at:B&&typeof B.at=="number"?B.at:null,detail:B&&typeof B.detail=="string"?B.detail:null,output_tail:B&&typeof B.output_tail=="string"&&B.output_tail?B.output_tail:void 0,log_path:B&&typeof B.log_path=="string"&&B.log_path?B.log_path:void 0,retry_count:B&&typeof B.retry_count=="number"&&Number.isInteger(B.retry_count)&&B.retry_count>0?B.retry_count:0,failure_code:B&&typeof B.failure_code=="string"?B.failure_code:void 0,subject_id:B&&typeof B.subject_id=="string"?B.subject_id:void 0,repair_eligible:!!(B&&B.repair_eligible),repair:B&&B.repair?B.repair:void 0})),mn=l.queue||[],gn=new Set([...mn.map(y=>y.bead_id),...(Array.isArray(l.serial_lanes)?l.serial_lanes:[]).flatMap(y=>(Array.isArray(y?.entries)?y.entries:[]).map(B=>B.bead_id)),...qe.map(y=>y.bead_id),...l.done.map(y=>y.bead_id)]),Qn=new Set(x.map(y=>y.id)),Pe=c?c.get()?.order||{}:{},pt=new Set,Yr=[];for(let y of[...m,...x])gn.has(y.id)||pt.has(y.id)||Cg(y)||(pt.add(y.id),Yr.push(y));O=Tg(Yr,ee,Pe);let dd=l.admission||{},Ua=y=>{let B=dd[y];if(!B)return"";if(B.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let ce=typeof B.reason=="string"?B.reason:"",Ve=ce.indexOf(":");return Ve>0&&Ve<ce.length-1?`\u26D4 ${ce.slice(0,Ve)} (${ce.slice(Ve+1)})`:`\u26D4 ${ce}`},pd=O.map(y=>{let B=Us(y),ce=B.path.length>0,Ve=y.workflow?.route==="quick_fix"||y.metadata&&y.metadata.route==="quick_fix",ft=!Object.hasOwn(y,"description")||typeof y.description=="string"&&y.description.trim().length>0,qt=Object.hasOwn(y,"labels")&&Ru(y.labels),Tt=!qt&&(Ve?ft:ce&&!B.conflict),ut=Qn.has(y.id),Zt=[];ut&&Zt.push(Ig(y)),Ve&&!ft?Zt.push("missing_description"):!Ve&&B.conflict?Zt.push("spec_id_conflict"):!Ve&&!ce&&Zt.push("spec \uC5C6\uC74C");let as=Ua(y.id);return as&&Zt.push(as),{id:y.id,title:y.title||y.id,reason:Zt.join(" \xB7 "),draggable:Tt,lane:"candidate",created_at:y.created_at,updated_at:y.updated_at,workflow:y.workflow,is_quick_fix:Ve,status:y.status,worker_ineligible:qt,blocked:ut,has_spec:ce}}),co=hg(pd,W),fd=co.visible,_d=l.revise_parked||{},Jn=l.discard_operations&&typeof l.discard_operations=="object"&&!Array.isArray(l.discard_operations)?l.discard_operations:{},uo=(y,B)=>y.map((ce,Ve)=>{let ft=B!=="done",qt=B!=="done"&&B!=="queue",Tt=ft?_d[ce.bead_id]:null,ut=ft?fr(Jn,ce.bead_id):null,Zt=ut?.operation?ut:null,as=ft&&g.get(ce.bead_id)===!0,pi=ke[ce.bead_id]||[],go=l.admission&&typeof l.admission=="object"?l.admission[ce.bead_id]:null,bo=ft?Rc(go,!!Zt||P.has(ce.bead_id)):null,Ed=ft&&!bo?Ua(ce.bead_id):null,Td=ft?[Ed]:[],fi=ft&&pi.length>0&&typeof go?.reason=="string"&&go.reason.startsWith("not_ready")?[`\u23F8 ${pi.join(", ")} \uC644\uB8CC \uB300\uAE30 (blocks)`]:[],ho=ft?k.get(ce.bead_id):void 0;return ho&&ho.length>0&&fi.push(`\u2733 serial \uAD8C\uC7A5 \xB7 ${ho.join(", ")}\uC640`),{id:ce.bead_id,title:st.get(ce.bead_id)||ce.bead_id,reason:Td.filter(Boolean).join(" \xB7 "),draggable:ft&&!Zt&&!bo,done:B==="done",lane:B,seq:qt?Ve+1:void 0,worker_serial:as,discard:Zt,stale_work:bo,badges:[...fi,...Tt?["\u23F8 REVISE \uD30C\uD0B9"]:[]],alert:!!Tt,revise_action:!!Tt,revise_enabled:!!Tt&&!Zt&&!ne.has(ce.bead_id),revise_title:Tt?Tt.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Tt.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:B==="done"?Ht(l.attempts||{},ce.bead_id):null,work_ms:B==="done"?Tc(l.attempts||{},ce.bead_id):null,done_at:B==="done"&&typeof ce.added_at=="number"?ce.added_at:void 0,...Ce(ce.bead_id)}}),Zr=l.attempts?Object.values(l.attempts):[],po=new Set;for(let y of Zr)y&&typeof y.resumed_from=="string"&&y.resumed_from.length>0&&po.add(y.resumed_from);let Wa=new Map;for(let y of Zr)Wa.set(y.bead_id,y.attempt_id);let es=new Map;for(let y of Zr)es.set(y.attempt_id,y);function fo(y){let B=new Set,ce=y;for(;ce&&!B.has(ce.attempt_id);){if(ce.conflict_resolution===!0)return!0;B.add(ce.attempt_id),ce=typeof ce.resumed_from=="string"&&ce.resumed_from.length>0&&es.get(ce.resumed_from)||null}return!1}let ts=typeof l.declared_base=="string"?l.declared_base:null;function md(y){let B=null;for(let ce of Zr)!ce||ce.bead_id!==y||fo(ce)||(B===null||(typeof ce.started_at=="number"?ce.started_at:0)>=(typeof B.started_at=="number"?B.started_at:0))&&(B=ce);return B&&typeof B.target_base=="string"?B.target_base:null}let za=[],Ha=[],gd=Cu(l),Ga=y=>{let B=typeof y.session_id=="string"&&y.session_id.length>0,ce=po.has(y.attempt_id);return{eligible:B&&!ce,reason:B?ce?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},Yt=null;for(let y of Zr){let B=y.status==="paused"&&!po.has(y.attempt_id);if(y.status==="running"||B)Ha.push({bead_id:y.bead_id,attempt_id:y.attempt_id,title:st.get(y.bead_id)||y.bead_id,runner:y.runner||null,model:y.model||null,effort:y.effort||null,speed:y.speed||null,continuation_mode:y.continuation_mode||null,started_at:typeof y.started_at=="number"?y.started_at:null,resumed_from:y.resumed_from||null,paused:B,conflict_resolution:fo(y),base_exception:Na(ts,y.target_base),can_pause:typeof y.session_id=="string"&&y.session_id.length>0,discard:fr(Jn,y.bead_id,{attempt_id:y.attempt_id}),usage:Ht(l.attempts||{},y.bead_id),current_child:be(y.bead_id),...Ce(y.bead_id)});else if((y.status==="failed"||y.status==="orphaned")&&gd(y)){let ce=Ga(y);za.push({bead_id:y.bead_id,attempt_id:y.attempt_id,title:st.get(y.bead_id)||y.bead_id,runner:y.runner||null,model:y.model||null,effort:y.effort||null,speed:y.speed||null,continuation_mode:y.continuation_mode||null,started_at:typeof y.started_at=="number"?y.started_at:null,resumed_from:y.resumed_from||null,failed:!0,status:y.status,status_label:y.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:fr(Jn,y.bead_id,{attempt_id:y.attempt_id}),resume_eligible:ce.eligible,resume_reason:ce.reason,conflict_resolution:fo(y),base_exception:Na(ts,y.target_base),usage:Ht(l.attempts||{},y.bead_id),current_child:be(y.bead_id),...Ce(y.bead_id)}),Yt=y}}let rs=[...za,...Ha].map(y=>{let B=es.get(y.attempt_id),ce=B?.quickfix_landing;if(B?.quickfix_lane!==!0||!ce||typeof ce!="object")return y;let Ve=typeof ce.reason=="string"&&ce.reason.length>0?ce.reason:null,ft=Gn({bead_id:B.bead_id,merge_sha:ce.head_sha,cleanup_cursor:ce.cursor,cleanup_failed:Ve?{step:ce.cursor,reason:Ve}:null,repo_operations:Array.isArray(l.repo_operations)?l.repo_operations:[]});return ft?{...y,landing:ft}:y}),Va=null;if(Yt){let y=Ga(Yt),B=Yt.cause_detail;Va={bead_id:Yt.bead_id,repo:Yt.repo||"",reason:Yt.cause||Yt.status,cause_detail:B&&typeof B.reason=="string"?{reason:B.reason,command:typeof B.command=="string"?B.command:null}:null,resume_attempt_id:Yt.attempt_id,resume_eligible:y.eligible,resume_reason:y.reason,discard:fr(Jn,Yt.bead_id,{attempt_id:Yt.attempt_id})}}let Ka=new Set(rs.map(y=>y.bead_id)),_o=Array.isArray(l.merge_queue)?l.merge_queue:[],Ya=new Map,Za=new Map,Xa=new Map,Qa=new Map,Ja=new Map;_o.forEach((y,B)=>{y&&typeof y.bead_id=="string"&&(Ya.set(y.bead_id,B+1),Za.set(y.bead_id,y.resolution),Xa.set(y.bead_id,y.continuation_action||null),Qa.set(y.bead_id,y.head_review||null),Ja.set(y.bead_id,y.authority||null))});let Xr=l.merge_queue_state||{active:null,failures:{}},bd=Xr.failures||{},ei=Xr.waiting&&typeof Xr.waiting.bead_id=="string"&&typeof Xr.waiting.reason=="string"?Xr.waiting:null,hd=l.auto_merge_skips||{},ti=y=>{let B=hd[y];if(!B)return null;let ce=gt[y],Ve=ce&&ce.pr?ce.pr.head_sha:null;return Ve&&Ve===B.head_sha?B.reason||"":null},ns=new Map;for(let y of rs)y.failed!==!0&&y.conflict_resolution&&(y.paused?ns.has(y.bead_id)||ns.set(y.bead_id,"paused"):ns.set(y.bead_id,"running"));let ri=rs.filter(y=>!y.paused&&y.failed!==!0).length,ni=(l.workspace_info||{}).slots,si=typeof ni=="number"?ni:typeof l.slots=="number"?l.slots:io,yd=ri>si,ss=qr(D),vd=(Array.isArray(l.done)?l.done.slice():[]).filter(y=>ss===void 0||typeof y.added_at!="number"||y.added_at>=ss).sort((y,B)=>(B.added_at||0)-(y.added_at||0)),bn=uo(vd,"done"),wd=new Set((Array.isArray(l.done)?l.done:[]).map(y=>y?.bead_id).filter(y=>typeof y=="string")),oi=[],kd=d?.()||"";for(let y of K){let B=Br(y.closed_at);if(typeof y.id!="string"||wd.has(y.id)||B===null||ss!==void 0&&B<ss||typeof y.comment_count!="number"||y.comment_count<=0)continue;let ce=`${kd}\0${y.id}\0${String(y.updated_at)}\0${y.comment_count}`,Ve=N.get(ce);Ve===void 0&&r&&(N.set(ce,"pending"),Promise.resolve(r("get-comments",{id:y.id})).then(ft=>{let qt=Array.isArray(ft)&&ft.some(Tt=>Ws(typeof Tt?.text=="string"?Tt.text:"")?.lane==="session");N.set(ce,qt?"session":"not-session"),J()}).catch(()=>{N.set(ce,"failed"),J()})),Ve==="session"&&oi.push({id:y.id,title:y.title||y.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:null,done_at:B,created_at:y.created_at,updated_at:y.updated_at})}bn.push(...oi),bn.sort((y,B)=>(B.done_at||0)-(y.done_at||0));let os={};for(let y of br)os[y]=0;let ai=!1,ii=0,mo=0,li=0;for(let y of bn){let B=y.usage;if(B&&typeof B=="object"){let ce=!1;for(let Ve of br)Number.isFinite(B[Ve])&&(os[Ve]+=B[Ve],ai=!0,ce=!0);ce&&(mo+=1,Number.isFinite(B.total_cost_usd)&&(ii+=B.total_cost_usd,li+=1))}}mo>0&&li===mo&&(os.total_cost_usd=ii);let ci=bn.map(y=>y.usage).filter(y=>y&&typeof y=="object"&&y.providers),$d=ci.length>0?At(Es(ci)):ai?Jt(os):null,xd=l.lane_states&&typeof l.lane_states=="object"&&!Array.isArray(l.lane_states)?l.lane_states:{},Ad=Array.isArray(l.serial_lanes)?l.serial_lanes:[],ui=y=>{if(qe.some(Ve=>Ve.bead_id===y))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let B=Zr.filter(Ve=>Ve&&Ve.bead_id===y),ce=B.length>0?B[B.length-1].status:null;return ce==="failed"||ce==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":ce==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},di=Ad.filter(y=>y&&typeof y.id=="string"&&Array.isArray(y.entries)).map((y,B)=>{let ce=xd[y.id]||{},Ve=new Map((Array.isArray(ce.corrections)?ce.corrections:[]).filter(ut=>ut&&typeof ut.bead_id=="string"&&typeof ut.after=="string").map(ut=>[ut.bead_id,ut.after])),ft=uo(y.entries.filter(ut=>!Ka.has(ut.bead_id)),y.id).map(ut=>Ve.has(ut.id)?{...ut,badges:[`\u{1F517} ${Ve.get(ut.id)} \uB4A4 (blocks \uC790\uB3D9)`,...ut.badges]}:ut),qt=Array.isArray(ce.occupied_by)?ce.occupied_by.filter(ut=>typeof ut=="string"):[],Tt=qt.map(ut=>({id:ut,title:st.get(ut)||ut,draggable:!1,lane:y.id,ghost:!0,badges:[ui(ut)]}));return{id:y.id,index:B+1,rows:[...Tt,...ft],occupied:qt.length>0,badge:qt.length>0?ui(qt[0]):"\uB300\uAE30",cycle:ce.cycle===!0}}),Sd=typeof l.serial_lane_count=="number"?l.serial_lane_count:di.length;return{queue:l,idToTitle:st,candidates:fd,candidate_hidden:{blocked:co.hidden_blocked,spec:co.hidden_spec},running:rs,live_count:ri,slots:si,over_cap:yd,failure:Va,waiting:uo(mn.filter(y=>!Ka.has(y.bead_id)),"queue"),serial_lanes:di,serial_lane_count:Sd,pr_wait:qe.map(y=>qg(y.bead_id,st.get(y.bead_id)||y.bead_id,gt,Kr[y.bead_id]||null,Ht(l.attempts||{},y.bead_id),cr[y.bead_id]||(E.has(y.bead_id)||V.has(y.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),ns.get(y.bead_id)||null,y.external===!0,{position:Ya.get(y.bead_id)||0,active:Xr.active===y.bead_id,failure:bd[y.bead_id]||null,waiting:ei?.bead_id===y.bead_id?ei.reason:null,resolution:Za.get(y.bead_id),continuation_action:Xa.get(y.bead_id),head_review:Qa.get(y.bead_id)||null,authority:Ja.get(y.bead_id)||null},y.wt_present!==!1,l.auto_merge===!0?ti(y.bead_id):null,Na(ts,md(y.bead_id)),l.completion_status&&typeof l.completion_status=="object"&&!Array.isArray(l.completion_status)&&l.completion_status[y.bead_id]||null,l.discard_operations&&typeof l.discard_operations=="object"&&!Array.isArray(l.discard_operations)?l.discard_operations:{},es.get(Wa.get(y.bead_id)||"")?.worker_serial===!0,l.auto_merge===!0,{merge_sha:y.merge_sha,cleanup_cursor:y.cleanup_cursor,repo_operations:Array.isArray(l.repo_operations)?l.repo_operations:[]})).map(y=>({...y,...Ce(y.id)})),merge_queue_length:_o.length,merge_queue_running:_o.length>0,auto_excluded:qe.map(y=>y.bead_id).filter(y=>ti(y)!==null),declared_base:ts,done:bn,token_total:$d,cleanup_failures:Xn,repo_operations:Array.isArray(l.repo_operations)?l.repo_operations:[]}}function ze(){let m=!!o?.get()?.job,x=!m&&o?.isPending?.()===!0,K=m?"\uBD84\uC11D \uC911":x?"\uC900\uBE44 \uC911":"";return i`<button
      type="button"
      class=${K?"worker-analysis-btn worker-analysis-btn--running":"worker-analysis-btn"}
      aria-busy=${K?"true":"false"}
      title="대기 이슈의 병렬 실행 가능성을 분석해 직렬 그룹을 제안합니다 (클릭할 때만 실행)"
    >
      ✳ 병렬성
      분석${K?i`<span class="worker-analysis-btn__badge">${K}</span>`:""}
    </button>`}function He(l){let m=l.waiting.length>0?l.waiting[0].id:"\u2014",x=i`<button
      type="button"
      class="worker-play${l.queue.auto_advance?" is-active":""}"
    >
      ${l.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,K=I(l),le=l.over_cap?i`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",Ae=i`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${l.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${l.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${R()} 완료 <b>${l.done.length}</b></span
      >`,be=i`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${l.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${l.declared_base||"?"}</span
    >`,Ye=i`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${io}
          step="1"
          .value=${String(l.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:zu},(p,g)=>g+1).map(p=>i`<option
                value=${String(p)}
                ?selected=${l.serial_lane_count===p}
              >
                ${p}
              </option>`)}
        </select>
      </label>
      ${o?ze():""} `,st=zc({failure:l.failure}),Ne=Cc(l.repo_operations,l.cleanup_failures);return b?i`<div class="worker-ribbon">
          ${x} ${K}
          <div class="worker-kpi worker-kpi--ribbon">${le}${Ae}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${Ye}</div>
          <div class="worker-kpi">${be}</div>
        </div>
        ${Ne}${We.template()}${st}`:i`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${x}${K}${Ye}</div>
        <div class="worker-kpi">
          ${le}${Ae}${be}
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
      ${Ne}${We.template()}${st}`}function U(l){if(l.running.length===0&&l.pr_wait.length===0)return"";let m=l.running.some(x=>!x.paused&&x.failed!==!0);return i`<section
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
      ${l.running.length>0?Aa(l.running,Date.now(),Be):""}
      ${l.pr_wait.map(x=>ba(x))}
    </section>`}function Q(l){let m=l.candidate_hidden;return i`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${W.show_blocked}
        />
        🔒 blocked${m.blocked>0?` ${m.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${yg.map(x=>i`<button
              type="button"
              class="worker-filter__chip${W.spec===x.value?" is-active":""}"
              data-spec=${x.value}
              aria-pressed=${W.spec===x.value?"true":"false"}
            >
              ${x.label}
            </button>`)}
        ${m.spec>0?i`<span class="worker-filter__hidden">숨김 ${m.spec}</span>`:""}
      </div>
    </div>`}function de(){return i`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${ee}
    >
      ${vg.map(l=>i`<option value=${l.value} ?selected=${ee===l.value}>
            ${l.label}
          </option>`)}
    </select>`}function v(){return i`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${D}
      >
        ${ur.map(l=>i`<option value=${l.value} ?selected=${D===l.value}>
              ${l.label}
            </option>`)}
      </select>
    </div>`}function S(l){let m=i`<span
      class="worker-lane__badge${l.occupied?" worker-lane__badge--held":""}"
      >${l.badge}</span
    >`,x=l.cycle?i`<div class="worker-lane__cycle">
          ⚠ blocks 순환 감지 — 자동 정렬을 생략했습니다
        </div>`:"";return nr({id:`worker-pane-lane-${l.id}`,lane:l.id,title:`\uC9C1\uB82C ${l.index}`,items:l.rows,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:m,controls:x})}function I(l){let m=l.queue.auto_merge===!0;if(l.merge_queue_running)return i`<button
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
      </button>`;let x=new Set(l.auto_excluded),K=l.pr_wait.filter(le=>le.merge_action&&le.merge_enabled&&!x.has(le.id)).length;return i`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${K>0?` ${K}`:""}
    </button>`}function X(l){let m=nr({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:l.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:de(),controls:Q(l),place_menu:Z(l.candidates)});return b?i`<div class="worker-lanes worker-lanes--mobile">
        ${U(l)}
        ${nr({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:l.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:j.queue,preview:Gu(l.waiting)})}
        ${l.serial_lanes.map(x=>S(x))}
        ${m}
        ${nr({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:l.done,empty:`${R()} \uC644\uB8CC \uC5C6\uC74C`,controls:v(),collapsible:!0,collapsed:j.done,preview:Array.isArray(l.token_total)?l.token_total.map(x=>x.label).join(" \xB7 "):l.token_total||Gu(l.done)})}
      </div>`:i`<div class="worker-lanes">
      ${m}
      <div class="worker-wait">
        ${nr({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:l.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
        ${l.serial_lanes.map(x=>S(x))}
      </div>
      ${nr({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${l.slots}`,items:l.running,live:l.running.some(x=>!x.paused&&x.failed!==!0),body:Aa(l.running,Date.now(),Be)})}
      ${nr({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:l.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${nr({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${R()} ${l.done.length}`,items:l.done,empty:`${R()} \uC644\uB8CC \uC5C6\uC74C`,controls:v()})}
    </div>`}function xe(l){j={...j,[l]:!j[l]},Eg(j),J()}function J(){let l=Re();Ge(He(l),ye),Ge(X(l),Le)}function Ee(){let l=document.querySelector(".app-header");if(!l)return;let m=()=>{let x=Math.round(l.getBoundingClientRect().height);pe.style.setProperty("--worker-ribbon-top",`${x}px`)};if(m(),typeof ResizeObserver=="function"){let x=new ResizeObserver(m);x.observe(l),F.push(()=>x.disconnect())}else window.addEventListener("resize",m),F.push(()=>window.removeEventListener("resize",m))}function Ie(){if(typeof window.matchMedia!="function")return;let l=window.matchMedia(Ag);b=!!l.matches;let m=x=>{let K=!!(x&&typeof x.matches=="boolean"?x.matches:l.matches);K!==b&&(b=K,J())};typeof l.addEventListener=="function"?(l.addEventListener("change",m),F.push(()=>l.removeEventListener("change",m))):typeof l.addListener=="function"&&(l.addListener(m),F.push(()=>l.removeListener(m)))}let ht=null;function yt(l){ht=l.target instanceof Element?l.target:null}function Qe(l){let x=l.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!x)return;if(ht&&x.contains(ht)&&ht.closest("input, button, a")){l.preventDefault();return}let K=x.dataset.beadId||"",le=x.dataset.lane||"";A={bead_id:K,from_lane:le};try{l.dataTransfer?.setData("text/plain",K),l.dataTransfer&&(l.dataTransfer.effectAllowed="move")}catch{}}function Et(l){let m=l.target?.closest?.(".worker-pane");if(!m)return;let x=m.dataset.lane||"";x!=="candidate"&&x!=="queue"&&!/^s[1-5]$/.test(x)||(l.preventDefault(),l.dataTransfer&&(l.dataTransfer.dropEffect="move"),m.classList.add("worker-pane--drag-over"))}function Vt(l){l.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function wt(l,m){let x=O.find(be=>be.id===l);if(!x)return;let K=O.filter(be=>be.id!==l),le=K.length;if(m){let be=m.dataset.beadId;if(be===l)return;let Ye=K.findIndex(st=>st.id===be);Ye>=0&&(le=Ye)}let Ae=K.slice();Ae.splice(le,0,x),$.applyReorder(l,Ae,le)}function Ot(l){let m=l.target?.closest?.(".worker-pane");if(!m)return;l.preventDefault(),m.classList.remove("worker-pane--drag-over");let x=m.dataset.lane||"",K=A?.bead_id||l.dataTransfer?.getData("text/plain")||"",le=A?.from_lane||"";if(A=null,!K)return;let Ae=l.target?.closest?.(".worker-mini, .worker-card"),be=Array.from(m.querySelectorAll(".worker-mini, .worker-card")),Ye=be.length;if(Ae){let st=be.indexOf(Ae);st>=0&&(Ye=st)}if(Ye=Math.max(0,Ye-m.querySelectorAll(".worker-mini--ghost").length),m.classList.contains("worker-pane--collapsed")&&(Ye=Me()),x==="candidate"){if(le==="candidate"){wt(K,Ae);return}(le==="queue"||/^s[1-5]$/.test(le))&&tt(K);return}if(x==="queue"||/^s[1-5]$/.test(x)){let st=x==="queue"?"parallel":x;le===x?Ue(K,st,Ye):Fe(K,st)}}function sr(l){W=l,bg(l),J()}function or(l){ee=l==="board"||l==="created"||l==="spec"?l:lo,kg(ee),J()}function ar(l){D=zt(l)?l:Ft,xg(D),_?.(D),J()}function _r(l){let m=l.target?.closest?.(".worker-serial-lane-count");if(m){let Ye=Number.parseInt(m.value,10);Number.isFinite(Ye)&&ve(Ye).then(J);return}let x=l.target?.closest?.(".worker-filter__blocked");if(x){sr({...W,show_blocked:x.checked});return}let K=l.target?.closest?.(".worker-done-range");if(K){ar(K.value);return}let le=l.target?.closest?.(".worker-sort");if(le){or(le.value||lo);return}let Ae=l.target?.closest?.(".worker-slots__input");if(!Ae)return;let be=Number.parseInt(Ae.value,10);if(!Number.isFinite(be)){J();return}ae(be).then(J)}function kt(l){return l?{runner:l.runner||void 0,model:l.model||void 0,effort:l.effort||void 0,worktree:l.worktree||void 0,status:l.status||void 0,session_id:l.session_id||void 0}:{}}function Kt(){let l=Re();return{operations:l.repo_operations,cleanup_failures:l.cleanup_failures,repo:d&&d()||""}}function ir(){Be&&Te.close(),Ke.hidden=!1,_e.hidden=!1,Oe.open(Kt()),J()}function lr(l){let m=$e(),x=m.attempts?m.attempts[l]:null;Be=l,ue=null,Oe.close(),Ke.hidden=!0,_e.hidden=!1,Te.open({attempt_id:l,meta:kt(x)}),J()}function rt(l,m){Be=null,ue=l,Oe.close(),Ke.hidden=!0,_e.hidden=!1,Te.open({attempt_id:l,meta:m,hide_prompt:!0}),J()}function Nt(){if(Oe.isOpen()&&Oe.refresh(Kt()),ue){let x=(o?.get()?.runs||[]).find(K=>K.run_id===ue);x?Te.updateMeta(Pa(x)):Te.close();return}if(!Be)return;let l=$e(),m=l.attempts?l.attempts[Be]:null;if(m){Te.updateMeta(kt(m));return}Te.close()}function we(l){let m=l.target;if(m?.closest?.(".worker-mini__serial, .worker-mini__grip")||m?.closest?.("#worker-parallel-analysis-dialog"))return;if(m?.closest?.(".worker-analysis-btn")){Ze?.open();return}if(m?.closest?.(".worker-repo-strip")||m?.closest?.(".worker-mini__timeline")){ir();return}let x=m?.closest?.(".worker-repo-op__session");if(x){let Pe=x.dataset.attemptId;Pe&&lr(Pe);return}let K=m?.closest?.(".worker-repo-op__resolve");if(K){q(K.dataset.operationId||"");return}let le=m?.closest?.(".worker-repo-op__dismiss");if(le){fe(le.dataset.operationId||"");return}let Ae=m?.closest?.(".worker-cleanup__resume");if(Ae){let Pe=Ae.dataset.beadId;Pe&&nt(Pe);return}let be=m?.closest?.(".worker-banner__resume");if(be){let Pe=be.dataset.attemptId;Pe&&ot(Pe);return}let Ye=m?.closest?.(".worker-banner__discard");if(Ye){let Pe=Ye.dataset.confirmation==="merged"?"merged":"unmerged";G(Ye.dataset.beadId||"",Ye.dataset.attemptId||null,Pe,Ye.dataset.operationId||null);return}let st=m?.closest?.(".worker-banner__dismiss");if(st){let Pe=st.dataset.attemptId;Pe&&Y(Pe);return}if(m?.closest?.(".worker-play")){C(!$e().auto_advance);return}let Ne=m?.closest?.(".worker-merge-all");if(Ne){Ne.classList.contains("worker-merge-all--stop")?$e().auto_merge===!0?T(!1):L():T(!0);return}let p=m?.closest?.(".worker-pane__hd--toggle");if(p){let Pe=p.dataset.lane;(Pe==="queue"||Pe==="done")&&xe(Pe);return}let g=m?.closest?.(".worker-card__place-lane");if(g){let Pe=g.dataset.beadId,pt=g.dataset.lane;Pe&&(pt==="parallel"||/^s[1-5]$/.test(pt||""))&&(te=null,J(),Fe(Pe,pt));return}if(m?.closest?.(".worker-card__place-cancel")){te=null,J();return}let H=m?.closest?.(".worker-card__place");if(H){let Pe=H.dataset.beadId;Pe&&!H.disabled&&(Xe()?(te=Pe,J()):Fe(Pe,"parallel"));return}let ke=m?.closest?.(".worker-filter__chip");if(ke){let Pe=ke.dataset.spec;(Pe==="all"||Pe==="with"||Pe==="without")&&sr({...W,spec:Pe});return}let he=m?.closest?.(".worker-mini__merge");if(he){let Pe=he.dataset.beadId||"";$e().cleanup_failed?.[Pe]?nt(Pe):me(Pe);return}let Ce=m?.closest?.(".worker-mini__merge-cancel");if(Ce){M(Ce.dataset.beadId||"");return}let qe=m?.closest?.(".worker-mini__discard");if(qe){G(qe.dataset.beadId||"",qe.dataset.attemptId||null,qe.dataset.discardMode==="merged"?"merged":"unmerged",qe.dataset.operationId||null);return}let gt=m?.closest?.(".worker-mini__stale-continue");if(gt){se("worker-stale-work-continue",gt.dataset.beadId||"",gt.dataset.actionId||"");return}let cr=m?.closest?.(".worker-mini__stale-backup");if(cr){se("worker-stale-work-backup-fresh",cr.dataset.beadId||"",cr.dataset.actionId||"");return}let Kr=m?.closest?.(".worker-mini__stale-recheck");if(Kr){se("worker-stale-work-recheck",Kr.dataset.beadId||"",Kr.dataset.actionId||"");return}let Xn=m?.closest?.(".worker-mini__revise-fix");if(Xn){w("worker-revise-fix",Xn.dataset.beadId||"");return}let mn=m?.closest?.(".worker-mini__revise-approve");if(mn){w("worker-revise-approve",mn.dataset.beadId||"");return}if(m?.closest?.(".worker-mini__pr"))return;if(m?.closest?.(".rtile__discard")){let Pe=m?.closest?.(".rtile"),pt=Pe?.dataset?.beadId,Yr=Pe?.dataset?.attemptId;pt&&G(pt,Yr||null,"unmerged",m?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(m?.closest?.(".rtile__dismiss")){let pt=m?.closest?.(".rtile")?.dataset?.attemptId;pt&&Y(pt);return}if(m?.closest?.(".rtile__pause")){let pt=m?.closest?.(".rtile")?.dataset?.attemptId;pt&&ct(pt);return}if(m?.closest?.(".rtile__resume")){let pt=m?.closest?.(".rtile")?.dataset?.attemptId;pt&&ot(pt);return}if(m?.closest?.(".rtile__session")){let pt=m?.closest?.(".rtile")?.dataset?.attemptId;pt&&lr(pt);return}if(m?.closest?.(".worker-drawer-overlay__backdrop")){Oe.close(),Te.close();return}if(m?.closest?.(".worker-drawer-host"))return;let gn=m?.closest?.(".rtile");if(gn){if(m?.closest?.(".rtile__id")){let pt=gn.dataset.beadId;pt&&Qt(pt).then(Yr=>{Yr?ie("\uBCF5\uC0AC\uB428","success",1200):ie("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Pe=gn.dataset.beadId;Pe&&u&&u(Pe);return}let Qn=m?.closest?.(".worker-mini, .worker-card");if(Qn){let Pe=Qn.dataset.beadId;if(m?.closest?.(".worker-mini__id, .worker-card__id")){Pe&&Qt(Pe).then(pt=>{pt?ie("\uBCF5\uC0AC\uB428","success",1200):ie("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}Pe&&u&&u(Pe)}}return e.addEventListener("pointerdown",yt),e.addEventListener("dragstart",Qe),e.addEventListener("dragover",Et),e.addEventListener("dragleave",Vt),e.addEventListener("drop",Ot),e.addEventListener("click",we),e.addEventListener("change",_r),Ie(),Ee(),h&&F.push(h.subscribe(()=>{for(let[l,m]of N)m==="failed"&&N.delete(l);J()})),s&&F.push(s.subscribe(()=>{let l=d&&d()||"";l!==Se&&(Se=l,De.close()),J(),Nt()})),o&&typeof o.subscribe=="function"&&F.push(o.subscribe(()=>{Nt(),J()})),J(),{load(){J()},destroy(){for(let l of F.splice(0))try{l()}catch{}e.removeEventListener("pointerdown",yt),e.removeEventListener("dragstart",Qe),e.removeEventListener("dragover",Et),e.removeEventListener("dragleave",Vt),e.removeEventListener("drop",Ot),e.removeEventListener("click",we),e.removeEventListener("change",_r);try{Te.destroy()}catch{}_e.hidden=!0;try{Ze?.destroy()}catch{}try{De.destroy()}catch{}Ge(i``,e)}}}function Fa(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function Ju(e,t,r,n=async()=>{},s=async()=>{}){let o=mt("views:workspace-picker"),a=null,c=!1,u=!1,d=!1;async function f(j){let E=j.target.value,ne=t.getState().workspace?.current?.path||"";if(E&&E!==ne){o("switching workspace to %s",E),c=!0,R();try{await r(E)}catch(P){o("workspace switch failed: %o",P)}finally{c=!1,R()}}}async function _(){let j=t.getState(),b=j.workspace?.current?.path||j.workspace?.available?.[0]?.path||"";if(!(!b||u)){o("git-pulling workspace %s",b),u=!0,R();try{await n(b)}catch(E){o("workspace git pull failed: %o",E)}finally{u=!1,R()}}}function h(j){let b=j.target;b&&e.contains(b)||O()}function $(j){j.key==="Escape"&&O()}function A(){d||(d=!0,document.addEventListener("mousedown",h),document.addEventListener("keydown",$),R())}function O(){d&&(d=!1,document.removeEventListener("mousedown",h),document.removeEventListener("keydown",$),R())}function W(){d?O():A()}async function te(j){let b=j.target,E=b.value,V=b.checked;o("toggling visibility %s \u2192 %s",E,String(V));try{await s(E,V)}catch(ne){o("workspace visibility toggle failed: %o",ne)}}function ee(j){return j?i`
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
    `:i``}function D(j,b){return i`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${W}
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
                ${j.map(E=>i`
                    <label
                      class="workspace-picker__manage-row"
                      title="${E.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${E.path}"
                        .checked=${!b.has(E.path)}
                        @change=${te}
                      />
                      <span class="workspace-picker__manage-name"
                        >${Fa(E.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function N(){let j=t.getState(),b=j.workspace?.current,E=j.workspace?.available||[],V=new Set(j.workspace?.hidden||[]),ne=b?.path||E[0]?.path||"";if(E.length===0)return i``;let P=E.filter(F=>!V.has(F.path)||F.path===ne);if(P.length<=1){let F=P[0]||E[0],pe=Fa(F.path);return i`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${F.path}"
            >${pe}</span
          >
          ${D(E,V)}
          ${ee(ne)}
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
          ${P.map(F=>i`
              <option
                value="${F.path}"
                ?selected=${F.path===ne}
                title="${F.path}"
              >
                ${Fa(F.path)}
              </option>
            `)}
        </select>
        ${D(E,V)}
        ${ee(ne)}
        ${c||u?i`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function R(){Ge(N(),e)}return R(),a=t.subscribe(()=>R()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",h),document.removeEventListener("keydown",$),Ge(i``,e)}}}var ed=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-serial-lane-count","subscribe-worker-parallel-analysis","unsubscribe-worker-parallel-analysis","worker-parallel-analysis-snapshot","worker-parallel-analysis-targets","worker-parallel-analysis-prompt","worker-parallel-analysis-start","worker-parallel-analysis-cancel","worker-parallel-analysis-settings-update","worker-parallel-analysis-submit","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle"];function ja(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function td(e,t,r=ja()){return{id:r,type:e,payload:t}}function rd(e={}){let t=mt("ws"),r={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},n=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,c=null,u=!0,d=new Map,f=[],_=new Map,h=new Set;function $(N){for(let R of Array.from(h))try{R(N)}catch{}}function A(){if(!u||c)return;o="reconnecting",t("ws reconnecting\u2026"),$(o);let N=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,a)),R=(r.jitterRatio||0)*N,j=Math.max(0,Math.round(N+(Math.random()*2-1)*R));t("ws retry in %d ms (attempt %d)",j,a+1),c=setTimeout(()=>{c=null,D()},j)}function O(N){try{s?.send(JSON.stringify(N))}catch(R){t("ws send failed",R)}}function W(){for(o="open",t("ws open"),$(o),a=0;f.length;){let N=f.shift();N&&O(N)}}function te(N){let R;try{R=JSON.parse(String(N.data))}catch{t("ws received non-JSON message");return}if(!R||typeof R.id!="string"||typeof R.type!="string"){t("ws received invalid envelope");return}if(d.has(R.id)){let b=d.get(R.id);d.delete(R.id),R.ok?b?.resolve(R.payload):b?.reject(R.error||new Error("ws error"));return}let j=_.get(R.type);if(j&&j.size>0)for(let b of Array.from(j))try{b(R.payload)}catch(E){t("ws event handler error",E)}else t("ws received unhandled message type: %s",R.type)}function ee(){o="closed",t("ws closed"),$(o);for(let[N,R]of d.entries())R.reject(new Error("ws disconnected")),d.delete(N);a+=1,A()}function D(){if(!u)return;let N=n();try{s=new WebSocket(N),t("ws connecting %s",N),o="connecting",$(o),s.addEventListener("open",W),s.addEventListener("message",te),s.addEventListener("error",()=>{}),s.addEventListener("close",ee)}catch(R){t("ws connect failed %o",R),A()}}return D(),{send(N,R){if(!ed.includes(N))return Promise.reject(new Error(`unknown message type: ${N}`));let j=ja(),b=td(N,R,j);return t("send %s id=%s",N,j),new Promise((E,V)=>{d.set(j,{resolve:E,reject:V,type:N}),s&&s.readyState===s.OPEN?O(b):(t("queue %s id=%s (state=%s)",N,j,o),f.push(b))})},on(N,R){_.has(N)||_.set(N,new Set);let j=_.get(N);return j?.add(R),()=>{j?.delete(R)}},onConnection(N){return h.add(N),()=>{h.delete(N)}},reconnect(){u=!0,c&&(clearTimeout(c),c=null),a=0,D()},close(){u=!1,c&&(clearTimeout(c),c=null);try{s?.close()}catch{}},getState(){return o}}}function Fg(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function jg(e,t){try{let n=await(await fetch("/api/config")).json();e.setState({config:n})}catch(r){t("config refresh failed",r)}}var Ba=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],nd=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:closed","closed-issues"]],Ir="tab:worker:closed",Bg="bdui.worker.done-range",sd=cu,od="worker:queue",ad="worker:parallel-analysis",id="ui:order",ld="ui:display-policy",cd="exec:presets",Lr="tab:board:closed",ud="beads-ui.board.closed-range";function Ug(e){let t=mt("main");t("bootstrap start");let r=i`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Ge(r,e);let n=document.getElementById("global-nav"),s=document.getElementById("top-nav"),o=document.getElementById("repo-scope"),a=document.getElementById("usage-meter"),c=document.getElementById("board-root"),u=document.getElementById("worker-root"),d=document.getElementById("monitor-root"),f=document.getElementById("detail-panel");if(a&&Tu(a),c&&u&&d&&f){let Be=function(p,g){let k="Request failed",H="";if(p&&typeof p=="object"){let he=p;if(typeof he.message=="string"&&he.message.length>0&&(k=he.message),typeof he.details=="string")H=he.details;else if(he.details&&typeof he.details=="object")try{H=JSON.stringify(he.details,null,2)}catch{H=""}}else typeof p=="string"&&p.length>0&&(k=p);let ke=g&&g.length>0?`Failed to load ${g}`:"Request failed";Le.open(ke,k,H)},re=function(p){return`${rt.getState().workspace.current?.path||""}\0${p}`},me=function(){oe&&(oe().catch(()=>{}),oe=null),Me=null,Fe=null},ge=function(p){Ue=p;let g=()=>{Ue!==p||rt.getState().selected_id!==p||(Ue=null,nt(p))};if(!ot){ct.then(g);return}g()},G=function(p,g,k,H,ke){return k!==L[g]?(ke().catch(()=>{}),!1):(p.set(H,ke),!0)},w=function(){let p=rt.getState();ve(p.view==="board"),de(p.view==="worker"),xe(p.view==="monitor"),S(p.view==="board"||p.view==="worker"||se||!!p.selected_id)},fe=function(){let p=qr(C);return p===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:p}}},ae=function(){let p=qr(q);return p===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:p}}},ve=function(p){if(p)for(let[g,k]of Ba){if(T.has(g)||M.has(g))continue;let H=g===Lr?fe():{type:k};try{De.register(g,H)}catch(Ce){t("register %s store failed: %o",g,Ce)}M.add(g);let ke=L.board,he=!1;Oe.subscribeList(g,H).then(Ce=>{he=!G(T,"board",ke,g,Ce)}).catch(Ce=>{t("subscribe %s failed: %o",g,Ce),Be(Ce,"board")}).finally(()=>{M.delete(g),he&&w()})}else He()},He=function(){L.board+=1;for(let[p]of Ba){let g=T.get(p);g&&(g().catch(()=>{}),T.delete(p));try{De.unregister(p)}catch(k){t("unregister %s failed: %o",p,k)}}},de=function(p){if(!p){v();return}for(let[g,k]of nd){if(U.has(g)||M.has(g))continue;let H=g===Ir?ae():{type:k};try{De.register(g,H)}catch(Ce){t("register %s store failed: %o",g,Ce)}M.add(g);let ke=L.worker,he=!1;Oe.subscribeList(g,H).then(Ce=>{he=!G(U,"worker",ke,g,Ce)}).catch(Ce=>{t("subscribe %s failed: %o",g,Ce),Be(Ce,"worker")}).finally(()=>{M.delete(g),he&&w()})}},v=function(){L.worker+=1;for(let[p]of nd){let g=U.get(p);g&&(g().catch(()=>{}),U.delete(p));try{De.unregister(p)}catch(k){t("unregister %s failed: %o",p,k)}}},S=function(p){if(!p){I();return}Q||(Te("subscribe-worker-queue",{id:od}).catch(g=>{t("subscribe-worker-queue failed: %o",g)}),Te("subscribe-worker-parallel-analysis",{id:ad}).catch(g=>{t("subscribe-worker-parallel-analysis failed: %o",g)}),Q=()=>(Te("unsubscribe-worker-parallel-analysis",{id:ad}),Te("unsubscribe-worker-queue",{id:od})))},I=function(){Q&&(Q().catch(()=>{}),Q=null),We.clear()},xe=function(p){if(!p){J();return}X||(Te("subscribe-monitor-pipeline",{id:sd}).catch(g=>{t("subscribe-monitor-pipeline failed: %o",g)}),X=()=>Te("unsubscribe-monitor-pipeline",{id:sd}))},J=function(){X&&(X().catch(()=>{}),X=null)},Ie=function(){Ee||(Te("subscribe-ui-order",{id}).catch(p=>{t("subscribe-ui-order failed: %o",p)}),Ee=()=>Te("unsubscribe-ui-order",{id}))},ht=function(){Ee&&(Ee().catch(()=>{}),Ee=null),$e.clear()},Qe=function(){yt||(Te("subscribe-display-policy",{id:ld}).catch(p=>{t("subscribe-display-policy failed: %o",p)}),yt=()=>Te("unsubscribe-display-policy",{id:ld}))},Et=function(){yt&&(yt().catch(()=>{}),yt=null),Xe.clear()},wt=function(){Vt||(Te("subscribe-impl-presets",{id:cd}).catch(p=>{t("subscribe-impl-presets failed: %o",p)}),Vt=()=>Te("unsubscribe-impl-presets",{id:cd}))},kt=function(p){if(!p)return"Unknown";let g=p.split("/").filter(Boolean);return g.length>0?g[g.length-1]:"Unknown"};var _=Be,h=re,$=me,A=ge,O=G,W=w,te=fe,ee=ae,D=ve,N=He,R=de,j=v,b=S,E=I,V=xe,ne=J,P=Ie,F=ht,pe=Qe,ye=Et,_e=wt,je=kt;let et=document.getElementById("header-loading"),Ke=Zi(et),Le=Ec(e),ue=rd(),Te=Ke.wrapSend((p,g)=>ue.send(p,g)),Oe=Ui(Te),De=Wi(),Se=Gi(),We=Hi(),Ze=Ei(),$e=zi(),Xe=Ai(),Z=Si(),z=Ti();ue.on("impl-presets-snapshot",p=>{let g=p;g&&typeof g.revision=="number"&&Array.isArray(g.presets)&&Z.set({revision:g.revision,presets:g.presets})}),ue.on("monitor-pipeline-snapshot",p=>{let g=p;if(!(!g||!Array.isArray(g.workspaces)))try{Ze.set(g.workspaces,g.workspaces_state)}catch{}}),ue.on("ui-order-snapshot",p=>{let g=p;if(g&&typeof g.revision=="number")try{$e.set({revision:g.revision,order:g.order&&typeof g.order=="object"?g.order:{}})}catch{}}),ue.on("display-policy-snapshot",p=>{let g=p;if(g&&g.policy&&typeof g.policy=="object")try{Xe.set(g.policy)}catch{}}),ue.on("session-log-snapshot",p=>{let g=p;if(g&&typeof g.id=="string")try{z.set(g.id,Array.isArray(g.lines)?g.lines:[],typeof g.last_event_at=="number"?g.last_event_at:null)}catch{}}),ue.on("session-log-append",p=>{let g=p;if(g&&typeof g.id=="string")try{z.append(g.id,g.event)}catch{}}),ue.on("snapshot",p=>{let g=p,k=g&&typeof g.id=="string"?g.id:"",H=k?De.getStore(k):null;if(H&&g&&g.type==="snapshot")try{H.applyPush(g)}catch{}}),ue.on("upsert",p=>{let g=p,k=g&&typeof g.id=="string"?g.id:"",H=k?De.getStore(k):null;if(H&&g&&g.type==="upsert")try{H.applyPush(g)}catch{}}),ue.on("delete",p=>{let g=p,k=g&&typeof g.id=="string"?g.id:"",H=k?De.getStore(k):null;if(H&&g&&g.type==="delete")try{H.applyPush(g)}catch{}});let oe=null,Me=null,Fe=null,Ue=null,tt=()=>{},ct=new Promise(p=>{tt=()=>p(void 0)}),ot=!1,Y=!1;async function nt(p){let g=re(p);if(g===Me||g===Fe)return;Fe=g;let k=`detail:${p}`,H={type:"issue-detail",params:{id:p}};try{De.register(k,H)}catch(ke){t("register detail store failed: %o",ke)}try{let ke=await Oe.subscribeList(k,H);if(rt.getState().selected_id!==p||re(p)!==g){await ke().catch(()=>{});return}oe&&await oe().catch(()=>{}),oe=ke,Me=g}catch(ke){t("detail subscribe failed: %o",ke),Be(ke,"issue details")}finally{Fe===g&&(Fe=null)}}let T=new Map,M=new Set,L={board:0,worker:0},se=!1,C=Ft;try{let p=window.localStorage.getItem(ud);zt(p)&&(C=p)}catch{}let q=Ft;try{let p=window.localStorage.getItem(Bg);zt(p)&&(q=p)}catch{}async function Re(p){if(!zt(p)||p===C)return;C=p;try{window.localStorage.setItem(ud,p)}catch{}let g=T.get(Lr);if(!g)return;T.delete(Lr),await g().catch(()=>{});let k=fe();try{De.register(Lr,k)}catch(H){t("register %s store failed: %o",Lr,H)}try{let H=await Oe.subscribeList(Lr,k);T.set(Lr,H)}catch(H){t("re-subscribe %s failed: %o",Lr,H),Be(H,"board")}}async function ze(p){if(!zt(p)||p===q)return;q=p;let g=U.get(Ir);if(!g)return;U.delete(Ir),await g().catch(()=>{});let k=ae();try{De.register(Ir,k)}catch(H){t("register %s store failed: %o",Ir,H)}try{let H=await Oe.subscribeList(Ir,k);U.set(Ir,H)}catch(H){t("re-subscribe %s failed: %o",Ir,H),Be(H,"worker")}}let U=new Map,Q=null,X=null,Ee=null,yt=null,Vt=null;async function Ot(){yt=null,Xe.clear(),Vt=null,Z.clear(),Q=null,X=null,T.clear(),U.clear(),L.board+=1,L.worker+=1,wt();let p=rt.getState().workspace.current?.path;if(p)try{await ue.send("set-workspace",{path:p})}catch(k){t("workspace restore after reconnect failed: %o",k);return}Qe();let g=rt.getState();ve(g.view==="board"),de(g.view==="worker"),xe(g.view==="monitor"),S(g.view==="board"||g.view==="worker"||!!g.selected_id)}async function sr(){t("clearing all subscriptions for workspace switch"),He(),v(),I(),Se.clear(),ht(),Ie(),Et(),Qe(),me();let p=rt.getState();if(p.selected_id)try{De.unregister(`detail:${p.selected_id}`)}catch{}let g=rt.getState();ve(g.view==="board"),de(g.view==="worker"),xe(g.view==="monitor"),S(g.view==="board"||g.view==="worker"||!!g.selected_id),g.selected_id&&ge(g.selected_id)}async function or(p){t("requesting workspace switch to %s",p),Y=!0;try{let g=await ue.send("set-workspace",{path:p});t("workspace switch result: %o",g),g&&g.workspace&&(rt.setState({workspace:{current:{path:g.workspace.root_dir,database:g.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",p),g.changed&&(await sr(),ie("Switched to "+kt(p),"success",2e3)))}catch(g){throw t("workspace switch failed: %o",g),ie("Failed to switch workspace","error",3e3),g}finally{Y=!1}}async function ar(p){t("requesting workspace git pull for %s",p);try{let g=await ue.send("git-pull-workspace",{});t("workspace git pull result: %o",g);let k=g?.status;if(k==="up_to_date"){ie("Already up to date","success",2e3);return}if(k==="stash_pop_conflict"){ie("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}ie("Git pulled "+kt(p),"success",2e3)}catch(g){t("workspace git pull failed: %o",g);let k=g?.code,H=g?.message;if(k==="rebase_conflict"){ie("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(k==="rebase_conflict_abort_failed"){ie("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(k==="busy"){ie("Git pull skipped: another operation is running","warning",3e3);return}let ke=H?`: ${H}`:"";throw ie(`Git pull failed${ke}`,"error",3e3),g}}async function _r(p,g){t("setting workspace visibility %s \u2192 %s",p,String(g));try{await ue.send("set-workspace-visibility",{path:p,visible:g}),await Kt()}catch(k){t("workspace visibility update failed: %o",k),ie("Failed to update project visibility","error",3e3)}}async function Kt(){try{let p=await ue.send("list-workspaces",{});if(t("workspaces loaded: %o",p),p&&Array.isArray(p.workspaces)){let g=p.workspaces.map(he=>({path:he.path,database:he.database,pid:he.pid,version:he.version})),k=p.current?{path:p.current.root_dir,database:p.current.db_path}:null,H=Array.isArray(p.hidden)?p.hidden.filter(he=>typeof he=="string"):[];rt.setState({workspace:{current:k,available:g,hidden:H}});let ke=window.localStorage.getItem("beads-ui.workspace");ke&&(!g.some(Ce=>Ce.path===ke)||H.includes(ke)?window.localStorage.removeItem("beads-ui.workspace"):k&&ke!==k.path&&(t("restoring saved workspace preference: %s",ke),await or(ke)))}}catch(p){t("failed to load workspaces: %o",p)}}ue.on("workspace-changed",p=>{t("workspace-changed event: %o",p),p&&p.root_dir&&(rt.setState({workspace:{current:{path:p.root_dir,database:p.db_path}}}),Kt(),sr())});let ir=!1;if(typeof ue.onConnection=="function"){let p=g=>{t("ws state %s",g),g==="reconnecting"||g==="closed"?(ir=!0,ie("Connection lost. Reconnecting\u2026","error",4e3)):g==="open"&&ir&&(ir=!1,ie("Reconnected","success",2200),jg(rt,(k,H)=>{t(`${k}: %o`,H)}),Ot())};ue.onConnection(p)}let lr="board";try{let p=window.localStorage.getItem("beads-ui.view");(p==="board"||p==="worker"||p==="monitor")&&(lr=p)}catch(p){t("view parse error: %o",p)}let rt=Yi({config:Fg(),view:lr});ue.on("worker-queue-snapshot",p=>{let g=p;if(!g||!g.queue)return;let k=rt.getState().workspace.current?.path;if(typeof k=="string"&&k.length>0&&g.root_dir!==k){t("dropping worker-queue snapshot for %s",String(g.root_dir));return}try{Se.set(g.queue)}catch{}}),ue.on("worker-parallel-analysis-snapshot",p=>{let g=p;if(!g)return;let k=rt.getState().workspace.current?.path;if(!(typeof k=="string"&&k.length>0&&typeof g.root_dir=="string"&&g.root_dir!==k))try{We.set({settings:g.settings,job:g.job??null,runs:Array.isArray(g.runs)?g.runs:[],last_good:g.last_good??null})}catch{}});let Nt=Vi(rt);Nt.start();let we=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults"]),l=async(p,g)=>{try{return await Te(p,g)}catch(k){if(we.has(p))throw k;return[]}};du({global_element:n,repo_element:s},rt,Nt);let m=document.getElementById("workspace-picker");m&&Ju(m,rt,or,ar,_r);let x=mu(e,(p,g)=>Te(p,g));try{let p=document.getElementById("new-issue-btn");p&&p.addEventListener("click",()=>x.open())}catch{}let K=yu(e,{policyStore:Xe,queueStore:Se,implPresetStore:Z,transport:(p,g)=>Te(p,g),onOpenChange:p=>{se=p,w()},labelOptions:()=>{let p=new Set;for(let[g]of Ba)for(let k of De.snapshotFor(g)||[]){let H=k.labels;if(Array.isArray(H))for(let ke of H)typeof ke=="string"&&ke.length>0&&p.add(ke)}return Array.from(p).sort()}});try{let p=document.getElementById("display-settings-btn");p&&(p.setAttribute("aria-label","\uC124\uC815"),p.setAttribute("title","\uC124\uC815"),p.addEventListener("click",()=>K.open()))}catch{}let le=il(c,{gotoIssue:p=>Nt.gotoIssue(p),issueStores:De,transport:l,workerQueueStore:Se,uiOrderStore:$e,displayPolicyStore:Xe,closedRange:C,onClosedRangeChange:p=>{Re(p)},onNewIssue:()=>x.open()}),Ae=qa(u,{transport:l,issueStores:De,queueStore:Se,analysisStore:We,sessionLogStore:z,uiOrderStore:$e,gotoIssue:p=>rt.setState({selected_id:p}),getWorkspacePath:()=>rt.getState().workspace.current?.path,doneRange:q,onDoneRangeChange:p=>{ze(p)}}),be=uu(d,{transport:l,pipelineStore:Ze,execPresetStore:Z,gotoIssue:p=>Nt.gotoIssue(p),getWorkspacePath:()=>rt.getState().workspace.current?.path,switchWorkspace:p=>or(p)}),Ye=Sc(f,{issueStores:De,transport:l,queueStore:Se,execPresetStore:Z,sessionLogStore:z,getWorkspacePath:()=>rt.getState().workspace.current?.path,onNavigate:p=>{rt.getState().view==="worker"?rt.setState({selected_id:p}):Nt.gotoIssue(p)},onClose:()=>{let p=rt.getState();rt.setState({selected_id:null});try{Nt.gotoView(p.view==="worker"||p.view==="monitor"?p.view:"board")}catch{}},onOpenExecPresets:()=>{K.open("execution")}}),st=rt.getState().selected_id;st&&(f.hidden=!1,Ye.load(st),ge(st)),rt.subscribe(p=>{let g=p.selected_id;g?(f.hidden=!1,Ye.load(g),Y||ge(g)):(Ye.clear(),f.hidden=!0,me())});let Ne=p=>{c.hidden=p.view!=="board",u.hidden=p.view!=="worker",d.hidden=p.view!=="monitor",o&&o.classList.toggle("is-quiet",p.view==="monitor"),ve(p.view==="board"),de(p.view==="worker"),xe(p.view==="monitor"),S(p.view==="board"||p.view==="worker"||se||!!p.selected_id),!p.selected_id&&p.view==="board"&&le.load(),p.view==="worker"&&Ae.load(),p.view==="monitor"?be.load():be.pause(),window.localStorage.setItem("beads-ui.view",p.view)};rt.subscribe(Ne),Ne(rt.getState()),Ie(),Qe(),wt(),Kt().finally(()=>{ot=!0,tt()}),window.addEventListener("keydown",p=>{let g=p.ctrlKey||p.metaKey,k=String(p.key||"").toLowerCase(),H=p.target,ke=H&&H.tagName?String(H.tagName).toLowerCase():"",he=ke==="input"||ke==="textarea"||ke==="select"||H&&typeof H.isContentEditable=="boolean"&&H.isContentEditable;g&&k==="n"&&(he||(p.preventDefault(),x.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let r=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let t=document.getElementById("app");t&&Ug(t)});export{Ug as bootstrap,Fg as readBootstrapConfig,jg as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
