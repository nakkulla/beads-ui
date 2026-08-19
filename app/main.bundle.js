var Kd=Object.create;var lo=Object.defineProperty;var Zd=Object.getOwnPropertyDescriptor;var Xd=Object.getOwnPropertyNames;var Qd=Object.getPrototypeOf,Jd=Object.prototype.hasOwnProperty;var eu=(e,t,r)=>t in e?lo(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var co=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var tu=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Xd(t))!Jd.call(e,s)&&s!==r&&lo(e,s,{get:()=>t[s],enumerable:!(n=Zd(t,s))||n.enumerable});return e};var ru=(e,t,r)=>(r=e!=null?Kd(Qd(e)):{},tu(t||!e||!e.__esModule?lo(r,"default",{value:e,enumerable:!0}):r,e));var it=(e,t,r)=>eu(e,typeof t!="symbol"?t+"":t,r);var mi=co((Jm,_i)=>{var Vr=1e3,Yr=Vr*60,Kr=Yr*60,Mr=Kr*24,ou=Mr*7,au=Mr*365.25;_i.exports=function(e,t){t=t||{};var r=typeof e;if(r==="string"&&e.length>0)return iu(e);if(r==="number"&&isFinite(e))return t.long?cu(e):lu(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function iu(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*au;case"weeks":case"week":case"w":return r*ou;case"days":case"day":case"d":return r*Mr;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Kr;case"minutes":case"minute":case"mins":case"min":case"m":return r*Yr;case"seconds":case"second":case"secs":case"sec":case"s":return r*Vr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function lu(e){var t=Math.abs(e);return t>=Mr?Math.round(e/Mr)+"d":t>=Kr?Math.round(e/Kr)+"h":t>=Yr?Math.round(e/Yr)+"m":t>=Vr?Math.round(e/Vr)+"s":e+"ms"}function cu(e){var t=Math.abs(e);return t>=Mr?rs(e,t,Mr,"day"):t>=Kr?rs(e,t,Kr,"hour"):t>=Yr?rs(e,t,Yr,"minute"):t>=Vr?rs(e,t,Vr,"second"):e+" ms"}function rs(e,t,r,n){var s=t>=r*1.5;return Math.round(e/r)+" "+n+(s?"s":"")}});var bi=co((eg,gi)=>{function du(e){r.debug=r,r.default=r,r.coerce=l,r.disable=a,r.enable=s,r.enabled=i,r.humanize=mi(),r.destroy=d,Object.keys(e).forEach(p=>{r[p]=e[p]}),r.names=[],r.skips=[],r.formatters={};function t(p){let _=0;for(let g=0;g<p.length;g++)_=(_<<5)-_+p.charCodeAt(g),_|=0;return r.colors[Math.abs(_)%r.colors.length]}r.selectColor=t;function r(p){let _,g=null,S,$;function N(...M){if(!N.enabled)return;let E=N,B=Number(new Date),Z=B-(_||B);E.diff=Z,E.prev=_,E.curr=B,_=B,M[0]=r.coerce(M[0]),typeof M[0]!="string"&&M.unshift("%O");let T=0;M[0]=M[0].replace(/%([a-zA-Z%])/g,(R,F)=>{if(R==="%%")return"%";T++;let te=r.formatters[F];if(typeof te=="function"){let pe=M[T];R=te.call(E,pe),M.splice(T,1),T--}return R}),r.formatArgs.call(E,M),(E.log||r.log).apply(E,M)}return N.namespace=p,N.useColors=r.useColors(),N.color=r.selectColor(p),N.extend=n,N.destroy=r.destroy,Object.defineProperty(N,"enabled",{enumerable:!0,configurable:!1,get:()=>g!==null?g:(S!==r.namespaces&&(S=r.namespaces,$=r.enabled(p)),$),set:M=>{g=M}}),typeof r.init=="function"&&r.init(N),N}function n(p,_){let g=r(this.namespace+(typeof _>"u"?":":_)+p);return g.log=this.log,g}function s(p){r.save(p),r.namespaces=p,r.names=[],r.skips=[];let _=(typeof p=="string"?p:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let g of _)g[0]==="-"?r.skips.push(g.slice(1)):r.names.push(g)}function o(p,_){let g=0,S=0,$=-1,N=0;for(;g<p.length;)if(S<_.length&&(_[S]===p[g]||_[S]==="*"))_[S]==="*"?($=S,N=g,S++):(g++,S++);else if($!==-1)S=$+1,N++,g=N;else return!1;for(;S<_.length&&_[S]==="*";)S++;return S===_.length}function a(){let p=[...r.names,...r.skips.map(_=>"-"+_)].join(",");return r.enable(""),p}function i(p){for(let _ of r.skips)if(o(p,_))return!1;for(let _ of r.names)if(o(p,_))return!0;return!1}function l(p){return p instanceof Error?p.stack||p.message:p}function d(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}gi.exports=du});var hi=co((Dt,ns)=>{Dt.formatArgs=pu;Dt.save=fu;Dt.load=_u;Dt.useColors=uu;Dt.storage=mu();Dt.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();Dt.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function uu(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function pu(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+ns.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let r=0,n=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),e.splice(n,0,t)}Dt.log=console.debug||console.log||(()=>{});function fu(e){try{e?Dt.storage.setItem("debug",e):Dt.storage.removeItem("debug")}catch{}}function _u(){let e;try{e=Dt.storage.getItem("debug")||Dt.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function mu(){try{return localStorage}catch{}}ns.exports=bi()(Dt);var{formatters:gu}=ns.exports;gu.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var dn=globalThis,Zn=dn.trustedTypes,Ja=Zn?Zn.createPolicy("lit-html",{createHTML:e=>e}):void 0,po="$lit$",pr=`lit$${Math.random().toFixed(9).slice(2)}$`,fo="?"+pr,nu=`<${fo}>`,Lr=document,un=()=>Lr.createComment(""),pn=e=>e===null||typeof e!="object"&&typeof e!="function",_o=Array.isArray,oi=e=>_o(e)||typeof e?.[Symbol.iterator]=="function",uo=`[ 	
\f\r]`,cn=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ei=/-->/g,ti=/>/g,Rr=RegExp(`>|${uo}(?:([^\\s"'>=/]+)(${uo}*=${uo}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ri=/'/g,ni=/"/g,ai=/^(?:script|style|textarea|title)$/i,mo=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),c=mo(1),kr=mo(2),Gm=mo(3),Bt=Symbol.for("lit-noChange"),mt=Symbol.for("lit-nothing"),si=new WeakMap,Ir=Lr.createTreeWalker(Lr,129);function ii(e,t){if(!_o(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ja!==void 0?Ja.createHTML(t):t}var li=(e,t)=>{let r=e.length-1,n=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=cn;for(let i=0;i<r;i++){let l=e[i],d,p,_=-1,g=0;for(;g<l.length&&(a.lastIndex=g,p=a.exec(l),p!==null);)g=a.lastIndex,a===cn?p[1]==="!--"?a=ei:p[1]!==void 0?a=ti:p[2]!==void 0?(ai.test(p[2])&&(s=RegExp("</"+p[2],"g")),a=Rr):p[3]!==void 0&&(a=Rr):a===Rr?p[0]===">"?(a=s??cn,_=-1):p[1]===void 0?_=-2:(_=a.lastIndex-p[2].length,d=p[1],a=p[3]===void 0?Rr:p[3]==='"'?ni:ri):a===ni||a===ri?a=Rr:a===ei||a===ti?a=cn:(a=Rr,s=void 0);let S=a===Rr&&e[i+1].startsWith("/>")?" ":"";o+=a===cn?l+nu:_>=0?(n.push(d),l.slice(0,_)+po+l.slice(_)+pr+S):l+pr+(_===-2?i:S)}return[ii(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},fn=class e{constructor({strings:t,_$litType$:r},n){let s;this.parts=[];let o=0,a=0,i=t.length-1,l=this.parts,[d,p]=li(t,r);if(this.el=e.createElement(d,n),Ir.currentNode=this.el.content,r===2||r===3){let _=this.el.content.firstChild;_.replaceWith(..._.childNodes)}for(;(s=Ir.nextNode())!==null&&l.length<i;){if(s.nodeType===1){if(s.hasAttributes())for(let _ of s.getAttributeNames())if(_.endsWith(po)){let g=p[a++],S=s.getAttribute(_).split(pr),$=/([.?@])?(.*)/.exec(g);l.push({type:1,index:o,name:$[2],strings:S,ctor:$[1]==="."?Qn:$[1]==="?"?Jn:$[1]==="@"?es:Pr}),s.removeAttribute(_)}else _.startsWith(pr)&&(l.push({type:6,index:o}),s.removeAttribute(_));if(ai.test(s.tagName)){let _=s.textContent.split(pr),g=_.length-1;if(g>0){s.textContent=Zn?Zn.emptyScript:"";for(let S=0;S<g;S++)s.append(_[S],un()),Ir.nextNode(),l.push({type:2,index:++o});s.append(_[g],un())}}}else if(s.nodeType===8)if(s.data===fo)l.push({type:2,index:o});else{let _=-1;for(;(_=s.data.indexOf(pr,_+1))!==-1;)l.push({type:7,index:o}),_+=pr.length-1}o++}}static createElement(t,r){let n=Lr.createElement("template");return n.innerHTML=t,n}};function Or(e,t,r=e,n){if(t===Bt)return t;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=pn(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(t=Or(e,s._$AS(e,t.values),s,n)),t}var Xn=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:n}=this._$AD,s=(t?.creationScope??Lr).importNode(r,!0);Ir.currentNode=s;let o=Ir.nextNode(),a=0,i=0,l=n[0];for(;l!==void 0;){if(a===l.index){let d;l.type===2?d=new Gr(o,o.nextSibling,this,t):l.type===1?d=new l.ctor(o,l.name,l.strings,this,t):l.type===6&&(d=new ts(o,this,t)),this._$AV.push(d),l=n[++i]}a!==l?.index&&(o=Ir.nextNode(),a++)}return Ir.currentNode=Lr,s}p(t){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}},Gr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,n,s){this.type=2,this._$AH=mt,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=Or(this,t,r),pn(t)?t===mt||t==null||t===""?(this._$AH!==mt&&this._$AR(),this._$AH=mt):t!==this._$AH&&t!==Bt&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):oi(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==mt&&pn(this._$AH)?this._$AA.nextSibling.data=t:this.T(Lr.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=fn.createElement(ii(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new Xn(s,this),a=o.u(this.options);o.p(r),this.T(a),this._$AH=o}}_$AC(t){let r=si.get(t.strings);return r===void 0&&si.set(t.strings,r=new fn(t)),r}k(t){_o(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of t)s===r.length?r.push(n=new e(this.O(un()),this.O(un()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Pr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,n,s,o){this.type=1,this._$AH=mt,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=mt}_$AI(t,r=this,n,s){let o=this.strings,a=!1;if(o===void 0)t=Or(this,t,r,0),a=!pn(t)||t!==this._$AH&&t!==Bt,a&&(this._$AH=t);else{let i=t,l,d;for(t=o[0],l=0;l<o.length-1;l++)d=Or(this,i[n+l],r,l),d===Bt&&(d=this._$AH[l]),a||(a=!pn(d)||d!==this._$AH[l]),d===mt?t=mt:t!==mt&&(t+=(d??"")+o[l+1]),this._$AH[l]=d}a&&!s&&this.j(t)}j(t){t===mt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Qn=class extends Pr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===mt?void 0:t}},Jn=class extends Pr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==mt)}},es=class extends Pr{constructor(t,r,n,s,o){super(t,r,n,s,o),this.type=5}_$AI(t,r=this){if((t=Or(this,t,r,0)??mt)===Bt)return;let n=this._$AH,s=t===mt&&n!==mt||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==mt&&(n===mt||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},ts=class{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){Or(this,t)}},ci={M:po,P:pr,A:fo,C:1,L:li,R:Xn,D:oi,V:Or,I:Gr,H:Pr,N:Jn,U:es,B:Qn,F:ts},su=dn.litHtmlPolyfillSupport;su?.(fn,Gr),(dn.litHtmlVersions??(dn.litHtmlVersions=[])).push("3.3.1");var je=(e,t,r)=>{let n=r?.renderBefore??t,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new Gr(t.insertBefore(un(),o),o,void 0,r??{})}return s._$AI(e),s};var Nt="today",or=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Ut(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function Dr(e,t=Date.now()){switch(e){case"today":{let r=new Date(t);return r.setHours(0,0,0,0),r.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function di(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function ui(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function pi(){let e=null,t=[],r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],n()},clear(){e=null,t=[],n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function fi(){let e=new Map,t=new Set;function r(s){return s.startsWith("session-log:")?s:`session-log:${s}`}function n(){for(let s of Array.from(t))try{s()}catch{}}return{set(s,o,a=null){e.set(r(s),{lines:Array.isArray(o)?[...o]:[],last_event_at:typeof a=="number"?a:null}),n()},append(s,o){let a=r(s),i=e.get(a)||{lines:[],last_event_at:null};i.lines=[...i.lines,o],i.last_event_at=Date.now(),e.set(a,i),n()},get(s){return e.get(r(s))||null},clear(s){typeof s=="string"?e.delete(r(s)):e.clear(),n()},subscribe(s){return t.add(s),()=>t.delete(s)}}}var yi=ru(hi(),1);function ft(e){return(0,yi.default)(`beads-ui:${e}`)}function Zt(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Nr(e,t){let r=Zt(e.created_at),n=Zt(t.created_at);if(r!==n)return r<n?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function ki(e,t){let r=Zt(e.created_at),n=Zt(t.created_at);if(r!==n)return r<n?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function $i(e,t){let r=Zt(e.updated_at),n=Zt(t.updated_at);if(r!==n)return r<n?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function xi(e,t){let r=e.priority??2,n=t.priority??2;if(r!==n)return r-n;let s=Zt(e.created_at),o=Zt(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Si(e,t){let r=e.closed_at??0,n=t.closed_at??0;if(r!==n)return r<n?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var bu=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function vi(e){let t=e&&e.metadata,r=t?t.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function wi(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let r=bu.exec(t);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Ai(e,t){let r=vi(e),n=vi(t);if(r!==n)return r<n?-1:1;let s=wi(e),o=wi(t);if(s!==o)return s<o?-1:1;let a=Zt(e&&e.created_at),i=Zt(t&&t.created_at);if(a!==i)return a<i?-1:1;let l=e&&e.id,d=t&&t.id;return l===d?0:String(l)<String(d)?-1:1}var go=2**20;function Zr(e,t){let r=e&&e.id;return t&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(t,r)&&typeof t[r]=="number"&&Number.isFinite(t[r])?t[r]:-Zt(e&&e.created_at)}function ss(e){return(t,r)=>{let n=Zr(t,e),s=Zr(r,e);if(n!==s)return n<s?-1:1;let o=t?.id,a=r?.id;return o<a?-1:o>a?1:0}}function bo(e,t,r){let n=Array.isArray(e)?e:[],s=n.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?n[o-1]:null,i=o+1<s?n[o+1]:null;if(!a&&!i)return{rank:0};if(!a)return{rank:Zr(i,r)-go};if(!i)return{rank:Zr(a,r)+go};let l=Zr(a,r),d=Zr(i,r),p=(l+d)/2;return l<p&&p<d?{rank:p}:{renormalize:n.map((_,g)=>({bead_id:_.id,rank:g*go}))}}function ho(e,t={}){let r=ft(`issue-store:${e}`),n=new Map,s=[],o=0,a=new Set,i=!1,l=t.sort||Nr;function d(){for(let g of Array.from(a))try{g()}catch{}}function p(){s=Array.from(n.values()).sort(l)}function _(g){if(i||!g||g.id!==e)return;let S=Number(g.revision)||0;if(r("apply %s rev=%d",g.type,S),!(S<=o&&g.type!=="snapshot")){if(g.type==="snapshot"){if(S<=o)return;n.clear();let $=Array.isArray(g.issues)?g.issues:[];for(let N of $)N&&typeof N.id=="string"&&N.id.length>0&&n.set(N.id,N);p(),o=S,d();return}if(g.type==="upsert"){let $=g.issue;if($&&typeof $.id=="string"&&$.id.length>0){let N=n.get($.id);if(!N)n.set($.id,$);else{let M=Number.isFinite(N.updated_at)?N.updated_at:0,E=Number.isFinite($.updated_at)?$.updated_at:0;if(M<=E){for(let B of Object.keys(N))B in $||delete N[B];for(let[B,Z]of Object.entries($))N[B]=Z}}p()}o=S,d()}else if(g.type==="delete"){let $=String(g.issue_id||"");$&&(n.delete($),p()),o=S,d()}}}return{id:e,subscribe(g){return a.add(g),()=>{a.delete(g)}},applyPush:_,snapshot(){return s},size(){return n.size},getById(g){return n.get(g)},dispose(){i=!0,n.clear(),s=[],a.clear(),o=0}}}function os(e){let t=String(e.type||"").trim(),r={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];r[o]=String(a)}}let n=new URLSearchParams(r).toString();return n.length>0?`${t}?${n}`:t}function Ei(e){let t=ft("subs"),r=new Map,n=new Map;function s(i,l){t("applyDelta %s +%d ~%d -%d",i,(l.added||[]).length,(l.updated||[]).length,(l.removed||[]).length);let d=n.get(i);if(!d||d.size===0)return;let p=Array.isArray(l.added)?l.added:[],_=Array.isArray(l.updated)?l.updated:[],g=Array.isArray(l.removed)?l.removed:[];for(let S of Array.from(d)){let $=r.get(S);if(!$)continue;let N=$.itemsById;for(let M of p)typeof M=="string"&&M.length>0&&N.set(M,!0);for(let M of _)typeof M=="string"&&M.length>0&&N.set(M,!0);for(let M of g)typeof M=="string"&&M.length>0&&N.delete(M)}}async function o(i,l){let d=os(l);if(t("subscribe %s key=%s",i,d),!r.has(i))r.set(i,{key:d,itemsById:new Map});else{let _=r.get(i);if(_&&_.key!==d){let g=n.get(_.key);g&&(g.delete(i),g.size===0&&n.delete(_.key)),r.set(i,{key:d,itemsById:new Map})}}n.has(d)||n.set(d,new Set);let p=n.get(d);p&&p.add(i);try{await e("subscribe-list",{id:i,type:l.type,params:l.params})}catch(_){let g=r.get(i)||null;if(g){let S=n.get(g.key);S&&(S.delete(i),S.size===0&&n.delete(g.key))}throw r.delete(i),_}return async()=>{t("unsubscribe %s key=%s",i,d);try{await e("unsubscribe-list",{id:i})}catch{}let _=r.get(i)||null;if(_){let g=n.get(_.key);g&&(g.delete(i),g.size===0&&n.delete(_.key))}r.delete(i)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:os,selectors:{getIds(i){let l=r.get(i);return l?Array.from(l.itemsById.keys()):[]},has(i,l){let d=r.get(i);return d?d.itemsById.has(l):!1},count(i){let l=r.get(i);return l?l.itemsById.size:0},getItemsById(i){let l=r.get(i),d={};if(!l)return d;for(let p of l.itemsById.keys())d[p]=!0;return d}}}}function Ti(){let e=ft("issue-stores"),t=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let l of Array.from(n))try{l()}catch{}}function a(l,d,p){let _=d?os(d):"",g=r.get(l)||"",S=t.has(l);if(e("register %s key=%s (prev=%s)",l,_,g),S&&g&&_&&g!==_){let $=t.get(l);if($)try{$.dispose()}catch{}let N=s.get(l);if(N){try{N()}catch{}s.delete(l)}let M=ho(l,p);t.set(l,M);let E=M.subscribe(()=>o());s.set(l,E)}else if(!S){let $=ho(l,p);t.set(l,$);let N=$.subscribe(()=>o());s.set(l,N)}return r.set(l,_),()=>i(l)}function i(l){e("unregister %s",l),r.delete(l);let d=t.get(l);d&&(d.dispose(),t.delete(l));let p=s.get(l);if(p){try{p()}catch{}s.delete(l)}}return{register:a,unregister:i,getStore(l){return t.get(l)||null},snapshotFor(l){let d=t.get(l);return d?d.snapshot().slice():[]},subscribe(l){return n.add(l),()=>n.delete(l)}}}function Ci(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Ri(){let e=null,t=!1,r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},set(s){e=s,n()},isPending(){return t},setPending(s){let o=s===!0;o!==t&&(t=o,n())},clear(){e=null,t=!1,n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function Ii(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function yo(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function hu(e){let t=String(e||""),r=t.startsWith("#")?t.slice(1):t,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let i=new URLSearchParams(s).get("issue");if(i)return decodeURIComponent(i)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function yu(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function Li(e){let t=ft("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):hu(n),a=yu(n);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let l=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==l&&(window.location.hash=l)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=yo(o,n);t("goto issue %s (view=%s)",n,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?yo(n,o):`#/${n}`;t("goto view %s (id=%s)",n,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var vu=Object.freeze({workspace_config:{default_workspace:null}});function Oi(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:vu.workspace_config.default_workspace}}}function Pi(e={}){let t=ft("state"),r={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:Oi(e.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let a={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?Oi(o.config):r.config},i=a.workspace.current?.path!==r.workspace.current?.path||a.workspace.available.length!==r.workspace.available.length||a.workspace.hidden.length!==r.workspace.hidden.length||a.workspace.hidden.some((d,p)=>d!==r.workspace.hidden[p]),l=a.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;a.selected_id===r.selected_id&&a.view===r.view&&a.filters.status===r.filters.status&&a.filters.search===r.filters.search&&a.filters.type===r.filters.type&&a.board.closed_filter===r.board.closed_filter&&a.worker.selected_parent_id===r.worker.selected_parent_id&&a.worker.show_closed_children.length===r.worker.show_closed_children.length&&a.worker.show_closed_children.every((d,p)=>d===r.worker.show_closed_children[p])&&!i&&!l||(r=a,t("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function Di(e){let t=ft("activity"),r=0,n=new Map,s=1;function o(){if(!e)return;let d=r>0;e.toggleAttribute("hidden",!d),e.setAttribute("aria-busy",d?"true":"false")}function a(){r+=1,t("start count=%d",r),o()}function i(){let d=r;r=Math.max(0,r-1),d<=0?t("done called but count was already %d",d):t("done count=%d\u2192%d",d,r),o()}function l(d){return async(_,g)=>{let S=s++,$=Date.now();n.set(S,{type:_,start_ts:$}),t("request start id=%d type=%s count=%d",S,_,r+1),a();let N=!1,M=()=>{N||(N=!0,n.delete(S),i())},E=setTimeout(()=>{N||(t("request TIMEOUT id=%d type=%s elapsed=%dms",S,_,Date.now()-$),M())},3e4);try{let B=await d(_,g),Z=Date.now()-$;return t("request done id=%d type=%s elapsed=%dms",S,_,Z),B}catch(B){let Z=Date.now()-$;throw t("request error id=%d type=%s elapsed=%dms err=%o",S,_,Z,B),B}finally{clearTimeout(E),M()}}}return o(),{wrapSend:l,start:a,done:i,getCount:()=>r,getActiveRequests:()=>{let d=Date.now();return Array.from(n.entries()).map(([p,_])=>({id:p,type:_.type,elapsed_ms:d-_.start_ts}))}}}function oe(e,t="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=e,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",t==="success"?n.style.background="#156d36":t==="warning"?n.style.background="#a36a00":t==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function as(e=void 0,t=void 0){function r(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function n(o,a,i){let l=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return l.sort(Si),l;switch(i){case"created_desc":return l.sort(Nr),l;case"created_asc":return l.sort(ki),l;case"updated_desc":return l.sort($i),l;case"priority":return l.sort(xi),l;case"manual":default:{let d=r();return d?l.sort(ss(d)):l.sort(Nr),l}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let i of a)try{i()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function qr(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function wt(e){let t=qr(e);if(t===null)return"";let r=new Date(t),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function qt(e,t){let r=qr(e);if(r===null)return"";let s=(typeof t=="number"?t:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let i=Math.floor(s/864e5);if(i<7)return`${i}\uC77C \uC804`;let l=Math.floor(i/7);if(i<30)return`${l}\uC8FC \uC804`;let d=Math.floor(i/30);return d<12?`${d}\uAC1C\uC6D4 \uC804`:`${Math.floor(i/365)}\uB144 \uC804`}function is(e){if(!Array.isArray(e))return null;let t=null,r=-1;for(let n of e){if(!n||n.status!=="in_progress")continue;let s=qr(n.updated_at)??0;if(t===null||s>r){t=n,r=s;continue}s===r&&String(n.id)<String(t.id)&&(t=n)}return t}function ls(e){let t=e.transport,r=e.uiOrderStore;function n(a,i){return"renormalize"in a?a.renormalize:[{bead_id:i,rank:a.rank}]}function s(a,i){let l={...a.order};for(let d of i)l[d.bead_id]=d.rank;r&&r.set({revision:a.revision,order:l})}async function o(a,i,l){if(!t||!r)return;let d=r.get()||{revision:0,order:{}},p=n(bo(i,l,d.order),a);s(d,p);let _=await t("ui-order-set",{expected_revision:d.revision,entries:p});if(_&&_.conflict){let g={revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}};r.set(g);let S=n(bo(i,l,g.order),a);s(g,S);let $=await t("ui-order-set",{expected_revision:g.revision,entries:S});$&&$.applied&&r.set({revision:typeof $.revision=="number"?$.revision:0,order:$.order||{}})}else _&&_.applied&&r.set({revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}})}return{applyReorder:o}}function cs(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function vo(e,t){return!t||typeof e!="string"||e.length===0||cs(t.visible_labels).includes(e)?!0:cs(t.hidden_labels).includes(e)?!1:!cs(t.hidden_prefixes).some(r=>r.length>0&&e.startsWith(r))}function ds(e,t){return cs(e).filter(r=>vo(r,t))}function $r(e,t){let r=e&&e.chips?e.chips[t]:void 0;return typeof r=="boolean"?r:!0}var wu={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},Ni={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},Mi={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},ku={review:"\u2713",skip:"\u2298"},xr={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function $u(e,t,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function qi(e){let t=e&&e.fill||"none";return t==="none"?xr.none:e&&e.stale===!0?xr.stale:t==="dim"?xr.dim:e&&e.glyph==="review"?xr.review:e&&e.glyph==="skip"?xr.skip:xr.done}function xu(e){if(!e||e.fill==="none"||!e.approval_state)return qi(e);let t=[];return e.glyph==="review"?t.push(xr.review):e.glyph==="skip"&&t.push(xr.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function Su(e,t,r){let n=wu[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,a=ku[t&&t.glyph||""]||"",i="bar";s==="dim"?i+=` b-${n} dim`:s==="full"&&(i+=` b-${n} full`),o&&(i+=" stale"),r&&(i+=" cur");let l=s==="none"?"lbl":`lbl l-${n} on`,d=r?`color: var(--stage-${n}-on)`:"";return c`
    <div class="seg">
      <div class=${i} style=${d}>${a}</div>
      <div class=${l}>
        ${Ni[e]||e}
      </div>
    </div>
  `}function us(e,t){if(!e||!e.stages)return"";let r=Mi[e.route]||Mi.spec_backed,n=e.stages,s=$u(r,n,String(t||"open")),o=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${r.map(a=>`${Ni[a]||a} ${a==="plan"?xu(n[a]||{}):qi(n[a]||{})}`).join(" \xB7 ")}`;return c`
    <div class="stp" role="img" aria-label=${o}>
      ${r.map(a=>Su(a,n[a]||{},a===s))}
    </div>
  `}function Au(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Fi=2;function Eu(e){if(!e)return[];let t=[];if(e.external){let n=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(c`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(e.blockers)?e.blockers:[];if(r.length>0){let n=r.slice(0,Fi).join(", "),s=r.length-Fi,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;t.push(c`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function wo(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function ps(e,t){if(!e)return null;let r=wo(e.kind),n=e.reason,s=e.kind==="delegated"?n===null:typeof n=="string"&&n.trim().length>0&&!/[\r\n]/.test(n);if(!r||!s)return null;let o=wo(t?.kind),a=o!==null&&t?.kind!==e.kind,i=`\uACC4\uD68D \xB7 ${r}${a?` \u2192 ${o}`:""}`,l=`planned_execution ${e.kind}${typeof n=="string"?`:${n}`:""}`,d=t?` \xB7 exec_receipt ${t.kind}:${t.actor}@${t.sha}`:"";return{kind:e.kind,label:i,title:`${l}${d}`}}function ji(e,t){let r=ps(e,t);return r?c`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${r.kind}
        title=${r.title}
        >${r.label}</span
      >`:null}function Tu(e){if(!e)return null;let t=wo(e.kind);return t?c`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${e.kind}:${e.actor}@${e.sha}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function Cu(e,t){let r=t.policy||null,n=e.workflow&&e.workflow.chips||{},s=[];if(n.route&&$r(r,"route")){let i=n.route_source==="derived";s.push(c`<span
        class="ctl-chip ctl-chip--route${i?" is-derived":""}"
        title=${i?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${i?"unset":n.route}</span
      >`)}if(n.fast_track&&$r(r,"fast_track")&&s.push(c`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&$r(r,"pr")){let i=n.pr.number;s.push(c`<span class="ctl-chip ctl-chip--pr"
        >${`PR${i!=null?` #${i}`:""}`}</span
      >`)}let o=ji(n.planned_execution,n.exec_receipt);if(o&&s.push(o),n.exec_receipt){let i=n.exec_receipt;s.push(c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${i.kind}:${i.actor}@${i.sha}`}
        >${`exec ${i.kind==="delegated"?i.actor:`main:${i.actor}`} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}if(n.impl_entry){let i=n.impl_entry;s.push(c`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${i.actor}@${i.sha}`}
        >${`impl ${i.actor} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}for(let i of ds(e.labels,r))s.push(c`<span class="ctl-chip ctl-chip--label">${i}</span>`);return e.from_id&&$r(r,"from")&&s.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${i=>{i.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(i,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),$r(r,"blocked")&&s.push(...Eu(e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&$r(r,"blocked")&&s.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":c`<div class="board-card__chips">${s}</div>`}function Ru(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function Iu(e){let t=qt(e.created_at),r=qt(e.updated_at);return!t&&!r?"":c`<span class="board-card__times">
    ${t?c`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${wt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&r?c`<span class="board-card__time-sep">·</span>`:""}
    ${r?c`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${wt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function Lu(e,t){let r=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=t.isExpanded?t.isExpanded(e.id):!0,o=n>0?r.children.slice().sort(Ai):r.children;return c`
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
        ${Iu(e)}
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
                  <span class=${Ru(a.status)}>●</span>
                  <span class="board-card__roll-child-ord">${i+1}</span>
                  <span class="board-card__roll-child-title"
                    >${a.title||a.id}</span
                  >
                  ${ps(a.workflow?.chips?.planned_execution,a.workflow?.chips?.exec_receipt)?c`<span class="board-card__roll-child-chips">
                        ${ji(a.workflow?.chips?.planned_execution,a.workflow?.chips?.exec_receipt)}
                        ${Tu(a.workflow?.chips?.exec_receipt)}
                      </span>`:""}
                </button>`)}
          </div>`:""}
    </div>
  `}function fs(e,t){let r=Au(e.priority);return c`
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
      ${Cu(e,t)}
      ${e.workflow&&$r(t.policy||null,"stepper")?us(e.workflow,e.status):""}
      ${Lu(e,t)}
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
              ${or.map(o=>c`<option
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
        ${e.items.map(o=>fs(o,t))}
      </div>
    </section>
  `}function Bi(e,t,r){return c`
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
          ${e.items.length===0?c`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(n=>fs(n,t))}
        </div>
      </div>
    </dialog>
  `}var Ou=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],Pu=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],Du=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function Mu(e,t,r){let n=e.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return c`
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
  `}function Ui(e,t,r){return c`
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
        ${Ou.map(n=>c`<option
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
        ${Pu.map(n=>c`<option
              value=${n.value}
              ?selected=${e.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${Mu(e,t,r)}
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
        ${Du.map(n=>c`<option
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
  `}var Nu=200,qu={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},Fu=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Wi="beads-ui.board.sort",zi=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function ju(){try{let e=window.localStorage.getItem(Wi);if(e&&zi.has(e))return e}catch{}return"created_desc"}function Hi(e,t){let r=ft("views:board"),n=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,i=t.displayPolicyStore,l=t.workerQueueStore,d=t.onClosedRangeChange,p=t.onNewIssue,_=t.closedRange||Nt,g=s?as(s,a):null,S=ls({transport:o,uiOrderStore:a}),$=[],N=[],M=[],E=[],B=[],Z=[],T=!1,x=0,R=ju(),F=new Map,te=new Map,pe=new Map,ue=new Set,ne={search:"",priority:"",type:"",labels:[]},ie=!1,Oe=null;function Ne(U){return String(U.status||"open")==="open"}function Ge(U){let J=String(U.status||"open");return J==="open"||J==="blocked"}function Je(U){let J=ne.search.trim().toLowerCase(),be=ne.priority,y=ne.type,k=ne.labels;return U.filter(P=>{if(J){let re=String(P.id||"").toLowerCase(),ye=String(P.title||"").toLowerCase();if(!re.includes(J)&&!ye.includes(J))return!1}if(be!==""&&String(P.priority)!==be||y!==""&&String(P.issue_type||"")!==y)return!1;if(k.length>0){let re=Array.isArray(P.labels)?P.labels:[];if(!k.some(ye=>re.includes(ye)))return!1}return!0})}function Ke(){let U=new Set;for(let J of[$,N,M,E,B,Z])for(let be of J){let y=Array.isArray(be.labels)?be.labels:[];for(let k of y)typeof k=="string"&&k.length>0&&U.add(k)}return Array.from(U).sort()}function Xe(){return ne.search.trim()!==""||ne.priority!==""||ne.type!==""||ne.labels.length>0}function _e(){try{if(g){let U=g.selectBoardColumn("tab:board:in-progress","in_progress",R),J=g.selectBoardColumn("tab:board:blocked","blocked",R).filter(Ge),be=new Set(U.map($e=>$e.id)),y=g.selectBoardColumn("tab:board:ready","ready",R).filter($e=>Ne($e)&&!be.has($e.id)),k=g.selectBoardColumn("tab:board:resolved","resolved",R),P=g.selectBoardColumn("tab:board:deferred","deferred",R),re=g.selectBoardColumn("tab:board:closed","closed").slice(0,Nu),ye=[...J,...y,...U,...k,...re];Se(ye);let de=new Set;for(let $e of ye)$e&&$e.id&&!ko($e)&&de.add($e.id);let ke=!Xe();$=ke?_n(J,de):J,N=ke?_n(y,de):y,M=ke?_n(U,de):U,E=ke?_n(k,de):k,B=P,x=P.length,Z=ke?_n(re,de):re,F=new Map;for(let $e of $)F.set($e.id,"open");for(let $e of N)F.set($e.id,"open");for(let $e of M)F.set($e.id,"in_progress");for(let $e of E)F.set($e.id,"resolved");for(let $e of B)F.set($e.id,"deferred");for(let $e of Z)F.set($e.id,"closed");te=new Map;for(let $e of $)te.set($e.id,"blocked-col");for(let $e of N)te.set($e.id,"ready-col");for(let $e of M)te.set($e.id,"in-progress-col");for(let $e of E)te.set($e.id,"resolved-col");for(let $e of Z)te.set($e.id,"closed-col")}Ee()}catch{$=[],N=[],M=[],E=[],B=[],Z=[],pe=new Map,Ee()}}function Se(U){let J=new Map;for(let y of U)y&&y.id&&!J.has(y.id)&&J.set(y.id,y);let be=new Map;for(let y of J.values()){let k=ko(y);if(!k)continue;let P=be.get(k);P||(P=[],be.set(k,P)),P.push({id:y.id,title:y.title,status:y.status,metadata:y.metadata,workflow:y.workflow,created_at:y.created_at,updated_at:y.updated_at})}pe=be}function ve(U){let J=pe.get(U)||[],be=0;for(let k of J)(k.status==="resolved"||k.status==="closed")&&(be+=1);let y=is(J);return{total:J.length,count:be,current:y,children:J}}function Ce(U){return!ue.has(U)}function me(U,J){U.preventDefault(),U.stopPropagation(),ue.has(J)?ue.delete(J):ue.add(J),Ee()}function ee(U,J){U.preventDefault(),U.stopPropagation(),n(J)}function V(U,J){U.preventDefault(),U.stopPropagation(),n(J)}function we(U,J){Oe||n(J)}function ge(U,J){U.preventDefault(),U.stopPropagation(),Bu(J).then(be=>{be&&oe("\uBCF5\uC0AC\uB428","success",1200)})}function se(U,J){Oe=J,U.dataTransfer&&(U.dataTransfer.setData("text/plain",J),U.dataTransfer.effectAllowed="move"),U.target.classList.add("board-card--dragging")}function W(U){U.target.classList.remove("board-card--dragging"),_t(),setTimeout(()=>{Oe=null},0)}function z(U){let J=String(U.target.value||"");!J||J===_||(_=J,d&&d(J),Ee())}function I(){return i?i.get():null}function Y(U){let J=l?l.get():null,be=J?J.cleanup_failed:null;if(!be||typeof be!="object"||Array.isArray(be))return null;let y=be[U];return!y||typeof y!="object"||Array.isArray(y)?null:y}let L={onCardClick:we,onCopyId:ge,onDragStart:se,onDragEnd:W,onClosedRangeChange:z,rollupFor:ve,isExpanded:Ce,onRollupToggle:me,onChildClick:ee,onFromChipClick:V,cleanupFailureFor:Y,get policy(){return I()}};function Q(U,J){Oe||(He(),n(J))}function le(U,J){U.preventDefault(),U.stopPropagation(),He(),n(J)}let X={...L,onCardClick:Q,onChildClick:le,onFromChipClick:le,get policy(){return I()}};function fe(U){let J=U.target,be=e.querySelector(".board-filter__labels");J&&be&&be.contains(J)||tt()}function he(U){U.key==="Escape"&&tt()}function Be(){ie||(ie=!0,document.addEventListener("mousedown",fe),document.addEventListener("keydown",he),Ee())}function tt(){ie&&(ie=!1,document.removeEventListener("mousedown",fe),document.removeEventListener("keydown",he),Ee())}function ct(U){U.key==="Escape"&&He()}function Ve(){T||(T=!0,document.addEventListener("keydown",ct),Ee())}function He(){T&&(T=!1,document.removeEventListener("keydown",ct),Ee())}let C={onClose:He,onOverlayClick(U){U.target===U.currentTarget&&He()}},K={onSearchInput(U){ne.search=String(U.target.value||""),_e()},onPriorityChange(U){ne.priority=String(U.target.value||""),_e()},onTypeChange(U){ne.type=String(U.target.value||""),_e()},onSortChange(U){let J=String(U.target.value||"");if(!(!zi.has(J)||J===R)){R=J;try{window.localStorage.setItem(Wi,J)}catch{}_e()}},onDeferredToggle(){T?He():Ve()},onLabelMenuToggle(){ie?tt():Be()},onLabelToggle(U){let J=ne.labels.indexOf(U);J===-1?ne.labels.push(U):ne.labels.splice(J,1),_e()},onLabelClear(){ne.labels.length!==0&&(ne.labels=[],_e())},onNewIssue(){p&&p()}};function ce(){return c`
      <div class="board-view">
        ${Ui(ne,K,{sort_mode:R,deferred_popup_open:T,deferred_count:x,label_options:Ke(),label_menu_open:ie})}
        <div class="board-root">
          ${Xr({title:"Blocked",id:"blocked-col",items:Je($)},L)}
          ${Xr({title:"Ready",id:"ready-col",items:Je(N)},L)}
          ${Xr({title:"In progress",id:"in-progress-col",items:Je(M)},L)}
          ${Xr({title:"Resolved",id:"resolved-col",items:Je(E)},L)}
          ${Xr({title:"Closed",id:"closed-col",items:Je(Z),is_closed:!0,closed_range:_},L)}
        </div>
        ${T?Bi({items:Je(B),count:x},X,C):""}
      </div>
    `}function Ee(){je(ce(),e),qe()}function qe(){try{let U=e.querySelector("#deferred-popup");U&&!U.open&&(typeof U.showModal=="function"?U.showModal():U.setAttribute("open",""));let J=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let be of J)Array.from(be.querySelectorAll(".board-card")).forEach((k,P)=>{k.tabIndex=P===0?0:-1})}catch{}}async function rt(U,J){if(!o){oe("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:U,status:J}),oe("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(be){r("update-status failed: %o",be),oe("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function nt(U){switch(U){case"blocked-col":return $;case"ready-col":return N;case"in-progress-col":return M;case"resolved-col":return E;default:return[]}}function Fe(U,J,be){if(!o||!a)return;let y=nt(U),k=y.find(ke=>ke.id===J);if(!k)return;let P=y.filter(ke=>ke.id!==J),re=be.closest?be.closest(".board-card"):null,ye=P.length;if(re){let ke=re.getAttribute("data-issue-id");if(ke===J)return;let $e=P.findIndex(bt=>bt.id===ke);$e>=0&&(ye=$e)}let de=P.slice();de.splice(ye,0,k),S.applyReorder(J,de,ye)}function _t(){for(let U of Array.from(e.querySelectorAll(".board-column--drag-over")))U.classList.remove("board-column--drag-over")}let Re=null;e.addEventListener("dragover",U=>{U.preventDefault(),U.dataTransfer&&(U.dataTransfer.dropEffect="move");let be=U.target.closest(".board-column");be&&be!==Re&&(Re&&Re.classList.remove("board-column--drag-over"),be.classList.add("board-column--drag-over"),Re=be)}),e.addEventListener("dragleave",U=>{let J=U.relatedTarget;(!J||!e.contains(J))&&Re&&(Re.classList.remove("board-column--drag-over"),Re=null)}),e.addEventListener("drop",U=>{U.preventDefault(),Re&&(Re.classList.remove("board-column--drag-over"),Re=null);let J=U.target,be=J.closest(".board-column");if(!be)return;let y=U.dataTransfer?.getData("text/plain")||"";if(!y)return;let k=be.id,P=te.get(y);if(P&&P===k){if(Fu.has(k)){if(R!=="manual"){oe("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}Fe(k,y,J)}return}let re=qu[k];if(!re){oe("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}F.get(y)!==re&&rt(y,re)}),e.addEventListener("keydown",U=>{let J=U.target;if(!(J instanceof HTMLElement))return;let be=String(J.tagName||"").toLowerCase();if(be==="input"||be==="textarea"||be==="select"||be==="button"||be==="a"||J.isContentEditable===!0)return;let y=J.closest(".board-card");if(!y)return;let k=String(U.key||"");if(k==="Enter"||k===" "){U.preventDefault();let de=y.getAttribute("data-issue-id");de&&n(de);return}if(k!=="ArrowUp"&&k!=="ArrowDown"&&k!=="ArrowLeft"&&k!=="ArrowRight")return;U.preventDefault();let P=y.closest(".board-column");if(!P)return;let re=Array.from(P.querySelectorAll(".board-card")),ye=re.indexOf(y);if(k==="ArrowDown"&&ye<re.length-1){De(y,re[ye+1]);return}if(k==="ArrowUp"&&ye>0){De(y,re[ye-1]);return}if(k==="ArrowLeft"||k==="ArrowRight"){let de=Array.from(e.querySelectorAll(".board-column")),ke=de.indexOf(P),$e=k==="ArrowRight"?1:-1,bt=ke+$e;for(;bt>=0&&bt<de.length;){let Ct=de[bt].querySelector(".board-card");if(Ct){De(y,Ct);return}bt+=$e}}});function De(U,J){try{U.tabIndex=-1,J.tabIndex=0,J.focus()}catch{}}let ot=null;g&&g.subscribe&&(ot=g.subscribe(()=>{try{_e()}catch{}}));let at=null;i&&i.subscribe&&(at=i.subscribe(()=>{try{_e()}catch{}}));let dt=null;return l&&l.subscribe&&(dt=l.subscribe(()=>{Ee()})),{async load(){r("load"),_e()},clear(){tt(),He(),ot&&(ot(),ot=null),at&&(at(),at=null),dt&&(dt(),dt=null),e.replaceChildren(),$=[],N=[],M=[],E=[],B=[],Z=[],F=new Map,te=new Map}}}function ko(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function _n(e,t){return e.filter(r=>{let n=ko(r);return!(n&&t.has(n))})}async function Bu(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let r=!1;try{r=document.execCommand("copy")}finally{t.remove()}return r}catch{return!1}}async function Xt(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}function ar(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function Sr(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function Uu(e,t=document){let r=t.createElement("dialog");r.className="continuation-dialog";let n=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),i=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",i.textContent=`${ar(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${ar(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,n.type="button",n.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",n.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",r.append(a,i,n,s,o),t.body.append(r),new Promise(l=>{let d=p=>{typeof r.close=="function"&&r.close(),r.remove(),l(p)};n.addEventListener("click",()=>d("prior_session")),s.addEventListener("click",()=>d("fresh_current")),o.addEventListener("click",()=>d(null)),r.addEventListener("cancel",p=>{p.preventDefault(),d(null)}),typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")})}async function fr(e,t,r={}){let n=e;for(r.onResult?.(n);n?.continuation_mismatch;){let s=n.continuation_mismatch,o=await Uu(s);if(o===null)return n;n=await t(o,s.decision_token),r.onResult?.(n),n?.conflict&&r.refresh&&(n=await r.refresh(n),r.onResult?.(n))}return n}var Wu=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","orchestration_model","orchestration_effort","orchestration_speed"],Gi={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},zu=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function Rt(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function At(e){return typeof e=="string"&&e.length>0?e:null}function _s(e){return e.startsWith("gpt-")?e.slice(4):e}function yt(e,t,r,n,s){return{value:e,source:t,display:r,full_value:n,resolution:s}}function Zi(e,t,r){let n=At(t[e]);if(n!==null)return{value:n,source:"pin"};let s=At(r[e]);return s===null?null:{value:s,source:"global"}}function mn(e,t,r,n){return Zi(e,t,r)||{value:n,source:"base"}}function Vi(e,t,r,n){let s=r?.implementation?.model_catalog;if(t&&Rt(s?.[t])){let a=At(s[t][e]);if(a!==null)return a}if(t&&Array.isArray(s?.[t])&&s[t].includes(e))return e;if(!t&&Rt(s)){for(let a of Object.values(s))if(Rt(a)){let i=At(a[e]);if(i!==null)return i}else if(Array.isArray(a)&&a.includes(e))return e}let o=n?.model_index?.[e];return At(n?.runners?.[o]?.models?.[e]?.id)||e}function Hu(e,t){return At(t?.review?.reviewers?.[e]?.model)||e}function gn(e,t,r=!1){if(e==="default")return yt(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let n=r?_s(e):e;return yt(e,t,n,e,"explicit")}function Gu(e,t,r){let n=t?.implementation?.model_catalog?.[e],s=[];Rt(n)?s.push(...Object.keys(n)):Array.isArray(n)&&s.push(...n.filter(a=>typeof a=="string"));let o=r?.runners?.[e]?.models;if(Rt(o))for(let a of Object.keys(o))s.includes(a)||s.push(a);return s}function Yi(e){return yt(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function Ki(e,t,r){let n=Zi(e,t,r);return n?gn(n.value,n.source):yt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function Qr(e){let t=Rt(e.pin)?e.pin:{},r=Rt(e.global)?e.global:{},n=Rt(e.execution_defaults)?e.execution_defaults:null,s=n?.supported===!0&&Rt(n.session)?n.session:null,o=n?.supported===!0&&Rt(n.orchestration)?n.orchestration:null,a=Rt(e.runner_catalog)?e.runner_catalog:null,i={};if(s){let l=mn("workflow_mode",t,r,At(s.workflow_mode_default));i.workflow_mode=l.source==="base"?yt(l.value,"base",l.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",l.value,"default"):gn(l.value,l.source);for(let p of["spec_review","plan_review","impl_review"]){let _=`${p}_model`,g=At(p==="plan_review"?l.value==="fast_track"?s.plan_review?.fast_track_default:s.plan_review?.standard_recommended:s.review?.default),S=mn(_,t,r,g);if(S.value===null)i[_]=yt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(S.value!=="self"&&S.value!=="skip"&&!Rt(s.review?.reviewers?.[S.value]))i[_]=Yi(yt(S.value,S.source,"",null,"explicit"));else{let $=Hu(S.value,s);i[_]=yt(S.value,S.source,_s($),$,S.source==="base"?"default":"explicit")}}for(let[p,_]of Object.entries(Gi)){let g=i[_].value;if(g==="self"||g==="skip"){i[p]=yt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let S=At(s.review?.reviewers?.[g||""]?.effort),$=mn(p,t,r,S);i[p]=$.value===null?yt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):yt($.value,$.source,$.value,$.value,$.source==="base"?"default":"explicit")}let d=Rt(s.implementation?.default)?s.implementation.default:{};for(let p of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let _=mn(p,t,r,At(d[p.replace("impl_","")]));i[p]=_.value===null?yt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):yt(_.value,_.source,_.value,_.value,_.source==="base"?"default":"explicit")}if(i.impl_dispatch.value==="main"){i.impl_dispatch.display="\uBA54\uC778";for(let p of["impl_runtime","impl_model","impl_effort","impl_speed"])i[p]=yt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(i.impl_dispatch.value==="delegated"&&(i.impl_dispatch.display="\uC704\uC784"),i.impl_runtime.value==="inherit"&&(i.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",i.impl_runtime.resolution="dynamic"),i.impl_model.value!==null){let p=i.impl_runtime.value==="inherit"?At(e.controller_runtime):i.impl_runtime.value,_=p?Gu(p,s,a):[];if(i.impl_model.value!=="auto"&&_.length>0&&!_.includes(i.impl_model.value))i.impl_model=Yi(i.impl_model);else{let g=Vi(i.impl_model.value,p,s,a);i.impl_model.display=_s(g),i.impl_model.full_value=g}}if(i.impl_effort.value==="auto"){let p=At(e.transport)||(i.impl_runtime.value==="codex"?"codex-native-spawn":i.impl_runtime.value==="claude"?"implement-claude":null),_=p?At(s.implementation?.effort_by_transport?.[p]?.auto):null;_&&!zu.has(_)?(i.impl_effort.display=`${_} (\uBE44\uD638\uD658)`,i.impl_effort.full_value=_,i.impl_effort.resolution="incompatible"):(i.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",i.impl_effort.resolution="dynamic")}i.impl_speed.value==="default"&&(i.impl_speed=i.impl_speed.source==="base"?yt("default","base","default (\uC77C\uBC18)","default","default"):gn("default",i.impl_speed.source))}}else for(let l of Wu.filter(d=>!d.startsWith("orchestration_")))i[l]=Ki(l,t,r);if(!s){for(let[l,d]of Object.entries(Gi))(i[d].value==="self"||i[d].value==="skip")&&(i[l]=yt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(i.impl_dispatch.value==="main"){i.impl_dispatch.display="\uBA54\uC778";for(let l of["impl_runtime","impl_model","impl_effort","impl_speed"])i[l]=yt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else i.impl_dispatch.value==="delegated"&&(i.impl_dispatch.display="\uC704\uC784"),i.impl_runtime.value==="inherit"&&(i.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",i.impl_runtime.resolution="dynamic"),i.impl_effort.value==="auto"&&(i.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",i.impl_effort.resolution="dynamic")}for(let l of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!o){i[l]=Ki(l,t,r);continue}let d=l.replace("orchestration_",""),p=At(o[d]),_=mn(l,t,r,p);if(l==="orchestration_effort"&&_.source==="base"){i[l]=yt(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(_.value===null){i[l]=yt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(l==="orchestration_model"){let g=_.source==="base"?At(o.model_id)||_.value:Vi(_.value,null,s,a);i[l]=yt(_.value,_.source,_s(g),g,_.source==="base"?"default":"explicit");continue}if(_.value==="default"){i[l]=_.source==="base"?yt("default","base","default (\uC77C\uBC18)","default","default"):gn("default",_.source);continue}i[l]=gn(_.value,_.source)}return i}function Vu(e,t){let r=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let n=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${r} (${n})`}function ms(e){let t=Rt(e.pin)?e.pin:{},r=Rt(e.global)?e.global:{},n=p=>Qr({pin:e.layer==="pin"?p:t,global:e.layer==="pin"?r:p,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,controller_runtime:e.controller_runtime}),s=e.layer==="pin"?t:r,o={...s};delete o[e.key];let a=n(o)[e.key],i=n(s)[e.key],l=At(s[e.key]),d=[...e.choices];return l!==null&&!d.includes(l)&&d.unshift(l),{unset_label:Vu(a,e.layer==="pin"),full_value:a.full_value,unavailable:a.resolution==="unavailable",disabled:i?.resolution==="not_applicable",options:d.map(p=>{let _=n({...s,[e.key]:p})[e.key];return{value:p,label:_.display,full_value:_.full_value}})}}function Jr(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let r=e.createElement("h2"),n=e.createElement("textarea"),s=e.createElement("div"),o=e.createElement("button"),a=e.createElement("button");return r.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",n.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",n.maxLength=4e3,s.className="resume-instructions-dialog__actions",o.type="button",o.textContent="\uC774\uC5B4\uD558\uAE30",a.type="button",a.textContent="\uCDE8\uC18C",s.append(o,a),t.append(r,n,s),e.body.append(t),new Promise(i=>{let l=!1,d=_=>{l||(l=!0,typeof t.close=="function"&&t.close(),t.remove(),i(_))},p=()=>d(n.value.trim());o.addEventListener("click",p),a.addEventListener("click",()=>d(null)),n.addEventListener("keydown",_=>{_.key==="Enter"&&(_.ctrlKey||_.metaKey)&&(_.preventDefault(),p())}),t.addEventListener("cancel",_=>{_.preventDefault(),d(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),n.focus()})}var tl="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function kt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var _r=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],bn=[..._r,"reasoning_output_tokens"],Yu=["implementation","review-consult"];function $o(e){let t=0;for(let r of _r)t+=kt(e?.[r]);return t}function Ku(e){return!e||typeof e!="object"?!1:_r.some(t=>Number.isFinite(e[t]))}function Xi(e){return!e||typeof e!="object"?!1:bn.some(t=>Number.isFinite(e[t]))}function Zu(e){let t={};for(let r of bn)e&&Number.isFinite(e[r])&&(t[r]=e[r]);return t}function Qi(e){let t={};for(let r of bn)Number.isFinite(e[r])&&(t[r]=e[r]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function Ji(e,t){return e==="codex"?kt(t.input_tokens)+kt(t.output_tokens):$o(t)}function Xu(e){return e==="claude"?"Claude":"Codex"}function Qu(e){return`\u03C4 ${rl(e)}`}function Ju(e,t){let r=t.breakdown||{},n=[`\uC785\uB825 ${kt(r.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${kt(r.output_tokens).toLocaleString("en-US")}`];e==="claude"?n.push(`\uCE90\uC2DC\uC77D\uAE30 ${kt(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${kt(r.cache_creation_input_tokens).toLocaleString("en-US")}`):(n.push(`\uCE90\uC2DC\uC77D\uAE30 ${kt(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${kt(r.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(r.reasoning_output_tokens)&&n.push(`\uCD94\uB860\uCD9C\uB825 ${kt(r.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,n.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(tl),o.join(`
`)}function $t(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let r of["claude","codex"]){let n=e.providers[r];n&&t.push({provider:r,label:`${Xu(r)} ${Qu(n.subtotal)}${typeof n.total_cost_usd=="number"&&Number.isFinite(n.total_cost_usd)?` \xB7 $${n.total_cost_usd.toFixed(2)}`:""}`,tooltip:Ju(r,n)})}return t}function bs(e){let t={},r={claude:!0,codex:!1},n={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let i=t[o];i||(i={subtotal:0,breakdown:{}},t[o]=i),i.subtotal+=a.subtotal;for(let l of bn)Number.isFinite(a.breakdown[l])&&(i.breakdown[l]=kt(i.breakdown[l])+kt(a.breakdown[l]));a.replayed&&(i.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?n.claude+=a.total_cost_usd:r.claude=!1)}return t.claude&&r.claude&&(t.claude.total_cost_usd=n.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function xo(e){return!e||typeof e!="object"?null:Wt({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function ep(e){return e==="codex"?"codex":"claude"}function Ar(){return{subtotal:0,breakdown:Zu(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function gs(e,t,r){e.subtotal+=t.subtotal;for(let n of bn)Number.isFinite(t.usage[n])&&(e.breakdown[n]=kt(e.breakdown[n])+kt(t.usage[n]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),r&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function el(e,t){let r={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(r.legs=e.legs),e.replayed&&(r.replayed=!0),r}function rl(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function en(e){return Ku(e)?`\u03C4 ${rl($o(e))}`:null}function Qt(e){let t=en(e);if(!t)return null;let r=e?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${t} \xB7 $${r.toFixed(2)}`:t}function tn(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${kt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${kt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${kt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${kt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${$o(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&r.push(tl),r.join(`
`)}function Wt(e,t){let r={claude:Ar(),codex:Ar()},n={orchestrator:{claude:Ar(),codex:Ar()},implementation:{claude:Ar(),codex:Ar()},"review-consult":{claude:Ar(),codex:Ar()}},s=new Set;for(let i of Object.values(e||{})){if(!i||i.bead_id!==t)continue;let l=i.usage;if(Xi(l)){let p=ep(i.runner),_=Qi(l),g={provider:p,role:"orchestrator",attempt_id:String(i.attempt_id||""),usage:_,subtotal:Ji(p,_)};_.replayed===!0&&(g.replayed=!0),typeof i.model=="string"&&(g.model=i.model),typeof i.session_id=="string"&&(g.session_id=i.session_id),gs(r[p],g,!0),gs(n.orchestrator[p],g,!0)}let d=Array.isArray(i.usage_legs)?i.usage_legs:[];for(let p of d){if(!p||p.provider!=="codex"||!Yu.includes(p.role)||!Xi(p.usage))continue;let _=typeof p.receipt_id=="string"&&p.receipt_id.length>0?p.receipt_id:null;if(!_||s.has(_))continue;s.add(_);let g=Qi(p.usage),S={provider:"codex",role:p.role,attempt_id:String(i.attempt_id||""),usage:g,subtotal:Ji("codex",g)};S.receipt_id=_,typeof p.model=="string"&&(S.model=p.model),typeof p.session_id=="string"?S.session_id=p.session_id:typeof p.thread_id=="string"&&(S.session_id=p.thread_id),typeof p.turn_id=="string"&&(S.turn_id=p.turn_id),typeof p.completed_at=="string"&&(S.completed_at=p.completed_at),g.replayed===!0&&(S.replayed=!0),gs(r.codex,S,!1),gs(n[S.role].codex,S,!1)}}let o={};for(let i of["claude","codex"]){let l=r[i];if(l.legs.length===0)continue;let d=el(l,!1);i==="claude"&&l.outer_count>0&&l.outer_cost_count===l.outer_count&&(d.total_cost_usd=l.outer_cost),o[i]=d}if(Object.keys(o).length===0)return null;let a={};for(let i of["orchestrator","implementation","review-consult"]){let l={};for(let d of["claude","codex"]){let p=n[i][d];p.legs.length>0&&(l[d]={...el(p,!0),legs:p.legs})}Object.keys(l).length>0&&(a[i]=l)}return{providers:o,roles:a}}var{entries:ul,setPrototypeOf:nl,isFrozen:tp,getPrototypeOf:rp,getOwnPropertyDescriptor:np}=Object,{freeze:Lt,seal:zt,create:Io}=Object,{apply:Lo,construct:Oo}=typeof Reflect<"u"&&Reflect;Lt||(Lt=function(t){return t});zt||(zt=function(t){return t});Lo||(Lo=function(t,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return t.apply(r,s)});Oo||(Oo=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new t(...n)});var hs=Ot(Array.prototype.forEach),sp=Ot(Array.prototype.lastIndexOf),sl=Ot(Array.prototype.pop),hn=Ot(Array.prototype.push),op=Ot(Array.prototype.splice),vs=Ot(String.prototype.toLowerCase),So=Ot(String.prototype.toString),Ao=Ot(String.prototype.match),yn=Ot(String.prototype.replace),ap=Ot(String.prototype.indexOf),ip=Ot(String.prototype.trim),Jt=Ot(Object.prototype.hasOwnProperty),It=Ot(RegExp.prototype.test),vn=lp(TypeError);function Ot(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return Lo(e,t,n)}}function lp(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return Oo(e,r)}}function ze(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:vs;nl&&nl(e,null);let n=t.length;for(;n--;){let s=t[n];if(typeof s=="string"){let o=r(s);o!==s&&(tp(t)||(t[n]=o),s=o)}e[s]=!0}return e}function cp(e){for(let t=0;t<e.length;t++)Jt(e,t)||(e[t]=null);return e}function mr(e){let t=Io(null);for(let[r,n]of ul(e))Jt(e,r)&&(Array.isArray(n)?t[r]=cp(n):n&&typeof n=="object"&&n.constructor===Object?t[r]=mr(n):t[r]=n);return t}function wn(e,t){for(;e!==null;){let n=np(e,t);if(n){if(n.get)return Ot(n.get);if(typeof n.value=="function")return Ot(n.value)}e=rp(e)}function r(){return null}return r}var ol=Lt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Eo=Lt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),To=Lt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),dp=Lt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Co=Lt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),up=Lt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),al=Lt(["#text"]),il=Lt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Ro=Lt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),ll=Lt(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),ys=Lt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),pp=zt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),fp=zt(/<%[\w\W]*|[\w\W]*%>/gm),_p=zt(/\$\{[\w\W]*/gm),mp=zt(/^data-[\-\w.\u00B7-\uFFFF]+$/),gp=zt(/^aria-[\-\w]+$/),pl=zt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),bp=zt(/^(?:\w+script|data):/i),hp=zt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),fl=zt(/^html$/i),yp=zt(/^[a-z][.\w]*(-[.\w]+)+$/i),cl=Object.freeze({__proto__:null,ARIA_ATTR:gp,ATTR_WHITESPACE:hp,CUSTOM_ELEMENT:yp,DATA_ATTR:mp,DOCTYPE_NAME:fl,ERB_EXPR:fp,IS_ALLOWED_URI:pl,IS_SCRIPT_OR_DATA:bp,MUSTACHE_EXPR:pp,TMPLIT_EXPR:_p}),kn={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},vp=function(){return typeof window>"u"?null:window},wp=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},dl=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function _l(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:vp(),t=O=>_l(O);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==kn.document||!e.Element)return t.isSupported=!1,t;let{document:r}=e,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:i,Element:l,NodeFilter:d,NamedNodeMap:p=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:_,DOMParser:g,trustedTypes:S}=e,$=l.prototype,N=wn($,"cloneNode"),M=wn($,"remove"),E=wn($,"nextSibling"),B=wn($,"childNodes"),Z=wn($,"parentNode");if(typeof a=="function"){let O=r.createElement("template");O.content&&O.content.ownerDocument&&(r=O.content.ownerDocument)}let T,x="",{implementation:R,createNodeIterator:F,createDocumentFragment:te,getElementsByTagName:pe}=r,{importNode:ue}=n,ne=dl();t.isSupported=typeof ul=="function"&&typeof Z=="function"&&R&&R.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:ie,ERB_EXPR:Oe,TMPLIT_EXPR:Ne,DATA_ATTR:Ge,ARIA_ATTR:Je,IS_SCRIPT_OR_DATA:Ke,ATTR_WHITESPACE:Xe,CUSTOM_ELEMENT:_e}=cl,{IS_ALLOWED_URI:Se}=cl,ve=null,Ce=ze({},[...ol,...Eo,...To,...Co,...al]),me=null,ee=ze({},[...il,...Ro,...ll,...ys]),V=Object.seal(Io(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),we=null,ge=null,se=Object.seal(Io(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),W=!0,z=!0,I=!1,Y=!0,L=!1,Q=!0,le=!1,X=!1,fe=!1,he=!1,Be=!1,tt=!1,ct=!0,Ve=!1,He="user-content-",C=!0,K=!1,ce={},Ee=null,qe=ze({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),rt=null,nt=ze({},["audio","video","img","source","image","track"]),Fe=null,_t=ze({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Re="http://www.w3.org/1998/Math/MathML",De="http://www.w3.org/2000/svg",ot="http://www.w3.org/1999/xhtml",at=ot,dt=!1,U=null,J=ze({},[Re,De,ot],So),be=ze({},["mi","mo","mn","ms","mtext"]),y=ze({},["annotation-xml"]),k=ze({},["title","style","font","a","script"]),P=null,re=["application/xhtml+xml","text/html"],ye="text/html",de=null,ke=null,$e=r.createElement("form"),bt=function(m){return m instanceof RegExp||m instanceof Function},Ct=function(){let m=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(ke&&ke===m)){if((!m||typeof m!="object")&&(m={}),m=mr(m),P=re.indexOf(m.PARSER_MEDIA_TYPE)===-1?ye:m.PARSER_MEDIA_TYPE,de=P==="application/xhtml+xml"?So:vs,ve=Jt(m,"ALLOWED_TAGS")?ze({},m.ALLOWED_TAGS,de):Ce,me=Jt(m,"ALLOWED_ATTR")?ze({},m.ALLOWED_ATTR,de):ee,U=Jt(m,"ALLOWED_NAMESPACES")?ze({},m.ALLOWED_NAMESPACES,So):J,Fe=Jt(m,"ADD_URI_SAFE_ATTR")?ze(mr(_t),m.ADD_URI_SAFE_ATTR,de):_t,rt=Jt(m,"ADD_DATA_URI_TAGS")?ze(mr(nt),m.ADD_DATA_URI_TAGS,de):nt,Ee=Jt(m,"FORBID_CONTENTS")?ze({},m.FORBID_CONTENTS,de):qe,we=Jt(m,"FORBID_TAGS")?ze({},m.FORBID_TAGS,de):mr({}),ge=Jt(m,"FORBID_ATTR")?ze({},m.FORBID_ATTR,de):mr({}),ce=Jt(m,"USE_PROFILES")?m.USE_PROFILES:!1,W=m.ALLOW_ARIA_ATTR!==!1,z=m.ALLOW_DATA_ATTR!==!1,I=m.ALLOW_UNKNOWN_PROTOCOLS||!1,Y=m.ALLOW_SELF_CLOSE_IN_ATTR!==!1,L=m.SAFE_FOR_TEMPLATES||!1,Q=m.SAFE_FOR_XML!==!1,le=m.WHOLE_DOCUMENT||!1,he=m.RETURN_DOM||!1,Be=m.RETURN_DOM_FRAGMENT||!1,tt=m.RETURN_TRUSTED_TYPE||!1,fe=m.FORCE_BODY||!1,ct=m.SANITIZE_DOM!==!1,Ve=m.SANITIZE_NAMED_PROPS||!1,C=m.KEEP_CONTENT!==!1,K=m.IN_PLACE||!1,Se=m.ALLOWED_URI_REGEXP||pl,at=m.NAMESPACE||ot,be=m.MATHML_TEXT_INTEGRATION_POINTS||be,y=m.HTML_INTEGRATION_POINTS||y,V=m.CUSTOM_ELEMENT_HANDLING||{},m.CUSTOM_ELEMENT_HANDLING&&bt(m.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(V.tagNameCheck=m.CUSTOM_ELEMENT_HANDLING.tagNameCheck),m.CUSTOM_ELEMENT_HANDLING&&bt(m.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(V.attributeNameCheck=m.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),m.CUSTOM_ELEMENT_HANDLING&&typeof m.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(V.allowCustomizedBuiltInElements=m.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),L&&(z=!1),Be&&(he=!0),ce&&(ve=ze({},al),me=[],ce.html===!0&&(ze(ve,ol),ze(me,il)),ce.svg===!0&&(ze(ve,Eo),ze(me,Ro),ze(me,ys)),ce.svgFilters===!0&&(ze(ve,To),ze(me,Ro),ze(me,ys)),ce.mathMl===!0&&(ze(ve,Co),ze(me,ll),ze(me,ys))),m.ADD_TAGS&&(typeof m.ADD_TAGS=="function"?se.tagCheck=m.ADD_TAGS:(ve===Ce&&(ve=mr(ve)),ze(ve,m.ADD_TAGS,de))),m.ADD_ATTR&&(typeof m.ADD_ATTR=="function"?se.attributeCheck=m.ADD_ATTR:(me===ee&&(me=mr(me)),ze(me,m.ADD_ATTR,de))),m.ADD_URI_SAFE_ATTR&&ze(Fe,m.ADD_URI_SAFE_ATTR,de),m.FORBID_CONTENTS&&(Ee===qe&&(Ee=mr(Ee)),ze(Ee,m.FORBID_CONTENTS,de)),C&&(ve["#text"]=!0),le&&ze(ve,["html","head","body"]),ve.table&&(ze(ve,["tbody"]),delete we.tbody),m.TRUSTED_TYPES_POLICY){if(typeof m.TRUSTED_TYPES_POLICY.createHTML!="function")throw vn('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof m.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw vn('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');T=m.TRUSTED_TYPES_POLICY,x=T.createHTML("")}else T===void 0&&(T=wp(S,s)),T!==null&&typeof x=="string"&&(x=T.createHTML(""));Lt&&Lt(m),ke=m}},Ue=ze({},[...Eo,...To,...dp]),vt=ze({},[...Co,...up]),wr=function(m){let j=Z(m);(!j||!j.tagName)&&(j={namespaceURI:at,tagName:"template"});let H=vs(m.tagName),Te=vs(j.tagName);return U[m.namespaceURI]?m.namespaceURI===De?j.namespaceURI===ot?H==="svg":j.namespaceURI===Re?H==="svg"&&(Te==="annotation-xml"||be[Te]):!!Ue[H]:m.namespaceURI===Re?j.namespaceURI===ot?H==="math":j.namespaceURI===De?H==="math"&&y[Te]:!!vt[H]:m.namespaceURI===ot?j.namespaceURI===De&&!y[Te]||j.namespaceURI===Re&&!be[Te]?!1:!vt[H]&&(k[H]||!Ue[H]):!!(P==="application/xhtml+xml"&&U[m.namespaceURI]):!1},xt=function(m){hn(t.removed,{element:m});try{Z(m).removeChild(m)}catch{M(m)}},Et=function(m,j){try{hn(t.removed,{attribute:j.getAttributeNode(m),from:j})}catch{hn(t.removed,{attribute:null,from:j})}if(j.removeAttribute(m),m==="is")if(he||Be)try{xt(j)}catch{}else try{j.setAttribute(m,"")}catch{}},dr=function(m){let j=null,H=null;if(fe)m="<remove></remove>"+m;else{let Ze=Ao(m,/^[\r\n\t ]+/);H=Ze&&Ze[0]}P==="application/xhtml+xml"&&at===ot&&(m='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+m+"</body></html>");let Te=T?T.createHTML(m):m;if(at===ot)try{j=new g().parseFromString(Te,P)}catch{}if(!j||!j.documentElement){j=R.createDocument(at,"template",null);try{j.documentElement.innerHTML=dt?x:Te}catch{}}let Le=j.body||j.documentElement;return m&&H&&Le.insertBefore(r.createTextNode(H),Le.childNodes[0]||null),at===ot?pe.call(j,le?"html":"body")[0]:le?j.documentElement:Le},nr=function(m){return F.call(m.ownerDocument||m,m,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},Ht=function(m){return m instanceof _&&(typeof m.nodeName!="string"||typeof m.textContent!="string"||typeof m.removeChild!="function"||!(m.attributes instanceof p)||typeof m.removeAttribute!="function"||typeof m.setAttribute!="function"||typeof m.namespaceURI!="string"||typeof m.insertBefore!="function"||typeof m.hasChildNodes!="function")},Gt=function(m){return typeof i=="function"&&m instanceof i};function St(O,m,j){hs(O,H=>{H.call(t,m,j,ke)})}let ur=function(m){let j=null;if(St(ne.beforeSanitizeElements,m,null),Ht(m))return xt(m),!0;let H=de(m.nodeName);if(St(ne.uponSanitizeElement,m,{tagName:H,allowedTags:ve}),Q&&m.hasChildNodes()&&!Gt(m.firstElementChild)&&It(/<[/\w!]/g,m.innerHTML)&&It(/<[/\w!]/g,m.textContent)||m.nodeType===kn.progressingInstruction||Q&&m.nodeType===kn.comment&&It(/<[/\w]/g,m.data))return xt(m),!0;if(!(se.tagCheck instanceof Function&&se.tagCheck(H))&&(!ve[H]||we[H])){if(!we[H]&&f(H)&&(V.tagNameCheck instanceof RegExp&&It(V.tagNameCheck,H)||V.tagNameCheck instanceof Function&&V.tagNameCheck(H)))return!1;if(C&&!Ee[H]){let Te=Z(m)||m.parentNode,Le=B(m)||m.childNodes;if(Le&&Te){let Ze=Le.length;for(let Qe=Ze-1;Qe>=0;--Qe){let ut=N(Le[Qe],!0);ut.__removalCount=(m.__removalCount||0)+1,Te.insertBefore(ut,E(m))}}}return xt(m),!0}return m instanceof l&&!wr(m)||(H==="noscript"||H==="noembed"||H==="noframes")&&It(/<\/no(script|embed|frames)/i,m.innerHTML)?(xt(m),!0):(L&&m.nodeType===kn.text&&(j=m.textContent,hs([ie,Oe,Ne],Te=>{j=yn(j,Te," ")}),m.textContent!==j&&(hn(t.removed,{element:m.cloneNode()}),m.textContent=j)),St(ne.afterSanitizeElements,m,null),!1)},We=function(m,j,H){if(ct&&(j==="id"||j==="name")&&(H in r||H in $e))return!1;if(!(z&&!ge[j]&&It(Ge,j))){if(!(W&&It(Je,j))){if(!(se.attributeCheck instanceof Function&&se.attributeCheck(j,m))){if(!me[j]||ge[j]){if(!(f(m)&&(V.tagNameCheck instanceof RegExp&&It(V.tagNameCheck,m)||V.tagNameCheck instanceof Function&&V.tagNameCheck(m))&&(V.attributeNameCheck instanceof RegExp&&It(V.attributeNameCheck,j)||V.attributeNameCheck instanceof Function&&V.attributeNameCheck(j,m))||j==="is"&&V.allowCustomizedBuiltInElements&&(V.tagNameCheck instanceof RegExp&&It(V.tagNameCheck,H)||V.tagNameCheck instanceof Function&&V.tagNameCheck(H))))return!1}else if(!Fe[j]){if(!It(Se,yn(H,Xe,""))){if(!((j==="src"||j==="xlink:href"||j==="href")&&m!=="script"&&ap(H,"data:")===0&&rt[m])){if(!(I&&!It(Ke,yn(H,Xe,"")))){if(H)return!1}}}}}}}return!0},f=function(m){return m!=="annotation-xml"&&Ao(m,_e)},w=function(m){St(ne.beforeSanitizeAttributes,m,null);let{attributes:j}=m;if(!j||Ht(m))return;let H={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:me,forceKeepAttr:void 0},Te=j.length;for(;Te--;){let Le=j[Te],{name:Ze,namespaceURI:Qe,value:ut}=Le,h=de(Ze),u=ut,A=Ze==="value"?u:ip(u);if(H.attrName=h,H.attrValue=A,H.keepAttr=!0,H.forceKeepAttr=void 0,St(ne.uponSanitizeAttribute,m,H),A=H.attrValue,Ve&&(h==="id"||h==="name")&&(Et(Ze,m),A=He+A),Q&&It(/((--!?|])>)|<\/(style|title|textarea)/i,A)){Et(Ze,m);continue}if(h==="attributename"&&Ao(A,"href")){Et(Ze,m);continue}if(H.forceKeepAttr)continue;if(!H.keepAttr){Et(Ze,m);continue}if(!Y&&It(/\/>/i,A)){Et(Ze,m);continue}L&&hs([ie,Oe,Ne],G=>{A=yn(A,G," ")});let v=de(m.nodeName);if(!We(v,h,A)){Et(Ze,m);continue}if(T&&typeof S=="object"&&typeof S.getAttributeType=="function"&&!Qe)switch(S.getAttributeType(v,h)){case"TrustedHTML":{A=T.createHTML(A);break}case"TrustedScriptURL":{A=T.createScriptURL(A);break}}if(A!==u)try{Qe?m.setAttributeNS(Qe,Ze,A):m.setAttribute(Ze,A),Ht(m)?xt(m):sl(t.removed)}catch{Et(Ze,m)}}St(ne.afterSanitizeAttributes,m,null)},q=function O(m){let j=null,H=nr(m);for(St(ne.beforeSanitizeShadowDOM,m,null);j=H.nextNode();)St(ne.uponSanitizeShadowNode,j,null),ur(j),w(j),j.content instanceof o&&O(j.content);St(ne.afterSanitizeShadowDOM,m,null)};return t.sanitize=function(O){let m=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},j=null,H=null,Te=null,Le=null;if(dt=!O,dt&&(O="<!-->"),typeof O!="string"&&!Gt(O))if(typeof O.toString=="function"){if(O=O.toString(),typeof O!="string")throw vn("dirty is not a string, aborting")}else throw vn("toString is not a function");if(!t.isSupported)return O;if(X||Ct(m),t.removed=[],typeof O=="string"&&(K=!1),K){if(O.nodeName){let ut=de(O.nodeName);if(!ve[ut]||we[ut])throw vn("root node is forbidden and cannot be sanitized in-place")}}else if(O instanceof i)j=dr("<!---->"),H=j.ownerDocument.importNode(O,!0),H.nodeType===kn.element&&H.nodeName==="BODY"||H.nodeName==="HTML"?j=H:j.appendChild(H);else{if(!he&&!L&&!le&&O.indexOf("<")===-1)return T&&tt?T.createHTML(O):O;if(j=dr(O),!j)return he?null:tt?x:""}j&&fe&&xt(j.firstChild);let Ze=nr(K?O:j);for(;Te=Ze.nextNode();)ur(Te),w(Te),Te.content instanceof o&&q(Te.content);if(K)return O;if(he){if(Be)for(Le=te.call(j.ownerDocument);j.firstChild;)Le.appendChild(j.firstChild);else Le=j;return(me.shadowroot||me.shadowrootmode)&&(Le=ue.call(n,Le,!0)),Le}let Qe=le?j.outerHTML:j.innerHTML;return le&&ve["!doctype"]&&j.ownerDocument&&j.ownerDocument.doctype&&j.ownerDocument.doctype.name&&It(fl,j.ownerDocument.doctype.name)&&(Qe="<!DOCTYPE "+j.ownerDocument.doctype.name+`>
`+Qe),L&&hs([ie,Oe,Ne],ut=>{Qe=yn(Qe,ut," ")}),T&&tt?T.createHTML(Qe):Qe},t.setConfig=function(){let O=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Ct(O),X=!0},t.clearConfig=function(){ke=null,X=!1},t.isValidAttribute=function(O,m,j){ke||Ct({});let H=de(O),Te=de(m);return We(H,Te,j)},t.addHook=function(O,m){typeof m=="function"&&hn(ne[O],m)},t.removeHook=function(O,m){if(m!==void 0){let j=sp(ne[O],m);return j===-1?void 0:op(ne[O],j,1)[0]}return sl(ne[O])},t.removeHooks=function(O){ne[O]=[]},t.removeAllHooks=function(){ne=dl()},t}var ml=_l();var gr={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},ws=e=>(...t)=>({_$litDirective$:e,values:t}),rn=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,n){this._$Ct=t,this._$AM=r,this._$Ci=n}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var $n=class extends rn{constructor(t){if(super(t),this.it=mt,t.type!==gr.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===mt||t==null)return this._t=void 0,this.it=t;if(t===Bt)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};$n.directiveName="unsafeHTML",$n.resultType=1;var gl=ws($n);function No(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var jr=No();function $l(e){jr=e}var En={exec:()=>null};function et(e,t=""){let r=typeof e=="string"?e:e.source,n={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(Pt.caret,"$1"),r=r.replace(s,a),n},getRegex:()=>new RegExp(r,t)};return n}var kp=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Pt={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},$p=/^(?:[ \t]*(?:\n|$))+/,xp=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Sp=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Tn=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Ap=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,qo=/(?:[*+-]|\d{1,9}[.)])/,xl=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Sl=et(xl).replace(/bull/g,qo).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Ep=et(xl).replace(/bull/g,qo).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Fo=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Tp=/^[^\n]+/,jo=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Cp=et(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",jo).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Rp=et(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,qo).getRegex(),Es="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Bo=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Ip=et("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Bo).replace("tag",Es).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Al=et(Fo).replace("hr",Tn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Es).getRegex(),Lp=et(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Al).getRegex(),Uo={blockquote:Lp,code:xp,def:Cp,fences:Sp,heading:Ap,hr:Tn,html:Ip,lheading:Sl,list:Rp,newline:$p,paragraph:Al,table:En,text:Tp},bl=et("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Tn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Es).getRegex(),Op={...Uo,lheading:Ep,table:bl,paragraph:et(Fo).replace("hr",Tn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",bl).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Es).getRegex()},Pp={...Uo,html:et(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Bo).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:En,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:et(Fo).replace("hr",Tn).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Sl).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Dp=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Mp=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,El=/^( {2,}|\\)\n(?!\s*$)/,Np=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Ts=/[\p{P}\p{S}]/u,Wo=/[\s\p{P}\p{S}]/u,Tl=/[^\s\p{P}\p{S}]/u,qp=et(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Wo).getRegex(),Cl=/(?!~)[\p{P}\p{S}]/u,Fp=/(?!~)[\s\p{P}\p{S}]/u,jp=/(?:[^\s\p{P}\p{S}]|~)/u,Bp=et(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",kp?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Rl=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Up=et(Rl,"u").replace(/punct/g,Ts).getRegex(),Wp=et(Rl,"u").replace(/punct/g,Cl).getRegex(),Il="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",zp=et(Il,"gu").replace(/notPunctSpace/g,Tl).replace(/punctSpace/g,Wo).replace(/punct/g,Ts).getRegex(),Hp=et(Il,"gu").replace(/notPunctSpace/g,jp).replace(/punctSpace/g,Fp).replace(/punct/g,Cl).getRegex(),Gp=et("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Tl).replace(/punctSpace/g,Wo).replace(/punct/g,Ts).getRegex(),Vp=et(/\\(punct)/,"gu").replace(/punct/g,Ts).getRegex(),Yp=et(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Kp=et(Bo).replace("(?:-->|$)","-->").getRegex(),Zp=et("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Kp).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),xs=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Xp=et(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",xs).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Ll=et(/^!?\[(label)\]\[(ref)\]/).replace("label",xs).replace("ref",jo).getRegex(),Ol=et(/^!?\[(ref)\](?:\[\])?/).replace("ref",jo).getRegex(),Qp=et("reflink|nolink(?!\\()","g").replace("reflink",Ll).replace("nolink",Ol).getRegex(),hl=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,zo={_backpedal:En,anyPunctuation:Vp,autolink:Yp,blockSkip:Bp,br:El,code:Mp,del:En,emStrongLDelim:Up,emStrongRDelimAst:zp,emStrongRDelimUnd:Gp,escape:Dp,link:Xp,nolink:Ol,punctuation:qp,reflink:Ll,reflinkSearch:Qp,tag:Zp,text:Np,url:En},Jp={...zo,link:et(/^!?\[(label)\]\((.*?)\)/).replace("label",xs).getRegex(),reflink:et(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",xs).getRegex()},Po={...zo,emStrongRDelimAst:Hp,emStrongLDelim:Wp,url:et(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",hl).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:et(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",hl).getRegex()},ef={...Po,br:et(El).replace("{2,}","*").getRegex(),text:et(Po.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},ks={normal:Uo,gfm:Op,pedantic:Pp},xn={normal:zo,gfm:Po,breaks:ef,pedantic:Jp},tf={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},yl=e=>tf[e];function br(e,t){if(t){if(Pt.escapeTest.test(e))return e.replace(Pt.escapeReplace,yl)}else if(Pt.escapeTestNoEncode.test(e))return e.replace(Pt.escapeReplaceNoEncode,yl);return e}function vl(e){try{e=encodeURI(e).replace(Pt.percentDecode,"%")}catch{return null}return e}function wl(e,t){let r=e.replace(Pt.findPipe,(o,a,i)=>{let l=!1,d=a;for(;--d>=0&&i[d]==="\\";)l=!l;return l?"|":" |"}),n=r.split(Pt.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(Pt.slashPipe,"|");return n}function Sn(e,t,r){let n=e.length;if(n===0)return"";let s=0;for(;s<n;){let o=e.charAt(n-s-1);if(o===t&&!r)s++;else if(o!==t&&r)s++;else break}return e.slice(0,n-s)}function rf(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return r>0?-2:-1}function kl(e,t,r,n,s){let o=t.href,a=t.title||null,i=e[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let l={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:a,text:i,tokens:n.inlineTokens(i)};return n.state.inLink=!1,l}function nf(e,t,r){let n=e.match(r.other.indentCodeCompensation);if(n===null)return t;let s=n[1];return t.split(`
`).map(o=>{let a=o.match(r.other.beginningSpace);if(a===null)return o;let[i]=a;return i.length>=s.length?o.slice(s.length):o}).join(`
`)}var Ss=class{constructor(e){it(this,"options");it(this,"rules");it(this,"lexer");this.options=e||jr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:Sn(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],n=nf(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let n=Sn(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Sn(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=Sn(t[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let a=!1,i=[],l;for(l=0;l<r.length;l++)if(this.rules.other.blockquoteStart.test(r[l]))i.push(r[l]),a=!0;else if(!a)i.push(r[l]);else break;r=r.slice(l);let d=i.join(`
`),p=d.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${d}`:d,s=s?`${s}
${p}`:p;let _=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(p,o,!0),this.lexer.state.top=_,r.length===0)break;let g=o.at(-1);if(g?.type==="code")break;if(g?.type==="blockquote"){let S=g,$=S.raw+`
`+r.join(`
`),N=this.blockquote($);o[o.length-1]=N,n=n.substring(0,n.length-S.raw.length)+N.raw,s=s.substring(0,s.length-S.text.length)+N.text;break}else if(g?.type==="list"){let S=g,$=S.raw+`
`+r.join(`
`),N=this.list($);o[o.length-1]=N,n=n.substring(0,n.length-g.raw.length)+N.raw,s=s.substring(0,s.length-S.raw.length)+N.raw,r=$.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),a=!1;for(;e;){let l=!1,d="",p="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;d=t[0],e=e.substring(d.length);let _=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,N=>" ".repeat(3*N.length)),g=e.split(`
`,1)[0],S=!_.trim(),$=0;if(this.options.pedantic?($=2,p=_.trimStart()):S?$=t[1].length+1:($=t[2].search(this.rules.other.nonSpaceChar),$=$>4?1:$,p=_.slice($),$+=t[1].length),S&&this.rules.other.blankLine.test(g)&&(d+=g+`
`,e=e.substring(g.length+1),l=!0),!l){let N=this.rules.other.nextBulletRegex($),M=this.rules.other.hrRegex($),E=this.rules.other.fencesBeginRegex($),B=this.rules.other.headingBeginRegex($),Z=this.rules.other.htmlBeginRegex($);for(;e;){let T=e.split(`
`,1)[0],x;if(g=T,this.options.pedantic?(g=g.replace(this.rules.other.listReplaceNesting,"  "),x=g):x=g.replace(this.rules.other.tabCharGlobal,"    "),E.test(g)||B.test(g)||Z.test(g)||N.test(g)||M.test(g))break;if(x.search(this.rules.other.nonSpaceChar)>=$||!g.trim())p+=`
`+x.slice($);else{if(S||_.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||E.test(_)||B.test(_)||M.test(_))break;p+=`
`+g}!S&&!g.trim()&&(S=!0),d+=T+`
`,e=e.substring(T.length+1),_=x.slice($)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(d)&&(a=!0)),s.items.push({type:"list_item",raw:d,task:!!this.options.gfm&&this.rules.other.listIsTask.test(p),loose:!1,text:p,tokens:[]}),s.raw+=d}let i=s.items.at(-1);if(i)i.raw=i.raw.trimEnd(),i.text=i.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let l of s.items){if(this.lexer.state.top=!1,l.tokens=this.lexer.blockTokens(l.text,[]),l.task){if(l.text=l.text.replace(this.rules.other.listReplaceTask,""),l.tokens[0]?.type==="text"||l.tokens[0]?.type==="paragraph"){l.tokens[0].raw=l.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),l.tokens[0].text=l.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let p=this.lexer.inlineQueue.length-1;p>=0;p--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[p].src)){this.lexer.inlineQueue[p].src=this.lexer.inlineQueue[p].src.replace(this.rules.other.listReplaceTask,"");break}}let d=this.rules.other.listTaskCheckbox.exec(l.raw);if(d){let p={type:"checkbox",raw:d[0]+" ",checked:d[0]!=="[ ]"};l.checked=p.checked,s.loose?l.tokens[0]&&["paragraph","text"].includes(l.tokens[0].type)&&"tokens"in l.tokens[0]&&l.tokens[0].tokens?(l.tokens[0].raw=p.raw+l.tokens[0].raw,l.tokens[0].text=p.raw+l.tokens[0].text,l.tokens[0].tokens.unshift(p)):l.tokens.unshift({type:"paragraph",raw:p.raw,text:p.raw,tokens:[p]}):l.tokens.unshift(p)}}if(!s.loose){let d=l.tokens.filter(_=>_.type==="space"),p=d.length>0&&d.some(_=>this.rules.other.anyLine.test(_.raw));s.loose=p}}if(s.loose)for(let l of s.items){l.loose=!0;for(let d of l.tokens)d.type==="text"&&(d.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:n,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=wl(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let a of n)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<r.length;a++)o.header.push({text:r[a],tokens:this.lexer.inline(r[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(wl(a,o.header.length).map((i,l)=>({text:i,tokens:this.lexer.inline(i),header:!1,align:o.align[l]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=Sn(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=rf(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let n=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),kl(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return kl(r,s,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,a,i=s,l=0,d=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+s);(n=d.exec(t))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(a=[...o].length,n[3]||n[4]){i+=a;continue}else if((n[5]||n[6])&&s%3&&!((s+a)%3)){l+=a;continue}if(i-=a,i>0)continue;a=Math.min(a,a+i+l);let p=[...n[0]][0].length,_=e.slice(0,s+n.index+p+a);if(Math.min(s,a)%2){let S=_.slice(1,-1);return{type:"em",raw:_,text:S,tokens:this.lexer.inlineTokens(S)}}let g=_.slice(2,-2);return{type:"strong",raw:_,text:g,tokens:this.lexer.inlineTokens(g)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,n;return t[2]==="@"?(r=t[1],n="mailto:"+r):(r=t[1],n=r),{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,n;if(t[2]==="@")r=t[0],n="mailto:"+r;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);r=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},er=class Do{constructor(t){it(this,"tokens");it(this,"options");it(this,"state");it(this,"inlineQueue");it(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||jr,this.options.tokenizer=this.options.tokenizer||new Ss,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:Pt,block:ks.normal,inline:xn.normal};this.options.pedantic?(r.block=ks.pedantic,r.inline=xn.pedantic):this.options.gfm&&(r.block=ks.gfm,this.options.breaks?r.inline=xn.breaks:r.inline=xn.gfm),this.tokenizer.rules=r}static get rules(){return{block:ks,inline:xn}}static lex(t,r){return new Do(r).lex(t)}static lexInline(t,r){return new Do(r).inlineTokens(t)}lex(t){t=t.replace(Pt.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,r=[],n=!1){for(this.options.pedantic&&(t=t.replace(Pt.tabCharGlobal,"    ").replace(Pt.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,r))?(t=t.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=r.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
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
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,r}inline(t,r=[]){return this.inlineQueue.push({src:t,tokens:r}),r}inlineTokens(t,r=[]){let n=t,s=null;if(this.tokens.links){let l=Object.keys(this.tokens.links);if(l.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)l.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let a=!1,i="";for(;t;){a||(i=""),a=!1;let l;if(this.options.extensions?.inline?.some(p=>(l=p.call({lexer:this},t,r))?(t=t.substring(l.raw.length),r.push(l),!0):!1))continue;if(l=this.tokenizer.escape(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.tag(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.link(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(l.raw.length);let p=r.at(-1);l.type==="text"&&p?.type==="text"?(p.raw+=l.raw,p.text+=l.text):r.push(l);continue}if(l=this.tokenizer.emStrong(t,n,i)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.codespan(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.br(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.del(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.autolink(t)){t=t.substring(l.raw.length),r.push(l);continue}if(!this.state.inLink&&(l=this.tokenizer.url(t))){t=t.substring(l.raw.length),r.push(l);continue}let d=t;if(this.options.extensions?.startInline){let p=1/0,_=t.slice(1),g;this.options.extensions.startInline.forEach(S=>{g=S.call({lexer:this},_),typeof g=="number"&&g>=0&&(p=Math.min(p,g))}),p<1/0&&p>=0&&(d=t.substring(0,p+1))}if(l=this.tokenizer.inlineText(d)){t=t.substring(l.raw.length),l.raw.slice(-1)!=="_"&&(i=l.raw.slice(-1)),a=!0;let p=r.at(-1);p?.type==="text"?(p.raw+=l.raw,p.text+=l.text):r.push(l);continue}if(t){let p="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(p);break}else throw new Error(p)}}return r}},As=class{constructor(e){it(this,"options");it(this,"parser");this.options=e||jr}space(e){return""}code({text:e,lang:t,escaped:r}){let n=(t||"").match(Pt.notSpaceStart)?.[0],s=e.replace(Pt.endingNewline,"")+`
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${br(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let n=this.parser.parseInline(r),s=vl(e);if(s===null)return n;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+br(t)+'"'),o+=">"+n+"</a>",o}image({href:e,title:t,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=vl(e);if(s===null)return br(r);e=s;let o=`<img src="${e}" alt="${r}"`;return t&&(o+=` title="${br(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:br(e.text)}},Ho=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},tr=class Mo{constructor(t){it(this,"options");it(this,"renderer");it(this,"textRenderer");this.options=t||jr,this.options.renderer=this.options.renderer||new As,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Ho}static parse(t,r){return new Mo(r).parse(t)}static parseInline(t,r){return new Mo(r).parseInline(t)}parse(t){let r="";for(let n=0;n<t.length;n++){let s=t[n];if(this.options.extensions?.renderers?.[s.type]){let a=s,i=this.options.extensions.renderers[a.type].call({parser:this},a);if(i!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){r+=i||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}parseInline(t,r=this.renderer){let n="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let i=this.options.extensions.renderers[o.type].call({parser:this},o);if(i!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=i||"";continue}}let a=o;switch(a.type){case"escape":{n+=r.text(a);break}case"html":{n+=r.html(a);break}case"link":{n+=r.link(a);break}case"image":{n+=r.image(a);break}case"checkbox":{n+=r.checkbox(a);break}case"strong":{n+=r.strong(a);break}case"em":{n+=r.em(a);break}case"codespan":{n+=r.codespan(a);break}case"br":{n+=r.br(a);break}case"del":{n+=r.del(a);break}case"text":{n+=r.text(a);break}default:{let i='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return n}},$s,An=($s=class{constructor(e){it(this,"options");it(this,"block");this.options=e||jr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?er.lex:er.lexInline}provideParser(){return this.block?tr.parse:tr.parseInline}},it($s,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),it($s,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),$s),sf=class{constructor(...e){it(this,"defaults",No());it(this,"options",this.setOptions);it(this,"parse",this.parseMarkdown(!0));it(this,"parseInline",this.parseMarkdown(!1));it(this,"Parser",tr);it(this,"Renderer",As);it(this,"TextRenderer",Ho);it(this,"Lexer",er);it(this,"Tokenizer",Ss);it(this,"Hooks",An);this.use(...e)}walkTokens(e,t){let r=[];for(let n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)r=r.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,t));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);r=r.concat(this.walkTokens(a,t))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let i=s.renderer.apply(this,a);return i===!1&&(i=o.apply(this,a)),i}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),n.extensions=t),r.renderer){let s=this.defaults.renderer||new As(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,i=r.renderer[a],l=s[a];s[a]=(...d)=>{let p=i.apply(s,d);return p===!1&&(p=l.apply(s,d)),p||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new Ss(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,i=r.tokenizer[a],l=s[a];s[a]=(...d)=>{let p=i.apply(s,d);return p===!1&&(p=l.apply(s,d)),p}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new An;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,i=r.hooks[a],l=s[a];An.passThroughHooks.has(o)?s[a]=d=>{if(this.defaults.async&&An.passThroughHooksRespectAsync.has(o))return(async()=>{let _=await i.call(s,d);return l.call(s,_)})();let p=i.call(s,d);return l.call(s,p)}:s[a]=(...d)=>{if(this.defaults.async)return(async()=>{let _=await i.apply(s,d);return _===!1&&(_=await l.apply(s,d)),_})();let p=i.apply(s,d);return p===!1&&(p=l.apply(s,d)),p}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(a){let i=[];return i.push(o.call(this,a)),s&&(i=i.concat(s.call(this,a))),i}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return er.lex(e,t??this.defaults)}parser(e,t){return tr.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,i=await(s.hooks?await s.hooks.provideLexer():e?er.lex:er.lexInline)(a,s),l=s.hooks?await s.hooks.processAllTokens(i):i;s.walkTokens&&await Promise.all(this.walkTokens(l,s.walkTokens));let d=await(s.hooks?await s.hooks.provideParser():e?tr.parse:tr.parseInline)(l,s);return s.hooks?await s.hooks.postprocess(d):d})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?er.lex:er.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let i=(s.hooks?s.hooks.provideParser():e?tr.parse:tr.parseInline)(a,s);return s.hooks&&(i=s.hooks.postprocess(i)),i}catch(a){return o(a)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+br(r.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(r);throw r}}},Fr=new sf;function st(e,t){return Fr.parse(e,t)}st.options=st.setOptions=function(e){return Fr.setOptions(e),st.defaults=Fr.defaults,$l(st.defaults),st};st.getDefaults=No;st.defaults=jr;st.use=function(...e){return Fr.use(...e),st.defaults=Fr.defaults,$l(st.defaults),st};st.walkTokens=function(e,t){return Fr.walkTokens(e,t)};st.parseInline=Fr.parseInline;st.Parser=tr;st.parser=tr.parse;st.Renderer=As;st.TextRenderer=Ho;st.Lexer=er;st.lexer=er.lex;st.Tokenizer=Ss;st.Hooks=An;st.parse=st;var hb=st.options,yb=st.setOptions,vb=st.use,wb=st.walkTokens,kb=st.parseInline;var $b=tr.parse,xb=er.lex;function Er(e){let t=st.parse(e),r=ml.sanitize(t);return gl(r)}function hr(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function nn(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Cs(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())} ${r(t.getHours())}:${r(t.getMinutes())}`}var of={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},af={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},lf=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,cf=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function ir(e){return!!e&&typeof e=="object"}function Go(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function Pl(e,t){let r=Go(e),n=Go(t),s=new Map;for(let i of r)s.set(i,(s.get(i)||0)+1);let o=0;for(let i of n){let l=s.get(i)||0;l>0?s.set(i,l-1):o+=1}let a=0;for(let i of s.values())a+=i;return{added:o,removed:a}}function df(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>ir(s)&&typeof s.text=="string"?s.text:"").join(""):ir(e)&&typeof e.text=="string"&&(t=e.text);let n=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function uf(e){let t=String(e.name||""),r=e.input||{},n={kind:"tool",tool:t,icon:of[t]||"\u{1F527}",input:r,expandable:!0};if((t==="Read"||t==="Write")&&(n.path=String(r.file_path||r.path||"")),t==="Write"&&(n.added=Go(r.content).length),t==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=Pl(r.old_string,r.new_string);n.added=s,n.removed=o}if(t==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,a=Array.isArray(r.edits)?r.edits:[];for(let i of a){let l=Pl(ir(i)?i.old_string:"",ir(i)?i.new_string:"");s+=l.added,o+=l.removed}n.added=s,n.removed=o}return t==="Bash"&&(n.command=String(r.command||"")),(t==="Grep"||t==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function Vo(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function Yo(e){let t=e.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=lf.exec(t);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:t.trim()}:cf.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function pf(e,t){if(e.type==="assistant"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(ir(o)){if(o.type==="text"&&typeof o.text=="string")s.push(Yo(o.text));else if(o.type==="thinking"){let a=Vo(o.thinking);a&&s.push(a)}else if(o.type==="tool_use"){let a=uf(o);typeof o.id=="string"&&t.set(o.id,a),s.push(a)}}return s}if(e.type==="user"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(ir(s)&&s.type==="tool_result"){let o=t.get(String(s.tool_use_id));if(o){let a=df(s.content);o.result=a,o.output=typeof s.content=="string"?s.content:a}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success";return[{kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""}]}return[]}function ff(e){if(e.type==="item.completed"&&ir(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[Yo(t.text)];if(t.type==="reasoning"){let r=Vo(t.text);return r?[r]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function _f(e){if(e.schema!=="codex-delegation-monitor-v1"||!ir(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&ir(t.item)){let r=t.item;if(typeof r.id!="string"||r.id.length===0)return[];if(t.type==="item.completed"&&r.kind==="agent_message"&&typeof r.text=="string"&&r.text.trim().length>0)return[Yo(r.text)];if(t.type==="item.completed"&&r.kind==="reasoning"){let i=Vo(r.text);return i?[i]:[]}if(r.kind!=="activity"||typeof r.activity!="string")return[];let n=af[r.activity];if(!n)return[];let s="\uC2DC\uC791",o="\u2026",a={kind:"tool",tool:"",icon:o,expandable:!1};if(t.type==="item.completed"){if(r.status==="completed")s="\uC644\uB8CC",o="\u2713";else if(r.status==="failed")s="\uC2E4\uD328",o="\u2717";else return[];a.result=""}return a.tool=`${n} \xB7 ${s}`,a.icon=o,[a]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function mf(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Dl(e){let t=[],r=new Map,n=Array.isArray(e)?e:[];for(let s of n){let o=s;if(typeof s=="string"){let i=s.trim();if(i.length===0)continue;try{o=JSON.parse(i)}catch{continue}}if(!ir(o))continue;let a=o.schema==="codex-delegation-monitor-v1"?_f(o):mf(o)?ff(o):pf(o,r);for(let i of a)t.push(i)}return t}var gf=5,bf=10,hf=/Task\s+#(\d+)/,yf=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,vf=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function Rs(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function wf(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function kf(e){for(let t=e.length-1;t>=0;t-=1){let r=e[t];if(r.kind==="phase"||r.kind==="gate")return r.text||null}return null}function $f(e){let t=new Map,r=0;for(let s of e){if(s.kind!=="tool")continue;r+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let l=hf.exec(s.output||s.result||""),d=String(o.activeForm||o.subject||"").trim();if(!l||d.length===0)continue;t.set(l[1],{label:d,active:o.status==="in_progress"?r:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let i=o.activeForm||o.subject;typeof i=="string"&&i.trim().length>0&&(a.label=i.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?r:0)}let n=null;for(let s of t.values())s.active>0&&(!n||s.active>n.active)&&(n=s);return n?n.label:null}function xf(e){if(e.tool==="Bash"){let t=e.command||"";return yf.test(t)?"~ PR/\uAC8C\uC2DC \uC911":vf.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function Sf(e){let t=e.filter(s=>s.kind==="tool").slice(-bf),r=new Map;t.forEach((s,o)=>{let a=xf(s);if(!a)return;let i=r.get(a)||{count:0,last:-1};i.count+=1,i.last=o,r.set(a,i)});let n=null;for(let[s,o]of r)(!n||o.count>n.count||o.count===n.count&&o.last>n.last)&&(n={label:s,count:o.count,last:o.last});return n?n.label:null}function Af(e){let t=kf(e);if(t)return{text:t,guess:!1};let r=$f(e);if(r)return{text:r,guess:!1};let n=Sf(e);return n?{text:n,guess:!0}:null}function Ef(e,t){if(typeof e!="number")return"";let r=Math.max(0,Math.floor((t-e)/1e3));return r<60?`${r}\uCD08 \uC804`:qt(e,t)}function Is(e,t={}){let{transport:r,sessionLogStore:n,onClose:s}=t,o=null,a=null,i=null,l={},d=!0,p=new Set,_=new Set,g=null,S=null,$=!1,N=!1,M=!1,E=null,B=null;function Z(){$=!1,N=!1,M=!1,E=null,B=null}async function T(W){if(r){N=!0,M=!1,Se();try{let z=await Promise.resolve(r("get-attempt-prompt",{attempt_id:W}));if(o!==W)return;!z||typeof z!="object"||Array.isArray(z)?M=!0:(E=z,B=W)}catch{o===W&&(M=!0)}finally{o===W&&(N=!1,Se())}}}function x(){if($=!$,$&&o&&B!==o){T(o);return}Se()}function R(){if(!$)return"";let W=nn({loading:N,error:M});if(W)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${W}
      </div>`;if(!E)return"";if(E.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let z=Cs(E.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${z?c`<div class="prompt-block__meta">${z} 발송</div>`:""}
      ${typeof E.task_prompt=="string"?hr("\uACFC\uC5C5 (user)",E.task_prompt):""}
      ${typeof E.system_prompt=="string"?hr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",E.system_prompt):""}
    </div>`}function F(){if(!i||!n)return[];let W=n.get(i);return Dl(W?W.lines:[])}function te(){if(!i||!n)return null;let W=n.get(i),z=W?W.last_event_at:null;return typeof z=="number"?z:null}function pe(){return l.status==="running"}function ue(){if(pe()&&o){S||(S=setInterval(()=>Se(),1e3));return}ne()}function ne(){S&&(clearInterval(S),S=null)}function ie(W){let z=[],I=0;for(;I<W.length;){let Y=W[I];if(Y.kind==="tool"){let L=I;for(;L<W.length&&W[L].kind==="tool"&&W[L].tool===Y.tool;)L+=1;if(L-I>=gf&&!_.has(I)){z.push({kind:"group",idx:I,tool:Y.tool||"",lines:W.slice(I,L).map((Q,le)=>({idx:I+le,line:Q}))}),I=L;continue}}z.push({kind:"line",idx:I,line:Y}),I+=1}return z}function Oe(W){for(let z=W.length-1;z>=0;z-=1){let I=W[z];if(I.kind==="result"||I.kind==="error")return null;if(I.kind==="tool"&&!Object.hasOwn(I,"result"))return I}return null}function Ne(W){for(let z=W.length-1;z>=0;z-=1)if(W[z].kind==="thinking")return W[z];return null}function Ge(W,z){if(z.kind==="gate")return c`<div class="sv__gate">${z.text}</div>`;if(z.kind==="phase")return c`<div class="sv__phase">${z.text}</div>`;if(z.kind==="result")return c`<div
        class="sv__result${z.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${z.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${Er(z.text||(z.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(z.kind==="thinking"){let I=p.has(W);return c`<div
        class="sv__think${I?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Ce(W)}
      >
        <span class="sv__think-line">💭 ${Rs(z.text)}</span>
        ${I?c`<pre class="sv__think-expand">${z.text}</pre>`:""}
      </div>`}if(z.kind==="error")return c`<div class="sv__error">⛔ ${z.text}</div>`;if(z.kind==="blocker")return c`<div class="sv__error">⛔ ${z.text}</div>`;if(z.kind==="tool"){let I=p.has(W),Y=z.tool==="Bash"?wf(z.command):0,L=z.tool==="Bash"?Y>1?Rs(z.command):z.command:z.path||z.command||"";return c`<div
        class="sv__tool${I?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>Ce(W)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${z.icon}</span>
          <span class="sv__tool-name">${z.tool}</span>
          ${L?c`<span class="sv__tool-detail">${L}</span>`:""}
          ${Y>1?c`<span class="sv__tool-more">⋯ ${Y}줄</span>`:""}
          ${typeof z.added=="number"?c`<span class="sv__diff-add">+${z.added}</span>`:""}
          ${typeof z.removed=="number"?c`<span class="sv__diff-del">−${z.removed}</span>`:""}
          ${z.result?c`<span class="sv__tool-ok">→ ${z.result}</span>`:""}
        </span>
        ${I?c`<pre class="sv__tool-expand">${Je(z)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${Er(z.text||"")}</div>`}function Je(W){let z=[];if(W.tool==="Bash"&&typeof W.command=="string"&&W.command.length>0)z.push(W.command);else if(W.input!==void 0)try{z.push(`input: ${JSON.stringify(W.input,null,2)}`)}catch{}return typeof W.output=="string"&&W.output.length>0&&z.push(`output:
${W.output}`),z.join(`

`)}function Ke(){if(!o)return c``;let W=F(),z=(a?[l.model]:[l.runner,l.model,l.effort]).filter(Boolean).join(" \xB7 "),I=l.session_id||"",Y=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${d?"ON":"OFF"}`,L=pe(),Q=L?Ef(te(),Date.now()):"",le=L?Oe(W):null,X=L?Ne(W):null,fe=Af(W);return c`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${a?l.role||"":o}</span>
        ${fe?c`<span
              class="sv__stage${fe.guess?" sv__stage--guess":""}"
              title=${fe.text}
              >${fe.text}</span
            >`:""}
        ${L?c`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${Q?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${Q}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${Q?c`<span class="sv__live-ago">${Q}</span>`:""}</span
            >`:""}
        ${I?c`<button
              type="button"
              class="sv__session"
              title=${I}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${I}`}
              @click=${()=>ee(I)}
            >
              ⧉ ${I.slice(0,8)}
            </button>`:""}
        ${z?c`<span class="sv__meta">${z}</span>`:""}
        ${l.worktree?c`<span class="sv__wt" title=${l.worktree}
              >${l.worktree}</span
            >`:""}
        ${a?"":c`<button
              type="button"
              class="sv__prompt-toggle${$?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${$?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${x}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${d?" sv__follow--on":""}"
          aria-pressed=${d?"true":"false"}
          aria-label=${Y}
          @click=${me}
        >
          <span class="sv__follow-full">⇣ ${Y}</span>
          <span class="sv__follow-short">⇣ ${d?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>se()}
        >
          ✕
        </button>
      </div>
      ${a?"":R()}
      <div class="sv__body">
        ${W.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:ie(W).map(he=>he.kind==="group"?Xe(he):Ge(he.idx,he.line))}
      </div>
      ${le||X?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${le?c`<span class="sv__now-icon">${le.icon}</span>
                  <span class="sv__now-name">${le.tool}</span>
                  <span class="sv__now-detail"
                    >${le.tool==="Bash"?Rs(le.command):le.path||le.command||""}</span
                  >`:""}
            ${X?c`<span class="sv__now-think"
                  >💭 ${Rs(X.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function Xe(W){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>_e(W.idx)}
    >
      <span class="sv__group-icon">${W.lines[0].line.icon}</span>
      <span class="sv__group-name">${W.tool}</span>
      <span class="sv__group-count">${W.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function _e(W){_.add(W),Se()}function Se(){je(Ke(),e),ue(),d&&ve()}function ve(){let W=e.querySelector(".sv__body");W&&(W.scrollTop=W.scrollHeight)}function Ce(W){p.has(W)?p.delete(W):p.add(W),Se()}function me(){d=!d,Se()}function ee(W){Xt(W).then(z=>{z?oe("\uBCF5\uC0AC\uB428","success",1200):oe("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function V(W){!o||!W||(l={...l,...W},Se())}function we(W){let z=W.target;if(!z||!z.classList||!z.classList.contains("sv__body"))return;!(z.scrollHeight-z.scrollTop-z.clientHeight<=4)&&d&&(d=!1,Se())}e.addEventListener("scroll",we,!0);function ge(W){let z=W&&W.attempt_id;if(!z)return;let I=i;o=z,a=typeof W.launch_id=="string"&&W.launch_id.length>0?W.launch_id:null,i=a?`session-log:${o}:${a}`:`session-log:${o}`,r&&I&&I!==i&&Promise.resolve(r("unsubscribe-session-log",{id:I})).catch(()=>{}),l=W.meta||{},d=!0,p.clear(),_.clear(),Z(),!g&&n&&(g=n.subscribe(Se)),r&&Promise.resolve(r("subscribe-session-log",{id:i,attempt_id:o,...a?{launch_id:a}:{}})).catch(()=>{}),Se()}function se(){let W=i;o=null,a=null,i=null,p.clear(),_.clear(),Z(),ne(),r&&W&&Promise.resolve(r("unsubscribe-session-log",{id:W})).catch(()=>{}),je(c``,e),s&&s()}return{open:ge,updateMeta:V,close:se,isOpen(){return o!==null},destroy(){ne(),g&&(g(),g=null),e.removeEventListener("scroll",we,!0),o=null,a=null,i=null,je(c``,e)}}}function Cn(e){let t=e&&typeof e=="object"?e:{},r=t.metadata&&typeof t.metadata=="object"?t.metadata:{},n=Ml(t.spec_id),s=Ml(r.spec_id);return n?{path:n,source:"native",conflict:s.length>0&&s!==n}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function Ml(e){return typeof e=="string"?e.trim():""}function Tf(e){return["plan_review","plan_approval","plan_check"].some(t=>{let r=e[t];return typeof r=="string"&&r.trim().length>0})}function Cf(e){let t=e&&e.metadata||{},r=Cn(e),n=[];return r.path&&n.push({kind:"spec",path:r.path,missing_state:null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&n.push({kind:"plan",path:t.plan_path.trim(),missing_state:Tf(t)?null:"plan_pending"}),n}function Nl(e,t){let r=Cf(e);return c`
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
  `}var Rf="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",If=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,Lf=/^\*\*결론\*\* — (.+)$/;function Ls(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==Rf)return null;let r=If.exec(t[1]||"");if(!r)return null;let n=r[1].split(" ")[0],s=r[2],o=r[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let i=a<t.length?Lf.exec(t[a]):null,l=i?i[1].replace(/\s+/g," ").trim():"",d=i?a+1:a;return{lane:n,identifier:s,timestamp:o,conclusion:l,body:t.slice(d).join(`
`).trim()}}var ql=20;function Fl(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let r=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${r}-${n} ${s}:${o}`}function Of(e){return e.length>ql?`${e.slice(0,ql)}\u2026`:e}function Pf(e,t,r,n){let s=`${t.lane} ${Of(t.identifier)}`;return c`<div class="detail-report">
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
        <span class="detail-report__time">${Fl(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${n&&t.body.length>0?c`<div class="detail-report__body">
          ${Er(t.body)}
        </div>`:""}
  </div>`}function Df(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${Fl(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${Er(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function jl(e,t={},r={}){let n=Array.isArray(e)?e.filter(Boolean):[],s=r.expanded||new Set,o=typeof r.draft=="string"?r.draft:"",a=r.sending===!0,i=n.slice().sort((l,d)=>String(d.created_at||"").localeCompare(String(l.created_at||"")));return c`
    <div class="detail-section-label">댓글 (${n.length})</div>
    ${r.error?c`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:i.length===0?c`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:c`<div class="detail-comments" data-seam="comments">
            ${i.map(l=>{let d=Ls(typeof l.text=="string"?l.text:"");return d?Pf(l,d,t,s.has(l.id)):Df(l)})}
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
  `}var{I:nh}=ci;var Bl=e=>e.strings===void 0;var Mf={},Ul=(e,t=Mf)=>e._$AH=t;var Br=ws(class extends rn{constructor(e){if(super(e),e.type!==gr.PROPERTY&&e.type!==gr.ATTRIBUTE&&e.type!==gr.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Bl(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===Bt||t===mt)return t;let r=e.element,n=e.name;if(e.type===gr.PROPERTY){if(t===r[n])return Bt}else if(e.type===gr.BOOLEAN_ATTRIBUTE){if(!!t===r.hasAttribute(n))return Bt}else if(e.type===gr.ATTRIBUTE&&r.getAttribute(n)===t+"")return Bt;return Ul(e),t}});var Ko=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],Os=["orchestration_model","orchestration_effort","orchestration_speed"],Wl=["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],Ps=["delegated","main"],Ds=["inherit","claude","codex"],Rn=["default","fast"],In=["standard","fast_track"],Ln=["codex","opus","fable","self","skip"],Ms=["codex","fable","skip"],Ns=["low","medium","high","xhigh"],lr="auto";function yr(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function zl(e){if(!yr(e)||!yr(e.runners))return[];let t=[];for(let[r,n]of Object.entries(e.runners))yr(n)&&yr(n.models)&&t.push([r,Object.keys(n.models)]);return t}function Hl(e){return e?.impl_dispatch==="main"}function qs(e,t){let r=zl(e),n=t&&t!=="inherit"?r.filter(([s])=>s===t):r;return[lr,...n.flatMap(([,s])=>s)]}function sn(e,t,r){if(!yr(e)||!yr(e.runners))return[lr];let n=[];for(let[s,o]of Object.entries(e.runners))if(!(!yr(o)||!yr(o.models))&&!(t&&t!=="inherit"&&s!==t))for(let[a,i]of Object.entries(o.models)){if(r&&r!==lr&&a!==r)continue;let l=yr(i)?i.efforts:null;if(Array.isArray(l))for(let d of l)typeof d=="string"&&!n.includes(d)&&n.push(d)}return[lr,...n]}function Fs(e,t){let r=zl(e);return(t?r.filter(([s])=>s===t):r).flatMap(([,s])=>s)}function Zo(e,t,r,n,s){return ms({key:e,choices:t,layer:"global",global:r,execution_defaults:n,runner_catalog:s})}function Gl(e,t){let r={};for(let n of Ko){let s=e?.[n],o=t?.[n];s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}function Vl(e,t){let r={};for(let n of Os){let s=e?.[n]??null,o=t?.[n]??null;s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}var Xo=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Os]}],Qo={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},Yl={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function Jo(e,t,r,n,s,o=null){let a=Qr({pin:t,global:r,execution_defaults:n,runner_catalog:s,controller_runtime:o});return e.map(i=>({key:i,...a[i]}))}function Kl(e,t,r,n,s,o=null){let a={pin:0,global:0,base:0};for(let i of Jo(e,t,r,n,s,o))a[i.source]+=1;return a}function Zl(e,t,r){return{id:e,key:t,value:typeof r=="string"?r:""}}function Xl(e,t,r){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:r}}var _h=[...Ko,...Os];var Nf=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review"},{id:"impl",label:"\uAD6C\uD604",receipt:null},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review"},{id:"pr",label:"PR",receipt:null}],qf={pin:"pin",global:"global",base:"base"};function Ff(e){return c`<span
    class=${`detail-layer-rail detail-layer-rail--${qf[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function jf(e,t,r){switch(e){case"workflow_mode":return In;case"spec_review_model":case"impl_review_model":return Ln;case"plan_review_model":return Ms;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return Ns;case"impl_dispatch":return Ps;case"impl_runtime":return Ds;case"impl_model":return qs(r,t.impl_runtime);case"impl_effort":return sn(r,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return Rn;case"orchestration_model":return Fs(r,null);case"orchestration_effort":return sn(r,void 0,t.orchestration_model||lr).filter(n=>n!==lr);default:return[]}}function Bf(e,t){return c`<div class="detail-effective__row" data-key=${e.key}>
    ${Ff(e.source)}
    <span class="detail-effective__k"
      >${Qo[e.key]||e.key}</span
    >
    <span
      class=${`detail-effective__v${e.source==="base"?" detail-effective__v--dim":""}`}
      title=${e.full_value||""}
      >${e.display}</span
    >
    <span
      class=${`detail-effective__badge detail-effective__badge--${e.source}`}
      >${Yl[e.source]}</span
    >
    ${t.expanded?c`<select
          class="detail-effective__edit"
          data-edit-key=${e.key}
          aria-label=${`${Qo[e.key]||e.key} \uD3B8\uC9D1`}
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
  </div>`}function Ql(e,t){let r=Xo.flatMap(l=>l.keys),n=Jo(r,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=Kl(r,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Object.fromEntries(n.map(l=>[l.key,l])),a=Object.fromEntries(n.filter(l=>l.value!==null).map(l=>[l.key,l.value])),i=n.filter(l=>l.full_value&&l.display!==l.full_value).map(l=>l.full_value).join(" \xB7 ");return c`<details
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
        >${Uf(o)}</span
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
          ${Xo.map(l=>c`
              <div class="detail-effective__subhead">${l.label}</div>
              ${n.filter(d=>l.keys.includes(d.key)).map(d=>{let p=ms({key:d.key,choices:jf(d.key,a,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,controller_runtime:e.controller_runtime||null});return Bf(d,{expanded:e.expanded,options:p.options,default_label:p.unset_label,default_full_value:p.full_value,onEdit:t.onEdit})})}
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
  </details>`}function Uf(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let r=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${r}`)}for(let r of["impl_model","impl_effort","impl_speed"])e[r]?.resolution!=="not_applicable"&&t.push(e[r]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function Jl(e){let t=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},n=r.stages||{},s=r.route||t.route||null,o=typeof t.pr_url=="string"?t.pr_url:"",a=typeof t.exec_receipt=="string"?t.exec_receipt:"",i=ps(r.planned_execution,r.exec_receipt);return c`<section class="detail-summary" data-seam="detail-summary">
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
      ${Nf.map(l=>{let d=l.receipt&&typeof t[l.receipt]=="string"?String(t[l.receipt]):"",p=n[l.id],_=d.length>0||p?.fill==="full",g=!_&&p?.fill==="dim",S=p?.stale===!0;return c`<span
          class=${`detail-summary__gate${_?" detail-summary__gate--on":""}${g?" detail-summary__gate--current":""}${S?" detail-summary__gate--stale":""}`}
          data-gate=${l.id}
        >
          <span class="detail-summary__gate-pill">${l.label}</span>
          ${d?c`<span class="detail-summary__gate-sha"
                >${d.split("@")[1]?.slice(0,7)||""}</span
              >`:""}
        </span>`})}
    </div>
  </section>`}var ec=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function On(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function js(e){if(!On(e)||!On(e.runners))return null;let t=Object.entries(e.runners).filter(([,r])=>On(r)&&On(r.models));return t.length>0?t:null}function ea(e,t){let r=js(e);if(!r||!t)return null;for(let[n,s]of r)if(Object.hasOwn(s.models,t))return n;return null}function tc(e,t){return On(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function rc(e,t){let r=js(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return tc(n,n.models[t]);return[]}function Wf(e){let t=js(e);if(!t)return[];let r=[];for(let[,n]of t)for(let s of Object.values(n.models))for(let o of tc(n,s))r.includes(o)||r.push(o);return r}function zf(e,t){if(!t)return Wf(e);let n=js(e)?.find(([o])=>o===t)?.[1];if(!n)return[];let s=[];for(let o of Object.keys(n.models))for(let a of rc(e,o))s.includes(a)||s.push(a);return s}function nc(e,t,r){let n={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=n.impl_runtime==="inherit"?r:n.impl_runtime==="claude"||n.impl_runtime==="codex"?n.impl_runtime:null;if(n.impl_runtime==="inherit"&&!s)return n.impl_model="",n.impl_effort="",n;let o=ea(t,n.impl_model);if(n.impl_model&&(!s||o!==s))return n.impl_model="",n.impl_effort="",n;let a=n.impl_model?rc(t,n.impl_model):zf(t,s);return n.impl_effort&&a.length>0&&!a.includes(n.impl_effort)&&(n.impl_effort=""),n}function Hf(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function sc(e,t){let r=t.getWorkspacePath,n=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",i="";function l($){$.key==="Escape"&&s&&($.preventDefault(),g())}document.addEventListener("keydown",l);function d(){return s?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>g()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${Hf(s)}</span
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
    `:c``}function p(){je(d(),e)}async function _($,N={}){s=$,o="loading",a="",i="",p();let M=r?r():"";if(!M){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",p();return}if(!n){o="error",i="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",p();return}let E="/api/doc?workspace="+encodeURIComponent(M)+"&path="+encodeURIComponent($);try{let B=await n(E),Z=await B.json().catch(()=>({}));if(!B.ok||!Z||Z.ok!==!0){if(Z?.error==="not_found"&&N.missing_state==="plan_pending"){o="pending",i="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",p();return}o="error",i="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(Z&&Z.error||B.status)+")",p();return}a=String(Z.content||""),o="ready",p()}catch{o="error",i="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",p()}}function g(){s=null,je(c``,e)}function S(){document.removeEventListener("keydown",l),g()}return{open:_,close:g,destroy:S}}var Gf=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],ac="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Bs=["implementation","review-consult"],Vf=["running","done","failed","interrupted"],Yf={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function Kf(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function Zf(e){let t=$t(e);if(t.length>0)return t.map(s=>c`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let r=en(e);if(!r||!e)return"";let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${r.replace(/^τ /,"\u03C4 \uCD1D ")}${n}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${ac}
          >부분 집계</span
        >`:""}`}function oc(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function ta(e){if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?ra(t):""}function Xf(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e;return typeof t.launch_id!="string"||t.launch_id.length===0||t.provider!=="codex"||!Bs.includes(t.role)||typeof t.model!="string"||t.model.length===0||typeof t.session_id!="string"||t.session_id.length===0||!Vf.includes(t.status)||typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))||!(t.turn_id===null||typeof t.turn_id=="string")?null:t}function Qf(e,t){let n=$t({providers:{codex:{subtotal:t.subtotal,breakdown:t.usage,...t.replayed?{replayed:!0}:{}}},roles:{}})[0];return c`<div class="detail-session__leg detail-session__usage-detail">
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
    ${ta(t.completed_at)?c`<span class="detail-session__leg-time detail-session__time"
          >${ta(t.completed_at)}</span
        >`:""}
    ${n?c`<span class="detail-session__usage" title=${n.tooltip}
          >${n.label}</span
        >`:""}
  </div>`}function Jf(e,t,r,n){let s=e.status==="running"?null:t,a=(s?$t({providers:{codex:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],i=e.status==="running"?ra(e.last_event_at):s?ta(s.completed_at):"";return c`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>n.onOpenDelegation&&n.onOpenDelegation(r,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${Yf[e.status]}</span
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
  </button>`}function e_(e,t){return e.role===t.role&&e.model===t.model&&e.session_id===t.session_id}function t_(e,t,r){let n=[],s=new Set,o=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let p of o){let _=Xf(p);!_||s.has(_.launch_id)||(s.add(_.launch_id),n.push(_))}n.sort((p,_)=>p.started_at-_.started_at);let a={implementation:[],"review-consult":[]};if(t)for(let p of Bs){let _=t.roles[p]?.codex;a[p]=_?[..._.legs]:[]}let i=Bs.flatMap(p=>a[p]),l=new Set,d=[];for(let p of Bs){for(let _ of n.filter(g=>g.role===p)){let g=i.find(S=>S.receipt_id===_.launch_id)||null;g&&!e_(_,g)||(g&&l.add(g.receipt_id),d.push(Jf(_,g,e.attempt_id,r)))}for(let _ of a[p])l.has(_.receipt_id)||d.push(Qf(p,_))}return d}function r_(e,t){let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,n=[...Gf,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return c`<div class="detail-session__usage-detail">
    ${n.map(s=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${Kf(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${r===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${r.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${ac}</span>`:""}
  </div>`}var n_={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function ra(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=String(t.getHours()).padStart(2,"0"),n=String(t.getMinutes()).padStart(2,"0");return`${r}:${n}`}function s_(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,n])=>typeof n=="string"&&n.length>0).map(([n,s])=>`${n}=${s}`).join(" \xB7 "):"",r=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${r}</span>
    ${t?c`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function ic(e,t={},r={}){let n=Array.isArray(e)?e:[],s=r.expanded||new Set;if(n.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let d of n)d&&typeof d.resumed_from=="string"&&d.resumed_from.length>0&&o.add(d.resumed_from);let a=d=>{if(!(d.status==="failed"||d.status==="orphaned"))return"";let _=typeof d.session_id=="string"&&d.session_id.length>0,g=o.has(d.attempt_id),S=_&&!g,$=_?g?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${d.attempt_id}
      ?disabled=${!S}
      title=${$}
      @click=${N=>{N.stopPropagation(),S&&t.onResume&&t.onResume(d.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},i=d=>{if(!(d.status==="failed"||d.status==="orphaned")||typeof d.cause!="string"||d.cause==="")return"";let _=d.cause_detail,g=_&&typeof _.reason=="string"&&_.reason.length>0?typeof _.command=="string"&&_.command.length>0?`${_.reason} \xB7 ${_.command}`:_.reason:d.cause;return c`<div class="detail-session__cause" title=${g}>
      ${d.cause}
    </div>`},l=d=>{let p=oc(xo(d));if($t(p).length===0&&!en(d.usage))return"";let _=s.has(d.attempt_id);return c`<button
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
      세션 이력${Zf(r.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${n.map(d=>{let p=xo(d),_=oc(p),g=$t(_);return c`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${d.status||"unknown"}"
            data-attempt-id=${d.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(d.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${n_[d.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${d.attempt_id}</span>
            ${Sr(d)?c`<span
                  class="detail-session__resumed"
                  title=${Sr(d)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${ar(d)}</span>
            ${g.length>0?c`<span class="detail-session__role">orchestrator</span>`:""}
            ${d.session_id?c`<span class="detail-session__sid" title=${d.session_id}
                  >${String(d.session_id).slice(0,8)}</span
                >`:""}
            ${g.length>0?g.map(S=>c`<span
                      class="detail-session__usage"
                      title=${S.tooltip}
                      >${S.label}</span
                    >`):en(d.usage)?c`<span class="detail-session__usage"
                    >${en(d.usage)}</span
                  >`:""}
            <span class="detail-session__time">${ra(d.started_at)}</span>
          </button>
          ${l(d)} ${a(d)} ${i(d)} ${s_(d)}
          ${s.has(d.attempt_id)&&d.usage?r_(d.usage,d.runner==="codex"?"codex":"claude"):""}
          ${t_(d,p,t)}
        </div>`})}
    </div>
  `}function lc(e,t={}){return c`
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
          ${o_(e)}
        </div>`:""}
  `}function o_(e){let t=nn(e);if(t)return t;let r=e.data;if(!r)return"";if(r.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof r.default_task_prompt=="string"?hr("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",r.default_task_prompt):""}`;let n=Cs(r.recorded_at);return c`<div class="detail-prompt__meta">
      ${r.attempt_id}${n?` \xB7 ${n}`:""}
    </div>
    ${typeof r.task_prompt=="string"?hr("\uACFC\uC5C5 (user)",r.task_prompt):""}
    ${typeof r.system_prompt=="string"?hr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",r.system_prompt):""}`}var a_=["open","in_progress","deferred","resolved","closed"],i_=[0,1,2,3,4];function cc(e,t){let r=t.issueStores,n=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,i=t.execPresetStore,l=t.sessionLogStore,d=null,p=null,_={},g="",S=!1,$=!1,N={},M=!1,E=!1,B="",Z="",T="";function x(){M=!1,E=!1,B="",Z="",T=""}let R=[],F=null,te=null,pe=!1,ue="",ne=!1,ie=0,Oe=new Set;function Ne(){R=[],F=null,te=null,pe=!1,ue="",ne=!1,ie+=1,Oe.clear()}async function Ge(u){if(!s)return;let A=++ie;try{let v=await Promise.resolve(s("get-comments",{id:u}));if(A!==ie||u!==d)return;R=Array.isArray(v)?v:[],pe=!1}catch{if(A!==ie||u!==d)return;pe=!0}h()}function Je(){if(!s||!d)return;let u=p&&typeof p.comment_count=="number"?p.comment_count:null;if(F!==d){F=d,te=u,Ge(d);return}u!==null&&u!==te&&(te=u,Ge(d))}function Ke(u){Oe.has(u)?Oe.delete(u):Oe.add(u),h()}function Xe(u){let A=ue.trim().length===0;ue=u,A!==(u.trim().length===0)&&h()}async function _e(){let u=ue.trim();if(!s||!d||u.length===0||ne)return;let A=d;ne=!0,h();let v=!1;try{let G=await Promise.resolve(s("add-comment",{id:A,text:u}));Array.isArray(G)&&G.length>0&&(v=!0,A===d&&(R=G,pe=!1,ue="",te=G.length))}catch{v=!1}v||oe("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),A===d&&(ne=!1),h()}let Se={onToggle:Ke,onDraftInput:Xe,onSubmit:_e},ve=document.createElement("div");ve.className="md-viewer-root",document.body.appendChild(ve);let Ce=sc(ve,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),me=document.createElement("div");me.className="session-log-root",document.body.appendChild(me);let ee=Is(me,{transport:s?(u,A)=>Promise.resolve(s(u,A)):void 0,sessionLogStore:l}),V=!1,we=!1,ge=!1,se=null,W=null,z=0;function I(u){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${u}`}function Y(){V=!1,we=!1,ge=!1,se=null,W=null,z+=1}async function L(u){if(!s)return;let A=++z;we=!0,ge=!1,h();try{let v=await Promise.resolve(s("get-bead-prompt",{bead_id:u}));if(A!==z)return;!v||typeof v!="object"||Array.isArray(v)?ge=!0:(se=v,W=I(u))}catch{A===z&&(ge=!0)}finally{A===z&&(we=!1,h())}}function Q(){if(V=!V,V&&d&&W!==I(d)){se=null,L(d);return}h()}function le(){if(!a||!d)return[];let u=a.get();return(u&&u.attempts?Object.values(u.attempts):[]).filter(v=>v&&v.bead_id===d).sort((v,G)=>(G.started_at||0)-(v.started_at||0)).map(v=>({attempt_id:v.attempt_id,bead_id:v.bead_id,status:v.status,started_at:typeof v.started_at=="number"?v.started_at:null,runner:v.runner||null,model:v.model||null,effort:v.effort||null,speed:v.speed||null,session_id:v.session_id||null,resumed_from:v.resumed_from||null,continuation_mode:v.continuation_mode||null,dismissed_at:typeof v.dismissed_at=="number"?v.dismissed_at:null,cause:typeof v.cause=="string"?v.cause:null,cause_detail:v.cause_detail||null,exec_default_preset_id:typeof v.exec_default_preset_id=="string"?v.exec_default_preset_id:null,exec_default_preset_revision:typeof v.exec_default_preset_revision=="number"?v.exec_default_preset_revision:null,exec_values:v.exec_values&&typeof v.exec_values=="object"?v.exec_values:null,usage:v.usage||null,usage_legs:Array.isArray(v.usage_legs)?v.usage_legs:[],delegation_sessions:Array.isArray(v.delegation_sessions)?v.delegation_sessions:[]}))}function X(){if(!a||!d)return null;let u=a.get();return Wt(u&&u.attempts||{},d)}let fe=new Set;function he(u){fe.has(u)?fe.delete(u):fe.add(u),h()}function Be(u){let A=a?a.get():null,v=A&&A.attempts?A.attempts[u]:null;ee.open({attempt_id:u,meta:v?{runner:v.runner||void 0,model:v.model||void 0,effort:v.effort||void 0,status:v.status||void 0,session_id:v.session_id||void 0}:{}})}function tt(u,A){let v=a?a.get():null,G=v&&v.attempts?v.attempts[u]:null,Ae=(G&&Array.isArray(G.delegation_sessions)?G.delegation_sessions:[]).find(Ye=>Ye&&typeof Ye=="object"&&Ye.launch_id===A);Ae&&ee.open({attempt_id:u,launch_id:A,meta:{runner:"codex",role:Ae.role,model:Ae.model,session_id:Ae.session_id,status:Ae.status}})}async function ct(u){if(!s||!u)return;let A=await Jr();if(A===null)return;let v=()=>{let Ye=a?a.get():null;return Ye&&typeof Ye.revision=="number"?Ye.revision:0},G=async(Ye={},Pe=v())=>await s("worker-attempt-resume",{attempt_id:u,expected_revision:Pe,...A!==""?{instructions:A}:{},...Ye}),xe=Ye=>{Ye?.queue&&a?.set&&a.set(Ye.queue)},Ae=await G();if(xe(Ae),Ae&&Ae.conflict){let Ye=Ae.queue&&typeof Ae.queue.revision=="number"?Ae.queue.revision:v();Ae=await G({},Ye),xe(Ae)}Ae=await fr(Ae,(Ye,Pe)=>G({continuation:Ye,decision_token:Pe}),{onResult:xe,refresh:()=>G()}),Ae&&Ae.resumed===!1&&!Ae.conflict&&Ae.reason&&oe(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${Ae.reason}`,"error",2400)}let Ve={onOpen:Be,onOpenDelegation:tt,onResume:ct,onToggleUsage:he};function He(){let u=a?a.get():null,A={...N};for(let v of["orchestration_model","orchestration_effort","orchestration_speed"]){let G=u&&u[v];typeof G=="string"&&(A[v]=G)}return A}async function C(){if(s){try{let u=await Promise.resolve(s("get-session-defaults",{}));N=u&&u.values&&typeof u.values=="object"?u.values:{}}catch{N={}}h()}}function K(){let u=a?a.get():null;return u&&u.runner_catalog||null}function ce(){let u=a?a.get():null;return u&&typeof u.execution_defaults=="object"?u.execution_defaults:null}function Ee(){let u=p?.metadata&&typeof p.metadata=="object"?p.metadata:{},v=Qr({pin:{...u,..._},global:He(),execution_defaults:ce(),runner_catalog:K()}).orchestration_model.value||"";return ea(K(),v)}function qe(){let u=i?i.get():null;return!u||typeof u.revision!="number"?null:{revision:u.revision,presets:Array.isArray(u.presets)?u.presets:[]}}function rt(u){return u?.compatible===!1}function nt(u){i&&u&&typeof u.revision=="number"&&Array.isArray(u.presets)&&i.set({revision:u.revision,presets:u.presets})}async function Fe(){let u=qe(),A=u?.presets.find(v=>v.id===g);if(!(!s||!d||!u||!A||rt(A)||S)){S=!0,h();try{let v=await Promise.resolve(s("apply-impl-preset",Xl(d,A.id,u.revision)));if(v&&v.conflict){nt(v),oe("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let G=v&&Array.isArray(v.issue)?v.issue[0]:v?.issue;if(v&&v.applied&&G&&typeof G=="object"){p=G;for(let xe of ec)delete _[xe];oe("\uAD6C\uD604 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",2400);return}v&&v.error==="bd_readback_failed"?oe("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):oe("\uAD6C\uD604 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(v){v&&typeof v=="object"&&v.code==="bd_readback_failed"?oe("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):oe("\uAD6C\uD604 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{S=!1,h()}}}let _t=null;r&&r.subscribe&&(_t=r.subscribe(()=>at()));let Re=null;a&&typeof a.subscribe=="function"&&(Re=a.subscribe(()=>{d&&h()}));let De=null;i&&typeof i.subscribe=="function"&&(De=i.subscribe(()=>{d&&h()}));function ot(u){u.key==="Escape"&&d&&(u.preventDefault(),n())}document.addEventListener("keydown",ot);function at(){if(d){if(r&&typeof r.snapshotFor=="function"){let u=r.snapshotFor("detail:"+d)||[];p=u.find(v=>v&&v.id===d)||u[0]||p}Je(),h()}}function dt(u){Xt(u).then(A=>{A?oe("\uBCF5\uC0AC\uB428","success",1200):oe("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function U(u){u.preventDefault(),u.stopPropagation(),d&&dt(d)}function J(u,A){u.preventDefault(),u.stopPropagation(),dt(A)}function be(u,A,v){u.preventDefault(),u.stopPropagation(),Ce.open(A,{missing_state:v})}function y(u,A){_[u]=A,h(),!(!s||!d)&&Promise.resolve(s("update-exec-settings",Zl(d,u,A.length===0?null:A))).catch(()=>{oe("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function k(u,A){let v=p||{},G=v.metadata&&typeof v.metadata=="object"?v.metadata:{},xe={};for(let Pe of["impl_runtime","impl_model","impl_effort"])xe[Pe]=Object.hasOwn(_,Pe)?_[Pe]:typeof G[Pe]=="string"?G[Pe]:"";xe[u]=A;let Ae=nc(xe,K(),Ee()),Ye={};for(let Pe of["impl_runtime","impl_model","impl_effort"])Ye[Pe]=_[Pe],_[Pe]=Ae[Pe]||"";h(),!(!s||!d)&&Promise.resolve(s("update-impl-target",{id:d,...Ae,orchestration_runtime:Ee()})).then(Pe=>{let gt=Array.isArray(Pe)?Pe[0]:Pe;if(!gt||typeof gt!="object"||!gt.id)throw new Error("implementation target readback failed");p=gt;for(let sr of["impl_runtime","impl_model","impl_effort"])delete _[sr];h()}).catch(()=>{for(let Pe of["impl_runtime","impl_model","impl_effort"])Ye[Pe]===void 0?delete _[Pe]:_[Pe]=Ye[Pe];h(),oe("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function P(u,A,v){if(!s||!d)return!1;try{let G=await Promise.resolve(s(u,A)),xe=Array.isArray(G)?G[0]:G;return xe&&typeof xe=="object"&&xe.id?(p=xe,!0):(oe(v,"error"),!1)}catch{return oe(v,"error"),!1}}function re(u){setTimeout(()=>{try{let A=e.querySelector(u);A&&typeof A.focus=="function"&&A.focus()}catch{}},0)}function ye(){M=!0,B=p&&p.title||"",h(),re('.detail-edit__input[data-edit="title"]')}function de(u){B=u.target.value}function ke(){M=!1,B="",h()}function $e(){P("edit-text",{id:d,field:"title",value:B},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(A=>{A&&(M=!1,B=""),h()})}function bt(){E=!0,Z=p&&p.description||"",h(),re('.detail-edit__textarea[data-edit="description"]')}function Ct(u){Z=u.target.value}function Ue(){E=!1,Z="",h()}function vt(){P("edit-text",{id:d,field:"description",value:Z},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(A=>{A&&(E=!1,Z=""),h()})}function wr(u,A,v,G){if(u.key==="Escape"){u.stopPropagation(),v();return}u.key==="Enter"&&(!G||u.ctrlKey||u.metaKey)&&(u.preventDefault(),A())}function xt(u){let A=u.target.value;P("update-status",{id:d,status:A},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>h())}function Et(u){let A=Number(u.target.value);P("update-priority",{id:d,priority:A},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>h())}function dr(u){T=u.target.value}function nr(){let u=T.trim();u.length!==0&&P("label-add",{id:d,label:u},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(A=>{A&&(T=""),h()})}function Ht(u){if(u.key==="Escape"){u.stopPropagation(),T="",h();return}u.key==="Enter"&&(u.preventDefault(),nr())}function Gt(u){P("label-remove",{id:d,label:u},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>h())}let St={onCopyPath:J,onOpenDoc:be};function ur(u){return typeof u=="string"?u:u&&typeof u=="object"?String(u.id||u.to||u.issue_id||u.depends_on||""):""}function We(u){switch(u&&typeof u=="object"?String(u.dependency_type||u.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function f(u){let v=(Array.isArray(u.dependencies)?u.dependencies:[]).map(G=>({id:ur(G),icon:We(G)})).filter(G=>G.id.length>0);return c`
      <div class="detail-section-label">의존성</div>
      ${v.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${v.map(G=>o?c`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(G.id)}
                  >
                    ${G.icon?`${G.icon} `:""}${G.id}
                  </button>`:c`<span class="detail-dep"
                    >${G.icon?`${G.icon} `:""}${G.id}</span
                  >`)}
          </div>`}
    `}function w(u){let A=u.metadata||{},v=u.workflow||{},G=v.stages||{},xe=G.spec&&G.spec.stale,Ae=G.impl&&G.impl.stale,Ye=G.plan||null,Pe=v.route_source==="derived",gt=v.route||A.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${Pe?" detail-kv__v--derived":""}"
          title=${Pe?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${Pe?"unset":gt}</span
        >
      </div>
      ${v.route!=="quick_fix"||Object.hasOwn(A,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${A.spec_review||"\uC5C6\uC74C"}${xe?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${v.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Ye?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Ye?.approval_receipt||"\uC5C6\uC74C"}${Ye?.approval_state==="stale"?" \xB7 stale":Ye?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${v.route!=="quick_fix"||Object.hasOwn(A,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${A.impl_review||"\uC5C6\uC74C"}${Ae?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${v.planned_execution?c`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${v.planned_execution.kind}</span>
            </div>
            ${v.planned_execution.kind==="main"?c`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${v.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${v.exec_receipt?c`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${`${v.exec_receipt.kind}:${v.exec_receipt.actor}@${v.exec_receipt.sha}`}</span
            >
          </div>`:""}
      ${v.impl_entry?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${v.impl_entry.actor}@${v.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${A.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${A.pr_url}</span>
          </div>`:""}
    `}let q={route:["quick_fix","spec_backed","full_plan"]};async function O(u,A){let v=A.target.value;if(u==="route"&&p&&p.metadata&&p.metadata.route==="full_plan"&&v!=="full_plan"&&!window.confirm(`full_plan \u2192 ${v||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){h();return}await P("update-workflow-meta",{id:d,key:u,value:v},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),h()}function m(u){let A=u.metadata||{};return c` ${((G,xe)=>{let Ae=q[G],Ye=typeof A[G]=="string"?A[G]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${G}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${G}
          data-edit=${`wfmeta-${G}`}
          @change=${Pe=>O(G,Pe)}
        >
          <option value="" ?selected=${!Ae.includes(Ye)}>
            ${xe}
          </option>
          ${Ae.map(Pe=>c`<option value=${Pe} ?selected=${Ye===Pe}>${Pe}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function j(u,A){return M?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${B}
            @input=${de}
            @keydown=${v=>wr(v,$e,ke,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${$e}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${ke}
            >
              취소
            </button>
          </div>
        </div>
      `:c`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${u}</h2>
        ${$t(A).map(v=>c`<span class="detail-usage-total" title=${v.tooltip}
              >${v.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${ye}
        >
          ✎
        </button>
      </div>
    `}function H(u){let A=wt(u.created_at),v=wt(u.updated_at);return!A&&!v?c``:c`
      ${A?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${A}</span>
          </div>`:""}
      ${v?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${v}</span>
          </div>`:""}
    `}function Te(u,A){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${xt}
        >
          ${a_.map(v=>c`<option value=${v} ?selected=${v===u}>${v}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${Et}
        >
          ${i_.map(v=>c`<option value=${String(v)} ?selected=${v===A}>
                P${v}
              </option>`)}
        </select>
      </div>
    `}function Le(u){return c`
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
              .value=${Z}
              @input=${Ct}
              @keydown=${A=>wr(A,vt,Ue,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${vt}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${Ue}
              >
                취소
              </button>
            </div>
          </div>`:c`<div class="detail-overlay__desc">
            ${u||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function Ze(u){let A=typeof u.notes=="string"?u.notes:"";return A.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${A}</div>
    `}function Qe(u){let A=Array.isArray(u.labels)?u.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${A.map(v=>c`<span class="detail-label-chip"
              >${v}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${v}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+v}
                @click=${()=>Gt(v)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${T}
            @input=${dr}
            @keydown=${Ht}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${nr}
          >
            추가
          </button>
        </span>
      </div>
    `}function ut(){if(!d)return c``;let u=p||{},A=String(u.id||d),v=u.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",G=X(),xe=u.status||"open",Ae=typeof u.priority=="number"?Math.max(0,Math.min(4,u.priority)):"",Ye=u.description||"",Pe={...u,metadata:{...u.metadata||{},..._}};return c`
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
            @click=${U}
          >
            ${A}
          </button>
          ${j(v,G)}
          ${Jl(Pe)}
          ${Ql({metadata:Pe.metadata,workspace_values:He(),catalog:K(),execution_defaults:ce(),expanded:$,presets:qe()?.presets||[],preset_id:g,preset_busy:S},{onToggle:gt=>{$=gt,h()},onEdit:(gt,sr)=>{if(gt==="impl_runtime"||gt==="impl_model"||gt==="impl_effort"){k(gt,sr??"");return}y(gt,sr??"")},onPresetSelect:gt=>{g=gt,h()},onPresetApply:()=>{Fe()}})}
          ${Te(xe,Ae)} ${H(u)}
          ${Le(Ye)}
          ${jl(R,Se,{expanded:Oe,draft:ue,sending:ne,error:pe})}
          ${Ze(u)} ${Qe(u)} ${f(u)}
          ${w(u)} ${m(u)}
          ${Nl(u,St)}
          ${lc({expanded:V,loading:we,error:ge,data:se},{onToggle:Q})}
          ${ic(le(),Ve,{total:G,expanded:fe})}
        </div>
      </div>
    `}function h(){je(ut(),e)}return{load(u){u!==d&&(_={},g="",$=!1,x(),Ne(),Y()),d=u,p=null,at(),C()},clear(){d=null,p=null,_={},g="",S=!1,$=!1,x(),Ne(),Y(),Ce.close(),ee.close(),je(c``,e)},destroy(){_t&&(_t(),_t=null),Re&&(Re(),Re=null),De&&(De(),De=null),document.removeEventListener("keydown",ot),Ce.destroy(),ve.parentNode&&ve.parentNode.removeChild(ve),ee.destroy(),me.parentNode&&me.parentNode.removeChild(me),d=null,p=null,g="",S=!1,Ne(),Y(),je(c``,e)}}}function dc(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let r=t.querySelector("#fatal-error-title"),n=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),i=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},l=(d,p,_="")=>{r&&(r.textContent=d||"Unexpected Error"),n&&(n.textContent=p||"An unrecoverable error occurred.");let g=typeof _=="string"?_.trim():"";if(s&&(g.length>0?(s.textContent=g,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>i()),t.addEventListener("cancel",d=>{d.preventDefault(),i()}),{open:l,close:i,getElement(){return t}}}function Us(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function Ws(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let r=Math.floor(t/60);if(r<60)return`${r}\uBD84 ${Math.round(t-r*60)}\uCD08`;let n=Math.floor(r/60),s=r%60;return`${n}\uC2DC\uAC04 ${s}\uBD84`}function uc(e,t){if(typeof e!="object"||e===null)return null;let r=0,n=!1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t)continue;let a=o.started_at,i=o.finished_at;typeof a!="number"||typeof i!="number"||!Number.isFinite(a)||!Number.isFinite(i)||i<a||(r+=i-a,n=!0)}return n?r:null}function zs(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function l_(e,t){let r=Array.isArray(e)?e:[],n=Array.isArray(t)?t:[];if(r.length===0&&n.length===0)return null;let s=null;for(let i of r)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!s||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=i);let o=r.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+n.length,a=r.some(i=>i.state==="repairing");return{deploy:s?{sha:Us(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function pc(e,t){let r=l_(e,t);return r?c`<button
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
            title=${r.deploy.at?wt(r.deploy.at):""}
            >${zs(r.deploy.at)}${r.deploy.elapsed_ms!==null?` \xB7 ${Ws(r.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${r.badge.tone}"
      >${r.badge.label}</span
    >
  </button>`:""}function on(e){let t=qt(e.created_at),r=qt(e.updated_at);return!t&&!r?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${wt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&r?c`<span>·</span>`:""}${r?c`<span title=${`\uC218\uC815 ${wt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </div>`}function c_(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function Pn(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function Hs(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function cr(e,t,r={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(_=>_&&_.bead_id===t&&_.phase!=="done").sort((_,g)=>(_.requested_at||0)-(g.requested_at||0)).at(-1),o=typeof r.attempt_id=="string"&&r.attempt_id.length>0?r.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=r.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":r.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":r.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,i=typeof s?.last_error=="string"?s.last_error:null,l=s?c_(s.phase):null,d=s?.kind==="stale_work_backup_fresh",p=r.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!r.external&&!r.done,enabled:!a&&(!s||!!i),label:d?i?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":i?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(i?d?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${i} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${i} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${l||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:p==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:l,error:i,confirmation:p}}function vr(e){let t=e.discard;if(!t||!t.operation)return"";let r=t.operation,n=r.kind==="stale_work_backup_fresh"&&!t.error?null:r.backup?.path,s=r.original_pr,o=r.revert_pr;return c`<div
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
  </div>`}var d_={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function fc(e,t=!1){if(!e||typeof e!="object")return null;let r=e;if(r.reason!=="worktree_stale_work"||!r.stale_work||typeof r.stale_work!="object")return null;let n=r.stale_work,s=n.residue==="branch"?"branch":"worktree",o=n.state==="unique"?"unique":"unknown",a=n.summary&&typeof n.summary=="object"?n.summary:{};function i(d){return Number.isInteger(a[d])?Number(a[d]):0}let l=typeof n.cause=="string"?n.cause:"observe_failed";return{residue:s,state:o,title:s==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":o==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:d_[l]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:s==="branch"?`\uACE0\uC720 commit ${i("branch_ahead")}`:[`staged ${i("staged_count")}`,`unstaged ${i("unstaged_count")}`,`untracked ${i("untracked_count")}`,`branch ahead ${i("branch_ahead")}`,`HEAD ahead ${i("head_ahead")}`].join(" \xB7 "),action_id:typeof n.action_id=="string"?n.action_id:"",can_resume:n.can_resume===!0,can_continue:n.can_continue===!0,can_backup_fresh:n.can_backup_fresh===!0,can_recheck:n.can_recheck===!0,locked:t}}function na(e){let t=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],n=$t(e.usage),s=Qt(e.usage),o=e.merge_step||null,a=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,i=e.lane==="done"&&!a,l=i?qt(e.done_at):"",d=t?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",p=typeof e.seq=="number"?c`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",_=e.worker_serial===!0?c`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",g=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",S=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,$=c`<span class="worker-mini__title">${e.title}</span>`,N=e.pr_url&&e.pr_number?c`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",M=e.completion_repair_pr_url&&e.completion_repair_pr_number?c`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",E=r.map(Ge=>Ge===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${Ge}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${Ge===e.completion_badge&&e.completion_title||""}
          >${Ge}</span
        >`),B=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",Z=n.length>0?n.map(Ge=>c`<span class="worker-usage" title=${Ge.tooltip}
              >${Ge.label}</span
            >`):s?c`<span class="worker-usage" title=${tn(e.usage)}
            >${s}</span
          >`:"",T=o?c`<span
        class="merge-step${o.failed?" merge-step--failed":""}"
        style=${`--progress: ${o.percent}%`}
        >${o.label}${o.index>0?c`<span class="merge-step__n"
              >${o.index}/${o.total}</span
            >`:""}</span
      >`:"",x=e.merge_action?c`<button
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
      </button>`:"",F=e.timeline_action?c`<button
        type="button"
        class="worker-mini__timeline"
        data-bead-id=${e.id}
        title="저장소 작업이 끝나지 않아 머지 액션이 잠겼습니다 — 타임라인에서 원인과 해결 버튼을 볼 수 있습니다"
      >
        저장소 작업 보기
      </button>`:"",te=e.discard,pe=te?.action||e.discard_action?c`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${te?.attempt_id||""}
          data-operation-id=${te?.operation?.operation_id||""}
          data-discard-mode=${te?.confirmation||"unmerged"}
          ?disabled=${te?!te.enabled:e.discard_enabled===!1}
          title=${te?te.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${te?.label||"\uD3D0\uAE30"}
        </button>`:"",ue=e.stale_work||null,ne=ue?c`${ue.can_resume||ue.can_continue?c`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${ue.action_id}
            ?disabled=${ue.locked}
          >
            기존 작업 이어가기
          </button>`:""}${ue.can_backup_fresh?c`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${ue.action_id}
            ?disabled=${ue.locked}
          >
            백업 후 새로 시작
          </button>`:""}${ue.can_recheck?c`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${ue.action_id}
            ?disabled=${ue.locked}
          >
            다시 확인
          </button>`:""}`:"",ie=ue?c`<div class="worker-mini__stale">
        <strong>${ue.title}</strong>
        <span>${ue.summary}</span>
        <span>${ue.cause}</span>
        ${ue.can_backup_fresh?c`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",Oe=e.revise_action?c`<button
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
        </button>`:"",Ne=!!(s||o||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||te?.operation||e.revise_action||ue);return c`<div
    class="worker-mini${a?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${o?" worker-mini--merging":""}${o?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${i?c`<div class="worker-mini__row1">${g}${S}${$}</div>
          <div class="worker-mini__row2">
            ${Z}${l?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${wt(e.done_at)}`}
                  >완료 ${l}</span
                >`:""}${typeof e.work_ms=="number"?c`<span
                  class="worker-mini__work"
                  title="attempt 실행 시간 합산 (재개 세션 포함)"
                  >작업 ${Ws(e.work_ms)}</span
                >`:""}${E}${T}
            <span class="worker-mini__actions"
              >${x}${R}${F}${pe}</span
            >
            ${on(e)}
          </div>`:a?c`<div class="worker-mini__head">
              ${d}${p}${g}${S}${N}${M}${E}${_}${B}
            </div>
            <div class="worker-mini__body">${$}${ie}</div>
            ${Ne?c`<div class="worker-mini__foot">
                  ${Z}${T}
                  <span class="worker-mini__actions"
                    >${x}${R}${F}${pe}${Oe}${ne}</span
                  >
                  ${vr(e)}
                </div>`:""}
            ${on(e)}`:c`<div class="worker-mini__line">
              ${d}${p}${g}${S}${$}${N}${M}${E}${_}${B}${Z}${T}${x}${R}${F}${pe}
            </div>
            ${vr(e)} ${on(e)}`}
  </div>`}function u_(e){let t=e.draggable&&!e.done,r=e.workflow,n=r&&r.chips||{},s=n.route||r&&r.route,o=n.route_source==="derived"||!!(r&&r.route_source==="derived"),a=typeof e.reason=="string"&&e.reason.split(" \xB7 ").includes("missing_description"),i=typeof e.reason=="string"&&e.reason.startsWith("\u26D4");return c`<div
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
    ${r?us(r,e.status):""}
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
    ${on(e)}
  </div>`}function rr(e){let t=!!e.collapsible&&!!e.collapsed,r=c`<span
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
                  </div>`:e.items.map(n=>e.lane==="candidate"?u_(n):na(n))}
          </div>`}
  </section>`}var _c=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],Dn=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function Gs(e,t){let r=_c.find(s=>s.step===e);if(!r)return null;let n=_c.length;return{step:r.step,label:t,index:r.index,total:n,percent:Math.round(r.index/n*100)}}function mc(e){let t=Dn.findIndex(r=>r.step===e);return Dn.map((r,n)=>({step:r.step,label:r.label,state:t<0?"todo":n<t?"done":n===t?"stall":"todo"}))}function Ur(e){let t=Dn.find(r=>r.step===e);return t?t.label:typeof e=="string"?e:""}function p_(e){let t=Dn.findIndex(r=>r.step===e);return t<0?null:{index:t+1,total:Dn.length}}function Vs(e){let t=p_(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var oa=new Set(["queued","running","retry_pending","repairing"]),gc=new Set(["failed","succeeded"]),f_={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",repairing:"\uC790\uB3D9 \uD574\uACB0 \uC911",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},Mn={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},__={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:Mn.base_containment,child_sweep:Mn.child_sweep,branch_cleanup:Mn.branch_cleanup,parent_close:Mn.parent_close};function m_(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function g_(e,t,r){return!["verify","deploy"].includes(e.kind)||![...oa,...gc].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(n=>n&&typeof n=="object"&&n.bead_id===t&&n.merged_sha===r)}function b_(e,t){let r=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(r!==0)return r;let n=d=>d.state==="succeeded"?1:2,s=n(t)-n(e);if(s!==0)return s;let o=typeof e.requested_at=="number"?e.requested_at:0,a=typeof t.requested_at=="number"?t.requested_at:0;if(o!==a)return a-o;let i=typeof e.operation_id=="string"?e.operation_id:"",l=typeof t.operation_id=="string"?t.operation_id:"";return i.localeCompare(l)}function sa(e,t=!1){let r=e.kind,n=r==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",s=t?"failed":e.state,o=f_[s];if(!o)return null;let a=Gs(r,`${n} ${o}`);return a?{...a,active:oa.has(s),failed:s==="failed"}:null}function h_(e){return!e||typeof e!="object"?null:__[e.step]||null}function Nn(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,r=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},n=h_(r),s=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,o=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),a=!o&&(e.cleanup_cursor==="repo_operations"||r.step==="repo_operations"),i=m_(e.merge_sha)?e.merge_sha:null,l=!o&&i&&Array.isArray(e.repo_operations)?e.repo_operations.filter($=>$&&typeof $=="object"&&g_($,t,i)).sort(b_):[],d=a?l:[],p=d.find($=>oa.has($.state));if(p)return sa(p);if(s)return s.step==="repo_operations"&&l[0]?sa(l[0],!0):null;let _=d.find($=>gc.has($.state)?$.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(_)return sa(_);if(n){let $=Gs(n.step,n.label);return $?{...$,active:!0,failed:!1}:null}let g=typeof e.cleanup_cursor=="string"?Mn[e.cleanup_cursor]:null;if(!g)return null;let S=Gs(g.step,g.label);return S?{...S,active:!0,failed:!1}:null}function Ys(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var bc={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},hc={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."};function yc(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function aa(e){for(let t of yc(e))if(Object.hasOwn(bc,t))return bc[t];return null}function ia(e){let t=null;for(let r of yc(e))Object.hasOwn(hc,r)&&(t=hc[r]);return t}function Ks(e){let t=aa(e),r=ia(e);return t&&r?`${t} \u2014 ${r}`:t||r?t||r:typeof e=="string"?e:""}function vc(e,t){let r=aa(e)??aa(t),n=ia(t)??ia(e);return r&&n?`${r} \u2014 ${n}`:r||n?r||n:typeof t=="string"?t:""}var wc=160;function y_(e){return e.length>wc?`${e.slice(0,wc)}\u2026`:e}function v_(e){return!e||!e.reason?"":c`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?c` · <code>${y_(e.command)}</code>`:""}
  </div>`}function w_(e){return e?c`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function la(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),r=Math.floor(t/60),n=t%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function kc(e){let t=e.failure?Ks(e.failure.reason):"";return c`<div class="worker-banners">
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
          ${w_(e.failure.reason)}
          ${vr({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function k_(e,t,r=null){let n=e.failed===!0,s=!!e.paused,o=n?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):s?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?la(t-e.started_at):"\u2014",a=ar(e),i=Sr(e),l=$t(e.usage),d=Qt(e.usage),p=e.conflict_resolution?s?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,_=e.base_exception||null,g=e.landing,S=e.attempt_id&&e.attempt_id===r,$=e.discard?.action?c`<button
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
            ${$}
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
            ${$}`}
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
    ${a||l.length>0||d||p||_?c`<div class="rtile__meta">
          ${p?c`<span class="worker-mini__badge">${p}</span>`:""}
          ${_?c`<span
                class="worker-mini__badge"
                title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                >${_}</span
              >`:""}
          ${a?c`<span class="rtile__runner">${a}</span>`:""}
          ${l.length>0?l.map(N=>c`<span class="worker-usage" title=${N.tooltip}
                    >${N.label}</span
                  >`):d?c`<span
                  class="worker-usage"
                  title=${tn(e.usage)}
                  >${d}</span
                >`:""}
        </div>`:""}
    ${on(e)} ${vr(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${n||s?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function ca(e,t=Date.now(),r=null){let n=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>k_(s,t,r))}
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
  </svg>`}function da(){return Wr(kr`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function ua(){return Wr(kr`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function $c(){return Wr(kr`<rect x="4.3" y="4.3" width="7.4" height="7.4" rx="1.2" />`)}function xc(){return Wr(kr`<path d="M4.4 4.4 11.6 11.6M11.6 4.4 4.4 11.6" />`)}function Sc(){return Wr(kr`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function Ac(){return Wr(kr`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function Ec(){return Wr(kr`<path d="M3 3.6 8.2 8 3 12.4z" />
    <path d="M8.8 3.6 14 8l-5.2 4.4z" />`)}var qn=1,$_=6e4,x_={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"},S_=new Set(["auto_merge","merged","merge","done"]),Tc={running:3,paused:2,failed:1};function A_(e,t){let r=null,n=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=n&&(n=o,r=s)}return r}function E_(e,t){let r=Object.values(e||{}),n=new Set,s=new Map;for(let a of r)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&n.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of r){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let i=null;if(a.status==="running")i="running";else if(a.status==="paused"&&!n.has(a.attempt_id))i="paused";else if(a.status==="failed"||a.status==="orphaned"){let _=t.get(a.bead_id),g=typeof _=="number"&&_>0&&typeof a.finished_at=="number"&&_>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!g&&typeof a.dismissed_at!="number"&&(i="failed")}if(!i)continue;let l=typeof a.started_at=="number"?a.started_at:null,d=o.get(a.bead_id);if(d){let _=Tc[d.run_state],g=Tc[i];if(_>g||_===g&&(d.started_at??0)>(l??0))continue}let p=typeof a.session_id=="string"&&a.session_id.length>0;o.set(a.bead_id,{attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",run_state:i,started_at:l,last_event_at:typeof a.last_event_at=="number"?a.last_event_at:null,runner:typeof a.runner=="string"?a.runner:null,model:typeof a.model=="string"?a.model:null,effort:typeof a.effort=="string"?a.effort:null,speed:typeof a.speed=="string"?a.speed:null,resumed_from:typeof a.resumed_from=="string"?a.resumed_from:null,continuation_mode:a.continuation_mode==="session"||a.continuation_mode==="fresh"?a.continuation_mode:null,usage:Wt(e,a.bead_id),can_pause:i==="running"&&p,can_resume:i!=="running"&&p&&!n.has(a.attempt_id)})}return o}function Cc(e,t){let r=e[t];if(!r)return"";if(r.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let n=typeof r.reason=="string"?r.reason:"",s=n.indexOf(":");return s>0&&s<n.length-1?`\u26D4 ${n.slice(0,s)} (${n.slice(s+1)})`:`\u26D4 ${n}`}function Mt(e){return e&&typeof e=="object"?e:{}}function pa(e,t,r){let n=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=r&&typeof r.done_since=="number"?r.done_since:void 0,a=new Map;for(let E of s)E&&typeof E.root_dir=="string"&&a.set(E.root_dir,E);let i=[],l=[],d=[],p=[],_=[],g=new Map;for(let E of n){if(!E||typeof E.root_dir!="string")continue;let B=E.root_dir,Z=E.name||B,T=a.get(B),x=T&&typeof T.revision=="number"?T.revision:typeof E.revision=="number"?E.revision:0,R=Mt(E.attempts),F=Mt(E.bead_titles),te=Mt(E.pr_observations),pe=Mt(E.admission),ue=Mt(E.revise_parked),ne=Mt(E.merge_queue_state),ie=Mt(E.cleanup_failed),Oe=Mt(E.discard_operations),Ne=Mt(E.pr_activity),Ge=Array.isArray(E.repo_operations)?E.repo_operations:[],Je=Array.isArray(E.merge_queue)?E.merge_queue:[],Ke=new Set(Je.filter(ee=>ee&&typeof ee.bead_id=="string").map(ee=>ee.bead_id)),Xe=new Map(Je.filter(ee=>ee&&typeof ee.bead_id=="string").map(ee=>[ee.bead_id,ee])),_e=Array.isArray(E.queue)?E.queue:[],Se=Array.isArray(E.done)?E.done:[],ve=new Map;for(let ee of Se)ee&&typeof ee.bead_id=="string"&&typeof ee.added_at=="number"&&ve.set(ee.bead_id,ee.added_at);let Ce=ee=>({id:ee,title:F[ee]||ee,root_dir:B,workspace_name:Z,expected_revision:x,draggable:!1}),me=new Set;for(let[ee,V]of E_(R,ve))me.add(ee),l.push({...Ce(ee),lane:"running",attempt_id:V.attempt_id,run_state:V.run_state,can_pause:V.can_pause,can_resume:V.can_resume,started_at:V.started_at,last_event_at:V.last_event_at,runner:V.runner,model:V.model,effort:V.effort,speed:V.speed,resumed_from:V.resumed_from,continuation_mode:V.continuation_mode,usage:V.usage,discard:cr(Oe,ee,{attempt_id:V.attempt_id}),badges:V.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:V.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:V.run_state==="failed"});for(let ee of Array.isArray(E.pr_wait)?E.pr_wait:[]){let V=ee&&ee.bead_id;if(typeof V!="string"||me.has(V))continue;me.add(V);let we=Mt(te[V]),ge=Mt(we.pr),se=we.gate?Mt(we.gate):null,W=Ke.has(V),z=Xe.get(V)?.continuation_action||null,I=!!z&&z.continuation===null,Y=ne.active===V,L=ee.external===!0,Q=ie[V]||null,le=Mt(Ne[V]),X=Nn({bead_id:V,merge_sha:ee.merge_sha,cleanup_cursor:ee.cleanup_cursor,merge_progress:le.merge_progress||null,cleanup_failed:Q,repo_operations:Ge}),fe=Ys(X),he=!!se&&se.base_badge==="\uCDA9\uB3CC",Be=!!Q&&["child_sweep","branch_cleanup","parent_close"].includes(Q.step)&&!!se&&se.tier==="merged",tt=L&&!!Q&&!!se&&se.tier==="merged",ct=!!se&&["closed_unmerged","review","undecidable"].includes(se.tier),Ve=cr(Oe,V,{external:L,merge_active:Y||X?.step==="merge",merge_queued:W,cleanup_active:fe,merged:!!Q||se?.tier==="merged"}),He=!!Ve.operation;d.push({...Ce(V),lane:"pr_wait",pr_number:typeof ge.number=="number"?ge.number:null,pr_url:typeof ge.url=="string"?ge.url:void 0,external:L,usage:Wt(R,V),merge_step:X,badges:I?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:X?[se?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:Q?[Ur(Q.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Ur(Q.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof se?.gate_badge=="string"&&se.gate_badge.length>0?[se.gate_badge]:[],alert:X?X.failed===!0:!!Q||ct,reason:Q&&X?.active!==!0?Vs(Q.step):"PR \uB300\uAE30",merge_action:se?.tier==="merged"&&!Be&&!tt?!1:!W||I,merge_enabled:!He&&(I||se?.enabled===!0||he||Be||tt),merge_label:I?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":tt||Be?"\uC815\uB9AC \uC7AC\uAC1C":he&&!Be?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:I?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":He?Ve.error?`\uD3D0\uAE30 \uC2E4\uD328: ${Ve.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${Ve.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:tt?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Be?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":he?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":se?.enabled===!0?`\uBA38\uC9C0 (${se.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${se?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:W&&!I,cancel_enabled:!Y,continuation_mismatch:z?.mismatch||null,discard:Ve,discard_action:Ve.action,discard_enabled:Ve.enabled,discard_title:Ve.title})}for(let ee=0;ee<_e.length;ee++){let V=_e[ee],we=V&&V.bead_id;if(typeof we!="string"||me.has(we))continue;me.add(we);let ge=ue[we],se=cr(Oe,we),W=se.operation?se:null,z={...Ce(we),lane:"queue",draggable:!W,discard:W||void 0,reason:Cc(pe,we),queue_position:ee+1,queue_index:ee,queue_length:_e.length,badges:ge?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!ge,revise_action:!!ge,revise_enabled:!!ge&&!W,revise_title:ge?ge.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${ge.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};p.push(z);let I=g.get(B);I?I.push(z):g.set(B,[z])}for(let ee of Array.isArray(E.runnable)?E.runnable:[]){let V=ee&&ee.bead_id;typeof V!="string"||me.has(V)||(me.add(V),i.push({...Ce(V),title:ee.title||F[V]||V,lane:"runnable",draggable:!0,reason:Cc(pe,V),created_at:ee.created_at??void 0,updated_at:ee.updated_at??void 0,labels:Array.isArray(ee.labels)?ee.labels:[],spec_reviewer:typeof ee.spec_reviewer=="string"?ee.spec_reviewer:void 0,plan_state:ee.plan_state==="approved"||ee.plan_state==="authored"?ee.plan_state:"none",workflow:ee.route?{route:ee.route,chips:{route:ee.route}}:null,place_index:_e.length}))}for(let ee of Se){let V=ee&&ee.bead_id;if(typeof V!="string"||me.has(V)||(me.add(V),o!==void 0&&typeof ee.added_at=="number"&&ee.added_at<o))continue;let we=A_(R,V);_.push({...Ce(V),lane:"done",done:!0,usage:Wt(R,V),done_at:typeof ee.added_at=="number"?ee.added_at:void 0,done_kind:we&&typeof we.done_kind=="string"?we.done_kind:null})}}let S=new Map;s.forEach((E,B)=>{E&&typeof E.root_dir=="string"&&S.set(E.root_dir,B)});let $=r&&r.running_sort==="repo"?"repo":"started";l.sort((E,B)=>{if($==="repo"){let x=S.get(E.root_dir)??Number.MAX_SAFE_INTEGER,R=S.get(B.root_dir)??Number.MAX_SAFE_INTEGER;if(x!==R)return x-R}let Z=typeof E.started_at=="number"&&Number.isFinite(E.started_at)?E.started_at:null,T=typeof B.started_at=="number"&&Number.isFinite(B.started_at)?B.started_at:null;return Z!==null&&T!==null&&Z!==T?Z-T:Z===null&&T!==null?1:Z!==null&&T===null?-1:E.id.localeCompare(B.id)}),_.sort((E,B)=>(B.done_at??0)-(E.done_at??0));let N=s.length>0?s:n.map(E=>({root_dir:E&&E.root_dir,name:E&&E.name,auto_advance:E&&E.auto_advance,auto_merge:E&&E.auto_merge,slots:E&&E.slots,revision:E&&E.revision,runner_catalog:E&&E.runner_catalog})),M=[];for(let E of N)!E||typeof E.root_dir!="string"||M.push({root_dir:E.root_dir,name:E.name||E.root_dir,auto_advance:E.auto_advance===!0,auto_merge:E.auto_merge===!0,slots:typeof E.slots=="number"&&E.slots>=qn?E.slots:qn,revision:typeof E.revision=="number"?E.revision:0,runner_catalog:Mt(E.runner_catalog),items:g.get(E.root_dir)||[]});return{runnable:i,queue:p,queue_groups:M,running:l,pr_wait:d,done:_,automation:{total:M.length,both_on:M.filter(E=>E.auto_advance&&E.auto_merge).length}}}function T_(e,t){if(typeof e!="number"||!Number.isFinite(e))return"";let n=t-e<$_;return c`<span
    class="mon-beat${n?" mon-beat--live":""}"
    title=${`\uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${wt(e)}`}
    ><span class="mon-beat__dot" aria-hidden="true"></span>${n?"":c`<span class="mon-beat__age"
          >${qt(e,t)}</span
        >`}</span
  >`}function Fn(e){return c`<div class="mon-c__title">${e.title}</div>`}function jn(e){return c`<span class="mon-c__id" title="클릭하면 상세로 이동"
    >${e.id}</span
  >`}function Zs(e){return e.workspace_name?c`<span class="mon-c__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:""}function fa(e){let t=$t(e.usage),r=Qt(e.usage);return t.length>0?t.map(n=>c`<span class="mon-c__usage" title=${n.tooltip}
          >${n.label}</span
        >`):r?c`<span class="mon-c__usage" title=${tn(e.usage)}
        >${r}</span
      >`:""}function _a(e){return(Array.isArray(e.badges)?e.badges:[]).map(r=>c`<span class="mon-c__badge${e.alert?" mon-c__badge--alert":""}"
        >${r}</span
      >`)}function C_(e){return c`<span class="mon-c__ops">
    ${e.run_state==="running"?c`<button
          type="button"
          class="mon-op mon-op--pause"
          ?disabled=${e.can_pause===!1}
          aria-label="일시정지"
          title="일시정지 — 세션을 끊고 이어하기 가능 상태로 둡니다"
        >
          ${ua()}
        </button>`:c`<button
          type="button"
          class="mon-op mon-op--resume"
          ?disabled=${e.can_resume===!1}
          aria-label="이어하기"
          title="이어하기"
        >
          ${da()}
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
          ${xc()}
        </button>`:""}
  </span>`}function R_(e,t){let r=typeof e.started_at=="number"?la(t-e.started_at):"";return c`${Fn(e)}
    <div class="mon-c__meta">
      ${_a(e)}${T_(e.last_event_at,t)}${jn(e)}${Zs(e)}
      ${ar(e)?c`<span class="mon-c__model">${ar(e)}</span>`:""}
      ${Sr(e)?c`<span
            class="rtile__resumed"
            title=${Sr(e)}
            >↻</span
          >`:""}
      ${r?c`<span class="mon-live__elapsed">${r}</span>`:""}
      ${fa(e)}${C_(e)}${vr(e)}
    </div>`}function I_(e){let t=e.workflow,n=(t&&t.chips||{}).route||t&&t.route,s=typeof e.spec_reviewer=="string"?e.spec_reviewer:"",o=e.plan_state==="approved"?"plan \u2713":e.plan_state==="authored"?"plan \u270E":"plan \u2013",a=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),i=qt(e.updated_at);return c`${Fn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>${jn(e)}
      ${n?c`<span class="ctl-chip ctl-chip--route">${n}</span>`:""}
      ${s?c`<span
            class="ctl-chip mon-c__review${s==="skipped"?" mon-c__review--dim":""}"
            >spec:${s}</span
          >`:""}
      ${n==="full_plan"?c`<span
            class="ctl-chip mon-c__plan${e.plan_state==="none"?" mon-c__review--dim":""}"
            >${o}</span
          >`:""}
      ${ds(e.labels,null).map(l=>c`<span class="ctl-chip ctl-chip--label">${l}</span>`)}
      ${Zs(e)}
      ${i?c`<span title=${`\uC218\uC815 ${wt(e.updated_at)}`}
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
    </div>`}function L_(e){let t=!!e.discard?.operation;return c`${Fn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>
      <span class="mon-live__pos">#${e.queue_position}</span>${jn(e)}
      ${_a(e)}
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
        </div>`:""}`}function O_(e){let t=e.merge_step||null,r=!!(Qt(e.usage)||t||e.merge_action||e.cancel_action||e.discard_action);return c`${Fn(e)}
    <div class="mon-c__meta">
      ${jn(e)}${Zs(e)}
      ${e.pr_url&&e.pr_number?c`<a
            class="mon-c__pr"
            href=${e.pr_url}
            target="_blank"
            rel="noreferrer noopener"
            title="PR 열기"
            >#${e.pr_number} ↗</a
          >`:""}
      ${_a(e)}
      ${e.reason?c`<span class="mon-c__reason">${e.reason}</span>`:""}
    </div>
    ${r?c`<div class="mon-c__tail">
          ${fa(e)}${t?c`<span
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
        </div>`:""}`}function P_(e,t){let r=e.done_kind||"",n=r?x_[r]||r:"",s=qt(e.done_at,t);return c`${Fn(e)}
    <div class="mon-c__meta">
      ${jn(e)}${Zs(e)}
      ${n?c`<span
            class="mon-live__kind${S_.has(r)?" mon-live__kind--ok":" mon-live__kind--warn"}"
            >${n}</span
          >`:""}
      ${fa(e)}
      ${s?c`<span title=${`\uC644\uB8CC ${wt(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
    </div>`}function Rc(e,t){return e.lane==="running"?R_(e,t):e.lane==="runnable"?I_(e):e.lane==="queue"?L_(e):e.lane==="pr_wait"?O_(e):P_(e,t)}function Ic(e){let t=String(e.revision);return c`<header
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
        ${e.auto_advance?ua():da()}
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
        ${Sc()}
        <span class="mon-ctl__label">머지</span>
      </button>
      <label class="mon-ctl mon-ctl--slots" title="동시에 실행할 세션 수">
        ${Ac()}
        <span class="mon-ctl__label">슬롯</span>
        <input
          type="number"
          class="mon-slots__input"
          min=${qn}
          step="1"
          data-root-dir=${e.root_dir}
          data-revision=${t}
          aria-label=${`${e.name} \uB3D9\uC2DC \uC2E4\uD589 \uC2AC\uB86F`}
          .value=${String(e.slots)}
        />
      </label>
    </span>
  </header>`}function Lc(e){let{total:t,both_on:r}=e.automation,n=t>0&&r===t,s=e.running_sort==="repo"?"repo":"started",o=or.find(i=>i.value===e.done_range)?.label||"",a=Array.isArray(e.token_total)?e.token_total:e.token_total?[{label:e.token_total,tooltip:e.token_tooltip}]:[];return c`<div class="mon-top">
    <button
      type="button"
      class="mon-auto-all${n?" is-active":""}"
      data-on=${n?"false":"true"}
      aria-pressed=${n?"true":"false"}
      ?disabled=${t===0}
      title=${n?"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4 (\uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4)":"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
    >
      ${n?$c():Ec()}
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
        ${or.map(i=>c`<option
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
  </div>`}function Oc(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function Pc(e){let t=(Array.isArray(e)?e:[]).map(i=>i&&i.usage).filter(i=>i&&typeof i=="object"&&"providers"in i);if(t.length>0)return $t(bs(t));let r={};for(let i of _r)r[i]=0;let n=!1,s=0,o=0,a=0;for(let i of Array.isArray(e)?e:[]){let l=i&&i.usage;if(l&&typeof l=="object"){let d=!1;for(let p of _r){let _=l[p];typeof _=="number"&&Number.isFinite(_)&&(r[p]+=_,n=!0,d=!0)}if(d){o+=1;let p=l.total_cost_usd;typeof p=="number"&&Number.isFinite(p)&&(s+=p,a+=1)}}}return o>0&&a===o&&(r.total_cost_usd=s),n?Qt(r):null}var Mc="bdui.monitor.done-range",Nc="bdui.monitor.running_sort";function D_(){try{let e=window.localStorage.getItem(Mc);return Ut(e)?e:Nt}catch{return Nt}}function M_(e){try{window.localStorage.setItem(Mc,e)}catch{}}function N_(){try{return window.localStorage.getItem(Nc)==="repo"?"repo":"started"}catch{return"started"}}function q_(e){try{window.localStorage.setItem(Nc,e)}catch{}}var qc="tab:monitor:pipeline",F_=1e3,j_=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}];function Dc(e,t){let r=(e.lane==="runnable"||e.lane==="queue")&&e.draggable!==!1;return c`<div
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
    ${Rc(e,t)}
  </div>`}function Fc(e,t){let r=ft("views:monitor"),n=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,i=t.switchWorkspace,l=t.now||(()=>Date.now()),d=t.confirm||(I=>typeof globalThis.confirm!="function"||globalThis.confirm(I)),p=D_(),_=N_();function g(){let I=or.find(Y=>Y.value===p);return I?I.label:""}let S=document.createElement("div");S.className="mon",e.appendChild(S);let $=pa(null,null),N=new Map,M=null,E=null;async function B(I,Y,L,Q,le=!0){if(!o||!L)return null;let X=await o(I,{...Y,root_dir:L,expected_revision:Q});if(X&&X.conflict&&le){X.queue&&N.set(L,X.queue);let fe=X.queue&&typeof X.queue.revision=="number"?X.queue.revision:Q;X=await o(I,{...Y,root_dir:L,expected_revision:fe})}return X&&X.queue&&L&&N.set(L,X.queue),X}function Z(I,Y){let L=N.get(I),Q=s&&s.get?s.get():null,le=(Array.isArray(Q)?Q:[]).find(fe=>fe?.root_dir===I);return(L||le)?.merge_queue?.find(fe=>fe.bead_id===Y)?.continuation_action}async function T(I,Y,L,Q){let le=await B(I,Y,L,Q),X=N.get(L)?.revision??le?.queue?.revision??Q;return fr(le,(fe,he)=>B(I,{...Y,continuation:fe,decision_token:he},L,X,!1),{refresh:fe=>B(I,Y,L,fe?.queue?.revision??N.get(L)?.revision??X,!1)})}async function x(I,Y,L,Q){let le=await fr({continuation_mismatch:Q},(fe,he)=>B("worker-merge-queue-add",{bead_id:Y,continuation:fe,decision_token:he},I,L,!1)),X=le?.queue?.merge_queue?.find(fe=>fe.bead_id===Y)?.continuation_action;le?.applied!==!0&&X?.continuation===null&&X.mismatch&&await x(I,Y,le.queue.revision,X.mismatch)}async function R(I,Y,L){let Q=await B("worker-discard",I,Y,L);if(Q&&Q.discarded===!0){oe(Hs(Q),"success",5e3);return}if(Q&&Q.reason){oe(`\uD3D0\uAE30 \uC2E4\uD328: ${Q.reason}`,"error");return}if(Q&&Q.accepted&&Q.pending==="merged_revert"){oe("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(Q&&Q.accepted){oe(`\uD3D0\uAE30 \uC9C4\uD589: ${Q.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}Q&&!Q.conflict&&oe("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function F(I,Y,L){return!o||!L?null:await o(I,{...Y,root_dir:L})}async function te(I){if(!o||!I&&!d("\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB055\uB2C8\uB2E4. \uAC01 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uD568\uAED8 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?"))return;let Y=await o("monitor-auto-toggle",{on:I}),L=Y&&Array.isArray(Y.failed)?Y.failed:[];L.length>0&&oe(`\uC790\uB3D9\uD654 ${I?"\uCF1C\uAE30":"\uB044\uAE30"} \uC77C\uBD80 \uC2E4\uD328: ${L.map(Q=>Q.root_dir).join(", ")}`,"error",3200)}async function pe(){let I=new Map;for(let Y of $.pr_wait)I.has(Y.root_dir)||I.set(Y.root_dir,Y.expected_revision);for(let[Y,L]of I)await B("worker-merge-queue-add-all",{},Y,L)}let ue=null,ne=!1,ie=null;function Oe(){ie!==null&&clearTimeout(ie),ie=setTimeout(()=>{ie=null,ne=!1},0)}function Ne(I){let Y=I.target;return typeof Y?.closest=="function"?Y.closest(".mon-group"):null}function Ge(I){let Y=Ne(I);return!Y||!ue?null:(Y.getAttribute("data-root-dir")||"")===ue.root_dir?Y:null}function Je(){for(let I of Array.from(S.querySelectorAll(".mon-group--drag-over")))I.classList.remove("mon-group--drag-over")}function Ke(I){let Y=I.target,L=typeof Y?.closest=="function"?Y.closest('.mon-card[draggable="true"]'):null;if(L){ue={bead_id:L.getAttribute("data-issue-id")||"",lane:L.getAttribute("data-lane")||"",root_dir:L.getAttribute("data-root-dir")||"",revision:Number(L.getAttribute("data-revision")||0)||0,queue_index:Number(L.getAttribute("data-queue-index")),queue_length:Number(L.getAttribute("data-queue-length")),place_index:Number(L.getAttribute("data-place-index"))},ne=!0;try{I.dataTransfer?.setData("text/plain",ue.bead_id),I.dataTransfer&&(I.dataTransfer.effectAllowed="move")}catch{}}}function Xe(I){let Y=Ge(I);Y&&(I.preventDefault(),I.dataTransfer&&(I.dataTransfer.dropEffect="move"),Y.classList.add("mon-group--drag-over"))}function _e(I){Ne(I)?.classList.remove("mon-group--drag-over")}function Se(){ue=null,Je(),Oe()}function ve(I){let Y=Ge(I),L=ue;if(ue=null,Je(),!Y||!L||!L.bead_id)return;I.preventDefault();let Q=I.target,le=typeof Q?.closest=="function"?Q.closest('.mon-card[data-lane="queue"]'):null,X=le&&Y.contains(le)?Number(le.getAttribute("data-queue-index")):NaN;if(L.lane==="runnable"){let Be=Number.isFinite(X)?X:L.place_index;if(!Number.isFinite(Be))return;B("worker-queue-place",{bead_id:L.bead_id,index:Be},L.root_dir,L.revision);return}if(L.lane!=="queue"||le&&le.getAttribute("data-issue-id")===L.bead_id)return;let fe=L.queue_index,he=Number.isFinite(X)?fe>X?X:X-1:L.queue_length-1;!Number.isFinite(he)||he<0||he===fe||B("worker-queue-reorder",{bead_id:L.bead_id,to_index:he},L.root_dir,L.revision)}function Ce(I){let Y={runnable:$.runnable,queue:$.queue,running:$.running,pr_wait:$.pr_wait,done:$.done};return c`${Lc({automation:$.automation,counts:{running:$.running.length,queue:$.queue.length,pr_wait:$.pr_wait.length},running_sort:_,done_range:p,token_total:Pc($.done),token_tooltip:Oc(g())})}
      <div class="worker-lanes mon-lanes">
        ${j_.map(L=>{let Q=Y[L.lane],le=L.lane==="queue"?$.queue_groups.length>0?c`${$.queue_groups.map(X=>c`<div
                        class="mon-group"
                        data-root-dir=${X.root_dir}
                      >
                        ${Ic(X)}
                        <div class="mon-group__list">
                          ${X.items.map(fe=>Dc(fe,I))}
                        </div>
                      </div>`)}`:void 0:Q.length>0?c`${Q.map(X=>Dc(X,I))}`:void 0;return rr({id:`monitor-${L.lane}`,lane:L.pane,title:L.lane==="done"?`\uC644\uB8CC\xB7${g()}`:L.title,items:Q,empty:L.empty,body:le,live:L.lane==="running"&&Q.length>0,header_control:L.lane==="pr_wait"&&Q.length>0?c`<button
                    type="button"
                    class="mon-lane-op mon-merge-all"
                    title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
                  >
                    일괄 머지
                  </button>`:""})})}
      </div>`}function me(){let I=s&&s.get?s.get():null,Y=s&&s.getWorkspacesState?s.getWorkspacesState():[],L=l();$=pa(I,Y,{done_since:Dr(p,L),running_sort:_}),je(Ce(L),S)}function ee(I,Y){let L=a?a():void 0;if(!Y||!L||Y===L||!i){n(I);return}i(Y).then(()=>{n(I)}).catch(Q=>{r("workspace switch for %s failed: %o",Y,Q)})}function V(I){return{root_dir:I.getAttribute("data-root-dir")||"",revision:Number(I.getAttribute("data-revision")||0)||0}}function we(I,Y){let{root_dir:L,revision:Q}=V(I),le=I.getAttribute("data-issue-id")||"",X=Y.dataset.attemptId||I.getAttribute("data-attempt-id")||"",fe=Y.classList;if(fe.contains("worker-card__place")){B("worker-queue-place",{bead_id:le,index:Number(I.getAttribute("data-place-index")||0)||0},L,Q);return}if(fe.contains("mon-op--up")||fe.contains("mon-op--down")){let he=Number(I.getAttribute("data-queue-index")||0)||0,Be=fe.contains("mon-op--up")?he-1:he+1;if(Be<0)return;B("worker-queue-reorder",{bead_id:le,to_index:Be},L,Q);return}if(fe.contains("mon-op--remove")){B("worker-queue-remove",{bead_id:le},L,Q);return}if(fe.contains("mon-op--pause")){F("worker-attempt-pause",{attempt_id:X},L);return}if(fe.contains("mon-op--discard")){if(!d(Pn(le,"unmerged")))return;R({bead_id:le,...X?{attempt_id:X}:{},...Y.dataset.operationId?{operation_id:Y.dataset.operationId}:{}},L,Q);return}if(fe.contains("mon-op--resume")){Jr().then(he=>{if(he!==null)return T("worker-attempt-resume",{attempt_id:X,...he!==""?{instructions:he}:{}},L,Q)});return}if(fe.contains("mon-op--dismiss")){B("worker-attempt-dismiss",{attempt_id:X},L,Q);return}if(fe.contains("worker-mini__merge")){let he=Z(L,le);he?.mismatch&&he.continuation===null?x(L,le,Q,he.mismatch):B("worker-merge-queue-add",{bead_id:le},L,Q);return}if(fe.contains("worker-mini__merge-cancel")){B("worker-merge-queue-remove",{bead_id:le},L,Q);return}if(fe.contains("worker-mini__discard")){let he=Y.dataset.discardMode==="merged"?"merged":"unmerged";if(!d(Pn(le,he)))return;R({bead_id:le,...X?{attempt_id:X}:{},...Y.dataset.operationId?{operation_id:Y.dataset.operationId}:{}},L,Q);return}if(fe.contains("worker-mini__revise-fix")){T("worker-revise-fix",{bead_id:le},L,Q);return}fe.contains("worker-mini__revise-approve")&&B("worker-revise-approve",{bead_id:le},L,Q)}function ge(I){let Y=ne;ne=!1;let L=I.target;if(!L||typeof L.closest!="function"||L.closest("dialog")||L.closest("a"))return;let Q=L.closest(".mon-running-sort");if(Q){I.preventDefault(),_=Q.getAttribute("data-sort")==="repo"?"repo":"started",q_(_),me();return}let le=L.closest(".mon-auto-all");if(le){I.preventDefault(),te(le.getAttribute("data-on")==="true");return}if(L.closest(".mon-merge-all")){I.preventDefault(),pe();return}let fe=L.closest(".mon-ctl--advance");if(fe){I.preventDefault();let{root_dir:Ve,revision:He}=V(fe);B("worker-automation-toggle",{on:fe.getAttribute("data-on")==="true"},Ve,He);return}let he=L.closest(".mon-ctl--merge-auto");if(he){I.preventDefault();let{root_dir:Ve,revision:He}=V(he);B("worker-merge-auto-toggle",{on:he.getAttribute("data-on")==="true"},Ve,He);return}let Be=L.closest(".mon-card");if(!Be)return;let tt=L.closest("button");if(tt){I.preventDefault(),we(Be,tt);return}let ct=Be.getAttribute("data-issue-id");ct&&!Y&&(I.preventDefault(),ee(ct,Be.getAttribute("data-root-dir")||""))}function se(I){let Y=I.target;if(!Y||typeof Y.closest!="function")return;let L=Y.closest(".mon-done-range");if(L){p=Ut(L.value)?L.value:Nt,M_(p),me();return}let Q=Y.closest(".mon-slots__input");if(!Q)return;let{root_dir:le,revision:X}=V(Q),fe=Number(Q.value);if(!Number.isFinite(fe))return;let he=Math.max(qn,Math.floor(fe));B("worker-queue-set-slots",{slots:he},le,X)}e.addEventListener("click",ge),e.addEventListener("change",se),e.addEventListener("dragstart",Ke),e.addEventListener("dragover",Xe),e.addEventListener("dragleave",_e),e.addEventListener("drop",ve),e.addEventListener("dragend",Se),s&&typeof s.subscribe=="function"&&(M=s.subscribe(()=>{try{N.clear(),me()}catch{}}));function W(){E!==null&&(clearInterval(E),E=null)}function z(){ie!==null&&(clearTimeout(ie),ie=null)}return{load(){r("load"),me(),E===null&&(E=setInterval(()=>{try{me()}catch{}},F_))},pause(){W()},clear(){W(),z(),M&&(M(),M=null),e.removeEventListener("click",ge),e.removeEventListener("change",se),e.removeEventListener("dragstart",Ke),e.removeEventListener("dragover",Xe),e.removeEventListener("dragleave",_e),e.removeEventListener("drop",ve),e.removeEventListener("dragend",Se),e.replaceChildren()}}}function jc(e,t,r){let n=ft("views:nav"),s=null;function o(l){return d=>{d.preventDefault(),n("click tab %s",l),r.gotoView(l)}}function a(){let l=t.getState(),d=l.view==="worker"||l.view==="monitor"?l.view:"board";return c`
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
    `}function i(){je(a(),e)}return i(),s=t.subscribe(()=>i()),{destroy(){s&&(s(),s=null),je(c``,e)}}}var Bc=["bug","feature","task","epic","chore"];function Uc(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var Wc=["Critical","High","Medium","Low","Backlog"];function zc(e,t){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,e.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),a=r.querySelector("#new-priority"),i=r.querySelector("#new-labels"),l=r.querySelector("#new-description"),d=r.querySelector("#new-issue-error"),p=r.querySelector("#btn-cancel"),_=r.querySelector("#btn-create"),g=r.querySelector(".new-issue__close");function S(){o.replaceChildren();let x=document.createElement("option");x.value="",x.textContent="\u2014 Select \u2014",o.appendChild(x);for(let R of Bc){let F=document.createElement("option");F.value=R,F.textContent=Uc(R),o.appendChild(F)}a.replaceChildren();for(let R=0;R<=4;R+=1){let F=document.createElement("option");F.value=String(R);let te=Wc[R]||"Medium";F.textContent=`${R} \u2013 ${te}`,a.appendChild(F)}}S();function $(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function N(x){s.disabled=x,o.disabled=x,a.disabled=x,i.disabled=x,l.disabled=x,p.disabled=x,_.disabled=x,_.textContent=x?"Creating\u2026":"Create"}function M(){d.textContent=""}function E(x){d.textContent=x}function B(){try{let x=window.localStorage.getItem("beads-ui.new.type");x?o.value=x:o.value="";let R=window.localStorage.getItem("beads-ui.new.priority");R&&/^\d$/.test(R)?a.value=R:a.value="2"}catch{o.value="",a.value="2"}}function Z(){let x=o.value||"",R=a.value||"";x.length>0&&window.localStorage.setItem("beads-ui.new.type",x),R.length>0&&window.localStorage.setItem("beads-ui.new.priority",R)}async function T(){M();let x=String(s.value||"").trim();if(x.length===0){E("Title is required"),s.focus();return}let R=Number(a.value||"2");if(!(R>=0&&R<=4)){E("Priority must be 0..4"),a.focus();return}let F=String(o.value||""),te=String(l.value||""),pe={title:x};F.length>0&&(pe.type=F),String(R).length>0&&(pe.priority=R),te.length>0&&(pe.description=te),N(!0);try{await t("create-issue",pe)}catch{N(!1),E("Failed to create issue");return}Z(),N(!1),$()}return r.addEventListener("cancel",x=>{x.preventDefault(),$()}),g.addEventListener("click",()=>$()),p.addEventListener("click",()=>$()),r.addEventListener("keydown",x=>{x.key==="Enter"&&(x.ctrlKey||x.metaKey)&&(x.preventDefault(),T())}),n.addEventListener("submit",x=>{x.preventDefault(),T()}),{open(){n.reset(),M(),B();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){$()}}}var B_=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function U_(e,t){return vo(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function Hc(e,t,r){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?c`<div class="settings-dialog__empty">라벨 없음</div>`:c`<div class="settings-dialog__pills">
            ${t.map(n=>{let s=U_(n,e);return c`<button
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
  `}function Gc(e,t,r){return c`
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
  `}function Vc(e,t){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${B_.map(([r,n])=>c`<label class="settings-dialog__toggle">
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
  `}var W_=[{id:"session",label:"\uC138\uC158",glyph:"\u25C6"},{id:"worker",label:"Worker",glyph:"\u25A4"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}],Ft="";function jt(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Yc(e,t){let{transport:r,policyStore:n,labelOptions:s}=t,o=t.notify||(C=>oe(C,"error",4e3)),a=document.createElement("dialog");a.id="settings-dialog",a.className="settings-dialog",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","\uC124\uC815"),e.appendChild(a);let i="session",l=!1,d="",p={},_={},g=[],S=!1,$=null,N={},M="",E="",B=!1,Z=!1,T=!1,x=null;function R(){let C=t.queueStore?.get();return jt(C)?C.runner_catalog:null}function F(){let C=t.queueStore?.get();return jt(C)&&jt(C.execution_defaults)?C.execution_defaults:null}function te(){let C=t.implPresetStore?.get();return jt(C)&&Array.isArray(C.presets)?C:null}async function pe(){S=!0,X();try{let C=await r("get-session-defaults",{});p=jt(C?.values)?{...C.values}:{},_={...p},g=Array.isArray(C?.warnings)?C.warnings:[]}catch(C){g=["kv_read_failed"],o(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${C instanceof Error?C.message:String(C)}`)}finally{S=!1,X()}}async function ue(){let C=Gl(p,_);if(Object.keys(C).length!==0){try{let K=await r("set-session-defaults",{values:C});p=jt(K?.values)?{...K.values}:{},_={...p},g=Array.isArray(K?.warnings)?K.warnings:[]}catch(K){o(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${K instanceof Error?K.message:String(K)}`)}X()}}function ne(C,K){K===Ft?delete _[C]:_[C]=K,X(),ue()}async function ie(){let C=t.queueStore?.get();if(!jt(C))return;let K={orchestration_model:C.orchestration_model??null,orchestration_effort:C.orchestration_effort??null,orchestration_speed:C.orchestration_speed??null},ce=Vl(K,{...K,...N});if(Object.keys(ce).length!==0){try{let Ee=await r("worker-queue-set-orchestration-defaults",{expected_revision:C.revision,values:ce});if(Ee&&Ee.applied===!1){o("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}N={}}catch(Ee){o(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${Ee instanceof Error?Ee.message:String(Ee)}`)}X()}}function Oe(C,K){N[C]=K===Ft?null:K,X(),ie()}async function Ne(C){let K=t.queueStore?.get();if(!(!jt(K)||C<1)){try{await r("worker-queue-set-slots",{expected_revision:K.revision,slots:C})}catch(ce){o(`slots \uC800\uC7A5 \uC2E4\uD328: ${ce instanceof Error?ce.message:String(ce)}`)}X()}}function Ge(){let C={};for(let K of Wl){let ce=_[K];typeof ce=="string"&&ce.length>0&&(C[K]=ce)}return C}async function Je(){let C=te();if(!C)return;let K=Ge();if(Object.keys(K).length===0){o("\uC800\uC7A5\uD560 \uAD6C\uD604 \uAC12\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uAD6C\uD604 \uADF8\uB8F9\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let ce=(C.presets||[]).find(qe=>qe.id===M),Ee=E.trim()||(ce?ce.name:"");if(!Ee){o("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let qe=ce?await r("impl-preset-update",{expected_revision:C.revision,id:ce.id,name:Ee,settings:K}):await r("impl-preset-create",{expected_revision:C.revision,name:Ee,settings:K});if(qe&&qe.applied){if(E="",!ce&&Array.isArray(qe.presets)){let rt=qe.presets.find(nt=>nt.name===Ee);M=rt?rt.id:M}X()}else o("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),X()}catch(qe){o(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${qe instanceof Error?qe.message:String(qe)}`)}}async function Ke(){let C=te();if(!(!C||M.length===0))try{let K=await r("impl-preset-delete",{expected_revision:C.revision,id:M});K&&K.applied?(M="",X()):(o("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),X())}catch(K){o(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${K instanceof Error?K.message:String(K)}`)}}async function Xe(){let C=te();if(!(!C||M.length===0)){try{let K=await r("apply-impl-preset-global",{preset_id:M,expected_revision:C.revision});K&&K.applied?(p=jt(K.values)?{...K.values}:{},_={...p},g=Array.isArray(K.warnings)?K.warnings:[]):K&&K.conflict&&o("\uAD6C\uD604 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(K){o(`\uAD6C\uD604 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${K instanceof Error?K.message:String(K)}`)}X()}}async function _e(){Z=!0,T=!1,X();try{let C=await r("get-worker-system-prompt",{});!C||typeof C!="object"||Array.isArray(C)?T=!0:x=C}catch{T=!0}finally{Z=!1,X()}}function Se(){if(B=!B,B&&!x){_e();return}X()}function ve(){let C=nn({loading:Z,error:T});if(C)return C;if(!x)return"";let K=Array.isArray(x.variants)?x.variants:[];return c`<div class="settings-dialog__sp-body">
      ${x.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${x.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${K.map(ce=>c`<div class="settings-dialog__sp-variant" data-variant=${ce.key}>
            <div class="settings-dialog__sp-cond">${ce.condition}</div>
            ${hr(ce.label,ce.system_prompt)}
          </div>`)}
    </div>`}function Ce(){return c`<section
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
        @click=${Se}
      >
        ${B?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${B?ve():""}
    </section>`}function me(C,K,ce,Ee,qe,rt){let nt=qe[C]??Ft,Fe=Zo(C,ce,qe,F(),R()),_t=Fe.options.find(De=>De.value===nt),Re=nt===Ft?Fe.full_value:_t?.full_value;return c`<select
        class=${nt===Ft?"settings-dialog__unset":""}
        data-key=${C}
        aria-label=${K}
        title=${Re||""}
        ?disabled=${rt===!0||Fe.disabled}
        .value=${Br(String(nt))}
        @change=${De=>Ee(C,String(De.target.value))}
      >
        <option value=${Ft} ?selected=${nt===Ft}>
          ${Fe.unset_label}
        </option>
        ${Fe.options.map(De=>c`<option
              value=${De.value}
              title=${De.full_value||""}
              ?selected=${De.value===nt}
            >
              ${De.label}
            </option>`)}
      </select>
      ${nt===Ft?c`<span class="settings-dialog__source-badge">기본</span>`:""}`}function ee(C,K,ce,Ee,qe,rt=!1){return c`<div
      class=${`settings-dialog__row${rt?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${K}</span>
      <span class="settings-dialog__controls">
        ${me(C,K,ce,Ee,qe,rt)}
      </span>
    </div>`}function V(C,K,ce,Ee,qe){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${K}-on)`}
        ></i>
        ${C}
      </span>
      <span class="settings-dialog__controls">
        ${me(ce,`${C} \uBAA8\uB378`,Ee,ne,_,!1)}
        ${me(qe,`${C} effort`,Ns,ne,_,!1)}
      </span>
    </div>`}function we(){let C=R(),K=Hl(_),ce=_.impl_runtime,Ee=_.impl_model,qe=te(),rt=F()?.supported===!0,nt=Zo("workflow_mode",In,_,F(),C);return c`
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
        ${rt?"":c`<div
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
                        data-mode=${Ft}
                        aria-pressed=${String(!_.workflow_mode)}
                        @click=${()=>ne("workflow_mode",Ft)}
                      >
                        ${nt.unset_label}
                      </button>
                      ${_.workflow_mode?"":c`<span class="settings-dialog__source-badge"
                            >기본</span
                          >`}
                      ${In.map(Fe=>c`<button
                            type="button"
                            data-mode=${Fe}
                            aria-pressed=${String(_.workflow_mode===Fe)}
                            @click=${()=>ne("workflow_mode",Fe)}
                          >
                            ${Fe}
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
                ${V("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",Ln,"spec_review_effort")}
                ${V("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",Ms,"plan_review_effort")}
                ${V("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",Ln,"impl_review_effort")}
              </div>

              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">
                  구현
                  <span class="settings-dialog__hint"
                    >이슈 핀이 있으면 핀이 우선합니다</span
                  >
                </div>
                ${ee("impl_dispatch","\uC2E4\uD589 \uBC29\uC2DD",Ps,ne,_)}
                ${ee("impl_runtime","\uC704\uC784 \uB300\uC0C1",Ds,ne,_,K)}
                ${ee("impl_model","\uBAA8\uB378",qs(C,ce),ne,_,K)}
                ${ee("impl_effort","effort",sn(C,ce,Ee),ne,_,K)}
                ${ee("impl_speed","\uC18D\uB3C4",Rn,ne,_,K)}
              </div>

              <div class="settings-dialog__preset-bar">
                <select
                  aria-label="구현 프리셋"
                  .value=${Br(M)}
                  @change=${Fe=>{M=String(Fe.target.value),X()}}
                >
                  <option value="" ?selected=${M===""}>
                    구현 프리셋…
                  </option>
                  ${(qe?.presets||[]).map(Fe=>c`<option
                        value=${Fe.id}
                        ?selected=${Fe.id===M}
                      >
                        ${Fe.name}
                      </option>`)}
                </select>
                <button
                  type="button"
                  class="settings-dialog__btn settings-dialog__btn--primary"
                  ?disabled=${M.length===0}
                  @click=${Xe}
                >
                  전역 기본값으로 적용
                </button>
                <input
                  type="text"
                  class="settings-dialog__preset-name"
                  placeholder=${M?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                  aria-label="프리셋 이름"
                  .value=${Br(E)}
                  @input=${Fe=>{E=String(Fe.target.value)}}
                />
                <button
                  type="button"
                  class="settings-dialog__btn"
                  data-preset-save
                  @click=${Je}
                >
                  ${M?"\uAC31\uC2E0":"\uC800\uC7A5"}
                </button>
                <button
                  type="button"
                  class="settings-dialog__btn"
                  data-preset-delete
                  ?disabled=${M.length===0}
                  @click=${Ke}
                >
                  삭제
                </button>
              </div>
            `}
      </section>
    `}function ge(){let C=t.queueStore?.get(),K=R(),ce={orchestration_model:N.orchestration_model??(jt(C)?C.orchestration_model:null),orchestration_effort:N.orchestration_effort??(jt(C)?C.orchestration_effort:null),orchestration_speed:N.orchestration_speed??(jt(C)?C.orchestration_speed:null)},Ee=Fs(K,$),qe=sn(K,$||void 0,ce.orchestration_model||lr).filter(nt=>nt!==lr),rt=jt(C)&&typeof C.slots=="number"?C.slots:2;return c`
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
        ${F()?.supported!==!0?c`<div
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
                .value=${Br($||Ft)}
                @change=${nt=>{let Fe=String(nt.target.value);$=Fe===Ft?null:Fe,X()}}
              >
                <option value=${Ft} ?selected=${!$}>
                  전체
                </option>
                <option
                  value="claude"
                  ?selected=${$==="claude"}
                >
                  claude
                </option>
                <option
                  value="codex"
                  ?selected=${$==="codex"}
                >
                  codex
                </option>
              </select>
              <span class="settings-dialog__hint">모델 목록을 좁힙니다</span>
            </span>
          </div>
          ${ee("orchestration_model","\uBAA8\uB378",Ee,Oe,ce)}
          ${ee("orchestration_effort","effort",qe,Oe,ce)}
          ${ee("orchestration_speed","\uC18D\uB3C4",Rn,Oe,ce)}
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
                  @click=${()=>Ne(rt-1)}
                >
                  −
                </button>
                <span class="settings-dialog__stepper-value">${rt}</span>
                <button
                  type="button"
                  aria-label="slots 증가"
                  @click=${()=>Ne(rt+1)}
                >
                  +
                </button>
              </span>
            </span>
          </div>
        </div>
        ${Ce()}
      </section>
    `}function se(){let C=n.get();return c`
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
        ${C?c`
              ${Hc(C,s(),Y)}
              ${Gc(C,d,{onDraft:K=>{d=K},onAdd:L,onRemove:Q})}
              ${Vc(C,le)}
            `:c`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function W(C){let K=n.get();if(K)try{let ce=await r("display-policy-set",{expected_revision:K.revision,policy:C(K)});z(ce),ce&&ce.conflict&&ce.policy&&(ce=await r("display-policy-set",{expected_revision:ce.policy.revision,policy:C(ce.policy)}),z(ce)),ce&&ce.conflict&&o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function z(C){C&&C.policy&&typeof C.policy=="object"&&n.set(C.policy)}function I(C){W(C)}function Y(C){let K=n.get();if(!K)return;let ce=!z_(C,K);I(Ee=>H_(C,Ee,ce))}function L(){let C=d.trim();C.length!==0&&(d="",I(K=>K.hidden_prefixes.includes(C)?{hidden_prefixes:K.hidden_prefixes}:{hidden_prefixes:[...K.hidden_prefixes,C]}),X())}function Q(C){I(K=>({hidden_prefixes:K.hidden_prefixes.filter(ce=>ce!==C)}))}function le(C){let K=n.get();if(!K)return;let ce=K.chips[C]===!1;I(()=>({chips:{[C]:ce}}))}function X(){je(c`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${W_.map(C=>c`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${C.id}
                  aria-selected=${String(i===C.id)}
                  aria-controls=${`settings-pane-${C.id}`}
                  @click=${()=>fe(C.id)}
                >
                  <span class="settings-dialog__glyph">${C.glyph}</span>
                  ${C.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${He}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${we()} ${ge()} ${se()}
          </div>
        </div>
      `,a)}function fe(C){i=C,X()}let he=()=>{l=!1,t.onOpenChange?.(!1)};a.addEventListener("close",he),a.addEventListener("cancel",he);let Be=C=>{C.target===a&&He()};a.addEventListener("click",Be);let tt=null;n.subscribe&&(tt=n.subscribe(()=>{l&&X()}));let ct=null;t.implPresetStore?.subscribe&&(ct=t.implPresetStore.subscribe(()=>{l&&X()}));function Ve(C="session"){l||(l=!0,t.onOpenChange?.(!0),i=C,d="",N={},X(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),pe())}function He(){l&&(l=!1,t.onOpenChange?.(!1),typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:Ve,close:He,sessionDraft:()=>({..._}),destroy(){l=!1,a.removeEventListener("close",he),a.removeEventListener("cancel",he),a.removeEventListener("click",Be),tt&&(tt(),tt=null),ct&&(ct(),ct=null),a.remove()}}}function z_(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(r=>r.length>0&&e.startsWith(r))}function H_(e,t,r){if(!r)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let n=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:n,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:n}}var G_=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function Kc(e){return String(e).padStart(2,"0")}function V_(e,t){let r=Math.max(0,Math.ceil((e-t)/6e4)),n=Math.floor(r/1440),s=Math.floor(r%1440/60),o=r%60;return n>0?`${n}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function Y_(e,t=Date.now()){let r=Date.parse(e);if(!Number.isFinite(r))return"";let n=new Date(r),s=new Date(t),o=`${Kc(n.getHours())}:${Kc(n.getMinutes())}`,i=n.getFullYear()===s.getFullYear()&&n.getMonth()===s.getMonth()&&n.getDate()===s.getDate()?o:`${G_[n.getMonth()]} ${n.getDate()} ${o}`;return`${V_(r,t)} \xB7 ${i}`}function K_(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}var Zc=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage"}];function Xc(e){let t=!1,r=null,n=new Map;function s(){je(c``,e),e.hidden=!0}function o(){let l=Zc.filter(p=>n.has(p.key));if(l.length===0){s();return}let d=Date.now();je(c`<div class="usage-meter" aria-label="Usage">
        ${l.map(p=>{let _=n.get(p.key),g=typeof _.ageSeconds=="number"&&_.ageSeconds>600,S=g?`${Math.floor(_.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"";return c`<span
            class="usage-meter__group${g?" usage-meter__group--stale":""}"
            aria-label=${`${p.label} usage`}
          >
            <span class="usage-meter__provider">${p.label}</span>
            ${_.windows.map($=>{let N=typeof $.pct=="number"&&Number.isFinite($.pct)?$.pct:0,M=Math.min(100,Math.max(0,N)),B=`resets ${Y_($.resetsAt,d)}${g?` \xB7 ${S}`:""}`;return c`<span
                class="usage-meter__window ${K_(M)}"
                style=${`--progress: ${M}%`}
                title=${B}
              >
                <span class="usage-meter__label">${$.key}</span>
                <span class="usage-meter__track" aria-hidden="true">
                  <span class="usage-meter__fill"></span>
                </span>
                <span class="usage-meter__pct">${M}%</span>
              </span>`})}
          </span>`})}
      </div>`,e),e.hidden=!1}async function a(l){try{let d=await fetch(l.endpoint);if(!d.ok)return null;let p=await d.json();return!p||p.available!==!0||!Array.isArray(p.windows)?null:p}catch{return null}}async function i(){let l=await Promise.all(Zc.map(async d=>({provider:d,payload:await a(d)})));if(!t){for(let d of l)d.payload?n.set(d.provider.key,d.payload):n.delete(d.provider.key);o()}}return s(),i(),r=setInterval(()=>{i()},6e4),{destroy(){t=!0,r!==null&&(clearInterval(r),r=null),s()}}}function Qc(e){let t=e.attempts?Object.values(e.attempts):[],r=new Map;for(let s of t)s&&r.set(s.bead_id,s.attempt_id);let n=new Map;for(let s of e.done||[])s&&typeof s.bead_id=="string"&&typeof s.added_at=="number"&&n.set(s.bead_id,s.added_at);return s=>{let o=r.get(s.bead_id)!==s.attempt_id,a=n.get(s.bead_id),i=typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at;return!o&&!i&&typeof s.dismissed_at!="number"}}var Z_="worker-ineligible";function ma(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function ga(e){return ma(e).includes(Z_)}var X_="worker-serial";function ba(e){return ma(e).includes(X_)}function ha(e,t,r){if(typeof t!="string"||typeof r!="string")return[];let n=e?.runners;if(!n||!Object.hasOwn(n,t))return[];let s=n[t],o=s?.models;if(!o||!Object.hasOwn(o,r))return[];let a=o[r]?.efforts;return Array.isArray(a)?a.slice():Array.isArray(s.efforts)?s.efforts.slice():[]}var Q_=new Set(["done","failed","orphaned","stopped","discarded"]),J_={spec_missing:"\uC2A4\uD399 \uC5C6\uC74C",route:"route \uBBF8\uB2EC",spec_review:"\uC2A4\uD399 \uB9AC\uBDF0 \uC5C6\uC74C",spec_conflict:"\uC2A4\uD399 \uCDA9\uB3CC",phase_child:"phase child",worker_ineligible:"worker \uC81C\uC678"},em={running:"\uC2E4\uD589 \uC911",success:"\uC131\uACF5",failure:"\uC2E4\uD328",cancelled:"\uCDE8\uC18C",interrupted:"\uC911\uB2E8"};function Jc(e,t){let{queueStore:r,analysisStore:n,transport:s,getWorkspacePath:o,onOpenTranscript:a}=t,i=document.createElement("dialog");i.id="worker-parallel-analysis-dialog",i.className="pa",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),e.appendChild(i);let l=new Map,d=new Map,p=!1,_=null,g=null,S=null,$=new Set,N=!1,M=0,E=null,B=new Set;function Z(){return r&&r.get()||{revision:0,queue:[],serial_lanes:[],serial_lane_count:0,attempts:{},pr_wait:[]}}function T(){return n&&n.get()||{settings:{revision:0,runner:null,model:null,effort:null},job:null,runs:[],last_good:null}}function x(){return o&&o()||""}async function R(){if(!s)return;let y=++M;N=!0,S=null,$.clear(),Re();try{let k=await s("worker-parallel-analysis-targets",{root_dir:x()});if(y!==M||!De)return;let P=Array.isArray(k?.qualified)?k.qualified:[],re=Array.isArray(k?.excluded)?k.excluded:[];S={qualified:P,excluded:re};for(let ye of P)ye&&typeof ye.id=="string"&&$.add(ye.id)}catch{y===M&&De&&(S={qualified:[],excluded:[]},oe("\uBD84\uC11D \uB300\uC0C1\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800))}finally{y===M&&(N=!1,De&&Re())}}function F(y){return Array.isArray(y.runs)?y.runs:[]}function te(){let y=Z(),k=new Set;for(let P of Object.values(y.attempts||{})){let re=P;re&&typeof re.bead_id=="string"&&!Q_.has(re.status)&&k.add(re.bead_id)}for(let P of Array.isArray(y.pr_wait)?y.pr_wait:[])P&&typeof P.bead_id=="string"&&k.add(P.bead_id);for(let P of Object.values(y.discard_operations||{})){let re=P;re&&re.phase!=="done"&&typeof re.bead_id=="string"&&k.add(re.bead_id)}return k}function pe(y){return y.filter(k=>ue(k)===null)}function ue(y){let k=Z();for(let P of Array.isArray(k.serial_lanes)?k.serial_lanes:[])if(Array.isArray(P?.entries)&&P.entries.some(re=>re.bead_id===y))return P.id;return(Array.isArray(k.queue)?k.queue:[]).some(P=>P.bead_id===y)?"parallel":null}function ne(y,k){let P=l.get(y);return P||[...k.order]}function ie(y){if(y.length<2)return!1;let k=ue(y[0]);if(!k||k==="parallel")return!1;let P=Z(),re=(Array.isArray(P.serial_lanes)?P.serial_lanes:[]).find(de=>de.id===k)?.entries.map(de=>de.bead_id);if(!Array.isArray(re))return!1;let ye=y.map(de=>re.indexOf(de));return ye.every(de=>de>=0)&&ye.every((de,ke)=>ke===0||de>ye[ke-1])}function Oe(){let y=Z(),k=Array.isArray(y.serial_lanes)?y.serial_lanes:[],P=k.find(re=>Array.isArray(re.entries)&&re.entries.length===0);return P?P.id:k[0]?.id||"s1"}function Ne(y){let k=Z().bead_titles||{};return typeof k[y]=="string"?k[y]:y}async function Ge(y,k){if(!s||p)return null;p=!0,Re();try{return await s(y,k)}finally{p=!1,Re()}}async function Je(y){n?.setPending?.(!0);try{let k=await Ge("worker-parallel-analysis-start",{force:y,target_ids:Array.from($)});k&&k.applied===!1&&k.reason&&(k.reason==="target_not_qualified"&&Array.isArray(k.detail)?oe(`\uBD84\uC11D \uB300\uC0C1 \uC790\uACA9 \uBCC0\uACBD: ${k.detail.join(", ")}`,"error",3200):oe(`\uBD84\uC11D \uC2E4\uD328: ${k.reason}`,"error",2800))}finally{n?.setPending?.(!1)}}async function Ke(){let y=T().job;!s||!y||await s("worker-parallel-analysis-cancel",{job_id:y.job_id})}async function Xe(y){if(!(!s||B.has(y))){B.add(y),Re();try{let k=await s("worker-parallel-analysis-prompt",{root_dir:x(),run_id:y});if(!De)return;if(k?.ok===!0&&typeof k.prompt=="string"){E={run_id:y,prompt:k.prompt};return}oe(k?.reason==="not_found"?"\uC800\uC7A5\uB41C \uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800)}finally{B.delete(y),Re()}}}function _e(){E=null,Re()}async function Se(){if(!E)return;let y=await Xt(E.prompt);oe(y?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",y?"success":"error",1400)}function ve(y){let k={running:"running",success:"done",failure:"failed",cancelled:"stopped",interrupted:"orphaned"};return{runner:y.runner||void 0,model:y.model||void 0,effort:y.effort||void 0,status:k[y.outcome]||(typeof y.job_id=="string"?"running":void 0),session_id:y.session_id||void 0}}function Ce(y,k){a&&a(y,ve(k))}function me(){return Z().runner_catalog}function ee(y){return Object.keys(me()?.runners?.[y]?.models||{})}function V(y){let k=ee(y),P=me()?.runners?.[y]?.default_model;return typeof P=="string"&&k.includes(P)?P:k[0]||""}function we(){let y=T().settings,k=_||y.runner||"claude",P=ee(k),re=_?V(k):y.model||P[0]||"",ye=ha(me(),k,re),de=y.effort||"",ke=ye.includes(de)?de:ye[0]||"";return{runner:k,model:re,effort:ke,models:P,efforts:ye}}async function ge(y){let k=T().settings,P=await Ge("worker-parallel-analysis-settings-update",{expected_revision:k.revision,runner:y.runner,model:y.model,effort:y.effort});(!P||P.applied!==!0)&&(_=null,Re(),P&&P.reason&&oe(`\uBD84\uC11D \uC124\uC815 \uAC70\uBD80: ${P.reason}`,"error",2800))}function se(y){_=y,Re();let k=we();ge({runner:y,model:k.model,effort:k.effort})}function W(y){let k=we(),P=ha(me(),k.runner,y);ge({runner:k.runner,model:y,effort:P.includes(k.effort)?k.effort:P[0]||""})}function z(y){let k=we();ge({runner:k.runner,model:k.model,effort:y})}async function I(y,k){if(!s||p)return;let P=ne(y,k),re=T();if(P.length<2||!re.last_good){oe("\uC81C\uCD9C\uD558\uB824\uBA74 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4","warning");return}let ye=d.get(y)||Oe(),de=()=>({snapshot_digest:re.last_good.identity_digest,group_index:y,lane:ye,ordered_bead_ids:P,expected_revision:Z().revision});p=!0,Re();try{let ke=await s("worker-parallel-analysis-submit",de());ke&&ke.queue&&r&&r.set(ke.queue),ke&&ke.applied!==!0&&ke.conflict===!0&&(ke=await s("worker-parallel-analysis-submit",de()),ke&&ke.queue&&r&&r.set(ke.queue)),ke&&ke.applied===!0?(l.delete(y),oe(`\uC9C1\uB82C \uB808\uC778 ${ye}\uC5D0 ${P.length}\uAC1C \uBC30\uCE58`,"success")):oe(`\uC81C\uCD9C \uAC70\uBD80: ${ke?.reason||"conflict"} (\uD050 \uBB34\uBCC0\uACBD)`,"error",2800)}finally{p=!1,Re()}}function Y(y,k,P){l.set(y,ne(y,k).filter(re=>re!==P)),Re()}function L(y){l.delete(y),Re()}function Q(y,k,P,re){let ye=[...ne(y,k)],de=ye.indexOf(P),ke=de+re;de<0||ke<0||ke>=ye.length||(ye.splice(ke,0,...ye.splice(de,1)),l.set(y,ye),Re())}function le(){let y=T().settings,k=Object.keys(me()?.runners||{}),P=we();return c`<div class="pa-settings">
      <label class="pa-settings__field"
        >러너
        <select
          class="pa-settings__runner"
          aria-label="분석 러너"
          @change=${re=>se(re.target.value)}
        >
          ${k.map(re=>c`<option
                value=${re}
                ?selected=${P.runner===re}
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
          @change=${re=>W(re.target.value)}
        >
          ${P.models.map(re=>c`<option
                value=${re}
                ?selected=${P.model===re}
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
          @change=${re=>z(re.target.value)}
        >
          ${P.efforts.map(re=>c`<option
                value=${re}
                ?selected=${P.effort===re}
              >
                ${re}
              </option>`)}
        </select>
      </label>
      ${X(y)}
    </div>`}function X(y){return!he(y)||fe(y)?c`<span class="pa-settings__unset">분석 모델 설정 필요</span>`:y.compatible===!1?c`<span class="pa-settings__incompatible"
        >설정 비호환 — 저장된 ${y.runner}/${y.model} · effort
        ${y.effort} 을(를) 카탈로그가 더는 제공하지 않습니다</span
      >`:y.is_default===!0?c`<span class="pa-settings__default">기본값</span>`:""}function fe(y){return y.is_default===!0&&y.compatible===!1}function he(y){return!!(y.runner&&y.model&&y.effort)}function Be(y){return he(y)&&y.compatible!==!1}function tt(y){let k=Math.max(0,Math.floor(y/1e3)),P=Math.floor(k/60),re=k%60;return`${P}:${String(re).padStart(2,"0")}`}function ct(y){let k=y.job;if(k){let P=typeof k.started_at=="number"?k.started_at:0,re=`${k.runner||"?"}/${k.model||"?"}`,ye=P?` \xB7 \uACBD\uACFC ${tt(Date.now()-P)}`:"",de=typeof k.session_id=="string"?k.session_id:"",ke=F(y).find($e=>$e.run_id===k.job_id);return c`<span class="pa-meta__progress">
        <span
          >분석 중 — ${re} · effort ${k.effort||"?"}${ye}</span
        >
        ${de?c`<code class="pa-session-id" title=${de}
              >${de.slice(0,8)}</code
            >`:""}
        <button
          type="button"
          class="pa-monitor"
          @click=${()=>Ce(k.job_id,ke||k)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-prompt-open"
          ?disabled=${ke?.prompt_saved!==!0||B.has(k.job_id)}
          @click=${()=>{Xe(k.job_id)}}
        >
          프롬프트
        </button>
      </span>`}return Ve()?c`<span class="pa-meta__progress"
          >준비 중 — 대상과 아티팩트 수집 중</span
        >`:""}function Ve(){return n?.isPending?.()===!0}function He(y){let k=!!y.job,P=Be(y.settings),re=S!==null&&$.size===0,ye=k||p||Ve()||N;return c`<div class="pa-meta">
      ${y.last_good?c`<span class="pa-meta__at"
            >분석 ${new Date(y.last_good.at||0).toLocaleString()}</span
          >`:c`<span class="pa-meta__at">분석 결과 없음</span>`}
      ${ct(y)}
      <button
        type="button"
        class="pa-run"
        ?disabled=${!P||ye||re}
        @click=${()=>{Je(!1)}}
      >
        ✳ 분석
      </button>
      <button
        type="button"
        class="pa-rerun"
        ?disabled=${!P||ye||re}
        @click=${()=>{Je(!0)}}
      >
        재분석
      </button>
      <button
        type="button"
        class="pa-cancel"
        ?disabled=${!k}
        @click=${()=>{Ke()}}
      >
        취소
      </button>
    </div>`}function C(y){return typeof y=="string"&&y.length>0?y:"\uBBF8\uBC30\uCE58"}function K(y,k){k?$.add(y):$.delete(y),Re()}function ce(){let y=S?.qualified||[],k=S?.excluded||[];return c`<section class="pa-targets">
      <header class="pa-targets__header">
        <strong>분석 대상</strong>
        <span class="pa-targets__summary"
          >${N?"\uC870\uD68C \uC911\u2026":`\uC790\uACA9 ${y.length} \xB7 \uC81C\uC678 ${k.length}`}</span
        >
      </header>
      ${S&&y.length>0?c`<ul class="pa-targets__list">
            ${y.map(P=>c`<li class="pa-target">
                  <label class="pa-target__label">
                    <input
                      type="checkbox"
                      class="pa-target__check"
                      data-target-id=${P.id}
                      .checked=${$.has(P.id)}
                      @change=${re=>K(P.id,re.target.checked)}
                    />
                    <span class="pa-target__title">${P.title}</span>
                  </label>
                  <span class="pa-target__route">${P.route}</span>
                  <span class="pa-target__lane">${C(P.lane)}</span>
                </li>`)}
          </ul>`:S&&y.length===0?c`<p class="pa-empty">자격 있는 분석 대상이 없습니다</p>`:""}
      ${S&&k.length>0?c`<details class="pa-targets__excluded">
            <summary>제외 대상 ${k.length}</summary>
            <ul class="pa-targets__list">
              ${k.map(P=>c`<li class="pa-target pa-target--excluded">
                    <label class="pa-target__label">
                      <input type="checkbox" disabled />
                      <span class="pa-target__title">${P.title}</span>
                    </label>
                    <span class="pa-target__reason"
                      >${J_[P.reason]||P.reason}</span
                    >
                    <span class="pa-target__lane"
                      >${C(P.lane)}</span
                    >
                  </li>`)}
            </ul>
          </details>`:""}
    </section>`}function Ee(y){let k=typeof y.session_id=="string"&&y.session_id.length>0,P=k?y.session_id:"";return c`<li class="pa-run-row">
      <span class="pa-run-row__status pa-run-row__status--${y.outcome}"
        >${em[y.outcome]||y.outcome}</span
      >
      <time class="pa-run-row__time"
        >${new Date(y.started_at||0).toLocaleString()}</time
      >
      <span class="pa-run-row__identity"
        >${y.runner||"?"} / ${y.model||"?"} / ${y.effort||"?"}</span
      >
      ${k?c`<code class="pa-session-id" title=${P}
            >${P.slice(0,8)}</code
          >`:c`<span class="pa-run-row__no-session">세션 없음</span>`}
      ${y.outcome==="failure"&&y.reason?c`<span class="pa-run-row__reason">${y.reason}</span>`:""}
      <span class="pa-run-row__actions">
        <button
          type="button"
          class="pa-run-row__monitor"
          ?disabled=${!k}
          @click=${()=>Ce(y.run_id,y)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-run-row__prompt"
          ?disabled=${y.prompt_saved!==!0||B.has(y.run_id)}
          @click=${()=>{Xe(y.run_id)}}
        >
          프롬프트
        </button>
      </span>
    </li>`}function qe(y){return c`<section class="pa-runs">
      <header class="pa-runs__header"><strong>최근 실행</strong></header>
      ${y.length>0?c`<ul class="pa-runs__list">
            ${y.map(k=>Ee(k))}
          </ul>`:c`<p class="pa-empty">실행 이력 없음</p>`}
    </section>`}function rt(){return E?c`<div
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
            <code>${E.run_id}</code>
          </div>
          <div class="pa-prompt-popup__actions">
            <button type="button" @click=${()=>{Se()}}>
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
${E.prompt}</pre
        >
      </section>
    </div>`:""}function nt(y,k){let P=ne(y,k),re=te(),ye=P.filter(Ue=>re.has(Ue)),de=pe(P),ke=ie(P),$e=Array.isArray(Z().serial_lanes)?Z().serial_lanes:[],bt=d.get(y)||Oe(),Ct=k.eligible!==!0||P.length<2||ye.length>0||de.length>0||ke||p;return c`<section class="pa-group" data-group-index=${String(y)}>
      <header class="pa-group__head">
        <span class="pa-group__confidence">${k.confidence}</span>
        ${k.categories.map(Ue=>c`<span class="pa-group__category">${Ue}</span>`)}
        ${ke?c`<span class="pa-group__applied">✓ 이미 반영됨</span>`:""}
        ${k.eligible===!0?"":c`<span class="pa-group__weak">근거 부족 — 제출 불가</span>`}
        ${de.length>0?c`<span class="pa-group__stale"
              >stale — ${de.join(", ")} 대기 영역 이탈</span
            >`:""}
      </header>
      <p class="pa-group__reason">${k.reason}</p>
      <ol class="pa-group__members">
        ${P.map((Ue,vt)=>c`<li class="pa-member" data-bead-id=${Ue}>
              <span class="pa-member__seq">${vt+1}</span>
              <span class="pa-member__title">${Ne(Ue)}</span>
              ${re.has(Ue)?c`<span class="pa-member__active">실행 중</span>`:""}
              <button
                type="button"
                class="pa-member__up"
                data-bead-id=${Ue}
                ?disabled=${vt===0}
                aria-label=${`${Ue} \uC704\uB85C`}
                @click=${()=>Q(y,k,Ue,-1)}
              >
                ↑
              </button>
              <button
                type="button"
                class="pa-member__down"
                data-bead-id=${Ue}
                ?disabled=${vt===P.length-1}
                aria-label=${`${Ue} \uC544\uB798\uB85C`}
                @click=${()=>Q(y,k,Ue,1)}
              >
                ↓
              </button>
              <button
                type="button"
                class="pa-member__exclude"
                data-bead-id=${Ue}
                aria-label=${`${Ue} \uC81C\uC678`}
                @click=${()=>Y(y,k,Ue)}
              >
                ✕
              </button>
            </li>`)}
      </ol>
      <ul class="pa-group__evidence">
        ${k.evidence.map(Ue=>c`<li class="pa-evidence">
              <code>${Ue.path}</code>
              <span class="pa-evidence__locator">${Ue.locator}</span>
            </li>`)}
      </ul>
      <footer class="pa-group__foot">
        <button
          type="button"
          class="pa-group__restore"
          @click=${()=>L(y)}
        >
          제안으로 되돌리기
        </button>
        <label class="pa-group__lane-field"
          >제출
          <select
            class="pa-group__lane"
            aria-label="제출 대상 레인"
            @change=${Ue=>{d.set(y,Ue.target.value),Re()}}
          >
            ${$e.map((Ue,vt)=>c`<option
                  value=${Ue.id}
                  ?selected=${bt===Ue.id}
                >
                  직렬 ${vt+1}
                </option>`)}
          </select>
        </label>
        <button
          type="button"
          class="pa-group__submit"
          ?disabled=${Ct}
          @click=${()=>{I(y,k)}}
        >
          제출
        </button>
      </footer>
    </section>`}function Fe(y){let k=Array.isArray(y.issues)?y.issues:[],P=k.filter(ye=>ye.verdict==="parallel_ok").length,re=k.filter(ye=>ye.verdict==="uncertain").length;return c`<div class="pa-summary">
      <span>parallel_ok ${P}</span>
      <span>uncertain ${re}</span>
    </div>`}function _t(){let y=De&&!!T().job;if(y&&g===null){g=setInterval(()=>Re(),1e3);return}!y&&g!==null&&(clearInterval(g),g=null)}function Re(){let y=T();_&&y.settings.runner===_&&(_=null);let k=y.last_good?.result;_t(),je(c`
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
            ${le()} ${He(y)} ${ce()}
            ${k?c`${k.groups.map((P,re)=>nt(re,P))}
                ${k.groups.length===0?c`<p class="pa-empty">직렬 권장 그룹 없음</p>`:""}
                ${Fe(k)}`:c`<p class="pa-empty">
                  아직 분석 결과가 없습니다 — [✳ 분석]을 눌러 시작하세요
                </p>`}
            ${qe(F(y))}
          </div>
        </div>
        ${rt()}
      `,i)}let De=!1,ot=()=>{De=!1,E=null,M+=1,_t()},at=y=>{y.target===y.currentTarget&&be()};i.addEventListener("close",ot),i.addEventListener("cancel",ot),i.addEventListener("click",at);let dt=null;r&&r.subscribe&&(dt=r.subscribe(()=>{De&&Re()}));let U=null;n&&n.subscribe&&(U=n.subscribe(()=>{De&&Re()}));function J(){De||(De=!0,Re(),R(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""))}function be(){De&&(De=!1,E=null,M+=1,_t(),typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:J,close:be,destroy(){De=!1,g!==null&&(clearInterval(g),g=null),i.removeEventListener("close",ot),i.removeEventListener("cancel",ot),i.removeEventListener("click",at),dt&&(dt(),dt=null),U&&(U(),U=null),i.remove()}}}var ed=new Set(["sh","bash","zsh","dash","ksh"]),td=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function rd(e){let t=e.split("/");return t[t.length-1]||""}function tm(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let r=t.slice(2).trim().split(/\s+/).filter(Boolean);if(r.length===0)return!1;let n=rd(r[0]);if(n!=="env")return ed.has(n);let s=r.slice(1).find(o=>!o.startsWith("-")&&!o.includes("="));return s!==void 0&&ed.has(rd(s))}function rm(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function nm(e){let t=[],r=0;td.lastIndex=0;for(let n of e.matchAll(td)){let s=n.index;s>r&&t.push({text:e.slice(r,s),kind:"plain"}),t.push({text:n[0],kind:rm(n[0])}),r=s+n[0].length}return r<e.length&&t.push({text:e.slice(r),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function sm(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function nd(e){let t=e.getWorkspacePath,r=e.fetchImpl||globalThis.fetch?.bind(globalThis),n=document.createElement("div");n.className="repo-ops-script-viewer-root",document.body.appendChild(n);let s=null,o="loading",a="",i="",l=0,d=null,p=!1;function _(x,R){return R?nm(x).map(F=>F.kind==="plain"?F.text:c`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${F.kind}"
            >${F.text}</span
          >`):x}function g(){if(!s)return c``;let x=o==="ready"&&tm(a),R=o==="ready"?a.split(`
`):[];return c`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${s.path}`}
    >
      <div
        class="repo-ops-script-viewer__backdrop"
        @click=${()=>Z()}
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
              @click=${()=>{$()}}
            >
              복사
            </button>
            <button
              type="button"
              class="repo-ops-script-viewer__close"
              aria-label="스크립트 팝업 닫기"
              @click=${()=>Z()}
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
                  ${R.map((F,te)=>c`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${te+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${_(F,x)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function S(){je(g(),n)}async function $(){if(o!=="ready")return;let x=await Xt(a);oe(x?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",x?"success":"error")}function N(x){x.key==="Escape"&&s&&(x.preventDefault(),Z())}function M(){p||(document.addEventListener("keydown",N),p=!0)}function E(){p&&(document.removeEventListener("keydown",N),p=!1)}async function B(x,R=null){let F=++l;M(),s={...x},d=R||(document.activeElement instanceof HTMLElement?document.activeElement:null),o="loading",a="",i="",S(),n.querySelector(".repo-ops-script-viewer__close")?.focus();let pe=t?t():"";if(!pe){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",S();return}if(!r){o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",S();return}let ue="/api/repo-ops-script?workspace="+encodeURIComponent(pe)+"&lane="+encodeURIComponent(x.lane)+"&base_sha="+encodeURIComponent(x.base_sha);try{let ne=await r(ue),ie=await ne.json().catch(()=>({}));if(F!==l)return;if((t?t():"")!==pe){Z();return}if(!ne.ok||!ie||ie.ok!==!0){o="error",i=sm(ie&&typeof ie.error=="string"?ie.error:""),S();return}s={lane:ie.lane,base_sha:ie.base_sha,path:ie.path,base_ref:ie.base_ref},a=String(ie.content),o="ready",S()}catch{if(F!==l)return;o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",S()}}function Z(){l+=1,E(),s=null,a="",S();let x=d;d=null,x?.isConnected&&x.focus()}function T(){Z(),n.remove()}return{open:B,close:Z,destroy:T}}function sd(e){let t=e.queueStore,r=e.transport,n=e.onChanged||(()=>{}),s=e.onOpenScript;function o(){return t&&t.get()||{}}function a(){let T=o();return typeof T.revision=="number"?T.revision:0}function i(T){t&&T&&T.queue&&typeof T.queue=="object"&&t.set(T.queue)}function l(){let T=o().workspace_info;return T&&typeof T=="object"?T:{}}function d(T,x){return c`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${T}"
      >${x}</span
    >`}function p(T){if(typeof T!="number"||!Number.isFinite(T))return"";let x=T/6e4;return Number.isInteger(x)?`timeout ${x}\uBD84`:`timeout ${Math.round(T/1e3)}\uCD08`}function _(T){let x=p(T);return x?d("config",x):""}function g(T,x,R){return c`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${R.script}
      @click=${F=>{s&&s({lane:T,base_sha:x.base_sha,path:R.script,base_ref:x.base_ref},F.currentTarget)}}
    ></button>`}function S(T){let x=typeof T.base_sha=="string"?T.base_sha:"",R=`${T.source_path||"repo-ops/config.toml"} @ ${T.base_ref||"?"}${x?`@${x.slice(0,7)}`:""}`;return c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${R}</span>
      </p>
      <div class="worker-repo-ops__lane" data-lane="verify">
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${T.verify?c`${g("verify",T,T.verify)}
              ${_(T.verify.timeout_ms)}`:c`선언 없음${d("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${T.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
      </div>
      <div class="worker-repo-ops__lane" data-lane="deploy">
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${T.deploy?c`${g("deploy",T,T.deploy)}
              ${_(T.deploy.timeout_ms)}`:c`선언 없음${d("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${T.deploy?c`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
      </div>
    </section>`}function $(T){let x=T.repo_ops&&typeof T.repo_ops=="object"?T.repo_ops:null;return x&&(x.status==="resolved"||x.status==="absent")?S(x):x&&(x.status==="pending"||x.status==="error")?c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${x.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":c`선언 읽기
              실패${x.error_code?c` — <code>${x.error_code}</code>`:""}`}
        </div>
      </section>`:c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function N(T){if(!r)return;let x=await r("worker-auto-repair-toggle",{on:T,expected_revision:a()});if(i(x),x&&x.conflict){let R=await r("worker-auto-repair-toggle",{on:T,expected_revision:a()});i(R)}n()}let M={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function E(T,x,R){return c`<div class="worker-repo-ops__policy-group" data-policy=${R}>
      <div class="worker-repo-ops__policy-label">${T}</div>
      <ul class="worker-repo-ops__policy-list">
        ${x.map(F=>c`<li data-token=${F}>
              ${M[F]||F}
            </li>`)}
      </ul>
    </div>`}function B(T){return c`<div
      class="worker-repo-ops__policy-group"
      data-policy="resolution-ladder"
    >
      <div class="worker-repo-ops__policy-label">해결 사다리</div>
      <ol class="worker-repo-ops__policy-list">
        ${T.map(x=>{let R=[M[x.trigger]||x.trigger];return Number.isInteger(x.attempts_per_operation_attempt)?R.push(`operation\uB2F9 ${x.attempts_per_operation_attempt}\uD68C`):Number.isInteger(x.attempts)?R.push(`${M[x.budget]||x.budget} ${x.attempts}\uD68C`):Number.isInteger(x.sessions_per_user_action)&&R.push(`${x.sessions_per_user_action}\uD68C`,M[x.user_actions]||x.user_actions),x.applies_when&&R.push(M[x.applies_when]||x.applies_when),c`<li data-token=${x.id}>
            <strong>${M[x.id]||x.id}</strong>
            <span>${R.filter(Boolean).join(" \xB7 ")}</span>
          </li>`})}
      </ol>
    </div>`}function Z(){let T=o(),x=T.auto_repair!==!1,R=T.repo_operation_policy&&typeof T.repo_operation_policy=="object"?T.repo_operation_policy:null,F=Array.isArray(T.repo_operations)?T.repo_operations:[],te=F.find(ie=>ie.state==="repairing"),pe=F.filter(ie=>ie.state==="failed"||ie.state==="repairing"),ue=pe.length?Math.min(...pe.map(ie=>typeof ie.repair?.remaining=="number"?ie.repair.remaining:0)):R?.auto_repair?.resolution_ladder?.find(ie=>ie.id==="auto_repair_session")?.attempts??1,ne=Array.isArray(R?.auto_repair?.resolution_ladder)?R.auto_repair.resolution_ladder:[];return c`<section
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
          .checked=${x}
          @change=${ie=>{N(ie.target.checked)}}
        />
        검증·배포 실패를 자동으로 해결 시도
      </label>
      <div class="worker-repo-ops__repair-state">
        <span
          class="worker-repo-ops__repair-value"
          data-seam="auto-repair-value"
          >${x?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}</span
        >
        <span
          class="worker-repo-ops__repair-budget"
          data-seam="auto-repair-budget"
          >남은 자동 해결 ${ue}회</span
        >
        <span
          class="worker-repo-ops__repair-session"
          data-seam="auto-repair-session"
          >${te?`\uD574\uACB0 \uC138\uC158 \uC2E4\uD589 \uC911 \xB7 ${te.repair?.owner_bead||te.operation_id}`:"\uC2E4\uD589 \uC911\uC778 \uD574\uACB0 \uC138\uC158 \uC5C6\uC74C"}</span
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
        ${$(l())} ${Z()}
      </details>`}}}var om=20,od={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"},ad={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8"};function am(e,t,r=om){let n=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||n.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||n.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return n.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),n.slice(0,Math.max(0,r))}function id(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function im(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"repairing":return"\uC790\uB3D9 \uD574\uACB0 \uC911";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function ld(e){let t=e.filter(r=>r.value);return t.length===0?"":c`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(r=>c`<div>
            <dt>${r.term}</dt>
            <dd>${r.value}</dd>
          </div>`)}
    </dl>
  </details>`}function cd(e,t="",r=!1){return!e&&!t?"":c`<p
    class="worker-ev__explain${r?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?c`<br />${t}`:""}
  </p>`}function lm(e){if(e.state!=="failed"||e.superseded_by)return"";let t=e.repair||{},r=typeof t.remaining=="number"?t.remaining:0,n=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"",s=r<=0;return c`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
      data-operation-id=${e.operation_id}
      data-failure-kind=${e.failure_kind||""}
      title="해결 세션을 엽니다"
    >
      ${Object.hasOwn(ad,n)?ad[n]:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC2DC\uC791"}
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
  </div>`}function cm(e){let t=e.operation,r=t.state==="failed",n=t.failure?t.failure.code:"";return c`<li
    class="worker-ev"
    data-operation-id=${t.operation_id}
    data-state=${t.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?wt(e.at):""}
      >${zs(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${id(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(od,t.kind)?od[t.kind]:t.kind}</span
        >
        <span class="worker-ev__meta"
          >${t.target_base}@${Us(t.target_sha)}${typeof t.elapsed_ms=="number"?` \xB7 ${Ws(t.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${id(e)}"
          >${im(e)}</span
        >
        ${t.dismissed?c`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${t.superseded_by?c`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
      </div>
      ${r?cd(vc(t.failure_kind,n)):""}
      ${lm(t)}
      ${ld([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?n:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${Us(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function dm(e){let t=e.cleanup,r=Ur(t.step);return c`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?wt(e.at):""}
      >${zs(e.at)||"\u2014"}</span
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
        ${mc(t.step).map(n=>c`<li
              class="worker-step worker-step--${n.state}"
              data-step=${n.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${n.label}</span>
            </li>`)}
      </ol>
      ${cd(Ks(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
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
      ${ld([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function um(e){return c`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(t=>t.type==="cleanup"?dm(t):cm(t))}
        </ul>`}
  </section>`}function dd(e,t={}){let r=null;function n(){je(r?um(r):c``,e)}e.addEventListener("click",a=>{a.target?.closest?.('[data-seam="repo-ops-close"]')&&o()});function s(a){r={events:am(a.operations,a.cleanup_failures),repo:a.repo||""},n()}function o(){r!==null&&(r=null,n(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>r!==null,refresh(a){r&&s(a)}}}var pm="tab:worker:ready",fm="tab:worker:blocked",_m="tab:worker:in-progress",mm="tab:worker:closed",Xs=1,ud=5;function pd(e){return Cn(e).path.length>0}var md="beads-ui.worker.candidate-filter",ya={show_blocked:!1,spec:"all"};function gm(){try{let e=window.localStorage.getItem(md);if(!e)return{...ya};let t=JSON.parse(e);if(!t||typeof t!="object")return{...ya};let r=t.spec;return{show_blocked:t.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...ya}}}function bm(e){try{window.localStorage.setItem(md,JSON.stringify(e))}catch{}}function hm(e,t){let r=i=>t.show_blocked||!i.blocked,n=i=>t.spec==="all"||(t.spec==="with"?i.has_spec:!i.has_spec),s=[],o=0,a=0;for(let i of e){let l=r(i),d=n(i);l&&d?s.push(i):!l&&d?o+=1:l&&!d&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var ym=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],gd="bdui.worker.candidate_sort",vm=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],Qs="spec";function wm(){try{let e=window.localStorage.getItem(gd);return e==="board"||e==="created"||e==="spec"?e:Qs}catch{return Qs}}function km(e){try{window.localStorage.setItem(gd,e)}catch{}}var bd="bdui.worker.done-range";function $m(){try{let e=window.localStorage.getItem(bd);return Ut(e)?e:Nt}catch{return Nt}}function xm(e){try{window.localStorage.setItem(bd,e)}catch{}}var Sm="(max-width: 640px)",hd="beads-ui.worker.lane-collapsed",Bn={queue:!0,done:!0};function Am(){try{let e=window.localStorage.getItem(hd);if(!e)return{...Bn};let t=JSON.parse(e);return!t||typeof t!="object"?{...Bn}:{queue:typeof t.queue=="boolean"?t.queue:Bn.queue,done:typeof t.done=="boolean"?t.done:Bn.done}}catch{return{...Bn}}}function Em(e){try{window.localStorage.setItem(hd,JSON.stringify(e))}catch{}}function fd(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let r=typeof t.title=="string"?t.title:t.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function Tm(e,t,r){let n=Array.isArray(e)?e.slice():[];return t==="created"?n.sort(Nr):(n.sort(ss(r)),t==="board"?n:[...n.filter(pd),...n.filter(s=>!pd(s))])}function Cm(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function Rm(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Im(e){let t=e?.blocked_info;if(t&&typeof t=="object"){let s=Array.isArray(t.blockers)?t.blockers.filter(o=>typeof o=="string"&&o.length>0):[];return s.length>0?`\u{1F512} ${s.join(", ")}`:"\u{1F512} blocked"}let n=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(s=>{if(typeof s=="string")return s;if(!s||typeof s!="object")return"";let o=s.type??s.dependency_type;return o!==void 0&&o!=="blocks"?"":s.depends_on_id||s.id||""}).filter(Boolean);return n.length>0?`\u{1F512} ${n.join(", ")}`:"\u{1F512} blocked"}function _d(e){switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function Lm(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function Om(e){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let t=e.slice(19);return t.length===0?null:t==="needs_human"?"\uC644\uB8CC \uC758\uB3C4 \uB300\uAE30 \u2014 \uC0AC\uB78C \uD655\uC778 \uD544\uC694":`\uC644\uB8CC \uC758\uB3C4 \uB300\uAE30 \u2014 ${t}`}function Pm(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function Dm(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"implementation review \uB300\uAE30",live:!1,alert:!1};case"reviewing":return{badge:"implementation review \uC911",live:!0,alert:!1};case"revising":return{badge:"review \uC218\uC815 \uC911 \xB7 1\uD68C",live:!0,alert:!1};case"failed":{let r=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:r.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${r.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",live:!1,alert:!0}}default:return null}}function va(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function Mm(e){if(!e||typeof e!="object")return null;let t=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,n=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,s=n&&typeof n.pr_number=="number"?n.pr_number:null,o="";switch(e.phase){case"gating":o="root \uC7AC\uAC80\uC99D \uC911";break;case"repairing":o=e.subject_role==="root"?`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 \uC6D0 PR \uC218\uC815 \uC911`:`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 repair PR \uC900\uBE44 \uC911`;break;case"waiting_repair_pr":o=s?`repair PR #${s} \uB300\uAE30`:"repair PR \uB300\uAE30";break;case"merging":o=e.subject_role==="repair"?s?`repair PR #${s} \uBA38\uC9C0 \uC911`:"repair PR \uBA38\uC9C0 \uC911":"root \uBA38\uC9C0 \uC911";break;case"cleaning":o="\uC815\uB9AC \uBCF5\uAD6C \uC911";break;case"paused":o="\uC790\uB3D9\uBCF5\uAD6C \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":o=`\uC0AC\uB78C \uD655\uC778 \uD544\uC694 \xB7 ${e.terminal_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`;break;case"completed":return null;default:return null}let a=[o,`\uBCF5\uAD6C \uC138\uC158 ${t}/${r}`];return e.head_sha&&a.push(`head ${e.head_sha}`),e.base_sha&&a.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&a.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`),e.active_attempt_id&&a.push(`attempt ${e.active_attempt_id}`),n&&typeof n.bead_id=="string"&&a.push(`repair ${n.bead_id}`),e.evidence&&a.push(e.evidence),e.log_path&&a.push(e.log_path),{badge:o,title:a.join(`
`),alert:e.phase==="needs_human",lock_actions:e.phase!=="paused"&&e.phase!=="needs_human",repair_pr_url:n&&typeof n.pr_url=="string"?n.pr_url:"",repair_pr_number:s}}function Nm(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",r=(n,s={})=>{let o=[s.title||"",t].filter(Boolean);return{label:n,title:o.join(`
`),live:s.live===!0,alert:s.alert===!0}};return e.continuation_required?r("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0}):e.merge_step?e.gate?.tier==="merged"?r("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):r("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0}):e.conflict_badge?r(e.conflict_badge,{live:e.conflict_live===!0}):e.head_review&&e.head_review.state!=="failed"?r("\uB9AC\uBDF0 \uC9C4\uD589 \uC911",{title:e.head_review.badge,live:e.head_review.live===!0}):e.recovery?.lock_actions?r("\uC790\uB3D9\uBCF5\uAD6C \uC911",{title:e.recovery.title,live:!0}):e.cleanup_failed?r(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0}):e.base_exception?r("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0}):e.conflicting?r("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0}):e.gate?.reason==="base_behind"?r("base \uAC31\uC2E0 \uD544\uC694",{alert:!0}):e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale"?r("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2C8\uAC70\uB098 \uC870\uC0C1 \uD655\uC778\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uB85C, \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB9AC\uBDF0\uD574\uC57C \uBA38\uC9C0\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",alert:!0}):e.gate?.reason==="spec_id_missing"?r("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0}):e.gate?.reason==="review_receipt_invalid"?r("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0}):e.head_review?.state==="failed"?r("\uB9AC\uBDF0 \uC2E4\uD328",{title:e.head_review.failure_reason||"",alert:!0}):e.recovery?r(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?r("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?r(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${_d(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?r(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${_d(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?r(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?r("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?r("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?r("\uB2EB\uD798",{alert:!0}):e.activity?r("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?r("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?r("\uD655\uC778 \uC911"):e.gate?.gate_badge?r(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function qm(e,t,r,n,s=null,o=null,a=null,i=!1,l=null,d=!0,p=null,_=null,g=null,S={},$=!1,N=!1,M={}){let E=!!l&&l.position>0,B=!!l?.continuation_action&&l.continuation_action.continuation===null,Z=!!l&&l.active===!0,T=l&&l.failure||null,x=Om(l?l.waiting:null),R=r[e]||null,F=R&&R.gate?R.gate:null,te=R&&R.pr?R.pr:null,pe=Mm(g),ue=Pm(l?l.resolution:null),ne=Dm(l?l.head_review:null),ie=l&&l.head_review||null,Oe=l&&l.authority||null,Ne=!!ie&&["pending","reviewing","revising"].includes(ie.state),Ge=E&&!Z&&(ie?.state==="failed"||!Oe||Oe.source==="automatic"&&!N),Je=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":ue?ue.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":x,Ke=!!F&&F.base_badge==="\uCDA9\uB3CC",Xe=!!F&&F.enabled===!0,_e=Nn({bead_id:e,merge_sha:M.merge_sha,cleanup_cursor:M.cleanup_cursor,merge_progress:o&&o.merge_progress?o.merge_progress:null,cleanup_failed:n,repo_operations:M.repo_operations}),Se=Ys(_e),ve=!!n&&["child_sweep","branch_cleanup","parent_close"].includes(n.step)&&!!F&&F.tier==="merged",Ce=i&&!!n&&!!F&&F.tier==="merged",me=Ge&&(Xe||Ke||F?.reason==="base_behind"||F?.reason==="review_receipt_missing"||F?.reason==="review_receipt_stale"||ve||Ce),ee=i&&Ke&&d===!1,V=cr(S,e,{external:i,merge_active:Z||_e?.step==="merge",merge_queued:E,conflict_active:!!a,cleanup_active:Se,merged:!!n||F?.tier==="merged"}),we=!!V.operation,ge=!ve&&!!n&&n.step==="repo_operations",se=Nm({continuation_required:B,merge_step:_e,conflict_badge:Je,conflict_live:ue?.live===!0||a==="running",head_review:ie&&ne?{...ne,state:ie.state,failure_reason:ie.failure_reason}:null,recovery:pe,cleanup_failed:n,cleanup_label:n?Ur(n.step):null,base_exception:_,conflicting:Ke,gate:F,queue_failure:T,auto_skip:p,queued:E,queue_active:Z,queue_position:l?l.position:0,activity:Je?null:o&&o.activity||null}),W=se?.live===!0&&se.title?c`<span title=${se.title}>${se.label}</span>`:se?.label||null;return{id:e,title:i?c`${t}<span class="muted"> · 세션</span>`:t,reason:n&&_e?.active!==!0?Vs(n.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:$,external:i,pr_number:te&&typeof te.number=="number"?te.number:null,pr_url:te&&typeof te.url=="string"?te.url:"",completion_badge:se?.live!==!0&&se?.title?se.label:null,completion_title:se?.title||"",completion_repair_pr_url:pe?pe.repair_pr_url:"",completion_repair_pr_number:pe?pe.repair_pr_number:null,badges:W?[W]:[],live_badge:se?.live===!0?W:null,usage:s,alert:se?.alert===!0,merge_action:F?.tier==="merged"&&!ve&&!Ce||ge?!1:!E||B||Ge,timeline_action:ge,cancel_action:E&&!B,cancel_enabled:(!Z||Ne)&&!(pe&&pe.lock_actions),cancel_title:pe&&pe.lock_actions?"\uC790\uB3D9\uBCF5\uAD6C \uC911 \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694":Z&&!Ne?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":Ne?"review \uC9C4\uD589\uC744 \uCDE8\uC18C\uD558\uACE0 \uBA38\uC9C0 \uAD8C\uD55C\uC744 \uD3D0\uAE30\uD569\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:V,discard_action:V.action,merge_step:_e,discard_enabled:V.enabled,discard_title:V.title,merge_enabled:!_e&&!a&&!we&&!_&&!(pe&&pe.lock_actions)&&!ee&&!ge&&(Xe||Ke||F?.reason==="base_behind"||F?.reason==="review_receipt_missing"||F?.reason==="review_receipt_stale"||ve||Ce||me),merge_label:B?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":ve||Ce?"\uC815\uB9AC \uC7AC\uAC1C":Ke&&!_e&&!ve?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":F?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":F?.reason==="review_receipt_missing"||F?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":Ge?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:we?V.error?`\uD3D0\uAE30 \uC2E4\uD328: ${V.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${V.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:B?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":_e?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${_e.label}`:Ce?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":ee?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":ve?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Ke?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":F?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":F?.reason==="review_receipt_missing"||F?.reason==="review_receipt_stale"?"\uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":F?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":Xe?`\uBA38\uC9C0 (${F.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:F&&F.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${F&&F.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function wa(e,t={}){let{transport:r,issueStores:n,queueStore:s,analysisStore:o,sessionLogStore:a,uiOrderStore:i,gotoIssue:l,getWorkspacePath:d,doneRange:p,onDoneRangeChange:_}=t,g=n?as(n,i):null,S=ls({transport:r,uiOrderStore:i}),$=null,N=[],M=gm(),E=wm(),B=Ut(p)?p:$m(),Z=new Map;function T(){let f=or.find(w=>w.value===B);return f?f.label:"\uC624\uB298"}let x=Am(),R=!1,F=new Set,te=new Set,pe=new Set,ue=new Set,ne=[],ie=document.createElement("div");ie.className="worker-console";let Oe=document.createElement("div");Oe.className="worker-top";let Ne=document.createElement("div");Ne.className="worker-drawer-overlay",Ne.hidden=!0;let Ge=document.createElement("div");Ge.className="worker-drawer-overlay__backdrop";let Je=document.createElement("div");Je.className="worker-drawer-host";let Ke=document.createElement("div");Ke.className="worker-drawer-host",Ke.hidden=!0,Ne.append(Ge,Je,Ke);let Xe=document.createElement("div");Xe.className="worker-lanes-host",ie.append(Oe,Ne,Xe),e.appendChild(ie);let _e=null,Se=Is(Je,{transport:r,sessionLogStore:a,onClose:()=>{_e=null,Ne.hidden=!0,k()}}),ve=dd(Ke,{onClose:()=>{Ke.hidden=!0,Ne.hidden=!0,k()}}),Ce=nd({getWorkspacePath:d||(()=>"")}),me=d&&d()||"",ee=sd({queueStore:s,transport:r,onChanged:()=>k(),onOpenScript:(f,w)=>{Ce.open(f,w)}}),V=o?Jc(ie,{queueStore:s,analysisStore:o,transport:r,getWorkspacePath:d,onOpenTranscript:(f,w)=>St(f,w)}):null;function we(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:Xs,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function ge(){let f=we();return typeof f.revision=="number"?f.revision:0}function se(f){f&&f.queue&&s&&s.set(f.queue)}function W(){let f=we().queue;return Array.isArray(f)?f.length:0}async function z(f,w,q){if(!r)return;let O=()=>({bead_id:f,...w==="parallel"?{}:{lane:w},index:q,expected_revision:ge()}),m=await r("worker-queue-place",O());se(m),m&&m.conflict&&await r("worker-queue-place",O()).then(se)}async function I(f,w,q){if(!r)return;let O=()=>({bead_id:f,...w==="parallel"?{}:{lane:w},to_index:q,expected_revision:ge()}),m=await r("worker-queue-reorder",O());se(m),m&&m.conflict&&await r("worker-queue-reorder",O()).then(se)}async function Y(f){if(!r)return;let w=await r("worker-queue-remove",{bead_id:f,expected_revision:ge()});se(w),w&&w.conflict&&await r("worker-queue-remove",{bead_id:f,expected_revision:ge()}).then(se)}async function L(f){if(!r||!f)return;let w=await r("worker-attempt-pause",{attempt_id:f});w&&w.paused===!1&&w.reason&&oe(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${w.reason}`,"error",2400)}async function Q(f){if(!r||!f)return;let w=await Jr();if(w===null)return;let q=async(m={})=>await r("worker-attempt-resume",{attempt_id:f,expected_revision:ge(),...w!==""?{instructions:w}:{},...m}),O=await q();se(O),O&&O.conflict&&(O=await q(),se(O)),O=await fr(O,(m,j)=>q({continuation:m,decision_token:j}),{onResult:se,refresh:()=>q()}),O&&O.resumed===!1&&!O.conflict&&O.reason&&oe(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${O.reason}`,"error",2400)}async function le(f){if(!r||!f)return;let w=await r("worker-attempt-dismiss",{attempt_id:f,expected_revision:ge()});se(w),w&&w.conflict&&(w=await r("worker-attempt-dismiss",{attempt_id:f,expected_revision:ge()}),se(w)),w&&w.dismissed===!1&&!w.conflict&&w.reason&&oe(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${w.reason}`,"error",2400)}async function X(f,w,q=!0){if(!r)return null;let O=r,m=await O(f,{...w,expected_revision:ge()});return se(m),m&&m.conflict&&q&&(m=await O(f,{...w,expected_revision:ge()}),se(m)),m}async function fe(f){if(!r||!f)return;let w=we().merge_queue?.find(O=>O.bead_id===f)?.continuation_action;if(w?.mismatch&&w.continuation===null){await Be(f,w.mismatch);return}F.add(f),k();let q;try{q=await X("worker-merge-queue-add",{bead_id:f})}finally{F.delete(f),k()}!q||q.conflict||q.applied||oe(Lm(q.reason),"error",2400)}async function he(f){if(!(!r||!f||te.has(f))){te.add(f),k();try{let w=await r("worker-cleanup-retry",{bead_id:f,expected_revision:ge()});se(w),w&&!w.retried&&!w.conflict&&w.reason&&oe(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${w.reason}`,"error",2400)}finally{te.delete(f),k()}}}async function Be(f,w){let q=await fr({continuation_mismatch:w},(m,j)=>X("worker-merge-queue-add",{bead_id:f,continuation:m,decision_token:j},!1)),O=q?.queue?.merge_queue?.find(m=>m.bead_id===f)?.continuation_action;if(q?.applied!==!0&&O?.continuation===null&&O.mismatch){await Be(f,O.mismatch);return}q&&q.applied===!1&&!q.conflict&&oe("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function tt(f){if(!r)return;let w=await X("worker-merge-auto-toggle",{on:f});!w||w.conflict||oe(f?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",f?"success":"info",2400)}async function ct(f){if(!r||!f)return;let w=await X("worker-merge-queue-remove",{bead_id:f});w&&!w.conflict&&!w.applied&&w.reason==="merge_active"&&oe("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function Ve(){await X("worker-merge-queue-remove",{all:!0})}async function He(f,w=null,q="unmerged",O=null){if(!r||!f)return;let m=Pn(f,q);if(!(!!O||typeof globalThis.confirm!="function"||globalThis.confirm(m)))return;let H=await r("worker-discard",{bead_id:f,...w?{attempt_id:w}:{},...O?{operation_id:O}:{},expected_revision:ge()});if(se(H),H&&H.conflict&&(H=await r("worker-discard",{bead_id:f,...w?{attempt_id:w}:{},...O?{operation_id:O}:{},expected_revision:ge()}),se(H)),H&&H.discarded===!0){oe(Hs(H),"success",5e3);return}if(H&&H.reason){oe(`\uD3D0\uAE30 \uC2E4\uD328: ${H.reason}`,"error",2800);return}if(H&&H.accepted&&H.pending==="merged_revert"){oe("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(H&&H.accepted&&!H.discarded){oe(`\uD3D0\uAE30 \uC9C4\uD589: ${H.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}H&&!H.conflict&&oe("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function C(f,w,q){if(!(!r||!w||!q||ue.has(w))){ue.add(w),k();try{let O=await r(f,{bead_id:w,action_id:q,expected_revision:ge()});se(O),O?.conflict?oe("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!O?.ok&&O?.reason&&oe(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(O.reason)}`,"error",2800)}finally{ue.delete(w),k()}}}async function K(f,w){if(!r||!w||pe.has(w))return;pe.add(w),k();let q;try{let O=async(m={})=>await r(f,{bead_id:w,expected_revision:ge(),...m});q=await O(),se(q),q&&q.conflict&&(q=await r(f,{bead_id:w,expected_revision:ge()}),se(q)),f==="worker-revise-fix"&&(q=await fr(q,(m,j)=>O({continuation:m,decision_token:j}),{onResult:se,refresh:()=>O()}))}finally{pe.delete(w),k()}if(!(!q||q.conflict)){if(q.ok){oe(f==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}oe(`\uCC98\uBD84 \uAC70\uBD80: ${q.reason||""}`,"error",3e3)}}async function ce(f){if(!r)return;let w=await r("worker-automation-toggle",{on:f,expected_revision:ge()});se(w),w&&w.conflict&&await r("worker-automation-toggle",{on:f,expected_revision:ge()}).then(se)}async function Ee(f){if(!r||!f)return;let w=await r("worker-repo-operation-repair",{operation_id:f});if(se(w),w&&w.ok===!1){oe(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${w.reason||""}`,"error",3e3);return}w&&w.ok===!0&&oe("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function qe(f){if(!r||!f)return;let w=await r("worker-repo-operation-dismiss",{operation_id:f});se(w),w&&w.ok===!1&&oe(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${w.reason||""}`,"error",3e3)}async function rt(f){if(!r||!Number.isFinite(f))return;let w=Math.max(Xs,Math.floor(f)),q=await r("worker-queue-set-slots",{slots:w,expected_revision:ge()});se(q),q&&q.conflict&&await r("worker-queue-set-slots",{slots:w,expected_revision:ge()}).then(se)}async function nt(f){if(!r||!Number.isInteger(f)||f<1||f>ud)return;let w=we(),q=(Array.isArray(w.serial_lanes)?w.serial_lanes:[]).slice(f).reduce((j,H)=>j+(Array.isArray(H?.entries)?H.entries.length:0),0),O=()=>({count:f,expected_revision:ge()}),m=await r("worker-queue-set-serial-lane-count",O());se(m),m&&m.conflict&&(m=await r("worker-queue-set-serial-lane-count",O()),se(m)),m&&m.applied&&q>0&&oe(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${q}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}function Fe(){let f=we(),w=g?g.selectBoardColumn(pm,"ready"):[],q=g?g.selectBoardColumn(fm,"blocked"):[],O=g?g.selectBoardColumn(mm,"closed"):[],m=g?g.selectBoardColumn(_m,"in_progress"):[],j=new Map;for(let b of m){let D=Rm(b);if(!D)continue;let ae=j.get(D);ae?ae.push(b):j.set(D,[b])}let H=b=>{let D=is(j.get(b)||[]);return D?D.title||D.id:null},Te=f.bead_titles||{},Le=new Map;for(let[b,D]of Object.entries(Te))typeof D=="string"&&D.length>0&&Le.set(b,D);for(let b of[...w,...q])Le.set(b.id,b.title||b.id);let Ze=f.bead_times&&typeof f.bead_times=="object"&&!Array.isArray(f.bead_times)?f.bead_times:{},Qe=f.bead_labels&&typeof f.bead_labels=="object"&&!Array.isArray(f.bead_labels)?f.bead_labels:{},ut=new Map;for(let[b,D]of Object.entries(Qe))Array.isArray(D)&&ut.set(b,ba(D));for(let b of[...w,...q]){let D=b.labels;Array.isArray(D)&&!ut.has(b.id)&&ut.set(b.id,ba(D))}let h=new Map,u=o?.get()?.last_good?.result?.groups;for(let b of Array.isArray(u)?u:[]){if(b?.eligible!==!0||!Array.isArray(b.members))continue;let D=b.members.map(Me=>{let pt=(Array.isArray(f.serial_lanes)?f.serial_lanes:[]).find(Yt=>Yt.entries.some(Tt=>Tt.bead_id===Me));return pt?pt.id:null});if(!(D.every(Me=>Me!==null)&&new Set(D).size===1))for(let Me of b.members)h.set(Me,b.members.filter(pt=>pt!==Me))}let A=f.bead_blocked_by&&typeof f.bead_blocked_by=="object"&&!Array.isArray(f.bead_blocked_by)?f.bead_blocked_by:{},v=new Map;for(let[b,D]of Object.entries(Ze))D&&typeof D=="object"&&v.set(b,D);for(let b of[...w,...q])v.set(b.id,{created_at:b.created_at,updated_at:b.updated_at});let G=b=>v.get(b)||{},xe=f.pr_wait||[],Ae=f.pr_observations||{},Ye=f.pr_activity||{},Pe=f.cleanup_failed||{},gt=Object.entries(Pe).map(([b,D])=>({bead_id:b,step:D&&D.step?D.step:"",reason:D&&D.reason?D.reason:"",at:D&&typeof D.at=="number"?D.at:null,detail:D&&typeof D.detail=="string"?D.detail:null,output_tail:D&&typeof D.output_tail=="string"&&D.output_tail?D.output_tail:void 0,log_path:D&&typeof D.log_path=="string"&&D.log_path?D.log_path:void 0,retry_count:D&&typeof D.retry_count=="number"&&Number.isInteger(D.retry_count)&&D.retry_count>0?D.retry_count:0,failure_code:D&&typeof D.failure_code=="string"?D.failure_code:void 0,subject_id:D&&typeof D.subject_id=="string"?D.subject_id:void 0,repair_eligible:!!(D&&D.repair_eligible),repair:D&&D.repair?D.repair:void 0})),sr=f.queue||[],Ie=new Set([...sr.map(b=>b.bead_id),...(Array.isArray(f.serial_lanes)?f.serial_lanes:[]).flatMap(b=>(Array.isArray(b?.entries)?b.entries:[]).map(D=>D.bead_id)),...xe.map(b=>b.bead_id),...f.done.map(b=>b.bead_id)]),ht=new Set(q.map(b=>b.id)),an=i?i.get()?.order||{}:{},Sa=new Set,Aa=[];for(let b of[...w,...q])Ie.has(b.id)||Sa.has(b.id)||Cm(b)||Object.hasOwn(b,"labels")&&ga(b.labels)||(Sa.add(b.id),Aa.push(b));N=Tm(Aa,E,an);let Id=f.admission||{},Ea=b=>{let D=Id[b];if(!D)return"";if(D.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let ae=typeof D.reason=="string"?D.reason:"",Me=ae.indexOf(":");return Me>0&&Me<ae.length-1?`\u26D4 ${ae.slice(0,Me)} (${ae.slice(Me+1)})`:`\u26D4 ${ae}`},Ld=N.map(b=>{let D=Cn(b),ae=D.path.length>0,Me=b.workflow?.route==="quick_fix"||b.metadata&&b.metadata.route==="quick_fix",pt=!Object.hasOwn(b,"description")||typeof b.description=="string"&&b.description.trim().length>0,Tt=!(Object.hasOwn(b,"labels")&&ga(b.labels))&&(Me?pt:ae&&!D.conflict),lt=ht.has(b.id),Kt=[];lt&&Kt.push(Im(b)),Me&&!pt?Kt.push("missing_description"):!Me&&D.conflict?Kt.push("spec_id_conflict"):!Me&&!ae&&Kt.push("spec \uC5C6\uC74C");let Kn=Ea(b.id);return Kn&&Kt.push(Kn),{id:b.id,title:b.title||b.id,reason:Kt.join(" \xB7 "),draggable:Tt,lane:"candidate",created_at:b.created_at,updated_at:b.updated_at,workflow:b.workflow,is_quick_fix:Me,status:b.status,blocked:lt,has_spec:ae}}),Js=hm(Ld,M),Od=Js.visible,Pd=f.revise_parked||{},Un=f.discard_operations&&typeof f.discard_operations=="object"&&!Array.isArray(f.discard_operations)?f.discard_operations:{},eo=(b,D)=>b.map((ae,Me)=>{let pt=D!=="done",Yt=D!=="done"&&D!=="queue",Tt=pt?Pd[ae.bead_id]:null,lt=pt?cr(Un,ae.bead_id):null,Kt=lt?.operation?lt:null,Kn=pt&&ut.get(ae.bead_id)===!0,Xa=A[ae.bead_id]||[],oo=f.admission&&typeof f.admission=="object"?f.admission[ae.bead_id]:null,ao=pt?fc(oo,!!Kt||ue.has(ae.bead_id)):null,Vd=pt&&!ao?Ea(ae.bead_id):null,Yd=pt?[Vd]:[],Qa=pt&&Xa.length>0&&typeof oo?.reason=="string"&&oo.reason.startsWith("not_ready")?[`\u23F8 ${Xa.join(", ")} \uC644\uB8CC \uB300\uAE30 (blocks)`]:[],io=pt?h.get(ae.bead_id):void 0;return io&&io.length>0&&Qa.push(`\u2733 serial \uAD8C\uC7A5 \xB7 ${io.join(", ")}\uC640`),{id:ae.bead_id,title:Le.get(ae.bead_id)||ae.bead_id,reason:Yd.filter(Boolean).join(" \xB7 "),draggable:pt&&!Kt&&!ao,done:D==="done",lane:D,seq:Yt?Me+1:void 0,worker_serial:Kn,discard:Kt,stale_work:ao,badges:[...Qa,...Tt?["\u23F8 REVISE \uD30C\uD0B9"]:[]],alert:!!Tt,revise_action:!!Tt,revise_enabled:!!Tt&&!Kt&&!pe.has(ae.bead_id),revise_title:Tt?Tt.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Tt.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:D==="done"?Wt(f.attempts||{},ae.bead_id):null,work_ms:D==="done"?uc(f.attempts||{},ae.bead_id):null,done_at:D==="done"&&typeof ae.added_at=="number"?ae.added_at:void 0,...G(ae.bead_id)}}),zr=f.attempts?Object.values(f.attempts):[],to=new Set;for(let b of zr)b&&typeof b.resumed_from=="string"&&b.resumed_from.length>0&&to.add(b.resumed_from);let Ta=new Map;for(let b of zr)Ta.set(b.bead_id,b.attempt_id);let Wn=new Map;for(let b of zr)Wn.set(b.attempt_id,b);function ro(b){let D=new Set,ae=b;for(;ae&&!D.has(ae.attempt_id);){if(ae.conflict_resolution===!0)return!0;D.add(ae.attempt_id),ae=typeof ae.resumed_from=="string"&&ae.resumed_from.length>0&&Wn.get(ae.resumed_from)||null}return!1}let zn=typeof f.declared_base=="string"?f.declared_base:null;function Dd(b){let D=null;for(let ae of zr)!ae||ae.bead_id!==b||ro(ae)||(D===null||(typeof ae.started_at=="number"?ae.started_at:0)>=(typeof D.started_at=="number"?D.started_at:0))&&(D=ae);return D&&typeof D.target_base=="string"?D.target_base:null}let Ca=[],Ra=[],Md=Qc(f),Ia=b=>{let D=typeof b.session_id=="string"&&b.session_id.length>0,ae=to.has(b.attempt_id);return{eligible:D&&!ae,reason:D?ae?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},Vt=null;for(let b of zr){let D=b.status==="paused"&&!to.has(b.attempt_id);if(b.status==="running"||D)Ra.push({bead_id:b.bead_id,attempt_id:b.attempt_id,title:Le.get(b.bead_id)||b.bead_id,runner:b.runner||null,model:b.model||null,effort:b.effort||null,speed:b.speed||null,continuation_mode:b.continuation_mode||null,started_at:typeof b.started_at=="number"?b.started_at:null,resumed_from:b.resumed_from||null,paused:D,conflict_resolution:ro(b),base_exception:va(zn,b.target_base),can_pause:typeof b.session_id=="string"&&b.session_id.length>0,discard:cr(Un,b.bead_id,{attempt_id:b.attempt_id}),usage:Wt(f.attempts||{},b.bead_id),current_child:H(b.bead_id),...G(b.bead_id)});else if((b.status==="failed"||b.status==="orphaned")&&Md(b)){let ae=Ia(b);Ca.push({bead_id:b.bead_id,attempt_id:b.attempt_id,title:Le.get(b.bead_id)||b.bead_id,runner:b.runner||null,model:b.model||null,effort:b.effort||null,speed:b.speed||null,continuation_mode:b.continuation_mode||null,started_at:typeof b.started_at=="number"?b.started_at:null,resumed_from:b.resumed_from||null,failed:!0,status:b.status,status_label:b.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:cr(Un,b.bead_id,{attempt_id:b.attempt_id}),resume_eligible:ae.eligible,resume_reason:ae.reason,conflict_resolution:ro(b),base_exception:va(zn,b.target_base),usage:Wt(f.attempts||{},b.bead_id),current_child:H(b.bead_id),...G(b.bead_id)}),Vt=b}}let Hn=[...Ca,...Ra].map(b=>{let D=Wn.get(b.attempt_id),ae=D?.quickfix_landing;if(D?.quickfix_lane!==!0||!ae||typeof ae!="object")return b;let Me=typeof ae.reason=="string"&&ae.reason.length>0?ae.reason:null,pt=Nn({bead_id:D.bead_id,merge_sha:ae.head_sha,cleanup_cursor:ae.cursor,cleanup_failed:Me?{step:ae.cursor,reason:Me}:null,repo_operations:Array.isArray(f.repo_operations)?f.repo_operations:[]});return pt?{...b,landing:pt}:b}),La=null;if(Vt){let b=Ia(Vt),D=Vt.cause_detail;La={bead_id:Vt.bead_id,repo:Vt.repo||"",reason:Vt.cause||Vt.status,cause_detail:D&&typeof D.reason=="string"?{reason:D.reason,command:typeof D.command=="string"?D.command:null}:null,resume_attempt_id:Vt.attempt_id,resume_eligible:b.eligible,resume_reason:b.reason,discard:cr(Un,Vt.bead_id,{attempt_id:Vt.attempt_id})}}let Oa=new Set(Hn.map(b=>b.bead_id)),no=Array.isArray(f.merge_queue)?f.merge_queue:[],Pa=new Map,Da=new Map,Ma=new Map,Na=new Map,qa=new Map;no.forEach((b,D)=>{b&&typeof b.bead_id=="string"&&(Pa.set(b.bead_id,D+1),Da.set(b.bead_id,b.resolution),Ma.set(b.bead_id,b.continuation_action||null),Na.set(b.bead_id,b.head_review||null),qa.set(b.bead_id,b.authority||null))});let Hr=f.merge_queue_state||{active:null,failures:{}},Nd=Hr.failures||{},Fa=Hr.waiting&&typeof Hr.waiting.bead_id=="string"&&typeof Hr.waiting.reason=="string"?Hr.waiting:null,qd=f.auto_merge_skips||{},ja=b=>{let D=qd[b];if(!D)return null;let ae=Ae[b],Me=ae&&ae.pr?ae.pr.head_sha:null;return Me&&Me===D.head_sha?D.reason||"":null},Gn=new Map;for(let b of Hn)b.failed!==!0&&b.conflict_resolution&&(b.paused?Gn.has(b.bead_id)||Gn.set(b.bead_id,"paused"):Gn.set(b.bead_id,"running"));let Ba=Hn.filter(b=>!b.paused&&b.failed!==!0).length,Ua=(f.workspace_info||{}).slots,Wa=typeof Ua=="number"?Ua:typeof f.slots=="number"?f.slots:Xs,Fd=Ba>Wa,Vn=Dr(B),jd=(Array.isArray(f.done)?f.done.slice():[]).filter(b=>Vn===void 0||typeof b.added_at!="number"||b.added_at>=Vn).sort((b,D)=>(D.added_at||0)-(b.added_at||0)),ln=eo(jd,"done"),Bd=new Set((Array.isArray(f.done)?f.done:[]).map(b=>b?.bead_id).filter(b=>typeof b=="string")),za=[],Ud=d?.()||"";for(let b of O){let D=qr(b.closed_at);if(typeof b.id!="string"||Bd.has(b.id)||D===null||Vn!==void 0&&D<Vn||typeof b.comment_count!="number"||b.comment_count<=0)continue;let ae=`${Ud}\0${b.id}\0${String(b.updated_at)}\0${b.comment_count}`,Me=Z.get(ae);Me===void 0&&r&&(Z.set(ae,"pending"),Promise.resolve(r("get-comments",{id:b.id})).then(pt=>{let Yt=Array.isArray(pt)&&pt.some(Tt=>Ls(typeof Tt?.text=="string"?Tt.text:"")?.lane==="session");Z.set(ae,Yt?"session":"not-session"),k()}).catch(()=>{Z.set(ae,"failed"),k()})),Me==="session"&&za.push({id:b.id,title:b.title||b.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:null,done_at:D,created_at:b.created_at,updated_at:b.updated_at})}ln.push(...za),ln.sort((b,D)=>(D.done_at||0)-(b.done_at||0));let Yn={};for(let b of _r)Yn[b]=0;let Ha=!1,Ga=0,so=0,Va=0;for(let b of ln){let D=b.usage;if(D&&typeof D=="object"){let ae=!1;for(let Me of _r)Number.isFinite(D[Me])&&(Yn[Me]+=D[Me],Ha=!0,ae=!0);ae&&(so+=1,Number.isFinite(D.total_cost_usd)&&(Ga+=D.total_cost_usd,Va+=1))}}so>0&&Va===so&&(Yn.total_cost_usd=Ga);let Ya=ln.map(b=>b.usage).filter(b=>b&&typeof b=="object"&&b.providers),Wd=Ya.length>0?$t(bs(Ya)):Ha?Qt(Yn):null,zd=f.lane_states&&typeof f.lane_states=="object"&&!Array.isArray(f.lane_states)?f.lane_states:{},Hd=Array.isArray(f.serial_lanes)?f.serial_lanes:[],Ka=b=>{if(xe.some(Me=>Me.bead_id===b))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let D=zr.filter(Me=>Me&&Me.bead_id===b),ae=D.length>0?D[D.length-1].status:null;return ae==="failed"||ae==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":ae==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},Za=Hd.filter(b=>b&&typeof b.id=="string"&&Array.isArray(b.entries)).map((b,D)=>{let ae=zd[b.id]||{},Me=new Map((Array.isArray(ae.corrections)?ae.corrections:[]).filter(lt=>lt&&typeof lt.bead_id=="string"&&typeof lt.after=="string").map(lt=>[lt.bead_id,lt.after])),pt=eo(b.entries.filter(lt=>!Oa.has(lt.bead_id)),b.id).map(lt=>Me.has(lt.id)?{...lt,badges:[`\u{1F517} ${Me.get(lt.id)} \uB4A4 (blocks \uC790\uB3D9)`,...lt.badges]}:lt),Yt=Array.isArray(ae.occupied_by)?ae.occupied_by.filter(lt=>typeof lt=="string"):[],Tt=Yt.map(lt=>({id:lt,title:Le.get(lt)||lt,draggable:!1,lane:b.id,ghost:!0,badges:[Ka(lt)]}));return{id:b.id,index:D+1,rows:[...Tt,...pt],occupied:Yt.length>0,badge:Yt.length>0?Ka(Yt[0]):"\uB300\uAE30",cycle:ae.cycle===!0}}),Gd=typeof f.serial_lane_count=="number"?f.serial_lane_count:Za.length;return{queue:f,idToTitle:Le,candidates:Od,candidate_hidden:{blocked:Js.hidden_blocked,spec:Js.hidden_spec},running:Hn,live_count:Ba,slots:Wa,over_cap:Fd,failure:La,waiting:eo(sr.filter(b=>!Oa.has(b.bead_id)),"queue"),serial_lanes:Za,serial_lane_count:Gd,pr_wait:xe.map(b=>qm(b.bead_id,Le.get(b.bead_id)||b.bead_id,Ae,Pe[b.bead_id]||null,Wt(f.attempts||{},b.bead_id),Ye[b.bead_id]||(F.has(b.bead_id)||te.has(b.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),Gn.get(b.bead_id)||null,b.external===!0,{position:Pa.get(b.bead_id)||0,active:Hr.active===b.bead_id,failure:Nd[b.bead_id]||null,waiting:Fa?.bead_id===b.bead_id?Fa.reason:null,resolution:Da.get(b.bead_id),continuation_action:Ma.get(b.bead_id),head_review:Na.get(b.bead_id)||null,authority:qa.get(b.bead_id)||null},b.wt_present!==!1,f.auto_merge===!0?ja(b.bead_id):null,va(zn,Dd(b.bead_id)),f.completion_status&&typeof f.completion_status=="object"&&!Array.isArray(f.completion_status)&&f.completion_status[b.bead_id]||null,f.discard_operations&&typeof f.discard_operations=="object"&&!Array.isArray(f.discard_operations)?f.discard_operations:{},Wn.get(Ta.get(b.bead_id)||"")?.worker_serial===!0,f.auto_merge===!0,{merge_sha:b.merge_sha,cleanup_cursor:b.cleanup_cursor,repo_operations:Array.isArray(f.repo_operations)?f.repo_operations:[]})).map(b=>({...b,...G(b.id)})),merge_queue_length:no.length,merge_queue_running:no.length>0,auto_excluded:xe.map(b=>b.bead_id).filter(b=>ja(b)!==null),declared_base:zn,done:ln,token_total:Wd,cleanup_failures:gt,repo_operations:Array.isArray(f.repo_operations)?f.repo_operations:[]}}function _t(){let w=!!o?.get()?.job,q=!w&&o?.isPending?.()===!0,O=w?"\uBD84\uC11D \uC911":q?"\uC900\uBE44 \uC911":"";return c`<button
      type="button"
      class=${O?"worker-analysis-btn worker-analysis-btn--running":"worker-analysis-btn"}
      aria-busy=${O?"true":"false"}
      title="대기 이슈의 병렬 실행 가능성을 분석해 직렬 그룹을 제안합니다 (클릭할 때만 실행)"
    >
      ✳ 병렬성
      분석${O?c`<span class="worker-analysis-btn__badge">${O}</span>`:""}
    </button>`}function Re(f){let w=f.waiting.length>0?f.waiting[0].id:"\u2014",q=c`<button
      type="button"
      class="worker-play${f.queue.auto_advance?" is-active":""}"
    >
      ${f.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,O=J(f),m=f.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",j=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${f.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${f.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${T()} 완료 <b>${f.done.length}</b></span
      >`,H=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${f.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${f.declared_base||"?"}</span
    >`,Te=c`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${Xs}
          step="1"
          .value=${String(f.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:ud},(Qe,ut)=>ut+1).map(Qe=>c`<option
                value=${String(Qe)}
                ?selected=${f.serial_lane_count===Qe}
              >
                ${Qe}
              </option>`)}
        </select>
      </label>
      ${o?_t():""} `,Le=kc({failure:f.failure}),Ze=pc(f.repo_operations,f.cleanup_failures);return R?c`<div class="worker-ribbon">
          ${q} ${O}
          <div class="worker-kpi worker-kpi--ribbon">${m}${j}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${Te}</div>
          <div class="worker-kpi">${H}</div>
        </div>
        ${Ze}${ee.template()}${Le}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${q}${O}${Te}</div>
        <div class="worker-kpi">
          ${m}${j}${H}
          ${(Array.isArray(f.token_total)?f.token_total:f.token_total?[{label:f.token_total,tooltip:`${T()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(Qe=>c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${Qe.tooltip}
                >${T()} 완료 · 누적 ${Qe.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${w}</b></span
          >
        </div>
      </div>
      ${Ze}${ee.template()}${Le}`}function De(f){if(f.running.length===0&&f.pr_wait.length===0)return"";let w=f.running.some(q=>!q.paused&&q.failed!==!0);return c`<section
      class="worker-now${w?" worker-pane--live":""}"
      id="worker-now"
    >
      <header class="worker-now__hd">
        <span
          class="worker-pane__dot worker-pane__dot--running"
          aria-hidden="true"
        ></span>
        <span class="worker-now__title">지금</span>
        <span class="worker-now__count"
          >${f.running.length+f.pr_wait.length}</span
        >
      </header>
      ${f.running.length>0?ca(f.running,Date.now(),_e):""}
      ${f.pr_wait.map(q=>na(q))}
    </section>`}function ot(f){let w=f.candidate_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${M.show_blocked}
        />
        🔒 blocked${w.blocked>0?` ${w.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${ym.map(q=>c`<button
              type="button"
              class="worker-filter__chip${M.spec===q.value?" is-active":""}"
              data-spec=${q.value}
              aria-pressed=${M.spec===q.value?"true":"false"}
            >
              ${q.label}
            </button>`)}
        ${w.spec>0?c`<span class="worker-filter__hidden">숨김 ${w.spec}</span>`:""}
      </div>
    </div>`}function at(){return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${E}
    >
      ${vm.map(f=>c`<option value=${f.value} ?selected=${E===f.value}>
            ${f.label}
          </option>`)}
    </select>`}function dt(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${B}
      >
        ${or.map(f=>c`<option value=${f.value} ?selected=${B===f.value}>
              ${f.label}
            </option>`)}
      </select>
    </div>`}function U(f){let w=c`<span
      class="worker-lane__badge${f.occupied?" worker-lane__badge--held":""}"
      >${f.badge}</span
    >`,q=f.cycle?c`<div class="worker-lane__cycle">
          ⚠ blocks 순환 감지 — 자동 정렬을 생략했습니다
        </div>`:"";return rr({id:`worker-pane-lane-${f.id}`,lane:f.id,title:`\uC9C1\uB82C ${f.index}`,items:f.rows,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:w,controls:q})}function J(f){let w=f.queue.auto_merge===!0;if(f.merge_queue_running)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${w?" is-active":""}"
        title=${w?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${w?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${f.merge_queue_length}
      </button>`;if(w)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let q=new Set(f.auto_excluded),O=f.pr_wait.filter(m=>m.merge_action&&m.merge_enabled&&!q.has(m.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${O>0?` ${O}`:""}
    </button>`}function be(f){let w=rr({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:f.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:at(),controls:ot(f)});return R?c`<div class="worker-lanes worker-lanes--mobile">
        ${De(f)}
        ${rr({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:f.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:x.queue,preview:fd(f.waiting)})}
        ${f.serial_lanes.map(q=>U(q))}
        ${w}
        ${rr({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:f.done,empty:`${T()} \uC644\uB8CC \uC5C6\uC74C`,controls:dt(),collapsible:!0,collapsed:x.done,preview:Array.isArray(f.token_total)?f.token_total.map(q=>q.label).join(" \xB7 "):f.token_total||fd(f.done)})}
      </div>`:c`<div class="worker-lanes">
      ${w}
      <div class="worker-wait">
        ${rr({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:f.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
        ${f.serial_lanes.map(q=>U(q))}
      </div>
      ${rr({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${f.slots}`,items:f.running,live:f.running.some(q=>!q.paused&&q.failed!==!0),body:ca(f.running,Date.now(),_e)})}
      ${rr({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:f.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${rr({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${T()} ${f.done.length}`,items:f.done,empty:`${T()} \uC644\uB8CC \uC5C6\uC74C`,controls:dt()})}
    </div>`}function y(f){x={...x,[f]:!x[f]},Em(x),k()}function k(){let f=Fe();je(Re(f),Oe),je(be(f),Xe)}function P(){let f=document.querySelector(".app-header");if(!f)return;let w=()=>{let q=Math.round(f.getBoundingClientRect().height);ie.style.setProperty("--worker-ribbon-top",`${q}px`)};if(w(),typeof ResizeObserver=="function"){let q=new ResizeObserver(w);q.observe(f),ne.push(()=>q.disconnect())}else window.addEventListener("resize",w),ne.push(()=>window.removeEventListener("resize",w))}function re(){if(typeof window.matchMedia!="function")return;let f=window.matchMedia(Sm);R=!!f.matches;let w=q=>{let O=!!(q&&typeof q.matches=="boolean"?q.matches:f.matches);O!==R&&(R=O,k())};typeof f.addEventListener=="function"?(f.addEventListener("change",w),ne.push(()=>f.removeEventListener("change",w))):typeof f.addListener=="function"&&(f.addListener(w),ne.push(()=>f.removeListener(w)))}let ye=null;function de(f){ye=f.target instanceof Element?f.target:null}function ke(f){let q=f.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!q)return;if(ye&&q.contains(ye)&&ye.closest("input, button, a")){f.preventDefault();return}let O=q.dataset.beadId||"",m=q.dataset.lane||"";$={bead_id:O,from_lane:m};try{f.dataTransfer?.setData("text/plain",O),f.dataTransfer&&(f.dataTransfer.effectAllowed="move")}catch{}}function $e(f){let w=f.target?.closest?.(".worker-pane");if(!w)return;let q=w.dataset.lane||"";q!=="candidate"&&q!=="queue"&&!/^s[1-5]$/.test(q)||(f.preventDefault(),f.dataTransfer&&(f.dataTransfer.dropEffect="move"),w.classList.add("worker-pane--drag-over"))}function bt(f){f.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function Ct(f,w){let q=N.find(H=>H.id===f);if(!q)return;let O=N.filter(H=>H.id!==f),m=O.length;if(w){let H=w.dataset.beadId;if(H===f)return;let Te=O.findIndex(Le=>Le.id===H);Te>=0&&(m=Te)}let j=O.slice();j.splice(m,0,q),S.applyReorder(f,j,m)}function Ue(f){let w=f.target?.closest?.(".worker-pane");if(!w)return;f.preventDefault(),w.classList.remove("worker-pane--drag-over");let q=w.dataset.lane||"",O=$?.bead_id||f.dataTransfer?.getData("text/plain")||"",m=$?.from_lane||"";if($=null,!O)return;let j=f.target?.closest?.(".worker-mini, .worker-card"),H=Array.from(w.querySelectorAll(".worker-mini, .worker-card")),Te=H.length;if(j){let Le=H.indexOf(j);Le>=0&&(Te=Le)}if(Te=Math.max(0,Te-w.querySelectorAll(".worker-mini--ghost").length),w.classList.contains("worker-pane--collapsed")&&(Te=W()),q==="candidate"){if(m==="candidate"){Ct(O,j);return}(m==="queue"||/^s[1-5]$/.test(m))&&Y(O);return}if(q==="queue"||/^s[1-5]$/.test(q)){let Le=q==="queue"?"parallel":q;m===q?I(O,Le,Te):z(O,Le,Te)}}function vt(f){M=f,bm(f),k()}function wr(f){E=f==="board"||f==="created"||f==="spec"?f:Qs,km(E),k()}function xt(f){B=Ut(f)?f:Nt,xm(B),_?.(B),k()}function Et(f){let w=f.target?.closest?.(".worker-serial-lane-count");if(w){let Te=Number.parseInt(w.value,10);Number.isFinite(Te)&&nt(Te).then(k);return}let q=f.target?.closest?.(".worker-filter__blocked");if(q){vt({...M,show_blocked:q.checked});return}let O=f.target?.closest?.(".worker-done-range");if(O){xt(O.value);return}let m=f.target?.closest?.(".worker-sort");if(m){wr(m.value||Qs);return}let j=f.target?.closest?.(".worker-slots__input");if(!j)return;let H=Number.parseInt(j.value,10);if(!Number.isFinite(H)){k();return}rt(H).then(k)}function dr(f){return f?{runner:f.runner||void 0,model:f.model||void 0,effort:f.effort||void 0,worktree:f.worktree||void 0,status:f.status||void 0,session_id:f.session_id||void 0}:{}}function nr(){let f=Fe();return{operations:f.repo_operations,cleanup_failures:f.cleanup_failures,repo:d&&d()||""}}function Ht(){_e&&Se.close(),Ke.hidden=!1,Ne.hidden=!1,ve.open(nr()),k()}function Gt(f){let w=we(),q=w.attempts?w.attempts[f]:null;_e=f,ve.close(),Ke.hidden=!0,Ne.hidden=!1,Se.open({attempt_id:f,meta:dr(q)}),k()}function St(f,w){_e=null,ve.close(),Ke.hidden=!0,Ne.hidden=!1,Se.open({attempt_id:f,meta:w}),k()}function ur(){if(ve.isOpen()&&ve.refresh(nr()),!_e)return;let f=we(),w=f.attempts?f.attempts[_e]:null;if(w){Se.updateMeta(dr(w));return}Se.close()}function We(f){let w=f.target;if(w?.closest?.(".worker-mini__serial, .worker-mini__grip")||w?.closest?.("#worker-parallel-analysis-dialog"))return;if(w?.closest?.(".worker-analysis-btn")){V?.open();return}if(w?.closest?.(".worker-repo-strip")||w?.closest?.(".worker-mini__timeline")){Ht();return}let q=w?.closest?.(".worker-repo-op__session");if(q){let Ie=q.dataset.attemptId;Ie&&Gt(Ie);return}let O=w?.closest?.(".worker-repo-op__resolve");if(O){Ee(O.dataset.operationId||"");return}let m=w?.closest?.(".worker-repo-op__dismiss");if(m){qe(m.dataset.operationId||"");return}let j=w?.closest?.(".worker-cleanup__resume");if(j){let Ie=j.dataset.beadId;Ie&&he(Ie);return}let H=w?.closest?.(".worker-banner__resume");if(H){let Ie=H.dataset.attemptId;Ie&&Q(Ie);return}let Te=w?.closest?.(".worker-banner__discard");if(Te){let Ie=Te.dataset.confirmation==="merged"?"merged":"unmerged";He(Te.dataset.beadId||"",Te.dataset.attemptId||null,Ie,Te.dataset.operationId||null);return}let Le=w?.closest?.(".worker-banner__dismiss");if(Le){let Ie=Le.dataset.attemptId;Ie&&le(Ie);return}if(w?.closest?.(".worker-play")){ce(!we().auto_advance);return}let Ze=w?.closest?.(".worker-merge-all");if(Ze){Ze.classList.contains("worker-merge-all--stop")?we().auto_merge===!0?tt(!1):Ve():tt(!0);return}let Qe=w?.closest?.(".worker-pane__hd--toggle");if(Qe){let Ie=Qe.dataset.lane;(Ie==="queue"||Ie==="done")&&y(Ie);return}let ut=w?.closest?.(".worker-card__place");if(ut){let Ie=ut.dataset.beadId;Ie&&!ut.disabled&&z(Ie,"parallel",W());return}let h=w?.closest?.(".worker-filter__chip");if(h){let Ie=h.dataset.spec;(Ie==="all"||Ie==="with"||Ie==="without")&&vt({...M,spec:Ie});return}let u=w?.closest?.(".worker-mini__merge");if(u){let Ie=u.dataset.beadId||"";we().cleanup_failed?.[Ie]?he(Ie):fe(Ie);return}let A=w?.closest?.(".worker-mini__merge-cancel");if(A){ct(A.dataset.beadId||"");return}let v=w?.closest?.(".worker-mini__discard");if(v){He(v.dataset.beadId||"",v.dataset.attemptId||null,v.dataset.discardMode==="merged"?"merged":"unmerged",v.dataset.operationId||null);return}let G=w?.closest?.(".worker-mini__stale-continue");if(G){C("worker-stale-work-continue",G.dataset.beadId||"",G.dataset.actionId||"");return}let xe=w?.closest?.(".worker-mini__stale-backup");if(xe){C("worker-stale-work-backup-fresh",xe.dataset.beadId||"",xe.dataset.actionId||"");return}let Ae=w?.closest?.(".worker-mini__stale-recheck");if(Ae){C("worker-stale-work-recheck",Ae.dataset.beadId||"",Ae.dataset.actionId||"");return}let Ye=w?.closest?.(".worker-mini__revise-fix");if(Ye){K("worker-revise-fix",Ye.dataset.beadId||"");return}let Pe=w?.closest?.(".worker-mini__revise-approve");if(Pe){K("worker-revise-approve",Pe.dataset.beadId||"");return}if(w?.closest?.(".worker-mini__pr"))return;if(w?.closest?.(".rtile__discard")){let Ie=w?.closest?.(".rtile"),ht=Ie?.dataset?.beadId,an=Ie?.dataset?.attemptId;ht&&He(ht,an||null,"unmerged",w?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(w?.closest?.(".rtile__dismiss")){let ht=w?.closest?.(".rtile")?.dataset?.attemptId;ht&&le(ht);return}if(w?.closest?.(".rtile__pause")){let ht=w?.closest?.(".rtile")?.dataset?.attemptId;ht&&L(ht);return}if(w?.closest?.(".rtile__resume")){let ht=w?.closest?.(".rtile")?.dataset?.attemptId;ht&&Q(ht);return}if(w?.closest?.(".rtile__session")){let ht=w?.closest?.(".rtile")?.dataset?.attemptId;ht&&Gt(ht);return}if(w?.closest?.(".worker-drawer-overlay__backdrop")){ve.close(),Se.close();return}if(w?.closest?.(".worker-drawer-host"))return;let gt=w?.closest?.(".rtile");if(gt){if(w?.closest?.(".rtile__id")){let ht=gt.dataset.beadId;ht&&Xt(ht).then(an=>{an?oe("\uBCF5\uC0AC\uB428","success",1200):oe("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Ie=gt.dataset.beadId;Ie&&l&&l(Ie);return}let sr=w?.closest?.(".worker-mini, .worker-card");if(sr){let Ie=sr.dataset.beadId;if(w?.closest?.(".worker-mini__id, .worker-card__id")){Ie&&Xt(Ie).then(ht=>{ht?oe("\uBCF5\uC0AC\uB428","success",1200):oe("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}Ie&&l&&l(Ie)}}return e.addEventListener("pointerdown",de),e.addEventListener("dragstart",ke),e.addEventListener("dragover",$e),e.addEventListener("dragleave",bt),e.addEventListener("drop",Ue),e.addEventListener("click",We),e.addEventListener("change",Et),re(),P(),g&&ne.push(g.subscribe(()=>{for(let[f,w]of Z)w==="failed"&&Z.delete(f);k()})),s&&ne.push(s.subscribe(()=>{let f=d&&d()||"";f!==me&&(me=f,Ce.close()),k(),ur()})),o&&typeof o.subscribe=="function"&&ne.push(o.subscribe(()=>k())),k(),{load(){k()},destroy(){for(let f of ne.splice(0))try{f()}catch{}e.removeEventListener("pointerdown",de),e.removeEventListener("dragstart",ke),e.removeEventListener("dragover",$e),e.removeEventListener("dragleave",bt),e.removeEventListener("drop",Ue),e.removeEventListener("click",We),e.removeEventListener("change",Et);try{Se.destroy()}catch{}Ne.hidden=!0;try{V?.destroy()}catch{}try{Ce.destroy()}catch{}je(c``,e)}}}function ka(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function yd(e,t,r,n=async()=>{},s=async()=>{}){let o=ft("views:workspace-picker"),a=null,i=!1,l=!1,d=!1;async function p(R){let te=R.target.value,ue=t.getState().workspace?.current?.path||"";if(te&&te!==ue){o("switching workspace to %s",te),i=!0,x();try{await r(te)}catch(ne){o("workspace switch failed: %o",ne)}finally{i=!1,x()}}}async function _(){let R=t.getState(),F=R.workspace?.current?.path||R.workspace?.available?.[0]?.path||"";if(!(!F||l)){o("git-pulling workspace %s",F),l=!0,x();try{await n(F)}catch(te){o("workspace git pull failed: %o",te)}finally{l=!1,x()}}}function g(R){let F=R.target;F&&e.contains(F)||N()}function S(R){R.key==="Escape"&&N()}function $(){d||(d=!0,document.addEventListener("mousedown",g),document.addEventListener("keydown",S),x())}function N(){d&&(d=!1,document.removeEventListener("mousedown",g),document.removeEventListener("keydown",S),x())}function M(){d?N():$()}async function E(R){let F=R.target,te=F.value,pe=F.checked;o("toggling visibility %s \u2192 %s",te,String(pe));try{await s(te,pe)}catch(ue){o("workspace visibility toggle failed: %o",ue)}}function B(R){return R?c`
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
    `:c``}function Z(R,F){return c`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${M}
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
                ${R.map(te=>c`
                    <label
                      class="workspace-picker__manage-row"
                      title="${te.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${te.path}"
                        .checked=${!F.has(te.path)}
                        @change=${E}
                      />
                      <span class="workspace-picker__manage-name"
                        >${ka(te.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function T(){let R=t.getState(),F=R.workspace?.current,te=R.workspace?.available||[],pe=new Set(R.workspace?.hidden||[]),ue=F?.path||te[0]?.path||"";if(te.length===0)return c``;let ne=te.filter(ie=>!pe.has(ie.path)||ie.path===ue);if(ne.length<=1){let ie=ne[0]||te[0],Oe=ka(ie.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${ie.path}"
            >${Oe}</span
          >
          ${Z(te,pe)}
          ${B(ue)}
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
          ${ne.map(ie=>c`
              <option
                value="${ie.path}"
                ?selected=${ie.path===ue}
                title="${ie.path}"
              >
                ${ka(ie.path)}
              </option>
            `)}
        </select>
        ${Z(te,pe)}
        ${B(ue)}
        ${i||l?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function x(){je(T(),e)}return x(),a=t.subscribe(()=>x()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",g),document.removeEventListener("keydown",S),je(c``,e)}}}var vd=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-serial-lane-count","subscribe-worker-parallel-analysis","unsubscribe-worker-parallel-analysis","worker-parallel-analysis-snapshot","worker-parallel-analysis-targets","worker-parallel-analysis-prompt","worker-parallel-analysis-start","worker-parallel-analysis-cancel","worker-parallel-analysis-settings-update","worker-parallel-analysis-submit","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle"];function $a(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function wd(e,t,r=$a()){return{id:r,type:e,payload:t}}function kd(e={}){let t=ft("ws"),r={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},n=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,i=null,l=!0,d=new Map,p=[],_=new Map,g=new Set;function S(T){for(let x of Array.from(g))try{x(T)}catch{}}function $(){if(!l||i)return;o="reconnecting",t("ws reconnecting\u2026"),S(o);let T=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,a)),x=(r.jitterRatio||0)*T,R=Math.max(0,Math.round(T+(Math.random()*2-1)*x));t("ws retry in %d ms (attempt %d)",R,a+1),i=setTimeout(()=>{i=null,Z()},R)}function N(T){try{s?.send(JSON.stringify(T))}catch(x){t("ws send failed",x)}}function M(){for(o="open",t("ws open"),S(o),a=0;p.length;){let T=p.shift();T&&N(T)}}function E(T){let x;try{x=JSON.parse(String(T.data))}catch{t("ws received non-JSON message");return}if(!x||typeof x.id!="string"||typeof x.type!="string"){t("ws received invalid envelope");return}if(d.has(x.id)){let F=d.get(x.id);d.delete(x.id),x.ok?F?.resolve(x.payload):F?.reject(x.error||new Error("ws error"));return}let R=_.get(x.type);if(R&&R.size>0)for(let F of Array.from(R))try{F(x.payload)}catch(te){t("ws event handler error",te)}else t("ws received unhandled message type: %s",x.type)}function B(){o="closed",t("ws closed"),S(o);for(let[T,x]of d.entries())x.reject(new Error("ws disconnected")),d.delete(T);a+=1,$()}function Z(){if(!l)return;let T=n();try{s=new WebSocket(T),t("ws connecting %s",T),o="connecting",S(o),s.addEventListener("open",M),s.addEventListener("message",E),s.addEventListener("error",()=>{}),s.addEventListener("close",B)}catch(x){t("ws connect failed %o",x),$()}}return Z(),{send(T,x){if(!vd.includes(T))return Promise.reject(new Error(`unknown message type: ${T}`));let R=$a(),F=wd(T,x,R);return t("send %s id=%s",T,R),new Promise((te,pe)=>{d.set(R,{resolve:te,reject:pe,type:T}),s&&s.readyState===s.OPEN?N(F):(t("queue %s id=%s (state=%s)",T,R,o),p.push(F))})},on(T,x){_.has(T)||_.set(T,new Set);let R=_.get(T);return R?.add(x),()=>{R?.delete(x)}},onConnection(T){return g.add(T),()=>{g.delete(T)}},reconnect(){l=!0,i&&(clearTimeout(i),i=null),a=0,Z()},close(){l=!1,i&&(clearTimeout(i),i=null);try{s?.close()}catch{}},getState(){return o}}}function Fm(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function jm(e,t){try{let n=await(await fetch("/api/config")).json();e.setState({config:n})}catch(r){t("config refresh failed",r)}}var xa=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],$d=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:closed","closed-issues"]],Tr="tab:worker:closed",Bm="bdui.worker.done-range",xd=qc,Sd="worker:queue",Ad="worker:parallel-analysis",Ed="ui:order",Td="ui:display-policy",Cd="exec:presets",Cr="tab:board:closed",Rd="beads-ui.board.closed-range";function Um(e){let t=ft("main");t("bootstrap start");let r=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;je(r,e);let n=document.getElementById("top-nav"),s=document.getElementById("usage-meter"),o=document.getElementById("board-root"),a=document.getElementById("worker-root"),i=document.getElementById("monitor-root"),l=document.getElementById("detail-panel");if(s&&Xc(s),o&&a&&i&&l){let Xe=function(h,u){let A="Request failed",v="";if(h&&typeof h=="object"){let xe=h;if(typeof xe.message=="string"&&xe.message.length>0&&(A=xe.message),typeof xe.details=="string")v=xe.details;else if(xe.details&&typeof xe.details=="object")try{v=JSON.stringify(xe.details,null,2)}catch{v=""}}else typeof h=="string"&&h.length>0&&(A=h);let G=u&&u.length>0?`Failed to load ${u}`:"Request failed";Ke.open(G,A,v)},he=function(h){return`${We.getState().workspace.current?.path||""}\0${h}`},Be=function(){z&&(z().catch(()=>{}),z=null),I=null,Y=null},ct=function(h){L=h;let u=()=>{L!==h||We.getState().selected_id!==h||(L=null,tt(h))};if(!X){le.then(u);return}u()},K=function(h,u,A,v,G){return A!==C[u]?(G().catch(()=>{}),!1):(h.set(v,G),!0)},Ee=function(){let h=We.getState();_t(h.view==="board"),U(h.view==="worker"),P(h.view==="monitor"),be(h.view==="board"||h.view==="worker"||ce||!!h.selected_id)},nt=function(){let h=Dr(qe);return h===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:h}}},Fe=function(){let h=Dr(rt);return h===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:h}}},_t=function(h){if(h)for(let[u,A]of xa){if(Ve.has(u)||He.has(u))continue;let v=u===Cr?nt():{type:A};try{Ce.register(u,v)}catch(Ae){t("register %s store failed: %o",u,Ae)}He.add(u);let G=C.board,xe=!1;ve.subscribeList(u,v).then(Ae=>{xe=!K(Ve,"board",G,u,Ae)}).catch(Ae=>{t("subscribe %s failed: %o",u,Ae),Xe(Ae,"board")}).finally(()=>{He.delete(u),xe&&Ee()})}else ot()},ot=function(){C.board+=1;for(let[h]of xa){let u=Ve.get(h);u&&(u().catch(()=>{}),Ve.delete(h));try{Ce.unregister(h)}catch(A){t("unregister %s failed: %o",h,A)}}},U=function(h){if(!h){J();return}for(let[u,A]of $d){if(at.has(u)||He.has(u))continue;let v=u===Tr?Fe():{type:A};try{Ce.register(u,v)}catch(Ae){t("register %s store failed: %o",u,Ae)}He.add(u);let G=C.worker,xe=!1;ve.subscribeList(u,v).then(Ae=>{xe=!K(at,"worker",G,u,Ae)}).catch(Ae=>{t("subscribe %s failed: %o",u,Ae),Xe(Ae,"worker")}).finally(()=>{He.delete(u),xe&&Ee()})}},J=function(){C.worker+=1;for(let[h]of $d){let u=at.get(h);u&&(u().catch(()=>{}),at.delete(h));try{Ce.unregister(h)}catch(A){t("unregister %s failed: %o",h,A)}}},be=function(h){if(!h){y();return}dt||(Se("subscribe-worker-queue",{id:Sd}).catch(u=>{t("subscribe-worker-queue failed: %o",u)}),Se("subscribe-worker-parallel-analysis",{id:Ad}).catch(u=>{t("subscribe-worker-parallel-analysis failed: %o",u)}),dt=()=>(Se("unsubscribe-worker-parallel-analysis",{id:Ad}),Se("unsubscribe-worker-queue",{id:Sd})))},y=function(){dt&&(dt().catch(()=>{}),dt=null),ee.clear()},P=function(h){if(!h){re();return}k||(Se("subscribe-monitor-pipeline",{id:xd}).catch(u=>{t("subscribe-monitor-pipeline failed: %o",u)}),k=()=>Se("unsubscribe-monitor-pipeline",{id:xd}))},re=function(){k&&(k().catch(()=>{}),k=null)},de=function(){ye||(Se("subscribe-ui-order",{id:Ed}).catch(h=>{t("subscribe-ui-order failed: %o",h)}),ye=()=>Se("unsubscribe-ui-order",{id:Ed}))},ke=function(){ye&&(ye().catch(()=>{}),ye=null),we.clear()},bt=function(){$e||(Se("subscribe-display-policy",{id:Td}).catch(h=>{t("subscribe-display-policy failed: %o",h)}),$e=()=>Se("unsubscribe-display-policy",{id:Td}))},Ct=function(){$e&&($e().catch(()=>{}),$e=null),ge.clear()},vt=function(){Ue||(Se("subscribe-impl-presets",{id:Cd}).catch(h=>{t("subscribe-impl-presets failed: %o",h)}),Ue=()=>Se("unsubscribe-impl-presets",{id:Cd}))},Ht=function(h){if(!h)return"Unknown";let u=h.split("/").filter(Boolean);return u.length>0?u[u.length-1]:"Unknown"};var d=Xe,p=he,_=Be,g=ct,S=K,$=Ee,N=nt,M=Fe,E=_t,B=ot,Z=U,T=J,x=be,R=y,F=P,te=re,pe=de,ue=ke,ne=bt,ie=Ct,Oe=vt,Ne=Ht;let Ge=document.getElementById("header-loading"),Je=Di(Ge),Ke=dc(e),_e=kd(),Se=Je.wrapSend((h,u)=>_e.send(h,u)),ve=Ei(Se),Ce=Ti(),me=Ii(),ee=Ri(),V=pi(),we=Ci(),ge=di(),se=ui(),W=fi();_e.on("impl-presets-snapshot",h=>{let u=h;u&&typeof u.revision=="number"&&Array.isArray(u.presets)&&se.set({revision:u.revision,presets:u.presets})}),_e.on("monitor-pipeline-snapshot",h=>{let u=h;if(!(!u||!Array.isArray(u.workspaces)))try{V.set(u.workspaces,u.workspaces_state)}catch{}}),_e.on("ui-order-snapshot",h=>{let u=h;if(u&&typeof u.revision=="number")try{we.set({revision:u.revision,order:u.order&&typeof u.order=="object"?u.order:{}})}catch{}}),_e.on("display-policy-snapshot",h=>{let u=h;if(u&&u.policy&&typeof u.policy=="object")try{ge.set(u.policy)}catch{}}),_e.on("session-log-snapshot",h=>{let u=h;if(u&&typeof u.id=="string")try{W.set(u.id,Array.isArray(u.lines)?u.lines:[],typeof u.last_event_at=="number"?u.last_event_at:null)}catch{}}),_e.on("session-log-append",h=>{let u=h;if(u&&typeof u.id=="string")try{W.append(u.id,u.event)}catch{}}),_e.on("snapshot",h=>{let u=h,A=u&&typeof u.id=="string"?u.id:"",v=A?Ce.getStore(A):null;if(v&&u&&u.type==="snapshot")try{v.applyPush(u)}catch{}}),_e.on("upsert",h=>{let u=h,A=u&&typeof u.id=="string"?u.id:"",v=A?Ce.getStore(A):null;if(v&&u&&u.type==="upsert")try{v.applyPush(u)}catch{}}),_e.on("delete",h=>{let u=h,A=u&&typeof u.id=="string"?u.id:"",v=A?Ce.getStore(A):null;if(v&&u&&u.type==="delete")try{v.applyPush(u)}catch{}});let z=null,I=null,Y=null,L=null,Q=()=>{},le=new Promise(h=>{Q=()=>h(void 0)}),X=!1,fe=!1;async function tt(h){let u=he(h);if(u===I||u===Y)return;Y=u;let A=`detail:${h}`,v={type:"issue-detail",params:{id:h}};try{Ce.register(A,v)}catch(G){t("register detail store failed: %o",G)}try{let G=await ve.subscribeList(A,v);if(We.getState().selected_id!==h||he(h)!==u){await G().catch(()=>{});return}z&&await z().catch(()=>{}),z=G,I=u}catch(G){t("detail subscribe failed: %o",G),Xe(G,"issue details")}finally{Y===u&&(Y=null)}}let Ve=new Map,He=new Set,C={board:0,worker:0},ce=!1,qe=Nt;try{let h=window.localStorage.getItem(Rd);Ut(h)&&(qe=h)}catch{}let rt=Nt;try{let h=window.localStorage.getItem(Bm);Ut(h)&&(rt=h)}catch{}async function Re(h){if(!Ut(h)||h===qe)return;qe=h;try{window.localStorage.setItem(Rd,h)}catch{}let u=Ve.get(Cr);if(!u)return;Ve.delete(Cr),await u().catch(()=>{});let A=nt();try{Ce.register(Cr,A)}catch(v){t("register %s store failed: %o",Cr,v)}try{let v=await ve.subscribeList(Cr,A);Ve.set(Cr,v)}catch(v){t("re-subscribe %s failed: %o",Cr,v),Xe(v,"board")}}async function De(h){if(!Ut(h)||h===rt)return;rt=h;let u=at.get(Tr);if(!u)return;at.delete(Tr),await u().catch(()=>{});let A=Fe();try{Ce.register(Tr,A)}catch(v){t("register %s store failed: %o",Tr,v)}try{let v=await ve.subscribeList(Tr,A);at.set(Tr,v)}catch(v){t("re-subscribe %s failed: %o",Tr,v),Xe(v,"worker")}}let at=new Map,dt=null,k=null,ye=null,$e=null,Ue=null;async function wr(){$e=null,ge.clear(),Ue=null,se.clear(),dt=null,k=null,Ve.clear(),at.clear(),C.board+=1,C.worker+=1,vt();let h=We.getState().workspace.current?.path;if(h)try{await _e.send("set-workspace",{path:h})}catch(A){t("workspace restore after reconnect failed: %o",A);return}bt();let u=We.getState();_t(u.view==="board"),U(u.view==="worker"),P(u.view==="monitor"),be(u.view==="board"||u.view==="worker"||!!u.selected_id)}async function xt(){t("clearing all subscriptions for workspace switch"),ot(),J(),y(),me.clear(),ke(),de(),Ct(),bt(),Be();let h=We.getState();if(h.selected_id)try{Ce.unregister(`detail:${h.selected_id}`)}catch{}let u=We.getState();_t(u.view==="board"),U(u.view==="worker"),P(u.view==="monitor"),be(u.view==="board"||u.view==="worker"||!!u.selected_id),u.selected_id&&ct(u.selected_id)}async function Et(h){t("requesting workspace switch to %s",h),fe=!0;try{let u=await _e.send("set-workspace",{path:h});t("workspace switch result: %o",u),u&&u.workspace&&(We.setState({workspace:{current:{path:u.workspace.root_dir,database:u.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",h),u.changed&&(await xt(),oe("Switched to "+Ht(h),"success",2e3)))}catch(u){throw t("workspace switch failed: %o",u),oe("Failed to switch workspace","error",3e3),u}finally{fe=!1}}async function dr(h){t("requesting workspace git pull for %s",h);try{let u=await _e.send("git-pull-workspace",{});t("workspace git pull result: %o",u);let A=u?.status;if(A==="up_to_date"){oe("Already up to date","success",2e3);return}if(A==="stash_pop_conflict"){oe("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}oe("Git pulled "+Ht(h),"success",2e3)}catch(u){t("workspace git pull failed: %o",u);let A=u?.code,v=u?.message;if(A==="rebase_conflict"){oe("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(A==="rebase_conflict_abort_failed"){oe("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(A==="busy"){oe("Git pull skipped: another operation is running","warning",3e3);return}let G=v?`: ${v}`:"";throw oe(`Git pull failed${G}`,"error",3e3),u}}async function nr(h,u){t("setting workspace visibility %s \u2192 %s",h,String(u));try{await _e.send("set-workspace-visibility",{path:h,visible:u}),await Gt()}catch(A){t("workspace visibility update failed: %o",A),oe("Failed to update project visibility","error",3e3)}}async function Gt(){try{let h=await _e.send("list-workspaces",{});if(t("workspaces loaded: %o",h),h&&Array.isArray(h.workspaces)){let u=h.workspaces.map(xe=>({path:xe.path,database:xe.database,pid:xe.pid,version:xe.version})),A=h.current?{path:h.current.root_dir,database:h.current.db_path}:null,v=Array.isArray(h.hidden)?h.hidden.filter(xe=>typeof xe=="string"):[];We.setState({workspace:{current:A,available:u,hidden:v}});let G=window.localStorage.getItem("beads-ui.workspace");G&&(!u.some(Ae=>Ae.path===G)||v.includes(G)?window.localStorage.removeItem("beads-ui.workspace"):A&&G!==A.path&&(t("restoring saved workspace preference: %s",G),await Et(G)))}}catch(h){t("failed to load workspaces: %o",h)}}_e.on("workspace-changed",h=>{t("workspace-changed event: %o",h),h&&h.root_dir&&(We.setState({workspace:{current:{path:h.root_dir,database:h.db_path}}}),Gt(),xt())});let St=!1;if(typeof _e.onConnection=="function"){let h=u=>{t("ws state %s",u),u==="reconnecting"||u==="closed"?(St=!0,oe("Connection lost. Reconnecting\u2026","error",4e3)):u==="open"&&St&&(St=!1,oe("Reconnected","success",2200),jm(We,(A,v)=>{t(`${A}: %o`,v)}),wr())};_e.onConnection(h)}let ur="board";try{let h=window.localStorage.getItem("beads-ui.view");(h==="board"||h==="worker"||h==="monitor")&&(ur=h)}catch(h){t("view parse error: %o",h)}let We=Pi({config:Fm(),view:ur});_e.on("worker-queue-snapshot",h=>{let u=h;if(!u||!u.queue)return;let A=We.getState().workspace.current?.path;if(typeof A=="string"&&A.length>0&&u.root_dir!==A){t("dropping worker-queue snapshot for %s",String(u.root_dir));return}try{me.set(u.queue)}catch{}}),_e.on("worker-parallel-analysis-snapshot",h=>{let u=h;if(!u)return;let A=We.getState().workspace.current?.path;if(!(typeof A=="string"&&A.length>0&&typeof u.root_dir=="string"&&u.root_dir!==A))try{ee.set({settings:u.settings,job:u.job??null,runs:Array.isArray(u.runs)?u.runs:[],last_good:u.last_good??null})}catch{}});let f=Li(We);f.start();let w=new Set(["get-comments","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults"]),q=async(h,u)=>{try{return await Se(h,u)}catch(A){if(w.has(h))throw A;return[]}};n&&jc(n,We,f);let O=document.getElementById("workspace-picker");O&&yd(O,We,Et,dr,nr);let m=zc(e,(h,u)=>Se(h,u));try{let h=document.getElementById("new-issue-btn");h&&h.addEventListener("click",()=>m.open())}catch{}let j=Yc(e,{policyStore:ge,queueStore:me,implPresetStore:se,transport:(h,u)=>Se(h,u),onOpenChange:h=>{ce=h,Ee()},labelOptions:()=>{let h=new Set;for(let[u]of xa)for(let A of Ce.snapshotFor(u)||[]){let v=A.labels;if(Array.isArray(v))for(let G of v)typeof G=="string"&&G.length>0&&h.add(G)}return Array.from(h).sort()}});try{let h=document.getElementById("display-settings-btn");h&&(h.setAttribute("aria-label","\uC124\uC815"),h.setAttribute("title","\uC124\uC815"),h.addEventListener("click",()=>j.open()))}catch{}let H=Hi(o,{gotoIssue:h=>f.gotoIssue(h),issueStores:Ce,transport:q,workerQueueStore:me,uiOrderStore:we,displayPolicyStore:ge,closedRange:qe,onClosedRangeChange:h=>{Re(h)},onNewIssue:()=>m.open()}),Te=wa(a,{transport:q,issueStores:Ce,queueStore:me,analysisStore:ee,sessionLogStore:W,uiOrderStore:we,gotoIssue:h=>We.setState({selected_id:h}),getWorkspacePath:()=>We.getState().workspace.current?.path,doneRange:rt,onDoneRangeChange:h=>{De(h)}}),Le=Fc(i,{transport:q,pipelineStore:V,execPresetStore:se,gotoIssue:h=>f.gotoIssue(h),getWorkspacePath:()=>We.getState().workspace.current?.path,switchWorkspace:h=>Et(h)}),Ze=cc(l,{issueStores:Ce,transport:q,queueStore:me,execPresetStore:se,sessionLogStore:W,getWorkspacePath:()=>We.getState().workspace.current?.path,onNavigate:h=>{We.getState().view==="worker"?We.setState({selected_id:h}):f.gotoIssue(h)},onClose:()=>{let h=We.getState();We.setState({selected_id:null});try{f.gotoView(h.view==="worker"||h.view==="monitor"?h.view:"board")}catch{}},onOpenExecPresets:()=>{j.open("session")}}),Qe=We.getState().selected_id;Qe&&(l.hidden=!1,Ze.load(Qe),ct(Qe)),We.subscribe(h=>{let u=h.selected_id;u?(l.hidden=!1,Ze.load(u),fe||ct(u)):(Ze.clear(),l.hidden=!0,Be())});let ut=h=>{o.hidden=h.view!=="board",a.hidden=h.view!=="worker",i.hidden=h.view!=="monitor",_t(h.view==="board"),U(h.view==="worker"),P(h.view==="monitor"),be(h.view==="board"||h.view==="worker"||ce||!!h.selected_id),!h.selected_id&&h.view==="board"&&H.load(),h.view==="worker"&&Te.load(),h.view==="monitor"?Le.load():Le.pause(),window.localStorage.setItem("beads-ui.view",h.view)};We.subscribe(ut),ut(We.getState()),de(),bt(),vt(),Gt().finally(()=>{X=!0,Q()}),window.addEventListener("keydown",h=>{let u=h.ctrlKey||h.metaKey,A=String(h.key||"").toLowerCase(),v=h.target,G=v&&v.tagName?String(v.tagName).toLowerCase():"",xe=G==="input"||G==="textarea"||G==="select"||v&&typeof v.isContentEditable=="boolean"&&v.isContentEditable;u&&A==="n"&&(xe||(h.preventDefault(),m.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let r=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let t=document.getElementById("app");t&&Um(t)});export{Um as bootstrap,Fm as readBootstrapConfig,jm as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
